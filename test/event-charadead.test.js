/**
 * @CHARADEAD_CHECK 的行为测试（#548 / S7：调教后死亡检查）。
 *
 * 源: target/ERB/EVENT/EVENT_AFTERTRAIN.ERB  @CHARADEAD_CHECK（:6-99）
 *     调用点: target/ERB/調教相關/TRAIN_MAIN.ERB @EVENTEND（:339，
 *     ere/event/event-end.js——本文件末两用例覆盖接线）。
 *
 * 缝 = test/helpers/era-fixture.js。真身在 ere/event/event-aftertrain.js
 * （该文件头自 #44 起就登记着本函数，本票落地）。
 *
 * 覆盖：
 *   - 存活（BASE:0 > 0）→ RETURN 0 零输出；
 *   - FLAG:35（濒死自动结束调教）→ 体力钳到 1、RETURN 0；
 *   - 菲娅线推进（EX_FLAG:2807 ∈ [160,170) 且 TARGET == 菲娅 → 170）；
 *   - 魔王死亡无候补 → GAMEOVER 横幅 + INPUT + QUIT（throw 型，#148）；
 *   - 魔王死亡有候补 → MAOU_KOUHO + 横幅 ×4 + 四分支叙事（候补是
 *     PLAYER/ASSI、他人、17 号三种可达形态）；
 *   - 死亡口上事件码（TFLAG:13 = 999）与「X死掉了……」行——原作
 *     #DIM TEMP 恒 0、ELSEIF 分支不可达（#14 登记，见实现注释）；
 *   - BASE:0 = -1、FLAG:(NO+999) = -2 死亡旗、FLAG:31 杀害数累计；
 *   - 杀害数 ≥ 3 → 魔王获得【威压感】；
 *   - @EVENTEND 接线：死亡删除分支真调 party_char_del（队伍复位）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/**
 * 死亡检查的世界底座：魔王 0 + 调教目标（默认 31 温妮）在场、调教表开着
 * （TFLAG:13 的写需要 beginTrain 开表）。target 为 0 时是魔王自虐的形态。
 */
function seed_world({ target = 31, target_name = '温妮' } = {}) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  if (target !== 0) {
    join_slave_chara(fixture, target, target_name);
  }
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = target;
  era_flag.player = 0;
  era_flag.assi = -1;
  fixture.store.set('maxbase:0:0', 2000);
  fixture.store.set('base:0:0', 2000);
  // TFLAG:13（死亡口上事件码）的写需要调教表开着
  fixture.era.beginTrain(0, target);
  fixture.load_module('event/event-aftertrain');
  return { fixture, era_flag };
}

async function run_check(fixture) {
  const { charadead_check } = fixture.load_module('event/event-aftertrain');
  return charadead_check();
}

test('存活：BASE:0 > 0 → RETURN 0、零输出', async () => {
  const { fixture } = seed_world();
  fixture.store.set('base:31:0', 100);

  assert.equal(await run_check(fixture), 0);
  assert.deepEqual(text_lines(fixture), []);
});

test('濒死自动结束（FLAG:35）：体力 < 1 钳到 1，RETURN 0 不判死', async () => {
  const { fixture } = seed_world();
  fixture.store.set('flag:35', 1);
  fixture.store.set('base:31:0', 0);

  assert.equal(await run_check(fixture), 0);
  assert.equal(
    fixture.store.get('base:31:0'),
    1,
    'SIF BASE:0 < 1 → BASE:0 = 1',
  );
  assert.deepEqual(text_lines(fixture), []);
});

test('菲娅线推进：EX_FLAG:2807 ∈ [160,170) 且目标是菲娅 → 170（:10-12）', async () => {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  fixture.seed_chara(35, { id: 35, name: '菲娅', callname: '菲娅' });
  fixture.era.addCharacter(35);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 35;
  fixture.store.set('exflag:2807', 165);
  fixture.store.set('base:35:0', 100);
  fixture.era.beginTrain(0, 35);
  fixture.load_module('event/event-aftertrain');

  assert.equal(await run_check(fixture), 0);
  assert.equal(fixture.store.get('exflag:2807'), 170);
});

