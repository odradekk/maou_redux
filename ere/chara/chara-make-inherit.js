/**
 * @file 后代素质继承：调度骨架与三条继承规则（issue #332 建壳，#384 落真身）。
 *
 * 移植说明（有意偏离既有行为，均注明依据）：
 *
 *   - **素质编号走 Talent.yml 的序号**：按 yml/Talent.yml 的 id 落序号
 *     （私处封印 273、恋母情结 140、恋父情结 141、萝莉控 142、正太控 143、
 *     母性 155、父性 156、人妻 157、男人婆 79、讨厌男人 82、未熟 135、
 *     娇小 100、男人 122、扶她 121）。EX_TALENT:2（后代）与 EX_TALENT:1 另有前缀。
 *
 *   - **私处封印的清零写给当前 TARGET（era_flag.target）而非 child**：调用点
 *     上 TARGET 即新生成的子代，两者等价，保留既有写法。
 *
 *   - **PAIRS 常量表以普通数组承载**，成对展平后按长度的一半遍历。表尾两对
 *     `60,150` 与 `82,143` 保留既有数据——表内 79/82 与 143 同时出现两次不是
 *     手误，重复对只会在第一次命中时决定清哪一侧，第二次再看时已有一侧为 0。
 *
 *   - 随机数经 rand 参数逐层透传（#117：ere 无全局随机序列），缺省均匀随机。
 */

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** PAIRS —— 互斥素质对（展平） */
const PAIRS = [
  10, 12, 11, 13, 14, 16, 15, 17, 17, 18, 20, 23, 21, 23, 22, 23, 20, 63, 21,
  63, 22, 63, 23, 24, 25, 26, 27, 28, 30, 31, 32, 33, 35, 36, 40, 41, 42, 43,
  44, 45, 50, 51, 61, 62, 62, 64, 70, 71, 79, 80, 79, 81, 79, 82, 79, 122, 80,
  81, 80, 82, 81, 82, 99, 100, 101, 102, 103, 104, 105, 106, 103, 122, 104, 122,
  107, 108, 111, 112, 109, 110, 109, 114, 109, 116, 119, 109, 119, 116, 119,
  114, 119, 110, 122, 109, 122, 110, 122, 114, 122, 116, 122, 119, 110, 114,
  110, 116, 114, 116, 121, 122, 153, 154, 99, 263, 153, 122, 154, 122, 130, 122,
  155, 122, 157, 122, 60, 150, 82, 143,
];

/**
 * chara_make_inherit：令角色 child 继承 parent_a 与 parent_b（可选）的素质。
 *
 * 不继承的段：崩坏、口上、调教素质、种族、职业、经历（排除项见下方两处
 * continue 的判定行）。
 *
 * @param {number} child 子代角色 ID
 * @param {number} parent_a 第一亲本角色 ID
 * @param {number} [parent_b=-1] 第二亲本角色 ID
 * @param {(n: number) => number} [rand] 随机源（透传）
 * @returns {number} 子代角色 ID
 */
function chara_make_inherit(
  child,
  parent_a,
  parent_b = -1,
  rand = default_rand,
) {
  if (parent_a < 0) {
    return child;
  }

  // 性格／性への関心／乙女心／体質／技術／潔癖度／正直度 等
  for (let index = 10; index < 153; index += 1) {
    // 特殊性癖、扶她-疯狂、母乳体质-正太控、爱慕
    if (
      (index >= 74 && index <= 78) ||
      (index >= 121 && index <= 123) ||
      (index >= 130 && index <= 143) ||
      index === 85
    ) {
      continue;
    }
    cmi_settalent(index, child, parent_a, parent_b, rand);
  }

  // 扶她 || 男人 || !处女 → 私处封印 = 0
  if (
    era.get(`talent:${child}:121`) || // TALENT:扶她
    era.get(`talent:${child}:122`) || // TALENT:男人
    !era.get(`talent:${child}:0`) // TALENT:处女
  ) {
    // 写当前 TARGET（era_flag.target），见文件头「移植说明」条
    chara(era_flag.target).chara.私处封印 = 0;
  }

  // 恋母情结等
  cmi_mom_complex(child, parent_a, rand);
  if (parent_b >= 0) {
    cmi_mom_complex(child, parent_b, rand);
  }

  // 戦闘技能（战术~俊足~小人体型）
  for (let index = 240; index < 264; index += 1) {
    // 恶魔xx、魔之刻印
    if ((index >= 244 && index <= 247) || index === 254) {
      continue;
    }
    cmi_settalent(index, child, parent_a, parent_b, rand);
  }

  // 能力者
  for (let index = 275; index < 280; index += 1) {
    cmi_settalent(index, child, parent_a, parent_b, rand);
  }

  // 外貌
  for (let index = 300; index < 314; index += 1) {
    cmi_settalent(index, child, parent_a, parent_b, rand);
  }

  // 精英特技——只在亲本自身有该素质时逐项继承，且不再带第二亲本
  if (era.get(`talent:${parent_a}:220`)) {
    // TALENT:精英
    for (let index = 470; index < 489; index += 1) {
      if (era.get(`talent:${parent_a}:${index}`)) {
        cmi_settalent(index, child, parent_a, -1, rand);
      }
    }
  }
  if (parent_b >= 0 && era.get(`talent:${parent_b}:220`)) {
    for (let index = 470; index < 489; index += 1) {
      if (era.get(`talent:${parent_b}:${index}`)) {
        cmi_settalent(index, child, parent_b, -1, rand);
      }
    }
  }

  cmi_conflict_check(child, rand); // 冲突检查

  return child;
}

