/**
 * @file 装备查表行为：@EQUIP_DATABASE 的解码与查表、@GET_EQUIP_NUM、@EQUIP_GET。
 *
 * 源: target/ERB/其他/EQUIP.ERB  @EQUIP_DATABASE（:274-702，纯数据在
 *     ere/data/equip-database.js——裁定 6，#168/#174）
 *     @EQUIP_GET（:868-888）  @GET_EQUIP_NUM（:892-901）
 *
 * 装备记录（原作全局 W 数组的 ere 等价物）：按次新建的普通对象，键 = W 列
 * 的中文语义（列定义见数据文件头注释）。入口函数（EQUIP_CHECK/
 * EQUIP_SELECT/CURSE_EQUIP_RING/EQUIP_ST_SHOW 一族）造记录、经本模块填充、
 * 由调用方读列——与原作「W 数组当函数间传参与回传载体」同构，但不跨调用
 * 残留（原作装饰行不重置 W:9-W:16、全局残留无人读，见数据文件头注）。
 */

'use strict';

const era = require('#/era-electron');
const { EQUIP_DATABASE, EQUIP_ENCHANT } = require('#/data/equip-database');

/**
 * 拆存储编码（:281-284）：存储编号 → 识别号 / 强度 / 前缀。
 * 整数运算与 Emuera 一致（原值恒 >= 0，见 equip_database 的守卫）。
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
 * 装存储编码（:39 的公式）：前缀 * 100000 + 强度 * 1000 + 识别号。
 * @param {number} 识别号 W:1（0-999）
 * @param {number} 强度 W:2（0-10）
 * @param {number} [前缀] W:17（默认 0 = 无附魔）
 * @returns {number} 存储编号（存 CFLAG:550/551/552）
 */
function encode_equip_no(识别号, 强度, 前缀 = 0) {
  return 前缀 * 100000 + 强度 * 1000 + 识别号;
}

/**
 * @EQUIP_DATABASE（:274-702）：把 w.存储编号 拆码后按识别号查表，填满
 * 效果/价格/诅咒/特殊/部位（武装行另填八列战斗修正），再叠前缀附魔增量
 * 与强度加成。
 *
 * 与原作一致的三段（行号见数据表注释）：
 *   1. 守卫 :277-278——存储编号 < 0（空槽 -1）返回 false（RESULT 0）；
 *   2. 查表 :287-647——命中行逐列赋值；ELSE 臂是黑戒指，且**重置**
 *      存储编号/识别号/强度为 0（前缀保留——原作 ELSE 不清 W:17）；
 *   3. 附魔 :650-697 + 强度 :700——增量累加；伤害强化另 + 强度 * 5。
 *
 * @param {object} w 装备记录（至少含存储编号；本函数填充其余列）
 * @returns {boolean} RESULT：true = 有效装备
 */
function equip_database(w) {
  // :277-278 SIF W:0 < 0 RETURN 0
  if (w.存储编号 < 0) {
    return false;
  }

  // :281-284 拆码
  const { 识别号, 强度, 前缀 } = decode_equip_no(w.存储编号);
  w.识别号 = 识别号;
  w.强度 = 强度;
  w.前缀 = 前缀;

  const row = EQUIP_DATABASE[识别号];
  if (row === undefined) {
    // :629-647 ELSE 臂（黑戒指）：未知识别号重置三段码，前缀保留
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
    // 武装行与 ELSE 臂才有的八列战斗修正
    w.伤害强化 = data.伤害强化;
    w.弹药消耗 = data.弹药消耗;
    w.失手率 = data.失手率;
    w.气力回复 = data.气力回复;
    w.连击率 = data.连击率;
    w.防御伤害 = data.防御伤害;
    w.弹尽行为 = data.弹尽行为;
    w.气力伤害 = data.气力伤害;
  }

  // :650-697 附魔增量（前缀 0 无附魔；缺省列按 0 起算——记录按次新建）
  const enchant = EQUIP_ENCHANT[w.前缀];
  if (enchant !== undefined) {
    for (const [key, delta] of Object.entries(enchant)) {
      w[key] = (w[key] ?? 0) + delta;
    }
  }

  // :700 强度加成：+强化度使伤害增加
  w.伤害强化 = (w.伤害强化 ?? 0) + w.强度 * 5;

  return true;
}

/**
 * @GET_EQUIP_NUM（:892-901）：把 w.备注（W:8）里的道具号换算成识别号存进
 * w.存储编号（W:0）。道具号 300+ 段是装备（300+识别号），负数钳 0。
 * @param {object} w 装备记录
 */
function get_equip_num(w) {
  // :896 W:0 = W:8 - 300
  w.存储编号 = w.备注 - 300;
  // :898-899 SIF W:0 < 0 → W:0 = 0
  if (w.存储编号 < 0) {
    w.存储编号 = 0;
  }
}

/**
 * @EQUIP_GET（:868-888）：按 w.存储编号 的识别号把装备道具 +1 入包
 * （道具号 = 300 + 识别号），上限 99。
 * @param {object} w 装备记录
 * @returns {number} RESULT：恒 0（原作 RETURN 0，调用方不读）
 */
function equip_get(w) {
  // :873-874 无效编号直接结束
  if (w.存储编号 < 0) {
    return 0;
  }

  // :876 W:1 = W:0 % 1000 → :878 X = 300 + W:1
  let x = 300 + (w.存储编号 % 1000);
  // :880-881 SIF X < 300 → X = 300（识别号恒 >= 0，原作的死守卫，1:1 保留）
  if (x < 300) {
    x = 300;
  }

  // :883-886 ITEM:X += 1，上限 99
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
