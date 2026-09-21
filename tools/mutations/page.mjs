// 变异条目表切片：ere/page/（画面与交互组件）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用锚点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 226; // #396 起 +12（M8104-M8115 段，page-shop-trap.js 与 page-shop.js 接线）；
// #397 起 +56（M8381-M8436，page-life-list / page-ability-up / page-intercept / page-tailor）
// #468 起 +14（M9709-M9722，post_conquest_menu() 菜单渲染与派发）；返工第一轮
// 再 +5（M9723-M9727，[1001] 存根、状态条数值列、天神宫优先级、越界守卫、
// 水晶球分子分母）
// #463 起 +9（M10200-M10208，page-config.js 全量新增）
// #469 起 +17（M10100-M10115、M10124，page-campaign.js / page-campaign-1.js：
// 招募/派遣校验链、SELECT_CAMPAIGN 的范围守卫与深度重置、战役 1 的四张映射表、
// 剧情 5 档收尾行）

export default [
  {
    desc: 'M3 999 出口：@USERCOM 不再发起 BEGIN AFTERTRAIN',
    file: 'ere/page/page-usercom.js',
    find: `  if (result === 999) {
    // :173-175 调教结束 → BEGIN AFTERTRAIN（事件链暂存，回合循环提交）
    begin(STATE.AFTERTRAIN);
    return;
  }`,
    replace: `  if (result === 999) {
    // 变异：不发起转场
    return;
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
    // #395 起 show_list_assistable 复制了同一条件表达式，find 收窄到
    // trainable.forEach 起始的整段（含两行注释）以恰中一处
    find: '  trainable.forEach((cid, index) => {\n    // 显示窗口 [no_page*num_page+1, (no_page+1)*num_page+1)（1 起序号，\n    // 按可训练序号开窗——原作缺陷的修正移植，见文件头）\n    if (index >= no_page * num_page && index < (no_page + 1) * num_page) {',
    replace:
      '  trainable.forEach((cid, index) => {\n    // 显示窗口 [no_page*num_page+1, (no_page+1)*num_page+1)（1 起序号，\n    // 按可训练序号开窗——原作缺陷的修正移植，见文件头）\n    if (index > no_page * num_page && index < (no_page + 1) * num_page) {',
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
    desc: 'M56 指令按钮渲染删掉（#214 起靶 = 内建臂：GETBIT=0 的静态名按钮——e2e 与单测都走它）',
    file: 'ere/page/page-usercom.js',
    find: "    era.printButton(era.get(`traincommandname:${id}`) ?? '', com_index(id));",
    replace: '    // 变异：按钮渲染删除',
    tests: ['source-check', 'page-usercom'],
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
    // #395 起 show_shop 变 async，redraw 调用点从 `return` 改成
    // `const row_count = await`（BOUGHT 跳转判据要用到返回的行数），
    // find 收窄到方法名本身
    find: 'main_menu.redraw()',
    replace: 'main_menu.draw()',
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
    desc: 'M2101 出兵公式：气力 /25 改 /30（INVASION.ERB:267）',
    file: 'ere/page/page-invasion.js',
    find: '  sinkou = Math.floor(chara(0).dungeon.气力 / 25);',
    replace:
      '  sinkou = Math.floor(chara(0).dungeon.气力 / 30); // 变异：公式改坏',
    tests: ['page-invasion', 'event-ending-e2e'],
    must_mention: 'FLAG:81 += 10000/25',
  },
  {
    desc: 'M2102 气力减半删除（失败也照减的 :268 语义）',
    file: 'ere/page/page-invasion.js',
    find: '  chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);',
    replace: '  // 变异：不减半',
    tests: ['page-invasion'],
    must_mention: 'BASE:0:1 减半',
  },
  {
    desc: 'M2103 威望 +2 删除（结算尾 :978）',
    file: 'ere/page/page-invasion.js',
    find: '  era_exflag.prestige = era_exflag.prestige + 2; // :978 EX_FLAG:99 += 2',
    replace: '  // 变异：威望不增',
    tests: ['page-invasion'],
    must_mention: 'EX_FLAG:99 += 2',
  },
  {
    desc: 'M2104 略受质疑折扣公式：(100+(p-60)*2) 改 (100+(p-60))',
    file: 'ere/page/page-invasion.js',
    find: '      sinkou: Math.floor((sinkou * (100 + (prestige - 60) * 2)) / 100),',
    replace:
      '      sinkou: Math.floor((sinkou * (100 + (prestige - 60))) / 100), // 变异',
    tests: ['page-invasion'],
    must_mention: '略受质疑）的侵攻度增量',
  },
  {
    desc: 'M2105 相安无事档偷偷打折（61-80 无修正的 :285-286）',
    file: 'ere/page/page-invasion.js',
    find: "    era.print('威望值是【相安无事】');\n    return { sinkou, failed: false };",
    replace:
      "    era.print('威望值是【相安无事】');\n    return { sinkou: Math.floor(sinkou / 4), failed: false }; // 变异",
    tests: ['page-invasion'],
    must_mention: '相安无事）的侵攻度增量',
  },
  {
    desc: 'M2106 广受爱戴加成公式：(100+(p-80)) 改 (100+(p-80)*2)',
    file: 'ere/page/page-invasion.js',
    find: '      sinkou: Math.floor((sinkou * (100 + (prestige - 80))) / 100),',
    replace:
      '      sinkou: Math.floor((sinkou * (100 + (prestige - 80) * 2)) / 100), // 变异',
    tests: ['page-invasion'],
    must_mention: '广受爱戴）的侵攻度增量',
  },
  {
    desc: 'M2107 侵攻度封顶阈值挪走（>=10000 改 >=99999，:617-618）',
    file: 'ere/page/page-invasion.js',
    find: '  if (era_flag.human_realm_invasion >= 10000) {',
    replace:
      '  if (era_flag.human_realm_invasion >= 99999) { // 变异：封顶失效',
    tests: ['page-invasion'],
    must_mention: '侵攻度封顶',
  },
  {
    desc: 'M2108 KYOTEN_EVENT 首档阈值 2000 改 3000（FLAG:93 状态机）',
    file: 'ere/page/page-invasion.js',
    find: '  if (progress >= 2000 && stage === 0) {',
    replace: '  if (progress >= 3000 && stage === 0) { // 变异：阈值挪走',
    tests: ['page-invasion'],
    must_mention: '占领了村庄',
  },
  {
    desc: 'M2109 首次侵略传闻守卫删掉（FLAG:AREA == 0 恒假，INVASION_EVENT.ERB:257）',
    file: 'ere/page/page-invasion.js',
    find: '  if ((era.get(`flag:${area}`) || 0) === 0) {',
    replace: '  if ((era.get(`flag:${area}`) || 0) === -1) { // 变异：恒假',
    tests: ['page-invasion'],
    must_mention: '精锐部队',
  },
  {
    desc: 'M2110 [999] 取消误报成功（返回 1 消耗回合，:190-191）',
    file: 'ere/page/page-invasion.js',
    find: '    if (result === 999) {\n      return 0; // :190-191\n    }',
    replace:
      '    if (result === 999) {\n      return 1; // 变异：取消误报成功\n    }',
    tests: ['page-invasion'],
    must_mention: '零副作用',
  },
  {
    desc: 'M2111 魔王侵略经验丢失（EXP:0:80 += SINKOU/2 的写入删除）',
    file: 'ere/page/page-invasion.js',
    find: '  chara(0).dungeon.战斗经验 += exp_gain; // EXP:0:80（魔王的侵略经验）',
    replace: '  // 变异：经验写入删除',
    tests: ['page-invasion'],
    must_mention: 'EXP:0:80 += SINKOU/2',
  },
  {
    desc: 'M2112 [109] 出兵成功不转场（BEGIN TURNEND 删除，SHOP ver1.0.2.ERB:127）',
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
    desc: 'M2115 人间界结局判据删掉防重复半边（FLAG:82 == 0）',
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
    desc: 'M2116 人间界结局门槛 10000 改 9999（INVASION.ERB:1001）',
    file: 'ere/page/page-invasion.js',
    find: `    era_flag.human_realm_invasion >= 10000 &&
    era_flag.human_realm_fallen === 0`,
    replace: `    era_flag.human_realm_invasion >= 9999 && // 变异：门槛改坏
    era_flag.human_realm_fallen === 0`,
    tests: ['event-ending'],
    must_mention: '预置输入已耗尽',
  },
  {
    desc: 'M2117 精灵领域判据门槛改成恒真（FLAG:86，INVASION.ERB:1005）',
    file: 'ere/page/page-invasion.js',
    find: `    era_flag.elf_realm_invasion >= 10000 &&
    era_flag.elf_realm_conquered === 0`,
    replace: `    era_flag.elf_realm_invasion >= 0 && // 变异：门槛恒真
    era_flag.elf_realm_conquered === 0`,
    tests: ['event-ending'],
    // '空转零输出' 是断言消息，但门槛松开后 ending_3 会在断言执行前就
    // 因 char_gift 等待未预置的输入而炸穿，断言永远走不到——旧
    // must_mention 因此从未真正命中。真正专门测「五组门槛全未达标 → 零
    // 输出」这条判据（含精灵领域默认值 0）的用例是同名测试；改用它自己
    // 的名字做锚点，跑该测试即会因这条判据被松开而红（#440 实测）。
    test_name: '五组全不满足',
    must_mention: '五组全不满足',
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
  {
    desc: 'M810 clothtype_text 的特别服装复合句删（穿戴着…的模样不拼）',
    file: 'ere/page/page-clothtype.js',
    find: '    out += `穿戴着${clothtype_special_text(cid)}的模样`;',
    replace: '    // 变异：特别服装句删',
    tests: ['cloth-func'],
    must_mention: '基本 + 特别复合句（:49-56）',
  },
  {
    desc: 'M811 乳房外露判据删（breasts_exposed 恒假 → 一律上半身裸露）',
    file: 'ere/page/page-clothtype.js',
    find: `  return (
    talent(cid, 122) === 0 &&
    talent(cid, 116) === 0 &&
    (talent(cid, 109) === 0 || talent(cid, 132) === 0)
  );`,
    replace: '  return false; // 变异',
    tests: ['cloth-func'],
    must_mention: '乳房外露，穿着紧身衣＆裙甲的裙子',
  },
  {
    desc: 'M812 SHOW_STATUS 的服装表示行删（【PRINT_CLOTHTYPE】段静默）',
    file: 'ere/page/page-train.js',
    find: '  era.print(`【${clothtype_text(target)}】`);',
    replace: '  // 变异：服装表示行删',
    tests: ['page-train', 'compare-train'],
    must_mention: '服装表示行为【全裸】（着衣模式关）',
  },
  {
    desc: 'M7888 199 休息：FLAG:9 税金增量算错（+5 改 +4）',
    file: 'ere/page/page-shop.js',
    find: `    era.print('你专心于内政，稍作了休息……（税金+5%）');
    game.stronghold.税金修正 += 5;`,
    replace: `    era.print('你专心于内政，稍作了休息……（税金+5%）');
    game.stronghold.税金修正 += 4; // 变异：税金少算 1`,
    tests: ['page-shop'],
    must_mention: '199 休息：内联文本 + FLAG:9 += 5 + BEGIN TURNEND',
  },
  {
    desc: 'M7889 199 休息：BEGIN TURNEND 删（回合推不动，本票到站标记失守）',
    file: 'ere/page/page-shop.js',
    find: `    game.stronghold.税金修正 += 5;
    begin(STATE.TURNEND);`,
    replace: `    game.stronghold.税金修正 += 5;
    // 变异：BEGIN TURNEND 删`,
    tests: ['page-shop'],
    must_mention: '199 休息：内联文本 + FLAG:9 += 5 + BEGIN TURNEND',
  },
  {
    desc: 'M7890 107 购物：BOUGHT 写成 -1（跳转判据永不成立）',
    file: 'ere/page/page-shop.js',
    find: `    // （show_shop 的 0-53 支，#399 起本体是真身 page/page-item-shop.js）
    era_flag.bought = 1;`,
    replace: `    // （show_shop 的 0-53 支，#399 起本体是真身 page/page-item-shop.js）
    era_flag.bought = -1; // 变异：不再触发商店跳转`,
    tests: ['page-shop'],
    must_mention: '107 购物：BOUGHT = 1，下一轮 @SHOW_SHOP 画真身道具商店',
  },
  {
    desc: 'M7891 show_shop：BOUGHT 54 边界错一格（>= 改 >，#396 重构后重钉）',
    file: 'ere/page/page-shop.js',
    find: '  if (era_flag.bought >= 54) {',
    replace: '  if (era_flag.bought > 54) { // 变异：54 边界漏判',
    tests: ['page-shop'],
    must_mention: 'BOUGHT >= 54 跳陷阱商店真身',
  },
  {
    desc: 'M7892 show_shop：BOUGHT 0-53 支整段不再画商店（#399 重构后重钉）',
    file: 'ere/page/page-shop.js',
    find: '  if (era_flag.bought >= 0 && era_flag.bought < 54) {',
    replace:
      '  if (era_flag.bought >= 54 && era_flag.bought < 54) { // 变异：支不可达',
    tests: ['page-shop'],
    must_mention: '107 购物：BOUGHT = 1，下一轮 @SHOW_SHOP 画真身道具商店',
  },
  {
    desc: 'M7893 SELECT_ASSI [1002]：ASSI 复位删（旧指针残留）',
    file: 'ere/page/page-select-target.js',
    find: `      era_flag.assi = -1;
      game.event.上次助手 = -1;
      return 0;`,
    replace: `      game.event.上次助手 = -1;
      return 0; // 变异：ASSI 未复位`,
    tests: ['page-select-target'],
    must_mention:
      'SELECT_ASSI 我自己上阵（1002）：显式置 ASSI = -1，返回 0（不是取消）',
  },
  {
    desc: 'M7894 SELECT_ASSI [1002]：FLAG:2 写错值（0 代替 -1）',
    file: 'ere/page/page-select-target.js',
    find: `      era_flag.assi = -1;
      game.event.上次助手 = -1;`,
    replace: `      era_flag.assi = -1;
      game.event.上次助手 = 0; // 变异：写错值`,
    tests: ['page-select-target'],
    must_mention:
      'SELECT_ASSI 我自己上阵（1002）：显式置 ASSI = -1，返回 0（不是取消）',
  },
  {
    desc: 'M7895 SELECT_ASSI [1002]：返回值改 2（误判为取消，与 999 混淆）',
    file: 'ere/page/page-select-target.js',
    find: `      era_flag.assi = -1;
      game.event.上次助手 = -1;
      return 0;
    }
    if (result === 999) {`,
    replace: `      era_flag.assi = -1;
      game.event.上次助手 = -1;
      return 2; // 变异：误判为取消
    }
    if (result === 999) {`,
    tests: ['page-select-target'],
    must_mention:
      'SELECT_ASSI 我自己上阵（1002）：显式置 ASSI = -1，返回 0（不是取消）',
  },
  {
    desc: 'M7896 SELECT_ASSI [999]：返回值改 0（误判为非取消，与 1002 混淆）',
    file: 'ere/page/page-select-target.js',
    find: `    if (result === 999) {
      // :396-398 我先想想… → RETURN 2（取消，与 SELECT_TARGET 的 999 不同码）
      return 2;
    }`,
    replace: `    if (result === 999) {
      // :396-398 我先想想… → RETURN 2（取消，与 SELECT_TARGET 的 999 不同码）
      return 0; // 变异：误判为非取消
    }`,
    tests: ['page-select-target'],
    must_mention:
      'SELECT_ASSI 我先想想（999）：返回 2（取消，与 SELECT_TARGET 的 999=0 不同码），不置 ASSI',
  },
  {
    desc: 'M7897 SELECT_ASSI 正常选中：ASSI 未写（选中的人选丢失）',
    file: 'ere/page/page-select-target.js',
    find: `      era_flag.assi = result;
      game.event.上次助手 = result;
      return 1;`,
    replace: `      game.event.上次助手 = result;
      return 1; // 变异：ASSI 未写`,
    tests: ['page-select-target'],
    must_mention: 'SELECT_ASSI 选中：输入角色 ID → 置 ASSI 与 FLAG:2，返回 1',
  },
  {
    desc: 'M7898 SELECT_ASSI 正常选中：FLAG:2（上次助手）未写',
    file: 'ere/page/page-select-target.js',
    find: `      era_flag.assi = result;
      game.event.上次助手 = result;
      return 1;
    }
    if (result === 1000) {`,
    replace: `      era_flag.assi = result;
      return 1; // 变异：FLAG:2 未写
    }
    if (result === 1000) {`,
    tests: ['page-select-target'],
    must_mention: 'SELECT_ASSI 选中：输入角色 ID → 置 ASSI 与 FLAG:2，返回 1',
  },
  {
    desc: 'M7899 [101] 能力显示：CHARANUM 守卫边界错一格（>= 1 改 >= 2）',
    file: 'ere/page/page-main-menu.js',
    find: '  if (era.getAddedCharacters().length >= 1) {',
    replace: '  if (era.getAddedCharacters().length >= 2) {',
    tests: ['page-main-menu'],
    must_mention:
      '[101] 能力显示：CHARANUM >= 1 时是可点按钮，空档退化为灰色 [---]',
  },
  {
    desc: 'M7900 [103] 处刑：A > 0 守卫取反',
    file: 'ere/page/page-main-menu.js',
    find: `  if (count_selectable_slaves() > 0) {
    era.printButton('处刑', 103);`,
    replace: `  if (count_selectable_slaves() <= 0) {
    era.printButton('处刑', 103);`,
    tests: ['page-main-menu'],
    must_mention:
      '[103]/[104] 处刑/迎击：A > 0 时是可点按钮，A == 0 时退化灰色',
  },
  {
    desc: 'M7901 [104] 迎击：A > 0 守卫取反',
    file: 'ere/page/page-main-menu.js',
    find: `  if (count_selectable_slaves() > 0) {
    era.printButton('迎击', 104);`,
    replace: `  if (count_selectable_slaves() <= 0) {
    era.printButton('迎击', 104);`,
    tests: ['page-main-menu'],
    must_mention:
      '[103]/[104] 处刑/迎击：A > 0 时是可点按钮，A == 0 时退化灰色',
  },
  {
    desc: 'M7902 [108] 换装：FLAG:37 == 1 守卫取反',
    file: 'ere/page/page-main-menu.js',
    find: "  if (count_selectable_slaves() > 0 && (era.get('flag:37') || 0) === 1) {",
    replace:
      "  if (count_selectable_slaves() > 0 && (era.get('flag:37') || 0) === 0) {",
    tests: ['page-main-menu'],
    must_mention:
      '[108] 换装：A > 0 且 FLAG:37 == 1 才渲染（未落表前恒不成立）',
  },
  {
    desc: 'M7903 [110] 实验室：TALENT:0:325 == 1 守卫取反',
    file: 'ere/page/page-main-menu.js',
    find: `  if ((era.get('talent:0:325') || 0) === 1) {
    era.printButton('实验室', 110);`,
    replace: `  if ((era.get('talent:0:325') || 0) === 0) {
    era.printButton('实验室', 110);`,
    tests: ['page-main-menu'],
    must_mention: '[110] 实验室：TALENT:0:325 == 1（魔王的魔界知识）才渲染',
  },
  {
    desc: 'M7904 [199] 休息按钮编号错位（199 改 198，键入 199 不再送达）',
    file: 'ere/page/page-main-menu.js',
    find: "  era.printButton('休息', 199);",
    replace: "  era.printButton('休息', 198); // 变异：编号错位",
    tests: ['page-main-menu'],
    must_mention:
      '[105]/[107]/[120]/[199]/[777]/[888]：无条件渲染，正文无手写前缀',
  },
  {
    desc: 'M7905 [777] 设定按钮编号错位',
    file: 'ere/page/page-main-menu.js',
    find: "  era.printButton('设定', 777);",
    replace: "  era.printButton('设定', 776); // 变异：编号错位",
    tests: ['page-main-menu'],
    must_mention:
      '[105]/[107]/[120]/[199]/[777]/[888]：无条件渲染，正文无手写前缀',
  },
  {
    desc: 'M7906 [888] 通信按钮编号错位',
    file: 'ere/page/page-main-menu.js',
    find: "  era.printButton('通信', 888);",
    replace: "  era.printButton('通信', 887); // 变异：编号错位",
    tests: ['page-main-menu'],
    must_mention:
      '[105]/[107]/[120]/[199]/[777]/[888]：无条件渲染，正文无手写前缀',
  },
  {
    desc: 'M7907 道具网格：5 列换行阈值错一格（>= 5 改 >= 6）',
    file: 'ere/page/page-main-menu.js',
    find: '  if (state.column >= 5) {',
    replace: '  if (state.column >= 6) {',
    tests: ['page-main-menu'],
    must_mention: 'DRAW_HAVEITEMS：5 个一行，第 6 个换行',
  },
  {
    desc: 'M7908 DRAW_HAVEITEMS 第一段起点错一格（0 改 1，item:0 漏画）',
    file: 'ere/page/page-main-menu.js',
    find: '  for (let id = 0; id <= 58; id += 1) {',
    replace: '  for (let id = 1; id <= 58; id += 1) {',
    tests: ['page-main-menu'],
    must_mention:
      'DRAW_HAVEITEMS：技巧 Lv + 知识标签 + 两段道具网格 + 装饰的戒指特例',
  },
  {
    desc: 'M7909 DRAW_HAVEITEMS 第二段起点错一格（300 改 301，item:300 漏画）',
    file: 'ere/page/page-main-menu.js',
    find: '  for (let id = 300; id <= 339; id += 1) {',
    replace: '  for (let id = 301; id <= 339; id += 1) {',
    tests: ['page-main-menu'],
    must_mention:
      'DRAW_HAVEITEMS：技巧 Lv + 知识标签 + 两段道具网格 + 装饰的戒指特例',
  },
  {
    desc: 'M8104 ITEM_SHOP_TRAP 陷阱网格上界改错（end 92 → 91，漏掉 91 号）',
    file: 'ere/page/page-shop-trap.js',
    find: 'const TRAP_IDS = { start: 60, end: 92 };',
    replace: 'const TRAP_IDS = { start: 60, end: 91 };',
    tests: ['shop-trap'],
    must_mention: '陷阱网格 60-91、戒指网格 300-320',
  },
  {
    desc: 'M8105 ITEM_SHOP_TRAP 戒指网格下界错一格（start 300 → 299）',
    file: 'ere/page/page-shop-trap.js',
    find: 'const RING_IDS = { start: 300, end: 321 };',
    replace: 'const RING_IDS = { start: 299, end: 321 };',
    tests: ['shop-trap'],
    must_mention: '陷阱网格 60-91、戒指网格 300-320',
  },
  {
    desc: 'M8106 ITEM_SHOP_TRAP 网格列数改错（5 → 4）',
    file: 'ere/page/page-shop-trap.js',
    find: 'const COLUMNS = 5;',
    replace: 'const COLUMNS = 4;',
    tests: ['shop-trap'],
    must_mention: '陷阱网格 60-91、戒指网格 300-320',
  },
  {
    desc: 'M8107 ITEM_SHOP_TRAP 格子宽度改错（16 → 15）',
    file: 'ere/page/page-shop-trap.js',
    find: 'const CELL_WIDTH = 16;',
    replace: 'const CELL_WIDTH = 15;',
    tests: ['shop-trap'],
    must_mention: '陷阱网格 60-91、戒指网格 300-320',
  },
  {
    desc: 'M8108 SALEITEM_CHECK_TRAP 基础在售段漏掉 87 号',
    file: 'ere/page/page-shop-trap.js',
    find: '  60, 61, 62, 63, 69, 72, 73, 74, 75, 76, 77, 78, 81, 82, 83, 84, 85, 87,',
    replace:
      '  60, 61, 62, 63, 69, 72, 73, 74, 75, 76, 77, 78, 81, 82, 83, 84, 85,',
    tests: ['shop-trap'],
    must_mention: '三个判据的八种组合整表驱动',
  },
  {
    desc: 'M8109 SALEITEM_CHECK_TRAP 淫魔知识位改错（54 → 53）',
    file: 'ere/page/page-shop-trap.js',
    find: 'const SALES_SUCCUBUS_KNOWLEDGE = [54]; // 淫魔知识',
    replace: 'const SALES_SUCCUBUS_KNOWLEDGE = [53]; // 变异：淫魔知识位',
    tests: ['shop-trap'],
    must_mention: '三个判据的八种组合整表驱动',
  },
  {
    desc: 'M8110 SALEITEM_CHECK_TRAP 魔虫知识分支反转（== 0 改 == 1）',
    file: 'ere/page/page-shop-trap.js',
    find: "  if ((era.get('talent:0:328') || 0) === 0) {",
    replace: "  if ((era.get('talent:0:328') || 0) === 1) {",
    tests: ['shop-trap'],
    must_mention: '三个判据的八种组合整表驱动',
  },
  {
    desc: 'M8111 SALEITEM_CHECK_TRAP 陷阱等级判据错一格（< 改 <=）',
    file: 'ere/page/page-shop-trap.js',
    find: "  if (game.stronghold.陷阱等级 < (era.get('cflag:0:9') || 0)) {",
    replace: "  if (game.stronghold.陷阱等级 <= (era.get('cflag:0:9') || 0)) {",
    tests: ['shop-trap'],
    must_mention: '陷阱等级判据是严格小于',
  },
  {
    desc: 'M8112 ITEM_SHOP_TRAP 日期行的午前午后互换',
    file: 'ere/page/page-shop-trap.js',
    find: "' 午前' : ' 午后'",
    replace: "' 午后' : ' 午前'",
    tests: ['shop-trap'],
    must_mention: '日期行两态',
  },
  {
    desc: 'M8113 USERSHOP 998：切了陷阱商店却不重画（JUMP 的目标删）',
    file: 'ere/page/page-shop.js',
    find: '    await item_shop_trap(); // :50 JUMP ITEM_SHOP_TRAP（切陷阱商店并立即重画）',
    replace: '    // 变异：切了不画',
    tests: ['shop-trap'],
    must_mention: '切陷阱商店并立即重画',
  },
  {
    desc: 'M8114 USERSHOP 999：购物态下不清 BOUGHT（退出商店失效）',
    file: 'ere/page/page-shop.js',
    find: '    era_flag.bought = -1; // :46',
    replace: '    // 变异：不退出购物态',
    tests: ['shop-trap'],
    must_mention: '清购物标志并落到调试菜单',
  },
  {
    desc: 'M8115 USERSHOP 购物态守卫失效（其它输入落到主菜单分发）',
    file: 'ere/page/page-shop.js',
    find: `  } else if (era_flag.bought >= 0) {
    return; // :55-57 的 RETURN 0`,
    replace: `  } else if (era_flag.bought >= 100000) {
    return; // 变异：购物态守卫失效`,
    tests: ['shop-trap'],
    must_mention: '购物态下的其它输入一律 RETURN 0',
  },
  {
    desc: 'M8381 LIFE_LIST 爱慕标签正文多一个空格',
    file: 'ere/page/page-life-list.js',
    find: "return { content: '<爱  慕>', color: COLOR_LOVE };",
    replace: "return { content: '<爱慕>', color: COLOR_LOVE };",
    tests: ['page-life-list'],
    must_mention: '行尾标签按判据逐维驱动',
  },
  {
    desc: 'M8382 LIFE_LIST 淫乱标签判据错位（76 → 78）',
    file: 'ere/page/page-life-list.js',
    find: "if (talent(cid, 76) !== 0) return { content: '<淫  乱>', color: COLOR_LOVE };",
    replace:
      "if (talent(cid, 78) !== 0) return { content: '<淫  乱>', color: COLOR_LOVE };",
    tests: ['page-life-list'],
    must_mention: '行尾标签按判据逐维驱动',
  },
  {
    desc: 'M8383 LIFE_LIST 妊娠判据漏掉乳内妊娠（341）',
    file: 'ere/page/page-life-list.js',
    find: '    talent(cid, 153) !== 0 ||\n    talent(cid, 341) !== 0 ||\n    talent(cid, 342) !== 0',
    replace: '    talent(cid, 153) !== 0 ||\n    talent(cid, 342) !== 0',
    tests: ['page-life-list'],
    must_mention: '行尾标签按判据逐维驱动',
  },
  {
    desc: 'M8384 LIFE_LIST_ITEM_E 肛内妊娠下标错位（343 → 344）',
    file: 'ere/page/page-life-list.js',
    find: 'if (anal && talent(cid, 343) !== 0) {',
    replace: 'if (anal && talent(cid, 344) !== 0) {',
    tests: ['page-life-list'],
    must_mention: '妊娠段多一支 343',
  },
  {
    desc: 'M8385 LIFE_LIST 收藏标记判据错位（700 → 701）',
    file: 'ere/page/page-life-list.js',
    find: 'if (cflag(cid, 700) !== 0) {',
    replace: 'if (cflag(cid, 701) !== 0) {',
    tests: ['page-life-list'],
    must_mention: '占位',
  },
  {
    desc: 'M8386 LIFE_LIST 可被卖判据放宽（> 0 → >= 0）',
    file: 'ere/page/page-life-list.js',
    find: '    cflag(cid, 0) > 0 &&\n    cid !== 0 &&',
    replace: '    cflag(cid, 0) >= 0 &&\n    cid !== 0 &&',
    tests: ['page-life-list'],
    must_mention: '行尾标签按判据逐维驱动',
  },
  {
    desc: 'M8387 LIFE_LIST 可作为助手的助手役编号错（2 → 3）',
    file: 'ere/page/page-life-list.js',
    find: '    cflag(cid, 0) === 2 &&\n    cid !== 0 &&',
    replace: '    cflag(cid, 0) === 3 &&\n    cid !== 0 &&',
    tests: ['page-life-list'],
    must_mention: '行尾标签按判据逐维驱动',
  },
  {
    desc: 'M8388 LIFE_LIST 虫寄生素质表多收一个（193 → 194）',
    file: 'ere/page/page-life-list.js',
    find: '[190, 191, 192, 193].some((idx) => talent(cid, idx) !== 0)',
    replace: '[190, 191, 192, 194].some((idx) => talent(cid, idx) !== 0)',
    tests: ['page-life-list'],
    must_mention: '行尾标签按判据逐维驱动',
  },
  {
    desc: 'M8389 LIFE_LIST 派遣状态编号错（12 → 13）',
    file: 'ere/page/page-life-list.js',
    find: '  if (cflag(cid, 1) === 12) {',
    replace: '  if (cflag(cid, 1) === 13) {',
    tests: ['page-life-list'],
    must_mention: '行尾标签按判据逐维驱动',
  },
  {
    desc: 'M8390 LIFE_LIST 名字字段宽多一格（+8 → +9）',
    file: 'ere/page/page-life-list.js',
    find: 'const name_width = max_name_len + 8;',
    replace: 'const name_width = max_name_len + 9;',
    tests: ['page-life-list'],
    must_mention: '字段宽随数据变化',
  },
  {
    desc: 'M8391 LIFE_LIST 等级字段宽多一格（位宽 +1）',
    file: 'ere/page/page-life-list.js',
    find: '    max_lv_len = Math.max(max_lv_len, String(cflag(cid, 9)).length);',
    replace:
      '    max_lv_len = Math.max(max_lv_len, String(cflag(cid, 9)).length + 1);',
    tests: ['page-life-list'],
    must_mention: '字段宽随数据变化',
  },
  {
    desc: 'M8392 LIFE_LIST 空位补行少补一行',
    file: 'ere/page/page-life-list.js',
    find: '  pad_blank_rows(window_ids.length, num_page);',
    replace: '  pad_blank_rows(window_ids.length, num_page - 1);',
    tests: ['page-life-list'],
    must_mention: '空位应补一行空行',
  },
  {
    desc: 'M8393 LIFE_LIST_ITEM 名字字段宽（12 → 13）',
    file: 'ere/page/page-life-list.js',
    find: '    [{ content: base_field_text(arg, 12, 4) }, ...tail_fragments(arg)],',
    replace:
      '    [{ content: base_field_text(arg, 13, 4) }, ...tail_fragments(arg)],',
    tests: ['page-life-list'],
    must_mention: '名字补到 12',
  },
  {
    desc: 'M8394 LIFE_LIST_ITEM_E 名字字段宽（12 → 11）',
    file: 'ere/page/page-life-list.js',
    find: '          `${base_field_text(arg, 12, 4)}` +',
    replace: '          `${base_field_text(arg, 11, 4)}` +',
    tests: ['page-life-list'],
    must_mention: '调教回数 / 种族性格 / 性别三列',
  },
  {
    desc: 'M8395 LIFE_LIST_ITEM_E 调教回数字段宽（3 → 2）',
    file: 'ere/page/page-life-list.js',
    find: '`  调教回数:${pad_display_left(String(cflag(arg, 10)), 3)}` +',
    replace: '`  调教回数:${pad_display_left(String(cflag(arg, 10)), 2)}` +',
    tests: ['page-life-list'],
    must_mention: '调教回数 / 种族性格 / 性别三列',
  },
  {
    desc: 'M8396 LIFE_LIST_ITEM_E 种族性格字段宽（20 → 19）',
    file: 'ere/page/page-life-list.js',
    find: '` ${pad_display_left(look, 20)}`,',
    replace: '` ${pad_display_left(look, 19)}`,',
    tests: ['page-life-list'],
    must_mention: '调教回数 / 种族性格 / 性别三列',
  },
  {
    desc: 'M8397 LIFE_LIST_ITEM_E 性别主判据错位（122 → 121）',
    file: 'ere/page/page-life-list.js',
    find: "  const gender = talent(arg, 122)\n    ? { content: '  <男>' }\n    : talent(arg, 121)",
    replace:
      "  const gender = talent(arg, 121)\n    ? { content: '  <男>' }\n    : talent(arg, 122)",
    tests: ['page-life-list'],
    must_mention: '性别三态表驱动',
  },
  {
    desc: 'M8398 LIFE_LIST_SALAVE 放行状态漏掉苗床（7）',
    file: 'ere/page/page-life-list.js',
    find: '    [0, 3, 5, 6, 7, 10].includes(cflag(cid, 1)) && // :188 六种状态',
    replace: '    [0, 3, 5, 6, 10].includes(cflag(cid, 1)) && // :188 六种状态',
    tests: ['page-life-list'],
    must_mention: '六种状态整表驱动',
  },
  {
    desc: 'M8399 MAX_PAGE_ENEMY 敌人数判据错位（2 → 1）',
    file: 'ere/page/page-life-list.js',
    find: '    cflag(cid, 1) === 2 && // :152 侵攻中',
    replace: '    cflag(cid, 1) === 1 && // 变异：判据错位',
    tests: ['page-life-list'],
    must_mention: '页数算式在整除与余数两侧',
  },
  {
    desc: 'M8400 MAX_PAGE_ENEMY 整除分支多算一页',
    file: 'ere/page/page-life-list.js',
    find: '  if (local % num_page > 0) {\n    return Math.trunc(local / num_page) + 1;\n  }\n  return Math.trunc(local / num_page);\n}\n\n/**\n * @LIFE_LIST_SALAVE',
    replace:
      '  if (local % num_page > 0) {\n    return Math.trunc(local / num_page) + 2;\n  }\n  return Math.trunc(local / num_page);\n}\n\n/**\n * @LIFE_LIST_SALAVE',
    tests: ['page-life-list'],
    must_mention: '页数算式在整除与余数两侧',
  },
  {
    desc: 'M8401 SELECT_YES_NO 放行多一个输入（0/1 → 0/1/2）',
    file: 'ere/page/page-life-list.js',
    find: '    if (result === 0 || result === 1) return result;',
    replace:
      '    if (result === 0 || result === 1 || result === 2) return result;',
    tests: ['page-life-list'],
    must_mention: '只接受 0/1',
  },
  {
    desc: 'M8402 ABILITY_UP 勇者一览每页行数（24 → 25）',
    file: 'ere/page/page-ability-up.js',
    find: 'const ENEMY_NUM_PAGE = 24;',
    replace: 'const ENEMY_NUM_PAGE = 25;',
    tests: ['page-ability-up'],
    must_mention: '菜单档维度整表驱动',
  },
  {
    desc: 'M8403 PAGE-TAILOR 强化强度的超限边界（> 10 → > 11）',
    file: 'ere/page/page-tailor.js',
    find: 'if (strength > ENHANCE_MAX) {',
    replace: 'if (strength > ENHANCE_MAX + 1) {',
    tests: ['page-tailor'],
    must_mention: '超限回退',
  },
  {
    desc: 'M8416 PAGE-TAILOR 装备入库时漏掉跨域消费（exflag:4444）',
    file: 'ere/page/page-tailor.js',
    find: "  era.set('exflag:4444', (era.get('exflag:4444') || 0) - amount * ENHANCE_UNIT);\n  const w = { 备注: item_no }; // W:8 = Y:1",
    replace: '  const w = { 备注: item_no }; // W:8 = Y:1',
    tests: ['page-tailor'],
    must_mention: '跨域消费同步扣',
  },
  {
    desc: 'M8420 PAGE-TAILOR 戒指强化漏掉跨域消费（:957）',
    file: 'ere/page/page-tailor.js',
    find: "      era.set(\n        'exflag:4444',\n        (era.get('exflag:4444') || 0) - pay * ENHANCE_UNIT,\n      );\n      era.set(`cflag:${cid}:${slot}`, value); // :1112",
    replace: '      era.set(`cflag:${cid}:${slot}`, value); // :1112',
    tests: ['page-tailor'],
    must_mention: '跨域消费',
  },
  {
    desc: 'M8421 PAGE-TAILOR 武器强化漏掉跨域消费（:1049）',
    file: 'ere/page/page-tailor.js',
    find: "      era.set(\n        'exflag:4444',\n        (era.get('exflag:4444') || 0) - pay * ENHANCE_UNIT,\n      );\n      era.set(`cflag:${cid}:${SLOT_WEAPON}`, value); // :1249",
    replace: '      era.set(`cflag:${cid}:${SLOT_WEAPON}`, value); // :1249',
    tests: ['page-tailor'],
    must_mention: '跨域消费',
  },
  {
    desc: 'M8426 PAGE-TAILOR 旧内衣变卖漏掉跨域进账（:1132）',
    file: 'ere/page/page-tailor.js',
    find: "      era.set('exflag:4444', (era.get('exflag:4444') || 0) + price); // :193",
    replace: '      // 变异：漏掉变卖的跨域进账',
    tests: ['page-tailor'],
    must_mention: '同步进账',
  },
  {
    desc: 'M8429 PAGE-TAILOR 买入漏掉跨域扣款（:1185）',
    file: 'ere/page/page-tailor.js',
    find: "  era.set('exflag:4444', (era.get('exflag:4444') || 0) - c); // :251",
    replace: '  // 变异：漏掉买入的跨域扣款',
    tests: ['page-tailor'],
    must_mention: '跨域消费同步扣',
  },
  {
    desc: 'M8431 PAGE-TAILOR 旧内衣变卖的判据收紧（>= 0 → > 0）',
    file: 'ere/page/page-tailor.js',
    find: '    if (cflag(cid, 43) >= 0 && cflag(cid, 48) >= 6) {',
    replace: '    if (cflag(cid, 43) > 0 && cflag(cid, 48) >= 6) {',
    tests: ['page-tailor'],
    must_mention: '正常内裤',
  },
  {
    desc: 'M8435 PAGE-TAILOR 持有品过滤放宽（item > 0 → >= 0）',
    file: 'ere/page/page-tailor.js',
    find: '      if ((era.get(`item:${item_no}`) || 0) > 0) {',
    replace: '      if ((era.get(`item:${item_no}`) || 0) >= 0) {',
    tests: ['page-tailor'],
    must_mention: '不列该行',
  },
  {
    desc: 'M8436 ABILITY_UP 补行判据收紧（< NUM_PAGE + 1 → < NUM_PAGE）',
    file: 'ere/page/page-ability-up.js',
    find: '  if (l_lcount < page_size + 1) {',
    replace: '  if (l_lcount < page_size) {',
    tests: ['page-ability-up'],
    must_mention: '补行到页高',
  },
  {
    desc: 'M8404 ABILITY_UP 菜单档常量互换（998/997）',
    file: 'ere/page/page-ability-up.js',
    find: 'const MENU_SLAVE = 998;',
    replace: 'const MENU_SLAVE = 999;',
    tests: ['page-ability-up'],
    must_mention: '菜单档维度整表驱动',
  },
  {
    desc: 'M8405 ABILITY_UP 勇者一览的等级门（20 → 21）',
    file: 'ere/page/page-ability-up.js',
    find: '  const dim = cflag(0, 9) < 20; // :50 SIF CFLAG:0:9 < 20',
    replace: '  const dim = cflag(0, 9) < 21; // 变异：等级门抬高',
    tests: ['page-ability-up'],
    must_mention: '表头按钮文案与等级门灰显',
  },
  {
    desc: 'M8406 ABILITY_UP 等级门判据（< 20 → < 21）',
    file: 'ere/page/page-ability-up.js',
    find: '        if (result > 990 && result < 999 && cflag(0, 9) < 20) {',
    replace: '        if (result > 990 && result < 999 && cflag(0, 9) < 21) {',
    tests: ['page-ability-up'],
    must_mention: '等级门整表驱动',
  },
  {
    desc: 'M8407 ABILITY_UP 返回键编号（999 → 998）',
    file: 'ere/page/page-ability-up.js',
    find: '        if (result === 999) {\n          return 0; // :100-101\n        }',
    replace:
      '        if (result === 998) {\n          return 0; // 变异：返回键编号错\n        }',
    tests: ['page-ability-up'],
    must_mention: '菜单档维度整表驱动',
  },
  {
    desc: 'M8408 ABILITY_UP 魔王行的名字字段宽（12 → 13）',
    file: 'ere/page/page-ability-up.js',
    find: "            `${pad_display_left(chara_callname(0), 12)}${' '.repeat(8)} ` +",
    replace:
      "            `${pad_display_left(chara_callname(0), 13)}${' '.repeat(8)} ` +",
    tests: ['page-ability-up'],
    must_mention: '魔王行的名字与等级按定宽渲染',
  },
  {
    desc: 'M8409 ABILITY_UP_CORE 结束键编号（999 → 997）',
    file: 'ere/page/page-ability-up.js',
    find: '    if (result === 999) {\n      // :246-251 结束',
    replace: '    if (result === 997) {\n      // 变异：结束键编号错',
    tests: ['page-ability-up'],
    must_mention: '999 收尾三件',
  },
  {
    desc: 'M8410 ABILITY_UP_CORE 不还原 TARGET',
    file: 'ere/page/page-ability-up.js',
    find: '      era_flag.target = previous_target; // :250 TARGET = T',
    replace: '      // 变异：不还原 TARGET',
    tests: ['page-ability-up'],
    must_mention: '999 收尾三件',
  },
  {
    desc: 'M8411 ABILITY_UP_CORE 跳过出售资格复核',
    file: 'ere/page/page-ability-up.js',
    find: '      await check_sellassiable(era_flag.target); // :248',
    replace: '      // 变异：跳过出售资格复核',
    tests: ['page-ability-up'],
    must_mention: '999 收尾三件',
  },
  {
    desc: 'M8412 ABILITY_UP 上一页判据反向（> 0 → >= 0）',
    file: 'ere/page/page-ability-up.js',
    find: '          if (no_page > 0) {\n            no_page -= 1;\n          }',
    replace:
      '          if (no_page >= 0) {\n            no_page -= 1;\n          }',
    tests: ['page-ability-up'],
    must_mention: '翻页（1000/1001）',
  },
  {
    desc: 'M8413 ABILITY_UP 下一页判据放宽（< max_page → <= max_page）',
    file: 'ere/page/page-ability-up.js',
    find: '          if (no_page < max_page) {\n            no_page += 1;\n          }',
    replace:
      '          if (no_page <= max_page) {\n            no_page += 1;\n          }',
    tests: ['page-ability-up'],
    must_mention: '翻页（1000/1001）',
  },
  {
    desc: 'M8414 INTERCEPT 派遣费用错一位（6000 → 6001）',
    file: 'ere/page/page-intercept.js',
    find: 'const DISPATCH_COST = 6000;',
    replace: 'const DISPATCH_COST = 6001;',
    tests: ['page-intercept'],
    must_mention: '列表只出可派遣者',
  },
  {
    desc: 'M8415 INTERCEPT 每页行数（26 → 27）',
    file: 'ere/page/page-intercept.js',
    find: 'const NUM_PAGE = 26;',
    replace: 'const NUM_PAGE = 27;',
    tests: ['page-intercept'],
    must_mention: '翻页按命中序号',
  },
  {
    desc: 'M8417 INTERCEPT 出发阶层上限（9 → 8）',
    file: 'ere/page/page-intercept.js',
    find: 'const FLOOR_MAX = 9;',
    replace: 'const FLOOR_MAX = 8;',
    tests: ['page-intercept'],
    must_mention: '出发阶层设定',
  },
  {
    desc: 'M8418 INTERCEPT 行动等级门首档（10 → 11）',
    file: 'ere/page/page-intercept.js',
    find: "{ work: 1, level: 10, label: '卖淫' },",
    replace: "{ work: 1, level: 11, label: '卖淫' },",
    tests: ['page-intercept'],
    must_mention: '行动设定的等级门渲染',
  },
  {
    desc: 'M8419 INTERCEPT 设施扩张费用（2000 → 2001）',
    file: 'ere/page/page-intercept.js',
    find: 'const EQUIP_COST = 2000;',
    replace: 'const EQUIP_COST = 2001;',
    tests: ['page-intercept'],
    must_mention: '道具补给',
  },
  {
    desc: 'M8422 INTERCEPT 魔王判据错位（0 → 1）',
    file: 'ere/page/page-intercept.js',
    find: "  if (cid === 0) return 'MASTER'; // :286",
    replace: "  if (cid === 1) return 'MASTER'; // 变异",
    tests: ['page-intercept'],
    must_mention: '派遣判据 reject_reason',
  },
  {
    desc: 'M8423 INTERCEPT 孕妇出征位错一位（位 10 → 位 11）',
    file: 'ere/page/page-intercept.js',
    find: "  if (talent(cid, 153) === 1 && getbit(era.get('flag:5') || 0, 10) === 0) {",
    replace:
      "  if (talent(cid, 153) === 1 && getbit(era.get('flag:5') || 0, 11) === 0) {",
    tests: ['page-intercept'],
    must_mention: '派遣判据 reject_reason',
  },
  {
    desc: 'M8424 INTERCEPT 后代出征位错一位（位 1 → 位 2）',
    file: 'ere/page/page-intercept.js',
    find: "    getbit(era.get('exflag:9000') || 0, 1) === 0",
    replace: "    getbit(era.get('exflag:9000') || 0, 2) === 0",
    tests: ['page-intercept'],
    must_mention: '派遣判据 reject_reason',
  },
  {
    desc: 'M8425 PAGE-TAILOR 日常服饰价格（100 → 101）',
    file: 'ere/page/page-tailor.js',
    find: 'const CASUAL_PRICE = 100;',
    replace: 'const CASUAL_PRICE = 101;',
    tests: ['page-tailor'],
    must_mention: 'TAILOR_CASUAL',
  },
  {
    desc: 'M8427 PAGE-TAILOR 黑市价格（30000 → 30001）',
    file: 'ere/page/page-tailor.js',
    find: 'const SPECIAL_PRICE = 30000;',
    replace: 'const SPECIAL_PRICE = 30001;',
    tests: ['page-tailor'],
    must_mention: '黑市 27 件整表驱动',
  },
  {
    desc: 'M8428 PAGE-TAILOR 内衣价格（5 → 6）',
    file: 'ere/page/page-tailor.js',
    find: 'const UNDERWARE_PRICE = 5;',
    replace: 'const UNDERWARE_PRICE = 6;',
    tests: ['page-tailor'],
    must_mention: '内衣的旧内衣变卖',
  },
  {
    desc: 'M8430 PAGE-TAILOR 强化单位价（10000 → 10001）',
    file: 'ere/page/page-tailor.js',
    find: 'const ENHANCE_UNIT = 10000;',
    replace: 'const ENHANCE_UNIT = 10001;',
    tests: ['page-tailor'],
    must_mention: '装备戒指与强化',
  },
  {
    desc: 'M8432 PAGE-TAILOR 强化开放等级（30 → 31）',
    file: 'ere/page/page-tailor.js',
    find: 'const ENHANCE_LEVEL = 30;',
    replace: 'const ENHANCE_LEVEL = 31;',
    tests: ['page-tailor'],
    must_mention: '等级门的灰显',
  },
  {
    desc: 'M8433 PAGE-TAILOR 武器前缀档数（9 → 8）',
    file: 'ere/page/page-tailor.js',
    find: 'const WEAPON_PREFIX_MAX = 9;',
    replace: 'const WEAPON_PREFIX_MAX = 8;',
    tests: ['page-tailor'],
    must_mention: '装备武器带前缀档',
  },
  {
    desc: 'M8434 PAGE-TAILOR 武器前缀位权（100000 → 10000）',
    file: 'ere/page/page-tailor.js',
    find: 'const WEAPON_PREFIX_SCALE = 100000;',
    replace: 'const WEAPON_PREFIX_SCALE = 10000;',
    tests: ['page-tailor'],
    must_mention: '装备武器带前缀档',
  },
  {
    desc: 'M9709 精灵领域状态行标签互换（FLAG:87，INVASION.ERB:31）',
    file: 'ere/page/page-invasion.js',
    find: "    era_flag.elf_realm_conquered >= 1\n      ? '黑暗精灵的领土侵攻度'\n      : '精灵族的领域侵攻度',",
    replace:
      "    era_flag.elf_realm_conquered >= 1\n      ? '精灵族的领域侵攻度' // 变异：标签互换\n      : '黑暗精灵的领土侵攻度',",
    tests: ['page-invasion'],
    must_mention: 'flag:87',
  },
  {
    desc: 'M9710 龙之山状态行标签互换（FLAG:89，INVASION.ERB:33）',
    file: 'ere/page/page-invasion.js',
    find: "    era_flag.dragon_realm_conquered >= 1\n      ? '混沌龙之山侵攻度'\n      : '龙之山脉侵攻度',",
    replace:
      "    era_flag.dragon_realm_conquered >= 1\n      ? '龙之山脉侵攻度' // 变异：标签互换\n      : '混沌龙之山侵攻度',",
    tests: ['page-invasion'],
    must_mention: 'flag:89',
  },
  {
    desc: 'M9711 天界状态行标签互换（FLAG:91，INVASION.ERB:35）',
    file: 'ere/page/page-invasion.js',
    find: "    era_flag.heaven_conquered >= 1 ? '堕天使的淫界侵攻度' : '天界侵攻度',",
    replace:
      "    era_flag.heaven_conquered >= 1 ? '天界侵攻度' : '堕天使的淫界侵攻度', // 变异：标签互换",
    tests: ['page-invasion'],
    must_mention: 'flag:91',
  },
  {
    desc: 'M9712 圣灵骑士堡垒按钮文案互换（FLAG:92 == 15，INVASION.ERB:68-72）',
    file: 'ere/page/page-invasion.js',
    find: "    era_flag.arcana_fort_stage === 15\n      ? '巡视圣灵骑士的卖春堡垒（已征服）'\n      : '攻略圣灵骑士的堡垒',",
    replace:
      "    era_flag.arcana_fort_stage === 15\n      ? '攻略圣灵骑士的堡垒'\n      : '巡视圣灵骑士的卖春堡垒（已征服）', // 变异：标签互换",
    tests: ['page-invasion'],
    must_mention: '的 [4] 按钮文案',
  },
  {
    desc: 'M9713 天神宫已征服门槛挪走（shrine_stage >= 4 改 > 4，INVASION.ERB:73-76）',
    file: 'ere/page/page-invasion.js',
    find: "  if (era_exflag.shrine_stage >= 4) {\n    era.printButton('巡视淫乱意志的神宫（已征服）', 5);\n  } else if (era_exflag.shrine_stage >= 1) {",
    replace:
      "  if (era_exflag.shrine_stage > 4) {\n    era.printButton('巡视淫乱意志的神宫（已征服）', 5);\n  } else if (era_exflag.shrine_stage >= 1) {",
    tests: ['page-invasion'],
    must_mention: '[5] 按钮文案',
  },
  {
    desc: 'M9714 天神宫开窗判据弱化（route_33 双区间 || 改 &&，INVASION.ERB:45/77）',
    file: 'ere/page/page-invasion.js',
    find: '  const route_33_open =\n    (era_exflag.route_33 >= 501 && era_exflag.route_33 < 540) ||\n    (era_exflag.route_33 >= 541 && era_exflag.route_33 < 560);',
    replace:
      '  const route_33_open =\n    (era_exflag.route_33 >= 501 && era_exflag.route_33 < 540) &&\n    (era_exflag.route_33 >= 541 && era_exflag.route_33 < 560);',
    tests: ['page-invasion'],
    must_mention: '：进度条应渲染',
  },
  {
    desc: 'M9715 [999] 取消误报成功（征服后菜单，INVASION.ERB:88-89）',
    file: 'ere/page/page-invasion.js',
    find: '    if (result === 999) {\n      return 0; // :88-89\n    }',
    replace:
      '    if (result === 999) {\n      return 1; // :88-89 变异：取消误报成功\n    }',
    tests: ['page-invasion'],
    must_mention: '[999] 返回 0',
  },
  {
    desc: 'M9716 [1000] SENGEN_VIDEO 存根登记名改坏（INVASION.ERB:90-92）',
    file: 'ere/page/page-invasion.js',
    find: "stub_line_wait('SENGEN_VIDEO', '水晶球投放/流行度', '待认领');",
    replace:
      "stub_line_wait('CRYSTAL_BALL', '水晶球投放/流行度', '待认领'); // 变异：登记名改坏",
    tests: ['page-invasion'],
    must_mention: '[1000] 转发到 SENGEN_VIDEO 存根',
  },
  {
    desc: 'M9717 [9] CAMPAIGN_MENU 调用丢失（INVASION.ERB:97-99）',
    file: 'ere/page/page-invasion.js',
    find: '    if (result === 9) {\n      await campaign_menu(); // :97-98\n      return 0; // :97-99\n    }',
    replace:
      '    if (result === 9) {\n      return 0; // :97-99 变异：CAMPAIGN_MENU 调用丢失\n    }',
    tests: ['page-invasion'],
    must_mention: '[9] 调用 campaign_menu()',
  },
  {
    desc: 'M9718 [4] ARCANA_FORT 存根登记名改坏（INVASION.ERB:125-131）',
    file: 'ere/page/page-invasion.js',
    find: "stub_line_wait('ARCANA_FORT', '圣灵骑士堡垒攻略', '待认领');",
    replace:
      "stub_line_wait('HOLY_FORTRESS', '圣灵骑士堡垒攻略', '待认领'); // 变异：登记名改坏",
    tests: ['page-invasion'],
    must_mention: '[4] 转发到 ARCANA_FORT',
  },
  {
    desc: 'M9719 [5] 拒收判据反向（route_33 <= 500 改 > 500，INVASION.ERB:100-101）',
    file: 'ere/page/page-invasion.js',
    find: '    if (result === 5 && era_exflag.route_33 <= 500) {',
    replace:
      '    if (result === 5 && era_exflag.route_33 > 500) { // 变异：拒收判据反向',
    tests: ['page-invasion'],
    must_mention: '重问耗尽预置输入而不是转发到地区续接',
  },
  {
    desc: 'M9720 shrine_stage >= 3 副作用门槛挪走（改 > 3，INVASION.ERB:136-137）',
    file: 'ere/page/page-invasion.js',
    find: '    if (result === 5 && era_exflag.shrine_stage >= 3) {\n      era_exflag.shrine_stage = era_exflag.shrine_stage + 1; // :136-137\n    }',
    replace:
      '    if (result === 5 && era_exflag.shrine_stage > 3) {\n      era_exflag.shrine_stage = era_exflag.shrine_stage + 1; // :136-137\n    }',
    tests: ['page-invasion'],
    must_mention: 'shrine_stage=3 → 4',
  },
  {
    desc: 'M9721 [0] 委派 start_campaign() 丢失（INVASION.ERB:109-111）',
    file: 'ere/page/page-invasion.js',
    find: '    if (result === 0) {\n      return await start_campaign(); // :109-111\n    }',
    replace:
      '    if (result === 0) {\n      return 0; // :109-111 变异：委派丢失\n    }',
    tests: ['page-invasion'],
    must_mention: '[0] 经 post_conquest_menu 委派 start_campaign()',
  },
  {
    desc: 'M9722 invasion() 分派条件反向（FLAG:82，INVASION.ERB:25）',
    file: 'ere/page/page-invasion.js',
    find: '  if (era_flag.human_realm_fallen !== 0) {',
    replace: '  if (era_flag.human_realm_fallen === 0) { // 变异：分派条件反向',
    tests: ['page-invasion'],
    must_mention: '征服后菜单不会打出窄路径专属的怪物数量提示',
  },
  {
    desc: 'M9723 [1001] AGENT_MENU 存根登记名改坏（INVASION.ERB:93-95，返工#1）',
    file: 'ere/page/page-invasion.js',
    find: "stub_line_wait('AGENT_MENU', '代理人相关菜单', '不排期（#103）');",
    replace:
      "stub_line_wait('DEPUTY_MENU', '代理人相关菜单', '不排期（#103）'); // 变异：登记名改坏",
    tests: ['page-invasion'],
    must_mention: '转发到 AGENT_MENU 存根',
  },
  {
    desc: 'M9724 精灵状态行读错地区标记（改读 dragon_realm_invasion，返工#2 P1）',
    file: 'ere/page/page-invasion.js',
    find: '    era_flag.elf_realm_invasion,\n    10000,\n  );',
    replace:
      '    era_flag.dragon_realm_invasion, // 变异：读错地区标记\n    10000,\n  );',
    tests: ['page-invasion'],
    must_mention: '的状态条数值列取自',
  },
  {
    desc: 'M9725 天神宫状态条优先级改成和按钮一样（返工#2 P2，INVASION.ERB:45）',
    file: 'ere/page/page-invasion.js',
    find: "  if (route_33_open) {\n    print_progress_line('天神宫侵攻度', era_exflag.shrine_invasion, 10000);\n  } else if (era_exflag.shrine_stage >= 4) {\n    print_progress_line(\n      '淫乱意志的神宫侵攻度',\n      era_exflag.shrine_invasion,\n      10000,\n    );\n  }",
    replace:
      "  if (era_exflag.shrine_stage >= 4) {\n    print_progress_line(\n      '淫乱意志的神宫侵攻度',\n      era_exflag.shrine_invasion,\n      10000,\n    );\n  } else if (route_33_open) {\n    print_progress_line('天神宫侵攻度', era_exflag.shrine_invasion, 10000); // 变异：优先级颠倒\n  }",
    tests: ['page-invasion'],
    must_mention: '进度条应渲染',
  },
  {
    desc: 'M9726 越界守卫门槛挪走（>=6||<0 改 >=600||<-100，返工#2 P3，INVASION.ERB:102-105）',
    file: 'ere/page/page-invasion.js',
    find: '    if (result >= 6 || result < 0) {\n      continue; // :102-105\n    }',
    replace:
      '    if (result >= 600 || result < -100) {\n      continue; // :102-105 变异：门槛挪走\n    }',
    tests: ['page-invasion'],
    must_mention: '白名单清空后仍应被越界守卫拒收重问',
  },
  {
    desc: 'M9727 水晶球按钮分子分母颠倒（返工#2 P4，INVASION.ERB:83）',
    file: 'ere/page/page-invasion.js',
    find: "`向城里投放水晶球[${era.get('exflag:9011') || 0}/${era.get('exflag:9010') || 0}]`,",
    replace:
      "`向城里投放水晶球[${era.get('exflag:9010') || 0}/${era.get('exflag:9011') || 0}]`, // 变异：分子分母颠倒",
    tests: ['page-invasion'],
    must_mention: '分子分母取自 exflag:9011/9010',
  },
  {
    desc: 'M10100 招募：气力不足守卫失效（<100 改 <0，#469）',
    file: 'ere/page/page-campaign.js',
    find: `  if (chara(0).dungeon.气力 < 100) {
    era.print('*气力不足！*');
    await era.waitAnyKey();
    return;
  }`,
    replace: `  if (chara(0).dungeon.气力 < 0) {
    era.print('*气力不足！*');
    await era.waitAnyKey();
    return;
  }`,
    tests: ['page-campaign'],
    must_mention: '气力不足（BASE:MASTER:1 < 100）拒绝',
  },
  {
    desc: 'M10101 招募：奴隶数上限守卫失效（>80 改 >800，#469）',
    file: 'ere/page/page-campaign.js',
    find: `  if (era.getAddedCharacters().length > 80) {`,
    replace: `  if (era.getAddedCharacters().length > 800) {`,
    tests: ['page-campaign'],
    must_mention: '已达上限',
  },
  {
    desc: 'M10102 招募：素质位计算漏加战役号偏移（+360 删掉，#469）',
    file: 'ere/page/page-campaign.js',
    find: `  const talent_slot = era_flag.hero_campaign_active + 360; // LOCAL = FLAG:400 + 360
  era.set(\`talent:\${recruited}:\${talent_slot}\`, 1);`,
    replace: `  const talent_slot = era_flag.hero_campaign_active; // 变异：漏加 360
  era.set(\`talent:\${recruited}:\${talent_slot}\`, 1);`,
    tests: ['page-campaign'],
    must_mention: 'TALENT:(400+360)=361 点亮',
  },
  {
    desc: 'M10103 派遣：临死中角色排除守卫失效（<1 改 <0，#469）',
    file: 'ere/page/page-campaign.js',
    find: `    if (chara(result).dungeon.体力 < 1) {
      continue; // :101-102 临死中的角色排除
    }`,
    replace: `    if (chara(result).dungeon.体力 < 0) {
      continue; // :101-102 变异：临死守卫失效
    }`,
    tests: ['page-campaign'],
    must_mention: '临死中（BASE:0 < 1）',
  },
  {
    desc: 'M10104 派遣：魔王之影守卫删除（#469）',
    file: 'ere/page/page-campaign.js',
    find: `    if (chara(result).stronghold.魔王之影) {
      era.print(\`由于\${chara_callname(result)}是魔王之影而无法派遣\`);
      await era.waitAnyKey();
      continue;
    }`,
    replace: `    // 变异：魔王之影守卫删除`,
    tests: ['page-campaign'],
    must_mention: '魔王之影',
  },
  {
    desc: 'M10105 派遣：已派遣守卫失效（=== 12 改 === 120，#469）',
    file: 'ere/page/page-campaign.js',
    find: `    if (chara(result).invasion.状态 === 12) {
      era.print(\`\${chara_callname(result)}已经被派遣了\`);
      await era.waitAnyKey();
      continue;
    }`,
    replace: `    if (chara(result).invasion.状态 === 120) {
      era.print(\`\${chara_callname(result)}已经被派遣了\`); // 变异：判据失效
      await era.waitAnyKey();
      continue;
    }`,
    tests: ['page-campaign'],
    must_mention: '已经被派遣了',
  },
  {
    desc: 'M10106 派遣：其他状态守卫反转（!== 0 改 === 0，把待机者误挡、其他状态放行，#469）',
    file: 'ere/page/page-campaign.js',
    find: `    if (chara(result).invasion.状态 !== 0) {
      era.print(\`\${chara_callname(result)}当前无法被派遣\`);
      await era.waitAnyKey();
      continue;
    }`,
    replace: `    if (chara(result).invasion.状态 === 0) {
      era.print(\`\${chara_callname(result)}当前无法被派遣\`); // 变异：判据反转
      await era.waitAnyKey();
      continue;
    }`,
    tests: ['page-campaign'],
    must_mention: '其他状态（CFLAG:1 == 2，侵攻中）',
  },
  {
    desc: 'M10107 派遣：目标阶层重置漏归零（0 改 1，#469）',
    file: 'ere/page/page-campaign.js',
    find: `    chara(result).dungeon.目标阶层 = 0;`,
    replace: `    chara(result).dungeon.目标阶层 = 1; // 变异：应归 0`,
    tests: ['page-campaign'],
    must_mention: ':121 目标阶层重置',
  },
  {
    desc: 'M10108 SELECT_CAMPAIGN：深度重置（FLAG:401 = 0）删除（#469）',
    file: 'ere/page/page-campaign.js',
    find: `  era_flag.campaign_story_progress = 0; // :150 FLAG:401 = 0 深度重置
  return 0;`,
    replace: `  // 变异：深度重置删除
  return 0;`,
    tests: ['page-campaign'],
    must_mention: ':150 深度重置',
  },
  {
    desc: 'M10109 SELECT_CAMPAIGN：CAMPAIGN_SET 范围守卫失效（<= 20 改 <= 2000，#469）',
    file: 'ere/page/page-campaign.js',
    find: `  if (result >= 1 && result <= 20) {`,
    replace: `  if (result >= 1 && result <= 2000) {`,
    tests: ['page-campaign'],
    must_mention: '超出 1-20 声明空间的输入不派发 CAMPAIGN_SET',
  },
  {
    desc: 'M10110 菜单头部：战役进行中的按钮分支判据反转（=== 0 改 !== 0，#469）',
    file: 'ere/page/page-campaign.js',
    find: `    if (active === 0) {
      era.printButton('行动选择', 0);
    } else {`,
    replace: `    if (active !== 0) {
      era.printButton('行动选择', 0); // 变异：分支判据反转
    } else {`,
    tests: ['page-campaign'],
    must_mention: 'FLAG:400 == 0 时只显示',
  },
  {
    desc: 'M10111 CAMPAIGN_ROOM_1：楼层门槛 off-by-one（> 3 改 >= 3，#469）',
    file: 'ere/page/page-campaign-1.js',
    find: `function campaign_room_1(floor) {
  return floor > 3 ? 502 : 0;
}`,
    replace: `function campaign_room_1(floor) {
  return floor >= 3 ? 502 : 0; // 变异：off-by-one
}`,
    tests: ['dungeon-room'],
    must_mention: 'ROOM_1',
  },
  {
    desc: 'M10112 CAMPAIGN_ROOM_EXTRA_1：位 1（种付奴隶）累加值改错（+= 2 改 += 1，#469）',
    file: 'ere/page/page-campaign-1.js',
    find: `  if (floor > 5) {
    extra += 2;
  }
  return extra;
}`,
    replace: `  if (floor > 5) {
    extra += 1; // 变异：位值改错，与位 0 混淆
  }
  return extra;
}`,
    tests: ['dungeon-room'],
    must_mention: 'ROOM_EXTRA_1',
  },
  {
    desc: 'M10113 CAMPAIGN_TRAP_1：6 层火炎放射档漏登记（删 [305, 78]，#469）',
    file: 'ere/page/page-campaign-1.js',
    find: `  [304, 82],
  [305, 78],
  [312, 72],`,
    replace: `  [304, 82],
  // 变异：[305, 78] 删除
  [312, 72],`,
    tests: ['dungeon-trap'],
    must_mention: '6 层火炎放射',
  },
  {
    desc: 'M10114 CAMPAIGN_EQUIP_SELECT_1：4 层戒指号改错（314 改 313，与 3 层混淆，#469）',
    file: 'ere/page/page-campaign-1.js',
    find: `  [4, 314], // 衰弱の指輪`,
    replace: `  [4, 313], // 变异：与 3 层混淆`,
    tests: ['equip-system'],
    must_mention: '4 层：衰弱の指輪',
  },
  {
    desc: 'M10115 CAMPAIGN_MONSTER_LIST_1：DICE 下标偏移（table[dice] 改 table[(dice + 1) % 3]，#469）',
    file: 'ere/page/page-campaign-1.js',
    find: `  const dice = rand(3);
  const ids = MONSTER_IDS_BY_FLOOR.get(floor);
  return ids ? ids[dice] : 0;`,
    replace: `  const dice = rand(3);
  const ids = MONSTER_IDS_BY_FLOOR.get(floor);
  return ids ? ids[(dice + 1) % 3] : 0; // 变异：下标偏移`,
    tests: ['dungeon-battle'],
    must_mention: '1 层 DICE 0',
  },
  {
    desc: 'M10124 CAMPAIGN_STORY_1：5 档漏收尾行（删「报告结束」行，#469 需求审查）',
    file: 'ere/page/page-campaign-1.js',
    find: `    '最后一战一触即发',
    '――水晶球映出的报告到这就结束了',
  ],
];`,
    replace: `    '最后一战一触即发',
  ],
];`,
    tests: ['dungeon-main'],
    must_mention: '5 档的行数',
  },
  {
    desc: 'M10200 PAGE-CONFIG 处女献上后续发生方式写入错位（RESULT-1 → RESULT）',
    file: 'ere/page/page-config.js',
    find: 'era_flag.virgin_conceded_mode = result - 1;',
    replace: 'era_flag.virgin_conceded_mode = result;',
    tests: ['page-config'],
    must_mention: 'virgin_conceded_mode = RESULT-1',
  },
  {
    desc: 'M10201 PAGE-CONFIG 阴茎形态回显文案错位（巨根 → 短小）',
    file: 'ere/page/page-config.js',
    find: "'《巨根》',",
    replace: "'《短小》',",
    tests: ['page-config'],
    must_mention: '并回显名称',
  },
  {
    desc: 'M10202 PAGE-CONFIG 阴茎的状态写入值偏移（result → result+1）',
    file: 'ere/page/page-config.js',
    find: 'chara(0).chara.阴茎的状态 = result;',
    replace: 'chara(0).chara.阴茎的状态 = result + 1;',
    tests: ['page-config'],
    must_mention: '并回显名称',
  },
  {
    desc: 'M10203 PAGE-CONFIG 自动提升角色能力三态循环清位不全（漏清位 36）',
    file: 'ere/page/page-config.js',
    find: 'v = v - 2 ** 35 - 2 ** 36;',
    replace: 'v = v - 2 ** 35;',
    tests: ['page-config'],
    must_mention: '三态循环',
  },
  {
    desc: 'M10204 PAGE-CONFIG 勇者相关杂项开关位号错位（local-22 → local-23）',
    file: 'ere/page/page-config.js',
    find: 'local - 22,',
    replace: 'local - 23,',
    tests: ['page-config'],
    must_mention: 'FLAG:8 位 0-3 独立切换',
  },
  {
    desc: 'M10205 PAGE-CONFIG 翻页丢失循环（漏 % 2，页码会越过 1）',
    file: 'ere/page/page-config.js',
    find: 'return (page + 1) % 2;',
    replace: 'return page + 1;',
    tests: ['page-config'],
    must_mention: '翻页在 0/1 间循环',
  },
  {
    desc: 'M10206 PAGE-CONFIG 过滤状态摘要标签错位（爱抚 → 爱抚2）',
    file: 'ere/page/page-config.js',
    find: "const SHORT_LABELS = ['爱抚', '器具', '私处类', '肛门类', 'SM系'];",
    replace:
      "const SHORT_LABELS = ['爱抚2', '器具', '私处类', '肛门类', 'SM系'];",
    tests: ['page-config'],
    must_mention: '按位〇/× 摘要',
  },
  {
    desc: 'M10207 PAGE-CONFIG INVERTBIT 两支写反（置位与清位互换）',
    file: 'ere/page/page-config.js',
    find: 'return getbit(v, n) ? v - 2 ** n : v + 2 ** n;',
    replace: 'return getbit(v, n) ? v + 2 ** n : v - 2 ** n;',
    tests: ['page-config'],
    must_mention: 'INVERTBIT FLAG:5 逐位切换',
  },
  {
    desc: 'M10208 PAGE-CONFIG 勇者投降后的凌辱初始状态文案写反（许可/禁止互换）',
    file: 'ere/page/page-config.js',
    find: "getbit(v5, 0) ? '许可' : '禁止'",
    replace: "getbit(v5, 0) ? '禁止' : '许可'",
    tests: ['page-config'],
    must_mention: '首屏渲染 page 0',
  },
];
