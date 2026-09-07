/**
 * @file 家族关系设置（issue #349，阶段 5a L18）。
 *
 * 源: target/ERB/キャラ関数/CHARA_FAMILY.ERB  @SEARCH_FAMILY（:12-355）
 *     target/ERB/關係設置/RELATION.ERB  全函数（:8-301）
 *     target/ERB/關係設置/RELATION_FAMILY.ERB  全函数（:24-1011）
 *
 * SEARCH_FAMILY 的 CFLAG:605/601/610 是十进制压缩数据：个位为关系，
 * 十位为成为勇者前的生活，千位为性格（TALENT-160），十万位起为家族
 * 构成。候选遍历使用 getAddedCharacters()，对应 Emuera 的 0..CHARANUM。
 *
 * 原作 C_RELATION 的横轴是会随增删排序而移动的“加入序号”，所以需要搬列
 * 重建。ere 的角色 ID 稳定，不存在这类错位；c_relation 仍保存对角 NID，
 * 检查/重建接口保留，但修复只需按当前已加入 ID 重写对角标识。
 */

'use strict';

const era = require('#/era-electron');

const STUBBED_CALLS = [];
const default_rand = (n) => Math.floor(Math.random() * n);
const int = Math.trunc;

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

function nid(cid) {
  // @NID：特殊角色的名字编号固定为 10000 + NO；ere 的 ID 即原作 NO。
  if (cid === 0 || (cid >= 17 && cid <= 40)) {
    era.set(`cflag:${cid}:6`, 10_000 + cid); // CFLAG:6 = 名字编号
  }
  return era.get(`cflag:${cid}:6`) || 0;
}

function r_get(a, b) {
  const table = b >= 0 ? 'c_relation' : 'c_relation_sub';
  return era.get(`${table}:${a}:${Math.abs(b)}`) || 0;
}

function r_set(a, b, value) {
  const table = b >= 0 ? 'c_relation' : 'c_relation_sub';
  era.set(`${table}:${a}:${Math.abs(b)}`, value);
}

function relation_needs_rebuild(cid) {
  const added = era.getAddedCharacters();
  if (cid !== undefined) return r_get(cid, cid) !== nid(cid);
  return added.some((id) => r_get(id, id) !== nid(id));
}

/** @RELATION_REBUILD（RELATION.ERB:135-194）：修复当前角色的对角 NID。 */
function relation_rebuild() {
  for (const cid of era.getAddedCharacters()) r_set(cid, cid, nid(cid));
  return 0;
}

function relation_get(a, b) {
  if (b < 0) return r_get(a, b);
  if (relation_needs_rebuild(a) || relation_needs_rebuild(b))
    relation_rebuild();
  return r_get(a, b);
}

function relation_set(a, b, value) {
  if (b >= 0 && (relation_needs_rebuild(a) || relation_needs_rebuild(b))) {
    relation_rebuild();
  }
  r_set(a, b, value);
}

function relation_rename_rebuild(cid) {
  if (!relation_needs_rebuild(cid)) return 0;
  return relation_rebuild();
}

function relation_check_rebuild(cid) {
  if (!relation_needs_rebuild(cid)) return 0;
  relation_rebuild();
  return 1;
}

function relation_swap_rebuild(a, b) {
  if (a < 0 || b < 0) return -1;
  for (const cid of era.getAddedCharacters()) {
    const a_value = r_get(cid, a);
    r_set(cid, a, r_get(cid, b));
    r_set(cid, b, a_value);
  }
  if (relation_needs_rebuild()) relation_rebuild();
  return 0;
}

function r_check(cid = 0) {
  return relation_needs_rebuild(cid) ? 1 : 0;
}

function r_chara_to_name(cid) {
  if (cid >= 0) return era.get(`callname:${cid}:-2`) || '';
  return { '-2': '野狗', '-3': '怪物', '-4': '狂王' }[cid] || '不明';
}

async function relation_debugprint() {
  const added = era.getAddedCharacters();
  for (const cid of added) {
    const parts = [
      {
        content: String(`${cid}>`).padEnd(5, ' '),
        color: 'rgb(100, 255, 255)',
      },
    ];
    for (const other of added) {
      const value = r_get(cid, other);
      const part = { content: String(value).padEnd(5, ' ') };
      if (value === 0) part.color = 'gray';
      if (value === -1) part.color = 'rgb(255, 100, 100)';
      parts.push(part);
    }
    era.print(parts);
    era.println();
  }
  await era.waitAnyKey();
}

