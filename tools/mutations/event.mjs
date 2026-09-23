// 变异条目表切片：ere/event/（调教事件链与 SOURCE_CHECK）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用锚点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 362; // #548 起 +8（M11470-M11477：CHARADEAD_CHECK 真身与 @EVENTEND
// 接线；M11478/M11479 的靶位在返工轮搬去 chara.mjs——补偿写在 @CHARA_EX_34 里，随靶文件分片）；#565 起 +5（M11610-M11613，开局随机奴隶接线的四条；M11626 审查轮补 CHARA_NAME_DEFINE 实参错掷）；#400（N16）+22（おねしょ）+17（犬の散歩）+20（处女献上）+15（夜这い）+13（示众台）+11（M8680-M8690 随机上界；M8501 起整体 +100，避开 #401 号段）；
// #461 并入 master：+2（避孕套判定 M9880/M9881，原 M9836/M9837 与 #462 撞号后改，
// 号段见 #461 完成报告）；#463 起 +9（M10209-M10217，first-setting.js 全量新增）；
// #502 起 +4（M10744-M10747，SENGEN_VIDEO_DE 的骰点与两段清零、EVENT_TURNEND
// 的宣言数真读）；#508 起 +4（M11000-M11003，回合结算的调教窗口开关、
// AUTOTRAIN 调用点与 FORMAT 循环的 TARGET 指针）

