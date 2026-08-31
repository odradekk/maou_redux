/**
 * @file 门面字段命名表（issue #71；#90 起与 yml/ 名字表合流）：所有权切片
 * 之后，每个下标的中文访问器名与原作出处。手维护的输入数据，生成器只读。
 *
 * 判据：审校者手边摊着 ERB，能不能一眼确认生成码对不对。因此：
 *   - 字段名用中文（对得上 ERB 注释与指令名表），不是英文 snake_case；
 *   - 每个名字带出处（模板 / 旗标一览 / 角色口上文件行号）；
 *   - 未收录的属主下标不进门面（ownership 仍完整登记）。生成器跳过并按域
 *     报告跳过清单，绝不静默用数字当名字，也不预填 `tflag_N`。
 *
 * 两源合流（#90 裁定，依据见 issue #90）：talent/source/abl/palam/mark/exp
 * 六张表的名字以 `yml/` 列名（引擎名字表，#43 转出、#60 归一简体）为唯一
 * 真相，生成器直接读 yml——本文件对这六张表**只收 yml 没有的缺口**（如
 * mark:4）或名字一致时的更精出处；同一下标两源名字不一致，生成器报错，
 * 宁可红也不静默择一。cflag/tflag/item/global 的 yml 表是空表（引擎建桶
 * 用、无列名），名字仍全部来自本文件。
 *
 * 移植自建表（delta/deltabase）没有 yml 表也没有 ownership/ 产物（target/
 * 侧无源、测不出属主），名字与属主都在本文件声明，见 PORT_TABLE_OWNERS。
 *
 * 表键 = 引擎表名小写；内层键 = 数字下标。
 */

'use strict';

const SRC_FLAG = 'target/資料_非必要無須解壓/eramaouフラグまとめ.txt';
const SRC_KXX = 'target/資料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB';
const SRC_TRAIN =
  'yml/TrainCommand.yml（指令名）+ target/資料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB 注释';
const SRC_ERB = 'target/ERB';

function src(path, extra) {
  return extra ? `${path} ${extra}` : path;
}

function fill(start, end, make) {
  const out = {};
  for (let i = start; i <= end; i += 1) {
    out[i] = make(i);
  }
  return out;
}

function named(name, source) {
  return { name, source };
}

/**
 * 尾部条目：除 name/source 外带 tail 标志，生成器（gen-facade.js
 * entries_for 的稳定分区）把它排在同域同表既有条目**之后**发射。用途：
 * 并行票各自补名时，让后加的字段落在域区块尾部——两票在生成产物上的
 * 落点不相邻，合并面最小（#170 与 #174 同改本表的先例）。既有条目
 * 一律继续用 named，不要回头改写成 named_tail。
 */
function named_tail(name, source) {
  return { name, source, tail: true };
}

function erb(rel, extra) {
  return src(`${SRC_ERB}/${rel}`, extra);
}

// —— CFLAG：口上域切片（ownership 属主 kojo 的 110 个下标）——
// cflag 的 yml 表是空表（引擎建桶用），名字只能手收。#90 起属主 kojo 之外
// 的域也按补名逐个进门面（其余属主下标仍跳过并报告，随各自子系统票）。

