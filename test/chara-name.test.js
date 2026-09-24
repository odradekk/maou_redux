/**
 * @file ere/chara/chara-name.js 的行为测试（issue #384，N2 段 1 枢纽）。
 *
 * 源: target/ERB/キャラ関数/CHARA_NAME.ERB 全函数（:14-604）。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一测试注入点）。随机源一律经
 * 公开形参注入确定序列（seq / seq_capture，chara-self-call.test.js 先例）：
 * 漏给就落到真随机，用例只在一部分抽样里真的守住那个行为。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 固定随机序：越界访问即断言失败，越界不静默回落成 0（issue #16 惯例） */
function seq(values) {
  let index = 0;
  return (n) => {
    const value = values[index++] ?? 0;
    assert.ok(value >= 0 && value < n, `随机值 ${value} 必须在 [0, ${n}) 内`);
    return value;
  };
}

/**
 * 记录每次调用传入的上界 n（返回值仍按 index 顺序取），专用于钉住「随机上界」
 * 这类字面量数值：变异把 rand(40) 改成 rand(41) 时，只断返回值的分支结果不会
 * 发现（同一个固定返回值对任何 n 的分支结果都一样），只有直接断实际传入的 n
 * 才钉得住。chara-self-call.test.js 先例。
 */
function seq_capture(values) {
  const bounds = [];
  let index = 0;
  const rand = (n) => {
    bounds.push(n);
    return values[index++] ?? 0;
  };
  rand.bounds = bounds;
  return rand;
}

function load(fixture) {
  return fixture.load_module('chara/chara-name');
}

/** NAME:x / CALLNAME:x / SAVESTR:x 在 ere 侧同为 callname 表的两个键（#5 决议） */
function names_of(fixture, cid) {
  return {
    name: fixture.store.get(`callname:${cid}:-1`),
    callname: fixture.store.get(`callname:${cid}:-2`),
  };
}

// —— @CHARA_NAME_DEFINE（:147-202）——

test('chara_name_define：特殊角色（NO 0 与 17-40）取 CSV 预设名并固定 NID = 10000 + NO', () => {
  for (const cid of [0, 17, 40]) {
    const fixture = create_era_fixture();
    fixture.store.set('cflag:0:6', 7); // 反例：预设 NID 必须被覆盖
    // 引擎的 chara: 静态表（yml/Chara<N>.yml 的装载结果），CSVCALLNAME 的读数源
    fixture.store.set(`chara:${cid}`, {
      id: cid,
      name: `预设名${cid}`,
      callname: `预称呼${cid}`,
    });
    const { chara_name_define } = load(fixture);

    assert.equal(chara_name_define(cid, 1234), 0, ':161 RETURN 0');
    // :159 的写入值走 var_writes：紧随其后的 RELATION_RENAME_REBUILD 会用
    // chara-family 的 nid() 覆写同一个键，只看 store 会漏掉这一处的常量
    const writes = fixture.var_writes.filter(
      (write) => write.name === `cflag:${cid}:6`,
    );
    assert.equal(
      writes[0]?.value,
      10_000 + cid,
      `:159 首次写入 10000 + NO（${cid}）——后续的 RELATION_RENAME_REBUILD ` +
        '会用 chara-family 的 nid() 再写一次同一个键，只看 store 会漏掉这一处',
    );
    assert.deepEqual(
      names_of(fixture, cid),
      { name: `预称呼${cid}`, callname: `预称呼${cid}` },
      `NO ${cid} 取 CSVCALLNAME 而非传入的 NID 1234`,
    );
  }
});

test('chara_name_define：特殊角色区间两侧——16 与 41 走普通路径', () => {
  for (const cid of [16, 41]) {
    const fixture = create_era_fixture();
    const { chara_name_define } = load(fixture);
    chara_name_define(cid, 205);
    assert.equal(
      fixture.store.get(`cflag:${cid}:6`),
      205,
      `NO ${cid} 不在 [17,40] 内，预设 NID 生效`,
    );
  }
});

test('chara_name_define：默认 L_NID = -1 时沿用 CFLAG:6 现值', () => {
  const fixture = create_era_fixture();
  fixture.store.set('cflag:5:6', 205);
  fixture.store.set('namelistkeys', [205]);
  fixture.store.set('namelistname:205', '露娜');
  const { chara_name_define } = load(fixture);
  chara_name_define(5);
  assert.equal(fixture.store.get('cflag:5:6'), 205, ':166 L_NID = CFLAG:L_A:6');
  // 名单里 205 号有名字 → 名字必须按 205 查出来（缺了 :166 的回读会落 佳奈美）
  assert.equal(
    fixture.store.get('callname:5:-1'),
    '露娜',
    ':176 查的是 CFLAG:6',
  );
});

test('chara_name_define：显式 NID 写回 CFLAG:6，并在两次改名点重建关系对角', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(3, { id: 3, name: '甲', callname: '甲' });
  fixture.era.addCharacter(3);
  fixture.store.set('c_relation:3:3', 999); // 与 NID 不一致 → 触发重建
  const { chara_name_define } = load(fixture);

  fixture.store.set('cflag:3:6', 205);
  chara_name_define(3, 205);
  assert.equal(fixture.store.get('c_relation:3:3'), 205, ':169 重建写对角');

  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  fixture.store.set('c_relation:0:0', 12345); // MASTER 的对角错位
  chara_name_define(0);
  assert.equal(fixture.store.get('c_relation:0:0'), 10_000, ':160 重建写对角');
});

test('chara_name_define：固定名列表命中时写入三个名字键', () => {
  const fixture = create_era_fixture();
  fixture.store.set('namelistkeys', [205]);
  fixture.store.set('namelistname:205', '露娜');
  const { chara_name_define } = load(fixture);
  chara_name_define(9, 205);
  assert.deepEqual(names_of(fixture, 9), {
    name: '露娜',
    callname: '露娜',
  });
});

test('chara_name_define：固定名列表空串（有产物但该编号没记名字）回落佳奈美', () => {
  const fixture = create_era_fixture();
  fixture.store.set('namelistkeys', [205]); // 已注册、但名字是空串
  fixture.store.set('namelistname:205', '');
  const { chara_name_define } = load(fixture);
  chara_name_define(9, 205);
  assert.deepEqual(names_of(fixture, 9), {
    name: '佳奈美',
    callname: '佳奈美',
  });
});

test('chara_name_define：无效 NID（列表外）回落佳奈美', () => {
  // 5500 是 VARSIZE("LIST_CHARA_NAME") 的等价常量（CHARA_NAME.ERH:7）；
  // 5499（声明界内）与 5500（界外）都走「无效的NID」分支——:175 判的是
  // 声明尺寸而非注册表，两个边界都必须回落到佳奈美。
  // （:193 的 L_NID 钳位是死写、不可观察，故本用例只断名字；见
  // chara-name.js 该行的注释。）
  for (const nid of [5499, 5500]) {
    const fixture = create_era_fixture();
    fixture.store.set('namelistkeys', [205]);
    const { chara_name_define } = load(fixture);
    chara_name_define(9, nid);
    assert.deepEqual(
      names_of(fixture, 9),
      { name: '佳奈美', callname: '佳奈美' },
      `NID ${nid}`,
    );
  }
  // 尺寸判据的上界：5500 号**即使已注册**也必须走无效分支（:175 的 5500 是
  // 声明尺寸，不是注册表尺寸——把常量抬到 5501 就会去查这张表）
  const boundary = create_era_fixture();
  boundary.store.set('namelistkeys', [5500]);
  boundary.store.set('namelistname:5500', '越界名');
  const { chara_name_define: run_boundary } = load(boundary);
  run_boundary(9, 5500);
  assert.deepEqual(
    names_of(boundary, 9),
    { name: '佳奈美', callname: '佳奈美' },
    '5500 在声明尺寸外，即便已注册也不查表',
  );
});

