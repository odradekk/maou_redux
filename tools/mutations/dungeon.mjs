// 变异条目表切片：ere/dungeon/（迷宫主循环与队伍编组，#172 H3）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号不人工分配，
// 只作引用锚点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）——
// 重号由 gate_shape 随 --verify 秒级核对。
export default [
  {
    desc: 'M375 迷宫接入点·探索臂守卫改坏（place 2/3 判定恒假——勇者进不了迷宫）',
    file: 'ere/system/turnend-settle.js',
    find: "    if ((place === 2 || place === 3) && (era.get('flag:502') || 0) === 0) {",
    replace:
      "    if (false && (place === 2 || place === 3) && (era.get('flag:502') || 0) === 0) {",
    tests: ['event-turnend'],
    must_mention: '状态 2 且 FLAG:502 == 0 应走迷宫本体',
  },
  {
    desc: 'M376 迷宫接入点·战役臂守卫改坏（CFLAG:1 == 12 判定恒假）',
    file: 'ere/system/turnend-settle.js',
    find: '    if (chara(cid).invasion.状态 === 12) {',
    replace: '    if (chara(cid).invasion.状态 === 1200) {',
    tests: ['event-turnend'],
    must_mention: '状态 12 恰好一次 DUNGEON',
  },
  {
    desc: 'M377 踏破判定改坏（D:20 >= 100 → >= 147：one×2 = 146 恒不踏破）',
    file: 'ere/dungeon/dungeon.js',
    find: '    if (walk20 >= 100) {',
    replace: '    if (walk20 >= 147) {',
    tests: ['dungeon-main'],
    must_mention: '八次踏破后到达第 9 层',
  },
  {
    desc: 'M378 ENDING_2 接入条件取反（TALENT:122 == 0 → != 0：真勇者反而不进结局）',
    file: 'ere/dungeon/dungeon.js',
    find: '          if ((era.get(`talent:${arg0}:122`) || 0) === 0) {',
    replace: '          if ((era.get(`talent:${arg0}:122`) || 0) !== 0) {',
    tests: ['dungeon-main'],
    // must_mention 随 #173 的用例翻修同步：贯通用例断言从「接入存根」改为
    // 「quit 炸穿」（ENDING_2 真身落地），锚串换新断言消息（#133 先例）
    must_mention: 'QUIT 异常炸穿',
  },
  {
    desc: 'M379 冒险者回头臂的挫折记忆改坏（507 = 1 删——撤退标志不立）',
    file: 'ere/dungeon/dungeon.js',
    find: `              era.print(\`\${leader_name}放弃了成为英雄的念头，开始回头了。\`);
              era.print('再次鼓起勇气来到这里可能会花些时间了。');
              chara(arg0).invasion.回城标志 = 1; // CFLAG:507 = 1`,
    replace: `              era.print(\`\${leader_name}放弃了成为英雄的念头，开始回头了。\`);
              era.print('再次鼓起勇气来到这里可能会花些时间了。');
              // 变异：CFLAG:507 = 1 删除`,
    tests: ['dungeon-main'],
    must_mention: 'CFLAG:507 = 1 撤退中',
  },
  {
    desc: 'M380 行动完了提前返回删坏（530 == 1 照常推进）',
    file: 'ere/dungeon/dungeon.js',
    find: '  if ((era.get(`cflag:${arg0}:530`) || 0) === 1) {',
    replace: '  if (false) {',
    tests: ['dungeon-main'],
    must_mention: 'CFLAG:530 == 1 直接返回',
  },
  {
    desc: 'M381 迎击的侵攻度方向改坏（-= 改 +=：迎击方也在推进）',
    file: 'ere/dungeon/dungeon.js',
    find: '      walk20 -= walk;',
    replace: '      walk20 += walk;',
    tests: ['dungeon-main'],
    must_mention: '方向辨析',
  },
  {
    desc: 'M382 迎击魔王的房间终点改坏（507 = 0 删）',
    file: 'ere/dungeon/dungeon.js',
    find: `          era.print(\`\${leader_name}返回了魔王的房间。\`); // :268
          walk20 = 100;
          chara(arg0).invasion.回城标志 = 0; // :270 CFLAG:507 = 0`,
    replace: `          era.print(\`\${leader_name}返回了魔王的房间。\`); // :268
          walk20 = 100;
          // 变异：CFLAG:507 = 0 删除`,
    tests: ['dungeon-main'],
    must_mention: 'CFLAG:507 = 0',
  },
  {
    desc: 'M383 GET_DOWN_ENEMY 充公删坏（MONEY 不加算）',
    file: 'ere/dungeon/dungeon.js',
    find: `  const gain = Math.floor(chara(arg0).dungeon.所持金 / 100);
  era_flag.money += gain;
  era_exflag.legit_money += gain;`,
    replace: `  const gain = Math.floor(chara(arg0).dungeon.所持金 / 100);
  // 变异：MONEY 与 EX_FLAG:4444 的加算删除`,
    tests: ['dungeon-main'],
    must_mention: 'MONEY += 580/100',
  },
  {
    desc: 'M384 CHECK_STATUS 首分支阈值改坏（S1_HP 60 → 40：半血不再判轻伤）',
    file: 'ere/dungeon/dungeon.js',
    find: '  if (hp_pct < 60 || wp_pct < 50) {',
    replace: '  if (hp_pct < 40 || wp_pct < 50) {',
    tests: ['dungeon-main'],
    must_mention: '状态档 2（轻伤）',
  },
  {
    desc: 'M385 PARTY_UNITE 队长核对删坏（同伴不再置行动完了）',
    file: 'ere/dungeon/dungeon-party.js',
    find: `        if (leader === charid) {
          // 合っていたら行動終了になる（同伴以行动完了追随队长）
          era.set(\`cflag:\${rest}:530\`, 1);`,
    replace: `        if (leader === charid) {
          // 合っていたら行動終了になる（同伴以行动完了追随队长）
          // 变异：era.set(\`cflag:\${rest}:530\`, 1) 删除`,
    tests: ['dungeon-party'],
    must_mention: '引用正确的同伴置行动完了',
  },
  {
    desc: 'M386 SEARCH_FREE 同层判定改坏（阶层过滤删——异层勇者被吸收）',
    file: 'ere/dungeon/dungeon-party.js',
    find: `    // 同階層以外を除く（CFLAG:501 侵攻阶层）
    if (floor !== (era.get(\`cflag:\${charid}:501\`) || 0)) {
      continue;
    }`,
    replace: `    // 同階層以外を除く（CFLAG:501 侵攻阶层）——变异：过滤删除`,
    tests: ['dungeon-party'],
    must_mention: '不同层的布莱克被跳过',
  },
  {
    desc: 'M387 PARTY_DEL 队长解散复位删坏（533 不清）',
    file: 'ere/dungeon/dungeon-party.js',
    find: `    era.set(\`cflag:\${leader}:530\`, 0);
    era.set(\`cflag:\${leader}:531\`, 0);
    era.set(\`cflag:\${leader}:532\`, 0);
    era.set(\`cflag:\${leader}:533\`, 0);
    era.set(\`cflag:\${rest_a}:530\`, 0);
    era.set(\`cflag:\${rest_a}:533\`, 0);
    era.set(\`cflag:\${rest_b}:530\`, 0);
    era.set(\`cflag:\${rest_b}:533\`, 0);
  } else if (cid === rest_a) {`,
    replace: `    era.set(\`cflag:\${leader}:530\`, 0);
    era.set(\`cflag:\${leader}:531\`, 0);
    era.set(\`cflag:\${leader}:532\`, 0);
    // 变异：era.set(\`cflag:\${leader}:533\`, 0) 删除
    era.set(\`cflag:\${rest_a}:530\`, 0);
    era.set(\`cflag:\${rest_a}:533\`, 0);
    era.set(\`cflag:\${rest_b}:530\`, 0);
    era.set(\`cflag:\${rest_b}:533\`, 0);
  } else if (cid === rest_a) {`,
    tests: ['dungeon-party'],
    must_mention: '队长 1:533 清零',
  },
  {
    desc: 'M388 GET_JUNK_ITEM 阶层乘算删坏（LOCAL *= CFLAG:501 删）',
    file: 'ere/dungeon/dungeon.js',
    find: `  // :1064 LOCAL *= CFLAG:ARG:501（阶层）
  local *= chara(cid).dungeon.侵攻阶层;`,
    replace: '  // :1064 LOCAL *= CFLAG:ARG:501（阶层）——变异：乘算删除',
    tests: ['dungeon-main'],
    must_mention: '四项素质补正',
  },
  // —— #173（H4）：ENDING_2 贯通终点的演出行（M446）——
  {
    desc: 'M446 魔王房间演出行删除（:200「这里是魔王的房间………」）',
    file: 'ere/dungeon/dungeon.js',
    find: "          era.print('这里是魔王的房间………'); // :200",
    replace: '          // 变异：魔王房间演出删',
    tests: ['dungeon-main', 'event-ending2-e2e'],
    must_mention: '这里是魔王的房间',
  },
  // —— #175（H6）：迷宫战斗（M480-M487）——
  {
    desc: 'M480 勇者臂的战斗调用删除（dungeon_party_battle 不再发生）',
    file: 'ere/dungeon/dungeon.js',
    find: `        // :441-477 戦闘（H6（#175）真身：勇者会掉 HP/气力、会投降）
        let turnend = 0; // TURNEND：誰かが敗北して冒険が中断される
        await battle_mod.dungeon_party_battle(arg0, rand_n, move_ctx);`,
    replace: `        // :441-477 戦闘（H6（#175）真身：勇者会掉 HP/气力、会投降）
        let turnend = 0; // TURNEND：誰かが敗北して冒険が中断される
        // 变异：勇者臂的战斗调用删（勇者不遇敌、不掉气力）`,
    tests: ['dungeon-main', 'dungeon-battle'],
    must_mention: '真身态气力',
  },
  {
    desc: 'M481 DEATH_CHECK 投降臂的陷落写入删（CFLAG:1 = 0 不写）',
    file: 'ere/dungeon/dungeon-battle.js',
    find: `    era.print(\`\${name_of(arg0)}感觉到生命垂危，投降求饶了。\`);
    chara(arg0).invasion.状态 = 0;
    return 2;`,
    replace: `    era.print(\`\${name_of(arg0)}感觉到生命垂危，投降求饶了。\`);
    // 变异：投降的陷落写入删（CFLAG:1 = 0 不写）
    return 2;`,
    tests: ['dungeon-battle'],
    must_mention: '投降（CFLAG:1 = 0）',
  },
  {
    desc: 'M482 DEATH_CHECK2 勇者侧退场的陷落写入删',
    file: 'ere/dungeon/dungeon-battle2.js',
    find: `    era.print(\`\${name_of(arg1)}最终在潮湿的地下城中用尽了最后的气力。\`);
    chara(arg1).invasion.状态 = 0;
    return 2;`,
    replace: `    era.print(\`\${name_of(arg1)}最终在潮湿的地下城中用尽了最后的气力。\`);
    // 变异：勇者退场的陷落写入删
    return 2;`,
    tests: ['dungeon-battle'],
    must_mention: '勇者 CFLAG:1 = 0',
  },
  {
    desc: 'M483 SPY 迎击入口删除（CFLAG:1 == 3 的提前返回内不再调 dungeon_spy）',
    file: 'ere/dungeon/dungeon.js',
    find: `    if (chara(arg0).invasion.状态 === 3) {
      await battle2_mod.dungeon_spy(arg0, rand_n);
    }`,
    replace: `    if (chara(arg0).invasion.状态 === 3) {
      // 变异：迎击潜入调用删
    }`,
    tests: ['dungeon-main'],
    must_mention: '工作活动扣了勇者的 HP/气力',
  },
  {
    desc: 'M484 monster-database 一条数据改坏（狗头人等级 1 → 9）',
    file: 'ere/data/monster-database.js',
    find: `  100: {
    番号: 100,
    等级: 1,`,
    replace: `  100: {
    番号: 100,
    等级: 9, // 变异：等级改坏`,
    tests: ['dungeon-battle'],
    must_mention: '九字段与源不一致',
  },
  {
    desc: 'M485 BATTLE2 的败者号传参坏（loser 恒 0）',
    file: 'ere/dungeon/dungeon-battle2.js',
    find: `  if (chara(enemy).invasion.状态 === 0) {
    return { result: 2, loser: enemy };
  }`,
    replace: `  if (chara(enemy).invasion.状态 === 0) {
    return { result: 2, loser: 0 }; // 变异：败者号不传
  }`,
    tests: ['dungeon-battle'],
    must_mention: '败者号 = 勇者 2',
  },
  {
    desc: 'M486 MONSTER_ATTACK 的 off-by-one 被「修好」（-100 → -99：原作缺陷形态被改）',
    file: 'ere/dungeon/dungeon-battle.js',
    find: '  // :1052 IDを先頭に——-100（非同构处的 -99）：off-by-one，文件头注释\n  monid -= 100;',
    replace:
      '  // :1052 IDを先頭に——变异：off-by-one 被修好（-99），原作缺陷形态被改\n  monid -= 99;',
    tests: ['dungeon-battle'],
    must_mention: 'HP 不动（DMG = 0×等级 = 0）',
  },
  {
    desc: 'M487 BATTLE2 勇者退场的 result 分流坏（return 2 → 0）',
    file: 'ere/dungeon/dungeon-battle2.js',
    find: `  if (chara(enemy).invasion.状态 === 0) {
    return { result: 2, loser: enemy };
  }`,
    replace: `  if (chara(enemy).invasion.状态 === 0) {
    return { result: 0, loser: enemy }; // 变异：勇者退场的 result 分流坏
  }`,
    tests: ['dungeon-battle'],
    must_mention: '勇者被打退',
  },

  // —— #176 H7 陷阱（ere/dungeon/dungeon-trap.js 与 dungeon.js 的接线）——
  {
    desc: 'M540 陷阱 A 槽基址错位（+299 → +300：槽寻位读空列）',
    file: 'ere/dungeon/dungeon-trap.js',
    find: '    let trap_num = chara(a).dungeon.侵攻阶层 + 299;',
    replace:
      '    let trap_num = chara(a).dungeon.侵攻阶层 + 300; // 变异：A 槽基址错位',
    tests: ['dungeon-trap'],
    must_mention: '落穴伤害经分发落变量',
  },
  {
    desc: 'M541 同一陷阱回避阈值改坏（20 - 512 → 20 + 512：恒不回避）',
    file: 'ere/dungeon/dungeon-trap.js',
    find: '      const trap_miss = 20 - c512;',
    replace: '      const trap_miss = 20 + c512; // 变异：回避阈值方向反',
    tests: ['dungeon-trap'],
    must_mention: '回避演出',
  },
  {
    desc: 'M542 陷阱消耗守卫改坏（TRAP_NOUSE == 0 → != 0：未作动反消耗）',
    file: 'ere/dungeon/dungeon-trap.js',
    find: '        trap_nouse === 0 &&\n        place === 2\n      ) {',
    replace:
      '        trap_nouse !== 0 &&\n        place === 2\n      ) { // 变异：消耗守卫反',
    tests: ['dungeon-trap'],
    must_mention: '作动消耗一个库存',
  },
  {
    desc: 'M543 TRAP_PRICE 价格表错（63 号 100 → 101）',
    file: 'ere/dungeon/dungeon-trap.js',
    find: '    63: 100,',
    replace: '    63: 101, // 变异：价格错',
    tests: ['dungeon-trap'],
    must_mention: 'TRAP_PRICE(63) 应为 100',
  },
  {
    desc: 'M544 PIT 重伤档的两倍伤害删（dice *= 2）',
    file: 'ere/dungeon/dungeon-trap.js',
    find: '    dice = rand_n(40) + diff * 10 + 1;\n    dice *= 2;',
    replace: '    dice = rand_n(40) + diff * 10 + 1; // 变异：两倍伤害删',
    tests: ['dungeon-trap'],
    must_mention: '要害两倍伤害',
  },
  {
    desc: 'M545 TELEPORT 的侵攻度写回删（ctx.d20 = 1 的起点档）',
    file: 'ere/dungeon/dungeon-trap.js',
    find: '    ctx.d20 = 1; // :330 D:20 = 1',
    replace: '    // 变异：ctx.d20 = 1 删（:330）',
    tests: ['dungeon-trap'],
    must_mention: 'D:20 = 1（:330）',
  },
  {
    desc: 'M546 SHOOT 的下坠一层删（侵攻阶层 += 1）',
    file: 'ere/dungeon/dungeon-trap.js',
    find: '    chara(a).dungeon.侵攻阶层 += 1;\n    if (show) {\n      era.print(`掉到了下一层，${name}迷路了…`);',
    replace:
      '    // 变异：侵攻阶层 += 1 删\n    if (show) {\n      era.print(`掉到了下一层，${name}迷路了…`);',
    tests: ['dungeon-trap'],
    must_mention: '下坠一层（:1066）',
  },
  {
    desc: 'M547 SUCCUBUS 的百合经验档删（EXP:40 += 6）',
    file: 'ere/dungeon/dungeon-trap.js',
    find: '    if (yuri) {\n      chara(a).train.百合经验 += 6; // :776 EXP:A:40（train 域门面）\n    }',
    replace:
      '    if (false && yuri) { // 变异：百合经验档删\n      chara(a).train.百合经验 += 6; // :776 EXP:A:40（train 域门面）\n    }',
    tests: ['dungeon-trap'],
    must_mention: '百合经验 +6',
  },
  {
    desc: 'M548 陷阱自动补货的金库扣款删（MONEY -= price）',
    file: 'ere/dungeon/dungeon-trap.js',
    find: '          era_flag.money -= price;\n          era_exflag.legit_money -= price;',
    replace:
      '          // 变异：金库扣款删\n          era_exflag.legit_money -= price;',
    tests: ['dungeon-trap'],
    must_mention: 'MONEY -= TRAP_PRICE（:175）',
  },
  {
    desc: 'M549 诈骗剧情3 的双倍欠条改坏（582 -= COST×2 → -= COST）',
    file: 'ere/dungeon/dungeon-trap.js',
    find: '  chara(a).patch.借款 -= cost * 2; // CFLAG:582（patch 域门面「借款」）',
    replace: '  chara(a).patch.借款 -= cost; // 变异：双倍欠条改单倍',
    tests: ['dungeon-trap'],
    must_mention: '债务 COST×2（:231）',
  },
  {
    desc: 'M550 SLAVE_TRAP_SET 的补充增量删（stock + 1 → stock）',
    file: 'ere/dungeon/dungeon-trap.js',
    find: '      if (stock > 0 && stock < 99) {\n        era.set(`item:${trap_id}`, stock + 1);\n      }',
    replace:
      '      if (stock > 0 && stock < 99) {\n        era.set(`item:${trap_id}`, stock); // 变异：补充增量删\n      }',
    tests: ['dungeon-trap'],
    must_mention: '库存 5 → 补 1（:1440）',
  },
  {
    desc: 'M551 dungeon.js 的 D:20 收线删（walk20 = trap_ctx.d20）',
    file: 'ere/dungeon/dungeon.js',
    find: '    // TELEPORT 的 D:20 写回（:330/:335）——:748 的 CFLAG:502 = D:20 用它\n    walk20 = trap_ctx.d20;',
    replace:
      '    // TELEPORT 的 D:20 写回（:330/:335）——变异：收线删\n    // walk20 = trap_ctx.d20;',
    tests: ['dungeon-trap'],
    must_mention: 'CFLAG:502 = D:20 = 1（:748）',
  },
  // —— #181（H12 2D 地下城）：LABO 三文件 + FIRST_SETTING 一问 + turnend
  //    else 臂。M580 起编（#182/#185/#176/#180 占 M500/M520/M540/M560 段）——

  {
    desc: 'M580 余弦系数表偏移 1 改坏（4 → 5：三条插值曲线的起点权重漂移）',
    file: 'ere/dungeon/labo.js',
    find: 'const COS_TABLE = { 1: 4, 2: 15, 3: 31, 4: 50, 5: 69, 6: 85, 7: 96 };',
    replace:
      'const COS_TABLE = { 1: 5, 2: 15, 3: 31, 4: 50, 5: 69, 6: 85, 7: 96 }; // 变异：偏移 1 的系数 4 → 5',
    tests: ['dungeon-labo'],
    must_mention: '负差向零截断',
  },
  {
    desc: 'M581 GEO_CALC_INTERP 的对角项分母改坏（10000 → 1000：块内插值的交叉项放大十倍）',
    file: 'ere/dungeon/labo.js',
    find: '    idiv((arg0 - arg1 - arg2 + arg3) * kx * ky, 10000) +',
    replace:
      '    idiv((arg0 - arg1 - arg2 + arg3) * kx * ky, 1000) + // 变异：分母 10000 → 1000',
    tests: ['dungeon-labo'],
    must_mention: '对称四角的中心值',
  },
  {
    desc: 'M582 GEO_TEST 点阵写入的维度转置（da[y][x] → da[x][y]：行主序破坏）',
    file: 'ere/dungeon/labo.js',
    find: '      da_set(y, x, rand_n(256)); // ランダマイズ',
    replace:
      '      da_set(x, y, rand_n(256)); // 变异：维度转置（[y][x] → [x][y]）',
    tests: ['dungeon-labo'],
    must_mention: '第一行第 5 个点',
  },
  {
    desc: 'M583 MON_CHECK 的兵力阈值改坏（> 20 → >= 20：兵力恰 20 的怪物凭空在场）',
    file: 'ere/dungeon/labo-map.js',
    find: '  if (troops > 20) {',
    replace: '  if (troops >= 20) { // 变异：阈值 > 20 → >= 20',
    tests: ['dungeon-labo'],
    must_mention: '兵力 20 不满足',
  },
  {
    desc: 'M584 UNIT_MOVE 的中心判定偏移（16,16 → 15,16：魔王城挪一格，2D 路径到不了终点）',
    file: 'ere/dungeon/labo-dungeon-map.js',
    find: '  if (mx === 16 && my === 16) {',
    replace: '  if (mx === 15 && my === 16) { // 变异：中心判定偏移一格',
    tests: ['dungeon-labo', 'event-ending2-2d-e2e'],
    must_mention: '炸穿 unit_move',
  },
  {
    desc: 'M585 DUNGEON_MAP 的侵攻度写回改坏（D:20 丢失——2D 单位的推进状态不再持久）',
    file: 'ere/dungeon/labo-dungeon-map.js',
    find: '  chara(a).event.侵攻度 = walk20;',
    replace: '  chara(a).event.侵攻度 = 0; // 变异：写回值丢成 0',
    tests: ['dungeon-labo'],
    must_mention: 'CFLAG:502 = D:20',
  },
  {
    desc: 'M586 turnend else 臂的 DUNGEON_MAP 调用蒸发（2D 模式的勇者原地不动）',
    file: 'ere/system/turnend-settle.js',
    find: `    } else if (place === 2 || place === 3) {
      await dungeon_map(cid);
    }`,
    replace: `    } else if (place === 2 || place === 3) {
      // 变异：dungeon_map 调用蒸发（2D 模式空转）
    }`,
    tests: ['event-turnend', 'event-ending2-2d-e2e'],
    must_mention: '走野外地图',
  },
  {
    // #181 返工：DA/DB/DC 落引擎表（一维折叠）——两条钉住承载不倒退
    desc: 'M588 da_set 蒸发（era.set 删掉——引擎表承载退化为只读零值，存档快照失去 da: 键）',
    file: 'ere/dungeon/labo.js',
    find: 'function da_set(y, x, v) {\n  era.set(`da:${y * 100 + x}`, v);\n}',
    replace:
      'function da_set(y, x, v) {\n  // 变异：era.set 蒸发（写入不落引擎表）\n}',
    tests: ['dungeon-labo'],
    must_mention: '前置，防恒真断言',
  },
  {
    desc: 'M589 da_get 的折叠算式改坏（y*100+x → y+x：格子地址错位串行）',
    file: 'ere/dungeon/labo.js',
    find: 'function da_get(y, x) {\n  return era.get(`da:${y * 100 + x}`) || 0;\n}',
    replace:
      'function da_get(y, x) {\n  return era.get(`da:${y + x}`) || 0; // 变异：折叠算式 y+x\n}',
    tests: ['dungeon-labo'],
    must_mention: '正向差：0 + trunc',
  },
  {
    desc: 'M587 FIRST_SETTING 地下城模式一问的置位蒸发（FLAG:502 恒 0——2D 模式不可达）',
    file: 'ere/event/first-setting.js',
    find: '      game.dungeon.迷宫模式 = result; // :924 FLAG:502 = RESULT',
    replace:
      '      // game.dungeon.迷宫模式 = result; // 变异：置位蒸发（FLAG:502 恒 0）',
    tests: ['dungeon-labo', 'event-ending2-2d-e2e'],
    must_mention: 'game 门面写入',
  },
  // —— #179（H10）迷宫日程与战果：LVUP / DUNGEON_AFTER / DUNGEON_DAILY ——
  {
    desc: 'M620 升级守卫删（place !== 2 改恒真——侵攻中的勇者也升级）',
    file: 'ere/system/turnend-settle.js',
    find: '    if (place !== 2) {',
    replace: '    if (true) { // 变异：守卫删',
    tests: ['event-turnend'],
    must_mention: 'SIF CFLAG:A:1 != 2 守卫',
  },
  {
    desc: 'M621 LVUP 精英曲线翻倍删（LV*20+10 → LV*10+10）',
    file: 'ere/dungeon/dungeon-lvup.js',
    find: '      need = local0 * 2 + 10;',
    replace: '      need = local0; // 变异：精英翻倍删',
    tests: ['dungeon-lvup'],
    must_mention: '勇者两倍',
  },
  {
    desc: 'M622 ST_UP 基础攻防增量删（各 +1）',
    file: 'ere/dungeon/dungeon-lvup.js',
    find: '  chara(cid).chara.基础攻击 += 1; // CFLAG:13\n  chara(cid).chara.基础防御 += 1; // CFLAG:14',
    replace:
      '  // 变异：基础攻防增量删\n  // chara(cid).chara.基础攻击 += 1;\n  // chara(cid).chara.基础防御 += 1;',
    tests: ['dungeon-lvup'],
    must_mention: '基础攻击 1 + RAND:2=0 的 1',
  },
  {
    desc: 'M623 ST_UP 的体力/气力上限 +10 删',
    file: 'ere/dungeon/dungeon-lvup.js',
    find: '  era.add(`maxbase:${cid}:0`, 10);\n  era.add(`maxbase:${cid}:1`, 10);',
    replace:
      '  // 变异：上限增量删\n  // era.add(`maxbase:${cid}:0`, 10);\n  // era.add(`maxbase:${cid}:1`, 10);',
    tests: ['dungeon-lvup'],
    must_mention: '体力上限 +10',
  },
  {
    desc: 'M624 LVUP 初心者剥离删（TALENT:291 清 0 改坏）',
    file: 'ere/dungeon/dungeon-lvup.js',
    find: '    chara(cid).chara.初心者 = 0; // TALENT:291（chara 域门面）',
    replace: '    // 变异：初心者剥离删',
    tests: ['dungeon-lvup'],
    must_mention: '失去初心者',
  },
  {
    desc: 'M625 DUNGEON_AFTER 奖赏臂分派改坏（状态 5 改 7）',
    file: 'ere/dungeon/dungeon-after.js',
    find: '  if (chara(cid).invasion.状态 === 5) {',
    replace: '  if (chara(cid).invasion.状态 === 7) { // 变异：分派改坏',
    tests: ['dungeon-after', 'event-turnend'],
    must_mention: 'CFLAG:1 == 5 → 奖赏臂',
  },
  {
    desc: 'M626 DUNGEON_AFTER 惩罚臂分派改坏（状态 6 改 7）',
    file: 'ere/dungeon/dungeon-after.js',
    find: '  } else if (chara(cid).invasion.状态 === 6) {',
    replace: '  } else if (chara(cid).invasion.状态 === 7) { // 变异：分派改坏',
    tests: ['dungeon-after', 'event-turnend'],
    must_mention: 'CFLAG:1 == 6 → 惩罚臂',
  },
  {
    desc: 'M627 GOHOUBI 金币档的金库扣款删（MONEY 与非作弊资金）',
    file: 'ere/dungeon/dungeon-after.js',
    find: '        era_flag.money -= lv * 100;\n        era_exflag.legit_money -= lv * 100; // EX_FLAG:4444 非作弊资金',
    replace:
      '        // 变异：金库扣款删\n        // era_flag.money -= lv * 100;\n        // era_exflag.legit_money -= lv * 100;',
    tests: ['dungeon-after'],
    must_mention: 'MONEY -= 500',
  },
  {
    desc: 'M628 OSIOKI 电椅刑恍惚臂的屈服点数删（JUEL:6 加算）',
    file: 'ere/dungeon/dungeon-after.js',
    find: '      era.print(`屈服点数+${local11}`);\n      await era.waitAnyKey();\n      era.add(`juel:${cid}:6`, local11); // JUEL:6 屈服\n    } else {\n      era.print(`${name}哭叫着，在电击的痛苦中漏出了小便。`);',
    replace:
      '      era.print(`屈服点数+${local11}`);\n      await era.waitAnyKey();\n      // 变异：屈服加算删\n    } else {\n      era.print(`${name}哭叫着，在电击的痛苦中漏出了小便。`);',
    tests: ['dungeon-after'],
    must_mention: '屈服点数 400',
  },
  {
    desc: 'M629 DISPLAY_DUNGEON_DAILY 怪物段随机消费删（rand(49)）',
    file: 'ere/page/page-dungeon-daily.js',
    find: '  rand(49);',
    replace: '  // 变异：怪物段随机消费删',
    tests: ['page-dungeon-daily'],
    must_mention: '三次随机消费',
  },
  {
    desc: 'M630 奴隶日常池的爱慕素质（TALENT:85）漏扫',
    file: 'ere/page/page-dungeon-daily.js',
    find: '      if (\n        (era.get(`talent:${cid}:76`) || 0) === 1 ||\n        (era.get(`talent:${cid}:85`) || 0) === 1\n      ) {',
    replace:
      '      if ((era.get(`talent:${cid}:76`) || 0) === 1) { // 变异：爱慕漏扫',
    tests: ['page-dungeon-daily'],
    must_mention: '占位头 + 计数 2',
  },
  {
    desc: 'M631 CAL_DUNGEON_DAILY 每日威望衰减删（-2）',
    file: 'ere/page/page-dungeon-daily.js',
    find: '  era_exflag.prestige -= 2;',
    replace: '  // 变异：威望衰减删',
    tests: ['page-dungeon-daily'],
    must_mention: '150 → 钳 100 → -2',
  },
  {
    desc: 'M632 CHARA_INIT 等级段的逐级 ST_UP 删（循环体空转）',
    file: 'ere/chara/chara-init.js',
    find: '    for (let i = 0; i < lv; i += 1) {\n      st_up(cid, rand_n);\n    }',
    replace:
      '    for (let i = 0; i < lv; i += 1) {\n      // 变异：逐级 ST_UP 删\n    }',
    tests: ['chara-init'],
    must_mention: '基础攻击 +5（5 级 × 1）',
  },
  // —— #177（H8）：迷宫房间与设施（M600-M619 + M633/M634）——
  {
    desc: 'M600 ROOM 分发·店遭遇的 RESULT 1 改坏（战斗照发生）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '    await dungeon_shop_itemsell(arg0, rand_n);\n    return 1;',
    replace:
      '    await dungeon_shop_itemsell(arg0, rand_n);\n    return 0; // 变异：RESULT 1 改 0',
    tests: ['dungeon-room'],
    must_mention: 'RESULT 1 = 戦闘が発生しないフラグ',
  },
  {
    desc: 'M601 ROOM 分发·店遭遇掷删（RAND:10 == 0 恒不中）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '  if (rand_n(10) === 0) {\n    await dungeon_shop_itemsell(arg0, rand_n);',
    replace:
      '  if (rand_n(10) === -1) {\n    await dungeon_shop_itemsell(arg0, rand_n);',
    tests: ['dungeon-room'],
    must_mention: 'RESULT 1 = 戦闘が発生しないフラグ',
  },
  {
    desc: 'M602 SWAMP 的伤害基数 +10 删（DMG 少 10 点）',
    file: 'ere/dungeon/dungeon-room.js',
    find: "  let dmg = (era.get('cflag:0:9') || 0) + 10;",
    replace: "  let dmg = era.get('cflag:0:9') || 0; // 变异：+10 删",
    tests: ['dungeon-room', 'dungeon-main'],
    must_mention: 'DMG = 0（魔王等级）+ 10',
  },
  {
    desc: 'M603 ICE 的攻击衰减改坏（×9/10 → ×10/10 不衰减）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '  const atk = era.get(`cflag:${a}:11`) || 0;\n  era.set(`cflag:${a}:11`, Math.floor((atk * 9) / 10));',
    replace:
      '  const atk = era.get(`cflag:${a}:11`) || 0;\n  era.set(`cflag:${a}:11`, Math.floor((atk * 10) / 10)); // 变异：不衰减',
    tests: ['dungeon-room'],
    must_mention: 'CFLAG:11 = floor(945/10)',
  },
  {
    desc: 'M604 HEAT 的防御衰减改坏（×9/10 → ×10/10 不衰减）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '  const def = era.get(`cflag:${a}:12`) || 0;\n  era.set(`cflag:${a}:12`, Math.floor((def * 9) / 10));',
    replace:
      '  const def = era.get(`cflag:${a}:12`) || 0;\n  era.set(`cflag:${a}:12`, Math.floor((def * 10) / 10)); // 变异：不衰减',
    tests: ['dungeon-room'],
    must_mention: 'CFLAG:12 = floor(945/10)',
  },
  {
    desc: 'M605 MASE 的 D:20 写删（ctx 不再回写 -BACK）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '  // :835 D:20 -= BACK（ctx 回写，文件头）\n  if (ctx) {\n    ctx.d20 -= back;\n  }',
    replace:
      '  // :835 D:20 -= BACK——变异：写删\n  // if (ctx) {\n  //   ctx.d20 -= back;\n  // }',
    tests: ['dungeon-room'],
    must_mention: 'MASE 的 -10 从房间段活到',
  },
  {
    desc: 'M606 MASE 的迷惑状態立位删（CFLAG:509 不写）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '  era.set(`cflag:${a}:509`, 1); // :844',
    replace: '  // era.set(`cflag:${a}:509`, 1); // 变异：立位删',
    tests: ['dungeon-room'],
    must_mention: '迷惑状態（:844）',
  },
  {
    desc: 'M607 MUSEUM 的陈列架位 5 立起删（CFLAG:503 不 +32）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '      era.set(`cflag:${a}:503`, (era.get(`cflag:${a}:503`) || 0) + 32); // :900',
    replace:
      '      // era.set(`cflag:${a}:503`, (era.get(`cflag:${a}:503`) || 0) + 32); // 变异：立位删',
    tests: ['dungeon-room'],
    must_mention: '位 5（32）立起',
  },
  {
    desc: 'M608 HOTEL 的入账删（MONEY += COST 不写）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '  era_flag.money += cost; // :1008\n  era_exflag.legit_money += cost; // :1009',
    replace:
      '  // era_flag.money += cost; // 变异：入账删\n  // era_exflag.legit_money += cost;',
    tests: ['dungeon-room'],
    must_mention: 'MONEY += COST（:1008）',
  },
  {
    desc: 'M609 SHOP 逛街档的体力 +20 删',
    file: 'ere/dungeon/dungeon-room.js',
    find: '  chara(a).dungeon.体力 += 20; // :257 BASE:A:0 += 20',
    replace: '  // chara(a).dungeon.体力 += 20; // 变异：+20 删',
    tests: ['dungeon-room'],
    must_mention: '体力 +20（:257）',
  },
  {
    desc: 'M610 SHOP_DAY 岌岌可危档的归零删（低收入仍入账）',
    file: 'ere/dungeon/dungeon-room.js',
    find: "    era.print('威望值是【岌岌可危】'); // :343 PRINTL\n    income = 0; // :344",
    replace:
      "    era.print('威望值是【岌岌可危】'); // :343 PRINTL\n    // income = 0; // 变异：归零删",
    tests: ['dungeon-room'],
    must_mention: '岌岌可危 → 税入 0',
  },
  {
    desc: 'M611 ROOM_DAY 的牧场臂删（502 不再走 FARM）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '    } else if (room === 502) {\n      await dungeon_farm(extra, rand_n); // :162\n    }',
    replace:
      '    } // 变异：牧场臂删\n    // } else if (room === 502) {\n    //   await dungeon_farm(extra, rand_n); // :162\n    // }',
    tests: ['dungeon-room'],
    must_mention: '税入 100 + 牧场 50',
  },
  {
    desc: 'M612 FARM 的只数写回删（ITEM:MON_ID 不写）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '  era.set(`item:${mon_id}`, mon_num); // :647',
    replace: '  // era.set(`item:${mon_id}`, mon_num); // 变异：写回删',
    tests: ['dungeon-room'],
    must_mention: 'ITEM:100 += 5',
  },
  {
    desc: 'M613 FARM 的 SIF 作用域事故被修好（原作缺陷不许修，#14）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '  era_flag.money += meat_count * 10; // :629\n  era_exflag.legit_money += meat_count * 10; // :630',
    replace:
      '  if (sell_baby) {\n    era_flag.money += meat_count * 10; // 变异：修好原作缺陷\n    era_exflag.legit_money += meat_count * 10;\n  }',
    tests: ['dungeon-room'],
    must_mention: 'FLAG:614 = 0 仍 +50（原作缺陷）',
  },
  {
    desc: 'M614 FARM_RESCUE 的 EXTRA 当角色号缺陷被修好（原作缺陷不许修，#14）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '  if ((era.get(`cflag:${arg0}:1`) || 0) !== 12) {\n    era_flag.meat_toilet_count -= 1;\n  }',
    replace: '  era_flag.meat_toilet_count -= 1; // 变异：修好原作缺陷（恒减）',
    tests: ['dungeon-room'],
    must_mention: 'EXTRA = 1 恰逢勇者在战役',
  },
  {
    desc: 'M615 ROOM_BUILD 的拡張位写入删（FLAG:ROOMID 不 +1）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '    era.set(`flag:${room_id + 10}`, extra + 1); // :111 FLAG:ROOMID += 1',
    replace:
      '    // era.set(`flag:${room_id + 10}`, extra + 1); // 变异：写入删',
    tests: ['dungeon-room'],
    must_mention: 'FLAG:360 += 1（:111）',
  },
  {
    desc: 'M616 ITEMSSELL 的否定の珠换钱删（JUEL/580 不动）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '    era.set(`juel:${a}:100`, (era.get(`juel:${a}:100`) || 0) - 500); // :291\n    chara(a).dungeon.所持金 += 500; // :292',
    replace:
      '    // era.set(`juel:${a}:100`, (era.get(`juel:${a}:100`) || 0) - 500); // 变异：换钱删\n    // chara(a).dungeon.所持金 += 500;',
    tests: ['dungeon-room'],
    must_mention: 'JUEL:100 -= 500',
  },
  {
    desc: 'M617 HEAT 绿洲臂的 TARGET 写删（JUEL:6 / 好感度不动）',
    file: 'ere/dungeon/dungeon-room.js',
    find: "    const target = era_flag.target;\n    era.set(\n      `juel:${target}:6`,\n      (era.get(`juel:${target}:6`) || 0) + (era.get('cflag:0:9') || 0) * 4,\n    );\n    chara(target).chara.好感度 += 20; // CFLAG:TARGET:2 += 20",
    replace:
      "    const target = era_flag.target;\n    // 变异：TARGET 写删\n    // era.set(\n    //   `juel:${target}:6`,\n    //   (era.get(`juel:${target}:6`) || 0) + (era.get('cflag:0:9') || 0) * 4,\n    // );\n    // chara(target).chara.好感度 += 20;",
    tests: ['dungeon-room'],
    must_mention: 'JUEL:TARGET:6 += 16',
  },
  {
    desc: 'M618 MUSEUM 的气力伤害删（BASE:A:1 不减 MDMG）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '  chara(a).dungeon.气力 -= mdmg; // :904',
    replace: '  // chara(a).dungeon.气力 -= mdmg; // 变异：伤害删',
    tests: ['dungeon-room'],
    must_mention: 'BASE:A:1 -= 50（:904）',
  },
  {
    desc: 'M619 event-nextday 的 ROOM_DAY 调用删（日结算不接线）',
    file: 'ere/event/event-nextday.js',
    find: '  await room_day_mod.dungeon_room_day();',
    replace: '  // await room_day_mod.dungeon_room_day(); // 变异：调用删',
    tests: ['dungeon-room'],
    must_mention: '日循环真的结了设施账',
  },
  {
    desc: 'M633 dungeon.js 的房间调用删（:386 不再进设施）',
    file: 'ere/dungeon/dungeon.js',
    find: '    const move_ctx = { d20: walk20 };\n    no_battle += await room_mod.dungeon_room(a, rand_n, move_ctx);\n    walk20 = move_ctx.d20;',
    replace:
      '    const move_ctx = { d20: walk20 };\n    // 变异：房间调用删\n    // no_battle += await room_mod.dungeon_room(a, rand_n, move_ctx);\n    // walk20 = move_ctx.d20;',
    tests: ['dungeon-main', 'dungeon-room'],
    must_mention: '房间设施真身（毒沼 10 点伤害恰一次）',
  },
  {
    desc: 'M634 滞留臂的階層滞在カウント +1 删（event-turnend 新观测锚点自证）',
    file: 'ere/dungeon/dungeon.js',
    find: '      // :358 階層滞在カウントを+1（CFLAG:514）\n      era.set(`cflag:${arg0}:514`, (era.get(`cflag:${arg0}:514`) || 0) + 1);',
    replace:
      '      // :358 階層滞在カウントを+1——变异：+1 删\n      // era.set(`cflag:${arg0}:514`, (era.get(`cflag:${arg0}:514`) || 0) + 1);',
    tests: ['event-turnend', 'enter-enemy'],
    must_mention: '状态 12 恰好一次 DUNGEON',
  },
  {
    desc: 'M640 还债利息整除改 floor（-1234/10 = -124，负债多计一成利息）',
    file: 'ere/dungeon/dungeon-town.js',
    find: '    const interest = Math.trunc(loan / 10); // 利率 = CFLAG:582 / 10（截断）',
    replace:
      '    const interest = Math.floor(loan / 10); // 变异：截断改 floor',
    tests: ['dungeon-town'],
    must_mention: '-1234 + trunc(-1234/10) = -1357',
  },
  {
    desc: 'M641 还款额的债务上限钳删（还超债务清成正值）',
    file: 'ere/dungeon/dungeon-town.js',
    find: '  local = Math.min(\n    local,\n    Math.abs(chara(arg).patch.借款),\n    Math.trunc(cash / 2),\n  );',
    replace:
      '  local = Math.min(local, Math.trunc(cash / 2)); // 变异：债务钳删',
    tests: ['dungeon-town'],
    must_mention: '借金の金額は越えないように',
  },
  {
    desc: 'M642 担保人背债方向反（债务递减而非递增）',
    file: 'ere/dungeon/dungeon-town.js',
    find: '  chara(arg).patch.借款 -= local; // :227 CFLAG:582 -= LOCAL（patch 门面）',
    replace: '  chara(arg).patch.借款 += local; // 变异：背债方向反',
    tests: ['dungeon-town'],
    must_mention: '担保人按魔王等级背债',
  },
  {
    desc: 'M643 借款判定反（< 50 改 >= 50：低善恶反而借不到）',
    file: 'ere/dungeon/dungeon-town.js',
    find: '  if (rand_n(260 + (era.get(`cflag:${arg}:151`) || 0)) < 50) {',
    replace:
      '  if (rand_n(260 + (era.get(`cflag:${arg}:151`) || 0)) >= 50) { // 变异',
    tests: ['dungeon-town'],
    must_mention: '（260 + 善恶）面骰 < 50 借入 1000',
  },
  {
    desc: 'M644 FI_FUNDING 补正改读 ARG（TARGET 语义改坏）',
    file: 'ere/dungeon/dungeon-town.js',
    find: '  let local = 0; // :162 VARSET LOCAL\n  // 故郷や家族からの補助金（以下全读 TARGET，文件头）\n  const t = era_flag.target;',
    replace:
      '  let local = 0; // :162 VARSET LOCAL\n  // 变异：TARGET 残留读改 ARG 读\n  const t = arg;',
    tests: ['dungeon-town'],
    must_mention: '按 TARGET（勇者）算，不按 ARG（贝丝）',
  },
  {
    desc: 'M645 宴会预算收集改读本人（收集/支付不对称的原作行为改坏）',
    file: 'ere/dungeon/dungeon-town.js',
    find: '    const cash = era.get(`cflag:${budget_target}:580`) || 0; // CFLAG:580（TARGET）',
    replace:
      '    const cash = era.get(`cflag:${pm[lcount]}:580`) || 0; // 变异：逐人读',
    tests: ['dungeon-town'],
    must_mention: '贝丝被记了同一份飲み代（不对称）',
  },
  {
    desc: 'M646 重度借债的 GOAL 赋值提出守卫（修好原作笔误——#14 反向钉子）',
    file: 'ere/dungeon/dungeon-town.js',
    find: "      if (show) {\n        era.print(\n          '因为欠债实在太多了，抱着一获千金的目的向着比之前更深的阶层前进。',\n        );\n        goal = floor_max + 1;\n        start_floor = floor_max + 1;\n      }",
    replace:
      "      if (show) {\n        era.print(\n          '因为欠债实在太多了，抱着一获千金的目的向着比之前更深的阶层前进。',\n        );\n      }\n      goal = floor_max + 1; // 变异：修好原作笔误（赋值提出守卫）\n      start_floor = floor_max + 1;",
    tests: ['dungeon-town'],
    must_mention: 'GOAL 0（闲逛）',
  },
  {
    desc: 'M647 城镇主流程散会概率反（9/10 散会改 1/10）',
    file: 'ere/dungeon/dungeon-town.js',
    find: '  if (rand_n(10) > 0) {',
    replace: '  if (rand_n(10) === 0) { // 变异',
    tests: ['dungeon-town'],
    must_mention: 'rand(10) > 0 散会不开宴',
  },
  {
    desc: 'M648 受注计数判定改 bit2（修好原作笔误——#14 反向钉子）',
    file: 'ere/dungeon/dungeon-quest.js',
    find: '    if (getbit(era.get(`cflag:${cid}:536`) || 0, 3) !== 0) {',
    replace:
      '    if (getbit(era.get(`cflag:${cid}:536`) || 0, 2) !== 0) { // 变异：改 bit2',
    tests: ['dungeon-quest'],
    must_mention: 'rand(10)+1 = 5（短计数）',
  },
  {
    desc: 'M649 受注计数递减删（任务永不超时）',
    file: 'ere/dungeon/dungeon-quest.js',
    find: '    if ((era.get(`cflag:${cid}:539`) || 0) > 0) {',
    replace: '    if (false) { // 变异：539 递减删',
    tests: ['dungeon-quest'],
    must_mention: '计数在掷点前递减',
  },
  {
    desc: 'M650 任务报酬资金公式改坏（等级×10+100 改 ×10）',
    file: 'ere/dungeon/dungeon-quest.js',
    find: '        const local = (era.get(`cflag:${cid}:9`) || 0) * 10 + 100;',
    replace:
      '        const local = (era.get(`cflag:${cid}:9`) || 0) * 10; // 变异',
    tests: ['dungeon-quest'],
    must_mention: 'LV5 × 10 + 100',
  },
  {
    desc: 'M651 RESULT_QUEST 的 E 列匹配删（无讨伐对象也结算）',
    file: 'ere/dungeon/dungeon-quest.js',
    find: '    if (found === 0) {\n      continue;\n    }\n\n    // :153 PRINTW *クエスト結果*',
    replace:
      '    if (false) { // 变异：E 列匹配删\n      continue;\n    }\n\n    // :153 PRINTW *クエスト結果*',
    tests: ['dungeon-quest'],
    must_mention: '534 原样（未结算）',
  },
  {
    desc: 'M652 性奉侍完结的 534 置位删（交涉成立也不完结任务）',
    file: 'ere/dungeon/dungeon-quest.js',
    find: "        era.print('*任务成功*'); // PRINTFORML\n        chara(cid).dungeon.已接任务 = setbit(chara(cid).dungeon.已接任务, 1);\n        return 1;",
    replace:
      "        era.print('*任务成功*'); // PRINTFORML\n        // 变异：SETBIT 534,1 删\n        return 1;",
    tests: ['dungeon-quest'],
    must_mention: '534 置成功完结位',
  },
  {
    desc: 'M653 QUEST_BITCH 失贞判定改读 ARG（TARGET 语义改坏）',
    file: 'ere/dungeon/dungeon-quest.js',
    find: '  const t = era_flag.target;\n  if (\n    (era.get(`exp:${t}:0`) || 0) > 0 &&',
    replace:
      '  const t = arg; // 变异：TARGET 读改 ARG 读\n  if (\n    (era.get(`exp:${t}:0`) || 0) > 0 &&',
    tests: ['dungeon-quest'],
    must_mention: '失贞：处女素质消去',
  },
  {
    desc: 'M6722 魔法伤害封顶的负等级差下限改坏（-99 改 -100）',
    file: 'ere/dungeon/magic.js',
    find: '    cap_bonus = -99;',
    replace: '    cap_bonus = -100; // 变异',
    tests: ['dungeon-magic'],
    must_mention: '等级差调整上限',
  },
  {
    desc: 'M6723 魔法伤害最低效果改坏（1 改 0）',
    file: 'ere/dungeon/magic.js',
    find: '  return damage <= 0 ? 1 : damage;',
    replace: '  return damage <= 0 ? 0 : damage; // 变异',
    tests: ['dungeon-magic'],
    must_mention: '非正伤害抬到 1',
  },
  {
    desc: 'M6724 角色对 Boss 的魔法减伤改坏（十分之一改五分之一）',
    file: 'ere/dungeon/magic.js',
    find: '  if (e_get(monster_head + 8) === 1) {\n    damage = idiv(damage, 10);',
    replace:
      '  if (e_get(monster_head + 8) === 1) {\n    damage = idiv(damage, 5); // 变异',
    tests: ['dungeon-magic'],
    must_mention: 'Boss',
  },
  {
    desc: 'M6725 怪物魔法减益的自然衰减删坏',
    file: 'ere/dungeon/magic.js',
    find: '    era.set(`cflag:${cid}:682`, debuff);\n  }\n  if (chara(cid).dungeon.凌辱畏怖记忆_怪物 === e_get(monster_head)) {',
    replace:
      '    // 变异：低段魔法减益不写回衰减\n  }\n  if (chara(cid).dungeon.凌辱畏怖记忆_怪物 === e_get(monster_head)) {',
    tests: ['dungeon-magic'],
    must_mention: '魔法减益',
  },
  {
    desc: 'M6726 角色对角色的目标魔法耐性删坏',
    file: 'ere/dungeon/magic.js',
    find: '    if (talent(defender, 257)) {',
    replace: '    if (false) { // 变异：目标耐性删',
    tests: ['dungeon-magic'],
    must_mention: '耐性',
  },
  {
    desc: 'M6727 普通魔法选择映射改坏（索引 4 不再选吸收）',
    file: 'ere/dungeon/magic.js',
    find: '  return [0, 3, 2, 1, 4, 5, 5][magic_lv];',
    replace: '  return [0, 3, 2, 1, 3, 5, 5][magic_lv]; // 变异',
    tests: ['dungeon-magic'],
    must_mention: 'MAGIC_SELECT',
  },
  {
    desc: 'M6728 魔力暴走的 HP 扣减方向改坏',
    file: 'ere/dungeon/magic.js',
    find: '    add_base(caster, 0, -hp_damage);',
    replace: '    add_base(caster, 0, hp_damage); // 变异',
    tests: ['dungeon-magic'],
    must_mention: '暴走伤害',
  },
  {
    desc: 'M6729 咒术选择映射改坏（索引 2 不再选诅咒）',
    file: 'ere/dungeon/magic.js',
    find: '  return [0, 3, 7, 1, 8, 9, 9][magic_lv];',
    replace: '  return [0, 3, 6, 1, 8, 9, 9][magic_lv]; // 变异',
    tests: ['dungeon-magic'],
    must_mention: 'SHAMAN_SELECT',
  },
  {
    desc: 'M6730 法术编号 3 的调度改坏（魔法箭改魔法吸收）',
    file: 'ere/dungeon/magic.js',
    find: '    3: () => energy_bolt_magic(target_type, a, b),',
    replace: '    3: () => energy_drain_magic(target_type, a, b), // 变异',
    tests: ['dungeon-magic'],
    must_mention: '调度怪物的魔法箭',
  },
  {
    desc: 'M6731 传送术不再写回侵攻度',
    file: 'ere/dungeon/magic.js',
    find: '    move_ctx.d20 = rand(100);\n    return 999;',
    replace: '    // 变异：D:20 写回删除\n    return 999;',
    tests: ['dungeon-magic'],
    must_mention: '写回侵攻度',
  },
  {
    desc: 'M6732 勇者对奴隶传送的原作 CFLAG:3 写入删坏',
    file: 'ere/dungeon/magic.js',
    find: '    chara(b).train.公开自慰经验 = rand(100); // CFLAG:3，原作第 431 行',
    replace: '    // 变异：CFLAG:3 写入删除',
    tests: ['dungeon-magic'],
    must_mention: 'CFLAG:3',
  },
  {
    desc: 'M6733 睡眠咒语的攻击力削减方向改坏',
    file: 'ere/dungeon/magic.js',
    find: '  const value = chara(defender).dungeon.攻击力 - rand(damage);',
    replace:
      '  const value = chara(defender).dungeon.攻击力 + rand(damage); // 变异',
    tests: ['dungeon-magic'],
    must_mention: '削攻击与防御',
  },
  {
    desc: 'M6734 诅咒术的防御力削减方向改坏',
    file: 'ere/dungeon/magic.js',
    find: '  const value = chara(defender).dungeon.防御力 - idiv(rand(damage), 2);',
    replace:
      '  const value = chara(defender).dungeon.防御力 + idiv(rand(damage), 2); // 变异',
    tests: ['dungeon-magic'],
    must_mention: '削攻击与防御',
  },
  {
    desc: 'M6735 对人格斗魔法箭的倍率改坏（五倍改四倍）',
    file: 'ere/dungeon/magic.js',
    find: '  await print_wait(`${name_of(caster)}咏唱了魔法箭！`);\n  add_base(caster, 1, -15);\n  damage = magic_bonus_c_to_c(caster, get_cflag(caster, 9) * 5, defender);',
    replace:
      '  await print_wait(`${name_of(caster)}咏唱了魔法箭！`);\n  add_base(caster, 1, -15);\n  damage = magic_bonus_c_to_c(caster, get_cflag(caster, 9) * 4, defender); // 变异',
    tests: ['dungeon-magic'],
    must_mention: '造成伤害并消灭怪物',
  },
  {
    desc: 'M6736 火球术的怪物数量扣减删坏',
    file: 'ere/dungeon/magic.js',
    find: '    damage = magic_damage_cap(get_cflag(a, 9), e_get(b + 1), damage, 800);\n    const killed = kill_monsters(a, b, damage);',
    replace:
      '    damage = magic_damage_cap(get_cflag(a, 9), e_get(b + 1), damage, 800);\n    const killed = 0; // 变异：不消灭怪物',
    tests: ['dungeon-magic'],
    must_mention: '消灭怪物',
  },
  {
    desc: 'M6737 魔法吸收的施法者体力回复删坏',
    file: 'ere/dungeon/magic.js',
    find: '  add_base(caster, 0, damage);\n  await print_wait(`魔法吸取了${damage}气力！`);\n  await print_wait(`恢复了HP${damage}点！`);',
    replace:
      '  // 变异：施法者体力回复删除\n  await print_wait(`魔法吸取了${damage}气力！`);\n  await print_wait(`恢复了HP${damage}点！`);',
    tests: ['dungeon-magic'],
    must_mention: '回复体力或气力',
  },
  {
    desc: 'M6738 精神吸收的施法者气力回复删坏',
    file: 'ere/dungeon/magic.js',
    find: '  add_base(defender, 1, -damage);\n  add_base(caster, 1, damage);\n  await print_wait(`精神吸收了${damage}点气力！`);',
    replace:
      '  add_base(defender, 1, -damage);\n  // 变异：施法者气力回复删除\n  await print_wait(`精神吸收了${damage}点气力！`);',
    tests: ['dungeon-magic'],
    must_mention: '回复体力或气力',
  },
  {
    desc: 'M6739 治疗术不再选择队列中最后一个重伤成员',
    file: 'ere/dungeon/magic.js',
    find: '        patient = cid;',
    replace: '        patient ||= cid; // 变异：固定第一个',
    tests: ['dungeon-magic'],
    must_mention: '最后一个重伤成员',
  },
  {
    desc: 'M6740 无参 SHIELD_MAGIC 被擅自赋予效果',
    file: 'ere/dungeon/magic.js',
    find: 'async function shield_magic() {\n  return 0;\n}',
    replace:
      'async function shield_magic() {\n  chara(1).dungeon.防御力 += 1; // 变异\n  return 0;\n}',
    tests: ['dungeon-magic'],
    must_mention: '无效果语义',
  },
  {
    desc: 'M6741 经验吸取的手动降级删坏',
    file: 'ere/dungeon/magic.js',
    find: '    view.chara.等级 -= 1;',
    replace: '    // 变异：等级递减删除',
    tests: ['dungeon-magic'],
    must_mention: '同步等级四维',
  },
  {
    desc: 'M6742 怪物经验吸取不给魔王分一半经验',
    file: 'ere/dungeon/magic.js',
    find: '    add_exp(0, idiv(damage, 2));',
    replace: '    // 变异：魔王经验加算删除',
    tests: ['dungeon-magic'],
    must_mention: '一半经验给魔王',
  },
  {
    desc: 'M6743 MAGIC 重新登记成 dungeon-battle 存根',
    file: 'ere/dungeon/dungeon-battle.js',
    find: "const STUBBED_CALLS = [\n  'MONSTER_SKILL',",
    replace:
      "const STUBBED_CALLS = [\n  'MAGIC', // 变异：真身倒退为存根登记\n  'MONSTER_SKILL',",
    tests: ['dungeon-magic'],
    must_mention: '不再登记为存根',
  },
  {
    desc: 'M6744 决斗的无参 MAGIC 被擅自传成 X:1 战斗类型',
    file: 'ere/dungeon/dungeon-battle2.js',
    find: '  if ((await battle.magic(0, magic_a, magic_b, rand, move_ctx)) === 999) {',
    replace:
      '  if ((await battle.magic(reverse_ab ? 3 : 4, magic_a, magic_b, rand, move_ctx)) === 999) { // 变异',
    tests: ['dungeon-magic'],
    must_mention: '无参 MAGIC 保留 TARGET_TYPE=0',
  },
  {
    desc: 'M6745 群体法术过量击杀按理论值播报（不钳现存怪物数）',
    file: 'ere/dungeon/magic.js',
    find: '    add_exp(a, e_get(b + 1) * killed);\n    return killed;',
    replace:
      '    add_exp(a, e_get(b + 1) * killed);\n    return kill_mons; // 变异',
    tests: ['dungeon-magic'],
    must_mention: '过量击杀按现存怪物数播报',
  },
  {
    desc: 'M6746 怪物火球漏掉等级差伤害上限',
    file: 'ere/dungeon/magic.js',
    find: '    damage = magic_bonus_m_to_c(a, (e_get(b + 1) + get_cflag(0, 9)) * 10, b);\n    damage = magic_damage_cap(e_get(b + 1), get_cflag(a, 9), damage, 800);',
    replace:
      '    damage = magic_bonus_m_to_c(a, (e_get(b + 1) + get_cflag(0, 9)) * 10, b);\n    // 变异：等级差伤害上限删除',
    tests: ['dungeon-magic'],
    must_mention: '怪物火球同样受等级差伤害上限约束',
  },
  {
    desc: 'M6747 魔法箭把未知 TARGET_TYPE 当成角色对角色分支',
    file: 'ere/dungeon/magic.js',
    find: '  if (target_type !== 3 && target_type !== 4) {\n    return 0;\n  }\n  const caster = target_type === 3 ? b : a;\n  const defender = target_type === 3 ? a : b;\n  await print_wait(`${name_of(caster)}咏唱了魔法箭！`);',
    replace:
      '  if (false) { // 变异：未知类型落进角色法术\n    return 0;\n  }\n  const caster = target_type === 3 ? b : a;\n  const defender = target_type === 3 ? a : b;\n  await print_wait(`${name_of(caster)}咏唱了魔法箭！`);',
    tests: ['dungeon-magic'],
    must_mention: '未命中任何法术分支',
  },
  {
    desc: 'M6748 治疗术把未知 TARGET_TYPE 当成角色 3 分支',
    file: 'ere/dungeon/magic.js',
    find: '  if (target_type !== 3) {\n    return 0;\n  }\n  // 原作第 895 行的条件方向如此：低于六成反而直接返回。',
    replace:
      '  if (false) { // 变异：未知类型落进治疗\n    return 0;\n  }\n  // 原作第 895 行的条件方向如此：低于六成反而直接返回。',
    tests: ['dungeon-magic'],
    must_mention: '未命中任何法术分支',
  },
  {
    desc: 'M6749 怪物对角色的高段魔法减益阈值分支删坏',
    file: 'ere/dungeon/magic.js',
    find: '  let debuff = get_cflag(cid, 682);\n  if (debuff > 50) {\n    damage += idiv(damage, 2);',
    replace:
      '  let debuff = get_cflag(cid, 682);\n  if (false) { // 变异：高段减益分支删除\n    damage += idiv(damage, 2);',
    tests: ['dungeon-magic'],
    must_mention: '魔法减益',
  },
  {
    desc: 'M6750 怪物目标误入 SHAMAN_SELECT 的角色随机分派',
    file: 'ere/dungeon/magic.js',
    find: '  if (target_type === 2) {\n    return 0;\n  }\n  let magic_lv = 0;',
    replace:
      '  if (false) { // 变异：怪物目标守卫删除\n    return 0;\n  }\n  let magic_lv = 0;',
    tests: ['dungeon-magic'],
    must_mention: 'SHAMAN_SELECT',
  },
  {
    desc: 'M6751 SLEEP_MAGIC 角色对怪物分支的返回值改坏',
    file: 'ere/dungeon/magic.js',
    find: "      await print_wait('咒语的效果消失了'); // 原作 Y 默认 0，文件头\n    }\n    return 0;\n  }\n  if (target_type === 2) {",
    replace:
      "      await print_wait('咒语的效果消失了'); // 原作 Y 默认 0，文件头\n    }\n    return 1; // 变异\n  }\n  if (target_type === 2) {",
    tests: ['dungeon-magic'],
    must_mention: 'SLEEP_MAGIC',
  },
  {
    desc: 'M6752 ENERGY_DRAIN_MAGIC 把未知目标当角色对角色分支',
    file: 'ere/dungeon/magic.js',
    find: '  if (target_type !== 3 && target_type !== 4) {\n    return 0;\n  }\n  const caster = target_type === 3 ? b : a;\n  const defender = target_type === 3 ? a : b;\n  await print_wait(`${name_of(caster)}咏唱了魔法吸取！`);',
    replace:
      '  if (false) { // 变异：目标守卫删除\n    return 0;\n  }\n  const caster = target_type === 3 ? b : a;\n  const defender = target_type === 3 ? a : b;\n  await print_wait(`${name_of(caster)}咏唱了魔法吸取！`);',
    tests: ['dungeon-magic'],
    must_mention: '未命中任何法术分支',
  },
  {
    desc: 'M6753 怪物传送不再给勇者写迷惑状态',
    file: 'ere/dungeon/magic.js',
    find: '    era.set(`cflag:${a}:509`, 1); // CFLAG:509 = 迷惑状态（dungeon 域）',
    replace: '    // 变异：迷惑状态写入删除',
    tests: ['dungeon-magic'],
    must_mention: '怪物传送写迷惑',
  },
  {
    desc: 'M6754 怪物睡眠术打到怪物列号而非勇者',
    file: 'ere/dungeon/magic.js',
    find: '    const value = chara(a).dungeon.攻击力 - rand(damage);',
    replace:
      '    const value = chara(b).dungeon.攻击力 - rand(damage); // 变异',
    tests: ['dungeon-magic'],
    must_mention: '睡眠按目标类型命中',
  },
  {
    desc: 'M6755 怪物魔法箭不再扣勇者体力',
    file: 'ere/dungeon/magic.js',
    find: '    add_base(a, 0, -damage);\n    await print_wait(`魔法箭造成了${damage}伤害！`);',
    replace:
      '    add_base(b, 0, -damage); // 变异：打到怪物列号\n    await print_wait(`魔法箭造成了${damage}伤害！`);',
    tests: ['dungeon-magic'],
    must_mention: '魔法箭按目标类型命中',
  },
  {
    desc: 'M6756 角色对怪物的魔法吸收不回复施法者体力',
    file: 'ere/dungeon/magic.js',
    find: '    add_base(a, 0, damage);\n    await print_wait(`恢复了HP${damage}点！`);',
    replace:
      '    // 变异：施法者体力回复删除\n    await print_wait(`恢复了HP${damage}点！`);',
    tests: ['dungeon-magic'],
    must_mention: '按目标回复施法者体力',
  },
  {
    desc: 'M6757 奴隶火球误伤施法者而非勇者',
    file: 'ere/dungeon/magic.js',
    find: '  const caster = target_type === 3 ? b : a;\n  const defender = target_type === 3 ? a : b;\n  await print_wait(`${name_of(caster)}咏唱了火球术！`);',
    replace:
      '  const caster = target_type === 3 ? b : a;\n  const defender = b; // 变异：type 3 也打 B\n  await print_wait(`${name_of(caster)}咏唱了火球术！`);',
    tests: ['dungeon-magic'],
    must_mention: '按目标类型伤害角色或怪物群',
  },
  {
    desc: 'M6758 怪物治疗漏掉固定增加的一点',
    file: 'ere/dungeon/magic.js',
    find: '    e_set(b + 3, e_get(b + 3) + 1 + idiv(damage, 60));',
    replace: '    e_set(b + 3, e_get(b + 3) + idiv(damage, 60)); // 变异',
    tests: ['dungeon-magic'],
    must_mention: '治疗 2',
  },
  {
    desc: 'M6759 角色诅咒不再削怪物防御槽',
    file: 'ere/dungeon/magic.js',
    find: '    e_set(b + 3, value);',
    replace: '    // 变异：怪物防御槽写回删除',
    tests: ['dungeon-magic'],
    must_mention: '诅咒 1',
  },
  {
    desc: 'M6760 对人格斗的精神吸收不回复施法者气力',
    file: 'ere/dungeon/magic.js',
    find: '  add_base(caster, 1, damage);',
    replace: '  // 变异：施法者气力回复删除',
    tests: ['dungeon-magic'],
    must_mention: '按目标削气力并回复施法者气力',
  },
  {
    desc: 'M6761 对人格斗的经验吸取把经验给受术者',
    file: 'ere/dungeon/magic.js',
    find: '  add_exp(caster, idiv(damage, 2));',
    replace: '  add_exp(defender, idiv(damage, 2)); // 变异',
    tests: ['dungeon-magic'],
    must_mention: '按目标削经验与体力并给施法者经验',
  },
  {
    desc: 'M6682 ENTER_LOVER 自由输入改回按钮限制（隐藏 200 不可达）',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    selected = await era.input({ useRule: false });',
    replace:
      '    selected = await era.input(); // 变异：隐藏 200 被按钮白名单拒收',
    tests: ['dungeon-lovers'],
    must_mention: '自由输入保留隐藏的角色恋人编号 200',
  },
  {
    desc: 'M6683 ENTER_LOVER 重置爱情的类型比较取反',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '  if (selected !== previous) {',
    replace: '  if (selected === previous) { // 变异：换人反而不重置',
    tests: ['dungeon-lovers'],
    must_mention: '换类型写恋人并重置爱情',
  },
  {
    desc: 'M6684 已婚三十日阈值改成三百日',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    if (love_lv < 30) return 1;',
    replace: '    if (love_lv < 300) return 1; // 变异：三十日档不可达',
    tests: ['dungeon-lovers'],
    must_mention: '结婚阶段不降低善恶并等待按键',
  },
  {
    desc: 'M6685 贞操封印删除 V 到 A 的转移',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    love_exp[5] += love_exp[4];\n    love_exp[4] = 0;',
    replace: '    love_exp[4] = 0; // 变异：V 直接丢弃，不转成 A',
    tests: ['dungeon-lovers'],
    must_mention: '贞操封印把 V 全转 A',
  },
  {
    desc: 'M6686 前戏珠把遗留 LOCAL 误修成前戏数',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    era.add(`juel:${cid}:0`, 250); // :1526 LOCAL 是首个 FOR 结束值 50（原作缺陷）',
    replace:
      '    era.add(`juel:${cid}:0`, love_exp[9] * 5); // 变异：误修原作缺陷',
    tests: ['dungeon-lovers'],
    must_mention: '固定保留 LOCAL×5 缺陷',
  },
  {
    desc: 'M6687 接吻初吻对象误记成口交编号 101',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    view.train.初吻对象 = 1; // CFLAG:16（跨域写，属主 train）',
    replace: '    view.train.初吻对象 = 101; // 变异：接吻对象编号错误',
    tests: ['dungeon-lovers'],
    must_mention: '普通恋人按阶段演出、结算并降低善恶',
  },
  {
    desc: 'M6688 处女丧失不再清除处女素质',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    view.chara.处女 = 0; // TALENT:0（跨域写，属主 chara）',
    replace: '    // 变异：TALENT:0 不清除',
    tests: ['dungeon-lovers'],
    must_mention: '普通恋人按阶段演出、结算并降低善恶',
  },
  {
    desc: 'M6689 成人恋人的妊娠相手从客人改成犬',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '      race = 4;\n      view.dungeon.客膣内射精 = love_exp[4]; // CFLAG:105',
    replace:
      '      race = 5; // 变异：成人男性误作犬\n      view.dungeon.客膣内射精 = love_exp[4]; // CFLAG:105',
    tests: ['dungeon-lovers'],
    must_mention: '两次 V 行为写客人射精槽并调用妊娠检查',
  },
  {
    desc: 'M6690 未婚恋人事件删除善恶值下降',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    karma(cid, -1);',
    replace: '    // karma(cid, -1); // 变异：善恶值不下降',
    tests: ['dungeon-lovers'],
    must_mention: '普通恋人按阶段演出、结算并降低善恶',
  },
  {
    desc: 'M6691 恋人爱情每次错误增加两点',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '  chara(cid).dungeon.恋人爱情 += 1; // CFLAG:607',
    replace: '  chara(cid).dungeon.恋人爱情 += 2; // 变异',
    tests: ['dungeon-lovers'],
    must_mention: '未知正数沿用 ERROR 并继续结算',
  },
  {
    desc: 'M6692 角色恋爱系统开关从 FLAG:8 bit2 改成 bit3',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: "  if (((era.get('flag:8') || 0) & 4) === 0) return 0; // FLAG:8 bit2 = 角色间恋爱",
    replace:
      "  if (((era.get('flag:8') || 0) & 8) === 0) return 0; // 变异：读错 bit",
    tests: ['dungeon-lovers'],
    must_mention: '条件满足时双向记录恋人',
  },
  {
    desc: 'M6693 候选的恋人 ID 错写成候选自己的识别号',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '  target.dungeon.恋人ID = chara_id_output(cid); // CFLAG:LOCAL:610',
    replace:
      '  target.dungeon.恋人ID = chara_id_output(candidate); // 变异：方向错误',
    tests: ['dungeon-lovers'],
    must_mention: '条件满足时双向记录恋人',
  },
  {
    desc: 'M6694 撮合成功只给候选写恋人标志',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '  target.dungeon.恋人 = 200;\n  source.dungeon.恋人 = 200;',
    replace:
      '  target.dungeon.恋人 = 200;\n  // 变异：source 的 CFLAG:606 不写',
    tests: ['dungeon-lovers'],
    must_mention: '条件满足时双向记录恋人',
  },
  {
    desc: 'M6695 未知恋人类型错误提前返回',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: "  if (!profile) return 'ERROR';",
    replace: '  if (!profile) return null; // 变异：原作继续结算改成早退',
    tests: ['dungeon-lovers'],
    must_mention: '未知正数沿用 ERROR 并继续结算',
  },
  {
    desc: 'M6696 城镇日常删除恋人真身调用',
    file: 'ere/dungeon/dungeon-town.js',
    find: '    await lovers_mod.dungeon_town_lover(pm[lcount]); // :697 CALL DUNGEON_TOWN_LOVER',
    replace: '    // 变异：DUNGEON_TOWN_LOVER 调用删除',
    tests: ['dungeon-town'],
    must_mention: '日常段换手 TARGET 并调用恋人真身',
  },
  {
    desc: 'M6697 角色撮合删除侵攻队伍一致性限制',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '  if (\n    source.invasion.状态 === 2 &&\n    (era.get(`cflag:${cid}:533`) || 0) !==\n      (era.get(`cflag:${candidate}:533`) || 0) // CFLAG:533 = 队伍编号\n  ) {',
    replace: '  if (false) { // 变异：侵攻中不同队伍也能撮合',
    tests: ['dungeon-lovers'],
    must_mention: '侵攻中必须处于同一队伍',
  },
  {
    desc: 'M6698 LOVE_EXP 接吻十日档累计删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '  if (love_lv >= 10) love_exp[0] += 1;',
    replace: '  if (love_lv >= 10) love_exp[0] += 0; // 变异',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：0 接吻累计',
  },
  {
    desc: 'M6699 LOVE_EXP 口交四项能力加成删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    love_exp[3] += abl(12) + abl(13) + abl(16) + abl(32);',
    replace: '    love_exp[3] += 0; // 变异：四项能力加成删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：3 口交加成',
  },
  {
    desc: 'M6700 LOVE_EXP 口交舌使加成删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    if (talent(52)) love_exp[3] += 1;',
    replace: '    if (false) love_exp[3] += 1; // 变异：舌使加成删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：3 口交加成',
  },
  {
    desc: 'M6701 LOVE_EXP 污臭敏感与精液中毒复合加成删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    if (talent(62) && abl(32) > 0) love_exp[3] += abl(32) * 3;',
    replace: '    if (false) love_exp[3] += abl(32) * 3; // 变异',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：3 口交加成',
  },
  {
    desc: 'M6702 LOVE_EXP 私处感觉能力加成删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    love_exp[4] += abl(2);',
    replace: '    love_exp[4] += 0; // 变异：私处感觉加成删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：4 私处性交加成',
  },
  {
    desc: 'M6703 LOVE_EXP 淫壶私处加成删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    if (talent(232)) love_exp[4] += 1;',
    replace: '    if (false) love_exp[4] += 1; // 变异：淫壶加成删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：4 私处性交加成',
  },
  {
    desc: 'M6704 LOVE_EXP 肛门感觉能力加成删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    love_exp[5] += abl(3);',
    replace: '    love_exp[5] += 0; // 变异：肛门感觉加成删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：5 肛门性交加成',
  },
  {
    desc: 'M6705 LOVE_EXP 淫肛加成删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    if (talent(233)) love_exp[5] += 1;',
    replace: '    if (false) love_exp[5] += 1; // 变异：淫肛加成删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：5 肛门性交加成',
  },
  {
    desc: 'M6706 LOVE_EXP 百合两项能力加成删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    love_exp[6] += abl(22) + abl(33);',
    replace: '    love_exp[6] += 0; // 变异：百合能力加成删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：6 百合加成',
  },
  {
    desc: 'M6707 LOVE_EXP 厌男百合加成删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    if (talent(82)) love_exp[6] += 1;',
    replace: '    if (false) love_exp[6] += 1; // 变异：厌男加成删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：6 百合加成',
  },
  {
    desc: 'M6708 LOVE_EXP 人狼兽奸加成删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: "    if (talent('种族') === 2) love_exp[7] += 1;",
    replace: '    if (false) love_exp[7] += 1; // 变异：人狼加成删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：7 兽奸加成及口交回填',
  },
  {
    desc: 'M6709 LOVE_EXP 兽奸中毒能力加成删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    love_exp[7] += abl(39);',
    replace: '    love_exp[7] += 0; // 变异：兽奸中毒加成删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：7 兽奸加成及口交回填',
  },
  {
    desc: 'M6710 LOVE_EXP 兽奸对口交的回填删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    if (love_exp[3] > 0) love_exp[3] += love_exp[7];',
    replace: '    if (love_exp[3] > 0) love_exp[3] += 0; // 变异',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：7 兽奸加成及口交回填',
  },
  {
    desc: 'M6711 LOVE_EXP 胆怯拍摄减分删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '  if (talent(10)) love_exp[8] -= 1;',
    replace: '  if (false) love_exp[8] -= 1; // 变异：胆怯减分删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：8 拍摄倾向',
  },
  {
    desc: 'M6712 LOVE_EXP 露出狂拍摄加成删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '  if (talent(89)) love_exp[8] += 3;',
    replace: '  if (false) love_exp[8] += 3; // 变异：露出狂加成删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：8 拍摄倾向',
  },
  {
    desc: 'M6713 LOVE_EXP 露出癖能力加成删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '  love_exp[8] += abl(17);',
    replace: '  love_exp[8] += 0; // 变异：露出癖加成删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：8 拍摄倾向',
  },
  {
    desc: 'M6714 LOVE_EXP 前戏基础三维合计删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '  love_exp[9] += love_exp[5] + love_exp[4] + love_exp[6];',
    replace: '  love_exp[9] += 0; // 变异：A、V、百合不再计入前戏',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：9 前戏加成',
  },
  {
    desc: 'M6715 LOVE_EXP 淫核前戏加成误读成淫乳',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    if (talent(230)) love_exp[9] += 1;',
    replace: '    if (talent(231)) love_exp[9] += 1; // 变异：读错素质',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：9 淫核独立加成',
  },
  {
    desc: 'M6716 LOVE_EXP 吸烟次数结算删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '  if (love_exp[1] > 0) summary.push(`吸烟：${love_exp[1]}根 `);',
    replace: '  if (false) summary.push(`吸烟：${love_exp[1]}根 `); // 变异',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：1 吸烟次数',
  },
  {
    desc: 'M6717 LOVE_EXP 暗黑精灵的药物经验删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '            [1, 2],\n            [2, 1],',
    replace: '            [1, 2],\n            [2, 0], // 变异：药物经验删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：2 药物经验',
  },
  {
    desc: 'M6718 LOVE_EXP 男性错误取得百合加成',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '  if (love_exp[6] > 0 && talent(122) === 0) {',
    replace: '  if (love_exp[6] > 0) { // 变异：删除非男性限制',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：6 男性不吃百合加成',
  },
  {
    desc: 'M6719 LOVE_EXP 兽奸对私处性交的回填删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    if (love_exp[4] > 0) love_exp[4] += love_exp[7];',
    replace: '    if (love_exp[4] > 0) love_exp[4] += 0; // 变异',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：7 兽奸加成及口交回填',
  },
  {
    desc: 'M6720 LOVE_EXP 前戏两项感觉能力加成删除',
    file: 'ere/dungeon/dungeon-lovers.js',
    find: '    love_exp[9] += abl(0) + abl(1);',
    replace: '    love_exp[9] += 0; // 变异：感觉能力加成删除',
    tests: ['dungeon-lovers'],
    must_mention: 'LOVE_EXP 维度表：9 前戏加成',
  },
  {
    desc: 'M6842 MONSTER_SETUP 错误放行 99 号物品',
    file: 'ere/dungeon/monster-data.js',
    find: '  if (id === 999 || id < 100 || id > 199) return 999;',
    replace: '  if (id === 999 || id < 99 || id > 199) return 999;',
    tests: ['monster-play'],
    must_mention: 'MONSTER_SETUP 拒绝非法编号',
  },
  {
    desc: 'M6843 MONSTER_SETUP 楼层设施槽偏移一位',
    file: 'ere/dungeon/monster-data.js',
    find: 'era.get(`flag:${floor + 349}`)',
    replace: 'era.get(`flag:${floor + 350}`)',
    tests: ['monster-play'],
    must_mention: 'MONSTER_SETUP 购买改造时',
  },
  {
    desc: 'M6844 土地适应错误放行骷髅',
    file: 'ere/dungeon/monster-data.js',
    find: '  if (selection === 2 && id < 190) return 1;',
    replace: '  if (selection === 2 && id <= 190) return 1;',
    tests: ['monster-play'],
    must_mention: 'MONSTER_SETUP_ABLE 按种族',
  },
  {
    desc: 'M6845 酸性化不再放行史莱姆',
    file: 'ere/dungeon/monster-data.js',
    find: '  if ((type === 2 || type === 5) && selection === 3) return 1;',
    replace: '  if ((type === 3 || type === 5) && selection === 3) return 1;',
    tests: ['monster-play'],
    must_mention: 'MONSTER_SETUP_ABLE 按种族',
  },
  {
    desc: 'M6846 装甲化判据反转为仅史莱姆',
    file: 'ere/dungeon/monster-data.js',
    find: '  if (type !== 2 && selection === 5) return 1;',
    replace: '  if (type === 2 && selection === 5) return 1;',
    tests: ['monster-play'],
    must_mention: 'MONSTER_SETUP_ABLE 按种族',
  },
  {
    desc: 'M6847 亚人被排除出兵种选择',
    file: 'ere/dungeon/monster-data.js',
    find: '  const humanoid = [1, 6, 7, 8, 9].includes(type);',
    replace: '  const humanoid = [6, 7, 8, 9].includes(type);',
    tests: ['monster-play'],
    must_mention: 'MONSTER_SETUP_ABLE 按种族',
  },
  {
    desc: 'M6848 会睡眠术仍可转催眠师',
    file: 'ere/dungeon/monster-data.js',
    find: '    if (selection === 53 && magic !== 2) return 1;',
    replace: '    if (selection === 53) return 1;',
    tests: ['monster-play'],
    must_mention: 'MONSTER_SETUP_ABLE 按种族',
  },
  {
    desc: 'M6849 会能量箭仍可转魔导兵',
    file: 'ere/dungeon/monster-data.js',
    find: '    if (selection === 52 && magic !== 3) return 1;',
    replace: '    if (selection === 52) return 1;',
    tests: ['monster-play'],
    must_mention: 'MONSTER_SETUP_ABLE 按种族',
  },
  {
    desc: 'M6850 非人形猛毒菜单号错位',
    file: 'ere/dungeon/monster-data.js',
    find: '  } else if (selection === 4) {',
    replace: '  } else if (selection === 6) {',
    tests: ['monster-play'],
    must_mention: 'MONSTER_SETUP_ABLE 按种族',
  },
  {
    desc: 'M6851 怪物改造所持金少扣 100',
    file: 'ere/dungeon/monster-data.js',
    find: '    era_flag.money -= 1000;',
    replace: '    era_flag.money -= 900;',
    tests: ['monster-play'],
    must_mention: 'MONSTER_SETUP 购买改造时',
  },
  {
    desc: 'M6852 怪物改造非作弊资金少扣 100',
    file: 'ere/dungeon/monster-data.js',
    find: '    era_exflag.legit_money -= 1000;',
    replace: '    era_exflag.legit_money -= 900;',
    tests: ['monster-play'],
    must_mention: 'MONSTER_SETUP 购买改造时',
  },
  {
    desc: 'M6853 基础改造错误清除兵种百位',
    file: 'ere/dungeon/monster-data.js',
    find: '      next_extra = Math.trunc(extra / 100) * 100 + selection;',
    replace: '      next_extra = Math.trunc(extra / 1000) * 1000 + selection;',
    tests: ['monster-play'],
    must_mention: 'MONSTER_SETUP 购买改造时',
  },
  {
    desc: 'M6854 兵种改造错误清除万位遗留值',
    file: 'ere/dungeon/monster-data.js',
    find: '        Math.trunc(extra / 10000) * 10000 +',
    replace: '        Math.trunc(extra / 100000) * 100000 +',
    tests: ['monster-play'],
    must_mention: 'MONSTER_SETUP 拒绝非法编号',
  },
  {
    desc: 'M6855 怪物列表起点错过 100',
    file: 'ere/dungeon/monster-play.js',
    find: '  for (let id = 100; id < 200; id += 1) {',
    replace: '  for (let id = 101; id < 200; id += 1) {',
    tests: ['monster-play'],
    must_mention: 'MONSTERPLAY_LIST 只列出持有',
  },
  {
    desc: 'M6856 怪物列表终点错过 199',
    file: 'ere/dungeon/monster-play.js',
    find: '  for (let id = 100; id < 200; id += 1) {',
    replace: '  for (let id = 100; id < 199; id += 1) {',
    tests: ['monster-play'],
    must_mention: 'MONSTERPLAY_LIST 只列出持有',
  },
  {
    desc: 'M6857 怪物列表错误隐藏库存恰为一',
    file: 'ere/dungeon/monster-play.js',
    find: '    if (item_count(id) >= 1) {',
    replace: '    if (item_count(id) > 1) {',
    tests: ['monster-play'],
    must_mention: 'MONSTERPLAY_LIST 只列出持有',
  },
  {
    desc: 'M6858 怪物列表四项才换行',
    file: 'ere/dungeon/monster-play.js',
    find: '      if (row.length === 3) {',
    replace: '      if (row.length === 4) {',
    tests: ['monster-play'],
    must_mention: 'MONSTERPLAY_LIST 只列出持有',
  },
  {
    desc: 'M6859 怪物列表显示下一号名字',
    file: 'ere/dungeon/monster-play.js',
    find: '        content: item_name(id),',
    replace: '        content: item_name(id + 1),',
    tests: ['monster-play'],
    must_mention: 'MONSTERPLAY_LIST 只列出持有',
  },
  {
    desc: 'M6860 野狗私处经验写到肛门经验',
    file: 'ere/dungeon/monster-play.js',
    find: '  era.add(`exp:${cid}:0`, y); // EXP:A:0 = 私处经验\n  await print_wait(`兽奸经验+${y}`);\n  era.add(`exp:${cid}:56`, y); // EXP:A:56 = 兽奸经验\n  era.add(`cflag:${cid}:106`, y);',
    replace:
      '  era.add(`exp:${cid}:1`, y); // 变异：写错经验\n  await print_wait(`兽奸经验+${y}`);\n  era.add(`exp:${cid}:56`, y); // EXP:A:56 = 兽奸经验\n  era.add(`cflag:${cid}:106`, y);',
    tests: ['monster-play'],
    must_mention: '野狗、魔兽与马分支',
  },
  {
    desc: 'M6861 野狗兽奸经验写到触手经验',
    file: 'ere/dungeon/monster-play.js',
    find: '  era.add(`exp:${cid}:56`, y); // EXP:A:56 = 兽奸经验\n  era.add(`cflag:${cid}:106`, y);',
    replace:
      '  era.add(`exp:${cid}:55`, y); // 变异：写错经验\n  era.add(`cflag:${cid}:106`, y);',
    tests: ['monster-play'],
    must_mention: '野狗、魔兽与马分支',
  },
  {
    desc: 'M6862 野狗受精计数错写怪物计数',
    file: 'ere/dungeon/monster-play.js',
    find: '  era.add(`cflag:${cid}:106`, y); // CFLAG:A:106 = 野狗受精计数',
    replace: '  era.add(`cflag:${cid}:107`, y); // 变异：写错计数',
    tests: ['monster-play'],
    must_mention: '野狗、魔兽与马分支',
  },
  {
    desc: 'M6863 魔兽受精计数错写野狗计数',
    file: 'ere/dungeon/monster-play.js',
    find: '  era.add(`cflag:${cid}:107`, y); // CFLAG:A:107 = 阴道内射精计数\n  return 0;\n}\n\n/** @HORSE_MONSTER_PLAY',
    replace:
      '  era.add(`cflag:${cid}:106`, y); // 变异：写错计数\n  return 0;\n}\n\n/** @HORSE_MONSTER_PLAY',
    tests: ['monster-play'],
    must_mention: '野狗、魔兽与马分支',
  },
  {
    desc: 'M6864 马的恐怖点数写错槽',
    file: 'ere/dungeon/monster-play.js',
    find: '  era.add(`juel:${cid}:10`, y * 10); // JUEL:A:10 = 恐怖点数\n  era.add(`cflag:${cid}:107`, y);',
    replace:
      '  era.add(`juel:${cid}:8`, y * 10); // 变异：写错点数\n  era.add(`cflag:${cid}:107`, y);',
    tests: ['monster-play'],
    must_mention: '野狗、魔兽与马分支',
  },
  {
    desc: 'M6865 兽人两种结算分支反转',
    file: 'ere/dungeon/monster-play.js',
    find: '  await print_wait(greetings[rand(5)]);\n  if (rand(2) === 0) {',
    replace: '  await print_wait(greetings[rand(5)]);\n  if (rand(2) !== 0) {',
    tests: ['monster-play'],
    must_mention: '兽人分支按第二骰',
  },
  {
    desc: 'M6866 兽人口交经验写错槽',
    file: 'ere/dungeon/monster-play.js',
    find: "    era.add(`exp:${cid}:22`, y); // EXP:A:22 = 口交经验\n    era.add(`exp:${cid}:20`, y); // EXP:A:20 = 精液经验\n  } else {\n    await print_wait('『大家，一起向魔王大人齐射…！』');",
    replace:
      "    era.add(`exp:${cid}:21`, y); // 变异：写错经验\n    era.add(`exp:${cid}:20`, y); // EXP:A:20 = 精液经验\n  } else {\n    await print_wait('『大家，一起向魔王大人齐射…！』');",
    tests: ['monster-play'],
    must_mention: '兽人分支按第二骰',
  },
  {
    desc: 'M6867 史莱姆肛门经验写到私处',
    file: 'ere/dungeon/monster-play.js',
    find: '    era.add(`exp:${cid}:1`, y); // EXP:A:1 = 肛门经验\n  }\n  await era.waitAnyKey();\n  return 0;\n}\n\n/** @INSECT_MONSTER_PLAY',
    replace:
      '    era.add(`exp:${cid}:0`, y); // 变异：写错经验\n  }\n  await era.waitAnyKey();\n  return 0;\n}\n\n/** @INSECT_MONSTER_PLAY',
    tests: ['monster-play'],
    must_mention: '史莱姆、昆虫、藤蔓与触手',
  },
  {
    desc: 'M6868 昆虫产卵经验写到私处',
    file: 'ere/dungeon/monster-play.js',
    find: '    era.add(`exp:${cid}:1`, y); // EXP:A:1 = 肛门经验\n  }\n  await era.waitAnyKey();\n  return 0;\n}\n\n/** @IVY_MONSTER_PLAY',
    replace:
      '    era.add(`exp:${cid}:0`, y); // 变异：写错经验\n  }\n  await era.waitAnyKey();\n  return 0;\n}\n\n/** @IVY_MONSTER_PLAY',
    tests: ['monster-play'],
    must_mention: '史莱姆、昆虫、藤蔓与触手',
  },
  {
    desc: 'M6869 藤蔓恐怖点数写错槽',
    file: 'ere/dungeon/monster-play.js',
    find: '  era.add(`juel:${cid}:10`, y * 10); // JUEL:A:10 = 恐怖点数\n  await era.waitAnyKey();',
    replace:
      '  era.add(`juel:${cid}:8`, y * 10); // 变异：写错点数\n  await era.waitAnyKey();',
    tests: ['monster-play'],
    must_mention: '史莱姆、昆虫、藤蔓与触手',
  },
  {
    desc: 'M6870 触手经验错写兽奸经验',
    file: 'ere/dungeon/monster-play.js',
    find: '  era.add(`exp:${cid}:55`, y); // EXP:A:55 = 触手经验',
    replace: '  era.add(`exp:${cid}:56`, y); // 变异：写错经验',
    tests: ['monster-play'],
    must_mention: '史莱姆、昆虫、藤蔓与触手',
  },
  {
    desc: 'M6871 巨人扩张经验错写槽',
    file: 'ere/dungeon/monster-play.js',
    find: '  era.add(`exp:${cid}:53`, y); // EXP:A:53 = 阴道扩张经验',
    replace: '  era.add(`exp:${cid}:52`, y); // 变异：写错经验',
    tests: ['monster-play'],
    must_mention: '妖精、巨人、男女魔族',
  },
  {
    desc: 'M6872 男魔族两种结算分支反转',
    file: 'ere/dungeon/monster-play.js',
    find: "  await print_wait('『真，真的可以吗！？魔王大人！…真不敢相信…』');\n  if (rand(2) === 0) {",
    replace:
      "  await print_wait('『真，真的可以吗！？魔王大人！…真不敢相信…』');\n  if (rand(2) !== 0) {",
    tests: ['monster-play'],
    must_mention: '妖精、巨人、男女魔族',
  },
  {
    desc: 'M6873 女魔族百合经验反向扣减',
    file: 'ere/dungeon/monster-play.js',
    find: '    chara(cid).train.百合经验 += y;',
    replace: '    chara(cid).train.百合经验 -= y;',
    tests: ['monster-play'],
    must_mention: '妖精、巨人、男女魔族',
  },
  {
    desc: 'M6874 食脑魔错误消费死代码随机数',
    file: 'ere/dungeon/monster-play.js',
    find: '  void rand;\n  await print_wait',
    replace: '  rand(40); // 变异：执行死代码随机数\n  await print_wait',
    tests: ['monster-play'],
    must_mention: '食脑魔保留无条件返回',
  },
  {
    desc: 'M6875 MONSTER_PLAY 怪物数据写入第 4 列',
    file: 'ere/dungeon/monster-play.js',
    find: '    monster_data(selected, 5, -1, -1, -1, rand);',
    replace: '    monster_data(selected, 4, -1, -1, -1, rand);',
    tests: ['monster-play'],
    must_mention: 'MONSTER_PLAY 非狗先生成第 5 列',
  },
  {
    desc: 'M6876 MONSTER_PLAY 经验增量下界少一',
    file: 'ere/dungeon/monster-play.js',
    find: '  const y = rand(5) + 3; // :5-74 Y = RAND:5 + 3',
    replace: '  const y = rand(5) + 2; // 变异：增量下界',
    tests: ['monster-play'],
    must_mention: 'MONSTER_PLAY 取消返回 0',
  },
  {
    desc: 'M6877 MONSTER_PLAY 处女丧失门槛错误抬高',
    file: 'ere/dungeon/monster-play.js',
    find: 'chara(cid).chara.处女 === 1 && (era.get(`exp:${cid}:0`) || 0) > 0',
    replace:
      'chara(cid).chara.处女 === 1 && (era.get(`exp:${cid}:0`) || 0) > 5',
    tests: ['monster-play'],
    must_mention: 'MONSTER_PLAY 取消返回 0',
  },
  {
    desc: 'M6878 MONSTER_PLAY 回合结束错转据点',
    file: 'ere/dungeon/monster-play.js',
    find: '  begin(STATE.TURNEND); // :5-74；其后的 RETURN 1 因 BEGIN 立即结束而不可达',
    replace: '  begin(STATE.SHOP); // 变异：错转据点',
    tests: ['monster-play'],
    must_mention: 'MONSTER_PLAY 取消返回 0',
  },
  {
    desc: 'M6879 SELECT_TARGET 的怪物玩弄真身调用删除',
    file: 'ere/page/page-select-target.js',
    find: '      return monster_play_mod.monster_play();',
    replace: '      return 0; // 变异：删除怪物玩弄调用',
    tests: ['page-select-target'],
    must_mention: '1002 其它：进入 MONSTER_PLAY 真身',
  },
  {
    desc: 'M6880 DUNGEON_INFO2 的怪物改造真身调用删除',
    file: 'ere/page/page-dungeon-info2.js',
    find: '          await monster_setup(sub_result);',
    replace:
      '          await Promise.resolve(sub_result); // 变异：删除怪物改造调用',
    tests: ['page-dungeon-info'],
    must_mention: 'INFO2：部下状态总览',
  },
  {
    desc: 'M6881 城镇陈旧 MONSTER_PLAY 存根登记复辟',
    file: 'ere/dungeon/dungeon-town.js',
    find: "const STUBBED_CALLS = [\n  'SHOW_LIST_TRAINABLE',",
    replace:
      "const STUBBED_CALLS = [\n  'MONSTER_PLAY', // 变异：陈旧登记复辟\n  'SHOW_LIST_TRAINABLE',",
    tests: ['monster-play'],
    must_mention: '三处旧调用方均已清除',
  },
  {
    desc: 'M6882 结婚日主函数整体删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function marriage_day(cid, rand = default_rand, restart_turnend = true) {',
    replace:
      'async function marriage_day(cid, rand = default_rand, restart_turnend = true) {\n  return 0; // 变异：主函数删除',
    tests: ['marriage-day'],
    must_mention: '主函数：野狗婚姻完成分支后清记录并发出 TURNEND',
  },
  {
    desc: 'M6883 野狗婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function marriage_day_dog(cid, y = 1, rand = default_rand) {',
    replace:
      'async function marriage_day_dog(cid, y = 1, rand = default_rand) {\n  return 0; // 变异：野狗结算删除',
    tests: ['marriage-day'],
    must_mention: 'DOG/YOU：身体分流写入不同经验，YOU 另有显式等待',
  },
  {
    desc: 'M6884 魔王配偶婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function marriage_day_you(cid, y = 1) {',
    replace:
      'async function marriage_day_you(cid, y = 1) {\n  return 0; // 变异：魔王配偶结算删除',
    tests: ['marriage-day'],
    must_mention: 'DOG/YOU：身体分流写入不同经验，YOU 另有显式等待',
  },
  {
    desc: 'M6885 恋人配偶婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function marriage_day_lovers(lover_type, cid, rand = default_rand) {',
    replace:
      'async function marriage_day_lovers(lover_type, cid, rand = default_rand) {\n  return 0; // 变异：恋人配偶结算删除',
    tests: ['marriage-day'],
    must_mention: '角色与恋人配偶分支沿用现有名字并执行等待',
  },
  {
    desc: 'M6886 角色配偶婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function marriage_day_slave(cid, spouse) {',
    replace:
      'async function marriage_day_slave(cid, spouse) {\n  return 0; // 变异：角色配偶结算删除',
    tests: ['marriage-day'],
    must_mention: '角色与恋人配偶分支沿用现有名字并执行等待',
  },
  {
    desc: 'M6887 兽人婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function orc_marriage_day(cid, y = 1, rand = default_rand) {',
    replace:
      'async function orc_marriage_day(cid, y = 1, rand = default_rand) {\n  return 0; // 变异：兽人结算删除',
    tests: ['marriage-day'],
    must_mention: 'ORC/SLIME：种族正文按确定性随机源结算经验',
  },
  {
    desc: 'M6888 史莱姆婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function slime_marriage_day(cid, y = 1) {',
    replace:
      'async function slime_marriage_day(cid, y = 1) {\n  return 0; // 变异：史莱姆结算删除',
    tests: ['marriage-day'],
    must_mention: 'ORC/SLIME：种族正文按确定性随机源结算经验',
  },
  {
    desc: 'M6889 虫族婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function insect_marriage_day(cid, y = 1, rand = default_rand) {',
    replace:
      'async function insect_marriage_day(cid, y = 1, rand = default_rand) {\n  return 0; // 变异：虫族结算删除',
    tests: ['marriage-day'],
    must_mention: 'INSECT：母乳进化经属主门面写素质与寄生经验',
  },
  {
    desc: 'M6890 藤蔓婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function ivy_marriage_day(cid, y = 1) {',
    replace:
      'async function ivy_marriage_day(cid, y = 1) {\n  return 0; // 变异：藤蔓结算删除',
    tests: ['marriage-day'],
    must_mention: 'IVY/SYOKUSYU：高欲望与身体分流分别结算',
  },
  {
    desc: 'M6891 触手婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function syokusyu_marriage_day(cid, y = 1) {',
    replace:
      'async function syokusyu_marriage_day(cid, y = 1) {\n  return 0; // 变异：触手结算删除',
    tests: ['marriage-day'],
    must_mention: 'IVY/SYOKUSYU：高欲望与身体分流分别结算',
  },
  {
    desc: 'M6892 妖精婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function faily_marriage_day(cid, y = 1, rand = default_rand) {',
    replace:
      'async function faily_marriage_day(cid, y = 1, rand = default_rand) {\n  return 0; // 变异：妖精结算删除',
    tests: ['marriage-day'],
    must_mention: 'FAILY：依次授予魅惑，并用同一随机源决定教学',
  },
  {
    desc: 'M6893 巨人婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function giant_marriage_day(cid, y = 1, rand = default_rand) {',
    replace:
      'async function giant_marriage_day(cid, y = 1, rand = default_rand) {\n  return 0; // 变异：巨人结算删除',
    tests: ['marriage-day'],
    must_mention: 'GIANT/MAN/GIRL：三种人形配偶都执行可区分的初婚结算',
  },
  {
    desc: 'M6894 男性婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function man_marriage_day(cid, y = 1, rand = default_rand) {',
    replace:
      'async function man_marriage_day(cid, y = 1, rand = default_rand) {\n  return 0; // 变异：男性结算删除',
    tests: ['marriage-day'],
    must_mention: 'GIANT/MAN/GIRL：三种人形配偶都执行可区分的初婚结算',
  },
  {
    desc: 'M6895 女性婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function girl_marriage_day(cid, y = 1, rand = default_rand) {',
    replace:
      'async function girl_marriage_day(cid, y = 1, rand = default_rand) {\n  return 0; // 变异：女性结算删除',
    tests: ['marriage-day'],
    must_mention: 'GIANT/MAN/GIRL：三种人形配偶都执行可区分的初婚结算',
  },
  {
    desc: 'M6896 兽类婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function beast_marriage_day(cid, y = 1) {',
    replace:
      'async function beast_marriage_day(cid, y = 1) {\n  return 0; // 变异：兽类结算删除',
    tests: ['marriage-day'],
    must_mention: 'BEAST/BRAIN/HORSE：兽类、脑寄生与马匹分支写各自状态',
  },
  {
    desc: 'M6897 脑寄生婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function brain_marriage_day(cid, y = 1, rand = default_rand) {',
    replace:
      'async function brain_marriage_day(cid, y = 1, rand = default_rand) {\n  return 0; // 变异：脑寄生结算删除',
    tests: ['marriage-day'],
    must_mention: 'BEAST/BRAIN/HORSE：兽类、脑寄生与马匹分支写各自状态',
  },
  {
    desc: 'M6898 马匹婚后结算删除',
    file: 'ere/dungeon/marriage-day.js',
    find: 'async function horse_marriage_day(cid, y = 1, rand = default_rand) {',
    replace:
      'async function horse_marriage_day(cid, y = 1, rand = default_rand) {\n  return 0; // 变异：马匹结算删除',
    tests: ['marriage-day'],
    must_mention: 'BEAST/BRAIN/HORSE：兽类、脑寄生与马匹分支写各自状态',
  },
  {
    desc: 'M6899 TURNEND 结婚日调用断线',
    file: 'ere/system/turnend-settle.js',
    find: '    await marriage_day(cid, undefined, false);',
    replace: '    // 变异：结婚日调用断线',
    tests: ['event-turnend'],
    must_mention: '结婚日接线：普通档逐角色调用真身，妊娠角色看到婚后生活',
  },
  {
    desc: 'M6900 怪物库存零仍执行婚后事件',
    file: 'ere/dungeon/marriage-day.js',
    find: '    if (monster_stock(monster_id) <= 0) return 0;',
    replace:
      '    if (monster_stock(monster_id) < 0) return 0; // 变异：零库存放行',
    tests: ['marriage-day'],
    must_mention: '主函数：怪物库存不足时爱情已增加，但不进入婚后事件',
  },
  {
    desc: 'M6901 婚后不清异种妊娠对象记录',
    file: 'ere/dungeon/marriage-day.js',
    find: '  era.set(`cflag:${cid}:112`, 0); // CFLAG[112] = 异种妊娠对象',
    replace: '  // 变异：不清异种妊娠对象记录',
    tests: ['marriage-day'],
    must_mention: '主函数：野狗婚姻完成分支后清记录并发出 TURNEND',
  },
  {
    desc: 'M6902 婚后错误回到商店而非继续日结算',
    file: 'ere/dungeon/marriage-day.js',
    find: '  if (restart_turnend) begin(STATE.TURNEND);',
    replace:
      '  if (restart_turnend) begin(STATE.SHOP); // 变异：婚后错误回到商店',
    tests: ['marriage-day'],
    must_mention: '主函数：野狗婚姻完成分支后清记录并发出 TURNEND',
  },
  {
    desc: 'M6903 种族分支修改后的 Y 未回传售乳结算',
    file: 'ere/dungeon/marriage-day.js',
    find: '    if (branch) final_y = await branch(cid, y, rand);',
    replace: '    if (branch) await branch(cid, y, rand); // 变异：丢掉 Y 回传',
    tests: ['marriage-day'],
    must_mention: '主函数：种族分支修改后的 Y 用于售乳双账本',
  },
  {
    desc: 'M6904 非主角误入野狗的主角专属分支',
    file: 'ere/dungeon/marriage-day.js',
    find: '    cid === 0 &&\n    chara(cid).event.牝犬 == 0 &&\n    (chara(cid).train.兽奸中毒 <= 1 || chara(cid).chara.结婚爱情 < 50)',
    replace:
      '    cid >= 0 && // 变异：所有角色都视为 A == 0\n    chara(cid).event.牝犬 == 0 &&\n    (chara(cid).train.兽奸中毒 <= 1 || chara(cid).chara.结婚爱情 < 50)',
    tests: ['marriage-day'],
    must_mention: 'DOG/YOU：身体分流写入不同经验，YOU 另有显式等待',
  },
  {
    desc: 'M6905 TURNEND 接线未关闭同状态重入',
    file: 'ere/system/turnend-settle.js',
    find: '    await marriage_day(cid, undefined, false);',
    replace: '    await marriage_day(cid); // 变异：重新抛出同状态转场',
    tests: ['event-turnend'],
    must_mention: '结婚日接线：完成婚后事件后顺接剩余结算并回到 SHOP',
  },
  {
    desc: 'M6906 种类零漏掉角色配偶回退',
    file: 'ere/dungeon/marriage-day.js',
    find: '    else await marriage_day_slave(cid, marriage_chara);',
    replace: '    // 变异：漏掉原作最终 ELSE 的角色配偶回退',
    tests: ['marriage-day'],
    must_mention: '主函数：种类零按原作回退到默认角色的同居正文',
  },
  {
    desc: 'M6907 未知恋人类型错误补齐空白',
    file: 'ere/dungeon/marriage-day.js',
    find: "  return name ? name.padEnd(14, '　') : '';",
    replace: "  return name.padEnd(14, '　'); // 变异：空名字也补齐",
    tests: ['marriage-day'],
    must_mention: '角色与恋人配偶分支沿用现有名字并执行等待',
  },
  {
    desc: 'M6908 野狗婚后动态正文拆成多行',
    file: 'ere/dungeon/marriage-day.js',
    find: '  } else if (chara(cid).event.牝犬 == 1) {\n    let description = name_of(cid);',
    replace:
      "  } else if (chara(cid).event.牝犬 == 1) {\n    era.print(name_of(cid));\n    let description = ''; // 变异：拆开同一显示行",
    tests: ['marriage-day'],
    must_mention: 'DOG/YOU：身体分流写入不同经验，YOU 另有显式等待',
  },
  {
    desc: 'M6909 主标题只输出结婚生活后缀',
    file: 'ere/dungeon/marriage-day.js',
    find: '  await era.printAndWait(`*${name_of(cid)}和${spouse_name}的结婚生活*`);',
    replace: "  await era.printAndWait('的结婚生活*'); // 变异：标题前段丢失",
    tests: ['marriage-day'],
    must_mention: '主函数：种类零按原作回退到默认角色的同居正文',
  },
  {
    desc: 'M6910 魔王未声明状态误阻断共同生活',
    file: 'ere/dungeon/marriage-day.js',
    find: '  if (chara(cid).invasion.状态 != 0 || chara(0).invasion.状态 != 0) {',
    replace:
      "  if (chara(cid).invasion.状态 != 0 || era.get('cflag:0:1') != 0) { // 变异：未声明值不兜零",
    tests: ['marriage-day'],
    must_mention: 'DOG/YOU：身体分流写入不同经验，YOU 另有显式等待',
  },
  {
    desc: 'M6911 兽人低爱情误跳高爱情标签',
    file: 'ere/dungeon/marriage-day.js',
    find: '    } else if (chara(cid).chara.结婚爱情 > 40) {\n      // RAW: GOTO ORC_MARRIAGE_DAY40',
    replace:
      '    } else if (chara(cid).chara.结婚爱情 > 30) {\n      // 变异：低爱情误跳高爱情标签',
    tests: ['marriage-day'],
    must_mention: 'ORC：低爱情的随机分支不会误跳高爱情标签',
  },
  {
    desc: 'M6912 巨人高爱情展示漏加肛门经验',
    file: 'ere/dungeon/marriage-day.js',
    find: '        era.print(`肛门扩张经验+1`);\n        // EXP[1] + = y（变量语义：EXP 族，(cid)[1] +）\n        era.add(`exp:${cid}:1`, y);\n        // EXP[5] + = y（变量语义：EXP 族，(cid)[5] +）',
    replace:
      '        era.print(`肛门扩张经验+1`);\n        // 变异：漏加肛门经验\n        // EXP[5] + = y（变量语义：EXP 族，(cid)[5] +）',
    tests: ['marriage-day'],
    must_mention: 'GIANT：高爱情展示的肛交分支增加肛门经验',
  },
  {
    desc: 'M6913 男性配偶高爱情分支颠倒私处封印',
    file: 'ere/dungeon/marriage-day.js',
    find: "      description += '和睦地相拥着，';\n    }\n\n    if (\n      chara(cid).chara.私处封印 == 1 ||",
    replace:
      "      description += '和睦地相拥着，';\n    }\n\n    if (\n      chara(cid).chara.私处封印 == 0 || // 变异：颠倒私处封印",
    tests: ['marriage-day'],
    must_mention: 'MAN：高爱情夫妻分支尊重私处封印',
  },
  {
    desc: 'M6914 女性配偶百合气质门槛抬高',
    file: 'ere/dungeon/marriage-day.js',
    find: '  } else if (chara(cid).chara.百合气质 >= 1) {',
    replace: '  } else if (chara(cid).chara.百合气质 > 1) { // 变异：门槛抬高',
    tests: ['marriage-day'],
    must_mention: 'GIRL：百合气质角色接受妻子且不进入惩罚分支',
  },
  {
    desc: 'M6915 史莱姆低欲望误加自慰经验',
    file: 'ere/dungeon/marriage-day.js',
    find: '  if (chara(cid).system.欲望 >= 3) {\n    // EXP:cid[10] + = y（变量语义：EXP 族，cid[10] +）',
    replace:
      '  if (chara(cid).system.欲望 >= 2) { // 变异：低欲望也加自慰经验\n    // EXP:cid[10] + = y（变量语义：EXP 族，cid[10] +）',
    tests: ['marriage-day'],
    must_mention: 'SLIME：低欲望不会获得自慰经验',
  },
  {
    desc: 'M6916 虫族男性误入母乳进化分支',
    file: 'ere/dungeon/marriage-day.js',
    find: '  if (chara(cid).chara.处女 == 0 && chara(cid).chara.男人 == 0) {',
    replace:
      '  if (chara(cid).chara.处女 == 0 && chara(cid).chara.男人 == 1) { // 变异：男性误入',
    tests: ['marriage-day'],
    must_mention: 'INSECT：男性不会进入母乳进化分支',
  },
  {
    desc: 'M6917 藤蔓低欲望误入主动侍奉分支',
    file: 'ere/dungeon/marriage-day.js',
    find: '  if (chara(cid).system.欲望 >= 4) {',
    replace: '  if (chara(cid).system.欲望 >= 3) { // 变异：降低主动侍奉门槛',
    tests: ['marriage-day'],
    must_mention: 'IVY：低欲望不会进入主动侍奉分支',
  },
  {
    desc: 'M6918 触手把未封印女性误判为封印分支',
    file: 'ere/dungeon/marriage-day.js',
    find: '    chara(cid).chara.男人 == 1\n  ) {\n    era.print(\n      `${clitoris_word(cid)},乳房,肛门点数+',
    replace:
      '    chara(cid).chara.男人 == 0 // 变异：颠倒身体分流\n  ) {\n    era.print(\n      `${clitoris_word(cid)},乳房,肛门点数+',
    tests: ['marriage-day'],
    must_mention: 'SYOKUSYU：未封印女性获得私处经验',
  },
  {
    desc: 'M6919 妖精教学随机范围扩大',
    file: 'ere/dungeon/marriage-day.js',
    find: '  if (rand(10) == 0) {\n    await era.printAndWait(\n      `${marriage_name(cid)}对${name_of(cid)}淫荡的身体非常满意',
    replace:
      '  if (rand(10) <= 1) { // 变异：扩大教学随机范围\n    await era.printAndWait(\n      `${marriage_name(cid)}对${name_of(cid)}淫荡的身体非常满意',
    tests: ['marriage-day'],
    must_mention: 'FAILY：教学随机未命中时不会授予魅惑',
  },
  {
    desc: 'M6920 兽类高爱情错误要求同时具备兽奸中毒',
    file: 'ere/dungeon/marriage-day.js',
    find: '  } else if (chara(cid).train.兽奸中毒 >= 1 || chara(cid).chara.结婚爱情 > 40) {\n    if (\n      chara(cid).chara.私处封印 == 1 ||\n      (chara(cid).chara.特别服装类型 == 79 &&\n        chara(cid).train.着衣状态 & 64 &&\n        game.system.着衣系统) ||\n      chara(cid).chara.男人 == 1\n    ) {\n      await era.printAndWait(\n        `${name_of(cid)}如牝犬一般吐着舌头兴奋地扭动腰肢迎接着${marriage_name(cid)}。`,',
    replace:
      '  } else if (chara(cid).train.兽奸中毒 >= 1 && chara(cid).chara.结婚爱情 > 40) { // 变异：错用且\n    if (\n      chara(cid).chara.私处封印 == 1 ||\n      (chara(cid).chara.特别服装类型 == 79 &&\n        chara(cid).train.着衣状态 & 64 &&\n        game.system.着衣系统) ||\n      chara(cid).chara.男人 == 1\n    ) {\n      await era.printAndWait(\n        `${name_of(cid)}如牝犬一般吐着舌头兴奋地扭动腰肢迎接着${marriage_name(cid)}。`,',
    tests: ['marriage-day'],
    must_mention: 'BEAST：高爱情角色进入高收益兽奸分支',
  },
  {
    desc: 'M6921 脑寄生扩大漏尿随机命中范围',
    file: 'ere/dungeon/marriage-day.js',
    find: '  if (chara(cid).event.漏尿癖 == 1 || rand(20) == 0) {',
    replace:
      '  if (chara(cid).event.漏尿癖 == 1 || rand(20) <= 1) { // 变异：扩大漏尿随机范围',
    tests: ['marriage-day'],
    must_mention: 'BRAIN：漏尿随机未命中时进入脑侵与幻觉分支',
  },
  {
    desc: 'M6922 马匹把饮精随机误判为交合',
    file: 'ere/dungeon/marriage-day.js',
    find: '  if (chara(cid).event.牝犬 == 1 || cid === 0) {\n    if (rand(2) == 0) {\n      if (',
    replace:
      '  if (chara(cid).event.牝犬 == 1 || cid === 0) {\n    if (rand(2) <= 1) { // 变异：饮精随机误入交合\n      if (',
    tests: ['marriage-day'],
    must_mention: 'HORSE：饮精分支获得五倍口交与兽奸经验',
  },
];
