/**
 * charadead_check 的行为测试（#548 / S7：调教后死亡检查）。
 *
 * 缝 = test/helpers/era-fixture.js。真身在 ere/event/event-aftertrain.js
 * （该文件头自 #44 起就登记着本函数，这张工单实现）。
 *
 * 覆盖：
 *   - 存活（BASE:0 > 0）→ RETURN 0 零输出；
 *   - FLAG:35（濒死自动结束调教）→ 体力钳到 1、RETURN 0；
 *   - 菲娅线推进（EX_FLAG:2807 ∈ [160,170) 且 TARGET == 菲娅 → 170）；
 *   - 魔王死亡无候补 → GAMEOVER 横幅 + INPUT + QUIT（throw 型，#148）；
 *   - 魔王死亡有候补 → MAOU_KOUHO + 横幅 ×4 + 四分支叙事（候补是
 *     PLAYER/ASSI、他人、17 号三种可达形式）；
 *   - 死亡口上事件码（TFLAG:13 = 999）与「X死掉了……」行——
 *     #DIM TEMP 恒 0、ELSEIF 分支不可达（#14 登记，见实现注释）；
 *   - BASE:0 = -1、预设 1–100 的苏生标记、FLAG:31 杀害数累计；
 *   - 杀害数 ≥ 3 → 魔王获得【威压感】；
 *   - eventend 接入：死亡删除分支真调 party_char_del（队伍复位）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');
const { assert_one_blank_after } = require('./helpers/blank-lines');

function text_lines(fixture) {
  return fixture.lines_history
    .filter((line) => line.type === 'text')
    .map((line) => line.text);
}

/**
 * 死亡检查的世界底座：魔王 0 + 调教目标（默认 31 温妮）在场、调教表开着
 * （TFLAG:13 的写需要 beginTrain 开表）。target 为 0 时是魔王自虐的形式。
 *
 * template 给后代的双号写法（预设模板与角色号不同）：夹具的 seed_chara 默认
 * 把预设模板种成角色号，那样「按角色号登记」与「按预设号登记」在整张表上
 * 逐字相同，苏生登记的变异体等价于原文。要分开这两种写法，必须显式播种一个
 * 落在苏生范围（1..100）内、又与角色号不同的模板号。
 */
