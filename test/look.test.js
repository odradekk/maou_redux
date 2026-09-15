/**
 * ere/chara/look-info.js 的行为测试（issue #389，N5 段 1）：
 * `%GET_LOOK_INFO(ARG, ARGS)%` 式中函数的全部 kind。
 *
 * 源: target/ERB/キャラ関数/LOOK.ERB  @GET_LOOK_INFO（:2885-3775）
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点），经模块公开导出
 * 直驱。本函数是纯函数（只有读取与拼接），无随机源、无输出——所以本文件
 * 一律用「预置素质 → 断言返回值」的表驱动写法，不注入随机。
 *
 * 表驱动的理由（派单简报的覆盖面标准）：本函数是**维度型**的（kind × 档位），
 * 挑点钉只能钉住挑中的那几个点；这里每个 kind 一张表走完整个值域，含
 * CASEELSE 兜底档与区间边界（20/50/…/200 归前一段这类重叠点单独钉）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 素质下标（与 ere/chara/look-info.js 的常量同名，测试侧独立写死防串改） */
const T = {
  个性: { 精英: 220 },
  种族: 314,
  种族2: 319,
  原种族: 321,
  现种族: 322,
  父亲种族: 323,
  母亲种族: 324,
  家族构成: 320,
  喜欢的东西: 317,
  成为勇者前的生活: 315,
  成为勇者的契机: 316,
  阴茎的状态: 318,
  头发颜色: 300,
  头发状态: 301,
  头发长度: 302,
  头发修剪方式: 303,
  发型: 304,
  目: 305,
  瞳色: 306,
  唇: 307,
  体型: 308,
  乳头: 309,
  阴毛状态: 310,
  魅力点: 312,
  癖: 313,
  男人: 122,
  扶她: 121,
  常识改变战斗: 281,
  常识改变日常: 283,
};

/**
 * 建一个夹具并预置若干素质（角色 ID 固定为 5）。
 * @param {Record<number, number>} talents 素质下标 → 值
 * @returns {object} 夹具
 */
function world(talents = {}) {
  const fixture = create_era_fixture();
  for (const [idx, value] of Object.entries(talents)) {
    fixture.store.set(`talent:5:${idx}`, value);
  }
  return fixture;
}

/**
 * 取 `chara/look-info` 的导出（每个用例独立夹具 → 独立模块实例）。
 * @param {Record<number, number>} talents 素质预置
 * @returns {object} 模块导出
 */
function load(talents = {}) {
  return world(talents).load_module('chara/look-info');
}

/**
 * 表驱动骨架：同一 kind 下逐条「素质值 → 期望串」。整张表共用一个夹具
 * （素质值逐条改写，模块读的是活存储），避免几百次重建夹具的开销。
 * @param {string} kind GET_LOOK_INFO 的分支名
 * @param {number} talent_idx 被读的素质下标
 * @param {Array<[number, string]>} cases [素质值, 期望串]
 * @param {string} note 断言里的说明
 */
function table(kind, talent_idx, cases, note) {
  test(`GET_LOOK_INFO「${kind}」：${note}`, () => {
    const fixture = create_era_fixture();
    const { get_look_info } = fixture.load_module('chara/look-info');
    for (const [value, expected] of cases) {
      fixture.store.set(`talent:5:${talent_idx}`, value);
      assert.equal(
        get_look_info(5, kind),
        expected,
        `${kind}：素质 ${talent_idx} = ${value}`,
      );
    }
  });
}

// —— 发色两张表（源 :2894 与 :2922 是两个 kind，表体不同） ——

table(
  '发色(颜色)',
  T.头发颜色,
  [
    [1, '金色'],
    [2, '栗色'],
    [3, '黑色'],
    [4, '红色'],
    [5, '银色'],
    [6, '蓝色'],
    [7, '绿色'],
    [8, '紫色'],
    [9, '白色'],
    [10, '暗金色'],
    [11, '粉色'],
    [0, '黑色'], // CASEELSE :2918
    [99, '黑色'], // CASEELSE
  ],
  '11 档 + CASEELSE 落「黑色」',
);

table(
  '头发颜色',
  T.头发颜色,
  [
    [1, '金发'],
    [2, '栗发'],
    [3, '黑发'],
    [4, '红发'],
    [5, '银发'],
    [6, '蓝发'],
    [7, '绿发'],
    [8, '紫发'],
    [9, '白发'],
    [10, '暗金发'],
    [11, '粉发'],
    [0, '黑发'], // CASEELSE :2946
    [12, '黑发'], // CASEELSE
  ],
  '11 档 + CASEELSE 落「黑发」',
);

table(
  '头发状态',
  T.头发状态,
  [
    [1, '直发'],
    [2, '卷发'],
    [3, '内卷发'],
    [4, '外卷发'],
    [5, '天然卷'],
    [6, '大波浪'],
    [0, 'ERROR'],
    [7, 'ERROR'],
    [99, 'ERROR'],
  ],
  '6 档 + CASEELSE 落 ERROR',
);

table(
  '头发长度',
  T.头发长度,
  [
    [1, '短'],
    [100, '短'], // 区间上界 :2968
    [101, '半长'], // 下一段下界 :2970
    [200, '半长'],
    [201, '长'],
    [300, '长'], // 区间上界 :2972
    [0, 'ERROR'],
    [301, 'ERROR'],
    [999, 'ERROR'],
  ],
  '三段闭区间 + 两侧越界落 ERROR',
);

table(
  '头发修剪方式',
  T.头发修剪方式,
  [
    [1, '基本剪法'],
    [2, '齐剪'],
    [3, '层剪'],
    [4, '碎发'],
    [0, 'ERROR'],
    [5, 'ERROR'],
  ],
  '4 档 + CASEELSE 落 ERROR',
);

table(
  '发型',
  T.发型,
  [
    [1, '自然'],
    [2, '中分'],
    [3, '不均分'],
    [4, '长束发'],
    [5, '马尾'],
    [6, '侧马尾'],
    [7, '垂发辫'],
    [8, '双马尾'],
    [9, '顶束发'],
    [10, '侧束发'],
    [11, '鱼骨辫'],
    [12, '卷发'],
    [0, 'ERROR'],
    [13, 'ERROR'],
  ],
  '12 档 + CASEELSE 落 ERROR',
);

table(
  '目',
  T.目,
  [
    [1, '细长眼'],
    [2, '大眼'],
    [3, '深邃眼'],
    [4, '吊眼'],
    [5, '水汪汪眼'],
    [6, '标准眼'],
    [7, '三白眼'],
    [8, '下垂眼'],
    [0, 'ERROR'],
    [9, 'ERROR'],
  ],
  '8 档 + CASEELSE 落 ERROR',
);

table(
  '瞳色',
  T.瞳色,
  [
    [1, '蓝色'],
    [2, '棕色'],
    [3, '灰色'],
    [4, '金色'],
    [5, '红色'],
    [6, '黑色'],
    [0, 'ERROR'],
    [7, 'ERROR'],
  ],
  '6 档 + CASEELSE 落 ERROR',
);

table(
  '唇',
  T.唇,
  [
    [1, '肉感的'],
    [2, '薄的'],
    [3, '丰润的'],
    [4, '标准'],
    [0, 'ERROR'],
    [5, 'ERROR'],
  ],
  '4 档 + CASEELSE 落 ERROR',
);

table(
  '体型',
  T.体型,
  [
    [1, '纤细'],
    [100, '纤细'], // :3072 上界
    [101, '标准'],
    [200, '标准'],
    [201, '丰满'],
    [300, '丰满'], // :3076 上界
    [0, 'ERROR'],
    [301, 'ERROR'],
  ],
  '三段闭区间 + 两侧越界落 ERROR',
);

table(
  '乳头',
  T.乳头,
  [
    [1, '粉红色'],
    [2, '褐色'],
    [3, '标准'],
    [4, '凹陷'],
    [0, 'ERROR'],
    [5, 'ERROR'],
  ],
  '4 档 + CASEELSE 落 ERROR',
);

table(
  '阴毛状态',
  T.阴毛状态,
  [
    [1, '白虎'],
    [2, '胎毛'], // :3100 下界
    [20, '胎毛'], // :3100 上界（与下一段 :3102 的下界 20 重叠 → 归前一段）
    [21, '新长的'],
    [50, '新长的'], // 重叠点归前一段
    [51, '稀薄'],
    [100, '稀薄'], // 重叠点归前一段
    [101, '标准'],
    [150, '标准'], // 重叠点归前一段
    [151, '浓密'],
    [200, '浓密'], // 重叠点归前一段
    [201, '硬毛'],
    [500, '硬毛'], // :3109 上界
    [0, 'ERROR'],
    [501, 'ERROR'],
  ],
  '七段闭区间（含全部重叠边界）+ CASEELSE 落 ERROR',
);

table(
  '魅力点',
  T.魅力点,
  [
    [1, '皮肤'],
    [2, '眼角'],
    [3, '鼻梁'],
    [4, '嘴角'],
    [5, '泪痣'],
    [6, '锁骨'],
    [7, '小臂'],
    [8, '手腕'],
    [9, '手'],
    [10, '手指'],
    [11, '肚脐'],
    [12, '美乳'],
    [13, '腰线'],
    [14, '臀部线条'],
    [15, '腿部线条'],
    [16, '膝盖'],
    [17, '脚踝'],
    [18, '脚跟'],
    [19, '背脊'],
    [20, '耳朵'],
    [21, '性器'],
    [22, '头发的光泽'],
    [23, '丰满的屁股'],
    [24, '长睫毛'],
    [25, '虎牙'],
    [26, '眉毛'],
    [27, '指甲'],
    [28, '寝癖'],
    [0, 'ERROR'],
    [30, 'ERROR'],
  ],
  '1-28 档 + CASEELSE 落 ERROR',
);

test('GET_LOOK_INFO「魅力点」CASE 29：扶她/男人返回自己的鸡鸡，否则私处', () => {
  // :3172-3176 源里用 PRINT；本实现返回同串（本文件头已判等价）
  const { get_look_info } = load({ [T.魅力点]: 29, [T.男人]: 1 });
  assert.equal(get_look_info(5, '魅力点'), '自己的鸡鸡');

  const futa = load({ [T.魅力点]: 29, [T.扶她]: 1 });
  assert.equal(futa.get_look_info(5, '魅力点'), '自己的鸡鸡');

  const female = load({ [T.魅力点]: 29 });
  assert.equal(female.get_look_info(5, '魅力点'), '私处');
});

table(
  '癖',
  T.癖,
  [
    [1, '舔嘴唇'],
    [2, '往后看'],
    [3, '摸头发'],
    [4, '用腿夹住手'],
    [5, '抱手臂'],
    [6, '手指交握'],
    [7, '抖腿'],
    [8, '打拍子'],
    [9, '仰视对方'],
    [10, '歪脖子'],
    [11, '叹气'],
    [12, '动作夸张'],
    [13, '频繁眨眼'],
    [14, '鼓腮'],
    [15, '咬紧牙关'],
    [16, '遮住嘴'],
    [17, '摸耳朵'],
    [18, '懒散'],
    [19, '咂嘴'],
    [20, '咬指甲'],
    [21, '挠鼻子'],
    [22, '扶额'],
    [23, '握拳'],
    [24, '用手指人'],
    [25, '说口头禅'],
    [26, '扭腰'],
    [27, '闭上一只眼'],
    [28, '眯眼'],
    [29, '歪嘴'],
    [30, '碎碎念'],
    [31, '总往角落躲'],
    [32, '估算物体长度'],
    [33, '说话越说越近'],
    [34, '舔手背'],
    [0, 'ERROR'],
    [35, 'ERROR'],
  ],
  '1-34 档 + CASEELSE 落 ERROR',
);

table(
  '种族',
  T.种族,
  [
    [0, '人类'],
    [1, '精灵'],
    [2, '狼人'],
    [3, '吸血鬼'],
    [4, '无头骑士'],
    [5, '龙族'],
    [6, '天使'],
    [7, '暗精灵'],
    [8, '堕天使'],
    [9, '魔族'],
    [10, '霍比特人'],
    [11, '矮人'],
    [12, 'ERROR'],
    [99, 'ERROR'],
  ],
  '0-11 档 + CASEELSE 落 ERROR',
);

table(
  '种族2',
  T.种族2,
  [
    [1, '兽人'],
    [2, '史莱姆'],
    [3, '昆虫'],
    [4, '植物'],
    [5, '触手'], // CASE 5, 11 同一个词
    [11, '触手'],
    [6, '妖精'],
    [7, '巨人'],
    [8, '魔族'], // CASE 8,9
    [9, '魔族'],
    [10, '魔兽'], // CASE 10, 12
    [12, '魔兽'],
  ],
  '12 档（含三处合并 CASE）',
);

table(
  '种族2',
  T.种族2,
  [
    [0, '$0'],
    [13, '$13'],
    [-1, '$-1'],
  ],
  'CASEELSE = TOSTR(v, "$${0}") 的字面 $ 前缀',
);

test('GET_LOOK_INFO「种族12」：精英（TALENT:220）走种族2，否则走种族', () => {
  // :3309-3314 GOTO $INFO_种族 / $INFO_种族2
  const elite = load({ [T.种族]: 2, [T.种族2]: 7, 220: 1 });
  assert.equal(elite.get_look_info(5, '种族12'), '巨人');

  const normal = load({ [T.种族]: 2, [T.种族2]: 7 });
  assert.equal(normal.get_look_info(5, '种族12'), '狼人');
});

table(
  '成为勇者前的生活',
  T.成为勇者前的生活,
  [
    [0, '不明'],
    [1, '学生'],
    [3, '农民'],
    [4, '渔民'],
    [5, '娼妓'],
    [6, '小偷'],
    [7, '乞丐'],
    [8, '贵族'],
    [9, '贫民'],
    [10, '守墓人'],
    [13, '预言家'],
    [14, '占卜师'],
    [15, '商人'],
    [16, '采药人'],
    [17, '隐士'],
    [18, '面包师'],
    [19, '军人'],
    [20, '奴隶'],
    [90, '淫乱的产物'],
    [91, '堕落的结果'],
    [92, '爱的结晶'],
    [93, '交欢的副产品'],
    [94, '魔族的孽种'],
    [22, 'ERROR'],
    [99, 'ERROR'],
  ],
  '性别中立档 + CASEELSE 落 ERROR',
);

test('GET_LOOK_INFO「成为勇者前的生活」：四档按性别分叉的女性侧', () => {
  // :3336-3340 / :3356-3360 / :3366-3370 / :3378-3382（男人素质未置位）
  const fixture = create_era_fixture();
  const { get_look_info } = fixture.load_module('chara/look-info');
  for (const [value, expected] of [
    [2, '修女'],
    [11, '巫女'],
    [12, '圣女'],
    [21, '主妇'],
  ]) {
    fixture.store.set(`talent:5:${T.成为勇者前的生活}`, value);
    assert.equal(get_look_info(5, '成为勇者前的生活'), expected);
  }
});

test('GET_LOOK_INFO「成为勇者前的生活」：男人走四档的男性侧', () => {
  // :3336-3340 / :3356-3360 / :3366-3370 / :3378-3382
  const cases = [
    [2, '修士'],
    [11, '巫者'],
    [12, '圣者'],
    [21, '主夫'],
  ];
  for (const [value, expected] of cases) {
    const { get_look_info } = load({
      [T.成为勇者前的生活]: value,
      [T.男人]: 1,
    });
    assert.equal(get_look_info(5, '成为勇者前的生活'), expected);
  }
});

table(
  '成为勇者的契机',
  T.成为勇者的契机,
  [
    [0, '不明'],
    [1, '命运的引导'],
    [2, '为了钱'],
    [3, '受到了上天启示'],
    [4, '因使命感而热血沸腾'],
    [5, '对日常感到厌倦'],
    [6, '经历无尽悲伤后'],
    [7, '拯救故乡'],
    [8, '复仇'],
    [9, '国王的任命'],
    [10, '赎罪'],
    [11, '自暴自弃'],
    [12, '纯属意外'],
    [13, '被命令了'],
    [14, '无可奈何'],
    [15, '测试自己的力量'],
    [16, '为了和平'],
    [17, '为了正义'],
    [18, '梦见自己有所作为'],
    [19, '获得了力量'],
    [20, '旅行的结果'],
    [90, '父母的嘱咐'],
    [91, '憧憬魔王'],
    [92, '为了出人头地'],
    [93, '为了报恩'],
    [94, '被恶魔诱惑'],
    [21, 'ERROR'],
    [95, 'ERROR'],
  ],
  '21 档 + 5 个配下档 + CASEELSE 落 ERROR',
);

