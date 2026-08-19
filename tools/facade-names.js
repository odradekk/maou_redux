/**
 * @file 门面字段命名表（issue #71）：所有权切片之后，每个下标的中文访问器名
 * 与原作出处。手维护的输入数据，生成器只读。
 *
 * 判据：审校者手边摊着 ERB，能不能一眼确认生成码对不对。因此：
 *   - 字段名用中文（对得上 ERB 注释与指令名表），不是英文 snake_case；
 *   - 每个名字带出处（模板 / 旗标一览 / 角色口上文件行号）；
 *   - 未收录的属主下标生成器必须报错（绝不静默用数字当名字）。
 *
 * 表键 = 引擎表名小写；内层键 = 数字下标。fallback 形态 `tflag_N` 只用于
 * 旗标一览没有给出语义、且本票没有口上消费者的下标——语义随属主子系统票补。
 */

'use strict';

const SRC_FLAG = '资料_非必要無須解壓/eramaouフラグまとめ.txt';
const SRC_KXX = '资料_非必要無須解壓/口上テンプレ/EVENT_KXX.ERB';
const SRC_TRAIN = 'yml/TrainCommand.yml（指令名）+ EVENT_KXX.ERB 注释';

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

function fallback(table, index, source) {
  return named(`${table}_${index}`, source);
}

// —— CFLAG：口上域切片（ownership 属主 kojo 的 110 个下标）——

