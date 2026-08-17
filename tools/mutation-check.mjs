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
    desc: 'M1 循环顺序：COM_ABLE 扫描挪到 SHOW_STATUS 之前',
    file: 'ere/system/train/train-loop.js',
    find: `    // 5. 遍历 @COM_ABLExx：可执行指令表。本票零指令且按钮渲染欠账——
    // 结果只喂输入检查（步骤 9），菜单可见项见 @SHOW_USERCOM
    const usable = await scan_usable_commands();

    // 6. @SHOW_USERCOM（函数体在 page/page-usercom.js，含 [999] 调教结束）
    const usercom_draw = await emit('SHOW_USERCOM');`,
    replace: `    // 6. @SHOW_USERCOM（函数体在 page/page-usercom.js，含 [999] 调教结束）
    const usercom_draw = await emit('SHOW_USERCOM');

    // 5. 遍历 @COM_ABLExx：可执行指令表。本票零指令且按钮渲染欠账——
    // 结果只喂输入检查（步骤 9），菜单可见项见 @SHOW_USERCOM
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
