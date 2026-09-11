/**
 * @file 角色信息个别画面的动作函数：能力提升/换装资格判定、拘束台解放、金钱
 * 回复体力气力、金钱购买等级、传送召回。
 *
 * 源: target/ERB/キャラ関数/CHARA_INFO_FUNC.ERB 全 6 函数——
 *     @IS_ABLE_TO_ABILITY_UP（:3-6，#FUNCTION 式中函数）/
 *     @IS_ABLE_TO_CLOTH（:9-11，#FUNCTION 式中函数）/
 *     @CHARA_INFO_RESTORE_STATE（:14-18）/@CHARA_INFO_RECOVER_HP（:20-46）/
 *     @CHARA_INFO_UP_LEVEL（:48-88）/@CHARA_INFO_CALLBACK（:89-122）。
 *
 * 调用方：キャラ関数/CHARA_INFO ver1.0.1.ERB（本域 page-chara-info.js）的
 * CASE 10/11/12/14/15/13，以及外部两处：其他/NINSIN.ERB:286（临盆迎击角色
 * 请求传送召回，ere/chara/chara-pregnancy.js 的 ninsin_reach_term）。
 *
 * 硬约束七（MOD 重名歧义）落在这三个函数：@CHARA_INFO_CALLBACK、
 * @CHARA_INFO_RECOVER_HP、@CHARA_INFO_UP_LEVEL 在 `MOD/一键升级/CHARA_INFO_FUNC.ERB`
 * 各有一份同名定义，调用方 `CALL`（非 `CALLEVENT`）使 Emuera 取哪一份取决于
 * 装载顺序。逐字节比对两份文件的结论（本票实测，推翻 #381/#391 的初步判断）：
 *   - IS_ABLE_TO_ABILITY_UP/IS_ABLE_TO_CLOTH/CHARA_INFO_RESTORE_STATE/
 *     CHARA_INFO_RECOVER_HP：两版逐字节相同（`diff` 零差异）；
 *   - CHARA_INFO_CALLBACK：两版起始行号不同（キャラ関数 :89、MOD :119），
 *     但那只是因为前一个函数（UP_LEVEL）长度不同——函数体本身逐字节相同；
 *   - CHARA_INFO_UP_LEVEL：**两版内容真正不同**。基础版每次固定购买 1 级；
 *     MOD 版（目录名「一键升级」）改成批量购买 0/1/5/10/100/500/1000 级。
 * 真正的歧义只在 CHARA_INFO_UP_LEVEL 一处，而 `MOD/` 与 `魔改新增/` 已由
 * #329 裁定 6 整体排除在阶段 5 之外、留给阶段 6（"MOD/ 到底加不加载"仍是
 * 阶段 6 待裁的开放问题，见 #101 阶段 6 行）。本环境没有 Emuera 运行时可用
 * （`target/` 只含源码与说明文档，不含可执行的 Emuera 本体），无法实测装载
 * 顺序——按硬约束七"不许猜"的二选一，本票选择显式划界：只移植阶段 5 范围内
 * 的キャラ関数（基础）版本，MOD 版"一键升级"批量购买变体不在本票实现，
 * 留给阶段 6 处理 MOD/ 加载问题时一并裁定。
 */

const era = require('#/era-electron');
const era_exflag = require('#/era-utils/era-exflag');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { party_del } = require('#/dungeon/dungeon-party');
const { lvup } = require('#/dungeon/dungeon-lvup');

function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/**
 * @IS_ABLE_TO_ABILITY_UP（:3-6，#FUNCTION 式中函数）：能力提升资格判定。
 * CFLAG:ARG:1 = 角色状态（0 可调教/2 侵攻中/3 迎击中/7 苗床）；
 * CFLAG:0:9 = 魔王等级；BASE:ARG:0 = 体力。
 * @param {number} cid 角色 ID
 * @returns {boolean}
 */
function is_able_to_ability_up(cid) {
  const state = era.get(`cflag:${cid}:1`) || 0; // CFLAG:1 状态
  const master_lv = era.get('cflag:0:9') || 0; // CFLAG:0:9 魔王等级
  const hp = era.get(`base:${cid}:0`) || 0; // BASE:0 体力
  return (
    (state === 0 ||
      (master_lv >= 20 && state === 2) ||
      state === 7 ||
      (master_lv >= 20 && state === 3)) &&
    hp >= 1
  );
}

/**
 * @IS_ABLE_TO_CLOTH（:9-11，#FUNCTION 式中函数）：更换服装资格判定。
 * @param {number} cid 角色 ID
 * @returns {boolean}
 */
function is_able_to_cloth(cid) {
  const state = era.get(`cflag:${cid}:1`) || 0;
  const hp = era.get(`base:${cid}:0`) || 0;
  return state === 0 && hp >= 1;
}

/**
 * @CHARA_INFO_RESTORE_STATE（:14-18）：状态复位（迎击中先离队再清状态）。
 *
 * 全库零调用者（原作与 `ere/` 均无调用点）——为完整移植 CHARA_INFO_FUNC.ERB
 * 六个函数之一而实现，等待方随将来接线该函数的调用点出现时补。
 * @param {number} cid 角色 ID
 */
function chara_info_restore_state(cid) {
  if ((era.get(`cflag:${cid}:1`) || 0) === 3) {
    party_del(cid);
  }
  chara(cid).invasion.状态 = 0;
}

/**
 * @CHARA_INFO_RECOVER_HP（:20-46）：花钱回满体力气力。
 *
 * @param {number} cid 角色 ID
 * @returns {Promise<void>}
 */
