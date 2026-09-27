/**
 * @file 门面字段命名表（issue #71；#90 起与 yml/ 名字表合流）：所有权切片
 * 之后，每个下标的中文访问器名与语义注释（note）。手维护的输入数据，
 * 生成器只读。
 *
 * 判断条件：审校者对照变量释文与指令名表，能不能一眼确认生成码对不对。
 * 因此：
 *   - 字段名用中文（对得上变量释文与指令名表），不是英文 snake_case；
 *   - 每个名字带 note 注释说明下标语义；
 *   - 未收录的属主下标不进门面（ownership 仍完整登记）。生成器跳过并按域
 *     报告跳过清单，绝不静默用数字当名字，也不预填 `tflag_N`。
 *
 * 两源合流（#90 结论，依据见 issue #90）：talent/source/abl/palam/mark/exp
 * 六张表的名字以 `yml/` 列名（引擎名字表，#43 转出、#60 归一简体）为唯一
 * 真相，生成器直接读 yml——本文件对这六张表**只收 yml 没有的缺口**（如
 * mark:4）或名字一致时的更精注释；同一下标两源名字不一致，生成器报错，
 * 宁可红也不静默择一。cflag/tflag/item/global 的 yml 表是空表（引擎建桶
 * 用、无列名），名字仍全部来自本文件。
 *
 * 移植自建表（delta/deltabase）没有 yml 表也没有 ownership/ 产物（ere
 * 自建变量族，测不出属主），名字与属主都在本文件声明，见
 * PORT_TABLE_OWNERS。
 *
 * 表键 = 引擎表名小写；内层键 = 数字下标。
 */

'use strict';

function fill(start, end, make) {
  const out = {};
  for (let i = start; i <= end; i += 1) {
    out[i] = make(i);
  }
  return out;
}

function named(name, note) {
  return { name, note };
}

/**
 * 尾部条目：除 name/note 外带 tail 标志，生成器（gen-facade.js
 * entries_for 的稳定分区）把它排在同域同表既有条目**之后**发射。用途：
 * 并行工单各自补名时，让后加的字段落在域区块尾部——两张工单在生成产物
 * 上的落点不相邻，合并面最小（#170 与 #174 同改本表的先例）。既有条目
 * 一律继续用 named，不要回头改写成 named_tail。
 */
function named_tail(name, note) {
  return { name, note, tail: true };
}

// —— CFLAG：口上域切片（ownership 属主 kojo 的 110 个下标）——
// cflag 的 yml 表是空表（引擎建桶用），名字只能手收。#90 起属主 kojo 之外
// 的域也按补名逐个进门面（其余属主下标仍跳过并报告，随各自子系统工单）。