function f_type_reverse(type, is_male = 0) {
  let reverse = 0;
  if (type === 1 || type === 2) reverse = 4;
  else if (type === 3 || type === 4) reverse = 2;
  else if (type === 5 || type === 6) reverse = 8;
  else if (type === 7 || type === 8) reverse = 6;
  return is_male && reverse ? reverse - 1 : reverse;
}

const SHORT_TYPE_NAMES = ['无', '兄', '姊', '弟', '妹', '父', '母', '儿', '娘'];
const TYPE_NAMES = [
  '无',
  '哥哥',
  '姐姐',
  '弟弟',
  '妹妹',
  '父亲',
  '母亲',
  '儿子',
  '女儿',
];

function f_type_to_str(type) {
  return SHORT_TYPE_NAMES[type] ?? '不明';
}

function f_type_to_str2(type) {
  return TYPE_NAMES[type] ?? '不明';
}

function rf_get(a, b) {
  return r_get(a, b) % 10;
}

function rf_set_both(a, b, type) {
  if (a === b) {
    throw new Error(
      `无效的操作：RF_SETBOTH(${a},${b},${type}) 不能对角色自己设置家族关系`,
    );
  }
  r_set(a, b, int(r_get(a, b) / 10) * 10 + (type % 10));
  if (b >= 0) {
    const reverse = f_type_reverse(type);
    r_set(b, a, int(r_get(b, a) / 10) * 10 + (reverse % 10));
  }
  return 0;
}

function relation_matches(actual, type, ignore_gender, ignore_old_young) {
  return (
    (type < 0 && actual > 0) ||
    actual === type ||
    (type > 0 &&
      ignore_gender &&
      int((actual + 1) / 2) === int((type + 1) / 2)) ||
    (type > 0 &&
      ignore_old_young &&
      int((actual + 3) / 4) === int((type + 3) / 4))
  );
}

function relation_candidates(cid) {
  return [
    ...era.getAddedCharacters().filter((other) => other !== cid),
    -1,
    -2,
    -3,
    -4,
    -5,
    -6,
    -7,
    -8,
    -9,
  ];
}

function rf_all(
  cid,
  type = -1,
  return_type = false,
  ignore_gender = 1,
  ignore_old_young = 0,
) {
  if (relation_needs_rebuild()) relation_rebuild();
  const result = [];
  for (const other of relation_candidates(cid)) {
    const actual = rf_get(cid, other);
    if (relation_matches(actual, type, ignore_gender, ignore_old_young)) {
      result.push(return_type ? [other, actual] : other);
    }
  }
  return result;
}

function rf_count(cid, type = -1, ignore_gender = 1, ignore_old_young = 0) {
  return rf_all(cid, type, false, ignore_gender, ignore_old_young).length;
}

function rf_first(cid, type = -1, ignore_gender = 1, ignore_old_young = 0) {
  for (const other of era.getAddedCharacters()) {
    if (
      other !== cid &&
      relation_matches(
        rf_get(cid, other),
        type,
        ignore_gender,
        ignore_old_young,
      )
    ) {
      return other;
    }
  }
  for (let external = 1; external < 10; external += 1) {
    if (
      relation_matches(
        rf_get(cid, -external),
        type,
        ignore_gender,
        ignore_old_young,
      )
    ) {
      // 原作这里返回循环变量 L_B，而不是实际查询的 -L_B；保留此行为。
      return external;
    }
  }
  return -99;
}

