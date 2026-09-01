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
    find: `  const local = get_kojo_num(); // :155 GET_KOJO_NUM()（参缺省 → TARGET）
  if ((era.get(\`flag:\${local}\`) || 0) === 0) {`,
    replace: `  const local = get_kojo_num(); // :155 GET_KOJO_NUM()（参缺省 → TARGET）
  if (false) { // 变异：存在判定删除`,
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
  // —— #235（J25）：K4 冷徹 口上模块（M1750-M1789 号段） ——
  {
    desc: 'M1750 K4 COM 口塞守卫删（TEQUIP:45 不再跳过，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `  if (era0(\`tequip:\${target}:45\`) && era_flag.selectcom != 45) {
    return 0;
  }`,
    replace: `  if (false && era_flag.selectcom != 45) {
    return 0;
  }`,
    tests: ['kojo-k4-stoic'],
    must_mention: '口塞（TEQUIP:45 且非指令45）：静默跳过',
  },
  {
    desc: 'M1751 K4 COM 失神守卫删（TFLAG:899 不再跳过，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `  if (era0(\`tequip:\${target}:45\`) && era_flag.selectcom != 45) {
    return 0;
  }

  if (era0('tflag:899')) {
    return 0;
  }`,
    replace: `  if (era0(\`tequip:\${target}:45\`) && era_flag.selectcom != 45) {
    return 0;
  }

  if (false) {
    return 0;
  }`,
    tests: ['kojo-k4-stoic'],
    must_mention: '失神（TFLAG:899）：静默跳过',
  },
  {
    desc: 'M1752 K4 兽奸守卫岔路丢失（TEQUIP:89 不再调 DOG_KOJO_4，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `  if (era0(\`tequip:\${target}:89\`)) {
    await dog_kojo_4(); // :533 CALL DOG_KOJO_4
    return 0;
  }`,
    replace: `  if (era0(\`tequip:\${target}:89\`)) {
    return 0;
  }`,
    tests: ['kojo-k4-stoic'],
    must_mention: '兽奸（TEQUIP:89）：岔进本文件真身 DOG_KOJO_4',
  },
  {
    desc: 'M1753 K4 触手守卫删（TEQUIP:90 不再跳过，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `  if (era0(\`tequip:\${target}:90\`)) {
    return 0;
  }`,
    replace: `  if (false) {
    return 0;
  }`,
    tests: ['kojo-k4-stoic'],
    must_mention: '触手（TEQUIP:90）：静默跳过',
  },
  {
    desc: 'M1754 K4 死斗场守卫岔路丢失（TEQUIP:55 不再调 COLOSSEUM_KOJO_4，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `  if (era0(\`tequip:\${target}:55\`)) {
    await colosseum_kojo_4(); // :541 CALL COLOSSEUM_KOJO_4
    return 0;
  }`,
    replace: `  if (era0(\`tequip:\${target}:55\`)) {
    return 0;
  }`,
    tests: ['kojo-k4-stoic'],
    must_mention: '死斗场（TEQUIP:55）：岔进本文件真身 COLOSSEUM_KOJO_4',
  },
  {
    desc: 'M1755 K4 爱撫初回刻印分档删（MARK:2 >= 2 臂丢失，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `      if (era0(\`mark:\${target}:2\`) >= 2) {
        await era.printAndWait(\`「唔～唔……」「哼，这不挺配合的嘛！」\`); // :556
      } else {`,
    replace: `      if (era0(\`mark:\${target}:2\`) >= 3) {
        await era.printAndWait(\`「唔～唔……」「哼，这不挺配合的嘛！」\`); // :556 变异
      } else {`,
    tests: ['kojo-k4-stoic'],
    must_mention: '爱撫初回的刻印分档（MARK:2 >= 2）：配合台词',
  },
  {
    desc: 'M1756 K4 爱撫初回推进写错（CFLAG:301 = 1 改 2，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `        await era.printAndWait(\`「讨厌！这变态！」\`); // :559
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      era.set(\`cflag:\${target}:301\`, 1);
      return 0;`,
    replace: `        await era.printAndWait(\`「讨厌！这变态！」\`); // :559
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      era.set(\`cflag:\${target}:301\`, 2);
      return 0;`,
    tests: ['kojo-k4-stoic'],
    must_mention:
      '爱撫初回（CFLAG:301 == 0 且 MARK:2 < 2）：一句拒绝 + 推进到 1',
  },
  {
    desc: 'M1757 K4 爱撫淫乱档推进写错（CFLAG:301 = 6 改 5，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `          \`「唔…噢～…再弄，再弄我……胸，胸部也好……那里！……还有屁股，再揉啊～～…」\`,
        ); // :567
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        era.set(\`cflag:\${target}:301\`, 6);`,
    replace: `          \`「唔…噢～…再弄，再弄我……胸，胸部也好……那里！……还有屁股，再揉啊～～…」\`,
        ); // :567
        // CFLAG:301  = 6（变量语义：CFLAG 族，301）
        era.set(\`cflag:\${target}:301\`, 5);`,
    tests: ['kojo-k4-stoic'],
    must_mention: '淫乱 TALENT:76 → CFLAG:301 = 6',
  },
  {
    desc: 'M1758 K4 爱撫爱慕档推进写错（CFLAG:301 = 5 改 4，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `          \`「那么细腻，温柔的手法……人家会……啊！……噢～啊啊！……有，有感觉了～～…」\`,
        ); // :571
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        era.set(\`cflag:\${target}:301\`, 5);`,
    replace: `          \`「那么细腻，温柔的手法……人家会……啊！……噢～啊啊！……有，有感觉了～～…」\`,
        ); // :571
        // CFLAG:301  = 5（变量语义：CFLAG 族，301）
        era.set(\`cflag:\${target}:301\`, 4);`,
    tests: ['kojo-k4-stoic'],
    must_mention: '爱慕 TALENT:85 → CFLAG:301 = 5',
  },
  {
    desc: 'M1759 K4 爱撫屈服Lv3档推进写错（CFLAG:301 = 4 改 3，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `        await era.printAndWait(\`「啊…好…那里……」\`); // :575
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        era.set(\`cflag:\${target}:301\`, 4);`,
    replace: `        await era.printAndWait(\`「啊…好…那里……」\`); // :575
        // CFLAG:301  = 4（变量语义：CFLAG 族，301）
        era.set(\`cflag:\${target}:301\`, 3);`,
    tests: ['kojo-k4-stoic'],
    must_mention: '屈服刻印Lv3 → 4',
  },
  {
    desc: 'M1760 K4 爱撫屈服Lv2档推进写错（CFLAG:301 = 3 改 2，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `        await era.printAndWait(\`「快住手啊……再这样摸的话……我会………」\`); // :579
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        era.set(\`cflag:\${target}:301\`, 3);`,
    replace: `        await era.printAndWait(\`「快住手啊……再这样摸的话……我会………」\`); // :579
        // CFLAG:301  = 3（变量语义：CFLAG 族，301）
        era.set(\`cflag:\${target}:301\`, 2);`,
    tests: ['kojo-k4-stoic'],
    must_mention: '屈服刻印Lv2 → 3',
  },
  {
    desc: 'M1761 K4 爱撫それ以外档推进写错（CFLAG:301 = 2 改 1，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `        await era.printAndWait(\`「变态！！…完全不舒服，不要再摸了！」\`); // :583
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        era.set(\`cflag:\${target}:301\`, 2);`,
    replace: `        await era.printAndWait(\`「变态！！…完全不舒服，不要再摸了！」\`); // :583
        // CFLAG:301  = 2（变量语义：CFLAG 族，301）
        era.set(\`cflag:\${target}:301\`, 1);`,
    tests: ['kojo-k4-stoic'],
    must_mention: 'それ以外（MARK:2 <= 1）→ 2',
  },
  {
    desc: 'M1762 K4 阶段耗尽静默锁删（FLAG:7 == 1 时也出声，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `      if (
        era0(\`talent:\${target}:76\`) == 1 &&
        (era0(\`cflag:\${target}:301\`) <= 5 || era0('flag:7') == 2)
      ) {`,
    replace: `      if (
        era0(\`talent:\${target}:76\`) == 1 &&
        (era0(\`cflag:\${target}:301\`) <= 5 || era0('flag:7') == 1)
      ) {`,
    tests: ['kojo-k4-stoic'],
    must_mention: '阶段耗尽后（FLAG:7 == 1）静默',
  },
  {
    desc: 'M1763 K4 DOG_KOJO 初回推进写错（CFLAG:301 = 1 改 0，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `        await era.printAndWait(\`「讨，讨厌！别舔啊！」\`); // :3107
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      era.set(\`cflag:\${target}:301\`, 1);
      return 0;`,
    replace: `        await era.printAndWait(\`「讨，讨厌！别舔啊！」\`); // :3107
      }
      // CFLAG:301  = 1（变量语义：CFLAG 族，301）
      era.set(\`cflag:\${target}:301\`, 0);
      return 0;`,
    tests: ['kojo-k4-stoic'],
    must_mention:
      '兽奸爱撫初回（DOG_KOJO_4 :3101 CFLAG:301 == 0 且 MARK:2 < 2）',
  },
  {
    desc: 'M1764 K4 PALAMCNG 处女丧失的 A 加算改错（UP:12 丢，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `  const A =
    (era0(\`delta:\${target}:11\`) || 0) + (era0(\`delta:\${target}:12\`) || 0);`,
    replace: `  const A =
    (era0(\`delta:\${target}:11\`) || 0);`,
    tests: ['kojo-k4-stoic'],
    must_mention: '处女丧失 A >= 500 落それ以外档（UP:12 参与加算）',
  },
  {
    desc: 'M1765 K4 MARKCNG 苦痛刻印取得推进写错（CFLAG:297 = 1 改 0，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    era.set(\`cflag:\${target}:297\`, 1);`,
    replace: `    // CFLAG:297  = 1（变量语义：CFLAG 族，297）
    era.set(\`cflag:\${target}:297\`, 0);`,
    tests: ['kojo-k4-stoic'],
    must_mention: '苦痛刻印Lv3 CFLAG:297 = 1',
  },
  {
    desc: 'M1766 K4 MARKCNG 快乐刻印取得推进写错（CFLAG:298 = 1 改 0，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    era.set(\`cflag:\${target}:298\`, 1);`,
    replace: `    // CFLAG:298  = 1（变量语义：CFLAG 族，298）
    era.set(\`cflag:\${target}:298\`, 0);`,
    tests: ['kojo-k4-stoic'],
    must_mention: '快乐刻印Lv3 CFLAG:298 = 1',
  },
  {
    desc: 'M1767 K4 MARKCNG 屈服刻印取得推进写错（CFLAG:299 = 1 改 0，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    era.set(\`cflag:\${target}:299\`, 1);`,
    replace: `    // CFLAG:299  = 1（变量语义：CFLAG 族，299）
    era.set(\`cflag:\${target}:299\`, 0);`,
    tests: ['kojo-k4-stoic'],
    must_mention: '屈服刻印Lv3 CFLAG:299 = 1',
  },
  {
    desc: 'M1768 K4 MARKCNG 反抗刻印取得推进写错（CFLAG:300 = 1 改 0，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    era.set(\`cflag:\${target}:300\`, 1);`,
    replace: `    // CFLAG:300  = 1（变量语义：CFLAG 族，300）
    era.set(\`cflag:\${target}:300\`, 0);`,
    tests: ['kojo-k4-stoic'],
    must_mention: '反抗刻印Lv3',
  },
  {
    desc: 'M1769 K4 SELF_KOJO 调教后自慰档位写错（CFLAG:261 = 1 改 0，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `      // CFLAG:261  = 1（变量语义：CFLAG 族，261）
      era.set(\`cflag:\${target}:261\`, 1);`,
    replace: `      // CFLAG:261  = 1（变量语义：CFLAG 族，261）
      era.set(\`cflag:\${target}:261\`, 0);`,
    tests: ['kojo-k4-stoic'],
    must_mention: '调教后自慰（TFLAG:13 == 1）：それ以外初回 → CFLAG:261 = 1',
  },
  {
    desc: 'M1770 K4 SELF_KOJO 卖却分支存根丢（SELL_MATURO_K0 不落，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: "      stub_line('SELL_MATURO_K0', '卖却分支（成熟贩卖）', '随售却票');",
    replace: '      // 变异：SELL_MATURO_K0 存根丢',
    tests: ['kojo-k4-stoic'],
    must_mention: 'SELL_MATURO_K0',
  },
  {
    desc: 'M1771 K4 NTR_KOUJO P == 1 的分支写错（cflag:651 推进丢，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `    // CFLAG:651  = 1（变量语义：CFLAG 族，651）
    era.set(\`cflag:\${target}:651\`, 1);`,
    replace: '    // 变异：cflag:651 推进丢',
    tests: ['kojo-k4-stoic'],
    must_mention: 'NTR_KOUJO P == 1（处女丧失）',
  },
  {
    desc: 'M1772 K4 GOBI_KOUJO ARG:0 == 1 支改错（哦～♪ 变 哦！，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '    await era.print(\`哦～♪\`); // :5434',
    replace: '    await era.print(\`哦！\`); // :5434 变异',
    tests: ['kojo-k4-stoic'],
    must_mention: 'GOBI_KOUJO ARG:0 == 1-5 各支与 0 随机三选一',
  },
  {
    desc: 'M1773 K4 主启动图删 K4 冷徹口上注册（KOJO 4 不进实际运行图，#235）',
    file: 'ere/system/flow/main-loop.js',
    find: "require('#/kojo/kojo-k4-stoic');",
    replace: '// 变异：K4 冷徹口上不在主启动图注册',
    tests: ['kojo-family-wiring'],
    must_mention: '主启动图漏装：kojo-k4-stoic',
  },
  {
    desc: 'M1774 K4 插值槽位错配（CALLNAME:MASTER 与 NAME:MASTER 混，#235 保真）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: `        \`四脚爬爬，扭动着腰，用炽热的视线仰视着\${master_name}。\`,
      ); // :152`,
    replace: `        \`四脚爬爬，扭动着腰，用炽热的视线仰视着\${target_name}。\`,
      ); // :152 变异：填错孔`,
    tests: ['kojo-text-fidelity'],
    must_mention: '槽位序',
  },

  {
    desc: 'M1650 K1 首次爱抚推进写错（CFLAG:301 = 1 改 2）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '      chara(target).kojo.爱抚 = 1; // :1026',
    replace: '      chara(target).kojo.爱抚 = 2; // :1026（变异）',
    tests: ['kojo-k1-confident'],
    must_mention: '首次爱抚推进到 1',
  },
  {
    desc: 'M1651 K1 首次刻印分档边界（MARK:2 >= 2 改 >= 3）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `      } else if (era.get(\`mark:\${target}:2\`) >= 2) {
        // :1020`,
    replace: `      } else if (era.get(\`mark:\${target}:2\`) >= 3) {
        // :1020（变异）`,
    tests: ['kojo-k1-confident'],
    must_mention: '刻印分档也推进到 1',
  },
  {
    desc: 'M1652 K1 二次爱抚推进写错（CFLAG:301 = 2 改 3）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        chara(target).kojo.爱抚 = 2; // :1056',
    replace: '        chara(target).kojo.爱抚 = 3; // :1056（变异）',
    tests: ['kojo-k1-confident'],
    must_mention: '爱抚推进到 2',
  },
  {
    desc: 'M1653 K1 屈服 Lv3 推进写错（CFLAG:301 = 4 改 3）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        chara(target).kojo.爱抚 = 4; // :1047',
    replace: '        chara(target).kojo.爱抚 = 3; // :1047（变异）',
    tests: ['kojo-k1-confident'],
    must_mention: '爱抚推进到 4',
  },
  {
    desc: 'M1654 K1 淫乱素质判据错格（TALENT:76 改 77）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :1034`,
    replace: `        era.get(\`talent:\${target}:77\`) === 1 &&
        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :1034`,
    tests: ['kojo-k1-confident'],
    must_mention: '淫乱爱抚台词',
  },
  {
    desc: 'M1655 K1 爱慕素质判据错格（TALENT:85 改 86）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `        era.get(\`talent:\${target}:85\`) === 1 &&
        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1039`,
    replace: `        era.get(\`talent:\${target}:86\`) === 1 &&
        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :1039`,
    tests: ['kojo-k1-confident'],
    must_mention: '爱慕爱抚台词',
  },
  {
    desc: 'M1656 K1 FLAG:7 == 2 旁路失效（爱抚上限旁路改 === 3）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `        (era.get(\`mark:\${target}:2\`) || 0) <= 1 &&
        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        // :1054`,
    replace: `        (era.get(\`mark:\${target}:2\`) || 0) <= 1 &&
        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 === 3)
      ) {
        // :1054`,
    tests: ['kojo-k1-confident'],
    must_mention: 'FLAG:7 == 2 旁路重出声',
  },
  {
    desc: 'M1657 K1 FLAG:7 == 1 阈值闸失效（爱抚上限 <= 1 改 <= 2）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `        (era.get(\`mark:\${target}:2\`) || 0) <= 1 &&
        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        // :1054`,
    replace: `        (era.get(\`mark:\${target}:2\`) || 0) <= 1 &&
        (chara(target).kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :1054`,
    tests: ['kojo-k1-confident'],
    must_mention: 'FLAG:7 == 1 阶段耗尽不出声',
  },
  {
    desc: 'M1658 K1 @EVENTTRAIN #PRI 存在标志写错（FLAG:101 = 1 改 2）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '  game.kojo.口上存在_1 = 1; // :86',
    replace: '  game.kojo.口上存在_1 = 2; // :86（变异）',
    tests: ['kojo-k1-confident'],
    must_mention: 'K1 存在标志置 1',
  },
  {
    desc: 'M1659 K1 @EVENTEND #LATER 清标志删除（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '  game.kojo.口上存在_1 = 0; // :92',
    replace: '  // 变异：清标志删除',
    tests: ['kojo-k1-confident'],
    must_mention: 'K1 存在标志清 0',
  },
  {
    desc: 'M1660 K1 助手调教真身删除（ASSI 分支改恒 false）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `      if (era_flag.assi > 0 && era_flag.assiplay) {
        // :1017
        await era.printAndWait(\`\${target_name}转过脸就这样看着\${assi_name}………\`); // :1018`,
    replace: `      if (false) {
        // :1017 变异：助手调教不出台词
        await era.printAndWait(\`\${target_name}转过脸就这样看着\${assi_name}………\`); // :1018`,
    tests: ['kojo-k1-confident'],
    must_mention: '助手调教不跳过出台词',
  },
  {
    desc: 'M1661 K1 口塞守卫删除（TEQUIP:45 改恒 false）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `  if (era.get(\`tequip:\${target}:45\`) && era_flag.selectcom !== 45) {
    // :990-991`,
    replace: `  if (false && era_flag.selectcom !== 45) {
    // :990-991 变异`,
    tests: ['kojo-k1-confident'],
    must_mention: '口塞非 45 指令跳过',
  },
  {
    desc: 'M1662 K1 口塞 SELECTCOM == 45 豁免失效（去掉 !== 45）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `  if (era.get(\`tequip:\${target}:45\`) && era_flag.selectcom !== 45) {
    // :990-991`,
    replace: `  if (era.get(\`tequip:\${target}:45\`)) {
    // :990-991 变异：口塞 45 豁免失效`,
    tests: ['kojo-k1-confident'],
    must_mention: '口塞指令自己说话',
  },
  {
    desc: 'M1663 K1 失神守卫删除（TFLAG:899 改恒 false）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `  if (game.train.失神) {
    // :993-994`,
    replace: `  if (false) {
    // :993-994 变异：失神守卫删除`,
    tests: ['kojo-k1-confident'],
    must_mention: '失神：跳过',
  },
  {
    desc: 'M1664 K1 崩坏守卫错格（TALENT:9 改 8）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `  if (era.get(\`talent:\${target}:9\`) === 1) {
    // :996-997`,
    replace: `  if (era.get(\`talent:\${target}:8\`) === 1) {
    // :996-997 变异`,
    tests: ['kojo-k1-confident'],
    must_mention: '崩坏：跳过',
  },
  {
    desc: 'M1665 K1 触手守卫删除（TEQUIP:90 改恒 false）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `  if (era.get(\`tequip:\${target}:90\`)) {
    // :1004-1005`,
    replace: `  if (false) {
    // :1004-1005 变异：触手守卫删除`,
    tests: ['kojo-k1-confident'],
    must_mention: '触手：跳过',
  },
  {
    desc: 'M1666 K1 死斗场守卫错位（TEQUIP:55 改 56）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `  if (era.get(\`tequip:\${target}:55\`)) {
    // :982`,
    replace: `  if (era.get(\`tequip:\${target}:56\`)) {
    // :982 变异`,
    tests: ['kojo-k1-confident'],
    must_mention: '看到死斗场的热浪',
  },
  {
    desc: 'M1667 K1 死斗场真身 CALL 删除（COLOSSEUM_KOJO_1 不调）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    await colosseum_kojo_1(rand); // CALL COLOSSEUM_KOJO_1 // :983',
    replace: '    // 变异：死斗场真身不调',
    tests: ['kojo-k1-confident'],
    must_mention: '看到死斗场的热浪',
  },
  {
    desc: 'M1668 K1 兽奸守卫错位（TEQUIP:89 改 88）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `  if (era.get(\`tequip:\${target}:89\`)) {
    // :999`,
    replace: `  if (era.get(\`tequip:\${target}:88\`)) {
    // :999 变异`,
    tests: ['kojo-k1-confident'],
    must_mention: '「讨厌啊！　不要靠过来！」',
  },
  {
    desc: 'M1669 K1 兽奸真身 CALL 删除（DOG_KOJO_1 不调）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    await dog_kojo_1(rand); // CALL DOG_KOJO_1 // :1000',
    replace: '    // 变异：兽奸真身不调',
    tests: ['kojo-k1-confident'],
    must_mention: '「讨厌啊！　不要靠过来！」',
  },
  {
    desc: 'M1670 K1 兽奸首次台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「讨厌啊！　不要靠过来！」`); // :5596',
    replace:
      '        await era.printAndWait(`「讨厌啊！不要靠过来！」`); // :5596 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '「讨厌啊！　不要靠过来！」',
  },
  {
    desc: 'M1671 K1 PALAMCNG 润滑 LV2 门槛抬高（PALAMLV[2] 改 [3]）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `  if (P > PALAMLV[2] && chara(target).kojo.首次润滑Lv2 === 0) {
    // :6502`,
    replace: `  if (P > PALAMLV[3] && chara(target).kojo.首次润滑Lv2 === 0) {
    // :6502 变异`,
    tests: ['kojo-k1-confident'],
    must_mention: 'PALAMCNG 润滑 LV2',
  },
  {
    desc: 'M1672 K1 PALAMCNG 首次润滑标志写错（CFLAG:221 = 1 改 0）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    chara(target).kojo.首次润滑Lv2 = 1; // :6526',
    replace: '    chara(target).kojo.首次润滑Lv2 = 0; // :6526 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '首次润滑Lv2 推进',
  },
  {
    desc: 'M1673 K1 MARKCNG 苦痛刻印台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '      await era.printAndWait(`「啊啊啊…再…痛…啊」`); // :6744',
    replace:
      '      await era.printAndWait(`「啊啊啊…再…痛啊」`); // :6744 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '「啊啊啊…再…痛…啊」',
  },
  {
    desc: 'M1674 K1 MARKCNG 苦痛刻印标志写错（CFLAG:297 = 1 改 0）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    chara(target).kojo.苦痛刻印Lv3 = 1; // :6746',
    replace: '    chara(target).kojo.苦痛刻印Lv3 = 0; // :6746 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '苦痛刻印Lv3 推进',
  },
  {
    desc: 'M1675 K1 BENKI 默认支台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '      await era.printAndWait(`「噫、好脏……」`); // :7475',
    replace: '      await era.printAndWait(`「噫、好脏…」`); // :7475 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '「噫、好脏……」',
  },
  {
    desc: 'M1676 K1 NTR P=1 台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        `「啊啊啊…为什么…这样…啊嗯！不行了…这样弄不行了啊！」`,',
    replace: '        `「啊啊啊…为什么…这样…啊嗯！不行了…这样弄不行啊！」`,',
    tests: ['kojo-k1-confident'],
    must_mention: '「啊啊啊…为什么…这样…啊嗯！不行了…这样弄不行了啊！」',
  },
  {
    desc: 'M1677 K1 NTR CFLAG:651 推进写错（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    chara(target).kojo.NTR_651 = 1; // :7862',
    replace: '    chara(target).kojo.NTR_651 = 0; // :7862 变异',
    tests: ['kojo-k1-confident'],
    must_mention: 'NTR_651 推进',
  },
  {
    desc: 'M1678 K1 NTR 再捕获标志写错（CFLAG:650 = 1 改 0）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    chara(target).kojo.NTR再捕获 = 1; // :7853',
    replace: '    chara(target).kojo.NTR再捕获 = 0; // :7853 变异',
    tests: ['kojo-k1-confident'],
    must_mention: 'NTR再捕获推进',
  },
  {
    desc: 'M1679 K1 ENTERENEMY 默认支台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    await era.printAndWait(`「虽然不怎么了解魔王的实力、不过觉悟吧！！」`); // :8063',
    replace:
      '    await era.printAndWait(`「虽然不怎么了解魔王的实力、不过觉悟吧！」`); // :8063 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '虽然不怎么了解魔王的实力',
  },
  {
    desc: 'M1680 K1 GOBI ARG=1 语尾改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    await era.print(`哎哟♪`); // :8251',
    replace: '    await era.print(`哎哟`); // :8251 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '哎哟♪',
  },
  {
    desc: 'M1681 K1 胜利口上开场改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '  await era.printAndWait(`「${sc()}赢不了啊！」`); // :7577',
    replace: '  await era.printAndWait(`「${sc()}赢不了！」`); // :7577 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '胜利口上开场',
  },
  {
    desc: 'M1682 K1 攻击口上 TALENT:11 台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「怪物！　死吧！」`); // :7643',
    replace:
      '        await era.printAndWait(`「怪物！死吧！」`); // :7643 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '「怪物！　死吧！」',
  },
  {
    desc: 'M1683 K1 首次爱抚拒绝台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「放过我吧！别再来了…唔哇」`); // :1024',
    replace:
      '        await era.printAndWait(`「放过我吧！别再来了唔哇」`); // :1024 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '「放过我吧！别再来了…唔哇」',
  },
  {
    desc: 'M1684 K1 二次爱抚台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「哈…放过我吧…这样一点儿也…咕！」`); // :1055',
    replace:
      '        await era.printAndWait(`「哈…放过我吧…这样一点儿也咕！」`); // :1055 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '「哈…放过我吧…这样一点儿也…咕！」',
  },
  {
    desc: 'M1685 K1 口塞首次台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「呜呜…呜…呼…呼」`); // :4478',
    replace:
      '        await era.printAndWait(`「呜呜…呜…呼呼」`); // :4478 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '「呜呜…呜…呼…呼」',
  },
  {
    desc: 'M1686 K1 死斗场气力>0 台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        `${target_name}看到死斗场的热浪和将要面对的对手吓得直哆嗦……`,',
    replace:
      '        `${target_name}看到死斗场的热浪和将要面对的对手吓得直哆嗦…`,',
    tests: ['kojo-k1-confident'],
    must_mention: '看到死斗场的热浪',
  },
  {
    desc: 'M1687 K1 屈服 Lv3 台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「哈…爱抚…更多的爱抚呦…」`); // :1045',
    replace:
      '        await era.printAndWait(`「哈…爱抚…更多的爱抚呦」`); // :1045 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '屈服 Lv3 台词',
  },
  {
    desc: 'M1688 K1 兽奸爱抚推进写错（DOG CFLAG:301 = 1 改 2）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '      chara(target).kojo.爱抚 = 1; // :5598',
    replace: '      chara(target).kojo.爱抚 = 2; // :5598 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '兽奸爱抚也推进到 1',
  },
  {
    desc: 'M1689 K1 存根清单漏登记（SELL_MATURO_K0 改名）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: "const STUBBED_CALLS = ['SELL_MATURO_K0'];",
    replace: "const STUBBED_CALLS = ['SELL_MATURO_K1'];",
    tests: ['kojo-k1-confident'],
    must_mention: 'docs/stub-registry.md 必须收录',
  },
  {
    desc: 'M1690 K1 PALAMCNG 首次C绝顶回退成二段 nowex（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `    (era.get(\`nowex:\${target}:0\`) || 0) > 0 &&
    chara(target).kojo.首次C绝顶 === 0`,
    replace: `    (era.get('nowex:0') || 0) > 0 &&
    chara(target).kojo.首次C绝顶 === 0`,
    tests: ['kojo-k1-confident', 'chara-table-addressing'],
    must_mention: '首次C绝顶默认台词',
  },
  {
    desc: 'M1691 K1 PALAMCNG 首次C绝顶标志写错（CFLAG:225 = 1 改 0）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    chara(target).kojo.首次C绝顶 = 1; // :6607',
    replace: '    chara(target).kojo.首次C绝顶 = 0; // :6607 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '首次C绝顶推进',
  },
  {
    desc: 'M1700 K3 舔阴首次推进写错（CFLAG:302 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.舔阴 = 1; // :1120',
    replace: '      kojo.舔阴 = 2; // :1120（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '舔阴首次（CFLAG:302 == 0 且非处女）',
  },
  {
    desc: 'M1701 K3 舔阴处女分档删（TALENT:0 臂拿掉）（#234）',
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
    desc: 'M1702 K3 舔阴淫乱推进写错（CFLAG:302 = 5 改 4）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.舔阴 = 5; // :1129',
    replace: '      kojo.舔阴 = 4; // :1129（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '舔阴二次以后',
  },
  {
    desc: 'M1703 K3 肛门爱抚首次推进写错（CFLAG:303 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.肛门爱抚 = 1; // :1156',
    replace: '      kojo.肛门爱抚 = 2; // :1156（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '肛门爱抚首次',
  },
  {
    desc: 'M1704 K3 肛门爱抚润滑阈值错（PALAMLV[2] 改 PALAMLV[3]）（#234）',
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
    desc: 'M1705 K3 肛门爱抚それ以外读错槽（CFLAG:223 改 303）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '    } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 === 2) {',
    replace: '    } else if (kojo.肛门爱抚 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k3-noble'],
    must_mention: '肛门爱抚それ以外读 CFLAG:223',
  },
  {
    desc: 'M1706 K3 自慰首次推进写错（CFLAG:304 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.自慰 = 1; // :1206',
    replace: '      kojo.自慰 = 2; // :1206（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '自慰首次（CFLAG:304 == 0）',
  },
  {
    desc: 'M1707 K3 自慰淫乱处女推进写错（CFLAG:304 = 9 改 8）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.自慰 = 9; // :1218',
    replace: '      kojo.自慰 = 8; // :1218（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '淫乱处女推进到 9',
  },
  {
    desc: 'M1708 K3 自慰淫乱自慰中毒门槛错（ABL:31 >= 3 改 >= 4）（#234）',
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
  {
    desc: 'M1709 K3 胸爱抚首次推进写错（CFLAG:306 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.胸爱抚 = 1; // :1357',
    replace: '      kojo.胸爱抚 = 2; // :1357（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '胸爱抚首次（CFLAG:306 == 0）',
  },
  {
    desc: 'M1710 K3 胸爱抚淫乱推进写错（CFLAG:306 = 5 改 4）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.胸爱抚 = 5; // :1388',
    replace: '      kojo.胸爱抚 = 4; // :1388（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '胸爱抚淫乱推进到 5',
  },
  {
    desc: 'M1711 K3 胸爱抚B感覚门槛错（乳房感觉 >= 3 改 >= 4）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `      system.乳房感觉 >= 3 &&
      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊啊~…胸部…胸部居然会那么有感觉什么的…」'); // :1396`,
    replace: `      system.乳房感觉 >= 4 &&
      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊啊~…胸部…胸部居然会那么有感觉什么的…」'); // :1396`,
    tests: ['kojo-k3-noble'],

    must_mention: '胸爱抚B感覚Lv3推进到 3',
  },
  {
    desc: 'M1712 K3 接吻调教首次推进写错（CFLAG:307 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.接吻 = 1; // :1489',
    replace: '      kojo.接吻 = 2; // :1489（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '接吻调教首次（CFLAG:307 == 0 且非 TFLAG:13）',
  },
  {
    desc: 'M1713 K3 接吻淫乱推进写错（CFLAG:307 = 5 改 4）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.接吻 = 5; // :1498',
    replace: '      kojo.接吻 = 4; // :1498（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '接吻淫乱推进到 5',
  },
  {
    desc: 'M1714 K3 接吻顺从门槛错（ABL:10 >= 2 改 >= 3）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `      system.顺从 >= 2 &&
      (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)`,
    replace: `      system.顺从 >= 3 &&
      (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k3-noble'],
    must_mention: '接吻顺从Lv2推进到 3',
  },
  {
    desc: 'M1715 K3 死斗场守卫删松（TEQUIP:55 恒 false）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `  // :888-892 死斗场中は専用口上
  if (era.get(\`tequip:\${target}:55\`)) {`,
    replace: `  // :888-892 死斗场中は専用口上
  if (false) {`,
    tests: ['kojo-k3-noble'],
    must_mention: '死斗场（TEQUIP:55）最先',
  },
  {
    desc: 'M1716 K3 助手调教守卫删松（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `  // :894-895 助手が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay) {`,
    replace: `  // :894-895 助手が調教した時に口上をスキップする
  if (false) {`,
    tests: ['kojo-k3-noble'],
    must_mention: '助手调教：静默跳过',
  },
  {
    desc: 'M1717 K3 口塞守卫删松（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `  // :897-898 口塞着用時（SELECTCOM == 45 自己说话不算）
  if (era.get(\`tequip:\${target}:45\`) && era_flag.selectcom !== 45) {`,
    replace: `  // :897-898 口塞着用時（SELECTCOM == 45 自己说话不算）
  if (false) {`,
    tests: ['kojo-k3-noble'],
    must_mention: '口塞：静默跳过',
  },
  {
    desc: 'M1718 K3 失神守卫删松（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `  // :900-901 失神時（TFLAG:899）——跨域读属主 train 的一维门面
  if (game.train.失神) {`,
    replace: `  // :900-901 失神時（TFLAG:899）——跨域读属主 train 的一维门面
  if (false) {`,
    tests: ['kojo-k3-noble'],
    must_mention: '失神：静默跳过',
  },
  {
    desc: 'M1719 K3 兽奸守卫删松（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `  // :903-906 兽奸PLAY中は専用口上
  if (era.get(\`tequip:\${target}:89\`)) {`,
    replace: `  // :903-906 兽奸PLAY中は専用口上
  if (false) {`,
    tests: ['kojo-k3-noble'],
    must_mention: '兽奸（TEQUIP:89）',
  },
  {
    desc: 'M1720 K3 崩坏守卫删松（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `  // :908-909 崩坏した場合（TALENT:9）
  if (era.get(\`talent:\${target}:9\`) === 1) {`,
    replace: `  // :908-909 崩坏した場合（TALENT:9）
  if (false) {`,
    tests: ['kojo-k3-noble'],
    must_mention: '崩坏：静默跳过',
  },
  {
    desc: 'M1721 K3 触手守卫删松（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `  // :911-912 触手調教中（TEQUIP:90）
  if (era.get(\`tequip:\${target}:90\`)) {`,
    replace: `  // :911-912 触手調教中（TEQUIP:90）
  if (false) {`,
    tests: ['kojo-k3-noble'],
    must_mention: '触手：静默跳过',
  },
  {
    desc: 'M1722 K3 自己扒开首次推进写错（CFLAG:308 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.自己扒开 = 1; // :1535',
    replace: '      kojo.自己扒开 = 2; // :1535（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '自己扒开首次推进到 1',
  },
  {
    desc: 'M1723 K3 EVENTTRAIN 初调教推进写错（CFLAG:201 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '    kojo.初调教 = 1; // :180',
    replace: '    kojo.初调教 = 2; // :180（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '初调教推进到 1',
  },
  {
    desc: 'M1724 K3 EVENTEND CFLAG:301 钳回删掉（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '    kojo.爱抚 = 1; // :793',
    replace: '    // 变异：CFLAG:301 钳回删除',
    tests: ['kojo-k3-noble'],
    must_mention: '爱抚计数钳回 1',
  },
  {
    desc: 'M1725 K3 PALAMCNG 首次润滑Lv2 推进写错（CFLAG:221 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '    kojo.首次润滑Lv2 = 1; // :7129',
    replace: '    kojo.首次润滑Lv2 = 2; // :7129（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '首次润滑Lv2',
  },
  {
    desc: 'M1726 K3 兽奸爱抚首次推进写错（CFLAG:301 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.爱抚 = 1; // :5824',
    replace: '      kojo.爱抚 = 2; // :5824（变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '兽奸爱抚首次推进到 1',
  },
  {
    desc: 'M1727 K3 死斗场 SELECTCOM 55 条件错（改 56）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: `  const scf = () => self_call_first(target);

  if (era_flag.selectcom === 55) {`,
    replace: `  const scf = () => self_call_first(target);

  if (era_flag.selectcom === 56) {`,
    tests: ['kojo-k3-noble'],

    must_mention: '死斗场（TEQUIP:55）最先',
  },
  {
    desc: 'M1728 K3 存根清单漏 SELL_MATURO_K0（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: "const STUBBED_CALLS = ['SELL_MATURO_K0'];",
    replace: 'const STUBBED_CALLS = [];',
    tests: ['kojo-k3-noble'],
    must_mention: 'SELL_MATURO_K0',
  },
  {
    desc: 'M1729 try_kojo_or_stub 已注册仍打占位（family.has 恒 false）（#234）',
    file: 'ere/kojo/kojo-system.js',
    find: '  if (id >= 0 && family.has(id)) {',
    replace: '  if (false) { // 变异：已注册也打占位',
    tests: ['kojo-k3-noble', 'benki'],
    must_mention: 'K3 真身不打占位行',
  },
  {
    desc: 'M1730 try_kojo_or_stub 未注册不再打占位（stub_line 删）（#234）',
    file: 'ere/kojo/kojo-system.js',
    find: '    stub_line(stub_name, stub_desc, stub_ticket);',
    replace: '    /* 变异：未注册静默 */',
    tests: ['benki'],
    must_mention: '未注册性格打 @BENKI_KOUJO 占位行',
  },
  {
    desc: 'M1540 K2 首次状态推进写错（CFLAG:301 = 1 改 2）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '      kojo.爱抚 = 1; // :893',
    replace: '      kojo.爱抚 = 2; // :893（变异）',
    tests: ['kojo-k2-timid'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1541 K2 淫乱素质判据错格（TALENT:76 改 77）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: `      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :898`,
    replace: `      if (
        era.get(\`talent:\${target}:77\`) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :898`,
    tests: ['kojo-k2-timid'],
    must_mention: '淫乱分支',
  },
  {
    desc: 'M1542 K2 阈值闸旁路失效（それ以外支 FLAG:7 == 2 改 === 3）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: `      } else if (
        (era.get(\`mark:\${target}:2\`) || 0) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
      ) {
        // :916`,
    replace: `      } else if (
        (era.get(\`mark:\${target}:2\`) || 0) <= 1 &&
        (kojo.爱抚 <= 1 || game.kojo.口上开关 === 3)
      ) {
        // :916`,
    tests: ['kojo-k2-timid'],
    must_mention: 'それ以外支 FLAG:7',
  },
  {
    desc: 'M1543 凌辱口上分发回退成写死 call(0)（#233）',
    file: 'ere/kojo/kojo-dungeon-ravish.js',
    find: `  const ryou_local = get_kojo_num();
  if ((ryou_local >= 100 && ryou_local < 140) || ryou_local > 1000) {
    await ryouzyoku_kojo_family.call(ryou_local - 100, {`,
    replace: `  const ryou_local = 0;
  if (true) {
    await ryouzyoku_kojo_family.call(0, {`,
    tests: ['kojo-k2-timid'],
    must_mention: 'GET_KOJO_NUM',
  },
  {
    desc: 'M1546 K2 死斗场守卫删除（TEQUIP:55 改恒 false）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: `  if (era.get(\`tequip:\${target}:55\`)) {
    // :854
    await colosseum_kojo_2(rand_n); // :855`,
    replace: `  if (false) {
    // :854
    await colosseum_kojo_2(rand_n); // :855`,
    tests: ['kojo-k2-timid'],
    must_mention: '死斗场（TEQUIP:55）最先',
  },
  {
    desc: 'M1547 K2 助手调教守卫删除（ASSIPLAY 改恒 false）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: `  if (era_flag.assi > 0 && era_flag.assiplay) {
    // :859
    return 0;
  }`,
    replace: `  if (false) {
    // :859
    return 0;
  }`,
    tests: ['kojo-k2-timid'],
    must_mention: '助手调教（ASSI > 0 && ASSIPLAY）',
  },
  {
    desc: 'M1548 K2 口塞例外失效（SELECTCOM != 45 改 != 46）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {',
    replace:
      '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 46) {',
    tests: ['kojo-k2-timid'],
    must_mention: '口塞中的 45 指令不被头部守卫拦',
  },
  {
    desc: 'M1549 K2 失神守卫删除（TFLAG:899 改恒 false）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: `  if (game.train.失神) {
    // :865
    return 0;
  }`,
    replace: `  if (false) {
    // :865
    return 0;
  }`,
    tests: ['kojo-k2-timid'],
    must_mention: '失神（TFLAG:899）：静默跳过',
  },
  {
    desc: 'M1550 K2 崩坏守卫删除（TALENT:9 改恒 false）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: `  if (era.get(\`talent:\${target}:9\`) === 1) {
    // :868
    return 0;
  }`,
    replace: `  if (false) {
    // :868
    return 0;
  }`,
    tests: ['kojo-k2-timid'],
    must_mention: '崩坏（TALENT:9）：静默跳过',
  },
  {
    desc: 'M1551 K2 兽奸守卫删除（TEQUIP:89 改恒 false）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: `  if (era.get(\`tequip:\${target}:89\`)) {
    // :871
    return 0;
  }`,
    replace: `  if (false) {
    // :871
    return 0;
  }`,
    tests: ['kojo-k2-timid'],
    must_mention: '不调 DOG_KOJO_2',
  },
  {
    desc: 'M1552 K2 触手守卫删除（TEQUIP:90 改恒 false）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: `  if (era.get(\`tequip:\${target}:90\`)) {
    // :874
    return 0;
  }`,
    replace: `  if (false) {
    // :874
    return 0;
  }`,
    tests: ['kojo-k2-timid'],
    must_mention: '触手（TEQUIP:90）：静默跳过',
  },
  {
    desc: 'M1553 K2 爱慕素质判据错格（TALENT:85 改 86）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: `        era.get(\`talent:\${target}:85\`) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :903`,
    replace: `        era.get(\`talent:\${target}:86\`) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :903`,
    tests: ['kojo-k2-timid'],
    must_mention: '爱慕分支',
  },
  {
    desc: 'M1554 K2 屈服刻印 Lv3 判据错格（MARK:2 == 3 改 4）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: `        (era.get(\`mark:\${target}:2\`) || 0) === 3 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :908`,
    replace: `        (era.get(\`mark:\${target}:2\`) || 0) === 4 &&
        (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :908`,
    tests: ['kojo-k2-timid'],
    must_mention: '屈服刻印 Lv3',
  },
  {
    desc: 'M1555 K2 舔阴首次推进写错（CFLAG:302 = 1 改 2）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '      kojo.舔阴 = 1; // :938',
    replace: '      kojo.舔阴 = 2; // :938（变异）',
    tests: ['kojo-k2-timid'],
    must_mention: 'CFLAG:302',
  },
  {
    desc: 'M1556 K2 正常位首次推进写错（CFLAG:321 = 1 改 2）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '      kojo.正常位 = 1; // :2021',
    replace: '      kojo.正常位 = 2; // :2021（变异）',
    tests: ['kojo-k2-timid'],
    must_mention: 'CFLAG:321',
  },
  {
    desc: 'M1557 K2 穿环首次推进写错（CFLAG:348 = 1 改 2）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '      kojo.穿环 = 1; // :4577',
    replace: '      kojo.穿环 = 2; // :4577（变异）',
    tests: ['kojo-k2-timid'],
    must_mention: 'CFLAG:348',
  },
  {
    desc: 'M1558 K2 EVENTTRAIN 初调教推进写错（CFLAG:201 = 1 改 2）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '      kojo.初调教 = 1; // :166',
    replace: '      kojo.初调教 = 2; // :166（变异）',
    tests: ['kojo-k2-timid'],
    must_mention: 'CFLAG:201',
  },
  {
    desc: 'M1559 K2 EVENTEND 屈服低档爱慕判据反相（TALENT:85 == 0 改 == 1）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: `    (era.get(\`mark:\${target}:2\`) || 0) <= 1 &&
    era.get(\`talent:\${target}:85\`) === 0
  ) {
    // :766`,
    replace: `    (era.get(\`mark:\${target}:2\`) || 0) <= 1 &&
    era.get(\`talent:\${target}:85\`) === 1
  ) {
    // :766`,
    tests: ['kojo-k2-timid'],
    must_mention: 'EVENTEND 普通档必须出声',
  },
  {
    desc: 'M1560 K2 @EVENTEND #LATER 清标志删除（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '    game.kojo.口上存在_2 = 0; // :88',
    replace: '    // 变异：清标志删除',
    tests: ['kojo-k2-timid'],
    must_mention: 'FLAG:102',
  },
  {
    desc: 'M1561 K2 死斗场专用口上入口错号（SELECTCOM == 55 改 54）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '  if (era_flag.selectcom === 55) {\n    // :6631',
    replace: '  if (era_flag.selectcom === 54) {\n    // :6631',
    tests: ['kojo-k2-timid'],
    must_mention: 'COLOSSEUM_KOJO_2 在 selectcom=55',
  },
  {
    desc: 'M1562 K2 DOG_KOJO 首次推进写错（CFLAG:301 = 1 改 2）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '      kojo.爱抚 = 1; // :4737',
    replace: '      kojo.爱抚 = 2; // :4737（变异）',
    tests: ['kojo-k2-timid'],
    must_mention: 'DOG_KOJO_2 爱抚首次',
  },
  {
    desc: 'M1563 K2 PALAMCNG 润滑阈值抬一档（PALAMLV[2] 改 [3]）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '  if (P > PALAMLV[2] && kojo.首次润滑Lv2 === 0) {',
    replace: '  if (P > PALAMLV[3] && kojo.首次润滑Lv2 === 0) {',
    tests: ['kojo-k2-timid'],
    must_mention: '润滑首次超过 LV2',
  },
  {
    desc: 'M1564 K2 MARKCNG 苦痛刻印 LV3 入口错档（=== 3 改 === 2）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '  if (game.system.苦痛刻印变动 === 3 && kojo.苦痛刻印Lv3 === 0) {',
    replace:
      '  if (game.system.苦痛刻印变动 === 2 && kojo.苦痛刻印Lv3 === 0) {',
    tests: ['kojo-k2-timid'],
    must_mention: 'MARKCNG 苦痛刻印 LV3',
  },
  {
    desc: 'M1565 K2 奖赏后口上 choice == 0 改 9（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '  if (choice === 0) {\n    // :7020',
    replace: '  if (choice === 9) {\n    // :7020',
    tests: ['kojo-k2-timid'],
    must_mention: '哇…我知道了',
  },
  {
    desc: 'M1566 K2 惩罚口上 choice == 0 改 9（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '  if (choice === 0) {\n    // :7100',
    replace: '  if (choice === 9) {\n    // :7100',
    tests: ['kojo-k2-timid'],
    must_mention: '惩罚口上',
  },
  {
    desc: 'M1567 K2 NTR 入口推进写错（CFLAG:650 = 1 改 2）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '    kojo.NTR再捕获 = 1; // :6764',
    replace: '    kojo.NTR再捕获 = 2; // :6764（变异）',
    tests: ['kojo-k2-timid'],
    must_mention: 'CFLAG:650',
  },
  {
    desc: 'M1568 K2 SELF_KOJO leftover_q 助手支入口错档（Q === 1 改 9）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '    if (Q === 1) {\n      // :5860',
    replace: '    if (Q === 9) {\n      // :5860',
    tests: ['kojo-k2-timid'],
    must_mention: 'SELF_KOJO 助手妄想支出声',
  },

  {
    desc: 'M1790 K3 顶层 require com-hardcore（延迟 require 挪回文件头，#288）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: "const era = require('#/era-electron');",
    replace: `const era = require('#/era-electron');
const { piercing_state } = require('#/system/train/com-hardcore'); // 变异：顶层 require（#288 守卫的靶子）`,
    tests: ['top-level-wiring'],
    must_mention: '顶层 require：ere/kojo/kojo-k3-noble.js',
  },
  {
    desc: 'M1791 com-tentacle 顶层 require com-colosseum（延迟 require 挪回文件头，#288）',
    file: 'ere/system/train/com-tentacle.js',
    find: "const era = require('#/era-electron');",
    replace: `const era = require('#/era-electron');
const { arena_slave_point, com_after_arena } = require('#/system/train/com-colosseum'); // 变异：顶层 require（#288 守卫的靶子）`,
    tests: ['top-level-wiring'],
    must_mention: '顶层 require：ere/system/train/com-tentacle.js',
  },

  // —— #238（J28）：K7 ハート 口上模块（M2000-M2069 号段） ——
  {
    desc: 'M2000 K7 @EVENTTRAIN #PRI 存在标志错值（FLAG:107 = 1 改 0，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `game.kojo.口上存在_7 = 1; // :64 FLAG:107 = 1（K7 口上存在标志）`,
    replace: `game.kojo.口上存在_7 = 0; // :64（变异：存在标志错值）`,
    tests: ['kojo-k7-heart'],
    must_mention: 'K7 一对',
  },
  {
    desc: 'M2001 K7 @EVENTEND #LATER 清标志删除（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `game.kojo.口上存在_7 = 0; // :69`,
    replace: `    // 变异：清标志删除`,
    tests: ['kojo-k7-heart'],
    must_mention: 'K7 一对',
  },
  {
    desc: 'M2002 K7 初調教人间分档推进值错（CFLAG:201 = 1 改 2，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era.set(\`cflag:\${target}:201\`, 1); // :112`,
    replace: `era.set(\`cflag:\${target}:201\`, 2); // :112（变异）`,
    tests: ['kojo-k7-heart'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M2003 K7 初調教魔族分档判据错格（TALENT:314 == 9 改 8，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `    // 魔族
    if (era0(\`talent:\${target}:314\`) == 9) {`,
    replace: `    // 魔族
    if (era0(\`talent:\${target}:314\`) == 8) {`,
    tests: ['kojo-k7-heart'],
    must_mention: '初调教魔族分档',
  },
  {
    desc: 'M2004 K7 魔族化（１回のみ）改造标记写错（CFLAG:370 = 2 改 3，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era.set(\`cflag:\${target}:370\`, 2); // :132`,
    replace: `era.set(\`cflag:\${target}:370\`, 3); // :132（变异）`,
    tests: ['kojo-k7-heart'],
    must_mention: '魔族化',
  },
  {
    desc: 'M2005 K7 NTR再捕獲爱慕支解除标记写错（CFLAG:650 = 0 改 1，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era.set(\`cflag:\${target}:650\`, 0); // :150 NTRスイッチ解除`,
    replace: `era.set(\`cflag:\${target}:650\`, 1); // :150（变异）`,
    tests: ['kojo-k7-heart'],
    must_mention: 'NTR再捕獲',
  },
  {
    desc: 'M2006 K7 屈服刻印Lv1推进值错（CFLAG:201 = 2 改 3，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era.set(\`cflag:\${target}:201\`, 2); // :180`,
    replace: `era.set(\`cflag:\${target}:201\`, 3); // :180（变异）`,
    tests: ['kojo-k7-heart'],
    must_mention: '屈服刻印',
  },
  {
    desc: 'M2007 K7 屈服刻印Lv3推进值错（CFLAG:201 = 4 改 5，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era.set(\`cflag:\${target}:201\`, 4); // :205`,
    replace: `era.set(\`cflag:\${target}:201\`, 5); // :205（变异）`,
    tests: ['kojo-k7-heart'],
    must_mention: '屈服刻印',
  },
  {
    desc: 'M2008 K7 淫乱推进值错（CFLAG:201 = 5 改 6，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era.set(\`cflag:\${target}:201\`, 5); // :223`,
    replace: `era.set(\`cflag:\${target}:201\`, 6); // :223（变异）`,
    tests: ['kojo-k7-heart'],
    must_mention: '处女附注',
  },
  {
    desc: 'M2009 K7 爱慕推进值错（CFLAG:201 = 7 改 8，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era.set(\`cflag:\${target}:201\`, 7); // :282`,
    replace: `era.set(\`cflag:\${target}:201\`, 8); // :282（变异）`,
    tests: ['kojo-k7-heart'],
    must_mention: '爱慕',
  },
  {
    desc: 'M2010 K7 崩坏推进值错（CFLAG:201 = 9 改 8，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era.set(\`cflag:\${target}:201\`, 9); // :328`,
    replace: `era.set(\`cflag:\${target}:201\`, 8); // :328（变异）`,
    tests: ['kojo-k7-heart'],
    must_mention: '崩坏',
  },
  {
    desc: 'M2011 K7 崩坏只播一次守卫删松（CFLAG:201 < 9 改 <= 9，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era0(\`talent:\${target}:9\`) == 1 &&
    era0(\`cflag:\${target}:201\`) < 9
  ) {
    // 崩坏`,
    replace: `era0(\`talent:\${target}:9\`) == 1 &&
    era0(\`cflag:\${target}:201\`) <= 9 // 变异：守卫删松
  ) {
    // 崩坏`,
    tests: ['kojo-k7-heart'],
    must_mention: '崩坏只播一次',
  },
  {
    desc: 'M2012 K7 无名助手判据错格（TALENT:MASTER:122 == 0 改 1，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era0(\`talent:0:122\`) == 0) {`,
    replace: `era0(\`talent:0:122\`) == 1) {  // 变异`,
    tests: ['kojo-k7-heart'],
    must_mention: 'K7_KOJO2',
  },
  {
    desc: 'M2013 K7 @EVENTEND 死亡守卫删松（BASE:0 <= 0 改 < 0，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era0(\`base:\${target}:0\`) <= 0) {`,
    replace: `era0(\`base:\${target}:0\`) < 0) {  // 变异`,
    tests: ['kojo-k7-heart'],
    must_mention: '死亡守卫',
  },
  {
    desc: 'M2014 K7 @EVENTEND 崩坏判据错格（FLAG:7 == 2 改 3，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `if (era0(\`talent:\${target}:9\`) == 1 && era0('flag:7') == 2) {
    // 崩坏
    era.drawLine();
    await era.printAndWait(\`「不…讨厌…怪物的孩子不要生下来…不要………」\`); // :841`,
    replace: `if (era0(\`talent:\${target}:9\`) == 1 && era0('flag:7') == 3) {
    // 崩坏（变异：FLAG:7 判据错格）
    era.drawLine();
    await era.printAndWait(\`「不…讨厌…怪物的孩子不要生下来…不要………」\`); // :841`,
    tests: ['kojo-k7-heart'],
    must_mention: '@EVENTEND 崩坏',
  },
  {
    desc: 'M2015 K7 @EVENTEND 淫乱体力分档阈值错（BASE:0 >= 500 改 >= 700，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era0(\`talent:\${target}:76\`) == 1 &&
    era0(\`base:\${target}:0\`) >= 500
  ) {
    // 淫乱(体力500以上)`,
    replace: `era0(\`talent:\${target}:76\`) == 1 &&
    era0(\`base:\${target}:0\`) >= 700 // 变异
  ) {
    // 淫乱(体力500以上)`,
    tests: ['kojo-k7-heart'],
    must_mention: '淫乱体力分档',
  },
  {
    desc: 'M2016 K7 助手银黑桃初めて推进值错（CFLAG:202 = 2 改 3，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era.set(\`cflag:\${target}:202\`, 2); // :359`,
    replace: `era.set(\`cflag:\${target}:202\`, 3); // :359（变异）`,
    tests: ['kojo-k7-heart'],
    must_mention: '爱取得済み分档',
  },
  {
    desc: 'M2017 K7 助手白梅花守卫删除（TALENT:ASSI:121 == 0 改恒 false，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `if (era0(\`talent:\${assi}:121\`) == 0) {
      return 0;
    }`,
    replace: `if (false) {  // 变异：白梅花守卫删除
      return 0;
    }`,
    tests: ['kojo-k7-heart'],
    must_mention: '静默跳过',
  },
  {
    desc: 'M2018 K7 助手黑方片 CFLAG:203==2 分支路由旁路失效（FLAG:7 == 2 改 3，#238；此支源本就缺 RETURN 1，1:1 保留见 issue #238 验收）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `} else if (era0(\`cflag:\${target}:203\`) == 2 && era0('flag:7') == 2) {`,
    replace: `} else if (era0(\`cflag:\${target}:203\`) == 2 && era0('flag:7') == 3) {  // 变异`,
    tests: ['kojo-k7-heart'],
    must_mention: '黑方片',
  },
  {
    desc: 'M2019 K7 头部守卫①：ASSI>0&&ASSIPLAY 删除（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `// :909-910 助手调教时跳过
  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }`,
    replace: `// :909-910 助手调教时跳过
  if (false) {  // 变异：助手调教守卫删除
    return 0;
  }`,
    tests: ['kojo-k7-heart'],
    must_mention: '头部第 1 道守卫',
  },
  {
    desc: 'M2020 K7 头部守卫②：TEQUIP:45 口塞守卫删除（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `// :912-913 口塞着用时跳过（SELECTCOM == 45 自己说话不算）
  if (era0(\`tequip:\${target}:45\`) && era_flag.selectcom !== 45) {
    return 0;
  }`,
    replace: `// :912-913 口塞着用时跳过（SELECTCOM == 45 自己说话不算）
  if (false) {  // 变异：口塞守卫删除
    return 0;
  }`,
    tests: ['kojo-k7-heart'],
    must_mention: '头部第 2 道守卫',
  },
  {
    desc: 'M2021 K7 头部守卫③：TFLAG:899 失神删除（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `// :915-916 失神时跳过
  if (era0('tflag:899')) {
    return 0;
  }`,
    replace: `// :915-916 失神时跳过
  if (false) {  // 变异：失神守卫删除
    return 0;
  }`,
    tests: ['kojo-k7-heart'],
    must_mention: '头部第 3 道守卫',
  },
  {
    desc: 'M2022 K7 头部守卫④：TEQUIP:89 不再岔去 DOG_KOJO_7（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `// :918-921 兽奸PLAY中是专用口上——岔去本文件真身
  if (era0(\`tequip:\${target}:89\`)) {
    await dog_kojo_7(rand_n);
    return 0;
  }`,
    replace: `// :918-921 兽奸PLAY中是专用口上——岔去本文件真身
  if (false) {  // 变异：兽奸岔出删除
    await dog_kojo_7(rand_n);
    return 0;
  }`,
    tests: ['kojo-k7-heart'],
    must_mention: 'DOG_KOJO_7',
  },
  {
    desc: 'M2023 K7 头部守卫⑤：TEQUIP:55 不再岔去 COLOSSEUM_KOJO_7（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `// :923-926 死斗场中是专用口上——岔去本文件真身
  if (era0(\`tequip:\${target}:55\`)) {
    await colosseum_kojo_7(rand_n);
    return 0;
  }`,
    replace: `// :923-926 死斗场中是专用口上——岔去本文件真身
  if (false) {  // 变异：死斗场岔出删除
    await colosseum_kojo_7(rand_n);
    return 0;
  }`,
    tests: ['kojo-k7-heart'],
    must_mention: 'COLOSSEUM_KOJO_7',
  },
  {
    desc: 'M2024 K7 头部守卫⑥：TALENT:9 崩坏删除（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `// :928-929 崩坏时跳过
  if (era0(\`talent:\${target}:9\`) == 1) {
    return 0;
  }`,
    replace: `// :928-929 崩坏时跳过
  if (false) {  // 变异：崩坏守卫删除
    return 0;
  }`,
    tests: ['kojo-k7-heart'],
    must_mention: '头部第 6 道守卫',
  },
  {
    desc: 'M2025 K7 头部守卫⑦：TEQUIP:90 触手删除（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `// :931-932 触手调教中跳过
  if (era0(\`tequip:\${target}:90\`)) {
    return 0;
  }`,
    replace: `// :931-932 触手调教中跳过
  if (false) {  // 变异：触手守卫删除
    return 0;
  }`,
    tests: ['kojo-k7-heart'],
    must_mention: '头部第 7 道守卫',
  },
  {
    desc: 'M2026 K7 SELECTCOM==0 爱抚初回推进值错（CFLAG:301 = 1 改 2，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era.set(\`cflag:\${target}:301\`, 1); // :957`,
    replace: `era.set(\`cflag:\${target}:301\`, 2); // :957（变异）`,
    tests: ['kojo-k7-heart'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M2027 K7 SELECTCOM==87 穿环 p==1 判据错格（改 p==9，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `          if (p == 1) {
            await era.printAndWait(
              \`「啊啊…敏感度上升了啊…来吧拉一下试试吧…\${heart(1)}」\`,
            ); // :5994`,
    replace: `          if (p == 9) {  // 变异
            await era.printAndWait(
              \`「啊啊…敏感度上升了啊…来吧拉一下试试吧…\${heart(1)}」\`,
            ); // :5994`,
    tests: ['kojo-k7-heart'],
    must_mention: 'piercing_state',
  },
  {
    desc: 'M2028 K7 COLOSSEUM ITEM:4 回退成 ITEM:PBAND 具名寻址（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `        era0('item:4') == 1
      ) {
        await era.print(\`假阴茎\`); // :8258`,
    replace: `        era0('item:PBAND') == 1 // 变异：回退字符串具名寻址
      ) {
        await era.print(\`假阴茎\`); // :8258`,
    tests: ['kojo-k7-heart'],
    must_mention: '非字符串具名寻址',
  },
  {
    desc: 'M2029 K7 PALAMCNG 首超阈值状态写错（CFLAG:221 = 1 改 2，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era.set(\`cflag:\${target}:221\`, 1); // :7140`,
    replace: `era.set(\`cflag:\${target}:221\`, 2); // :7140（变异）`,
    tests: ['kojo-k7-heart'],
    must_mention: '首次超过',
  },
  {
    desc: 'M2030 K7 MARKCNG 苦痛刻印Lv3判据错格（TFLAG:22 == 3 改 4，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `if (era0('tflag:22') == 3 && era0(\`cflag:\${target}:297\`) == 0) {`,
    replace: `if (era0('tflag:22') == 4 && era0(\`cflag:\${target}:297\`) == 0) {  // 变异`,
    tests: ['kojo-k7-heart'],
    must_mention: '苦痛刻印Lv3',
  },
  {
    desc: 'M2031 K7 SELF_KOJO 跨模块全局 S 阈值错（s >= 3 改 s >= 9，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `if (s >= 3) {`,
    replace: `if (s >= 9) {  // 变异：peek_aftertrain_s 阈值错格`,
    tests: ['kojo-k7-heart'],
    must_mention: 'peek_aftertrain_s',
  },
  {
    desc: 'M2032 K7 DUNGEON_VICTORY 体力过半追加台词阈值错（50 改 5，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `    (era0(\`base:\${a}:0\`) * 100) / era0(\`maxbase:\${a}:0\`) < 50 ||
    (era0(\`base:\${a}:1\`) * 100) / era0(\`maxbase:\${a}:1\`) < 50`,
    replace: `    (era0(\`base:\${a}:0\`) * 100) / era0(\`maxbase:\${a}:0\`) < 5 || // 变异
    (era0(\`base:\${a}:1\`) * 100) / era0(\`maxbase:\${a}:1\`) < 50`,
    tests: ['kojo-k7-heart'],
    must_mention: '体力低于五成',
  },
  {
    desc: 'M2033 K7 DUNGEON_RYOUZYOKU 处女判据错格（TALENT:0 == 1 改 2，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `  if (era0(\`talent:\${target}:0\`) == 1) {
    await era.printAndWait(\`「能夺走我处女的幸运儿会是谁呢？」\`); // :7982`,
    replace: `  if (era0(\`talent:\${target}:0\`) == 2) {  // 变异
    await era.printAndWait(\`「能夺走我处女的幸运儿会是谁呢？」\`); // :7982`,
    tests: ['kojo-k7-heart'],
    must_mention: '迷宫败北与凌辱结束口上',
  },
  {
    desc: 'M2034 K7 GOHOUBI_REQUEST CFLAG:A:504 判据错格（== 0 改 1，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `if (era0(\`cflag:\${cid}:504\`) == 0) {
    await era.printAndWait(\`「说道奖励当然想要钱了」\`); // :8677`,
    replace: `if (era0(\`cflag:\${cid}:504\`) == 1) {  // 变异
    await era.printAndWait(\`「说道奖励当然想要钱了」\`); // :8677`,
    tests: ['kojo-k7-heart'],
    must_mention: '请求金钱',
  },
  {
    desc: 'M2035 K7 GOHOUBI_AFTER choice==0 判据错格（改 choice==9，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `async function gohoubi_after_koujo_k7(cid, choice) {
  if (choice == 0) {`,
    replace: `async function gohoubi_after_koujo_k7(cid, choice) {
  if (choice == 9) {  // 变异`,
    tests: ['kojo-k7-heart'],
    must_mention: 'TFLAG:18 改经 choice',
  },
  {
    desc: 'M2036 K7 OSIOKI choice==6 判据错格（改 choice==16，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `} else if (choice == 6) {
    await era.printAndWait(\`「好臭啊………」\`); // :8843`,
    replace: `} else if (choice == 16) {  // 变异
    await era.printAndWait(\`「好臭啊………」\`); // :8843`,
    tests: ['kojo-k7-heart'],
    must_mention: '好臭啊',
  },
  {
    desc: 'M2037 K7 GOBI arg_0==3 判据错格（改 arg_0==13，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `} else if (arg_0 == 3) {
    await era.print(\`哦……。\`); // :8869`,
    replace: `} else if (arg_0 == 13) {  // 变异
    await era.print(\`哦……。\`); // :8869`,
    tests: ['kojo-k7-heart'],
    must_mention: 'ARG:0 取语尾编号',
  },
  {
    desc: 'M2038 K7 BENKI 门面 game.train.肉便器行动 判据错格（== 0 改 1，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `if (game.train.肉便器行动 == 0) {
    if (era0(\`talent:\${target}:76\`) == 1) {`,
    replace: `if (game.train.肉便器行动 == 1) {  // 变异
    if (era0(\`talent:\${target}:76\`) == 1) {`,
    tests: ['kojo-k7-heart'],
    must_mention: '门面 game.train.肉便器行动',
  },
  {
    desc: 'M2039 K7 ENTERENEMY 爱慕判据错格（TALENT:85 == 1 改 2，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `} else if (era0(\`talent:\${a}:85\`) == 1) {
    await era.printAndWait(
      \`「啊啊…魔王大人。现、现在就去见你了.....\${heart(1)}」\`,
    ); // :8666`,
    replace: `} else if (era0(\`talent:\${a}:85\`) == 2) {  // 变异
    await era.printAndWait(
      \`「啊啊…魔王大人。现、现在就去见你了.....\${heart(1)}」\`,
    ); // :8666`,
    tests: ['kojo-k7-heart'],
    must_mention: '来袭口上按角色素质分岔',
  },
  {
    desc: 'M2040 K7 NTR_KOUJO 首次标记写错（CFLAG:650 = 1 改 2，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era.set(\`cflag:\${target}:650\`, 1); // :8354`,
    replace: `era.set(\`cflag:\${target}:650\`, 2); // :8354（变异）`,
    tests: ['kojo-k7-heart'],
    must_mention: '首次经 CFLAG:650 标记',
  },
  {
    desc: 'M2041 K7 EXUCUTION TFLAG:16 判据错格（== 5 改 6，#238；6 支已有台词，改后仍会输出但文本不同，红在断言精确台词）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `} else if (era0('tflag:16') == 5) {
    await era.printAndWait(\`「下达命令…主人………」\`); // :8546`,
    replace: `} else if (era0('tflag:16') == 6) {  // 变异
    await era.printAndWait(\`「下达命令…主人………」\`); // :8546`,
    tests: ['kojo-k7-heart'],
    must_mention: '注册且可调用',
  },
  {
    desc: 'M2042 K7 BANISHMENT TFLAG:510 判据错格（== 0 改 1，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `if (era0('tflag:510') == 0) {
    await era.printAndWait(\`「回不去了…狂王大人那里…已经回不去了………」\`); // :8596`,
    replace: `if (era0('tflag:510') == 1) {  // 变异
    await era.printAndWait(\`「回不去了…狂王大人那里…已经回不去了………」\`); // :8596`,
    tests: ['kojo-k7-heart'],
    must_mention: '回不去了',
  },
  {
    desc: 'M2043 K7 PUBLIC_EXUCUTION TFLAG:520 判据错格（== 1 改 2，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `} else if (era0('tflag:520') == 1) {
    await era.printAndWait(\`「这里…这个绞刑台是我最后的舞台吗…」\`); // :8624`,
    replace: `} else if (era0('tflag:520') == 2) {  // 变异
    await era.printAndWait(\`「这里…这个绞刑台是我最后的舞台吗…」\`); // :8624`,
    tests: ['kojo-k7-heart'],
    must_mention: '绞刑台',
  },
  {
    desc: 'M2044 K7 GROTESQUE TFLAG:530 判据错格（== 0 改 1，#238；源全空，红在分支路由而非文本）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `async function grotesque_koujo_k7() {
  if (era0('tflag:530') == 0) {
    await era.printAndWait(''); // :8636-8637`,
    replace: `async function grotesque_koujo_k7() {
  if (era0('tflag:530') == 1) {  // 变异
    await era.printAndWait(''); // :8636-8637`,
    tests: ['kojo-k7-heart'],
    must_mention: 'GROTESQUE_KOUJO_K7',
  },
  {
    desc: 'M2045 K7 MUSEUM 蝋人形化死分支「顺手修好」（TFLAG:500 第二个 == 0 改 == 2，1:1 保留原作缺陷的守护条目，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `} else if (era0('tflag:500') == 0) {
    // :8565-8567 源误写 == 0（原意 == 2，蝋人形化），死分支 1:1 保留
    await era.printAndWait(''); // :8566-8567`,
    replace: `} else if (era0('tflag:500') == 2) {  // 变异：顺手修好
    // :8565-8567 源误写 == 0（原意 == 2，蝋人形化），死分支 1:1 保留
    await era.printAndWait(''); // :8566-8567`,
    tests: ['kojo-k7-heart'],
    must_mention: '两支都判不到 2',
  },
  {
    desc: 'M2046 K7 DOG_KOJO_7 空台词「顺手补写」（:6291-6292 填入台词，1:1 保留原作缺陷的守护条目，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `await era.printAndWait(''); // :6291-6292`,
    replace: `await era.printAndWait('（变异：误填补写台词）'); // :6291-6292`,
    tests: ['kojo-k7-heart'],
    must_mention: '全部空文本',
  },
];
