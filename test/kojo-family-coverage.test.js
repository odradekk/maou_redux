/**
 * @file 口上分发族的「原作有、ere 有」双向核对（#565 返工第 4 条）。
 *
 * 背景：`try_kojo_or_stub` 未命中时**静默**（原作 TRYCALLFORM 落空语义），
 * 不再打占位——「原作有对应函数而 ere 没移植」的真缺口从此没有运行时
 * 提示，必须靠静态核对拦住。本文件扫 `target/ERB/口上` 的 `@…_K{n}` /
 * `@…_{n}` 定义集合，与夹具装载全部口上模块后各族的注册集合（
 * `DispatchFamily.implemented`）双向比对：
 *
 *   - 只在原作：真缺口（口上模块没写或没装载）——本用例红，修法是落
 *     实现；确属「不移植」的要在 docs/stub-registry.md 登记存根行，并把
 *     该编号从本表的原作侧排除（注明票号）；
 *   - 只在 ere：注册了原作没有的编号——口上写串了，红。
 *
 * 两侧集合的首次实测（#565 返工，2026-09）：九族完全一致——
 * 0-10,12-15,19,903,904（GOBI 缺 11：原作 K11 リリィ没有语尾函数，两侧
 * 同缺）；ATTACK_KOUJO_B 在原作无独立定义（B 侧复用 `DUNGEON_ATTACK_K{n}`
 * 的表，ere 的 `attack_koujo_b` 同款走 `dungeon_attack_family`）。
 * K20（琼）是 0 字节空文件、无任何函数定义（#251/J41 判「不实现」），
 * 不产生集合差。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

const REPO = path.resolve(__dirname, '..');
const KOJO_DIR = path.join(REPO, 'ere', 'kojo');
const ORIG_DIR = path.join(REPO, 'target', 'ERB', '口上');

/**
 * 族 → { pats: 原作定义名的编号捕获正则（大写匹配）, fam: 族对象在哪个
 * 模块的哪个导出 }。名字形态三类：`GOBI_KOUJO_K3`、`KOJO_MESSAGE_MARKCNG_3`
 * （无 K）、`DUNGEON_ATTACK_K3`（前缀与 ere 族名不同）。
 */
const FAMILY_TABLE = [
  {
    name: 'GOBI_KOUJO',
    pats: ['^GOBI_KOUJO_K(\\d+)$'],
    module: 'kojo/kojo-system',
    fam: 'gobi_koujo_family',
  },
  {
    name: 'KOJO_MESSAGE_MARKCNG',
    pats: ['^KOJO_MESSAGE_MARKCNG_(\\d+)$'],
    module: 'kojo/kojo-system',
    fam: 'kojo_message_markcng_family',
  },
  {
    name: 'KOJO_MESSAGE_PALAMCNG',
    pats: ['^KOJO_MESSAGE_PALAMCNG_(\\d+)$'],
    module: 'kojo/kojo-system',
    fam: 'kojo_message_palamcng_family',
  },
  {
    name: 'ATTACK_KOUJO / ATTACK_KOUJO_B（共用 DUNGEON_ATTACK 表）',
    pats: ['^DUNGEON_ATTACK(?:_B)?_K(\\d+)$'],
    module: 'kojo/kojo-system',
    fam: 'dungeon_attack_family',
  },
  {
    name: 'BENKI_KOUJO',
    pats: ['^BENKI_KOUJO_K(\\d+)$'],
    module: 'kojo/kojo-system',
    fam: 'benki_koujo_family',
  },
  {
    name: 'VICTORY_KOUJO（原作 DUNGEON_VICTORY）',
    pats: ['^DUNGEON_VICTORY_K(\\d+)$'],
    module: 'kojo/kojo-system',
    fam: 'dungeon_victory_family',
  },
  {
    name: 'ENTERENEMY_KOUJO',
    pats: ['^ENTERENEMY_KOUJO_K(\\d+)$'],
    module: 'kojo/kojo-system',
    fam: 'enterenemy_koujo_family',
  },
  {
    name: 'GOHOUBI_REQUEST_KOUJO',
    pats: ['^GOHOUBI_REQUEST_KOUJO_K(\\d+)$'],
    module: 'kojo/kojo-dungeon-after',
    fam: 'gohoubi_request_koujo_family',
  },
];

/** target/ 的 ERB 是 UTF-8 与 Shift-JIS 混杂（AGENTS.md），按内容识别 */
function read_erb(rel) {
  const buf = fs.readFileSync(rel);
  const utf8 = new TextDecoder('utf-8', { fatal: false }).decode(buf);
  return utf8.includes('\uFFFD')
    ? new TextDecoder('shift_jis').decode(buf)
    : utf8;
}

