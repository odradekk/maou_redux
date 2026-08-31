// 变异条目表切片：ere/kojo/（口上状态机与文本插值）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号是历史惯性编号
// （M117 曾被两票撞号使用），只作引用锚点保留，不再人工分配。
export default [
  {
    desc: 'M57 口上总开关守卫删松（<= 0 改 < 0，flag:7 = 0 不再拦）',
    file: 'ere/kojo/kojo-system.js',
    find: `async function kojo_message_com(rand) {
  // :151-152 第一道守卫：总开关 FLAG:7 <= 0 直接返回（玩家可关）
  if ((era.get('flag:7') || 0) <= 0) {`,
    replace: `async function kojo_message_com(rand) {
  // :151-152 第一道守卫：总开关 FLAG:7 <= 0 直接返回（玩家可关）
  if ((era.get('flag:7') || 0) < 0) {`,
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
    find: `      // :955-975 爱慕（TALENT:85）
      era.get(\`talent:\${target}:85\`) === 1 &&
      (kojo.爱抚 <= 499 || game.kojo.口上开关 === 2)`,
    replace: `      // :955-975 爱慕（TALENT:85）
      era.get(\`talent:\${target}:86\`) === 1 &&
      (kojo.爱抚 <= 499 || game.kojo.口上开关 === 2)`,
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

  {
    // #182（H13 迷宫凌辱）：分派表缺失（验收要求「13 种怪物 × 两种对象的
    // 分派表逐条有测试」）——删掉一个导出，分派测试红
    desc: 'M488 H13 分派缺失：module.exports 删 orc_ryou 导出',
    file: 'ere/kojo/kojo-dungeon-ravish.js',
    find: '  orc_ryou,\n  slime_ryou,',
    replace: '  slime_ryou,',
    tests: ['kojo-dungeon-ravish'],
    must_mention: '13 个函数',
  },
  {
    // #182：凌辱畏怖记忆推进改坏（CFLAG:130 写错怪物号）
    desc: 'M489 H13 凌辱畏怖记忆：首次推进 CFLAG:130 写错（local_1 改 0）',
    file: 'ere/kojo/kojo-dungeon-ravish.js',
    find: 'chara(arg).dungeon.凌辱畏怖记忆_怪物 = local_1; // :67 CFLAG:130',
    replace: 'chara(arg).dungeon.凌辱畏怖记忆_怪物 = 0; // :67 变异',
    tests: ['kojo-dungeon-ravish'],
    must_mention: '凌辱畏怖记忆推进',
  },
  {
    // #182：PC_RYOU 处女丧失推进改坏（初体验对象 15 写错）
    desc: 'M490 H13 PC_RYOU 处女丧失：初体验对象 CFLAG:15 写错（arg0 + 1 改 arg0）',
    file: 'ere/kojo/kojo-dungeon-ravish.js',
    find: 'chara(arg1).train.初体验对象 = arg0 + 1; // :2445 CFLAG:ARG:1:15 = NO:(ARG:0) + 1',
    replace: 'chara(arg1).train.初体验对象 = arg0; // :2445 变异',
    tests: ['kojo-dungeon-ravish'],
    must_mention: '初体验对象',
  },
  {
    // #182：逃脱分支救援成功条件改坏（回城标志不写）
    desc: 'M491 H13 逃脱救援：回城标志 507 写入删（救援成功不立回城）',
    file: 'ere/kojo/kojo-dungeon-ravish.js',
    find: '      chara(leader).invasion.回城标志 = 1; // :2999',
    replace: '      // 变异：救援成功不立回城标志',
    tests: ['kojo-dungeon-ravish'],
    must_mention: '救援成功：回城标志 507 写入',
  },
  {
    // #182：VICTORY_RYOUZYOKU 善恶值门槛改坏（> -50 改 > 0，混沌才发生）
    desc: 'M492 H13 胜利凌辱：善恶值门槛改坏（> -50 改 > 0）',
    file: 'ere/kojo/kojo-dungeon-ravish.js',
    find: '  if ((era.get(`cflag:${arg}:151`) || 0) > -50) {',
    replace: '  if ((era.get(`cflag:${arg}:151`) || 0) > 0) {',
    tests: ['kojo-dungeon-ravish'],
    must_mention: '善恶值 > -50',
  },
  {
    desc: 'M520 LOG_TRY_BITCH 的 DUNGEON 勇者「空闲」分支改坏（#185 验收变异：真身分档文本）',
    file: 'ere/kojo/kojo-dungeon-bitch-log.js',
    find: "        era.print('在空闲的时间，'); // :25",
    replace: "        era.print('变异：错误文本'); // :25 变异",
    tests: ['kojo-dungeon-bitch-log'],
    must_mention: '勇者无中毒/债务 → 空闲',
  },
  {
    desc: 'M521 LOG_TRY_BITCH 末行删除（:47「考虑着出卖肉体的事。」，#185 验收变异：与 FI_TRY_BITCH 区分）',
    file: 'ere/kojo/kojo-dungeon-bitch-log.js',
    find: "  await era.printAndWait('考虑着出卖肉体的事。'); // :47",
    replace: '  // 变异：末行删（LOG_TRY_BITCH 不再输出收尾文本）',
    tests: ['kojo-dungeon-bitch-log'],
    must_mention: 'LOG_TRY_BITCH 末行',
  },
  {
    desc: 'M522 LOG_AFTER_BITCH 的 ANIMAL 玩法号改坏（play = 6 → 5，#185 验收变异：玩法挑选）',
    file: 'ere/kojo/kojo-dungeon-bitch-log.js',
    find: '    play = 6; // :326',
    replace: '    play = 5; // :326 变异',
    tests: ['kojo-dungeon-bitch-log'],
    must_mention: '调 LOG_BITCH_ANIMAL（DUNGEON 空）',
  },
  {
    desc: 'M523 LOG_AFTER_BITCH 误调死代码 DUNGEON_SEX_LOG（本应调 LOG_BITCH_SEX，#185 反向变异：死代码不接线）',
    file: 'ere/kojo/kojo-dungeon-bitch-log.js',
    find: '    SEX: log_bitch_sex,',
    replace: '    SEX: dungeon_sex_log, // 变异：误接死代码',
    tests: ['kojo-dungeon-bitch-log'],
    must_mention: '调 LOG_BITCH_SEX',
  },

  // —— #212 返工：存量二段寻址修复的反向变异 ——
  {
    desc: 'M717 ANIMAL 珠加算回退成二段（juel:arg:1 → juel:1——从未生效的形态）',
    file: 'ere/kojo/kojo-dungeon-bitch.js',
    find: '      era.add(`juel:${arg}:1`, play * 200); // :406 JUEL:1 += PLAY * 200',
    replace: '      era.add(`juel:1`, play * 200); // :406 变异：二段',
    tests: ['chara-table-addressing', 'kojo-dungeon-bitch'],
    must_mention: 'JUEL:1 必须 +PLAY*200',
  },
  {
    desc: 'M718 性别分档回退成二段（talent:TARGET:122 → talent:122——恒走 else 臂）',
    file: 'ere/kojo/kojo-dungeon-bitch-log.js',
    find: `    if (rand_n(8) === 0) {
      if (era.get(\`talent:\${era_flag.target}:122\`) || 0) {`,
    replace: `    if (rand_n(8) === 0) {
      if (era.get('talent:122') || 0) {`,
    tests: ['chara-table-addressing', 'kojo-dungeon-bitch-log'],
    must_mention: 'TALENT:122 置位 → 哥哥臂',
  },
  {
    desc: 'M1500 K3 舔阴首次推进写错（CFLAG:302 = 1 改 2）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.舔阴 = 1; // :1120',
    replace: '      kojo.舔阴 = 2; // :1120（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '舔阴首次（CFLAG:302 == 0 且非处女）',
  },
  {
    desc: 'M1501 K3 舔阴处女分档删（TALENT:0 臂拿掉）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `      if (era.get(\`talent:\${target}:0\`) === 1) {
        await era.printAndWait(
          '「嗯啊啊~！那、那里才不是可以舔的地方…哈呜…很，很脏的…哈呜！」',
        ); // :1115
      } else {`,
    replace: `      if (false) { // 变异：处女分档删除
        await era.printAndWait(
          '「嗯啊啊~！那、那里才不是可以舔的地方…哈呜…很，很脏的…哈呜！」',
        ); // :1115
      } else {`,
    tests: ['kojo-k3-noble'],
    must_mention: '舔阴首次处女分档',
  },
  {
    desc: 'M1502 K3 舔阴淫乱推进写错（CFLAG:302 = 5 改 4）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.舔阴 = 5; // :1129',
    replace: '      kojo.舔阴 = 4; // :1129（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '舔阴二次以后',
  },
  {
    desc: 'M1503 K3 肛门爱抚首次推进写错（CFLAG:303 = 1 改 2）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.肛门爱抚 = 1; // :1156',
    replace: '      kojo.肛门爱抚 = 2; // :1156（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '肛门爱抚首次',
  },
  {
    desc: 'M1504 K3 肛门爱抚润滑阈值错（PALAMLV[2] 改 PALAMLV[3]）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      p >= PALAMLV[3] &&
      (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k3-noble'],
    must_mention: '肛门爱抚二次以后',
  },
  {
    desc: 'M1505 K3 肛门爱抚それ以外读错槽（CFLAG:223 改 303）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '    } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 === 2) {',
    replace: '    } else if (kojo.肛门爱抚 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k3-noble'],
    must_mention: '肛门爱抚それ以外读 CFLAG:223',
  },
  {
    desc: 'M1506 K3 自慰首次推进写错（CFLAG:304 = 1 改 2）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.自慰 = 1; // :1206',
    replace: '      kojo.自慰 = 2; // :1206（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '自慰首次（CFLAG:304 == 0）',
  },
  {
    desc: 'M1507 K3 自慰淫乱处女推进写错（CFLAG:304 = 9 改 8）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.自慰 = 9; // :1218',
    replace: '      kojo.自慰 = 8; // :1218（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '淫乱处女推进到 9',
  },
  {
    desc: 'M1508 K3 自慰淫乱自慰中毒门槛错（ABL:31 >= 3 改 >= 4）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      train.自慰中毒 >= 4 &&
      (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k3-noble'],
    must_mention: '淫乱自慰中毒Lv3推进到 8',
  },
];


