/**
 * @file ere/data/train-command-const.js 的行为测试（issue #836）。
 *
 * 缝 = test/helpers/era-fixture.js（常量模块只 require '#/' 别名；派生的
 * 分发空间经 com-family 读）。覆盖：
 *   1. 表驱动：101 条可直选指令的编号 ↔ 名称逐条。名称是玩家可见文本，
 *      编号是存档与指令注册共用的字面量——两者都由本文件的字面量守住，
 *      改号或改名都必须让这里红；
 *   2. 表驱动：20 条高级 COM 的编号 ↔ 名称逐条（不可直选，只能经
 *      get_adv_com 升格抵达）；
 *   3. 静态名的显示口径：引擎装载名字表时把名称列整体转小写，内建指令
 *      列表与「上次的调教指令」行显示的是转小写后的文本；换成常量后逐字
 *      不变，表外编号（高级 COM）与改动前一样取不到静态名；
 *   4. 派生：分发空间 = 101 ∪ 20、两表不相交；可直选编号升序。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/**
 * 可直选指令的编号 ↔ 名称（旧静态表的 101 行，逐条转写）。
 * 名称里的半角字母按旧表原样保留——显示口径的转小写由 train_command_name
 * 复现（块 3），不在表里预转。
 */
const SELECTABLE = {
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
  71: '双人乳交',
  72: '刮阴毛',
  73: '拨弄发型',
  80: '强制口交',
  81: '拳交',
  82: '肛门拳交',
  83: '两穴拳交',
  85: '放尿',
  87: '穿环',
  88: '使役魔兽PLAY',
  89: '兽奸PLAY',
  90: '乳房插入',
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
  122: '阴茎互捅',
  135: '自助舔舐',
  150: '自由局部调教',
  200: '死斗场',
  201: '助手',
  202: '最下层居民',
  203: '霉菌狗',
  204: '兽人',
  205: '腐烂猪',
  206: '巨魔',
  207: '媚药史莱姆',
};

/** 高级 COM 的编号 ↔ 名称（不可直选；67 没有玩家可见名，同改动前）。 */
const ADVANCED = {
  67: '',
  69: '六九式',
  70: '双人股间性交',
  84: '刺激Ｇ点',
  111: '撕破衣服',
  120: '插入Ｇ点蹂躏',
  121: '插入子宫口蹂躏',
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
  208: '触手',
};

function load_const() {
  return create_era_fixture().load_module('data/train-command-const');
}

test('表驱动：101 条可直选指令的编号与名称逐条一致', () => {
  const { TRAIN_COMMAND, TRAIN_COMMAND_IDS } = load_const();

  assert.deepEqual(
    TRAIN_COMMAND,
    SELECTABLE,
    '可直选指令的编号与名称必须逐条一致（名称是玩家可见文本，编号进存档）',
  );
  assert.equal(TRAIN_COMMAND_IDS.length, 101);
  assert.deepEqual(
    TRAIN_COMMAND_IDS,
    Object.keys(SELECTABLE)
      .map(Number)
      .sort((a, b) => a - b),
    '可直选编号必须升序、无缺号无重号（L_IDX 位次由这个顺序推出）',
  );
});

test('表驱动：20 条高级 COM 的编号与名称逐条一致', () => {
  const { ADVANCED_COM_IDS, ADVANCED_TRAIN_COMMAND } = load_const();

  assert.deepEqual(
    ADVANCED_TRAIN_COMMAND,
    ADVANCED,
    '高级 COM 的编号与名称必须逐条一致（升格后按钮标签取自这张表）',
  );
  assert.deepEqual(
    ADVANCED_COM_IDS,
    [
      67, 69, 70, 84, 111, 120, 121, 123, 124, 125, 126, 127, 128, 129, 130,
      131, 132, 133, 134, 208,
    ],
    '高级 COM 编号清单必须升序完整（升格目标全集）',
  );
});

test('静态名显示口径：名称列转小写（引擎装载名字表的行为），表外编号取不到名字', () => {
  const { train_command_name } = load_const();

  // 含拉丁字母的 8 条：玩家看到的是转小写后的文本（改动前的显示）。
  // 全角拉丁同样有小写形（'Ｐ' → 'ｐ'），64 号也在此列
  assert.equal(train_command_name(54), '野外play');
  assert.equal(train_command_name(55), '放置play');
  assert.equal(train_command_name(57), '羞耻play');
  assert.equal(train_command_name(58), '浴室play');
  assert.equal(train_command_name(59), '新妻play');
  assert.equal(train_command_name(64), '３ｐ');
  assert.equal(train_command_name(88), '使役魔兽play');
  assert.equal(train_command_name(89), '兽奸play');
  // 不含拉丁字母的名字原样
  assert.equal(train_command_name(0), '爱抚');
  assert.equal(train_command_name(128), '');
  // 表外编号：高级 COM 与任意乱数都取不到静态名（旧代码不读表外序号）
  assert.equal(train_command_name(67), '');
  assert.equal(train_command_name(84), '');
  assert.equal(train_command_name(999), '');
  assert.equal(train_command_name(-1), '');
});

test('派生：分发空间 = 可直选 101 ∪ 高级 20，两表不相交', () => {
  const { ADVANCED_COM_IDS, TRAIN_COMMAND_IDS } = load_const();
  const fixture = create_era_fixture();
  const {
    ADVANCED_COM_IDS: family_advanced,
    DECLARED_COM_IDS,
    DECLARED_TRAIN_IDS,
  } = fixture.load_module('system/train/com-family');

  assert.deepEqual(DECLARED_TRAIN_IDS, TRAIN_COMMAND_IDS);
  assert.deepEqual(family_advanced, ADVANCED_COM_IDS);
  assert.deepEqual(
    DECLARED_COM_IDS,
    [...TRAIN_COMMAND_IDS, ...ADVANCED_COM_IDS].sort((a, b) => a - b),
    '分发空间 = 可直选 ∪ 高级（升序）',
  );
  assert.equal(
    DECLARED_COM_IDS.length,
    121,
    '分发空间 121 段：101 可直选 + 20 高级',
  );
  for (const id of TRAIN_COMMAND_IDS) {
    assert.ok(!ADVANCED_COM_IDS.includes(id), `${id} 不得同时属于两张表`);
  }
});