test('chara_name_define：NID >= 1e9 走随机组合名（生成串写入三个名字键）', () => {
  const fixture = create_era_fixture();
  const { chara_name_define } = load(fixture);
  // 2e9 + 500 → 单段、唯一档位 500（「ー」）；见下方 cn_span_combine_name 用例
  chara_name_define(9, 2_000_000_500);
  assert.deepEqual(names_of(fixture, 9), {
    name: 'ー',
    callname: 'ー',
  });
});

test('chara_name_define：NID < 1e9 一侧走固定名表（空表回落佳奈美，不产随机名）', () => {
  // 999999999 是随机名下限 2000000000 与固定名上限 1e9 之间的最大值——
  // 两侧产出可辨（固定名分支回落「佳奈美」，随机名分支产出组合名串）
  const fixture = create_era_fixture();
  fixture.store.set('namelistkeys', [0]);
  const { chara_name_define } = load(fixture);
  chara_name_define(9, 999_999_999);
  assert.deepEqual(names_of(fixture, 9), {
    name: '佳奈美',
    callname: '佳奈美',
  });
});

// —— @CHARA_NAME_RESET（:209-218）——

test('chara_name_reset：17-40 的勇者取 CSV 呼び名覆盖称呼', () => {
  for (const cid of [17, 40]) {
    const fixture = create_era_fixture();
    fixture.store.set(`chara:${cid}`, {
      id: cid,
      name: '勇者',
      callname: '英雄',
    });
    fixture.store.set(`callname:${cid}:-1`, '旧名');
    const { chara_name_reset } = load(fixture);
    chara_name_reset(cid);
    assert.equal(fixture.store.get(`callname:${cid}:-2`), '英雄', `NO ${cid}`);
  }
});

test('chara_name_reset：区间外（16 / 41）回落姓名本体', () => {
  for (const cid of [16, 41]) {
    const fixture = create_era_fixture();
    fixture.store.set(`chara:${cid}`, {
      id: cid,
      name: '勇者',
      callname: '英雄',
    });
    fixture.store.set(`callname:${cid}:-1`, '本名');
    const { chara_name_reset } = load(fixture);
    chara_name_reset(cid);
    assert.equal(
      fixture.store.get(`callname:${cid}:-2`),
      '本名',
      `NO ${cid} 走 NAME:L_A 而非 CSV`,
    );
  }
});

// —— @CN_REBUILD（:225-230）——

test('cn_rebuild：逐个角色以姓名重建称呼，跳过 MASTER（0）', () => {
  const fixture = create_era_fixture();
  for (const cid of [0, 3, 7]) {
    fixture.seed_chara(cid, {
      id: cid,
      name: `名${cid}`,
      callname: `呼${cid}`,
    });
    fixture.era.addCharacter(cid);
    fixture.store.set(`callname:${cid}:-1`, `改后${cid}`);
    fixture.store.set(`callname:${cid}:-2`, '旧称呼');
  }
  const { cn_rebuild } = load(fixture);
  cn_rebuild();
  assert.equal(fixture.store.get('callname:3:-2'), '改后3');
  assert.equal(fixture.store.get('callname:7:-2'), '改后7');
  assert.equal(
    fixture.store.get('callname:0:-2'),
    '旧称呼',
    'MASTER 被 CONTINUE 跳过',
  );
});

// —— @NID_FINDCHARAS（:236-250）——

test('nid_findcharas：首个同 NID 角色；无命中时被哨兵 -1 顶走（原作 :241/:249 的合力）', () => {
  const fixture = create_era_fixture();
  for (const cid of [4, 6, 9]) {
    fixture.seed_chara(cid, {
      id: cid,
      name: `名${cid}`,
      callname: `名${cid}`,
    });
    fixture.era.addCharacter(cid);
  }
  fixture.store.set('cflag:4:6', 11);
  fixture.store.set('cflag:6:6', 22);
  fixture.store.set('cflag:9:6', 11); // 与 4 同 NID
  const { nid_findcharas } = load(fixture);
  assert.equal(nid_findcharas(11), 4, '升序集合里的首个同 NID 角色');
  assert.equal(nid_findcharas(22), 6);
  // VARSET RESULT 清零后 :249 的 -1 落在第 0 格 → 返回值就是 -1，不是 0
  assert.equal(nid_findcharas(999), -1, '无命中时哨兵顶到 RESULT:0');
});

// —— @NID_GET_TYPE（:255-265；#384 起真身在本文件）——

test('nid_get_type：三档分界与 [2000,3000) 的重叠缺陷', () => {
  const fixture = create_era_fixture();
  const { nid_get_type } = load(fixture);
  const cases = [
    ['组合名（> 1e9）', 1_000_000_001, 2],
    ['组合名边界 1e9 走非组合支', 1_000_000_000, 1],
    ['和名下界 200', 200, 0],
    ['和名下界前一格 199 → 洋名', 199, 1],
    ['和名上界 999', 999, 0],
    ['1000 → 洋名（与和名区间重叠，先中者胜）', 1000, 1],
    ['1999 → 洋名', 1999, 1],
    ['2000 → 洋名（缺陷：男性向和名编号 2000-2999 落此）', 2000, 1],
    ['2999 → 洋名（同缺陷）', 2999, 1],
    [
      '3000 → 洋名（缺陷：:261 的 >= 2000 先命中，:263 的 >= 3000 够不着）',
      3000,
      1,
    ],
    ['3999 → 洋名（同缺陷）', 3999, 1],
    ['4000 → 洋名（男性向和名实际终点）', 4000, 1],
    ['负数 NID → 洋名（:260 的 < 200 侧）', -1, 1],
  ];
  for (const [label, nid, expected] of cases) {
    assert.equal(nid_get_type(nid), expected, label);
  }
});

// —— @CN_SPAN_COMBINE_NAME_NUM / @CN_SPAN_COMBINE_NAME（:291-604）——

