// 变异条目表切片：ere/kojo/（口上状态机与文本插值）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号是历史惯性编号
// （M117 曾被两票撞号使用），只作引用锚点保留，不再人工分配。
export default [
  {
    desc: 'M57 口上总开关守卫删松（<= 0 改 < 0，flag:7 = 0 不再拦）',
    file: 'ere/kojo/kojo-system.js',
    find: "  if ((era.get('flag:7') || 0) <= 0) {",
    replace: "  if ((era.get('flag:7') || 0) < 0) {",
    tests: ['kojo-system'],
    must_mention: '完全不输出',
  },
  {
    desc: 'M58 口上存在判定删除（FLAG:LOCAL == 0 改恒 false）',
    file: 'ere/kojo/kojo-system.js',
    find: '  if ((era.get(`flag:${local}`) || 0) === 0) {',
    replace: '  if (false) { // 变异：存在判定删除',
    tests: ['kojo-system'],
    must_mention: '存在判定',
  },
  {
    desc: 'M59 分发接入：TRYCALLFORM 拼名偏移（local - 100 改 - 101）',
    file: 'ere/kojo/kojo-system.js',
    find: '    await kojo_message_com_family.call(local - 100, {',
    replace: '    await kojo_message_com_family.call(local - 101, {',
    tests: ['kojo-system'],
    must_mention: '空间内缺失',
  },
  {
    desc: 'M60 K5 首次状态推进写错（CFLAG:301 = 1 改 2）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.爱抚 = 1; // :813',
    replace: '      kojo.爱抚 = 2; // :813（变异）',
    tests: ['kojo-k5-mao', 'kojo-system'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M61 K3 首次状态推进写错（CFLAG:301 = 1 改 2）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.爱抚 = 1; // :930',
    replace: '      kojo.爱抚 = 2; // :930（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M62 K5 首次刻印分档边界（MARK:2 >= 2 改 >= 3）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      if (mark(2) >= 2) {',
    replace: '      if (mark(2) >= 3) {',
    tests: ['kojo-k5-mao'],
    must_mention: '只出一句',
  },
  {
    desc: 'M63 K5 淫乱素质判据错格（TALENT:76 改 77）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      era.get(`talent:${target}:76`) === 1 &&',
    replace: '      era.get(`talent:${target}:77`) === 1 &&',
    tests: ['kojo-k5-mao'],
    must_mention: '淫乱分支',
  },
  {
    desc: 'M64 K3 爱慕素质判据错格（TALENT:85 改 86）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      era.get(`talent:${target}:85`) === 1 &&',
    replace: '      era.get(`talent:${target}:86`) === 1 &&',
    tests: ['kojo-k3-noble'],
    must_mention: '爱慕分支',
  },
  {
    desc: 'M65 K5 淫乱门槛的 FLAG:7 == 2 旁路失效（改 === 3）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 3)',
    tests: ['kojo-k5-mao'],
    must_mention: '阈值闸',
  },
  {
    desc: 'M66 K3 黄金分支条件（RAND:2 == 0 改 == 1）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '        } else if (rand_n(2) === 0) {\n          await era.printAndWait(\n            `「哈呜、${target_name}、可是，一心地，想要杀了…嗯、为什么、那么地……啊~、这么…温柔地…啊、啊啊……」`,',
    replace:
      '        } else if (rand_n(2) === 1) {\n          await era.printAndWait(\n            `「哈呜、${target_name}、可是，一心地，想要杀了…嗯、为什么、那么地……啊~、这么…温柔地…啊、啊啊……」`,',
    tests: ['kojo-k3-noble'],
    must_mention: '黄金样本',
  },
  {
    desc: 'M67 K3 黄金文本逐字（「想要杀了」改「想杀了」）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '一心地，想要杀了',
    replace: '一心地，想杀了',
    tests: ['kojo-k3-noble'],
    must_mention: '黄金样本',
  },
  {
    desc: 'M68 K3 淫乱阶段推进写错（CFLAG:301 = 600 改 500）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.爱抚 = 600; // :953',
    replace: '      kojo.爱抚 = 500; // :953（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '淫乱分支',
  },
  {
    desc: 'M69 @EVENTSHOP #PRI 总开关默认值（FLAG:7 = 2 改 1）',
    file: 'ere/kojo/kojo-system.js',
    find: "      era.set('flag:7', 2);",
    replace: "      era.set('flag:7', 1);",
    tests: ['kojo-system'],
    must_mention: '@EVENTSHOP',
  },
  {
    desc: 'M70 K5 @EVENTEND #LATER 清标志删除',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '    game.kojo.口上存在_5 = 0; // :88',
    replace: '    // 变异：清标志删除',
    tests: ['kojo-system'],
    must_mention: '清 0',
  },
  {
    desc: 'M71 K3 失神守卫删除（TFLAG:899 改恒 false）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `  // :900-901 失神時（TFLAG:899）——跨域读属主 train 的一维门面
  if (game.train.失神) {`,
    replace: `  // :900-901 失神時（TFLAG:899）——跨域读属主 train 的一维门面
  if (false) { // 变异：失神守卫删除`,
    tests: ['kojo-k3-noble'],
    must_mention: '静默跳过',
  },
  {
    desc: 'M72 心形插值丢失（%UNICODE(0x2661)% 映射成空串）',
    file: 'ere/kojo/kojo-text.js',
    find: "  return '♡'.repeat(n);",
    replace: "  return '';",
    tests: ['kojo-k3-noble', 'kojo-k5-mao'],
    must_mention: '♡',
  },
  {
    desc: 'M73 自称插值回落错字（「我」改「本人」）',
    file: 'ere/kojo/kojo-text.js',
    find: "  return era.get(`cstr:${cid}:60`) || '我';",
    replace: "  return era.get(`cstr:${cid}:60`) || '本人';",
    tests: ['kojo-k3-noble'],
    must_mention: '自称',
  },
  {
    desc: 'M74 K3 3xx 支的附加条件删除（MARK:1 == 3 臂拿掉）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `      // :1021-1050 屈服刻印Lv2＆快乐刻印Lv3（百位 3xx 阶段）
      mark(2) === 2 &&
      mark(1) === 3 &&
      (kojo.爱抚 <= 299 || game.kojo.口上开关 === 2)`,
    replace: `      // :1021-1050 屈服刻印Lv2＆快乐刻印Lv3（百位 3xx 阶段）
      mark(2) === 2 &&
      (kojo.爱抚 <= 299 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k3-noble'],
    must_mention: 'MARK:1 == 3',
  },
  {
    desc: 'M75 K3 的 PRINTFORML 映射错变体（:944 print 改 printAndWait）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `        era.print(
          \`\${player_name}开始爱抚后、\${target_name}立马将双脚大幅度地张开了、如同为了让股间突出来一样挺起了腰。\`,
        ); // :944 PRINTFORML`,
    replace: `        await era.printAndWait(
          \`\${player_name}开始爱抚后、\${target_name}立马将双脚大幅度地张开了、如同为了让股间突出来一样挺起了腰。\`,
        ); // :944 PRINTFORML`,
    tests: ['kojo-text-fidelity'],
    must_mention: 'W/L',
  },
  {
    desc: 'M76 K3 插值填错孔（:1076 player 与 target 互换）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '`${player_name}轻轻地抚摸了一下${target_name}紧紧闭着的眼皮子旁边后、${target_name}的身体颤抖起来，惊叫了一下。`,',
    replace:
      '`${target_name}轻轻地抚摸了一下${player_name}紧紧闭着的眼皮子旁边后、${target_name}的身体颤抖起来，惊叫了一下。`,',
    tests: ['kojo-text-fidelity', 'kojo-k3-noble'],
    must_mention: '槽位序',
  },
  {
    desc: 'M78 K5 台词改回繁体（简体锁 + 锁 D 反向 + 行为断言三处红）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: "        await era.printAndWait('「你这个变态…别、别碰我！」'); // :810",
    replace:
      "        await era.printAndWait('「你這個變態…別、別碰我！」'); // :810",
    tests: ['output-lang-lock', 'kojo-text-fidelity', 'kojo-k5-mao'],
    must_mention: '非简体',
  },
  {
    desc: 'M80 K5 抄错字（归一后锁 D 仍抓：正向片段找不到）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: "        await era.printAndWait('「咕…呜呜…啊！」'); // :807",
    replace: "        await era.printAndWait('「咕…呜呜…啊呀！」'); // :807",
    tests: ['kojo-text-fidelity'],
    must_mention: '未见于 JS',
  },
  {
    desc: 'M81 K5 句中空格丢失（归一后锁 D 仍抓：片段含前导空格）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '`「主人、再多摸摸我嘛${heart(1)} 舒服的我都要叫出来了啦${heart(1)}」`',
    replace:
      '`「主人、再多摸摸我嘛${heart(1)}舒服的我都要叫出来了啦${heart(1)}」`',
    tests: ['kojo-text-fidelity'],
    must_mention: '未见于 JS',
  },
  {
    // #183（H14 迷宫凌辱男性对象）：同名函数区分（验收要求「此行为必须有测试」）
    desc: 'M420 H14 同名函数区分：orc_ryou_man 改回 orc_ryou（与 H13 撞名，触发 #12 遮蔽）',
    file: 'ere/kojo/kojo-dungeon-ravish-man.js',
    find: 'async function orc_ryou_man(arg, mon_num, rand) {',
    replace: 'async function orc_ryou(arg, mon_num, rand) {',
    tests: ['kojo-dungeon-ravish-man'],
    must_mention: '同名函数断言',
  },
  {
    // #183：%SAVESTR:ARG% 插值承载改坏（arg_name 变固定串）。保真锁 D 只
    // 比对字面量片段、不守插值映射本身（名字变了片段仍在）——由行为测试
    // 的「11 种怪物分派」断言（输出须含被凌辱者名「冒险者」）拦截。
    desc: 'M421 H14 插值承载改坏：arg_name_of 返回固定字符串',
    file: 'ere/kojo/kojo-dungeon-ravish-man.js',
    find: '  return chara_callname(arg);',
    replace: "  return '某人';",
    tests: ['kojo-dungeon-ravish-man'],
    must_mention: '怪物分派',
  },
  {
    // #183：数值副作用改坏（BASE:ARG:0 += 100 改 50，史莱姆回复支断言红）
    desc: 'M422 H14 数值副作用：史莱姆治愈的 BASE:ARG:0 += 100 改 50',
    file: 'ere/kojo/kojo-dungeon-ravish-man.js',
    find: 'chara(arg).dungeon.体力 += 100; // :466 BASE:ARG:0 += 100（体力回复）',
    replace: 'chara(arg).dungeon.体力 += 50; // :466 变异',
    tests: ['kojo-dungeon-ravish-man'],
    must_mention: '体力回复',
  },
  {
    // #183：11 种怪物分派（验收要求）——删掉一个导出，分派测试红
    desc: 'M423 H14 分派缺失：module.exports 删 orc_ryou_man 导出',
    file: 'ere/kojo/kojo-dungeon-ravish-man.js',
    find: '  orc_ryou_man,\n  slime_ryou_man,',
    replace: '  slime_ryou_man,',
    tests: ['kojo-dungeon-ravish-man'],
    must_mention: '未导出',
  },
  {
    // #183：初吻推进改坏（995 改 994，SIF CFLAG:16 == -1 语义被破坏）
    desc: 'M424 H14 初吻推进：995（怪物的阴茎）改 994（怪物）',
    file: 'ere/kojo/kojo-dungeon-ravish-man.js',
    find: '      chara(arg).train.初吻对象 = 995; // :135 CFLAG:16 = 995（怪物的阴茎）',
    replace: '      chara(arg).train.初吻对象 = 994; // :135 变异',
    tests: ['kojo-dungeon-ravish-man'],
    must_mention: '初吻',
  },
  {
    desc: 'M400 勇者第一道门槛删除（EXP:74 == 0 不再拦，#184 验收变异）',
    file: 'ere/kojo/kojo-dungeon-bitch.js',
    find: '    if (!era.get(`exp:${arg}:74`)) {\n      return 0; // :20-21\n    }',
    replace: '    // 变异：删掉 EXP:74 门槛\n    if (false) {',
    tests: ['kojo-dungeon-bitch'],
    must_mention: 'EXP:74 为零则返回',
  },
  {
    desc: 'M401 SIPPAI 基础失败率改坏（250 → 200，#184 验收变异）',
    file: 'ere/kojo/kojo-dungeon-bitch.js',
    find: "      if (args1 === 'TOWN') {\n        local = 250 + (era.get(`cflag:${arg}:151`) || 0);",
    replace: '        local = 200 + (era.get(`cflag:${arg}:151`) || 0);',
    tests: ['kojo-dungeon-bitch'],
    must_mention: '失败率算式',
  },
  {
    desc: 'M402 SET_BICH_LEVEL 输入上限改坏（> 5 改 > 6，#184 验收变异）',
    file: 'ere/kojo/kojo-dungeon-bitch.js',
    find: '  if (result > 5) {',
    replace: '  if (result > 6) {',
    tests: ['kojo-dungeon-bitch'],
    must_mention: '输入分档',
  },
  {
    desc: 'M403 PROFIT_BITCH 总价改坏（PAY * PLAY 改 PAY + PLAY，#184 验收变异）',
    file: 'ere/kojo/kojo-dungeon-bitch.js',
    find: '  pay = pay * play;',
    replace: '  pay = pay + play;',
    tests: ['kojo-dungeon-bitch'],
    must_mention: '收益结算',
  },

  {
    desc: 'M447 SKIP 块处理删除（[SKIPSTART] 内容被当活代码装载，#184 反向变异：四组同名的死代码判定）',
    file: 'tools/kojo-transpiler.js',
    find: '    if (/^\\[SKIPSTART\\]$/i.test(trimmed)) {',
    replace:
      '    if (false && /^\\[SKIPSTART\\]$/i.test(trimmed)) { // 变异：SKIP 块不拦截',
    tests: ['kojo-transpiler'],
    must_mention: '不产出重复顶层函数',
  },
];