table(
  '阴茎的状态',
  T.阴茎的状态,
  [
    [1, '巨根'],
    [2, '短小包茎'],
    [3, '包茎'],
    [4, '马阴茎'],
    [0, '普通'], // CASEELSE :3457
    [5, '普通'], // CASEELSE
  ],
  '4 档 + CASEELSE 落「普通」',
);

test('GET_LOOK_INFO「职业」：200-228 取最后一个真值档的素质名', () => {
  // :3460-3472 FOR LOCAL, 200, 229（上界开区间）——多个真值时取后者
  const single = world({ 205: 1 });
  single.store.set('talentname:205', '剑士');
  assert.equal(
    single.load_module('chara/look-info').get_look_info(5, '职业'),
    '剑士',
  );

  const both = world({ 205: 1, 228: 1 });
  both.store.set('talentname:205', '剑士');
  both.store.set('talentname:228', '大魔王');
  assert.equal(
    both.load_module('chara/look-info').get_look_info(5, '职业'),
    '大魔王',
    '后扫到的档覆盖前者',
  );
});

test('GET_LOOK_INFO「职业」：无职业时魔王（cid 0）报魔王，其余报无', () => {
  const master = load();
  assert.equal(master.get_look_info(0, '职业'), '魔王');

  const other = load();
  assert.equal(other.get_look_info(5, '职业'), '无');
});

test('GET_LOOK_INFO「职业」：扫的区间是 200-228，199/229 不在内', () => {
  // 区间边界：源 :3462 `FOR LOCAL, 200, 229` 上界开区间
  const probe = (talents, name) => {
    const fixture = world(talents);
    for (const [idx, label] of Object.entries(name)) {
      fixture.store.set(`talentname:${idx}`, label);
    }
    return fixture.load_module('chara/look-info').get_look_info(5, '职业');
  };
  assert.equal(probe({ 199: 1 }, { 199: '圈外' }), '无');
  assert.equal(probe({ 229: 1 }, { 229: '圈外' }), '无');
  assert.equal(probe({ 200: 1 }, { 200: '下界' }), '下界');
  assert.equal(probe({ 228: 1 }, { 228: '上界' }), '上界');
});

test('GET_LOOK_INFO「性格」：160-178 优先，全空才回落 10-18', () => {
  const probe = (talents, names) => {
    const fixture = world(talents);
    for (const [idx, label] of Object.entries(names)) {
      fixture.store.set(`talentname:${idx}`, label);
    }
    return fixture.load_module('chara/look-info').get_look_info(5, '性格');
  };
  assert.equal(probe({ 170: 1 }, { 170: '高姿态' }), '高姿态');
  assert.equal(probe({ 15: 1 }, { 15: '嚣张' }), '嚣张');
  assert.equal(
    probe({ 170: 1, 15: 1 }, { 170: '高姿态', 15: '嚣张' }),
    '高姿态',
    '两段都有真值时只认前一段',
  );
  assert.equal(probe({}, {}), '不明');
});

test('GET_LOOK_INFO「性格」：两段扫描区间各含自己的上界与下界', () => {
  // :3475 `FOR LOCAL, 160, 179` / :3480 `FOR LOCAL, 10, 19`
  const probe = (talents, names) => {
    const fixture = world(talents);
    for (const [idx, label] of Object.entries(names)) {
      fixture.store.set(`talentname:${idx}`, label);
    }
    return fixture.load_module('chara/look-info').get_look_info(5, '性格');
  };
  assert.equal(probe({ 160: 1 }, { 160: 'A' }), 'A');
  assert.equal(probe({ 178: 1 }, { 178: 'B' }), 'B');
  assert.equal(
    probe({ 179: 1, 18: 1 }, { 179: '圈外', 18: 'C' }),
    'C',
    '179 不在扫描面内',
  );
  assert.equal(probe({ 10: 1 }, { 10: 'D' }), 'D');
  assert.equal(probe({ 18: 1 }, { 18: 'E' }), 'E');
  assert.equal(probe({ 9: 1 }, { 9: '圈外' }), '不明');
  assert.equal(probe({ 19: 1 }, { 19: '圈外' }), '不明');
});

// —— 婚史：TALENT:320 的十进制压缩码解码 ——

test('GET_LOOK_INFO「婚史」：保密/无两档', () => {
  // :3493-3500 LOCAL:1 = LOCAL % 10
  const secret = load({ [T.家族构成]: 20 }); // 个位 0 且非 0
  assert.equal(secret.get_look_info(5, '婚史'), '婚史保密');

  const none = load({ [T.家族构成]: 0 });
  assert.equal(none.get_look_info(5, '婚史'), '无');
});

test('GET_LOOK_INFO「婚史」：CASE 0 未婚，CFLAG:601 != 0 时加「原」', () => {
  // :3516-3521
  const plain = load({ [T.家族构成]: 1 });
  assert.equal(plain.get_look_info(5, '婚史'), '未婚');

  const remarried = world({ [T.家族构成]: 1 });
  remarried.store.set('cflag:5:601', 900);
  assert.equal(
    remarried.load_module('chara/look-info').get_look_info(5, '婚史'),
    '原未婚',
  );
});

test('GET_LOOK_INFO「婚史」：五档婚姻状态 × 三类配偶称呼', () => {
  // :3522-3558：万位 = 婚姻状态，十亿位 = 夫妻性别码
  const cases = [
    // [家族码, 期望串]
    [10001, '已与丈夫结婚'], // 万位 1、十亿位 0
    [10001 + 4000000000, '已与丈夫结婚'], // 码 4 仍归丈夫
    [10001 + 8000000000, '已与丈夫结婚'], // 码 8 仍归丈夫
    [10001 + 1000000000, '已与扶她妻子结婚'], // 码 1
    [10001 + 5000000000, '已与扶她妻子结婚'],
    [10001 + 7000000000, '已与扶她妻子结婚'],
    [10001 + 2000000000, '已与妻子结婚'], // 码 2 → CASEELSE
    [20001, '已与原丈夫离婚'], // 万位 2
    [30001, '已与原丈夫复婚'], // 万位 3
    [40001, '已与原丈夫离婚后重新结婚'], // 万位 4
    [50001, '未亡人'], // 万位 5
    [60001, '秘密'], // 万位 6 → CASEELSE
  ];
  for (const [family, expected] of cases) {
    const { get_look_info } = load({ [T.家族构成]: family });
    assert.equal(get_look_info(5, '婚史'), expected, `家族码 ${family}`);
  }
});

// —— 家族：双亲指定 / 家族码解码 ——

test('GET_LOOK_INFO「家族」：双亲指定时按素质/物品名拼串', () => {
  // :3564-3587：>1000 是素质名、否则是物品名
  const fixture = world({
    [T.父亲种族]: 1000 + 12,
    [T.母亲种族]: 345,
  });
  fixture.store.set('talentname:12', '刚强');
  fixture.store.set('itemname:345', '蜥蜴人');
  const { get_look_info } = fixture.load_module('chara/look-info');
  assert.equal(get_look_info(5, '家族'), '刚强的父亲，蜥蜴人的母亲，');
});

test('GET_LOOK_INFO「家族」：只有一方指定时不走双亲支', () => {
  // :3564 判据是与——单方指定落家族码解码，码为 0 → 家族保密
  const { get_look_info } = load({ [T.父亲种族]: 1005 });
  assert.equal(get_look_info(5, '家族'), '家族保密');
});

test('GET_LOOK_INFO「家族」：个位为 0 → 家族保密；全员皆空 → 孤身一人', () => {
  // :3588-3594 LOCAL:1 = LOCAL % 10（注意与「婚史」不同：这里不排除 0 本身）
  const secret = load({ [T.家族构成]: 10 });
  assert.equal(secret.get_look_info(5, '家族'), '家族保密');

  const zero = load({ [T.家族构成]: 0 });
  assert.equal(zero.get_look_info(5, '家族'), '家族保密');

  const alone = load({ [T.家族构成]: 1 });
  assert.equal(alone.get_look_info(5, '家族'), '孤身一人');
});

test('GET_LOOK_INFO「家族」：配偶档位 1 与 3 都出称呼，其余不出', () => {
  // :3600-3621 LOCAL:1 == 1 与 == 3 两支同体
  for (const [marriage, expected] of [
    [1, '丈夫'],
    [3, '丈夫'],
    [0, ''],
    [2, ''],
  ]) {
    const { get_look_info } = load({ [T.家族构成]: 1 + marriage * 10000 });
    assert.equal(get_look_info(5, '家族'), expected || '孤身一人');
  }
});

test('GET_LOOK_INFO「家族」：六类亲属的单个/多个两种写法', () => {
  // :3623-3671：一位数 = 1 时不带数量、>1 时 `TOSTR(v, " 娘x{0}")`（格式串
  // 自带前导空格，故两式都带空格；家族码 = 1 + 值×位）
  const cases = [
    // [位, 值, 期望串]
    [100, 1, ' 娘'],
    [100, 2, ' 娘x2'],
    [1000, 1, ' 儿'],
    [1000, 2, ' 儿x2'],
    [100000, 1, ' 姊'],
    [100000, 2, ' 姊x2'],
    [1000000, 1, ' 兄'],
    [1000000, 2, ' 兄x2'],
    [10000000, 1, ' 妹'],
    [10000000, 2, ' 妹x2'],
    [100000000, 1, ' 弟'],
    [100000000, 2, ' 弟x2'],
  ];
  for (const [place, value, expected] of cases) {
    const { get_look_info } = load({ [T.家族构成]: 1 + value * place });
    assert.equal(get_look_info(5, '家族'), expected, `位 ${place} 值 ${value}`);
  }
});

test('GET_LOOK_INFO「家族」：六类亲属可叠加，顺序固定为娘儿姊兄妹弟', () => {
  const { get_look_info } = load({
    [T.家族构成]: 1 + 100 + 1000 + 100000 + 1000000 + 10000000 + 100000000,
  });
  assert.equal(get_look_info(5, '家族'), ' 娘 儿 姊 兄 妹 弟');
});

// —— 原种族 / 现种族 ——

table(
  '原种族',
  T.原种族,
  [
    [0, '人类'],
    [11, '矮人'],
    [12, '人类'], // CASEELSE 递归走「种族」，而 TALENT:314 未置位 → 0 档
  ],
  '0-11 与「种族」同表；越界码不是 ERROR 而是回落',
);

test('GET_LOOK_INFO「原种族」：未登记码回落到「种族」分支（源 :3701 RESTART）', () => {
  const { get_look_info } = load({ [T.原种族]: 99, [T.种族]: 3 });
  assert.equal(get_look_info(5, '原种族'), '吸血鬼');

  // 回落目标本身也可能落 CASEELSE → ERROR
  const neither = load({ [T.原种族]: 99, [T.种族]: 99 });
  assert.equal(neither.get_look_info(5, '原种族'), 'ERROR');
});

test('GET_LOOK_INFO「现种族」：INRANGE(v, 100, 220) 走物品名，否则 ERROR', () => {
  // :3704-3709
  for (const [value, expected] of [
    [100, '蜥蜴人'],
    [132, '小恶魔'],
    [220, '边界'],
  ]) {
    const fixture = world({ [T.现种族]: value });
    fixture.store.set(`itemname:${value}`, expected);
    const { get_look_info } = fixture.load_module('chara/look-info');
    assert.equal(get_look_info(5, '现种族'), expected, `现种族 ${value}`);
  }
  for (const value of [0, 99, 221]) {
    const { get_look_info } = load({ [T.现种族]: value });
    assert.equal(get_look_info(5, '现种族'), 'ERROR', `现种族 ${value}`);
  }
});

// —— 常识改变两档 ——

table(
  '常识改变【战斗】',
  T.常识改变战斗,
  [
    [0, '不改变'],
    [1, '奉侍战斗'],
    [2, '跪地求饶'],
    [3, ''],
    [4, ''],
    [5, ''],
    [6, ''],
    [7, ''],
    [8, ''],
    [9, ''],
    [10, ''],
    [11, ''],
    [12, '不改变'], // CASEELSE
    [-1, '不改变'],
  ],
  '0-2 有名 + 3-11 空串 + CASEELSE 落「不改变」',
);

table(
  '常识改变【日常】',
  T.常识改变日常,
  [
    [0, '不改变'],
    [1, '服侍乞丐'],
    [2, '野外露出'],
    [3, '痴态公开'],
    [4, '公众便器'],
    [5, '兽奸狂热'],
    [6, ''],
    [7, ''],
    [8, ''],
    [9, ''],
    [10, ''],
    [11, ''],
    [12, '不改变'],
    [-1, '不改变'],
  ],
  '0-5 有名 + 6-11 空串 + CASEELSE 落「不改变」',
);

// —— 兜底 ——

test('GET_LOOK_INFO：未登记的 kind 返回空串（源 :3772-3773 的 ELSE）', () => {
  const { get_look_info } = load({ [T.种族]: 1 });
  assert.equal(get_look_info(5, '不存在的kind'), '');
  assert.equal(get_look_info(5, ''), '');
});

test('GET_LOOK_INFO：kind 严格区分——「发色(颜色)」与「头发颜色」不是同一张表', () => {
  const { get_look_info } = load({ [T.头发颜色]: 5 });
  assert.equal(get_look_info(5, '发色(颜色)'), '银色');
  assert.equal(get_look_info(5, '头发颜色'), '银发');
});

test('GET_LOOK_INFO：读未声明的角色返回兜底值而非抛错（引擎 undefined → 0）', () => {
  const { get_look_info } = load();
  assert.equal(get_look_info(999, '种族'), '人类', '素质 0 档');
  assert.equal(get_look_info(999, '目'), 'ERROR', '0 无档 → CASEELSE');
  assert.equal(get_look_info(999, '职业'), '无', '非魔王且无岗位');
});

// ===========================================================================
// ere/chara/look.js：@LOOK_SET（:4-813）
// ===========================================================================

/**
 * 按「上界 → 返回值」给值的随机源：命中给定上界时返回映射值，其余返回
 * fallback（缺省 0）。映射值给数组时按序消费、用尽后重复最后一个——用于
 * 「同一次调用里同一上界要吐不同值」的重掷场景。
 * @param {Record<number, number|number[]>} map 上界 → 值
 * @param {number} [fallback] 未命中时的返回值
 * @returns {(n: number) => number}
 */
function steer(map, fallback = 0) {
  const queues = new Map();
  for (const [bound, value] of Object.entries(map)) {
    queues.set(Number(bound), Array.isArray(value) ? [...value] : [value]);
  }
  return (n) => {
    const queue = queues.get(n);
    if (!queue || queue.length === 0) return fallback;
    return queue.length === 1 ? queue[0] : queue.shift();
  };
}

/**
 * 按「上界 + 第几次调用」给值（键形如 `'20#0'`）：同一上界被多个段消费时
 * （RAND:20 依次落在 理由 / 喜好 / 家族婚姻 / 家族子女 / 家族性别五处）
 * 用它精确定位某一次，其余返回该上界的单值映射或 fallback。
 *
 * **fallback 取 0**：常数随机源下有两个重掷循环会死转（源 :514 的修道女
 * 重掷 `Q == 2 && 法术 == 0`、:276/:311 的魅力点与癖重掷），0 是唯一不触发
 * 任何一支的取值。
 * @param {Record<string, number>} map 键 `上界#序号` 或 `上界` → 值
 * @param {number} [fallback] 都未命中时的返回值
 * @returns {(n: number) => number}
 */
function steer_at(map, fallback = 0) {
  const counts = new Map();
  const queues = new Map();
  // 值与 steer 同款：数组当队列按序消费、用尽后重复最后一个。**不做这一步
  // 会把整个数组当返回值发出去**——`rand_n(2) === 0` 于是恒假，分支全走偏
  // （#389 返工时在「未婚の母」用例上踩到过：断言看着绿，走的是别的支）
  const pick = (key) => {
    const value = map[key];
    if (!Array.isArray(value)) return value;
    const queue = queues.get(key) ?? [...value];
    queues.set(key, queue);
    return queue.length > 1 ? queue.shift() : queue[0];
  };
  return (n) => {
    const at = counts.get(n) ?? 0;
    counts.set(n, at + 1);
    if (Object.hasOwn(map, `${n}#${at}`)) return pick(`${n}#${at}`);
    if (Object.hasOwn(map, `${n}`)) return pick(`${n}`);
    return fallback;
  };
}

