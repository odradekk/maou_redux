// issue #389：LOOK 外观描述（新条目 M8301-M8340 ＋ 随实现迁入的 M7826 / M7868-M7871）。
//
// 两个靶文件：ere/chara/look.js（@LOOK_SET/@LOOK_CLEAR/@LOOK_INFO/
// @LOOK_INFO_LOVE/@LOVE_LIKE_BASE）与 ere/chara/look-info.js（@GET_LOOK_INFO）。
// tests 一律是本票的 test/look.test.js。
//
// M7826 原在 tools/mutations/kojo.mjs、M7868-M7871 原在
// tools/mutations/chara-info.mjs（靶都是 kojo-dungeon-bitch-log.js 里的
// GET_LOOK_INFO 子集）：#389 把那份子集搬进 ere/chara/look-info.js，五条
// 随靶搬家（本分片 +5：kojo.mjs -1、chara-info.mjs -4），tests 改到本票的
// test/look.test.js——kojo/chara-info 两侧的 GET_LOOK_INFO 用例已随实现
// 一并搬走，留原 tests 会「find 失配 + 无人守」双错。
//
// 覆盖面取法：每条钉一个**可观测的**字面量或分支——look_set/love_score 是
// 纯计算（返回值/素质表层直接可断言），look_info/look_info_love 经
// era.print 的输出行断言。
const look = 'ere/chara/look.js';
const info = 'ere/chara/look-info.js';

/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 51; // #570 起 +3（M11766-M11768，语尾行内拼接）；+3（M11774 调用点丢返回值、M11775 换行多空行、M11776 收尾另起一行）

const make = (id, desc, find, replace, must_mention, extra = {}) => ({
  desc: `M${id} ${desc}`,
  file: look,
  tests: ['look'],
  ...extra,
  find,
  replace,
  must_mention,
});

