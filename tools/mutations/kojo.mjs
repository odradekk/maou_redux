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
  {
    desc: 'M2500 K8 兽奸守卫岔路丢失（TEQUIP:89 不再调 DOG_KOJO_8，#239）',
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
    desc: 'M2501 K8 死斗场守卫岔路丢失（TEQUIP:55 不再调 COLOSSEUM_KOJO_8，#239）',
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
    desc: 'M2502 K8 OSIOKI 脱粪刑门槛被「统一」成自慰刑的 4（源作是 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`abl:${a}:17`) >= 6) {',
    replace: '    if (era0(`abl:${a}:17`) >= 4) {',
    tests: ['kojo-k8-spade'],
    must_mention: '脱粪刑门槛是 6，Lv4 不够',
  },
  {
    desc: 'M2503 K8 OSIOKI 小便器刑的或判退化成只认受虐狂（TALENT:76 臂丢失，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`talent:${a}:88`) == 1 || era0(`talent:${a}:76`) == 1) {',
    replace: '    if (era0(`talent:${a}:88`) == 1) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'OSIOKI：小便器刑 受虐狂 TALENT:88 或淫乱 TALENT:76 任一即可',
  },
  {
    desc: 'M2504 K8 OSIOKI 厕所打扫刑与断食刑串档（:7905 换成 :7908 的台词，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    await era.printAndWait(`「这不是我应该做的事啊………」`); // :7905',
    replace:
      '    await era.printAndWait(`「这样的刑罚，3天左右没事的」`); // :7905（变异：串档）',
    tests: ['kojo-k8-spade'],
    must_mention: 'choice 6',
  },
  {
    desc: 'M2505 K8 OSIOKI 末档（choice == 9 未定）丢失（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  } else if (choice == 9) {',
    replace: '  } else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'choice 9',
  },
  {
    desc: 'M2506 K8 GOBI 悲伤档串成害羞档（:7929 换成 :7932 的语尾，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    await era.print(`唉……。`); // :7929',
    replace: '    await era.print(`嗯……。`); // :7929（变异：串档）',
    tests: ['kojo-k8-spade'],
    must_mention: 'ARG:0 == 3',
  },
  {
    desc: 'M2507 K8 GOBI 默认支第二支被「去重」成第三支的语尾（源作两支同文，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      await era.print(`啊。`); // :7942',
    replace:
      '      await era.print(`什么啊。`); // :7942（变异：源作同文被改）',
    tests: ['kojo-k8-spade'],
    must_mention: '默认支第二支与第一支同文（源作如此）',
  },
  {
    desc: 'M2508 K8 NTR 注册退回只收 P 的适配器（族实参是 [rand, P]，rand 被当成 P → 整段静默，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: 'ntr_koujo_family.register(8, ntr_koujo_k8);',
    replace:
      'ntr_koujo_family.register(8, (p_arg) => ntr_koujo_k8(undefined, p_arg));',
    tests: ['kojo-k8-spade'],
    must_mention: 'NTR：P==1 陥落済支走巨根（FLAG:500==0），记 CFLAG:651',
  },

  // —— #231 J21 口上·K0 慈爱（M1600-M1649 + M1790-M2015；撞号条目并入 M2420-M2599） ——
  {
    desc: 'M1600 K0 爱抚首次状态推进写错（CFLAG:301 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.爱抚 = 1; // :720',
    replace: '      kojo.爱抚 = 2; // :720（变异）',
    tests: ['kojo-k0-tender'],
    must_mention: '状态推进到 1',
  },
  {
    desc: 'M1601 K0 爱抚首次刻印分档边界（MARK:2 >= 2 改 >= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      if (mark(2) >= 2) {',
    replace: '      if (mark(2) >= 3) {',
    tests: ['kojo-k0-tender'],
    must_mention: '老实支两句',
  },
  {
    desc: 'M1602 K0 爱抚淫乱素质判据错格（TALENT:76 改 77）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    // :725-728 淫乱（TALENT:76）
    if (
      era.get(\`talent:\${target}:76\`) === 1 &&`,
    replace: `    // :725-728 淫乱（TALENT:76）
    if (
      era.get(\`talent:\${target}:77\`) === 1 &&`,
    tests: ['kojo-k0-tender'],
    must_mention: '淫乱分支',
  },
  {
    desc: 'M1603 K0 爱抚淫乱门槛 FLAG:7 == 2 旁路失效（改 === 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 3)',
    tests: ['kojo-k0-tender'],
    must_mention: '阈值闸',
  },
  {
    desc: 'M1604 K0 @EVENTEND #LATER 清标志删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    game.kojo.口上存在_0 = 0; // :81',
    replace: '    // 变异：清标志删除',
    tests: ['kojo-k0-tender'],
    must_mention: 'K0 EVENTEND 清 FLAG:100',
  },
  {
    desc: 'M1605 K0 失神守卫删除（TFLAG:899 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  // :687-688 失神時（TFLAG:899）——跨域读属主 train 的一维门面
  if (game.train.失神) {`,
    replace: `  // :687-688 失神時（TFLAG:899）——跨域读属主 train 的一维门面
  if (false) { // 变异：失神守卫删除`,
    tests: ['kojo-k0-tender'],
    must_mention: '失神（TFLAG:899）：不输出',
  },
  {
    desc: 'M1606 主启动图删 K0 口上注册（KOJO_MESSAGE_COM_0 不进实际运行图）（#231）',
    file: 'ere/system/flow/main-loop.js',
    find: "require('#/kojo/kojo-k0-tender');",
    replace: '// 变异：K0 口上不在主启动图注册',
    tests: ['kojo-family-wiring'],
    must_mention: '主启动图漏装：kojo-k0-tender（KOJO 0）',
  },
  {
    desc: 'M1607 K0 舔阴首次状态推进写错（CFLAG:302 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.舔阴 = 1; // :768',
    replace: '      kojo.舔阴 = 2; // :768（变异）',
    tests: ['kojo-k0-tender'],
    must_mention: '舔阴首次推进到 1',
  },
  {
    desc: 'M1608 K0 舔阴处女素质判据错格（TALENT:0 改 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :761-767 处女（TALENT:0）
      if (era.get(\`talent:\${target}:0\`) === 1) {`,
    replace: `      // :761-767 处女（TALENT:0）
      if (era.get(\`talent:\${target}:1\`) === 1) {`,

    tests: ['kojo-k0-tender'],
    must_mention: '处女的味道',
  },
  {
    desc: 'M1609 K0 舔阴淫乱门槛错位（CFLAG:302 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (kojo.舔阴 <= 4 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '舔阴阈值闸',
  },
  {
    desc: 'M1610 K0 死斗场守卫删除（TEQUIP:55 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  // :676-678 死斗场中は専用口上\n  if (era.get(`tequip:${target}:55`)) {',
    replace: '  if (false) { // 变异：死斗场守卫删除',
    tests: ['kojo-k0-tender'],
    must_mention: '死斗场（TEQUIP:55）',
  },
  {
    desc: 'M1611 K0 助手调教守卫删除（ASSI/ASSIPLAY 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  // :681-682 助手が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay) {`,
    replace: `  // :681-682 助手が調教した時に口上をスキップする
  if (false) { // 变异：助手守卫删除`,
    tests: ['kojo-k0-tender'],
    must_mention: '助手调教中',
  },
  {
    desc: 'M1612 K0 口塞守卫删除（TEQUIP:45 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {',
    replace: '  if (false) { // 变异：口塞守卫删除',
    tests: ['kojo-k0-tender'],
    must_mention: '口塞（TEQUIP:45）',
  },
  {
    desc: 'M1613 K0 崩坏守卫删除（TALENT:9 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  // :690-691 崩坏した場合（TALENT:9）——K0 把崩坏放在兽奸前
  if (era.get(\`talent:\${target}:9\`) === 1) {
    return 0;
  }`,
    replace: `  // :690-691 崩坏した場合（TALENT:9）——K0 把崩坏放在兽奸前
  if (false) { // 变异：崩坏守卫删除
    return 0;
  }`,
    tests: ['kojo-k0-tender'],
    must_mention: '崩坏（TALENT:9）',
  },
  {
    desc: 'M1614 K0 兽奸守卫删除（TEQUIP:89 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  // :693-695 兽奸PLAY中は専用口上\n  if (era.get(`tequip:${target}:89`)) {',
    replace: '  if (false) { // 变异：兽奸守卫删除',
    tests: ['kojo-k0-tender'],
    must_mention: '兽奸（TEQUIP:89）',
  },
  {
    desc: 'M1615 K0 触手守卫删除（TEQUIP:90 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  // :698-699 触手調教中（TEQUIP:90）\n  if (era.get(`tequip:${target}:90`)) {',
    replace: '  if (false) { // 变异：触手守卫删除',
    tests: ['kojo-k0-tender'],
    must_mention: '触手（TEQUIP:90）',
  },
  {
    desc: 'M1616 K0 @EVENTTRAIN #PRI 置 FLAG:100 删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    game.kojo.口上存在_0 = 1; // :75 FLAG:100 = 1（K0 口上存在标志）',
    replace: '    // 变异：置标志删除',
    tests: ['kojo-k0-tender'],
    must_mention: 'K0 EVENTTRAIN 置 FLAG:100',
  },
  {
    desc: 'M1617 K0 爱抚爱慕素质判据错格（TALENT:85 改 86）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :730-733 爱慕（TALENT:85）
      era.get(\`talent:\${target}:85\`) === 1 &&`,
    replace: `      // :730-733 爱慕（TALENT:85）
      era.get(\`talent:\${target}:86\`) === 1 &&`,
    tests: ['kojo-k0-tender'],
    must_mention: '爱慕分支',
  },
  {
    desc: 'M1618 K0 爱抚屈服刻印 Lv3 分档错位（MARK:2 == 3 改 == 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :735-738 屈服刻印Lv3
      mark(2) === 3 &&`,
    replace: `      // :735-738 屈服刻印Lv3
      mark(2) === 4 &&`,
    tests: ['kojo-k0-tender'],
    must_mention: '屈服刻印 Lv3',
  },
  {
    desc: 'M1619 K0 爱抚屈服刻印 Lv2 分档错位（MARK:2 == 2 改 == 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :740-743 屈服刻印Lv2
      mark(2) === 2 &&`,
    replace: `      // :740-743 屈服刻印Lv2
      mark(2) === 1 &&`,
    tests: ['kojo-k0-tender'],
    must_mention: '屈服刻印 Lv3 / Lv2',
  },
  {
    desc: 'M1620 K0 肛门爱抚首次状态推进写错（CFLAG:303 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.肛门爱抚 = 1; // :803',
    replace: '      kojo.肛门爱抚 = 2; // :803（变异）',
    tests: ['kojo-k0-tender'],
    must_mention: '肛门爱抚首次推进到 1',
  },
  {
    desc: 'M1621 K0 肛门爱抚润滑 Lv2 阈值错档（PALAMLV[2] 改 PALAMLV[3]）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    // :809-815 淫乱+润滑Lv2以上
    if (
      era.get(\`talent:\${target}:76\`) === 1 &&
      p >= PALAMLV[2] &&`,
    replace: `    // :809-815 淫乱+润滑Lv2以上
    if (
      era.get(\`talent:\${target}:76\`) === 1 &&
      p >= PALAMLV[3] &&`,
    tests: ['kojo-k0-tender'],
    must_mention: '肛门爱抚二次淫乱+润滑 Lv2',
  },
  {
    desc: 'M1622 K0 肛门爱抚末支门槛改回 CFLAG:303（原文是 223）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.首次耻情Lv2 <= 1 ||',
    replace: '      kojo.肛门爱抚 <= 1 ||',
    tests: ['kojo-k0-tender'],
    must_mention: 'CFLAG:223',
  },
  {
    desc: 'M1623 K0 肛门爱抚 A钝感附加句删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :812-813 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {`,
    replace: `      // :812-813 A感覚Lv3以上＋A鈍感
      if (false) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '钝感的肛门已经被完全开发好了、张得大大的',
  },
  {
    desc: 'M1624 K0 肛门爱抚润滑合计丢掉 UP:3（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    const p = train.润滑 + train.润滑增量;',
    replace: '    const p = train.润滑;',
    tests: ['kojo-k0-tender'],
    must_mention: 'delta 把不足抬过 Lv2',
  },
  {
    desc: 'M1625 K0 舔阴爱慕素质判据错格（TALENT:85 改 86）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :778-781 爱慕（TALENT:85）
      era.get(\`talent:\${target}:85\`) === 1 &&`,
    replace: `      // :778-781 爱慕（TALENT:85）
      era.get(\`talent:\${target}:86\`) === 1 &&`,
    tests: ['kojo-k0-tender'],
    must_mention: '好吃吗',
  },
  {
    desc: 'M1626 K0 自慰首次状态推进写错（CFLAG:304 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.自慰 = 1; // :872',
    replace: '      kojo.自慰 = 2; // :872（变异）',
    tests: ['kojo-k0-tender'],
    must_mention: '自慰首次推进到 1',
  },
  {
    desc: 'M1627 K0 自慰首次爱慕素质判据错格（TALENT:85 改 86）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :865-871 爱＆淫乱
      if (
        era.get(\`talent:\${target}:85\`) === 1 ||`,
    replace: `      // :865-871 爱＆淫乱
      if (
        era.get(\`talent:\${target}:86\`) === 1 ||`,
    tests: ['kojo-k0-tender'],
    must_mention: '请多多的…欣赏吧',
  },
  {
    desc: 'M1628 K0 自慰淫乱+处女门槛错位（CFLAG:304 <= 8 改 <= 7）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (kojo.自慰 <= 8 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '自慰阈值闸',
  },
  {
    desc: 'M1629 K0 自慰淫乱拍摄守卫删除（TEQUIP:53 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :885-894 撮影中
      if (filming) {`,
    replace: `      // :885-894 撮影中
      if (false) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '看吧～♡　噗咻噗咻勃起的',
  },
  {
    desc: 'M1630 K0 自慰拍摄鸡鸡判据错格（TALENT:122 改 123）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      era.get(`talent:${target}:122`) || era.get(`talent:${target}:121`);',
    replace:
      '      era.get(`talent:${target}:123`) || era.get(`talent:${target}:121`);',
    tests: ['kojo-k0-tender'],
    must_mention: '鸡鸡～',
  },
  {
    desc: 'M1631 K0 自慰淫乱中毒 Lv3 阈值错档（ABL:31 >= 3 改 >= 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :883-902 淫乱＋自慰中毒Lv3以上
      era.get(\`talent:\${target}:76\`) === 1 &&
      masturbation_addiction >= 3 &&`,
    replace: `      // :883-902 淫乱＋自慰中毒Lv3以上
      era.get(\`talent:\${target}:76\`) === 1 &&
      masturbation_addiction >= 4 &&`,
    tests: ['kojo-k0-tender'],
    must_mention: '自慰二次淫乱+自慰中毒 Lv3',
  },
  {
    desc: 'M1632 K0 自慰爱慕+处女素质判据错格（TALENT:85 改 86）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :913-916 爱＋处女
      era.get(\`talent:\${target}:85\`) === 1 &&`,
    replace: `      // :913-916 爱＋处女
      era.get(\`talent:\${target}:86\`) === 1 &&`,
    tests: ['kojo-k0-tender'],
    must_mention: '专属小穴',
  },
  {
    desc: 'M1633 K0 自慰屈服刻印 Lv3 分档错位（MARK:2 == 3 改 == 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :948-955 屈服刻印Lv3+自慰中毒Lv1以上
      (era.get(\`mark:\${target}:2\`) || 0) === 3 &&`,
    replace: `      // :948-955 屈服刻印Lv3+自慰中毒Lv1以上
      (era.get(\`mark:\${target}:2\`) || 0) === 4 &&`,
    tests: ['kojo-k0-tender'],
    must_mention: '如果这是你希望的话',
  },
  {
    desc: 'M1634 K0 自慰爱慕拍摄守卫删除（TEQUIP:53 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :920-929 撮影中
      if (filming) {`,
    replace: `      // :920-929 撮影中
      if (false) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '看见了吗？～♪　噗咻噗咻勃起的',
  },
  {
    desc: 'M1635 K0 自慰淫乱 RAND:3 首支旁路失效（=== 0 改 === 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        ); // :894
      } else if (rand_n(3) === 0) {`,
    replace: `        ); // :894
      } else if (rand_n(3) === 1) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '飞起来了～飞起来了～',
  },
  {
    desc: 'M1636 K0 胸爱抚首次状态推进写错（CFLAG:306 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.胸爱抚 = 1; // :1000',
    replace: '      kojo.胸爱抚 = 2; // :1000（变异）',
    tests: ['kojo-k0-tender'],
    must_mention: '胸爱抚首次推进到 1',
  },
  {
    desc: 'M1637 K0 胸爱抚母乳体质判据错格（TALENT:130 改 131）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      era.get(`talent:${target}:130`) === 1 &&',
    replace: '      era.get(`talent:${target}:131`) === 1 &&',
    tests: ['kojo-k0-tender'],
    must_mention: '吮吸并品尝母乳',
  },
  {
    desc: 'M1638 K0 胸爱抚母乳欲情阈值错档（PALAMLV[3] 改 PALAMLV[4]）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (era.get(`palam:${target}:5`) || 0) > PALAMLV[3] &&',
    replace: '      (era.get(`palam:${target}:5`) || 0) > PALAMLV[4] &&',
    tests: ['kojo-k0-tender'],
    must_mention: '吮吸并品尝母乳',
  },
  {
    desc: 'M1639 K0 胸爱抚首次 B钝感附加句删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `          // :986 B鈍感
          if (b_insensible) {`,
    replace: `          // :986 B鈍感
          if (false) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '钝感的乳头被吸吮着、被刺激的红肿起来',
  },
  {
    desc: 'M1640 K0 胸爱抚二次母乳淫乱门槛错位（CFLAG:306 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k0-tender'],
    must_mention: '胸爱抚二次母乳阈值闸',
  },
  {
    desc: 'M1641 K0 胸爱抚二次非母乳淫乱门槛错位（CFLAG:306 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k0-tender'],
    must_mention: '虽然很痛但也被弄得好舒服呢',
  },
  {
    desc: 'M1642 K0 胸爱抚二次非母乳 B钝感附加句删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :1033 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {`,
    replace: `      // :1033 B感覚Lv3以上＋B鈍感
      if (false) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '被含进嘴里舔得完全勃起了',
  },
  {
    desc: 'M1643 K0 胸爱抚二次母乳爱慕素质判据错格（TALENT:85 改 86）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        // :1012-1015 爱慕
        era.get(\`talent:\${target}:85\`) === 1 &&`,
    replace: `        // :1012-1015 爱慕
        era.get(\`talent:\${target}:86\`) === 1 &&`,
    tests: ['kojo-k0-tender'],
    must_mention: '吸我的奶来恢复精神吧',
  },
  {
    desc: 'M1644 K0 接吻首次状态推进写错（CFLAG:307 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      kojo.接吻 = 1;
      return 0;
    }

    // :1099-1124 （調教では）初めて（CFLAG:307 == 0）`,
    replace: `      kojo.接吻 = 2;
      return 0;
    }

    // :1099-1124 （調教では）初めて（CFLAG:307 == 0）`,
    tests: ['kojo-k0-tender'],
    must_mention: '接吻首次推进到 1',
  },
  {
    desc: 'M1645 K0 接吻初吻故乡恋人判据错格（TALENT:317 == 4 改 == 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    const hometown_lover = era.get(\`talent:\${target}:317\`) === 4;
    const first_kiss = game.train.初吻与自我口上;`,
    replace: `    const hometown_lover = era.get(\`talent:\${target}:317\`) === 5;
    const first_kiss = game.train.初吻与自我口上;`,
    tests: ['kojo-k0-tender'],
    must_mention: '故乡恋人',
  },
  {
    desc: 'M1646 K0 接吻二次淫乱门槛错位（CFLAG:307 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k0-tender'],
    must_mention: '接吻二次阈值闸',
  },
  {
    desc: 'M1647 K0 接吻二次顺从门槛错档（ABL:10 >= 2 改 >= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :1137-1139 顺从Lv2以上
      (era.get(\`abl:\${target}:10\`) || 0) >= 2 &&`,
    replace: `      // :1137-1139 顺从Lv2以上
      (era.get(\`abl:\${target}:10\`) || 0) >= 3 &&`,
    tests: ['kojo-k0-tender'],
    must_mention: '这样就可以了吧',
  },
  {
    desc: 'M1648 K0 自己扒开首次状态推进写错（CFLAG:308 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.自己扒开 = 1;',
    replace: '      kojo.自己扒开 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '自己扒开首次推进到 1',
  },
  {
    desc: 'M1649 K0 自己扒开二次推进写回 CFLAG:308（原文是 306）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        \`「啊哈～…主人～…请再多多的…往里面看吧～…这里已经迫不及待地想被小鸡鸡插来插去了呢\${heart(1)}」\`,
      ); // :1172
      kojo.胸爱抚 = 5;`,
    replace: `        \`「啊哈～…主人～…请再多多的…往里面看吧～…这里已经迫不及待地想被小鸡鸡插来插去了呢\${heart(1)}」\`,
      ); // :1172
      kojo.自己扒开 = 5;`,
    tests: ['kojo-k0-tender'],
    must_mention: '自己扒开二次写 CFLAG:306',
  },
  {
    desc: 'M2420 K0 插入手指首次状态推进写错（CFLAG:309 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.插入手指 = 1; // :1211',
    replace: '      kojo.插入手指 = 2; // :1211',
    tests: ['kojo-k0-tender'],
    must_mention: '插入手指首次推进到 1',
  },
  {
    desc: 'M2421 K0 插入手指二次淫乱门槛错位（CFLAG:309 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k0-tender'],
    must_mention: '插入手指二次：淫乱 + V钝感附加句',
  },
  {
    desc: 'M2422 K0 插入手指二次 V钝感附加句删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :1219-1220 V感覚Lv3以上＋V鈍感
      if (v_sense >= 3 && v_insensible) {`,
    replace: `      // :1219-1220 V感覚Lv3以上＋V鈍感
      if (false) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '贪婪的吞下了你所有的爱抚',
  },
  {
    desc: 'M2423 K0 舔肛首次状态推进写错（CFLAG:310 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.舔肛 = 1; // :1274',
    replace: '      kojo.舔肛 = 2; // :1274',
    tests: ['kojo-k0-tender'],
    must_mention: '舔肛首次推进到 1',
  },
  {
    desc: 'M2424 K0 舔肛二次淫乱门槛错位（CFLAG:310 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k0-tender'],
    must_mention: '舔肛二次：淫乱 + A钝感附加句',
  },
  {
    desc: 'M2425 K0 舔肛二次 A钝感附加句删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :1282-1283 A感覚Lv3以上＋A鈍感
      if (a_sense >= 3 && a_insensible) {`,
    replace: `      // :1282-1283 A感覚Lv3以上＋A鈍感
      if (false) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '被你的舌头弄得发出了非常带感的声音',
  },
  {
    desc: 'M2426 K0 振动宝石首次状态推进写错（CFLAG:311 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.振动宝石 = 1; // :1327',
    replace: '      kojo.振动宝石 = 2; // :1327',
    tests: ['kojo-k0-tender'],
    must_mention: '振动宝石首次推进到 1',
  },
  {
    desc: 'M2427 K0 振动宝石二次淫乱门槛错位（CFLAG:311 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k0-tender'],
    must_mention: '振动宝石二次：淫乱 / 爱慕+屈服',
  },
  {
    desc: 'M2428 K0 振动宝石二次爱慕+屈服刻印错格（MARK:2 == 3 改 == 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :1337-1340 爱＋屈服刻印Lv3
      era.get(\`talent:\${target}:85\`) === 1 &&
      (era.get(\`mark:\${target}:2\`) || 0) === 3 &&`,
    replace: `      // :1337-1340 爱＋屈服刻印Lv3
      era.get(\`talent:\${target}:85\`) === 1 &&
      (era.get(\`mark:\${target}:2\`) || 0) === 4 &&`,
    tests: ['kojo-k0-tender'],
    must_mention: '忍耐阴核的震动',
  },
  {
    desc: 'M2429 K0 壶虫首次状态推进写错（CFLAG:312 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.壶虫 = 1; // :1399',
    replace: '      kojo.壶虫 = 2; // :1399',
    tests: ['kojo-k0-tender'],
    must_mention: '壶虫首次推进到 1',
  },
  {
    desc: 'M2430 K0 壶虫开始二次淫乱门槛错位（CFLAG:312 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k0-tender'],
    must_mention: '壶虫开始二次：淫乱 + V钝感附加句',
  },
  {
    desc: 'M2431 K0 壶虫开始二次 V钝感附加句删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :1407-1408 V感覚Lv3以上＋V鈍感
      if (v_sense >= 3 && v_insensible) {`,
    replace: `      // :1407-1408 V感覚Lv3以上＋V鈍感
      if (false) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '把壶虫贪婪的连根吞了进去',
  },
  {
    desc: 'M2432 K0 壶虫脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.壶虫着脱 <= 3 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '壶虫脱着：淫乱写 CFLAG:372 = 3，门槛是 < 不是 <=',
  },
  {
    desc: 'M2433 K0 振动杖首次状态推进写错（CFLAG:313 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.振动杖 = 1; // :1474',
    replace: '      kojo.振动杖 = 2; // :1474',
    tests: ['kojo-k0-tender'],
    must_mention: '振动杖首次推进到 1',
  },
  {
    desc: 'M2434 K0 振动杖二次淫乱门槛错位（CFLAG:313 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k0-tender'],
    must_mention: '振动杖二次：淫乱 / 爱慕 / 阈值闸',
  },
  {
    desc: 'M2435 K0 振动杖二次屈服刻印错格（MARK:2 == 3 改 == 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :1489-1491 屈服刻印Lv3
      (era.get(\`mark:\${target}:2\`) || 0) === 3 &&`,
    replace: `      // :1489-1491 屈服刻印Lv3
      (era.get(\`mark:\${target}:2\`) || 0) === 4 &&`,
    tests: ['kojo-k0-tender'],
    must_mention: '明明被用这种东西玩弄',
  },
  {
    desc: 'M2436 K0 肛门虫首次状态推进写错（CFLAG:314 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.肛门虫 = 1; // :1528',
    replace: '      kojo.肛门虫 = 2; // :1528',
    tests: ['kojo-k0-tender'],
    must_mention: '肛门虫首次推进到 1',
  },
  {
    desc: 'M2437 K0 肛门虫二次淫乱+A感觉门槛错位（CFLAG:314 <= 6 改 <= 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      a_sense >= 3 &&
      (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      a_sense >= 3 &&
      (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k0-tender'],
    must_mention: '肛门虫开始二次：淫乱+A感觉拍摄 / 无A感觉写 6 / 阈值闸',
  },
  {
    desc: 'M2438 K0 肛门虫二次淫乱无A感觉写回错档（CFLAG:314 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.肛门虫 = 6; // :1551',
    replace: '      kojo.肛门虫 = 5; // :1551',
    tests: ['kojo-k0-tender'],
    must_mention: '肛门虫二次淫乱无A感觉也写 6',
  },
  {
    desc: 'M2439 K0 肛门虫脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.肛门虫着脱 <= 4 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '肛门虫脱着：淫乱写 CFLAG:374 = 4，门槛是 < 不是 <=',
  },
  {
    desc: 'M2440 K0 阴蒂夹首次状态推进写错（CFLAG:315 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.阴蒂夹 = 1; // :1628',
    replace: '      kojo.阴蒂夹 = 2; // :1628',
    tests: ['kojo-k0-tender'],
    must_mention: '阴蒂夹首次推进到 1',
  },
  {
    desc: 'M2441 K0 阴蒂夹二次淫乱门槛错位（CFLAG:315 <= 3 改 <= 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k0-tender'],
    must_mention: '阴蒂夹开始二次：淫乱 / 阈值闸',
  },
  {
    desc: 'M2442 K0 阴蒂夹脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.阴蒂夹着脱 <= 3 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '阴蒂夹脱着：淫乱写 CFLAG:375 = 3，门槛是 < 不是 <=',
  },
  {
    desc: 'M2443 K0 乳头夹首次状态推进写错（CFLAG:316 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.乳头夹 = 1; // :1693',
    replace: '      kojo.乳头夹 = 2; // :1693',
    tests: ['kojo-k0-tender'],
    must_mention: '乳头夹首次推进到 1',
  },
  {
    desc: 'M2444 K0 乳头夹二次淫乱门槛错位（CFLAG:316 <= 3 改 <= 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k0-tender'],
    must_mention: '乳头夹开始二次：淫乱 + B钝感附加句',
  },
  {
    desc: 'M3000 K0 乳头夹二次 B钝感附加句删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :1702-1703 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {`,
    replace: `      // :1702-1703 B感覚Lv3以上＋B鈍感
      if (false) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '器具毫不间断的持续为乳头带来快乐',
  },
  {
    desc: 'M3001 K0 乳头夹脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.乳头夹着脱 <= 3 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '乳头夹脱着：淫乱写 CFLAG:376 = 3，门槛是 < 不是 <=',
  },
  {
    desc: 'M3002 K0 榨乳器首次状态推进写错（CFLAG:317 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.榨乳器 = 1; // :1770',
    replace: '      kojo.榨乳器 = 2; // :1770',
    tests: ['kojo-k0-tender'],
    must_mention: '榨乳器首次推进到 1',
  },
  {
    desc: 'M3003 K0 榨乳器二次淫乱门槛错位（CFLAG:317 <= 3 改 <= 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k0-tender'],
    must_mention: '榨乳器开始二次：淫乱 + B钝感附加句',
  },
  {
    desc: 'M3004 K0 榨乳器脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.榨乳器着脱 <= 3 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '榨乳器脱着：淫乱写 CFLAG:377 = 3，门槛是 < 不是 <=',
  },
  {
    desc: 'M3005 K0 肛珠首次状态推进写错（CFLAG:320 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.肛珠 = 1; // :1891',
    replace: '      kojo.肛珠 = 2; // :1891',
    tests: ['kojo-k0-tender'],
    must_mention: '肛珠首次推进到 1',
  },
  {
    desc: 'M3006 K0 肛珠二次淫乱+A感觉门槛错位（CFLAG:320 <= 6 改 <= 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      a_sense >= 3 &&
      (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      a_sense >= 3 &&
      (kojo.肛珠 <= 5 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k0-tender'],
    must_mention: '肛珠开始二次：淫乱+A感觉写 7 / 阈值闸',
  },
  {
    desc: 'M3007 K0 肛珠二次淫乱+A感觉写回错档（CFLAG:320 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.肛珠 = 7; // :1902',
    replace: '      kojo.肛珠 = 6; // :1902',
    tests: ['kojo-k0-tender'],
    must_mention: '肛珠二次淫乱+A感觉写 7',
  },
  {
    desc: 'M3008 K0 肛珠脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.肛珠着脱 <= 4 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '肛珠脱着：淫乱写 CFLAG:379 = 4，门槛是 < 不是 <=',
  },
  {
    desc: 'M3009 K0 正常位首次状态推进写错（CFLAG:321 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.正常位 = 1; // :2032-2033',
    replace: '      kojo.正常位 = 2; // :2032-2033',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位首次推进到 1',
  },
  {
    desc: 'M3010 K0 正常位二次淫乱+性爱狂门槛错位（CFLAG:321 <= 8 改 <= 7）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:75\`) === 1 &&
        (kojo.正常位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :2035-2038`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:75\`) === 1 &&
        (kojo.正常位 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :2035-2038`,
    tests: ['kojo-k0-tender'],
    must_mention: '正常位二次淫乱+性爱狂：RAND 三支 / 写 9',
  },
  {
    desc: 'M3011 K0 正常位二次淫乱+性爱狂写回错档（CFLAG:321 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.正常位 = 9; // :2053',
    replace: '        kojo.正常位 = 8; // :2053',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位二次淫乱+性爱狂写 9',
  },
  {
    desc: 'M3012 K0 正常位二次爱慕门槛错位（CFLAG:321 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      } else if (
        era.get(\`talent:\${target}:85\`) === 1 &&
        (kojo.正常位 <= 4 || game.kojo.口上开关 === 2)
      ) {`,
    replace: `      } else if (
        era.get(\`talent:\${target}:85\`) === 1 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '正常位二次爱慕 + V钝感：小写 printformw 也出声 / 阈值闸',
  },
  {
    desc: 'M3013 K0 正常位二次爱慕 V钝感小写 printformw 删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `            await era.printAndWait(
              \`但是比起这个\${target_name}更为被\${player_name}所抱住的这一事实而心动不已………\`,
            ); // :2147`,
    replace: `            // deleted lowercase printformw :2147`,
    tests: ['kojo-k0-tender'],
    must_mention: '但是比起这个琼更为被你所抱住的这一事实而心动不已',
  },
  {
    desc: 'M3014 K0 正常位二次屈服Lv3+V感觉写回错档（CFLAG:321 = 4 改 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.正常位 = 4; // :2191',
    replace: '        kojo.正常位 = 3; // :2191',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位二次屈服Lv3+V感觉：自称首字插值，推进到 4',
  },
  {
    desc: 'M3015 K0 背后位首次状态推进写错（CFLAG:322 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.背后位 = 1; // :2277-2278',
    replace: '      kojo.背后位 = 2; // :2277-2278',
    tests: ['kojo-k0-tender'],
    must_mention: '背后位首次推进到 1',
  },
  {
    desc: 'M3016 K0 背后位二次淫乱+性爱狂门槛改回 CFLAG:322（原文读 321）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:75\`) === 1 &&
        (kojo.正常位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :2280-2282`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:75\`) === 1 &&
        (kojo.背后位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :2280-2282`,
    tests: ['kojo-k0-tender'],
    must_mention: '背后位二次淫乱+性爱狂：门槛读 CFLAG:321 不是 322',
  },
  {
    desc: 'M3017 K0 背后位二次淫乱+性爱狂写回错档（CFLAG:322 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.背后位 = 9; // :2295',
    replace: '        kojo.背后位 = 8; // :2295',
    tests: ['kojo-k0-tender'],
    must_mention: '背后位二次淫乱+性爱狂写 9',
  },
  {
    desc: 'M3018 K0 背后位二次爱慕门槛错位（CFLAG:322 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:85\`) === 1 &&
        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :2349`,
    replace: `        era.get(\`talent:\${target}:85\`) === 1 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :2349`,
    tests: ['kojo-k0-tender'],
    must_mention: '背后位二次爱慕 + V钝感附加句 / 阈值闸',
  },
  {
    desc: 'M3019 K0 对面座位首次状态推进写错（CFLAG:323 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.对面座位 = 1; // :2457-2458',
    replace: '      kojo.对面座位 = 2; // :2457-2458',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位首次推进到 1',
  },
  {
    desc: 'M3020 K0 对面座位二次淫乱+性爱狂门槛改回 CFLAG:323（原文读 321）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:75\`) === 1 &&
        (kojo.正常位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :2460-2462`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:75\`) === 1 &&
        (kojo.对面座位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :2460-2462`,
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位二次淫乱：黑心插值 / 门槛读 CFLAG:321',
  },
  {
    desc: 'M3021 K0 对面座位二次淫乱+性爱狂写回错档（CFLAG:323 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.对面座位 = 9; // :2476',
    replace: '        kojo.对面座位 = 8; // :2476',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位二次淫乱+性爱狂写 9',
  },
  {
    desc: 'M3022 K0 对面座位二次淫乱黑心插值改成白心（heart_black→heart）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '            `「呀～啊啊啊～…咕～…好紧～${heart_black(3)}」`,',
    replace: '            `「呀～啊啊啊～…咕～…好紧～${heart(3)}」`,',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位二次淫乱：黑心插值 / 门槛读 CFLAG:321',
  },
  {
    desc: 'M3023 K0 背面座位首次状态推进写错（CFLAG:324 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.背面座位 = 1; // :2627-2628',
    replace: '      kojo.背面座位 = 2; // :2627-2628',
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位首次推进到 1',
  },
  {
    desc: 'M3024 K0 背面座位二次淫乱+性爱狂门槛改回 CFLAG:324（原文读 321）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:75\`) === 1 &&
        (kojo.正常位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :2630-2632`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:75\`) === 1 &&
        (kojo.背面座位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :2630-2632`,
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位二次淫乱：黑心插值 / 门槛读 CFLAG:321',
  },
  {
    desc: 'M3025 K0 背面座位二次淫乱+性爱狂写回错档（CFLAG:324 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.背面座位 = 9; // :2646',
    replace: '        kojo.背面座位 = 8; // :2646',
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位二次淫乱+性爱狂写 9',
  },
  {
    desc: 'M3026 K0 背面座位首次淫乱黑心插值改成白心（heart_black→heart）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '            `「呀啊～…啊～…啊啊～…主人…请更多的…更多的欺负我吧…${heart_black(3)}」`,',
    replace:
      '            `「呀啊～…啊～…啊啊～…主人…请更多的…更多的欺负我吧…${heart(3)}」`,',
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位首次非处女：淫乱 + 黑心插值',
  },
  {
    desc: 'M3027 K0 正常位肛交首次状态推进写错（CFLAG:327 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.正常位肛交 = 1; // :2786-2787',
    replace: '      kojo.正常位肛交 = 2; // :2786-2787',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位肛交首次推进到 1',
  },
  {
    desc: 'M3028 K0 正常位肛交二次淫乱+A感觉门槛错位（CFLAG:327 <= 6 改 <= 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        a_sense >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2789-2791`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        a_sense >= 3 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2789-2791`,
    tests: ['kojo-k0-tender'],
    must_mention: '正常位肛交二次：淫乱+A感觉写 7 / 阈值闸',
  },
  {
    desc: 'M3029 K0 正常位肛交二次淫乱+A感觉写回错档（CFLAG:327 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.正常位肛交 = 7; // :2805',
    replace: '        kojo.正常位肛交 = 6; // :2805',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位肛交二次淫乱+A感觉写 7',
  },
  {
    desc: 'M3030 K0 背后位肛交首次状态推进写错（CFLAG:328 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.背后位肛交 = 1; // :2884-2885',
    replace: '      kojo.背后位肛交 = 2; // :2884-2885',
    tests: ['kojo-k0-tender'],
    must_mention: '背后位肛门首次推进到 1',
  },
  {
    desc: 'M3031 K0 背后位肛交二次淫乱+A感觉门槛错位（CFLAG:328 <= 6 改 <= 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        a_sense >= 3 &&
        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2887-2889`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        a_sense >= 3 &&
        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2887-2889`,
    tests: ['kojo-k0-tender'],
    must_mention: '背后位肛门二次：淫乱+A感觉写 7 / 阈值闸',
  },
  {
    desc: 'M3032 K0 背后位肛交二次淫乱+A感觉写回错档（CFLAG:328 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.背后位肛交 = 7; // :2909',
    replace: '        kojo.背后位肛交 = 6; // :2909',
    tests: ['kojo-k0-tender'],
    must_mention: '背后位肛门二次淫乱+A感觉写 7',
  },
  {
    desc: 'M3033 K0 对面座位肛交首次状态推进写错（CFLAG:329 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.对面座位肛交 = 1; // :2995-2996',
    replace: '      kojo.对面座位肛交 = 2; // :2995-2996',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位肛交首次推进到 1',
  },
  {
    desc: 'M3034 K0 对面座位肛交二次淫乱+A感觉门槛错位（CFLAG:329 <= 6 改 <= 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        a_sense >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :2998-3000`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        a_sense >= 3 &&
        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :2998-3000`,
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位肛交二次：淫乱+A感觉写 7 / 阈值闸',
  },
  {
    desc: 'M3035 K0 对面座位肛交二次淫乱+A感觉写回错档（CFLAG:329 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.对面座位肛交 = 7; // :3023',
    replace: '        kojo.对面座位肛交 = 6; // :3023',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位肛交二次淫乱+A感觉写 7',
  },
  {
    desc: 'M3036 K0 背面座位肛交首次状态推进写错（CFLAG:330 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.背面座位肛交 = 1; // :3106-3107',
    replace: '      kojo.背面座位肛交 = 2; // :3106-3107',
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位肛交首次推进到 1',
  },
  {
    desc: 'M3037 K0 背面座位肛交二次淫乱+A感觉门槛错位（CFLAG:330 <= 6 改 <= 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        a_sense >= 3 &&
        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3109-3111`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        a_sense >= 3 &&
        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3109-3111`,
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位肛交二次：淫乱+A感觉写 7 / 阈值闸',
  },
  {
    desc: 'M3038 K0 背面座位肛交二次淫乱+A感觉写回错档（CFLAG:330 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.背面座位肛交 = 7; // :3131',
    replace: '        kojo.背面座位肛交 = 6; // :3131',
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位肛交二次淫乱+A感觉写 7',
  },
  {
    desc: 'M3039 K0 手淫首次状态推进写错（CFLAG:331 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.手淫 = 1; // :3210-3211',
    replace: '      kojo.手淫 = 2; // :3210-3211',
    tests: ['kojo-k0-tender'],
    must_mention: '手淫首次推进到 1',
  },
  {
    desc: 'M3040 K0 手淫二次淫乱+侍奉门槛错位（CFLAG:331 <= 5 改 <= 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        serve >= 3 &&
        (kojo.手淫 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3213-3215`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        serve >= 3 &&
        (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3213-3215`,
    tests: ['kojo-k0-tender'],
    must_mention: '手淫二次：淫乱+侍奉写 6 / 阴茎形状读 PLAYER / 阈值闸',
  },
  {
    desc: 'M3041 K0 手淫二次淫乱+侍奉写回错档（CFLAG:331 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.手淫 = 6; // :3241',
    replace: '        kojo.手淫 = 5; // :3241',
    tests: ['kojo-k0-tender'],
    must_mention: '手淫二次淫乱+侍奉写 6',
  },
  {
    desc: 'M3042 K0 手淫二次阴茎形状读 TARGET 而非 PLAYER（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  // :3194 IF SELECTCOM == 30（手淫，CFLAG:331）
  if (era_flag.selectcom === 30) {
    const serve = era.get(\`abl:\${target}:16\`) || 0;
    const semen_addict = era.get(\`abl:\${target}:32\`) || 0;
    const penis = era.get(\`talent:\${era_flag.player}:318\`) || 0;`,
    replace: `  // :3194 IF SELECTCOM == 30（手淫，CFLAG:331）
  if (era_flag.selectcom === 30) {
    const serve = era.get(\`abl:\${target}:16\`) || 0;
    const semen_addict = era.get(\`abl:\${target}:32\`) || 0;
    const penis = era.get(\`talent:\${target}:318\`) || 0;`,
    tests: ['kojo-k0-tender'],
    must_mention: '手淫二次：淫乱+侍奉写 6 / 阴茎形状读 PLAYER / 阈值闸',
  },
  {
    desc: 'M3043 K0 口交首次状态推进写错（CFLAG:332 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.口交_奴 = 1; // :3309-3310',
    replace: '      kojo.口交_奴 = 2; // :3309-3310',
    tests: ['kojo-k0-tender'],
    must_mention: '口交首次推进到 1',
  },
  {
    desc: 'M3044 K0 口交二次淫乱+侍奉门槛错位（CFLAG:332 <= 3 改 <= 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        serve >= 5 &&
        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3312-3314`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        serve >= 5 &&
        (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :3312-3314`,
    tests: ['kojo-k0-tender'],
    must_mention: '口交二次：淫乱+侍奉写 6 / 阴茎形状读 PLAYER / 阈值闸',
  },
  {
    desc: 'M3045 K0 口交二次淫乱+侍奉写回错档（CFLAG:332 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.口交_奴 = 6; // :3333',
    replace: '        kojo.口交_奴 = 5; // :3333',
    tests: ['kojo-k0-tender'],
    must_mention: '口交二次淫乱+侍奉写 6',
  },
  {
    desc: 'M3046 K0 口交二次阴茎形状读 TARGET 而非 PLAYER（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  // :3293 IF SELECTCOM == 31（口交，CFLAG:332）
  if (era_flag.selectcom === 31) {
    const serve = era.get(\`abl:\${target}:16\`) || 0;
    const semen_addict = era.get(\`abl:\${target}:32\`) || 0;
    const penis = era.get(\`talent:\${era_flag.player}:318\`) || 0;`,
    replace: `  // :3293 IF SELECTCOM == 31（口交，CFLAG:332）
  if (era_flag.selectcom === 31) {
    const serve = era.get(\`abl:\${target}:16\`) || 0;
    const semen_addict = era.get(\`abl:\${target}:32\`) || 0;
    const penis = era.get(\`talent:\${target}:318\`) || 0;`,
    tests: ['kojo-k0-tender'],
    must_mention: '口交二次：淫乱+侍奉写 6 / 阴茎形状读 PLAYER / 阈值闸',
  },
  {
    desc: 'M3047 K0 乳交首次状态推进写错（CFLAG:333 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.乳交 = 1; // :3397-3398',
    replace: '      kojo.乳交 = 2; // :3397-3398',
    tests: ['kojo-k0-tender'],
    must_mention: '乳交首次推进到 1',
  },
  {
    desc: 'M3048 K0 乳交二次淫乱+侍奉门槛读回本档（CFLAG:332 改 CFLAG:333）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        serve >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3400-3402
        if (rand_n(2) === 0) {`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        serve >= 5 &&
        (kojo.乳交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3400-3402
        if (rand_n(2) === 0) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '乳交二次：淫乱+侍奉写 6 / 门槛读 CFLAG:332 / 阈值闸',
  },
  {
    desc: 'M3049 K0 乳交二次淫乱+侍奉门槛错位（CFLAG:332 <= 5 改 <= 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        serve >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3400-3402`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        serve >= 5 &&
        (kojo.口交_奴 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3400-3402`,
    tests: ['kojo-k0-tender'],
    must_mention: '乳交二次：淫乱+侍奉写 6 / 门槛读 CFLAG:332 / 阈值闸',
  },
  {
    desc: 'M3050 K0 乳交二次淫乱+侍奉写回错档（CFLAG:333 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.乳交 = 6; // :3416',
    replace: '        kojo.乳交 = 5; // :3416',
    tests: ['kojo-k0-tender'],
    must_mention: '乳交二次淫乱+侍奉写 6',
  },
  {
    desc: 'M3051 K0 股间性交首次状态推进写错（CFLAG:334 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.股间性交 = 1; // :3474-3475',
    replace: '      kojo.股间性交 = 2; // :3474-3475',
    tests: ['kojo-k0-tender'],
    must_mention: '股间性交首次推进到 1',
  },
  {
    desc: 'M3052 K0 股间性交二次淫乱+处女门槛错位（CFLAG:334 <= 5 改 <= 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:0\`) === 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3477-3479`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:0\`) === 1 &&
        (kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3477-3479`,
    tests: ['kojo-k0-tender'],
    must_mention: '股间性交二次：淫乱+处女写 6 / 阈值闸',
  },
  {
    desc: 'M3053 K0 股间性交二次淫乱+处女写回错档（CFLAG:334 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.股间性交 = 6; // :3482',
    replace: '        kojo.股间性交 = 5; // :3482',
    tests: ['kojo-k0-tender'],
    must_mention: '股间性交二次淫乱+处女写 6',
  },
  {
    desc: 'M3054 K0 股间性交二次丢掉处女条件（TALENT:0）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:0\`) === 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3477-3479
        await era.printAndWait(`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3477-3479
        await era.printAndWait(`,
    tests: ['kojo-k0-tender'],
    must_mention: '股间性交二次：淫乱+处女写 6 / 阈值闸',
  },
  {
    desc: 'M3055 K0 骑乘位首次状态推进写错（CFLAG:335 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.骑乘位 = 1; // :3582-3583',
    replace: '      kojo.骑乘位 = 2; // :3582-3583',
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位首次推进到 1',
  },
  {
    desc: 'M3056 K0 骑乘位二次淫乱+性爱狂门槛读回本档（CFLAG:321 改 CFLAG:335）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:75\`) === 1 &&
        (kojo.正常位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :3585-3587
        if (rand_n(4) === 0) {`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:75\`) === 1 &&
        (kojo.骑乘位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :3585-3587
        if (rand_n(4) === 0) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位二次：淫乱+性爱狂写 9 / 门槛读 CFLAG:321 / 阈值闸',
  },
  {
    desc: 'M3057 K0 骑乘位二次淫乱+性爱狂门槛错位（CFLAG:321 <= 8 改 <= 7）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:75\`) === 1 &&
        (kojo.正常位 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :3585-3587`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era.get(\`talent:\${target}:75\`) === 1 &&
        (kojo.正常位 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :3585-3587`,
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位二次：淫乱+性爱狂写 9 / 门槛读 CFLAG:321 / 阈值闸',
  },
  {
    desc: 'M3058 K0 骑乘位二次淫乱+性爱狂写回错档（CFLAG:335 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.骑乘位 = 9; // :3609',
    replace: '        kojo.骑乘位 = 8; // :3609',
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位二次淫乱+性爱狂写 9',
  },
  {
    desc: 'M3059 K0 全身擦洗首次状态推进写错（CFLAG:336 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.全身擦洗 = 1; // :3810-3811',
    replace: '      kojo.全身擦洗 = 2; // :3810-3811',
    tests: ['kojo-k0-tender'],
    must_mention: '全身擦洗首次推进到 1',
  },
  {
    desc: 'M3060 K0 全身擦洗二次淫乱+侍奉门槛错位（CFLAG:336 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        serve >= 5 &&
        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3813-3815`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        serve >= 5 &&
        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3813-3815`,
    tests: ['kojo-k0-tender'],
    must_mention: '全身擦洗二次：淫乱+侍奉写 5 / 阈值闸',
  },
  {
    desc: 'M3061 K0 全身擦洗二次淫乱+侍奉写回错档（CFLAG:336 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.全身擦洗 = 5; // :3818',
    replace: '        kojo.全身擦洗 = 4; // :3818',
    tests: ['kojo-k0-tender'],
    must_mention: '全身擦洗二次淫乱+侍奉写 5',
  },
  {
    desc: 'M3062 K0 骑乘位肛交首次状态推进写错（CFLAG:337 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.骑乘位肛交 = 1; // :3865-3866',
    replace: '      kojo.骑乘位肛交 = 2; // :3865-3866',
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位肛交首次推进到 1',
  },
  {
    desc: 'M3063 K0 骑乘位肛交二次淫乱+A感觉门槛错位（CFLAG:337 <= 6 改 <= 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        a_sense >= 3 &&
        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :3868-3870`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        a_sense >= 3 &&
        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :3868-3870`,
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位肛交二次：淫乱+A感觉写 7 / 阈值闸',
  },
  {
    desc: 'M3064 K0 骑乘位肛交二次淫乱+A感觉写回错档（CFLAG:337 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.骑乘位肛交 = 7; // :3888',
    replace: '        kojo.骑乘位肛交 = 6; // :3888',
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位肛交二次淫乱+A感觉写 7',
  },
  {
    desc: 'M3065 K0 肛门侍奉首次状态推进写错（CFLAG:338 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.肛门侍奉 = 1; // :3972-3973',
    replace: '      kojo.肛门侍奉 = 2; // :3972-3973',
    tests: ['kojo-k0-tender'],
    must_mention: '肛门侍奉首次推进到 1',
  },
  {
    desc: 'M3066 K0 肛门侍奉二次淫乱+侍奉门槛错位（CFLAG:338 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        serve >= 5 &&
        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :3975-3977`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        serve >= 5 &&
        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :3975-3977`,
    tests: ['kojo-k0-tender'],
    must_mention: '肛门侍奉二次：淫乱+侍奉写 5 / 阈值闸',
  },
  {
    desc: 'M3067 K0 肛门侍奉二次淫乱+侍奉写回错档（CFLAG:338 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.肛门侍奉 = 5; // :3980',
    replace: '        kojo.肛门侍奉 = 4; // :3980',
    tests: ['kojo-k0-tender'],
    must_mention: '肛门侍奉二次淫乱+侍奉写 5',
  },
  {
    desc: 'M3068 K0 打屁股首次状态推进写错（CFLAG:341 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.打屁股 = 1; // :4010-4011',
    replace: '      kojo.打屁股 = 2; // :4010-4011',
    tests: ['kojo-k0-tender'],
    must_mention: '打屁股首次推进到 1',
  },
  {
    desc: 'M3069 K0 打屁股二次淫乱+抖M门槛错位（CFLAG:341 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        masochism >= 3 &&
        (kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4013-4015`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        masochism >= 3 &&
        (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4013-4015`,
    tests: ['kojo-k0-tender'],
    must_mention: '打屁股二次：淫乱+抖M写 5 / 末支须 FLAG:7==2 / 阈值闸',
  },
  {
    desc: 'M3070 K0 打屁股二次淫乱+抖M写回错档（CFLAG:341 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.打屁股 = 5; // :4018',
    replace: '        kojo.打屁股 = 4; // :4018',
    tests: ['kojo-k0-tender'],
    must_mention: '打屁股二次淫乱+抖M写 5',
  },
  {
    desc: 'M3071 K0 打屁股二次末支 AND 改成 OR（FLAG:7==2 闸失效）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {',
    replace: '      } else if (kojo.打屁股 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k0-tender'],
    must_mention: '打屁股二次：淫乱+抖M写 5 / 末支须 FLAG:7==2 / 阈值闸',
  },
  {
    desc: 'M3072 K0 鞭首次状态推进写错（CFLAG:342 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.鞭 = 1; // :4055-4056',
    replace: '      kojo.鞭 = 2; // :4055-4056',
    tests: ['kojo-k0-tender'],
    must_mention: '鞭首次推进到 1',
  },
  {
    desc: 'M3073 K0 鞭二次淫乱+抖M门槛错位（CFLAG:342 <= 8 改 <= 7）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        masochism >= 5 &&
        (kojo.鞭 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :4058-4060`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        masochism >= 5 &&
        (kojo.鞭 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :4058-4060`,
    tests: ['kojo-k0-tender'],
    must_mention: '鞭二次：淫乱+抖M写 9 / 末支读 CFLAG:335 / 阈值闸',
  },
  {
    desc: 'M3074 K0 鞭二次淫乱+抖M写回错档（CFLAG:342 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.鞭 = 9; // :4064',
    replace: '        kojo.鞭 = 8; // :4064',
    tests: ['kojo-k0-tender'],
    must_mention: '鞭二次淫乱+抖M写 9',
  },
  {
    desc: 'M3075 K0 鞭二次末支门槛改回自己的 CFLAG:342（应读 CFLAG:335）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {\n        // :4098',
    replace:
      '      } else if (kojo.鞭 <= 1 || game.kojo.口上开关 === 2) {\n        // :4098',
    tests: ['kojo-k0-tender'],
    must_mention: '鞭二次：淫乱+抖M写 9 / 末支读 CFLAG:335 / 阈值闸',
  },
  {
    desc: 'M3076 K0 针首次状态推进写错（CFLAG:343 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.针 = 1; // :4123-4124',
    replace: '      kojo.针 = 2; // :4123-4124',
    tests: ['kojo-k0-tender'],
    must_mention: '针首次推进到 1',
  },
  {
    desc: 'M3077 K0 针二次淫乱+抖M门槛错位（CFLAG:343 <= 8 改 <= 7）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        masochism >= 5 &&
        (kojo.针 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :4126-4128`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        masochism >= 5 &&
        (kojo.针 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :4126-4128`,
    tests: ['kojo-k0-tender'],
    must_mention: '针二次：淫乱+抖M写 9 / 阈值闸',
  },
  {
    desc: 'M3078 K0 针二次淫乱+抖M写回错档（CFLAG:343 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.针 = 9; // :4131',
    replace: '        kojo.针 = 8; // :4131',
    tests: ['kojo-k0-tender'],
    must_mention: '针二次淫乱+抖M写 9',
  },
  {
    desc: 'M3079 K0 眼罩开始首次状态推进写错（CFLAG:344 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.眼罩 = 1; // :4186-4187',
    replace: '      kojo.眼罩 = 2; // :4186-4187',
    tests: ['kojo-k0-tender'],
    must_mention: '眼罩首次推进到 1',
  },
  {
    desc: 'M3080 K0 眼罩开始二次爱慕+抖M门槛错位（CFLAG:344 <= 5 改 <= 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:85\`) === 1 &&
        masochism >= 5 &&
        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4189-4192`,
    replace: `        era.get(\`talent:\${target}:85\`) === 1 &&
        masochism >= 5 &&
        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4189-4192`,
    tests: ['kojo-k0-tender'],
    must_mention: '眼罩开始二次：爱慕+抖M写 6 / 阈值闸',
  },
  {
    desc: 'M3081 K0 眼罩开始二次爱慕+抖M写回错档（CFLAG:344 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.眼罩 = 6; // :4193',
    replace: '        kojo.眼罩 = 5; // :4193',
    tests: ['kojo-k0-tender'],
    must_mention: '眼罩开始二次爱慕+抖M写 6',
  },
  {
    desc: 'M3082 K0 眼罩脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.眼罩着脱 <= 2 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '眼罩脱着：爱慕写 CFLAG:380 = 2，门槛是 < 不是 <=',
  },
  {
    desc: 'M3083 K0 绳子开始首次状态推进写错（CFLAG:345 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.绳子 = 1; // :4248-4249',
    replace: '      kojo.绳子 = 2; // :4248-4249',
    tests: ['kojo-k0-tender'],
    must_mention: '绳子首次推进到 1',
  },
  {
    desc: 'M3084 K0 绳子开始二次淫乱+抖M门槛错位（CFLAG:345 <= 8 改 <= 7）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        masochism >= 5 &&
        (kojo.绳子 <= 8 || game.kojo.口上开关 === 2)
      ) {
        // :4251-4253`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        masochism >= 5 &&
        (kojo.绳子 <= 7 || game.kojo.口上开关 === 2)
      ) {
        // :4251-4253`,
    tests: ['kojo-k0-tender'],
    must_mention: '绳子开始二次：淫乱+抖M写 9 / 阈值闸',
  },
  {
    desc: 'M3085 K0 绳子开始二次淫乱+抖M写回错档（CFLAG:345 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.绳子 = 9; // :4257',
    replace: '        kojo.绳子 = 8; // :4257',
    tests: ['kojo-k0-tender'],
    must_mention: '绳子开始二次淫乱+抖M写 9',
  },
  {
    desc: 'M3086 K0 绳子脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :4302`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.绳子着脱 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // :4302`,
    tests: ['kojo-k0-tender'],
    must_mention: '绳子脱着：淫乱写 CFLAG:385 = 2，门槛是 < 不是 <=',
  },
  {
    desc: 'M3087 K0 口塞开始首次状态推进写错（CFLAG:346 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.口塞 = 1; // :4331-4332',
    replace: '      kojo.口塞 = 2; // :4331-4332',
    tests: ['kojo-k0-tender'],
    must_mention: '口塞首次推进到 1',
  },
  {
    desc: 'M3088 K0 口塞开始二次爱慕+抖M门槛错位（CFLAG:346 <= 5 改 <= 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:85\`) === 1 &&
        masochism >= 5 &&
        (kojo.口塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4334-4336`,
    replace: `        era.get(\`talent:\${target}:85\`) === 1 &&
        masochism >= 5 &&
        (kojo.口塞 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4334-4336`,
    tests: ['kojo-k0-tender'],
    must_mention: '口塞开始二次：爱慕+抖M写 6 / 阈值闸',
  },
  {
    desc: 'M3089 K0 口塞开始二次爱慕+抖M写回错档（CFLAG:346 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.口塞 = 6; // :4338',
    replace: '        kojo.口塞 = 5; // :4338',
    tests: ['kojo-k0-tender'],
    must_mention: '口塞开始二次爱慕+抖M写 6',
  },
  {
    desc: 'M3090 K0 口塞脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      (era.get(\`talent:\${target}:85\`) === 1 ||
        era.get(\`talent:\${target}:76\`) === 1) &&
      (kojo.口塞着脱 < 2 || game.kojo.口上开关 === 2)
    ) {
      // :4361`,
    replace: `      (era.get(\`talent:\${target}:85\`) === 1 ||
        era.get(\`talent:\${target}:76\`) === 1) &&
      (kojo.口塞着脱 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // :4361`,
    tests: ['kojo-k0-tender'],
    must_mention: '口塞脱着：爱慕或淫乱写 CFLAG:386 = 2，门槛是 < 不是 <=',
  },
  {
    desc: 'M3091 K0 灌肠肛塞开始首次状态推进写错（CFLAG:347 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.灌肠肛塞 = 1; // :4389-4390',
    replace: '      kojo.灌肠肛塞 = 2; // :4389-4390',
    tests: ['kojo-k0-tender'],
    must_mention: '灌肠肛塞首次推进到 1',
  },
  {
    desc: 'M3092 K0 灌肠肛塞开始二次淫乱+A感觉+抖M门槛错位（CFLAG:347 <= 6 改 <= 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        a_sense >= 3 &&
        masochism >= 3 &&
        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // :4392-4394`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        a_sense >= 3 &&
        masochism >= 3 &&
        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4392-4394`,
    tests: ['kojo-k0-tender'],
    must_mention: '灌肠+肛塞开始二次：淫乱+A感觉+抖M写 7 / 阈值闸',
  },
  {
    desc: 'M3093 K0 灌肠肛塞开始二次淫乱+A感觉+抖M写回错档（CFLAG:347 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.灌肠肛塞 = 7; // :4398',
    replace: '        kojo.灌肠肛塞 = 6; // :4398',
    tests: ['kojo-k0-tender'],
    must_mention: '灌肠肛塞开始二次淫乱+A感觉+抖M写 7',
  },
  {
    desc: 'M3094 K0 灌肠肛塞脱着 RAND:2 首支旁路失效（=== 0 改 === 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        if (rand_n(2) === 0) {
          // :4432
          era.print(\`「呀…嗯啊、啊、啊啊！\`); // :4433`,
    replace: `        if (rand_n(2) === 1) {
          // :4432
          era.print(\`「呀…嗯啊、啊、啊啊！\`); // :4433`,
    tests: ['kojo-k0-tender'],
    must_mention: '灌肠+肛塞脱着：淫乱+A感觉拼句',
  },
  {
    desc: 'M3095 K0 灌肠肛塞脱着壶虫守卫删除（TEQUIP:11 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        if (era.get(\`tequip:\${target}:11\`)) {
          // :4446`,
    replace: `        if (false) {
          // :4446`,
    tests: ['kojo-k0-tender'],
    must_mention: '壶虫',
  },
  {
    desc: 'M3096 K0 灌肠肛塞脱着空 PRINTFORMW 等待被删（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "        await era.printAndWait(''); // :4468-4469",
    replace: '        // :4468-4469 空等待被删',
    tests: ['kojo-k0-tender'],
    must_mention: '空 PRINTFORMW 仍等待',
  },
  {
    desc: 'M3097 K0 放置PLAY首次状态推进写错（CFLAG:356 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.放置PLAY = 1; // :4566-4567',
    replace: '      kojo.放置PLAY = 2; // :4566-4567',
    tests: ['kojo-k0-tender'],
    must_mention: '放置PLAY首次推进到 1',
  },
  {
    desc: 'M3098 K0 放置PLAY二次淫乱+欲情门槛错位（CFLAG:356 <= 5 改 <= 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        (era.get(\`palam:\${target}:5\`) || 0) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4574`,
    replace: `        (era.get(\`palam:\${target}:5\`) || 0) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4574`,
    tests: ['kojo-k0-tender'],
    must_mention: '放置PLAY二次：淫乱+欲情写 6 / 阈值闸',
  },
  {
    desc: 'M3099 K0 放置PLAY二次淫乱+欲情写回错档（CFLAG:356 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.放置PLAY = 6; // :4577',
    replace: '        kojo.放置PLAY = 5; // :4577',
    tests: ['kojo-k0-tender'],
    must_mention: '放置PLAY二次淫乱+欲情写 6',
  },
  {
    desc: 'M3100 K0 放置PLAY二次欲情门槛改成 PALAMLV[4]（原文是 PALAMLV[3]）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (era.get(\`palam:\${target}:5\`) || 0) >= PALAMLV[3] &&
        (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4574`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (era.get(\`palam:\${target}:5\`) || 0) >= PALAMLV[4] &&
        (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)
      ) {
        // :4574`,
    tests: ['kojo-k0-tender'],
    must_mention: '放置PLAY二次：淫乱+欲情写 6 / 阈值闸',
  },
  {
    desc: 'M3101 K0 放置PLAY首次壶虫 SIF 守卫删除（TEQUIP:11 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      if (era.get(\`tequip:\${target}:11\`)) {
        // :4531-4532`,
    replace: `      if (false) {
        // :4531-4532`,
    tests: ['kojo-k0-tender'],
    must_mention: '首次装备 SIF：壶虫',
  },
  {
    desc: 'M3102 K0 放置PLAY二次 PRINTL 空行被删（耗尽档应仍输出）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "      era.print(''); // :4599",
    replace: '      // :4599 PRINTL 被删',
    tests: ['kojo-k0-tender'],
    must_mention: '放置PLAY二次：淫乱+欲情写 6 / 阈值闸',
  },
  {
    desc: 'M3103 K0 交谈首次状态推进写错（CFLAG:357 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.交谈 = 1; // :4697-4698',
    replace: '      kojo.交谈 = 2; // :4697-4698',
    tests: ['kojo-k0-tender'],
    must_mention: '交谈首次推进到 1',
  },
  {
    desc: 'M3104 K0 交谈录像自白 TFLAG:32 按位或改成赋值（|= 2 改 = 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '          game.kojo.录像内容 |= 2; // :4657',
    replace: '          game.kojo.录像内容 = 2; // :4657',
    tests: ['kojo-k0-tender'],
    must_mention: '录像自白 TFLAG:32 |= 2',
  },
  {
    desc: 'M3105 K0 交谈二次录像沉默支仍写 TFLAG:32（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `          await era.printAndWait(\`但\${target_name}把头转向一边什么话也不说。\`); // :4723-4724`,
    replace: `          await era.printAndWait(\`但\${target_name}把头转向一边什么话也不说。\`); // :4723-4724
          game.kojo.录像内容 |= 2;`,
    tests: ['kojo-k0-tender'],
    must_mention: '沉默支不写 TFLAG:32',
  },
  {
    desc: 'M3106 K0 交谈二次插着不拔门面改成 tflag:59（原文是 TFLAG:60）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `          (era.get(\`abl:\${target}:10\`) || 0) >= 5) &&
          game.event.插着不拔
        ) {
          // :4727-4728`,
    replace: `          (era.get(\`abl:\${target}:10\`) || 0) >= 5) &&
          era.get('tflag:59')
        ) {
          // :4727-4728`,
    tests: ['kojo-k0-tender'],
    must_mention: '交谈二次：不写 CFLAG / 插着不拔情话',
  },
  {
    desc: 'M3107 K0 交谈首次录像自白 RAND:3 旁路失效（=== 0 改 === 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `          rand_n(3) === 0 &&
          (era.get(\`talent:\${target}:89\`) === 1 ||
            (era.get(\`abl:\${target}:17\`) || 0) >= 5)
        ) {
          // :4651`,
    replace: `          rand_n(3) === 1 &&
          (era.get(\`talent:\${target}:89\`) === 1 ||
            (era.get(\`abl:\${target}:17\`) || 0) >= 5)
        ) {
          // :4651`,
    tests: ['kojo-k0-tender'],
    must_mention: '交谈首次：淫乱推进到 1 / 录像自白写 TFLAG:32 |= 2',
  },
  {
    desc: 'M3108 K0 乳夹口交首次状态推进写错（CFLAG:360 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.乳夹口交 = 1; // :4797-4798',
    replace: '      kojo.乳夹口交 = 2; // :4797-4798',
    tests: ['kojo-k0-tender'],
    must_mention: '乳夹口交首次推进到 1',
  },
  {
    desc: 'M3109 K0 乳夹口交二次淫乱写回错档（CFLAG:360 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.乳夹口交 = 5; // :4809',
    replace: '        kojo.乳夹口交 = 4; // :4809',
    tests: ['kojo-k0-tender'],
    must_mention: '乳夹口交二次淫乱写 5',
  },
  {
    desc: 'M3110 K0 乳夹口交二次淫乱门槛错位（CFLAG:360 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4800-4802`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4800-4802`,
    tests: ['kojo-k0-tender'],
    must_mention: '乳夹口交二次：淫乱写 5 / 阈值闸',
  },
  {
    desc: 'M3111 K0 乳夹口交首次巨乳 SIF 守卫删除（TALENT:110 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `          era.get(\`talent:\${target}:110\`) === 1 ||
          era.get(\`talent:\${target}:114\`) === 1 ||
          era.get(\`talent:\${target}:119\`) === 1
        ) {
          // :4769-4770`,
    replace: `          false ||
          era.get(\`talent:\${target}:114\`) === 1 ||
          era.get(\`talent:\${target}:119\`) === 1
        ) {
          // :4769-4770`,
    tests: ['kojo-k0-tender'],
    must_mention: '乳夹口交首次：淫乱，推进到 1 / 巨乳 SIF',
  },
  {
    desc: 'M3112 K0 口交时自慰首次状态推进写错（CFLAG:361 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.口交时自慰 = 1; // :4862-4863',
    replace: '      kojo.口交时自慰 = 2; // :4862-4863',
    tests: ['kojo-k0-tender'],
    must_mention: '口交时自慰首次推进到 1',
  },
  {
    desc: 'M3113 K0 口交时自慰二次淫乱写回错档（CFLAG:361 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.口交时自慰 = 5; // :4873',
    replace: '        kojo.口交时自慰 = 4; // :4873',
    tests: ['kojo-k0-tender'],
    must_mention: '口交时自慰二次淫乱写 5',
  },
  {
    desc: 'M3114 K0 口交时自慰二次淫乱门槛错位（CFLAG:361 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4865-4867`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4865-4867`,
    tests: ['kojo-k0-tender'],
    must_mention: '口交时自慰二次：淫乱写 5 / 阈值闸',
  },
  {
    desc: 'M3115 K0 手搓口交首次状态推进写错（CFLAG:362 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.手搓口交 = 1; // :4922-4923',
    replace: '      kojo.手搓口交 = 2; // :4922-4923',
    tests: ['kojo-k0-tender'],
    must_mention: '手搓口交首次推进到 1',
  },
  {
    desc: 'M3116 K0 手搓口交二次淫乱写回错档（CFLAG:362 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.手搓口交 = 5; // :4933',
    replace: '        kojo.手搓口交 = 4; // :4933',
    tests: ['kojo-k0-tender'],
    must_mention: '手搓口交二次淫乱写 5',
  },
  {
    desc: 'M3117 K0 手搓口交二次淫乱门槛错位（CFLAG:362 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.手搓口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4925-4927`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4925-4927`,
    tests: ['kojo-k0-tender'],
    must_mention: '手搓口交二次：淫乱写 5 / 阈值闸',
  },
  {
    desc: 'M3118 K0 真空口交首次状态推进写错（CFLAG:363 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.真空口交 = 1; // :4983-4984',
    replace: '      kojo.真空口交 = 2; // :4983-4984',
    tests: ['kojo-k0-tender'],
    must_mention: '真空口交首次推进到 1',
  },
  {
    desc: 'M3119 K0 真空口交二次淫乱写回错档（CFLAG:363 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.真空口交 = 5; // :4994',
    replace: '        kojo.真空口交 = 4; // :4994',
    tests: ['kojo-k0-tender'],
    must_mention: '真空口交二次淫乱写 5',
  },
  {
    desc: 'M3120 K0 真空口交二次淫乱门槛错位（CFLAG:363 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :4986-4988`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :4986-4988`,
    tests: ['kojo-k0-tender'],
    must_mention: '真空口交二次：淫乱写 5 / 阈值闸',
  },
  {
    desc: 'M3121 K0 六九式首次状态推进写错（CFLAG:364 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.六九式 = 1; // :5043-5044',
    replace: '      kojo.六九式 = 2; // :5043-5044',
    tests: ['kojo-k0-tender'],
    must_mention: '六九式首次推进到 1',
  },
  {
    desc: 'M3122 K0 六九式二次淫乱写回错档（CFLAG:364 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.六九式 = 5; // :5053',
    replace: '        kojo.六九式 = 4; // :5053',
    tests: ['kojo-k0-tender'],
    must_mention: '六九式二次淫乱写 5',
  },
  {
    desc: 'M3123 K0 六九式二次淫乱门槛错位（CFLAG:364 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.六九式 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5046-5048`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.六九式 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5046-5048`,
    tests: ['kojo-k0-tender'],
    must_mention: '六九式二次：淫乱写 5 / 阈值闸',
  },
  {
    desc: 'M3124 K0 深喉首次状态推进写错（CFLAG:365 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.深喉 = 1; // :5101-5102',
    replace: '      kojo.深喉 = 2; // :5101-5102',
    tests: ['kojo-k0-tender'],
    must_mention: '深喉首次推进到 1',
  },
  {
    desc: 'M3125 K0 深喉二次淫乱写回错档（CFLAG:365 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.深喉 = 5; // :5112',
    replace: '        kojo.深喉 = 4; // :5112',
    tests: ['kojo-k0-tender'],
    must_mention: '深喉二次淫乱写 5',
  },
  {
    desc: 'M3126 K0 深喉二次淫乱门槛改回 CFLAG:365（原文读 363）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5104-5106`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.深喉 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5104-5106`,
    tests: ['kojo-k0-tender'],
    must_mention: '深喉二次：读 CFLAG:363 写 CFLAG:365 / 阈值闸',
  },
  {
    desc: 'M3127 K0 深喉二次淫乱门槛错位（CFLAG:363 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5104-5106`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5104-5106`,
    tests: ['kojo-k0-tender'],
    must_mention: '深喉二次：读 CFLAG:363 写 CFLAG:365 / 阈值闸',
  },
  {
    desc: 'M3128 K0 强制口交首次状态推进写错（CFLAG:381 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.强制口交 = 1; // :5159-5160',
    replace: '      kojo.强制口交 = 2; // :5159-5160',
    tests: ['kojo-k0-tender'],
    must_mention: '强制口交首次推进到 1',
  },
  {
    desc: 'M3129 K0 强制口交二次淫乱写回错档（CFLAG:381 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.强制口交 = 5; // :5170',
    replace: '        kojo.强制口交 = 4; // :5170',
    tests: ['kojo-k0-tender'],
    must_mention: '强制口交二次淫乱写 5',
  },
  {
    desc: 'M3130 K0 强制口交二次淫乱门槛错位（CFLAG:381 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.强制口交 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // :5162-5164`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5162-5164`,
    tests: ['kojo-k0-tender'],
    must_mention: '强制口交二次：淫乱写 5 / 黑心 / 阈值闸',
  },
  {
    desc: 'M3131 K0 强制口交二次淫乱黑心插值改成白心（heart_black→heart）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `          \`「嗯～嗯呼唔呜…嗯～…嗯姆呜呜…嗯～\${heart_black(1)}嗯～\${heart_black(1)}嗯～\${heart_black(1)}嗯～\${heart_black(1)}嗯～\${heart_black(1)}」\`,
        ); // :5167`,
    replace: `          \`「嗯～嗯呼唔呜…嗯～…嗯姆呜呜…嗯～\${heart(1)}嗯～\${heart(1)}嗯～\${heart(1)}嗯～\${heart(1)}嗯～\${heart(1)}」\`,
        ); // :5167`,
    tests: ['kojo-k0-tender'],
    must_mention: '强制口交二次：淫乱写 5 / 黑心 / 阈值闸',
  },
  {
    desc: 'M3132 K0 穿环首次状态推进写错（CFLAG:348 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.穿环 = 1; // :5336-5337',
    replace: '      kojo.穿环 = 2; // :5336-5337',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环首次推进到 1',
  },
  {
    desc: 'M3133 K0 穿环二次淫乱写回错档（CFLAG:348 = 4 改 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.穿环 = 4; // :5385',
    replace: '        kojo.穿环 = 3; // :5385',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环二次淫乱写 4',
  },
  {
    desc: 'M3134 K0 穿环二次淫乱门槛错位（CFLAG:348 <= 3 改 <= 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.穿环 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // :5344`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.穿环 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // :5344`,
    tests: ['kojo-k0-tender'],
    must_mention: '穿环二次：淫乱写 4 / 阈值闸',
  },
  {
    desc: 'M3135 K0 穿环二次爱慕写回错档（CFLAG:348 = 3 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.穿环 = 3; // :5428',
    replace: '        kojo.穿环 = 2; // :5428',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环二次爱慕写 3',
  },
  {
    desc: 'M3136 K0 穿环二次それ以外写回错档（CFLAG:348 = 2 改 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.穿环 = 2; // :5471',
    replace: '        kojo.穿环 = 1; // :5471',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环二次それ以外写 2',
  },
  {
    desc: 'M3137 K0 穿环首次 CFLAG:7 位图闸改恒真（取下支失效）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        if (train.穿环状态 & p) {
          // :5209`,
    replace: `        if (true) {
          // :5209`,
    tests: ['kojo-k0-tender'],
    must_mention: '穿环首次：淫乱取下（CFLAG:7 无对应位）',
  },
  {
    desc: 'M3138 K0 穿环 阴核(TARGET) 插值恒改成阴茎（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  const clitoris_word = (cid) =>
    (era.get(\`talent:\${cid}:122\`) || 0) !== 0 ? '阴茎' : '阴核';`,
    replace: `  const clitoris_word = (cid) =>
    (era.get(\`talent:\${cid}:122\`) || 0) !== 0 ? '阴茎' : '阴茎';`,
    tests: ['kojo-k0-tender'],
    must_mention: '阴核(TARGET) 插值',
  },
  {
    desc: 'M3139 K0 穿环二次爱慕阴茎支 TALENT:122 错格（改 123）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `            if (
              era.get(\`talent:\${target}:121\`) ||
              era.get(\`talent:\${target}:122\`)
            ) {
              // :5404`,
    replace: `            if (
              era.get(\`talent:\${target}:121\`) ||
              era.get(\`talent:\${target}:123\`)
            ) {
              // :5404`,
    tests: ['kojo-k0-tender'],
    must_mention: '穿环二次：爱慕写 3 / 阴茎位走鸡鸡支',
  },
  {
    desc: 'M3140 K0 穿环首次乳头位 P==1 改 P==2（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `          if (p === 1) {
            // :5212`,
    replace: `          if (p === 2) {
            // :5212`,
    tests: ['kojo-k0-tender'],
    must_mention: '穿环首次：淫乱 + 乳头位（P=1）装上，推进到 1',
  },
  {
    desc: 'M3141 K0 穿环首次淫乱素质判据错格（TALENT:76 改 77）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      } else if (era.get(\`talent:\${target}:76\`) === 1) {
        // :5207`,
    replace: `      } else if (era.get(\`talent:\${target}:77\`) === 1) {
        // :5207`,
    tests: ['kojo-k0-tender'],
    must_mention: '穿环首次：淫乱 + 乳头位（P=1）装上，推进到 1',
  },
  {
    desc: 'M3142 K0 EVENTTRAIN NORMAL 总开关守卫删松（<= 0 改 < 0）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  if (game.kojo.口上开关 <= 0) {
    // :88-89
    return 0;
  }`,
    replace: `  if (game.kojo.口上开关 < 0) {
    // :88-89
    return 0;
  }`,
    tests: ['kojo-k0-tender'],
    must_mention: 'FLAG:7 <= 0 静默',
  },
  {
    desc: 'M3143 K0 EVENTTRAIN NORMAL 慈爱素质守卫错格（!== 1 改 !== 0）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  if (chara(target).chara.慈爱 !== 1) {
    // :90-91
    return 0;
  }`,
    replace: `  if (chara(target).chara.慈爱 !== 0) {
    // :90-91
    return 0;
  }`,
    tests: ['kojo-k0-tender'],
    must_mention: 'K0 EVENTTRAIN NORMAL：非慈爱素质静默',
  },
  {
    desc: 'M3144 K0 EVENTTRAIN NORMAL 首次精灵状态推进写错（CFLAG:201 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      kojo.初调教 = 1; // :103`,
    replace: `      kojo.初调教 = 2; // :103`,
    tests: ['kojo-k0-tender'],
    must_mention: '首次精灵推进到 1',
  },
  {
    desc: 'M3145 K0 EVENTTRAIN NORMAL 首次魔族不写 CFLAG:370（改 0）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      kojo.初调教 = 1; // :140
      kojo.魔族化 = 1; // :142`,
    replace: `      kojo.初调教 = 1; // :140
      kojo.魔族化 = 0; // :142`,
    tests: ['kojo-k0-tender'],
    must_mention: '首次魔族同时写 CFLAG:370 = 1',
  },
  {
    desc: 'M3146 K0 EVENTTRAIN NORMAL 魔族化二次写 2 改 3（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    kojo.魔族化 = 2; // :172-173`,
    replace: `    kojo.魔族化 = 3; // :172-173`,
    tests: ['kojo-k0-tender'],
    must_mention: '魔族化二次写 2',
  },
  {
    desc: 'M3147 K0 EVENTTRAIN NORMAL 魔族化二次门槛 < 5 改 < 4（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    kojo.初调教 < 5 &&
    kojo.魔族化 === 0 &&
    chara(target).chara.种族 === 9 &&`,
    replace: `    kojo.初调教 < 4 &&
    kojo.魔族化 === 0 &&
    chara(target).chara.种族 === 9 &&`,
    tests: ['kojo-k0-tender'],
    must_mention: '魔族化二次写 2',
  },
  {
    desc: 'M3148 K0 EVENTTRAIN NORMAL NTR 再捕获不清 650（写 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      kojo.NTR再捕获 = 0; // :185`,
    replace: `      kojo.NTR再捕获 = 1; // :185`,
    tests: ['kojo-k0-tender'],
    must_mention: 'NTR 再捕获爱慕清 650',
  },
  {
    desc: 'M3149 K0 EVENTTRAIN NORMAL NTR 未陷落不清 650（写 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      kojo.NTR再捕获 = 0; // :192`,
    replace: `      kojo.NTR再捕获 = 1; // :192`,
    tests: ['kojo-k0-tender'],
    must_mention: 'NTR 再捕获未陷落清 650',
  },
  {
    desc: 'M3150 K0 EVENTTRAIN NORMAL 屈服 Lv1 写 2 改 3（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    kojo.初调教 = 2; // :203-204`,
    replace: `    kojo.初调教 = 3; // :203-204`,
    tests: ['kojo-k0-tender'],
    must_mention: '屈服 Lv1 写 2',
  },
  {
    desc: 'M3151 K0 EVENTTRAIN NORMAL 淫乱写 5 改 6（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    kojo.初调教 = 5; // :228-229`,
    replace: `    kojo.初调教 = 6; // :228-229`,
    tests: ['kojo-k0-tender'],
    must_mention: '淫乱写 5',
  },
  {
    desc: 'M1967 K0 EVENTTRAIN NORMAL 淫乱+调教前魔族门槛读错自己的 CFLAG:201（改 魔族化）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    chara(target).chara.种族 === 9 &&
    kojo.初调教 < 6 &&
    era.get(\`talent:\${target}:85\`) !== 1 &&
    era.get(\`talent:\${target}:76\`) === 1`,
    replace: `    chara(target).chara.种族 === 9 &&
    kojo.魔族化 < 6 &&
    era.get(\`talent:\${target}:85\`) !== 1 &&
    era.get(\`talent:\${target}:76\`) === 1`,
    tests: ['kojo-k0-tender'],
    must_mention: '淫乱+调教前魔族写 6',
  },
  {
    desc: 'M3152 K0 EVENTTRAIN NORMAL 爱慕写 7 改 8（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    kojo.初调教 = 7; // :290-291`,
    replace: `    kojo.初调教 = 8; // :290-291`,
    tests: ['kojo-k0-tender'],
    must_mention: '爱慕写 7',
  },
  {
    desc: 'M3153 K0 EVENTTRAIN NORMAL 崩坏写 9 改 8（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    kojo.初调教 = 9; // :334-335`,
    replace: `    kojo.初调教 = 8; // :334-335`,
    tests: ['kojo-k0-tender'],
    must_mention: '崩坏写 9',
  },
  {
    desc: 'M3154 K0 二次口上崩坏 FLAG:7==2 改 ==1（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  if (era.get(\`talent:\${target}:9\`) === 1 && game.kojo.口上开关 === 2) {
    // :491`,
    replace: `  if (era.get(\`talent:\${target}:9\`) === 1 && game.kojo.口上开关 === 1) {
    // :491`,
    tests: ['kojo-k0-tender'],
    must_mention: '无助手落入二次口上（崩坏祈祷）',
  },
  {
    desc: 'M3155 K0 二次口上故乡恋人 TALENT:317 == 4 改 5（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    if (chara(target).chara.喜欢的东西 === 4) {
      // :508`,
    replace: `    if (chara(target).chara.喜欢的东西 === 5) {
      // :508`,
    tests: ['kojo-k0-tender'],
    must_mention: '屈服 Lv0 故乡恋人',
  },
  {
    desc: 'M3156 K0 二次口上淫乱 FLAG:7==2 改 ==1（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  } else if (era.get(\`talent:\${target}:76\`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine(); // :555-556`,
    replace: `  } else if (era.get(\`talent:\${target}:76\`) === 1 && game.kojo.口上开关 === 1) {
    era.drawLine(); // :555-556`,
    tests: ['kojo-k0-tender'],
    must_mention: 'K0 二次口上：FLAG:7==1 静默',
  },
  {
    desc: 'M3157 K0 EVENTTRAIN NORMAL 村娘助手首次写 202 = 1 改 2（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        kojo.简易助手_0 = 1; // :387-388`,
    replace: `        kojo.简易助手_0 = 2; // :387-388`,
    tests: ['kojo-k0-tender'],
    must_mention: '村娘助手首次写 202 = 1',
  },
  {
    desc: 'M3158 K0 EVENTTRAIN NORMAL 村娘助手二次 FLAG:7==2 改 ==1（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      } else if (kojo.简易助手_0 === 1 && game.kojo.口上开关 === 2) {`,
    replace: `      } else if (kojo.简易助手_0 === 1 && game.kojo.口上开关 === 1) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '村娘助手二次 FLAG:7==1 静默',
  },
  {
    desc: 'M3159 K0 EVENTEND NORMAL 死亡守卫 <= 0 改 < 0（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  if (chara(target).dungeon.体力 <= 0) {
    // :608-609
    return 0;
  }`,
    replace: `  if (chara(target).dungeon.体力 < 0) {
    // :608-609
    return 0;
  }`,
    tests: ['kojo-k0-tender'],
    must_mention: '角色死亡 BASE:0 <= 0 静默',
  },
  {
    desc: 'M3160 K0 EVENTEND NORMAL 崩坏 FLAG:7==2 改 ==1（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  if (era.get(\`talent:\${target}:9\`) === 1 && game.kojo.口上开关 === 2) {
    // :615`,
    replace: `  if (era.get(\`talent:\${target}:9\`) === 1 && game.kojo.口上开关 === 1) {
    // :615`,
    tests: ['kojo-k0-tender'],
    must_mention: '崩坏 FLAG:7==2 出声',
  },
  {
    desc: 'M3161 K0 EVENTEND NORMAL 淫乱体力门槛 >= 500 改 > 500（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    era.get(\`talent:\${target}:76\`) === 1 &&
    chara(target).dungeon.体力 >= 500`,
    replace: `    era.get(\`talent:\${target}:76\`) === 1 &&
    chara(target).dungeon.体力 > 500`,
    tests: ['kojo-k0-tender'],
    must_mention: '淫乱体力 500 走 >= 不是 <',
  },
  {
    desc: 'M3162 K0 EVENTEND NORMAL 慈爱素质守卫错格（!== 1 改 !== 0）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  if (chara(target).chara.慈爱 !== 1) {
    // :604-605
    return 0;
  }`,
    replace: `  if (chara(target).chara.慈爱 !== 0) {
    // :604-605
    return 0;
  }`,
    tests: ['kojo-k0-tender'],
    must_mention: 'K0 EVENTEND NORMAL：非慈爱素质静默',
  },
  {
    desc: 'M3163 K0 SELF_KOJO 自慰淫乱档写 4 改 3（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.set(\`cflag:\${target}:261\`, 4); // :6854`,
    replace: `        era.set(\`cflag:\${target}:261\`, 3); // :6854`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==1 自慰 Q==0 主人档（淫乱推进 CFLAG:261）',
  },
  {
    desc: 'M3164 K0 SELF_KOJO 自慰 Q==2 野狗支删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    } else if (q === 2) {
      // :6842
      era.print(\`「啊啊～…狗狗大人…还是狗狗大人的肉棒最棒～………！」\`); // :6843`,
    replace: `    } else if (q === 2) {
      // :6842
      era.print(\`变异：野狗支删除\`); // :6843`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==1 自慰 Q==2 野狗支',
  },
  {
    desc: 'M3165 K0 SELF_KOJO 百合淫乱档写 5 改 4（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.set(\`cflag:\${target}:262\`, 5); // :6878`,
    replace: `      era.set(\`cflag:\${target}:262\`, 4); // :6878`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==2 百合（淫乱推进 CFLAG:262）',
  },
  {
    desc: 'M3166 K0 SELF_KOJO 口交淫乱档写 3 改 2（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.set(\`cflag:\${target}:263\`, 3); // :6909`,
    replace: `      era.set(\`cflag:\${target}:263\`, 2); // :6909`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==3 口交（淫乱推进 CFLAG:263）',
  },
  {
    desc: 'M3167 K0 SELF_KOJO 性交档写 2 改 1（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.set(\`cflag:\${target}:264\`, 2); // :6943`,
    replace: `      era.set(\`cflag:\${target}:264\`, 1); // :6943`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==4 性交（ABL:2>=4 推进 CFLAG:264）',
  },
  {
    desc: 'M3168 K0 SELF_KOJO 夜间档写 1 改 2（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.set(\`cflag:\${target}:265\`, 1); // :6961`,
    replace: `      era.set(\`cflag:\${target}:265\`, 2); // :6961`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==5 夜间（推进 CFLAG:265）',
  },
  {
    desc: 'M3169 K0 SELF_KOJO 卖出爱慕支素质判据错格（TALENT:85 改 86）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    if (
      era.get(\`talent:\${target}:85\`) &&
      (era.get(\`mark:\${target}:3\`) || 0) < 3
    ) {`,
    replace: `    if (
      era.get(\`talent:\${target}:86\`) &&
      (era.get(\`mark:\${target}:3\`) || 0) < 3
    ) {`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==6 卖出（爱慕支 + 结尾清理 TFLAG:13=0）',
  },
  {
    desc: 'M3170 K0 SELF_KOJO 结尾 TFLAG:13 清理删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  game.train.初吻与自我口上 = 0; // :7207 TFLAG:13 = 0（跨域走门面）`,
    replace: `  // 变异：TFLAG:13 清理删除`,
    tests: ['kojo-k0-tender'],
    must_mention: '结尾清 TFLAG:13',
  },
  {
    desc: 'M3171 K0 SELF_KOJO 总开关守卫删松（FLAG:7 <= 0 改 < 0）（#231）',
    file: 'ere/kojo/kojo-system.js',
    find: `  if ((era.get('flag:7') || 0) <= 0) {
    const { game } = require('#/facade/game');
    game.train.怪物射精或购入金 = 0;`,
    replace: `  if ((era.get('flag:7') || 0) < 0) {
    const { game } = require('#/facade/game');
    game.train.怪物射精或购入金 = 0;`,
    tests: ['kojo-k0-tender'],
    must_mention: 'SELF_KOJO：总开关 FLAG:7 <= 0 静默并清 TFLAG:15',
  },
  {
    desc: 'M3172 K0 SELF_KOJO 自慰档读 TFLAG:13 改成 TFLAG:14（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  if (game.train.初吻与自我口上 === 1) {
    // :6836`,
    replace: `  if (game.train.初吻与自我口上 === 14) {
    // :6836`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==1 自慰 Q==0 主人档（淫乱推进 CFLAG:261）',
  },

  {
    desc: 'M3173 K0 PALAMCNG 润滑首超守卫删松（P 阈值改恒 true）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "  let p = (era.get(`palam:${target}:3`) || 0) + chara(target).train.润滑增量; // :6537\n  if (\n    p > (era.get('palamlv:2') || 0) &&\n    (era.get(`cflag:${target}:221`) || 0) === 0\n  ) {",
    replace:
      '  let p = (era.get(`palam:${target}:3`) || 0) + chara(target).train.润滑增量; // :6537\n  if (true) { // 变异：P 阈值删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'PALAMCNG：润滑度首次超过 LV2 触发首次口上并写 CFLAG:221',
  },
  {
    desc: 'M3174 K0 PALAMCNG CFLAG:221 防重删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "  let p = (era.get(`palam:${target}:3`) || 0) + chara(target).train.润滑增量; // :6537\n  if (\n    p > (era.get('palamlv:2') || 0) &&\n    (era.get(`cflag:${target}:221`) || 0) === 0\n  ) {",
    replace:
      "  let p = (era.get(`palam:${target}:3`) || 0) + chara(target).train.润滑增量; // :6537\n  if (p > (era.get('palamlv:2') || 0) && false) { // 变异：防重删松",
    tests: ['kojo-k0-tender'],
    must_mention: 'PALAMCNG：CFLAG:221 已置位时不重复出声',
  },
  {
    desc: 'M3175 K0 PALAMCNG 总开关守卫删松（FLAG:7 <= 0 改 < 0）（#231）',
    file: 'ere/kojo/kojo-system.js',
    find: "async function kojo_message_palamcng(rand) {\n  if ((era.get('flag:7') || 0) <= 0) {",
    replace:
      "async function kojo_message_palamcng(rand) {\n  if ((era.get('flag:7') || 0) < 0) {",
    tests: ['kojo-k0-tender'],
    must_mention: 'PALAMCNG：总开关 FLAG:7 <= 0 静默',
  },
  {
    desc: 'M3176 K0 PALAMCNG 助手调教守卫删松（ASSI/ASSIPLAY 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (era_flag.assi > 0 && era_flag.assiplay) {\n    // :6509-6510',
    replace: '  if (false) { // 变异：助手守卫删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'PALAMCNG：助手调教跳过',
  },
  {
    desc: 'M3177 K0 MARKCNG 苦痛刻印触发删松（TFLAG:22==3 改恒 true）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (\n    game.system.苦痛刻印变动 === 3 &&\n    (era.get(`cflag:${target}:297`) || 0) === 0\n  ) {',
    replace: '  if (true) { // 变异：触发删松',
    tests: ['kojo-k0-tender'],
    must_mention:
      'MARKCNG：苦痛刻印 Lv3 取得（TFLAG:22 == 3）触发并写 CFLAG:297',
  },
  {
    desc: 'M3178 K0 MARKCNG CFLAG:297 防重删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (\n    game.system.苦痛刻印变动 === 3 &&\n    (era.get(`cflag:${target}:297`) || 0) === 0\n  ) {',
    replace:
      '  if (game.system.苦痛刻印变动 === 3 && false) { // 变异：防重删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'MARKCNG：CFLAG:297 已置位时不重复出声',
  },
  {
    desc: 'M3179 K0 MARKCNG 总开关守卫删松（FLAG:7 <= 0 改 < 0）（#231）',
    file: 'ere/kojo/kojo-system.js',
    find: "async function kojo_message_markcng(rand) {\n  if ((era.get('flag:7') || 0) <= 0) {",
    replace:
      "async function kojo_message_markcng(rand) {\n  if ((era.get('flag:7') || 0) < 0) {",
    tests: ['kojo-k0-tender'],
    must_mention: 'MARKCNG：总开关 FLAG:7 <= 0 静默',
  },
  {
    desc: 'M3180 K0 MARKCNG 助手调教守卫删松（ASSI/ASSIPLAY 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (era_flag.assi > 0 && era_flag.assiplay) {\n    // :6758-6759',
    replace: '  if (false) { // 变异：助手守卫删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'MARKCNG：助手调教跳过',
  },

  {
    desc: 'M3181 K0 DUNGEON_RYOUZYOKU 处女分支删松（TALENT:0 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  const sc = () => self_call(target); // %SELF_CALL(TARGET)%\n  if (era.get(`talent:${target}:0`) === 1) {',
    replace:
      '  const sc = () => self_call(target); // %SELF_CALL(TARGET)%\n  if (false) { // 变异：处女分支删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'DUNGEON_RYOUZYOKU：处女（TALENT:0）按素质分档出声',
  },
  {
    desc: 'M3182 K0 DUNGEON_RYOUZYOKU 淫乱分支删松（TALENT:21/22 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      era.get(`talent:${target}:22`) === 1\n    ) {\n      // :7245',
    replace: '  if (false) { // 变异：淫乱分支删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'DUNGEON_RYOUZYOKU：非处女 + 淫乱（TALENT:76）分档出声',
  },
  {
    desc: 'M3183 K0 GOHOUBI_REQUEST 奖金分支删松（CFLAG:504==0 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if ((era.get(`cflag:${target}:504`) || 0) === 0) {\n    // :8128',
    replace: '  if (false) { // 变异：奖金分支删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'GOHOUBI_REQUEST：CFLAG:504==0 奖金请求',
  },
  {
    desc: 'M2445 K0 GOHOUBI_AFTER choice==0 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (choice === 0) {\n    // :8167',
    replace: '  if (false) { // 变异：choice==0 删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'GOHOUBI_AFTER：choice==0 无特别',
  },
  {
    desc: 'M2446 K0 GOHOUBI_AFTER 买药分支删松（CFLAG:504==0 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    if ((era.get(`cflag:${target}:504`) || 0) === 0) {\n      // :8174',
    replace: '  if (false) { // 变异：买药分支删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'GOHOUBI_AFTER：choice==2 && CFLAG:504==0 买药台词',
  },
  {
    desc: 'M2447 K0 OSIOKI choice==1 快感分支删松（ABL:21 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    if (era.get(`abl:${target}:21`) >= 3) {\n      // :8249',
    replace: '  if (false) { // 变异：快感分支删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'OSIOKI：choice==1 && ABL:21 >= 3 快感台词',
  },

  {
    desc: 'M2448 K0 BENKI 分档删松（FLAG:62==0 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "  if (era.get('flag:62') === 0) {\n    // :7435",
    replace: '  if (false) { // 变异：FLAG:62==0 删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'BENKI_KOUJO：FLAG:62=0 + FLAG:63=1 → 施舍工作台词',
  },
  {
    desc: 'M2449 K0 VICTORY 首句删松（改恒 true）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  await era.printAndWait(`「爱能拯救世界！」`); // :7366',
    replace:
      '  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));\n  // 变异：首句删除',
    tests: ['kojo-k0-tender'],
    must_mention: 'VICTORY：素质分档 + 体力比判定',
  },
  {
    desc: 'M2450 K0 ATTACK CFLAG:1==2 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (era.get(`cflag:${target}:1`) === 2) {\n    // :7642',
    replace: '  if (false) { // 变异：CFLAG:1==2 删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'ATTACK：CFLAG:1==2 + 强气素质 → 爱的火焰',
  },
  {
    desc: 'M2451 K0 GOBI arg_0==1 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (arg_0 === 1) {\n    // :8304',
    replace: '  if (false) { // 变异：arg_0==1 删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'GOBI：arg_0=1 → ♪ 语尾',
  },
  {
    desc: 'M2452 K0 ENTERENEMY 献身分支删松（TALENT:21/22 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    era.get(`talent:${target}:21`) === 1 ||\n    era.get(`talent:${target}:22`) === 1\n  ) {\n    // :8064',
    replace: '  if (false) { // 变异：献身分支删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'ENTERENEMY：献身（TALENT:21）→ 我是不会输的',
  },

  {
    desc: 'M2453 K0 NTR P==1 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (p === 1) {\n    // :7873',
    replace: '  if (false) { // 变异：P==1 删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'NTR：P==1 + 淫乱（TALENT:76）→ 求饶台词 + CFLAG:651 记录',
  },
  {
    desc: 'M2454 K0 EXUCUTION 事件类型 4 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (event_type === 4) {\n    // :7949',
    replace: '  if (false) { // 变异：事件类型 4 删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'EXUCUTION：事件类型 4 → 求饶台词',
  },
  {
    desc: 'M2455 K0 MUSEUM 事件类型 3 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  } else if (event_type === 3) {\n    // :7975',
    replace: '  if (false) { // 变异：事件类型 3 删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'MUSEUM：事件类型 3 → 不想变成这样',
  },
  {
    desc: 'M2456 K0 BANISHMENT 事件类型 0 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (event_type === 0) {\n    // :8002',
    replace: '  if (false) { // 变异：事件类型 0 删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'BANISHMENT：事件类型 0 → 失去力量也有能做的事',
  },
  {
    desc: 'M2457 K0 PUBLIC_EXUCUTION 事件类型 0 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (event_type === 0) {\n    // :8023',
    replace: '  if (false) { // 变异：事件类型 0 删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'PUBLIC_EXUCUTION：事件类型 0 → 为什么这样对待',
  },
  {
    desc: 'M2458 K0 COLOSSEUM selectcom 55 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (era_flag.selectcom === 55) {\n    // :7739',
    replace: '  if (false) { // 变异：selectcom 55 删松',
    tests: ['kojo-k0-tender'],
    must_mention:
      '死斗场（TEQUIP:55）最先：岔进 COLOSSEUM_KOJO_0 真身（selectcom 55 + 体力低）',
  },

  {
    desc: 'M2459 K0 DOG selectcom 0 初次分支删松（CFLAG:301==0 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (era_flag.selectcom === 0) {\n    // :5486',
    replace: '  if (false) { // 变异：selectcom 0 删松',
    tests: ['kojo-k0-tender'],
    must_mention:
      '兽奸（TEQUIP:89）：K0 岔进 DOG_KOJO_0 真身（selectcom 0 初次）',
  },
  {
    desc: 'M2460 K0 DOG 初次写 CFLAG:301 删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    if ((era.get(`cflag:${target}:301`) || 0) === 0) {',
    replace: '  if (false) { // 变异：初次判定删松',
    tests: ['kojo-k0-tender'],
    must_mention:
      '兽奸（TEQUIP:89）：K0 岔进 DOG_KOJO_0 真身（selectcom 0 初次）',
  },
  {
    desc: 'M3300 K13 EVENTTRAIN #PRI 存在标志写错值（FLAG:113=1 改 2，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    game.kojo.口上存在_13 = 1; // :73 FLAG:113 = 1（K13 口上存在标志）`,
    replace: `    game.kojo.口上存在_13 = 2; // :73（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: 'K13 一对',
  },
  {
    desc: 'M3301 K13 EVENTTRAIN #PRI 口上开关补 0 判据改错（===0 改 ===1，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // :75
    }`,
    replace: `    if (game.kojo.口上开关 === 1) { // 变异
      game.kojo.口上开关 = 2; // :75
    }`,
    tests: ['kojo-k13-protector'],
    must_mention: 'K13 一对',
  },
  {
    desc: 'M3302 K13 EVENTEND #LATER 存在标志清除值改错（=0 改 =1，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    game.kojo.口上存在_13 = 0; // :79`,
    replace: `    game.kojo.口上存在_13 = 1; // :79（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: 'K13 一对',
  },
  {
    desc: 'M3303 K13 EVENTTRAIN 自身守卫①口上开关判据反转（<=0 改 >0，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `  if (game.kojo.口上开关 <= 0) {
    // :83-87
    return 0; // :83-87
  } // :83-87`,
    replace: `  if (game.kojo.口上开关 > 0) { // 变异
    // :83-87
    return 0; // :83-87
  } // :83-87`,
    tests: ['kojo-k13-protector'],
    must_mention: '自身守卫①口上开关',
  },
  {
    desc: 'M3304 K13 EVENTTRAIN 自身守卫②TALENT:173 判据反转（!=1 改 ==1，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `  if (era0(\`talent:\${target}:173\`) != 1) {
    // :89-92
    return 0; // :89-92
  } // :89-92`,
    replace: `  if (era0(\`talent:\${target}:173\`) == 1) { // 变异
    // :89-92
    return 0; // :89-92
  } // :89-92`,
    tests: ['kojo-k13-protector'],
    must_mention: '自身守卫②TALENT:173',
  },
  {
    desc: 'M3305 K13 初调教==0 推进值写错（=1 改 2，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    kojo.初调教 = 1; // :126`,
    replace: `    kojo.初调教 = 2; // :126（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: '初调教推进到 1',
  },
  {
    desc: 'M3306 K13 NTR 再捕获解除写错（CFLAG:650=0 改 1，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `      kojo.NTR再捕获 = 0; // :138`,
    replace: `      kojo.NTR再捕获 = 1; // :138（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: 'NTR 开关解除',
  },
  {
    desc: 'M3307 K13 屈服刻印 Lv1 推进值写错（初调教=2 改 3，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    kojo.初调教 = 2; // :172`,
    replace: `    kojo.初调教 = 3; // :172（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: '屈服Lv1 推进到 2',
  },
  {
    desc: 'M3308 K13 屈服刻印 Lv2 推进值写错（初调教=3 改 4，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    kojo.初调教 = 3; // :191`,
    replace: `    kojo.初调教 = 4; // :191（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: '屈服Lv2 推进到 3',
  },
  {
    desc: 'M3309 K13 屈服刻印 Lv3 推进值写错（初调教=4 改 5，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    kojo.初调教 = 4; // :210`,
    replace: `    kojo.初调教 = 5; // :210（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: '屈服Lv3 推进到 4',
  },
  {
    desc: 'M3310 K13 淫乱推进值写错（初调教=5 改 6，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    kojo.初调教 = 5; // :229`,
    replace: `    kojo.初调教 = 6; // :229（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: '淫乱推进到 5',
  },
  {
    desc: 'M3311 K13 爱慕推进值写错（初调教=6 改 7，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    kojo.初调教 = 6; // :252`,
    replace: `    kojo.初调教 = 7; // :252（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: '爱慕推进到 6',
  },
  {
    desc: 'M3312 K13 屈服Lv2 原作 &&/|| 优先级「修好」（先 AND 后 OR 改成先 OR，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `  } else if (kojo.初调教 < 3 && era0(\`mark:\${target}:2\`) == 2) {
    // :176
    era.drawLine(); // :176-177
    if (
      (era0(\`talent:\${target}:157\`) && era0(\`talent:\${target}:110\`)) ||
      era0(\`talent:\${target}:114\`) ||
      era0(\`talent:\${target}:119\`)
    ) {`,
    replace: `  } else if (kojo.初调教 < 3 && era0(\`mark:\${target}:2\`) == 2) {
    // :176
    era.drawLine(); // :176-177
    if (
      era0(\`talent:\${target}:157\`) &&
      (era0(\`talent:\${target}:110\`) ||
        era0(\`talent:\${target}:114\`) ||
        era0(\`talent:\${target}:119\`))
    ) {`,
    tests: ['kojo-k13-protector'],
    must_mention: '原作缺陷：157 && 110 || 114 || 119 先 AND 后 OR',
  },
  {
    desc: 'M3313 K13 K13_KOJO2 反抗刻印Lv3 判据改错（MARK:3==3 改 ==2，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `  if (era0(\`mark:\${target}:3\`) == 3 && game.kojo.口上开关 == 2) {`,
    replace: `  if (era0(\`mark:\${target}:3\`) == 2 && game.kojo.口上开关 == 2) { // 变异`,
    tests: ['kojo-k13-protector'],
    must_mention: 'K13_KOJO2 反抗刻印Lv3',
  },
  {
    desc: 'M3314 K13 EVENTEND 角色死亡守卫删松（BASE:0<=0 改恒 false，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `  if (era0(\`base:\${target}:0\`) <= 0) {
    // :445-446
    return 0; // :445-446
  } // :445-446`,
    replace: `  if (false) { // 变异
    // :445-446
    return 0; // :445-446
  } // :445-446`,
    tests: ['kojo-k13-protector'],
    must_mention: 'EVENTEND BASE:0<=0（角色死亡）静默跳过',
  },
  {
    desc: 'M3315 K13 EVENTEND 淫乱体力>=500 臂「补上 RETURN 1」（原作缺陷被修好，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    await era.printAndWait(\`「哎呀、已经结束了哎……明天也请您多多关照了……♪」\`); // :508
    await era.printAndWait(\`「\${sc()}会翘首以待的♪」\`); // :509
  } else if (`,
    replace: `    await era.printAndWait(\`「哎呀、已经结束了哎……明天也请您多多关照了……♪」\`); // :508
    await era.printAndWait(\`「\${sc()}会翘首以待的♪」\`); // :509
    return 1; // 变异：补上原作没有的 RETURN 1
  } else if (`,
    tests: ['kojo-k13-protector'],
    must_mention: '淫乱体力>=500 无 RETURN 1（原作缺陷 1:1）',
  },
  {
    desc: 'M3316 K13 COM 口塞守卫删（TEQUIP:45 不再跳过，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `  if (era0(\`tequip:\${target}:45\`) && era_flag.selectcom != 45) {
    // :541-542
    return 0; // :541-542
  } // :541-542`,
    replace: `  if (false && era_flag.selectcom != 45) { // 变异
    // :541-542
    return 0; // :541-542
  } // :541-542`,
    tests: ['kojo-k13-protector'],
    must_mention: '口塞（TEQUIP:45 且非指令45）：静默跳过',
  },
  {
    desc: 'M3317 K13 COM 失神守卫删（TFLAG:899 不再跳过，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `  if (game.train.失神) {
    // :545-546
    return 0; // :545-546
  } // :545-546`,
    replace: `  if (false) { // 变异
    // :545-546
    return 0; // :545-546
  } // :545-546`,
    tests: ['kojo-k13-protector'],
    must_mention: '失神（TFLAG:899）：静默跳过',
  },
  {
    desc: 'M3318 K13 兽奸守卫岔路丢失（TEQUIP:89 不再调 DOG_KOJO_13，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    await dog_kojo_13(rand_n); // :548 CALL DOG_KOJO_13
    return 0; // :548-549
  } // :550-551`,
    replace: `    return 0; // :548-549（变异：不调 DOG_KOJO_13）
  } // :550-551`,
    tests: ['kojo-k13-protector'],
    must_mention: '兽奸（TEQUIP:89）：岔进本文件真身 DOG_KOJO_13',
  },
  {
    desc: 'M3319 K13 死斗场守卫岔路丢失（TEQUIP:55 不再调 COLOSSEUM_KOJO_13，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    await colosseum_kojo_13(rand_n); // :553 CALL COLOSSEUM_KOJO_13
    return 0; // :553-554
  } // :553-555`,
    replace: `    return 0; // :553-554（变异：不调 COLOSSEUM_KOJO_13）
  } // :553-555`,
    tests: ['kojo-k13-protector'],
    must_mention: '死斗场（TEQUIP:55）：岔进本文件真身 COLOSSEUM_KOJO_13',
  },
  {
    desc: 'M3320 K13 爱抚初回推进值写错（CFLAG:301=1 改 2，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `      kojo.爱抚 = 1; // :577`,
    replace: `      kojo.爱抚 = 2; // :577（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: '爱抚初回推进到 1',
  },
  {
    desc: 'M3321 K13 爱抚初回刻印分档删（MARK:2>=2 改 >=3，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `      if (era0(\`mark:\${target}:2\`) >= 2) {
        // :567
        await era.printAndWait(\`「噫、再这样摸下去的话……不行了！」\`); // :568`,
    replace: `      if (era0(\`mark:\${target}:2\`) >= 3) { // 变异
        // :567
        await era.printAndWait(\`「噫、再这样摸下去的话……不行了！」\`); // :568`,
    tests: ['kojo-k13-protector'],
    must_mention: '爱抚初回刻印推进到 1',
  },
  {
    desc: 'M3322 K13 爱抚淫乱档推进写错（CFLAG:301=6 改 5，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `        kojo.爱抚 = 6; // :584`,
    replace: `        kojo.爱抚 = 5; // :584（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: '淫乱分支推进到 6',
  },
  {
    desc: 'M3323 K13 爱抚爱慕档推进写错（CFLAG:301=5 改 4，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `        kojo.爱抚 = 5; // :590`,
    replace: `        kojo.爱抚 = 4; // :590（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: '爱慕分支推进到 5',
  },
  {
    desc: 'M3324 K13 爱抚屈服Lv3 档推进写错（CFLAG:301=4 改 3，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `        kojo.爱抚 = 4; // :596`,
    replace: `        kojo.爱抚 = 3; // :596（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: '屈服Lv3 分支推进到 4',
  },
  {
    desc: 'M3325 K13 爱抚屈服Lv2 档推进写错（CFLAG:301=3 改 2，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `        kojo.爱抚 = 3; // :600`,
    replace: `        kojo.爱抚 = 2; // :600（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: '屈服Lv2 分支推进到 3',
  },
  {
    desc: 'M3326 K13 爱抚それ以外推进写错（CFLAG:301=2 改 1，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `        kojo.爱抚 = 2; // :604`,
    replace: `        kojo.爱抚 = 1; // :604（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: 'それ以外推进到 2',
  },
  {
    desc: 'M3327 K13 阈值闸旁路删松（FLAG:7==2 改恒 false，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `        era0(\`talent:\${target}:76\`) == 1 &&
        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :582`,
    replace: `        era0(\`talent:\${target}:76\`) == 1 &&
        (kojo.爱抚 <= 5 || false)
      ) {
        // :582`,
    tests: ['kojo-k13-protector'],
    must_mention: '阈值闸 FLAG:7==2 旁路重出声',
  },
  {
    desc: 'M3328 K13 主启动图删 K13 庇护者口上注册（KOJO 13 不进实际运行图，#244）',
    file: 'ere/system/flow/main-loop.js',
    find: `require('#/kojo/kojo-k13-protector');`,
    replace: `// 变异：K13 庇护者口上不在主启动图注册`,
    tests: ['kojo-family-wiring'],
    must_mention: '主启动图漏装：kojo-k13-protector',
  },
  {
    desc: 'M3329 K13 存根清单漏登 SELL_MATURO_K0（#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `const STUBBED_CALLS = ['SELL_MATURO_K0'];`,
    replace: `const STUBBED_CALLS = [];`,
    tests: ['kojo-k13-protector'],
    must_mention: 'SELL_MATURO_K0',
  },
  {
    desc: 'M3330 K13 PALAMCNG 口塞守卫删（TEQUIP:45 不再跳过，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `  if (era0(\`tequip:\${target}:45\`)) {
    // :4442-4448
    return 0; // :4442-4448
  } // :4442-4448`,
    replace: `  if (false) { // 变异
    // :4442-4448
    return 0; // :4442-4448
  } // :4442-4448`,
    tests: ['kojo-k13-protector'],
    must_mention: 'PALAMCNG 口塞守卫',
  },
  {
    desc: 'M3331 K13 PALAMCNG 首次润滑推进写错（CFLAG:221=1 改 2，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    kojo.首次润滑Lv2 = 1; // :4480`,
    replace: `    kojo.首次润滑Lv2 = 2; // :4480（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: 'PALAMCNG 首次润滑Lv2 推进到 1',
  },
  {
    desc: 'M3332 K13 PALAMCNG 首次C绝顶推进写错（CFLAG:225=1 改 2，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    kojo.首次C绝顶 = 1; // :4551`,
    replace: `    kojo.首次C绝顶 = 2; // :4551（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: 'PALAMCNG 首次C绝顶推进到 1',
  },
  {
    desc: 'M3333 K13 MARKCNG 苦痛刻印Lv3 推进写错（CFLAG:297=1 改 2，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    kojo.苦痛刻印Lv3 = 1; // :4705`,
    replace: `    kojo.苦痛刻印Lv3 = 2; // :4705（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: 'MARKCNG 苦痛刻印Lv3 推进到 1',
  },
  {
    desc: 'M3334 K13 正常位初回推进写错（CFLAG:321=1 改 2，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `      kojo.正常位 = 1; // :1536`,
    replace: `      kojo.正常位 = 2; // :1536（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: '正常位初回推进到 1',
  },
  {
    desc: 'M3335 K13 SELF_KOJO 卖却分支存根丢（SELL_MATURO_K0 不落，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `      stub_line('SELL_MATURO_K0', '卖却分支（成熟贩卖）', '随售却票'); // :4880`,
    replace: `      // 变异：SELL_MATURO_K0 存根丢`,
    tests: ['kojo-k13-protector'],
    must_mention: 'SELF_KOJO 卖却分支存根 SELL_MATURO_K0',
  },
  {
    desc: 'M3336 K13 DUNGEON_VICTORY 低体力闸删松（<50 改 <0，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    (era0(\`base:\${a}:0\`) * 100) / era0(\`maxbase:\${a}:0\`) < 50 ||`,
    replace: `    (era0(\`base:\${a}:0\`) * 100) / era0(\`maxbase:\${a}:0\`) < 0 ||`,
    tests: ['kojo-k13-protector'],
    must_mention: 'DUNGEON_VICTORY 低体力追加',
  },
  {
    desc: 'M3337 K13 DUNGEON_ATTACK 侵略状态==2 判据反转（==2 改 ==1，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `  if (chara(target).invasion.状态 == 2) {`,
    replace: `  if (chara(target).invasion.状态 == 1) { // 变异`,
    tests: ['kojo-k13-protector'],
    must_mention: 'DUNGEON_ATTACK 侵略状态==2',
  },
  {
    desc: 'M3338 K13 GOHOUBI_AFTER choice==0 台词改错（#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    await era.printAndWait(\`「这样啊……真失望」\`); // :5834`,
    replace: `    await era.printAndWait(\`「这样啊……真高兴」\`); // :5834（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: 'GOHOUBI_AFTER choice==0',
  },
  {
    desc: 'M3339 K13 NTR P==1 首次开关写错（CFLAG:650=1 改 0，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    kojo.NTR再捕获 = 1; // :5506`,
    replace: `    kojo.NTR再捕获 = 0; // :5506（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: 'NTR 开关 CFLAG:650',
  },
  {
    desc: 'M3340 K13 GOBI ARG:0==1 语尾改错（#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    await era.print(\`嗯♪\`); // :5975`,
    replace: `    await era.print(\`哦！\`); // :5975（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: 'GOBI ARG:0==1',
  },
  {
    desc: 'M3341 K13 ENTERENEMY 默认档台词改错（#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    await era.printAndWait(\`「呵呵、\${self_call(a)}、会努力的♪」\`); // :5777`,
    replace: `    await era.printAndWait(\`「呵呵、\${self_call(a)}不会努力的♪」\`); // :5777（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: 'ENTERENEMY 默认档',
  },
  {
    desc: 'M3342 K13 EXUCUTION 档4 台词改错（#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    await era.printAndWait(\`「噫、有谁……可以救救我」\`); // :5651`,
    replace: `    await era.printAndWait(\`「噫、没人……可以救救我」\`); // :5651（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: 'EXUCUTION 档 4',
  },
  {
    desc: 'M3343 K13 MUSEUM 档3 台词改错（#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `      \`「啊啦啊啦、\${sc()}的这副样子被看到的话…真是很困扰呢」\`,`,
    replace: `      \`「啊啦啊啦、\${sc()}的这副样子被看到的话…真是很开心呢」\`,`,
    tests: ['kojo-k13-protector'],
    must_mention: 'MUSEUM 档 3',
  },
  {
    desc: 'M3344 K13 DUNGEON_RYOUZYOKU 处女默认档台词改错（#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `    await era.printAndWait(\`「怎么会这样……\${sc()}的……第一次……」\`); // :5007`,
    replace: `    await era.printAndWait(\`「怎么会这样……\${sc()}的……第二次……」\`); // :5007（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: 'DUNGEON_RYOUZYOKU 处女默认档',
  },
  {
    desc: 'M3345 K13 BENKI 肉便器行动==0 默认档台词改错（#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `      await era.printAndWait(\`「好的……会尽全力服侍的……」\`); // :5171`,
    replace: `      await era.printAndWait(\`「好的……不会服侍的……」\`); // :5171（变异）`,
    tests: ['kojo-k13-protector'],
    must_mention: 'BENKI 肉便器行动==0',
  },
  {
    desc: 'M3346 K13 GOHOUBI_REQUEST 金钱台词改错（#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `await era.printAndWait(\`「等\${sc()}存够了钱、我们一起出去旅游吧♪　呵呵」\`); // :5787`,
    replace: `await era.printAndWait(\`「等\${sc()}存够了钱、我们一起出去不旅游吧♪　呵呵」\`); // :5787`,
    tests: ['kojo-k13-protector'],
    must_mention: 'GOHOUBI_REQUEST 金钱',
  },
  {
    desc: 'M3347 K13 self_kojo 族漏注册（key 13 不进 self_kojo_family，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `self_kojo_family.register(13, self_kojo_k13);`,
    replace: `// 变异：self_kojo_family 漏装 K13`,
    tests: ['kojo-k13-protector'],
    must_mention: '缺 K13 注册',
  },
  {
    desc: 'M3400 K14 EVENTTRAIN #PRI 存在标志写错值（口上存在_14=1 改 2，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `game.kojo.口上存在_14 = 1; // :41 FLAG:114 = 1（K14 口上存在标志）`,
    replace: `game.kojo.口上存在_14 = 2; // :41（变异）`,
    tests: ['kojo-k14-nobleman'],
    must_mention: 'EVENTTRAIN #PRI 置存在标志',
  },
  {
    desc: 'M3401 K14 EVENTEND #LATER 存在标志清除值改错（=0 改 =1，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `game.kojo.口上存在_14 = 0; // :47`,
    replace: `game.kojo.口上存在_14 = 1; // :47（变异）`,
    tests: ['kojo-k14-nobleman'],
    must_mention: 'EVENTTRAIN #PRI 置存在标志',
  },
  {
    desc: 'M3402 K14 EVENTTRAIN 初调教通常男档写回值改错（初调教=1 改 2，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `kojo.初调教 = 1; // :93`,
    replace: `kojo.初调教 = 2; // :93（变异）`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '通常男（TALENT:122）',
  },
  {
    desc: 'M3403 K14 EVENTTRAIN 男魔族档写回值改错（初调教=1 改 2，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `kojo.初调教 = 1; // :72`,
    replace: `kojo.初调教 = 2; // :72（变异）`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '男魔族（TALENT:122 && 314==9）',
  },
  {
    desc: 'M3404 K14 EVENTTRAIN 魔族化仅一次写回值改错（魔族化=2 改 1，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `kojo.魔族化 = 2; // :116`,
    replace: `kojo.魔族化 = 1; // :116（变异）`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '魔族化仅一次',
  },
  {
    desc: 'M3405 K14 EVENTTRAIN NTR 再捕获清除值改错（NTR再捕获=0 改 1，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `kojo.NTR再捕获 = 0; // :127`,
    replace: `kojo.NTR再捕获 = 1; // :127（变异）`,
    tests: ['kojo-k14-nobleman'],
    must_mention: 'NTR 再捕获（201>=1',
  },
  {
    desc: 'M3406 K14 COM 爱抚初回写回值改错（爱抚=1 改 2，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `kojo.爱抚 = 1; // :640`,
    replace: `kojo.爱抚 = 2; // :640（变异）`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '爱抚初回：置 CFLAG:301 = 1',
  },
  {
    desc: 'M3407 K14 COM 爱抚二回目淫乱写回值改错（爱抚=6 改 5，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `kojo.爱抚 = 6; // :647`,
    replace: `kojo.爱抚 = 5; // :647（变异）`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '爱抚二回目 淫乱',
  },
  {
    desc: 'M3408 K14 COM 肛门爱抚二回目「それ以外」写回值改错（肛门爱抚=2 改 3，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `kojo.肛门爱抚 = 2; // :743`,
    replace: `kojo.肛门爱抚 = 3; // :743（变异）`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '肛门爱抚二回目 润滑',
  },
  {
    desc: 'M3409 K14 PALAMCNG 首次润滑 Lv2 写回删除（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `kojo.首次润滑Lv2 = 1; // :4406`,
    replace: `// 变异：删除写回`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '首次润滑超Lv2',
  },
  {
    desc: 'M3410 K14 MARKCNG 苦痛刻印 Lv3 初回写回删除（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `kojo.苦痛刻印Lv3 = 1; // :4583`,
    replace: `// 变异：删除写回`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '苦痛刻印 Lv3 初回',
  },
  {
    desc: 'M3411 K14 SELF 调教后性交写回删除（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `kojo.调教后性交 = 1; // :4726`,
    replace: `// 变异：删除写回`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '调教后性交（TFLAG:13==4）',
  },
  {
    desc: 'M3412 K14 NTR 场景 1 写回删除（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `kojo.NTR_651 = 1; // :5536`,
    replace: `// 变异：删除写回`,
    tests: ['kojo-k14-nobleman'],
    must_mention: 'NTR 再捕获（P==1',
  },
  {
    desc: 'M3413 K14 EVENTEND 反発刻印Lv3+愛なし台词改字（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `await era.printAndWait(\`「嘁…！给我去死啊…！！！」\`); // :516`,
    replace: `await era.printAndWait(\`「嘁…！给我去死啊…改字…！！！」\`); // :516（变异）`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '反発刻印Lv3+愛なし：去死台词',
  },
  {
    desc: 'M3414 K14 EVENTEND 愛(体力500未満)男档感谢台词改字（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `        \`「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」\`,
      ); // :589`,
    replace: `        \`「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~（变异）」\`,
      ); // :589`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '爱（85）体力 500 未満',
  },
  {
    desc: 'M3415 K14 初调教通常男台词改字（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'await era.printAndWait(\n        `「可…可恶啊！！！你这个肮脏的魔王！！我郑重告诉你！${sc()}是绝对不会屈服于你的…！！」`,\n      ); // :91',
    replace:
      'await era.printAndWait(\n        `「可…可恶啊！！！你这个肮脏的魔王！！我郑重告诉你！${sc()}是绝对不会屈服于你的…！！（改）」`,\n      ); // :91（变异）',
    tests: ['kojo-k14-nobleman'],
    must_mention: '通常男（TALENT:122）',
  },
  {
    desc: 'M3416 K14 K14_KOJO2 反抗刻印Lv3台词改字（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'await era.printAndWait(`「去死一死吧！！你这个又脏又可恶的魔王！！」`); // :431',
    replace:
      'await era.printAndWait(`「去死一死吧！！你这个又脏又可恶的魔王！！（改）」`); // :431（变异）',
    tests: ['kojo-k14-nobleman'],
    must_mention: '反抗刻印Lv3 分档台词',
  },
  {
    desc: 'M3417 K14 DUNGEON_VICTORY 臆病档台词改回日文残留（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'await era.printAndWait(`「魔的力量、居然强大到了这种地步……」`); // :5300',
    replace:
      'await era.printAndWait(`「魔の力、これほどとは……」`); // :5300（变异）',
    tests: ['kojo-k14-nobleman'],
    must_mention: '臆病（TALENT:10）',
  },
  {
    desc: 'M3418 K14 BENKI 野外露出配信 %SELF_CALL(A)% 改回字面量（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'await era.printAndWait(\n        `「${sc()}败给了伟大的魔王大人…虽然身心都被彻底的玩弄了、但不会就此屈服的！」`,\n      ); // :5225',
    replace:
      'await era.printAndWait(\n        `「%SELF_CALL(A)%败给了伟大的魔王大人…虽然身心都被彻底的玩弄了、但不会就此屈服的！」`,\n      ); // :5225（变异）',
    tests: ['kojo-k14-nobleman'],
    must_mention: '野外露出配信',
  },
  {
    desc: 'M3419 K14 GOHOUBI_REQUEST 接吻(4)档台词改字（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `      \`\${chara_callname(a)}提出了回来之后想与你接吻的奖励。\`,
    ); // :5749`,
    replace: `      \`\${chara_callname(a)}提出了回来之后想与你接吻的奖励。（变异）\`,
    ); // :5749`,
    tests: ['kojo-k14-nobleman'],
    must_mention: 'GOHOUBI_REQUEST CFLAG:504==4',
  },
  {
    desc: 'M3420 K14 GOBI 语尾得意档改字（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `    await era.print(\`哦~♪\`); // :5916`,
    replace: `    await era.print(\`哦～♪\`); // :5916（变异）`,
    tests: ['kojo-k14-nobleman'],
    must_mention: 'GOBI 语尾 ARG:0==1',
  },
  {
    desc: 'M3421 K14 GOBI 语尾默认档随机首支改字（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `      await era.print(\`啦。\`); // :5933`,
    replace: `      await era.print(\`啦～。\`); // :5933（变异）`,
    tests: ['kojo-k14-nobleman'],
    must_mention: 'GOBI 语尾 ARG:0==0',
  },
  {
    desc: 'M3422 K14 EVENTTRAIN 守卫①口上开关判据反转（<=0 改 >0，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `  if ((game.kojo.口上开关 || 0) <= 0) {
    // :54-55
    return 0; // :54-55`,
    replace: `  if ((game.kojo.口上开关 || 0) > 0) {
    // :54-55
    return 0; // :54-55`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '口上开关<0（玩家显式关掉）',
  },
  {
    desc: 'M3423 K14 COM 守卫①口塞判据删除（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {',
    replace: '  if (false) { // 变异：口塞守卫删除',
    tests: ['kojo-k14-nobleman'],
    must_mention: '口塞（TEQUIP:45',
  },
  {
    desc: 'M3424 K14 COM 守卫②失神判据删除（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `  if (game.train.失神) {
    // :612`,
    replace: `  if (false) { // 变异：失神守卫删除
    // :612`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '失神（TFLAG:899）',
  },
  {
    desc: 'M3425 K14 COM 兽奸守卫岔路丢失（TEQUIP:89 不再调 dog，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `  if (era.get(\`tequip:\${target}:89\`)) {
    // :614
    await dog_kojo_14(rand_n); // :615 CALL DOG_KOJO_14`,
    replace: `  if (era.get(\`tequip:\${target}:89\`)) {
    // :614
    // 变异：不调 DOG`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '兽奸守卫（TEQUIP:89）',
  },
  {
    desc: 'M3426 K14 COM 死斗场守卫岔路丢失（TEQUIP:55 不再调 colosseum，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `  if (era.get(\`tequip:\${target}:55\`)) {
    // :619
    await colosseum_kojo_14(rand_n); // :620 CALL COLOSSEUM_KOJO_14`,
    replace: `  if (era.get(\`tequip:\${target}:55\`)) {
    // :619
    // 变异：不调 COLOSSEUM`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '死斗场守卫（TEQUIP:55）',
  },
  {
    desc: 'M3427 K14 DOG 兽奸爱抚初回写回值改错（爱抚=1 改 2，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `      kojo.爱抚 = 1; // :3578`,
    replace: `      kojo.爱抚 = 2; // :3578（变异）`,
    tests: ['kojo-k14-nobleman'],
    must_mention: 'CALL DOG：走兽奸计数器',
  },
  {
    desc: 'M3428 K14 COM 穿环初回写回删除（kojo.穿环=1 删，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: `      kojo.穿环 = 1; // :3438`,
    replace: `      // 变异：删除写回`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '穿环初回',
  },
  {
    desc: 'M3429 K14 ENTERENEMY 反抗的（TALENT:11）台词改字（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '    await era.printAndWait(`「魔王！　不可原谅！」`); // :5720',
    replace:
      '    await era.printAndWait(`「魔王！　绝不原谅！」`); // :5720（变异）',
    tests: ['kojo-k14-nobleman'],
    must_mention: 'ENTERENEMY 反抗的',
  },
  {
    desc: 'M3500 K15 EVENTTRAIN #PRI 存在标志写错值（FLAG:115=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    game.kojo.口上存在_15 = 1; // :31 FLAG:115 = 1（K15 口上存在标志）`,
    replace: `    game.kojo.口上存在_15 = 2; // :31（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: 'K15 存在标志 FLAG:115',
  },
  {
    desc: 'M3501 K15 EVENTTRAIN #PRI 口上开关补 0 判据改错（===0 改 ===1，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // :33
    }`,
    replace: `    if (game.kojo.口上开关 === 1) {  // 变异
      game.kojo.口上开关 = 2; // :33
    }`,
    tests: ['kojo-k15-clever'],
    must_mention: '@EVENTTRAIN #PRI 口上开关补 0（FLAG:7 从 0 补到 2）',
  },
  {
    desc: 'M3502 K15 EVENTEND #LATER 存在标志清除值改错（=0 改 =1，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    game.kojo.口上存在_15 = 0; // :37`,
    replace: `    game.kojo.口上存在_15 = 1; // :37（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: 'EVENTEND #LATER 清 FLAG:115',
  },
  {
    desc: 'M3503 K15 EVENTTRAIN 自身守卫①口上开关判据反转（<=0 改 >0，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if ((game.kojo.口上开关 || 0) <= 0) {
    return 0; // :43-47
  } // :43-47`,
    replace: `  if ((game.kojo.口上开关 || 0) > 0) {  // 变异
    return 0; // :43-47
  } // :43-47`,
    tests: ['kojo-k15-clever'],
    must_mention: 'EVENTTRAIN 自身守卫①口上开关<0（玩家显式关掉）静默跳过',
  },
  {
    desc: 'M3504 K15 EVENTTRAIN 自身守卫②TALENT:175 判据反转（!=1 改 ==1，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (era0(\`talent:\${target}:175\`) != 1) {
    return 0; // :43-47
  } // :43-47`,
    replace: `  if (era0(\`talent:\${target}:175\`) == 1) {  // 变异
    return 0; // :43-47
  } // :43-47`,
    tests: ['kojo-k15-clever'],
    must_mention: 'EVENTTRAIN 自身守卫②TALENT:175!=1 静默跳过',
  },
  {
    desc: 'M3505 K15 初调教推进值写错（CFLAG:201=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.初调教 = 1; // :91 CFLAG:201 = 1`,
    replace: `    kojo.初调教 = 2; // :91（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '初调教暗器：选 2 偏头闪躲 → 恭顺珠 +50、CFLAG:201=1',
  },
  {
    desc: 'M3506 K15 屈服刻印 Lv1 推进值写错（初调教=2 改 3，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.初调教 = 2; // :119`,
    replace: `    kojo.初调教 = 3; // :119（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '屈服 Lv1 推进到 2',
  },
  {
    desc: 'M3507 K15 屈服刻印 Lv2 推进值写错（初调教=3 改 4，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.初调教 = 3; // :127`,
    replace: `    kojo.初调教 = 4; // :127（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '屈服 Lv2 推进到 3',
  },
  {
    desc: 'M3508 K15 屈服刻印 Lv3 推进值写错（初调教=4 改 5，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.初调教 = 4; // :135`,
    replace: `    kojo.初调教 = 5; // :135（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '屈服 Lv3 推进到 4',
  },
  {
    desc: 'M3509 K15 淫乱推进值写错（初调教=5 改 6，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.初调教 = 5; // :144`,
    replace: `    kojo.初调教 = 6; // :144（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '淫乱推进到 5',
  },
  {
    desc: 'M3510 K15 爱慕推进值写错（初调教=6 改 7，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.初调教 = 6; // :166`,
    replace: `    kojo.初调教 = 7; // :166（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '爱慕推进到 6',
  },
  {
    desc: 'M3511 K15 崩坏推进值写错（初调教=9 改 8，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.初调教 = 9; // :174`,
    replace: `    kojo.初调教 = 8; // :174（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '崩坏推进到 9',
  },
  {
    desc: 'M3512 K15 NTR 再捕获爱慕臂解除值改错（CFLAG:650=0 改 1，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.NTR再捕获 = 0; // :99-102`,
    replace: `      kojo.NTR再捕获 = 1; // :99-102（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: 'NTR 开关解除',
  },
  {
    desc: 'M3513 K15 EVENTEND 死亡守卫判据反转（BASE:0<=0 改 >0，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (era0(\`base:\${target}:0\`) <= 0) {
    return 0; // :316-324
  } // :316-324`,
    replace: `  if (era0(\`base:\${target}:0\`) > 0) {  // 变异
    return 0; // :316-324
  } // :316-324`,
    tests: ['kojo-k15-clever'],
    must_mention: 'EVENTEND 死亡（BASE:0<=0）静默跳过',
  },
  {
    desc: 'M3514 K15 COM 头部守卫①TEQUIP:45 判据改错（#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (era0(\`tequip:\${target}:45\`) && era_flag.selectcom != 45) {
    return 0; // :411-412
  } // :411-412`,
    replace: `  if (era0(\`tequip:\${target}:46\`) && era_flag.selectcom != 45) {  // 变异
    return 0; // :411-412
  } // :411-412`,
    tests: ['kojo-k15-clever'],
    must_mention: '口塞（TEQUIP:45 且非指令45）：静默跳过',
  },
  {
    desc: 'M3515 K15 COM 头部守卫②失神判据反转（#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (game.train.失神) {
    // :414-415 TFLAG:899（跨域读走门面）
    return 0; // :414-415
  } // :414-415`,
    replace: `  if (!game.train.失神) {  // 变异
    // :414-415 TFLAG:899（跨域读走门面）
    return 0; // :414-415
  } // :414-415`,
    tests: ['kojo-k15-clever'],
    must_mention: '失神守卫跳过',
  },
  {
    desc: 'M3516 K15 COM 头部守卫③TEQUIP:89 分发对象改错（DOG 改 COLOSSEUM，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    await dog_kojo_15(rand_n); // :418 CALL DOG_KOJO_15`,
    replace: `    await colosseum_kojo_15(rand_n); // 变异：调用对象改错`,
    tests: ['kojo-k15-clever'],
    must_mention: '兽奸（TEQUIP:89）：岔进本文件真身 DOG_KOJO_15',
  },
  {
    desc: 'M3517 K15 COM 头部守卫④TEQUIP:55 分发对象改错（COLOSSEUM 改 DOG，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    await colosseum_kojo_15(rand_n); // :423 CALL COLOSSEUM_KOJO_15`,
    replace: `    await dog_kojo_15(rand_n); // 变异：调用对象改错`,
    tests: ['kojo-k15-clever'],
    must_mention: '死斗场（TEQUIP:55）：岔进本文件真身 COLOSSEUM_KOJO_15',
  },
  {
    desc: 'M3518 K15 COM 头部被插入 ASSI 守卫（源 :408-410 整行注释，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  const kojo = chara(target).kojo;

  if (era0(\`tequip:\${target}:45\`) && era_flag.selectcom != 45) {`,
    replace: `  const kojo = chara(target).kojo;

  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0; // 变异：插入 ASSI 守卫
  }
  if (era0(\`tequip:\${target}:45\`) && era_flag.selectcom != 45) {`,
    tests: ['kojo-k15-clever'],
    must_mention: 'K15 无 ASSI 守卫，助手调教也出声',
  },
  {
    desc: 'M3519 K15 COM 头部被插入 TALENT:9 守卫（源无此道，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    await colosseum_kojo_15(rand_n); // :423 CALL COLOSSEUM_KOJO_15
    return 0; // :423-424
  } // :423-425

  if (era_flag.selectcom == 0) {`,
    replace: `    await colosseum_kojo_15(rand_n); // :423 CALL COLOSSEUM_KOJO_15
    return 0; // :423-424
  } // :423-425
  if (era0(\`talent:\${target}:9\`) == 1) {
    return 0; // 变异：插入 TALENT:9 守卫
  }

  if (era_flag.selectcom == 0) {`,
    tests: ['kojo-k15-clever'],
    must_mention: 'K15 无 TALENT:9 守卫',
  },
  {
    desc: 'M3520 K15 COM 头部被插入 TEQUIP:90 守卫（源无此道，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (game.train.失神) {
    // :414-415 TFLAG:899（跨域读走门面）
    return 0; // :414-415
  } // :414-415
  if (era0(\`tequip:\${target}:89\`)) {`,
    replace: `  if (game.train.失神) {
    // :414-415 TFLAG:899（跨域读走门面）
    return 0; // :414-415
  } // :414-415
  if (era0(\`tequip:\${target}:90\`)) {
    return 0; // 变异：插入 TEQUIP:90 守卫
  }
  if (era0(\`tequip:\${target}:89\`)) {`,
    tests: ['kojo-k15-clever'],
    must_mention: 'K15 无 TEQUIP:90 守卫',
  },
  {
    desc: 'M3521 K15 COM 族注册 key 改错（15 改 16，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `kojo_message_com_family.register(15, kojo_message_com_15);`,
    replace: `kojo_message_com_family.register(16, kojo_message_com_15);  // 变异`,
    tests: ['kojo-k15-clever'],
    must_mention: 'COM 族缺 K15 注册',
  },
  {
    desc: 'M3522 K15 爱抚首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.爱抚 = 1; // :443-445`,
    replace: `      kojo.爱抚 = 2; // :443-445`,
    tests: ['kojo-k15-clever'],
    must_mention: '爱抚初回（CFLAG:301==0 且 MARK:2<2）',
  },
  {
    desc: 'M3523 K15 舔阴首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.舔阴 = 1; // :502-505`,
    replace: `      kojo.舔阴 = 2; // :502-505`,
    tests: ['kojo-k15-clever'],
    must_mention: '舔阴初回推进到 1',
  },
  {
    desc: 'M3524 K15 肛门爱抚首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.肛门爱抚 = 1; // :545`,
    replace: `      kojo.肛门爱抚 = 2; // :545`,
    tests: ['kojo-k15-clever'],
    must_mention: '肛门爱抚初回推进到 1',
  },
  {
    desc: 'M3525 K15 自慰首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.自慰 = 1; // :601`,
    replace: `      kojo.自慰 = 2; // :601`,
    tests: ['kojo-k15-clever'],
    must_mention: '自慰初回推进到 1',
  },
  {
    desc: 'M3526 K15 胸爱抚首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.胸爱抚 = 1; // :693-696`,
    replace: `      kojo.胸爱抚 = 2; // :693-696`,
    tests: ['kojo-k15-clever'],
    must_mention: '胸爱抚初回推进到 1',
  },
  {
    desc: 'M3527 K15 接吻调教首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.接吻 = 1; // :781-784`,
    replace: `      kojo.接吻 = 2; // :781-784`,
    tests: ['kojo-k15-clever'],
    must_mention: '调教初回推进到 1',
  },
  {
    desc: 'M3528 K15 自己扒开首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.自己扒开 = 1; // :840`,
    replace: `      kojo.自己扒开 = 2; // :840`,
    tests: ['kojo-k15-clever'],
    must_mention: '自己扒开初回推进到 1',
  },
  {
    desc: 'M3529 K15 插入手指首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.插入手指 = 1; // :886`,
    replace: `      kojo.插入手指 = 2; // :886`,
    tests: ['kojo-k15-clever'],
    must_mention: '插入手指初回 → 1',
  },
  {
    desc: 'M3530 K15 舔肛首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.舔肛 = 1; // :925-928`,
    replace: `      kojo.舔肛 = 2; // :925-928`,
    tests: ['kojo-k15-clever'],
    must_mention: '舔肛初回 → 1',
  },
  {
    desc: 'M3531 K15 振动宝石首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.振动宝石 = 1; // :968`,
    replace: `      kojo.振动宝石 = 2; // :968`,
    tests: ['kojo-k15-clever'],
    must_mention: '振动宝石初回 → 1',
  },
  {
    desc: 'M3532 K15 壶虫首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.壶虫 = 1; // :1031`,
    replace: `      kojo.壶虫 = 2; // :1031`,
    tests: ['kojo-k15-clever'],
    must_mention: '壶虫初回 → 1',
  },
  {
    desc: 'M3533 K15 振动杖首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.振动杖 = 1; // :1100`,
    replace: `      kojo.振动杖 = 2; // :1100`,
    tests: ['kojo-k15-clever'],
    must_mention: '振动杖初回 → 1',
  },
  {
    desc: 'M3534 K15 肛门虫首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.肛门虫 = 1; // :1146`,
    replace: `      kojo.肛门虫 = 2; // :1146`,
    tests: ['kojo-k15-clever'],
    must_mention: '肛门虫初回 → 1',
  },
  {
    desc: 'M3535 K15 肛珠首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.肛珠 = 1; // :1445`,
    replace: `      kojo.肛珠 = 2; // :1445`,
    tests: ['kojo-k15-clever'],
    must_mention: '肛珠初回 → 1',
  },
  {
    desc: 'M3536 K15 正常位首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.正常位 = 1; // :1553`,
    replace: `      kojo.正常位 = 2; // :1553`,
    tests: ['kojo-k15-clever'],
    must_mention: '正常位初回 → 1',
  },
  {
    desc: 'M3537 K15 对面座位首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.对面座位 = 1; // :1781`,
    replace: `      kojo.对面座位 = 2; // :1781`,
    tests: ['kojo-k15-clever'],
    must_mention: '对面座位初回 → 1',
  },
  {
    desc: 'M3538 K15 正常位肛交首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.正常位肛交 = 1; // :1991`,
    replace: `      kojo.正常位肛交 = 2; // :1991`,
    tests: ['kojo-k15-clever'],
    must_mention: '正常位肛交初回 → 1',
  },
  {
    desc: 'M3539 K15 对面座位肛交首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.对面座位肛交 = 1; // :2207`,
    replace: `      kojo.对面座位肛交 = 2; // :2207`,
    tests: ['kojo-k15-clever'],
    must_mention: '对面座位肛交初回 → 1',
  },
  {
    desc: 'M3540 K15 背面座位肛交首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.背面座位肛交 = 1; // :2311`,
    replace: `      kojo.背面座位肛交 = 2; // :2311`,
    tests: ['kojo-k15-clever'],
    must_mention: '背面座位肛交初回 → 1',
  },
  {
    desc: 'M3541 K15 手淫首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.手淫 = 1; // :2417`,
    replace: `      kojo.手淫 = 2; // :2417`,
    tests: ['kojo-k15-clever'],
    must_mention: '手淫初回 → 1',
  },
  {
    desc: 'M3542 K15 口交_奴首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.口交_奴 = 1; // :2472`,
    replace: `      kojo.口交_奴 = 2; // :2472`,
    tests: ['kojo-k15-clever'],
    must_mention: '口交初回 → 1',
  },
  {
    desc: 'M3543 K15 乳交覆盖首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.乳交 = 1; // :2530`,
    replace: `      kojo.乳交 = 2; // :2530`,
    tests: ['kojo-k15-clever'],
    must_mention: '初回淫乱先写 5 再被 CFLAG:TARGET:333=1 覆盖',
  },
  {
    desc: 'M3544 K15 股间性交首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.股间性交 = 1; // :2593`,
    replace: `      kojo.股间性交 = 2; // :2593`,
    tests: ['kojo-k15-clever'],
    must_mention: '股间性交初回 → 1',
  },
  {
    desc: 'M3545 K15 骑乘位首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.骑乘位 = 1; // :2669`,
    replace: `      kojo.骑乘位 = 2; // :2669`,
    tests: ['kojo-k15-clever'],
    must_mention: '骑乘位 / 骑乘位肛交：初回それ以外 + 二回目淫乱',
  },
  {
    desc: 'M3546 K15 全身擦洗首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.全身擦洗 = 1; // :2734`,
    replace: `      kojo.全身擦洗 = 2; // :2734`,
    tests: ['kojo-k15-clever'],
    must_mention: '全身擦洗初回 → 1',
  },
  {
    desc: 'M3547 K15 骑乘位肛交首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.骑乘位肛交 = 1; // :2778`,
    replace: `      kojo.骑乘位肛交 = 2; // :2778`,
    tests: ['kojo-k15-clever'],
    must_mention: '骑乘位肛交初回 → 1',
  },
  {
    desc: 'M3548 K15 肛门侍奉首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.肛门侍奉 = 1; // :2854`,
    replace: `      kojo.肛门侍奉 = 2; // :2854`,
    tests: ['kojo-k15-clever'],
    must_mention: '肛门侍奉初回 → 1',
  },
  {
    desc: 'M3549 K15 打屁股首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.打屁股 = 1; // :2887`,
    replace: `      kojo.打屁股 = 2; // :2887`,
    tests: ['kojo-k15-clever'],
    must_mention: '打屁股初回 → 1',
  },
  {
    desc: 'M3550 K15 鞭首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.鞭 = 1; // :2933`,
    replace: `      kojo.鞭 = 2; // :2933`,
    tests: ['kojo-k15-clever'],
    must_mention: '鞭初回 → 1',
  },
  {
    desc: 'M3551 K15 针首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.针 = 1; // :2990`,
    replace: `      kojo.针 = 2; // :2990`,
    tests: ['kojo-k15-clever'],
    must_mention: '针初回 → 1',
  },
  {
    desc: 'M3552 K15 眼罩开始首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.眼罩 = 1; // :3048`,
    replace: `      kojo.眼罩 = 2; // :3048`,
    tests: ['kojo-k15-clever'],
    must_mention: '眼罩开始初回 → 1',
  },
  {
    desc: 'M3553 K15 绳子开始首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.绳子 = 1; // :3122`,
    replace: `      kojo.绳子 = 2; // :3122`,
    tests: ['kojo-k15-clever'],
    must_mention: '绳子开始初回 → 1',
  },
  {
    desc: 'M3554 K15 口塞开始首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.口塞 = 1; // :3196`,
    replace: `      kojo.口塞 = 2; // :3196`,
    tests: ['kojo-k15-clever'],
    must_mention: '口塞开始初回 → 1',
  },
  {
    desc: 'M3555 K15 灌肠肛塞首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.灌肠肛塞 = 1; // :3273`,
    replace: `      kojo.灌肠肛塞 = 2; // :3273`,
    tests: ['kojo-k15-clever'],
    must_mention: '灌肠开始初回 → 1',
  },
  {
    desc: 'M3556 K15 放置PLAY首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.放置PLAY = 1; // :3355`,
    replace: `      kojo.放置PLAY = 2; // :3355`,
    tests: ['kojo-k15-clever'],
    must_mention: '放置PLAY 初回 → 1',
  },
  {
    desc: 'M3557 K15 交谈首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.交谈 = 1; // :3426`,
    replace: `      kojo.交谈 = 2; // :3426`,
    tests: ['kojo-k15-clever'],
    must_mention: '交谈（SELECTCOM 56）：录像 / 爱慕 ASSIPLAY / 二回目それ以外',
  },
  {
    desc: 'M3558 K15 深喉首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.深喉 = 1; // :3715`,
    replace: `      kojo.深喉 = 2; // :3715`,
    tests: ['kojo-k15-clever'],
    must_mention: '深喉初回 → 1',
  },
  {
    desc: 'M3559 K15 穿环首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.穿环 = 1; // :3902`,
    replace: `      kojo.穿环 = 2; // :3902`,
    tests: ['kojo-k15-clever'],
    must_mention: '穿环初回 → 1',
  },
  {
    desc: 'M3560 K15 眼罩着脱首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.眼罩着脱 = 1; // :3100`,
    replace: `      kojo.眼罩着脱 = 2; // :3100`,
    tests: ['kojo-k15-clever'],
    must_mention: '眼罩着脱それ以外 → 1',
  },
  {
    desc: 'M3561 K15 绳子着脱首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.绳子着脱 = 1; // :3174`,
    replace: `      kojo.绳子着脱 = 2; // :3174`,
    tests: ['kojo-k15-clever'],
    must_mention: '绳子着脱それ以外 → 1',
  },
  {
    desc: 'M3562 K15 口塞着脱首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.口塞着脱 = 1; // :3248`,
    replace: `      kojo.口塞着脱 = 2; // :3248`,
    tests: ['kojo-k15-clever'],
    must_mention: '口塞着脱それ以外 → 1',
  },
  {
    desc: 'M3563 K15 乳夹口交首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.乳夹口交 = 1; // :3497`,
    replace: `      kojo.乳夹口交 = 2; // :3497`,
    tests: ['kojo-k15-clever'],
    must_mention:
      '乳夹口交 / 口交时自慰 / 手搓口交 / 真空口交 / 六九式 / 强制口交：空 PRINTFORMW 仍推进',
  },
  {
    desc: 'M3564 K15 兽奸爱抚首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.爱抚 = 1; // :4044`,
    replace: `      kojo.爱抚 = 2; // :4044`,
    tests: ['kojo-k15-clever'],
    must_mention: '兽奸爱抚初回推进 CFLAG:301=1',
  },
  {
    desc: 'M3565 K15 肛门爱抚それ以外读位改回肛门爱抚（原文读首次耻情Lv2/CFLAG:223，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 == 2) {
        // :576 源读 CFLAG:223，不是 303——1:1 保留`,
    replace: `      } else if (kojo.肛门爱抚 <= 1 || game.kojo.口上开关 == 2) {  // 变异：读位改回 303
        // :576 源读 CFLAG:223，不是 303——1:1 保留`,
    tests: ['kojo-k15-clever'],
    must_mention:
      '肛门爱抚二回目以降：润滑分档 + それ以外读 CFLAG:223（源缺陷 1:1）',
  },
  {
    desc: 'M3566 K15 自己扒开二回目误写胸爱抚改回自己扒开（原文写 CFLAG:306，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `        kojo.胸爱抚 = 5; // :847-848 源误写 CFLAG:306`,
    replace: `        kojo.自己扒开 = 5; // :847-848（变异：修好误写）`,
    tests: ['kojo-k15-clever'],
    must_mention: '源误写 CFLAG:306=5（非 308）',
  },
  {
    desc: 'M3567 K15 胸爱抚爱慕+ASSIPLAY 臂判据反转（源不写计数器，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2) &&
        era_flag.assiplay`,
    replace: `        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay  // 变异`,
    tests: ['kojo-k15-clever'],
    must_mention: '胸爱抚二回目以降：淫乱 / 爱慕+ASSIPLAY 不写计数器 / B感覚',
  },
  {
    desc: 'M3568 K15 乳交二回目读位改回乳交（原文读口交_奴/CFLAG:332，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `        era0(\`abl:\${target}:16\`) >= 5 &&
        (kojo.口交_奴 <= 5 || game.kojo.口上开关 == 2)
      ) {
        // :2535`,
    replace: `        era0(\`abl:\${target}:16\`) >= 5 &&
        (kojo.乳交 <= 5 || game.kojo.口上开关 == 2)  // 变异：读位改回 333
      ) {
        // :2535`,
    tests: ['kojo-k15-clever'],
    must_mention:
      '乳交：初回淫乱先写 5 再被外层写成 1；二回目读 CFLAG:332（源缺陷 1:1）',
  },
  {
    desc: 'M3569 K15 打屁股初回去掉 !(淫乱||爱慕)（源 1:1，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.打屁股 == 0 &&
      !(era0(\`talent:\${target}:76\`) || era0(\`talent:\${target}:85\`))`,
    replace: `      kojo.打屁股 == 0  // 变异：去掉 !(淫乱||爱慕)`,
    tests: ['kojo-k15-clever'],
    must_mention:
      '初回淫乱跳过 IF CFLAG:341==0 && !(76||85)，落入二回目淫乱+被虐Lv3',
  },
  {
    desc: 'M3570 K15 鞭それ以外读位改回鞭（原文读骑乘位/CFLAG:335，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 == 2) {
        // :2966`,
    replace: `      } else if (kojo.鞭 <= 1 || game.kojo.口上开关 == 2) {  // 变异：读位改回 342
        // :2966`,
    tests: ['kojo-k15-clever'],
    must_mention:
      '鞭（SELECTCOM 41）：空 PRINTFORMW 仍推进；それ以外读 CFLAG:335（源缺陷 1:1）',
  },
  {
    desc: 'M3571 K15 深喉二回目读位改回深喉（原文读真空口交/CFLAG:363，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `        (kojo.真空口交 <= 4 || game.kojo.口上开关 == 2)
      ) {
        // :3720`,
    replace: `        (kojo.深喉 <= 4 || game.kojo.口上开关 == 2)  // 变异：读位改回 365
      ) {
        // :3720`,
    tests: ['kojo-k15-clever'],
    must_mention: '读 CFLAG:363 已 6 且 FLAG:7==1 → 全部臂不进，365 保持 1',
  },
  {
    desc: 'M3572 K15 兽奸眼罩着脱读位改回兽奸眼罩（原文读肛门侍奉/CFLAG:338，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      era0(\`talent:\${target}:136\`) == 1 &&
      (kojo.肛门侍奉 < 3 || game.kojo.口上开关 == 2)`,
    replace: `      era0(\`talent:\${target}:136\`) == 1 &&
      (kojo.兽奸眼罩 < 3 || game.kojo.口上开关 == 2)  // 变异：读位改回 444`,
    tests: ['kojo-k15-clever'],
    must_mention: '读 CFLAG:338 已 3 且 FLAG:7==1 → 牝犬臂不进，444 保持 1',
  },
  {
    desc: 'M3573 K15 兽奸眼罩着脱それ以外推进值写错（CFLAG:444=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      kojo.兽奸眼罩 = 1; // :4819`,
    replace: `      kojo.兽奸眼罩 = 2; // :4819（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '兽奸眼罩着脱それ以外 → CFLAG:444=1',
  },
  {
    desc: 'M3574 K15 PALAMCNG 口塞守卫判据改错（TEQUIP:45 改 46，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (era0(\`tequip:\${target}:45\`)) {
    return 0; // :4898-4902
  } // :4898-4902`,
    replace: `  if (era0(\`tequip:\${target}:46\`)) {  // 变异
    return 0; // :4898-4902
  } // :4898-4902`,
    tests: ['kojo-k15-clever'],
    must_mention: 'PALAMCNG 口塞守卫跳过润滑',
  },
  {
    desc: 'M3575 K15 PALAMCNG 首次润滑判据抬档（PALAMLV[2] 改 [3]，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (P_lube > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {`,
    replace: `  if (P_lube > PALAMLV[3] && kojo.首次润滑Lv2 == 0) {  // 变异`,
    tests: ['kojo-k15-clever'],
    must_mention: '润滑首次超 LV2 → 221=1',
  },
  {
    desc: 'M3576 K15 PALAMCNG C绝顶阴茎分档判据改错（TALENT:121 改 123，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      if (era0(\`talent:\${target}:121\`) || era0(\`talent:\${target}:122\`)) {
        // :4998`,
    replace: `      if (era0(\`talent:\${target}:123\`) || era0(\`talent:\${target}:122\`)) {  // 变异
        // :4998`,
    tests: ['kojo-k15-clever'],
    must_mention: 'C绝顶阴茎分档',
  },
  {
    desc: 'M3577 K15 PALAMCNG 处女丧失推进值写错（CFLAG:229=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.处女丧失 = 1; // :5097`,
    replace: `    kojo.处女丧失 = 2; // :5097（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '处女丧失 → 229=1',
  },
  {
    desc: 'M3578 K15 MARKCNG 口塞守卫判据改错（TEQUIP:45 改 46，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (era0(\`tequip:\${target}:45\`)) {
    return 0; // :5109-5113
  } // :5109-5113`,
    replace: `  if (era0(\`tequip:\${target}:46\`)) {  // 变异
    return 0; // :5109-5113
  } // :5109-5113`,
    tests: ['kojo-k15-clever'],
    must_mention: 'MARKCNG 口塞守卫跳过苦痛',
  },
  {
    desc: 'M3579 K15 MARKCNG 苦痛刻印Lv3 推进值写错（CFLAG:297=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.苦痛刻印Lv3 = 1; // :5122`,
    replace: `    kojo.苦痛刻印Lv3 = 2; // :5122（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '苦痛刻印Lv3 → 297=1',
  },
  {
    desc: 'M3580 K15 MARKCNG 快乐刻印Lv3 推进值写错（CFLAG:298=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.快乐刻印Lv3 = 1; // :5135`,
    replace: `    kojo.快乐刻印Lv3 = 2; // :5135（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '快乐刻印Lv3 → 298=1',
  },
  {
    desc: 'M3581 K15 MARKCNG 屈服刻印Lv3 推进值写错（CFLAG:299=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.屈服刻印Lv3 = 1; // :5148`,
    replace: `    kojo.屈服刻印Lv3 = 2; // :5148（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '屈服刻印Lv3 → 299=1',
  },
  {
    desc: 'M3582 K15 MARKCNG 反抗刻印Lv3 推进值写错（CFLAG:300=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.反抗刻印Lv3 = 1; // :5161`,
    replace: `    kojo.反抗刻印Lv3 = 2; // :5161（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '反抗刻印Lv3 → 300=1',
  },
  {
    desc: 'M3583 K15 SELF_KOJO leftover_q 助手判据改错（Q==1 改 ==2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    } else if (Q == 1) {`,
    replace: `    } else if (Q == 2) {  // 变异`,
    tests: ['kojo-k15-clever'],
    must_mention: 'SELF_KOJO leftover_q 助手',
  },
  {
    desc: 'M3584 K15 SELF_KOJO 调教后自慰推进值写错（CFLAG:261=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.调教后自慰 = 1; // :5203`,
    replace: `    kojo.调教后自慰 = 2; // :5203（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '调教后自慰 → 261=1',
  },
  {
    desc: 'M3585 K15 SELF_KOJO 夜袭推进值写错（CFLAG:265=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.夜袭 = 1; // :5283`,
    replace: `    kojo.夜袭 = 2; // :5283（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '夜袭 → 265=1',
  },
  {
    desc: 'M3586 K15 SELF_KOJO SELL_MATURO 存根调用删除（#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `      stub_line('SELL_MATURO_K0', '成熟出售口上', '随售却票'); // :5317`,
    replace: `      void 0; // 变异：删除 SELL_MATURO 存根`,
    tests: ['kojo-k15-clever'],
    must_mention: 'SELL_MATURO_K0 存根行',
  },
  {
    desc: 'M3587 K15 SELF_KOJO 妊娠发觉推进值写错（CFLAG:271=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    kojo.妊娠发觉 = 1; // :5338`,
    replace: `    kojo.妊娠发觉 = 2; // :5338（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: '妊娠发觉 → 271=1',
  },
  {
    desc: 'M3588 K15 SELF_KOJO 族注册 key 改错（15 改 16，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `self_kojo_family.register(15, self_kojo_k15);`,
    replace: `self_kojo_family.register(16, self_kojo_k15);  // 变异`,
    tests: ['kojo-k15-clever'],
    must_mention: 'SELF_KOJO 族缺 K15 注册',
  },
  {
    desc: 'M3589 K15 DUNGEON_RYOUZYOKU 处女判据反转（TALENT:0==1 改 ==0，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (era0(\`talent:\${target}:0\`) == 1) {
    // :5447`,
    replace: `  if (era0(\`talent:\${target}:0\`) == 0) {  // 变异
    // :5447`,
    tests: ['kojo-k15-clever'],
    must_mention: 'DUNGEON_RYOUZYOKU 处女それ以外；AFTER 处女',
  },
  {
    desc: 'M3590 K15 DUNGEON_RYOUZYOKU_AFTER 处女判据反转（TALENT:0==1 改 ==0，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (era0(\`talent:\${target}:0\`) == 1) {
    // :5510`,
    replace: `  if (era0(\`talent:\${target}:0\`) == 0) {  // 变异
    // :5510`,
    tests: ['kojo-k15-clever'],
    must_mention: '凌辱后处女',
  },
  {
    desc: 'M3591 K15 DUNGEON_VICTORY それ以外 RAND 判据改错（==0 改 ==1，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    if (rand_n(3) == 0) {
      // :5686
      await era.printAndWait(\`「跟这种杂鱼战斗，根本没有悬念。」\`); // :5687`,
    replace: `    if (rand_n(3) == 1) {  // 变异
      // :5686
      await era.printAndWait(\`「跟这种杂鱼战斗，根本没有悬念。」\`); // :5687`,
    tests: ['kojo-k15-clever'],
    must_mention: '胜利それ以外 RAND:3==0',
  },
  {
    desc: 'M3592 K15 DUNGEON_ATTACK 侵攻中判据改错（状态==2 改 ==1，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (chara(target).invasion.状态 == 2) {`,
    replace: `  if (chara(target).invasion.状态 == 1) {  // 变异`,
    tests: ['kojo-k15-clever'],
    must_mention: '攻击侵攻中それ以外',
  },
  {
    desc: 'M3593 K15 BENKI 肉便器行动判据改错（==0 改 ==99，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (game.train.肉便器行动 == 0) {`,
    replace: `  if (game.train.肉便器行动 == 99) {  // 变异`,
    tests: ['kojo-k15-clever'],
    must_mention: 'BENKI 空 PRINTFORMW',
  },
  {
    desc: 'M3594 K15 NTR 再捕获首次标记写错值（CFLAG:650=1 改 0，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    chara(target).kojo.NTR再捕获 = 1; // :5925`,
    replace: `    chara(target).kojo.NTR再捕获 = 0; // :5925（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: 'NTR再捕获',
  },
  {
    desc: 'M3595 K15 NTR P==1 分支写入字段改错（CFLAG:651 改 652，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    chara(target).kojo.NTR_651 = 1; // :5935`,
    replace: `    chara(target).kojo.NTR_652 = 1; // :5935（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: 'NTR_651',
  },
  {
    desc: 'M3596 K15 GOHOUBI_REQUEST 要求奖赏判据改错（==0 改 ==1，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (chara(a).stronghold.要求奖赏 == 0) {
    // :6135`,
    replace: `  if (chara(a).stronghold.要求奖赏 == 1) {  // 变异
    // :6135`,
    tests: ['kojo-k15-clever'],
    must_mention: 'GOHOUBI_REQUEST 钱',
  },
  {
    desc: 'M3597 K15 GOHOUBI_AFTER choice==1 判据改错（#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  } else if (choice == 1) {
    // :6180`,
    replace: `  } else if (choice == 2) {  // 变异
    // :6180`,
    tests: ['kojo-k15-clever'],
    must_mention: 'GOHOUBI_AFTER 勋章',
  },
  {
    desc: 'M3598 K15 OSIOKI choice==0 判据改错（#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (choice == 0) {
    // :6274`,
    replace: `  if (choice == 1) {  // 变异
    // :6274`,
    tests: ['kojo-k15-clever'],
    must_mention: 'OSIOKI 何もしない',
  },
  {
    desc: 'M3599 K15 GOBI arg0==1 输出文案改错（#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    await era.print(\`♪\`); // :6340`,
    replace: `    await era.print(\`！\`); // :6340（变异）`,
    tests: ['kojo-k15-clever'],
    must_mention: 'GOBI ARG:0==1 语尾；EXUCUTION TFLAG:16==4 空 PRINTFORMW',
  },

  {
    desc: 'M3200 K12 爱抚初次状态推进写错（=1 改 2）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.爱抚 = 1; // :438',
    replace: 'kojo.爱抚 = 2; // :438（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '初回',
  },
  {
    desc: 'M3201 K12 自慰二回目 RAND 推进写错（CFLAG:304 = 8 改 9）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '      kojo.自慰 = 8; // :617',
    replace: '      kojo.自慰 = 9; // :617（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '自慰）淫乱+自慰中毒Lv3',
  },
  {
    desc: 'M3202 K12 胸爱抚二回目 B感覚写错（CFLAG:306 = 3 改 4）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '        kojo.胸爱抚 = 3; // :710',
    replace: '        kojo.胸爱抚 = 4; // :710（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '胸爱抚）二回目 B感覚',
  },
  {
    desc: 'M3203 K12 接吻初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.接吻 = 1; // :736',
    replace: 'kojo.接吻 = 2; // :736（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '接吻）初吻',
  },
  {
    desc: 'M3204 K12 自己扒开初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.自己扒开 = 1; // :799',
    replace: 'kojo.自己扒开 = 2; // :799（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '自己扒开）初回',
  },
  {
    desc: 'M3205 K12 插入手指初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.插入手指 = 1; // :840',
    replace: 'kojo.插入手指 = 2; // :840（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '插入手指）初回',
  },
  {
    desc: 'M3206 K12 振动宝石二回目屈服刻印档写错（CFLAG:311 = 3 改 4）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '        kojo.振动宝石 = 3; // :937',
    replace: '        kojo.振动宝石 = 4; // :937（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '振动宝石）二回目屈服刻印Lv3',
  },
  {
    desc: 'M3207 K12 壶虫初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.壶虫 = 1; // :980',
    replace: 'kojo.壶虫 = 2; // :980（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '壶虫）装着初回',
  },
  {
    desc: 'M3208 K12 振动杖二回目屈服刻印档写错（CFLAG:313 = 3 改 4）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '        kojo.振动杖 = 3; // :1062',
    replace: '        kojo.振动杖 = 4; // :1062（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '振动杖）二回目屈服刻印Lv3',
  },
  {
    desc: 'M3209 K12 正常位初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.正常位 = 1; // :1466',
    replace: 'kojo.正常位 = 2; // :1466（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '正常位）初回',
  },
  {
    desc: 'M3210 K12 背后位妊娠分支写错（CFLAG:322 = 6 改 5）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '        kojo.背后位 = 6; // :1555',
    replace: '        kojo.背后位 = 5; // :1555（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '背后位）妊娠淫乱',
  },
  {
    desc: 'M3214 K12 骑乘位初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.骑乘位 = 1; // :2262',
    replace: 'kojo.骑乘位 = 2; // :2262（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '骑乘位）初回',
  },
  {
    desc: 'M3215 K12 打屁股初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.打屁股 = 1; // :2455',
    replace: 'kojo.打屁股 = 2; // :2455（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '打屁股）初回',
  },
  {
    desc: 'M3216 K12 鞭初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.鞭 = 1; // :2498',
    replace: 'kojo.鞭 = 2; // :2498（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '鞭）初回',
  },
  {
    desc: 'M3217 K12 穿环初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.穿环 = 1; // :3413',
    replace: 'kojo.穿环 = 2; // :3413（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '穿环）读 piercing_state',
  },
  {
    desc: 'M3218 K12 DOG 爱抚初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.爱抚 = 1; // :3553',
    replace: 'kojo.爱抚 = 2; // :3553（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: 'dog_kojo_12 SELECTCOM 0 二回目',
  },
  {
    desc: 'M3219 K12 DOG 舔阴初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.舔阴 = 1; // :3599',
    replace: 'kojo.舔阴 = 2; // :3599（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: 'dog_kojo_12 SELECTCOM 1（舔阴）初回',
  },
  {
    desc: 'M3220 K12 DOG 胸爱抚二回目淫乱档写错（CFLAG:306 = 6 改 5）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '        kojo.胸爱抚 = 6; // :3649',
    replace: '        kojo.胸爱抚 = 5; // :3649（变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: 'dog_kojo_12 SELECTCOM 5 二回目牝犬',
  },
  {
    desc: 'M3221 K12 背后位肛交缺陷被修正（:1863 写 327 改 328）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.正常位肛交 = 7; // :1863',
    replace: 'kojo.背后位肛交 = 7; // :1863（变异：缺陷被修）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '原作缺陷写 327',
  },
  {
    desc: 'M3223 K12 乳交判据缺陷被修正（读 332 改 333）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '      } else if (\n        era.get(`talent:${target}:76`) == 1 &&\n        (kojo.口交_奴 <= 4 || game.kojo.口上开关 == 2)\n      ) {\n        // :2162\n        await era.printAndWait(`「好难啊……你、真的会舒服吗？」`); // :2163',
    replace: '      } else if (false) { // 变异：乳交判据缺陷修正',
    tests: ['kojo-k12-intellectual'],
    must_mention: '乳交）原作缺陷：二回目前支判据读 CFLAG:332',
  },
  {
    desc: 'M3224 K12 KOJO_MESSAGE_COM_12 口塞守卫删松',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {',
    replace: 'if (false) { // 变异：口塞守卫删松',
    tests: ['kojo-k12-intellectual'],
    must_mention: '头部守卫① TEQUIP:45（口塞）',
  },
  {
    desc: 'M3225 K12 KOJO_MESSAGE_COM_12 失神守卫删松',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '  if (game.train.失神) {\n    // :410-411\n    return 0; // :410-411\n  } // :410-411',
    replace:
      '  if (false) { // 变异：失神守卫删松\n    // :410-411\n    return 0; // :410-411\n  } // :410-411',
    tests: ['kojo-k12-intellectual'],
    must_mention: '失神）跳过',
  },
  {
    desc: 'M3226 K12 SELF_KOJO TFLAG:13 归零删除',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '  game.train.初吻与自我口上 = 0;',
    replace: '  // 变异：TFLAG:13 归零删除',
    tests: ['kojo-k12-intellectual'],
    must_mention: 'self_kojo_k12 TFLAG:13==1',
  },
  {
    desc: 'M3227 K12 PALAMCNG 首次润滑 Lv2 判据删松',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'if (P1 > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {',
    replace: 'if (false) { // 变异：首次润滑 Lv2 删松',
    tests: ['kojo-k12-intellectual'],
    must_mention: '首超润滑 Lv2',
  },
  {
    desc: 'M3228 K12 NTR P=1 CFLAG:650 记位删除',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '    kojo.NTR再捕获 = 1; // :5531',
    replace: '    // 变异：CFLAG:650 记位删除',
    tests: ['kojo-k12-intellectual'],
    must_mention: 'ntr_koujo_k12 P=1（处女献出）',
  },
  {
    desc: 'M3229 K12 BENKI 肉便器行动分档删松（FLAG:62==0 改恒 false）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '  if (game.train.肉便器行动 == 0) {',
    replace: '  if (false) { // 变异：肉便器行动分档删松',
    tests: ['kojo-k12-intellectual'],
    must_mention: 'benki_koujo_k12 FLAG:62==0（最下层奉仕）淫乱',
  },
  {
    desc: 'M3230 K12 KOJO_MESSAGE_COM_12 守卫③ TEQUIP:89（兽奸岔入 DOG）删松',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '  if (era.get(`tequip:${target}:89`)) {',
    replace: '  if (false) { // 变异：兽奸岔入守卫删松',
    tests: ['kojo-k12-intellectual'],
    must_mention: '头部守卫③ TEQUIP:89（兽奸）岔去 dog_kojo_12 真身',
  },
  {
    desc: 'M3231 K12 KOJO_MESSAGE_COM_12 守卫④ TEQUIP:55（死斗场岔入 COLOSSEUM）删松',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '  if (era.get(`tequip:${target}:55`)) {',
    replace: '  if (false) { // 变异：死斗场岔入守卫删松',
    tests: ['kojo-k12-intellectual'],
    must_mention: '头部守卫④ TEQUIP:55（死斗场）岔去 colosseum_kojo_12 真身',
  },
  {
    desc: 'M3232 K12 MARKCNG 苦痛刻印 Lv3 首超判据删松',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {',
    replace: '  if (false) { // 变异：苦痛刻印首超判据删松',
    tests: ['kojo-k12-intellectual'],
    must_mention: 'kojo_message_markcng_12 苦痛刻印Lv3 取得',
  },
  {
    desc: 'M3233 K12 EVENTTRAIN #PRI 存在标志置位删除（FLAG:112 = 1）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '    game.kojo.口上存在_12 = 1; // :69 FLAG:112 = 1（K12 口上存在标志）',
    replace: '    // 变异：存在标志置位删除',
    tests: ['kojo-k12-intellectual'],
    must_mention:
      '@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K12 一对）',
  },
  {
    desc: 'M3234 K12 EVENTEND #LATER 存在标志清除删除（FLAG:112 = 0）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '    game.kojo.口上存在_12 = 0; // :75',
    replace: '    // 变异：存在标志清除删除',
    tests: ['kojo-k12-intellectual'],
    must_mention:
      '@EVENTTRAIN #PRI 置存在标志、@EVENTEND #LATER 清 0（K12 一对）',
  },
  {
    desc: 'M6000 K19 SELECTCOM 0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.爱抚 = 1; // :793',
    replace: 'chara(target).kojo.爱抚 = 2; // :793',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 0 首回合推进 CFLAG:301',
  },
  {
    desc: 'M6001 K19 SELECTCOM 1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.舔阴 = 1; // :845',
    replace: 'chara(target).kojo.舔阴 = 2; // :845',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 1 首回合推进 CFLAG:302',
  },
  {
    desc: 'M6002 K19 SELECTCOM 2 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛门爱抚 = 1; // :887',
    replace: 'chara(target).kojo.肛门爱抚 = 2; // :887',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 2 首回合推进 CFLAG:303',
  },
  {
    desc: 'M6003 K19 SELECTCOM 3 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.自慰 = 1; // :954',
    replace: 'chara(target).kojo.自慰 = 2; // :954',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 3 首回合推进 CFLAG:304',
  },
  {
    desc: 'M6004 K19 SELECTCOM 5 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.胸爱抚 = 1; // :1041',
    replace: 'chara(target).kojo.胸爱抚 = 2; // :1041',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 5 首回合推进 CFLAG:306',
  },
  {
    desc: 'M6005 K19 SELECTCOM 6 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.接吻 = 1; // :1132',
    replace: 'chara(target).kojo.接吻 = 2; // :1132',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 6 首回合推进 CFLAG:307',
  },
  {
    desc: 'M6006 K19 SELECTCOM 7 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.自己扒开 = 1; // :1194',
    replace: 'chara(target).kojo.自己扒开 = 2; // :1194',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 7 首回合推进 CFLAG:308',
  },
  {
    desc: 'M6007 K19 SELECTCOM 8 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.插入手指 = 1; // :1251',
    replace: 'chara(target).kojo.插入手指 = 2; // :1251',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 8 首回合推进 CFLAG:309',
  },
  {
    desc: 'M6008 K19 SELECTCOM 9 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.舔肛 = 1; // :1295',
    replace: 'chara(target).kojo.舔肛 = 2; // :1295',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 9 首回合推进 CFLAG:310',
  },
  {
    desc: 'M6009 K19 SELECTCOM 10 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.振动宝石 = 1; // :1354',
    replace: 'chara(target).kojo.振动宝石 = 2; // :1354',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 10 首回合推进 CFLAG:311',
  },
  {
    desc: 'M6010 K19 SELECTCOM 11 TEQUIP:11=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.壶虫 = 1; // :1418',
    replace: 'chara(target).kojo.壶虫 = 2; // :1418',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 11 TEQUIP:11=1 首回合推进 CFLAG:312',
  },
  {
    desc: 'M6011 K19 SELECTCOM 11 TEQUIP:11=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.壶虫着脱 = 1; // :1469',
    replace: 'chara(target).kojo.壶虫着脱 = 2; // :1469',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 11 TEQUIP:11=0 首回合推进 CFLAG:372',
  },
  {
    desc: 'M6012 K19 SELECTCOM 12 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.振动杖 = 1; // :1490',
    replace: 'chara(target).kojo.振动杖 = 2; // :1490',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 12 首回合推进 CFLAG:313',
  },
  {
    desc: 'M6013 K19 SELECTCOM 13 TEQUIP:13=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛门虫 = 1; // :1548',
    replace: 'chara(target).kojo.肛门虫 = 2; // :1548',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 13 TEQUIP:13=1 首回合推进 CFLAG:314',
  },
  {
    desc: 'M6014 K19 SELECTCOM 13 TEQUIP:13=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛门虫着脱 = 1; // :1631',
    replace: 'chara(target).kojo.肛门虫着脱 = 2; // :1631',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 13 TEQUIP:13=0 首回合推进 CFLAG:374',
  },
  {
    desc: 'M6015 K19 SELECTCOM 14 TEQUIP:14=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.阴蒂夹 = 1; // :1657',
    replace: 'chara(target).kojo.阴蒂夹 = 2; // :1657',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 14 TEQUIP:14=1 首回合推进 CFLAG:315',
  },
  {
    desc: 'M6016 K19 SELECTCOM 14 TEQUIP:14=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.阴蒂夹着脱 = 1; // :1694',
    replace: 'chara(target).kojo.阴蒂夹着脱 = 2; // :1694',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 14 TEQUIP:14=0 首回合推进 CFLAG:375',
  },
  {
    desc: 'M6017 K19 SELECTCOM 15 TEQUIP:15=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.乳头夹 = 1; // :1717',
    replace: 'chara(target).kojo.乳头夹 = 2; // :1717',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 15 TEQUIP:15=1 首回合推进 CFLAG:316',
  },
  {
    desc: 'M6018 K19 SELECTCOM 15 TEQUIP:15=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.乳头夹着脱 = 1; // :1751',
    replace: 'chara(target).kojo.乳头夹着脱 = 2; // :1751',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 15 TEQUIP:15=0 首回合推进 CFLAG:376',
  },
  {
    desc: 'M6019 K19 SELECTCOM 19 TEQUIP:19=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛珠 = 1; // :1775',
    replace: 'chara(target).kojo.肛珠 = 2; // :1775',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 19 TEQUIP:19=1 首回合推进 CFLAG:320',
  },
  {
    desc: 'M6020 K19 SELECTCOM 19 TEQUIP:19=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛珠着脱 = 1; // :1848',
    replace: 'chara(target).kojo.肛珠着脱 = 2; // :1848',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 19 TEQUIP:19=0 首回合推进 CFLAG:379',
  },
  {
    desc: 'M6021 K19 SELECTCOM 20 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.正常位 = 1; // :1902',
    replace: 'chara(target).kojo.正常位 = 2; // :1902',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 20 首回合推进 CFLAG:321',
  },
  {
    desc: 'M6022 K19 SELECTCOM 21 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.背后位 = 1; // :2059',
    replace: 'chara(target).kojo.背后位 = 2; // :2059',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 21 首回合推进 CFLAG:322',
  },
  {
    desc: 'M6023 K19 SELECTCOM 22 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.对面座位 = 1; // :2227',
    replace: 'chara(target).kojo.对面座位 = 2; // :2227',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 22 首回合推进 CFLAG:323',
  },
  {
    desc: 'M6024 K19 SELECTCOM 23 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.背面座位 = 1; // :2369',
    replace: 'chara(target).kojo.背面座位 = 2; // :2369',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 23 首回合推进 CFLAG:324',
  },
  {
    desc: 'M6025 K19 SELECTCOM 26 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.正常位肛交 = 1; // :2516',
    replace: 'chara(target).kojo.正常位肛交 = 2; // :2516',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 26 首回合推进 CFLAG:327',
  },
  {
    desc: 'M6026 K19 SELECTCOM 27 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.背后位肛交 = 1; // :2641',
    replace: 'chara(target).kojo.背后位肛交 = 2; // :2641',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 27 首回合推进 CFLAG:328',
  },
  {
    desc: 'M6027 K19 SELECTCOM 28 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.对面座位肛交 = 1; // :2768',
    replace: 'chara(target).kojo.对面座位肛交 = 2; // :2768',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 28 首回合推进 CFLAG:329',
  },
  {
    desc: 'M6028 K19 SELECTCOM 29 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.骑乘位肛交 = 1; // :2886',
    replace: 'chara(target).kojo.骑乘位肛交 = 2; // :2886',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 29 首回合推进 CFLAG:337',
  },
  {
    desc: 'M6029 K19 SELECTCOM 30 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.手淫 = 1; // :2992',
    replace: 'chara(target).kojo.手淫 = 2; // :2992',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 30 首回合推进 CFLAG:331',
  },
  {
    desc: 'M6030 K19 SELECTCOM 31 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.口交_奴 = 1; // :3083',
    replace: 'chara(target).kojo.口交_奴 = 2; // :3083',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 31 首回合推进 CFLAG:332',
  },
  {
    desc: 'M6031 K19 SELECTCOM 32 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.乳交 = 1; // :3158',
    replace: 'chara(target).kojo.乳交 = 2; // :3158',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 32 首回合推进 CFLAG:333',
  },
  {
    desc: 'M6032 K19 SELECTCOM 33 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.股间性交 = 1; // :3220',
    replace: 'chara(target).kojo.股间性交 = 2; // :3220',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 33 首回合推进 CFLAG:334',
  },
  {
    desc: 'M6033 K19 SELECTCOM 34 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.骑乘位 = 1; // :3312',
    replace: 'chara(target).kojo.骑乘位 = 2; // :3312',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 34 首回合推进 CFLAG:335',
  },
  {
    desc: 'M6034 K19 SELECTCOM 35 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.全身擦洗 = 1; // :3415',
    replace: 'chara(target).kojo.全身擦洗 = 2; // :3415',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 35 首回合推进 CFLAG:336',
  },
  {
    desc: 'M6035 K19 SELECTCOM 36 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.骑乘位肛交 = 1; // :3481',
    replace: 'chara(target).kojo.骑乘位肛交 = 2; // :3481',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 36 首回合推进 CFLAG:337',
  },
  {
    desc: 'M6036 K19 SELECTCOM 37 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛门侍奉 = 1; // :3561',
    replace: 'chara(target).kojo.肛门侍奉 = 2; // :3561',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 37 首回合推进 CFLAG:338',
  },
  {
    desc: 'M6037 K19 SELECTCOM 38 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.足交 = 1; // :3592',
    replace: 'chara(target).kojo.足交 = 2; // :3592',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 38 首回合推进 CFLAG:339',
  },
  {
    desc: 'M6038 K19 SELECTCOM 40 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.打屁股 = 1; // :3736',
    replace: 'chara(target).kojo.打屁股 = 2; // :3736',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 40 首回合推进 CFLAG:341',
  },
  {
    desc: 'M6039 K19 SELECTCOM 41 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.鞭 = 1; // :3794',
    replace: 'chara(target).kojo.鞭 = 2; // :3794',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 41 首回合推进 CFLAG:342',
  },
  {
    desc: 'M6040 K19 SELECTCOM 42 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.针 = 1; // :3853',
    replace: 'chara(target).kojo.针 = 2; // :3853',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 42 首回合推进 CFLAG:343',
  },
  {
    desc: 'M6041 K19 SELECTCOM 43 TEQUIP:43=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.眼罩 = 1; // :3903',
    replace: 'chara(target).kojo.眼罩 = 2; // :3903',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 43 TEQUIP:43=1 首回合推进 CFLAG:344',
  },
  {
    desc: 'M6042 K19 SELECTCOM 43 TEQUIP:43=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.眼罩着脱 = 1; // :3960',
    replace: 'chara(target).kojo.眼罩着脱 = 2; // :3960',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 43 TEQUIP:43=0 首回合推进 CFLAG:380',
  },
  {
    desc: 'M6043 K19 SELECTCOM 44 TEQUIP:44=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.绳子 = 1; // :3985',
    replace: 'chara(target).kojo.绳子 = 2; // :3985',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 44 TEQUIP:44=1 首回合推进 CFLAG:345',
  },
  {
    desc: 'M6044 K19 SELECTCOM 44 TEQUIP:44=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.绳子着脱 = 1; // :4048',
    replace: 'chara(target).kojo.绳子着脱 = 2; // :4048',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 44 TEQUIP:44=0 首回合推进 CFLAG:385',
  },
  {
    desc: 'M6045 K19 SELECTCOM 45 TEQUIP:45=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.口塞 = 1; // :4073',
    replace: 'chara(target).kojo.口塞 = 2; // :4073',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 45 TEQUIP:45=1 首回合推进 CFLAG:346',
  },
  {
    desc: 'M6046 K19 SELECTCOM 45 TEQUIP:45=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.口塞着脱 = 1; // :4138',
    replace: 'chara(target).kojo.口塞着脱 = 2; // :4138',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 45 TEQUIP:45=0 首回合推进 CFLAG:386',
  },
  {
    desc: 'M6047 K19 SELECTCOM 46 TEQUIP:46=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.灌肠肛塞 = 1; // :4160',
    replace: 'chara(target).kojo.灌肠肛塞 = 2; // :4160',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 46 TEQUIP:46=1 首回合推进 CFLAG:347',
  },
  {
    desc: 'M6048 K19 SELECTCOM 55 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.放置PLAY = 1; // :4260',
    replace: 'chara(target).kojo.放置PLAY = 2; // :4260',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 55 首回合推进 CFLAG:356',
  },
  {
    desc: 'M6049 K19 SELECTCOM 56 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.交谈 = 1; // :4396',
    replace: 'chara(target).kojo.交谈 = 2; // :4396',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 56 首回合推进 CFLAG:357',
  },
  {
    desc: 'M6050 K19 SELECTCOM 125 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.口交时自慰 = 1; // :4550',
    replace: 'chara(target).kojo.口交时自慰 = 2; // :4550',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 125 首回合推进 CFLAG:361',
  },
  {
    desc: 'M6051 K19 SELECTCOM 126 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.手搓口交 = 1; // :4604',
    replace: 'chara(target).kojo.手搓口交 = 2; // :4604',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 126 首回合推进 CFLAG:362',
  },
  {
    desc: 'M6052 K19 SELECTCOM 127 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.真空口交 = 1; // :4659',
    replace: 'chara(target).kojo.真空口交 = 2; // :4659',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 127 首回合推进 CFLAG:363',
  },
  {
    desc: 'M6053 K19 SELECTCOM 69 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.六九式 = 1; // :4711',
    replace: 'chara(target).kojo.六九式 = 2; // :4711',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 69 首回合推进 CFLAG:364',
  },
  {
    desc: 'M6054 K19 SELECTCOM 124 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.深喉 = 1; // :4770',
    replace: 'chara(target).kojo.深喉 = 2; // :4770',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 124 首回合推进 CFLAG:365',
  },
  {
    desc: 'M6055 K19 SELECTCOM 80 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.强制口交 = 1; // :4822',
    replace: 'chara(target).kojo.强制口交 = 2; // :4822',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 80 首回合推进 CFLAG:381',
  },
  {
    desc: 'M6056 K19 头部助手调教守卫删松（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'if (era_flag.assi > 0 && era_flag.assiplay) {\n    // :753-754',
    replace:
      'if (false && era_flag.assi > 0 && era_flag.assiplay) {\n    // :753-754',
    tests: ['kojo-k19-fia'],
    must_mention: '助手调教守卫无输出',
  },
  {
    desc: 'M6057 K19 头部口塞守卫删松（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {\n    // :756-757',
    replace:
      'if (false && era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {\n    // :756-757',
    tests: ['kojo-k19-fia'],
    must_mention: '口塞守卫无输出',
  },
  {
    desc: 'M6058 K19 头部失神守卫删松（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'if (game.train.失神) {\n    // :759-760',
    replace: 'if (false && game.train.失神) {\n    // :759-760',
    tests: ['kojo-k19-fia'],
    must_mention: '失神守卫无输出',
  },
  {
    desc: 'M6059 K19 头部兽奸守卫删松（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'if (era.get(`tequip:${target}:89`)) {\n    // :762-763',
    replace: 'if (false && era.get(`tequip:${target}:89`)) {\n    // :762-763',
    tests: ['kojo-k19-fia'],
    must_mention: '兽奸守卫无输出',
  },
  {
    desc: 'M6060 K19 头部触手守卫删松（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'if (era.get(`tequip:${target}:90`)) {\n    // :765-766',
    replace: 'if (false && era.get(`tequip:${target}:90`)) {\n    // :765-766',
    tests: ['kojo-k19-fia'],
    must_mention: '触手守卫无输出',
  },
  {
    desc: 'M6061 K19 头部死斗场守卫删松（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'if (era.get(`tequip:${target}:55`)) {\n    // :767',
    replace: 'if (false && era.get(`tequip:${target}:55`)) {\n    // :767',
    tests: ['kojo-k19-fia'],
    must_mention: '死斗场守卫转入专用口上',
  },
  {
    desc: 'M6062 K19 头部崩坏守卫删松（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'if (era.get(`talent:${target}:9`) == 1) {\n    // :772-773',
    replace:
      'if (false && era.get(`talent:${target}:9`) == 1) {\n    // :772-773',
    tests: ['kojo-k19-fia'],
    must_mention: '崩坏守卫无输出',
  },
  {
    desc: 'M6063 K19 PALAMCNG 首次润滑状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.首次润滑Lv2 = 1; // :4958',
    replace: 'chara(target).kojo.首次润滑Lv2 = 2; // :4958',
    tests: ['kojo-k19-fia'],
    must_mention: '首次润滑推进',
  },
  {
    desc: 'M6064 K19 PALAMCNG 首次C绝顶状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.首次C绝顶 = 1; // :5043',
    replace: 'chara(target).kojo.首次C绝顶 = 2; // :5043',
    tests: ['kojo-k19-fia'],
    must_mention: '首次C绝顶推进',
  },
  {
    desc: 'M6065 K19 PALAMCNG 首次V绝顶状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.首次V绝顶 = 1; // :5087',
    replace: 'chara(target).kojo.首次V绝顶 = 2; // :5087',
    tests: ['kojo-k19-fia'],
    must_mention: '首次V绝顶推进',
  },
  {
    desc: 'M6066 K19 PALAMCNG 首次A绝顶状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.首次A绝顶 = 1; // :5129',
    replace: 'chara(target).kojo.首次A绝顶 = 2; // :5129',
    tests: ['kojo-k19-fia'],
    must_mention: '首次A绝顶推进',
  },
  {
    desc: 'M6067 K19 PALAMCNG 首次B绝顶状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.首次B绝顶 = 1; // :5171',
    replace: 'chara(target).kojo.首次B绝顶 = 2; // :5171',
    tests: ['kojo-k19-fia'],
    must_mention: '首次B绝顶推进',
  },
  {
    desc: 'M6068 K19 MARKCNG 苦痛刻印首超推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.苦痛刻印Lv3 = 1; // :5233',
    replace: 'chara(target).kojo.苦痛刻印Lv3 = 2; // :5233',
    tests: ['kojo-k19-fia'],
    must_mention: '苦痛刻印首超推进',
  },
  {
    desc: 'M6069 K19 MARKCNG 快乐刻印首超推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.快乐刻印Lv3 = 1; // :5248',
    replace: 'chara(target).kojo.快乐刻印Lv3 = 2; // :5248',
    tests: ['kojo-k19-fia'],
    must_mention: '快乐刻印首超推进',
  },
  {
    desc: 'M6070 K19 MARKCNG 屈服刻印首超推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.屈服刻印Lv3 = 1; // :5263',
    replace: 'chara(target).kojo.屈服刻印Lv3 = 2; // :5263',
    tests: ['kojo-k19-fia'],
    must_mention: '屈服刻印首超推进',
  },
  {
    desc: 'M6071 K19 MARKCNG 反抗刻印首超推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.反抗刻印Lv3 = 1; // :5280',
    replace: 'chara(target).kojo.反抗刻印Lv3 = 2; // :5280',
    tests: ['kojo-k19-fia'],
    must_mention: '反抗刻印首超推进',
  },
  {
    desc: 'M6072 K19 EVENTTRAIN 存在标志置位删除（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'game.kojo.口上存在_19 = 1; // :53',
    replace: '// 变异：K19 存在标志置位删除',
    tests: ['kojo-k19-fia'],
    must_mention: 'K19 存在标志置 1',
  },
  {
    desc: 'M6073 K19 EVENTEND 存在标志清除删除（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'game.kojo.口上存在_19 = 0; // :59',
    replace: '// 变异：K19 存在标志清除删除',
    tests: ['kojo-k19-fia'],
    must_mention: 'K19 存在标志清 0',
  },
  {
    desc: 'M6074 K19 初调教 CFLAG:201 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.初调教 = 1; // :97',
    replace: 'chara(target).kojo.初调教 = 2; // :97（变异）',
    tests: ['kojo-k19-fia'],
    must_mention: '人类初调教推进到 1',
  },
  {
    desc: 'M6075 K19 自己扒开原作缺陷被修正（后续 CFLAG:306 改 308）（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.胸爱抚 = 2; // :1226',
    replace: 'chara(target).kojo.自己扒开 = 2; // :1226（变异：修正原作缺陷）',
    tests: ['kojo-k19-fia'],
    must_mention: '原作缺陷：自己扒开用 308 判首次、二次却推进胸部爱抚 306',
  },
  {
    desc: 'M6076 K19 MUSEUM 无条件 RETURN 被删除（原作缺陷被修正）（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'return 0; // :6370-6372',
    replace: '// 变异：删除原作无条件 RETURN',
    tests: ['kojo-k19-fia'],
    must_mention: '无条件 RETURN 后分派段不可达',
  },
  {
    desc: 'M6077 K19 SELECTCOM 56 外层错改为 123（缺 ENDIF 缺陷漂移）（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'if (era_flag.selectcom == 56) {\n    // :4333',
    replace: 'if (era_flag.selectcom == 123) {\n    // :4333（变异）',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 56 首回合推进 CFLAG:357',
  },
  {
    desc: 'M6078 K19 NTR 再捕获状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.NTR再捕获 = 1; // :6252',
    replace: 'chara(target).kojo.NTR再捕获 = 2; // :6252',
    tests: ['kojo-k19-fia'],
    must_mention: 'NTR 再捕获状态推进',
  },
  {
    desc: 'M6079 K19 NTR P==1 状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.NTR_651 = 1; // :6261',
    replace: 'chara(target).kojo.NTR_651 = 2; // :6261',
    tests: ['kojo-k19-fia'],
    must_mention: 'NTR P==1 状态推进',
  },
];
