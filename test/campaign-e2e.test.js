/**
 * 战役 1「赤蛮咒森」端到端验收（issue #469）：
 * CAMPAIGN_MENU → SELECT_CAMPAIGN → CAMPAIGN_SET_1 → 招募 → 派遣 →
 * run_dungeon 驱动的真实推进（CAMPAIGN_ROOM/ROOM_EXTRA/TRAP/EQUIP_SELECT/
 * MONSTER_LIST/QUEST/STORY 全部经真实调用链触达）→ 第 6 层踏破 →
 * CAMPAIGN_ENDING_1 → FLAG:400 归零。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一注入点）。与
 * test/page-campaign.test.js、各域文件自己的单元测试的差别：本文件不
 * 直接调用任何 campaign_* 函数，全程只驱动 campaign_menu() 与
 * run_dungeon()（page-invasion.js post_conquest_menu [9] 与 dungeon.js
 * 的既有入口），验证的是接线本身，不是各函数各自的正确性（那些已在
 * 各自文件的测试里覆盖）。
 */

'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 所有掷骰恒最大（RAND:N == N-1）：稳定推进、稳定选中怪物表/陷阱表的末档 */
const max = (n) => n - 1;

/** 驱动上限：防止推进逻辑改坏导致死循环，超限即红（变异自证依赖） */
const CALL_LIMIT = 40;

function texts(fixture) {
  return fixture.lines_history
    .filter((l) => l.type === 'text')
    .map((l) => l.text);
}