function rf_join_to(a, b, type, is_father = 0, rand = default_rand) {
  if (a < 0)
    throw new Error(
      `无效的操作：RF_JOINTO(${a},${b},${type}) 狂王良犬等不能加入其它家庭`,
    );
  if (b < 0)
    throw new Error(
      `无效的操作：RF_JOINTO(${a},${b},${type}) 不能加入狂王良犬等的家庭`,
    );
  let count = 0;
  if (type === 5 || type === 6) {
    const children = rf_all(b, 8);
    for (const child of children) {
      if (child === a) continue;
      const age_a = era.get(`cflag:${a}:451`) || 0; // CFLAG:451 = 年龄
      const age_child = era.get(`cflag:${child}:451`) || 0;
      const sibling_type =
        age_a === 0 || age_a === age_child
          ? rand(2) * 2 + 2
          : age_a > age_child
            ? 4
            : 2;
      rf_set_both(a, child, sibling_type);
    }
    rf_set_both(a, b, type);
    return children.length + 1;
  }
  if (era.get(`talent:${a}:220`)) {
    throw new Error(
      `无效的操作：RF_JOINTO(${a},${b},${type}) 只能将生下的孩子加入到父母所在家族`,
    );
  }
  if (type >= 1 && type <= 4) {
    const parents = rf_all(b, 6, true);
    for (const [parent, parent_type] of parents) {
      if (parent !== a) {
        rf_set_both(a, parent, parent_type);
      }
    }
    // 原作把 RF_ALL 返回的成员数又除以二；返回计数虽有缺陷，仍照原样保留。
    count += int(parents.length / 2);
    for (const sibling of rf_all(b, 2, false, 1, 1)) {
      if (sibling === a) continue;
      const age_a = era.get(`cflag:${a}:451`) || 0;
      const age_sibling = era.get(`cflag:${sibling}:451`) || 0;
      const sibling_type =
        age_a === 0 || age_a === age_sibling
          ? rand(2) * 2 + 2
          : age_a > age_sibling
            ? 4
            : 2;
      rf_set_both(a, sibling, sibling_type);
      count += 1;
    }
    rf_set_both(a, b, type);
    return count + 1;
  }
  if (type === 7 || type === 8) {
    void (is_father % 2); // 原作形参保留，但后续未使用。
    const siblings = rf_all(b, 2, false, 1, 1);
    for (const sibling of siblings) {
      if (sibling === a) continue;
      rf_set_both(a, sibling, 8);
    }
    rf_set_both(a, b, type);
    return siblings.length + 1;
  }
  return 0;
}

function family_get(a, b) {
  return relation_get(a, b) % 10;
}

function family_set_both(a, b, type) {
  relation_get(a, b);
  return rf_set_both(a, b, type);
}

function family_join_to(a, b, type, rand = default_rand) {
  relation_rebuild();
  return rf_join_to(a, b, type, 0, rand);
}

function family_birth_to_mom(child, mother, rand = default_rand) {
  if (mother < 0) {
    throw new Error(
      `无效操作：FAMILY_BIRTHTO_MOM(${child},${mother}) 狂王良犬等（L_B<0）不可能作为母亲`,
    );
  }
  relation_rebuild();
  return rf_join_to(child, mother, 6, 0, rand);
}

function family_birth_to_dad(child, father, rand = default_rand) {
  if (father < 0) return rf_set_both(child, father, 5);
  relation_rebuild();
  return rf_join_to(child, father, 5, 0, rand);
}

function char_age_expect(cid) {
  let age = 0;
  const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
  if (talent(99)) age += 1; // 魁梧
  if (talent(100)) age -= 4; // 娇小；原作两条 SIF 均命中
  if (talent(109)) age -= 1; // 贫乳
  if (talent(110)) age += 1; // 巨乳
  if (talent(114)) age += 1; // 爆乳
  if (talent(119)) age += 1; // 超乳
  if (talent(116)) age -= 1; // 绝壁
  if (talent(132)) age -= 2; // 幼稚
  if (talent(135)) age -= 2; // 未熟
  if (talent(140) || talent(141)) age -= 2; // 恋母/恋父情结
  if (talent(142) || talent(143)) age += 2; // 萝莉控/正太控
  if (talent(157)) age += 6; // 人妻
  if (talent(248)) age += 1; // 肌肉型
  const experience = talent(315); // TALENT:315 = 成为勇者前的经历
  if ([1, 6, 7, 20].includes(experience)) age -= 4;
  else if ([11, 12].includes(experience)) age -= 1;
  else if ([2, 19].includes(experience)) age += 4;
  else if (experience === 21) age += 6;
  if (talent(316) === 6) age += 2; // 经历无尽悲伤后
  if (talent(317) === 4 || talent(317) === 11) age += 2; // 故乡恋人/憧憬对象
  if (era.get(`exp:${cid}:60`))
    age += 6; // 生育经验
  else if (era.get(`exp:${cid}:5`))
    age += 4; // 性交经验
  else if (era.get(`exp:${cid}:10`))
    age += 2; // 自慰经验
  else if (!talent(0) && !talent(1)) age += 1; // 非处女/童贞
  return age;
}

