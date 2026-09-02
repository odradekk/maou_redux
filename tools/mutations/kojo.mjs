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
    tests: ['main-loop'],
    must_mention: 'KOJO_MESSAGE_COM_0 必须经主启动图注册',
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
    desc: 'M1815 K0 乳头夹二次 B钝感附加句删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      // :1702-1703 B感覚Lv3以上＋B鈍感
      if (b_sense >= 3 && b_insensible) {`,
    replace: `      // :1702-1703 B感覚Lv3以上＋B鈍感
      if (false) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '器具毫不间断的持续为乳头带来快乐',
  },
  {
    desc: 'M1816 K0 乳头夹脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.乳头夹着脱 <= 3 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '乳头夹脱着：淫乱写 CFLAG:376 = 3，门槛是 < 不是 <=',
  },
  {
    desc: 'M1817 K0 榨乳器首次状态推进写错（CFLAG:317 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.榨乳器 = 1; // :1770',
    replace: '      kojo.榨乳器 = 2; // :1770',
    tests: ['kojo-k0-tender'],
    must_mention: '榨乳器首次推进到 1',
  },
  {
    desc: 'M1818 K0 榨乳器二次淫乱门槛错位（CFLAG:317 <= 3 改 <= 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k0-tender'],
    must_mention: '榨乳器开始二次：淫乱 + B钝感附加句',
  },
  {
    desc: 'M1819 K0 榨乳器脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.榨乳器着脱 <= 3 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '榨乳器脱着：淫乱写 CFLAG:377 = 3，门槛是 < 不是 <=',
  },
  {
    desc: 'M1820 K0 肛珠首次状态推进写错（CFLAG:320 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.肛珠 = 1; // :1891',
    replace: '      kojo.肛珠 = 2; // :1891',
    tests: ['kojo-k0-tender'],
    must_mention: '肛珠首次推进到 1',
  },
  {
    desc: 'M1821 K0 肛珠二次淫乱+A感觉门槛错位（CFLAG:320 <= 6 改 <= 5）（#231）',
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
    desc: 'M1822 K0 肛珠二次淫乱+A感觉写回错档（CFLAG:320 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.肛珠 = 7; // :1902',
    replace: '      kojo.肛珠 = 6; // :1902',
    tests: ['kojo-k0-tender'],
    must_mention: '肛珠二次淫乱+A感觉写 7',
  },
  {
    desc: 'M1823 K0 肛珠脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.肛珠着脱 <= 4 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '肛珠脱着：淫乱写 CFLAG:379 = 4，门槛是 < 不是 <=',
  },
  {
    desc: 'M1824 K0 正常位首次状态推进写错（CFLAG:321 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.正常位 = 1; // :2032-2033',
    replace: '      kojo.正常位 = 2; // :2032-2033',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位首次推进到 1',
  },
  {
    desc: 'M1825 K0 正常位二次淫乱+性爱狂门槛错位（CFLAG:321 <= 8 改 <= 7）（#231）',
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
    desc: 'M1826 K0 正常位二次淫乱+性爱狂写回错档（CFLAG:321 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.正常位 = 9; // :2053',
    replace: '        kojo.正常位 = 8; // :2053',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位二次淫乱+性爱狂写 9',
  },
  {
    desc: 'M1827 K0 正常位二次爱慕门槛错位（CFLAG:321 <= 4 改 <= 3）（#231）',
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
    desc: 'M1828 K0 正常位二次爱慕 V钝感小写 printformw 删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `            await era.printAndWait(
              \`但是比起这个\${target_name}更为被\${player_name}所抱住的这一事实而心动不已………\`,
            ); // :2147`,
    replace: `            // deleted lowercase printformw :2147`,
    tests: ['kojo-k0-tender'],
    must_mention: '但是比起这个琼更为被你所抱住的这一事实而心动不已',
  },
  {
    desc: 'M1829 K0 正常位二次屈服Lv3+V感觉写回错档（CFLAG:321 = 4 改 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.正常位 = 4; // :2191',
    replace: '        kojo.正常位 = 3; // :2191',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位二次屈服Lv3+V感觉：自称首字插值，推进到 4',
  },
  {
    desc: 'M1830 K0 背后位首次状态推进写错（CFLAG:322 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.背后位 = 1; // :2277-2278',
    replace: '      kojo.背后位 = 2; // :2277-2278',
    tests: ['kojo-k0-tender'],
    must_mention: '背后位首次推进到 1',
  },
  {
    desc: 'M1831 K0 背后位二次淫乱+性爱狂门槛改回 CFLAG:322（原文读 321）（#231）',
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
    desc: 'M1832 K0 背后位二次淫乱+性爱狂写回错档（CFLAG:322 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.背后位 = 9; // :2295',
    replace: '        kojo.背后位 = 8; // :2295',
    tests: ['kojo-k0-tender'],
    must_mention: '背后位二次淫乱+性爱狂写 9',
  },
  {
    desc: 'M1833 K0 背后位二次爱慕门槛错位（CFLAG:322 <= 4 改 <= 3）（#231）',
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
    desc: 'M1834 K0 对面座位首次状态推进写错（CFLAG:323 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.对面座位 = 1; // :2457-2458',
    replace: '      kojo.对面座位 = 2; // :2457-2458',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位首次推进到 1',
  },
  {
    desc: 'M1835 K0 对面座位二次淫乱+性爱狂门槛改回 CFLAG:323（原文读 321）（#231）',
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
    desc: 'M1836 K0 对面座位二次淫乱+性爱狂写回错档（CFLAG:323 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.对面座位 = 9; // :2476',
    replace: '        kojo.对面座位 = 8; // :2476',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位二次淫乱+性爱狂写 9',
  },
  {
    desc: 'M1837 K0 对面座位二次淫乱黑心插值改成白心（heart_black→heart）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '            `「呀～啊啊啊～…咕～…好紧～${heart_black(3)}」`,',
    replace: '            `「呀～啊啊啊～…咕～…好紧～${heart(3)}」`,',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位二次淫乱：黑心插值 / 门槛读 CFLAG:321',
  },
  {
    desc: 'M1838 K0 背面座位首次状态推进写错（CFLAG:324 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.背面座位 = 1; // :2627-2628',
    replace: '      kojo.背面座位 = 2; // :2627-2628',
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位首次推进到 1',
  },
  {
    desc: 'M1839 K0 背面座位二次淫乱+性爱狂门槛改回 CFLAG:324（原文读 321）（#231）',
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
    desc: 'M1840 K0 背面座位二次淫乱+性爱狂写回错档（CFLAG:324 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.背面座位 = 9; // :2646',
    replace: '        kojo.背面座位 = 8; // :2646',
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位二次淫乱+性爱狂写 9',
  },
  {
    desc: 'M1841 K0 背面座位首次淫乱黑心插值改成白心（heart_black→heart）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '            `「呀啊～…啊～…啊啊～…主人…请更多的…更多的欺负我吧…${heart_black(3)}」`,',
    replace:
      '            `「呀啊～…啊～…啊啊～…主人…请更多的…更多的欺负我吧…${heart(3)}」`,',
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位首次非处女：淫乱 + 黑心插值',
  },
  {
    desc: 'M1842 K0 正常位肛交首次状态推进写错（CFLAG:327 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.正常位肛交 = 1; // :2786-2787',
    replace: '      kojo.正常位肛交 = 2; // :2786-2787',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位肛交首次推进到 1',
  },
  {
    desc: 'M1843 K0 正常位肛交二次淫乱+A感觉门槛错位（CFLAG:327 <= 6 改 <= 5）（#231）',
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
    desc: 'M1844 K0 正常位肛交二次淫乱+A感觉写回错档（CFLAG:327 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.正常位肛交 = 7; // :2805',
    replace: '        kojo.正常位肛交 = 6; // :2805',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位肛交二次淫乱+A感觉写 7',
  },
  {
    desc: 'M1845 K0 背后位肛交首次状态推进写错（CFLAG:328 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.背后位肛交 = 1; // :2884-2885',
    replace: '      kojo.背后位肛交 = 2; // :2884-2885',
    tests: ['kojo-k0-tender'],
    must_mention: '背后位肛门首次推进到 1',
  },
  {
    desc: 'M1846 K0 背后位肛交二次淫乱+A感觉门槛错位（CFLAG:328 <= 6 改 <= 5）（#231）',
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
    desc: 'M1847 K0 背后位肛交二次淫乱+A感觉写回错档（CFLAG:328 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.背后位肛交 = 7; // :2909',
    replace: '        kojo.背后位肛交 = 6; // :2909',
    tests: ['kojo-k0-tender'],
    must_mention: '背后位肛门二次淫乱+A感觉写 7',
  },
  {
    desc: 'M1848 K0 对面座位肛交首次状态推进写错（CFLAG:329 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.对面座位肛交 = 1; // :2995-2996',
    replace: '      kojo.对面座位肛交 = 2; // :2995-2996',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位肛交首次推进到 1',
  },
  {
    desc: 'M1849 K0 对面座位肛交二次淫乱+A感觉门槛错位（CFLAG:329 <= 6 改 <= 5）（#231）',
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
    desc: 'M1850 K0 对面座位肛交二次淫乱+A感觉写回错档（CFLAG:329 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.对面座位肛交 = 7; // :3023',
    replace: '        kojo.对面座位肛交 = 6; // :3023',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位肛交二次淫乱+A感觉写 7',
  },
  {
    desc: 'M1851 K0 背面座位肛交首次状态推进写错（CFLAG:330 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.背面座位肛交 = 1; // :3106-3107',
    replace: '      kojo.背面座位肛交 = 2; // :3106-3107',
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位肛交首次推进到 1',
  },
  {
    desc: 'M1852 K0 背面座位肛交二次淫乱+A感觉门槛错位（CFLAG:330 <= 6 改 <= 5）（#231）',
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
    desc: 'M1853 K0 背面座位肛交二次淫乱+A感觉写回错档（CFLAG:330 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.背面座位肛交 = 7; // :3131',
    replace: '        kojo.背面座位肛交 = 6; // :3131',
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位肛交二次淫乱+A感觉写 7',
  },
  {
    desc: 'M1854 K0 手淫首次状态推进写错（CFLAG:331 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.手淫 = 1; // :3210-3211',
    replace: '      kojo.手淫 = 2; // :3210-3211',
    tests: ['kojo-k0-tender'],
    must_mention: '手淫首次推进到 1',
  },
  {
    desc: 'M1855 K0 手淫二次淫乱+侍奉门槛错位（CFLAG:331 <= 5 改 <= 4）（#231）',
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
    desc: 'M1856 K0 手淫二次淫乱+侍奉写回错档（CFLAG:331 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.手淫 = 6; // :3241',
    replace: '        kojo.手淫 = 5; // :3241',
    tests: ['kojo-k0-tender'],
    must_mention: '手淫二次淫乱+侍奉写 6',
  },
  {
    desc: 'M1857 K0 手淫二次阴茎形状读 TARGET 而非 PLAYER（#231）',
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
    desc: 'M1858 K0 口交首次状态推进写错（CFLAG:332 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.口交_奴 = 1; // :3309-3310',
    replace: '      kojo.口交_奴 = 2; // :3309-3310',
    tests: ['kojo-k0-tender'],
    must_mention: '口交首次推进到 1',
  },
  {
    desc: 'M1859 K0 口交二次淫乱+侍奉门槛错位（CFLAG:332 <= 3 改 <= 2）（#231）',
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
    desc: 'M1860 K0 口交二次淫乱+侍奉写回错档（CFLAG:332 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.口交_奴 = 6; // :3333',
    replace: '        kojo.口交_奴 = 5; // :3333',
    tests: ['kojo-k0-tender'],
    must_mention: '口交二次淫乱+侍奉写 6',
  },
  {
    desc: 'M1861 K0 口交二次阴茎形状读 TARGET 而非 PLAYER（#231）',
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
    desc: 'M1862 K0 乳交首次状态推进写错（CFLAG:333 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.乳交 = 1; // :3397-3398',
    replace: '      kojo.乳交 = 2; // :3397-3398',
    tests: ['kojo-k0-tender'],
    must_mention: '乳交首次推进到 1',
  },
  {
    desc: 'M1863 K0 乳交二次淫乱+侍奉门槛读回本档（CFLAG:332 改 CFLAG:333）（#231）',
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
    desc: 'M1864 K0 乳交二次淫乱+侍奉门槛错位（CFLAG:332 <= 5 改 <= 4）（#231）',
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
    desc: 'M1865 K0 乳交二次淫乱+侍奉写回错档（CFLAG:333 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.乳交 = 6; // :3416',
    replace: '        kojo.乳交 = 5; // :3416',
    tests: ['kojo-k0-tender'],
    must_mention: '乳交二次淫乱+侍奉写 6',
  },
  {
    desc: 'M1866 K0 股间性交首次状态推进写错（CFLAG:334 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.股间性交 = 1; // :3474-3475',
    replace: '      kojo.股间性交 = 2; // :3474-3475',
    tests: ['kojo-k0-tender'],
    must_mention: '股间性交首次推进到 1',
  },
  {
    desc: 'M1867 K0 股间性交二次淫乱+处女门槛错位（CFLAG:334 <= 5 改 <= 4）（#231）',
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
    desc: 'M1868 K0 股间性交二次淫乱+处女写回错档（CFLAG:334 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.股间性交 = 6; // :3482',
    replace: '        kojo.股间性交 = 5; // :3482',
    tests: ['kojo-k0-tender'],
    must_mention: '股间性交二次淫乱+处女写 6',
  },
  {
    desc: 'M1869 K0 股间性交二次丢掉处女条件（TALENT:0）（#231）',
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
    desc: 'M1870 K0 骑乘位首次状态推进写错（CFLAG:335 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.骑乘位 = 1; // :3582-3583',
    replace: '      kojo.骑乘位 = 2; // :3582-3583',
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位首次推进到 1',
  },
  {
    desc: 'M1871 K0 骑乘位二次淫乱+性爱狂门槛读回本档（CFLAG:321 改 CFLAG:335）（#231）',
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
    desc: 'M1872 K0 骑乘位二次淫乱+性爱狂门槛错位（CFLAG:321 <= 8 改 <= 7）（#231）',
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
    desc: 'M1873 K0 骑乘位二次淫乱+性爱狂写回错档（CFLAG:335 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.骑乘位 = 9; // :3609',
    replace: '        kojo.骑乘位 = 8; // :3609',
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位二次淫乱+性爱狂写 9',
  },
  {
    desc: 'M1874 K0 全身擦洗首次状态推进写错（CFLAG:336 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.全身擦洗 = 1; // :3810-3811',
    replace: '      kojo.全身擦洗 = 2; // :3810-3811',
    tests: ['kojo-k0-tender'],
    must_mention: '全身擦洗首次推进到 1',
  },
  {
    desc: 'M1875 K0 全身擦洗二次淫乱+侍奉门槛错位（CFLAG:336 <= 4 改 <= 3）（#231）',
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
    desc: 'M1876 K0 全身擦洗二次淫乱+侍奉写回错档（CFLAG:336 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.全身擦洗 = 5; // :3818',
    replace: '        kojo.全身擦洗 = 4; // :3818',
    tests: ['kojo-k0-tender'],
    must_mention: '全身擦洗二次淫乱+侍奉写 5',
  },
  {
    desc: 'M1877 K0 骑乘位肛交首次状态推进写错（CFLAG:337 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.骑乘位肛交 = 1; // :3865-3866',
    replace: '      kojo.骑乘位肛交 = 2; // :3865-3866',
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位肛交首次推进到 1',
  },
  {
    desc: 'M1878 K0 骑乘位肛交二次淫乱+A感觉门槛错位（CFLAG:337 <= 6 改 <= 5）（#231）',
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
    desc: 'M1879 K0 骑乘位肛交二次淫乱+A感觉写回错档（CFLAG:337 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.骑乘位肛交 = 7; // :3888',
    replace: '        kojo.骑乘位肛交 = 6; // :3888',
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位肛交二次淫乱+A感觉写 7',
  },
  {
    desc: 'M1880 K0 肛门侍奉首次状态推进写错（CFLAG:338 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.肛门侍奉 = 1; // :3972-3973',
    replace: '      kojo.肛门侍奉 = 2; // :3972-3973',
    tests: ['kojo-k0-tender'],
    must_mention: '肛门侍奉首次推进到 1',
  },
  {
    desc: 'M1881 K0 肛门侍奉二次淫乱+侍奉门槛错位（CFLAG:338 <= 4 改 <= 3）（#231）',
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
    desc: 'M1882 K0 肛门侍奉二次淫乱+侍奉写回错档（CFLAG:338 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.肛门侍奉 = 5; // :3980',
    replace: '        kojo.肛门侍奉 = 4; // :3980',
    tests: ['kojo-k0-tender'],
    must_mention: '肛门侍奉二次淫乱+侍奉写 5',
  },
  {
    desc: 'M1883 K0 打屁股首次状态推进写错（CFLAG:341 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.打屁股 = 1; // :4010-4011',
    replace: '      kojo.打屁股 = 2; // :4010-4011',
    tests: ['kojo-k0-tender'],
    must_mention: '打屁股首次推进到 1',
  },
  {
    desc: 'M1884 K0 打屁股二次淫乱+抖M门槛错位（CFLAG:341 <= 4 改 <= 3）（#231）',
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
    desc: 'M1885 K0 打屁股二次淫乱+抖M写回错档（CFLAG:341 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.打屁股 = 5; // :4018',
    replace: '        kojo.打屁股 = 4; // :4018',
    tests: ['kojo-k0-tender'],
    must_mention: '打屁股二次淫乱+抖M写 5',
  },
  {
    desc: 'M1886 K0 打屁股二次末支 AND 改成 OR（FLAG:7==2 闸失效）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {',
    replace: '      } else if (kojo.打屁股 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k0-tender'],
    must_mention: '打屁股二次：淫乱+抖M写 5 / 末支须 FLAG:7==2 / 阈值闸',
  },
  {
    desc: 'M1887 K0 鞭首次状态推进写错（CFLAG:342 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.鞭 = 1; // :4055-4056',
    replace: '      kojo.鞭 = 2; // :4055-4056',
    tests: ['kojo-k0-tender'],
    must_mention: '鞭首次推进到 1',
  },
  {
    desc: 'M1888 K0 鞭二次淫乱+抖M门槛错位（CFLAG:342 <= 8 改 <= 7）（#231）',
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
    desc: 'M1889 K0 鞭二次淫乱+抖M写回错档（CFLAG:342 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.鞭 = 9; // :4064',
    replace: '        kojo.鞭 = 8; // :4064',
    tests: ['kojo-k0-tender'],
    must_mention: '鞭二次淫乱+抖M写 9',
  },
  {
    desc: 'M1890 K0 鞭二次末支门槛改回自己的 CFLAG:342（应读 CFLAG:335）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {\n        // :4098',
    replace:
      '      } else if (kojo.鞭 <= 1 || game.kojo.口上开关 === 2) {\n        // :4098',
    tests: ['kojo-k0-tender'],
    must_mention: '鞭二次：淫乱+抖M写 9 / 末支读 CFLAG:335 / 阈值闸',
  },
  {
    desc: 'M1891 K0 针首次状态推进写错（CFLAG:343 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.针 = 1; // :4123-4124',
    replace: '      kojo.针 = 2; // :4123-4124',
    tests: ['kojo-k0-tender'],
    must_mention: '针首次推进到 1',
  },
  {
    desc: 'M1892 K0 针二次淫乱+抖M门槛错位（CFLAG:343 <= 8 改 <= 7）（#231）',
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
    desc: 'M1893 K0 针二次淫乱+抖M写回错档（CFLAG:343 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.针 = 9; // :4131',
    replace: '        kojo.针 = 8; // :4131',
    tests: ['kojo-k0-tender'],
    must_mention: '针二次淫乱+抖M写 9',
  },
  {
    desc: 'M1894 K0 眼罩开始首次状态推进写错（CFLAG:344 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.眼罩 = 1; // :4186-4187',
    replace: '      kojo.眼罩 = 2; // :4186-4187',
    tests: ['kojo-k0-tender'],
    must_mention: '眼罩首次推进到 1',
  },
  {
    desc: 'M1895 K0 眼罩开始二次爱慕+抖M门槛错位（CFLAG:344 <= 5 改 <= 4）（#231）',
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
    desc: 'M1896 K0 眼罩开始二次爱慕+抖M写回错档（CFLAG:344 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.眼罩 = 6; // :4193',
    replace: '        kojo.眼罩 = 5; // :4193',
    tests: ['kojo-k0-tender'],
    must_mention: '眼罩开始二次爱慕+抖M写 6',
  },
  {
    desc: 'M1897 K0 眼罩脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (kojo.眼罩着脱 < 2 || game.kojo.口上开关 === 2)',
    replace: '      (kojo.眼罩着脱 <= 2 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '眼罩脱着：爱慕写 CFLAG:380 = 2，门槛是 < 不是 <=',
  },
  {
    desc: 'M1898 K0 绳子开始首次状态推进写错（CFLAG:345 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.绳子 = 1; // :4248-4249',
    replace: '      kojo.绳子 = 2; // :4248-4249',
    tests: ['kojo-k0-tender'],
    must_mention: '绳子首次推进到 1',
  },
  {
    desc: 'M1899 K0 绳子开始二次淫乱+抖M门槛错位（CFLAG:345 <= 8 改 <= 7）（#231）',
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
    desc: 'M1900 K0 绳子开始二次淫乱+抖M写回错档（CFLAG:345 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.绳子 = 9; // :4257',
    replace: '        kojo.绳子 = 8; // :4257',
    tests: ['kojo-k0-tender'],
    must_mention: '绳子开始二次淫乱+抖M写 9',
  },
  {
    desc: 'M1901 K0 绳子脱着门槛改成 <=（原文是 <）（#231）',
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
    desc: 'M1902 K0 口塞开始首次状态推进写错（CFLAG:346 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.口塞 = 1; // :4331-4332',
    replace: '      kojo.口塞 = 2; // :4331-4332',
    tests: ['kojo-k0-tender'],
    must_mention: '口塞首次推进到 1',
  },
  {
    desc: 'M1903 K0 口塞开始二次爱慕+抖M门槛错位（CFLAG:346 <= 5 改 <= 4）（#231）',
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
    desc: 'M1904 K0 口塞开始二次爱慕+抖M写回错档（CFLAG:346 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.口塞 = 6; // :4338',
    replace: '        kojo.口塞 = 5; // :4338',
    tests: ['kojo-k0-tender'],
    must_mention: '口塞开始二次爱慕+抖M写 6',
  },
  {
    desc: 'M1905 K0 口塞脱着门槛改成 <=（原文是 <）（#231）',
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
    desc: 'M1906 K0 灌肠肛塞开始首次状态推进写错（CFLAG:347 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.灌肠肛塞 = 1; // :4389-4390',
    replace: '      kojo.灌肠肛塞 = 2; // :4389-4390',
    tests: ['kojo-k0-tender'],
    must_mention: '灌肠肛塞首次推进到 1',
  },
  {
    desc: 'M1907 K0 灌肠肛塞开始二次淫乱+A感觉+抖M门槛错位（CFLAG:347 <= 6 改 <= 5）（#231）',
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
    desc: 'M1908 K0 灌肠肛塞开始二次淫乱+A感觉+抖M写回错档（CFLAG:347 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.灌肠肛塞 = 7; // :4398',
    replace: '        kojo.灌肠肛塞 = 6; // :4398',
    tests: ['kojo-k0-tender'],
    must_mention: '灌肠肛塞开始二次淫乱+A感觉+抖M写 7',
  },
  {
    desc: 'M1909 K0 灌肠肛塞脱着 RAND:2 首支旁路失效（=== 0 改 === 1）（#231）',
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
    desc: 'M1910 K0 灌肠肛塞脱着壶虫守卫删除（TEQUIP:11 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        if (era.get(\`tequip:\${target}:11\`)) {
          // :4446`,
    replace: `        if (false) {
          // :4446`,
    tests: ['kojo-k0-tender'],
    must_mention: '壶虫',
  },
  {
    desc: 'M1911 K0 灌肠肛塞脱着空 PRINTFORMW 等待被删（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "        await era.printAndWait(''); // :4468-4469",
    replace: '        // :4468-4469 空等待被删',
    tests: ['kojo-k0-tender'],
    must_mention: '空 PRINTFORMW 仍等待',
  },
  {
    desc: 'M1912 K0 放置PLAY首次状态推进写错（CFLAG:356 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.放置PLAY = 1; // :4566-4567',
    replace: '      kojo.放置PLAY = 2; // :4566-4567',
    tests: ['kojo-k0-tender'],
    must_mention: '放置PLAY首次推进到 1',
  },
  {
    desc: 'M1913 K0 放置PLAY二次淫乱+欲情门槛错位（CFLAG:356 <= 5 改 <= 4）（#231）',
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
    desc: 'M1914 K0 放置PLAY二次淫乱+欲情写回错档（CFLAG:356 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.放置PLAY = 6; // :4577',
    replace: '        kojo.放置PLAY = 5; // :4577',
    tests: ['kojo-k0-tender'],
    must_mention: '放置PLAY二次淫乱+欲情写 6',
  },
  {
    desc: 'M1915 K0 放置PLAY二次欲情门槛改成 PALAMLV[4]（原文是 PALAMLV[3]）（#231）',
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
    desc: 'M1916 K0 放置PLAY首次壶虫 SIF 守卫删除（TEQUIP:11 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      if (era.get(\`tequip:\${target}:11\`)) {
        // :4531-4532`,
    replace: `      if (false) {
        // :4531-4532`,
    tests: ['kojo-k0-tender'],
    must_mention: '首次装备 SIF：壶虫',
  },
  {
    desc: 'M1917 K0 放置PLAY二次 PRINTL 空行被删（耗尽档应仍输出）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "      era.print(''); // :4599",
    replace: '      // :4599 PRINTL 被删',
    tests: ['kojo-k0-tender'],
    must_mention: '放置PLAY二次：淫乱+欲情写 6 / 阈值闸',
  },
  {
    desc: 'M1918 K0 交谈首次状态推进写错（CFLAG:357 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.交谈 = 1; // :4697-4698',
    replace: '      kojo.交谈 = 2; // :4697-4698',
    tests: ['kojo-k0-tender'],
    must_mention: '交谈首次推进到 1',
  },
  {
    desc: 'M1919 K0 交谈录像自白 TFLAG:32 按位或改成赋值（|= 2 改 = 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '          game.kojo.录像内容 |= 2; // :4657',
    replace: '          game.kojo.录像内容 = 2; // :4657',
    tests: ['kojo-k0-tender'],
    must_mention: '录像自白 TFLAG:32 |= 2',
  },
  {
    desc: 'M1920 K0 交谈二次录像沉默支仍写 TFLAG:32（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `          await era.printAndWait(\`但\${target_name}把头转向一边什么话也不说。\`); // :4723-4724`,
    replace: `          await era.printAndWait(\`但\${target_name}把头转向一边什么话也不说。\`); // :4723-4724
          game.kojo.录像内容 |= 2;`,
    tests: ['kojo-k0-tender'],
    must_mention: '沉默支不写 TFLAG:32',
  },
  {
    desc: 'M1921 K0 交谈二次插着不拔门面改成 tflag:59（原文是 TFLAG:60）（#231）',
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
    desc: 'M1922 K0 交谈首次录像自白 RAND:3 旁路失效（=== 0 改 === 1）（#231）',
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
    desc: 'M1923 K0 乳夹口交首次状态推进写错（CFLAG:360 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.乳夹口交 = 1; // :4797-4798',
    replace: '      kojo.乳夹口交 = 2; // :4797-4798',
    tests: ['kojo-k0-tender'],
    must_mention: '乳夹口交首次推进到 1',
  },
  {
    desc: 'M1924 K0 乳夹口交二次淫乱写回错档（CFLAG:360 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.乳夹口交 = 5; // :4809',
    replace: '        kojo.乳夹口交 = 4; // :4809',
    tests: ['kojo-k0-tender'],
    must_mention: '乳夹口交二次淫乱写 5',
  },
  {
    desc: 'M1925 K0 乳夹口交二次淫乱门槛错位（CFLAG:360 <= 4 改 <= 3）（#231）',
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
    desc: 'M1926 K0 乳夹口交首次巨乳 SIF 守卫删除（TALENT:110 改恒 false）（#231）',
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
    desc: 'M1927 K0 口交时自慰首次状态推进写错（CFLAG:361 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.口交时自慰 = 1; // :4862-4863',
    replace: '      kojo.口交时自慰 = 2; // :4862-4863',
    tests: ['kojo-k0-tender'],
    must_mention: '口交时自慰首次推进到 1',
  },
  {
    desc: 'M1928 K0 口交时自慰二次淫乱写回错档（CFLAG:361 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.口交时自慰 = 5; // :4873',
    replace: '        kojo.口交时自慰 = 4; // :4873',
    tests: ['kojo-k0-tender'],
    must_mention: '口交时自慰二次淫乱写 5',
  },
  {
    desc: 'M1929 K0 口交时自慰二次淫乱门槛错位（CFLAG:361 <= 4 改 <= 3）（#231）',
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
    desc: 'M1930 K0 手搓口交首次状态推进写错（CFLAG:362 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.手搓口交 = 1; // :4922-4923',
    replace: '      kojo.手搓口交 = 2; // :4922-4923',
    tests: ['kojo-k0-tender'],
    must_mention: '手搓口交首次推进到 1',
  },
  {
    desc: 'M1931 K0 手搓口交二次淫乱写回错档（CFLAG:362 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.手搓口交 = 5; // :4933',
    replace: '        kojo.手搓口交 = 4; // :4933',
    tests: ['kojo-k0-tender'],
    must_mention: '手搓口交二次淫乱写 5',
  },
  {
    desc: 'M1932 K0 手搓口交二次淫乱门槛错位（CFLAG:362 <= 4 改 <= 3）（#231）',
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
    desc: 'M1933 K0 真空口交首次状态推进写错（CFLAG:363 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.真空口交 = 1; // :4983-4984',
    replace: '      kojo.真空口交 = 2; // :4983-4984',
    tests: ['kojo-k0-tender'],
    must_mention: '真空口交首次推进到 1',
  },
  {
    desc: 'M1934 K0 真空口交二次淫乱写回错档（CFLAG:363 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.真空口交 = 5; // :4994',
    replace: '        kojo.真空口交 = 4; // :4994',
    tests: ['kojo-k0-tender'],
    must_mention: '真空口交二次淫乱写 5',
  },
  {
    desc: 'M1935 K0 真空口交二次淫乱门槛错位（CFLAG:363 <= 4 改 <= 3）（#231）',
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
    desc: 'M1936 K0 六九式首次状态推进写错（CFLAG:364 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.六九式 = 1; // :5043-5044',
    replace: '      kojo.六九式 = 2; // :5043-5044',
    tests: ['kojo-k0-tender'],
    must_mention: '六九式首次推进到 1',
  },
  {
    desc: 'M1937 K0 六九式二次淫乱写回错档（CFLAG:364 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.六九式 = 5; // :5053',
    replace: '        kojo.六九式 = 4; // :5053',
    tests: ['kojo-k0-tender'],
    must_mention: '六九式二次淫乱写 5',
  },
  {
    desc: 'M1938 K0 六九式二次淫乱门槛错位（CFLAG:364 <= 4 改 <= 3）（#231）',
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
    desc: 'M1939 K0 深喉首次状态推进写错（CFLAG:365 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.深喉 = 1; // :5101-5102',
    replace: '      kojo.深喉 = 2; // :5101-5102',
    tests: ['kojo-k0-tender'],
    must_mention: '深喉首次推进到 1',
  },
  {
    desc: 'M1940 K0 深喉二次淫乱写回错档（CFLAG:365 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.深喉 = 5; // :5112',
    replace: '        kojo.深喉 = 4; // :5112',
    tests: ['kojo-k0-tender'],
    must_mention: '深喉二次淫乱写 5',
  },
  {
    desc: 'M1941 K0 深喉二次淫乱门槛改回 CFLAG:365（原文读 363）（#231）',
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
    desc: 'M1942 K0 深喉二次淫乱门槛错位（CFLAG:363 <= 4 改 <= 3）（#231）',
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
    desc: 'M1943 K0 强制口交首次状态推进写错（CFLAG:381 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.强制口交 = 1; // :5159-5160',
    replace: '      kojo.强制口交 = 2; // :5159-5160',
    tests: ['kojo-k0-tender'],
    must_mention: '强制口交首次推进到 1',
  },
  {
    desc: 'M1944 K0 强制口交二次淫乱写回错档（CFLAG:381 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.强制口交 = 5; // :5170',
    replace: '        kojo.强制口交 = 4; // :5170',
    tests: ['kojo-k0-tender'],
    must_mention: '强制口交二次淫乱写 5',
  },
  {
    desc: 'M1945 K0 强制口交二次淫乱门槛错位（CFLAG:381 <= 4 改 <= 3）（#231）',
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
    desc: 'M1946 K0 强制口交二次淫乱黑心插值改成白心（heart_black→heart）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `          \`「嗯～嗯呼唔呜…嗯～…嗯姆呜呜…嗯～\${heart_black(1)}嗯～\${heart_black(1)}嗯～\${heart_black(1)}嗯～\${heart_black(1)}嗯～\${heart_black(1)}」\`,
        ); // :5167`,
    replace: `          \`「嗯～嗯呼唔呜…嗯～…嗯姆呜呜…嗯～\${heart(1)}嗯～\${heart(1)}嗯～\${heart(1)}嗯～\${heart(1)}嗯～\${heart(1)}」\`,
        ); // :5167`,
    tests: ['kojo-k0-tender'],
    must_mention: '强制口交二次：淫乱写 5 / 黑心 / 阈值闸',
  },
  {
    desc: 'M1947 K0 穿环首次状态推进写错（CFLAG:348 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.穿环 = 1; // :5336-5337',
    replace: '      kojo.穿环 = 2; // :5336-5337',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环首次推进到 1',
  },
  {
    desc: 'M1948 K0 穿环二次淫乱写回错档（CFLAG:348 = 4 改 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.穿环 = 4; // :5385',
    replace: '        kojo.穿环 = 3; // :5385',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环二次淫乱写 4',
  },
  {
    desc: 'M1949 K0 穿环二次淫乱门槛错位（CFLAG:348 <= 3 改 <= 2）（#231）',
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
    desc: 'M1950 K0 穿环二次爱慕写回错档（CFLAG:348 = 3 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.穿环 = 3; // :5428',
    replace: '        kojo.穿环 = 2; // :5428',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环二次爱慕写 3',
  },
  {
    desc: 'M1951 K0 穿环二次それ以外写回错档（CFLAG:348 = 2 改 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.穿环 = 2; // :5471',
    replace: '        kojo.穿环 = 1; // :5471',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环二次それ以外写 2',
  },
  {
    desc: 'M1952 K0 穿环首次 CFLAG:7 位图闸改恒真（取下支失效）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        if (train.穿环状态 & p) {
          // :5209`,
    replace: `        if (true) {
          // :5209`,
    tests: ['kojo-k0-tender'],
    must_mention: '穿环首次：淫乱取下（CFLAG:7 无对应位）',
  },
  {
    desc: 'M1953 K0 穿环 阴核(TARGET) 插值恒改成阴茎（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  const clitoris_word = (cid) =>
    (era.get(\`talent:\${cid}:122\`) || 0) !== 0 ? '阴茎' : '阴核';`,
    replace: `  const clitoris_word = (cid) =>
    (era.get(\`talent:\${cid}:122\`) || 0) !== 0 ? '阴茎' : '阴茎';`,
    tests: ['kojo-k0-tender'],
    must_mention: '阴核(TARGET) 插值',
  },
  {
    desc: 'M1954 K0 穿环二次爱慕阴茎支 TALENT:122 错格（改 123）（#231）',
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
    desc: 'M1955 K0 穿环首次乳头位 P==1 改 P==2（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `          if (p === 1) {
            // :5212`,
    replace: `          if (p === 2) {
            // :5212`,
    tests: ['kojo-k0-tender'],
    must_mention: '穿环首次：淫乱 + 乳头位（P=1）装上，推进到 1',
  },
  {
    desc: 'M1956 K0 穿环首次淫乱素质判据错格（TALENT:76 改 77）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      } else if (era.get(\`talent:\${target}:76\`) === 1) {
        // :5207`,
    replace: `      } else if (era.get(\`talent:\${target}:77\`) === 1) {
        // :5207`,
    tests: ['kojo-k0-tender'],
    must_mention: '穿环首次：淫乱 + 乳头位（P=1）装上，推进到 1',
  },
  {
    desc: 'M1957 K0 EVENTTRAIN NORMAL 总开关守卫删松（<= 0 改 < 0）（#231）',
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
    desc: 'M1958 K0 EVENTTRAIN NORMAL 慈爱素质守卫错格（!== 1 改 !== 0）（#231）',
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
    desc: 'M1959 K0 EVENTTRAIN NORMAL 首次精灵状态推进写错（CFLAG:201 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      kojo.初调教 = 1; // :103`,
    replace: `      kojo.初调教 = 2; // :103`,
    tests: ['kojo-k0-tender'],
    must_mention: '首次精灵推进到 1',
  },
  {
    desc: 'M1960 K0 EVENTTRAIN NORMAL 首次魔族不写 CFLAG:370（改 0）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      kojo.初调教 = 1; // :140
      kojo.魔族化 = 1; // :142`,
    replace: `      kojo.初调教 = 1; // :140
      kojo.魔族化 = 0; // :142`,
    tests: ['kojo-k0-tender'],
    must_mention: '首次魔族同时写 CFLAG:370 = 1',
  },
  {
    desc: 'M1961 K0 EVENTTRAIN NORMAL 魔族化二次写 2 改 3（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    kojo.魔族化 = 2; // :172-173`,
    replace: `    kojo.魔族化 = 3; // :172-173`,
    tests: ['kojo-k0-tender'],
    must_mention: '魔族化二次写 2',
  },
  {
    desc: 'M1962 K0 EVENTTRAIN NORMAL 魔族化二次门槛 < 5 改 < 4（#231）',
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
    desc: 'M1963 K0 EVENTTRAIN NORMAL NTR 再捕获不清 650（写 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      kojo.NTR再捕获 = 0; // :185`,
    replace: `      kojo.NTR再捕获 = 1; // :185`,
    tests: ['kojo-k0-tender'],
    must_mention: 'NTR 再捕获爱慕清 650',
  },
  {
    desc: 'M1964 K0 EVENTTRAIN NORMAL NTR 未陷落不清 650（写 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      kojo.NTR再捕获 = 0; // :192`,
    replace: `      kojo.NTR再捕获 = 1; // :192`,
    tests: ['kojo-k0-tender'],
    must_mention: 'NTR 再捕获未陷落清 650',
  },
  {
    desc: 'M1965 K0 EVENTTRAIN NORMAL 屈服 Lv1 写 2 改 3（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    kojo.初调教 = 2; // :203-204`,
    replace: `    kojo.初调教 = 3; // :203-204`,
    tests: ['kojo-k0-tender'],
    must_mention: '屈服 Lv1 写 2',
  },
  {
    desc: 'M1966 K0 EVENTTRAIN NORMAL 淫乱写 5 改 6（#231）',
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
    desc: 'M1968 K0 EVENTTRAIN NORMAL 爱慕写 7 改 8（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    kojo.初调教 = 7; // :290-291`,
    replace: `    kojo.初调教 = 8; // :290-291`,
    tests: ['kojo-k0-tender'],
    must_mention: '爱慕写 7',
  },
  {
    desc: 'M1969 K0 EVENTTRAIN NORMAL 崩坏写 9 改 8（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    kojo.初调教 = 9; // :334-335`,
    replace: `    kojo.初调教 = 8; // :334-335`,
    tests: ['kojo-k0-tender'],
    must_mention: '崩坏写 9',
  },
  {
    desc: 'M1970 K0 二次口上崩坏 FLAG:7==2 改 ==1（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  if (era.get(\`talent:\${target}:9\`) === 1 && game.kojo.口上开关 === 2) {
    // :491`,
    replace: `  if (era.get(\`talent:\${target}:9\`) === 1 && game.kojo.口上开关 === 1) {
    // :491`,
    tests: ['kojo-k0-tender'],
    must_mention: '无助手落入二次口上（崩坏祈祷）',
  },
  {
    desc: 'M1971 K0 二次口上故乡恋人 TALENT:317 == 4 改 5（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    if (chara(target).chara.喜欢的东西 === 4) {
      // :508`,
    replace: `    if (chara(target).chara.喜欢的东西 === 5) {
      // :508`,
    tests: ['kojo-k0-tender'],
    must_mention: '屈服 Lv0 故乡恋人',
  },
  {
    desc: 'M1972 K0 二次口上淫乱 FLAG:7==2 改 ==1（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  } else if (era.get(\`talent:\${target}:76\`) === 1 && game.kojo.口上开关 === 2) {
    era.drawLine(); // :555-556`,
    replace: `  } else if (era.get(\`talent:\${target}:76\`) === 1 && game.kojo.口上开关 === 1) {
    era.drawLine(); // :555-556`,
    tests: ['kojo-k0-tender'],
    must_mention: 'K0 二次口上：FLAG:7==1 静默',
  },
  {
    desc: 'M1973 K0 EVENTTRAIN NORMAL 村娘助手首次写 202 = 1 改 2（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        kojo.简易助手_0 = 1; // :387-388`,
    replace: `        kojo.简易助手_0 = 2; // :387-388`,
    tests: ['kojo-k0-tender'],
    must_mention: '村娘助手首次写 202 = 1',
  },
  {
    desc: 'M1974 K0 EVENTTRAIN NORMAL 村娘助手二次 FLAG:7==2 改 ==1（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      } else if (kojo.简易助手_0 === 1 && game.kojo.口上开关 === 2) {`,
    replace: `      } else if (kojo.简易助手_0 === 1 && game.kojo.口上开关 === 1) {`,
    tests: ['kojo-k0-tender'],
    must_mention: '村娘助手二次 FLAG:7==1 静默',
  },
  {
    desc: 'M1975 K0 EVENTEND NORMAL 死亡守卫 <= 0 改 < 0（#231）',
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
    desc: 'M1976 K0 EVENTEND NORMAL 崩坏 FLAG:7==2 改 ==1（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  if (era.get(\`talent:\${target}:9\`) === 1 && game.kojo.口上开关 === 2) {
    // :615`,
    replace: `  if (era.get(\`talent:\${target}:9\`) === 1 && game.kojo.口上开关 === 1) {
    // :615`,
    tests: ['kojo-k0-tender'],
    must_mention: '崩坏 FLAG:7==2 出声',
  },
  {
    desc: 'M1977 K0 EVENTEND NORMAL 淫乱体力门槛 >= 500 改 > 500（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    era.get(\`talent:\${target}:76\`) === 1 &&
    chara(target).dungeon.体力 >= 500`,
    replace: `    era.get(\`talent:\${target}:76\`) === 1 &&
    chara(target).dungeon.体力 > 500`,
    tests: ['kojo-k0-tender'],
    must_mention: '淫乱体力 500 走 >= 不是 <',
  },
  {
    desc: 'M1978 K0 EVENTEND NORMAL 慈爱素质守卫错格（!== 1 改 !== 0）（#231）',
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
    desc: 'M1979 K0 SELF_KOJO 自慰淫乱档写 4 改 3（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        era.set(\`cflag:\${target}:261\`, 4); // :6854`,
    replace: `        era.set(\`cflag:\${target}:261\`, 3); // :6854`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==1 自慰 Q==0 主人档（淫乱推进 CFLAG:261）',
  },
  {
    desc: 'M1980 K0 SELF_KOJO 自慰 Q==2 野狗支删除（#231）',
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
    desc: 'M1981 K0 SELF_KOJO 百合淫乱档写 5 改 4（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.set(\`cflag:\${target}:262\`, 5); // :6878`,
    replace: `      era.set(\`cflag:\${target}:262\`, 4); // :6878`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==2 百合（淫乱推进 CFLAG:262）',
  },
  {
    desc: 'M1982 K0 SELF_KOJO 口交淫乱档写 3 改 2（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.set(\`cflag:\${target}:263\`, 3); // :6909`,
    replace: `      era.set(\`cflag:\${target}:263\`, 2); // :6909`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==3 口交（淫乱推进 CFLAG:263）',
  },
  {
    desc: 'M1983 K0 SELF_KOJO 性交档写 2 改 1（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.set(\`cflag:\${target}:264\`, 2); // :6943`,
    replace: `      era.set(\`cflag:\${target}:264\`, 1); // :6943`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==4 性交（ABL:2>=4 推进 CFLAG:264）',
  },
  {
    desc: 'M1984 K0 SELF_KOJO 夜间档写 1 改 2（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `      era.set(\`cflag:\${target}:265\`, 1); // :6961`,
    replace: `      era.set(\`cflag:\${target}:265\`, 2); // :6961`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==5 夜间（推进 CFLAG:265）',
  },
  {
    desc: 'M1985 K0 SELF_KOJO 卖出爱慕支素质判据错格（TALENT:85 改 86）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `    if (era.get(\`talent:\${target}:85\`)) {
      // :7196`,
    replace: `    if (era.get(\`talent:\${target}:86\`)) {
      // :7196`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==6 卖出（爱慕支 + 结尾清理 TFLAG:13=0）',
  },
  {
    desc: 'M1986 K0 SELF_KOJO 结尾 TFLAG:13 清理删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  game.train.初吻与自我口上 = 0; // :7207 TFLAG:13 = 0（跨域走门面）`,
    replace: `  // 变异：TFLAG:13 清理删除`,
    tests: ['kojo-k0-tender'],
    must_mention: '结尾清 TFLAG:13',
  },
  {
    desc: 'M1987 K0 SELF_KOJO 总开关守卫删松（FLAG:7 <= 0 改 < 0）（#231）',
    file: 'ere/kojo/kojo-system.js',
    find: `  if ((era.get('flag:7') || 0) <= 0) {
    const { game } = require('#/facade/game');
    game.train.怪物射精或购入金 = 0;`,
    replace: `  if ((era.get('flag:7') || 0) < 0) {
    const { game } = require('#/facade/game');
    game.train.怪物射精或购入金 = 0;`,
    tests: ['kojo-system'],
    must_mention: 'SELF_KOJO：总开关 FLAG:7 <= 0 静默并清 TFLAG:15',
  },
  {
    desc: 'M1988 K0 SELF_KOJO 自慰档读 TFLAG:13 改成 TFLAG:14（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `  if (game.train.初吻与自我口上 === 1) {
    // :6836`,
    replace: `  if (game.train.初吻与自我口上 === 14) {
    // :6836`,
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==1 自慰 Q==0 主人档（淫乱推进 CFLAG:261）',
  },

  {
    desc: 'M1989 K0 PALAMCNG 润滑首超守卫删松（P 阈值改恒 true）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "  let p = (era.get(`palam:${target}:3`) || 0) + chara(target).train.润滑增量; // :6537\n  if (\n    p > (era.get('palamlv:2') || 0) &&\n    (era.get(`cflag:${target}:221`) || 0) === 0\n  ) {",
    replace:
      '  let p = (era.get(`palam:${target}:3`) || 0) + chara(target).train.润滑增量; // :6537\n  if (true) { // 变异：P 阈值删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'PALAMCNG：润滑度首次超过 LV2 触发首次口上并写 CFLAG:221',
  },
  {
    desc: 'M1990 K0 PALAMCNG CFLAG:221 防重删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "  let p = (era.get(`palam:${target}:3`) || 0) + chara(target).train.润滑增量; // :6537\n  if (\n    p > (era.get('palamlv:2') || 0) &&\n    (era.get(`cflag:${target}:221`) || 0) === 0\n  ) {",
    replace:
      "  let p = (era.get(`palam:${target}:3`) || 0) + chara(target).train.润滑增量; // :6537\n  if (p > (era.get('palamlv:2') || 0) && false) { // 变异：防重删松",
    tests: ['kojo-k0-tender'],
    must_mention: 'PALAMCNG：CFLAG:221 已置位时不重复出声',
  },
  {
    desc: 'M1991 K0 PALAMCNG 总开关守卫删松（FLAG:7 <= 0 改 < 0）（#231）',
    file: 'ere/kojo/kojo-system.js',
    find: "async function kojo_message_palamcng(rand) {\n  if ((era.get('flag:7') || 0) <= 0) {",
    replace: "async function kojo_message_palamcng(rand) {\n  if ((era.get('flag:7') || 0) < 0) {",
    tests: ['kojo-k0-tender'],
    must_mention: 'PALAMCNG：总开关 FLAG:7 <= 0 静默',
  },
  {
    desc: 'M1992 K0 PALAMCNG 助手调教守卫删松（ASSI/ASSIPLAY 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (era_flag.assi > 0 && era_flag.assiplay) {\n    // :6510',
    replace: '  if (false) { // 变异：助手守卫删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'PALAMCNG：助手调教跳过',
  },
  {
    desc: 'M1993 K0 MARKCNG 苦痛刻印触发删松（TFLAG:22==3 改恒 true）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (\n    game.system.苦痛刻印变动 === 3 &&\n    (era.get(`cflag:${target}:297`) || 0) === 0\n  ) {',
    replace: '  if (true) { // 变异：触发删松',
    tests: ['kojo-k0-tender'],
    must_mention:
      'MARKCNG：苦痛刻印 Lv3 取得（TFLAG:22 == 3）触发并写 CFLAG:297',
  },
  {
    desc: 'M1994 K0 MARKCNG CFLAG:297 防重删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (\n    game.system.苦痛刻印变动 === 3 &&\n    (era.get(`cflag:${target}:297`) || 0) === 0\n  ) {',
    replace:
      '  if (game.system.苦痛刻印变动 === 3 && false) { // 变异：防重删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'MARKCNG：CFLAG:297 已置位时不重复出声',
  },
  {
    desc: 'M1995 K0 MARKCNG 总开关守卫删松（FLAG:7 <= 0 改 < 0）（#231）',
    file: 'ere/kojo/kojo-system.js',
    find: "async function kojo_message_markcng(rand) {\n  if ((era.get('flag:7') || 0) <= 0) {",
    replace: "async function kojo_message_markcng(rand) {\n  if ((era.get('flag:7') || 0) < 0) {",
    tests: ['kojo-k0-tender'],
    must_mention: 'MARKCNG：总开关 FLAG:7 <= 0 静默',
  },
  {
    desc: 'M1996 K0 MARKCNG 助手调教守卫删松（ASSI/ASSIPLAY 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (era_flag.assi > 0 && era_flag.assiplay) {\n    // :6759',
    replace: '  if (false) { // 变异：助手守卫删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'MARKCNG：助手调教跳过',
  },

  {
    desc: 'M1997 K0 DUNGEON_RYOUZYOKU 处女分支删松（TALENT:0 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  const sc = () => self_call(target); // %SELF_CALL(TARGET)%\n  if (era.get(`talent:${target}:0`) === 1) {',
    replace:
      '  const sc = () => self_call(target); // %SELF_CALL(TARGET)%\n  if (false) { // 变异：处女分支删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'DUNGEON_RYOUZYOKU：处女（TALENT:0）按素质分档出声',
  },
  {
    desc: 'M1998 K0 DUNGEON_RYOUZYOKU 淫乱分支删松（TALENT:21/22 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      era.get(`talent:${target}:22`) === 1\n    ) {\n      // :7245',
    replace: '  if (false) { // 变异：淫乱分支删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'DUNGEON_RYOUZYOKU：非处女 + 淫乱（TALENT:76）分档出声',
  },
  {
    desc: 'M1999 K0 GOHOUBI_REQUEST 奖金分支删松（CFLAG:504==0 改恒 false）（#231）',
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
];
