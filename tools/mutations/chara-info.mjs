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
export const COUNT = 45; // #389 起 -4；#393 返工 +11；返工二 +1（M9043 名册页长）；返工三 +2（M9057/M9058 故乡 kind 表）；#517 +1（M11141 COMPARE_CHARA_ACT 的阅读法）；#530 +2（M11209 魔王行的编号格、M11210 魔王行的等级地址）；#535 +3（M11300 角色行的编号前缀、M11301 角色行的等级地址、M11302 角色行的按钮快捷键）；#535 返工 +5（M11303-M11307 魔王行/角色行姓名列的对齐契约与其列宽）

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
    (state_a === 2 || state_a === 3) &&
    (era.get(\`cflag:\${a}:501\`) || 0) !== (era.get(\`cflag:\${b}:501\`) || 0)
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
  // —— #393 三动作接线（page-chara-info.js 的 37 行：三个按钮 ＋ 三条返回值分流）——
  // 按钮条目杀「快捷键/实参写错」，分流条目杀「0/1 与 2 的分档写错」。
  // 分流的三条各有两个方向：`!== 2 → !== 3`（2 被误当结果上浮）由防御支
  // 用例守（era.input 就地替换喂 2——未渲染按钮的编号进不了引擎渲染层，
  // 见 test/page-chara-info.test.js 该用例的头注），`!== 2 → === 2`（0/1
  // 被当成 2 落回重画）由三条 0 侧用例守。
  {
    desc: 'M9201 转职按钮快捷键 2 → 3（与诱惑撞号）',
    file: 'ere/page/page-chara-info.js',
    find: `      show_button_job_change(2, current);`,
    replace: `      show_button_job_change(3, current);`,
    tests: ['page-chara-info'],
    must_mention: '状态 0 + 等级 50：转职与结婚都亮着',
  },
  {
    desc: 'M9202 诱惑按钮快捷键 3 → 4（与结婚撞号）',
    file: 'ere/page/page-chara-info.js',
    find: `      show_button_temptation(3, current);`,
    replace: `      show_button_temptation(4, current);`,
    tests: ['page-chara-info'],
    must_mention: '状态 2 侵攻中的勇者：转职不渲染，诱惑与恋人设定各一个',
  },
  {
    desc: 'M9203 结婚按钮快捷键 4 → 5（与育儿室撞号）',
    file: 'ere/page/page-chara-info.js',
    find: `      show_button_marriage(4, current);`,
    replace: `      show_button_marriage(5, current);`,
    tests: ['page-chara-info'],
    must_mention: '状态 0 + 等级 50：转职与结婚都亮着',
  },
  {
    desc: 'M9204 转职按钮的实参改 0（染灰档位判定拿到的是魔王号）',
    file: 'ere/page/page-chara-info.js',
    find: `      show_button_job_change(2, current);`,
    replace: `      show_button_job_change(2, 0);`,
    tests: ['page-chara-info'],
    must_mention: '灰值 setColor 次数',
  },
  {
    desc: 'M9205 转职接线把 2 也上浮（!== 2 → !== 3）',
    file: 'ere/page/page-chara-info.js',
    find: `        if (job_result !== 2) return job_result; // :1094-1097 的收尾`,
    replace: `        if (job_result !== 3) return job_result; // :1094-1097 的收尾`,
    tests: ['page-chara-info'],
    must_mention: '被调方返回 2（防御支）时不上浮',
  },
  {
    desc: 'M9206 诱惑接线把 2 也上浮（!== 2 → !== 3）',
    file: 'ere/page/page-chara-info.js',
    find: `        if (temptation_result !== 2) return temptation_result;`,
    replace: `        if (temptation_result !== 3) return temptation_result;`,
    tests: ['page-chara-info'],
    must_mention: '被调方返回 2（防御支）时不上浮',
  },
  {
    desc: 'M9207 结婚接线把 2 也上浮（!== 2 → !== 3）',
    file: 'ere/page/page-chara-info.js',
    find: `        if (marriage_result !== 2) return marriage_result;`,
    replace: `        if (marriage_result !== 3) return marriage_result;`,
    tests: ['page-chara-info'],
    must_mention: '被调方返回 2（防御支）时不上浮',
  },
  {
    desc: 'M9208 转职接线把 0 当 2 落回重画（!== 2 → === 2）',
    file: 'ere/page/page-chara-info.js',
    find: `        if (job_result !== 2) return job_result; // :1094-1097 的收尾`,
    replace: `        if (job_result === 2) return job_result; // :1094-1097 的收尾`,
    tests: ['page-chara-info'],
    must_mention: '转职返回 0 时上浮回名册',
  },
  {
    desc: 'M9209 诱惑接线把 0 当 2 落回重画（!== 2 → === 2）',
    file: 'ere/page/page-chara-info.js',
    find: `        if (temptation_result !== 2) return temptation_result;`,
    replace: `        if (temptation_result === 2) return temptation_result;`,
    tests: ['page-chara-info'],
    must_mention: '诱惑返回 0 时上浮回名册',
  },
  {
    desc: 'M9210 结婚接线把 0 当 2 落回重画（!== 2 → === 2）',
    file: 'ere/page/page-chara-info.js',
    find: `        if (marriage_result !== 2) return marriage_result;`,
    replace: `        if (marriage_result === 2) return marriage_result;`,
    tests: ['page-chara-info'],
    must_mention: '结婚返回 0 时也上浮回名册',
  },
  {
    desc: 'M9213 故乡丈夫的 kind 表 [0,4,8] → [0,4]',
    file: 'ere/page/page-chara-info.js',
    find: "    if ([0, 4, 8].includes(kind)) return '故乡丈夫';",
    replace: "    if ([0, 4].includes(kind)) return '故乡丈夫';",
    tests: ['page-chara-info'],
    must_mention: '故乡丈夫',
  },
  {
    desc: 'M9214 故乡扶她的 kind 表 [1,5,7] → [1,5]',
    file: 'ere/page/page-chara-info.js',
    find: "    if ([1, 5, 7].includes(kind)) return '故乡扶她';",
    replace: "    if ([1, 5].includes(kind)) return '故乡扶她';",
    tests: ['page-chara-info'],
    must_mention: '故乡扶她',
  },
  {
    desc: 'M9212 名册每页行数由 24 改成 23（第 24 人掉到第 2 页）',
    file: 'ere/page/page-chara-info.js',
    find: 'const NUM_PAGE = 24;',
    replace: 'const NUM_PAGE = 23;',
    tests: ['page-chara-info'],
    must_mention: '名册每页 24 行',
  },
  {
    desc: 'M9211 结婚接线丢掉上浮值（return marriage_result → return 0）',
    file: 'ere/page/page-chara-info.js',
    find: `        if (marriage_result !== 2) return marriage_result;`,
    replace: `        if (marriage_result !== 2) return 0;`,
    tests: ['page-chara-info'],
    must_mention: '个别信息页把 1 上浮给 CHARA_INFO（回合结束）',
  },
  {
    desc: 'M11141 COMPARE_CHARA_ACT 按 C 式「&& 优先」读错（状态 2 不再吃楼层判据，源 :813 左结合，#517）',
    file: 'ere/page/page-chara-info.js',
    find: '    (state_a === 2 || state_a === 3) &&\n    (era.get(`cflag:${a}:501`) || 0) !== (era.get(`cflag:${b}:501`) || 0)',
    replace:
      '    state_a === 2 ||\n    (state_a === 3 &&\n      (era.get(`cflag:${a}:501`) || 0) !== (era.get(`cflag:${b}:501`) || 0))',
    tests: ['page-chara-info'],
    must_mention: '楼层相等时落 ID 决胜',
  },
  {
    desc: 'M11209 名册的魔王行退回纯文本（[0] 不进白名单——角色行按角色号、0 被 added_chara_ids 滤掉，#530）',
    file: 'ere/page/page-chara-info.js',
    find: `    {
      type: 'button',
      accelerator: 0,
      content: '',
      config: { align: 'left', width: 3 },
    },`,
    replace: `    {
      type: 'text',
      content: '[0]',
      config: { align: 'left', width: 3 },
    },`,
    tests: ['page-chara-info'],
    must_mention: '魔王行的 [0] 是真按钮',
  },
  {
    desc: 'M11210 名册魔王行的等级地址写错（cflag:0:9 读成 cflag:0:10——名字与等级同格，等级此前无人断言，#530 验收抽样）',
    file: 'ere/page/page-chara-info.js',
    find: "LV${era.get('cflag:0:9') || 0}`",
    replace: "LV${era.get('cflag:0:10') || 0}`",
    tests: ['page-chara-info'],
    must_mention: '魔王行的等级取自 cflag:0:9',
  },
  {
    desc: 'M11300 名册角色行的编号按钮正文退回手写 [N]（引擎再拼一层，实显 [11] [11]，#535）',
    file: 'ere/page/page-chara-info.js',
    find: `      type: 'button',
      accelerator: cid,
      content: '',
      config: { align: 'left', width: 3 },`,
    replace: `      type: 'button',
      accelerator: cid,
      content: \`[\${cid}]\`,
      config: { align: 'left', width: 3 },`,
    tests: ['page-chara-info'],
    must_mention: '编号只有引擎拼的一层前缀',
  },
  {
    desc: 'M11301 名册角色行的等级地址写错（cflag:cid:9 读成 cflag:cid:10——魔王行同款缺口，#535 顺带补钉）',
    file: 'ere/page/page-chara-info.js',
    find: 'LV${era.get(`cflag:${cid}:9`) || 0}`',
    replace: 'LV${era.get(`cflag:${cid}:10`) || 0}`',
    tests: ['page-chara-info'],
    must_mention: '角色行的等级取自 cflag:cid:9',
  },
  {
    desc: 'M11302 名册角色行的编号按钮快捷键写成 0（角色号进不了白名单，点不动也敲不进，#535）',
    file: 'ere/page/page-chara-info.js',
    find: `      accelerator: cid,
      content: '',`,
    replace: `      accelerator: 0,
      content: '',`,
    tests: ['page-chara-info'],
    must_mention: '角色行的按钮带角色号（点得动、也敲得进白名单）',
  },
  {
    desc: 'M11303 名册魔王行姓名格的空档退回 10 格（5 个全角空格——引擎实测名字比角色行右一个半角字符，#535 验收）',
    file: 'ere/page/page-chara-info.js',
    find: 'content: `\\u3000\\u3000\\u3000\\u3000 ${name_of(0)}',
    replace: 'content: `\\u3000\\u3000\\u3000\\u3000\\u3000${name_of(0)}',
    tests: ['page-chara-info'],
    must_mention: '魔王行与角色行的姓名前缀显示宽度相等',
  },
  {
    desc: 'M11304 名册魔王行姓名格的半角空格被吃掉（空档只剩 8 格，#535）',
    file: 'ere/page/page-chara-info.js',
    find: 'content: `\\u3000\\u3000\\u3000\\u3000 ${name_of(0)}',
    replace: 'content: `\\u3000\\u3000\\u3000\\u3000${name_of(0)}',
    tests: ['page-chara-info'],
    must_mention: '魔王行与角色行的姓名前缀显示宽度相等',
  },
  {
    desc: 'M11305 名册角色行姓名格多一个空格（前缀 10 格，与魔王行不齐，#535）',
    file: 'ere/page/page-chara-info.js',
    find: '{ content: ` ${name_of(cid)} LV',
    replace: '{ content: `  ${name_of(cid)} LV',
    tests: ['page-chara-info'],
    must_mention: '魔王行与角色行的姓名前缀显示宽度相等',
  },
  {
    desc: 'M11306 名册角色行姓名格少了徽章后的空格（前缀 8 格，与魔王行不齐，#535）',
    file: 'ere/page/page-chara-info.js',
    find: '{ content: ` ${name_of(cid)} LV',
    replace: '{ content: `${name_of(cid)} LV',
    tests: ['page-chara-info'],
    must_mention: '魔王行与角色行的姓名前缀显示宽度相等',
  },
  {
    desc: 'M11307 名册魔王行姓名格的列宽 13 改 12（span 变了，姓名列整体左移，#535）',
    file: 'ere/page/page-chara-info.js',
    find: `      config: { align: 'left', width: 13 },
    },
  ]);`,
    replace: `      config: { align: 'left', width: 12 },
    },
  ]);`,
    tests: ['page-chara-info'],
    must_mention: '魔王行的两格 ＋ 两名角色各四格',
  },
];
