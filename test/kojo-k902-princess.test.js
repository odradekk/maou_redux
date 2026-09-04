/**
 * 普林希丝（K902）的失声契约（issue #248，裁定见 #14）。
 *
 * 源: target/ERB/口上/EVENT_K902_普林希丝 ver1.0.3.ERB。
 * 源文是 K903 嘉德口上的未完成复制品：除事件标志外，25 个
 * 函数仍全部名为 _903。Emuera 的 TRYCALL 因找不到 _902 而静默跳过。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const CID = 32;
const KEY = 902;

function setup_k902() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, CID, '普林希丝');
  fixture.era.beginTrain(0, CID);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = CID;
  fixture.store.set(`ex_talent:${CID}:102`, 1);
  fixture.store.set('flag:7', 2);
  fixture.load_module('kojo/kojo-k902-princess');
  return fixture;
}

async function emit(fixture, name) {
  const { emit: emit_event } = fixture.load_module('system/event/registry');
  await emit_event(name);
}

test('K902 事件钩子：调教开始置 EX_FLAG:102，结束后清除', async () => {
  const fixture = setup_k902();
  await emit(fixture, 'EVENTTRAIN');
  assert.equal(fixture.store.get('exflag:102'), 1, 'EVENTTRAIN 置 EX_FLAG:102');

  await emit(fixture, 'EVENTEND');
  assert.equal(fixture.store.get('exflag:102'), 0, 'EVENTEND 清 EX_FLAG:102');
});

test('K902 事件钩子：没有 EX_TALENT:102 时不置存在标志', async () => {
  const fixture = setup_k902();
  fixture.store.set(`ex_talent:${CID}:102`, 0);
  fixture.store.set('flag:7', 0);

  await emit(fixture, 'EVENTTRAIN');

  assert.equal(fixture.store.has('exflag:102'), false);
  assert.equal(fixture.store.get('flag:7'), 0, '守卫失败时不打开口上总开关');
});

test('K902 事件边界：EVENTTRAIN 读 102，EVENTEND 不承接 K903 正文', async () => {
  const fixture = setup_k902();

  fixture.var_reads.length = 0;
  await emit(fixture, 'EVENTTRAIN');
  assert.ok(
    fixture.var_reads.some(({ name }) => name === `ex_talent:${CID}:102`),
    'EVENTTRAIN 守卫读 EX_TALENT:TARGET:102',
  );

  fixture.var_reads.length = 0;
  await emit(fixture, 'EVENTEND');
  assert.equal(
    fixture.var_reads.some(({ name }) => name.startsWith(`ex_talent:${CID}:`)),
    false,
    '复制来的 K903 EVENTEND 正文由 #249 负责双注册，本票不留空壳',
  );
});

test('K902 失声：EX 编号分发到 902，21 个源分发点均无真身与输出', async () => {
  const fixture = setup_k902();
  fixture.store.set('exflag:102', 1);

  const kojo = fixture.load_module('kojo/kojo-system');
  const after = fixture.load_module('kojo/kojo-dungeon-after');
  const ravish = fixture.load_module('kojo/kojo-dungeon-ravish');
  assert.equal(kojo.get_kojo_num(CID), 1002, 'EX_TALENT:102 → LOCAL 1002');
  assert.equal(kojo.kojo_handler_id(CID), KEY, 'LOCAL 1002 → 分发键 902');

  const implemented_points = [
    ['KOJO_MESSAGE_COM', kojo.kojo_message_com_family],
    ['KOJO_MESSAGE_PALAMCNG', kojo.kojo_message_palamcng_family],
    ['KOJO_MESSAGE_MARKCNG', kojo.kojo_message_markcng_family],
    ['SELF_KOJO', kojo.self_kojo_family],
    ['DUNGEON_RYOUZYOKU', ravish.ryouzyoku_kojo_family],
    ['DUNGEON_RYOUZYOKU_AFTER', ravish.ryouzyoku_after_kojo_family],
    ['BENKI_KOUJO', kojo.benki_koujo_family],
    ['DUNGEON_VICTORY', kojo.dungeon_victory_family],
    ['DUNGEON_ATTACK', kojo.dungeon_attack_family],
    ['NTR_KOUJO', kojo.ntr_koujo_family],
    ['EXUCUTION_KOUJO', kojo.exucution_koujo_family],
    ['MUSEUM_KOUJO', kojo.museum_koujo_family],
    ['BANISHMENT_KOUJO', kojo.banishment_koujo_family],
    ['PUBLIC_EXUCUTION_KOUJO', kojo.public_exucution_koujo_family],
    ['GROTESQUE_KOUJO', kojo.grotesque_koujo_family],
    ['ENTERENEMY_KOUJO', kojo.enterenemy_koujo_family],
    ['GOHOUBI_REQUEST_KOUJO', kojo.gohoubi_request_koujo_family],
    ['GOHOUBI_AFTER_KOUJO', after.gohoubi_after_koujo_family],
    ['OSIOKI_KOUJO', after.osioski_koujo_family],
    ['GOBI_KOUJO', kojo.gobi_koujo_family],
    ['KOJO_EVENT_COM', kojo.kojo_event_com_family],
  ];
  assert.equal(implemented_points.length, 21, 'EVENT_K.ERB 共 21 个动态分发点');

  for (const [name, family] of implemented_points) {
    assert.equal(family.has(KEY), false, `${name} 不注册 K902`);
    await family.call(KEY, { whenMissing: 0, args: [] });
  }
  assert.deepEqual(fixture.text_lines(), [], 'K902 在 21 个分发点全程失声');
});