const VER2_TABLE = new Map([
  [200, 'アー'],
  [201, 'アム'],
  [202, 'アル'],
  [203, 'アン'],
  [204, 'イア'],
  [205, 'ウル'],
  [206, 'エア'],
  [207, 'カル'],
  [208, 'シー'],
  [209, 'シア'],
  [210, 'スト'],
  [211, 'ナル'],
  [212, 'ネア'],
  [213, 'フィル'],
  [214, 'フォル'],
  [215, 'ミス'],
  [216, 'メイ'],
  [217, 'メティ'],
  [218, 'ラオ'],
  [219, 'ラナ'],
  [220, 'リー'],
  [221, 'リィ'],
  [222, 'リズ'],
  [223, 'リュー'],
  [224, 'ルー'],
  [225, 'ルク'],
  [226, 'レイ'],
  [227, 'レセ'],
  [228, 'レラ'],
  [229, 'レン'],
  [300, 'ヴェ'],
  [301, 'シ'],
  [302, 'シェ'],
  [303, 'シャ'],
  [304, 'ティ'],
  [305, 'トゥ'],
  [306, 'リ'],
  [307, 'ル'],
  [308, 'レ'],
  [400, 'ヴィア'],
  [402, 'キア'],
  [403, 'シア'],
  [404, 'タ'],
  [405, 'タリア'],
  [406, 'ティア'],
  [407, 'ディア'],
  [408, 'ティス'],
  [409, 'ニア'],
  [410, 'ファ'],
  [411, 'フィア'],
  [412, 'フラ'],
  [413, 'ミア'],
  [414, 'リア'],
  [415, 'リカ'],
  [416, 'リス'],
  [417, 'リゼ'],
  [418, 'リマ'],
  [419, 'リル'],
  [420, 'ーズ'],
  [421, 'ーゼ'],
  [422, 'ーナ'],
  [423, 'ーファ'],
  [424, 'ーマ'],
  [425, 'ーラ'],
  [426, 'ッラ'],
  [500, 'ー'],
  [501, 'ン'],
  [900, 'サン'],
  [901, 'シフ'],
  [902, 'ソラ'],
  [903, 'ミロ'],
]);

test('cn_span_combine_name：ver0.2 全档位表——单段 NID 逐档映射（每档都有用例站两侧）', () => {
  const fixture = create_era_fixture();
  const { cn_span_combine_name } = load(fixture);
  // 单段取值恒落在 200-501（生成器的首段与末段实测范围），900 段由
  // 原作标注「使用しない」不在此列（它只可能出现在非末段，而 900 段是
  // 长词，见下一条用例）
  for (const [piece, word] of VER2_TABLE) {
    if (piece >= 900) {
      continue; // 生成器不产 900 段，留待「长词首段」用例覆盖
    }
    assert.equal(
      cn_span_combine_name(2_000_000_000 + piece),
      word,
      `档位 ${piece}`,
    );
  }
});

test('cn_span_combine_name：段首被吃规则——非首段丢掉 ア/イ/ウ/エ/オ/ン/ー，首段原样', () => {
  const fixture = create_era_fixture();
  const { cn_span_combine_name } = load(fixture);
  // 两段 NID = 2e9 + 末段 + 首段*1000（拆位从低位起：先末段，后首段）
  const cases = [
    [
      '首段 207「カル」+ 末段 400「ヴィア」',
      2_000_000_000 + 207_400,
      'ヴィアカル',
    ],
    // 401 档在原作里不存在（:430 的重复 400 是死档，见文件头）：段值落空时
    // :346-497 的 IF 链没有 ELSE，LOCALS 保持上一轮的值。低位段先入，
    // 故首位落空 = 拼上空串，非首位落空 = 把上一段又拼一遍。
    ['落空档在首位：拼上空串', 2_000_000_000 + 401, ''],
    ['落空档在首位、其后正常段照拼', 2_000_000_000 + 207_401, 'カル'],
    [
      '落空档在非首位：沿用上一段 207「カル」',
      2_000_000_000 + 401_207,
      'カルカル',
    ],
    [
      '末段 500「ー」+ 首段 200「アー」：首字「ア」被吃 → 「ー」',
      2_000_000_000 + 200_500,
      'ーー',
    ],
    // 501 段（「ン」）只可能出现在首段高位，作非首段是生成器不可达的
    // 形态（generator 只给 500 段作末段）；此处按「非首段吃掉首字」的规则钉值
    ['非首段 501「ン」被吃成空段', 2_000_000_000 + 501_500, 'ー'],
    ['首段 300「ヴェ」+ 末段 500「ー」', 2_000_000_000 + 300_500, 'ーヴェ'],
  ];
  for (const [label, nid, expected] of cases) {
    assert.equal(cn_span_combine_name(nid), expected, label);
  }
  // 末段段首被吃的两侧：404「タ」不以元音起、照抄
  assert.equal(cn_span_combine_name(2_000_000_000 + 207_404), 'タカル');
  // 「ー」起头的档位被吃：200 段「アー」的非首段形态只剩尾巴「ー」
  // （低位段 500「ー」先入 → 段首的「ア」被吃 → 「ー」）
});

test('cn_span_combine_name：ッ 结尾时下一段的「ー」丢尾两字（:504-508）', () => {
  const fixture = create_era_fixture();
  const { cn_span_combine_name } = load(fixture);
  // 低位段 500「ー」先入（首段，保留）→ 高位段 426「ッラ」：段首「ッ」不在
  // 吃字表内，整词照抄（:504-508 只在「本段首字是 ー」时开花，与此无交集）
  assert.equal(cn_span_combine_name(2_000_000_000 + 426_500), 'ーッラ');
  // :504-508 的正面（acc 以「ッ」结尾 + 本段首字「ー」→ 切掉 acc 末两字）
  // 在当前生成器下不可达：能产出「ッ」结尾的档位只有 426「ッラ」，而它自带
  // 尾字「ラ」，下一段进来时 acc 的尾字恒是「ラ」。这段逻辑按 1:1 保留，
  // 不设用例（设了也只能自证实现、证不了原作）。
});

test('cn_span_combine_name：900 段（长词，原作标注「不使用」）作非末段时整词保留首段', () => {
  const fixture = create_era_fixture();
  const { cn_span_combine_name } = load(fixture);
  // 首段 900「サン」+ 末段 404「タ」
  assert.equal(cn_span_combine_name(2_000_000_000 + 900_404), 'タサン');
});

test('cn_span_combine_name：ver0.1 表（ARG 落 [1e9,2e9]，生成器不产、留档路径）逐档', () => {
  const fixture = create_era_fixture();
  const { cn_span_combine_name } = load(fixture);
  const ver1 = new Map([
    [100, 'アー'],
    [101, 'アム'],
    [102, 'アル'],
    [103, 'アン'],
    [104, 'イア'],
    [105, 'ヴェ'],
    [106, 'ウル'],
    [107, 'カル'],
    [108, 'サン'],
    [109, 'シ'],
    [110, 'シー'],
    [111, 'シェ'],
    [112, 'シフ'],
    [113, 'シャ'],
    [114, 'ソラ'],
    [115, 'ティ'],
    [116, 'トゥ'],
    [117, 'ネア'],
    [118, 'フィル'],
    [119, 'フォル'],
    [120, 'ミロ'],
    [121, 'リ'],
    [122, 'リー'],
    [123, 'リィ'],
    [124, 'リズ'],
    [125, 'リュー'],
    [126, 'レイ'],
    [127, 'レラ'],
    [128, 'レン'],
    [200, 'ー'],
    [201, 'ヴィア'],
    [202, 'シア'],
    [203, 'タリア'],
    [204, 'ティア'],
    [205, 'ディア'],
    [206, 'ニア'],
    [207, 'フィア'],
    [208, 'ミア'],
    [209, 'リア'],
    [210, 'リカ'],
  ]);
  for (const [piece, word] of ver1) {
    assert.equal(
      cn_span_combine_name(1_000_000_000 + piece),
      word,
      `ver0.1 档位 ${piece}`,
    );
  }
  // 表外档位无产物（原作落到没有分支的 IF 链尾，LOCALS:9 不动）
  assert.equal(cn_span_combine_name(1_000_000_000 + 199), '');
});

