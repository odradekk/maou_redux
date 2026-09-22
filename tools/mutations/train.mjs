// 变异条目表切片：ere/system/（回合循环、珠结算、指令判定、系统流转）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用锚点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 926; // 598（共同祖先，含 #461 的 M9769-M9787）+ 92（#462：M9589-M9648 + M9836-M9867）+ 54（#465：M9900-M9953）+ 80（#466：M10400-M10479）+ 25（#467：M10500-M10524）+ 54（#491：M10525-M10578）+ 10（#491 第二步：M10579-M10588）+ 13（#512 第一步：M10920-M10932）——合并时按编号集合验并集，数字取自导入实测的条目数而非相加

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
    find: '    } else if (ABLUP_IDS.includes(result)) {',
    replace: '    } else if (false && ABLUP_IDS.includes(result)) {',
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
    find: '  if (tflag15 > 0 && tequip55) {',
    replace: '  if (false) { // 变异：TFLAG:15 死斗场两臂删',
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
    desc: 'M1043 SHOW_EQUIP_2 整段调用删（#390 起真身在 chara-equip-status.js）',
    file: 'ere/page/page-train.js',
    find: '  show_equip_2(target);',
    replace: '  // 变异：装备显示整段删',
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
    desc: 'M1211 TRAIN_MESSAGE_A55 欲情输出阈值反转（#402 起靶 train-message.js 的链末支）',
    file: 'ere/system/train/train-message.js',
    find: '  if (palam(target, 5) < PALAMLV[3]) {\n    return;\n  }',
    replace: '  if (palam(target, 5) >= PALAMLV[3]) {\n    return;\n  }',
    tests: ['com-special', 'train-message'],
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
  leftover_s = s;
  game.train.初吻与自我口上 = 4;
  await self_kojo();`,
    replace: `  leftover_s = s;
  // 变异：性交臂不设 tflag:13、不调 self_kojo`,
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
  leftover_q = q;
  game.train.初吻与自我口上 = 1;`,
    replace: `  // 变异：自慰臂不设 tflag:13
  leftover_q = q;
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
  // —— #222 J12：COM30–38 奉仕系 ——
  {
    desc: 'M1110 COM34/36 骑乘位衣物判定把目标号漏传（#222）',
    file: 'ere/system/train/com-service.js',
    find: `  if (target_tequip(58) && !(era.get('item:13') || 0) && !era.get('noitem:0'))
    return 0;
  if (costume_blocked(target, 17)) return 0;
  if (special(target) === 79 && worn(target) & 64 && clothes_on()) return 0;`,
    replace: `  if (target_tequip(58) && !(era.get('item:13') || 0) && !era.get('noitem:0'))
    return 0;
  if (costume_blocked(17)) return 0; // 变异：误把位掩码当目标号
  if (special(target) === 79 && worn(target) & 64 && clothes_on()) return 0;`,
    tests: ['com-service'],
    must_mention: 'COM_ABLE30-38',
  },
  {
    desc: 'M1111 COM34/36 骑乘反应去掉「未射精才追加」的门（#222；#402 起靶位挪到 riding 尾段）',
    file: 'ere/system/train/com-service.js',
    find: "  if ((era.get('tflag:2') || 0) === 0) train_message_a_riding_reaction();",
    replace:
      '  train_message_a_riding_reaction(); // 变异：射精时也追加 UP:2 反应',
    tests: ['com-service'],
    must_mention: 'COM34/36 复用性交尾段',
  },
  {
    desc: 'M1112 严格 TIMES 退回浮点向下取整（#222）',
    file: 'ere/system/train/com-service.js',
    find: '  return Number((BigInt(value_to_multiply) * numerator) / denominator);',
    replace:
      '  return Math.floor(value_to_multiply * rate); // 变异：JS 浮点截断',
    tests: ['com-service'],
    must_mention: '严格 TIMES',
  },
  {
    desc: 'M1113 B 文公共尾部不把 TFLAG:31 的连续态归一（#222）',
    file: 'ere/system/train/train-message.js',
    find: '  game.event.本次调教处女丧失 = virgin_blood === 2 ? 1 : 0;',
    replace: '  game.event.本次调教处女丧失 = 0; // 变异：连续插入也清零',
    tests: ['com-service'],
    must_mention: '正常末尾归一 TFLAG:31',
  },
  {
    desc: 'M1115 COM35 玩家执行时把标准污渍误写固定 0 号（#222）',
    file: 'ere/system/train/com-service.js',
    find: '  set_standard_stain(era_flag.assiplay ? era_flag.assi : era_flag.player);',
    replace: '  set_standard_stain(era_flag.assiplay ? era_flag.assi : 0);',
    tests: ['com-service'],
    must_mention: 'COM35：玩家执行时重置玩家',
  },
  {
    desc: 'M1116 升格回合把 PREVCOM 错存执行入口而非 SELECTCOM（#222）',
    file: 'ere/system/train/train-loop.js',
    find: '  era_flag.prevcom = era_flag.selectcom;',
    replace: '  era_flag.prevcom = result; // 变异：丢掉高级 COM 回填号',
    tests: ['train-loop'],
    must_mention: '升格回合：COM8 跳到 COM84 后 PREVCOM 保留回填的 SELECTCOM',
  },
  {
    desc: 'M1114 主启动图删奉仕系注册（COM30/COM_ABLE30 不进实际运行图）（#222）',
    file: 'ere/system/flow/main-loop.js',
    find: "require('#/system/train/com-service');",
    replace: '// 变异：奉仕系不在主启动图注册',
    tests: ['main-loop'],
    must_mention: '主启动图注册奉仕系',
  },
  {
    desc: 'M1400 主启动图删助手与蕾丝系注册（COM60/COM_ABLE60 不进实际运行图）（#225）',
    file: 'ere/system/flow/main-loop.js',
    find: "require('#/system/train/com-assistant');",
    replace: '// 变异：助手与蕾丝系不在主启动图注册',
    tests: ['main-loop'],
    must_mention: '主启动图注册助手与蕾丝系',
  },
  {
    desc: 'M1401 COM_ABLE60 主人当调教者也放行（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: '  if (era_flag.player !== era_flag.assi) return 0;',
    replace: '  // 变异：主人当调教者也放行',
    tests: ['com-assistant'],
    must_mention: '@COM_ABLE60：必须是助手在调教',
  },
  {
    desc: 'M1402 COM_ABLE61 调教者是男人也放行（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: '  if (tal(era_flag.player, 122)) return 0;',
    replace: '  // 变异：调教者是男人也放行',
    tests: ['com-assistant'],
    must_mention: '调教者是男人',
  },
  {
    desc: 'M1403 COM_ABLE62 助手调教中也放行（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: `  if (assi < 1) return 0;
  if (era_flag.assiplay) return 0;`,
    replace: `  if (assi < 1) return 0;
  // 变异：助手调教中也放行`,
    tests: ['com-assistant'],
    must_mention: '助手调教中',
  },
  {
    desc: 'M1404 COM_ABLE64 假阳具不再补第二根（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: '  if (rods + item(PBAND) < 2) return 0;',
    replace: '  if (rods < 2) return 0; // 变异：假阳具不算第二根',
    tests: ['com-assistant'],
    must_mention: '假阳具补第二根',
  },
  {
    desc: 'M1405 COM_ABLE65 主人当调教者也放行（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: '  if (player !== era_flag.assi) return 0;',
    replace: '  // 变异：主人当调教者也放行',
    tests: ['com-assistant'],
    must_mention: '@COM_ABLE65：必须是助手在调教',
  },
  {
    desc: 'M1406 给 COM_ABLE67 建壳并恒返回 0（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: 'com_able_family.register(66, able66);',
    replace:
      'com_able_family.register(66, able66);\ncom_able_family.register(67, async () => 0); // 变异：源侧无定义的 67 被建成不可执行',
    tests: ['com-assistant'],
    must_mention: '源侧无 COM_ABLE67',
  },
  {
    desc: 'M1407 COM_ABLE72 阴毛过短也放行（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: '  if (tal(target, 310) <= 20) return 0;',
    replace: '  // 变异：阴毛过短也放行',
    tests: ['com-assistant'],
    must_mention: '阴毛状态 ≤ 20',
  },
  {
    desc: 'M1408 COM_ABLE73 自动调教旗不挡（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: "  if ((era.get('tflag:224') || 0) === 555) return 0;",
    replace: '  // 变异：自动调教旗不挡',
    tests: ['com-assistant'],
    must_mention: '自动调教不可',
  },
  {
    desc: 'M1409 严格 TIMES 退回浮点向下取整（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: '  return Number((BigInt(value_to_multiply) * numerator) / denominator);',
    replace:
      '  return Math.floor(value_to_multiply * rate); // 变异：JS 浮点截断',
    tests: ['com-assistant'],
    must_mention: '严格 TIMES',
  },
  {
    desc: 'M1410 CASE 61 上回合舔阴不升格（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: '    [1, 4, 69].includes(era_flag.prevcom) &&',
    replace:
      '    [4, 69].includes(era_flag.prevcom) && // 变异：上回合舔阴不升格',
    tests: ['com-assistant'],
    must_mention: '上回合舔阴/口交/六九式且同调教者 → 升格 69',
  },
  {
    desc: 'M1411 COM60 情爱源写成 0（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: `  src.set(13, 100);
  src.set(14, 10);`,
    replace: `  src.set(13, 0); // 变异：情爱源不写
  src.set(14, 10);`,
    tests: ['com-assistant'],
    must_mention: 'COM60：实行通过后写入情爱/屈从源',
  },
  {
    desc: 'M1412 COM64 升格路径把本次部位写给助手（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: `      era.set('tflag:40', now);
      era.set('tflag:41', prev);`,
    replace: `      era.set('tflag:40', prev); // 变异：主助部位对调
      era.set('tflag:41', now);`,
    tests: ['com-assistant'],
    must_mention: 'COM64：升格路径按本次/上次指令分配部位并回填 SELECTCOM',
  },
  {
    desc: 'M1413 COM65 助手处女选不要仍继续（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: '    if ((await era.input()) === 1) return 0;',
    replace: '    await era.input(); // 变异：选不要也不取消',
    tests: ['com-assistant'],
    must_mention: '助手处女选「不要」则取消回合',
  },
  {
    desc: 'M1414 COM72 刮后阴毛状态不置 1（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: '  chara(target).chara.阴毛状态 = 1;',
    replace: '  // 变异：刮完不改阴毛状态',
    tests: ['com-assistant'],
    must_mention: 'COM72：刮后阴毛状态置 1',
  },
  {
    desc: 'M1415 COM72 本体误调 TRAIN_MESSAGE_B（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: '  era.print(\n    `${chara_callname(era_flag.player)}将${chara_callname(target)}的阴毛漂亮地刮掉了。`,\n  );',
    replace:
      '  await train_message_b(); // 变异：源侧 COM72 不调 B\n  era.print(\n    `${chara_callname(era_flag.player)}将${chara_callname(target)}的阴毛漂亮地刮掉了。`,\n  );',
    tests: ['com-assistant'],
    must_mention: 'COM72 本体不得再调 B72',
  },
  {
    desc: 'M1416 COM73 发型按钮手写编号前缀（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: "    era.printButton('自然', 1);",
    replace: "    era.printButton('[1] 自然', 1); // 变异：手写编号前缀",
    tests: ['com-assistant'],
    must_mention: '按钮无手写编号前缀',
  },
  {
    desc: 'M1418 COM69 亲族路径不调 INCEST 真身（#225）',
    file: 'ere/system/train/com-assistant.js',
    find: '  incest(target, player);\n  const prefix = incest_prefix(player);',
    replace:
      '  // 变异：不调 INCEST 真身\n  const prefix = incest_prefix(player);',
    tests: ['com-assistant'],
    must_mention: '目标是 PLAYER 的亲族则出前缀',
  },
  {
    desc: 'M1450 COM_ABLE120 的 FLAG:71==1 守卫删（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '  if (game.train.自由调教跳转 === 1) return 0; // 追加指令未许可\n  if (skill) return 0;',
    replace: '  if (skill) return 0; // 变异：FLAG:71 守卫删除',
    tests: ['com-advanced'],
    must_mention: 'FLAG:71==1 追加未许可',
  },
  {
    desc: 'M1451 COM120 显式回填 SELECTCOM=120 删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '  era_flag.selectcom = 120; // 原作显式 SELECTCOM = 120（升格抵达时回填号位）',
    replace: '  // 变异：SELECTCOM 回填删除',
    tests: ['com-advanced'],
    must_mention: '原作显式 SELECTCOM = 120',
  },
  {
    desc: 'M1452 GET_ADV_COM CASE 135 口交 PREVCOM 判据删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '    [31, 123, 124, 126, 127].includes(era_flag.prevcom) &&',
    replace: '    true && // 变异：PREVCOM 口交系判据删除',
    tests: ['com-advanced'],
    must_mention: 'PREVCOM 口交系且 COM_ABLE125',
  },
  {
    desc: 'M1453 主启动图删追加与高级系注册（COM122/COM_ABLE122 不进实际运行图）（#229）',
    file: 'ere/system/flow/main-loop.js',
    find: "require('#/system/train/com-advanced');",
    replace: '// 变异：追加与高级系不在主启动图注册',
    tests: ['main-loop'],
    must_mention: '主启动图注册追加与高级系',
  },
  {
    desc: 'M1454 COM120 默认档 SOURCE:1 截断链改成不乘顺从（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '  times_src(cid, 1, obey[0]);\n  times_src(cid, 3, obey[1]);\n  times_src(cid, 15, obey[2]);\n\n  if (prev === 34) {',
    replace:
      '  // 变异：顺从乘算删除\n  times_src(cid, 3, obey[1]);\n  times_src(cid, 15, obey[2]);\n\n  if (prev === 34) {',
    tests: ['com-advanced'],
    must_mention: '默认档 SOURCE',
  },
  {
    desc: 'M1455 COM121 默认档 SOURCE:1 截断链改成不乘顺从（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '  times_src(cid, 1, obey[1]);',
    replace: '  // 变异：COM121 顺从乘算删除',
    tests: ['com-advanced'],
    must_mention: 'COM121',
  },
  {
    desc: 'M1456 COM122 默认档润滑乘算删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '  times_src(cid, 0, [0.5, 0.75, 1, 1.5, 2, 2.5][lube]);',
    replace: '  // 变异：COM122 润滑乘算删除',
    tests: ['com-advanced'],
    must_mention: 'COM122：默认档 SOURCE',
  },
  {
    desc: 'M1457 COM123 默认档侍奉精神 SOURCE:4 删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '  set_src(cid, 4, service[0]);\n  set_src(cid, 5, service[1]);\n  times_src(cid, 8, service[2]);\n  let breast = [100, 200, 400, 800, 1200, 1500][Math.min(abl(cid, 1), 5)];',
    replace:
      '  // 变异：COM123 侍奉精神 SOURCE:4 删除\n  set_src(cid, 5, service[1]);\n  times_src(cid, 8, service[2]);\n  let breast = [100, 200, 400, 800, 1200, 1500][Math.min(abl(cid, 1), 5)];',
    tests: ['com-advanced'],
    must_mention: 'COM123：乳夹口交，回填 SELECTCOM 与默认 SOURCE',
  },
  {
    desc: 'M1458 COM124 默认档苦痛 SOURCE:6 删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '  set_src(cid, 6, 200);',
    replace: '  // 变异：COM124 苦痛 SOURCE:6 删除',
    tests: ['com-advanced'],
    must_mention: 'COM124：深喉，回填 SELECTCOM 与默认 SOURCE',
  },
  {
    desc: 'M1459 COM125 默认档剃毛 SOURCE:12 加倍删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '  if (!tal(cid, 125) && tal(cid, 310) <= 20) times_src(cid, 12, 2);',
    replace: '  // 变异：COM125 剃毛 SOURCE:12 加倍删除',
    tests: ['com-advanced'],
    must_mention: 'COM125：默认档 SOURCE',
  },
  {
    desc: 'M1460 COM126 默认档技巧 SOURCE:4 乘算删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '  times_src(cid, 4, [0.8, 1, 1.2, 1.5, 1.8, 2.4][skill]);',
    replace: '  // 变异：COM126 技巧 SOURCE:4 乘算删除',
    tests: ['com-advanced'],
    must_mention: 'COM126：手搓口交，回填 SELECTCOM 与默认 SOURCE',
  },
  {
    desc: 'M1461 COM127 显式回填 SELECTCOM=127 删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '  era_flag.selectcom = 127; // 原作显式 SELECTCOM = 127（升格抵达时回填号位）',
    replace: '  // 变异：COM127 回填号删除',
    tests: ['com-advanced'],
    must_mention: '原作显式 SELECTCOM = 127',
  },
  {
    desc: 'M1462 COM128 默认档情爱 SOURCE:3 恒乘删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '  times_src(cid, 3, 2); // 源侧无缩进，恒乘（COMF128:230）',
    tests: ['com-advanced'],
    replace: '  // 变异：COM128 情爱恒乘删除',
    must_mention: 'COM128：正常位・接吻，回填 SELECTCOM 与默认 SOURCE',
  },
  {
    desc: 'M1463 COM129 默认档乳房 SOURCE:17 删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '    [1800, 700],\n  ][Math.min(abl(cid, 1), 5)];\n  set_src(cid, 17, breast[0]);\n  add_src(cid, 3, breast[1]);\n  const lube = palam(cid, 3);\n  if (lube < PALAMLV[1]) {\n    times_src(cid, 1, 0.1);\n    add_src(cid, 6, 1000);',
    replace:
      '    [1800, 700],\n  ][Math.min(abl(cid, 1), 5)];\n  // 变异：COM129 乳房 SOURCE:17 删除\n  add_src(cid, 3, breast[1]);\n  const lube = palam(cid, 3);\n  if (lube < PALAMLV[1]) {\n    times_src(cid, 1, 0.1);\n    add_src(cid, 6, 1000);',
    tests: ['com-advanced'],
    must_mention: 'COM129：正常位・胸爱抚，回填 SELECTCOM 与默认 SOURCE',
  },
  {
    desc: 'M1464 COM130 默认档乳房覆写情爱 SOURCE:3 删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '  set_src(cid, 3, breast[1]); // 源侧覆写情爱，不是加算（COMF130:189）',
    replace: '  // 变异：COM130 情爱覆写删除',
    tests: ['com-advanced'],
    must_mention: 'COM130：正常位ＳＰ，回填 SELECTCOM 与默认 SOURCE',
  },
  {
    desc: 'M1465 COM131 默认档 EXP 档疼痛 SOURCE:6 删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '    set_src(cid, 6, 30);\n  } else if (e0 < EXPLV[4]) {\n    times_src(cid, 1, 1.2);\n    set_src(cid, 6, 5);\n  } else if (e0 < EXPLV[5]) {\n    times_src(cid, 1, 1.3);\n    set_src(cid, 6, 0);\n  } else {\n    times_src(cid, 1, 1.8);\n    set_src(cid, 6, 0);\n  }\n  const breast = [\n    [20, 50],\n    [100, 100],\n    [500, 160],',
    replace:
      '    // 变异：COM131 EXP 档疼痛删除\n  } else if (e0 < EXPLV[4]) {\n    times_src(cid, 1, 1.2);\n    set_src(cid, 6, 5);\n  } else if (e0 < EXPLV[5]) {\n    times_src(cid, 1, 1.3);\n    set_src(cid, 6, 0);\n  } else {\n    times_src(cid, 1, 1.8);\n    set_src(cid, 6, 0);\n  }\n  const breast = [\n    [20, 50],\n    [100, 100],\n    [500, 160],',
    tests: ['com-advanced'],
    must_mention: 'COM131：背后位・胸爱抚，回填 SELECTCOM 与默认 SOURCE',
  },
  {
    desc: 'M1466 COM132 默认档 PALAM:9 覆写疼痛 SOURCE:6 删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '  if (pain < PALAMLV[1]) set_src(cid, 6, 300);',
    replace: '  // 变异：COM132 PALAM:9 疼痛覆写删除',
    tests: ['com-advanced'],
    must_mention: 'COM132：背后位・打屁股，回填 SELECTCOM 与默认 SOURCE',
  },
  {
    desc: 'M1467 COM133 默认档情爱 SOURCE:3 恒乘删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '  times_src(cid, 3, 1.5); // 源侧无缩进，恒乘（COMF133:230）',
    replace: '  // 变异：COM133 情爱恒乘删除',
    tests: ['com-advanced'],
    must_mention: 'COM133：站立背后位，回填 SELECTCOM 与默认 SOURCE',
  },
  {
    desc: 'M1468 COM134 默认档乳房 SOURCE:17 删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '    [3200, 1000],\n  ][Math.min(abl(cid, 1), 5)];\n  set_src(cid, 17, breast[0]);',
    replace:
      '    [3200, 1000],\n  ][Math.min(abl(cid, 1), 5)];\n  // 变异：COM134 乳房 SOURCE:17 删除',
    tests: ['com-advanced'],
    must_mention: 'COM134：背后位ＳＰ，回填 SELECTCOM 与默认 SOURCE',
  },
  {
    desc: 'M1469 COM135 默认档剃毛 SOURCE:12 加倍删除（#229）',
    file: 'ere/system/train/com-advanced.js',
    find: '    times_src(cid, 12, 2); // COMF135:428 剃毛加倍',
    replace: '    // 变异：COM135 剃毛加倍删除',
    tests: ['com-advanced'],
    must_mention: 'COM135：默认档 SOURCE 与自慰经验',
  },

  // —— #220 J10：COM10–19 道具使用 ——
  {
    desc: 'M1060 COM_ABLE10 器具过滤门失效（FLAG:25&2 仍放行）（#220）',
    file: 'ere/system/train/com-toy.js',
    find: `com_able_family.register(10, async () => {
  const cid = era_flag.target;
  return tool_filtered() ||`,
    replace: `com_able_family.register(10, async () => {
  const cid = era_flag.target;
  return false || // 变异：器具过滤门失效`,
    tests: ['com-toy'],
    must_mention: '@COM_ABLE10：器具过滤、无道具和下装各阻止执行',
  },
  {
    desc: 'M1061 COM_ABLE11 贞操带门失效（#220）',
    file: 'ere/system/train/com-toy.js',
    find: '    chastity_belt_worn(cid) ||',
    replace: '    false || // 变异：贞操带不再阻止',
    tests: ['com-toy'],
    must_mention: '贞操带挡',
  },
  {
    desc: 'M1062 COM_ABLE12 低技巧助手门失效（#220）',
    file: 'ere/system/train/com-toy.js',
    find: '    assi_skill_without_sadist_blocked() ||',
    replace: '    false || // 变异：低技巧助手不再阻止',
    tests: ['com-toy'],
    must_mention: '@COM_ABLE12：低技巧助手可由施虐狂豁免',
  },
  {
    desc: 'M1063 COM_ABLE18 兽奸场景门失效（#220）',
    file: 'ere/system/train/com-toy.js',
    find: '    tq(cid, 89) ||',
    replace: '    false || // 变异：兽奸场景不再阻止',
    tests: ['com-toy'],
    must_mention: 'TEQUIP:89 阻止 COM18',
  },
  {
    desc: 'M1064 EQUIP_COM11 未注册，SOURCE_CHECK 链不再消费蠕虫持续效果（#220）',
    file: 'ere/system/train/com-toy.js',
    find: 'equip_com_family.register(11, equip_com11);',
    replace: '// 变异：EQUIP_COM11 不注册',
    tests: ['com-toy'],
    must_mention: '八个装备位的持续效果横幅必须在场',
  },
  {
    desc: 'M1065 EQUIP_COM13 未注册，SOURCE_CHECK 链不再消费肛门虫持续效果（#220）',
    file: 'ere/system/train/com-toy.js',
    find: 'equip_com_family.register(13, equip_com13);',
    replace: '// 变异：EQUIP_COM13 不注册',
    tests: ['com-toy'],
    must_mention: '八个装备位的持续效果横幅必须在场',
  },
  {
    desc: 'M1066 EQUIP_COM14 未注册，SOURCE_CHECK 链不再消费阴蒂夹持续效果（#220）',
    file: 'ere/system/train/com-toy.js',
    find: 'equip_com_family.register(14, equip_com14);',
    replace: '// 变异：EQUIP_COM14 不注册',
    tests: ['com-toy'],
    must_mention: '八个装备位的持续效果横幅必须在场',
  },
  {
    desc: 'M1067 EQUIP_COM15 未注册，SOURCE_CHECK 链不再消费乳头夹持续效果（#220）',
    file: 'ere/system/train/com-toy.js',
    find: 'equip_com_family.register(15, equip_com15);',
    replace: '// 变异：EQUIP_COM15 不注册',
    tests: ['com-toy'],
    must_mention: '八个装备位的持续效果横幅必须在场',
  },
  {
    desc: 'M1068 EQUIP_COM16 未注册，SOURCE_CHECK 链不再消费榨乳器持续效果（#220）',
    file: 'ere/system/train/com-toy.js',
    find: 'equip_com_family.register(16, equip_com16);',
    replace: '// 变异：EQUIP_COM16 不注册',
    tests: ['com-toy'],
    must_mention: '八个装备位的持续效果横幅必须在场',
  },
  {
    desc: 'M1069 EQUIP_COM17 未注册，SOURCE_CHECK 链不再消费飞机杯持续效果（#220）',
    file: 'ere/system/train/com-toy.js',
    find: 'equip_com_family.register(17, equip_com17);',
    replace: '// 变异：EQUIP_COM17 不注册',
    tests: ['com-toy'],
    must_mention: '八个装备位的持续效果横幅必须在场',
  },
  {
    desc: 'M1070 EQUIP_COM18 未注册，SOURCE_CHECK 链不再消费淋浴持续效果（#220）',
    file: 'ere/system/train/com-toy.js',
    find: 'equip_com_family.register(18, equip_com18);',
    replace: '// 变异：EQUIP_COM18 不注册',
    tests: ['com-toy'],
    must_mention: '八个装备位的持续效果横幅必须在场',
  },
  {
    desc: 'M1071 EQUIP_COM19 未注册，SOURCE_CHECK 链不再消费肛珠持续效果（#220）',
    file: 'ere/system/train/com-toy.js',
    find: 'equip_com_family.register(19, equip_com19);',
    replace: '// 变异：EQUIP_COM19 不注册',
    tests: ['com-toy'],
    must_mention: '八个装备位的持续效果横幅必须在场',
  },
  {
    desc: 'M1072 INCEST 无亲族路径误输出（#220）',
    file: 'ere/system/train/incest.js',
    find: '  game.train.近亲与自我口上 = 0; // SUB2:326',
    replace:
      "  game.train.近亲与自我口上 = 0; // SUB2:326\n  era.print('变异：无亲族相奸');",
    tests: ['source-check'],
    must_mention: 'INCEST：无亲族普通路径静默',
  },
  {
    desc: 'M1073 TRAIN_MESSAGE_A 公共绝顶段挪到专属分支之后（#220）',
    file: 'ere/system/train/train-message.js',
    find: `    line +=
      orgasms < 12
        ? '全身哆嗦着、颤动到了极点。'
        : '露出快乐又淫媚的神色、绝顶高潮了……';
    era.print(line);`,
    replace: `    line +=
      orgasms < 12
        ? '全身哆嗦着、颤动到了极点。'
        : '露出快乐又淫媚的神色、绝顶高潮了……';
    era.set('str:0', line); // 变异：公共绝顶段不落行（#220 的判据是它在专属分支之前）`,
    tests: ['train-message'],
    must_mention: 'A 公共绝顶：TFLAG:29 在 COM12 专属反应之前输出同一行',
  },
  {
    desc: 'M1074 主启动图删道具系注册（COM10/COM_ABLE10 不进实际运行图）（#220）',
    file: 'ere/system/flow/main-loop.js',
    find: "require('#/system/train/com-toy');",
    replace: '// 变异：道具系不在主启动图注册',
    tests: ['main-loop'],
    must_mention: 'COM10 必须经主启动图注册',
  },
  {
    desc: 'M1370 主启动图删着装脱衣系注册（COM110/111 不进实际运行图）（#274）',
    file: 'ere/system/flow/main-loop.js',
    find: "require('#/system/train/com-cloth');",
    replace: '// 变异：着装脱衣系不在主启动图注册',
    tests: ['com-family-wiring'],
    must_mention: '主启动图漏装：com-cloth',
  },
  {
    desc: 'M1520 主启动图删 K3 高貴口上注册（KOJO 3 不进实际运行图）（#282）',
    file: 'ere/system/flow/main-loop.js',
    find: "require('#/kojo/kojo-k3-noble');",
    replace: '// 变异：K3 高貴口上不在主启动图注册',
    tests: ['kojo-family-wiring'],
    must_mention: '主启动图漏装：kojo-k3-noble',
  },
  {
    desc: 'M1521 主启动图删 K5 マオ口上注册（KOJO 5 不进实际运行图）（#282）',
    file: 'ere/system/flow/main-loop.js',
    find: "require('#/kojo/kojo-k5-mao');",
    replace: '// 变异：K5 マオ口上不在主启动图注册',
    tests: ['kojo-family-wiring'],
    must_mention: '主启动图漏装：kojo-k5-mao',
  },
  {
    desc: 'M1330 COM_ABLE100 秘密知识守卫删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (tal(player, 325) === 0) return 0; // 调教者须秘密知识',
    replace: '  // 变异：秘密知识守卫删',
    tests: ['com-tentacle'],
    must_mention: '缺秘密知识',
  },
  {
    desc: 'M1331 COM_ABLE100 道具持有守卫删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (tal(player, 325) === 0) return 0; // 调教者须秘密知识\n  if (!has_item(90)) return 0;',
    replace:
      '  if (tal(player, 325) === 0) return 0; // 调教者须秘密知识\n  // 变异：道具持有守卫删',
    tests: ['com-tentacle'],
    must_mention: '缺 ITEM:90',
  },
  {
    desc: 'M1332 COM_ABLE100 浴室 PLAY 守卫删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (tequip(target, 58)) return 0; // 浴室',
    replace: '  // 变异：浴室 PLAY 守卫删',
    tests: ['com-tentacle'],
    must_mention: '浴室 PLAY',
  },
  {
    desc: 'M1333 COM_ABLE100 决斗守卫删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (tequip(target, 55)) return 0; // 决斗',
    replace: '  // 变异：决斗守卫删',
    tests: ['com-tentacle'],
    must_mention: '决斗中',
  },
  {
    desc: 'M1334 COM_ABLE101 贞操带判定删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '    (era.get(`cflag:${target}:42`) || 0) === 79 &&',
    replace:
      '    (era.get(`cflag:${target}:42`) || 0) === 0 && // 变异：贞操带编号改坏',
    tests: ['com-tentacle'],
    must_mention: '101 贞操带',
  },
  {
    desc: 'M1335 COM_ABLE101 贞操封印守卫删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (tal(target, 273)) return 0; // 贞操封印',
    replace: '  // 变异：贞操封印守卫删',
    tests: ['com-tentacle'],
    must_mention: '101 贞操封印',
  },
  {
    desc: 'M1336 COM_ABLE102 灌肠互斥删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (tequip(target, 90) === 0) return 0;\n  if (tequip(target, 46)) return 0;\n  return 1;',
    replace:
      '  if (tequip(target, 90) === 0) return 0;\n  // 变异：灌肠互斥删\n  return 1;',
    tests: ['com-tentacle'],
    must_mention: '102 灌肠中',
  },
  {
    desc: 'M1337 COM_ABLE108 口塞互斥删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (tequip(target, 45)) return 0;',
    replace: '  // 变异：口塞互斥删',
    tests: ['com-tentacle'],
    must_mention: '108 口塞中',
  },
  {
    desc: 'M1338 COM_ABLE109 男人/扶她门槛删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (tal(target, 121) === 0 && tal(target, 122) === 0) return 0;',
    replace: '  // 变异：男人/扶她门槛删',
    tests: ['com-tentacle'],
    must_mention: '109 需男人或扶她',
  },
  {
    desc: 'M1339 COM_ABLE150 顺从+欲望合计门槛改 5（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (abl(target, 10) + abl(target, 11) < 6) return 0;',
    replace:
      '  if (abl(target, 10) + abl(target, 11) < 5) return 0; // 变异：门槛改 5',
    tests: ['com-tentacle'],
    must_mention: '合计 5 < 6',
  },
  {
    desc: 'M1340 COM_ABLE150 癖好未设定守卫删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: "  if (fetish(target) === '') return 0;",
    replace: '  // 变异：癖好未设定守卫删',
    tests: ['com-tentacle'],
    must_mention: '癖好未设定',
  },
  {
    desc: 'M1341 COM_ABLE208 死斗场守卫删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (tequip(target, 55) === 0) return 0;',
    replace: '  // 变异：死斗场守卫删',
    tests: ['com-tentacle'],
    must_mention: '不在死斗场',
  },
  {
    desc: 'M1342 COM_ABLE208 助手调教守卫删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (era_flag.assiplay) return 0;',
    replace: '  // 变异：助手调教守卫删',
    tests: ['com-tentacle'],
    must_mention: '助手调教不可',
  },
  {
    desc: 'M1343 COM100 TRAIN_MESSAGE_B 挪到翻转之后（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: "  era.print('召唤触手'); // :6\n  await train_message_b(); // :8 —— 翻转之前",
    replace: "  era.print('召唤触手'); // :6\n  // 变异：B 挪到翻转之后",
    tests: ['com-tentacle'],
    must_mention: 'B 读翻转前',
  },
  {
    desc: 'M1344 COM100 半阈值缩放改走整档 EXPLV（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '    let a = scale_a_by_half_explv(target, 100); // :35-48',
    replace: '    let a = scale_a_by_explv(target, 100); // 变异：半阈值改整档',
    tests: ['com-tentacle'],
    must_mention: 'deltabase:31:0',
  },
  {
    desc: 'M1345 COM100 胆怯 ×2 缩放删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (tal(cid, 10)) a = times(a, 2.0); // 胆怯',
    replace: '  // 变异：胆怯缩放删',
    tests: ['com-tentacle'],
    must_mention: '胆怯 ×2',
  },
  {
    desc: 'M1346 COM100 退出支清位表删 98（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '    for (const bit of [11, 13, 14, 15, 16, 17, 44, 46, 98]) {',
    replace:
      '    for (const bit of [11, 13, 14, 15, 16, 17, 44, 46]) { // 变异：漏清 98',
    tests: ['com-tentacle'],
    must_mention: '清 TEQUIP:98',
  },
  {
    desc: 'M1347 COM101 JUMP 改写 SELECTCOM（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  return jump_com(11);',
    replace:
      '  return jump_com(11, { rewrite_selectcom: true }); // 变异：改写 SELECTCOM',
    tests: ['com-tentacle'],
    must_mention: 'JUMP 不改写 SELECTCOM',
  },
  {
    desc: 'M1348 COM106 JUMP 目标改 45（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  return jump_com(44);',
    replace: '  return jump_com(45); // 变异：JUMP 目标改 45',
    tests: ['com-tentacle'],
    must_mention: '目标看到的 SELECTCOM 仍是触手指令号',
  },
  {
    desc: 'M1349 COM108 初吻判定改走会吞 -1 的门面（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (era.get(`cflag:${target}:16`) === -1) {',
    replace:
      '  if (chara(target).train.初吻对象 === -1) { // 变异：读走会吞 -1 的门面',
    tests: ['com-tentacle'],
    must_mention: '初吻直写',
  },
  {
    desc: 'M1350 COM108 STAIN:0 |= 2|4 删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '      (era.get(`stain:${target}:0`) || 0) | 2 | 4, // :342-343',
    replace: '      era.get(`stain:${target}:0`) || 0, // 变异：污垢位运算删',
    tests: ['com-tentacle'],
    must_mention: 'STAIN:0 |= 2|4',
  },
  {
    desc: 'M1351 COM150 百合经验增量 5 改 1（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '    chara(target).train.百合经验 += 5; // :62 EXP:40',
    replace: '    chara(target).train.百合经验 += 1; // 变异：增量改 1',
    tests: ['com-tentacle'],
    must_mention: '百合经验+5',
  },
  {
    desc: 'M1352 COM150 断背经验增量 5 改 1（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '    chara(target).train.断背经验 += 5; // :66 EXP:41',
    replace: '    chara(target).train.断背经验 += 1; // 变异：增量改 1',
    tests: ['com-tentacle'],
    must_mention: '断背经验+5',
  },
  {
    desc: 'M1353 COM208 JUMP COM31 不改写 SELECTCOM（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '      return jump_com(31, { rewrite_selectcom: true }); // :47-49',
    replace: '      return jump_com(31); // 变异：不改写 SELECTCOM',
    tests: ['com-tentacle'],
    must_mention: 'JUMP 前改写 SELECTCOM',
  },
  {
    desc: 'M1354 COM208 男人仍显示私处按钮（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: "    if (tal(target, 122) === 0) {\n      era.printButton('私处', 2); // :40-41",
    replace:
      "    if (true) {\n      era.printButton('私处', 2); // 变异：男人仍显示私处",
    tests: ['com-tentacle'],
    must_mention: '男人不显示私处',
  },
  {
    desc: 'M1355 COM208 暂时放过改 RETURN 0（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '    if (result === 999) {\n      return 1; // :62-67 暂时放过落空后 RETURN 1',
    replace:
      '    if (result === 999) {\n      return 0; // 变异：暂时放过改 RETURN 0',
    tests: ['com-tentacle'],
    must_mention: '暂时放过 RETURN 1',
  },
  {
    desc: 'M1356 EQUIP_COM100 TFLAG:15 写入删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '    game.train.怪物射精或购入金 = e; // :231 TFLAG:15',
    replace: '    // 变异：TFLAG:15 写入删',
    tests: ['com-tentacle'],
    must_mention: 'tflag:15',
  },
  {
    desc: 'M1357 EQUIP_COM100 触手经验收尾改只 +1（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  chara(target).dungeon.触手经验 += t_final; // :243 EXP:55',
    replace: '  chara(target).dungeon.触手经验 += 1; // 变异：不按 T 累加',
    tests: ['com-tentacle'],
    must_mention: 'T+=1 后 EXP:55 += T',
  },
  {
    desc: 'M1358 EQUIP_COM108 尾段误清 T（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: "  era.add('t:0', 1); // :404",
    replace:
      "  era.add('t:0', 1); // :404\n  era.set('t:0', 0); // 变异：误清 T",
    tests: ['com-tentacle'],
    must_mention: '只累加 T，不清零',
  },
  {
    desc: 'M1359 TRAIN_MESSAGE_B100 zooko 前缀改走「将身体」（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (in_zooko_msg(target)) {\n    line += clothtype_special_text(target);',
    replace:
      '  if (false) {\n    line += clothtype_special_text(target); // 变异：zooko 前缀删',
    tests: ['com-tentacle'],
    must_mention: 'zooko 前缀拼进同一行',
  },
  {
    desc: 'M1360 TRAIN_MESSAGE_B150 嗅觉支改走其它（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: "  if (f === '嗅觉') {",
    replace: "  if (f === '变异嗅觉') { // 变异：嗅觉支失效",
    tests: ['com-tentacle'],
    must_mention: '你向温妮坚持不懈地熏陶着那个味道',
  },
  {
    desc: 'M1361 TRAIN_MESSAGE_A150 中毒 5 档门槛改 6（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (addict >= 5) {',
    replace: '  if (addict >= 6) { // 变异：中毒 5 档门槛改 6',
    tests: ['com-tentacle'],
    must_mention: '口水不断的从嘴角流了出来',
  },
  {
    desc: 'M1362 A 公共头非死斗场触手臂 SIF 删（#227）',
    file: 'ere/system/train/train-message.js',
    find: '  if (tflag15 === 1 && tequip55 !== 1) {',
    replace: '  if (false) { // 变异：非死斗场触手臂 SIF 删',
    tests: ['com-tentacle'],
    must_mention: ':113-125 SIF 与 :143-145 ELSEIF 各打一次',
  },
  {
    desc: 'M1363 SYOKUSYU_MILK 母乳体质获得删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '    chara(target).chara.母乳体质 = 1;',
    replace: '    // 变异：母乳体质获得删',
    tests: ['com-tentacle'],
    must_mention: 'talent:31:130',
  },
  {
    desc: 'M1364 主启动图删触手系注册（#227）',
    file: 'ere/system/flow/main-loop.js',
    find: "require('#/system/train/com-tentacle');",
    replace: '// 变异：触手系不在主启动图注册',
    tests: ['main-loop'],
    must_mention: '主启动图注册触手系',
  },
  {
    desc: 'M1365 COM_ABLE105 凌辱乳头互斥删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (tequip(target, 15)) return 0;',
    replace: '  // 变异：凌辱乳头互斥删',
    tests: ['com-tentacle'],
    must_mention: '105 凌辱乳头中',
  },
  {
    desc: 'M1366 COM_ABLE107 肛交触手互斥删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: '  if (tequip(target, 13)) return 0;',
    replace: '  // 变异：肛交触手互斥删',
    tests: ['com-tentacle'],
    must_mention: '107 肛交触手中',
  },
  {
    desc: 'M1367 COM100 尾段 T = 0 删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: "  era.set('t:0', 0); // :63",
    replace: '  // 变异：尾段 T = 0 删',
    tests: ['com-tentacle'],
    must_mention: '尾段 T = 0',
  },
  {
    desc: 'M1368 EQUIP_COM100 大量射精文本删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: "      era.print('触手大量射精');",
    replace: '      // 变异：大量射精文本删',
    tests: ['com-tentacle'],
    must_mention: '触手大量射精',
  },
  {
    desc: 'M1369 TRAIN_MESSAGE_A 100-109/208 显式无操作注册删（#227）',
    file: 'ere/system/train/com-tentacle.js',
    find: 'for (const id of [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 208]) {',
    replace: 'for (const id of []) { // 变异：显式无操作注册删',
    tests: ['com-tentacle'],
    must_mention: '显式无操作压掉分发骨架占位行',
  },
  {
    desc: 'M1544 主启动图删 K2 口上注册（#233）',
    file: 'ere/system/flow/main-loop.js',
    find: "require('#/kojo/kojo-k2-timid');",
    replace: '// 变异：K2 口上不在主启动图注册',
    tests: ['main-loop'],
    must_mention: '主启动图注册 K2',
  },
  {
    desc: 'M1545 AFTERTRAIN leftover_q 不写入（#233）',
    file: 'ere/event/event-aftertrain.js',
    find: '  leftover_q = q;',
    replace: '  leftover_q = 0; // 变异：不写入妄想对象',
    tests: ['event-aftertrain'],
    must_mention: 'leftover_q',
  },
  {
    desc: 'M2135 AFTERTRAIN leftover_s 不写入（#237）',
    file: 'ere/event/event-aftertrain.js',
    find: '  leftover_s = s;',
    replace: '  leftover_s = 0; // 变异：不写入回数',
    tests: ['event-aftertrain', 'kojo-k6-wicked'],
    must_mention: 'leftover_s',
  },
  // —— #402（N18 调教消息 A/B）：A 的公共段（train-message.js）——
  {
    desc: 'M8116 A 股间射精 0 臂：TFLAG:10 ≥ 1 守卫删（对象没射也说话）',
    file: 'ere/system/train/train-message.js',
    find: `    if (tflag10 < 1) {
      return;
    }
    const head = \`\${target_name}射精出的`,
    replace: `    const head = \`\${target_name}射精出的`,
    tests: ['train-message'],
    must_mention: 'TFLAG:10 == 0 → 整段静默',
  },
  {
    desc: 'M8117 A 股间射精 0 臂：「大量」的档界 2 抬到 3',
    file: 'ere/system/train/train-message.js',
    find: `\${tflag10 >= 2 ? '大量' : ''}`,
    replace: `\${tflag10 >= 3 ? '大量' : ''}`,
    tests: ['train-message'],
    must_mention: '对象大量射精',
  },
  {
    desc: 'M8118 A 股间射精 0 臂：122 支改判 121（阴茎互捅支失守）',
    file: 'ere/system/train/train-message.js',
    find: `    if (selectcom === 122) {
      era.print(
        \`\${head}精液、将\${chara_callname(player)}的阴茎用精液一吐为快了…\`,
      ); // :39`,
    replace: `    if (selectcom === 121) {
      era.print(
        \`\${head}精液、将\${chara_callname(player)}的阴茎用精液一吐为快了…\`,
      ); // :39`,
    tests: ['train-message'],
    must_mention: '0 臂 · 122 · 对象普通射精',
  },
  {
    desc: 'M8119 A 股间射精 0 臂：33 支丢「精液、把〈主人〉的」前缀（与 62 支合流）',
    file: 'ere/system/train/train-message.js',
    find: '      const line =\n        selectcom === 33\n          ? `${head}精液、把${chara_callname(player)}的` // :43\n          : head;',
    replace: '      const line = head; // 变异：33 支的前缀删',
    tests: ['train-message'],
    must_mention: '0 臂 · 33 · 恶魔肌肤',
  },
  {
    desc: 'M8120 A 公共段肌肤色：恶魔肌肤的色名 蓝色 → 青色',
    file: 'ere/system/train/train-message.js',
    find: `  if (tal(cid, 244)) {
    return '蓝色';
  }`,
    replace: `  if (tal(cid, 244)) {
    return '青色';
  }`,
    tests: ['train-message'],
    must_mention: '0 臂 · 33 · 恶魔肌肤',
  },
  {
    desc: 'M8121 A 股间射精 0 臂：色名链无 ELSE 的断句残留被补字',
    file: 'ere/system/train/train-message.js',
    find: `      if (color === undefined) {
        era.print(line); // 断句残留：源侧色名链无 ELSE`,
    replace: `      if (color === undefined) {
        era.print(\`\${line}肌肤弄脏了…\`); // 变异：补字`,
    tests: ['train-message'],
    must_mention: '0 臂 · 33 · 无肌肤素质',
  },
  {
    desc: 'M8122 A 股间射精 1/2 臂：「双方同时射精」丢掉 TFLAG:10 ≥ 1 条件',
    file: 'ere/system/train/train-message.js',
    find: '    const both = tflag10 >= 1 && (tal(player, 122) || tal(player, 121));',
    replace:
      '    const both = (tal(player, 122) || tal(player, 121)) > 0; // 变异：丢掉 TFLAG:10 条件',
    tests: ['train-message'],
    must_mention: '1 臂 · 122 · TFLAG:10 == 0',
  },
  {
    desc: 'M8123 A 股间射精 2 臂：同时射精文案的「大量」删',
    file: 'ere/system/train/train-message.js',
    find: `          ? '两人同时射精、对彼此的阴茎用大量的精液一吐为快…' // :90`,
    replace: `          ? '两人同时射精、对彼此的阴茎用精液一吐为快…' // :90`,
    tests: ['train-message'],
    must_mention: '2 臂 · 122 · 主人是扶她',
  },
  {
    desc: 'M8124 A 股间射精 1/2 臂：33 支缺色名时补「黑色」（改变无素质语义）',
    file: 'ere/system/train/train-message.js',
    find: "    const color = skin_color(target) ?? ''; // 色名链无 ELSE，缺色即空串",
    replace:
      "    const color = skin_color(target) ?? '黑色'; // 变异：缺色补字",
    tests: ['train-message'],
    must_mention: '1 臂 · 33 · 无肌肤素质',
  },
  {
    desc: 'M8125 A 股间射精 2 臂：62 支文案的「射出的大量精液」改序',
    file: 'ere/system/train/train-message.js',
    find: `        ? '两人的身体被射出的大量精液沾满了…' // :108`,
    replace: `        ? '两人的身体被射出的大量精液沾满…' // :108`,
    tests: ['train-message'],
    must_mention: '2 臂 · 62 · 双人股间',
  },
  {
    desc: 'M8126 A 狗射精：34（骑乘位）支删，只留 21',
    file: 'ere/system/train/train-message.js',
    find: '  if (selectcom === 21 || selectcom === 34) {',
    replace: '  if (selectcom === 21) {',
    tests: ['train-message'],
    must_mention: 'TFLAG:16 狗射精：SELECTCOM 34',
  },
  {
    desc: 'M8127 A 狗射精：直肠支的判据 27 改 28（直肠行失守）',
    file: 'ere/system/train/train-message.js',
    find: '  } else if (selectcom === 27) {',
    replace: '  } else if (selectcom === 28) {',
    tests: ['train-message'],
    must_mention: 'TFLAG:16 狗射精：SELECTCOM 27',
  },
  {
    desc: 'M8128 A 狗射精：嘴部行文案改字（嘴里 → 喉咙里）',
    file: 'ere/system/train/train-message.js',
    find: '    era.print(`${target_name}的嘴里、被狗灌入了那又臭又热的精液…`); // :157',
    replace:
      '    era.print(`${target_name}的喉咙里、被狗灌入了那又臭又热的精液…`); // :157',
    tests: ['train-message'],
    must_mention: 'TFLAG:16 狗射精：SELECTCOM 31',
  },
  {
    desc: 'M8129 A 狗射精：手部支的收尾句换成其余三支的句式',
    file: 'ere/system/train/train-message.js',
    find: '    era.print(`${target_name}的手上、沾满了狗那又臭又热的精液…`); // :159',
    replace:
      '    era.print(`${target_name}的手上、被狗灌入了那又臭又热的精液…`); // :159',
    tests: ['train-message'],
    must_mention: 'TFLAG:16 狗射精：SELECTCOM 30',
  },
  {
    desc: 'M8130 A 狗射精：TFLAG:16 的门 < 0，旗标 0 也说话',
    file: 'ere/system/train/train-message.js',
    find: '  if (tflag(16) <= 0) {',
    replace: '  if (tflag(16) < 0) {',
    tests: ['train-message'],
    must_mention: 'TFLAG:16：旗标为 0 时整段静默',
  },
  {
    desc: 'M8131 A 助手射精：羡慕句的 ABL 两项从「或」改「且」',
    file: 'ere/system/train/train-message.js',
    find: '    (abl(era_flag.target, 11) > 3 || abl(era_flag.target, 32) > 2) &&',
    replace:
      '    (abl(era_flag.target, 11) > 3 && abl(era_flag.target, 32) > 2) &&',
    tests: ['train-message'],
    must_mention: '羡慕句的门',
  },
  {
    desc: 'M8132 A 助手射精：TFLAG:7 的门 < 0，旗标 0 也落羡慕句',
    file: 'ere/system/train/train-message.js',
    find: '  const flag = tflag(7);\n  if (flag <= 0) {',
    replace: '  const flag = tflag(7);\n  if (flag < 0) {',
    tests: ['train-message'],
    must_mention: 'TFLAG:7 == 0 → 整段静默',
  },
  {
    desc: 'M8133 A 助手射精：1 支文案的「精液」加成「大量精液」',
    file: 'ere/system/train/train-message.js',
    find: '    era.print(`当着${target_name}的面、在${assi_name}的体内深处射出了精液…`); // :167',
    replace:
      '    era.print(`当着${target_name}的面、在${assi_name}的体内深处射出了大量精液…`); // :167',
    tests: ['train-message'],
    must_mention: 'TFLAG:7 助手射精：两支文案',
  },
  {
    desc: 'M8134 A 射精链口臂：125（自慰口交）支删，只留 31',
    file: 'ere/system/train/train-message.js',
    find: '  if (selectcom === 31 || selectcom === 125) {',
    replace: '  if (selectcom === 31) {',
    tests: ['train-message'],
    must_mention: 'TFLAG:0-1 · 指令 125 的公共段输出',
  },
  {
    desc: 'M8135 A 射精链口臂：精液中毒门 ABL:32 ≥ 3 抬到 ≥ 4',
    file: 'ere/system/train/train-message.js',
    find: '  const addicted = abl(target, 32) >= 3; // 精液中毒',
    replace: '  const addicted = abl(target, 32) >= 4; // 精液中毒',
    tests: ['train-message'],
    must_mention: 'TFLAG:0-1 · 指令 31 的公共段输出',
  },
  {
    desc: 'M8136 A 射精链口臂：乳交的豪乳判据 110 改 111',
    file: 'ere/system/train/train-message.js',
    find: '    } else if (tal(target, 110) || tal(target, 114)) {',
    replace: '    } else if (tal(target, 111) || tal(target, 114)) {',
    tests: ['train-message'],
    must_mention: 'TFLAG:0-1 · 指令 32 的公共段输出',
  },
  {
    desc: 'M8137 A 射精链口臂：豪乳积存文案改字',
    file: 'ere/system/train/train-message.js',
    find: '      era.print(`${name}${tint}圆润挺拔的诱惑豪乳之间、积存着精液…`); // :190-198',
    replace:
      '      era.print(`${name}${tint}圆润挺拔的诱惑双峰之间、积存着精液…`); // :190-198',
    tests: ['train-message'],
    must_mention: 'TFLAG:0-1 · 指令 32 的公共段输出',
  },
  {
    desc: 'M8138 A 射精链口臂：强制口交的失神门 ≥ 2 抬到 ≥ 3',
    file: 'ere/system/train/train-message.js',
    find: '    if (tflag(899) >= 2) {',
    replace: '    if (tflag(899) >= 3) {',
    tests: ['train-message'],
    must_mention: 'TFLAG:0-2 · 指令 80 的公共段输出',
  },
  {
    desc: 'M8139 A 射精链口臂（大量）：123 支的第二行删',
    file: 'ere/system/train/train-message.js',
    find: "    if (heavy) {\n      era.print('从嘴里溢出来的精液、把阴茎和胸部都染成白色了…'); // :303\n    }",
    replace: '    // 变异：123 支的第二行删',
    tests: ['train-message'],
    must_mention: 'TFLAG:0-2 · 指令 123 的公共段输出',
  },
  {
    desc: 'M8140 A 射精链口臂：126 支主人扶她句的素质 122 改 121',
    file: 'ere/system/train/train-message.js',
    find: '    if (addicted && tal(era_flag.player, 122)) {',
    replace: '    if (addicted && !tal(era_flag.player, 122)) {',
    tests: ['train-message'],
    must_mention: 'TFLAG:0-1 · 指令 126 的公共段输出',
  },
  {
    desc: 'M8141 A 射精链手臂：初次精液经验门 EXP:20 == 0 改 == 1',
    file: 'ere/system/train/train-message.js',
    find: '  if (exp(target, 20) === 0 && tflag(899) <= 1) {',
    replace: '  if (exp(target, 20) === 1 && tflag(899) <= 1) {',
    tests: ['train-message'],
    must_mention: 'TFLAG:1-1 · 指令 0 的公共段输出',
  },
  {
    desc: 'M8142 A 射精链足臂：轻蔑门的爱与施虐两项从「且」改「或」',
    file: 'ere/system/train/train-message.js',
    find: '  if ((tal(target, 83) || abl(target, 20) > 2) && tal(target, 85) === 0) {',
    replace:
      '  if (tal(target, 83) || abl(target, 20) > 2 || tal(target, 85) === 0) {',
    tests: ['train-message'],
    must_mention: 'TFLAG:18-1 · 指令 0 的公共段输出',
  },
  {
    desc: 'M8143 A 射精链足臂（大量）：文案的「大量」删',
    file: 'ere/system/train/train-message.js',
    find: "    ? '看着你将大量热乎乎的精液射到她的脚上了…' // :358",
    replace: "    ? '看着你将热乎乎的精液射到她的脚上了…' // :358",
    tests: ['train-message'],
    must_mention: 'TFLAG:18-2 · 指令 0 的公共段输出',
  },
  {
    desc: 'M8144 A 放置 PLAY：目光档的 PALAMLV[5] 门降到 [4]',
    file: 'ere/system/train/train-message.js',
    find: "  if (palam(target, 5) >= PALAMLV[5]) {\n    line += '、用炽热地目光看向你'; // :366",
    replace:
      "  if (palam(target, 5) >= PALAMLV[4]) {\n    line += '、用炽热地目光看向你'; // :366",
    tests: ['train-message'],
    must_mention: '放置 PLAY（指令 55）：欲情四档逐档取件',
  },
  {
    desc: 'M8145 A 放置 PLAY：收尾的省略号删（行尾「……」）',
    file: 'ere/system/train/train-message.js',
    find: '  era.print(`${line}……`); // :371',
    replace: '  era.print(line); // :371',
    tests: ['train-message'],
    must_mention: '放置 PLAY（指令 55）：欲情四档逐档取件',
  },
  {
    desc: 'M8146 A 放置 PLAY：TEQUIP:21 门删（未插道具也追加颤抖句）',
    file: 'ere/system/train/train-message.js',
    find: '  if (palam(target, 5) >= PALAMLV[3] && tq(target, 21)) {',
    replace: '  if (palam(target, 5) >= PALAMLV[3]) {',
    tests: ['train-message'],
    must_mention: '放置 PLAY（指令 55）：欲情四档逐档取件',
  },
  {
    desc: 'M8147 B 源侧无分支的 55/110/111 空注册删（占位行回来了）',
    file: 'ere/system/train/train-message.js',
    find: 'for (const id of [55, 110, 111]) {\n  train_message_b_family.register(id, async () => {});\n}',
    replace:
      'for (const id of []) {\n  train_message_b_family.register(id, async () => {});\n}',
    tests: ['train-message'],
    must_mention: 'B 指令 55：源侧无分支',
  },
  {
    desc: 'M8148 A 源侧无分支的 43-49/110/111 空注册删（占位行回来了）',
    file: 'ere/system/train/train-message.js',
    find: 'for (const id of [43, 44, 45, 46, 47, 48, 49, 110, 111]) {\n  train_message_a_family.register(id, async () => {});\n}',
    replace:
      'for (const id of [43, 44, 45, 46, 47, 48, 49]) {\n  train_message_a_family.register(id, async () => {});\n}',
    tests: ['train-message', 'com-sm'],
    must_mention: 'A 指令 110：源侧无分支',
  },
  {
    desc: 'M8149 A 性交射精链：抽出/插着分界的 PALAMLV[4] 抬到 [5]',
    file: 'ere/system/train/train-message.js',
    find: '  if (palam(target, 5) < PALAMLV[4] || blood) {',
    replace: '  if (palam(target, 5) < PALAMLV[5] || blood) {',
    tests: ['train-message'],
    must_mention: 'TFLAG:2 == 1 · 插着 · 指令 0',
  },
  {
    desc: 'M8150 A 性交射精链：抽出臂的落红改写句改字',
    file: 'ere/system/train/train-message.js',
    find: '      blood ? `${text}渗出了处女的落红、混合着` : text;',
    replace: '      blood ? `${text}渗出了处女的落红、混杂着` : text;',
    tests: ['train-message'],
    must_mention: '抽出臂的落红改写',
  },
  {
    desc: 'M8151 A 性交射精链：乳内 1 臂的 SELECTCOM == 90 门删',
    file: 'ere/system/train/train-message.js',
    find: '  if (level === 1 && milk_inside && selectcom === 90) {',
    replace: '  if (level === 1 && milk_inside) {',
    tests: ['train-message'],
    must_mention: '1 臂还要求指令 90',
  },
  {
    desc: 'M8152 A 性交射精链：乳内 2 臂的档位判据 2 改 3（大量乳内失守）',
    file: 'ere/system/train/train-message.js',
    find: '  if (level === 2 && milk_inside) {',
    replace: '  if (level === 3 && milk_inside) {',
    tests: ['train-message'],
    must_mention: '乳内射精（CFLAG:113）两支',
  },
  {
    desc: 'M8153 A 性交射精链：背后位支的收尾句「精液滴出来了」改成渗出',
    file: 'ere/system/train/train-message.js',
    find: "          : `${with_blood('阴茎拔出后、阴部处')}精液滴出来了…`, // :469-472",
    replace:
      "          : `${with_blood('阴茎拔出后、阴部处')}精液渗出来了…`, // :469-472",
    tests: ['train-message'],
    must_mention: 'TFLAG:2 == 1 · 抽出 · 指令 21',
  },
  {
    desc: 'M8157 A 性交射精链：余韵 3 档的文案改字（气息慌乱）',
    file: 'ere/system/train/train-message.js',
    find: '    era.print(`${name}气息慌乱、沉浸在绝顶高潮的余韵之中…`); // :603',
    replace:
      '    era.print(`${name}气息紊乱、沉浸在绝顶高潮的余韵之中…`); // :603',
    tests: ['train-message'],
    must_mention: 'ELSE 支：绝顶余韵的五档',
  },
  {
    desc: 'M8156 A 性交射精链：余韵「滴液」支丢掉未穿衣门（CFLAG:40 位判）',
    file: 'ere/system/train/train-message.js',
    find: '  const dripping = tflag(19) && (tq(target, 11) || tflag(60)) && uncovered; // :594/:596',
    replace:
      '  const dripping = tflag(19) && (tq(target, 11) || tflag(60)); // :594/:596',
    tests: ['train-message'],
    must_mention: 'ELSE 支：绝顶余韵的五档',
  },
  {
    desc: 'M8159 A 性交射精链：抽出臂的 TFLAG:31 归零删',
    file: 'ere/system/train/train-message.js',
    find: '    game.event.本次调教处女丧失 = 0;\n    game.event.插着不拔 = 0;',
    replace: '    game.event.插着不拔 = 0; // 变异：TFLAG:31 不归零',
    tests: ['train-message'],
    must_mention: '抽出臂的落红改写',
  },
  {
    desc: 'M8160 A 性交射精链：大量抽出臂的 121 支文案丢「大量」',
    file: 'ere/system/train/train-message.js',
    find: '          ? `直接对${name}的子宫、注入了大量热乎乎的精液…` // :559',
    replace: '          ? `直接对${name}的子宫、注入了热乎乎的精液…` // :559',
    tests: ['train-message'],
    must_mention: 'TFLAG:2 == 2 · 抽出 · 指令 121',
  },
  {
    desc: 'M8161 A 失禁段：失神放尿的 TFLAG:29 ≥ 3 抬到 ≥ 4',
    file: 'ere/system/train/train-message.js',
    find: '  if (tflag(899) >= 2 && orgasms >= 3 && urine) {',
    replace: '  if (tflag(899) >= 2 && orgasms >= 4 && urine) {',
    tests: ['train-message'],
    must_mention: '失神放尿（899 ≥ 2 · 29 ≥ 3 · 利尿剂）',
  },
  {
    desc: 'M8162 A 失禁段：失神失禁的 TFLAG:29 ≥ 1 抬到 ≥ 2',
    file: 'ere/system/train/train-message.js',
    find: '  if (tflag(899) >= 2 && orgasms >= 1 && urine) {',
    replace: '  if (tflag(899) >= 2 && orgasms >= 2 && urine) {',
    tests: ['train-message'],
    must_mention: '失神失禁（899 ≥ 2 · 29 ≥ 1 · 漏尿癖）',
  },
  {
    desc: 'M8163 A 失禁段：尿布形态的 CFLAG:42 判据 69 改 68',
    file: 'ere/system/train/train-message.js',
    find: '  if (cflag42 === 69 && doll_bit && burst) {',
    replace: '  if (cflag42 === 68 && doll_bit && burst) {',
    tests: ['train-message'],
    must_mention: '尿布放尿（42 == 69',
  },
  {
    desc: 'M8164 A 失禁段：着ぐるみ形态的 CFLAG:42 判据 11 改 12',
    file: 'ere/system/train/train-message.js',
    find: '  if (cflag42 === 11 && doll_bit && leak) {',
    replace: '  if (cflag42 === 12 && doll_bit && leak) {',
    tests: ['train-message'],
    must_mention: '着ぐるみ失禁',
  },
  {
    desc: 'M8165 A 失禁段：着ぐるみ放尿的第二句改字',
    file: 'ere/system/train/train-message.js',
    find: '    era.print(`看来是太过兴奋、尿到${clothtype_special_text(target)}里去了…`); // :630-632',
    replace:
      '    era.print(`看来是太过兴奋、尿在${clothtype_special_text(target)}里了…`); // :630-632',
    tests: ['train-message'],
    must_mention: '着ぐるみ放尿',
  },
  {
    desc: 'M8166 A 失禁段：服形态的位门 CFLAG:40 & 16 改 & 32',
    file: 'ere/system/train/train-message.js',
    find: '  if (cflag40 & 16 && burst) {',
    replace: '  if (cflag40 & 32 && burst) {',
    tests: ['train-message'],
    must_mention: '服放尿（40 & 16',
  },
  {
    desc: 'M8167 A 失禁段：内裤失禁的收尾句改字（水迹 → 尿迹）',
    file: 'ere/system/train/train-message.js',
    find: '    era.print(`${name}的内裤冒起了热气、有黄色水迹在扩散………`); // :653',
    replace:
      '    era.print(`${name}的内裤冒起了热气、有黄色尿迹在扩散………`); // :653',
    tests: ['train-message'],
    must_mention: '内裤失禁',
  },
  {
    desc: 'M8168 A 失禁段：裸身 29 ≥ 7 · 痉挛改成抽搐（三态各一支）',
    file: 'ere/system/train/train-message.js',
    find: '    era.print(`痉挛中的${name}喷泉一样喷尿出来了…`); // :658',
    replace: '    era.print(`抽搐中的${name}喷泉一样喷尿出来了…`); // :658',
    tests: ['train-message'],
    must_mention: '裸身 29 ≥ 7 · 只利尿剂',
  },
  {
    desc: 'M8169 A 失禁段：裸身 29 ≥ 3 · 只利尿剂支的「震颤抖中」改字',
    file: 'ere/system/train/train-message.js',
    find: '    era.print(`震颤抖中的${name}不断滴尿、形成了个小水坑…`); // :670',
    replace:
      '    era.print(`颤抖中的${name}不断滴尿、形成了个小水坑…`); // :670',
    tests: ['train-message'],
    must_mention: '裸身 29 ≥ 3 · 只利尿剂',
  },
  {
    desc: 'M8170 A 失禁段：裸身 29 ≥ 5 · 只漏尿癖支的水坑句改字',
    file: 'ere/system/train/train-message.js',
    find: '    era.print(`筋疲力尽的${name}不断滴尿、形成了个小水坑…`); // :666',
    replace:
      '    era.print(`筋疲力尽的${name}不断滴尿、积成了个小水坑…`); // :666',
    tests: ['train-message'],
    must_mention: '裸身 29 ≥ 5 · 只漏尿癖',
  },
  {
    desc: 'M8171 A 处女丧失段：触手夺处的旗标值 1 改 2',
    file: 'ere/system/train/train-message.js',
    find: '  if (tflag(15) === 1 && virgin) {',
    replace: '  if (tflag(15) === 2 && virgin) {',
    tests: ['train-message'],
    must_mention: '触手夺处（TFLAG:15 == 1）',
  },
  {
    desc: 'M8172 A 处女丧失段：无射精夺处丢掉「触手未登场」条件',
    file: 'ere/system/train/train-message.js',
    find: '  if (tflag(2) === 0 && tflag(15) === 0 && virgin) {',
    replace: '  if (tflag(2) === 0 && virgin) {',
    tests: ['train-message'],
    must_mention: '触手夺处（TFLAG:15 == 1）',
  },
  {
    desc: 'M8173 A 处女丧失段：近亲称谓的主人性别两项对调',
    file: 'ere/system/train/train-message.js',
    find: '    const kin = tal(era_flag.player, 122) ? titles[0] : titles[1];',
    replace:
      '    const kin = tal(era_flag.player, 122) ? titles[1] : titles[0];',
    tests: ['train-message'],
    must_mention: '近亲夺处十支',
  },
  {
    desc: 'M8174 A 处女丧失段：近亲表的表亲档 6 改 5',
    file: 'ere/system/train/train-message.js',
    find: "  6: ['表弟', '表妹'],",
    replace: "  5: ['表弟', '表妹'],",
    tests: ['train-message'],
    must_mention: '近亲夺处十支',
  },
  {
    desc: 'M8175 A 处女丧失段：近亲链丢掉「野狗未登场」门',
    file: 'ere/system/train/train-message.js',
    find: '    tq(target, 89) === 0 &&\n    tq(target, 90) === 0 &&',
    replace: '    tq(target, 90) === 0 &&',
    tests: ['train-message'],
    must_mention: '近亲链的四道门',
  },
  {
    desc: 'M8176 A 处女丧失段：野狗句的收尾改字',
    file: 'ere/system/train/train-message.js',
    find: '    era.print(`${name}把处女奉献给野狗了。`); // :722',
    replace: '    era.print(`${name}把处女献给野狗了。`); // :722',
    tests: ['train-message'],
    must_mention: '野狗夺处',
  },
  {
    desc: 'M8177 A 口交清洁段：双人口交支的助手射精旗标 6 改 5',
    file: 'ere/system/train/train-message.js',
    find: '  if (tflag(0) && tflag(6)) {',
    replace: '  if (tflag(0) && tflag(5)) {',
    tests: ['train-message'],
    must_mention: '双人口交支与普通支的四档拼法',
  },
  {
    desc: 'M8178 A 口交清洁段：顺从门槛 ABL:10 ≥ 3 抬到 ≥ 4',
    file: 'ere/system/train/train-message.js',
    find: '    if (abl(target, 10) >= 3) {',
    replace: '    if (abl(target, 10) >= 4) {',
    tests: ['train-message'],
    must_mention: '双人口交支与普通支的四档拼法',
  },
  {
    desc: 'M8179 A 口交清洁段：「助手和」的档界 ≥ 2 抬到 ≥ 3',
    file: 'ere/system/train/train-message.js',
    find: '    if (fellatio >= 2) {',
    replace: '    if (fellatio >= 3) {',
    tests: ['train-message'],
    must_mention: '双人口交支与普通支的四档拼法',
  },
  {
    desc: 'M8180 A 口交清洁段：收尾句的旗标 3 改 2',
    file: 'ere/system/train/train-message.js',
    find: '  if (fellatio === 3) {',
    replace: '  if (fellatio === 2) {',
    tests: ['train-message'],
    must_mention: '双人口交支与普通支的四档拼法',
  },
  {
    desc: 'M8181 A 绝顶子链：逆肛交大量支的「大量」删',
    file: 'ere/system/train/train-message.js',
    find: "            ? '阴茎从肛门里拔出后、大量漏出来的精液沿着股沟向下流…' // :446",
    replace:
      "            ? '阴茎从肛门里拔出后、漏出来的精液沿着股沟向下流…' // :446",
    tests: ['train-message'],
    must_mention: '逆强奸/逆肛交/口交',
  },
  {
    desc: 'M8182 A 绝顶子链：24 支的落红前缀删',
    file: 'ere/system/train/train-message.js',
    find: "`阴茎拔出后、阴部处${blood ? '渗出了处女的落红、混合着' : ''}${ejaculates === 2 ? '大量的' : ''}精液渗出来了…`",
    replace:
      "`阴茎拔出后、阴部处${ejaculates === 2 ? '大量的' : ''}精液渗出来了…`",
    tests: ['train-message'],
    must_mention: '逆强奸/逆肛交/口交',
  },
  {
    desc: 'M8183 A 绝顶子链：整支的 TFLAG:10 ≥ 1 门抬到 ≥ 2',
    file: 'ere/system/train/train-message.js',
    find: '    if (ejaculates >= 1) {',
    replace: '    if (ejaculates >= 2) {',
    tests: ['train-message'],
    must_mention: '逆强奸/逆肛交/口交',
  },
  {
    desc: 'M8184 A 射精链手臂：初次精液经验的失神门 <= 1 收窄成 < 1',
    file: 'ere/system/train/train-message.js',
    find: '  if (exp(target, 20) === 0 && tflag(899) <= 1) {',
    replace: '  if (exp(target, 20) === 0 && tflag(899) < 1) {',
    tests: ['train-message'],
    must_mention: 'TFLAG:1-1 · 指令 0 的公共段输出',
  },
  {
    desc: 'M9589 TARGET_EJAC_CHECK 早退守卫的 TALENT:122 判据删（只剩 121）',
    file: 'ere/event/source-check.js',
    find: `function target_ejac_check() {
  if (!tal(121) && !tal(122)) {
    return;
  }`,
    replace: `function target_ejac_check() {
  if (!tal(121)) {
    return; // 变异：TALENT:122 判据删
  }`,
    tests: ['source-check'],
    must_mention: '守卫（TALENT:121/122 均 0）',
  },
  {
    desc: 'M9590 TARGET_EJAC_CHECK 未熟随机修正 tal(135) 判据焊死为恒假',
    file: 'ere/event/source-check.js',
    find: `  const is_mijyuku = !!tal(135);
  const mijyuku = is_mijyuku
    ? Math.floor(Math.random() * 700) - Math.floor(Math.random() * 800) + 400
    : 0;`,
    replace: `  const is_mijyuku = false; // 变异：tal(135) 焊死为恒假
  const mijyuku = is_mijyuku
    ? Math.floor(Math.random() * 700) - Math.floor(Math.random() * 800) + 400
    : 0;`,
    tests: ['source-check'],
    must_mention: '未熟（TALENT:135）BASE:2 < 2000',
  },
  {
    desc: 'M9591 TARGET_EJAC_CHECK 克制系数 idiv(local,2) 删',
    file: 'ere/event/source-check.js',
    find: `  const mijyuku_kenkai = chara(cid).train.射精槽; // BASE:2 早期快照，用于未熟钳制判定

  let local = up(0) + up(1) + up(2) + up(14);
  if (tal(20)) {
    // 克制
    local = idiv(local, 2);
  }
  if (tal(70)) {
    // 接受快感
    local = times(local, 1.2);
  }
  if (tal(76)) {
    // 淫乱化
    local = times(local, 1.1);
  }
  if (tal(71)) {
    // 否定快感
    local = times(local, 0.8);
  }`,
    replace: `  const mijyuku_kenkai = chara(cid).train.射精槽; // BASE:2 早期快照，用于未熟钳制判定

  let local = up(0) + up(1) + up(2) + up(14);
  if (tal(20)) {
    // 变异：克制折减删
  }
  if (tal(70)) {
    // 接受快感
    local = times(local, 1.2);
  }
  if (tal(76)) {
    // 淫乱化
    local = times(local, 1.1);
  }
  if (tal(71)) {
    // 否定快感
    local = times(local, 0.8);
  }`,
    tests: ['source-check'],
    must_mention: '克制/接受快感/淫乱化/否定快感/媚药/利尿剂/安全套',
  },
  {
    desc: 'M9592 TARGET_EJAC_CHECK 接受快感系数 1.2 错改 1.0',
    file: 'ere/event/source-check.js',
    find: `  const mijyuku_kenkai = chara(cid).train.射精槽; // BASE:2 早期快照，用于未熟钳制判定

  let local = up(0) + up(1) + up(2) + up(14);
  if (tal(20)) {
    // 克制
    local = idiv(local, 2);
  }
  if (tal(70)) {
    // 接受快感
    local = times(local, 1.2);
  }`,
    replace: `  const mijyuku_kenkai = chara(cid).train.射精槽; // BASE:2 早期快照，用于未熟钳制判定

  let local = up(0) + up(1) + up(2) + up(14);
  if (tal(20)) {
    // 克制
    local = idiv(local, 2);
  }
  if (tal(70)) {
    // 接受快感（变异：系数错改 1.0）
    local = times(local, 1.0);
  }`,
    tests: ['source-check'],
    must_mention: '克制/接受快感/淫乱化/否定快感/媚药/利尿剂/安全套',
  },
  {
    desc: 'M9593 TARGET_EJAC_CHECK 淫乱化系数 1.1 错改 1.0',
    file: 'ere/event/source-check.js',
    find: `  const mijyuku_kenkai = chara(cid).train.射精槽; // BASE:2 早期快照，用于未熟钳制判定

  let local = up(0) + up(1) + up(2) + up(14);
  if (tal(20)) {
    // 克制
    local = idiv(local, 2);
  }
  if (tal(70)) {
    // 接受快感
    local = times(local, 1.2);
  }
  if (tal(76)) {
    // 淫乱化
    local = times(local, 1.1);
  }`,
    replace: `  const mijyuku_kenkai = chara(cid).train.射精槽; // BASE:2 早期快照，用于未熟钳制判定

  let local = up(0) + up(1) + up(2) + up(14);
  if (tal(20)) {
    // 克制
    local = idiv(local, 2);
  }
  if (tal(70)) {
    // 接受快感
    local = times(local, 1.2);
  }
  if (tal(76)) {
    // 淫乱化（变异：系数错改 1.0）
    local = times(local, 1.0);
  }`,
    tests: ['source-check'],
    must_mention: '克制/接受快感/淫乱化/否定快感/媚药/利尿剂/安全套',
  },
  {
    desc: 'M9594 TARGET_EJAC_CHECK 否定快感系数 0.8 错改 1.0',
    file: 'ere/event/source-check.js',
    find: `  const mijyuku_kenkai = chara(cid).train.射精槽; // BASE:2 早期快照，用于未熟钳制判定

  let local = up(0) + up(1) + up(2) + up(14);
  if (tal(20)) {
    // 克制
    local = idiv(local, 2);
  }
  if (tal(70)) {
    // 接受快感
    local = times(local, 1.2);
  }
  if (tal(76)) {
    // 淫乱化
    local = times(local, 1.1);
  }
  if (tal(71)) {
    // 否定快感
    local = times(local, 0.8);
  }`,
    replace: `  const mijyuku_kenkai = chara(cid).train.射精槽; // BASE:2 早期快照，用于未熟钳制判定

  let local = up(0) + up(1) + up(2) + up(14);
  if (tal(20)) {
    // 克制
    local = idiv(local, 2);
  }
  if (tal(70)) {
    // 接受快感
    local = times(local, 1.2);
  }
  if (tal(76)) {
    // 淫乱化
    local = times(local, 1.1);
  }
  if (tal(71)) {
    // 否定快感（变异：系数错改 1.0）
    local = times(local, 1.0);
  }`,
    tests: ['source-check'],
    must_mention: '克制/接受快感/淫乱化/否定快感/媚药/利尿剂/安全套',
  },
  {
    desc: 'M9595 TARGET_EJAC_CHECK 媚药系数 *2 错改 *1',
    file: 'ere/event/source-check.js',
    find: `  if (era.get(\`tequip:\${cid}:21\`)) {
    // 媚药
    local *= 2;
  }
  if (era.get(\`tequip:\${cid}:22\`)) {
    // 利尿剂
    local = idiv(local, 2);
  }
  if (era.get(\`tequip:\${cid}:37\`)) {`,
    replace: `  if (era.get(\`tequip:\${cid}:21\`)) {
    // 媚药（变异：系数错改 *1）
    local *= 1;
  }
  if (era.get(\`tequip:\${cid}:22\`)) {
    // 利尿剂
    local = idiv(local, 2);
  }
  if (era.get(\`tequip:\${cid}:37\`)) {`,
    tests: ['source-check'],
    must_mention: '克制/接受快感/淫乱化/否定快感/媚药/利尿剂/安全套',
  },
  {
    desc: 'M9596 TARGET_EJAC_CHECK 利尿剂折减删',
    file: 'ere/event/source-check.js',
    find: `  if (era.get(\`tequip:\${cid}:22\`)) {
    // 利尿剂
    local = idiv(local, 2);
  }
  if (era.get(\`tequip:\${cid}:37\`)) {
    // 调教对象安全套装着
    local = idiv(local, 2);
  }`,
    replace: `  if (era.get(\`tequip:\${cid}:22\`)) {
    // 变异：利尿剂折减删
  }
  if (era.get(\`tequip:\${cid}:37\`)) {
    // 调教对象安全套装着
    local = idiv(local, 2);
  }`,
    tests: ['source-check'],
    must_mention: '克制/接受快感/淫乱化/否定快感/媚药/利尿剂/安全套',
  },
  {
    desc: 'M9597 TARGET_EJAC_CHECK 安全套折减删',
    file: 'ere/event/source-check.js',
    find: `  if (era.get(\`tequip:\${cid}:37\`)) {
    // 调教对象安全套装着
    local = idiv(local, 2);
  }
  if (is_mijyuku) {
    local -= mijyuku;
  }`,
    replace: `  if (era.get(\`tequip:\${cid}:37\`)) {
    // 变异：安全套折减删
  }
  if (is_mijyuku) {
    local -= mijyuku;
  }`,
    tests: ['source-check'],
    must_mention: '克制/接受快感/淫乱化/否定快感/媚药/利尿剂/安全套',
  },
  {
    desc: 'M9598 TARGET_EJAC_CHECK 三档判定 > ejac*2 错改 >= ejac*2',
    file: 'ere/event/source-check.js',
    find: `  const ejac = era.get(\`maxbase:\${cid}:2\`) || 0;
  let grade;
  if (chara(cid).train.射精槽 > ejac * 2) {
    grade = 2;
  } else if (chara(cid).train.射精槽 > ejac) {`,
    replace: `  const ejac = era.get(\`maxbase:\${cid}:2\`) || 0;
  let grade;
  if (chara(cid).train.射精槽 >= ejac * 2) {
    // 变异：三档判定边界错改为 >=
    grade = 2;
  } else if (chara(cid).train.射精槽 > ejac) {`,
    tests: ['source-check'],
    must_mention: 'BASE:2 恰等于 EJAC*2 时归入普通档',
  },
  {
    desc: 'M9599 TARGET_EJAC_CHECK 大量射精档 EXPLV 最低档判据删',
    file: 'ere/event/source-check.js',
    find: `  const ejac = era.get(\`maxbase:\${cid}:2\`) || 0;
  let grade;
  if (chara(cid).train.射精槽 > ejac * 2) {
    grade = 2;
  } else if (chara(cid).train.射精槽 > ejac) {
    grade = 1;
  } else {
    grade = 0;
  }
  if (grade === 0) {
    return;
  }

  const callname = era.get(\`callname:\${cid}:-1\`) ?? '';
  const exp3 = chara(cid).train.射精经验;
  if (grade === 2) {
    add_lose(0, 20);
    add_lose(1, 100);
    if (exp3 < EXPLV[1]) {`,
    replace: `  const ejac = era.get(\`maxbase:\${cid}:2\`) || 0;
  let grade;
  if (chara(cid).train.射精槽 > ejac * 2) {
    grade = 2;
  } else if (chara(cid).train.射精槽 > ejac) {
    grade = 1;
  } else {
    grade = 0;
  }
  if (grade === 0) {
    return;
  }

  const callname = era.get(\`callname:\${cid}:-1\`) ?? '';
  const exp3 = chara(cid).train.射精经验;
  if (grade === 2) {
    add_lose(0, 20);
    add_lose(1, 100);
    if (false) {
      // 变异：EXPLV[1] 判据删`,
    tests: ['source-check'],
    must_mention: '大量射精档（BASE:2 > EJAC*2）',
  },
  {
    desc: 'M9600 TARGET_EJAC_CHECK 异常经验条件的 TALENT:122 判据删',
    file: 'ere/event/source-check.js',
    find: `    era.print(\`\${callname}大量射精\`);
    era.print('精液经验+1');
    era.print('射精经验+2');
    if (exp3 === 0 && !tal(122)) {
      chara(cid).dungeon.异常经验 += 1;
      era.print('异常经验+1');
    }`,
    replace: `    era.print(\`\${callname}大量射精\`);
    era.print('精液经验+1');
    era.print('射精经验+2');
    if (exp3 === 0) {
      // 变异：!tal(122) 判据删
      chara(cid).dungeon.异常经验 += 1;
      era.print('异常经验+1');
    }`,
    tests: ['source-check'],
    must_mention: '大量射精档 + 男人 → 不加异常经验',
  },
  {
    desc: 'M9601 TARGET_EJAC_CHECK 未熟体力上限下限 600 钳制删',
    file: 'ere/event/source-check.js',
    find: `      if (chara(cid).dungeon.体力上限 < 600) {
        chara(cid).dungeon.体力上限 = 600;
      }
      if (chara(cid).dungeon.气力上限 < 100) {
        chara(cid).dungeon.气力上限 = 100;
      }`,
    replace: `      // 变异：体力上限下限 600 钳制删
      if (chara(cid).dungeon.气力上限 < 100) {
        chara(cid).dungeon.气力上限 = 100;
      }`,
    tests: ['source-check'],
    must_mention: '钳制下限 600/100',
  },
  {
    desc: 'M9602 TARGET_EJAC_CHECK 大量射精档阴茎污渍位 4 错改 8',
    file: 'ere/event/source-check.js',
    find: `    chara(cid).train.阴茎污渍 |= 4;
    chara(cid).train.射精槽 -= ejac * 2;`,
    replace: `    chara(cid).train.阴茎污渍 |= 8; // 变异：位 4 错改 8
    chara(cid).train.射精槽 -= ejac * 2;`,
    tests: ['source-check'],
    must_mention: '扶她非男人 → 异常经验+1',
  },
  {
    desc: 'M9603 TARGET_WORMBABY_CHECK 早退守卫的 TALENT:191 判据删（只剩 190）',
    file: 'ere/event/source-check.js',
    find: `async function target_wormbaby_check() {
  if (!tal(190) && !tal(191)) {
    return;
  }`,
    replace: `async function target_wormbaby_check() {
  if (!tal(190)) {
    return; // 变异：TALENT:191 判据删
  }`,
    tests: ['source-check'],
    must_mention: '守卫（TALENT:190/191 均 0）',
  },
  {
    desc: 'M9604 TARGET_WORMBABY_CHECK 大量出产档阈值 25000 错改 30000',
    file: 'ere/event/source-check.js',
    find: `  let grade;
  if (local > 25000) {
    grade = 2;
  } else if (local > 10000) {`,
    replace: `  let grade;
  if (local > 30000) {
    // 变异：大量出产阈值错改为 30000
    grade = 2;
  } else if (local > 10000) {`,
    tests: ['source-check'],
    must_mention: '大量出产档（LOCAL > 25000）',
  },
  {
    desc: 'M9605 TARGET_WORMBABY_CHECK 普通出产档阈值 10000 错改 20000',
    file: 'ere/event/source-check.js',
    find: `  if (local > 25000) {
    grade = 2;
  } else if (local > 10000) {
    grade = 1;
  } else {
    grade = 0;
  }`,
    replace: `  if (local > 25000) {
    grade = 2;
  } else if (local > 20000) {
    // 变异：普通出产阈值错改为 20000
    grade = 1;
  } else {
    grade = 0;
  }`,
    tests: ['source-check'],
    must_mention: '普通出产档（10000 < LOCAL ≤ 25000）',
  },
  {
    desc: 'M9606 TARGET_WORMBABY_CHECK 克制系数 idiv(local,2) 删',
    file: 'ere/event/source-check.js',
    find: `  let local = up(0) + up(1) + up(2) + up(14);
  if (tal(20)) {
    // 克制
    local = idiv(local, 2);
  }
  if (tal(70)) {
    // 接受快感
    local = times(local, 1.2);
  }
  if (tal(76)) {
    // 淫乱化
    local = times(local, 1.1);
  }
  if (tal(71)) {
    // 否定快感
    local = times(local, 0.8);
  }
  if (era.get(\`tequip:\${cid}:21\`)) {
    // 媚药
    local *= 2;
  }

  let grade;
  if (local > 25000) {`,
    replace: `  let local = up(0) + up(1) + up(2) + up(14);
  if (tal(20)) {
    // 变异：克制折减删
  }
  if (tal(70)) {
    // 接受快感
    local = times(local, 1.2);
  }
  if (tal(76)) {
    // 淫乱化
    local = times(local, 1.1);
  }
  if (tal(71)) {
    // 否定快感
    local = times(local, 0.8);
  }
  if (era.get(\`tequip:\${cid}:21\`)) {
    // 媚药
    local *= 2;
  }

  let grade;
  if (local > 25000) {`,
    tests: ['source-check'],
    must_mention: '克制/接受快感/淫乱化/否定快感/媚药',
  },
  {
    desc: 'M9607 TARGET_WORMBABY_CHECK 接受快感系数 1.2 错改 1.0',
    file: 'ere/event/source-check.js',
    find: `  if (tal(70)) {
    // 接受快感
    local = times(local, 1.2);
  }
  if (tal(76)) {
    // 淫乱化
    local = times(local, 1.1);
  }
  if (tal(71)) {
    // 否定快感
    local = times(local, 0.8);
  }
  if (era.get(\`tequip:\${cid}:21\`)) {
    // 媚药
    local *= 2;
  }

  let grade;
  if (local > 25000) {`,
    replace: `  if (tal(70)) {
    // 接受快感（变异：系数错改 1.0）
    local = times(local, 1.0);
  }
  if (tal(76)) {
    // 淫乱化
    local = times(local, 1.1);
  }
  if (tal(71)) {
    // 否定快感
    local = times(local, 0.8);
  }
  if (era.get(\`tequip:\${cid}:21\`)) {
    // 媚药
    local *= 2;
  }

  let grade;
  if (local > 25000) {`,
    tests: ['source-check'],
    must_mention: '克制/接受快感/淫乱化/否定快感/媚药',
  },
  {
    desc: 'M9608 TARGET_WORMBABY_CHECK 淫乱化系数 1.1 错改 1.0',
    file: 'ere/event/source-check.js',
    find: `  if (tal(76)) {
    // 淫乱化
    local = times(local, 1.1);
  }
  if (tal(71)) {
    // 否定快感
    local = times(local, 0.8);
  }
  if (era.get(\`tequip:\${cid}:21\`)) {
    // 媚药
    local *= 2;
  }

  let grade;
  if (local > 25000) {`,
    replace: `  if (tal(76)) {
    // 淫乱化（变异：系数错改 1.0）
    local = times(local, 1.0);
  }
  if (tal(71)) {
    // 否定快感
    local = times(local, 0.8);
  }
  if (era.get(\`tequip:\${cid}:21\`)) {
    // 媚药
    local *= 2;
  }

  let grade;
  if (local > 25000) {`,
    tests: ['source-check'],
    must_mention: '克制/接受快感/淫乱化/否定快感/媚药',
  },
  {
    desc: 'M9609 TARGET_WORMBABY_CHECK 否定快感系数 0.8 错改 1.0',
    file: 'ere/event/source-check.js',
    find: `  if (tal(71)) {
    // 否定快感
    local = times(local, 0.8);
  }
  if (era.get(\`tequip:\${cid}:21\`)) {
    // 媚药
    local *= 2;
  }

  let grade;
  if (local > 25000) {`,
    replace: `  if (tal(71)) {
    // 否定快感（变异：系数错改 1.0）
    local = times(local, 1.0);
  }
  if (era.get(\`tequip:\${cid}:21\`)) {
    // 媚药
    local *= 2;
  }

  let grade;
  if (local > 25000) {`,
    tests: ['source-check'],
    must_mention: '克制/接受快感/淫乱化/否定快感/媚药',
  },
  {
    desc: 'M9610 TARGET_WORMBABY_CHECK 媚药系数 *2 错改 *1',
    file: 'ere/event/source-check.js',
    find: `  if (era.get(\`tequip:\${cid}:21\`)) {
    // 媚药
    local *= 2;
  }

  let grade;
  if (local > 25000) {`,
    replace: `  if (era.get(\`tequip:\${cid}:21\`)) {
    // 媚药（变异：系数错改 *1）
    local *= 1;
  }

  let grade;
  if (local > 25000) {`,
    tests: ['source-check'],
    must_mention: '克制/接受快感/淫乱化/否定快感/媚药',
  },
  {
    desc: 'M9611 TARGET_WORMBABY_CHECK 输出部位文案 both 分支判据删',
    file: 'ere/event/source-check.js',
    find: `  const site = tal(190) && tal(191) ? '膣内和直肠' : tal(190) ? '膣内' : '直肠';`,
    replace: `  const site = tal(190) ? '膣内' : '直肠'; // 变异：both 分支判据删`,
    tests: ['source-check'],
    must_mention: '私处+直肠同时产卵',
  },
  {
    desc: 'M9612 TARGET_WORMBABY_CHECK 大量出产档 EXPLV 最低档判据删',
    file: 'ere/event/source-check.js',
    find: `  if (grade === 2) {
    add_lose(0, 20);
    add_lose(1, 100);
    if (exp3 < EXPLV[1]) {
      set_src(12, src(12) + 20000);
      set_src(13, src(13) + 10000);
    } else if (exp3 < EXPLV[2]) {
      set_src(12, src(12) + 10000);
      set_src(13, src(13) + 8000);
    } else if (exp3 < EXPLV[3]) {
      set_src(12, src(12) + 7000);
      set_src(13, src(13) + 6000);
    } else if (exp3 < EXPLV[4]) {
      set_src(12, src(12) + 5000);
      set_src(13, src(13) + 4000);
    } else if (exp3 < EXPLV[5]) {
      set_src(12, src(12) + 3000);
      set_src(13, src(13) + 2000);
    } else {
      set_src(12, src(12) + 1800);
      set_src(13, src(13) + 1200);
    }

    era.print(\`\${callname}的\`);
    await era.printAndWait(\`\${site}排出了大量的蠕虫幼虫\`);`,
    replace: `  if (grade === 2) {
    add_lose(0, 20);
    add_lose(1, 100);
    if (false) {
      // 变异：EXPLV[1] 判据删
      set_src(12, src(12) + 20000);
      set_src(13, src(13) + 10000);
    } else if (exp3 < EXPLV[2]) {
      set_src(12, src(12) + 10000);
      set_src(13, src(13) + 8000);
    } else if (exp3 < EXPLV[3]) {
      set_src(12, src(12) + 7000);
      set_src(13, src(13) + 6000);
    } else if (exp3 < EXPLV[4]) {
      set_src(12, src(12) + 5000);
      set_src(13, src(13) + 4000);
    } else if (exp3 < EXPLV[5]) {
      set_src(12, src(12) + 3000);
      set_src(13, src(13) + 2000);
    } else {
      set_src(12, src(12) + 1800);
      set_src(13, src(13) + 1200);
    }

    era.print(\`\${callname}的\`);
    await era.printAndWait(\`\${site}排出了大量的蠕虫幼虫\`);`,
    tests: ['source-check'],
    must_mention: '大量出产档（LOCAL > 25000）',
  },
  {
    desc: 'M9613 TARGET_WORMBABY_CHECK 大量出产档生育经验 +=2 错改 +=1',
    file: 'ere/event/source-check.js',
    find: `    era.print(\`\${callname}的\`);
    await era.printAndWait(\`\${site}排出了大量的蠕虫幼虫\`);
    era.print('生育经验+2');
    chara(cid).chara.生育经验 += 2;`,
    replace: `    era.print(\`\${callname}的\`);
    await era.printAndWait(\`\${site}排出了大量的蠕虫幼虫\`);
    era.print('生育经验+2');
    chara(cid).chara.生育经验 += 1; // 变异：+=2 错改 +=1`,
    tests: ['source-check'],
    must_mention: '大量出产档（LOCAL > 25000）',
  },
  {
    desc: 'M9614 TARGET_WORMBABY_CHECK TFLAG:120/121 双写的 both 分支判据删',
    file: 'ere/event/source-check.js',
    find: `  if (tal(190) && tal(191)) {
    game.system.V虫产卵 = grade;
    game.system.A虫产卵 = grade;
  } else if (tal(190)) {
    game.system.V虫产卵 = grade;
  } else {
    game.system.A虫产卵 = grade;
  }`,
    replace: `  if (tal(190)) {
    // 变异：both 分支判据删，TALENT:191 单独分支不再写 A 虫产卵
    game.system.V虫产卵 = grade;
  } else {
    game.system.A虫产卵 = grade;
  }`,
    tests: ['source-check'],
    must_mention: '私处+直肠同时产卵',
  },
  {
    desc: 'M9615 PISSING_ECST_CHECK 守卫 grade===0 早退判据改错（漏尿经验恒记 0 档）',
    file: 'ere/event/source-check.js',
    find: `  } else if ((t29 >= 3 && tal57) || (t29 >= 1 && tequip22)) {
    grade = 1;
  }
  if (grade === 0) {
    return;
  }`,
    replace: `  } else if ((t29 >= 3 && tal57) || (t29 >= 1 && tequip22)) {
    grade = 1;
  }
  if (grade < 0) {
    // 变异：grade===0 早退判据改为恒假（grade 从不为负）
    return;
  }`,
    tests: ['source-check'],
    must_mention: '守卫（TFLAG:29=0）',
  },
  {
    desc: 'M9616 PISSING_ECST_CHECK grade5 的 TALENT:57 判据删',
    file: 'ere/event/source-check.js',
    find: `  let grade = 0;
  if (t29 >= 7 && tequip22 && tal57) {
    grade = 5;
  } else if ((t29 >= 7 && tequip22) || (t29 >= 5 && tequip22 && tal57)) {`,
    replace: `  let grade = 0;
  if (t29 >= 7 && tequip22) {
    // 变异：TALENT:57 判据删，grade5 与 grade4 分支重叠
    grade = 5;
  } else if ((t29 >= 7 && tequip22) || (t29 >= 5 && tequip22 && tal57)) {`,
    tests: ['source-check'],
    must_mention: '五档级联按判据优先级依次命中',
  },
  {
    desc: 'M9617 PISSING_ECST_CHECK grade4 的 TFLAG:29≥7 门槛错改 ≥10',
    file: 'ere/event/source-check.js',
    find: `  } else if ((t29 >= 7 && tequip22) || (t29 >= 5 && tequip22 && tal57)) {
    grade = 4;
  } else if (
    (t29 >= 7 && tal57) ||`,
    replace: `  } else if ((t29 >= 10 && tequip22) || (t29 >= 5 && tequip22 && tal57)) {
    // 变异：门槛 ≥7 错改 ≥10
    grade = 4;
  } else if (
    (t29 >= 7 && tal57) ||`,
    tests: ['source-check'],
    must_mention: '五档级联按判据优先级依次命中',
  },
  {
    desc: 'M9618 PISSING_ECST_CHECK grade3 的 (t29≥7&&tal57) 分支删',
    file: 'ere/event/source-check.js',
    find: `  } else if (
    (t29 >= 7 && tal57) ||
    (t29 >= 5 && tequip22) ||
    (t29 >= 3 && tequip22 && tal57)
  ) {
    grade = 3;`,
    replace: `  } else if (
    (t29 >= 5 && tequip22) ||
    (t29 >= 3 && tequip22 && tal57)
  ) {
    // 变异：(t29≥7&&tal57) 分支删
    grade = 3;`,
    tests: ['source-check'],
    must_mention: '五档级联按判据优先级依次命中',
  },
  {
    desc: 'M9619 PISSING_ECST_CHECK grade2 的 (t29≥3&&tequip22) 分支删',
    file: 'ere/event/source-check.js',
    find: `  } else if (
    (t29 >= 5 && tal57) ||
    (t29 >= 3 && tequip22) ||
    (t29 >= 1 && tequip22 && tal57)
  ) {
    grade = 2;`,
    replace: `  } else if (
    (t29 >= 5 && tal57) ||
    (t29 >= 1 && tequip22 && tal57)
  ) {
    // 变异：(t29≥3&&tequip22) 分支删
    grade = 2;`,
    tests: ['source-check'],
    must_mention: '五档级联按判据优先级依次命中',
  },
  {
    desc: 'M9620 PISSING_ECST_CHECK grade1 的 (t29≥3&&tal57) 分支删',
    file: 'ere/event/source-check.js',
    find: `  } else if ((t29 >= 3 && tal57) || (t29 >= 1 && tequip22)) {
    grade = 1;
  }
  if (grade === 0) {
    return;
  }`,
    replace: `  } else if (t29 >= 1 && tequip22) {
    // 变异：(t29≥3&&tal57) 分支删
    grade = 1;
  }
  if (grade === 0) {
    return;
  }`,
    tests: ['source-check'],
    must_mention: '五档级联按判据优先级依次命中',
  },
  {
    desc: 'M9621 PISSING_ECST_CHECK 放尿经验累加 +=grade 错改固定 +=1',
    file: 'ere/event/source-check.js',
    find: `  era.print(\`放尿经验+\${grade}\`);
  chara(cid).system.放尿经验 += grade;`,
    replace: `  era.print(\`放尿经验+\${grade}\`);
  chara(cid).system.放尿经验 += 1; // 变异：+=grade 错改固定 +=1`,
    tests: ['source-check'],
    must_mention: '五档级联按判据优先级依次命中',
  },
  {
    desc: 'M9622 PISSING_ECST_CHECK TEQUIP:22 清零规则 grade≥3 门槛错改 ≥4',
    file: 'ere/event/source-check.js',
    find: `  if (grade >= 3 || (grade === 2 && !tal57)) {
    chara(cid).system.利尿剂 = 0;
  }`,
    replace: `  if (grade >= 4 || (grade === 2 && !tal57)) {
    // 变异：grade≥3 门槛错改 ≥4
    chara(cid).system.利尿剂 = 0;
  }`,
    tests: ['source-check'],
    must_mention: 'TEQUIP:22 清零规则',
  },
  {
    desc: 'M9623 PISSING_ECST_CHECK TEQUIP:22 清零规则 grade===2 分支的 !TALENT:57 判据删',
    file: 'ere/event/source-check.js',
    find: `  if (grade >= 3 || (grade === 2 && !tal57)) {
    chara(cid).system.利尿剂 = 0;
  }
  chara(cid).train.阴茎污渍 |= 32;`,
    replace: `  if (grade >= 3 || grade === 2) {
    // 变异：!TALENT:57 判据删
    chara(cid).system.利尿剂 = 0;
  }
  chara(cid).train.阴茎污渍 |= 32;`,
    tests: ['source-check'],
    must_mention: 'TEQUIP:22 清零规则',
  },
  {
    desc: 'M9624 PISSING_ECST_CHECK 阴茎污渍位 32 错改 16',
    file: 'ere/event/source-check.js',
    find: `  chara(cid).train.阴茎污渍 |= 32;
  chara(cid).train.阴道污渍 |= 32;
  if (grade >= 2) {
    await soiling_cloth_no1(cid);
  }`,
    replace: `  chara(cid).train.阴茎污渍 |= 16; // 变异：位 32 错改 16
  chara(cid).train.阴道污渍 |= 32;
  if (grade >= 2) {
    await soiling_cloth_no1(cid);
  }`,
    tests: ['source-check'],
    must_mention: 'STAIN:2/3 弄脏标记（阴茎/阴道污渍位 32）',
  },
  {
    desc: 'M9625 PISSING_ECST_CHECK 阴道污渍位 32 错改 16',
    file: 'ere/event/source-check.js',
    find: `  chara(cid).train.阴茎污渍 |= 32;
  chara(cid).train.阴道污渍 |= 32;
  if (grade >= 2) {
    await soiling_cloth_no1(cid);
  }
}

// @EXP_GOT_CHECK`,
    replace: `  chara(cid).train.阴茎污渍 |= 32;
  chara(cid).train.阴道污渍 |= 16; // 变异：位 32 错改 16
  if (grade >= 2) {
    await soiling_cloth_no1(cid);
  }
}

// @EXP_GOT_CHECK`,
    tests: ['source-check'],
    must_mention: 'STAIN:2/3 弄脏标记（阴茎/阴道污渍位 32）',
  },
  {
    desc: 'M9626 PISSING_ECST_CHECK STAIN 弄脏两行被误套上 grade≥2 条件（1 档不该受限）',
    file: 'ere/event/source-check.js',
    find: `  chara(cid).train.阴茎污渍 |= 32;
  chara(cid).train.阴道污渍 |= 32;
  if (grade >= 2) {
    await soiling_cloth_no1(cid);
  }
}`,
    replace: `  if (grade >= 2) {
    // 变异：STAIN 弄脏两行误套上 grade≥2 条件，1 档不再弄脏
    chara(cid).train.阴茎污渍 |= 32;
    chara(cid).train.阴道污渍 |= 32;
    await soiling_cloth_no1(cid);
  }
}`,
    tests: ['source-check'],
    must_mention: 'STAIN:2/3 弄脏标记（阴茎/阴道污渍位 32）',
  },
  {
    desc: 'M9627 EXP_GOT_CHECK 段 1 的 UP:7<100 强制归零判据删',
    file: 'ere/event/source-check.js',
    find: `    let local = up(0) + up(1) + up(2) + up(14);
    const up7 = up(7);
    if (up7 < 100) {
      local = 0;
    } else if (up7 < 300) {`,
    replace: `    let local = up(0) + up(1) + up(2) + up(14);
    const up7 = up(7);
    if (false) {
      // 变异：UP:7<100 强制归零判据删
      local = 0;
    } else if (up7 < 300) {`,
    tests: ['source-check'],
    must_mention: '守卫（TFLAG:100=0）与 UP:7<100 强制 LOCAL=0',
  },
  {
    desc: 'M9628 EXP_GOT_CHECK 段 1 的 TFLAG:100 守卫判据删',
    file: 'ere/event/source-check.js',
    find: `    if (tflag(100)) {
      let grade = 0;
      if (local >= 12000) {
        grade = 16;
        set_up(11, times(up(11), 0.65));
        set_up(12, times(up(12), 0.3));`,
    replace: `    if (true) {
      // 变异：TFLAG:100 守卫判据删
      let grade = 0;
      if (local >= 12000) {
        grade = 16;
        set_up(11, times(up(11), 0.65));
        set_up(12, times(up(12), 0.3));`,
    tests: ['source-check'],
    must_mention: '守卫（TFLAG:100=0）与 UP:7<100 强制 LOCAL=0',
  },
  {
    desc: 'M9629 EXP_GOT_CHECK 段 1 最低档阈值 1000 错改 2500',
    file: 'ere/event/source-check.js',
    find: `      } else if (local >= 2000) {
        grade = 2;
        set_up(11, times(up(11), 0.85));
        set_up(12, times(up(12), 0.7));
      } else if (local >= 1000) {
        grade = 1;
        set_up(11, times(up(11), 0.9));
        set_up(12, times(up(12), 0.8));
      }
      if (era.get(\`tequip:\${cid}:88\`) && grade) {`,
    replace: `      } else if (local >= 2000) {
        grade = 2;
        set_up(11, times(up(11), 0.85));
        set_up(12, times(up(12), 0.7));
      } else if (local >= 2500) {
        // 变异：最低档阈值 1000 错改 2500
        grade = 1;
        set_up(11, times(up(11), 0.9));
        set_up(12, times(up(12), 0.8));
      }
      if (era.get(\`tequip:\${cid}:88\`) && grade) {`,
    tests: ['source-check'],
    must_mention: '最低/最高档级联，UP:11/UP:12 各自折减',
  },
  {
    desc: 'M9630 EXP_GOT_CHECK 段 1 最高档 UP:11 折减系数 0.65 错改 1.0',
    file: 'ere/event/source-check.js',
    find: `      if (local >= 12000) {
        grade = 16;
        set_up(11, times(up(11), 0.65));
        set_up(12, times(up(12), 0.3));
      } else if (local >= 8000) {`,
    replace: `      if (local >= 12000) {
        grade = 16;
        set_up(11, times(up(11), 1.0)); // 变异：折减系数 0.65 错改 1.0
        set_up(12, times(up(12), 0.3));
      } else if (local >= 8000) {`,
    tests: ['source-check'],
    must_mention: '最低/最高档级联，UP:11/UP:12 各自折减',
  },
  {
    desc: 'M9631 EXP_GOT_CHECK 段 1 主从爱情经验的 TEQUIP:88 判据删',
    file: 'ere/event/source-check.js',
    find: `      if (era.get(\`tequip:\${cid}:88\`) && grade) {
        era.print(\`主从爱情经验+\${grade}\`);
        chara(cid).stronghold.主从爱情经验 += grade;
      }
      if (grade) {
        era.print(\`侍奉快乐经验+\${grade}\`);`,
    replace: `      if (grade) {
        // 变异：TEQUIP:88 判据删，主从爱情经验恒随 grade 触发
        era.print(\`主从爱情经验+\${grade}\`);
        chara(cid).stronghold.主从爱情经验 += grade;
      }
      if (grade) {
        era.print(\`侍奉快乐经验+\${grade}\`);`,
    tests: ['source-check'],
    must_mention: 'TEQUIP:88（驯兽陪玩）联动主从爱情经验',
  },
  {
    desc: 'M9632 EXP_GOT_CHECK 段 2 的 UP:2<5000 系数 ×2 错改 ×1',
    file: 'ere/event/source-check.js',
    find: `    } else if (up(2) < 1000) {
      local *= 1;
    } else if (up(2) < 5000) {
      local *= 2;
    } else if (up(2) < 10000) {`,
    replace: `    } else if (up(2) < 1000) {
      local *= 1;
    } else if (up(2) < 5000) {
      local *= 1; // 变异：系数 ×2 错改 ×1
    } else if (up(2) < 10000) {`,
    tests: ['source-check'],
    must_mention: 'UP:2<300 强制 LOCAL=0；UP:11/12/6 三项折减',
  },
  {
    desc: 'M9633 EXP_GOT_CHECK 段 2 grade4 判定阈值 3000 错改 5000',
    file: 'ere/event/source-check.js',
    find: `    } else if (local >= 3000) {
      grade = 4;
      set_up(11, times(up(11), 0.9));
      set_up(12, times(up(12), 0.95));
      set_up(6, times(up(6), 1.05));
    } else if (local >= 2000) {
      grade = 2;
      set_up(11, times(up(11), 0.9));
      set_up(12, times(up(12), 1.0));
      set_up(6, times(up(6), 1.0));
    } else if (local >= 1000) {
      grade = 1;
      set_up(11, times(up(11), 0.95));
      set_up(12, times(up(12), 1.0));
      set_up(6, times(up(6), 1.0));
    }
    if (grade) {
      era.print(\`肛门快乐经验+\${grade}\`);`,
    replace: `    } else if (local >= 5000) {
      // 变异：grade4 阈值 3000 错改 5000
      grade = 4;
      set_up(11, times(up(11), 0.9));
      set_up(12, times(up(12), 0.95));
      set_up(6, times(up(6), 1.05));
    } else if (local >= 2000) {
      grade = 2;
      set_up(11, times(up(11), 0.9));
      set_up(12, times(up(12), 1.0));
      set_up(6, times(up(6), 1.0));
    } else if (local >= 1000) {
      grade = 1;
      set_up(11, times(up(11), 0.95));
      set_up(12, times(up(12), 1.0));
      set_up(6, times(up(6), 1.0));
    }
    if (grade) {
      era.print(\`肛门快乐经验+\${grade}\`);`,
    tests: ['source-check'],
    must_mention: 'UP:2<300 强制 LOCAL=0；UP:11/12/6 三项折减',
  },
  {
    desc: 'M9634 EXP_GOT_CHECK 段 2 最高档 UP:6 折减系数 1.2 错改 1.0',
    file: 'ere/event/source-check.js',
    find: `    if (local >= 12000) {
      grade = 16;
      set_up(11, times(up(11), 0.8));
      set_up(12, times(up(12), 0.9));
      set_up(6, times(up(6), 1.2));
    } else if (local >= 8000) {`,
    replace: `    if (local >= 12000) {
      grade = 16;
      set_up(11, times(up(11), 0.8));
      set_up(12, times(up(12), 0.9));
      set_up(6, times(up(6), 1.0)); // 变异：折减系数 1.2 错改 1.0
    } else if (local >= 8000) {`,
    tests: ['source-check'],
    must_mention: 'UP:2<300 强制 LOCAL=0；UP:11/12/6 三项折减',
  },
  {
    desc: 'M9635 EXP_GOT_CHECK 段 2 肛门快乐经验累加 +=grade 错改固定 +=1',
    file: 'ere/event/source-check.js',
    find: `    if (grade) {
      era.print(\`肛门快乐经验+\${grade}\`);
      chara(cid).stronghold.肛门快乐经验 += grade;
      game.train.A快乐经验 = grade;
    }`,
    replace: `    if (grade) {
      era.print(\`肛门快乐经验+\${grade}\`);
      chara(cid).stronghold.肛门快乐经验 += 1; // 变异：+=grade 错改固定 +=1
      game.train.A快乐经验 = grade;
    }`,
    tests: ['source-check'],
    must_mention: 'UP:2<300 强制 LOCAL=0；UP:11/12/6 三项折减',
  },
  {
    desc: 'M9636 EXP_GOT_CHECK 段 3 快乐 UP 总和为 0 时回退 UP:5 判据删',
    file: 'ere/event/source-check.js',
    find: `    let local = up(0) + up(1) + up(2) + up(14);
    if (local === 0) {
      local = up(5);
    }
    const up9 = up(9);`,
    replace: `    let local = up(0) + up(1) + up(2) + up(14);
    // 变异：回退 UP:5 判据删
    const up9 = up(9);`,
    tests: ['source-check'],
    must_mention: '快乐 UP 总和为 0 时回退 UP:5',
  },
  {
    desc: 'M9637 EXP_GOT_CHECK 段 3 最低档的 UP:9 双阈值判据删',
    file: 'ere/event/source-check.js',
    find: `    } else if (local >= 600 && up9 >= 300) {
      grade = 2;
      set_up(11, times(up(11), 0.85));
    } else if (local >= 300 && up9 >= 100) {
      grade = 1;
      set_up(11, times(up(11), 0.9));
    }`,
    replace: `    } else if (local >= 600 && up9 >= 300) {
      grade = 2;
      set_up(11, times(up(11), 0.85));
    } else if (local >= 300) {
      // 变异：UP:9 双阈值判据删（up9 >= 100 不再要求）
      grade = 1;
      set_up(11, times(up(11), 0.9));
    }`,
    tests: ['source-check'],
    must_mention: '快乐 UP 总和为 0 时回退 UP:5',
  },
  {
    desc: 'M9638 EXP_GOT_CHECK 段 3 从属快乐经验的 TEQUIP:88 判据删',
    file: 'ere/event/source-check.js',
    find: `    if (grade) {
      if (era.get(\`tequip:\${cid}:88\`)) {
        era.print(\`从属快乐经验+\${grade}\`);
        chara(cid).stronghold.从属快乐经验 += grade;
      }
      era.print(\`被虐快乐经验+\${grade}\`);`,
    replace: `    if (grade) {
      // 变异：TEQUIP:88 判据删，从属快乐经验恒随 grade 触发
      era.print(\`从属快乐经验+\${grade}\`);
      chara(cid).stronghold.从属快乐经验 += grade;
      era.print(\`被虐快乐经验+\${grade}\`);`,
    tests: ['source-check'],
    must_mention: 'TEQUIP:88（驯兽陪玩）联动从属快乐经验',
  },
  {
    desc: 'M9639 EXP_GOT_CHECK 助手折算 assi_grade===0 分支的归零改错为 ×0.5',
    file: 'ere/event/source-check.js',
    find: `        let local1 = grade;
        let local2 = 0;
        if (assi_grade === 0) {
          local1 = times(local1, 0);
        } else if (assi_grade === 1) {
          local1 = times(local1, 0.5);
        }`,
    replace: `        let local1 = grade;
        let local2 = 0;
        if (assi_grade === 0) {
          local1 = times(local1, 0.5); // 变异：归零改错为 ×0.5
        } else if (assi_grade === 1) {
          local1 = times(local1, 0.5);
        }`,
    tests: ['source-check'],
    must_mention: '助手侧按 ABL:20+TEQUIP:47 六档二次折算',
  },
  {
    desc: 'M9640 EXP_GOT_CHECK 助手折算 assi_grade===2 分支的 idiv(local1,2) 错改 idiv(local1,4)',
    file: 'ere/event/source-check.js',
    find: `        } else if (assi_grade === 2) {
          local1 = times(local1, 1.0);
          local2 = idiv(local1, 2);
        } else if (assi_grade === 3) {`,
    replace: `        } else if (assi_grade === 2) {
          local1 = times(local1, 1.0);
          local2 = idiv(local1, 4); // 变异：idiv(,2) 错改 idiv(,4)
        } else if (assi_grade === 3) {`,
    tests: ['source-check'],
    must_mention: '助手侧按 ABL:20+TEQUIP:47 六档二次折算',
  },
  {
    desc: 'M9641 EXP_GOT_CHECK 助手折算 assi_grade===3 分支的 *2 错改 *3',
    file: 'ere/event/source-check.js',
    find: `        } else if (assi_grade === 3) {
          local2 = local1 * 2;
        } else if (assi_grade === 4) {
          local2 = local1 * 10;`,
    replace: `        } else if (assi_grade === 3) {
          local2 = local1 * 3; // 变异：*2 错改 *3
        } else if (assi_grade === 4) {
          local2 = local1 * 10;`,
    tests: ['source-check'],
    must_mention: '助手侧按 ABL:20+TEQUIP:47 六档二次折算',
  },
  {
    desc: 'M9642 EXP_GOT_CHECK 助手折算 assi_grade===4 分支的 *10 错改 *20',
    file: 'ere/event/source-check.js',
    find: `        } else if (assi_grade === 4) {
          local2 = local1 * 10;
        } else if (assi_grade >= 5) {
          local2 = local1 * 50;
        }`,
    replace: `        } else if (assi_grade === 4) {
          local2 = local1 * 20; // 变异：*10 错改 *20
        } else if (assi_grade >= 5) {
          local2 = local1 * 50;
        }`,
    tests: ['source-check'],
    must_mention: '助手侧按 ABL:20+TEQUIP:47 六档二次折算',
  },
  {
    desc: 'M9643 AUTO_NUM_CHECK 跳过条件 i>=11 错改 i>=12（下标 11 不再跳过）',
    file: 'ere/event/source-check.js',
    find: `  for (let i = 0; i <= 16; i += 1) {
    if (i >= 11 && i !== 14) {
      continue;
    }`,
    replace: `  for (let i = 0; i <= 16; i += 1) {
    if (i >= 12 && i !== 14) {
      // 变异：跳过条件 i>=11 错改 i>=12
      continue;
    }`,
    tests: ['source-check'],
    must_mention: '跳过边界 LOCAL≥11 && LOCAL!=14',
  },
  {
    desc: 'M9644 AUTO_NUM_CHECK 例外条件 i!==14 判据删（下标 14 被误跳过）',
    file: 'ere/event/source-check.js',
    find: `  for (let i = 0; i <= 16; i += 1) {
    if (i >= 11 && i !== 14) {
      continue;
    }
    era.set(`,
    replace: `  for (let i = 0; i <= 16; i += 1) {
    if (i >= 11) {
      // 变异：i!==14 例外判据删
      continue;
    }
    era.set(`,
    tests: ['source-check'],
    must_mention: '跳过边界 LOCAL≥11 && LOCAL!=14',
  },
  {
    desc: 'M9645 AUTO_NUM_CHECK CFLAG:667 阈值 5 档判据改错为 6',
    file: 'ere/event/source-check.js',
    find: `  const rate = chara(target).event.自动调教回数;
  let m;
  if (rate < 5) {
    m = 1.25;
  } else if (rate < 10) {`,
    replace: `  const rate = chara(target).event.自动调教回数;
  let m;
  if (rate < 6) {
    // 变异：阈值 5 错改 6
    m = 1.25;
  } else if (rate < 10) {`,
    tests: ['source-check'],
    must_mention: 'CFLAG:667（自动调教回数）八档阈值',
  },
  {
    desc: 'M9646 AUTO_NUM_CHECK CFLAG:667 阈值 10 档系数 1.5 错改 1.25',
    file: 'ere/event/source-check.js',
    find: `  } else if (rate < 10) {
    m = 1.5;
  } else if (rate < 15) {`,
    replace: `  } else if (rate < 10) {
    m = 1.25; // 变异：系数 1.5 错改 1.25（与前一档相同）
  } else if (rate < 15) {`,
    tests: ['source-check'],
    must_mention: 'CFLAG:667（自动调教回数）八档阈值',
  },
  {
    desc: 'M9647 AUTO_NUM_CHECK CFLAG:667 阈值 40 档系数 7.25 错改 5.3',
    file: 'ere/event/source-check.js',
    find: `  } else if (rate < 40) {
    m = 7.25;
  } else {
    m = 9.9;
  }`,
    replace: `  } else if (rate < 40) {
    m = 5.3; // 变异：系数 7.25 错改 5.3（与前一档相同）
  } else {
    m = 9.9;
  }`,
    tests: ['source-check'],
    must_mention: 'CFLAG:667（自动调教回数）八档阈值',
  },
  {
    desc: 'M9648 AUTO_NUM_CHECK 循环上界 i<=16 错改 i<=10（下标 14 不再处理）',
    file: 'ere/event/source-check.js',
    find: `  for (let i = 0; i <= 16; i += 1) {
    if (i >= 11 && i !== 14) {
      continue;
    }
    era.set(
      \`delta:\${target}:\${i}\`,`,
    replace: `  for (let i = 0; i <= 10; i += 1) {
    // 变异：循环上界 i<=16 错改 i<=10，下标 14 不再处理
    if (i >= 11 && i !== 14) {
      continue;
    }
    era.set(
      \`delta:\${target}:\${i}\`,`,
    tests: ['source-check'],
    must_mention: '跳过边界 LOCAL≥11 && LOCAL!=14',
  },
  {
    desc: 'M9649 get_ablup_state：ARG&1 文案',
    file: 'ere/system/train/ablup.js',
    find: "if (arg & 1) text += '点数不足 ';",
    replace: "if (arg & 1) text += '分数不足 ';",
    tests: ['ablup'],
    must_mention: 'get_ablup_state',
  },
  {
    desc: 'M9650 get_ablup_state：ARG&4 文案',
    file: 'ere/system/train/ablup.js',
    find: "if (arg & 4) text += '能力不足';",
    replace: "if (arg & 4) text += '实力不足';",
    tests: ['ablup'],
    must_mention: 'get_ablup_state',
  },
  {
    desc: 'M9651 ablup0：Lv5+ 门槛越界值',
    file: 'ere/system/train/ablup.js',
    find: "  if (lv >= 5 && talent(74) === 0) return { blocked: 'talent' };",
    replace: "  if (lv > 5 && talent(74) === 0) return { blocked: 'talent' };",
    tests: ['ablup'],
    must_mention: 'ablup0：三档终止判定',
  },
  {
    desc: 'M9652 ablup0：已达最高级门槛',
    file: 'ere/system/train/ablup.js',
    find: "  if (talent(101) & 2) return { blocked: 'locked' };\n  if (lv >= calc * 5 + 10) return { blocked: 'max' };",
    replace:
      "  if (talent(101) & 2) return { blocked: 'locked' };\n  if (lv >= calc * 5 + 11) return { blocked: 'max' };",
    tests: ['ablup'],
    must_mention: 'ablup0：已达最高级',
  },
  {
    desc: 'M9653 ablup0：阴蒂钝感倍率',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(101)) a = times(a, 1.2); // 阴蒂钝感 :198-200',
    replace: 'if (talent(101)) a = times(a, 1.3); // 阴蒂钝感 :198-200',
    tests: ['ablup'],
    must_mention: '阴蒂钝感',
  },
  {
    desc: 'M9654 ablup0：阴蒂敏感倍率',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(102)) a = times(a, 0.8); // 阴蒂敏感 :202-204',
    replace: 'if (talent(102)) a = times(a, 0.7); // 阴蒂敏感 :202-204',
    tests: ['ablup'],
    must_mention: '阴蒂钝感',
  },
  {
    desc: 'M9655 ablup0：其他部位封锁折扣分母（第一档）',
    file: 'ere/system/train/ablup.js',
    find: '  if (lv > 5 && lv <= 10 && calc > 0) {\n    a = Math.trunc((a * (15 - calc)) / 15);\n  } else if (lv <= 15 && calc > 1) {\n    a = Math.trunc((a * (16 - calc)) / 15);\n  } else if (lv <= 20 && calc > 2) {\n    a = Math.trunc((a * (17 - calc)) / 15);\n  }\n  if (talent(76)) a = times(a, 0.8); // 淫乱 :215-217',
    replace:
      '  if (lv > 5 && lv <= 10 && calc > 0) {\n    a = Math.trunc((a * (14 - calc)) / 15);\n  } else if (lv <= 15 && calc > 1) {\n    a = Math.trunc((a * (16 - calc)) / 15);\n  } else if (lv <= 20 && calc > 2) {\n    a = Math.trunc((a * (17 - calc)) / 15);\n  }\n  if (talent(76)) a = times(a, 0.8); // 淫乱 :215-217',
    tests: ['ablup'],
    must_mention: '其他部位封锁折扣——三个区间分母恒为 15',
  },
  {
    desc: 'M9656 ablup0：自慰狂折扣倍率',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(74)) a = times(a, 0.8); // 自慰狂 :218-220',
    replace: 'if (talent(74)) a = times(a, 0.9); // 自慰狂 :218-220',
    tests: ['ablup'],
    must_mention: 'ablup0：Lv5-9 梯子字面值',
  },
  {
    desc: 'M9657 ablup1：Lv5+ 门槛越界值',
    file: 'ere/system/train/ablup.js',
    find: "  if (lv >= 5 && talent(78) === 0) return { blocked: 'talent' };",
    replace: "  if (lv > 5 && talent(78) === 0) return { blocked: 'talent' };",
    tests: ['ablup'],
    must_mention: 'ablup1：两档终止判定',
  },
  {
    desc: 'M9658 ablup1：巨乳倍率',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(110)) a = times(a, 1.1); // 巨乳',
    replace: 'if (talent(110)) a = times(a, 1.2); // 巨乳',
    tests: ['ablup'],
    must_mention: 'B钝感×1.20',
  },
  {
    desc: 'M9659 ablup1：绝壁倍率',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(116)) a = times(a, 0.65); // 绝壁',
    replace: 'if (talent(116)) a = times(a, 0.6); // 绝壁',
    tests: ['ablup'],
    must_mention: 'B钝感×1.20',
  },
  {
    desc: 'M9660 ablup1：贫乳倍率',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(109)) a = times(a, 0.8); // 贫乳',
    replace: 'if (talent(109)) a = times(a, 0.7); // 贫乳',
    tests: ['ablup'],
    must_mention: 'B钝感×1.20',
  },
  {
    desc: 'M9661 ablup1：点数不足位判定',
    file: 'ere/system/train/ablup.js',
    find: '  const juel = era.get(`juel:${cid}:14`) || 0;\n  let i = 0;\n  if (juel < a) i |= 1;',
    replace:
      '  const juel = era.get(`juel:${cid}:14`) || 0;\n  let i = 0;\n  if (juel <= a) i |= 1;',
    tests: ['ablup'],
    must_mention: 'ablup1：戒备森严三级加成',
  },
  {
    desc: 'M9662 ablup1：成功购买扣珠额',
    file: 'ere/system/train/ablup.js',
    find: '  if (r.blocked === null && r.i === 0) era.add(`juel:${cid}:14`, -r.a);',
    replace:
      '  if (r.blocked === null && r.i === 0) era.add(`juel:${cid}:14`, -r.a - 1);',
    tests: ['ablup'],
    must_mention: 'ablup1：两档终止判定',
  },
  {
    desc: 'M9663 ablup2：男人却下守卫',
    file: 'ere/system/train/ablup.js',
    find: "  if (talent(122)) return { blocked: 'male' };",
    replace: "  if (talent(121)) return { blocked: 'male' };",
    tests: ['ablup'],
    must_mention: 'ablup2：男人完全无法访问',
  },
  {
    desc: 'M9664 ablup2：私处钝感 A 倍率',
    file: 'ere/system/train/ablup.js',
    find: '  if (talent(103)) {\n    // 私处钝感：:186-190，A/B 加成率不同\n    a = times(a, 1.2);\n    b = times(b, 1.1);\n  }',
    replace:
      '  if (talent(103)) {\n    // 私处钝感：:186-190，A/B 加成率不同\n    a = times(a, 1.3);\n    b = times(b, 1.1);\n  }',
    tests: ['ablup'],
    must_mention: '私处钝感 A×1.20',
  },
  {
    desc: 'M9665 ablup2：私处钝感 B 倍率',
    file: 'ere/system/train/ablup.js',
    find: '  if (talent(103)) {\n    // 私处钝感：:186-190，A/B 加成率不同\n    a = times(a, 1.2);\n    b = times(b, 1.1);\n  }',
    replace:
      '  if (talent(103)) {\n    // 私处钝感：:186-190，A/B 加成率不同\n    a = times(a, 1.2);\n    b = times(b, 1.2);\n  }',
    tests: ['ablup'],
    must_mention: '私处钝感 A×1.20',
  },
  {
    desc: 'M9666 ablup2：性交经验不足位',
    file: 'ere/system/train/ablup.js',
    find: '  if (juel < a) i |= 1; // :227-228\n  if (exp < b) i |= 2; // :229-231',
    replace:
      '  if (juel < a) i |= 1; // :227-228\n  if (exp <= b) i |= 2; // :229-231',
    tests: ['ablup'],
    must_mention: '私处经验不足单独计为经验不足位',
  },
  {
    desc: 'M9667 ablup2：性爱狂折扣',
    file: 'ere/system/train/ablup.js',
    find: '  if (talent(75)) {\n    a = times(a, 0.8); // 性爱狂\n    b = times(b, 0.8);\n  }',
    replace:
      '  if (talent(75)) {\n    a = times(a, 0.9); // 性爱狂\n    b = times(b, 0.8);\n  }',
    tests: ['ablup'],
    must_mention: '私处钝感 A×1.20',
  },
  {
    desc: 'M9668 ablup2：B 复利率（10-14 档）',
    file: 'ere/system/train/ablup.js',
    find: '  // A＝私处点数需求、B＝私处经验需求，梯子与复利率彼此不对称（:119-170）\n  let a, b;\n  if (lv <= 9) {\n    a = [1, 20, 400, 8000, 20000, 40000, 60000, 90000, 120000, 180000][lv];\n    b = [2, 10, 30, 75, 150, 180, 250, 350, 500, 600][lv];\n  } else if (lv < 15) {\n    a = 180000;\n    b = 600;\n    for (let n = 0; n < lv - 9; n++) {\n      a = compound(a, 125);\n      b = compound(b, 115);\n    }\n  } else if (lv < 20) {',
    replace:
      '  // A＝私处点数需求、B＝私处经验需求，梯子与复利率彼此不对称（:119-170）\n  let a, b;\n  if (lv <= 9) {\n    a = [1, 20, 400, 8000, 20000, 40000, 60000, 90000, 120000, 180000][lv];\n    b = [2, 10, 30, 75, 150, 180, 250, 350, 500, 600][lv];\n  } else if (lv < 15) {\n    a = 180000;\n    b = 600;\n    for (let n = 0; n < lv - 9; n++) {\n      a = compound(a, 125);\n      b = compound(b, 116);\n    }\n  } else if (lv < 20) {',
    tests: ['ablup'],
    must_mention: 'Lv10 复利梯子首级（A/B 各自复利率不对称）',
  },
  {
    desc: 'M9669 ablup2：结算成功扣珠額',
    file: 'ere/system/train/ablup.js',
    find: '  if (r.blocked === null && r.i === 0) era.add(`juel:${cid}:1`, -r.a);',
    replace:
      '  if (r.blocked === null && r.i === 0) era.add(`juel:${cid}:1`, -r.a - 1);',
    tests: ['ablup'],
    must_mention: 'ablup2：三档终止判定',
  },
  {
    desc: 'M9670 ablup3：Lv5+ 门槛越界值',
    file: 'ere/system/train/ablup.js',
    find: "  if (lv >= 5 && talent(77) === 0) return { blocked: 'talent' };",
    replace: "  if (lv > 5 && talent(77) === 0) return { blocked: 'talent' };",
    tests: ['ablup'],
    must_mention: 'ablup3：三档终止判定',
  },
  {
    desc: 'M9671 ablup3：A钝感 B 倍率',
    file: 'ere/system/train/ablup.js',
    find: '  if (talent(105)) {\n    // A钝感\n    a = times(a, 1.2);\n    b = times(b, 1.1);\n  }',
    replace:
      '  if (talent(105)) {\n    // A钝感\n    a = times(a, 1.2);\n    b = times(b, 1.2);\n  }',
    tests: ['ablup'],
    must_mention: 'A钝感 A×1.20',
  },
  {
    desc: 'M9672 ablup3：尻穴狂折扣',
    file: 'ere/system/train/ablup.js',
    find: '  if (talent(77)) {\n    a = times(a, 0.8); // 尻穴狂\n    b = times(b, 0.8);\n  }',
    replace:
      '  if (talent(77)) {\n    a = times(a, 0.7); // 尻穴狂\n    b = times(b, 0.8);\n  }',
    tests: ['ablup'],
    must_mention: 'A钝感 A×1.20',
  },
  {
    desc: 'M9673 ablup3：肛门经验不足位',
    file: 'ere/system/train/ablup.js',
    find: '  if (juel < a) i |= 1; // :223-224\n  if (exp < b) i |= 2; // :225-227',
    replace:
      '  if (juel < a) i |= 1; // :223-224\n  if (exp <= b) i |= 2; // :225-227',
    tests: ['ablup'],
    must_mention: 'A钝感 A×1.20',
  },
  {
    desc: 'M9674 ablup3：其他部位封锁折扣 B 分母',
    file: 'ere/system/train/ablup.js',
    find: '  if (lv > 5 && lv <= 10 && calc > 0) {\n    a = Math.trunc((a * (15 - calc)) / 15);\n    b = Math.trunc((b * (20 - calc)) / 20);\n  } else if (lv <= 15 && calc > 1) {\n    a = Math.trunc((a * (16 - calc)) / 15);\n    b = Math.trunc((b * (21 - calc)) / 20);\n  } else if (lv <= 20 && calc > 2) {\n    a = Math.trunc((a * (17 - calc)) / 15);\n    b = Math.trunc((b * (22 - calc)) / 20);\n  }\n  if (talent(76)) {\n    a = times(a, 0.8); // 淫乱\n    b = times(b, 0.8);\n  }\n  if (talent(77)) {',
    replace:
      '  if (lv > 5 && lv <= 10 && calc > 0) {\n    a = Math.trunc((a * (15 - calc)) / 15);\n    b = Math.trunc((b * (19 - calc)) / 20);\n  } else if (lv <= 15 && calc > 1) {\n    a = Math.trunc((a * (16 - calc)) / 15);\n    b = Math.trunc((b * (21 - calc)) / 20);\n  } else if (lv <= 20 && calc > 2) {\n    a = Math.trunc((a * (17 - calc)) / 15);\n    b = Math.trunc((b * (22 - calc)) / 20);\n  }\n  if (talent(76)) {\n    a = times(a, 0.8); // 淫乱\n    b = times(b, 0.8);\n  }\n  if (talent(77)) {',
    tests: ['ablup'],
    must_mention: '其他部位封锁折扣——A分母15、B分母20不对称',
  },
  {
    desc: 'M9675 ablup4：Lv2 梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: 'let a = [1, 50, 600, 7000, 45000][lv];',
    replace: 'let a = [1, 50, 601, 7000, 45000][lv];',
    tests: ['ablup'],
    must_mention: 'ablup4：Lv0-4 梯子字面值',
  },
  {
    desc: 'M9676 ablup4：Lv3 戒备森严倍率',
    file: 'ere/system/train/ablup.js',
    find: 'if (lv === 3 && talent(27)) a = times(a, 2.0); // :64-66',
    replace: 'if (lv === 3 && talent(27)) a = times(a, 2.1); // :64-66',
    tests: ['ablup'],
    must_mention: 'ablup4：Lv0-4 梯子字面值',
  },
  {
    desc: 'M9677 ablup4：Lv4 戒备森严倍率',
    file: 'ere/system/train/ablup.js',
    find: 'if (lv === 4 && talent(27)) a = times(a, 3.0); // :70-72',
    replace: 'if (lv === 4 && talent(27)) a = times(a, 3.1); // :70-72',
    tests: ['ablup'],
    must_mention: 'ablup4：Lv0-4 梯子字面值',
  },
  {
    desc: 'M9678 ablup4：状态文案尾随空格',
    file: 'ere/system/train/ablup.js',
    find: `      if (i & 1) status += '点数不足 ';
      if (i & 2) status += '经验不足';
    }
    era.printButton(\`\${era.get('palamname:15')}点数×\${a}……\${status}\`, 0);`,
    replace: `      if (i & 1) status += '点数不足';
      if (i & 2) status += '经验不足';
    }
    era.printButton(\`\${era.get('palamname:15')}点数×\${a}……\${status}\`, 0);`,
    tests: ['ablup'],
    must_mention: 'ablup4：状态文案手写拼接',
  },
  {
    desc: 'M9679 ablup4：不满足重试文案',
    file: 'ere/system/train/ablup.js',
    find: "era.print('条件不足。'); // :33",
    replace: "era.print('条件足够。'); // :33",
    tests: ['ablup'],
    must_mention: 'ablup4：点数不足重试提示',
  },
  {
    desc: 'M9680 ablup5：Lv1 EXPLV 阈值索引',
    file: 'ere/system/train/ablup.js',
    find: 'a = exp1 >= EXPLV[3] ? 20 : 50;',
    replace: 'a = exp1 >= EXPLV[4] ? 20 : 50;',
    tests: ['ablup'],
    must_mention: 'EXPLV 阈值覆盖仅作用于 A',
  },
  {
    desc: 'M9681 ablup5：Lv1 覆盖后价格',
    file: 'ere/system/train/ablup.js',
    find: 'a = exp1 >= EXPLV[3] ? 20 : 50;',
    replace: 'a = exp1 >= EXPLV[3] ? 21 : 50;',
    tests: ['ablup'],
    must_mention: 'EXPLV 阈值覆盖仅作用于 A',
  },
  {
    desc: 'M9682 ablup5：Lv2 未达阈值价格',
    file: 'ere/system/train/ablup.js',
    find: 'a = exp1 >= EXPLV[4] ? 100 : 600;',
    replace: 'a = exp1 >= EXPLV[4] ? 100 : 601;',
    tests: ['ablup'],
    must_mention: 'EXPLV 阈值覆盖仅作用于 A',
  },
  {
    desc: 'M9683 ablup5：Lv3 覆盖后价格',
    file: 'ere/system/train/ablup.js',
    find: 'a = exp1 >= EXPLV[5] ? 500 : 7000;',
    replace: 'a = exp1 >= EXPLV[5] ? 501 : 7000;',
    tests: ['ablup'],
    must_mention: 'EXPLV 阈值覆盖仅作用于 A',
  },
  {
    desc: 'M9684 ablup5：Lv4 B 门槛',
    file: 'ere/system/train/ablup.js',
    find: `      a = exp1 >= EXPLV[5] ? 8000 : 45000;
      b = 300;`,
    replace: `      a = exp1 >= EXPLV[5] ? 8000 : 45000;
      b = 301;`,
    tests: ['ablup'],
    must_mention: '戒备森严在 Lv3/4 对 A、B 同时加成',
  },
  {
    desc: 'M9685 ablup5：Lv4 戒备森严倍率',
    file: 'ere/system/train/ablup.js',
    find: `      if (talent(27)) {
        a = times(a, 3.0);
        b = times(b, 3.0);
      }
    }

    const juel2 = era.get(\`juel:\${cid}:2\`) || 0;`,
    replace: `      if (talent(27)) {
        a = times(a, 3.1);
        b = times(b, 3.0);
      }
    }

    const juel2 = era.get(\`juel:\${cid}:2\`) || 0;`,
    tests: ['ablup'],
    must_mention: '戒备森严在 Lv3/4 对 A、B 同时加成',
  },
  {
    desc: 'M9686 ablup6：Lv0 C 梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: `    if (lv === 0) {
      [a, b, c, d, e] = [100, 20, 100, 1, 1];`,
    replace: `    if (lv === 0) {
      [a, b, c, d, e] = [100, 20, 101, 1, 1];`,
    tests: ['ablup'],
    must_mention: 'Lv0 梯子字面值，三个选项各自的按钮文案',
  },
  {
    desc: 'M9687 ablup6：倒错的折扣误加到 E',
    file: 'ere/system/train/ablup.js',
    find: `      // 倒错的：:59-65，仅 A/B/C/D，不含 E
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
    }`,
    replace: `      // 倒错的：:59-65，仅 A/B/C/D，不含 E
      a = times(a, 0.75);
      b = times(b, 0.75);
      c = times(c, 0.75);
      d = times(d, 0.75);
      e = times(e, 0.75);
    }`,
    tests: ['ablup'],
    must_mention: '倒错的×0.75 同时折扣 A/B/C/D，唯独不动 E',
  },
  {
    desc: 'M9688 ablup6：顺从门槛公式',
    file: 'ere/system/train/ablup.js',
    find: `    const gate_needed = lv + 1;
    const gate_line = \`\${era.get('ablname:0')}\${gate_needed}LV以上\`; // :68-70`,
    replace: `    const gate_needed = lv + 2;
    const gate_line = \`\${era.get('ablname:0')}\${gate_needed}LV以上\`; // :68-70`,
    tests: ['ablup'],
    must_mention: '顺从门槛（ABL:0）不足时三个选项同时计为能力不足',
  },
  {
    desc: 'M9689 ablup6：异常经验门槛错套到 Lv2',
    file: 'ere/system/train/ablup.js',
    find: `    if (lv === 3 && talent(86) === 0) {
      anomaly_line = \`\${era.get('expname:50')}有\`;
      if ((era.get(\`exp:\${cid}:50\`) || 0) === 0) {`,
    replace: `    if (lv === 2 && talent(86) === 0) {
      anomaly_line = \`\${era.get('expname:50')}有\`;
      if ((era.get(\`exp:\${cid}:50\`) || 0) === 0) {`,
    tests: ['ablup'],
    must_mention: '异常经验门槛仅 Lv3/4 生效',
  },
  {
    desc: 'M9690 ablup6：选项0 精液经验门槛位',
    file: 'ere/system/train/ablup.js',
    find: `    if (juel6 < a) i |= 1; // :100-101
    if (exp2 < e) i |= 2; // :102-104 绝顶经验
    if (exp20 < e) i |= 2; // :105-107 精液经验（同一个 bit）`,
    replace: `    if (juel6 < a) i |= 1; // :100-101
    if (exp2 < e) i |= 2; // :102-104 绝顶经验
    if (exp20 <= e) i |= 2; // :105-107 精液经验（同一个 bit）`,
    tests: ['ablup'],
    must_mention: '选项0 的绝顶/精液经验双门槛各自独立触发经验不足',
  },
  {
    desc: 'M9691 ablup6：Lv3 E 梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: '[a, b, c, d, e] = [10000, 2000, 0, 20, 10];',
    replace: '[a, b, c, d, e] = [10000, 2000, 0, 20, 11];',
    tests: ['ablup'],
    must_mention: '戒备森严在 Lv3/4 对 A/B/D 三级加成',
  },
  {
    desc: 'M9692 ablup6：Lv4 D 梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: '[a, b, c, d, e] = [30000, 8000, 0, 100, 20];',
    replace: '[a, b, c, d, e] = [30000, 8000, 0, 101, 20];',
    tests: ['ablup'],
    must_mention: 'Lv4 奉仕快乐经验门槛正好等于 D=100 时判定为充足',
  },
  {
    desc: 'M9693 ablup6：三个选项越界重试文案',
    file: 'ere/system/train/ablup.js',
    find: "      era.print('条件不足。请重新输入。'); // :211-212",
    replace: "      era.print('条件足够。请重新输入。'); // :211-212",
    tests: ['ablup'],
    must_mention: '三个选项各自的"条件不足。请重新输入。"重试文案',
  },
  {
    desc: 'M9694 ablup7：Lv2 梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: 'let a = [100, 1000, 5000, 15000, 35000][lv]; // :14-30',
    replace: 'let a = [100, 1000, 5001, 15000, 35000][lv]; // :14-30',
    tests: ['ablup'],
    must_mention: 'ablup7：Lv0-4 梯子字面值',
  },
  {
    desc: 'M9695 ablup7：修复重复折扣缺陷（第二段应判 TALENT:28）',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(80)) a = times(a, 0.5); // :37-40 缺陷：应判 TALENT:28，1:1 保留',
    replace:
      'if (talent(28)) a = times(a, 0.5); // :37-40 缺陷：应判 TALENT:28，1:1 保留',
    tests: ['ablup'],
    must_mention: '双重折扣缺陷',
  },
  {
    desc: 'M9696 ablup7：始终生效经验门槛分档',
    file: 'ere/system/train/ablup.js',
    find: `    let exp_line;
    if (lv < 2) {`,
    replace: `    let exp_line;
    if (lv < 3) {`,
    tests: ['ablup'],
    must_mention: '始终生效的第二条经验门槛',
  },
  {
    desc: 'M9697 ablup7：欲望门槛公式',
    file: 'ere/system/train/ablup.js',
    find: `    const gate_needed = lv + 1;
    const gate_line = \`\${era.get('ablname:1')}\${gate_needed}LV以上\`; // :43-45`,
    replace: `    const gate_needed = lv + 2;
    const gate_line = \`\${era.get('ablname:1')}\${gate_needed}LV以上\`; // :43-45`,
    tests: ['ablup'],
    must_mention: '欲望门槛（ABL:1）不足计为能力不足',
  },
  {
    desc: 'M9698 ablup7：不满足重试文案',
    file: 'ere/system/train/ablup.js',
    find: "era.print('条件不满足。'); // :118",
    replace: "era.print('条件已满足。'); // :118",
    tests: ['ablup'],
    must_mention: '点数不足重试提示"条件不满足。"',
  },
  {
    desc: 'M9699 ablup8：Lv1 梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: '    } else if (lv === 1) {\n      [a, b, c, d, e] = [500, 500, 0, 500, 300];',
    replace:
      '    } else if (lv === 1) {\n      [a, b, c, d, e] = [500, 500, 0, 501, 300];',
    tests: ['ablup'],
    must_mention: 'ablup8：Lv1 梯子字面值',
  },
  {
    desc: 'M9700 ablup8：开放折扣倍率',
    file: 'ere/system/train/ablup.js',
    find: `      // 开放：:57-64，先于倒错的，五个变量都受影响
      a = times(a, 0.5);`,
    replace: `      // 开放：:57-64，先于倒错的，五个变量都受影响
      a = times(a, 0.6);`,
    tests: ['ablup'],
    must_mention: '开放×0.50 先于倒错的×0.75',
  },
  {
    desc: 'M9701 ablup8：修复缺失哨兵缺陷',
    file: 'ere/system/train/ablup.js',
    find: `    if (b > 0) {
      if (juel9 < a) i |= 1; // :106-107`,
    replace: `    if (b >= 0) {
      if (juel9 < a) i |= 1; // :106-107`,
    tests: ['ablup'],
    must_mention: '缺失哨兵缺陷',
  },
  {
    desc: 'M9702 ablup8：Lv3 E 梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: '[a, b, c, d, e] = [0, 0, 10, 3000, 6000];',
    replace: '[a, b, c, d, e] = [0, 0, 10, 3000, 6001];',
    tests: ['ablup'],
    must_mention: 'Lv3 起选项0（B=0）不再渲染',
  },
  {
    desc: 'M9703 ablup8：选项1 绝顶经验门槛',
    file: 'ere/system/train/ablup.js',
    find: `      if (exp30 < c) j |= 2; // :151-153
      if (exp2 < 1) j |= 2; // :154-156`,
    replace: `      if (exp30 < c) j |= 2; // :151-153
      if (exp2 < 2) j |= 2; // :154-156`,
    tests: ['ablup'],
    must_mention: '选项1 绝顶经验门槛正好等于 1 时判定为充足',
  },
  {
    desc: 'M9704 ablup9：Lv1 梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: '[a, b, c, d] = [1000, 200, 0, 5000];',
    replace: '[a, b, c, d] = [1001, 200, 0, 5000];',
    tests: ['ablup'],
    must_mention: 'ablup9：Lv1 梯子字面值',
  },
  {
    desc: 'M9705 ablup9：双性恋折扣倍率',
    file: 'ere/system/train/ablup.js',
    find: `      // 双性恋：:52-58，先于倒错的
      a = times(a, 0.25);`,
    replace: `      // 双性恋：:52-58，先于倒错的
      a = times(a, 0.3);`,
    tests: ['ablup'],
    must_mention: '双性恋×0.25 先于倒错的×0.75',
  },
  {
    desc: 'M9706 ablup9：选项1 隐藏门槛',
    file: 'ere/system/train/ablup.js',
    find: `    const juel0 = era.get(\`juel:\${cid}:0\`) || 0;
    if (d > 0) {`,
    replace: `    const juel0 = era.get(\`juel:\${cid}:0\`) || 0;
    if (d >= 0) {`,
    tests: ['ablup'],
    must_mention: '隐藏选项(D=0)结构上不可选中',
  },
  {
    desc: 'M9707 ablup9：选项0 屈服点数判定',
    file: 'ere/system/train/ablup.js',
    find: `    if (juel5 < a) i |= 1; // :87-89
    if (juel6 < c) i |= 1; // :90-92`,
    replace: `    if (juel5 < a) i |= 1; // :87-89
    if (juel6 <= c) i |= 1; // :90-92`,
    tests: ['ablup'],
    must_mention: 'ablup9：Lv2 起选项0 显示屈服点数门槛',
  },
  {
    desc: 'M9708 ablup9：成功购买结算文案',
    file: 'ere/system/train/ablup.js',
    find: `await era.printAndWait(\`\${era.get('ablname:9') || ''}变为LV\${new_lv}。\`); // :185-188 PRINTW`,
    replace: `await era.printAndWait(\`\${era.get('ablname:9') || ''}升级到LV\${new_lv}。\`); // :185-188 PRINTW`,
    tests: ['ablup'],
    must_mention: '两个成功购买路径各自扣对应珠、升级、等待按键后显示变为LV',
  },

  // —— SOKUOCHI_CHECK（#462）——
  {
    desc: 'M9836 SOKUOCHI_CHECK 早退守卫删除（TALENT:73=0 时也会执行 12 组升级）',
    file: 'ere/event/source-check.js',
    find: `function sokuochi_check() {
  if (!tal(73)) {
    return;
  }`,
    replace: `function sokuochi_check() {
  // 变异：容易陷落守卫被删
  if (false) {
    return;
  }`,
    tests: ['source-check'],
    must_mention: 'SOKUOCHI_CHECK：守卫（TALENT:73=0）→ 早退，ABL 不变',
  },
  {
    desc: 'M9837 SOKUOCHI_CHECK TIERS LV1 门槛 1 错改 2',
    file: 'ere/event/source-check.js',
    find: `  const TIERS = [1, 30, 60, 200, 1000];`,
    replace: `  const TIERS = [2, 30, 60, 200, 1000]; // 变异：LV1 门槛 1 错改 2`,
    tests: ['source-check'],
    must_mention: 'SOKUOCHI_CHECK：12 组各自驱动升到 LV1',
  },
  {
    desc: 'M9838 SOKUOCHI_CHECK TIERS LV2 门槛 30 错改 60',
    file: 'ere/event/source-check.js',
    find: `  const TIERS = [1, 30, 60, 200, 1000];`,
    replace: `  const TIERS = [1, 60, 60, 200, 1000]; // 变异：LV2 门槛 30 错改 60`,
    tests: ['source-check'],
    must_mention: 'SOKUOCHI_CHECK：UP 阈值表与 EXP 阈值表不同',
  },
  {
    desc: 'M9839 SOKUOCHI_CHECK EXP_TIERS LV3 门槛 20 错改 40',
    file: 'ere/event/source-check.js',
    find: `  const EXP_TIERS = [1, 5, 20, 40, 100];`,
    replace: `  const EXP_TIERS = [1, 5, 40, 40, 100]; // 变异：LV3 门槛 20 错改 40`,
    tests: ['source-check'],
    must_mention: 'SOKUOCHI_CHECK：UP 阈值表与 EXP 阈值表不同',
  },
  {
    desc: 'M9840 SOKUOCHI_CHECK 阴蒂钝感封印位 &2 错改 &1',
    file: 'ere/event/source-check.js',
    find: `  if (!((tal(101) || 0) & 2)) {
    const lv = bump(sys, '阴蒂感觉', up(0), TIERS);`,
    replace: `  if (!((tal(101) || 0) & 1)) {
    // 变异：钝感封印位 &2 错改 &1
    const lv = bump(sys, '阴蒂感觉', up(0), TIERS);`,
    tests: ['source-check'],
    must_mention:
      'SOKUOCHI_CHECK：钝感封印（TALENT:101/103/105/107 的 &2 位）逐组阻断自身升级',
  },
  {
    desc: 'M9841 SOKUOCHI_CHECK 前置门槛 >=lv 错改 >lv',
    file: 'ere/event/source-check.js',
    find: `        domain[prop] < lv &&
        (!gate || gate() >= lv)`,
    replace: `        domain[prop] < lv &&
        (!gate || gate() > lv) // 变异：门槛 >=lv 错改 >lv`,
    tests: ['source-check'],
    must_mention: 'SOKUOCHI_CHECK：12 组各自驱动升到 LV1',
  },
  {
    desc: 'M9842 SOKUOCHI_CHECK 当前档位比较 <lv 错改 <=lv（ELSEIF 链跳档）',
    file: 'ere/event/source-check.js',
    find: `      if (
        value > tiers[lv - 1] &&
        domain[prop] < lv &&`,
    replace: `      if (
        value > tiers[lv - 1] &&
        domain[prop] <= lv && // 变异：< 错改 <=`,
    tests: ['source-check'],
    must_mention: 'SOKUOCHI_CHECK：ELSEIF 链每轮只前进一档',
  },
  {
    desc: 'M9843 SOKUOCHI_CHECK 阈值比较 >tiers 错改 >=tiers（含等号）',
    file: 'ere/event/source-check.js',
    find: `      if (
        value > tiers[lv - 1] &&`,
    replace: `      if (
        value >= tiers[lv - 1] && // 变异：> 错改 >=`,
    tests: ['source-check'],
    must_mention: 'SOKUOCHI_CHECK：阈值不含等号',
  },
  {
    desc: 'M9844 SOKUOCHI_CHECK 性别标签漏判 TALENT:121（扶她分支）',
    file: 'ere/event/source-check.js',
    find: `      const label = tal(122) || tal(121) ? '阴茎感觉' : ablname(0);`,
    replace: `      const label = tal(122) ? '阴茎感觉' : ablname(0); // 变异：漏判 TALENT:121`,
    tests: ['source-check'],
    must_mention: 'SOKUOCHI_CHECK：ABL:0 性别专属文案',
  },
  {
    desc: 'M9845 SOKUOCHI_CHECK ABL:2 驱动下标读错（up(1) 错改 up(0)）',
    file: 'ere/event/source-check.js',
    find: `    const lv = bump(sys, '私处感觉', up(1), TIERS);`,
    replace: `    const lv = bump(sys, '私处感觉', up(0), TIERS); // 变异：驱动下标 1 错改 0`,
    tests: ['source-check'],
    must_mention: 'SOKUOCHI_CHECK：驱动下标不与相邻组混淆',
  },
  {
    desc: 'M9846 SOKUOCHI_CHECK ABL:21 驱动下标读错（up(9) 错改 up(8)）',
    file: 'ere/event/source-check.js',
    find: `    const lv = bump(sys, '抖M气质', up(9), TIERS, () => sys.欲望);`,
    replace: `    const lv = bump(sys, '抖M气质', up(8), TIERS, () => sys.欲望); // 变异：驱动下标 9 错改 8`,
    tests: ['source-check'],
    must_mention: 'SOKUOCHI_CHECK：驱动下标不与相邻组混淆',
  },
  {
    desc: 'M9847 SOKUOCHI_CHECK ABL:12 误用 EXP_TIERS（应为 TIERS）',
    file: 'ere/event/source-check.js',
    find: `    const lv = bump(sys, '技巧', up(7), TIERS);`,
    replace: `    const lv = bump(sys, '技巧', up(7), EXP_TIERS); // 变异：误用 EXP_TIERS`,
    tests: ['source-check'],
    must_mention: 'SOKUOCHI_CHECK：ABL:12（技巧）用 UP 阈值表',
  },
  {
    desc: 'M9848 SOKUOCHI_CHECK ABL:17 门槛来源读错（乳房感觉错改欲望）',
    file: 'ere/event/source-check.js',
    find: `    const lv = bump(sys, '露出癖', up(8), TIERS, () => sys.乳房感觉);`,
    replace: `    const lv = bump(sys, '露出癖', up(8), TIERS, () => sys.欲望); // 变异：门槛来源读错`,
    tests: ['source-check'],
    must_mention: 'SOKUOCHI_CHECK：ABL:17（露出癖）门槛来源',
  },

  // —— TARGET_MILK_CHECK（#462，验收返工）——
  {
    desc: 'M9849 TARGET_MILK_CHECK 早退守卫删除（TALENT:130=0 时也会执行喷乳结算）',
    file: 'ere/event/source-check.js',
    find: `function target_milk_check() {
  if (!chara(cid).chara.母乳体质) {
    return;
  }`,
    replace: `function target_milk_check() {
  // 变异：容易陷落式守卫被删
  if (false) {
    return;
  }`,
    tests: ['source-check'],
    must_mention: 'TARGET_MILK_CHECK：守卫（TALENT:130=0）→ 早退，无喷乳结算',
  },
  {
    desc: 'M9850 TARGET_MILK_CHECK 克制折减删',
    file: 'ere/event/source-check.js',
    find: `  let local = idiv(up(0), 5) + idiv(up(1), 5) + idiv(up(2), 5) + up(14) * 3;
  if (tal(20)) {
    // 克制
    local = idiv(local, 2);
  }`,
    replace: `  let local = idiv(up(0), 5) + idiv(up(1), 5) + idiv(up(2), 5) + up(14) * 3;
  if (tal(20)) {
    // 变异：克制折减删
  }`,
    tests: ['source-check'],
    must_mention: '十一项乘算系数各自方向正确',
  },
  {
    desc: 'M9851 TARGET_MILK_CHECK 接受快感系数 1.2 错改 1.0',
    file: 'ere/event/source-check.js',
    find: `  let local = idiv(up(0), 5) + idiv(up(1), 5) + idiv(up(2), 5) + up(14) * 3;
  if (tal(20)) {
    // 克制
    local = idiv(local, 2);
  }
  if (tal(70)) {
    // 接受快感
    local = times(local, 1.2);
  }`,
    replace: `  let local = idiv(up(0), 5) + idiv(up(1), 5) + idiv(up(2), 5) + up(14) * 3;
  if (tal(20)) {
    // 克制
    local = idiv(local, 2);
  }
  if (tal(70)) {
    // 接受快感（变异：系数错改 1.0）
    local = times(local, 1.0);
  }`,
    tests: ['source-check'],
    must_mention: '十一项乘算系数各自方向正确',
  },
  {
    desc: 'M9852 TARGET_MILK_CHECK 淫乱化系数 1.1 错改 1.0',
    file: 'ere/event/source-check.js',
    find: `  let local = idiv(up(0), 5) + idiv(up(1), 5) + idiv(up(2), 5) + up(14) * 3;
  if (tal(20)) {
    // 克制
    local = idiv(local, 2);
  }
  if (tal(70)) {
    // 接受快感
    local = times(local, 1.2);
  }
  if (tal(76)) {
    // 淫乱化
    local = times(local, 1.1);
  }`,
    replace: `  let local = idiv(up(0), 5) + idiv(up(1), 5) + idiv(up(2), 5) + up(14) * 3;
  if (tal(20)) {
    // 克制
    local = idiv(local, 2);
  }
  if (tal(70)) {
    // 接受快感
    local = times(local, 1.2);
  }
  if (tal(76)) {
    // 淫乱化（变异：系数错改 1.0）
    local = times(local, 1.0);
  }`,
    tests: ['source-check'],
    must_mention: '十一项乘算系数各自方向正确',
  },
  {
    desc: 'M9853 TARGET_MILK_CHECK 否定快感系数 0.8 错改 1.0',
    file: 'ere/event/source-check.js',
    find: `  if (tal(71)) {
    // 否定快感
    local = times(local, 0.8);
  }
  if (tal(108)) {
    // 乳房敏感`,
    replace: `  if (tal(71)) {
    // 否定快感（变异：系数错改 1.0）
    local = times(local, 1.0);
  }
  if (tal(108)) {
    // 乳房敏感`,
    tests: ['source-check'],
    must_mention: '十一项乘算系数各自方向正确',
  },
  {
    desc: 'M9854 TARGET_MILK_CHECK 乳房敏感系数 1.5 错改 1.0',
    file: 'ere/event/source-check.js',
    find: `  if (tal(108)) {
    // 乳房敏感
    local = times(local, 1.5);
  }`,
    replace: `  if (tal(108)) {
    // 乳房敏感（变异：系数错改 1.0）
    local = times(local, 1.0);
  }`,
    tests: ['source-check'],
    must_mention: '十一项乘算系数各自方向正确',
  },
  {
    desc: 'M9855 TARGET_MILK_CHECK 媚药系数 *2 错改 *1',
    file: 'ere/event/source-check.js',
    find: `  if (tal(108)) {
    // 乳房敏感
    local = times(local, 1.5);
  }
  if (era.get(\`tequip:\${cid}:21\`)) {
    // 媚药
    local *= 2;
  }`,
    replace: `  if (tal(108)) {
    // 乳房敏感
    local = times(local, 1.5);
  }
  if (era.get(\`tequip:\${cid}:21\`)) {
    // 媚药（变异：系数错改 *1）
    local *= 1;
  }`,
    tests: ['source-check'],
    must_mention: '十一项乘算系数各自方向正确',
  },
  {
    desc: 'M9856 TARGET_MILK_CHECK 利尿剂折减删',
    file: 'ere/event/source-check.js',
    find: `  if (era.get(\`tequip:\${cid}:22\`)) {
    // 利尿剂
    local = idiv(local, 2);
  }
  if (era.get(\`talent:\${era_flag.player}:131\`)) {
    // 调教者幼儿退行`,
    replace: `  if (era.get(\`tequip:\${cid}:22\`)) {
    // 变异：利尿剂折减删
  }
  if (era.get(\`talent:\${era_flag.player}:131\`)) {
    // 调教者幼儿退行`,
    tests: ['source-check'],
    must_mention: '十一项乘算系数各自方向正确',
  },
  {
    desc: 'M9857 TARGET_MILK_CHECK 调教者幼儿退行系数 *2 错改 *1',
    file: 'ere/event/source-check.js',
    find: `  if (era.get(\`talent:\${era_flag.player}:131\`)) {
    // 调教者幼儿退行
    local *= 2;
  }`,
    replace: `  if (era.get(\`talent:\${era_flag.player}:131\`)) {
    // 调教者幼儿退行（变异：系数错改 *1）
    local *= 1;
  }`,
    tests: ['source-check'],
    must_mention: '十一项乘算系数各自方向正确',
  },
  {
    desc: 'M9858 TARGET_MILK_CHECK 调教者幼稚系数 *2 错改 *1',
    file: 'ere/event/source-check.js',
    find: `  if (era.get(\`talent:\${era_flag.player}:132\`)) {
    // 调教者幼稚
    local *= 2;
  }`,
    replace: `  if (era.get(\`talent:\${era_flag.player}:132\`)) {
    // 调教者幼稚（变异：系数错改 *1）
    local *= 1;
  }`,
    tests: ['source-check'],
    must_mention: '十一项乘算系数各自方向正确',
  },
  {
    desc: 'M9859 TARGET_MILK_CHECK 贫乳系数 0.5 错改 1.0',
    file: 'ere/event/source-check.js',
    find: `  if (tal(109)) {
    // 贫乳
    local = times(local, 0.5);
  }`,
    replace: `  if (tal(109)) {
    // 贫乳（变异：系数错改 1.0）
    local = times(local, 1.0);
  }`,
    tests: ['source-check'],
    must_mention: '十一项乘算系数各自方向正确',
  },
  {
    desc: 'M9860 TARGET_MILK_CHECK 绝壁系数 0.2 错改 1.0',
    file: 'ere/event/source-check.js',
    find: `  if (tal(116)) {
    // 绝壁
    local = times(local, 0.2);
  }`,
    replace: `  if (tal(116)) {
    // 绝壁（变异：系数错改 1.0）
    local = times(local, 1.0);
  }`,
    tests: ['source-check'],
    must_mention: '十一项乘算系数各自方向正确',
  },
  {
    desc: 'M9861 TARGET_MILK_CHECK 三档判定 > ejac*2 错改 >= ejac*2',
    file: 'ere/event/source-check.js',
    find: `  const ejac = era.get(\`maxbase:\${cid}:3\`) || 0;
  let grade;
  if (chara(cid).train.母乳槽 > ejac * 2) {`,
    replace: `  const ejac = era.get(\`maxbase:\${cid}:3\`) || 0;
  let grade;
  if (chara(cid).train.母乳槽 >= ejac * 2) {
    // 变异：判据 > 错改 >=`,
    tests: ['source-check'],
    must_mention: 'TARGET_MILK_CHECK：三档判定边界',
  },
  {
    desc: 'M9862 TARGET_MILK_CHECK 大量档 EXPLV 最低档判据删',
    file: 'ere/event/source-check.js',
    find: `  if (grade === 2) {
    add_lose(0, 20);
    add_lose(1, 100);
    if (exp54 < EXPLV[1]) {`,
    replace: `  if (grade === 2) {
    add_lose(0, 20);
    add_lose(1, 100);
    if (false) {
      // 变异：EXPLV[1] 判据删`,
    tests: ['source-check'],
    must_mention: '恒加异常经验',
  },
  {
    desc: 'M9863 TARGET_MILK_CHECK 异常经验条件误加性别门槛（应恒不带门槛，区别于 TARGET_EJAC_CHECK）',
    file: 'ere/event/source-check.js',
    find: `    era.print(\`\${callname}的乳头喷出了大量的母乳。\`);
    era.print('喷奶经验+2');
    if (exp54 === 0) {`,
    replace: `    era.print(\`\${callname}的乳头喷出了大量的母乳。\`);
    era.print('喷奶经验+2');
    if (exp54 === 0 && !tal(122)) {
      // 变异：误加 TALENT:122 性别门槛`,
    tests: ['source-check'],
    must_mention: '恒加异常经验',
  },
  {
    desc: 'M9864 TARGET_MILK_CHECK 普通档胸部污渍位 16 错改 32',
    file: 'ere/event/source-check.js',
    find: `    chara(cid).train.喷奶经验 += 1;
    chara(cid).train.胸部污渍 |= 16;`,
    replace: `    chara(cid).train.喷奶经验 += 1;
    chara(cid).train.胸部污渍 |= 32; // 变异：弄脏位 16 错改 32`,
    tests: ['source-check'],
    must_mention: 'TARGET_MILK_CHECK：普通档',
  },
  {
    desc: 'M9865 TARGET_MILK_CHECK 大量档喷奶经验 += 2 错改 += 1',
    file: 'ere/event/source-check.js',
    find: `    era.print('喷奶经验+2');
    if (exp54 === 0) {
      chara(cid).dungeon.异常经验 += 1;
      era.print('异常经验+1');
    }
    chara(cid).train.喷奶经验 += 2;`,
    replace: `    era.print('喷奶经验+2');
    if (exp54 === 0) {
      chara(cid).dungeon.异常经验 += 1;
      era.print('异常经验+1');
    }
    chara(cid).train.喷奶经验 += 1; // 变异：增量 2 错改 1`,
    tests: ['source-check'],
    must_mention: 'TARGET_MILK_CHECK：大量档（BASE:3 > EJAC*2）',
  },
  {
    desc: 'M9866 TARGET_MILK_CHECK 搾乳器检查 TEQUIP:90 判据删（覆盖时仍会累加）',
    file: 'ere/event/source-check.js',
    find: `    game.system.对象喷乳 += 1;
    if (era.get(\`tequip:\${cid}:16\`) && !era.get(\`tequip:\${cid}:90\`)) {
      game.system.榨乳中 += 1;
    }`,
    replace: `    game.system.对象喷乳 += 1;
    if (era.get(\`tequip:\${cid}:16\`)) {
      // 变异：TEQUIP:90 判据删
      game.system.榨乳中 += 1;
    }`,
    tests: ['source-check'],
    must_mention: '搾乳器检查',
  },
  {
    desc: 'M9867 TARGET_MILK_CHECK 大量档对象喷乳 TFLAG:11 += 2 错改 += 1',
    file: 'ere/event/source-check.js',
    find: `    chara(cid).train.母乳槽 = ejac - 1;
    }

    game.system.对象喷乳 += 2;`,
    replace: `    chara(cid).train.母乳槽 = ejac - 1;
    }

    game.system.对象喷乳 += 1; // 变异：增量 2 错改 1`,
    tests: ['source-check'],
    must_mention: 'TARGET_MILK_CHECK：大量档（BASE:3 > EJAC*2）',
  },

  // —— #459（COMF3_自慰 头部升格跳转补齐）——
  {
    desc: 'M9529 COM3 头部升格跳转删除（jump_advanced(3) 整段拿掉，PREVCOM 升格判据失效）',
    file: 'ere/system/train/com-caress.js',
    find: `async function com3() {
  // :14-17 头部升格跳转（LOCAL = 3 → CASE 3：自慰 → 口交时自慰 → 125）
  const jumped = await jump_advanced(3);
  if (jumped !== false) {
    return jumped;
  }

  const target = era_flag.target;
  const player = era_flag.player;`,
    replace: `async function com3() {
  // 变异：升格跳转整段删除
  const target = era_flag.target;
  const player = era_flag.player;`,
    tests: ['com-caress'],
    must_mention: 'JUMP COM125',
  },

  // —— #461（SYSTEM_SOURCE.ERB：SOURCE_CHECK_AUTO 新逻辑 + EQUIP_COM 接线核实）——
  {
    desc: 'M9769 AUTO ANTI/LIKE 门槛：source_check_up_anti() 调用删（专属门槛失去 ANTI 分支）',
    file: 'ere/event/source-check.js',
    find: `    source_check_up_anti();
    source_check_up_like();`,
    replace: `    source_check_up_like();`,
    tests: ['source-check'],
    must_mention: 'AUTO 专属门槛',
  },
  {
    desc: 'M9770 AUTO ANTI/LIKE 门槛：PLAYER==MASTER 判据删（助手调教也能结算 ANTI/LIKE）',
    file: 'ere/event/source-check.js',
    find: `  if ((era.get(\`cflag:\${cid}:1\`) || 0) === 0 && player === MASTER) {`,
    replace: `  if ((era.get(\`cflag:\${cid}:1\`) || 0) === 0) {`,
    tests: ['source-check'],
    must_mention: 'AUTO 专属门槛',
  },
  {
    desc: 'M9771 AUTO ANTI/LIKE 门槛：CFLAG:1==0 判据取反（反抗刻印生效时反而结算）',
    file: 'ere/event/source-check.js',
    find: `  if ((era.get(\`cflag:\${cid}:1\`) || 0) === 0 && player === MASTER) {`,
    replace: `  if ((era.get(\`cflag:\${cid}:1\`) || 0) !== 0 && player === MASTER) {`,
    tests: ['source-check'],
    must_mention: 'AUTO 专属门槛',
  },
  {
    desc: 'M9772 SOURCE_CHECK_UP_ANTI：反感追加写入的 UP id 错（11 → 12）',
    file: 'ere/event/source-check.js',
    find: '  add_up(11, src(15)); // 反感追加 → 反感',
    replace: '  add_up(12, src(15)); // 变异：UP id 误写',
    tests: ['source-check'],
    must_mention: 'AUTO 专属门槛',
  },
  {
    desc: 'M9773 AUTO_NUM_CHECK 倍率表：第 1 档 1.25 → 1.3',
    file: 'ere/event/source-check.js',
    find: '    m = 1.25;',
    replace: '    m = 1.3;',
    tests: ['source-check'],
    must_mention: '八档倍率表',
  },
  {
    desc: 'M9774 AUTO_NUM_CHECK 倍率表：第 2 档 1.5 → 1.6',
    file: 'ere/event/source-check.js',
    find: '    m = 1.5;',
    replace: '    m = 1.6;',
    tests: ['source-check'],
    must_mention: '八档倍率表',
  },
  {
    desc: 'M9775 AUTO_NUM_CHECK 倍率表：第 3 档门槛 < 15 抬到 < 16',
    file: 'ere/event/source-check.js',
    find: '  } else if (rate < 15) {',
    replace: '  } else if (rate < 16) {',
    tests: ['source-check'],
    must_mention: '八档倍率表',
  },
  {
    desc: 'M9776 AUTO_NUM_CHECK 倍率表：末档 9.9 → 9.5',
    file: 'ere/event/source-check.js',
    find: '    m = 9.9;',
    replace: '    m = 9.5;',
    tests: ['source-check'],
    must_mention: '八档倍率表',
  },
  {
    desc: 'M9777 AUTO_NUM_CHECK 跳过逻辑：UP:14 例外删（14 也被当作跳过处理）',
    file: 'ere/event/source-check.js',
    find: '    if (i >= 11 && i !== 14) {',
    replace: '    if (i >= 11) {',
    tests: ['source-check'],
    must_mention: 'UP:14 是例外不跳',
  },
  {
    desc: 'M9778 AUTO_NUM_CHECK 跳过逻辑：跳过起点 >= 11 收窄成 > 11（UP:11 不再跳过）',
    file: 'ere/event/source-check.js',
    find: '    if (i >= 11 && i !== 14) {',
    replace: '    if (i > 11 && i !== 14) {',
    tests: ['source-check'],
    must_mention: 'UP:14 是例外不跳',
  },
  {
    desc: 'M9779 AUTO handler Block A：UP:0 减半行删（气力 0 时快乐不再减半）',
    file: 'ere/event/source-check.js',
    find: `  // :2632-2638 气力０的快乐减半（与 manual 同款判据，含 TFLAG:201 豁免）
  if ((era.get(\`base:\${cid}:1\`) || 0) <= 0 && tflag(201) !== 1) {
    set_up(0, idiv(up(0), 2));
    set_up(1, idiv(up(1), 2));
    set_up(2, idiv(up(2), 2));
    set_up(14, idiv(up(14), 2));
  }`,
    replace: `  // :2632-2638 气力０的快乐减半（与 manual 同款判据，含 TFLAG:201 豁免）
  if ((era.get(\`base:\${cid}:1\`) || 0) <= 0 && tflag(201) !== 1) {
    set_up(1, idiv(up(1), 2));
    set_up(2, idiv(up(2), 2));
    set_up(14, idiv(up(14), 2));
  }`,
    tests: ['source-check'],
    must_mention: '两处气力 0 减半块',
  },
  {
    desc: 'M9780 AUTO handler Block A：BASE:1 <= 0 边界收窄成 < 0（气力恰为 0 时不再减半）',
    file: 'ere/event/source-check.js',
    find: `  // :2632-2638 气力０的快乐减半（与 manual 同款判据，含 TFLAG:201 豁免）
  if ((era.get(\`base:\${cid}:1\`) || 0) <= 0 && tflag(201) !== 1) {`,
    replace: `  // :2632-2638 气力０的快乐减半（与 manual 同款判据，含 TFLAG:201 豁免）
  if ((era.get(\`base:\${cid}:1\`) || 0) < 0 && tflag(201) !== 1) {`,
    tests: ['source-check'],
    must_mention: '两处气力 0 减半块',
  },
  {
    desc: 'M9781 AUTO handler Block B：减半数组漏 UP:9（AUTO_NUM_CHECK 放大后不再减半）',
    file: 'ere/event/source-check.js',
    find: `  // :2750-2763 气力０的感情减半与损耗加倍（与 manual 同款判据，但没有
  // TFLAG:201 豁免——原作 1:1 保留）
  if ((era.get(\`base:\${cid}:1\`) || 0) <= 0) {
    for (const k of [3, 4, 5, 7, 9, 13]) {`,
    replace: `  // :2750-2763 气力０的感情减半与损耗加倍（与 manual 同款判据，但没有
  // TFLAG:201 豁免——原作 1:1 保留）
  if ((era.get(\`base:\${cid}:1\`) || 0) <= 0) {
    for (const k of [3, 4, 5, 7, 13]) {`,
    tests: ['source-check'],
    must_mention: '两处气力 0 减半块',
  },
  {
    desc: 'M9782 AUTO handler Block B：BASE:1 <= 0 边界收窄成 < 0（气力恰为 0 时不再减半加倍）',
    file: 'ere/event/source-check.js',
    find: `  // :2750-2763 气力０的感情减半与损耗加倍（与 manual 同款判据，但没有
  // TFLAG:201 豁免——原作 1:1 保留）
  if ((era.get(\`base:\${cid}:1\`) || 0) <= 0) {
    for (const k of [3, 4, 5, 7, 9, 13]) {`,
    replace: `  // :2750-2763 气力０的感情减半与损耗加倍（与 manual 同款判据，但没有
  // TFLAG:201 豁免——原作 1:1 保留）
  if ((era.get(\`base:\${cid}:1\`) || 0) < 0) {
    for (const k of [3, 4, 5, 7, 9, 13]) {`,
    tests: ['source-check'],
    must_mention: '两处气力 0 减半块',
  },
  {
    desc: 'M9783 PALAM_UP_CHECK_MINI：顺手"修好" ORDER 末位 14 → 15（原作缺陷被意外补全）',
    file: 'ere/event/source-check.js',
    find: '  const ORDER = [0, 1, 2, 14, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];',
    replace:
      '  const ORDER = [0, 1, 2, 14, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15];',
    tests: ['source-check'],
    must_mention: 'UPID 14 结算两次、UPID 15 永不写回',
  },
  {
    desc: 'M9784 PALAM_UP_CHECK_MINI：ORDER 首个 UPID 14（第 4 位）删（UP:14 只单次结算）',
    file: 'ere/event/source-check.js',
    find: '  const ORDER = [0, 1, 2, 14, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];',
    replace:
      '  const ORDER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];',
    tests: ['source-check'],
    must_mention: 'UPID 14 结算两次、UPID 15 永不写回',
  },
  {
    desc: 'M9785 SOURCE_CHECK_AUTO：down_map.clear() 删（DOWN 跨回合残留）',
    file: 'ere/event/source-check.js',
    find: `  down_map.clear();

  // :2601-2602 调教者能力检查
  player_skill_check();
  master_skill_check();`,
    replace: `  // :2601-2602 调教者能力检查
  player_skill_check();
  master_skill_check();`,
    tests: ['source-check'],
    must_mention: '不跨回合残留 DOWN',
  },
  {
    desc: 'M9786 AUTO handler：deltabase→base 结算跳过扣减（损耗当场生效但不写回 base）',
    file: 'ere/event/source-check.js',
    find: `  // :2773-2774 体力气力扣减（deltabase → base 当场结算并清零，钳
  // 0..maxbase——与 manual 同款语义，见文件头；AUTO 不显示损耗条，故不需要
  // manual 那两个 lose0/lose1 快照变量）
  for (const k of [0, 1]) {
    const loss = lose(k);
    if (loss !== 0) {
      const base = era.get(\`base:\${cid}:\${k}\`) || 0;
      const max = era.get(\`maxbase:\${cid}:\${k}\`) || 0;
      let next = base - loss;`,
    replace: `  // :2773-2774 体力气力扣减（deltabase → base 当场结算并清零，钳
  // 0..maxbase——与 manual 同款语义，见文件头；AUTO 不显示损耗条，故不需要
  // manual 那两个 lose0/lose1 快照变量）
  for (const k of [0, 1]) {
    const loss = lose(k);
    if (loss !== 0) {
      const base = era.get(\`base:\${cid}:\${k}\`) || 0;
      const max = era.get(\`maxbase:\${cid}:\${k}\`) || 0;
      let next = base;`,
    tests: ['source-check'],
    must_mention: '当场结算到 base',
  },
  {
    desc: 'M9787 PALAM_UP_CHECK_MINI：delta:15 无条件清零行删（跳过档位残留会被引擎重新累加进 palam）',
    file: 'ere/event/source-check.js',
    find: `  for (const upid of touched) {
    era.set(\`delta:\${cid}:\${upid}\`, 0);
  }
  era.set(\`delta:\${cid}:15\`, 0);
}`,
    replace: `  for (const upid of touched) {
    era.set(\`delta:\${cid}:\${upid}\`, 0);
  }
}`,
    tests: ['source-check'],
    must_mention: 'delta:15 应在处理器执行后清零',
  },
  // —— #460（COMF203_カビ犬／COMF205_腐れ豚 变异覆盖补齐）——
  {
    desc: 'M9829 怪物开战损耗的等级缩放删（203 的气力损耗 LOSEBASE:1）',
    file: 'ere/system/train/com-colosseum.js',
    find: '    open_lose0: (level, weak) => monster_lose0(level, weak),\n    open_lose1: (level) => level * 20,',
    replace:
      '    open_lose0: (level, weak) => monster_lose0(level, weak),\n    open_lose1: () => 5, // 变异：气力损耗等级缩放删',
    tests: ['com-colosseum'],
    must_mention: '霉菌犬',
  },
  {
    desc: 'M9830 怪物败北追加伤害删（203 的 extra_lose）',
    file: 'ere/system/train/com-colosseum.js',
    find: "    extra_lose: ['level', 'level'], // [L9, L9]",
    replace: '    extra_lose: [0, 0], // 变异：败北追加伤害删',
    tests: ['com-colosseum'],
    must_mention: '気力有余的败北支',
  },
  {
    desc: 'M9831 怪物收入倍率表改坏（203 的 ×2 改 ×3）',
    file: 'ere/system/train/com-colosseum.js',
    find: '    income: (lose0) => lose0 * 2,',
    replace: '    income: (lose0) => lose0 * 3,',
    tests: ['com-colosseum'],
    must_mention: '死亡斗场收入 × 2',
  },
  {
    desc: 'M9832 怪物开战损耗的体力值算法改坏（205 的 ×25÷10 缩放删）',
    file: 'ere/system/train/com-colosseum.js',
    find: '    open_lose0: (level, weak) => monster_lose0(idiv(level * 25, 10), weak),',
    replace:
      '    open_lose0: (level, weak) => monster_lose0(level, weak), // 变异：×25÷10 缩放删',
    tests: ['com-colosseum'],
    must_mention: '腐烂猪',
  },
  {
    desc: 'M9833 怪物开战损耗的等级缩放删（205 的气力损耗 LOSEBASE:1）',
    file: 'ere/system/train/com-colosseum.js',
    find: '    open_lose0: (level, weak) => monster_lose0(idiv(level * 25, 10), weak),\n    open_lose1: (level) => level * 20,',
    replace:
      '    open_lose0: (level, weak) => monster_lose0(idiv(level * 25, 10), weak),\n    open_lose1: () => 5, // 变异：气力损耗等级缩放删',
    tests: ['com-colosseum'],
    must_mention: '胜利支',
  },
  {
    desc: 'M9834 怪物败北追加伤害删（205 的 extra_lose）',
    file: 'ere/system/train/com-colosseum.js',
    find: "    threshold: (level) => 4 * level, // :25 IF RESULT < (4 * CFLAG:0:9)\n    extra_lose: ['level*2', 'level*2'],",
    replace:
      '    threshold: (level) => 4 * level, // :25 IF RESULT < (4 * CFLAG:0:9)\n    extra_lose: [0, 0], // 变异：败北追加伤害删',
    tests: ['com-colosseum'],
    must_mention: '気力有余的败北支',
  },
  {
    desc: 'M9835 怪物收入倍率表改坏（205 的 ×4 改 ×5）',
    file: 'ere/system/train/com-colosseum.js',
    find: '    income: (lose0) => lose0 * 4,',
    replace: '    income: (lose0) => lose0 * 5,',
    tests: ['com-colosseum'],
    must_mention: '死亡斗场收入 × 4',
  },
  {
    desc: 'M9900 ablup10：需要特殊素质门槛越界值',
    file: 'ere/system/train/ablup.js',
    find: '  if (lv >= 5 && talent(85) === 0 && talent(86) === 0) {',
    replace: '  if (lv > 5 && talent(85) === 0 && talent(86) === 0) {',
    tests: ['ablup'],
    must_mention: 'ablup10：两档终止判定',
  },
  {
    desc: 'M9901 ablup10：已达最高级门槛越界值',
    file: 'ere/system/train/ablup.js',
    find: "  if (lv >= 10) return { blocked: 'max' }; // :18-20",
    replace: "  if (lv > 10) return { blocked: 'max' }; // :18-20",
    tests: ['ablup'],
    must_mention: 'ablup10：两档终止判定',
  },
  {
    desc: 'M9902 ablup10：Lv0 恐怖点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: 'if (lv === 0) [a, b, c, d] = [10, 10, 300, 200];',
    replace: 'if (lv === 0) [a, b, c, d] = [11, 10, 300, 200];',
    tests: ['ablup'],
    must_mention: 'ablup10：Lv0 梯子字面值',
  },
  {
    desc: 'M9903 ablup10：反抗心 A 倍率',
    file: 'ere/system/train/ablup.js',
    find: '    // 反抗心 :224-230\n    a = times(a, 2.0);',
    replace: '    // 反抗心 :224-230\n    a = times(a, 2.2);',
    tests: ['ablup'],
    must_mention: '反抗心 A×2.00',
  },
  {
    desc: 'M9904 ablup10：异常经验豁免素质爱慕的比较方向反转',
    file: 'ere/system/train/ablup.js',
    find: '    talent(73) === 0 &&\n    talent(85) === 0 &&\n    talent(86) === 0;\n  if (lv === 4 && anomaly_exempt10) e = 1;',
    replace:
      '    talent(73) === 0 &&\n    talent(85) === 1 &&\n    talent(86) === 0;\n  if (lv === 4 && anomaly_exempt10) e = 1;',
    tests: ['ablup'],
    must_mention: '异常经验门槛（E=1），六项素质任一命中可免',
  },
  {
    desc: 'M9905 ablup10：Lv4→5 异常经验门槛值',
    file: 'ere/system/train/ablup.js',
    find: '  if (lv === 4 && anomaly_exempt10) e = 1;',
    replace: '  if (lv === 4 && anomaly_exempt10) e = 2;',
    tests: ['ablup'],
    must_mention: '异常经验门槛',
  },
  {
    desc: 'M9906 ablup10：重试文案误加句号',
    file: 'ere/system/train/ablup.js',
    find: `      era.print('未满足条件'); // :81-82
      continue;
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件'); // :84-85
      continue;
    } else if (result === 2 && k === 256) {`,
    replace: `      era.print('未满足条件。'); // :81-82
      continue;
    } else if (result === 1 && j !== 0) {
      era.print('未满足条件'); // :84-85
      continue;
    } else if (result === 2 && k === 256) {`,
    tests: ['ablup'],
    must_mention: '无句号',
  },
  {
    desc: 'M9907 ablup10：成功购买写入等级改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = (chara(cid).system.顺从 += 1); // :101',
    replace: '      const new_lv = (chara(cid).system.顺从 += 2); // :101',
    tests: ['ablup'],
    must_mention: '写入 chara(cid).system.顺从',
  },
  {
    desc: 'M9908 ablup11：需要特殊素质门槛越界值',
    file: 'ere/system/train/ablup.js',
    find: '  if (abl11() >= 5 && talent(73) === 0 && talent(76) === 0) {',
    replace: '  if (abl11() > 5 && talent(73) === 0 && talent(76) === 0) {',
    tests: ['ablup'],
    must_mention: 'ablup11：两档终止判定',
  },
  {
    desc: 'M9909 ablup11：已达最高级门槛越界值',
    file: 'ere/system/train/ablup.js',
    find: "  if (abl11() >= 10) {\n    if (!mode) await era.printAndWait('已达最高级'); // :18-20",
    replace:
      "  if (abl11() > 10) {\n    if (!mode) await era.printAndWait('已达最高级'); // :18-20",
    tests: ['ablup'],
    must_mention: 'ablup11：两档终止判定',
  },
  {
    desc: 'M9910 ablup11：Lv0 欲情点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: 'let a = [5, 50, 1000, 5000, 12000, 20000, 30000, 50000, 80000, 150000][lv];',
    replace:
      'let a = [6, 50, 1000, 5000, 12000, 20000, 30000, 50000, 80000, 150000][lv];',
    tests: ['ablup'],
    must_mention: 'ablup11：Lv0 梯子字面值',
  },
  {
    desc: 'M9911 ablup11：看重贞操倍率',
    file: 'ere/system/train/ablup.js',
    find: 'a = times(a, 1.5); // 看重贞操 :144-146',
    replace: 'a = times(a, 1.6); // 看重贞操 :144-146',
    tests: ['ablup'],
    must_mention: '看重贞操',
  },
  {
    desc: 'M9912 ablup11：Lv4→5 异常经验门槛值',
    file: 'ere/system/train/ablup.js',
    find: '    if (lv === 4 && anomaly_exempt11) e = 1;',
    replace: '    if (lv === 4 && anomaly_exempt11) e = 2;',
    tests: ['ablup'],
    must_mention: '异常经验门槛（E=1）可被开放跳过',
  },
  {
    desc: 'M9913 ablup11：手写状态文案 bit2 误加尾随空格',
    file: 'ere/system/train/ablup.js',
    find: "    if (bits & 2) text += '经验不足'; // :46-47（无尾随空格）",
    replace: "    if (bits & 2) text += '经验不足 '; // :46-47（无尾随空格）",
    tests: ['ablup'],
    must_mention: '手写状态文案（点数不足带尾随空格）',
  },
  {
    desc: 'M9914 ablup11：成功购买写入等级改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = (chara(cid).system.欲望 += 1); // :63',
    replace: '      const new_lv = (chara(cid).system.欲望 += 2); // :63',
    tests: ['ablup'],
    must_mention: '写入 chara(cid).system.欲望',
  },
  {
    desc: 'M9915 ablup12：已达最高级门槛越界值',
    file: 'ere/system/train/ablup.js',
    find: "  if (abl12() >= 10) {\n    if (!mode) await era.printAndWait('已达最高级'); // :14-16",
    replace:
      "  if (abl12() > 10) {\n    if (!mode) await era.printAndWait('已达最高级'); // :14-16",
    tests: ['ablup'],
    must_mention: '已达最高级；技巧+话术组合上限',
  },
  {
    desc: 'M9916 ablup12：技巧+话术组合上限越界值',
    file: 'ere/system/train/ablup.js',
    find: `  if (abl12() + abl15() >= 15) {
    const juel7_gate = era.get(\`juel:\${cid}:7\`) || 0;
    if (juel7_gate < abl12() * abl12() * 1000) {`,
    replace: `  if (abl12() + abl15() > 15) {
    const juel7_gate = era.get(\`juel:\${cid}:7\`) || 0;
    if (juel7_gate < abl12() * abl12() * 1000) {`,
    tests: ['ablup'],
    must_mention: '技巧+话术组合上限单行',
  },
  {
    desc: 'M9917 ablup12：Lv0 习得点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: 'a = [1, 25, 200, 3000, 8000, 12000, 16000, 22000, 28000, 35000][lv];',
    replace:
      'a = [2, 25, 200, 3000, 8000, 12000, 16000, 22000, 28000, 35000][lv];',
    tests: ['ablup'],
    must_mention: '不显示金钱提示、不检查 bit2/bit4',
  },
  {
    desc: 'M9918 ablup12：自我训练金钱不足门槛值',
    file: 'ere/system/train/ablup.js',
    find: '    if (self_training && money < 5000) i |= 4; // :195-196',
    replace: '    if (self_training && money < 4000) i |= 4; // :195-196',
    tests: ['ablup'],
    must_mention: 'bit2+bit4 无分隔符粘连',
  },
  {
    desc: 'M9919 ablup12：自我训练 bit2 错位判定阈值',
    file: 'ere/system/train/ablup.js',
    find: '    if (self_training && master_abl12 > flag30 + 1) i |= 2; // :197-198（文案错位，见文件头）',
    replace:
      '    if (self_training && master_abl12 > flag30 + 2) i |= 2; // :197-198（文案错位，见文件头）',
    tests: ['ablup'],
    must_mention: 'bit2 用"经验不足"文案显示 ABL:MASTER:12',
  },
  {
    desc: 'M9920 ablup12：自我训练金钱扣款额',
    file: 'ere/system/train/ablup.js',
    find: '        era_flag.money -= 5000; // :63-65',
    replace: '        era_flag.money -= 4000; // :63-65',
    tests: ['ablup'],
    must_mention: '各 5000',
  },
  {
    desc: 'M9921 ablup12：手写状态文案 bit4 制表符丢失',
    file: 'ere/system/train/ablup.js',
    find: "    if (bits & 4) text += '金钱不足\\t'; // :45-46（尾随制表符，原文如此）",
    replace:
      "    if (bits & 4) text += '金钱不足'; // :45-46（尾随制表符，原文如此）",
    tests: ['ablup'],
    must_mention: 'bit2+bit4 无分隔符粘连',
  },
  {
    desc: 'M9922 ablup13：Lv5 侍奉精神门槛越界值',
    file: 'ere/system/train/ablup.js',
    find: '  if ((abl13() >= 5 && abl16() < 5) || abl13() >= 10) {',
    replace: '  if ((abl13() >= 5 && abl16() <= 5) || abl13() >= 10) {',
    tests: ['ablup'],
    must_mention: 'Lv5 靠侍奉精神越过上限',
  },
  {
    desc: 'M9923 ablup13：Lv0 习得点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: 'let a = [5, 400, 1000, 3000, 6000, 9000, 12000, 16000, 20000, 25000][lv];',
    replace:
      'let a = [6, 400, 1000, 3000, 6000, 9000, 12000, 16000, 20000, 25000][lv];',
    tests: ['ablup'],
    must_mention: '成功购买写入 abl:cid:13',
  },
  {
    desc: 'M9924 ablup13：组合上限突破价系数',
    file: 'ere/system/train/ablup.js',
    find: `    if (lv + abl14() >= 10) {
      const temp = Math.max(lv, abl14());
      a = temp * temp * 500;
    }`,
    replace: `    if (lv + abl14() >= 10) {
      const temp = Math.max(lv, abl14());
      a = temp * temp * 400;
    }`,
    tests: ['ablup'],
    must_mention: 'TEMP²×500，侍奉精神分级折扣仍在其后叠加',
  },
  {
    desc: 'M9925 ablup13：侍奉精神分级折扣第二档倍率',
    file: 'ere/system/train/ablup.js',
    find: `    else if (abl16() < 6) a = times(a, 0.95);
    else if (abl16() < 8) a = times(a, 0.9);`,
    replace: `    else if (abl16() < 6) a = times(a, 0.9);
    else if (abl16() < 8) a = times(a, 0.9);`,
    tests: ['ablup'],
    must_mention: 'TEMP²×500，侍奉精神分级折扣仍在其后叠加',
  },
  {
    desc: 'M9926 ablup13：成功购买写入等级改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = era.add(`abl:${cid}:13`, 1); // :63',
    replace: '      const new_lv = era.add(`abl:${cid}:13`, 2); // :63',
    tests: ['ablup'],
    must_mention: '同域直接 era.add',
  },
  {
    desc: 'M9927 ablup13：Lv5 起门槛提示文案等级偏移',
    file: 'ere/system/train/ablup.js',
    find: "      era.print(`${era.get('ablname:16')}LV${lv + 1}以上(现在LV${abl16()})且`); // :45-46",
    replace:
      "      era.print(`${era.get('ablname:16')}LV${lv + 2}以上(现在LV${abl16()})且`); // :45-46",
    tests: ['ablup'],
    must_mention: 'Lv5 前后切换门槛提示文案',
  },
  {
    desc: 'M9928 ablup14：已达最高级门槛越界值',
    file: 'ere/system/train/ablup.js',
    find: "  if (abl14() >= 10) {\n    if (!mode) await era.printAndWait('已达最高级'); // :18-19",
    replace:
      "  if (abl14() > 10) {\n    if (!mode) await era.printAndWait('已达最高级'); // :18-19",
    tests: ['ablup'],
    must_mention: '已达最高级；组合上限溢出两行提示',
  },
  {
    desc: 'M9929 ablup14：Lv0 习得点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: 'if (lv === 0) [a, b] = [1, 3];',
    replace: 'if (lv === 0) [a, b] = [2, 3];',
    tests: ['ablup'],
    must_mention: 'EXP 门槛行前导 6 个半角空格',
  },
  {
    desc: 'M9930 ablup14：技巧门槛误比较 ABL:12 被"修正"为 ABL:14',
    file: 'ere/system/train/ablup.js',
    find: '    if (abl12() < 5 && abl12() < lv + 1) i |= 4; // :256-258',
    replace: '    if (abl14() < 5 && abl12() < lv + 1) i |= 4; // :256-258',
    tests: ['ablup'],
    must_mention: 'DECIDE 的技巧门槛误比较 ABL:12<5',
  },
  {
    desc: 'M9931 ablup14：EXP 门槛行前导空格丢失一格',
    file: 'ere/system/train/ablup.js',
    find: "era.print(`      ${era.get('expname:5')}　${exp5}/${b}`); // :50",
    replace: "era.print(`     ${era.get('expname:5')}　${exp5}/${b}`); // :50",
    tests: ['ablup'],
    must_mention: 'EXP 门槛行前导 6 个半角空格',
  },
  {
    desc: 'M9932 ablup14：成功购买写入等级改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = era.add(`abl:${cid}:14`, 1); // :64',
    replace: '      const new_lv = era.add(`abl:${cid}:14`, 2); // :64',
    tests: ['ablup'],
    must_mention: '写入 abl:cid:14',
  },
  {
    desc: 'M9933 ablup14：性交中毒第二档折扣倍率',
    file: 'ere/system/train/ablup.js',
    find: `    } else if (abl30() < 6) {
      a = times(a, 0.95);
      b = times(b, 0.95);
    } else if (abl30() < 8) {`,
    replace: `    } else if (abl30() < 6) {
      a = times(a, 0.9);
      b = times(b, 0.9);
    } else if (abl30() < 8) {`,
    tests: ['ablup'],
    must_mention: '性交中毒(ABL:30)分级折扣',
  },
  {
    desc: 'M9934 ablup15：已达最高级门槛越界值',
    file: 'ere/system/train/ablup.js',
    find: "  if (abl15() >= 10) {\n    if (!mode) await era.printAndWait('已达最高级'); // :16-17",
    replace:
      "  if (abl15() > 10) {\n    if (!mode) await era.printAndWait('已达最高级'); // :16-17",
    tests: ['ablup'],
    must_mention: '已达最高级；技巧+话术组合上限单行',
  },
  {
    desc: 'M9935 ablup15：技巧+话术组合上限越界值',
    file: 'ere/system/train/ablup.js',
    find: `  if (abl12() + abl15() >= 15) {
    const juel7_gate = era.get(\`juel:\${cid}:7\`) || 0;
    if (juel7_gate < abl15() * abl15() * 1000) {`,
    replace: `  if (abl12() + abl15() > 15) {
    const juel7_gate = era.get(\`juel:\${cid}:7\`) || 0;
    if (juel7_gate < abl15() * abl15() * 1000) {`,
    tests: ['ablup'],
    must_mention: '技巧+话术组合上限单行',
  },
  {
    desc: 'M9936 ablup15：Lv0 习得点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: 'if (lv === 0) [a, b, c] = [1, 3, 5];',
    replace: 'if (lv === 0) [a, b, c] = [2, 3, 5];',
    tests: ['ablup'],
    must_mention: 'ablup15：Lv0 梯子字面值',
  },
  {
    desc: 'M9937 ablup15：bit2 由 AND 误改为 OR',
    file: 'ere/system/train/ablup.js',
    find: '    if (exp73 < b && exp74 < c) i |= 2; // :296-298（任一经验达标即可免）',
    replace:
      '    if (exp73 < b || exp74 < c) i |= 2; // :296-298（任一经验达标即可免）',
    tests: ['ablup'],
    must_mention: 'bit2 需要两条经验轨道同时不足才命中',
  },
  {
    desc: 'M9938 ablup15：EXP 行字面量" or"丢失',
    file: 'ere/system/train/ablup.js',
    find: "era.print(`      ${era.get('expname:73')}　${exp73}/${b} or`); // :45",
    replace:
      "era.print(`      ${era.get('expname:73')}　${exp73}/${b}`); // :45",
    tests: ['ablup'],
    must_mention: 'EXP 行字面量" or"仅出现在第一行',
  },
  {
    desc: 'M9939 ablup15：成功购买写入等级改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = era.add(`abl:${cid}:15`, 1); // :60',
    replace: '      const new_lv = era.add(`abl:${cid}:15`, 2); // :60',
    tests: ['ablup'],
    must_mention: '写入 abl:cid:15',
  },
  {
    desc: 'M9940 ablup16：入口把关 OR 误改为 AND',
    file: 'ere/system/train/ablup.js',
    find: '    (talent(63) === 0 || talent(85) === 0 || talent(86) === 0)\n  ) {',
    replace:
      '    (talent(63) === 0 && talent(85) === 0 && talent(86) === 0)\n  ) {',
    tests: ['ablup'],
    must_mention: '入口把关用 OR',
  },
  {
    desc: 'M9941 ablup16：Lv0 屈服点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: 'if (lv === 0) [a, b, c, d, e] = [100, 20, 100, 1, 1];',
    replace: 'if (lv === 0) [a, b, c, d, e] = [101, 20, 100, 1, 1];',
    tests: ['ablup'],
    must_mention: 'ablup16：Lv0 梯子字面值',
  },
  {
    desc: 'M9942 ablup16：习得轨道固定分母丢失',
    file: 'ere/system/train/ablup.js',
    find: "era.print(`　　　${era.get('expname:2')}　${exp2}/1`); // :77（分母固定为 1，非变量）",
    replace:
      "era.print(`　　　${era.get('expname:2')}　${exp2}/2`); // :77（分母固定为 1，非变量）",
    tests: ['ablup'],
    must_mention: '固定阈值 1',
  },
  {
    desc: 'M9943 ablup16：顺从门槛比较改为 <=',
    file: 'ere/system/train/ablup.js',
    find: '    if (abl10() < lv + 1) {\n      // 顺从门槛，三条轨道同时命中（:515-520）',
    replace:
      '    if (abl10() <= lv + 1) {\n      // 顺从门槛，三条轨道同时命中（:515-520）',
    tests: ['ablup'],
    must_mention: 'Lv0 梯子字面值，三个选项皆渲染',
  },
  {
    desc: 'M9944 ablup16：成功购买写入等级改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = (chara(cid).system.侍奉精神 += 1); // :103',
    replace: '      const new_lv = (chara(cid).system.侍奉精神 += 2); // :103',
    tests: ['ablup'],
    must_mention: '写入 chara(cid).system.侍奉精神',
  },
  {
    desc: 'M9945 ablup17：已达最高级门槛越界值',
    file: 'ere/system/train/ablup.js',
    find: "  if (abl17() >= 10) {\n    if (!mode) await era.printAndWait('已达最高级'); // :19-21",
    replace:
      "  if (abl17() > 10) {\n    if (!mode) await era.printAndWait('已达最高级'); // :19-21",
    tests: ['ablup'],
    must_mention: '两档终止判定，四项豁免素质任一命中即可越过 Lv5',
  },
  {
    desc: 'M9946 ablup17：四项豁免素质最后一项 AND 误改为 OR',
    file: 'ere/system/train/ablup.js',
    find: `    talent(28) === 0 &&
    talent(89) === 0
  ) {`,
    replace: `    talent(28) === 0 ||
    talent(89) === 0
  ) {`,
    tests: ['ablup'],
    must_mention: '四项豁免素质任一命中即可越过 Lv5',
  },
  {
    desc: 'M9947 ablup17：Lv0 耻情点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: 'let a = [100, 1000, 3000, 6000, 12000, 25000, 50000, 80000, 120000, 150000][\n      lv\n    ];',
    replace:
      'let a = [101, 1000, 3000, 6000, 12000, 25000, 50000, 80000, 120000, 150000][\n      lv\n    ];',
    tests: ['ablup'],
    must_mention: '无[爱慕]时门槛查欲望',
  },
  {
    desc: 'M9948 ablup17：爱慕分支渲染条件判定值改错',
    file: 'ere/system/train/ablup.js',
    find: `    if (talent(85) === 0) {
      era.print(\`\${era.get('ablname:11')}LV\${lv + 1}以上(现在LV\${abl11()})且\`); // :41-42
    } else {`,
    replace: `    if (talent(85) === 1) {
      era.print(\`\${era.get('ablname:11')}LV\${lv + 1}以上(现在LV\${abl11()})且\`); // :41-42
    } else {`,
    tests: ['ablup'],
    must_mention: '无[爱慕]时门槛查欲望，有[爱慕]时改查顺从',
  },
  {
    desc: 'M9949 ablup17：重试文案句号丢失',
    file: 'ere/system/train/ablup.js',
    find: "      era.print('未满足条件。'); // :68-69（唯一带句号）",
    replace: "      era.print('未满足条件'); // :68-69（唯一带句号）",
    tests: ['ablup'],
    must_mention: '唯一带句号的重试文案',
  },
  {
    desc: 'M9950 ablup17：成功购买写入等级改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = (chara(cid).system.露出癖 += 1); // :75',
    replace: '      const new_lv = (chara(cid).system.露出癖 += 2); // :75',
    tests: ['ablup'],
    must_mention: '写入 chara(cid).system.露出癖',
  },
  {
    desc: 'M9951 ablup17：绝顶经验只在 Lv0→1 需要，等级判定改错',
    file: 'ere/system/train/ablup.js',
    find: 'const c = lv === 0 ? 1 : 0; // :113-115 仅 Lv0→1 需要绝顶经验',
    replace: 'const c = lv === 1 ? 1 : 0; // :113-115 仅 Lv0→1 需要绝顶经验',
    tests: ['ablup'],
    must_mention: 'C(绝顶经验)只在 Lv0→1 生效',
  },
  {
    desc: 'M9952 ablup12：技巧+话术组合上限免费突破越界值',
    file: 'ere/system/train/ablup.js',
    find: 'const combo_break = lv + abl15() >= 15;',
    replace: 'const combo_break = lv + abl15() > 15;',
    tests: ['ablup'],
    must_mention: 'DECIDE 提前 RETURN 使 A/I 维持清零，等于免费购买',
  },
  {
    desc: 'M9953 ablup15：技巧+话术组合上限免费突破越界值',
    file: 'ere/system/train/ablup.js',
    find: 'const combo_break = abl12() + lv >= 15;',
    replace: 'const combo_break = abl12() + lv > 15;',
    tests: ['ablup'],
    must_mention: 'DECIDE 提前 RETURN 使 A/B/C/I 维持清零，等于免费购买',
  },

  // ———— issue #467：ABLUP37/39/40/99/100 与 ABL.ERB 本体 ————
  {
    desc: 'M10500 evaluate_ablup0：阴蒂钝感折扣改错（×1.20 → ×1.10）',
    file: 'ere/system/train/ablup.js',
    find: '  if (talent(101)) a = times(a, 1.2); // 阴蒂钝感 :198-200',
    replace: '  if (talent(101)) a = times(a, 1.1); // 阴蒂钝感 :198-200',
    tests: ['ablup'],
    must_mention: '阴蒂钝感×1.20',
  },
  {
    desc: 'M10501 evaluate_ablup0：阴蒂敏感折扣改错（×0.80 → ×0.90）',
    file: 'ere/system/train/ablup.js',
    find: '  if (talent(102)) a = times(a, 0.8); // 阴蒂敏感 :202-204',
    replace: '  if (talent(102)) a = times(a, 0.9); // 阴蒂敏感 :202-204',
    tests: ['ablup'],
    must_mention: '阴蒂敏感×0.80',
  },
  {
    desc: 'M10502 evaluate_ablup1：绝壁折扣改错（×0.65 → ×0.75）',
    file: 'ere/system/train/ablup.js',
    find: '  if (talent(116)) a = times(a, 0.65); // 绝壁',
    replace: '  if (talent(116)) a = times(a, 0.75); // 绝壁',
    tests: ['ablup'],
    must_mention: '绝壁×0.65',
  },
  {
    desc: 'M10503 evaluate_ablup1：巨乳加成改错（×1.10 → ×1.20）',
    file: 'ere/system/train/ablup.js',
    find: '  if (talent(110)) a = times(a, 1.1); // 巨乳',
    replace: '  if (talent(110)) a = times(a, 1.2); // 巨乳',
    tests: ['ablup'],
    must_mention: '巨乳×1.10、爆乳×1.20',
  },
  {
    desc: 'M10504 evaluate_ablup2：私处钝感的 B 轨加成改错（×1.10 → ×1.20）',
    file: 'ere/system/train/ablup.js',
    find: `    // 私处钝感：:186-190，A/B 加成率不同
    a = times(a, 1.2);
    b = times(b, 1.1);
  }`,
    replace: `    // 私处钝感：:186-190，A/B 加成率不同
    a = times(a, 1.2);
    b = times(b, 1.2);
  }`,
    tests: ['ablup'],
    must_mention: '私处钝感 A×1.20/B×1.10',
  },
  {
    desc: 'M10505 evaluate_ablup3：A钝感的 B 轨加成改错（×1.10 → ×1.20）',
    file: 'ere/system/train/ablup.js',
    find: `    // A钝感
    a = times(a, 1.2);
    b = times(b, 1.1);
  }`,
    replace: `    // A钝感
    a = times(a, 1.2);
    b = times(b, 1.2);
  }`,
    tests: ['ablup'],
    must_mention: 'A钝感 A×1.20/B×1.10',
  },
  {
    desc: 'M10506 evaluate_ablup4：Lv3 的戒备森严倍率改错（×2.00 → ×2.50）',
    file: 'ere/system/train/ablup.js',
    find: '  if (lv === 3 && talent(27)) a = times(a, 2.0); // :64-66',
    replace: '  if (lv === 3 && talent(27)) a = times(a, 2.5); // :64-66',
    tests: ['ablup'],
    must_mention: '戒备森严仅在 Lv3(×2.00)/Lv4(×3.00)',
  },
  {
    desc: 'M10507 evaluate_ablup4：Lv4 的戒备森严倍率改错（×3.00 → ×2.00）',
    file: 'ere/system/train/ablup.js',
    find: '  if (lv === 4 && talent(27)) a = times(a, 3.0); // :70-72',
    replace: '  if (lv === 4 && talent(27)) a = times(a, 2.0); // :70-72',
    tests: ['ablup'],
    must_mention: '戒备森严仅在 Lv3(×2.00)/Lv4(×3.00)',
  },
  {
    desc: 'M10508 decide_ablup0：RESULT 语义取反（I==0 与 I!=0 互换）',
    file: 'ere/system/train/ablup.js',
    find: `function decide_ablup0(cid) {
  const r = evaluate_ablup0(cid);
  return r.blocked === null && r.i === 0 ? 1 : 0;
}`,
    replace: `function decide_ablup0(cid) {
  const r = evaluate_ablup0(cid);
  return r.blocked === null && r.i !== 0 ? 1 : 0;
}`,
    tests: ['ablup'],
    must_mention: 'JUEL:0 = 1 恰好够阴蒂感觉 Lv0',
  },
  {
    desc: 'M10509 decide_ablup：未登记编号的分发落空改成返回可提升',
    file: 'ere/system/train/ablup.js',
    find: `  const handler = DECIDE_HANDLERS[x];
  if (!handler) return 0;`,
    replace: `  const handler = DECIDE_HANDLERS[x];
  if (!handler) return 1;`,
    tests: ['ablup'],
    must_mention: 'ABLUP20 的 DECIDE 尚未落地 → 落空',
  },
  {
    desc: 'M10510 evaluate_ablup37：F 的[容易上瘾]减免改错（-2 → -1）',
    file: 'ere/system/train/ablup.js',
    find: '      if (talent(72)) f -= 2; // 容易上瘾',
    replace: '      if (talent(72)) f -= 1; // 容易上瘾',
    tests: ['ablup'],
    must_mention: 'F 的素质增减',
  },
  {
    desc: 'M10511 ablup37：淫乱的 B 轨不对称倍率被抹平（0.50 → 0.80）',
    file: 'ere/system/train/ablup.js',
    find: `      a = times(a, 0.8);
      b = times(b, 0.5);
      c = times(c, 0.8);
      d = times(d, 0.8);
    }
    if (talent(82)) {`,
    replace: `      a = times(a, 0.8);
      b = times(b, 0.8);
      c = times(c, 0.8);
      d = times(d, 0.8);
    }
    if (talent(82)) {`,
    tests: ['ablup'],
    must_mention: '淫乱的 B 轨 ×0.50',
  },
  {
    desc: 'M10512 ablup39：戒备森严的分档读错能力（ABL:37 → ABL:39）',
    file: 'ere/system/train/ablup.js',
    find: '      const gate = era.get(`abl:${cid}:37`) || 0;',
    replace: '      const gate = era.get(`abl:${cid}:39`) || 0;',
    tests: ['ablup'],
    must_mention: '戒备森严读 ABL:37',
  },
  {
    desc: 'M10513 ablup39：三重上限的突破价改错（lv²×4000 → ×5000）',
    file: 'ere/system/train/ablup.js',
    find: `    if (abl_sum() >= 10) {
      a = lv * lv * 4000;
      b = lv * lv * 4000;
    }`,
    replace: `    if (abl_sum() >= 10) {
      a = lv * lv * 5000;
      b = lv * lv * 5000;
    }`,
    tests: ['ablup'],
    must_mention: '三重上限时 A/B 覆盖为 lv²×4000',
  },
  {
    desc: 'M10514 ablup40：欲望行的显示等级读错能力（ABL:39 → ABL:40）',
    file: 'ere/system/train/ablup.js',
    find: "    era.print(\n      `${era.get('ablname:11')}LV${(era.get(`abl:${cid}:39`) || 0) + 1}以上(现在LV${abl11()})`,\n    );",
    replace:
      "    era.print(\n      `${era.get('ablname:11')}LV${(era.get(`abl:${cid}:40`) || 0) + 1}以上(现在LV${abl11()})`,\n    );",
    tests: ['ablup'],
    must_mention: '欲望行显示 ABL:39+1',
  },
  {
    desc: 'M10515 ablup99：刻印阶梯顶档改错（50000 → 5000）',
    file: 'ere/system/train/ablup.js',
    find: '    else a = 50000; // lv === 3',
    replace: '    else a = 5000; // lv === 3',
    tests: ['ablup'],
    must_mention: '刻印阶梯 2→10000 / 3→50000',
  },
  {
    desc: 'M10516 ablup100：感觉门槛的显示值改错（mark10+5 → mark10+6）',
    file: 'ere/system/train/ablup.js',
    find: '    era.print(`各处感觉总计${mark10() + 5}以上(现在${c})或`);',
    replace: '    era.print(`各处感觉总计${mark10() + 6}以上(现在${c})或`);',
    tests: ['ablup'],
    must_mention: '各处感觉总计6以上',
  },
  {
    desc: 'M10517 auto_ablup_core：等级行打印条件改错（result >= 0 → > 0）',
    file: 'ere/system/train/ablup.js',
    find: '    if (result >= 0 && info) {',
    replace: '    if (result > 0 && info) {',
    tests: ['ablup'],
    must_mention: 'info=1：每个成功等级都打等级行',
  },
  {
    desc: 'M10518 auto_ablup：卖淫影响的跳过条件取反（0 → 1）',
    file: 'ere/system/train/ablup.js',
    find: '    if (count === 37 && prostitution_effect === 0) continue;',
    replace: '    if (count === 37 && prostitution_effect === 1) continue;',
    tests: ['ablup'],
    must_mention: '卖淫影响缺省 0（负面）→ 37 跳过',
  },
  {
    desc: 'M10519 auto_ablup：位 36 读错位号（36 → 35，与自动化总开关同位）',
    file: 'ere/system/train/ablup.js',
    find: "    if (count > 15 && auto_getbit(era.get('flag:5'), 36)) break;",
    replace: "    if (count > 15 && auto_getbit(era.get('flag:5'), 35)) break;",
    tests: ['ablup'],
    must_mention: 'COUNT 37 > 15 → BREAK，不提升',
  },
  {
    desc: 'M10520 auto_ablup：ARG 指定目标后不还原 TARGET',
    file: 'ere/system/train/ablup.js',
    find: '  era_flag.target = keep_target;',
    replace: '  era_flag.target = arg;',
    tests: ['ablup'],
    must_mention: 'TARGET 还原',
  },
  {
    desc: 'M10521 page-ablup：`*` 标记恒不上屏（DECIDE 结果被丢弃）',
    file: 'ere/page/page-ablup.js',
    find: "    const mark = (await decide_ablup(cid, count)) === 1 ? ' *' : '';",
    replace:
      "    const mark = (await decide_ablup(cid, count)) === 1 ? '' : '';",
    tests: ['juel-check'],
    must_mention: 'JUEL:0=1 恰好够 Lv0 的 1 点',
  },
  {
    desc: 'M10522 page-ablup：[99] 行的 `*` 标记恒不上屏',
    file: 'ere/page/page-ablup.js',
    find: "  const mark99 = (await decide_ablup(cid, 99)) === 1 ? ' *' : '';",
    replace: "  const mark99 = (await decide_ablup(cid, 99)) === 1 ? '' : '';",
    tests: ['juel-check'],
    must_mention: '两门槛与屈服珠全达标',
  },
  {
    desc: 'M10523 decide_ablup39：上限判据改错（32+33+39 >= 30 → >= 10）',
    file: 'ere/system/train/ablup.js',
    find: '      if (abl_sum() >= 30) return null;',
    replace: '      if (abl_sum() >= 10) return null;',
    tests: ['ablup'],
    must_mention: '合计 27：DECIDE 放行',
  },
  {
    desc: 'M10524 page-ablup：[4] 癖好感觉行的 `*` 标记恒不上屏',
    file: 'ere/page/page-ablup.js',
    find: "    const mark_f = (await decide_ablup(cid, 4)) === 1 ? ' *' : '';",
    replace: "    const mark_f = (await decide_ablup(cid, 4)) === 1 ? '' : '';",
    tests: ['juel-check'],
    must_mention: '局部感觉 Lv0 的 1 点够了',
  },
  // ———— #466（M10400-M10479）：ABLUP20-23、ABLUP30-33 ————
  {
    desc: 'M10400 ablup20：入口把关三素质 AND 误改为 OR',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n    abl20() >= 5 &&\n    talent(80) === 0 &&\n    talent(83) === 0 &&\n    talent(127) === 0\n  ) {',
    replace:
      'if (\n    abl20() >= 5 &&\n    (talent(80) === 0 || talent(83) === 0 || talent(127) === 0)\n  ) {',
    tests: ['ablup'],
    must_mention: '抖S气质(10)＋抖M气质(10)上限为20',
  },
  {
    desc: 'M10401 ablup20：组合上限越界值',
    file: 'ere/system/train/ablup.js',
    find: '  if (abl20() + abl21() >= 20) {\n    await era.printAndWait(`抖S气质(${abl20()})＋抖M气质(${abl21()})上限为20`); // :19-21\n    return;\n  }\n  if (abl20() >= 10) {',
    replace:
      '  if (abl20() + abl21() > 20) {\n    await era.printAndWait(`抖S气质(${abl20()})＋抖M气质(${abl21()})上限为20`); // :19-21\n    return;\n  }\n  if (abl20() >= 10) {',
    tests: ['ablup'],
    must_mention: '抖S气质(10)＋抖M气质(10)上限为20',
  },
  {
    desc: 'M10402 ablup20：Lv0 欲情点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: '[100, 5],\n      [500, 20],\n      [1500, 50],\n      [3000, 120],\n      [5000, 300],\n      [8000, 600],',
    replace:
      '[110, 5],\n      [500, 20],\n      [1500, 50],\n      [3000, 120],\n      [5000, 300],\n      [8000, 600],',
    tests: ['ablup'],
    must_mention: '欲情点数×0/100 ……点数不足 经验不足能力不足 ',
  },
  {
    desc: 'M10403 ablup20：淫乱漏掉异常经验 C 的 ×0.80 折扣（原作 :279 在 C 赋值 :175 之后）',
    file: 'ere/system/train/ablup.js',
    find: '      // 淫乱 :276-282（TIMES C 在 C 赋值（:175）之后，×0.80 真实生效）\n      a = times(a, 0.8);\n      b = times(b, 0.8);\n      c = times(c, 0.8);',
    replace:
      '      // 淫乱 :276-282（TIMES C 在 C 赋值（:175）之后，×0.80 真实生效）\n      a = times(a, 0.8);\n      b = times(b, 0.8);',
    tests: ['ablup'],
    must_mention:
      'ablup20：异常经验 C 的两段折扣——戒备森严在赋值前（无效）、淫乱在赋值后（×0.80 生效）',
  },
  {
    desc: 'M10404 ablup20：胆怯 A×1.50 改为 ×1.60（只乘 A 的证据）',
    file: 'ere/system/train/ablup.js',
    find: '    if (talent(10)) a = times(a, 1.5); // 胆怯 :181-183（只乘 A）',
    replace:
      '    if (talent(10)) a = times(a, 1.6); // 胆怯 :181-183（只乘 A）',
    tests: ['ablup'],
    must_mention: '欲情点数×0/135 ……点数不足 经验不足',
  },
  {
    desc: 'M10405 ablup20：施虐狂 A/B 同乘 ×0.50 改为 ×0.55',
    file: 'ere/system/train/ablup.js',
    find: '    if (talent(83)) {\n      // 施虐狂 :289-292\n      a = times(a, 0.5);\n      b = times(b, 0.5);\n    }',
    replace:
      '    if (talent(83)) {\n      // 施虐狂 :289-292\n      a = times(a, 0.55);\n      b = times(b, 0.55);\n    }',
    tests: ['ablup'],
    must_mention: '欲情点数×50/50 ……经验不足',
  },
  {
    desc: 'M10406 ablup20：购买扣珠改扣施虐快乐经验（JUEL:5 → JUEL:33 侧漏）',
    file: 'ere/system/train/ablup.js',
    find: '      era.add(`juel:${cid}:5`, -a); // :77',
    replace: '      era.add(`juel:${cid}:33`, -a); // :77',
    tests: ['ablup'],
    must_mention: '成功购买写入 abl:20、扣欲情点数',
  },
  {
    desc: 'M10407 ablup20：内联状态链尾随空格——bit2 误加空格（与共享 GET_ABLUP_STATE 混同）',
    file: 'ere/system/train/ablup.js',
    find: "    return `${i & 1 ? '点数不足 ' : ''}${i & 2 ? '经验不足' : ''}${i & 4 ? '能力不足 ' : ''}`;",
    replace:
      "    return `${i & 1 ? '点数不足 ' : ''}${i & 2 ? '经验不足 ' : ''}${i & 4 ? '能力不足 ' : ''}`;",
    tests: ['ablup'],
    must_mention: '欲情点数×0/100 ……点数不足 经验不足能力不足 ',
  },
  {
    desc: 'M10408 ablup20：异常经验行全角括号误改为半角',
    file: 'ere/system/train/ablup.js',
    find: "      era.print(`${era.get('expname:50')}${c}以上（现在${exp50}）且`);",
    replace:
      "      era.print(`${era.get('expname:50')}${c}以上(现在${exp50})且`);",
    tests: ['ablup'],
    must_mention: '异常经验1以上（现在0）且',
  },
  {
    desc: 'M10409 ablup20：成功购买写入等级改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = era.add(`abl:${cid}:20`, 1);',
    replace: '      const new_lv = era.add(`abl:${cid}:20`, 2);',
    tests: ['ablup'],
    must_mention:
      'ablup20：成功购买写入 abl:20、扣欲情点数、显示变为LV（era.add，train 属主）',
  },
  {
    desc: 'M10410 ablup21：入口把关四项素质最后一项 AND 误改为 OR',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n    abl21() >= 5 &&\n    talent(10) === 0 &&\n    talent(14) === 0 &&\n    talent(37) === 0 &&\n    talent(88) === 0\n  ) {',
    replace:
      'if (\n    abl21() >= 5 &&\n    talent(10) === 0 &&\n    talent(14) === 0 &&\n    (talent(37) === 0 || talent(88) === 0)\n  ) {',
    tests: ['ablup'],
    must_mention: 'ablup21：三档终止判定（特殊素质/组合上限/已达最高级）',
  },
  {
    desc: 'M10411 ablup21：Lv0 梯子 A(苦痛) 字面值',
    file: 'ere/system/train/ablup.js',
    find: '    if (lv === 0) [a, b, c, d, e] = [100, 100, 0, 100, 100];',
    replace: '    if (lv === 0) [a, b, c, d, e] = [101, 100, 0, 100, 100];',
    tests: ['ablup'],
    must_mention: '苦痛点数×0/100 ……点数不足 能力不足',
  },
  {
    desc: 'M10412 ablup21：[1] 轨苦痛点数判定含等号（JUEL:9 <= D 也算不足）',
    file: 'ere/system/train/ablup.js',
    find: '      if (juel9 < d) j |= 1;\n      if (juel6 < e) j |= 1;',
    replace: '      if (juel9 <= d) j |= 1;\n      if (juel6 < e) j |= 1;',
    tests: ['ablup'],
    must_mention:
      'ablup21：Lv3 走 [1] 轨购买（D=2800/E=6000/被虐快乐 30/绝顶 1）',
  },
  {
    desc: 'M10413 ablup21：[1] 轨绝顶经验需求 G=1 改为 2',
    file: 'ere/system/train/ablup.js',
    find: '    const g = 1; // 绝顶经验需求，全等级 1（:249）',
    replace: '    const g = 2; // 绝顶经验需求，全等级 1（:249）',
    tests: ['ablup'],
    must_mention: '　　　绝顶经验　0/1',
  },
  {
    desc: 'M10414 ablup21：受虐狂 ×0.50 改为 ×0.55（五元组同乘）',
    file: 'ere/system/train/ablup.js',
    find: '    if (talent(88)) {\n      // 受虐狂 :455-461（×0.50）\n      a = times(a, 0.5);\n      b = times(b, 0.5);\n      c = times(c, 0.5);\n      d = times(d, 0.5);\n      e = times(e, 0.5);\n    }',
    replace:
      '    if (talent(88)) {\n      // 受虐狂 :455-461（×0.50）\n      a = times(a, 0.55);\n      b = times(b, 0.55);\n      c = times(c, 0.55);\n      d = times(d, 0.55);\n      e = times(e, 0.55);\n    }',
    tests: ['ablup'],
    must_mention: '苦痛点数×0/50 ……点数不足 ',
  },
  {
    desc: 'M10415 ablup21：Lv3 戒备森严 C/D/E ×1.50 改为 ×1.60',
    file: 'ere/system/train/ablup.js',
    find: '      if (lv === 3) {\n        c = times(c, 1.5);\n        d = times(d, 1.5);\n        e = times(e, 1.5);\n      } else if (lv === 4) {',
    replace:
      '      if (lv === 3) {\n        c = times(c, 1.6);\n        d = times(d, 1.6);\n        e = times(e, 1.6);\n      } else if (lv === 4) {',
    tests: ['ablup'],
    must_mention:
      'ablup21：Lv3 戒备森严 C/D/E ×1.50（30→45、2800→4200、6000→9000）',
  },
  {
    desc: 'M10416 ablup21：欲望门槛比较改为 <=',
    file: 'ere/system/train/ablup.js',
    find: '    if (abl11() < lv + 1) {\n      // 欲望门槛，双轨同时命中（:480-484）',
    replace:
      '    if (abl11() <= lv + 1) {\n      // 欲望门槛，双轨同时命中（:480-484）',
    tests: ['ablup'],
    must_mention: 'Lv3→4 异常经验门槛',
  },
  {
    desc: 'M10417 ablup21：[0] 轨购买误扣屈服点数（JUEL:5 → JUEL:6）',
    file: 'ere/system/train/ablup.js',
    find: '      era.add(`juel:${cid}:9`, -a); // :102-103\n      era.add(`juel:${cid}:5`, -b);',
    replace:
      '      era.add(`juel:${cid}:9`, -a); // :102-103\n      era.add(`juel:${cid}:6`, -b);',
    tests: ['ablup'],
    must_mention: '两条购买路径各自扣对应珠',
  },
  {
    desc: 'M10418 ablup21：成功购买写入 chara(cid).system.抖M气质 改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = (chara(cid).system.抖M气质 += 1); // :99（system 属主）',
    replace:
      '      const new_lv = (chara(cid).system.抖M气质 += 2); // :99（system 属主）',
    tests: ['ablup'],
    must_mention:
      'ablup21：两条购买路径各自扣对应珠、写入 chara(cid).system.抖M气质',
  },
  {
    desc: 'M10419 ablup21：异常经验 F 的豁免素质漏掉受虐狂（88）',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n      (lv === 3 || lv === 4 || lv === 7) &&\n      talent(33) === 0 &&\n      talent(80) === 0 &&\n      talent(88) === 0\n    ) {',
    replace:
      'if (\n      (lv === 3 || lv === 4 || lv === 7) &&\n      talent(33) === 0 &&\n      talent(80) === 0 \n    ) {',
    tests: ['ablup'],
    must_mention: '受虐狂可免',
  },
  {
    desc: 'M10420 ablup22：男人判定反转（TALENT:122 误判为非男人才返回）',
    file: 'ere/system/train/ablup.js',
    find: '  if (talent(122)) return; // :10-11 男人直接返回（DRAWLINE 之前，无输出）\n\n  era.drawLine(); // :12\n\n  if (\n    abl22() >= 5 &&',
    replace:
      '  if (talent(122) === 0) return; // :10-11 男人直接返回（DRAWLINE 之前，无输出）\n\n  era.drawLine(); // :12\n\n  if (\n    abl22() >= 5 &&',
    tests: ['ablup'],
    must_mention: '男人（TALENT:122）在 DRAWLINE 前直接返回',
  },
  {
    desc: 'M10421 ablup22：Lv5 上限豁免五项素质最后一项 AND 误改为 OR',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n    abl22() >= 5 &&\n    talent(33) === 0 &&\n    talent(80) === 0 &&\n    talent(81) === 0 &&\n    talent(82) === 0 &&\n    talent(123) === 0\n  ) {',
    replace:
      'if (\n    abl22() >= 5 &&\n    talent(33) === 0 &&\n    talent(80) === 0 &&\n    talent(81) === 0 &&\n    (talent(82) === 0 || talent(123) === 0)\n  ) {',
    tests: ['ablup'],
    must_mention: '两档终止判定（五项豁免素质',
  },
  {
    desc: 'M10422 ablup22：Lv0 欲情点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: '    // A(欲情)/B(百合经验)/C(屈服)/D([1]阴核点数) 梯子 :140-190\n    // Lv0/1 双轨（D=1000/5000），Lv2 起 D=0（[1] 轨隐藏）\n    let a, b, c, d;\n    if (lv === 0) [a, b, c, d] = [200, 50, 0, 1000];',
    replace:
      '    // A(欲情)/B(百合经验)/C(屈服)/D([1]阴核点数) 梯子 :140-190\n    // Lv0/1 双轨（D=1000/5000），Lv2 起 D=0（[1] 轨隐藏）\n    let a, b, c, d;\n    if (lv === 0) [a, b, c, d] = [201, 50, 0, 1000];',
    tests: ['ablup'],
    must_mention: '欲情点数×0/200 ……点数不足 经验不足 能力不足',
  },
  {
    desc: 'M10423 ablup22：显示顺序颠倒——欲望行先于异常经验行',
    file: 'ere/system/train/ablup.js',
    find: "    if (e > 0) {\n      era.print(`${era.get('expname:50')}${e}以上(现在${exp50})且`); // :46-47（先异常行）\n    }\n    era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`); // :50（后欲望行）",
    replace:
      "    era.print(`${era.get('ablname:11')}LV${lv + 1}以上(现在LV${abl11()})且`); // :50（后欲望行）\n    if (e > 0) {\n      era.print(`${era.get('expname:50')}${e}以上(现在${exp50})且`); // :46-47（先异常行）\n    }",
    tests: ['ablup'],
    must_mention: '异常经验行应先于欲望行',
  },
  {
    desc: 'M10424 ablup22：坦率 ×0.95 改为 ×0.90（四元组）',
    file: 'ere/system/train/ablup.js',
    find: '      // 坦率 :218-223（四元组 ×0.95）\n      a = times(a, 0.95);\n      b = times(b, 0.95);\n      c = times(c, 0.95);\n      d = times(d, 0.95);',
    replace:
      '      // 坦率 :218-223（四元组 ×0.95）\n      a = times(a, 0.9);\n      b = times(b, 0.9);\n      c = times(c, 0.9);\n      d = times(d, 0.9);',
    tests: ['ablup'],
    must_mention: 'ablup22：坦率（TALENT:13）×0.95 四元组（A/B/C/D 同步）',
  },
  {
    desc: 'M10425 ablup22：双性恋 ×0.50 改为 ×0.55（四元组）',
    file: 'ere/system/train/ablup.js',
    find: '    if (talent(81)) {\n      // 双性恋 :299-304（×0.50）\n      a = times(a, 0.5);\n      b = times(b, 0.5);\n      c = times(c, 0.5);\n      d = times(d, 0.5);\n    }',
    replace:
      '    if (talent(81)) {\n      // 双性恋 :299-304（×0.50）\n      a = times(a, 0.55);\n      b = times(b, 0.55);\n      c = times(c, 0.55);\n      d = times(d, 0.55);\n    }',
    tests: ['ablup'],
    must_mention: '欲情点数×0/100 ……点数不足 经验不足 ',
  },
  {
    desc: 'M10426 ablup22：男人婆 ×2.00 改为 ×2.20（百合特有加成）',
    file: 'ere/system/train/ablup.js',
    find: '    if (talent(79)) {\n      // 男人婆 :291-296（×2.00，百合特有）\n      a = times(a, 2.0);\n      b = times(b, 2.0);\n      c = times(c, 2.0);\n      d = times(d, 2.0);\n    }',
    replace:
      '    if (talent(79)) {\n      // 男人婆 :291-296（×2.00，百合特有）\n      a = times(a, 2.2);\n      b = times(b, 2.2);\n      c = times(c, 2.2);\n      d = times(d, 2.2);\n    }',
    tests: ['ablup'],
    must_mention: '欲情点数×0/400 ……点数不足 经验不足 ',
  },
  {
    desc: 'M10427 ablup22：[0] 轨购买路径的屈服点数判定含等号（JUEL:6 <= C）',
    file: 'ere/system/train/ablup.js',
    find: '    if (juel6 < c) i |= 1; // :336-337\n    if (exp40 < b) i |= 2; // :339-340',
    replace:
      '    if (juel6 <= c) i |= 1; // :336-337\n    if (exp40 < b) i |= 2; // :339-340',
    tests: ['ablup'],
    must_mention:
      'ablup22：两条购买路径各自扣对应珠、写入 chara(cid).chara.百合气质',
  },
  {
    desc: 'M10428 ablup22：[1] 轨购买误扣欲情点数（JUEL:0 → JUEL:5）',
    file: 'ere/system/train/ablup.js',
    find: '      era.add(`juel:${cid}:0`, -d); // :92',
    replace: '      era.add(`juel:${cid}:5`, -d); // :92',
    tests: ['ablup'],
    must_mention: '写入 chara(cid).chara.百合气质',
  },
  {
    desc: 'M10429 ablup22：成功购买写入 chara(cid).chara.百合气质 改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = (chara(cid).chara.百合气质 += 1); // :86（chara 属主）',
    replace:
      '      const new_lv = (chara(cid).chara.百合气质 += 2); // :86（chara 属主）',
    tests: ['ablup'],
    must_mention:
      'ablup22：两条购买路径各自扣对应珠、写入 chara(cid).chara.百合气质',
  },
  {
    desc: 'M10430 ablup23：非男人判定反转',
    file: 'ere/system/train/ablup.js',
    find: '  if (talent(122) === 0) return;',
    replace: '  if (talent(122)) return;',
    tests: ['ablup'],
    must_mention: '非男人（TALENT:122==0）在 DRAWLINE 前直接返回',
  },
  {
    desc: 'M10431 ablup23：讨厌男人误加入 Lv5 上限豁免名单',
    file: 'ere/system/train/ablup.js',
    find: '  if (\n    abl23() >= 5 &&\n    talent(33) === 0 &&\n    talent(80) === 0 &&\n    talent(81) === 0 &&\n    talent(123) === 0\n  ) {',
    replace:
      '  if (\n    abl23() >= 5 &&\n    talent(33) === 0 &&\n    talent(80) === 0 &&\n    talent(81) === 0 &&\n    talent(82) === 0 &&\n    talent(123) === 0\n  ) {',
    tests: ['ablup'],
    must_mention: '讨厌男人不在名单内',
  },
  {
    desc: 'M10432 ablup23：Lv0 欲情点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: '    // A(欲情)/B(断背经验)/C(屈服)/D([1]肛门点数) 梯子 :136-186（与 ABLUP22 相同）\n    let a, b, c, d;\n    if (lv === 0) [a, b, c, d] = [200, 50, 0, 1000];',
    replace:
      '    // A(欲情)/B(断背经验)/C(屈服)/D([1]肛门点数) 梯子 :136-186（与 ABLUP22 相同）\n    let a, b, c, d;\n    if (lv === 0) [a, b, c, d] = [201, 50, 0, 1000];',
    tests: ['ablup'],
    must_mention: '欲情点数×0/200 ……点数不足 经验不足 ',
  },
  {
    desc: 'M10433 ablup23：讨厌男人 ×3.00 改为 ×2.00（与 ABLUP22 混同）',
    file: 'ere/system/train/ablup.js',
    find: '    if (talent(82)) {\n      // 讨厌男人 :257-262（×3.00，与 ABLUP22 相反）\n      a = times(a, 3.0);\n      b = times(b, 3.0);\n      c = times(c, 3.0);\n      d = times(d, 3.0);\n    }',
    replace:
      '    if (talent(82)) {\n      // 讨厌男人 :257-262（×3.00，与 ABLUP22 相反）\n      a = times(a, 2.0);\n      b = times(b, 2.0);\n      c = times(c, 2.0);\n      d = times(d, 2.0);\n    }',
    tests: ['ablup'],
    must_mention: '欲情点数×0/600 ……点数不足 经验不足 ',
  },
  {
    desc: 'M10434 ablup23：异常经验 E 的 lv-2 改为 lv-1',
    file: 'ere/system/train/ablup.js',
    find: '// E(异常经验)：lv>=3 且无[开放/倒错的/双性恋/疯狂]时 = lv-2（:210-211）\n    let e = 0;\n    if (\n      lv >= 3 &&\n      talent(33) === 0 &&\n      talent(80) === 0 &&\n      talent(81) === 0 &&\n      talent(123) === 0\n    ) {\n      e = lv - 2;\n    }',
    replace:
      '// E(异常经验)：lv>=3 且无[开放/倒错的/双性恋/疯狂]时 = lv-2（:210-211）\n    let e = 0;\n    if (\n      lv >= 3 &&\n      talent(33) === 0 &&\n      talent(80) === 0 &&\n      talent(81) === 0 &&\n      talent(123) === 0\n    ) {\n      e = lv - 1;\n    }',
    tests: ['ablup'],
    must_mention: '异常经验1以上(现在0)且',
  },
  {
    desc: 'M10435 ablup23：[1] 轨按钮误用阴核点数（PALAMNAME:0 → 需为 2 肛门）',
    file: 'ere/system/train/ablup.js',
    find: "        `${era.get('palamname:2')}点数×${juel2}/${d} ……${get_ablup_state(j)}`,",
    replace:
      "        `${era.get('palamname:0')}点数×${juel2}/${d} ……${get_ablup_state(j)}`,",
    tests: ['ablup'],
    must_mention: '肛门点数×0/1000 ……点数不足 经验不足 ',
  },
  {
    desc: 'M10436 ablup23：断背经验行误用百合经验表（expname:40 → 41）',
    file: 'ere/system/train/ablup.js',
    find: "    era.print(`　　　${era.get('expname:41')}　${exp41}/${b}`); // :56",
    replace:
      "    era.print(`　　　${era.get('expname:40')}　${exp41}/${b}`); // :56",
    tests: ['ablup'],
    must_mention: 'ablup23：Lv0 梯子字面值；[1] 用肛门点数；无欲望门槛行',
  },
  {
    desc: 'M10437 ablup23：[1] 轨判定误用欲情点数（juel2 → juel5）',
    file: 'ere/system/train/ablup.js',
    find: '      if (juel2 < d) j |= 1;',
    replace: '      if (juel5 < d) j |= 1;',
    tests: ['ablup'],
    must_mention: '[1] 用肛门点数',
  },
  {
    desc: 'M10438 ablup23：成功购买写入 chara(cid).system.断背气质 改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = (chara(cid).system.断背气质 += 1); // :85（system 属主）',
    replace:
      '      const new_lv = (chara(cid).system.断背气质 += 2); // :85（system 属主）',
    tests: ['ablup'],
    must_mention:
      'ablup23：Lv2 起肛门轨道隐藏；两条购买路径各自扣对应珠、写入 chara(cid).system.断背气质',
  },
  {
    desc: 'M10439 ablup23：Lv4 戒备森严 ×2.00 改为 ×2.20',
    file: 'ere/system/train/ablup.js',
    find: '      } else if (lv === 4) {\n        a = times(a, 2.0);\n        b = times(b, 2.0);\n        c = times(c, 2.0);\n      } else if (lv === 5) {\n        a = times(a, 2.5);\n        b = times(b, 2.5);\n        c = times(c, 2.5);\n      } else if (lv >= 6) {\n        a = times(a, 3.0);\n        b = times(b, 3.0);\n        c = times(c, 3.0);\n      }\n    }\n\n    // E(异常经验)：lv>=3 且无[开放/倒错的/双性恋/疯狂]时 = lv-2（:210-211）',
    replace:
      '      } else if (lv === 4) {\n        a = times(a, 2.2);\n        b = times(b, 2.2);\n        c = times(c, 2.2);\n      } else if (lv === 5) {\n        a = times(a, 2.5);\n        b = times(b, 2.5);\n        c = times(c, 2.5);\n      } else if (lv >= 6) {\n        a = times(a, 3.0);\n        b = times(b, 3.0);\n        c = times(c, 3.0);\n      }\n    }\n\n    // E(异常经验)：lv>=3 且无[开放/倒错的/双性恋/疯狂]时 = lv-2（:210-211）',
    tests: ['ablup'],
    must_mention:
      'ablup23：Lv4 戒备森严 A/B/C ×2.00（20000→40000、800→1600、5000→10000）',
  },
  {
    desc: 'M10440 ablup30：入口把关 OR 误改为 AND（六项全缺才拦）',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n    abl30() >= 5 &&\n    (talent(85) === 0 ||\n      talent(76) === 0 ||\n      talent(63) === 0 ||\n      talent(70) === 0 ||\n      talent(75) === 0 ||\n      talent(77) === 0)\n  ) {',
    replace:
      'if (\n    abl30() >= 5 &&\n    (talent(85) === 0 && talent(76) === 0 && talent(63) === 0 && talent(70) === 0 && talent(75) === 0 &&\n      talent(77) === 0)\n  ) {',
    tests: ['ablup'],
    must_mention:
      'ablup30：三档终止判定（六项豁免须全有——主流程 OR 拦截）/组合上限三行提示',
  },
  {
    desc: 'M10441 ablup30：组合上限拦截判定 JUEL:6/JUEL:5 与提示文案错位被"修正"',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n      juel6_gate < abl30() * abl30() * 1000 ||\n      juel5_gate < abl30() * abl30() * 300\n    ) {',
    replace:
      'if (\n      juel5_gate < abl30() * abl30() * 1000 || juel6_gate < abl30() * abl30() * 300\n    ) {',
    tests: ['ablup'],
    must_mention:
      'ablup30：合计 10-19 且珠够时放行（DECIDE 里 >=20 才 RETURN），照常出需求',
  },
  {
    desc: 'M10442 ablup30：Lv0 欲情点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: '    // A(欲情)/B(屈服)/C(性交经验) 梯子 :129-169\n    let a, b, c;\n    if (lv === 0) [a, b, c] = [3000, 10000, 10];',
    replace:
      '    // A(欲情)/B(屈服)/C(性交经验) 梯子 :129-169\n    let a, b, c;\n    if (lv === 0) [a, b, c] = [3001, 10000, 10];',
    tests: ['ablup'],
    must_mention: '欲情点数×0/3000 ……点数不足 经验不足 能力不足',
  },
  {
    desc: 'M10443 ablup30：[1] 轨三倍点数改为两倍',
    file: 'ere/system/train/ablup.js',
    find: "      `${era.get('palamname:5')}点数×${juel5}/${a * 3} ……${get_ablup_state(j)}`,\n      1,\n    ); // :60-62（恒渲染，无 256 分支）",
    replace:
      "      `${era.get('palamname:5')}点数×${juel5}/${a * 2} ……${get_ablup_state(j)}`,\n      1,\n    ); // :60-62（恒渲染，无 256 分支）",
    tests: ['ablup'],
    must_mention: '欲情点数×0/9000 ……点数不足 经验不足 能力不足',
  },
  {
    desc: 'M10444 ablup30：[1] 轨半经验改为整除丢失去掉（C/2 → C）',
    file: 'ere/system/train/ablup.js',
    find: '    if (exp5 < Math.floor(c / 2)) j |= 2;',
    replace: '    if (exp5 < c) j |= 2;',
    tests: ['ablup'],
    must_mention: 'ablup30：两条购买路径各自扣对应珠、era.add 写入 abl:30',
  },
  {
    desc: 'M10445 ablup30：异常经验 F 的 lv-1 改为 lv-2',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n      lv >= 2 &&\n      talent(33) === 0 &&\n      talent(72) === 0 &&\n      talent(76) === 0 &&\n      talent(123) === 0\n    ) {\n      f = lv - 1;\n    }',
    replace:
      'if (\n      lv >= 2 &&\n      talent(33) === 0 &&\n      talent(72) === 0 &&\n      talent(76) === 0 &&\n      talent(123) === 0\n    ) {\n      f = lv - 2;\n    }',
    tests: ['ablup'],
    must_mention: '异常经验1以上(现在0)且',
  },
  {
    desc: 'M10446 ablup30：崩坏 ×0.80 误改为 ×2.00（混用 ABLUP20/21 的系数）',
    file: 'ere/system/train/ablup.js',
    find: '    if (talent(9)) {\n      // 崩坏 :302-306（×0.80，非 ABLUP20/21 的 ×2.00）\n      a = times(a, 0.8);\n      b = times(b, 0.8);\n      c = times(c, 0.8);\n    }',
    replace:
      '    if (talent(9)) {\n      // 崩坏 :302-306（×0.80，非 ABLUP20/21 的 ×2.00）\n      a = times(a, 2.0);\n      b = times(b, 2.0);\n      c = times(c, 2.0);\n    }',
    tests: ['ablup'],
    must_mention: '欲情点数×0/2400 ……点数不足 经验不足 ',
  },
  {
    desc: 'M10447 ablup30：侍奉精神门槛比较改为 <=',
    file: 'ere/system/train/ablup.js',
    find: '    if (abl16() < lv + 1) {\n      // 侍奉精神门槛，双轨同时命中（:327-330）',
    replace:
      '    if (abl16() <= lv + 1) {\n      // 侍奉精神门槛，双轨同时命中（:327-330）',
    tests: ['ablup'],
    must_mention:
      'ablup30：Lv2→3 异常经验门槛 F=lv-1，开放可免；素质修正——容易陷落×0.50、崩坏×0.80（非 2.00）',
  },
  {
    desc: 'M10448 ablup30：成功购买写入等级改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = era.add(`abl:${cid}:30`, 1); // :81（train 属主）',
    replace:
      '      const new_lv = era.add(`abl:${cid}:30`, 2); // :81（train 属主）',
    tests: ['ablup'],
    must_mention: 'ablup30：两条购买路径各自扣对应珠、era.add 写入 abl:30',
  },
  {
    desc: 'M10449 ablup30：提示文案的倍率与判定对齐（1000/300 → 300/1000）',
    file: 'ere/system/train/ablup.js',
    find: "        `至少达成${era.get('palamname:5')}点数${abl30() * abl30() * 1000}点或${era.get('palamname:6')}点数${abl30() * abl30() * 300}点的其中一项`,",
    replace:
      "        `至少达成${era.get('palamname:5')}点数${abl30() * abl30() * 300}点或${era.get('palamname:6')}点数${abl30() * abl30() * 1000}点的其中一项`,",
    tests: ['ablup'],
    must_mention:
      'ablup30：三档终止判定（六项豁免须全有——主流程 OR 拦截）/组合上限三行提示',
  },
  {
    desc: 'M10450 ablup31：入口把关 AND 误改为 OR（六项任一为 0 即拦）',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n    abl31() >= 5 &&\n    talent(85) === 0 &&\n    talent(76) === 0 &&\n    talent(60) === 0 &&\n    talent(70) === 0 &&\n    talent(74) === 0 &&\n    talent(78) === 0\n  ) {',
    replace:
      'if (\n    abl31() >= 5 &&\n    (talent(85) === 0 || talent(76) === 0 || talent(60) === 0 || talent(70) === 0 || talent(74) === 0 || talent(78) === 0)\n  ) {',
    tests: ['ablup'],
    must_mention:
      'ablup31：三档终止判定（六项豁免任一命中即可——与 ABLUP30 的全有相反）',
  },
  {
    desc: 'M10451 ablup31：组合上限拦截欲情系数 2550 改为 2500',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n      juel5_gate < abl31() * abl31() * 2550 ||\n      juel0_gate < abl31() * abl31() * 15000 ||\n      juel8_gate < abl31() * abl31() * 2000\n    ) {',
    replace:
      'if (\n      juel5_gate < abl31() * abl31() * 2500 ||\n      juel0_gate < abl31() * abl31() * 15000 ||\n      juel8_gate < abl31() * abl31() * 2000\n    ) {',
    tests: ['ablup'],
    must_mention:
      'ablup31：组合上限拦截线的精确边界（Lv4 欲情 4²×2550 = 40800）',
  },
  {
    desc: 'M10452 ablup31：Lv0 欲情点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: '    if (lv === 0) [a, b, c, d, e] = [3000, 10000, 1000, 100, 20];',
    replace:
      '    if (lv === 0) [a, b, c, d, e] = [3001, 10000, 1000, 100, 20];',
    tests: ['ablup'],
    must_mention: '欲情点数×0/3000 ……点数不足 经验不足 ',
  },
  {
    desc: 'M10453 ablup31：异常经验 F 只在 lv==2 的判定放宽为 lv>=2',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n      lv === 2 &&\n      talent(33) === 0 &&\n      talent(60) === 0 &&\n      talent(72) === 0 &&\n      talent(76) === 0 &&\n      talent(123) === 0\n    ) {',
    replace:
      'if (\n      lv >= 2 &&\n      talent(33) === 0 &&\n      talent(60) === 0 &&\n      talent(72) === 0 &&\n      talent(76) === 0 &&\n      talent(123) === 0\n    ) {',
    tests: ['ablup'],
    must_mention: '半角括号异常行只在 Lv2',
  },
  {
    desc: 'M10454 ablup31：容易自慰 ×0.25 改为 ×0.20（A-D 四元组）',
    file: 'ere/system/train/ablup.js',
    find: '    if (talent(60)) {\n      // 容易自慰 :252-257（A-D 四列 ×0.25，E 不受影响）\n      a = times(a, 0.25);\n      b = times(b, 0.25);\n      c = times(c, 0.25);\n      d = times(d, 0.25);\n    }',
    replace:
      '    if (talent(60)) {\n      // 容易自慰 :252-257（A-D 四列 ×0.25，E 不受影响）\n      a = times(a, 0.2);\n      b = times(b, 0.2);\n      c = times(c, 0.2);\n      d = times(d, 0.2);\n    }',
    tests: ['ablup'],
    must_mention: '欲情点数×0/750 ……点数不足 经验不足 ',
  },
  {
    desc: 'M10455 ablup31：[1] 轨购买多扣一份（两轨同价破坏）',
    file: 'ere/system/train/ablup.js',
    find: '    } else if (result === 0 || result === 1) {\n      const new_lv = era.add(`abl:${cid}:31`, 1); // :96（train 属主；两轨扣点相同）\n      era.add(`juel:${cid}:5`, -a); // :99-101\n      era.add(`juel:${cid}:0`, -b);\n      era.add(`juel:${cid}:8`, -c);',
    replace:
      '    } else if (result === 0 || result === 1) {\n      const new_lv = era.add(`abl:${cid}:31`, 1); // :96（train 属主；两轨扣点相同）\n      era.add(`juel:${cid}:5`, -a * 2); // :99-101\n      era.add(`juel:${cid}:0`, -b);\n      era.add(`juel:${cid}:8`, -c);',
    tests: ['ablup'],
    must_mention: '两条购买路径扣点相同',
  },
  {
    desc: 'M10456 ablup31：阴蒂感觉门槛漏检（abl0 判定改为恒假）',
    file: 'ere/system/train/ablup.js',
    find: '    if (abl0() < lv + 1) {\n      // 阴蒂感觉门槛（:297-300）\n      i |= 4;\n      j |= 4;\n    }',
    replace:
      '    if (abl0() < 0) {\n      // 阴蒂感觉门槛（:297-300）\n      i |= 4;\n      j |= 4;\n    }',
    tests: ['ablup'],
    must_mention: 'ablup31：阴蒂感觉门槛（ABL:0）不足时两条轨道同时计能力不足',
  },
  {
    desc: 'M10457 ablup31：露出癖门槛比较改为 <=',
    file: 'ere/system/train/ablup.js',
    find: '    if (abl17() < lv + 1) {\n      // 露出癖门槛（:291-294）',
    replace: '    if (abl17() <= lv + 1) {\n      // 露出癖门槛（:291-294）',
    tests: ['ablup'],
    must_mention:
      'ablup31：Lv0 梯子字面值，双轨道同点数、不同经验行；容易自慰×0.25 四元组',
  },
  {
    desc: 'M10458 ablup31：成功购买写入等级改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = era.add(`abl:${cid}:31`, 1);',
    replace: '      const new_lv = era.add(`abl:${cid}:31`, 2);',
    tests: ['ablup'],
    must_mention: 'ablup31：两条购买路径扣点相同（JUEL:5/0/8），经验行各查各的',
  },
  {
    desc: 'M10459 ablup31：[1] 轨经验行误用自慰经验表（expname:11 → 10）',
    file: 'ere/system/train/ablup.js',
    find: "    era.print(`　　　${era.get('expname:11')}　${exp11}/${e}`);",
    replace: "    era.print(`　　　${era.get('expname:10')}　${exp11}/${e}`);",
    tests: ['ablup'],
    must_mention: '　　　调教自慰经验　0/20',
  },
  {
    desc: 'M10460 ablup32：入口把关五项素质最后一项 AND 误改为 OR',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n    abl32() >= 5 &&\n    talent(76) === 0 &&\n    talent(50) === 0 &&\n    talent(61) === 0 &&\n    talent(64) === 0 &&\n    talent(47) === 0\n  ) {',
    replace:
      'if (\n    abl32() >= 5 &&\n    talent(76) === 0 &&\n    talent(50) === 0 &&\n    talent(61) === 0 &&\n    (talent(64) === 0 || talent(47) === 0)\n  ) {',
    tests: ['ablup'],
    must_mention:
      'ablup32：三档终止判定（五项豁免须全无才拦）/拦截阈值 6500 与提示文案 4000 不一致（原作如此）',
  },
  {
    desc: 'M10461 ablup32：拦截判定 6500 误改为与文案一致的 4000',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n      juel5_gate < abl32() * abl32() * 6500 ||\n      juel6_gate < abl32() * abl32() * 19000\n    ) {',
    replace:
      'if (\n      juel5_gate < abl32() * abl32() * 4000 ||\n      juel6_gate < abl32() * abl32() * 19000\n    ) {',
    tests: ['ablup'],
    must_mention: '拦截阈值 6500 与提示文案 4000 不一致',
  },
  {
    desc: 'M10462 ablup32：合计突破覆盖 A 误用拦截系数（4000 → 6500）',
    file: 'ere/system/train/ablup.js',
    find: '      a = abl32() * abl32() * 4000;\n      b = abl32() * abl32() * 19000;',
    replace:
      '      a = abl32() * abl32() * 6500;\n      b = abl32() * abl32() * 19000;',
    tests: ['ablup'],
    must_mention: 'A/B 覆盖为 32²×4000/19000',
  },
  {
    desc: 'M10463 ablup32：Lv0 欲情点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: '    // A(欲情)/B(屈服)/C(精液经验) 梯子 :143-183\n    let a, b, c;\n    if (lv === 0) [a, b, c] = [3000, 10000, 10];',
    replace:
      '    // A(欲情)/B(屈服)/C(精液经验) 梯子 :143-183\n    let a, b, c;\n    if (lv === 0) [a, b, c] = [3001, 10000, 10];',
    tests: ['ablup'],
    must_mention: '欲情点数×0/3000 ……点数不足 经验不足 ',
  },
  {
    desc: 'M10464 ablup32：戒备森严 Lv5 ×2.50 改为 ×2.60（作用于合计覆盖值的证据）',
    file: 'ere/system/train/ablup.js',
    find: '      } else if (lv === 5) {\n        a = times(a, 2.5);\n        b = times(b, 2.5);\n        c = times(c, 2.5);\n      } else if (lv >= 6) {\n        a = times(a, 3.0);\n        b = times(b, 3.0);\n        c = times(c, 3.0);\n      }\n    }\n\n    // D(异常经验)：lv>=2 且无[不怕污臭/容易上瘾/倒错的/疯狂/喜欢精液]时',
    replace:
      '      } else if (lv === 5) {\n        a = times(a, 2.6);\n        b = times(b, 2.6);\n        c = times(c, 2.6);\n      } else if (lv >= 6) {\n        a = times(a, 3.0);\n        b = times(b, 3.0);\n        c = times(c, 3.0);\n      }\n    }\n\n    // D(异常经验)：lv>=2 且无[不怕污臭/容易上瘾/倒错的/疯狂/喜欢精液]时',
    tests: ['ablup'],
    must_mention:
      'ablup32：合计≥10 且珠够时 A/B 覆盖为 32²×4000/19000（梯子值作废），覆盖先于戒备森严',
  },
  {
    desc: 'M10465 ablup32：侍奉/欲望门槛二选一判定反转（talent(76)===0 → ===1）',
    file: 'ere/system/train/ablup.js',
    find: '    if (talent(76) === 0) {\n      // 无淫乱：侍奉精神门槛（:343-347）',
    replace:
      '    if (talent(76) === 1) {\n      // 无淫乱：侍奉精神门槛（:343-347）',
    tests: ['ablup'],
    must_mention:
      'ablup32：无淫乱查侍奉精神、有淫乱改查欲望（渲染行与判定同步切换）',
  },
  {
    desc: 'M10466 ablup32：反感污臭 ×2.00 改为 ×3.00',
    file: 'ere/system/train/ablup.js',
    find: '    } else if (talent(62)) {\n      a = times(a, 2.0);\n      b = times(b, 2.0);\n      c = times(c, 2.0);\n    }',
    replace:
      '    } else if (talent(62)) {\n      a = times(a, 3.0);\n      b = times(b, 3.0);\n      c = times(c, 3.0);\n    }',
    tests: ['ablup'],
    must_mention: '欲情点数×0/6000 ……点数不足 经验不足 ',
  },
  {
    desc: 'M10467 ablup32：异常经验 D 的 lv-1 改为 lv-2',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n      lv >= 2 &&\n      talent(61) === 0 &&\n      talent(72) === 0 &&\n      talent(80) === 0 &&\n      talent(123) === 0 &&\n      talent(47) === 0\n    ) {\n      d = lv - 1;\n    }',
    replace:
      'if (\n      lv >= 2 &&\n      talent(61) === 0 &&\n      talent(72) === 0 &&\n      talent(80) === 0 &&\n      talent(123) === 0 &&\n      talent(47) === 0\n    ) {\n      d = lv - 2;\n    }',
    tests: ['ablup'],
    must_mention: '异常经验1以上(现在0)且',
  },
  {
    desc: 'M10468 ablup32：成功购买写入等级改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = era.add(`abl:${cid}:32`, 1); // :91（train 属主）',
    replace:
      '      const new_lv = era.add(`abl:${cid}:32`, 2); // :91（train 属主）',
    tests: ['ablup'],
    must_mention: 'ablup32：两条购买路径各自扣对应珠、era.add 写入 abl:32',
  },
  {
    desc: 'M10469 ablup32：[1] 轨半经验改为整（C/2 → C）',
    file: 'ere/system/train/ablup.js',
    find: '    if (exp20 < Math.floor(c / 2)) j |= 2;',
    replace: '    if (exp20 < c) j |= 2;',
    tests: ['ablup'],
    must_mention: 'ablup32：两条购买路径各自扣对应珠、era.add 写入 abl:32',
  },
  {
    desc: 'M10470 ablup33：男人判定反转',
    file: 'ere/system/train/ablup.js',
    find: '  if (talent(122)) return; // :10-11 男人直接返回（DRAWLINE 之前，无输出）\n\n  era.drawLine(); // :12\n\n  if (\n    abl33() >= 5 &&',
    replace:
      '  if (talent(122) === 0) return; // :10-11 男人直接返回（DRAWLINE 之前，无输出）\n\n  era.drawLine(); // :12\n\n  if (\n    abl33() >= 5 &&',
    tests: ['ablup'],
    must_mention: '男人直接返回',
  },
  {
    desc: 'M10471 ablup33：Lv5 上限豁免四项素质最后一项 AND 误改为 OR',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n    abl33() >= 5 &&\n    talent(76) === 0 &&\n    talent(80) === 0 &&\n    talent(81) === 0 &&\n    talent(82) === 0\n  ) {',
    replace:
      'if (\n    abl33() >= 5 &&\n    talent(76) === 0 &&\n    talent(80) === 0 &&\n    (talent(81) === 0 || talent(82) === 0)\n  ) {',
    tests: ['ablup'],
    must_mention: '四项豁免须全无才拦',
  },
  {
    desc: 'M10472 ablup33：组合上限拦截阴核系数 10000 改为 1000',
    file: 'ere/system/train/ablup.js',
    find: 'if (\n      juel5_gate < abl33() * abl33() * 4000 ||\n      juel6_gate < abl33() * abl33() * 4000 ||\n      juel0_gate < abl33() * abl33() * 10000\n    ) {',
    replace:
      'if (\n      juel5_gate < abl33() * abl33() * 4000 ||\n      juel6_gate < abl33() * abl33() * 4000 ||\n      juel0_gate < abl33() * abl33() * 1000\n    ) {',
    tests: ['ablup'],
    must_mention:
      'ablup33：组合上限拦截线的精确边界（Lv4 阴核 4²×10000 = 160000）',
  },
  {
    desc: 'M10473 ablup33：合计突破覆盖 B 误用 A 的系数（10000 → 4000）',
    file: 'ere/system/train/ablup.js',
    find: '      a = abl33() * abl33() * 4000;\n      b = abl33() * abl33() * 10000;',
    replace:
      '      a = abl33() * abl33() * 4000;\n      b = abl33() * abl33() * 4000;',
    tests: ['ablup'],
    must_mention:
      'ablup33：合计≥10 且珠够时 A/B 覆盖为 33²×4000/10000；素质修正——男人婆×2.00、讨厌男人×0.50',
  },
  {
    desc: 'M10474 ablup33：Lv0 阴核点数梯子字面值',
    file: 'ere/system/train/ablup.js',
    find: '    if (lv === 0) [a, b, c] = [1200, 5000, 300];',
    replace: '    if (lv === 0) [a, b, c] = [1200, 5001, 300];',
    tests: ['ablup'],
    must_mention: '阴核点数×0/5000 ……点数不足 经验不足 ',
  },
  {
    desc: 'M10475 ablup33：欲情/屈服需求同为 A——屈服分母误改为 B',
    file: 'ere/system/train/ablup.js',
    find: "    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${a}`);",
    replace:
      "    era.print(`　　　${era.get('palamname:6')}点数×${juel6}/${b}`);",
    tests: ['ablup'],
    must_mention: '　　　屈服点数×0/1200',
  },
  {
    desc: 'M10476 ablup33：保守的 ×1.50 误改为 ×1.20（混用 ABLUP22/23 的系数）',
    file: 'ere/system/train/ablup.js',
    find: '    if (talent(24)) {\n      // 保守的 :217-221（×1.50，非 ABLUP22/23 的 ×1.20）\n      a = times(a, 1.5);\n      b = times(b, 1.5);\n      c = times(c, 1.5);\n    }',
    replace:
      '    if (talent(24)) {\n      // 保守的 :217-221（×1.50，非 ABLUP22/23 的 ×1.20）\n      a = times(a, 1.2);\n      b = times(b, 1.2);\n      c = times(c, 1.2);\n    }',
    tests: ['ablup'],
    must_mention:
      'ablup33：Lv0 梯子字面值；欲情/屈服需求同为 A；百合气质门槛；输入白名单无 [1]',
  },
  {
    desc: 'M10477 ablup33：男人婆 ×2.00 丢失（改为 ×1.0）',
    file: 'ere/system/train/ablup.js',
    find: '    if (talent(79)) {\n      // 男人婆 :297-301（×2.00）\n      a = times(a, 2.0);\n      b = times(b, 2.0);\n      c = times(c, 2.0);\n    }',
    replace:
      '    if (talent(79)) {\n      // 男人婆 :297-301（×2.00）\n      a = times(a, 1.0);\n      b = times(b, 1.0);\n      c = times(c, 1.0);\n    }',
    tests: ['ablup'],
    must_mention: '阴核点数×0/10000 ……点数不足 经验不足 ',
  },
  {
    desc: 'M10478 ablup33：成功购买写入等级改为 +2',
    file: 'ere/system/train/ablup.js',
    find: '      const new_lv = era.add(`abl:${cid}:33`, 1);',
    replace: '      const new_lv = era.add(`abl:${cid}:33`, 2);',
    tests: ['ablup'],
    must_mention:
      'ablup33：Lv2 异常经验 D=lv-1；成功购买扣三项珠（JUEL:0/5/6）、era.add 写入 abl:33',
  },
  {
    desc: 'M10479 ablup33：成功购买漏扣屈服点数（三项同扣破坏）',
    file: 'ere/system/train/ablup.js',
    find: '      era.add(`juel:${cid}:0`, -b); // :79-81\n      era.add(`juel:${cid}:5`, -a);\n      era.add(`juel:${cid}:6`, -a);',
    replace:
      '      era.add(`juel:${cid}:0`, -b); // :79-81\n      era.add(`juel:${cid}:5`, -a);',
    tests: ['ablup'],
    must_mention: '成功购买扣三项珠',
  },
  // ———— #491：ABLUP20～33/37/39/40/99/100 的素质倍率、异常经验档位与门槛比较 ————
  // 前四条是 #466/#467 验收按 SOP §5 抽查时逃逸的四处——三处倍率（ablup20 感情
  // 淡薄的 B 轨、ablup21 抵抗、ablup40 否定快感）＋一处门槛（ablup39 欲望门槛），
  // 另有一处被拦的 ablup31 组合上限不在本组；补覆盖后必须全被拦住。其余每条对应
  // test/ablup.test.js 里新增的表驱动用例的一行（素质编号、档位公式或门槛临界值）。
  {
    desc: 'M10525 ablup20：感情淡薄的 B 轨 ×1.2 误改为 ×1.5（#466 验收逃逸的那一处）',
    file: 'ere/system/train/ablup.js',
    find: '      // 感情淡薄 :222-225（B 是 ×1.2 非 ×1.5）\n      a = times(a, 1.5);\n      b = times(b, 1.2);',
    replace:
      '      // 感情淡薄 :222-225（B 是 ×1.2 非 ×1.5）\n      a = times(a, 1.5);\n      b = times(b, 1.5);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10526 ablup21：抵抗的 ×2.00 误改为 ×1.50（#466 验收逃逸的那一处）',
    file: 'ere/system/train/ablup.js',
    find: '      // 抵抗 :374-380（×2.00）\n      a = times(a, 2.0);\n      b = times(b, 2.0);\n      c = times(c, 2.0);\n      d = times(d, 2.0);\n      e = times(e, 2.0);',
    replace:
      '      // 抵抗 :374-380（×2.00）\n      a = times(a, 1.5);\n      b = times(b, 2.0);\n      c = times(c, 2.0);\n      d = times(d, 2.0);\n      e = times(e, 2.0);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10527 ablup40：否定快感的 ×1.75 误改为 ×1.50（#467 验收逃逸的那一处）',
    file: 'ere/system/train/ablup.js',
    find: '      // 否定快感 :107-108\n      a = times(a, 1.75);',
    replace: '      // 否定快感 :107-108\n      a = times(a, 1.5);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10528 ablup39：欲望门槛的 `< lv + 1` 误改为 `< lv`（#467 验收逃逸的那一处）',
    file: 'ere/system/train/ablup.js',
    find: '    if (abl11() < lv + 1) i |= 4; //  欲望门槛\n    if (juel5 < a) i |= 1;',
    replace:
      '    if (abl11() < lv) i |= 4; //  欲望门槛\n    if (juel5 < a) i |= 1;',
    tests: ['ablup'],
    must_mention: '门槛比较在临界值两侧',
  },
  {
    desc: 'M10529 ablup20：文静的 A 轨 ×1.20 误改为 ×1.30',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(14)) a = times(a, 1.2); // 文静 :193-194',
    replace: 'if (talent(14)) a = times(a, 1.3); // 文静 :193-194',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10530 ablup20：刚强的 A 轨 ×0.90 误改为 ×0.95',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(12)) a = times(a, 0.9); // 刚强 :190-191',
    replace: 'if (talent(12)) a = times(a, 0.95); // 刚强 :190-191',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10531 ablup20：悲观的 ×1.10 误改为 ×1.20（只乘 A 的轨道）',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(26)) a = times(a, 1.1); // 悲观的 :232-233',
    replace: 'if (talent(26)) a = times(a, 1.2); // 悲观的 :232-233',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10532 ablup20：嫉妒的 ×0.80 误改为 ×0.90（A/B 两轨）',
    file: 'ere/system/train/ablup.js',
    find: '    if (talent(84)) {\n      // 嫉妒 :299-302\n      a = times(a, 0.8);',
    replace:
      '    if (talent(84)) {\n      // 嫉妒 :299-302\n      a = times(a, 0.9);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10533 ablup20：小恶魔的 ×0.80 误改为 ×0.90（A/B 两轨）',
    file: 'ere/system/train/ablup.js',
    find: '    if (talent(87)) {\n      // 小恶魔 :304-307\n      a = times(a, 0.8);',
    replace:
      '    if (talent(87)) {\n      // 小恶魔 :304-307\n      a = times(a, 0.9);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10534 ablup20：受虐狂的 ×1.20 误改为 ×1.30（同文件里 ×0.50 的是施虐狂）',
    file: 'ere/system/train/ablup.js',
    find: '      // 受虐狂 :294-297\n      a = times(a, 1.2);',
    replace: '      // 受虐狂 :294-297\n      a = times(a, 1.3);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10535 ablup20：爱表现的 ×0.90 误改为 ×0.95（A/B 两轨）',
    file: 'ere/system/train/ablup.js',
    find: '      // 爱表现 :235-238\n      a = times(a, 0.9);',
    replace: '      // 爱表现 :235-238\n      a = times(a, 0.95);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10536 ablup20：低姿态（ELSEIF 侧）的 ×1.10 误改为 ×1.20',
    file: 'ere/system/train/ablup.js',
    find: '      // 低姿态 :206-208\n      a = times(a, 1.1);',
    replace: '      // 低姿态 :206-208\n      a = times(a, 1.2);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10537 ablup20：开放（ELSEIF 侧）的 ×0.90 误改为 ×0.85',
    file: 'ere/system/train/ablup.js',
    find: '      // 开放 :254-256\n      a = times(a, 0.9);',
    replace: '      // 开放 :254-256\n      a = times(a, 0.85);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10538 ablup20：看轻贞操（ELSEIF 侧）的 ×0.95 误改为 ×0.90',
    file: 'ere/system/train/ablup.js',
    find: '      // 看轻贞操 :244-246\n      a = times(a, 0.95);',
    replace: '      // 看轻贞操 :244-246\n      a = times(a, 0.9);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10539 ablup20：异常经验 C 的档位 lv-2 误改为 lv-3',
    file: 'ere/system/train/ablup.js',
    find: '      talent(84) === 0 &&\n      talent(87) === 0\n    ) {\n      c = lv - 2;',
    replace:
      '      talent(84) === 0 &&\n      talent(87) === 0\n    ) {\n      c = lv - 3;',
    tests: ['ablup'],
    must_mention: '异常经验需求的档位逐级',
  },
  {
    desc: 'M10540 ablup21：冷漠的 ×1.10 误改为 ×1.20（五元组同乘）',
    file: 'ere/system/train/ablup.js',
    find: '      // 冷漠 :309-315（×1.10）\n      a = times(a, 1.1);',
    replace: '      // 冷漠 :309-315（×1.10）\n      a = times(a, 1.2);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10541 ablup21：保守的 ×1.20 误改为 ×1.30',
    file: 'ere/system/train/ablup.js',
    find: '      // 保守的 :325-331\n      a = times(a, 1.2);',
    replace: '      // 保守的 :325-331\n      a = times(a, 1.3);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10542 ablup21：不知羞耻（ELSEIF 侧）的 ×1.20 误改为 ×1.30',
    file: 'ere/system/train/ablup.js',
    find: '    } else if (talent(36)) {\n      a = times(a, 1.2);',
    replace: '    } else if (talent(36)) {\n      a = times(a, 1.3);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10543 ablup21：接受快感的 ×0.90 误改为 ×0.95（与否定快感同段的 IF 侧）',
    file: 'ere/system/train/ablup.js',
    find: '      // 接受快感 :415-420 / 否定快感 :422-427\n      a = times(a, 0.9);',
    replace:
      '      // 接受快感 :415-420 / 否定快感 :422-427\n      a = times(a, 0.95);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10544 ablup21：反抗心的 ×1.20 误改为 ×1.25',
    file: 'ere/system/train/ablup.js',
    find: '      // 反抗心 :260-266\n      a = times(a, 1.2);',
    replace: '      // 反抗心 :260-266\n      a = times(a, 1.25);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10545 ablup21：异常经验 F 的档位 lv-2 误改为 lv-3',
    file: 'ere/system/train/ablup.js',
    find: '      talent(80) === 0 &&\n      talent(88) === 0\n    ) {\n      f = lv - 2;',
    replace:
      '      talent(80) === 0 &&\n      talent(88) === 0\n    ) {\n      f = lv - 3;',
    tests: ['ablup'],
    must_mention: '异常经验需求的档位逐级',
  },
  {
    desc: 'M10546 ablup22：好奇心的 ×0.95 误改为 ×0.90（四元组同乘）',
    file: 'ere/system/train/ablup.js',
    find: '      // 好奇心 :232-237（×0.95）\n      a = times(a, 0.95);',
    replace: '      // 好奇心 :232-237（×0.95）\n      a = times(a, 0.9);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10547 ablup22：献身的 ×0.95 误改为 ×0.90（四元组同乘）',
    file: 'ere/system/train/ablup.js',
    find: '      // 献身的 :261-266（×0.95）\n      a = times(a, 0.95);',
    replace: '      // 献身的 :261-266（×0.95）\n      a = times(a, 0.9);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10548 ablup23：保守的 ×1.20 误改为 ×1.30',
    file: 'ere/system/train/ablup.js',
    find: '      // 保守的 :235-240（×1.20）\n      a = times(a, 1.2);',
    replace: '      // 保守的 :235-240（×1.20）\n      a = times(a, 1.3);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10549 ablup23：献身的 ×0.95 误改为 ×0.90',
    file: 'ere/system/train/ablup.js',
    find: '      // 献身的 :264-269（×0.95）\n      a = times(a, 0.95);',
    replace: '      // 献身的 :264-269（×0.95）\n      a = times(a, 0.9);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10550 ablup30：抵抗的 ×1.20 误改为 ×1.25',
    file: 'ere/system/train/ablup.js',
    find: '      // 抵抗 :242-246（×1.20）\n      a = times(a, 1.2);',
    replace: '      // 抵抗 :242-246（×1.20）\n      a = times(a, 1.25);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10551 ablup30：容易上瘾的 ×0.60 误改为 ×0.65',
    file: 'ere/system/train/ablup.js',
    find: '      // 容易上瘾 :272-276（×0.60）\n      a = times(a, 0.6);',
    replace: '      // 容易上瘾 :272-276（×0.60）\n      a = times(a, 0.65);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10552 ablup30：容易陷落的 ×0.50 误改为 ×0.55',
    file: 'ere/system/train/ablup.js',
    find: '      // 容易陷落 :278-282（×0.50）\n      a = times(a, 0.5);',
    replace: '      // 容易陷落 :278-282（×0.50）\n      a = times(a, 0.55);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10553 ablup30：异常经验 F 的档位 lv-1 误改为 lv-2',
    file: 'ere/system/train/ablup.js',
    find: '      lv >= 2 &&\n      talent(33) === 0 &&\n      talent(72) === 0 &&\n      talent(76) === 0 &&\n      talent(123) === 0\n    ) {\n      f = lv - 1;',
    replace:
      '      lv >= 2 &&\n      talent(33) === 0 &&\n      talent(72) === 0 &&\n      talent(76) === 0 &&\n      talent(123) === 0\n    ) {\n      f = lv - 2;',
    tests: ['ablup'],
    must_mention: '异常经验需求的档位逐级',
  },
  {
    desc: 'M10554 ablup31：倒错的 ×0.75 误改为 ×0.70（A-D 四元组，E 不受影响）',
    file: 'ere/system/train/ablup.js',
    find: '      // 倒错的 :268-273（×0.75）\n      a = times(a, 0.75);',
    replace: '      // 倒错的 :268-273（×0.75）\n      a = times(a, 0.7);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10555 ablup31：淫乱化的 ×0.50 误改为 ×0.55',
    file: 'ere/system/train/ablup.js',
    find: '      // 淫乱化 :276-281（×0.50）\n      a = times(a, 0.5);',
    replace: '      // 淫乱化 :276-281（×0.50）\n      a = times(a, 0.55);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10556 ablup31：异常经验 F 的门槛等级 lv==2 误改为 lv==3（其余等级仍应为 0）',
    file: 'ere/system/train/ablup.js',
    find: '      lv === 2 &&\n      talent(33) === 0 &&',
    replace: '      lv === 3 &&\n      talent(33) === 0 &&',
    tests: ['ablup'],
    must_mention: '异常经验需求的档位逐级',
  },
  {
    desc: 'M10557 ablup32：擅用舌头的 ×0.95 误改为 ×0.90',
    file: 'ere/system/train/ablup.js',
    find: '      // 擅用舌头 :261-265（×0.95）\n      a = times(a, 0.95);',
    replace: '      // 擅用舌头 :261-265（×0.95）\n      a = times(a, 0.9);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10558 ablup32：不怕脏的 ×0.90 误改为 ×0.95',
    file: 'ere/system/train/ablup.js',
    find: '      // 不怕脏 :279-283（×0.90）\n      a = times(a, 0.9);',
    replace: '      // 不怕脏 :279-283（×0.90）\n      a = times(a, 0.95);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10559 ablup32：异常经验 D 的档位 lv-1 误改为 lv-2',
    file: 'ere/system/train/ablup.js',
    find: '      talent(123) === 0 &&\n      talent(47) === 0\n    ) {\n      d = lv - 1;',
    replace:
      '      talent(123) === 0 &&\n      talent(47) === 0\n    ) {\n      d = lv - 2;',
    tests: ['ablup'],
    must_mention: '异常经验需求的档位逐级',
  },
  {
    desc: 'M10560 ablup33：不怕污臭的 ×0.95 误改为 ×0.90',
    file: 'ere/system/train/ablup.js',
    find: '      // 不怕污臭 :248-252（×0.95）\n      a = times(a, 0.95);',
    replace: '      // 不怕污臭 :248-252（×0.95）\n      a = times(a, 0.9);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10561 ablup33：不怕脏的 ×0.95 误改为 ×0.90',
    file: 'ere/system/train/ablup.js',
    find: '      // 不怕脏 :260-264（×0.95）\n      a = times(a, 0.95);',
    replace: '      // 不怕脏 :260-264（×0.95）\n      a = times(a, 0.9);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10562 ablup33：小恶魔的 ×0.90 误改为 ×0.95',
    file: 'ere/system/train/ablup.js',
    find: '      // 小恶魔 :322-326（×0.90）\n      a = times(a, 0.9);',
    replace: '      // 小恶魔 :322-326（×0.90）\n      a = times(a, 0.95);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10563 ablup37：妊娠的 ×2.00 误改为 ×2.50',
    file: 'ere/system/train/ablup.js',
    find: '      // 妊娠 :257-261\n      a = times(a, 2.0);',
    replace: '      // 妊娠 :257-261\n      a = times(a, 2.5);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10564 ablup37：倾城的 ×0.50 误改为 ×0.55',
    file: 'ere/system/train/ablup.js',
    find: '      // 倾城 :277-281\n      a = times(a, 0.5);',
    replace: '      // 倾城 :277-281\n      a = times(a, 0.55);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10565 ablup37：有常客的 ×0.90 误改为 ×0.95',
    file: 'ere/system/train/ablup.js',
    find: '      // 有常客 :282-286\n      a = times(a, 0.9);',
    replace: '      // 有常客 :282-286\n      a = times(a, 0.95);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10566 ablup37：异常经验 F 的档位 lv-1 误改为 lv-2（F 另有 17 项增减表）',
    file: 'ere/system/train/ablup.js',
    find: '    if (lv >= 2 && talent(123) === 0 && talent(9) === 0) {\n      f = lv - 1;',
    replace:
      '    if (lv >= 2 && talent(123) === 0 && talent(9) === 0) {\n      f = lv - 2;',
    tests: ['ablup'],
    must_mention: '异常经验需求的档位逐级',
  },
  {
    desc: 'M10567 ablup39：动物耳朵的 ×0.80 误改为 ×0.85（三列同乘）',
    file: 'ere/system/train/ablup.js',
    find: '      // 动物耳朵 :199-203\n      a = times(a, 0.8);',
    replace: '      // 动物耳朵 :199-203\n      a = times(a, 0.85);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10568 ablup39：牝犬的 ×0.50 误改为 ×0.55（三列同乘）',
    file: 'ere/system/train/ablup.js',
    find: '      // 牝犬 :204-208\n      a = times(a, 0.5);',
    replace: '      // 牝犬 :204-208\n      a = times(a, 0.55);',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10569 ablup39：异常经验 F 的档位 lv+1 误改为 lv+2',
    file: 'ere/system/train/ablup.js',
    find: '    if (lv >= 2 && talent(72) === 0 && talent(76) === 0 && talent(136) === 0) {\n      f = lv + 1;',
    replace:
      '    if (lv >= 2 && talent(72) === 0 && talent(76) === 0 && talent(136) === 0) {\n      f = lv + 2;',
    tests: ['ablup'],
    must_mention: '异常经验需求的档位逐级',
  },
  {
    desc: 'M10570 ablup40：倒錯的 ×0.75 误改为 ×0.70',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(80)) a = times(a, 0.75); // 倒錯的 :111-112',
    replace: 'if (talent(80)) a = times(a, 0.7); // 倒錯的 :111-112',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10571 ablup40：疯狂的 ×0.50 误改为 ×0.55',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(123)) a = times(a, 0.5); // 疯狂 :113-114',
    replace: 'if (talent(123)) a = times(a, 0.55); // 疯狂 :113-114',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10572 ablup40：异常经验 F 的档位 lv+1 误改为 lv+2',
    file: 'ere/system/train/ablup.js',
    find: '    if (lv >= 2 && talent(72) === 0 && talent(76) === 0) {\n      f = lv + 1;',
    replace:
      '    if (lv >= 2 && talent(72) === 0 && talent(76) === 0) {\n      f = lv + 2;',
    tests: ['ablup'],
    must_mention: '异常经验需求的档位逐级',
  },
  {
    desc: 'M10573 ablup99：嚣张的 ×1.50 误改为 ×1.60',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(16)) a = times(a, 1.5); // 嚣张 :109-111',
    replace: 'if (talent(16)) a = times(a, 1.6); // 嚣张 :109-111',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10574 ablup99：屈服刻印门槛的 `MARK:3 > MARK:2` 误改为 `>=`（取等也点亮）',
    file: 'ere/system/train/ablup.js',
    find: 'if (mark3() > mark2()) i |= 2;',
    replace: 'if (mark3() >= mark2()) i |= 2;',
    tests: ['ablup'],
    must_mention: 'ablup99：两道刻印门槛在临界值两侧',
  },
  {
    desc: 'M10575 ablup99：顺从门槛的 MARK:3+2 误改为 MARK:3+3',
    file: 'ere/system/train/ablup.js',
    find: 'const b = mark3() + 2;',
    replace: 'const b = mark3() + 3;',
    tests: ['ablup'],
    must_mention: 'ablup99：两道刻印门槛在临界值两侧',
  },
  {
    desc: 'M10576 ablup100：智慧的 ×0.80 误改为 ×0.85',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(172)) a = times(a, 0.8); // 智慧 :94-96',
    replace: 'if (talent(172)) a = times(a, 0.85); // 智慧 :94-96',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10577 ablup100：嚣张的 ×1.20 误改为 ×1.30（与刚强的 ×1.80 区分）',
    file: 'ere/system/train/ablup.js',
    find: 'if (talent(16)) a = times(a, 1.2); // 嚣张 :102-104',
    replace: 'if (talent(16)) a = times(a, 1.3); // 嚣张 :102-104',
    tests: ['ablup'],
    must_mention: '素质倍率逐条表驱动',
  },
  {
    desc: 'M10578 ablup100：战斗门槛的 `b > CFLAG:9` 误改为 `>=`（取等也算不满足）',
    file: 'ere/system/train/ablup.js',
    find: '    if (b > cflag9) m += 1;',
    replace: '    if (b >= cflag9) m += 1;',
    tests: ['ablup'],
    must_mention: 'ablup100：两道门槛同时不满足',
  },
  // —— #491 第二步第一批：ABLUP21/23/32/37/39 的戒备森严四档逐级（M10579-M10588）——
  // ablup22/23/32/33 的戒备森严块去掉注释后同形，find 靠注释行区分：
  // ablup23 的两条取注释描述的后半段（不含 `:N` 行号，行号重定位不受影响），
  // ablup32 的两条必须带上那行含 `:N` 的注释（它随行号重定位一起同步：
  // 重定位后现为 `:191-209`，同步见 70431ef）。
  {
    desc: 'M10579 ablup21：戒备森严 Lv5 档的 ×2.50 误改为 ×2.60（C/D/E 三列）',
    file: 'ere/system/train/ablup.js',
    find: `      } else if (lv === 5) {
        c = times(c, 2.5);`,
    replace: `      } else if (lv === 5) {
        c = times(c, 2.6);`,
    tests: ['ablup'],
    must_mention: 'ablup21：Lv5 戒备森严 ×2.5',
  },
  {
    desc: 'M10580 ablup21：戒备森严 Lv6 档的 ×3.00 误改为 ×3.10（C/D/E 三列）',
    file: 'ere/system/train/ablup.js',
    find: `      } else if (lv >= 6) {
        c = times(c, 3.0);`,
    replace: `      } else if (lv >= 6) {
        c = times(c, 3.1);`,
    tests: ['ablup'],
    must_mention: 'ablup21：Lv6 戒备森严 ×3',
  },
  {
    desc: 'M10581 ablup23：戒备森严 Lv3 档的 ×1.50 误改为 ×1.60（A/B/C 三列）',
    file: 'ere/system/train/ablup.js',
    find: `（A/B/C 三列，与 ABLUP22 相同）
      if (lv === 3) {
        a = times(a, 1.5);`,
    replace: `（A/B/C 三列，与 ABLUP22 相同）
      if (lv === 3) {
        a = times(a, 1.6);`,
    tests: ['ablup'],
    must_mention: 'ablup23：Lv3 戒备森严 ×1.5',
  },
  {
    desc: 'M10582 ablup23：戒备森严 Lv6 档的 ×3.00 误改为 ×3.10（A/B/C 三列）',
    file: 'ere/system/train/ablup.js',
    find: `（A/B/C 三列，与 ABLUP22 相同）
      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
        c = times(c, 1.5);
      } else if (lv === 4) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        c = times(c, 2.0);
      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);
      } else if (lv >= 6) {
        a = times(a, 3.0);`,
    replace: `（A/B/C 三列，与 ABLUP22 相同）
      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
        c = times(c, 1.5);
      } else if (lv === 4) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        c = times(c, 2.0);
      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);
      } else if (lv >= 6) {
        a = times(a, 3.1);`,
    tests: ['ablup'],
    must_mention: 'ablup23：Lv6 戒备森严 ×3',
  },
  {
    desc: 'M10583 ablup32：戒备森严 Lv6 档的 ×3.00 误改为 ×3.10（A/B/C 三列）',
    file: 'ere/system/train/ablup.js',
    find: `      // 戒备森严 :191-209（作用于覆盖后的 A/B/C）
      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
        c = times(c, 1.5);
      } else if (lv === 4) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        c = times(c, 2.0);
      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);
      } else if (lv >= 6) {
        a = times(a, 3.0);`,
    replace: `      // 戒备森严 :191-209（作用于覆盖后的 A/B/C）
      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
        c = times(c, 1.5);
      } else if (lv === 4) {
        a = times(a, 2.0);
        b = times(b, 2.0);
        c = times(c, 2.0);
      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);
      } else if (lv >= 6) {
        a = times(a, 3.1);`,
    tests: ['ablup'],
    must_mention: 'ablup32：Lv6 戒备森严 ×3',
  },
  {
    desc: 'M10584 ablup32：戒备森严 Lv3 档的 ×1.50 误改为 ×1.60（A/B/C 三列）',
    file: 'ere/system/train/ablup.js',
    find: `      // 戒备森严 :191-209（作用于覆盖后的 A/B/C）
      if (lv === 3) {
        a = times(a, 1.5);`,
    replace: `      // 戒备森严 :191-209（作用于覆盖后的 A/B/C）
      if (lv === 3) {
        a = times(a, 1.6);`,
    tests: ['ablup'],
    must_mention: 'ablup32：Lv3 戒备森严 ×1.5',
  },
  {
    desc: 'M10585 ablup37：戒备森严 Lv3 档的 D 轨 ×1.50 误改为 ×1.60（#491 验收逃逸的那一处）',
    file: 'ere/system/train/ablup.js',
    find: `      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
        c = times(c, 1.5);
        d = times(d, 1.5);
      } else if (lv === 4) {`,
    replace: `      if (lv === 3) {
        a = times(a, 1.5);
        b = times(b, 1.5);
        c = times(c, 1.5);
        d = times(d, 1.6);
      } else if (lv === 4) {`,
    tests: ['ablup'],
    must_mention: 'ablup37：Lv3 戒备森严 ×1.5',
  },
  {
    desc: 'M10586 ablup37：戒备森严 Lv5 档的 ×2.50 误改为 ×2.60（A-D 四列）',
    file: 'ere/system/train/ablup.js',
    find: `      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);
        d = times(d, 2.5);
      } else if (lv >= 6) {`,
    replace: `      } else if (lv === 5) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);
        d = times(d, 2.6);
      } else if (lv >= 6) {`,
    tests: ['ablup'],
    must_mention: 'ablup37：Lv5 戒备森严 ×2.5',
  },
  {
    desc: 'M10587 ablup39：戒备森严 ABL:37==4 档的 ×2.50 误改为 ×2.60（A/B/C 三列）',
    file: 'ere/system/train/ablup.js',
    find: `      } else if (gate === 4) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.5);`,
    replace: `      } else if (gate === 4) {
        a = times(a, 2.5);
        b = times(b, 2.5);
        c = times(c, 2.6);`,
    tests: ['ablup'],
    must_mention: 'ablup39：Lv3 戒备森严 ×2.5',
  },
  {
    desc: 'M10588 ablup39：戒备森严 ABL:37>=5 档的 ×3.00 误改为 ×3.10（A/B/C 三列）',
    file: 'ere/system/train/ablup.js',
    find: `      } else if (gate >= 5) {
        a = times(a, 3.0);
        b = times(b, 3.0);
        c = times(c, 3.0);`,
    replace: `      } else if (gate >= 5) {
        a = times(a, 3.1);
        b = times(b, 3.0);
        c = times(c, 3.0);`,
    tests: ['ablup'],
    must_mention: 'ablup39：Lv3 戒备森严 ×3',
  },
  // —— #512 第一步：ABLUP37/39/40 的素质表与门槛补覆盖（M10920-M10932）——
  // 新增用例在 test/ablup.test.js 的三处：「ablup37：F 的素质增减表逐条」、
  // 「ablup39：F 的豁免素质逐条」「ablup39：三重上限的拦法…」「ablup40：F 的
  // 豁免素质逐条」。find 都不含 `// :N`，与行号注释解耦。
  {
    desc: 'M10920 ablup37：F 表的[接受快感]减免改错（-1 → -2）',
    file: 'ere/system/train/ablup.js',
    find: '      if (talent(70)) f -= 1; // 接受快感',
    replace: '      if (talent(70)) f -= 2; // 接受快感',
    tests: ['ablup'],
    must_mention: 'F 的素质增减表逐条',
  },
  {
    desc: 'M10921 ablup37：F 表的[容易陷落]减免改错（-1 → -2）',
    file: 'ere/system/train/ablup.js',
    find: '      if (talent(73)) f -= 1; // 容易陷落',
    replace: '      if (talent(73)) f -= 2; // 容易陷落',
    tests: ['ablup'],
    must_mention: 'F 的素质增减表逐条',
  },
  {
    desc: 'M10922 ablup37：F 表的[否定快感]加成改错（+1 → +2）',
    file: 'ere/system/train/ablup.js',
    find: '      if (talent(71)) f += 1; // 否定快感',
    replace: '      if (talent(71)) f += 2; // 否定快感',
    tests: ['ablup'],
    must_mention: 'F 的素质增减表逐条',
  },
  {
    desc: 'M10923 ablup37：F 表的[倾城]减免改错（-2 → -1）',
    file: 'ere/system/train/ablup.js',
    find: '      if (talent(181)) f -= 2; // 倾城',
    replace: '      if (talent(181)) f -= 1; // 倾城',
    tests: ['ablup'],
    must_mention: 'F 的素质增减表逐条',
  },
  {
    desc: 'M10924 ablup37：F 表的[求爱]加成改错（+2 → +1）',
    file: 'ere/system/train/ablup.js',
    find: '      if (talent(184)) f += 2; // 求爱',
    replace: '      if (talent(184)) f += 1; // 求爱',
    tests: ['ablup'],
    must_mention: 'F 的素质增减表逐条',
  },
  {
    desc: 'M10925 ablup37：F 表的[倒錯的]减免改错（-1 → -2）',
    file: 'ere/system/train/ablup.js',
    find: '      if (talent(80)) f -= 1; // 倒錯的',
    replace: '      if (talent(80)) f -= 2; // 倒錯的',
    tests: ['ablup'],
    must_mention: 'F 的素质增减表逐条',
  },
  {
    desc: 'M10926 ablup37：F 整块豁免的[疯狂]判反（=== 0 → === 1）',
    file: 'ere/system/train/ablup.js',
    find: 'if (lv >= 2 && talent(123) === 0 && talent(9) === 0) {',
    replace: 'if (lv >= 2 && talent(123) === 1 && talent(9) === 0) {',
    tests: ['ablup'],
    must_mention: 'F 的素质增减表逐条',
  },
  {
    desc: 'M10927 ablup39：F 豁免的[牝犬]素质号读错（136 → 137）',
    file: 'ere/system/train/ablup.js',
    find: 'if (lv >= 2 && talent(72) === 0 && talent(76) === 0 && talent(136) === 0) {',
    replace:
      'if (lv >= 2 && talent(72) === 0 && talent(76) === 0 && talent(137) === 0) {',
    tests: ['ablup'],
    must_mention: 'F 整块豁免，不该渲染异常经验行',
  },
  {
    desc: 'M10928 ablup39：F 豁免的[容易上瘾]素质号读错（72 → 73）',
    file: 'ere/system/train/ablup.js',
    find: 'if (lv >= 2 && talent(72) === 0 && talent(76) === 0 && talent(136) === 0) {',
    replace:
      'if (lv >= 2 && talent(73) === 0 && talent(76) === 0 && talent(136) === 0) {',
    tests: ['ablup'],
    must_mention: 'F 整块豁免，不该渲染异常经验行',
  },
  {
    desc: 'M10929 ablup39：F 豁免的[淫乱]素质号读错（76 → 77）',
    file: 'ere/system/train/ablup.js',
    find: 'if (lv >= 2 && talent(72) === 0 && talent(76) === 0 && talent(136) === 0) {',
    replace:
      'if (lv >= 2 && talent(72) === 0 && talent(77) === 0 && talent(136) === 0) {',
    tests: ['ablup'],
    must_mention: 'F 整块豁免，不该渲染异常经验行',
  },
  {
    desc: 'M10930 ablup39：三重上限的拦法由「两珠任一不足即拦」改成「都缺才拦」（|| → &&）',
    file: 'ere/system/train/ablup.js',
    find: `    if (
      (era.get(\`juel:\${cid}:5\`) || 0) < bulk ||
      (era.get(\`juel:\${cid}:6\`) || 0) < bulk
    ) {`,
    replace: `    if (
      (era.get(\`juel:\${cid}:5\`) || 0) < bulk &&
      (era.get(\`juel:\${cid}:6\`) || 0) < bulk
    ) {`,
    tests: ['ablup'],
    must_mention: '任一不足即拦',
  },
  {
    desc: 'M10931 ablup40：F 豁免的[淫乱]素质号读错（76 → 77）',
    file: 'ere/system/train/ablup.js',
    find: 'if (lv >= 2 && talent(72) === 0 && talent(76) === 0) {\n      f = lv + 1;\n    }',
    replace:
      'if (lv >= 2 && talent(72) === 0 && talent(77) === 0) {\n      f = lv + 1;\n    }',
    tests: ['ablup'],
    must_mention: 'F 整块豁免，不该渲染异常经验行',
  },
  {
    desc: 'M10932 ablup40：F 豁免的[容易上瘾]素质号读错（72 → 73）',
    file: 'ere/system/train/ablup.js',
    find: 'if (lv >= 2 && talent(72) === 0 && talent(76) === 0) {\n      f = lv + 1;\n    }',
    replace:
      'if (lv >= 2 && talent(73) === 0 && talent(76) === 0) {\n      f = lv + 1;\n    }',
    tests: ['ablup'],
    must_mention: 'F 整块豁免，不该渲染异常经验行',
  },
];