test('魔王死亡·无候补：GAMEOVER 横幅 + INPUT 后 QUIT 抛出（:26-29）', async () => {
  const { fixture } = seed_world({ target: 0 });
  fixture.store.set('base:0:0', 0); // 魔王倒下
  fixture.store.set('exflag:3', 0); // EX_FLAG:3 无继任
  fixture.set_inputs(0); // :28 INPUT（无分支确认）

  await assert.rejects(
    () => run_check(fixture),
    (e) => e.message === 'quit',
  );
  const texts = text_lines(fixture);
  assert(
    texts.includes(
      '-------------------------------GAMEOVER---------------------------------',
    ),
    'GAMEOVER 横幅',
  );
  assert(
    fixture.inputs_consumed.some((c) => c.api === 'input'),
    'QUIT 前的 INPUT 被消费',
  );
  // QUIT 是 throw 型：之后的语句（死亡口上/死亡旗）不可达
  assert(!texts.some((line) => line.includes('死掉了')));
  assert.equal(fixture.store.get('flag:31'), undefined);
});

// 魔王死亡有候补的世界：EX_FLAG:3 = successor 且候补素质标记在身
function seed_maou_death({ successor, player = 0 } = {}) {
  const { fixture, era_flag } = seed_world({ target: 0 });
  fixture.store.set('base:0:0', 0);
  fixture.seed_chara(successor, {
    id: successor,
    name: successor === 17 ? '玛奥' : '温妮',
    callname: successor === 17 ? '玛奥' : '温妮',
  });
  fixture.era.addCharacter(successor);
  fixture.store.set(`ex_talent:${successor}:3`, 1);
  fixture.store.set('exflag:3', successor);
  era_flag.player = player;
  return { fixture, era_flag };
}

test('魔王死亡·候补是他人（非 17 非 PLAYER/ASSI）：镜室叙事 + 魔王死亡旗', async () => {
  const { fixture } = seed_maou_death({ successor: 31 });

  assert.equal(await run_check(fixture), 1);
  const texts = text_lines(fixture);
  // :41-44 分支二（EX_FLAG:3 != GETCHARA(17) 且非 PLAYER/ASSI）
  assert(texts.includes('你猛的醒了过来、看着这似曾相识的房间……'));
  assert(texts.includes('你似乎明白了什么……'));
  assert(texts.includes('从一旁的镜子中映出的是温妮的身影……'));
  assert(texts.includes('「果然…我……死了呢」'), 'SELF_CALL 回落「我」');
  // 横幅 ×4（:35-38：GAMEOVER + 三条长线）
  assert.equal(
    texts.filter((line) => line.startsWith('-----')).length,
    5,
    '横幅五连（:35-39：GAMEOVER + 三条长线 + @@@@@@@@）',
  );
  // 共通死亡段：魔王自己死了（%SAVESTR:TARGET%）
  assert(texts.includes('你死掉了……'));
  assert.equal(fixture.store.get('base:0:0'), -1, 'BASE:0 = -1');
  assert.equal(fixture.store.get('flag:999'), -2, 'FLAG:(NO+999) 死亡旗');
  assert.equal(fixture.store.get('flag:31'), 1, '杀害数 +1');
});

test('魔王死亡·候补是 PLAYER：巨镜叙事（原本属于自己的身体，:39-40）', async () => {
  const { fixture } = seed_maou_death({ successor: 31, player: 31 });

  await run_check(fixture);
  const texts = text_lines(fixture);
  assert(
    texts.includes('你猛的醒了过来、看见了倒在了自己身旁的原本属于自己的身体'),
    '分支一（EX_FLAG:3 == PLAYER）',
  );
  assert(texts.includes('从一旁的巨大镜子中映出的是温妮的身影……'), '巨大镜子');
});

test('魔王死亡·候补是 17 号：成为魔王横幅（分支三/四，:46-53）', async () => {
  const { fixture } = seed_maou_death({ successor: 17 });

  await run_check(fixture);
  const texts = text_lines(fixture);
  assert(
    texts.some((line) => line.includes('成为魔王了')),
    '「X成为魔王了」横幅（GETCHARA(17) 的候补）',
  );
});

