// 变异条目表切片：ere/dungeon/（迷宫主循环与队伍编组，#172 H3）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号是历史惯性编号
// （M117 曾被两票撞号使用），只作引用锚点保留，不再人工分配。
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
        await battle_mod.dungeon_party_battle(arg0, rand_n);`,
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
    find: '    await dungeon_shop_itemsell(arg0);\n    return 1;',
    replace:
      '    await dungeon_shop_itemsell(arg0);\n    return 0; // 变异：RESULT 1 改 0',
    tests: ['dungeon-room'],
    must_mention: 'RESULT 1 = 戦闘が発生しないフラグ',
  },
  {
    desc: 'M601 ROOM 分发·店遭遇掷删（RAND:10 == 0 恒不中）',
    file: 'ere/dungeon/dungeon-room.js',
    find: '  if (rand_n(10) === 0) {\n    await dungeon_shop_itemsell(arg0);',
    replace:
      '  if (rand_n(10) === -1) {\n    await dungeon_shop_itemsell(arg0);',
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
];
