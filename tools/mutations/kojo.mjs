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
  // —— #239（J29）：K8 银黑桃 口上模块（M1813- 号段，按实际交付定，随分段填充继续增补） ——
  {
    desc: 'M1813 K8 兽奸守卫岔路丢失（TEQUIP:89 不再调 DOG_KOJO_8，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: `  if (era0(\`tequip:\${target}:89\`)) {
    await dog_kojo_8(rand); // :903 CALL DOG_KOJO_8
    return 0;
  }`,
    replace: `  if (era0(\`tequip:\${target}:89\`)) {
    return 0;
  }`,
    tests: ['kojo-k8-spade'],
    must_mention: 'DOG_KOJO_8 それ以外档打印一行空文本',
  },
  {
    desc: 'M1814 K8 死斗场守卫岔路丢失（TEQUIP:55 不再调 COLOSSEUM_KOJO_8，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: `  if (era0(\`tequip:\${target}:55\`)) {
    await colosseum_kojo_8(); // :908 CALL COLOSSEUM_KOJO_8
    return 0;
  }`,
    replace: `  if (era0(\`tequip:\${target}:55\`)) {
    return 0;
  }`,
    tests: ['kojo-k8-spade'],
    must_mention: '连站起来的力气都没有了',
  },
  {
    desc: 'M1815 K8 初調教推进写错（CFLAG:201 = 1 改 2，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        kojo.初调教 = 1; // :106 CFLAG:201 = 1',
    replace: '        kojo.初调教 = 2; // :106 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:201 推进到 1',
  },
  {
    desc: 'M1816 K8 K8_KOJO2 反抗刻印Lv3 分档条件写错（MARK:3 == 3 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  } else if (era0(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {\n    era.drawLine(); // :616',
    replace:
      '  } else if (era0(`mark:${target}:3`) == 4 && game.kojo.口上开关 == 2) {\n    era.drawLine(); // :616 变异',
    tests: ['kojo-k8-spade'],
    must_mention: '反抗刻印Lv3',
  },
  {
    desc: 'M1817 K8 SELECTCOM 0 爱撫初回刻印分档删（MARK:2 >= 2 臂丢失，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (era0(`mark:${target}:2`) >= 2) {\n        await era.printAndWait(`「呵呵呵…就像稍微强一点的按摩一样呢」`); // :928',
    replace:
      '      if (era0(`mark:${target}:2`) >= 3) {\n        await era.printAndWait(`「呵呵呵…就像稍微强一点的按摩一样呢」`); // :928 变异',
    tests: ['kojo-k8-spade'],
    must_mention: '屈服刻印Lv2以上分档',
  },
  {
    desc: 'M1818 K8 SELECTCOM 0 爱撫淫乱档推进写错（CFLAG:301 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.爱抚 = 6; // :943 CFLAG:301 = 6',
    replace: '      kojo.爱抚 = 5; // :943 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:301 推进到 6',
  },
  {
    desc: 'M1819 K8 SELECTCOM 1 舔阴初回推进写错（CFLAG:302 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.舔阴 = 1; // :984 CFLAG:302 = 1',
    replace: '      kojo.舔阴 = 0; // :984 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:302 推进到 1',
  },
  {
    desc: 'M1820 K8 SELECTCOM 2 阿纳尔爱撫初回推进写错（CFLAG:303 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.肛门爱抚 = 1; // :1028 CFLAG:TARGET:303 = 1',
    replace: '      kojo.肛门爱抚 = 0; // :1028 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:303 推进到 1',
  },
  {
    desc: 'M1821 K8 SELECTCOM 2 淫乱+润滑Lv2以上推进写错（CFLAG:303 = 7 改 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        kojo.肛门爱抚 = 7; // :1039 CFLAG:303 = 7',
    replace: '        kojo.肛门爱抚 = 6; // :1039 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:303 推进到 7',
  },
  {
    desc: 'M1822 K8 SELECTCOM 3 自慰初回推进写错（CFLAG:304 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.自慰 = 1; // :1080 CFLAG:TARGET:304 = 1',
    replace: '      kojo.自慰 = 0; // :1080 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:304 推进到 1',
  },
  {
    desc: 'M1823 K8 SELECTCOM 5 母乳体质判定丢失（TALENT:130 条件删除，恒真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: `    const milk_body =
      era0(\`talent:\${target}:130\`) == 1 &&
      palam(5) > era0('palamlv:3') &&
      era0(\`tequip:\${target}:16\`) == 0 &&
      era0(\`tequip:\${target}:15\`) == 0; // :1188 母乳体质有效条件`,
    replace: '    const milk_body = true; // 变异：条件删除，恒真',
    tests: ['kojo-k8-spade'],
    must_mention: '非母乳体质',
  },
  {
    desc: 'M1824 K8 SELECTCOM 6 初吻门槛丢失（TFLAG:13 判定删除，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: "    // :1305-1376 接吻 CFLAG:307\n    if (kojo.接吻 == 0 && era0('tflag:13')) {",
    replace:
      '    // :1305-1376 接吻 CFLAG:307\n    if (kojo.接吻 == 0 && true) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1825 K8 SELECTCOM 7 二回目分支寻址被"修正"（源作误写 CFLAG:306 改回 CFLAG:308，破坏 1:1 保真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.胸爱抚 = 2; // :1444 CFLAG:306 = 2',
    replace: '      kojo.自己扒开 = 2; // :1444（变异：误"修正"寻址）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2，复现源作寻址错误',
  },
  {
    desc: 'M1826 K8 SELECTCOM 8 それ以外分支删除（CFLAG:309 <= 1 守卫改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {\n      // :1489-1490 それ以外',
    replace:
      '    } else if (false) {\n      // :1489-1490 それ以外（变异：守卫删除）',
    tests: ['kojo-k8-spade'],
    must_mention: '那里…被这样玩弄的话',
  },
  {
    desc: 'M1827 K8 SELECTCOM 9 舔肛初回推进写错（CFLAG:310 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.舔肛 = 1; // :1513 CFLAG:TARGET:310 = 1',
    replace: '      kojo.舔肛 = 0; // :1513 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:310 推进到 1',
  },
  {
    desc: 'M1828 K8 SELECTCOM 10 淫乱推进写错（CFLAG:311 = 5 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.振动宝石 = 5; // :1569 CFLAG:311 = 5',
    replace: '      kojo.振动宝石 = 4; // :1569 变异',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1829 K8 SELECTCOM 11 壶虫開始時初回推进写错（CFLAG:312 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.壶虫 = 1; // :1624 CFLAG:312 = 1',
    replace: '      kojo.壶虫 = 0; // :1624 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:312 推进到 1',
  },
  {
    desc: 'M1830 K8 SELECTCOM 12 振动杖屈服刻印Lv3分支删除（MARK:2==3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: `    } else if (
      era0(\`mark:\${target}:2\`) == 3 &&
      (kojo.振动杖 <= 2 || game.kojo.口上开关 == 2)
    ) {`,
    replace: '    } else if (false) {\n      // 变异：屈服刻印Lv3 判定删除',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1831 K8 SELECTCOM 13 肛门虫開始時それ以外·A感覚Lv3以上分档判定丢失（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: `        await era.printAndWait(\`\${target_name}因为肛门被蠕虫钻入而发出悲鸣……\`); // :1735
      } else if (era0(\`abl:\${target}:3\`) >= 3) {`,
    replace: `        await era.printAndWait(\`\${target_name}因为肛门被蠕虫钻入而发出悲鸣……\`); // :1735
      } else if (true) {`,
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1832 K8 SELECTCOM 14 阴蒂夹脱着時初回推进写错（CFLAG:375 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.阴蒂夹着脱 = 1; // :1859 CFLAG:375 = 1',
    replace: '      kojo.阴蒂夹着脱 = 0; // :1859 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:375 推进到 1',
  },
  {
    desc: 'M1833 K8 SELECTCOM 16 榨乳器二回目分支寻址被"修正"（源作误写 CFLAG:316 改回 CFLAG:317，破坏 1:1 保真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.榨乳器 = 5; // :1982 CFLAG:317 = 5',
    replace: '      kojo.乳头夹 = 5; // :1982（变异：误"修正"寻址）',
    tests: ['kojo-k8-spade'],
    must_mention: '真正的榨乳器计数',
  },
  {
    desc: 'M1834 K8 SELECTCOM 19 肛珠開始時それ以外·肛门感觉Lv3以上分档判定丢失（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: `      } else if (era0(\`abl:\${target}:3\`) >= 3) {
        // :2091-2093 それ以外·肛门感觉Lv3以上`,
    replace: `      } else if (true) {
        // :2091-2093（变异：肛门感觉Lv3以上判定删除）`,
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1835 K8 SELECTCOM 20 正常位淫乱推进写错（CFLAG:321 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.正常位 = 6; // :2294 CFLAG:321 = 6',
    replace: '      kojo.正常位 = 5; // :2294（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 6',
  },
  {
    desc: 'M1836 K8 SELECTCOM 20 正常位爱慕推进写错（CFLAG:321 = 5 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.正常位 = 5; // :2319 CFLAG:321 = 5',
    replace: '      kojo.正常位 = 4; // :2319（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 5',
  },
  {
    desc: 'M1837 K8 SELECTCOM 20 正常位屈服刻印Lv3分档条件写错（MARK:2==3 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: `      era0(\`mark:\${target}:2\`) == 3 &&
      (kojo.正常位 <= 2 || game.kojo.口上开关 == 2)`,
    replace: `      era0(\`mark:\${target}:2\`) == 4 &&
      (kojo.正常位 <= 2 || game.kojo.口上开关 == 2)`,
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1838 K8 SELECTCOM 20 正常位それ以外守卫丢失（CFLAG:321 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '} else if (kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '} else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1839 K8 SELECTCOM 20 正常位处女+魔族判定丢失（TALENT:314==9 改恒真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: `        if (era0(\`talent:\${target}:314\`) == 9) {
          // :2175-2206 魔族`,
    replace: `        if (true) {
          // :2175-2206（变异：种族判定删除）`,
    tests: ['kojo-k8-spade'],
    must_mention: '处女+人間+それ以外',
  },
  {
    desc: 'M1840 K8 SELECTCOM 21 背后位淫乱推进写错（CFLAG:322 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位 = 6; // :2490 CFLAG:322 = 6',
    replace: '      kojo.背后位 = 5; // :2490（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 6',
  },
  {
    desc: 'M1841 K8 SELECTCOM 21 背后位屈服刻印Lv3推进写错（CFLAG:322 = 3 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位 = 3; // :2550 CFLAG:322 = 3',
    replace: '      kojo.背后位 = 4; // :2550（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1842 K8 SELECTCOM 21 背后位それ以外守卫丢失（CFLAG:322 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位 = 3; // :2550 CFLAG:322 = 3\n    } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {',
    replace:
      '      kojo.背后位 = 3; // :2550 CFLAG:322 = 3\n    } else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1843 K8 SELECTCOM 21 淫乱 RAND1+V感覚Lv3以上分支源作误写双引号被"修正"（破坏 1:1 保真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '`「啊嗯…啊啊…嗯…嗯…那里…继续插进更深的地方…让我发疯吧${heart(1)}」」`,',
    replace:
      '`「啊嗯…啊啊…嗯…嗯…那里…继续插进更深的地方…让我发疯吧${heart(1)}」`,',
    tests: ['kojo-k8-spade'],
    must_mention: '源作误写双引号 1:1 保真',
  },
  {
    desc: 'M1844 K8 SELECTCOM 22 对面座位处女空白引号占位被"补写"（破坏 1:1 保真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        await era.printAndWait(`「」`); // :2569',
    replace:
      '        await era.printAndWait(`「（变异：补写了源作没有的台词）」`); // :2569',
    tests: ['kojo-k8-spade'],
    must_mention: '源作空白引号占位 1:1 保真',
  },
  {
    desc: 'M1845 K8 SELECTCOM 22 对面座位淫乱推进写错（CFLAG:323 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.对面座位 = 6; // :2631 CFLAG:323 = 6',
    replace: '      kojo.对面座位 = 5; // :2631（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 6',
  },
  {
    desc: 'M1846 K8 SELECTCOM 22 对面座位屈服刻印Lv3+V感覚Lv3以上推进写错（CFLAG:323 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.对面座位 = 4; // :2683 CFLAG:323 = 4',
    replace: '      kojo.对面座位 = 3; // :2683（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1847 K8 SELECTCOM 22 对面座位それ以外守卫丢失（CFLAG:323 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '} else if (kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '} else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1848 K8 SELECTCOM 23 TEQUIP:57 镜子加成分支源作误写缺失结尾引号被"修正"（破坏 1:1 保真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '`「啊啊…阴茎全部插进…我的小穴·里来了…全部…啊啊——${heart(1)}`,\n          ); // :2772',
    replace:
      '`「啊啊…阴茎全部插进…我的小穴·里来了…全部…啊啊——${heart(1)}」`,\n          ); // :2772（变异：补写了缺失的收尾引号）',
    tests: ['kojo-k8-spade'],
    must_mention: '镜子加成',
  },
  {
    desc: 'M1849 K8 SELECTCOM 23 背面座位淫乱推进写错（CFLAG:324 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背面座位 = 6; // :2776 CFLAG:324 = 6',
    replace: '      kojo.背面座位 = 5; // :2776（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '镜子加成',
  },
  {
    desc: 'M1850 K8 SELECTCOM 23 背面座位屈服刻印Lv3推进写错（CFLAG:324 = 3 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背面座位 = 3; // :2839 CFLAG:324 = 3',
    replace: '      kojo.背面座位 = 4; // :2839（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1851 K8 SELECTCOM 23 背面座位それ以外守卫丢失（CFLAG:324 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '} else if (kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '} else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1852 K8 SELECTCOM 26 正常位肛交淫乱+A感觉Lv3以上推进写错（CFLAG:327 = 7 改 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.正常位肛交 = 7; // :2907 CFLAG:327 = 7',
    replace: '      kojo.正常位肛交 = 6; // :2907（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 7',
  },
  {
    desc: 'M1853 K8 SELECTCOM 26 正常位肛交淫乱（A感觉Lv3未満）推进写错（CFLAG:327 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.正常位肛交 = 6; // :2913 CFLAG:327 = 6',
    replace: '      kojo.正常位肛交 = 5; // :2913（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 6',
  },
  {
    desc: 'M1854 K8 SELECTCOM 26 正常位肛交 A感觉Lv3以上（无好感）守卫丢失（ABL:3>=3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      era0(`abl:${target}:3`) >= 3 &&\n      (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)',
    replace:
      '      false &&\n      (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1855 K8 SELECTCOM 26 正常位肛交それ以外守卫丢失（CFLAG:327 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '} else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '} else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1856 K8 SELECTCOM 27 背后位アナル爱慕守卫丢失（CFLAG:328 <= 3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位肛交 = 5; // :3034 CFLAG:328 = 5\n    } else if (\n      era0(`talent:${target}:85`) == 1 &&\n      (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)',
    replace:
      '      kojo.背后位肛交 = 5; // :3034 CFLAG:328 = 5\n    } else if (\n      false &&\n      (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1857 K8 SELECTCOM 27 背后位アナル淫乱推进写错（CFLAG:328 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位肛交 = 6; // :3020 CFLAG:328 = 6',
    replace: '      kojo.背后位肛交 = 5; // :3020（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 6',
  },
  {
    desc: 'M1858 K8 SELECTCOM 27 背后位アナル爱慕推进写错（CFLAG:328 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位肛交 = 4; // :3041 CFLAG:328 = 4',
    replace: '      kojo.背后位肛交 = 3; // :3041（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1859 K8 SELECTCOM 27 背后位アナルそれ以外守卫丢失（CFLAG:328 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位肛交 = 3; // :3048 CFLAG:328 = 3\n    } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {',
    replace:
      '      kojo.背后位肛交 = 3; // :3048 CFLAG:328 = 3\n    } else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1860 K8 SELECTCOM 28 对面座位アナル初めて推进写错（CFLAG:329 = 1 改 0，恒不推进，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.对面座位肛交 = 1; // :3107 CFLAG:TARGET:329 = 1',
    replace: '      kojo.对面座位肛交 = 0; // :3107（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1861 K8 SELECTCOM 28 对面座位アナル淫乱+A感觉Lv3以上分档丢失（TALENT:76==1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      era0(`talent:${target}:76`) == 1 &&\n      era0(`abl:${target}:3`) >= 3 &&\n      (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)',
    replace:
      '      false &&\n      era0(`abl:${target}:3`) >= 3 &&\n      (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 7',
  },
  {
    desc: 'M1862 K8 SELECTCOM 28 对面座位アナル A感觉Lv3以上（无好感）推进写错（CFLAG:329 = 3 改 2，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.对面座位肛交 = 3; // :3162 CFLAG:329 = 3',
    replace: '      kojo.对面座位肛交 = 2; // :3162（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1863 K8 SELECTCOM 28 对面座位アナルそれ以外守卫丢失（CFLAG:329 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '} else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '} else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1864 K8 SELECTCOM 29 背面座位肛交二回目羞耻PLAY 档1 源作误写缺失结尾引号被"修正"（破坏 1:1 保真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        `「啊啊…我的肛门能把你的全部放进来…我是多么幸福的人啊………${heart(1)}`,\n      ); // :3298',
    replace:
      '        `「啊啊…我的肛门能把你的全部放进来…我是多么幸福的人啊………${heart(1)}」`,\n      ); // :3298（变异："修正"缺失引号）',
    tests: ['kojo-k8-spade'],
    must_mention: '源作误写缺失结尾引号 1:1 保真',
  },
  {
    desc: 'M1865 K8 SELECTCOM 29 背面座位肛交それ以外守卫丢失（CFLAG:330 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '} else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '} else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1866 K8 SELECTCOM 29 背面座位肛交爱慕推进写错（CFLAG:330 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背面座位肛交 = 4; // :3279 CFLAG:330 = 4',
    replace: '      kojo.背面座位肛交 = 3; // :3279（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '缺失结尾引号 1:1 保真',
  },
  {
    desc: 'M1867 K8 SELECTCOM 29 背面座位肛交爱+A感觉Lv3以上分档丢失（TALENT:85==1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      era0(`talent:${target}:85`) == 1 &&\n      era0(`abl:${target}:3`) >= 3 &&\n      (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)',
    replace:
      '      false &&\n      era0(`abl:${target}:3`) >= 3 &&\n      (kojo.背面座位肛交 <= 4 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 5',
  },
  {
    desc: 'M1868 K8 SELECTCOM 30 手淫初めて分档丢失（ABL:16>=3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      } else if (era0(`abl:${target}:16`) >= 3) {\n        // 侍奉精神Lv3以上\n        await era.printAndWait(`「我不做这种事不行么…真没办法…呵呵呵」`); // :3329',
    replace:
      '      } else if (false) {\n        // 侍奉精神Lv3以上（变异：判定删除）\n        await era.printAndWait(`「我不做这种事不行么…真没办法…呵呵呵」`); // :3329',
    tests: ['kojo-k8-spade'],
    must_mention: '侍奉精神Lv3以上（无 TALENT）',
  },
  {
    desc: 'M1869 K8 SELECTCOM 30 手淫淫乱+侍奉精神Lv3以上推进写错（CFLAG:331 = 7 改 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.手淫 = 7; // :3351 CFLAG:331 = 7',
    replace: '      kojo.手淫 = 6; // :3351（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 7',
  },
  {
    desc: 'M1870 K8 SELECTCOM 30 手淫爱+侍奉精神Lv5 门槛写错（ABL:16>=5 改 >=3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.手淫 = 6; // :3356 CFLAG:331 = 6\n    } else if (\n      era0(`talent:${target}:85`) == 1 &&\n      era0(`abl:${target}:16`) >= 5 &&\n      (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)',
    replace:
      '      kojo.手淫 = 6; // :3356 CFLAG:331 = 6\n    } else if (\n      era0(`talent:${target}:85`) == 1 &&\n      era0(`abl:${target}:16`) >= 3 &&\n      (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 5',
  },
  {
    desc: 'M1871 K8 SELECTCOM 30 手淫源作死区被"修正"（CFLAG:331 <= 3 改 <= 4，破坏 1:1 保真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.手淫 = 5; // :3368 CFLAG:331 = 5\n    } else if (\n      era0(`talent:${target}:85`) == 1 &&\n      era0(`abl:${target}:16`) >= 3 &&\n      (kojo.手淫 <= 3 || game.kojo.口上开关 == 2)',
    replace:
      '      kojo.手淫 = 5; // :3368 CFLAG:331 = 5\n    } else if (\n      era0(`talent:${target}:85`) == 1 &&\n      era0(`abl:${target}:16`) >= 3 &&\n      (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '源作死区',
  },
  {
    desc: 'M1872 K8 SELECTCOM 31 口交淫乱推进写错（CFLAG:332 = 5 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.口交_奴 = 5; // :3437 CFLAG:332 = 5',
    replace: '      kojo.口交_奴 = 4; // :3437（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 5',
  },
  {
    desc: 'M1873 K8 SELECTCOM 31 口交爱慕守卫丢失（CFLAG:332 <= 3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      era0(`talent:${target}:85`) == 1 &&\n      (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)',
    replace:
      '      false &&\n      (kojo.口交_奴 <= 3 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1874 K8 SELECTCOM 31 口交侍奉精神Lv3以上推进写错（CFLAG:332 = 3 改 2，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.口交_奴 = 3; // :3459 CFLAG:332 = 3',
    replace: '      kojo.口交_奴 = 2; // :3459（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1875 K8 SELECTCOM 31 口交それ以外守卫丢失（CFLAG:332 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.口交_奴 = 3; // :3459 CFLAG:332 = 3\n    } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {',
    replace:
      '      kojo.口交_奴 = 3; // :3459 CFLAG:332 = 3\n    } else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1876 K8 SELECTCOM 32 乳交弄乳狂+淫乱推进写错（CFLAG:333 = 8 改 7，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.乳交 = 8; // :3513 CFLAG:333 = 8',
    replace: '      kojo.乳交 = 7; // :3513（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 8',
  },
  {
    desc: 'M1877 K8 SELECTCOM 32 乳交弄乳狂单独推进写错（CFLAG:333 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.乳交 = 4; // :3547 CFLAG:333 = 4',
    replace: '      kojo.乳交 = 3; // :3547（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1878 K8 SELECTCOM 32 乳交初めて分档丢失（TALENT:78==1 改 false，恒不命中弄乳狂，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (era0(`talent:${target}:78`) == 1) {\n        // 弄乳狂\n        await era.printAndWait(`「啊…用我的好色的胸部让你的阴茎更舒服吧…♪」`); // :3478',
    replace:
      '      if (false) {\n        // 弄乳狂（变异：判定删除）\n        await era.printAndWait(`「啊…用我的好色的胸部让你的阴茎更舒服吧…♪」`); // :3478',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1879 K8 SELECTCOM 33 股间性交淫乱+处女推进写错（CFLAG:334 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.股间性交 = 6; // :3593 CFLAG:334 = 6',
    replace: '      kojo.股间性交 = 5; // :3593（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 6',
  },
  {
    desc: 'M1880 K8 SELECTCOM 33 股间性交爱有り（无处女）守卫丢失（CFLAG:334 <= 2 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      era0(`talent:${target}:85`) == 1 &&\n      (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)',
    replace:
      '      false &&\n      (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1881 K8 SELECTCOM 33 股间性交それ以外守卫丢失（CFLAG:334 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '} else if (kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '} else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1882 K8 SELECTCOM 34 骑乘位初めて处女分档丢失（TALENT:314==9 改 false，恒不命中魔族分支，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        if (era0(`talent:${target}:314`) == 9) {\n          // :3639-3677 魔族',
    replace:
      '        if (false) {\n          // :3639-3677 魔族（变异：判定删除）',
    tests: ['kojo-k8-spade'],
    must_mention: '张开了双翼',
  },
  {
    desc: 'M1883 K8 SELECTCOM 34 骑乘位淫乱+V感觉Lv3以上推进写错（CFLAG:335 = 8 改 7，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.骑乘位 = 8; // :3767 CFLAG:335 = 8',
    replace: '      kojo.骑乘位 = 7; // :3767（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 8',
  },
  {
    desc: 'M1884 K8 SELECTCOM 34 骑乘位屈服刻印Lv3+V感觉Lv3以上守卫丢失（ABL:2>=3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.骑乘位 = 5; // :3806 CFLAG:335 = 5\n    } else if (\n      era0(`mark:${target}:2`) == 3 &&\n      era0(`abl:${target}:2`) >= 3 &&\n      (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)',
    replace:
      '      kojo.骑乘位 = 5; // :3806 CFLAG:335 = 5\n    } else if (\n      era0(`mark:${target}:2`) == 3 &&\n      false &&\n      (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1885 K8 SELECTCOM 34 骑乘位屈服刻印Lv3推进写错（CFLAG:335 = 3 改 2，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.骑乘位 = 3; // :3832 CFLAG:335 = 3',
    replace: '      kojo.骑乘位 = 2; // :3832（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1886 K8 SELECTCOM 35 全身擦洗初めて分档丢失（ABL:16>=3 改 false，恒不命中侍奉精神分支，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (era0(`abl:${target}:16`) >= 3) {\n        // 侍奉精神Lv3以上\n        await era.printAndWait(`「来，伸出手…这样帮你洗就行了吧？」`); // :3853',
    replace:
      '      if (false) {\n        // 侍奉精神Lv3以上（变异：判定删除）\n        await era.printAndWait(`「来，伸出手…这样帮你洗就行了吧？」`); // :3853',
    tests: ['kojo-k8-spade'],
    must_mention: '把身体洗干净是很舒服',
  },
  {
    desc: 'M1887 K8 SELECTCOM 35 全身擦洗淫乱＋侍奉精神Lv5推进写错（CFLAG:336 = 5 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.全身擦洗 = 5; // :3872 CFLAG:336 = 5',
    replace: '      kojo.全身擦洗 = 4; // :3872（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 5',
  },
  {
    desc: 'M1888 K8 SELECTCOM 35 全身擦洗爱＋侍奉精神Lv5分档丢失（TALENT:85==1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      era0(`talent:${target}:85`) == 1 &&\n      era0(`abl:${target}:16`) >= 5 &&\n      (kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)',
    replace:
      '      false &&\n      era0(`abl:${target}:16`) >= 5 &&\n      (kojo.全身擦洗 <= 3 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1889 K8 SELECTCOM 35 全身擦洗侍奉精神Lv3以上 SIF 独立分支丢失（RAND:3 == 0 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (rand_n(3) == 0) {\n        await era.printAndWait(`「总觉得想起了帮弟弟洗澡的时候………」`); // :3887\n      }',
    replace:
      '      if (false) {\n        // 变异：SIF 独立分支判定删除\n        await era.printAndWait(`「总觉得想起了帮弟弟洗澡的时候………」`); // :3887\n      }',
    tests: ['kojo-k8-spade'],
    must_mention: '总觉得想起了帮弟弟洗澡的时候',
  },
  {
    desc: 'M1890 K8 SELECTCOM 36 骑乘位肛交初めて淫乱分档丢失（TALENT:76==1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (era0(`talent:${target}:76`) == 1) {\n        // 淫乱\n        if (era0(`abl:${target}:3`) >= 3) {\n          await era.printAndWait(\n            `「嗯…嗯啊…啊啊…你的全部进来了…啊啊${heart(1)}」`,\n          ); // :3908',
    replace:
      '      if (false) {\n        // 淫乱（变异：判定删除）\n        if (era0(`abl:${target}:3`) >= 3) {\n          await era.printAndWait(\n            `「嗯…嗯啊…啊啊…你的全部进来了…啊啊${heart(1)}」`,\n          ); // :3908',
    tests: ['kojo-k8-spade'],
    must_mention: '你的全部进来了',
  },
  {
    desc: 'M1891 K8 SELECTCOM 36 骑乘位肛交淫乱+A感觉Lv3以上推进写错（CFLAG:337 = 7 改 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.骑乘位肛交 = 7; // :3967 CFLAG:337 = 7',
    replace: '      kojo.骑乘位肛交 = 6; // :3967（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 7',
  },
  {
    desc: 'M1892 K8 SELECTCOM 36 骑乘位肛交爱+A感觉Lv3以上分档丢失（TALENT:85==1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      era0(`talent:${target}:85`) == 1 &&\n      era0(`abl:${target}:3`) >= 3 &&\n      (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)',
    replace:
      '      false &&\n      era0(`abl:${target}:3`) >= 3 &&\n      (kojo.骑乘位肛交 <= 4 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 5',
  },
  {
    desc: 'M1893 K8 SELECTCOM 36 骑乘位肛交 A感觉Lv3以上守卫丢失（ABL:3>=3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    } else if (\n      era0(`abl:${target}:3`) >= 3 &&\n      (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)\n    ) {\n      // :4003-4006 A感觉Lv3以上',
    replace:
      '    } else if (\n      false &&\n      (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)\n    ) {\n      // :4003-4006 A感觉Lv3以上（变异：判定删除）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1894 K8 SELECTCOM 37 肛门侍奉初めて分档丢失（ABL:16>=3 改 false，恒不命中侍奉精神分支，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (era0(`abl:${target}:16`) >= 3) {\n        // 侍奉精神Lv3以上\n        await era.printAndWait(\n          `「你都是让别人帮你把那里舔干净吧…啊啊、我明白…真没办法」`,\n        ); // :4028',
    replace:
      '      if (false) {\n        // 侍奉精神Lv3以上（变异：判定删除）\n        await era.printAndWait(\n          `「你都是让别人帮你把那里舔干净吧…啊啊、我明白…真没办法」`,\n        ); // :4028',
    tests: ['kojo-k8-spade'],
    must_mention: '这么干怎么说都有点',
  },
  {
    desc: 'M1895 K8 SELECTCOM 37 肛门侍奉淫乱＋侍奉精神Lv5推进写错（CFLAG:338 = 5 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.肛门侍奉 = 5; // :4046 CFLAG:338 = 5',
    replace: '      kojo.肛门侍奉 = 4; // :4046（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 5',
  },
  {
    desc: 'M1896 K8 SELECTCOM 37 肛门侍奉爱＋侍奉精神Lv5分档丢失（TALENT:85==1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.肛门侍奉 = 5; // :4046 CFLAG:338 = 5\n    } else if (\n      era0(`talent:${target}:85`) == 1 &&\n      era0(`abl:${target}:16`) >= 5 &&\n      (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)',
    replace:
      '      kojo.肛门侍奉 = 5; // :4046 CFLAG:338 = 5\n    } else if (\n      false &&\n      era0(`abl:${target}:16`) >= 5 &&\n      (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1897 K8 SELECTCOM 37 肛门侍奉侍奉精神Lv3以上守卫丢失（ABL:16>=3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    } else if (\n      era0(`abl:${target}:16`) >= 3 &&\n      (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)\n    ) {\n      // :4056-4058 侍奉精神Lv3以上',
    replace:
      '    } else if (\n      false &&\n      (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)\n    ) {\n      // :4056-4058 侍奉精神Lv3以上（变异：判定删除）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1898 K8 SELECTCOM 40 打屁股淫乱＋受虐狂っ気Lv3推进写错（CFLAG:341 = 5 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.打屁股 = 5; // :4088 CFLAG:TARGET:341 = 5',
    replace: '      kojo.打屁股 = 4; // :4088（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 5',
  },
  {
    desc: 'M1899 K8 SELECTCOM 40 打屁股苦痛刻印Lv3+屈服刻印Lv3守卫丢失（MARK:0==3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      era0(`mark:${target}:0`) == 3 &&\n      era0(`mark:${target}:2`) == 3 &&\n      (kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)',
    replace:
      '      false &&\n      era0(`mark:${target}:2`) == 3 &&\n      (kojo.打屁股 <= 2 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1900 K8 SELECTCOM 41 鞭淫乱＋受虐狂っ気Lv5以上推进写错（CFLAG:342 = 9 改 8，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.鞭 = 9; // :4128 CFLAG:TARGET:342 = 9',
    replace: '      kojo.鞭 = 8; // :4128（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 9',
  },
  {
    desc: 'M1901 K8 SELECTCOM 41 鞭受虐狂っ気Lv3以上守卫丢失（ABL:21>=3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    } else if (\n      era0(`abl:${target}:21`) >= 3 &&\n      (kojo.鞭 <= 2 || game.kojo.口上开关 == 2)\n    ) {',
    replace:
      '    } else if (\n      false &&\n      (kojo.鞭 <= 2 || game.kojo.口上开关 == 2)\n    ) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1902 K8 SELECTCOM 42 针それ以外推进写错（CFLAG:343 = 2 改 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.针 = 2; // :4223 CFLAG:TARGET:343 = 2',
    replace: '      kojo.针 = 1; // :4223（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1903 K8 SELECTCOM 43 眼罩開始時淫乱＋受虐狂っ気Lv5以上推进写错（CFLAG:344 = 9 改 8，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.眼罩 = 9; // :4245 CFLAG:TARGET:344 = 9',
    replace: '      kojo.眼罩 = 8; // :4245（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 9',
  },
  {
    desc: 'M1904 K8 SELECTCOM 43 眼罩終了時淫乱推进写错（CFLAG:380 = 3 改 2，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.眼罩着脱 = 3; // :4282 CFLAG:380 = 3',
    replace: '      kojo.眼罩着脱 = 2; // :4282（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1905 K8 SELECTCOM 44 绳子開始時それ以外推进写错（CFLAG:345 = 2 改 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.绳子 = 2; // :4345 CFLAG:TARGET:345 = 2',
    replace: '      kojo.绳子 = 1; // :4345（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1906 K8 SELECTCOM 45 口塞開始時 TEQUIP:43 分岔丢失（首档恒不进已戴分支，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      await era.print(`${target_name}自己戴上了口枷`); // :4383\n      if (era0(`tequip:${target}:43`)) {\n        await era.printAndWait(`嘴的缝隙里，漏出了灼热的吐息………`); // :4385',
    replace:
      '      await era.print(`${target_name}自己戴上了口枷`); // :4383\n      if (false) {\n        await era.printAndWait(`嘴的缝隙里，漏出了灼热的吐息………`); // :4385',
    tests: ['kojo-k8-spade'],
    must_mention: '嘴的缝隙里',
  },
  {
    desc: 'M1907 K8 SELECTCOM 45 口塞終了時爱慕分档丢失（TALENT:85==1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    } else if (\n      era0(`talent:${target}:85`) == 1 &&\n      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)\n    ) {\n      // :4467-4468 爱慕',
    replace:
      '    } else if (\n      false &&\n      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)\n    ) {\n      // :4467-4468 爱慕（变异：判定删除）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1908 K8 SELECTCOM 46 灌肠肛塞淫乱＋A感觉Lv3以上＋受虐狂っ気Lv3以上推进写错（CFLAG:347 = 7 改 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.灌肠肛塞 = 7; // :4498 CFLAG:347 = 7',
    replace: '      kojo.灌肠肛塞 = 6; // :4498（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 7',
  },
  {
    desc: 'M1909 K8 SELECTCOM 46 灌肠肛塞 A感觉Lv3以上＋受虐狂っ気Lv3以上守卫丢失（ABL:3>=3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    } else if (\n      era0(`abl:${target}:3`) >= 3 &&\n      era0(`abl:${target}:21`) >= 3 &&\n      (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)\n    ) {',
    replace:
      '    } else if (\n      false &&\n      era0(`abl:${target}:21`) >= 3 &&\n      (kojo.灌肠肛塞 <= 2 || game.kojo.口上开关 == 2)\n    ) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1910 K8 SELECTCOM 55 放置PLAY 二回目以降·淫乱＋欲情Lv3以上推进写错（CFLAG:356 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.放置PLAY = 6; // :4559 CFLAG:356 = 6',
    replace: '      kojo.放置PLAY = 5; // :4559（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 6',
  },
  {
    desc: 'M1911 K8 SELECTCOM 56 交谈 初めて·视频自我介绍·TALENT:89 档 TFLAG:32 写入位丢失（|= 2 改 |= 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '          game.kojo.录像内容 |= 2; // :4638 TFLAG:32 |= 2',
    replace: '          game.kojo.录像内容 |= 0; // :4638（变异：写入位丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '写入位 2',
  },
  {
    desc: 'M1912 K8 SELECTCOM 69 六九式 二回目以降·爱慕推进写错（CFLAG:364 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.六九式 = 4; // :5076 CFLAG:364 = 4',
    replace: '      kojo.六九式 = 3; // :5076（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1913 K8 SELECTCOM 80 强制口交 二回目以降·爱＋侍奉精神Lv5 推进写错（CFLAG:381 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.强制口交 = 4; // :5130 CFLAG:381 = 4',
    replace: '      kojo.强制口交 = 3; // :5130（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1914 K8 SELECTCOM 123 乳夹口交 二回目以降·弄乳狂＋淫乱推进写错（CFLAG:360 = 8 改 7，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.乳夹口交 = 8; // :4757 CFLAG:360 = 8',
    replace: '      kojo.乳夹口交 = 7; // :4757（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 8',
  },
  {
    desc: 'M1915 K8 SELECTCOM 125 口交时自慰 二回目以降·それ以外推进写错（CFLAG:361 = 2 改 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.口交时自慰 = 2; // :4860 CFLAG:361 = 2',
    replace: '      kojo.口交时自慰 = 1; // :4860（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1916 K8 SELECTCOM 126 手搓口交 二回目以降·侍奉精神Lv3以上推进写错（CFLAG:362 = 3 改 2，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.手搓口交 = 3; // :4908 CFLAG:362 = 3',
    replace: '      kojo.手搓口交 = 2; // :4908（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1917 K8 SELECTCOM 127 真空口交 二回目以降·爱慕推进写错（CFLAG:363 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.真空口交 = 4; // :4958 CFLAG:363 = 4',
    replace: '      kojo.真空口交 = 3; // :4958（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1918 K8 SELECTCOM 124 深喉 初めて·爱慕推进写错（CFLAG:365 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.深喉 = 1; // :4999 CFLAG:TARGET:365 = 1',
    replace: '      kojo.深喉 = 0; // :4999（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1919 K8 SELECTCOM 87 穿环 二回目以降·淫乱·P=64（鼻穴）推进写错（CFLAG:348 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.穿环 = 4; // :5344 CFLAG:348 = 4',
    replace: '      kojo.穿环 = 3; // :5344（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1920 K8 DOG_KOJO_8 SC0 爱撫 二回目·牝犬推进写错（CFLAG:301 = 7 改 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.爱抚 = 7; // :5467',
    replace: '      kojo.爱抚 = 6; // :5467（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 7',
  },
  {
    desc: 'M1921 K8 DOG_KOJO_8 SC21 背后位 初めて推进写错（CFLAG:322 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位 = 1; // :5729',
    replace: '      kojo.背后位 = 0; // :5729（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1922 K8 DOG_KOJO_8 SC21 背后位 二回目·牝犬推进写错（CFLAG:322 = 7 改 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位 = 7; // :5742',
    replace: '      kojo.背后位 = 6; // :5742（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 7',
  },
  {
    desc: 'M1923 K8 DOG_KOJO_8 SC31 口交 二回目·爱＋侍奉精神Lv5推进写错（CFLAG:332 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.口交_奴 = 4; // :5948',
    replace: '      kojo.口交_奴 = 3; // :5948（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1924 K8 DOG_KOJO_8 SC43 眼罩 開始時·初めて推进写错（CFLAG:344 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.眼罩 = 1; // :6126',
    replace: '      kojo.眼罩 = 0; // :6126（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1925 K8 DOG_KOJO_8 SC43 眼罩 終了時·牝犬档守卫"被修正"为读 CFLAG:444（破坏源作 CFLAG:338 误读 bug 的 1:1 保真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      era0(`talent:${target}:136`) == 1 &&\n      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)\n    ) {\n      // :6172-6174 牝犬',
    replace:
      '      era0(`talent:${target}:136`) == 1 &&\n      (kojo.兽奸眼罩 < 3 || game.kojo.口上开关 == 2)\n    ) {\n      // :6172-6174 牝犬',
    tests: ['kojo-k8-spade'],
    must_mention: '而非牝犬档应有的 4',
  },
  {
    desc: 'M1926 K8 DOG_KOJO_8 SC43 眼罩 終了時·それ以外推进写错（CFLAG:444 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.兽奸眼罩 = 1; // :6186',
    replace: '      kojo.兽奸眼罩 = 0; // :6186（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '而非牝犬档应有的 4',
  },
  {
    desc: 'M1927 K8 DOG_KOJO_8 SC56 会話 初めて·有摄像推进写错（CFLAG:357 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.交谈 = 1; // :6214',
    replace: '      kojo.交谈 = 0; // :6214（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1928 K8 COLOSSEUM_KOJO_8 SC55 放置PLAY 条件反转（BASE:1 <= 0 改 > 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`base:${target}:1`) <= 0) {\n      await era.printAndWait(`${target_name}连站起来的力气都没有了……`); // :7311 气力０以下',
    replace:
      '    if (era0(`base:${target}:1`) > 0) {\n      await era.printAndWait(`${target_name}连站起来的力气都没有了……`); // :7311（变异：条件反转）',
    tests: ['kojo-k8-spade'],
    must_mention: '连站起来的力气都没有了',
  },
  {
    desc: 'M1929 K8 COLOSSEUM_KOJO_8 SC56 交谈 外层条件反转（BASE:1 <= 0 改 > 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`base:${target}:1`) <= 0) {\n      // :7322-7330 气力０以下',
    replace:
      '    if (era0(`base:${target}:1`) > 0) {\n      // :7322-7330（变异：条件反转）',
    tests: ['kojo-k8-spade'],
    must_mention: '咕…输给你了',
  },
  {
    desc: 'M1930 K8 COLOSSEUM_KOJO_8 SC31 口交 阴茎判定失效（TALENT:121/122 改 == 9，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1) {\n        await era.print(`阴茎`); // :7353',
    replace:
      '      if (era0(`talent:${assi}:121`) == 9 || era0(`talent:${assi}:122`) == 9) {\n        await era.print(`阴茎`); // :7353（变异）',
    tests: ['kojo-k8-spade'],
    must_mention: '阴茎',
  },
  {
    desc: 'M1931 K8 COLOSSEUM_KOJO_8 SC5 胸爱撫 助手守卫失效（ASSI/ASSIPLAY 改 assi > 999，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era_flag.assi > 0 && era_flag.assiplay) {\n      await era.printAndWait(\n        `「嗯啊…啊啊拜托你了…因为我是后辈温柔点吧…啊…嗯嗯！」`,\n      ); // :7369',
    replace:
      '    if (era_flag.assi > 999) {\n      await era.printAndWait(\n        `「嗯啊…啊啊拜托你了…因为我是后辈温柔点吧…啊…嗯嗯！」`,\n      ); // :7369（变异）',
    tests: ['kojo-k8-spade'],
    must_mention: '因为我是后辈温柔点吧',
  },
  {
    desc: 'M1932 K8 COLOSSEUM_KOJO_8 SC21 背后位 巨魔判定失效（TFLAG:400 == 206 改 == 999，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    } else if (game.train.死斗场敌种 == 206) {\n      // :7394-7397 巨魔',
    replace:
      '    } else if (game.train.死斗场敌种 == 999) {\n      // :7394-7397（变异：巨魔判定失效）',
    tests: ['kojo-k8-spade'],
    must_mention: '要、要坏掉了',
  },
  {
    desc: 'M1933 K8 COLOSSEUM_KOJO_8 SC27 背后位アナル 助手守卫失效（ASSI/ASSIPLAY 改 assi > 999，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era_flag.assi > 0 && era_flag.assiplay) {\n      await era.printAndWait(\n        `「求、求你…啊咕…饶了我吧…啊啊…嗯…牙啊啊啊啊啊！」`,\n      ); // :7412',
    replace:
      '    if (era_flag.assi > 999) {\n      await era.printAndWait(\n        `「求、求你…啊咕…饶了我吧…啊啊…嗯…牙啊啊啊啊啊！」`,\n      ); // :7412（变异）',
    tests: ['kojo-k8-spade'],
    must_mention: '求、求你',
  },
  {
    desc: 'M1934 K8 COLOSSEUM_KOJO_8 SC51 媚药史莱姆 台词内容篡改（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    await era.printAndWait(`「啊啊…史莱姆么…嗯…连这种地方都进来了…啊啊！」`); // :7438',
    replace:
      '    await era.printAndWait(`「啊啊…史莱姆…」`); // :7438（变异：台词内容篡改）',
    tests: ['kojo-k8-spade'],
    must_mention: '连这种地方都进来了',
  },
  {
    desc: 'M1935 K8 PALAMCNG_8 头部守卫 TEQUIP:45（口塞）短路失效（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  if (era_flag.assi > 0 && era_flag.assiplay) {\n    return 0;\n  }\n\n  if (era0(`tequip:${target}:45`)) {\n    return 0;\n  }\n\n  if (game.train.失神) {',
    replace:
      '  if (era_flag.assi > 0 && era_flag.assiplay) {\n    return 0;\n  }\n\n  if (era0(`tequip:${target}:45`) && false) {\n    return 0;\n  }\n\n  if (game.train.失神) {',
    tests: ['kojo-k8-spade'],
    must_mention: '弄湿了什么的',
  },
  {
    desc: 'M1936 K8 PALAMCNG_8 首次润滑Lv2 推进写错（CFLAG:221 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.首次润滑Lv2 = 1; // :6303 CFLAG:TARGET:221 = 1',
    replace: '    kojo.首次润滑Lv2 = 0; // :6303（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '首次润滑Lv2',
  },
  {
    desc: 'M1937 K8 PALAMCNG_8 首次欲情Lv2 推进写错（CFLAG:222 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.首次欲情Lv2 = 1; // :6334 CFLAG:222 = 1',
    replace: '    kojo.首次欲情Lv2 = 0; // :6334（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '首次欲情Lv2',
  },
  {
    desc: 'M1938 K8 PALAMCNG_8 首次耻情Lv2 推进写错（CFLAG:223 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.首次耻情Lv2 = 1; // :6351 CFLAG:223 = 1',
    replace: '    kojo.首次耻情Lv2 = 0; // :6351（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '首次耻情Lv2',
  },
  {
    desc: 'M1939 K8 PALAMCNG_8 首次恐怖Lv2 推进写错（CFLAG:224 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.首次恐怖Lv2 = 1; // :6368 CFLAG:224 = 1',
    replace: '    kojo.首次恐怖Lv2 = 0; // :6368（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '首次恐怖Lv2',
  },
  {
    desc: 'M1940 K8 PALAMCNG_8 首次C绝顶 推进写错（CFLAG:225 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.首次C绝顶 = 1; // :6391 CFLAG:225 = 1',
    replace: '    kojo.首次C绝顶 = 0; // :6391（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '首次C绝顶',
  },
  {
    desc: 'M1941 K8 PALAMCNG_8 首次V绝顶 推进写错（CFLAG:226 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.首次V绝顶 = 1; // :6416 CFLAG:TARGET:226 = 1',
    replace: '    kojo.首次V绝顶 = 0; // :6416（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '首次V绝顶',
  },
  {
    desc: 'M1942 K8 PALAMCNG_8 私处绝顶二回目 插着不拔判定失效（TFLAG:60 改 == 9，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`talent:${target}:76`) == 1 && game.event.插着不拔 == 1) {',
    replace:
      '    if (era0(`talent:${target}:76`) == 1 && game.event.插着不拔 == 9) {',
    tests: ['kojo-k8-spade'],
    must_mention: '不想去了',
  },
  {
    desc: 'M1943 K8 PALAMCNG_8 肛门绝顶二回目 それ以外 台词内容篡改（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      // :6476-6477 それ以外\n      await era.printAndWait(\n        `「不行…再继续的话…我…我的…肛门要…变得奇怪了…啊啊——！」`,\n      ); // :6478',
    replace:
      '      // :6476-6477（变异：台词内容篡改）\n      await era.printAndWait(`「篡改」`); // :6478',
    tests: ['kojo-k8-spade'],
    must_mention: '肛门要',
  },
  {
    desc: 'M1944 K8 PALAMCNG_8 乳房绝顶二回目 RAND 分档失效（rand_n(3) == 0 改 == 9，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      ); // :6509\n      if (rand_n(3) == 0) {',
    replace: '      ); // :6509\n      if (rand_n(3) == 9) {',
    tests: ['kojo-k8-spade'],
    must_mention: '胸部要融化了',
  },
  {
    desc: 'M1945 K8 PALAMCNG_8 处女丧失 推进写错（CFLAG:229 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.处女丧失 = 1; // :6560 CFLAG:TARGET:229 = 1',
    replace: '    kojo.处女丧失 = 0; // :6560（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '处女丧失',
  },
  {
    desc: 'M1946 K8 PALAMCNG_8 处女丧失 主人以外·それ以外 台词内容篡改（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        // :6554 それ以外\n        await era.printAndWait(\n          `「嗯啊…这样的话还不如干脆用自己的手…来做就好了………」`,\n        ); // :6556',
    replace:
      '        // :6554（变异：台词内容篡改）\n        await era.printAndWait(`「篡改」`); // :6556',
    tests: ['kojo-k8-spade'],
    must_mention: '用自己的手',
  },
  {
    desc: 'M1947 K8 MARKCNG_8 头部守卫 TEQUIP:45（口塞）短路失效（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: 'async function kojo_message_markcng_8() {\n  const target = era_flag.target;\n  const target_name = chara_callname(target); // %SAVESTR:TARGET%\n  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%\n  const kojo = chara(target).kojo;\n\n  if (era0(`tequip:${target}:45`)) {\n    return 0;\n  }',
    replace:
      'async function kojo_message_markcng_8() {\n  const target = era_flag.target;\n  const target_name = chara_callname(target); // %SAVESTR:TARGET%\n  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%\n  const kojo = chara(target).kojo;\n\n  if (era0(`tequip:${target}:45`) && false) {\n    return 0;\n  }',
    tests: ['kojo-k8-spade'],
    must_mention: '这种痛苦',
  },
  {
    desc: 'M1948 K8 MARKCNG_8 苦痛刻印Lv3 推进写错（CFLAG:297 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.苦痛刻印Lv3 = 1; // :6602 CFLAG:297 = 1',
    replace: '    kojo.苦痛刻印Lv3 = 0; // :6602（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '苦痛刻印Lv3',
  },
  {
    desc: 'M1949 K8 MARKCNG_8 快乐刻印Lv3 推进写错（CFLAG:298 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.快乐刻印Lv3 = 1; // :6618 CFLAG:298 = 1',
    replace: '    kojo.快乐刻印Lv3 = 0; // :6618（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '快乐刻印Lv3',
  },
  {
    desc: 'M1950 K8 MARKCNG_8 屈服刻印Lv3 推进写错（CFLAG:299 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.屈服刻印Lv3 = 1; // :6628 CFLAG:299 = 1',
    replace: '    kojo.屈服刻印Lv3 = 0; // :6628（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '屈服刻印Lv3',
  },
  {
    desc: 'M1951 K8 MARKCNG_8 反抗刻印Lv3 推进写错（CFLAG:300 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.反抗刻印Lv3 = 1; // :6642 CFLAG:300 = 1',
    replace: '    kojo.反抗刻印Lv3 = 0; // :6642（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '反抗刻印Lv3',
  },
  {
    desc: 'M1952 K8 SELF_KOJO_K8 调教后自慰 淫乱写错（CFLAG:261 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        kojo.调教后自慰 = 4; // :6680 CFLAG:261 = 4',
    replace: '        kojo.调教后自慰 = 3; // :6680（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '调教后自慰 CFLAG:261',
  },
  {
    desc: 'M1953 K8 SELF_KOJO_K8 百合PLAY 崩坏支写错（CFLAG:262 = 6 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.百合PLAY = 6; // :6717 CFLAG:262 = 6',
    replace: '      kojo.百合PLAY = 0; // :6717（变异：推进丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '百合PLAY CFLAG:262',
  },
  {
    desc: 'M1954 K8 SELF_KOJO_K8 朝口交 それ以外写错（CFLAG:263 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.朝口交 = 1; // :6787 CFLAG:263 = 1',
    replace: '      kojo.朝口交 = 0; // :6787（变异：推进丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '朝口交 CFLAG:263',
  },
  {
    desc: 'M1955 K8 SELF_KOJO_K8 调教后性交 V感觉Lv4以上写错（CFLAG:264 = 2 改 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.调教后性交 = 2; // :6805 CFLAG:264 = 2',
    replace: '      kojo.调教后性交 = 1; // :6805（变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '调教后性交 CFLAG:264',
  },
  {
    desc: 'M1956 K8 SELF_KOJO_K8 调教后性交 s>=3 中出补充行门槛丢失（恒真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if ((s || 0) >= 3) {',
    replace: '      if (true) {',
    tests: ['kojo-k8-spade'],
    must_mention: 's<3 不应出现中出补充行',
  },
  {
    desc: 'M1957 K8 SELF_KOJO_K8 调教后性交 それ以外写错（CFLAG:264 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.调教后性交 = 1; // :6813 CFLAG:264 = 1',
    replace: '      kojo.调教后性交 = 0; // :6813（变异：推进丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '调教后性交 CFLAG:264',
  },
  {
    desc: 'M1958 K8 SELF_KOJO_K8 夜袭外层守卫丢失（CFLAG:265 < 1 改恒真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (kojo.夜袭 < 1 || game.kojo.口上开关 === 2) {',
    replace: '    if (true) {',
    tests: ['kojo-k8-spade'],
    must_mention: '外层 CFLAG:265 < 1 守卫应拦下整支',
  },
  {
    desc: 'M1959 K8 SELF_KOJO_K8 夜袭 崩坏支写错（CFLAG:265 = 2 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        kojo.夜袭 = 2; // :6826 CFLAG:265 = 2',
    replace: '        kojo.夜袭 = 0; // :6826（变异：推进丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '夜袭 CFLAG:265',
  },
  {
    desc: 'M1960 K8 SELF_KOJO_K8 卖却 扶她守卫条件被"修正"（!== 1 改 === 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`talent:${target}:122`) !== 1) {\n      // :6870\n      stub_line(',
    replace:
      '    if (era0(`talent:${target}:122`) === 1) {\n      // :6870（变异：条件取反）\n      stub_line(',
    tests: ['kojo-k8-spade'],
    must_mention: '非扶她应尾调存根 SELL_MATURO_K0',
  },
  {
    desc: 'M1961 K8 SELF_KOJO_K8 妊娠发觉 首次写错（CFLAG:271 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.妊娠发觉 = 1; // :6910 CFLAG:271 = 1',
    replace: '      kojo.妊娠发觉 = 0; // :6910（变异：推进丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '妊娠发觉 CFLAG:271',
  },
  {
    desc: 'M1962 K8 SELF_KOJO_K8 生产 已生产支源作误写缺失引号被"修正"（破坏 1:1 保真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '          `总觉得很不可思议…就算是这样也舍不得扔掉这个孩子呢」`,',
    replace:
      '          `「总觉得很不可思议…就算是这样也舍不得扔掉这个孩子呢」`,',
    tests: ['kojo-k8-spade'],
    must_mention: '生产 已生产分支源作误写缺失开头引号',
  },
  {
    desc: 'M1963 K8 SELF_KOJO_K8 生产 首次写错（CFLAG:272 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.生产 = 1; // :6966 CFLAG:272 = 1',
    replace: '      kojo.生产 = 0; // :6966（变异：推进丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '生产 CFLAG:272',
  },
  {
    desc: 'M1964 K8 SELF_KOJO_K8 育儿室写错（CFLAG:273 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.育儿室 = 1; // :7001 CFLAG:273 = 1',
    replace: '    kojo.育儿室 = 0; // :7001（变异：推进丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '育儿室 CFLAG:273',
  },
  {
    desc: 'M1965 K8 SELF_KOJO_K8 亲离写错（CFLAG:274 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.亲离 = 1; // :7012 CFLAG:274 = 1',
    replace: '    kojo.亲离 = 0; // :7012（变异：推进丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '亲离 CFLAG:274',
  },
  {
    desc: 'M1966 K8 SELF_KOJO_K8 末行复位丢失（TFLAG:13 = 0 删除，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  game.train.初吻与自我口上 = 0; // :7045 TFLAG:13 = 0',
    replace: '  // 变异：末行复位丢失',
    tests: ['kojo-k8-spade'],
    must_mention: '末行复位',
  },
  {
    desc: 'M1967 SELF_KOJO 顶层分发丢掉 s 实参（K8「調教後セックス」拿不到加做次数，#239）',
    file: 'ere/kojo/kojo-system.js',
    find: '      args: [rand, q, s],',
    replace: '      args: [rand, q],',
    tests: ['kojo-k8-spade'],
    must_mention: 's 必须经 self_kojo() 顶层分发一路到达 self_kojo_k8',
  },
  {
    desc: 'M1968 K8 DUNGEON_RYOUZYOKU 非处女支心声串成处女支（1:1 保真破坏，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    await era.printAndWait(`（找个破绽…想办法逃出去…！）`); // :7086',
    replace:
      '    await era.printAndWait(`（找个破绽…想办法逃出去…！处女被夺走这种事怎么说都行…！）`); // :7086（变异：串支）',
    tests: ['kojo-k8-spade'],
    must_mention: 'DUNGEON_RYOUZYOKU：非处女支心声只剩逃跑',
  },
  {
    desc: 'M1969 K8 DUNGEON_RYOUZYOKU_AFTER 非处女支膣档门槛丢失（EXP:0 > 20 改恒真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`exp:${target}:0`) > 20) {',
    replace: '    if (true) {',
    tests: ['kojo-k8-spade'],
    must_mention: '非处女四档 EXP 全为 0 时只出开场一行',
  },
  {
    desc: 'M1970 K8 DUNGEON_RYOUZYOKU_AFTER 非处女精液味档的孤立开引号被「修正」掉（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      await era.printAndWait(`「`); // :7137',
    replace: '      // 变异：源作多打的孤立开引号被删掉',
    tests: ['kojo-k8-spade'],
    must_mention: '非处女精液味档 源作多打一行孤立开引号',
  },
  {
    desc: 'M1971 K8 DUNGEON_VICTORY 決め台詞首支写错（RAND:3 == 0 串到第三支，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    await era.printAndWait(`「哼、没有会输的要素、这是理所当然的结果」`); // :7152',
    replace:
      '    await era.printAndWait(`「又砍了无聊的东西」`); // :7152（变异：串支）',
    tests: ['kojo-k8-spade'],
    must_mention: 'DUNGEON_VICTORY：RAND:3==0 决胜台词 + 残血险胜',
  },
  {
    desc: 'M1972 K8 DUNGEON_VICTORY 残血判定 || 改 &&（单项残血不再算险胜，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find:
      '    (era0(`base:${a}:0`) * 100) / era0(`maxbase:${a}:0`) < 50 ||\n' +
      '    (era0(`base:${a}:1`) * 100) / era0(`maxbase:${a}:1`) < 50',
    replace:
      '    (era0(`base:${a}:0`) * 100) / era0(`maxbase:${a}:0`) < 50 &&\n' +
      '    (era0(`base:${a}:1`) * 100) / era0(`maxbase:${a}:1`) < 50',
    tests: ['kojo-k8-spade'],
    must_mention: 'DUNGEON_VICTORY：RAND:3==0 决胜台词 + 残血险胜',
  },
  {
    desc: 'M1973 K8 DUNGEON_ATTACK 侵攻/迎击守卫取反（CFLAG:1 == 2 改 != 2，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  if (chara(target).invasion.状态 == 2) {',
    replace: '  if (chara(target).invasion.状态 != 2) {',
    tests: ['kojo-k8-spade'],
    must_mention: '侵攻中 CFLAG:1 == 2',
  },
  {
    desc: 'M1974 K8 BENKI 档位守卫写错（FLAG:62 == 0 改 == 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  if (game.train.肉便器行动 == 0) {',
    replace: '  if (game.train.肉便器行动 == 1) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'FLAG:62==0 淫乱',
  },
  {
    desc: 'M1975 K8 BENKI 第 0 档侍奉精神门槛放宽（ABL:16 >= 5 改 >= 0，それ以外支不可达，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find:
      '    } else if (era0(`abl:${a}:16`) >= 5) {\n' +
      '      // :7212 侍奉精神Lv5以上',
    replace:
      '    } else if (era0(`abl:${a}:16`) >= 0) {\n' +
      '      // :7212（变异：门槛放宽）',
    tests: ['kojo-k8-spade'],
    must_mention: 'FLAG:62==0 それ以外',
  },
  {
    desc: 'M1976 K8 BENKI FLAG:62==1 爱慕支第二行（角色名旁白）丢失（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        `面对${target_name}的叹息，周围的女魔族冷冷的笑着………`,',
    replace: '        `面对的叹息，周围的女魔族冷冷的笑着………`,',
    tests: ['kojo-k8-spade'],
    must_mention: 'BENKI：FLAG:62==1 爱慕支两行（第二行带角色名）',
  },
  {
    desc: 'M1977 K8 BENKI A+V 侍奉支源作多打的句末引号被「修正」（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        `「啊嗯…恩…啊啊…我没有2个小穴，所以请按照顺序来侵犯…啊…啊嗯啊」」`,',
    replace:
      '        `「啊嗯…恩…啊啊…我没有2个小穴，所以请按照顺序来侵犯…啊…啊嗯啊」`,',
    tests: ['kojo-k8-spade'],
    must_mention: 'A+V 侍奉支 源作句末多打一个引号',
  },
  {
    desc: 'M1978 K8 BENKI V プレイ淫乱支第二处爱心丢失（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        `「啊嗯…啊嗯啊${heart(1)} 继续侵犯我的小穴…满满的射出精液吧…${heart(1)}」`,',
    replace:
      '        `「啊嗯…啊嗯啊${heart(1)} 继续侵犯我的小穴…满满的射出精液吧…」`,',
    tests: ['kojo-k8-spade'],
    must_mention: 'BENKI：FLAG:62==4 淫乱支两处爱心',
  },
  {
    desc: 'M1979 K8 BENKI 第 5 档守卫改恒真（FLAG:62 越界不再静默，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  } else if (game.train.肉便器行动 == 5) {',
    replace: '  } else {',
    tests: ['kojo-k8-spade'],
    must_mention: 'FLAG:62 越界时六档全不命中',
  },
  {
    desc: 'M1980 K8 NTR 入口再捕获位不再补写（CFLAG:650 赋值删掉，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.NTR再捕获 = 1; // :7451 CFLAG:650 = 1',
    replace: '    // 变异：再捕获位不补',
    tests: ['kojo-k8-spade'],
    must_mention: 'NTR 再捕获 CFLAG:650',
  },
  {
    desc: 'M1981 K8 NTR 狂王性别判定漏掉扶她的 2（0 || 2 改只判 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  const futa = () => game.system.狂王性别 == 0 || game.system.狂王性别 == 2;',
    replace: '  const futa = () => game.system.狂王性别 == 0;',
    tests: ['kojo-k8-spade'],
    must_mention: 'NTR：P==2 陥落済支六行 + CFLAG:652',
  },
  {
    desc: 'M1982 K8 NTR P==1 それ以外支的按摩棒串成巨根（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        await era.print(`特大号的按摩棒`); // :7472',
    replace: '        await era.print(`狂王的巨根`); // :7472（变异：串支）',
    tests: ['kojo-k8-spade'],
    must_mention: 'FLAG:500==1 走按摩棒',
  },
  {
    desc: 'M1983 K8 NTR P==3 兽奸秀 TALENT:136 优先级丢失（首条改为淫乱/爱慕，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`talent:${target}:136`)) {',
    replace: '    if (false && era0(`talent:${target}:136`)) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'NTR：P==3 兽奸秀 TALENT:136 优先于淫乱/爱慕',
  },
  {
    desc: 'M1984 K8 NTR P==4 それ以外末行补上源作没有的省略号（1:1 保真破坏，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        `水晶球录下了好几个${target_name}被狂王抱着不停绝顶的画面`,',
    replace:
      '        `水晶球录下了好几个${target_name}被狂王抱着不停绝顶的画面………`,',
    tests: ['kojo-k8-spade'],
    must_mention: 'P==4 それ以外末行源作无省略号',
  },
  {
    desc: 'M1985 K8 NTR P==5 只判 FLAG:500 == 0 的那处被「统一」成 0 或 2（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (game.system.狂王性别 == 0) {',
    replace: '      if (futa()) {',
    tests: ['kojo-k8-spade'],
    must_mention:
      'FLAG:500==2 在本支走假阳具（与同函数其余各处的 0 或 2 判定不同）',
  },
  {
    desc: 'M1986 K8 NTR P==7 记位写到 CFLAG:655 上（串位，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.NTR_657 = 1; // :7581 CFLAG:657 = 1',
    replace: '    kojo.NTR_655 = 1; // :7581（变异：串位）',
    tests: ['kojo-k8-spade'],
    must_mention: 'NTR_657 CFLAG:657',
  },
  {
    desc: 'M1987 K8 NTR P==20 妊娠相手判定写错（CFLAG:102 == 1 改 != 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (chara(target).event.妊娠相手 == 1) {',
    replace: '      if (chara(target).event.妊娠相手 != 1) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'NTR：P==20 公开生产按 CFLAG:102 分岔，且本支不记位',
  },
  {
    desc: 'M1988 K8 EXUCUTION 首档守卫写错（TFLAG:16 == 4 改 == 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  if (game.event.犬射精或处刑口上 == 4) {',
    replace: '  if (game.event.犬射精或处刑口上 == 3) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'TFLAG:16==4 肉便器刑',
  },
  {
    desc: 'M1989 K8 MUSEUM 蜡人形档值被「修正」成 2（源作是 21，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  } else if (game.event.博物馆口上 == 21) {',
    replace: '  } else if (game.event.博物馆口上 == 2) {',
    tests: ['kojo-k8-spade'],
    must_mention: '蝋人形化档值 21（源作如此）',
  },
  {
    desc: 'M1990 K8 BANISHMENT 追放档守卫写错（TFLAG:510 == 0 改 == 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  if (game.event.流放口上 == 0) {',
    replace: '  if (game.event.流放口上 == 1) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'BANISHMENT：TFLAG:510 追放有词，其余四档空行',
  },
  {
    desc: 'M1991 K8 PUBLIC_EXUCUTION 魂粉砕档（源作空台词）被删（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find:
      '  } else if (game.event.公开处刑口上 == 2) {\n' +
      '    // :7688 魂粉砕（源作未填台词）\n' +
      "    await era.printAndWait(''); // :7690",
    replace: '  } else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'TFLAG:520==2 源作未填台词',
  },
  {
    desc: 'M1992 K8 GROTESQUE 末档（TFLAG:530 == 6 ゾンビ化）丢失（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  } else if (game.event.猎奇处刑口上 == 6) {',
    replace: '  } else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'TFLAG:530==6 源作未填台词，只出空行',
  },
  {
    desc: 'M1993 K8 ENTERENEMY 爱慕档守卫丢失（TALENT:85 == 1 改恒真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  } else if (era0(`talent:${a}:85`) == 1) {',
    replace: '  } else if (true) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'ENTERENEMY：淫乱 → 爱慕 → それ以外 三选一',
  },
  {
    desc: 'M1994 K8 GOHOUBI_REQUEST 兽奸档合并守卫漏掉马（1||2||3 改 1||2，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  } else if (gohoubi == 1 || gohoubi == 2 || gohoubi == 3) {',
    replace: '  } else if (gohoubi == 1 || gohoubi == 2) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:504==3 兽奸要求',
  },
  {
    desc: 'M1995 K8 GOHOUBI_REQUEST 兽名串档（猪 → 犬，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      await era.print(`猪`); // :7748',
    replace: '      await era.print(`犬`); // :7748（变异：串档）',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:504==2 兽奸要求',
  },
  {
    desc: 'M1996 K8 GOHOUBI_REQUEST キス档被补上源作没有的旁白行（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    await era.printAndWait(`「回来之后想要魔王大人的吻…想要认真的吻」`); // :7756',
    replace:
      '    await era.printAndWait(`「回来之后想要魔王大人的吻…想要认真的吻」`); // :7756\n' +
      '    await era.printAndWait(`${a_name}要求接吻作为报酬。`); // 变异：补旁白',
    tests: ['kojo-k8-spade'],
    must_mention: 'キス档源作没有旁白行',
  },
  {
    desc: 'M1997 K8 GOHOUBI_AFTER 放置 PLAY 档守卫写错（choice == 0 改 == 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find:
      '  if (choice == 0) {\n' +
      '    // :7783 放置PLAY\n' +
      '    await era.printAndWait(`「………知道了、我就这样退下了」`); // :7785',
    replace:
      '  if (choice == 1) {\n' +
      '    // :7783（变异：档位守卫写错）\n' +
      '    await era.printAndWait(`「………知道了、我就这样退下了」`); // :7785',
    tests: ['kojo-k8-spade'],
    must_mention: 'GOHOUBI_AFTER：choice 0/1 各一行，choice 越界静默',
  },
  {
    desc: 'M1998 K8 GOHOUBI_AFTER キス旁白的汉化重复被「修正」（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        `就这样${a_name}和你反复的接吻了十分钟以上１０分以上………`,',
    replace: '        `就这样${a_name}和你反复的接吻了十分钟以上………`,',
    tests: ['kojo-k8-spade'],
    must_mention: 'キス档旁白的「十分钟以上１０分以上」是汉化重复，1:1 保真',
  },
  {
    desc: 'M1999 K8 GOHOUBI_AFTER 童贞狩档膣/肛门两支被串成同文（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        await era.printAndWait(`「怎么样、我的身体是最棒的吧？」`); // :7848',
    replace:
      '        await era.printAndWait(`「屁股小穴里插着新品阴茎最棒了♪」`); // :7848（变异：串支）',
    tests: ['kojo-k8-spade'],
    must_mention: 'GOHOUBI_AFTER：童贞狩档的膣/肛门两支文字不同（对照上一条）',
  },
  {
    desc: 'M2000 K8 OSIOKI 脱粪刑门槛被「统一」成自慰刑的 4（源作是 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`abl:${a}:17`) >= 6) {',
    replace: '    if (era0(`abl:${a}:17`) >= 4) {',
    tests: ['kojo-k8-spade'],
    must_mention: '脱粪刑门槛是 6，Lv4 不够',
  },
  {
    desc: 'M2001 K8 OSIOKI 小便器刑的或判退化成只认受虐狂（TALENT:76 臂丢失，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`talent:${a}:88`) == 1 || era0(`talent:${a}:76`) == 1) {',
    replace: '    if (era0(`talent:${a}:88`) == 1) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'OSIOKI：小便器刑 受虐狂 TALENT:88 或淫乱 TALENT:76 任一即可',
  },
  {
    desc: 'M2002 K8 OSIOKI 厕所打扫刑与断食刑串档（:7905 换成 :7908 的台词，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    await era.printAndWait(`「这不是我应该做的事啊………」`); // :7905',
    replace:
      '    await era.printAndWait(`「这样的刑罚，3天左右没事的」`); // :7905（变异：串档）',
    tests: ['kojo-k8-spade'],
    must_mention: 'choice 6',
  },
  {
    desc: 'M2003 K8 OSIOKI 末档（choice == 9 未定）丢失（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  } else if (choice == 9) {',
    replace: '  } else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'choice 9',
  },
  {
    desc: 'M2004 K8 GOBI 悲伤档串成害羞档（:7929 换成 :7932 的语尾，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    await era.print(`唉……。`); // :7929',
    replace: '    await era.print(`嗯……。`); // :7929（变异：串档）',
    tests: ['kojo-k8-spade'],
    must_mention: 'ARG:0 == 3',
  },
  {
    desc: 'M2005 K8 GOBI 默认支第二支被「去重」成第三支的语尾（源作两支同文，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      await era.print(`啊。`); // :7942',
    replace:
      '      await era.print(`什么啊。`); // :7942（变异：源作同文被改）',
    tests: ['kojo-k8-spade'],
    must_mention: '默认支第二支与第一支同文（源作如此）',
  },
];
