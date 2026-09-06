/**
 * @file 家族检索与出生关系入口（issue #333，阶段 5a L2）。
 *
 * 源: target/ERB/キャラ関数/CHARA_FAMILY.ERB  @SEARCH_FAMILY（:12-355）
 *     target/ERB/關係設置/RELATION_FAMILY.ERB
 *       @FAMILY_BIRTHTO_MOM（:328-337）、@FAMILY_BIRTHTO_DAD（:343-353）
 *
 * SEARCH_FAMILY 的 CFLAG:605/601/610 是十进制压缩数据：个位为关系，
 * 十位为成为勇者前的生活，千位为性格（TALENT-160），十万位起为家族
 * 构成。候选遍历使用 getAddedCharacters()，对应 Emuera 的 0..CHARANUM。
 */

'use strict';

const era = require('#/era-electron');
const { stub_line } = require('#/utils/stub-line');

const STUBBED_CALLS = ['RELATION_REBUILD', 'RF_JOINTO', 'RF_SETBOTH'];

function digit(value, place) {
  return Math.trunc((value % (place * 10)) / place);
}

function is_former_male(cid) {
  const male = (era.get(`talent:${cid}:122`) || 0) !== 0; // TALENT:122 男人
  const changed = (era.get(`cflag:${cid}:70`) || 0) !== 0; // CFLAG:70 已性转
  return male !== changed;
}

function relation_fields(cid, kind) {
  if (kind === 'MARRIAGE') {
    return {
      data: era.get(`cflag:${cid}:601`) || 0, // 结婚对象压缩数据
      name: era.get(`cflag:${cid}:609`) || 0, // 结婚对象名字编号
    };
  }
  if (kind === 'LOVE') {
    return {
      data: era.get(`cflag:${cid}:610`) || 0, // 恋人压缩数据
      name: era.get(`cflag:${cid}:608`) || 0, // 恋人名字编号
    };
  }
  return {
    data: era.get(`cflag:${cid}:605`) || 0, // 血缘关系压缩数据
    name: era.get(`cflag:${cid}:604`) || 0, // 血缘名字编号
  };
}

function sibling_counts_match(search_type, source_family, target_family, male) {
  const source = {
    older_brother: digit(source_family, 1_000_000),
    older_sister: digit(source_family, 100_000),
    younger_brother: digit(source_family, 100_000_000),
    younger_sister: digit(source_family, 10_000_000),
  };
  const target = {
    older_brother: digit(target_family, 1_000_000),
    older_sister: digit(target_family, 100_000),
    younger_brother: digit(target_family, 100_000_000),
    younger_sister: digit(target_family, 10_000_000),
  };

  if (search_type === 1) source.older_brother -= 1;
  if (search_type === 2) source.older_sister -= 1;
  if (search_type === 3) source.younger_brother -= 1;
  if (search_type === 4) source.younger_sister -= 1;
  if (male && (search_type === 3 || search_type === 4)) {
    target.older_brother -= 1;
  }
  if (male && (search_type === 1 || search_type === 2)) {
    target.younger_brother -= 1;
  }
  if (!male && (search_type === 3 || search_type === 4)) {
    target.older_sister -= 1;
  }
  if (!male && (search_type === 1 || search_type === 2)) {
    target.younger_sister -= 1;
  }
  return Object.keys(source).every((key) => source[key] === target[key]);
}

function child_parent_counts_match(
  search_type,
  source_family,
  target_family,
  male,
) {
  const source_sons =
    digit(source_family, 1_000_000) +
    digit(source_family, 100_000_000) +
    (male ? 1 : 0);
  const source_daughters =
    digit(source_family, 100_000) +
    digit(source_family, 10_000_000) +
    (male ? 0 : 1);
  return (
    digit(target_family, 1_000) === source_sons &&
    digit(target_family, 100) === source_daughters &&
    (search_type === 5 || search_type === 6)
  );
}

function parent_child_counts_match(search_type, source_family, target_family) {
  const target_siblings =
    digit(target_family, 1_000_000) +
    digit(target_family, 100_000_000) +
    (search_type === 7 ? 1 : 0);
  const target_sisters =
    digit(target_family, 100_000) +
    digit(target_family, 10_000_000) +
    (search_type === 8 ? 1 : 0);
  return (
    digit(source_family, 1_000) === target_siblings &&
    digit(source_family, 100) === target_sisters
  );
}

