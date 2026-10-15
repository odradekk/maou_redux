// issue #337：成熟奴隶出售的异族市场末路。
// #797 按末路拆分后条目随实现落到各自的目标文件分片（本片无新增条目），find 随缩进与文件迁移重取。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 19; // #797：原 sell-maturo 分片（30 条）按市场拆分后的异族市场部分，编号与 desc 不变，本片无新增条目；旧计数沿革：#653 -1 +1（删反向变异 M7128、新增 M13264 检查 K1 奶罐判定修复）

const code = 'ere/system/stronghold/sell-maturo-k1.js';
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
    '  video_maturo(cid);\n  return 0;',
    '  void cid;\n  return 0;',
    '生成结局并交给录像书架',
  ),
  make(
    7117,
    'K1 恶魔买家随机支取反',
    "      } else {\n        if (rand_n(2) == 0) {\n          buyer = '恶魔的诸侯';",
    "      } else {\n        if (rand_n(2) != 0) {\n          buyer = '恶魔的诸侯';",
    '五处随机分支的两侧均由确定性随机源覆盖',
  ),
  make(
    7118,
    'K1 恶魔诸侯末路随机支取反',
    '          if (rand_n(2) == 0) {\n            await era.printAndWait(\n              `反抗心很强的${target_name}成为了恶魔的玩具。`,',
    '          if (rand_n(2) != 0) {\n            await era.printAndWait(\n              `反抗心很强的${target_name}成为了恶魔的玩具。`,',
    '五处随机分支的两侧均由确定性随机源覆盖',
  ),
  make(
    7119,
    'K1 巨魔买家随机支取反',
    "      } else {\n        if (rand_n(2) == 0) {\n          buyer = '巨魔佣兵团';",
    "      } else {\n        if (rand_n(2) != 0) {\n          buyer = '巨魔佣兵团';",
    '五处随机分支的两侧均由确定性随机源覆盖',
  ),
  make(
    7120,
    'K1 巨魔佣兵团末路随机支取反',
    '          if (rand_n(2) == 0) {\n            await era.printAndWait(\n              `反抗心很强的${target_name}被改造成适应巨魔佣兵团团长的阴茎的飞机杯。`,',
    '          if (rand_n(2) != 0) {\n            await era.printAndWait(\n              `反抗心很强的${target_name}被改造成适应巨魔佣兵团团长的阴茎的飞机杯。`,',
    '五处随机分支的两侧均由确定性随机源覆盖',
  ),
  make(
    7121,
    'K1 常态魔族十万价格边界抬高',
    "            ending = '兽人商人的情人';\n          }\n        }\n      } else if (price >= 100000) {",
    "            ending = '兽人商人的情人';\n          }\n        }\n      } else if (price >= 100001) {",
    '价格边界与种族、职业素质维度逐项分流',
  ),
  make(
    7122,
    'K1 常态魔族五十万价格边界抬高',
    '  } else {\n    if (era.get(`talent:${cid}:314`) == 9) {\n      if (price >= 500000) {',
    '  } else {\n    if (era.get(`talent:${cid}:314`) == 9) {\n      if (price >= 500001) {',
    '价格边界与种族、职业素质维度逐项分流',
  ),
  make(
    7123,
    'K1 爱慕淫乱魔族一百万价格边界抬高',
    '  } else if (era.get(`talent:${cid}:85`) || era.get(`talent:${cid}:76`)) {\n    if (era.get(`talent:${cid}:314`) == 9) {\n      if (price >= 1000000) {',
    '  } else if (era.get(`talent:${cid}:85`) || era.get(`talent:${cid}:76`)) {\n    if (era.get(`talent:${cid}:314`) == 9) {\n      if (price >= 1000001) {',
    '价格边界与种族、职业素质维度逐项分流',
  ),
  make(
    7124,
    'K1 常态种族编号改错',
    '  } else {\n    if (era.get(`talent:${cid}:314`) == 9) {\n      if (price >= 500000) {',
    '  } else {\n    if (era.get(`talent:${cid}:314`) == 8) {\n      if (price >= 500000) {',
    '价格边界与种族、职业素质维度逐项分流',
  ),
  make(
    7125,
    'K1 常态五十万档漏判战士职业',
    '  } else {\n    if (era.get(`talent:${cid}:314`) == 9) {\n      if (price >= 500000) {\n        if (\n          era.get(`talent:${cid}:200`) == 1 ||\n          era.get(`talent:${cid}:203`) == 1',
    '  } else {\n    if (era.get(`talent:${cid}:314`) == 9) {\n      if (price >= 500000) {\n        if (\n          era.get(`talent:${cid}:200`) == 2 ||\n          era.get(`talent:${cid}:203`) == 1',
    '价格边界与种族、职业素质维度逐项分流',
  ),
  make(
    7126,
    'K1 食人魔佣兵团漏判文职职业',
    '        if (route == 3) {\n          if (era.get(`talent:${cid}:203`) == 1) {\n            await era.printAndWait(\n              `${target_name}作为顾问，加入了食人魔佣兵团。`,',
    '        if (route == 3) {\n          if (era.get(`talent:${cid}:203`) == 2) {\n            await era.printAndWait(\n              `${target_name}作为顾问，加入了食人魔佣兵团。`,',
    '价格边界与种族、职业素质维度逐项分流',
  ),
  make(
    7127,
    'K1 常态五十万档漏判魔法职业',
    "  } else {\n    if (era.get(`talent:${cid}:314`) == 9) {\n      if (price >= 500000) {\n        if (\n          era.get(`talent:${cid}:200`) == 1 ||\n          era.get(`talent:${cid}:203`) == 1\n        ) {\n          buyer = '食人魔佣兵团';\n          route = 3;\n        } else if (\n          era.get(`talent:${cid}:205`) == 1 ||",
    "  } else {\n    if (era.get(`talent:${cid}:314`) == 9) {\n      if (price >= 500000) {\n        if (\n          era.get(`talent:${cid}:200`) == 1 ||\n          era.get(`talent:${cid}:203`) == 1\n        ) {\n          buyer = '食人魔佣兵团';\n          route = 3;\n        } else if (\n          era.get(`talent:${cid}:205`) == 2 ||",
    '价格边界与种族、职业素质维度逐项分流',
  ),
  make(
    13264,
    'K1 奶罐判定回退（扶她不再进奶罐、第二个超乳回归）',
    '            era.get(`talent:${cid}:121`) == 1',
    '            era.get(`talent:${cid}:119`) == 1',
    '奶罐判定覆盖巨乳、爆乳、超乳与扶她',
  ),
];
