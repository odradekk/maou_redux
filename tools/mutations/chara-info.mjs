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
export const COUNT = 94; // #389 起 -4；#393 返工 +11；返工二 +1（M9043 名册页长）；返工三 +2（M9057/M9058 故乡 kind 表）；#517 +1（M11141 COMPARE_CHARA_ACT 的阅读法）；#530 +2（M11209 魔王行的编号格、M11210 魔王行的等级地址）；#535 +3（M11300 角色行的编号前缀、M11301 角色行的等级地址、M11302 角色行的按钮快捷键）；#535 返工 +5（M11303-M11307 魔王行/角色行姓名列的对齐契约与其列宽）；#542 +4（M11315-M11318：[20] 更换立绘按钮的两臂守卫、CASE 20 提示话术、[18] 卖春积极性按钮快捷键）；#545 +31（M11430-M11460：统一卖春积极性八条、换号与排序编号十九条、名册分发三条）；#545 返工 +7（M11461-M11464：两处 await 顺序、候选列表排序、跨次进入的页码；M11465-M11467：#535 转来的三处覆盖缺口补变异条目；M11445-M11448/M11459/M11460 按「只换排序编号」重写）；#545 第 2 轮返工 +2（M11468 第二屏取消支路、M11469 等级列左对齐宽度；M11454/M11455 的 find 随行体改 `LV:`+宽度同步）。合并态 45 + 40 + 4 = 89，与 --verify 实核一致；#546 +5（M11539-M11543：[16] 装备情报按钮接线、CASE 16 详情与 WAIT、CASE 8 的 MODE 实参、STUBBED_CALLS 收敛）

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
  {
    desc: 'M11430 统一卖春积极性：侵攻档的状态判据 2 改 3（勇者档去写迎击奴隶）',
    file: 'ere/page/page-uniform-bitch-level.js',
    find: "    scope = { states: [2], message: '侵攻中的勇者（不含以后出现的新勇者）' }; // :26/:31",
    replace:
      "    scope = { states: [3], message: '侵攻中的勇者（不含以后出现的新勇者）' }; // :26/:31",
    tests: ['page-chara-info'],
    must_mention: 'scope=2000：角色 1 应写入',
  },
  {
    desc: 'M11431 统一卖春积极性：迎击档的状态判据 3 改 2',
    file: 'ere/page/page-uniform-bitch-level.js',
    find: "    scope = { states: [3], message: '全迎击中的奴隶（不含以后追加的新奴隶）' }; // :47/:52",
    replace:
      "    scope = { states: [2], message: '全迎击中的奴隶（不含以后追加的新奴隶）' }; // :47/:52",
    tests: ['page-chara-info'],
    must_mention: 'scope=2001：角色 1 不应写入',
  },
  {
    desc: 'M11432 统一卖春积极性：全部档丢掉迎击臂（只剩侵攻）',
    file: 'ere/page/page-uniform-bitch-level.js',
    find: '      states: [2, 3],',
    replace: '      states: [2],',
    tests: ['page-chara-info'],
    must_mention: 'scope=2002：角色 2 应写入',
  },
  {
    desc: 'M11433 统一卖春积极性：魔王跳过守卫写坏（COUNT==MASTER 不再 CONTINUE）',
    file: 'ere/page/page-uniform-bitch-level.js',
    find: '    if (cid === 0) continue; // :24',
    replace: '    if (cid === -1) continue; // :24',
    tests: ['page-chara-info'],
    must_mention: 'scope=2000：角色 0 不应写入',
  },
  {
    desc: 'M11434 统一卖春积极性：侵攻档的播报文案换成迎击档的',
    file: 'ere/page/page-uniform-bitch-level.js',
    find: "message: '侵攻中的勇者（不含以后出现的新勇者）'",
    replace: "message: '全迎击中的奴隶（不含以后追加的新奴隶）'",
    tests: ['page-chara-info'],
    must_mention: 'scope=2000：播报逐字',
  },
  {
    desc: 'M11435 统一卖春积极性：等级按钮正文退回手写 [N]（引擎再拼一层）',
    file: 'ere/page/page-uniform-bitch-level.js',
    find: `      accelerator: level,
      content: '',`,
    replace: `      accelerator: level,
      content: \`[\${level}]\`,`,
    tests: ['page-chara-info'],
    must_mention: '等级按钮 0 的实显只有引擎拼的一层前缀',
  },
  {
    desc: 'M11436 统一卖春积极性：侵攻档按钮快捷键 2000 撞到 2001（2000 进不了白名单）',
    file: 'ere/page/page-uniform-bitch-level.js',
    find: `      accelerator: 2000,
      content: '[ 全侵攻中的勇者 ]', // :5`,
    replace: `      accelerator: 2001,
      content: '[ 全侵攻中的勇者 ]', // :5`,
    tests: ['page-chara-info'],
    must_mention: '输入不合法',
  },
  {
    desc: 'M11437 统一卖春积极性：取消档不再提前返回（[2003] 后照进等级选择）',
    file: 'ere/page/page-uniform-bitch-level.js',
    find: `  } else {
    return;
  }`,
    replace: `  } else {
  }`,
    tests: ['page-chara-info'],
    must_mention: '预置输入已耗尽',
  },
  {
    desc: 'M11438 换号显示守卫：苗床（状态 7）不再列出',
    file: 'ere/page/page-chara-number-swap.js',
    find: '      (state === 0 || state === 7) &&',
    replace: '      state === 0 &&',
    tests: ['page-chara-info'],
    must_mention: '铁石心肠关：角色 3 应列出',
  },
  {
    desc: 'M11439 换号显示守卫：近卫（EX_TALENT:1）排除臂被短路',
    file: 'ere/page/page-chara-number-swap.js',
    find: '      (!(era.get(`ex_talent:${cid}:1`) || 0) ||',
    replace: '      (true ||',
    tests: ['page-chara-info'],
    must_mention: '铁石心肠关：角色 4 不应列出',
  },
  {
    desc: 'M11440 换号显示守卫：铁石心肠位 &2 读成 &4（打工位）',
    file: 'ere/page/page-chara-number-swap.js',
    find: '          (era_exflag.mod_switch_bits & 2) !== 0))',
    replace: '          (era_exflag.mod_switch_bits & 4) !== 0))',
    tests: ['page-chara-info'],
    must_mention: '铁石心肠开：近卫+后代的角色 5 放行',
  },
  {
    desc: 'M11441 换号：每页 25 行改成 24 行（第 25 人掉到第 2 页）',
    file: 'ere/page/page-chara-number-swap.js',
    find: 'const NUM_PAGE = 25;',
    replace: 'const NUM_PAGE = 24;',
    tests: ['page-chara-info'],
    must_mention: '页首按上一页后仍停在第 1 页',
  },
  {
    desc: 'M11442 换号第一屏：下一页守卫 <= 写成 <（恰 25 人时进不了空尾页）',
    file: 'ere/page/page-chara-number-swap.js',
    find: `    if (first === 2001) {
      // :44-49 下一页
      if ((no_page + 1) * NUM_PAGE <= total) no_page += 1;`,
    replace: `    if (first === 2001) {
      // :44-49 下一页
      if ((no_page + 1) * NUM_PAGE < total) no_page += 1;`,
    tests: ['page-chara-info'],
    must_mention: '第 2 页没有第 1 人',
  },
  {
    desc: 'M11443 换号第二屏：下一页守卫 <= 写成 <（同一边界）',
    file: 'ere/page/page-chara-number-swap.js',
    find: `      if (picked === 3001) {
        // :94-99 下一页
        if ((no_page + 1) * NUM_PAGE <= total) no_page += 1;`,
    replace: `      if (picked === 3001) {
        // :94-99 下一页
        if ((no_page + 1) * NUM_PAGE < total) no_page += 1;`,
    tests: ['page-chara-info'],
    must_mention: '角色 2 出现在第一屏初始',
  },
  {
    desc: 'M11444 换号第一屏：上一页守卫 > 0 写成 >= 0（页首落到 -1、整屏空）',
    file: 'ere/page/page-chara-number-swap.js',
    find: `      // :38-43 上一页（页首不动，仅重绘）
      if (no_page > 0) no_page -= 1;`,
    replace: `      // :38-43 上一页（页首不动，仅重绘）
      if (no_page >= 0) no_page -= 1;`,
    tests: ['page-chara-info'],
    must_mention: '页首按上一页后仍停在第 1 页',
  },
  {
    desc: 'M11445 换号：排序编号只写一侧（b 侧不写，交换不成立）',
    file: 'ere/chara/chara-portcflag.js',
    find: '  era.set(`portcflag:${a}:排序编号`, b_number);\n  era.set(`portcflag:${b}:排序编号`, a_number);',
    replace: '  era.set(`portcflag:${a}:排序编号`, b_number);',
    tests: ['page-chara-info'],
    must_mention: '2 号拿到原属 1 号的排序编号',
  },
  {
    desc: 'M11446 换号：先写 a 再读 a（b 被写成自己刚被读走的那个值）',
    file: 'ere/chara/chara-portcflag.js',
    find: '  const a_number = sort_number_of(a);\n  const b_number = sort_number_of(b);\n  era.set(`portcflag:${a}:排序编号`, b_number);\n  era.set(`portcflag:${b}:排序编号`, a_number);',
    replace:
      '  era.set(`portcflag:${a}:排序编号`, sort_number_of(b));\n  era.set(`portcflag:${b}:排序编号`, sort_number_of(a));',
    tests: ['page-chara-info'],
    must_mention: '2 号拿到原属 1 号的排序编号',
  },
  {
    desc: 'M11447 排序编号：未设时不再回落角色 ID（读成 0）',
    file: 'ere/chara/chara-portcflag.js',
    find: '  return era.get(`portcflag:${cid}:排序编号`) || cid;',
    replace: '  return era.get(`portcflag:${cid}:排序编号`) || 0;',
    tests: ['page-chara-info'],
    must_mention: '顺位表按排序编号升序（未设的回落角色 ID）',
  },
  {
    desc: 'M11448 换号：交换排序编号改成跨 ID 搬角色数据（返工前旧做法的回归）',
    file: 'ere/page/page-chara-number-swap.js',
    find: '      swap_sort_numbers(first, second);',
    replace:
      '      era.set(`cflag:${first}:9`, era.get(`cflag:${second}:9`) ?? 0); // 变异：跨 ID 搬数据',
    tests: ['page-chara-info'],
    must_mention: '换号不搬角色数据：等级仍属 ID 1',
  },
  {
    desc: 'M11449 换号互换：TARGET 复位写成 0（原作 -1）',
    file: 'ere/page/page-chara-number-swap.js',
    find: '      era_flag.target = -1; // :118',
    replace: '      era_flag.target = 0; // :118',
    tests: ['page-chara-info'],
    must_mention: 'TARGET = -1',
  },
  {
    desc: 'M11450 换号：误加页码复位（NO_PAGE 是静态变量，RESTART 不归零）',
    file: 'ere/page/page-chara-number-swap.js',
    find: '      continue; // :120 RESTART（页码是静态变量，不归零）',
    replace: '      no_page = 0; // 变异：误加复位\n      continue; // :120',
    tests: ['page-chara-info'],
    must_mention: '互换后重画仍在第 2 页',
  },
  {
    desc: 'M11451 换号确认：文案里两个名字对调',
    file: 'ere/page/page-chara-number-swap.js',
    find: '    era.print(`${name_of(first)}将与${name_of(second)}交换排序编号，确定吗？`); // :107',
    replace:
      '    era.print(`${name_of(second)}将与${name_of(first)}交换排序编号，确定吗？`); // :107',
    tests: ['page-chara-info'],
    must_mention: '确认文案逐字',
  },
  {
    desc: 'M11452 换号第二屏：剃除 CN:1 的过滤被删（可跟自己换号）',
    file: 'ere/page/page-chara-number-swap.js',
    find: '      const second_ids = swap_candidates()\n        .slice(no_page * NUM_PAGE, (no_page + 1) * NUM_PAGE)\n        .filter((cid) => cid !== first); // :67-69 对象是角色1剃除',
    replace:
      '      const second_ids = swap_candidates().slice(\n        no_page * NUM_PAGE,\n        (no_page + 1) * NUM_PAGE,\n      );',
    tests: ['page-chara-info'],
    must_mention: '第二屏剃除 CN:1 的行',
  },
  {
    desc: 'M11453 换号行体：[SP] 判定的 TALENT 表丢了村娘 165',
    file: 'ere/page/page-chara-number-swap.js',
    find: '    [165, 167, 168, 169, 170, 171].some((t) => era.get(`talent:${cid}:${t}`)) ||',
    replace:
      '    [167, 168, 169, 170, 171].some((t) => era.get(`talent:${cid}:${t}`)) ||',
    tests: ['page-chara-info'],
    must_mention: '[SP] 标记（村娘系）',
  },
  {
    desc: 'M11454 换号行体：职业列被删（GET_JOB_NAME 不再进行文本）',
    file: 'ere/page/page-chara-number-swap.js',
    find: '      content: ` ${name_of(cid)} ${get_job_name(cid)} LV:${pad_display(',
    replace: '      content: ` ${name_of(cid)} LV:${pad_display(',
    tests: ['page-chara-info'],
    must_mention: '甲带着自己的职业与等级',
  },
  {
    desc: 'M11455 换号行体：等级地址 cflag:cid:9 读成 :10',
    file: 'ere/page/page-chara-number-swap.js',
    find: '        String(era.get(`cflag:${cid}:9`) || 0),',
    replace: '        String(era.get(`cflag:${cid}:10`) || 0),',
    tests: ['page-chara-info'],
    must_mention: '甲带着自己的职业与等级',
  },
  {
    desc: 'M11456 名册分发：[1600] 误加页码复位（NO_PAGE 是静态局部变量，不归零）',
    file: 'ere/page/page-chara-info.js',
    find: '      await uniform_bitch_level();\n      continue;',
    replace:
      '      await uniform_bitch_level();\n      no_page = 0; // 变异：误加复位\n      continue;',
    tests: ['page-chara-info'],
    must_mention: '页码保持第 2 页',
  },
  {
    desc: 'M11457 名册分发：[1600] 误加排序复位（SORT_SELECT 是静态局部变量）',
    file: 'ere/page/page-chara-info.js',
    find: '      await uniform_bitch_level();\n      continue;',
    replace:
      '      await uniform_bitch_level();\n      sort_select = 1200; // 变异：误加复位\n      continue;',
    tests: ['page-chara-info'],
    must_mention: '排序视图保持所持金',
  },
  {
    desc: 'M11458 名册分发：[1700] 换号出口误加页码复位',
    file: 'ere/page/page-chara-info.js',
    find: '      await chara_number_swap();\n      continue;',
    replace:
      '      await chara_number_swap();\n      no_page = 0; // 变异：误加复位\n      continue;',
    tests: ['page-chara-info'],
    must_mention: '换号出口后名册保持第 2 页',
  },
  {
    desc: 'M11459 换号：排序编号整支不交换（确认后什么也没换）',
    file: 'ere/page/page-chara-number-swap.js',
    find: '      swap_sort_numbers(first, second);\n      await era.printAndWait',
    replace: '      // 变异：排序编号不交换\n      await era.printAndWait',
    tests: ['page-chara-info'],
    must_mention: '1 号拿到原属 2 号的排序编号',
  },
  {
    desc: 'M11460 名册编号视图：排列键退回角色 ID（排序编号不参与排序）',
    file: 'ere/chara/chara-portcflag.js',
    find: '  return [...ids].sort(\n    (a, b) => sort_number_of(a) - sort_number_of(b) || a - b,\n  );',
    replace: '  return [...ids].sort((a, b) => a - b);',
    tests: ['page-chara-info'],
    must_mention: '顺位表按排序编号升序（未设的回落角色 ID）',
  },
  {
    desc: 'M11461 名册分发：[1600] 漏 await（名册抢在子流程播报前重绘）',
    file: 'ere/page/page-chara-info.js',
    find: '      await uniform_bitch_level();\n      continue;',
    replace: '      uniform_bitch_level();\n      continue;',
    tests: ['page-chara-info'],
    must_mention: '完成播报必须先于名册的下一次重绘',
  },
  {
    desc: 'M11462 名册分发：[1700] 漏 await（名册与换号页抢同一个输入）',
    file: 'ere/page/page-chara-info.js',
    find: '      await chara_number_swap();\n      continue;',
    replace: '      chara_number_swap();\n      continue;',
    tests: ['page-chara-info'],
    must_mention: '完成播报必须先于名册的下一次重绘',
  },
  {
    desc: 'M11463 换号页：候选列表退回 ID 序（排序编号不参与排列）',
    file: 'ere/page/page-chara-number-swap.js',
    find: '  return sort_by_number(ids);',
    replace: '  return ids;',
    tests: ['page-chara-info'],
    must_mention: '行序按排序编号',
  },
  {
    desc: 'M11464 换号页：页码跨次进入被复位（提在模块级后又被函数内清掉）',
    file: 'ere/page/page-chara-number-swap.js',
    find: '  swap_page: for (;;) {',
    replace: '  no_page = 0; // 变异：跨次进入复位\n  swap_page: for (;;) {',
    tests: ['page-chara-info'],
    must_mention: '再次进入仍在第 2 页：页码不随函数退出归零（静态变量语义）',
  },
  {
    desc: 'M11465 排序表头：[1200] 编号视图的快捷键写成 1201（白名单拒收，按编号切不回去）',
    file: 'ere/page/page-chara-info.js',
    find: "      accelerator: 1200,\n      content: '编号',",
    replace: "      accelerator: 1201,\n      content: '编号',",
    tests: ['page-chara-info'],
    must_mention: 'era.input() 只接受本轮已打印按钮的快捷键',
  },
  {
    desc: 'M11466 名单行片段：未陷落文案改字（<未陷落> → <未堕落>）',
    file: 'ere/page/page-chara-info.js',
    find: "  return { content: '<未陷落>', color: '#646464' };",
    replace: "  return { content: '<未堕落>', color: '#646464' };",
    tests: ['page-chara-info'],
    must_mention: '未陷落分支',
  },
  {
    desc: 'M11467 名单行片段：收藏标记的地址 cflag:cid:700 读成 :701',
    file: 'ere/page/page-chara-info.js',
    find: "    content: (era.get(`cflag:${cid}:700`) || 0) !== 0 ? '[\\u2606]' : '',",
    replace:
      "    content: (era.get(`cflag:${cid}:701`) || 0) !== 0 ? '[\\u2606]' : '',",
    tests: ['page-chara-info'],
    must_mention: '收藏标记读 cflag:cid:700',
  },
  // —— #542：[20] 更换立绘与 [18] 卖春积极性按钮（PTJ_BUTTON 默认态）——
  {
    desc: 'M11315 更换立绘按钮守卫漏「非魔王」臂（ARG != MASTER——魔王行也画出 [20]，#542）',
    file: 'ere/page/page-chara-info.js',
    find: "      if (state === 0 && current !== 0) era.printButton('更换立绘', 20);",
    replace:
      "      if (state === 0) era.printButton('更换立绘', 20); // 变异：漏掉 ARG != MASTER",
    tests: ['page-chara-info'],
    must_mention: '魔王（ARG == MASTER）：不渲染',
  },
  {
    desc: 'M11316 更换立绘按钮守卫漏「状态 0」臂（CFLAG:ARG:1 == 0——侵攻中等占用角色也画 [20]，#542）',
    file: 'ere/page/page-chara-info.js',
    find: "      if (state === 0 && current !== 0) era.printButton('更换立绘', 20);",
    replace:
      "      if (current !== 0) era.printButton('更换立绘', 20); // 变异：漏掉 CFLAG:1 == 0",
    tests: ['page-chara-info'],
    must_mention: '奴隶 + 状态 2（侵攻中）：不渲染',
  },
  {
    desc: 'M11317 CASE 20 的不移植提示退回存根占位（「随资源票」话术——判死终态被读成待办，#542）',
    file: 'ere/page/page-chara-info.js',
    find: `      case 20:
        await not_ported_line_wait(
          '更换立绘',
          '更换立绘',
          '#542 判不移植：立绘系统默认关闭、素材不在仓库',
        );`,
    replace: `      case 20:
        await stub_line_wait('更换立绘', '更换立绘', '随资源票'); // 变异：退回占位话术`,
    tests: ['page-chara-info'],
    must_mention: '不移植提示要说清为何',
  },
  {
    desc: 'M11318 卖春积极性按钮快捷键错位（18 改 81——原作编号 [18] 的分发落在白名单外，#542）',
    file: 'ere/page/page-chara-info.js',
    find: "      era.printButton('卖春积极性 - ' + bich_level_text(current), 18);",
    replace:
      "      era.printButton('卖春积极性 - ' + bich_level_text(current), 81); // 变异：快捷键错位",
    tests: ['page-chara-info'],
    must_mention: 'sub_page 1 应渲染 [18] 卖春积极性按钮',
  },
  {
    desc: 'M11468 换号第二屏：取消支路被删（[3002] 落到 CN:2，只剩一名候选时又卡死——#545 第 2 轮返工）',
    file: 'ere/page/page-chara-number-swap.js',
    find: '      if (picked === 3002) {\n        // 回第一屏重选 CN:1（原作那条兜底的净效果，见文件头）＝ GOTO 换号页\n        continue swap_page;\n      }\n',
    replace: '',
    tests: ['page-chara-info'],
    must_mention: '取消后回到第一屏重画',
  },
  {
    desc: 'M11469 换号行体：等级列的左对齐宽度 4 改 3（原作 :21/:72 的 ,4,LEFT——#545 第 2 轮返工）',
    file: 'ere/page/page-chara-number-swap.js',
    find: '        String(era.get(`cflag:${cid}:9`) || 0),\n        4,',
    replace: '        String(era.get(`cflag:${cid}:9`) || 0),\n        3,',
    tests: ['page-chara-info'],
    must_mention: '1 位等级补 3 格',
  },
  // —— #546：装备详情与自定义一人称的接线（ere/page/page-chara-info.js）——
  {
    desc: 'M11539 [16] 装备情报按钮接线删（SHOW_BUTTON_EQUIP 调用改空——判定放行也不渲染按钮）',
    file: 'ere/page/page-chara-info.js',
    find: '      show_button_equip(16, current);',
    replace: '      // 变异：不调 show_button_equip',
    tests: ['page-chara-info'],
    must_mention: 'CHECK_ABLE_TO_SHOW_EQUIP 放行才渲染',
  },
  {
    desc: 'M11540 CASE 16 的装备详情调用删（EQUIP_ST_SHOW 不跑——状态行整段消失）',
    file: 'ere/page/page-chara-info.js',
    find: '        equip_st_show(current); // 同步纯输出（原作 CALL 无等待），WAIT 在下一行',
    replace: '        // 变异：不调 equip_st_show',
    tests: ['page-chara-info'],
    must_mention: '装备状态行随 [16] 印出',
  },
  {
    desc: 'M11541 CASE 16 的 WAIT 删（详情印完不等键直接重绘）',
    file: 'ere/page/page-chara-info.js',
    find: '        equip_st_show(current); // 同步纯输出（原作 CALL 无等待），WAIT 在下一行\n        await era.waitAnyKey();',
    replace:
      '        equip_st_show(current); // 同步纯输出（原作 CALL 无等待），WAIT 在下一行',
    tests: ['page-chara-info'],
    must_mention: '详情后 WAIT 至少一次',
  },
  {
    desc: 'M11542 CASE 8 的 MODE 实参丢失（random_self_call 落回 MODE 0——没有输入提示，直接随机重掷）',
    file: 'ere/page/page-chara-info.js',
    find: '        await random_self_call(current, undefined, 1);',
    replace: '        await random_self_call(current, undefined);',
    tests: ['page-chara-info'],
    must_mention: '输入不合法！请输入以下值之一',
  },
  {
    desc: 'M11543 STUBBED_CALLS 残留旧条目（SHOW_BUTTON_EQUIP 没随换真身移出名单）',
    file: 'ere/page/page-chara-info.js',
    find: "const STUBBED_CALLS = ['CHAR_DEBUG'];",
    replace: "const STUBBED_CALLS = ['CHAR_DEBUG', 'SHOW_BUTTON_EQUIP'];",
    tests: ['page-chara-info'],
    must_mention: '已有真身（#546），不应再留在本文件的存根名单里',
  },
];
