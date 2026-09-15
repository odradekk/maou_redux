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
export const COUNT = 45;

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
    '头发状态「直发」上界 6 收到 5',
    '    q_state <= 6',
    '    q_state <= 5',
    'LOOK_SET 素质 301',
  ),
  make(
    8303,
    '「未熟恒短发」的或算成与（未熟角色不再短路）',
    '    q_hair_len <= 1 || t(cid, T_未熟)',
    '    q_hair_len <= 1 && t(cid, T_未熟)',
    '未熟（TALENT:135）在调用前已置位',
  ),
  make(
    8304,
    '修剪方式的「基本剪法」上界 2 收到 3',
    '  set_t(cid, T_头发修剪方式, q_cut >= 2 ? 1 : 4);',
    '  set_t(cid, T_头发修剪方式, q_cut >= 3 ? 1 : 4);',
    'LOOK_SET 素质 303',
  ),
  make(
    8305,
    '短发的发型掷骰上界 RAND:3 改成 4',
    '    q_style = rand_n(3);',
    '    q_style = rand_n(4);',
    'LOOK_SET 素质 304',
  ),
  make(
    8306,
    '眼形「切れ長」上界 10 收到 9',
    '    q_eye <= 10',
    '    q_eye <= 9',
    'LOOK_SET 素质 305',
  ),
  make(
    8307,
    '唇「瑞々しい」档位判据 2 改成 3',
    '        : q_lip === 2',
    '        : q_lip === 3',
    'LOOK_SET 素质 307',
  ),
  make(
    8308,
    '乳头「凹陷」档位判据 2 改成 0',
    '        : q_nipple === 2\n          ? 4 // :218-220 陥没',
    '        : q_nipple === 0\n          ? 4 // :218-220 陥没',
    'LOOK_SET 素质 309',
  ),
  make(
    8309,
    '早泄判定只认「短小包茎」（漏掉包茎档）',
    '  if ((penis_state === 2 || penis_state === 3) && rand_n(10) === 0) {',
    '  if (penis_state === 2 && rand_n(10) === 0) {',
    '阴茎掷 51 的早泄',
  ),
  make(
    8310,
    '贫乳重掷的美乳档位 12 改成 13',
    '    if (t(cid, T_贫乳) && charm === 12) {',
    '    if (t(cid, T_贫乳) && charm === 13) {',
    '贫乳掷到 12 重新掷',
  ),
  make(
    8311,
    '魅力点 24 的扶她掷骰判据 0 改成 1',
    '      if (rand_n(40) === 0 && t(cid, T_男人) === 0) {',
    '      if (rand_n(40) === 1 && t(cid, T_男人) === 0) {',
    '魅力点 24 给扶她机会',
  ),
  make(
    8312,
    '金红桃重掷的癖档位 25 改成 26',
    '    if (t(cid, T_金红桃) && habit === 25) {',
    '    if (t(cid, T_金红桃) && habit === 26) {',
    '素质 313',
  ),
  make(
    8313,
    '霍比特的种族上界 119 收到 118',
    '    } else if ((arg === 0 && q <= 119) || arg === 10) {',
    '    } else if ((arg === 0 && q <= 118) || arg === 10) {',
    '素质 314：非精英 11 档',
  ),
  make(
    8314,
    '精灵的种族上界 159 收到 158',
    '    } else if ((arg === 0 && q <= 159) || arg === 1) {',
    '    } else if ((arg === 0 && q <= 158) || arg === 1) {',
    '素质 314：非精英 11 档',
  ),
  make(
    8315,
    '精灵的善恶值 +20 改成 +21',
    '      // :368-371 エルフ（善恶值が高い）\n      set_t(cid, T_种族, 1);\n      karma(cid, 20);',
    '      // :368-371 エルフ（善恶值が高い）\n      set_t(cid, T_种族, 1);\n      karma(cid, 21);',
    '种族 1 的善恶值增减',
  ),
  make(
    8316,
    '植物（种族2 = 4）的触手掷骰判据 0 改成 1',
    '  } else if (race2 === 4) {\n    // :435-441 植物（たまに触手を持つ）\n    if (rand_n(10) === 0) {',
    '  } else if (race2 === 4) {\n    // :435-441 植物（たまに触手を持つ）\n    if (rand_n(10) === 1) {',
    '种族2 = 4',
  ),
  make(
    8317,
    '史莱姆（种族2 = 2）的清零档位写错素质',
    '    set_t(cid, T_史莱姆, 1);\n    if (rand_n(4) === 0) {\n      set_t(cid, 471, 1); // 粘液捕获',
    '    set_t(cid, T_史莱姆, 1);\n    if (rand_n(4) === 0) {\n      set_t(cid, 470, 1); // 粘液捕获',
    '素质 471',
  ),
  make(
    8318,
    '不会法术时的修道女重掷判据 Q == 2 改成 Q == 3',
    '    if (q === 2 && t(cid, T_法术) === 0) {',
    '    if (q === 3 && t(cid, T_法术) === 0) {',
    '修道女（Q=2）重掷',
  ),
  make(
    8319,
    '妓女/乞丐/奴隶的经验支漏掉奴隶档（Q == 20）',
    '  if (q === 5 || q === 7 || q === 20) {',
    '  if (q === 5 || q === 7) {',
    'LOOK_SET：妓女/乞丐/奴隶的经验与善恶值',
  ),
  make(
    8320,
    '主婦（Q=21）的「必得人妻」写错素质下标',
    '    set_t(cid, T_人妻, 1); // :600 必ず人妻がつく',
    '    set_t(cid, T_妓女, 1); // :600 必ず人妻がつく',
    '必得人妻',
  ),
  make(
    8321,
    '家族构成的离婚档 20000 改成 10000',
    '      local += 20000; // 離婚',
    '      local += 10000; // 離婚',
    '素质 320：离婚/未亡人支',
  ),
  make(
    8322,
    '配偶性别码「男男」的加数 8000000000 改成 7000000000',
    '      local += 8000000000; // 男男カップル',
    '      local += 7000000000; // 男男カップル',
    '十亿位 8',
  ),
  make(
    8323,
    'BL 补正（断背气质）的加值 3 改成 2',
    '      chara(cid).system.断背气质 = 3; // :768-770 BLっ気補正',
    '      chara(cid).system.断背气质 = 2; // :768-770 BLっ気補正',
    '断背气质（abl:23）',
  ),
  make(
    8324,
    '家族构成的「新夫」档 7000000000 改成 6000000000（与男女档撞）',
    '      local += 7000000000; // 男ふたカップル',
    '      local += 6000000000; // 男ふたカップル',
    '十亿位 7',
  ),

  // —— @LOOK_CLEAR / @LOVE_LIKE_BASE ——
  make(
    8325,
    'LOOK_CLEAR 漏清 301（起扫点从 301 挪到 302）',
    '  for (let count = 301; count <= 313; count += 1) {',
    '  for (let count = 302; count <= 313; count += 1) {',
    '素质 301 已清',
  ),
  make(
    8326,
    'LOOK_CLEAR 的 300 号档不再清零',
    '  set_t(cid, 300, 0);\n  for (let count = 301; count <= 313; count += 1) {',
    '  void 300;\n  for (let count = 301; count <= 313; count += 1) {',
    '素质 300 已清',
  ),
  make(
    8327,
    'LOVE_LIKE_BASE 的「可爱的动物」档写错字',
    "    [12, true, '可爱的动物'],",
    "    [12, true, '可爱的动物！'],",
    '喜欢的东西 12',
  ),

  // —— @LOOK_INFO_LOVE 的评分半（love_score） ——
  make(
    8328,
    '高洁种族的世界 +1 改成 -1',
    '  if (RACES_NOBLE.includes(race)) {\n    main[LOVE.世界] += 1;',
    '  if (RACES_NOBLE.includes(race)) {\n    main[LOVE.世界] -= 1;',
    '种族 1',
  ),
  make(
    8329,
    '喜好 4（故乡的恋人）的恋人 +3 改成 +2',
    '  if (like === 4) {\n    main[LOVE.恋人] += 3;',
    '  if (like === 4) {\n    main[LOVE.恋人] += 2;',
    '喜好 4（故乡的恋人）',
  ),
  make(
    8330,
    '经验中档（> 30）的加值 2 改成 1',
    '    else if (v > 30) main[target] += 2;',
    '    else if (v > 30) main[target] += 1;',
    '经验補正',
  ),
  make(
    8331,
    '快乐刻印的倍率 3 改成 2',
    '  main[LOVE.コンプレックス] += mark_of(cid, M_快乐刻印) * 3;',
    '  main[LOVE.コンプレックス] += mark_of(cid, M_快乐刻印) * 2;',
    '快乐刻印',
  ),
  make(
    8332,
    '兽姦折半给野良犬时除数 2 改成 3',
    '  pool[LOVE.野良犬] += Math.trunc(main[LOVE.獣姦] / 2); // 獣姦好きは野良犬も好き',
    '  pool[LOVE.野良犬] += Math.trunc(main[LOVE.獣姦] / 3); // 獣姦好きは野良犬も好き',
    '60 = 牝犬 3 + 61/2',
  ),
  make(
    8333,
    '喜好 12 折算进第 0 项的除数 3 改成 2',
    '    pool[LOVE.喜欢的东西] += Math.trunc(main[LOVE.獣姦] / 3);',
    '    pool[LOVE.喜欢的东西] += Math.trunc(main[LOVE.獣姦] / 2);',
    '喜好 12 时把野良犬',
  ),
  make(
    8334,
    '崩坏的世界 -60 改成 -6',
    '    main[LOVE.世界] -= 60;',
    '    main[LOVE.世界] -= 6;',
    '崩坏',
  ),
  make(
    8335,
    '恋人（42）措辞的コンプレックス门槛 6 改成 8',
    "      text = main[LOVE.コンプレックス] > 6 ? '人妻' : '妈妈';",
    "      text = main[LOVE.コンプレックス] > 8 ? '人妻' : '妈妈';",
    '50 > 6',
  ),

  // —— @LOOK_INFO 的分支与显示 ——
  make(
    8336,
    '信仰行（与弃教行）的开门条件漏掉咒术持有者',
    '      t(cid, T_咒术) === 1 ||',
    '      false ||',
    '咒术侧的弃教文本',
  ),
  make(
    8337,
    '所持金 <= 0 的判据改成 < 0（0 元不再报身无分文）',
    '    if (money <= 0) {',
    '    if (money < 0) {',
    '身无分文',
  ),
  make(
    8338,
    '常识改变两项之间的分隔符从空格改成顿号',
    "        s.add(' ');",
    "        s.add('、');",
    '常识改变四态',
  ),
  make(
    8339,
    '男性也显示发型（`!male` 守卫拆掉）',
    "      if (!male) {\n        s.add(`][发型：${get_look_info(cid, '发型')}`);",
    "      if (true) {\n        s.add(`][发型：${get_look_info(cid, '发型')}`);",
    '男性不显示发型',
  ),
  make(
    8340,
    '成为勇者之前的前缀串写错（配下档的文本）',
    "          ? ['做勇者之前我是', '[成为勇者之前：']",
    "          ? ['做勇者之前我是', '[成为勇者之前!']",
    '来历',
  ),

  // —— @GET_LOOK_INFO：随实现搬进 ere/chara/look-info.js 的存量条目
  //    （M7826 来自 kojo.mjs、M7868-M7871 来自 chara-info.mjs；靶文件与
  //    tests 一并改到本票面，kojo/chara-info 两个分片的 COUNT 相应减一/减四） ——
  // —— @GET_LOOK_INFO：随实现搬进 ere/chara/look-info.js 的存量条目 ——
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
];