const cflag = {
  // —— 低位共享状态（#114 回合结算接入；各下标属主见 ownership/cflag-ownership.yml）——
  0: named('出售与助手资格', 'CFLAG:0 = 売却及び助手可能 1=売却可 2=助手可'),
  1: named(
    '状态',
    'CFLAG:1 キャラの状態 0=調教中 1=待機 2=侵攻中 3=迎撃中 4=死亡 12=戦役',
  ),
  2: named('好感度', 'CFLAG:2 主人による調教経験(好感度)'),
  3: named_tail('公开自慰经验', 'CFLAG:3 公開オナニーの経験'),
  4: named('灌肠经验', 'CFLAG:4 浣腸経験（1=経験済み、2=ビデオ撮影済み）'),
  5: named_tail('野外露出经验', 'CFLAG:5 野外露出経験'),
  31: named_tail('媚药残留度', 'CFLAG:31 体内媚薬残留度'),
  32: named_tail('媚药禁断症状', 'CFLAG:32 媚薬中毒の禁断症状判定'),
  // —— 着衣/服装状态与出击相关（#397 逐条补名：这些下标的属主域门面此前
  // 没有访问器，跨域写只能裸寻址；这张工单按 domain-check 的指引补名后改用门面）——
  43: named_tail(
    '内裤状态',
    'CFLAG:43 パンツの状態（-3:破り取られている -2:汚物まみれ -1:没収 0:通常 1以上:洗濯中）',
  ),
  47: named_tail(
    '特别服装状态',
    'CFLAG:47 特別コスチュームの状態（同上の符号约定）',
  ),
  48: named_tail('内裤穿着期间', 'CFLAG:48 現在のパンツを穿き続けている期間'),
  // 读写点跨两个域：#397 的 ere/page/page-tailor.js 写 1，#400 的
  // ere/event/event-nextday.js 写 0、读——后者在 event 域侧，属跨域写，
  // 一律经 chara(cid).stronghold 门面（#71）
  49: named_tail('贞操带钥匙已丢弃', 'CFLAG:49 貞操帯のカギを捨てた'),
  505: named_tail('勇者击破数', 'CFLAG:505 勇者撃破数'),
  491: named_tail('录像时间', 'CFLAG:491 撮影時間'),
  493: named_tail('录像价值', 'CFLAG:493 評価'),
  495: named_tail('录像浏览数', 'CFLAG:495 閲覧者数'),
  496: named_tail('录像粉丝信数', 'FAV（粉丝信数）累积'),
  498: named_tail('录像属性', 'CFLAG:498 属性（1=清純 -1=不純）'),
  499: named_tail('水晶球充能次数', 'CFLAG:499 水晶球充能回数'),
  9: named('等级', 'CFLAG:9 レベル'),
  13: named('基础攻击', 'CFLAG:13 基礎攻撃力'),
  14: named('基础防御', 'CFLAG:14 基礎防御力'),
  109: named(
    '排卵诱发剂',
    'CFLAG:109 排卵促進剤の使用の有無（日程推进的效果消去写 0）',
  ),
  101: named_tail('主人膣内射精', 'CFLAG:101 マスターによる膣内射精カウント用'),
  103: named_tail(
    '助手膣内射精',
    'CFLAG:103 助手から奴隷への膣内射精カウント用',
  ),
  104: named_tail(
    '对象膣内射精',
    'CFLAG:104 奴隷から助手への膣内射精カウント用',
  ),
  105: named_tail(
    '客膣内射精',
    'CFLAG:105 娼館などの客から奴隷への中田氏カウント用',
  ),
  106: named_tail('犬膣内射精', 'CFLAG:106 ノラ犬からの中田氏カウント用'),
  107: named_tail(
    '怪物膣内射精',
    'CFLAG:107 モンスター・触手から奴隷への膣内射精カウント用',
  ),
  108: named_tail('狂王膣内射精', 'CFLAG:108 狂王からの中田氏カウント用'),
  190: named('通信勇者唯一标记', 'CFLAG:190'),
  21: named('肉亲_0', 'CFLAG:21～25 肉亲关系'),
  201: named('初调教', '初调教时'),
  202: named('简易助手_0', '简易助手口上 CFLAG:202～210'),
  203: named('简易助手_1', '简易助手口上 CFLAG:202～210'),
  204: named('简易助手_2', '简易助手口上 CFLAG:202～210'),
  214: named('首次C绝顶_K14', '初めてC絶頂 CFLAG:214'),
  ...fill(221, 230, (i) => {
    const labels = {
      221: '首次润滑Lv2',
      222: '首次欲情Lv2',
      223: '首次耻情Lv2',
      224: '首次恐怖Lv2',
      225: '首次C绝顶',
      226: '首次V绝顶',
      227: '首次A绝顶',
      228: '首次B绝顶',
      229: '处女丧失',
      230: '寄生',
    };
    const where =
      i === 230 ? '寄生 CFLAG:230' : `参数变动时 CFLAG:221～260；${labels[i]}`;
    return named(labels[i], where);
  }),
  261: named('调教后自慰', '调教后自慰时'),
  262: named('百合PLAY', 'レズプレイ'),
  263: named('朝口交', '朝口交时'),
  264: named('调教后性交', '调教后性交时'),
  265: named('夜袭', '夜袭时'),
  271: named('妊娠发觉', '妊娠发觉时'),
  272: named('生产', '生产时'),
  273: named('育儿室', '育儿室时'),
  274: named('亲离', '亲离时'),
  297: named('苦痛刻印Lv3', '苦痛刻印Lv3 取得时'),
  298: named('快乐刻印Lv3', '快乐刻印Lv3 取得时'),
  299: named('屈服刻印Lv3', '屈服刻印Lv3 取得时'),
  300: named('反抗刻印Lv3', '反抗刻印Lv3 取得时'),
  // 301～348 = 调教中各指令口上。下标与指令编号不是 301+N 的映射
  // （穿环是 348 不是 301+87；淋浴 18 号指令在口上域无写入、不下表）。
  301: named('爱抚', 'yml/TrainCommand.yml 指令名'),
  302: named('舔阴', 'yml/TrainCommand.yml 指令名'),
  303: named('肛门爱抚', 'yml/TrainCommand.yml 指令名'),
  304: named('自慰', 'yml/TrainCommand.yml 指令名'),
  305: named('口交_主', '口交 CFLAG:305（指令 4）'),
  306: named('胸爱抚', 'yml/TrainCommand.yml 指令名'),
  307: named('接吻', 'yml/TrainCommand.yml 指令名'),
  308: named('自己扒开', 'yml/TrainCommand.yml 指令名'),
  309: named('插入手指', 'yml/TrainCommand.yml 指令名'),
  310: named('舔肛', 'yml/TrainCommand.yml 指令名'),
  311: named('振动宝石', 'yml/TrainCommand.yml 指令名'),
  312: named('壶虫', 'yml/TrainCommand.yml 指令名'),
  313: named('振动杖', 'yml/TrainCommand.yml 指令名'),
  314: named('肛门虫', 'yml/TrainCommand.yml 指令名'),
  315: named('阴蒂夹', 'yml/TrainCommand.yml 指令名'),
  316: named('乳头夹', 'yml/TrainCommand.yml 指令名'),
  317: named('榨乳器', 'yml/TrainCommand.yml 指令名'),
  318: named('飞机杯', 'yml/TrainCommand.yml 指令名'),
  320: named('肛珠', 'yml/TrainCommand.yml 指令名'),
  321: named('正常位', 'yml/TrainCommand.yml 指令名'),
  322: named('背后位', 'yml/TrainCommand.yml 指令名'),
  323: named('对面座位', 'yml/TrainCommand.yml 指令名'),
  324: named('背面座位', 'yml/TrainCommand.yml 指令名'),
  325: named('逆强奸', '逆强奸 CFLAG:325（指令 24）'),
  326: named('逆肛门强奸', '逆肛门强奸 CFLAG:326'),
  327: named('正常位肛交', 'yml/TrainCommand.yml 指令名'),
  328: named('背后位肛交', 'yml/TrainCommand.yml 指令名'),
  329: named('对面座位肛交', 'yml/TrainCommand.yml 指令名'),
  330: named('背面座位肛交', 'yml/TrainCommand.yml 指令名'),
  331: named('手淫', 'yml/TrainCommand.yml 指令名'),
  332: named('口交_奴', 'yml/TrainCommand.yml 指令名'),
  333: named('乳交', 'yml/TrainCommand.yml 指令名'),
  334: named('股间性交', 'yml/TrainCommand.yml 指令名'),
  335: named('骑乘位', 'yml/TrainCommand.yml 指令名'),
  336: named('全身擦洗', 'yml/TrainCommand.yml 指令名'),
  337: named('骑乘位肛交', 'yml/TrainCommand.yml 指令名'),
  338: named('肛门侍奉', 'yml/TrainCommand.yml 指令名'),
  339: named('足交', '足交 CFLAG:339（指令 38）'),
  341: named('打屁股', 'yml/TrainCommand.yml 指令名'),
  342: named('鞭', 'yml/TrainCommand.yml 指令名'),
  343: named('针', 'yml/TrainCommand.yml 指令名'),
  344: named('眼罩', 'yml/TrainCommand.yml 指令名'),
  345: named('绳子', 'yml/TrainCommand.yml 指令名'),
  346: named('口塞', 'yml/TrainCommand.yml 指令名'),
  347: named('灌肠肛塞', 'yml/TrainCommand.yml 指令名'),
  348: named('穿环', 'yml/TrainCommand.yml 指令名'),
  356: named('放置PLAY', 'yml/TrainCommand.yml 指令名：何もしない'),
  357: named('交谈', 'yml/TrainCommand.yml 指令名'),
  360: named('乳夹口交', 'yml/TrainCommand.yml 指令名'),
  361: named('口交时自慰', 'yml/TrainCommand.yml 指令名'),
  362: named('手搓口交', 'yml/TrainCommand.yml 指令名'),
  363: named('真空口交', 'yml/TrainCommand.yml 指令名'),
  364: named('六九式', 'yml/TrainCommand.yml 指令名'),
  365: named('深喉', 'yml/TrainCommand.yml 指令名'),
  366: named('侵犯助手', '助手を犯させる CFLAG:366'),
  367: named('双人口交', '二本フェラ CFLAG:367'),
  369: named('双人侍奉口交', 'ダブルフェラ CFLAG:369'),
  370: named('魔族化', '等 魔族化 CFLAG:370'),
  372: named('壶虫着脱', '壶虫 CFLAG:312 CFLAG:372'),
  374: named('肛门虫着脱', '肛门虫着脱时'),
  375: named('阴蒂夹着脱', '阴蒂夹着脱时'),
  376: named('乳头夹着脱', '乳头夹着脱时'),
  377: named('榨乳器着脱', '榨乳器着脱时'),
  378: named('飞机杯着脱', '飞机杯着脱时'),
  379: named('肛珠着脱', '肛珠着脱时'),
  380: named('眼罩着脱', '眼罩着脱时'),
  381: named('强制口交', 'yml/TrainCommand.yml 指令名'),
  385: named('绳子着脱', '绳子着脱时'),
  386: named('口塞着脱', '口塞着脱时'),
  387: named('灌肠肛塞着脱', '灌肠+肛塞 CFLAG:387'),
  391: named('三人PLAY', '3P CFLAG:391'),
  400: named('魔族化_K11', '魔族化 CFLAG:400'),
  444: named('兽奸眼罩', 'CFLAG:444 獣姦アイマスク时口上'),
  451: named('年龄', 'CFLAG:451 年齢（人間換算，human_age_generate の結果）'),
  452: named('种族年龄', 'CFLAG:452 種族年齢（月替わりの年齢加算はこちら）'),
  503: named(
    '休憩',
    // CFLAG:503 的释文即「フラグ」；消费点是回合结算的休憩判定
    // （&1 时回复翻倍、消费 -1）
    'CFLAG:503 フラグ（回合结算的休憩判定消费）',
  ),
  506: named('新人', 'CFLAG:506 新人フラグ'),
  507: named('回城标志', 'CFLAG:507 街まで帰還フラグ'),
  534: named('已接任务', 'CFLAG:534 受注クエスト'),
  570: named('从属怪物', 'CFLAG:570 従属モンスター（使役パートナーの NO）'),
  102: named(
    '妊娠相手',
    'CFLAG:102 = 誰によって妊娠させられたか（マスター=1, 助手=2, 奴隷=3, 客=4, 犬=5, モンスター・触手=6, 狂王=7）',
  ),
  112: named_tail('胎儿怪物编号', 'CFLAG:112 = 怀孕中的怪物编号'),
  113: named_tail('异常妊娠部位', 'CFLAG:113 = 异常妊娠部位'),
  ...fill(650, 657, (i) =>
    named(i === 650 ? 'NTR再捕获' : `NTR_${i}`, 'CFLAG:650～660 NTR 旗标'),
  ),

  // —— 角色生成段的跨域写（#170 cm_base/cm_virgin/cm_cloth；属主见
  //    ownership/cflag-ownership.yml）。全部用 named_tail：书写与发射都
  //    落在各域区块尾部——#174（EQUIP）并行补名时两张工单落点不相邻，
  //    合并面最小（named_tail 语义见其 JSDoc）。 ——
  11: named_tail('攻击力', 'CFLAG:11 = 攻撃力（weapon_restore 每日重算写入）'),
  12: named_tail('防御力', 'CFLAG:12 = 防御力（weapon_restore 每日重算写入）'),
  15: named_tail(
    '初体验对象',
    'CFLAG:15 初体験の相手のキャラ番号＋１（101 壺ワーム、102 触手生物、103 野良犬、104 モンスター、105 狂王）',
  ),
  16: named_tail(
    '初吻对象',
    'CFLAG:16 ファーストキスの相手のキャラ番号＋１（未経験は -1 初期化）',
  ),
  41: named_tail(
    '上衣类型',
    'CFLAG:41 上着のタイプ（类型名见 ere/page/page-clothtype.js 的 clothtype_text）',
  ),
  // 特别服装类型（42）属主 chara（ownership/cflag-ownership.yml "42"）——
  // aftertrain_cloth（train 域，ere/system/train/cloth.js）写它走
  // chara(cid).chara 门面（#215 J5）；与 41/45/46 同族但不同属主，
  // 落 chara-chara.js 的域区块
  42: named_tail(
    '特别服装类型',
    'CFLAG:42 特別コスチュームのタイプ（类型名见 ere/page/page-clothtype.js 的 clothtype_special_text）',
  ),
  45: named_tail(
    '上衣上状态',
    'CFLAG:45 上着上の状態（-3 破り取られている -2 汚物まみれ -1 没収 0 通常 1以上 洗濯中）',
  ),
  46: named_tail(
    '上衣下状态',
    'CFLAG:46 上着下の状態（-3 破り取られている -2 汚物まみれ -1 没収 0 通常 1以上 洗濯中）',
  ),
  // 胸罩状态（44）属主 stronghold（ownership/cflag-ownership.yml "44"：3 处
  // 写中据点侧 2）——COM111 撕胸罩的 CFLAG:44 = -3 是登记在册的跨域写
  // （跨域写登记在案），经 chara(cid).stronghold 门面（#71，
  // #228 J18 接入）。与 41/45/46 同族但属主不同，落 chara-stronghold.js
  44: named_tail(
    '胸罩状态',
    'CFLAG:44 ブラジャーの状態（-3 破り取られている -2 汚物まみれ -1 没収 0 通常 1以上 洗濯中）',
  ),
  120: named_tail('卖春积极性', 'CFLAG:120 売春への積極性'),
  // —— 迷宫凌辱的畏怖记忆（#182 H13 ryouzyoku：dungeon 域写、
  //    ownership/cflag-ownership.yml "130-131" owner: dungeon）——
  130: named(
    '凌辱畏怖记忆_怪物',
    'CFLAG:ARG:130 = LOCAL:1（被凌辱モンスターID記憶）',
  ),
  131: named(
    '凌辱畏怖计数',
    'CFLAG:ARG:131（凌辱畏怖記憶の回数；战斗按它做伤害减免/增伤）',
  ),
  501: named_tail('侵攻阶层', 'CFLAG:501 侵攻階層'),
  502: named_tail('侵攻度', 'CFLAG:502 侵攻度'),
  508: named_tail(
    '再起点',
    'CFLAG:508 再起ポイント（ダンジョン外で全回復するために必要。階層突破で増加）',
  ),
  520: named('目标阶层', 'CFLAG:520 目標階層'),
  // —— 装备枠（#174 H5）。553-559 全库无读写，无名字不进门面。用 named
  //    （非 named_tail）：tail 的用途是并行期把两张工单落点岔开，冲突已在
  //    rebase 解掉，这三条按序号正常入列。 ——
  550: named('武装', 'CFLAG:550～559 装備品枠——武装（存储编号）'),
  551: named('装饰', 'CFLAG:550～559 装備品枠——装飾（存储编号）'),
  552: named('装饰2', 'CFLAG:550～559 装備品枠——装飾2（存储编号）'),
  // —— 对人决斗的弹药（#470 Q13：invasion 域写、dungeon 域属主，
  //    ownership/cflag-ownership.yml "571" owner: dungeon）——
  571: named_tail(
    '弹药',
    'CFLAG:ATKER/DEFER:571 = 15（对人决斗弹药补充；对人格斗一族的弾薬消耗同族字段见 550-552 装备枠）',
  ),
  // —— 勇者来袭的跨域写（#171 H2 enter_enemy；named_tail 让这张工单与
  //    并行工单的产物落点不相邻，#170 先例）——
  6: named_tail('随机名编号', 'CFLAG:A:6 = RAND:80（ランダム名前決定）'),
  151: named_tail('善恶值', '善悪値調整（< -100 钳到 -100）'),
  580: named_tail(
    '所持金',
    '勇者所持金（城镇经济消费，enter_enemy 的初期加算同此下标）',
  ),
  582: named_tail(
    '借款',
    'CFLAG:582 = 現在の借金（マイナス）——勇者资产流程的第三槽',
  ),
  // —— 迷宫主循环与队伍编组的跨域写（#172 H3 run_dungeon/party_del；
  //    named_tail 落表尾，#170/#171 先例。50 属主 event（dungeon 文件写）、
  //    521 属主 invasion、601 属主 chara——三条都是跨域写必需的门面）——
  50: named_tail('贞操带钥匙', 'CFLAG:50 = 貞操帯のカギをダンジョンで見つけた'),
  521: named_tail(
    '存档点',
    'CFLAG:521 = セーブポイント（2015 补丁起兼作挫折阶层记忆，#103）',
  ),
  // #177（H8）起 500 有了写方（dungeon_room_build 的清指令）；属主 dungeon
  500: named_tail(
    '迷宫内行动',
    'CFLAG:500 = ダンジョン内行動(0:内職 1:売春 2:罠補充 3:施設拡張 4:潜入)',
  ),
  601: named_tail('结婚对象', 'CFLAG:601 = 結婚相手'),
  // —— 2D 地下城模式的跨域写（#181 H12 unit_move；named_tail 落表尾，
  //    #170-#172 先例。510/511 属主 event（dungeon 文件写）——2D 单位的
  //    格子位置，名字按旗标释文「X座標/Y座標」归一简体）——
  510: named_tail('X坐标', 'CFLAG:510 = X座標'),
  511: named_tail('Y坐标', 'CFLAG:511 = Y座標'),
  // #218（J8）补名：调教与服装跨域写
  10: named('调教回数', 'CFLAG:10 = 調教回数'),
  40: named_tail('着衣状态', 'CFLAG:40 = 着衣の状態'),
  61: named_tail('逆强暴', 'CFLAG:61 = 逆レイプ'),
  81: named_tail('蓄积润滑', 'CFLAG:81 = 蓄積潤滑'),
  82: named_tail('蓄积欲情', 'CFLAG:82 = 蓄積欲情'),
  666: named_tail('自动调教', 'CFLAG:666 = 自動調教'),
  667: named_tail('自动调教回数', 'CFLAG:667 = 自動調教回数'),
  // #232（J22 K1 自信家）：口上读穿环位域 / 奖赏请求 / 结婚爱情，跨域读走门面
  7: named_tail(
    '穿环状态',
    'CFLAG:7 = ピアスの装着状況（&1:乳首 &2:ヘソ &4:ラビア &8:クリトリス &16:舌 &32:唇 &64:鼻）',
  ),
  504: named_tail('要求奖赏', 'CFLAG:504 = 要求したご褒美'),
  602: named_tail('结婚爱情', 'CFLAG:602 = 結婚愛情'),
  606: named_tail('恋人', 'CFLAG:606 = 恋人（ere/dungeon/dungeon-lovers.js）'),
  607: named_tail(
    '恋人爱情',
    'CFLAG:607 = 恋人愛情（ere/dungeon/dungeon-lovers.js）',
  ),
  608: named_tail(
    '恋人名字',
    'CFLAG:608 = 恋人の名前（ere/dungeon/dungeon-lovers.js）',
  ),
  610: named_tail('恋人ID', 'CFLAG:610 = 恋人のID（キャラのときのみ）'),
  // #245（J35 K14 貴公子）：口上读性転換済（male→female 改造完成标志，
  // ere/page/page-shop-labo.js 的 CFLAG:T:70 = 1 写入；K14 全篇在
  // 「性転換済み」分支读它，随 TALENT:122 == 0 一起判性别转换后的女性身体）——
  // 跨域读走 chara(cid).stronghold 门面（owner stronghold，见
  // ownership/cflag-ownership.yml "70-71"）
  70: named_tail('已性转', 'CFLAG:70 = 性転換済（0:NO 1:YES)'),
  // #243（J33 K12 知的）：爱抚怀孕分支读父亲位（K12 口上
  //   `TALENT:153 && CFLAG:111 == 0` = 怀着主人之子），预产日一并具名供后续使用
  110: named_tail('预产日', 'CFLAG:110 = 出産予定日'),
  111: named_tail(
    '孩子父亲',
    'CFLAG:111 = 父親のキャラ番号（-1なら娼館の客, -2ならノラ犬, -3ならモンスターの子供, -4なら狂王）',
  ),
  // #391：角色信息页收藏切换（page-chara-info.js CASE 9）跨域读写属主为
  //   chara 的收藏位；拘束台解放（CASE 12）跨域清属主为 patch 的待处刑位
  //   （ownership/cflag-ownership.yml "700"/"777"）
  700: named_tail('收藏', 'CFLAG:700 = お気に入りフラグ'),
  777: named_tail('待处刑标签', 'CFLAG:777 = 待處刑標籤'),
  // #390：献祭完成分支把魔王之影的寿命置满
  //   （ere/page/page-chara-info-show.js 的 CFLAG:shadow:820 = 666666），属主
  //   chara（ownership/cflag-ownership.yml "820"：chara 1 / event 1）；
  //   同一分支的 CFLAG:1（invasion）与 FLAG:80（event）也一并改走门面
  820: named_tail('寿命', 'CFLAG:820 = 影の寿命'),
  // #398（N14 实验室）：处女膜再生済（ere/page/page-shop-labo.js 写
  //   `CFLAG:T:71 += 1`；消费按「再生过就不能再复原」）——属主 stronghold
  //   （ownership/cflag-ownership.yml "70-71"），落 chara-stronghold.js
  71: named_tail('处女膜已再生', 'CFLAG:71 = 処女膜再生済'),
  // #398（N14 实验室）：命名检查（既有写点之外，这张工单的 summon_slave
  //   也写它）——属主 chara（ownership/cflag-ownership.yml "420"）
  420: named_tail(
    '命名检查',
    'CFLAG:420 = 命名チェック(フラグON時はユーザー設定ネーム)',
  ),
  // #398（N14 实验室）：身体生成的体重与胸围（ere/chara/chara-body.js
  //   同款，这张工单的 modify_bustup 等三处按 char_size_generate 的返回值
  //   回写）——属主 chara（ownership/cflag-ownership.yml "450-459"，
  //   与 451/452 同段）
  453: named_tail('身高', 'CFLAG:453 = 身長'),
  454: named_tail('体重', 'CFLAG:454 = 体重'),
  455: named_tail('胸围', 'CFLAG:455 = B'),
  // #470（Q13 侵略残余）补齐同段三围尾：ere/invasion/invasion-arcana-fort.js
  //   胜利分支把 char_size_generate 的 RESULT:0-6 回写 CFLAG:451-457
  //   （GETBIT(FLAG:5,12)||GETBIT(FLAG:5,15) 检查内），453/456/457 与
  //   454/455 同缺访问器
  456: named_tail('腰围', 'CFLAG:456 = W'),
  457: named_tail('臀围', 'CFLAG:457 = H'),
  // #399：异界勇者召唤的成交标记（chara_sim_shop 的唯一一次写，
  //   属主 stronghold——ownership/cflag-ownership.yml "999"；全库无读者）
  999: named('异界召唤标记', 'chara_sim_shop 成交后置 1，仅此一处写'),
};