test('战役 1 全链：CAMPAIGN_MENU 招募/派遣 → run_dungeon 真实推进 → CAMPAIGN_ENDING_1', async () => {
  const fixture = create_era_fixture();
  fixture.seed_chara(0, { id: 0, name: '你', callname: '你' });
  fixture.era.addCharacter(0);
  fixture.store.set('base:0:1', 100000); // 气力充裕（招募消耗 + 战役每日 -10）
  fixture.store.set('maxbase:0:1', 100000);
  // 编制**不连号**（#487）：0 号魔王之外再放一位 9 号。rand_chara_make 的
  // :52 CHARA = RAND(1,17) 恒 1 → 掷中的勇者位是 1，招募后 CHARANUM = 3
  // →「已加入数 - 1」= 2 ≠ 1：按人数取新角色号的旧写法写不到 1 号身上，
  // 下面的招募素质位与派遣断言因此能区分「角色号」与「人数」
  fixture.seed_chara(9, { id: 9, name: '杂役', callname: '杂役' });
  fixture.era.addCharacter(9);
  // 待招募的预设角色（rand_chara_make 的 :52 CHARA = RAND(1,17) 恒 1）
  fixture.seed_chara(1, { id: 1, name: '候补者', callname: '候补者' });
  fixture.store.set('cflag:1:6', 99); // 名字编号：避让随机命名重掷

  fixture.load_module('page/page-campaign-1'); // 触发 CAMPAIGN_1 的 register()
  const { campaign_menu } = fixture.load_module('page/page-campaign');
  const { run_dungeon } = fixture.load_module('dungeon/dungeon');

  // —— 第一段：CAMPAIGN_MENU 里选战役、招募（两轮菜单 + [999] 退出）——
  // 第一轮 [0] 选战役 → SELECT_CAMPAIGN 选 [1] → CAMPAIGN_SET_1 跑完；
  // 第二轮 [1] 招募 → rand_chara_make 的形象确认 [100]（继续）→ 收下 [2]；
  // 第三轮 [999] 退出菜单（派遣分批在下面单独驱动，中间要插入体力预置）
  // 菜单段用恒 0 的随机源：rand_chara_make 的 :52 CHARA = RAND(1,17) 需要
  // 命中预设的角色 1（本文件只 seed 了这一个候补预设）；dungeon 段单独
  // 传 max，两段随机源互不影响（campaign_menu 与 run_dungeon 各自调用）
  fixture.set_inputs(0, 1, 1, 100, 2, 999);
  await campaign_menu(() => 0);

  assert.equal(fixture.store.get('flag:400'), 1, '战役进行中');
  assert.ok(
    texts(fixture).some((t) => t.includes('极东之地')),
    'CAMPAIGN_SET_1 的开场白',
  );
  // 招募的收尾（rand_chara_make 的返回值）必须是**角色号 1**：#487 之前按
  // 「已加入数 - 1」取号，这里会落到 2 号（既不是候选角色、也不在编制里）
  assert.equal(
    fixture.store.get('talent:1:361'),
    1,
    '招募素质位点亮在 1 号身上（角色号 1 ≠ 人数 - 1 = 2）',
  );
  assert.equal(
    fixture.store.get('talent:2:361'),
    undefined,
    '不写到「人数 - 1」的 2 号',
  );

  // rand_chara_make 走 CM_BASE 时按角色数据随机生成体力/气力，未必落在
  // 「不算临死」的门槛之上，且 run_dungeon 的战斗（H6 真身）会消耗气力——
  // 派遣分支排除体力 < 1 的候选（:101-102），气力耗尽则被战斗判定撤退/
  // 归还（迎击奴隶滞留分档，#172 既有）。派遣与战斗判定本身都不是本票
  // 新逻辑，这里补满体力气力只为让流程稳定推进到 CAMPAIGN_ENDING
  fixture.store.set('base:1:0', 100000);
  fixture.store.set('maxbase:1:0', 100000);
  fixture.store.set('base:1:1', 100000);
  fixture.store.set('maxbase:1:1', 100000);

  // —— 第二段：CAMPAIGN_MENU 里派遣刚招募的角色 ——
  // [2] 派遣 → 候补者的角色号是 1（掷中的勇者位，不是「第几位加入」）
  // → 派遣列表按钮的快捷键就是角色号，选 [1] → 派遣成功后子循环重画列表，
  // [999] 退出派遣子菜单；
  // 随后 [999] 退出战役主菜单
  fixture.set_inputs(2, 1, 999, 999);
  await campaign_menu(() => 0);

  assert.equal(fixture.store.get('cflag:1:1'), 12, '角色 1 已派遣');
  assert.ok(
    texts(fixture).some((t) => t.includes('派遣了')),
    '派遣播报',
  );

  // —— 第二段：run_dungeon 驱动派遣角色真实推进，直到 CAMPAIGN_ENDING 触发 ——
  // max 下 WALK 恒 73：楼层因战斗与陷阱效果不严格单调递增（沿途真实经过
  // CAMPAIGN_ROOM/ROOM_EXTRA/TRAP/EQUIP_SELECT/MONSTER_LIST/QUEST/STORY
  // 各真身，含气力/体力消耗），实测 23 次调用到达第 6 层触发终局，
  // CALL_LIMIT 留出余量
  let ending_fired = false;
  for (let i = 0; i < CALL_LIMIT && !ending_fired; i += 1) {
    await run_dungeon(1, max);
    if ((fixture.store.get('flag:400') || 0) === 0) {
      ending_fired = true;
    }
  }

  assert.ok(ending_fired, `CAMPAIGN_ENDING 未在 ${CALL_LIMIT} 次调用内触发`);
  assert.equal(fixture.store.get('flag:400'), 0, ':317 战役结束清零');
  assert.ok(
    texts(fixture).some((t) => t.includes('神像之力竟不奏效')),
    'CAMPAIGN_ENDING_1 的开场白',
  );
  assert.ok(
    texts(fixture).some((t) => t.includes('赤森谜路')),
    'CAMPAIGN_ENDING_1 收尾重现战役名',
  );
  // 推进途中确实走过战役剧情文本（CAMPAIGN_QUEST → CAMPAIGN_STORY），
  // 证明不是靠 whenMissing 兜底空转到终局
  assert.ok(
    texts(fixture).some((t) => t.includes('奇形怪状的植物')),
    '途中打过 CAMPAIGN_STORY_1 进度 0 段文本',
  );
});
