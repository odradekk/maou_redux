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
export const COUNT = 84; // #570 起 +3（M11766-M11768，语尾行内拼接）；+3（M11774 调用点丢返回值、M11775 换行多空行、M11776 收尾另起一行）；+30（M11910-M11939，20 个语尾调用点的情绪档与其分支，含两处条件对调）；+3（M11960-M11962，显示面的上界/门槛/心形上限三个字面量——票里点名的 29/31 实测是等价变异，见条目头注）

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

  // —— #583：20 个语尾调用点各自传的情绪档（`CALL GOBI_KOUJO, <档>`） ——
  //
  // 这一批打在 ere/chara/look.js 的语尾实参上，守它们的是 test/look.test.js
  // 的「语尾档位表」：语尾族里装假处理函数返回 `〈档〉` 标记，按构造出的
  // 状态断言**整行**的标记序列——只断「行里有某档」会被同一行的另一个同档
  // 标记顶过去，档位写错照样绿（#570 抽样把 :1277 的 4 改成 0 时全绿，正是
  // 这个形状）。每条 must_mention 是那一行用例名/断言消息里的档位说明，
  // 逐字取自表里的 note。
  {
    desc: 'M11910 LOOK_INFO 首行语尾档位门槛 >= 3 收到 > 3（屈服刻印 3 落回 4）',
    file: look,
    find: '  const gobi_mark = mark_rank >= 3 ? 0 : 4; // (MARK:屈服刻印 >= 3) ? 0 # 4',
    replace: '  const gobi_mark = mark_rank > 3 ? 0 : 4; // 变异：门槛收到 > 3',
    tests: ['look'],
    must_mention: '源 :877 首行（屈服刻印 >= 3 → 0）',
  },
  {
    desc: 'M11911 LOOK_INFO 原种族不明的语尾两支对调（爱慕/淫乱 → 3，其余 → 0）',
    file: look,
    find: '        t3.add(await gobi_koujo(t(cid, T_服从) || t(cid, T_淫乱_T) ? 0 : 3));',
    replace:
      '        t3.add(await gobi_koujo(t(cid, T_服从) || t(cid, T_淫乱_T) ? 3 : 0));',
    tests: ['look'],
    must_mention: '源 :884 原种族不明（爱慕 → 0）',
  },
  {
    desc: 'M11912 LOOK_INFO 原种族不明的选档 || 改 &&（单侧命中就落到 3）',
    file: look,
    find: '        t3.add(await gobi_koujo(t(cid, T_服从) || t(cid, T_淫乱_T) ? 0 : 3));',
    replace:
      '        t3.add(await gobi_koujo(t(cid, T_服从) && t(cid, T_淫乱_T) ? 0 : 3));',
    tests: ['look'],
    must_mention: '源 :884 原种族不明（爱慕 → 0）',
  },
  {
    desc: 'M11913 LOOK_INFO 原种族已知的语尾两支对调（屈服刻印 >= 3 → 2，其余 → 0）',
    file: look,
    find: '        t3.add(await gobi_koujo(mark_rank >= 3 ? 0 : 2));',
    replace: '        t3.add(await gobi_koujo(mark_rank >= 3 ? 2 : 0));',
    tests: ['look'],
    must_mention: '源 :889 原种族已知（屈服刻印 < 3 → 2）',
  },
  {
    desc: 'M11914 LOOK_INFO 原种族已知的语尾门槛 >= 3 收到 > 3（屈服刻印 3 落回 2）',
    file: look,
    find: '        t3.add(await gobi_koujo(mark_rank >= 3 ? 0 : 2));',
    replace: '        t3.add(await gobi_koujo(mark_rank > 3 ? 0 : 2));',
    tests: ['look'],
    must_mention: '源 :889 原种族已知（屈服刻印 >= 3 → 0）',
  },
  {
    desc: 'M11915 LOOK_INFO 发色与性质的语尾档 1 改成 0（喜 → 默认）',
    file: look,
    find: `      s.hl(get_look_info(cid, '头发状态'));
      s.add(await gobi_koujo(1));`,
    replace: `      s.hl(get_look_info(cid, '头发状态'));
      s.add(await gobi_koujo(0));`,
    tests: ['look'],
    must_mention: '源 :931 发色与性质（喜 → 1）',
  },
  {
    desc: 'M11916 LOOK_INFO 头发长度・修剪・发型的语尾档 0 改成 1（默认 → 喜）',
    file: look,
    find: `      s.add(await gobi_koujo(0));
      s.add('」');
    } else {
      s.add(\`[头发长度：\${get_look_info(cid, '头发长度')}\`);`,
    replace: `      s.add(await gobi_koujo(1));
      s.add('」');
    } else {
      s.add(\`[头发长度：\${get_look_info(cid, '头发长度')}\`);`,
    tests: ['look'],
    must_mention: '源 :971 头发长度・修剪・发型（默认 → 0）',
  },
  {
    desc: 'M11917 LOOK_INFO 眼・瞳・唇的语尾档 1 改成 0（喜 → 默认）',
    file: look,
    find: `      s.hl(get_look_info(cid, '唇'));
      s.add(await gobi_koujo(1));`,
    replace: `      s.hl(get_look_info(cid, '唇'));
      s.add(await gobi_koujo(0));`,
    tests: ['look'],
    must_mention: '源 :1013 眼/瞳/唇（喜 → 1）',
  },
  {
    desc: 'M11918 LOOK_INFO 乳头的语尾档 0 改成 1（默认 → 喜）',
    file: look,
    find: `      s.add('乳头嘛……').hl(get_look_info(cid, '乳头'));
      s.add(await gobi_koujo(0));`,
    replace: `      s.add('乳头嘛……').hl(get_look_info(cid, '乳头'));
      s.add(await gobi_koujo(1));`,
    tests: ['look'],
    must_mention: '源 :1042 乳头（默认 → 0）',
  },
  {
    desc: 'M11919 LOOK_INFO 阴毛的语尾档 4 改成 0（害羞 → 默认；#570 抽样的逃逸形态）',
    file: look,
    find: `      s.add('下面的毛毛……').hl(get_look_info(cid, '阴毛状态'));
      s.add(await gobi_koujo(4));`,
    replace: `      s.add('下面的毛毛……').hl(get_look_info(cid, '阴毛状态'));
      s.add(await gobi_koujo(0));`,
    tests: ['look'],
    must_mention: '源 :1054 阴毛（害羞 → 4）',
  },
  {
    desc: 'M11920 LOOK_INFO 阴茎的语尾档 2 改成 0（怒 → 默认）',
    file: look,
    find: `        s.add('小鸡鸡是……').hl(get_look_info(cid, '阴茎的状态'));
        s.add(await gobi_koujo(2));`,
    replace: `        s.add('小鸡鸡是……').hl(get_look_info(cid, '阴茎的状态'));
        s.add(await gobi_koujo(0));`,
    tests: ['look'],
    must_mention: '源 :1069 阴茎（怒 → 2）',
  },
  {
    desc: 'M11921 LOOK_INFO 魅力点的语尾档 0 改成 1（默认 → 喜）',
    file: look,
    find: `      s.add(await gobi_koujo(0));
      s.hl(get_look_info(cid, '癖')).add('是我的习惯');`,
    replace: `      s.add(await gobi_koujo(1));
      s.hl(get_look_info(cid, '癖')).add('是我的习惯');`,
    tests: ['look'],
    must_mention: '源 :1093 魅力点（默认 → 0）',
  },
  {
    desc: 'M11922 LOOK_INFO 癖的语尾档 0 改成 1（默认 → 喜）',
    file: look,
    find: `      s.hl(get_look_info(cid, '癖')).add('是我的习惯');
      s.add(await gobi_koujo(0));`,
    replace: `      s.hl(get_look_info(cid, '癖')).add('是我的习惯');
      s.add(await gobi_koujo(1));`,
    tests: ['look'],
    must_mention: '源 :1105 癖（默认 → 0）',
  },
  {
    desc: 'M11923 LOOK_INFO 来历两块的语尾档一律传 0（丢掉前职业/契机算出的档）',
    file: look,
    find: `    s.hl(value);
    s.add(await gobi_koujo(gobi));`,
    replace: `    s.hl(value);
    s.add(await gobi_koujo(0));`,
    tests: ['look'],
    must_mention: '源 :1388 前职业贵族・聖女・軍人（誇らしい → 1）',
  },
  {
    desc: 'M11924 LOOK_INFO 前职业贵族・聖女・軍人的语尾档 1 改成 0',
    file: look,
    find: '  if (value === 8 || value === 12 || value === 19) return 1; // 貴族・聖女・軍人は誇らしい',
    replace:
      '  if (value === 8 || value === 12 || value === 19) return 0; // 变异：不再喜び',
    tests: ['look'],
    must_mention: '源 :1388 前职业贵族・聖女・軍人（誇らしい → 1）',
  },
  {
    desc: 'M11925 LOOK_INFO 前职业妓女・奴隷的语尾档 4 改成 0',
    file: look,
    find: '  if (value === 5 || value === 20) return 4; // 妓女・奴隷は恥ずかしい',
    replace: '  if (value === 5 || value === 20) return 0; // 变异：不再害羞',
    tests: ['look'],
    must_mention: '源 :1392 前职业妓女・奴隷（恥ずかしい → 4）',
  },
  {
    desc: 'M11926 LOOK_INFO 前职业表默认支的语尾档 0 改成 1（学生等落到喜び）',
    file: look,
    find: `  if (value === 7 || value === 9) return 5; // 物乞い・貧民は情けなくなる
  return 0;`,
    replace: `  if (value === 7 || value === 9) return 5; // 物乞い・貧民は情けなくなる
  return 1; // 变异：默认支不再默认`,
    tests: ['look'],
    must_mention: '源 :1403 前职业默认（学生 → 0）',
  },
  {
    desc: 'M11927 LOOK_INFO 前职业物乞い・貧民的语尾档 5 改成 0',
    file: look,
    find: '  if (value === 7 || value === 9) return 5; // 物乞い・貧民は情けなくなる',
    replace:
      '  if (value === 7 || value === 9) return 0; // 变异：不再情けない',
    tests: ['look'],
    must_mention: '源 :1400 前职业物乞い・貧民（情けない → 5）',
  },
  {
    desc: 'M11928 LOOK_INFO 契机啓示・故郷・平和・正義的语尾档 1 改成 0',
    file: look,
    find: '  if (value === 3 || value === 7 || value === 16 || value === 17) return 1; // 啓示・故郷・平和・正義',
    replace:
      '  if (value === 3 || value === 7 || value === 16 || value === 17) return 0; // 变异：不再喜び',
    tests: ['look'],
    must_mention: '源 :1454 契机啓示・故郷・平和・正義（誇らしい → 1）',
  },
  {
    desc: 'M11929 LOOK_INFO 契机罪・仕方なく的语尾档 4 改成 0',
    file: look,
    find: '  if (value === 10 || value === 14) return 4; // 罪・仕方なく',
    replace: '  if (value === 10 || value === 14) return 0; // 变异：不再害羞',
    tests: ['look'],
    must_mention: '源 :1458 契机罪・仕方なく（恥ずかしい → 4）',
  },
  {
    desc: 'M11930 LOOK_INFO 契机表默认支的语尾档 0 改成 1（運命等落到喜び）',
    file: look,
    find: `  if (value === 2 || value === 13) return 5; // 金のため・命令
  return 0;`,
    replace: `  if (value === 2 || value === 13) return 5; // 金のため・命令
  return 1; // 变异：默认支不再默认`,
    tests: ['look'],
    must_mention: '源 :1469 契机默认（運命 → 0）',
  },
  {
    desc: 'M11931 LOOK_INFO 契机金のため・命令的语尾档 5 改成 0',
    file: look,
    find: '  if (value === 2 || value === 13) return 5; // 金のため・命令',
    replace:
      '  if (value === 2 || value === 13) return 0; // 变异：不再情けない',
    tests: ['look'],
    must_mention: '源 :1466 契机金のため・命令（情けない → 5）',
  },
  {
    desc: 'M11932 LOOK_INFO 信仰的语尾档 1 改成 0（喜 → 默认）',
    file: look,
    find: `      if (kojo) {
        s.add(await gobi_koujo(1));
        s.add(\`（信仰值：\${faith}）」\`);`,
    replace: `      if (kojo) {
        s.add(await gobi_koujo(0));
        s.add(\`（信仰值：\${faith}）」\`);`,
    tests: ['look'],
    must_mention: '源 :1511 信仰（喜 → 1）',
  },
  {
    desc: 'M11933 LOOK_INFO 弃教的语尾档 1 改成 0（喜 → 默认）',
    file: look,
    find: `        if (kojo) {
          b.add(await gobi_koujo(1));`,
    replace: `        if (kojo) {
          b.add(await gobi_koujo(0));`,
    tests: ['look'],
    must_mention: '源 :1542 弃教（喜 → 1）',
  },
  {
    desc: 'M11934 LOOK_INFO 妊娠适性的语尾档 5 改成 0（情けない → 默认）',
    file: look,
    find: `      s.add(\`「\${self_call(cid)}\`).hl('不能正常的怀孕');
      s.add(await gobi_koujo(5));`,
    replace: `      s.add(\`「\${self_call(cid)}\`).hl('不能正常的怀孕');
      s.add(await gobi_koujo(0));`,
    tests: ['look'],
    must_mention: '源 :1567 妊娠适性（情けない → 5）',
  },
  {
    desc: 'M11935 LOOK_INFO 身无分文的语尾档 5 改成 0（情けない → 默认）',
    file: look,
    find: `      s.add('身无分文');
      if (kojo) s.add(await gobi_koujo(5));`,
    replace: `      s.add('身无分文');
      if (kojo) s.add(await gobi_koujo(0));`,
    tests: ['look'],
    must_mention: '源 :1585 身无分文（情けない → 5）',
  },
  {
    desc: 'M11936 LOOK_INFO 所持金 > 0 的语尾档 0 改成 5（默认 → 情けない）',
    file: look,
    find: `      s.add(String(money));
      if (kojo) s.add(await gobi_koujo(0));`,
    replace: `      s.add(String(money));
      if (kojo) s.add(await gobi_koujo(5));`,
    tests: ['look'],
    must_mention: '源 :1590 所持金 > 0（默认 → 0）',
  },
  {
    desc: 'M11937 LOOK_INFO 欠债的语尾档 5 改成 0（情けない → 默认）',
    file: look,
    find: `      s.color(String(0 - debt), LIGHT_GREEN);
      if (kojo) s.add(await gobi_koujo(5));`,
    replace: `      s.color(String(0 - debt), LIGHT_GREEN);
      if (kojo) s.add(await gobi_koujo(0));`,
    tests: ['look'],
    must_mention: '源 :1604 欠债（情けない → 5）',
  },
  {
    desc: 'M11938 LOOK_INFO 常识改变的语尾档 1 改成 0（喜 → 默认）',
    file: look,
    find: `      s.add(\`方面完全被改变了，真是可怜的\${self_call(cid)}\`);
      s.add(await gobi_koujo(1));`,
    replace: `      s.add(\`方面完全被改变了，真是可怜的\${self_call(cid)}\`);
      s.add(await gobi_koujo(0));`,
    tests: ['look'],
    must_mention: '源 :1653 常识改变（喜 → 1）',
  },
  {
    desc: 'M11939 LOOK_INFO_LOVE 喜好收尾的语尾档 1 改成 0（喜 → 默认）',
    file: look,
    find: '    s.add(`${await gobi_koujo(1)}」 `); // :2799 喜び语尾 + PRINTL 」 同一行',
    replace: '    s.add(`${await gobi_koujo(0)}」 `); // 变异：收尾档 1 → 0',
    tests: ['look'],
    must_mention: '源 :2799 喜好收尾（喜 → 1）',
  },

  // —— #591：显示面的三个字面量（LOVE_SORT_MAX / LOVE_SHOW_MIN / LOVE_HEART_MAX） ——
  //
  // 票里点名的是「LOVE_SORT_MAX 改成 29、31」两条，实测**两条都是等价变异**：
  // 能出文本的项只有 28 个名额（分支表 29 个 id 去掉恒不显示的 50），最坏也只
  // 排到 rank 27，上界取 [28, 100] 里任何值都逐字同输出；本角色的实测更松——
  // 「分数 > 3 的下标」23 个（含那个 50），过门槛的项排到 rank 22 就到头，rank 23
  // 起全是分数 ≤ 3 的下标、必被门槛 continue（25…32 逐个代入排序 + 显示，22 项
  // 与顺序完全一致，见 #591 完成报告）。于是本票改钉三处 **能观测**的：上界压进
  // 可观测区（22）、显示门槛（4）、心形上限（5），三条都由 test/look.test.js 的
  // 「满旋钮角色的显示面上限」拦下。
  make(
    11960,
    'LOVE_SORT_MAX 压进可观测区（30 → 22：末项「丈夫」连计数一起消失）',
    'const LOVE_SORT_MAX = 30;',
    'const LOVE_SORT_MAX = 22;',
    '共21个喜欢的东西',
  ),
  make(
    11961,
    '显示门槛 LOVE_SHOW_MIN 收紧到 4（分值正好 4 的「丈夫」被挡掉）',
    'const LOVE_SHOW_MIN = 3;',
    'const LOVE_SHOW_MIN = 4;',
    '共21个喜欢的东西',
  ),
  make(
    11962,
    '心形上限 LOVE_HEART_MAX 收到 5（满分项从 6 个心形掉成 5 个）',
    'const LOVE_HEART_MAX = 6;',
    'const LOVE_HEART_MAX = 5;',
    '人妻♡♡♡♡♡　',
  ),
];