/**
 * cmi_settalent：按亲本构成选一档概率继承单项素质。
 *
 * 三档：单亲或魔王为父 3/4、魔王为母 2/3、双亲 15/16（命中后再掷选亲本）。
 *
 * @param {number} index 素质序号
 * @param {number} child 子代角色 ID
 * @param {number} parent_a 第一亲本
 * @param {number} [parent_b=-1] 第二亲本
 * @param {(n: number) => number} [rand] 随机源
 * @returns {void}
 */
function cmi_settalent(
  index,
  child,
  parent_a,
  parent_b = -1,
  rand = default_rand,
) {
  if (parent_b <= 0) {
    // 单亲，或魔王为父 → child 有 3/4 概率继承 parent_a 的素质
    if (rand(4)) {
      era.set(
        `talent:${child}:${index}`,
        era.get(`talent:${parent_a}:${index}`),
      );
    }
  } else if (parent_a === 0) {
    // 魔王为母 → child 有 2/3 概率继承 parent_b 的素质
    if (rand(3)) {
      era.set(
        `talent:${child}:${index}`,
        era.get(`talent:${parent_b}:${index}`),
      );
    }
  } else if (rand(16)) {
    // 双亲 → child 有 15/16 概率继承 parent_a 或 parent_b 的素质，
    // rand(2) 非零时取 parent_a 侧（第一亲本）。
    const value = rand(2)
      ? era.get(`talent:${parent_a}:${index}`)
      : era.get(`talent:${parent_b}:${index}`);
    era.set(`talent:${child}:${index}`, value);
  }
}

/**
 * cmi_mom_complex：按亲本的性别观与性格设置孩子的恋母/恋父一类情结。
 *
 * @param {number} child 子代角色 ID
 * @param {number} parent 亲本角色 ID
 * @param {(n: number) => number} [rand] 随机源
 * @returns {void}
 */
function cmi_mom_complex(child, parent, rand = default_rand) {
  const child_male = (era.get(`talent:${child}:122`) || 0) !== 0; // TALENT:男人
  const child_futa = (era.get(`talent:${child}:121`) || 0) !== 0; // TALENT:扶她

  if (era.get(`talent:${parent}:82`) && (child_male || child_futa)) {
    // 母亲讨厌男人，孩子是男人——不设情结
  } else if (era.get(`talent:${parent}:79`) && !child_male && !child_futa) {
    // 母亲讨厌女人，孩子是女人——不设情结
  } else {
    // 母性
    if (era.get(`talent:${parent}:155`) && rand(2)) {
      era.set(`talent:${child}:140`, 1); // 恋母情结
    }
    // 人妻（rand(3) 恰 == 1 才算命中，与另几处 rand(2) 的真值判定不同）
    if (era.get(`talent:${parent}:157`) && rand(3) === 1) {
      era.set(`talent:${child}:140`, 1); // 恋母情结
    }
    // 父性
    if (era.get(`talent:${parent}:156`) && rand(2)) {
      era.set(`talent:${child}:141`, 1); // 恋父情结
    }
    // 未熟或娇小 → 按亲本性别分派正太控/萝莉控
    const parent_male = (era.get(`talent:${parent}:122`) || 0) !== 0; // TALENT:男人
    const parent_futa = (era.get(`talent:${parent}:121`) || 0) !== 0; // TALENT:扶她
    if (
      (era.get(`talent:${parent}:135`) || era.get(`talent:${parent}:100`)) &&
      rand(3) === 1
    ) {
      if (parent_male || parent_futa) {
        era.set(`talent:${child}:143`, 1); // 正太控（父亲未熟娇小）
      } else {
        era.set(`talent:${child}:142`, 1); // 萝莉控（母亲未熟娇小）
      }
    }
  }
}

/**
 * cmi_conflict_check：按 PAIRS 表逐对检查互斥素质，
 * 两侧都在时随机清掉一侧。
 *
 * @param {number} child 子代角色 ID
 * @param {(n: number) => number} [rand] 随机源
 * @returns {number} 子代角色 ID
 */
function cmi_conflict_check(child, rand = default_rand) {
  for (let pair = 0; pair < PAIRS.length / 2; pair += 1) {
    const left = PAIRS[pair * 2];
    const right = PAIRS[pair * 2 + 1];
    if (
      era.get(`talent:${child}:${left}`) &&
      era.get(`talent:${child}:${right}`)
    ) {
      // rand(2) 非零清 left（本对的前一项），否则清 right（后一项）
      if (rand(2)) {
        era.set(`talent:${child}:${left}`, 0);
      } else {
        era.set(`talent:${child}:${right}`, 0);
      }
    }
  }
  return child;
}

module.exports = {
  chara_make_inherit,
  cmi_settalent,
  cmi_mom_complex,
  cmi_conflict_check,
};
