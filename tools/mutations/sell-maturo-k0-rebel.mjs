// issue #338：成熟奴隶黑市的反抗刻印末路。
// #797 按末路拆分后条目随实现落到各自的目标文件分片，编号与 desc 不变。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 15;

const code = 'ere/system/stronghold/sell-maturo-k0-rebel.js';
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
    7613,
    '第一处随机上界改错',
    "  if (rand_n(2) == 0) {\n    buyer = '魔界中央奴隶市场';\n    route = 1;",
    "  if (rand_n(1) == 0) {\n    buyer = '魔界中央奴隶市场';\n    route = 1;",
    '反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由',
  ),
  make(
    7614,
    '第一处随机结果取反',
    "  if (rand_n(2) == 0) {\n    buyer = '魔界中央奴隶市场';\n    route = 1;",
    "  if (rand_n(2) == 1) {\n    buyer = '魔界中央奴隶市场';\n    route = 1;",
    '反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由',
  ),
  make(
    7615,
    '第二处随机结果取反',
    '  if (rand_n(2) == 0) {\n    await era.printAndWait(',
    '  if (rand_n(2) == 1) {\n    await era.printAndWait(',
    '反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由',
  ),
  make(
    7616,
    '第三处随机结果取反',
    "  if (rand_n(2) == 0) {\n    buyer = '魔界地方奴隶市场';\n    route = 1;\n  } else {\n    buyer = '魔界地方奴隶市场';\n    route = 0;\n  }\n  await era.printAndWait(`${target_name}被送到${buyer}………`);\n  await era.printAndWait(`………`);\n  await era.printAndWait(`……`);\n  await era.printAndWait(`…`);\n  if (route === 1) ending = await rebel_other_lt100k_furniture(ctx);",
    "  if (rand_n(2) == 1) {\n    buyer = '魔界地方奴隶市场';\n    route = 1;\n  } else {\n    buyer = '魔界地方奴隶市场';\n    route = 0;\n  }\n  await era.printAndWait(`${target_name}被送到${buyer}………`);\n  await era.printAndWait(`………`);\n  await era.printAndWait(`……`);\n  await era.printAndWait(`…`);\n  if (route === 1) ending = await rebel_other_lt100k_furniture(ctx);",
    '反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由',
  ),
  make(
    7617,
    '第四处随机结果取反',
    "  if (rand_n(2) == 0) {\n    era.setColor('#990000');",
    "  if (rand_n(2) == 1) {\n    era.setColor('#990000');",
    '反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由',
  ),
  make(
    7618,
    '反抗支五十级门槛抬高',
    '  if (era.get(`cflag:${cid}:9`) >= 50) {\n    await era.printAndWait(`${target_name}作为死斗场的角斗士在战斗着。`);',
    '  if (era.get(`cflag:${cid}:9`) >= 51) {\n    await era.printAndWait(`${target_name}作为死斗场的角斗士在战斗着。`);',
    '反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由',
  ),
  make(
    7619,
    '反抗支一百级门槛抬高',
    '  await era.printAndWait(`${target_name}作为死斗场的角斗士在战斗着。`);\n\n  if (era.get(`cflag:${cid}:9`) >= 100) {',
    '  await era.printAndWait(`${target_name}作为死斗场的角斗士在战斗着。`);\n\n  if (era.get(`cflag:${cid}:9`) >= 101) {',
    '反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由',
  ),
  make(
    7652,
    '低价买家随机结果取反',
    "  if (rand_n(2) == 0) {\n    buyer = '魔界地方奴隶市场';\n    route = 1;\n  } else {\n    buyer = '魔界地方奴隶市场';\n    route = 0;\n  }\n  await era.printAndWait(`${target_name}被送到${buyer}………`);\n  await era.printAndWait(`………`);\n  await era.printAndWait(`……`);\n  await era.printAndWait(`…`);\n  if (route === 1) ending = await rebel_matu_lt100k_runaway(ctx);",
    "  if (rand_n(2) == 1) {\n    buyer = '魔界地方奴隶市场';\n    route = 1;\n  } else {\n    buyer = '魔界地方奴隶市场';\n    route = 0;\n  }\n  await era.printAndWait(`${target_name}被送到${buyer}………`);\n  await era.printAndWait(`………`);\n  await era.printAndWait(`……`);\n  await era.printAndWait(`…`);\n  if (route === 1) ending = await rebel_matu_lt100k_runaway(ctx);",
    '反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由',
  ),
  make(
    7653,
    '低价买家随机上界改错',
    "  if (rand_n(2) == 0) {\n    buyer = '魔界地方奴隶市场';\n    route = 1;\n  } else {\n    buyer = '魔界地方奴隶市场';\n    route = 0;\n  }\n  await era.printAndWait(`${target_name}被送到${buyer}………`);\n  await era.printAndWait(`………`);\n  await era.printAndWait(`……`);\n  await era.printAndWait(`…`);\n  if (route === 1) ending = await rebel_matu_lt100k_runaway(ctx);",
    "  if (rand_n(1) == 0) {\n    buyer = '魔界地方奴隶市场';\n    route = 1;\n  } else {\n    buyer = '魔界地方奴隶市场';\n    route = 0;\n  }\n  await era.printAndWait(`${target_name}被送到${buyer}………`);\n  await era.printAndWait(`………`);\n  await era.printAndWait(`……`);\n  await era.printAndWait(`…`);\n  if (route === 1) ending = await rebel_matu_lt100k_runaway(ctx);",
    '反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由',
  ),
  make(
    7654,
    '低价惩罚随机上界改错',
    '  if (rand_n(2) == 0) {\n    await era.printAndWait(',
    '  if (rand_n(1) == 0) {\n    await era.printAndWait(',
    '反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由',
  ),
  make(
    7655,
    '非魔族低价买家随机上界改错',
    "  if (rand_n(2) == 0) {\n    buyer = '魔界地方奴隶市场';\n    route = 1;\n  } else {\n    buyer = '魔界地方奴隶市场';\n    route = 0;\n  }\n  await era.printAndWait(`${target_name}被送到${buyer}………`);\n  await era.printAndWait(`………`);\n  await era.printAndWait(`……`);\n  await era.printAndWait(`…`);\n  if (route === 1) ending = await rebel_other_lt100k_furniture(ctx);",
    "  if (rand_n(1) == 0) {\n    buyer = '魔界地方奴隶市场';\n    route = 1;\n  } else {\n    buyer = '魔界地方奴隶市场';\n    route = 0;\n  }\n  await era.printAndWait(`${target_name}被送到${buyer}………`);\n  await era.printAndWait(`………`);\n  await era.printAndWait(`……`);\n  await era.printAndWait(`…`);\n  if (route === 1) ending = await rebel_other_lt100k_furniture(ctx);",
    '反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由',
  ),
  make(
    7656,
    '非魔族低价惩罚随机上界改错',
    "  if (rand_n(2) == 0) {\n    era.setColor('#990000');",
    "  if (rand_n(1) == 0) {\n    era.setColor('#990000');",
    '反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由',
  ),
  make(
    13256,
    '代词改回跟随 0 号角色（魔王为男性时出售对象被称「他」）',
    '      `${she(cid)}的手肘及膝盖以下都被切除，换成金属的替代品。`,',
    '      `${she(0)}的手肘及膝盖以下都被切除，换成金属的替代品。`,',
    '反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由',
  ),
  make(
    13896,
    '反抗高价族苦力末路丢掉结局名',
    "    ending = '苦力奴隶';\n  }\n  return ending;\n}",
    "    ending = '苦力奴隶';\n  }\n  return '';\n}",
    'K0_ENDINGS：每条末路均可独立调用并输出正文',
    ['sell-maturo-k0-routes'],
  ),
  make(
    13897,
    '反抗低价族转手漏传随机源',
    '  if (route === 1) ending = await rebel_matu_lt100k_runaway(ctx);',
    '  if (route === 1) ending = await rebel_matu_lt100k_runaway({ target_name });',
    '反抗刻印路线覆盖五次随机调用的两侧与全部特殊路由',
  ),
];
