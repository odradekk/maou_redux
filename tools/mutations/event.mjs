// 变异条目表切片：ere/event/（调教事件链与 SOURCE_CHECK）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号不人工分配，
// 只作引用锚点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）——
// 重号由 gate_shape 随 --verify 秒级核对。
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
    find: '  era_flag.elf_realm_conquered = 2; // :72 FLAG:87 = 2',
    replace: '  era_flag.elf_realm_conquered = 1; // 变异：状态机断在 1',
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
    must_mention: '不得置 99',
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
    file: 'ere/event/event-endcheck.js',
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
    must_mention: 'DAY != 500 时不得调用',
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
    find: '      era.quit();',
    replace:
      '      return 1; // 变异：quit 调用被拆，哨兵复辟（#148 前旧形态）',
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
];