/** RAND:N 恒 0 */
const always = () => 0;
/** RAND:N 恒 n-1（上界） */
const top = (n) => n - 1;

/**
 * LOOK_SET 的驱动面：一个夹具、自增角色 ID——每个用例各占一个角色，
 * 互不污染，省掉逐用例重建夹具的开销。
 * @returns {object} 驱动面
 */
function look_world() {
  const fixture = create_era_fixture();
  const mod = fixture.load_module('chara/look');
  let next_cid = 100;
  return {
    fixture,
    mod,
    run(arg, rand = always) {
      const cid = this.reserve();
      mod.look_set(cid, arg, rand);
      return cid;
    },
    /** 只占一个全新角色号、不跑 LOOK_SET（供「先置素质再跑」的用例） */
    reserve() {
      const cid = next_cid;
      next_cid += 1;
      return cid;
    },
    run_again(cid, arg, rand = always) {
      mod.look_set(cid, arg, rand);
      return cid;
    },
    talent(cid, idx) {
      return fixture.store.get(`talent:${cid}:${idx}`) ?? 0;
    },
    set_talent(cid, idx, value) {
      fixture.store.set(`talent:${cid}:${idx}`, value);
    },
    cflag(cid, idx) {
      return fixture.store.get(`cflag:${cid}:${idx}`) ?? 0;
    },
    abl(cid, idx) {
      return fixture.store.get(`abl:${cid}:${idx}`) ?? 0;
    },
    cstr(cid, idx) {
      return fixture.store.get(`cstr:${cid}:${idx}`);
    },
    exp(cid, idx) {
      return fixture.store.get(`exp:${cid}:${idx}`) ?? 0;
    },
  };
}

/**
 * 逐条「掷值 → 素质期望值」的表驱动骨架（只断言目标素质）。
 * @param {number} talent_idx 目标素质下标
 * @param {number} bound 被 steer 的随机上界
 * @param {Array<[number, number]>} cases [掷值, 期望素质值]
 * @param {string} note 断言说明
 */
function look_table(talent_idx, bound, cases, note) {
  test(`LOOK_SET 素质 ${talent_idx}：${note}`, () => {
    const w = look_world();
    for (const [roll, expected] of cases) {
      const cid = w.run(0, steer({ [bound]: roll }));
      assert.equal(w.talent(cid, talent_idx), expected, `掷 ${roll}`);
    }
  });
}

look_table(
  300,
  100,
  [
    [0, 11],
    [4, 11],
    [5, 8],
    [14, 8],
    [15, 9],
    [20, 9],
    [21, 6],
    [30, 6],
    [31, 7],
    [40, 7],
    [41, 2],
    [50, 2],
    [51, 1],
    [60, 1],
    [61, 3],
    [79, 3],
    [80, 4],
    [89, 4],
    [90, 10],
    [94, 10],
    [95, 5],
    [99, 5],
  ],
  '头发颜色 11 档（:14-51 的区间边界逐条）',
);

test('LOOK_SET：TALENT:300 已设定时整段跳过（不重掷）', () => {
  const w = look_world();
  const cid = w.run(0, steer({ 100: 99 }));
  assert.equal(w.talent(cid, 300), 5, '首次掷到 99 → 銀髪');
  w.run_again(cid, 0, steer({ 100: 0 }));
  assert.equal(w.talent(cid, 300), 5, '已设定则保留，不重掷');
});

look_table(
  301,
  12,
  [
    [0, 1],
    [6, 1],
    [7, 2],
    [8, 3],
    [9, 4],
    [10, 5],
    [11, 6],
  ],
  '头发状态 6 档（:55-73）',
);

look_table(
  302,
  6,
  [
    [0, 1],
    [1, 1],
    [2, 201],
    [3, 201],
    [4, 101],
    [5, 201],
  ],
  '头发长度三档（:77-87）',
);

test('LOOK_SET：未熟（TALENT:135）在调用前已置位 → 头发长度恒 1', () => {
  const w = look_world();
  for (const roll of [0, 2, 4, 5]) {
    const cid = w.run(0, always);
    w.set_talent(cid, 135, 1);
    w.run_again(cid, 0, steer({ 6: roll }));
    assert.equal(w.talent(cid, 302), 1, `未熟角色掷 ${roll}`);
  }
});

look_table(
  303,
  6,
  [
    [0, 4],
    [1, 4],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
  ],
  '头发修剪方式（源 :93-99 的 ELSEIF 3/4 不可达，Q >= 2 → 基本剪法）',
);

test('LOOK_SET 素质 304：发型按头发长度三段取不同上界', () => {
  // :119-127 短(1-100) → RAND:3 / 半长(101-200) → RAND:10 / 长(201-300) → RAND:12
  const cases = [
    [0, 3, 2, 3], // 短：长度掷 0 → 302 = 1 → RAND:3
    [4, 10, 9, 10], // 半长：长度掷 4 → 302 = 101
    [2, 12, 11, 12], // 长：长度掷 2 → 302 = 201
  ];
  for (const [len_roll, style_bound, style_roll, expected] of cases) {
    const w = look_world();
    const cid = w.run(0, steer({ 6: len_roll, [style_bound]: style_roll }));
    assert.equal(w.talent(cid, 304), expected, `长度掷 ${len_roll}`);
  }
});

look_table(
  305,
  100,
  [
    [0, 1],
    [10, 1],
    [11, 2],
    [20, 2],
    [21, 3],
    [25, 3],
    [26, 4],
    [35, 4],
    [36, 5],
    [40, 5],
    [41, 8],
    [45, 8],
    [46, 7],
    [48, 7],
    [49, 6],
    [99, 6],
  ],
  '目 8 档（:130-157 的区间边界逐条）',
);

look_table(
  306,
  100,
  [
    [0, 1],
    [40, 1],
    [41, 2],
    [60, 2],
    [61, 6],
    [80, 6],
    [81, 3],
    [97, 3],
    [98, 4],
    [99, 5],
  ],
  '瞳色 6 档（:160-179）',
);

look_table(
  307,
  6,
  [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [5, 4],
  ],
  '唇 4 档（:182-195）',
);

look_table(
  308,
  3,
  [
    [0, 300],
    [1, 1],
    [2, 150],
  ],
  '体型 3 档（含数值 300/1/150）',
);

look_table(
  309,
  6,
  [
    [0, 1],
    [1, 2],
    [2, 4],
    [3, 3],
    [5, 3],
  ],
  '乳头 4 档（:210-223）',
);

test('LOOK_SET 素质 311/310：阴毛生长极限 6 档，状态同步', () => {
  for (const [roll, expected] of [
    [0, 1],
    [20, 1],
    [21, 20],
    [45, 20],
    [46, 50],
    [70, 50],
    [71, 100],
    [100, 100],
    [101, 150],
    [130, 150],
    [131, 201],
    [149, 201],
  ]) {
    const w = look_world();
    const cid = w.run(0, steer({ 150: roll }));
    assert.equal(w.talent(cid, 311), expected, `生长极限掷 ${roll}`);
    assert.equal(w.talent(cid, 310), expected, '状态 = 生长极限（:246-247）');
  }
});

test('LOOK_SET 素质 318/133：阴茎 4 档 + 包茎早泄判定', () => {
  for (const [roll, expected] of [
    [0, 0],
    [50, 0],
    [51, 3],
    [100, 3],
    [101, 2],
    [130, 2],
    [131, 1],
    [149, 1],
  ]) {
    const w = look_world();
    const cid = w.run(0, steer({ 150: roll, 10: 1 }));
    assert.equal(w.talent(cid, 318), expected, `阴茎掷 ${roll}`);
    assert.equal(w.talent(cid, 133), 0, '未中早泄判定');
  }

  for (const [roll, hit] of [
    [101, 1],
    [51, 1],
    [0, 0],
    [131, 0],
  ]) {
    const w = look_world();
    const cid = w.run(0, steer({ 150: roll, 10: 0 }));
    assert.equal(w.talent(cid, 133), hit, `阴茎掷 ${roll} 的早泄`);
  }
});

test('LOOK_SET 素质 312：魅力点 1-28，贫乳不能掷到 12', () => {
  const w = look_world();
  for (const [roll, expected] of [
    [0, 1],
    [26, 27],
    [27, 28],
  ]) {
    const cid = w.run(0, steer({ 28: roll }));
    assert.equal(w.talent(cid, 312), expected, `掷 ${roll}`);
  }

  const cid = w.run(0, always);
  w.set_talent(cid, 109, 1);
  w.run_again(cid, 0, steer({ 28: [11, 0] }));
  assert.equal(w.talent(cid, 312), 1, '贫乳掷到 12 重新掷到 0 → 1');

  const cid2 = w.run(0, steer({ 28: 11 }));
  assert.equal(w.talent(cid2, 312), 12, '非贫乳掷到 12 → 保留');
});

test('LOOK_SET 素质 312/121：魅力点 24 给扶她机会，成不了则重掷', () => {
  const got = look_world();
  // RAND:28 给队列 [23, 5]：命中 24 档后若没成扶她还要再掷一次，队列必须有
  // 第二项——只给单值会让重掷循环在变异下空转（M8311 自验时踩到过）
  const cid_futa = got.run(0, steer({ 28: [23, 5], 40: 0 }));
  assert.equal(got.talent(cid_futa, 312), 24, '成扶她 → 保留 24');
  assert.equal(got.talent(cid_futa, 121), 1, '扶她素质置位');

  const missed = look_world();
  const cid_re = missed.run(0, steer({ 28: [23, 5], 40: 1 }));
  assert.equal(missed.talent(cid_re, 312), 6, '重掷落在下一掷（5 → 6）');
  assert.equal(missed.talent(cid_re, 121), 0, '未成扶她');

  const male = look_world();
  const cid_male = male.run(0, always);
  male.set_talent(cid_male, 122, 1);
  male.run_again(cid_male, 0, steer({ 28: 23, 40: 0 }));
  assert.equal(male.talent(cid_male, 312), 24, '男人不受 40 掷骰影响');
  assert.equal(male.talent(cid_male, 121), 0, '男人不成扶她');
});

test('LOOK_SET 素质 313：癖 1-34，金红桃（167）掷到 25 重掷', () => {
  const w = look_world();
  for (const [roll, expected] of [
    [0, 1],
    [33, 34],
  ]) {
    const cid = w.run(0, steer({ 34: roll }));
    assert.equal(w.talent(cid, 313), expected, `掷 ${roll}`);
  }

  const cid = w.run(0, always);
  w.set_talent(cid, 167, 1);
  w.run_again(cid, 0, steer({ 34: [24, 0] }));
  assert.equal(w.talent(cid, 313), 1, '说话不能 → 重掷到 1');

  const cid2 = w.run(0, steer({ 34: 24 }));
  assert.equal(w.talent(cid2, 313), 25, '非金红桃 → 保留 25');
});

test('LOOK_SET 素质 314：非精英 11 档（:331-401）', () => {
  for (const [roll, expected] of [
    [0, 0],
    [99, 0],
    [100, 10],
    [119, 10],
    [120, 11],
    [139, 11],
    [140, 1],
    [159, 1],
    [160, 2],
    [169, 2],
    [170, 3],
    [179, 3],
    [180, 4],
    [189, 4],
    [190, 5],
    [197, 5],
    [198, 6],
    [199, 6],
  ]) {
    const w = look_world();
    const cid = w.run(0, steer({ 200: roll, 40: 1, 10: 4 }));
    assert.equal(w.talent(cid, 314), expected, `种族掷 ${roll}`);
  }
});

test('LOOK_SET 素质 314：ARG 指定种族（-1 人类 / 10 / 11 / 其余码）', () => {
  for (const [arg, expected] of [
    [-1, 0],
    [10, 10],
    [11, 11],
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [7, 7],
  ]) {
    const w = look_world();
    const cid = w.run(arg, steer({ 40: 1, 10: 4 }));
    assert.equal(w.talent(cid, 314), expected, `ARG = ${arg}`);
  }
});

test('LOOK_SET：霍比特/矮人的种族副作用（小体型、巨乳系清零、阴毛倾向）', () => {
  const hobbit = look_world();
  const cid_h = hobbit.run(0, steer({ 200: 100, 10: 3 }));
  assert.equal(hobbit.talent(cid_h, 314), 10);
  assert.equal(hobbit.talent(cid_h, 100), 1, '娇小');
  assert.equal(hobbit.talent(cid_h, 109), 1, '非男人补贫乳');
  for (const idx of [116, 114, 119, 110, 99]) {
    assert.equal(hobbit.talent(cid_h, idx), 0, `素质 ${idx} 清零`);
  }
  assert.equal(hobbit.talent(cid_h, 311), 1, 'RAND:10 <= 3 → 無毛');

  const dwarf = look_world();
  const cid_d = dwarf.run(0, steer({ 200: 120, 10: 3 }));
  assert.equal(dwarf.talent(cid_d, 314), 11);
  assert.equal(dwarf.talent(cid_d, 311), 201, 'RAND:10 <= 3 → 剛毛');

  const none = look_world();
  const cid_n = none.run(0, steer({ 200: 100, 10: 4, 150: 149 }));
  assert.equal(
    none.talent(cid_n, 311),
    201,
    'RAND:10 = 4 → 不改阴毛（保留 150 掷出的 201）',
  );
});

test('LOOK_SET：精灵/人狼/吸血鬼/无头骑士/天使的善恶值与能力者', () => {
  const cases = [
    [140, 1, 20, 0],
    [160, 2, -20, 0],
    [170, 3, -40, 0],
    [180, 4, -40, 279],
    [198, 6, 40, 278],
  ];
  for (const [roll, race, delta, ability] of cases) {
    const w = look_world();
    // RAND:20 序列：#0 理由给 4（q=5，不增减）、#1 喜好给 0（q=1，不增减）
    // ——只留种族那一次 karma 落在 cflag:151 上
    const cid = w.run(
      0,
      steer_at({ '20#0': 4, '20#1': 0, 200: roll, 40: 0, 10: 4 }),
    );
    assert.equal(w.talent(cid, 314), race, `种族 ${race}`);
    assert.equal(w.cflag(cid, 151), delta, `种族 ${race} 的善恶值增减`);
    if (ability) {
      assert.equal(w.talent(cid, ability), 1, `素质 ${ability} 置位`);
    }
  }

  const w = look_world();
  const cid = w.run(
    0,
    steer_at({ '20#0': 4, '20#1': 0, 200: 198, 40: 1, 10: 4 }),
  );
  assert.equal(w.talent(cid, 278), 0, 'RAND:40 != 0 → 不置能力者');
});

test('LOOK_SET 素质 314：精英（220）恒 9 + 种族2 特性各档', () => {
  const cases = [
    [1, [472], []],
    [2, [261, 471], []],
    [3, [240, 474], []],
    [4, [262, 473], []],
    [5, [262, 476], []],
    [11, [262, 476], []],
    [6, [263, 478], [99, 100]],
    [7, [], []],
    [8, [245, 246, 247, 485], []],
    [9, [245, 246, 247, 481], []],
  ];
  for (const [race2, set_idx, clear_idx] of cases) {
    const w = look_world();
    const cid = w.run(0, always);
    w.set_talent(cid, 220, 1);
    w.set_talent(cid, 319, race2);
    w.run_again(cid, 0, steer({ 4: 0, 10: 0 }));
    assert.equal(w.talent(cid, 314), 9, `种族2 = ${race2} 时精英种族恒 9`);
    for (const idx of set_idx) {
      assert.equal(w.talent(cid, idx), 1, `种族2 = ${race2} 素质 ${idx}`);
    }
    for (const idx of clear_idx) {
      assert.equal(w.talent(cid, idx), 0, `种族2 = ${race2} 素质 ${idx} 清零`);
    }
  }

  const w = look_world();
  const cid = w.run(0, always);
  w.set_talent(cid, 220, 1);
  w.set_talent(cid, 319, 6);
  w.run_again(cid, 0, steer({ 4: 1, 10: 4 }));
  assert.equal(w.talent(cid, 132), 1, 'RAND:4 != 0 → 幼稚');
  assert.equal(w.talent(cid, 478), 0, 'RAND:4 != 0 时不给 478');
});