function f_is_same_race(a, b) {
  const elite_a = a >= 201 && a <= 210;
  const elite_b = b >= 201 && b <= 210;
  if (elite_a && elite_b) return a === b;
  if (elite_a || elite_b) return false;
  let race_a = era.get(`talent:${a}:314`) || 0; // TALENT:314 = 种族
  let race_b = era.get(`talent:${b}:314`) || 0;
  if (race_a !== 9 && race_b !== 9) return race_a === race_b;
  if (race_a === 9) race_a = era.get(`talent:${a}:321`) || 0; // TALENT:321 = 原种族
  if (race_b === 9) race_b = era.get(`talent:${b}:321`) || 0;
  return race_a === race_b;
}

function f_is_close_experience(a, b) {
  if (a === b || a === 0 || b === 0) return true;
  const religious = [11, 13, 14];
  if ((a === 2 || b === 2) && (religious.includes(a) || religious.includes(b)))
    return false;
  const noble = [8, 12];
  const student = [1, 2, 19];
  const priest = [11, 13, 14, 15];
  const commoner = [3, 4, 10, 16, 18, 21];
  const poor = [5, 6, 7, 9, 20];
  if (noble.includes(a)) return noble.includes(b) || student.includes(b);
  if (student.includes(a))
    return student.includes(b) || priest.includes(b) || commoner.includes(b);
  if (priest.includes(a)) return priest.includes(b) || commoner.includes(b);
  if (commoner.includes(a)) return commoner.includes(b);
  if (poor.includes(a)) return poor.includes(b);
  return false;
}

function nid_get_type(value) {
  if (value > 1_000_000_000) return 2;
  if (value < 200 || value >= 2000) return 1;
  if (value < 1000 || value >= 3000) return 0;
  return 1;
}

function f_check_relevant(a, b) {
  if (!f_is_same_race(a, b)) return 0;
  if (
    Math.min(1, Math.max(0, nid_get_type(nid(a)))) !==
    Math.min(1, Math.max(0, nid_get_type(nid(b))))
  )
    return 0;
  const experience = era.get(`talent:${a}:315`) || 0;
  if (!f_is_close_experience(experience, era.get(`talent:${b}:315`) || 0))
    return 0;
  for (const member of rf_all(a)) {
    if (
      !f_is_close_experience(experience, era.get(`talent:${member}:315`) || 0)
    )
      return 0;
  }
  return 1;
}

function family_register_slave(cid, rand = default_rand) {
  const expected_age = char_age_expect(cid);
  relation_rebuild();
  for (const other of era.getAddedCharacters()) {
    if (other === cid || other === 0) continue;
    if (era.get(`talent:${other}:220`)) continue; // 后代
    if (era.get(`talent:${other}:165`) || era.get(`talent:${other}:171`))
      continue; // 村娘 A/B
    if (other >= 17 && other <= 40) continue;
    if (!f_check_relevant(cid, other) || rf_count(other) >= 2) continue;
    const other_age = char_age_expect(other);
    const difference = other_age - expected_age;
    let type = 0;
    // 分支顺序忠实保留原作：其中男性分支会被前面的无性别分支遮蔽。
    if (difference > 10 && era.get(`exp:${other}:60`) && expected_age < 0) {
      const child_type = era.get(`talent:${cid}:122`) ? 7 : 8;
      if (rf_count(other, child_type) <= 0) type = 6;
    } else if (
      difference > 10 &&
      era.get(`talent:${other}:122`) &&
      expected_age < 0 &&
      era.get(`exp:${other}:5`)
    ) {
      const child_type = era.get(`talent:${cid}:122`) ? 7 : 8;
      if (rand(4) === 0 || rf_count(other, child_type) <= 0) type = 5;
    } else if (difference < -10 && era.get(`exp:${cid}:60`) && other_age < 0) {
      if (rf_count(other, 6) <= 0) type = 8;
    } else if (
      difference < -10 &&
      era.get(`exp:${cid}:5`) &&
      other_age < 0 &&
      era.get(`talent:${cid}:122`)
    ) {
      if (!(rf_count(other, 5) > 0 && rand(4) !== 0)) type = 8;
    } else if (difference > 1) {
      const younger_type = era.get(`talent:${cid}:122`) ? 3 : 4;
      if (rf_count(other, younger_type) <= 0) type = 2;
    } else if (difference < -1) {
      const older_type = era.get(`talent:${cid}:122`) ? 1 : 2;
      if (rf_count(other, older_type) <= 0) type = 4;
    }
    if (type) {
      rf_join_to(cid, other, type, 0, rand);
      return [other, type];
    }
  }
  return [0, 0];
}

