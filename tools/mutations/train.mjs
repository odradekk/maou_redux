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
    find: `  // 10. 全角色 NOWEX 清零
  clear_nowex_all();
  // 11. @EVENTCOM（函数体在 event/event-com.js）`,
    replace: `  // 10. 变异：NOWEX 不清零
  // 11. @EVENTCOM（函数体在 event/event-com.js）`,
    tests: ['train-loop'],
    must_mention: '回调顺序',
  },
  {
    desc: 'M14 SELECTCOM 来源：输入检查不再设定 SELECTCOM（步骤 9）',
    file: 'ere/system/train/train-loop.js',
    find: `      // 9. 输入检查通过 → SELECTCOM = L_I（紧凑序号经 com-index 映射；
      // 空间外编号（999 出口、子菜单号、乱数）在映射处得 undefined，
      // 落 @USERCOM——引擎「输入检查失败 → @USERCOM」的同位语义）
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
    file: 'ere/system/train/com-caress.js',
    find: `com_able_family.register(0, async () => {
  if ((era.get('flag:25') || 0) & 1) {
    return 0; // :30-31
  }`,
    replace: `com_able_family.register(0, async () => {
  // 变异：过滤判据删除`,
    tests: ['com-caress'],
    must_mention: 'COM_ABLE0',
  },
  {
    desc: 'M40 COM_ABLE0 决斗中判据删掉（TEQUIP:55）',
    file: 'ere/system/train/com-caress.js',
    find: `  if (era.get(\`tequip:\${era_flag.target}:55\`)) {
    return 0; // :32-33
  }
  return 1;
});`,
    replace: `  return 1; // 变异：决斗判据删除
});`,
    tests: ['com-caress'],
    must_mention: 'COM_ABLE0',
  },
  {
    desc: 'M41 ABL:0 分档表错一格（1200 改 1201）',
    file: 'ere/system/train/com-caress.js',
    find: '  [1200, 100],',
    replace: '  [1201, 100],',
    tests: ['com-caress'],
    must_mention: '= 3 档',
  },
  {
    desc: 'M42 ABL:1 分档表错一格（300 改 301）',
    file: 'ere/system/train/com-caress.js',
    find: '  [300, 80],',
    replace: '  [301, 80],',
    tests: ['com-caress'],
    must_mention: '= 2 档',
  },
  {
    desc: 'M43 初吻回避判据取反（CFLAG:16 === -1 改 !== -1）',
    file: 'ere/system/train/com-caress.js',
    find: '  if ((era.get(`cflag:${target}:16`) || 0) === -1) {\n    // :136-140 初吻未体験 → 回避接吻，效果减',
    replace:
      '  if ((era.get(`cflag:${target}:16`) || 0) !== -1) {\n    // :136-140 初吻未体験 → 回避接吻，效果减',
    tests: ['com-caress'],
    must_mention: '初吻未体验',
  },
  {
    desc: 'M44 爱慕的加倍删掉（SOURCE:3 × 2）',
    file: 'ere/system/train/com-caress.js',
    find: '      set(3, src(3) * 2); // :187-190 爱慕且主人亲自调教',
    replace: '      // 变异：加倍删除',
    tests: ['com-caress'],
    must_mention: '爱慕',
  },
  {
    desc: 'M45 百合经验的性别判定短路',
    file: 'ere/system/train/com-caress.js',
    find: '  if (!target_male && !player_male) {',
    replace: '  if (false) {',
    tests: ['com-caress'],
    must_mention: '百合经验',
  },
  {
    desc: 'M55 回合循环的 SOURCE_CHECK 槽位删掉',
    file: 'ere/system/train/train-loop.js',
    find: "  const source_pending = await emit('SOURCE_CHECK');\n  if (source_pending !== undefined) {\n    return { missing: false, pending: source_pending };\n  }",
    replace: '  // 变异：SOURCE_CHECK 槽位删除',
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

  // —— #212（J2 调教回合骨架）：M700-M703 ——
  {
    desc: 'M700 回调顺序：@EVENTCOM 与 @COMxx 分发对调（步骤 11↔12）',
    file: 'ere/system/train/train-loop.js',
    find: "  // 11. @EVENTCOM（函数体在 event/event-com.js）\n  const com_pending = await emit('EVENTCOM');\n  if (com_pending !== undefined) {\n    return { missing: false, pending: com_pending };\n  }\n  // 12. 对应 @COMxx；未实现 → 重新要求输入（引擎语义，见文件头）；\n  // 返回 0 → 回合取消（不结算、不进 EVENTCOMEND、PREVCOM 不推——文件头\n  // 第 12 步的取消语义，子菜单指令全出口 RETURN 0）\n  const com_result = await com_family.call(result, {\n    whenMissing: COM_MISSING,\n  });",
    replace:
      "  // 11. 变异：COM 分发先于 EVENTCOM\n  const com_result = await com_family.call(result, {\n    whenMissing: COM_MISSING,\n  });\n  const com_pending = await emit('EVENTCOM');\n  if (com_pending !== undefined) {\n    return { missing: false, pending: com_pending };\n  }",
    tests: ['train-loop'],
    must_mention: '回调顺序',
  },
  {
    desc: 'M701 BEGIN TRAIN 清空 TSTR:90 删（#212：Emuera 整族清空的手动镜像）',
    file: 'ere/system/train/train-loop.js',
    find: `  // TSTR:90（前回指令名）清空：Emuera 在 BEGIN TRAIN 整族清空 TSTR
  // （引擎内建）；ere 的 tstr 是持久普通表（yml/TStr.yml，#212 探针定论
  // ——beginTrain/endTrain 的调教期表清单里没有 tstr），引擎不清，此处
  // 手动镜像。原作 TRAIN_MAIN.ERB:29-30 那行注释掉的 ;TSTR:90 =
  // 正是同语义（引擎替它清了才注释掉）
  era.set('tstr:90', '');`,
    replace: `  // 变异：TSTR:90 不清（残留上一局的前回指令名）`,
    tests: ['train-loop'],
    must_mention: 'BEGIN TRAIN 必须清 TSTR:90',
  },
  {
    desc: 'M702 TRAIN_NAME_INIT 守卫删（每次 EVENTTRAIN 重播种）',
    file: 'ere/system/train/train-name.js',
    find: `  if ((era.get('trainalias:0') ?? '').length > 0) {
    return;
  }`,
    replace: `  // 变异：守卫删`,
    tests: ['train-name'],
    must_mention: '守卫命中后不得有任何写入',
  },
  {
    desc: 'M703 TRAIN_NAME:150 的 %CSTR:7% 内插删（播种时求值丢失）',
    file: 'ere/system/train/train-name.js',
    find: `  era.set(
    \`trainalias:150\`,
    \`\${era.get(\`cstr:\${era_flag.target}:7\`) ?? ''}调教\`,
  );`,
    replace: `  era.set(\`trainalias:150\`, '调教');`,
    tests: ['train-name'],
    must_mention: '尾巴调教',
  },
  {
    desc: 'M704 read_train_name 的空串兜底删（未播种槽回 undefined）',
    file: 'ere/system/train/train-name.js',
    find: `  return era.get(\`trainalias:\${id}\`) ?? '';`,
    replace: `  return era.get(\`trainalias:\${id}\`);`,
    tests: ['train-name'],
    must_mention: 'read_train_name',
  },
  // —— #213（J3 指令分发骨架）：121 段空间 / L_IDX 映射 / 升格 / 分发族 ——
  {
    desc: 'M740 反向变异（#213 必配）：映射层恒等化（com_index 返回 L_I 本身——train-loop.js:164 的旧行为）',
    file: 'ere/system/train/com-index.js',
    find: `function com_index(id) {
  const idx = ORDERED_TRAIN_IDS.indexOf(id);
  return idx === -1 ? undefined : idx;
}`,
    replace: `function com_index(id) {
  // 变异：恒等映射（第一个空号 39 之后的指令全部错位）
  return Number.isInteger(id) ? id : undefined;
}`,
    tests: ['com-dispatch', 'page-usercom'],
    must_mention: '打屁股——恒等映射在此必红',
  },
  {
    desc: 'M741 输入侧映射的越界兜底改成 0（空间外输入被误当爱抚执行）',
    file: 'ere/system/train/com-index.js',
    find: `  if (!Number.isInteger(idx) || idx < 0 || idx >= ORDERED_TRAIN_IDS.length) {
    return undefined;
  }`,
    replace: `  // 变异：越界回落 0（999 出口被当爱抚）
  if (!Number.isInteger(idx) || idx < 0 || idx >= ORDERED_TRAIN_IDS.length) {
    return 0;
  }`,
    tests: ['com-dispatch', 'train-loop'],
    // train-loop 侧的红形态是输入耗尽（999→0 进指令路径吃掉退出键），
    // com-dispatch 侧是越界断言——must_mention 取后者
    must_mention: '必须 undefined',
  },
  {
    desc: 'M742 train-loop 输入映射删（玩家输入直当 L_I——#211 查出的潜伏错误回潮）',
    file: 'ere/system/train/train-loop.js',
    find: `    const idx = await era.input();
    const result = com_id(idx);`,
    replace: `    const idx = await era.input();
    const result = idx; // 变异：映射层旁路`,
    tests: ['train-loop'],
    must_mention: 'L_IDX 39 必须分发到 @COM40',
  },
  {
    desc: 'M743 COM_ABLE 扫描域换成 121 段分发空间（高级 COM 混进可直选菜单）',
    file: 'ere/system/train/train-loop.js',
    find: `  for (const id of DECLARED_TRAIN_IDS) {
    const able = await com_able_family.call(id, { whenMissing: 1 });`,
    replace: `  for (const id of com_able_family.declared) {
    // 变异：扫全分发空间（高级 COM 不可直选）
    const able = await com_able_family.call(id, { whenMissing: 1 });`,
    tests: ['train-loop'],
    must_mention: '可直选空间 101 个编号全可用',
  },
  {
    desc: 'M744 按钮编号印回 L_I（渲染侧映射删——方格与玩家输入错位）',
    file: 'ere/page/page-usercom.js',
    find: `    const adv = await get_adv_com(id); // :209 CALL GET_ADV_COM, L_I
    era.printButton(command_button_label(adv, id), com_index(id));`,
    replace: `    const adv = await get_adv_com(id); // :209 CALL GET_ADV_COM, L_I
    era.printButton(command_button_label(adv, id), id); // 变异：印 L_I`,
    tests: ['page-usercom'],
    must_mention: '编号必须是紧凑序号 L_IDX',
  },
  {
    desc: 'M745 按钮标签不升格（标签用升格前的号——%TRAIN_NAME:RESULT% 的 RESULT 被旁路）',
    file: 'ere/page/page-usercom.js',
    find: `function command_button_label(adv, id) {
  if (adv === 64 && id !== 64) {`,
    replace: `function command_button_label(adv, id) {
  // 变异：升格名旁路（恒用升格前的号取名）
  adv = id;
  if (adv === 64 && id !== 64) {`,
    tests: ['page-usercom'],
    must_mention: '标签换、编号不换',
  },
  {
    desc: 'M746 64 合成臂删（%TRAINNAME:64%・%TRAINNAME:L_I% 的合成标签不再成形）',
    file: 'ere/page/page-usercom.js',
    find: `  if (adv === 64 && id !== 64) {`,
    replace: `  if (false) {
    // 变异：合成臂删（64 合成时直接落 TRAIN_NAME）`,
    tests: ['page-usercom'],
    must_mention: '64 合成臂',
  },
  {
    desc: 'M747 GET_ADV_COM 的缺失语义改 0（RETURN ARG 变 RETURN 0——无规则的指令被升格去 0 号）',
    file: 'ere/system/train/com-adv.js',
    find: `  return adv_com_family.call(id, { whenMissing: id, args: [rule_rand] });`,
    replace: `  return adv_com_family.call(id, { whenMissing: 0, args: [rule_rand] }); // 变异`,
    tests: ['com-dispatch'],
    must_mention: '无规则时',
  },
  {
    desc: 'M748 升格规则收不到随机源（get_adv_com 不注入缺省 rand——签名契约破）',
    file: 'ere/system/train/com-adv.js',
    find: `  const rule_rand = rand ?? ((n) => Math.floor(Math.random() * n));`,
    replace: `  const rule_rand = undefined; // 变异：随机源不注入`,
    tests: ['com-dispatch'],
    must_mention: 'rand 必须以函数形态注入规则',
  },
  {
    desc: 'M749 V_ABLE 的未成熟判定删（源注释与代码的出入处——照注释不照代码）',
    file: 'ere/system/train/v-able.js',
    find: `  if (era.get(\`talent:\${cid}:135\`)) {
    return 0; // :9-10 未成熟（源注释的「萨德豁免」不在函数体内，见文件头）
  }`,
    replace: `  // 变异：未成熟判定删`,
    tests: ['com-dispatch'],
    must_mention: '未成熟不可',
  },
  {
    desc: 'M750 分发空间少一号（84 刺激Ｇ点从声明空间摘除——升格目标无处分发）',
    file: 'ere/system/train/com-family.js',
    find: `const ADVANCED_COM_IDS = [
  67, 69, 70, 84, 111, 120, 121, 123, 124, 125, 126, 127, 128, 129, 130, 131,
  132, 133, 134, 208,
];`,
    replace: `const ADVANCED_COM_IDS = [
  67, 69, 70, 111, 120, 121, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132,
  133, 134, 208, // 变异：84 摘除
];`,
    tests: ['com-dispatch'],
    must_mention: '高级 COM = 分发空间 − 可直选空间',
  },
  {
    desc: 'M751 TRAIN_MESSAGE_B 的缺失分支静默（default 占位行删——族票落地前无声无息）',
    file: 'ere/system/train/train-message.js',
    find: `  const branch = await train_message_b_family.call(era_flag.selectcom, {
    whenMissing: BRANCH_MISSING,
    args: [rand_source()],
  });
  if (branch === BRANCH_MISSING) {
    stub_line(
      'TRAIN_MESSAGE_B',
      \`指令 \${era_flag.selectcom} 的情景描写\`,
      '随各自指令票',
    );
  }`,
    replace: `  const branch = await train_message_b_family.call(era_flag.selectcom, {
    whenMissing: BRANCH_MISSING,
  });
  // 变异：缺失分支静默`,
    tests: ['train-message', 'com-dispatch'],
    must_mention: '缺失分支必须落可检索的占位行',
  },
  {
    desc: 'M752 TRAIN_MESSAGE_A 分发的空间外抛错被吞（越界 SELECTCOM 静默回落）',
    file: 'ere/system/train/train-message.js',
    find: `  const branch = await train_message_a_family.call(era_flag.selectcom, {
    whenMissing: BRANCH_MISSING,
    args: [rand_source()],
  });`,
    replace: `  if (!train_message_a_family.declared.has(era_flag.selectcom)) {
    return; // 变异：空间外静默
  }
  const branch = await train_message_a_family.call(era_flag.selectcom, {
    whenMissing: BRANCH_MISSING,
  });`,
    tests: ['com-dispatch'],
    must_mention: '空间外显式抛错',
  },

  // —— #214（J4 指令序列与自定义菜单）：M760-M778 ——
  {
    desc: 'M760 SHOW_COMMENU 的 L_IDX 位次换成 L_I（升格前的号直印——位次映射在渲染处旁路）',
    file: 'ere/page/page-usercom.js',
    find: `    const adv = await get_adv_com(id); // :209 CALL GET_ADV_COM, L_I
    era.printButton(command_button_label(adv, id), com_index(id));`,
    replace: `    const adv = await get_adv_com(id); // :209 CALL GET_ADV_COM, L_I
    era.printButton(command_button_label(adv, id), id); // 变异：印 L_I`,
    tests: ['page-usercom'],
    must_mention: '编号必须是紧凑序号 L_IDX',
  },
  {
    desc: 'M761 GETBIT 分流恒 OFF（自定义菜单臂删除——flag:5 开局态失灵）',
    file: 'ere/page/page-usercom.js',
    find: `  if (show_advanced_names()) {
    await show_commenu();
  } else {
    draw_builtin_comlist(usable);
  }`,
    replace: `  draw_builtin_comlist(usable); // 变异：恒内建臂`,
    tests: ['page-usercom'],
    must_mention: '自定义菜单，标签取 TRAIN_NAME',
  },
  {
    desc: 'M762 GETBIT 分流恒 ON（内建臂删除——OFF 态吃 trainalias 不吃静态名）',
    file: 'ere/page/page-usercom.js',
    find: `  if (show_advanced_names()) {
    await show_commenu();
  } else {
    draw_builtin_comlist(usable);
  }`,
    replace: `  await show_commenu(); // 变异：恒自定义臂`,
    tests: ['page-usercom'],
    must_mention: 'OFF 臂读 traincommandname',
  },
  {
    desc: 'M763 SHOW_COMMENU 的 COM_ABLE 过滤删（不可用指令也渲染）',
    file: 'ere/page/page-usercom.js',
    find: `    const able = await com_able_family.call(id, { whenMissing: 1 });
    if (able === 0) {
      continue; // :202-203 SIF RESULT == 0 CONTINUE
    }`,
    replace: `    // 变异：不过滤`,
    tests: ['page-usercom'],
    must_mention: 'COM_ABLE=0 的指令不得渲染',
  },
  {
    desc: 'M764 子菜单按钮守卫删（交代助手/对换调教恒显示）',
    file: 'ere/page/page-usercom.js',
    find: `  if (guards.can_handover) {
    era.printButton('交代助手', 102); // :21（ASSI > 0 && ASSI:1 > 0）
  }`,
    replace: `  era.printButton('交代助手', 102); // 变异：无守卫`,
    tests: ['page-usercom'],
    must_mention: '默认态 9 个按钮',
  },
  {
    desc: 'M765 FLAG:550 守卫删（991/992 无菜单也显示）',
    file: 'ere/page/page-usercom.js',
    find: `  if (game_train.指令菜单长度 > 0) {
    era.printButton('调教菜单表示', 991); // :88
    era.printButton('调教菜单实行', 992); // :89
  }`,
    replace: `  era.printButton('调教菜单表示', 991); // 变异：无守卫
  era.printButton('调教菜单实行', 992);`,
    tests: ['page-usercom'],
    must_mention: '默认态 9 个按钮',
  },
  {
    desc: 'M766 过滤按钮染色删（SETCOLOR 的开/关色差丢失）',
    file: 'ere/page/page-usercom.js',
    find: `    const on = (game_train.指令过滤 & mask) !== 0;
    const off_color = FILTER_COLORS[acc];
    era.printButton(
      label,
      acc,
      on
        ? { color: FILTER_GRAY }
        : off_color !== undefined
          ? { color: off_color }
          : undefined,
    );`,
    replace: `    era.printButton(label, acc); // 变异：不染色`,
    tests: ['page-usercom'],
    must_mention: '开启位一律灰',
  },
  {
    desc: 'M767 交代助手分支一的视角翻转反了（PLAYER == TARGET:1 判定旁路）',
    file: 'ere/page/page-usercom.js',
    find: `      era_flag.player =
        era_flag.player === target_record ? assi_record : target_record;
      era_flag.assi = era_flag.player;`,
    replace: `      era_flag.player = target_record; // 变异：不判 PLAYER == TARGET:1
      era_flag.assi = era_flag.player;`,
    tests: ['page-usercom'],
    must_mention: '分支一命中 TARGET:1',
  },
  {
    desc: 'M768 对换调教的 SWAP 反转（TARGET 不动只改 PLAYER）',
    file: 'ere/page/page-usercom.js',
    find: `    era_flag.target = era_flag.player;
    era_flag.player = target; // SWAP TARGET, PLAYER`,
    replace: `    era_flag.player = target; // 变异：单边赋值`,
    tests: ['page-usercom'],
    must_mention: 'SWAP：TARGET ← 原 PLAYER',
  },
  {
    desc: 'M769 过滤位翻转的清位掩码换成全清（邻位被波及）',
    file: 'ere/page/page-usercom.js',
    find: `      if ((game_train.指令过滤 & mask) !== 0) {
        game_train.指令过滤 &= 31 ^ mask;
      } else {
        game_train.指令过滤 |= mask;
      }`,
    replace: `      if ((game_train.指令过滤 & mask) !== 0) {
        game_train.指令过滤 = 0; // 变异：全清
      } else {
        game_train.指令过滤 |= mask;
      }`,
    tests: ['page-usercom'],
    must_mention: '只清位 1，位 0/3 保留',
  },
  {
    desc: 'M770 102/112 的 ASSIPLAY 更新删（换视角后助手参与态不刷新）',
    file: 'ere/page/page-usercom.js',
    find: `    // :121 ASSIPLAY = PLAYER != MASTER ? 1 : 0
    era_flag.assiplay = era_flag.player !== MASTER ? 1 : 0;
    return;
  }
  if (result === 112 && guards.can_swap) {`,
    replace: `    return;
  }
  if (result === 112 && guards.can_swap) {`,
    tests: ['page-usercom'],
    must_mention: 'PLAYER != MASTER → ASSIPLAY = 1',
  },
  {
    desc: 'M772 MULTI_COMABLE 的 TRAINNAME 空判据删（高级 COM 可登记）',
    file: 'ere/system/train/com-register.js',
    find: `  if ((era.get(\`traincommandname:\${id}\`) ?? '').length === 0) {
    return 0;
  }`,
    replace: `  // 变异：不查静态名`,
    tests: ['com-register'],
    must_mention: '高级 COM 84',
  },
  {
    desc: 'M773 MULTI_COMABLE 的 TFLAG:224 包裹删（探测时索求抑制旗标不在场）',
    file: 'ere/system/train/com-register.js',
    find: `  game_train.索求口上抑制 = COMSEQ_ACTIVE;
  const able = await com_able_family.call(id, { whenMissing: 1 });
  game_train.索求口上抑制 = 0;
  return able;`,
    replace: `  const able = await com_able_family.call(id, { whenMissing: 1 });
  return able; // 变异：无旗标包裹`,
    tests: ['com-register'],
    must_mention: '探测时旗标必须是 555',
  },
  {
    desc: 'M774 COMSEQ_SHOW 的 ×n 折叠删（连续同指令逐条展开）',
    file: 'ere/system/train/com-register.js',
    find: `    let times = 1;
    while (count < length - 1) {
      const next_id = era.get(\`flag:\${SLOT_BASE + count + 1}\`) || 0;
      if (next_id !== id) {
        break;
      }
      times += 1;
      count += 1;
    }
    if (times > 1) {
      era.print(\`×\${times}\`);
    }`,
    replace: `    const times = 1; // 变异：不折叠`,
    tests: ['com-register'],
    must_mention: '×3',
  },
  {
    desc: 'M775 COMSEQ_SHOW 的（不可用）分支换成照印名字（不可用条目伪装可用）',
    file: 'ere/system/train/com-register.js',
    find: `    if (able) {
      era.print(era.get(\`traincommandname:\${id}\`) ?? '');
    } else {
      era.print('（不可用）');
    }`,
    replace: `    era.print(era.get(\`traincommandname:\${id}\`) ?? ''); // 变异：不分可用性`,
    tests: ['com-register'],
    must_mention: '（不可用）',
  },
  {
    desc: 'M776 COMSEQ_REGISTER 的重复指令周期模板换成常数 0（填充段全复制首条）',
    file: 'ere/system/train/com-register.js',
    find: `        const template = era.get(\`flag:\${SLOT_BASE + (local0 % period)}\`) || 0;`,
    replace: `        const template = era.get(\`flag:\${SLOT_BASE}\`) || 0; // 变异：恒取首槽`,
    tests: ['com-register'],
    must_mention: '0, 6, 0, 6',
  },
  {
    desc: 'M777 COMSEQ_REGISTER 的满 10 条边界放宽（<= 9 改 < 9——第 10 条后仍重画要输入）',
    file: 'ere/system/train/com-register.js',
    find: `    local0 += 1;
    if (local0 <= 9) {
      continue; // GOTO REDRAW_LOOP
    }
    break; // COMPLETE`,
    replace: `    local0 += 1;
    if (local0 < 9) {
      continue; // 变异：边界错位
    }
    break; // COMPLETE`,
    tests: ['com-register'],
    must_mention: '<= 9 边界',
  },
  {
    desc: 'M778 重置菜单只清长度不清槽位（551-560 残留旧值）',
    file: 'ere/system/train/com-register.js',
    find: `      for (let slot = 550; slot <= 560; slot += 1) {
        era.set(\`flag:\${slot}\`, 0);
      }`,
    replace: `      era.set('flag:550', 0); // 变异：只清长度`,
    tests: ['com-register'],
    must_mention: '未清',
  },
  {
    desc: 'M779 COMSEQ_TRAIN 的预检查删（不可用条目照样执行）',
    file: 'ere/system/train/com-register.js',
    find: `    const able =
      DECLARED_TRAIN_IDS.includes(id) &&
      (await com_able_family.call(id, { whenMissing: 1 })) !== 0;
    if (!able) {
      blocked = true; // LOCAL:1 = 1
      break;
    }`,
    replace: `    // 变异：不预检查`,
    tests: ['com-register'],
    must_mention: '任何一条不可用即整段拒绝',
  },
  {
    desc: 'M780 COMSEQ_TRAIN 的 PREVCOM 保存/恢复删（调用方语境被序列污染）',
    file: 'ere/system/train/com-register.js',
    find: `  era_flag.prevcom = prevcom_saved; // :236 PREVCOM 恢复
  return pending;`,
    replace: `  return pending; // 变异：不恢复`,
    tests: ['com-register'],
    must_mention: '序列后 PREVCOM 恢复原值',
  },
  {
    desc: 'M781 run_calltrain 尾部的 CALLTRAINEND 删（实行旗标不复位）',
    file: 'ere/system/train/com-register.js',
    find: `  calltrainend();
  return undefined;`,
    replace: `  return undefined; // 变异：不回调 CALLTRAINEND`,
    tests: ['com-register'],
    must_mention: 'CALLTRAINEND 复位',
  },
  {
    desc: 'M782 COMSEQ_TRAIN 的预检查 PREVCOM 推进删（探测时看到进函数原值）',
    file: 'ere/system/train/com-register.js',
    find: `    sequence.push(id);
    era_flag.prevcom = id; // :227`,
    replace: `    sequence.push(id); // 变异：不推进`,
    tests: ['com-register'],
    must_mention: '探测第 k 条时它是第 k-1 条',
  },
  {
    desc: 'M783 COM_ORDER 的百合条件反（双方皆女被当百合外）',
    file: 'ere/system/train/com-order.js',
    find: `  if (p_talent(122) === 0 && talent(122) === 0) {`,
    replace: `  if (p_talent(122) !== 0 || talent(122) !== 0) { // 变异：条件反`,
    tests: ['com-order'],
    must_mention: '百合气质LV2(6)',
  },
  {
    desc: 'M784 COM_ORDER 的刻印 T 系数恒 2（高姿态/低姿态的调节丢失）',
    file: 'ere/system/train/com-order.js',
    find: `  const t = talent(15) ? 4 : talent(17) ? 1 : 2;`,
    replace: `  const t = 2; // 变异：系数恒 2`,
    tests: ['com-order'],
    must_mention: 'T 系数 = 4',
  },
  {
    desc: 'M785 COM_ORDER 的相性正值前置判据删（值 0 的未登场关系被当最差档）',
    file: 'ere/system/train/com-order.js',
    find: `  if (relation > 0 && relation < 30) {`,
    replace: `  if (relation < 30) { // 变异：正值前置删除`,
    tests: ['com-order'],
    must_mention: '相性最差',
  },
  {
    desc: 'M786 COM_ORDER 的 a 初值透传删（调用方累计被重置）',
    file: 'ere/system/train/com-order.js',
    find: `async function com_order(a = 0, s = 0) {`,
    replace: `async function com_order(_a = 0, s = 0) {
  let a = 0; // 变异：不透传（合法形状，a 恒从 0 起）`,
    tests: ['com-order'],
    must_mention: 'a 初值透传累加',
  },
  {
    desc: 'M790 WEARING_CLOTH_ALL 裤装分支：101-200 段的位 16 改位 8（裙位）',
    file: 'ere/system/train/cloth.js',
    find: `    } else if (type >= 101 && type <= 200) {
      // ズボンタイプのツーピース
      bits |= 4;
      bits |= 16;
    }`,
    replace: `    } else if (type >= 101 && type <= 200) {
      // ズボンタイプのツーピース
      bits |= 4;
      bits |= 8;
    }`,
    tests: ['cloth-func'],
    must_mention: '裤装两截（41=106 军服',
  },
  {
    desc: 'M791 WEARING_CLOTH_ALL 胸罩装着删（bits |= 2 失效）',
    file: 'ere/system/train/cloth.js',
    find: `      bits |= 2;
    }
    const type = main_type(cid);`,
    replace: `    }
    const type = main_type(cid);`,
    tests: ['cloth-func'],
    must_mention: '裙装两截（41=5 紧身衣＆裙甲）',
  },
  {
    desc: 'M792 WEARING_CLOTH_ALL 和服/兔女郎免胸罩删（202/254 判恒假）',
    file: 'ere/system/train/cloth.js',
    find: 'if (bits & 2 && (type === 202 || type === 254)) {',
    replace: 'if (false) {',
    tests: ['cloth-func'],
    must_mention: '254 兔女郎装',
  },
  {
    desc: 'M793 WEARING_CLOTH_ALL 尿布免内裤删（42=69 判恒假）',
    file: 'ere/system/train/cloth.js',
    find: `    // :190-191 オムツ着用時（CFLAG:42 == 69）のノーパン処理
    if (bits & 1 && special_type(cid) === 69) {
      bits -= 1;
    }`,
    replace: `    // :190-191 オムツ着用時（CFLAG:42 == 69）のノーパン処理（变异：删）`,
    tests: ['cloth-func'],
    must_mention: '尿布（42=69）→ 免内裤',
  },
  {
    desc: 'M794 WEARING_CLOTH_ABLE 下装双剥改单剥（46 的位 16 剥除删）',
    file: 'ere/system/train/cloth.js',
    find: `  if ((era.get(\`cflag:\${cid}:46\`) || 0) !== 0) {
    bits -= bits & 16;
  }`,
    replace: `  if ((era.get(\`cflag:\${cid}:46\`) || 0) !== 0) {
    // 变异：位 16 不剥
  }`,
    tests: ['cloth-func'],
    must_mention: '各部位洗濯/没收状态剥对应装位',
  },
  {
    desc: 'M795 AFTERTRAIN_CLOTH 特别服装丢弃不清类型（42 = 0 改 1）',
    file: 'ere/system/train/cloth.js',
    find: 'chara(cid).chara.特别服装类型 = 0; // :250 CFLAG:42 = 0',
    replace: 'chara(cid).chara.特别服装类型 = 1; // :250 CFLAG:42 = 0（变异）',
    tests: ['cloth-func'],
    must_mention: '特别服装类型清零',
  },
  {
    desc: 'M796 AFTERTRAIN_CLOTH 尿布换新不扣费（MONEY -= 50 删）',
    file: 'ere/system/train/cloth.js',
    find: 'era_flag.money -= 50; // :264 MONEY',
    replace: '// 变异：不扣费',
    tests: ['cloth-func'],
    must_mention: 'MONEY -= 50（:264）',
  },
  {
    desc: 'M797 AFTERTRAIN_CLOTH 下装废弃状态错（46 = -2 改 -1）',
    file: 'ere/system/train/cloth.js',
    find: 'era.set(`cflag:${cid}:46`, -2); // :315 ツーピースは下のみ廃棄',
    replace: 'era.set(`cflag:${cid}:46`, -1); // :315（变异）',
    tests: ['cloth-func'],
    must_mention: '两截型下装废弃（:315）',
  },
  {
    desc: 'M798 AFTERTRAIN_CLOTH 内裤洗涤天数错（43 = 2 改 3）',
    file: 'ere/system/train/cloth.js',
    find: 'era.set(`cflag:${cid}:43`, 2); // :361',
    replace: 'era.set(`cflag:${cid}:43`, 3); // :361（变异）',
    tests: ['cloth-func'],
    must_mention: '洗濯 2 日（:361）',
  },
  {
    desc: 'M799 AFTERTRAIN_CLOTH 上下俱废的类型消除删（45<0&&46<0 判恒假）',
    file: 'ere/system/train/cloth.js',
    find: `    if (
      (era.get(\`cflag:\${cid}:45\`) || 0) < 0 &&
      (era.get(\`cflag:\${cid}:46\`) || 0) < 0
    ) {
      era.set(\`cflag:\${cid}:41\`, 0);
    }`,
    replace: `    if (false) {
      era.set(\`cflag:\${cid}:41\`, 0);
    }`,
    tests: ['cloth-func'],
    must_mention: '上下俱废 → 类型 0',
  },
  {
    desc: 'M800 RE_CLOTHED 守卫翻转（< 3 改 >= 3：露出癖高的反而穿回）',
    file: 'ere/system/train/cloth.js',
    find: 'if (obedience + exposure < 3) {',
    replace: 'if (obedience + exposure >= 3) {',
    tests: ['cloth-func'],
    must_mention: '≥3 维持脱衣（:396）',
  },
  {
    desc: 'M801 SOILING_CLOTH_NO1 内裤置位删（bit 1 不置）',
    file: 'ere/system/train/cloth.js',
    find: `  if (worn(cid) & 1) {
    era.print(\`《\${chara_callname(cid)}的内衣沾满了尿》\`); // :484
    mask = or_tflag45(mask, 1, in_train);
  }
  return mask;
}

/**
 * @SOILING_CLOTH_NO2`,
    replace: `  if (worn(cid) & 1) {
    era.print(\`《\${chara_callname(cid)}的内衣沾满了尿》\`); // :484
  }
  return mask;
}

/**
 * @SOILING_CLOTH_NO2`,
    tests: ['cloth-func'],
    must_mention: '特别服装（16）+ 下装（4）+ 内裤（1）',
  },
  {
    desc: 'M802 SOILING_CLOTH_NO2 特别服装废弃位删（bit 32 不置）',
    file: 'ere/system/train/cloth.js',
    find: 'mask = or_tflag45(mask, 32, in_train);',
    replace: '// 变异：废弃位不置',
    tests: ['cloth-func'],
    must_mention: '大小便全置（:501-522）',
  },
  {
    desc: 'M803 SOILING_CLOTH_NO1 尿布早退删（69 的 RETURN 拿掉）',
    file: 'ere/system/train/cloth.js',
    find: `    mask = or_tflag45(mask, 16, in_train);
    // :469-470 オムツ着用中なら他の衣類は無事
    if (special_type(cid) === 69) {
      return mask;
    }
  }
  // :472-482 下装`,
    replace: `    mask = or_tflag45(mask, 16, in_train);
    // :469-470 オムツ着用中なら他の衣類は無事（变异：不早退）
  }
  // :472-482 下装`,
    tests: ['cloth-func'],
    must_mention: '只有尿布自身',
  },
  {
    desc: 'M804 TRAIN_MESSAGE_B 服装前缀的基本服装支删（位 28 判恒假）',
    file: 'ere/system/train/com-caress.js',
    find: '  } else if ((cloth_bits & 28) !== 0) {',
    replace: '  } else if (false) {',
    tests: ['cloth-func', 'compare-train'],
    must_mention: '基本服装前缀（:33-35',
  },
  {
    desc: 'M805 TRAIN_MESSAGE_B 触手支删（触手玩弄着 → 仔细爱抚着）',
    file: 'ere/system/train/com-caress.js',
    find: "    line += '触手玩弄着';",
    replace: "    line += ''; // :42-43（变异）",
    tests: ['cloth-func'],
    must_mention: '触手支（:42-43）',
  },
  {
    desc: 'M806 TRAIN_MESSAGE_B 兽奸支删（狗的舌头舔舐着 → 空）',
    file: 'ere/system/train/com-caress.js',
    find: "    line += '狗的舌头舔舐着';",
    replace: "    line += ''; // :62-63（变异）",
    tests: ['cloth-func'],
    must_mention: '兽奸支（:62-63）',
  },
  {
    desc: 'M807 TRAIN_MESSAGE_B 魔兽支的种族分支改走 ELSE（E:307 判恒假）',
    file: 'ere/system/train/com-caress.js',
    find: '  } else if (teq(88)) {\n    const species = e_get(307);\n    const action =',
    replace:
      '  } else if (teq(88)) {\n    const species = -1; // 变异：种族判空\n    const action =',
    tests: ['cloth-func'],
    must_mention: '魔兽种族支（E:307 == 10',
  },
  {
    desc: 'M808 GET_CLOTHTYPE_MAIN2 未知编号的兜底串错（「服」改空串）',
    file: 'ere/system/cloth-lookup.js',
    find: "const name = MAIN2_TABLE[cloth_main_type(cid)] ?? '服';",
    replace: "const name = MAIN2_TABLE[cloth_main_type(cid)] ?? '';",
    tests: ['cloth-func'],
    must_mention: 'GET 版无胸甲＆透视裙子（:884-885 CASEELSE）',
  },
  {
    desc: 'M809 GET_CLOTHTYPE_SPECIAL 的 98 号退回繁体残留（#60 简体锁的靶点）',
    file: 'ere/system/cloth-lookup.js',
    find: "  98: '神秘的尿道导管',",
    replace: "  98: '神秘的導尿管',",
    tests: ['cloth-func'],
    must_mention: 'ere 统一简体（#14）',
  },
  {
    desc: 'M830 BENKI 魔王除外守卫删（ARG:0 == 0 不再提前返回）',
    file: 'ere/system/train/benki.js',
    find: `  if (arg === 0) {
    return 0; // 魔王様は除外
  }`,
    replace: `  if (false) {
    return 0; // 变异：魔王除外守卫失效
  }`,
    tests: ['benki'],
    must_mention: '魔王（角色 0）恒被除外',
  },
  {
    desc: 'M831 BENKI 肉便器素质门槛删（TALENT:204 == 0 也结算）',
    file: 'ere/system/train/benki.js',
    find: `  if (t(arg, 204) === 0) {
    return 0; // 肉便器以外は除外（TALENT:204 肉便器）
  }`,
    replace: `  if (false) {
    return 0; // 变异：肉便器素质门槛失效
  }`,
    tests: ['benki'],
    must_mention: '非肉便器角色（TALENT:204 == 0）直接返回',
  },
  {
    desc: 'M832 BENKI 体力门槛删（BASE:0 < 300 也结算）',
    file: 'ere/system/train/benki.js',
    find: `  if ((era.get(\`base:\${arg}:0\`) || 0) < 300) {
    return 0; // BASE:0 < 300
  }`,
    replace: `  if (false) {
    return 0; // 变异：体力门槛失效
  }`,
    tests: ['benki'],
    must_mention: '体力 < 300 或气力 < 100 直接返回',
  },
  {
    desc: 'M833 BENKI 占用状态门槛删（CFLAG:1 != 0 也结算）',
    file: 'ere/system/train/benki.js',
    find: `  if ((era.get(\`cflag:\${arg}:1\`) || 0) !== 0) {
    return 0; // CFLAG:1 != 0（占用状态：待机 0/1 之外不结算）
  }`,
    replace: `  if (false) {
    return 0; // 变异：占用状态门槛失效
  }`,
    tests: ['benki'],
    must_mention: '占用中（CFLAG:1 != 0）或育儿中不结算',
  },
  {
    desc: 'M834 BENKI 配信分派的行动号写坏（兽奸配信 7 改 8）',
    file: 'ere/system/train/benki.js',
    find: `      era.set('flag:62', 7); // 兽奸配信`,
    replace: `      era.set('flag:62', 8); // 变异：兽奸配信行动号改坏`,
    tests: ['benki'],
    must_mention: '兽奸配信说明',
  },
  {
    desc: 'M835 BENKI 奉仕分派的对方写坏（FLAG:64 最下層民 0 改 3）',
    file: 'ere/system/train/benki.js',
    find: `    era.set('flag:62', 0); //
    era.set('flag:64', 0); //

    let s = pregnant_head(); //`,
    replace: `    era.set('flag:62', 0); //
    era.set('flag:64', 3); // 变异：相手写坏

    let s = pregnant_head(); //`,
    tests: ['benki'],
    must_mention: '最下層民奉仕',
  },
  {
    desc: 'M836 BENKI 一般分派的行动号写坏（フェラ便器 6 改 5）',
    file: 'ere/system/train/benki.js',
    find: `    era.set('flag:62', 6); // その他。フェラ便器
  }

  // —— :393-400 未定の相手を確定 ——`,
    replace: `    era.set('flag:62', 5); // 变异：フェラ便器行动号改坏
  }

  // —— :393-400 未定の相手を確定 ——`,
    tests: ['benki'],
    must_mention: 'フェラ便器说明',
  },
  {
    desc: 'M837 BENKI 同性爱分派的对方写坏（淫魔 9 改 7）',
    file: 'ere/system/train/benki.js',
    find: `    era.set('flag:62', 1); //
    if (t(arg, 142)) {
      era.set('flag:64', 7); // 萝莉控 → 幼い奴隷少女
    } else {
      era.set('flag:64', 9); // 淫魔
    }`,
    replace: `    era.set('flag:62', 1); //
    if (t(arg, 142)) {
      era.set('flag:64', 7); // 萝莉控 → 幼い奴隷少女
    } else {
      era.set('flag:64', 7); // 变异：淫魔写坏
    }`,
    tests: ['benki'],
    must_mention: '淫魔相拥',
  },
  {
    desc: 'M838 BENKI 珠结算的欲情加算删（JUEL:5 不写）',
    file: 'ere/system/train/benki.js',
    find:
      `  era.set(` +
      '`juel:${cid}:0`' +
      `, (era.get(` +
      '`juel:${cid}:0`' +
      `) || 0) + play * 10); //
  era.set(` +
      '`juel:${cid}:5`' +
      `, (era.get(` +
      '`juel:${cid}:5`' +
      `) || 0) + play * 10); //`,
    replace:
      `  era.set(` +
      '`juel:${cid}:0`' +
      `, (era.get(` +
      '`juel:${cid}:0`' +
      `) || 0) + play * 10); //
  // 变异：欲情珠加算删`,
    tests: ['benki'],
    must_mention: '欲情珠加算',
  },
  {
    desc: 'M839 SELECT_BENKI_MENU 的手淫分支概率改坏（技巧分支不命中）',
    file: 'ere/system/train/benki.js',
    find: `    if (abl(arg, 12) >= 2 && rand_n(dice) === 0) {
      answer = 30;`,
    replace: `    if (abl(arg, 12) >= 2 && false) {
      answer = 30; // 变异：手淫分支不命中`,
    tests: ['benki'],
    must_mention: '技巧 2 以上且 RAND 命中 → 手淫（30）',
  },
  {
    desc: 'M840 SELECT_BENKI_MENU 的 V_ABLE 接线删（处女也升正常位）',
    file: 'ere/system/train/benki.js',
    find: `    if (abl(arg, 2) >= 2 && v_able(arg) === 1 && rand_n(dice) === 0) {
      answer = 20;`,
    replace: `    if (abl(arg, 2) >= 2 && rand_n(dice) === 0) {
      answer = 20; // 变异：V_ABLE 接线删`,
    tests: ['benki'],
    must_mention: '处女拦截正常位',
  },
  {
    desc: 'M841 NAME_BENKI_MENU 名字表改坏（正常位 20 改名）',
    file: 'ere/system/train/benki.js',
    find: `  20: '正常位',`,
    replace: `  20: '正常位（变异）',`,
    tests: ['benki'],
    must_mention: '指令号 → 名字表',
  },
  {
    desc: 'M842 GET_EXP_BENKI_MENU 的 281 门槛删（常识改变【战斗】= 0 也结算）',
    file: 'ere/system/train/benki.js',
    find: `  if (t(arg0, 281) === 0) {
    return 0; //
  }`,
    replace: `  if (false) {
    return 0; // 变异：281 门槛失效
  }`,
    tests: ['benki'],
    must_mention: '非肉便器或非常识改变【战斗】直接返回',
  },
  {
    desc: 'M843 GET_EXP_BENKI_MENU 的正常位私处经验删（EXP:0 不写）',
    file: 'ere/system/train/benki.js',
    find: `      get_palam[7] += Math.floor(play / 3); // 正常位/後背位/対面座位/背面座位
      get_palam[1] += play;
      era.print(\`私处经验+\${Math.floor(play / 10)}\`);
      await era.waitAnyKey(); // PRINTFORMW
      chara(arg0).dungeon.私处经验 += Math.floor(play / 10);
      break;`,
    replace: `      get_palam[7] += Math.floor(play / 3); // 正常位/後背位/対面座位/背面座位
      get_palam[1] += play;
      era.print(\`私处经验+\${Math.floor(play / 10)}\`);
      await era.waitAnyKey(); // PRINTFORMW
      // 变异：私处经验写删
      break;`,
    tests: ['benki'],
    must_mention: '私处经验写',
  },
  {
    desc: 'M844 GET_EXP_BENKI_MENU 的 JUEL 加算删（juel 不写）',
    file: 'ere/system/train/benki.js',
    find:
      `    era.set(
      ` +
      '`juel:${arg0}:${i}`' +
      `,
      (era.get(` +
      '`juel:${arg0}:${i}`' +
      `) || 0) + get_palam[i],
    );`,
    replace: `    // 变异：JUEL 加算删`,
    tests: ['benki'],
    must_mention: '私处点数珠',
  },
  {
    desc: 'M845 BENKI 的 FLAG:63 门面写删（game.dungeon.肉便器常识改写不写）',
    file: 'ere/system/train/benki.js',
    find: `  game.dungeon.肉便器常识改写 = 0; // FLAG:63 = 0
  if (t(arg, 283) > 0) {
    game.dungeon.肉便器常识改写 = 1; // 常識改変【日常】
  }`,
    replace: `  // 变异：FLAG:63 常識改変写删（两处门面写都不落）`,
    tests: ['benki'],
    must_mention: '经 game.dungeon 门面',
  },
  {
    desc: 'M846 BENKI_PLAYER_NAME 的对象表改坏（大型犬 2 改名）',
    file: 'ere/system/train/benki.js',
    find: `    2: '大型犬',`,
    replace: `    2: '大型犬（变异）',`,
    tests: ['benki'],
    must_mention: 'BENKI_PLAYER_NAME：读 FLAG:64 返回对象名',
  },

  // —— #216 J6 跨族共用子程序与失神、受精（锚定 find 串经脚本核唯一）——
  {
    desc: 'M870 CONDOM_SETTINGS 显示出当前设定标签（反向变异：LOCALS 缺陷 1:1 空值形态的钉子——谁把 %LOCALS:(CFLAG:61)% 修成有值，此处红，SOP §5 判据 7）',
    file: 'ere/system/train/com-condom.js',
    find: `  era.print('现在：');`,
    replace: `  era.print(\`现在：\${['每次都问', '有套就用', '每次都直接来，来个痛快'][era.get(\`cflag:\${cid}:61\`) || 0] ?? ''}\`); // 变异：修好缺陷`,
    tests: ['com-condom'],
    must_mention: '当前设定行',
  },
  {
    desc: 'M871 CONFIRM_CONDOM 已戴守卫删（重复消耗安全套）',
    file: 'ere/system/train/com-condom.js',
    find: `    const wearing_master = chara(cid).event.主人避孕套;
    const wearing_assi = era.get(\`tequip:\${cid}:36\`) || 0;
    if (
      (!era_flag.assiplay && wearing_master) ||
      (era_flag.assiplay && wearing_assi)
    ) {
      return 1;
    }`,
    replace: `    // 变异：已戴守卫删`,
    tests: ['com-condom'],
    must_mention: '不重复消耗',
  },
  {
    desc: 'M872 CONFIRM_CONDOM 每次问的 [0] 不消耗 ITEM:24',
    file: 'ere/system/train/com-condom.js',
    find: `      if (result === 0) {
        game.train.安全套 -= 1; // :76`,
    replace: `      if (result === 0) {
        // 变异：不消耗`,
    tests: ['com-condom'],
    must_mention: '消耗一枚',
  },
  {
    desc: 'M873 tequip:35 写错位（35 → 36，event 门面位错）',
    file: 'ere/system/train/com-condom.js',
    find: `          era.print(\`\${player_name}戴着套。\`); // :78
          chara(cid).event.主人避孕套 = 1; // :79（属主 event，走门面）`,
    replace: `          era.print(\`\${player_name}戴着套。\`); // :78
          era.set(\`tequip:\${cid}:36\`, 1); // 变异：位错`,
    tests: ['com-condom'],
    must_mention: '消耗一枚、主人位 35',
  },
  {
    desc: 'M874 CONFIRM_CONDOM 的 RESTART 删（改设定后直接放行，不走自动用段）',
    file: 'ere/system/train/com-condom.js',
    find: `      if (result === 3) {
        era.print('今后有套就用。'); // :91
        era.set(\`cflag:\${cid}:61\`, 1); // :92
        continue; // :93 RESTART
      }`,
    replace: `      if (result === 3) {
        era.print('今后有套就用。'); // :91
        era.set(\`cflag:\${cid}:61\`, 1); // :92
        return 1; // 变异：RESTART 删
      }`,
    tests: ['com-condom'],
    must_mention: 'RESTART 后走自动用',
  },
  {
    desc: 'M875 笨魔王条款翻转（无套时技巧 < 5 也问）',
    file: 'ere/system/train/com-condom.js',
    find: `      if (Math.floor(era.get(\`abl:\${MASTER}:12\`) || 0) > 4) {`,
    replace: `      if (Math.floor(era.get(\`abl:\${MASTER}:12\`) || 0) < 5) {`,
    tests: ['com-condom'],
    must_mention: '直接插入（笨魔王条款',
  },
  {
    desc: 'M876 CONFIRM_CONDOM2 的主人设定写到 TARGET 行',
    file: 'ere/system/train/com-condom.js',
    find: `      } else if (result === 1) {
        era.set(\`cflag:\${MASTER}:61\`, 2); // :176`,
    replace: `      } else if (result === 1) {
        era.set(\`cflag:\${cid}:61\`, 2); // 变异：行错`,
    tests: ['com-condom'],
    must_mention: 'MASTER 的 CFLAG:61 = 2',
  },
  {
    desc: 'M877 COM20 的基础值表 SP 化（1500/1600/1800/2500/3200/4000）',
    file: 'ere/system/train/com-vaginasex.js',
    find: `  if (com === 20 || com === 21 || com === 90) {
    // :57-99 正常位、背后位、乳内
    skill_base(SKILL_BASE_HI);`,
    replace: `  if (com === 20 || com === 21 || com === 90) {
    // :57-99 正常位、背后位、乳内
    skill_base(SKILL_BASE_SP);`,
    tests: ['com-vaginasex'],
    must_mention: 'B = 1500',
  },
  {
    desc: 'M878 V 版润滑首档 0.6 改 0.4（A 版表错入）',
    file: 'ere/system/train/com-vaginasex.js',
    find: `  if (lube < PALAMLV[1]) {
    return 0.6;
  }`,
    replace: `  if (lube < PALAMLV[1]) {
    return 0.4;
  }`,
    tests: ['com-vaginasex'],
    must_mention: '× 0.6（润滑',
  },
  {
    desc: 'M879 EXP:0 阈值首档删（< EXPLV:1 不再 ×1.5）',
    file: 'ere/system/train/com-vaginasex.js',
    find: `  for (let i = 1; i < EXPLV.length; i += 1) {
    if (value < EXPLV[i]) {
      return rates[i - 1];
    }
  }
  return rates[rates.length - 1];
}`,
    replace: `  for (let i = 2; i < EXPLV.length; i += 1) {
    if (value < EXPLV[i]) {
      return rates[i - 1];
    }
  }
  return rates[rates.length - 1];
}`,
    tests: ['com-vaginasex'],
    must_mention: '数值例：COM20 全 ABL 0',
  },
  {
    desc: 'M880 V 版安全套减率 0.6 改 0.5（A 版值错入）',
    file: 'ere/system/train/com-vaginasex.js',
    find: `  if (chara(cid).event.主人避孕套 || (era_flag.assiplay && tequip(cid, 36))) {
    b = times(b, 0.6);
  }`,
    replace: `  if (chara(cid).event.主人避孕套 || (era_flag.assiplay && tequip(cid, 36))) {
    b = times(b, 0.5);
  }`,
    tests: ['com-vaginasex'],
    must_mention: '数值例：COM20 全 ABL 0',
  },
  {
    desc: 'M881 射精判定的双倍档删（E == 2 并入 1）',
    file: 'ere/system/train/com-vaginasex.js',
    find: `  const e = s > ejac * 2 ? 2 : s > ejac ? 1 : 0;

  const print_ejac = (heavy) => {`,
    replace: `  const e = s > ejac ? 1 : 0;

  const print_ejac = (heavy) => {`,
    tests: ['com-vaginasex'],
    must_mention: '大量射精',
  },
  {
    desc: 'M882 膣内射精旗的置位条件反转（无套才漏标）',
    file: 'ere/system/train/com-vaginasex.js',
    find: `    if (!era_flag.assiplay && chara(cid).event.主人避孕套 === 0) {
      era.set('tflag:38', 2); // :734-735 膣内射精（主人・无套）`,
    replace: `    if (!era_flag.assiplay && chara(cid).event.主人避孕套 !== 0) {
      era.set('tflag:38', 2); // 变异：条件反转`,
    tests: ['com-vaginasex'],
    must_mention: '膣内射精旗',
  },
  {
    desc: 'M883 膣内受精判定的 rand 命中改恒不写',
    file: 'ere/system/train/com-vaginasex.js',
    find: `      if (era.get(\`cflag:\${cid}:109\`)) {
        if (rand_n(heavy ? 2 : 3) === 0) {
          era.set(\`cflag:\${cid}:113\`, -1);
        }
      } else if (rand_n(heavy ? 3 : 5) === 0) {
        era.set(\`cflag:\${cid}:113\`, -1);
      }`,
    replace: `      // 变异：受精判定恒不写`,
    tests: ['com-vaginasex'],
    must_mention: 'CFLAG:113 = -1',
  },
  {
    desc: 'M884 MILK 的 E 判据改 S（上游 B 判据怪相的行为锁）',
    file: 'ere/system/train/com-vaginasex.js',
    find: `  const e = s > ejac * 2 ? 2 : b > ejac ? 1 : 0;`,
    replace: `  const e = s > ejac * 2 ? 2 : s > ejac ? 1 : 0;`,
    tests: ['com-vaginasex'],
    must_mention: 'B 判据行为锁',
  },
  {
    desc: 'M885 童贞丧失的初体验记录删（CFLAG:PLAYER:15 / CSTR:3）',
    file: 'ere/system/train/com-vaginasex.js',
    find: `  if (tal(player, 1)) {
    era.set(\`talent:\${player}:1\`, 0); // :1007（属主 train）`,
    replace: `  if (tal(player, 1) && false) {
    era.set(\`talent:\${player}:1\`, 0); // 变异：童贞丧失段死`,
    tests: ['com-vaginasex'],
    must_mention: '童贞丧失',
  },
  {
    desc: 'M886 EXTRA 的日文残留退回（性交经验＋１ → 性交経験＋１，#60 简体锁）',
    file: 'ere/system/train/com-vaginasex.js',
    find: `  era.print('性交经验＋１'); // :1074（原文 経験，#60 归一）`,
    replace: `  era.print('性交経験＋１'); // 变异：退回日文`,
    tests: ['com-vaginasex'],
    must_mention: '归一简体',
  },
  {
    desc: 'M887 COM27（後背位）错加顺从乘率（原文此位无）',
    file: 'ere/system/train/com-analsex.js',
    find: `  } else if (com === 27) {
    // :85-110 後背位肛交（技巧のみ——顺从表不在原作此位）
    skill_base([2700, 2800, 2900, 3100, 3200, 3300]);`,
    replace: `  } else if (com === 27) {
    // :85-110 後背位肛交
    skill_base([2700, 2800, 2900, 3100, 3200, 3300]);
    b = times(b, abl_rate(cid, 10, OBED_STRONG));`,
    tests: ['com-analsex'],
    must_mention: 'COM27',
  },
  {
    desc: 'M888 A 版润滑表 V 版化（0.4 起步改 0.6）',
    file: 'ere/system/train/com-analsex.js',
    find: `    if (lube < PALAMLV[1]) {
      b = times(b, 0.4);
    } else if (lube < PALAMLV[2]) {`,
    replace: `    if (lube < PALAMLV[1]) {
      b = times(b, 0.6);
    } else if (lube < PALAMLV[2]) {`,
    tests: ['com-analsex'],
    must_mention: 'A 版润滑',
  },
  {
    desc: 'M889 肛内异常妊娠的 TALENT:340 判据删（恒置 3）',
    file: 'ere/system/train/com-analsex.js',
    find: `  const anal_pregnancy = (heavy) => {
    if (era.get(\`cflag:\${cid}:109\`)) {
      if (rand_n(heavy ? 3 : 5) === 0 && tal(cid, 340)) {
        era.set(\`cflag:\${cid}:113\`, 3);
      }
    } else if (rand_n(heavy ? 5 : 10) === 0 && tal(cid, 340)) {
      era.set(\`cflag:\${cid}:113\`, 3);
    }
  };`,
    replace: `  const anal_pregnancy = (heavy) => {
    if (rand_n(heavy ? 3 : 5) === 0) {
      era.set(\`cflag:\${cid}:113\`, 3);
    }
  };`,
    tests: ['com-analsex'],
    must_mention: '无 TALENT:340 时 rand 命中也不写',
  },
  {
    desc: 'M890 妊娠相手门面寻址错（102 → 103）',
    file: 'ere/system/train/com-analsex.js',
    find: `      chara(cid).event.妊娠相手 = 1; // :388 主人`,
    replace: `      era.set(\`cflag:\${cid}:103\`, 1); // 变异：寻址错`,
    tests: ['com-analsex'],
    must_mention: '妊娠相手判定',
  },
  {
    desc: 'M891 爱情经验 26 档删（恒走其他 2）',
    file: 'ere/system/train/com-analsex.js',
    find: `  let e;
  if (era_flag.selectcom === 26) {
    e = 3; // :416
  } else {
    e = 2; // :420-421 その他（含 28）
  }`,
    replace: `  let e = 2; // 变异：26 档删`,
    tests: ['com-analsex'],
    must_mention: 'COM26 → 3',
  },
  {
    desc: 'M892 A 版润滑顶档 1.6 改 1.4（V 版值错入）',
    file: 'ere/system/train/com-analsex.js',
    find: `    } else {
      b = times(b, 1.6);
    }`,
    replace: `    } else {
      b = times(b, 1.4);
    }`,
    tests: ['com-analsex'],
    must_mention: 'COM28（対面座位）顺从强侧表',
  },
  {
    desc: 'M893 强绝顶首回的 rand<8 闸删（恒记相位）',
    file: 'ere/system/train/passout.js',
    find: `  if (z >= 16 && tflag(897) === 0 && tflag(899) < 1 && rand_n(10) < 8) {
    set_tflag(897, 1);`,
    replace: `  if (z >= 16 && tflag(897) === 0 && tflag(899) < 1) {
    set_tflag(897, 1);`,
    tests: ['passout'],
    must_mention: 'rand ≥ 8 时首回不记相位',
  },
  {
    desc: 'M894 失神支的 rand<6 闸改恒失神',
    file: 'ere/system/train/passout.js',
    find: `  } else if (z >= 16 && tflag(897) === 1 && tflag(899) < 1 && rand_n(10) < 6) {`,
    replace: `  } else if (
    z >= 16 &&
    tflag(897) === 1 &&
    tflag(899) < 1
  ) {`,
    tests: ['passout'],
    must_mention: '次回 rand ≥ 6 不失神',
  },
  {
    desc: 'M895 苦痛线阈值 7500 改 500',
    file: 'ere/system/train/passout.js',
    find: `  if (
    (up(cid, 9) >= 7500 || up(cid, 9) + a >= 15000) &&
    tflag(899) < 1 &&
    rand_n(10) < 5
  ) {`,
    replace: `  if ((up(cid, 9) >= 500 || up(cid, 9) + a >= 15000) && tflag(899) < 1 && rand_n(10) < 5) {`,
    tests: ['passout'],
    must_mention: 'UP:9 < 7500',
  },
  {
    desc: 'M896 TFLAG:899 计数块删（互斥守卫的写路径断）',
    file: 'ere/system/train/passout.js',
    find: `  if (tflag(896) >= 2 || tflag(897) >= 2 || tflag(898) >= 2) {
    if (tflag(899) === 0) {
      set_tflag(899, 1);
    } else if (tflag(899) >= 1) {
      add_tflag(899, 1);
    }
  }`,
    replace: `  // 变异：899 计数删`,
    tests: ['passout'],
    must_mention: 'TFLAG:899',
  },
  {
    desc: 'M897 恢复判定的执行回数条件删（899 >= 4）',
    file: 'ere/system/train/passout.js',
    find: `    if (z >= 16 || (tflag(899) >= 2 && up(cid, 9) >= 5000) || tflag(899) >= 4) {`,
    replace: `    if (z >= 16 || (tflag(899) >= 2 && up(cid, 9) >= 5000)) {`,
    tests: ['passout'],
    must_mention: '执行 4 回',
  },
  {
    desc: 'M898 快照的绳值带入改恒 1（864 = tequip:44 值）',
    file: 'ere/system/train/passout.js',
    find: `    if (tequip(cid, 44)) {
      set_tflag(864, tequip(cid, 44)); // 绳（值 = 绳种）`,
    replace: `    if (tequip(cid, 44)) {
      set_tflag(864, 1); // 变异：值不带入`,
    tests: ['passout'],
    must_mention: '快照（899 == 1）',
  },
  {
    desc: 'M899 快照 else 臂的 -1 标记删（插入系）',
    file: 'ere/system/train/passout.js',
    find: `    if (tequip(cid, 11) === 1 && tflag(877) !== 1) {
      set_tflag(877, -1);
    }`,
    replace: `    // 变异：-1 标记删`,
    tests: ['passout'],
    must_mention: '标 -1',
  },
  {
    desc: 'M900 同回叠加（快感 + 苦痛 → 4）改回 2',
    file: 'ere/system/train/passout.js',
    find: `    } else if (tflag(895) === 1) {
      // :52-54 快感失神叠加苦痛 → 4
      set_tflag(895, 4);`,
    replace: `    } else if (tflag(895) === 1) {
      // :52-54
      set_tflag(895, 2);`,
    tests: ['passout'],
    must_mention: '895 = 4',
  },
  {
    desc: 'M901 PALAM_UP 的两路分配对调（恐怖屈服路走 100 - Z）',
    file: 'ere/system/train/passout.js',
    find: `  add_up(cid, 7, idiv(a, 100 - z));
  add_up(cid, 8, idiv(b, 100 - z));
  add_up(cid, 10, idiv(c, 100 - z));
  add_up(cid, 11, idiv(d, z));`,
    replace: `  add_up(cid, 7, idiv(a, z));
  add_up(cid, 8, idiv(b, z));
  add_up(cid, 10, idiv(c, z));
  add_up(cid, 11, idiv(d, 100 - z));`,
    tests: ['passout'],
    must_mention: '恐怖/屈服路',
  },
  {
    desc: 'M902 FLAG:72 系统开关守卫删',
    file: 'ere/system/train/seiin.js',
    find: `  if ((era.get('flag:72') || 0) === 1) {
    return; // :8 系统关闭（头注：全库零写点，恒开）
  }`,
    replace: `  // 变异：系统开关守卫删`,
    tests: ['seiin'],
    must_mention: 'FLAG:72',
  },
  {
    desc: 'M903 失神抑制（TFLAG:899 > 0）删',
    file: 'ere/system/train/seiin.js',
    find: `  if (tflag(0) === 0 || tflag(899) > 0) {
    return; // :11-12 未口内射精 / 失神中
  }`,
    replace: `  if (tflag(0) === 0) {
    return; // 变异：失神抑制删
  }`,
    tests: ['seiin'],
    must_mention: '失神中（TFLAG:899 ≥ 1）抑制',
  },
  {
    desc: 'M904 阈值表的淫乱 -20 删',
    file: 'ere/system/train/seiin.js',
    find: `  if (tal(76) === 1) {
    p -= 20;
  }
  await seiin_compulsion_orgasm(p); // :68`,
    replace: `  await seiin_compulsion_orgasm(p); // 变异：淫乱修正删`,
    tests: ['seiin'],
    must_mention: '达阈值：获得旗 TFLAG:110',
  },
  {
    desc: 'M905 精液中毒直抬 LV3 删',
    file: 'ere/system/train/seiin.js',
    find: `  if (count >= p) {
    if (abl32() < 3) {
      era.print(\`\${name_of(cid)}的精液中毒达到LV3了\`);
      era.set(\`abl:\${cid}:32\`, 3); // 属主 train
    }
  }`,
    replace: `  // 变异：LV3 直抬删`,
    tests: ['seiin'],
    must_mention: '直抬 LV3',
  },
  {
    desc: 'M906 LOST_VIRGIN_CHECK 守卫的 TFLAG:19 判据删（恒早退）',
    file: 'ere/event/source-check.js',
    find: `function lost_virgin_check() {
  if (!tal(0) || tflag(19) === 0) {
    return; // :267-268
  }`,
    replace: `function lost_virgin_check() {
  if (!tal(0)) {
    return; // 变异：TFLAG:19 判据删（恒早退）
  }`,
    tests: ['source-check'],
    must_mention: 'TFLAG:19 = 0',
  },
  {
    desc: 'M907 TALENT:0 的清除删（经 chara 门面）',
    file: 'ere/event/source-check.js',
    find: `  era.print('【处女丧失】'); // :270
  chara(cid).chara.处女 = 0; // :271（talent:0 属主 chara 走门面）`,
    replace: `  era.print('【处女丧失】'); // :270
  // 变异：TALENT:0 清除删`,
    tests: ['source-check'],
    must_mention: '丧失宣言、三面旗、初体验记录',
  },
  {
    desc: 'M908 摄影旗（tflag:32 |= 1 经 kojo 门面）删',
    file: 'ere/event/source-check.js',
    find: `  if (era.get(\`tequip:\${cid}:53\`)) {
    game.kojo.录像内容 |= 1;
  }`,
    replace: `  // 变异：摄影旗删`,
    tests: ['source-check'],
    must_mention: 'TFLAG:32 |= 1',
  },
  {
    desc: 'M909 振动棒初体验覆盖码错（101 → 103）',
    file: 'ere/event/source-check.js',
    find: `    if (era_flag.selectcom === 11) {
      chara(cid).train.初体验对象 = 101; // 振动棒
    }`,
    replace: `    if (era_flag.selectcom === 11) {
      chara(cid).train.初体验对象 = 103; // 变异：覆盖码错
    }`,
    tests: ['source-check'],
    must_mention: '101',
  },
  // —— #228 J18 着装脱衣（COM110/111）：ere/system/train/com-cloth.js ——
  {
    desc: 'M990 全裸分支漏保留贞操带位（42=79 且位 64 时 40=64 改 0）',
    file: 'ere/system/train/com-cloth.js',
    find: `        set_worn(target, BIT_SPECIAL);`,
    replace: `        set_worn(target, 0); // 变异：贞操带位不保留`,
    tests: ['com-cloth'],
    must_mention: '仅剩位 64',
  },
  {
    desc: 'M991 COM110 的 [9] 移轨行删（移动到[撕破衣服]）',
    file: 'ere/system/train/com-cloth.js',
    find: `      era.print(' [9] - 移动到[撕破衣服]');`,
    replace: `      // 变异：移轨行删`,
    tests: ['com-cloth', 'compare-train'],
    must_mention: 'golden train-natural:212-221 的逐字形状',
  },
  {
    desc: 'M992 ABLE2T 上装位判据错（位 4 改查位 8）',
    file: 'ere/system/train/com-cloth.js',
    find: `function com110_able2t(cid) {
  if (main_type(cid) >= 201) {
    return 0;
  }
  if ((worn(cid) & BIT_UPPER) === 0) {
    return 0;
  }`,
    replace: `function com110_able2t(cid) {
  if (main_type(cid) >= 201) {
    return 0;
  }
  if ((worn(cid) & BIT_SKIRT) === 0) {
    // 变异：判据错位
    return 0;
  }`,
    tests: ['com-cloth'],
    must_mention: 'W:2 动作行',
  },
  {
    desc: 'M993 W:1 的裙型位错（201-250 段落位 8 改位 16）',
    file: 'ere/system/train/com-cloth.js',
    find: `          bits |= main_type(target) <= 250 ? BIT_SKIRT : BIT_TROUSERS;`,
    replace: `          bits |= main_type(target) <= 250 ? BIT_TROUSERS : BIT_SKIRT; // 变异：位对调`,
    tests: ['com-cloth'],
    must_mention: '201-250 裙型 → 位 4+8',
  },
  {
    desc: 'M994 W:5 洗濯判据错（CFLAG:43 改查 44）',
    file: 'ere/system/train/com-cloth.js',
    find: `  if ((b & BIT_PANTY) === 0) {
    return 0;
  }
  if (laundry(cid, 43) !== 0) {
    return 0;
  }`,
    replace: `  if ((b & BIT_PANTY) === 0) {
    return 0;
  }
  if (laundry(cid, 44) !== 0) {
    // 变异：洗濯位错
    return 0;
  }`,
    tests: ['com-cloth'],
    must_mention: 'CFLAG:43 != 0 时 W:5 不出现',
  },
  {
    desc: 'M995 COM111 撕胸罩的 CFLAG:44 写改裸寻址（不走 stronghold 门面）',
    file: 'ere/system/train/com-cloth.js',
    find: `      chara(target).stronghold.胸罩状态 = -3; // :145 CFLAG:44 = -3`,
    replace: `      era.set(\`cflag:\${target}:44\`, -3); // 变异：跨域裸写`,
    tests: ['domain-check'],
    must_mention: 'cflag:44',
  },
  {
    desc: 'M996 COM111 史莱姆/贞操带徒手守卫删（剥ぎ取れない支直落 L:0 撕破）',
    file: 'ere/system/train/com-cloth.js',
    find: `    if (
      result === 10 &&
      worn(target) & BIT_SPECIAL &&
      (special_type(target) === 11 || special_type(target) === 79)
    ) {
      era.print(\`\${clothtype_special_text(target)}被徒手撕破了。\`);
      await era.waitAnyKey();
      return 0;
    }
`,
    replace: `    // 变异：徒手守卫整块删（直落 L:0 撕破）
`,
    tests: ['com-cloth'],
    must_mention: '撕不动直接退出',
  },
  {
    desc: 'M997 COM111 撕完全裸收尾删（不退出改重绘菜单）',
    file: 'ere/system/train/com-cloth.js',
    find: `    if (worn(target) === 0) {
      era.print('（已经全裸，撕无可撕）');
      era.print('');
      await era.waitAnyKey();
      return 0;
    }`,
    replace: `    // 变异：全裸收尾删`,
    tests: ['com-cloth'],
    must_mention: '撕完全裸 → RETURN 0',
  },
  {
    desc: 'M998 COM111 的 [100] 行空格形态改坏（] 与 - 间补空格）',
    file: 'ere/system/train/com-cloth.js',
    find: `    era.print(' [100]- 算了');`,
    replace: `    era.print(' [100] - 算了'); // 变异：空格形态`,
    tests: ['com-cloth'],
    must_mention: '] 与 - 间无空格',
  },
  {
    desc: 'M999 COM110 脱衣菜单行空格形态改坏（一空格删成顶格）',
    file: 'ere/system/train/com-cloth.js',
    find: `      era.print(\` [1] - \${clothtype_main2_text(target)}上半身脱掉\`);`,
    replace: `      era.print(\`[1] - \${clothtype_main2_text(target)}上半身脱掉\`); // 变异：空格形态`,
    tests: ['com-cloth', 'compare-train'],
    must_mention: 'golden train-natural:212-221 的逐字形状',
  },
  {
    desc: 'M1000 COM_ABLE110 的着衣設定判据删（FLAG:37）',
    file: 'ere/system/train/com-cloth.js',
    find: `  // :3666-3667 着衣設定を使ってない
  if ((era.get('flag:37') || 0) === 0) {
    return 0;
  }`,
    replace: `  // 变异：着衣設定判据删`,
    tests: ['com-cloth'],
    must_mention: '八条判据各挡一条',
  },
  {
    desc: 'M1001 COM_ABLE111 的全裸判据删',
    file: 'ere/system/train/com-cloth.js',
    find: `  // :3718-3719 全裸だとダメ
  if (worn(era_flag.target) === 0) {
    return 0;
  }`,
    replace: `  // 变异：全裸判据删`,
    tests: ['com-cloth'],
    must_mention: '全裸（CFLAG:40=0）不可',
  },
  {
    desc: 'M1002 T:3 裙型措辞条件对调（裙型 ↔ 非裙型）',
    file: 'ere/system/train/com-cloth.js',
    find: `          is_skirt(target) ? '的裙子脱掉' : '下半身脱掉'`,
    replace: `          is_skirt(target) ? '下半身脱掉' : '的裙子脱掉' // 变异：措辞对调`,
    tests: ['com-cloth'],
    must_mention: '非裙型措辞',
  },
  {
    desc: 'M1003 COM111 特别服装撕破的废弃态写错（-3 改 -2）',
    file: 'ere/system/train/com-cloth.js',
    find: `      set_laundry(target, 47, -3); // :102 CFLAG:47 = -3（破り取られている）`,
    replace: `      set_laundry(target, 47, -2); // 变异：废弃态值错`,
    tests: ['com-cloth'],
    must_mention: '废弃态 -3',
  },
  {
    desc: 'M1004 ABLE1W 上下两半守卫删（洗涤中两半也可重穿整件）',
    file: 'ere/system/train/com-cloth.js',
    find: `  if (worn(cid) & BIT_UPPER || laundry(cid, 45) !== 0) {
    if (worn(cid) & (BIT_SKIRT | BIT_TROUSERS) || laundry(cid, 46) !== 0) {
      return 0;
    }
  }`,
    replace: `  // 变异：上下两半守卫删`,
    tests: ['com-cloth'],
    must_mention: '上下两半都不可用时 W:1 不出现',
  },
  {
    desc: 'M1005 ABLE5T 和服支删（202 下为裙也可脱内裤）',
    file: 'ere/system/train/com-cloth.js',
    find: `  if (main_type(cid) === 202 && worn(cid) & BIT_SKIRT) {
    return 0; // 和服下为裙时脱内裤不可
  }
  return 1;
}

/** @COM110_ABLE5W（:522-540）：パンツ装着 */`,
    replace: `  return 1;
}

/** @COM110_ABLE5W（:522-540）：パンツ装着 */`,
    tests: ['com-cloth'],
    must_mention: '202 && 位 8 → T:5 = 0',
  },
  {
    desc: 'M1006 贞操带钥匙分支判据坏（CFLAG:49 恒假，提示行不出现）',
    file: 'ere/system/train/com-cloth.js',
    find: `    if (result === 0 && laundry(target, 49)) {`,
    replace: `    if (result === 0 && false) {
      // 变异：钥匙分支判据坏`,
    tests: ['com-cloth'],
    must_mention: ':143 的提示行',
  },
  {
    desc: 'M1007 ABLE0T 的标准装位判定错（未设定特别服装也放行）',
    file: 'ere/system/train/com-cloth.js',
    find: `function com110_able0t(cid) {
  if (special_type(cid) === 0) {
    return 0;
  }`,
    replace: `function com110_able0t(cid) {
  if (special_type(cid) === 999) {
    // 变异：未设定判据坏
    return 0;
  }`,
    tests: ['com-cloth'],
    must_mention: '类型未设定时 [0] 不出现',
  },
  {
    desc: 'M1008 W:0 拒绝句的弄脏位错（32/16 改 2/1）',
    file: 'ere/system/train/com-cloth.js',
    find: `      const unusable = soiled_unusable(mask, 32, 16);
      if (unusable) {
        era.print(unusable);
      } else {
        era.print(
          \`\${name}将\${clothtype_special_text(target)}\${`,
    replace: `      const unusable = soiled_unusable(mask, 2, 1);
      if (unusable) {
        era.print(unusable);
      } else {
        era.print(
          \`\${name}将\${clothtype_special_text(target)}\${`,
    tests: ['com-cloth'],
    must_mention: 'W:0 拒绝行',
  },
  {
    desc: 'M1009 B 探测不还原（标准装位残留，CFLAG:40 被探测覆写）',
    file: 'ere/system/train/com-cloth.js',
    find: `function standard_bits(cid) {
  const keep = worn(cid);
  wearing_cloth_all(cid);
  const bits = worn(cid);
  set_worn(cid, keep);
  return bits;
}`,
    replace: `function standard_bits(cid) {
  const keep = worn(cid);
  wearing_cloth_all(cid);
  const bits = worn(cid);
  return bits; // 变异：还原删（探测覆写残留）
}`,
    tests: ['com-cloth'],
    must_mention: 'A・B 探测后还原',
  },
  // —— #223（J13：SM 系指令族 40-49）——
  {
    desc: `M950 COM40 苦痛档首档错（300 改 30——PAIN_LADDERS 的打屁股表）`,
    file: 'ere/system/train/com-sm.js',
    find: `  40: [300, 500, 800, 1200, 1800],`,
    replace: `  40: [30, 500, 800, 1200, 1800],`,
    tests: [`com-sm`],
    must_mention: `SOURCE:6 = 300`,
  },
  {
    desc: `M951 COM40 LOSEBASE 体力扣错（80 改 8）`,
    file: 'ere/system/train/com-sm.js',
    find: `  add_lose(target, 0, 80);
  add_lose(target, 1, 40);`,
    replace: `  add_lose(target, 0, 8);
  add_lose(target, 1, 40);`,
    tests: [`com-sm`],
    must_mention: `-80`,
  },
  {
    desc: `M952 主人经验门槛错（ABL:21 >= maso_min 改 >= maso_min + 10）`,
    file: 'ere/system/train/com-sm.js',
    find: `  if (era_flag.assiplay === 0 && abl(cid, 21) >= maso_min) {`,
    replace: `  if (era_flag.assiplay === 0 && abl(cid, 21) >= maso_min + 10) {`,
    tests: [`com-sm`],
    must_mention: `TFLAG:30 += 1（主人亲自 + 抖M ≥ 1）`,
  },
  {
    desc: `M953 爱情经验的抖M/受虐狂门删（40/41/42/44 的 maso_gate 恒真）`,
    file: 'ere/system/train/com-sm.js',
    find: `  const gate_ok = maso_gate ? abl(cid, 21) >= 3 || tal(cid, 88) !== 0 : true;`,
    replace: `  const gate_ok = true; // 变异：门删`,
    tests: [`com-sm`],
    must_mention: `@COM40：LOSEBASE、SOURCE:12/14`,
  },
  {
    desc: `M954 COM43 的 S10 三连链：抖M 首档系数错（0.8 改 1）`,
    file: 'ere/system/train/com-sm.js',
    find: `function maso_factor(cid) {
  const m = abl(cid, 21);
  return m === 0
    ? 0.8`,
    replace: `function maso_factor(cid) {
  const m = abl(cid, 21);
  return m === 0
    ? 1`,
    tests: [`com-sm`],
    must_mention: `@COM43：欲情×顺从×抖M×倒错`,
  },
  {
    desc: `M955 COM43 胆怯不翻倍（S14 的胆怯臂删）`,
    file: 'ere/system/train/com-sm.js',
    find: `  set_src(target, 14, tal(target, 10) ? times(500, 2) : 500); // :76-78`,
    replace: `  set_src(target, 14, 500); // 变异：胆怯臂删`,
    tests: [`com-sm`],
    must_mention: `胆怯翻倍 SOURCE:14`,
  },
  {
    desc: `M956 COM44 触手紧缚不清触手计数（T:0 = 0 删）`,
    file: 'ere/system/train/com-sm.js',
    find: `  set_tq(target, 44, 1 - tq(target, 44));
  if (tq(target, 90)) {
    era.set('t:0', 0);
  }`,
    replace: `  set_tq(target, 44, 1 - tq(target, 44));`,
    tests: [`com-sm`],
    must_mention: `@COM44：S10 = 800×链`,
  },
  {
    desc: `M957 COM45 六格直填错（S13 = 150 改 15）`,
    file: 'ere/system/train/com-sm.js',
    find: `  set_src(target, 13, 150); // :31 SOURCE:13 屈从`,
    replace: `  set_src(target, 13, 15); // 变异`,
    tests: [`com-sm`],
    must_mention: `@COM45：六格 SOURCE 直填`,
  },
  {
    desc: `M958 COM46 的 ABL:21 整组覆写删（S13 保留 ABL:3 档的 1400）`,
    file: 'ere/system/train/com-sm.js',
    find: `  const wide = MASO_WIDE_LADDER[Math.min(abl(target, 21), 5)];
  set_src(target, 6, wide[0]);
  set_src(target, 8, wide[1]);
  set_src(target, 13, wide[2]);`,
    replace: `  const wide = MASO_WIDE_LADDER[Math.min(abl(target, 21), 5)];
  set_src(target, 6, wide[0]);
  set_src(target, 8, wide[1]); // 变异：S13/S14/S15 不覆写`,
    tests: [`com-sm`],
    must_mention: `S13 被 ABL:21 档覆写`,
  },
  {
    desc: `M959 COM46 润滑档的 S6 += 删（80/500/300/120/100 加算不发生）`,
    file: 'ere/system/train/com-sm.js',
    find: `    src(target, 6) +
      (palam_below(target, 3, 1)
        ? 800
        : palam_below(target, 3, 2)
          ? 500
          : palam_below(target, 3, 3)
            ? 300
            : palam_below(target, 3, 4)
              ? 120
              : 100),
  );

  // :102-128 S2 再乘 欲情（:102-113）× 顺从（:115-128，肛门系表）`,
    replace: `    src(target, 6) + 0),
  );

  // :102-128 S2 再乘 欲情（:102-113）× 顺从（:115-128，肛门系表）`,
    tests: [`com-sm`],
    must_mention: `ABL:3 档 → S2/S13 基础`,
  },
  {
    desc: `M960 COM46 肛门钝感不乘（anal_sense_factor 直通）`,
    file: 'ere/system/train/com-sm.js',
    find: `function anal_sense_factor(cid, v) {
  if (tal(cid, 105)) {
    return times(v, 1.5);
  }`,
    replace: `function anal_sense_factor(cid, v) {
  if (false) {
    return times(v, 1.5);
  }`,
    tests: [`com-sm`],
    must_mention: `@COM46：润滑档`,
  },
  {
    desc: `M961 COM46 重贞操的 S13/3 删`,
    file: 'ere/system/train/com-sm.js',
    find:
      '  if ((era.get(' +
      '`' +
      'exp:${target}:0' +
      '`' +
      ') || 0) === 0 && tal(target, 30)) {\n    set_src(target, 13, Math.floor(src(target, 13) / 3));\n  }\n\n  // —— 経験上昇（:157-161）——',
    replace: `  // 变异：重贞操删

  // —— 経験上昇（:157-161）——`,
    tests: [`com-sm`],
    must_mention: `@COM46：润滑档`,
  },
  {
    desc: `M962 COM46 初次排泄门错（CFLAG:4 == 0 改 == 9）`,
    file: 'ere/system/train/com-sm.js',
    find:
      '  if (tq(target, 46) && (era.get(' +
      '`' +
      'cflag:${target}:4' +
      '`' +
      ') || 0) === 0) {',
    replace:
      '  if (tq(target, 46) && (era.get(' +
      '`' +
      'cflag:${target}:4' +
      '`' +
      ') || 0) === 9) {',
    tests: [`com-sm`],
    must_mention: `初次 +1`,
  },
  {
    desc: `M963 COM46 触手插入的 A 口污垢置位删`,
    file: 'ere/system/train/com-sm.js',
    find:
      '  if (tq(target, 46) === 0 && tq(target, 90)) {\n    era.set(' +
      '`' +
      'stain:${target}:4' +
      '`' +
      ', (era.get(' +
      '`' +
      'stain:${target}:4' +
      '`' +
      ') || 0) | 2 | 4);\n  }',
    replace: `  // 变异：污垢置位删`,
    tests: [`com-sm`],
    must_mention: `插入回合 + 触手`,
  },
  {
    desc: `M964 COM46 着衣弄脏调用删（soiling_cloth_no2 不再发生）`,
    file: 'ere/system/train/com-sm.js',
    find: `  if (tq(target, 46) && era.get('flag:37')) {
    await soiling_cloth_no2(target);
  }`,
    replace: `  // 变异：弄脏调用删`,
    tests: [`com-sm`],
    must_mention: `弄脏位 &1|&2（内裤洗濯+处理）`,
  },
  {
    desc: `M965 COM47 解除无修正的提前返回删（脱衣回合也吃气力扣）`,
    file: 'ere/system/train/com-sm.js',
    find: `  if (tq(target, 47)) {
    set_tq(target, 47, 0);
    return 1;
  }`,
    replace: `  if (tq(target, 47)) {
    set_tq(target, 47, 0);
  } // 变异：提前返回删`,
    tests: [`com-sm`],
    must_mention: `@COM47：已穿着`,
  },
  {
    desc: `M966 COM48 抖M配对链 S0 系数错（1.2 改 1）`,
    file: 'ere/system/train/com-sm.js',
    find: `const MASO_PAIR_LADDER = [
  [1, 1],
  [1.2, 0.8],`,
    replace: `const MASO_PAIR_LADDER = [
  [1, 1],
  [1, 0.8],`,
    tests: [`com-sm`],
    must_mention: `@COM48：ABL:0 档与抖M配对链`,
  },
  {
    desc: `M967 COM48 被虐快乐首档错（+3 落到 +1）`,
    file: 'ere/system/train/com-sm.js',
    find: `  if (tal(target, 88) === 1 || (abl(target, 11) >= 3 && abl(target, 21) >= 3)) {
    era.print('被虐快乐经验+3'); // :67 PRINTFORML %EXPNAME:30%+3
    chara(target).dungeon.被虐快乐经验 += 3;
  } else if`,
    replace: `  if (false) {
    era.print('被虐快乐经验+3');
    chara(target).dungeon.被虐快乐经验 += 3;
  } else if`,
    tests: [`com-sm`],
    must_mention: `@COM48：ABL:0 档与抖M配对链`,
  },
  {
    desc: `M968 精通的关系门槛错（150 改 1500）`,
    file: 'ere/system/train/com-sm.js',
    find:
      '  if ((era.get(' +
      '`' +
      'relation:${target}:${player}' +
      '`' +
      ') || 0) < 150) {',
    replace:
      '  if ((era.get(' +
      '`' +
      'relation:${target}:${player}' +
      '`' +
      ') || 0) < 1500) {',
    tests: [`com-sm`],
    must_mention: `未熟解除`,
  },
  {
    desc: `M969 COM49 本体的经验档整阈值化（EXPLV[3]/2 改 EXPLV[3]——半阈值是源形）`,
    file: 'ere/system/train/com-sm.js',
    find: `  const e = era.get(\`exp:\${target}:1\`) || 0;
  const exp_idx =
    e < EXPLV[1]
      ? 0
      : e < EXPLV[2] / 2
        ? 1
        : e < EXPLV[3] / 2
          ? 2
          : e < EXPLV[4] / 2
            ? 3
            : e < EXPLV[5] / 2
              ? 4
              : 5;
  set_src(target, 2, times(src(target, 2), ANAL_EXP_LADDER[exp_idx][0]));
  set_src(target, 6, ANAL_EXP_LADDER[exp_idx][1]);`,
    replace: `  const e = era.get(\`exp:\${target}:1\`) || 0;
  const exp_idx =
    e < EXPLV[1]
      ? 0
      : e < EXPLV[2]
        ? 1
        : e < EXPLV[3]
          ? 2
          : e < EXPLV[4]
            ? 3
            : e < EXPLV[5]
              ? 4
              : 5;
  set_src(target, 2, times(src(target, 2), ANAL_EXP_LADDER[exp_idx][0]));
  set_src(target, 6, ANAL_EXP_LADDER[exp_idx][1]);`,
    tests: [`com-sm`],
    must_mention: `@COM49：ABL:3/EXP:1 双梯`,
  },
  {
    desc: `M970 SM 系过滤位错（FLAG:25 & 16 改 & 1）`,
    file: 'ere/system/train/com-sm.js',
    find: `const sm_filtered = () => ((era.get('flag:25') || 0) & 16) !== 0;`,
    replace: `const sm_filtered = () => ((era.get('flag:25') || 0) & 1) !== 0;`,
    tests: [`com-sm`],
    must_mention: `SM 过滤`,
  },
  {
    desc: `M971 鞭的道具持有门删（无鞭也可执行）`,
    file: 'ere/system/train/com-sm.js',
    find: `  if (!has_item(10)) {
    return 0; // :1913-1914
  }`,
    replace: `  // 变异：持有门删`,
    tests: [`com-sm`],
    must_mention: `无鞭（ITEM:10 == 0）`,
  },
  {
    desc: `M972 眼罩解除不随时（已装着仍要求道具）`,
    file: 'ere/system/train/com-sm.js',
    find: `  if (tq(cid, 43)) {
    return 1; // :1993-1994 解除はいつでも可能
  }`,
    replace: `  // 变异：解除随时删`,
    tests: [`com-sm`],
    must_mention: `失神挡、解除随时、要 ITEM:5`,
  },
  {
    desc: `M973 绳子的调教者技巧门删（技巧 0 也可绑）`,
    file: 'ere/system/train/com-sm.js',
    find: `  if (abl(era_flag.player, 12) <= 2) {
    return 0; // :2030-2031 調教者の技巧
  }`,
    replace: `  // 变异：技巧门删`,
    tests: [`com-sm`],
    must_mention: `技巧不足（ABL:PLAYER:12 = 0）`,
  },
  {
    desc: `M974 口塞的触手口辱挡删`,
    file: 'ere/system/train/com-sm.js',
    find: `  if (tq(cid, 98)) {
    return 0; // :2049-2050 触手口辱中
  }`,
    replace: `  // 变异：触手口辱挡删`,
    tests: [`com-sm`],
    must_mention: `@COM_ABLE45：触手口辱挡`,
  },
  {
    desc: `M975 灌肠的肛门经验门槛错（<= 25 改 <= 0）`,
    file: 'ere/system/train/com-sm.js',
    find:
      '  if ((era.get(' +
      '`' +
      'exp:${cid}:1' +
      '`' +
      ') || 0) <= 25) {\n    return 0; // :2120-2121 肛门经验 > 25\n  }',
    replace:
      '  if ((era.get(' +
      '`' +
      'exp:${cid}:1' +
      '`' +
      ') || 0) <= 0) {\n    return 0;\n  }',
    tests: [`com-sm`],
    must_mention: `EXP:1 = 25 不可（要 > 25）`,
  },
  {
    desc: `M976 拘束衣的助手限定门删（主人也可穿）`,
    file: 'ere/system/train/com-sm.js',
    find: `  if (era_flag.assiplay === 0 || era_flag.assi < 1) {
    return 0; // :2142-2143 助手じゃなきゃダメ
  }`,
    replace: `  // 变异：助手限定删`,
    tests: [`com-sm`],
    must_mention: `@COM_ABLE47：只能助手穿`,
  },
  {
    desc: `M977 践踏的对象性别门删（女性也可被踩）`,
    file: 'ere/system/train/com-sm.js',
    find: `  if (!tal(cid, 121) && !tal(cid, 122)) {
    return 0; // :2159-2160 対象が男人か扶她
  }`,
    replace: `  // 变异：性别门删`,
    tests: [`com-sm`],
    must_mention: `温妮（女）不可`,
  },
  {
    desc: `M978 电极的浴室挡删`,
    file: 'ere/system/train/com-sm.js',
    find: `  if (tq(cid, 58)) {
    return 0; // :2236-2237 浴室
  }`,
    replace: `  // 变异：浴室挡删`,
    tests: [`com-sm`],
    must_mention: `浴室中不可插电极`,
  },
  {
    desc: `M979 电极的肛具互斥删（灌肠使用中也可插电极）`,
    file: 'ere/system/train/com-sm.js',
    find: `  if (tq(cid, 13) || tq(cid, 19) || tq(cid, 46)) {
    return 0; // :2225-2234 肛门振动棒/肛珠/普通の浣腸使用中
  }`,
    replace: `  // 变异：互斥删`,
    tests: [`com-sm`],
    must_mention: `@COM_ABLE49：要 ITEM:21`,
  },
  {
    desc: `M980 B40 着ぐるみ支删（永远走普通支）`,
    file: 'ere/system/train/com-sm.js',
    find:
      '  let line = ' +
      '`' +
      '${player_name}在' +
      '`' +
      ';\n  if (in_zooko()) {',
    replace:
      '  let line = ' + '`' + '${player_name}在' + '`' + ';\n  if (false) {',
    tests: [`com-sm`],
    must_mention: `着ぐるみ支`,
  },
  {
    desc: `M981 B46 失神中仍打抖M档（TFLAG:899 门删）`,
    file: 'ere/system/train/com-sm.js',
    find:
      '    era.print(' +
      '`' +
      '${tname}的肛塞被拔掉了、里面的污物随之喷出肛门、飞散一地。' +
      '`' +
      ");\n    if ((era.get('tflag:899') || 0) === 0) {",
    replace:
      '    era.print(' +
      '`' +
      '${tname}的肛塞被拔掉了、里面的污物随之喷出肛门、飞散一地。' +
      '`' +
      ');\n    if (true) {',
    tests: [`com-sm`],
    must_mention: `失神中无抖M档文本`,
  },
  {
    desc: `M982 A40-42 的失神门删（&&/|| 同优先级的三指令共钳被破坏）`,
    file: 'ere/system/train/com-sm.js',
    find: `  // :1208 的第三臂 + TFLAG:899 失神门（> 1 时不进本分支——整支跳过，
  // 与原作 ELSEIF 不命中同形）
  if ((era.get('tflag:899') || 0) > 1) {
    return;
  }`,
    replace: `  // 变异：失神门删`,
    tests: [`com-sm`],
    must_mention: `SELECTCOM = 40 失神中无反应文本`,
  },
  {
    desc: `M983 A40-42 的灌肠塞排泄段删`,
    file: 'ere/system/train/com-sm.js',
    find:
      `  if (tq(target, 46) && (era.get('tflag:899') || 0) <= 1) {
    era.print(
      ` +
      '`' +
      `\${tname}的菊花被灌入大量的灌肠液后还用肛门塞封起来了、侵犯还在继续。` +
      '`' +
      `,
    );
    const m = abl(target, 21);`,
    replace:
      `  if (false) {
    era.print(
      ` +
      '`' +
      `\${tname}的菊花被灌入大量的灌肠液后还用肛门塞封起来了、侵犯还在继续。` +
      '`' +
      `,
    );
    const m = abl(target, 21);`,
    tests: [`com-sm`],
    must_mention: `装着灌肠塞时的排泄段`,
  },
  {
    desc: `M984 CASE 40 同调教者门删（换人也升格）`,
    file: 'ere/system/train/com-sm.js',
    find: `  const same_trainer =
    (era_flag.assiplay && (era.get('tflag:50') || 0)) ||
    (!era_flag.assiplay && (era.get('tflag:50') || 0) === 0);
  if (!same_trainer) {
    return 40; // 未命中 → RETURN ARG
  }`,
    replace: `  // 变异：同调教者门删`,
    tests: [`com-sm`],
    must_mention: `调教者换了人 → 不升格`,
  },
  {
    desc: `M985 CASE 40 第二臂删（上上回合 + 挿入Ｇスポ/子宮口 不再升格）`,
    file: 'ere/system/train/com-sm.js',
    find: `  const hit =
    [21, 131, 133, 134].includes(prev) ||
    ([21, 131, 132, 133, 134].includes(prev2) &&
      (prev === 120 || prev === 121));`,
    replace: `  const hit = [21, 131, 133, 134].includes(prev);`,
    tests: [`com-sm`],
    must_mention: `同调教者 + 上回合后背位族`,
  },
  {
    desc: `M986 JUMPFORM 落点的占位行删（升格目标缺失静默）`,
    file: 'ere/system/train/com-sm.js',
    find:
      '  stub_line(' +
      '`' +
      'COM${com}' +
      '`' +
      ', ' +
      '`' +
      '指令 ${com} 的升格目标' +
      '`' +
      ", '随追加与高级指令票');\n  return 1;",
    replace: `  return 1; // 变异：占位行删`,
    tests: [`com-sm`],
    must_mention: `升格目标缺失的占位行（J19 落地前）`,
  },
  {
    desc: `M987 EQUIP_COM43 的 UP:10 直写删`,
    file: 'ere/system/train/com-sm.js',
    find: `  add_up(target, 5, a);
  add_up(target, 10, src(target, 14));`,
    replace: `  add_up(target, 5, a); // 变异：UP:10 删`,
    tests: [`com-sm`],
    must_mention: `UP:10 += SOURCE:14（累加后）`,
  },
  {
    desc: `M988 EQUIP_COM46 的 S14 += B 改 += C（源 :328 的 B 是有意互异）`,
    file: 'ere/system/train/com-sm.js',
    find: `  set_src(target, 2, src(target, 2) + a);
  set_src(target, 13, src(target, 13) + b_base);
  set_src(target, 6, src(target, 6) + c);
  set_src(target, 14, src(target, 14) + b_base);`,
    replace: `  set_src(target, 2, src(target, 2) + a);
  set_src(target, 13, src(target, 13) + b_base);
  set_src(target, 6, src(target, 6) + c);
  set_src(target, 14, src(target, 14) + c);`,
    tests: [`com-sm`],
    must_mention: `@EQUIP_COM46：EXP:1 半阈值档`,
  },
  {
    desc: `M989 EQUIP_COM49 的经验档半阈值化（整阈值是全库唯一一处源形）`,
    file: 'ere/system/train/com-sm.js',
    find: `  const exp_idx =
    e < EXPLV[1]
      ? 0
      : e < EXPLV[2]
        ? 1
        : e < EXPLV[3]
          ? 2
          : e < EXPLV[4]
            ? 3
            : e < EXPLV[5]
              ? 4
              : 5;`,
    replace: `  const exp_idx =
    e < EXPLV[1]
      ? 0
      : e < EXPLV[2] / 2
        ? 1
        : e < EXPLV[3] / 2
          ? 2
          : e < EXPLV[4] / 2
            ? 3
            : e < EXPLV[5] / 2
              ? 4
              : 5;`,
    tests: [`com-sm`],
    must_mention: `整阈值 EXP 档`,
  },
  {
    desc: 'M1010 COM_ABLE200 的观战券守卫删（无券也放行）',
    file: 'ere/system/train/com-colosseum.js',
    find: "  // :4686-4687 无观战券（ITEM:35）不可\n  if ((era.get('item:35') || 0) === 0) {\n    return 0;\n  }",
    replace: '  // 变异：观战券守卫删',
    tests: ['com-colosseum'],
    must_mention: '无观战券不可',
  },
  {
    desc: 'M1011 COM_ABLE200 的互斥位照判删（死斗场中触手也可开）',
    file: 'ere/system/train/com-colosseum.js',
    find: '  if (tequip(90)) {\n    return 0;\n  }',
    replace: '  // 变异：触手互斥删',
    tests: ['com-colosseum'],
    must_mention: '死斗场中与触手互斥',
  },
  {
    desc: 'M1012 COM_ABLE201 的助手亲自出战判定翻转',
    file: 'ere/system/train/com-colosseum.js',
    find: '  // :4695-4696 助手亲自出战才有\n  if (era_flag.player !== era_flag.assi) {\n    return 0;\n  }',
    replace: '  // 变异：助手出战判定删',
    tests: ['com-colosseum'],
    must_mention: '主人调教',
  },
  {
    desc: 'M1013 COM_ABLE 等级门槛的 < 改 <=（恰在门槛也拒绝）',
    file: 'ere/system/train/com-colosseum.js',
    find: '    if ((era.get(`cflag:${era_flag.player}:9`) || 0) < min_level) {',
    replace:
      '    if ((era.get(`cflag:${era_flag.player}:9`) || 0) <= min_level) {',
    tests: ['com-colosseum'],
    must_mention: '等级恰在门槛',
  },
  {
    desc: 'M1014 COM200 进入支的胆怯/感情淡薄缩放删',
    file: 'ere/system/train/com-colosseum.js',
    find: '    let a = 100; // :21 A = 100\n    if (era.get(`talent:${target}:10`)) {\n      a = times(a, 2.0); // :24-25 胆怯\n    }\n    if (era.get(`talent:${target}:22`)) {\n      a = times(a, 0.6); // :27-28 感情淡薄\n    }',
    replace: '    let a = 100; // 变异：素质缩放删',
    tests: ['com-colosseum'],
    must_mention: '×2 / 感情淡薄 ×0.6',
  },
  {
    desc: 'M1015 COM200 的 UP:10（恐怖）写删',
    file: 'ere/system/train/com-colosseum.js',
    find: '  era.add(`delta:${target}:10`, a * 20); // :33 UP:10（恐怖）',
    replace: '  // 变异：UP:10 写删',
    tests: ['com-colosseum'],
    must_mention: 'UP:10（恐怖）',
  },
  {
    desc: 'M1016 COM200 退出支的观战券扣减删',
    file: 'ere/system/train/com-colosseum.js',
    find: "    era.add('item:35', -1); // item 表 34-35 属主 train，直写",
    replace: '    // 变异：观战券不扣',
    tests: ['com-colosseum'],
    must_mention: ':15 ITEM:35 -= 1',
  },
  {
    desc: 'M1017 B 的 200 分支进入支删（落到无操作也不出文本）',
    file: 'ere/system/train/com-colosseum.js',
    find: "    prefix = '全裸的'; // :3024-3025",
    replace: "    prefix = '赤裸的'; // 变异：全裸前缀改坏",
    tests: ['com-colosseum'],
    must_mention: '进入支的完整文本序列',
  },
  {
    desc: 'M1018 B/A 对 201-207 的无操作注册删（占位行复辟）',
    file: 'ere/system/train/com-colosseum.js',
    find: 'const noop_branch = async () => {};',
    replace:
      'const noop_branch = undefined; // 变异：无操作注册废（register 会炸）',
    tests: ['com-colosseum'],
    must_mention: '不得出占位行',
  },
  {
    desc: 'M1019 A 公共头 TFLAG:15 死斗场两臂删',
    file: 'ere/system/train/train-message.js',
    find: "  const tflag15 = era.get('tflag:15') || 0;\n  if (tflag15 > 0 && era.get(`tequip:${era_flag.target}:55`)) {\n    const com_site = { 31: '嘴里', 21: '私处里', 27: '直肠里' };\n    const site = com_site[era_flag.selectcom];\n    if (site !== undefined) {\n      const target_name = chara_callname(era_flag.target);\n      era.print(\n        tflag15 === 2\n          ? `${target_name}的${site}、被怪物大量的粘稠精液灌满了…` // :135-141\n          : `${target_name}的${site}、被灌入了怪物黏黏糊糊的精液…`, // :127-133\n      );\n    }\n  }",
    replace: '  // 变异：TFLAG:15 死斗场两臂删',
    tests: ['com-colosseum'],
    must_mention: '死斗场 ==1 臂',
  },
  {
    desc: 'M1020 A 公共头两臂的 SELECTCOM 三支过滤删（206 也灌精）',
    file: 'ere/system/train/train-message.js',
    find: '    const site = com_site[era_flag.selectcom];',
    replace:
      "    const site = com_site[era_flag.selectcom] ?? '嘴里'; // 变异：三支过滤删",
    tests: ['com-colosseum'],
    must_mention: 'SELECTCOM 206 无新增',
  },
  {
    desc: 'M1021 COM201 的非助手出战双保险删',
    file: 'ere/system/train/com-colosseum.js',
    find: '  // :10-11 非助手亲自出战不可执行（与 COM_ABLE201 双保险，1:1 保留）\n  if (assi !== era_flag.player) {\n    return 0;\n  }',
    replace: '  // 变异：双保险删',
    tests: ['com-colosseum'],
    must_mention: ':10-11 双保险',
  },
  {
    desc: 'M1022 COM201 反击支的助手气力扣减删（门面写不落）',
    file: 'ere/system/train/com-colosseum.js',
    find: '    chara(assi).dungeon.体力 -= slave_point;\n    chara(assi).dungeon.气力 -= slave_point * 10;',
    replace: '    // 变异：助手体力气力不扣',
    tests: ['com-colosseum'],
    must_mention: '直接扣助手体力气力',
  },
  {
    desc: 'M1023 COM201 的助手退却气力线（1/5）改 1/6',
    file: 'ere/system/train/com-colosseum.js',
    find: '      idiv(era.get(`maxbase:${era_flag.assi}:1`) || 0, 5)',
    replace: '      idiv(era.get(`maxbase:${era_flag.assi}:1`) || 0, 6)',
    tests: ['com-colosseum'],
    must_mention: ':56-57 退则 → 暂时放过（RETURN 1）',
  },
  {
    desc: 'M1024 COM201 凌辱收入算式的 ×5 改 ×4',
    file: 'ere/system/train/com-colosseum.js',
    find: "      era.add('tflag:402', lose(target, 0) * 5 + rand(com_result)); // :91",
    replace:
      "      era.add('tflag:402', lose(target, 0) * 4 + rand(com_result)); // :91",
    tests: ['com-colosseum'],
    must_mention: '收入 = LOSEBASE:0 × 5',
  },
  {
    desc: 'M1025 COM201 的 999 暂时放过改 RETURN 1',
    file: 'ere/system/train/com-colosseum.js',
    find: '      await era.waitAnyKey();\n      return 0;\n    } else {\n      continue; // :113-114',
    replace:
      '      await era.waitAnyKey();\n      return 1; // 变异：放过不作废回合\n    } else {\n      continue; // :113-114',
    tests: ['com-colosseum'],
    must_mention: ':105-107 暂时放过 RETURN 0',
  },
  {
    desc: 'M1026 怪物开战损耗的等级缩放删（203 的 level 倍率）',
    file: 'ere/system/train/com-colosseum.js',
    find: '    open_lose0: (level, weak) => monster_lose0(level, weak),',
    replace: '    open_lose0: () => 5, // 变异：等级缩放删',
    tests: ['com-colosseum'],
    must_mention: '霉菌犬',
  },
  {
    desc: 'M1027 怪物体力枯竭的 /=4 折减删',
    file: 'ere/system/train/com-colosseum.js',
    find: 'function monster_lose0(base_value, weak) {\n  return weak ? idiv(base_value, 4) : base_value;\n}',
    replace:
      'function monster_lose0(base_value, weak) {\n  return base_value; // 变异：/=4 折减删\n}',
    tests: ['com-colosseum'],
    must_mention: '/=4 折减',
  },
  {
    desc: 'M1028 怪物败北线翻转（< 改 <=：点恰等也判胜）',
    file: 'ere/system/train/com-colosseum.js',
    find: '  if (slave_point < cfg.threshold(level) || fainted) {',
    replace: '  if (slave_point <= cfg.threshold(level) || fainted) {',
    tests: ['com-colosseum'],
    must_mention: '胜利支',
  },
  {
    desc: 'M1029 怪物失神判定删（899 不再强制败北）',
    file: 'ere/system/train/com-colosseum.js',
    find: "  const fainted = (era.get('tflag:899') || 0) > 0; // 失神中",
    replace: '  const fainted = false; // 变异：失神判定删',
    tests: ['com-colosseum'],
    must_mention: 'TFLAG:899',
  },
  {
    desc: 'M1030 怪物收入倍率表改坏（巨魔 ×5 改 ×4）',
    file: 'ere/system/train/com-colosseum.js',
    find: '    income: (lose0) => lose0 * 5,',
    replace: '    income: (lose0) => lose0 * 4,',
    tests: ['com-colosseum'],
    must_mention: '死亡斗场收入 × 5',
  },
  {
    desc: 'M1031 COM206 的 999 缺 RETURN 0 标记删（放过也作废回合）',
    file: 'ere/system/train/com-colosseum.js',
    find: 'MONSTER_CONFIGS[206].no_999_return = true; // :98-99 缺 RETURN 0（#14 第七批）',
    replace:
      'MONSTER_CONFIGS[206].no_999_return = false; // 变异：缺 RETURN 0 不复现',
    tests: ['com-colosseum'],
    must_mention: '999 后照走射精检查并 RETURN 1',
  },
  {
    desc: 'M1032 COM206 拡張经验的初回异常经验判据删',
    file: 'ere/system/train/com-colosseum.js',
    find: '    if ((era.get(`exp:${target}:52`) || 0) === 0 && era_flag.selectcom === 21) {',
    replace: '    if (false && era_flag.selectcom === 21) {',
    tests: ['com-colosseum'],
    must_mention: '初回异常经验各 +1',
  },
  {
    desc: 'M1033 射精量的技巧分档表改坏（档 2 值 1600 改 1500）',
    file: 'ere/system/train/com-colosseum.js',
    find: '  b = [450, 1000, 1600, 2200, 2700, 3200][abl12];',
    replace: '  b = [450, 1000, 1500, 2200, 2700, 3200][abl12];',
    tests: ['com-colosseum'],
    must_mention: '射精量 = 技巧档 × 顺从 × 欲情 × 体位',
  },
  {
    desc: 'M1034 射精槽扣减后的钳制删（SIF BASE >= EJAC → = EJAC-1）',
    file: 'ere/system/train/com-colosseum.js',
    find: '    era.add(`base:${master}:4`, -ejac * 2); // :230\n    if ((era.get(`base:${master}:4`) || 0) >= ejac) {\n      era.set(`base:${master}:4`, ejac - 1); // :231-232\n    }',
    replace: '    era.add(`base:${master}:4`, -ejac); // 变异：钳制删',
    tests: ['com-colosseum'],
    must_mention: '钳制到 EJAC-1',
  },
  {
    desc: 'M1035 大量射精的 EXP:20 加算删（门面写不落）',
    file: 'ere/system/train/com-colosseum.js',
    find: '    chara(target).dungeon.精液经验 += 3; // :226 EXP:20（属主 dungeon，门面）',
    replace: '    // 变异：EXP:20 +3 删',
    tests: ['com-colosseum'],
    must_mention: '大量射精',
  },
  {
    desc: 'M1036 汚れ位的按位或改赋值（口位 |= 2|4 改 = 2）',
    file: 'ere/system/train/com-colosseum.js',
    find: '  const stain_or = (idx, bit) =>\n    era.set(\n      `stain:${target}:${idx}`,\n      (era.get(`stain:${target}:${idx}`) || 0) | bit,\n    );',
    replace:
      '  const stain_or = (idx, bit) => era.set(`stain:${target}:${idx}`, bit);',
    tests: ['com-colosseum'],
    must_mention: '口位 STAIN:0 |= 2 | 4',
  },
  {
    desc: 'M1037 TFLAG:15（怪物射精旗标）写删',
    file: 'ere/system/train/com-colosseum.js',
    find: "  era.set('tflag:15', e); // :287 死斗场怪物が射精フラグ（source-check/A 头消费）",
    replace: '  // 变异：TFLAG:15 写删',
    tests: ['com-colosseum'],
    must_mention: '2880 < 10000 → E = 0',
  },
  {
    desc: 'M1038 COM207 的 JUMP COM51 尾调用改不设 SELECTCOM',
    file: 'ere/system/train/com-colosseum.js',
    find: 'function call_insult_com(com) {\n  era_flag.selectcom = com;\n  return com_family.call(com, { whenMissing: 0 });\n}',
    replace:
      'function call_insult_com(com) {\n  return com_family.call(com, { whenMissing: 0 }); // 变异：SELECTCOM 不设\n}',
    tests: ['com-colosseum'],
    must_mention: 'SELECTCOM = 51',
  },
  {
    desc: 'M1040 COM_AFTER_ARENA 的胜利线改（> 0 改 > 1：気力 1 也判陷落）',
    file: 'ere/system/train/com-colosseum.js',
    find: '  if ((era.get(`base:${target}:1`) || 0) > 0) {',
    replace: '  if ((era.get(`base:${target}:1`) || 0) > 1) {',
    tests: ['com-colosseum'],
    must_mention: '気力有余（1 > 0）→ 胜利 0',
  },
  {
    desc: 'M1041 ARENA_SLAVE_POINT 的気力折减删（点数不随気力降）',
    file: 'ere/system/train/com-colosseum.js',
    find: '  b *= era.get(`base:${a}:1`) || 0;\n  b = idiv(b, era.get(`maxbase:${a}:1`) || 0);',
    replace: '  // 变异：気力折减删',
    tests: ['com-colosseum'],
    must_mention: '按気力比例折减',
  },
  {
    desc: 'M1042 train-loop 的 RETURN 0 分支删（作废回合照结算）',
    file: 'ere/system/train/train-loop.js',
    find: '  if (com_result === 0) {\n    return { missing: false, cancelled: true };\n  }',
    replace: '  // 变异：RETURN 0 分支删',
    tests: ['com-colosseum', 'com-cloth'],
    must_mention: '作废回合不得进 @SOURCE_CHECK',
  },
  {
    desc: 'M1043 SHOW_EQUIP_2 已点亮状态改回占位行',
    file: 'ere/page/page-train.js',
    find: "  if (special_equip.length > 0) {\n    era.print([{ content: special_equip.join(''), color: '#FF1493' }]);",
    replace:
      "  if (false) {\n    era.print([{ content: special_equip.join(''), color: '#FF1493' }]);",
    tests: ['com-colosseum', 'com-special'],
    must_mention: '[死斗场决斗中]',
  },
  {
    desc: 'M1044 COM_ABLE207 的死斗场守卫删（不在场也可用→输入 100 触发指令）',
    file: 'ere/system/train/com-colosseum.js',
    find: '    if ((era.get(`tequip:${era_flag.target}:55`) || 0) === 0) {\n      return 0; // 死斗场判定（:4699 等）\n    }',
    replace: '    // 变异：死斗场守卫删',
    tests: ['com-colosseum'],
    must_mention: '#214 撞号消解',
  },

  {
    desc: 'M910 COM_ABLE1 的下装着衣判据删（位 16 + FLAG:37）',
    file: 'ere/system/train/com-caress.js',
    find: '  if (cloth_blocked(target, 17)) {\n    return 0; // パンツか上着下・ズボン\n  }',
    replace: '  // 变异：着衣判据删除',
    tests: ['com-caress'],
    must_mention: 'パンツ/下装在身',
  },
  {
    desc: 'M911 COM_ABLE2 助手双低放行删（顺从 ≤3 且百合 ≤3 → RETURN 1 源逐字）',
    file: 'ere/system/train/com-caress.js',
    find: '    if (\n      (era.get(`abl:${assi}:10`) || 0) <= 3 &&\n      (era.get(`abl:${assi}:22`) || 0) <= 3\n    ) {\n      return 1;\n    }',
    replace: '    // 变异：双低放行删除',
    tests: ['com-caress'],
    must_mention: '双 ≤3 放行（源逐字）',
  },
  {
    desc: 'M912 COM3 判定不过仍进 B 文（A < V 的 RETURN 0 删）',
    file: 'ere/system/train/com-caress.js',
    find: '  // :161-162 実行できない\n  if (a < v) {\n    return 0;\n  }',
    replace: '  // :161-162 実行できない\n  if (false) {\n    return 0;\n  }',
    tests: ['com-caress'],
    must_mention: 'RETURN 0 且不进 B 文',
  },
  {
    desc: 'M913 COM4 调教者经验写删（CFLAG:22 += 1）',
    file: 'ere/system/train/com-caress.js',
    find: '  era.add(`cflag:${player}:22`, 1); // :71 調教者的経験',
    replace: '  // 变异：经验写删除',
    tests: ['com-caress'],
    must_mention: 'ABL:0 分档',
  },
  {
    desc: 'M914 COM6 兽奸判定修正删（A -= 15 的数值怪癖，打印值仍 (10)）',
    file: 'ere/system/train/com-caress.js',
    find: '    if (tequip(89) && !talent(136)) {\n      minus();\n      a -= 15;',
    replace: '    if (tequip(89) && !talent(136)) {\n      // 变异：修正删除',
    tests: ['com-caress'],
    must_mention: '兽奸',
  },
  {
    desc: 'M915 COM7 处女罚则删（A -= 20 → 判定恒过）',
    file: 'ere/system/train/com-caress.js',
    find: '  if (talent(0)) {\n    minus();\n    a -= 20;',
    replace: '  if (talent(0)) {\n    // 变异：罚则删除',
    tests: ['com-caress'],
    must_mention: '-20 使判定不过',
  },
  {
    desc: 'M916 COM8 最末档乘法对象改 S1（源 :72 乘 SOURCE:2 的逐字怪癖）',
    file: 'ere/system/train/com-caress.js',
    find: '  } else {\n    set(2, times(src(2), 1.8));\n    set(13, times(src(13), 1.5));\n    set(6, 0);\n  }',
    replace:
      '  } else {\n    set(1, times(src(1), 1.8));\n    set(13, times(src(13), 1.5));\n    set(6, 0);\n  }',
    tests: ['com-caress'],
    must_mention: '乘 SOURCE:2 而非 SOURCE:1',
  },
  {
    desc: 'M917 COM9 深入档判据删（EXP:1 ≥ 50 且 ABL:3/欲情双门槛）',
    file: 'ere/system/train/com-caress.js',
    find: "${exp_a >= 50 && deep ? '、舌头伸入到洞里去、有节奏地搅动' : ''}",
    replace: "${deep ? '、舌头伸入到洞里去、有节奏地搅动' : ''}",
    tests: ['com-caress'],
    must_mention: '深入搅动句',
  },
  {
    desc: 'M918 升格 CASE 8 直跳删（PREVCOM == 8 且技巧 3+ 仍回原号）',
    file: 'ere/system/train/com-caress.js',
    find: '  if (\n    era_flag.prevcom === 8 &&\n    (era.get(`abl:${era_flag.player}:12`) || 0) >= 3\n  ) {\n    return 84;\n  }',
    replace: '  // 变异：直跳删除',
    tests: ['com-caress'],
    must_mention: 'PREVCOM == 8 且技巧 3+ 直跳',
  },
  {
    desc: 'M919 升格 CASE 6 的 TFLAG:59 分岔删（G 点系前前回合不再定向 128）',
    file: 'ere/system/train/com-caress.js',
    find: '    if (\n      [20, 128, 129, 130].includes(prev2) &&\n      [120, 121].includes(prev) &&\n      (await adv_target_able(128)) === 1\n    ) {\n      return 128;\n    }',
    replace: '    // 变异：prev2 分岔删除',
    tests: ['com-caress'],
    must_mention: 'TFLAG:59 分岔',
  },
  {
    desc: 'M920 B 分发的 rand 注入改恒 0（rand(3) === 0 永真）',
    file: 'ere/system/train/train-message.js',
    find: '  const branch = await train_message_b_family.call(era_flag.selectcom, {\n    whenMissing: BRANCH_MISSING,\n    args: [rand_source()],\n  });',
    replace:
      '  const branch = await train_message_b_family.call(era_flag.selectcom, {\n    whenMissing: BRANCH_MISSING,\n    args: [() => 0],\n  });',
    tests: ['com-caress'],
    must_mention: 'rand(3)==0 走阴茎支',
  },
  {
    desc: 'M921 A 空支 4/6/7/8/9 改落占位行（no-op 注册改占位输出）',
    file: 'ere/system/train/com-caress.js',
    find: 'for (const id of [4, 6, 7, 8, 9]) {\n  train_message_a_family.register(id, async () => 0);\n}',
    replace:
      'for (const id of [4, 6, 7, 8, 9]) {\n  train_message_a_family.register(id, () => {\n    era.print(`@TRAIN_MESSAGE_A ${id}（变异：占位行）`);\n    return 0;\n  });\n}',
    tests: ['com-caress'],
    must_mention: '不落占位行',
  },
  // —— #218 J8 调教前后事件、自动调教与 E2E 测试 ——
  {
    desc: 'M1050 BEFORETRAIN: 初调教判断错位（train_count === 1 改 !== 1）',
    file: 'ere/event/event-beforetrain.js',
    find: '  if (train_count === 1) {',
    replace: '  if (train_count !== 1) {',
    tests: ['event-beforetrain'],
    must_mention: '初调教与省略设定',
  },
  {
    desc: 'M1051 AFTERTRAIN: 淫乱加成错位（talent:76 漏加）',
    file: 'ere/event/event-aftertrain.js',
    find: '  if (era.get(`talent:${target}:76`)) s += 1; // 淫乱',
    replace: '  // 变异：淫乱漏加',
    tests: ['event-aftertrain'],
    must_mention: 'aftertrain_sex_check',
  },
  {
    desc: 'M1052 AFTERTRAIN: 自慰判定忽略欲望门槛（abl:11 < 2 漏判）',
    file: 'ere/event/event-aftertrain.js',
    find: `  if (
    (era.get(\`abl:\${target}:0\`) || 0) < 3 ||
    (era.get(\`abl:\${target}:11\`) || 0) < 2
  )
    return 0;`,
    replace: `  if (
    (era.get(\`abl:\${target}:0\`) || 0) < 3
  )
    return 0;`,
    tests: ['event-aftertrain'],
    must_mention: 'aftertrain_masturbation_check 自慰检查',
  },
  {
    desc: 'M1053 AUTOTRAIN: 常时发情（talent:271）欲情润滑初值赋错（3000 改 0）',
    file: 'ere/event/event-autotrain.js',
    find: `  if (era.get(\`talent:\${target}:271\`)) {
    chara(target).train.润滑 = 3000;
    chara(target).train.欲情 = 3000;
  }`,
    replace: `  if (era.get(\`talent:\${target}:271\`)) {
    chara(target).train.润滑 = 0;
    chara(target).train.欲情 = 0;
  }`,
    tests: ['event-autotrain'],
    must_mention: 'format_autotrain & before_autotrain',
  },
  {
    desc: 'M1054 AUTOTRAIN: COM3_AUTO 自慰经验不递增',
    file: 'ere/event/event-autotrain.js',
    find: `  chara(target).dungeon.自慰经验 += 1;
  era.print('自慰经验＋１');`,
    replace: `  // 变异：自慰经验不加
  era.print('自慰经验＋１');`,
    tests: ['event-autotrain'],
    must_mention: 'COM3',
  },
  // 回路四环反向变异（M1055-M1058，打在结算/推进公共模块）：
  {
    desc: 'M1055 E2E: 回路第 1 环破环——参数上升切断（UP:0 快C 不写入 delta，使参数无法上升）',
    file: 'ere/event/source-check.js',
    find: '  add_up(0, local0); // PALAM:快Ｃ',
    replace: '  // 变异：不累加快C',
    tests: ['event-corrupt-e2e', 'source-check'],
    must_mention: '角色堕落长跑',
  },
  {
    desc: 'M1056 E2E: 回路第 2 环破环——刻印变化切断（快感达标不授予快乐刻印）',
    file: 'ere/event/source-check.js',
    find: '    chara(cid).system.快乐刻印 = 1;',
    replace: '    // 变异：快乐刻印不赋值',
    tests: ['event-corrupt-e2e', 'source-check'],
    must_mention: '角色堕落长跑',
  },
  {
    desc: 'M1057 E2E: 回路第 3 环破环——COM_ABLE 放行切断（灌肠判定顺从欲望露出门槛改高到 999 永不放行）',
    file: 'ere/system/train/com-sm.js',
    find: '  if (abl(cid, 10) + abl(cid, 11) + abl(cid, 17) < 10) {',
    replace: '  if (abl(cid, 10) + abl(cid, 11) + abl(cid, 17) < 999) {',
    tests: ['event-corrupt-e2e', 'com-sm'],
    must_mention: '角色堕落长跑',
  },
  {
    desc: 'M1058 E2E: 回路第 4 环破环——回合推进切断（调教前不累加调教回数 CFLAG:10）',
    file: 'ere/event/event-beforetrain.js',
    find: '  chara(target).stronghold.调教回数 += 1;',
    replace: '  // 变异：调教回数不加',
    tests: ['event-corrupt-e2e', 'event-beforetrain'],
    must_mention: '角色堕落长跑',
  },
  // —— #221 J11：COM20–29 性交系 ——
  {
    desc: 'M1103 COM22 爱慕三格乘数漏乘（SOURCE:7/16 不翻倍）（#221）',
    file: 'ere/system/train/com-sex.js',
    find: `  const extra = player_skill_source(cid, false);
  // 原作 SIF EXPLV 槽零 >= 3：读数组槽零（0），恒不成立，原样保留。
  if (EXPLV[0] >= 3) add_src(cid, 1, extra);
  if (tal(cid, 85))
    multiply_source(cid, [
      [3, 3],
      [7, 2],
      [16, 2],
    ]);`,
    replace: `  const extra = player_skill_source(cid, false);
  // 原作 SIF EXPLV 槽零 >= 3：读数组槽零（0），恒不成立，原样保留。
  if (EXPLV[0] >= 3) add_src(cid, 1, extra);
  if (tal(cid, 85))
    multiply_source(cid, [
      [3, 3],
      // 变异：漏掉 SOURCE:7/16 的爱慕倍率
    ]);`,
    tests: ['com-sex'],
    must_mention: '成瘾与恭顺不能漏乘',
  },
  {
    desc: 'M1104 COM26–28 欲情段错乘情爱格（SOURCE:3）（#221）',
    file: 'ere/system/train/com-sex.js',
    find: '    set_src(cid, 13, times(src(cid, 13), row[1]));',
    replace: '    set_src(cid, 3, times(src(cid, 3), row[1]));',
    tests: ['com-sex'],
    must_mention: '欲情段乘肛门快感与屈从格',
  },
  {
    desc: 'M1105 COM29 顺从段错用非肛交两列倍率（#221）',
    file: 'ere/system/train/com-sex.js',
    find: `  if (anal) {
    set_src(cid, 2, times(src(cid, 2), row[0]));
    set_src(cid, 3, times(src(cid, 3), row[1]));
    set_src(cid, 15, times(src(cid, 15), row[2]));`,
    replace: `  if (anal) {
    set_src(cid, 3, times(src(cid, 3), row[0]));
    set_src(cid, 15, times(src(cid, 15), row[1]));`,
    tests: ['com-sex'],
    must_mention: '顺从段三格各取独立倍率',
  },
  {
    desc: 'M1106 COM20 高级跳转缺失时删除可见 staged stub（#221）',
    file: 'ere/system/train/com-sex.js',
    find: "  stub_line(`COM${id}`, `指令 ${id} 的升格目标`, '随追加与高级指令票');\n  return 1;",
    replace: '  // 变异：未实现升格目标静默成功\n  return 1;',
    tests: ['com-sex'],
    must_mention: '未实现升格目标必须可见',
  },
  {
    desc: 'M1107 GET_ADV_COM CASE20 SP 命中时提前清 TFLAG:42（#221）',
    file: 'ere/system/train/com-sex.js',
    find: `  if (
    same_trainer() &&
    ((prev2 === 128 && prev === 129) ||
      (prev2 === 129 && prev === 128) ||
      (prev2 === 130 && (prev === 128 || prev === 129)))
  ) {
    if ((await com_able_family.call(130, { whenMissing: 1 })) === 1) return 130;
  }
  set('tflag:42', 0);`,
    replace: `  set('tflag:42', 0); // 变异：SP 分支前清旗
  if (
    same_trainer() &&
    ((prev2 === 128 && prev === 129) ||
      (prev2 === 129 && prev === 128) ||
      (prev2 === 130 && (prev === 128 || prev === 129)))
  ) {
    if ((await com_able_family.call(130, { whenMissing: 1 })) === 1) return 130;
  }`,
    tests: ['com-sex'],
    must_mention: 'SP 保留旗',
  },
  {
    desc: 'M1108 COM24 低欲情档错作 LV1 放行（#221）',
    file: 'ere/system/train/com-sex.js',
    find: `  return below(cid, 5, 1)
    ? 0
    : below(cid, 5, 2)`,
    replace: `  return below(cid, 5, 1)
    ? 1 // 变异：低档错作 LV1
    : below(cid, 5, 2)`,
    tests: ['com-sex'],
    must_mention: '低欲情档不能放行 COM24',
  },
  {
    desc: 'M1109 主启动图删性交系注册（COM20/COM_ABLE20 不进实际运行图）（#221）',
    file: 'ere/system/flow/main-loop.js',
    find: "require('#/system/train/com-sex');",
    replace: '// 变异：性交系不在主启动图注册',
    tests: ['main-loop'],
    must_mention: '主启动图注册性交系',
  },

  {
    desc: 'M1270 AFTERTRAIN: self_check 失神守卫失效（tflag:899 不再拦截）（#218）',
    file: 'ere/event/event-aftertrain.js',
    find: `  // 失神中に調教終了したらスルー
  if ((era.get('tflag:899') || 0) >= 1) {
    return 0;
  }`,
    replace: `  // 变异：失神守卫删除
  if (false) {
    return 0;
  }`,
    tests: ['event-aftertrain'],
    must_mention: '失神跳过守卫',
  },
  {
    desc: 'M1271 AFTERTRAIN: sex_check 未成熟闸失效（TALENT:135 放行）（#218）',
    file: 'ere/event/event-aftertrain.js',
    find: `  if (era.get(\`talent:\${target}:135\`)) return 0; // 未成熟
  if (!era.get(\`talent:\${target}:85\`) && !era.get(\`talent:\${target}:76\`))
    return 0; // 爱慕 / 淫乱`,
    replace: `  // 变异：未成熟闸删除
  if (!era.get(\`talent:\${target}:85\`) && !era.get(\`talent:\${target}:76\`))
    return 0; // 爱慕 / 淫乱`,
    tests: ['event-aftertrain'],
    must_mention: '未成熟',
  },
  {
    desc: 'M1272 AFTERTRAIN: sex_check 处女/男人闸失效（TALENT:0/122 放行）（#218）',
    file: 'ere/event/event-aftertrain.js',
    find: `  if (era.get(\`talent:\${target}:0\`) || era.get(\`talent:\${target}:122\`))
    return 0; // 处女 / 男性

  // 贞操带 / 贞操封印`,
    replace: `  // 变异：处女/男人闸删除

  // 贞操带 / 贞操封印`,
    tests: ['event-aftertrain'],
    must_mention: '处女',
  },
  {
    desc: 'M1273 AFTERTRAIN: sex_check 濒死闸失效（BASE<500 放行）（#218）',
    file: 'ere/event/event-aftertrain.js',
    find: `  // 主人为男性或扶她
  if (!era.get('talent:0:122') && !era.get('talent:0:121')) return 0;
  if ((era.get(\`base:\${target}:0\`) || 0) < 500) return 0; // 濒死`,
    replace: `  // 主人为男性或扶她
  if (!era.get('talent:0:122') && !era.get('talent:0:121')) return 0;
  // 变异：濒死闸删除`,
    tests: ['event-aftertrain'],
    must_mention: '濒死',
  },
  {
    desc: 'M1274 AFTERTRAIN: self_check 派发优先——男人不再恒走肛门（#218）',
    file: 'ere/event/event-aftertrain.js',
    find: `  if (is_male || (!is_male && abl2 < abl3) || (is_virgin && abl3 >= 3)) {
    s = await aftertrain_analsex_check();
  } else {
    s = await aftertrain_sex_check();
  }`,
    replace: `  if ((!is_male && abl2 < abl3) || (is_virgin && abl3 >= 3)) {
    s = await aftertrain_analsex_check();
  } else {
    s = await aftertrain_sex_check();
  }`,
    tests: ['event-aftertrain'],
    must_mention: '男人必须走肛门分支',
  },
  {
    desc: 'M1275 AFTERTRAIN: self_check 派发——处女且 A≥3 不再恒走肛门（#218）',
    file: 'ere/event/event-aftertrain.js',
    find: `  if (is_male || (!is_male && abl2 < abl3) || (is_virgin && abl3 >= 3)) {
    s = await aftertrain_analsex_check();
  } else {
    s = await aftertrain_sex_check();
  }`,
    replace: `  if (is_male || (!is_male && abl2 < abl3) || false) {
    s = await aftertrain_analsex_check();
  } else {
    s = await aftertrain_sex_check();
  }`,
    tests: ['event-aftertrain'],
    must_mention: '处女且 A感觉≥3 → 肛门',
  },
  {
    desc: 'M1276 AFTERTRAIN: lesbian 四项素质门槛之一失效（百合气质<2 放行）（#218）',
    file: 'ere/event/event-aftertrain.js',
    find: `  if (abl22 < 2 || abl0 < 3 || abl10 < 2 || abl11 < 2) return 0;`,
    replace: `  if (abl0 < 3 || abl10 < 2 || abl11 < 2) return 0; // 变异：百合气质门槛删`,
    tests: ['event-aftertrain'],
    must_mention: '百合气质',
  },
  {
    desc: 'M1277 AFTERTRAIN: masturbation 从不自慰闸失效（TALENT:150 放行）（#218）',
    file: 'ere/event/event-aftertrain.js',
    find: `  if (era.get(\`talent:\${target}:150\`)) return 0; // 从不自慰`,
    replace: `  // 变异：从不自慰闸删除`,
    tests: ['event-aftertrain'],
    must_mention: '从不自慰',
  },
  {
    desc: 'M1278 AFTERTRAIN: beast 无野狗闸失效（ITEM:22==0 放行）（#218）',
    file: 'ere/event/event-aftertrain.js',
    find: `  if ((era.get('item:22') || 0) === 0) return 0;`,
    replace: `  // 变异：无野狗闸删除`,
    tests: ['event-aftertrain'],
    must_mention: '无野狗',
  },
  {
    desc: 'M1279 BEFORETRAIN: 省略设定早退失效（FLAG:6&1 不再返回 0）（#218）',
    file: 'ere/event/event-beforetrain.js',
    find: `  // 調教テキスト省略設定の場合 (FLAG:6 & 1)
  if ((era.get('flag:6') || 0) & 1) {
    era.print(\`\${target_name}的第\${train_count}次调教开始了。\`);
    await era.waitAnyKey();
    return 0;
  }`,
    replace: `  // 变异：省略设定不早退
  if ((era.get('flag:6') || 0) & 1) {
    era.print(\`\${target_name}的第\${train_count}次调教开始了。\`);
    await era.waitAnyKey();
  }`,
    tests: ['event-beforetrain'],
    must_mention: '省略设定（FLAG:6 & 1）只输出一句并返回 0',
  },
  {
    desc: 'M1280 BEFORETRAIN: 第N次调教崩坏分支失效（TALENT:9 不再特殊叙述）（#218）',
    file: 'ere/event/event-beforetrain.js',
    find: `  // 崩坏している場合
  if (era.get(\`talent:\${target}:9\`)) {`,
    replace: `  // 变异：崩坏分支删除
  if (false) {`,
    tests: ['event-beforetrain'],
    must_mention: '第 N 次调教——崩坏分支',
  },
  {
    desc: 'M1281 BEFORETRAIN: noclothes 反抗心分支失效（TALENT:11 落兜底）（#218）',
    file: 'ere/event/event-beforetrain.js',
    find: `  } else if (era.get(\`talent:\${target}:11\`)) {
    // 反抗心
    era.print(\`\${master_name}伸手粗暴地将\${name}剥光。\`);`,
    replace: `  } else if (false) {
    // 变异：反抗心分支删除
    era.print(\`\${master_name}伸手粗暴地将\${name}剥光。\`);`,
    tests: ['event-beforetrain'],
    must_mention: '伸手粗暴地将玛奥剥光',
  },
  {
    desc: 'M1282 AUTOTRAIN: com13 体力门槛失效（BASE:0<500 放行）（#218）',
    file: 'ere/event/event-autotrain.js',
    find: `  const target = era_flag.target;
  if ((era.get(\`base:\${target}:0\`) || 0) < 500) return 0;
  if ((era.get(\`base:\${target}:1\`) || 0) < 300) return 0;`,
    replace: `  const target = era_flag.target;
  // 变异：体力门槛删除
  if ((era.get(\`base:\${target}:1\`) || 0) < 300) return 0;`,
    tests: ['event-autotrain'],
    must_mention: '体力<500 必须拦下',
  },
  {
    desc: 'M1283 AUTOTRAIN: com13 气力门槛失效（BASE:1<300 放行）（#218）',
    file: 'ere/event/event-autotrain.js',
    find: `  if ((era.get(\`base:\${target}:0\`) || 0) < 500) return 0;
  if ((era.get(\`base:\${target}:1\`) || 0) < 300) return 0;`,
    replace: `  if ((era.get(\`base:\${target}:0\`) || 0) < 500) return 0;
  // 变异：气力门槛删除`,
    tests: ['event-autotrain'],
    must_mention: '气力<300 必须拦下',
  },
  {
    desc: 'M1284 AUTOTRAIN: after_autotrain 常时发情蓄积闸失效（flag:75==0 恒蓄积）（#218）',
    file: 'ere/event/event-autotrain.js',
    find: `  // 常时发情
  if ((era.get('flag:75') || 0) === 0 && !era.get(\`talent:\${target}:271\`)) {`,
    replace: `  // 变异：常时发情闸删除
  if (true && !era.get(\`talent:\${target}:271\`)) {`,
    tests: ['event-autotrain'],
    must_mention:
      'after_autotrain 常时发情蓄积（flag:75 与 TALENT:271 两道闸）',
  },
  {
    desc: 'M1285 AUTOTRAIN: autotrain 遍历跳过 cflag:666==0 失效（#218）',
    file: 'ere/event/event-autotrain.js',
    find: `    if ((era.get(\`cflag:\${target}:666\`) || 0) === 0) {
      continue;
    }`,
    replace: `    // 变异：跳过逻辑删除
    if (false) {
      continue;
    }`,
    tests: ['event-autotrain'],
    must_mention: 'cflag:666==0 的角色必须跳过',
  },
  {
    desc: 'M1230 COM_ABLE80 调教者男性器判定删除（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: '  if (!tal(player, 121) && !tal(player, 122)) return 0; // 调教者需男人/扶她\n  if (tequip(target, 45)) return 0; // 口枷使用中',
    replace:
      '  if (tequip(target, 45)) return 0; // 变异：调教者男性器判定删除',
    tests: ['com-hardcore'],
    must_mention: '调教者未配男性器',
  },
  {
    desc: 'M1231 COM_ABLE85 利尿剂/漏尿癖改判为需同时具备（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: '  if (!tequip(target, 22) && !tal(target, 57)) return 0; // 需利尿剂或漏尿癖',
    replace:
      '  if (!tequip(target, 22) || !tal(target, 57)) return 0; // 变异：改判为需同时具备',
    tests: ['com-hardcore'],
    must_mention: '需利尿剂或漏尿癖',
  },
  {
    desc: 'M1232 COM_ABLE87 顺从门槛 3 误抄为 2（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: '  if (abl(target, 10) < 3) return 0;\n  if (tequip(target, 11)) return 0;',
    replace:
      '  if (abl(target, 10) < 2) return 0; // 变异：门槛误抄为 2\n  if (tequip(target, 11)) return 0;',
    tests: ['com-hardcore'],
    must_mention: '顺从不足 3',
  },
  {
    desc: 'M1233 COM_ABLE90 需超乳判定删除（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: '  if (!tal(target, 119)) return 0; // 需超乳\n  return 1;\n}',
    replace: '  return 1; // 变异：需超乳判定删除\n}',
    tests: ['com-hardcore'],
    must_mention: '需超乳',
  },
  {
    desc: 'M1234 COM80 死判定块的 SOURCE:8 汚れ常量 100 误改 200（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: '  set(8, 100);\n  if (abl(target, 16) === 0) {',
    replace:
      '  set(8, 200); // 变异：汚れ常量误改 200\n  if (abl(target, 16) === 0) {',
    tests: ['com-hardcore'],
    must_mention: 'SOURCE:8 简化为 100',
  },
  {
    desc: 'M1235 COM81 私处经验增量 25 误抄为 10（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: "  if (tal(target, 99)) set(6, src(6) * 0.8); // 魁梧\n  if (tal(target, 100)) set(6, src(6) * 2.0); // 小柄体形\n  if (tal(target, 135)) set(6, src(6) * 4.0); // 未熟\n\n  if (!tal(target, 122) && !tal(player, 122)) {\n    era.print(`${name_of('expname', 40)}+1`);\n    era.add(`exp:${target}:40`, 1);\n  } else if (tal(target, 122) && tal(player, 122)) {\n    era.print(`${name_of('expname', 41)}+1`);\n    era.add(`exp:${target}:41`, 1);\n  }\n\n  chara(target).dungeon.私处经验 += 25;",
    replace:
      "  if (tal(target, 99)) set(6, src(6) * 0.8); // 魁梧\n  if (tal(target, 100)) set(6, src(6) * 2.0); // 小柄体形\n  if (tal(target, 135)) set(6, src(6) * 4.0); // 未熟\n\n  if (!tal(target, 122) && !tal(player, 122)) {\n    era.print(`${name_of('expname', 40)}+1`);\n    era.add(`exp:${target}:40`, 1);\n  } else if (tal(target, 122) && tal(player, 122)) {\n    era.print(`${name_of('expname', 41)}+1`);\n    era.add(`exp:${target}:41`, 1);\n  }\n\n  chara(target).dungeon.私处经验 += 10; // 变异：增量误抄为 10",
    tests: ['com-hardcore'],
    must_mention: '拳交，私处经验',
  },
  {
    desc: 'M1236 COM83 肛门扩张经验（EXP:53）累加行删除（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: "  chara(target).dungeon.肛门扩张经验 += 3;\n  era.print('肛门扩张经验＋3');",
    replace: "  era.print('肛门扩张经验＋3'); // 变异：EXP:53 累加行删除",
    tests: ['com-hardcore'],
    must_mention: '肛门扩张经验',
  },
  {
    desc: 'M1237 COM_ABLE83 男人判定挡删除（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: '  if (tal(target, 122)) return 0;\n  if (exp(target, 0) < 150 || exp(target, 1) < 150) return 0;',
    replace:
      '  if (exp(target, 0) < 150 || exp(target, 1) < 150) return 0; // 变异：男人判定挡删除',
    tests: ['com-hardcore'],
    must_mention: '男人挡',
  },
  {
    desc: 'M1238 COM84 显式回填 SELECTCOM=84 删除（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: "  era.print('刺激Ｇ点');\n  era_flag.selectcom = 84; // 原作显式 SELECTCOM = 84（升格抵达时回填号位）",
    replace: "  era.print('刺激Ｇ点'); // 变异：显式回填删除",
    tests: ['com-hardcore'],
    must_mention: '原作显式 SELECTCOM',
  },
  {
    desc: 'M1239 COM85 放尿经验增量 2 误抄为 1（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: "  era.print(`${name_of('expname', 31)}＋２`);\n  chara(target).system.放尿经验 += 2;",
    replace:
      "  era.print(`${name_of('expname', 31)}＋２`);\n  chara(target).system.放尿经验 += 1; // 变异：增量误抄为 1",
    tests: ['com-hardcore'],
    must_mention: '放尿经验经',
  },
  {
    desc: 'M1240 COM87 取环位运算 cflag7 - p 误写为 cflag7 | p（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: '  if (cflag7 & p) {\n    era.set(`cflag:${target}:7`, cflag7 - p);',
    replace:
      '  if (cflag7 & p) {\n    era.set(`cflag:${target}:7`, cflag7 | p); // 变异：应减位却或位',
    tests: ['com-hardcore'],
    must_mention: '乳头位已清',
  },
  {
    desc: 'M1241 COM88 使役 PLAY 开关切换判定反转（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: '  if (tequip(target, 88)) {\n    era.set(`tequip:${target}:88`, 0);\n  } else {\n    era.set(`tequip:${target}:88`, 1);\n  }',
    replace:
      '  if (!tequip(target, 88)) {\n    // 变异：判定反转\n    era.set(`tequip:${target}:88`, 0);\n  } else {\n    era.set(`tequip:${target}:88`, 1);\n  }',
    tests: ['com-hardcore'],
    must_mention: '开关切换',
  },
  {
    desc: 'M1242 COM90 乳内插入旗标（CFLAG:113）赋值删除（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: '  era.set(`cflag:${target}:113`, 1); // 乳房挿入フラグ\n  await com_ejac_player_sex();',
    replace: '  await com_ejac_player_sex(); // 变异：乳房插入旗标赋值删除',
    tests: ['com-hardcore'],
    must_mention: '乳房插入旗标',
  },
  {
    desc: 'M1243 EQUIP_COM89 尾段 T 收尾清零删除，跨回合残留（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: "  chara(target).dungeon.兽奸经验 += t_final;\n  era.set('t:0', 0);",
    replace:
      '  chara(target).dungeon.兽奸经验 += t_final; // 变异：T 收尾清零删除',
    tests: ['com-hardcore'],
    must_mention: '尾段清零共享变量',
  },
  {
    desc: 'M1244 EQUIP_COM89 GOTO END_EJAC 默认 E 误设为 1（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: '  let e = 0;\n  if ((era.get(`maxbase:${player_master}:4`) || 0) !== 0) {',
    replace:
      '  let e = 1; // 变异：GOTO 命中默认值误设为 1\n  if ((era.get(`maxbase:${player_master}:4`) || 0) !== 0) {',
    tests: ['com-hardcore'],
    must_mention: 'E 默认值 0',
  },
  {
    desc: 'M1245 EQUIP_COM89 GOTO END_EJAC 误跳过 TFLAG:16 尾段写入（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: "  game.event.犬射精或处刑口上 = e;\n  const t_final = era.get('t:0') || 0;",
    replace:
      "  if ((era.get(`maxbase:${player_master}:4`) || 0) !== 0)\n    game.event.犬射精或处刑口上 = e; // 变异：GOTO 命中时误跳过\n  const t_final = era.get('t:0') || 0;",
    tests: ['com-hardcore'],
    must_mention: 'E 默认值 0',
  },
  {
    desc: 'M1246 GET_ADV_COM CASE 80 上回合是 3P 判据删除（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: '  const prev = era_flag.prevcom;\n  if (prev === 64) {',
    replace:
      '  const prev = era_flag.prevcom;\n  if (false) {\n    // 变异：3P 判据删除',
    tests: ['com-hardcore'],
    must_mention: '上回合是 3P',
  },
  {
    desc: 'M1247 TRAIN_MESSAGE_B90 从真实无输出改为打印文本（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: 'train_message_b_family.register(90, async () => 0);',
    replace:
      "train_message_b_family.register(90, async () => era.print('变异：90 不应有输出'));",
    tests: ['com-hardcore'],
    must_mention: '真实无输出',
  },
  {
    desc: 'M1248 TRAIN_MESSAGE_A81-89 显式无操作批量注册删除（#226）',
    file: 'ere/system/train/com-hardcore.js',
    find: 'for (const id of [81, 82, 83, 84, 85, 87, 88, 89]) {\n  train_message_a_family.register(id, async () => 0); // 源侧无专属分支\n}',
    replace: '// 变异：81-89 的显式无操作批量注册删除',
    tests: ['com-hardcore'],
    must_mention: '显式无操作',
  },
  {
    desc: 'M1249 主启动图删重度调教系注册（COM80/COM_ABLE80 不进实际运行图）（#226）',
    file: 'ere/system/flow/main-loop.js',
    find: "require('#/system/train/com-hardcore');",
    replace: '// 变异：重度调教系不在主启动图注册',
    tests: ['main-loop'],
    must_mention: '主启动图注册重度调教系',
  },
  {
    desc: 'M1190 COM51 药物经验五档首档偏移（EXP:57=0 错落下一档）',
    file: 'ere/system/train/com-special.js',
    find: `function drug_exp_level(value) {
  if (value < EXPLV[1]) return 0;`,
    replace: `function drug_exp_level(value) {
  if (value < EXPLV[1] - 1) return 0;`,
    tests: ['com-special'],
    must_mention: '调合知识、药物经验与成瘾状态',
  },
  {
    desc: 'M1191 EQUIP_COM53 首 tick 改为直接录帧',
    file: 'ere/system/train/com-special.js',
    find: `  if (frame === 0) {
    chara(cid).train.录像时间 += 1; // :63-65 首 tick 不记入录像
  } else if (frame <= video_max) {`,
    replace: `  if (frame === 0) {
    chara(cid).train.录像时间 += 1;
    set_video_record(cid, frame, era_flag.selectcom); // 变异：首 tick 录帧
  } else if (frame <= video_max) {`,
    tests: ['com-special'],
    must_mention: '首个持续 tick 不录帧',
  },
  {
    desc: 'M1192 EQUIP_COM53 充能上限 5 改 6（第六次不关机）',
    file: 'ere/system/train/com-special.js',
    find: '      if (chara(cid).train.水晶球充能次数 <= 5) {',
    replace: '      if (chara(cid).train.水晶球充能次数 <= 6) {',
    tests: ['com-special'],
    must_mention: '充能先注册按钮，成功时双扣资金，选择停止时清充能',
  },
  {
    desc: 'M1193 COM54 野外露出经验标志守卫删（重复取得异常经验）',
    file: 'ere/system/train/com-special.js',
    find: `  if (!chara(cid).train.野外露出经验) {
    era.print('异常经验＋１');`,
    replace: `  if (true) {
    era.print('异常经验＋１');`,
    tests: ['com-special'],
    must_mention: '首次开启记录野外露出经验',
  },
  {
    desc: 'M1194 COM55 气力损耗 10 改为 0',
    file: 'ere/system/train/com-special.js',
    find: `  era.print('什么都不做');
  add_lose(cid, 1, 10);`,
    replace: `  era.print('什么都不做');
  add_lose(cid, 1, 0);`,
    tests: ['com-special'],
    must_mention: '放置PLAY',
  },
  {
    desc: 'M1195 COM56 歌唱经验实际值改为显示值（原作差 1 消失）',
    file: 'ere/system/train/com-special.js',
    find: '    chara(cid).train.歌唱经验 += gain + abl(cid, 71) - 3;',
    replace: '    chara(cid).train.歌唱经验 += gain + abl(cid, 71) - 2;',
    tests: ['com-special'],
    must_mention: '显示 +6，实际加 E+ABL-3 = 5',
  },
  {
    desc: 'M1196 COM57 爱情经验露出门槛 3 降为 2',
    file: 'ere/system/train/com-special.js',
    find: '    abl(cid, 17) >= 3 &&',
    replace: '    abl(cid, 17) >= 2 &&',
    tests: ['com-special'],
    must_mention: 'COM57：开关、爱情经验与持续效果',
  },
  {
    desc: 'M1197 COM58 关闭时先清浴室再清淋浴',
    file: 'ere/system/train/com-special.js',
    find: `  if (chara(cid).train.浴室PLAY) {
    if (chara(cid).train.淋浴中) chara(cid).train.淋浴中 = 0; // :13-14 必须先清淋浴
    chara(cid).train.浴室PLAY = 0; // :15`,
    replace: `  if (chara(cid).train.浴室PLAY) {
    chara(cid).train.浴室PLAY = 0;
    if (chara(cid).train.淋浴中) chara(cid).train.淋浴中 = 0;`,
    tests: ['com-special'],
    must_mention: '关闭时必须先清淋浴，再清浴室位',
  },
  {
    desc: 'M1198 COM59 新妻主人经验的爱慕条件删',
    file: 'ere/system/train/com-special.js',
    find: '  if (tal(cid, 85)) game.train.主人经验 += 20;',
    replace: '  // 变异：爱慕条件删',
    tests: ['com-special'],
    must_mention: '主人经验四条件',
  },
  {
    desc: 'M1199 COM_ABLE50 器具过滤守卫删',
    file: 'ere/system/train/com-special.js',
    find: '    game.train.指令过滤 & 2 ||',
    replace: '    false ||',
    tests: ['com-special'],
    must_mention: '器具过滤、药物抗性、连续利尿各自拦截',
  },
  {
    desc: 'M1200 COM_ABLE51 抗药性守卫删',
    file: 'ere/system/train/com-special.js',
    find: '  if (tal(cid, 56) || tq(cid, 55)) return 0;',
    replace: '  if (tq(cid, 55)) return 0;',
    tests: ['com-special'],
    must_mention: '器具过滤、药物抗性、连续利尿各自拦截',
  },
  {
    desc: 'M1201 COM_ABLE52 连续利尿剂守卫删',
    file: 'ere/system/train/com-special.js',
    find: '  if (chara(cid).system.利尿剂 || tq(cid, 59) || tq(cid, 55)) return 0;',
    replace: '  if (tq(cid, 59) || tq(cid, 55)) return 0;',
    tests: ['com-special'],
    must_mention: '器具过滤、药物抗性、连续利尿各自拦截',
  },
  {
    desc: 'M1202 COM_ABLE53 索求口上抑制守卫删',
    file: 'ere/system/train/com-special.js',
    find: '  if (game.train.索求口上抑制 === 555) return 0;',
    replace: '  // 变异：索求口上抑制守卫删',
    tests: ['com-special'],
    must_mention: '录像解除随时、野外门槛、死斗与失神门',
  },
  {
    desc: 'M1203 COM_ABLE54 顺从抖M双门槛降为 2',
    file: 'ere/system/train/com-special.js',
    find: '(abl(cid, 10) <= 2 && abl(cid, 21) <= 2)',
    replace: '(abl(cid, 10) <= 1 && abl(cid, 21) <= 1)',
    tests: ['com-special'],
    must_mention: '录像解除随时、野外门槛、死斗与失神门',
  },
  {
    desc: 'M1204 COM_ABLE57 镜子道具守卫删',
    file: 'ere/system/train/com-special.js',
    find: '  if (!has_item(16) || abl(cid, 10) <= 1) return 0;',
    replace: '  if (abl(cid, 10) <= 1) return 0;',
    tests: ['com-special'],
    must_mention: '镜子、浴室及新妻的关键门槛',
  },
  {
    desc: 'M1205 COM_ABLE58 着衣守卫删',
    file: 'ere/system/train/com-special.js',
    find: `  if (
    worn &&
    era.get('flag:37') &&
    (worn !== 64 || (era.get(\`cflag:\${cid}:42\`) || 0) <= 70)
  )
    return 0;`,
    replace: '  // 变异：着衣守卫删',
    tests: ['com-special'],
    must_mention: '镜子、浴室及新妻的关键门槛',
  },
  {
    desc: 'M1206 COM_ABLE59 助手守卫删',
    file: 'ere/system/train/com-special.js',
    find: '  if (!has_item(19) || era_flag.assiplay || abl(cid, 0) <= 2) return 0;',
    replace: '  if (!has_item(19) || abl(cid, 0) <= 2) return 0;',
    tests: ['com-special'],
    must_mention: '镜子、浴室及新妻的关键门槛',
  },
  {
    desc: 'M1207 COM_ABLE59 着衣守卫删',
    file: 'ere/system/train/com-special.js',
    find: "  return (era.get(`cflag:${cid}:40`) || 0) && era.get('flag:37') ? 0 : 1;",
    replace: '  return 1; // 变异：着衣守卫删',
    tests: ['com-special'],
    must_mention: '镜子、浴室及新妻的关键门槛',
  },
  {
    desc: 'M1208 COM_ABLE58 助手动物耳朵门槛删',
    file: 'ere/system/train/com-special.js',
    find: `  if (
    era_flag.assi > 0 &&
    tal(era_flag.assi, 124) &&
    abl(era_flag.assi, 10) <= 2
  )
    return 0;`,
    replace: '  // 变异：助手动物耳朵门槛删',
    tests: ['com-special'],
    must_mention: '镜子、浴室及新妻的关键门槛',
  },
  {
    desc: 'M1209 TRAIN_MESSAGE_B53 启停文案反转',
    file: 'ere/system/train/com-special.js',
    find: `    chara(target_id()).train.录像摄影
      ? '★★★录像摄影结束★★★'
      : '★★★录像摄影开始★★★',`,
    replace: `    chara(target_id()).train.录像摄影
      ? '★★★录像摄影开始★★★'
      : '★★★录像摄影结束★★★',`,
    tests: ['com-special'],
    must_mention: '启动只清 480–489',
  },
  {
    desc: 'M1210 TRAIN_MESSAGE_B54 返回房间文案删',
    file: 'ere/system/train/com-special.js',
    find: `  if (chara(cid).train.野外PLAY) {
    era.print('回到了房间……');
    return;
  }`,
    replace: `  if (chara(cid).train.野外PLAY) {
    return;
  }`,
    tests: ['com-special'],
    must_mention: '首次开启记录野外露出经验',
  },
  {
    desc: 'M1212 COM57 将 TALENT:80 后无条件的 B 倍率误并入条件',
    file: 'ere/system/train/com-special.js',
    find: '  if (tal(cid, 80)) a = times(a, 150);\n  b = times(b, 120);',
    replace:
      '  if (tal(cid, 80)) {\n    a = times(a, 150);\n    b = times(b, 120);\n  }',
    tests: ['com-special'],
    must_mention: 'SIF 只约束下一条语句',
  },
  {
    desc: 'M1213 COM57 将 TALENT:113 后无条件效果误并入条件',
    file: 'ere/system/train/com-special.js',
    find: `  if (tal(cid, 113)) add_src(cid, 3, 500);
  add_src(cid, 16, 500);
  a = times(a, 150);
  b = times(b, 120);`,
    replace: `  if (tal(cid, 113)) {
    add_src(cid, 3, 500);
    add_src(cid, 16, 500);
    a = times(a, 150);
    b = times(b, 120);
  }`,
    tests: ['com-special'],
    must_mention: 'SIF 只约束下一条语句',
  },
  {
    desc: 'M1214 主启动图删特殊系注册（COM50/COM_ABLE50 不进实际运行图）（#224）',
    file: 'ere/system/flow/main-loop.js',
    find: "require('#/system/train/com-special');",
    replace: '// 变异：特殊系不在主启动图注册',
    tests: ['main-loop'],
    must_mention: '主启动图注册特殊系',
  },
  {
    desc: 'M1211 TRAIN_MESSAGE_A55 欲情输出阈值反转',
    file: 'ere/system/train/com-special.js',
    find: "  if ((era.get('tflag:899') || 0) > 1 || palam(cid, 5) < PALAMLV[3]) return;",
    replace:
      "  if ((era.get('tflag:899') || 0) > 1 || palam(cid, 5) >= PALAMLV[3]) return;",
    tests: ['com-special'],
    must_mention: 'SOURCE_CHECK 调用时输出原作反应',
  },
  {
    desc: 'M1310 AFTERTRAIN: sex_check 经验落点改回肛门（exp:0 → exp:1）（#270）',
    file: 'ere/event/event-aftertrain.js',
    find: '  chara(target).dungeon.私处经验 += s;',
    replace: '  chara(target).dungeon.肛门经验 += s; // 变异：落点改回肛门',
    tests: ['event-aftertrain'],
    must_mention: 'aftertrain_sex_check 通常性交与 ABL 判定',
  },
  {
    desc: 'M1311 AFTERTRAIN: sex_check 缺 TFLAG:13=4 与 SELF_KOJO（#270）',
    file: 'ere/event/event-aftertrain.js',
    find: `  // 源 :231-232：TFLAG:13 = 4; CALL SELF_KOJO（在 PRINTFORML %EXPNAME:0% 之前）
  game.train.初吻与自我口上 = 4;
  await self_kojo();`,
    replace: '  // 变异：性交臂不设 tflag:13、不调 self_kojo',
    tests: ['event-aftertrain'],
    must_mention: 'aftertrain_sex_check 通常性交与 ABL 判定',
  },
  {
    desc: 'M1312 AFTERTRAIN: lesbian 臂漏设 tflag:13=2（#270）',
    file: 'ere/event/event-aftertrain.js',
    find: `  // 源 :480-481：TFLAG:13 = 2; CALL SELF_KOJO
  game.train.初吻与自我口上 = 2;`,
    replace: `  // 变异：百合臂不设 tflag:13
  // game.train.初吻与自我口上 = 2;`,
    tests: ['event-aftertrain'],
    must_mention: 'aftertrain_lesbiansex_check 百合性交',
  },
  {
    desc: 'M1313 AFTERTRAIN: masturbation 臂漏设 tflag:13=1（#270）',
    file: 'ere/event/event-aftertrain.js',
    find: `  // 源 :669-670：TFLAG:13 = 1; CALL SELF_KOJO
  game.train.初吻与自我口上 = 1;`,
    replace: `  // 变异：自慰臂不设 tflag:13
  // game.train.初吻与自我口上 = 1;`,
    tests: ['event-aftertrain'],
    must_mention: 'aftertrain_masturbation_check 自慰检查',
  },
  {
    desc: 'M1314 AFTERTRAIN: 兽奸报告二次累加改成 b（把原作 A 残留「修好」）（#270）',
    file: 'ere/event/event-aftertrain.js',
    find: '    era.add(`juel:${target}:8`, leftover_a * 200);',
    replace:
      '    era.add(`juel:${target}:8`, b * 200); // 变异：把原作 A 残留修好成 B',
    tests: ['event-aftertrain'],
    must_mention: '兽奸报告二次累加 A≠B 时按自慰回数而非兽奸回数',
  },
];
