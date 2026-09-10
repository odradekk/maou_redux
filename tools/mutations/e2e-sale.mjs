// issue #351：阶段 5a 奴隶出售全链与 ENDING_2 真身接入证明。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 6;

export default [
  {
    desc: 'M7800 MAGIC 重新登记成 dungeon-battle 存根（端到端宿主）',
    file: 'ere/dungeon/dungeon-battle.js',
    find: "const STUBBED_CALLS = [\n  'CAMPAIGN_MONSTER_LIST',",
    replace:
      "const STUBBED_CALLS = [\n  'MAGIC', // 变异：真身倒退为存根登记\n  'CAMPAIGN_MONSTER_LIST',",
    tests: ['event-ending2-e2e'],
    must_mention: 'MAGIC 在 ENDING_2 战斗路径实际执行且未退回存根',
  },
  {
    desc: 'M7801 MONSTER_SKILL 重新登记成 dungeon-battle 存根（端到端宿主）',
    file: 'ere/dungeon/dungeon-battle.js',
    find: "const STUBBED_CALLS = [\n  'CAMPAIGN_MONSTER_LIST',",
    replace:
      "const STUBBED_CALLS = [\n  'MONSTER_SKILL', // 变异：真身倒退为存根登记\n  'CAMPAIGN_MONSTER_LIST',",
    tests: ['event-ending2-e2e'],
    must_mention: 'MONSTER_SKILL 在 ENDING_2 战斗路径实际执行且未退回存根',
  },
  {
    desc: 'M7802 USE_EX_ITEM 战斗中调用点删除',
    file: 'ere/dungeon/dungeon-battle.js',
    find: "    await use_ex_item('战斗中', atker);",
    replace: '    // 变异：战斗中 USE_EX_ITEM 调用删除',
    tests: ['event-ending2-e2e'],
    must_mention: 'USE_EX_ITEM 在 ENDING_2 战斗中调用点实际执行',
  },
  {
    desc: 'M7803 USE_EX_ITEM 战斗后三个调用点删除',
    file: 'ere/dungeon/dungeon.js',
    find: `  await ex_item_mod.use_ex_item('战斗后', arg0, rand_n); // :736（A = ARG:0）
  if (sidea > 0) {
    await ex_item_mod.use_ex_item('战斗后', sidea, rand_n); // :739（A = SIDEA）
  }
  if (sideb > 0) {
    await ex_item_mod.use_ex_item('战斗后', sideb, rand_n); // :743（A = SIDEB）
  }`,
    replace: '  // 变异：战斗后三个 USE_EX_ITEM 调用删除',
    tests: ['event-ending2-e2e'],
    must_mention: 'USE_EX_ITEM 在 ENDING_2 战斗后调用点实际执行',
  },
  {
    desc: 'M7804 SELL_MATURO_K0 成熟出售调用退回空存根',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      await sell_maturo_k0(target, { rand: _rand }); // CALL SELL_MATURO_K0 // :6992',
    replace: '      // 变异：SELL_MATURO_K0 退回空存根',
    tests: ['event-corrupt-e2e'],
    must_mention: 'SELL_MATURO_K0 必须进入低价自然态的黑市末路',
  },
  {
    desc: 'M7805 CHARA_SALE 售出后除名退回空存根',
    file: 'ere/system/stronghold/sale.js',
    find: '      await kill_target(selected);',
    replace: '      // 变异：KILL_TARGET 退回空存根',
    tests: ['event-corrupt-e2e'],
    must_mention: 'CHARA_SALE 必须让已售角色离场',
  },
];