// —— FLAG：一维按域重切（ownership 82 个下标）——

const flag = {
  0: named('休息', 'FLAG:0 休憩'),
  1: named('上次调教对象', 'FLAG:1'),
  2: named('上次助手', 'FLAG:2'),
  5: named('游戏设定', 'FLAG:5 ビット演算'),
  7: named('口上开关', 'FLAG:7 口上显示/频率'),
  9: named('税金修正', 'FLAG:9'),
  22: named('录像开始状况', 'FLAG:22'),
  25: named('指令过滤', 'FLAG:25'),
  26: named('种族年龄设定_0', 'FLAG:26～27'),
  27: named('种族年龄设定_1', 'FLAG:26～27'),
  30: named('爱或淫乱人数', 'FLAG:30'),
  31: named('杀死人数', 'FLAG:31'),
  32: named('爱之奴隶所生', 'FLAG:32'),
  33: named('技巧素质道具数', 'FLAG:33'),
  35: named('濒死自动结束调教', 'FLAG:35'),
  36: named('显示模式', 'FLAG:36'),
  37: named('着衣系统', 'FLAG:37'),

  60: named('勇者基础等级修正', 'FLAG:60'),
  61: named('每日香料购买数', 'FLAG:61'),
  62: named('肉便器行动', 'FLAG:62'),
  63: named('肉便器常识改写', 'FLAG:63'),
  64: named('肉便器侍奉对象', 'FLAG:64'),
  71: named('自由调教跳转', 'FLAG:71'),
  76: named('外来勇者等级上限', 'FLAG:76'),
  80: named('处刑勇者数', 'FLAG:80'),
  81: named('人间界侵攻度', 'FLAG:81'),
  82: named('人间界征服完了', 'FLAG:82'),
  83: named('肉便器数', 'FLAG:83'),
  84: named('装饰品数', 'FLAG:84'),
  85: named('陷阱等级', 'FLAG:85'),
  86: named('精灵领域侵攻度', 'FLAG:86'),
  87: named('精灵领域征服完了', 'FLAG:87'),
  88: named('龙山侵攻度', 'FLAG:88'),
  89: named('龙山征服完了', 'FLAG:89'),
  90: named('天界侵攻度', 'FLAG:90'),
  91: named('天界征服完了', 'FLAG:91'),
  92: named('亲卫队砦侵攻度', 'FLAG:92'),
  93: named('人间界侵攻事件', 'FLAG:93'),

  ...fill(100, 115, (i) =>
    named(`口上存在_${i - 100}`, 'FLAG:1xx 口上文件存在判定'),
  ),
  119: named('口上存在_19', 'FLAG:1xx'),
  223: named('勇者入场_23', 'FLAG:200～ 勇者入场旗标'),
  224: named('勇者入场_24', 'FLAG:200～'),
  400: named('活动迷宫', 'FLAG:400 イベントダンジョン'),
  500: named('狂王性别', 'FLAG:500'),
  501: named('初期奴隶类型', 'FLAG:501'),
  502: named('迷宫模式', 'FLAG:502'),
  550: named('指令菜单长度', 'FLAG:550 菜单の長さ'),
  600: named('石像数', 'FLAG:600'),
  601: named('剥制数', 'FLAG:601'),
  602: named('蜡像数', 'FLAG:602'),
  603: named('人偶数_服装', 'FLAG:603'),
  604: named('人偶数_球形关节', 'FLAG:604'),
  605: named('金属像数', 'FLAG:605'),
  606: named('冰像数', 'FLAG:606'),
  607: named('金属像数_2', 'FLAG:607 文档重名'),
  608: named('家具数', 'FLAG:608'),
  609: named('绘画数', 'FLAG:609'),
  611: named('喷水像_石', 'FLAG:611'),
  612: named('喷水像_金属', 'FLAG:612'),
  613: named('人间牧场竿役', 'FLAG:613'),
};