test('cn_span_combine_name：两处分支下界（1e9 与 2e9）都走 ver0.1 以外的空结果', () => {
  const fixture = create_era_fixture();
  const { cn_span_combine_name } = load(fixture);
  assert.equal(
    cn_span_combine_name(1_000_000_000),
    '',
    '恰 1e9：两条 > 判据都不中',
  );
  // 恰 2e9：rest = 0，while(0 > 1) 不进循环
  assert.equal(cn_span_combine_name(2_000_000_000), '');
});

test('cn_span_combine_name_num：长度分档与首段/末段档位的掷骰上界', () => {
  const fixture = create_era_fixture();
  const { cn_span_combine_name_num, cn_span_combine_name } = load(fixture);

  // L_L = 3 - RAND:2 - RAND:3 % 2；RAND:2 上界与 RAND:3 上界都必须被钉住
  const three = seq_capture([0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  assert.equal(cn_span_combine_name_num(three) >= 2_000_000_000, true);
  assert.deepEqual(three.bounds.slice(0, 2), [2, 3], '前两掷的上界');
  // 首段的两音判定（:305-310）：L_L = 3 时必掷 RAND:5，上界 5 是本票的字面量
  assert.equal(three.bounds[2], 5, '首段两音判定的上界恒 5');

  // RAND:2 = 1、RAND:3 = 1 → L_L = 3 - 1 - 1 = 1（单段）
  const one = seq_capture([1, 1, 0, 0, 0]);
  const nid = cn_span_combine_name_num(one);
  // 编号 = 2e9 + 一段三位数 → 10 位
  assert.equal(String(nid).length, 10, '单段编号恰 10 位');
  assert.notEqual(cn_span_combine_name(nid), '', '单段名非空');

  // RAND:2 = 0、RAND:3 = 1 → L_L = 3 - 0 - 1 = 2（两段）
  const two = seq_capture([0, 1, 1, 0, 0, 0, 0, 0]);
  const nid2 = cn_span_combine_name_num(two);
  assert.equal(String(nid2).length, 10, '两段编号同为 10 位（每段三位）');
  assert.equal(cn_span_combine_name(nid2), 'ヴェ', '两段名拼出非空结果');
});

test('cn_span_combine_name_num：各档位的编号值逐一钉住（生成器产出的 NID 本身）', () => {
  const fixture = create_era_fixture();
  const { cn_span_combine_name_num, cn_span_combine_name } = load(fixture);

  // 每条都给全掷骰序（越界回落成 0），断言的是**生成器产出的 NID 值**——
  // 档位下界（300/200/400/500）与拆位基数都在这个值上可见；只测
  // cn_span_combine_name 的查表是够不着这些字面量的。
  // 单段名的段值是 200-229（L_L == 1 时 :314 的两个条件都不成立，恒走两音段），
  // 所以一音段/终端段的用例都取两段名。
  const cases = [
    ['一段两音：2e9 + 200', [0, 1, 0, 1, 1, 0], 2_000_200_300, 'ヴェー'],
    ['一段一音：2e9 + 300', [0, 1, 0, 0, 0, 1, 0], 2_000_300_200, 'アーヴェ'],
    [
      '一段终端两音：2e9 + 400',
      [0, 1, 1, 1, 0, 1, 0],
      2_000_400_200,
      'アーヴィア',
    ],
    ['一段终端一音：2e9 + 500', [0, 1, 1, 0, 0, 1, 0], 2_000_500_200, 'アー'],
    // 三段且累计值 ≥ 1e8：拆位基（1e9 与 1e8）在这一档才分道——三段名与
    // 两段名的差别正是「取模基写错」的可见面
    [
      '三段同档：2e9 + 300300300',
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      2_300_300_300,
      'ヴェヴェヴェ',
    ],
  ];
  for (const [label, rolls, expected_nid, expected_name] of cases) {
    const nid = cn_span_combine_name_num(seq_capture(rolls));
    assert.equal(nid, expected_nid, label);
    assert.equal(cn_span_combine_name(nid), expected_name, `${label} 的假名`);
  }
});

test('cn_span_combine_name_num：随机名的生成域与「名字非空」不变量', () => {
  const fixture = create_era_fixture();
  const { cn_span_combine_name_num, cn_span_combine_name } = load(fixture);
  // 固定随机源遍历全档位组合，钉住「每一条可达 NID 都产出非空名字」
  let state = 12_345;
  const rand = (n) => {
    state = (state * 11_039 + 12_345) % 2_147_483_648; // 线性同余，确定性
    return state % n;
  };
  for (let i = 0; i < 2000; i += 1) {
    const nid = cn_span_combine_name_num(rand);
    // 恒为 2e9 + 1-3 段三位数 → 10 位十进制数
    assert.match(String(nid), /^2\d{9}$/, `编号 ${nid} 的形态`);
    assert.notEqual(cn_span_combine_name(nid), '', `NID ${nid} 的名字不得为空`);
  }
});

// —— @CHARA_NAME_RANDOM_DEFINE（:14-141，随机命名入口）——

test('chara_name_random_define：职业偏向——骑士掷中偏洋名、巫女/忍者偏和名', () => {
  const fixture = create_era_fixture();
  const { chara_name_random_define } = load(fixture);
  // 骑士（205）+ RAND:10 != 0 → L_TYPE = 1 → 洋名分支（rand(585) + 0）
  fixture.store.set('talent:9:205', 1);
  chara_name_random_define(9, -1, seq([1, 0])); // rand(10)=1, rand(585)=0
  assert.equal(
    fixture.store.get('cflag:9:6'),
    0,
    '洋名编号 = rand(585) 无偏移',
  );

  // 巫女（206）+ RAND:10 != 0 → L_TYPE = 0 → 经 RAND:5 % 2 再定
  const f2 = create_era_fixture();
  f2.store.set('talent:9:206', 1);
  f2.store.set('namelistkeys', []);
  const { chara_name_random_define: run2 } = f2.load_module('chara/chara-name');
  run2(9, -1, seq([1, 0, 1, 0])); // rand(10)=1, rand(5)=0→%2=0, rand(450)=1
  assert.equal(f2.store.get('cflag:9:6'), 201, '和名编号 = rand(450) + 200');

  // 骑士与巫女都未命中（talent 未设）→ 不掷 RAND:10
  const f3 = create_era_fixture();
  const cap = seq_capture([0]);
  f3.load_module('chara/chara-name').chara_name_random_define(9, -1, cap);
  assert.deepEqual(cap.bounds, [585], '无 talent 时不掷职业偏向的 RAND:10');
});

test('chara_name_random_define：种族偏向表——九个种族偏洋名、人狼偏和名、其余不动', () => {
  // 洋名侧：1 精灵 / 3 吸血鬼 / 4 デュラハン / 5 ドラゴン / 6 天使 /
  // 7 ダークエルフ / 8 堕天使 / 10 ホビット / 11 ドワーフ
  for (const race of [1, 3, 4, 5, 6, 7, 8, 10, 11]) {
    const fixture = create_era_fixture();
    fixture.store.set('cflag:9:314', race);
    const { chara_name_random_define } = load(fixture);
    chara_name_random_define(9, -1, seq([0])); // rand(585) = 0
    assert.equal(fixture.store.get('cflag:9:6'), 0, `种族 ${race} 偏洋名`);
  }
  // 和名侧：2 人狼 → 经 RAND:5 % 2
  const wolf = create_era_fixture();
  wolf.store.set('cflag:9:314', 2);
  wolf
    .load_module('chara/chara-name')
    .chara_name_random_define(9, -1, seq([0, 0])); // rand(5)=0 → 和名；rand(450)=0
  assert.equal(wolf.store.get('cflag:9:6'), 200, '种族 2 偏和名');
  // 无偏向：0 人类 / 9 魔族 / 12 未知
  for (const race of [0, 9, 12]) {
    const fixture = create_era_fixture();
    fixture.store.set('cflag:9:314', race);
    const cap = seq_capture([0]);
    fixture
      .load_module('chara/chara-name')
      .chara_name_random_define(9, -1, cap);
    assert.deepEqual(
      cap.bounds,
      [585],
      `种族 ${race} 无偏向（不掷 RAND:5，直接走洋名）`,
    );
  }
});

test('chara_name_random_define：和名分支 RAND:5 % 2 —— 1/3/4 落和名、0/2 落洋名', () => {
  for (const [roll, expected_type] of [
    [0, 0],
    [1, 1],
    [2, 0],
    [3, 1],
    [4, 0],
  ]) {
    const fixture = create_era_fixture();
    const { chara_name_random_define } = load(fixture);
    chara_name_random_define(9, 0, seq([roll, 0]));
    const nid = fixture.store.get('cflag:9:6');
    if (expected_type === 0) {
      assert.equal(nid, 200, `RAND:5 = ${roll} → %2 = 0 → 和名 200`);
    } else {
      assert.equal(nid, 0, `RAND:5 = ${roll} → %2 = 1 → 洋名 0`);
    }
  }
});

test('chara_name_random_define：男性角色的和名/洋名编号换用男名表', () => {
  const fixture = create_era_fixture();
  fixture.store.set('talent:9:122', 1); // TALENT:男人
  const { chara_name_random_define } = load(fixture);
  // 和名（type 0）+ 男性 → 先 RAND:5 % 2 定类型，再 rand(JAPANESE_MALE_NAME_COUNT) + 3000
  chara_name_random_define(9, 0, seq([0, 7]));
  assert.equal(
    fixture.store.get('cflag:9:6'),
    3000,
    '3000 起始偏移（RAND:5 后仍落和名）',
  );

  // 洋名（type 1）+ 男性 → 先掷 rand(585) 再被男名表覆盖为
  // rand(WEST_MALE_NAME_COUNT) + 2000（两掷都要给，否则第二掷落真随机）
  const f2 = create_era_fixture();
  f2.store.set('talent:9:122', 1);
  f2.load_module('chara/chara-name').chara_name_random_define(
    9,
    1,
    seq([0, 3]),
  );
  assert.equal(f2.store.get('cflag:9:6'), 2003, '2000 起始偏移');
});

test('chara_name_random_define：洋名编号 >= 200 时加 1000（两档区间）', () => {
  const fixture = create_era_fixture();
  const { chara_name_random_define } = load(fixture);
  chara_name_random_define(9, 1, seq([199]));
  assert.equal(fixture.store.get('cflag:9:6'), 199, '< 200 不加偏移');

  const f2 = create_era_fixture();
  f2.load_module('chara/chara-name').chara_name_random_define(9, 1, seq([200]));
  assert.equal(f2.store.get('cflag:9:6'), 1200, '>= 200 加 1000');
});

test('chara_name_random_define：重复检查排除自身、命中他人则重掷', () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(2, { id: 2, name: '甲', callname: '甲' });
  fixture.era.addCharacter(2);
  fixture.store.set('cflag:2:6', 0); // 与本次掷出的洋名编号 0 相同
  const { chara_name_random_define } = load(fixture);
  // 第一轮掷出 0（与角色 2 重复）→ 改 type 2 组合名 → 第二轮掷出 4500
  chara_name_random_define(9, 1, seq([0, 0, 0, 0]));
  assert.equal(fixture.store.get('cflag:9:6'), 4500, '重掷切组合名 4500 起');
});

test('chara_name_random_define：名字空间占满时逐条改换类型（三条可达规则各一侧）', () => {
  // 三个阈值都在 1000 角色的量级（CHARANUM 是已加入角色数，真造造不出来），
  // 用 mock 的 getAddedCharacters 提供足量编号。
  //
  // 每条都用一层**查表宽度**断言：只读最终 NID 分不出「改换类型后重掷」与
  // 「第一掷就落进了另一区间」，掷骰的上界序列才是分支真的走过的证据。
  // 办法：把 1 号角色的 NID 种成「首掷必然撞上的值」，逼出重掷那一轮
  // （首掷撞不上时循环在第一轮就结束，根本走不到占满判定）。
  //
  // 第四条规则（:130-131 男性向和名占满）**不可达**，没有用例：它的判据
  // 蕴含第一条（1059 > 450）而第一条先中。chara-name.js 文件头有推导。
  const run = (count, type, talents, seed_nid, vals) => {
    const fixture = create_era_fixture();
    fixture.era.getAddedCharacters = () =>
      Array.from({ length: count }, (_, i) => i);
    for (const [index, value] of Object.entries(seed_nid)) {
      fixture.store.set(`cflag:${index}:6`, value);
    }
    for (const [index, value] of Object.entries(talents)) {
      fixture.store.set(`talent:9:${index}`, value);
    }
    const cap = seq_capture(vals);
    fixture
      .load_module('chara/chara-name')
      .chara_name_random_define(9, type, cap);
    return { cap, nid: fixture.store.get('cflag:9:6') };
  };

  // ① 和名占满：判据是 `CHARANUM*4/10 > JAPANESE_NAME_COUNT(450)`，**整数除法**
  //    （Emuera 的 / 是向零截断）：1126 时 4504/10 = 450 不 > 450，1128 才过。
  //    掷骰序：RAND:5（定类型）→ RAND:450（和名 201，撞种下的 201）→ RAND:585
  const a = run(1128, 0, {}, { 1: 201 }, [0, 1, 300]);
  assert.deepEqual(a.cap.bounds, [5, 450, 585], '和名 450 → 洋名 585');
  assert.equal(a.nid, 1300, '改洋名后掷出 1300（300 + 1000 档）');

  // ② 洋名占满：469 > WEST_NAME_COUNT*8/10 = 468 → 改和名
  //    掷骰序：RAND:585（洋名 5，撞种下的 5）→ RAND:450（和名 200）
  const b = run(469, 1, {}, { 1: 5 }, [5, 0, 0]);
  assert.deepEqual(b.cap.bounds, [585, 450], '洋名 585 → 和名 450');
  assert.equal(b.nid, 200, '改和名后掷出 200（200-299 区间）');

  // ④ 男性洋名占满：363 > WEST_MALE_NAME_COUNT*8/10 = 362.4，而第二条的
  //    468 不成立 → 只有这一条能中。掷骰序：585（被男名表覆盖）→ 453 掷出
  //    2000（撞种下的 2000）→ 改和名 → 450 与 1059 两掷（男性两支都掷，
  //    与 :100-105 的两条 SIF 一致）→ 3000
  const d = run(363, 1, { 122: 1 }, { 1: 2000 }, [0, 0, 0]);
  assert.deepEqual(
    d.cap.bounds,
    [585, 453, 450, 1059],
    '洋名 585 → 男名 453 → 和名 450/1059',
  );
  assert.equal(d.nid, 3000, '改男性和名后掷出 3000');

  // ⑤ 真落 ELSE（组合名）：count = 2 时三条占满判据都不成立
  const e = run(2, 1, {}, { 1: 0 }, [0, 0, 0]);
  assert.deepEqual(e.cap.bounds, [585, 789], '洋名 585 → 组合名 789');
  assert.equal(e.nid, 4500, '落 ELSE → 组合名 4500 起');

  // 阈值判别（第一条的 4/10，**整数除法**）：count = 1126 时 4504/10 = 450
  // 不 > 450 → 判据不成立、落 ELSE 走组合名；1128 时 4512/10 = 451 才过。
  // 这两条把「整数截断 vs 浮点」的分野钉在 1126/1128 上（浮点会在 1126 就过）。
  const at1126 = run(1126, 0, {}, { 1: 201 }, [0, 1, 0]);
  assert.deepEqual(
    at1126.cap.bounds,
    [5, 450, 789],
    '1126 时 4504/10 截断成 450，判据不成立 → 组合名',
  );
  assert.equal(at1126.nid, 4500, '组合名 4500 起');

  // 阈值判别（第一条的 4/10）：count = 1000 时 4000/10 = 400 未过 450 → 判据
  // 不成立、落 ELSE 走组合名；把 4 改成 5 就是 500 > 450、会改类型去掷 585。
  const h = run(1000, 0, {}, { 1: 200 }, [0, 0, 0, 0]);
  assert.deepEqual(
    h.cap.bounds,
    [5, 450, 789],
    'count=1000 时和名判据不成立 → 落 ELSE 走组合名',
  );
  assert.equal(h.nid, 4500, '组合名 4500 起');

  // 阈值判别（第二条的 8/10）：count = 468 时 468 > 468 不成立 → 落 ELSE；
  // 469 时成立 → 改和名（上一条用例）。两端各一侧。
  const at468 = run(468, 1, {}, { 1: 0 }, [0, 0, 0]);
  assert.deepEqual(
    at468.cap.bounds,
    [585, 789],
    '468 == 阈值下侧 → 判据不成立',
  );

  // 对照：有一号角色被占但不撞车 → 不重掷（569 = rand(585) 直接收，
  // 569 >= 200 走 +1000 那一档）
  const f = run(2, 1, {}, {}, [569]);
  assert.deepEqual(f.cap.bounds, [585], '无撞车时不重掷');
  assert.equal(f.nid, 1569, '洋名 569 → 1569');

  // 空角色表：无一重复，一轮结束
  const g = create_era_fixture();
  const cap = seq_capture([0]);
  g.load_module('chara/chara-name').chara_name_random_define(9, 1, cap);
  assert.deepEqual(cap.bounds, [585], '空表时只掷一次');
});

test('chara_name_random_define：末端 JUMP 到 chara_name_define 真身（名字落地）', () => {
  const fixture = create_era_fixture();
  fixture.store.set('namelistkeys', [0]);
  fixture.store.set('namelistname:0', '');
  const { chara_name_random_define } = load(fixture);
  const result = chara_name_random_define(9, 1, seq([0]));
  assert.equal(result, undefined, 'JUMP 不向调用点返回结果');
  assert.equal(
    fixture.store.get('callname:9:-1'),
    '佳奈美',
    '固定名 0 未注册名字 → 佳奈美（真身已落地，不再是占位行）',
  );
});

// —— @RAND_CHARA_MAKE（CHAR_MAKE.ERB:42-194）——
//
// 这条线的 UI 依赖（八处 FUNC_CHARA_AND_HAIR 与 SHOW_CHARA_INFO）以
// stub_line_wait 占位，故断言分两层：可观测的状态变化（新角色入库、
// flag 搬迁、CFLAG:1 归零）＋ 分支走向（换人循环、16 位占满的早退）。
//
// 随机源：`never` 恒 1 只够表达「位号」，内部 CHAR_MAKE 的名字重掷要大量
// 掷骰，故统一用 `seq_capture`（越界回落到 0）——且每个预设角色都先种一个
// **不可能撞车**的 NID（99），否则名字重掷会与同 NID 的既有角色相撞而
// `addCharacter` 返回 false。

/** 打桩的异国勇者判定：恒「不是异国勇者」（返回 0 = CHAR_MAKE_INPORT 的未命中） */
const not_overseas = () => Promise.resolve(0);

/**
 * 让 era.input 依次返回给定答案。
 *
 * @RAND_CHARA_MAKE 里有两处 INPUT：:107 的形象确认（0=改性格 / 1=改发色 /
 * 100=继续）与 :158 的收下确认（1=换一个 / 2=收下）。测试给的序列要把
 * 前者写在前头（`[100, 2]` = 不改形象、收下）。
 */
function answer_sequence(fixture, answers) {
  let index = 0;
  fixture.era.input = () => Promise.resolve(answers[index++] ?? 100);
}

function seed_hero(fixture, cid) {
  fixture.seed_chara(cid, {
    id: cid,
    name: `勇者${cid}`,
    callname: `勇者${cid}`,
  });
  fixture.store.set(`cflag:${cid}:6`, 99); // 名字编号：避让随机命名的重掷
}

function load_rand(fixture) {
  return fixture.load_module('chara/chara-make').rand_chara_make;
}

test('rand_chara_make：挑中空位——新建、加 EX、CHAR_MAKE 收尾并返回新角色号', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture, 2);
  seed_hero(fixture, 9);
  fixture.era.addCharacter(9); // 编制**不连号**（#487）：只有 9 号先在场
  fixture.store.set('flag:1', 2); // 上一位调教对象 == 新角色（掷出 2 号）
  answer_sequence(fixture, [100, 2]); // :107 继续 → :158 收下
  const result = await load_rand(fixture)(seq_capture([1]), not_overseas);

  // #487：:63-64 的 A / ID_OF_NEWCHARA 是**角色号**（掷中的勇者位），不是
  // 「第几个加入」——招募后 CHARANUM = 2 →「已加入数 - 1」= 1 ≠ 2
  assert.equal(result, 2, ':194 RETURN CHARANUM-1 = 新角色的角色号');
  assert.deepEqual(
    fixture.era.getAddedCharacters(),
    [2, 9],
    ':61 ADDCHARA 落在 2 号位',
  );
  assert.equal(fixture.store.get('cflag:2:1'), 0, ':180 CFLAG:1 归零');
  assert.equal(
    fixture.store.get('cflag:1:1'),
    undefined,
    '不写到「人数 - 1」的 1 号',
  );
  // :139 的置 1 会被 :182 的归 0 掩盖，只看终值分不出有没有写过——按写
  // 记录断言（#494 补 #487 验收发现的覆盖缺口：该行的 1 改成 0 时
  // chara-name / chara-make / chara-and-hair / campaign-e2e / page-campaign
  // 五份用例曾全绿）
  assert.ok(
    fixture.var_writes.some(
      (write) => write.name === 'flag:402' && write.value === 1,
    ),
    ':139 派遣奴隶标志置 1（等级 1 生成）',
  );
  assert.equal(fixture.store.get('flag:402'), 0, ':182 派遣标志归位');
  // :126-135 的搬迁是**原作恒空操作**（@ADDCHARA_EX 首行 TARGET = ARG、新角色
  // 总在登记序末尾，等于/大于都不可能成立；#565 返工第 3 条 1:1 保留为不做）
  // ——FLAG:1 原样保留，:184-185 的复位把它赋回 TARGET 指针槽
  assert.equal(
    fixture.store.get('flag:1'),
    2,
    ':127-135 原作恒空操作 → FLAG:1 不动',
  );
  assert.equal(fixture.store.get('flag:10005'), 2, ':184 TARGET = FLAG:1');
  // :173-178 的播报读 SAVESTR:(CHARANUM-1)——CHAR_MAKE 内部会重建称呼，
  // 故按落地后的实际称呼比对（它非空是这条断言有意义的前提）
  const recruit_name = fixture.store.get('callname:2:-1');
  assert.ok(recruit_name, '新加入的 2 号有称呼');
  // :174-175 的 SIF LOCAL:0：非异国档不加「异国的」前缀。放在逐字相等那条
  // **之前**——前缀判据被写反时先红在这一条上，报出的是「加错档」而不是
  // 「点名点错人」
  assert.ok(
    !fixture.lines_history.some(
      (line) => line.type === 'text' && line.text.includes('异国的'),
    ),
    ':174-175 非异国档不加「异国的」前缀',
  );
  assert.ok(
    fixture.lines_history.some(
      (line) =>
        line.type === 'text' &&
        line.text === `冒险者${recruit_name}被囚禁在了地牢里！`,
    ),
    ':173-178 收下播报点名新加入的 2 号（源 SAVESTR:(CHARANUM-1)）',
  );
});

