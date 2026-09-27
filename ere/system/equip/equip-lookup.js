/**
 * @file 装备查表行为：equip_database 的解码与查表、get_equip_num、equip_get。
 *
 * 装备记录：按次新建的普通对象，键 = W 列的中文语义（列定义见数据文件头
 * 注释），充当函数间传参与回传的载体。入口函数（equip_check / equip_select /
 * curse_equip_ring / equip_st_show 一族）造记录、经本模块填充、由调用方读列。
 *
 * **跨调用的 W 残留不建模**（记录按次新建）：装饰行与 ELSE 分支不写的
 * 战斗修正列（W:9-W:16）由 #546 起的 equip_st_show 读取——读到的不是
 * 跨调用残留，而是本记录的缺省 undefined（getter 层 `w.列` 恒经
 * 附魔增量 `?? 0` 起算）与查表列；但**强度/诅咒（W:2/W:5）
 * 例外**——equip_database 对空槽短路时不写这两列，而 equip_select 的
 * 换装检查会读。该处按「会话起点 W = 0」起算（见
 * ere/system/equip/equip-select.js 的注释）；跨调用的外部残留
 * 仍不建模（#517）。
 */

'use strict';

const era = require('#/era-electron');
const { EQUIP_DATABASE, EQUIP_ENCHANT } = require('#/data/equip-database');

/**
 * 拆存储编码：存储编号 → 识别号 / 强度 / 前缀。
 * 输入恒 >= 0（见 equip_database 的空槽检查），整除方向确定。
 * @param {number} no 存储编号（格納番号）
 * @returns {{识别号: number, 强度: number, 前缀: number}}
 */
function decode_equip_no(no) {
  return {
    识别号: no % 1000,
    强度: Math.floor((no % 100000) / 1000),
    前缀: Math.floor(no / 100000),
  };
}

/**
 * 装存储编码：前缀 * 100000 + 强度 * 1000 + 识别号。
 * @param {number} 识别号 W:1（0-999）
 * @param {number} 强度 W:2（0-10）
 * @param {number} [前缀] W:17（默认 0 = 无附魔）
 * @returns {number} 存储编号（存 CFLAG:550/551/552）
 */
function encode_equip_no(识别号, 强度, 前缀 = 0) {
  return 前缀 * 100000 + 强度 * 1000 + 识别号;
}

/**
 * equip_database：把 w.存储编号 拆码后按识别号查表，填满
 * 效果/价格/诅咒/特殊/部位（武装行另填八列战斗修正），再叠前缀附魔增量
 * 与强度加成。
 *
 * 三段结构：
 *   1. 空槽检查——存储编号 < 0（空槽 -1）返回 false（RESULT 0）；
 *   2. 查表——命中行逐列赋值；ELSE 分支是黑戒指，且**重置**
 *      存储编号/识别号/强度为 0（前缀保留——W:17 不清）；
 *   3. 附魔 + 强度——增量累加；伤害强化另 + 强度 * 5。
 *
 * @param {object} w 装备记录（至少含存储编号；本函数填充其余列）
 * @returns {boolean} RESULT：true = 有效装备
 */
function equip_database(w) {
  // SIF W:0 < 0 RETURN 0
  if (w.存储编号 < 0) {
    return false;
  }

  // 拆码
  const { 识别号, 强度, 前缀 } = decode_equip_no(w.存储编号);
  w.识别号 = 识别号;
  w.强度 = 强度;
  w.前缀 = 前缀;

  const row = EQUIP_DATABASE[识别号];
  if (row === undefined) {
    // ELSE 分支（黑戒指）：未知识别号重置三段码，前缀保留
    w.存储编号 = 0;
    w.识别号 = 0;
    w.强度 = 0;
  }
  const data = row ?? EQUIP_DATABASE.default;
  w.效果 = data.效果;
  w.价格 = data.价格;
  w.诅咒 = data.诅咒;
  w.特殊 = data.特殊;
  w.部位 = data.部位;
  if (data.伤害强化 !== undefined) {
    // 武装行与 ELSE 分支才有的八列战斗修正
    w.伤害强化 = data.伤害强化;
    w.弹药消耗 = data.弹药消耗;
    w.失手率 = data.失手率;
    w.气力回复 = data.气力回复;
    w.连击率 = data.连击率;
    w.防御伤害 = data.防御伤害;
    w.弹尽行为 = data.弹尽行为;
    w.气力伤害 = data.气力伤害;
  }

  // 附魔增量（前缀 0 无附魔；缺省列按 0 起算——记录按次新建）
  const enchant = EQUIP_ENCHANT[w.前缀];
  if (enchant !== undefined) {
    for (const [key, delta] of Object.entries(enchant)) {
      w[key] = (w[key] ?? 0) + delta;
    }
  }

  // 强度加成：+强化度使伤害增加
  w.伤害强化 = (w.伤害强化 ?? 0) + w.强度 * 5;

  return true;
}

/**
 * get_equip_num：把 w.备注（W:8）里的道具号换算成识别号存进
 * w.存储编号（W:0）。道具号 300+ 段是装备（300+识别号），负数钳 0。
 * @param {object} w 装备记录
 */
function get_equip_num(w) {
  // W:0 = W:8 - 300
  w.存储编号 = w.备注 - 300;
  // SIF W:0 < 0 → W:0 = 0
  if (w.存储编号 < 0) {
    w.存储编号 = 0;
  }
}

/**
 * equip_get：按 w.存储编号 的识别号把装备道具 +1 入包
 * （道具号 = 300 + 识别号），上限 99。
 * @param {object} w 装备记录
 * @returns {number} RESULT：恒 0（调用方不读）
 */
function equip_get(w) {
  // 无效编号直接结束
  if (w.存储编号 < 0) {
    return 0;
  }

  // W:1 = W:0 % 1000 → X = 300 + W:1。存储编号 < 0 已在上面早退，
  // 非负数的 % 1000 落在 [0,999]，X 恒 >= 300。
  const x = 300 + (w.存储编号 % 1000);

  // ITEM:X += 1，上限 99
  const count = (era.get(`item:${x}`) || 0) + 1;
  era.set(`item:${x}`, count > 99 ? 99 : count);

  return 0;
}

module.exports = {
  decode_equip_no,
  encode_equip_no,
  equip_database,
  get_equip_num,
  equip_get,
};
