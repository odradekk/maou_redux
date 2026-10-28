/**
 * @file 据点事件横幅：侵攻度跨过档位时打一条横幅并推进状态字，回落到档位
 * 以下时打夺回横幅并回退。
 *
 * arg == 1（人间界）是完整状态机（FLAG:81 侵攻度 × FLAG:93 状态字）；
 * arg == 2/3/4（精灵/龙/天界）只有判定骨架：推进赋值整体被注释，不输出、
 * 不推进。日循环的侵攻度衰减与出兵结算尾都调它。
 *
 * 移植取舍与旧引擎对照登记在侵略域的文件头说明（page-invasion.js）里。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');

// kyoten_event 的横幅文本：星号框与全角空格补位改由分隔线 + 居中输出承担
const KYOTEN_BANNERS = {
  占领了村庄: '占领了村庄',
  占领了港口: '占领了港口',
  攻陷了堡垒: '攻陷了堡垒',
  占领了街道: '占领了街道',
  占领了城市: '占领了城市',
  人间界的军队占领了村庄: '人间界的军队占领了村庄',
  人间界的军队占领了港口: '人间界的军队占领了港口',
  人间界的军队攻陷了堡垒: '人间界的军队攻陷了堡垒',
  人间界的军队占领了街道: '人间界的军队占领了街道',
  人间界的军队占领了城市: '人间界的军队占领了城市',
};

/**
 * kyoten_event 四个分支共用的状态推进链（人间界分支与另外三个分支的
 * 十档判定结构相同）：命中档给下一档号，未命中返回原档。ELSEIF 链化成一串
 * 提前 return，语义与「命中即止」相同。
 *
 * @param {number} progress 该领域的侵攻度
 * @param {number} stage 该领域的侵略事件状态字
 * @returns {number} 下一档；等于 stage 即未命中任何档
 */
function kyoten_next_stage(progress, stage) {
  if (progress >= 2000 && stage === 0) return 1;
  if (progress >= 4000 && stage === 1) return 2;
  if (progress >= 6000 && stage === 2) return 3;
  if (progress >= 8000 && stage === 3) return 4;
  if (progress >= 10000 && stage === 4) return 5;
  if (progress <= 500 && stage === 1) return 0;
  if (progress <= 2000 && stage === 2) return 1;
  if (progress <= 4000 && stage === 3) return 2;
  if (progress <= 6000 && stage === 4) return 3;
  if (progress <= 8000 && stage === 5) return 4;
  return stage;
}

/**
 * kyoten_event：据点事件横幅。
 *
 * arg == 1（人间界）的完整状态机：侵攻度跨 2000/4000/6000/8000/10000 逐档
 * 推进 FLAG:93，回落到 500/2000/4000/6000/8000 以下时逐档回退，命中的档打
 * 七行横幅并写回状态字。
 *
 * 两个调用方：出兵结算尾（侵略主流程）与日循环的侵攻度衰减（回合结算）。
 * 本函数是演出（命中一档打七行横幅 + 写状态字），但它属于回合结算，归侵略
 * 域而不是画面——页面只负责菜单，不参与结算。
 *
 * arg == 2/3/4（精灵/龙/天界）三分支只有判定骨架：推进赋值整体被注释、状态字
 * 恒 0，不输出任何内容、也不推进——状态字维持原样，出兵结算的侵攻度照算。
 * 三分支随地区续接（#505）可达：出兵结算尾的 AREA 可取 86/88/90，侵攻度有
 * 写入路径。三分支的状态字（FLAG:94/95/96）没有写点：94 号被挪作「人数上限
 * 阶梯」的判断条件，CHALLENGE 用的是 EX_FLAG:95 位域。
 *
 * @param {number} arg 地区编号：1=人间界、2=精灵、3=龙、4=天界（0 与 5 及以上空转）
 * @returns {Promise<0>} 恒 RETURN 0
 */
async function kyoten_event(arg) {
  if (arg === 1) {
    const progress = era_flag.human_realm_invasion; // FLAG:81
    const stage = era_flag.human_realm_event_stage; // FLAG:93
    const next = kyoten_next_stage(progress, stage);
    if (next === stage) {
      return 0; // 未命中任何档：空转
    }
    const banner =
      KYOTEN_BANNERS[stage < next ? forward_key(next) : recapture_key(stage)];
    era.drawLine({ isSolid: true });
    era.print(banner, { align: 'center' });
    era.drawLine({ isSolid: true });
    era_flag.human_realm_event_stage = next;
    return 0;
  }

  // 精灵/龙/天界三分支：不输出、不推进（见函数头注释）
  return 0;
}

// 推进档（stage → next）与夺回档（stage → next-1）的横幅键
function forward_key(next_stage) {
  return ['占领了村庄', '占领了港口', '攻陷了堡垒', '占领了街道', '占领了城市'][
    next_stage - 1
  ];
}
function recapture_key(stage) {
  return [
    '人间界的军队占领了村庄',
    '人间界的军队占领了港口',
    '人间界的军队攻陷了堡垒',
    '人间界的军队占领了街道',
    '人间界的军队占领了城市',
  ][stage - 1];
}

module.exports = { kyoten_event };