const cflag = {
  // —— 低位共享状态（#114 回合结算接入；各下标属主见 ownership/cflag-ownership.yml）——
  1: named(
    '状态',
    src(
      SRC_FLAG,
      'CFLAG:1 キャラの状態 0=調教中 1=待機 2=侵攻中 3=迎撃中 4=死亡 12=戦役（SYSTEM ver1.0.3.ERB の CFLAG:A:1 == 12）',
    ),
  ),
  2: named('好感度', src(SRC_FLAG, ':261 CFLAG:2 主人による調教経験(好感度)')),
  4: named(
    '灌肠经验',
    src(SRC_FLAG, 'CFLAG:4 浣腸経験（1=経験済み、2=ビデオ撮影済み）'),
  ),
  5: named_tail('野外露出经验', src(SRC_FLAG, 'CFLAG:5 野外露出経験')),
  31: named_tail('媚药残留度', src(SRC_FLAG, 'CFLAG:31 体内媚薬残留度')),
  32: named_tail(
    '媚药禁断症状',
    src(SRC_FLAG, 'CFLAG:32 媚薬中毒の禁断症状判定'),
  ),
  491: named_tail('录像时间', src(SRC_FLAG, 'CFLAG:491 撮影時間')),
  499: named_tail('水晶球充能次数', src(SRC_FLAG, 'CFLAG:499 水晶球充能回数')),
  9: named(
    '等级',
    src(SRC_FLAG, 'CFLAG:9 レベル（LVUP.ERB の CFLAG:(ARG:0):9）'),
  ),
  13: named('基础攻击', src(SRC_FLAG, 'CFLAG:13 基礎攻撃力')),
  14: named('基础防御', src(SRC_FLAG, 'CFLAG:14 基礎防御力')),
  109: named(
    '排卵诱发剂',
    src(SRC_FLAG, 'CFLAG:109 排卵促進剤の使用の有無（日程推进的效果消去写 0）'),
  ),
  101: named_tail(
    '主人膣内射精',
    src(
      SRC_FLAG,
      ':317 CFLAG:101 マスターによる膣内射精カウント用（SYSTEM_SOURCE.ERB:442/454/467）',
    ),
  ),
  103: named_tail(
    '助手膣内射精',
    src(
      SRC_FLAG,
      ':319 CFLAG:103 助手から奴隷への膣内射精カウント用（SYSTEM_SOURCE.ERB:439/448）',
    ),
  ),
  104: named_tail(
    '对象膣内射精',
    src(
      SRC_FLAG,
      ':320 CFLAG:104 奴隷から助手への膣内射精カウント用（SYSTEM_SOURCE.ERB:461/464/470）',
    ),
  ),
  106: named_tail(
    '犬膣内射精',
    src(
      SRC_FLAG,
      ':322 CFLAG:106 ノラ犬からの中田氏カウント用（SYSTEM_SOURCE.ERB:445）',
    ),
  ),
  107: named_tail(
    '怪物膣内射精',
    src(
      SRC_FLAG,
      ':323 CFLAG:107 モンスター・触手から奴隷への膣内射精カウント用（SYSTEM_SOURCE.ERB:451/457）',
    ),
  ),
  21: named('肉亲_0', src(SRC_FLAG, 'CFLAG:21～25 肉亲关系')),
  201: named('初调教', src(SRC_KXX, ':57 初调教时')),
  202: named('简易助手_0', src(SRC_KXX, ':123 简易助手口上 CFLAG:202～210')),
  203: named('简易助手_1', src(SRC_KXX, ':123')),
  204: named('简易助手_2', src(SRC_KXX, ':123')),
  214: named(
    '首次C绝顶_K14',
    erb('口上/EVENT_K14_貴公子.ERB', '初めてC絶頂 CFLAG:214'),
  ),
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
      i === 230
        ? erb('口上/EVENT_K3_高貴.ERB', '寄生 CFLAG:230')
        : src(SRC_KXX, `:4076 参数变动时 CFLAG:221～260；${labels[i]}`);
    return named(labels[i], where);
  }),
  261: named('调教后自慰', src(SRC_KXX, ':4327')),
  262: named('百合PLAY', src(SRC_KXX, ':4362 レズプレイ')),
  263: named('朝口交', src(SRC_KXX, ':4389')),
  264: named('调教后性交', src(SRC_KXX, ':4412')),
  265: named('夜袭', src(SRC_KXX, ':4427')),
  271: named('妊娠发觉', src(SRC_KXX, ':4457')),
  272: named('生产', src(SRC_KXX, ':4477')),
  273: named('育儿室', src(SRC_KXX, ':4497')),
  274: named('亲离', src(SRC_KXX, ':4511')),
  297: named('苦痛刻印Lv3', src(SRC_KXX, ':4270')),
  298: named('快乐刻印Lv3', src(SRC_KXX, ':4283')),
  299: named('屈服刻印Lv3', src(SRC_KXX, ':4296')),
  300: named('反抗刻印Lv3', src(SRC_KXX, ':4309')),
  // 301～348 = 调教中各指令口上。映射以模板注释为准，不是 301+指令编号
  // （穿环是 348 不是 301+87；淋浴 18 号指令在口上域无写入、不下表）。
  301: named('爱抚', src(SRC_TRAIN, ':340')),
  302: named('舔阴', src(SRC_TRAIN, ':382')),
  303: named('肛门爱抚', src(SRC_TRAIN, ':420')),
  304: named('自慰', src(SRC_TRAIN, ':461')),
  305: named(
    '口交_主',
    erb('口上/EVENT_K10_クラブ.ERB', '口交 CFLAG:305（指令 4）'),
  ),
  306: named('胸爱抚', src(SRC_TRAIN, ':543')),
  307: named('接吻', src(SRC_TRAIN, ':581')),
  308: named('自己扒开', src(SRC_TRAIN, ':636')),
  309: named('插入手指', src(SRC_TRAIN, ':677')),
  310: named('舔肛', src(SRC_TRAIN, ':718')),
  311: named('振动宝石', src(SRC_TRAIN, ':759')),
  312: named('壶虫', src(SRC_TRAIN, ':800')),
  313: named('振动杖', src(SRC_TRAIN, ':873')),
  314: named('肛门虫', src(SRC_TRAIN, ':914')),
  315: named('阴蒂夹', src(SRC_TRAIN, ':984')),
  316: named('乳头夹', src(SRC_TRAIN, ':1038')),
  317: named('榨乳器', src(SRC_TRAIN, ':1092')),
  318: named('飞机杯', src(SRC_TRAIN, ':1146')),
  320: named('肛珠', src(SRC_TRAIN, ':1200')),
  321: named('正常位', src(SRC_TRAIN, ':1270')),
  322: named('背后位', src(SRC_TRAIN, ':1329')),
  323: named('对面座位', src(SRC_TRAIN, ':1403')),
  324: named('背面座位', src(SRC_TRAIN, ':1474')),
  325: named(
    '逆强奸',
    erb('口上/EVENT_K3_高貴.ERB', '逆强奸 CFLAG:325（指令 24）'),
  ),
  326: named(
    '逆肛门强奸',
    erb('口上/EVENT_K10_クラブ.ERB', '逆肛门强奸 CFLAG:326'),
  ),
  327: named('正常位肛交', src(SRC_TRAIN, ':1545')),
  328: named('背后位肛交', src(SRC_TRAIN, ':1604')),
  329: named('对面座位肛交', src(SRC_TRAIN, ':1649')),
  330: named('背面座位肛交', src(SRC_TRAIN, ':1708')),
  331: named('手淫', src(SRC_TRAIN, ':1765')),
  332: named('口交_奴', src(SRC_TRAIN, ':1821')),
  333: named('乳交', src(SRC_TRAIN, ':1871')),
  334: named('股间性交', src(SRC_TRAIN, ':1927')),
  335: named('骑乘位', src(SRC_TRAIN, ':1974')),
  336: named('全身擦洗', src(SRC_TRAIN, ':2059')),
  337: named('骑乘位肛交', src(SRC_TRAIN, ':2097')),
  338: named('肛门侍奉', src(SRC_TRAIN, ':2154')),
  339: named(
    '足交',
    erb('口上/EVENT_K3_高貴.ERB', '足交 CFLAG:339（指令 38）'),
  ),
  341: named('打屁股', src(SRC_TRAIN, ':2192')),
  342: named('鞭', src(SRC_TRAIN, ':2226')),
  343: named('针', src(SRC_TRAIN, ':2283')),
  344: named('眼罩', src(SRC_TRAIN, ':2340')),
  345: named('绳子', src(SRC_TRAIN, ':2414')),
  346: named('口塞', src(SRC_TRAIN, ':2488')),
  347: named('灌肠肛塞', src(SRC_TRAIN, ':2562')),
  348: named('穿环', src(SRC_TRAIN, ':3017')),
  356: named('放置PLAY', src(SRC_TRAIN, ':2612 何もしない')),
  357: named('交谈', src(SRC_TRAIN, ':2646')),
  360: named('乳夹口交', src(SRC_TRAIN, ':2714')),
  361: named('口交时自慰', src(SRC_TRAIN, ':2757')),
  362: named('手搓口交', src(SRC_TRAIN, ':2801')),
  363: named('真空口交', src(SRC_TRAIN, ':2845')),
  364: named('六九式', src(SRC_TRAIN, ':2888')),
  365: named('深喉', src(SRC_TRAIN, ':2932')),
  366: named(
    '侵犯助手',
    erb('口上/EVENT_K11_リリィ.ERB', '助手を犯させる CFLAG:366'),
  ),
  367: named(
    '双人口交',
    erb('口上/EVENT_K11_リリィ.ERB', '二本フェラ CFLAG:367'),
  ),
  369: named(
    '双人侍奉口交',
    erb('口上/EVENT_K11_リリィ.ERB', 'ダブルフェラ CFLAG:369'),
  ),
  370: named('魔族化', erb('口上/EVENT_K7_ハート.ERB', '等 魔族化 CFLAG:370')),
  372: named('壶虫着脱', src(SRC_KXX, ':14 壶虫 CFLAG:312　CFLAG:372')),
  374: named('肛门虫着脱', src(SRC_KXX, ':15')),
  375: named('阴蒂夹着脱', src(SRC_KXX, ':16')),
  376: named('乳头夹着脱', src(SRC_KXX, ':17')),
  377: named('榨乳器着脱', src(SRC_KXX, ':18')),
  378: named('飞机杯着脱', src(SRC_KXX, ':19')),
  379: named('肛珠着脱', src(SRC_KXX, ':20')),
  380: named('眼罩着脱', src(SRC_KXX, ':21')),
  381: named('强制口交', src(SRC_TRAIN, ':2976')),
  385: named('绳子着脱', src(SRC_KXX, ':22')),
  386: named('口塞着脱', src(SRC_KXX, ':23')),
  387: named(
    '灌肠肛塞着脱',
    erb('口上/EVENT_K3_高貴.ERB', '灌肠+肛塞 CFLAG:387'),
  ),
  391: named('三人PLAY', erb('口上/EVENT_K11_リリィ.ERB', '3P CFLAG:391')),
  400: named(
    '魔族化_K11',
    erb('口上/EVENT_K11_リリィ.ERB', '魔族化 CFLAG:400'),
  ),
  444: named('兽奸眼罩', src(SRC_FLAG, 'CFLAG:444 獣姦アイマスク时口上')),
  451: named(
    '年龄',
    src(SRC_FLAG, 'CFLAG:451 年齢（人間換算，HUMAN_AGE_GENERATE の結果）'),
  ),
  452: named(
    '种族年龄',
    src(SRC_FLAG, 'CFLAG:452 種族年齢（月替わりの年齢加算はこちら）'),
  ),
  503: named(
    '休憩',
    // SYSTEM ver1.0.3.ERB 带空格的文件名进不了门面出处注释（gen-facade 测试
    // 的路径 token 以空白断词），出处落旗标一览：CFLAG:503 在该表即「フラグ」，
    // 消费点是回合结算的休憩判定（&1 时回复翻倍、消费 -1）
    src(SRC_FLAG, 'CFLAG:503 フラグ（回合结算的休憩判定消费）'),
  ),
  506: named('新人', src(SRC_FLAG, 'CFLAG:506 新人フラグ')),
  507: named('回城标志', src(SRC_FLAG, 'CFLAG:507 街まで帰還フラグ')),
  534: named('已接任务', src(SRC_FLAG, 'CFLAG:534 受注クエスト')),
  570: named(
    '从属怪物',
    src(SRC_FLAG, 'CFLAG:570 従属モンスター（使役パートナーの NO）'),
  ),
  102: named(
    '妊娠相手',
    src(
      SRC_FLAG,
      ':318 CFLAG:102 = 誰によって妊娠させられたか（マスター=1, 助手=2, 奴隷=3, 客=4, 犬=5, モンスター・触手=6, 狂王=7）',
    ),
  ),
  ...fill(650, 657, (i) =>
    named(
      i === 650 ? 'NTR再捕获' : `NTR_${i}`,
      src(SRC_FLAG, 'CFLAG:650～660 NTR 旗标'),
    ),
  ),

  // —— 角色生成段的跨域写（#170 @CM_BASE/@CM_VIRGIN/@CM_CLOTH；属主见
  //    ownership/cflag-ownership.yml）。全部用 named_tail：书写与发射都
  //    落在各域区块尾部——#174（EQUIP）并行补名时两票落点不相邻，
  //    合并面最小（named_tail 语义见其 JSDoc）。 ——
  11: named_tail(
    '攻击力',
    src(SRC_FLAG, ':270 CFLAG:11 = 攻撃力（@WEAPON_RESTORE 每日重算写入）'),
  ),
  12: named_tail(
    '防御力',
    src(SRC_FLAG, ':271 CFLAG:12 = 防御力（@WEAPON_RESTORE 每日重算写入）'),
  ),
  15: named_tail(
    '初体验对象',
    src(
      SRC_FLAG,
      ':275 CFLAG:15 初体験の相手のキャラ番号＋１（101 壺ワーム、102 触手生物、103 野良犬、104 モンスター、105 狂王）',
    ),
  ),
  16: named_tail(
    '初吻对象',
    src(
      SRC_FLAG,
      ':276 CFLAG:16 ファーストキスの相手のキャラ番号＋１（未経験は -1 初期化）',
    ),
  ),
  41: named_tail(
    '上衣类型',
    src(
      SRC_FLAG,
      ':295 CFLAG:41 上着のタイプ（詳細は FUNC_CLOTH.ERB @PRINT_CLOTHTYPE）',
    ),
  ),
  // 特别服装类型（42）属主 chara（ownership/cflag-ownership.yml "42"）——
  // FUNC_CLOTH（train 域）的 AFTERTRAIN_CLOTH 写它走 chara(cid).chara 门面
  //（#215 J5）；与 41/45/46 同族但不同属主，落 chara-chara.js 的域区块
  42: named_tail(
    '特别服装类型',
    src(
      SRC_FLAG,
      ':296 CFLAG:42 特別コスチュームのタイプ（詳細は FUNC_CLOTH.ERB）',
    ),
  ),
  45: named_tail(
    '上衣上状态',
    src(
      SRC_FLAG,
      ':299 CFLAG:45 上着上の状態（-3 破り取られている -2 汚物まみれ -1 没収 0 通常 1以上 洗濯中）',
    ),
  ),
  46: named_tail(
    '上衣下状态',
    src(
      SRC_FLAG,
      ':300 CFLAG:46 上着下の状態（-3 破り取られている -2 汚物まみれ -1 没収 0 通常 1以上 洗濯中）',
    ),
  ),
  // 胸罩状态（44）属主 stronghold（ownership/cflag-ownership.yml "44"：3 处
  // 写中据点侧 2）——COM111 撕胸罩的 CFLAG:44 = -3 是登记在册的跨域写
  //（cflag-cross-domain-writes.yml），经 chara(cid).stronghold 门面（#71，
  // #228 J18 接线）。与 41/45/46 同族但属主不同，落 chara-stronghold.js
  44: named_tail(
    '胸罩状态',
    src(
      SRC_FLAG,
      ':298 CFLAG:44 ブラジャーの状態（-3 破り取られている -2 汚物まみれ -1 没収 0 通常 1以上 洗濯中）',
    ),
  ),
  120: named_tail('卖春积极性', src(SRC_FLAG, ':331 CFLAG:120 売春への積極性')),
  // —— 迷宫凌辱的畏怖记忆（#182 H13 @RYOUZYOKU：dungeon 域写、
  //    ownership/cflag-ownership.yml "130-131" owner: dungeon）——
  130: named(
    '凌辱畏怖记忆_怪物',
    erb(
      '迷宮/DUNGEON_RYOUZYOKU.ERB',
      ':67 CFLAG:ARG:130 = LOCAL:1（被凌辱モンスターID記憶）',
    ),
  ),
  131: named(
    '凌辱畏怖计数',
    erb(
      '迷宮/DUNGEON_RYOUZYOKU.ERB',
      ':69/:72 CFLAG:ARG:131（凌辱畏怖記憶の回数；BATLLE.ERB:701 起按它做伤害减免/增伤）',
    ),
  ),
  501: named_tail('侵攻阶层', src(SRC_FLAG, ':386 CFLAG:501 侵攻階層')),
  502: named_tail('侵攻度', src(SRC_FLAG, ':387 CFLAG:502 侵攻度')),
  508: named_tail(
    '再起点',
    src(
      SRC_FLAG,
      ':409 CFLAG:508 再起ポイント（ダンジョン外で全回復するために必要。階層突破で増加）',
    ),
  ),
  // —— 装备枠（#174 H5）。553-559 全库无读写（target/ 实测仅 550/551/552
  //    有使用），无名字不进门面。用 named（非 named_tail）：tail 的用途是
  //    并行期把两票落点岔开，冲突已在 rebase 解掉，这三条按序号正常入列。 ——
  550: named(
    '武装',
    src(SRC_FLAG, 'CFLAG:550～559 装備品枠——武装（存储编号，EQUIP.ERB:35）'),
  ),
  551: named(
    '装饰',
    src(SRC_FLAG, 'CFLAG:550～559 装備品枠——装飾（存储编号，EQUIP.ERB:36）'),
  ),
  552: named(
    '装饰2',
    src(SRC_FLAG, 'CFLAG:550～559 装備品枠——装飾2（存储编号，EQUIP.ERB:37）'),
  ),
  // —— 勇者来袭的跨域写（#171 H2 @ENTER_ENEMY；named_tail 让本票与
  //    并行票的产物落点不相邻，#170 先例。まとめ文档无这三条的词条，
  //    出处直接给 ERB）——
  6: named_tail(
    '随机名编号',
    erb(
      'EVENT/ENTER_ENEMY.ERB',
      ':303 CFLAG:A:6 = RAND:80（ランダム名前決定）',
    ),
  ),
  151: named_tail(
    '善恶值',
    erb('EVENT/ENTER_ENEMY.ERB', ':101-103 善悪値調整（< -100 钳到 -100）'),
  ),
  580: named_tail(
    '所持金',
    erb(
      '迷宮/DUNGEON_TOWN.ERB',
      ':121 勇者所持金（城镇经济消费，ENTER_ENEMY.ERB 的初期加算同此下标）',
    ),
  ),
  582: named_tail(
    '借款',
    src(
      SRC_FLAG,
      ':459 CFLAG:582 = 現在の借金（マイナス）——勇者资产闭环第三槽',
    ),
  ),
  // —— 迷宫主循环与队伍编组的跨域写（#172 H3 @DUNGEON/@PARTY_DEL；
  //    named_tail 落表尾，#170/#171 先例。50 属主 event（dungeon 文件写）、
  //    521 属主 invasion、601 属主 chara——三条都是跨域写必需的门面）——
  50: named_tail(
    '贞操带钥匙',
    src(SRC_FLAG, ':304 CFLAG:50 = 貞操帯のカギをダンジョンで見つけた'),
  ),
  521: named_tail(
    '存档点',
    src(
      SRC_FLAG,
      ':419 CFLAG:521 = セーブポイント（2015 补丁起兼作挫折阶层记忆，#103）',
    ),
  ),
  // #177（H8）起 500 有了写方（ROOM_BUILD 清指令）；属主 dungeon
  500: named_tail(
    '迷宫内行动',
    src(
      SRC_FLAG,
      ':385 CFLAG:500 = ダンジョン内行動(0:内職 1:売春 2:罠補充 3:施設拡張 4:潜入)',
    ),
  ),
  601: named_tail('结婚对象', src(SRC_FLAG, ':464 CFLAG:601 = 結婚相手')),
  // —— 2D 地下城模式的跨域写（#181 H12 @UNIT_MOVE；named_tail 落表尾，
  //    #170-#172 先例。510/511 属主 event（dungeon 文件写）——2D 单位的
  //    格子位置，词条取まとめ文档 :412-413 的「X座標/Y座標」归一简体）——
  510: named_tail('X坐标', src(SRC_FLAG, ':412 CFLAG:510 = X座標')),
  511: named_tail('Y坐标', src(SRC_FLAG, ':413 CFLAG:511 = Y座標')),
  // #218（J8）补名：调教与服装跨域写
  10: named('调教回数', src(SRC_FLAG, ':269 CFLAG:10 = 調教回数')),
  40: named_tail('着衣状态', src(SRC_FLAG, ':294 CFLAG:40 = 着衣の状態')),
  61: named_tail('逆强暴', src(SRC_FLAG, ':307 CFLAG:61 = 逆レイプ')),
  81: named_tail('蓄积润滑', src(SRC_FLAG, ':317 CFLAG:81 = 蓄積潤滑')),
  82: named_tail('蓄积欲情', src(SRC_FLAG, ':318 CFLAG:82 = 蓄積欲情')),
  666: named_tail('自动调教', src(SRC_FLAG, 'CFLAG:666 = 自動調教')),
  667: named_tail('自动调教回数', src(SRC_FLAG, 'CFLAG:667 = 自動調教回数')),
};

