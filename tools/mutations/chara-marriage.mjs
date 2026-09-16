// 变异条目表切片：#393（N9）婚姻（ere/chara/chara-marriage.js ↔ CHARA_MARRIAGE.ERB）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；desc 里的 M 编号不人工
// 分配、只作引用锚点，但全表必须唯一（#295）。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 41; // #393 返工 +13；返工二 +2；返工三 +6（M9059-M9064 素质编号与记录码）

export default [
  {
    desc: 'M8861 CHECK_ABLE_TO_MARRIAGE 的侵攻状态码由 2 改成 3',
    file: 'ere/chara/chara-marriage.js',
    find: '  if ((era.get(`cflag:${arg}:1`) || 0) === 2) return MARRIAGE_HERO; // :42-43',
    replace:
      '  if ((era.get(`cflag:${arg}:1`) || 0) === 3) return MARRIAGE_HERO; // :42-43',
    tests: ['chara-marriage'],
    must_mention: 'CHECK_ABLE_TO_MARRIAGE：侵攻中单独一档',
  },
  {
    desc: 'M8862 CHECK_ABLE_TO_MARRIAGE 把苗床（7）也算成可结婚',
    file: 'ere/chara/chara-marriage.js',
    find: '  if (state !== 0 && state !== 3 && state !== 7) return MARRIAGE_BLOCKED; // :45-48',
    replace:
      '  if (state !== 0 && state !== 3) return MARRIAGE_BLOCKED; // :45-48',
    tests: ['chara-marriage'],
    must_mention: 'CHECK_ABLE_TO_MARRIAGE：侵攻中单独一档',
  },
  {
    desc: 'M8863 侵攻中的按钮正文由「恋人设定」改成「结婚」',
    file: 'ere/chara/chara-marriage.js',
    find: "    print_choice('恋人设定\\u3000', num);",
    replace: "    print_choice('结婚\\u3000', num);",
    tests: ['chara-marriage'],
    must_mention: 'SHOW_BUTTON_MARRIAGE：不可结婚不渲染',
  },
  {
    desc: 'M8864 菜单的「与恋人结婚」判据由 lover > 0 改成 lover >= 0（没恋人也亮）',
    file: 'ere/chara/chara-marriage.js',
    find: "  if (lover > 0) {\n    print_choice('与恋人结婚', SPOUSE_LOVER); // :96-97",
    replace:
      "  if (lover >= 0) {\n    print_choice('与恋人结婚', SPOUSE_LOVER); // :96-97",
    tests: ['chara-marriage'],
    must_mention: '菜单按钮集',
  },
  {
    desc: 'M8865 野狗的持有判据由 item:22 >= 1 改成 >= 2',
    file: 'ere/chara/chara-marriage.js',
    find: "  if ((era.get('item:22') || 0) >= 1) {\n    print_choice('野狗', SPOUSE_DOG); // :88-89",
    replace:
      "  if ((era.get('item:22') || 0) >= 2) {\n    print_choice('野狗', SPOUSE_DOG); // :88-89",
    tests: ['chara-marriage'],
    must_mention: '菜单按钮集',
  },
  {
    desc: 'M8866 离婚项的判据由「已婚」改成「未婚」（有配偶时反而点不到）',
    file: 'ere/chara/chara-marriage.js',
    find: "  if (married) {\n    print_choice('离婚', 998); // :119-120",
    replace: "  if (!married) {\n    print_choice('离婚', 998); // :119-120",
    tests: ['chara-marriage'],
    must_mention: '菜单按钮集',
  },
  {
    desc: 'M8867 目前结婚对象：野狗（900）与你的哨兵值互换',
    file: 'ere/chara/chara-marriage.js',
    find: "  if (spouse === SPOUSE_DOG) return '野狗'; // :129-130\n  if (spouse === SPOUSE_YOU) return '你'; // :131-132",
    replace:
      "  if (spouse === SPOUSE_YOU) return '野狗'; // :129-130\n  if (spouse === SPOUSE_DOG) return '你'; // :131-132",
    tests: ['chara-marriage'],
    must_mention: '菜单尾部画出「目前结婚对象」的一行',
  },
  {
    desc: 'M8868 目前结婚对象：「在故乡等待的伴侣」的素质判据由 315 == 21 改成 == 22',
    file: 'ere/chara/chara-marriage.js',
    find: '    if (talent(cid, 315) === 21 || talent(cid, T_HOMETOWN_WIFE)) {',
    replace:
      '    if (talent(cid, 315) === 22 || talent(cid, T_HOMETOWN_WIFE)) {',
    tests: ['chara-marriage'],
    must_mention: '菜单尾部画出「目前结婚对象」的一行',
  },
  {
    desc: 'M8869 侵攻中的勇者走恋人线后不再按 ENTER_LOVER 的结果结束回合',
    file: 'ere/chara/chara-marriage.js',
    find: '    if ((await enter_lover(arg)) === 1) return 1; // :69-74 成功でターンエンド',
    replace:
      '    if ((await enter_lover(arg)) === 2) return 1; // :69-74 成功でターンエンド',
    tests: ['chara-marriage'],
    must_mention: '侵攻中的勇者走 ENTER_LOVER',
  },
  {
    desc: 'M8870 魔王自恋那一档的守卫被删（选 [901] 直接和自己结婚）',
    file: 'ere/chara/chara-marriage.js',
    find: "      if (arg === 0) {\n        era.print('魔王大人，自恋也是要有限度的啦。');",
    replace:
      "      if (false) {\n        era.print('魔王大人，自恋也是要有限度的啦。');",
    tests: ['chara-marriage'],
    must_mention: '入口两档',
  },
  {
    desc: 'M8871 [903] 与恋人分手时忘了清 CFLAG:606',
    file: 'ere/chara/chara-marriage.js',
    find: '      chara(arg).dungeon.恋人 = 0; // :195 CFLAG:ARG:606 = 0（dungeon 域）',
    replace:
      '      chara(arg).dungeon.恋人 = 1; // :195 CFLAG:ARG:606 = 0（dungeon 域）',
    tests: ['chara-marriage'],
    must_mention: '[903] 与恋人分手',
  },
  {
    desc: 'M8872 奴隶子菜单：侵攻中（状态 2）的拒绝判据改成状态 3',
    file: 'ere/chara/chara-marriage.js',
    find: '    if ((era.get(`cflag:${pick}:1`) || 0) === 2) {\n      era.print(`${name_of(pick)}尚未在支配之下。`); // :225-226',
    replace:
      '    if ((era.get(`cflag:${pick}:1`) || 0) === 3) {\n      era.print(`${name_of(pick)}尚未在支配之下。`); // :225-226',
    tests: ['chara-marriage'],
    must_mention: '奴隶子菜单的四条拒绝与返回',
  },
  {
    desc: 'M8873 奴隶子菜单：选中者已婚的拒绝判据读到 609 上（永远不拦）',
    file: 'ere/chara/chara-marriage.js',
    find: '    if ((era.get(`cflag:${pick}:601`) || 0) !== 0) {\n      era.print(`${name_of(pick)}已婚了。`); // :230-232',
    replace:
      '    if ((era.get(`cflag:${pick}:609`) || 0) !== 0) {\n      era.print(`${name_of(pick)}已婚了。`); // :230-232',
    tests: ['chara-marriage'],
    must_mention: '奴隶子菜单的四条拒绝与返回',
  },
  {
    desc: 'M8874 奴隶子菜单的翻页窗口由 20 改成 21（第 21 人翻不到）',
    file: 'ere/chara/chara-marriage.js',
    find: '      if ((page + 1) * SLAVE_PAGE_SIZE <= added_ids().length) page += 1;',
    replace:
      '      if ((page + 1) * (SLAVE_PAGE_SIZE + 1) <= added_ids().length)\n        page += 1;',
    tests: ['chara-marriage'],
    must_mention: '奴隶列表的翻页窗口按位置开',
  },
  {
    desc: 'M8875 名槽互换写反（双方都记自己的名字编号）',
    file: 'ere/chara/chara-marriage.js',
    find: '      `cflag:${partner}:${SPOUSE_NAME_SLOT}`,\n      era.get(`cflag:${arg}:6`) || 0,',
    replace:
      '      `cflag:${partner}:${SPOUSE_NAME_SLOT}`,\n      era.get(`cflag:${partner}:6`) || 0,',
    tests: ['chara-marriage'],
    must_mention: '从奴隶中选',
  },
  {
    desc: 'M8876 被求婚方登记的对象由「你」改成野狗（901 写成 900）',
    file: 'ere/chara/chara-marriage.js',
    find: '      chara(partner).chara.结婚对象 = SPOUSE_YOU; // :312',
    replace: '      chara(partner).chara.结婚对象 = SPOUSE_DOG; // :312',
    tests: ['chara-marriage'],
    must_mention: '从奴隶中选',
  },
  {
    desc: 'M8877 处女丧失：与你结婚那一档的记录码 1 改成 100',
    file: 'ere/chara/chara-marriage.js',
    find: '  if (spouse === SPOUSE_YOU)\n    code = FIRST_SEX_YOU; // :408-409',
    replace:
      '  if (spouse === SPOUSE_YOU)\n    code = FIRST_SEX_DOG; // :408-409',
    tests: ['chara-marriage'],
    must_mention: '处女丧失的记录码按对象分档',
  },
  {
    desc: 'M8878 初吻：与你结婚那一档不再记魔王的初吻对象',
    file: 'ere/chara/chara-marriage.js',
    find: "    if ((era.get('cflag:0:16') ?? 0) === -1) {\n      // :426-429 調教者の初吻（NO:ARG + 1）\n      chara(0).train.初吻对象 = arg + 1;",
    replace:
      '    if (false) {\n      // :426-429 調教者の初吻（NO:ARG + 1）\n      chara(0).train.初吻对象 = arg + 1;',
    tests: ['chara-marriage'],
    must_mention: '初吻的记录码按对象分档',
  },
  {
    desc: 'M8879 异种婚姻的经验门由 300 改成 301',
    file: 'ere/chara/chara-marriage.js',
    find: '  if ((era.get(`exp:${arg}:58`) || 0) < 300) return;',
    replace: '  if ((era.get(`exp:${arg}:58`) || 0) < 301) return;',
    tests: ['chara-marriage'],
    must_mention: '异种婚姻（欲望 LV 5',
  },
  {
    desc: 'M8880 DIVORCE 的婚姻编码回落条件由 3/4 改成 1/2（重婚不回落）',
    file: 'ere/chara/chara-marriage.js',
    find: '  if (state === MARRIAGE_STATE_BIGAMY || state === MARRIAGE_STATE_REMARRIED) {',
    replace:
      '  if (state === MARRIAGE_STATE_MARRIED || state === MARRIAGE_STATE_DIVORCED) {',
    tests: ['chara-marriage'],
    must_mention: 'DIVORCE：重婚（位 3）与再婚（位 4）各回落 20000',
  },
  // —— #393 返工：清旧账段（:266-273）的两侧 ——
  {
    desc: 'M9012 清旧账的门槛由 > 0 改成 > 1（配偶名槽 = 1 时整段不跑）',
    file: 'ere/chara/chara-marriage.js',
    find: '  if ((era.get(`cflag:${arg}:${SPOUSE_NAME_SLOT}`) || 0) > 0) {',
    replace: '  if ((era.get(`cflag:${arg}:${SPOUSE_NAME_SLOT}`) || 0) > 1) {',
    tests: ['chara-marriage'],
    must_mention: '婚前清旧账的两侧',
  },
  {
    desc: 'M9013 清旧账的内层判据整支短路（家族册上找得到人也不离）',
    file: 'ere/chara/chara-marriage.js',
    find: `    if (!(era.get(\`ex_talent:\${arg}:2\`) && found < 0)) {
      divorce(found); // :271
    }`,
    replace: `    if (false) {
      divorce(found); // :271
    }`,
    tests: ['chara-marriage'],
    must_mention: '婚前清旧账的两侧',
  },
  {
    desc: 'M9025 已婚守卫由 CFLAG:601 > 0 改成 > 1（登记值 1 时照办婚礼）',
    file: 'ere/chara/chara-marriage.js',
    find: '    } else if ((era.get(`cflag:${arg}:601`) || 0) > 0) {',
    replace: '    } else if ((era.get(`cflag:${arg}:601`) || 0) > 1) {',
    tests: ['chara-marriage'],
    must_mention: '已婚后选别的对象报',
  },
  {
    desc: 'M9030 家族册配偶的判定由一位 9 改成一位 8（登记 9 落到 ITEMNAME）',
    file: 'ere/chara/chara-marriage.js',
    find: '  if (spouse % 10 === 9) {',
    replace: '  if (spouse % 10 === 8) {',
    tests: ['chara-marriage'],
    must_mention: '取家族册上的名字',
  },
  {
    desc: 'M9031 家族册配偶的名字不再查家族册（恒读「无」）',
    file: 'ere/chara/chara-marriage.js',
    find: `    const partner = search_family(cid, 'MARRIAGE');
    return partner > 0 ? name_of(partner) : '无';`,
    replace: `    return '无';`,
    tests: ['chara-marriage'],
    must_mention: '取家族册上的名字',
  },
  {
    desc: 'M9032 魔王配偶的判据由相等改成不等（普通婚礼显示成「你」）',
    file: 'ere/chara/chara-marriage.js',
    find: `  if ((era.get('cflag:0:601') || 0) === (era.get(\`cflag:\${cid}:6\`) || 0)) {`,
    replace: `  if ((era.get('cflag:0:601') || 0) !== (era.get(\`cflag:\${cid}:6\`) || 0)) {`,
    tests: ['chara-marriage'],
    must_mention: '取家族册上的名字',
  },
  {
    desc: 'M9034 DIVORCE 的对方侧清除由 found > 0 改成 >= 0（连魔王那侧一起清）',
    file: 'ere/chara/chara-marriage.js',
    find: '  if (found > 0 && added_ids().includes(found)) {',
    replace: '  if (found >= 0 && added_ids().includes(found)) {',
    tests: ['chara-marriage'],
    must_mention: '只清「真角色」',
  },
  {
    desc: 'M9035 恋人 = 实人的判定码由 200 改成 201',
    file: 'ere/chara/chara-marriage.js',
    find: '    if ((era.get(`cflag:${arg}:606`) || 0) === LOVER_IS_REAL_PERSON) {',
    replace:
      '    if ((era.get(`cflag:${arg}:606`) || 0) === LOVER_IS_REAL_PERSON + 1) {',
    tests: ['chara-marriage'],
    must_mention: '恋人就是家族册上的实人',
  },
  {
    desc: 'M9036 异种婚姻的欲望门由 < 5 改成 < 6（欲望 LV 5 不再成婚）',
    file: 'ere/chara/chara-marriage.js',
    find: '  if ((era.get(`abl:${arg}:11`) || 0) < 5) return;',
    replace: '  if ((era.get(`abl:${arg}:11`) || 0) < 6) return;',
    tests: ['chara-marriage'],
    must_mention: '异种婚姻',
  },
  {
    desc: 'M9037 婚姻编码进位的档位由 已婚/离婚 改成 重婚/再婚',
    file: 'ere/chara/chara-marriage.js',
    find: `    const married_state = marriage_state(arg);
    if (
      married_state === MARRIAGE_STATE_MARRIED ||
      married_state === MARRIAGE_STATE_DIVORCED
    ) {`,
    replace: `    const married_state = marriage_state(arg);
    if (
      married_state === MARRIAGE_STATE_BIGAMY ||
      married_state === MARRIAGE_STATE_REMARRIED
    ) {`,
    tests: ['chara-marriage'],
    must_mention: '婚姻编码的进位',
  },
  {
    desc: 'M9038 恋人=实人时对方那侧的编档进位被短路（档位换成重婚/再婚）',
    file: 'ere/chara/chara-marriage.js',
    find: `        const state = marriage_state(found);
        if (
          state === MARRIAGE_STATE_MARRIED ||
          state === MARRIAGE_STATE_DIVORCED
        ) {
          shift_marriage_state(found, REMARRIAGE_DELTA);
        }`,
    replace: `        const state = marriage_state(found);
        if (
          state === MARRIAGE_STATE_BIGAMY ||
          state === MARRIAGE_STATE_REMARRIED
        ) {
          shift_marriage_state(found, REMARRIAGE_DELTA);
        }`,
    tests: ['chara-marriage'],
    must_mention: '恋人就是家族册上的实人',
  },
  {
    desc: 'M9040 奴隶分页的「还有下一页」由 <= 改成 <（边界那一页翻不过去）',
    file: 'ere/chara/chara-marriage.js',
    find: '      if ((page + 1) * SLAVE_PAGE_SIZE <= added_ids().length) page += 1;',
    replace:
      '      if ((page + 1) * SLAVE_PAGE_SIZE < added_ids().length) page += 1;',
    tests: ['chara-marriage'],
    must_mention: '翻页边界',
  },
  {
    desc: 'M9059 特殊服装判据由 79 改成 80',
    file: 'ere/chara/chara-marriage.js',
    find: 'const CLOTH_SEX_MARK = 79;',
    replace: 'const CLOTH_SEX_MARK = 80;',
    tests: ['chara-marriage'],
    must_mention: '处女丧失的四道守卫',
  },
  {
    desc: 'M9060 故乡妻子的素质由 157 改成 158',
    file: 'ere/chara/chara-marriage.js',
    find: 'const T_HOMETOWN_WIFE = 157;',
    replace: 'const T_HOMETOWN_WIFE = 158;',
    tests: ['chara-marriage'],
    must_mention: '在故乡等待的伴侣',
  },
  {
    desc: 'M9061 异种婚姻的素质由 159 改成 160',
    file: 'ere/chara/chara-marriage.js',
    find: 'const T_CROSS_MARRIAGE = 159;',
    replace: 'const T_CROSS_MARRIAGE = 160;',
    tests: ['chara-marriage'],
    must_mention: '异种婚姻',
  },
  {
    desc: 'M9062 处女丧失记录码（怪物）由 104 改成 105',
    file: 'ere/chara/chara-marriage.js',
    find: 'const FIRST_SEX_MONSTER = 104;',
    replace: 'const FIRST_SEX_MONSTER = 105;',
    tests: ['chara-marriage'],
    must_mention: '记录码',
  },
  {
    desc: 'M9063 初吻记录码（其它）由 994 改成 995',
    file: 'ere/chara/chara-marriage.js',
    find: 'const FIRST_KISS_OTHER = 994;',
    replace: 'const FIRST_KISS_OTHER = 995;',
    tests: ['chara-marriage'],
    must_mention: '初吻的记录码',
  },
  {
    desc: 'M9064 初吻记录码（你）由 1 改成 2',
    file: 'ere/chara/chara-marriage.js',
    find: 'const FIRST_KISS_YOU = 1;',
    replace: 'const FIRST_KISS_YOU = 2;',
    tests: ['chara-marriage'],
    must_mention: '初吻的记录码',
  },
  {
    desc: 'M9045 B 经验阈值由 4 改成 5（掷到 4 也破处）',
    file: 'ere/chara/chara-marriage.js',
    find: 'const VIRGIN_B_THRESHOLD = 4;',
    replace: 'const VIRGIN_B_THRESHOLD = 5;',
    tests: ['chara-marriage'],
    must_mention: '处女骰上界是 9',
  },
  {
    desc: 'M9051 配偶名槽下标由 609 改成 610',
    file: 'ere/chara/chara-marriage.js',
    find: 'const SPOUSE_NAME_SLOT = 609;',
    replace: 'const SPOUSE_NAME_SLOT = 610;',
    tests: ['chara-marriage'],
    must_mention: '清旧账',
  },
  {
    desc: 'M9041 处女丧失的素质 273 守卫由「非零」改成「等于 1」',
    file: 'ere/chara/chara-marriage.js',
    find: '    talent(arg, 273) !== 0 ||',
    replace: '    talent(arg, 273) !== 1 ||',
    tests: ['chara-marriage'],
    must_mention: '处女丧失的四道守卫',
  },
];