test('LOOK_SET：精英的种族2 未命中前几档时落 `|| 12` 恒真臂', () => {
  for (const race2 of [0, 10, 12, 13, 99]) {
    const w = look_world();
    const cid = w.run(0, always);
    w.set_talent(cid, 220, 1);
    w.set_talent(cid, 319, race2);
    w.run_again(cid, 0, steer({ 4: 1 }));
    assert.equal(w.talent(cid, 137), 1, `种族2 = ${race2} → 兽类`);
    assert.equal(w.talent(cid, 258), 1, `种族2 = ${race2} → 俊足`);
    assert.equal(w.talent(cid, 124), 1, `种族2 = ${race2} → 动物耳朵`);
    assert.equal(w.talent(cid, 244), 0, '恶魔肌肤清零');
    assert.equal(w.talent(cid, 253), 0, '褐色肌肤清零');
    assert.equal(w.talent(cid, 255), 0, '白皙清零');
  }
});

test('LOOK_SET 素质 315：成为勇者前的生活 21 档 + 配下 90-93', () => {
  for (const [roll, expected] of [
    [0, 1],
    [4, 5],
    [5, 6],
    [6, 7],
    [19, 20],
    [20, 21],
  ]) {
    const w = look_world();
    const cid = w.run(0, steer({ 21: roll, 5: 1, 15: 1, 40: 1, 20: 1 }));
    assert.equal(w.talent(cid, 315), expected, `掷 ${roll}`);
  }

  for (const [roll, expected] of [
    [0, 90],
    [3, 93],
  ]) {
    const w = look_world();
    const cid = w.run(0, always);
    w.set_talent(cid, 220, 1);
    w.run_again(cid, 0, steer({ 4: roll, 15: 1 }));
    assert.equal(w.talent(cid, 315), expected, `配下 RAND:4 = ${roll}`);
  }
});

test('LOOK_SET：不会法术时修道女（Q=2）重掷', () => {
  const no_magic = look_world();
  const cid = no_magic.run(0, steer({ 21: [1, 0], 5: 1, 15: 1 }));
  assert.equal(no_magic.talent(cid, 315), 1, '第一次掷 2 → 重掷到 1');

  const has_magic = look_world();
  const cid2 = has_magic.run(0, always);
  has_magic.set_talent(cid2, 242, 1);
  has_magic.run_again(cid2, 0, steer({ 21: 1, 5: 1, 15: 1 }));
  assert.equal(has_magic.talent(cid2, 315), 2, '会法术则保留修道女');
});

test('LOOK_SET：男人两支的经验上界（童貞オトコ RAND:20 / オトコ RAND:40）', () => {
  // :518-530 两支的上界不同（20 / 40），必须分开钉——RAND:20 与 RAND:40 各
  // 投不同的值，两支才区分得开：20 → 5（local = 6）、40 → 1（local = 2）
  const cases = [
    // [素质前置, 期望经验值, 依据]
    [{ 122: 1, 1: 1 }, 6, '童貞オトコ：RAND:20 + 1 = 6'],
    [{ 122: 1 }, 2, 'オトコ：RAND:40 + 1 = 2'],
  ];
  for (const [talents, expected, note] of cases) {
    const w = look_world();
    const cid = w.reserve();
    for (const [idx, value] of Object.entries(talents)) {
      w.set_talent(cid, Number(idx), value);
    }
    w.run_again(cid, 0, steer({ 21: 4, 5: 1, 15: 1, 20: 5, 40: 1 }));
    assert.equal(w.talent(cid, 315), 5, '前职业 = 娼妓（进入经验支）');
    assert.equal(w.exp(cid, 1), expected, `肛门经验（${note}）`);
    assert.equal(w.exp(cid, 5), expected, `性交经验（${note}）`);
    assert.equal(w.exp(cid, 74), expected, `卖淫经验（${note}）`);
  }
});

test('LOOK_SET：妓女/乞丐/奴隶的经验与善恶值', () => {
  // RAND:40 钉在 1 → 处女支的 `LOCAL = RAND:40 + 1` 恒为 2，三个 EXP 都是
  // 确定值：肛门 2 / 性交 2 / 卖淫 2（Q == 20 的奴隶档不吃卖淫经验 → 0）
  for (const [roll, expected_q, expected_sex_work] of [
    [4, 5, 2],
    [6, 7, 2],
    [19, 20, 0],
  ]) {
    const w = look_world();
    const cid = w.run(0, always);
    w.set_talent(cid, 0, 1); // 处女 → 走 `TALENT:0 == 1` 支
    w.run_again(cid, 0, steer({ 21: roll, 5: 1, 15: 1, 40: 1, 20: 1 }));
    assert.equal(w.talent(cid, 315), expected_q);
    assert.equal(w.exp(cid, 1), 2, '肛门经验 = RAND:40 + 1 = 2');
    assert.equal(w.exp(cid, 5), 2, '性交经验 = RAND:40 + 1 = 2');
    assert.equal(
      w.exp(cid, 74),
      expected_sex_work,
      `卖淫经验（Q=${expected_q} 的 \`Q != 20\` 判据）`,
    );
    assert.equal(w.exp(cid, 60), 0, 'RAND:15 = 1 → 不中生育经验');
    assert.equal(w.cflag(cid, 151), -30, '善恶值 -30');
  }
});

test('LOOK_SET：非处女且肛交使用支 / 仅私处支（RAND:5 与 RAND:40 的差异）', () => {
  // :537-546 RAND:5 == 0 支：私处与肛门各掷 40、性交 += 两者之和
  const anal = look_world();
  const cid_a = anal.run(0, always);
  anal.run_again(
    cid_a,
    0,
    steer({ 21: 4, 5: [0], 40: [5], 15: 1, 20: 1, 150: 0 }),
  );
  // RAND:40 钉在 5 → 两掷都取 5+1 = 6：私处 6、肛门 6、性交 = 两者之和 12
  assert.equal(anal.exp(cid_a, 0), 6, '私处经验 = RAND:40 + 1 = 6');
  assert.equal(anal.exp(cid_a, 1), 6, '肛门经验 = 6');
  assert.equal(anal.exp(cid_a, 5), 12, '性交经验 = 私处 + 肛门 = 12');
  assert.equal(anal.exp(cid_a, 74), 12, '卖淫经验同额（Q != 20）');

  // :547-551 非处女 V 支（RAND:5 != 0）：只掷一次 40
  const v_only = look_world();
  const cid_v = v_only.run(0, always);
  v_only.run_again(cid_v, 0, steer({ 21: 4, 5: [1], 40: [5], 15: 1, 20: 1 }));
  assert.equal(v_only.exp(cid_v, 0), 6, '私处经验 = 6');
  assert.equal(v_only.exp(cid_v, 1), 0, '肛门经验未加（本支只掷一次 RAND:40）');
  assert.equal(v_only.exp(cid_v, 5), 6, '性交经验 = 私处 = 6');
  assert.equal(v_only.exp(cid_v, 74), 6, '卖淫经验 = 6');
});

test('LOOK_SET：刺青名表（CSTR:LOCAL，RAND:8 + 10 → 8 项全走）', () => {
  // :556 `LOCALS:10 '= "淫乱","母猪",…` 十项，:557 `CSTR:LOCAL = %LOCALS:LOCAL%`；
  // LOCAL = RAND:8 + 10 只取到前 8 项——逐项表驱动走完
  const names = [
    '淫乱',
    '母猪',
    '蛇',
    '蜘蛛女郎',
    '蔷薇',
    '肉便器',
    '便女',
    '阴茎图画',
  ];
  for (const [roll, expected] of names.entries()) {
    const w = look_world();
    const cid = w.run(0, always);
    w.run_again(
      cid,
      0,
      steer({ 21: 4, 5: 1, 15: [0, 1], 8: roll, 40: 1, 20: 1 }),
    );
    assert.equal(w.talent(cid, 315), 5, '前职业 = 娼妓（Q=5 才有刺青）');
    assert.equal(
      w.cstr(cid, 10 + roll),
      expected,
      `RAND:8 = ${roll} → CSTR:${10 + roll} = 第 ${roll + 1} 项`,
    );
  }
});

test('LOOK_SET：刺青与生育经验的两处 RAND:15 掷骰', () => {
  // RAND:15 在 :554（刺青）与 :562（生育经验）各一次：第一次 0 → 进刺青、
  // 第二次 0 → 进生育经验；RAND:3 = 2 → 生育经验 +2
  const w = look_world();
  const cid = w.run(0, always);
  w.run_again(
    cid,
    0,
    steer({ 21: 4, 5: 1, 15: [0, 0], 8: 7, 3: 2, 40: 1, 20: 1 }),
  );
  assert.equal(w.talent(cid, 315), 5, '前职业 = 娼妓');
  assert.equal(w.cstr(cid, 17), '阴茎图画', 'RAND:8 = 7 → 刺青第 8 项');
  assert.equal(w.exp(cid, 60), 2, 'RAND:3 = 2 → 生育经验 +2');

  const w2 = look_world();
  const cid2 = w2.run(0, always);
  w2.run_again(cid2, 0, steer({ 21: 4, 5: 1, 15: [0, 1], 8: 0, 40: 1, 20: 1 }));
  assert.equal(w2.cstr(cid2, 10), '淫乱', '第一次 0 → 刺青');
  assert.equal(w2.exp(cid2, 60), 0, '第二次 1 → 不中生育经验');
});

test('LOOK_SET：乞丐（Q=7）不刺青', () => {
  // :557 `Q != 7` 是刺青的第二条判据
  const w = look_world();
  const cid = w.run(0, always);
  w.run_again(cid, 0, steer({ 21: 6, 5: 1, 15: [0, 1], 8: 0, 40: 1, 20: 1 }));
  assert.equal(w.talent(cid, 315), 7);
  assert.equal(w.cstr(cid, 10), undefined, '乞丐不刺青');
});

test('LOOK_SET：主婦（Q=21）失去处女与私处封印、必得人妻', () => {
  const w = look_world();
  const cid = w.run(0, always);
  w.set_talent(cid, 0, 1); // 处女
  w.set_talent(cid, 273, 1); // 私处封印
  w.run_again(cid, 0, steer({ 21: 20, 5: 1, 15: 1, 40: 1, 20: 9, 2: 1 }));
  assert.equal(w.talent(cid, 315), 21);
  assert.equal(w.talent(cid, 0), 0, '处女失去');
  assert.equal(w.talent(cid, 273), 0, '私处封印失去');
  assert.equal(w.talent(cid, 157), 1, '人妻');
});

test('LOOK_SET 素质 316：理由三档的善恶值', () => {
  for (const [roll, expected, delta] of [
    [0, 1, 20],
    [2, 3, 20],
    [3, 4, 20],
    [6, 7, 20],
    [15, 16, 20],
    [16, 17, 20],
    [1, 2, -20],
    [10, 11, -20],
    [12, 13, -20],
    [4, 5, 0],
    [19, 20, 0],
  ]) {
    const w = look_world();
    // RAND:20 的五处消费者依次是 理由 / 喜好 / 家族婚姻 / 家族子女 / 家族性别
    // （源 :586、:611、:631、:695、:760）——只钉第一处，其余给不增减的值
    const cid = w.run(
      0,
      steer_at({ '20#0': roll, '20#1': 0, '20#2': 9, '20#3': 9, '20#4': 9 }),
    );
    assert.equal(w.talent(cid, 316), expected, `理由掷 ${roll}`);
    assert.equal(w.cflag(cid, 151), delta, `理由掷 ${roll} 的善恶值`);
  }
});

test('LOOK_SET 素质 317：喜欢的东西三档的善恶值', () => {
  for (const [roll, expected, delta] of [
    [0, 1, 0], // q=1 不属任何一支（源 :613/:616 两组都不含 1）
    [3, 4, 20],
    [7, 8, 20],
    [8, 9, 20],
    [9, 10, 20],
    [10, 11, 20],
    [4, 5, -20],
    [12, 13, -20],
    [13, 14, -20],
    [2, 3, 0],
    [14, 15, 0],
  ]) {
    const w = look_world();
    // 理由给 4（q=5，不增减），喜好给 roll
    const cid = w.run(
      0,
      steer_at({ '20#0': 4, '20#1': roll, '20#2': 9, '20#3': 9, '20#4': 9 }),
    );
    assert.equal(w.talent(cid, 317), expected, `喜好掷 ${roll}`);
    assert.equal(w.cflag(cid, 151), delta, `喜好掷 ${roll} 的善恶值`);
  }
});

test('LOOK_SET 素质 320：人妻三档（バツ2/バツ1/初婚）', () => {
  // 结婚次数落在**十位**（源 :628 起的码位注释：10の位 = 勇者以前の結婚歴）
  for (const [batsu2, batsu1, expected] of [
    [0, 9, 3],
    [1, 0, 2],
    [1, 1, 1],
  ]) {
    const w = look_world();
    const cid = w.run(0, always);
    w.set_talent(cid, 157, 1);
    w.set_talent(cid, 0, 1);
    w.run_again(
      cid,
      0,
      steer_at({
        '20#0': 4,
        '20#1': 0,
        '20#2': batsu2,
        '20#3': 9,
        '20#4': 9,
        10: batsu1,
        2: 1,
        8: 7,
        4: 1,
      }),
    );
    assert.equal(
      Math.trunc(w.talent(cid, 320) / 10) % 10,
      expected,
      `バツ2=${batsu2} バツ1=${batsu1}`,
    );
    assert.equal(
      Math.trunc(w.talent(cid, 320) / 10000) % 10,
      1,
      '人妻的万位恒 1（結婚）',
    );
  }
});

test('LOOK_SET 素质 320：离婚/未亡人支（RAND:20 == 0 且非后代）', () => {
  for (const [roll, expected] of [
    [0, 2],
    [1, 5],
  ]) {
    const w = look_world();
    const cid = w.run(0, always);
    w.set_talent(cid, 0, 1); // 处女 → 跳过三条子供段
    // RAND:20：#2 命中离婚/未亡人支；RAND:2：[0] 离婚、[1] 死別（兄弟段随即
    // 整段跳过或按同值走完，不影响万位）
    w.run_again(
      cid,
      0,
      steer_at({
        '20#0': 4,
        '20#1': 0,
        '20#2': 0,
        '20#3': 9,
        '20#4': 9,
        10: 9,
        2: roll,
        8: 7,
        4: 0,
      }),
    );
    assert.equal(
      Math.trunc(w.talent(cid, 320) / 10000) % 10,
      expected,
      `掷 ${roll}`,
    );
  }
});

test('LOOK_SET 素质 320：后代（EX_TALENT:2）不进入离婚支', () => {
  const w = look_world();
  const cid = w.run(0, always);
  w.set_talent(cid, 0, 1);
  w.fixture.store.set(`ex_talent:${cid}:2`, 1);
  w.run_again(
    cid,
    0,
    steer_at({
      '20#0': 4,
      '20#1': 0,
      '20#2': 0,
      '20#3': 9,
      '20#4': 9,
      10: 9,
      2: 0,
      8: 7,
      4: 0,
    }),
  );
  // 精确值：后代（EX_TALENT:2）把「離婚/未亡人」支整支关掉 → LOCAL = 0，
  // 家族码只剩非精英预置的个位 1（万位 0 = 未婚）
  assert.equal(
    w.talent(cid, 320),
    1,
    '后代不进离婚支：家族码停在「設定あり」的 1',
  );
});