// —— FLAG：一维按域重切（ownership 82 个下标）——

const flag = {
  0: named('休息', src(SRC_FLAG, 'FLAG:0 休憩')),
  1: named('上次调教对象', src(SRC_FLAG, 'FLAG:1')),
  2: named('上次助手', src(SRC_FLAG, 'FLAG:2')),
  5: named('游戏设定', src(SRC_FLAG, 'FLAG:5 ビット演算')),
  7: named('口上开关', src(SRC_FLAG, 'FLAG:7 口上显示/频率')),
  9: named('税金修正', src(SRC_FLAG, 'FLAG:9')),
  22: named('录像开始状况', src(SRC_FLAG, 'FLAG:22')),
  25: named('指令过滤', src(SRC_FLAG, 'FLAG:25')),
  26: named('种族年龄设定_0', src(SRC_FLAG, 'FLAG:26～27')),
  27: named('种族年龄设定_1', src(SRC_FLAG, 'FLAG:26～27')),
  30: named('爱或淫乱人数', src(SRC_FLAG, 'FLAG:30')),
  31: named('杀死人数', src(SRC_FLAG, 'FLAG:31')),
  32: named('爱之奴隶所生', src(SRC_FLAG, 'FLAG:32')),
  33: named('技巧素质道具数', src(SRC_FLAG, 'FLAG:33')),
  35: named('濒死自动结束调教', src(SRC_FLAG, 'FLAG:35')),
  36: named('显示模式', src(SRC_FLAG, 'FLAG:36')),
  37: named('着衣系统', src(SRC_FLAG, 'FLAG:37')),

  60: named('勇者基础等级修正', src(SRC_FLAG, 'FLAG:60')),
  61: named('每日香料购买数', src(SRC_FLAG, 'FLAG:61')),
  62: named('肉便器行动', src(SRC_FLAG, 'FLAG:62')),
  63: named('肉便器常识改写', src(SRC_FLAG, 'FLAG:63')),
  64: named('肉便器侍奉对象', src(SRC_FLAG, 'FLAG:64')),
  71: named('自由调教跳转', erb('調教相關/COMF_JUMP.ERB', 'FLAG:71')),
  76: named('外来勇者等级上限', src(SRC_FLAG, 'FLAG:76')),
  80: named('处刑勇者数', src(SRC_FLAG, 'FLAG:80')),
  81: named('人间界侵攻度', src(SRC_FLAG, 'FLAG:81')),
  82: named('人间界征服完了', src(SRC_FLAG, 'FLAG:82')),
  83: named('肉便器数', src(SRC_FLAG, 'FLAG:83')),
  84: named('装饰品数', src(SRC_FLAG, 'FLAG:84')),
  85: named('陷阱等级', src(SRC_FLAG, 'FLAG:85')),
  86: named('精灵领域侵攻度', src(SRC_FLAG, 'FLAG:86')),
  87: named('精灵领域征服完了', src(SRC_FLAG, 'FLAG:87')),
  88: named('龙山侵攻度', src(SRC_FLAG, 'FLAG:88')),
  89: named('龙山征服完了', src(SRC_FLAG, 'FLAG:89')),
  90: named('天界侵攻度', src(SRC_FLAG, 'FLAG:90')),
  91: named('天界征服完了', src(SRC_FLAG, 'FLAG:91')),
  92: named('亲卫队砦侵攻度', src(SRC_FLAG, 'FLAG:92')),
  93: named('人间界侵攻事件', src(SRC_FLAG, 'FLAG:93')),

  ...fill(100, 115, (i) =>
    named(`口上存在_${i - 100}`, src(SRC_FLAG, 'FLAG:1xx 口上文件存在判定')),
  ),
  119: named('口上存在_19', src(SRC_FLAG, 'FLAG:1xx')),
  223: named('勇者入场_23', src(SRC_FLAG, 'FLAG:200～ 勇者入场旗标')),
  224: named('勇者入场_24', src(SRC_FLAG, 'FLAG:200～')),
  400: named(
    '活动迷宫',
    erb('迷宮/DUNGEON.ERB', '行125 FLAG:400 イベントダンジョン'),
  ),
  500: named('狂王性别', src(SRC_FLAG, 'FLAG:500')),
  501: named('初期奴隶类型', src(SRC_FLAG, 'FLAG:501')),
  502: named('迷宫模式', src(SRC_FLAG, 'FLAG:502')),
  550: named(
    '指令菜单长度',
    erb('調教相關/COM_REGISTER.ERB', '行7 FLAG:550 菜单の長さ'),
  ),
  600: named('石像数', src(SRC_FLAG, 'FLAG:600')),
  601: named('剥制数', src(SRC_FLAG, 'FLAG:601')),
  602: named('蜡像数', src(SRC_FLAG, 'FLAG:602')),
  603: named('人偶数_服装', src(SRC_FLAG, 'FLAG:603')),
  604: named('人偶数_球形关节', src(SRC_FLAG, 'FLAG:604')),
  605: named('金属像数', src(SRC_FLAG, 'FLAG:605')),
  606: named('冰像数', src(SRC_FLAG, 'FLAG:606')),
  607: named('金属像数_2', src(SRC_FLAG, 'FLAG:607 文档重名')),
  608: named('家具数', src(SRC_FLAG, 'FLAG:608')),
  609: named('绘画数', src(SRC_FLAG, 'FLAG:609')),
  611: named('喷水像_石', src(SRC_FLAG, 'FLAG:611')),
  612: named('喷水像_金属', src(SRC_FLAG, 'FLAG:612')),
  613: named('人间牧场竿役', src(SRC_FLAG, 'FLAG:613')),
};

