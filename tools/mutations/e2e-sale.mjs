// issue #351：阶段 5a 奴隶出售全链与 ENDING_2 真身接入证明。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 4; // #641 起 -2（M7800/M7801 名单复辟检查随存根名单机制移除）

export default [
  {
    desc: 'M7802 use_ex_item 战斗中调用点删除',
    file: 'ere/system/dungeon/dungeon-battle.js',
    find: "    await ex_item_mod.use_ex_item('战斗中', atker);",
    replace: '    // 变异：战斗中 USE_EX_ITEM 调用删除',
    tests: ['event-ending2-e2e'],
    must_mention: 'USE_EX_ITEM 在 ENDING_2 战斗中调用点实际执行',
  },
  {
    desc: 'M7803 use_ex_item 战斗后三个调用点删除',
    file: 'ere/system/dungeon/dungeon.js',
    find: `  await ex_item_mod.use_ex_item('战斗后', arg0, rand_n); // （A = ARG:0）
  if (ctx.sidea > 0) {
    await ex_item_mod.use_ex_item('战斗后', ctx.sidea, rand_n); // （A = SIDEA）
  }
  if (ctx.sideb > 0) {
    await ex_item_mod.use_ex_item('战斗后', ctx.sideb, rand_n); // （A = SIDEB）
  }`,
    replace: '  // 变异：战斗后三个 USE_EX_ITEM 调用删除',
    tests: ['event-ending2-e2e'],
    must_mention: 'USE_EX_ITEM 在 ENDING_2 战斗后调用点实际执行',
  },
  {
    desc: 'M7804 SELL_MATURO_K0 黑市末路台词里的「买下」改坏',
    file: 'ere/system/stronghold/sell-maturo-k0-normal.js',
    find: `  await era.printAndWait(\`\${buyer}买下\${target_name}之后………\`);
  await era.printAndWait(\`………\`);
  await era.printAndWait(\`……\`);
  await era.printAndWait(\`…\`);

  if (route === 3) ending = await normal_other_lt100k_mine_owner(ctx);`,
    replace: `  await era.printAndWait(\`\${buyer}收下\${target_name}之后………\`);
  await era.printAndWait(\`………\`);
  await era.printAndWait(\`……\`);
  await era.printAndWait(\`…\`);

  if (route === 3) ending = await normal_other_lt100k_mine_owner(ctx);`,
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
