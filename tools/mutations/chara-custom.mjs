// 变异条目表分片：角色定制链（issue #392，N8 段 2）。
// 靶文件：ere/chara/chara-and-hair.js（FUNC_CHARA_AND_HAIR 真身）、
//         ere/chara/chara-custom.js（@CHAR_CREATE / @CHAR_APPEND 真身）、
//         ere/chara/chara-custom2.js（@CHAR_CUSTOM 一族真身）、
//         ere/chara/chara-custom3.js（外观页真身）。
// 守护测试：test/chara-and-hair.test.js、test/chara-custom.test.js、
//           test/chara-custom2.test.js、test/chara-custom3.test.js。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。
//
// M8805-M8820 是首轮验收返工的补表：M8761-M8804 全压在 and-hair/custom2/
// custom3 三个文件上，chara-custom.js（@CHAR_CREATE / @CHAR_APPEND）一条没有
// ——而它是留给 #398 的接口边。补表按「区间上界」这一种形状统一处理四个文件
// （验收用 `index <= 40` / `arg <= 210` 两处上界改坏时全绿）。
// M9001-M9009 是二轮验收返工的补表：把「排版与宽度常量」这一类补齐——栅格宽
// （GRID_COLUMNS 两处）、每行格数（HERO/ELITE_COLUMNS）、字段宽（补位 14/7）、
// 补位宽（编号右对齐 2）、以及「宽度必须按本行格数算」这条不变量（两处）。
// 这一类的观测通道是夹具按钮格的 `grid_width`（二轮验收实测：按钮格原先不记
// 宽度，栅格常量改了没有任何用例能发现；顺带查出 custom3 的冲行宽度是占位 0）。
// 四文件的条目数变为 14/13/30/12，共 69 条。
// 注意表只钉样本：同一形状的字面量还有不少靠用例本身守（如 custom2 的
// JOB_FIRST 职业下界、cost 扫描区间两端、and-hair 的素质名补位宽 10），
// 改动它们同样会有用例变红。

export const COUNT = 84; // #392 建表（M8761-M8804）＋ 首轮返工（M8805-M8820）＋ 二轮返工（M9001-M9009）；#567 +6（M11833-M11837/M11843，空输入语义与提示行）；#562 +1（M11865：PRINTLC 页脚不产生空行）