// —— TFLAG：一维按域重切（ownership 248 个下标）——

const tflag_named = {
  0: named('口中射精', src(SRC_FLAG, 'TFLAG:0')),
  1: named('手中射精', src(SRC_FLAG, 'TFLAG:1')),
  2: named('性交射精', src(SRC_FLAG, 'TFLAG:2')),
  3: named('处女丧失', src(SRC_FLAG, 'TFLAG:3')),
  4: named('接吻射精', src(SRC_FLAG, 'TFLAG:4')),
  5: named('舔阴射精', src(SRC_FLAG, 'TFLAG:5')),
  6: named('助手射精', src(SRC_FLAG, 'TFLAG:6')),
  7: named('主人犯助手射精', src(SRC_FLAG, 'TFLAG:7')),
  8: named('口交射精后', src(SRC_FLAG, 'TFLAG:8')),
  9: named('股间射精', src(SRC_FLAG, 'TFLAG:9')),
  10: named('对象射精', src(SRC_FLAG, 'TFLAG:10')),
  11: named('对象喷乳', src(SRC_FLAG, 'TFLAG:11')),
  12: named('逆强奸射精', src(SRC_FLAG, 'TFLAG:12')),
  13: named('初吻与自我口上', src(SRC_FLAG, 'TFLAG:13')),
  14: named('近亲与自我口上', src(SRC_FLAG, 'TFLAG:14')),
  15: named('怪物射精或购入金', src(SRC_FLAG, 'TFLAG:15')),
  16: named('犬射精或处刑口上', src(SRC_FLAG, 'TFLAG:16')),
  17: named('童贞丧失_未使用', src(SRC_FLAG, 'TFLAG:17 未使用')),
  18: named('足交射精或处遇口上', src(SRC_FLAG, 'TFLAG:18')),
  19: named('伴V经验指令', src(SRC_FLAG, 'TFLAG:19')),
  20: named('主人导致处女丧失', src(SRC_FLAG, 'TFLAG:20')),
  21: named('反抗刻印变动', src(SRC_FLAG, 'TFLAG:21')),
  22: named('苦痛刻印变动', src(SRC_FLAG, 'TFLAG:22')),
  23: named('快乐刻印变动', src(SRC_FLAG, 'TFLAG:23')),
  24: named('屈服刻印变动', src(SRC_FLAG, 'TFLAG:24')),
  25: named('压抑抵抗消灭', src(SRC_FLAG, 'TFLAG:25')),
  26: named('侍奉快乐经验', src(SRC_FLAG, 'TFLAG:26')),
  27: named('被虐快乐经验', src(SRC_FLAG, 'TFLAG:27')),
  28: named('A快乐经验', src(SRC_FLAG, 'TFLAG:28')),
  29: named('绝顶强度', src(SRC_FLAG, 'TFLAG:29')),
  30: named('主人经验', src(SRC_FLAG, 'TFLAG:30')),
  31: named('本次调教处女丧失', src(SRC_FLAG, 'TFLAG:31')),
  32: named('录像内容', src(SRC_FLAG, 'TFLAG:32 亦为自我口上旗标')),

  34: named('死亡时在录像', src(SRC_FLAG, 'TFLAG:34')),
  35: named('榨乳中', src(SRC_FLAG, 'TFLAG:35')),
  38: named('对象膣内射精', src(SRC_FLAG, 'TFLAG:38')),
  40: named('三人PLAY主人部位', src(SRC_FLAG, 'TFLAG:40')),
  41: named('三人PLAY助手部位', src(SRC_FLAG, 'TFLAG:41')),
  42: named('三人PLAY持续', src(SRC_FLAG, 'TFLAG:42')),
  45: named('下装穿不上', src(SRC_FLAG, 'TFLAG:45')),
  50: named('上次调教者是助手', src(SRC_FLAG, 'TFLAG:50')),
  ...fill(51, 57, (i) =>
    named(`珠结算_${i - 51}`, src(SRC_FLAG, 'TFLAG:51～58 @JUEL_CHECK')),
  ),
  58: named('珠结算_7', src(SRC_FLAG, 'TFLAG:51～58')),
  59: named('前前回指令', src(SRC_FLAG, 'TFLAG:59')),
  60: named('插着不拔', src(SRC_FLAG, 'TFLAG:60')),
  70: named('录像次数', src(SRC_FLAG, 'TFLAG:70')),
  100: named('快乐经验', src(SRC_FLAG, 'TFLAG:100')),
  101: named('召唤暂存_1', src(SRC_FLAG, 'TFLAG:100～103 召唤暂存')),
  102: named('召唤暂存_2', src(SRC_FLAG, 'TFLAG:100～103')),
  110: named('精爱味觉', src(SRC_FLAG, 'TFLAG:110')),
  120: named('V虫产卵', src(SRC_FLAG, 'TFLAG:120')),
  121: named('A虫产卵', src(SRC_FLAG, 'TFLAG:121')),
  150: named('反抗刻印回避', src(SRC_FLAG, 'TFLAG:150')),
  200: named('屈服刻印结算', src(SRC_FLAG, 'TFLAG:200')),
  204: named(
    '当前选择的调教指令编号',
    erb(
      '調教相關/COM_REGISTER.ERB',
      '行5 TFLAG:204 主に現在選択している調教指令番号の一時的な保存',
    ),
  ),
  224: named(
    '索求口上抑制',
    erb('調教相關/COM_REGISTER.ERB', '行6 TFLAG:224 おねだり口上抑制フラグ'),
  ),
  400: named('死斗场敌种', src(SRC_FLAG, 'TFLAG:400')),
  401: named('死斗场陷落', src(SRC_FLAG, 'TFLAG:401')),
  402: named('死斗场收入', src(SRC_FLAG, 'TFLAG:402')),
  500: named('博物馆口上', src(SRC_FLAG, 'TFLAG:500')),
  510: named('流放口上', src(SRC_FLAG, 'TFLAG:510')),
  520: named('公开处刑口上', src(SRC_FLAG, 'TFLAG:520')),
  530: named('猎奇处刑口上', src(SRC_FLAG, 'TFLAG:530')),
  860: named('失神口上开关', src(SRC_FLAG, 'TFLAG:860')),
  ...fill(864, 898, (i) =>
    named(`失神_${i}`, src(SRC_FLAG, 'TFLAG:864～899 失神补丁')),
  ),
  899: named('失神', src(SRC_FLAG, 'TFLAG:899')),
  999: named(
    '清屏锚点',
    'yml/TFlag.yml 头注；target/ERB/調教相關/USERCOM.ERB TFLAG:999',
  ),
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

const global = {
  98: named('联系方式开关', 'yml/Global.yml id 98'),
  99: named('致辞折叠开关', 'yml/Global.yml id 99'),
};

// —— MARK：只收 yml 缺口（#90）——
// Mark.yml 列名覆盖 0-3/10；mark:4 原作侧无列名，语义从 @MARK_GOT_CHECK
// 的用法读出：与 MARK:3 同值连写、只升不降（`MARK:4 <= N` 是取得门限），
// 即反抗刻印的历史最高档，防降档后重取低级刻印。

const mark = {
  4: named(
    '反抗刻印履历',
    erb(
      'SYSTEM/SYSTEM_SOURCE_SUB1.ERB',
      ':961-981 MARK:4 取得门限，与 MARK:3 同值连写（Mark.yml 无此列，人工命名）',
    ),
  ),
};

const cstr = {
  // 故事名：原作仅 SYSTEM_DATA.ERB 的存档界面读写（$SET_NAME 与 @SAVEINFO），
  // 属主 system（ownership/cstr-ownership.yml "99"）。**不得**随本表同步进
  // yml/CStr.yml——登记进引擎名字表的下标会被 addCharacter 的 initCharaTable
  // 预置 0，行为随之改变（#136 简报事实 3）；门面命名是代码层动作，不碰 yml。
  99: named(
    '故事名',
    erb('SYSTEM/SYSTEM_DATA.ERB', ':193-209 $SET_NAME 读写（32 字符上限）'),
  ),
  // 加入时名字：原作全库的固定习惯（ADDCHARA 后 CSTR:1 = %NAME:A%，角色
  // 加入即把预设名抄进 CSTR:1），#171 H2 的 K_11_LILY/K_34_crazylord 沿用；
  // 不进 yml/CStr.yml 的理由同上（预置 0 会顶掉字符串空值语义）
  1: named_tail(
    '加入时名字',
    erb('EVENT/ENTER_ENEMY.ERB', ':198 CSTR:A:1 = %NAME:A%（SYSTEM 同款惯例）'),
  ),
  // 初体验对象名：原作破处时把相手名抄进 CSTR:3（DUNGEON_RYOUZYOKU.ERB
  // :2445/:2595 等；CHARA_FIRST_EXP.ERB:17 读它显示）。属主 train
  // （ownership/cstr-ownership.yml "3-4"）；不进 yml/CStr.yml 的理由同上。
  3: named_tail(
    '初体验对象名',
    erb(
      '迷宮/DUNGEON_RYOUZYOKU.ERB',
      ':2445 CSTR:(ARG:1):3 = %SAVESTR:(ARG:0)%',
    ),
  ),
};

// —— DELTA：UP/DOWN 的 ere 等价物（移植自建，#90）——
// 名字 = Palam.yml 同下标列名 +「增量」——审校者对着 @SOURCE_CHECK_UP_* 的
// `UP:N += …` 与 palam 面板行就能确认。原作侧 UP/DOWN 是 Emuera 内建变量
// 族，没有列名可引。

const SRC_DELTA = 'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB :666 起';

const src_delta = (i) =>
  src(SRC_DELTA, `UP:${i}（UP/DOWN→delta，CONTEXT.md 变量族）`);

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
  src(
    'target/ERB/SYSTEM/SYSTEM_SOURCE.ERB :411',
    `LOSEBASE:${i}（LOSEBASE→deltabase 存负值，CONTEXT.md 变量族）`,
  );

const deltabase = {
  0: named('体力损耗', src_losebase(0)),
  1: named('气力损耗', src_losebase(1)),
};

// —— TEQUIP：调教中的装备位（#215 J5 建模；名字源 = 旗标一览，属主见
//    ownership/tequip-ownership.yml 的 12 个区间）。TEquip.yml 保持空表
//    （引擎建桶用；登记名字表会让 initCharaTable 预置 0，见该文件头注），
//    名字只进本表。只名六个：跨域两段（22 属 system、35 属 event——train
//    侧写它必须走门面）与 #213 口上头部守卫消费的四位（45/55/89/90，
//    train 域内——族票写它时可直写也可走门面，具名是给可读性）。
//    其余属主下标随各自族票补名（#71 裁定三：未命名不进门面）。——
const tequip = {
  18: named_tail('淋浴中', src(SRC_FLAG, ':507 TEQUIP:18 シャワー使用中')),
  21: named_tail('媚药效果', src(SRC_FLAG, ':509 TEQUIP:21 しあわせ草')),
  22: named_tail(
    '利尿剂',
    src(
      SRC_FLAG,
      ':510 TEQUIP:22 利尿剤（属主 system：COMF52/COMF85 的 train 跨域写走本门面）',
    ),
  ),
  35: named_tail(
    '主人避孕套',
    src(
      SRC_FLAG,
      ':511 TEQUIP:35 マスターがコンドーム装着（属主 event：SYSTEM_SOURCE/COMF_CONDOM 的跨域写走本门面）',
    ),
  ),
  37: named_tail(
    '对象避孕套',
    src(
      SRC_FLAG,
      ':513 TEQUIP:37 調教対象がコンドーム装着（属主 train：SYSTEM_SOURCE.ERB:427-430 的 system 跨域清零）',
    ),
  ),
  45: named_tail('口塞', src(SRC_FLAG, ':516 TEQUIP:45 ボールギャグ装着')),
  53: named_tail('录像摄影', src(SRC_FLAG, ':521 TEQUIP:53 ビデオ撮影')),
  54: named_tail('野外PLAY', src(SRC_FLAG, ':522 TEQUIP:54 野外プレイ')),
  55: named_tail('死斗场', src(SRC_FLAG, ':523 TEQUIP:55 コロシアム')),
  57: named_tail('羞耻PLAY', src(SRC_FLAG, ':524 TEQUIP:57 羞恥プレイ')),
  58: named_tail('浴室PLAY', src(SRC_FLAG, ':525 TEQUIP:58 お風呂場プレイ')),
  59: named_tail('新妻PLAY', src(SRC_FLAG, ':526 TEQUIP:59 新妻プレイ')),
  89: named_tail('兽奸', src(SRC_FLAG, ':527 TEQUIP:89 獣姦プレイ')),
  90: named_tail('触手', src(SRC_FLAG, ':528 TEQUIP:90 触手調教')),
};

// —— EX：绝顶计数（#216 J6 进门面；ex/nowex 共用一张名字表——引擎寻址层
//    case"nowex" → staticData.ex，yml/Ex.yml 空表故名字走本表，同 tequip
//    先例）。只名一个：EX:5 射精·喷乳（COM_EJAC_PLAYER_MILK 的
//    EX:PLAYER:5 += 1，属主 system——train 侧写它必须走门面）。
//    其余下标随各自票补名（#71 裁定三：未命名不进门面）。 ——
const ex = {
  5: named(
    '喷乳绝顶',
    src(
      SRC_FLAG,
      ':EX:5 射精·喷乳（COM_EJAC_PLAYER_MILK 的 EX:PLAYER:5 += 1）',
    ),
  ),
};

// —— 移植自建表的属主声明（#90 裁定，依据见 issue #90）——
// 这些表 target/ 侧没有源（UP/DOWN、LOSEBASE 是 Emuera 内建变量族），测量
// 不出属主，只能人定；与名字同处声明，因为两者都是「测不出来、人工定」的
// 决定。delta/deltabase 归 train：生命周期与 tflag 一致——回合内有效、由
// 调教结算写入（@SOURCE_CHECK 累加）、回合末由调教结算消费清零（ere 侧
// PALAM_UP_CHECK 当场结算 + 引擎 nextTurnInTrain 兜底）。
// portcflag 同机制适用，但暂不声明属主：当前唯一字段「数据版本」由
// ere/chara/chara-portcflag.js 的 init_portcflag 在角色加入点写入，单字段
// 门面只是搬家不是收敛；第二个字段进来时随字段语义在此声明（ADR-0001 的
// 「宁宽勿新」意味着 portcflag 会长出多域字段，属主随字段定，非一表一主）。
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
      if (!entry?.name || !entry?.source) {
        problems.push(`${table}:${index} 缺 name/source`);
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
  SRC_FLAG,
  SRC_KXX,
  get_name,
  validate_names,
};
