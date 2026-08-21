// 变异条目表切片：ere/system/（回合循环、珠结算、指令判定、系统流转）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号是历史惯性编号
// （M117 曾被两票撞号使用），只作引用锚点保留，不再人工分配。
export default [
  {
    desc: 'M1 循环顺序：COM_ABLE 扫描挪到 SHOW_USERCOM 之后',
    file: 'ere/system/train/train-loop.js',
    find: `    // 5. 遍历 @COM_ABLExx：可执行指令表（喂输入检查与 @SHOW_USERCOM 的
    // 指令按钮渲染——按钮随首条指令票 #45 挂载）
    const usable = await scan_usable_commands();

    // 6. @SHOW_USERCOM（函数体在 page/page-usercom.js，含 [999] 调教结束；
    // 可执行指令表透传给按钮渲染）
    const usercom_draw = await emit('SHOW_USERCOM', usable);`,
    replace: `    // 6. @SHOW_USERCOM（函数体在 page/page-usercom.js，含 [999] 调教结束；
    // 可执行指令表透传给按钮渲染）
    const usercom_draw = await emit('SHOW_USERCOM', []);

    // 5. 遍历 @COM_ABLExx：可执行指令表（喂输入检查与 @SHOW_USERCOM 的
    // 指令按钮渲染——按钮随首条指令票 #45 挂载）
    const usable = await scan_usable_commands();`,
    tests: ['train-loop'],
    must_mention: '回调顺序',
  },
  {
    desc: 'M2 COM_ABLE 默认值：未定义改为不可执行（whenMissing 1 → 0）',
    file: 'ere/system/train/train-loop.js',
    find: 'const able = await com_able_family.call(id, { whenMissing: 1 });',
    replace: 'const able = await com_able_family.call(id, { whenMissing: 0 });',
    tests: ['train-loop'],
    must_mention: '未定义即视为可执行',
  },
  {
    desc: 'M13 回合循环：删掉全角色 NOWEX 清零（步骤 10）',
    file: 'ere/system/train/train-loop.js',
    find: `      // 10. 全角色 NOWEX 清零
      clear_nowex_all();
      // 11. @EVENTCOM（函数体在 event/event-com.js）`,
    replace: `      // 10. 变异：NOWEX 不清零
      // 11. @EVENTCOM（函数体在 event/event-com.js）`,
    tests: ['train-loop'],
    must_mention: '回调顺序',
  },
  {
    desc: 'M14 SELECTCOM 来源：输入检查不再设定 SELECTCOM（步骤 9）',
    file: 'ere/system/train/train-loop.js',
    find: `      // 9. 输入检查通过 → SELECTCOM = 输入
      era_flag.selectcom = result;`,
    replace: `      // 9. 变异：不设 SELECTCOM`,
    tests: ['train-loop'],
    must_mention: '回调顺序',
  },
  {
    desc: 'M15 AFTERTRAIN 收尾：endTrain 挪到 @EVENTEND 链之前',
    file: 'ere/system/train/train-loop.js',
    find: `  const pending = await emit('EVENTEND');
  era.endTrain();
  return pending;`,
    replace: `  era.endTrain();
  const pending = await emit('EVENTEND');
  return pending;`,
    tests: ['train-loop'],
    must_mention: 'run_aftertrain',
  },
  {
    desc: 'M21 珠梯子：PALAMLV:3*2 档丢失乘数（3000 档直接给 100）',
    file: 'ere/system/train/juel-check.js',
    find: '  [PALAMLV[3] * 2, 100],',
    replace: '  [PALAMLV[3], 100],',
    tests: ['juel-check'],
    must_mention: '26 个边界',
  },
  {
    desc: 'M22 绝顶加成：EX:0 的 ×1000 改 ×100',
    file: 'ere/system/train/juel-check.js',
    find: '      era.set(`gotjuel:${cid}:0`, gain + (era.get(`ex:${cid}:0`) || 0) * 1000);',
    replace:
      '      era.set(`gotjuel:${cid}:0`, gain + (era.get(`ex:${cid}:0`) || 0) * 100);',
    tests: ['juel-check'],
    must_mention: '结算表第 0 行',
  },
  {
    desc: 'M23 加算对象混入 3（润滑不是保有珠）',
    file: 'ere/system/train/juel-check.js',
    find: 'const OWNED_JUEL_KEYS = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 14, 15, 100];',
    replace:
      'const OWNED_JUEL_KEYS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 100];',
    tests: ['juel-check'],
    must_mention: '职责划分',
  },
  {
    desc: 'M24 双重结算：删掉结算尾部的 gotjuel 清零',
    file: 'ere/system/train/juel-check.js',
    find: `  for (const key of OWNED_JUEL_KEYS) {
    era.set(\`gotjuel:\${cid}:\${key}\`, 0);
  }
  return 0; // :740 RETURN 0`,
    replace: `  return 0; // :740 RETURN 0`,
    tests: ['juel-check'],
    must_mention: '职责划分',
  },
  {
    desc: 'M25 相殺取量：否定余量减半改三分之一',
    file: 'ere/system/train/juel-check.js',
    find: '    let take = Math.floor(negative() / 2); // LOCAL:1 = JUEL:100 / 2',
    replace:
      '    let take = Math.floor(negative() / 3); // LOCAL:1 = JUEL:100 / 2',
    tests: ['juel-check'],
    must_mention: '逐轮减半',
  },
  {
    desc: 'M26 相殺钳制：池子里不够不再整池扣走',
    file: 'ere/system/train/juel-check.js',
    find: `    if (pool_value(pick) < take) {
      take = pool_value(pick); // :631-632 池子里不够就整池扣走
    }`,
    replace: `    // 变异：不按池子现有钳制`,
    tests: ['juel-check'],
    must_mention: '池子里不够',
  },
  {
    desc: 'M27 相殺兜底：余量取半为 0 时改扣 2（原作扣 1）',
    file: 'ere/system/train/juel-check.js',
    find: '      take = 1; // :629-630 否定未清零时至少扣 1',
    replace: '      take = 2; // :629-630 否定未清零时至少扣 1',
    tests: ['juel-check'],
    must_mention: '改扣 1',
  },
  {
    desc: 'M28 TFLAG 快照：槽位错一格（+51 改 +52）',
    file: 'ere/system/train/juel-check.js',
    find: '    era.set(`tflag:${count + 51}`, era.get(`juel:${cid}:${count + 4}`) || 0);',
    replace:
      '    era.set(`tflag:${count + 52}`, era.get(`juel:${cid}:${count + 4}`) || 0);',
    tests: ['juel-check'],
    must_mention: 'TFLAG 快照',
  },
  {
    desc: 'M29 TFLAG:58：否定快照读错槽（juel:100 改 juel:99）',
    file: 'ere/system/train/juel-check.js',
    find: "  era.set('tflag:58', era.get(`juel:${cid}:100`) || 0); // :624",
    replace: "  era.set('tflag:58', era.get(`juel:${cid}:99`) || 0); // :624",
    tests: ['juel-check'],
    must_mention: 'TFLAG 快照',
  },
  {
    desc: 'M30 相殺两组先后：LABEL_1/LABEL_2 对调',
    file: 'ere/system/train/juel-check.js',
    find: `  offset_negative_group(cid, [4, 5, 6], rng); // $LABEL_1 恭顺/欲情/屈服
  offset_negative_group(cid, [8, 9, 10], rng); // $LABEL_2 耻情/苦痛/恐怖`,
    replace: `  offset_negative_group(cid, [8, 9, 10], rng); // $LABEL_1 恭顺/欲情/屈服
  offset_negative_group(cid, [4, 5, 6], rng); // $LABEL_2 耻情/苦痛/恐怖`,
    tests: ['juel-check'],
    must_mention: '两组先后',
  },
  {
    desc: 'M31 交互循环出口：999 改 998（退出键失效）',
    file: 'ere/system/train/juel-check.js',
    find: `    if (result === 999) {
      break; // :540-541 → $LABEL_EXIT（能力值提高结束）
    }`,
    replace: `    if (result === 998) {
      break; // :540-541 → $LABEL_EXIT（能力值提高结束）
    }`,
    tests: ['juel-check', 'train-loop'],
    must_mention: '选 999 退出',
  },
  {
    desc: 'M32 自动升级开关：GETBIT 位 35 改 34',
    file: 'ere/system/train/juel-check.js',
    find: "    if (getbit(era.get('flag:5'), 35)) {",
    replace: "    if (getbit(era.get('flag:5'), 34)) {",
    tests: ['juel-check'],
    must_mention: '自动升级',
  },
  {
    desc: 'M33 基础行格式：) 与 = 之间的 12 空格少 2 格',
    file: 'ere/system/train/juel-check.js',
    find: '      { content: \')            = \' }, // :687 PRINT ) + 12 空格 + "= "',
    replace:
      '      { content: \')          = \' }, // :687 PRINT ) + 12 空格 + "= "',
    tests: ['juel-check'],
    must_mention: '结算表第 0 行',
  },
  {
    desc: 'M34 FIGURE_INDENT：8 位右对齐改 7 位',
    file: 'ere/system/train/juel-check.js',
    find: 'const figure_indent = (n) => String(n).padStart(8);',
    replace: 'const figure_indent = (n) => String(n).padStart(7);',
    tests: ['juel-check'],
    must_mention: '结算表第 0 行',
  },
  {
    desc: 'M37 否定汇入：GOTJUEL:100 的累加改覆盖（反感/不快/抑郁只剩其一）',
    file: 'ere/system/train/juel-check.js',
    find: '      era.add(`gotjuel:${cid}:100`, gain);',
    replace: '      era.set(`gotjuel:${cid}:100`, gain);',
    tests: ['juel-check'],
    must_mention: '结算表第 11 行',
  },
  {
    desc: 'M38 能力分支：命中表判假（@ABLUPxx 占位不再出现）',
    file: 'ere/system/train/juel-check.js',
    find: '    if (ABLUP_IDS.includes(result)) {',
    replace: '    if (false && ABLUP_IDS.includes(result)) {',
    tests: ['juel-check'],
    must_mention: '能力分支',
  },
  {
    desc: 'M39 COM_ABLE0 爱抚系过滤：FLAG:25 & 1 判据删掉',
    file: 'ere/system/train/com0-caress.js',
    find: `  if ((era.get('flag:25') || 0) & 1) {
    return 0;
  }`,
    replace: '  // 变异：过滤判据删除',
    tests: ['com0-caress'],
    must_mention: 'COM_ABLE0',
  },
  {
    desc: 'M40 COM_ABLE0 决斗中判据删掉（TEQUIP:55）',
    file: 'ere/system/train/com0-caress.js',
    find: '  if (era.get(`tequip:${era_flag.target}:55`)) {\n    return 0;\n  }',
    replace: '  // 变异：决斗判据删除',
    tests: ['com0-caress'],
    must_mention: 'COM_ABLE0',
  },
  {
    desc: 'M41 ABL:0 分档表错一格（1200 改 1201）',
    file: 'ere/system/train/com0-caress.js',
    find: '  [1200, 100],',
    replace: '  [1201, 100],',
    tests: ['com0-caress'],
    must_mention: '= 3 档',
  },
  {
    desc: 'M42 ABL:1 分档表错一格（300 改 301）',
    file: 'ere/system/train/com0-caress.js',
    find: '  [300, 80],',
    replace: '  [301, 80],',
    tests: ['com0-caress'],
    must_mention: '= 2 档',
  },
  {
    desc: 'M43 初吻回避判据取反（CFLAG:16 === -1 改 !== -1）',
    file: 'ere/system/train/com0-caress.js',
    find: '  if ((era.get(`cflag:${target}:16`) || 0) === -1) {',
    replace: '  if ((era.get(`cflag:${target}:16`) || 0) !== -1) {',
    tests: ['com0-caress'],
    must_mention: '初吻未体验',
  },
  {
    desc: 'M44 爱慕的加倍删掉（SOURCE:3 × 2）',
    file: 'ere/system/train/com0-caress.js',
    find: '      set_src(3, src(3) * 2);',
    replace: '      // 变异：加倍删除',
    tests: ['com0-caress'],
    must_mention: '爱慕',
  },
  {
    desc: 'M45 百合经验的性别判定短路',
    file: 'ere/system/train/com0-caress.js',
    find: '  if (!target_male && !player_male) {',
    replace: '  if (false) {',
    tests: ['com0-caress'],
    must_mention: '百合经验',
  },
  {
    desc: 'M55 回合循环的 SOURCE_CHECK 槽位删掉',
    file: 'ere/system/train/train-loop.js',
    find: `      const source_pending = await emit('SOURCE_CHECK');
      if (source_pending !== undefined) {
        return source_pending;
      }`,
    replace: '      // 变异：SOURCE_CHECK 槽位删除',
    tests: ['source-check'],
    must_mention: '端到端',
  },
  {
    desc: 'M98 豁免条目过期失效（main-loop 的 :231 改号——条目表核对必须红）',
    file: 'ere/system/flow/main-loop.js',
    find: '  // 真身出口显式 begin(STATE.SHOP)（:231），此行只在未来的处理器们都不发',
    replace:
      '  // 真身出口显式 begin(STATE.SHOP)（:232），此行只在未来的处理器们都不发',
    tests: ['trace-check'],
    must_mention: '清单只能变短',
  },
];