// —— TFLAG：一维按域重切（ownership 248 个下标）——

const tflag_named = {
  0: named('口中射精', 'TFLAG:0'),
  1: named('手中射精', 'TFLAG:1'),
  2: named('性交射精', 'TFLAG:2'),
  3: named('处女丧失', 'TFLAG:3'),
  4: named('接吻射精', 'TFLAG:4'),
  5: named('舔阴射精', 'TFLAG:5'),
  6: named('助手射精', 'TFLAG:6'),
  7: named('主人犯助手射精', 'TFLAG:7'),
  8: named('口交射精后', 'TFLAG:8'),
  9: named('股间射精', 'TFLAG:9'),
  10: named('对象射精', 'TFLAG:10'),
  11: named('对象喷乳', 'TFLAG:11'),
  12: named('逆强奸射精', 'TFLAG:12'),
  13: named('初吻与自我口上', 'TFLAG:13'),
  14: named('近亲与自我口上', 'TFLAG:14'),
  15: named('怪物射精或购入金', 'TFLAG:15'),
  16: named('犬射精或处刑口上', 'TFLAG:16'),
  17: named('童贞丧失_未使用', 'TFLAG:17 未使用'),
  18: named('足交射精或处遇口上', 'TFLAG:18'),
  19: named('伴V经验指令', 'TFLAG:19'),
  20: named('主人导致处女丧失', 'TFLAG:20'),
  21: named('反抗刻印变动', 'TFLAG:21'),
  22: named('苦痛刻印变动', 'TFLAG:22'),
  23: named('快乐刻印变动', 'TFLAG:23'),
  24: named('屈服刻印变动', 'TFLAG:24'),
  25: named('压抑抵抗消灭', 'TFLAG:25'),
  26: named('侍奉快乐经验', 'TFLAG:26'),
  27: named('被虐快乐经验', 'TFLAG:27'),
  28: named('A快乐经验', 'TFLAG:28'),
  29: named('绝顶强度', 'TFLAG:29'),
  30: named('主人经验', 'TFLAG:30'),
  31: named('本次调教处女丧失', 'TFLAG:31'),
  32: named('录像内容', 'TFLAG:32 亦为自我口上旗标'),

  34: named('死亡时在录像', 'TFLAG:34'),
  35: named('榨乳中', 'TFLAG:35'),
  38: named('对象膣内射精', 'TFLAG:38'),
  40: named('三人PLAY主人部位', 'TFLAG:40'),
  41: named('三人PLAY助手部位', 'TFLAG:41'),
  42: named('三人PLAY持续', 'TFLAG:42'),
  45: named('下装穿不上', 'TFLAG:45'),
  50: named('上次调教者是助手', 'TFLAG:50'),
  ...fill(51, 57, (i) =>
    named(`珠结算_${i - 51}`, 'TFLAG:51～58（juel_check_main 的珠结算）'),
  ),
  58: named('珠结算_7', 'TFLAG:51～58'),
  59: named('前前回指令', 'TFLAG:59'),
  60: named('插着不拔', 'TFLAG:60'),
  70: named('录像次数', 'TFLAG:70'),
  100: named('快乐经验', 'TFLAG:100'),
  101: named('召唤暂存_1', 'TFLAG:100～103 召唤暂存'),
  102: named('召唤暂存_2', 'TFLAG:100～103'),
  110: named('精爱味觉', 'TFLAG:110'),
  120: named('V虫产卵', 'TFLAG:120'),
  121: named('A虫产卵', 'TFLAG:121'),
  150: named('反抗刻印回避', 'TFLAG:150'),
  200: named('屈服刻印结算', 'TFLAG:200'),
  204: named(
    '当前选择的调教指令编号',
    'TFLAG:204 主に現在選択している調教指令番号の一時的な保存',
  ),
  224: named('索求口上抑制', 'TFLAG:224 おねだり口上抑制フラグ'),
  400: named('死斗场敌种', 'TFLAG:400'),
  401: named('死斗场陷落', 'TFLAG:401'),
  402: named('死斗场收入', 'TFLAG:402'),
  500: named('博物馆口上', 'TFLAG:500'),
  510: named('流放口上', 'TFLAG:510'),
  520: named('公开处刑口上', 'TFLAG:520'),
  530: named('猎奇处刑口上', 'TFLAG:530'),
  860: named('失神口上开关', 'TFLAG:860'),
  ...fill(864, 898, (i) => named(`失神_${i}`, 'TFLAG:864～899 失神补丁')),
  899: named('失神', 'TFLAG:899'),
  999: named('清屏锚点', 'yml/TFlag.yml 头注'),
};

