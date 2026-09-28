// 变异条目表切片：ere/chara/（角色域）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用编号，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 86; // #696 +1（M14109：组合名单段名不宜独存段值的追加段回归检查）；#546 起 +7（M11532-M11538，random_self_call 的 MODE 1 分支）；#547 起 +1（M11581，chara-make.js 的 cm_gender 接通 global:3——由 test/chara-make.test.js 盯守）；#548 返工轮 +2（M11478/M11479 的目标位置从 enter-enemy.js 搬到 chara_ex 的 34 号注册回调——补偿写在所有加入路径都过的 add_chara_ex 里）；#565 起 +2（M11614/M11615，cm_st/cm_st_ace 的 st_up 接入）+ 审查轮 +2（M11624/M11625，show_chara_info 页码与 [100] 進む按钮）+ 返工轮 +4（M11631/M11632/M11634/M11635：印象/发色按钮、FLAG 复辟检查、#DIM 静态语义）；#383 起 +18（M7808-M7825）；#384 起 -2（M6538 的目标代码被改写、M7821 的目标搬到 chara-name.js）；#487 起 +10（M10600-M10609）；#483 起 +4（M10610-M10613）；#494 起 +7（M10614-M10619、M10623）；#530 起 +4（M11200-M11203，招募确认对话的选项是按钮、编号与正文前缀各一条）。合并 #547 时两侧 80/77 调和为 81：这张工单 4 条之外收进 master 的 M11581，按导入实测条目数写回；#567 起 M11534 目标改为共享判断条件调用、M11537 随真身搬到 utils/input-text.js（条目数不变）