const cflag = {
  21: named('肉亲_0', src(SRC_FLAG, 'CFLAG:21～25 肉亲关系')),
  201: named('初调教', src(SRC_KXX, ':57 初调教时')),
  202: named('简易助手_0', src(SRC_KXX, ':123 简易助手口上 CFLAG:202～210')),
  203: named('简易助手_1', src(SRC_KXX, ':123')),
  204: named('简易助手_2', src(SRC_KXX, ':123')),
  214: named(
    '首次C绝顶_K14',
    '口上/EVENT_K14_貴公子.ERB 初めてC絶頂 CFLAG:214',
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
        ? '口上/EVENT_K3_高貴.ERB 寄生 CFLAG:230'
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
  305: named('口交_主', '口上/EVENT_K10_クラブ.ERB 口交 CFLAG:305（指令 4）'),
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
  325: named('逆强奸', '口上/EVENT_K3_高貴.ERB 逆强奸 CFLAG:325（指令 24）'),
  326: named('逆肛门强奸', '口上/EVENT_K10_クラブ.ERB 逆肛门强奸 CFLAG:326'),
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
  339: named('足交', '口上/EVENT_K3_高貴.ERB 足交 CFLAG:339（指令 38）'),
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
  366: named('侵犯助手', '口上/EVENT_K11_リリィ.ERB 助手を犯させる CFLAG:366'),
  367: named('双人口交', '口上/EVENT_K11_リリィ.ERB 二本フェラ CFLAG:367'),
  369: named(
    '双人侍奉口交',
    '口上/EVENT_K11_リリィ.ERB ダブルフェラ CFLAG:369',
  ),
  370: named('魔族化', '口上/EVENT_K7_ハート.ERB 等 魔族化 CFLAG:370'),
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
  387: named('灌肠肛塞着脱', '口上/EVENT_K3_高貴.ERB 灌肠+肛塞 CFLAG:387'),
  391: named('三人PLAY', '口上/EVENT_K11_リリィ.ERB 3P CFLAG:391'),
  400: named('魔族化_K11', '口上/EVENT_K11_リリィ.ERB 魔族化 CFLAG:400'),
  444: named('兽奸眼罩', src(SRC_FLAG, 'CFLAG:444 獣姦アイマスク时口上')),
  ...fill(650, 657, (i) =>
    named(
      i === 650 ? 'NTR再捕获' : `NTR_${i}`,
      src(SRC_FLAG, 'CFLAG:650～660 NTR 旗标'),
    ),
  ),
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
  38: fallback('flag', 38, 'ownership/flag-ownership.yml；语义随系统票补'),
  60: named('勇者基础等级修正', src(SRC_FLAG, 'FLAG:60')),
  61: named('每日香料购买数', src(SRC_FLAG, 'FLAG:61')),
  62: named('肉便器行动', src(SRC_FLAG, 'FLAG:62')),
  63: named('肉便器常识改写', src(SRC_FLAG, 'FLAG:63')),
  64: named('肉便器侍奉对象', src(SRC_FLAG, 'FLAG:64')),
  71: named('自由调教跳转', '調教相關/COMF_JUMP.ERB FLAG:71'),
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
  99: fallback('flag', 99, 'ownership/flag-ownership.yml；语义随系统票补'),
  ...fill(100, 115, (i) =>
    named(`口上存在_${i - 100}`, src(SRC_FLAG, 'FLAG:1xx 口上文件存在判定')),
  ),
  119: named('口上存在_19', src(SRC_FLAG, 'FLAG:1xx')),
  223: named('勇者入场_23', src(SRC_FLAG, 'FLAG:200～ 勇者入场旗标')),
  224: named('勇者入场_24', src(SRC_FLAG, 'FLAG:200～')),
  400: named('活动迷宫', '迷宮/DUNGEON.ERB:125 FLAG:400 イベントダンジョン'),
  401: fallback('flag', 401, 'ownership/flag-ownership.yml 属主 invasion'),
  402: fallback('flag', 402, 'ownership/flag-ownership.yml 属主 chara'),
  500: named('狂王性别', src(SRC_FLAG, 'FLAG:500')),
  501: named('初期奴隶类型', src(SRC_FLAG, 'FLAG:501')),
  502: named('迷宫模式', src(SRC_FLAG, 'FLAG:502')),
  550: named('指令菜单长度', '調教相關/COM_REGISTER.ERB:7 FLAG:550 菜单の長さ'),
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
  2807: fallback('flag', 2807, 'ownership/flag-ownership.yml 属主 system'),
  2815: fallback('flag', 2815, 'ownership/flag-ownership.yml 属主 event'),
  2816: fallback('flag', 2816, 'ownership/flag-ownership.yml 属主 event'),
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
  33: fallback('tflag', 33, 'ownership/tflag-ownership.yml 属主 event'),
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
  204: fallback('tflag', 204, 'ownership/tflag-ownership.yml 属主 train'),
  224: fallback('tflag', 224, 'ownership/tflag-ownership.yml 属主 train'),
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
  999: named('清屏锚点', 'yml/TFlag.yml 头注；調教相關/USERCOM.ERB TFLAG:999'),
};

const tflag_owned = [
  ...range_list([
    [0, 9],
    [10, 11],
    [12, 15],
    [16, 16],
    [17, 17],
    [18, 18],
    [19, 20],
    [21, 24],
    [25, 28],
    [29, 29],
    [30, 30],
    [31, 31],
    [32, 32],
    [33, 33],
    [34, 34],
    [35, 35],
    [36, 37],
    [38, 38],
    [39, 39],
    [40, 42],
    [43, 44],
    [45, 45],
    [46, 49],
    [50, 50],
    [51, 57],
    [58, 58],
    [59, 99],
    [100, 100],
    [101, 102],
    [103, 119],
    [120, 121],
    [122, 149],
    [150, 150],
    [151, 199],
    [200, 200],
    [204, 204],
    [224, 224],
    [400, 402],
    [500, 500],
    [510, 510],
    [520, 520],
    [530, 530],
    [860, 860],
    [864, 899],
    [999, 999],
  ]),
];

function range_list(pairs) {
  const out = [];
  for (const [start, end] of pairs) {
    for (let i = start; i <= end; i += 1) {
      out.push(i);
    }
  }
  return out;
}

const tflag = {};
for (const index of tflag_owned) {
  tflag[index] =
    tflag_named[index] ??
    fallback('tflag', index, 'ownership/tflag-ownership.yml；语义随属主票补');
}

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

const NAMES = { cflag, flag, tflag, item, global };

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
  SRC_FLAG,
  SRC_KXX,
  get_name,
  validate_names,
};
