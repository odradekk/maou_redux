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
];