const tflag = tflag_named;

// —— ITEM / GLOBAL ——

const item = {
  24: named('安全套', 'yml/Item.yml id 24'),
  25: named('润滑液', 'yml/Item.yml id 25'),
  26: named('媚药', 'yml/Item.yml id 26'),
  27: named('利尿剂', 'yml/Item.yml id 27'),
  28: named('水晶球魔力源', 'yml/Item.yml id 28'),
  34: named('穿孔工具', 'yml/Item.yml id 34'),
  35: named('观战卷', 'yml/Item.yml id 35'),
  90: named('触手生物', 'yml/Item.yml id 90'),
  171: named('无头骑士', 'yml/Item.yml id 171'),
  172: named('吸血鬼', 'yml/Item.yml id 172'),
  300: named('装饰戒指', 'yml/Item.yml id 300'),
};

// —— GLOBAL ——
// 98（联系方式开关）与 99（致辞折叠开关）已随标题画面两段删除（#642），
// 暂无已命名下标；后续全局变量随工单按 named/named_tail 补入。
const global = {};
// —— MARK：只收 yml 缺口（#90）——
// Mark.yml 列名覆盖 0-3/10；mark:4 没有列名可引，语义从 mark_got_check
// （ere/event/source-check.js）的用法读出：与 MARK:3 同值连写、只升不降
// （`MARK:4 <= N` 是取得门限），即反抗刻印的历史最高档，防降档后重取低级刻印。