test('LOOK_SET 素质 320：主婦子供段（先加后判 break，「一人确定」）', () => {
  // :669-679 主婦段：先加后判 break——掷到 break 也已经加过一个孩子，
  // 故「主婦必有一名子女」。精确值 2000050021 解：个位 1（設定あり）、
  // 十亿位 2（女女カップル）、百万位 5（子女 5 人，主婦段不动 break 走满）
  const w = look_world();
  const cid = w.run(0, always);
  w.set_talent(cid, 0, 0);
  // 前职业必须**掷**出来（315 由 LOOK_SET 自己写，预置会被覆盖）：RAND:21 → 20
  w.run_again(cid, 0, steer({ 2: [1, 0], 21: 20 }));
  assert.equal(w.talent(cid, 315), 21, '前职业 = 主婦（掷值 20）');
  // 绝对值 2000011031 解：个位 1（設定あり）、十位 3（主婦档自带人妻 →
  // 婚姻歴 +30）、千位 1（儿子 1 人：先加后判 break，第一次就加到了）、
  // 万位 1（結婚）、十亿位 2（女女カップル）
  assert.equal(
    w.talent(cid, 320),
    2000011031,
    '主婦子供段：先加后判 break 的绝对值',
  );
});

test('LOOK_SET 素质 320：结婚经历子供段（先判后加 break）', () => {
  // :680-694 第二支：`local >= 10 && 处女 == 0`——人妻档给 +10 + 10000
  // （万位 = 結婚），子供段的 break 判据在加孩子之前
  const w = look_world();
  const cid = w.run(0, always);
  w.set_talent(cid, 157, 1); // 人妻 → 结婚档
  w.set_talent(cid, 0, 0);
  w.run_again(cid, 0, steer_at({ '20#2': 1, 10: 1, 2: [1, 0] }));
  // 绝对值 2000010111 解：个位 1、十位 1（初婚 +10）、百位 1（女儿 1 人：
  // 先判后加 break，掷到 break 前已加过一个）、万位 1（結婚）、十亿位 2
  assert.equal(
    w.talent(cid, 320),
    2000010111,
    '结婚经历子供段：先判后加 break 的绝对值',
  );
});

test('LOOK_SET 素质 320：未婚の母（娼婦上限 +2：2 → 4 人）', () => {
  // :695-735 第三支：`RAND:20 == 0 && 处女 == 0`，且不能落进前两支。
  // 前职业必须**掷**出来（315 是 LOOK_SET 自己写的，预置会被覆盖）：
  // RAND:21 → 4 得娼婦（q=5），RAND:21 → 0 得学生。
  // 家族码的百位 = 女儿数，正是本支的上限差
  for (const [roll, expected] of [
    [0, 100201], // 学生：上限 2 → 百位 2
    [4, 100401], // 娼婦：上限 2 + 2 → 百位 4
  ]) {
    const w = look_world();
    const cid = w.run(0, always);
    w.set_talent(cid, 0, 0);
    const dbg = [];
    const st = steer_at({
      '20#2': 9, // 家族婚姻档不进（local 保持 0，前两支都跳过）
      '20#3': 0, // 第三支的开门掷
      2: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      21: roll,
    });
    w.run_again(cid, 0, (n) => {
      const v = st(n);
      dbg.push(`${n}=${v}`);
      return v;
    });
    console.log(
      'DBG cid',
      cid,
      'roll',
      roll,
      '2:',
      dbg.filter((s) => s.startsWith('2=')).join(' '),
      '20:',
      dbg.filter((s) => s.startsWith('20=')).join(' '),
      '315=',
      w.talent(cid, 315),
    );
    assert.equal(
      w.talent(cid, 320),
      expected,
      `RAND:21 = ${roll} → 前职业 ${roll === 0 ? 1 : 5}、家族码百位 ${
        Math.trunc(expected / 100) % 10
      }`,
    );
  }
});

test('LOOK_SET 素质 320：兄弟姐妹四类各占自己的位（100000/1000000/10000000/100000000）', () => {
  // :738-758 的兄弟段：RAND:2 先判 break，再按 RAND:4/RAND:3/RAND:2 依次判
  // 姉/兄/妹，都不中则 弟。四支各掷一次，钉住四个位不互相串
  const cases = [
    // [steer 覆盖, 位, 期望该位值]。RAND:2 的第一次是 break 判据（不给 0
    // 就一直转），第二次才是「妹」判据——故妹档给队列 [1, 0]
    [{ 2: 1, 4: 0 }, 100000, 4],
    [{ 2: 1, 4: 1, 3: 0 }, 1000000, 4],
    [{ 2: [1, 0], 4: 1, 3: 1 }, 10000000, 1],
    [{ 2: 1, 4: 1, 3: 1 }, 100000000, 4],
  ];
  for (const [map, place, expected] of cases) {
    const w = look_world();
    const cid = w.reserve();
    // 两条隔离：① 处女（0）让三条子供段全不生效；② RAND:20 = 9（非 0）
    // 让「離婚/未亡人」支与性别段都进不去——那两处各有一个 RAND:2 消费者
    // （源 :652 与 :777），不隔离会先吃掉本用例给兄弟段的队列值
    w.set_talent(cid, 0, 1);
    w.run_again(cid, 0, steer({ ...map, 20: 9 }));
    const code = w.talent(cid, 320);
    assert.equal(Math.trunc(code / place) % 10, expected, `位 ${place} 的值`);
  }
});

test('LOOK_SET 素质 320：配偶性别码三支（男/扶她/女）', () => {
  const cases = [
    // [男人, 扶她, 性别段掷法, 期望十亿位, 期望百合气质]
    [1, 0, { gender: 0 }, 8, false], // 男男（RAND:20 == 0）
    [1, 0, { gender: 1, 8: 0 }, 7, false], // 男ふた（RAND:8 == 0）
    [1, 0, { gender: 1, 8: 7 }, 6, false], // 男女（ELSE）
    [0, 1, { gender: 1, 10: 0 }, 5, true], // ふた女稀少（RAND:10 == 0）
    [0, 1, { gender: 1, 10: 9, '2#x': 0 }, 4, false], // ふた男（RAND:2 == 0）
    [0, 1, { gender: 1, 10: 9, '2#x': 1 }, 3, true], // ふた女（ELSE）
    [0, 0, { gender: 0 }, 2, true], // 女女（RAND:20 == 0）
    [0, 0, { gender: 1, 8: 0 }, 1, true], // 女ふた（RAND:8 == 0）
    [0, 0, { gender: 1, 8: 7 }, 0, false], // 男女…ならぬ女側の ELSE（加算なし）
  ];
  for (const [male, futa, rolls, expected, lily] of cases) {
    const w = look_world();
    const cid = w.reserve();
    w.set_talent(cid, 157, 1);
    w.set_talent(cid, 0, 1);
    w.set_talent(cid, 122, male);
    w.set_talent(cid, 121, futa);
    const map = {
      '20#0': 4,
      '20#1': 0,
      '20#2': 1,
      '20#3': 9,
      '20#4': rolls.gender,
      2: rolls['2#x'] !== undefined ? rolls['2#x'] : 1,
      4: [1],
      10: rolls['10'] !== undefined ? rolls['10'] : 9,
    };
    if (rolls['8'] !== undefined) map[8] = rolls['8'];
    w.run_again(cid, 0, steer_at(map));
    const code = w.talent(cid, 320);
    assert.equal(
      Math.trunc(code / 1000000000) % 10,
      expected,
      `男人=${male} 扶她=${futa} → 十亿位 ${expected}`,
    );
    assert.equal(
      w.abl(cid, 22) === 3,
      lily,
      `百合气质（男人=${male} 扶她=${futa}）`,
    );
  }

  const w = look_world();
  const cid = w.reserve();
  w.set_talent(cid, 157, 1);
  w.set_talent(cid, 0, 1);
  w.set_talent(cid, 122, 1);
  w.run_again(
    cid,
    0,
    steer_at({
      '20#0': 4,
      '20#1': 0,
      '20#2': 1,
      '20#3': 9,
      '20#4': 0,
      2: 1,
      4: 1,
    }),
  );
  assert.equal(Math.trunc(w.talent(cid, 320) / 1000000000) % 10, 8, '男男支');
  assert.equal(w.abl(cid, 23), 3, '断背气质（abl:23）');
});

test('LOOK_SET：一次全 0 掷的完整走向（端到端形状）', () => {
  const w = look_world();
  const cid = w.run(0, always);
  assert.deepEqual(
    [
      w.talent(cid, 300),
      w.talent(cid, 301),
      w.talent(cid, 302),
      w.talent(cid, 303),
      w.talent(cid, 304),
      w.talent(cid, 305),
      w.talent(cid, 306),
      w.talent(cid, 307),
      w.talent(cid, 308),
      w.talent(cid, 309),
      w.talent(cid, 310),
      w.talent(cid, 312),
      w.talent(cid, 313),
      w.talent(cid, 314),
      w.talent(cid, 315),
      w.talent(cid, 316),
      w.talent(cid, 317),
    ],
    [11, 1, 1, 4, 1, 1, 1, 1, 300, 1, 1, 1, 1, 0, 1, 1, 1],
  );
  assert.equal(
    w.cflag(cid, 151),
    20,
    '理由 q=1 给 +20；喜好 q=1 不在增减两支内（源 :613/:616）',
  );
});

test('LOOK_SET：一次全上界掷的完整走向', () => {
  const w = look_world();
  const cid = w.run(0, top);
  assert.deepEqual(
    [
      w.talent(cid, 300),
      w.talent(cid, 301),
      w.talent(cid, 302),
      w.talent(cid, 303),
      w.talent(cid, 304),
      w.talent(cid, 305),
      w.talent(cid, 306),
      w.talent(cid, 307),
      w.talent(cid, 308),
      w.talent(cid, 309),
      w.talent(cid, 310),
      w.talent(cid, 312),
      w.talent(cid, 313),
      w.talent(cid, 314),
      w.talent(cid, 315),
      w.talent(cid, 316),
      w.talent(cid, 317),
    ],
    [5, 6, 201, 1, 12, 6, 5, 4, 150, 3, 201, 28, 34, 6, 21, 20, 20],
  );
  assert.equal(
    w.cflag(cid, 151),
    40,
    '天使（掷 199）+40；理由/喜好（q=20）不增减',
  );
});

test('LOOK_SET：返回值 1（源 :810 RETURN 1）', () => {
  const w = look_world();
  assert.equal(w.mod.look_set(200, 0, always), 1);
});

// —— @LOOK_CLEAR（:814-822）——

test('LOOK_CLEAR：300-313 清零，299 与 314 不动（源 REPEAT 314 的等价形状）', () => {
  const w = look_world();
  const cid = w.run(0, always);
  w.set_talent(cid, 299, 7);
  w.set_talent(cid, 314, 3);
  w.mod.look_clear(cid);
  for (let idx = 300; idx <= 313; idx += 1) {
    assert.equal(w.talent(cid, idx), 0, `素质 ${idx} 已清`);
  }
  assert.equal(w.talent(cid, 299), 7, '299 不在扫描面内');
  assert.equal(w.talent(cid, 314), 3, '314 不在扫描面内');
});

// —— @LOVE_LIKE_BASE（:2811-2884）——

test('LOVE_LIKE_BASE：20 档文本与命中标志', () => {
  const cases = [
    [1, '甜食'],
    [2, '辣条'],
    [3, '唱歌'],
    [4, '故乡的恋人'],
    [5, '钱'],
    [6, '跳舞'],
    [7, '绘画'],
    [8, '家族'],
    [9, '使命'],
    [10, '故乡'],
    [11, '憧憬的那个人'],
    [12, '可爱的动物'],
    [13, '美丽的饰品'],
    [14, '宝石'],
    [15, '点心'],
    [16, '喝茶'],
    [17, '睡觉'],
    [18, '小说'],
    [19, '开怀大笑'],
    [20, '游泳'],
  ];
  const fixture = create_era_fixture();
  const { love_like_base } = fixture.load_module('chara/look');
  for (const [value, expected] of cases) {
    fixture.store.set('talent:5:317', value);
    assert.deepEqual(
      love_like_base(5),
      { printed: expected, matched: true },
      `喜欢的东西 ${value}`,
    );
  }
  fixture.store.set('talent:5:317', 0);
  assert.deepEqual(
    love_like_base(5),
    { printed: '', matched: false },
    '0 档不命中',
  );
  fixture.store.set('talent:5:317', 21);
  assert.deepEqual(
    love_like_base(5),
    { printed: '', matched: false },
    '21 档不命中',
  );
});

test('LOVE_LIKE_BASE：4/8/9/10/11 五档在 CFLAG:0 != 0 时不命中', () => {
  const fixture = create_era_fixture();
  const { love_like_base } = fixture.load_module('chara/look');
  for (const value of [4, 8, 9, 10, 11]) {
    fixture.store.set('talent:5:317', value);
    fixture.store.set('cflag:5:0', 1);
    assert.equal(
      love_like_base(5).matched,
      false,
      `喜欢的东西 ${value} 且已沦落`,
    );
  }
  for (const value of [5, 12, 20]) {
    fixture.store.set('talent:5:317', value);
    assert.equal(
      love_like_base(5).matched,
      true,
      `喜欢的东西 ${value} 不受 CFLAG:0 影响`,
    );
  }
});

// ===========================================================================
// ere/chara/look.js：@LOOK_INFO（:823-1666）
// ===========================================================================

/** LOOK_INFO 的驱动面：一个夹具、自增角色 ID、可预置任意变量 */
function info_world() {
  const fixture = create_era_fixture();
  const mod = fixture.load_module('chara/look');
  // 自增角色号从 2 起：**必须 < 200**——源 :1310 的「来据点之前」前缀按
  // NO:TARGET >= 200 分叉，用 500 起会把默认路径整个挪到配下支
  let next_cid = 2;
  return {
    fixture,
    mod,
    reserve() {
      const cid = next_cid;
      next_cid += 1;
      return cid;
    },
    run(arg, rand = always) {
      const cid = this.reserve();
      mod.look_set(cid, arg, rand);
      return cid;
    },
    set_talent(cid, idx, value) {
      fixture.store.set(`talent:${cid}:${idx}`, value);
    },
    set_cflag(cid, idx, value) {
      fixture.store.set(`cflag:${cid}:${idx}`, value);
    },
    set_mark(cid, idx, value) {
      fixture.store.set(`mark:${cid}:${idx}`, value);
    },
    lines() {
      return fixture.text_lines();
    },
    async info(cid) {
      await mod.look_info(cid);
      return this.lines();
    },
  };
}

test('LOOK_INFO 默认视角：外观五块 + 来历两块 + 所持金 + 喜好，逐行形态', async () => {
  const w = info_world();
  const cid = w.run(0, always);
  w.fixture.store.set('callname:637:-1', '预设名');
  w.set_cflag(cid, 580, 500);
  const lines = await w.info(cid);
  assert.deepEqual(lines.slice(0, 6), [
    '[人类]',
    '[发色：粉发][头发状态：直发]',
    '[头发长度：短][修剪：碎发][发型：自然]',
    '[眼形：细长眼][瞳色：蓝色][唇：肉感的]',
    '[体型：丰满][乳头：粉红色][阴毛：白虎]',
    '[魅力点：皮肤][癖好：舔嘴唇]',
  ]);
  assert.ok(
    lines.includes('[成为勇者之前：学生]'),
    '来历（默认视角前缀 + 取值 + ]）',
  );
  assert.ok(lines.includes('[成为勇者的契机：命运的引导]'));
  assert.ok(lines.includes('[所持金：500]'));
  assert.ok(lines.includes('[喜欢的东西]'));
  assert.ok(lines.includes('[共1个喜欢的东西]'));
});

test('LOOK_INFO：所持金 <= 0 报身无分文；借金为负时报借金行', async () => {
  const w = info_world();
  const cid = w.run(0, always);
  const lines = await w.info(cid);
  assert.ok(lines.includes('[所持金：身无分文]'), 'CFLAG:580 <= 0');

  const w2 = info_world();
  const cid2 = w2.run(0, always);
  w2.set_cflag(cid2, 580, 100);
  w2.set_cflag(cid2, 582, -300);
  const lines2 = await w2.info(cid2);
  assert.ok(
    lines2.includes('[所持金：100][借金：300]'),
    '负债取相反数（源 :1558 `{0 - CFLAG:582}`）',
  );
});

test('LOOK_INFO：外观块按素质是否存在分块显示，缺一块整块不出', async () => {
  const w = info_world();
  const cid = w.run(0, always);
  w.set_talent(cid, 300, 0); // 头发颜色缺席
  w.set_talent(cid, 305, 0); // 目缺席
  w.set_talent(cid, 312, 0); // 魅力点缺席
  const lines = await w.info(cid);
  assert.ok(
    !lines.some((l) => l.startsWith('[发色：')),
    '300 缺席 → 头发颜色块不出',
  );
  assert.ok(!lines.some((l) => l.startsWith('[眼形：')), '305 缺席 → 目块不出');
  assert.ok(
    !lines.some((l) => l.startsWith('[魅力点：')),
    '312 缺席 → 魅力点块不出',
  );
  assert.ok(
    lines.some((l) => l.startsWith('[体型：')),
    '其它块照常',
  );
});