async function chara_info_recover_hp(cid) {
  const max_hp = era.get(`maxbase:${cid}:0`) || 0;
  const hp = era.get(`base:${cid}:0`) || 0;
  const max_mp = era.get(`maxbase:${cid}:1`) || 0;
  const mp = era.get(`base:${cid}:1`) || 0;
  const cost = Math.trunc(((max_hp - hp) * 10) / 3 + ((max_mp - mp) * 5) / 3);

  if (era_flag.money < cost) {
    await era.printAndWait(`需要金钱${cost}G，金钱不够`);
    return;
  }

  era.print(`要使用金钱恢复${name_of(cid)}的体力和气力吗？`);
  era.print(
    `恢复${max_hp - hp}点体力和${max_mp - mp}点气力，需花费金钱${cost}G`,
  );
  era.printButton('立即恢复', 0);
  era.printButton('还是算了', 1);
  const result = await era.input();
  if (result === 1) {
    return; // :39-40 还是算了
  }
  if (result === 0) {
    await era.printAndWait(`花费${cost}G，恢复了${name_of(cid)}的体力与气力`);
    era_flag.money -= cost;
    era_exflag.legit_money -= cost;
    chara(cid).dungeon.体力 = max_hp;
    chara(cid).dungeon.气力 = max_mp;
  }
  // CASEELSE GOTO INPUT_LOOP1（:33/:35）：白名单外输入到不了游戏，不模拟
}

/**
 * @CHARA_INFO_UP_LEVEL（:48-88，キャラ関数/基础版）：花钱购买 1 级经验。
 *
 * 每次调用固定升 1 级（曲线取自 @LVUP：魔王 LV*100+10、精英 LV*20+10、
 * 通常 LV*10+10；此处只算差额判定花费，真正的升级结算仍交给 @LVUP）。
 * MOD 版的批量购买（0/1/5/10/100/500/1000 级）不在本票范围，见文件头。
 *
 * @param {number} cid 角色 ID
 * @returns {Promise<void>}
 */
async function chara_info_up_level(cid) {
  const lv = era.get(`cflag:${cid}:9`) || 0; // CFLAG:9 等级
  let need;
  if (cid === 0) {
    need = lv * 100 + 10; // 魔王
  } else if ((era.get(`talent:${cid}:220`) || 0) === 1) {
    need = lv * 20 + 10; // 精英
  } else {
    need = lv * 10 + 10; // 通常
  }
  need -= era.get(`exp:${cid}:80`) || 0; // EXP:80 战斗经验
  if (need < 0) need = 0;
  const cost = need * 100;

  if (era_flag.money < cost) {
    await era.printAndWait(`需要金钱${cost}G，金钱不够`);
    return;
  }

  era.print(`要使用金钱提升${name_of(cid)}的等级吗？`);
  era.print(`到下一级经验还要${need}点，需花费金钱${cost}G`);
  era.printButton('提升等级', 0);
  era.printButton('还是算了', 1);
  const result = await era.input();
  if (result === 1) {
    return;
  }
  if (result === 0) {
    // :83 LOCALS 三目（ARG==MASTER ? NAME:MASTER # SAVESTR:ARG）算出后从未被
    // 读取，下一行的 PRINTFORMW 直接写死 %NAME:MASTER%——原作缺陷 1:1 保留：
    // 给奴隶提升等级时，播报也说成是「你」花的钱（#14 登记）。
    await era.printAndWait(`${name_of(0)}花费了${cost}G，购买了经验${need}点`);
    era_flag.money -= cost;
    era_exflag.legit_money -= cost;
    chara(cid).dungeon.战斗经验 += need;
    lvup(cid);
  }
}

/**
 * @CHARA_INFO_CALLBACK（:89-122）：耗费魔王气力，把出击中的角色传送召回。
 *
 * 等级差判定（LOCAL = (对方等级*100/魔王等级)^2 * 魔王气力上限 / 10000）
 * 与气力是否足够两道守卫，均不足时静默失败（打印原因后 RETURN）。
 *
 * @param {number} cid 角色 ID
 * @returns {Promise<void>}
 */
async function chara_info_callback(cid) {
  const target_lv = era.get(`cflag:${cid}:9`) || 0;
  const master_lv = era.get('cflag:0:9') || 0;
  if (target_lv >= master_lv) {
    await era.printAndWait(
      `LV${master_lv}的${name_of(0)}无法对LV${target_lv}的${name_of(cid)}发动传送魔法`,
    );
    return;
  }

  const ratio = Math.trunc((target_lv * 100) / master_lv);
  const master_max_mp = era.get('maxbase:0:1') || 0;
  const cost = Math.trunc((ratio * ratio * master_max_mp) / 10000);
  const master_mp = era.get('base:0:1') || 0;
  if (cost > master_mp) {
    await era.printAndWait(
      `${name_of(0)}的气力不足以对${name_of(cid)}发动传送魔法（需要${cost}点，当前${master_mp}点）`,
    );
    return;
  }

  era.print(`要召回出击中的${name_of(cid)}吗？`);
  era.print(`发动传送魔法需要消耗${name_of(0)}的气力${cost}点`);
  era.printButton('立即召回', 0);
  era.printButton('还是算了', 1);
  const result = await era.input();
  if (result === 1) {
    return;
  }
  if (result === 0) {
    chara(0).dungeon.气力 = master_mp - cost;
    await era.printAndWait(
      `${name_of(0)}使用魔法把${name_of(cid)}传送了回来！`,
    );
    party_del(cid);
    chara(cid).invasion.状态 = 0;
  }
}

module.exports = {
  is_able_to_ability_up,
  is_able_to_cloth,
  chara_info_restore_state,
  chara_info_recover_hp,
  chara_info_up_level,
  chara_info_callback,
};
