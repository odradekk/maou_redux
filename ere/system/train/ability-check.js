/**
 * @file 能力提升退出时的欲情/坦率检查共用子程序。
 *
 * 源: target/ERB/SYSTEM/SYSTEM_SOURCE_SUB1.ERB
 *     @YOKUBO_UP_CHECK（:1092-1111）/@JUJUN_UP_CHECK（:1113-1123）
 *
 * JUEL_CHECK 的 $LABEL_EXIT（system/train/juel-check.js）与 ABILITY_UP_CORE
 * 的 RESULT===999 分支（page/page-ability-up.js）都会调用，因此不能各自
 * 复制或打桩。
 *
 * == TFLAG:25 的调教外通道（#179 TFLAG:18/45 同形态处置） ==
 *
 * ABILITY_UP_CORE 跑在商店（SHOP_2.ERB:247），不在 beginTrain/endTrain
 * 之间；EraElectron 的 tflag 桶随 endTrain 删除，调教外写 TFLAG:25 会落
 * 「key error in getter/setter」（era-fixture 的 TRAIN_ONLY_TABLES 镜像
 * 同一条）。TFLAG:25 在原作全部 ERB 与 ere 侧都没有任何读取点（唯一写入
 * 点即此处，另一处只在 event-train-normal.js 里按回合清零），跳过写入
 * 不丢可观察行为，因此不需要 cloth.js 那样的掩码返回值通道，按同一约定
 * 加 in_train 开关直接跳过写入即可。
 */

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');

/**
 * 执行原作 @YOKUBO_UP_CHECK：欲望（ABL:11）≥3 时清除压抑/抵抗，否定点数减半。
 * @param {number} target 当前调教对象（TARGET）
 * @param {object} [opts]
 * @param {boolean} [opts.in_train] 调教内调用（缺省 true：置位落
 *   TFLAG:25）。调教外（ABILITY_UP_CORE）传 false——文件头「TFLAG:25 的
 *   调教外通道」节。
 */
function yokubo_up_check(target, { in_train = true } = {}) {
  if (
    Math.floor(era.get(`abl:${target}:11`) || 0) >= 3 &&
    (era.get(`talent:${target}:32`) || era.get(`talent:${target}:34`))
  ) {
    era.print(`${era.get(`callname:${target}:-1`) ?? ''}的`);
    if (era.get(`talent:${target}:32`)) {
      era.print('【压抑】');
      chara(target).event.压抑 = 0;
    }
    if (era.get(`talent:${target}:34`)) {
      era.print('【抵抗】');
      chara(target).event.抵抗 = 0;
    }
    era.print('失去了');
    era.print('否定点数减半');
    era.set(
      `juel:${target}:100`,
      Math.floor((era.get(`juel:${target}:100`) || 0) / 2),
    );
    if (in_train) {
      game.train.压抑抵抗消灭 = 1;
    }
  }
}

/**
 * 执行原作 @JUJUN_UP_CHECK：顺从（ABL:10）≥4，且反抗心、傲娇
 * （TALENT:11/18）同时成立时，反抗心 → 坦率。
 * @param {number} target 当前调教对象（TARGET）
 */
function jujun_up_check(target) {
  if (
    Math.floor(era.get(`abl:${target}:10`) || 0) >= 4 &&
    era.get(`talent:${target}:11`) && // 反抗心
    era.get(`talent:${target}:18`) // 傲娇
  ) {
    era.print(`${era.get(`callname:${target}:-1`) ?? ''}的【反抗心】失去了，`);
    era.print('【坦率】获得。');
    chara(target).event.反抗心 = 0;
    chara(target).chara.坦率 = 1;
  }
}

module.exports = { yokubo_up_check, jujun_up_check };