test('LOOK_INFO：男性不显示发型、显示阴茎；女性相反', async () => {
  const w = info_world();
  const male = w.run(0, always);
  w.set_talent(male, 122, 1);
  const male_lines = await w.info(male);
  assert.ok(
    male_lines.some((l) => l === '[头发长度：短][修剪：碎发]'),
    '男性：没有「发型」段（源 :962-966）',
  );
  assert.ok(
    male_lines.some((l) => l.includes('[阴茎：')),
    '男性显示阴茎',
  );

  const w2 = info_world();
  const female = w2.run(0, always);
  const female_lines = await w2.info(female);
  assert.ok(
    female_lines.some((l) => l.includes('[发型：')),
    '女性显示发型',
  );
  assert.ok(!female_lines.some((l) => l.includes('[阴茎：')), '女性不显示阴茎');
});

test('LOOK_INFO：精英（220）出「种族·种族2·预设名」，且种族2 为 8/9 时省略', async () => {
  const w = info_world();
  const cid = w.run(0, always);
  w.set_talent(cid, 220, 1);
  w.set_talent(cid, 314, 9);
  w.set_talent(cid, 319, 6); // 妖精
  w.fixture.store.set(`callname:${cid}:-1`, '预设名');
  const lines = await w.info(cid);
  assert.equal(lines[0], '[魔族·妖精：预设名]');

  const w2 = info_world();
  const cid2 = w2.run(0, always);
  w2.set_talent(cid2, 220, 1);
  w2.set_talent(cid2, 314, 9);
  w2.set_talent(cid2, 319, 8); // 魔族 → 不重复
  w2.fixture.store.set(`callname:${cid2}:-1`, '预设名');
  const lines2 = await w2.info(cid2);
  assert.equal(lines2[0], '[魔族：预设名]');
});

test('LOOK_INFO：魔族化的角色补现种族并显示原种族行', async () => {
  const w = info_world();
  const cid = w.run(0, always);
  w.set_talent(cid, 314, 9); // 种族 = 魔族
  w.set_talent(cid, 321, 0); // 原种族 = 人类
  w.fixture.store.set('itemname:132', '小恶魔');
  const lines = await w.info(cid);
  assert.equal(lines[0], '[魔族：小恶魔]', '现种族未设定 → 补 132 后取物品名');
  assert.equal(
    w.fixture.store.get(`talent:${cid}:322`),
    132,
    '现种族被补设为 132',
  );
  assert.ok(lines.includes('[原种族：人类]'), '原种族行');

  // 原种族为魔族时显示「不明」（源 :850-851）
  const w2 = info_world();
  const cid2 = w2.run(0, always);
  w2.set_talent(cid2, 314, 9);
  w2.set_talent(cid2, 321, 9);
  const lines2 = await w2.info(cid2);
  assert.ok(lines2.includes('[原种族：不明]'), '原种族 = 魔族 → 不明');
});

test('LOOK_INFO：来历的四路前缀（后代/女性勇者/男性勇者/魔王）', async () => {
  // 逐支独立夹具：配下档（cid >= 200）另有一条用例，这里钉其余四路
  const base = info_world();
  const b = base.run(0, always);
  const plain = await base.info(b);
  assert.ok(plain.includes('[成为勇者之前：学生]'), '默认：女性勇者');

  const off = info_world();
  const o = off.run(0, always);
  off.fixture.store.set(`ex_talent:${o}:2`, 1);
  const off_lines = await off.info(o);
  assert.ok(off_lines.includes('[出生是因为：学生]'), '后代');

  const male = info_world();
  const m = male.run(0, always);
  male.set_talent(m, 122, 1);
  const male_lines = await male.info(m);
  assert.ok(male_lines.includes('[成为冒险者之前：学生]'), '男性勇者');

  const master = info_world();
  const master_cid = 0;
  master.fixture.store.set('talent:0:300', 11);
  master.fixture.store.set('talent:0:301', 1);
  master.set_cflag(master_cid, 580, 10);
  await master.mod.look_info(0);
  assert.ok(
    master.lines().some((l) => l.includes('成为魔王之前：')),
    '魔王（cid 0）',
  );
});

test('LOOK_INFO：cid >= 200 且非 222 且非后代走「来据点之前」前缀', async () => {
  // 自增 cid 到 200 区间：直接造一个 250 号角色
  const w = info_world();
  const cid = 250;
  w.mod.look_set(cid, 0, always);
  w.fixture.store.set('callname:250:-1', 'A');
  await w.mod.look_info(cid);
  const lines = w.lines();
  assert.ok(lines.includes('[来到据点之前：学生]'), '250 号走配下前缀');

  const w2 = info_world();
  w2.mod.look_set(222, 0, always);
  await w2.mod.look_info(222);
  assert.ok(
    w2.lines().some((l) => l.includes('[成为勇者之前：')),
    '222 号例外（源 :1310 的 `NO:TARGET != 222`）',
  );
});

test('LOOK_INFO：信仰行的七个分支（含弃教）', async () => {
  const cases = [
    // [设置, 期望神名片段]
    // 源 :1452-1467 是 IF/ELSEIF 链：爱慕（85）在最前，命中即不再看后面
    [{ 85: 1 }, '魔王大人'],
    [{ cflag0: 1 }, '无名的淫荡女神'],
    [{ 220: 1, 315: 11 }, '混沌的魔界女神'],
    [{ 250: 1, 315: 11 }, '潜藏地底的死亡女神'],
    [{ 242: 1, 315: 11 }, '纯洁的神圣女神'],
    [{ 315: 11 }, '丰饶的大地女神'],
    [{ 315: 12 }, '包容一切的大海女神'],
  ];
  for (const [setup, expected] of cases) {
    const w = info_world();
    const cid = w.run(0, always);
    w.set_talent(cid, 315, 11); // 开门条件（巫女）
    w.set_cflag(cid, 152, 10); // 信仰値 >= 10
    for (const [key, value] of Object.entries(setup)) {
      if (key === 'cflag0') w.set_cflag(cid, 0, value);
      else w.set_talent(cid, Number(key), value);
    }
    const lines = await w.info(cid);
    assert.ok(
      lines.some((l) => l.startsWith('[信仰：') && l.includes(expected)),
      `${expected}（信仰行）`,
    );
  }

  // 信仰値 < 10 → 不出信仰行
  const w = info_world();
  const cid = w.run(0, always);
  w.set_talent(cid, 315, 11);
  w.set_cflag(cid, 152, 9);
  const lines = await w.info(cid);
  assert.ok(!lines.some((l) => l.startsWith('[信仰：')), '信仰値 9 → 不出');
});

test('LOOK_INFO：弃教行（爱慕或沦落 + 低姿态或冒渎者）', async () => {
  const w = info_world();
  const cid = w.run(0, always);
  w.set_talent(cid, 85, 1); // 爱慕
  w.set_talent(cid, 250, 1); // 咒术
  w.set_cflag(cid, 152, 10);
  w.set_talent(cid, 17, 1); // 低姿态
  const lines = await w.info(cid);
  assert.ok(
    lines.some(
      (l) => l.startsWith('[弃教：') && l.includes('生性阴暗的变态母猪'),
    ),
    '咒术侧的弃教文本',
  );

  // 三个弃教文本的其余两支（法術 / 巫女 / 聖女）
  const others = [
    [{ 242: 1, 17: 1 }, '骚浪贱婊子肉便器'],
    [{ 315: 11, 17: 1 }, '是用乳头自慰的母牛'],
    [{ 315: 12, 17: 1 }, '把正太信者榨个干净的色情狂'],
  ];
  for (const [setup, expected] of others) {
    const w2 = info_world();
    const cid2 = w2.run(0, always);
    w2.set_talent(cid2, 85, 1);
    w2.set_cflag(cid2, 152, 10);
    for (const [key, value] of Object.entries(setup)) {
      w2.set_talent(cid2, Number(key), value);
    }
    const lines2 = await w2.info(cid2);
    assert.ok(
      lines2.some((l) => l.includes(expected)),
      `弃教（${expected}）`,
    );
  }

  // 没有低姿态/冒渎者 → 不出弃教行
  const w3 = info_world();
  const cid3 = w3.run(0, always);
  w3.set_talent(cid3, 85, 1);
  w3.set_cflag(cid3, 152, 10);
  const lines3 = await w3.info(cid3);
  assert.ok(!lines3.some((l) => l.startsWith('[弃教：')), '无冒渎者 → 不出');
});

test('LOOK_INFO：妊娠适性行（同族不育）', async () => {
  const w = info_world();
  const cid = w.run(0, always);
  w.set_talent(cid, 158, 1);
  const lines = await w.info(cid);
  assert.ok(lines.includes('[妊娠适性：只能异种族]'));
});

test('LOOK_INFO：常识改变四态（战斗/日常/两者/都无）', async () => {
  const w = info_world();
  const battle = w.run(0, always);
  w.set_talent(battle, 281, 1);
  assert.ok(
    (await w.info(battle)).some((l) => l === '[常识改变：【战斗】 奉侍战斗]'),
    '只有战斗',
  );

  const w2 = info_world();
  const daily = w2.run(0, always);
  w2.set_talent(daily, 283, 1);
  assert.ok(
    (await w2.info(daily)).some((l) => l === '[常识改变：【日常】 服侍乞丐]'),
    '只有日常',
  );

  const w3 = info_world();
  const both = w3.run(0, always);
  w3.set_talent(both, 281, 1);
  w3.set_talent(both, 283, 1);
  assert.ok(
    (await w3.info(both)).some(
      (l) => l === '[常识改变：【战斗】 奉侍战斗 【日常】 服侍乞丐]',
    ),
    '两者（分隔是一个空格，源 :1582 的 `PRINT  `）',
  );

  const w4 = info_world();
  const none = w4.run(0, always);
  assert.ok(
    !(await w4.info(none)).some((l) => l.startsWith('[常识改变：')),
    '都无 → 不出',
  );
});

/**
 * 把 kojo-system 的 `gobi_koujo` 就地换成一个只记录实参的函数（与夹具的
 * `disable_enter_enemy` 同一手法）：ere/chara/look.js 里是
 * `require('#/kojo/kojo-system').gobi_koujo(...)` 的**属性查找**，替换导出即
 * 短路，不必碰游戏代码。返回记录数组与还原函数。
 * @param {object} fixture 夹具
 * @returns {{calls: number[], restore: () => void}}
 */
function capture_gobi(fixture) {
  const kojo = fixture.load_module('kojo/kojo-system');
  const real = kojo.gobi_koujo;
  const calls = [];
  kojo.gobi_koujo = async (arg0) => {
    calls.push(arg0);
  };
  return {
    calls,
    restore() {
      kojo.gobi_koujo = real;
    },
  };
}

/**
 * 造一个「只剩两处语尾档位还会开口」的角色：外观各块因素质缺席整块跳过、
 * 信仰/妊娠/常识全关。kojo 视角下 GOBI_KOUJO 的调用序因此固定为
 * `[首行(4), 前职业档, 契机档, 所持金档(0), 喜好收尾(1)]`——两张档位表
 * 各据一位，不必管中间的其它调用。
 * @param {object} fixture 夹具
 * @param {number} roll21 RAND:21 的掷值（→ 前职业 = 掷值 + 1）
 * @param {number} roll20 RAND:20 的掷值（→ 契机 = 掷值 + 1）
 * @returns {Promise<number[]>} 捕获到的 GOBI_KUJO 实参序列
 */
async function gobi_sequence(fixture, roll21, roll20) {
  const mod = fixture.load_module('chara/look');
  const cid = 800;
  // 一次掷到位：315/316 分别由 RAND:21 / RAND:20 决定（掷值 + 1）
  mod.look_set(cid, 0, steer({ 21: roll21, 20: roll20 }));
  // LOOK_SET 会把外观素质一起掷出来，**掷完再清零**让外观各块整块跳过
  // （顺序反了会被第二次 look_set 重新掷上，块又活了）
  for (const idx of [
    300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 312, 313, 314,
  ]) {
    fixture.store.set(`talent:${cid}:${idx}`, 0);
  }
  fixture.store.set(`talent:${cid}:158`, 0);
  fixture.store.set(`talent:${cid}:281`, 0);
  fixture.store.set(`talent:${cid}:283`, 0);
  fixture.store.set(`talent:${cid}:220`, 0);
  fixture.store.set(`cflag:${cid}:580`, 100); // 所持金 > 0 → 该处档位 0
  fixture.store.set('flag:5', 2048); // 口上视角
  const { calls, restore } = capture_gobi(fixture);
  await mod.look_info(cid);
  restore();
  return calls;
}

test('LOOK_INFO 的语尾档位：前职业 5 档（源 :1348-1365，表驱动走完）', async () => {
  const cases = [
    // [RAND:21 掷值, TALENT:315, 期望档位, 依据]
    [7, 8, 1, '貴族は誇らしい'],
    [11, 12, 1, '聖女は誇らしい'],
    [18, 19, 1, '軍人は誇らしい'],
    [4, 5, 4, '妓女は恥ずかしい'],
    [19, 20, 4, '奴隷は恥ずかしい'],
    [5, 6, 2, '盗人は逆切れ'],
    [6, 7, 5, '物乞いは情けない'],
    [8, 9, 5, '貧民は情けない'],
    [0, 1, 0, '学生はデフォルト'],
    [20, 21, 0, '主婦はデフォルト'],
  ];
  for (const [roll, job, expected] of cases) {
    const fixture = create_era_fixture();
    const calls = await gobi_sequence(fixture, roll, 0);
    assert.equal(
      calls[1],
      expected,
      `TALENT:315 = ${job}（${cases.find((c) => c[1] === job)[3]}）`,
    );
  }
});

test('LOOK_INFO 的语尾档位：成为勇者的契机 5 档（源 :1407-1428，表驱动走完）', async () => {
  const cases = [
    // [RAND:20 掷值, TALENT:316, 期望档位, 依据]
    [2, 3, 1, '啓示は誇らしい'],
    [6, 7, 1, '故郷は誇らしい'],
    [15, 16, 1, '平和は誇らしい'],
    [16, 17, 1, '正義は誇らしい'],
    [9, 10, 4, '罪は恥ずかしい'],
    [13, 14, 4, '仕方なくは恥ずかしい'],
    [7, 8, 2, '復讐は逆切れ'],
    [1, 2, 5, '金のためは情けない'],
    [12, 13, 5, '命令は情けない'],
    [0, 1, 0, '運命はデフォルト'],
    [19, 20, 0, '旅の結果はデフォルト'],
  ];
  for (const [roll, reason, expected] of cases) {
    const fixture = create_era_fixture();
    const calls = await gobi_sequence(fixture, 0, roll);
    assert.equal(calls[2], expected, `TALENT:316 = ${reason}`);
  }
});

test('LOOK_INFO 的语尾档位：序列本身（首行/所持金/喜好收尾）也钉住', async () => {
  const fixture = create_era_fixture();
  const calls = await gobi_sequence(fixture, 0, 0);
  assert.deepEqual(
    calls,
    [4, 0, 0, 0, 1],
    '首行档（屈服刻印 < 3 → 4）、前职业（学生 → 0）、契机（运命 → 0）、所持金（100 → 0）、喜好收尾（1）',
  );
});