const mark = {
  4: named(
    '反抗刻印履历',
    'MARK:4 取得门限，与 MARK:3 同值连写（Mark.yml 无此列，人工命名）',
  ),
};

const cstr = {
  // 故事名：仅存档界面读写（ere/page/page-save-load.js 的 set_story_name
  // 与 build_save_info），属主 system（ownership/cstr-ownership.yml "99"）。
  // **不得**随本表同步进 yml/CStr.yml——登记进引擎名字表的下标会被
  // addCharacter 的 initCharaTable 预置 0，行为随之改变（#136 简报事实 3）；
  // 门面命名是代码层动作，不碰 yml。
  99: named('故事名', 'set_story_name 读写（32 字符上限）'),
  // 加入时名字：角色加入即把预设名抄进 CSTR:1 是全库固定做法（ADDCHARA 后
  // CSTR:1 = %NAME:A%），#171 H2 的 k_11_lily/k_34_crazylord 沿用；
  // 不进 yml/CStr.yml 的理由同上（预置 0 会顶掉字符串空值语义）
  1: named_tail('加入时名字', 'CSTR:A:1 = %NAME:A%'),
  2: named_tail('孩子父亲名字', 'CSTR:2 = 孩子父亲的名字'),
  // 初体验对象名：破处时把对象名抄进 CSTR:3（经验一览页读它显示）。属主
  // train（ownership/cstr-ownership.yml "3-4"）；不进 yml/CStr.yml 的理由同上。
  3: named_tail('初体验对象名', 'CSTR:(ARG:1):3 = %SAVESTR:(ARG:0)%'),
  // 初吻对象名：口上里把对象名抄进 CSTR:4（如 K8 简易助手三人关系初吻
  // 分支；ere/page/page-info-exp.js 读它显示）。属主 train
  // （ownership/cstr-ownership.yml "3-4"）；不进 yml/CStr.yml 的理由同上。
  4: named_tail('初吻对象名', 'CSTR:TARGET:4 = %SAVESTR:ASSI%'),
  // 家人末路：售出成熟角色后，把结局称号与角色名写给检索到的家人。
  // 属主 event（ownership/cstr-ownership.yml "5"）；stronghold 必须经门面写。
  5: named_tail(
    '家人末路',
    'CSTR:(FAMILY:2):5 = %MATURO%%SAVESTR:TARGET%（K2 同构）',
  ),
  // 录像标题：出售成功时生成，日程收益与录像书架读取。属主 stronghold。
  6: named_tail('录像标题', 'CSTR:6 = %LOCALS%'),
  // 自由局部调教的项目名（#398 ere/page/page-shop-labo.js 的
  // `CSTR:LOCAL:7 = %RESULTS%`；调教侧按它显示自由指令）。属主 stronghold
  // （ownership/cstr-ownership.yml "6-7"，与 6 同段）
  7: named_tail('自由调教内容', 'CSTR:7 = フリー調教箇所'),
};