function seed_world({ target = 31, target_name = '温妮', template } = {}) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  if (target !== 0) {
    join_slave_chara(
      fixture,
      target,
      target_name,
      template === undefined ? {} : { portcflag: { 预设模板: template } },
    );
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

test('菲娅线推进：EX_FLAG:2807 ∈ [160,170) 且目标是菲娅 → 170', async () => {
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

test('魔王死亡·无候补：GAMEOVER 横幅 + INPUT 后回标题（不再退出进程）', async () => {
  const { fixture } = seed_world({ target: 0 });
  fixture.store.set('base:0:0', 0); // 魔王倒下
  fixture.store.set('exflag:3', 0); // EX_FLAG:3 无继任
  fixture.set_inputs(0); // INPUT（无分支确认）

  // GAMEOVER 回标题（#852）：转场目标是返回值，原先是 era.quit() 抛出
  assert.equal(
    await run_check(fixture),
    'TITLE',
    'GAMEOVER 以 TITLE 转场离开（回标题，不退出进程）',
  );
  assert(
    !fixture.calls.some(({ api }) => api === 'quit'),
    'GAMEOVER 不得退出进程（退出只由标题画面的退出按钮发出）',
  );
  const texts = text_lines(fixture);
  assert(
    fixture.lines_history.some(
      (line) =>
        line.type === 'divider' &&
        line.text === 'GAMEOVER' &&
        line.border === 'dashed',
    ),
    'GAMEOVER 横幅',
  );
  assert(
    fixture.inputs_consumed.some((c) => c.api === 'input'),
    '回标题前的 INPUT 被消费',
  );
  // 转场当场结束本函数：之后的语句（死亡口上/死亡旗）不可达
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

test('魔王死亡·候补是他人（非 17 非 PLAYER/ASSI）：镜室叙事 + 死亡处理', async () => {
  const { fixture } = seed_maou_death({ successor: 31 });

  assert.equal(await run_check(fixture), 1);
  const texts = text_lines(fixture);
  // 分支二（EX_FLAG:3 != GETCHARA(17) 且非 PLAYER/ASSI）
  assert(texts.includes('你猛的醒了过来、看着这似曾相识的房间……'));
  assert(texts.includes('你似乎明白了什么……'));
  assert(texts.includes('从一旁的镜子中映出的是温妮的身影……'));
  assert(texts.includes('「果然…我……死了呢」'), 'SELF_CALL 回落「我」');
  // 横幅五连（GAMEOVER + 三条分隔线 + @@@@@@@@）：#870 起全是 drawLine，
  // 按出现次序取这一段（死亡处理后面还有别的分隔线）
  const banners = fixture.lines_history
    .filter((line) => line.type === 'divider')
    .map((line) => line.text);
  assert.deepEqual(
    banners.slice(0, 5),
    ['GAMEOVER', '', '', '', '@@@@@@@@'],
    '横幅五连（GAMEOVER + 三条长线 + @@@@@@@@）',
  );
  // 共通死亡段：魔王自己死了（%SAVESTR:TARGET%）
  assert(texts.includes('你死掉了……'));
  // BASE:0 = -1 的写入意图；真引擎把 base 钳到 0（dev-guides/09-static.md:203），
  // 夹具不钳。不断言 -1——那是引擎存不下的值，★死亡★ 显示不出来
  //（文件头「移植说明」记了这处偏离）
  assert.ok(fixture.store.get('base:0:0') <= 0, 'BASE:0 = -1（引擎落盘为 0）');
  assert.equal(fixture.store.get('flag:999'), undefined, '魔王不进入苏生名单');
  assert.equal(fixture.store.get('flag:31'), 1, '杀害数 +1');
});

test('魔王死亡·候补是 PLAYER：巨镜叙事（原本属于自己的身体）', async () => {
  const { fixture } = seed_maou_death({ successor: 31, player: 31 });

  await run_check(fixture);
  const texts = text_lines(fixture);
  assert(
    texts.includes('你猛的醒了过来、看见了倒在了自己身旁的原本属于自己的身体'),
    '分支一（EX_FLAG:3 == PLAYER）',
  );
  assert(texts.includes('从一旁的巨大镜子中映出的是温妮的身影……'), '巨大镜子');
});

test('魔王死亡·候补是 17 号且不在身旁：第四支（突然瘫坐）', async () => {
  const { fixture } = seed_maou_death({ successor: 17 });

  await run_check(fixture);
  const texts = text_lines(fixture);
  assert(
    texts.some((line) => line.includes('成为魔王了')),
    '「X成为魔王了」横幅（GETCHARA(17) 的候补）',
  );
  // 第四支（EX_FLAG:3 == GETCHARA(17) 且不在 PLAYER/ASSI）
  assert(texts.includes('玛奥突然像丢了魂似的瘫坐在地上……'), '第四支首句');
  assert(!texts.includes('玛奥看着倒在眼前的东西……'), '不走第三支');
  assert(!texts.includes('心中有些怅然若失……'), '不走第三支');
});

test('魔王死亡·候补是 17 号且在身旁（PLAYER）：第三支（看着倒在眼前的东西）', async () => {
  const { fixture } = seed_maou_death({ successor: 17, player: 17 });

  await run_check(fixture);
  const texts = text_lines(fixture);
  // 第三支首两句与第四支完全不同，用来区分两支（两支都以「成为魔王了」收尾）
  assert(texts.includes('玛奥看着倒在眼前的东西……'), '第三支首句');
  assert(texts.includes('心中有些怅然若失……'), '第三支次句');
  assert(!texts.includes('玛奥突然像丢了魂似的瘫坐在地上……'), '不走第四支');
  assert(
    !texts.includes('你猛的醒了过来、看着这似曾相识的房间……'),
    '不走第二支',
  );
});

test('魔王死亡·候补是 17 号且在身旁（ASSI）：第三支', async () => {
  const { fixture, era_flag } = seed_maou_death({ successor: 17 });
  era_flag.assi = 17; // 的 (== PLAYER || == ASSI) 另一半

  await run_check(fixture);
  const texts = text_lines(fixture);
  assert(texts.includes('玛奥看着倒在眼前的东西……'), '第三支首句（ASSI 侧）');
  assert(!texts.includes('玛奥突然像丢了魂似的瘫坐在地上……'), '不走第四支');
});

test('奴隶死亡：RETURN 1、事件码 999、死亡旗、杀害数', async () => {
  const { fixture } = seed_world();
  fixture.store.set('base:31:0', 0);

  assert.equal(await run_check(fixture), 1);
  const texts = text_lines(fixture);
  // TFLAG:13 = 999 + CALL SELF_KOJO（FLAG:7 总开关关 → 口上静默）
  assert.equal(fixture.store.get('tflag:13'), 999, '死亡口上事件码');
  // TEMP 恒 0 → !TEMP 恒真，「X死掉了……」（ELSEIF 不可达，#14 登记）
  assert(texts.includes('温妮死掉了……'));
  // #597： 的 PRINTL 落在的 PRINTFORML 之后（那一行已结束）——空行
  assert_one_blank_after(fixture, '温妮死掉了……', '奴隶死亡');
  assert.equal(fixture.store.get('base:31:0'), -1);
  assert.equal(fixture.store.get('flag:1030'), -2, 'FLAG:(31+999) = -2');
  assert.equal(fixture.store.get('flag:31'), 1);
  // 杀害数 1 < 3 → 无【威压感】
  assert(!texts.some((line) => line.includes('威压感')));
  assert.equal(fixture.store.get('talent:0:93'), undefined);
});

test('死亡苏生标记：仅编号 1–100 的预设角色可苏生，后代不登记模板或未声明旗标', async () => {
  // 第三列 = 播种给该角色的预设模板号。后代（角色号 > 100）必须显式给一个
  // 落在苏生范围 1..100 内、又与角色号不同的模板号：只有这种输入才能区分
  // 「按角色号登记」与「按预设号登记」——夹具默认把预设模板种成角色号，
  // 那两种写法对整张表逐字相同，缺陷因此看不出来。777 一行保留默认种子
  // （预设模板 = 角色号），守住「范围外的角色号连自己的槽都不写」。
  for (const [target, death_flag, template] of [
    [1, 'flag:1000'],
    [50, 'flag:1049', 30],
    [100, 'flag:1099'],
    [101, null, 3],
    [201, null, 1],
    [211, null, 100],
    [777, null],
    [100000, null, 3],
    [101500, null, 42],
    [120000, null, 1],
    [121099, null, 99],
  ]) {
    const { fixture } = seed_world({
      target,
      target_name: '调教对象',
      template,
    });
    fixture.store.set(`base:${target}:0`, 0);

    assert.equal(await run_check(fixture), 1, `角色 ${target} 仍按死亡处理`);
    const death_writes = fixture.var_writes.filter(
      (write) => write.name.startsWith('flag:') && write.value === -2,
    );
    assert.deepEqual(
      death_writes.map((write) => write.name),
      death_flag ? [death_flag] : [],
      `角色 ${target} 的苏生登记范围`,
    );
    if (template !== undefined) {
      // 模板槽：苏生会按预设重建角色，后代本人恢复不了，所以模板号在这里
      // 没有意义。这一条独立读 store，不经 var_writes 的写入记录。
      assert.equal(
        fixture.store.get(`flag:${template + 999}`),
        undefined,
        `角色 ${target} 不得登记模板 ${template} 的苏生槽`,
      );
    }
    assert.equal(fixture.store.get('flag:31'), 1, '死亡仍计入杀害数');
    assert.ok(fixture.text_lines().includes('调教对象死掉了……'));
  }
});

test('威压感：杀害数累计到 3 → 魔王获得并播报', async () => {
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

test('威压感已持有时不重复播报（TALENT:MASTER:93 条件）', async () => {
  const { fixture } = seed_world();
  fixture.store.set('base:31:0', 0);
  fixture.store.set('flag:31', 2);
  fixture.store.set('talent:0:93', 1);

  await run_check(fixture);
  assert(!fixture.text_lines().some((line) => line.includes('威压感')));
});

// —— eventend 的接入（两处 CALL）——

test('接入：eventend 死亡删除分支真调 party_char_del（队伍复位后再除名）', async () => {
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

  const { run_aftertrain } = fixture.load_module('system/train/train-end');
  const pending = await run_aftertrain();

  assert.equal(pending, 'TURNEND');
  assert.equal(fixture.store.get('cflag:31:530'), 0, 'party_del 复位行动完了');
  assert.equal(fixture.store.get('cflag:31:533'), 0, 'party_del 复位队长记忆');
  assert(
    fixture.calls.some((c) => c.api === 'removeCharacter' && c.args[0] === 31),
    'DELCHARA 在 party_char_del 之后执行',
  );
});

test('接入：存活路径 RESULT == 0 → SELF_CHECK 照常执行', async () => {
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
  fixture.set_inputs(999); // juel_check 交互循环退出键

  const { emit } = fixture.load_module('system/event/registry');
  const pending = await emit('EVENTEND');

  assert.equal(pending, 'TURNEND');
  // SELF_CHECK 跑过（无调教后行为命中 → 静默）+ 珠结算到达（死亡才会跳过）
  assert(fixture.text_lines().includes('以上的点数变化了。'));
  assert.equal(fixture.store.get('tflag:13'), undefined, '事件码 999 未误写');
});