test('rand_chara_make：:52 的 RAND(1,17) 上界恒 16（勇者位 1-16）', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture, 5);
  answer_sequence(fixture, [100, 2]);
  const cap = seq_capture([4]);
  await load_rand(fixture)(cap, not_overseas);
  assert.equal(cap.bounds[0], 16, '第一掷上界 16 → 位号 1-16');
  assert.deepEqual(fixture.era.getAddedCharacters(), [5], '4 + 1 = 5');
  // :62 的 ADDCHARA_EX 拿的同样是角色号（5）。编制为空时「已加入数 - 1」
  // 是 0，而 0 号走 CHARA_EX_0（EXCOM.ERB:28 的守卫放行）、会给魔王点亮
  // EX 素质——这里顺手钉住「不落到那个值」（#487）
  assert.equal(
    fixture.store.get('ex_talent:0:200'),
    undefined,
    ':62 add_chara_ex 不落到「已加入数 - 1」的 0 号（魔王标记）',
  );
});

test('rand_chara_make：异国勇者分支不 ADDCHARA，用 CHAR_MAKE_INPORT 返回的角色号', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture, 5);
  seed_hero(fixture, 9);
  fixture.era.addCharacter(9); // 编制**不连号**（#487）：只有 9 号先在场
  // CHAR_MAKE_INPORT 判定通过时由它内部 ADDCHARA（此处用打桩模拟），并把
  // 新角色的**角色号**交回调用点——原作 :57 的 RESULT 直接就是它（#487）。
  // 返回值故意与位号不同（5 ≠ :52 掷出的 7），「用位号顶替」会被抓出来
  const overseas = async () => {
    fixture.era.addCharacter(5);
    return 5;
  };
  // 异国路径不进 :75-125 的形象确认循环（#494），唯一的 INPUT 是 :158 的
  // 收下确认——序列里只有一项
  answer_sequence(fixture, [2]);
  const result = await load_rand(fixture)(seq_capture([6]), overseas);
  assert.equal(
    result,
    5,
    'ID_OF_NEWCHARA = CHAR_MAKE_INPORT 的返回值（角色号）',
  );
  assert.deepEqual(fixture.era.getAddedCharacters(), [5, 9], '不重复 ADDCHARA');
  assert.equal(fixture.store.get('cflag:5:1'), 0, '新角色 = 5 号');
  assert.equal(fixture.store.get('cflag:7:1'), undefined, '不写到掷中的位号 7');
  assert.equal(
    fixture.store.get('cflag:1:1'),
    undefined,
    '不写到「人数 - 1」的 1 号',
  );
});

