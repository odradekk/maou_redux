// 变异条目表切片：ere/chara/（角色域）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用锚点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 44; // #383 起 +18（M7808-M7825，chara-self-call.js）

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
    tests: ['chara-stubs'],
    must_mention: '负亲本直接 RETURN',
  },
  {
    desc: 'M6533 继承排除区间漏掉素质 74',
    file: 'ere/chara/chara-make-inherit.js',
    find: '(index >= 74 && index <= 78)',
    replace: '(index >= 75 && index <= 78)',
    tests: ['chara-stubs'],
    must_mention: '素质 74',
  },
  {
    desc: 'M6534 战斗技能继承从 241 开始（漏掉 240）',
    file: 'ere/chara/chara-make-inherit.js',
    find: 'for (let index = 240; index < 264; index += 1) {',
    replace: 'for (let index = 241; index < 264; index += 1) {',
    tests: ['chara-stubs'],
    must_mention: '素质 240',
  },
  {
    desc: 'M6535 和名编号的 200 起始偏移改 201',
    file: 'ere/chara/chara-name.js',
    find: 'rand(JAPANESE_NAME_COUNT) + 200',
    replace: 'rand(JAPANESE_NAME_COUNT) + 201',
    tests: ['chara-stubs'],
    must_mention: '和名编号使用 200 起始偏移',
  },
  {
    desc: 'M6536 组合名编号的 4500 起始偏移改 4501',
    file: 'ere/chara/chara-name.js',
    find: 'rand(CHINESE_NAME_COUNT) + 4500',
    replace: 'rand(CHINESE_NAME_COUNT) + 4501',
    tests: ['chara-stubs'],
    must_mention: '洋名 0 重复后切到组合名 4500',
  },
  {
    desc: 'M6537 随机命名末端不再 JUMP CHARA_NAME_DEFINE',
    file: 'ere/chara/chara-name.js',
    find: '  chara_name_define(cid, nid);',
    replace: '  void nid;',
    tests: ['chara-stubs'],
    must_mention: 'JUMP 目标结束',
  },
  {
    desc: 'M6538 NAME_RESET 不再转发 CN_REBUILD',
    file: 'ere/chara/char-make.js',
    find: '  return cn_rebuild();',
    replace: '  return undefined;',
    tests: ['chara-stubs'],
    must_mention: '转发到 CN_REBUILD',
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
    tests: ['chara-stubs'],
    must_mention: 'L_A 不被裸写命中',
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
    desc: 'M7821 NID_GET_TYPE 和名下界改错（CHARA_NAME.ERB:257，#383）',
    file: 'ere/chara/chara-self-call.js',
    find: '  if (nid < 200 || nid >= 2000) {',
    replace: '  if (nid < 201 || nid >= 2000) {',
    tests: ['chara-self-call'],
    must_mention: 'NID 落 [200,1000) → 和名（CASE1 挑字）',
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
];
