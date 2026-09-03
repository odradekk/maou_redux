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
 *   S4：NTR/处刑系五入口/ENTERENEMY/迎击奖惩（GOHOUBI_REQUEST/AFTER/
 *     OSIOKI）/GOBI。
 *   S5：家族注册与 main-loop 接线。
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
      era.drawLine(); // :123-124-125
      await era.printAndWait(
        `「还…还真是抱歉呢…，因为${sc()}我…好像有点太容易就败给诱惑了呢…」`,
      ); // :125
      // NTR スイッチ解除 // :127
      kojo.NTR再捕获 = 0; // :127
    } else {
      // :127-128-132
      era.drawLine(); // :129-130-130-130-130
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
        // :292-298-299-299-307 陥落後に魔族
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
        // :330-336-337-337-345 陥落後に魔族
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
    // :418-419-420-420-420 口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ
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
 * 原文缺陷 1:1 保留：
 * - :605 助手跳过守卫整行注释（`;SIF ASSI > 0 && ASSIPLAY`）——K14 无
 *   ASSI 跳过，1:1 保留注释形态（不实现）。
 * - :719 局部变量 P（PALAM:3+UP:3）由复核补声明（转译器 review 清单 #12）；
 *   唯一真源 = 源行 :719，JS 侧走润滑/润滑增量门面。
 * - :3332 起穿环（SELECTCOM 87）的 P 是 piercing_state.p（跨 CALL
 *   TRAIN_MESSAGE_B 存活的单字母变量，com87() 写入），K7/K10 同款先例。
 *
 * @param {((n: number) => number) | undefined} [rand]
 */
async function kojo_message_com_14(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;
  const kojo = chara(target).kojo;

  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {
    // :608-609
    return 0; // :608-609
  } // :608-609

  if (game.train.失神) {
    // :612-613-613-613
    return 0; // :612-613-613-613
  } // :612-613-613-613

  if (era.get(`tequip:${target}:89`)) {
    // :614
    await dog_kojo_14(rand_n); // :615 CALL DOG_KOJO_14
    return 0; // :615-616
  } // :617-618-618-618

  if (era.get(`tequip:${target}:55`)) {
    // :619
    await colosseum_kojo_14(rand_n); // :620 CALL COLOSSEUM_KOJO_14
    return 0; // :620-621
  } // :620-622

  if (era_flag.selectcom == 0) {
    // :630

    if (kojo.爱抚 == 0) {
      // :632

      if (era.get(`mark:${target}:2`) >= 2) {
        // :634
        await era.printAndWait(''); // :635
      } else {
        // :637-645-645-645
        await era.printAndWait(''); // :638
      } // :639-645-645-645
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :640
      kojo.爱抚 = 1; // :640
      return 0; // :641-645-645-645
    } else {
      // :643-645-645-645

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :645
        await era.printAndWait(''); // :646
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :647
        kojo.爱抚 = 6; // :647
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :649
        await era.printAndWait(''); // :650
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :651
        kojo.爱抚 = 5; // :651
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :653
        await era.printAndWait(''); // :654
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :655
        kojo.爱抚 = 4; // :655
      } else if (
        era.get(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :657
        await era.printAndWait(''); // :658
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :659
        kojo.爱抚 = 3; // :659
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        // :661
        await era.printAndWait(''); // :662
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :663
        kojo.爱抚 = 2; // :663
      } // :664-670-670-670
      return 0; // :665-670-670-670
    } // :666-670-670-670
  } // :667-670-670-670

  if (era_flag.selectcom == 1) {
    // :673

    if (kojo.舔阴 == 0) {
      // :675

      if (era.get(`talent:${target}:0`) == 1) {
        // :677
        await era.printAndWait(''); // :678
      } else {
        // :680-688-688-688
        await era.printAndWait(''); // :681
      } // :682-688-688-688
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :683
      kojo.舔阴 = 1; // :683
      return 0; // :684-688-688-688
    } else {
      // :686-688-688-688

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :688
        await era.printAndWait(''); // :689
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :690
        kojo.舔阴 = 5; // :690
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :692
        await era.printAndWait(''); // :693
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :694
        kojo.舔阴 = 4; // :694
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :696
        await era.printAndWait(''); // :697
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :698
        kojo.舔阴 = 3; // :698
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        // :700
        await era.printAndWait(''); // :701
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :702
        kojo.舔阴 = 2; // :702
      } // :703-709-709-709
      return 0; // :704-709-709-709
    } // :705-709-709-709
  } // :706-709-709-709

  if (era_flag.selectcom == 2) {
    // :711

    if (kojo.肛门爱抚 == 0) {
      // :713
      await era.printAndWait(''); // :714
      // CFLAG:TARGET:303  = 1（变量语义：CFLAG 族，TARGET:303） // :715
      kojo.肛门爱抚 = 1; // :715
      return 0; // :715-716
    } else {
      // :718-720-720-720
      // 赋值 P = PALAM:3 + UP:3 // :719
      const P = chara(target).train.润滑 + chara(target).train.润滑增量;

      if (
        era.get(`talent:${target}:76`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :721
        await era.printAndWait(''); // :722
        // CFLAG:303  = 7（变量语义：CFLAG 族，303） // :723
        kojo.肛门爱抚 = 7; // :723
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :725
        await era.printAndWait(''); // :726
        // CFLAG:303  = 6（变量语义：CFLAG 族，303） // :727
        kojo.肛门爱抚 = 6; // :727
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        P >= PALAMLV[2] &&
        (kojo.肛门爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :729
        await era.printAndWait(''); // :730
        // CFLAG:303  = 5（变量语义：CFLAG 族，303） // :731
        kojo.肛门爱抚 = 5; // :731
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        P < PALAMLV[2] &&
        (kojo.肛门爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :733
        await era.printAndWait(''); // :734
        // CFLAG:303  = 4（变量语义：CFLAG 族，303） // :735
        kojo.肛门爱抚 = 4; // :735
      } else if (
        P >= PALAMLV[2] &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :737
        await era.printAndWait(''); // :738
        // CFLAG:303  = 3（变量语义：CFLAG 族，303） // :739
        kojo.肛门爱抚 = 3; // :739
      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 == 2) {
        // :741
        await era.printAndWait(''); // :742
        // CFLAG:303  = 2（变量语义：CFLAG 族，303） // :743
        kojo.肛门爱抚 = 2; // :743
      } // :743-744
      return 0; // :743-745
    } // :743-746
  } // :747-750-750-750

  if (era_flag.selectcom == 3) {
    // :752

    if (kojo.自慰 == 0) {
      // :754
      await era.printAndWait(''); // :755
      // CFLAG:TARGET:304  = 1（变量语义：CFLAG 族，TARGET:304） // :756
      kojo.自慰 = 1; // :756
      return 0; // :756-757
    } else {
      // :759-760-760-760

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :761
        await era.printAndWait(''); // :762
        // CFLAG:304  = 9（变量语义：CFLAG 族，304） // :763
        kojo.自慰 = 9; // :763
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :765

        if (rand_n(3) == 0) {
          // :767
          await era.printAndWait(''); // :768
        } else if (rand_n(2) == 0) {
          // :769
          await era.printAndWait(''); // :770
        } else {
          // :771-774-774-774
          await era.printAndWait(''); // :772
        } // :773-774-774-774
        // CFLAG:304  = 8（变量语义：CFLAG 族，304） // :774
        kojo.自慰 = 8; // :774
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :776

        if (rand_n(2) == 0) {
          // :778
          await era.printAndWait(''); // :779
        } else {
          // :780-783-783-783
          await era.printAndWait(''); // :781
        } // :782-783-783-783
        // CFLAG:304  = 7（变量语义：CFLAG 族，304） // :783
        kojo.自慰 = 7; // :783
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :785
        await era.printAndWait(''); // :786
        // CFLAG:304  = 6（变量语义：CFLAG 族，304） // :787
        kojo.自慰 = 6; // :787
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :789

        if (rand_n(3) == 0) {
          // :791
          await era.printAndWait(''); // :792
        } else if (rand_n(2) == 0) {
          // :793
          await era.printAndWait(''); // :794
        } else {
          // :795-798-798-798
          await era.printAndWait(''); // :796
        } // :797-798-798-798
        // CFLAG:304  = 5（变量语义：CFLAG 族，304） // :798
        kojo.自慰 = 5; // :798
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:31`) < 3 &&
        (kojo.自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :800

        if (rand_n(2) == 0) {
          // :802
          await era.printAndWait(''); // :803
        } else {
          // :804-807-807-807
          await era.printAndWait(''); // :805
        } // :806-807-807-807
        // CFLAG:304  = 4（变量语义：CFLAG 族，304） // :807
        kojo.自慰 = 4; // :807
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:31`) >= 1 &&
        (kojo.自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :809

        if (rand_n(2) == 0) {
          // :811
          await era.printAndWait(''); // :812
        } else {
          // :813-816-816-816
          await era.printAndWait(''); // :814
        } // :815-816-816-816
        // CFLAG:304  = 3（变量语义：CFLAG 族，304） // :816
        kojo.自慰 = 3; // :816
      } else if (kojo.自慰 <= 1 || game.kojo.口上开关 == 2) {
        // :818

        if (rand_n(2) == 0) {
          // :820
          await era.printAndWait(''); // :821
        } else {
          // :822-825-825-825
          await era.printAndWait(''); // :823
        } // :824-825-825-825
        // CFLAG:304  = 2（变量语义：CFLAG 族，304） // :825
        kojo.自慰 = 2; // :825
      } // :825-826
      return 0; // :825-827
    } // :825-828
  } // :829-832-832-832

  if (era_flag.selectcom == 5) {
    // :835

    if (kojo.胸爱抚 == 0) {
      // :837

      if (era.get(`talent:${target}:85`) == 1) {
        // :839
        await era.printAndWait(''); // :840
      } else {
        // :842-850-850-850
        await era.printAndWait(''); // :843
      } // :844-850-850-850
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :845
      kojo.胸爱抚 = 1; // :845
      return 0; // :846-850-850-850
    } else {
      // :848-850-850-850

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :850
        await era.printAndWait(''); // :851
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :852
        kojo.胸爱抚 = 5; // :852
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :854
        await era.printAndWait(''); // :855
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :856
        kojo.胸爱抚 = 4; // :856
      } else if (
        era.get(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :858
        await era.printAndWait(''); // :859
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :860
        kojo.胸爱抚 = 3; // :860
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :862
        await era.printAndWait(''); // :863
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :864
        kojo.胸爱抚 = 2; // :864
      } // :865-871-871-871
      return 0; // :866-871-871-871
    } // :867-871-871-871
  } // :868-871-871-871

  if (era_flag.selectcom == 6) {
    // :873

    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      // :875

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        // :877
        await era.printAndWait(''); // :878
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era_flag.assiplay == 0 &&
        era.get(`tequip:${target}:89`) == 0 &&
        era.get(`tequip:${target}:90`) == 0
      ) {
        // :880
        await era.printAndWait(''); // :881
      } else {
        // :880-883
        await era.printAndWait(''); // :884
      } // :880-885
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :886
      kojo.接吻 = 1; // :886
      return 0; // :880-887
    } else if (kojo.接吻 == 0) {
      // :889

      if (era.get(`talent:${target}:76`) == 1) {
        // :891
        await era.printAndWait(''); // :892
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :894
        await era.printAndWait(''); // :895
      } else {
        // :897-905-905-905
        await era.printAndWait(''); // :898
      } // :899-905-905-905
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :900
      kojo.接吻 = 1; // :900
      return 0; // :901-905-905-905
    } else {
      // :903-905-905-905

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :905
        await era.printAndWait(''); // :906
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :907
        kojo.接吻 = 5; // :907
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :909
        await era.printAndWait(''); // :910
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :911
        kojo.接吻 = 4; // :911
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :913
        await era.printAndWait(''); // :914
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :915
        kojo.接吻 = 3; // :915
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        // :917
        await era.printAndWait(''); // :918
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :919
        kojo.接吻 = 2; // :919
      } // :920-926-926-926
      return 0; // :921-926-926-926
    } // :922-926-926-926
  } // :923-926-926-926

  if (era_flag.selectcom == 7) {
    // :929

    if (kojo.自己扒开 == 0) {
      // :931

      if (era.get(`talent:${target}:76`) == 1) {
        // :933
        await era.printAndWait(''); // :934
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :936
        await era.printAndWait(''); // :937
      } else {
        // :939-942-942-942
        await era.printAndWait(''); // :940
      } // :941-942-942-942
      // CFLAG:TARGET:308  = 1（变量语义：CFLAG 族，TARGET:308） // :942
      kojo.自己扒开 = 1; // :942
      return 0; // :942-943
    } else {
      // :945-947-947-947

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :947
        await era.printAndWait(''); // :948
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :949
        kojo.胸爱抚 = 5; // :949
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.自己扒开 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :951
        await era.printAndWait(''); // :952
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :953
        kojo.胸爱抚 = 4; // :953
      } else if (
        era.get(`abl:${target}:17`) >= 3 &&
        (kojo.自己扒开 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :955
        await era.printAndWait(''); // :956
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :957
        kojo.胸爱抚 = 3; // :957
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :959
        await era.printAndWait(''); // :960
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :961
        kojo.胸爱抚 = 2; // :961
      } // :958-962
      return 0; // :958-963
    } // :964-968-968-968
  } // :965-968-968-968

  if (era_flag.selectcom == 8) {
    // :971

    if (kojo.插入手指 == 0) {
      // :973

      if (era.get(`talent:${target}:76`) == 1) {
        // :975
        await era.printAndWait(''); // :976
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`talent:${target}:85`) == 1
      ) {
        // :978
        await era.printAndWait(''); // :979
      } else {
        // :981-984-984-984
        await era.printAndWait(''); // :982
      } // :983-984-984-984
      // CFLAG:TARGET:309  = 1（变量语义：CFLAG 族，TARGET:309） // :984
      kojo.插入手指 = 1; // :984
      return 0; // :984-985
    } else {
      // :987-989-989-989

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :989
        await era.printAndWait(''); // :990
        // CFLAG:309  = 5（变量语义：CFLAG 族，309） // :991
        kojo.插入手指 = 5; // :991
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :993
        await era.printAndWait(''); // :994
        // CFLAG:309  = 4（变量语义：CFLAG 族，309） // :995
        kojo.插入手指 = 4; // :995
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.插入手指 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :997
        await era.printAndWait(''); // :998
        // CFLAG:309  = 3（变量语义：CFLAG 族，309） // :999
        kojo.插入手指 = 3; // :999
      } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {
        // :1001
        await era.printAndWait(''); // :1002
        // CFLAG:309  = 2（变量语义：CFLAG 族，309） // :1003
        kojo.插入手指 = 2; // :1003
      } // :1003-1004
      return 0; // :1003-1005
    } // :1003-1006
  } // :1007-1010-1010-1010

  if (era_flag.selectcom == 9) {
    // :1012

    if (kojo.舔肛 == 0) {
      // :1014

      if (era.get(`talent:${target}:76`) == 1) {
        // :1016
        await era.printAndWait(''); // :1017
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1019
        await era.printAndWait(''); // :1020
      } else {
        // :1022-1030-1030-1030
        await era.printAndWait(''); // :1023
      } // :1024-1030-1030-1030
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :1025
      kojo.舔肛 = 1; // :1025
      return 0; // :1026-1030-1030-1030
    } else {
      // :1028-1030-1030-1030

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1030
        await era.printAndWait(''); // :1031
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :1032
        kojo.舔肛 = 5; // :1032
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1034
        await era.printAndWait(''); // :1035
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :1036
        kojo.舔肛 = 4; // :1036
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1038
        await era.printAndWait(''); // :1039
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :1040
        kojo.舔肛 = 3; // :1040
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        // :1042
        await era.printAndWait(''); // :1043
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :1044
        kojo.舔肛 = 2; // :1044
      } // :1045-1051-1051-1051
      return 0; // :1046-1051-1051-1051
    } // :1047-1051-1051-1051
  } // :1048-1051-1051-1051

  if (era_flag.selectcom == 10) {
    // :1053

    if (kojo.振动宝石 == 0) {
      // :1055

      if (era.get(`talent:${target}:76`) == 1) {
        // :1057
        await era.printAndWait(''); // :1058
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`talent:${target}:85`) == 1
      ) {
        // :1060
        await era.printAndWait(''); // :1061
      } else {
        // :1063-1066-1066-1066
        await era.printAndWait(''); // :1064
      } // :1065-1066-1066-1066
      // CFLAG:TARGET:311  = 1（变量语义：CFLAG 族，TARGET:311） // :1066
      kojo.振动宝石 = 1; // :1066
      return 0; // :1066-1067
    } else {
      // :1069-1071-1071-1071

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1071
        await era.printAndWait(''); // :1072
        // CFLAG:311  = 5（变量语义：CFLAG 族，311） // :1073
        kojo.振动宝石 = 5; // :1073
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1075
        await era.printAndWait(''); // :1076
        // CFLAG:311  = 4（变量语义：CFLAG 族，311） // :1077
        kojo.振动宝石 = 4; // :1077
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动宝石 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1079
        await era.printAndWait(''); // :1080
        // CFLAG:311  = 3（变量语义：CFLAG 族，311） // :1081
        kojo.振动宝石 = 3; // :1081
      } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 == 2) {
        // :1083
        await era.printAndWait(''); // :1084
        // CFLAG:311  = 2（变量语义：CFLAG 族，311） // :1085
        kojo.振动宝石 = 2; // :1085
      } // :1085-1086
      return 0; // :1085-1087
    } // :1085-1088
  } // :1085-1089

  if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`)) {
    // :1096

    if (kojo.壶虫 == 0) {
      // :1098

      if (era.get(`talent:${target}:0`) == 1) {
        // :1100

        if (era.get(`talent:${target}:76`) == 1) {
          // :1102
          await era.printAndWait(''); // :1103
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1105
          await era.printAndWait(''); // :1106
        } else {
          // :1098-1108
          await era.printAndWait(''); // :1109
        } // :1098-1110
      } else {
        // :1112-1124-1124-1124

        if (era.get(`talent:${target}:76`) == 1) {
          // :1114
          await era.printAndWait(''); // :1115
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1117
          await era.printAndWait(''); // :1118
        } else {
          // :1120-1124-1124-1124
          await era.printAndWait(''); // :1121
        } // :1122-1124-1124-1124
      } // :1123-1124-1124-1124
      // CFLAG:312  = 1（变量语义：CFLAG 族，312） // :1124
      kojo.壶虫 = 1; // :1124
      return 0; // :1124-1125
    } else {
      // :1127-1129-1129-1129

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.壶虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1129
        await era.printAndWait(''); // :1130
        // CFLAG:312  = 5（变量语义：CFLAG 族，312） // :1131
        kojo.壶虫 = 5; // :1131
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.壶虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1133
        await era.printAndWait(''); // :1134
        // CFLAG:312  = 4（变量语义：CFLAG 族，312） // :1135
        kojo.壶虫 = 4; // :1135
      } else if (
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1137
        await era.printAndWait(''); // :1138
        // CFLAG:312  = 3（变量语义：CFLAG 族，312） // :1139
        kojo.壶虫 = 3; // :1139
      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 == 2) {
        // :1141
        await era.printAndWait(''); // :1142
        // CFLAG:312  = 2（变量语义：CFLAG 族，312） // :1143
        kojo.壶虫 = 2; // :1143
      } // :1143-1144
      return 0; // :1143-1145
    } // :1146-1148-1148-1148
  } else if (era_flag.selectcom == 11 && era.get(`tequip:${target}:11`) == 0) {
    // :1148

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1150
      await era.printAndWait(''); // :1151
      // CFLAG:372  = 3（变量语义：CFLAG 族，372） // :1152
      kojo.壶虫着脱 = 3; // :1152
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1154
      await era.printAndWait(''); // :1155
      // CFLAG:372  = 2（变量语义：CFLAG 族，372） // :1156
      kojo.壶虫着脱 = 2; // :1156
    } else if (kojo.壶虫着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1158
      await era.printAndWait(''); // :1159
      // CFLAG:372  = 1（变量语义：CFLAG 族，372） // :1160
      kojo.壶虫着脱 = 1; // :1160
    } // :1160-1161
    return 0; // :1160-1162
  } // :1160-1163

  if (era_flag.selectcom == 12) {
    // :1168

    if (kojo.振动杖 == 0) {
      // :1170

      if (era.get(`talent:${target}:76`) == 1) {
        // :1172
        await era.printAndWait(''); // :1173
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1175
        await era.printAndWait(''); // :1176
      } else {
        // :1178-1181-1181-1181
        await era.printAndWait(''); // :1179
      } // :1180-1181-1181-1181
      // CFLAG:313  = 1（变量语义：CFLAG 族，313） // :1181
      kojo.振动杖 = 1; // :1181
      return 0; // :1181-1182
    } else {
      // :1184-1186-1186-1186

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1186
        await era.printAndWait(''); // :1187
        // CFLAG:313  = 5（变量语义：CFLAG 族，313） // :1188
        kojo.振动杖 = 5; // :1188
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1190
        await era.printAndWait(''); // :1191
        // CFLAG:313  = 4（变量语义：CFLAG 族，313） // :1192
        kojo.振动杖 = 4; // :1192
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1194
        await era.printAndWait(''); // :1195
        // CFLAG:313  = 3（变量语义：CFLAG 族，313） // :1196
        kojo.振动杖 = 3; // :1196
      } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 == 2) {
        // :1198
        await era.printAndWait(''); // :1199
        // CFLAG:313  = 2（变量语义：CFLAG 族，313） // :1200
        kojo.振动杖 = 2; // :1200
      } // :1200-1201
      return 0; // :1200-1202
    } // :1200-1203
  } // :1200-1204

  if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`)) {
    // :1210

    if (kojo.肛门虫 == 0) {
      // :1212

      if (era.get(`talent:${target}:76`) == 1) {
        // :1214
        await era.printAndWait(''); // :1215
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1217
        await era.printAndWait(''); // :1218
      } else {
        // :1220-1223-1223-1223
        await era.printAndWait(''); // :1221
      } // :1222-1223-1223-1223
      // CFLAG:TARGET:314  = 1（变量语义：CFLAG 族，TARGET:314） // :1223
      kojo.肛门虫 = 1; // :1223
      return 0; // :1223-1224
    } else {
      // :1226-1228-1228-1228

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1228
        await era.printAndWait(''); // :1229
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :1230
        kojo.肛门虫 = 6; // :1230
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.肛门虫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1232
        await era.printAndWait(''); // :1233
        // CFLAG:314  = 6（变量语义：CFLAG 族，314） // :1234
        kojo.肛门虫 = 6; // :1234
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1236
        await era.printAndWait(''); // :1237
        // CFLAG:314  = 5（变量语义：CFLAG 族，314） // :1238
        kojo.肛门虫 = 5; // :1238
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.肛门虫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1240
        await era.printAndWait(''); // :1241
        // CFLAG:314  = 4（变量语义：CFLAG 族，314） // :1242
        kojo.肛门虫 = 4; // :1242
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛门虫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1244
        await era.printAndWait(''); // :1245
        // CFLAG:314  = 3（变量语义：CFLAG 族，314） // :1246
        kojo.肛门虫 = 3; // :1246
      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 == 2) {
        // :1248
        await era.printAndWait(''); // :1249
        // CFLAG:314  = 2（变量语义：CFLAG 族，314） // :1250
        kojo.肛门虫 = 2; // :1250
      } // :1250-1251
      return 0; // :1250-1252
    } // :1253-1255-1255-1255
  } else if (era_flag.selectcom == 13 && era.get(`tequip:${target}:13`) == 0) {
    // :1255

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      // :1257
      await era.printAndWait(''); // :1258
      // CFLAG:374  = 4（变量语义：CFLAG 族，374） // :1259
      kojo.肛门虫着脱 = 4; // :1259
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1261
      await era.printAndWait(''); // :1262
      // CFLAG:374  = 3（变量语义：CFLAG 族，374） // :1263
      kojo.肛门虫着脱 = 3; // :1263
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1265
      await era.printAndWait(''); // :1266
      // CFLAG:374  = 2（变量语义：CFLAG 族，374） // :1267
      kojo.肛门虫着脱 = 2; // :1267
    } else if (kojo.肛门虫着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1269
      await era.printAndWait(''); // :1270
      // CFLAG:374  = 1（变量语义：CFLAG 族，374） // :1271
      kojo.肛门虫着脱 = 1; // :1271
    } // :1271-1272
    return 0; // :1271-1273
  } // :1271-1274

  if (era_flag.selectcom == 17 && era.get(`tequip:${target}:17`)) {
    // :1444

    if (kojo.飞机杯 == 0) {
      // :1446

      if (era.get(`talent:${target}:76`) == 1) {
        // :1448
        await era.printAndWait(''); // :1449
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1451
        await era.printAndWait(''); // :1452
      } else {
        // :1454-1457-1457-1457
        await era.printAndWait(''); // :1455
      } // :1456-1457-1457-1457
      // CFLAG:318  = 1（变量语义：CFLAG 族，318） // :1457
      kojo.飞机杯 = 1; // :1457
      return 0; // :1457-1458
    } else {
      // :1460-1462-1462-1462

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.飞机杯 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1462
        await era.printAndWait(''); // :1463
        // CFLAG:318  = 4（变量语义：CFLAG 族，318） // :1464
        kojo.飞机杯 = 4; // :1464
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.飞机杯 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1466
        await era.printAndWait(''); // :1467
        // CFLAG:318  = 3（变量语义：CFLAG 族，318） // :1468
        kojo.飞机杯 = 3; // :1468
      } else if (kojo.飞机杯 <= 1 || game.kojo.口上开关 == 2) {
        // :1470
        await era.printAndWait(''); // :1471
        // CFLAG:318  = 2（变量语义：CFLAG 族，318） // :1472
        kojo.飞机杯 = 2; // :1472
      } // :1472-1473
      return 0; // :1472-1474
    } // :1475-1477-1477-1477
  } else if (era_flag.selectcom == 17 && era.get(`tequip:${target}:17`) == 0) {
    // :1477

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.飞机杯着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1479
      await era.printAndWait(''); // :1480
      // CFLAG:378  = 3（变量语义：CFLAG 族，378） // :1481
      kojo.飞机杯着脱 = 3; // :1481
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.飞机杯着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1483
      await era.printAndWait(''); // :1484
      // CFLAG:378  = 2（变量语义：CFLAG 族，378） // :1485
      kojo.飞机杯着脱 = 2; // :1485
    } else if (kojo.飞机杯着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1487
      await era.printAndWait(''); // :1488
      // CFLAG:378  = 1（变量语义：CFLAG 族，378） // :1489
      kojo.飞机杯着脱 = 1; // :1489
    } // :1489-1490
    return 0; // :1489-1491
  } // :1489-1492

  if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`)) {
    // :1498

    if (kojo.肛珠 == 0) {
      // :1500

      if (era.get(`talent:${target}:76`) == 1) {
        // :1502
        await era.printAndWait(''); // :1503
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1505
        await era.printAndWait(''); // :1506
      } else {
        // :1508-1511-1511-1511
        await era.printAndWait(''); // :1509
      } // :1510-1511-1511-1511
      // CFLAG:TARGET:320  = 1（变量语义：CFLAG 族，TARGET:320） // :1511
      kojo.肛珠 = 1; // :1511
      return 0; // :1511-1512
    } else {
      // :1514-1516-1516-1516

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1516
        await era.printAndWait(''); // :1517
        // CFLAG:320  = 7（变量语义：CFLAG 族，320） // :1518
        kojo.肛珠 = 7; // :1518
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.肛珠 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1520
        await era.printAndWait(''); // :1521
        // CFLAG:320  = 6（变量语义：CFLAG 族，320） // :1522
        kojo.肛珠 = 6; // :1522
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1524
        await era.printAndWait(''); // :1525
        // CFLAG:320  = 5（变量语义：CFLAG 族，320） // :1526
        kojo.肛珠 = 5; // :1526
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.肛珠 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1528
        await era.printAndWait(''); // :1529
        // CFLAG:320  = 4（变量语义：CFLAG 族，320） // :1530
        kojo.肛珠 = 4; // :1530
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1532
        await era.printAndWait(''); // :1533
        // CFLAG:320  = 3（变量语义：CFLAG 族，320） // :1534
        kojo.肛珠 = 3; // :1534
      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 == 2) {
        // :1536
        await era.printAndWait(''); // :1537
        // CFLAG:320  = 2（变量语义：CFLAG 族，320） // :1538
        kojo.肛珠 = 2; // :1538
      } // :1538-1539
      return 0; // :1538-1540
    } // :1541-1543-1543-1543
  } else if (era_flag.selectcom == 19 && era.get(`tequip:${target}:19`) == 0) {
    // :1543

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 == 2)
    ) {
      // :1545
      await era.printAndWait(''); // :1546
      // CFLAG:379  = 4（变量语义：CFLAG 族，379） // :1547
      kojo.肛珠着脱 = 4; // :1547
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :1549
      await era.printAndWait(''); // :1550
      // CFLAG:379  = 3（变量语义：CFLAG 族，379） // :1551
      kojo.肛珠着脱 = 3; // :1551
    } else if (
      era.get(`abl:${target}:3`) >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :1553
      await era.printAndWait(''); // :1554
      // CFLAG:379  = 2（变量语义：CFLAG 族，379） // :1555
      kojo.肛珠着脱 = 2; // :1555
    } else if (kojo.肛珠着脱 < 1 || game.kojo.口上开关 == 2) {
      // :1557
      await era.printAndWait(''); // :1558
      // CFLAG:379  = 1（变量语义：CFLAG 族，379） // :1559
      kojo.肛珠着脱 = 1; // :1559
    } // :1559-1560
    return 0; // :1559-1561
  } // :1559-1562

  if (era_flag.selectcom == 20) {
    // :1568

    if (kojo.正常位 == 0) {
      // :1570

      if (era.get(`talent:${target}:0`) == 1) {
        // :1572

        if (era.get(`talent:${target}:76`) == 1) {
          // :1574
          await era.printAndWait(''); // :1575
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          era.get(`abl:${target}:10`) >= 5
        ) {
          // :1577
          await era.printAndWait(''); // :1578
        } else {
          // :1577-1580
          await era.printAndWait(''); // :1581
        } // :1577-1582
      } else {
        // :1577-1584
        if (era.get(`talent:${target}:76`) == 1) {
          // :1585
          await era.printAndWait(''); // :1586
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1588
          await era.printAndWait(''); // :1589
        } else {
          // :1591-1595-1595-1595
          await era.printAndWait(''); // :1592
        } // :1593-1595-1595-1595
      } // :1594-1595-1595-1595
      // CFLAG:321  = 1（变量语义：CFLAG 族，321） // :1595
      kojo.正常位 = 1; // :1595
      return 0; // :1595-1596
    } else {
      // :1598-1600-1600-1600

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.正常位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1600
        await era.printAndWait(''); // :1601
        // CFLAG:321  = 6（变量语义：CFLAG 族，321） // :1602
        kojo.正常位 = 6; // :1602
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1604
        await era.printAndWait(''); // :1605
        // CFLAG:321  = 5（变量语义：CFLAG 族，321） // :1606
        kojo.正常位 = 5; // :1606
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1608
        await era.printAndWait(''); // :1609
        // CFLAG:321  = 4（变量语义：CFLAG 族，321） // :1610
        kojo.正常位 = 4; // :1610
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1612
        await era.printAndWait(''); // :1613
        // CFLAG:321  = 3（变量语义：CFLAG 族，321） // :1614
        kojo.正常位 = 3; // :1614
      } else if (kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {
        // :1616
        await era.printAndWait(''); // :1617
        // CFLAG:321  = 2（变量语义：CFLAG 族，321） // :1618
        kojo.正常位 = 2; // :1618
      } // :1618-1619
      return 0; // :1618-1620
    } // :1618-1621
  } // :1622-1625-1625-1625

  if (era_flag.selectcom == 21) {
    // :1628

    if (kojo.背后位 == 0) {
      // :1630

      if (era.get(`talent:${target}:0`) == 1) {
        // :1632

        if (era.get(`talent:${target}:76`) == 1) {
          // :1634
          await era.printAndWait(''); // :1635
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1637
          await era.printAndWait(''); // :1638
        } else {
          // :1625-1641
          await era.printAndWait(''); // :1642
        } // :1625-1643
      } else {
        // :1645-1662-1662

        if (era.get(`talent:${target}:76`) == 1) {
          // :1647
          await era.printAndWait(''); // :1648
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1650
          await era.printAndWait(''); // :1651
        } else {
          // :1653-1662-1662-1662
          await era.printAndWait(''); // :1654
        } // :1655-1662-1662-1662
      } // :1656-1662-1662-1662
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :1657
      kojo.背后位 = 1; // :1657
      return 0; // :1658-1662-1662-1662
    } else {
      // :1660-1662-1662-1662

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1662
        if (rand_n(3) == 0) {
          // :1663
          await era.printAndWait(''); // :1664
        } else if (rand_n(2) == 0) {
          // :1665
          await era.printAndWait(''); // :1666
        } else {
          // :1662-1667
          await era.printAndWait(''); // :1668
        } // :1662-1669
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :1670
        kojo.背后位 = 6; // :1670
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1672
        if (rand_n(3) == 0) {
          // :1673
          await era.printAndWait(''); // :1674
        } else if (rand_n(2) == 0) {
          // :1675
          await era.printAndWait(''); // :1676
        } else {
          // :1662-1677
          await era.printAndWait(''); // :1678
        } // :1662-1679
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :1680
        kojo.背后位 = 5; // :1680
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1682
        await era.printAndWait(''); // :1683
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :1684
        kojo.背后位 = 4; // :1684
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1686
        await era.printAndWait(''); // :1687
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :1688
        kojo.背后位 = 3; // :1688
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        // :1690
        await era.printAndWait(''); // :1691

        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :1693
        kojo.背后位 = 2; // :1693
      } // :1694-1700-1700-1700
      return 0; // :1695-1700-1700-1700
    } // :1696-1700-1700-1700
  } // :1697-1700-1700-1700

  if (era_flag.selectcom == 22) {
    // :1703
    if (kojo.对面座位 == 0) {
      // :1704

      if (era.get(`talent:${target}:0`) == 1) {
        // :1706

        if (era.get(`talent:${target}:76`) == 1) {
          // :1708
          await era.printAndWait(''); // :1709
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1711
          await era.printAndWait(''); // :1712
        } else {
          // :1704-1714
          await era.printAndWait(''); // :1715
        } // :1704-1716
      } else {
        // :1718-1730-1730-1730

        if (era.get(`talent:${target}:76`) == 1) {
          // :1720
          await era.printAndWait(''); // :1721
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1723
          await era.printAndWait(''); // :1724
        } else {
          // :1726-1730-1730-1730
          await era.printAndWait(''); // :1727
        } // :1728-1730-1730-1730
      } // :1729-1730-1730-1730
      // CFLAG:323  = 1（变量语义：CFLAG 族，323） // :1730
      kojo.对面座位 = 1; // :1730
      return 0; // :1730-1731
    } else {
      // :1733-1735-1735-1735

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1735
        if (rand_n(3) == 0) {
          // :1736
          await era.printAndWait(''); // :1737
        } else if (rand_n(2) == 0) {
          // :1738
          await era.printAndWait(''); // :1739
        } else {
          // :1740-1743-1743-1743
          await era.printAndWait(''); // :1741
        } // :1742-1743-1743-1743
        // CFLAG:323  = 6（变量语义：CFLAG 族，323） // :1743
        kojo.对面座位 = 6; // :1743
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1745
        if (rand_n(3) == 0) {
          // :1746
          await era.printAndWait(''); // :1747
        } else if (rand_n(2) == 0) {
          // :1748
          await era.printAndWait(''); // :1749
        } else {
          // :1750-1753-1753-1753
          await era.printAndWait(''); // :1751
        } // :1752-1753-1753-1753
        // CFLAG:323  = 5（变量语义：CFLAG 族，323） // :1753
        kojo.对面座位 = 5; // :1753
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1755
        await era.printAndWait(''); // :1756
        // CFLAG:323  = 4（变量语义：CFLAG 族，323） // :1757
        kojo.对面座位 = 4; // :1757
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1759
        await era.printAndWait(''); // :1760
        // CFLAG:323  = 3（变量语义：CFLAG 族，323） // :1761
        kojo.对面座位 = 3; // :1761
      } else if (kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {
        // :1763
        await era.printAndWait(''); // :1764
        // CFLAG:323  = 2（变量语义：CFLAG 族，323） // :1765
        kojo.对面座位 = 2; // :1765
      } // :1765-1766
      return 0; // :1765-1767
    } // :1765-1768
  } // :1769-1772-1772-1772

  if (era_flag.selectcom == 23) {
    // :1775
    if (kojo.背面座位 == 0) {
      // :1776

      if (era.get(`talent:${target}:0`) == 1) {
        // :1778

        if (era.get(`talent:${target}:76`) == 1) {
          // :1780
          await era.printAndWait(''); // :1781
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1783
          await era.printAndWait(''); // :1784
        } else {
          // :1776-1786
          await era.printAndWait(''); // :1787
        } // :1776-1788
      } else {
        // :1790-1802-1802-1802

        if (era.get(`talent:${target}:76`) == 1) {
          // :1792
          await era.printAndWait(''); // :1793
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :1795
          await era.printAndWait(''); // :1796
        } else {
          // :1798-1802-1802-1802
          await era.printAndWait(''); // :1799
        } // :1800-1802-1802-1802
      } // :1801-1802-1802-1802
      // CFLAG:324  = 1（变量语义：CFLAG 族，324） // :1802
      kojo.背面座位 = 1; // :1802
      return 0; // :1802-1803
    } else {
      // :1805-1807-1807-1807

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1807
        if (rand_n(3) == 0) {
          // :1808
          await era.printAndWait(''); // :1809
        } else if (rand_n(2) == 0) {
          // :1810
          await era.printAndWait(''); // :1811
        } else {
          // :1812-1815-1815-1815
          await era.printAndWait(''); // :1813
        } // :1814-1815-1815-1815
        // CFLAG:324  = 6（变量语义：CFLAG 族，324） // :1815
        kojo.背面座位 = 6; // :1815
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1817
        if (rand_n(3) == 0) {
          // :1818
          await era.printAndWait(''); // :1819
        } else if (rand_n(2) == 0) {
          // :1820
          await era.printAndWait(''); // :1821
        } else {
          // :1822-1825-1825-1825
          await era.printAndWait(''); // :1823
        } // :1824-1825-1825-1825
        // CFLAG:324  = 5（变量语义：CFLAG 族，324） // :1825
        kojo.背面座位 = 5; // :1825
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1827
        await era.printAndWait(''); // :1828
        // CFLAG:324  = 4（变量语义：CFLAG 族，324） // :1829
        kojo.背面座位 = 4; // :1829
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1831
        await era.printAndWait(''); // :1832
        // CFLAG:324  = 3（变量语义：CFLAG 族，324） // :1833
        kojo.背面座位 = 3; // :1833
      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {
        // :1835
        await era.printAndWait(''); // :1836
        // CFLAG:324  = 2（变量语义：CFLAG 族，324） // :1837
        kojo.背面座位 = 2; // :1837
      } // :1837-1838
      return 0; // :1837-1839
    } // :1837-1840
  } // :1841-1844-1844-1844

  if (era_flag.selectcom == 26) {
    // :1846

    if (kojo.正常位肛交 == 0) {
      // :1848

      if (era.get(`talent:${target}:76`) == 1) {
        // :1850
        await era.printAndWait(''); // :1851
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1853
        await era.printAndWait(''); // :1854
      } else {
        // :1856-1859-1859-1859
        await era.printAndWait(''); // :1857
      } // :1858-1859-1859-1859
      // CFLAG:TARGET:327  = 1（变量语义：CFLAG 族，TARGET:327） // :1859
      kojo.正常位肛交 = 1; // :1859
      return 0; // :1859-1860
    } else {
      // :1862-1864-1864-1864

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1864
        if (rand_n(3) == 0) {
          // :1865
          await era.printAndWait(''); // :1866
        } else if (rand_n(2) == 0) {
          // :1867
          await era.printAndWait(''); // :1868
        } else {
          // :1869-1872-1872-1872
          await era.printAndWait(''); // :1870
        } // :1871-1872-1872-1872
        // CFLAG:327  = 7（变量语义：CFLAG 族，327） // :1872
        kojo.正常位肛交 = 7; // :1872
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1874
        await era.printAndWait(''); // :1875
        // CFLAG:327  = 6（变量语义：CFLAG 族，327） // :1876
        kojo.正常位肛交 = 6; // :1876
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1878
        if (rand_n(2) == 0) {
          // :1879
          await era.printAndWait(''); // :1880
        } else {
          // :1878-1881
          await era.printAndWait(''); // :1882
        } // :1883-1884-1884-1884
        // CFLAG:327  = 5（变量语义：CFLAG 族，327） // :1884
        kojo.正常位肛交 = 5; // :1884
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1886
        await era.printAndWait(''); // :1887
        // CFLAG:327  = 4（变量语义：CFLAG 族，327） // :1888
        kojo.正常位肛交 = 4; // :1888
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1890
        await era.printAndWait(''); // :1891
        // CFLAG:327  = 3（变量语义：CFLAG 族，327） // :1892
        kojo.正常位肛交 = 3; // :1892
      } else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :1894
        await era.printAndWait(''); // :1895
        // CFLAG:327  = 2（变量语义：CFLAG 族，327） // :1896
        kojo.正常位肛交 = 2; // :1896
      } // :1896-1897
      return 0; // :1896-1898
    } // :1896-1899
  } // :1900-1903-1903-1903

  if (era_flag.selectcom == 27) {
    // :1905

    if (kojo.背后位肛交 == 0) {
      // :1907

      if (era.get(`talent:${target}:76`) == 1) {
        // :1909
        await era.printAndWait(''); // :1910
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1912
        await era.printAndWait(''); // :1913
      } else {
        // :1915-1923-1923-1923
        await era.printAndWait(''); // :1916
      } // :1917-1923-1923-1923
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :1918
      kojo.背后位肛交 = 1; // :1918
      return 0; // :1919-1923-1923-1923
    } else {
      // :1921-1923-1923-1923

      if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1923
        if (rand_n(2) == 0) {
          // :1924
          await era.printAndWait(''); // :1925
        } else {
          // :1923-1926
          await era.printAndWait(''); // :1927
        } // :1923-1928
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :1929
        kojo.背后位肛交 = 5; // :1929
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1931
        await era.printAndWait(''); // :1932
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :1933
        kojo.背后位肛交 = 4; // :1933
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1935
        await era.printAndWait(''); // :1936
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :1937
        kojo.背后位肛交 = 3; // :1937
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :1939
        await era.printAndWait(''); // :1940
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :1941
        kojo.背后位肛交 = 2; // :1941
      } // :1942-1948-1948-1948
      return 0; // :1943-1948-1948-1948
    } // :1944-1948-1948-1948
  } // :1945-1948-1948-1948

  if (era_flag.selectcom == 28) {
    // :1950

    if (kojo.对面座位肛交 == 0) {
      // :1952

      if (era.get(`talent:${target}:76`) == 1) {
        // :1954
        await era.printAndWait(''); // :1955
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :1957
        await era.printAndWait(''); // :1958
      } else {
        // :1960-1963-1963-1963
        await era.printAndWait(''); // :1961
      } // :1962-1963-1963-1963
      // CFLAG:TARGET:329  = 1（变量语义：CFLAG 族，TARGET:329） // :1963
      kojo.对面座位肛交 = 1; // :1963
      return 0; // :1963-1964
    } else {
      // :1966-1968-1968-1968

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :1968
        if (rand_n(3) == 0) {
          // :1969
          await era.printAndWait(''); // :1970
        } else if (rand_n(2) == 0) {
          // :1971
          await era.printAndWait(''); // :1972
        } else {
          // :1973-1976-1976-1976
          await era.printAndWait(''); // :1974
        } // :1975-1976-1976-1976
        // CFLAG:329  = 7（变量语义：CFLAG 族，329） // :1976
        kojo.对面座位肛交 = 7; // :1976
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :1978
        await era.printAndWait(''); // :1979
        // CFLAG:329  = 6（变量语义：CFLAG 族，329） // :1980
        kojo.对面座位肛交 = 6; // :1980
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :1982
        if (rand_n(2) == 0) {
          // :1983
          await era.printAndWait(''); // :1984
        } else {
          // :1982-1985
          await era.printAndWait(''); // :1986
        } // :1987-1988-1988-1988
        // CFLAG:329  = 5（变量语义：CFLAG 族，329） // :1988
        kojo.对面座位肛交 = 5; // :1988
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.对面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :1990
        await era.printAndWait(''); // :1991
        // CFLAG:329  = 4（变量语义：CFLAG 族，329） // :1992
        kojo.对面座位肛交 = 4; // :1992
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.对面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :1994
        await era.printAndWait(''); // :1995
        // CFLAG:329  = 3（变量语义：CFLAG 族，329） // :1996
        kojo.对面座位肛交 = 3; // :1996
      } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :1998
        await era.printAndWait(''); // :1999
        // CFLAG:329  = 2（变量语义：CFLAG 族，329） // :2000
        kojo.对面座位肛交 = 2; // :2000
      } // :2000-2001
      return 0; // :2000-2002
    } // :2000-2003
  } // :2004-2007-2007-2007

  if (era_flag.selectcom == 29) {
    // :2009

    if (kojo.背面座位肛交 == 0) {
      // :2011

      if (era.get(`talent:${target}:76`) == 1) {
        // :2013
        await era.printAndWait(''); // :2014
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2016
        await era.printAndWait(''); // :2017
      } else {
        // :2019-2022-2022-2022
        await era.printAndWait(''); // :2020
      } // :2021-2022-2022-2022
      // CFLAG:TARGET:330  = 1（变量语义：CFLAG 族，TARGET:330） // :2022
      kojo.背面座位肛交 = 1; // :2022
      return 0; // :2022-2023
    } else {
      // :2025-2027-2027-2027

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2027
        if (rand_n(2) == 0) {
          // :2028
          await era.printAndWait(''); // :2029
        } else {
          // :2027-2030
          await era.printAndWait(''); // :2031
        } // :2032-2033-2033-2033
        // CFLAG:330  = 7（变量语义：CFLAG 族，330） // :2033
        kojo.背面座位肛交 = 7; // :2033
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2035
        await era.printAndWait(''); // :2036
        // CFLAG:330  = 6（变量语义：CFLAG 族，330） // :2037
        kojo.背面座位肛交 = 6; // :2037
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2039
        if (rand_n(2) == 0) {
          // :2040
          await era.printAndWait(''); // :2041
        } else {
          // :2039-2042
          await era.printAndWait(''); // :2043
        } // :2044-2045-2045-2045
        // CFLAG:330  = 5（变量语义：CFLAG 族，330） // :2045
        kojo.背面座位肛交 = 5; // :2045
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背面座位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2047
        await era.printAndWait(''); // :2048
        // CFLAG:330  = 4（变量语义：CFLAG 族，330） // :2049
        kojo.背面座位肛交 = 4; // :2049
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背面座位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2051
        await era.printAndWait(''); // :2052
        // CFLAG:330  = 3（变量语义：CFLAG 族，330） // :2053
        kojo.背面座位肛交 = 3; // :2053
      } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :2055
        await era.printAndWait(''); // :2056
        // CFLAG:330  = 2（变量语义：CFLAG 族，330） // :2057
        kojo.背面座位肛交 = 2; // :2057
      } // :2057-2058
      return 0; // :2057-2059
    } // :2057-2060
  } // :2061-2064-2064-2064

  if (era_flag.selectcom == 30) {
    // :2066

    if (kojo.手淫 == 0) {
      // :2068

      if (era.get(`talent:${target}:76`) == 1) {
        // :2070
        await era.printAndWait(''); // :2071
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2073
        await era.printAndWait(''); // :2074
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :2076
        await era.printAndWait(''); // :2077
      } else {
        // :2079-2087-2087-2087
        await era.printAndWait(''); // :2080
      } // :2081-2087-2087-2087
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :2082
      kojo.手淫 = 1; // :2082
      return 0; // :2083-2087-2087-2087
    } else {
      // :2085-2087-2087-2087

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2087
        if (rand_n(2) == 0) {
          // :2088
          await era.printAndWait(''); // :2089
        } else {
          // :2087-2090
          await era.printAndWait(''); // :2091
        } // :2087-2092
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :2093
        kojo.手淫 = 6; // :2093
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2095
        if (rand_n(2) == 0) {
          // :2096
          await era.printAndWait(''); // :2097
        } else {
          // :2087-2098
          await era.printAndWait(''); // :2099
        } // :2087-2100
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :2101
        kojo.手淫 = 5; // :2101
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2103
        await era.printAndWait(''); // :2104
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :2105
        kojo.手淫 = 4; // :2105
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2107
        await era.printAndWait(''); // :2108
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :2109
        kojo.手淫 = 3; // :2109
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        // :2111
        await era.printAndWait(''); // :2112
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :2113
        kojo.手淫 = 2; // :2113
      } // :2114-2120-2120-2120
      return 0; // :2115-2120-2120-2120
    } // :2116-2120-2120-2120
  } // :2117-2120-2120-2120

  if (era_flag.selectcom == 31) {
    // :2122

    if (kojo.口交_奴 == 0) {
      // :2124

      if (era.get(`talent:${target}:76`) == 1) {
        // :2126
        await era.printAndWait(''); // :2127
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2129
        await era.printAndWait(''); // :2130
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :2132
        await era.printAndWait(''); // :2133
      } else {
        // :2135-2143-2143-2143
        await era.printAndWait(''); // :2136
      } // :2137-2143-2143-2143
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :2138
      kojo.口交_奴 = 1; // :2138
      return 0; // :2139-2143-2143-2143
    } else {
      // :2141-2143-2143-2143

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2143
        await era.printAndWait(''); // :2144
        // CFLAG:332  = 6（变量语义：CFLAG 族，332） // :2145
        kojo.口交_奴 = 6; // :2145
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2147
        await era.printAndWait(''); // :2148
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :2149
        kojo.口交_奴 = 5; // :2149
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2151
        await era.print(''); // :2152
        await era.printAndWait(''); // :2153
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :2154
        kojo.口交_奴 = 4; // :2154
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2156
        await era.print(''); // :2157
        await era.printAndWait(''); // :2158
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :2159
        kojo.口交_奴 = 3; // :2159
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        // :2161
        await era.printAndWait(''); // :2162
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :2163
        kojo.口交_奴 = 2; // :2163
      } // :2164-2170-2170-2170
      return 0; // :2165-2170-2170-2170
    } // :2166-2170-2170-2170
  } // :2167-2170-2170-2170

  if (era_flag.selectcom == 32) {
    // :2173

    if (kojo.乳交 == 0) {
      // :2175

      if (era.get(`talent:${target}:76`) == 1) {
        // :2177
        await era.printAndWait(''); // :2178
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2180
        await era.printAndWait(''); // :2181
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :2183
        await era.printAndWait(''); // :2184
      } else {
        // :2186-2189-2189-2189
        await era.printAndWait(''); // :2187
      } // :2188-2189-2189-2189
      // CFLAG:TARGET:333  = 1（变量语义：CFLAG 族，TARGET:333） // :2189
      kojo.乳交 = 1; // :2189
      return 0; // :2189-2190
    } else {
      // :2192-2194-2194-2194

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2194
        if (rand_n(2) == 0) {
          // :2195
          await era.printAndWait(''); // :2196
        } else {
          // :2194-2197
          await era.printAndWait(''); // :2198
        } // :2199-2200-2200-2200
        // CFLAG:333  = 6（变量语义：CFLAG 族，333） // :2200
        kojo.乳交 = 6; // :2200
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2202
        await era.printAndWait(''); // :2203
        // CFLAG:333  = 5（变量语义：CFLAG 族，333） // :2204
        kojo.乳交 = 5; // :2204
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.乳交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2206
        if (rand_n(2) == 0) {
          // :2207
          await era.printAndWait(''); // :2208
        } else {
          // :2206-2209
          await era.printAndWait(''); // :2210
        } // :2211-2212-2212-2212
        // CFLAG:333  = 4（变量语义：CFLAG 族，333） // :2212
        kojo.乳交 = 4; // :2212
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.乳交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2214
        await era.printAndWait(''); // :2215
        // CFLAG:333  = 3（变量语义：CFLAG 族，333） // :2216
        kojo.乳交 = 3; // :2216
      } else if (kojo.乳交 <= 1 || game.kojo.口上开关 == 2) {
        // :2218
        await era.printAndWait(''); // :2219
        // CFLAG:333  = 2（变量语义：CFLAG 族，333） // :2220
        kojo.乳交 = 2; // :2220
      } // :2220-2221
      return 0; // :2220-2222
    } // :2220-2223
  } // :2224-2227-2227-2227

  if (era_flag.selectcom == 33) {
    // :2229

    if (kojo.股间性交 == 0) {
      // :2231

      if (era.get(`talent:${target}:76`) == 1) {
        // :2233
        await era.printAndWait(''); // :2234
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2236
        await era.printAndWait(''); // :2237
      } else {
        // :2239-2242-2242-2242
        await era.printAndWait(''); // :2240
      } // :2241-2242-2242-2242
      // CFLAG:TARGET:334  = 1（变量语义：CFLAG 族，TARGET:334） // :2242
      kojo.股间性交 = 1; // :2242
      return 0; // :2242-2243
    } else {
      // :2245-2246-2246-2246

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2247
        await era.printAndWait(''); // :2248
        // CFLAG:334  = 6（变量语义：CFLAG 族，334） // :2249
        kojo.股间性交 = 6; // :2249
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2251
        await era.printAndWait(''); // :2252
        // CFLAG:334  = 5（变量语义：CFLAG 族，334） // :2253
        kojo.股间性交 = 5; // :2253
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`talent:${target}:0`) == 1 &&
        (kojo.股间性交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2255
        await era.printAndWait(''); // :2256
        await era.printAndWait(''); // :2257
        // CFLAG:334  = 4（变量语义：CFLAG 族，334） // :2258
        kojo.股间性交 = 4; // :2258
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2260
        await era.printAndWait(''); // :2261
        await era.printAndWait(''); // :2262
        // CFLAG:334  = 3（变量语义：CFLAG 族，334） // :2263
        kojo.股间性交 = 3; // :2263
      } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {
        // :2265
        await era.printAndWait(''); // :2266
        // CFLAG:334  = 2（变量语义：CFLAG 族，334） // :2267
        kojo.股间性交 = 2; // :2267
      } // :2267-2268
      return 0; // :2267-2269
    } // :2267-2270
  } // :2271-2274-2274-2274

  if (era_flag.selectcom == 34) {
    // :2277

    if (kojo.骑乘位 == 0) {
      // :2279

      if (era.get(`talent:${target}:0`) == 1) {
        // :2281

        if (era.get(`talent:${target}:76`) == 1) {
          // :2283
          await era.printAndWait(''); // :2284
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :2286
          await era.printAndWait(''); // :2287
        } else {
          // :2274-2289
          await era.printAndWait(''); // :2290
        } // :2274-2291
      } else {
        // :2293-2310-2310

        if (era.get(`talent:${target}:76`) == 1) {
          // :2295
          await era.printAndWait(''); // :2296
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :2298
          await era.printAndWait(''); // :2299
        } else {
          // :2301-2310-2310-2310
          await era.printAndWait(''); // :2302
        } // :2303-2310-2310-2310
      } // :2304-2310-2310-2310
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :2305
      kojo.骑乘位 = 1; // :2305
      return 0; // :2306-2310-2310-2310
    } else {
      // :2308-2310-2310-2310

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2310
        if (rand_n(4) == 0) {
          // :2311
          await era.printAndWait(''); // :2312
        } else if (rand_n(3) == 0) {
          // :2313
          await era.printAndWait(''); // :2314
        } else if (rand_n(2) == 0) {
          // :2315
          await era.printAndWait(''); // :2316
        } else {
          // :2310-2317
          await era.printAndWait(''); // :2318
        } // :2310-2319
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :2320
        kojo.骑乘位 = 6; // :2320
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2322
        if (rand_n(4) == 0) {
          // :2323
          await era.print(''); // :2324
        } else if (rand_n(3) == 0) {
          // :2325
          await era.printAndWait(''); // :2326
        } else if (rand_n(2) == 0) {
          // :2327
          await era.printAndWait(''); // :2328
        } else {
          // :2310-2329
          await era.printAndWait(''); // :2330
        } // :2310-2331
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :2332
        kojo.骑乘位 = 5; // :2332
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2334
        if (rand_n(4) == 0) {
          // :2335
          await era.printAndWait(''); // :2336
        } else if (rand_n(3) == 0) {
          // :2337
          await era.printAndWait(''); // :2338
        } else if (rand_n(2) == 0) {
          // :2339
          await era.printAndWait(''); // :2340
        } else {
          // :2341-2360-2360
          await era.printAndWait(''); // :2342
        } // :2343-2360-2360
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :2344
        kojo.骑乘位 = 4; // :2344
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2346
        await era.print(''); // :2347
        await era.printAndWait(''); // :2348
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :2349
        kojo.骑乘位 = 3; // :2349
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :2351
        await era.printAndWait(''); // :2352
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :2353
        kojo.骑乘位 = 2; // :2353
      } // :2354-2360-2360-2360
      return 0; // :2355-2360-2360-2360
    } // :2356-2360-2360-2360
  } // :2357-2360-2360-2360

  if (era_flag.selectcom == 35) {
    // :2362

    if (kojo.全身擦洗 == 0) {
      // :2364

      if (era.get(`abl:${target}:16`) >= 3) {
        // :2366
        await era.printAndWait(''); // :2367
      } else {
        // :2369-2372-2372-2372
        await era.printAndWait(''); // :2370
      } // :2371-2372-2372-2372
      // CFLAG:TARGET:336  = 1（变量语义：CFLAG 族，TARGET:336） // :2372
      kojo.全身擦洗 = 1; // :2372
      return 0; // :2372-2373
    } else {
      // :2375-2377-2377-2377

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2377
        await era.printAndWait(''); // :2378
        // CFLAG:336  = 5（变量语义：CFLAG 族，336） // :2379
        kojo.全身擦洗 = 5; // :2379
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2381
        await era.printAndWait(''); // :2382
        // CFLAG:336  = 4（变量语义：CFLAG 族，336） // :2383
        kojo.全身擦洗 = 4; // :2383
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.全身擦洗 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2385
        await era.printAndWait(''); // :2386
        // CFLAG:336  = 3（变量语义：CFLAG 族，336） // :2387
        kojo.全身擦洗 = 3; // :2387
      } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 == 2) {
        // :2389
        await era.printAndWait(''); // :2390
        // CFLAG:336  = 2（变量语义：CFLAG 族，336） // :2391
        kojo.全身擦洗 = 2; // :2391
      } // :2391-2392
      return 0; // :2391-2393
    } // :2391-2394
  } // :2395-2398-2398-2398

  if (era_flag.selectcom == 36) {
    // :2400

    if (kojo.骑乘位肛交 == 0) {
      // :2402

      if (era.get(`talent:${target}:76`) == 1) {
        // :2404
        await era.printAndWait(''); // :2405
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2407
        await era.printAndWait(''); // :2408
      } else {
        // :2410-2413-2413-2413
        await era.printAndWait(''); // :2411
      } // :2412-2413-2413-2413
      // CFLAG:TARGET:337  = 1（变量语义：CFLAG 族，TARGET:337） // :2413
      kojo.骑乘位肛交 = 1; // :2413
      return 0; // :2413-2414
    } else {
      // :2416-2418-2418-2418

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2418
        if (rand_n(2) == 0) {
          // :2419
          await era.printAndWait(''); // :2420
        } else {
          // :2418-2421
          await era.printAndWait(''); // :2422
        } // :2423-2424-2424-2424
        // CFLAG:337  = 7（变量语义：CFLAG 族，337） // :2424
        kojo.骑乘位肛交 = 7; // :2424
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2426
        await era.printAndWait(''); // :2427
        // CFLAG:337  = 6（变量语义：CFLAG 族，337） // :2428
        kojo.骑乘位肛交 = 6; // :2428
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2430
        if (rand_n(2) == 0) {
          // :2431
          await era.printAndWait(''); // :2432
        } else {
          // :2430-2433
          await era.printAndWait(''); // :2434
        } // :2435-2436-2436-2436
        // CFLAG:337  = 5（变量语义：CFLAG 族，337） // :2436
        kojo.骑乘位肛交 = 5; // :2436
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2438
        await era.printAndWait(''); // :2439
        // CFLAG:337  = 4（变量语义：CFLAG 族，337） // :2440
        kojo.骑乘位肛交 = 4; // :2440
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2442
        await era.printAndWait(''); // :2443
        // CFLAG:337  = 3（变量语义：CFLAG 族，337） // :2444
        kojo.骑乘位肛交 = 3; // :2444
      } else if (kojo.骑乘位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :2446
        await era.printAndWait(''); // :2447
        // CFLAG:337  = 2（变量语义：CFLAG 族，337） // :2448
        kojo.骑乘位肛交 = 2; // :2448
      } // :2448-2449
      return 0; // :2448-2450
    } // :2448-2451
  } // :2452-2455-2455-2455

  if (era_flag.selectcom == 37) {
    // :2457

    if (kojo.肛门侍奉 == 0) {
      // :2459

      if (era.get(`abl:${target}:16`) >= 3) {
        // :2461
        await era.printAndWait(''); // :2462
      } else {
        // :2464-2472-2472-2472
        await era.printAndWait(''); // :2465
      } // :2466-2472-2472-2472
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :2467
      kojo.肛门侍奉 = 1; // :2467
      return 0; // :2468-2472-2472-2472
    } else {
      // :2470-2472-2472-2472

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2472
        await era.printAndWait(''); // :2473
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :2474
        kojo.肛门侍奉 = 5; // :2474
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2476
        await era.print(''); // :2477
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :2478
        kojo.肛门侍奉 = 4; // :2478
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2480
        await era.printAndWait(''); // :2481
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :2482
        kojo.肛门侍奉 = 3; // :2482
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        // :2484
        await era.printAndWait(''); // :2485
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :2486
        kojo.肛门侍奉 = 2; // :2486
      } // :2487-2493-2493-2493
      return 0; // :2488-2493-2493-2493
    } // :2489-2493-2493-2493
  } // :2490-2493-2493-2493

  if (era_flag.selectcom == 40) {
    // :2495

    if (kojo.打屁股 == 0) {
      // :2497
      await era.printAndWait(''); // :2498
      // CFLAG:TARGET:341  = 1（变量语义：CFLAG 族，TARGET:341） // :2499
      kojo.打屁股 = 1; // :2499
      return 0; // :2499-2500
    } else {
      // :2502-2503-2503-2503

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2504
        await era.printAndWait(''); // :2505
        // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341） // :2506
        kojo.打屁股 = 5; // :2506
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2508
        await era.printAndWait(''); // :2509
        // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341） // :2510
        kojo.打屁股 = 4; // :2510
        return 0; // :2510-2511
      } else if (
        era.get(`mark:${target}:0`) == 3 &&
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2513
        await era.printAndWait(''); // :2514
        // CFLAG:TARGET:341  = 3（变量语义：CFLAG 族，TARGET:341） // :2515
        kojo.打屁股 = 3; // :2515
        return 0; // :2515-2516
      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 == 2) {
        // :2518
        await era.printAndWait(''); // :2519
        // CFLAG:TARGET:341  = 2（变量语义：CFLAG 族，TARGET:341） // :2520
        kojo.打屁股 = 2; // :2520
      } // :2520-2521
      return 0; // :2520-2522
    } // :2520-2523
  } // :2524-2527-2527-2527

  if (era_flag.selectcom == 41) {
    // :2529

    if (kojo.鞭 == 0) {
      // :2531

      if (era.get(`talent:${target}:76`) == 1) {
        // :2533
        await era.printAndWait(''); // :2534
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2536
        await era.printAndWait(''); // :2537
      } else {
        // :2539-2542-2542-2542
        await era.printAndWait(''); // :2540
      } // :2541-2542-2542-2542
      // CFLAG:TARGET:342  = 1（变量语义：CFLAG 族，TARGET:342） // :2542
      kojo.鞭 = 1; // :2542
      return 0; // :2542-2543
    } else {
      // :2545-2547-2547-2547

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2547
        await era.printAndWait(''); // :2548
        // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342） // :2549
        kojo.鞭 = 9; // :2549
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2551
        await era.printAndWait(''); // :2552
        // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342） // :2553
        kojo.鞭 = 8; // :2553
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.鞭 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2555
        await era.printAndWait(''); // :2556
        // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342） // :2557
        kojo.鞭 = 7; // :2557
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.鞭 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2559
        await era.printAndWait(''); // :2560
        // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342） // :2561
        kojo.鞭 = 6; // :2561
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2563
        await era.printAndWait(''); // :2564
        // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342） // :2565
        kojo.鞭 = 5; // :2565
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.鞭 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2567
        await era.printAndWait(''); // :2568
        // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342） // :2569
        kojo.鞭 = 4; // :2569
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.鞭 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2571
        await era.printAndWait(''); // :2572
        // CFLAG:TARGET:342  = 3（变量语义：CFLAG 族，TARGET:342） // :2573
        kojo.鞭 = 3; // :2573
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :2575
        await era.printAndWait(''); // :2576
        // CFLAG:TARGET:342  = 2（变量语义：CFLAG 族，TARGET:342） // :2577
        kojo.鞭 = 2; // :2577
      } // :2577-2578
      return 0; // :2577-2579
    } // :2577-2580
  } // :2581-2584-2584-2584

  if (era_flag.selectcom == 42) {
    // :2586

    if (kojo.针 == 0) {
      // :2588

      if (era.get(`talent:${target}:76`) == 1) {
        // :2590
        await era.printAndWait(''); // :2591
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2593
        await era.printAndWait(''); // :2594
      } else {
        // :2596-2599-2599-2599
        await era.printAndWait(''); // :2597
      } // :2598-2599-2599-2599
      // CFLAG:TARGET:343  = 1（变量语义：CFLAG 族，TARGET:343） // :2599
      kojo.针 = 1; // :2599
      return 0; // :2599-2600
    } else {
      // :2602-2604-2604-2604

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2604
        await era.printAndWait(''); // :2605
        // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343） // :2606
        kojo.针 = 9; // :2606
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2608
        await era.printAndWait(''); // :2609
        // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343） // :2610
        kojo.针 = 8; // :2610
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.针 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2612
        await era.printAndWait(''); // :2613
        // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343） // :2614
        kojo.针 = 7; // :2614
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.针 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2616
        await era.printAndWait(''); // :2617
        // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343） // :2618
        kojo.针 = 6; // :2618
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2620
        await era.printAndWait(''); // :2621
        // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343） // :2622
        kojo.针 = 5; // :2622
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.针 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2624
        await era.printAndWait(''); // :2625
        // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343） // :2626
        kojo.针 = 4; // :2626
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.针 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2628
        await era.printAndWait(''); // :2629
        // CFLAG:TARGET:343  = 3（变量语义：CFLAG 族，TARGET:343） // :2630
        kojo.针 = 3; // :2630
      } else if (kojo.针 <= 1 || game.kojo.口上开关 == 2) {
        // :2632
        await era.printAndWait(''); // :2633
        // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343） // :2634
        kojo.针 = 2; // :2634
      } // :2634-2635
      return 0; // :2634-2636
    } // :2634-2637
  } // :2634-2638

  if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`)) {
    // :2644

    if (kojo.眼罩 == 0) {
      // :2646

      if (era.get(`talent:${target}:76`) == 1) {
        // :2648
        await era.printAndWait(''); // :2649
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2651
        await era.printAndWait(''); // :2652
      } else {
        // :2654-2662-2662-2662
        await era.printAndWait(''); // :2655
      } // :2656-2662-2662-2662
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :2657
      kojo.眼罩 = 1; // :2657
      return 0; // :2658-2662-2662-2662
    } else {
      // :2660-2662-2662-2662

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2662
        await era.printAndWait(''); // :2663
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :2664
        kojo.眼罩 = 9; // :2664
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2666
        await era.printAndWait(''); // :2667
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :2668
        kojo.眼罩 = 8; // :2668
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2670
        await era.printAndWait(''); // :2671
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :2672
        kojo.眼罩 = 7; // :2672
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2674
        await era.printAndWait(''); // :2675
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :2676
        kojo.眼罩 = 6; // :2676
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2678
        await era.printAndWait(''); // :2679
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :2680
        kojo.眼罩 = 5; // :2680
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2682
        await era.printAndWait(''); // :2683
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :2684
        kojo.眼罩 = 4; // :2684
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2686
        await era.printAndWait(''); // :2687
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :2688
        kojo.眼罩 = 3; // :2688
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        // :2690
        await era.printAndWait(''); // :2691
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :2692
        kojo.眼罩 = 2; // :2692
      } // :2693-2699-2699-2699
      return 0; // :2694-2699-2699-2699
    } // :2695-2699-2699-2699
  } else if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`) == 0) {
    // :2697

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.眼罩着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :2699
      await era.printAndWait(''); // :2700
      // CFLAG:380  = 3（变量语义：CFLAG 族，380） // :2701
      kojo.眼罩着脱 = 3; // :2701
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2703
      await era.printAndWait(''); // :2704
      // CFLAG:380  = 2（变量语义：CFLAG 族，380） // :2705
      kojo.眼罩着脱 = 2; // :2705
    } else if (kojo.眼罩着脱 < 1 || game.kojo.口上开关 == 2) {
      // :2707
      await era.printAndWait(''); // :2708
      // CFLAG:380  = 1（变量语义：CFLAG 族，380） // :2709
      kojo.眼罩着脱 = 1; // :2709
    } // :2709-2710
    return 0; // :2709-2711
  } // :2709-2712

  if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`)) {
    // :2718

    if (kojo.绳子 == 0) {
      // :2720

      if (era.get(`talent:${target}:76`) == 1) {
        // :2722
        await era.printAndWait(''); // :2723
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2725
        await era.printAndWait(''); // :2726
      } else {
        // :2728-2731-2731-2731
        await era.printAndWait(''); // :2729
      } // :2730-2731-2731-2731
      // CFLAG:TARGET:345  = 1（变量语义：CFLAG 族，TARGET:345） // :2731
      kojo.绳子 = 1; // :2731
      return 0; // :2731-2732
    } else {
      // :2734-2736-2736-2736

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2736
        await era.printAndWait(''); // :2737
        // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345） // :2738
        kojo.绳子 = 9; // :2738
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2740
        await era.printAndWait(''); // :2741
        // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345） // :2742
        kojo.绳子 = 8; // :2742
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.绳子 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2744
        await era.printAndWait(''); // :2745
        // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345） // :2746
        kojo.绳子 = 7; // :2746
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.绳子 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2748
        await era.printAndWait(''); // :2749
        // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345） // :2750
        kojo.绳子 = 6; // :2750
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2752
        await era.printAndWait(''); // :2753
        // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345） // :2754
        kojo.绳子 = 5; // :2754
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.绳子 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2756
        await era.printAndWait(''); // :2757
        // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345） // :2758
        kojo.绳子 = 4; // :2758
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.绳子 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2760
        await era.printAndWait(''); // :2761
        // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345） // :2762
        kojo.绳子 = 3; // :2762
      } else if (kojo.绳子 <= 1 || game.kojo.口上开关 == 2) {
        // :2764
        await era.printAndWait(''); // :2765
        // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345） // :2766
        kojo.绳子 = 2; // :2766
      } // :2766-2767
      return 0; // :2766-2768
    } // :2769-2771-2771-2771
  } else if (era_flag.selectcom == 44 && era.get(`tequip:${target}:44`) == 0) {
    // :2771

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2773
      await era.printAndWait(''); // :2774
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :2775
      kojo.绳子着脱 = 2; // :2775
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2777
      await era.printAndWait(''); // :2778
      // CFLAG:385  = 2（变量语义：CFLAG 族，385） // :2779
      kojo.绳子着脱 = 2; // :2779
    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 == 2) {
      // :2781
      await era.printAndWait(''); // :2782
      // CFLAG:385  = 1（变量语义：CFLAG 族，385） // :2783
      kojo.绳子着脱 = 1; // :2783
    } // :2783-2784
    return 0; // :2783-2785
  } // :2783-2786

  if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`)) {
    // :2792

    if (kojo.口塞 == 0) {
      // :2794

      if (era.get(`talent:${target}:76`) == 1) {
        // :2796
        await era.printAndWait(''); // :2797
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2799
        await era.printAndWait(''); // :2800
      } else {
        // :2802-2805-2805-2805
        await era.printAndWait(''); // :2803
      } // :2804-2805-2805-2805
      // CFLAG:TARGET:346  = 1（变量语义：CFLAG 族，TARGET:346） // :2805
      kojo.口塞 = 1; // :2805
      return 0; // :2805-2806
    } else {
      // :2808-2810-2810-2810

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :2810
        await era.printAndWait(''); // :2811
        // CFLAG:TARGET:346  = 9（变量语义：CFLAG 族，TARGET:346） // :2812
        kojo.口塞 = 9; // :2812
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :2814
        await era.printAndWait(''); // :2815
        // CFLAG:TARGET:346  = 8（变量语义：CFLAG 族，TARGET:346） // :2816
        kojo.口塞 = 8; // :2816
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2818
        await era.printAndWait(''); // :2819
        // CFLAG:TARGET:346  = 7（变量语义：CFLAG 族，TARGET:346） // :2820
        kojo.口塞 = 7; // :2820
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2822
        await era.printAndWait(''); // :2823
        // CFLAG:TARGET:346  = 6（变量语义：CFLAG 族，TARGET:346） // :2824
        kojo.口塞 = 6; // :2824
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2826
        await era.printAndWait(''); // :2827
        // CFLAG:TARGET:346  = 5（变量语义：CFLAG 族，TARGET:346） // :2828
        kojo.口塞 = 5; // :2828
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.口塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2830
        await era.printAndWait(''); // :2831
        // CFLAG:TARGET:346  = 4（变量语义：CFLAG 族，TARGET:346） // :2832
        kojo.口塞 = 4; // :2832
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.口塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2834
        await era.printAndWait(''); // :2835
        // CFLAG:TARGET:346  = 3（变量语义：CFLAG 族，TARGET:346） // :2836
        kojo.口塞 = 3; // :2836
      } else if (kojo.口塞 <= 1 || game.kojo.口上开关 == 2) {
        // :2838
        await era.printAndWait(''); // :2839
        // CFLAG:TARGET:346  = 2（变量语义：CFLAG 族，TARGET:346） // :2840
        kojo.口塞 = 2; // :2840
      } // :2840-2841
      return 0; // :2840-2842
    } // :2843-2845-2845-2845
  } else if (era_flag.selectcom == 45 && era.get(`tequip:${target}:45`) == 0) {
    // :2845

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.口塞着脱 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :2847
      await era.printAndWait(''); // :2848
      // CFLAG:386  = 3（变量语义：CFLAG 族，386） // :2849
      kojo.口塞着脱 = 3; // :2849
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :2851
      await era.printAndWait(''); // :2852
      // CFLAG:386  = 2（变量语义：CFLAG 族，386） // :2853
      kojo.口塞着脱 = 2; // :2853
    } else if (kojo.口塞着脱 < 1 || game.kojo.口上开关 == 2) {
      // :2855
      await era.printAndWait(''); // :2856
      // CFLAG:386  = 1（变量语义：CFLAG 族，386） // :2857
      kojo.口塞着脱 = 1; // :2857
    } // :2857-2858
    return 0; // :2857-2859
  } // :2857-2860

  if (era_flag.selectcom == 46 && era.get(`tequip:${target}:46`)) {
    // :2866

    if (kojo.灌肠肛塞 == 0) {
      // :2868

      if (era.get(`talent:${target}:76`) == 1) {
        // :2870
        await era.printAndWait(''); // :2871
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :2873
        await era.printAndWait(''); // :2874
      } else {
        // :2876-2879-2879-2879
        await era.printAndWait(''); // :2877
      } // :2878-2879-2879-2879
      // CFLAG:TARGET:347  = 1（变量语义：CFLAG 族，TARGET:347） // :2879
      kojo.灌肠肛塞 = 1; // :2879
      return 0; // :2879-2880
    } else {
      // :2882-2883-2883-2883

      if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :2884
        await era.printAndWait(''); // :2885
        // CFLAG:347  = 7（变量语义：CFLAG 族，347） // :2886
        kojo.灌肠肛塞 = 7; // :2886
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2888
        await era.printAndWait(''); // :2889
        // CFLAG:347  = 6（变量语义：CFLAG 族，347） // :2890
        kojo.灌肠肛塞 = 6; // :2890
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :2892
        await era.printAndWait(''); // :2893
        // CFLAG:347  = 5（变量语义：CFLAG 族，347） // :2894
        kojo.灌肠肛塞 = 5; // :2894
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.灌肠肛塞 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2896
        await era.printAndWait(''); // :2897
        // CFLAG:347  = 4（变量语义：CFLAG 族，347） // :2898
        kojo.灌肠肛塞 = 4; // :2898
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2900
        await era.printAndWait(''); // :2901
        // CFLAG:347  = 3（变量语义：CFLAG 族，347） // :2902
        kojo.灌肠肛塞 = 3; // :2902
      } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 == 2) {
        // :2904
        await era.printAndWait(''); // :2905
        // CFLAG:347  = 2（变量语义：CFLAG 族，347） // :2906
        kojo.灌肠肛塞 = 2; // :2906
      } // :2906-2907
      return 0; // :2906-2908
    } // :2906-2909
  } // :2910-2913-2913-2913

  if (era_flag.selectcom == 55) {
    // :2915

    if (kojo.放置PLAY == 0) {
      // :2917

      if (era.get(`talent:${target}:85`) == 1) {
        // :2919
        await era.printAndWait(''); // :2920
      } else {
        // :2922-2925-2925-2925
        await era.printAndWait(''); // :2923
      } // :2924-2925-2925-2925
      // CFLAG:356  = 1（变量语义：CFLAG 族，356） // :2925
      kojo.放置PLAY = 1; // :2925
      return 0; // :2925-2926
    } else {
      // :2928-2929-2929-2929

      if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`palam:${target}:5`) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :2930
        await era.printAndWait(''); // :2931
        // CFLAG:356  = 4（变量语义：CFLAG 族，356） // :2932
        kojo.放置PLAY = 4; // :2932
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.放置PLAY <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :2934
        await era.printAndWait(''); // :2935
        // CFLAG:356  = 3（变量语义：CFLAG 族，356） // :2936
        kojo.放置PLAY = 3; // :2936
      } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 == 2) {
        // :2938
        await era.printAndWait(''); // :2939
        // CFLAG:356  = 2（变量语义：CFLAG 族，356） // :2940
        kojo.放置PLAY = 2; // :2940
      } // :2940-2941
      return 0; // :2940-2942
    } // :2940-2943
  } // :2944-2947-2947-2947

  if (era_flag.selectcom == 56) {
    // :2950

    if (kojo.交谈 == 0) {
      // :2952
      if (era.get(`tequip:${target}:53`)) {
        // :2953

        if (era.get(`talent:${target}:76`) == 1) {
          // :2956
          await era.printAndWait(''); // :2957
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :2959
          await era.printAndWait(''); // :2960
        } else {
          // :2948-2962
          await era.printAndWait(''); // :2963
        } // :2948-2964
      } else {
        // :2948-2965

        if (era.get(`talent:${target}:76`) == 1) {
          // :2967
          await era.printAndWait(''); // :2968
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :2970
          await era.printAndWait(''); // :2971
        } else {
          // :2973-2984-2984-2984
          await era.printAndWait(''); // :2974
        } // :2975-2984-2984-2984
      } // :2976-2984-2984-2984
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :2977
      kojo.交谈 = 1; // :2977
      return 0; // :2978-2984-2984-2984
    } else {
      // :2980-2984-2984-2984
      if (era.get(`tequip:${target}:53`)) {
        // :2981

        if (
          era.get(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :2984
          await era.printAndWait(''); // :2985
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :2986
          kojo.交谈 = 4; // :2986
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :2988
          await era.printAndWait(''); // :2989
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :2990
          kojo.交谈 = 3; // :2990
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          // :2992
          await era.printAndWait(''); // :2993
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :2994
          kojo.交谈 = 2; // :2994
        } // :2995-2998-2998-2998
      } else {
        // :2996-2998-2998-2998

        if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :2998
          await era.printAndWait(''); // :2999
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :3000
          kojo.交谈 = 4; // :3000
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :3002
          await era.printAndWait(''); // :3003
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :3004
          kojo.交谈 = 3; // :3004
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          // :3006
          await era.printAndWait(''); // :3007
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :3008
          kojo.交谈 = 2; // :3008
        } // :3009-3015-3015-3015
      } // :3010-3015-3015-3015
      return 0; // :3011-3015-3015-3015
    } // :3012-3015-3015-3015
  } // :3013-3015-3015-3015

  if (era_flag.selectcom == 123) {
    // :3017

    if (kojo.乳夹口交 == 0) {
      // :3019

      if (era.get(`talent:${target}:76`) == 1) {
        // :3021
        await era.printAndWait(''); // :3022
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3024
        await era.printAndWait(''); // :3025
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :3027
        await era.printAndWait(''); // :3028
      } else {
        // :3030-3033-3033-3033
        await era.printAndWait(''); // :3031
      } // :3032-3033-3033-3033
      // CFLAG:TARGET:360  = 1（变量语义：CFLAG 族，TARGET:360） // :3033
      kojo.乳夹口交 = 1; // :3033
      return 0; // :3033-3034
    } else {
      // :3036-3038-3038-3038

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3038
        await era.printAndWait(''); // :3039
        // CFLAG:360  = 5（变量语义：CFLAG 族，360） // :3040
        kojo.乳夹口交 = 5; // :3040
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3042
        await era.printAndWait(''); // :3043
        // CFLAG:360  = 4（变量语义：CFLAG 族，360） // :3044
        kojo.乳夹口交 = 4; // :3044
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.乳夹口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3046
        await era.printAndWait(''); // :3047
        // CFLAG:360  = 3（变量语义：CFLAG 族，360） // :3048
        kojo.乳夹口交 = 3; // :3048
      } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3050
        await era.printAndWait(''); // :3051
        // CFLAG:360  = 2（变量语义：CFLAG 族，360） // :3052
        kojo.乳夹口交 = 2; // :3052
      } // :3052-3053
      return 0; // :3052-3054
    } // :3052-3055
  } // :3056-3058-3058-3058

  if (era_flag.selectcom == 114) {
    // :3060

    if (kojo.口交时自慰 == 0) {
      // :3062

      if (era.get(`talent:${target}:76`) == 1) {
        // :3064
        await era.printAndWait(''); // :3065
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3067
        await era.printAndWait(''); // :3068
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :3070
        await era.printAndWait(''); // :3071
      } else {
        // :3073-3076-3076-3076
        await era.printAndWait(''); // :3074
      } // :3075-3076-3076-3076
      // CFLAG:TARGET:361  = 1（变量语义：CFLAG 族，TARGET:361） // :3076
      kojo.口交时自慰 = 1; // :3076
      return 0; // :3076-3077
    } else {
      // :3079-3081-3081-3081

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3081
        await era.printAndWait(''); // :3082
        // CFLAG:361  = 5（变量语义：CFLAG 族，361） // :3083
        kojo.口交时自慰 = 5; // :3083
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3085
        await era.printAndWait(''); // :3086
        // CFLAG:361  = 4（变量语义：CFLAG 族，361） // :3087
        kojo.口交时自慰 = 4; // :3087
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交时自慰 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3089
        await era.printAndWait(''); // :3090
        // CFLAG:361  = 3（变量语义：CFLAG 族，361） // :3091
        kojo.口交时自慰 = 3; // :3091
      } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 == 2) {
        // :3093
        await era.printAndWait(''); // :3094
        // CFLAG:361  = 2（变量语义：CFLAG 族，361） // :3095
        kojo.口交时自慰 = 2; // :3095
      } // :3095-3096
      return 0; // :3095-3097
    } // :3095-3098
  } // :3099-3102-3102-3102

  if (era_flag.selectcom == 126) {
    // :3104

    if (kojo.手搓口交 == 0) {
      // :3106

      if (era.get(`talent:${target}:76`) == 1) {
        // :3108
        await era.printAndWait(''); // :3109
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3111
        await era.printAndWait(''); // :3112
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :3114
        await era.printAndWait(''); // :3115
      } else {
        // :3117-3120-3120-3120
        await era.printAndWait(''); // :3118
      } // :3119-3120-3120-3120
      // CFLAG:TARGET:362  = 1（变量语义：CFLAG 族，TARGET:362） // :3120
      kojo.手搓口交 = 1; // :3120
      return 0; // :3120-3121
    } else {
      // :3123-3125-3125-3125

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3125
        await era.printAndWait(''); // :3126
        // CFLAG:362  = 5（变量语义：CFLAG 族，362） // :3127
        kojo.手搓口交 = 5; // :3127
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3129
        await era.printAndWait(''); // :3130
        // CFLAG:362  = 4（变量语义：CFLAG 族，362） // :3131
        kojo.手搓口交 = 4; // :3131
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手搓口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3133
        await era.printAndWait(''); // :3134
        // CFLAG:362  = 3（变量语义：CFLAG 族，362） // :3135
        kojo.手搓口交 = 3; // :3135
      } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3137
        await era.printAndWait(''); // :3138
        // CFLAG:362  = 2（变量语义：CFLAG 族，362） // :3139
        kojo.手搓口交 = 2; // :3139
      } // :3139-3140
      return 0; // :3139-3141
    } // :3139-3142
  } // :3143-3146-3146-3146

  if (era_flag.selectcom == 127) {
    // :3148

    if (kojo.真空口交 == 0) {
      // :3150

      if (era.get(`talent:${target}:76`) == 1) {
        // :3152
        await era.printAndWait(''); // :3153
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3155
        await era.printAndWait(''); // :3156
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :3158
        await era.printAndWait(''); // :3159
      } else {
        // :3161-3164-3164-3164
        await era.printAndWait(''); // :3162
      } // :3163-3164-3164-3164
      // CFLAG:TARGET:363  = 1（变量语义：CFLAG 族，TARGET:363） // :3164
      kojo.真空口交 = 1; // :3164
      return 0; // :3164-3165
    } else {
      // :3164-3167

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3169
        await era.printAndWait(''); // :3170
        // CFLAG:363  = 5（变量语义：CFLAG 族，363） // :3171
        kojo.真空口交 = 5; // :3171
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3173
        await era.printAndWait(''); // :3174
        // CFLAG:363  = 4（变量语义：CFLAG 族，363） // :3175
        kojo.真空口交 = 4; // :3175
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3177
        // CFLAG:363  = 3（变量语义：CFLAG 族，363） // :3178
        kojo.真空口交 = 3; // :3178
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3180
        await era.printAndWait(''); // :3181
        // CFLAG:363  = 2（变量语义：CFLAG 族，363） // :3182
        kojo.真空口交 = 2; // :3182
      } // :3182-3183
      return 0; // :3182-3184
    } // :3182-3185
  } // :3186-3189-3189-3189

  if (era_flag.selectcom == 69) {
    // :3191

    if (kojo.六九式 == 0) {
      // :3193

      if (era.get(`talent:${target}:76`) == 1) {
        // :3195
        await era.printAndWait(''); // :3196
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3198
        await era.printAndWait(''); // :3199
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :3201
        await era.printAndWait(''); // :3202
      } else {
        // :3204-3207-3207-3207
        await era.printAndWait(''); // :3205
      } // :3206-3207-3207-3207
      // CFLAG:TARGET:364  = 1（变量语义：CFLAG 族，TARGET:364） // :3207
      kojo.六九式 = 1; // :3207
      return 0; // :3207-3208
    } else {
      // :3210-3212-3212-3212

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3212
        await era.printAndWait(''); // :3213
        // CFLAG:364  = 5（变量语义：CFLAG 族，364） // :3214
        kojo.六九式 = 5; // :3214
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3216
        await era.printAndWait(''); // :3217
        // CFLAG:364  = 4（变量语义：CFLAG 族，364） // :3218
        kojo.六九式 = 4; // :3218
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.六九式 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3220
        await era.printAndWait(''); // :3221
        // CFLAG:364  = 3（变量语义：CFLAG 族，364） // :3222
        kojo.六九式 = 3; // :3222
      } else if (kojo.六九式 <= 1 || game.kojo.口上开关 == 2) {
        // :3224
        await era.printAndWait(''); // :3225
        // CFLAG:364  = 2（变量语义：CFLAG 族，364） // :3226
        kojo.六九式 = 2; // :3226
      } // :3226-3227
      return 0; // :3226-3228
    } // :3226-3229
  } // :3230-3233-3233-3233

  if (era_flag.selectcom == 124) {
    // :3235

    if (kojo.深喉 == 0) {
      // :3237

      if (era.get(`talent:${target}:76`) == 1) {
        // :3239
        await era.printAndWait(''); // :3240
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3242
        await era.printAndWait(''); // :3243
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :3245
        await era.printAndWait(''); // :3246
      } else {
        // :3248-3251-3251-3251
        await era.printAndWait(''); // :3249
      } // :3250-3251-3251-3251
      // CFLAG:TARGET:365  = 1（变量语义：CFLAG 族，TARGET:365） // :3251
      kojo.深喉 = 1; // :3251
      return 0; // :3251-3252
    } else {
      // :3251-3254

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3256
        await era.printAndWait(''); // :3257
        // CFLAG:365  = 5（变量语义：CFLAG 族，365） // :3258
        kojo.深喉 = 5; // :3258
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3260
        await era.printAndWait(''); // :3261
        // CFLAG:365  = 4（变量语义：CFLAG 族，365） // :3262
        kojo.深喉 = 4; // :3262
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.真空口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3264
        await era.printAndWait(''); // :3265
        // CFLAG:365  = 3（变量语义：CFLAG 族，365） // :3266
        kojo.深喉 = 3; // :3266
      } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3268
        await era.printAndWait(''); // :3269
        // CFLAG:365  = 2（变量语义：CFLAG 族，365） // :3270
        kojo.深喉 = 2; // :3270
      } // :3270-3271
      return 0; // :3270-3272
    } // :3270-3273
  } // :3274-3277-3277-3277

  if (era_flag.selectcom == 80) {
    // :3279

    if (kojo.强制口交 == 0) {
      // :3281

      if (era.get(`talent:${target}:76`) == 1) {
        // :3283
        await era.printAndWait(''); // :3284
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :3286
        await era.printAndWait(''); // :3287
      } else {
        // :3289-3292-3292-3292
        await era.printAndWait(''); // :3290
      } // :3291-3292-3292-3292
      // CFLAG:TARGET:381  = 1（变量语义：CFLAG 族，TARGET:381） // :3292
      kojo.强制口交 = 1; // :3292
      return 0; // :3292-3293
    } else {
      // :3295-3297-3297-3297

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3297
        await era.printAndWait(''); // :3298
        // CFLAG:381  = 5（变量语义：CFLAG 族，381） // :3299
        kojo.强制口交 = 5; // :3299
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3301
        await era.printAndWait(''); // :3302
        // CFLAG:381  = 4（变量语义：CFLAG 族，381） // :3303
        kojo.强制口交 = 4; // :3303
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.强制口交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3305
        await era.printAndWait(''); // :3306
        // CFLAG:381  = 3（变量语义：CFLAG 族，381） // :3307
        kojo.强制口交 = 3; // :3307
      } else if (kojo.强制口交 <= 1 || game.kojo.口上开关 == 2) {
        // :3309
        await era.printAndWait(''); // :3310
        // CFLAG:381  = 2（变量语义：CFLAG 族，381） // :3311
        kojo.强制口交 = 2; // :3311
      } // :3311-3312
      return 0; // :3311-3313
    } // :3311-3314
  } // :3311-3315

  if (era_flag.selectcom == 87) {
    // :3322
    const P = piercing_state.p; // 跨 CALL TRAIN_MESSAGE_B 存活的全局单字母变量 P（com87() 写入，见 piercing-state.js，K7/K10 同款先例）

    if (kojo.穿环 == 0) {
      // :3325

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3327
        await era.printAndWait(''); // :3328
      } else if (era.get(`talent:${target}:76`) == 1) {
        // :3330

        if (chara(target).train.穿环状态 & P) {
          // :3332
          await era.printAndWait(''); // :3333

          if (P == 1) {
            // :3335
            await era.printAndWait(''); // :3336
          } else if (P == 2) {
            // :3338
            await era.printAndWait(''); // :3339
          } else if (P == 4) {
            // :3341
            await era.printAndWait(''); // :3342
          } else if (P == 8) {
            // :3344

            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :3346
              await era.printAndWait(''); // :3347
            } else {
              // :3325-3348
              await era.printAndWait(''); // :3349
            } // :3325-3350
          } else if (P == 16) {
            // :3352
            await era.printAndWait(''); // :3353
          } else if (P == 32) {
            // :3355
            await era.printAndWait(''); // :3356
          } else if (P == 64) {
            // :3358
            await era.printAndWait(''); // :3359
          } // :3325-3360
        } else {
          // :3325-3362
          await era.printAndWait(''); // :3363
        } // :3325-3364
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3366

        if (chara(target).train.穿环状态 & P) {
          // :3368
          await era.printAndWait(''); // :3369

          if (P == 1) {
            // :3371
            await era.printAndWait(''); // :3372
          } else if (P == 2) {
            // :3374
            await era.printAndWait(''); // :3375
          } else if (P == 4) {
            // :3377
            await era.printAndWait(''); // :3378
          } else if (P == 8) {
            // :3380

            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :3382
              await era.printAndWait(''); // :3383
            } else {
              // :3384-3438-3438
              await era.printAndWait(''); // :3385
            } // :3386-3438-3438
          } else if (P == 16) {
            // :3388
            await era.printAndWait(''); // :3389
          } else if (P == 32) {
            // :3391
            await era.printAndWait(''); // :3392
          } else if (P == 64) {
            // :3394
            await era.printAndWait(''); // :3395
          } // :3396-3438-3438
        } else {
          // :3398-3438-3438
          await era.printAndWait(''); // :3399
        } // :3400-3438-3438
      } else {
        // :3402-3438-3438

        if (chara(target).train.穿环状态 & P) {
          // :3404
          await era.printAndWait(''); // :3405

          if (P == 1) {
            // :3407
            await era.printAndWait(''); // :3408
          } else if (P == 2) {
            // :3410
            await era.printAndWait(''); // :3411
          } else if (P == 4) {
            // :3413
            await era.printAndWait(''); // :3414
          } else if (P == 8) {
            // :3416

            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :3418
              await era.printAndWait(''); // :3419
            } else {
              // :3420-3438-3438
              await era.printAndWait(''); // :3421
            } // :3422-3438-3438
          } else if (P == 16) {
            // :3424
            await era.printAndWait(''); // :3425
          } else if (P == 32) {
            // :3427
            await era.printAndWait(''); // :3428
          } else if (P == 64) {
            // :3430
            await era.printAndWait(''); // :3431
          } // :3432-3438-3438-3438
        } else {
          // :3434-3438-3438-3438
          await era.printAndWait(''); // :3435
        } // :3436-3438-3438-3438
      } // :3437-3438-3438-3438
      // CFLAG:TARGET:348  = 1（变量语义：CFLAG 族，TARGET:348） // :3438
      kojo.穿环 = 1; // :3438
      return 0; // :3438-3439
    } else {
      // :3438-3441

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :3443
        await era.printAndWait(''); // :3444
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3446

        if (chara(target).train.穿环状态 & P) {
          // :3448

          if (P == 1) {
            // :3450
            await era.printAndWait(''); // :3451
          } else if (P == 2) {
            // :3453
            await era.printAndWait(''); // :3454
          } else if (P == 4) {
            // :3456
            await era.printAndWait(''); // :3457
          } else if (P == 8) {
            // :3459

            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :3461
              await era.printAndWait(''); // :3462
            } else {
              // :3446-3463
              await era.printAndWait(''); // :3464
            } // :3465-3480-3480
          } else if (P == 16) {
            // :3467
            await era.printAndWait(''); // :3468
          } else if (P == 32) {
            // :3470
            await era.printAndWait(''); // :3471
          } else if (P == 64) {
            // :3473
            await era.printAndWait(''); // :3474
          } // :3475-3480-3480-3480
        } else {
          // :3477-3480-3480-3480
          await era.printAndWait(''); // :3478
        } // :3479-3480-3480-3480
        // CFLAG:348  = 4（变量语义：CFLAG 族，348） // :3480
        kojo.穿环 = 4; // :3480
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3482

        if (chara(target).train.穿环状态 & P) {
          // :3484

          if (P == 1) {
            // :3486
            await era.printAndWait(''); // :3487
          } else if (P == 2) {
            // :3489
            await era.printAndWait(''); // :3490
          } else if (P == 4) {
            // :3492
            await era.printAndWait(''); // :3493
          } else if (P == 8) {
            // :3495
            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :3496
              await era.printAndWait(''); // :3497
            } else {
              // :3482-3498
              await era.printAndWait(''); // :3499
            } // :3500-3515-3515
          } else if (P == 16) {
            // :3502
            await era.printAndWait(''); // :3503
          } else if (P == 32) {
            // :3505
            await era.printAndWait(''); // :3506
          } else if (P == 64) {
            // :3508
            await era.printAndWait(''); // :3509
          } // :3510-3515-3515-3515
        } else {
          // :3512-3515-3515-3515
          await era.printAndWait(''); // :3513
        } // :3514-3515-3515-3515
        // CFLAG:348  = 3（变量语义：CFLAG 族，348） // :3515
        kojo.穿环 = 3; // :3515
      } else if (kojo.穿环 <= 1 || game.kojo.口上开关 == 2) {
        // :3517

        if (chara(target).train.穿环状态 & P) {
          // :3519

          if (P == 1) {
            // :3521
            await era.printAndWait(''); // :3522
          } else if (P == 2) {
            // :3524
            await era.printAndWait(''); // :3525
          } else if (P == 4) {
            // :3527
            await era.printAndWait(''); // :3528
          } else if (P == 8) {
            // :3530

            if (
              era.get(`talent:${target}:121`) ||
              era.get(`talent:${target}:122`)
            ) {
              // :3532
              await era.printAndWait(''); // :3533
            } else {
              // :3517-3534
              await era.printAndWait(''); // :3535
            } // :3536-3551-3551
          } else if (P == 16) {
            // :3538
            await era.printAndWait(''); // :3539
          } else if (P == 32) {
            // :3541
            await era.printAndWait(''); // :3542
          } else if (P == 64) {
            // :3544
            await era.printAndWait(''); // :3545
          } // :3546-3551-3551-3551
        } else {
          // :3548-3551-3551-3551
          await era.printAndWait(''); // :3549
        } // :3550-3551-3551-3551
        // CFLAG:348  = 2（变量语义：CFLAG 族，348） // :3551
        kojo.穿环 = 2; // :3551
      } // :3551-3552
    } // :3551-3553
    return 0; // :3551-3554
  } // :3551-3555
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
    // :3568

    if (kojo.爱抚 == 0) {
      // :3570

      if (era.get(`mark:${target}:2`) >= 2) {
        // :3572
        await era.printAndWait(''); // :3573
      } else {
        // :3575-3583
        await era.printAndWait(''); // :3576
      } // :3577-3583
      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :3578
      kojo.爱抚 = 1; // :3578
      return 0; // :3579-3583
    } else {
      // :3581-3583

      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.爱抚 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3583
        await era.printAndWait(''); // :3584
        // CFLAG:301  = 7（变量语义：CFLAG 族，301） // :3585
        kojo.爱抚 = 7; // :3585
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3587
        await era.printAndWait(''); // :3588
        // CFLAG:301  = 6（变量语义：CFLAG 族，301） // :3589
        kojo.爱抚 = 6; // :3589
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3591
        await era.printAndWait(''); // :3592
        // CFLAG:301  = 5（变量语义：CFLAG 族，301） // :3593
        kojo.爱抚 = 5; // :3593
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3595
        await era.printAndWait(''); // :3596
        // CFLAG:301  = 4（变量语义：CFLAG 族，301） // :3597
        kojo.爱抚 = 4; // :3597
      } else if (
        era.get(`mark:${target}:2`) == 2 &&
        (kojo.爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3599
        await era.printAndWait(''); // :3600
        // CFLAG:301  = 3（变量语义：CFLAG 族，301） // :3601
        kojo.爱抚 = 3; // :3601
      } else if (
        era.get(`mark:${target}:2`) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 == 2)
      ) {
        // :3603
        await era.printAndWait(''); // :3604
        // CFLAG:301  = 2（变量语义：CFLAG 族，301） // :3605
        kojo.爱抚 = 2; // :3605
      } // :3606-3612
      return 0; // :3607-3612
    } // :3608-3612
  } // :3609-3612

  if (era_flag.selectcom == 1) {
    // :3614

    if (kojo.舔阴 == 0) {
      // :3616

      if (era.get(`talent:${target}:0`) == 1) {
        // :3618
        await era.printAndWait(''); // :3619
      } else {
        // :3621-3629
        await era.printAndWait(''); // :3622
      } // :3623-3629
      // CFLAG:302  = 1（变量语义：CFLAG 族，302） // :3624
      kojo.舔阴 = 1; // :3624
      return 0; // :3625-3629
    } else {
      // :3627-3629

      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.舔阴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3629
        await era.printAndWait(''); // :3630
        // CFLAG:302  = 6（变量语义：CFLAG 族，302） // :3631
        kojo.舔阴 = 6; // :3631
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔阴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3633
        await era.printAndWait(''); // :3634
        // CFLAG:302  = 5（变量语义：CFLAG 族，302） // :3635
        kojo.舔阴 = 5; // :3635
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔阴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3637
        await era.printAndWait(''); // :3638
        // CFLAG:302  = 4（变量语义：CFLAG 族，302） // :3639
        kojo.舔阴 = 4; // :3639
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔阴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3641
        await era.printAndWait(''); // :3642
        // CFLAG:302  = 3（变量语义：CFLAG 族，302） // :3643
        kojo.舔阴 = 3; // :3643
      } else if (kojo.舔阴 <= 1 || game.kojo.口上开关 == 2) {
        // :3645
        await era.printAndWait(''); // :3646
        // CFLAG:302  = 2（变量语义：CFLAG 族，302） // :3647
        kojo.舔阴 = 2; // :3647
      } // :3648-3655
      return 0; // :3649-3655
    } // :3650-3655
  } // :3651-3655

  if (era_flag.selectcom == 5) {
    // :3657

    if (kojo.胸爱抚 == 0) {
      // :3659

      if (era.get(`talent:${target}:85`) == 1) {
        // :3661
        await era.printAndWait(''); // :3662
      } else {
        // :3664-3672
        await era.printAndWait(''); // :3665
      } // :3666-3672
      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306） // :3667
      kojo.胸爱抚 = 1; // :3667
      return 0; // :3668-3672
    } else {
      // :3670-3672

      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.胸爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3672
        await era.printAndWait(''); // :3673
        // CFLAG:306  = 6（变量语义：CFLAG 族，306） // :3674
        kojo.胸爱抚 = 6; // :3674
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3676
        await era.printAndWait(''); // :3677
        // CFLAG:306  = 5（变量语义：CFLAG 族，306） // :3678
        kojo.胸爱抚 = 5; // :3678
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3680
        await era.printAndWait(''); // :3681
        // CFLAG:306  = 4（变量语义：CFLAG 族，306） // :3682
        kojo.胸爱抚 = 4; // :3682
      } else if (
        era.get(`abl:${target}:1`) >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3684
        await era.printAndWait(''); // :3685
        // CFLAG:306  = 3（变量语义：CFLAG 族，306） // :3686
        kojo.胸爱抚 = 3; // :3686
      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {
        // :3688
        await era.printAndWait(''); // :3689
        // CFLAG:306  = 2（变量语义：CFLAG 族，306） // :3690
        kojo.胸爱抚 = 2; // :3690
      } // :3691-3697
      return 0; // :3692-3697
    } // :3693-3697
  } // :3694-3697

  if (era_flag.selectcom == 6) {
    // :3699

    if (kojo.接吻 == 0 && game.train.初吻与自我口上) {
      // :3701

      if (era.get(`talent:${target}:136`) == 1) {
        // :3703
        await era.printAndWait(''); // :3704
      } else if (era.get(`talent:${target}:76`) == 1) {
        // :3706
        await era.printAndWait(''); // :3707
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3709
        await era.printAndWait(''); // :3710
      } else {
        // :3697-3712
        await era.printAndWait(''); // :3713
      } // :3697-3714
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :3715
      kojo.接吻 = 1; // :3715
      return 0; // :3697-3716
    } else if (kojo.接吻 == 0) {
      // :3718

      if (era.get(`talent:${target}:136`) == 1) {
        // :3720
        await era.printAndWait(''); // :3721
      } else if (era.get(`talent:${target}:76`) == 1) {
        // :3723
        await era.printAndWait(''); // :3724
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3726
        await era.printAndWait(''); // :3727
      } else {
        // :3729-3737
        await era.printAndWait(''); // :3730
      } // :3731-3737
      // CFLAG:307  = 1（变量语义：CFLAG 族，307） // :3732
      kojo.接吻 = 1; // :3732
      return 0; // :3733-3737
    } else {
      // :3735-3737

      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.接吻 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3737
        await era.printAndWait(''); // :3738
        // CFLAG:307  = 6（变量语义：CFLAG 族，307） // :3739
        kojo.接吻 = 6; // :3739
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3741
        await era.printAndWait(''); // :3742
        // CFLAG:307  = 5（变量语义：CFLAG 族，307） // :3743
        kojo.接吻 = 5; // :3743
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.接吻 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3745
        await era.printAndWait(''); // :3746
        // CFLAG:307  = 4（变量语义：CFLAG 族，307） // :3747
        kojo.接吻 = 4; // :3747
      } else if (
        era.get(`abl:${target}:10`) >= 2 &&
        (kojo.接吻 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3749
        await era.printAndWait(''); // :3750
        // CFLAG:307  = 3（变量语义：CFLAG 族，307） // :3751
        kojo.接吻 = 3; // :3751
      } else if (kojo.接吻 <= 1 || game.kojo.口上开关 == 2) {
        // :3753
        await era.printAndWait(''); // :3754
        // CFLAG:307  = 2（变量语义：CFLAG 族，307） // :3755
        kojo.接吻 = 2; // :3755
      } // :3756-3762
      return 0; // :3757-3762
    } // :3758-3762
  } // :3759-3762

  if (era_flag.selectcom == 9) {
    // :3764

    if (kojo.舔肛 == 0) {
      // :3766

      if (era.get(`talent:${target}:136`) == 1) {
        // :3768
        await era.printAndWait(''); // :3769
      } else if (era.get(`talent:${target}:76`) == 1) {
        // :3771
        await era.printAndWait(''); // :3772
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3774
        await era.printAndWait(''); // :3775
      } else {
        // :3777-3785
        await era.printAndWait(''); // :3778
      } // :3779-3785
      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310） // :3780
      kojo.舔肛 = 1; // :3780
      return 0; // :3781-3785
    } else {
      // :3783-3785

      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.舔肛 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3785
        await era.printAndWait(''); // :3786
        // CFLAG:310  = 6（变量语义：CFLAG 族，310） // :3787
        kojo.舔肛 = 6; // :3787
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3789
        await era.printAndWait(''); // :3790
        // CFLAG:310  = 5（变量语义：CFLAG 族，310） // :3791
        kojo.舔肛 = 5; // :3791
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.舔肛 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3793
        await era.printAndWait(''); // :3794
        // CFLAG:310  = 4（变量语义：CFLAG 族，310） // :3795
        kojo.舔肛 = 4; // :3795
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.舔肛 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3797
        await era.printAndWait(''); // :3798
        // CFLAG:310  = 3（变量语义：CFLAG 族，310） // :3799
        kojo.舔肛 = 3; // :3799
      } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 == 2) {
        // :3801
        await era.printAndWait(''); // :3802
        // CFLAG:310  = 2（变量语义：CFLAG 族，310） // :3803
        kojo.舔肛 = 2; // :3803
      } // :3804-3810
      return 0; // :3805-3810
    } // :3806-3810
  } // :3807-3810

  if (era_flag.selectcom == 21) {
    // :3812

    if (kojo.背后位 == 0) {
      // :3814

      if (era.get(`talent:${target}:0`) == 1) {
        // :3816

        if (era.get(`talent:${target}:136`) == 1) {
          // :3818
          await era.printAndWait(''); // :3819
        } else if (era.get(`talent:${target}:76`) == 1) {
          // :3821
          await era.printAndWait(''); // :3822
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :3824
          await era.printAndWait(''); // :3825
        } else {
          // :3810-3828
          await era.printAndWait(''); // :3829
        } // :3810-3830
      } else {
        // :3832-3852

        if (era.get(`talent:${target}:136`) == 1) {
          // :3834
          await era.printAndWait(''); // :3835
        } else if (era.get(`talent:${target}:76`) == 1) {
          // :3837
          await era.printAndWait(''); // :3838
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :3840
          await era.printAndWait(''); // :3841
        } else {
          // :3843-3852
          await era.printAndWait(''); // :3844
        } // :3845-3852
      } // :3846-3852
      // CFLAG:322  = 1（变量语义：CFLAG 族，322） // :3847
      kojo.背后位 = 1; // :3847
      return 0; // :3848-3852
    } else {
      // :3850-3852

      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.背后位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3852
        if (rand_n(3) == 0) {
          // :3853
          await era.printAndWait(''); // :3854
        } else if (rand_n(2) == 0) {
          // :3855
          await era.printAndWait(''); // :3856
        } else {
          // :3857-3860
          await era.printAndWait(''); // :3858
        } // :3859-3860
        // CFLAG:322  = 7（变量语义：CFLAG 族，322） // :3860
        kojo.背后位 = 7; // :3860
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3862
        if (rand_n(3) == 0) {
          // :3863
          await era.printAndWait(''); // :3864
        } else if (rand_n(2) == 0) {
          // :3865
          await era.printAndWait(''); // :3866
        } else {
          // :3862-3867
          await era.printAndWait(''); // :3868
        } // :3862-3869
        // CFLAG:322  = 6（变量语义：CFLAG 族，322） // :3870
        kojo.背后位 = 6; // :3870
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3872
        if (rand_n(3) == 0) {
          // :3873
          await era.printAndWait(''); // :3874
        } else if (rand_n(2) == 0) {
          // :3875
          await era.printAndWait(''); // :3876
        } else {
          // :3862-3877
          await era.printAndWait(''); // :3878
        } // :3862-3879
        // CFLAG:322  = 5（变量语义：CFLAG 族，322） // :3880
        kojo.背后位 = 5; // :3880
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3882
        await era.printAndWait(''); // :3883
        // CFLAG:322  = 4（变量语义：CFLAG 族，322） // :3884
        kojo.背后位 = 4; // :3884
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3886
        await era.printAndWait(''); // :3887
        // CFLAG:322  = 3（变量语义：CFLAG 族，322） // :3888
        kojo.背后位 = 3; // :3888
      } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {
        // :3890
        await era.printAndWait(''); // :3891

        // CFLAG:322  = 2（变量语义：CFLAG 族，322） // :3893
        kojo.背后位 = 2; // :3893
      } // :3894-3900
      return 0; // :3895-3900
    } // :3896-3900
  } // :3897-3900

  if (era_flag.selectcom == 27) {
    // :3902

    if (kojo.背后位肛交 == 0) {
      // :3904

      if (era.get(`talent:${target}:136`) == 1) {
        // :3906
        await era.printAndWait(''); // :3907
      } else if (era.get(`talent:${target}:76`) == 1) {
        // :3909
        await era.printAndWait(''); // :3910
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3912
        await era.printAndWait(''); // :3913
      } else {
        // :3915-3922
        await era.printAndWait(''); // :3916
      } // :3917-3922
      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328） // :3918
      kojo.背后位肛交 = 1; // :3918
      return 0; // :3919-3922
    } else {
      // :3921-3922

      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3923
        if (rand_n(2) == 0) {
          // :3924
          await era.printAndWait(''); // :3925
        } else {
          // :3923-3926
          await era.printAndWait(''); // :3927
        } // :3928-3929
        // CFLAG:328  = 7（变量语义：CFLAG 族，328） // :3929
        kojo.背后位肛交 = 7; // :3929
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3931
        if (rand_n(2) == 0) {
          // :3932
          await era.printAndWait(''); // :3933
        } else {
          // :3931-3934
          await era.printAndWait(''); // :3935
        } // :3936-3937
        // CFLAG:328  = 6（变量语义：CFLAG 族，328） // :3937
        kojo.背后位肛交 = 6; // :3937
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3939
        if (rand_n(2) == 0) {
          // :3940
          await era.printAndWait(''); // :3941
        } else {
          // :3939-3942
          await era.printAndWait(''); // :3943
        } // :3939-3944
        // CFLAG:328  = 5（变量语义：CFLAG 族，328） // :3945
        kojo.背后位肛交 = 5; // :3945
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :3947
        await era.printAndWait(''); // :3948
        // CFLAG:328  = 4（变量语义：CFLAG 族，328） // :3949
        kojo.背后位肛交 = 4; // :3949
      } else if (
        era.get(`abl:${target}:3`) >= 3 &&
        (kojo.背后位肛交 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :3951
        await era.printAndWait(''); // :3952
        // CFLAG:328  = 3（变量语义：CFLAG 族，328） // :3953
        kojo.背后位肛交 = 3; // :3953
      } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {
        // :3955
        await era.printAndWait(''); // :3956
        // CFLAG:328  = 2（变量语义：CFLAG 族，328） // :3957
        kojo.背后位肛交 = 2; // :3957
      } // :3958-3964
      return 0; // :3959-3964
    } // :3960-3964
  } // :3961-3964

  if (era_flag.selectcom == 30) {
    // :3966

    if (kojo.手淫 == 0) {
      // :3968

      if (era.get(`talent:${target}:76`) == 1) {
        // :3970
        await era.printAndWait(''); // :3971
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :3973
        await era.printAndWait(''); // :3974
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :3976
        await era.printAndWait(''); // :3977
      } else {
        // :3979-3986
        await era.printAndWait(''); // :3980
      } // :3981-3986
      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331） // :3982
      kojo.手淫 = 1; // :3982
      return 0; // :3983-3986
    } else {
      // :3985-3986

      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :3987
        if (rand_n(2) == 0) {
          // :3988
          await era.printAndWait(''); // :3989
        } else {
          // :3987-3990
          await era.printAndWait(''); // :3991
        } // :3992-3993
        // CFLAG:331  = 7（变量语义：CFLAG 族，331） // :3993
        kojo.手淫 = 7; // :3993
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :3995
        if (rand_n(2) == 0) {
          // :3996
          await era.printAndWait(''); // :3997
        } else {
          // :3995-3998
          await era.printAndWait(''); // :3999
        } // :3995-4000
        // CFLAG:331  = 6（变量语义：CFLAG 族，331） // :4001
        kojo.手淫 = 6; // :4001
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4003
        if (rand_n(2) == 0) {
          // :4004
          await era.printAndWait(''); // :4005
        } else {
          // :3995-4006
          await era.printAndWait(''); // :4007
        } // :3995-4008
        // CFLAG:331  = 5（变量语义：CFLAG 族，331） // :4009
        kojo.手淫 = 5; // :4009
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4011
        await era.printAndWait(''); // :4012
        // CFLAG:331  = 4（变量语义：CFLAG 族，331） // :4013
        kojo.手淫 = 4; // :4013
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.手淫 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4015
        await era.printAndWait(''); // :4016
        // CFLAG:331  = 3（变量语义：CFLAG 族，331） // :4017
        kojo.手淫 = 3; // :4017
      } else if (kojo.手淫 <= 1 || game.kojo.口上开关 == 2) {
        // :4019
        await era.printAndWait(''); // :4020
        // CFLAG:331  = 2（变量语义：CFLAG 族，331） // :4021
        kojo.手淫 = 2; // :4021
      } // :4022-4028
      return 0; // :4023-4028
    } // :4024-4028
  } // :4025-4028

  if (era_flag.selectcom == 31) {
    // :4030

    if (kojo.口交_奴 == 0) {
      // :4032

      if (era.get(`talent:${target}:76`) == 1) {
        // :4034
        await era.printAndWait(''); // :4035
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :4037
        await era.printAndWait(''); // :4038
      } else if (era.get(`abl:${target}:16`) >= 3) {
        // :4040
        await era.printAndWait(''); // :4041
      } else {
        // :4043-4051
        await era.printAndWait(''); // :4044
      } // :4045-4051
      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332） // :4046
      kojo.口交_奴 = 1; // :4046
      return 0; // :4047-4051
    } else {
      // :4049-4051

      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4051
        await era.printAndWait(''); // :4052
        // CFLAG:332  = 7（变量语义：CFLAG 族，332） // :4053
        kojo.口交_奴 = 7; // :4053
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4055
        await era.printAndWait(''); // :4056
        // CFLAG:332  = 6（变量语义：CFLAG 族，332） // :4057
        kojo.口交_奴 = 6; // :4057
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4059
        await era.printAndWait(''); // :4060
        // CFLAG:332  = 5（变量语义：CFLAG 族，332） // :4061
        kojo.口交_奴 = 5; // :4061
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4063
        await era.print(''); // :4064
        await era.printAndWait(''); // :4065
        // CFLAG:332  = 4（变量语义：CFLAG 族，332） // :4066
        kojo.口交_奴 = 4; // :4066
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4068
        await era.print(''); // :4069
        await era.printAndWait(''); // :4070
        // CFLAG:332  = 3（变量语义：CFLAG 族，332） // :4071
        kojo.口交_奴 = 3; // :4071
      } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {
        // :4073
        await era.printAndWait(''); // :4074
        // CFLAG:332  = 2（变量语义：CFLAG 族，332） // :4075
        kojo.口交_奴 = 2; // :4075
      } // :4076-4082
      return 0; // :4077-4082
    } // :4078-4082
  } // :4079-4082

  if (era_flag.selectcom == 34) {
    // :4084

    if (kojo.骑乘位 == 0) {
      // :4086

      if (era.get(`talent:${target}:0`) == 1) {
        // :4088

        if (era.get(`talent:${target}:136`) == 1) {
          // :4090
          await era.printAndWait(''); // :4091
        } else if (era.get(`talent:${target}:76`) == 1) {
          // :4093
          await era.printAndWait(''); // :4094
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :4096
          await era.printAndWait(''); // :4097
        } else {
          // :4082-4099
          await era.printAndWait(''); // :4100
        } // :4082-4101
      } else {
        // :4103-4123

        if (era.get(`talent:${target}:136`) == 1) {
          // :4105
          await era.printAndWait(''); // :4106
        } else if (era.get(`talent:${target}:76`) == 1) {
          // :4108
          await era.printAndWait(''); // :4109
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :4111
          await era.printAndWait(''); // :4112
        } else {
          // :4114-4123
          await era.printAndWait(''); // :4115
        } // :4116-4123
      } // :4117-4123
      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335） // :4118
      kojo.骑乘位 = 1; // :4118
      return 0; // :4119-4123
    } else {
      // :4121-4123

      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.骑乘位 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4123
        if (rand_n(3) == 0) {
          // :4124
          await era.printAndWait(''); // :4125
        } else if (rand_n(2) == 0) {
          // :4126
          await era.printAndWait(''); // :4127
        } else {
          // :4128-4131
          await era.printAndWait(''); // :4129
        } // :4130-4131
        // CFLAG:335  = 7（变量语义：CFLAG 族，335） // :4131
        kojo.骑乘位 = 7; // :4131
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.骑乘位 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4133
        if (rand_n(4) == 0) {
          // :4134
          await era.printAndWait(''); // :4135
        } else if (rand_n(3) == 0) {
          // :4136
          await era.printAndWait(''); // :4137
        } else if (rand_n(2) == 0) {
          // :4138
          await era.printAndWait(''); // :4139
        } else {
          // :4133-4140
          await era.printAndWait(''); // :4141
        } // :4133-4142
        // CFLAG:335  = 6（变量语义：CFLAG 族，335） // :4143
        kojo.骑乘位 = 6; // :4143
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.骑乘位 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4145
        if (rand_n(4) == 0) {
          // :4146
          await era.print(''); // :4147
        } else if (rand_n(3) == 0) {
          // :4148
          await era.printAndWait(''); // :4149
        } else if (rand_n(2) == 0) {
          // :4150
          await era.printAndWait(''); // :4151
        } else {
          // :4133-4152
          await era.printAndWait(''); // :4153
        } // :4133-4154
        // CFLAG:335  = 5（变量语义：CFLAG 族，335） // :4155
        kojo.骑乘位 = 5; // :4155
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        era.get(`abl:${target}:2`) >= 3 &&
        (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4157
        if (rand_n(4) == 0) {
          // :4158
          await era.printAndWait(''); // :4159
        } else if (rand_n(3) == 0) {
          // :4160
          await era.printAndWait(''); // :4161
        } else if (rand_n(2) == 0) {
          // :4162
          await era.printAndWait(''); // :4163
        } else {
          // :4164-4183
          await era.printAndWait(''); // :4165
        } // :4166-4183
        // CFLAG:335  = 4（变量语义：CFLAG 族，335） // :4167
        kojo.骑乘位 = 4; // :4167
      } else if (
        era.get(`mark:${target}:2`) == 3 &&
        (kojo.骑乘位 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4169
        await era.print(''); // :4170
        await era.printAndWait(''); // :4171
        // CFLAG:335  = 3（变量语义：CFLAG 族，335） // :4172
        kojo.骑乘位 = 3; // :4172
      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :4174
        await era.printAndWait(''); // :4175
        // CFLAG:335  = 2（变量语义：CFLAG 族，335） // :4176
        kojo.骑乘位 = 2; // :4176
      } // :4177-4183
      return 0; // :4178-4183
    } // :4179-4183
  } // :4180-4183

  if (era_flag.selectcom == 37) {
    // :4185

    if (kojo.肛门侍奉 == 0) {
      // :4187

      if (era.get(`abl:${target}:16`) >= 3) {
        // :4189
        await era.printAndWait(''); // :4190
      } else {
        // :4192-4200
        await era.printAndWait(''); // :4193
      } // :4194-4200
      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338） // :4195
      kojo.肛门侍奉 = 1; // :4195
      return 0; // :4196-4200
    } else {
      // :4198-4200

      if (
        era.get(`talent:${target}:136`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4200
        await era.printAndWait(''); // :4201
        // CFLAG:338  = 6（变量语义：CFLAG 族，338） // :4202
        kojo.肛门侍奉 = 6; // :4202
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4204
        await era.printAndWait(''); // :4205
        // CFLAG:338  = 5（变量语义：CFLAG 族，338） // :4206
        kojo.肛门侍奉 = 5; // :4206
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:16`) >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4208
        await era.print(''); // :4209
        // CFLAG:338  = 4（变量语义：CFLAG 族，338） // :4210
        kojo.肛门侍奉 = 4; // :4210
      } else if (
        era.get(`abl:${target}:16`) >= 3 &&
        (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4212
        await era.printAndWait(''); // :4213
        // CFLAG:338  = 3（变量语义：CFLAG 族，338） // :4214
        kojo.肛门侍奉 = 3; // :4214
      } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 == 2) {
        // :4216
        await era.printAndWait(''); // :4217
        // CFLAG:338  = 2（变量语义：CFLAG 族，338） // :4218
        kojo.肛门侍奉 = 2; // :4218
      } // :4219-4225
      return 0; // :4220-4225
    } // :4221-4225
  } // :4222-4225

  if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`)) {
    // :4228

    if (kojo.眼罩 == 0) {
      // :4230

      if (era.get(`talent:${target}:136`) == 1) {
        // :4232
        await era.printAndWait(''); // :4233
      } else if (era.get(`talent:${target}:76`) == 1) {
        // :4235
        await era.printAndWait(''); // :4236
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :4238
        await era.printAndWait(''); // :4239
      } else {
        // :4241-4249
        await era.printAndWait(''); // :4242
      } // :4243-4249
      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344） // :4244
      kojo.眼罩 = 1; // :4244
      return 0; // :4245-4249
    } else {
      // :4247-4249

      if (
        era.get(`talent:${target}:136`) == 1 &&
        (kojo.眼罩 <= 9 || game.kojo.口上开关 == 2)
      ) {
        // :4249
        await era.printAndWait(''); // :4250
        // CFLAG:TARGET:344  = 10（变量语义：CFLAG 族，TARGET:344） // :4251
        kojo.眼罩 = 10; // :4251
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 8 || game.kojo.口上开关 == 2)
      ) {
        // :4253
        await era.printAndWait(''); // :4254
        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344） // :4255
        kojo.眼罩 = 9; // :4255
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 7 || game.kojo.口上开关 == 2)
      ) {
        // :4257
        await era.printAndWait(''); // :4258
        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344） // :4259
        kojo.眼罩 = 8; // :4259
      } else if (
        era.get(`talent:${target}:76`) == 1 &&
        (kojo.眼罩 <= 6 || game.kojo.口上开关 == 2)
      ) {
        // :4261
        await era.printAndWait(''); // :4262
        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344） // :4263
        kojo.眼罩 = 7; // :4263
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :4265
        await era.printAndWait(''); // :4266
        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344） // :4267
        kojo.眼罩 = 6; // :4267
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :4269
        await era.printAndWait(''); // :4270
        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344） // :4271
        kojo.眼罩 = 5; // :4271
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (kojo.眼罩 <= 3 || game.kojo.口上开关 == 2)
      ) {
        // :4273
        await era.printAndWait(''); // :4274
        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344） // :4275
        kojo.眼罩 = 4; // :4275
      } else if (
        era.get(`abl:${target}:21`) >= 3 &&
        (kojo.眼罩 <= 2 || game.kojo.口上开关 == 2)
      ) {
        // :4277
        await era.printAndWait(''); // :4278
        // CFLAG:TARGET:344  = 3（变量语义：CFLAG 族，TARGET:344） // :4279
        kojo.眼罩 = 3; // :4279
      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 == 2) {
        // :4281
        await era.printAndWait(''); // :4282
        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344） // :4283
        kojo.眼罩 = 2; // :4283
      } // :4284-4290
      return 0; // :4285-4290
    } // :4286-4290
  } else if (era_flag.selectcom == 43 && era.get(`tequip:${target}:43`) == 0) {
    // :4288

    if (
      era.get(`talent:${target}:136`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4290
      await era.printAndWait(''); // :4291
      // CFLAG:444  = 4（变量语义：CFLAG 族，444） // :4292
      kojo.兽奸眼罩 = 4; // :4292
    } else if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4294
      await era.printAndWait(''); // :4295
      // CFLAG:444  = 3（变量语义：CFLAG 族，444） // :4296
      kojo.兽奸眼罩 = 3; // :4296
    } else if (
      era.get(`talent:${target}:85`) == 1 &&
      (kojo.肛门侍奉 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4298
      await era.printAndWait(''); // :4299
      // CFLAG:444  = 2（变量语义：CFLAG 族，444） // :4300
      kojo.兽奸眼罩 = 2; // :4300
    } else if (kojo.兽奸眼罩 < 1 || game.kojo.口上开关 == 2) {
      // :4302
      await era.printAndWait(''); // :4303
      // CFLAG:444  = 1（变量语义：CFLAG 族，444） // :4304
      kojo.兽奸眼罩 = 1; // :4304
    } // :4304-4305
    return 0; // :4304-4306
  } // :4304-4307

  if (era_flag.selectcom == 56) {
    // :4313

    if (kojo.交谈 == 0) {
      // :4315
      if (era.get(`tequip:${target}:53`)) {
        // :4316

        if (era.get(`talent:${target}:136`) == 1) {
          // :4319
          await era.printAndWait(''); // :4320
        } else if (era.get(`talent:${target}:76`) == 1) {
          // :4322
          await era.printAndWait(''); // :4323
        } else if (era.get(`talent:${target}:85`) == 1) {
          // :4325
          await era.printAndWait(''); // :4326
        } else {
          // :4328-4339
          await era.printAndWait(''); // :4329
        } // :4330-4339
      } // :4331-4339
      // CFLAG:357  = 1（变量语义：CFLAG 族，357） // :4332
      kojo.交谈 = 1; // :4332
      return 0; // :4333-4339
    } else {
      // :4335-4339
      if (era.get(`tequip:${target}:53`)) {
        // :4336

        if (
          era.get(`talent:${target}:136`) == 1 &&
          (kojo.交谈 <= 4 || game.kojo.口上开关 == 2)
        ) {
          // :4339
          await era.printAndWait(''); // :4340
          // CFLAG:357  = 5（变量语义：CFLAG 族，357） // :4341
          kojo.交谈 = 5; // :4341
        } else if (
          era.get(`talent:${target}:76`) == 1 &&
          (kojo.交谈 <= 3 || game.kojo.口上开关 == 2)
        ) {
          // :4343
          await era.printAndWait(''); // :4344
          // CFLAG:357  = 4（变量语义：CFLAG 族，357） // :4345
          kojo.交谈 = 4; // :4345
        } else if (
          era.get(`talent:${target}:85`) == 1 &&
          (kojo.交谈 <= 2 || game.kojo.口上开关 == 2)
        ) {
          // :4347
          await era.printAndWait(''); // :4348
          // CFLAG:357  = 3（变量语义：CFLAG 族，357） // :4349
          kojo.交谈 = 3; // :4349
        } else if (kojo.交谈 <= 1 || game.kojo.口上开关 == 2) {
          // :4351
          await era.printAndWait(''); // :4352
          // CFLAG:357  = 2（变量语义：CFLAG 族，357） // :4353
          kojo.交谈 = 2; // :4353
        } // :4354-4364
      } // :4355-4364
      return 0; // :4356-4364
    } // :4357-4364
  } // :4358-4364

  return 0; // :4361-4364
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
    // :4368-4374
    return 0; // :4368-4374
  } // :4368-4374

  if (game.train.失神) {
    // :4377-4380
    return 0; // :4377-4380
  } // :4377-4380

  // 赋值 P = PALAM:3 + UP:3 // :4385
  const P1 = chara(target).train.润滑 + chara(target).train.润滑增量;
  if (P1 > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {
    // :4386

    if (era.get(`talent:${target}:85`) == 1) {
      // :4388

      if (era_flag.selectcom == 50) {
        // :4390
        await era.printAndWait(''); // :4391
      } else {
        // :4386-4393
        await era.printAndWait(''); // :4394
      } // :4386-4395
    } else {
      // :4397-4406

      if (era_flag.selectcom == 50) {
        // :4399
        await era.printAndWait(''); // :4400
      } else {
        // :4402-4406
        await era.printAndWait(''); // :4403
      } // :4404-4406
    } // :4405-4406
    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221） // :4406
    kojo.首次润滑Lv2 = 1; // :4406
  } // :4406-4407

  // 赋值 P1 = PALAM:5 + UP:5 // :4412
  const P2 = chara(target).train.欲情 + chara(target).train.欲情增量;
  if (P2 > PALAMLV[2] && kojo.首次欲情Lv2 == 0) {
    // :4413

    if (era.get(`talent:${target}:85`) == 1) {
      // :4415

      if (era_flag.selectcom == 51) {
        // :4417
        await era.printAndWait(''); // :4418
      } else {
        // :4413-4420
        await era.printAndWait(''); // :4421
      } // :4413-4422
    } else {
      // :4424-4433

      if (era_flag.selectcom == 51) {
        // :4426
        await era.printAndWait(''); // :4427
      } else {
        // :4429-4433
        await era.printAndWait(''); // :4430
      } // :4431-4433
    } // :4432-4433
    // CFLAG:222  = 1（变量语义：CFLAG 族，222） // :4433
    kojo.首次欲情Lv2 = 1; // :4433
  } // :4433-4434

  // 赋值 P2 = PALAM:8 + UP:8 // :4439
  const P3 = chara(target).train.耻情 + chara(target).train.耻情增量;
  if (P3 > PALAMLV[2] && kojo.首次耻情Lv2 == 0) {
    // :4440

    if (era.get(`talent:${target}:85`) == 1) {
      // :4442
      await era.printAndWait(''); // :4443
    } else {
      // :4445-4448
      await era.printAndWait(''); // :4446
    } // :4447-4448
    // CFLAG:223  = 1（变量语义：CFLAG 族，223） // :4448
    kojo.首次耻情Lv2 = 1; // :4448
  } // :4448-4449

  // 赋值 P3 = PALAM:10 + UP:10 // :4454
  const P4 = chara(target).train.恐怖 + chara(target).train.恐怖增量;
  if (P4 > PALAMLV[2] && kojo.首次恐怖Lv2 == 0) {
    // :4455

    if (era.get(`talent:${target}:85`) == 1) {
      // :4457
      await era.printAndWait(''); // :4458
    } else {
      // :4460-4463
      await era.printAndWait(''); // :4461
    } // :4462-4463
    // CFLAG:224  = 1（变量语义：CFLAG 族，224） // :4463
    kojo.首次恐怖Lv2 = 1; // :4463
  } // :4463-4464

  if (era.get(`nowex:${target}:0`) > 0 && kojo.首次C绝顶_K14 == 0) {
    // :4469

    if (era.get(`talent:${target}:85`) == 1) {
      // :4471
      await era.printAndWait(''); // :4472
    } else {
      // :4474-4477
      await era.printAndWait(''); // :4475
    } // :4476-4477
    // CFLAG:214  = 1（变量语义：CFLAG 族，214） // :4477
    kojo.首次C绝顶_K14 = 1; // :4477
  } // :4477-4478

  if (era.get(`nowex:${target}:1`) > 0 && kojo.首次V绝顶 == 0) {
    // :4483

    if (era.get(`talent:${target}:76`) == 1) {
      // :4485
      await era.printAndWait(''); // :4486
    } else if (era.get(`talent:${target}:85`) == 1) {
      // :4488
      await era.printAndWait(''); // :4489
    } else {
      // :4491-4494
      await era.printAndWait(''); // :4492
    } // :4493-4494
    // CFLAG:TARGET:226  = 1（变量语义：CFLAG 族，TARGET:226） // :4494
    kojo.首次V绝顶 = 1; // :4494
  } // :4494-4495

  if (era.get(`nowex:${target}:2`) > 0 && kojo.首次A绝顶 == 0) {
    // :4500

    if (era.get(`talent:${target}:76`) == 1) {
      // :4502
      await era.printAndWait(''); // :4503
    } else if (era.get(`talent:${target}:85`) == 1) {
      // :4505
      await era.printAndWait(''); // :4506
    } else {
      // :4508-4509
      await era.printAndWait(`「咕……啊啊」`); // :4509
    } // :4509-4510
    // CFLAG:227  = 1（变量语义：CFLAG 族，227） // :4511
    kojo.首次A绝顶 = 1; // :4511
  } // :4511-4512

  if (era.get(`nowex:${target}:3`) > 0 && kojo.首次B绝顶 == 0) {
    // :4517

    if (era.get(`talent:${target}:85`) == 1) {
      // :4519
      await era.printAndWait(''); // :4520
    } else {
      // :4522-4525
      await era.printAndWait(''); // :4523
    } // :4524-4525
    // CFLAG:TARGET:228  = 1（变量语义：CFLAG 族，TARGET:228） // :4525
    kojo.首次B绝顶 = 1; // :4525
  } // :4525-4526

  // 赋值 A = UP:11 + UP:12 // :4531
  const A =
    (era.get(`delta:${target}:11`) || 0) + (era.get(`delta:${target}:12`) || 0);
  if (game.train.处女丧失 == 1 && kojo.处女丧失 == 0) {
    // :4532

    if (game.train.主人导致处女丧失 == 1) {
      // :4534

      if (
        era.get(`talent:${target}:76`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1)
      ) {
        // :4536
        await era.printAndWait(''); // :4537
      } else if (
        era.get(`talent:${target}:85`) == 1 &&
        (A < 500 || game.system.反抗刻印回避 == 1)
      ) {
        // :4539
        await era.printAndWait(''); // :4540
      } else {
        // :4539-4542
        await era.printAndWait(''); // :4543
      } // :4544-4545
    } else {
      // :4545-4546

      if (era.get(`talent:${target}:76`) == 1) {
        // :4548
        await era.printAndWait(''); // :4549
      } else if (era.get(`talent:${target}:85`) == 1) {
        // :4551
        await era.printAndWait(''); // :4552
      } else {
        // :4554-4558
        await era.printAndWait(''); // :4555
      } // :4556-4558
    } // :4557-4558
    // CFLAG:TARGET:229  = 1（变量语义：CFLAG 族，TARGET:229） // :4558
    kojo.处女丧失 = 1; // :4558
  } // :4558-4559
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
    // :4570-4572
    return 0; // :4570-4572
  } // :4570-4572

  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {
    // :4576

    if (era.get(`talent:${target}:85`) == 1) {
      // :4578
      await era.printAndWait(''); // :4579
    } else {
      // :4580-4583
      await era.printAndWait(''); // :4581
    } // :4582-4583
    // CFLAG:297  = 1（变量语义：CFLAG 族，297） // :4583
    kojo.苦痛刻印Lv3 = 1; // :4583
  } // :4583-4584

  if (game.system.快乐刻印变动 == 3 && kojo.快乐刻印Lv3 == 0) {
    // :4589

    if (era.get(`talent:${target}:85`) == 1) {
      // :4591
      await era.printAndWait(''); // :4592
    } else {
      // :4593-4596
      await era.printAndWait(''); // :4594
    } // :4595-4596
    // CFLAG:298  = 1（变量语义：CFLAG 族，298） // :4596
    kojo.快乐刻印Lv3 = 1; // :4596
  } // :4596-4597

  if (game.system.屈服刻印变动 == 3 && kojo.屈服刻印Lv3 == 0) {
    // :4602

    if (era.get(`talent:${target}:85`) == 1) {
      // :4604
      await era.printAndWait(''); // :4605
    } else {
      // :4606-4609
      await era.printAndWait(''); // :4607
    } // :4608-4609
    // CFLAG:299  = 1（变量语义：CFLAG 族，299） // :4609
    kojo.屈服刻印Lv3 = 1; // :4609
  } // :4609-4610

  if (game.system.反抗刻印变动 == 3 && kojo.反抗刻印Lv3 == 0) {
    // :4615

    if (era.get(`talent:${target}:85`) == 1) {
      // :4617
      await era.printAndWait(''); // :4618
    } else {
      // :4619-4622
      await era.printAndWait(''); // :4620
    } // :4621-4622
    // CFLAG:300  = 1（变量语义：CFLAG 族，300） // :4622
    kojo.反抗刻印Lv3 = 1; // :4622
  } // :4622-4623
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
    // :4633

    if (era.get(`talent:${target}:9`) == 1) {
      // :4635
      await era.printAndWait(''); // :4636
    } else if (Q == 1) {
      // :4638
      await era.printAndWait(''); // :4639
    } else if (Q == 2) {
      // :4641
      await era.printAndWait(''); // :4642
    } else {
      // :4644-4646

      if (
        era.get(`talent:${target}:76`) &&
        (kojo.调教后自慰 < 4 || game.kojo.口上开关 == 2)
      ) {
        // :4646
        await era.printAndWait(''); // :4647
        // CFLAG:261  = 4（变量语义：CFLAG 族，261） // :4648
        kojo.调教后自慰 = 4; // :4648
      } else if (
        era.get(`talent:${target}:85`) &&
        (kojo.调教后自慰 < 3 || game.kojo.口上开关 == 2)
      ) {
        // :4650
        await era.printAndWait(''); // :4651
        // CFLAG:261  = 3（变量语义：CFLAG 族，261） // :4652
        kojo.调教后自慰 = 3; // :4652
      } else if (
        era.get(`abl:${target}:31`) >= 3 &&
        (kojo.调教后自慰 < 2 || game.kojo.口上开关 == 2)
      ) {
        // :4654
        await era.printAndWait(''); // :4655
        // CFLAG:261  = 2（变量语义：CFLAG 族，261） // :4656
        kojo.调教后自慰 = 2; // :4656
      } else if (kojo.调教后自慰 < 1 || game.kojo.口上开关 == 2) {
        // :4658
        await era.printAndWait(''); // :4659
        // CFLAG:261  = 1（变量语义：CFLAG 族，261） // :4660
        kojo.调教后自慰 = 1; // :4660
      } // :4660-4661
    } // :4660-4662
  } // :4660-4663

  if (game.train.初吻与自我口上 == 2) {
    // :4668

    if (
      era.get(`talent:${target}:76`) &&
      (kojo.百合PLAY < 5 || game.kojo.口上开关 == 2)
    ) {
      // :4670
      await era.printAndWait(''); // :4671
      // CFLAG:262  = 5（变量语义：CFLAG 族，262） // :4672
      kojo.百合PLAY = 5; // :4672
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.百合PLAY < 4 || game.kojo.口上开关 == 2)
    ) {
      // :4674
      await era.printAndWait(''); // :4675
      // CFLAG:262  = 4（变量语义：CFLAG 族，262） // :4676
      kojo.百合PLAY = 4; // :4676
    } else if (
      era.get(`abl:${target}:33`) >= 3 &&
      (kojo.百合PLAY < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4678
      await era.printAndWait(''); // :4679
      // CFLAG:262  = 3（变量语义：CFLAG 族，262） // :4680
      kojo.百合PLAY = 3; // :4680
    } else if (
      era.get(`abl:${target}:22`) >= 3 &&
      (kojo.百合PLAY < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4682
      await era.printAndWait(''); // :4683
      // CFLAG:262  = 2（变量语义：CFLAG 族，262） // :4684
      kojo.百合PLAY = 2; // :4684
    } else if (kojo.百合PLAY < 1 || game.kojo.口上开关 == 2) {
      // :4686
      await era.printAndWait(''); // :4687
      // CFLAG:262  = 1（变量语义：CFLAG 族，262） // :4688
      kojo.百合PLAY = 1; // :4688
    } // :4688-4689
  } // :4688-4690

  if (game.train.初吻与自我口上 == 3) {
    // :4695

    if (
      era.get(`talent:${target}:76`) == 1 &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4697
      await era.printAndWait(''); // :4698
      // CFLAG:263  = 3（变量语义：CFLAG 族，263） // :4699
      kojo.朝口交 = 3; // :4699
    } else if (
      era.get(`talent:${target}:85`) &&
      (kojo.朝口交 < 3 || game.kojo.口上开关 == 2)
    ) {
      // :4701
      await era.printAndWait(''); // :4702
      // CFLAG:263  = 3（变量语义：CFLAG 族，263） // :4703
      kojo.朝口交 = 3; // :4703
    } else if (
      era.get(`abl:${target}:16`) >= 5 &&
      (kojo.朝口交 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4705
      await era.printAndWait(''); // :4706
      // CFLAG:263  = 2（变量语义：CFLAG 族，263） // :4707
      kojo.朝口交 = 2; // :4707
    } else if (kojo.朝口交 < 1 || game.kojo.口上开关 == 2) {
      // :4709
      await era.printAndWait(''); // :4710
      // CFLAG:263  = 1（变量语义：CFLAG 族，263） // :4711
      kojo.朝口交 = 1; // :4711
    } // :4711-4712
  } // :4711-4713

  if (game.train.初吻与自我口上 == 4) {
    // :4718

    if (
      era.get(`abl:${target}:2`) >= 4 &&
      (kojo.调教后性交 < 2 || game.kojo.口上开关 == 2)
    ) {
      // :4720
      await era.printAndWait(''); // :4721
      // CFLAG:264  = 2（变量语义：CFLAG 族，264） // :4722
      kojo.调教后性交 = 2; // :4722
    } else if (kojo.调教后性交 < 1 || game.kojo.口上开关 == 2) {
      // :4724
      await era.printAndWait(''); // :4725
      // CFLAG:264  = 1（变量语义：CFLAG 族，264） // :4726
      kojo.调教后性交 = 1; // :4726
    } // :4726-4727
  } // :4726-4728

  if (game.train.初吻与自我口上 == 5) {
    // :4733
    if (kojo.夜袭 < 1 || game.kojo.口上开关 == 2) {
      // :4734
      await era.printAndWait(''); // :4735
      // CFLAG:265  = 1（变量语义：CFLAG 族，265） // :4736
      kojo.夜袭 = 1; // :4736
    } // :4736-4737
  } // :4736-4738

  if (game.train.初吻与自我口上 == 6) {
    // :4743

    if (era.get(`talent:${target}:85`) && era.get(`mark:${target}:3`) < 3) {
      // :4745
      await era.printAndWait(''); // :4746
    } else if (era.get(`mark:${target}:3`) == 3) {
      // :4748
      await era.printAndWait(''); // :4749
    } else if (era.get(`talent:${target}:76`)) {
      // :4751
      await era.printAndWait(''); // :4752
    } else {
      // :4751-4754
      await era.printAndWait(''); // :4755
    } // :4751-4756
  } // :4757-4761

  if (game.train.初吻与自我口上 == 11) {
    // :4764
    if (kojo.妊娠发觉 >= 1) {
      // :4765-4766
      return 0; // :4765-4766
    } // :4765-4766

    if (era.get(`talent:${target}:9`) == 1) {
      // :4768
      await era.printAndWait(''); // :4769
    } else if (
      era.get(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      // :4771
      await era.printAndWait(''); // :4772
    } else {
      // :4774-4777
      await era.printAndWait(''); // :4775
    } // :4776-4777
    // CFLAG:271  = 1（变量语义：CFLAG 族，271） // :4777
    kojo.妊娠发觉 = 1; // :4777
  } // :4777-4778

  if (game.train.初吻与自我口上 == 12) {
    // :4784
    if (kojo.生产 >= 1) {
      // :4785-4786
      return 0; // :4785-4786
    } // :4785-4786

    if (era.get(`talent:${target}:9`) == 1) {
      // :4788
      await era.printAndWait(''); // :4789
    } else if (
      era.get(`talent:${target}:85`) &&
      chara(target).event.妊娠相手 == 1
    ) {
      // :4791
      await era.printAndWait(''); // :4792
    } else {
      // :4794-4797
      await era.printAndWait(''); // :4795
    } // :4796-4797
    // CFLAG:272  = 1（变量语义：CFLAG 族，272） // :4797
    kojo.生产 = 1; // :4797
  } // :4797-4798

  if (game.train.初吻与自我口上 == 13) {
    // :4803

    if (era.get(`talent:${target}:153`)) {
      // :4805
      await era.printAndWait(''); // :4806
    } else if (era.get(`talent:${target}:154`)) {
      // :4808
      await era.printAndWait(''); // :4809
    } // :4810-4811
    // CFLAG:273  = 1（变量语义：CFLAG 族，273） // :4811
    kojo.育儿室 = 1; // :4811
  } // :4811-4812

  if (game.train.初吻与自我口上 == 14) {
    // :4817
    await era.printAndWait(''); // :4818
    // CFLAG:274  = 1（变量语义：CFLAG 族，274） // :4819
    kojo.亲离 = 1; // :4819
  } // :4819-4820

  if (game.train.初吻与自我口上 == 999) {
    // :4825

    if (era.get(`talent:${target}:85`)) {
      // :4827
      await era.printAndWait(''); // :4828
    } else {
      // :4825-4830
      await era.printAndWait(''); // :4831
    } // :4832-4836
  } // :4833-4836

  if (game.train.初吻与自我口上 == 998) {
    // :4838

    if (era.get(`talent:${target}:85`)) {
      // :4840
      await era.printAndWait(''); // :4841
    } else {
      // :4838-4843
      await era.printAndWait(''); // :4844
    } // :4845-4849
  } // :4846-4849

  // TFLAG:13  = 0（变量语义：TFLAG 族，13） // :4851
  game.train.初吻与自我口上 = 0; // :4851

  return 0; // :4851-4853
}

/**
 * @DUNGEON_RYOUZYOKU_K14（:4884-5037）：迷宫凌辱开场口上。空模板骨架
 * （处刑前的一言按 TALENT:0/21/22/17/31/36 等分档）。
 */
async function dungeon_ryouzyoku_k14() {
  const target = era_flag.target;

  if (era.get(`talent:${target}:0`) == 1) {
    // :4889

    await era.printAndWait(''); // :4891

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      // :4893

      await era.printAndWait(''); // :4896

      return 0; // :4886-4898
    } else if (
      era.get(`talent:${target}:17`) == 1 ||
      era.get(`talent:${target}:31`) == 1 ||
      era.get(`talent:${target}:36`) == 1
    ) {
      // :4899

      await era.printAndWait(''); // :4902

      if (
        era.get(`talent:${target}:106`) == 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        // :4906
        await era.printAndWait(''); // :4906
      } // :4906

      if (era.get(`exp:${target}:22`) > 0) {
        // :4910
        await era.printAndWait(''); // :4910
      } // :4910
    } else if (
      era.get(`talent:${target}:11`) == 1 ||
      era.get(`talent:${target}:12`) == 1 ||
      era.get(`talent:${target}:15`) == 1 ||
      era.get(`talent:${target}:30`) == 1 ||
      era.get(`talent:${target}:34`) == 1
    ) {
      // :4912

      await era.printAndWait(''); // :4916
    } else if (
      era.get(`talent:${target}:10`) == 1 ||
      era.get(`talent:${target}:26`) == 1
    ) {
      // :4918

      await era.printAndWait(''); // :4921
    } else {
      // :4886-4923

      await era.printAndWait(''); // :4926
    } // :4886-4928
  } else {
    // :4886-4929

    await era.printAndWait(''); // :4931

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      // :4933

      await era.printAndWait(''); // :4936

      return 0; // :4938-4974
    } else if (
      era.get(`talent:${target}:17`) == 1 ||
      era.get(`talent:${target}:31`) == 1 ||
      era.get(`talent:${target}:36`) == 1
    ) {
      // :4939

      await era.printAndWait(''); // :4942

      if (
        era.get(`talent:${target}:106`) == 1 ||
        era.get(`exp:${target}:1`) > 0
      ) {
        // :4946
        await era.printAndWait(''); // :4946
      } // :4946

      if (era.get(`exp:${target}:22`) > 0) {
        // :4950
        await era.printAndWait(''); // :4950
      } // :4950
    } else if (
      era.get(`talent:${target}:11`) == 1 ||
      era.get(`talent:${target}:12`) == 1 ||
      era.get(`talent:${target}:15`) == 1 ||
      era.get(`talent:${target}:30`) == 1 ||
      era.get(`talent:${target}:34`) == 1
    ) {
      // :4952

      await era.printAndWait(''); // :4956
    } else if (
      era.get(`talent:${target}:10`) == 1 ||
      era.get(`talent:${target}:26`) == 1
    ) {
      // :4958

      await era.printAndWait(''); // :4961
    } else {
      // :4963-4974

      await era.printAndWait(''); // :4966
    } // :4968-4974
  } // :4969-4974

  return 0; // :4971-4974
}

/**
 * @DUNGEON_RYOUZYOKU_AFTER_K14（:4884-5037 内）：迷宫凌辱事后口上。空模板骨架。
 */
async function dungeon_ryouzyoku_after_k14() {
  const target = era_flag.target;

  if (era.get(`talent:${target}:0`) == 1) {
    // :4979

    await era.printAndWait(''); // :4981

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      // :4983

      await era.printAndWait(''); // :4986

      return 0; // :4976-4988
    } // :4976-4989

    if (era.get(`exp:${target}:1`) > 20) {
      // :4992
      await era.printAndWait(''); // :4993
      await era.printAndWait(''); // :4994
    } // :4976-4995

    if (era.get(`exp:${target}:22`) > 20) {
      // :4999
      await era.printAndWait(''); // :4999
    } // :4999

    if (era.get(`exp:${target}:20`) > 20) {
      // :5003
      await era.printAndWait(''); // :5003
    } // :5003
  } else {
    // :5004-5016

    await era.printAndWait(''); // :5006

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      // :5008

      await era.printAndWait(''); // :5011

      return 0; // :5013-5016
    } // :5014-5016

    if (era.get(`exp:${target}:0`) > 20) {
      // :5017
      await era.printAndWait(''); // :5018
      await era.printAndWait(''); // :5019
    } // :5017-5020

    if (era.get(`exp:${target}:1`) > 20) {
      // :5023
      await era.printAndWait(''); // :5024
      await era.printAndWait(''); // :5025
    } // :5017-5026

    if (era.get(`exp:${target}:22`) > 20) {
      // :5030
      await era.printAndWait(''); // :5030
    } // :5030

    if (era.get(`exp:${target}:20`) > 20) {
      // :5034
      await era.printAndWait(''); // :5034
    } // :5034
  } // :5035-5039

  return 0; // :5037-5039
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
    // :5058

    if (game.dungeon.肉便器常识改写 == 1) {
      // :5061
      await era.printAndWait(''); // :5062
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      // :5064
      await era.printAndWait(''); // :5065
    } else if (era.get(`talent:${a}:76`) == 1) {
      // :5067
      await era.printAndWait(''); // :5068
    } else if (era.get(`talent:${a}:85`)) {
      // :5070
      await era.printAndWait(''); // :5071
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5073
      await era.printAndWait(''); // :5074
    } else {
      // :5076-5079
      await era.printAndWait(''); // :5077
    } // :5078-5079
  } else if (game.train.肉便器行动 == 1) {
    // :5079

    if (game.dungeon.肉便器常识改写 == 1) {
      // :5082
      await era.printAndWait(''); // :5083
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      // :5085
      await era.printAndWait(''); // :5086
    } else if (era.get(`talent:${a}:76`) == 1) {
      // :5088
      await era.printAndWait(''); // :5089
    } else if (era.get(`talent:${a}:85`)) {
      // :5091
      await era.printAndWait(''); // :5092
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5094
      await era.printAndWait(''); // :5095
    } else {
      // :5097-5100
      await era.printAndWait(''); // :5098
    } // :5099-5100
  } else if (game.train.肉便器行动 == 2) {
    // :5100

    if (game.dungeon.肉便器常识改写 == 1) {
      // :5103
      await era.printAndWait(''); // :5104
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      // :5106
      await era.printAndWait(''); // :5107
    } else if (era.get(`talent:${a}:76`) == 1) {
      // :5109
      await era.printAndWait(''); // :5110
    } else if (era.get(`talent:${a}:85`)) {
      // :5112
      await era.printAndWait(''); // :5113
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5115
      await era.printAndWait(''); // :5116
    } else {
      // :5118-5121
      await era.printAndWait(''); // :5119
    } // :5120-5121
  } else if (game.train.肉便器行动 == 3) {
    // :5121

    if (game.dungeon.肉便器常识改写 == 1) {
      // :5124
      await era.printAndWait(''); // :5125
    } else if (era.get(`talent:${a}:76`) == 1) {
      // :5127
      await era.printAndWait(''); // :5128
    } else if (era.get(`talent:${a}:85`)) {
      // :5130
      await era.printAndWait(''); // :5131
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5133
      await era.printAndWait(''); // :5134
    } else {
      // :5136-5139
      await era.printAndWait(''); // :5137
    } // :5138-5139
  } else if (game.train.肉便器行动 == 4) {
    // :5139

    if (game.dungeon.肉便器常识改写 == 1) {
      // :5142
      await era.printAndWait(''); // :5143
    } else if (era.get(`talent:${a}:76`) == 1) {
      // :5145
      await era.printAndWait(''); // :5146
    } else if (era.get(`talent:${a}:85`)) {
      // :5148
      await era.printAndWait(''); // :5149
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5151
      await era.printAndWait(''); // :5152
    } else {
      // :5154-5157
      await era.printAndWait(''); // :5155
    } // :5156-5157
  } else if (game.train.肉便器行动 == 5) {
    // :5157

    if (game.dungeon.肉便器常识改写 == 1) {
      // :5160
      await era.printAndWait(''); // :5161
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      // :5163
      await era.printAndWait(''); // :5164
    } else if (era.get(`talent:${a}:76`) == 1) {
      // :5166
      await era.printAndWait(''); // :5167
    } else if (era.get(`talent:${a}:85`)) {
      // :5169
      await era.printAndWait(''); // :5170
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5172
      await era.printAndWait(''); // :5173
    } else {
      // :5175-5178
      await era.printAndWait(''); // :5176
    } // :5177-5178
  } else if (game.train.肉便器行动 == 6) {
    // :5178

    if (game.dungeon.肉便器常识改写 == 1) {
      // :5181
      await era.print(''); // :5182
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      // :5184
      await era.printAndWait(''); // :5185
    } else if (era.get(`talent:${a}:76`) == 1) {
      // :5187
      await era.printAndWait(''); // :5188
    } else if (era.get(`talent:${a}:85`)) {
      // :5190
      await era.printAndWait(''); // :5191
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5193
      await era.printAndWait(''); // :5194
    } else {
      // :5196-5199
      await era.printAndWait(''); // :5197
    } // :5198-5199
  } else if (game.train.肉便器行动 == 7) {
    // :5199

    if (game.dungeon.肉便器常识改写 == 1) {
      // :5202
      await era.printAndWait(''); // :5203
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      // :5205
      await era.printAndWait(''); // :5206
    } else if (era.get(`talent:${a}:76`) == 1) {
      // :5208
      await era.printAndWait(''); // :5209
    } else if (era.get(`talent:${a}:85`)) {
      // :5211
      await era.printAndWait(''); // :5212
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5214
      await era.printAndWait(''); // :5215
    } else {
      // :5217-5220
      await era.printAndWait(''); // :5218
    } // :5219-5220
  } else if (game.train.肉便器行动 == 9) {
    // :5220

    if (game.dungeon.肉便器常识改写 == 1) {
      // :5223
      await era.printAndWait(`「啊、那个…元冒险者的${target_name}、来着」`); // :5224
      await era.printAndWait(
        `「${sc()}败给了伟大的魔王大人…虽然身心都被彻底的玩弄了、但不会就此屈服的！」`,
      ); // :5225
      await era.printAndWait(
        `「然后啊、今天啊…是要让大家『看看原生态的${sc()}』啊…」`,
      ); // :5226
      await era.printAndWait(
        `「虽然看『男人的身体』也没啥意思啦…但是${sc()}会竭尽全力的、请好好看着咯♪」`,
      ); // :5227
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      // :5229
      await era.printAndWait(`「啊、那个…元冒险者的${target_name}、来着」`); // :5230
      await era.printAndWait(
        `「${sc()}败给了伟大的魔王大人…虽然身心都被彻底的玩弄了、但不会就此屈服的！」`,
      ); // :5231
      await era.printAndWait(
        `「然后啊、今天啊…是要让大家『看看原生态的${sc()}』啊…」`,
      ); // :5232
      await era.printAndWait(
        `「虽然看『男人的身体』也没啥意思啦…但是${sc()}会竭尽全力的、请好好看着咯♪」`,
      ); // :5233
    } else if (era.get(`talent:${a}:76`) == 1) {
      // :5235
      await era.printAndWait(''); // :5236
    } else if (era.get(`talent:${a}:85`)) {
      // :5238
      await era.printAndWait(''); // :5239
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5241
      await era.printAndWait(''); // :5242
    } else {
      // :5244-5247
      await era.printAndWait(''); // :5245
    } // :5246-5247
  } else if (game.train.肉便器行动 == 12) {
    // :5247

    if (game.dungeon.肉便器常识改写 == 1) {
      // :5250
      await era.printAndWait(''); // :5251
    } else if (
      era.get(`talent:${target}:122`) &&
      game.dungeon.肉便器常识改写 == 1
    ) {
      // :5253
      await era.printAndWait(''); // :5254
    } else if (era.get(`talent:${a}:76`) == 1) {
      // :5256
      await era.printAndWait(''); // :5257
    } else if (era.get(`talent:${a}:85`)) {
      // :5259
      await era.printAndWait(''); // :5260
    } else if (era.get(`abl:${a}:16`) >= 5) {
      // :5262
      await era.printAndWait(''); // :5263
    } else {
      // :5265-5273
      await era.printAndWait(''); // :5266
    } // :5267-5273
  } // :5268-5273

  return 0; // :5270-5273
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

  await era.printAndWait(''); // :5278

  if (
    era.get(`talent:${target}:21`) == 1 ||
    era.get(`talent:${target}:22`) == 1
  ) {
    // :5280

    await era.printAndWait(`「……哈」`); // :5283

    return 0; // :5283-5285
  } else if (
    era.get(`talent:${target}:11`) == 1 ||
    era.get(`talent:${target}:12`) == 1 ||
    era.get(`talent:${target}:15`) == 1 ||
    era.get(`talent:${target}:30`) == 1 ||
    era.get(`talent:${target}:34`) == 1
  ) {
    // :5286

    if (rand_n(3) == 0) {
      // :5289
      await era.printAndWait(`「……真是污秽」`); // :5290
    } else if (rand_n(2) == 0) {
      // :5291
      await era.printAndWait(`「魔力什么的，没有必要」`); // :5292
    } else {
      // :5292-5293
      await era.printAndWait(`「消灭了吗」`); // :5294
    } // :5294-5295
  } else if (
    era.get(`talent:${target}:10`) == 1 ||
    era.get(`talent:${target}:26`) == 1
  ) {
    // :5297

    await era.printAndWait(`「魔的力量、居然强大到了这种地步……」`); // :5300

    return 0; // :5300-5302
  } else {
    // :5300-5303

    if (rand_n(3) == 0) {
      // :5306
      await era.printAndWait(`「这是光明的胜利！」`); // :5307
    } else if (rand_n(2) == 0) {
      // :5308
      await era.printAndWait(`「光明不灭！」`); // :5309
    } else {
      // :5309-5310
      await era.printAndWait(`「怎么可能输给不净之物……」`); // :5311
    } // :5311-5312
  } // :5314-5316

  if (
    (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||
    (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50
  ) {
    // :5316

    await era.printAndWait(`（果不其然，真是强大……）`); // :5318
  } else {
    // :5318-5319

    await era.printAndWait(`「不净的力量，抹杀之」`); // :5321
  } // :5321-5322

  return 0; // :5321-5324
}

/**
 * @DUNGEON_ATTACK_K14（:5327-5411）：迷宫战斗攻击口上。填了台词；按
 * CFLAG:1 侵攻中分档 + TALENT 性格分档。
 */
async function dungeon_attack_k14(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const target = era_flag.target;

  if (chara(target).invasion.状态 == 2) {
    // :5332

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      // :5334

      await era.printAndWait(`「……准备咯」`); // :5337

      return 0; // :5337-5339
    } else if (
      era.get(`talent:${target}:11`) == 1 ||
      era.get(`talent:${target}:12`) == 1 ||
      era.get(`talent:${target}:15`) == 1 ||
      era.get(`talent:${target}:30`) == 1 ||
      era.get(`talent:${target}:34`) == 1
    ) {
      // :5340

      if (rand_n(3) == 0) {
        // :5343
        await era.printAndWait(`「怪物！」`); // :5344
      } else if (rand_n(2) == 0) {
        // :5345
        await era.printAndWait(`「不净之物！」`); // :5346
      } else {
        // :5346-5347
        await era.printAndWait(`「……消失吧！」`); // :5348
      } // :5348-5349
    } else if (
      era.get(`talent:${target}:10`) == 1 ||
      era.get(`talent:${target}:26`) == 1
    ) {
      // :5351

      await era.printAndWait(`「切，不净之物……」`); // :5354

      return 0; // :5354-5356
    } else {
      // :5354-5357

      if (rand_n(3) == 0) {
        // :5360
        await era.printAndWait(`「毁灭吧！」`); // :5361
      } else if (rand_n(2) == 0) {
        // :5362
        await era.printAndWait(`「可不能输！」`); // :5363
      } else {
        // :5363-5364
        await era.printAndWait(`「光明啊！」`); // :5365
      } // :5365-5366
    } // :5368-5370
  } else {
    // :5369-5370

    if (
      era.get(`talent:${target}:21`) == 1 ||
      era.get(`talent:${target}:22`) == 1
    ) {
      // :5371

      await era.printAndWait(`「……准备咯♪」`); // :5374

      return 0; // :5374-5376
    } else if (
      era.get(`talent:${target}:11`) == 1 ||
      era.get(`talent:${target}:12`) == 1 ||
      era.get(`talent:${target}:15`) == 1 ||
      era.get(`talent:${target}:30`) == 1 ||
      era.get(`talent:${target}:34`) == 1
    ) {
      // :5377

      if (rand_n(3) == 0) {
        // :5380
        await era.printAndWait(`「这就是魔力吗！」`); // :5381
      } else if (rand_n(2) == 0) {
        // :5382
        await era.printAndWait(`「真是美妙的力量……」`); // :5383
      } else {
        // :5383-5384
        await era.printAndWait(`「好强……竟可以强成这样，魔力真是……」`); // :5385
      } // :5385-5386
    } else if (
      era.get(`talent:${target}:10`) == 1 ||
      era.get(`talent:${target}:26`) == 1
    ) {
      // :5388

      await era.printAndWait(`「切，魔力开始侵蚀了吗……」`); // :5391

      return 0; // :5391-5393
    } else {
      // :5391-5394

      if (rand_n(3) == 0) {
        // :5397
        await era.printAndWait(`「消失吧！」`); // :5398
      } else if (rand_n(2) == 0) {
        // :5399
        await era.printAndWait(`「黑暗啊！」`); // :5400
      } else {
        // :5400-5401
        await era.printAndWait(`「堕入黑暗吧……」`); // :5402
      } // :5402-5403
    } // :5402-5405
  } // :5402-5406

  return 0; // :5410-5413
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
    // :5420

    if (era.get(`base:${target}:1`) <= 0) {
      // :5422
      await era.printAndWait(''); // :5423
    } else {
      // :5424-5430
      await era.printAndWait(''); // :5425
    } // :5426-5430
    return 0; // :5427-5430
  } // :5428-5430

  if (era_flag.selectcom == 56) {
    // :5432

    if (era.get(`base:${target}:1`) <= 0) {
      // :5434

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :5436
        await era.printAndWait(''); // :5437
      } else {
        // :5430-5438
        await era.printAndWait(''); // :5439
      } // :5430-5440
    } else {
      // :5430-5441

      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :5443
        await era.printAndWait(''); // :5444
      } else {
        // :5445-5453
        await era.printAndWait(''); // :5446
      } // :5447-5453
    } // :5448-5453
    return 0; // :5449-5453
  } // :5450-5453

  if (era_flag.selectcom == 31) {
    // :5455

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5457
      await era.printAndWait(''); // :5458
    } else {
      // :5453-5459
      await era.printAndWait(''); // :5460
    } // :5461-5465
    return 0; // :5462-5465
  } // :5463-5465

  if (era_flag.selectcom == 5) {
    // :5467

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5469
      await era.printAndWait(''); // :5470
    } else {
      // :5465-5471
      await era.printAndWait(''); // :5472
    } // :5473-5477
    return 0; // :5474-5477
  } // :5475-5477

  if (era_flag.selectcom == 21) {
    // :5479

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5481
      await era.printAndWait(''); // :5482
    } else if (game.train.死斗场敌种 == 206) {
      // :5484
      await era.printAndWait(''); // :5485
    } else {
      // :5486-5493
      await era.printAndWait(''); // :5487
    } // :5488-5493
    return 0; // :5489-5493
  } // :5490-5493

  if (era_flag.selectcom == 27) {
    // :5495

    if (era_flag.assi > 0 && era_flag.assiplay) {
      // :5497
      await era.printAndWait(''); // :5498
    } else if (game.train.死斗场敌种 == 206) {
      // :5500
      await era.printAndWait(''); // :5501
    } else {
      // :5502-5509
      await era.printAndWait(''); // :5503
    } // :5504-5509
    return 0; // :5505-5509
  } // :5506-5509

  if (era_flag.selectcom == 51) {
    // :5511
    await era.printAndWait(''); // :5512
    return 0; // :5509-5513
  } // :5509-5514

  return 0; // :5517-5521
}

module.exports = {
  STUBBED_CALLS,
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
};
