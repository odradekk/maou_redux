// 变异测试驱动器（issue #44 验收自证）
// 用法：node tools/mutation-check.mjs
// 每条变异 = { file, find, replace, desc, tests（应失败的测试文件，不含 .test.js）, expect_only }
//   find 必须在文件中恰好出现一次；替换后运行 tests，期望 exit code != 0（有红）
//   expect_only（可选）：在输出中必须能找到的失败用例名片段，证明红的正是被测行为
// 流程：备份 → 改坏 → 跑 → 断言红 → 还原。任一环节失败即整体退出码 1。

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const REPO = new URL('..', import.meta.url).pathname.replace(
  /^\/([A-Za-z]:)/,
  '$1',
);

const MUTATIONS = [
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
    expect_only: '回调顺序',
  },
  {
    desc: 'M2 COM_ABLE 默认值：未定义改为不可执行（whenMissing 1 → 0）',
    file: 'ere/system/train/train-loop.js',
    find: 'const able = await com_able_family.call(id, { whenMissing: 1 });',
    replace: 'const able = await com_able_family.call(id, { whenMissing: 0 });',
    tests: ['train-loop'],
    expect_only: '未定义即视为可执行',
  },
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
    expect_only: '端到端',
  },
  {
    desc: 'M4 EVENTCOMEND 目标死亡分支：FLAG:35 判据取反',
    file: 'ere/event/event-comend.js',
    find: '  if (stamina <= 0 && auto_end_flag === 0) {',
    replace: '  if (stamina <= 0 && auto_end_flag !== 0) {',
    tests: ['event-comend'],
    expect_only: '死亡消息',
  },
  {
    desc: 'M5 EVENTCOMEND 助手衰弱分支：凭空加 FLAG:35 守卫（原作无）',
    file: 'ere/event/event-comend.js',
    find: `  } else if (stamina < 500) {
    // :302-307 衰弱（无 FLAG:35 守卫——开关只管目标侧）`,
    replace: `  } else if (stamina < 500 && era.get('flag:35')) {
    // 变异：加了原作没有的 FLAG:35 守卫`,
    tests: ['event-comend'],
    expect_only: '分支 4',
  },
  {
    desc: 'M6 EVENTTRAIN 全量：删掉一笔直线赋值（BASE:MASTER:4 = 0）',
    file: 'ere/event/event-train.js',
    find: `    // :22 BASE:MASTER:4 = 0（触手射精槽）
    era.set('base:0:4', 0);`,
    replace: `    // :22 BASE:MASTER:4 = 0（触手射精槽）——变异：删除`,
    tests: ['event-train'],
    expect_only: '全量断言',
  },
  {
    desc: 'M7 EVENTTRAIN/PRITRAIN 暂存：SIF ASSI 的非零判定改成大于零',
    file: 'ere/event/event-train.js',
    find: `  era_flag.target_backup = target;
  if (era_flag.assi) {
    era_flag.assi_backup = era_flag.assi;`,
    replace: `  era_flag.target_backup = target;
  if (era_flag.assi > 0) {
    era_flag.assi_backup = era_flag.assi;`,
    tests: ['event-train'],
    expect_only: '全量断言',
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
    expect_only: '取消',
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
    expect_only: 'FLAG:1',
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
    expect_only: 'IS_TRAINABLE',
  },
  {
    desc: 'M11 PRINT_PALAM 条形：满刻度改用当前等级阈值（而非下一级）',
    file: 'ere/page/page-train.js',
    find: '    const next_threshold = PALAMLV[level + 1];',
    replace: '    const next_threshold = PALAMLV[level];',
    tests: ['page-train'],
    expect_only: '逐字一致',
  },
  {
    desc: 'M12 PRINT_PALAM 填充字符：等级爬坡表打乱',
    file: 'ere/page/page-train.js',
    find: "const PALAM_FILL_BY_LEVEL = ['-', '=', '>', '*'];",
    replace: "const PALAM_FILL_BY_LEVEL = ['-', '-', '-', '-'];",
    tests: ['page-train'],
    expect_only: '逐字一致',
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
    expect_only: '回调顺序',
  },
  {
    desc: 'M14 SELECTCOM 来源：输入检查不再设定 SELECTCOM（步骤 9）',
    file: 'ere/system/train/train-loop.js',
    find: `      // 9. 输入检查通过 → SELECTCOM = 输入
      era_flag.selectcom = result;`,
    replace: `      // 9. 变异：不设 SELECTCOM`,
    tests: ['train-loop'],
    expect_only: '回调顺序',
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
    expect_only: 'run_aftertrain',
  },
  {
    desc: 'M16 SELECT_TARGET 翻页：开窗判据边界错一格（下界改开区间）',
    file: 'ere/page/page-select-target.js',
    find: '    if (index >= no_page * num_page && index < (no_page + 1) * num_page) {',
    replace:
      '    if (index > no_page * num_page && index < (no_page + 1) * num_page) {',
    tests: ['page-select-target'],
    expect_only: '翻页',
  },
  {
    desc: 'M17 TURNEND 壳出口：BEGIN SHOP 改 BEGIN TITLE（回不到主菜单）',
    file: 'ere/event/event-turnend.js',
    find: '    begin(STATE.SHOP);',
    replace: '    begin(STATE.TITLE);',
    tests: ['train-loop'],
    expect_only: '端到端',
  },
  {
    desc: 'M18 100 分支守卫：育儿室判据取反（10 改 11，守卫永不成立）',
    file: 'ere/page/page-shop.js',
    find: "    if ((era.get('cflag:0:1') || 0) === 10) {",
    replace: "    if ((era.get('cflag:0:1') || 0) === 11) {",
    tests: ['page-shop'],
    expect_only: '育儿室',
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
    expect_only: '除名',
  },
  {
    desc: 'M20 EVENTEND 指针还原：尾部读错槽（target_record 改 master_backup）',
    file: 'ere/event/event-end.js',
    find: `    era_flag.assi = era_flag.assi_record;
    era_flag.target = era_flag.target_record;`,
    replace: `    era_flag.assi = era_flag.assi_record;
    era_flag.target = era_flag.master_backup;`,
    tests: ['event-end'],
    expect_only: '主体',
  },
  {
    desc: 'M21 珠梯子：PALAMLV:3*2 档丢失乘数（3000 档直接给 100）',
    file: 'ere/system/train/juel-check.js',
    find: '  [PALAMLV[3] * 2, 100],',
    replace: '  [PALAMLV[3], 100],',
    tests: ['juel-check'],
    expect_only: '26 个边界',
  },
  {
    desc: 'M22 绝顶加成：EX:0 的 ×1000 改 ×100',
    file: 'ere/system/train/juel-check.js',
    find: '      era.set(`gotjuel:${cid}:0`, gain + (era.get(`ex:${cid}:0`) || 0) * 1000);',
    replace:
      '      era.set(`gotjuel:${cid}:0`, gain + (era.get(`ex:${cid}:0`) || 0) * 100);',
    tests: ['juel-check'],
    expect_only: '结算表第 0 行',
  },
  {
    desc: 'M23 加算对象混入 3（润滑不是保有珠）',
    file: 'ere/system/train/juel-check.js',
    find: 'const OWNED_JUEL_KEYS = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 14, 15, 100];',
    replace:
      'const OWNED_JUEL_KEYS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 100];',
    tests: ['juel-check'],
    expect_only: '职责划分',
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
    expect_only: '职责划分',
  },
  {
    desc: 'M25 相殺取量：否定余量减半改三分之一',
    file: 'ere/system/train/juel-check.js',
    find: '    let take = Math.floor(negative() / 2); // LOCAL:1 = JUEL:100 / 2',
    replace:
      '    let take = Math.floor(negative() / 3); // LOCAL:1 = JUEL:100 / 2',
    tests: ['juel-check'],
    expect_only: '逐轮减半',
  },
  {
    desc: 'M26 相殺钳制：池子存量不足不再整池扣走',
    file: 'ere/system/train/juel-check.js',
    find: `    if (pool_value(pick) < take) {
      take = pool_value(pick); // :631-632 池子存量不足就整池扣走
    }`,
    replace: `    // 变异：不按池子存量钳制`,
    tests: ['juel-check'],
    expect_only: '池子存量不足',
  },
  {
    desc: 'M27 相殺兜底：余量取半为 0 时改扣 2（原作扣 1）',
    file: 'ere/system/train/juel-check.js',
    find: '      take = 1; // :629-630 否定未清零时至少扣 1',
    replace: '      take = 2; // :629-630 否定未清零时至少扣 1',
    tests: ['juel-check'],
    expect_only: '改扣 1',
  },
  {
    desc: 'M28 TFLAG 快照：槽位错一格（+51 改 +52）',
    file: 'ere/system/train/juel-check.js',
    find: '    era.set(`tflag:${count + 51}`, era.get(`juel:${cid}:${count + 4}`) || 0);',
    replace:
      '    era.set(`tflag:${count + 52}`, era.get(`juel:${cid}:${count + 4}`) || 0);',
    tests: ['juel-check'],
    expect_only: 'TFLAG 快照',
  },
  {
    desc: 'M29 TFLAG:58：否定快照读错槽（juel:100 改 juel:99）',
    file: 'ere/system/train/juel-check.js',
    find: "  era.set('tflag:58', era.get(`juel:${cid}:100`) || 0); // :624",
    replace: "  era.set('tflag:58', era.get(`juel:${cid}:99`) || 0); // :624",
    tests: ['juel-check'],
    expect_only: 'TFLAG 快照',
  },
  {
    desc: 'M30 相殺两组先后：LABEL_1/LABEL_2 对调',
    file: 'ere/system/train/juel-check.js',
    find: `  offset_negative_group(cid, [4, 5, 6], rng); // $LABEL_1 恭顺/欲情/屈服
  offset_negative_group(cid, [8, 9, 10], rng); // $LABEL_2 耻情/苦痛/恐怖`,
    replace: `  offset_negative_group(cid, [8, 9, 10], rng); // $LABEL_1 恭顺/欲情/屈服
  offset_negative_group(cid, [4, 5, 6], rng); // $LABEL_2 耻情/苦痛/恐怖`,
    tests: ['juel-check'],
    expect_only: '两组先后',
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
    expect_only: '选 999 退出',
  },
  {
    desc: 'M32 自动升级开关：GETBIT 位 35 改 34',
    file: 'ere/system/train/juel-check.js',
    find: "    if (getbit(era.get('flag:5'), 35)) {",
    replace: "    if (getbit(era.get('flag:5'), 34)) {",
    tests: ['juel-check'],
    expect_only: '自动升级',
  },
  {
    desc: 'M33 基础行格式：) 与 = 之间的 12 空格少 2 格',
    file: 'ere/system/train/juel-check.js',
    find: '      { content: \')            = \' }, // :687 PRINT ) + 12 空格 + "= "',
    replace:
      '      { content: \')          = \' }, // :687 PRINT ) + 12 空格 + "= "',
    tests: ['juel-check'],
    expect_only: '结算表第 0 行',
  },
  {
    desc: 'M34 FIGURE_INDENT：8 位右对齐改 7 位',
    file: 'ere/system/train/juel-check.js',
    find: 'const figure_indent = (n) => String(n).padStart(8);',
    replace: 'const figure_indent = (n) => String(n).padStart(7);',
    tests: ['juel-check'],
    expect_only: '结算表第 0 行',
  },
  {
    desc: 'M35 SHOW_JUEL 数值列：右对齐宽 6 改 5',
    file: 'ere/page/page-ablup.js',
    find: '    row += ` ${name}点数：${String(value).padStart(6)}`; // {JUEL,6,RIGHT}',
    replace:
      '    row += ` ${name}点数：${String(value).padStart(5)}`; // {JUEL,6,RIGHT}',
    tests: ['juel-check'],
    expect_only: 'SHOW_JUEL 三行',
  },
  {
    desc: 'M36 等级行公式：本级需求 lv*10+10 改 lv*10+5',
    file: 'ere/page/page-info-exp.js',
    find: `    // :1051-1053 其余
    need = lv * 10 + 10;`,
    replace: `    // :1051-1053 其余
    need = lv * 10 + 5;`,
    tests: ['juel-check'],
    expect_only: 'SHOW_INFO_EXP 的经验行',
  },
  {
    desc: 'M37 否定汇入：GOTJUEL:100 的累加改覆盖（反感/不快/抑郁只剩其一）',
    file: 'ere/system/train/juel-check.js',
    find: '      era.add(`gotjuel:${cid}:100`, gain);',
    replace: '      era.set(`gotjuel:${cid}:100`, gain);',
    tests: ['juel-check'],
    expect_only: '结算表第 11 行',
  },
  {
    desc: 'M38 能力分支：命中表判假（@ABLUPxx 占位不再出现）',
    file: 'ere/system/train/juel-check.js',
    find: '    if (ABLUP_IDS.includes(result)) {',
    replace: '    if (false && ABLUP_IDS.includes(result)) {',
    tests: ['juel-check'],
    expect_only: '能力分支',
  },
  // —— #45（指令 0 爱抚 + @SOURCE_CHECK）——
  {
    desc: 'M39 COM_ABLE0 爱抚系过滤：FLAG:25 & 1 判据删掉',
    file: 'ere/system/train/com0-caress.js',
    find: `  if ((era.get('flag:25') || 0) & 1) {
    return 0;
  }`,
    replace: '  // 变异：过滤判据删除',
    tests: ['com0-caress'],
    expect_only: 'COM_ABLE0',
  },
  {
    desc: 'M40 COM_ABLE0 决斗中判据删掉（TEQUIP:55）',
    file: 'ere/system/train/com0-caress.js',
    find: '  if (era.get(`tequip:${era_flag.target}:55`)) {\n    return 0;\n  }',
    replace: '  // 变异：决斗判据删除',
    tests: ['com0-caress'],
    expect_only: 'COM_ABLE0',
  },
  {
    desc: 'M41 ABL:0 分档表错一格（1200 改 1201）',
    file: 'ere/system/train/com0-caress.js',
    find: '  [1200, 100],',
    replace: '  [1201, 100],',
    tests: ['com0-caress'],
    expect_only: '= 3 档',
  },
  {
    desc: 'M42 ABL:1 分档表错一格（300 改 301）',
    file: 'ere/system/train/com0-caress.js',
    find: '  [300, 80],',
    replace: '  [301, 80],',
    tests: ['com0-caress'],
    expect_only: '= 2 档',
  },
  {
    desc: 'M43 初吻回避判据取反（CFLAG:16 === -1 改 !== -1）',
    file: 'ere/system/train/com0-caress.js',
    find: '  if ((era.get(`cflag:${target}:16`) || 0) === -1) {',
    replace: '  if ((era.get(`cflag:${target}:16`) || 0) !== -1) {',
    tests: ['com0-caress'],
    expect_only: '初吻未体验',
  },
  {
    desc: 'M44 爱慕的加倍删掉（SOURCE:3 × 2）',
    file: 'ere/system/train/com0-caress.js',
    find: '      set_src(3, src(3) * 2);',
    replace: '      // 变异：加倍删除',
    tests: ['com0-caress'],
    expect_only: '爱慕',
  },
  {
    desc: 'M45 百合经验的性别判定短路',
    file: 'ere/system/train/com0-caress.js',
    find: '  if (!target_male && !player_male) {',
    replace: '  if (false) {',
    tests: ['com0-caress'],
    expect_only: '百合经验',
  },
  {
    desc: 'M46 调教者技巧阶梯废掉（恒 ×1.0）',
    file: 'ere/event/source-check.js',
    find: '  const rate = pabl(12) >= 5 ? rates[5] : rates[pabl(12)];',
    replace: '  const rate = 1.0;',
    tests: ['source-check'],
    expect_only: '技巧',
  },
  {
    desc: 'M47 欲情系数的边界改为含下界（< 改 <=）',
    file: 'ere/event/source-check.js',
    find: '    if (p5 < PALAMLV[table[i][0]]) {',
    replace: '    if (p5 <= PALAMLV[table[i][0]]) {',
    tests: ['source-check'],
    expect_only: '欲情系数',
  },
  {
    desc: 'M48 ABL>5 的放大算式错一格（+5 改 +4）',
    file: 'ere/event/source-check.js',
    find: '  local0 = idiv(local0 * (abl(0) + 5), 10);',
    replace: '  local0 = idiv(local0 * (abl(0) + 4), 10);',
    tests: ['source-check'],
    expect_only: '技巧 0 档',
  },
  {
    desc: 'M49 绝顶阈值错档（PALAMLV[4] 改 PALAMLV[3]）',
    file: 'ere/event/source-check.js',
    find: '  const LV4 = PALAMLV[4]; // 10000',
    replace: '  const LV4 = PALAMLV[3]; // 变异：阈值错档',
    tests: ['source-check'],
    expect_only: '阴蒂绝顶',
  },
  {
    desc: 'M50 NOWEX 只写不并被破坏（直接并进 EX → 与引擎双重累加）',
    file: 'ere/event/source-check.js',
    find: '  era.set(`nowex:${cid}:0`, ex_c);',
    replace: '  era.add(`ex:${cid}:0`, ex_c);',
    tests: ['source-check'],
    expect_only: 'NOWEX',
  },
  {
    desc: 'M51 体力气力扣减的去零钳制删掉',
    file: 'ere/event/source-check.js',
    find: '        next = Math.max(Math.min(next, max), 0);',
    replace: '        next = next;',
    tests: ['source-check'],
    expect_only: '气力耗尽',
  },
  {
    desc: 'M52 TFLAG:59 读了新 PREVCOM（应为旧值）',
    file: 'ere/event/source-check.js',
    find: "  era.set('tflag:59', era_flag.prevcom);",
    replace: "  era.set('tflag:59', era_flag.selectcom);",
    tests: ['source-check'],
    expect_only: '黄金样本',
  },
  {
    desc: 'M53 参数行的缺段空格错一（DOWN 缺段 7 改 8）',
    file: 'ere/event/source-check.js',
    find: "          (d > 0 ? `-${figure_indent_2(d)}${d}` : ' '.repeat(7)) +",
    replace:
      "          (d > 0 ? `-${figure_indent_2(d)}${d}` : ' '.repeat(8)) +",
    tests: ['source-check'],
    expect_only: '黄金样本',
  },
  {
    desc: 'M54 PRINTW 点线错一（39 改 38）',
    file: 'ere/event/source-check.js',
    find: "  era.print('‥'.repeat(39));",
    replace: "  era.print('‥'.repeat(38));",
    tests: ['source-check'],
    expect_only: '黄金样本',
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
    expect_only: '端到端',
  },
  {
    desc: 'M56 指令按钮渲染删掉（回到 [999] 单按钮）',
    file: 'ere/page/page-usercom.js',
    find: "    era.printButton(`${era.get(`traincommandname:${id}`) ?? ''}`, id);",
    replace: '    // 变异：按钮渲染删除',
    tests: ['source-check'],
    expect_only: '端到端',
  },
  // —— #46（口上切片：K3 高貴 + K5 マオ，验证决议 #8）——
  {
    desc: 'M57 口上总开关守卫删松（<= 0 改 < 0，flag:7 = 0 不再拦）',
    file: 'ere/kojo/kojo-system.js',
    find: "  if ((era.get('flag:7') || 0) <= 0) {",
    replace: "  if ((era.get('flag:7') || 0) < 0) {",
    tests: ['kojo-system'],
    expect_only: '完全不输出',
  },
  {
    desc: 'M58 口上存在判定删除（FLAG:LOCAL == 0 改恒 false）',
    file: 'ere/kojo/kojo-system.js',
    find: '  if ((era.get(`flag:${local}`) || 0) === 0) {',
    replace: '  if (false) { // 变异：存在判定删除',
    tests: ['kojo-system'],
    expect_only: '存在判定',
  },
  {
    desc: 'M59 分发接线：TRYCALLFORM 拼名偏移（local - 100 改 - 101）',
    file: 'ere/kojo/kojo-system.js',
    find: '    await kojo_message_com_family.call(local - 100, {',
    replace: '    await kojo_message_com_family.call(local - 101, {',
    tests: ['kojo-system'],
    expect_only: '空间内缺失',
  },
  {
    desc: 'M60 K5 首次状态推进写错（CFLAG:301 = 1 改 2）',
    file: 'ere/kojo/kojo-k5.js',
    find: '      set_cflag301(1); // :813',
    replace: '      set_cflag301(2); // :813（变异）',
    tests: ['kojo-k5', 'kojo-system'],
    expect_only: '推进到 1',
  },
  {
    desc: 'M61 K3 首次状态推进写错（CFLAG:301 = 1 改 2）',
    file: 'ere/kojo/kojo-k3.js',
    find: '      set_cflag301(1); // :930',
    replace: '      set_cflag301(2); // :930（变异）',
    tests: ['kojo-k3'],
    expect_only: '推进到 1',
  },
  {
    desc: 'M62 K5 首次刻印分档边界（MARK:2 >= 2 改 >= 3）',
    file: 'ere/kojo/kojo-k5.js',
    find: '      if (mark(2) >= 2) {',
    replace: '      if (mark(2) >= 3) {',
    tests: ['kojo-k5'],
    expect_only: '只出一句',
  },
  {
    desc: 'M63 K5 淫乱素质判据错格（TALENT:76 改 77）',
    file: 'ere/kojo/kojo-k5.js',
    find: '      era.get(`talent:${target}:76`) === 1 &&',
    replace: '      era.get(`talent:${target}:77`) === 1 &&',
    tests: ['kojo-k5'],
    expect_only: '淫乱分支',
  },
  {
    desc: 'M64 K3 爱慕素质判据错格（TALENT:85 改 86）',
    file: 'ere/kojo/kojo-k3.js',
    find: '      era.get(`talent:${target}:85`) === 1 &&',
    replace: '      era.get(`talent:${target}:86`) === 1 &&',
    tests: ['kojo-k3'],
    expect_only: '爱慕分支',
  },
  {
    desc: 'M65 K5 淫乱门槛的 FLAG:7 == 2 旁路失效（改 === 3）',
    file: 'ere/kojo/kojo-k5.js',
    find: '      (cflag301() <= 5 || flag7() === 2)',
    replace: '      (cflag301() <= 5 || flag7() === 3)',
    tests: ['kojo-k5'],
    expect_only: '阈值闸',
  },
  {
    desc: 'M66 K3 黄金分支条件（RAND:2 == 0 改 == 1）',
    file: 'ere/kojo/kojo-k3.js',
    find: '        } else if (rand_n(2) === 0) {\n          await era.printAndWait(\n            `「哈呜、${target_name}、可是，一心地，想要杀了…嗯、为什么、那么地……啊~、这么…温柔地…啊、啊啊……」`,',
    replace:
      '        } else if (rand_n(2) === 1) {\n          await era.printAndWait(\n            `「哈呜、${target_name}、可是，一心地，想要杀了…嗯、为什么、那么地……啊~、这么…温柔地…啊、啊啊……」`,',
    tests: ['kojo-k3'],
    expect_only: '黄金样本',
  },
  {
    desc: 'M67 K3 黄金文本逐字（「想要杀了」改「想杀了」）',
    file: 'ere/kojo/kojo-k3.js',
    find: '一心地，想要杀了',
    replace: '一心地，想杀了',
    tests: ['kojo-k3'],
    expect_only: '黄金样本',
  },
  {
    desc: 'M68 K3 淫乱阶段推进写错（CFLAG:301 = 600 改 500）',
    file: 'ere/kojo/kojo-k3.js',
    find: '      set_cflag301(600); // :953',
    replace: '      set_cflag301(500); // :953（变异）',
    tests: ['kojo-k3'],
    expect_only: '淫乱分支',
  },
  {
    desc: 'M69 @EVENTSHOP #PRI 总开关默认值（FLAG:7 = 2 改 1）',
    file: 'ere/kojo/kojo-system.js',
    find: "      era.set('flag:7', 2);",
    replace: "      era.set('flag:7', 1);",
    tests: ['kojo-system'],
    expect_only: '@EVENTSHOP',
  },
  {
    desc: 'M70 K5 @EVENTEND #LATER 清标志删除',
    file: 'ere/kojo/kojo-k5.js',
    find: "    era.set('flag:105', 0); // :88",
    replace: '    // 变异：清标志删除',
    tests: ['kojo-system'],
    expect_only: '清 0',
  },
  {
    desc: 'M71 K3 失神守卫删除（TFLAG:899 改恒 false）',
    file: 'ere/kojo/kojo-k3.js',
    find: "  if (era.get('tflag:899') || 0) {",
    replace: '  if (false) { // 变异：失神守卫删除',
    tests: ['kojo-k3'],
    expect_only: '静默跳过',
  },
  {
    desc: 'M72 心形插值丢失（%UNICODE(0x2661)% 映射成空串）',
    file: 'ere/kojo/kojo-text.js',
    find: "  return '♡'.repeat(n);",
    replace: "  return '';",
    tests: ['kojo-k3', 'kojo-k5'],
    expect_only: '♡',
  },
  {
    desc: 'M73 自称插值回落错字（「我」改「本人」）',
    file: 'ere/kojo/kojo-text.js',
    find: "  return era.get(`cstr:${cid}:60`) || '我';",
    replace: "  return era.get(`cstr:${cid}:60`) || '本人';",
    tests: ['kojo-k3'],
    expect_only: '自称',
  },
  // —— #46 验收整改（三处假绿的覆盖缺口：行为用例 + kojo-text-fidelity 锁）——
  {
    desc: 'M74 K3 3xx 支的附加条件删除（MARK:1 == 3 臂拿掉）',
    file: 'ere/kojo/kojo-k3.js',
    find: `      // :1021-1050 屈服刻印Lv2＆快乐刻印Lv3（百位 3xx 阶段）
      mark(2) === 2 &&
      mark(1) === 3 &&
      (cflag301() <= 299 || flag7() === 2)`,
    replace: `      // :1021-1050 屈服刻印Lv2＆快乐刻印Lv3（百位 3xx 阶段）
      mark(2) === 2 &&
      (cflag301() <= 299 || flag7() === 2)`,
    tests: ['kojo-k3'],
    expect_only: 'MARK:1 == 3',
  },
  {
    desc: 'M75 K3 的 PRINTFORML 映射错变体（:944 print 改 printAndWait）',
    file: 'ere/kojo/kojo-k3.js',
    find: `        era.print(
          \`\${player_name}开始爱抚后、\${target_name}立马将双脚大幅度地张开了、如同为了让股间突出来一样挺起了腰。\`,
        ); // :944 PRINTFORML`,
    replace: `        await era.printAndWait(
          \`\${player_name}开始爱抚后、\${target_name}立马将双脚大幅度地张开了、如同为了让股间突出来一样挺起了腰。\`,
        ); // :944 PRINTFORML`,
    tests: ['kojo-text-fidelity'],
    expect_only: 'W/L',
  },
  {
    desc: 'M76 K3 插值填错孔（:1076 player 与 target 互换）',
    file: 'ere/kojo/kojo-k3.js',
    find: '`${player_name}轻轻地抚摸了一下${target_name}紧紧闭着的眼皮子旁边后、${target_name}的身体颤抖起来，惊叫了一下。`,',
    replace:
      '`${target_name}轻轻地抚摸了一下${player_name}紧紧闭着的眼皮子旁边后、${target_name}的身体颤抖起来，惊叫了一下。`,',
    tests: ['kojo-text-fidelity', 'kojo-k3'],
    expect_only: '槽位序',
  },
  // —— #60 T20 语言统一：归一表与两道锁的自证 ——
  {
    desc: 'M77 归一表删一个实测字种（著→着）',
    file: 'tools/lang-table.js',
    find: "  著: '着',",
    replace: '  // 变异：著→着 删除',
    tests: ['lang-normalize', 'kojo-text-fidelity'],
    expect_only: '缺映射',
  },
  {
    desc: 'M78 K5 台词改回繁体（简体锁 + 锁 D 反向 + 行为断言三处红）',
    file: 'ere/kojo/kojo-k5.js',
    find: "        await era.printAndWait('「你这个变态…别、别碰我！」'); // :810",
    replace:
      "        await era.printAndWait('「你這個變態…別、別碰我！」'); // :810",
    tests: ['output-lang-lock', 'kojo-text-fidelity', 'kojo-k5'],
    expect_only: '非简体',
  },
  {
    desc: 'M79 豁免名单删華胥の亡靈条（简体锁必须点名致谢行）',
    file: 'tools/lang-table.js',
    find: `  {
    value:
      '大众性格：谦悟、文文、匿名神人、干掉人龙、歪闷林、華胥の亡靈、Delicious',
    where: 'ere/page/page-title.js',
    why: '口上组致谢名单整行。華胥の亡靈 是贡献者 ID（含日文の与繁体華/靈），其余名字同理不译——对人名/ID 做字符归一会改名。豁免到「字符串整体」，这行被改写时失配变红，改者须有意识地同步本表。',
  },`,
    replace: '  // 变异：豁免条目删除',
    tests: ['output-lang-lock'],
    expect_only: '華胥の亡靈',
  },
  {
    desc: 'M80 K5 抄错字（归一后锁 D 仍抓：正向片段找不到）',
    file: 'ere/kojo/kojo-k5.js',
    find: "        await era.printAndWait('「咕…呜呜…啊！」'); // :807",
    replace: "        await era.printAndWait('「咕…呜呜…啊呀！」'); // :807",
    tests: ['kojo-text-fidelity'],
    expect_only: '未见于 JS',
  },
  {
    desc: 'M81 K5 句中空格丢失（归一后锁 D 仍抓：片段含前导空格）',
    file: 'ere/kojo/kojo-k5.js',
    find: '`「主人、再多摸摸我嘛${heart(1)} 舒服的我都要叫出来了啦${heart(1)}」`',
    replace:
      '`「主人、再多摸摸我嘛${heart(1)}舒服的我都要叫出来了啦${heart(1)}」`',
    tests: ['kojo-text-fidelity'],
    expect_only: '未见于 JS',
  },
  {
    desc: 'M82 词级译法删奴隷→奴隶（转换用例必须红）',
    file: 'tools/lang-table.js',
    find: "  { source: '奴隷', target: '奴隶' },",
    replace: '  // 变异：奴隷 词删除',
    tests: ['lang-normalize'],
    expect_only: '奴隷',
  },
  {
    desc: 'M83 生成器去归一（csv-to-yml 不再自应用归一表——验收实测的退回路径）',
    file: 'tools/csv-to-yml.js',
    find: `function emit_product_lines(lines) {
  return to_simplified_yaml(\`\${lines.join('\\n')}\\n\`);
}`,
    replace: `function emit_product_lines(lines) {
  // 变异：生成期归一删除——产物与库内（已归一）不再一致
  return \`\${lines.join('\\n')}\\n\`;
}`,
    tests: ['csv-to-yml'],
    expect_only: '逐字节一致',
  },
  // —— #48 T18 输出对拍：录制器 / 归一化器 / 差异引擎 / 回放的自证 ——
  {
    desc: 'M84 夹具 printButton 不记 accelerator（菜单对拍失去编号键）',
    file: 'test/helpers/era-fixture.js',
    find: `    return push_line({
      type: 'button',
      text,
      accelerator,`,
    replace: `    return push_line({
      type: 'button',
      text,
      accelerator: undefined, // 变异：不记编号`,
    tests: ['compare-first-turn', 'page-usercom'],
    expect_only: '分类计数与当前欠账清单一致',
  },
  {
    desc: 'M85 归一化器样本侧去归一（黄金样本不再过 #60 归一表）',
    file: 'tools/compare/normalize.js',
    find: '.map((l) => to_simplified(l));',
    replace: '.map((l) => l); // 变异：样本侧去归一',
    tests: ['compare-normalize'],
    expect_only: '繁/日键名',
  },
  {
    desc: 'M86 归一化器菜单编号解析坏（Number → -1）',
    file: 'tools/compare/normalize.js',
    find: "cells.push({ kind: 'menu', key: name, val: Number(inner.trim()) });",
    replace:
      "cells.push({ kind: 'menu', key: name, val: -1 }); // 变异：编号解析坏",
    tests: ['compare-normalize'],
    expect_only: 'menu 条目',
  },
  {
    desc: 'M87 差异引擎 calc 键忽略全部数值（植入算式缺陷抓不到——检验3b 的靶心）',
    file: 'tools/compare/diff.js',
    find: 'return `calc:${entry.key}|${entry.from}|+${entry.add}|-${entry.sub}|=${entry.to}|${entry.phrase}`;',
    replace: 'return `calc:${entry.key}|${entry.phrase}`; // 变异：数值不进键',
    tests: ['compare-diff'],
    expect_only: '加数漂移',
  },
  {
    desc: 'M88 差异引擎 menu 键回退常数（同编号异名被吞——真缺陷出口焊死）',
    file: 'tools/compare/diff.js',
    find: '      return `menu:${entry.key}|${entry.val}`;',
    replace: "      return 'menu:?'; // 变异：标签与编号不进键",
    tests: ['compare-diff', 'compare-first-turn'],
    expect_only: '真缺陷出口',
  },
  {
    desc: 'M89 归因规则删 体力 条键（golden 基础条变未解释差异）',
    file: 'tools/compare/rules.js',
    find: "const STUB_GAUGE_KEYS = new Set(['体力', '气力', '射精（你）']);",
    replace:
      "const STUB_GAUGE_KEYS = new Set(['气力', '射精（你）']); // 变异：体力 删",
    tests: ['compare-first-turn'],
    expect_only: '分类计数与当前欠账清单一致',
  },
  {
    desc: 'M90 回放播种改错（阴核初值 5240 → 5200——变量层断言的靶心）',
    file: 'tools/compare/replay.js',
    find: '[0, 5240], // 阴核 5240+300=5540（log:34）',
    replace: '[0, 5200], // 变异：播种值错（log:34）',
    tests: ['compare-first-turn'],
    expect_only: '日志算式断言',
  },
  {
    desc: 'M91 回放随机源取错支（RAND_FIX 落到别的台词——确定性回放的靶心）',
    file: 'tools/compare/replay.js',
    find: 'const RAND_FIX = 0.4;',
    replace: 'const RAND_FIX = 0.9; // 变异：错支',
    tests: ['compare-first-turn'],
    expect_only: '逐条文本',
  },
  {
    desc: 'M92 回放输入标记不落 lines（窗口两侧不再同构）',
    file: 'tools/compare/replay.js',
    find: "    fixture.lines.push({ type: 'input', text: String(value) });",
    replace: '    // 变异：输入标记不落 lines',
    tests: ['compare-first-turn'],
    expect_only: '对拍窗口不完整',
  },
  {
    desc: 'M93 夹具 printMultiColumns 不再记录（print 系覆盖的缺口）',
    file: 'test/helpers/era-fixture.js',
    find: `  era.printMultiColumns = (columnObjects) => {
    (columnObjects ?? []).forEach(record_grid_object);
    return lines.length - 1;
  };`,
    replace: `  era.printMultiColumns = (columnObjects) => {
    // 变异：不记录
    return lines.length - 1;
  };`,
    tests: ['fixture'],
    expect_only: 'printMultiColumns',
  },
  // —— #63 T21 trace 完整性：ERB 侧第三道 + 豁免台账的自证 ——
  {
    desc: 'M94 ERB 完整性门焊死（未登记引用不再红——探针用例必须抓到失明）',
    file: 'tools/trace-check.mjs',
    find: '    if (!registered?.has(ref) && !exempt.includes(ref)) {',
    replace:
      '    if (false && !registered?.has(ref) && !exempt.includes(ref)) {',
    tests: ['trace-check'],
    expect_only: '完整性门对后来者失明',
  },
  {
    desc: 'M95 豁免清单偷偷变长（新条目必须撞基线锁）',
    file: 'tools/trace-exempt.mjs',
    find: "    '1076',",
    replace: "    '1076',\n    '999993',",
    tests: ['trace-check'],
    expect_only: '只能变短',
  },
  {
    desc: 'M96 锚校验：把 :53 的锚改错（FONTBOLD→FONTBOLDX，行号对但锚不命中）',
    file: 'tools/trace-check.mjs',
    find: "      { src: DRAW_MAINMENU, ref: '53', any: [/^FONTBOLD$/m] },",
    replace: "      { src: DRAW_MAINMENU, ref: '53', any: [/^FONTBOLDX$/m] },",
    tests: ['trace-check'],
    expect_only: '未命中任何锚',
  },
  {
    desc: 'M97 引用行号改坏（:53→:48 死代码行——在册校验 + 完整性双红）',
    file: 'ere/page/page-main-menu.js',
    find: "      fontWeight: 'bold', // :53 FONTBOLD（整行粗体，片段级携带）",
    replace:
      "      fontWeight: 'bold', // :48 FONTBOLD（整行粗体，片段级携带）",
    tests: ['trace-check'],
    expect_only: '已不存在',
  },
  {
    desc: 'M98 豁免条目发霉（main-loop 的 :231 改号——台账对账必须红）',
    file: 'ere/system/flow/main-loop.js',
    find: '  // 真身出口显式 begin(STATE.SHOP)（:231），此行只在未来的处理器们都不发',
    replace:
      '  // 真身出口显式 begin(STATE.SHOP)（:232），此行只在未来的处理器们都不发',
    tests: ['trace-check'],
    expect_only: '清单只能变短',
  },
];