/** @SEARCH_FAMILY（:12-355）：按压缩家族照检索在场角色。 */
function search_family(cid, kind = 'FAMILY') {
  let found = -1;
  const added = era.getAddedCharacters();

  // TALENT:165/171 = 村娘 A/B，两者不走压缩家族照，直接互找。
  if (era.get(`talent:${cid}:165`)) {
    for (const candidate of added) {
      if (era.get(`talent:${candidate}:171`)) found = candidate;
    }
    return found;
  }
  if (era.get(`talent:${cid}:171`)) {
    for (const candidate of added) {
      if (era.get(`talent:${candidate}:165`)) found = candidate;
    }
    return found;
  }

  const char_name = era.get(`cflag:${cid}:6`) || 0; // CFLAG:6 名字编号
  const source_relation = relation_fields(cid, kind);
  const source_family = era.get(`talent:${cid}:320`) || 0; // 家族构成
  const search_type = source_relation.data % 10;
  if (search_type === 0 && kind === 'FAMILY') return found;

  for (const candidate of added) {
    const target_relation = relation_fields(candidate, kind);
    if (target_relation.data === 0 || candidate === cid) continue;
    if (candidate === 0 && source_relation.name !== 0) continue;

    if (cid === 0 && kind === 'MARRIAGE') {
      if (target_relation.data === 901) return candidate;
      continue;
    }
    if (target_relation.name !== char_name) continue;

    const former_life = Math.trunc((source_relation.data % 1_000) / 10);
    const elite = (era.get(`talent:${candidate}:220`) || 0) !== 0;
    if ((era.get(`talent:${candidate}:315`) || 0) !== former_life && !elite) {
      continue;
    }
    const personality =
      Math.trunc((source_relation.data % 100_000) / 1_000) + 160;
    if (candidate !== 0 && !era.get(`talent:${candidate}:${personality}`)) {
      continue;
    }

    const encoded_family = Math.trunc(source_relation.data / 100_000);
    const target_family = era.get(`talent:${candidate}:320`) || 0;
    if (encoded_family === target_family && kind === 'MARRIAGE')
      return candidate;
    if (encoded_family === target_family && kind === 'LOVE') return candidate;
    if (kind === 'LOVE' || target_family % 10 === 0) continue;

    const male = is_former_male(cid);
    if (search_type === 1 || search_type === 2) {
      const needed = male
        ? digit(target_family, 100_000_000)
        : digit(target_family, 10_000_000);
      if (needed === 0) continue;
    } else if (search_type === 3 || search_type === 4) {
      const needed = male
        ? digit(target_family, 1_000_000)
        : digit(target_family, 100_000);
      if (needed === 0) continue;
    } else if (search_type === 5 || search_type === 6) {
      const needed = male
        ? digit(target_family, 1_000)
        : digit(target_family, 100);
      if (needed === 0) continue;
    }

    if (
      (search_type > 0 &&
        search_type < 5 &&
        sibling_counts_match(
          search_type,
          source_family,
          target_family,
          male,
        )) ||
      ((search_type === 5 || search_type === 6) &&
        child_parent_counts_match(
          search_type,
          source_family,
          target_family,
          male,
        )) ||
      ((search_type === 7 || search_type === 8) &&
        parent_child_counts_match(search_type, source_family, target_family))
    ) {
      return candidate;
    }
    if (search_type < 1 || search_type > 8) return found;
  }
  return found;
}

function relation_rebuild() {
  stub_line('RELATION_REBUILD', '关系索引重建', '#349');
  return 0;
}

function rf_join_to(child, parent, type) {
  stub_line('RF_JOINTO', `加入家庭(${child},${parent},${type})`, '#349');
  return 0;
}

function rf_set_both(child, parent, type) {
  stub_line('RF_SETBOTH', `双方关系登记(${child},${parent},${type})`, '#349');
  return 0;
}

function family_birth_to_mom(child, mother) {
  if (mother < 0) {
    throw new Error(
      `无效操作：FAMILY_BIRTHTO_MOM(${child},${mother}) 狂王良犬等（L_B<0）不可能作为母亲`,
    );
  }
  relation_rebuild();
  return rf_join_to(child, mother, 6);
}

function family_birth_to_dad(child, father) {
  if (father < 0) return rf_set_both(child, father, 5);
  relation_rebuild();
  return rf_join_to(child, father, 5);
}

module.exports = {
  STUBBED_CALLS,
  search_family,
  family_birth_to_mom,
  family_birth_to_dad,
};