export default [
  // —— @LOOK_SET：外貌素质的掷骰与随机表（源 :4-813） ——
  make(
    8301,
    '发色区间 0-4 收成 0-3（粉发少一档）',
    '      q_color <= 4',
    '      q_color <= 3',
    'LOOK_SET 素质 300',
  ),
  make(
    8302,
    '「未熟恒短发」的或算成与（未熟角色不再短路）',
    '    q_hair_len <= 1 || t(cid, T_未熟)',
    '    q_hair_len <= 1 && t(cid, T_未熟)',
    '未熟（TALENT:135）在调用前已置位',
  ),
  make(
    8303,
    '短发的发型掷骰上界 RAND:3 改成 4',
    '    q_style = rand_n(3);',
    '    q_style = rand_n(4);',
    'LOOK_SET 素质 304',
  ),
  make(
    8304,
    '早泄判定只认「短小包茎」（漏掉包茎档）',
    '  if ((penis_state === 2 || penis_state === 3) && rand_n(10) === 0) {',
    '  if (penis_state === 2 && rand_n(10) === 0) {',
    '阴茎掷 51 的早泄',
  ),
  make(
    8305,
    '贫乳重掷的美乳档位 12 改成 13',
    '    if (t(cid, T_贫乳) && charm === 12) {',
    '    if (t(cid, T_贫乳) && charm === 13) {',
    '贫乳掷到 12 重新掷',
  ),
  make(
    8306,
    '魅力点 24 的扶她掷骰判据 0 改成 1',
    '      if (rand_n(40) === 0 && t(cid, T_男人) === 0) {',
    '      if (rand_n(40) === 1 && t(cid, T_男人) === 0) {',
    '魅力点 24 给扶她机会',
  ),
  make(
    8307,
    '霍比特的种族上界 119 收到 118',
    '    } else if ((arg === 0 && q <= 119) || arg === 10) {',
    '    } else if ((arg === 0 && q <= 118) || arg === 10) {',
    '素质 314：非精英 11 档',
  ),
  make(
    8308,
    '精灵的种族上界 159 收到 158',
    '    } else if ((arg === 0 && q <= 159) || arg === 1) {',
    '    } else if ((arg === 0 && q <= 158) || arg === 1) {',
    '素质 314：非精英 11 档',
  ),
  make(
    8309,
    '精灵的善恶值 +20 改成 +21',
    '      // :368-371 エルフ（善恶值が高い）\n      set_t(cid, T_种族, 1);\n      karma(cid, 20);',
    '      // :368-371 エルフ（善恶值が高い）\n      set_t(cid, T_种族, 1);\n      karma(cid, 21);',
    '种族 1 的善恶值增减',
  ),
  make(
    8310,
    '不会法术时的修道女重掷判据 Q == 2 改成 Q == 3',
    '    if (q === 2 && t(cid, T_法术) === 0) {',
    '    if (q === 3 && t(cid, T_法术) === 0) {',
    '修道女（Q=2）重掷',
  ),
  make(
    8311,
    '童貞オトコ支的经验上界 +1 改成 +2（验收探针：原用例只查了处女支）',
    '      // :518-524 童貞オトコの場合\n      const local = rand_n(20) + 1;',
    '      // :518-524 童貞オトコの場合\n      const local = rand_n(20) + 2;',
    '肛门经验（童貞オトコ：RAND:20 + 1 = 6）',
  ),
  make(
    8312,
    '主婦（Q=21）的「必得人妻」写错素质下标',
    '    set_t(cid, T_人妻, 1); // :600 必ず人妻がつく',
    '    set_t(cid, T_妓女, 1); // :600 必ず人妻がつく',
    '必得人妻',
  ),
  make(
    8313,
    '家族构成的离婚档 20000 改成 10000',
    '      local += 20000; // 離婚',
    '      local += 10000; // 離婚',
    '素质 320：离婚/未亡人支',
  ),
  make(
    8314,
    '配偶性别码「男男」的加数 8000000000 改成 7000000000',
    '      local += 8000000000; // 男男カップル',
    '      local += 7000000000; // 男男カップル',
    '十亿位 8',
  ),
  make(
    8315,
    'BL 补正（断背气质）的加值 3 改成 2',
    '      chara(cid).system.断背气质 = 3; // :768-770 BLっ気補正',
    '      chara(cid).system.断背气质 = 2; // :768-770 BLっ気補正',
    '断背气质（abl:23）',
  ),

  // —— @LOOK_CLEAR / @LOVE_LIKE_BASE ——
  make(
    8316,
    'LOOK_CLEAR 漏清 301（起扫点从 301 挪到 302）',
    '  for (let count = 301; count <= 313; count += 1) {',
    '  for (let count = 302; count <= 313; count += 1) {',
    '素质 301 已清',
  ),
  make(
    8317,
    'LOOK_CLEAR 的 300 号档不再清零',
    '  set_t(cid, 300, 0);\n  for (let count = 301; count <= 313; count += 1) {',
    '  void 300;\n  for (let count = 301; count <= 313; count += 1) {',
    '素质 300 已清',
  ),
  make(
    8318,
    'LOVE_LIKE_BASE 的「可爱的动物」档写错字',
    "    [12, true, '可爱的动物'],",
    "    [12, true, '可爱的动物！'],",
    '喜欢的东西 12',
  ),

  // —— @LOOK_INFO_LOVE 的评分半（love_score） ——
  make(
    8319,
    '高洁种族的世界 +1 改成 -1',
    '  if (RACES_NOBLE.includes(race)) {\n    main[LOVE.世界] += 1;',
    '  if (RACES_NOBLE.includes(race)) {\n    main[LOVE.世界] -= 1;',
    '种族 1',
  ),
  make(
    8320,
    '喜好 4（故乡的恋人）的恋人 +3 改成 +2',
    '  if (like === 4) {\n    main[LOVE.恋人] += 3;',
    '  if (like === 4) {\n    main[LOVE.恋人] += 2;',
    '喜好 4（故乡的恋人）',
  ),
  make(
    8321,
    '经验中档（> 30）的加值 2 改成 1',
    '    else if (v > 30) main[target] += 2;',
    '    else if (v > 30) main[target] += 1;',
    '经验補正',
  ),
  make(
    8322,
    '快乐刻印的倍率 3 改成 2',
    '  main[LOVE.コンプレックス] += mark_of(cid, M_快乐刻印) * 3;',
    '  main[LOVE.コンプレックス] += mark_of(cid, M_快乐刻印) * 2;',
    '快乐刻印',
  ),
  make(
    8323,
    '兽姦折半给野良犬时除数 2 改成 3',
    '  pool[LOVE.野良犬] += Math.trunc(main[LOVE.獣姦] / 2); // 獣姦好きは野良犬も好き',
    '  pool[LOVE.野良犬] += Math.trunc(main[LOVE.獣姦] / 3); // 獣姦好きは野良犬も好き',
    '60 = 牝犬 3 + 61/2',
  ),
  make(
    8324,
    '喜好 12 折算进第 0 项的除数 3 改成 2',
    '    pool[LOVE.喜欢的东西] += Math.trunc(main[LOVE.獣姦] / 3);',
    '    pool[LOVE.喜欢的东西] += Math.trunc(main[LOVE.獣姦] / 2);',
    '喜好 12 时把野良犬',
  ),
  make(
    8325,
    '崩坏的世界 -60 改成 -6',
    '    main[LOVE.世界] -= 60;',
    '    main[LOVE.世界] -= 6;',
    '崩坏',
  ),
  make(
    8326,
    '恋人（42）措辞的コンプレックス门槛 6 改成 8',
    "      text = main[LOVE.コンプレックス] > 6 ? '人妻' : '妈妈';",
    "      text = main[LOVE.コンプレックス] > 8 ? '人妻' : '妈妈';",
    '50 > 6',
  ),

  // —— @LOOK_INFO 的分支与显示 ——
  make(
    8327,
    '信仰行（与弃教行）的开门条件漏掉咒术持有者',
    '      t(cid, T_咒术) === 1 ||',
    '      false ||',
    '咒术侧的弃教文本',
  ),
  make(
    8328,
    '所持金 <= 0 的判据改成 < 0（0 元不再报身无分文）',
    '    if (money <= 0) {',
    '    if (money < 0) {',
    '身无分文',
  ),
  make(
    8329,
    '常识改变两项之间的分隔符从空格改成顿号',
    "        s.add(' ');",
    "        s.add('、');",
    '常识改变四态',
  ),
  make(
    8330,
    '男性也显示发型（`!male` 守卫拆掉）',
    "      if (!male) {\n        s.add(`][发型：${get_look_info(cid, '发型')}`);",
    "      if (true) {\n        s.add(`][发型：${get_look_info(cid, '发型')}`);",
    '男性不显示发型',
  ),
  make(
    8331,
    '每行 6 个（LOVE_PER_ROW）改成 5 个（满桌用例钉住换行位置）',
    'const LOVE_PER_ROW = 6;',
    'const LOVE_PER_ROW = 5;',
    '满桌角色的整屏输出',
  ),

  // —— 返工（#389 一轮）：补钉「确定可算却写成区间」与「零断言的档位表」 ——
  make(
    8332,
    '前职业语尾档的「盗人」档位 2 改成 3（两张档位表原本零断言）',
    '  if (value === 6) return 2; // 盗人は逆切れ',
    '  if (value === 6) return 3; // 盗人は逆切れ',
    'TALENT:315 = 6',
  ),
  make(
    8333,
    '契机语尾档的「復讐」档位 2 改成 3',
    '  if (value === 8) return 2; // 復讐',
    '  if (value === 8) return 3; // 復讐',
    'TALENT:316 = 8',
  ),
  make(
    8334,
    '处女支的经验掷骰上界 +1 改成 +2（原用例只断 1-40 的区间）',
    '    } else if (t(cid, T_处女) === 1) {\n      // :531-536 处女の場合\n      const local = rand_n(40) + 1;',
    '    } else if (t(cid, T_处女) === 1) {\n      // :531-536 处女の場合\n      const local = rand_n(40) + 2;',
    '肛门经验 = RAND:40 + 1 = 2',
  ),
  make(
    8335,
    '刺青名表第 4 项写错字（RAND:8 = 3 那一格）',
    "  '蜘蛛女郎',",
    "  '蜘蛛女郎！',",
    'RAND:8 = 3',
  ),
  make(
    8336,
    '人妻档的「バツ2」婚姻歴 +30 改成 +40',
    '      local += 30;',
    '      local += 40;',
    '主婦子供段：先加后判 break 的绝对值',
  ),
  make(
    8337,
    '心形数除数 5 改成 4（原断言只查 ♡ 存在）',
    '    let hearts = Math.trunc(main[id] / 5) - 1;',
    '    let hearts = Math.trunc(main[id] / 4) - 1;',
    '心形 3 个',
  ),

  // —— 返工（#389 二轮）：FS_BITCH「LOOKS」41 行随机覆盖表（此前零断言） ——
  make(
    8338,
    'LOOKS 表「阴毛浓密」的阈值 150 收到 140（验收探针：表本身零断言）',
    "      overwrite(t(arg, 310) > 150, '阴毛浓密的'); // :183",
    "      overwrite(t(arg, 310) > 140, '阴毛浓密的'); // :183",
    '阴毛浓密的',
    {
      file: 'ere/kojo/kojo-dungeon-bitch-log.js',
      tests: ['kojo-dungeon-bitch-log'],
    },
  ),
  make(
    8339,
    'LOOKS 表「忧郁的样子」的癖档位 11 改成 12',
    "      overwrite(t(arg, 313) === 11, '忧郁的样子'); // :192",
    "      overwrite(t(arg, 313) === 12, '忧郁的样子'); // :192",
    '忧郁的样子',
    {
      file: 'ere/kojo/kojo-dungeon-bitch-log.js',
      tests: ['kojo-dungeon-bitch-log'],
    },
  ),
  make(
    8340,
    'LOOKS 表「迷路的」读回 TALENT 族（返工修掉的族错：源是 CFLAG:ARG:509）',
    "      overwrite((era.get(`cflag:${arg}:509`) || 0) === 1, '迷路的');",
    "      overwrite(t(arg, 509) === 1, '迷路的');",
    '迷路的',
    {
      file: 'ere/kojo/kojo-dungeon-bitch-log.js',
      tests: ['kojo-dungeon-bitch-log'],
    },
  ),

  // —— @GET_LOOK_INFO：随实现搬进 ere/chara/look-info.js 的存量条目
  //    （M7826 来自 kojo.mjs、M7868-M7871 来自 chara-info.mjs；靶文件与
  //    tests 一并改到本票面，kojo/chara-info 两个分片的 COUNT 相应减一/减四） ——
  {
    desc: 'M7826 GET_LOOK_INFO 种族2「植物」映射改错（LOOK.ERB:3285，#383）',
    file: info,
    find: "  4: '植物',",
    replace: "  4: '植物不存在',",
    tests: ['look'],
    must_mention: '种族2',
  },
  {
    desc: 'M7868 GET_LOOK_INFO 种族2 未登记代号不再回落 $N（改 ERROR）',
    file: info,
    find: '      return RACE2_MAP[v] ?? `$${v}`;',
    replace: "      return RACE2_MAP[v] ?? 'ERROR';",
    tests: ['look'],
    must_mention: '字面 $ 前缀',
  },
  {
    desc: 'M7869 GET_LOOK_INFO 种族12 精英（TALENT:220）不再切到种族2',
    file: info,
    find: `      return get_look_info(cid, talent(cid, T_精英) ? KIND.RACE2 : KIND.RACE);`,
    replace: `      return get_look_info(cid, KIND.RACE);`,
    tests: ['look'],
    must_mention: '精英（TALENT:220）走种族2',
  },
  {
    desc: 'M7870 GET_LOOK_INFO 性格的 [10,19) 回退循环被清空（只认 [160,179)）',
    file: info,
    find: '          tc < PERSONALITY_FALLBACK_RANGE.end;',
    replace: '          tc < PERSONALITY_FALLBACK_RANGE.start;',
    tests: ['look'],
    must_mention: '全空才回落',
  },
  {
    desc: 'M7871 GET_LOOK_INFO 婚史保密分支被短路（个位 0 且非零码落到家族码解码）',
    file: info,
    find: "      if (family % 10 === 0 && family !== 0) return '婚史保密';",
    replace: "      if (false) return '婚史保密';",
    tests: ['look'],
    must_mention: '保密/无两档',
  },
  {
    desc: 'M11766 LOOK_INFO 首行丢弃语尾（#570：语尾须拼进「」之内）',
    file: look,
    find: '    s.add(await gobi_koujo(gobi_mark)); // :877',
    replace: "    s.add(''); // :877 变异：丢弃语尾",
    tests: ['look'],
    must_mention: '首行语尾在「」之内',
  },
  {
    desc: 'M11767 LOOK_INFO_LOVE 收尾丢弃语尾（#570：喜び语尾接在物品行末）',
    file: look,
    find: '    s.add(`${await gobi_koujo(1)}」 `); // :2799 喜び语尾 + PRINTL 」 同一行',
    replace: "    s.add('」 '); // 变异：丢弃语尾",
    tests: ['look'],
    must_mention: '最后一项物品与「♪」 」同一行',
  },
  {
    desc: 'M11768 LOOK_INFO 语尾包装层自行打印（#570 原始症状复辟：语尾单独成行）',
    file: look,
    find: `async function gobi_koujo(arg0) {
  return require('#/kojo/kojo-system').gobi_koujo(arg0);
}`,
    replace: `async function gobi_koujo(arg0) {
  // 变异：自行打印（#570 前的旧形态），不再交给调用方拼行
  era.print(await require('#/kojo/kojo-system').gobi_koujo(arg0));
  return '';
}`,
    tests: ['look'],
    must_mention: '语尾自成一行',
  },
  {
    desc: 'M11774 LOOK_INFO 语尾调用点丢返回值（裸 await，语尾不进行内；#570 结构化检查）',
    file: look,
    find: '    s.add(await gobi_koujo(gobi_mark)); // :877',
    replace:
      '    // 变异：丢返回值（裸调用）\n    await gobi_koujo(gobi_mark); // :877',
    tests: ['look'],
    must_mention: '裸调用 gobi_koujo 会丢掉语尾文字',
  },
  {
    desc: 'M11775 LOOK_INFO_LOVE 每 6 项换行多出空行（era.println 复辟；#570 返工）',
    file: look,
    find: `      s.add(' ');
      era.print(s.take());
      s.add('　');`,
    replace: `      s.add(' ');
      era.print(s.take());
      era.println(); // 变异：多一个空行
      s.add('　');`,
    tests: ['look'],
    must_mention: '物品行之间不得出现空行',
  },
  {
    desc: 'M11776 LOOK_INFO_LOVE 收尾另起一行（#570 返工：原作接在物品行末）',
    file: look,
    find: '    s.add(`${await gobi_koujo(1)}」 `); // :2799 喜び语尾 + PRINTL 」 同一行',
    replace: '    era.print(`${await gobi_koujo(1)}」 `); // 变异：另起一行',
    tests: ['look'],
    must_mention: '语尾不得另起一行',
  },
];
