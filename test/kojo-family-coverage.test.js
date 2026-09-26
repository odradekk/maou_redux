/**
 * @file 口上分发族的缺号语义与按角色取语尾的行为测试。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

const REPO = path.resolve(__dirname, '..');
const KOJO_DIR = path.join(REPO, 'ere', 'kojo');

test('try_kojo 未命中静默（原作 TRYCALLFORM 落空语义，不打占位）', async () => {
  const fixture = create_era_fixture();
  for (const n of fs.readdirSync(KOJO_DIR).filter((n) => n.endsWith('.js'))) {
    fixture.load_module(`kojo/${n.replace(/\.js$/, '')}`);
  }
  const { try_kojo, dungeon_attack_family } =
    fixture.load_module('kojo/kojo-system');
  const before = fixture.lines_history.length;

  // 窗口外（target = 0 魔王，无口上性格）→ kojo_handler_id = -1 → 静默
  const a = await try_kojo(dungeon_attack_family, 0);
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
  const b = await try_kojo(gobi_koujo_family, 31);
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
    texts.some((l) => l.startsWith('「') && l.endsWith('……。」')),
    '-2 页的语尾按被显示角色（K0，无刻印 → mark 4 → 『……。』）取，且拼进「」之内、与台词同一行（#570），不得回退到魔王的静默',
  );
  assert.equal(era_flag.target, 0, ':320-321 退出恢复调用方的 TARGET');
});
