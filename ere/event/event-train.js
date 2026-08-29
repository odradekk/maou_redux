/**
 * @file 调教开始事件 @EVENTTRAIN 的处理器（issue #44，#PRI 档真身）。
 *
 * 源: target/ERB/調教相關/TRAIN_MAIN.ERB  @EVENTTRAIN（:13-58，#PRI）
 *     target/ERB/EVENT/EVENT_BEFORETRAIN.ERB  @PRITRAIN_MESSAGE
 *     （:6-14 为本文件移植的「承载头部」；:16 起的消息体存根化）
 *
 * @EVENTTRAIN 是事件函数（口上模块后续会往链上挂自己的定义）；本处理器
 * 对应 TRAIN_MAIN.ERB 的 #PRI 定义，注册于模块顶层。直线赋值 1:1 照搬，
 * test/event-train.test.js 对写入做全量断言（意外写入当场暴露）。
 *
 * 掉不进去的与待办的（docs/stub-registry.md）：
 *   - PRITRAIN_MESSAGE 的消息体（初调教/着衣/素质分支叙事）；
 *   - TRAIN_NAME_INIT 与 TSTR:90 已随 #212 落地（ere/system/train/
 *     train-name.js 与 page/page-usercom.js 的 p_c；TSTR 承载的建模定论见
 *     yml/TStr.yml 头注与 test/tstr-train-table.test.js）。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { stub_line } = require('#/utils/stub-line');
const { train_name_init } = require('#/system/train/train-name');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 * TRAIN_NAME_INIT 已随 #212 换真身（train_name_init）。
 */
const STUBBED_CALLS = ['PRITRAIN_MESSAGE'];

/**
 * @PRITRAIN_MESSAGE 的承载头部（EVENT_BEFORETRAIN.ERB:6-14）。
 *
 * 头部三件事是整条调教流程的承重墙，不能随消息体一起存根：
 *   - CFLAG:TARGET:10 += 1（调教回数，累计计数）；
 *   - T:10/11/12 = MASTER/TARGET/ASSI（「避免角色错乱的暂存纪录」，
 *     @EVENTEND 复位角色时读回，TRAIN_MAIN.ERB:320-323）。
 * 消息体（:16-201 的省略设定/初调教/着衣/素质分支叙事）存根化，登记待办。
 */
async function pritrain_message_head() {
  // :7-8 调教経験を加算：CFLAG:TARGET:10 += 1
  const target = era_flag.target;
  era.add(`cflag:${target}:10`, 1);

  // :10-14 避免角色错乱的暂存纪录：T:10 = MASTER、T:11 = TARGET、
  // SIF ASSI → T:12 = ASSI（flag 保留区槽位，见 era-flag.js 手写区补注）
  era_flag.master_backup = 0; // MASTER 恒为角色 0（魔王，CONTEXT.md）
  era_flag.target_backup = target;
  if (era_flag.assi) {
    era_flag.assi_backup = era_flag.assi;
  }

  // :16-21 调教テキスト省略設定（FLAG:6 & 1）：省略时的短消息。FLAG:6 未
  // 落表时读值 0 → 走完整叙事；消息体整体存根（含本分支的短消息），两条
  // 路径共用同一占位行
  stub_line('PRITRAIN_MESSAGE', '调教开始消息');
  await era.waitAnyKey(); // WAIT（消息体的读键：占位也保留节奏）
}

// @EVENTTRAIN（TRAIN_MAIN.ERB:13-58，#PRI）
on(
  'EVENTTRAIN',
  async () => {
    // :15-16 主人公の射精を0に（BASE:2 = 射精槽；MASTER 恒角色 0）
    era.set('base:0:2', 0);
    // :17-18 いちおう調教対象と助手も（:19-20 SIF ASSI >= 0 才写）
    era.set(`base:${era_flag.target}:2`, 0);
    if (era_flag.assi >= 0) {
      era.set(`base:${era_flag.assi}:2`, 0);
    }
    // :21 BASE:TARGET:3 = 0（母乳槽）
    era.set(`base:${era_flag.target}:3`, 0);
    // :22 BASE:MASTER:4 = 0（触手射精槽）
    era.set('base:0:4', 0);

    // :25-27 REPEAT 200：TFLAG:0..199 清 0（引擎建表时已清过一遍静态条目，
    // 原作照写不误——1:1 保留两层写入）
    for (let i = 0; i < 200; i += 1) {
      era.set(`tflag:${i}`, 0);
    }

    // :32-37 調教者は誰か：ASSIPLAY == 0 → PLAYER = MASTER，否则 ASSI
    // （ASSIPLAY 在 BEGIN TRAIN 时由引擎清 0——train-loop.js 的初始化段）
    if (era_flag.assiplay === 0) {
      era_flag.player = 0;
    } else {
      era_flag.player = era_flag.assi;
    }

    // :39-41 记录目标与助手，以备人物切换：ASSI:1 / TARGET:1（flag 槽位）
    era_flag.assi_record = era_flag.assi;
    era_flag.target_record = era_flag.target;

    // :43-47 时常发情ボーナス：TALENT:TARGET:271（时常发情）→ 润滑与欲情
    // 从 3000 起步（PALAM:3 润滑 / PALAM:5 欲情）
    if (era.get(`talent:${era_flag.target}:271`)) {
      era.set(`palam:${era_flag.target}:3`, 3000);
      era.set(`palam:${era_flag.target}:5`, 3000);
    }

    // :49-50 死斗场の収入初期化：TFLAG:402 = 0（200 循环外，独立写入）
    era.set('tflag:402', 0);

    // :52-53 CALL TRAIN_NAME_INIT（#212 真身：TRAIN_NAME 定制名表一次性播种，
    // 守卫幂等——ere/system/train/train-name.js）
    train_name_init();

    // :55 CALL PRITRAIN_MESSAGE（承载头部移植 + 消息体存根）
    await pritrain_message_head();
  },
  TIER.PRI,
);

module.exports = { STUBBED_CALLS };
