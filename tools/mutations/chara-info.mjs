// 变异条目表切片：#391 角色信息域（ere/chara/chara-info-actions.js、
// ere/chara/chara-soul-transfer.js、ere/page/page-chara-info.js 的核心判定
// 与计算函数）＋ ere/kojo/kojo-dungeon-bitch-log.js 的四个 get_look_info
// 分支（#391 补）。字段与运行方式见 tools/mutation-check.mjs 头注释。desc
// 里的 M 编号不人工分配，只作引用锚点，但全表必须唯一（#295；M117 曾被
// 两票撞号，已改正）——重号由 gate_shape 随 --verify 秒级核对。
// must_mention 按主流写法逐字等于（或为片段于）守护用例的测试名——
// #391 的三个新测试文件（chara-info-actions / chara-soul-transfer /
// page-chara-info）尚未落库时，门 3 会报「测试文件不存在」，属预期中间态。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 24;

export default [
  {
    desc: 'M7848 IS_ABLE_TO_ABILITY_UP 砍掉侵支的魔王等级门槛（LV<20 也能给侵攻中角色提升）',
    file: 'ere/chara/chara-info-actions.js',
    find: `  return (
    (state === 0 ||
      (master_lv >= 20 && state === 2) ||
      state === 7 ||
      (master_lv >= 20 && state === 3)) &&
    hp >= 1
  );`,
    replace: `  return (
    (state === 0 ||
      state === 2 ||
      state === 7 ||
      (master_lv >= 20 && state === 3)) &&
    hp >= 1
  );`,
    tests: ['chara-info-actions'],
    must_mention:
      'IS_ABLE_TO_ABILITY_UP：状态 0/7 且有体力则可，2/3 需魔王 LV>=20',
  },
  {
    desc: 'M7849 IS_ABLE_TO_CLOTH 砍掉状态守卫（侵攻/迎击/苗床中也能换装）',
    file: 'ere/chara/chara-info-actions.js',
    find: `  return state === 0 && hp >= 1;`,
    replace: `  return hp >= 1;`,
    tests: ['chara-info-actions'],
    must_mention: 'IS_ABLE_TO_CLOTH：仅状态 0 且有体力',
  },
  {
    desc: 'M7850 CHARA_INFO_RESTORE_STATE 迎击中不再先离队（party_del 被短路）',
    file: 'ere/chara/chara-info-actions.js',
    find: `  if ((era.get(\`cflag:\${cid}:1\`) || 0) === 3) {
    party_del(cid);
  }`,
    replace: `  if (false) {
    party_del(cid);
  }`,
    tests: ['chara-info-actions'],
    must_mention: 'CHARA_INFO_RESTORE_STATE：迎击中先离队',
  },
  {
    desc: 'M7851 CHARA_INFO_RECOVER_HP 气力单价 5 改 4（恢复花费算错）',
    file: 'ere/chara/chara-info-actions.js',
    find: `  const cost = Math.trunc(((max_hp - hp) * 10) / 3 + ((max_mp - mp) * 5) / 3);`,
    replace: `  const cost = Math.trunc(((max_hp - hp) * 10) / 3 + ((max_mp - mp) * 4) / 3);`,
    tests: ['chara-info-actions'],
    must_mention: 'CHARA_INFO_RECOVER_HP：确认后按公式扣双资金并回满',
  },
  {
    desc: 'M7852 CHARA_INFO_UP_LEVEL 魔王计费曲线 100 改 10（按通常角色计差额）',
    file: 'ere/chara/chara-info-actions.js',
    find: `    need = lv * 100 + 10; // 魔王`,
    replace: `    need = lv * 10 + 10; // 魔王`,
    tests: ['chara-info-actions'],
    must_mention: 'CHARA_INFO_UP_LEVEL：三条经验曲线',
  },
  {
    desc: 'M7853 CHARA_INFO_CALLBACK 砍掉等级差守卫（对不低于魔王的角色也放行传送）',
    file: 'ere/chara/chara-info-actions.js',
    find: `  if (target_lv >= master_lv) {`,
    replace: `  if (false) {`,
    tests: ['chara-info-actions'],
    must_mention: 'CHARA_INFO_CALLBACK：等级不够或气力不够都提前失败',
  },
  {
    desc: 'M7854 swap_var 的 b 侧写回自身（交换失效——a/b 槽各保留原值）',
    file: 'ere/chara/chara-soul-transfer.js',
    find: `  era.set(key_b, val_a === undefined ? empty : val_a);`,
    replace: `  era.set(key_b, val_b === undefined ? empty : val_a);`,
    tests: ['chara-soul-transfer'],
    must_mention: 'SWAP_CHARA：数值表与字符串表双向互换',
  },
  {
    desc: 'M7855 PERSONALOCK 的 [50,58) 段守卫反转折掉 55（只交换调合知识，其余全跳）',
    file: 'ere/chara/chara-soul-transfer.js',
    find: `    if (tc === 55) continue;`,
    replace: `    if (tc !== 55) continue;`,
    tests: ['chara-soul-transfer'],
    must_mention: 'PERSONALOCK：区间左闭右开',
  },
  {
    desc: 'M7856 TRANSFERAPP 收尾不再把双方 CFLAG:1 复位为 0',
    file: 'ere/chara/chara-soul-transfer.js',
    find: `  chara(0).invasion.状态 = 0;
  chara(cid).invasion.状态 = 0;`,
    replace: `  // 变异：不把双方状态复位为 0`,
    tests: ['chara-soul-transfer'],
    must_mention: 'TRANSFERAPP：等级/攻防互换、双侧状态清零',
  },
  {
    desc: 'M7857 BODYCHECK_MAOU 魔族缺省种族年龄 666 改 667',
    file: 'ere/chara/chara-soul-transfer.js',
    find: `    era.set('cflag:0:452', 666);`,
    replace: `    era.set('cflag:0:452', 667);`,
    tests: ['chara-soul-transfer'],
    must_mention: 'BODYCHECK_MAOU：种族>0 用 666',
  },
  {
    desc: 'M7858 TRANSFER_SOUL 旧错位素质继承支被短路（魔王带着 debuff 转移时不 +1 继承）',
    file: 'ere/chara/chara-soul-transfer.js',
    find: `  if (era.get('ex_talent:0:0')) {
    debuff = (era.get('ex_talent:0:0') || 0) + 1;
  }`,
    replace: `  if (false) {
    debuff = (era.get('ex_talent:0:0') || 0) + 1;
  }`,
    tests: ['chara-soul-transfer'],
    must_mention: 'TRANSFER_SOUL：错位等级继承',
  },
  {
    desc: 'M7859 TRANSFER_SOUL 婚姻守卫砍掉未婚臂（601 == 0 的角色错走配偶迁移分支）',
    file: 'ere/chara/chara-soul-transfer.js',
    find: `  if ((marriage >= 900 && marriage <= 902) || marriage === 0) {`,
    replace: `  if (marriage >= 900 && marriage <= 902) {`,
    tests: ['chara-soul-transfer'],
    must_mention: 'TRANSFER_SOUL：确认后返回 0，双重 SWAP 抵消',
  },
  {
    desc: 'M7860 SOUL_DISLOCATION 命中条件取反（未命中反而降级、命中反而不降）',
    file: 'ere/chara/chara-soul-transfer.js',
    find: `  if (level && !rand(cap + 1)) {`,
    replace: `  if (level && rand(cap + 1)) {`,
    tests: ['chara-soul-transfer'],
    must_mention: 'SOUL_DISLOCATION：命中降级',
  },
  {
    desc: 'M7861 SOUL_DISLOCATION 归零康复播报被短路',
    file: 'ere/chara/chara-soul-transfer.js',
    find: `    if (next === 0) {
      era.print(\`\${name_of(cid)}从【\${ex_talentname(0)}】中恢复了\`);
    }`,
    replace: `    if (false) {
      era.print(\`\${name_of(cid)}从【\${ex_talentname(0)}】中恢复了\`);
    }`,
    tests: ['chara-soul-transfer'],
    must_mention: 'SOUL_DISLOCATION：命中降级，降到 0 时播报康复',
  },
  {
    desc: 'M7862 SHOW_CHARA_ACT 状态 0 徽章守卫改 1（可调教角色落到行尾 -F 字面量）',
    file: 'ere/page/page-chara-info.js',
    find: `  if (state === 0) return { content: '[可调教]', color: '#6464ff' };`,
    replace: `  if (state === 1) return { content: '[可调教]', color: '#6464ff' };`,
    tests: ['page-chara-info'],
    must_mention: 'SHOW_CHARA_ACT：状态码到徽章文本/颜色的映射',
  },
  {
    desc: 'M7863 COMPARE_CHARA_ACT 同分末位判定反转（平局时按 ID 降序）',
    file: 'ere/page/page-chara-info.js',
    find: `  return a < b ? -1 : 1;`,
    replace: `  return a > b ? -1 : 1;`,
    tests: ['page-chara-info'],
    must_mention:
      'COMPARE_CHARA_ACT：按 (状态+11-act)%11 排名，同排名再按楼层/ID 决胜',
  },
  {
    desc: 'M7864 COMPARE_CHARA_ACT 侵攻/异层迎击的楼层比较支整支短路',
    file: 'ere/page/page-chara-info.js',
    find: `  if (
    state_a === 2 ||
    (state_a === 3 &&
      (era.get(\`cflag:\${a}:501\`) || 0) !== (era.get(\`cflag:\${b}:501\`) || 0))
  ) {`,
    replace: `  if (false) {`,
    tests: ['page-chara-info'],
    must_mention:
      'COMPARE_CHARA_ACT：按 (状态+11-act)%11 排名，同排名再按楼层/ID 决胜',
  },
  {
    desc: 'M7865 CHARA_MARRIGE_BEFORE category 0（未婚）不再归「无」',
    file: 'ere/page/page-chara-info.js',
    find: `  if (category === 0 || category === 2) return '无';`,
    replace: `  if (category === 2) return '无';`,
    tests: ['page-chara-info'],
    must_mention: 'CHARA_MARRIGE_BEFORE：%10==0 早退、category 0/2/6 分档',
  },
  {
    desc: 'M7866 MARRIAGE_BRACKET_TEXT 野狗守卫改 901（配偶 900 落到道具名回落）',
    file: 'ere/page/page-chara-info.js',
    find: `  if (spouse === 900) return '野狗';`,
    replace: `  if (spouse === 901) return '野狗';`,
    tests: ['page-chara-info'],
    must_mention:
      'MARRIAGE_BRACKET_TEXT：spouse 分支串——表驱动走完外层四路 + ELSE 内四条支线',
  },
  {
    desc: 'M7867 BUILD_ACT_SORT_ORDER 双出击对不再按敌方序（enemy_compare 退回通用比较）',
    file: 'ere/page/page-chara-info.js',
    find: `        cmp = enemy_compare(count, other);`,
    replace: `        cmp = compare_chara_act(count, other, 2);`,
    tests: ['page-chara-info'],
    must_mention:
      'SHOW_CHARA_ACT_LIST：双方都在侵攻/迎击时改走 ENEMY_COMPARE（按楼层，不是按状态排名）',
  },
  {
    desc: 'M7868 GET_LOOK_INFO 种族2 未登记代号不再回落 $N（改 ERROR）',
    file: 'ere/kojo/kojo-dungeon-bitch-log.js',
    find: 'return map[v] ?? `$${v}`;',
    replace: "return map[v] ?? 'ERROR';",
    tests: ['kojo-dungeon-bitch-log'],
    must_mention: '种族2 按 TALENT:319 映射',
  },
  {
    desc: 'M7869 GET_LOOK_INFO 种族12 精英（TALENT:220）不再切到种族2',
    file: 'ere/kojo/kojo-dungeon-bitch-log.js',
    find: `  return get_look_info(cid, t(220) ? '种族2' : '种族');`,
    replace: `  return get_look_info(cid, '种族');`,
    tests: ['kojo-dungeon-bitch-log'],
    must_mention: '在 种族/种族2 间切换',
  },
  {
    desc: 'M7870 GET_LOOK_INFO 性格的 [10,19) 回退循环被清空（只认 [160,179)）',
    file: 'ere/kojo/kojo-dungeon-bitch-log.js',
    find: `        for (let tc = 10; tc < 19; tc += 1) {`,
    replace: `        for (let tc = 10; tc < 10; tc += 1) {`,
    tests: ['kojo-dungeon-bitch-log'],
    must_mention: '性格优先 TALENT[160,179)',
  },
  {
    desc: 'M7871 GET_LOOK_INFO 婚史保密分支被短路（has_family==0 且非零码落到家族码解码）',
    file: 'ere/kojo/kojo-dungeon-bitch-log.js',
    find: `      if (has_family === 0 && family !== 0) return '婚史保密';`,
    replace: `      if (false) return '婚史保密';`,
    tests: ['kojo-dungeon-bitch-log'],
    must_mention: '婚史按 TALENT:320 压缩家族码解码各分支',
  },
];