// —— #494：:66-141 整段归非异国分支 ——
//
// 原作 :58 的 `IF RESULT == 0` 开到 :143 的 `ELSE`，性格/发色的预设落地
// （:66-72）、形象确认循环（:75-125）、FLAG:1/2 搬迁（:126-137）、FLAG:402
// （:139）与 CHAR_MAKE（:141）全在分支体内；异国路径只有 :144-146 三行。
// 两条用例各站一侧：异国不跑、非异国照旧。

test('rand_chara_make：异国分支不跑非异国段——名单带来的性格/发色不被覆盖、不进形象确认、不写 FLAG:402、不调 CHAR_MAKE', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture, 5);
  seed_hero(fixture, 9);
  fixture.era.addCharacter(9); // 编制不连号：只有 9 号先在场
  // :126-135 的搬迁段也在非异国分支里：新角色是 5 号，故 FLAG:1 = 3 不动、
  // FLAG:2 = 7 也不该前移（搬迁跑起来会把它减成 6）
  fixture.store.set('flag:1', 3); // 上一次的调教对象
  fixture.store.set('flag:2', 7); // 上一次的助手
  // CHAR_MAKE_INPORT 真身会把名单记录里的十张二维表回填到新角色身上
  // （chara-make-inport.js 的 TABLE_SEGMENTS），性格（TALENT 160-175）与
  // 发色（TALENT 300）就在 talent 表里。这里用打桩模拟「记录带来了性格
  // 161、发色 4 与等级 30」——161 在 ID_OF_GENERAL_CHARASTERISTICS 表内
  // （chara-and-hair.js），会被 SET_CHARASTERISTIC 的 CLEAR 清掉，正对
  // 本用例要守的症状
  const overseas = async () => {
    fixture.era.addCharacter(5);
    fixture.store.set('talent:5:161', 1); // 名单带来的性格
    fixture.store.set('talent:5:300', 4); // 名单带来的发色（红发）
    fixture.store.set('cflag:5:9', 30); // 名单带来的等级（CHAR_MAKE 会置 1）
    return 5;
  };
  let asked = 0;
  fixture.era.input = () => {
    asked += 1;
    return Promise.resolve(asked === 1 ? 2 : 100); // 首个答案 2 = :158 收下
  };
  const result = await load_rand(fixture)(seq_capture([6]), overseas);

  assert.equal(
    result,
    5,
    'ID_OF_NEWCHARA = CHAR_MAKE_INPORT 的返回值（角色号）',
  );
  // 断言顺序即「哪条变异先被逮住」：先钉 :141 的 CHAR_MAKE，再钉 :66-72 的
  // 预设落地（CHAR_MAKE 内部也会写 talent:160，两者会互相盖住）
  //
  // :141 CALL CHAR_MAKE：异国路径不调。cflag:9 是 CHAR_MAKE 的第一处写入
  // （chara-make.js:140 `CFLAG:A:9 = 1`），名单带来的等级因此原样保留
  assert.equal(
    fixture.store.get('cflag:5:9'),
    30,
    ':141 CHAR_MAKE 未执行（名单带来的等级未被重置为 1）',
  );
  // :66-72 性格与发色的预设落地：只在非异国分支里，异国路径一条都不该写
  assert.equal(fixture.store.get('talent:5:161'), 1, '名单带来的性格未被覆盖');
  assert.equal(
    fixture.store.get('talent:5:160'),
    undefined,
    ':67 SET_CHARASTERISTIC 未执行（异国路径不跑预设落地）',
  );
  assert.equal(fixture.store.get('talent:5:300'), 4, '名单带来的发色未被覆盖');
  // :75-125 形象确认循环：异国路径直落 :150，唯一的 INPUT 在 :158
  assert.equal(asked, 1, ':107 的形象确认未执行（只问了 :158 的收下确认）');
  assert.ok(
    !fixture.lines_history.some(
      (line) => line.type === 'text' && line.text.includes('[0] 印象'),
    ),
    ':81 形象确认段的输出未打印',
  );
  // :139 派遣奴隶标志：异国路径不写。只看终值区分不出（:182 会归 0），
  // 按写记录断言「从未写过 1」
  assert.ok(
    !fixture.var_writes.some(
      (write) => write.name === 'flag:402' && write.value === 1,
    ),
    ':139 FLAG:402 = 1 未执行（异国路径不写派遣奴隶标志）',
  );
  assert.equal(fixture.store.get('flag:402'), 0, ':182 归位');
  // :126-135 的 FLAG:1/2 搬迁同样在非异国分支里，异国路径不动它们；
  // :184-185 的指针复位读的就是这对未被搬迁的值
  assert.equal(
    fixture.store.get('flag:1'),
    3,
    ':128 等于新角色则清空、:132 大于则前移，都未执行',
  );
  assert.equal(
    fixture.store.get('flag:2'),
    7,
    ':134 FLAG:2 未前移（搬迁段未执行）',
  );
  assert.equal(
    fixture.store.get('flag:10005'),
    3,
    ':184 TARGET = FLAG:1（未搬迁的值）',
  );
  assert.equal(
    fixture.store.get('flag:10006'),
    7,
    ':185 ASSI = FLAG:2（未搬迁的值）',
  );
  // :173-178 的收下播报带「异国的」前缀（LOCAL:0 = 1 只在异国分支写）
  assert.ok(
    fixture.lines_history.some(
      (line) => line.type === 'text' && line.text.startsWith('异国的冒险者'),
    ),
    ':174-175 SIF LOCAL:0 →「异国的」前缀',
  );
});