export default [
  // —— ere/chara/chara-and-hair.js ——

  {
    desc: 'M8761 SET_RANDOM_CHARASTERISTIC 的重掷判据改成 175（174 会落地）',
    file: 'ere/chara/chara-and-hair.js',
    find: '    if (talent_id === 174) {\n      continue; // :43-44\n    }',
    replace: '    if (talent_id === 175) {\n      continue; // :43-44\n    }',
    tests: ['chara-and-hair'],
    must_mention: '174',
  },
  {
    desc: 'M8762 性格随机上界 10 改 9（第 10 项永不掷中）',
    file: 'ere/chara/chara-and-hair.js',
    find: 'const temp = rand(GENERAL_CHARASTERISTICS.length); // :41',
    replace: 'const temp = rand(GENERAL_CHARASTERISTICS.length - 1); // :41',
    tests: ['chara-and-hair'],
    must_mention: '分母是表长 10',
  },
  {
    desc: 'M8763 发色随机上界 100 改 99（最后一档永不出现）',
    file: 'ere/chara/chara-and-hair.js',
    find: 'const roll = rand(100); // :161 SELECTCASE RAND:100',
    replace: 'const roll = rand(99); // :161 SELECTCASE RAND:100',
    tests: ['chara-and-hair'],
    must_mention: 'RAND:100 的上界',
  },
  {
    desc: 'M8764 粉髪编码 11 改 10（0 号掷出别的颜色）',
    file: 'ere/chara/chara-and-hair.js',
    find: '    color_id = 11; // :162-164 粉髪',
    replace: '    color_id = 10; // :162-164 粉髪',
    tests: ['chara-and-hair'],
    must_mention: '掷出 0',
  },
  {
    desc: 'M8765 金髪档上界 20 改 19（20 号落进青髪）',
    file: 'ere/chara/chara-and-hair.js',
    find: '  } else if (roll <= 20) {\n    color_id = 1; // :165-167 金髪',
    replace: '  } else if (roll <= 19) {\n    color_id = 1; // :165-167 金髪',
    tests: ['chara-and-hair'],
    must_mention: '掷出 20',
  },
  {
    desc: 'M8766 銀髪档上界 97 改 98（98 号落进銀髪）',
    file: 'ere/chara/chara-and-hair.js',
    find: '  } else if (roll <= 97) {\n    color_id = 4; // :180-182 赤毛',
    replace: '  } else if (roll <= 98) {\n    color_id = 4; // :180-182 赤毛',
    tests: ['chara-and-hair'],
    must_mention: '掷出 98',
  },
  {
    desc: 'M8767 CHOOSE_CHARASTERISTIC 每行项数缺省 3 改 4',
    file: 'ere/chara/chara-and-hair.js',
    find: 'async function choose_charasteristic(cid = -1, per_line = 3) {',
    replace: 'async function choose_charasteristic(cid = -1, per_line = 4) {',
    tests: ['chara-and-hair'],
    must_mention: '每 3 项换行',
  },
  {
    desc: 'M8768 素质名补位宽度 10 改 11',
    file: 'ere/chara/chara-and-hair.js',
    find: '`[${pad_left(String(i), 2)}] ${pad_right(talentname(talent_id), 10)}`',
    replace:
      '`[${pad_left(String(i), 2)}] ${pad_right(talentname(talent_id), 11)}`',
    tests: ['chara-and-hair'],
    must_mention: 'N160',
  },
  {
    desc: 'M8769 CHOOSE_HAIRCOLOR 的 SIZE 12 改 11（12 号被拒收）',
    file: 'ere/chara/chara-and-hair.js',
    find: '  const size = 12; // :217',
    replace: '  const size = 11; // :217',
    tests: ['chara-and-hair'],
    must_mention: '12 号是允许的',
  },
  {
    desc: 'M8770 CHOOSE_HAIRCOLOR 每行项数缺省 6 改 5',
    file: 'ere/chara/chara-and-hair.js',
    find: 'async function choose_haircolor(cid = -1, per_line = 6) {',
    replace: 'async function choose_haircolor(cid = -1, per_line = 5) {',
    tests: ['chara-and-hair'],
    must_mention: '每 6 项换行',
  },
  {
    desc: 'M8771 SHOW_CHARASTERISTIC 的首位命中序号改错（返回表内序号 +1）',
    file: 'ere/chara/chara-and-hair.js',
    // #565 返工起 SHOW 的查询半段抽成 charasteristic_index（按钮拼正文要
    // 只查不打印），变异靶随之挪到 index 的命中返回
    find: 'function charasteristic_index(cid) {\n  for (let i = 0; i < GENERAL_CHARASTERISTICS.length; i += 1) {\n    const talent_id = GENERAL_CHARASTERISTICS[i]; // :7-27\n    if (talent(cid, talent_id)) {\n      return i;',
    replace:
      'function charasteristic_index(cid) {\n  for (let i = 0; i < GENERAL_CHARASTERISTICS.length; i += 1) {\n    const talent_id = GENERAL_CHARASTERISTICS[i]; // :7-27\n    if (talent(cid, talent_id)) {\n      return i + 1; // 变异：命中序号 +1',
    tests: ['chara-and-hair'],
    must_mention: '首位命中是表内第 2 项',
  },
  {
    desc: 'M8772 SET_HAIRCOLOR 写素质 300 而非 301（发色写到头发状态）',
    file: 'ere/chara/chara-and-hair.js',
    find: '  set_talent(chara_id, 300, value); // :201',
    replace: '  set_talent(chara_id, 301, value); // :201',
    tests: ['chara-and-hair'],
    must_mention: '发色落在 talent:1:300',
  },

  // —— ere/chara/chara-custom3.js ——

  {
    desc: 'M8773 外观组的换行阈值 80 改 40（每行项数减半）',
    file: 'ere/chara/chara-custom3.js',
    find: 'const WRAP_WIDTH = 80;',
    replace: 'const WRAP_WIDTH = 40;',
    tests: ['chara-custom3'],
    must_mention: '达到 80 就换行',
  },
  {
    desc: 'M8774 空串早退阈值 10 改 9',
    file: 'ere/chara/chara-custom3.js',
    find: 'const MAX_BLANKS = 10;',
    replace: 'const MAX_BLANKS = 9;',
    tests: ['chara-custom3'],
    must_mention: '恰好 10 个空串不触发 BREAK',
  },
  {
    desc: 'M8775 每项宽度加算的间隔 2 改 3（换行位置提前）',
    file: 'ere/chara/chara-custom3.js',
    find: '    line_len += length + 2; // :212',
    replace: '    line_len += length + 3; // :212',
    tests: ['chara-custom3'],
    must_mention: '达到 80 就换行',
  },
  {
    desc: 'M8776 外观按钮的编码用序号而非「组号 × 100 + 序号」',
    file: 'ere/chara/chara-custom3.js',
    find: '      accelerator: idx * 100 + i, // :223',
    replace: '      accelerator: idx + i, // :223',
    tests: ['chara-custom3'],
    must_mention: '1101',
  },
  {
    desc: 'M8777 头发长度的档位换算 ÷100 改 ÷10',
    file: 'ere/chara/chara-custom3.js',
    find: '      Math.trunc((talent(cid, T_头发长度) - 1) / 100),',
    replace: '      Math.trunc((talent(cid, T_头发长度) - 1) / 10),',
    tests: ['chara-custom3'],
    must_mention: '1302',
  },
  {
    desc: 'M8778 体型写回时 +2 改 +1',
    file: 'ere/chara/chara-custom3.js',
    find: '    set_talent(cid, T_体型, val * 100 + 2); // :147',
    replace: '    set_talent(cid, T_体型, val * 100 + 1); // :147',
    tests: ['chara-custom3'],
    must_mention: '2402',
  },
  {
    desc: 'M8779 阴毛状态的 20 归上一档（重叠区间取序反了）',
    file: 'ere/chara/chara-custom3.js',
    find: '  if (value >= 2 && value <= 20) return 1; // :45-46',
    replace: '  if (value >= 2 && value < 20) return 1; // :45-46',
    tests: ['chara-custom3'],
    must_mention: '阴毛状态 20',
  },
  {
    desc: 'M8780 阴毛状态写回的第三档 21 改 22',
    file: 'ere/chara/chara-custom3.js',
    find: '    const PUBIC_VALUES = [1, 2, 21, 51, 101, 151, 202];',
    replace: '    const PUBIC_VALUES = [1, 2, 22, 51, 101, 151, 202];',
    tests: ['chara-custom3'],
    must_mention: '第 2 档',
  },
  {
    desc: 'M8781 未登记的组号返回 0 而非 -1（无效值提示永不出现）',
    file: 'ere/chara/chara-custom3.js',
    find: '    return -1; // :179-180',
    replace: '    return 0; // :179-180',
    tests: ['chara-custom3'],
    must_mention: '未登记的组号返回 -1',
  },
  {
    desc: 'M8782 精英种族组的组号 2 改 3',
    file: 'ere/chara/chara-custom3.js',
    find: '    print_arr_group(ARR_种族2, talent(cid, T_种族2), 2); // :103',
    replace: '    print_arr_group(ARR_种族2, talent(cid, T_种族2), 3); // :103',
    tests: ['chara-custom3'],
    must_mention: '精英种族',
  },

  // —— ere/chara/chara-custom2.js ——

  {
    desc: 'M8783 基础价 500000 改 400000',
    file: 'ere/chara/chara-custom2.js',
    find: '  return cost + 500000; // :593',
    replace: '  return cost + 400000; // :593',
    tests: ['chara-custom2'],
    must_mention: '500000',
  },
  {
    desc: 'M8784 粉毛加算 100000 改 1（加算几乎消失）',
    file: 'ere/chara/chara-custom2.js',
    find: '    cost += 100000; // :588-589 粉毛加十万',
    replace: '    cost += 1; // :588-589 粉毛加十万',
    tests: ['chara-custom2'],
    must_mention: '粉毛',
  },
  {
    desc: 'M8785 负值钳位删掉（负价原样透传）',
    file: 'ere/chara/chara-custom2.js',
    find: '  if (cost < 0) {\n    cost = 0; // :591-592 素质加算价格不为负数\n  }',
    replace:
      '  if (cost < -1e9) {\n    cost = 0; // :591-592 素质加算价格不为负数\n  }',
    tests: ['chara-custom2'],
    must_mention: '负价钳到 0',
  },
  {
    desc: 'M8786 单价档「-50000」改成「+50000」',
    file: 'ere/chara/chara-custom2.js',
    find: '  { list: [11, 12, 15, 16, 84, 100, 133], delta: -50000 },',
    replace: '  { list: [11, 12, 15, 16, 84, 100, 133], delta: 50000 },',
    tests: ['chara-custom2'],
    must_mention: '档位 11',
  },
  {
    desc: 'M8787 职业档的加额 10000 改 1000',
    file: 'ere/chara/chara-custom2.js',
    find: '  { list: [221, 222], ranges: [[200, 220]], delta: 10000 },',
    replace: '  { list: [221, 222], ranges: [[200, 220]], delta: 1000 },',
    tests: ['chara-custom2'],
    must_mention: '档位 200',
  },
  {
    desc: 'M8788 价格扫描区间 500 改 400（400-499 的素质不计价）',
    file: 'ere/chara/chara-custom2.js',
    find: '  for (let index = 0; index < 500; index += 1) {',
    replace: '  for (let index = 0; index < 400; index += 1) {',
    tests: ['chara-custom2'],
    must_mention: '扫描区间是 0-499',
  },
  {
    desc: 'M8789 CONFLICT_CHECK 只清右侧（左侧留着）',
    file: 'ere/chara/chara-custom2.js',
    find: '      set_talent(cid, arg, 1); // :256',
    replace: '      set_talent(cid, arg, 0); // :256',
    tests: ['chara-custom2'],
    must_mention: '对 0/75',
  },
  {
    desc: 'M8790 口上唯一组漏掉 174（貴公子与别人共存）',
    file: 'ere/chara/chara-custom2.js',
    find: 'const PERSONALITY_TALENTS = [160, 161, 162, 163, 164, 166, 172, 173, 174, 175];',
    replace:
      'const PERSONALITY_TALENTS = [160, 161, 162, 163, 164, 166, 172, 173, 175];',
    tests: ['chara-custom2'],
    must_mention: '贵公子',
  },
  {
    desc: 'M8791 职业唯一区间上界 220 改 221',
    file: 'ere/chara/chara-custom2.js',
    find: 'const JOB_LAST = 220;',
    replace: 'const JOB_LAST = 221;',
    tests: ['chara-custom2'],
    must_mention: '221 不在职业唯一区间内',
  },
  {
    desc: 'M8792 精英固定魔族的种族值 9 改 8',
    file: 'ere/chara/chara-custom2.js',
    find: '    set_talent(cid, T_种族, 9);',
    replace: '    set_talent(cid, T_种族, 8);',
    tests: ['chara-custom2'],
    must_mention: '固定魔族',
  },
  {
    desc: 'M8793 龍族有角的种族码 5 改 4',
    file: 'ere/chara/chara-custom2.js',
    find: '  if (talent(cid, T_种族) === 5) {',
    replace: '  if (talent(cid, T_种族) === 4) {',
    tests: ['chara-custom2'],
    must_mention: '龍族',
  },
  {
    desc: 'M8794 纤细体型阈值 100 改 101',
    file: 'ere/chara/chara-custom2.js',
    find: '  if (talent(cid, T_体型) <= 100) {\n    set_talent(cid, 115, 0);\n  }',
    replace:
      '  if (talent(cid, T_体型) <= 101) {\n    set_talent(cid, 115, 0);\n  }',
    tests: ['chara-custom2'],
    must_mention: '纤细体型',
  },
  {
    desc: 'M8795 素质格每行 6 格改 5',
    file: 'ere/chara/chara-custom2.js',
    find: 'const TALENT_COLUMNS = 6;',
    replace: 'const TALENT_COLUMNS = 5;',
    tests: ['chara-custom2'],
    must_mention: '每行 6 格',
  },
  {
    desc: 'M8796 素质页的行高 27 改 26',
    file: 'ere/chara/chara-custom2.js',
    find: 'const TALENT_PAGE_ROWS = 27;',
    replace: 'const TALENT_PAGE_ROWS = 26;',
    tests: ['chara-custom2'],
    must_mention: '页体恒 27 行',
  },
  {
    desc: 'M8797 页数上界 4 改 3（第 5 页不可达）',
    file: 'ere/chara/chara-custom2.js',
    find: 'const PAGE_LAST = PAGE_COUNT - 1;',
    replace: 'const PAGE_LAST = PAGE_COUNT - 2;',
    tests: ['chara-custom2'],
    must_mention: '5/5',
  },
  {
    desc: 'M8798 素质页上界 2 改 1（第 3 页走外观分支）',
    file: 'ere/chara/chara-custom2.js',
    find: 'const TALENT_PAGE_LAST = 2;',
    replace: 'const TALENT_PAGE_LAST = 1;',
    tests: ['chara-custom2'],
    must_mention: '第 3 页仍是素质页',
  },
  {
    desc: 'M8799 妊娠素质成立时的出产日 +10 改 +20',
    file: 'ere/chara/chara-custom2.js',
    find: '            chara(cid).event.预产日 = era_flag.day_count + 10 + rand(6); // :80',
    replace:
      '            chara(cid).event.预产日 = era_flag.day_count + 20 + rand(6); // :80',
    tests: ['chara-custom2'],
    must_mention: '预产日',
  },
  {
    desc: 'M8800 出产日的 RAND:6 上界改 5',
    file: 'ere/chara/chara-custom2.js',
    find: 'chara(cid).event.预产日 = era_flag.day_count + 10 + rand(6); // :80',
    replace:
      'chara(cid).event.预产日 = era_flag.day_count + 10 + rand(5); // :80',
    tests: ['chara-custom2'],
    must_mention: 'RAND:6 的上界',
  },
  {
    desc: 'M8801 魔族新勇者的现种族 RAND:3 上界改 2',
    file: 'ere/chara/chara-custom2.js',
    find: '            set_talent(cid, 322, rand(3) + 191);',
    replace: '            set_talent(cid, 322, rand(2) + 191);',
    tests: ['chara-custom2'],
    must_mention: 'RAND:3 上界被测试固定',
  },
  {
    desc: 'M8802 初吻对象的「唇」判定 <100 改 <200（阴茎档被吞）',
    file: 'ere/chara/chara-custom2.js',
    find: "        } else if (chara(cid).train.初吻对象 < 300) {\n          tail = '阴茎]'; // :756-757",
    replace:
      "        } else if (chara(cid).train.初吻对象 < 400) {\n          tail = '阴茎]'; // :756-757",
    tests: ['chara-custom2'],
    must_mention: '按部位编码与部位词',
  },
  {
    desc: 'M8803 初始化的等级 CFLAG:9 写 2 而非 1',
    file: 'ere/chara/chara-custom2.js',
    find: '          chara(cid).chara.等级 = 1; // :62 CFLAG:A:9',
    replace: '          chara(cid).chara.等级 = 2; // :62 CFLAG:A:9',
    tests: ['chara-custom2'],
    must_mention: '等级初始化',
  },
  {
    desc: 'M8804 扣款漏掉非作弊资金 EX_FLAG:4444 一侧',
    file: 'ere/chara/chara-custom2.js',
    find: '              era_exflag.legit_money -= price; // :97 EX_FLAG:4444 -= PRICE',
    replace:
      '              era_exflag.legit_money += 0; // :97 EX_FLAG:4444 -= PRICE',
    tests: ['chara-custom2'],
    must_mention: 'EX_FLAG',
  },

  // —— 首轮验收返工补表：区间上界与 chara-custom.js 的分布 ——

  {
    desc: 'M8805 CHAR_CREATE 的「已在场复用」区间上界 40 改 39（首轮验收漏网的那一处）',
    file: 'ere/chara/chara-custom.js',
    find: '    if (index >= 17 && index <= 40) {',
    replace: '    if (index >= 17 && index <= 39) {',
    tests: ['chara-custom'],
    must_mention: '特殊位区间上界 40',
  },
  {
    desc: 'M8806 CHAR_APPEND 精英段的区间上界 210 改 209（首轮验收漏网的那一处）',
    file: 'ere/chara/chara-custom.js',
    find: '  } else if (arg >= 201 && arg <= 210) {',
    replace: '  } else if (arg >= 201 && arg <= 209) {',
    tests: ['chara-custom'],
    must_mention: '精英（201-210）在模式 1 同样走 CHAR_MAKE',
  },
  {
    desc: 'M8807 CHAR_CREATE 输入映射的区间上界 60 改 59（60 落进兜底臂）',
    file: 'ere/chara/chara-custom.js',
    find: '    } else if (result >= 37 && result <= 60) {',
    replace: '    } else if (result >= 37 && result <= 59) {',
    tests: ['chara-custom'],
    must_mention: '特殊位区间上界 40',
  },
  {
    desc: 'M8808 CHAR_APPEND 勇者段的区间上界 16 改 15（16 号不再随机成型）',
    file: 'ere/chara/chara-custom.js',
    find: '  if (arg >= 1 && arg <= 16) {',
    replace: '  if (arg >= 1 && arg <= 15) {',
    tests: ['chara-custom'],
    must_mention: '勇者（1-16）在模式 1 走 CHAR_MAKE',
  },
  {
    desc: 'M8809 CHAR_APPEND 精英段的区间下界 201 改 202（201 号不再随机成型）',
    file: 'ere/chara/chara-custom.js',
    find: '  } else if (arg >= 201 && arg <= 210) {',
    replace: '  } else if (arg >= 202 && arg <= 210) {',
    tests: ['chara-custom'],
    must_mention: '精英（201-210）在模式 1 同样走 CHAR_MAKE',
  },
  {
    desc: 'M8810 特殊段的 FOR 上界 40 改 39（39 号不再列出）',
    file: 'ere/chara/chara-custom.js',
    find: '    for (let i = 17; i < 40; i += 1) {',
    replace: '    for (let i = 17; i < 39; i += 1) {',
    tests: ['chara-custom'],
    must_mention: '特殊段列 17-39',
  },
  {
    desc: 'M8811 CASE 35, 31 TO 33 的区间上界 33 改 32（33 号不再走 CHAR_INIT）',
    file: 'ere/chara/chara-custom.js',
    find: '  } else if ((arg >= 31 && arg <= 33) || arg === 35) {',
    replace: '  } else if ((arg >= 31 && arg <= 32) || arg === 35) {',
    tests: ['chara-custom'],
    must_mention: 'CASE 31-33 与 35 走 CHAR_INIT',
  },
  {
    desc: 'M8812 名字长度上界 16 改 15（16 字的名字被拒）',
    file: 'ere/chara/chara-custom.js',
    find: 'const NAME_MAX_LENGTH = 16;',
    replace: 'const NAME_MAX_LENGTH = 15;',
    tests: ['chara-custom'],
    must_mention: '名字长度上界 16',
  },
  {
    desc: 'M8813 妊娠素质的析取链换掉 153（该素质不再触发预产日）',
    file: 'ere/chara/chara-custom2.js',
    find: '          const pregnant =\n            talent(cid, 153) ||',
    replace: '          const pregnant =\n            talent(cid, 154) ||',
    tests: ['chara-custom2'],
    must_mention: '五种妊娠素质各自触发预产日',
  },
  {
    // 注：BUST_TALENTS 里删掉某一档是**等价变异**——五档在 CONFLICT_PAIRS 里
    // 构成为两两互斥的完全图（109/110/114/116/119 十条对全在表内），组内
    // 清空循环与互斥检查重叠，任一侧单独生效都看不出差别。故这里改钉 :173
    // 的还原行：`bust` 是取反后的值，替换成常量会让选中项落回 0
    desc: 'M8814 胸围组选中项的还原值改成常量 0（选中项被清空）',
    file: 'ere/chara/chara-custom2.js',
    find: '    set_talent(cid, l_tal, bust); // :173',
    replace: '    set_talent(cid, l_tal, 0); // :173',
    tests: ['chara-custom2'],
    must_mention: '胸围五档互斥',
  },
  {
    desc: 'M8815 TALENT_DEAL 的区间上界 500 改 499（500 号被拒）',
    file: 'ere/chara/chara-custom2.js',
    find: '  if (!(l_tal >= 0 && l_tal <= 500)) {',
    replace: '  if (!(l_tal >= 0 && l_tal <= 499)) {',
    tests: ['chara-custom2'],
    must_mention: '区间两端（0 与 500）都放行',
  },
  {
    desc: 'M8816 外观页点选后的纤细体型阈值 100 改 101（标准体型被误清）',
    file: 'ere/chara/chara-custom2.js',
    find: '        if (talent(cid, T_体型) <= 100) {\n          set_talent(cid, 115, 0); // :1-153 纤细体型不肥胖',
    replace:
      '        if (talent(cid, T_体型) <= 101) {\n          set_talent(cid, 115, 0); // :1-153 纤细体型不肥胖',
    tests: ['chara-custom2'],
    must_mention: '外观页点选后按体型清肥胖位',
  },
  {
    desc: 'M8817 设定完备后不再进入初体验问卷（:534 的调用删掉）',
    file: 'ere/chara/chara-custom2.js',
    find: '    await chara_first_xp(cid); // :534',
    replace: '    await Promise.resolve(); // :534',
    tests: ['chara-custom2'],
    must_mention: 'TALENT_EMPTY_CHECK：完备时返回 0',
  },
  {
    desc: 'M8818 EMPTY_CHECK 职业区间的上界 220 改 221（221 号也算职业）',
    file: 'ere/chara/chara-custom2.js',
    find: '    } else if (index >= 200 && index <= 220) {',
    replace: '    } else if (index >= 200 && index <= 221) {',
    tests: ['chara-custom2'],
    must_mention: '性格与职业区间的四端',
  },
  {
    desc: 'M8819 阴毛状态分档的上界 500 改 499（500 落进 CASEELSE）',
    file: 'ere/chara/chara-custom3.js',
    find: '  if (value >= 201 && value <= 500) return 6; // :55-56',
    replace: '  if (value >= 201 && value <= 499) return 6; // :55-56',
    tests: ['chara-custom3'],
    must_mention: '阴毛状态七个档位的上下界',
  },
  {
    desc: 'M8820 SET_CHARASTERISTIC 的表外兜底从素质 0 改成 1（写错下标）',
    file: 'ere/chara/chara-and-hair.js',
    find: '  const talent_id = GENERAL_CHARASTERISTICS[index] ?? 0; // :62',
    replace: '  const talent_id = GENERAL_CHARASTERISTICS[index] ?? 1; // :62',
    tests: ['chara-and-hair'],
    must_mention: '序号在表外',
  },

  // —— 二轮验收返工补表：排版与宽度常量（M9001-M9009） ——

  {
    desc: 'M9001 素质格的栅格宽 24 改 23（6 格行的每格宽度 4 → 3）',
    file: 'ere/chara/chara-custom2.js',
    find: 'const GRID_COLUMNS = 24;',
    replace: 'const GRID_COLUMNS = 23;',
    tests: ['chara-custom2'],
    must_mention: '每行格数与每格宽度',
  },
  {
    desc: 'M9002 外观组的栅格宽 24 改 23（12 格行的每格宽度 2 → 1）',
    file: 'ere/chara/chara-custom3.js',
    find: 'const GRID_COLUMNS = 24;',
    replace: 'const GRID_COLUMNS = 23;',
    tests: ['chara-custom3'],
    must_mention: '每格宽度',
  },
  {
    desc: 'M9003 外观组的每格宽度改回占位的 0（冲行那一刻不再算）',
    file: 'ere/chara/chara-custom3.js',
    find: '    const width = Math.floor(GRID_COLUMNS / row.length);',
    replace: '    const width = 0;',
    tests: ['chara-custom3'],
    must_mention: '每格宽度',
  },
  {
    desc: 'M9004 素质格宽度按固定 6 格算（残行的宽度全错）',
    file: 'ere/chara/chara-custom2.js',
    find: '      Math.floor(GRID_COLUMNS / pending_talents.length),',
    replace: '      Math.floor(GRID_COLUMNS / TALENT_COLUMNS),',
    tests: ['chara-custom2'],
    must_mention: '每格宽度',
  },
  {
    desc: 'M9005 勇者段每行格数 4 改 3',
    file: 'ere/chara/chara-custom.js',
    find: 'const HERO_COLUMNS = 4;',
    replace: 'const HERO_COLUMNS = 3;',
    tests: ['chara-custom'],
    must_mention: '勇者段每行 4 格',
  },
  {
    desc: 'M9006 精英段每行格数 5 改 4',
    file: 'ere/chara/chara-custom.js',
    find: 'const ELITE_COLUMNS = 5;',
    replace: 'const ELITE_COLUMNS = 4;',
    tests: ['chara-custom'],
    must_mention: '勇者段每行 4 格',
  },
  {
    desc: 'M9007 预设名字的字段宽 14 改 15（列表整行错位）',
    file: 'ere/chara/chara-custom.js',
    find: '${pad_right(csv_name(preset), 14)}`;',
    replace: '${pad_right(csv_name(preset), 15)}`;',
    tests: ['chara-custom'],
    must_mention: '勇者段每行 4 格',
  },
  {
    desc: 'M9008 显示编号的补位宽 2 改 3（`[ 1]` 变 `[  1]`）',
    file: 'ere/chara/chara-custom.js',
    find: '    current += `[${pad_left(String(label), 2)}] ${pad_right(csv_name(preset), 14)}`;',
    replace:
      '    current += `[${pad_left(String(label), 3)}] ${pad_right(csv_name(preset), 14)}`;',
    tests: ['chara-custom'],
    must_mention: '勇者段每行 4 格',
  },
  {
    desc: 'M9009 发色名的字段宽 7 改 8（列表整行错位）',
    file: 'ere/chara/chara-and-hair.js',
    find: "    row += `[${pad_left(String(color_id), 2)}] ${pad_right(ARR_HAIRCOLOR[color_id] ?? '', 7)}`;",
    replace:
      "    row += `[${pad_left(String(color_id), 2)}] ${pad_right(ARR_HAIRCOLOR[color_id] ?? '', 8)}`;",
    tests: ['chara-and-hair'],
    must_mention: '每 6 项换行',
  },
  // —— #567：自由文本输入的空输入语义统一（0 ＝ 空输入）——
  // chara-custom 的名字输入与 chara-custom2 的两处自定义输入从 A 翻修到 B，
  // 提示行各补一句输入 0 的说明；靶与断言见 test/chara-custom.test.js、
  // test/chara-custom2.test.js 的「输入 0」用例。
  {
    desc: 'M11833 char_append 的名字输入改回 A 语义（0 落成名字「0」，:261-264 支不可达）',
    file: 'ere/chara/chara-custom.js',
    find: "      const name = input_text(raw); // :251 LOCALS '= RESULTS（0 经共享判据归空串）",
    replace: "      const name = String(raw ?? ''); // 变异：A 语义",
    tests: ['chara-custom'],
    must_mention: '输入 0 不再落成字面量「0」',
  },
  {
    desc: 'M11834 名字提示行的输入 0 说明改坏（玩家看不到「不输入」的替代操作）',
    file: 'ere/chara/chara-custom.js',
    find: "      era.print('（输入 0 随机生成名字）');",
    replace: "      era.print('（输入 0 随机生成）');",
    tests: ['chara-custom'],
    must_mention: 'ere 侧补的输入 0 说明（#567）',
  },
  {
    desc: 'M11835 初吻自定义输入改回 A 语义（0 落成名字「0」，部位一问照问）',
    file: 'ere/chara/chara-custom2.js',
    find: '        kiss_name = input_text(await era.input()); // :647-648 INPUTS + RESULTS',
    replace:
      "        kiss_name = String((await era.input()) ?? ''); // 变异：A 语义",
    tests: ['chara-custom2'],
    must_mention: ':656 的播报',
  },
  {
    desc: 'M11836 初体验自定义输入改回 A 语义（0 落成名字「0」，随机支不可达）',
    file: 'ere/chara/chara-custom2.js',
    find: '          sex_name = input_text(await era.input()); // :695-696',
    replace:
      "          sex_name = String((await era.input()) ?? ''); // 变异：A 语义",
    tests: ['chara-custom2'],
    must_mention: ':704 的播报',
  },
  {
    desc: 'M11837 初吻提示行的输入 0 说明改坏（玩家看不到「不输入」的替代操作）',
    file: 'ere/chara/chara-custom2.js',
    find: `        // ere 侧补的输入 0 说明（#567：引擎不受理空提交，0 是「不输入」的可达形态）
        era.print('（输入 0 随机生成初吻对象）');`,
    replace: `        // 变异：初吻的输入 0 说明删除`,
    tests: ['chara-custom2'],
    must_mention: 'ere 侧补的输入 0 说明（#567）',
  },
  {
    desc: 'M11843 初体验提示行的输入 0 说明改坏（同一文案两处各钉一条，删一处不再共享断言）',
    file: 'ere/chara/chara-custom2.js',
    find: `          // ere 侧补的输入 0 说明（#567：引擎不受理空提交，0 是「不输入」的可达形态）
          era.print('（输入 0 随机生成初体验对象）');`,
    replace: `          // 变异：初体验的输入 0 说明删除`,
    tests: ['chara-custom2'],
    must_mention: 'ere 侧补的输入 0 说明（#567）',
  },
  {
    // #562：PRINTLC 不换行，页脚四个按钮那一行由 :45 的 PRINTL 收尾后即入
    // INPUT（见 CONTEXT.md「输出 API 与原作的对应」）
    desc: 'M11865 角色定制页脚补回空行（照「PRINTLC 自带换行」翻译的旧形态）',
    file: 'ere/chara/chara-custom2.js',
    find: "    era.printButton('后一页', 998); // :44",
    replace:
      "    era.printButton('后一页', 998); // :44\n    era.println(); // 变异：页脚之后多补空行",
    tests: ['chara-custom2'],
    must_mention: '角色定制页脚按钮之后不应有空行',
  },
  // —— #572：角色定制菜单的选项按钮化与「保持纯文本」两处 ——
  {
    desc: 'M12010 CHARA_FIRST_XP 的初吻对象菜单退回纯文本行',
    file: 'ere/chara/chara-custom2.js',
    find: "    era.printButton('不明', 0);",
    replace:
      "    era.print('[0] 不明 [1] 魔王 [993] 狂王 [994] 怪物 [995] 野狗 [999] 触手'); // 变异",
    tests: ['chara-custom2'],
    must_mention: '输入不合法！请输入以下值之一：',
  },
  {
    desc: 'M12011 CHARA_FIRST_XP 的部位菜单退回纯文本行（四个区间都点不动）',
    file: 'ere/chara/chara-custom2.js',
    find: "      era.printButton('唇', 1); // :618",
    replace: "      era.print('[1] 唇 '); // 变异",
    tests: ['chara-custom2'],
    must_mention: '输入不合法！请输入以下值之一：',
  },
  {
    desc: 'M12012 CHARA_FIRST_XP 的确认退回纯文本行',
    file: 'ere/chara/chara-custom2.js',
    find: "    era.printButton('还是改一下吧', 1);",
    replace: "    era.print('[0] 好的 [1] 还是改一下吧'); // 变异",
    tests: ['chara-custom2'],
    must_mention: '输入不合法！请输入以下值之一：',
  },
  {
    desc: 'M12013 CHAR_CUSTOM 最终确认退回纯文本行（1/2 两档点不动）',
    file: 'ere/chara/chara-custom2.js',
    find: "          era.printButton('好，就是这样了！', 1);",
    replace:
      "          era.print('[1] 好，就是这样了！  [2] 我还想再修改一下。 '); // 变异",
    tests: ['chara-custom2'],
    must_mention: '输入不合法！请输入以下值之一：',
  },
  {
    desc: 'M12014 CHAR_APPEND 的性别选项改成按钮（源是 PRINTFORMW，WAIT 会把按钮整批禁用）',
    file: 'ere/chara/chara-custom.js',
    find: "    era.print('[1] 男性      [2] 女性      [3] 扶她'); // :240",
    replace:
      "    era.printButton('男性', 1);\n    era.printButton('女性', 2);\n    era.printButton('扶她', 3); // 变异",
    tests: ['chara-custom'],
    must_mention: '性别选项仍是纯文本行',
  },
  {
    desc: 'M12015 CHARA_FIRST_XP 的野狗部位菜单退回纯文本行',
    file: 'ere/chara/chara-custom2.js',
    find: "      era.printButton('嘴', 3); // :634",
    replace: "      era.print('[3] 嘴'); // 变异",
    tests: ['chara-custom2'],
    must_mention: ':634 的三枚按钮',
  },
  {
    desc: 'M12016 CHARA_FIRST_XP 的 997 支路部位菜单退回纯文本行',
    file: 'ere/chara/chara-custom2.js',
    find: "          era.printButton('私处', 301);\n          era.printButton('肛门', 401);",
    replace: "          era.print('[301] 私处 [401] 肛门'); // 变异",
    tests: ['chara-custom2'],
    must_mention: '输入不合法！请输入以下值之一：',
  },
  {
    desc: 'M12017 CHARA_FIRST_XP 的初体验对象菜单退回纯文本行',
    file: 'ere/chara/chara-custom2.js',
    find: "      era.printButton('自定义输入', 997);\n      era.printButton('无', 998);\n      sex = await era.input();",
    replace:
      "      era.print('[997] 自定义输入');\n      era.print('[998] 无'); // 变异\n      sex = await era.input();",
    tests: ['chara-custom2'],
    must_mention: '输入不合法！请输入以下值之一：',
  },
];