function family_register(cid, rand = default_rand) {
  if (cid === 0 || era.get(`talent:${cid}:220`)) return [0, 0];
  const added = era.getAddedCharacters();
  if (era.get(`talent:${cid}:165`)) {
    const other = added.find((id) => era.get(`talent:${id}:171`)) ?? -1;
    if (other >= 0) family_set_both(cid, other, 2);
    return [other, 2];
  }
  if (era.get(`talent:${cid}:171`)) {
    const other = added.find((id) => era.get(`talent:${id}:165`)) ?? -1;
    if (other >= 0) family_set_both(cid, other, 4);
    return [other, 4];
  }
  if (cid >= 17 && cid <= 40) return [0, 0];
  relation_rebuild();
  return rf_count(cid) > 0 ? [0, 0] : family_register_slave(cid, rand);
}

function family_print_info(cid) {
  relation_rebuild();
  let displayed = 0;
  let total = 0;
  for (const [parent, type] of rf_all(cid, 6, true)) {
    total += 1;
    era.print(`[${f_type_to_str(type)}：`);
    era.printButton(r_chara_to_name(parent), 15_000 + parent);
    era.print(']');
    displayed += 1;
  }
  for (const [label, members] of [
    ['手足', rf_all(cid, 2, false, 1, 1)],
    ['子女', rf_all(cid, 8)],
  ]) {
    total += members.length;
    if (!members.length) continue;
    era.print(`[${label}：`);
    for (const [index, member] of members.entries()) {
      if (index > 0 && displayed >= 6) {
        era.print('等');
        break;
      }
      if (index > 0) era.print(' ');
      era.printButton(r_chara_to_name(member), 15_000 + member);
      displayed += 1;
    }
    era.print(']');
  }
  if (displayed > 0) era.println();
  return { displayed, total };
}

function family_info(cid) {
  relation_rebuild();
  void ((era.get(`talent:${cid}:320`) || 0) % 10);
  return 0;
}

function dec_get_bit(number, bit) {
  return int(number / 10 ** (bit - 1)) % 10;
}

function dec_set_bit(number, bit, value) {
  const place = 10 ** (bit - 1);
  // 忠实保留原式：高位没有乘回 place * 10。
  return {
    number: int(number / place / 10) + (value % 10) * place + (number % place),
    value,
  };
}

function dec_bit_add(number, bit, value) {
  const next = value + dec_get_bit(number, bit);
  return next < 0 || next > 9
    ? { number, value: next }
    : dec_set_bit(number, bit, next);
}

module.exports = {
  STUBBED_CALLS,
  search_family,
  relation_get,
  relation_set,
  relation_rename_rebuild,
  relation_check_rebuild,
  relation_swap_rebuild,
  relation_rebuild,
  r_get,
  r_set,
  r_check,
  r_chara_to_name,
  relation_debugprint,
  family_register,
  family_register_slave,
  family_get,
  family_set_both,
  family_join_to,
  family_birth_to_mom,
  family_birth_to_dad,
  family_print_info,
  family_info,
  rf_count,
  rf_first,
  rf_all,
  rf_get,
  rf_set_both,
  rf_join_to,
  f_type_reverse,
  f_type_to_str,
  f_type_to_str2,
  f_check_relevant,
  f_is_close_experience,
  f_is_same_race,
  dec_get_bit,
  dec_set_bit,
  dec_bit_add,
};
