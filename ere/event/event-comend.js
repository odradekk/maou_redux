/**
 * @file 指令执行后事件 @EVENTCOMEND 的处理器（issue #44，#PRI 档真身）。
 *
 * 源: target/ERB/調教相關/TRAIN_MAIN.ERB  @EVENTCOMEND（:272-310，#PRI）
 *
 * 调教キャラの死亡・衰弱判定，四条分支（FLAG:35 = 濒死自动结束调教开关，
 * @EVENTFIRST :45 开局置 0 = 关）：
 *   1. BASE:0 <= 0 && !FLAG:35     → 目标死亡：消息 + WAIT + BEGIN AFTERTRAIN
 *   2. BASE:0 < 500 && FLAG:35     → 目标衰弱（体力 < 500）自动结束
 *   3. ASSI > 0 且 BASE:ASSI:0 <= 0 → 助手死亡（消息里的代词是 SHE(TARGET)，
 *      原作笔误也照搬——助手分支的文案以目标代词收尾）
 *   4. ASSI > 0 且 BASE:ASSI:0 < 500 → 助手衰弱——**无 FLAG:35 条件**，
 *      开关只作用于目标侧（:296-302 对 :274-281 的不对称，1:1 保留）
 *
 * 分支内的 BEGIN AFTERTRAIN 经事件链暂存（#6 语义：链继续、最后一个胜出），
 * 由 train-loop.js 的回合循环作为状态返回值提交。
 *
 * TEQUIP:53（录像使用中）→ TFLAG:34 = 1：死亡时录像标志转存，1:1。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');

// SHE(ARG)：性别代词（Emuera 内建表达式函数）。era 约定：TALENT:x:122
// （男人）→「他」，其余（含 121 扶她）→「她」。代词全集的逐字核对归
// 输出对拍票（#48）。
function she(cid) {
  return era.get(`talent:${cid}:122`) ? '他' : '她';
}

// 目标侧判定（:274-281 / :282-289）
async function check_target_vitals() {
  // BASE:0 = 目标的体力（Base.yml id 0）；FLAG:35 读未声明得 undefined → || 0
  const stamina = era.get(`base:${era_flag.target}:0`) || 0;
  const auto_end_flag = era.get('flag:35') || 0;
  if (stamina <= 0 && auto_end_flag === 0) {
    // :275-280 死亡
    era.drawLine();
    // :277-278 死亡時にビデオを使用していた？→ TFLAG:34 = 1
    if (era.get(`tequip:${era_flag.target}:53`)) {
      era.set('tflag:34', 1);
    }
    era.print(`${chara_callname(era_flag.target)}一动也不动，`);
    era.print(`对${she(era_flag.target)}做什么都不再有反应了……`);
    await era.waitAnyKey(); // :279 WAIT
    begin(STATE.AFTERTRAIN); // :280
  } else if (stamina < 500 && auto_end_flag !== 0) {
    // :282-288 瀕死時に調教を自動終了設定（FLAG:35 = 1 才生效）
    era.drawLine();
    era.print('（体力到了极限。调教结束。）');
    await era.waitAnyKey(); // :287 WAIT
    begin(STATE.AFTERTRAIN); // :288
  }
}

// 助手侧判定（:291-310；衰弱分支无 FLAG:35 条件，见文件头第 4 条）
async function check_assi_vitals() {
  if (era_flag.assi <= 0) {
    return;
  }
  const stamina = era.get(`base:${era_flag.assi}:0`) || 0;
  if (stamina <= 0) {
    // :293-301 死亡。两处 1:1 保留原作的隐式 TARGET：消息代词用 SHE(TARGET)
    //（原作笔误）、SIF TEQUIP:53 无角色前缀 = TEQUIP:TARGET:53（助手死时查
    // 的还是目标的录像装备——同为可疑但照搬，勿「修好」）
    era.drawLine();
    if (era.get(`tequip:${era_flag.target}:53`)) {
      era.set('tflag:34', 1);
    }
    era.print(`${chara_callname(era_flag.assi)}一动也不动，`);
    era.print(`对${she(era_flag.target)}做什么都不再有反应了……`);
    await era.waitAnyKey(); // :299 WAIT
    begin(STATE.AFTERTRAIN); // :300
  } else if (stamina < 500) {
    // :302-308 衰弱（无 FLAG:35 守卫——开关只管目标侧）
    era.drawLine();
    era.print('（助手体力到了极限。调教结束。）');
    await era.waitAnyKey(); // :306 WAIT
    begin(STATE.AFTERTRAIN); // :307
  }
}

on(
  'EVENTCOMEND',
  async () => {
    await check_target_vitals();
    await check_assi_vitals();
  },
  TIER.PRI,
);

module.exports = {};