export default [
  // —— #565 已实现函数的存根调用点接线 ——
  {
    desc: 'M11610 event-first 的 CHARA_NAME_DEFINE 接线删除（魔王称呼不落地）',
    file: 'ere/event/event-first.js',
    find: '    chara_name_define(0);',
    replace: '    // 变异：称呼定义接线删除',
    tests: ['event-first'],
    must_mention: 'callname:0:-1',
  },
  {
    desc: 'M11611 event-first 的 RAND_CHARA_MAKE 接线删除（随机奴隶不生成）',
    file: 'ere/event/event-first.js',
    find: '  const rand_n = (n) => Math.floor(Math.random() * n);\n  await rand_chara_make(rand_n, () => char_make_inport(1, rand_n));',
    replace:
      '  const rand_n = (n) => Math.floor(Math.random() * n);\n  // 变异：随机奴隶生成接线删除（rand_n 不再被消费，夹具输入面随之错位）',
    tests: ['event-first'],
    must_mention: '随机奴隶经 @RAND_CHARA_MAKE 真身生成',
  },
  {
    desc: 'M11612 头发生长播报缺发色段（GET_LOOK_INFO 接线旁路）',
    file: 'ere/system/turnend-settle.js',
    find: `          \`\${name}\${beauty}\${get_look_info(cid, '发色(颜色)')}的\${\n            hair === 51 ? '头发半长，到肩膀了。' : '头发很长，长发及腰。'\n          }\`,`,
    replace: `          \`\${name}\${beauty}\${\n            hair === 51 ? '头发半长，到肩膀了。' : '头发很长，长发及腰。'\n          }\`,`,
    tests: ['event-turnend'],
    must_mention: '头发半长播报必须含',
  },
  {
    desc: 'M11613 阴毛播报缺发色段（GET_LOOK_INFO 接线旁路）',
    file: 'ere/system/turnend-settle.js',
    find: `          \`\${name}\${charm ?? ''}的阴阜上，\${get_look_info(cid, '发色(颜色)')}的\${state_word}\`,`,
    replace: `          \`\${name}\${charm ?? ''}的阴阜上，\${state_word}\`,`,
    tests: ['event-turnend'],
    must_mention: '阴毛播报必须按原作拼成单行',
  },
  {
    desc: 'M11626 CHARA_NAME_DEFINE 实参错掷 17（省略参数误当 TARGET）',
    file: 'ere/event/event-first.js',
    find: '    chara_name_define(0);',
    replace: '    chara_name_define(17); // 变异：实参错掷',
    tests: ['event-first'],
    must_mention: 'callname:0:-1',
  },
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
    find: `    // :39-41 记录目标与助手，以备人物切换：ASSI:1 / TARGET:1（flag 槽位）
    era_flag.assi_record = era_flag.assi;
    era_flag.target_record = era_flag.target;`,
    replace: `    // 变异：漏记 assi_record
    era_flag.target_record = era_flag.target;`,
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
    find: `      party_char_del(target); // :372 CALL PARTY_CHAR_DEL, A（#548 起真身）
      // DELCHARA：引擎等价物 removeCharacter（从已加入列表除名）
      era.removeCharacter(target);`,
    replace: `      party_char_del(target); // :372 CALL PARTY_CHAR_DEL, A（#548 起真身）
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
    desc: 'M51 体力气力扣减的去零钳制删掉（manual 路径，find 锚定 lose0/lose1 快照——#461 起 AUTO 路径有同款语义的第二处 next=Math.max(...) 子句，裸行不再唯一）',
    file: 'ere/event/source-check.js',
    find: `  const lose0 = Math.max(lose(0), 0);
  const lose1 = Math.max(lose(1), 0);
  for (const k of [0, 1]) {
    const loss = lose(k);
    if (loss !== 0) {
      const base = era.get(\`base:\${cid}:\${k}\`) || 0;
      const max = era.get(\`maxbase:\${cid}:\${k}\`) || 0;
      let next = base - loss;
      if (max > 0) {
        next = Math.max(Math.min(next, max), 0);
      }`,
    replace: `  const lose0 = Math.max(lose(0), 0);
  const lose1 = Math.max(lose(1), 0);
  for (const k of [0, 1]) {
    const loss = lose(k);
    if (loss !== 0) {
      const base = era.get(\`base:\${cid}:\${k}\`) || 0;
      const max = era.get(\`maxbase:\${cid}:\${k}\`) || 0;
      let next = base - loss;
      if (max > 0) {
        next = next;
      }`,
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
    desc: 'M2114 EVENTTURNEND（#PRI）时段判据取反（TIME==1 改 !=）',
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
    tests: ['event-turnend', 'event-ending-e2e'],
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
  {
    desc: 'M196 @EVENTFIRST 威望播种改坏（70 改 7，SYSTEM ver1.0.3.ERB:62）',
    file: 'ere/event/event-first.js',
    find: '  era_exflag.prestige = 70;',
    replace: '  era_exflag.prestige = 7; // 变异：播种改坏',
    tests: ['event-first'],
    must_mention: 'exflag:99',
  },
  // —— #115 日程推进（EVENT_NEXTDAY/EVENT_NEWDAY 窄路径 + EVENT_NEXTMONTH
  //    月份回绕；条目收本切片）——
  {
    desc: 'M190 EVENT_NEXTMONTH 12 月不回 1（跨年月号错）',
    file: 'ere/event/event-nextmonth.js',
    find: '    era_flag.month = 1;',
    replace: '    era_flag.month = 2;',
    tests: ['event-nextday'],
    must_mention: '与期望日历不符',
  },
  {
    desc: 'M191 EVENT_NEXTMONTH 小月表错一个月（9 改 8——8 月被当小月提前换月）',
    file: 'ere/event/event-nextmonth.js',
    find: '[4, 6, 9, 11].includes(era_flag.month)',
    replace: '[4, 6, 8, 11].includes(era_flag.month)',
    tests: ['event-nextday'],
    must_mention: '与期望日历不符',
  },
  {
    desc: 'M192 EVENT_NEXTMONTH 2 月支删掉（29 日不换月，日历对照失守）',
    file: 'ere/event/event-nextmonth.js',
    find: '  if (era_flag.month === 2) {',
    replace: '  if (era_flag.month === 13) {',
    tests: ['event-nextday'],
    must_mention: '与期望日历不符',
  },
  {
    desc: 'M193 ENDCHECK 调用点被删（主线剧情监测每日一次失守；#116 起为真调用）',
    file: 'ere/event/event-nextday.js',
    find: `  // :241 主线剧情监测——每日一次的结局判定入口，@ENDCHECK 全链本体在
  // ere/event/event-endcheck.js（#116）
  await run_endcheck();`,
    replace: '  // 变异：ENDCHECK 不调用',
    tests: ['event-nextday'],
    must_mention: 'ENDCHECK 必须恰好被调用一次',
  },
  {
    desc: 'M194 普通档的 TIME==0 守卫删掉（午后回合也跑翌朝事件，每日翻倍）',
    file: 'ere/system/turnend-settle.js',
    find: `  if (era_flag.time === 0) {
    await run_event_newday();
  }`,
    replace: '  await run_event_newday();',
    tests: ['event-nextday'],
    must_mention: '不进日的回合不得调用 ENDCHECK',
  },
  {
    desc: 'M195 跨年年龄增长漏 +1（种族年龄不推进）',
    file: 'ere/event/event-nextmonth.js',
    find: '      chara(cid).chara.种族年龄 += 1; // CFLAG:452 += 1（:31）',
    replace: '      // 变异：种族年龄不推进',
    tests: ['event-nextday'],
    must_mention: '种族年龄应 +1',
  },
  // —— #119 KYOTEN_EVENT 接线（普通档衰减块内两处调用，条目收本切片）——
  {
    desc: 'M197 KYOTEN_EVENT 未征服臂调用删除（衰减后据点事件不触发）',
    file: 'ere/system/turnend-settle.js',
    find: `      // CALL KYOTEN_EVENT, region（未征服臂，原作 :631/:650/:669/:688）
      await kyoten_event(region);`,
    replace: '      // 变异：未征服臂不调 KYOTEN_EVENT',
    tests: ['event-turnend'],
    must_mention: '推进 FLAG:93 0→1',
  },
  {
    desc: 'M198 KYOTEN_EVENT 征服后反抗臂调用删除（反抗衰减后据点事件不触发）',
    file: 'ere/system/turnend-settle.js',
    find: `      // CALL KYOTEN_EVENT, region（征服后反抗臂，原作 :640/:659/:678/:697）
      await kyoten_event(region);`,
    replace: '      // 变异：征服后反抗臂不调 KYOTEN_EVENT',
    tests: ['event-turnend'],
    // #120 起该用例改确定构造（随机源注入），断言消息随之更换（flag:93
    // 的断言先于横幅断言红）
    must_mention: '反抗衰减后回退档命中',
  },
  {
    desc: 'M199 KYOTEN_EVENT 领域号写死 1（精灵衰减误读人间界状态再退一档）',
    file: 'ere/system/turnend-settle.js',
    find: `      // CALL KYOTEN_EVENT, region（未征服臂，原作 :631/:650/:669/:688）
      await kyoten_event(region);`,
    replace: `      // CALL KYOTEN_EVENT, region（未征服臂，原作 :631/:650/:669/:688）
      await kyoten_event(1); // 变异：领域号写死`,
    tests: ['event-turnend'],
    must_mention: 'ARG 2 臂不得误读人间界状态再退一档',
  },
  {
    desc: 'M205 ENDING_1 的 FLAG:82 置位删除（:38）',
    file: 'ere/event/event-ending.js',
    find: '  era_flag.human_realm_fallen = 1;',
    replace: '  // 变异：FLAG:82 不置位',
    tests: ['event-ending'],
    must_mention: 'FLAG:82 置 1',
  },
  {
    desc: 'M206 ENDING_1 的 QUIT 分支也置 FLAG:82（原作不置，:34-38）',
    file: 'ere/event/event-ending.js',
    find: `      era.quit();
    }`,
    replace: `      era_flag.human_realm_fallen = 1; // 变异：QUIT 前置位
      era.quit();
    }`,
    tests: ['event-ending'],
    must_mention: '退出路径不置陷落标记',
  },
  {
    desc: 'M207 ENDING_1 入队角色号改坏（ADDCHARA 35 → 34，:20）',
    file: 'ere/event/event-ending.js',
    find: '  era.addCharacter(35);',
    replace: '  era.addCharacter(34); // 变异：入错角色',
    tests: ['event-ending'],
    must_mention: '菲娅）入队',
  },
  {
    desc: 'M208 ENDING_3 的置位状态机断在 1（FLAG:87 = 2 → 1，:72）',
    file: 'ere/event/event-ending.js',
    find: `  era_flag.elf_realm_conquered = 1;
  await char_gift(1, rand);
  era_flag.elf_realm_conquered = 2;`,
    replace: `  era_flag.elf_realm_conquered = 1;
  await char_gift(1, rand);
  era_flag.elf_realm_conquered = 1; // 变异：状态机断在 1`,
    tests: ['event-ending'],
    must_mention: '1→2',
  },
  {
    desc: 'M209 ENDCHECKMAIN 2801 主线空闲守卫删除（剧情线推进中也置 99）',
    file: 'ere/event/event-endcheck.js',
    find: `  if (
    era_flag.day_count === 500 &&
    (era_exflag.first_run_deadline === 0 || era_exflag.first_run_deadline >= 90)
  ) {`,
    replace: `  if (era_flag.day_count === 500 && era_exflag.first_run_deadline >= 0) {`,
    tests: ['event-endcheck'],
    must_mention:
      'ENDCHECKMAIN 2801：DAY==500 且主线空闲（==0 或 >=90）→ 置 99；其余不动',
  },
  {
    desc: 'M210 ENDCHECKMAIN 2802 反作弊容差丢失（+8766 删掉）',
    file: 'ere/event/event-endcheck.js',
    find: '  if (era_flag.money > era_exflag.legit_money + 8766) {',
    replace: '  if (era_flag.money > era_exflag.legit_money) {',
    tests: ['event-endcheck'],
    must_mention: '容差界',
  },
  {
    desc: 'M211 ENDCHECKMAIN 2803 占用守卫删除（占用中的奴隶也计入失控号）',
    file: 'ere/event/event-endcheck.js',
    find: `    if (
      (era.get(\`cflag:\${cid}:9\`) || 0) >= 5000 &&
      (era.get(\`cflag:\${cid}:1\`) || 0) === 0
    ) {`,
    replace: `    if ((era.get(\`cflag:\${cid}:9\`) || 0) >= 5000) {`,
    tests: ['event-endcheck'],
    must_mention: '占用中的角色不得计入',
  },
  {
    desc: 'M212 ENDCHECKMAIN 2804 魔王过载阈值边界含等改不含（>= 1500 改 >）',
    file: 'ere/event/event-endcheck.js',
    find: "  if ((era.get('cflag:0:9') || 0) >= 1500) {",
    replace: "  if ((era.get('cflag:0:9') || 0) > 1500) {",
    tests: ['event-endcheck'],
    must_mention: '魔王过载必须置 10',
  },
  {
    desc: 'M213 ENDCHECKMAIN FLAG 侧反叛判定边界（<= 0 改 < 0，威望恰为零不置）',
    file: 'ere/event/event-endcheck.js',
    find: '  if (era_exflag.prestige <= 0) {',
    replace: '  if (era_exflag.prestige < 0) {',
    tests: ['event-endcheck'],
    must_mention: '威望 <= 0 必须置',
  },
  {
    desc: 'M214 ENDRESET 嘉德清场守卫改读自家线值（把原作 2814 笔误"修好"）',
    file: 'ere/event/event-endcheck.js',
    find: '  if (get_chara(33) < 0 && era_exflag.route_21 < 500) {',
    replace: '  if (get_chara(33) < 0 && era_exflag.route_33 < 500) {',
    tests: ['event-endcheck'],
    must_mention: '守卫读 2814',
  },
  {
    desc: 'M215 ENDCHECKCHARA 素质定线值交换（恋慕也置 20）',
    file: 'ere/event/event-endcheck.js',
    find: '          starter.holder[starter.name] = 10;',
    replace: '          starter.holder[starter.name] = 20;',
    tests: ['event-endcheck'],
    must_mention: '恋慕定线必须置 10',
  },
  {
    desc: 'M216 END 族分派循环防重播守卫删除（个位非 0 的已播段也分发）',
    file: 'ere/event/event-endcheck.js',
    find: '      if (stage % 10 === 0) {',
    replace: '      if (true) {',
    tests: ['event-endcheck'],
    must_mention: '已播',
  },
  {
    desc: 'M217 END 族分派循环短路守卫删除（2801 == 99 时照跑）',
    file: 'ere/event/event-endcheck.js',
    find: `  if (era_exflag.first_run_deadline !== 99) {
    for (let local = 2; local < 16; local += 1) {`,
    replace: `  {
    for (let local = 2; local < 16; local += 1) {`,
    tests: ['event-endcheck'],
    must_mention: '整体短路',
  },
  {
    desc: 'M218 END 族声明空间丢族 15（葵希罗错位读点从合法缺失变空间外）',
    file: 'ere/event/ending-family.js',
    find: '  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],',
    replace: '  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],',
    tests: ['event-endcheck'],
    must_mention: '不在声明的编号空间内',
  },
  {
    desc: 'M219 ENDING_N 门槛丢 DAY 守卫（99 已定即每天调演出）',
    file: 'ere/event/event-endcheck.js',
    find: '  if (era_exflag.first_run_deadline === 99 && era_flag.day_count === 500) {',
    replace: '  if (era_exflag.first_run_deadline === 99) {',
    tests: ['event-endcheck'],
    must_mention:
      'ENDING_N：2801 == 99 且 DAY == 500 才调用（#404 起演出真身），否则不出现',
  },
  {
    desc: 'M242 FLAG:26 数组槽序颠倒（低位在前改高位在前——var_writes 全量断言红，#138 的数组承载）',
    file: 'ere/event/event-first.js',
    find: '  game.chara.种族年龄设定_0 = [11, 115, 431, 325, 15, 232];',
    replace: '  game.chara.种族年龄设定_0 = [232, 15, 325, 431, 115, 11];',
    tests: ['event-first'],
    must_mention: 'flag:26',
  },
  {
    desc: 'M254 钩子的 EX_TALENT:MASTER:200 写入被拆（DATA_FIX 三行之一，魔王高贵标识）',
    file: 'ere/event/event-load.js',
    find: `      if (cid === 0) {
        // EX_TALENT:200 = 魔王（高贵标识）
        era.set('ex_talent:0:200', 1);
      }`,
    replace: `      // 变异：魔王标识写入被拆`,
    tests: ['event-load', 'page-save-load'],
    must_mention:
      'EX_TALENT:MASTER:200 = 1（魔王高贵标识，DATA_FIX 170205 段）',
  },
  {
    desc: 'M255 钩子的 MAXBASE 下限钳制被拆（DATA_FIX 三行之二与三——读入存档的低上限不被兜回）',
    file: 'ere/event/event-load.js',
    find: `      if ((era.get(\`maxbase:\${cid}:0\`) || 0) < 600) {
        era.set(\`maxbase:\${cid}:0\`, 600);
      }
      if ((era.get(\`maxbase:\${cid}:1\`) || 0) < 100) {
        era.set(\`maxbase:\${cid}:1\`, 100);
      }`,
    replace: `      // 变异：MAXBASE 钳制被拆`,
    tests: ['event-load', 'page-save-load'],
    must_mention: '体力上限 < 600 → 600',
  },
  {
    desc: 'M252 自动存档被拆（EVENT_NEWDAY 入口不再写 99 号槽，#137/ADR-0006 的有意偏离）',
    file: 'ere/event/event-nextday.js',
    find: `  // 自动存档进 99 号槽（行为边界与有意取舍见 page-save-load.js 的
  // auto_save：备注带「自动」前缀、不 push LASTSAVE_NO、无输出）
  await auto_save();`,
    replace: `  // 变异：自动存档被拆`,
    tests: ['event-nextday'],
    must_mention: '自动存档必须写 99 号槽（原作留白，ADR-0006）',
  },
  // —— #148 quit 的 throw 型控制流（夹具镜像 + ere 侧哨兵机制拆除）——
  {
    desc: 'M274 ENDING_1 的 quit 调用被拆、哨兵复辟（#148 前旧形态：return 1 短路）',
    file: 'ere/event/event-ending.js',
    find: `      // 函数不再返回，1:1）；夹具同款 throw（era-fixture.js），测试可证
      era.quit();`,
    replace: `      // 函数不再返回，1:1）；夹具同款 throw（era-fixture.js），测试可证
      return 1; // 变异：quit 调用被拆，哨兵复辟（#148 前旧形态）`,
    tests: ['event-ending'],
    must_mention: 'QUIT 的异常炸穿 invasion_check',
  },
  {
    desc: 'M275 INVASION_CHECK 吞掉 QUIT 异常（调用链上不得 try/catch 拦截炸穿）',
    file: 'ere/page/page-invasion.js',
    find: '    await ending_1();',
    replace: `    try {
      await ending_1(); // 变异：吞掉 QUIT 异常，威望 +10 照走
    } catch (e) {}`,
    tests: ['event-ending'],
    // 变异下吞掉异常 → run_check 正常 resolve → 用例第一条断言（炸穿在
    // 场）先红，威望断言不再执行——must_mention 取先红断言的消息片段
    must_mention: 'QUIT 的异常炸穿 invasion_check',
  },
  // —— #171 H2 勇者来袭（ere/event/enter-enemy.js 与其接线）——
  {
    // 反向变异（#116 的 M214/M218 先例）：把被汉化版注释掉、1:1 保留为
    // 死注释的月末守卫「修好」——钉住用例证明原作现状是「月末也照来」
    desc: 'M348 月末守卫被修好（死注释复活成活代码——原作现状是每日来袭）',
    file: 'ere/event/enter-enemy.js',
    find: `  // :7-8 LOCAL = 10（原 RAND:10 + 20 被写死）——原作现状，#14 登记，勿修
  // :10-13 月末才来的守卫（SIF DAY:2 > LOCAL && ARG:0 == 0 && FLAG:60 < 300
  //   → RETURN 0）在汉化版里被整段注释掉，1:1 保持死注释不移植（钉住
  //   用例证明「月末也照来」，反向变异条目防守「修好」它的手滑）`,
    replace: `  const local_month = 10; // 变异：月末守卫复活
  if (
    era_flag.date > local_month &&
    arg0 === 0 &&
    (era.get('flag:60') || 0) < 300
  ) {
    return 0; // 变异：原作现状是这段被注释掉、每日都来
  }`,
    tests: ['enter-enemy'],
    must_mention: '月末守卫已死：日 28 仍每日来袭',
  },
  {
    desc: 'M349 人数上限分支①的线从 60 抬到 61（61 人不再拦）',
    file: 'ere/event/enter-enemy.js',
    find: '  if (f(82) === 0 && charanum > 60) {',
    replace: '  if (f(82) === 0 && charanum > 61) {',
    tests: ['enter-enemy'],
    // must_mention 取静态锚用例**会红的那条**断言消息：变异下 ret 仍为 0
    // （61 人走到恐惧早退也返回 0），第一条断言通过不打印；红的是第二条
    // （零输出——恐惧早退会打文本），消息只在该断言失败时出现
    must_mention:
      '上限拦截零输出——61 人里 1 号恰在场，若走到选号段会打出恐惧早退文本',
  },
  {
    desc: 'M350 恐惧早退被拆（演出文本与 RETURN 0 全没了）',
    file: 'ere/event/enter-enemy.js',
    find: `    era.print('出于对魔王的恐惧，勇者没有出现。');
    await era.waitAnyKey();
    return 0;`,
    replace: '    return 1; // 变异：恐惧早退被拆',
    tests: ['enter-enemy'],
    // 变异下用例第一条断言（ret）先红，文本断言不再执行——must_mention
    // 取先红断言的消息（M275 先例）
    must_mention: 'RETURN 0（早退）',
  },
  {
    desc: 'M351 初期金钱的高人气加算改坏（+1000 → +100）',
    file: 'ere/event/enter-enemy.js',
    find: '    money += 1000; // :111-112 高人气ボーナス',
    replace: '    money += 100; // 变异：高人气加算改坏',
    tests: ['enter-enemy'],
    must_mention: '高人气 +1000（含等级 1）',
  },
  {
    desc: 'M352 初期金钱下限钳制删（负赠与全额入账）',
    file: 'ere/event/enter-enemy.js',
    find: `  if (money <= 0) {
    money = 0; // :131 对于不受欢迎的勇者（本次赠与额下限 0）
  }`,
    replace: '  // 变异：下限钳制删',
    tests: ['enter-enemy'],
    must_mention: '对于不受欢迎的勇者（:131）',
  },
  {
    desc: 'M353 初期座標写入删（死变量也 1:1 保留——裁定 5 的 H12 前置）',
    file: 'ere/event/enter-enemy.js',
    find: `  const [pos_x, pos_y] = roll_initial_position(rand_n);
  era.set(\`cflag:\${a}:510\`, pos_x); // event 域内直写
  era.set(\`cflag:\${a}:511\`, pos_y);`,
    replace: '  // 变异：座標写入删',
    tests: ['enter-enemy'],
    must_mention: 'CFLAG:A:510 座標 X',
  },
  {
    desc: 'M354 K_34 的 CFLAG:A:1 = 2 改 0（替身不侵攻）',
    file: 'ere/event/enter-enemy.js',
    find: '  chara(a).invasion.状态 = 2; // :299',
    replace: '  chara(a).invasion.状态 = 0; // 变异：不侵攻',
    tests: ['enter-enemy'],
    must_mention: 'CFLAG:A:1 = 2（:299）',
  },
  {
    desc: 'M355 GET_ENEMY 的 CFLAG:A:1 = 0 改 2（俘虏变侵攻中）',
    file: 'ere/event/enter-enemy.js',
    find: '  chara(a).invasion.状态 = 0; // :384 CFLAG:A:1 = 0（与主体的 2 相对）',
    replace: '  chara(a).invasion.状态 = 2; // 变异：俘虏变侵攻',
    tests: ['enter-enemy'],
    must_mention: 'CFLAG:A:1 = 0——俘虏不侵攻（:384）',
  },
  {
    desc: 'M356 EVENTTURNEND 的 :93 调用点被拆（日推进不再来袭）',
    file: 'ere/event/event-turnend.js',
    find: `      // :93 随机遇敌的第一件（参数 0；#171 起为真身 ere/event/enter-enemy.js）
      await enter_enemy_mod.enter_enemy(0);`,
    replace: '      // 变异：ENTER_ENEMY 调用被拆',
    tests: ['enter-enemy'],
    must_mention: ':93 CALL ENTER_ENEMY,0 经日推进真跑（勇者入队）',
  },
  // —— #173（H4）：ENDING_2 真身（M440-M445）——
  {
    desc: 'M440 ENDING_2 的 QUIT 降格为普通返回（quit() → return 0）',
    file: 'ere/event/event-ending.js',
    find: `  era.quit();
}`,
    replace: `  return 0; // 变异：QUIT 降格为返回值
}`,
    tests: ['event-ending', 'dungeon-main', 'event-ending2-e2e'],
    must_mention: 'QUIT 的异常从 ending_2 炸出',
  },
  {
    desc: 'M441 ENDING_2 封印播报的名字写死 0（%SAVESTR:TARGET% 不取指针）',
    file: 'ere/event/event-ending.js',
    find: "  const target_name = era.get(`callname:${era_flag.target}:-1`) ?? '';",
    replace:
      "  const target_name = era.get(`callname:0:-1`) ?? ''; // 变异：写死 0",
    tests: ['event-ending'],
    must_mention: '封印播报随 TARGET 指针取名',
  },
  {
    desc: 'M442 ENDING_2 的 GAMEOVER 分隔行删除（:54）',
    file: 'ere/event/event-ending.js',
    find: `  era.print(
    '-------------------------------GAMEOVER---------------------------------',
  );`,
    replace: '  // 变异：GAMEOVER 分隔行删',
    tests: ['event-ending', 'event-ending2-e2e'],
    must_mention: 'GAMEOVER 分隔行',
  },
  {
    desc: 'M443 ENDING_2 横幅末行删除（:49「带着一丝不易察觉的微笑……」）',
    file: 'ere/event/event-ending.js',
    find: "  era.print('｜　　　带着一丝不易察觉的微笑，再次陷入了封印的沉睡之中　　｜');",
    replace: '  // 变异：横幅末行删',
    tests: ['event-ending', 'event-ending2-e2e'],
    must_mention: '横幅末行',
  },
  {
    desc: 'M444 ENDING_2 的仪式性 INPUT 删除（:55）',
    file: 'ere/event/event-ending.js',
    find: `  // :55 INPUT——确认用，结果不被消费（QUIT 之后无读者）
  await era.input();`,
    replace: '  // 变异：INPUT 删（演出不等确认直接 QUIT）',
    tests: ['event-ending'],
    must_mention: 'INPUT 恰一次在 QUIT 之前',
  },
  {
    desc: 'M445 ENDING_2 封印播报的读键删除（PRINTFORMW 不等键，:52）',
    file: 'ere/event/event-ending.js',
    find: '  await era.waitAnyKey(); // PRINTFORMW 的读键',
    replace: '  // 变异：PRINTFORMW 的读键删',
    tests: ['event-ending'],
    must_mention: 'PRINTFORMW 读键在前',
  },
  // —— #221 J11：SYSTEM_SOURCE 的对象避孕套与膣内射精计数 ——
  {
    desc: 'M1100 SOURCE_CHECK 对象避孕套前置清 TFLAG:10 删（逆侵犯误计数）（#221）',
    file: 'ere/event/source-check.js',
    find: `  if (chara(cid).train.对象避孕套 && tflag(10)) {
    era.print(\`射在避孕套里（\${era.get(\`callname:\${cid}:-2\`) ?? ''}）\`);
    chara(cid).train.对象避孕套 = 0;
    game.system.对象射精 = 0;
  }`,
    replace: '  // 变异：对象避孕套不在内射链前清 TFLAG:10',
    tests: ['source-check'],
    must_mention: '阻止同回合逆侵犯计数',
  },
  {
    desc: 'M1101 SOURCE_CHECK 兽奸臂提前到 3P 主人前（优先链错序）（#221）',
    file: 'ere/event/source-check.js',
    find: `    } else if (tflag(2) && tflag(40) === 1) {
      chara(cid).system.主人膣内射精 += tflag(38);
    } else if (era.get(\`tequip:\${cid}:89\`) && tflag(16)) {
      chara(cid).dungeon.犬膣内射精 += tflag(16);`,
    replace: `    } else if (era.get(\`tequip:\${cid}:89\`) && tflag(16)) {
      chara(cid).dungeon.犬膣内射精 += tflag(16);
    } else if (tflag(2) && tflag(40) === 1) {
      chara(cid).system.主人膣内射精 += tflag(38);`,
    tests: ['source-check'],
    must_mention: '3P 主人优先于兽奸',
  },
  // —— #347 L16：MUSEUM 博物馆处刑 ——
  {
    desc: 'M6942 MUSEUM 魔王保护：删掉 A=0 的提前返回',
    file: 'ere/event/event-museum.js',
    find: '  if (a === 0) return 0;',
    replace: '  if (false) return 0;',
    tests: ['event-museum'],
    must_mention: '魔王不能成为展品',
  },
  {
    desc: 'M6943 MUSEUM 家具分类：FLAG:608 错记到画像计数',
    file: 'ere/event/event-museum.js',
    find: '    game.event.家具数 += 1;',
    replace: '    game.event.绘画数 += 1;',
    tests: ['event-museum'],
    must_mention: '十类展品各写正确名称与分类计数',
  },
  {
    desc: 'M6944 MUSEUM 录像标题：SUISEI_STR:A 丢失展品名',
    file: 'ere/event/event-museum.js',
    find: '  era.set(`videoarchive:${a}`, archive_title);',
    replace: "  era.set(`videoarchive:${a}`, '');",
    tests: ['event-museum'],
    must_mention: '家具化后记录展品',
  },
  {
    desc: 'M6945 MUSEUM 录像归档：漏调 VIDEO_MATURO',
    file: 'ere/event/event-museum.js',
    find: '  video_maturo(a);',
    replace: '  // 变异：漏调 VIDEO_MATURO',
    tests: ['event-museum'],
    must_mention: '家具化后记录展品',
  },
  {
    desc: 'M6946 MUSEUM 角色处置：漏掉 DELCHARA 等价调用',
    file: 'ere/event/event-museum.js',
    find: '  era.removeCharacter(a);',
    replace: '  // 变异：角色未除名',
    tests: ['event-museum'],
    must_mention: '家具化后记录展品',
  },
  {
    desc: 'M6947 MUSEUM 经验结算：漏加魔王战斗经验',
    file: 'ere/event/event-museum.js',
    find: '  chara(0).dungeon.战斗经验 += lv;',
    replace: '  // 变异：漏加战斗经验',
    tests: ['event-museum'],
    must_mention: '家具化后记录展品',
  },
  {
    desc: 'M6948 MUSEUM 造型王：60 日前边界错成 59 日前',
    file: 'ere/event/event-museum.js',
    find: 'era_flag.day_count < 60',
    replace: 'era_flag.day_count < 59',
    tests: ['event-museum'],
    must_mention: '家族末路、装备回收、威望与造型王实绩',
  },
  {
    desc: 'M6949 MUSEUM 装备回收：回收后槽位未置 -1',
    file: 'ere/event/event-museum.js',
    find: '    owner[field] = -1;',
    replace: '    owner[field] = 0;',
    tests: ['event-museum'],
    must_mention: '家族末路、装备回收、威望与造型王实绩',
  },
  {
    desc: 'M6950 MUSEUM 输入校验：错误接受越界选项 10',
    file: 'ere/event/event-museum.js',
    find: '  } while (result < 0 || (result >= 10 && result !== 100));',
    replace: '  } while (result < 0 || (result > 10 && result !== 100));',
    tests: ['event-museum'],
    must_mention: '拒绝范围外输入',
  },
  {
    desc: 'M6951 MUSEUM 口上分发：把性格处理器编号误写成角色 ID',
    file: 'ere/event/event-museum.js',
    find: '  await museum_koujo(a, result, rand_n);',
    replace: '  await museum_koujo(result, result, rand_n);',
    tests: ['event-museum'],
    must_mention: '按角色性格分发口上',
  },
  {
    desc: 'M6952 MUSEUM PRINTFORM：家具变形片段被拆成独立行',
    file: 'ere/event/event-museum.js',
    find: '    await era.printAndWait(`${line}的样子。`);',
    replace: "    await era.printAndWait('的样子。');",
    tests: ['event-museum'],
    must_mention: '连续 PRINTFORM 片段必须留在同一输出行',
  },
  {
    desc: 'M6953 MUSEUM 宝石支：错误清空函数静态 LOCALS',
    file: 'ere/event/event-museum.js',
    find: '    game.event.金属像数_2 += 1;',
    replace: `    game.event.金属像数_2 += 1;
    locals = '';`,
    tests: ['event-museum'],
    must_mention: '保留原作 LOCALS 跨调用残值',
  },
  {
    desc: 'M6954 MUSEUM 隐藏输入：错误启用按钮规则而拒绝 100',
    file: 'ere/event/event-museum.js',
    find: '    result = await era.input({ useRule: false });',
    replace: '    result = await era.input();',
    tests: ['event-museum'],
    must_mention: '保留原作隐藏输入 100',
  },
  {
    desc: 'M6955 MUSEUM K2 口上：漏注册博物馆处理器',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: 'museum_koujo_family.register(2, museum_koujo_k2);',
    replace: '// 变异：K2 博物馆口上未注册',
    tests: ['event-museum'],
    must_mention: 'K2 与 K4 口上模块注册博物馆处理器',
  },
  {
    desc: 'M6956 MUSEUM K4 口上：漏注册博物馆处理器',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: 'museum_koujo_family.register(4, museum_koujo_k4);',
    replace: '// 变异：K4 博物馆口上未注册',
    tests: ['event-museum'],
    must_mention: 'K2 与 K4 口上模块注册博物馆处理器',
  },
  {
    desc: 'M6957 MUSEUM 石像材质：ELSEIF 漏掉第二次 RAND',
    file: 'ere/event/event-museum.js',
    find: '    } else if (rand_n(3) === 1) {',
    replace: '    } else if (false) {',
    tests: ['event-museum'],
    must_mention: '原作 ELSEIF 会重新掷 RAND',
  },
  {
    desc: 'M6958 MUSEUM 隐藏输入：错误清空函数静态 MATURO',
    file: 'ere/event/event-museum.js',
    find: `  const target = a;
  const family_id = search_family(a);`,
    replace: `  const target = a;
  maturo = '';
  const family_id = search_family(a);`,
    tests: ['event-museum'],
    must_mention: '隐藏输入 100 继承原作 MATURO 静态残值',
  },
  {
    desc: 'M6959 MUSEUM 装备回收：漏掉第二装饰槽',
    file: 'ere/event/event-museum.js',
    find: "    [target_chara.event, '装饰2'],",
    replace: '    // 变异：漏回收 CFLAG:552 装饰2',
    tests: ['event-museum'],
    must_mention: '装饰2退回库存',
  },
  {
    desc: 'M6960 MUSEUM 造型王：错误把双倍显示值计入实际经验',
    file: 'ere/event/event-museum.js',
    find: `  chara(0).dungeon.战斗经验 += lv;
  // TALENT:329 = 造型王实绩；原作先加经验再翻倍显示值，顺序 1:1 保留。
  if (get('talent:0:329')) lv *= 2;`,
    replace: `  if (get('talent:0:329')) lv *= 2;
  chara(0).dungeon.战斗经验 += lv;`,
    tests: ['event-museum'],
    must_mention: '已有造型王只翻倍显示经验',
  },
  {
    desc: 'M6961 MUSEUM 反抗口上：反抗刻印 Lv3 错判为 Lv2',
    file: 'ere/event/event-museum.js',
    find: `        locals = '射精';

        if (get(\`talent:\${a}:130\`)) {
          await era.printAndWait(
            \`稍微一碰就会喷出母乳的\${chara_callname(a)}的乳首也被变换、从勃起的尖端喷出了水…\`,
          );
          locals += '喷乳';
        }

        if (
          get(\`mark:\${target}:3\`) === 3 &&
          (get(\`talent:\${a}:11\`) ||`,
    replace: `        locals = '射精';

        if (get(\`talent:\${a}:130\`)) {
          await era.printAndWait(
            \`稍微一碰就会喷出母乳的\${chara_callname(a)}的乳首也被变换、从勃起的尖端喷出了水…\`,
          );
          locals += '喷乳';
        }

        if (
          get(\`mark:\${target}:3\`) === 2 &&
          (get(\`talent:\${a}:11\`) ||`,
    tests: ['event-museum'],
    must_mention: '反抗刻印 3 与反抗素质进入叛逆口上',
  },
  {
    desc: 'M6962 MUSEUM 金属像：漏加装饰品总数',
    file: 'ere/event/event-museum.js',
    find: `  } else if (game.event.博物馆口上 === 7) {
    game.event.装饰品数 += 1;`,
    replace: `  } else if (game.event.博物馆口上 === 7) {
    game.event.装饰品数 += 0;`,
    tests: ['event-museum'],
    must_mention: '金属像分支增加装饰品总数',
  },
  {
    desc: 'M7928 SABBATH：CFLAG:1（调教状态）守卫判据改成恒假，非调教态角色也能触发',
    file: 'ere/event/event-sabbath.js',
    find: '  if (cflag(cid, 1) !== 0) {',
    replace: '  if (cflag(cid, 1) === 999) {',
    tests: ['event-sabbath'],
    must_mention: '非调教状态',
  },
  {
    desc: 'M7929 SABBATH：满月日期窗口右端多放一天（16 日也算满月）',
    file: 'ere/event/event-sabbath.js',
    find: '  if (era_flag.date <= 14 || era_flag.date >= 16) {',
    replace: '  if (era_flag.date <= 14 || era_flag.date >= 17) {',
    tests: ['event-sabbath'],
    must_mention: '非满月',
  },
  {
    desc: 'M7930 SABBATH_DAY：信仰值门槛 40 误写成 4',
    file: 'ere/event/event-sabbath.js',
    find: '  if (cflag(cid, 152) < 40) {',
    replace: '  if (cflag(cid, 152) < 4) {',
    tests: ['event-sabbath'],
    must_mention: '信仰值不足 40',
  },
  {
    desc: 'M7931 EVENT_CHARA_LEAVE：清空上次调教对象引用的判据被拆（FLAG:1 恒不清）',
    file: 'ere/event/event-chara-leave.js',
    find: "  if (get('flag:1') === cid) {",
    replace: "  if (get('flag:1') === -cid) {",
    tests: ['event-chara-leave'],
    must_mention: '清空上次调教对象',
  },
  {
    desc: 'M7932 EVENT_CHARA_RETURN：ST_UP 补级次数少算一级',
    file: 'ere/event/event-chara-leave.js',
    find: '    const times = setlv - level;',
    replace: '    const times = setlv - level - 1;',
    tests: ['event-chara-leave'],
    must_mention: '差 3 级，ST_UP 补足 3 次',
  },
  {
    desc: 'M7933 EVENT_CHARA_RETURN：身体数据生成存根守卫判据取反',
    file: 'ere/event/event-chara-leave.js',
    find: '  if (get(`cflag:${cid}:451`) === 0) {',
    replace: '  if (get(`cflag:${cid}:451`) === 1) {',
    tests: ['event-chara-leave'],
    must_mention:
      'EVENT_CHARA_RETURN：身体数据未生成（CFLAG:451==0）时调真身生成（#385）',
  },
  {
    desc: 'M7934 APHRODISIAC_ADDICT：7 日一次的残留度衰减改成 8 日一次',
    file: 'ere/event/event-addict.js',
    find: '  if ((era_flag.day_count + 1) % 7 === 0) {',
    replace: '  if ((era_flag.day_count + 1) % 8 === 0) {',
    tests: ['event-addict'],
    must_mention: '第 7 日残留度 -1',
  },
  {
    desc: 'M7935 APHRODISIAC_ADDICT：媚药中毒取得普通门槛 12 误写成 13',
    file: 'ere/event/event-addict.js',
    find: `    ((talent(cid, 86) === 0 && cflag(cid, 31) >= 12) ||\n      (talent(cid, 72) && cflag(cid, 31) >= 9)) &&`,
    replace: `    ((talent(cid, 86) === 0 && cflag(cid, 31) >= 13) ||\n      (talent(cid, 72) && cflag(cid, 31) >= 9)) &&`,
    tests: ['event-addict'],
    must_mention: '取得媚药中毒——普通门槛 12',
  },
  {
    desc: 'M7936 PRECIPITATE_WITHDRAWAL：侵攻中无媚药退出分支判据改判 CFLAG:1 == 3',
    file: 'ere/event/event-addict.js',
    find: '  // :115-122 侵攻中角色：无媚药可用，独自捱过症状后退出本轮\n  if (cflag(cid, 1) === 2) {',
    replace:
      '  // :115-122 侵攻中角色：无媚药可用，独自捱过症状后退出本轮\n  if (cflag(cid, 1) === 3) {',
    tests: ['event-addict'],
    must_mention: '侵攻中角色（无媚药）独自捱过',
  },
  {
    desc: 'M7937 CHECK_SPECIALSKIL：cid 在场判据取反（不在场的反而放行）',
    file: 'ere/event/get-specialtalent.js',
    find: '  if (!era.getAddedCharacters().includes(cid)) {',
    replace: '  if (era.getAddedCharacters().includes(cid)) {',
    tests: ['event-get-specialtalent'],
    must_mention: 'cid 不在已加入角色列表时直接跳过',
  },
  {
    desc: 'M7938 CHECK_SPECIALSKIL：TALENT:9（崩坏）守卫判据被拆（崩坏角色也跑 STEP1/STEP2）',
    file: 'ere/event/get-specialtalent.js',
    find: '  if (talent(cid, 9)) {',
    replace: '  if (false && talent(cid, 9)) {',
    tests: ['event-get-specialtalent'],
    must_mention: 'TALENT:9（崩坏）时只跑体变检查',
  },
  {
    desc: 'M7939 step1：顺从 Lv5 达成门槛 CFLAG:2>=2000 误写成 2001',
    file: 'ere/event/get-specialtalent.js',
    find: '    cflag(cid, 2) >= 2000 &&\n    cflag(cid, 0) < 2 &&',
    replace: '    cflag(cid, 2) >= 2001 &&\n    cflag(cid, 0) < 2 &&',
    tests: ['event-get-specialtalent'],
    must_mention: '且未助手化时顺从达 Lv5',
  },
  {
    desc: 'M7940 semen_liking：已持有喜欢精液的早退守卫判据被拆（重复触发）',
    file: 'ere/event/get-specialtalent.js',
    find: '  if (talent(cid, 47) !== 0) {',
    replace: '  if (talent(cid, 47) === 0) {',
    tests: ['event-get-specialtalent'],
    must_mention: '已持有喜欢精液时不重复触发',
  },
  {
    desc: 'M7941 forced_semen_liking：TFLAG:110/seiin 双门判据被拆成恒真',
    file: 'ere/event/get-specialtalent.js',
    find: '  if (!seiin || !game.event.精爱味觉 || talent(cid, 47) !== 0) {',
    replace: '  if (false) {',
    tests: ['event-get-specialtalent'],
    must_mention: 'TFLAG:110 为假时跳过',
  },

  // —— #404（N20）结局链：四条角色线状态机 + 65 个 @END<n> 数据表 + 演出 ——
  {
    desc: 'M8196 ENDCHECKSQUARE 起步档：好感门槛 2000 误写成 2001',
    file: 'ere/event/event-endcheck.js',
    find: `  const love = talent(85) === 1;
  if (love && cflag(2) >= 2000 && stage < 10) {
    era_exflag.route_22 = 10; // :158 起步`,
    replace: `  const love = talent(85) === 1;
  if (love && cflag(2) >= 2001 && stage < 10) {
    era_exflag.route_22 = 10; // :158 起步`,
    tests: ['event-ending'],
    must_mention: '恋慕阶梯',
  },
  {
    desc: 'M8197 ENDCHECKSQUARE 30→40 档：ABL 攻+敏门槛 14 误写成 15',
    file: 'ere/event/event-endcheck.js',
    find: `    if (love && get(\`abl:\${cid}:10\`) + get(\`abl:\${cid}:16\`) >= 14) {
      era_exflag.route_22 = 40;`,
    replace: `    if (love && get(\`abl:\${cid}:10\`) + get(\`abl:\${cid}:16\`) >= 15) {
      era_exflag.route_22 = 40;`,
    tests: ['event-ending'],
    must_mention: '恋慕阶梯',
  },
  {
    desc: 'M8198 ENDCHECKSQUARE 300 档：RAND:5 命中判据 === 0 改成 === 1',
    file: 'ere/event/event-endcheck.js',
    find: `    if (rand(5) === 0) {
      era_exflag.route_22 = era_exflag.route_22 + 10;`,
    replace: `    if (rand(5) === 1) {
      era_exflag.route_22 = era_exflag.route_22 + 10;`,
    tests: ['event-ending'],
    must_mention: '恋慕阶梯',
  },
  {
    desc: 'M8199 ENDCHECKSQUARE 40→50 档：计数器门槛 10 误写成 11',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 40 && stage < 50) {
    if (love && cflag(515) >= 10) {
      era_exflag.route_22 = 50; // :170-171`,
    replace: `  } else if (stage >= 40 && stage < 50) {
    if (love && cflag(515) >= 11) {
      era_exflag.route_22 = 50; // :170-171`,
    tests: ['event-ending'],
    must_mention: '恋慕阶梯',
  },
  {
    desc: 'M8200 ENDCHECKSQUARE 淫乱互换重置：300-310 区间上界改成 311',
    file: 'ere/event/event-endcheck.js',
    find: '      (era_exflag.route_22 >= 300 && era_exflag.route_22 <= 310))',
    replace:
      '      (era_exflag.route_22 >= 300 && era_exflag.route_22 <= 311))',
    tests: ['event-ending'],
    must_mention: '素质互换重置',
  },
  {
    desc: 'M8201 ENDCHECKSPADE 乳业收入：门槛 151 误写成 152',
    file: 'ere/event/event-endcheck.js',
    find: '  if (era_exflag.route_21 >= 151) {',
    replace: '  if (era_exflag.route_21 >= 152) {',
    tests: ['event-ending'],
    must_mention: '151 档乳业收入',
  },
  {
    desc: 'M8202 ENDCHECKSPADE 乳业收入：档位基数 140 误写成 141',
    file: 'ere/event/event-endcheck.js',
    find: '      Math.trunc((era_exflag.route_21 - 140) / 10) * (rand(200) + 200);',
    replace:
      '      Math.trunc((era_exflag.route_21 - 141) / 10) * (rand(200) + 200);',
    tests: ['event-ending'],
    must_mention: '151 档乳业收入',
  },
  {
    desc: 'M8203 ENDCHECKSPADE 乳业收入：RAND:200 的上界改 201',
    file: 'ere/event/event-endcheck.js',
    find: '      Math.trunc((era_exflag.route_21 - 140) / 10) * (rand(200) + 200);',
    replace:
      '      Math.trunc((era_exflag.route_21 - 140) / 10) * (rand(201) + 200);',
    tests: ['event-ending'],
    must_mention: '151 档乳业收入',
  },
  {
    desc: 'M8204 ENDCHECKSPADE 淫乱 120-130 档：计数器门槛 2 误写成 3',
    file: 'ere/event/event-endcheck.js',
    find: '    if (cflag(515) >= 2) {',
    replace: '    if (cflag(515) >= 3) {',
    tests: ['event-ending'],
    must_mention: '双阶梯表驱动',
  },
  {
    desc: 'M8205 ENDCHECKSPADE 淫乱 140 档：ABL:1 == 10 放宽成 >= 10（四条件合取被拆）',
    file: 'ere/event/event-endcheck.js',
    find: '      get(`abl:${cid}:1`) === 10 &&',
    replace: '      get(`abl:${cid}:1`) >= 10 &&',
    tests: ['event-ending'],
    must_mention: 'ABL:1/17',
  },
  {
    desc: 'M8206 ENDCHECKSPADE 恋慕 300 档：310 误写成 311',
    file: 'ere/event/event-endcheck.js',
    find: '    if (love && cflag(515) >= 10) {\n      era_exflag.route_21 = 310; // :296-297',
    replace:
      '    if (love && cflag(515) >= 10) {\n      era_exflag.route_21 = 311; // :296-297',
    tests: ['event-ending'],
    must_mention: '双阶梯表驱动',
  },
  {
    desc: 'M8207 ENDCHECKPRINCESS 初次会面：线值 10 误写成 11',
    file: 'ere/event/event-endcheck.js',
    find: `  if (get_chara(35) > 0 && era_exflag.route_35 === 0) {
    era_exflag.route_35 = 10;`,
    replace: `  if (get_chara(35) > 0 && era_exflag.route_35 === 0) {
    era_exflag.route_35 = 11;`,
    tests: ['event-ending'],
    must_mention: '初会与两阶梯',
  },
  {
    desc: 'M8208 ENDCHECKPRINCESS 崩坏态：线值 -10 误写成 -20',
    file: 'ere/event/event-endcheck.js',
    find: '      era_exflag.route_35 = -10; // 崩坏态（Bad Ending 触发源）',
    replace: '      era_exflag.route_35 = -20; // 崩坏态（Bad Ending 触发源）',
    tests: ['event-ending'],
    must_mention: 'MARK:1/2',
  },
  {
    desc: 'M8209 ENDCHECKPRINCESS 婚礼门槛：CFLAG:601 == 901 误写成 902',
    file: 'ere/event/event-endcheck.js',
    find: '    if (cflag(601) === 901) {',
    replace: '    if (cflag(601) === 902) {',
    tests: ['event-ending'],
    must_mention: '初会与两阶梯',
  },
  {
    desc: 'M8210 ENDCHECKGODNESS 110-120 档：好感上界 <= 5000 误写成 <= 5001',
    file: 'ere/event/event-endcheck.js',
    find: '    if (lust && cflag(2) <= 5000 && cflag(515) >= 70) {',
    replace: '      if (lust && cflag(2) <= 5001 && cflag(515) >= 70) {',
    tests: ['event-ending'],
    must_mention: '淫乱阶梯',
  },
  {
    desc: 'M8211 ENDCHECKGODNESS 120-130 档：好感门槛 8000 误写成 8001',
    file: 'ere/event/event-endcheck.js',
    find: '    if (lust && cflag(2) >= 8000) {',
    replace: '      if (lust && cflag(2) >= 8001) {',
    tests: ['event-ending'],
    must_mention: '淫乱阶梯',
  },
  {
    desc: 'M8212 ENDCHECKGODNESS 140-150 档：计数器门槛 150 误写成 151',
    file: 'ere/event/event-endcheck.js',
    find: `    // :102-109（计数器 >= 150 且 DAY:1 >= 350 且葵希罗在场）
    if (lust && cflag(515) >= 150) {`,
    replace: `    // :102-109（计数器 >= 150 且 DAY:1 >= 350 且葵希罗在场）
    if (lust && cflag(515) >= 151) {`,
    tests: ['event-ending'],
    must_mention: '淫乱阶梯',
  },
  {
    desc: 'M8213 ENDCHECKGODNESS 140 档：DAY:1（月份）门槛 350 误写成 351',
    file: 'ere/event/event-endcheck.js',
    find: '      if (era_flag.month >= 350 && get_chara(34)) {',
    replace: '      if (era_flag.month >= 351 && get_chara(34)) {',
    tests: ['event-ending'],
    must_mention: '淫乱阶梯',
  },
  {
    desc: 'M8216 ENDING_3 领域征服置位：FLAG:87 = 1 误写成 0（防重复触发的判据态丢了）',
    file: 'ere/event/event-ending.js',
    find: `  era_flag.elf_realm_conquered = 1;
  await char_gift(1, rand);
  era_flag.elf_realm_conquered = 2;`,
    replace: `  era_flag.elf_realm_conquered = 0;
  await char_gift(1, rand);
  era_flag.elf_realm_conquered = 2;`,
    tests: ['event-ending'],
    must_mention: 'ENDING_3/4/5',
  },
  {
    desc: 'M8217 ENDING_3 献上对象：char_gift(1) 误写成 char_gift(5)（圣女→龙族公主）',
    file: 'ere/event/event-ending.js',
    find: `  era_flag.elf_realm_conquered = 1;
  await char_gift(1, rand);`,
    replace: `  era_flag.elf_realm_conquered = 1;
  await char_gift(5, rand);`,
    tests: ['event-ending'],
    must_mention: 'ENDING_3/4/5',
  },
  {
    desc: 'M8218 ENDING_N 的 ENDINGINPUT 分档：2801 + 1000 误写成 + 2000（分档错位）',
    file: 'ere/event/event-ending.js',
    find: '  await ending_input(era_exflag.first_run_deadline + 1000);',
    replace: '  await ending_input(era_exflag.first_run_deadline + 2000);',
    tests: ['event-endcheck'],
    must_mention: 'ENDING_N',
  },
  {
    desc: 'M8219 ENDINGINPUT CASE 1 的继续分支：收尾文本被改写',
    file: 'ere/event/event-ending.js',
    find: "        era.print('魔王的传说，还将继续......'); // :934 PRINTW",
    replace: "        era.print('魔王的传说，还没有结束。'); // :934 PRINTW",
    tests: ['event-endcheck'],
    must_mention: '继续分支可见',
  },
  {
    desc: 'M8220 CHAR_GIFT 性格档位表：第 0 档 160（慈爱）误写成 161（自信家）',
    file: 'ere/event/event-ending.js',
    find: 'const CHAR_GIFT_PERSONAL = [160, 161, 162, 163, 164, 166, 172, 173];',
    replace:
      'const CHAR_GIFT_PERSONAL = [161, 161, 162, 163, 164, 166, 172, 173];',
    tests: ['event-ending'],
    must_mention: 'CHAR_GIFT 自选路线',
  },
  {
    desc: 'M8221 CHAR_GIFT 发色可选区间：上界 10 误写成 9（第 10 色不可选）',
    file: 'ere/event/event-ending.js',
    find: '      if ((picked >= 1 && picked <= 10) || picked === 11) {',
    replace: '      if ((picked >= 1 && picked <= 9) || picked === 11) {',
    tests: ['event-ending'],
    must_mention: 'CHAR_GIFT 自选路线',
  },
  {
    desc: 'M8222 CHAR_GIFT 随机贡品：RAND(1, 17) 的下界偏一格（1..16 → 2..17）',
    file: 'ere/event/event-ending.js',
    find: '      const rand_chara = rand(16) + 1;',
    replace: '      const rand_chara = rand(16) + 2;',
    tests: ['event-ending'],
    must_mention: 'CHAR_GIFT 自选路线',
  },
  {
    desc: 'M8223 CHAR_GIFT 决定键：RESULT == 100 误写成 99（决定键失效，重问）',
    file: 'ere/event/event-ending.js',
    find: `    if (result !== 100) {
      continue; // :260-261 ELSE / GOTO INPUT_LOOP_2`,
    replace: `    if (result !== 99) {
      continue; // :260-261 ELSE / GOTO INPUT_LOOP_2`,
    tests: ['event-ending'],
    must_mention: 'CHAR_GIFT 自选路线',
  },
  {
    desc: 'M8224 CHAR_GIFT 的 ARG 守卫：THROW INVALID ARGUMENT 被拆（任意 ARG 放行）',
    file: 'ere/event/event-ending.js',
    find: `  const gift = CHAR_GIFT_TABLE[arg];
  if (gift === undefined) {`,
    replace: `  const gift = CHAR_GIFT_TABLE[arg] ?? CHAR_GIFT_TABLE[1];
  if (false) {`,
    tests: ['event-ending'],
    must_mention: 'INVALID ARGUMENT',
  },
  {
    desc: 'M8225 END10_55 的嘉德线推进：+5 误写成 +6',
    file: 'ere/event/event-ending.js',
    find: '  era_exflag.route_33 = era_exflag.route_33 + 5;',
    replace: '  era_exflag.route_33 = era_exflag.route_33 + 6;',
    tests: ['event-ending'],
    must_mention: 'END10_55',
  },
  {
    desc: 'M8226 结局段插值：%SAVESTR:MASTER% 不替换（原样输出）',
    file: 'ere/event/ending-family.js',
    find: "  return text.split('%SAVESTR:MASTER%').join(name_of(0));",
    replace: '  return text;',
    tests: ['event-ending'],
    must_mention: '插值',
  },
  {
    desc: 'M8227 finish 步：< 99 的守卫放宽成 <= 99（99 时也抬档）',
    file: 'ere/event/ending-family.js',
    find: '  if (era_exflag.first_run_deadline < 99) {',
    replace: '  if (era_exflag.first_run_deadline <= 99) {',
    tests: ['event-ending'],
    must_mention: 'finish 步',
  },
  {
    desc: 'M8229 cflag_between 条件：左闭 >= 改成右开 >（区间下界被排除）',
    file: 'ere/event/ending-family.js',
    find: '    return value >= c && value < d;',
    replace: '    return value > c && value < d;',
    tests: ['event-ending'],
    must_mention: 'END10_12 分岔',
  },
  {
    desc: 'M8230 leave 步：PARTY_CHAR_DEL 的实参从 EX_FLAG:2803 改成 cid',
    file: 'ere/event/ending-family.js',
    find: '  party_char_del(era_exflag.runaway_slave_id);',
    replace: '  party_char_del(cid);',
    tests: ['event-ending'],
    must_mention: 'leave 步',
  },
  {
    desc: 'M8231 rampage 步：金库损失倍率 0.8 误写成 0.7',
    file: 'ere/event/ending-family.js',
    find: '  const after = Math.trunc(before * 0.8);',
    replace: '  const after = Math.trunc(before * 0.7);',
    tests: ['event-ending'],
    must_mention: 'rampage 步',
  },
  {
    desc: 'M8232 rampage 步：库存下限 30 误写成 31',
    file: 'ere/event/ending-family.js',
    find: '    if (stock <= 30 && monster < 190) {',
    replace: '    if (stock <= 31 && monster < 190) {',
    tests: ['event-ending'],
    must_mention: 'rampage 步',
  },
  {
    desc: 'M8233 rampage 步：190 号以下才兜底的判据改成 191',
    file: 'ere/event/ending-family.js',
    find: '    if (stock <= 30 && monster < 190) {',
    replace: '    if (stock <= 30 && monster < 191) {',
    tests: ['event-ending'],
    must_mention: 'rampage 步',
  },
  {
    desc: 'M8234 rampage 步：怪物库存的 FOR 下界 100 误写成 101',
    file: 'ere/event/ending-family.js',
    find: '  for (let monster = 100; monster < 200; monster += 1) {',
    replace: '  for (let monster = 101; monster < 200; monster += 1) {',
    tests: ['event-ending'],
    must_mention: 'rampage 步',
  },
  {
    desc: 'M8235 数据表 END7_1 首行文本：改写一个字（保真锁应对源 ERB）',
    file: 'ere/data/ending-scripts.js',
    find: "          '菲娅在床上迷糊的看着四周……似乎还没有对自己身上发生的事情有所认知……',",
    replace:
      "          '菲娅在床上迷糊的看着周围……似乎还没有对自己身上发生的事情有所认知……',",
    tests: ['event-ending'],
    must_mention: '保真锁',
  },
  {
    desc: 'M8236 数据表 END10_12 的 after 条件：CFLAG 下界 3000 误写成 3001',
    file: 'ere/data/ending-scripts.js',
    find: "                    ['cflag_between', 33, 2, 3000, 5000],",
    replace: "                    ['cflag_between', 33, 2, 3001, 5000],",
    tests: ['event-ending'],
    must_mention: 'END10_12 分岔',
  },
  {
    desc: 'M8237 数据表 END10_54 的对齐步：CENTER 误写成 LEFT',
    file: 'ere/data/ending-scripts.js',
    find: "        ['align', 'center'],",
    replace: "        ['align', 'left'],",
    tests: ['event-ending'],
    must_mention: 'ALIGNMENT',
  },
  {
    desc: 'M8238 数据表 END14_1 的收尾：EX_FLAG:2814 += 1 误写成 += 2',
    file: 'ere/data/ending-scripts.js',
    find: `        ['w', '看来真正信任她的日子并不像%SAVESTR:MASTER%想象的那么遥远'],
        ['exflag', 2814, 1],`,
    replace: `        ['w', '看来真正信任她的日子并不像%SAVESTR:MASTER%想象的那么遥远'],
        ['exflag', 2814, 2],`,
    tests: ['event-ending'],
    must_mention: '效果表驱动：每段收尾',
  },

  // —— #404 返工：四条 ENDCHECK 阶梯的**档位区间边界** ——
  {
    desc: 'M8239 ENDCHECKSQUARE 起步门区间：stage < 10 误写成 < 11（10 档被起步门抢走）',
    file: 'ere/event/event-endcheck.js',
    find: `  if (love && cflag(2) >= 2000 && stage < 10) {
    era_exflag.route_22 = 10; // :158 起步`,
    replace: `  if (love && cflag(2) >= 2000 && stage < 11) {
    era_exflag.route_22 = 10; // :158 起步`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKSQUARE 档位区间',
  },
  {
    desc: 'M8240 ENDCHECKSQUARE 10-20 档下界：stage >= 10 误写成 >= 11（10 落空）',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 10 && stage < 20) {
    if (love && cflag(2) >= 5000) {
      era_exflag.route_22 = 20;`,
    replace: `  } else if (stage >= 11 && stage < 20) {
    if (love && cflag(2) >= 5000) {
      era_exflag.route_22 = 20;`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKSQUARE 档位区间',
  },
  {
    desc: 'M8241 ENDCHECKSQUARE 20-30 档上界：stage < 30 误写成 < 31（30 被上一档抢走）',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 20 && stage < 30) {
    if (love && cflag(2) >= 10000) {
      era_exflag.route_22 = 30;`,
    replace: `  } else if (stage >= 20 && stage < 31) {
    if (love && cflag(2) >= 10000) {
      era_exflag.route_22 = 30;`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKSQUARE 档位区间',
  },
  {
    desc: 'M8242 ENDCHECKSQUARE 30-40 档下界：stage >= 30 误写成 >= 31（30 落空、计数器不清零）',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 30 && stage < 40) {
    // :166-168`,
    replace: `  } else if (stage >= 31 && stage < 40) {
    // :166-168`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKSQUARE 档位区间',
  },
  {
    desc: 'M8243 ENDCHECKSQUARE 80-90 档上界：stage < 90 误写成 < 91（90 被上一档抢走）',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 80 && stage < 90) {
    if (love && cflag(515) >= 150) {
      era_exflag.route_22 = 90;`,
    replace: `  } else if (stage >= 80 && stage < 91) {
    if (love && cflag(515) >= 150) {
      era_exflag.route_22 = 90;`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKSQUARE 档位区间',
  },
  {
    desc: 'M8244 ENDCHECKSQUARE 300 档：stage === 300 误写成 === 301（299 与 300 都不动）',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage === 300) {
    // :199-206`,
    replace: `  } else if (stage === 301) {
    // :199-206`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKSQUARE 档位区间',
  },
  {
    desc: 'M8245 ENDCHECKSPADE 恋慕起步门：stage < 10 误写成 < 11',
    file: 'ere/event/event-endcheck.js',
    find: `  if (love && cflag(2) >= 2000 && stage < 10) {
    era_exflag.route_21 = 10; // :254 起步`,
    replace: `  if (love && cflag(2) >= 2000 && stage < 11) {
    era_exflag.route_21 = 10; // :254 起步`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKSPADE 档位区间',
  },
  {
    desc: 'M8246 ENDCHECKSPADE 恋慕 40-50 档下界：stage >= 40 误写成 >= 41',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 40 && stage < 50) {
    if (love && cflag(515) >= 10) {
      era_exflag.route_21 = 50;`,
    replace: `  } else if (stage >= 41 && stage < 50) {
    if (love && cflag(515) >= 10) {
      era_exflag.route_21 = 50;`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKSPADE 档位区间',
  },
  {
    desc: 'M8247 ENDCHECKSPADE 恋慕 80-90 档上界：stage < 90 误写成 < 91',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 80 && stage < 90) {
    if (love && cflag(515) >= 150) {
      era_exflag.route_21 = 90;`,
    replace: `  } else if (stage >= 80 && stage < 91) {
    if (love && cflag(515) >= 150) {
      era_exflag.route_21 = 90;`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKSPADE 档位区间',
  },
  {
    desc: 'M8248 ENDCHECKSPADE 淫乱起步门：lust_stage < 10 误写成 < 11',
    file: 'ere/event/event-endcheck.js',
    find: `  if (lust && cflag(2) >= 2000 && lust_stage < 10) {
    era_exflag.route_21 = 110; // :304-305 起步 11`,
    replace: `  if (lust && cflag(2) >= 2000 && lust_stage < 11) {
    era_exflag.route_21 = 110; // :304-305 起步 11`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKSPADE 档位区间',
  },
  {
    desc: 'M8249 ENDCHECKSPADE 淫乱 110-120 档下界：>= 110 误写成 >= 111（110 落空）',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (lust_stage >= 110 && lust_stage < 120) {
    if (lust && cflag(2) >= 5000) {`,
    replace: `  } else if (lust_stage >= 111 && lust_stage < 120) {
    if (lust && cflag(2) >= 5000) {`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKSPADE 档位区间',
  },
  {
    desc: 'M8250 ENDCHECKSPADE 淫乱 120-130 档上界：< 130 误写成 < 131（130 被上一档抢走）',
    file: 'ere/event/event-endcheck.js',
    find: '  } else if (lust_stage >= 120 && lust_stage < 130) {',
    replace: '  } else if (lust_stage >= 120 && lust_stage < 131) {',
    tests: ['event-ending'],
    must_mention: 'ENDCHECKSPADE 档位区间',
  },
  {
    desc: 'M8251 ENDCHECKSPADE 淫乱 190-200 档下界：>= 190 误写成 >= 191',
    file: 'ere/event/event-endcheck.js',
    find: '  } else if (lust_stage >= 190 && lust_stage < 200) {',
    replace: '  } else if (lust_stage >= 191 && lust_stage < 200) {',
    tests: ['event-ending'],
    must_mention: 'ENDCHECKSPADE 档位区间',
  },
  {
    desc: 'M8252 ENDCHECKPRINCESS 初会门：route_35 === 0 误写成 === 1',
    file: 'ere/event/event-endcheck.js',
    find: `  if (get_chara(35) > 0 && era_exflag.route_35 === 0) {
    era_exflag.route_35 = 10;`,
    replace: `  if (get_chara(35) > 0 && era_exflag.route_35 === 1) {
    era_exflag.route_35 = 10;`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKPRINCESS 档位区间',
  },
  {
    desc: 'M8253 ENDCHECKPRINCESS 恋慕重置下界：route >= 130 误写成 >= 131',
    file: 'ere/event/event-endcheck.js',
    find: '  if (talent(85) === 1 && era_exflag.route_35 >= 130) {',
    replace: '  if (talent(85) === 1 && era_exflag.route_35 >= 131) {',
    tests: ['event-ending'],
    must_mention: 'ENDCHECKPRINCESS 档位区间',
  },
  {
    desc: 'M8254 ENDCHECKPRINCESS 淫乱重置上界：<= 130 误写成 <= 131',
    file: 'ere/event/event-endcheck.js',
    find: `    era_exflag.route_35 >= 30 &&
    era_exflag.route_35 <= 130`,
    replace: `    era_exflag.route_35 >= 30 &&
    era_exflag.route_35 <= 131`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKPRINCESS 档位区间',
  },
  {
    desc: 'M8255 ENDCHECKPRINCESS 10-20 档下界：stage >= 10 误写成 >= 11',
    file: 'ere/event/event-endcheck.js',
    find: `  if (stage >= 10 && stage < 20) {
    // :372-376`,
    replace: `  if (stage >= 11 && stage < 20) {
    // :372-376`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKPRINCESS 档位区间',
  },
  {
    desc: 'M8256 ENDCHECKPRINCESS 130-140 档下界：stage >= 130 误写成 >= 131',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 130 && stage < 140) {
    if (cflag(2) >= 2000) {`,
    replace: `  } else if (stage >= 131 && stage < 140) {
    if (cflag(2) >= 2000) {`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKPRINCESS 档位区间',
  },
  {
    desc: 'M8257 ENDCHECKPRINCESS 80-90 档上界：stage < 90 误写成 < 91',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 80 && stage < 90) {
    if (cflag(515) < 30) {`,
    replace: `  } else if (stage >= 80 && stage < 91) {
    if (cflag(515) < 30) {`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKPRINCESS 档位区间',
  },
  {
    desc: 'M8258 ENDCHECKPRINCESS 110-120 档上界：stage < 120 误写成 < 121',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 110 && stage < 120) {
    if (cflag(515) < 150) {`,
    replace: `  } else if (stage >= 110 && stage < 121) {
    if (cflag(515) < 150) {`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKPRINCESS 档位区间',
  },
  {
    desc: 'M8259 ENDCHECKPRINCESS 180-190 档下界：stage >= 180 误写成 >= 181',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 180 && stage < 190) {
    if (cflag(515) < 30) {`,
    replace: `  } else if (stage >= 181 && stage < 190) {
    if (cflag(515) < 30) {`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKPRINCESS 档位区间',
  },
  {
    desc: 'M8260 ENDCHECKPRINCESS 210-220 档上界：stage < 220 误写成 < 221',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 210 && stage < 220) {
    if (cflag(515) < 150) {`,
    replace: `  } else if (stage >= 210 && stage < 221) {
    if (cflag(515) < 150) {`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKPRINCESS 档位区间',
  },
  {
    desc: 'M8261 ENDCHECKGODNESS 起步门：stage < 10 误写成 < 11',
    file: 'ere/event/event-endcheck.js',
    find: `  if (lust && cflag(2) >= 2000 && stage < 10) {
    era_exflag.route_33 = 110; // :87-89 起步 11`,
    replace: `  if (lust && cflag(2) >= 2000 && stage < 11) {
    era_exflag.route_33 = 110; // :87-89 起步 11`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKGODNESS 档位区间',
  },
  {
    desc: 'M8262 ENDCHECKGODNESS 110-120 档下界：stage >= 110 误写成 >= 111',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 110 && stage < 120) {
    // :90-93`,
    replace: `  } else if (stage >= 111 && stage < 120) {
    // :90-93`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKGODNESS 档位区间',
  },
  {
    desc: 'M8263 ENDCHECKGODNESS 120-130 档上界：stage < 130 误写成 < 131',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 110 && stage < 130) {
    // :94-97`,
    replace: `  } else if (stage >= 110 && stage < 131) {
    // :94-97`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKGODNESS 档位区间',
  },
  {
    desc: 'M8264 ENDCHECKGODNESS 170-180 档下界：stage >= 170 误写成 >= 171',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 170 && stage < 180) {
    // :124-130`,
    replace: `  } else if (stage >= 171 && stage < 180) {
    // :124-130`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKGODNESS 档位区间',
  },
  {
    desc: 'M8265 ENDCHECKGODNESS 180-190 档上界：stage < 190 误写成 < 191',
    file: 'ere/event/event-endcheck.js',
    find: `  } else if (stage >= 180 && stage < 190) {
    // :131-137`,
    replace: `  } else if (stage >= 180 && stage < 191) {
    // :131-137`,
    tests: ['event-ending'],
    must_mention: 'ENDCHECKGODNESS 档位区间',
  },
  {
    desc: 'M8266 ENDCHECKGODNESS 淫乱重置 [30,100] 下界：>= 30 误写成 >= 31',
    file: 'ere/event/event-endcheck.js',
    find: '    ((era_exflag.route_33 >= 30 && era_exflag.route_33 <= 100) ||',
    replace:
      '    ((era_exflag.route_33 >= 31 && era_exflag.route_33 <= 100) ||',
    tests: ['event-ending'],
    must_mention: 'ENDCHECKGODNESS 档位区间',
  },
  {
    desc: 'M8267 ENDCHECKGODNESS 淫乱重置 [300,310] 上界：<= 310 误写成 <= 311',
    file: 'ere/event/event-endcheck.js',
    find: '      (era_exflag.route_33 >= 300 && era_exflag.route_33 <= 310))',
    replace:
      '      (era_exflag.route_33 >= 300 && era_exflag.route_33 <= 311))',
    tests: ['event-ending'],
    must_mention: 'ENDCHECKGODNESS 档位区间',
  },

  // —— #404 返工（rebase 后）：CHAR_GIFT 的种族年龄支接 RACE_AGE_GENERATE 真身 ——
  {
    desc: 'M8268 CHAR_GIFT 种族年龄：落值槽位改成入参槽（CFLAG:452 → 451）',
    file: 'ere/event/event-ending.js',
    find: `      chara(a).chara.种族年龄 = race_age_generate(`,
    replace: `      chara(a).chara.年龄 = race_age_generate(`,
    tests: ['event-ending'],
    must_mention: '种族年龄支',
  },
  {
    desc: 'M8269 CHAR_GIFT 种族年龄：入参取错槽（CFLAG:A:451 → 452）',
    file: 'ere/event/event-ending.js',
    find: `      chara(a).chara.种族年龄 = race_age_generate(
        era.get(\`cflag:\${a}:451\`) || 0,`,
    replace: `      chara(a).chara.种族年龄 = race_age_generate(
        era.get(\`cflag:\${a}:452\`) || 0,`,
    tests: ['event-ending'],
    must_mention: '种族年龄支',
  },
  {
    desc: 'M8270 CHAR_GIFT 种族年龄：种族编号写死成 1（不读 TALENT:314）',
    file: 'ere/event/event-ending.js',
    find: `        era.get(\`talent:\${a}:314\`) || 0,`,
    replace: `        1,`,
    tests: ['event-ending'],
    must_mention: '种族年龄支',
  },
  {
    desc: 'M8271 CHAR_GIFT 种族年龄：FLAG:5 的守卫位 12 误写成位 14（位 12 不再触发）',
    file: 'ere/event/event-ending.js',
    find: `    if (((settings >> 12) & 1) !== 0 || ((settings >> 13) & 1) !== 0) {`,
    replace: `    if (((settings >> 14) & 1) !== 0 || ((settings >> 13) & 1) !== 0) {`,
    tests: ['event-ending'],
    must_mention: '种族年龄支',
  },
  {
    desc: 'M8272 CHAR_GIFT 种族年龄：丢掉随机源透传（race_age_generate 落到真随机）',
    file: 'ere/event/event-ending.js',
    find: `        era.get(\`talent:\${a}:314\`) || 0,
        rand,
      );`,
    replace: `        era.get(\`talent:\${a}:314\`) || 0,
      );`,
    tests: ['event-ending'],
    must_mention:
      'CHAR_GIFT 的种族年龄支：FLAG:5 位 12/13 为真时把 race_age_generate 的返回值写进 CFLAG:452',
  },
  {
    desc: 'M8273 CHAR_GIFT 种族年龄：实参顺序颠倒（人类年龄 ↔ 种族编号）',
    file: 'ere/event/event-ending.js',
    find: `      chara(a).chara.种族年龄 = race_age_generate(
        era.get(\`cflag:\${a}:451\`) || 0,
        era.get(\`talent:\${a}:314\`) || 0,`,
    replace: `      chara(a).chara.种族年龄 = race_age_generate(
        era.get(\`talent:\${a}:314\`) || 0,
        era.get(\`cflag:\${a}:451\`) || 0,`,
    tests: ['event-ending'],
    must_mention: '种族年龄支',
  },
  // —— #400（N16）EVENT_NEXTDAY.ERB 全路径：素质变化三事件 ——
  {
    desc: 'M8441 FUTA_F 接受支：不清【肉芽诅咒】（TALENT:326 该清而不清）',
    file: 'ere/event/event-nextday.js',
    find: '      chara(cid).stronghold.肉芽诅咒 = 0;\n      chara(cid).chara.扶她 = 1;',
    replace: '      chara(cid).chara.扶她 = 1;',
    tests: ['event-nextday'],
    must_mention: '【肉芽诅咒】清零',
  },
  {
    desc: 'M8442 FUTA_F 接受支：不给【扶她】（TALENT:121 该给而不给）',
    file: 'ere/event/event-nextday.js',
    find: '      chara(cid).chara.扶她 = 1;\n      chara(cid).train.童贞 = 1;',
    replace: '      chara(cid).train.童贞 = 1;',
    tests: ['event-nextday'],
    must_mention: '获得【扶她】',
  },
  {
    desc: 'M8443 FUTA_F 拒绝支：不清【肉芽诅咒】（选 [1] 后 326 该清而不清）',
    file: 'ere/event/event-nextday.js',
    find: '      era.print(`${name}失去了【${talent_name(326)}】。`);\n      chara(cid).stronghold.肉芽诅咒 = 0;',
    replace: '      era.print(`${name}失去了【${talent_name(326)}】。`);',
    tests: ['event-nextday'],
    must_mention: '【肉芽诅咒】清零',
  },
  {
    desc: 'M8444 FUTA_F 非法输入：不再回到 INPUT 循环（首轮即结束）',
    file: 'ere/event/event-nextday.js',
    find: `    // :382-383 ELSE → GOTO INPUT_LOOP（重印询问行，不消耗其它状态）
  }
  await era.waitAnyKey(); // :386`,
    replace: `    // 变异：非法输入直接退出，不重问
    break;
  }
  await era.waitAnyKey(); // :386`,
    tests: ['event-nextday'],
    must_mention: '回到 INPUT 循环重问',
  },
  {
    desc: 'M8445 MORASI：【漏尿癖】写成 0（该给 1）',
    file: 'ere/event/event-nextday.js',
    find: `  era.set(\`talent:\${cid}:57\`, 1); // :393`,
    replace: `  era.set(\`talent:\${cid}:57\`, 0); // :393`,
    tests: ['event-nextday'],
    must_mention: '尿床',
  },
  {
    desc: 'M8446 YOUJI：【幼儿退行】写成 0（该给 1）',
    file: 'ere/event/event-nextday.js',
    find: `  era.set(\`talent:\${cid}:131\`, 1); // :403`,
    replace: `  era.set(\`talent:\${cid}:131\`, 0); // :403`,
    tests: ['event-nextday'],
    must_mention: '获得【幼儿退行】',
  },
  {
    desc: 'M8447 YOUJI 清理表：漏掉【调合知识】（55）一项',
    file: 'ere/event/event-nextday.js',
    find: `const YOUJI_CLEARED_TALENTS = [
  20, 21, 22, 24, 26, 27, 30, 32, 34, 35, 37, 55, 93,
];`,
    replace: `const YOUJI_CLEARED_TALENTS = [
  20, 21, 22, 24, 26, 27, 30, 32, 34, 35, 37, 93,
];`,
    tests: ['event-nextday'],
    must_mention: '素质 55 应被清零',
  },
  {
    desc: 'M8448 YOUJI 清理表：把 13 项之外的【接受快感】（70）也清了（表多一项）',
    file: 'ere/event/event-nextday.js',
    find: `const YOUJI_CLEARED_TALENTS = [
  20, 21, 22, 24, 26, 27, 30, 32, 34, 35, 37, 55, 93,
];`,
    replace: `const YOUJI_CLEARED_TALENTS = [
  20, 21, 22, 24, 26, 27, 30, 32, 34, 35, 37, 55, 70, 93,
];`,
    tests: ['event-nextday'],
    must_mention: '表外素质不得被清',
  },
  {
    desc: 'M8449 YOUJI：【漏尿癖】的守卫取反（已持有也重写并播报）',
    file: 'ere/event/event-nextday.js',
    find: `  if (!(era.get(\`talent:\${cid}:57\`) || 0)) {
    era.set(\`talent:\${cid}:57\`, 1); // :458`,
    replace: `  if (era.get(\`talent:\${cid}:57\`) || 0) {
    era.set(\`talent:\${cid}:57\`, 1); // :458`,
    tests: ['event-nextday'],
    must_mention: '已持有【漏尿癖】时不重复给也不播报',
  },
  {
    desc: 'M8450 YOUJI：【反抗刻印】清零写成 1（MARK:3 = 0 的靶）',
    file: 'ere/event/event-nextday.js',
    find: '  chara(cid).system.反抗刻印 = 0; // :462',
    replace: '  chara(cid).system.反抗刻印 = 1; // :462',
    tests: ['event-nextday'],
    must_mention: '【反抗刻印】清零',
  },
  {
    desc: 'M8451 NEXTDAY 接线：放尿经验门槛 15 抬到 16（幼稚支不再触发）',
    file: 'ere/event/event-nextday.js',
    find: `        era.get(\`talent:\${cid}:132\`) &&
        (era.get(\`exp:\${cid}:31\`) || 0) >= 15`,
    replace: `        era.get(\`talent:\${cid}:132\`) &&
        (era.get(\`exp:\${cid}:31\`) || 0) >= 16`,
    tests: ['event-nextday'],
    must_mention: '素质变化三事件接线',
  },
  // —— #400（N16）EVENT_NEXTDAY.ERB 全路径：魔族化 ——
  {
    desc: 'M8452 MAZOKU：【魂缚】的早退守卫去掉（被缚者也改造）',
    file: 'ere/event/event-nextday.js',
    find: `  if (era.get(\`talent:\${cid}:274\`)) {
    return; // :471-472 SIF TALENT:魂缚 / RETURN
  }`,
    replace: `  // 变异：去掉魂缚守卫`,
    tests: ['event-nextday'],
    must_mention: '持有【魂缚】时不改造也不播报',
  },
  {
    desc: 'M8453 MAZOKU：原种族写成了改造后的种族（321 该取改造前的 314）',
    file: 'ere/event/event-nextday.js',
    find: '  chara(cid).chara.原种族 = era.get(`talent:${cid}:314`) || 0; // :474',
    replace: '  chara(cid).chara.原种族 = 9; // :474',
    tests: ['event-nextday'],
    must_mention: '原种族 = 改造前的种族',
  },
  {
    desc: 'M8454 MAZOKU：欲望门槛 3 抬到 4（3 档误落小恶魔支）',
    file: 'ere/event/event-nextday.js',
    find: `  if ((era.get(\`abl:\${cid}:11\`) || 0) >= 3) {`,
    replace: `  if ((era.get(\`abl:\${cid}:11\`) || 0) >= 4) {`,
    tests: ['event-nextday'],
    must_mention: '的现种族',
  },
  {
    desc: 'M8455 MAZOKU：【淫乱】的选择取反（魅魔 ↔ 小恶魔）',
    file: 'ere/event/event-nextday.js',
    find: `    const race = era.get(\`talent:\${cid}:76\`) ? 152 : 132;`,
    replace: `    const race = era.get(\`talent:\${cid}:76\`) ? 132 : 152;`,
    tests: ['event-nextday'],
    must_mention: '的现种族',
  },
  {
    desc: 'M8456 MAZOKU：低欲望支的现种族 140 改成 141（表外种族）',
    file: 'ere/event/event-nextday.js',
    find: '    chara(cid).chara.现种族 = 140; // :488 インプ',
    replace: '    chara(cid).chara.现种族 = 141; // :488 インプ',
    tests: ['event-nextday'],
    must_mention: '的现种族',
  },
  {
    desc: 'M8457 MAZOKU：高欲望支的【诱惑】（481）写成了【混乱】（482）',
    file: 'ere/event/event-nextday.js',
    find: '    chara(cid).chara.诱惑 = 1; // :479',
    replace: '    era.set(`talent:${cid}:482`, 1); // :479',
    tests: ['event-nextday'],
    must_mention: '诱惑',
  },
  // —— #400（N16）EVENT_NEXTDAY.ERB 全路径：维持费 / 偶尔归来 ——
  {
    desc: 'M8458 RUNNING_COST：天数档 >31 抬成 >30（第 31 日提前加算）',
    file: 'ere/event/event-nextday.js',
    find: `  if (era_flag.day_count > 31) cost += 1000; // :252-253`,
    replace: `  if (era_flag.day_count > 30) cost += 1000; // :252-253`,
    tests: ['event-nextday'],
    must_mention: '天数三档边界',
  },
  {
    desc: 'M8459 RUNNING_COST：天数档 >51 抬成 >50（第 51 日提前加算）',
    file: 'ere/event/event-nextday.js',
    find: `  if (era_flag.day_count > 51) cost += 2000; // :254-256`,
    replace: `  if (era_flag.day_count > 50) cost += 2000; // :254-256`,
    tests: ['event-nextday'],
    must_mention: '天数三档边界',
  },
  {
    desc: 'M8460 RUNNING_COST 设施表：浴室的 500 改成 300',
    file: 'ere/event/event-nextday.js',
    find: `  [32, 500], // 浴室を拡張`,
    replace: `  [32, 300], // 浴室を拡張`,
    tests: ['event-nextday'],
    must_mention: '六位设施额',
  },
  {
    desc: 'M8461 RUNNING_COST：警备员的位 64 写成 32（与浴室位相撞）',
    file: 'ere/event/event-nextday.js',
    find: `  if (facilities & 64) cost += (era.get('flag:40') || 0) * 500; // :276-278`,
    replace: `  if (facilities & 32) cost += (era.get('flag:40') || 0) * 500; // :276-278`,
    tests: ['event-nextday'],
    must_mention: '六位设施额',
  },
  {
    desc: 'M8462 RUNNING_COST：人气门槛 50 抬到 70（50 档不再加算）',
    file: 'ere/event/event-nextday.js',
    find: '  if (popularity >= 50)',
    replace: '  if (popularity >= 70)',
    tests: ['event-nextday'],
    must_mention: '两把梯子',
  },
  {
    desc: 'M8463 RUNNING_COST 贡献度梯子：1200 档的 0.5 改成 0.6',
    file: 'ere/event/event-nextday.js',
    find: `    [1200, 0.5],`,
    replace: `    [1200, 0.6],`,
    tests: ['event-nextday'],
    must_mention: '两把梯子',
  },
  {
    desc: 'M8464 RUNNING_COST 生活费：EXTRA 档（FLAG:5==4）按 200 算（档位串了）',
    file: 'ere/event/event-nextday.js',
    find: '  else if (difficulty === 4)',
    replace: '  else if (difficulty === 3)',
    tests: ['event-nextday'],
    must_mention: '难度档 × 天数的表驱动',
  },
  {
    desc: 'M8465 RUNNING_COST：MASTER 折扣卷 -100 改成 -200',
    file: 'ere/event/event-nextday.js',
    find: `  cost -= 100; // :318 MASTER の分は無料or割引`,
    replace: `  cost -= 200; // :318 MASTER の分は無料or割引`,
    tests: ['event-nextday'],
    must_mention: '难度档 × 天数的表驱动',
  },
  {
    desc: 'M8466 RUNNING_COST：EASY 倍率 0.80 改成 0.90',
    file: 'ere/event/event-nextday.js',
    find: `    cost = times(cost, 0.8); // :321-322`,
    replace: `    cost = times(cost, 0.9); // :321-322`,
    tests: ['event-nextday'],
    must_mention: '难度档 × 天数的表驱动',
  },
  {
    desc: 'M8467 RUNNING_COST：HARD 的 41–60 日档 2.00 改成 3.00',
    file: 'ere/event/event-nextday.js',
    find: `    else if (era_flag.day_count <= 60) cost = times(cost, 2.0);`,
    replace: `    else if (era_flag.day_count <= 60) cost = times(cost, 3.0);`,
    tests: ['event-nextday'],
    must_mention: '难度档 × 天数的表驱动',
  },
  {
    desc: 'M8468 RUNNING_COST 发生门槛：NORMAL 以上从第 11 日起（抬一天）',
    file: 'ere/event/event-nextday.js',
    find: `      (difficulty >= 2 && era_flag.day_count >= 10);`,
    replace: `      (difficulty >= 2 && era_flag.day_count >= 11);`,
    tests: ['event-nextday'],
    must_mention: '天数三档边界',
  },
  {
    desc: 'M8469 RUNNING_COST 发生门槛：EASY 从第 21 日起（抬一天）',
    file: 'ere/event/event-nextday.js',
    find: `      (difficulty === 1 && era_flag.day_count >= 20) ||`,
    replace: `      (difficulty === 1 && era_flag.day_count >= 21) ||`,
    tests: ['event-nextday'],
    must_mention: '天数三档边界',
  },
  {
    desc: 'M8470 RUNNING_COST：TIMES 的截断改成四舍五入（Math.floor → Math.round）',
    file: 'ere/event/event-nextday.js',
    find: `function times(v, m) {
  return Math.floor(v * m);
}`,
    replace: `function times(v, m) {
  return Math.round(v * m);
}`,
    tests: ['event-nextday'],
    must_mention: '两把梯子',
  },
  {
    desc: 'M8471 RUNNING_COST：最高难度档（FLAG:5 == 9）也参与扣款',
    file: 'ere/event/event-nextday.js',
    find: `  if (difficulty !== 9) {
    const due =`,
    replace: `  {
    const due =`,
    tests: ['event-nextday'],
    must_mention: '最高难度档',
  },
  {
    desc: 'M8472 偶尔归来：体力复位写成 MAXBASE:0 / 5（十分之一改成五分之一）',
    file: 'ere/event/event-nextday.js',
    find: `      chara(cid).dungeon.体力 = Math.floor(
        (era.get(\`maxbase:\${cid}:0\`) || 0) / 10,
      );`,
    replace: `      chara(cid).dungeon.体力 = Math.floor(
        (era.get(\`maxbase:\${cid}:0\`) || 0) / 5,
      );`,
    tests: ['event-nextday'],
    must_mention: '体力 = MAXBASE:0 / 10',
  },
  {
    desc: 'M8473 偶尔归来：气力错取 MAXBASE:0（该取 MAXBASE:1）',
    file: 'ere/event/event-nextday.js',
    find: `      chara(cid).dungeon.气力 = era.get(\`maxbase:\${cid}:1\`) || 0;`,
    replace: `      chara(cid).dungeon.气力 = era.get(\`maxbase:\${cid}:0\`) || 0;`,
    tests: ['event-nextday'],
    must_mention: '气力 = MAXBASE:1',
  },
  {
    desc: 'M8474 偶尔归来：0 号位（魔王）不再跳过',
    file: 'ere/event/event-nextday.js',
    find: `    if (cid === 0) {
      continue; // :505-506 主人公は判定から省く
    }`,
    replace: `    // 变异：魔王也参与判定`,
    tests: ['event-nextday'],
    must_mention: '魔王不参与判定',
  },
  {
    desc: 'M8475 偶尔归来：多人死亡时全部复位（丢掉「一度に一人ずつ」）',
    file: 'ere/event/event-nextday.js',
    find: `      await era.waitAnyKey(); // :519 WAIT
      return 1; // :521-522 一度に帰ってくるのは一人ずつ`,
    replace: `      await era.waitAnyKey(); // :519 WAIT
      // 变异：不早退，继续扫下一个`,
    tests: ['event-nextday'],
    must_mention: '一次只回一人',
  },
  // —— #400（N16）EVENT_NEXTDAY.ERB 全路径：魔王候补确定与魔王替换 ——
  {
    desc: 'M8477 MAOU_KOUHO：第一个候补即收手（判据改成先到先得）',
    file: 'ere/event/event-nextday.js',
    find: `    if (era.get(\`ex_talent:\${cid}:3\`)) {
      temp = cid; // :2435-2436
    }`,
    replace: `    if (era.get(\`ex_talent:\${cid}:3\`)) {
      temp = cid; // :2435-2436
      break; // 变异：先到先得
    }`,
    tests: ['event-nextday'],
    must_mention: '最后一名持有 EX_TALENT:3',
  },
  {
    desc: 'M8478 MAOU_TENSHIN 直接继位支：潜力转移 1/3 改成 1/2',
    file: 'ere/event/event-nextday.js',
    find: '      `maxbase:${candidate}:0`,',
    replace: '      `maxbase:${candidate}:1`,',
    tests: ['event-nextday'],
    must_mention: '90 + 300/3',
  },
  {
    desc: 'M8479 MAOU_TENSHIN 直接继位支：威望 -30 写成 -15',
    file: 'ere/event/event-nextday.js',
    find: `    era_exflag.prestige -= 30; // :2464`,
    replace: `    era_exflag.prestige -= 15; // :2464`,
    tests: ['event-nextday'],
    must_mention: '威望 -30',
  },
  {
    desc: 'M8480 MAOU_TENSHIN 直接继位支：魔王标记写到候补标记位（200 → 3）',
    file: 'ere/event/event-nextday.js',
    find: `    era.set('ex_talent:0:200', 1); // :2465 新魔王的【魔王】标记`,
    replace: `    era.set('ex_talent:0:3', 1); // :2465 新魔王的【魔王】标记`,
    tests: ['event-nextday'],
    must_mention: '新魔王带【魔王】标记',
  },
  {
    desc: 'M8481 MAOU_TENSHIN 直接继位支：丢掉身份互换（不 swap_chara）',
    file: 'ere/event/event-nextday.js',
    find: `    swap_chara(0, candidate); // :2463 MASTER = GETCHARA(17)`,
    replace: `    // 变异：不互换身份`,
    tests: ['event-nextday'],
    must_mention: '90 + 300/3',
  },
  {
    desc: 'M8482 MAOU_TENSHIN 直接继位支：【上届魔王】写回原作字面的 0（剔错人）',
    file: 'ere/event/event-nextday.js',
    find: `    era_exflag.prev_maou = candidate; // :2459（见文件头）`,
    replace: `    era_exflag.prev_maou = 0; // :2459（见文件头）`,
    tests: ['event-nextday'],
    must_mention: '上届魔王指向旧魔王身体',
  },
  {
    desc: 'M8483 MAOU_TENSHIN 灵魂转移支：威望 -15 写成 -30',
    file: 'ere/event/event-nextday.js',
    find: `    era_exflag.prestige -= 15; // :2477`,
    replace: `    era_exflag.prestige -= 30; // :2477`,
    tests: ['event-nextday'],
    must_mention: '威望 -15（比直接继位少）',
  },
  {
    desc: 'M8484 MAOU_TENSHIN 灵魂转移支：丢掉 MODE=1（退回「先问一次确认」）',
    file: 'ere/event/event-nextday.js',
    find: `    await transfer_soul(candidate, 1, rand); // :2476 CALL TRANSFER_SOUL, EX_FLAG:3, 1`,
    replace: `    await transfer_soul(candidate, 0, rand); // :2476 CALL TRANSFER_SOUL, EX_FLAG:3, 1`,
    tests: ['event-nextday'],
    must_mention: '灵魂转移支',
  },
  {
    desc: 'M8485 MAOU_TENSHIN 直接继位支：【爱慕】的清理守卫取反（只清没有的人）',
    file: 'ere/event/event-nextday.js',
    find: `      if (era.get(\`talent:\${cid}:85\`)) {
        chara(cid).stronghold.爱慕 = 0;
      }`,
    replace: `      if (!era.get(\`talent:\${cid}:85\`)) {
        chara(cid).stronghold.爱慕 = 0;
      }`,
    tests: ['event-nextday'],
    must_mention: '【爱慕】清零',
  },
  // —— #400（N16）四张跨边接线 ——
  {
    desc: 'M8486 接线：TAX_GET 真身不再调用（退回空转）',
    file: 'ere/event/event-nextday.js',
    find: `  await tax_get(); // #396 真身（system/stronghold/tax.js），#400 接线`,
    replace: `  // 变异：不调 tax_get`,
    tests: ['event-nextday'],
    must_mention: '收税日必须打真身的开场行',
  },
  {
    desc: 'M8487 接线：APHRODISIAC_ADDICT 真身不再调用',
    file: 'ere/event/event-nextday.js',
    find: `    await aphrodisiac_addict(cid);
    soul_dislocation(cid);`,
    replace: `    soul_dislocation(cid);`,
    tests: ['event-nextday'],
    must_mention: '残留度 -1',
  },
  {
    desc: 'M8488 接线：APHRODISIAC_ADDICT 传错角色（恒传 0 号位）',
    file: 'ere/event/event-nextday.js',
    find: `    await aphrodisiac_addict(cid);`,
    replace: `    await aphrodisiac_addict(0);`,
    tests: ['event-nextday'],
    must_mention: '残留度 -1',
  },
  {
    desc: 'M8489 接线：SABBATH 真身不再调用',
    file: 'ere/event/event-nextday.js',
    find: `    await sabbath(cid); // #405 真身（event-sabbath.js），#400 接线
    await sabbath_day(cid);`,
    replace: `    await sabbath_day(cid);`,
    tests: ['event-nextday'],
    must_mention: 'SABBATH 真身输出必须出现',
  },
  {
    desc: 'M8490 接线：SABBATH_DAY 真身不再调用',
    file: 'ere/event/event-nextday.js',
    find: `    await sabbath(cid); // #405 真身（event-sabbath.js），#400 接线
    await sabbath_day(cid);`,
    replace: `    await sabbath(cid); // #405 真身（event-sabbath.js），#400 接线`,
    tests: ['event-nextday'],
    must_mention: 'SABBATH_DAY 真身输出必须出现',
  },
  {
    desc: 'M8491 接线：SABBATH 传错角色（恒传 0 号位）',
    file: 'ere/event/event-nextday.js',
    find: `    await sabbath(cid); // #405 真身（event-sabbath.js），#400 接线`,
    replace: `    await sabbath(0); // #405 真身（event-sabbath.js），#400 接线`,
    tests: ['event-nextday'],
    must_mention: 'SABBATH 真身输出必须出现',
  },
  // —— #400（N16）EVENT_NEXTDAY.ERB 全路径：おねしょ ——
  {
    desc: 'M8492 ONESHO 准入掷：`RAND:12 <= 门槛` 改成 `<`（压线不再触发）',
    file: 'ere/event/event-nextday.js',
    find: `      rand(12) >
        Math.floor((era.get(\`exp:\${cid}:31\`) || 0) / 10) +`,
    replace: `      rand(12) >=
        Math.floor((era.get(\`exp:\${cid}:31\`) || 0) / 10) +`,
    tests: ['event-nextday'],
    must_mention: '刚好压线（3 <= 3）',
  },
  {
    desc: 'M8493 ONESHO 准入掷：【幼稚】的倍率 2 改成 1',
    file: 'ere/event/event-nextday.js',
    find: `          (era.get(\`talent:\${cid}:132\`) || 0) * 2
    ) {`,
    replace: `          (era.get(\`talent:\${cid}:132\`) || 0) * 1
    ) {`,
    tests: ['event-nextday'],
    must_mention: '幼稚×2 抬到 5',
  },
  {
    desc: 'M8494 ONESHO 准入掷：放尿经验除以 10 改成除以 5',
    file: 'ere/event/event-nextday.js',
    find: `        Math.floor((era.get(\`exp:\${cid}:31\`) || 0) / 10) +`,
    replace: `        Math.floor((era.get(\`exp:\${cid}:31\`) || 0) / 5) +`,
    tests: ['event-nextday'],
    must_mention: '超一线（4 > 3）',
  },
  {
    desc: 'M8495 ONESHO：死者的守卫去掉（体力 0 也走尿床）',
    file: 'ere/event/event-nextday.js',
    find: `    if ((era.get(\`base:\${cid}:0\`) || 0) <= 0) {
      continue; // :707-708 死んでたらダメ
    }`,
    replace: `    // 变异：死者也参与`,
    tests: ['event-nextday'],
    must_mention: '已死者不参与',
  },
  {
    desc: 'M8496 ONESHO 导管判定：服装 98 不再认（只剩 99）',
    file: 'ere/event/event-nextday.js',
    find: `      (special === 99 || special === 98) &&`,
    replace: `      special === 99 &&`,
    tests: ['event-nextday'],
    must_mention: '服装 98 同样认',
  },
  {
    desc: 'M8497 ONESHO 导管判定：CFLAG:40 的位 64 改成位 32',
    file: 'ere/event/event-nextday.js',
    find: '      (special === 99 || special === 98) &&\n      ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0 &&',
    replace:
      '      (special === 99 || special === 98) &&\n      ((era.get(`cflag:${cid}:40`) || 0) & 32) !== 0 &&',
    tests: ['event-nextday'],
    must_mention: '服装 99 + 位 64 + 着衣开',
  },
  {
    desc: 'M8498 ONESHO 导管判定：角色状态门槛 < 2 抬成 < 3',
    file: 'ere/event/event-nextday.js',
    find: `      (era.get(\`cflag:\${cid}:1\`) || 0) < 2; // :712-715`,
    replace: `      (era.get(\`cflag:\${cid}:1\`) || 0) < 3; // :712-715`,
    tests: ['event-nextday'],
    must_mention: '角色状态 ≥ 2',
  },
  {
    desc: 'M8499 ONESHO 一档：顺从门槛 < 3 抬成 < 4',
    file: 'ere/event/event-nextday.js',
    find: `      if (loyalty < 3) {`,
    replace: `      if (loyalty < 4) {`,
    tests: ['event-nextday'],
    must_mention: '导管二档',
  },
  {
    desc: 'M8500 ONESHO 二档：顺从门槛 < 6 抬成 < 7',
    file: 'ere/event/event-nextday.js',
    find: `      } else if (loyalty < 6) {`,
    replace: `      } else if (loyalty < 7) {`,
    tests: ['event-nextday'],
    must_mention: '顺从 ≥ 6 才走三档开场',
  },
  {
    desc: 'M8601 ONESHO 一档 RAND:4：第 1 档的珠值 20 写成 10（与第 0 档同值）',
    file: 'ere/event/event-nextday.js',
    find: `          case 1: // :726-728
            era.print(\`\${palam(8)}点数＋20\`);
            era.add('juel:0:8', 20);`,
    replace: `          case 1: // :726-728
            era.print(\`\${palam(8)}点数＋20\`);
            era.add('juel:0:8', 10);`,
    tests: ['event-nextday'],
    must_mention: 'RAND:4 = 1',
  },
  {
    desc: 'M8602 ONESHO 一档 RAND:4：第 2 档写成苦痛 20（与第 3 档同值）',
    file: 'ere/event/event-nextday.js',
    find: `            era.add('juel:0:9', 10);
            break;`,
    replace: `            era.add('juel:0:9', 20);
            break;`,
    tests: ['event-nextday'],
    must_mention: 'RAND:4 = 2',
  },
  {
    desc: 'M8603 ONESHO 三档追加素质表：漏掉【露出狂】（89）',
    file: 'ere/event/event-nextday.js',
    find: `          (era.get(\`talent:\${cid}:88\`) || 0) === 1 ||
          (era.get(\`talent:\${cid}:89\`) || 0) === 1`,
    replace: `          (era.get(\`talent:\${cid}:88\`) || 0) === 1`,
    tests: ['event-nextday'],
    must_mention: '追加素质取【露出狂】',
  },
  {
    desc: 'M8604 ONESHO 三档：【容易自慰】的判定 60 写成 61',
    file: 'ere/event/event-nextday.js',
    find: `          if ((era.get(\`talent:\${cid}:60\`) || 0) === 1) {`,
    replace: `          if ((era.get(\`talent:\${cid}:61\`) || 0) === 1) {`,
    tests: ['event-nextday'],
    must_mention: '追加素质 + 【容易自慰】',
  },
  {
    desc: 'M8605 ONESHO 三档：自慰经验的珠值 800 写成 80',
    file: 'ere/event/event-nextday.js',
    find: `            era.add(\`juel:\${cid}:5\`, 800); // :754`,
    replace: `            era.add(\`juel:\${cid}:5\`, 80); // :754`,
    tests: ['event-nextday'],
    must_mention: '追加素质 + 【容易自慰】',
  },
  {
    desc: 'M8606 ONESHO 三档 RAND:3：第 1 档 20 写成 10',
    file: 'ere/event/event-nextday.js',
    find: `          case 1: // :766-768
            era.print(\`\${palam(4)}点数＋20\`);
            era.add('juel:0:4', 20);`,
    replace: `          case 1: // :766-768
            era.print(\`\${palam(4)}点数＋20\`);
            era.add('juel:0:4', 10);`,
    tests: ['event-nextday'],
    must_mention: 'RAND:3 = 1',
  },
  {
    desc: 'M8607 ONESHO 三档 RAND:3：第 2 档 30 写成 20',
    file: 'ere/event/event-nextday.js',
    find: `            era.add('juel:0:4', 30);`,
    replace: `            era.add('juel:0:4', 20);`,
    tests: ['event-nextday'],
    must_mention: 'RAND:3 = 2',
  },
  {
    desc: 'M8608 ONESHO 无导管支：放尿经验 +1 改成 +2',
    file: 'ere/event/event-nextday.js',
    find: `      chara(cid).system.放尿经验 += 1; // :782 EXP:COUNT:31 += 1`,
    replace: `      chara(cid).system.放尿经验 += 2; // :782 EXP:COUNT:31 += 1`,
    tests: ['event-nextday'],
    must_mention: 'EXP:31 += 1',
  },
  {
    desc: 'M8609 ONESHO 无导管支：报告门槛「露 + 抖M ≥ 8」抬成 ≥ 9',
    file: 'ere/event/event-nextday.js',
    find: `        (era.get(\`abl:\${cid}:17\`) || 0) + (era.get(\`abl:\${cid}:21\`) || 0) >=
        8 // :792 露出 + 抖M气质`,
    replace: `        (era.get(\`abl:\${cid}:17\`) || 0) + (era.get(\`abl:\${cid}:21\`) || 0) >=
        9 // :792 露出 + 抖M气质`,
    tests: ['event-nextday'],
    must_mention: '露+抖M = 8',
  },
  {
    desc: 'M8610 ONESHO 无导管支：报告的人数门槛 ≥ 3 抬成 ≥ 4',
    file: 'ere/event/event-nextday.js',
    find: `        if (era.getAddedCharacters().length >= 3) {`,
    replace: `        if (era.getAddedCharacters().length >= 4) {`,
    tests: ['event-nextday'],
    must_mention: 'CHARANUM ≥ 3 的文案',
  },
  {
    desc: 'M8611 ONESHO 无导管支：报告的珠值 1000 写成 100',
    file: 'ere/event/event-nextday.js',
    find: `        era.add(\`juel:\${cid}:8\`, 1000); // :800`,
    replace: `        era.add(\`juel:\${cid}:8\`, 100); // :800`,
    tests: ['event-nextday'],
    must_mention: '时的 JUEL:8',
  },
  {
    desc: 'M8612 ONESHO 无导管支：不在魔王房间的 continue 去掉',
    file: 'ere/event/event-nextday.js',
    find: `      if ((era.get(\`cflag:\${cid}:1\`) || 0) !== 0) {
        continue; // :789-790 魔王部屋にいないとダメ
      }`,
    replace: `      // 变异：不检查是否在魔王房间`,
    tests: ['event-nextday'],
    must_mention: '不在魔王房间时不得出现报告支',
  },
  {
    desc: 'M8613 ONESHO：返回值 1 改成 0（原作恒 RETURN 1）',
    file: 'ere/event/event-nextday.js',
    find: '  return 1; // :804-806',
    replace: '  return 0; // :804-806',
    tests: ['event-nextday'],
    must_mention: '恒返回 1',
  },
  // —— #400（N16）EVENT_NEXTDAY.ERB 全路径：犬の散歩 ——
  {
    desc: 'M8614 DOG_WALK：道具持有检查去掉（没狗也遛）',
    file: 'ere/event/event-nextday.js',
    find: `  if (!has_item(22)) {
    return 0; // :1335-1336 いぬを持ってないとダメ
  }`,
    replace: `  // 变异：不检查道具`,
    tests: ['event-nextday'],
    must_mention: '无道具返回 0',
  },
  {
    desc: 'M8615 DOG_WALK：持有检查丢掉 NOITEM 支（只认 ITEM:22）',
    file: 'ere/event/event-nextday.js',
    find: `  return (era.get(\`item:\${i}\`) || 0) > 0 || (era.get('noitem:0') || 0) !== 0;`,
    replace: `  return (era.get(\`item:\${i}\`) || 0) > 0;`,
    tests: ['event-nextday'],
    must_mention: 'NOITEM 非 0 时不再早退',
  },
  {
    desc: 'M8616 DOG_WALK：当番上界写成 CHARANUM（最后一个角色也掷得到）',
    file: 'ere/event/event-nextday.js',
    find: `  let walking = list.length - 1; // :1341 DOG_WALKING = CHARANUM - 1（下标）`,
    replace: `  let walking = list.length; // :1341 DOG_WALKING = CHARANUM - 1（下标）`,
    tests: ['event-nextday'],
    must_mention: 'CHARANUM - 1 == 0 → 返回 0',
  },
  {
    desc: 'M8617 DOG_WALK：调整守卫的并集改成交集（未陷落不再退回魔王）',
    file: 'ere/event/event-nextday.js',
    find: `    ((era.get(\`cflag:\${picked()}:1\`) || 0) !== 0 ||
      (era.get(\`cflag:\${picked()}:0\`) || 0) === 0)`,
    replace: `    ((era.get(\`cflag:\${picked()}:1\`) || 0) !== 0 &&
      (era.get(\`cflag:\${picked()}:0\`) || 0) === 0)`,
    tests: ['event-nextday'],
    must_mention: '未陷落（CFLAG:0 = 0）退回魔王',
  },
  {
    desc: 'M8618 DOG_WALK：牝犬的兴奋加成 2 改成 1',
    file: 'ere/event/event-nextday.js',
    find: `  if (era.get(\`talent:\${cid}:136\`)) play += 2; // :1374-1375 牝犬`,
    replace: `  if (era.get(\`talent:\${cid}:136\`)) play += 1; // :1374-1375 牝犬`,
    tests: ['event-nextday'],
    must_mention: 'JUEL:0 += 5*PLAY',
  },
  {
    desc: 'M8619 DOG_WALK：动物耳的 PLAY > 0 前置守卫去掉',
    file: 'ere/event/event-nextday.js',
    find: `  if (era.get(\`talent:\${cid}:124\`) && play > 0) play += 1; // :1388-1389 動物耳`,
    replace: `  if (era.get(\`talent:\${cid}:124\`)) play += 1; // :1388-1389 動物耳`,
    tests: ['event-nextday'],
    must_mention: '只持动物耳',
  },
  {
    desc: 'M8620 DOG_WALK：【喜欢的东西】的判定 12 改成 13',
    file: 'ere/event/event-nextday.js',
    find: `  if ((era.get(\`talent:\${cid}:317\`) || 0) === 12 && play > 0) play += 1; // :1391-1392`,
    replace: `  if ((era.get(\`talent:\${cid}:317\`) || 0) === 13 && play > 0) play += 1; // :1391-1392`,
    tests: ['event-nextday'],
    must_mention: 'JUEL:0 += 5*PLAY',
  },
  {
    desc: 'M8621 DOG_WALK：露出基准值 -2 改成 0（无露出癖也会走耻情支）',
    file: 'ere/event/event-nextday.js',
    find: `  let open = -2; // :1367 露出要素（若干の抵抗あり）`,
    replace: `  let open = 0; // :1367 露出要素（若干の抵抗あり）`,
    tests: ['event-nextday'],
    must_mention: '是否写耻情珠',
  },
  {
    desc: 'M8622 DOG_WALK：露出狂的判定 89 改成 88',
    file: 'ere/event/event-nextday.js',
    find: `  if (era.get(\`talent:\${cid}:89\`)) open += 1; // :1380-1381 露出狂`,
    replace: `  if (era.get(\`talent:\${cid}:88\`)) open += 1; // :1380-1381 露出狂`,
    tests: ['event-nextday'],
    must_mention: '露出癖 2 + 露出狂',
  },
  {
    desc: 'M8623 DOG_WALK：目立ちたがり的判定 28 改成 27',
    file: 'ere/event/event-nextday.js',
    find: `  if (era.get(\`talent:\${cid}:28\`)) open += 1; // :1383-1384 目立ちたがり`,
    replace: `  if (era.get(\`talent:\${cid}:27\`)) open += 1; // :1383-1384 目立ちたがり`,
    tests: ['event-nextday'],
    must_mention: '露出癖 2 + 爱表现',
  },
  {
    desc: 'M8624 DOG_WALK：NO_SEX 的处女判定取成【童贞】（0 改成 1）',
    file: 'ere/event/event-nextday.js',
    find: `  if (era.get(\`talent:\${cid}:0\`)) {
    no_sex = 1; // :1394-1396 処女
  }`,
    replace: `  if (era.get(\`talent:\${cid}:1\`)) {
    no_sex = 1; // :1394-1396 処女
  }`,
    tests: ['event-nextday'],
    must_mention: '处女：口交经验 +1',
  },
  {
    desc: 'M8625 DOG_WALK：貞操帯的服装编号 79 改成 78',
    file: 'ere/event/event-nextday.js',
    find: `    (era.get(\`cflag:\${cid}:42\`) || 0) === 79 &&
    ((era.get(\`cflag:\${cid}:40\`) || 0) & 64) !== 0 &&
    era.get('flag:37')`,
    replace: `    (era.get(\`cflag:\${cid}:42\`) || 0) === 78 &&
    ((era.get(\`cflag:\${cid}:40\`) || 0) & 64) !== 0 &&
    era.get('flag:37')`,
    tests: ['event-nextday'],
    must_mention: '贞操带（42 == 79 且位 64 且着衣开）',
  },
  {
    desc: 'M8626 DOG_WALK 交尾支：私处珠的 4*PLAY 改成 5*PLAY',
    file: 'ere/event/event-nextday.js',
    find: `    era.add(\`juel:\${cid}:1\`, 4 * play); // :1430`,
    replace: `    era.add(\`juel:\${cid}:1\`, 5 * play); // :1430`,
    tests: ['event-nextday'],
    must_mention: 'JUEL:1 += 4*PLAY',
  },
  {
    desc: 'M8627 DOG_WALK 口交支：侍奉快乐的 5*PLAY 改成 4*PLAY',
    file: 'ere/event/event-nextday.js',
    find: `    era.add(\`juel:\${cid}:5\`, 5 * play); // :1442`,
    replace: `    era.add(\`juel:\${cid}:5\`, 4 * play); // :1442`,
    tests: ['event-nextday'],
    must_mention: '：JUEL:5 += 5*PLAY',
  },
  {
    desc: 'M8628 DOG_WALK：散步行丢掉服装串（PRINT_CLOTHTYPE 不再调用）',
    file: 'ere/event/event-nextday.js',
    find: `    era.print(\`\${clothtype_text(cid)}的\${name}\${collar}和野狗一起散了散步。\`);`,
    replace: `    era.print(\`\${name}\${collar}和野狗一起散了散步。\`);`,
    tests: ['event-nextday'],
    must_mention: '完整散步行',
  },
  {
    desc: 'M8629 DOG_WALK：TARGET 不还原（污染调用方指针）',
    file: 'ere/event/event-nextday.js',
    find: `  era_flag.target = save_target; // :1460 TARGET = SAVE_TARGET`,
    replace: `  // 变异：不还原 TARGET`,
    tests: ['event-nextday'],
    must_mention: 'TARGET 还原为 SAVE_TARGET',
  },
  {
    desc: 'M8630 DOG_WALK：只有魔王时的散步行返回值 0 改成 1',
    file: 'ere/event/event-nextday.js',
    find: `    await era.printAndWait('你带了野狗去散步。'); // %SAVESTR:0% = 魔王
    return 0;`,
    replace: `    await era.printAndWait('你带了野狗去散步。'); // %SAVESTR:0% = 魔王
    return 1;`,
    tests: ['event-nextday'],
    must_mention: 'CHARANUM - 1 == 0 → 返回 0',
  },
  // —— #400（N16）EVENT_NEXTDAY.ERB 全路径：处女献上 ——
  {
    desc: 'M8631 处女献上准入：禁止判定 `FLAG:38 <= -1` 抬成 `<= 0`',
    file: 'ere/event/event-nextday.js',
    find: `  if ((era.get('flag:38') || 0) <= -1) return true; // :816-817 処女献上禁止`,
    replace: `  if ((era.get('flag:38') || 0) <= 0) return true; // :816-817 処女献上禁止`,
    tests: ['event-nextday'],
    must_mention: '顺+欲+侍奉的门槛',
  },
  {
    desc: 'M8632 处女献上准入：非处女判定取反（`=== 0` 改成 `=== 1`）',
    file: 'ere/event/event-nextday.js',
    find: 'if ((era.get(`talent:${cid}:0`) || 0) === 0 || era.get(`talent:${cid}:122`)) {',
    replace:
      'if ((era.get(`talent:${cid}:0`) || 0) === 1 || era.get(`talent:${cid}:122`)) {',
    tests: ['event-nextday'],
    must_mention: '十条准入守卫逐条挡住',
  },
  {
    desc: 'M8633 处女献上准入：顺+欲+侍奉的门槛 10 抬成 11',
    file: 'ere/event/event-nextday.js',
    find: `      (era.get(\`abl:\${cid}:16\`) || 0) <=
    10`,
    replace: `      (era.get(\`abl:\${cid}:16\`) || 0) <=
    11`,
    tests: ['event-nextday'],
    must_mention: '顺+欲+侍奉的门槛',
  },
  {
    desc: 'M8634 处女献上准入：贞操带的服装编号 79 改成 78',
    file: 'ere/event/event-nextday.js',
    find: `    (era.get(\`cflag:\${cid}:42\`) || 0) === 79 &&
    ((era.get(\`cflag:\${cid}:49\`) || 0) === 0 ||`,
    replace: `    (era.get(\`cflag:\${cid}:42\`) || 0) === 78 &&
    ((era.get(\`cflag:\${cid}:49\`) || 0) === 0 ||`,
    tests: ['event-nextday'],
    must_mention: '十条准入守卫逐条挡住',
  },
  {
    desc: 'M8635 处女献上准入：魔王部屋的状态白名单 {0,1} 改成 {0,2}',
    file: 'ere/event/event-nextday.js',
    find: `  if (status !== 0 && status !== 1) return true;`,
    replace: `  if (status !== 0 && status !== 2) return true;`,
    tests: ['event-nextday'],
    must_mention: '十条准入守卫逐条挡住',
  },
  {
    desc: 'M8636 判定变量 S：起手 `-RAND:3` 丢掉负号',
    file: 'ere/event/event-nextday.js',
    find: `  let s = -rand(3); // :868 S = (RAND:3 * -1)`,
    replace: `  let s = rand(3); // :868 S = (RAND:3 * -1)`,
    tests: ['event-nextday'],
    must_mention: '判定变量 S 的叠加',
  },
  {
    desc: 'M8637 判定变量 S：爱行 6 档的 +3 改成 +2',
    file: 'ere/event/event-nextday.js',
    find: `    if (loyalty === 4) s += 1;
    else if (loyalty === 5) s += 2;
    else if (loyalty >= 6) s += 3;`,
    replace: `    if (loyalty === 4) s += 1;
    else if (loyalty === 5) s += 2;
    else if (loyalty >= 6) s += 2;`,
    tests: ['event-nextday'],
    must_mention: '快感/贞操/好奇/戒备的四项加减',
  },
  {
    desc: 'M8638 判定变量 S：淫乱行 5 档的 +2 改成 +3',
    file: 'ere/event/event-nextday.js',
    find: `    if (desire === 4) s += 1;
    else if (desire === 5) s += 2;
    else if (desire >= 6) s += 3;`,
    replace: `    if (desire === 4) s += 1;
    else if (desire === 5) s += 3;
    else if (desire >= 6) s += 3;`,
    tests: ['event-nextday'],
    must_mention: '与 -2 相抵',
  },
  {
    desc: 'M8639 判定变量 S：否定快感 -2 改成 -1',
    file: 'ere/event/event-nextday.js',
    find: `  else if (era.get(\`talent:\${cid}:71\`)) s -= 2; // :903-904 否定快感`,
    replace: `  else if (era.get(\`talent:\${cid}:71\`)) s -= 1; // :903-904 否定快感`,
    tests: ['event-nextday'],
    must_mention: '否定快感 -2 → S = 0 早退',
  },
  {
    desc: 'M8640 判定变量 S：看重贞操 -2 改成 -1',
    file: 'ere/event/event-nextday.js',
    find: '  if (era.get(`talent:${cid}:30`))',
    replace: '  if (!era.get(`talent:${cid}:30`))',
    tests: ['event-nextday'],
    must_mention: '看重贞操 -2 → S = 0 早退',
  },
  {
    desc: 'M8641 拒绝支：顺从扣减 -2 改成 -1',
    file: 'ere/event/event-nextday.js',
    find: `    chara(cid).system.顺从 -= 2; // :949 ABL:10 -= 2`,
    replace: `    chara(cid).system.顺从 -= 1; // :949 ABL:10 -= 2`,
    tests: ['event-nextday'],
    must_mention: '常规扣 2',
  },
  {
    desc: 'M8642 拒绝支：一次限定的发生済标记写成 0（下次还能再来）',
    file: 'ere/event/event-nextday.js',
    find: `      era.set(\`cflag:\${cid}:62\`, 1); // :961 発生済フラグ`,
    replace: `      era.set(\`cflag:\${cid}:62\`, 0); // :961 発生済フラグ`,
    tests: ['event-nextday'],
    must_mention: '一次性标记',
  },
  {
    desc: 'M8643 安全套二问：道具编号 24 改成 25（问错道具）',
    file: 'ere/event/event-nextday.js',
    find: `  if (era.get(\`item:24\`)) {
    // :966-978 安全套二问`,
    replace: `  if (era.get(\`item:25\`)) {
    // :966-978 安全套二问`,
    tests: ['event-nextday'],
    must_mention: '持有道具才问',
  },
  {
    desc: 'M8644 破处支：私处经验 +2 改成 +1',
    file: 'ere/event/event-nextday.js',
    find: `  chara(cid).dungeon.私处经验 += 2; // :999`,
    replace: `  chara(cid).dungeon.私处经验 += 1; // :999`,
    tests: ['event-nextday'],
    must_mention: 'EXP:0 += 2',
  },
  {
    desc: 'M8645 破处支：JUEL:1 的 S*400 改成 S*500',
    file: 'ere/event/event-nextday.js',
    find: `  era.add(\`juel:\${cid}:1\`, s * 400); // :1002`,
    replace: `  era.add(\`juel:\${cid}:1\`, s * 500); // :1002`,
    tests: ['event-nextday'],
    must_mention: 'JUEL:1 += S*400',
  },
  {
    desc: 'M8646 初体验编码表（目标侧）：关系 4 的男人支 306 写成 304',
    file: 'ere/event/event-nextday.js',
    find: `        [4, true, 306],`,
    replace: `        [4, true, 304],`,
    tests: ['event-nextday'],
    must_mention: '亲族关系 4 / 魔王是男人 1',
  },
  {
    desc: 'M8647 初体验编码表（魔王侧）：关系 3 的男人支 306 写成 307',
    file: 'ere/event/event-nextday.js',
    find: `        [3, false, 307],`,
    replace: `        [3, false, 306],`,
    tests: ['event-nextday'],
    must_mention: '魔王童贞丧失',
  },
  {
    desc: 'M8648 破处支：膣内射精的 CFLAG:101 写成 20（该 30）',
    file: 'ere/event/event-nextday.js',
    find: `    chara(cid).system.主人膣内射精 = 30; // :1011 CFLAG:101 = 30`,
    replace: `    chara(cid).system.主人膣内射精 = 20; // :1011 CFLAG:101 = 30`,
    tests: ['event-nextday'],
    must_mention:
      'NAKADASHI_CHECK 算掷骰上界时看到的 CFLAG:101 必须是 :1011 写入的 30',
  },
  {
    desc: 'M8649 破处支尾部：着衣状态的位 64 扣减写成位 32',
    file: 'ere/event/event-nextday.js',
    find: `    chara(cid).train.着衣状态 -= 64; // :1079 CFLAG:40 -= 64`,
    replace: `    chara(cid).train.着衣状态 -= 32; // :1079 CFLAG:40 -= 64`,
    tests: ['event-nextday'],
    must_mention: '尾部清掉贞操带的位 64',
  },
  {
    desc: 'M8650 处女献上：破处支的返回值 1 改成 0',
    file: 'ere/event/event-nextday.js',
    find: '  return 1; // :1088-1089',
    replace: '  return 0; // :1088-1089',
    tests: ['event-nextday'],
    must_mention: '破处支返回 1',
  },
  // —— #400（N16）EVENT_NEXTDAY.ERB 全路径：夜这い ——
  {
    desc: 'M8651 夜这い准入：欲望门槛 4 抬成 5',
    file: 'ere/event/event-nextday.js',
    find: `    (era.get(\`abl:\${cid}:11\`) || 0) < 4 || // 欲望
    (era.get(\`abl:\${cid}:30\`) || 0) < 1 // 性交中毒`,
    replace: `    (era.get(\`abl:\${cid}:11\`) || 0) < 5 || // 欲望
    (era.get(\`abl:\${cid}:30\`) || 0) < 1 // 性交中毒`,
    tests: ['event-nextday'],
    must_mention: '十条排除守卫逐条挡住',
  },
  {
    desc: 'M8652 夜这い准入：男人支的门槛 12 抬成 13',
    file: 'ere/event/event-nextday.js',
    find: `  if (era.get(\`talent:\${cid}:122\`) && sum(3) <= 12) return null;`,
    replace: `  if (era.get(\`talent:\${cid}:122\`) && sum(3) <= 13) return null;`,
    tests: ['event-nextday'],
    must_mention: '男人：顺+欲+肛感 13 过线',
  },
  {
    desc: 'M8653 夜这い准入：处女支的门槛 14 抬成 15',
    file: 'ere/event/event-nextday.js',
    find: `  if (era.get(\`talent:\${cid}:0\`) && sum(3) <= 14) return null;`,
    replace: `  if (era.get(\`talent:\${cid}:0\`) && sum(3) <= 15) return null;`,
    tests: ['event-nextday'],
    must_mention: '处女：顺+欲+肛感 15 过线',
  },
  {
    desc: 'M8654 夜这い准入：非男人支的 V 感门槛 12 抬成 13',
    file: 'ere/event/event-nextday.js',
    find: '    sum(2) <= 12 &&',
    replace: '    sum(2) <= 13 &&',
    tests: ['event-nextday'],
    must_mention: '双双压线',
  },
  {
    desc: 'M8655 夜这い准入：贞操带支的门槛 14 抬成 15',
    file: 'ere/event/event-nextday.js',
    find: `    ((era.get(\`cflag:\${cid}:40\`) || 0) & 64) !== 0 &&
    sum(3) <= 14`,
    replace: `    ((era.get(\`cflag:\${cid}:40\`) || 0) & 64) !== 0 &&
    sum(3) <= 15`,
    tests: ['event-nextday'],
    must_mention: '15 过线',
  },
  {
    desc: 'M8656 OK_FLAG：克制 −2 改成 −1',
    file: 'ere/event/event-nextday.js',
    find: `  if (era.get(\`talent:\${cid}:20\`)) ok -= 2; // :1148-1149 克制`,
    replace: `  if (era.get(\`talent:\${cid}:20\`)) ok -= 1; // :1148-1149 克制`,
    tests: ['event-nextday'],
    must_mention: '开放 +1 与克制 −2',
  },
  {
    desc: 'M8657 OK_FLAG：开放 +1 漏掉',
    file: 'ere/event/event-nextday.js',
    find: `  if (era.get(\`talent:\${cid}:33\`)) ok += 1; // :1145-1146 开放`,
    replace: `  // 变异：开放不加值`,
    tests: ['event-nextday'],
    must_mention: '抵掉克制',
  },
  {
    desc: 'M8658 OK_FLAG：【性爱狂】的处女守卫反了（处女才加）',
    file: 'ere/event/event-nextday.js',
    find: `    (era.get(\`talent:\${cid}:0\`) || 0) === 0 &&
    (era.get(\`abl:\${cid}:2\`) || 0) >= (era.get(\`abl:\${cid}:3\`) || 0)`,
    replace: `    (era.get(\`talent:\${cid}:0\`) || 0) === 1 &&
    (era.get(\`abl:\${cid}:2\`) || 0) >= (era.get(\`abl:\${cid}:3\`) || 0)`,
    tests: ['event-nextday'],
    must_mention: '性爱狂 +1 把 0 抬过线',
  },
  {
    desc: 'M8659 OK_FLAG：尻穴狂的条件丢掉「A > V」一支',
    file: 'ere/event/event-nextday.js',
    find: `    (era.get(\`talent:\${cid}:0\`) ||
      (era.get(\`abl:\${cid}:3\`) || 0) > (era.get(\`abl:\${cid}:2\`) || 0))`,
    replace: `    era.get(\`talent:\${cid}:0\`)`,
    tests: ['event-nextday'],
    must_mention: '尻穴狂 +1 把 0 抬过线',
  },
  {
    desc: 'M8660 夜这い：V 使用标志的贞操带支漏判',
    file: 'ere/event/event-nextday.js',
    find: `    (era.get(\`cflag:\${target}:42\`) || 0) === 79 &&
    ((era.get(\`cflag:\${target}:40\`) || 0) & 64) !== 0
  ) {
    use_v = 0;
  }`,
    replace: `    (era.get(\`cflag:\${target}:42\`) || 0) === 79 &&
    ((era.get(\`cflag:\${target}:40\`) || 0) & 64) !== 0
  ) {
    use_v = 1;
  }`,
    tests: ['event-nextday'],
    must_mention: '贞操带：肛门经验 += PLAY',
  },
  {
    desc: 'M8661 夜这い：PLAY 的感覚高档 ≥6 的 +4 改成 +3',
    file: 'ere/event/event-nextday.js',
    find: `  else if (sense_value >= 6) play += 4;`,
    replace: `  else if (sense_value >= 6) play += 3;`,
    tests: ['event-nextday'],
    must_mention: 'PLAY = 3 + 4',
  },
  {
    desc: 'M8662 夜这い：PLAY 的感覚中档 ==5 的 +2 改成 +1',
    file: 'ere/event/event-nextday.js',
    find: `  else if (sense_value === 5) play += 2;`,
    replace: `  else if (sense_value === 5) play += 1;`,
    tests: ['event-nextday'],
    must_mention: 'PLAY 的感覚三档',
  },
  {
    desc: 'M8663 夜这い V 支：PALAM:1 的 PLAY*400 改成 PLAY*300',
    file: 'ere/event/event-nextday.js',
    find: `    era.add(\`juel:\${target}:1\`, play * 400); // :1291`,
    replace: `    era.add(\`juel:\${target}:1\`, play * 300); // :1291`,
    tests: ['event-nextday'],
    must_mention: 'JUEL:1 += PLAY*400',
  },
  {
    desc: 'M8664 夜这い 肛门支：JUEL:2 的 PLAY*400 改成 PLAY*250',
    file: 'ere/event/event-nextday.js',
    find: `    era.add(\`juel:\${target}:2\`, play * 400); // :1314`,
    replace: `    era.add(\`juel:\${target}:2\`, play * 250); // :1314`,
    tests: ['event-nextday'],
    must_mention: 'JUEL:2 += PLAY*400',
  },
  {
    desc: 'M8665 夜这い：MODE 的事件码 5 写成 4',
    file: 'ere/event/event-nextday.js',
    find: `  await game.train.with_self_kojo_event(5, () =>
    self_kojo(rand, undefined, true),
  ); // :1250-1251 TFLAG:13 = 5 / CALL SELF_KOJO`,
    replace: `  await game.train.with_self_kojo_event(4, () =>
    self_kojo(rand, undefined, true),
  ); // :1250-1251 TFLAG:13 = 5 / CALL SELF_KOJO`,
    tests: ['event-nextday'],
    must_mention: 'TFLAG:13 = 5',
  },
  // —— #400（N16）@PILLORY（ere/event/event-nextday-pillory.js）——
  {
    desc: 'M8666 示众台：状态门 8 改成 7（非示众台也走）',
    file: 'ere/event/event-nextday-pillory.js',
    find: '  if ((era.get(`cflag:${cid}:1`) || 0) !== 8) {',
    replace: '  if ((era.get(`cflag:${cid}:1`) || 0) !== 7) {',
    tests: ['event-nextday'],
    must_mention: '非示众台状态整场早退',
  },
  {
    desc: 'M8667 示众台：出产当日的判据改成「前一天」',
    file: 'ere/event/event-nextday-pillory.js',
    find: 'if (cflag(110) === era_flag.day_count)',
    replace: 'if (cflag(110) - 1 === era_flag.day_count)',
    tests: ['event-nextday'],
    must_mention: '出产当日',
  },
  {
    desc: 'M8668 示众台：围观姿态的第 2 档门槛 20 抬成 21',
    file: 'ere/event/event-nextday-pillory.js',
    find: '        : cflag(661) + cflag(662) < 20',
    replace: '        : cflag(661) + cflag(662) < 21',
    tests: ['event-nextday'],
    must_mention: '围观姿态按 CFLAG:661+662 的五档',
  },
  {
    desc: 'M8669 示众台：普通涂鸦的 RAND:6 改成 RAND:5',
    file: 'ere/event/event-nextday-pillory.js',
    find: '    const rolled = rand(6);',
    replace: '    const rolled = rand(5);',
    tests: ['event-nextday'],
    must_mention: '涂鸦的三支表',
  },
  {
    desc: 'M8670 示众台：处女支的 COUNT_A 上界 RAND:20+1 改成 RAND:20',
    file: 'ere/event/event-nextday-pillory.js',
    find: '    count_a += rand(20) + 1;\n    count_f += rand(10) + 1;\n    count_s += count_a + count_f + rand(10);\n  } else if (talent(273)) {',
    replace:
      '    count_a += rand(20);\n    count_f += rand(10) + 1;\n    count_s += count_a + count_f + rand(10);\n  } else if (talent(273)) {',
    tests: ['event-nextday'],
    must_mention: 'EXP:1 += COUNT_A',
  },
  {
    desc: 'M8671 示众台：兽奸支的 COUNT_Z 错写成累加 COUNT_A',
    file: 'ere/event/event-nextday-pillory.js',
    find: '    count_z += count_s;',
    replace: '    count_z += count_a;',
    tests: ['event-nextday'],
    must_mention: 'EXP:56 += COUNT_Z',
  },
  {
    desc: 'M8672 示众台：职业槽起点 200 改成 201（错位一格）',
    file: 'ere/event/event-nextday-pillory.js',
    find: '    const slot = i + 200;',
    replace: '    const slot = i + 201;',
    tests: ['event-nextday'],
    must_mention: '有项才掷、掷即打印',
  },
  {
    desc: 'M8673 示众台：CFLAG:665 的算式漏掉 COUNT_V',
    file: 'ere/event/event-nextday-pillory.js',
    find: '  era.add(`cflag:${cid}:665`, count_s - count_v - count_a - count_f - count_b);',
    replace:
      '  era.add(`cflag:${cid}:665`, count_s - count_a - count_f - count_b);',
    tests: ['event-nextday'],
    must_mention: '使用次数掷的五支与结算数值',
  },
  {
    desc: 'M8674 示众台：正字的除数 5 改成 4',
    file: 'ere/event/event-nextday-pillory.js',
    find: 'Math.floor(value / 5)',
    replace: 'Math.floor(value / 4)',
    tests: ['event-nextday'],
    must_mention: '正字除数 5',
  },
  {
    desc: 'M8675 示众台：正字里程碑的第 1 档 >9 改成 >8',
    file: 'ere/event/event-nextday-pillory.js',
    find: "if (cflag(661) > 9) era.print('『真的一个打十个！』');",
    replace: "if (cflag(661) > 8) era.print('『真的一个打十个！』');",
    tests: ['event-nextday'],
    must_mention: '9 压线不出第一档里程碑',
  },
  {
    desc: 'M8676 示众台：解放阈值 120 改成 130',
    file: 'ere/event/event-nextday-pillory.js',
    find: '> 120 + cflag(9) * 40',
    replace: '> 130 + cflag(9) * 40',
    tests: ['event-nextday'],
    must_mention: '解放播报',
  },
  {
    desc: 'M8677 示众台：解放后的状态写回 8（没真正解放）',
    file: 'ere/event/event-nextday-pillory.js',
    find: '    chara(cid).invasion.状态 = 0; // :2403 CFLAG:1 = 0',
    replace: '    chara(cid).invasion.状态 = 8; // :2403 CFLAG:1 = 0',
    tests: ['event-nextday'],
    must_mention: '状态归 0',
  },
  {
    desc: 'M8679 示众台：肛门珠写成私处珠（JUEL:2 → JUEL:1）',
    file: 'ere/event/event-nextday-pillory.js',
    find: 'era.add(`juel:${cid}:2`, count_a);',
    replace: 'era.add(`juel:${cid}:1`, count_a);',
    tests: ['event-nextday'],
    must_mention: 'JUEL:2 += COUNT_A',
  },
  // —— #400（N16）二轮返工：随机上界（RAND:N 的 N）逐处钉住 ——
  {
    desc: 'M8680 处女献上：S 的 RAND:3 改成 RAND:4（上界不参与命中，只能靠探针守）',
    file: 'ere/event/event-nextday.js',
    find: 'let s = -rand(3);',
    replace: 'let s = rand(4);',
    tests: ['event-nextday'],
    must_mention: '处女献上：S = -RAND:3',
  },
  {
    desc: 'M8681 尿床准入：RAND:12 改成 RAND:11',
    file: 'ere/event/event-nextday.js',
    find: 'rand(12) >',
    replace: 'rand(11) >',
    tests: ['event-nextday'],
    must_mention: '尿床：准入 RAND:12',
  },
  {
    desc: 'M8682 尿床一档：RAND:4 改成 RAND:5',
    file: 'ere/event/event-nextday.js',
    find: 'switch (rand(4)) {',
    replace: 'switch (rand(5)) {',
    tests: ['event-nextday'],
    must_mention: '导管一档 RAND:4',
  },
  {
    desc: 'M8683 尿床三档：RAND:3 改成 RAND:4',
    file: 'ere/event/event-nextday.js',
    find: 'switch (rand(3)) {',
    replace: 'switch (rand(4)) {',
    tests: ['event-nextday'],
    must_mention: '导管三档 RAND:3',
  },
  {
    desc: 'M8684 夜这い：上界算错（rand(pool.length) 改小 1）',
    file: 'ere/event/event-nextday.js',
    find: 'let index = rand(pool.length);',
    replace: 'let index = rand(pool.length - 1);',
    tests: ['event-nextday'],
    must_mention: '夜这い：RAND:(合格人数 2)',
  },
  {
    desc: 'M8685 遛狗：上界算错（rand(walking) 改小 1）',
    file: 'ere/event/event-nextday.js',
    find: 'walking = rand(walking);',
    replace: 'walking = rand(walking - 1);',
    tests: ['event-nextday'],
    must_mention: '遛狗：RAND:(CHARANUM-1)',
  },
  {
    desc: 'M8686 朝フェラ：上界算错（rand(candidates.length) 改小 1）',
    file: 'ere/event/event-nextday.js',
    find: 'let e = rand(candidates.length);',
    replace: 'let e = rand(candidates.length - 1);',
    tests: ['event-nextday'],
    must_mention: '朝フェラ：E = RAND:F',
  },
  {
    desc: 'M8687 示众台：侵犯者 RAND:5 改成 RAND:4',
    file: 'ere/event/event-nextday-pillory.js',
    find: 'let user = rand(5) + 1;',
    replace: 'let user = rand(4) + 1;',
    tests: ['event-nextday'],
    must_mention: 'RAND:5（侵犯者）',
  },
  {
    desc: 'M8688 示众台：通配涂鸦 RAND:6 改成 RAND:5',
    file: 'ere/event/event-nextday-pillory.js',
    find: 'const rolled = rand(6);',
    replace: 'const rolled = rand(5);',
    tests: ['event-nextday'],
    must_mention: 'RAND:6（涂鸦）',
  },
  {
    desc: 'M8689 示众台：通用十四句 RAND:14 改成 RAND:13',
    file: 'ere/event/event-nextday-pillory.js',
    find: 'const rolled = rand(14);',
    replace: 'const rolled = rand(13);',
    tests: ['event-nextday'],
    must_mention: 'RAND:14（通用涂鸦）',
  },
  {
    desc: 'M8690 示众台：处女支的 RAND:20 改成 RAND:19',
    file: 'ere/event/event-nextday-pillory.js',
    find: "    era.print('『处女』'); // :1616\n    count_a += rand(20) + 1;",
    replace:
      "    era.print('『处女』'); // :1616\n    count_a += rand(19) + 1;",
    tests: ['event-nextday'],
    must_mention: 'RAND:20/10/10（次数）',
  },
  {
    desc: 'M9880 避孕套判定·主人侧：清位删（TEQUIP:35 不清零，下次判定会重复触发）',
    file: 'ere/event/source-check.js',
    find: `    era.print('射在避孕套里');
    chara(cid).event.主人避孕套 = 0;
    clear_condom_ejac();
  } else if (`,
    replace: `    era.print('射在避孕套里');
    clear_condom_ejac(); // 变异：主人避孕套清位删
  } else if (`,
    tests: ['source-check'],
    must_mention: '避孕套',
  },
  {
    desc: 'M9881 避孕套判定：主人/助手分支的清位对象写反（TEQUIP:35/36 互换）',
    file: 'ere/event/source-check.js',
    find: `    era_flag.assiplay === 0 &&
    chara(cid).event.主人避孕套 &&
    condom_ejac_hit()
  ) {
    era.print('射在避孕套里');
    chara(cid).event.主人避孕套 = 0;`,
    replace: `    era_flag.assiplay === 0 &&
    chara(cid).train.助手避孕套 && // 变异：主人侧误读助手位
    condom_ejac_hit()
  ) {
    era.print('射在避孕套里');
    chara(cid).train.助手避孕套 = 0;`,
    tests: ['source-check'],
    must_mention: '避孕套',
  },
  {
    desc: 'M10209 FIRST-SETTING QUE2MK 恒返回值错位（0 → 1）',
    file: 'ere/event/first-setting.js',
    find: 'function que2mk() {\n  return 0;\n}',
    replace: 'function que2mk() {\n  return 1;\n}',
    tests: ['event-first'],
    must_mention: 'QUE2MK 恒返回 0',
  },
  {
    desc: 'M10210 FIRST-SETTING 魔王性别男性支：童贞写入错位（1 → 0）',
    file: 'ere/event/first-setting.js',
    find: 'if (result === 0) {\n      chara(0).train.童贞 = 1;',
    replace: 'if (result === 0) {\n      chara(0).train.童贞 = 0;',
    tests: ['event-first'],
    must_mention: '四个分支各自的 TALENT/CFLAG 写入',
  },
  {
    desc: 'M10211 FIRST-SETTING 魔王性别女性支：男人写入错位（0 → 1）',
    file: 'ere/event/first-setting.js',
    find: '} else if (result === 1) {\n      chara(0).train.童贞 = 0;\n      chara(0).chara.男人 = 0;',
    replace:
      '} else if (result === 1) {\n      chara(0).train.童贞 = 0;\n      chara(0).chara.男人 = 1;',
    tests: ['event-first'],
    must_mention: '四个分支各自的 TALENT/CFLAG 写入',
  },
  {
    desc: 'M10212 FIRST-SETTING 魔王性别扶她支：扶她写入错位（1 → 0）',
    file: 'ere/event/first-setting.js',
    find: '} else if (result === 2) {\n      chara(0).train.童贞 = 1;\n      chara(0).chara.男人 = 0;\n      chara(0).chara.扶她 = 1;',
    replace:
      '} else if (result === 2) {\n      chara(0).train.童贞 = 1;\n      chara(0).chara.男人 = 0;\n      chara(0).chara.扶她 = 0;',
    tests: ['event-first'],
    must_mention: '四个分支各自的 TALENT/CFLAG 写入',
  },
  {
    desc: 'M10213 FIRST-SETTING 魔王性别少年支：未熟写入错位（1 → 0）',
    file: 'ere/event/first-setting.js',
    find: 'chara(0).train.未熟 = 1;',
    replace: 'chara(0).train.未熟 = 0;',
    tests: ['event-first'],
    must_mention: '四个分支各自的 TALENT/CFLAG 写入',
  },
  {
    desc: 'M10214 FIRST-SETTING 肉棒尺寸写入偏移（result → result+1）',
    file: 'ere/event/first-setting.js',
    find: 'chara(0).chara.阴茎的状态 = result;\n      return result;',
    replace: 'chara(0).chara.阴茎的状态 = result + 1;\n      return result;',
    tests: ['event-first'],
    must_mention: '0-4 写 chara(0).chara.阴茎的状态',
  },
  {
    desc: 'M10215 FIRST-SETTING 狂王性别写入偏移（result → result+1）',
    file: 'ere/event/first-setting.js',
    find: 'game.system.狂王性别 = result;',
    replace: 'game.system.狂王性别 = result + 1;',
    tests: ['event-first'],
    must_mention: '0-2 写 game.system.狂王性别',
  },
  {
    desc: 'M10216 FIRST-SETTING 跳过肉棒尺寸的判据写反（!== 1 → !== 0）',
    file: 'ere/event/first-setting.js',
    find: 'if (maou_sex !== 1) {',
    replace: 'if (maou_sex !== 0) {',
    tests: ['event-first'],
    must_mention: '跳过肉棒尺寸一问',
  },
  {
    desc: 'M10217 FIRST-SETTING 初吻对象初值写反（-1 → 1）',
    file: 'ere/event/first-setting.js',
    find: 'chara(0).train.初吻对象 = -1; // :784',
    replace: 'chara(0).train.初吻对象 = 1; // :784',
    tests: ['event-first'],
    must_mention: '开局直线赋值逐项一致',
  },
  // —— #502：SENGEN_VIDEO_DE（侵略/INVASION.ERB:1269-1281）与宣言数真读 ——
  {
    desc: 'M10744 流行度的骰子判定恒真（SIF RAND:3 改 if (true)，#502）',
    file: 'ere/event/event-nextday.js',
    find: '  if (rand(3)) {',
    replace: '  if (true) { // 变异：骰子恒真',
    tests: ['event-nextday'],
    must_mention: 'RAND:3 的上界',
  },
  {
    desc: 'M10745 过时倒计时的清零条件改坏（<= 0 改 <= -1，#502）',
    file: 'ere/event/event-nextday.js',
    find: '  if (era_exflag.crystal_ball_expire <= 0) {',
    replace:
      '  if (era_exflag.crystal_ball_expire <= -1) { // 变异：清零条件改坏',
    tests: ['event-nextday'],
    must_mention: '9013 落到 0 → 两段清零',
  },
  {
    desc: 'M10746 流行度的清零条件改坏（<= 0 改 === 0，负值不再清零，#502）',
    file: 'ere/event/event-nextday.js',
    find: '  if (era_exflag.crystal_ball_popularity <= 0) {',
    replace:
      '  if (era_exflag.crystal_ball_popularity === 0) { // 变异：负值漏过',
    tests: ['event-nextday'],
    must_mention: '9012 落到 -1 → 第二段清零',
  },
  {
    desc: 'M10747 宣言数退回硬编码 0（EX_FLAG:9012 真读删除，#502）',
    file: 'ere/event/event-turnend.js',
    find: '      const ex_flag_9012 = era_exflag.crystal_ball_popularity;',
    replace: '      const ex_flag_9012 = 0; // 变异：退回硬编码',
    tests: ['event-turnend'],
    must_mention: '流行度 6 → 当日衰减为 5',
  },
  // —— #508：自动调教三连的调教窗口与回合尾部结算接线 ——
  {
    desc: 'M11000 回合结算不开调教窗口（删 beginTrain——自动调教三连的 SOURCE/PALAM 写全被引擎静默丢弃；夹具里 tflag 二段写先炸）',
    file: 'ere/system/turnend-settle.js',
    find: '  era.beginTrain(...era.getAddedCharacters());',
    replace: '  // 变异：不开调教窗口',
    tests: ['event-turnend'],
    must_mention: 'key error in getter/setter! key (tflag:0)',
  },
  {
    desc: 'M11001 回合结算不关调教窗口（删 endTrain——调教域表不删）',
    file: 'ere/system/turnend-settle.js',
    find: '  era.endTrain();',
    replace: '  // 变异：不关窗口',
    tests: ['event-turnend'],
    must_mention: '开窗在关窗之前',
  },
  {
    desc: 'M11002 回合尾部不调 AUTOTRAIN（PALAM → 珠/能力的结算整段丢失）',
    file: 'ere/system/turnend-settle.js',
    find: "  await require('#/event/event-autotrain').autotrain();",
    replace: '  // 变异：不调 AUTOTRAIN',
    tests: ['event-turnend'],
    must_mention: 'AUTOTRAIN 跑在调教窗口里',
  },
  {
    desc: 'M11003 FORMAT 循环不逐角色指 TARGET 指针（format_autotrain 写到旧指针上）',
    file: 'ere/system/turnend-settle.js',
    find: '    era_flag.target = cid;',
    replace: '    // 变异：不指 TARGET 指针',
    tests: ['event-turnend'],
    must_mention: '常时发情的 3000 起步必须落进 palam（窗口开着的直接证据）',
  },
  {
    desc: 'M11470 CHARADEAD_CHECK 存活判据取反（BASE:0 > 0 改成 >= 0：体力 0 也算存活，死亡判定整段不可达）',
    file: 'ere/event/event-aftertrain.js',
    find: '  if ((era.get(`base:${target}:0`) || 0) > 0) {\n    return 0;\n  }',
    replace:
      '  if ((era.get(`base:${target}:0`) || 0) >= 0) { // 变异：0 也算存活\n    return 0;\n  }',
    tests: ['event-charadead'],
    must_mention: '奴隶死亡',
  },
  {
    desc: 'M11471 CHARADEAD_CHECK 濒死自动结束的钳值 1 改成 2（FLAG:35 开关下体力应钳到 1）',
    file: 'ere/event/event-aftertrain.js',
    find: '      chara(target).dungeon.体力 = 1;',
    replace: '      chara(target).dungeon.体力 = 2; // 变异：钳值错',
    tests: ['event-charadead'],
    must_mention: '钳到 1',
  },
  {
    desc: 'M11472 CHARADEAD_CHECK 菲娅线判据取反（目标判据 target === GETCHARA(35) 改成 !==：非菲娅的调教也会被推线）',
    file: 'ere/event/event-aftertrain.js',
    find: '  if (route >= 160 && route < 170 && target === get_chara(35)) {',
    replace:
      '  if (route >= 160 && route < 170 && target !== get_chara(35)) { // 变异：判据取反',
    tests: ['event-charadead'],
    must_mention: '菲娅线推进',
  },
  {
    desc: 'M11473 CHARADEAD_CHECK 死亡旗写错段（FLAG:(NO+999) 改成 NO+199——与 @EVENTEND 的删除旗撞段）',
    file: 'ere/event/event-aftertrain.js',
    find: '  era.set(`flag:${target + 999}`, -2);',
    replace: '  era.set(`flag:${target + 199}`, -2); // 变异：段错',
    tests: ['event-charadead'],
    must_mention: 'FLAG:(31+999)',
  },
  {
    desc: 'M11474 CHARADEAD_CHECK 威压感门槛 >= 3 改成 >= 4（杀害数 3 不再授予）',
    file: 'ere/event/event-aftertrain.js',
    find: "  if (game.event.杀死人数 >= 3 && !era.get('talent:0:93')) {",
    replace: "  if (game.event.杀死人数 >= 4 && !era.get('talent:0:93')) {",
    tests: ['event-charadead'],
    must_mention: '威压感',
  },
  {
    desc: 'M11475 CHARADEAD_CHECK 威压感只播报不落素质（漏写 TALENT:MASTER:93 = 1）',
    file: 'ere/event/event-aftertrain.js',
    find: "    era.set('talent:0:93', 1);",
    replace: '    // 变异：漏写威压感素质',
    tests: ['event-charadead'],
    must_mention: '威压感：杀害数累计到 3',
  },
  {
    desc: 'M11476 CHARADEAD_CHECK 魔王死亡无候补分支漏 QUIT（GAMEOVER 后游戏继续）',
    file: 'ere/event/event-aftertrain.js',
    find: '      await era.input();\n      era.quit();',
    replace: '      await era.input();\n      // 变异：漏 QUIT',
    tests: ['event-charadead'],
    must_mention: '魔王死亡·无候补',
  },
  {
    desc: 'M11477 EVENTEND 死亡删除分支漏调 PARTY_CHAR_DEL（队伍数据不复位就除名）',
    file: 'ere/event/event-end.js',
    find: '      party_char_del(target); // :372 CALL PARTY_CHAR_DEL, A（#548 起真身）',
    replace: '      // 变异：漏调 PARTY_CHAR_DEL',
    tests: ['event-charadead'],
    must_mention: 'party_del 复位',
  },
];
