// 变异条目表切片：ere/chara/（角色域）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用锚点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 74; // #383 起 +18（M7808-M7825）；#384 起 -2（M6538 的目标代码被改写、M7821 的目标搬到 chara-name.js）；#487 起 +10（M10600-M10609）；#483 起 +4（M10610-M10613）；#494 起 +7（M10614-M10619、M10623）；#530 起 +4（M11200-M11203，招募确认对话的选项是按钮、编号与正文前缀各一条）；#546 起 +7（M11532-M11538，RANDOM_SELF_CALL 的 MODE 1 分支）

export default [
  {
    desc: 'M307 CM_STP 的 CFLAG:A:1 = 2 改 3（接入点触发条件被改坏——三分叉测试必须红）',
    file: 'ere/chara/chara-make.js',
    find: '  chara(cid).invasion.状态 = 2; // :127 CFLAG:A:1 侵攻中',
    replace: '  chara(cid).invasion.状态 = 3; // :127 CFLAG:A:1 侵攻中',
    tests: ['chara-make'],
    must_mention: 'CFLAG:A:1 = 2 侵攻中',
  },
  {
    desc: 'M308 三分叉第一支守卫砍掉 !精英（精英部下误走 CM_STP——验收清单第 3 条必须红）',
    file: 'ere/chara/chara-make.js',
    find: '  if (!elite && !ex1 && !offspring) {',
    replace: '  if (!ex1 && !offspring) {',
    tests: ['chara-make'],
    must_mention: 'CFLAG:A:1 = 0（精英部下）',
  },
  {
    desc: 'M309 转发层折叠（@CHAR_MAKE 不再 JUMP 本体——转发测试必须红）',
    file: 'ere/chara/char-make.js',
    find: '  return chara_make(cid, arg0, arg1, rand);',
    replace: '  return cid;',
    tests: ['chara-make'],
    must_mention: 'JUMP CHARA_MAKE(A, ARG:0, ARG:1) 的实参形态',
  },
  {
    desc: 'M6522 KARMA 移除魂缚守卫（魂缚角色会错误改变善恶值）',
    file: 'ere/chara/chara-stats.js',
    find: 'function karma(cid, delta) {\n  if (chara(cid).stronghold.魂缚) {',
    replace: 'function karma(cid, delta) {\n  if (false) {',
    tests: ['chara-stubs'],
    must_mention: '魂缚阻止善恶值变化',
  },
  {
    desc: 'M6523 KARMA 下限 -200 改成 -199（善恶值下界被改坏）',
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
    desc: 'M6525 CHARA_LV_CHECK 的非负守卫改为 > 0（零经验会错误降级）',
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
    desc: 'M6530 胸围变化模式判据 1 改 2（错误走全量生成）',
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
    desc: 'M6532 CHARA_MAKE_INHERIT 负亲本守卫漏掉 -1',
    file: 'ere/chara/chara-make-inherit.js',
    find: 'if (parent_a < 0) {',
    replace: 'if (parent_a < -1) {',
    tests: ['chara-make-inherit'],
    must_mention: '负亲本直接 RETURN，子代已有素质值原样保留',
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
    must_mention: 'RAND:5 = 0 → %2 = 0 → 和名 200',
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
    desc: 'M6537 随机命名末端不再 JUMP CHARA_NAME_DEFINE',
    file: 'ere/chara/chara-name.js',
    find: '  chara_name_define(cid, nid);',
    replace: '  void nid;',
    tests: ['chara-name'],
    must_mention: '固定名 0 未注册名字 → 佳奈美（真身已落地，不再是占位行）',
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
    find: '      karma(arg, local); // :248 CALL KARMA',
    replace: '      karma(arg, 0); // :248 CALL KARMA',
    tests: ['kojo-dungeon-bitch'],
    must_mention: '卖春次数经 KARMA 真身扣善恶值',
  },
  {
    desc: 'M6541 CHARA_MAKE 的随机命名真身接线被拆掉',
    file: 'ere/chara/chara-make.js',
    find: '    chara_name_random_define(cid, -1, rand_n);',
    replace: '    void rand_n;',
    tests: ['chara-make'],
    must_mention: 'CHARA_NAME_DEFINE',
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
    desc: 'M6543 CHARA_MAKE_INHERIT 把裸 TALENT 写误绑回子代而非 TARGET',
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
    desc: 'M7808 CALC_SELFCALL_FACTOR 精灵/暗精灵种族加成删除（SELF_CALL.ERB:288-290，#383）',
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
    desc: 'M7809 CALC_SELFCALL_FACTOR 龙族开放度符号反转（SELF_CALL.ERB:296-299，#383）',
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
    desc: 'M7810 CALC_SELFCALL_FACTOR 魔族+妖精/史莱姆的教育加成删除（SELF_CALL.ERB:296-298 GOTO CASE_魔族 展开，#383）',
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
    desc: 'M7811 CALC_SELFCALL_FACTOR “修女”词条判定被砍（GET_LOOK_INFO 同一素质值性别分档，SELF_CALL.ERB:328-331，#383）',
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
    desc: 'M7812 CALC_SELFCALL_FACTOR 商人姿态惩罚数值改错（SELF_CALL.ERB:337-339，#383）',
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
    desc: 'M7813 CALC_SELFCALL_FACTOR 恶女掷骨判定条件改错（SELF_CALL.ERB:359-364，#383）',
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
    desc: 'M7814 CALC_SELFCALL_FACTOR 高姿态的绝对赋值被拆掉（SELF_CALL.ERB:389-391，#383）',
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
    desc: 'M7815 CALC_SELFCALL_FACTOR 低姿态的绝对赋值被拆掉（SELF_CALL.ERB:392-394，#383）',
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
    desc: 'M7816 SET_SUIT_SELFCALL CASE0 开放<=-5 边界改错（SELF_CALL.ERB:71，#383）',
    file: 'ere/chara/chara-self-call.js',
    find: '          if (openness <= -5) {',
    replace: '          if (openness >= -5) {',
    tests: ['chara-self-call'],
    must_mention: '开放<=-5，掷骰命中→吾辈',
  },
  {
    desc: 'M7817 SET_SUIT_SELFCALL CASE1 姿态>=5 边界改错（SELF_CALL.ERB:76，#383）',
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
    desc: 'M7818 SET_SUIT_SELFCALL CASE2 本宫分支条件改错（SELF_CALL.ERB:83，#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `          if (attitude >= 5) {
            word = '本宫';`,
    replace: `          if (attitude >= 7) {
            word = '本宫';`,
    tests: ['chara-self-call'],
    must_mention: '姿态>=5→本宫',
  },
  {
    desc: 'M7819 SET_SUIT_SELFCALL CASE3 输出词两性倒接（SELF_CALL.ERB:159，#383）',
    file: 'ere/chara/chara-self-call.js',
    find: "          era.set(`cstr:${cid}:60`, male ? '鄙人' : '人家');",
    replace: "          era.set(`cstr:${cid}:60`, male ? '人家' : '鄙人');",
    tests: ['chara-self-call'],
    must_mention: '非男性→人家',
  },
  {
    desc: 'M7820 SET_NICK_SELFCALL 半角字符检测被拆掉（SELF_CALL.ERB:171，#383）',
    file: 'ere/chara/chara-self-call.js',
    find: '    if (!is_all_fullwidth(name)) {',
    replace: '    if (false) {',
    tests: ['chara-self-call'],
    must_mention: '半角字符名回落姓名本体',
  },
  {
    desc: 'M7822 SET_NICK_SELFCALL 和名 CASE0 长度阈值改错（SELF_CALL.ERB:182，#383）',
    file: 'ere/chara/chara-self-call.js',
    find: `          // 皐月 -> 皐月
          if (char_count > 2) {`,
    replace: `          // 皐月 -> 皐月
          if (char_count > 1) {`,
    tests: ['chara-self-call'],
    must_mention: '和名CASE0字数<=2原样照抄',
  },
  {
    desc: 'M7823 SET_NICK_SELFCALL 洋名 CASE3 白名单判断被砍（SELF_CALL.ERB:251，#383）',
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
    desc: 'M7824 RANDOM_SELF_CALL 合适一人称表命中后的 CFLAG 偏移改错（SELF_CALL.ERB:48-49，#383）',
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
    desc: 'M7825 RANDOM_SELF_CALL CSV 预设回落判断反转（SELF_CALL.ERB:31，#383）',
    file: 'ere/chara/chara-self-call.js',
    find: '    if (preset) {',
    replace: '    if (!preset) {',
    tests: ['chara-self-call'],
    must_mention: '档位 >=200',
  },
  // —— #487：RAND_CHARA_MAKE 的新角色号必须是角色号，不是「已加入数 - 1」——
  {
    desc: 'M10600 非异国分支的新角色号退回「已加入数 - 1」（#487 的原缺陷：编制不连号时写到别人身上）',
    file: 'ere/chara/chara-make.js',
    find: '        newchara = chara_id; // :63-64 A / ID_OF_NEWCHARA（= 新角色的角色号）',
    replace:
      '        newchara = era.getAddedCharacters().length - 1; // 变异：按人数取号',
    tests: ['chara-name'],
    must_mention: 'RETURN CHARANUM-1 = 新角色的角色号',
  },
  {
    desc: 'M10601 异国分支不用 CHAR_MAKE_INPORT 的返回值（#487：那位是它内部 ADDCHARA 的，不是掷中的位号）',
    file: 'ere/chara/chara-make.js',
    find: '        newchara = inport_cid; // :146 ID_OF_NEWCHARA = CHARANUM-1（= 角色号）',
    replace:
      '        newchara = chara_id; // :146 ID_OF_NEWCHARA = CHARANUM-1（= 角色号）',
    tests: ['chara-name'],
    must_mention: 'ID_OF_NEWCHARA = CHAR_MAKE_INPORT 的返回值（角色号）',
  },
  {
    desc: 'M10602 异国判定式反转（:58 的 RESULT == 0 语义被破坏，非异国走成异国分支）',
    file: 'ere/chara/chara-make.js',
    find: '      if (inport_cid === 0) {',
    replace: '      if (inport_cid !== 0) {',
    tests: ['chara-name'],
    must_mention: 'RETURN CHARANUM-1 = 新角色的角色号',
  },
  {
    desc: 'M10603 换人支 DELCHARA 传「已加入数 - 1」（#487：删的不是刚加的那位）',
    file: 'ere/chara/chara-make.js',
    find: '        era.removeCharacter(newchara); // :161 DELCHARA',
    replace:
      '        era.removeCharacter(era.getAddedCharacters().length - 1); // 变异',
    tests: ['chara-name'],
    must_mention: ':161 第一位（2 号）被 DELCHARA，重挑到 1 号',
  },
  {
    desc: 'M10604 「算了，不选了」支 DELCHARA 传「已加入数 - 1」（#487：刚招募的留在编制里）',
    file: 'ere/chara/chara-make.js',
    find: '        era.removeCharacter(newchara); // :166 DELCHARA',
    replace:
      '        era.removeCharacter(era.getAddedCharacters().length - 1); // 变异',
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
    find: '      chara(newchara).invasion.状态 = 0; // :180 CFLAG:1 初始位置',
    replace:
      '      chara(era.getAddedCharacters().length - 1).invasion.状态 = 0; // 变异',
    tests: ['chara-name'],
    must_mention: ':180 CFLAG:1 归零',
  },
  {
    desc: 'M10607 末尾 RETURN 给「已加入数 - 1」（#487：调用点据此点亮素质位）',
    file: 'ere/chara/chara-make.js',
    find: '      return newchara; // :194 RETURN (CHARANUM - 1)（= 角色号，见函数头）',
    replace:
      '      return era.getAddedCharacters().length - 1; // :194 RETURN (CHARANUM - 1)（= 角色号，见函数头）',
    tests: ['chara-name'],
    must_mention: 'RETURN CHARANUM-1 = 新角色的角色号',
  },
  {
    desc: 'M10608 性格预设落点改「已加入数 - 1」（#487：SET_CHARASTERISTIC 写错人）',
    file: 'ere/chara/chara-make.js',
    find: '        set_charasteristic(newchara, character); // :67 CALL SET_CHARASTERISTIC',
    replace:
      '        set_charasteristic(era.getAddedCharacters().length - 1, character); // 变异',
    tests: ['chara-and-hair'],
    // 变异后 :85 的随机补设仍会把 talent:3:160 写上（那一支先跑），红的是
    // 「2 号不该被写」
    must_mention: '不写到「人数 - 1」的 2 号',
  },
  {
    desc: 'M10609 ADDCHARA_EX 的实参退回「已加入数 - 1」（#487：编制为空时落 0 号，误触 CHARA_EX_0 的魔王标记）',
    file: 'ere/chara/chara-make.js',
    find: '        await add_chara_ex(chara_id); // :62 ADDCHARA_EX, CHARANUM-1（= 角色号）',
    replace:
      '        await add_chara_ex(era.getAddedCharacters().length - 1); // :62 ADDCHARA_EX, CHARANUM-1（= 角色号）',
    tests: ['chara-name'],
    must_mention: '不落到「已加入数 - 1」的 0 号（魔王标记）',
  },
  // —— #483：战役招募只在未被占用的勇者位里抽（结论·方案 2）——
  {
    desc: 'M10610 候选表的空位过滤恒真（已占用的勇者位重新入选——#483 的原缺陷形态）',
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
    desc: 'M10612 16 位全满的失败文案被改写（原作 :189 的文本不得另造，#483 要求 2）',
    file: 'ere/chara/chara-make.js',
    find: "    era.print('由于对魔王的恐惧，勇者没有出现。（奴隶数已达上限，请处决几个）');",
    replace:
      "    era.print('由于对魔王的恐惧，勇者没有出现。'); // 变异：括号提示删",
    tests: ['chara-make'],
    must_mention: ':188-191 原作文案逐字（含括号内的提示，不另造文本）',
  },
  {
    desc: 'M10613 16 位全满的 RETURN 0 改成 1（调用点据此误判招募成功：扣气力、点素质位）',
    file: 'ere/chara/chara-make.js',
    find: '    return 0; // :191',
    replace: '    return HERO_SLOT_IDS[0]; // 变异：不再返回 0',
    tests: ['chara-make', 'page-campaign'],
    must_mention: ':191 RETURN 0（调用点据此不扣气力）',
  },
  // —— #494：:66-141 整段归非异国分支（异国路径只做 :144-146）——
  //
  // 前三条各复制一段原属非异国路径的代码进 `ELSE`，还原「整段放在 if/else
  // 之外」那个原缺陷的三种症状；末一条补 #487 验收发现的覆盖缺口
  // （:139 的置 1 改成 0 时五份用例曾全绿）。
  {
    desc: 'M10614 派遣奴隶标志置位改 0（原作 :139 的 FLAG:402 = 1 名存实亡，#494 补 #487 验收发现的覆盖缺口）',
    file: 'ere/chara/chara-make.js',
    find: "        era.set('flag:402', 1); // :139 派遣奴隶标志（等级 1 生成）",
    replace: "        era.set('flag:402', 0); // 变异：置位改成 0",
    tests: ['chara-name'],
    must_mention: ':139 派遣奴隶标志置 1（等级 1 生成）',
  },
  {
    desc: 'M10615 异国分支也跑性格与发色的预设落地（把 :66-72 复制进 ELSE——#494 的原缺陷形态之一）',
    file: 'ere/chara/chara-make.js',
    find: '        newchara = inport_cid; // :146 ID_OF_NEWCHARA = CHARANUM-1（= 角色号）',
    replace: `        newchara = inport_cid; // :146 ID_OF_NEWCHARA = CHARANUM-1（= 角色号）
        if (character !== -1) {
          set_charasteristic(newchara, character); // 变异：异国也跑预设落地
        }
        if (haircolor > 0) {
          set_haircolor(newchara, haircolor); // 变异：异国也跑预设落地
        }`,
    tests: ['chara-name'],
    must_mention: '名单带来的性格未被覆盖',
  },
  {
    desc: 'M10616 异国分支也写 FLAG:402 = 1（把 :139 复制进 ELSE——#494 的原缺陷形态之一）',
    file: 'ere/chara/chara-make.js',
    find: '        newchara = inport_cid; // :146 ID_OF_NEWCHARA = CHARANUM-1（= 角色号）',
    replace: `        newchara = inport_cid; // :146 ID_OF_NEWCHARA = CHARANUM-1（= 角色号）
        era.set('flag:402', 1); // 变异：异国也写派遣奴隶标志`,
    tests: ['chara-name'],
    must_mention: ':139 FLAG:402 = 1 未执行（异国路径不写派遣奴隶标志）',
  },
  {
    desc: 'M10617 异国分支也调 CHAR_MAKE（把 :141 复制进 ELSE——#494 的原缺陷形态之一）',
    file: 'ere/chara/chara-make.js',
    find: '        newchara = inport_cid; // :146 ID_OF_NEWCHARA = CHARANUM-1（= 角色号）',
    replace: `        newchara = inport_cid; // :146 ID_OF_NEWCHARA = CHARANUM-1（= 角色号）
        await chara_make(newchara, xingge, 0, rand_n, newchara); // 变异：异国也调 CHAR_MAKE`,
    tests: ['chara-name'],
    must_mention: ':141 CHAR_MAKE 未执行（名单带来的等级未被重置为 1）',
  },
  {
    desc: 'M10618 异国分支也跑 FLAG:1/2 搬迁（把 :126-135 复制进 ELSE——#494 的原缺陷形态之一）',
    file: 'ere/chara/chara-make.js',
    find: '        newchara = inport_cid; // :146 ID_OF_NEWCHARA = CHARANUM-1（= 角色号）',
    replace: `        newchara = inport_cid; // :146 ID_OF_NEWCHARA = CHARANUM-1（= 角色号）
        if (game.event.上次调教对象 === newchara) game.event.上次调教对象 = -1;
        if (game.event.上次助手 === newchara) game.event.上次助手 = -1;
        if (game.event.上次调教对象 > newchara) {
          game.event.上次调教对象 -= 1; // 变异：异国也跑搬迁
        }
        if (game.event.上次助手 > newchara) {
          game.event.上次助手 -= 1; // 变异：异国也跑搬迁
        }`,
    tests: ['chara-name'],
    must_mention: ':134 FLAG:2 未前移（搬迁段未执行）',
  },
  {
    desc: 'M10619 收下播报的「异国的」前缀判据反转（原作 :174-175 的 SIF LOCAL:0 加错档）',
    file: 'ere/chara/chara-make.js',
    find: "        `${inport_cid === 0 ? '' : '异国的'}冒险者${chara_callname(newchara)}被囚禁在了地牢里！`,",
    replace:
      "        `${inport_cid === 0 ? '异国的' : ''}冒险者${chara_callname(newchara)}被囚禁在了地牢里！`,",
    tests: ['chara-name'],
    must_mention: ':174-175 非异国档不加「异国的」前缀',
  },
  {
    desc: 'M10623 异国分支也进形象确认段（把 :76-81 与 :107 的 INPUT 复制进 ELSE——#494 的原缺陷形态之一）',
    file: 'ere/chara/chara-make.js',
    find: '        newchara = inport_cid; // :146 ID_OF_NEWCHARA = CHARANUM-1（= 角色号）',
    replace: `        newchara = inport_cid; // :146 ID_OF_NEWCHARA = CHARANUM-1（= 角色号）
        era.print('呃……面前的勇者，是这个形象的……'); // 变异：异国也进形象确认段
        era.print('[0] 印象 ： '); // 变异
        await era.input(); // 变异：:107 的 INPUT`,
    tests: ['chara-name'],
    must_mention: ':107 的形象确认未执行（只问了 :158 的收下确认）',
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
  // —— #546：RANDOM_SELF_CALL 的 MODE 1 自定义输入分支（ere/chara/chara-self-call.js）——
  {
    desc: 'M11532 RANDOM_SELF_CALL 的 MODE 判定取反（mode === 1 改 mode === 2——MODE 1 走不进输入段）',
    file: 'ere/chara/chara-self-call.js',
    find: '  if (mode === 1) {',
    replace: '  if (mode === 2) {',
    tests: ['chara-self-call'],
    must_mention: 'MODE 1：自由文本',
  },
  {
    desc: 'M11533 MODE 1 的提示行文案改字（随机设定 → 随机选一个）',
    file: 'ere/chara/chara-self-call.js',
    find: "    era.print('请输入想设定的第一人称，若不输入择随机设定');",
    replace: "    era.print('请输入想设定的第一人称，若不输入择随机选一个');",
    tests: ['chara-self-call'],
    must_mention: 'MODE 1：自由文本',
  },
  {
    desc: 'M11534 MODE 1 的空输入映射丢（raw !== 0 改 raw !== 1——输入 0 被当自定义文本，一人称变「0」）',
    file: 'ere/chara/chara-self-call.js',
    find: "    if (raw !== 0 && raw !== '' && raw != null) {",
    replace: "    if (raw !== 1 && raw !== '' && raw != null) {",
    tests: ['chara-self-call'],
    must_mention: '空输入（引擎把 "" 归一成 0）',
  },
  {
    desc: 'M11535 MODE 1 的档位清零漏写（CFLAG:450 = 0 被删——自定义后档位仍留旧值）',
    file: 'ere/chara/chara-self-call.js',
    find: '      era.set(`cstr:${cid}:60`, String(raw));\n      era.set(`cflag:${cid}:450`, 0);',
    replace: '      era.set(`cstr:${cid}:60`, String(raw));',
    tests: ['chara-self-call'],
    must_mention: 'MODE 1：自由文本',
  },
  {
    desc: 'M11536 MODE 1 的一人称写错下标（CSTR:60 改 61）',
    file: 'ere/chara/chara-self-call.js',
    find: '      era.set(`cstr:${cid}:60`, String(raw));',
    replace: '      era.set(`cstr:${cid}:61`, String(raw));',
    tests: ['chara-self-call'],
    must_mention: 'MODE 1：自由文本',
  },
  {
    desc: 'M11537 MODE 1 的数字输入不字符串化（String(raw) 改 raw——存进数值，一人称变 8 而非「8」）',
    file: 'ere/chara/chara-self-call.js',
    find: '      era.set(`cstr:${cid}:60`, String(raw));',
    replace: '      era.set(`cstr:${cid}:60`, raw);',
    tests: ['chara-self-call'],
    must_mention: '数字文本按引擎归一成数值再字符串化',
  },
  {
    desc: 'M11538 MODE 1 的自定义命中返回值改坏（return 0 改 return 1）',
    file: 'ere/chara/chara-self-call.js',
    find: '      era.set(`cflag:${cid}:450`, 0);\n      return 0;',
    replace: '      era.set(`cflag:${cid}:450`, 0);\n      return 1;',
    tests: ['chara-self-call'],
    must_mention: 'MODE 1：自由文本',
  },
];
