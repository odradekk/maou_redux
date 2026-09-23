// 变异条目表切片：ere/page/（画面与交互组件）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用锚点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 386; // #542 起 +6（M11313/M11314 page-config 的 [26]/[28] 提示、
// M11320/M11321 page-shop 的 999 提示与存根名单、M11328 page-chara-info 的 [20]
// 快捷键、M11329 page-config 的提示检索键——由 test/page-config.test.js、
// test/page-shop.test.js 与 test/page-chara-info.test.js 守护）；此前 380，其中 #396 起 +12（M8104-M8115 段，page-shop-trap.js 与 page-shop.js 接入）
// #397 起 +56（M8381-M8436，page-life-list / page-ability-up / page-intercept / page-tailor）
// #468 起 +14（M9709-M9722，post_conquest_menu() 菜单渲染与派发）；返工第一轮
// 再 +5（M9723-M9727，[1001] 存根、状态条数值列、天神宫优先级、越界守卫、
// 水晶球分子分母）
// #463 起 +9（M10200-M10208，page-config.js 全量新增）
// #469 起 +17（M10100-M10115、M10124，page-campaign.js / page-campaign-1.js：
// 招募/派遣校验链、SELECT_CAMPAIGN 的范围守卫与深度重置、战役 1 的四张映射表、
// 剧情 5 档收尾行）
// #494 起 +1（M10125，page-campaign.js：招募分支把 char_make_inport 注入
// rand_chara_make，源 CHAR_MAKE.ERB:57 在开局与战役两条路径上都会跑）
// #502 起 +18（M10726-M10743，page-invasion.js：MEDAL_BONUS
// 十一档与提示、SENGEN_VIDEO 的定宽/守卫/入账/成败判据与 [2][3][4] 三档的
// 金额与封顶、SENGEN_VIDEO_BONUS 的两档随机序列与系数；M10742/M10743 是
// 「十处自查」发现的上界缺口补钉）
// #503 起 +38（M10752-M10789，page-invasion.js 的出兵路线 [0] 怪物出兵与
// [3] 勇者掠夺：战力累加与系数、怪物减半、威望失败早退、两条结果段的金额/
// 封顶/经验/善恶值、掠夺的五条派遣判据、翻页游标与页窗、@INVASION_EVENT
// 的 RAND:10 真分发与两臂守卫；无法用变异守住的引擎死路径（越界/选中不合法
// 分支、列表未渲染值）在测试与源码注释里逐条登记，不入本表——不可达分支
// 没有能失败的红）
// #504 起 +60（M10790-M10849，page-invasion.js 的 [2] 勇者出兵、@INVASION_EVENT
// 的 SEIEI 战斗体 / @_INV_DEATH_CHECK / FORT / CHALLENGE 两臂：回合数与超时线、
// 两处档位除数的不对称、会心与倍率、四条退场判据的阈值与退场状态、[2] 的
// 三分之一消耗与结果段金额/经验/善恶值/抓捕、FORT 的三路线各档判据与减员
// 比例、CHALLENGE 的位域守卫/开挂档/人数上限/三选项分支）
// #505 起 +25（M10850-M10874，page-invasion.js 的地区续接与地区泛化：
// CAMPAIGN_REGIONS 的 AREA/SINDO/标签/凌辱地区号/KYOTEN 实参五组表项、
// 累加写侧与读点表选择、[0] 已征服臂漏列 101、结果段的地区名与进度条表、
// 魔力结果段的已征服封顶与判据（含判据写死字面量）、征服后菜单传参与出货
// 流程默认地区、KYOTEN_EVENT 三臂的命中判据/不推进状态字/精灵臂守卫、
// [2] 与 [0] 两处凌辱地区号）
// #521 返工起 +1（M11100，page-campaign.js：招募上限 >80 的差一边界——验收
// 抽样发现 >79 放行，两条边界用例夹住 80/81 两个方向）
// #515 起 +1（M11110，page-shop.js：STUBBED_CALLS 退回旧状态——#397 已接
// 真身的 INTERCEPT/ABILITY_UP/TAILOR_MAIN 重新列入时，名单的 deepEqual
// 固定断言必须红）
// 合并态（#505 与 #521 并集）实测 373，取 `import('./tools/mutations/page.mjs')
// .then(m => m.default.length)` 的数——两侧都不含对方的条目，故不是任一单侧的
// 数、也不在两侧声明上相加；#515 在其上实测 374；#530 起 +3（M11204-M11206，
// page-chara-info-show.js 的献祭选项与 [100] 返回）实测 377；#538 起 +3
// （M11260-M11262，post_conquest_menu() 两个守卫的边界各挪一格——越界守卫的
// 上下界与 [5] 拒收的 route_33 上界）实测 380

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
    find: '      sinkou = Math.floor(chara(0).dungeon.气力 / 25);\n      chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);\n      // :269-293 威望修正（失败档早退：PRINTW 侵攻失败 → RETURN 1）',
    replace:
      '      sinkou = Math.floor(chara(0).dungeon.气力 / 30); // 变异：公式改坏\n      chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);\n      // :269-293 威望修正（失败档早退：PRINTW 侵攻失败 → RETURN 1）',
    tests: ['page-invasion', 'event-ending-e2e'],
    must_mention: 'FLAG:81 += 10000/25',
  },
  {
    desc: 'M2102 气力减半删除（失败也照减的 :268 语义）',
    file: 'ere/page/page-invasion.js',
    find: '      sinkou = Math.floor(chara(0).dungeon.气力 / 25);\n      chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);\n      // :269-293 威望修正（失败档早退：PRINTW 侵攻失败 → RETURN 1）',
    replace:
      '      sinkou = Math.floor(chara(0).dungeon.气力 / 25);\n      // 变异：不减半\n      // :269-293 威望修正（失败档早退：PRINTW 侵攻失败 → RETURN 1）',
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
    desc: 'M2107 侵攻度封顶阈值挪走（10000 改 99999，:617-618）',
    file: 'ere/page/page-invasion.js',
    find: '  era.set(`flag:${region.area}`, Math.min(next, 10000)); // :617-618 封顶',
    replace:
      '  era.set(`flag:${region.area}`, Math.min(next, 99999)); // 变异：封顶失效',
    tests: ['page-invasion'],
    must_mention: '侵攻度封顶',
  },
  {
    desc: 'M2108 KYOTEN_EVENT 首档阈值 2000 改 3000（FLAG:93 状态机）',
    file: 'ere/page/page-invasion.js',
    find: '  if (progress >= 2000 && stage === 0) return 1;',
    replace:
      '  if (progress >= 3000 && stage === 0) return 1; // 变异：阈值挪走',
    tests: ['page-invasion'],
    must_mention: '占领了村庄',
  },
  {
    desc: 'M2109 首次侵略传闻守卫删掉（FLAG:AREA == 0 恒假，INVASION_EVENT.ERB:257）',
    file: 'ere/page/page-invasion.js',
    find: '  const progress = era.get(`flag:${area}`) || 0; // FLAG:AREA\n  // :257-260 FLAG:AREA == 0：狂王组织精锐部队的传闻（PRINTFORMW → 等键）\n  if (progress === 0) {',
    replace:
      '  const progress = era.get(`flag:${area}`) || 0; // FLAG:AREA\n  // :257-260 FLAG:AREA == 0：狂王组织精锐部队的传闻（PRINTFORMW → 等键）\n  if (progress === -1) { // 变异：恒假',
    tests: ['page-invasion'],
    must_mention: '精锐部队',
  },
  {
    desc: 'M2110 [999] 取消误报成功（返回 1 消耗回合，:190-191）',
    file: 'ere/page/page-invasion.js',
    find: '      if (result === 999) {\n        return 0; // :190-191\n      }',
    replace:
      '      if (result === 999) {\n        return 1; // 变异：取消误报成功\n      }',
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
    desc: 'M9716 [1000] SENGEN_VIDEO 调用丢失（#502 起真身，调用点改打）',
    file: 'ere/page/page-invasion.js',
    find: `      await sengen_video();
      return 0;`,
    replace: `      return 0; // 变异：SENGEN_VIDEO 调用丢失`,
    tests: ['page-invasion'],
    must_mention: '[1000] 转发到 SENGEN_VIDEO 真身（#502）',
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
    desc: 'M9718 [4] ARCANA_FORT 的分派条件改坏（result === 4 → 8，INVASION.ERB:125-131）',
    file: 'ere/page/page-invasion.js',
    find: `    if (result === 4) {
      // :125-131 CALL ARCANA_FORT`,
    replace: `    if (result === 8) { // 变异：分派条件改坏
      // :125-131 CALL ARCANA_FORT`,
    tests: ['page-invasion'],
    must_mention: '[4] 转发到 ARCANA_FORT 真身',
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
    find: '    if (result === 0) {\n      // :109-111 人间界：复用出兵流程；其内部的 RESTART（原作出兵路线里的\n      // [999] 返回等）原样透传，由 invasion() 的外层循环回到 :6 的分派\n      return await start_campaign(rand, HUMAN_WORLD);\n    }',
    replace:
      '    if (result === 0) {\n      return 0; // 变异：委派丢失\n    }',
    tests: ['page-invasion'],
    must_mention: '[0] 经 post_conquest_menu 委派 start_campaign()',
  },
  {
    desc: 'M9722 invasion() 分派条件反向（FLAG:82，INVASION.ERB:25）',
    file: 'ere/page/page-invasion.js',
    find: '      era_flag.human_realm_fallen !== 0\n        ? await post_conquest_menu(rand) // :25 IF FLAG:82：地上征服后菜单（#468）\n        : await start_campaign(rand); // :139-142 ELSE：目标区域默认人间界',
    replace:
      '      era_flag.human_realm_fallen === 0\n        ? await post_conquest_menu(rand) // 变异：分派条件反向\n        : await start_campaign(rand);',
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
    find: '`向城里投放水晶球[${era_exflag.crystal_ball_deployed}/${era_exflag.crystal_ball_stock}]`,',
    replace:
      '`向城里投放水晶球[${era_exflag.crystal_ball_stock}/${era_exflag.crystal_ball_deployed}]`, // 变异：分子分母颠倒',
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
    desc: 'M10125 招募：调用点不传 char_make_inport（退回 #494 前的形态，异国勇者判定在战役路径上恒不通过）',
    file: 'ere/page/page-campaign.js',
    find: '    () => char_make_inport(1, rand_n),',
    replace: '    undefined, // 变异：不注入异国勇者判定',
    tests: ['page-campaign'],
    must_mention: '素质位点亮在导入的异国勇者 3 号身上',
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
  // —— #502：MEDAL_BONUS 与 SENGEN_VIDEO 族（INVASION.ERB:1026-1266）——
  {
    desc: 'M10726 勋章首档阈值 5 改 4（6 枚落 100 档的边界被吃掉，#502）',
    file: 'ere/page/page-invasion.js',
    find: '  { over: 5, bonus: 101 },',
    replace: '  { over: 4, bonus: 101 }, // 变异：阈值挪一格',
    tests: ['page-invasion'],
    must_mention: 'MEDAL_BONUS 档位',
  },
  {
    desc: 'M10727 勋章最高档数值 160 改 150（501 枚的补正少一档，#502）',
    file: 'ere/page/page-invasion.js',
    find: '  { over: 500, bonus: 160 },',
    replace: '  { over: 500, bonus: 150 }, // 变异：数值改坏',
    tests: ['page-invasion'],
    must_mention: 'MEDAL_BONUS 档位',
  },
  {
    desc: 'M10728 勋章分档判据方向改坏（medals > over 改 >=，档界整体下移一档，#502）',
    file: 'ere/page/page-invasion.js',
    find: '  const tier = MEDAL_TIERS.find((t) => medals > t.over);',
    replace: '  const tier = MEDAL_TIERS.find((t) => medals >= t.over);',
    tests: ['page-invasion'],
    must_mention: 'MEDAL_BONUS 档位',
  },
  {
    desc: 'M10729 勋章补正提示不打印（PRINTFORMW 整支删除，#502）',
    file: 'ere/page/page-invasion.js',
    find: `  era.print(
    chara_nickname(cid) + '的勋章补正　x' + (tier.bonus / 100).toFixed(2),
  );`,
    replace: '  // 变异：补正提示不打印',
    tests: ['page-invasion'],
    must_mention: 'MEDAL_BONUS 提示',
  },
  {
    desc: 'M10730 {值,N} 定宽少一列（padStart(width) 改 width - 1，#502）',
    file: 'ere/page/page-invasion.js',
    find: '  return String(value).padStart(width);',
    replace: '  return String(value).padStart(width - 1); // 变异：宽度少一列',
    tests: ['page-invasion'],
    must_mention: '顶栏：库存 7-3=4、已投放 3 各补到 3 位',
  },
  {
    desc: 'M10731 无库存守卫反向（!== 999 改 === 999：无库存时反而放行未知输入、[999] 被吃掉，#502）',
    file: 'ere/page/page-invasion.js',
    find: '    if (stock === 0 && result !== 999) {',
    replace: '    if (stock === 0 && result === 999) { // 变异：守卫反向',
    tests: ['page-invasion'],
    must_mention: '预置输入已耗尽',
  },
  {
    desc: 'M10732 投放数量的入账改坏（9011 += count 改 += 1，#502）',
    file: 'ere/page/page-invasion.js',
    find: '      era_exflag.crystal_ball_deployed += count; // :1109 EX_FLAG:9011 += RESULT',
    replace: '      era_exflag.crystal_ball_deployed += 1; // 变异：只记 1 部',
    tests: ['page-invasion'],
    must_mention: ':1109 EX_FLAG:9011 += RESULT',
  },
  {
    desc: 'M10733 加成后的数漏写流行度（9012 += placed 整行删除，#502）',
    file: 'ere/page/page-invasion.js',
    find: '        era_exflag.crystal_ball_popularity += placed; // :1113',
    replace: '        // 变异：流行度不累加',
    tests: ['page-invasion'],
    must_mention: ':1113 EX_FLAG:9012 += 加成后的 RESULT',
  },
  {
    desc: 'M10734 投放成败判据放宽（placed >= 1 改 >= 0：0 部也算成功，#502）',
    file: 'ere/page/page-invasion.js',
    find: `      if (placed >= 1) {
        // :1111-1114`,
    replace: `      if (placed >= 0) {
        // :1111-1114`,
    tests: ['page-invasion'],
    must_mention: '加成为 0 走失败支',
  },
  {
    desc: 'M10735 加成模式判据反向（mode !== 0 改 === 0：#502 两档的随机序列互换）',
    file: 'ere/page/page-invasion.js',
    find: '  if (mode !== 0) {',
    replace: '  if (mode === 0) { // 变异：模式判据反向',
    tests: ['page-invasion'],
    must_mention: '随机序列耗尽或越界',
  },
  {
    desc: 'M10736 缩水系数改坏（times(placed, 0.8) 改 0.2，#502）',
    file: 'ere/page/page-invasion.js',
    find: '  if (rand(3) === 0) placed = times(placed, 0.8);',
    replace:
      '  if (rand(3) === 0) placed = times(placed, 0.2); // 变异：系数改坏',
    tests: ['page-invasion'],
    must_mention: 'MODE 0 的缩水系数：10 × 0.80 = 8',
  },
  {
    desc: 'M10737 缩水的骰点判据改坏（rand(3) === 0 改 === 1，#502）',
    file: 'ere/page/page-invasion.js',
    find: '  if (rand(3) === 0) placed = times(placed, 0.8);',
    replace:
      '  if (rand(3) === 1) placed = times(placed, 0.8); // 变异：骰点判据改坏',
    tests: ['page-invasion'],
    must_mention: ':1113 EX_FLAG:9012 += 加成后的 RESULT',
  },
  {
    desc: 'M10738 增强效果的封顶改坏（M*2 改 M*3，#502）',
    file: 'ere/page/page-invasion.js',
    find: '      if (grown > before * 2) grown = before * 2; // :1195-1196',
    replace:
      '      if (grown > before * 3) grown = before * 3; // 变异：封顶放宽',
    tests: ['page-invasion'],
    must_mention: ':1195-1196 封顶 M*2',
  },
  {
    desc: 'M10739 延长时长的保底删除（(9013 - M) < 1 → M + 1 整支删掉，#502）',
    file: 'ere/page/page-invasion.js',
    find: '      if (grown - before < 1) grown = before + 1; // :1226-1227',
    replace: '      // 变异：保底删除',
    tests: ['page-invasion'],
    must_mention: ':1226-1227 保底 +1',
  },
  {
    desc: 'M10740 奸商的犒赏扣款倍率改坏（M*5000 改 M*500，#502）',
    file: 'ere/page/page-invasion.js',
    find: '            era_flag.money -= base * 5000; // :1151 MONEY -= (M * 5000)',
    replace: '            era_flag.money -= base * 500; // 变异：少扣一个零',
    tests: ['page-invasion'],
    must_mention: ':1151 MONEY -= M*5000',
  },
  {
    desc: 'M10741 增强效果的支付金额改坏（50000 改 5000，#502）',
    file: 'ere/page/page-invasion.js',
    find: '          era_flag.money -= 50000; // :1179',
    replace: '          era_flag.money -= 5000; // 变异：支付金额改坏',
    tests: ['page-invasion'],
    must_mention: ':1179 MONEY -= 50000',
  },
  {
    desc: 'M10742 增强段第一枚骰子的上界改坏（RAND:5 改 RAND:10，#502）',
    file: 'ere/page/page-invasion.js',
    find: '      if (rand(5) === 0) grown = times(grown, 1.6); // :1191-1192',
    replace:
      '      if (rand(10) === 0) grown = times(grown, 1.6); // 变异：上界改坏',
    tests: ['page-invasion'],
    must_mention: '增强段的两枚骰子：先是 RAND:5',
  },
  {
    desc: 'M10743 延长段第一枚骰子的上界改坏（RAND:5 改 RAND:4，#502）',
    file: 'ere/page/page-invasion.js',
    find: '      if (rand(5) === 0) grown = times(grown, 1.6); // :1220-1221',
    replace:
      '      if (rand(4) === 0) grown = times(grown, 1.6); // 变异：上界改坏',
    tests: ['page-invasion'],
    must_mention: '延长段的两枚骰子与增强段同款',
  },
  // —— #502 追加：PRINTFORMW 等键的四条守卫（验收抽样发现缺号段后补，M10748-M10751）——
  {
    desc: 'M10748 MEDAL_BONUS 的补正提示后不等键（PRINTFORMW 的 WAIT 删除）',
    file: 'ere/page/page-invasion.js',
    find: `  await era.waitAnyKey(); // PRINTFORMW 的 WAIT
  return tier.bonus;`,
    replace: `  // 变异：补正提示后不等键
  return tier.bonus;`,
    tests: ['page-invasion'],
    must_mention: 'MEDAL_BONUS 提示后等键（PRINTFORMW）',
  },
  {
    desc: 'M10749 [1] 投放成功支不等键（:1112 的 PRINTFORMW 删除）',
    file: 'ere/page/page-invasion.js',
    find: `        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
        era_exflag.crystal_ball_popularity += placed; // :1113`,
    replace: `        // 变异：成功投放后不等键
        era_exflag.crystal_ball_popularity += placed; // :1113`,
    tests: ['page-invasion'],
    must_mention: ':1112 成功投放后等键（PRINTFORMW）',
  },
  {
    desc: 'M10750 [1] 投放失败支不等键（:1116 的 PRINTFORMW 删除）',
    file: 'ere/page/page-invasion.js',
    find: `        era.print('投放，似乎失败了。'); // :1116
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT`,
    replace: `        era.print('投放，似乎失败了。'); // :1116
        // 变异：投放失败后不等键`,
    tests: ['page-invasion'],
    must_mention: ':1116 投放失败后等键（PRINTFORMW）',
  },
  {
    desc: 'M10751 [2] 奸商代理成功支不等键（:1140 的 PRINTFORMW 删除）',
    file: 'ere/page/page-invasion.js',
    find: `        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
        era_exflag.crystal_ball_popularity += placed; // :1141`,
    replace: `        // 变异：奸商成功投放后不等键
        era_exflag.crystal_ball_popularity += placed; // :1141`,
    tests: ['page-invasion'],
    must_mention: ':1140 奸商成功投放后等键（PRINTFORMW）',
  },
  {
    desc: 'M10752 [0] 怪物出兵：怪物减半写成三等分（/2 改 /3）',
    file: 'ere/page/page-invasion.js',
    find: '        const halved = Math.trunc((era.get(`item:${i}`) || 0) / 2); // :229',
    replace:
      '        const halved = Math.trunc((era.get(`item:${i}`) || 0) / 3); // 变异：三等分',
    tests: ['page-invasion'],
    must_mention: 'ITEM:MON_ID /= 2',
  },
  {
    desc: 'M10753 [0] 怪物出兵：战力系数除数的分母改坏（/9 改 /8）',
    file: 'ere/page/page-invasion.js',
    find: '        sinkou += mon_atk * (Math.trunc(halved / 9) + 1); // :231',
    replace:
      '        sinkou += mon_atk * (Math.trunc(halved / 8) + 1); // 变异：分母改坏',
    tests: ['page-invasion'],
    must_mention: 'SINKOU 累加后 /20',
  },
  {
    desc: 'M10754 [0] 怪物出兵：战力系数的 +1 改 +2',
    file: 'ere/page/page-invasion.js',
    find: '        sinkou += mon_atk * (Math.trunc(halved / 9) + 1); // :231',
    replace:
      '        sinkou += mon_atk * (Math.trunc(halved / 9) + 2); // 变异：+2',
    tests: ['page-invasion'],
    must_mention: '两队累加',
  },
  {
    desc: 'M10755 [0] 怪物出兵：战力归一的分母改坏（/20 改 /10）',
    file: 'ere/page/page-invasion.js',
    find: '      sinkou = Math.trunc(sinkou / 20); // :234',
    replace: '      sinkou = Math.trunc(sinkou / 10); // 变异：分母改坏',
    tests: ['page-invasion'],
    must_mention: 'SINKOU 累加后 /20',
  },
  {
    desc: 'M10756 [0] 600 只门槛放松（600 改 500）',
    file: 'ere/page/page-invasion.js',
    find: 'const MONSTER_THRESHOLD = 600;',
    replace: 'const MONSTER_THRESHOLD = 500; // 变异：门槛放松',
    tests: ['page-invasion'],
    must_mention: '599 只仍不够 600',
  },
  {
    desc: 'M10757 [0] 特殊兵种的 E:1 加成判据反向（!= 0 改 == 0）',
    file: 'ere/page/page-invasion.js',
    find: '        if (e_get(5) !== 0) mon_atk += e_get(1); // :223-224 特殊',
    replace:
      '        if (e_get(5) === 0) mon_atk += e_get(1); // 变异：判据反向',
    tests: ['page-invasion'],
    must_mention: 'SINKOU 累加后 /20',
  },
  {
    desc: 'M10758 [0] 魔法兵种的 E:1 加成判据反向（!= 0 改 == 0）',
    file: 'ere/page/page-invasion.js',
    find: '        if (e_get(6) !== 0) mon_atk += e_get(1); // :226-227 魔法',
    replace:
      '        if (e_get(6) === 0) mon_atk += e_get(1); // 变异：判据反向',
    tests: ['page-invasion'],
    must_mention: 'SINKOU 累加后 /20',
  },
  {
    desc: 'M10759 [0] MONSTER_DATA 的队列参数改坏（line 0 改 1）',
    file: 'ere/page/page-invasion.js',
    find: '        monster_data(i, 0, 0, -1, -1, rand); // :217 CALL MONSTER_DATA, MON_ID, 0, 0',
    replace: '        monster_data(i, 1, 0, -1, -1, rand); // 变异：队列改坏',
    tests: ['page-invasion'],
    must_mention: 'SINKOU 累加后 /20',
  },
  {
    desc: 'M10760 [0] 威望失败档的返回改坏（RETURN 1 改 0）',
    file: 'ere/page/page-invasion.js',
    find: "      if (tier.failed) {\n        era.print('侵攻失败'); // :239 PRINTW\n        await era.waitAnyKey();\n        return 1; // 与魔力分支同款的早退（不结算、不消耗后续流程）\n      }",
    replace:
      "      if (tier.failed) {\n        era.print('侵攻失败'); // :239 PRINTW\n        await era.waitAnyKey();\n        return 0; // 变异：不耗回合\n      }",
    tests: ['page-invasion'],
    must_mention: '侵攻失败早退',
  },
  {
    desc: 'M10761 [0] 战力提示行文案改坏（怪物的战斗力 → 战斗力）',
    file: 'ere/page/page-invasion.js',
    find: "      era.print('怪物的战斗力　' + sinkou + '点'); // :263 PRINTFORMW",
    replace:
      "      era.print('战斗力　' + sinkou + '点'); // 变异：漏「怪物的」",
    tests: ['page-invasion'],
    must_mention: '怪物的战斗力',
  },
  {
    desc: 'M10762 [0] 结果段封顶值改坏（10000*10 改 10000*5）',
    file: 'ere/page/page-invasion.js',
    find: '    // :624-646 人间界/精灵/龙/天界（已征服）：封顶 100000 + 强制征收\n    sinkou = Math.min(sinkou, 10000 * 10);',
    replace:
      '    // :624-646 人间界/精灵/龙/天界（已征服）：封顶 100000 + 强制征收\n    sinkou = Math.min(sinkou, 10000 * 5);',
    tests: ['page-invasion'],
    must_mention: 'SINKOU 封到 100000',
  },
  {
    desc: 'M10763 [0] 结果段战利品倍率改坏（×10 改 ×5）',
    file: 'ere/page/page-invasion.js',
    find: '    era.print(`得到了${sinkou * 10}点的战利品！`); // :648 PRINTFORMW',
    replace:
      '    era.print(`得到了${sinkou * 5}点的战利品！`); // 变异：倍率改坏',
    tests: ['page-invasion'],
    must_mention: '未征服 → 战利品',
  },
  {
    desc: 'M10764 [0] 结果段资金入账漏掉（MONEY += SINKOU*10 改 += 1）',
    file: 'ere/page/page-invasion.js',
    find: '    era.print(`得到了${sinkou * 10}点的战利品！`); // :648 PRINTFORMW\n    await era.waitAnyKey();\n    era_flag.money += sinkou * 10;',
    replace:
      '    era.print(`得到了${sinkou * 10}点的战利品！`); // :648 PRINTFORMW\n    await era.waitAnyKey();\n    era_flag.money += 1;',
    tests: ['page-invasion'],
    must_mention: 'MONEY += SINKOU*10',
  },
  {
    desc: 'M10765 [0] 5% 抓捕的阈值改坏（< 5 改 < 6）',
    file: 'ere/page/page-invasion.js',
    find: '  // :686-692 5% 概率抓到负隅顽抗的勇者（GET_ENEMY 返回 0 = 人数上限早退）\n  if (rand(100) < 5) {',
    replace:
      '  // :686-692 5% 概率抓到负隅顽抗的勇者（GET_ENEMY 返回 0 = 人数上限早退）\n  if (rand(100) < 6) { // 变异：阈值改坏',
    tests: ['page-invasion'],
    must_mention: '5% 抓捕未命中',
  },
  {
    desc: 'M10766 [3] 掠夺战力来源改坏（气力 /25 改 /20）',
    file: 'ere/page/page-invasion.js',
    find: "      sinkou = Math.floor(chara(0).dungeon.气力 / 25);\n      chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);\n      era.print('魔王的力量　' + sinkou + '点'); // :551 PRINTFORMW",
    replace:
      "      sinkou = Math.floor(chara(0).dungeon.气力 / 20);\n      chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);\n      era.print('魔王的力量　' + sinkou + '点'); // :551 PRINTFORMW",
    tests: ['page-invasion'],
    must_mention: '掠夺路线 SINKOU/20',
  },
  {
    desc: 'M10767 [3] 掠夺路线不扣气力（BASE:0:1 /= 2 整行删除）',
    file: 'ere/page/page-invasion.js',
    find: "      sinkou = Math.floor(chara(0).dungeon.气力 / 25);\n      chara(0).dungeon.气力 = Math.floor(chara(0).dungeon.气力 / 2);\n      era.print('魔王的力量　' + sinkou + '点'); // :551 PRINTFORMW",
    replace:
      "      sinkou = Math.floor(chara(0).dungeon.气力 / 25);\n      // 变异：不扣气力\n      era.print('魔王的力量　' + sinkou + '点'); // :551 PRINTFORMW",
    tests: ['page-invasion'],
    must_mention: 'BASE:0:1 /= 2',
  },
  {
    desc: 'M10768 [3] 勇者补正漏掉等级（+100 改 +0）',
    file: 'ere/page/page-invasion.js',
    find: '      const hero_bonus = chara(yusya_i).chara.等级 + 100; // :553 TMP2_I',
    replace:
      '      const hero_bonus = chara(yusya_i).chara.等级; // 变异：漏 +100',
    tests: ['page-invasion'],
    must_mention: '掠夺路线 SINKOU/20',
  },
  {
    desc: 'M10769 [3] 勋章补正传错实参（勇者号改 0）',
    file: 'ere/page/page-invasion.js',
    find: '      sinkou = Math.floor((sinkou * (await medal_bonus(yusya_i))) / 100);',
    replace:
      '      sinkou = Math.floor((sinkou * (await medal_bonus())) / 100);',
    tests: ['page-invasion'],
    must_mention: 'MONEY += SINKOU',
  },
  {
    desc: 'M10770 [3] 掠夺结算的金额倍率改坏（MONEY += SINKOU 改 * 10）',
    file: 'ere/page/page-invasion.js',
    find: '  era_flag.money += sinkou; // :915/:953 MONEY += SINKOU',
    replace: '  era_flag.money += sinkou * 10; // 变异：倍率改坏',
    tests: ['page-invasion'],
    must_mention: 'MONEY += SINKOU',
  },
  {
    desc: 'M10771 [3] 掠夺经验的分母改坏（/20 改 /10）',
    file: 'ere/page/page-invasion.js',
    find: '  const exp_gain = Math.floor(sinkou / 20); // SINKOU / 20',
    replace: '  const exp_gain = Math.floor(sinkou / 10); // 变异：分母改坏',
    tests: ['page-invasion'],
    must_mention: 'SINKOU/20',
  },
  {
    desc: 'M10772 [3] 掠夺经验不入角色账（EXP:YUSYA_I:80 += 整行删除）',
    file: 'ere/page/page-invasion.js',
    find: '  chara(yusya_i).dungeon.战斗经验 += exp_gain; // :917/:955 EXP:YUSYA_I:80',
    replace: '  // 变异：经验不入账',
    tests: ['page-invasion'],
    must_mention: 'EXP:YUSYA_I:80',
  },
  {
    desc: 'M10773 [3] 善恶值减量改坏（KARMA -5 改 -1）',
    file: 'ere/page/page-invasion.js',
    find: '  karma(yusya_i, -5); // :909 CALL KARMA, YUSYA_I, -5',
    replace: '  karma(yusya_i, -1); // 变异：减量改坏',
    tests: ['page-invasion'],
    must_mention: 'KARMA, YUSYA_I, -5',
  },
  {
    desc: 'M10774 [3] 掠夺结算的封顶值改坏（10000*10 改 10000*9）',
    file: 'ere/page/page-invasion.js',
    find: '    // :912-950（已征服）：封顶 100000 + 强行征收到\n    sinkou = Math.min(sinkou, 10000 * 10);',
    replace:
      '    // :912-950（已征服）：封顶 100000 + 强行征收到\n    sinkou = Math.min(sinkou, 10000 * 9);',
    tests: ['page-invasion'],
    must_mention: '封到 100000',
  },
  {
    desc: 'M10775 [3] 派遣判据：体力门槛反向（< 1 改 < 0）',
    file: 'ere/page/page-invasion.js',
    find: '  if ((era.get(`base:${cid}:0`) || 0) < 1) return true; // :452 体力为 0',
    replace:
      '  if ((era.get(`base:${cid}:0`) || 0) < 0) return true; // 变异：门槛反向',
    tests: ['page-invasion'],
    must_mention: '预置输入已耗尽',
  },
  {
    desc: 'M10776 [3] 派遣判据：漏掉「魔王自己」（cid === 0 整行删除）',
    file: 'ere/page/page-invasion.js',
    find: '  if (cid === 0) return true; // :453 COUNT == 0（魔王自己）',
    replace: '  // 变异：漏掉魔王自己',
    tests: ['page-invasion'],
    must_mention: '预置输入已耗尽',
  },
  {
    desc: 'M10777 [3] 派遣判据：待机判据反向（!== 0 改 === 0）',
    file: 'ere/page/page-invasion.js',
    find: '  if (chara(cid).invasion.状态 !== 0) return true; // :454 CFLAG:1 != 0',
    replace:
      '  if (chara(cid).invasion.状态 === 0) return true; // 变异：判据反向',
    tests: ['page-invasion'],
    must_mention: '预置输入已耗尽',
  },
  {
    desc: 'M10778 [3] 派遣判据：未驯服的 AND 改 OR（持有魔之刻印也被筛掉）',
    file: 'ere/page/page-invasion.js',
    find: '  if (\n    (era.get(`cflag:${cid}:0`) || 0) === 0 &&\n    (era.get(`talent:${cid}:254`) || 0) === 0\n  ) {\n    return true;\n  }',
    replace:
      '  if (\n    (era.get(`cflag:${cid}:0`) || 0) === 0 ||\n    (era.get(`talent:${cid}:254`) || 0) === 0\n  ) {\n    return true;\n  }',
    tests: ['page-invasion'],
    must_mention: '1 号进列表',
  },
  {
    desc: 'M10779 [3] 派遣判据：孕妇开关的位号改坏（FLAG:5 位 10 改位 11）',
    file: 'ere/page/page-invasion.js',
    find: "  // CONFIG.ERB:167 的 [10] 开关）\n  if (\n    (era.get(`talent:${cid}:153`) || 0) === 1 &&\n    getbit(era.get('flag:5'), 10) === 0\n  ) {",
    replace:
      "  // CONFIG.ERB:167 的 [10] 开关）\n  if (\n    (era.get(`talent:${cid}:153`) || 0) === 1 &&\n    getbit(era.get('flag:5'), 11) === 0\n  ) {",
    tests: ['page-invasion'],
    must_mention: '1 号进列表',
  },
  {
    desc: 'M10780 [3] 派遣判据：孕妇开关的取值判据反向（=== 0 改 === 1）',
    file: 'ere/page/page-invasion.js',
    find: "  // CONFIG.ERB:167 的 [10] 开关）\n  if (\n    (era.get(`talent:${cid}:153`) || 0) === 1 &&\n    getbit(era.get('flag:5'), 10) === 0\n  ) {",
    replace:
      "  // CONFIG.ERB:167 的 [10] 开关）\n  if (\n    (era.get(`talent:${cid}:153`) || 0) === 1 &&\n    getbit(era.get('flag:5'), 10) === 1\n  ) {",
    tests: ['page-invasion'],
    must_mention: '预置输入已耗尽',
  },
  {
    desc: 'M10781 [3] 无候选早退的判据反向（=== 0 改 < 0）',
    file: 'ere/page/page-invasion.js',
    find: "  if (candidates === 0) {\n    era.print('没有勇者可进行侵攻。');",
    replace: "  if (candidates < 0) {\n    era.print('没有勇者可进行侵攻。');",
    tests: ['page-invasion'],
    must_mention: '预置输入已耗尽',
  },
  {
    desc: 'M10782 [3] MAX_PAGE 少减一（max_page -= 1 整行删除）',
    file: 'ere/page/page-invasion.js',
    find: '  max_page -= 1;',
    replace: '  // 变异：少减一',
    tests: ['page-invasion'],
    must_mention: 'max_page == 0',
  },
  {
    desc: 'M10783 [3] 下一页的页码守卫放宽（< max_page 改 < max_page + 1）',
    file: 'ere/page/page-invasion.js',
    find: '      if (state.no_page < max_page) {\n        state.no_page += 1;\n      }',
    replace:
      '      if (state.no_page < max_page + 1) {\n        state.no_page += 1;\n      }',
    tests: ['page-invasion'],
    must_mention: 'max_page == 0',
  },
  {
    desc: 'M10784 [3] 页窗起点少一（t_lcount 初值去掉 +1）',
    file: 'ere/page/page-invasion.js',
    find: '    let t_lcount = NUM_PAGE * state.no_page + 1; // :490',
    replace: '    let t_lcount = NUM_PAGE * state.no_page; // 变异：起点少一',
    tests: ['page-invasion'],
    must_mention: '页窗判据',
  },
  {
    desc: 'M10785 [3] 页窗上界放宽（>= 改 >）',
    file: 'ere/page/page-invasion.js',
    find: '        t_lcount >= (state.no_page + 1) * NUM_PAGE ||',
    replace: '        t_lcount > (state.no_page + 1) * NUM_PAGE ||',
    tests: ['page-invasion'],
    must_mention: '页窗判据',
  },
  {
    desc: 'M10786 [3] 列表窗口起点判据改坏（cid < list_pos 改 <=）',
    file: 'ere/page/page-invasion.js',
    find: '      if (cid < state.list_pos) continue; // :491 FOR COUNT, LIST_POS, CHARANUM',
    replace: '      if (cid <= state.list_pos) continue; // 变异：判据改坏',
    tests: ['page-invasion'],
    must_mention: '页窗判据',
  },
  {
    desc: 'M10787 [3] 列表游标不推进（LIST_POS = cid 整行删除）',
    file: 'ere/page/page-invasion.js',
    find: '      life_list_item(cid); // :502\n      t_lcount += 1; // :503\n      state.list_pos = cid; // :504',
    replace: '      life_list_item(cid); // :502\n      t_lcount += 1; // :503',
    tests: ['page-invasion'],
    must_mention: '页窗判据',
  },
  {
    desc: 'M10788 @INVASION_EVENT 分发骰的上界改坏（RAND:10 改 RAND:9）',
    file: 'ere/page/page-invasion.js',
    find: '  const local = rand(10); // :224 LOCAL = RAND:10',
    replace: '  const local = rand(9); // 变异：上界改坏',
    tests: ['page-invasion'],
    must_mention: 'RAND:10',
  },
  {
    desc: 'M10789 FORT 守卫按 C 式「&& 优先」读错（左结合改先 || 后 &&，#503 审查订正）',
    file: 'ere/page/page-invasion.js',
    find: '    ((era.get(`flag:${sindo}`) || 0) !== 0 || inv_type !== 0) &&\n    inv_type !== 2 &&\n    inv_type !== 3',
    replace:
      '    (era.get(`flag:${sindo}`) || 0) !== 0 ||\n    (inv_type !== 0 && inv_type !== 2 && inv_type !== 3)',
    tests: ['page-invasion'],
    must_mention: '左结合读法',
  },
  {
    desc: 'M10790 @INVASION_EVENT 分发：FORT 与 CHALLENGE 两臂对调',
    file: 'ere/page/page-invasion.js',
    find: '  if (local === 9) {\n    return await invasion_event_fort(area, sindo, inv_type, state, rand); // :226-227\n  }',
    replace:
      '  if (local === 8) {\n    return await invasion_event_fort(area, sindo, inv_type, state, rand); // 变异：臂对调\n  }',
    tests: ['page-invasion'],
    must_mention: '9 → FORT',
  },
  {
    desc: 'M10791 SEIEI 出敌判据的上界放宽（RAND:FLAG:AREA > 2000 改 > 2001）',
    file: 'ere/page/page-invasion.js',
    find: '    if (roll > 2000) {',
    replace: '    if (roll > 2001) {',
    tests: ['page-invasion'],
    must_mention: '不出现',
  },
  {
    desc: 'M10792 SEIEI 战斗体的侵攻度门槛改坏（>= 5000 改 >= 5001）',
    file: 'ere/page/page-invasion.js',
    find: '  if (progress >= 5000) {\n    const roll = rand(progress); // :280-281 LOCAL = RAND:FLAG:AREA',
    replace:
      '  if (progress >= 5001) {\n    const roll = rand(progress); // 变异：门槛改坏',
    tests: ['page-invasion'],
    must_mention: '整段跳过',
  },
  {
    desc: 'M10793 SEIEI 的精锐类型判据反转（防御型 18 / 攻击型 19 互换）',
    file: 'ere/page/page-invasion.js',
    find: '  if (rand(2) === 0) {\n    era.addCharacter(SEIEI_DEFENDER); // :298',
    replace:
      '  if (rand(2) !== 0) {\n    era.addCharacter(SEIEI_DEFENDER); // 变异：判据反转',
    tests: ['page-invasion'],
    must_mention: '攻击型 19',
  },
  {
    desc: 'M10794 SEIEI 回合数改坏（REPEAT 21 改 20）',
    file: 'ere/page/page-invasion.js',
    find: 'const SEIEI_ROUNDS = 21;',
    replace: 'const SEIEI_ROUNDS = 20;',
    tests: ['page-invasion'],
    must_mention: 'REPEAT 21',
  },
  {
    desc: 'M10795 SEIEI 超时判据改坏（TIME_I > 19 改 > 18）',
    file: 'ere/page/page-invasion.js',
    find: 'const SEIEI_TIMEOUT_AT = 19;',
    replace: 'const SEIEI_TIMEOUT_AT = 18;',
    tests: ['page-invasion'],
    must_mention: 'REPEAT 21',
  },
  {
    desc: 'M10796 SEIEI 先制守卫的档位除数改坏（SINKOU/2048 改 /1024）',
    file: 'ere/page/page-invasion.js',
    find: '      chara(yusya).dungeon.攻击力 * (Math.trunc(sinkou / 2048) + 1);',
    replace:
      '      chara(yusya).dungeon.攻击力 * (Math.trunc(sinkou / 1024) + 1);',
    tests: ['page-invasion'],
    must_mention: '血量/攻防套算',
  },
  {
    desc: 'M10797 SEIEI 伤害式的档位除数改坏（SINKOU/1024 改 /2048）',
    file: 'ere/page/page-invasion.js',
    find: '      chara(yusya).dungeon.攻击力 * (Math.trunc(sinkou / 1024) + 1);\n    const guard_line =',
    replace:
      '      chara(yusya).dungeon.攻击力 * (Math.trunc(sinkou / 2048) + 1);\n    const guard_line =',
    tests: ['page-invasion'],
    must_mention: '血量/攻防套算',
  },
  {
    desc: 'M10798 SEIEI 会心一击的概率改坏（RAND:5 == 0 改 == 1）',
    file: 'ere/page/page-invasion.js',
    find: '      const crit = rand(5) === 0; // :362 RAND:5',
    replace: '      const crit = rand(5) === 1; // 变异：概率档改坏',
    tests: ['page-invasion'],
    must_mention: '血量/攻防套算',
  },
  {
    desc: 'M10799 SEIEI 会心一击的倍率改坏（×4 改 ×3）',
    file: 'ere/page/page-invasion.js',
    find: '受到了${damage * (crit ? 4 : 2)}点伤害！`, // :366/:377',
    replace: '受到了${damage * (crit ? 3 : 2)}点伤害！`, // 变异：倍率改坏',
    tests: ['page-invasion'],
    must_mention: '血量/攻防套算',
  },
  {
    desc: 'M10800 SEIEI 普通一击的倍率改坏（×2 改 ×3）',
    file: 'ere/page/page-invasion.js',
    find: '      chara(seiei).dungeon.体力 -= damage * (crit ? 4 : 2); // :371/:382',
    replace:
      '      chara(seiei).dungeon.体力 -= damage * (crit ? 4 : 3); // 变异：倍率改坏',
    tests: ['page-invasion'],
    must_mention: '血量/攻防套算',
  },
  {
    desc: 'M10801 SEIEI 忍术守卫反转（TALENT:251 == 0 改 != 0，削攻防的条件反过来）',
    file: 'ere/page/page-invasion.js',
    find: '      if ((era.get(`talent:${seiei}:251`) || 0) === 0) {',
    replace: '      if ((era.get(`talent:${seiei}:251`) || 0) !== 0) {',
    tests: ['page-invasion'],
    must_mention: '忍术三档',
  },
  {
    desc: 'M10802 SEIEI 精锐反击的伤害倍率改坏（×5 改 ×4）',
    file: 'ere/page/page-invasion.js',
    find: '率领的魔王军受到了${damage * 5}点伤害！`, // :416',
    replace: '率领的魔王军受到了${damage * 4}点伤害！`, // 变异：倍率改坏',
    tests: ['page-invasion'],
    must_mention: '血量/攻防套算',
  },
  {
    desc: 'M10803 SEIEI 勇者防御的折半系数改坏（/3 改 /4）',
    file: 'ere/page/page-invasion.js',
    find: '      const guard = chara(yusya).dungeon.防御力; // :413\n      chara(yusya).dungeon.防御力 = Math.trunc(\n        Math.trunc(chara(yusya).dungeon.防御力 / 3) * 2,\n      ); // :414-416',
    replace:
      '      const guard = chara(yusya).dungeon.防御力; // :413\n      chara(yusya).dungeon.防御力 = Math.trunc(\n        Math.trunc(chara(yusya).dungeon.防御力 / 4) * 2,\n      ); // 变异：系数改坏',
    tests: ['page-invasion'],
    must_mention: '血量/攻防套算',
  },
  {
    desc: 'M10804 SEIEI 超时经验改坏（SINKOU/10 改 SINKOU/5）',
    file: 'ere/page/page-invasion.js',
    find: '      const gained = Math.trunc(sinkou / 10);',
    replace: '      const gained = Math.trunc(sinkou / 5);',
    tests: ['page-invasion'],
    must_mention: '战线崩溃',
  },
  {
    desc: 'M10805 SEIEI 胜出经验改坏（SINKOU/5 改 SINKOU/4）',
    file: 'ere/page/page-invasion.js',
    find: '      const gained = Math.trunc(sinkou / 5);',
    replace: '      const gained = Math.trunc(sinkou / 4);',
    tests: ['page-invasion'],
    must_mention: '无实参检查',
  },
  {
    desc: 'M10806 SEIEI 的 FLAG:60 等级补正系数改坏（10 * 改 5 *）',
    file: 'ere/page/page-invasion.js',
    find: "  const bonus = 10 * (era.get('flag:60') || 0);",
    replace: "  const bonus = 5 * (era.get('flag:60') || 0);",
    tests: ['page-invasion'],
    must_mention: '等级补正',
  },
  {
    desc: 'M10807 SEIEI 的 SINKOU 补正错加到气力两次（体力那行改气力）',
    file: 'ere/page/page-invasion.js',
    find: '  chara(yusya).dungeon.体力 += sinkou;\n  chara(yusya).dungeon.气力 += sinkou;',
    replace:
      '  chara(yusya).dungeon.气力 += sinkou;\n  chara(yusya).dungeon.气力 += sinkou;',
    tests: ['page-invasion'],
    must_mention: '血量/攻防套算',
  },
  {
    desc: 'M10808 @_INV_DEATH_CHECK 精锐的溃败线改坏（<= 100 改 <= 101）',
    file: 'ere/page/page-invasion.js',
    find: '  if (elite_hp <= 100) {',
    replace: '  if (elite_hp <= 101) {',
    tests: ['page-invasion'],
    must_mention: '三条退场判据',
  },
  {
    desc: 'M10809 @_INV_DEATH_CHECK 魔王侧的俘虏线改坏（<= 1000 改 <= 999）',
    file: 'ere/page/page-invasion.js',
    find: '    hero_mp <= 1000 &&',
    replace: '    hero_mp <= 999 &&',
    tests: ['page-invasion'],
    must_mention: '魔王侧四条退场判据',
  },
  {
    desc: 'M10810 @_INV_DEATH_CHECK 魔王军的溃败线改坏（<= 300 改 <= 299）',
    file: 'ere/page/page-invasion.js',
    find: '      : hero_hp <= 300',
    replace: '      : hero_hp <= 299',
    tests: ['page-invasion'],
    must_mention: '魔王侧四条退场判据',
  },
  {
    desc: 'M10811 @_INV_DEATH_CHECK 的退场状态对调（被狂王带走 9 / 逃回 0）',
    file: 'ere/page/page-invasion.js',
    find: '  chara(arg0).invasion.状态 = taken ? 9 : 0; // :492-494/:494-495/:503/:505-506/:513-514/:517',
    replace: '  chara(arg0).invasion.状态 = taken ? 0 : 9; // 变异：状态对调',
    tests: ['page-invasion'],
    must_mention: 'CFLAG 状态写入',
  },
  {
    desc: 'M10812 FLAG:5 的狂王俘虏位改坏（& 128 改 & 64）',
    file: 'ere/page/page-invasion.js',
    find: "  return ((era.get('flag:5') || 0) & 128) !== 0;",
    replace: "  return ((era.get('flag:5') || 0) & 64) !== 0;",
    tests: ['page-invasion'],
    must_mention: 'CFLAG 状态写入',
  },
  {
    desc: 'M10813 [2] 路线的怪物消耗改坏（/= 3 改 /= 2）',
    file: 'ere/page/page-invasion.js',
    find: '        const third = Math.trunc((era.get(`item:${i}`) || 0) / 3); // :424',
    replace:
      '        const third = Math.trunc((era.get(`item:${i}`) || 0) / 2); // 变异：除数改坏',
    tests: ['page-invasion'],
    must_mention: '怪物消耗三分之一',
  },
  {
    desc: 'M10814 [2] 路线的怪物回写漏掉 ×2（third * 2 改 third）',
    file: 'ere/page/page-invasion.js',
    find: '        era.set(`item:${i}`, third * 2); // :426 ITEM:MON_ID *= 2',
    replace: '        era.set(`item:${i}`, third); // 变异：漏掉回写',
    tests: ['page-invasion'],
    must_mention: '怪物消耗三分之一',
  },
  {
    desc: 'M10815 [2] 结果段的战利品倍数改坏（SINKOU × 5 改 × 10）',
    file: 'ere/page/page-invasion.js',
    find: '    era.print(`得到了${sinkou * 5}点的战利品！`); // :842 PRINTFORMW',
    replace:
      '    era.print(`得到了${sinkou * 10}点的战利品！`); // 变异：倍数改坏',
    tests: ['page-invasion'],
    must_mention: '结果段',
  },
  {
    desc: 'M10816 [2] 结果段的经验除数改坏（SINKOU / 2 改 / 4）',
    file: 'ere/page/page-invasion.js',
    find: '    const exp_gain = Math.trunc(sinkou / 2);\n    chara(yusya_i).dungeon.战斗经验 += exp_gain; // :842-845',
    replace:
      '    const exp_gain = Math.trunc(sinkou / 4);\n    chara(yusya_i).dungeon.战斗经验 += exp_gain; // 变异：除数改坏',
    tests: ['page-invasion'],
    must_mention: '结果段',
  },
  {
    desc: 'M10817 [2] 结果段的善恶值改坏（KARMA -50 改 -5）',
    file: 'ere/page/page-invasion.js',
    find: '  karma(yusya_i, -50); // :776 CALL KARMA, YUSYA_I, -50',
    replace: '  karma(yusya_i, -5); // 变异：善恶值改坏',
    tests: ['page-invasion'],
    must_mention: '结果段',
  },
  {
    desc: 'M10818 [2] 结果段的抓捕概率改坏（RAND:100 < 9 改 < 5）',
    file: 'ere/page/page-invasion.js',
    find: "  if (rand(100) < 9) {\n    era.print('好像抓到了负隅顽抗的勇者…………'); // :882-883 PRINTFORMW",
    replace:
      "  if (rand(100) < 5) {\n    era.print('好像抓到了负隅顽抗的勇者…………'); // 变异：概率改坏",
    tests: ['page-invasion'],
    must_mention: '结果段',
  },
  {
    desc: 'M10819 [2] 结果段的抓捕威望漏掉（EX_FLAG:99 += 1 删掉）',
    file: 'ere/page/page-invasion.js',
    find: '    era_exflag.prestige = era_exflag.prestige + 1; // :885 EX_FLAG:99 += 1',
    replace: '    // 变异：漏掉威望 +1',
    tests: ['page-invasion'],
    must_mention: '结果段',
  },
  {
    desc: 'M10820 [2] 性格旁白的档位号改坏（慈爱 160 改 161）',
    file: 'ere/page/page-invasion.js',
    find: '      160,\n      `${chara_callname(yusya_i)}在侵略的时候依旧全程保持着慈爱的笑容',
    replace:
      '      161,\n      `${chara_callname(yusya_i)}在侵略的时候依旧全程保持着慈爱的笑容',
    tests: ['page-invasion'],
    must_mention: '性格旁白',
  },
  {
    desc: 'M10821 [2] 已征服来路的战利品倍数改坏（强制征收 ×5 改 ×4）',
    file: 'ere/page/page-invasion.js',
    find: '    era_flag.money += sinkou * 5; // :806',
    replace: '    era_flag.money += sinkou * 4; // 变异：倍数改坏',
    tests: ['page-invasion'],
    must_mention: '封顶',
  },
  {
    desc: 'M10822 [2] 的候选判据放宽（CFLAG:1 不属于 {0,7} 改只挡 7）',
    file: 'ere/page/page-invasion.js',
    find: '  if (status !== 0 && status !== 7) return true; // 待机 / 苗床之外一律淘汰',
    replace: '  if (status === 7) return true; // 变异：判据放宽',
    tests: ['page-invasion'],
    must_mention: '候选资格六条',
  },
  {
    desc: 'M10823 FORT 强攻成功档的判据改坏（LOCAL >= 6 改 >= 5）',
    file: 'ere/page/page-invasion.js',
    find: '    if (roll >= 6) {\n      era.print(\n        `魔王军向着${info.fort}发起了最为猛烈的进攻，在付出较小的代价后攻破了${info.fort}的一角。`, // :614',
    replace:
      '    if (roll >= 5) {\n      era.print(\n        `魔王军向着${info.fort}发起了最为猛烈的进攻，在付出较小的代价后攻破了${info.fort}的一角。`, // 变异：判据改坏',
    tests: ['page-invasion'],
    must_mention: '全军强攻',
  },
  {
    desc: 'M10824 FORT 强攻惨胜档的判据改坏（LOCAL >= 2 改 >= 3）',
    file: 'ere/page/page-invasion.js',
    find: '    if (roll >= 2) {\n      era.print(`魔王军向着${info.fort}发起了最为猛烈的进攻。`); // :630',
    replace:
      '    if (roll >= 3) {\n      era.print(`魔王军向着${info.fort}发起了最为猛烈的进攻。`); // 变异：判据改坏',
    tests: ['page-invasion'],
    must_mention: '全军强攻',
  },
  {
    desc: 'M10825 FORT 强攻成功的减员比例改坏（× 9 / 10 改 × 8 / 10）',
    file: 'ere/page/page-invasion.js',
    find: '      state.sinkou = Math.trunc((state.sinkou * 9) / 10); // :624-625',
    replace:
      '      state.sinkou = Math.trunc((state.sinkou * 8) / 10); // 变异：比例改坏',
    tests: ['page-invasion'],
    must_mention: '全军强攻',
  },
  {
    desc: 'M10826 FORT 强攻惨胜的减员比例改坏（/ 2 改 / 3）',
    file: 'ere/page/page-invasion.js',
    find: '      state.sinkou = Math.trunc(state.sinkou / 2); // :649',
    replace:
      '      state.sinkou = Math.trunc(state.sinkou / 3); // 变异：比例改坏',
    tests: ['page-invasion'],
    must_mention: '全军强攻',
  },
  {
    desc: 'M10827 FORT 惨败支的体力剩量改坏（× 3 / 10 改 × 7 / 10）',
    file: 'ere/page/page-invasion.js',
    find: '        (chara(yusya).dungeon.体力 * 3) / 10,\n      ); // :662',
    replace:
      '        (chara(yusya).dungeon.体力 * 7) / 10,\n      ); // 变异：剩量改坏',
    tests: ['page-invasion'],
    must_mention: '全军强攻',
  },
  {
    desc: 'M10828 FORT 潜入成功档的判据改坏（LOCAL >= 5 改 >= 4）',
    file: 'ere/page/page-invasion.js',
    find: '    if (roll >= 5 || native) {\n      // :694-708 潜入成功 50%',
    replace: '    if (roll >= 4 || native) {\n      // 变异：判据改坏',
    tests: ['page-invasion'],
    must_mention: '亲自潜入',
  },
  {
    desc: 'M10829 FORT 潜入失败支的减员比例改坏（× 7 / 10 改 × 8 / 10）',
    file: 'ere/page/page-invasion.js',
    find: '      state.sinkou = Math.trunc((state.sinkou * 7) / 10); // :721',
    replace:
      '      state.sinkou = Math.trunc((state.sinkou * 8) / 10); // 变异：比例改坏',
    tests: ['page-invasion'],
    must_mention: '亲自潜入',
  },
  {
    desc: 'M10830 FORT 人间牧场的入账数改坏（FLAG:83 += 5 改 += 3）',
    file: 'ere/page/page-invasion.js',
    find: '      era_flag.meat_toilet_count += 5; // :687 FLAG:83 += 5',
    replace: '      era_flag.meat_toilet_count += 3; // 变异：入账数改坏',
    tests: ['page-invasion'],
    must_mention: '亲自潜入',
  },
  {
    desc: 'M10831 FORT 绕路平安档的判据改坏（LOCAL > 0 改 >= 0）',
    file: 'ere/page/page-invasion.js',
    find: '    const roll = rand(10); // :767-768\n    if (roll > 0) {',
    replace: '    const roll = rand(10); // :767-768\n    if (roll >= 0) {',
    tests: ['page-invasion'],
    must_mention: '绕路',
  },
  {
    desc: 'M10832 FORT 绕路平安档的减员比例改坏（× 9 / 10 改 × 8 / 10）',
    file: 'ere/page/page-invasion.js',
    find: '      state.sinkou = Math.trunc((state.sinkou * 9) / 10); // :775',
    replace:
      '      state.sinkou = Math.trunc((state.sinkou * 8) / 10); // 变异：比例改坏',
    tests: ['page-invasion'],
    must_mention: '绕路',
  },
  {
    desc: 'M10833 FORT 绕路埋伏档的减员比例改坏（× 5 / 10 改 × 4 / 10）',
    file: 'ere/page/page-invasion.js',
    find: '    state.sinkou = Math.trunc((state.sinkou * 5) / 10); // :784',
    replace:
      '    state.sinkou = Math.trunc((state.sinkou * 4) / 10); // 变异：比例改坏',
    tests: ['page-invasion'],
    must_mention: '绕路',
  },
  {
    desc: 'M10834 FORT 掠夺选项号偏移丢掉（L_CHOICE = RESULT + 1 改 RESULT）',
    file: 'ere/page/page-invasion.js',
    find: '    choice = (await fort_choice([1, 2])) + 1; // :592-599 $INPUT_LOOP2',
    replace: '    choice = await fort_choice([1, 2]); // 变异：偏移丢掉',
    tests: ['page-invasion'],
    must_mention: '选项渲染',
  },
  {
    desc: 'M10835 CHALLENGE 位域守卫的判据改坏（& bit 改 ^ bit）',
    file: 'ere/page/page-invasion.js',
    find: '  if (((era_exflag.defeated_heroes_bits || 0) & info.bit) !== 0) {',
    replace:
      '  if (((era_exflag.defeated_heroes_bits || 0) ^ info.bit) !== 0) {',
    tests: ['page-invasion'],
    must_mention: '位守卫',
  },
  {
    desc: 'M10836 CHALLENGE 开挂取胜档的判据改坏（LOCAL >= 2 改 >= 3）',
    file: 'ere/page/page-invasion.js',
    find: '    if (choice === 1 && local >= 2) {',
    replace: '    if (choice === 1 && local >= 3) {',
    tests: ['page-invasion'],
    must_mention: '开挂取胜',
  },
  {
    desc: 'M10837 CHALLENGE 以流程掷出的 LOCAL 直接当判据（漏掉人数上限归零）',
    file: 'ere/page/page-invasion.js',
    find: '    const local = hero_cap_reached() ? 0 : roll;',
    replace: '    const local = roll; // 变异：漏掉人数上限归零',
    tests: ['page-invasion'],
    must_mention: '人数上限七分支',
  },
  {
    desc: 'M10838 CHALLENGE 开挂取胜的威望增量改坏（EX_FLAG:99 += 1 改 += 2）',
    file: 'ere/page/page-invasion.js',
    find: '      era_exflag.prestige = era_exflag.prestige + 1; // :1042',
    replace:
      '      era_exflag.prestige = era_exflag.prestige + 2; // 变异：增量改坏',
    tests: ['page-invasion'],
    must_mention: '开挂取胜',
  },
  {
    desc: 'M10839 CHALLENGE 开挂取胜的金额改坏（MONEY -= 3000 改 -= 2000）',
    file: 'ere/page/page-invasion.js',
    find: '      era_flag.money -= 3000; // :1038-1039',
    replace: '      era_flag.money -= 2000; // 变异：金额改坏',
    tests: ['page-invasion'],
    must_mention: '开挂取胜',
  },
  {
    desc: 'M10840 CHALLENGE 抓人时的地区位写丢（EX_FLAG:95 = kill_bits 改回原值）',
    file: 'ere/page/page-invasion.js',
    find: '      era_exflag.defeated_heroes_bits = kill_bits; // :1041',
    replace:
      '      era_exflag.defeated_heroes_bits = era_exflag.defeated_heroes_bits; // 变异：写丢',
    tests: ['page-invasion'],
    must_mention: '开挂取胜',
  },
  {
    desc: 'M10841 CHALLENGE 亲自处理取胜档的判据改坏（LOCAL < 2 改 < 3）',
    file: 'ere/page/page-invasion.js',
    find: '    if (roll < 2) {\n      // :1090-1104 奴隶取胜 20%',
    replace: '    if (roll < 3) {\n      // 变异：判据改坏',
    tests: ['page-invasion'],
    must_mention: '20/40/40',
  },
  {
    desc: 'M10842 CHALLENGE 亲自处理不分胜负档的判据改坏（LOCAL < 6 改 < 5）',
    file: 'ere/page/page-invasion.js',
    find: '    if (roll < 6) {\n      // :1106-1119 奴隶不分胜负 40%',
    replace: '    if (roll < 5) {\n      // 变异：判据改坏',
    tests: ['page-invasion'],
    must_mention: '20/40/40',
  },
  {
    desc: 'M10843 CHALLENGE 不分胜负档的体力比例改坏（/ 10 改 / 5）',
    file: 'ere/page/page-invasion.js',
    find: '      chara(yusya).dungeon.体力 = Math.trunc(chara(yusya).dungeon.体力 / 10); // :1118',
    replace:
      '      chara(yusya).dungeon.体力 = Math.trunc(chara(yusya).dungeon.体力 / 5); // 变异：比例改坏',
    tests: ['page-invasion'],
    must_mention: '20/40/40',
  },
  {
    desc: 'M10844 CHALLENGE 无视档的减员比例改坏（× 4 / 5 改 × 3 / 5）',
    file: 'ere/page/page-invasion.js',
    find: '  state.sinkou = Math.trunc((state.sinkou * 4) / 5); // :1157',
    replace:
      '  state.sinkou = Math.trunc((state.sinkou * 3) / 5); // 变异：比例改坏',
    tests: ['page-invasion'],
    must_mention: '全军进攻',
  },
  {
    desc: 'M10845 CHALLENGE 无视档的随机分支反转（RAND:2 != 0 改 == 0）',
    file: 'ere/page/page-invasion.js',
    find: "  if (rand(2) !== 0) {\n    era.print('然而由于地形狭窄魔王军的数量优势无法发挥、'); // :1140",
    replace:
      "  if (rand(2) === 0) {\n    era.print('然而由于地形狭窄魔王军的数量优势无法发挥、'); // 变异：分支反转",
    tests: ['page-invasion'],
    must_mention: '全军进攻',
  },
  {
    desc: 'M10846 CHALLENGE 精灵族复现职业的两个候选对调（12/16 换位）',
    file: 'ere/page/page-invasion.js',
    find: '    job: [12, 16],',
    replace: '    job: [16, 12],',
    tests: ['page-invasion'],
    must_mention: '复现职业',
  },
  {
    desc: 'M10847 CHALLENGE 人数上限的第一支阈值改坏（> 60 改 > 59）',
    file: 'ere/page/page-invasion.js',
    find: '  if (f(82) === 0 && charanum > 60) {',
    replace: '  if (f(82) === 0 && charanum > 59) {',
    tests: ['page-invasion'],
    must_mention: '人数上限七分支',
  },
  {
    desc: 'M10848 SEIEI 第二档传闻的上界改坏（< 5000 改 < 5001）',
    file: 'ere/page/page-invasion.js',
    find: '  } else if (progress >= 1 && progress < 5000 && inv_type !== 1) {',
    replace:
      '  } else if (progress >= 1 && progress < 5001 && inv_type !== 1) {',
    tests: ['page-invasion'],
    must_mention: '三档传闻',
  },
  {
    desc: 'M10849 SEIEI 第三档传闻的 INV_TYPE 条件漏掉（!= 1 删去）',
    file: 'ere/page/page-invasion.js',
    find: '  } else if (progress >= 1 && progress < 10000 && inv_type !== 1) {',
    replace: '  } else if (progress >= 1 && progress < 10000) {',
    tests: ['page-invasion'],
    must_mention: '三档传闻',
  },
  // —— #505：地区续接与 start_campaign 的地区泛化 ——
  {
    desc: 'M10850 地区表的 AREA 改坏（精灵族领域 86 → 88，INVASION.ERB:113-115）',
    file: 'ere/page/page-invasion.js',
    find: '    area: 86,\n    sindo: 87,',
    replace: '    area: 88,\n    sindo: 87, // 变异：AREA 改坏',
    tests: ['page-invasion'],
    must_mention: '累加进 FLAG:86',
  },
  {
    desc: 'M10851 地区表的 SINDO 改坏（精灵族领域 87 → 89，INVASION.ERB:114-115）',
    file: 'ere/page/page-invasion.js',
    find: '    area: 86,\n    sindo: 87,',
    replace: '    area: 86,\n    sindo: 89, // 变异：SINDO 改坏',
    tests: ['page-invasion'],
    must_mention: '走已征服臂',
  },
  {
    desc: 'M10852 侵攻度累加写到 EX_FLAG 侧（FLAG:AREA → EX_FLAG:AREA）',
    file: 'ere/page/page-invasion.js',
    find: '  era.set(`flag:${region.area}`, Math.min(next, 10000)); // :617-618 封顶',
    replace:
      '  era.set(`exflag:${region.area}`, Math.min(next, 10000)); // 变异：写侧换表',
    tests: ['page-invasion'],
    must_mention: '累加进 FLAG:86',
  },
  {
    desc: 'M10853 侵攻度读点的表判据改坏（AREA > 100 改 > 200，:165/:752-755）',
    file: 'ere/page/page-invasion.js',
    find: "  const table = use_exflag && region.area > 100 ? 'exflag' : 'flag';",
    replace:
      "  const table = use_exflag && region.area > 200 ? 'exflag' : 'flag'; // 变异：判据改坏",
    tests: ['page-invasion'],
    must_mention: '出兵菜单的进度条读 EX_FLAG:101',
  },
  {
    desc: 'M10854 侵攻度读点的表对调（use_exflag 语义反转）',
    file: 'ere/page/page-invasion.js',
    find: "  const table = use_exflag && region.area > 100 ? 'exflag' : 'flag';",
    replace:
      "  const table = use_exflag && region.area > 100 ? 'flag' : 'exflag'; // 变异：表对调",
    tests: ['page-invasion'],
    must_mention: '结果段的进度条读本地区的侵攻度',
  },
  {
    desc: 'M10855 [0] 结果段的进度条改用 EX_FLAG（原作 :664 只写 FLAG:AREA）',
    file: 'ere/page/page-invasion.js',
    find: '  // :653-667 侵攻度条 + DRAWLINE + WAIT（进度条一律读 FLAG:AREA，:664）\n  era.drawLine();\n  print_progress_line(\n    region.result_label,\n    region_progress(region, false),\n    10000,\n  );',
    replace:
      '  // 变异：进度条改读 EX_FLAG\n  era.drawLine();\n  print_progress_line(\n    region.result_label,\n    region_progress(region, true),\n    10000,\n  );',
    tests: ['page-invasion'],
    must_mention: '[0] 结果段的进度条一律读 FLAG:AREA',
  },
  {
    desc: 'M10856 [0] 的已征服臂补上天神宫（原作 :624-646 漏列 101）',
    file: 'ere/page/page-invasion.js',
    find: 'const MONSTER_CONQUERED_AREAS = [81, 86, 88, 90];',
    replace:
      'const MONSTER_CONQUERED_AREAS = [81, 86, 88, 90, 101]; // 变异：补上 101',
    tests: ['page-invasion'],
    must_mention: '落 ELSE 臂',
  },
  {
    desc: 'M10857 [2] 结果段的地区名写死人间界（:762-773 的 PRINT 分派丢失）',
    file: 'ere/page/page-invasion.js',
    find: '到达了${region.name}，尽可能地施暴着',
    replace: '到达了人间界，尽可能地施暴着',
    tests: ['page-invasion'],
    must_mention: '地区名取 AREA=86',
  },
  {
    desc: 'M10858 [3] 结果段的地区名写死人间界（:894-906 的 PRINT 分派丢失）',
    file: 'ere/page/page-invasion.js',
    find: '得到了魔王的力量！${region.name}被掠夺了',
    replace: '得到了魔王的力量！人间界被掠夺了',
    tests: ['page-invasion'],
    must_mention: '[3] 的地区名取 AREA=88',
  },
  {
    desc: 'M10859 [0] 结果段的凌辱地区号写死 1（:669-684 的地区号分派丢失）',
    file: 'ere/page/page-invasion.js',
    find: '  // :669-684 CALL INVASION_RYOUZYOKU, <地区号>, SINKOU（#470 的真身）\n  await invasion_ryouzyoku(region.ravish_area, sinkou, rand);',
    replace:
      '  // 变异：凌辱地区号写死 1\n  await invasion_ryouzyoku(1, sinkou, rand);',
    tests: ['page-invasion'],
    must_mention: '传给 @INVASION_RYOUZYOKU 的地区号',
  },
  {
    desc: 'M10860 地区表的凌辱地区号改坏（精灵族领域 2 → 4，:674）',
    file: 'ere/page/page-invasion.js',
    find: '    ravish_area: 2,\n    kyoten_arg: 2,',
    replace: '    ravish_area: 4,\n    kyoten_arg: 2, // 变异：凌辱地区号改坏',
    tests: ['page-invasion'],
    must_mention: '传给 @INVASION_RYOUZYOKU 的地区号',
  },
  {
    desc: 'M10861 地区表的 KYOTEN 实参改坏（精灵族领域 2 → 4，:987）',
    file: 'ere/page/page-invasion.js',
    find: '    ravish_area: 2,\n    kyoten_arg: 2,',
    replace: '    ravish_area: 2,\n    kyoten_arg: 4, // 变异：KYOTEN 实参改坏',
    tests: ['page-invasion'],
    must_mention: 'KYOTEN_EVENT 走 ARG 2 臂',
  },
  {
    desc: 'M10862 天神宫补上 KYOTEN 实参（原作 :983-994 没有 101 臂）',
    file: 'ere/page/page-invasion.js',
    find: '    ravish_area: 5,\n    kyoten_arg: null,',
    replace:
      '    ravish_area: 5,\n    kyoten_arg: 1, // 变异：天神宫也调 KYOTEN',
    tests: ['page-invasion'],
    must_mention: 'KYOTEN_EVENT 分派没有 101 臂',
  },
  {
    desc: 'M10863 征服后菜单的地区续接丢地区（CAMPAIGN_REGIONS[result] 删去）',
    file: 'ere/page/page-invasion.js',
    find: '    return await start_campaign(rand, CAMPAIGN_REGIONS[result]);',
    replace: '    return await start_campaign(rand); // 变异：地区泛化丢失',
    tests: ['page-invasion'],
    must_mention: '累加进 FLAG:86',
  },
  {
    desc: 'M10864 三臂的命中判据反转（=== stage 改 !== stage，命中档时反而不打星号）',
    file: 'ere/page/page-invasion.js',
    find: '  if (kyoten_next_stage(progress, stage) === stage) {\n    return 0; // 未命中任何档：空转\n  }',
    replace:
      '  if (kyoten_next_stage(progress, stage) !== stage) { // 变异：判据反转\n    return 0;\n  }',
    tests: ['page-invasion'],
    must_mention: '档内只剩一行星号',
  },
  {
    desc: 'M10865 三臂把推进赋值补回去（原作注释态被「修好」，#14 登记的缺陷）',
    file: 'ere/page/page-invasion.js',
    find: '  // :106-206 的十处：档内只剩这一行星号（推进赋值被注释，不写回状态字）\n  era.print(BANNER_STAR);',
    replace:
      '  // 变异：把推进赋值补回去\n  era.print(BANNER_STAR);\n  era.set(`flag:${arm.stage}`, kyoten_next_stage(progress, stage));',
    tests: ['page-invasion'],
    must_mention: '的推进赋值在汉化版被注释',
  },
  {
    desc: 'M10866 精灵臂的征服守卫删掉（:108 `IF FLAG:87 == 0`）',
    file: 'ere/page/page-invasion.js',
    find: '  if (arm.guard !== undefined && (era.get(`flag:${arm.guard}`) || 0) !== 0) {\n    return 0;\n  }',
    replace: '  // 变异：精灵臂的征服守卫删除',
    tests: ['page-invasion'],
    must_mention: '精灵臂的 FLAG:87 == 0 守卫',
  },
  {
    desc: 'M10867 出兵菜单的地区标签改坏（精灵族领域的侵攻度 → 侵攻度，:156）',
    file: 'ere/page/page-invasion.js',
    find: "    campaign_label: '精灵族领域的侵攻度',",
    replace: "    campaign_label: '侵攻度', // 变异：标签改坏",
    tests: ['page-invasion'],
    must_mention: '出兵菜单的进度条标签',
  },
  {
    desc: 'M10868 结果段的地区标签改坏（精灵族领域　侵攻度 → 侵攻度，:657）',
    file: 'ere/page/page-invasion.js',
    find: "    result_label: '精灵族的领域　侵攻度',",
    replace: "    result_label: '侵攻度', // 变异：标签改坏",
    tests: ['page-invasion'],
    must_mention: '结果段的进度条标签',
  },
  {
    desc: 'M10869 魔力结果段的已征服封顶改大（100000 改 1000000，:713-733）',
    file: 'ere/page/page-invasion.js',
    find: '      exp_sinkou = Math.min(exp_sinkou, 10000 * 10); // :713/:718/:723/:728/:733',
    replace:
      '      exp_sinkou = Math.min(exp_sinkou, 10000 * 100); // 变异：封顶改大',
    tests: ['page-invasion'],
    must_mention: 'MIN(SINKOU, 100000) 之后 / 2',
  },
  {
    desc: 'M10870 魔力结果段的已征服判据恒真（!== 0 改 >= 0，:712-732）',
    file: 'ere/page/page-invasion.js',
    find: '    if ((era.get(`flag:${region.sindo}`) || 0) !== 0) {\n      exp_sinkou = Math.min(exp_sinkou, 10000 * 10); // :713/:718/:723/:728/:733',
    replace:
      '    if ((era.get(`flag:${region.sindo}`) || 0) >= 0) {\n      exp_sinkou = Math.min(exp_sinkou, 10000 * 10); // 变异：判据恒真',
    tests: ['page-invasion'],
    must_mention: 'ELSE 臂不封顶',
  },
  {
    desc: 'M10871 出兵流程的默认地区改坏（HUMAN_WORLD 改 CAMPAIGN_REGIONS[1]）',
    file: 'ere/page/page-invasion.js',
    find: 'async function start_campaign(rand = default_rand, region = HUMAN_WORLD) {',
    replace:
      'async function start_campaign(rand = default_rand, region = CAMPAIGN_REGIONS[1]) { // 变异：默认地区改坏',
    tests: ['page-invasion'],
    must_mention: 'FLAG:81 += 10000/25',
  },
  {
    desc: 'M10872 [0] 结果段的地区实参写死人间界（region 改 HUMAN_WORLD）',
    file: 'ere/page/page-invasion.js',
    find: '    await monster_result_section(region, sinkou, rand); // :620-692',
    replace:
      '    await monster_result_section(HUMAN_WORLD, sinkou, rand); // 变异：地区写死',
    tests: ['page-invasion'],
    must_mention: '结果段的进度条一律读 FLAG:AREA',
  },
  {
    desc: 'M10873 [2] 结果段的凌辱地区号写死 1（:866-880 的地区号分派丢失）',
    file: 'ere/page/page-invasion.js',
    find: '  await invasion_ryouzyoku(region.ravish_area, sinkou, rand);\n  // :882-888',
    replace:
      '  await invasion_ryouzyoku(1, sinkou, rand); // 变异：凌辱地区号写死\n  // :882-888',
    tests: ['page-invasion'],
    must_mention: '[2] 传给 @INVASION_RYOUZYOKU 的地区号也是 2',
  },
  {
    desc: 'M10874 魔力结果段的已征服判据写死（region.sindo 改字面量 82）',
    file: 'ere/page/page-invasion.js',
    find: '    if ((era.get(`flag:${region.sindo}`) || 0) !== 0) {',
    replace: "    if ((era.get('flag:82') || 0) !== 0) { // 变异：判据写死",
    tests: ['page-invasion'],
    must_mention: '判据读 FLAG:87（写死 FLAG:82 会误封顶）',
  },
  {
    desc: 'M11100 招募上限差一边界：>80 改 >79（恰好 80 人被误拦，#521 返工）',
    file: 'ere/page/page-campaign.js',
    find: `  if (era.getAddedCharacters().length > 80) {`,
    replace: `  if (era.getAddedCharacters().length > 79) {`,
    tests: ['page-campaign'],
    must_mention: '恰好 80 人',
  },
  {
    desc: 'M11110 page-shop 存根名单退回旧状态（INTERCEPT/ABILITY_UP/TAILOR_MAIN 自 #397 起已接真身，重新列入即红，#515）',
    file: 'ere/page/page-shop.js',
    find: "const STUBBED_CALLS = ['批量处刑', 'LABO', 'SHOW_FLOOR'];",
    replace:
      "const STUBBED_CALLS = [\n  '批量处刑',\n  'INTERCEPT',\n  'ABILITY_UP',\n  'TAILOR_MAIN',\n  'LABO',\n  'SHOW_FLOOR',\n  'DEBUG_MENU_U',\n];",
    tests: ['page-shop'],
    test_name: '存根清单可检索',
    must_mention: '存根名单必须只列仍未接真身的分支',
  },
  {
    desc: 'M11204 祭品名单的 [100] 返回退回纯文本（该轮白名单非空——名单行与条件键都是按钮，编号被引擎拒收，#530）',
    file: 'ere/page/page-chara-info-show.js',
    find: `    // :127 \` [100] 返回 \`——真按钮（#530）。**这一轮的白名单非空**：名单行与
    // 六个条件键都在上面打印过了，纯文本行必然被引擎拒收（夹具当场抛「输入
    // 不合法」，见 test/chara-info-show.test.js 的 #530 用例）。
    era.printButton('返回', 100);`,
    replace: `    // :127 变异：退回纯文本（该轮白名单非空，编号会被引擎拒收）
    era.print(' [100] 返回 ');`,
    tests: ['chara-info-show'],
    must_mention: '输入不合法！请输入以下值之一',
  },
  {
    desc: 'M11205 献祭确认的两个选项一起退回纯文本（#530 的原形态：该轮白名单因此为空，1/0 走自由输入照样能过——只有按钮断言拦得住）',
    file: 'ere/page/page-chara-info-show.js',
    find: `      era.printButton('献祭', 1);
      era.println();
      era.printButton('终止', 0);`,
    replace: `      era.print(' [1] 献祭 ');
      era.println();
      era.print(' [0] 终止 ');`,
    tests: ['chara-info-show'],
    must_mention: '确认选项要由引擎拼编号',
  },
  {
    desc: 'M11206 献祭两个出口的 [100] 返回退回纯文本（白名单里有 [10]，100 被引擎拒收，#530）',
    file: 'ere/page/page-chara-info-show.js',
    find: `  era.printButton('返回', 100);
  const choice = await era.input(); // :82 INPUT`,
    replace: `  era.print(' [100] 返回 '); // 变异：退回纯文本
  const choice = await era.input(); // :82 INPUT`,
    tests: ['chara-info-show'],
    must_mention: '输入不合法！请输入以下值之一',
  },
  {
    desc: 'M11260 越界守卫上界挪一格（>= 6 改 >= 7——6 落进地区分派，#538）',
    file: 'ere/page/page-invasion.js',
    find: '    if (result >= 6 || result < 0) {',
    replace: '    if (result >= 7 || result < 0) { // 变异：上界挪一格',
    tests: ['page-invasion'],
    test_name:
      '征服后菜单派发：[5] 拒收清空按钮白名单后，越界输入仍被 result >= 6 || < 0 拒收（INVASION.ERB:102-105）',
    must_mention: '白名单清空后仍应被越界守卫拒收重问',
  },
  {
    desc: 'M11261 越界守卫下界挪一格（< 0 改 < -1——-1 落进地区分派，#538）',
    file: 'ere/page/page-invasion.js',
    find: '    if (result >= 6 || result < 0) {',
    replace: '    if (result >= 6 || result < -1) { // 变异：下界挪一格',
    tests: ['page-invasion'],
    test_name:
      '征服后菜单派发：[5] 拒收清空按钮白名单后，越界输入仍被 result >= 6 || < 0 拒收（INVASION.ERB:102-105）',
    must_mention: '白名单清空后仍应被越界守卫拒收重问',
  },
  {
    desc: 'M11262 [5] 拒收上界挪一格（route_33 <= 500 改 < 500——500 落进天神宫出兵菜单，#538）',
    file: 'ere/page/page-invasion.js',
    find: '    if (result === 5 && era_exflag.route_33 <= 500) {',
    replace:
      '    if (result === 5 && era_exflag.route_33 < 500) { // 变异：上界挪一格',
    tests: ['page-invasion'],
    test_name:
      '征服后菜单 [5] 拒收判断条件的两侧边界：route_33 = 500 拒收 / 501 放行（:100-101）',
    must_mention: 'route_33 = 500 仍在拒收侧：不得落进天神宫的出兵菜单',
  },
  // —— #542：设置页 [26]/[28] 与主菜单 999 的不移植提示 ——
  {
    desc: 'M11313 设置页 [26] 的不移植提示整段删掉（回到空转——按钮在、按了没反应，#542）',
    file: 'ere/page/page-config.js',
    find: `  } else if (local === 26) {
    await not_ported_line_wait(
      'MODLIST',
      'MOD 开关菜单',
      '#542 判不移植：需手动开启、默认全关的 MOD 子系统',
    );
  } else if (local === 28) {`,
    replace: `  } else if (local === 28) { // 变异：[26] 分支整段删掉`,
    tests: ['page-config'],
    must_mention: '提示行必须带原作函数名 @MODLIST',
  },
  {
    desc: 'M11314 设置页 [28] 的不移植提示换成误写变量（不移植的功能被按下却写 flag——开关不落地被破坏，#542）',
    file: 'ere/page/page-config.js',
    // 提示行留着、只在后面补一次写——这样红的是「开关不落地」那条断言本身，
    // 不会先撞上「提示行必须带 @更换立绘」（前一次写法整段删掉，红的变成了
    // 前一条断言，must_mention 对不上）
    find: `    await not_ported_line_wait(
      '更换立绘',
      '立绘系统',
      '#542 判不移植：开关默认关、素材不在仓库',
    );`,
    replace: `    await not_ported_line_wait(
      '更换立绘',
      '立绘系统',
      '#542 判不移植：开关默认关、素材不在仓库',
    );
    era.set('flag:999', 1); // 变异：不移植的开关反而写状态`,
    tests: ['page-config'],
    must_mention: '立绘开关不落地',
  },
  {
    desc: 'M11320 主菜单 999 的不移植提示退回占位话术（「随调试票」——判死终态被读成待办，#542）',
    file: 'ere/page/page-shop.js',
    find: `    await not_ported_line_wait(
      'DEBUG_MENU_U',
      '调试菜单',
      '#542 判不移植：原作者的调试工具',
    );`,
    replace: `    await stub_line_wait('DEBUG_MENU_U', '调试菜单', '随调试票'); // 变异：退回占位话术`,
    tests: ['page-shop'],
    must_mention: '不移植提示要说清是什么与为何',
  },
  {
    desc: 'M11321 page-shop 存根名单退回旧状态（DEBUG_MENU_U 已随 #542 判不移植，重新列入即红）',
    file: 'ere/page/page-shop.js',
    find: "const STUBBED_CALLS = ['批量处刑', 'LABO', 'SHOW_FLOOR'];",
    replace:
      "const STUBBED_CALLS = ['批量处刑', 'LABO', 'SHOW_FLOOR', 'DEBUG_MENU_U'];",
    tests: ['page-shop'],
    test_name: '存根清单可检索：docs/stub-registry.md 收录这张票全部占位名',
    must_mention: '存根名单必须只列仍未接真身的分支',
  },
  {
    desc: 'M11328 [20] 更换立绘按钮快捷键错位（20 改 21——清单行的编号与引擎分发对不上，#542）',
    file: 'ere/page/page-chara-info.js',
    find: "      if (state === 0 && current !== 0) era.printButton('更换立绘', 20);",
    replace:
      "      if (state === 0 && current !== 0) era.printButton('更换立绘', 21); // 变异：快捷键错位",
    tests: ['page-chara-info'],
    must_mention: '奴隶 + 状态 0：渲染',
  },
  {
    desc: 'M11329 设置页 [28] 的提示文案串成 [26] 的（note 改「MOD 开关菜单」——立绘开关按下却说 MOD，#542）',
    file: 'ere/page/page-config.js',
    find: `    await not_ported_line_wait(
      '更换立绘',
      '立绘系统',
      '#542 判不移植：开关默认关、素材不在仓库',
    );`,
    replace: `    await not_ported_line_wait(
      '更换立绘',
      'MOD 开关菜单',
      '#542 判不移植：开关默认关、素材不在仓库',
    );`,
    tests: ['page-config'],
    must_mention: '不移植提示要说清是什么与为何',
  },
];
