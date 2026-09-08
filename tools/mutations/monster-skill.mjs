// 变异条目表切片：issue #345（阶段 5a L14）怪物技能与两处战斗接入。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 40;

export default [
  {
    desc: 'M7140 MONSTER_SKILL 三分之一不发动守卫删除',
    file: 'ere/dungeon/monster-skill.js',
    find: '  if (rand(3) === 0) {\n    return 0;\n  }\n  dmg += Math.trunc(dmg / 2);',
    replace:
      '  if (false) {\n    return 0;\n  }\n  dmg += Math.trunc(dmg / 2);',
    tests: ['monster-skill'],
    must_mention: '三分之一不发动',
  },
  {
    desc: 'M7141 MONSTER_SKILL 伤害强化删除',
    file: 'ere/dungeon/monster-skill.js',
    find: '  dmg += Math.trunc(dmg / 2);',
    replace: '  dmg += 0; // 变异：伤害强化删除',
    tests: ['monster-skill'],
    must_mention: '强化伤害',
  },
  {
    desc: 'M7142 MONSTER_SKILL 伤害上限改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '  dmg = Math.min(dmg, 400);',
    replace: '  dmg = Math.min(dmg, 399); // 变异：上限',
    tests: ['monster-skill'],
    must_mention: '钳在 400',
  },
  {
    desc: 'M7143 MONSTER_SKILL 参数下降除数改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '  let palam_down = Math.trunc(dmg / 5) + 1;',
    replace: '  let palam_down = Math.trunc(dmg / 6) + 1; // 变异：除数',
    tests: ['monster-skill'],
    must_mention: '十八种技能逐项',
  },
  {
    desc: 'M7144 MONSTER_SKILL 参数下降上限改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '  palam_down = Math.min(palam_down, 50);',
    replace: '  palam_down = Math.min(palam_down, 49); // 变异：上限',
    tests: ['monster-skill'],
    must_mention: '参数下降分别钳在 400 和 50',
  },
  {
    desc: 'M7145 粘液捕获误用强化伤害',
    file: 'ere/dungeon/monster-skill.js',
    find: '    chara(target).dungeon.气力 -= level;',
    replace: '    chara(target).dungeon.气力 -= dmg; // 变异：误用强化伤害',
    tests: ['monster-skill'],
    must_mention: '按未强化等级扣气力',
  },
  {
    desc: 'M7146 落穴捕获 HP 扣减删除',
    file: 'ere/dungeon/monster-skill.js',
    find: '    target_view.dungeon.体力 -= level;\n  } else if (skill === 3)',
    replace: '    // 变异：落穴 HP 扣减删除\n  } else if (skill === 3)',
    tests: ['monster-skill'],
    must_mention: '十八种技能逐项',
  },
  {
    desc: 'M7147 藤蔓捕获误用强化伤害',
    file: 'ere/dungeon/monster-skill.js',
    find: '      `${monster_name}的藤蔓夺取了对手身体的自由！（攻击-${palam_down}）`,\n    );\n    target_view.dungeon.攻击力 -= palam_down;\n  } else if (skill === 4)',
    replace:
      '      `${monster_name}的藤蔓夺取了对手身体的自由！（攻击-${palam_down}）`,\n    );\n    target_view.dungeon.攻击力 -= dmg; // 变异\n  } else if (skill === 4)',
    tests: ['monster-skill'],
    must_mention: '十八种技能逐项',
  },
  {
    desc: 'M7148 透明防御增量改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '  } else if (skill === 5) {\n    await print_battle_line(`${monster_name}变为透明了……（防御+2）`);\n    e_set(user + 3, e_get(user + 3) + 2);',
    replace:
      '  } else if (skill === 5) {\n    await print_battle_line(`${monster_name}变为透明了……（防御+2）`);\n    e_set(user + 3, e_get(user + 3) + 1); // 变异',
    tests: ['monster-skill'],
    must_mention: '十八种技能逐项',
  },
  {
    desc: 'M7149 迷失的第二次随机判定改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '    e_set(user + 3, e_get(user + 3) + 5);\n  } else if (skill === 8) {\n    if (rand(3) === 0) {\n      await print_battle_line(`${chara_callname(target)}迷失了！`);',
    replace:
      '    e_set(user + 3, e_get(user + 3) + 5);\n  } else if (skill === 8) {\n    if (rand(3) === 2) {\n      await print_battle_line(`${chara_callname(target)}迷失了！`);',
    tests: ['monster-skill'],
    must_mention: '十八种技能逐项',
  },
  {
    desc: 'M7150 吐息伤害倍率改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '  } else if (skill === 9) {\n    const breath = Math.trunc((dmg * 3) / 2);\n    await print_battle_line(`${monster_name}喷出了吐息！！（HP-${breath}）`);',
    replace:
      '  } else if (skill === 9) {\n    const breath = dmg; // 变异：倍率删除\n    await print_battle_line(`${monster_name}喷出了吐息！！（HP-${breath}）`);',
    tests: ['monster-skill'],
    must_mention: '十八种技能逐项',
  },
  {
    desc: 'M7151 麻痹参数倍率改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '    const paralysis = Math.trunc((palam_down * 3) / 2);',
    replace: '    const paralysis = palam_down; // 变异：倍率删除',
    tests: ['monster-skill'],
    must_mention: '十八种技能逐项',
  },
  {
    desc: 'M7152 MONSTER_SKILL 诱惑善恶值改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '      `${monster_name}诱惑着对手……（善恶值:-2 好感度+4）`,\n    );\n    target_view.chara.好感度 += 4; // CFLAG:2 = 好感度（跨 chara 域）\n    karma(target, -2);',
    replace:
      '      `${monster_name}诱惑着对手……（善恶值:-2 好感度+4）`,\n    );\n    target_view.chara.好感度 += 4; // CFLAG:2 = 好感度（跨 chara 域）\n    karma(target, -1); // 变异',
    tests: ['monster-skill'],
    must_mention: '好感度与善恶值',
  },
  {
    desc: 'M7153 MONSTER_SKILL 经验吸取等级检查删除',
    file: 'ere/dungeon/monster-skill.js',
    find: '    await print_battle_line(`${monster_name}发动经验吸取！！（经验值-${dmg}）`);\n    target_view.dungeon.战斗经验 -= dmg;\n    await chara_lv_check(target);\n  } else if (skill === 14)',
    replace:
      '    await print_battle_line(`${monster_name}发动经验吸取！！（经验值-${dmg}）`);\n    target_view.dungeon.战斗经验 -= dmg;\n    // 变异：等级检查删除\n  } else if (skill === 14)',
    tests: ['monster-skill'],
    must_mention: '调用等级检查并同步四维',
  },
  {
    desc: 'M7154 破铠吐息文案被顺手修成实伤',
    file: 'ere/dungeon/monster-skill.js',
    find: '${monster_name}喷出了破坏铠甲的吐息！！（HP-${level * 2} 防御-${palam_down}）',
    replace:
      '${monster_name}喷出了破坏铠甲的吐息！！（HP-${breath} 防御-${palam_down}）',
    tests: ['monster-skill'],
    must_mention: '文案与实伤不一致',
  },
  {
    desc: 'M7155 魔力吸取防御增量改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '    target_view.dungeon.气力 -= drain;\n    e_set(user + 3, e_get(user + 3) + 4);',
    replace:
      '    target_view.dungeon.气力 -= drain;\n    e_set(user + 3, e_get(user + 3) + 3); // 变异',
    tests: ['monster-skill'],
    must_mention: '十八种技能逐项',
  },
  {
    desc: 'M7156 射击 HP 扣减删除',
    file: 'ere/dungeon/monster-skill.js',
    find: '    target_view.dungeon.体力 -= dmg;\n  } else if (skill === 17) {\n    await monster_room_skill(target, user);',
    replace:
      '    // 变异：射击 HP 扣减删除\n  } else if (skill === 17) {\n    await monster_room_skill(target, user);',
    tests: ['monster-skill'],
    must_mention: '十八种技能逐项',
  },
  {
    desc: 'M7157 普通怪物地形技能使用错误列头',
    file: 'ere/dungeon/monster-skill.js',
    find: '  } else if (skill === 17) {\n    await monster_room_skill(target, user);\n  } else if (skill === 18) {\n    await print_battle_line(\n      `${monster_name}从身上的肉便器吸收着体力……（防御+2）`,',
    replace:
      '  } else if (skill === 17) {\n    await monster_room_skill(target, user + 1); // 变异\n  } else if (skill === 18) {\n    await print_battle_line(\n      `${monster_name}从身上的肉便器吸收着体力……（防御+2）`,',
    tests: ['monster-skill'],
    must_mention: '十八种技能逐项',
  },
  {
    desc: 'M7158 商店街地形 HP 倍率改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '    target_view.dungeon.体力 -= level * 2;\n    e_set(user + 2, e_get(user + 2) + 1);',
    replace:
      '    target_view.dungeon.体力 -= level; // 变异\n    e_set(user + 2, e_get(user + 2) + 1);',
    tests: ['monster-skill'],
    must_mention: '七种房间逐项',
  },
  {
    desc: 'M7159 沼地地形攻击增量改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '    target_view.dungeon.气力 -= level * 2;\n    e_set(user + 2, e_get(user + 2) + 2);',
    replace:
      '    target_view.dungeon.气力 -= level * 2;\n    e_set(user + 2, e_get(user + 2) + 1); // 变异',
    tests: ['monster-skill'],
    must_mention: '沼地攻击 +2',
  },
  {
    desc: 'M7160 人间牧场库存守卫改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '  } else if (room === 502 && game.invasion.肉便器数 > 0) {',
    replace: '  } else if (room === 502 && game.invasion.肉便器数 > 1) {',
    tests: ['monster-skill'],
    must_mention: '牧场与博物馆没有库存时不发动',
  },
  {
    desc: 'M7161 冰室地形防御增量改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '    e_set(user + 2, e_get(user + 2) + 2);\n    e_set(user + 3, e_get(user + 3) + 2);\n  } else if (room === 504)',
    replace:
      '    e_set(user + 2, e_get(user + 2) + 2);\n    e_set(user + 3, e_get(user + 3) + 1); // 变异\n  } else if (room === 504)',
    tests: ['monster-skill'],
    must_mention: '冰室防御 +2',
  },
  {
    desc: 'M7162 热砂低防御守卫改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '    if (e_get(user + 3) > 2) {',
    replace: '    if (e_get(user + 3) >= 2) { // 变异',
    tests: ['monster-skill'],
    must_mention: '不把低防御再减一',
  },
  {
    desc: 'M7163 迷宫地形防御增量改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '  } else if (room === 505) {\n    await print_battle_line(`${monster_name}躲进了迷宫里。（防御+5）`);\n    e_set(user + 3, e_get(user + 3) + 5);',
    replace:
      '  } else if (room === 505) {\n    await print_battle_line(`${monster_name}躲进了迷宫里。（防御+5）`);\n    e_set(user + 3, e_get(user + 3) + 4); // 变异',
    tests: ['monster-skill'],
    must_mention: '七种房间逐项',
  },
  {
    desc: 'M7164 博物馆地形伤害倍率改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '  } else if (room === 506 && game.event.装饰品数 > 0) {\n    const damage = Math.trunc((level * 3) / 2);',
    replace:
      '  } else if (room === 506 && game.event.装饰品数 > 0) {\n    const damage = level; // 变异：倍率删除',
    tests: ['monster-skill'],
    must_mention: '七种房间逐项',
  },
  {
    desc: 'M7165 SLAVE_MONSTER_SKILL 三分之一不发动守卫删除',
    file: 'ere/dungeon/monster-skill.js',
    find: 'async function slave_monster_skill(target, user, rand = default_rand) {\n  if (rand(3) === 0) {',
    replace:
      'async function slave_monster_skill(target, user, rand = default_rand) {\n  if (false) {',
    tests: ['monster-skill'],
    must_mention: 'RAND:3 == 0 不发动',
  },
  {
    desc: 'M7166 精英素质池被顺手修成从 470 开始',
    file: 'ere/dungeon/monster-skill.js',
    find: '  for (let talent = 401; talent < 500; talent += 1) {',
    replace: '  for (let talent = 470; talent < 500; talent += 1) { // 变异',
    tests: ['monster-skill'],
    must_mention: '401–469 时减 470 为负并浪费行动',
  },
  {
    desc: 'M7167 精英多技能随机选择被固定为最后一项',
    file: 'ere/dungeon/monster-skill.js',
    find: '  const selected = skills.length === 1 ? 0 : rand(skills.length);',
    replace: '  const selected = skills.length - 1; // 变异：不随机',
    tests: ['monster-skill'],
    must_mention: '随机选中 401–469',
  },
  {
    desc: 'M7168 素质到技能号的 470 偏移改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '  const skill = skills[selected] - 470;',
    replace: '  const skill = skills[selected] - 469; // 变异',
    tests: ['monster-skill'],
    must_mention: '471 - 470 = 粘液捕获',
  },
  {
    desc: 'M7169 USE_MONSTER_SKILL 不再覆盖传入等级',
    file: 'ere/dungeon/monster-skill.js',
    find: '  dmg = e_get(user + 1) + chara(0).chara.等级;',
    replace: '  dmg += 0; // 变异：保留传入等级',
    tests: ['monster-skill'],
    must_mention: '传入的精英等级会被 E 槽重算覆盖',
  },
  {
    desc: 'M7170 USE_MONSTER_SKILL 参数下降除数改坏',
    file: 'ere/dungeon/monster-skill.js',
    find: '  const palam_down = Math.trunc(dmg / 3) + 1;',
    replace: '  const palam_down = Math.trunc(dmg / 5) + 1; // 变异',
    tests: ['monster-skill'],
    must_mention: '精英版的数值差异',
  },
  {
    desc: 'M7171 精英防御增益误写到 E 数组',
    file: 'ere/dungeon/monster-skill.js',
    find: '    } else if (user_type === 2) {\n      chara(user).dungeon.防御力 += value;\n    }',
    replace:
      '    } else if (user_type === 2) {\n      e_set(user + 3, e_get(user + 3) + value); // 变异\n    }',
    tests: ['monster-skill'],
    must_mention: '精英版的数值差异与写入位置',
  },
  {
    desc: 'M7172 精英麻痹误用参数下降值',
    file: 'ere/dungeon/monster-skill.js',
    find: '  } else if (skill === 10) {\n    await print_battle_line(`${user_name}喷出了麻痹气体！！（攻击-${dmg}）`);\n    target_view.dungeon.攻击力 -= dmg;',
    replace:
      '  } else if (skill === 10) {\n    await print_battle_line(`${user_name}喷出了麻痹气体！！（攻击-${dmg}）`);\n    target_view.dungeon.攻击力 -= palam_down; // 变异',
    tests: ['monster-skill'],
    must_mention: '精英版的数值差异',
  },
  {
    desc: 'M7173 精英混乱误用普通怪物伤害',
    file: 'ere/dungeon/monster-skill.js',
    find: '  } else if (skill === 12) {\n    const confusion = Math.trunc((palam_down * 3) / 2);',
    replace:
      '  } else if (skill === 12) {\n    const confusion = Math.trunc((dmg * 3) / 2); // 变异',
    tests: ['monster-skill'],
    must_mention: '精英版的数值差异',
  },
  {
    desc: 'M7174 精英肉铠被顺手改成按类型分流',
    file: 'ere/dungeon/monster-skill.js',
    find: '    e_set(user + 3, e_get(user + 3) + 2);\n  }\n  return 0;\n}\n\nmodule.exports',
    replace:
      '    add_defence(2); // 变异：按类型分流\n  }\n  return 0;\n}\n\nmodule.exports',
    tests: ['monster-skill'],
    must_mention: '精英版的数值差异与写入位置',
  },
  {
    desc: 'M7175 MONSTER_SKILL 重新登记成 dungeon-battle 存根',
    file: 'ere/dungeon/dungeon-battle.js',
    find: "const STUBBED_CALLS = [\n  'CAMPAIGN_MONSTER_LIST',",
    replace:
      "const STUBBED_CALLS = [\n  'MONSTER_SKILL', // 变异：真身倒退为存根登记\n  'CAMPAIGN_MONSTER_LIST',",
    tests: ['monster-skill'],
    must_mention: 'MONSTER_SKILL 不再登记为存根',
  },
  {
    desc: 'M7176 怪物战斗入口不再透传随机源',
    file: 'ere/dungeon/dungeon-battle.js',
    find: '    (await monster_skill_mod.monster_skill(arg0, skill_no, monid, rand)) === 999',
    replace:
      '    (await monster_skill_mod.monster_skill(arg0, skill_no, monid)) === 999',
    tests: ['monster-skill'],
    must_mention: '透传确定性随机源',
  },
  {
    desc: 'M7177 SLAVE_MONSTER_SKILL 重新登记成 dungeon-battle2 存根',
    file: 'ere/dungeon/dungeon-battle2.js',
    find: 'const STUBBED_CALLS = [];',
    replace: "const STUBBED_CALLS = ['SLAVE_MONSTER_SKILL']; // 变异",
    tests: ['monster-skill'],
    must_mention: 'SLAVE_MONSTER_SKILL 不再登记为存根',
  },
  {
    desc: 'M7178 精英战斗入口不再透传随机源',
    file: 'ere/dungeon/dungeon-battle2.js',
    find: '  if ((await monster_skill_mod.slave_monster_skill(arg2, arg0, rand)) === 999) {',
    replace:
      '  if ((await monster_skill_mod.slave_monster_skill(arg2, arg0)) === 999) {',
    tests: ['monster-skill'],
    must_mention: '透传确定性随机源',
  },
  {
    desc: 'M7179 战斗日志守卫被恒关闭',
    file: 'ere/dungeon/monster-skill.js',
    find: '  if ((game.dungeon.游戏设定 & 32) !== 0) {',
    replace: '  if (false) { // 变异：日志恒关闭',
    tests: ['monster-skill'],
    must_mention: '战斗日志开启时等待输出',
  },
];
