/**
 * @file 后代素质继承的调度骨架（issue #332）。
 *
 * 源: target/ERB/キャラ関数/CHARA_MAKE_INHERIT.ERB
 *       @CHARA_MAKE_INHERIT（:4-71）
 *
 * 三个被调函数不在本票范围，保留可见存根。
 */

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const { stub_line } = require('#/utils/stub-line');

const STUBBED_CALLS = [
  'CMI_MOM_COMPLEX',
  'CMI_SETTALENT',
  'CMI_CONFLICT_CHECK',
];

function cmi_settalent(index, child, parent_a, parent_b = -1) {
  stub_line(
    'CMI_SETTALENT',
    `素质 ${index}：角色 ${child} 继承 ${parent_a}/${parent_b}`,
    '随角色继承细节票',
  );
}

function cmi_mom_complex(child, parent) {
  stub_line(
    'CMI_MOM_COMPLEX',
    `角色 ${child} 与亲本 ${parent}`,
    '随角色继承细节票',
  );
}

function cmi_conflict_check(child) {
  stub_line('CMI_CONFLICT_CHECK', `角色 ${child}`, '随角色继承细节票');
}

/**
 * @CHARA_MAKE_INHERIT：遍历可继承素质，并委托范围外的继承规则与冲突检查。
 * @param {number} child 子代角色 ID
 * @param {number} parent_a 第一亲本角色 ID
 * @param {number} [parent_b=-1] 第二亲本角色 ID
 * @returns {number} 子代角色 ID
 */
function chara_make_inherit(child, parent_a, parent_b = -1) {
  if (parent_a < 0) {
    return child; // :11-12
  }

  const inherit = (index, first = parent_a, second = parent_b) =>
    cmi_settalent(index, child, first, second);

  for (let index = 10; index < 153; index += 1) {
    if (
      (index >= 74 && index <= 78) ||
      index === 85 ||
      (index >= 121 && index <= 123) ||
      (index >= 130 && index <= 143)
    ) {
      continue; // :17-18 特殊性癖/身体特征等不继承
    }
    inherit(index);
  }

  if (
    era.get(`talent:${child}:121`) || // TALENT:扶她
    era.get(`talent:${child}:122`) || // TALENT:男人
    !era.get(`talent:${child}:0`) // TALENT:处女
  ) {
    // :24 省略角色号的 TALENT:私处封印 写当前 TARGET，而非 L_A。
    chara(era_flag.target).chara.私处封印 = 0;
  }

  cmi_mom_complex(child, parent_a);
  if (parent_b >= 0) {
    cmi_mom_complex(child, parent_b);
  }

  for (let index = 240; index < 264; index += 1) {
    if ((index >= 244 && index <= 247) || index === 254) {
      continue;
    }
    inherit(index);
  }
  for (let index = 275; index < 280; index += 1) {
    inherit(index);
  }
  for (let index = 300; index < 314; index += 1) {
    inherit(index);
  }

  if (era.get(`talent:${parent_a}:220`)) {
    for (let index = 470; index < 489; index += 1) {
      if (era.get(`talent:${parent_a}:${index}`)) {
        inherit(index, parent_a, -1);
      }
    }
  }
  if (parent_b >= 0 && era.get(`talent:${parent_b}:220`)) {
    for (let index = 470; index < 489; index += 1) {
      if (era.get(`talent:${parent_b}:${index}`)) {
        inherit(index, parent_b, -1);
      }
    }
  }

  cmi_conflict_check(child);
  return child;
}

module.exports = {
  STUBBED_CALLS,
  chara_make_inherit,
  cmi_settalent,
  cmi_mom_complex,
  cmi_conflict_check,
};
