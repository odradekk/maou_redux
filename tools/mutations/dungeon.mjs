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
];