test('rand_chara_make：异国分支换人重挑不把上一位的发色落到新导入的角色上', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture, 5);
  seed_hero(fixture, 6);
  seed_hero(fixture, 9);
  fixture.era.addCharacter(9); // 编制不连号：只有 9 号先在场
  // 两次异国导入：先 5 号（红发 4），选「换一个」后再导入 6 号（蓝发 6）
  const ids = [5, 6];
  const colors = [4, 6];
  let call = 0;
  const overseas = async () => {
    const cid = ids[call];
    fixture.era.addCharacter(cid);
    fixture.store.set(`talent:${cid}:300`, colors[call]); // 名单带来的发色
    call += 1;
    return cid;
  };
  // :158 换一个（DELCHARA + GOTO $INPUT_LOOP_11）→ 重挑后 :158 收下。
  // 异国路径不跑形象确认循环，两个答案都落在 :158 上
  answer_sequence(fixture, [1, 2]);
  const result = await load_rand(fixture)(seq_capture([6]), overseas);

  assert.equal(result, 6, '重挑后收下的仍是「角色号」6');
  assert.equal(call, 2, '两次导入各调一次 CHAR_MAKE_INPORT');
  // :70-71 的发色落地读的是跨 $INPUT_LOOP_11 迭代携带的 HAIRCOLOR 局部量；
  // 异国路径不跑那段，HAIRCOLOR 恒 0，第二位导入的角色保住自己的发色
  assert.equal(
    fixture.store.get('talent:6:300'),
    6,
    ':71 SET_HAIRCOLOR 未把上一位的发色写到新导入的角色上',
  );
  assert.equal(fixture.store.get('talent:5:300'), 4, '5 号的发色未被改写');
});