export default [
  // —— #565 st_up 接入（cm_st / cm_st_ace） ——
  {
    desc: 'M11614 cm_st 的逐级 st_up 调用删除（勇者初始等级不升）',
    file: 'ere/chara/chara-make.js',
    find: '    for (let i = 0; i < times; i += 1) {\n      st_up(cid, rand_n); // st_up（逐级一次；返回值无人读）',
    replace:
      '    for (let i = 0; i < times; i += 1) {\n      // 变异：ST_UP 调用删除',
    tests: ['chara-make'],
    must_mention: '按 flag:60 逐级两次：等级 2',
  },
  {
    desc: 'M11631 形象确认的 [0] 改印象按钮退回纯文本（实机敲不进 0，性格钉死表 0 项）',
    file: 'ere/chara/chara-make.js',
    find: `          era.printButton(
            \`印象 ： \${
              character >= 0
                ? talentname(GENERAL_CHARASTERISTICS[character])
                : ''
            }\`,
            0,
          );`,
    replace: `          era.print('印象 ： '); // 变异：按钮退回纯文本`,
    tests: ['chara-make'],
    must_mention: '[0] 改印象必须是按钮',
  },
  {
    desc: 'M11632 形象确认的 [1] 改发色按钮退回纯文本（实机敲不进 1）',
    file: 'ere/chara/chara-make.js',
    find: `          era.printButton(\`发色 ： \${ARR_HAIRCOLOR[haircolor] ?? ''}\`, 1);`,
    replace: `          era.print('发色 ： '); // 变异：按钮退回纯文本`,
    tests: ['chara-make'],
    must_mention: '发色按钮正文带上当前发色名',
  },
  {
    desc: 'M11634 FLAG:1/2 的角色号调整复辟（恒空操作被写活）',
    file: 'ere/chara/chara-make.js',
    find: '        // （#71；属主域是 event）。\n        era_flag.target = game.event.上次调教对象; // TARGET = FLAG:1',
    replace:
      '        // （#71；属主域是 event）。\n        if (game.event.上次调教对象 > newchara) game.event.上次调教对象 -= 1; // 变异：调整复辟\n        era_flag.target = game.event.上次调教对象; // TARGET = FLAG:1',
    tests: ['page-campaign'],
    must_mention: 'FLAG:1 不被改写',
  },
  {
    desc: 'M11635 character 的跨调用沿用删（#DIM 静态语义丢失，下次招募不预设）',
    file: 'ere/chara/chara-make.js',
    find: `        if (character !== -1) {`,
    replace: `        if (false) { // 变异：上次选择不沿用`,
    tests: ['chara-make'],
    must_mention: 'character != -1 → set_charasteristic(新角色, 上次的选择)',
  },
  {
    desc: 'M11615 cm_st_ace 的逐级 st_up 调用删除（精英初始等级不升）',
    file: 'ere/chara/chara-make.js',
    find: '    for (let i = 0; i < local; i += 1) {\n      st_up(cid, rand_n); // st_up（逐级一次；返回值无人读）',
    replace:
      '    for (let i = 0; i < local; i += 1) {\n      // 变异：ST_UP 调用删除',
    tests: ['chara-make'],
    must_mention: '(60 + 2) / 10 = 6 次逐级',
  },
  {
    desc: 'M11624 形象确认的 show_chara_info 页码回 -1（调教信息顶替贡品页）',
    file: 'ere/chara/chara-make.js',
    find: `      await require('#/page/page-chara-info-show').show_chara_info(\n        newchara,\n        -2,\n        rand_n,\n      );`,
    replace: `      await require('#/page/page-chara-info-show').show_chara_info(\n        newchara,\n        -1,\n        rand_n,\n      ); // 变异：页码回 -1`,
    tests: ['page-campaign'],
    must_mention: '贡品页的外貌段',
  },
  {
    desc: 'M11625 形象确认的 [100] 進む按钮退回纯文本（实机敲不进 100）',
    file: 'ere/chara/chara-make.js',
    find: `          era.printButton(\n            '你发动了魔王真眼，深入探究更进一步的详细素质……',\n            100,\n          );`,
    replace: `          era.print('你发动了魔王真眼，深入探究更进一步的详细素质……'); // 变异：按钮退回纯文本`,
    tests: ['event-first'],
    // 返工第 1 轮起 [0]/[1] 也是按钮：[100] 退回纯文本后，夹具在输入 100 时就按白名单
    // 拒收（era-fixture.js 的「请输入以下值之一」），走不到按钮断言；本流程其余输入都合法
    must_mention: '请输入以下值之一',
  },
  {
    desc: 'M307 cm_stp 的 CFLAG:A:1 = 2 改 3（接入点触发条件被改坏——三分叉测试必须红）',
    file: 'ere/chara/chara-make.js',
    find: '  chara(cid).invasion.状态 = 2; // CFLAG:1 侵攻中',
    replace: '  chara(cid).invasion.状态 = 3; // CFLAG:1 侵攻中',
    tests: ['chara-make'],
    must_mention: 'cflag:A:1 = 2 侵攻中',
  },
  {
    desc: 'M308 三分叉第一支检查砍掉 !精英（精英部下误走 cm_stp——验收清单第 3 条必须红）',
    file: 'ere/chara/chara-make.js',
    find: '  if (!elite && !ex1 && !offspring) {',
    replace: '  if (!ex1 && !offspring) {',
    tests: ['chara-make'],
    must_mention: 'cflag:A:1 = 0（精英部下）',
  },
  {
    desc: 'M309 转发层折叠（char_make 不再调本体——转发测试必须红）',
    file: 'ere/chara/char-make.js',
    find: '  return chara_make(cid, arg0, arg1, rand);',
    replace: '  return cid;',
    tests: ['chara-make'],
    must_mention: '转发到 chara_make(cid, arg0, arg1) 的实参形式',
  },
  {
    desc: 'M6522 karma 移除魂缚检查（魂缚角色会错误改变善恶值）',
    file: 'ere/chara/chara-stats.js',
    find: 'function karma(cid, delta) {\n  if (chara(cid).stronghold.魂缚) {',
    replace: 'function karma(cid, delta) {\n  if (false) {',
    tests: ['chara-stubs'],
    must_mention: '魂缚阻止善恶值变化',
  },
  {
    desc: 'M6523 karma 下限 -200 改成 -199（善恶值下界被改坏）',
    file: 'ere/chara/chara-stats.js',
    find: 'Math.max(-200, Math.min(200, value))',
    replace: 'Math.max(-199, Math.min(200, value))',
    tests: ['chara-stubs'],
    must_mention: 'KARMA / FAITH：魂缚不变动，否则按各自上下限钳制',
  },
  {
    desc: 'M6524 FAITH 上限 100 改成 99（信仰上界被改坏）',
    file: 'ere/chara/chara-stats.js',
    find: 'Math.max(0, Math.min(100, value))',
    replace: 'Math.max(0, Math.min(99, value))',
    tests: ['chara-stubs'],
    must_mention: 'KARMA / FAITH：魂缚不变动，否则按各自上下限钳制',
  },
  {
    desc: 'M6525 chara_lv_check 的非负检查改为 > 0（零经验会错误降级）',
    file: 'ere/chara/chara-stats.js',
    find: 'if (chara(cid).dungeon.战斗经验 >= 0) {',
    replace: 'if (chara(cid).dungeon.战斗经验 > 0) {',
    tests: ['chara-stubs'],
    must_mention: '非负战斗经验不改状态',
  },
  {
    desc: 'M6526 降级后的战斗经验倍率 10 改 9',
    file: 'ere/chara/chara-stats.js',
    find: 'view.dungeon.战斗经验 = level * 10;',
    replace: 'view.dungeon.战斗经验 = level * 9;',
    tests: ['chara-stubs'],
    must_mention: '负战斗经验触发降级',
  },
  {
    desc: 'M6527 CHARA_ID_OUTPUT 的经历权重 10 改 11',
    file: 'ere/chara/chara-stats.js',
    find: '(era.get(`talent:${cid}:315`) || 0) * 10',
    replace: '(era.get(`talent:${cid}:315`) || 0) * 11',
    tests: ['chara-stubs'],
    must_mention: '组合经历、首个性格与家族构成编号',
  },
  {
    desc: 'M6528 CHARA_ID_OUTPUT 的家族权重少一个数量级',
    file: 'ere/chara/chara-stats.js',
    find: '(era.get(`talent:${cid}:320`) || 0) * 100000',
    replace: '(era.get(`talent:${cid}:320`) || 0) * 10000',
    tests: ['chara-stubs'],
    must_mention: '家族构成编号',
  },
  {
    desc: 'M6529 CHAR_SIZE_GENERATE 固定取身高统计中值（随机区间失效）',
    file: 'ere/chara/chara-body.js',
    find: 'let [height, scale] = normal_range_pickup(...heights, rand);',
    replace: 'let [height, scale] = [heights[1], 50];',
    tests: ['chara-stubs'],
    must_mention: '固定随机源生成三围',
  },
  {
    desc: 'M6530 胸围变化模式判断条件 1 改 2（错误走全量生成）',
    file: 'ere/chara/chara-body.js',
    find: 'if (mode === 1) {\n    height =',
    replace: 'if (mode === 2) {\n    height =',
    tests: ['chara-stubs'],
    must_mention: '胸围变化模式复用原身高体重',
  },
  {
    desc: 'M6531 成年胸围年龄补正 20 改 21',
    file: 'ere/chara/chara-body.js',
    find: '(difference * (20 + age_count)) / 20',
    replace: '(difference * (21 + age_count)) / 20',
    tests: ['chara-stubs'],
    must_mention: '固定随机源生成三围',
  },
  {
    desc: 'M6532 chara_make_inherit 负亲本检查漏掉 -1',
    file: 'ere/chara/chara-make-inherit.js',
    find: 'if (parent_a < 0) {',
    replace: 'if (parent_a < -1) {',
    tests: ['chara-make-inherit'],
    must_mention: '负亲本直接返回，子代已有素质值原样保留',
  },
  {
    desc: 'M6533 继承排除区间漏掉素质 74',
    file: 'ere/chara/chara-make-inherit.js',
    find: '(index >= 74 && index <= 78)',
    replace: '(index >= 75 && index <= 78)',
    tests: ['chara-make-inherit'],
    must_mention: '排除项 74 不得被继承',
  },
  {
    desc: 'M6534 战斗技能继承从 241 开始（漏掉 240）',
    file: 'ere/chara/chara-make-inherit.js',
    find: 'for (let index = 240; index < 264; index += 1) {',
    replace: 'for (let index = 241; index < 264; index += 1) {',
    tests: ['chara-make-inherit'],
    must_mention: '候选段成员 240 应被继承',
  },
  {
    desc: 'M6535 和名编号的 200 起始偏移改 201',
    file: 'ere/chara/chara-name.js',
    find: 'rand(JAPANESE_NAME_COUNT) + 200',
    replace: 'rand(JAPANESE_NAME_COUNT) + 201',
    tests: ['chara-name'],
    must_mention: 'rand(5) = 0 → %2 = 0 → 和名 200',
  },
  {
    desc: 'M6536 组合名编号的 4500 起始偏移改 4501',
    file: 'ere/chara/chara-name.js',
    find: 'rand(CHINESE_NAME_COUNT) + 4500',
    replace: 'rand(CHINESE_NAME_COUNT) + 4501',
    tests: ['chara-name'],
    must_mention: '重掷切组合名 4500 起',
  },
  {
    desc: 'M6537 随机命名末端不再尾调用 chara_name_define',
    file: 'ere/chara/chara-name.js',
    find: '  chara_name_define(cid, nid);',
    replace: '  void nid;',
    tests: ['chara-name'],
    must_mention: '固定名 0 未注册名字 → 佳奈美（真身已执行，不再是占位行）',
  },
  {
    desc: 'M6539 自动调教肛门绝顶的 KARMA -2 改 -1',
    file: 'ere/event/event-autotrain.js',
    find: '    karma(target, -2);',
    replace: '    karma(target, -1);',
    tests: ['event-autotrain'],
    must_mention: 'ex:1/ex:2 接入 KARMA 真身',
  },
  {
    desc: 'M6540 SELL_BITCH 第一处 KARMA 调用不再传增减量',
    file: 'ere/kojo/kojo-dungeon-bitch.js',
    find: '      karma(arg, local); // CALL KARMA',
    replace: '      karma(arg, 0); // CALL KARMA',
    tests: ['kojo-dungeon-bitch'],
    must_mention: '卖春次数经 KARMA 真身扣善恶值',
  },
  {
    desc: 'M6541 chara_make 的随机命名真身接入被拆掉',
    file: 'ere/chara/chara-make.js',
    find: '    chara_name_random_define(cid, -1, rand_n);',
    replace: '    void rand_n;',
    tests: ['chara-make'],
    must_mention: 'chara_name_define 真身：没有可查的固定名时回落到默认名',
  },
  {
    desc: 'M6542 CHARA_ID_OUTPUT 无性格时的 FOR 终值 179 改 178',
    file: 'ere/chara/chara-stats.js',
    find: '  let personality = 179;',
    replace: '  let personality = 178;',
    tests: ['chara-stubs'],
    must_mention: '无性格命中时沿用 FOR 终值 179',
  },
  {
    desc: 'M6543 chara_make_inherit 把裸 TALENT 写误绑回子代而非目标角色',
    file: 'ere/chara/chara-make-inherit.js',
    find: 'chara(era_flag.target).chara.私处封印 = 0;',
    replace: 'chara(child).chara.私处封印 = 0;',
    tests: ['chara-make-inherit'],
    must_mention: 'L_A（子代）不被裸写命中',
  },
  {
    desc: 'M6544 CHAR_INHERIT 错把 JUMP 目标返回值暴露给调用点',
    file: 'ere/chara/char-make.js',
    find: '  chara_make_inherit(child, parent);',
    replace: '  return chara_make_inherit(child, parent);',
    tests: ['chara-stubs'],
    must_mention: 'CHAR_INHERIT 转发层',
  },
  {
    desc: 'M7808 calc_selfcall_factor 精灵/暗精灵种族加成删除（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `    case '精灵':
    case '暗精灵':
      edu += 2;
      attitude += 2;
      openness += 2;
      break;`,
    replace: `    case '精灵':
    case '暗精灵':
      break;`,
    tests: ['chara-self-call'],
    must_mention: '精灵',
  },
  {
    desc: 'M7809 calc_selfcall_factor 龙族开放度符号反转（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `    case '龙族':
      edu += 2;
      attitude += 1;
      openness -= 2;
      break;`,
    replace: `    case '龙族':
      edu += 2;
      attitude += 1;
      openness += 2;
      break;`,
    tests: ['chara-self-call'],
    must_mention: '龙族',
  },
  {
    desc: 'M7810 calc_selfcall_factor 魔族+妖精/史莱姆的教育加成删除（GOTO CASE_魔族 展开，#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `        case '妖精':
        case '史莱姆':
          edu += 1;
          break;`,
    replace: `        case '妖精':
        case '史莱姆':
          break;`,
    tests: ['chara-self-call'],
    must_mention: '魔族 + 种族2=妖精',
  },
  {
    desc: 'M7811 calc_selfcall_factor “修女”词条判定被砍（get_look_info 同一素质值性别分档，#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `    case '修女':
      edu += 1;
      attitude -= 1;
      break;`,
    replace: `    case '修女不存在':
      edu += 1;
      attitude -= 1;
      break;`,
    tests: ['chara-self-call'],
    must_mention: '修女（女性，命中"修女"词条）',
  },
  {
    desc: 'M7812 calc_selfcall_factor 商人姿态惩罚数值改错（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `    case '商人':
      edu += 1;
      attitude -= 2;
      break;`,
    replace: `    case '商人':
      edu += 1;
      attitude -= 1;
      break;`,
    tests: ['chara-self-call'],
    must_mention: '商人',
  },
  {
    desc: 'M7813 calc_selfcall_factor 恶女掷骨判定条件改错（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `    // 恶女
    edu += 1;
    attitude += 2;
    if (rand(4) === 0) {`,
    replace: `    // 恶女
    edu += 1;
    attitude += 2;
    if (rand(4) === 1) {`,
    tests: ['chara-self-call'],
    must_mention: '166 恶女，掷骰未命中加成',
  },
  {
    desc: 'M7814 calc_selfcall_factor 高姿态的绝对赋值被拆掉（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `  if (talent(15)) {
    // 高姿态
    attitude = 10;
  }`,
    replace: `  if (false) {
    // 高姿态（变异：删掉）
    attitude = 10;
  }`,
    tests: ['chara-self-call'],
    must_mention: '嚣张先加attitude后被高姿态绝对赋值覆盖',
  },
  {
    desc: 'M7815 calc_selfcall_factor 低姿态的绝对赋值被拆掉（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `  if (talent(17)) {
    // 低姿态
    attitude = -10;
  }`,
    replace: `  if (false) {
    // 低姿态（变异：删掉）
    attitude = -10;
  }`,
    tests: ['chara-self-call'],
    must_mention: '高姿态先设attitude=10后被低姿态绝对赋值覆盖为-10',
  },
  {
    desc: 'M7816 set_suit_selfcall CASE0 开放<=-5 边界改错（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: '          if (openness <= -5) {',
    replace: '          if (openness >= -5) {',
    tests: ['chara-self-call'],
    must_mention: '开放<=-5，掷骰命中→吾辈',
  },
  {
    desc: 'M7817 set_suit_selfcall CASE1 姿态>=5 边界改错（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `          if (attitude >= 5) {
            word = male ? '老子' : '老娘';
          }`,
    replace: `          if (attitude >= 7) {
            word = male ? '老子' : '老娘';
          }`,
    tests: ['chara-self-call'],
    must_mention: '姿态>=5，非男性→老娘',
  },
  {
    desc: 'M7818 set_suit_selfcall CASE2 本宫分支条件改错（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `          if (attitude >= 5) {
            word = '本宫';`,
    replace: `          if (attitude >= 7) {
            word = '本宫';`,
    tests: ['chara-self-call'],
    must_mention: '姿态>=5→本宫',
  },
  {
    desc: 'M7819 set_suit_selfcall CASE3 输出词两性倒接（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: "          era.set(`cstr:${cid}:60`, male ? '鄙人' : '人家');",
    replace: "          era.set(`cstr:${cid}:60`, male ? '人家' : '鄙人');",
    tests: ['chara-self-call'],
    must_mention: '非男性→人家',
  },
  {
    desc: 'M7820 set_nick_selfcall 半角字符检测被拆掉（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: '    if (!is_all_fullwidth(name)) {',
    replace: '    if (false) {',
    tests: ['chara-self-call'],
    must_mention: '半角字符名回落姓名本体',
  },
  {
    desc: 'M7822 set_nick_selfcall 和名 CASE0 长度阈值改错（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `          // 皐月 -> 皐月
          if (char_count > 2) {`,
    replace: `          // 皐月 -> 皐月
          if (char_count > 1) {`,
    tests: ['chara-self-call'],
    must_mention: '和名CASE0字数<=2原样保留',
  },
  {
    desc: 'M7823 set_nick_selfcall 洋名 CASE3 白名单判断被砍（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `          if (!WEST_NICK_FIRST_CHARS.has(first)) {
            continue;
          }
          era.set(\`cstr:\${cid}:60\`, \`\${first}儿\`);`,
    replace: `          if (false) {
            continue;
          }
          era.set(\`cstr:\${cid}:60\`, \`\${first}儿\`);`,
    tests: ['chara-self-call'],
    must_mention: '洋名CASE3白名单不含张三丰的张',
  },
  {
    desc: 'M7824 random_self_call 合适一人称表命中后的 CFLAG 偏移改错（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `    if (result >= 0) {
      era.set(\`cflag:\${cid}:450\`, result + 10);
      return result + 10;
    }`,
    replace: `    if (result >= 0) {
      era.set(\`cflag:\${cid}:450\`, result + 11);
      return result + 11;
    }`,
    tests: ['chara-self-call'],
    must_mention: '命中档+10委派合适一人称表',
  },
  {
    desc: 'M7825 random_self_call CSV 预设回落判断反转（#383）',
    file: 'ere/chara/chara-self-call.js',
    find: '    if (preset) {',
    replace: '    if (!preset) {',
    tests: ['chara-self-call'],
    must_mention: '档位 >=200',
  },
  // —— #487：rand_chara_make 的新角色号必须是角色号，不是「已加入数 - 1」——
  {
    desc: 'M10600 非异国分支的新角色号退回「已加入数 - 1」（#487 的原缺陷：编制不连号时写到别人身上）',
    file: 'ere/chara/chara-make.js',
    find: '        newchara = chara_id; // 新角色的角色号',
    replace:
      '        newchara = era.getAddedCharacters().length - 1; // 变异：按人数取号',
    tests: ['chara-name'],
    must_mention: '返回值 = 新角色的角色号',
  },
  {
    desc: 'M10601 异国分支不用 chara_make_inport 的返回值（#487：那位是它内部 addCharacter 的，不是掷中的位号）',
    file: 'ere/chara/chara-make.js',
    find: '        newchara = inport_cid; // 新角色的角色号',
    replace: '        newchara = chara_id; // 新角色的角色号',
    tests: ['chara-name'],
    must_mention: 'newchara = chara_make_inport 的返回值（角色号）',
  },
  {
    desc: 'M10602 异国判定式反转（判定为 0 的语义被破坏，非异国走成异国分支）',
    file: 'ere/chara/chara-make.js',
    find: '      if (inport_cid === 0) {',
    replace: '      if (inport_cid !== 0) {',
    tests: ['chara-name'],
    must_mention: '返回值 = 新角色的角色号',
  },
  {
    desc: 'M10603 换人支 DELCHARA 传「已加入数 - 1」（#487：删的不是刚加的那位）',
    file: 'ere/chara/chara-make.js',
    find: '        era.removeCharacter(newchara); // 移除角色\n        cn_rebuild(); // 重建名字表\n        continue; // 换人重挑',
    replace:
      '        era.removeCharacter(era.getAddedCharacters().length - 1); // 变异\n        cn_rebuild(); // 重建名字表\n        continue; // 换人重挑',
    tests: ['chara-name'],
    must_mention: '第一位（2 号）被删除，重挑到 1 号',
  },
  {
    desc: 'M10604 「算了，不选了」支 DELCHARA 传「已加入数 - 1」（#487：刚招募的留在编制里）',
    file: 'ere/chara/chara-make.js',
    find: '        era.removeCharacter(newchara); // 移除角色\n        cn_rebuild(); // 重建名字表\n        era_flag.target = game.event.上次调教对象; // TARGET = FLAG:1',
    replace:
      '        era.removeCharacter(era.getAddedCharacters().length - 1); // 变异\n        cn_rebuild(); // 重建名字表\n        era_flag.target = game.event.上次调教对象; // TARGET = FLAG:1',
    tests: ['chara-make'],
    must_mention: '刚招募的 1 号（角色号，不是「已加入数 - 1」= 2）',
  },
  {
    desc: 'M10605 收下播报的称呼取「已加入数 - 1」（#487：报的是别人的名字）',
    file: 'ere/chara/chara-make.js',
    find: "        `${inport_cid === 0 ? '' : '异国的'}冒险者${chara_callname(newchara)}被囚禁在了地牢里！`,",
    replace:
      "        `${inport_cid === 0 ? '' : '异国的'}冒险者${chara_callname(era.getAddedCharacters().length - 1)}被囚禁在了地牢里！`,",
    tests: ['chara-and-hair'],
    must_mention: '收下播报点名新加入的 3 号',
  },
  {
    desc: 'M10606 CFLAG:1 初始位置写「已加入数 - 1」（#487：归零落到别人身上）',
    file: 'ere/chara/chara-make.js',
    find: '      chara(newchara).invasion.状态 = 0; // CFLAG:1 初始位置',
    replace:
      '      chara(era.getAddedCharacters().length - 1).invasion.状态 = 0; // 变异',
    tests: ['chara-name'],
    must_mention: 'CFLAG:1 归零',
  },
  {
    desc: 'M10607 末尾 RETURN 给「已加入数 - 1」（#487：调用点据此点亮素质位）',
    file: 'ere/chara/chara-make.js',
    find: '      return newchara;',
    replace: '      return era.getAddedCharacters().length - 1;',
    tests: ['chara-name'],
    must_mention: '返回值 = 新角色的角色号',
  },
  {
    desc: 'M10608 性格预设写入点改「已加入数 - 1」（#487：set_charasteristic 写错人）',
    file: 'ere/chara/chara-make.js',
    find: '        set_charasteristic(newchara, character); // 落上一次选定的性格',
    replace:
      '        set_charasteristic(era.getAddedCharacters().length - 1, character); // 变异',
    tests: ['chara-and-hair'],
    // 变异后随机补设仍会把 talent:3:160 写上（那一支先跑），红的是
    // 「2 号不该被写」
    must_mention: '不写到「人数 - 1」的 2 号',
  },
  {
    desc: 'M10609 add_chara_ex 的实参退回「已加入数 - 1」（#487：编制为空时落 0 号，误触 0 号注册的魔王初始化）',
    file: 'ere/chara/chara-make.js',
    find: '        await add_chara_ex(chara_id); // 角色专属初始化',
    replace:
      '        await add_chara_ex(era.getAddedCharacters().length - 1); // ADDCHARA_EX, CHARANUM-1（= 角色号）',
    tests: ['chara-name'],
    must_mention: '不落到「已加入数 - 1」的 0 号（魔王标记）',
  },
  // —— #483：战役招募只在未被占用的勇者位里抽（结论·方案 2）——
  {
    desc: 'M10610 候选表的空位过滤恒真（已占用的勇者位重新入选——#483 的原缺陷）',
    file: 'ere/chara/chara-make.js',
    find: '  const free_slots = HERO_SLOT_IDS.filter((slot) => !occupied.has(slot));',
    replace:
      '  const free_slots = HERO_SLOT_IDS.filter(() => true); // 变异：不过滤占用位',
    tests: ['chara-make'],
    must_mention: '落在候选表首位 2 号',
  },
  {
    desc: 'M10611 候选表内抽取的上界退回 16（多算上已占用的位，索引与候选表脱节）',
    file: 'ere/chara/chara-make.js',
    find: '  return free_slots[rand_n(free_slots.length)];',
    replace: '  return free_slots[rand_n(16)]; // 变异：上界退回勇者位总数',
    tests: ['chara-make'],
    must_mention: '上界 = 候选表长度 14，不是 16',
  },
  {
    desc: 'M10612 16 位全满的失败文案被改写（文本不得另造，#483 要求 2）',
    file: 'ere/chara/chara-make.js',
    find: "    era.print('由于对魔王的恐惧，勇者没有出现。（奴隶数已达上限，请处决几个）');",
    replace:
      "    era.print('由于对魔王的恐惧，勇者没有出现。'); // 变异：括号提示删",
    tests: ['chara-make'],
    must_mention: '失败文案逐字（含括号内的提示，不另造文本）',
  },
  {
    desc: 'M10613 16 位全满的 RETURN 0 改成 1（调用点据此误判招募成功：扣气力、点素质位）',
    file: 'ere/chara/chara-make.js',
    find: '    await era.waitAnyKey();\n    return 0;',
    replace:
      '    await era.waitAnyKey(); // WAIT\n    return HERO_SLOT_IDS[0]; // 变异：不再返回 0',
    tests: ['chara-make', 'page-campaign'],
    must_mention: '返回 0（调用点据此不扣气力）',
  },
  // —— #494：整段归非异国分支（异国路径只做三行）——
  //
  // 前三条各复制一段原属非异国路径的代码进 `ELSE`，还原「整段放在 if/else
  // 之外」那个原缺陷的三种症状；末一条补 #487 验收发现的覆盖缺口
  // （置 1 改成 0 时五份用例曾全绿）。
  {
    desc: 'M10614 派遣奴隶标志置位改 0（FLAG:402 = 1 名存实亡，#494 补 #487 验收发现的覆盖缺口）',
    file: 'ere/chara/chara-make.js',
    find: "        era.set('flag:402', 1); // 派遣奴隶标志（等级 1 生成）",
    replace: "        era.set('flag:402', 0); // 变异：置位改成 0",
    tests: ['chara-name'],
    must_mention: '派遣奴隶标志置 1（等级 1 生成）',
  },
  {
    desc: 'M10615 异国分支也跑性格与发色的预设写入（复制进 ELSE——#494 的原缺陷之一）',
    file: 'ere/chara/chara-make.js',
    find: '        newchara = inport_cid; // 新角色的角色号',
    replace:
      '        newchara = inport_cid; // 新角色的角色号\n        if (character !== -1) {\n          set_charasteristic(newchara, character); // 变异：异国也跑预设写入\n        }\n        if (haircolor > 0) {\n          set_haircolor(newchara, haircolor); // 变异：异国也跑预设写入\n        }',
    tests: ['chara-name'],
    must_mention: '名单带来的性格未被覆盖',
  },
  {
    desc: 'M10616 异国分支也写 FLAG:402 = 1（复制进 ELSE——#494 的原缺陷之一）',
    file: 'ere/chara/chara-make.js',
    find: '        newchara = inport_cid; // 新角色的角色号',
    replace:
      "        newchara = inport_cid; // 新角色的角色号\n        era.set('flag:402', 1); // 变异：异国也写派遣奴隶标志",
    tests: ['chara-name'],
    must_mention: 'FLAG:402 = 1 未执行（异国路径不写派遣奴隶标志）',
  },
  {
    desc: 'M10617 异国分支也调 chara_make（复制进 ELSE——#494 的原缺陷之一）',
    file: 'ere/chara/chara-make.js',
    find: '        newchara = inport_cid; // 新角色的角色号',
    replace:
      '        newchara = inport_cid; // 新角色的角色号\n        await chara_make(newchara, xingge, 0, rand_n, newchara); // 变异：异国也调 CHAR_MAKE',
    tests: ['chara-name'],
    must_mention: 'chara_make 未执行（名单带来的等级未被重置为 1）',
  },
  {
    desc: 'M10618 异国分支也跑 FLAG:1/2 搬迁（复制进 ELSE——#494 的原缺陷之一）',
    file: 'ere/chara/chara-make.js',
    find: '        newchara = inport_cid; // 新角色的角色号',
    replace:
      '        newchara = inport_cid; // 新角色的角色号\n        if (game.event.上次调教对象 === newchara) game.event.上次调教对象 = -1;\n        if (game.event.上次助手 === newchara) game.event.上次助手 = -1;\n        if (game.event.上次调教对象 > newchara) {\n          game.event.上次调教对象 -= 1; // 变异：异国也跑搬迁\n        }\n        if (game.event.上次助手 > newchara) {\n          game.event.上次助手 -= 1; // 变异：异国也跑搬迁\n        }',
    tests: ['chara-name'],
    must_mention: 'FLAG:2 未前移（搬迁段未执行）',
  },
  {
    desc: 'M10619 收下播报的「异国的」前缀判断反转（SIF LOCAL:0 加错档）',
    file: 'ere/chara/chara-make.js',
    find: "        `${inport_cid === 0 ? '' : '异国的'}冒险者${chara_callname(newchara)}被囚禁在了地牢里！`,",
    replace:
      "        `${inport_cid === 0 ? '异国的' : ''}冒险者${chara_callname(newchara)}被囚禁在了地牢里！`,",
    tests: ['chara-name'],
    must_mention: '非异国档不加「异国的」前缀',
  },
  {
    desc: 'M10623 异国分支也进形象确认段（把形象确认的输入复制进 ELSE——#494 的原缺陷之一）',
    file: 'ere/chara/chara-make.js',
    find: '        newchara = inport_cid; // 新角色的角色号',
    replace:
      "        newchara = inport_cid; // 新角色的角色号\n        era.print('呃……面前的勇者，是这个形象的……'); // 变异：异国也进形象确认段\n        era.print('[0] 印象 ： '); // 变异\n        await era.input(); // 变异：:107 的 INPUT",
    tests: ['chara-name'],
    must_mention: '形象确认未执行（只问了收下确认）',
  },
  {
    desc: 'M11200 战役招募确认的三个选项退回纯文本（engine 只认本轮按钮快捷键，玩家敲不进 1/2/3——#530 的实机死路）',
    file: 'ere/chara/chara-make.js',
    find: `        era.printMultiColumns([
          {
            type: 'button',
            accelerator: 1,
            content: '不，换一个',
            config: { align: 'left', width: 8 },
          },`,
    replace: `        era.print('[1] 不，换一个');
        era.printMultiColumns([
          {
            type: 'text',
            content: '不，换一个',
            config: { align: 'left', width: 8 },
          },`,
    tests: ['chara-make'],
    must_mention: '要由引擎拼在按钮正文前',
  },
  {
    desc: 'M11201 非战役分支的两个选项退回纯文本（同 M11200，普通招募那条分支）',
    file: 'ere/chara/chara-make.js',
    find: `        era.printMultiColumns([
          {
            type: 'button',
            accelerator: 1,
            content: '不不不不…我看错了！',
            config: { align: 'left', width: 12 },
          },`,
    replace: `        era.print('[1] 不不不不…我看错了！');
        era.printMultiColumns([
          {
            type: 'text',
            content: '不不不不…我看错了！',
            config: { align: 'left', width: 12 },
          },`,
    tests: ['chara-make'],
    must_mention: '要由引擎拼在按钮正文前',
  },
  {
    desc: 'M11202 战役招募确认的按钮正文自带 [N] 前缀（引擎 showAcc 会再拼一层，实显成 [2] [2] …——PR #30 的硬约束）',
    file: 'ere/chara/chara-make.js',
    find: "            content: '嘛…还行，就这位吧',",
    replace: "            content: '[2] 嘛…还行，就这位吧',",
    tests: ['chara-make'],
    must_mention: '要由引擎拼在按钮正文前',
  },
  {
    desc: 'M11203 战役招募确认的 [2]/[3] 快捷键互换（2 = 收下、3 = 放弃 的语义被换掉——编号字面量改错必须红）',
    file: 'ere/chara/chara-make.js',
    find: `          {
            type: 'button',
            accelerator: 2,
            content: '嘛…还行，就这位吧',
            config: { align: 'left', width: 8 },
          },
          {
            type: 'button',
            accelerator: 3,
            content: '算了，不选了',
            config: { align: 'left', width: 8 },
          },`,
    replace: `          {
            type: 'button',
            accelerator: 3,
            content: '嘛…还行，就这位吧',
            config: { align: 'left', width: 8 },
          },
          {
            type: 'button',
            accelerator: 2,
            content: '算了，不选了',
            config: { align: 'left', width: 8 },
          },`,
    tests: ['chara-make'],
    must_mention: '要由引擎拼在按钮正文前',
  },
  // —— #546：random_self_call 的 MODE 1 自定义输入分支（ere/chara/chara-self-call.js）——
  {
    desc: 'M11532 random_self_call 的 MODE 判定取反（mode === 1 改 mode === 2——MODE 1 走不进输入段）',
    file: 'ere/chara/chara-self-call.js',
    find: '  if (mode === 1) {',
    replace: '  if (mode === 2) {',
    tests: ['chara-self-call'],
    must_mention: 'MODE 1：自由文本',
  },
  {
    desc: 'M11533 MODE 1 的提示行文案改字（随机设定 → 随机选一个）',
    file: 'ere/chara/chara-self-call.js',
    find: "    era.print('请输入想设定的第一人称，若不输入则随机设定');",
    replace: "    era.print('请输入想设定的第一人称，若不输入则随机选一个');",
    tests: ['chara-self-call'],
    must_mention: 'MODE 1：自由文本',
  },
  {
    desc: 'M11534 MODE 1 的空输入映射丢（共享判断条件 input_text 改直接 String——输入 0 被当自定义文本，一人称变「0」；#567 起判断条件收进 utils/input-text.js）',
    file: 'ere/chara/chara-self-call.js',
    find: '    const text = input_text(await era.input());',
    replace: '    const text = String(await era.input());',
    tests: ['chara-self-call'],
    must_mention: '输入 0 走随机路径（不落字面量「0」）',
  },
  {
    desc: 'M11535 MODE 1 的档位清零漏写（CFLAG:450 = 0 被删——自定义后档位仍留旧值）',
    file: 'ere/chara/chara-self-call.js',
    find: '      era.set(`cstr:${cid}:60`, text);\n      era.set(`cflag:${cid}:450`, 0);',
    replace: '      era.set(`cstr:${cid}:60`, text);',
    tests: ['chara-self-call'],
    must_mention: 'MODE 1：自由文本',
  },
  {
    desc: 'M11536 MODE 1 的一人称写错下标（CSTR:60 改 61）',
    file: 'ere/chara/chara-self-call.js',
    find: '      era.set(`cstr:${cid}:60`, text);',
    replace: '      era.set(`cstr:${cid}:61`, text);',
    tests: ['chara-self-call'],
    must_mention: 'MODE 1：自由文本',
  },
  {
    desc: 'M11537 输入的字符串化丢失（input_text 的 String(raw) 改直接回 raw——数字输入存成数值，一人称变 8 而非「8」；#567 起转换收进共享判断条件，条目随真身搬到 utils/input-text.js）',
    file: 'ere/utils/input-text.js',
    find: '  return String(raw);',
    replace: '  return raw;',
    tests: ['input-text', 'chara-self-call'],
    must_mention: '非数字串原样、数字字符串化（游戏读到的形式）',
  },
  {
    desc: 'M11538 MODE 1 的自定义命中返回值改坏（return 0 改 return 1）',
    file: 'ere/chara/chara-self-call.js',
    find: '      era.set(`cflag:${cid}:450`, 0);\n      return 0;',
    replace: '      era.set(`cflag:${cid}:450`, 0);\n      return 1;',
    tests: ['chara-self-call'],
    must_mention: 'MODE 1：自由文本',
  },
  // —— #548（master）：chara_ex 的 34 号注册回调 MARK,4,3 补偿两条 ——
  {
    desc: 'M11478 chara_ex 的 34 号注册回调 MARK,4,3 补偿写错值（3 改成 2：反抗刻印履历未满，LV3 门还开着）',
    file: 'ere/chara/chara-ex.js',
    find: '  chara(cid).system.反抗刻印履历 = 3;',
    replace: '  chara(cid).system.反抗刻印履历 = 2; // 变异：履历值错',
    tests: ['chara34-mark'],
    must_mention: 'MARK,4,3',
  },
  {
    desc: 'M11479 chara_ex 的 34 号注册回调漏写 MARK,4,3 补偿（CSV 预设仍被名字表缺口丢下；K_34 与研究所复活两条加入路径都受影响）',
    file: 'ere/chara/chara-ex.js',
    find: '  chara(cid).system.反抗刻印履历 = 3;',
    replace: '  // 变异：漏写反抗刻印履历补偿',
    tests: ['chara34-mark'],
    must_mention: 'MARK,4,3',
  },
  {
    desc: 'M11581 cm_gender 的 SELECTCASE 恒走 0 档（不读 global:3，#547）',
    file: 'ere/chara/chara-make.js',
    find: `  // 冒險者性別（原文用字）＝ global:3\n  const adventurer_gender = era_global.adventurer_gender;`,
    replace: `  // 变异：恒 0 档
  const adventurer_gender = 0;`,
    tests: ['chara-make'],
    must_mention: '六分支按 global:3 冒险者性别分派',
  },
  // —— #696（F12）：组合名单段名追加段 ——
  {
    desc: 'M14109 组合名单段名追加段删除（不宜独存段值照单全收）',
    file: 'ere/chara/chara-name.js',
    find: '    // 单段名落在不宜独存的段值时追加一段通用两音段后停止：追加一轮仍先\n    // 消耗一音段判定的两个骰子（rand(3)/rand(2)），length == 1 时两个条件\n    // 都不成立，段值取通用两音段。\n    if (length === 1 && SINGLE_BAD_PIECES.has(piece)) {\n      result *= 1000;\n      const one_sound =\n        (rand(3) === 0 && length !== 1) || (rand(2) === 0 && length === 3);\n      result += one_sound ? rand(9) + 300 : rand(30) + 200;\n      break;\n    }\n',
    replace: '',
    tests: ['chara-name'],
    must_mention: '227 后追加 202',
  },
];
