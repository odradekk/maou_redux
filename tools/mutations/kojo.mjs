// 变异条目表切片：ere/kojo/（口上状态机与文本插值）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释；新增/删除条目必须同步改
// 工具里的 LEDGER_COUNT_BASELINE（两项检查）。desc 里的 M 编号不人工分配，
// 只作引用锚点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）——
// 重号由 gate_shape 随 --verify 秒级核对。
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
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:77\`) === 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)`,
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
  // —— #237（J27）：K6 悪女 口上模块。原号段 M1780-M1806，与 #236/#288 撞号
  // 的一段（原 M1790-M1806）已改到 M2119/M2121-M2136（#295 消重，只改后来者）——
  {
    desc: 'M1780 K6 COM 助手调教守卫删（ASSIPLAY 不再跳过，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: `  if (era_flag.assi > 0 && era_flag.assiplay) {
    // :680-681
    return 0; // :680-681
  } // :680-681`,
    replace: `  if (false) {
    // :680-681 变异
    return 0; // :680-681
  } // :680-681`,
    tests: ['kojo-k6-wicked'],
    must_mention: '助手调教（ASSI > 0 && ASSIPLAY）：静默跳过',
  },
  {
    desc: 'M1781 K6 COM 口塞守卫删（TEQUIP:45 不再跳过，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: `  if (era.get(\`tequip:\${target}:45\`) && era_flag.selectcom !== 45) {
    // :683-684
    return 0; // :683-684
  } // :683-684`,
    replace: `  if (false && era_flag.selectcom !== 45) {
    // :683-684 变异
    return 0; // :683-684
  } // :683-684`,
    tests: ['kojo-k6-wicked'],
    must_mention: '口塞（TEQUIP:45 且非指令45）：静默跳过',
  },
  {
    desc: 'M1782 K6 COM 失神守卫删（TFLAG:899 不再跳过，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: `  if (game.train.失神) {
    // :686-687
    return 0; // :686-687
  } // :686-687`,
    replace: `  if (false) {
    // :686-687 变异
    return 0; // :686-687
  } // :686-687`,
    tests: ['kojo-k6-wicked'],
    must_mention: '失神（TFLAG:899）：静默跳过',
  },
  {
    desc: 'M1783 K6 COM 崩坏守卫删（TALENT:9 不再跳过，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: `  if ((era.get(\`talent:\${target}:9\`) || 0) === 1) {
    // :689-690
    return 0; // :689-690
  } // :689-690`,
    replace: `  if (false) {
    // :689-690 变异
    return 0; // :689-690
  } // :689-690`,
    tests: ['kojo-k6-wicked'],
    must_mention: '崩坏（TALENT:9）：静默跳过',
  },
  {
    desc: 'M1784 K6 兽奸守卫岔路丢失（TEQUIP:89 不再调 DOG_KOJO_6，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: `  if (era.get(\`tequip:\${target}:89\`)) {
    // :692
    await dog_kojo_6(rand_n); // CALL DOG_KOJO_6 // :693
    return 0; // :693-694
  } // :695-696`,
    replace: `  if (era.get(\`tequip:\${target}:89\`)) {
    // :692
    return 0; // :693-694 变异
  } // :695-696`,
    tests: ['kojo-k6-wicked'],
    must_mention: '兽奸（TEQUIP:89）：岔进本文件真身 DOG_KOJO_6',
  },
  {
    desc: 'M1785 K6 死斗场守卫岔路丢失（TEQUIP:55 不再调 COLOSSEUM_KOJO_6，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: `  if (era.get(\`tequip:\${target}:55\`)) {
    // :697
    await colosseum_kojo_6(rand_n); // CALL COLOSSEUM_KOJO_6 // :698
    return 0; // :698-699
  } // :698-700`,
    replace: `  if (era.get(\`tequip:\${target}:55\`)) {
    // :697
    return 0; // :698-699 变异
  } // :698-700`,
    tests: ['kojo-k6-wicked'],
    must_mention: '死斗场（TEQUIP:55）：岔进本文件真身 COLOSSEUM_KOJO_6',
  },
  {
    desc: 'M1786 K6 爱撫初回推进写错（CFLAG:301 = 1 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '      kojo.爱抚 = 1; // :720',
    replace: '      kojo.爱抚 = 2; // :720（变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '爱撫初回 CFLAG:301 = 1',
  },
  {
    desc: 'M1787 K6 爱撫淫乱档推进写错（CFLAG:301 = 6 改 5，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        kojo.爱抚 = 6; // :728',
    replace: '        kojo.爱抚 = 5; // :728（变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '淫乱 TALENT:76 → CFLAG:301 = 6',
  },
  {
    desc: 'M1788 K6 爱撫爱慕档推进写错（CFLAG:301 = 5 改 4，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        kojo.爱抚 = 5; // :733',
    replace: '        kojo.爱抚 = 4; // :733（变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '爱慕 TALENT:85 → CFLAG:301 = 5',
  },
  {
    desc: 'M1789 K6 爱撫屈服Lv3档推进写错（CFLAG:301 = 4 改 3，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        kojo.爱抚 = 4; // :738',
    replace: '        kojo.爱抚 = 3; // :738（变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '屈服刻印 Lv3 → CFLAG:301 = 4',
  },
  {
    desc: 'M2119 K6 爱撫屈服Lv2档推进写错（CFLAG:301 = 3 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        kojo.爱抚 = 3; // :743',
    replace: '        kojo.爱抚 = 2; // :743（变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '屈服刻印 Lv2 → CFLAG:301 = 3',
  },
  {
    desc: 'M2121 K6 爱撫それ以外档推进写错（CFLAG:301 = 2 改 1，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        kojo.爱抚 = 2; // :748',
    replace: '        kojo.爱抚 = 1; // :748（变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: 'それ以外 → CFLAG:301 = 2',
  },
  {
    desc: 'M2122 K6 阶段耗尽静默锁删（FLAG:7 == 1 时也出声，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: `      if (
        (era.get(\`talent:\${target}:76\`) || 0) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :725`,
    replace: `      if (
        (era.get(\`talent:\${target}:76\`) || 0) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 1)
      ) {
        // :725 变异`,
    tests: ['kojo-k6-wicked'],
    must_mention: 'FLAG:7 == 1 阶段耗尽后不出声',
  },
  {
    desc: 'M2123 K6 舔阴首次推进写错（CFLAG:302 = 1 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '      kojo.舔阴 = 1; // :769',
    replace: '      kojo.舔阴 = 2; // :769（变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '舔陰初回 CFLAG:302 = 1',
  },
  {
    desc: 'M2124 K6 自己扒开首次推进写错（CFLAG:308 = 1 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '      kojo.自己扒开 = 1; // :1221',
    replace: '      kojo.自己扒开 = 2; // :1221（变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '自己扒开初回 CFLAG:308 = 1',
  },
  {
    desc: 'M2125 K6 胸爱抚首次推进写错（CFLAG:306 = 1 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '      kojo.胸爱抚 = 1; // :1023',
    replace: '      kojo.胸爱抚 = 2; // :1023（变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '胸爱抚初回 CFLAG:306 = 1',
  },
  {
    desc: 'M2126 K6 EVENTTRAIN 初调教推进写错（CFLAG:201 = 1 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '      kojo.初调教 = 1; // :163',
    replace: '      kojo.初调教 = 2; // :163（变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '初調教推进到 1',
  },
  {
    desc: 'M2127 K6 EVENTEND 反抗刻印台词改（去死吧！，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '    await era.printAndWait(`「去死吧！」`); // :608',
    replace: '    await era.printAndWait(`「滚开吧！」`); // :608 变异',
    tests: ['kojo-k6-wicked'],
    must_mention: '反抗刻印Lv3 终了出声',
  },
  {
    desc: 'M2128 K6 DOG_KOJO 首次推进写错（CFLAG:301 = 1 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '      kojo.爱抚 = 1; // :5293',
    replace: '      kojo.爱抚 = 2; // :5293（变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '兽奸爱撫初回（DOG_KOJO_6 CFLAG:301 == 0 且 MARK:2 < 2）',
  },
  {
    desc: 'M2129 K6 PALAMCNG 处女丧失的 A 加算改错（UP:12 丢，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: `  A =
    (era.get(\`delta:\${target}:11\`) || 0) + (era.get(\`delta:\${target}:12\`) || 0); // UP:11 + UP:12 // :6334`,
    replace: `  A =
    (era.get(\`delta:\${target}:11\`) || 0); // 变异：丢 UP:12`,
    tests: ['kojo-k6-wicked'],
    must_mention: '处女丧失 A >= 500 落それ以外档（UP:12 参与加算）',
  },
  {
    desc: 'M2130 K6 MARKCNG 苦痛刻印取得推进写错（CFLAG:297 = 1 改 0，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '    kojo.苦痛刻印Lv3 = 1; // :6408',
    replace: '    kojo.苦痛刻印Lv3 = 0; // :6408（变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '苦痛刻印Lv3 CFLAG:297 = 1',
  },
  {
    desc: 'M2131 K6 NTR 入口推进写错（CFLAG:650 = 1 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '    kojo.NTR再捕获 = 1; // :7581',
    replace: '    kojo.NTR再捕获 = 2; // :7581（变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: 'CFLAG:650',
  },
  {
    desc: 'M2132 K6 奖赏后口上 choice == 0 改 9（#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: `  if (choice === 0) {
    // :7838`,
    replace: `  if (choice === 9) {
    // :7838 变异`,
    tests: ['kojo-k6-wicked'],
    must_mention: '这样的事情可不能长久',
  },
  {
    desc: 'M2133 K6 惩罚口上 choice == 0 改 9（#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: `  if (choice === 0) {
    // :7914`,
    replace: `  if (choice === 9) {
    // :7914 变异`,
    tests: ['kojo-k6-wicked'],
    must_mention: '惩罚口上',
  },
  {
    desc: 'M2134 K6 SELF_KOJO leftover_q 助手支入口错档（Q === 1 改 9，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: `    } else if (Q === 1) {
      // :6467`,
    replace: `    } else if (Q === 9) {
      // :6467 变异`,
    tests: ['kojo-k6-wicked'],
    must_mention: 'SELF_KOJO 助手妄想支出声',
  },
  {
    desc: 'M2136 K6 SELF_KOJO leftover_s 回数门槛错档（S >= 3 改 99，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: `      if (S >= 3) {
        // :6594`,
    replace: `      if (S >= 99) {
        // :6594 变异`,
    tests: ['kojo-k6-wicked'],
    must_mention: 'leftover_s 回数插值',
  },
  // —— #236（J26）：K5 マオ 口上模块（M1790-M1814 号段） ——
  {
    desc: 'M1790 K5 舔阴首次推进写错（CFLAG:302 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.舔阴 = 1; // :866',
    replace: '      kojo.舔阴 = 2; // :866（变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'CFLAG:302 = 1',
  },
  {
    desc: 'M1791 K5 肛门爱抚首次推进写错（CFLAG:303 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.肛门爱抚 = 1; // :914',
    replace: '      kojo.肛门爱抚 = 2; // :914（变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'CFLAG:303 = 1',
  },
  {
    desc: 'M1792 K5 胸爱抚首次推进写错（CFLAG:306 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.胸爱抚 = 1; // :1144',
    replace: '      kojo.胸爱抚 = 2; // :1144（变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'CFLAG:306 = 1',
  },
  {
    desc: 'M1793 K5 正常位首次推进写错（CFLAG:321 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.正常位 = 1; // :2326',
    replace: '      kojo.正常位 = 2; // :2326（变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'CFLAG:321 = 1',
  },
  {
    desc: 'M1794 K5 口塞首次推进写错（CFLAG:346 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.口塞 = 1; // :4532',
    replace: '      kojo.口塞 = 2; // :4532（变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'cflag:17:346',
  },
  {
    desc: 'M1795 K5 穿环首次推进写错（CFLAG:348 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.穿环 = 1; // :5506',
    replace: '      kojo.穿环 = 2; // :5506（变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'CFLAG:348 = 1',
  },
  {
    desc: 'M1796 K5 死斗场入口错号（SELECTCOM == 55 改 54）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  if (era_flag.selectcom === 55) {\n    // :7231',
    replace: '  if (era_flag.selectcom === 54) {\n    // :7231',
    tests: ['kojo-k5-mao'],
    must_mention: 'SELECTCOM==0 静默、==55 走真身',
  },
  {
    desc: 'M1797 K5 PALAMCNG 处女丧失推进写错（CFLAG:229 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '    kojo.处女丧失 = 1; // :5719',
    replace: '    kojo.处女丧失 = 2; // :5719（变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'CFLAG:229 = 1',
  },
  {
    desc: 'M1798 K5 MARKCNG 苦痛刻印入口错档（=== 3 改 === 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  if (game.system.苦痛刻印变动 === 3 && kojo.苦痛刻印Lv3 === 0) {',
    replace:
      '  if (game.system.苦痛刻印变动 === 2 && kojo.苦痛刻印Lv3 === 0) {',
    tests: ['kojo-k5-mao'],
    must_mention: 'CFLAG:297 = 1',
  },
  {
    desc: 'M1799 K5 SELF_KOJO leftover_s 门槛抬一档（>= 3 改 >= 9）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      if (s >= 3) {',
    replace: '      if (s >= 9) {',
    tests: ['kojo-k5-mao'],
    must_mention: '被中出之后看上去十分满足',
  },
  {
    desc: 'M1800 K5 SELF_KOJO 出售门槛抬一档（S >= 1000000 改 2000000）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '        if (S >= 1000000) {\n          // :6262',
    replace: '        if (S >= 2000000) {\n          // :6262',
    tests: ['kojo-k5-mao'],
    must_mention: '被魔界的某位贵族买下',
  },
  {
    desc: 'M1801 K5 NTR 入口推进写错（CFLAG:650 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '    kojo.NTR再捕获 = 1; // :7365',
    replace: '    kojo.NTR再捕获 = 2; // :7365（变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'CFLAG:650/651',
  },
  {
    desc: 'M1802 K5 GOBI ARG:0 == 1 改 9（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  if (arg_0 === 1) {\n    // :7748',
    replace: '  if (arg_0 === 9) {\n    // :7748',
    tests: ['kojo-k5-mao'],
    must_mention: '的噢~♪',
  },
  {
    desc: 'M1803 K5 奖赏后口上 choice == 0 改 9（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  if (choice === 0) {\n    // :7609',
    replace: '  if (choice === 9) {\n    // :7609',
    tests: ['kojo-k5-mao'],
    must_mention: '真小气',
  },
  {
    desc: 'M1804 K5 惩罚口上 choice == 0 改 9（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  if (choice === 0) {\n    // :7687',
    replace: '  if (choice === 9) {\n    // :7687',
    tests: ['kojo-k5-mao'],
    must_mention: '十分感谢',
  },
  {
    desc: 'M1805 K5 迷宫胜利淫乱入口错格（TALENT:76 改 77）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  if (era.get(`talent:${a}:76`) === 1) {\n    // :7142',
    replace: '  if (era.get(`talent:${a}:77`) === 1) {\n    // :7142',
    tests: ['kojo-k5-mao'],
    must_mention: '快点来侵犯我啊',
  },
  {
    desc: 'M1806 K5 EVENTTRAIN 人类初调教台词改字（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '你这家伙是谁啊',
    replace: '你这家伙是何人啊',
    tests: ['kojo-k5-mao'],
    must_mention: '人类初调教必须出声',
  },
  {
    desc: 'M1807 K5 COM 口塞守卫删（TEQUIP:45 不再跳过）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: `  if (era.get(\`tequip:\${target}:45\`) && era_flag.selectcom !== 45) {
    return 0;
  }`,
    replace: `  if (false && era_flag.selectcom !== 45) {
    return 0;
  }`,
    tests: ['kojo-k5-mao'],
    must_mention: 'SELECTCOM != 45 跳过',
  },
  {
    desc: 'M1808 K5 COM 兽奸守卫删（TEQUIP:89 不再跳过）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: `  // :781-782 獣姦プレイ中（K5 是静默跳过，无 DOG_KOJO 调用）
  if (era.get(\`tequip:\${target}:89\`)) {
    return 0;
  }`,
    replace: `  // :781-782 獣姦プレイ中（K5 是静默跳过，无 DOG_KOJO 调用）
  if (false) {
    return 0;
  }`,
    tests: ['kojo-k5-mao'],
    must_mention: '静默跳过（无 DOG_KOJO 占位行）',
  },
  {
    desc: 'M1809 K5 COM 死斗场岔路丢失（TEQUIP:55 不再调 COLOSSEUM）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: `  if (era.get(\`tequip:\${target}:55\`)) {
    await colosseum_kojo_5(rand_n); // :788
    return 0;
  }`,
    replace: `  if (era.get(\`tequip:\${target}:55\`)) {
    return 0;
  }`,
    tests: ['kojo-k5-mao'],
    must_mention: 'SELECTCOM==0 静默、==55 走真身',
  },
  {
    desc: 'M1810 K5 PALAMCNG 爱慕档门槛抬（A < 500 改 A < 1）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: `        era.get(\`talent:\${target}:85\`) === 1 &&
        (A < 500 || game.system.反抗刻印回避 === 1)`,
    replace: `        era.get(\`talent:\${target}:85\`) === 1 &&
        (A < 1 || game.system.反抗刻印回避 === 1)`,
    tests: ['kojo-k5-mao'],
    must_mention: '主人的…进到小穴里面',
  },
  {
    desc: 'M1811 K5 SELF_KOJO 自慰入口错档（TFLAG:13 == 1 改 9）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  if (game.train.初吻与自我口上 === 1) {\n    // :6064',
    replace: '  if (game.train.初吻与自我口上 === 9) {\n    // :6064',
    tests: ['kojo-k5-mao'],
    must_mention: 'SELF_KOJO 自慰支出声',
  },
  {
    desc: 'M1812 K5 奖赏请求钱档入口错（要求奖赏 === 0 改 9）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  if (chara(a).stronghold.要求奖赏 === 0) {\n    // :7569',
    replace: '  if (chara(a).stronghold.要求奖赏 === 9) {\n    // :7569',
    tests: ['kojo-k5-mao'],
    must_mention: '尽可能多的钱',
  },
  {
    desc: 'M1813 K5 NTR P==1 入口错档（P === 1 改 9）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  if (P === 1) {\n    // :7367',
    replace: '  if (P === 9) {\n    // :7367',
    tests: ['kojo-k5-mao'],
    must_mention: '我明明只是个村娘',
  },
  {
    desc: 'M1814 K5 EVENTTRAIN 人类初调教推进写错（CFLAG:201 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.初调教 = 1; // :126',
    replace: '      kojo.初调教 = 2; // :126（变异）',
    tests: ['kojo-k5-mao'],
    must_mention: '推进 CFLAG:201',
  },

  {
    desc: 'M2118 K3 顶层 require com-hardcore（延迟 require 挪回文件头，#288）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: "const era = require('#/era-electron');",
    replace: `const era = require('#/era-electron');
const { piercing_state } = require('#/system/train/com-hardcore'); // 变异：顶层 require（#288 守卫的靶子）`,
    tests: ['top-level-wiring'],
    must_mention: '顶层 require：ere/kojo/kojo-k3-noble.js',
  },
  {
    desc: 'M2120 com-tentacle 顶层 require com-colosseum（延迟 require 挪回文件头，#288）',
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
  // —— #242（J32）：K11 莉莉口上模块 WIP 1/N（M2340-M2376 号段） ——
  {
    desc: 'M2340 K11 EVENTTRAIN #PRI 存在标志置位丢失（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    game.kojo.口上存在_11 = 1; // :102 FLAG:111 = 1（K11 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2;`,
    replace: `    // 变异：K11 口上存在标志置位丢失
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2;`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K11 一对）',
  },
  {
    desc: 'M2341 K11 EVENTEND #LATER 存在标志清零丢失（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    game.kojo.口上存在_11 = 0; // :108 FLAG:111 = 0
  },
  TIER.LATER,`,
    replace: `    // 变异：K11 口上存在标志清零丢失
  },
  TIER.LATER,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K11 一对）',
  },
  {
    desc: 'M2342 EVENTTRAIN 主体 FLAG:7 <= 0 守卫删（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
    if (era0('flag:7') <= 0) {
      return 0;
    }
    if (era0(\`talent:\${target}:171\`) != 1) {
      return 0;
    }`,
    replace: `    const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
    if (false) {
      // 变异：FLAG:7 <= 0 守卫删
      return 0;
    }
    if (era0(\`talent:\${target}:171\`) != 1) {
      return 0;
    }`,
    tests: ['kojo-k11-lily'],
    must_mention: '@EVENTTRAIN 守卫：FLAG:7 <= 0（口上总开关关闭）时静默跳过',
  },
  {
    desc: 'M2343 EVENTTRAIN 主体 TALENT:171 != 1 守卫删（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
    if (era0('flag:7') <= 0) {
      return 0;
    }
    if (era0(\`talent:\${target}:171\`) != 1) {
      return 0;
    }`,
    replace: `    const assi_name = chara_callname(assi); // %SAVESTR:ASSI%
    if (era0('flag:7') <= 0) {
      return 0;
    }
    if (false) {
      // 变异：TALENT:171 != 1 守卫删
      return 0;
    }`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '@EVENTTRAIN 守卫：TALENT:171 != 1（非莉莉专属素质）时静默跳过',
  },
  {
    desc: 'M2344 姉妹判定 CFLAG:TARGET:21 姐姐标记写错（317 改 316）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (assi > 0 && assi == 17) {
      era.set(\`cflag:\${target}:21\`, 317);
      era.set(\`cflag:\${assi}:21\`, 224);
    }`,
    replace: `    if (assi > 0 && assi == 17) {
      era.set(\`cflag:\${target}:21\`, 316); // 变异
      era.set(\`cflag:\${assi}:21\`, 224);
    }`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '初调教（CFLAG:201 == 0）：助手是玛奥时走姉妹相认分档，互标肉亲关系并置 CFLAG:202',
  },
  {
    desc: 'M2345 姉妹判定 CFLAG:ASSI:21 妹妹标记写错（224 改 223）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (assi > 0 && assi == 17) {
      era.set(\`cflag:\${target}:21\`, 317);
      era.set(\`cflag:\${assi}:21\`, 224);
    }`,
    replace: `    if (assi > 0 && assi == 17) {
      era.set(\`cflag:\${target}:21\`, 317);
      era.set(\`cflag:\${assi}:21\`, 223); // 变异
    }`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '初调教（CFLAG:201 == 0）：助手是玛奥时走姉妹相认分档，互标肉亲关系并置 CFLAG:202',
  },
  {
    desc: 'M2346 初调教推进 CFLAG:201 写错（1 改 2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      }
      era.set(\`cflag:\${target}:201\`, 1);
      return 1;`,
    replace: `      }
      era.set(\`cflag:\${target}:201\`, 2); // 变异
      return 1;`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '初调教（CFLAG:201 == 0）：无玛奥助手时走寻妹对峙分档，推进到 1',
  },
  {
    desc: 'M2347 魔族化推进写错（CFLAG:400 = 2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      // 魔族化（１回のみ，初回调教后、陷落前）
      await era.printAndWait(''); // :186-187 PRINTFORMW 空行
      era.set(\`cflag:\${target}:400\`, 2);
      return 1;`,
    replace: `      // 魔族化（１回のみ，初回调教后、陷落前）
      await era.printAndWait(''); // :186-187 PRINTFORMW 空行
      era.set(\`cflag:\${target}:400\`, 1); // 变异
      return 1;`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '魔族化（１回のみ）：CFLAG:201<5 且未魔族化时改造，CFLAG:400 = 2',
  },
  {
    desc: 'M2348 NTR再捕获（爱慕/淫乱臂）清零丢失（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (era0(\`talent:\${target}:85\`) || era0(\`talent:\${target}:76\`)) {
        era.drawLine();
        await era.printAndWait(''); // :196-198 PRINTFORMW 空行
        era.set(\`cflag:\${target}:650\`, 0);
      } else {`,
    replace: `      if (era0(\`talent:\${target}:85\`) || era0(\`talent:\${target}:76\`)) {
        era.drawLine();
        await era.printAndWait(''); // :196-198 PRINTFORMW 空行
        // 变异：CFLAG:650 清零丢失
      } else {`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'NTR再捕获（CFLAG:201>=1 && CFLAG:650==1）：爱慕臂清 NTR 开关',
  },
  {
    desc: 'M2349 屈服刻印Lv1推进写错（2 改 3）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      ); // :215
      era.set(\`cflag:\${target}:201\`, 2);
      return 1;`,
    replace: `      ); // :215
      era.set(\`cflag:\${target}:201\`, 3); // 变异
      return 1;`,
    tests: ['kojo-k11-lily'],
    must_mention: '屈服刻印分档（各 Lv 一次）：CFLAG:201 1→2、2→3、3→4',
  },
  {
    desc: 'M2350 屈服刻印Lv2推进写错（3 改 4）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      ); // :224
      era.set(\`cflag:\${target}:201\`, 3);
      return 1;`,
    replace: `      ); // :224
      era.set(\`cflag:\${target}:201\`, 4); // 变异
      return 1;`,
    tests: ['kojo-k11-lily'],
    must_mention: '屈服刻印分档（各 Lv 一次）：CFLAG:201 1→2、2→3、3→4',
  },
  {
    desc: 'M2351 屈服刻印Lv3推进写错（4 改 5）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      ); // :235
      era.set(\`cflag:\${target}:201\`, 4);
      return 1;`,
    replace: `      ); // :235
      era.set(\`cflag:\${target}:201\`, 5); // 变异
      return 1;`,
    tests: ['kojo-k11-lily'],
    must_mention: '屈服刻印分档（各 Lv 一次）：CFLAG:201 1→2、2→3、3→4',
  },
  {
    desc: 'M2352 淫乱推进写错（5 改 6）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      }
      era.set(\`cflag:\${target}:201\`, 5);
      return 1;`,
    replace: `      }
      era.set(\`cflag:\${target}:201\`, 6); // 变异
      return 1;`,
    tests: ['kojo-k11-lily'],
    must_mention: '淫乱：CFLAG:201 = 5，处女附注按 TALENT:0 分档',
  },
  {
    desc: 'M2353 淫乱+魔族化推进写错（6 改 7，调教前从魔族档）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `          await era.printAndWait(\`\${target_name}的双眼却露出了期待的光芒…\`); // :271-275
        }
        era.set(\`cflag:\${target}:201\`, 6);
        return 1;`,
    replace: `          await era.printAndWait(\`\${target_name}的双眼却露出了期待的光芒…\`); // :271-275
        }
        era.set(\`cflag:\${target}:201\`, 7); // 变异
        return 1;`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '淫乱+魔族化：调教前从魔族（CFLAG:400==1）分档，CFLAG:201 = 6',
  },
  {
    desc: 'M2354 爱慕推进写错（7 改 6）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      }
      era.set(\`cflag:\${target}:201\`, 7);
      return 1;`,
    replace: `      }
      era.set(\`cflag:\${target}:201\`, 6); // 变异
      return 1;`,
    tests: ['kojo-k11-lily'],
    must_mention: '爱慕：CFLAG:201 = 7',
  },
  {
    desc: 'M2355 崩坏推进写错（9 改 8）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      await era.printAndWait(\`「啊哈…呼呼…啊……哈哈……」\`); // :366
      era.set(\`cflag:\${target}:201\`, 9);
      return 1;`,
    replace: `      await era.printAndWait(\`「啊哈…呼呼…啊……哈哈……」\`); // :366
      era.set(\`cflag:\${target}:201\`, 8); // 变异
      return 1;`,
    tests: ['kojo-k11-lily'],
    must_mention: '崩坏（TALENT:9 == 1 && CFLAG:201 < 9）：CFLAG:201 = 9',
  },
  {
    desc: 'M2356 崩坏后二回目以降 CALL K11_KOJO2 丢失（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (era0(\`talent:\${target}:9\`) == 1) {
      // 崩坏后（已崩坏，二回目以降）
      await k11_kojo2(); // :370-371 CALL K11_KOJO2
    } else if (assi < 0) {`,
    replace: `    } else if (era0(\`talent:\${target}:9\`) == 1) {
      // 变异：崩坏后 CALL K11_KOJO2 丢失
    } else if (assi < 0) {`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '崩坏后（TALENT:9==1 且 CFLAG:201==9）改走 K11_KOJO2，不再打崩坏台词',
  },
  {
    desc: 'M2357 无助手 CALL K11_KOJO2 丢失（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (assi < 0) {
      // 无助手
      await k11_kojo2(); // :373-374 CALL K11_KOJO2
    } else if (era0(\`talent:\${MASTER}:122\`) == 0) {`,
    replace: `    } else if (assi < 0) {
      // 变异：无助手 CALL K11_KOJO2 丢失
    } else if (era0(\`talent:\${MASTER}:122\`) == 0) {`,
    tests: ['kojo-k11-lily'],
    must_mention: '无助手（ASSI < 0）时岔去 K11_KOJO2，不进简易助手分支',
  },
  {
    desc: 'M2358 主人非男性 CALL K11_KOJO2 丢失（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (era0(\`talent:\${MASTER}:122\`) == 0) {
      // 主人非男性时二回目以降（简易助手口上不适用）
      await k11_kojo2(); // :383-384 CALL K11_KOJO2
    } else if (assi == 17) {`,
    replace: `    } else if (era0(\`talent:\${MASTER}:122\`) == 0) {
      // 变异：主人非男性 CALL K11_KOJO2 丢失
    } else if (assi == 17) {`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '主人非男性（TALENT:MASTER:122==0）时岔去 K11_KOJO2，不进简易助手分支',
  },
  {
    desc: 'M2359 助手非玛奥 CALL K11_KOJO2 丢失（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else {
      // 口上のある助手が居ない場合（助手非玛奥，或无助手专属口上）
      await k11_kojo2(); // :507-508 CALL K11_KOJO2
    }`,
    replace: `    } else {
      // 变异：助手非玛奥 CALL K11_KOJO2 丢失
    }`,
    tests: ['kojo-k11-lily'],
    must_mention: '助手非玛奥时岔去 K11_KOJO2，不进简易助手分支',
  },
  {
    desc: 'M2360 助手玛奥初めて それ以外 CFLAG:202 推进写错（1 改 2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `          era.set(\`cflag:\${target}:202\`, 1);
        }
        return 1;`,
    replace: `          era.set(\`cflag:\${target}:202\`, 2); // 变异
        }
        return 1;`,
    tests: ['kojo-k11-lily'],
    must_mention: '助手玛奥初めて：未持爱慕/淫乱时それ以外分档，CFLAG:202 = 1',
  },
  {
    desc: 'M2361 助手玛奥初めて 陷落事件（已持爱慕）CFLAG:202 推进写错（2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `            ); // :407
          }
          era.set(\`cflag:\${target}:202\`, 2);
        } else if (
          era0(\`talent:\${target}:76\`) == 1 &&`,
    replace: `            ); // :407
          }
          era.set(\`cflag:\${target}:202\`, 1); // 变异
        } else if (
          era0(\`talent:\${target}:76\`) == 1 &&`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '助手玛奥初めて：已持爱慕且 CFLAG:201>=5 时陷落事件分档，CFLAG:202 = 2',
  },
  {
    desc: 'M2362 助手玛奥二回目以降（爱慕）CFLAG:202 推进写错（2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `            \`看着已经彻底变样了的姐姐，\${assi_name}微笑了起来………\`,
          ); // :464
          era.set(\`cflag:\${target}:202\`, 2);
        } else if (era0(\`talent:\${target}:76\`) == 1) {`,
    replace: `            \`看着已经彻底变样了的姐姐，\${assi_name}微笑了起来………\`,
          ); // :464
          era.set(\`cflag:\${target}:202\`, 1); // 变异
        } else if (era0(\`talent:\${target}:76\`) == 1) {`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '助手玛奥二回目以降：CFLAG:202==1 且爱慕时进一步陷落，CFLAG:202 = 2',
  },
  {
    desc: 'M2363 助手玛奥それ以外（拒绝分档）误改为推进 CFLAG:202（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        await era.printAndWait(\`「不要…不要不要不要啊…神啊，救救我………」\`); // :503
        return 1;`,
    replace: `        await era.printAndWait(\`「不要…不要不要不要啊…神啊，救救我………」\`); // :503
        era.set(\`cflag:\${target}:202\`, 2); // 变异：原作それ以外不推进
        return 1;`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '助手玛奥それ以外（未持爱慕/淫乱、CFLAG:202==1）：拒绝分档，不改 CFLAG:202',
  },
  {
    desc: 'M2364 K11_KOJO2 崩坏判据错格（TALENT:9==1 改 ==0）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  if (era0(\`talent:\${target}:9\`) == 1 && era0('flag:7') == 2) {
    // 崩坏
    era.drawLine();`,
    replace: `  if (era0(\`talent:\${target}:9\`) == 0 && era0('flag:7') == 2) {
    // 变异：崩坏判据错格
    era.drawLine();`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '崩坏后（TALENT:9==1 且 CFLAG:201==9）改走 K11_KOJO2，不再打崩坏台词',
  },
  {
    desc: 'M2365 K11_KOJO2 反発刻印Lv3判据错格（MARK:3==3 改 ==2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    return 1;
  } else if (era0(\`mark:\${target}:3\`) == 3 && era0('flag:7') == 2) {
    // 反発刻印Lv3`,
    replace: `    return 1;
  } else if (era0(\`mark:\${target}:3\`) == 2 && era0('flag:7') == 2) {
    // 变异：反発刻印Lv3判据错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'K11_KOJO2：反発刻印Lv3',
  },
  {
    desc: 'M2366 K11_KOJO2 屈服刻印Lv3＋爱慕/淫乱無し CFLAG:202 分档条件颠倒（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    era.drawLine();
    if (era0(\`cflag:\${target}:202\`) >= 1) {
      if (rand_n(2) == 0) {
        await era.printAndWait(
          \`「原来你就是用这种方式……把我的妹妹……变成那个样子的吗……」\`,`,
    replace: `    era.drawLine();
    if (era0(\`cflag:\${target}:202\`) < 1) {
      // 变异：条件颠倒
      if (rand_n(2) == 0) {
        await era.printAndWait(
          \`「原来你就是用这种方式……把我的妹妹……变成那个样子的吗……」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'K11_KOJO2：屈服刻印Lv3＋爱慕/淫乱無し，按 CFLAG:202 是否见过妹妹分档',
  },
  {
    desc: 'M2367 K11_KOJO2 淫乱分支守卫错格（TALENT:76==1 改 ==0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  } else if (era0(\`talent:\${target}:76\`) == 1 && era0('flag:7') == 2) {
    // 淫乱（含魔族化分支）`,
    replace: `  } else if (era0(\`talent:\${target}:76\`) == 0 && era0('flag:7') == 2) {
    // 变异：淫乱分支守卫错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'K11_KOJO2：淫乱含魔族化分支',
  },
  {
    desc: 'M2368 K11_KOJO2 爱慕分支守卫错格（TALENT:85==1 改 ==0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  } else if (era0(\`talent:\${target}:85\`) == 1 && era0('flag:7') == 2) {
    // 爱慕（含魔族化分支）`,
    replace: `  } else if (era0(\`talent:\${target}:85\`) == 0 && era0('flag:7') == 2) {
    // 变异：爱慕分支守卫错格`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'K11_KOJO2：爱慕分档（RAND 三选一，落到隐式 RETURN 0 前提早覆盖为 return 1）',
  },

  {
    desc: 'M2369 EVENTEND 主体 FLAG:7 <= 0 守卫删（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
    if (era0('flag:7') <= 0) {
      return 0;
    }
    if (era0(\`talent:\${target}:171\`) != 1) {
      return 0;
    }
    if (era0(\`base:\${target}:0\`) <= 0) {
      return 0;
    }`,
    replace: `    const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
    if (false) {
      // 变异：FLAG:7 <= 0 守卫删
      return 0;
    }
    if (era0(\`talent:\${target}:171\`) != 1) {
      return 0;
    }
    if (era0(\`base:\${target}:0\`) <= 0) {
      return 0;
    }`,
    tests: ['kojo-k11-lily'],
    must_mention: '@EVENTEND 守卫：FLAG:7 <= 0（口上总开关关闭）时静默跳过',
  },
  {
    desc: 'M2370 EVENTEND 主体 TALENT:171 != 1 守卫删（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
    if (era0('flag:7') <= 0) {
      return 0;
    }
    if (era0(\`talent:\${target}:171\`) != 1) {
      return 0;
    }
    if (era0(\`base:\${target}:0\`) <= 0) {
      return 0;
    }`,
    replace: `    const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
    if (era0('flag:7') <= 0) {
      return 0;
    }
    if (false) {
      // 变异：TALENT:171 != 1 守卫删
      return 0;
    }
    if (era0(\`base:\${target}:0\`) <= 0) {
      return 0;
    }`,
    tests: ['kojo-k11-lily'],
    must_mention: '@EVENTEND 守卫：TALENT:171 != 1（非莉莉专属素质）时静默跳过',
  },
  {
    desc: 'M2371 EVENTEND 死亡守卫删（BASE:0 <= 0 不再跳过）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (era0(\`talent:\${target}:171\`) != 1) {
      return 0;
    }
    if (era0(\`base:\${target}:0\`) <= 0) {
      return 0;
    }`,
    replace: `    if (era0(\`talent:\${target}:171\`) != 1) {
      return 0;
    }
    if (false) {
      // 变异：BASE:0 <= 0 死亡守卫删
      return 0;
    }`,
    tests: ['kojo-k11-lily'],
    must_mention: '@EVENTEND：角色死亡（BASE:0<=0）时跳过口上',
  },
  {
    desc: 'M2372 EVENTEND 崩坏判据错格（TALENT:9==1 改 ==0）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (era0(\`talent:\${target}:9\`) == 1 && era0('flag:7') == 2) {
      // 崩坏
      era.drawLine();
      await era.printAndWait(\`「咕嘿……咕嘿嘿嘿………」\`); // :663-667`,
    replace: `    if (era0(\`talent:\${target}:9\`) == 0 && era0('flag:7') == 2) {
      // 变异：崩坏判据错格
      era.drawLine();
      await era.printAndWait(\`「咕嘿……咕嘿嘿嘿………」\`); // :663-667`,
    tests: ['kojo-k11-lily'],
    must_mention: '@EVENTEND：崩坏分档',
  },
  {
    desc: 'M2373 EVENTEND 反発刻印Lv3+爱慕无 CFLAG:202 分档条件颠倒（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      era.drawLine();
      if (era0(\`cflag:\${target}:202\`) >= 1) {
        await era.printAndWait(\`「我，我是绝对不会认输的……」\`); // :674`,
    replace: `      era.drawLine();
      if (era0(\`cflag:\${target}:202\`) < 1) {
        // 变异：条件颠倒
        await era.printAndWait(\`「我，我是绝对不会认输的……」\`); // :674`,
    tests: ['kojo-k11-lily'],
    must_mention: '@EVENTEND：反発刻印Lv3+爱慕无，按 CFLAG:202 分支',
  },
  {
    desc: 'M2374 EVENTEND 淫乱体力500分档阈值改错（>= 500 改 >= 700）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era0(\`talent:\${target}:76\`) == 1 &&
      era0(\`base:\${target}:0\`) >= 500
    ) {
      // 淫乱(体力500以上)`,
    replace: `    } else if (
      era0(\`talent:\${target}:76\`) == 1 &&
      era0(\`base:\${target}:0\`) >= 700 // 变异
    ) {
      // 淫乱(体力500以上)`,
    tests: ['kojo-k11-lily'],
    must_mention: '@EVENTEND：淫乱按体力 500 分档',
  },
  {
    desc: 'M2375 EVENTEND 爱慕体力500分档阈值改错（>= 500 改 >= 700）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era0(\`talent:\${target}:85\`) == 1 &&
      era0(\`base:\${target}:0\`) >= 500
    ) {
      // 爱慕(体力500以上)`,
    replace: `    } else if (
      era0(\`talent:\${target}:85\`) == 1 &&
      era0(\`base:\${target}:0\`) >= 700 // 变异
    ) {
      // 爱慕(体力500以上)`,
    tests: ['kojo-k11-lily'],
    must_mention: '@EVENTEND：爱慕按体力 500 分档',
  },
  {
    desc: 'M2376 主启动图删 K11 莉莉口上注册（KOJO 11 不进实际运行图）（#242）',
    file: 'ere/system/flow/main-loop.js',
    find: `require('#/kojo/kojo-k11-lily');`,
    replace: `// 变异：K11 莉莉口上不在主启动图注册`,
    tests: ['kojo-k11-lily'],
    must_mention:
      '经主启动图 main-loop 加载（而非直接 load_module），K11 EVENTTRAIN 仍会置存在标志',
  },
  // —— #242（J32 续轮）：K11 莉莉口上 KOJO_MESSAGE_COM_11 头部守卫 +
  // SELECTCOM 0/1/2（M2377-M2401 号段） ——
  {
    desc: 'M2377 COM_11 助手非玛奥守卫删（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  // :755-758 助手マオ以外が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay && era_flag.assi !== 17) {
    return 0;
  }`,
    replace: `  // 变异：助手非玛奥守卫删`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM_11 守卫：助手非玛奥调教时静默跳过',
  },
  {
    desc: 'M2378 COM_11 口塞守卫删（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  // :758-759 ボールギャグ着用時には口上をスキップする（SELECTCOM==45 自己说话不算）
  if (era.get(\`tequip:\${target}:45\`) && era_flag.selectcom !== 45) {
    return 0;
  }`,
    replace: `  // 变异：口塞守卫删`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM_11 守卫：口塞中（非口塞指令）静默跳过',
  },
  {
    desc: 'M2379 COM_11 失神守卫删（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  // :761-763 失神時には口上をスキップする
  if (game.train.失神) {
    return 0;
  }`,
    replace: `  // 变异：失神守卫删`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM_11 守卫：失神中静默跳过',
  },
  {
    desc: 'M2380 COM_11 兽奸守卫改走真实台词而非存根（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  if (era.get(\`tequip:\${target}:89\`)) {
    stub_line('DOG_KOJO_11', '兽奸调教中的专用口上');
    return 0;
  }`,
    replace: `  if (era.get(\`tequip:\${target}:89\`)) {
    // 变异：兽奸守卫改走 COM0 分支
  }`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM_11 守卫：兽奸中改走存根占位（DOG_KOJO_11）',
  },
  {
    desc: 'M2381 COM_11 死斗场守卫改走真实台词而非存根（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  if (era.get(\`tequip:\${target}:55\`)) {
    stub_line('COLOSSEUM_KOJO_11', '死斗场调教中的专用口上');
    return 0;
  }`,
    replace: `  if (era.get(\`tequip:\${target}:55\`)) {
    // 变异：死斗场守卫改走 COM0 分支
  }`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM_11 守卫：死斗场中改走存根占位（COLOSSEUM_KOJO_11）',
  },
  {
    desc: 'M2382 COM_11 崩坏守卫删（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  // :774-776 崩坏した場合は口上をスキップする
  if (era.get(\`talent:\${target}:9\`) === 1) {
    return 0;
  }`,
    replace: `  // 变异：崩坏守卫删`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM_11 守卫：崩坏后静默跳过',
  },
  {
    desc: 'M2383 COM_11 触手守卫删（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  // :777-780 触手調教中は口上をスキップする
  if (era.get(\`tequip:\${target}:90\`)) {
    return 0;
  }`,
    replace: `  // 变异：触手守卫删`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM_11 守卫：触手调教中静默跳过',
  },
  {
    desc: 'M2384 COM0 初めて助手玛奥判据错格（ASSIPLAY 丢失，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  const assi_mao =
    era_flag.assi > 0 && era_flag.assiplay && era_flag.assi === 17;`,
    replace: `  const assi_mao = era_flag.assi > 0 && era_flag.assi === 17; // 变异：ASSIPLAY 丢失`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM0 初めて：ASSI 是玛奥但 ASSIPLAY 为 0 时不算助手玛奥分档',
  },
  {
    desc: 'M2385 COM0 初めて屈服刻印Lv2以上判据错格（>=2 改 >=3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (mark(2) >= 2) {
        // 屈服刻印Lv2以上`,
    replace: `      } else if (mark(2) >= 3) {
        // 变异：屈服刻印Lv2以上判据错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM0 初めて：屈服刻印恰为 Lv2（非 Lv3）也命中温柔分档',
  },
  {
    desc: 'M2386 COM0 初めて CFLAG:301 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.爱抚 = 1; // :800-802`,
    replace: `      kojo.爱抚 = 0; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM0 初めて：それ以外（非助手玛奥、屈服刻印Lv2未満）推进到 1',
  },
  {
    desc: 'M2387 COM0 二回目助手玛奥+淫乱上限判据错格（<=5 改 <=4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          \`『姐姐终于坦率地面对自己的欲望了呢，我真为你高兴\${heart(1)}』\`,
        ); // :810`,
    replace: `      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2) // 变异：上限错格
      ) {
        // 淫乱
        await era.printAndWait(
          \`『姐姐终于坦率地面对自己的欲望了呢，我真为你高兴\${heart(1)}』\`,
        ); // :810`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM0 二回目：助手玛奥+淫乱恰在 CFLAG:301==5 时仍命中（<=5 含边界）',
  },
  {
    desc: 'M2388 COM0 二回目屈服刻印Lv3判据错格（==3 改 ==2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (mark(2) === 3 && (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv3`,
    replace: `    } else if (mark(2) === 2 && (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)) {
      // 变异：屈服刻印Lv3判据错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM0 二回目：非助手玛奥 + 屈服刻印Lv3 推进到 4',
  },
  {
    desc: 'M2389 COM0 二回目それ以外 RAND:2 条件颠倒（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      await era.printAndWait(\`「一，一点舒服的感觉都没有…嗯啊…啊啊！」\`); // :854
      if (rand_n(2)) {`,
    replace: `      await era.printAndWait(\`「一，一点舒服的感觉都没有…嗯啊…啊啊！」\`); // :854
      if (!rand_n(2)) {
        // 变异：RAND:2 条件颠倒`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM0 二回目：非助手玛奥 + それ以外（RAND:2 追加句可控）',
  },
  {
    desc: 'M2390 COM1 初めて处女判据错格（==1 改 ==0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    const virgin = era.get(\`talent:\${target}:0\`) === 1;`,
    replace: `    const virgin = era.get(\`talent:\${target}:0\`) === 0; // 变异：处女判据错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM1 初めて：处女 + 非助手玛奥推进到 1',
  },
  {
    desc: 'M2391 COM1 初めて CFLAG:302 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.舔阴 = 1; // :890-893`,
    replace: `      kojo.舔阴 = 0; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM1 初めて：处女 + 非助手玛奥推进到 1',
  },
  {
    desc: 'M2392 COM1 RAND:2 三目分支写反（TERN_LICK_1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        const lick_line_1 = rand_n(2)
          ? '舔姐姐的这里，我也觉得很舒服哦'
          : '啊哈，姐姐感觉很舒服吧♪';`,
    replace: `        const lick_line_1 = rand_n(2)
          ? '啊哈，姐姐感觉很舒服吧♪' // 变异：分支写反
          : '舔姐姐的这里，我也觉得很舒服哦';`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM1 二回目：助手玛奥 + 淫乱，RAND:2 三目分岔可控',
  },
  {
    desc: 'M2393 COM1 二回目反抗刻印Lv1以上判据错格（>=1 改 >=2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      mark(3) >= 1 &&
      mark(2) <= 2 &&
      (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2)`,
    replace: `      mark(3) >= 2 && // 变异：反抗刻印Lv1以上判据错格
      mark(2) <= 2 &&
      (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM1 二回目：反抗刻印恰为 Lv1（非 Lv2）也命中反抗分档',
  },
  {
    desc: 'M2394 COM1 二回目それ以外 CFLAG:302 写错（2 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.舔阴 = 2; // :943`,
    replace: `      kojo.舔阴 = 3; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM1 二回目：非助手玛奥 + それ以外（屈服刻印Lv3未満）推进到 2',
  },
  {
    desc: 'M2395 COM2 初めて助手玛奥台词分档判据错格（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (kojo.肛门爱抚 === 0) {
      if (assi_mao) {`,
    replace: `    if (kojo.肛门爱抚 === 0) {
      if (!assi_mao) {
        // 变异：助手玛奥判据颠倒`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM2 初めて：非助手玛奥推进到 1',
  },
  {
    desc: 'M2396 COM2 二回目润滑值丢失 UP:3（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    const p = chara(target).train.润滑 + chara(target).train.润滑增量; // :968 P = PALAM:3 + UP:3`,
    replace: `    const p = chara(target).train.润滑; // 变异：润滑增量 UP:3 丢失`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM2 二回目：润滑增量（delta:3 / UP:3）与本体（palam:3）合计才达阈值',
  },
  {
    desc: 'M2397 COM2 二回目淫乱+润滑高判据错格（PALAMLV[2] 改 [1]，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (
      era.get(\`talent:\${target}:76\`) === 1 &&
      p >= PALAMLV[2] &&
      (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱+润滑Lv2以上`,
    replace: `    if (
      era.get(\`talent:\${target}:76\`) === 1 &&
      p >= PALAMLV[1] && // 变异：润滑阈值错格
      (kojo.肛门爱抚 <= 6 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱+润滑Lv2以上`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM2 二回目：淫乱+润滑Lv1（未达Lv2）走低润滑分档，不误入高润滑分档',
  },
  {
    desc: 'M2398 COM2 二回目 CFLAG:303 写错（7 改 6，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.肛门爱抚 = 7; // :982`,
    replace: `      kojo.肛门爱抚 = 6; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM2 二回目：淫乱 + 润滑Lv2以上推进到 7',
  },
  {
    desc: 'M2399 COM2 二回目それ以外判据错格（首次耻情Lv2 <=1 改 <=0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 === 2) {`,
    replace: `    } else if (kojo.首次耻情Lv2 <= 0 || game.kojo.口上开关 === 2) {
      // 变异：それ以外判据错格`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM2 二回目：それ以外恰在 CFLAG:223==1 时仍命中（<=1 含边界）',
  },
  {
    desc: 'M2400 COM2 二回目それ以外 CFLAG:303 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.肛门爱抚 = 2; // :1039`,
    replace: `      kojo.肛门爱抚 = 1; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM2 二回目：それ以外（爱慕無し、润滑Lv2未満、A感覚Lv3未満）推进到 2',
  },
  {
    desc: 'M2401 主启动图删 K11 莉莉指令口上族注册（KOJO_MESSAGE_COM_11 不进实际运行图，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `kojo_message_com_family.register(11, kojo_message_com_11);`,
    replace: `// 变异：COM_11 分发注册删`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM0 初めて：それ以外（非助手玛奥、屈服刻印Lv2未満）推进到 1',
  },
  {
    desc: 'M2200 K9 EVENTTRAIN #PRI 存在标志错值（FLAG:109 = 1 改 0，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `    game.kojo.口上存在_9 = 1; // :56 FLAG:109 = 1（K9 口上存在标志）`,
    replace: `    game.kojo.口上存在_9 = 0; // 变异：:56 FLAG:109 = 1（K9 口上存在标志）`,
    tests: ['kojo-k9-diamond'],
    must_mention: 'K9 存在标志',
  },
  {
    desc: 'M2201 K9 EVENTEND #LATER 清标志删除（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `    game.kojo.口上存在_9 = 0; // :62
  },
  TIER.LATER,
);`,
    replace: `    // 变异：:62 清标志删除
  },
  TIER.LATER,
);`,
    tests: ['kojo-k9-diamond'],
    must_mention: 'K9 一对',
  },
  {
    desc: 'M2202 K9 初調教人间分档推进值错（CFLAG:201 = 1 改 2，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `    // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :95
    kojo.初调教 = 1; // :95`,
    replace: `    // 变异
    kojo.初调教 = 2; // :95`,
    tests: ['kojo-k9-diamond'],
    must_mention: 'CFLAG:201 推进到 1',
  },
  {
    desc: 'M2203 K9 初調教魔族分档判据错格（TALENT:314 == 9 改 8，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `    if (era.get(\`talent:\${target}:314\`) == 9) {
      // :78-79
      await era.printAndWait(\`\${target_name}在调教之前，被进行了魔族化改造。\`); // :79`,
    replace: `    if (era.get(\`talent:\${target}:314\`) == 8) { // 变异
      // :78-79
      await era.printAndWait(\`\${target_name}在调教之前，被进行了魔族化改造。\`); // :79`,
    tests: ['kojo-k9-diamond'],
    must_mention: '魔族化标记',
  },
  {
    desc: 'M2204 K9 魔族化（１回のみ）改造标记写错（CFLAG:370 = 2 改 3，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `      // CFLAG:370  = 1（变量语义：CFLAG 族，370） // :85
      kojo.魔族化 = 1; // :85`,
    replace: `      // 变异
      kojo.魔族化 = 2; // :85`,
    tests: ['kojo-k9-diamond'],
    must_mention: '魔族化标记',
  },
  {
    desc: 'M2205 K9 NTR再捕获爱慕支解除标记写错（CFLAG:650 = 0 改 1，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `      // CFLAG:650  = 0（变量语义：CFLAG 族，650） // :120-122
      kojo.NTR再捕获 = 0; // :120-122
    } else {`,
    replace: `      // 变异
      kojo.NTR再捕获 = 1; // :120-122
    } else {`,
    tests: ['kojo-k9-diamond'],
    must_mention: 'NTR 开关清 0',
  },
  {
    desc: 'M2206 K9 屈服刻印Lv1推进值错（CFLAG:201 = 2 改 3，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `    // CFLAG:201  = 2（变量语义：CFLAG 族，201） // :143
    kojo.初调教 = 2; // :143`,
    replace: `    // 变异
    kojo.初调教 = 3; // :143`,
    tests: ['kojo-k9-diamond'],
    must_mention: 'CFLAG:201 推进到 2',
  },
  {
    desc: 'M2207 K9 崩坏推进值错（CFLAG:201 = 9 改 8，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `    // CFLAG:201  = 9（变量语义：CFLAG 族，201） // :326
    kojo.初调教 = 9; // :326`,
    replace: `    // 变异
    kojo.初调教 = 8; // :326`,
    tests: ['kojo-k9-diamond'],
    must_mention: 'CFLAG:201 推进到 9',
  },
  {
    desc: 'M2208 K9 崩坏只播一次守卫删松（CFLAG:201 < 9 改 <= 9，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  } else if (era.get(\`talent:\${target}:9\`) == 1 && kojo.初调教 < 9) {
    // :320`,
    replace: `  } else if (era.get(\`talent:\${target}:9\`) == 1 && kojo.初调教 <= 9) { // 变异
    // :320`,
    tests: ['kojo-k9-diamond'],
    must_mention: '崩坏只播一次',
  },
  {
    desc: 'M2209 K9 简易助手（黑方片本人）首次推进值错（CFLAG:202 = 1 改 2，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `        // CFLAG:202  = 1（变量语义：CFLAG 族，202） // :375
        kojo.简易助手_0 = 1; // :375`,
    replace: `        // 变异
        kojo.简易助手_0 = 2; // :375`,
    tests: ['kojo-k9-diamond'],
    must_mention: 'CFLAG:202 首次推进到 1',
  },
  {
    desc: 'M2210 K9 头部守卫①：ASSI>0&&ASSIPLAY 删除（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (era_flag.assi > 0 && era_flag.assiplay) {
    // :880-882
    return 0; // :880-882
  } // :880-882`,
    replace: `  if (false) { // 变异：ASSI>0&&ASSIPLAY 删除
    // :880-882
    return 0; // :880-882
  } // :880-882`,
    tests: ['kojo-k9-diamond'],
    must_mention: '头部守卫',
  },
  {
    desc: 'M2211 K9 头部守卫②：TEQUIP:45 口塞守卫删除（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (era.get(\`tequip:\${target}:45\`) && era_flag.selectcom != 45) {
    // :882-883
    return 0; // :882-883
  } // :882-883`,
    replace: `  if (false) { // 变异：TEQUIP:45 口塞守卫删除
    // :882-883
    return 0; // :882-883
  } // :882-883`,
    tests: ['kojo-k9-diamond'],
    must_mention: '头部守卫',
  },
  {
    desc: 'M2212 K9 头部守卫③：TFLAG:899 失神删除（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (game.train.失神) {
    // :886-887
    return 0; // :886-887
  } // :886-887`,
    replace: `  if (false) { // 变异：TFLAG:899 失神删除
    // :886-887
    return 0; // :886-887
  } // :886-887`,
    tests: ['kojo-k9-diamond'],
    must_mention: '头部守卫',
  },
  {
    desc: 'M2213 K9 头部守卫④：TEQUIP:89 不再岔去 DOG_KOJO_9（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (era.get(\`tequip:\${target}:89\`)) {
    // :887-888
    // 兽奸PLAY中は専用口上
    await dog_kojo_9(rand_n);
    return 0; // :889-890
  } // :891-892`,
    replace: `  if (false) { // 变异：TEQUIP:89 不再岔去 DOG_KOJO_9
    // :887-888
    // 兽奸PLAY中は専用口上
    await dog_kojo_9(rand_n);
    return 0; // :889-890
  } // :891-892`,
    tests: ['kojo-k9-diamond'],
    must_mention: '全篇为未填写模板',
  },
  {
    desc: 'M2214 K9 头部守卫⑤：TEQUIP:55 不再岔去 COLOSSEUM_KOJO_9（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (era.get(\`tequip:\${target}:55\`)) {
    // :892-893
    // 死斗场中は専用口上
    await colosseum_kojo_9(rand_n);
    return 0; // :894-895
  } // :894-896`,
    replace: `  if (false) { // 变异：TEQUIP:55 不再岔去 COLOSSEUM_KOJO_9
    // :892-893
    // 死斗场中は専用口上
    await colosseum_kojo_9(rand_n);
    return 0; // :894-895
  } // :894-896`,
    tests: ['kojo-k9-diamond'],
    must_mention: '连站起来的力气都没有了',
  },
  {
    desc: 'M2215 K9 头部守卫⑥：TALENT:9 崩坏删除（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (era.get(\`talent:\${target}:9\`) == 1) {
    // :894-899
    return 0; // :894-899
  } // :894-899`,
    replace: `  if (false) { // 变异：TALENT:9 崩坏删除
    // :894-899
    return 0; // :894-899
  } // :894-899`,
    tests: ['kojo-k9-diamond'],
    must_mention: '头部守卫',
  },
  {
    desc: 'M2216 K9 头部守卫⑦：TEQUIP:90 触手删除（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (era.get(\`tequip:\${target}:90\`)) {
    // :902-905
    return 0; // :902-905
  } // :902-905`,
    replace: `  if (false) { // 变异：TEQUIP:90 触手删除
    // :902-905
    return 0; // :902-905
  } // :902-905`,
    tests: ['kojo-k9-diamond'],
    must_mention: '头部守卫',
  },
  {
    desc: 'M2217 K9 SELECTCOM==0 爱抚初回推进值错（CFLAG:301 = 1 改 2，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :918-920
      kojo.爱抚 = 1; // :918-920
      return 0; // :918-921`,
    replace: `      // 变异
      kojo.爱抚 = 2; // :918-920
      return 0; // :918-921`,
    tests: ['kojo-k9-diamond'],
    must_mention: 'CFLAG:301 推进到 1',
  },
  {
    desc: 'M2218 K9 SELECTCOM==87 穿环 P==1 判据错格（改 P==9，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `          if (P == 1) {
            // :4930-4932
            await era.printAndWait(
              \`「嗯哼哼~、怎样呀~…真是跟现在的我特别合适的装饰品呢…\${heart(1)}」\`,
            ); // :4933`,
    replace: `          if (P == 9) { // 变异
            // :4930-4932
            await era.printAndWait(
              \`「嗯哼哼~、怎样呀~…真是跟现在的我特别合适的装饰品呢…\${heart(1)}」\`,
            ); // :4933`,
    tests: ['kojo-k9-diamond'],
    must_mention: 'P==1 乳环文案缺失',
  },
  {
    desc: 'M2219 K9 COLOSSEUM ITEM:4 回退成 ITEM:PBAND 具名寻址（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `        era.get(\`talent:\${assi}:121\`) != 1 &&
        era.get(\`talent:\${assi}:122\`) != 1 &&
        era.get(\`item:\${PBAND}\`) == 1
      ) {
        // :7089
        await era.print(\`假阴茎\`); // :7089`,
    replace: `        era.get(\`talent:\${assi}:121\`) != 1 &&
        era.get(\`talent:\${assi}:122\`) != 1 &&
        era.get('item:PBAND') == 1 && // 变异：回退成具名寻址（不解析）
        true
      ) {
        // :7089
        await era.print(\`假阴茎\`); // :7089`,
    tests: ['kojo-k9-diamond'],
    must_mention: '假阴茎判定丢失',
  },
  {
    desc: 'M2220 K9 PALAMCNG 首超阈值状态写错（CFLAG:221 = 1 改 2，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221） // :6068
    kojo.首次润滑Lv2 = 1; // :6068`,
    replace: `    // 变异
    kojo.首次润滑Lv2 = 2; // :6068`,
    tests: ['kojo-k9-diamond'],
    must_mention: 'CFLAG:221 首超推进到 1',
  },
  {
    desc: 'M2221 K9 MARKCNG 苦痛刻印Lv3判据错格（苦痛刻印变动 == 3 改 4，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {
    // :6334`,
    replace: `  if (game.system.苦痛刻印变动 == 4 && kojo.苦痛刻印Lv3 == 0) { // 变异
    // :6334`,
    tests: ['kojo-k9-diamond'],
    must_mention: '好痛呜呜',
  },
  {
    desc: 'M2222 K9 SELF_KOJO TFLAG:13==1 崩坏分支判据错格（TALENT:9==1 改 TALENT:9==9，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `    if (era.get(\`talent:\${target}:9\`) == 1) {
      // :6402-6403
      await era.printAndWait(\`\${target_name}就像被弄坏的玩具一样不停地自慰………\`); // :6403
    } else if (q == 1) {`,
    replace: `    if (era.get(\`talent:\${target}:9\`) == 9) { // 变异
      // :6402-6403
      await era.printAndWait(\`\${target_name}就像被弄坏的玩具一样不停地自慰………\`); // :6403
    } else if (q == 1) {`,
    tests: ['kojo-k9-diamond'],
    must_mention: '不停地自慰',
  },
  {
    desc: 'M2223 K9 SELF_KOJO 跨模块全局 S 阈值错（s >= 3 改 s >= 9，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `      if (s >= 3) {
        // :6540`,
    replace: `      if (s >= 9) { // 变异
        // :6540`,
    tests: ['kojo-k9-diamond'],
    must_mention: 'S 阈值判定丢失',
  },
  {
    desc: 'M2224 K9 DUNGEON_VICTORY 体力低于五成追加台词阈值错（50 改 5，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `    (era.get(\`base:\${a}:0\`) * 100) / era.get(\`maxbase:\${a}:0\`) < 50 ||
    (era.get(\`base:\${a}:1\`) * 100) / era.get(\`maxbase:\${a}:1\`) < 50
  ) {
    // :6891`,
    replace: `    (era.get(\`base:\${a}:0\`) * 100) / era.get(\`maxbase:\${a}:0\`) < 5 || // 变异
    (era.get(\`base:\${a}:1\`) * 100) / era.get(\`maxbase:\${a}:1\`) < 5
  ) {
    // :6891`,
    tests: ['kojo-k9-diamond'],
    must_mention: '难看的胜利',
  },
  {
    desc: 'M2225 K9 DUNGEON_ATTACK CFLAG:1（invasion.状态）判据错格（== 2 改 9，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (chara(target).invasion.状态 == 2) {
    // :6909`,
    replace: `  if (chara(target).invasion.状态 == 9) { // 变异
    // :6909`,
    tests: ['kojo-k9-diamond'],
    must_mention: '接招吧',
  },
  {
    desc: 'M2226 K9 DUNGEON_RYOUZYOKU 处女判据错格（TALENT:0 == 1 改 2，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (era.get(\`talent:\${target}:0\`) == 1) {
    // :6802-6803`,
    replace: `  if (era.get(\`talent:\${target}:0\`) == 2) { // 变异
    // :6802-6803`,
    tests: ['kojo-k9-diamond'],
    must_mention: '不会将第一次交给你们',
  },
  {
    desc: 'M2227 K9 GOHOUBI_REQUEST CFLAG:A:504 判据错格（== 0 改 1，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (chara(a).stronghold.要求奖赏 == 0) {
    // :7408-7409`,
    replace: `  if (chara(a).stronghold.要求奖赏 == 1) { // 变异
    // :7408-7409`,
    tests: ['kojo-k9-diamond'],
    must_mention: '我想要金钱作为奖励',
  },
  {
    desc: 'M2228 K9 GOHOUBI_AFTER choice==0 判据错格（改 choice==9，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (choice == 0) {
    // :7452-7453
    await era.printAndWait(\`「为、为什么啦！」\`); // :7453`,
    replace: `  if (choice == 9) { // 变异
    // :7452-7453
    await era.printAndWait(\`「为、为什么啦！」\`); // :7453`,
    tests: ['kojo-k9-diamond'],
    must_mention: '为、为什么啦',
  },
  {
    desc: 'M2229 K9 OSIOKI choice==0 判据错格（改 choice==9，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (choice == 0) {
    // :7528-7529
    await era.printAndWait(\`「真、真是失礼了」\`); // :7529`,
    replace: `  if (choice == 9) { // 变异
    // :7528-7529
    await era.printAndWait(\`「真、真是失礼了」\`); // :7529`,
    tests: ['kojo-k9-diamond'],
    must_mention: '真、真是失礼了',
  },
  {
    desc: 'M2230 K9 GOBI arg_0==3 判据错格（改 arg_0==13，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  } else if (arg_0 == 3) {
    // :7594

    await era.print(\`来的……。\`); // :7596`,
    replace: `  } else if (arg_0 == 13) { // 变异
    // :7594

    await era.print(\`来的……。\`); // :7596`,
    tests: ['kojo-k9-diamond'],
    must_mention: '来的……。',
  },
  {
    desc: 'M2231 K9 BENKI 门面 game.train.肉便器行动 判据错格（== 0 改 1，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (game.train.肉便器行动 == 0) {
    // :6938`,
    replace: `  if (game.train.肉便器行动 == 1) { // 变异
    // :6938`,
    tests: ['kojo-k9-diamond'],
    must_mention: '弄脏我吧',
  },
  {
    desc: 'M2232 K9 ENTERENEMY 淫乱判据错格（TALENT:76 == 1 改 2，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (era.get(\`talent:\${a}:76\`) == 1) {
    // :7396-7397`,
    replace: `  if (era.get(\`talent:\${a}:76\`) == 2) { // 变异
    // :7396-7397`,
    tests: ['kojo-k9-diamond'],
    must_mention: '真的能被干了个爽吗',
  },
  {
    desc: 'M2233 K9 NTR_KOUJO 首次标记写错（CFLAG:650 = 1 改 2，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (kojo.NTR再捕获 == 0) {
    // :7181
    // CFLAG:650  = 1（变量语义：CFLAG 族，650） // :7181
    kojo.NTR再捕获 = 1; // :7181`,
    replace: `  if (kojo.NTR再捕获 == 0) {
    // :7181
    // 变异
    kojo.NTR再捕获 = 2; // :7181`,
    tests: ['kojo-k9-diamond'],
    must_mention: 'CFLAG:650 首次标记写为 1',
  },
  {
    desc: 'M2234 K9 EXUCUTION TFLAG:16 判据错格（== 4 改 5，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (game.event.犬射精或处刑口上 == 4) {
    // :7280`,
    replace: `  if (game.event.犬射精或处刑口上 == 5) { // 变异
    // :7280`,
    tests: ['kojo-k9-diamond'],
    must_mention: '不要成为怪物的安慰物',
  },
  {
    desc: 'M2235 K9 MUSEUM TFLAG:500 判据错格（== 0 改 1，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (game.event.博物馆口上 == 0) {
    // :7297`,
    replace: `  if (game.event.博物馆口上 == 1) { // 变异
    // :7297`,
    tests: ['kojo-k9-diamond'],
    must_mention: '至少回到最初的故',
  },
  {
    desc: 'M2236 K9 BANISHMENT TFLAG:510 判据错格（== 0 改 1，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (game.event.流放口上 == 0) {
    // :7333
    await era.printAndWait(\`「我失去作为战士的力量…已经………」\`); // :7334`,
    replace: `  if (game.event.流放口上 == 1) { // 变异
    // :7333
    await era.printAndWait(\`「我失去作为战士的力量…已经………」\`); // :7334`,
    tests: ['kojo-k9-diamond'],
    must_mention: '我失去作为战士的力量',
  },
  {
    desc: 'M2237 K9 PUBLIC_EXUCUTION TFLAG:520 判据错格（== 0 改 1，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (game.event.公开处刑口上 == 0) {
    // :7354`,
    replace: `  if (game.event.公开处刑口上 == 1) { // 变异
    // :7354`,
    tests: ['kojo-k9-diamond'],
    must_mention: '快杀了我吧',
  },
  {
    desc: 'M2238 K9 GROTESQUE TFLAG:530 判据错格（== 0 改 1，#240；源全空，红在分支路由而非文本）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `  if (game.event.猎奇处刑口上 == 0) {
    // :7369
    await era.printAndWait(''); // :7370`,
    replace: `  if (game.event.猎奇处刑口上 == 1) { // 变异
    // :7369
    await era.printAndWait(''); // :7370`,
    tests: ['kojo-k9-diamond'],
    must_mention: 'GROTESQUE 分支路由错位',
  },
  {
    desc: 'M2239 K9 DOG_KOJO_9 空台词「顺手补写」（:5220 填入台词，1:1 保留原作缺陷的守护条目，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: `        await era.printAndWait(''); // :5220`,
    replace: `        await era.printAndWait('（变异：误填补写台词）'); // :5220`,
    tests: ['kojo-k9-diamond'],
    must_mention: '全篇为未填写模板',
  },
  // —— #242（续轮）：K11 莉莉口上 KOJO_MESSAGE_COM_11 SELECTCOM 3
  // （M2402-M2417 号段） ——
  {
    desc: 'M2402 COM3 初めて助手玛奥判据颠倒（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      // :1049-1062 初めて（CFLAG:304 == 0）
      if (assi_mao) {`,
    replace: `      // :1049-1062 初めて（CFLAG:304 == 0）
      if (!assi_mao) {
        // 变异：助手玛奥判据颠倒`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 初めて：助手玛奥分档',
  },
  {
    desc: 'M2403 COM3 初めて CFLAG:304 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.自慰 = 1; // :1061`,
    replace: `      kojo.自慰 = 0; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 初めて：非助手玛奥分档',
  },
  {
    desc: 'M2404 COM3 二回目 助手玛奥淫乱判据错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱`,
    replace: `      if (
        era.get(\`talent:\${target}:85\`) === 1 && // 变异：判据错格
        (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 二回目：助手玛奥 + 淫乱 + 处女推进到 7',
  },
  {
    desc: 'M2405 COM3 二回目 助手玛奥淫乱 CFLAG:304 写错（7 改 6，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.自慰 = 7; // :1081`,
    replace: `      kojo.自慰 = 6; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 二回目：助手玛奥 + 淫乱 + 处女推进到 7',
  },
  {
    desc: 'M2406 COM3 二回目 助手玛奥爱慕 CFLAG:304 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.自慰 = 5; // :1097`,
    replace: `      kojo.自慰 = 4; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 二回目：助手玛奥 + 爱慕 + 非处女推进到 5',
  },
  {
    desc: 'M2407 COM3 二回目 非助手玛奥淫乱+处女判据错格（TALENT:0 丢失，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      era.get(\`talent:\${target}:0\`) === 1 &&
      (kojo.自慰 <= 8 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱＋处女`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.自慰 <= 8 || game.kojo.口上开关 === 2) // 变异：TALENT:0 丢失
    ) {
      // 淫乱＋处女`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM3 二回目：非助手玛奥 + 淫乱+自慰中毒Lv3以上，RAND:3 三选一可控',
  },
  {
    desc: 'M2408 COM3 二回目 非助手玛奥淫乱+处女 CFLAG:304 写错（9 改 8，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.自慰 = 9; // :1111`,
    replace: `      kojo.自慰 = 8; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 二回目：非助手玛奥 + 淫乱+处女推进到 9',
  },
  {
    desc: 'M2409 COM3 二回目 淫乱+自慰中毒Lv3以上判据错格（>=3 改 >=2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      chara(target).train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱＋自慰中毒Lv3以上`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      chara(target).train.自慰中毒 >= 2 && // 变异：判据错格
      (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱＋自慰中毒Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM3 二回目：非助手玛奥 + 淫乱+自慰中毒Lv3未満，RAND:2 二选一可控',
  },
  {
    desc: 'M2410 COM3 二回目 淫乱+自慰中毒Lv3以上 RAND:3 首支写反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      // 淫乱＋自慰中毒Lv3以上
      if (rand_n(3) === 0) {`,
    replace: `      // 淫乱＋自慰中毒Lv3以上
      if (rand_n(3) === 1) {
        // 变异：RAND:3 首支判据错格`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM3 二回目：非助手玛奥 + 淫乱+自慰中毒Lv3以上，RAND:3 三选一可控',
  },
  {
    desc: 'M2411 COM3 二回目 淫乱+自慰中毒Lv3以上 CFLAG:304 写错（8 改 7，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.自慰 = 8; // :1128`,
    replace: `      kojo.自慰 = 7; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM3 二回目：非助手玛奥 + 淫乱+自慰中毒Lv3以上，RAND:3 三选一可控',
  },
  {
    desc: 'M2412 COM3 二回目 淫乱+自慰中毒Lv3未満 CFLAG:304 写错（7 改 6，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.自慰 = 7; // :1141-1142`,
    replace: `      kojo.自慰 = 6; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM3 二回目：非助手玛奥 + 淫乱+自慰中毒Lv3未満，RAND:2 二选一可控',
  },
  {
    desc: 'M2413 COM3 二回目 爱慕+处女判据错格（TALENT:0 丢失，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      era.get(\`talent:\${target}:85\`) === 1 &&
      era.get(\`talent:\${target}:0\`) === 1 &&
      (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋处女`,
    replace: `      era.get(\`talent:\${target}:85\`) === 1 &&
      (kojo.自慰 <= 5 || game.kojo.口上开关 === 2) // 变异：TALENT:0 丢失
    ) {
      // 爱慕＋处女`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM3 二回目：非助手玛奥 + 爱慕+自慰中毒Lv3以上，RAND:3 三选一可控',
  },
  {
    desc: 'M2414 COM3 二回目 爱慕+自慰中毒Lv3以上判据错格（>=3 改 >=2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      era.get(\`talent:\${target}:85\`) === 1 &&
      chara(target).train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋自慰中毒Lv3以上`,
    replace: `      era.get(\`talent:\${target}:85\`) === 1 &&
      chara(target).train.自慰中毒 >= 2 && // 变异：判据错格
      (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋自慰中毒Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM3 二回目：非助手玛奥 + 爱慕+自慰中毒Lv3未満，RAND:2 二选一可控',
  },
  {
    desc: 'M2415 COM3 二回目 爱慕+自慰中毒Lv3未満 CFLAG:304 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.自慰 = 4; // :1173`,
    replace: `      kojo.自慰 = 3; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM3 二回目：非助手玛奥 + 爱慕+自慰中毒Lv3未満，RAND:2 二选一可控',
  },
  {
    desc: 'M2416 COM3 二回目 屈服刻印Lv3+自慰中毒Lv1以上判据错格（MARK:2==3 改 ==2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      era.get(\`mark:\${target}:2\`) === 3 &&
      chara(target).train.自慰中毒 >= 1 &&
      (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3+自慰中毒Lv1以上`,
    replace: `      era.get(\`mark:\${target}:2\`) === 2 && // 变异：判据错格
      chara(target).train.自慰中毒 >= 1 &&
      (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3+自慰中毒Lv1以上`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 二回目：非助手玛奥 + それ以外推进到 2',
  },
  {
    desc: 'M2417 COM3 二回目 それ以外 CFLAG:304 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.自慰 = 2; // :1194`,
    replace: `      kojo.自慰 = 1; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 二回目：非助手玛奥 + それ以外推进到 2',
  },
  // —— #242（续轮）：K11 莉莉口上 KOJO_MESSAGE_COM_11 SELECTCOM 5
  // （M2418-M2429 号段） ——
  {
    desc: 'M2418 COM5 初めて助手玛奥判据颠倒（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      // :1204-1217 初めて（CFLAG:306 == 0）
      if (assi_mao) {`,
    replace: `      // :1204-1217 初めて（CFLAG:306 == 0）
      if (!assi_mao) {
        // 变异：助手玛奥判据颠倒`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 初めて：助手玛奥分档',
  },
  {
    desc: 'M2419 COM5 初めて CFLAG:306 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.胸爱抚 = 1; // :1214-1216`,
    replace: `      kojo.胸爱抚 = 0; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 初めて：非助手玛奥分档',
  },
  {
    desc: 'M2420 COM5 二回目 助手玛奥淫乱判据错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱`,
    replace: `      if (
        era.get(\`talent:\${target}:85\`) === 1 && // 变异：判据错格
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2421 COM5 二回目 助手玛奥淫乱 CFLAG:306 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.胸爱抚 = 5; // :1228`,
    replace: `      kojo.胸爱抚 = 4; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2422 COM5 二回目 助手玛奥爱慕判据错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        era.get(\`talent:\${target}:85\`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕`,
    replace: `      } else if (
        era.get(\`talent:\${target}:76\`) === 1 && // 变异：判据错格
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 二回目：助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2423 COM5 二回目 助手玛奥B感覚Lv3以上判据错格（>=3 改 >=2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        chara(target).system.乳房感觉 >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // B感覚Lv3以上`,
    replace: `      } else if (
        chara(target).system.乳房感觉 >= 2 && // 变异：判据错格
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // B感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM5 二回目：助手玛奥 + 乳房感觉恰为 Lv2（未达 Lv3）不误入 B感覚 分档',
  },
  {
    desc: 'M2424 COM5 二回目 助手玛奥それ以外 CFLAG:306 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        kojo.胸爱抚 = 2; // :1249`,
    replace: `        kojo.胸爱抚 = 1; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 二回目：助手玛奥 + それ以外推进到 2',
  },
  {
    desc: 'M2425 COM5 二回目 非助手玛奥淫乱 RAND:2 三目分支写反（TERN_MOAN，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      const moan_word = rand_n(2) ? '继续、继续' : '去了、要去了';`,
    replace: `      const moan_word = rand_n(2) ? '去了、要去了' : '继续、继续'; // 变异：分支写反`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM5 二回目：非助手玛奥 + 淫乱，RAND:2 三目分岔可控，推进到 5',
  },
  {
    desc: 'M2426 COM5 二回目 非助手玛奥淫乱 CFLAG:306 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.胸爱抚 = 5; // :1256-1257`,
    replace: `      kojo.胸爱抚 = 4; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM5 二回目：非助手玛奥 + 淫乱，RAND:2 三目分岔可控，推进到 5',
  },
  {
    desc: 'M2427 COM5 二回目 非助手玛奥爱慕判据错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      era.get(\`talent:\${target}:85\`) === 1 &&
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 && // 变异：判据错格
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 二回目：非助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2428 COM5 二回目 非助手玛奥B感覚Lv3以上 CFLAG:306 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.胸爱抚 = 3; // :1268-1269`,
    replace: `      kojo.胸爱抚 = 2; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 二回目：非助手玛奥 + B感覚Lv3以上推进到 3',
  },
  {
    desc: 'M2429 COM5 二回目 非助手玛奥それ以外 CFLAG:306 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      kojo.胸爱抚 = 2; // :1273-1274`,
    replace: `      kojo.胸爱抚 = 1; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 二回目：非助手玛奥 + それ以外推进到 2',
  },
  {
    desc: 'M2270 K10 EVENTTRAIN #PRI 存在标志写错值（FLAG:110=1 改 2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `game.kojo.口上存在_10 = 1; // :64 FLAG:110 = 1（K10 口上存在标志）`,
    replace: `game.kojo.口上存在_10 = 2; // :64（变异）`,
    tests: ['kojo-k10-club'],
    must_mention: 'K10 一对',
  },
  {
    desc: 'M2271 K10 EVENTTRAIN #PRI 口上开关补 0 判据改错（===0 改 ===1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // :66
    }`,
    replace: `    if (game.kojo.口上开关 === 1) {  // 变异
      game.kojo.口上开关 = 2; // :66
    }`,
    tests: ['kojo-k10-club'],
    must_mention: 'K10 一对',
  },
  {
    desc: 'M2272 K10 EVENTEND #LATER 存在标志清除值改错（=0 改 =1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `game.kojo.口上存在_10 = 0; // :70`,
    replace: `game.kojo.口上存在_10 = 1; // :70（变异）`,
    tests: ['kojo-k10-club'],
    must_mention: 'K10 一对',
  },
  {
    desc: 'M2273 K10 EVENTTRAIN 自身守卫①口上开关判据反转（<=0 改 >0，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if ((game.kojo.口上开关 || 0) <= 0) {
    // :76-80
    return 0; // :76-80
  } // :76-80`,
    replace: `  if ((game.kojo.口上开关 || 0) > 0) {  // 变异
    // :76-80
    return 0; // :76-80
  } // :76-80`,
    tests: ['kojo-k10-club'],
    must_mention: '自身守卫①口上开关',
  },
  {
    desc: 'M2274 K10 EVENTTRAIN 自身守卫②TALENT:170 判据反转（!=1 改 ==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era.get(\`talent:\${target}:170\`) != 1) {
    // :80-81
    return 0; // :80-81
  } // :80-81`,
    replace: `  if (era.get(\`talent:\${target}:170\`) == 1) {  // 变异
    // :80-81
    return 0; // :80-81
  } // :80-81`,

    tests: ['kojo-k10-club'],
    must_mention: '自身双守卫',
  },
  {
    desc: 'M2275 K10 EVENTTRAIN 自身守卫③TALENT:121 判据反转（!=1 改 ==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era.get(\`talent:\${target}:121\`) != 1) {`,
    replace: `  if (era.get(\`talent:\${target}:121\`) == 1) {  // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '自身双守卫',
  },
  {
    desc: 'M2276 K10 初调教==0 魔族分档推进值写错（=1 改 2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `    // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :138
    chara(target).kojo.初调教 = 1; // :138
    return 1; // :138-140`,
    replace: `    // CFLAG:201  = 1（变量语义：CFLAG 族，201） // :138
    chara(target).kojo.初调教 = 2; // :138（变异）
    return 1; // :138-140`,

    tests: ['kojo-k10-club'],
    must_mention: '魔族分档',
  },
  {
    desc: 'M2277 K10 初调教==0 魔族化标记写错（=1 改 2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `      // CFLAG:370  = 1（变量语义：CFLAG 族，370） // :112
      chara(target).kojo.魔族化 = 1; // :112`,
    replace: `      // CFLAG:370  = 1（变量语义：CFLAG 族，370） // :112
      chara(target).kojo.魔族化 = 2; // :112（变异）`,
    tests: ['kojo-k10-club'],
    must_mention: '魔族分档',
  },
  {
    desc: 'M2278 K10 屈服刻印 Lv1 推进值写错（初调教=2 改 3，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `    // CFLAG:201  = 2（变量语义：CFLAG 族，201） // :186
    chara(target).kojo.初调教 = 2; // :186`,
    replace: `    // CFLAG:201  = 2（变量语义：CFLAG 族，201） // :186
    chara(target).kojo.初调教 = 3; // :186（变异）`,
    tests: ['kojo-k10-club'],
    must_mention: '屈服刻印 Lv1',
  },
  {
    desc: 'M2279 K10 屈服刻印 Lv1 判据改错（初调教<2 改 <1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  } else if (
    chara(target).kojo.初调教 < 2 &&
    era.get(\`mark:\${target}:2\`) == 1
  ) {`,
    replace: `  } else if (
    chara(target).kojo.初调教 < 1 &&  // 变异
    era.get(\`mark:\${target}:2\`) == 1
  ) {`,
    tests: ['kojo-k10-club'],
    must_mention: '屈服刻印 Lv1',
  },
  {
    desc: 'M2280 K10 K10_KOJO2 崩坏分档守卫改错（TALENT:9==1 改 ==0，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era.get(\`talent:\${target}:9\`) == 1 && game.kojo.口上开关 == 2) {
    // :605
    era.drawLine(); // :606
    await era.printAndWait(\`「啊……啊啊…啊………」\`); // :607`,
    replace: `  if (era.get(\`talent:\${target}:9\`) == 0 && game.kojo.口上开关 == 2) {  // 变异
    // :605
    era.drawLine(); // :606
    await era.printAndWait(\`「啊……啊啊…啊………」\`); // :607`,
    tests: ['kojo-k10-club'],
    must_mention: '无值得期待的反应',
  },
  {
    desc: 'M2281 K10 K10_KOJO2 glasses_word 三目分支反转（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  const glasses_word =
    chara(target).train.上衣类型 == 83 ? '扶了扶眼镜' : '向这边转了过来'; // (CFLAG:42 == 83) ? 扶了扶眼镜 # 向这边转了过来`,
    replace: `  const glasses_word =
    chara(target).train.上衣类型 == 83 ? '向这边转了过来' : '扶了扶眼镜'; // 变异：三目分支反转`,
    tests: ['kojo-k10-club'],
    must_mention: 'glasses_word',
  },
  {
    desc: 'M2282 K10 K10_KOJO2 MARK:3==3 判据改错（==3 改 ==2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `    if (era.get(\`mark:\${target}:3\`) == 3 && game.kojo.口上开关 == 2) {
      // :644
      await era.printAndWait(
        \`「诶 那个…抱歉哦、是来找我做令人舒服的事情吗？」打开门\${target_name}一副半梦半醒的样子，头发也乱糟糟的翘起了一堆呆毛\`,`,
    replace: `    if (era.get(\`mark:\${target}:3\`) == 2 && game.kojo.口上开关 == 2) {  // 变异
      // :644
      await era.printAndWait(
        \`「诶 那个…抱歉哦、是来找我做令人舒服的事情吗？」打开门\${target_name}一副半梦半醒的样子，头发也乱糟糟的翘起了一堆呆毛\`,`,
    tests: ['kojo-k10-club'],
    must_mention: 'glasses_word',
  },
  {
    desc: 'M2283 K10 KOJO_MESSAGE_COM_10 头部守卫①ASSI&&ASSIPLAY 判据删松（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era_flag.assi > 0 && era_flag.assiplay) {
    // :902-905

    return 0; // :902-905
  } // :902-905`,
    replace: `  if (era_flag.assi > 0 && !era_flag.assiplay) {  // 变异
    // :902-905

    return 0; // :902-905
  } // :902-905`,
    tests: ['kojo-k10-club'],
    must_mention: '头部第 1 道守卫',
  },
  {
    desc: 'M2284 K10 KOJO_MESSAGE_COM_10 头部守卫②TEQUIP:45 判据改错（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era.get(\`tequip:\${target}:45\`) && era_flag.selectcom != 45) {
    // :905-907
    return 0; // :905-907
  } // :905-907`,
    replace: `  if (era.get(\`tequip:\${target}:46\`) && era_flag.selectcom != 45) {  // 变异
    // :905-907
    return 0; // :905-907
  } // :905-907`,

    tests: ['kojo-k10-club'],
    must_mention: '头部第 2 道守卫',
  },
  {
    desc: 'M2285 K10 KOJO_MESSAGE_COM_10 头部守卫③失神判据反转（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (game.train.失神) {
    // :909-910 TFLAG:899（跨域读走门面）
    return 0; // :909-910
  } // :909-910`,
    replace: `  if (!game.train.失神) {  // 变异
    // :909-910 TFLAG:899（跨域读走门面）
    return 0; // :909-910
  } // :909-910`,
    tests: ['kojo-k10-club'],
    must_mention: '头部第 3 道守卫',
  },
  {
    desc: 'M2286 K10 KOJO_MESSAGE_COM_10 头部守卫④TEQUIP:89 分发对象改错（DOG 改 COLOSSEUM，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era.get(\`tequip:\${target}:89\`)) {
    // :911
    await dog_kojo_10(rand_n); // :912
    return 0; // :912-914
  } // :914-915`,
    replace: `  if (era.get(\`tequip:\${target}:89\`)) {
    // :911
    await colosseum_kojo_10(rand_n); // 变异：调用对象改错
    return 0; // :912-914
  } // :914-915`,
    tests: ['kojo-k10-club'],
    must_mention: 'DOG_KOJO_10 真身',
  },
  {
    desc: 'M2287 K10 KOJO_MESSAGE_COM_10 头部守卫⑤TEQUIP:55 分发对象改错（COLOSSEUM 改 DOG，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era.get(\`tequip:\${target}:55\`)) {
    // :916
    await colosseum_kojo_10(rand_n); // :917
    return 0; // :917-919
  } // :919-920`,
    replace: `  if (era.get(\`tequip:\${target}:55\`)) {
    // :916
    await dog_kojo_10(rand_n); // 变异：调用对象改错
    return 0; // :917-919
  } // :919-920`,
    tests: ['kojo-k10-club'],
    must_mention: 'COLOSSEUM_KOJO_10 真身',
  },
  {
    desc: 'M2288 K10 KOJO_MESSAGE_COM_10 头部守卫⑥TALENT:9 崩坏判据反转（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era.get(\`talent:\${target}:9\`) == 1) {
    // :921-923
    return 0; // :921-923
  } // :921-923`,
    replace: `  if (era.get(\`talent:\${target}:9\`) == 0) {  // 变异
    // :921-923
    return 0; // :921-923
  } // :921-923`,
    tests: ['kojo-k10-club'],
    must_mention: '头部第 6 道守卫',
  },
  {
    desc: 'M2289 K10 KOJO_MESSAGE_COM_10 头部守卫⑦TEQUIP:90 判据反转（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era.get(\`tequip:\${target}:90\`)) {
    // :924-927
    return 0; // :924-927
  } // :924-927`,
    replace: `  if (!era.get(\`tequip:\${target}:90\`)) {  // 变异
    // :924-927
    return 0; // :924-927
  } // :924-927`,
    tests: ['kojo-k10-club'],
    must_mention: '头部第 7 道守卫',
  },
  {
    desc: 'M2290 K10 SELECTCOM==0 爱抚初回推进值写错（CFLAG:301=1 改 2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :943
      kojo.爱抚 = 1; // :943
      return 0; // :942-947`,
    replace: `      // CFLAG:301  = 1（变量语义：CFLAG 族，301） // :943
      kojo.爱抚 = 2; // :943（变异）
      return 0; // :942-947`,
    tests: ['kojo-k10-club'],
    must_mention: 'MARK:2>=2 分档',
  },
  {
    desc: 'M2291 K10 SELECTCOM==0 爱抚初回判据改错（MARK:2>=2 改 >=3，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `      if (era.get(\`mark:\${target}:2\`) >= 2) {
        // :937
        await era.printAndWait(
          \`「啊～…嗯~…更、嗯更多的揉那里也可以哟…啊…就是这样」\`,
        ); // :938`,
    replace: `      if (era.get(\`mark:\${target}:2\`) >= 3) {  // 变异
        // :937
        await era.printAndWait(
          \`「啊～…嗯~…更、嗯更多的揉那里也可以哟…啊…就是这样」\`,
        ); // :938`,
    tests: ['kojo-k10-club'],
    must_mention: 'MARK:2>=2 分档',
  },
  {
    desc: 'M2292 K10 SELECTCOM==87 穿环 p 位判据换错（&穿环状态 位判据改错，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `        if (chara(target).train.穿环状态 & p) {
          // :4573
          await era.printAndWait(\`「咕～…啊啊～！」\`); // :4574`,
    replace: `        if (chara(target).train.穿环状态 & (p + 1)) {  // 变异
          // :4573
          await era.printAndWait(\`「咕～…啊啊～！」\`); // :4574`,
    tests: ['kojo-k10-club'],
    must_mention: '跨模块存活态',
  },
  {
    desc: 'M2293 K10 TEQUIP:55 分发（COLOSSEUM_KOJO_10）SELECTCOM==55 体力判据反转（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `    if (era.get(\`base:\${target}:1\`) <= 0) {
      // :6722
      await era.printAndWait(\`\${target_name}连站立的力气都没有了……\`); // :6723`,
    replace: `    if (era.get(\`base:\${target}:1\`) > 0) {  // 变异
      // :6722
      await era.printAndWait(\`\${target_name}连站立的力气都没有了……\`); // :6723`,
    tests: ['kojo-k10-club'],
    must_mention: 'COLOSSEUM_KOJO_10 真身',
  },
  {
    desc: 'M2294 K10 KOJO_MESSAGE_PALAMCNG_10 头部守卫①ASSI&&ASSIPLAY 判据反转（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era_flag.assi > 0 && era_flag.assiplay) {
    // :5655-5660
    return 0; // :5655-5660
  } // :5655-5660`,
    replace: `  if (era_flag.assi > 0 && !era_flag.assiplay) {  // 变异
    // :5655-5660
    return 0; // :5655-5660
  } // :5655-5660`,
    tests: ['kojo-k10-club'],
    must_mention: '头部守卫①ASSI&&ASSIPLAY 静默跳过',
  },
  {
    desc: 'M2295 K10 KOJO_MESSAGE_PALAMCNG_10 P1 首超润滑写错值（CFLAG:221=1 改 0，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221） // :5707
    chara(target).kojo.首次润滑Lv2 = 1; // :5707`,
    replace: `    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221） // :5707
    chara(target).kojo.首次润滑Lv2 = 0; // :5707（变异）`,
    tests: ['kojo-k10-club'],
    must_mention: 'PALAMCNG_10',
  },
  {
    desc: 'M2296 K10 KOJO_MESSAGE_MARKCNG_10 头部守卫①ASSI&&ASSIPLAY 判据反转（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era_flag.assi > 0 && era_flag.assiplay) {
    // :5952-5953
    return 0; // :5952-5953
  } // :5952-5953`,
    replace: `  if (era_flag.assi > 0 && !era_flag.assiplay) {  // 变异
    // :5952-5953
    return 0; // :5952-5953
  } // :5952-5953`,
    tests: ['kojo-k10-club'],
    must_mention: '头部守卫①ASSI&&ASSIPLAY 静默跳过',
  },
  {
    desc: 'M2297 K10 KOJO_MESSAGE_MARKCNG_10 苦痛刻印Lv3 判据改错（==3 改 ==2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (game.system.苦痛刻印变动 == 3 && chara(target).kojo.苦痛刻印Lv3 == 0) {
    // :5974

    if (era.get(\`talent:\${target}:85\`) == 1) {`,
    replace: `  if (game.system.苦痛刻印变动 == 2 && chara(target).kojo.苦痛刻印Lv3 == 0) {  // 变异
    // :5974

    if (era.get(\`talent:\${target}:85\`) == 1) {`,
    tests: ['kojo-k10-club'],
    must_mention: 'MARKCNG_10',
  },
  {
    desc: 'M2298 K10 KOJO_MESSAGE_MARKCNG_10 苦痛刻印Lv3 写错值（=1 改 2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `    // CFLAG:297  = 1（变量语义：CFLAG 族，297） // :5983
    chara(target).kojo.苦痛刻印Lv3 = 1; // :5983`,
    replace: `    // CFLAG:297  = 1（变量语义：CFLAG 族，297） // :5983
    chara(target).kojo.苦痛刻印Lv3 = 2; // :5983（变异）`,
    tests: ['kojo-k10-club'],
    must_mention: 'MARKCNG_10',
  },
  {
    desc: 'M2299 K10 SELF_KOJO_K10 育儿室（TFLAG:13==13）孕育文案判据丢失（TALENT:153 分支删台词，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `      if (era.get(\`talent:\${target}:153\`)) {
        // :6411
        await era.printAndWait(
          \`「很快就要生出来了、请安心期待吧、亲・爱・的\${heart(1)}」\`,
        ); // :6412`,
    replace: `      if (!era.get(\`talent:\${target}:153\`)) {  // 变异
        // :6411
        await era.printAndWait(
          \`「很快就要生出来了、请安心期待吧、亲・爱・的\${heart(1)}」\`,
        ); // :6412`,
    tests: ['kojo-k10-club'],
    must_mention: 'CSTR:2 插值',
  },
  {
    desc: 'M2300 K10 SELF_KOJO_K10 育儿室完成标记写错值（CFLAG:273=1 改 0，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `    // CFLAG:273  = 1（变量语义：CFLAG 族，273） // :6420
    chara(target).kojo.育儿室 = 1; // :6420`,
    replace: `    // CFLAG:273  = 1（变量语义：CFLAG 族，273） // :6420
    chara(target).kojo.育儿室 = 0; // :6420（变异）`,
    tests: ['kojo-k10-club'],
    must_mention: 'CSTR:2 插值',
  },
  {
    desc: 'M2301 K10 SELF_KOJO_K10 TFLAG:13 派发条件改错（==13 改 ==14，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (game.train.初吻与自我口上 == 13) {
    // :6407

    if (era.get(\`talent:\${target}:85\`) || era.get(\`talent:\${target}:76\`)) {`,
    replace: `  if (game.train.初吻与自我口上 == 14) {  // 变异
    // :6407

    if (era.get(\`talent:\${target}:85\`) || era.get(\`talent:\${target}:76\`)) {`,
    tests: ['kojo-k10-club'],
    must_mention: 'CSTR:2 插值',
  },
  {
    desc: 'M2302 K10 DUNGEON_VICTORY_K10 体力低档追加台词判据删松（<50 改 <500，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (
    (era.get(\`base:\${a}:0\`) * 100) / era.get(\`maxbase:\${a}:0\`) < 50 ||
    (era.get(\`base:\${a}:1\`) * 100) / era.get(\`maxbase:\${a}:1\`) < 50
  ) {`,
    replace: `  if (
    (era.get(\`base:\${a}:0\`) * 100) / era.get(\`maxbase:\${a}:0\`) < 500 ||  // 变异
    (era.get(\`base:\${a}:1\`) * 100) / era.get(\`maxbase:\${a}:1\`) < 50
  ) {`,
    tests: ['kojo-k10-club'],
    must_mention: '体力过半（60%）',
  },
  {
    desc: 'M2303 K10 DUNGEON_VICTORY_K10 随机三选一首档文案改错（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (rand_n(3) == 0) {
    // :6562
    await era.printAndWait(\`「唔呼呼、今天的魔力格外顺畅呢♪」\`); // :6563`,
    replace: `  if (rand_n(3) == 1) {  // 变异
    // :6562
    await era.printAndWait(\`「唔呼呼、今天的魔力格外顺畅呢♪」\`); // :6563`,
    tests: ['kojo-k10-club'],
    must_mention: 'DUNGEON_VICTORY_K10',
  },
  {
    desc: 'M2304 K10 DUNGEON_RYOUZYOKU_K10 处女判据反转（TALENT:0==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era.get(\`talent:\${target}:0\`) == 1) {
    // :6482

    await era.printAndWait(
      \`「请！请住手…哈啊～…求、求你们…人家还是处女…所以说…只有那里请…哈啊～！」\`,
    ); // :6484`,
    replace: `  if (era.get(\`talent:\${target}:0\`) == 0) {  // 变异
    // :6482

    await era.printAndWait(
      \`「请！请住手…哈啊～…求、求你们…人家还是处女…所以说…只有那里请…哈啊～！」\`,
    ); // :6484`,
    tests: ['kojo-k10-club'],
    must_mention: '迷宫败北与凌辱结束口上',
  },
  {
    desc: 'M2305 K10 DUNGEON_RYOUZYOKU_AFTER_K10 处女判据反转（TALENT:0==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era.get(\`talent:\${target}:0\`) == 1) {
    // :6502

    await era.printAndWait(\`「骗人…我竟然还是处女吗………」\`); // :6504`,
    replace: `  if (era.get(\`talent:\${target}:0\`) == 0) {  // 变异
    // :6502

    await era.printAndWait(\`「骗人…我竟然还是处女吗………」\`); // :6504`,
    tests: ['kojo-k10-club'],
    must_mention: '迷宫败北与凌辱结束口上',
  },
  {
    desc: 'M2306 K10 DUNGEON_ATTACK_K10 侵略状态判据改错（==2 改 ==3，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (chara(target).invasion.状态 == 2) {
    // :6587
    if (rand_n(3) == 0) {
      // :6588
      await era.printAndWait(\`「燃烧吧！」\`); // :6589`,
    replace: `  if (chara(target).invasion.状态 == 3) {  // 变异
    // :6587
    if (rand_n(3) == 0) {
      // :6588
      await era.printAndWait(\`「燃烧吧！」\`); // :6589`,
    tests: ['kojo-k10-club'],
    must_mention: 'DUNGEON_ATTACK_K10',
  },
  {
    desc: 'M2307 K10 BENKI_KOUJO_K10 肉便器行动==0 淫乱分档判据反转（TALENT:76，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (game.train.肉便器行动 == 0) {
    // :6616

    if (era.get(\`talent:\${a}:76\`) == 1) {
      // :6619
      await era.printAndWait(\`「哈啊～…更多更多…用力干人家吧\${heart(1)}」\`); // :6620`,
    replace: `  if (game.train.肉便器行动 == 0) {
    // :6616

    if (era.get(\`talent:\${a}:76\`) == 0) {  // 变异
      // :6619
      await era.printAndWait(\`「哈啊～…更多更多…用力干人家吧\${heart(1)}」\`); // :6620`,
    tests: ['kojo-k10-club'],
    must_mention: '肉便器行动',
  },
  {
    desc: 'M2308 K10 BENKI_KOUJO_K10 肉便器行动分档判据改错（==0 改 ==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (game.train.肉便器行动 == 0) {
    // :6616

    if (era.get(\`talent:\${a}:76\`) == 1) {`,
    replace: `  if (game.train.肉便器行动 == 1) {  // 变异
    // :6616

    if (era.get(\`talent:\${a}:76\`) == 1) {`,
    tests: ['kojo-k10-club'],
    must_mention: '肉便器行动',
  },
  {
    desc: 'M2309 K10 ENTERENEMY_KOUJO_K10 淫乱/爱慕分岔顺序改错（TALENT:76 判据反转，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era.get(\`talent:\${a}:76\`) == 1) {
    // :7083
    await era.printAndWait(
      \`「把魔王大人蹂躏的凄惨兮兮变成人家的宠物什么的…说不定也很有趣呢♪」\`,
    ); // :7084
  } else if (era.get(\`talent:\${a}:85\`) == 1) {
    // :7086
    await era.printAndWait(\`「不要逃跑哟、魔王大人\${heart(1)}」\`); // :7087`,
    replace: `  if (era.get(\`talent:\${a}:76\`) == 1) {
    // :7083
    await era.printAndWait(
      \`「把魔王大人蹂躏的凄惨兮兮变成人家的宠物什么的…说不定也很有趣呢♪」\`,
    ); // :7084
  } else if (era.get(\`talent:\${a}:85\`) == 0) {  // 变异
    // :7086
    await era.printAndWait(\`「不要逃跑哟、魔王大人\${heart(1)}」\`); // :7087`,
    tests: ['kojo-k10-club'],
    must_mention: 'ENTERENEMY_KOUJO_K10',
  },
  {
    desc: 'M2310 K10 NTR_KOUJO_K10 首次再捕获标记写错值（CFLAG:650=1 改 0，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `    // CFLAG:650  = 1（变量语义：CFLAG 族，650） // :6857
    chara(target).kojo.NTR再捕获 = 1; // :6857`,
    replace: `    // CFLAG:650  = 1（变量语义：CFLAG 族，650） // :6857
    chara(target).kojo.NTR再捕获 = 0; // :6857（变异）`,
    tests: ['kojo-k10-club'],
    must_mention: 'NTR_KOUJO_K10',
  },
  {
    desc: 'M2311 K10 NTR_KOUJO_K10 P==1 分支写入字段改错（CFLAG:651 改 652，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `    // CFLAG:651  = 1（变量语义：CFLAG 族，651） // :6874
    chara(target).kojo.NTR_651 = 1; // :6874`,
    replace: `    // CFLAG:651  = 1（变量语义：CFLAG 族，651） // :6874
    chara(target).kojo.NTR_652 = 1; // :6874（变异）`,
    tests: ['kojo-k10-club'],
    must_mention: 'NTR_KOUJO_K10',
  },
  {
    desc: 'M2312 K10 NTR_KOUJO_K10 P 分派判据①改错（==1 改 ==2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (P == 1) {
    // :6863

    if (era.get(\`talent:\${target}:76\`) || era.get(\`talent:\${target}:85\`)) {
      // :6865
      await era.printAndWait(
        \`「不、不要…哈啊～…被你这样的人…人家的第一次…啊～…啊啊～！」\`,
      ); // :6866`,
    replace: `  if (P == 2) {  // 变异
    // :6863

    if (era.get(\`talent:\${target}:76\`) || era.get(\`talent:\${target}:85\`)) {
      // :6865
      await era.printAndWait(
        \`「不、不要…哈啊～…被你这样的人…人家的第一次…啊～…啊啊～！」\`,
      ); // :6866`,
    tests: ['kojo-k10-club'],
    must_mention: 'NTR_KOUJO_K10',
  },
  {
    desc: 'M2313 K10 EXUCUTION_KOUJO_K10 犬射精或处刑口上判据改错（==4 改 ==5，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (game.event.犬射精或处刑口上 == 4) {
    // :6967
    await era.printAndWait(
      \`「求、求你么…杀了我…请杀了我吧…肉便器什么的…不要、不要啊………」\`,
    ); // :6968`,
    replace: `  if (game.event.犬射精或处刑口上 == 5) {  // 变异
    // :6967
    await era.printAndWait(
      \`「求、求你么…杀了我…请杀了我吧…肉便器什么的…不要、不要啊………」\`,
    ); // :6968`,
    tests: ['kojo-k10-club'],
    must_mention: '注册且可调用',
  },
  {
    desc: 'M2314 K10 MUSEUM_KOUJO_K10 博物馆口上判据改错（==0 改 ==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (game.event.博物馆口上 == 0) {
    // :6984
    await era.printAndWait(
      \`「唔呼呼、这种程度的石化魔法，之前的我只要一瞬间就能反制…啊啊……啊………」\`,
    ); // :6985`,
    replace: `  if (game.event.博物馆口上 == 1) {  // 变异
    // :6984
    await era.printAndWait(
      \`「唔呼呼、这种程度的石化魔法，之前的我只要一瞬间就能反制…啊啊……啊………」\`,
    ); // :6985`,
    tests: ['kojo-k10-club'],
    must_mention: '八档，第一档有台词',
  },
  {
    desc: 'M2315 K10 BANISHMENT_KOUJO_K10 流放口上判据改错（==0 改 ==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (game.event.流放口上 == 0) {
    // :7020
    await era.printAndWait(\`「我的魔法连让小石头动一下都不行了…啊啊………」\`); // :7021`,
    replace: `  if (game.event.流放口上 == 1) {  // 变异
    // :7020
    await era.printAndWait(\`「我的魔法连让小石头动一下都不行了…啊啊………」\`); // :7021`,
    tests: ['kojo-k10-club'],
    must_mention: '注册且可调用',
  },
  {
    desc: 'M2316 K10 PUBLIC_EXUCUTION_KOUJO_K10 公开处刑口上判据改错（==0 改 ==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (game.event.公开处刑口上 == 0) {
    // :7041
    await era.printAndWait(
      \`「呐..开玩笑的吧？那样的…我可不觉得好笑…啊～…啊啊～！」\`,
    ); // :7042`,
    replace: `  if (game.event.公开处刑口上 == 1) {  // 变异
    // :7041
    await era.printAndWait(
      \`「呐..开玩笑的吧？那样的…我可不觉得好笑…啊～…啊啊～！」\`,
    ); // :7042`,
    tests: ['kojo-k10-club'],
    must_mention: '注册且可调用',
  },
  {
    desc: 'M2317 K10 GROTESQUE_KOUJO_K10 猎奇处刑口上判据改错（==0 改 ==1，1:1 保留空文案的分支路由靶，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `async function grotesque_koujo_k10(rand) {
  void rand;

  if (game.event.猎奇处刑口上 == 0) {
    // :7056
    await era.printAndWait(''); // :7057`,
    replace: `async function grotesque_koujo_k10(rand) {
  void rand;

  if (game.event.猎奇处刑口上 == 1) {  // 变异
    // :7056
    await era.printAndWait(''); // :7057`,
    tests: ['kojo-k10-club'],
    must_mention: '注册且可调用',
  },
  {
    desc: 'M2318 K10 GOHOUBI_REQUEST_KOUJO_K10 要求奖赏判据改错（==0 改 ==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (chara(a).stronghold.要求奖赏 == 0) {
    // :7096

    await era.printAndWait(\`「好麻烦，唔，那给我一些钱好了」\`); // :7098`,
    replace: `  if (chara(a).stronghold.要求奖赏 == 1) {  // 变异
    // :7096

    await era.printAndWait(\`「好麻烦，唔，那给我一些钱好了」\`); // :7098`,
    tests: ['kojo-k10-club'],
    must_mention: '请求金钱',
  },
  {
    desc: 'M2319 K10 GOHOUBI_AFTER_KOUJO_K10 choice==0 判据改错（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (choice == 0) {
    // :7141
    await era.printAndWait(\`「就这样不许动？哈？」\`); // :7142`,
    replace: `  if (choice == 1) {  // 变异
    // :7141
    await era.printAndWait(\`「就这样不许动？哈？」\`); // :7142`,
    tests: ['kojo-k10-club'],
    must_mention: 'choice 参数传递',
  },
  {
    desc: 'M2320 K10 OSIOKI_KOUJO_K10 choice==6 判据改错（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  } else if (choice == 6) {
    // :7260
    await era.printAndWait(\`「真是难以接受」\`); // :7261`,
    replace: `  } else if (choice == 7) {  // 变异
    // :7260
    await era.printAndWait(\`「真是难以接受」\`); // :7261`,
    tests: ['kojo-k10-club'],
    must_mention: 'choice 参数传递',
  },
  {
    desc: 'M2321 K10 GOBI_KOUJO_K10 arg0==1 判据改错（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (arg0 == 1) {
    // :7278

    await era.print(\`所以呢♪\`); // :7280`,
    replace: `  if (arg0 == 2) {  // 变异
    // :7278

    await era.print(\`所以呢♪\`); // :7280`,
    tests: ['kojo-k10-club'],
    must_mention: 'ARG:0 取语尾编号',
  },
  {
    desc: 'M2322 K10 GOBI_KOUJO_K10 arg0==1 输出文案改错（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `    await era.print(\`所以呢♪\`); // :7280
  } else if (arg0 == 2) {
    // :7281

    await era.print(\`哟！\`); // :7283`,
    replace: `    await era.print(\`哟！变异\`); // :7280
  } else if (arg0 == 2) {
    // :7281

    await era.print(\`哟！\`); // :7283`,
    tests: ['kojo-k10-club'],
    must_mention: 'ARG:0 取语尾编号',
  },
  {
    desc: 'M2323 K10 家族接线：kojo_message_com_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `kojo_message_com_family.register(10, kojo_message_com_10);`,
    replace: `kojo_message_com_family.register(11, kojo_message_com_10); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2324 K10 家族接线：self_kojo_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `self_kojo_family.register(10, self_kojo_k10);`,
    replace: `self_kojo_family.register(11, self_kojo_k10); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2325 K10 家族接线：kojo_message_palamcng_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `kojo_message_palamcng_family.register(10, kojo_message_palamcng_10);`,
    replace: `kojo_message_palamcng_family.register(11, kojo_message_palamcng_10); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2326 K10 家族接线：kojo_message_markcng_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `kojo_message_markcng_family.register(10, kojo_message_markcng_10);`,
    replace: `kojo_message_markcng_family.register(11, kojo_message_markcng_10); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2327 K10 家族接线：gohoubi_after_koujo_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `gohoubi_after_koujo_family.register(10, (cid, choice) =>
  gohoubi_after_koujo_k10(undefined, cid, choice),
);`,
    replace: `gohoubi_after_koujo_family.register(11, (cid, choice) =>  // 变异
  gohoubi_after_koujo_k10(undefined, cid, choice),
);`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2328 K10 家族接线：osioski_koujo_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `osioski_koujo_family.register(10, (cid, choice) =>
  osioki_koujo_k10(undefined, cid, choice),
);`,
    replace: `osioski_koujo_family.register(11, (cid, choice) =>  // 变异
  osioki_koujo_k10(undefined, cid, choice),
);`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2329 K10 家族接线：gohoubi_request_koujo_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `gohoubi_request_koujo_family.register(10, () => gohoubi_request_koujo_k10());`,
    replace: `gohoubi_request_koujo_family.register(11, () => gohoubi_request_koujo_k10()); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2330 K10 家族接线：ryouzyoku_kojo_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `ryouzyoku_kojo_family.register(10, dungeon_ryouzyoku_k10);`,
    replace: `ryouzyoku_kojo_family.register(11, dungeon_ryouzyoku_k10); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2331 K10 家族接线：ryouzyoku_after_kojo_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `ryouzyoku_after_kojo_family.register(10, dungeon_ryouzyoku_after_k10);`,
    replace: `ryouzyoku_after_kojo_family.register(11, dungeon_ryouzyoku_after_k10); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2332 K10 家族接线：gobi_koujo_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `gobi_koujo_family.register(10, gobi_koujo_k10);`,
    replace: `gobi_koujo_family.register(11, gobi_koujo_k10); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2333 K10 家族接线：benki_koujo_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `benki_koujo_family.register(10, benki_koujo_k10);`,
    replace: `benki_koujo_family.register(11, benki_koujo_k10); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2334 K10 家族接线：enterenemy_koujo_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `enterenemy_koujo_family.register(10, enterenemy_koujo_k10);`,
    replace: `enterenemy_koujo_family.register(11, enterenemy_koujo_k10); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2335 K10 家族接线：dungeon_victory_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `dungeon_victory_family.register(10, dungeon_victory_k10);`,
    replace: `dungeon_victory_family.register(11, dungeon_victory_k10); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2336 K10 家族接线：dungeon_attack_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `dungeon_attack_family.register(10, dungeon_attack_k10);`,
    replace: `dungeon_attack_family.register(11, dungeon_attack_k10); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2337 K10 家族接线：ntr_koujo_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `ntr_koujo_family.register(10, ntr_koujo_k10);`,
    replace: `ntr_koujo_family.register(11, ntr_koujo_k10); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2338 K10 家族接线：exucution_koujo_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `exucution_koujo_family.register(10, exucution_koujo_k10);`,
    replace: `exucution_koujo_family.register(11, exucution_koujo_k10); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
  {
    desc: 'M2339 K10 家族接线：museum_koujo_family 注册号错位（10 改 11，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `museum_koujo_family.register(10, museum_koujo_k10);`,
    replace: `museum_koujo_family.register(11, museum_koujo_k10); // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '20 个分发族全部注册了 K10',
  },
];