// —— DELTA：UP/DOWN 的 ere 等价物（移植自建，#90）——
// 名字 = Palam.yml 同下标列名 +「增量」——审校者对着 source_check_up_*
// （ere/event/source-check.js）的 `UP:N += …` 与 palam 面板行就能确认。
// UP/DOWN 没有列名可引。

const src_delta = (i) => `UP:${i}（UP/DOWN→delta，CONTEXT.md 变量族）`;

const delta = {
  0: named('阴核增量', src_delta(0)),
  1: named('私处增量', src_delta(1)),
  2: named('肛门增量', src_delta(2)),
  3: named('润滑增量', src_delta(3)),
  4: named('恭顺增量', src_delta(4)),
  5: named('欲情增量', src_delta(5)),
  6: named('屈服增量', src_delta(6)),
  7: named('习得增量', src_delta(7)),
  8: named('耻情增量', src_delta(8)),
  9: named('苦痛增量', src_delta(9)),
  10: named('恐怖增量', src_delta(10)),
  11: named('反感增量', src_delta(11)),
  12: named('不快增量', src_delta(12)),
  13: named('抑郁增量', src_delta(13)),
  14: named('乳房增量', src_delta(14)),
  15: named('局部增量', src_delta(15)),
};

// —— DELTABASE：LOSEBASE 的 ere 等价物，存负值（移植自建，#90）——
// Base.yml 列名（体力/气力）+「损耗」；getter 返回的是负数（com0 写
// -5/-50），正数语义由读方换号（source-check 的 lose() 即此）。

const src_losebase = (i) =>
  `LOSEBASE:${i}（LOSEBASE→deltabase 存负值，CONTEXT.md 变量族）`;

