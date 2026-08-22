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
    tests: ['page-invasion'],
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
];
