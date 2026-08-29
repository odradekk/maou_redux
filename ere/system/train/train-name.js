/**
 * @file 自定义指令名表：@TRAIN_NAME_INIT 的播种与 TRAIN_NAME 的读助手。
 *
 * 源: target/ERB/調教相關/TRAIN_MAIN.ERB  @TRAIN_NAME_INIT（:783-910）
 *     target/ERB/其他/VARIABLES.ERH:13  #DIMS TRAIN_NAME,500（表声明）
 *
 * TRAIN_NAME 是静态名表（yml/TrainCommand.yml＝TRAINNAME，#43）之上的可写
 * 覆盖层：@TRAIN_NAME_INIT 在 @EVENTTRAIN 内一次性播种初值（TRAIN_MAIN.ERB
 * :53 的调用点），此后按存档定制（J4 的自定义菜单 SHOW_COMMENU、J19 的
 * COMF120/121 读 TRAIN_NAME:SELECTCOM）。承载面是扩展普通表 yml/
 * TrainAlias.yml——表名裁定（trainname 撞引擎 setVar 的 *name 只读拦截）
 * 与装载机制的引擎探针见 test/tstr-train-table.test.js 与该 yml 头注。
 *
 * 初始化守卫 1:1（:786-787）：SIF STRLENSU(TRAIN_NAME) > 0 RETURN——无下标
 * 读的是 TRAIN_NAME:0，非空即已播种。已知差异（不可观测，TrainAlias.yml
 * 头注记录在案）：原作 #DIMS 无 SAVEDATA、不进存档、每次读档重播种；ere
 * 桶随存档持久、每存档只播种一次——前提是 CSTR:7 有写点，当前全库无写入。
 *
 * 150 号槽（:899）：TRAIN_NAME:150 = %CSTR:7%調教——PRINTFORM 式内插在播种
 * 时求值（目标的癖好名 CSTR:TARGET:7；汉化原文的「調」按 #60 归一为「调」）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');

/**
 * @TRAIN_NAME_INIT 的播种表（TRAIN_MAIN.ERB:788-908 逐条转录）。
 * 缺号＝原作未赋值（39/67/74-79/91-99/112-119/136-144/145-149/151-199/
 * 209+），照缺不补；150 是动态槽不在此表（播种时内插，见 train_name_init）。
 */
const TRAIN_NAME_TABLE = {
  0: '爱抚',
  1: '舔阴',
  2: '肛门爱抚',
  3: '自慰',
  4: '口交(主)',
  5: '胸爱抚',
  6: '接吻',
  7: '自己扒开',
  8: '插入手指',
  9: '舔肛',
  10: '振动宝石',
  11: '壶虫',
  12: '振动杖',
  13: '肛门虫',
  14: '阴蒂夹',
  15: '乳头夹',
  16: '榨乳器',
  17: '飞机杯',
  18: '淋浴',
  19: '肛珠',
  20: '正常位',
  21: '背后位',
  22: '对面座位',
  23: '背面座位',
  24: '逆强奸',
  25: '逆肛门强奸',
  26: '正常位肛交',
  27: '背后位肛交',
  28: '对面座位肛交',
  29: '背面座位肛交',
  30: '手淫',
  31: '口交(奴)',
  32: '乳交',
  33: '股间性交',
  34: '骑乘位',
  35: '全身擦洗',
  36: '骑乘位肛交',
  37: '肛门侍奉',
  38: '足交',
  40: '打屁股',
  41: '鞭',
  42: '针',
  43: '眼罩',
  44: '绳子',
  45: '口塞',
  46: '灌肠+肛塞',
  47: '拘束衣穿着',
  48: '践踏',
  49: '肛门电极',
  50: '润滑液',
  51: '媚药',
  52: '利尿剂',
  53: '水晶球',
  54: '野外PLAY',
  55: '放置PLAY',
  56: '交谈',
  57: '羞耻PLAY',
  58: '浴室PLAY',
  59: '新妻PLAY',
  60: '助手接吻',
  61: '强制舔阴',
  62: '侵犯助手',
  63: '磨镜',
  64: '３Ｐ',
  65: '逆侵犯助手',
  66: '双枪口交',
  68: '双人口交',
  69: '六九式',
  70: '双人股间性交',
  71: '双人乳交',
  72: '刮阴毛',
  73: '拨弄发型',
  80: '强制口交',
  81: '拳交',
  82: '肛门拳交',
  83: '两穴拳交',
  84: '刺激Ｇ点',
  85: '放尿',
  86: '饮尿',
  87: '穿环',
  88: '使役魔兽PLAY',
  89: '兽奸PLAY',
  90: '乳内插入',
  100: '触手生物',
  101: '触手插入',
  102: '肛交触手',
  103: '触手凌辱阴蒂',
  104: '触手凌辱乳头',
  105: '触手榨乳',
  106: '触手紧缚',
  107: '触手灌肠',
  108: '触手口辱',
  109: '触手凌辱阴茎',
  110: '穿脱衣服',
  111: '撕破衣服',
  120: '插入Ｇ点蹂躏',
  121: '插入子宫口蹂躏',
  122: '阴茎互捅',
  123: '乳夹口交',
  124: '深喉',
  125: '口交时自慰',
  126: '手搓口交',
  127: '真空口交',
  128: '正常位・接吻',
  129: '正常位・胸爱抚',
  130: '正常位ＳＰ',
  131: '背后位・胸爱抚',
  132: '背后位・打屁股',
  133: '站立背后位',
  134: '背后位ＳＰ',
  135: '自助舔舐',
  200: '死斗场',
  201: '助手',
  202: '最下层居民',
  203: '霉菌狗',
  204: '兽人',
  205: '腐烂猪',
  206: '巨魔',
  207: '媚药史莱姆',
  208: '触手',
};

/**
 * @TRAIN_NAME_INIT（TRAIN_MAIN.ERB:783-910）：TRAIN_NAME 一次性播种。
 * 幂等（守卫：槽 0 非空即返回，:786-787）。
 */
function train_name_init() {
  if ((era.get('trainalias:0') ?? '').length > 0) {
    return;
  }
  for (const [id, name] of Object.entries(TRAIN_NAME_TABLE)) {
    era.set(`trainalias:${id}`, name);
  }
  // :899 TRAIN_NAME:150 = %CSTR:7%調教（内插在播种时求值；TARGET 的癖好名，
  // 当前全库无写点、读值恒空——见文件头「已知差异」）
  era.set(
    `trainalias:150`,
    `${era.get(`cstr:${era_flag.target}:7`) ?? ''}调教`,
  );
}

/**
 * TRAIN_NAME:N 的读助手（@P_C 的第二级回落；J19 的 COMF120/121 读
 * TRAIN_NAME:SELECTCOM 时同用此口）。未播种/未赋值槽返回空串（#13 的
 * undefined 兜底）。
 * @param {number} id 指令编号
 * @returns {string}
 */
function read_train_name(id) {
  return era.get(`trainalias:${id}`) ?? '';
}

module.exports = { TRAIN_NAME_TABLE, read_train_name, train_name_init };