const deltabase = {
  0: named('体力损耗', src_losebase(0)),
  1: named('气力损耗', src_losebase(1)),
};

// —— TEQUIP：调教中的装备位（#215 J5 建模；属主见
//    ownership/tequip-ownership.yml 的 12 个区间）。TEquip.yml 保持空表
//    （引擎建桶用；登记名字表会让 initCharaTable 预置 0，见该文件头注），
//    名字只进本表。只名七个：跨域三段（22 属 system、35 属 event、36 属
//    train——各自的跨域调用点写它都必须走门面，#461 补 36）与 #213 口上
//    头部检查消费的四位（45/55/89/90，train 域内——该族工单写它时可直写
//    也可走门面，具名是给可读性）。
//    其余属主下标随各自族工单补名（#71 结论三：未命名不进门面）。——
const tequip = {
  18: named_tail('淋浴中', 'TEQUIP:18 シャワー使用中'),
  21: named_tail('媚药效果', 'TEQUIP:21 しあわせ草'),
  22: named_tail(
    '利尿剂',
    'TEQUIP:22 利尿剤（属主 system：com52/com85 的 train 跨域写走本门面）',
  ),
  35: named_tail(
    '主人避孕套',
    'TEQUIP:35 マスターがコンドーム装着（属主 event：source-check 与 com-condom 的跨域写走本门面）',
  ),
  36: named_tail(
    '助手避孕套',
    'TEQUIP:36 助手がコンドーム装着（属主 train：source-check 的 event 跨域写走本门面，#461）',
  ),
  37: named_tail(
    '对象避孕套',
    'TEQUIP:37 調教対象がコンドーム装着（属主 train：source-check 的 system 跨域清零）',
  ),
  45: named_tail('口塞', 'TEQUIP:45 ボールギャグ装着'),
  53: named_tail('录像摄影', 'TEQUIP:53 ビデオ撮影'),
  54: named_tail('野外PLAY', 'TEQUIP:54 野外プレイ'),
  55: named_tail('死斗场', 'TEQUIP:55 コロシアム'),
  57: named_tail('羞耻PLAY', 'TEQUIP:57 羞恥プレイ'),
  58: named_tail('浴室PLAY', 'TEQUIP:58 お風呂場プレイ'),
  59: named_tail('新妻PLAY', 'TEQUIP:59 新妻プレイ'),
  89: named_tail('兽奸', 'TEQUIP:89 獣姦プレイ'),
  90: named_tail('触手', 'TEQUIP:90 触手調教'),
};

// —— EX：绝顶计数（#216 J6 进门面；ex/nowex 共用一张名字表——引擎寻址层
//    case"nowex" → staticData.ex，yml/Ex.yml 空表故名字走本表，同 tequip
//    先例）。只名一个：EX:5 射精·喷乳（com_ejac_player_milk 的
//    EX:PLAYER:5 += 1，属主 system——train 侧写它必须走门面）。
//    其余下标随各自工单补名（#71 结论三：未命名不进门面）。 ——
const ex = {
  5: named(
    '喷乳绝顶',
    'EX:5 射精·喷乳（com_ejac_player_milk 的 EX:PLAYER:5 += 1）',
  ),
  6: named('普通射精绝顶', 'target_ejac_check 通常の射精'),
};

const stain = {
  2: named('阴茎污渍', 'STAIN:2 = ペニス'),
  3: named('阴道污渍', 'STAIN:3 = ヴァギナ'),
  5: named('胸部污渍', 'STAIN:5 = 胸'),
};

// —— 移植自建表的属主声明（#90 结论，依据见 issue #90）——
// 这些表是 ere 自建（UP/DOWN、LOSEBASE 没有可对照的外部来源），测量不出
// 属主，只能人定；与名字同处声明，因为两者都是「测不出来、人工定」的
// 决定。delta/deltabase 归 train：生命周期与 tflag 一致——回合内有效、由
// 调教结算写入（source-check 累加）、回合末由调教结算消费清零（ere 侧
// palam_up_check 当场结算 + 引擎 nextTurnInTrain 保底处理）。
// portcflag 同机制适用，但暂不声明属主：当前唯一字段「数据版本」由
// ere/chara/chara-portcflag.js 的 init_portcflag 在角色加入点写入，单字段
// 门面只是搬家、起不到统一写点的作用；第二个字段进来时随字段语义在此声明
// （ADR-0001 的「宁宽勿新」意味着 portcflag 会长出多域字段，属主随字段定，
// 非一表一主）。
const PORT_TABLE_OWNERS = {
  delta: 'train',
  deltabase: 'train',
};

const NAMES = {
  cflag,
  ex,
  flag,
  tflag,
  item,
  global,
  mark,
  cstr,
  tequip,
  stain,
  delta,
  deltabase,
};

/** 合法访问器名：中文或英文 snake_case，可含数字下划线 */
const NAME_RE = /^[A-Za-z\u4e00-\u9fff][A-Za-z0-9_\u4e00-\u9fff]*$/;

function validate_names() {
  const problems = [];
  for (const [table, entries] of Object.entries(NAMES)) {
    const seen = new Map();
    for (const [index, entry] of Object.entries(entries)) {
      if (!entry?.name || !entry?.note) {
        problems.push(`${table}:${index} 缺 name/note`);
        continue;
      }
      if (!NAME_RE.test(entry.name)) {
        problems.push(`${table}:${index} 非法标识符「${entry.name}」`);
      }
      if (seen.has(entry.name)) {
        problems.push(
          `${table} 重名「${entry.name}」：${seen.get(entry.name)} 与 ${index}`,
        );
      } else {
        seen.set(entry.name, index);
      }
    }
  }
  if (problems.length > 0) {
    throw new Error(`命名表损坏：\n  ${problems.join('\n  ')}`);
  }
}

validate_names();

function get_name(table, index) {
  const entry = NAMES[table]?.[index];
  if (!entry) {
    return undefined;
  }
  return entry;
}

module.exports = {
  NAME_RE,
  NAMES,
  PORT_TABLE_OWNERS,
  get_name,
  validate_names,
};