test('LOOK_INFO：口上视角（FLAG:5 位 11）走「」与高亮，且带语尾口上占位行', async () => {
  const w = info_world();
  const cid = w.run(0, always);
  w.fixture.store.set('flag:5', 2048);
  w.fixture.store.set(`callname:${cid}:-1`, '阿名');
  const lines = await w.info(cid);
  assert.ok(
    lines.includes('「人类的阿名」'),
    '口上视角首行（%SAVESTR% = callname 的 -1 槽，见 callname-utils.js）',
  );
  assert.ok(lines.includes('「头发是粉发的直发」'), '全 0 掷 → 状态 1 直发');
  assert.ok(
    lines.some((l) => l === '「喜欢的东西是……'),
    '喜好段的口上引子（源 :2652）',
  );
  assert.ok(
    lines.some((l) => l.includes('语尾口上尚未移植')),
    'GOBI_KOUJO 的占位行（该族未移植，登记在 kojo-system）',
  );

  // 口上视角的阴茎块与默认视角是两段代码（源 :1064-1076 与 :1030-1040），
  // 各钉一次：只改口上那段时默认视角的断言看不见
  const male = info_world();
  const male_cid = male.run(0, always);
  male.set_talent(male_cid, 122, 1);
  male.fixture.store.set('flag:5', 2048);
  const male_lines = await male.info(male_cid);
  assert.ok(
    male_lines.some((l) => l.includes('小鸡鸡是……')),
    '口上视角的阴茎行（男性）',
  );
});

test('LOOK_INFO：返回 1（源 :1658 RETURN 1）', async () => {
  const w = info_world();
  const cid = w.run(0, always);
  assert.equal(await w.mod.look_info(cid), 1);
});

// ===========================================================================
// ere/chara/look.js：@LOOK_INFO_LOVE 的评分半（love_score）
// ===========================================================================

/** love_score 的驱动面：一个夹具、一个固定角色号、各表按需预置 */
function love_world() {
  const fixture = create_era_fixture();
  const mod = fixture.load_module('chara/look');
  const cid = 300;
  const set = (table) => (idx, value) => {
    fixture.store.set(`${table}:${cid}:${idx}`, value);
    return api;
  };
  const api = {
    fixture,
    mod,
    cid,
    set_talent: set('talent'),
    set_abl: set('abl'),
    set_exp: set('exp'),
    set_mark: set('mark'),
    set_cflag: set('cflag'),
    score() {
      return mod.love_score(cid);
    },
  };
  return api;
}

/**
 * 「预置一项 → 目标下标的增量」的表驱动骨架（只钉一条加減）。
 * @param {string} table 变量族（talent / abl / exp / mark / cflag）
 * @param {number} src_idx 预置的下标
 * @param {number} target 被改动的 LOVE 下标
 * @param {number} expected 期望增量
 * @param {string} note 断言说明
 */
function love_delta(table, src_idx, target, expected, note) {
  test(`love_score ${table}:${src_idx} → LOVE:${target} 增量 ${expected}（${note}）`, () => {
    const w = love_world();
    const base = w.score()[target];
    w[`set_${table}`](src_idx, 1);
    assert.equal(w.score()[target] - base, expected);
  });
}

// —— 种族補正（:1755-1793）——

test('love_score 种族補正：高洁（精灵/天使）与恶（吸血鬼/无头骑士）', () => {
  for (const race of [1, 6]) {
    const w = love_world();
    const base = w.score();
    w.set_talent(314, race);
    const after = w.score();
    assert.deepEqual(
      [
        after[2] - base[2],
        after[21] - base[21],
        after[22] - base[22],
        after[40] - base[40],
        after[42] - base[42],
        after[61] - base[61],
      ],
      [1, -1, -1, 1, 1, -1],
      `种族 ${race}`,
    );
  }
  for (const race of [3, 4]) {
    const w = love_world();
    const base = w.score();
    w.set_talent(314, race);
    const after = w.score();
    assert.deepEqual(
      [
        after[2] - base[2],
        after[21] - base[21],
        after[22] - base[22],
        after[40] - base[40],
        after[42] - base[42],
      ],
      [-1, 1, 1, -1, -1],
      `种族 ${race}`,
    );
  }
});

test('love_score 种族補正：人狼（含野良犬/兽姦）', () => {
  const w = love_world();
  const base = w.score();
  w.set_talent(314, 2);
  const after = w.score();
  assert.deepEqual(
    [
      after[2] - base[2],
      after[40] - base[40],
      after[42] - base[42],
      after[41] - base[41],
      after[60] - base[60],
      after[61] - base[61],
    ],
    [-1, 1, 1, 1, 1, 1],
  );
});

test('love_score 种族補正：堕落（暗精灵/堕天使/魔族）三档', () => {
  for (const race of [7, 8, 9]) {
    const w = love_world();
    const base = w.score();
    w.set_talent(314, race);
    const after = w.score();
    assert.deepEqual(
      [
        after[2] - base[2],
        after[21] - base[21],
        after[22] - base[22],
        after[40] - base[40],
        after[42] - base[42],
      ],
      [-2, 2, 2, -2, -1],
      `种族 ${race}`,
    );
  }
});

// —— 元の職業補正（:1797-1852）——

test('love_score 职业補正：修道女/聖女、妓女、盗人、乞食/貧民、貴族、巫女、主婦', () => {
  for (const job of [2, 12]) {
    const w = love_world();
    const base = w.score();
    w.set_talent(315, job);
    const after = w.score();
    assert.deepEqual(
      [
        after[2] - base[2],
        after[20] - base[20],
        after[21] - base[21],
        after[22] - base[22],
        after[30] - base[30],
      ],
      [3, -1, -1, -1, 1],
      `职业 ${job}`,
    );
  }
  love_delta('talent', 315, 21, 0, '职业 1（学生）不属任何一支');
});

test('love_score 职业補正：五支各自的加減', () => {
  const cases = [
    [
      5,
      [
        [21, 2],
        [22, 2],
      ],
    ],
    [
      6,
      [
        [2, -2],
        [30, -1],
      ],
    ],
    [7, [[2, 1]]],
    [9, [[2, 1]]],
    [
      8,
      [
        [21, -1],
        [22, -1],
        [50, 1],
      ],
    ],
    [11, [[21, -2]]],
    [
      21,
      [
        [21, 1],
        [22, -1],
        [40, 2],
      ],
    ],
  ];
  for (const [job, deltas] of cases) {
    const w = love_world();
    const base = w.score();
    w.set_talent(315, job);
    const after = w.score();
    for (const [idx, delta] of deltas) {
      assert.equal(after[idx] - base[idx], delta, `职业 ${job} → LOVE:${idx}`);
    }
  }
});

// —— 理由補正（:1856-1869）——

test('love_score 理由補正：不纯动机与义理名分', () => {
  for (const reason of [2, 11]) {
    const w = love_world();
    const base = w.score();
    w.set_talent(316, reason);
    const after = w.score();
    assert.deepEqual(
      [after[2] - base[2], after[22] - base[22]],
      [-1, 1],
      `理由 ${reason}`,
    );
  }
  for (const reason of [16, 17]) {
    const w = love_world();
    const base = w.score();
    w.set_talent(316, reason);
    const after = w.score();
    assert.deepEqual(
      [after[2] - base[2], after[30] - base[30]],
      [3, 1],
      `理由 ${reason}`,
    );
  }
});

// —— 喜欢的东西補正（:1901-1933）——

test('love_score 喜好補正：故乡恋人/金钱/家族（三种）/使命/可爱动物', () => {
  // 喜好 4（故乡的恋人）→ 恋人(42) +3：317 是「档位」不是开关，直接给值
  const hometown = love_world();
  const b0 = hometown.score();
  hometown.set_talent(317, 4);
  assert.equal(hometown.score()[42] - b0[42], 3, '喜好 4（故乡的恋人）');
  const money = love_world();
  const base = money.score();
  money.set_talent(317, 5);
  assert.deepEqual(
    [money.score()[2] - base[2], money.score()[22] - base[22]],
    [-1, 1],
  );

  for (const [flag, target] of [
    [157, 40],
    [140, 51],
    [141, 52],
  ]) {
    // 差值要取「有喜好 8」与「无喜好 8」两次同素质的对照——素质本身
    // （人妻/恋母/恋父）各自另有加算，直接拿全 0 基准会把两者混在一起
    const with_flag = love_world();
    with_flag.set_talent(flag, 1);
    const b1 = with_flag.score()[target];
    with_flag.set_talent(317, 8);
    assert.equal(with_flag.score()[target] - b1, 3, `喜好 8 + 素质 ${flag}`);
  }

  for (const like of [9, 10]) {
    const w = love_world();
    const b = w.score();
    w.set_talent(317, like);
    assert.equal(w.score()[2] - b[2], 1, `喜好 ${like}`);
  }

  const animal = love_world();
  const b = animal.score();
  animal.set_talent(317, 12);
  assert.deepEqual(
    [animal.score()[60] - b[60], animal.score()[61] - b[61]],
    [1, 1],
    '喜好 12（可爱的动物）',
  );
});

// —— 陥落度合い（:1937-1962）——

test('love_score 陥落度合い三档（源 :1937-1962 含 ELSE 支）', () => {
  // 三支的落点是 你(1)/世界(2)/コンプレックス(50)；ELSE 支（fall = 0）也在
  // 同一判据链里，所以基准不能拿「不设 CFLAG:0」当 0 点——这里钉绝对值
  const cases = [
    [
      1,
      [
        [1, 1],
        [2, -1],
        [50, 1],
      ],
    ],
    [
      2,
      [
        [1, 2],
        [2, -2],
        [50, 2],
      ],
    ],
    [
      0,
      [
        [1, -1],
        [2, 1],
        [50, -1],
      ],
    ],
  ];
  for (const [fall, expect] of cases) {
    const w = love_world();
    w.set_cflag(0, fall);
    const after = w.score();
    for (const [idx, value] of expect) {
      assert.equal(after[idx], value, `沦落度 ${fall} → LOVE:${idx}`);
    }
  }
});

// —— 素質による補正（:1964-2233）——

test('love_score 素质補正：淫乱 / 爱慕 / 处女 / 童贞 / 崩坏', () => {
  const lust = love_world();
  const b1 = lust.score();
  lust.set_talent(76, 1);
  assert.deepEqual(
    [
      lust.score()[1] - b1[1],
      lust.score()[2] - b1[2],
      lust.score()[50] - b1[50],
    ],
    [-1, -5, 5],
    '淫乱',
  );

  const love = love_world();
  const b2 = love.score();
  love.set_talent(85, 1);
  assert.deepEqual(
    [love.score()[1] - b2[1], love.score()[2] - b2[2]],
    [10, -5],
    '爱慕',
  );

  love_delta('talent', 0, 11, -60, '处女');
  const virgin = love_world();
  const b3 = virgin.score();
  virgin.set_talent(1, 1);
  assert.deepEqual(
    [virgin.score()[4] - b3[4], virgin.score()[20] - b3[20]],
    [-1, 1],
    '童贞',
  );

  const broken = love_world();
  const b4 = broken.score();
  broken.set_talent(9, 1);
  const after = broken.score();
  assert.deepEqual(
    [1, 2, 20, 21, 22, 31, 35, 40, 42, 41, 50, 60, 61].map(
      (i) => after[i] - b4[i],
    ),
    // 40（夫）的 +3 被相互作用里的 `pool:40 -= main:41 / 3` 抵掉 1（41 同期 +3）
    [-3, -60, 3, 3, 3, 3, 3, 2, 3, 3, 3, 1, 1],
    '崩坏（源 :1980-2015）',
  );
});

test('love_score 素质補正：各 ±1 档与独立加成', () => {
  const ones = [
    [23, 50, 1], // 好奇心
    [35, 35, 1], // 害羞
    [40, 33, 1], // 害怕疼痛
    [57, 35, 1], // 漏尿癖
    [60, 20, 1], // 容易自慰
    // 124 的 61 增量是 1（動物耳朵）+ 3（牝犬，源同为 TALENT:124 的两段）
    [124, 61, 4],
    [130, 13, 1], // 喷涂体质
    // 51/52/53/54 的池子回调：源 :1972-1981 把 50 加进它们，而 50 在
    // ELSE 支（fall = 0）里是 -1 → 10 - 1 = 9
    [140, 51, 9], // 恋母情结
    [141, 52, 9], // 恋父情结
    // 萝莉控的 53 会被 pool 抵掉 1：源 :1969 的 `pool:53 += main:50`，
    // 而 50 在 ELSE 支（fall = 0）里是 -1
    [142, 53, 9],
    [143, 54, 9], // 正太控（同样被池子回调，见上）
    [157, 40, 3], // 人妻
    [180, 22, 1], // 妓女
    [181, 22, 2], // 倾城
    [230, 10, 3], // 淫核
    [232, 11, 3], // 淫壶
    [233, 12, 3], // 淫肛
    [231, 13, 3], // 淫乳
    [273, 11, -3], // 私处封印
  ];
  for (const [talent_idx, target, delta] of ones) {
    const w = love_world();
    const base = w.score();
    w.set_talent(talent_idx, 1);
    assert.equal(
      w.score()[target] - base[target],
      delta,
      `素质 ${talent_idx} → LOVE:${target}`,
    );
  }
});

test('love_score 素质補正：保守/看重贞操/看轻贞操/不知羞耻/从不自慰/绝不侍奉', () => {
  const cases = [
    [
      24,
      [
        [22, -1],
        [50, -1],
      ],
    ],
    [
      30,
      [
        [21, -1],
        [22, -1],
        [50, -1],
      ],
    ],
    [
      31,
      [
        [21, 1],
        [22, 1],
        [50, 1],
      ],
    ],
    [36, [[35, -1]]],
    [150, [[20, -60]]],
    [151, [[30, -60]]],
  ];
  for (const [talent_idx, deltas] of cases) {
    const w = love_world();
    const base = w.score();
    w.set_talent(talent_idx, 1);
    const after = w.score();
    for (const [idx, delta] of deltas) {
      assert.equal(
        after[idx] - base[idx],
        delta,
        `素质 ${talent_idx} → LOVE:${idx}`,
      );
    }
  }
});

test('love_score 素质補正：喜好精液 / 施虐狂 / 受虐狂 / 露出狂的十分档', () => {
  for (const [talent_idx, target] of [
    [47, 31],
    [83, 34],
    [88, 33],
    [89, 35],
  ]) {
    const w = love_world();
    const base = w.score();
    w.set_talent(talent_idx, 1);
    assert.equal(w.score()[target] - base[target], 10, `素质 ${talent_idx}`);
  }
});

test('love_score 素质補正：自慰狂/性爱狂/尻穴狂/弄乳狂', () => {
  const cases = [
    [
      74,
      [
        [10, 3],
        [20, 3],
      ],
    ],
    [
      75,
      [
        [11, 3],
        [21, 3],
      ],
    ],
    [
      77,
      [
        [12, 3],
        [20, 1],
        [21, 1],
      ],
    ],
    [
      78,
      [
        [13, 3],
        [20, 3],
      ],
    ],
  ];
  for (const [talent_idx, deltas] of cases) {
    const w = love_world();
    const base = w.score();
    w.set_talent(talent_idx, 1);
    const after = w.score();
    for (const [idx, delta] of deltas) {
      assert.equal(
        after[idx] - base[idx],
        delta,
        `素质 ${talent_idx} → LOVE:${idx}`,
      );
    }
  }
});

test('love_score 素质補正：倒错的（含与双性恋同条件的两支）', () => {
  const w = love_world();
  const base = w.score();
  w.set_talent(80, 1);
  const after = w.score();
  // 32 计两次：源里「倒錯的」与「双性恋」两段都写 IF TALENT:80
  assert.deepEqual(
    [32, 33, 34, 35, 50, 60, 61].map((i) => after[i] - base[i]),
    [2, 1, 1, 1, 1, 1, 1],
  );
});

test('love_score 素质補正：钝感/敏感八档', () => {
  const cases = [
    [101, 10, -1],
    [102, 10, 1],
    [103, 11, -1],
    [104, 11, 1],
    [105, 12, -1],
    [106, 12, 1],
    [107, 13, -1],
    [108, 13, 1],
  ];
  for (const [talent_idx, target, delta] of cases) {
    const w = love_world();
    const base = w.score();
    w.set_talent(talent_idx, 1);
    assert.equal(
      w.score()[target] - base[target],
      delta,
      `素质 ${talent_idx} → LOVE:${target}`,
    );
  }
});

test('love_score 素质補正：扶她/男人与早泄的相互条件', () => {
  for (const talent_idx of [121, 122]) {
    const w = love_world();
    const base = w.score();
    w.set_talent(talent_idx, 1);
    assert.equal(w.score()[4] - base[4], 1, `素质 ${talent_idx} → 自ペニス +1`);
  }

  // 早泄单独置位（无男人/扶她）→ 不减
  love_delta('talent', 133, 4, 0, '早泄且非男人/扶她');
  const w = love_world();
  const base = w.score();
  w.set_talent(133, 1);
  w.set_talent(122, 1);
  assert.equal(w.score()[4] - base[4], 0, '早泄 + 男人：+1 与 -1 相抵');
});

