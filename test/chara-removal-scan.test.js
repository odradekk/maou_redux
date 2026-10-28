'use strict';

/**
 * @file 除名机械步骤的白名单扫描（issue #785 审计返工）。
 *
 * 「删一个角色并清队伍」只允许出现在白名单文件里：要么走
 * ere/system/chara-removal.js 的共同实现，要么是白名单登记在案、写明
 * 理由的独立路径。按调用点逐条配同型变异条目的旧办法只能守住已列名
 * 的链路，列名之外的漂移（审计发现的 event-turnend 的 erase_chara 即
 * 为实例）它天生看不见；本扫描对全库生效，新抄一份角色移除步骤会在
 * 这里红，维护者要么接入共同实现、要么在白名单写明理由。
 *
 * 指纹：
 *   - mark_hero_removed( 的调用形态——除名登记原语，语义唯一；
 *   - 同文件内 party_char_del( 与 era.removeCharacter( 共现——「既清
 *     队伍又删角色」的完整移除组合。单独的 party_char_del（离队清理、
 *     临时召唤物清理）与单独的 removeCharacter（加入、换人、复辟）有
 *     大量非移除用途，不构成指纹；「判等清空」语句也见于育儿入所、
 *     狂王战败等状态变更，同样不构成指纹。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const ERE_DIR = path.resolve(__dirname, '..', 'ere');

/**
 * 允许出现除名/移除原语的文件：相对 ere/ 的 POSIX 路径 → 理由。
 * 「待裁定」条目 = 现存的无登记变体，接入共同实现属行为变更（标记
 * 落位影响苏生名单），须单独开票裁定后处理。
 */
const WHITELIST = new Map([
  ['system/chara-removal.js', '共同实现本体'],
  [
    'system/train/train-end.js',
    '调教死亡的两段式收尾：登记在事件链内、删除必须等引擎收尾，指针是会话复位语义，不能并入同步的共同实现',
  ],
  [
    'page/page-chara-info-show.js',
    '献祭：缺按 ID 判等的引用清理是现存行为差异，接入即行为变更，待裁定（issue #785 不接入名单）',
  ],
  [
    'event/event-turnend.js',
    'erase_chara（宝库爆炸/暴走奴隶/陪葬近邻三条链）：缺除名登记、称呼重建未走统一入口，待裁定（issue #785 不接入名单）',
  ],
  [
    'system/ending/ending-family.js',
    '离队 op_leave：队伍移除收到错位实参、助手指针的写入是死写入，均为有意保留的移植行为；不登记除名标记，语义是离队而非完整除名',
  ],
  [
    'event/event-chara-leave.js',
    '离队流程的完整移除（issue #172）：无除名登记，与献祭同属待裁定的变体',
  ],
  [
    'page/page-ending.js',
    '结局的贡品退场三连（队伍→删除→称呼重建）：无登记无指针清理，待裁定',
  ],
  [
    'system/chara/chara-make.js',
    '初期奴隶「换一个」的撤销：加入流程的回退，删的是刚加入的角色，不是除名',
  ],
  [
    'system/invasion/invasion-arcana-fort.js',
    '狂王线战败的临时骑士移除：召唤物清理，不是除名',
  ],
  [
    'page/page-chara-shop.js',
    '奴隶商店换购的旧角色退场：无登记无指针清理，待裁定',
  ],
  [
    'page/page-monster-shop.js',
    '怪物商店购买流程的角色退场：无登记无指针清理，待裁定',
  ],
  ['page/page-invasion.js', '精锐部队（临时角色）的战果清理：不是除名'],
]);

// 定义行是 `function party_char_del(cid)`，正则用调用括号即可命中调用
// 形态；removeCharacter 同理（era.removeCharacter 调用带点号前缀）
const FINGERPRINTS = {
  除名登记: /mark_hero_removed\(/,
  完整移除组合: /party_char_del\(/,
};

function* iter_js_files(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* iter_js_files(full);
    else if (entry.name.endsWith('.js')) yield full;
  }
}

/** 文件是否命中某类指纹（真实扫描与自证共用一个判定） */
function hits_of(content) {
  const hits = [];
  if (FINGERPRINTS.除名登记.test(content)) hits.push('除名登记');
  if (
    FINGERPRINTS.完整移除组合.test(content) &&
    /era\.removeCharacter\(/.test(content)
  ) {
    hits.push('完整移除组合');
  }
  return hits;
}

test('自证：合成违规样本必须被指纹判定报出——锁对后来者不失明', () => {
  assert.deepEqual(hits_of('era_flag.mark_hero_removed(no);'), ['除名登记']);
  assert.deepEqual(hits_of('party_char_del(cid);\nera.removeCharacter(cid);'), [
    '完整移除组合',
  ]);
  // 单独的原语不是指纹：只清队伍、只删角色、判等清空语句各有大量
  // 非移除用途
  assert.deepEqual(hits_of('party_char_del(cid);'), []);
  assert.deepEqual(hits_of('era.removeCharacter(cid);'), []);
  assert.deepEqual(
    hits_of('era_flag.mark_hero_removed = function (t) {};'),
    [],
  );
});

test('除名/移除原语只允许出现在白名单文件里', () => {
  const violations = [];
  for (const file of iter_js_files(ERE_DIR)) {
    const rel = path.relative(ERE_DIR, file).split(path.sep).join('/');
    const found = hits_of(fs.readFileSync(file, 'utf8'));
    if (found.length > 0 && !WHITELIST.has(rel)) {
      violations.push(`${rel}: ${found.join(', ')}`);
    }
  }
  assert.deepEqual(
    violations,
    [],
    '白名单外出现除名/移除原语——新抄的角色移除要么接入 chara-removal' +
      ' 的共同实现，要么在 WHITELIST 登记并写明理由',
  );
});

test('白名单自身与现状一致：每个条目都真实出现，登记理由非空', () => {
  for (const [rel, reason] of WHITELIST) {
    const full = path.join(ERE_DIR, ...rel.split('/'));
    assert.equal(
      hits_of(fs.readFileSync(full, 'utf8')).length > 0,
      true,
      `${rel} 在白名单里但不含指纹——条目过期，删除它`,
    );
    assert.notEqual(reason.trim(), '', `${rel} 缺登记理由`);
  }
});