test('rand_chara_make：16 位占满时早退（只掷一次、返回 0）', async () => {
  const fixture = create_era_fixture();
  for (const cid of Array.from({ length: 16 }, (_, i) => i + 1)) {
    seed_hero(fixture, cid);
    fixture.era.addCharacter(cid);
  }
  const cap = seq_capture([]);
  const result = await load_rand(fixture)(cap, not_overseas);
  assert.equal(result, 0, ':191 RETURN 0');
  assert.deepEqual(cap.bounds, [16], '只掷一次就撞上占满');
  assert(
    fixture.lines_history.some(
      (line) => line.type === 'text' && line.text.includes('勇者没有出现'),
    ),
    ':189 的提示已出',
  );
});

test('rand_chara_make：:159 换人支删除刚加的角色并回到 :50 重挑', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture, 1);
  seed_hero(fixture, 2);
  seed_hero(fixture, 9);
  fixture.era.addCharacter(9); // 编制**不连号**（#487）：只有 9 号先在场
  answer_sequence(fixture, [100, 1, 100, 2]); // 改形象→换一个→再改形象→收下
  // 第一次掷 1 → 位号 2；换人后的重挑掷骰用尽回落 0 → 位号 1（另一个角色号）
  const result = await load_rand(fixture)(seq_capture([1]), not_overseas);
  assert.deepEqual(
    fixture.era.getAddedCharacters(),
    [1, 9],
    ':161 第一位（2 号）被 DELCHARA，重挑到 1 号',
  );
  assert.equal(result, 1, '返回重挑后的角色号');
});

test('rand_chara_make：TARGET/ASSI 复位——:127-135 原作恒空操作，FLAG:1/2 原样保留（#565 返工）', async () => {
  const fixture = create_era_fixture();
  seed_hero(fixture, 3);
  seed_hero(fixture, 9);
  fixture.era.addCharacter(9); // 编制**不连号**（#487）
  fixture.store.set('flag:1', 3); // 上一位调教对象 == 新角色（掷出 3 号）
  fixture.store.set('flag:2', 5); // 助手编号在新角色之后
  answer_sequence(fixture, [100, 2]);
  await load_rand(fixture)(seq_capture([2]), not_overseas);
  // 原作 :127-135 四行恒不成立（@ADDCHARA_EX 首行 TARGET = ARG、新角色总在
  // 登记序末尾）——旧移植按角色号比较并 -=1，会把 5 改成 4、3 清成 -1
  assert.equal(
    fixture.store.get('flag:2'),
    5,
    ':134 原作恒空操作 → FLAG:2 不前移',
  );
  assert.equal(
    fixture.store.get('flag:1'),
    3,
    ':128 原作恒空操作 → FLAG:1 不清空',
  );
  // :136-137 与 :184-185 都写同一对值（原作如此，重复是 1:1 保留的），故只断
  // 终值。两条都是「FLAG:1/2 → TARGET/ASSI 指针槽」这条链的出口
  assert.equal(fixture.store.get('flag:10005'), 3, ':184 TARGET = FLAG:1');
  assert.equal(fixture.store.get('flag:10006'), 5, ':185 ASSI = FLAG:2');
});