test('love_score 素质補正：肉便器与狂王俘虏', () => {
  const w = love_world();
  const base = w.score();
  w.set_talent(204, 1);
  const after = w.score();
  assert.deepEqual(
    [2, 21, 22, 40, 42].map((i) => after[i] - base[i]),
    [-1, 1, 1, -1, -1],
    '肉便器',
  );

  const king = love_world();
  const b2 = king.score();
  king.set_talent(280, 1);
  assert.deepEqual(
    [king.score()[1] - b2[1], king.score()[62] - b2[62]],
    [-10, 30],
    '狂王俘虏',
  );
});

test('love_score 相互作用：コンプレックスがこじれる（四支）与野良犬/夫の相関', () => {
  // 51-54 有值时把 50 加进池子（源 :1972-1981 的四支 SIF）
  for (const [talent_idx, idx] of [
    [140, 51],
    [141, 52],
    [142, 53],
    [143, 54],
  ]) {
    const w = love_world();
    w.set_talent(talent_idx, 1); // 对应项 +10
    w.set_talent(23, 1); // 好奇心 → 50 +1
    const score = w.score();
    // 素质分 10 + 池子里的 コンプレックス 分。50 的净值是 0：源 :1959-1961
    // 的 ELSE 支给 -1、好奇心给 +1——池子因此加 0，只留素质分
    assert.equal(
      score[idx],
      10,
      `LOVE:${idx} = 素质分 + コンプレックス净分（0）`,
    );
  }

  // 獣姦好きは野良犬も好き：60 += 61/2（源 :2587）
  const w = love_world();
  w.set_talent(124, 1); // 動物耳朵 → 61 +1；牝犬 → 60 +3、61 +3
  const s = w.score();
  assert.equal(s[61], 1 + 3, '61 = 動物耳朵 1 + 牝犬 3');
  assert.equal(s[60], 3 + Math.trunc(4 / 2), '60 = 牝犬 3 + 61/2（4/2 = 2）');
});

test('love_score 相互作用：喜好 12 时把野良犬/兽姦折算进「喜欢的东西」', () => {
  const w = love_world();
  w.set_talent(142, 1); // 53 += 10（让 51-54 有值，证明池子只对第 0 项生效）
  w.set_talent(124, 1); // 61 +1（動物耳朵）、60 +3 / 61 +3（牝犬）
  w.set_talent(317, 12); // 喜好 12 → 60 +1、61 +1；池子再给第 0 项加 60/3 + 61/3
  const after = w.score();
  assert.equal(
    after[60],
    1 + 3 + Math.trunc(after[61] / 2),
    '60 = 喜好 1 + 牝犬 3 + 61/2',
  );
  assert.equal(after[61], 1 + 1 + 3, '61 = 喜好 1 + 動物耳朵 1 + 牝犬 3');
  assert.equal(
    after[0],
    15 + Math.trunc(4 / 3) + Math.trunc(5 / 3),
    '第 0 项 = 15 + 池子（60/3 + 61/3，用的是**加池子前**的 60 = 4 / 61 = 5）',
  );
});

// —— 能力/经验/刻印（:2437-2558）——

test('love_score 能力補正：四感无条件和、顺从/欲望/技巧', () => {
  const w = love_world();
  const base = w.score();
  w.set_abl(0, 2);
  w.set_abl(1, 3);
  w.set_abl(2, 4);
  w.set_abl(3, 5);
  const after = w.score();
  assert.deepEqual(
    [
      after[10] - base[10],
      after[13] - base[13],
      after[11] - base[11],
      after[12] - base[12],
    ],
    [2, 3, 4, 5],
    'ABL:0..3 无条件入 C/B/V/A 性感',
  );

  const sub = love_world();
  const b2 = sub.score();
  sub.set_talent(85, 1);
  sub.set_abl(10, 2);
  assert.equal(sub.score()[1] - b2[1], 10 + 2 * 3, '顺从：爱慕 10 + ABL:10 ×3');

  const lust = love_world();
  const b3 = lust.score();
  lust.set_talent(76, 1);
  lust.set_abl(11, 2);
  assert.equal(
    lust.score()[50] - b3[50],
    5 + 2 * 3,
    '欲望：淫乱 5 + ABL:11 ×3',
  );

  const tech = love_world();
  const b4 = tech.score();
  tech.set_abl(13, 2);
  tech.set_abl(12, 3);
  tech.set_abl(14, 4);
  const t = tech.score();
  assert.equal(
    t[30] - b4[30],
    2 + 3 + 0,
    '侍奉技术：ABL:13 + ABL:12（另加 ABL:16 = 0）',
  );
  assert.equal(t[21] - b4[21], 4 + 3, '性交技术：ABL:14 + ABL:12');
});

test('love_score 能力補正：无条件入项（16/17/20/21/22/23/30-39）', () => {
  const cases = [
    [16, 30, 1],
    [17, 35, 1],
    [20, 34, 1],
    [21, 33, 1],
    [22, 32, 1],
    [23, 32, 1],
    [30, 21, 3],
    [31, 20, 3],
    [32, 31, 3],
    [33, 32, 3],
    [37, 22, 3],
    [39, 61, 3],
  ];
  for (const [abl_idx, target, delta] of cases) {
    const w = love_world();
    const base = w.score();
    w.set_abl(abl_idx, 1);
    assert.equal(
      w.score()[target] - base[target],
      delta,
      `ABL:${abl_idx} → LOVE:${target}`,
    );
  }
});

test('love_score 经验補正：七组三档阈值（>100/+3、>30/+2、>0/+1）', () => {
  const pairs = [
    [8, 31],
    [21, 30],
    [23, 1],
    [30, 33],
    [32, 12],
    [33, 34],
    [75, 22],
  ];
  for (const [exp_idx, target] of pairs) {
    for (const [value, delta] of [
      [101, 3],
      [31, 2],
      [1, 1],
      [0, 0],
    ]) {
      const w = love_world();
      const base = w.score();
      w.set_exp(exp_idx, value);
      assert.equal(
        w.score()[target] - base[target],
        delta,
        `EXP:${exp_idx} = ${value} → LOVE:${target}`,
      );
    }
  }
});

test('love_score：新夫/恋人ボーナス与刻印', () => {
  const w = love_world();
  const base = w.score();
  w.set_cflag(602, 10);
  w.set_cflag(607, 9);
  const after = w.score();
  assert.deepEqual(
    [after[41] - base[41], after[42] - base[42]],
    [Math.trunc(10 / 3), Math.trunc(9 / 3)],
    'CFLAG:602/607 各 /3（整数除法）',
  );

  const coin = love_world();
  const b2 = coin.score();
  coin.set_mark(1, 2);
  coin.set_mark(3, 3);
  const c2 = coin.score();
  assert.deepEqual(
    [c2[50] - b2[50], c2[1] - b2[1]],
    [2 * 3, -3 * 5],
    '快乐刻印 ×3 / 反抗刻印 ×5',
  );
});

// ===========================================================================
// ere/chara/look.js：@LOOK_INFO_LOVE 的显示半（look_info_love）
// ===========================================================================

test('look_info_love：显示行的排序、心形数与「共 N 个」计数', async () => {
  const w = love_world();
  w.fixture.store.set(`callname:${w.cid}:-1`, '角色丙');
  // 让「精液」与「被人虐待」都越过 3 分门槛，且分值不同（心形数可分）
  w.set_talent(317, 1); // 喜好 = 甜食（LOVE_LIKE_BASE 只认登记的档）
  w.set_talent(47, 1); // 精液 +10 → 心形 10/5-1 = 1
  w.set_talent(88, 1); // 受虐（= 被人虐待）+10
  w.set_talent(140, 1); // 恋母情结 +10
  await w.mod.look_info_love(w.cid);
  const lines = w.fixture.text_lines();
  assert.ok(lines.includes('[喜欢的东西]'), '默认视角的引子');
  const row = lines.find((l) => l.includes('甜食'));
  assert.ok(row !== undefined, '第 0 项（喜好）出现在同一行');
  assert.ok(row.includes('♡'), '心形按分值给出');
  assert.ok(
    lines.some((l) => /^\[共\d+个喜欢的东西\]$/.test(l)),
    '收尾计数行',
  );
});

test('look_info_love：满桌角色的整屏输出（排序 × 心形 × 每行 6 个 × 计数）', async () => {
  // 把能越过 3 分门槛的素质/能力全点亮，让显示面一次走满：本用例同时钉住
  // ① 降序排序（同值按添字序）② 心形数 = 分值/5-1 ③ 每行 6 个（LOVE_PER_ROW）
  // ④ 收尾计数。任何一处改动（换行位置、排序、心形、名字）都会红。
  //
  // 已知盲区：LOVE_SORT_MAX（30）改小到 29 测不出来——显示面最多只有 28 项
  // （名字表里能出词的档位就这些），29 与 30 对输出等价。
  const w = love_world();
  for (const idx of [
    0, 1, 9, 23, 24, 30, 31, 35, 36, 40, 47, 57, 60, 74, 75, 76, 77, 78, 80, 83,
    85, 88, 89, 101, 102, 103, 104, 105, 106, 107, 108, 121, 122, 124, 130, 133,
    140, 141, 142, 143, 150, 151, 157, 180, 181, 204, 230, 231, 232, 233, 273,
    280, 317,
  ]) {
    w.set_talent(idx, 1);
  }
  for (const idx of [
    0, 1, 2, 3, 10, 11, 12, 13, 14, 16, 17, 20, 21, 22, 23, 30, 31, 32, 33, 37,
    39,
  ]) {
    w.set_abl(idx, 5);
  }
  await w.mod.look_info_love(w.cid);
  assert.deepEqual(w.fixture.text_lines(), [
    '[喜欢的东西]',
    '　做爱♡♡♡♡♡　人妻♡♡♡♡♡　中年大叔♡♡♡♡♡　萝莉的小穴♡♡♡♡♡　正太的阴茎♡♡♡♡♡　狂王大人♡♡♡♡♡　',
    '　精液♡♡♡♡　断背行为♡♡♡♡　卖淫♡♡♡　和野兽交配♡♡♡　露出身体♡♡♡　被人虐待♡♡　',
    '　虐待别人♡♡　甜食♡♡　野狗大人♡♡　被弄乳房♡　被玩弄阴茎♡　被弄菊穴♡　',
    '　伴侣　',
    ' ',
    '[共19个喜欢的东西]',
  ]);
});

test('look_info_love：分值 <= 3 与未登记的喜好都不显示，计数据此计数', async () => {
  const w = love_world();
  await w.mod.look_info_love(w.cid);
  assert.equal(
    w.fixture.text_lines().find((l) => l.startsWith('[共')),
    '[共0个喜欢的东西]',
    '全 0 素质且喜好未登记 → 一件都不显示（源 :2711 与 :2715 两道闸）',
  );

  const listed = love_world();
  listed.set_talent(317, 1); // 甜食 → 第 0 项命中
  await listed.mod.look_info_love(listed.cid);
  assert.equal(
    listed.fixture.text_lines().find((l) => l.startsWith('[共')),
    '[共1个喜欢的东西]',
    '喜好登记后第 0 项显示',
  );
});

test('look_info_love：id 11（被弄小穴）对男人不显示', async () => {
  const w = love_world();
  w.set_talent(75, 1); // 性爱狂 → 11 +3
  w.set_abl(2, 1); // V性感 +1 → 合计 4 > 3
  await w.mod.look_info_love(w.cid);
  assert.ok(
    w.fixture.text_lines().some((l) => l.includes('被弄小穴')),
    '女性显示',
  );

  const male = love_world();
  male.set_talent(122, 1);
  male.set_talent(75, 1);
  male.set_abl(2, 1);
  await male.mod.look_info_love(male.cid);
  assert.ok(
    !male.fixture.text_lines().some((l) => l.includes('被弄小穴')),
    '男人跳过（源 :2720）',
  );
});

test('look_info_love：id 50（コンプレックス）恒不显示，但决定 51-61 的措辞', async () => {
  const w = love_world();
  w.set_talent(140, 1); // 母 +10
  w.set_talent(23, 1); // 好奇心 → 50 +1
  await w.mod.look_info_love(w.cid);
  const lines = w.fixture.text_lines().join('\n');
  assert.ok(!lines.includes('コンプレックス'), '50 号项本身不显示');
  assert.ok(lines.includes('妈妈'), '50 <= 6 → 「妈妈」（源 :2757）');

  const lewd = love_world();
  lewd.set_talent(140, 1);
  lewd.set_talent(76, 1); // 淫乱 → 50 +5
  lewd.set_talent(23, 1); // 好奇心 → 50 +1
  lewd.set_talent(31, 1); // 看轻贞操 → 50 +1
  lewd.set_cflag(0, 1); // 沦落度 1 → 50 +1（合计 8，越过 > 6 的槛）
  await lewd.mod.look_info_love(lewd.cid);
  assert.ok(
    lewd.fixture.text_lines().some((l) => l.includes('人妻')),
    '50 > 6 → 「人妻」',
  );
});

test('look_info_love：恋人（42）四支措辞', async () => {
  const cases = [
    [0, 0, '将来的老公'],
    [0, 1, '将来的伴侣'],
    [200, 0, '恋人'],
  ];
  for (const [lover, male, expected] of cases) {
    const w = love_world();
    w.set_talent(122, male);
    w.set_cflag(606, lover);
    // 恋人(42) 要越过 >3 的门槛：喜好 4 给 +3、高洁种族（精灵）再给 +1
    w.set_talent(317, 4);
    w.set_talent(314, 1);
    await w.mod.look_info_love(w.cid);
    assert.ok(
      w.fixture.text_lines().some((l) => l.includes(expected)),
      `LOVER = ${lover} 男人 = ${male} → ${expected}`,
    );
  }

  // 其余档取登记表名（14 格全角填充）
  const named = love_world();
  named.set_cflag(606, 1);
  named.set_talent(317, 4);
  named.set_talent(314, 1);
  await named.mod.look_info_love(named.cid);
  assert.ok(
    named.fixture.text_lines().some((l) => l.includes('恋人的温柔的青年')),
    '登记表名（dungeon-lovers 的 LOVER_NAMES）',
  );
});

test('look_info_love：心形数 = 分值/5 - 1（含封顶 6）', async () => {
  // 造一个分值 20 的项：淫壶（232）+3、ABL:2（V感覚）+17 → LOVE:11 = 20
  const w = love_world();
  w.set_talent(232, 1);
  w.set_abl(2, 17);
  await w.mod.look_info_love(w.cid);
  const row = w.fixture.text_lines().find((l) => l.includes('被弄小穴'));
  assert.ok(row !== undefined, 'V性感 20 → 越 3 分门槛，必显示');
  // 断言带尾随的全角空格：只查前缀会漏（4 个心形的串包含 3 个心形的串）
  assert.ok(
    row.includes('被弄小穴♡♡♡　'),
    `心形 3 个（20/5-1；除数写成 4 会变 4 个）：${row}`,
  );

  // 封顶：分值 40 时心形仍是 6 个（源 :2743 SIF HEART > 6）
  const cap = love_world();
  cap.set_talent(232, 1);
  cap.set_abl(2, 37); // 40
  await cap.mod.look_info_love(cap.cid);
  const cap_row = cap.fixture.text_lines().find((l) => l.includes('被弄小穴'));
  assert.ok(
    cap_row.includes('被弄小穴♡♡♡♡♡♡　'),
    `分值 40 封顶 6 个心形：${cap_row}`,
  );
});

test('look_info_love：口上视角的收尾（引子与」）', async () => {
  const w = love_world();
  w.fixture.store.set('flag:5', 2048);
  await w.mod.look_info_love(w.cid);
  const lines = w.fixture.text_lines();
  assert.ok(lines.includes('「喜欢的东西是……'));
  assert.ok(lines.includes('」 '), '口上收尾（源 :2773）');
});

test('look_info_love：返回 1（源 :2803 RETURN 1）', async () => {
  const w = love_world();
  assert.equal(await w.mod.look_info_love(w.cid), 1);
});