test('奴隶死亡：RETURN 1、事件码 999、死亡旗、杀害数（:59-92）', async () => {
  const { fixture } = seed_world();
  fixture.store.set('base:31:0', 0);

  assert.equal(await run_check(fixture), 1);
  const texts = text_lines(fixture);
  // :61-62 TFLAG:13 = 999 + CALL SELF_KOJO（FLAG:7 总开关关 → 口上静默）
  assert.equal(fixture.store.get('tflag:13'), 999, '死亡口上事件码');
  // :66 TEMP 恒 0 → !TEMP 恒真，「X死掉了……」（ELSEIF 不可达，#14 登记）
  assert(texts.includes('温妮死掉了……'));
  assert.equal(fixture.store.get('base:31:0'), -1);
  assert.equal(fixture.store.get('flag:1030'), -2, 'FLAG:(31+999) = -2');
  assert.equal(fixture.store.get('flag:31'), 1);
  // 杀害数 1 < 3 → 无【威压感】
  assert(!texts.some((line) => line.includes('威压感')));
  assert.equal(fixture.store.get('talent:0:93'), undefined);
});

test('威压感：杀害数累计到 3 → 魔王获得并播报（:85-90）', async () => {
  const { fixture } = seed_world();
  fixture.store.set('base:31:0', 0);
  fixture.store.set('flag:31', 2); // 本次 +1 后 = 3
  fixture.store.set('talentname:93', '威压感'); // %TALENTNAME:93% 的名字表

  assert.equal(await run_check(fixture), 1);
  assert(fixture.text_lines().includes('你掌握了【威压感】。'));
  assert.equal(fixture.store.get('talent:0:93'), 1);
  assert.equal(
    fixture.inputs_consumed.filter((c) => c.api === 'waitAnyKey').length,
    1,
    'PRINTFORMW 的读键',
  );
});

test('威压感已持有时不重复播报（TALENT:MASTER:93 判据）', async () => {
  const { fixture } = seed_world();
  fixture.store.set('base:31:0', 0);
  fixture.store.set('flag:31', 2);
  fixture.store.set('talent:0:93', 1);

  await run_check(fixture);
  assert(!fixture.text_lines().some((line) => line.includes('威压感')));
});

// —— @EVENTEND 的接线（TRAIN_MAIN.ERB:339/:372 的两个 CALL）——

test('接线：@EVENTEND 死亡删除分支真调 party_char_del（队伍复位后再除名）', async () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  era_flag.target_record = 31;
  era_flag.assi_record = -1;
  era_flag.master_backup = 0;
  era_flag.target_backup = 31;
  era_flag.assi_backup = -1;
  // 31 是队长（CFLAG:533 = 31）、已行动（530 = 1）：party_char_del 应整套复位
  fixture.store.set('cflag:31:530', 1);
  fixture.store.set('cflag:31:533', 31);
  fixture.store.set('base:31:0', 0);
  fixture.era.beginTrain(0, 31);
  fixture.load_module('event/event-end');

  const { emit } = fixture.load_module('system/event/registry');
  const pending = await emit('EVENTEND');

  assert.equal(pending, 'TURNEND');
  assert.equal(fixture.store.get('cflag:31:530'), 0, 'party_del 复位行动完了');
  assert.equal(fixture.store.get('cflag:31:533'), 0, 'party_del 复位队长记忆');
  assert(
    fixture.calls.some((c) => c.api === 'removeCharacter' && c.args[0] === 31),
    'DELCHARA 在 party_char_del 之后执行',
  );
  assert(
    !text_lines(fixture).some((line) => line.includes('@PARTY_CHAR_DEL')),
    '不再打 party_char_del 占位行',
  );
});

test('接线：存活路径 RESULT == 0 → SELF_CHECK 照常执行（:341-345）', async () => {
  const fixture = create_era_fixture();
  join_slave_chara(fixture, 31, '温妮');
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = -1;
  era_flag.target_record = 31;
  era_flag.assi_record = -1;
  era_flag.master_backup = 0;
  era_flag.target_backup = 31;
  era_flag.assi_backup = -1;
  fixture.store.set('base:31:0', 2000);
  fixture.era.beginTrain(0, 31);
  fixture.load_module('event/event-end');
  fixture.set_inputs(999); // @JUEL_CHECK 交互循环退出键

  const { emit } = fixture.load_module('system/event/registry');
  const pending = await emit('EVENTEND');

  assert.equal(pending, 'TURNEND');
  // SELF_CHECK 跑过（无调教后行为命中 → 静默）+ 珠结算到达（死亡才会跳过）
  assert(fixture.text_lines().includes('以上的点数变化了。'));
  assert.equal(fixture.store.get('tflag:13'), undefined, '事件码 999 未误写');
});
