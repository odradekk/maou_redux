/**
 * @file 调教开始事件 EVENTTRAIN 的处理器（issue #44，#PRI 档真身）。
 *
 * EVENTTRAIN 是事件函数（口上模块后续会往链上挂自己的定义）；本处理器
 * 是 #PRI 档定义，注册于模块顶层。直线赋值逐项落表，test/event-train.test.js
 * 对写入做全量断言（意外写入当场暴露）。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { train_name_init } = require('#/system/train/train-name');
const { pritrain_message } = require('#/event/event-beforetrain');

// EVENTTRAIN（#PRI 档）
on(
  'EVENTTRAIN',
  async () => {
    // 主人公の射精を0に（BASE:2 = 射精槽；MASTER 恒角色 0）
    era.set('base:0:2', 0);
    // いちおう調教対象と助手も（ASSI >= 0 才写）
    era.set(`base:${era_flag.target}:2`, 0);
    if (era_flag.assi >= 0) {
      era.set(`base:${era_flag.assi}:2`, 0);
    }
    // BASE:TARGET:3 = 0（母乳槽）
    era.set(`base:${era_flag.target}:3`, 0);
    // BASE:MASTER:4 = 0（触手射精槽）
    era.set('base:0:4', 0);

    // REPEAT 200：TFLAG:0..199 清 0（引擎建表时已清过一遍静态条目，
    // 这里照写第二层清零）
    for (let i = 0; i < 200; i += 1) {
      era.set(`tflag:${i}`, 0);
    }

    // 調教者は誰か：ASSIPLAY == 0 → PLAYER = MASTER，否则 ASSI
    // （ASSIPLAY 在 BEGIN TRAIN 时由引擎清 0——train-loop.js 的初始化段）
    if (era_flag.assiplay === 0) {
      era_flag.player = 0;
    } else {
      era_flag.player = era_flag.assi;
    }

    // 记录目标与助手，以备人物切换：ASSI:1 / TARGET:1（flag 槽位）
    era_flag.assi_record = era_flag.assi;
    era_flag.target_record = era_flag.target;

    // 时常发情ボーナス：TALENT:TARGET:271（时常发情）→ 润滑与欲情
    // 从 3000 起步（PALAM:3 润滑 / PALAM:5 欲情）
    if (era.get(`talent:${era_flag.target}:271`)) {
      era.set(`palam:${era_flag.target}:3`, 3000);
      era.set(`palam:${era_flag.target}:5`, 3000);
    }

    // 死斗场の収入初期化：TFLAG:402 = 0（200 循环外，独立写入）
    era.set('tflag:402', 0);

    // train_name_init（#212 真身：TRAIN_NAME 定制名表一次性播种，
    // 幂等检查在内部——ere/system/train/train-name.js）
    train_name_init();

    // pritrain_message（真身）
    await pritrain_message();
  },
  TIER.PRI,
);