function run_one(m, index) {
  const path = m.file.replace(/\//g, '\\');
  const full = `${REPO}${path}`;
  const original = fs.readFileSync(full, 'utf8');
  const count = original.split(m.find).length - 1;
  if (count !== 1) {
    console.log(`✗ ${m.desc}`);
    console.log(
      `  find 在文件中出现 ${count} 次（要求恰 1 次），跳过前先修正驱动器`,
    );
    return false;
  }
  fs.writeFileSync(full, original.replace(m.find, m.replace), 'utf8');
  let failed_as_expected = false;
  let saw_named_failure = false;
  let output = '';
  try {
    const files = m.tests.map((t) => `test/${t}.test.js`);
    const run = spawnSync(process.execPath, ['--test', ...files], {
      cwd: REPO,
      encoding: 'utf8',
      maxBuffer: 16 * 1024 * 1024,
    });
    output = `${run.stdout || ''}${run.stderr || ''}`;
    if (run.status !== 0) {
      failed_as_expected = true;
    }
  } catch (e) {
    output = `${e.stdout || ''}${e.stderr || ''}`;
    failed_as_expected = true;
  } finally {
    fs.writeFileSync(full, original, 'utf8');
  }
  if (m.expect_only) {
    saw_named_failure = output.includes(m.expect_only);
  } else {
    saw_named_failure = true;
  }
  const ok = failed_as_expected && saw_named_failure;
  console.log(
    `${ok ? '✓' : '✗'} ${m.desc} — 红=${failed_as_expected}${m.expect_only ? ` 点名「${m.expect_only}」=${saw_named_failure}` : ''}`,
  );
  return ok;
}

let all_ok = true;
MUTATIONS.forEach((m, i) => {
  if (!run_one(m, i)) all_ok = false;
});
console.log(
  all_ok ? '\n全部变异被测试拦截（无假绿）' : '\n存在未被拦截的变异（假绿）',
);
process.exit(all_ok ? 0 : 1);
