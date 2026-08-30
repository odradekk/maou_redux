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
    find: `  const source_pending = await emit('SOURCE_CHECK');
  if (source_pending !== undefined) {
    return { missing: false, pending: source_pending };
  }`,
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
    find: `  // 11. @EVENTCOM（函数体在 event/event-com.js）
  const com_pending = await emit('EVENTCOM');
  if (com_pending !== undefined) {
    return { missing: false, pending: com_pending };
  }
  // 12. 对应 @COMxx；未实现 → 重新要求输入（引擎语义，见文件头）
  const com_result = await com_family.call(result, {
    whenMissing: COM_MISSING,
  });`,
    replace: `  // 11. 变异：COM 分发先于 EVENTCOM
  const com_result = await com_family.call(result, {
    whenMissing: COM_MISSING,
  });
  const com_pending = await emit('EVENTCOM');
  if (com_pending !== undefined) {
    return { missing: false, pending: com_pending };
  }`,
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
];
