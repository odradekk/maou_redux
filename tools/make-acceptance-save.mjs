// 阶段验收用的造档脚本（#471 起用，#549 加 ending1 预设）。
//
// 抵达判定第 3 条要在真引擎里验到结局。从新档实打要上百个游戏日的交互，
// 于是改成两步：先在引擎里开新档、存一个槽（结构由引擎自己写），再用本脚本
// 只注入走结局所需的那几个 flag。**基础存档是引擎产出的，构造的只有所选
// 预设 PATCH 列出的键**——这一点必须写进验收记录，不能当成「从新档打通」。
//
//   node tools/make-acceptance-save.mjs <源槽位> <目标槽位> [campaign|ending1]
//   例：node tools/make-acceptance-save.mjs 1 2 ending1
//
// 预设：
//   - campaign（缺省，#471）：人间界已征服（FLAG:82 != 0），走主菜单侵略的
//     「向着世界之外」→ 战役。
//   - ending1（#549）：只把人间界侵攻度注满（FLAG:81 = 10000），FLAG:82 保持
//     0——下一次 [109] 侵略出兵的结算尾即触发 ENDING_1（page-invasion.js 的
//     invasion_check：FLAG:81 >= 10000 && FLAG:82 == 0）。不注资金：动钱会破坏
//     MONEY == EX_FLAG:4444 + 8766 的反作弊不变量，回合结算会炸宝库。
//
// 存档是明文 JSON（`system.saveCompressedData` 为假），顶层直接是各变量表。

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

/** 各预设注入的键与理由。改这张表时同步改对应工单的验收记录（#471/#549）。 */
const PRESET_PATCHES = {
  campaign: {
    // 人间界：侵攻度满 + 征服标记。FLAG:82 是 post_conquest_menu 的唯一闸门
    // （ere/era-utils/era-flag.js 的 human_realm_fallen）；原作 INVASION_EVENT.ERB:215
    // 的 `#DIM SINDO` 注释写「0 未完成 2 完成」，故取 2。
    'flag:81': 10000,
    'flag:82': 2,
    // 所持金（flag:10004 ↔ MONEY，见 era-flag.js 的 money 访问器）。犒赏奸商、
    // 增强流行效果一类要钱；给足以走完一局的量，不影响任何判定分支的走向。
    // 注意：这会破坏 @DEBUG_CHECK 的资金不变量，首个回合结算会触发宝库爆炸
    // 清零资金——#471 的验收路径（直接进战役）不经过回合结算，不受影响。
    'flag:10004': 500000,
  },
  ending1: {
    // 只注满人间界侵攻度：invasion_check 在下一次侵略出兵的结算尾触发
    // ENDING_1。FLAG:82 保持新档的 0（已注 2 会改走征服后菜单，触发不了）。
    // 侵攻度只在回合结算里自然衰减——验收流程里不要先「休息」过天。
    'flag:81': 10000,
  },
};
function usage_exit(msg) {
  process.stderr.write(
    `${msg}\n用法：node tools/make-acceptance-save.mjs <源槽位> <目标槽位> [campaign|ending1]\n`,
  );
  process.exit(2);
}

const [from_slot, to_slot, preset = 'campaign'] = process.argv.slice(2);
if (from_slot === undefined || to_slot === undefined) {
  usage_exit('缺少槽位参数。');
}
const PATCH = Object.hasOwn(PRESET_PATCHES, preset)
  ? PRESET_PATCHES[preset]
  : undefined;
if (PATCH === undefined) {
  usage_exit(`未知预设：${preset}（可用：campaign | ending1）`);
}

const sav_dir = path.join(process.cwd(), 'sav');
const src = path.join(sav_dir, `save${from_slot}.sav`);
const dst = path.join(sav_dir, `save${to_slot}.sav`);

if (!fs.existsSync(src)) {
  usage_exit(`源存档不存在：${src}\n先在引擎里开新档并存到槽位 ${from_slot}。`);
}

const save = JSON.parse(fs.readFileSync(src, 'utf8'));

// 逐键注入。表必须已存在——引擎只为已声明的表建容器，凭空造表会让读取端拿到
// 与真引擎不同的结构（AGENTS.md「写变量前先确认它所属的静态表已存在」）。
const applied = [];
for (const [addr, value] of Object.entries(PATCH)) {
  const [table, index] = addr.split(':');
  if (!Object.prototype.hasOwnProperty.call(save, table)) {
    usage_exit(`存档里没有 ${table} 表，无法注入 ${addr}。`);
  }
  const before = save[table][index];
  save[table][index] = value;
  applied.push(`${addr}: ${before} → ${value}`);
}

fs.writeFileSync(dst, JSON.stringify(save), 'utf8');

// global.sav 的 saves 决定槽位在读档列表里显示什么备注；没有备注的槽位引擎会
// 标成 UNNAMED SAVE FILE，仍可读取，但写清来历便于验收时辨认。
const global_path = path.join(sav_dir, 'global.sav');
if (fs.existsSync(global_path)) {
  const global_save = JSON.parse(fs.readFileSync(global_path, 'utf8'));
  global_save.saves = global_save.saves ?? {};
  const remark =
    preset === 'ending1'
      ? '#549 验收用：人间界侵攻度已满（ENDING_1 构造档）'
      : '#471 验收用：人间界已征服（构造档）';
  global_save.saves[to_slot] = remark;
  fs.writeFileSync(global_path, JSON.stringify(global_save), 'utf8');
}

process.stdout.write(
  `已写出 ${dst}\n注入：\n  ${applied.join('\n  ')}\n` +
    '基础结构来自引擎产出的源存档，仅上列键为构造值。\n',
);