function scan_original_definitions() {
  const sets = new Map(FAMILY_TABLE.map((f) => [f.name, new Set()]));
  for (const name of fs.readdirSync(ORIG_DIR)) {
    if (!/\.ERB$/i.test(name)) continue;
    const text = read_erb(path.join(ORIG_DIR, name));
    for (const m of text.matchAll(/^@\s*([A-Za-z0-9_]+)/gm)) {
      const fn = m[1].toUpperCase();
      for (const f of FAMILY_TABLE) {
        for (const p of f.pats) {
          const mm = fn.match(new RegExp(p));
          if (mm) sets.get(f.name).add(Number(mm[1]));
        }
      }
    }
  }
  return sets;
}

test('口上九族：原作 @…_K{n} 定义集合与 ere 注册集合双向一致（真缺口即红）', () => {
  const original = scan_original_definitions();
  const fixture = create_era_fixture();
  for (const f of fs
    .readdirSync(KOJO_DIR)
    .filter(
      (n) =>
        n.endsWith('.js') && n !== 'kojo-system.js' && n !== 'kojo-text.js',
    )) {
    fixture.load_module(`kojo/${f.replace(/\.js$/, '')}`);
  }
  for (const f of FAMILY_TABLE) {
    const family = fixture.load_module(f.module)[f.fam];
    const implemented = new Set(family.implemented.keys());
    const orig = original.get(f.name);
    const missing = [...orig].filter((n) => !implemented.has(n));
    const extra = [...implemented].filter((n) => !orig.has(n));
    assert.deepEqual(
      [missing, extra],
      [[], []],
      `${f.name}：只原作{${missing.join(',')}}是真缺口——落实现，或在 docs/stub-registry.md 登记存根行后从本表排除；只ere{${extra.join(',')}}是口上写串了`,
    );
  }
});

test('try_kojo_or_stub 未命中静默（原作 TRYCALLFORM 落空语义，不打占位）', async () => {
  const fixture = create_era_fixture();
  for (const n of fs.readdirSync(KOJO_DIR).filter((n) => n.endsWith('.js'))) {
    fixture.load_module(`kojo/${n.replace(/\.js$/, '')}`);
  }
  const { try_kojo_or_stub, dungeon_attack_family } =
    fixture.load_module('kojo/kojo-system');
  const before = fixture.lines_history.length;

  // 窗口外（target = 0 魔王，无口上性格）→ kojo_handler_id = -1 → 静默
  const a = await try_kojo_or_stub(
    dungeon_attack_family,
    'ATTACK_KOUJO',
    '攻击口上',
    '测试',
    0,
  );
  assert.equal(a, 0, '未命中返回 0（原作 TRYCALLFORM 落空的 RESULT 语义）');
  assert.equal(
    fixture.lines_history.length,
    before,
    '窗口外不得有任何输出（含占位行）',
  );

  // 窗口内但该族无此编号（K11 的 GOBI：原作与 ere 同缺）→ 同样静默
  const { gobi_koujo_family } = fixture.load_module('kojo/kojo-system');
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  fixture.store.set('talent:31:171', 1); // K11（COUNT 171 − 60 = 111 → 族内 11）
  const b = await try_kojo_or_stub(
    gobi_koujo_family,
    'GOBI_KOUJO',
    '语尾口上',
    '测试',
    31,
  );
  assert.equal(b, 0);
  assert.equal(
    fixture.lines_history.length,
    before,
    '族内缺号（原作同样没有）必须静默——语尾这类高频调用一档一占位会刷屏',
  );
});

test('show_chara_info 换 TARGET：语尾按被显示角色的口上取，退出即恢复（:25-26/:320-321）', async () => {
  const fixture = create_era_fixture();
  for (const n of fs.readdirSync(KOJO_DIR).filter((n) => n.endsWith('.js'))) {
    fixture.load_module(`kojo/${n.replace(/\.js$/, '')}`);
  }
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  fixture.seed_chara(1, { id: 1, name: '勇者1', callname: '勇者1' });
  fixture.era.addCharacter(1);
  fixture.store.set('talent:1:160', 1); // K0 慈爱——语尾真身在 kojo-k0-tender
  fixture.store.set('cflag:1:6', 99);
  fixture.store.set('flag:5', 2048); // 口上视角（look.js 的 kojo_view）
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 0; // 调用方 target 是魔王：不换手的话语尾按魔王取（静默）
  const { show_chara_info } = fixture.load_module('page/page-chara-info-show');
  await show_chara_info(1, -2, () => 0);
  const texts = fixture.lines
    .filter((l) => l.type === 'text')
    .map((l) => l.text);
  assert(
    texts.includes('……。'),
    '-2 页的语尾按被显示角色（K0，无刻印 → mark 4 → 『……。』）取，不得回退到魔王的静默',
  );
  assert.equal(era_flag.target, 0, ':320-321 退出恢复调用方的 TARGET');
});
