// issue #337：成熟奴隶出售的宠物市场末路。
// #797 按末路拆分后条目随实现落到各自的目标文件分片，编号与 desc 不变。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 11;

const code = 'ere/system/stronghold/sell-maturo-k2.js';
const make = (
  id,
  desc,
  find,
  replace,
  must_mention,
  tests = ['sell-maturo'],
) => ({
  desc: `M${id} ${desc}`,
  file: code,
  find,
  replace,
  tests,
  must_mention,
});

export default [
  make(
    7107,
    'K2 牝犬加价少一个零',
    '    price += 50_000;',
    '    price += 5_000;',
    '牝犬加价发生在售价分档前',
  ),
  make(
    7108,
    'K2 百万售价边界抬高一位',
    '  if (price >= 1_000_000) {\n    if (sex_maniac)',
    '  if (price >= 1_000_001) {\n    if (sex_maniac)',
    '牝犬加价发生在售价分档前',
  ),
  make(
    7109,
    'K2 非牝犬淫乱分支失效',
    '  } else if (era.get(`talent:${cid}:76`)) {',
    '  } else if (false && era.get(`talent:${cid}:76`)) {',
    '非牝犬按淫乱与售价选择分支',
  ),
  make(
    7110,
    'K2 第 4 分支文本丢失',
    "'可惜的是预算似乎不太够、但{name}淫乱的身体似乎能够满足他的样子……。',",
    "'可惜的是预算似乎不太够。',",
    '15 个原函数均由一张表分发',
  ),
  make(
    7111,
    'K2 漏写家人末路',
    'if (family_id >= 0) chara(family_id).event.家人末路 = `${ending}${name}`;',
    "if (family_id >= 0) chara(family_id).event.家人末路 = '';",
    '找到家人时同步记录其末路称号',
  ),
  make(
    7112,
    'K2 五十万价格档整体不可达',
    "if (price >= 500_000) {\n    if (sex_maniac) return ['魔界牝犬饲养员', 51, '高级母种犬'];",
    "if (false) {\n    if (sex_maniac) return ['魔界牝犬饲养员', 51, '高级母种犬'];",
    '牝犬四个价格档与三个素质维度',
  ),
  make(
    7113,
    'K2 十万价格档整体不可达',
    "if (price >= 100_000) {\n    if (sex_maniac) return ['魔界个体饲养员', 11, '牝犬饲养员'];",
    "if (false) {\n    if (sex_maniac) return ['魔界个体饲养员', 11, '牝犬饲养员'];",
    '牝犬四个价格档与三个素质维度',
  ),
  make(
    7114,
    'K2 五十万档话术门槛抬高',
    "if (speech_level >= 5) return ['魔界圆形剧场', 52, '高级牝犬女优'];",
    "if (speech_level >= 50) return ['魔界圆形剧场', 52, '高级牝犬女优'];",
    '牝犬四个价格档与三个素质维度',
  ),
  make(
    7115,
    'K2 十万以下性交狂分支不可达',
    "if (sex_maniac) return ['魔犬', 1, '魔犬新娘'];",
    "if (false) return ['魔犬', 1, '魔犬新娘'];",
    '牝犬四个价格档与三个素质维度',
  ),
  make(
    7116,
    'K2 主流程恒分发到第 3 个结局',
    '  await sell_maturo_k2_branch(branch, cid);',
    '  await sell_maturo_k2_branch(3, cid);',
    '牝犬四个价格档与三个素质维度',
  ),
  make(
    7129,
    'K2 常态百万档分发到牝犬结局而非淫乱牝犬结局',
    "  } else if (price >= 1_000_000) {\n    [buyer, branch, ending] = ['魔界土豪', 104, '高级牝犬'];\n  } else if (price >= 500_000) {",
    "  } else if (price >= 1_000_000) {\n    [buyer, branch, ending] = ['魔界土豪', 103, '高级牝犬'];\n  } else if (price >= 500_000) {",
    '主流程按牝犬、淫乱与售价分发实际结局文本',
  ),
];
