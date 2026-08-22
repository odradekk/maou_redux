// 变异条目表切片：ere/event/（调教事件链与 SOURCE_CHECK）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号是历史惯性编号
// （M117 曾被两票撞号使用），只作引用锚点保留，不再人工分配。
export default [
  {
    desc: 'M4 EVENTCOMEND 目标死亡分支：FLAG:35 判据取反',
    file: 'ere/event/event-comend.js',
    find: '  if (stamina <= 0 && auto_end_flag === 0) {',
    replace: '  if (stamina <= 0 && auto_end_flag !== 0) {',
    tests: ['event-comend'],
    must_mention: '死亡消息',
  },
  {
    desc: 'M5 EVENTCOMEND 助手衰弱分支：凭空加 FLAG:35 守卫（原作无）',
    file: 'ere/event/event-comend.js',
    find: `  } else if (stamina < 500) {
    // :302-307 衰弱（无 FLAG:35 守卫——开关只管目标侧）`,
    replace: `  } else if (stamina < 500 && era.get('flag:35')) {
    // 变异：加了原作没有的 FLAG:35 守卫`,
    tests: ['event-comend'],
    must_mention: '分支 4',
  },
  {
    desc: 'M6 EVENTTRAIN 全量：删掉一笔直线赋值（BASE:MASTER:4 = 0）',
    file: 'ere/event/event-train.js',
    find: `    // :22 BASE:MASTER:4 = 0（触手射精槽）
    era.set('base:0:4', 0);`,
    replace: `    // :22 BASE:MASTER:4 = 0（触手射精槽）——变异：删除`,
    tests: ['event-train'],
    must_mention: '全量断言',
  },
  {
    desc: 'M7 EVENTTRAIN/PRITRAIN 暂存：SIF ASSI 的非零判定改成大于零',
    file: 'ere/event/event-train.js',
    find: `  era_flag.target_backup = target;
  if (era_flag.assi) {
    era_flag.assi_backup = era_flag.assi;`,
    replace: `  era_flag.target_backup = target;
  if (era_flag.assi > 0) {
    era_flag.assi_backup = era_flag.assi;`,
    tests: ['event-train'],
    must_mention: '全量断言',
  },
  {
    // #114 起三档链落地：#PRI 的出口会被链上后写的普通档覆盖，改它已无
    // 行为差异（整条变异退化为跳过）；出口守卫改指向链上最后生效的普通档
    desc: 'M17 TURNEND 出口：普通档 BEGIN SHOP 改 BEGIN TITLE（链上最后的出口决定去向，回不到主菜单）',
    file: 'ere/system/turnend-settle.js',
    find: '  begin(STATE.SHOP);',
    replace: '  begin(STATE.TITLE);',
    tests: ['train-loop'],
    must_mention: '端到端',
  },
  {
    desc: 'M19 EVENTEND 死亡删除：漏除名（DELCHARA）',
    file: 'ere/event/event-end.js',
    find: `      stub_line('PARTY_CHAR_DEL', '队伍移除');
      // DELCHARA：引擎等价物 removeCharacter（从已加入列表除名）
      era.removeCharacter(target);`,
    replace: `      stub_line('PARTY_CHAR_DEL', '队伍移除');
      // 变异：不除名`,
    tests: ['event-end'],
    must_mention: '除名',
  },
  {
    desc: 'M20 EVENTEND 指针还原：尾部读错槽（target_record 改 master_backup）',
    file: 'ere/event/event-end.js',
    find: `    era_flag.assi = era_flag.assi_record;
    era_flag.target = era_flag.target_record;`,
    replace: `    era_flag.assi = era_flag.assi_record;
    era_flag.target = era_flag.master_backup;`,
    tests: ['event-end'],
    must_mention: '主体',
  },
  {
    desc: 'M46 调教者技巧阶梯废掉（恒 ×1.0）',
    file: 'ere/event/source-check.js',
    find: '  const rate = pabl(12) >= 5 ? rates[5] : rates[pabl(12)];',
    replace: '  const rate = 1.0;',
    tests: ['source-check'],
    must_mention: '技巧',
  },
  {
    desc: 'M47 欲情系数的边界改为含下界（< 改 <=）',
    file: 'ere/event/source-check.js',
    find: '    if (p5 < PALAMLV[table[i][0]]) {',
    replace: '    if (p5 <= PALAMLV[table[i][0]]) {',
    tests: ['source-check'],
    must_mention: '欲情系数',
  },
  {
    desc: 'M48 ABL>5 的放大算式错一格（+5 改 +4）',
    file: 'ere/event/source-check.js',
    find: '  local0 = idiv(local0 * (abl(0) + 5), 10);',
    replace: '  local0 = idiv(local0 * (abl(0) + 4), 10);',
    tests: ['source-check'],
    must_mention: '技巧 0 档',
  },
  {
    desc: 'M49 绝顶阈值错档（PALAMLV[4] 改 PALAMLV[3]）',
    file: 'ere/event/source-check.js',
    find: '  const LV4 = PALAMLV[4]; // 10000',
    replace: '  const LV4 = PALAMLV[3]; // 变异：阈值错档',
    tests: ['source-check'],
    must_mention: '阴蒂绝顶',
  },
  {
    desc: 'M50 NOWEX 只写不并被破坏（直接并进 EX → 与引擎双重累加）',
    file: 'ere/event/source-check.js',
    find: '  era.set(`nowex:${cid}:0`, ex_c);',
    replace: '  era.add(`ex:${cid}:0`, ex_c);',
    tests: ['source-check'],
    must_mention: 'NOWEX',
  },
  {
    desc: 'M51 体力气力扣减的去零钳制删掉',
    file: 'ere/event/source-check.js',
    find: '        next = Math.max(Math.min(next, max), 0);',
    replace: '        next = next;',
    tests: ['source-check'],
    must_mention: '气力耗尽',
  },
  {
    desc: 'M52 TFLAG:59 读了新 PREVCOM（应为旧值）',
    file: 'ere/event/source-check.js',
    find: "  era.set('tflag:59', era_flag.prevcom);",
    replace: "  era.set('tflag:59', era_flag.selectcom);",
    tests: ['source-check'],
    must_mention: '黄金样本',
  },
  {
    desc: 'M53 参数行的缺段空格错一（DOWN 缺段 7 改 8）',
    file: 'ere/event/source-check.js',
    find: "          (d > 0 ? `-${figure_indent_2(d)}${d}` : ' '.repeat(7)) +",
    replace:
      "          (d > 0 ? `-${figure_indent_2(d)}${d}` : ' '.repeat(8)) +",
    tests: ['source-check'],
    must_mention: '黄金样本',
  },
  {
    desc: 'M54 PRINTW 点线错一（39 改 38）',
    file: 'ere/event/source-check.js',
    find: "  era.print('‥'.repeat(39));",
    replace: "  era.print('‥'.repeat(38));",
    tests: ['source-check'],
    must_mention: '黄金样本',
  },
  {
    desc: 'M108 村娘加入点漏盖版本戳（init_portcflag 调用删除）',
    file: 'ere/event/event-first.js',
    find: `    // 移植自建（issue #67，非原作动作）：给刚加入的角色盖移植数据版本戳
    // （portcflag 扩展表；预设基线 0 已由 addCharacter 套上，此处盖为当前
    // 版本——引擎侧链路由 test/portcflag-table.test.js 驱动引擎代码比对）
    init_portcflag(17);`,
    replace: '    // 变异：portcflag 版本戳不盖',
    tests: ['event-first'],
    must_mention: 'portcflag:17:数据版本',
  },
  {
    desc: 'M183 source-check 迁移回退一处（屈服刻印结算改回裸 era.set）',
    file: 'ere/event/source-check.js',
    find: 'game.train.屈服刻印结算 = 1; // 屈服刻印１相当',
    replace: "era.set('tflag:200', 1); // 屈服刻印１相当",
    tests: ['source-check'],
    must_mention: '跨域写走门面',
  },
  {
    desc: 'M184 source-check 迁移回退一处（反抗刻印改回裸 era.set）',
    file: 'ere/event/source-check.js',
    find: 'chara(cid).system.反抗刻印 = 1;',
    replace: 'era.set(`mark:${cid}:3`, 1);',
    tests: ['source-check'],
    must_mention: '跨域写走门面',
  },
  // —— #114 日循环骨架（EVENTTURNEND 三档；普通档体在 ere/system/
  //    turnend-settle.js，同属事件链代码，条目收本切片）——
  {
    desc: 'M185 EVENTTURNEND（#PRI）时段判据取反（TIME==1 改 !=）',
    file: 'ere/event/event-turnend.js',
    find: '    if (era_flag.time === 1) {',
    replace: '    if (era_flag.time !== 1) {',
    tests: ['event-turnend'],
    must_mention: '时段与日期推进',
  },
  {
    desc: 'M186 EVENTTURNEND（#PRI）日期推进漏 +1（day_count 不增）',
    file: 'ere/event/event-turnend.js',
    find: '      era_flag.day_count += 1;',
    replace: '      // 变异：day_count 不推进',
    tests: ['event-turnend'],
    must_mention: 'DAY:0 += 1',
  },
  {
    desc: 'M187 迷宫守卫恒放行（CFLAG:1 判据删掉——阶段 3 接入点失守）',
    file: 'ere/system/turnend-settle.js',
    find: "    if ((place === 2 || place === 3) && (era.get('flag:502') || 0) === 0) {",
    replace: '    if (true) {',
    tests: ['event-turnend'],
    must_mention: 'CFLAG:1 守卫',
  },
  {
    desc: 'M188 侵攻度自然衰减归零（不减 RAND:100——通关天数估算失真）',
    file: 'ere/system/turnend-settle.js',
    find: `      spec.write(spec.degree() - rand(100));
      era.print(spec.resist_text);`,
    replace: `      spec.write(spec.degree());
      era.print(spec.resist_text);`,
    tests: ['event-turnend'],
    must_mention: '侵攻度自然衰减',
  },
  {
    desc: 'M189 魔王回复量错一位（午前结算 1400 改 140）',
    file: 'ere/system/turnend-settle.js',
    find: '  const maou_heal = era_flag.time === 0 ? 1400 : 1000;',
    replace: '  const maou_heal = era_flag.time === 0 ? 140 : 1000;',
    tests: ['event-turnend'],
    must_mention: '魔王回复',
  },
];
