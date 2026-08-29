// 变异条目表切片：ere/page/（画面与交互组件）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号是历史惯性编号
// （M117 曾被两票撞号使用），只作引用锚点保留，不再人工分配。
export default [
  {
    desc: 'M3 999 出口：@USERCOM 不再发起 BEGIN AFTERTRAIN',
    file: 'ere/page/page-usercom.js',
    find: `  if (result === 999) {
    // :173-175 调教结束 → BEGIN AFTERTRAIN（事件链暂存，回合循环提交）
    begin(STATE.AFTERTRAIN);
  }`,
    replace: `  if (result === 999) {
    // 变异：不发起转场
  }`,
    tests: ['train-loop', 'page-usercom'],
    must_mention: '端到端',
  },
  {
    desc: 'M8 SELECT_TARGET 取消：999 返回 1（假选中）',
    file: 'ere/page/page-select-target.js',
    find: `    if (result === 999) {
      // :294-296 返回 → RETURN 0
      return 0;
    }`,
    replace: `    if (result === 999) {
      // 变异：返回 1
      return 1;
    }`,
    tests: ['page-select-target', 'page-shop'],
    must_mention: '取消',
  },
  {
    desc: 'M9 SELECT_TARGET 选中：漏写 FLAG:1（前回调教目标）',
    file: 'ere/page/page-select-target.js',
    find: `      era_flag.target = result;
      era.set('flag:1', result);
      return 1;`,
    replace: `      era_flag.target = result;
      return 1;`,
    tests: ['page-select-target'],
    must_mention: 'FLAG:1',
  },
  {
    desc: 'M10 IS_TRAINABLE：删掉占用判据（CFLAG:x:1）',
    file: 'ere/page/page-select-target.js',
    find: `  // :111-112 SIF CFLAG:ARG:1 != 0 → 2
  if ((era.get(\`cflag:\${cid}:1\`) || 0) !== 0) {
    return 2;
  }`,
    replace: `  // :111-112 变异：删掉占用判据`,
    tests: ['page-select-target'],
    must_mention: 'IS_TRAINABLE',
  },
  {
    desc: 'M11 PRINT_PALAM 百分比：满刻度改用当前等级阈值（而非下一级）',
    file: 'ere/page/page-train.js',
    find: '    const next_threshold = PALAMLV[level + 1];',
    replace: '    const next_threshold = PALAMLV[level];',
    tests: ['page-train'],
    must_mention: '手算基线',
  },
  {
    desc: 'M12 PRINT_PALAM 条后数值丢失（outContent 空——语义值载体没了，比对未解释）',
    file: 'ere/page/page-train.js',
    find: "      outContent: String(value).padStart(PALAM_VALUE_WIDTH, ' '),",
    replace: "      outContent: '', // 变异：数值丢失",
    tests: ['page-train', 'compare-first-turn'],
    must_mention: '条后数值',
  },
  {
    desc: 'M16 SELECT_TARGET 翻页：开窗判据边界错一格（下界改开区间）',
    file: 'ere/page/page-select-target.js',
    find: '    if (index >= no_page * num_page && index < (no_page + 1) * num_page) {',
    replace:
      '    if (index > no_page * num_page && index < (no_page + 1) * num_page) {',
    tests: ['page-select-target'],
    must_mention: '翻页',
  },
  {
    desc: 'M18 100 分支守卫：育儿室判据取反（10 改 11，守卫永不成立）',
    file: 'ere/page/page-shop.js',
    find: "    if ((era.get('cflag:0:1') || 0) === 10) {",
    replace: "    if ((era.get('cflag:0:1') || 0) === 11) {",
    tests: ['page-shop'],
    must_mention: '育儿室',
  },
  {
    desc: 'M35 SHOW_JUEL 数值列：右对齐宽 6 改 5',
    file: 'ere/page/page-ablup.js',
    find: '    row += ` ${name}点数：${String(value).padStart(6)}`; // {JUEL,6,RIGHT}',
    replace:
      '    row += ` ${name}点数：${String(value).padStart(5)}`; // {JUEL,6,RIGHT}',
    tests: ['juel-check'],
    must_mention: 'SHOW_JUEL 三行',
  },
  {
    desc: 'M36 等级行公式：本级需求 lv*10+10 改 lv*10+5',
    file: 'ere/page/page-info-exp.js',
    find: `    // :1051-1053 其余
    need = lv * 10 + 10;`,
    replace: `    // :1051-1053 其余
    need = lv * 10 + 5;`,
    tests: ['juel-check'],
    must_mention: 'SHOW_INFO_EXP 的经验行',
  },
  {
    desc: 'M56 指令按钮渲染删掉（回到 [999] 单按钮）',
    file: 'ere/page/page-usercom.js',
    find: "    era.printButton(`${era.get(`traincommandname:${id}`) ?? ''}`, id);",
    replace: '    // 变异：按钮渲染删除',
    tests: ['source-check'],
    must_mention: '端到端',
  },
  {
    desc: 'M97 引用行号改坏（:53→:48 死代码行——在册校验 + 完整性双红）',
    file: 'ere/page/page-main-menu.js',
    find: "      fontWeight: 'bold', // :53 FONTBOLD（整行粗体，片段级携带）",
    replace:
      "      fontWeight: 'bold', // :48 FONTBOLD（整行粗体，片段级携带）",
    tests: ['trace-check'],
    must_mention: '已不存在',
  },
  {
    desc: 'M109 标题新游戏漏盖版本戳（init_portcflag 调用删除）',
    file: 'ere/page/page-title.js',
    find: `      // 移植自建（issue #67，非原作动作）：给刚加入的角色盖移植数据版本戳
      // （portcflag 扩展表，每个加入点 addCharacter 之后都调它）
      init_portcflag(0);`,
    replace: '      // 变异：portcflag 版本戳不盖',
    tests: ['page-title'],
    must_mention: 'portcflag:0:数据版本',
  },
  {
    desc: 'M116 标题音乐播错曲（TFM-003A_17 → 据点2）',
    file: 'ere/page/page-title.js',
    find: "    era.playMusic('TFM-003A_17.mp3', { loop: true });",
    replace: "    era.playMusic('据点2.mp3', { loop: true });",
    tests: ['page-title'],
    must_mention: 'TFM-003A_17',
  },
  {
    desc: 'M117 标题音乐丢循环（{loop:true} → {}——Emuera PLAYBGM 默认循环）',
    file: 'ere/page/page-title.js',
    find: "    era.playMusic('TFM-003A_17.mp3', { loop: true });",
    replace: "    era.playMusic('TFM-003A_17.mp3', {});",
    tests: ['page-title'],
    must_mention: '（循环）',
  },
  {
    desc: 'M118 主菜单 BGM 守卫删掉（开关恒真，新档也播）',
    file: 'ere/page/page-main-menu.js',
    find: `  if (era_audio.bgm_enabled === 1) {
    era.playMusic('据点2.mp3', { loop: true });
  }`,
    replace: `  era.playMusic('据点2.mp3', { loop: true });`,
    tests: ['page-main-menu'],
    must_mention: '新档默认',
  },
  {
    desc: 'M121 标题图守卫删掉（资源未启用也硬输出图片行）',
    file: 'ere/page/page-title.js',
    find: `  if (era.checkImage('TITLE')) {
    era.printWholeImage('TITLE');
  }`,
    replace: "  era.printWholeImage('TITLE');",
    tests: ['page-title'],
    must_mention: '纯文本兜底',
  },
  {
    desc: 'M137 重绘清行改「本次行数」而非锚点跨度（回显在块下方，清不干净——屏幕每轮净涨一行）',
    file: 'ere/page/components/screen-block.js',
    find: '    const span = era.getLineCount() - this.anchor_row;',
    replace: '    const span = this.row_count;',
    tests: ['screen-block', 'page-main-menu'],
    must_mention: '上方内容完好',
  },
  {
    desc: 'M138 重绘不清屏直接重画（退回追加式——屏幕随交互增长）',
    file: 'ere/page/components/screen-block.js',
    find: `    const span = era.getLineCount() - this.anchor_row;
    if (span > 0) {`,
    replace: `    const span = era.getLineCount() - this.anchor_row;
    if (span > 0 && false) {`,
    tests: ['screen-block', 'page-main-menu'],
    must_mention: '上方内容完好',
  },
  {
    desc: 'M139 锚点挪到绘制之后（跨度漏掉块自身行——旧行残留、越清越涨）',
    file: 'ere/page/components/screen-block.js',
    find: `    this.anchor_row = era.getLineCount();
    await this.draw_content();`,
    replace: `    await this.draw_content();
    this.anchor_row = era.getLineCount();`,
    tests: ['screen-block', 'page-main-menu'],
    must_mention: '上方内容完好',
  },
  {
    desc: 'M140 行数不测量（row_count 恒 0——「组件自知占几行」失守）',
    file: 'ere/page/components/screen-block.js',
    find: '    this.row_count = era.getLineCount() - this.anchor_row;',
    replace: '    this.row_count = 0;',
    tests: ['screen-block'],
    must_mention: '行数测量',
  },
  {
    desc: 'M141 menu_button 删调暗色（未选中态与选中态同色）',
    file: 'ere/page/components/menu-button.js',
    find: '    dim ? { color: MENU_BUTTON_DIM_COLOR } : undefined,',
    replace: '    undefined,',
    tests: ['screen-block', 'page-main-menu'],
    must_mention: '调暗',
  },
  {
    desc: 'M142 menu_button 手写编号前缀（引擎 showAcc 自动拼——重复前缀，PR #30 形态）',
    file: 'ere/page/components/menu-button.js',
    find: '    `▌${label}`,',
    replace: '    `[${accelerator}] ▌${label}`,',
    tests: ['screen-block', 'page-main-menu'],
    must_mention: '编号前缀',
  },
  {
    desc: 'M143 主菜单改回纯追加（show_shop 的 redraw → draw，就地重绘失守）',
    file: 'ere/page/page-shop.js',
    find: '  return main_menu.redraw();',
    replace: '  return main_menu.draw();',
    tests: ['page-main-menu'],
    must_mention: '不涨屏',
  },
  {
    desc: 'M144 菜单块提为模块级单例（跨会话复用旧锚点——转场后清掉新局上方内容）',
    file: 'ere/page/page-shop.js',
    find: '  const main_menu = create_main_menu();',
    replace: `  main_menu_singleton = main_menu_singleton ?? create_main_menu();
  const main_menu = main_menu_singleton;`,
    tests: ['page-main-menu'],
    must_mention: '跨会话',
  },
  {
    desc: 'M150 重绘判据反接（指令轮反而就地重绘——叙述被吃；无指令轮追加）',
    file: 'ere/page/page-train.js',
    find: '  if (command_path_seen) {',
    replace: '  if (!command_path_seen) { // 变异：判据反接',
    tests: ['page-train'],
    must_mention: '指令轮追加绘制',
  },
  {
    desc: 'M151 EVENTTRAIN 不重建组件（跨会话旧锚点清掉新局内容）',
    file: 'ere/page/page-train.js',
    find: `on('EVENTTRAIN', () => {
  status_block = new ScreenBlock(() => draw_status_screen(era_flag.target));
  command_path_seen = false;
});`,
    replace: `on('EVENTTRAIN', () => {
  // 变异：组件不重建
  command_path_seen = false;
});`,
    tests: ['page-train'],
    must_mention: '跨会话',
  },
  {
    desc: 'M152 旁路清行自校验删除（重绘行数未回锚点不记录）',
    file: 'ere/page/components/screen-block.js',
    find: `      const remaining = await era.clear(span);
      if (remaining !== this.anchor_row) {
        era.logger.warn(
          \`画面组件重绘后行数 \${remaining} 未回到锚点 \${this.anchor_row}（清行跨度 \${span}）——存在旁路清行\`,
        );
      }`,
    replace: '      await era.clear(span); // 变异：自校验删除',
    tests: ['page-train'],
    must_mention: '旁路清行',
  },
  {
    desc: 'M153 参数条逐格平铺（一次一格——Row 分组丢失，16 格占 16 行）',
    file: 'ere/page/page-train.js',
    find: `  for (let row = 0; row < cells.length; row += PALAM_COLUMNS) {
    era.printMultiColumns(cells.slice(row, row + PALAM_COLUMNS));
  }`,
    replace:
      '  cells.forEach((cell) => era.printMultiColumns([cell])); // 变异：逐格平铺',
    tests: ['page-train'],
    must_mention: '16 格原生进度条',
  },
  {
    desc: 'M154 EVENTCOM 探针不翻标志（重复同指令轮被误判成无指令轮——重绘吃叙述）',
    file: 'ere/page/page-train.js',
    find: `on('EVENTCOM', () => {
  command_path_seen = true;
});`,
    replace: `on('EVENTCOM', () => {
  // 变异：探针失灵`,
    tests: ['page-train'],
    must_mention: '重复执行同一指令',
  },
  {
    desc: 'M155 barWidth 改 24（引擎缺省值——el-col-0 吞掉全部条后数值，验收实测的全绿假象）',
    file: 'ere/page/page-train.js',
    find: 'const PALAM_PROGRESS_BAR_WIDTH = 16;',
    replace: 'const PALAM_PROGRESS_BAR_WIDTH = 24; // 变异：吞数值列',
    tests: ['page-train'],
    must_mention: '条后数值列必须真实渲染',
  },
  {
    desc: 'M156 删掉 progress 的 config（吃引擎缺省 barWidth 24——同 M155 形态）',
    file: 'ere/page/page-train.js',
    find: '      config: { barWidth: PALAM_PROGRESS_BAR_WIDTH },',
    replace: '      // 变异：config 删除，吃引擎缺省 24',
    tests: ['page-train'],
    must_mention: '条后数值列必须真实渲染',
  },
  {
    desc: 'M157 出兵公式：气力 /25 改 /30（INVASION.ERB:267）',
    file: 'ere/page/page-invasion.js',
    find: '  sinkou = Math.floor(chara(0).dungeon.气力 / 25);',
    replace:
      '  sinkou = Math.floor(chara(0).dungeon.气力 / 30); // 变异：公式改坏',
    tests: ['page-invasion', 'event-ending-e2e'],
    must_mention: 'FLAG:81 += 10000/25',
  },
  {
    desc: 'M158 气力减半删除（失败也照减的 :268 语义）',
    file: 'ere/page/page-invasion.js',
    find: '  chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);',
    replace: '  // 变异：不减半',
    tests: ['page-invasion'],
    must_mention: 'BASE:0:1 减半',
  },
  {
    desc: 'M159 威望 +2 删除（结算尾 :978）',
    file: 'ere/page/page-invasion.js',
    find: '  era_exflag.prestige = era_exflag.prestige + 2; // :978 EX_FLAG:99 += 2',
    replace: '  // 变异：威望不增',
    tests: ['page-invasion'],
    must_mention: 'EX_FLAG:99 += 2',
  },
  {
    desc: 'M160 略受质疑折扣公式：(100+(p-60)*2) 改 (100+(p-60))',
    file: 'ere/page/page-invasion.js',
    find: '      sinkou: Math.floor((sinkou * (100 + (prestige - 60) * 2)) / 100),',
    replace:
      '      sinkou: Math.floor((sinkou * (100 + (prestige - 60))) / 100), // 变异',
    tests: ['page-invasion'],
    must_mention: '略受质疑）的侵攻度增量',
  },
  {
    desc: 'M161 相安无事档偷偷打折（61-80 无修正的 :285-286）',
    file: 'ere/page/page-invasion.js',
    find: "    era.print('威望值是【相安无事】');\n    return { sinkou, failed: false };",
    replace:
      "    era.print('威望值是【相安无事】');\n    return { sinkou: Math.floor(sinkou / 4), failed: false }; // 变异",
    tests: ['page-invasion'],
    must_mention: '相安无事）的侵攻度增量',
  },
  {
    desc: 'M162 广受爱戴加成公式：(100+(p-80)) 改 (100+(p-80)*2)',
    file: 'ere/page/page-invasion.js',
    find: '      sinkou: Math.floor((sinkou * (100 + (prestige - 80))) / 100),',
    replace:
      '      sinkou: Math.floor((sinkou * (100 + (prestige - 80) * 2)) / 100), // 变异',
    tests: ['page-invasion'],
    must_mention: '广受爱戴）的侵攻度增量',
  },
  {
    desc: 'M163 侵攻度封顶阈值挪走（>=10000 改 >=99999，:617-618）',
    file: 'ere/page/page-invasion.js',
    find: '  if (era_flag.human_realm_invasion >= 10000) {',
    replace:
      '  if (era_flag.human_realm_invasion >= 99999) { // 变异：封顶失效',
    tests: ['page-invasion'],
    must_mention: '侵攻度封顶',
  },
  {
    desc: 'M164 KYOTEN_EVENT 首档阈值 2000 改 3000（FLAG:93 状态机）',
    file: 'ere/page/page-invasion.js',
    find: '  if (progress >= 2000 && stage === 0) {',
    replace: '  if (progress >= 3000 && stage === 0) { // 变异：阈值挪走',
    tests: ['page-invasion'],
    must_mention: '占领了村庄',
  },
  {
    desc: 'M165 首次侵略传闻守卫删掉（FLAG:AREA == 0 恒假，INVASION_EVENT.ERB:257）',
    file: 'ere/page/page-invasion.js',
    find: '  if ((era.get(`flag:${area}`) || 0) === 0) {',
    replace: '  if ((era.get(`flag:${area}`) || 0) === -1) { // 变异：恒假',
    tests: ['page-invasion'],
    must_mention: '精锐部队',
  },
  {
    desc: 'M166 [999] 取消误报成功（返回 1 消耗回合，:190-191）',
    file: 'ere/page/page-invasion.js',
    find: '    if (result === 999) {\n      return 0; // :190-191\n    }',
    replace:
      '    if (result === 999) {\n      return 1; // 变异：取消误报成功\n    }',
    tests: ['page-invasion'],
    must_mention: '零副作用',
  },
  {
    desc: 'M167 魔王侵略经验丢失（EXP:0:80 += SINKOU/2 的写入删除）',
    file: 'ere/page/page-invasion.js',
    find: '  chara(0).dungeon.战斗经验 += exp_gain; // EXP:0:80（魔王的侵略经验）',
    replace: '  // 变异：经验写入删除',
    tests: ['page-invasion'],
    must_mention: 'EXP:0:80 += SINKOU/2',
  },
  {
    desc: 'M168 [109] 出兵成功不转场（BEGIN TURNEND 删除，SHOP ver1.0.2.ERB:127）',
    file: 'ere/page/page-shop.js',
    find: '    if ((await invasion()) === 1) {\n      begin(STATE.TURNEND);\n    }',
    replace: '    await invasion(); // 变异：不转场',
    tests: ['page-invasion', 'page-shop'],
    must_mention: 'TURNEND',
  },
  {
    desc: 'M221 [109] 侵略按钮 accelerator 改坏（109 → 1090——入口在实机上不存在，#129 形态）',
    file: 'ere/page/page-main-menu.js',
    find: "  era.printButton('侵略', 109);",
    replace: "  era.printButton('侵略', 1090); // 变异：accelerator 改坏",
    tests: ['page-main-menu'],
    must_mention: '侵略必须是按钮',
  },
  {
    desc: 'M196 人间界结局判据删掉防重复半边（FLAG:82 == 0）',
    file: 'ere/page/page-invasion.js',
    find: `  if (
    era_flag.human_realm_invasion >= 10000 &&
    era_flag.human_realm_fallen === 0
  ) {`,
    replace: `  if (era_flag.human_realm_invasion >= 10000) { // 变异：删 FLAG:82 == 0 半边`,
    tests: ['event-ending'],
    must_mention: '横幅只出现一次',
  },
  {
    // #120 端到端的专属靶：M196（删防重复半边）在端到端路径上不可观察——
    // FLAG:82 置 1 后 invasion() 开头的「地上征服后」分支（#118 取舍 4，
    // 有意登记的待办）挡住再次出兵，invasion_check 不再被调。端到端能守
    // 的是判据整支的存在：删掉后新档永远到不了 ENDING_1（循环不停止）
    desc: 'M220 人间界结局判据整支删除（#120 端到端：新档循环永不停止）',
    file: 'ere/page/page-invasion.js',
    find: `  // :1001-1003 人间界：FLAG:81 >= 10000 && FLAG:82 == 0 → ENDING_1
  if (
    era_flag.human_realm_invasion >= 10000 &&
    era_flag.human_realm_fallen === 0
  ) {
    // QUIT 是 throw 型（#148，引擎 quit() 抛 Error("quit")）：选 [1] 退出
    // 时异常在 ending_1 内部炸穿，下面两行不可达——原作 QUIT 后 :1003-1004
    // 同样不可达，靠的也是异常炸穿而非哨兵短路（旧写法 ended !== 1 是夹具
    // 降格期发明的机制，#148 拆除；真机上该判断唯一可达的出口只有「正常
    // 返回 0」——见 event-ending.js 的 JSDoc）。调用链上任何一层都不得
    // try/catch 吞掉这个异常，夹具同款 throw 由测试钉住
    await ending_1();
    era_exflag.prestige = era_exflag.prestige + 10; // :1003 EX_FLAG:99 += 10
    era.print('声望+10'); // :1004 PRINTL
    return;
  }`,
    replace: `  // 变异：人间界判据整支删除
  if (false) {
    return;
  }`,
    tests: ['event-ending-e2e'],
    must_mention: '仍未通关',
  },
  {
    desc: 'M197 人间界结局门槛 10000 改 9999（INVASION.ERB:1001）',
    file: 'ere/page/page-invasion.js',
    find: `    era_flag.human_realm_invasion >= 10000 &&
    era_flag.human_realm_fallen === 0`,
    replace: `    era_flag.human_realm_invasion >= 9999 && // 变异：门槛改坏
    era_flag.human_realm_fallen === 0`,
    tests: ['event-ending'],
    must_mention: '预置输入已耗尽',
  },
  {
    desc: 'M198 精灵领域判据门槛改成恒真（FLAG:86，INVASION.ERB:1005）',
    file: 'ere/page/page-invasion.js',
    find: `    era_flag.elf_realm_invasion >= 10000 &&
    era_flag.elf_realm_conquered === 0`,
    replace: `    era_flag.elf_realm_invasion >= 0 && // 变异：门槛恒真
    era_flag.elf_realm_conquered === 0`,
    tests: ['event-ending'],
    must_mention: '空转零输出',
  },
  {
    desc: 'M223 LIST_DATA 高亮：删掉 LASTSAVE_NO 的浅绿（SYSTEM_DATA.ERB:309-310）',
    file: 'ere/page/page-save-load.js',
    find: `    // :309-310 SIF L_I == LASTSAVE_NO → LIGHTGREEN（后设覆盖前者）
    if (i === era_flag.last_save_no) {
      color = 'lightgreen';
    }`,
    replace: `    // :309-310 变异：删掉 LASTSAVE_NO 高亮`,
    tests: ['page-save-load'],
    must_mention: '上次存档号高亮 LIGHTGREEN',
  },
  {
    desc: 'M224 覆盖确认整段跳过（存在槽不再问，SYSTEM_DATA.ERB:163-171）',
    file: 'ere/page/page-save-load.js',
    find: `      if (has_valid_save(comment)) {
        // :165-166
        era.print('存档已经存在，确定要覆盖么？');`,
    replace: `      if (false) {
        // :165-166 变异：覆盖确认永不触发
        era.print('存档已经存在，确定要覆盖么？');`,
    tests: ['page-save-load'],
    must_mention: '取消时不得存档',
  },
  {
    desc: 'M225 故事命名截断放宽（32 → 33 字符，SYSTEM_DATA.ERB:202）',
    file: 'ere/page/page-save-load.js',
    find: '    chara(0).system.故事名 = name.substring(0, 32);',
    replace:
      '    chara(0).system.故事名 = name.substring(0, 33); // 变异：上限改坏',
    tests: ['page-save-load'],
    must_mention: 'CSTR:MASTER:99 只存前 32 字符',
  },
  {
    desc: 'M226 存档界面翻页步长改坏（+20 → +19，SYSTEM_DATA.ERB:140-146）',
    file: 'ere/page/page-save-load.js',
    find: `    } else if (result === 102 && pos + PAGE_LEN < 99) {
      // :140-146
      pos += PAGE_LEN;`,
    replace: `    } else if (result === 102 && pos + PAGE_LEN < 99) {
      // :140-146
      pos += PAGE_LEN - 1; // 变异：步长改坏`,
    tests: ['page-save-load'],
    must_mention: '翻页往返后回到首页起点 0',
  },
  {
    desc: 'M227 删除存档：rmData 调用移除（SYSTEM_DATA.ERB:284）',
    file: 'ere/page/page-save-load.js',
    find: '        await era.rmData(result);',
    replace: '        // 变异：删除调用移除',
    tests: ['page-save-load'],
    must_mention: '确认后必须调 era.rmData(5)',
  },
  {
    desc: 'M228 SAVEINFO 时段判据反转（TIME == 0 改 == 1，SYSTEM ver1.0.3.ERB:955）',
    file: 'ere/page/page-save-load.js',
    find: "  const day_half = era_flag.time === 0 ? '午前' : '午后';",
    replace:
      "  const day_half = era_flag.time === 1 ? '午前' : '午后'; // 变异：判据反转",
    tests: ['page-save-load'],
    must_mention: '正在调教:玛奥',
  },
  {
    desc: 'M229 LASTSAVE_NO 压栈不滑动（ARRAYSHIFT 退化为只写 [0]，SYSTEM_DATA.ERB:186）',
    file: 'ere/page/page-save-load.js',
    find: `  for (let i = 9; i > 0; i -= 1) {
    era.set(\`flag:\${10019 + i}\`, era.get(\`flag:\${10019 + i - 1}\`) ?? -1);
  }
  era_flag.last_save_no = idx;`,
    replace: `  // 变异：不滑动历史元素
  era_flag.last_save_no = idx;`,
    tests: ['page-save-load'],
    must_mention: '旧 [0] 移到 [1]',
  },
  {
    desc: 'M230 读档成功不写 LASTLOAD_NO（SYSTEM_DATA.ERB:73 的引擎行为等价物）',
    file: 'ere/page/page-save-load.js',
    find: `        era_flag.last_load_no = result;`,
    replace: `        // 变异：漏写 LASTLOAD_NO`,
    tests: ['page-save-load'],
    must_mention: 'LASTLOAD_NO = 本次槽号',
  },
  {
    desc: 'M231 EX_FLAG:2801 钳制阈值改坏（< 10 改 < 4，SYSTEM_DATA.ERB:74）',
    file: 'ere/page/page-save-load.js',
    find: `        if (era_exflag.first_run_deadline < 10) {
          era_exflag.first_run_deadline = 10;
        }`,
    replace: `        if (era_exflag.first_run_deadline < 4) {
          era_exflag.first_run_deadline = 10;
        }`,
    tests: ['page-save-load'],
    must_mention: 'EX_FLAG:2801 < 10 → 10',
  },
  {
    desc: 'M232 反向钉：把 @SYSTEM_LOADEND 的尾行输出接上读档成功路径（#14 登记的死代码）',
    file: 'ere/page/page-save-load.js',
    find: `      if (await era.loadData(result)) {`,
    replace: `      if (await era.loadData(result)) {
        era.print('兼容性修正中……'); // 变异：模拟接上 @SYSTEM_LOADEND`,
    tests: ['page-save-load'],
    must_mention: '@SYSTEM_LOADEND 是死代码',
  },
  {
    desc: 'M233 存读档指针初始化被删（EVENTFIRST 不再写 -1，#136 返工——fillData 补 0 会冒充 0 号槽）',
    file: 'ere/event/event-first.js',
    find: `  for (let i = 10018; i <= 10028; i += 1) {
    era.set(\`flag:\${i}\`, -1);
  }`,
    replace: `  // 变异：11 槽初值写入被删`,
    tests: ['event-first'],
    must_mention: '必须初始化为 -1',
  },
  {
    desc: 'M234 防撞号登记被删（Flag.yml 的 10018-10028 条目——下一张票无从知道槽被占，#136 返工）',
    file: 'yml/Flag.yml',
    find: `"上次读取存档":
  id: 10018
  name: "last_load_no"
  type: "number"`,
    replace: `# 变异：10018 条目被删`,
    tests: ['page-save-load'],
    must_mention: '未登记进 yml/Flag.yml',
  },
  {
    desc: 'M250 读档转场被拆（begin(next) 删——读档成功后回调用方，#136 实机撞出的无路缺陷，#137 核心）',
    file: 'ere/page/page-save-load.js',
    find: `        begin(next);`,
    replace: `        // 变异：转场被拆，读档成功后照常返回调用方`,
    tests: ['page-save-load', 'page-title', 'page-shop'],
    must_mention: '读档成功必须以转场信号离开',
  },
  {
    desc: 'M251 主菜单 [200]/[300] 存读档按钮被拆（据点两处入口实机不可达，#136 勘误移交 #137 的缺口正主）',
    file: 'ere/page/page-main-menu.js',
    find: `  era.printButton('保存', 200);
  era.printButton('读取', 300);`,
    replace: `  // 变异：两枚按钮被拆`,
    tests: ['page-main-menu'],
    must_mention:
      '保存必须是按钮——没有 [200]，据点存档入口在实机上不存在（#137）',
  },
  {
    desc: 'M253 读档后仍执行 @EVENTSHOP（skip_eventshop 开关被拆——读回来的在售状态被初始化覆盖，system-flow.md:51-53）',
    file: 'ere/page/page-shop.js',
    find: `  if (!skip_eventshop) {
    // @EVENTSHOP 链（普通档是本文件的处理器；口上总开关的 #PRI 档在
    // kojo/kojo-system.js——#PRI 先跑，见 eventshop 注册处的说明）
    await emit('EVENTSHOP');
  }`,
    replace: `  // 变异：跳过开关被拆，一律执行 @EVENTSHOP
  await emit('EVENTSHOP');`,
    tests: ['page-shop'],
    must_mention: '读档后的进入路径不得执行 @EVENTSHOP',
  },
  {
    desc: 'M256 读档钩子链被拆（load_game 成功分支不再 emit EVENTLOAD——钩子存在但从不被调用）',
    file: 'ere/page/page-save-load.js',
    find: `        const next = (await emit('EVENTLOAD')) ?? STATE.SHOP_AFTER_LOAD;`,
    replace: `        const next = STATE.SHOP_AFTER_LOAD; // 变异：钩子链被拆`,
    tests: ['page-save-load'],
    must_mention: '读档成功必须 emit EVENTLOAD 链一次',
  },
  {
    desc: 'M257 SHOP_AFTER_LOAD 的状态映射指回 run_shop 原样（主循环进入也跑 @EVENTSHOP）',
    file: 'ere/system/flow/main-loop.js',
    find: `  [STATE.SHOP_AFTER_LOAD]: () => run_shop({ skip_eventshop: true }),`,
    replace: `  [STATE.SHOP_AFTER_LOAD]: run_shop, // 变异：映射指回原样`,
    tests: ['page-shop'],
    must_mention: '经主循环进入 SHOP_AFTER_LOAD 同样不跑 @EVENTSHOP',
  },
  {
    desc: 'M282 has_valid_save 的 FILE LOST 前缀分支被拆（丢失槽被当有效档可点——#147 点名的无钉住缺口）',
    file: 'ere/page/page-save-load.js',
    find: `function has_valid_save(comment) {
  return comment !== undefined && !comment.startsWith('(FILE LOST) ');
}`,
    replace: `function has_valid_save(comment) {
  return comment !== undefined; // 变异：FILE LOST 前缀分支被拆
}`,
    tests: ['page-save-load'],
    must_mention: '丢失槽不出按钮（只剩 0 号正常档可点）',
  },
  {
    desc: 'M560 INFO2 陷阱写入漏判选中位图（SELECT_FLAG & COMPARE_BIT 改恒真，未选层也被写）',
    file: 'ere/page/page-dungeon-info2.js',
    find: `          for (let l = 0; l < 9; l += 1) {
            for (let c = 0; c < 3; c += 1) {
              if ((select_flag[c] & compare_bit) !== 0) {
                flag_set(l + c * 10 + 300, result === 0 ? -1 : result);
              }
            }
            compare_bit *= 2;
          }`,
    replace: `          for (let l = 0; l < 9; l += 1) {
            for (let c = 0; c < 3; c += 1) {
              // 变异：漏判选中位图，恒写
              flag_set(l + c * 10 + 300, result === 0 ? -1 : result);
            }
            compare_bit *= 2;
          }`,
    tests: ['page-dungeon-info'],
    must_mention: 'B 列不受单元选择影响',
  },
  {
    desc: 'M561 INFO2 设施批量改造的扣款删除（MONEY 与 EX_FLAG:4444 双减，:334-335）',
    file: 'ere/page/page-dungeon-info2.js',
    find: `              era_flag.money -= 10000 * dialogue[1];
              era_exflag.legit_money -= 10000 * dialogue[1];`,
    replace: `              // 变异：不扣款`,
    tests: ['page-dungeon-info'],
    must_mention: 'MONEY 双扣 20000',
  },
  {
    desc: 'M562 INFO2 怪物迎击 toggle 的位换算改坏（FLAG:5 位 4 → 位 3）',
    file: 'ere/page/page-dungeon-info2.js',
    find: `    if (result === 100) {
      flag_set(5, flag_get(5) ^ 16);
    }`,
    replace: `    if (result === 100) {
      flag_set(5, flag_get(5) ^ 8); // 变异：位 3
    }`,
    tests: ['page-dungeon-info'],
    must_mention: '一次翻转置位 16',
  },
  {
    desc: 'M563 ENEMY_COMPARE 阶层比较方向反转（低层靠前 → 高层靠前）',
    file: 'ere/page/page-dungeon-info2.js',
    find: `  if (cflag_get(a, 501) !== cflag_get(b, 501)) {
    return cflag_get(a, 501) < cflag_get(b, 501) ? -1 : 1;
  }`,
    replace: `  if (cflag_get(a, 501) !== cflag_get(b, 501)) {
    return cflag_get(a, 501) > cflag_get(b, 501) ? -1 : 1; // 变异：方向反
  }`,
    tests: ['page-dungeon-info'],
    must_mention: '阶层 2 排在阶层 5 前',
  },
  {
    desc: 'M564 SETUP 宝物判定被「修好」（原作 ELSEIF Z > 300 漏掉 300 本身，#14 登记的原作缺陷照抄——修好必须红）',
    file: 'ere/page/page-dungeon-setup.js',
    find: `        } else if (z > 300) {
          // :227-229 宝物：Y = X + 340
          flag_set(floor + 340, z);
        }`,
    replace: `        } else if (z >= 300) {
          // 变异：修好了原作缺陷（ELSEIF Z > 300 漏 300）
          flag_set(floor + 340, z);
        }`,
    tests: ['page-dungeon-setup'],
    must_mention: '原作缺陷照抄',
  },
  {
    desc: 'M565 ROOM_SETUP 设施改造的扣款删除（10000p 双减，:300-301）',
    file: 'ere/page/page-dungeon-setup.js',
    find: `      era_flag.money -= 10000;
      era_exflag.legit_money -= 10000;
      flag_set(floor + 350, result);`,
    replace: `      // 变异：不扣款
      flag_set(floor + 350, result);`,
    tests: ['page-dungeon-setup'],
    must_mention: 'MONEY -10000',
  },
  {
    desc: 'M566 MON_SET_OMAKASE 玉座跳过删除（(16,16) 也放怪物，:509-511）',
    file: 'ere/page/page-dungeon-setup.js',
    find: `    // :509-511 玉座 (16,16) 跳过
    if (x === 16 && y === 16) {
      continue;
    }`,
    replace: `    // 变异：玉座也放`,
    tests: ['page-dungeon-setup'],
    must_mention: '玉座 (16,16) 不写',
  },
  {
    desc: 'M567 OVERVIEW「迷宫外」判定改坏（501 <= 1 且 502 == 0 → 502 判据删）',
    file: 'ere/page/page-main-menu.js',
    find: `        if (floor <= 1 && (era.get(\`cflag:\${cid}:502\`) || 0) === 0) {
          temp[10] += 1;`,
    replace: `        if (floor <= 1) {
          // 变异：漏判攻略度 0
          temp[10] += 1;`,
    tests: ['page-dungeon-info'],
    must_mention: '迷宫外恰 1 人（勇者甲）',
  },
  {
    desc: 'M568 DRAW_DUNGEON_DAILY 威望上界钳制删除（EX_FLAG:99 >= 100 → 100）',
    file: 'ere/page/page-main-menu.js',
    find: `  if (era_exflag.prestige >= 100) {
    era_exflag.prestige = 100;
  }`,
    replace: `  // 变异：不钳上界`,
    tests: ['page-dungeon-info'],
    must_mention: 'EX_FLAG:99 钳到 100',
  },
  {
    desc: 'M569 主菜单 [102] 地下城按钮删除（实机可达性——#129 型缺口的防复发钉）',
    file: 'ere/page/page-main-menu.js',
    find: `  era.printButton((era.get('flag:502') || 0) === 0 ? '地下城' : '场子', 102);`,
    replace: `  // 变异：不渲染 [102] 按钮`,
    tests: ['page-dungeon-info'],
    must_mention: '[102] 恰一枚',
  },
  {
    desc: 'M570 SETUP 的 2D 模式分流删除（FLAG:502 == 1 不再进 DUNGEON_INFO_MAP，:8-11）',
    file: 'ere/page/page-dungeon-setup.js',
    find: `  if (flag_get(502) === 1) {
    return dungeon_info_map();
  }`,
    replace: `  // 变异：不分流 2D 模式`,
    tests: ['page-dungeon-setup'],
    must_mention: '进了 MAP 界面',
  },

  // —— #212（J2 调教回合骨架）：M704-M712 ——
  {
    desc: 'M705 @P_C 回落顺序倒置（TRAIN_NAME 抢在 TRAINNAME 前）',
    file: 'ere/page/page-usercom.js',
    find: `  let name = era.get(\`traincommandname:\${local}\`) ?? '';
  // :775-776 静态名空 → TRAIN_NAME:LOCAL（定制覆盖层，TRAIN_NAME_INIT 播种）
  if (name.length < 1) {
    name = read_train_name(local);
  }`,
    replace: `  let name = read_train_name(local);
  if (name.length < 1) {
    name = era.get(\`traincommandname:\${local}\`) ?? '';
  }`,
    tests: ['page-usercom'],
    must_mention: 'TRAINNAME 非空时不得读 TRAIN_NAME',
  },
  {
    desc: 'M706 @P_C 第三级回落的全角空格改空串（STRLENSU >= 1 语义丢）',
    file: 'ere/page/page-usercom.js',
    find: `  // :778-779 仍空 → 全角空格（占位非空串——STRLENSU ≥ 1）
  if (name.length < 1) {
    name = '　';
  }`,
    replace: `  // :778-779 变异：占位改空串
  if (name.length < 1) {
    name = '';
  }`,
    tests: ['page-usercom'],
    must_mention: '第三级回落必须落全角空格占位',
  },
  {
    desc: 'M707 LIFE_BAR 濒死阈值 <500 改 <0（濒死标永不出现）',
    file: 'ere/page/components/chara-bars.js',
    find: `  } else if (cur < 500) {
    suffix = '★濒死★';
  }`,
    replace: `  } else if (cur < 0) {
    suffix = '★濒死★';
  }`,
    tests: ['page-train'],
    must_mention: '★濒死★',
  },
  {
    desc: 'M708 VITAL_BAR 气力０条件 <=0 改 <0（0 值不标）',
    file: 'ere/page/components/chara-bars.js',
    find: `    suffix: cur <= 0 ? '★气力０★' : '',`,
    replace: `    suffix: cur < 0 ? '★气力０★' : '',`,
    tests: ['page-train'],
    must_mention: '★气力０★',
  },
  {
    desc: 'M709 主人射精档的 135 守卫补上 >=2000 臂（三处守卫差异抹平）',
    file: 'ere/page/page-train.js',
    find: `    (era.get('talent:0:121') || era.get('talent:0:122')) &&
    !era.get('talent:0:135') &&
    target !== 0`,
    replace: `    (era.get('talent:0:121') || era.get('talent:0:122')) &&
    (!era.get('talent:0:135') || (era.get('base:0:2') || 0) >= 2000) &&
    target !== 0`,
    tests: ['page-train'],
    must_mention: '主人档 TALENT:135 置位即不显示',
  },
  {
    desc: 'M710 目标射精档的 135 >=2000 臂删（守卫差异反向抹平）',
    file: 'ere/page/page-train.js',
    find: `    (era.get(\`talent:\${target}:121\`) || era.get(\`talent:\${target}:122\`)) &&
    (!era.get(\`talent:\${target}:135\`) ||
      (era.get(\`base:\${target}:2\`) || 0) >= 2000)`,
    replace: `    (era.get(\`talent:\${target}:121\`) || era.get(\`talent:\${target}:122\`)) &&
    !era.get(\`talent:\${target}:135\`)`,
    tests: ['page-train'],
    must_mention: '135 置位但 BASE >= 2000 → 显示',
  },
  {
    desc: 'M711 母乳（目标）MAXBASE:3 缺省补 10000 删（:217-218 SIF 写入）',
    file: 'ere/page/page-train.js',
    find: `  if (era.get(\`talent:\${target}:130\`)) {
    if (!(era.get(\`maxbase:\${target}:3\`) > 0)) {
      era.set(\`maxbase:\${target}:3\`, 10000);
    }`,
    replace: `  if (era.get(\`talent:\${target}:130\`)) {
    // 变异：MAXBASE:3 缺省不补`,
    tests: ['page-train'],
    must_mention: '母乳条必须读 MAXBASE:3 的缺省补值',
  },
  {
    desc: 'M712 主人避孕套槽位 35 改 36（TEQUIP 位错）',
    file: 'ere/page/page-train.js',
    find: "      suffix: era.get(`tequip:${target}:35`) ? '避孕套使用中' : '',",
    replace:
      "      suffix: era.get(`tequip:${target}:36`) ? '避孕套使用中' : '',",
    tests: ['page-train'],
    must_mention: '(2500/10000)避孕套使用中',
  },
  {
    desc: 'M716 避孕套守卫回退成二段（tequip:TARGET:35 → tequip:35——守卫真树用例的靶心）',
    file: 'ere/page/page-train.js',
    find: "      suffix: era.get(`tequip:${target}:35`) ? '避孕套使用中' : '',",
    replace: "      suffix: era.get('tequip:35') ? '避孕套使用中' : '',",
    tests: ['chara-table-addressing'],
    must_mention: '角色表二段寻址',
  },
  {
    desc: 'M713 主人档的 TARGET != MASTER 判据删（自调教双条）',
    file: 'ere/page/page-train.js',
    find: `    !era.get('talent:0:135') &&
    target !== 0`,
    replace: `    !era.get('talent:0:135') &&
    true`,
    tests: ['page-train'],
    must_mention: '恰一条',
  },
];
