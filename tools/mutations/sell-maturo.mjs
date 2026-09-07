// issue #337：成熟奴隶异族市场与宠物市场末路（M7100-M7111）。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 12;

const code = 'ere/system/stronghold/sell-maturo.js';
const make = (id, desc, find, replace, must_mention) => ({
  desc: `M${id} ${desc}`,
  file: code,
  find,
  replace,
  tests: ['sell-maturo'],
  must_mention,
});

export default [
  make(
    7100,
    'K1 反抗刻印门槛改错',
    'if (era.get(`mark:${cid}:3`) == 3) {',
    'if (era.get(`mark:${cid}:3`) == 2) {',
    '反抗刻印、魔族、高价随机支',
  ),
  make(
    7101,
    'K1 魔族种族编号改错',
    'if (era.get(`mark:${cid}:3`) == 3) {\n    if (era.get(`talent:${cid}:314`) == 9) {',
    'if (era.get(`mark:${cid}:3`) == 3) {\n    if (era.get(`talent:${cid}:314`) == 8) {',
    '反抗刻印、魔族、高价随机支',
  ),
  make(
    7102,
    'K1 十万售价边界抬高一位',
    'if (price >= 100000) {\n        if (rand_n(2) == 0) {',
    'if (price >= 100001) {\n        if (rand_n(2) == 0) {',
    '反抗刻印、魔族、高价随机支',
  ),
  make(
    7103,
    'K1 首个随机买家分支取反',
    "if (rand_n(2) == 0) {\n          buyer = '食脑魔的诸侯';",
    "if (rand_n(2) != 0) {\n          buyer = '食脑魔的诸侯';",
    '反抗刻印、魔族、高价随机支',
  ),
  make(
    7104,
    'K1 脑改造指挥官结局标题改错',
    "ending = '脑改造指挥官';",
    "ending = '白痴';",
    '生成结局并交给录像书架',
  ),
  make(
    7105,
    'K1 独立调用不再使用估价真身',
    'price ??= estimate_chara(cid).price;\n  const rand_n',
    'price ??= 0;\n  const rand_n',
    '未显式给售价时直接使用 ESTIMATE_CHARA',
  ),
  make(
    7106,
    'K1 不把结局交给录像书架',
    "  await era.print('');\n  video_maturo(cid);\n  return 0;\n}\n\n// @SELL_MATURO_K2_",
    "  await era.print('');\n  void cid;\n  return 0;\n}\n\n// @SELL_MATURO_K2_",
    '生成结局并交给录像书架',
  ),
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
];
