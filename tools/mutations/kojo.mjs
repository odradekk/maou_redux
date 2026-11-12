// 变异条目表切片：ere/kojo/（口上状态机与文本插值）。
// 字段与运行方式见 tools/mutation-check.mjs 头注释。desc 里的 M 编号不人工
// 分配，只作引用基准点，但全表必须唯一（#295；M117 曾被两票撞号，已改正）
// ——重号由 gate_shape 随 --verify 秒级核对。
/** 本分片条数（门 1）：增删条目必须同步改它，理由见 tools/mutation-check.mjs 头注 */
export const COUNT = 2700; // #859：-88（条目指向的分发族/注册段/存在标志已删除） // #857 +14（M15577-M15590：K12/K13/K15/K903/K11/K14 的口上子类——不进工厂、族注册直挂本体、select_com 不转交、奖赏结算钩子丢实参适配、零参钩子丢适配、COM 钩子改指别的本体） // #858：-11（删 17 条 K904 复制品的条目、加 6 条 M18517-M18522：K19 迁口上子类、K904 改为继承——不进工厂、素质错格、指令分支与语尾钩子不转交、EVENTEND #LATER 漏接线、K904 注册时退回父类；另 M6072/M6500/M6502 各合并两条、M6505 改锚点） // #855 +6（M15564-M15569：K0/K1/K2/K3/K5 的口上子类——不进工厂、族注册直挂本体、select_com 与语尾钩子不转交、注册号写错、子类未导出） // #977 +2（M18448/M18449：K1 的 TEQUIP:45 脱着支与 89/90 淫乱初吻支的判等写反） // #934 +5（M18423-M18427：凌辱畏怖扫描退回列头值、无记忆哨兵退回 0、不同怪物也改写记忆、累加增量、首次不清零）；#865 +8（M16750-M16757：语尾文字搬进 ere/data/gobi-koujo-const.js 后的取值规则——表外编号、档位下标、默认支随机序、单支不掷、%SELF_CALL% 替换、表行与注册一一对应）；#865 另有 30 条既有语尾条目的 find 改挂常量表（编号不变） // 数据地址缺陷修复 +15（M15403-M15417：K10 自慰次数交接与处女丧失增量门槛、K7 录像自我介绍八支、K1 助手 17 号判断）； // #797 +8（M7690-M7697：成熟出售真身调用丢失的原 sell-maturo-k0 分片条目改住本分片，条目内容不变） // #734 +7（M14550–M14556：四类首次口上阈值、真实引擎爱抚与非法阈值地址检查）；#710 净 -1（M12155 改写成 M14254：卖春积极性行随 show_button_bich_level 删除、改指等级网格退回纯文本，条数不变；删 M402：SET_BICH_LEVEL 输入上限随按钮化不可观察）；#711 起 +2（M14310/M14311：K15 暗器菜单的选项按钮化——退回纯文本与按钮后夹等键两条）；#643 -5…沿革见 git 历史；#654（F8）：删反向变异与 k902 条目 67 条、新增 M13300-M13349 与 M13549，#655（F9）-8+5 后合并计数；#688 +35 // 此前：#856 +7（M15570-M15576：K6/K7/K8/K9/K10 的口上子类——不进工厂、族注册直挂本体、select_com 与语尾钩子不转交、裸注册号写错、子类未导出、实参适配丢失） // #855 +6（M15564-M15569：K0/K1/K2/K3/K5 的口上子类——不进工厂、族注册直挂本体、select_com 与语尾钩子不转交、注册号写错、子类未导出） // #977 +2（M18448/M18449：K1 的 TEQUIP:45 脱着支与 89/90 淫乱初吻支的判等写反） // #934 +5（M18423-M18427：凌辱畏怖扫描退回列头值、无记忆哨兵退回 0、不同怪物也改写记忆、累加增量、首次不清零）；#865 +8（M16750-M16757：语尾文字搬进 ere/data/gobi-koujo-const.js 后的取值规则——表外编号、档位下标、默认支随机序、单支不掷、%SELF_CALL% 替换、表行与注册一一对应）；#865 另有 30 条既有语尾条目的 find 改挂常量表（编号不变） // 数据地址缺陷修复 +15（M15403-M15417：K10 自慰次数交接与处女丧失增量门槛、K7 录像自我介绍八支、K1 助手 17 号判断）； // #797 +8（M7690-M7697：成熟出售真身调用丢失的原 sell-maturo-k0 分片条目改住本分片，条目内容不变） // #734 +7（M14550–M14556：四类首次口上阈值、真实引擎爱抚与非法阈值地址检查）；#710 净 -1（M12155 改写成 M14254：卖春积极性行随 show_button_bich_level 删除、改指等级网格退回纯文本，条数不变；删 M402：SET_BICH_LEVEL 输入上限随按钮化不可观察）；#711 起 +2（M14310/M14311：K15 暗器菜单的选项按钮化——退回纯文本与按钮后夹等键两条）；#643 -5…沿革见 git 历史；#654（F8）：删反向变异与 k902 条目 67 条、新增 M13300-M13349 与 M13549，#655（F9）-8+5 后合并计数；#688 +35

export default [
  {
    desc: 'M57 口上总开关检查删松（<= 0 改 < 0，flag:7 = 0 不再拦）',
    file: 'ere/kojo/kojo-system.js',
    find: "  if (flag_guard && (era.get('flag:7') || 0) <= 0) {",
    replace:
      "  if (flag_guard && (era.get('flag:7') || 0) < 0) { // 变异：删松",
    tests: ['kojo-system'],
    must_mention: '完全不输出',
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
    desc: 'M63 K5 淫乱素质条件错格（TALENT:76 改 77）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)`,
    replace: `      era.get(\`talent:\${target}:77\`) === 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k5-mao'],
    must_mention: '淫乱分支',
  },
  {
    desc: 'M64 K3 爱慕素质条件错格（TALENT:85 改 86）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      // 爱慕（TALENT:85）\n      era.get(`talent:${target}:85`) === 1 &&\n      (kojo.爱抚 <= 499 || game.kojo.口上开关 === 2)',
    replace:
      '      // 爱慕（TALENT:85）\n      era.get(`talent:${target}:86`) === 1 &&\n      (kojo.爱抚 <= 499 || game.kojo.口上开关 === 2)',
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
    desc: 'M66 K3 随机尾中支条件（RAND:2 == 0 改 == 1——中/第三支互换）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '        } else if (rand_n(2) === 0) {\n          await era.printAndWait(\n            `「哈呜、${target_name}、可是，一心地，想要杀了…嗯、为什么、那么地……啊~、这么…温柔地…啊、啊啊……」`,',
    replace:
      '        } else if (rand_n(2) === 1) {\n          await era.printAndWait(\n            `「哈呜、${target_name}、可是，一心地，想要杀了…嗯、为什么、那么地……啊~、这么…温柔地…啊、啊啊……」`,',
    tests: ['kojo-k3-noble'],
    must_mention: '随机尾的第三支',
  },
  // M67：删除（#643）——K3 随机尾中支的整句文本此前只由黄金样本逐字比对守住，
  // 比对删除后该句无行为断言可挂（R1 的 M75/M76 同款处置）。
  {
    desc: 'M68 K3 淫乱阶段推进写错（CFLAG:301 = 600 改 500）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.爱抚 = 600;',
    replace: '      kojo.爱抚 = 500; // （变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '淫乱分支',
  },
  {
    desc: 'M69 EVENTSHOP #PRI 档总开关默认值（FLAG:7 = 2 改 1）',
    file: 'ere/kojo/kojo-system.js',
    find: "    era.set('flag:7', 2);",
    replace: "    era.set('flag:7', 1);",
    tests: ['kojo-system'],
    must_mention: 'EVENTSHOP',
  },
  {
    desc: 'M71 K3 失神检查删除（TFLAG:899 改恒 false）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '  // 失神時（TFLAG:899）——跨域读属主 train 的一维门面\n  if (game.train.失神) {',
    replace:
      '  // 失神時（TFLAG:899）——跨域读属主 train 的一维门面\n  if (false) { // 变异：失神检查删除',
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
    desc: 'M74 K3 3xx 支的附加条件删除（MARK:1 == 3 分支拿掉）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      // 屈服刻印Lv2＆快乐刻印Lv3（百位 3xx 阶段）\n      mark(2) === 2 &&\n      mark(1) === 3 &&\n      (kojo.爱抚 <= 299 || game.kojo.口上开关 === 2)',
    replace:
      '      // 屈服刻印Lv2＆快乐刻印Lv3（百位 3xx 阶段）\n      mark(2) === 2 &&\n      (kojo.爱抚 <= 299 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k3-noble'],
    must_mention: 'MARK:1 == 3',
  },
  // M75（K3 的 print/printAndWait 归类）随文本锁删除后无人可守（#640
  // 实测：行为断言不覆盖 W/L 形式）——删条目不补。
  // M76（K3 插值槽位）随文本锁删除后无人可守（#640 实测：该分支无
  // 行为断言覆盖）——删条目不补。
  {
    desc: 'M78 K5 台词改回繁体（简体锁 + 行为断言两处红）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: "        await era.printAndWait('「你这个变态…别、别碰我！」');",
    replace: "        await era.printAndWait('「你這個變態…別、別碰我！」');",
    tests: ['output-lang-lock', 'kojo-k5-mao'],
    must_mention: '非简体',
  },
  {
    desc: 'M80 K5 抄错字（行为断言的整行对账抓：文本对不上）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: "        await era.printAndWait('「咕…呜呜…啊！」');",
    replace: "        await era.printAndWait('「咕…呜呜…啊呀！」');",
    tests: ['kojo-k5-mao'],
    must_mention: '咕…呜呜…啊',
  },
  {
    desc: 'M81 K5 句中空格丢失（行为断言的整行对账抓：文本对不上）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '`「主人、再多摸摸我嘛${heart(1)} 舒服的我都要叫出来了啦${heart(1)}」`',
    replace:
      '`「主人、再多摸摸我嘛${heart(1)}舒服的我都要叫出来了啦${heart(1)}」`',
    tests: ['kojo-k5-mao'],
    must_mention: '再多摸摸我嘛',
  },
  {
    // #183（H14 迷宫凌辱男性对象）：同名函数区分（验收要求「此行为必须有测试」）
    desc: 'M420 H14 同名函数区分：orc_ryou_man 改回 orc_ryou（与 H13 撞名，触发 #12 遮蔽）',
    file: 'ere/kojo/kojo-dungeon-ravish-man.js',
    find: 'async function orc_ryou_man(arg, mon_num, rand) {',
    replace: 'async function orc_ryou(arg, mon_num, rand) {',
    tests: ['kojo-dungeon-ravish-man'],
    must_mention: '11 种怪物分派',
  },
  {
    // #183：%SAVESTR:ARG% 插值承载改坏（arg_name 变固定串）。旧文本锁只
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
    find: 'chara(arg).dungeon.体力 += 100; // BASE:ARG:0 += 100（体力回复）',
    replace: 'chara(arg).dungeon.体力 += 50; // 变异',
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
    find: '      chara(arg).train.初吻对象 = 995; // CFLAG:16 = 995（怪物的阴茎）',
    replace: '      chara(arg).train.初吻对象 = 994; // 变异',
    tests: ['kojo-dungeon-ravish-man'],
    must_mention: '初吻',
  },
  {
    desc: 'M400 勇者第一道门槛删除（EXP:74 == 0 不再拦，#184 验收变异）',
    file: 'ere/kojo/kojo-dungeon-bitch.js',
    find: '    if (!era.get(`exp:${arg}:74`)) {\n      return 0;\n    }',
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
  // M402（SET_BICH_LEVEL 输入上限 > 5 改 > 6）随 #710 删除：等级 0-5 成了
  // 按钮网格，本轮白名单只放行 0-5，6 不可键入，两档写法行为相同。
  {
    desc: 'M403 PROFIT_BITCH 总价改坏（PAY * PLAY 改 PAY + PLAY，#184 验收变异）',
    file: 'ere/kojo/kojo-dungeon-bitch.js',
    find: '  pay = pay * play;',
    replace: '  pay = pay + play;',
    tests: ['kojo-dungeon-bitch'],
    must_mention: '收益结算',
  },

  // M447（口上转译器的 SKIP 块处理）随转译器删除（#640）。

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
    find: 'chara(arg).dungeon.凌辱畏怖记忆_怪物 = local_1; // CFLAG:130',
    replace: 'chara(arg).dungeon.凌辱畏怖记忆_怪物 = 0; // 变异',
    tests: ['kojo-dungeon-ravish'],
    must_mention: '凌辱畏怖记忆推进',
  },
  {
    // #182：PC_RYOU 处女丧失推进改坏（初体验对象 15 写错）
    desc: 'M490 H13 PC_RYOU 处女丧失：初体验对象 CFLAG:15 写错（arg0 + 1 改 arg0）',
    file: 'ere/kojo/kojo-dungeon-ravish.js',
    find: '      chara(arg1).train.初体验对象 = arg0 + 1; // CFLAG:ARG:1:15 = NO:(ARG:0) + 1\n      chara(arg1).train.初体验对象名 = winner_name; // CSTR:ARG:1:3',
    replace:
      '      chara(arg1).train.初体验对象 = arg0; // 变异\n      chara(arg1).train.初体验对象名 = winner_name; // CSTR:ARG:1:3',
    tests: ['kojo-dungeon-ravish'],
    must_mention: '初体验对象',
  },
  {
    // #182：逃脱分支救援成功条件改坏（回城标志不写）
    desc: 'M491 H13 逃脱救援：回城标志 507 写入删（救援成功不立回城）',
    file: 'ere/kojo/kojo-dungeon-ravish.js',
    find: '      chara(leader).invasion.回城标志 = 1;\n      chara(arg).dungeon.体力 += 100;',
    replace:
      '      // 变异：救援成功不立回城标志\n      chara(arg).dungeon.体力 += 100;',
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
    desc: 'M520 LOG_TRY_BITCH 的 DUNGEON 勇者「空闲」分支改坏（#185 验收变异：真身分档文本；#600 起目标在拼接语句的分支片段）',
    file: 'ere/kojo/kojo-dungeon-bitch-log.js',
    find: "              : '在空闲的时间，'",
    replace: "              : '变异：错误文本'",
    tests: ['kojo-dungeon-bitch-log'],
    must_mention: '勇者无中毒/债务 → 空闲',
  },
  {
    desc: 'M521 LOG_TRY_BITCH 末段删除（「考虑着出卖肉体的事。」，#185 验收变异：与 FI_TRY_BITCH 区分）',
    file: 'ere/kojo/kojo-dungeon-bitch-log.js',
    find: "      '考虑着出卖肉体的事。',",
    replace: "      '', // 变异：末段删（LOG_TRY_BITCH 不再输出收尾文本）",
    tests: ['kojo-dungeon-bitch-log'],
    must_mention: 'LOG_TRY_BITCH 末行',
  },
  {
    desc: 'M522 LOG_AFTER_BITCH 的 ANIMAL 玩法号改坏（play = 6 → 5，#185 验收变异：玩法挑选）',
    file: 'ere/kojo/kojo-dungeon-bitch-log.js',
    find: '    play = 6;',
    replace: '    play = 5; // 变异',
    tests: ['kojo-dungeon-bitch-log'],
    must_mention: '调 LOG_BITCH_ANIMAL（DUNGEON 空）',
  },

  // —— #212 返工：存量二段寻址修复的反向变异 ——
  {
    desc: 'M717 ANIMAL 珠加算回退成二段（juel:arg:1 → juel:1——从未生效的写法）',
    file: 'ere/kojo/kojo-dungeon-bitch.js',
    find: '      era.add(`juel:${arg}:1`, play * 200); // JUEL:1 += PLAY * 200',
    replace: '      era.add(`juel:1`, play * 200); // 变异：二段',
    tests: ['chara-table-addressing', 'kojo-dungeon-bitch'],
    must_mention: 'JUEL:1 必须 +PLAY*200',
  },
  // —— #235（J25）：K4 冷徹 口上模块（M1750-M1789 号段） ——
  {
    desc: 'M1750 K4 COM 口塞检查删（TEQUIP:45 不再跳过，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '    if (era0(`tequip:${target}:45`) && era_flag.selectcom != 45) {\n      return false;\n    }',
    replace:
      '    if (false && era_flag.selectcom != 45) {\n      return false;\n    }',
    tests: ['kojo-k4-stoic'],
    must_mention: '口塞（TEQUIP:45 且非指令45）：静默跳过',
  },
  {
    desc: 'M1751 K4 COM 失神检查删（TFLAG:899 不再跳过，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: "    if (era0(`tequip:${target}:45`) && era_flag.selectcom != 45) {\n      return false;\n    }\n\n    if (era0('tflag:899')) {\n      return false;\n    }",
    replace:
      '    if (era0(`tequip:${target}:45`) && era_flag.selectcom != 45) {\n      return false;\n    }\n\n    if (false) {\n      return false;\n    }',
    tests: ['kojo-k4-stoic'],
    must_mention: '失神（TFLAG:899）：静默跳过',
  },
  {
    desc: 'M1752 K4 兽奸检查岔路丢失（TEQUIP:89 不再调 DOG_KOJO_4，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '    if (era0(`tequip:${target}:89`)) {\n      await this.dog_kojo(); // CALL DOG_KOJO_4\n      return false;\n    }',
    replace:
      '    if (era0(`tequip:${target}:89`)) {\n      return false;\n    }',
    tests: ['kojo-k4-stoic'],
    must_mention: '兽奸（TEQUIP:89）：岔进本文件真身 DOG_KOJO_4',
  },
  {
    desc: 'M1753 K4 触手检查删（TEQUIP:90 不再跳过，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '    if (era0(`tequip:${target}:90`)) {\n      return false;\n    }',
    replace: '    if (false) {\n      return false;\n    }',
    tests: ['kojo-k4-stoic'],
    must_mention: '触手（TEQUIP:90）：静默跳过',
  },
  {
    desc: 'M1754 K4 死斗场检查岔路丢失（TEQUIP:55 不再调 COLOSSEUM_KOJO_4，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '    if (era0(`tequip:${target}:55`)) {\n      await this.colosseum_kojo(); // CALL COLOSSEUM_KOJO_4\n      return false;\n    }',
    replace:
      '    if (era0(`tequip:${target}:55`)) {\n      return false;\n    }',
    tests: ['kojo-k4-stoic'],
    must_mention: '死斗场（TEQUIP:55）：岔进本文件真身 COLOSSEUM_KOJO_4',
  },
  {
    desc: 'M1755 K4 爱撫初回刻印分档删（MARK:2 >= 2 分支丢失，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '      if (era0(`mark:${target}:2`) >= 2) {\n        await era.printAndWait(`「唔～唔……」「哼，这不挺配合的嘛！」`);\n      } else {',
    replace:
      '      if (era0(`mark:${target}:2`) >= 3) {\n        await era.printAndWait(`「唔～唔……」「哼，这不挺配合的嘛！」`); // 变异\n      } else {',
    tests: ['kojo-k4-stoic'],
    must_mention: '爱撫初回的刻印分档（MARK:2 >= 2）：配合台词',
  },
  {
    desc: 'M1756 K4 爱撫初回推进写错（CFLAG:301 = 1 改 2，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '        await era.printAndWait(`「讨厌！这变态！」`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      era.set(`cflag:${target}:301`, 1);\n      return 0;',
    replace:
      '        await era.printAndWait(`「讨厌！这变态！」`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      era.set(`cflag:${target}:301`, 2);\n      return 0;',
    tests: ['kojo-k4-stoic'],
    must_mention:
      '爱撫初回（CFLAG:301 == 0 且 MARK:2 < 2）：一句拒绝 + 推进到 1',
  },
  {
    desc: 'M1757 K4 爱撫淫乱档推进写错（CFLAG:301 = 6 改 5，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '          `「唔…噢～…再弄，再弄我……胸，胸部也好……那里！……还有屁股，再揉啊～～…」`,\n        );\n        // CFLAG:301  = 6（变量语义：CFLAG 族，301）\n        era.set(`cflag:${target}:301`, 6);',
    replace:
      '          `「唔…噢～…再弄，再弄我……胸，胸部也好……那里！……还有屁股，再揉啊～～…」`,\n        );\n        // CFLAG:301  = 6（变量语义：CFLAG 族，301）\n        era.set(`cflag:${target}:301`, 5);',
    tests: ['kojo-k4-stoic'],
    must_mention: '淫乱 TALENT:76 → CFLAG:301 = 6',
  },
  {
    desc: 'M1758 K4 爱撫爱慕档推进写错（CFLAG:301 = 5 改 4，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '          `「那么细腻，温柔的手法……人家会……啊！……噢～啊啊！……有，有感觉了～～…」`,\n        );\n        // CFLAG:301  = 5（变量语义：CFLAG 族，301）\n        era.set(`cflag:${target}:301`, 5);',
    replace:
      '          `「那么细腻，温柔的手法……人家会……啊！……噢～啊啊！……有，有感觉了～～…」`,\n        );\n        // CFLAG:301  = 5（变量语义：CFLAG 族，301）\n        era.set(`cflag:${target}:301`, 4);',
    tests: ['kojo-k4-stoic'],
    must_mention: '爱慕 TALENT:85 → CFLAG:301 = 5',
  },
  {
    desc: 'M1759 K4 爱撫屈服Lv3档推进写错（CFLAG:301 = 4 改 3，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '        await era.printAndWait(`「啊…好…那里……」`);\n        // CFLAG:301  = 4（变量语义：CFLAG 族，301）\n        era.set(`cflag:${target}:301`, 4);',
    replace:
      '        await era.printAndWait(`「啊…好…那里……」`);\n        // CFLAG:301  = 4（变量语义：CFLAG 族，301）\n        era.set(`cflag:${target}:301`, 3);',
    tests: ['kojo-k4-stoic'],
    must_mention: '屈服刻印Lv3 → 4',
  },
  {
    desc: 'M1760 K4 爱撫屈服Lv2档推进写错（CFLAG:301 = 3 改 2，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '        await era.printAndWait(`「快住手啊……再这样摸的话……我会………」`);\n        // CFLAG:301  = 3（变量语义：CFLAG 族，301）\n        era.set(`cflag:${target}:301`, 3);',
    replace:
      '        await era.printAndWait(`「快住手啊……再这样摸的话……我会………」`);\n        // CFLAG:301  = 3（变量语义：CFLAG 族，301）\n        era.set(`cflag:${target}:301`, 2);',
    tests: ['kojo-k4-stoic'],
    must_mention: '屈服刻印Lv2 → 3',
  },
  {
    desc: 'M1761 K4 爱撫それ以外档推进写错（CFLAG:301 = 2 改 1，#235）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '        await era.printAndWait(`「变态！！…完全不舒服，不要再摸了！」`);\n        // CFLAG:301  = 2（变量语义：CFLAG 族，301）\n        era.set(`cflag:${target}:301`, 2);',
    replace:
      '        await era.printAndWait(`「变态！！…完全不舒服，不要再摸了！」`);\n        // CFLAG:301  = 2（变量语义：CFLAG 族，301）\n        era.set(`cflag:${target}:301`, 1);',
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
    find: '        await era.printAndWait(`「讨，讨厌！别舔啊！」`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      era.set(`cflag:${target}:301`, 1);\n      return 0;',
    replace:
      '        await era.printAndWait(`「讨，讨厌！别舔啊！」`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      era.set(`cflag:${target}:301`, 0);\n      return 0;',
    tests: ['kojo-k4-stoic'],
    must_mention: '兽奸爱撫初回（DOG_KOJO_4 CFLAG:301 == 0 且 MARK:2 < 2）',
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
    desc: 'M1770 K4 SELF_KOJO 成熟出售真身调用丢失（#338）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '      await sell_maturo_k0(target); // CALL SELL_MATURO_K0（源行 4305）',
    replace: '      // 变异：成熟出售真身调用丢失',
    tests: ['sell-maturo'],
    must_mention: '14 个活动口上的成熟出售事件均进入市场真身',
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
    file: 'ere/data/gobi-koujo-const.js',
    find: "  4: {\n    tiers: ['哦～♪', '哦！', '啦……。', '吧……算是……。', '什么的……。'],",
    replace:
      "  4: {\n    tiers: ['哦！', '哦！', '啦……。', '吧……算是……。', '什么的……。'], // 变异",
    tests: ['kojo-k4-stoic'],
    must_mention: 'GOBI_KOUJO ARG:0 == 1-5 各支与 0 随机三选一',
  },
  {
    desc: 'M1774 K4 插值槽位错配（CALLNAME:MASTER 与 NAME:MASTER 混，#235 保真；#640 起由行为断言守）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '      `四脚爬爬，扭动着腰，用炽热的视线仰视着${master_name}。`,\n    );',
    replace:
      '      `四脚爬爬，扭动着腰，用炽热的视线仰视着${target_name}。`,\n    ); // 变异：填错孔',
    tests: ['kojo-k4-stoic'],
    must_mention: '仰视着你',
  },

  {
    desc: 'M1650 K1 首次爱抚推进写错（CFLAG:301 = 1 改 2）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「放过我吧！别再来了…唔哇」`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      chara(target).kojo.爱抚 = 1;',
    replace:
      '        await era.printAndWait(`「放过我吧！别再来了…唔哇」`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      chara(target).kojo.爱抚 = 2; // （变异）',
    tests: ['kojo-k1-confident'],
    must_mention: '首次爱抚推进到 1',
  },
  {
    desc: 'M1651 K1 首次刻印分档边界（MARK:2 >= 2 改 >= 3）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '      } else if (era.get(`mark:${target}:2`) >= 2) {',
    replace:
      '      } else if (era.get(`mark:${target}:2`) >= 3) {\n        // （变异）',
    tests: ['kojo-k1-confident'],
    must_mention: '刻印分档也推进到 1',
  },
  {
    desc: 'M1652 K1 二次爱抚推进写错（CFLAG:301 = 2 改 3）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「哈…放过我吧…这样一点儿也…咕！」`);\n        // CFLAG:301  = 2（变量语义：CFLAG 族，301）\n        chara(target).kojo.爱抚 = 2;',
    replace:
      '        await era.printAndWait(`「哈…放过我吧…这样一点儿也…咕！」`);\n        // CFLAG:301  = 2（变量语义：CFLAG 族，301）\n        chara(target).kojo.爱抚 = 3; // （变异）',
    tests: ['kojo-k1-confident'],
    must_mention: '爱抚推进到 2',
  },
  {
    desc: 'M1653 K1 屈服 Lv3 推进写错（CFLAG:301 = 4 改 3）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「被别人这么玩弄真是太好了呐…」`);\n        // CFLAG:301  = 4（变量语义：CFLAG 族，301）\n        chara(target).kojo.爱抚 = 4;',
    replace:
      '        await era.printAndWait(`「被别人这么玩弄真是太好了呐…」`);\n        // CFLAG:301  = 4（变量语义：CFLAG 族，301）\n        chara(target).kojo.爱抚 = 3; // （变异）',
    tests: ['kojo-k1-confident'],
    must_mention: '爱抚推进到 4',
  },
  {
    desc: 'M1654 K1 淫乱素质条件错格（TALENT:76 改 77）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(\n          `「啊哈…想要更多的爱抚…啊啊…留下更多的痕迹吧${heart(1)}」`,',
    replace:
      '        era.get(`talent:${target}:77`) === 1 &&\n        (chara(target).kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(\n          `「啊哈…想要更多的爱抚…啊啊…留下更多的痕迹吧${heart(1)}」`,',
    tests: ['kojo-k1-confident'],
    must_mention: '淫乱爱抚台词',
  },
  {
    desc: 'M1655 K1 爱慕素质条件错格（TALENT:85 改 86）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        era.get(`talent:${target}:85`) === 1 &&\n        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(`「啊…即使更加激烈…没关系的…真的♪」`);',
    replace:
      '        era.get(`talent:${target}:86`) === 1 &&\n        (chara(target).kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(`「啊…即使更加激烈…没关系的…真的♪」`);',
    tests: ['kojo-k1-confident'],
    must_mention: '爱慕爱抚台词',
  },
  {
    desc: 'M1656 K1 FLAG:7 == 2 旁路失效（爱抚上限旁路改 === 3）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        (era.get(`mark:${target}:2`) || 0) <= 1 &&\n        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        (era.get(`mark:${target}:2`) || 0) <= 1 &&\n        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 === 3)\n      ) {',
    tests: ['kojo-k1-confident'],
    must_mention: 'FLAG:7 == 2 旁路重出声',
  },
  {
    desc: 'M1657 K1 FLAG:7 == 1 阈值闸失效（爱抚上限 <= 1 改 <= 2）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        (era.get(`mark:${target}:2`) || 0) <= 1 &&\n        (chara(target).kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        (era.get(`mark:${target}:2`) || 0) <= 1 &&\n        (chara(target).kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k1-confident'],
    must_mention: 'FLAG:7 == 1 阶段耗尽不出声',
  },
  {
    desc: 'M1660 K1 助手调教真身删除（ASSI 分支改恒 false）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '      if (era_flag.assi > 0 && era_flag.assiplay) {\n        await era.printAndWait(`${target_name}转过脸就这样看着${assi_name}………`);',
    replace:
      '      if (false) {\n        // 变异：助手调教不出台词\n        await era.printAndWait(`${target_name}转过脸就这样看着${assi_name}………`);',
    tests: ['kojo-k1-confident'],
    must_mention: '助手调教不跳过出台词',
  },
  {
    desc: 'M1661 K1 口塞检查删除（TEQUIP:45 改恒 false）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {',
    replace: '  if (false && era_flag.selectcom !== 45) {\n    // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '口塞非 45 指令跳过',
  },
  {
    desc: 'M1662 K1 口塞 SELECTCOM == 45 豁免失效（去掉 !== 45）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {',
    replace:
      '  if (era.get(`tequip:${target}:45`)) {\n    // 变异：口塞 45 豁免失效',
    tests: ['kojo-k1-confident'],
    must_mention: '口塞指令自己说话',
  },
  {
    desc: 'M1663 K1 失神检查删除（TFLAG:899 改恒 false）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {\n    return 0;\n  }\n\n  if (game.train.失神) {',
    replace:
      '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {\n    return 0;\n  }\n\n  if (false) {\n    // 变异：失神检查删除',
    tests: ['kojo-k1-confident'],
    must_mention: '失神：跳过',
  },
  {
    desc: 'M1664 K1 崩坏检查错格（TALENT:9 改 8）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '  if (era.get(`talent:${target}:9`) === 1) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:89`)) {\n    await dog_kojo_1(rand); // CALL DOG_KOJO_1',
    replace:
      '  if (era.get(`talent:${target}:8`) === 1) {\n    // 变异\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:89`)) {\n    await dog_kojo_1(rand); // CALL DOG_KOJO_1',
    tests: ['kojo-k1-confident'],
    must_mention: '崩坏：跳过',
  },
  {
    desc: 'M1665 K1 触手检查删除（TEQUIP:90 改恒 false）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '  if (era.get(`tequip:${target}:90`)) {\n    return 0;\n  }\n\n  if (era_flag.selectcom === 0) {',
    replace:
      '  if (false) {\n    // 变异：触手检查删除\n    return 0;\n  }\n\n  if (era_flag.selectcom === 0) {',
    tests: ['kojo-k1-confident'],
    must_mention: '触手：跳过',
  },
  {
    desc: 'M1666 K1 死斗场检查错位（TEQUIP:55 改 56）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '  if (era.get(`tequip:${target}:55`)) {\n    await colosseum_kojo_1(rand); // CALL COLOSSEUM_KOJO_1',
    replace:
      '  if (era.get(`tequip:${target}:56`)) {\n    // 变异\n    await colosseum_kojo_1(rand); // CALL COLOSSEUM_KOJO_1',
    tests: ['kojo-k1-confident'],
    must_mention: '看到死斗场的热浪',
  },
  {
    desc: 'M1667 K1 死斗场真身 CALL 删除（COLOSSEUM_KOJO_1 不调）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    await colosseum_kojo_1(rand); // CALL COLOSSEUM_KOJO_1',
    replace: '    // 变异：死斗场真身不调',
    tests: ['kojo-k1-confident'],
    must_mention: '看到死斗场的热浪',
  },
  {
    desc: 'M1668 K1 兽奸检查错位（TEQUIP:89 改 88）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '  if (era.get(`tequip:${target}:89`)) {\n    await dog_kojo_1(rand); // CALL DOG_KOJO_1',
    replace:
      '  if (era.get(`tequip:${target}:88`)) {\n    // 变异\n    await dog_kojo_1(rand); // CALL DOG_KOJO_1',
    tests: ['kojo-k1-confident'],
    must_mention: '「讨厌啊！　不要靠过来！」',
  },
  {
    desc: 'M1669 K1 兽奸真身 CALL 删除（DOG_KOJO_1 不调）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    await dog_kojo_1(rand); // CALL DOG_KOJO_1',
    replace: '    // 变异：兽奸真身不调',
    tests: ['kojo-k1-confident'],
    must_mention: '「讨厌啊！　不要靠过来！」',
  },
  {
    desc: 'M1670 K1 兽奸首次台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「讨厌啊！　不要靠过来！」`);',
    replace:
      '        await era.printAndWait(`「讨厌啊！不要靠过来！」`); // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '「讨厌啊！　不要靠过来！」',
  },
  {
    desc: 'M1671 K1 PALAMCNG 润滑 LV2 门槛抬高（PALAMLV[2] 改 [3]）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '  if (P > PALAMLV[2] && chara(target).kojo.首次润滑Lv2 === 0) {',
    replace:
      '  if (P > PALAMLV[3] && chara(target).kojo.首次润滑Lv2 === 0) {\n    // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: 'PALAMCNG 润滑 LV2',
  },
  {
    desc: 'M1672 K1 PALAMCNG 首次润滑标志写错（CFLAG:221 = 1 改 0）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    chara(target).kojo.首次润滑Lv2 = 1;',
    replace: '    chara(target).kojo.首次润滑Lv2 = 0; // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '首次润滑Lv2 推进',
  },
  {
    desc: 'M1673 K1 MARKCNG 苦痛刻印台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '      await era.printAndWait(`「啊啊啊…再…痛…啊」`);',
    replace: '      await era.printAndWait(`「啊啊啊…再…痛啊」`); // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '「啊啊啊…再…痛…啊」',
  },
  {
    desc: 'M1674 K1 MARKCNG 苦痛刻印标志写错（CFLAG:297 = 1 改 0）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    chara(target).kojo.苦痛刻印Lv3 = 1;',
    replace: '    chara(target).kojo.苦痛刻印Lv3 = 0; // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '苦痛刻印Lv3 推进',
  },
  {
    desc: 'M1675 K1 BENKI 默认支台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '      await era.printAndWait(`「噫、好脏……」`);',
    replace: '      await era.printAndWait(`「噫、好脏…」`); // 变异',
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
    find: '    chara(target).kojo.NTR_651 = 1;',
    replace: '    chara(target).kojo.NTR_651 = 0; // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: 'NTR_651 推进',
  },
  {
    desc: 'M1678 K1 NTR 再捕获标志写错（CFLAG:650 = 1 改 0）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    chara(target).kojo.NTR再捕获 = 1;',
    replace: '    chara(target).kojo.NTR再捕获 = 0; // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: 'NTR再捕获推进',
  },
  {
    desc: 'M1679 K1 ENTERENEMY 默认支台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '    await era.printAndWait(`「虽然不怎么了解魔王的实力、不过觉悟吧！！」`);',
    replace:
      '    await era.printAndWait(`「虽然不怎么了解魔王的实力、不过觉悟吧！」`); // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '虽然不怎么了解魔王的实力',
  },
  {
    desc: 'M1680 K1 GOBI ARG=1 语尾改坏（#232）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "      '哎哟♪',",
    replace: "      '哎哟', // 变异",
    tests: ['kojo-k1-confident'],
    must_mention: '哎哟♪',
  },
  {
    desc: 'M1681 K1 胜利口上开场改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '  await era.printAndWait(`「${sc()}赢不了啊！」`);',
    replace: '  await era.printAndWait(`「${sc()}赢不了！」`); // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '胜利口上开场',
  },
  {
    desc: 'M1682 K1 攻击口上 TALENT:11 台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「怪物！　死吧！」`);',
    replace: '        await era.printAndWait(`「怪物！死吧！」`); // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '「怪物！　死吧！」',
  },
  {
    desc: 'M1683 K1 首次爱抚拒绝台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「放过我吧！别再来了…唔哇」`);',
    replace:
      '        await era.printAndWait(`「放过我吧！别再来了唔哇」`); // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '「放过我吧！别再来了…唔哇」',
  },
  {
    desc: 'M1684 K1 二次爱抚台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「哈…放过我吧…这样一点儿也…咕！」`);',
    replace:
      '        await era.printAndWait(`「哈…放过我吧…这样一点儿也咕！」`); // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '「哈…放过我吧…这样一点儿也…咕！」',
  },
  {
    desc: 'M1685 K1 口塞首次台词改坏（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「呜呜…呜…呼…呼」`);',
    replace: '        await era.printAndWait(`「呜呜…呜…呼呼」`); // 变异',
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
    find: '        await era.printAndWait(`「哈…爱抚…更多的爱抚呦…」`);',
    replace:
      '        await era.printAndWait(`「哈…爱抚…更多的爱抚呦」`); // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '屈服 Lv3 台词',
  },
  {
    desc: 'M1688 K1 兽奸爱抚推进写错（DOG CFLAG:301 = 1 改 2）（#232）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '        await era.printAndWait(`「讨厌啊！　不要靠过来！」`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      chara(target).kojo.爱抚 = 1;',
    replace:
      '        await era.printAndWait(`「讨厌啊！　不要靠过来！」`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      chara(target).kojo.爱抚 = 2; // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '兽奸爱抚也推进到 1',
  },
  {
    desc: 'M1689 K1 成熟出售真身调用丢失（#338）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '      await sell_maturo_k0(target, { rand }); // CALL SELL_MATURO_K0',
    replace: '      // 变异：成熟出售真身调用丢失',
    tests: ['sell-maturo'],
    must_mention: '14 个活动口上的成熟出售事件均进入市场真身',
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
    find: '    chara(target).kojo.首次C绝顶 = 1;',
    replace: '    chara(target).kojo.首次C绝顶 = 0; // 变异',
    tests: ['kojo-k1-confident'],
    must_mention: '首次C绝顶推进',
  },
  {
    desc: 'M1700 K3 舔阴首次推进写错（CFLAG:302 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      }\n      kojo.舔阴 = 1;',
    replace: '      }\n      kojo.舔阴 = 2; // （变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '舔阴首次（CFLAG:302 == 0 且非处女）',
  },
  {
    desc: 'M1701 K3 舔阴处女分档删（TALENT:0 分支拿掉）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: "      if (era.get(`talent:${target}:0`) === 1) {\n        await era.printAndWait(\n          '「嗯啊啊~！那、那里才不是可以舔的地方…哈呜…很，很脏的…哈呜！」',\n        );\n      } else {",
    replace:
      "      if (false) { // 变异：处女分档删除\n        await era.printAndWait(\n          '「嗯啊啊~！那、那里才不是可以舔的地方…哈呜…很，很脏的…哈呜！」',\n        );\n      } else {",
    tests: ['kojo-k3-noble'],
    must_mention: '舔阴首次处女分档',
  },
  {
    desc: 'M1702 K3 舔阴淫乱推进写错（CFLAG:302 = 5 改 4）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.舔阴 = 5;\n    } else if (',
    replace: '      kojo.舔阴 = 4; // （变异）\n    } else if (',
    tests: ['kojo-k3-noble'],
    must_mention: '舔阴二次以后',
  },
  {
    desc: 'M1703 K3 肛门爱抚首次推进写错（CFLAG:303 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.肛门爱抚 = 1;',
    replace: '      kojo.肛门爱抚 = 2; // （变异）',
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
    desc: 'M1706 K3 自慰首次推进写错（CFLAG:304 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.自慰 = 1;',
    replace: '      kojo.自慰 = 2; // （变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '自慰首次（CFLAG:304 == 0）',
  },
  {
    desc: 'M1707 K3 自慰淫乱处女推进写错（CFLAG:304 = 9 改 8）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.自慰 = 9;',
    replace: '      kojo.自慰 = 8; // （变异）',
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
    find: '      }\n      kojo.胸爱抚 = 1;',
    replace: '      }\n      kojo.胸爱抚 = 2; // （变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '胸爱抚首次（CFLAG:306 == 0）',
  },
  {
    desc: 'M1710 K3 胸爱抚淫乱推进写错（CFLAG:306 = 5 改 4）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.胸爱抚 = 5;\n    } else if (',
    replace: '      kojo.胸爱抚 = 4; // （变异）\n    } else if (',
    tests: ['kojo-k3-noble'],
    must_mention: '胸爱抚淫乱推进到 5',
  },
  {
    desc: 'M1711 K3 胸爱抚B感覚门槛错（乳房感觉 >= 3 改 >= 4）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: "      system.乳房感觉 >= 3 &&\n      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)\n    ) {\n      await era.printAndWait('「啊啊~…胸部…胸部居然会那么有感觉什么的…」');",
    replace:
      "      system.乳房感觉 >= 4 &&\n      (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)\n    ) {\n      await era.printAndWait('「啊啊~…胸部…胸部居然会那么有感觉什么的…」');",
    tests: ['kojo-k3-noble'],

    must_mention: '胸爱抚B感覚Lv3推进到 3',
  },
  {
    desc: 'M1712 K3 接吻调教首次推进写错（CFLAG:307 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: "        await era.printAndWait('「嗯呜~…这，这样的…才不算什么呢！…！」');\n      }\n      kojo.接吻 = 1;",
    replace:
      "        await era.printAndWait('「嗯呜~…这，这样的…才不算什么呢！…！」');\n      }\n      kojo.接吻 = 2; // （变异）",
    tests: ['kojo-k3-noble'],
    must_mention: '接吻调教首次（CFLAG:307 == 0 且非 TFLAG:13）',
  },
  {
    desc: 'M1713 K3 接吻淫乱推进写错（CFLAG:307 = 5 改 4）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.接吻 = 5;\n    } else if (',
    replace: '      kojo.接吻 = 4; // （变异）\n    } else if (',
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
    desc: 'M1715 K3 死斗场检查删松（TEQUIP:55 恒 false）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '  // 死斗场中は専用口上\n  if (era.get(`tequip:${target}:55`)) {',
    replace: '  // 死斗场中は専用口上\n  if (false) {',
    tests: ['kojo-k3-noble'],
    must_mention: '死斗场（TEQUIP:55）最先',
  },
  {
    desc: 'M1716 K3 助手调教检查删松（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '  // 助手が調教した時に口上をスキップする\n  if (era_flag.assi > 0 && era_flag.assiplay) {',
    replace: '  // 助手が調教した時に口上をスキップする\n  if (false) {',
    tests: ['kojo-k3-noble'],
    must_mention: '助手调教：静默跳过',
  },
  {
    desc: 'M1717 K3 口塞检查删松（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '  // 口塞着用時（SELECTCOM == 45 自己说话不算）\n  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {',
    replace: '  // 口塞着用時（SELECTCOM == 45 自己说话不算）\n  if (false) {',
    tests: ['kojo-k3-noble'],
    must_mention: '口塞：静默跳过',
  },
  {
    desc: 'M1718 K3 失神检查删松（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '  // 失神時（TFLAG:899）——跨域读属主 train 的一维门面\n  if (game.train.失神) {',
    replace:
      '  // 失神時（TFLAG:899）——跨域读属主 train 的一维门面\n  if (false) {',
    tests: ['kojo-k3-noble'],
    must_mention: '失神：静默跳过',
  },
  {
    desc: 'M1719 K3 兽奸检查删松（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '  // 兽奸PLAY中は専用口上\n  if (era.get(`tequip:${target}:89`)) {',
    replace: '  // 兽奸PLAY中は専用口上\n  if (false) {',
    tests: ['kojo-k3-noble'],
    must_mention: '兽奸（TEQUIP:89）',
  },
  {
    desc: 'M1720 K3 崩坏检查删松（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '  // 崩坏した場合（TALENT:9）\n  if (era.get(`talent:${target}:9`) === 1) {',
    replace: '  // 崩坏した場合（TALENT:9）\n  if (false) {',
    tests: ['kojo-k3-noble'],
    must_mention: '崩坏：静默跳过',
  },
  {
    desc: 'M1721 K3 触手检查删松（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '  // 触手調教中（TEQUIP:90）\n  if (era.get(`tequip:${target}:90`)) {',
    replace: '  // 触手調教中（TEQUIP:90）\n  if (false) {',
    tests: ['kojo-k3-noble'],
    must_mention: '触手：静默跳过',
  },
  {
    desc: 'M1722 K3 自己扒开首次推进写错（CFLAG:308 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      kojo.自己扒开 = 1;',
    replace: '      kojo.自己扒开 = 2; // （变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '自己扒开首次推进到 1',
  },
  {
    desc: 'M1723 K3 EVENTTRAIN 初调教推进写错（CFLAG:201 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '    kojo.初调教 = 1;\n    return 1;',
    replace: '    kojo.初调教 = 2; // （变异）\n    return 1;',
    tests: ['kojo-k3-noble'],
    must_mention: '初调教推进到 1',
  },
  {
    desc: 'M1724 K3 EVENTEND CFLAG:301 钳回删掉（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '    kojo.爱抚 = 1;\n  }',
    replace: '    // 变异：CFLAG:301 钳回删除\n  }',
    tests: ['kojo-k3-noble'],
    must_mention: '爱抚计数钳回 1',
  },
  {
    desc: 'M1725 K3 PALAMCNG 首次润滑Lv2 推进写错（CFLAG:221 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '    kojo.首次润滑Lv2 = 1;',
    replace: '    kojo.首次润滑Lv2 = 2; // （变异）',
    tests: ['kojo-k3-noble'],
    must_mention: '首次润滑Lv2',
  },
  {
    desc: 'M1726 K3 兽奸爱抚首次推进写错（CFLAG:301 = 1 改 2）（#234）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 1;',
    replace:
      '      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 2; // （变异）',
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
    desc: 'M1728 K3 成熟出售真身调用丢失（#338）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: '      await sell_maturo_k0(target, { rand }); // CALL SELL_MATURO_K0',
    replace: '      // 变异：成熟出售真身调用丢失',
    tests: ['sell-maturo'],
    must_mention: '14 个活动口上的成熟出售事件均进入市场真身',
  },
  {
    desc: 'M1541 K2 淫乱素质条件错格（TALENT:76 改 77）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '      if (\n        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '      if (\n        era.get(`talent:${target}:77`) === 1 &&\n        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k2-timid'],
    must_mention: '淫乱分支',
  },
  {
    desc: 'M1542 K2 阈值闸旁路失效（それ以外支 FLAG:7 == 2 改 === 3）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '      } else if (\n        (era.get(`mark:${target}:2`) || 0) <= 1 &&\n        (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(`「感觉…啊啊…好奇怪…！」`);',
    replace:
      '      } else if (\n        (era.get(`mark:${target}:2`) || 0) <= 1 &&\n        (kojo.爱抚 <= 1 || game.kojo.口上开关 === 3)\n      ) {\n        await era.printAndWait(`「感觉…啊啊…好奇怪…！」`);',
    tests: ['kojo-k2-timid'],
    must_mention: 'それ以外支 FLAG:7',
  },
    desc: 'M1543 凌辱口上分发回退成写死 call(0)（#233）',
    file: 'ere/kojo/kojo-dungeon-ravish.js',
    find: 'async function dispatch_ryouzyoku_kojo(hook, family) {\n  await run_kojo(hook, family, {\n    legacy: (id) => family.call(id, { whenMissing: 0, args: [] }),',
    replace:
      'async function dispatch_ryouzyoku_kojo(hook, family) {\n  await run_kojo(hook, family, {\n    legacy: () => family.call(0, { whenMissing: 0, args: [] }), // 变异：写死 call(0)',
    tests: ['kojo-k2-timid'],
    must_mention: 'GET_KOJO_NUM',
  },
  {
    desc: 'M1546 K2 死斗场检查删除（TEQUIP:55 改恒 false）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '  if (era.get(`tequip:${target}:55`)) {\n    await colosseum_kojo_2(rand_n);',
    replace: '  if (false) {\n    await colosseum_kojo_2(rand_n);',
    tests: ['kojo-k2-timid'],
    must_mention: '死斗场（TEQUIP:55）最先',
  },
  {
    desc: 'M1547 K2 助手调教检查删除（ASSIPLAY 改恒 false）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '  if (era_flag.assi > 0 && era_flag.assiplay) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {',
    replace:
      '  if (false) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {',
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
    must_mention: '口塞中的 45 指令不被头部检查拦',
  },
  {
    desc: 'M1549 K2 失神检查删除（TFLAG:899 改恒 false）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {\n    return 0;\n  }\n\n  if (game.train.失神) {\n    return 0;\n  }',
    replace:
      '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {\n    return 0;\n  }\n\n  if (false) {\n    return 0;\n  }',
    tests: ['kojo-k2-timid'],
    must_mention: '失神（TFLAG:899）：静默跳过',
  },
  {
    desc: 'M1550 K2 崩坏检查删除（TALENT:9 改恒 false）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {\n    return 0;\n  }\n\n  if (game.train.失神) {\n    return 0;\n  }\n\n  if (era.get(`talent:${target}:9`) === 1) {\n    return 0;\n  }',
    replace:
      '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {\n    return 0;\n  }\n\n  if (game.train.失神) {\n    return 0;\n  }\n\n  if (false) {\n    return 0;\n  }',
    tests: ['kojo-k2-timid'],
    must_mention: '崩坏（TALENT:9）：静默跳过',
  },
  {
    desc: 'M1551 K2 兽奸检查删除（TEQUIP:89 改恒 false）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '  if (era.get(`tequip:${target}:89`)) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:90`)) {\n    return 0;\n  }\n\n  if (era_flag.selectcom === 0) {',
    replace:
      '  if (false) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:90`)) {\n    return 0;\n  }\n\n  if (era_flag.selectcom === 0) {',
    tests: ['kojo-k2-timid'],
    must_mention: '不调 DOG_KOJO_2',
  },
  {
    desc: 'M1552 K2 触手检查删除（TEQUIP:90 改恒 false）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '  if (era.get(`tequip:${target}:90`)) {\n    return 0;\n  }\n\n  if (era_flag.selectcom === 0) {',
    replace:
      '  if (false) {\n    return 0;\n  }\n\n  if (era_flag.selectcom === 0) {',
    tests: ['kojo-k2-timid'],
    must_mention: '触手（TEQUIP:90）：静默跳过',
  },
  {
    desc: 'M1553 K2 爱慕素质条件错格（TALENT:85 改 86）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '        era.get(`talent:${target}:85`) === 1 &&\n        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(`「呼…呼呼…再…请随意…关照…${heart(1)}」`);',
    replace:
      '        era.get(`talent:${target}:86`) === 1 &&\n        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(`「呼…呼呼…再…请随意…关照…${heart(1)}」`);',
    tests: ['kojo-k2-timid'],
    must_mention: '爱慕分支',
  },
  {
    desc: 'M1554 K2 屈服刻印 Lv3 条件错格（MARK:2 == 3 改 4）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '        (era.get(`mark:${target}:2`) || 0) === 3 &&\n        (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(`「请…再…再用力些…啊！」`);',
    replace:
      '        (era.get(`mark:${target}:2`) || 0) === 4 &&\n        (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(`「请…再…再用力些…啊！」`);',
    tests: ['kojo-k2-timid'],
    must_mention: '屈服刻印 Lv3',
  },
  {
    desc: 'M1555 K2 舔阴首次推进写错（CFLAG:302 = 1 改 2）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '        await era.printAndWait(`「啊啊…为什么那里…会！」`);\n      }\n      // CFLAG:302  = 1（变量语义：CFLAG 族，302）\n      kojo.舔阴 = 1;',
    replace:
      '        await era.printAndWait(`「啊啊…为什么那里…会！」`);\n      }\n      // CFLAG:302  = 1（变量语义：CFLAG 族，302）\n      kojo.舔阴 = 2; // （变异）',
    tests: ['kojo-k2-timid'],
    must_mention: 'CFLAG:302',
  },
  {
    desc: 'M1556 K2 正常位首次推进写错（CFLAG:321 = 1 改 2）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '      kojo.正常位 = 1;',
    replace: '      kojo.正常位 = 2; // （变异）',
    tests: ['kojo-k2-timid'],
    must_mention: 'CFLAG:321',
  },
  {
    desc: 'M1557 K2 穿环首次推进写错（CFLAG:348 = 1 改 2）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '      kojo.穿环 = 1;',
    replace: '      kojo.穿环 = 2; // （变异）',
    tests: ['kojo-k2-timid'],
    must_mention: 'CFLAG:348',
  },
  {
    desc: 'M1558 K2 EVENTTRAIN 初调教推进写错（CFLAG:201 = 1 改 2）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '      kojo.初调教 = 1;\n      return 1;',
    replace: '      kojo.初调教 = 2; // （变异）\n      return 1;',
    tests: ['kojo-k2-timid'],
    must_mention: 'CFLAG:201',
  },
  {
    desc: 'M1559 K2 EVENTEND 屈服低档爱慕条件反相（TALENT:85 == 0 改 == 1）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '    (era.get(`mark:${target}:2`) || 0) <= 1 &&\n    era.get(`talent:${target}:85`) === 0\n  ) {',
    replace:
      '    (era.get(`mark:${target}:2`) || 0) <= 1 &&\n    era.get(`talent:${target}:85`) === 1\n  ) {',
    tests: ['kojo-k2-timid'],
    must_mention: 'EVENTEND 普通档必须出声',
  },
  {
    desc: 'M1561 K2 死斗场专用口上入口错号（SELECTCOM == 55 改 54）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '  if (era_flag.selectcom === 55) {\n    if (era.get(`base:${target}:1`) <= 0) {',
    replace:
      '  if (era_flag.selectcom === 54) {\n    if (era.get(`base:${target}:1`) <= 0) {',
    tests: ['kojo-k2-timid'],
    must_mention: 'COLOSSEUM_KOJO_2 在 selectcom=55',
  },
  {
    desc: 'M1562 K2 DOG_KOJO 首次推进写错（CFLAG:301 = 1 改 2）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '        await era.printAndWait(`「呓……」`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 1;',
    replace:
      '        await era.printAndWait(`「呓……」`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 2; // （变异）',
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
    find: '  if (choice === 0) {\n    await era.printAndWait(`「哇…我知道了…」`);',
    replace:
      '  if (choice === 9) {\n    await era.printAndWait(`「哇…我知道了…」`);',
    tests: ['kojo-k2-timid'],
    must_mention: '哇…我知道了',
  },
  {
    desc: 'M1566 K2 惩罚口上 choice == 0 改 9（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '  if (choice === 0) {\n    await era.printAndWait(`「谢谢……」`);',
    replace: '  if (choice === 9) {\n    await era.printAndWait(`「谢谢……」`);',
    tests: ['kojo-k2-timid'],
    must_mention: '惩罚口上',
  },
  {
    desc: 'M1567 K2 NTR 入口推进写错（CFLAG:650 = 1 改 2）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '    kojo.NTR再捕获 = 1;',
    replace: '    kojo.NTR再捕获 = 2; // （变异）',
    tests: ['kojo-k2-timid'],
    must_mention: 'CFLAG:650',
  },
  {
    desc: 'M1568 K2 SELF_KOJO leftover_q 助手支入口错档（Q === 1 改 9）（#233）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '    if (Q === 1) {',
    replace: '    if (Q === 9) {',
    tests: ['kojo-k2-timid'],
    must_mention: 'SELF_KOJO 助手妄想支出声',
  },
  // —— #237（J27）：K6 悪女 口上模块。原号段 M1780-M1806，与 #236/#288 撞号
  // 的一段（原 M1790-M1806）已改到 M2119/M2121-M2136（#295 消重，只改后来者）——
  {
    desc: 'M1780 K6 COM 助手调教检查删（ASSIPLAY 不再跳过，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '  if (era_flag.assi > 0 && era_flag.assiplay) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {',
    replace:
      '  if (false) {\n    // 变异\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {',
    tests: ['kojo-k6-wicked'],
    must_mention: '助手调教（ASSI > 0 && ASSIPLAY）：静默跳过',
  },
  {
    desc: 'M1781 K6 COM 口塞检查删（TEQUIP:45 不再跳过，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {\n    return 0;\n  }',
    replace:
      '  if (false && era_flag.selectcom !== 45) {\n    // 变异\n    return 0;\n  }',
    tests: ['kojo-k6-wicked'],
    must_mention: '口塞（TEQUIP:45 且非指令45）：静默跳过',
  },
  {
    desc: 'M1782 K6 COM 失神检查删（TFLAG:899 不再跳过，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '  if (game.train.失神) {\n    return 0;\n  }\n\n  if ((era.get(`talent:${target}:9`) || 0) === 1) {',
    replace:
      '  if (false) {\n    // 变异\n    return 0;\n  }\n\n  if ((era.get(`talent:${target}:9`) || 0) === 1) {',
    tests: ['kojo-k6-wicked'],
    must_mention: '失神（TFLAG:899）：静默跳过',
  },
  {
    desc: 'M1783 K6 COM 崩坏检查删（TALENT:9 不再跳过，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '  if ((era.get(`talent:${target}:9`) || 0) === 1) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:89`)) {',
    replace:
      '  if (false) {\n    // 变异\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:89`)) {',
    tests: ['kojo-k6-wicked'],
    must_mention: '崩坏（TALENT:9）：静默跳过',
  },
  {
    desc: 'M1784 K6 兽奸检查岔路丢失（TEQUIP:89 不再调 DOG_KOJO_6，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '  if (era.get(`tequip:${target}:89`)) {\n    await dog_kojo_6(rand_n); // CALL DOG_KOJO_6\n    return 0;\n  }',
    replace:
      '  if (era.get(`tequip:${target}:89`)) {\n    return 0; // 变异\n  }',
    tests: ['kojo-k6-wicked'],
    must_mention: '兽奸（TEQUIP:89）：岔进本文件真身 DOG_KOJO_6',
  },
  {
    desc: 'M1785 K6 死斗场检查岔路丢失（TEQUIP:55 不再调 COLOSSEUM_KOJO_6，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '  if (era.get(`tequip:${target}:55`)) {\n    await colosseum_kojo_6(rand_n); // CALL COLOSSEUM_KOJO_6\n    return 0;\n  }',
    replace:
      '  if (era.get(`tequip:${target}:55`)) {\n    return 0; // 变异\n  }',
    tests: ['kojo-k6-wicked'],
    must_mention: '死斗场（TEQUIP:55）：岔进本文件真身 COLOSSEUM_KOJO_6',
  },
  {
    desc: 'M1786 K6 爱撫初回推进写错（CFLAG:301 = 1 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        await era.printAndWait(`${target_name}厌恶地扭动着身体………`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 1;',
    replace:
      '        await era.printAndWait(`${target_name}厌恶地扭动着身体………`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 2; // （变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '爱撫初回 CFLAG:301 = 1',
  },
  {
    desc: 'M1787 K6 爱撫淫乱档推进写错（CFLAG:301 = 6 改 5，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        );\n        // CFLAG:301  = 6（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 6;',
    replace:
      '        );\n        // CFLAG:301  = 6（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 5; // （变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '淫乱 TALENT:76 → CFLAG:301 = 6',
  },
  {
    desc: 'M1788 K6 爱撫爱慕档推进写错（CFLAG:301 = 5 改 4，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        );\n        // CFLAG:301  = 5（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 5;',
    replace:
      '        );\n        // CFLAG:301  = 5（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 4; // （变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '爱慕 TALENT:85 → CFLAG:301 = 5',
  },
  {
    desc: 'M1789 K6 爱撫屈服Lv3档推进写错（CFLAG:301 = 4 改 3，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        await era.printAndWait(`${target_name}的身体被爱抚着………`);\n        // CFLAG:301  = 4（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 4;',
    replace:
      '        await era.printAndWait(`${target_name}的身体被爱抚着………`);\n        // CFLAG:301  = 4（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 3; // （变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '屈服刻印 Lv3 → CFLAG:301 = 4',
  },
  {
    desc: 'M2119 K6 爱撫屈服Lv2档推进写错（CFLAG:301 = 3 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        await era.printAndWait(`${target_name}的身体被爱抚着………`);\n        // CFLAG:301  = 3（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 3;',
    replace:
      '        await era.printAndWait(`${target_name}的身体被爱抚着………`);\n        // CFLAG:301  = 3（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 2; // （变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '屈服刻印 Lv2 → CFLAG:301 = 3',
  },
  {
    desc: 'M2121 K6 爱撫それ以外档推进写错（CFLAG:301 = 2 改 1，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        await era.printAndWait(`${target_name}在爱抚过程中厌恶地扭动着身体………`);\n        // CFLAG:301  = 2（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 2;',
    replace:
      '        await era.printAndWait(`${target_name}在爱抚过程中厌恶地扭动着身体………`);\n        // CFLAG:301  = 2（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 1; // （变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: 'それ以外 → CFLAG:301 = 2',
  },
  {
    desc: 'M2122 K6 阶段耗尽静默锁删（FLAG:7 == 1 时也出声，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '      if (\n        (era.get(`talent:${target}:76`) || 0) === 1 &&\n        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '      if (\n        (era.get(`talent:${target}:76`) || 0) === 1 &&\n        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 1)\n      ) {\n        // 变异',
    tests: ['kojo-k6-wicked'],
    must_mention: 'FLAG:7 == 1 阶段耗尽后不出声',
  },
  {
    desc: 'M2123 K6 舔阴首次推进写错（CFLAG:302 = 1 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        );\n      }\n      // CFLAG:302  = 1（变量语义：CFLAG 族，302）\n      kojo.舔阴 = 1;',
    replace:
      '        );\n      }\n      // CFLAG:302  = 1（变量语义：CFLAG 族，302）\n      kojo.舔阴 = 2; // （变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '舔陰初回 CFLAG:302 = 1',
  },
  {
    desc: 'M2124 K6 自己扒开首次推进写错（CFLAG:308 = 1 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '      kojo.自己扒开 = 1;',
    replace: '      kojo.自己扒开 = 2; // （变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '自己扒开初回 CFLAG:308 = 1',
  },
  {
    desc: 'M2125 K6 胸爱抚首次推进写错（CFLAG:306 = 1 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        }\n      }\n      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）\n      kojo.胸爱抚 = 1;',
    replace:
      '        }\n      }\n      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）\n      kojo.胸爱抚 = 2; // （变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '胸爱抚初回 CFLAG:306 = 1',
  },
  {
    desc: 'M2126 K6 EVENTTRAIN 初调教推进写错（CFLAG:201 = 1 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '      kojo.初调教 = 1;\n      return 1;',
    replace: '      kojo.初调教 = 2; // （变异）\n      return 1;',
    tests: ['kojo-k6-wicked'],
    must_mention: '初調教推进到 1',
  },
  {
    desc: 'M2127 K6 EVENTEND 反抗刻印台词改（去死吧！，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '    await era.printAndWait(`「去死吧！」`);',
    replace: '    await era.printAndWait(`「滚开吧！」`); // 变异',
    tests: ['kojo-k6-wicked'],
    must_mention: '反抗刻印Lv3 终了出声',
  },
  {
    desc: 'M2128 K6 DOG_KOJO 首次推进写错（CFLAG:301 = 1 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        await era.printAndWait(`「滚开！　你这蠢狗！」`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 1;',
    replace:
      '        await era.printAndWait(`「滚开！　你这蠢狗！」`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 2; // （变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '兽奸爱撫初回（DOG_KOJO_6 CFLAG:301 == 0 且 MARK:2 < 2）',
  },
  {
    desc: 'M2129 K6 PALAMCNG 处女丧失的 A 加算改错（UP:12 丢，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '  A =\n    (era.get(`delta:${target}:11`) || 0) + (era.get(`delta:${target}:12`) || 0); // UP:11 + UP:12',
    replace: `  A =
    (era.get(\`delta:\${target}:11\`) || 0); // 变异：丢 UP:12`,
    tests: ['kojo-k6-wicked'],
    must_mention: '处女丧失 A >= 500 落それ以外档（UP:12 参与加算）',
  },
  {
    desc: 'M2130 K6 MARKCNG 苦痛刻印取得推进写错（CFLAG:297 = 1 改 0，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '    kojo.苦痛刻印Lv3 = 1;',
    replace: '    kojo.苦痛刻印Lv3 = 0; // （变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: '苦痛刻印Lv3 CFLAG:297 = 1',
  },
  {
    desc: 'M2131 K6 NTR 入口推进写错（CFLAG:650 = 1 改 2，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '    kojo.NTR再捕获 = 1;',
    replace: '    kojo.NTR再捕获 = 2; // （变异）',
    tests: ['kojo-k6-wicked'],
    must_mention: 'CFLAG:650',
  },
  {
    desc: 'M2132 K6 奖赏后口上 choice == 0 改 9（#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '  if (choice === 0) {\n    await era.printAndWait(`「这样的事情可不能长久」`);',
    replace:
      '  if (choice === 9) {\n    // 变异\n    await era.printAndWait(`「这样的事情可不能长久」`);',
    tests: ['kojo-k6-wicked'],
    must_mention: '这样的事情可不能长久',
  },
  {
    desc: 'M2133 K6 惩罚口上 choice == 0 改 9（#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '  if (choice === 0) {\n    await era.printAndWait(\n      `「${self_call_first(a)}、${self_call(a)}这就回房间」`,',
    replace:
      '  if (choice === 9) {\n    // 变异\n    await era.printAndWait(\n      `「${self_call_first(a)}、${self_call(a)}这就回房间」`,',
    tests: ['kojo-k6-wicked'],
    must_mention: '惩罚口上',
  },
  {
    desc: 'M2134 K6 SELF_KOJO leftover_q 助手支入口错档（Q === 1 改 9，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '    } else if (Q === 1) {',
    replace: '    } else if (Q === 9) {\n      // 变异',
    tests: ['kojo-k6-wicked'],
    must_mention: 'SELF_KOJO 助手妄想支出声',
  },
  {
    desc: 'M2136 K6 SELF_KOJO leftover_s 回数门槛错档（S >= 3 改 99，#237）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '      if (S >= 3) {',
    replace: '      if (S >= 99) {\n        // 变异',
    tests: ['kojo-k6-wicked'],
    must_mention: 'leftover_s 回数插值',
  },
  // —— #236（J26）：K5 マオ 口上模块（M1790-M1814 号段） ——
  {
    desc: 'M1790 K5 舔阴首次推进写错（CFLAG:302 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.舔阴 = 1;',
    replace: '      kojo.舔阴 = 2; // （变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'CFLAG:302 = 1',
  },
  {
    desc: 'M1791 K5 肛门爱抚首次推进写错（CFLAG:303 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.肛门爱抚 = 1;',
    replace: '      kojo.肛门爱抚 = 2; // （变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'CFLAG:303 = 1',
  },
  {
    desc: 'M1792 K5 胸爱抚首次推进写错（CFLAG:306 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.胸爱抚 = 1;',
    replace: '      kojo.胸爱抚 = 2; // （变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'CFLAG:306 = 1',
  },
  {
    desc: 'M1793 K5 正常位首次推进写错（CFLAG:321 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.正常位 = 1;',
    replace: '      kojo.正常位 = 2; // （变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'CFLAG:321 = 1',
  },
  {
    desc: 'M1794 K5 口塞首次推进写错（CFLAG:346 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.口塞 = 1;',
    replace: '      kojo.口塞 = 2; // （变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'cflag:17:346',
  },
  {
    desc: 'M1795 K5 穿环首次推进写错（CFLAG:348 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.穿环 = 1;',
    replace: '      kojo.穿环 = 2; // （变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'CFLAG:348 = 1',
  },
  {
    desc: 'M1796 K5 死斗场入口错号（SELECTCOM == 55 改 54）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  if (era_flag.selectcom === 55) {\n    if (era.get(`base:${target}:1`) <= 0) {',
    replace:
      '  if (era_flag.selectcom === 54) {\n    if (era.get(`base:${target}:1`) <= 0) {',
    tests: ['kojo-k5-mao'],
    must_mention: 'SELECTCOM==0 静默、==55 走真身',
  },
  {
    desc: 'M1797 K5 PALAMCNG 处女丧失推进写错（CFLAG:229 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '    kojo.处女丧失 = 1;',
    replace: '    kojo.处女丧失 = 2; // （变异）',
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
    find: '      if (era.get(`talent:${target}:314`) === 9) {\n        if (S >= 1000000) {\n          await era.printAndWait(\n            `被魔界的某位贵族买下的${target_name}、在这之后………`,',
    replace:
      '      if (era.get(`talent:${target}:314`) === 9) {\n        if (S >=2000000) {\n          await era.printAndWait(\n            `被魔界的某位贵族买下的${target_name}、在这之后………`,',
    tests: ['kojo-k5-mao'],
    must_mention: '被魔界的某位贵族买下',
  },
  {
    desc: 'M1801 K5 NTR 入口推进写错（CFLAG:650 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '    kojo.NTR再捕获 = 1;',
    replace: '    kojo.NTR再捕获 = 2; // （变异）',
    tests: ['kojo-k5-mao'],
    must_mention: 'CFLAG:650/651',
  },
  {
    desc: 'M1802 K5 GOBI 档位 1 的槽位改错（原 arg_0 === 1 分支随 #865 并入常量表，#236）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "    tiers: ['的噢~♪', '的啊！', '来着……。', '来的呢……。', '的啊……。'],",
    replace:
      "    tiers: ['的噢', '的啊！', '来着……。', '来的呢……。', '的啊……。'], // 变异：档位 1 不再落这一支",
    tests: ['kojo-k5-mao'],
    must_mention: '的噢~♪',
  },
  {
    desc: 'M1803 K5 奖赏后口上 choice == 0 改 9（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  if (choice === 0) {\n    await era.printAndWait(`「真小气！」`);',
    replace:
      '  if (choice === 9) {\n    await era.printAndWait(`「真小气！」`);',
    tests: ['kojo-k5-mao'],
    must_mention: '真小气',
  },
  {
    desc: 'M1804 K5 惩罚口上 choice == 0 改 9（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  if (choice === 0) {\n    await era.printAndWait(`「十、十分感谢！十分感谢您！」`);',
    replace:
      '  if (choice === 9) {\n    await era.printAndWait(`「十、十分感谢！十分感谢您！」`);',
    tests: ['kojo-k5-mao'],
    must_mention: '十分感谢',
  },
  {
    desc: 'M1805 K5 迷宫胜利淫乱入口错格（TALENT:76 改 77）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  if (era.get(`talent:${a}:76`) === 1) {\n    await era.printAndWait(`「啊哈哈…快点来侵犯我啊…${heart(1)}」`);',
    replace:
      '  if (era.get(`talent:${a}:77`) === 1) {\n    await era.printAndWait(`「啊哈哈…快点来侵犯我啊…${heart(1)}」`);',
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
    desc: 'M1807 K5 COM 口塞检查删（TEQUIP:45 不再跳过）（#236）',
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
    desc: 'M1808 K5 COM 兽奸检查删（TEQUIP:89 不再跳过）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  // 獣姦プレイ中（K5 是静默跳过，无 DOG_KOJO 调用）\n  if (era.get(`tequip:${target}:89`)) {\n    return 0;\n  }',
    replace:
      '  // 獣姦プレイ中（K5 是静默跳过，无 DOG_KOJO 调用）\n  if (false) {\n    return 0;\n  }',
    tests: ['kojo-k5-mao'],
    must_mention: 'K5 是静默跳过',
  },
  {
    desc: 'M1809 K5 COM 死斗场岔路丢失（TEQUIP:55 不再调 COLOSSEUM）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  if (era.get(`tequip:${target}:55`)) {\n    await colosseum_kojo_5(rand_n);\n    return 0;\n  }',
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
    find: '  if (game.train.初吻与自我口上 === 1) {',
    replace: '  if (game.train.初吻与自我口上 === 9) {',
    tests: ['kojo-k5-mao'],
    must_mention: 'SELF_KOJO 自慰支出声',
  },
  {
    desc: 'M1812 K5 奖赏请求钱档入口错（要求奖赏 === 0 改 9）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '\n  if (chara(a).stronghold.要求奖赏 === 0) {',
    replace: '\n  if (chara(a).stronghold.要求奖赏 === 9) {',
    tests: ['kojo-k5-mao'],
    must_mention: '尽可能多的钱',
  },
  {
    desc: 'M1813 K5 NTR P==1 入口错档（P === 1 改 9）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '\n  if (P === 1) {',
    replace: '\n  if (P === 9) {',
    tests: ['kojo-k5-mao'],
    must_mention: '我明明只是个村娘',
  },
  {
    desc: 'M1814 K5 EVENTTRAIN 人类初调教推进写错（CFLAG:201 = 1 改 2）（#236）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '      kojo.初调教 = 1;\n      return 1;',
    replace: '      kojo.初调教 = 2; // （变异）\n      return 1;',
    tests: ['kojo-k5-mao'],
    must_mention: '推进 CFLAG:201',
  },

  {
    desc: 'M2118 K3 顶层 require com-hardcore（延迟 require 挪回文件头，#288）',
    file: 'ere/kojo/kojo-k3-noble.js',
    find: "const era = require('#/era-electron');",
    replace: `const era = require('#/era-electron');
const { piercing_state } = require('#/system/train/com-hardcore'); // 变异：顶层 require（#288 检查的目标）`,
    tests: ['top-level-wiring'],
    must_mention: '顶层 require：ere/kojo/kojo-k3-noble.js',
  },
  {
    desc: 'M2120 com-tentacle 顶层 require com-colosseum（延迟 require 挪回文件头，#288）',
    file: 'ere/system/train/com-tentacle.js',
    find: "const era = require('#/era-electron');",
    replace: `const era = require('#/era-electron');
const { arena_slave_point, com_after_arena } = require('#/system/train/com-colosseum'); // 变异：顶层 require（#288 检查的目标）`,
    tests: ['top-level-wiring'],
    must_mention: '顶层 require：ere/system/train/com-tentacle.js',
  },

  // —— #238（J28）：K7 ハート 口上模块（M2000-M2069 号段） ——
  {
    desc: 'M2002 K7 初調教人间分档推进值错（CFLAG:201 = 1 改 2，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: "    era.set(`cflag:${target}:201`, 1);\n    await era.print('');",
    replace:
      "    era.set(`cflag:${target}:201`, 2); // （变异）\n    await era.print('');",
    tests: ['kojo-k7-heart'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M2003 K7 初調教魔族分档条件错格（TALENT:314 == 9 改 8，#238）',
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
    find: 'era.set(`cflag:${target}:370`, 2);',
    replace: 'era.set(`cflag:${target}:370`, 3); // （变异）',
    tests: ['kojo-k7-heart'],
    must_mention: '魔族化',
  },
  {
    desc: 'M2005 K7 NTR再捕獲爱慕支解除标记写错（CFLAG:650 = 0 改 1，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '      era.set(`cflag:${target}:650`, 0); // NTRスイッチ解除\n    } else if (era0(`talent:${target}:76`)) {',
    replace:
      '      era.set(`cflag:${target}:650`, 1); // （变异）\n    } else if (era0(`talent:${target}:76`)) {',
    tests: ['kojo-k7-heart'],
    must_mention: 'NTR再捕獲',
  },
  {
    desc: 'M2006 K7 屈服刻印Lv1推进值错（CFLAG:201 = 2 改 3，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: 'era.set(`cflag:${target}:201`, 2);',
    replace: 'era.set(`cflag:${target}:201`, 3); // （变异）',
    tests: ['kojo-k7-heart'],
    must_mention: '屈服刻印',
  },
  {
    desc: 'M2007 K7 屈服刻印Lv3推进值错（CFLAG:201 = 4 改 5，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: 'era.set(`cflag:${target}:201`, 4);',
    replace: 'era.set(`cflag:${target}:201`, 5); // （变异）',
    tests: ['kojo-k7-heart'],
    must_mention: '屈服刻印',
  },
  {
    desc: 'M2008 K7 淫乱推进值错（CFLAG:201 = 5 改 6，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: 'era.set(`cflag:${target}:201`, 5);',
    replace: 'era.set(`cflag:${target}:201`, 6); // （变异）',
    tests: ['kojo-k7-heart'],
    must_mention: '处女附注',
  },
  {
    desc: 'M2009 K7 爱慕推进值错（CFLAG:201 = 7 改 8，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: 'era.set(`cflag:${target}:201`, 7);',
    replace: 'era.set(`cflag:${target}:201`, 8); // （变异）',
    tests: ['kojo-k7-heart'],
    must_mention: '爱慕',
  },
  {
    desc: 'M2010 K7 崩坏推进值错（CFLAG:201 = 9 改 8，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: 'era.set(`cflag:${target}:201`, 9);',
    replace: 'era.set(`cflag:${target}:201`, 8); // （变异）',
    tests: ['kojo-k7-heart'],
    must_mention: '崩坏',
  },
  {
    desc: 'M2011 K7 崩坏只播一次检查删松（CFLAG:201 < 9 改 <= 9，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era0(\`talent:\${target}:9\`) == 1 &&
    era0(\`cflag:\${target}:201\`) < 9
  ) {
    // 崩坏`,
    replace: `era0(\`talent:\${target}:9\`) == 1 &&
    era0(\`cflag:\${target}:201\`) <= 9 // 变异：检查删松
  ) {
    // 崩坏`,
    tests: ['kojo-k7-heart'],
    must_mention: '崩坏只播一次',
  },
  {
    desc: 'M2012 K7 无名助手条件错格（TALENT:MASTER:122 == 0 改 1，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era0(\`talent:0:122\`) == 0) {`,
    replace: `era0(\`talent:0:122\`) == 1) {  // 变异`,
    tests: ['kojo-k7-heart'],
    must_mention: 'K7_KOJO2',
  },
  {
    desc: 'M2013 K7 EVENTEND 死亡检查删松（BASE:0 <= 0 改 < 0，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `era0(\`base:\${target}:0\`) <= 0) {`,
    replace: `era0(\`base:\${target}:0\`) < 0) {  // 变异`,
    tests: ['kojo-k7-heart'],
    must_mention: '死亡检查',
  },
  {
    desc: 'M2014 K7 EVENTEND 崩坏条件错格（FLAG:7 == 2 改 3，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: "if (era0(`talent:${target}:9`) == 1 && era0('flag:7') == 2) {\n    // 崩坏\n    era.drawLine();\n    await era.printAndWait(`「不…讨厌…怪物的孩子不要生下来…不要………」`);",
    replace:
      "if (era0(`talent:${target}:9`) == 1 && era0('flag:7') == 3) {\n    // 崩坏（变异：FLAG:7 条件错格）\n    era.drawLine();\n    await era.printAndWait(`「不…讨厌…怪物的孩子不要生下来…不要………」`);",
    tests: ['kojo-k7-heart'],
    must_mention: 'EVENTEND 崩坏',
  },
  {
    desc: 'M2015 K7 EVENTEND 淫乱体力分档阈值错（BASE:0 >= 500 改 >= 700，#238）',
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
    find: '        era.set(`cflag:${target}:202`, 2);\n      } else if (\n        era0(`talent:${target}:76`) == 1 &&',
    replace:
      '        era.set(`cflag:${target}:202`, 3); // （变异）\n      } else if (\n        era0(`talent:${target}:76`) == 1 &&',
    tests: ['kojo-k7-heart'],
    must_mention: '爱取得済み分档',
  },
  {
    desc: 'M2017 K7 助手白梅花检查删除（TALENT:ASSI:121 == 0 改恒 false，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `if (era0(\`talent:\${assi}:121\`) == 0) {
      return 0;
    }`,
    replace: `if (false) {  // 变异：白梅花检查删除
      return 0;
    }`,
    tests: ['kojo-k7-heart'],
    must_mention: '静默跳过',
  },
  {
    desc: 'M2019 K7 头部检查①：ASSI>0&&ASSIPLAY 删除（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '// 助手调教时跳过\n  if (era_flag.assi > 0 && era_flag.assiplay) {\n    return 0;\n  }',
    replace:
      '// 助手调教时跳过\n  if (false) {  // 变异：助手调教检查删除\n    return 0;\n  }',
    tests: ['kojo-k7-heart'],
    must_mention: '头部第 1 道检查',
  },
  {
    desc: 'M2020 K7 头部检查②：TEQUIP:45 口塞检查删除（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '// 口塞着用时跳过（SELECTCOM == 45 自己说话不算）\n  if (era0(`tequip:${target}:45`) && era_flag.selectcom !== 45) {\n    return 0;\n  }',
    replace:
      '// 口塞着用时跳过（SELECTCOM == 45 自己说话不算）\n  if (false) {  // 变异：口塞检查删除\n    return 0;\n  }',
    tests: ['kojo-k7-heart'],
    must_mention: '头部第 2 道检查',
  },
  {
    desc: 'M2021 K7 头部检查③：TFLAG:899 失神删除（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: "// 失神时跳过\n  if (era0('tflag:899')) {\n    return 0;\n  }",
    replace:
      '// 失神时跳过\n  if (false) {  // 变异：失神检查删除\n    return 0;\n  }',
    tests: ['kojo-k7-heart'],
    must_mention: '头部第 3 道检查',
  },
  {
    desc: 'M2022 K7 头部检查④：TEQUIP:89 不再岔去 DOG_KOJO_7（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '// 兽奸PLAY中是专用口上——岔去本文件真身\n  if (era0(`tequip:${target}:89`)) {\n    await dog_kojo_7(rand_n);\n    return 0;\n  }',
    replace:
      '// 兽奸PLAY中是专用口上——岔去本文件真身\n  if (false) {  // 变异：兽奸岔出删除\n    await dog_kojo_7(rand_n);\n    return 0;\n  }',
    tests: ['kojo-k7-heart'],
    must_mention: 'DOG_KOJO_7',
  },
  {
    desc: 'M2023 K7 头部检查⑤：TEQUIP:55 不再岔去 COLOSSEUM_KOJO_7（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '// 死斗场中是专用口上——岔去本文件真身\n  if (era0(`tequip:${target}:55`)) {\n    await colosseum_kojo_7(rand_n);\n    return 0;\n  }',
    replace:
      '// 死斗场中是专用口上——岔去本文件真身\n  if (false) {  // 变异：死斗场岔出删除\n    await colosseum_kojo_7(rand_n);\n    return 0;\n  }',
    tests: ['kojo-k7-heart'],
    must_mention: 'COLOSSEUM_KOJO_7',
  },
  {
    desc: 'M2024 K7 头部检查⑥：TALENT:9 崩坏删除（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '// 崩坏时跳过\n  if (era0(`talent:${target}:9`) == 1) {\n    return 0;\n  }',
    replace:
      '// 崩坏时跳过\n  if (false) {  // 变异：崩坏检查删除\n    return 0;\n  }',
    tests: ['kojo-k7-heart'],
    must_mention: '头部第 6 道检查',
  },
  {
    desc: 'M2025 K7 头部检查⑦：TEQUIP:90 触手删除（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '// 触手调教中跳过\n  if (era0(`tequip:${target}:90`)) {\n    return 0;\n  }',
    replace:
      '// 触手调教中跳过\n  if (false) {  // 变异：触手检查删除\n    return 0;\n  }',
    tests: ['kojo-k7-heart'],
    must_mention: '头部第 7 道检查',
  },
  {
    desc: 'M2026 K7 SELECTCOM==0 爱抚初回推进值错（CFLAG:301 = 1 改 2，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '        }\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      era.set(`cflag:${target}:301`, 1);',
    replace:
      '        }\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      era.set(`cflag:${target}:301`, 2); // （变异）',
    tests: ['kojo-k7-heart'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M2027 K7 SELECTCOM==87 穿环 p==1 条件错格（改 p==9，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '            `${target_name}因为皮肤第一次被打孔而痛的不禁皱着眉。`,\n          );\n\n          if (p == 1) {\n            await era.printAndWait(\n              `「啊啊…敏感度上升了啊…来吧拉一下试试吧…${heart(1)}」`,\n            );',
    replace:
      '            `${target_name}因为皮肤第一次被打孔而痛的不禁皱着眉。`,\n          );\n\n          if (p == 9) {  // 变异\n            await era.printAndWait(\n              `「啊啊…敏感度上升了啊…来吧拉一下试试吧…${heart(1)}」`,\n            );',
    tests: ['kojo-k7-heart'],
    must_mention: 'piercing_state',
  },
  {
    desc: 'M2028 K7 COLOSSEUM ITEM:4 回退成 ITEM:PBAND 具名寻址（#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `      const assi_dildo_8257 = !assi_has_penis_8255 && era0('item:4') == 1;`,
    replace: `      const assi_dildo_8257 = !assi_has_penis_8255 && era0('item:PBAND') == 1; // 变异：回退字符串具名寻址`,
    tests: ['kojo-k7-heart'],
    must_mention: '非字符串具名寻址',
  },
  {
    desc: 'M2029 K7 PALAMCNG 首超阈值状态写错（CFLAG:221 = 1 改 2，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: 'era.set(`cflag:${target}:221`, 1);',
    replace: 'era.set(`cflag:${target}:221`, 2); // （变异）',
    tests: ['kojo-k7-heart'],
    must_mention: '首次超过',
  },
  {
    desc: 'M2030 K7 MARKCNG 苦痛刻印Lv3条件错格（TFLAG:22 == 3 改 4，#238）',
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
    desc: 'M2033 K7 DUNGEON_RYOUZYOKU 处女条件错格（TALENT:0 == 1 改 2，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '  if (era0(`talent:${target}:0`) == 1) {\n    await era.printAndWait(`「能夺走我处女的幸运儿会是谁呢？」`);',
    replace:
      '  if (era0(`talent:${target}:0`) == 2) {  // 变异\n    await era.printAndWait(`「能夺走我处女的幸运儿会是谁呢？」`);',
    tests: ['kojo-k7-heart'],
    must_mention: '迷宫败北与凌辱结束口上',
  },
  {
    desc: 'M2034 K7 GOHOUBI_REQUEST CFLAG:A:504 条件错格（== 0 改 1，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: 'if (era0(`cflag:${cid}:504`) == 0) {\n    await era.printAndWait(`「说道奖励当然想要钱了」`);',
    replace:
      'if (era0(`cflag:${cid}:504`) == 1) {  // 变异\n    await era.printAndWait(`「说道奖励当然想要钱了」`);',
    tests: ['kojo-k7-heart'],
    must_mention: '请求金钱',
  },
  {
    desc: 'M2035 K7 GOHOUBI_AFTER choice==0 条件错格（改 choice==9，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `async function gohoubi_after_koujo_k7(cid, choice) {
  if (choice == 0) {`,
    replace: `async function gohoubi_after_koujo_k7(cid, choice) {
  if (choice == 9) {  // 变异`,
    tests: ['kojo-k7-heart'],
    must_mention: 'TFLAG:18 改经 choice',
  },
  {
    desc: 'M2036 K7 OSIOKI choice==6 条件错格（改 choice==16，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '} else if (choice == 6) {\n    await era.printAndWait(`「好臭啊………」`);',
    replace:
      '} else if (choice == 16) {  // 变异\n    await era.printAndWait(`「好臭啊………」`);',
    tests: ['kojo-k7-heart'],
    must_mention: '好臭啊',
  },
  {
    desc: 'M2037 K7 GOBI 悲档槽位改错（原 arg_0==3 分支随 #865 并入常量表，#238）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "    tiers: ['哇~♡', '什么啊！', '哦……。', '真是……唉。', '唉……。'],",
    replace:
      "    tiers: ['哇~♡', '什么啊！', '哦……！', '真是……唉。', '唉……。'], // 变异",
    tests: ['kojo-k7-heart'],
    must_mention: 'ARG:0 取语尾编号',
  },
  {
    desc: 'M2038 K7 BENKI 门面 game.train.肉便器行动 条件错格（== 0 改 1，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: `if (game.train.肉便器行动 == 0) {
    if (era0(\`talent:\${target}:76\`) == 1) {`,
    replace: `if (game.train.肉便器行动 == 1) {  // 变异
    if (era0(\`talent:\${target}:76\`) == 1) {`,
    tests: ['kojo-k7-heart'],
    must_mention: '门面 game.train.肉便器行动',
  },
  {
    desc: 'M2039 K7 ENTERENEMY 爱慕条件错格（TALENT:85 == 1 改 2，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '} else if (era0(`talent:${a}:85`) == 1) {\n    await era.printAndWait(\n      `「啊啊…魔王大人。现、现在就去见你了.....${heart(1)}」`,\n    );',
    replace:
      '} else if (era0(`talent:${a}:85`) == 2) {  // 变异\n    await era.printAndWait(\n      `「啊啊…魔王大人。现、现在就去见你了.....${heart(1)}」`,\n    );',
    tests: ['kojo-k7-heart'],
    must_mention: '来袭口上按角色素质分岔',
  },
  {
    desc: 'M2040 K7 NTR_KOUJO 首次标记写错（CFLAG:650 = 1 改 2，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: 'era.set(`cflag:${target}:650`, 1);',
    replace: 'era.set(`cflag:${target}:650`, 2); // （变异）',
    tests: ['kojo-k7-heart'],
    must_mention: '首次经 CFLAG:650 标记',
  },
  {
    desc: 'M2041 K7 EXUCUTION 处分方式 条件错格（== 5 改 6，#238；6 支已有台词，改后仍会输出但文本不同，红在断言精确台词）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '} else if (event_no == 5) {\n    await era.printAndWait(`「下达命令…主人………」`);',
    replace:
      '} else if (event_no == 6) {  // 变异\n    await era.printAndWait(`「下达命令…主人………」`);',
    tests: ['kojo-k7-heart'],
    must_mention: '注册且可调用',
  },
  {
    desc: 'M2042 K7 BANISHMENT 处分号 条件错格（== 0 改 1，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: 'if (event_no == 0) {\n    await era.printAndWait(`「回不去了…狂王大人那里…已经回不去了………」`);',
    replace:
      'if (event_no == 1) {  // 变异\n    await era.printAndWait(`「回不去了…狂王大人那里…已经回不去了………」`);',
    tests: ['kojo-k7-heart'],
    must_mention: '回不去了',
  },
  {
    desc: 'M2043 K7 PUBLIC_EXUCUTION 处分号 条件错格（== 1 改 2，#238）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '} else if (event_no == 1) {\n    await era.printAndWait(`「这里…这个绞刑台是我最后的舞台吗…」`);',
    replace:
      '} else if (event_no == 2) {  // 变异\n    await era.printAndWait(`「这里…这个绞刑台是我最后的舞台吗…」`);',
    tests: ['kojo-k7-heart'],
    must_mention: '绞刑台',
  },
  {
    desc: 'M2044 K7 GROTESQUE 处分方式 条件错格（== 0 改 1，#238；源全空，红在分支路由而非文本）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: "async function grotesque_koujo_k7(event_no) {\n  if (event_no == 0) {\n    await era.printAndWait('');",
    replace:
      "async function grotesque_koujo_k7(event_no) {\n  if (event_no == 1) {  // 变异\n    await era.printAndWait('');",
    tests: ['kojo-k7-heart'],
    must_mention: 'GROTESQUE_KOUJO_K7',
  },
  // —— #242（J32）：K11 莉莉口上模块 WIP 1/N（M2340-M2376 号段） ——
  {
    desc: 'M2347 魔族化推进写错（CFLAG:400 = 2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: "    // 魔族化（１回のみ，初回调教后、陷落前）\n    await era.printAndWait(''); // PRINTFORMW 空行\n    kojo.魔族化_K11 = 2;\n    return 1;",
    replace:
      "    // 魔族化（１回のみ，初回调教后、陷落前）\n    await era.printAndWait(''); // PRINTFORMW 空行\n    kojo.魔族化_K11 = 1; // 变异\n    return 1;",
    tests: ['kojo-k11-lily'],
    must_mention:
      '魔族化（１回のみ）：CFLAG:201<5 且未魔族化时改造，CFLAG:400 = 2',
  },
  {
    desc: 'M2348 NTR再捕获（爱慕/淫乱分支）清零丢失（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: "    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {\n      era.drawLine();\n      await era.printAndWait(''); // PRINTFORMW 空行\n      kojo.NTR再捕获 = 0;\n    } else {",
    replace:
      "    if (era0(`talent:${target}:85`) || era0(`talent:${target}:76`)) {\n      era.drawLine();\n      await era.printAndWait(''); // PRINTFORMW 空行\n      // 变异：CFLAG:650 清零丢失\n    } else {",
    tests: ['kojo-k11-lily'],
    must_mention:
      'NTR再捕获（CFLAG:201>=1 && CFLAG:650==1）：爱慕分支清 NTR 开关',
  },
  {
    desc: 'M2349 屈服刻印Lv1推进写错（2 改 3）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    );\n    kojo.初调教 = 2;\n    return 1;',
    replace: '    );\n    kojo.初调教 = 3; // 变异\n    return 1;',
    tests: ['kojo-k11-lily'],
    must_mention: '屈服刻印分档（各 Lv 一次）：CFLAG:201 1→2、2→3、3→4',
  },
  {
    desc: 'M2350 屈服刻印Lv2推进写错（3 改 4）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    );\n    kojo.初调教 = 3;\n    return 1;',
    replace: '    );\n    kojo.初调教 = 4; // 变异\n    return 1;',
    tests: ['kojo-k11-lily'],
    must_mention: '屈服刻印分档（各 Lv 一次）：CFLAG:201 1→2、2→3、3→4',
  },
  {
    desc: 'M2351 屈服刻印Lv3推进写错（4 改 5）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    );\n    kojo.初调教 = 4;\n    return 1;',
    replace: '    );\n    kojo.初调教 = 5; // 变异\n    return 1;',
    tests: ['kojo-k11-lily'],
    must_mention: '屈服刻印分档（各 Lv 一次）：CFLAG:201 1→2、2→3、3→4',
  },
  {
    desc: 'M2352 淫乱推进写错（5 改 6）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    }\n    kojo.初调教 = 5;\n    return 1;',
    replace: '    }\n    kojo.初调教 = 6; // 变异\n    return 1;',
    tests: ['kojo-k11-lily'],
    must_mention: '淫乱：CFLAG:201 = 5，处女附注按 TALENT:0 分档',
  },
  {
    desc: 'M2353 淫乱+魔族化推进写错（6 改 7，调教前从魔族档）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        await era.printAndWait(`${target_name}的双眼却露出了期待的光芒…`);\n      }\n      kojo.初调教 = 6;\n      return 1;\n    } else if (kojo.魔族化_K11 == 2) {',
    replace:
      '        await era.printAndWait(`${target_name}的双眼却露出了期待的光芒…`);\n      }\n      kojo.初调教 = 7; // 变异\n      return 1;\n    } else if (kojo.魔族化_K11 == 2) {',
    tests: ['kojo-k11-lily'],
    must_mention:
      '淫乱+魔族化：调教前从魔族（CFLAG:400==1）分档，CFLAG:201 = 6',
  },
  {
    desc: 'M2354 爱慕推进写错（7 改 6）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    }\n    kojo.初调教 = 7;\n    return 1;',
    replace: '    }\n    kojo.初调教 = 6; // 变异\n    return 1;',
    tests: ['kojo-k11-lily'],
    must_mention: '爱慕：CFLAG:201 = 7',
  },
  {
    desc: 'M2355 崩坏推进写错（9 改 8）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    await era.printAndWait(`「啊哈…呼呼…啊……哈哈……」`);\n    kojo.初调教 = 9;\n    return 1;',
    replace:
      '    await era.printAndWait(`「啊哈…呼呼…啊……哈哈……」`);\n    kojo.初调教 = 8; // 变异\n    return 1;',
    tests: ['kojo-k11-lily'],
    must_mention: '崩坏（TALENT:9 == 1 && CFLAG:201 < 9）：CFLAG:201 = 9',
  },
  {
    desc: 'M2356 崩坏后二回目以降 CALL K11_KOJO2 丢失（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  } else if (era0(`talent:${target}:9`) == 1) {\n    // 崩坏后（已崩坏，二回目以降）\n    await k11_kojo2(); // CALL K11_KOJO2\n  } else if (assi < 0) {',
    replace:
      '  } else if (era0(`talent:${target}:9`) == 1) {\n    // 变异：崩坏后 CALL K11_KOJO2 丢失\n  } else if (assi < 0) {',
    tests: ['kojo-k11-lily'],
    must_mention:
      '崩坏后（TALENT:9==1 且 CFLAG:201==9）改走 K11_KOJO2，不再打崩坏台词',
  },
  {
    desc: 'M2357 无助手 CALL K11_KOJO2 丢失（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  } else if (assi < 0) {\n    // 无助手\n    await k11_kojo2(); // CALL K11_KOJO2\n  } else if (era0(`talent:${MASTER}:122`) == 0) {',
    replace:
      '  } else if (assi < 0) {\n    // 变异：无助手 CALL K11_KOJO2 丢失\n  } else if (era0(`talent:${MASTER}:122`) == 0) {',
    tests: ['kojo-k11-lily'],
    must_mention: '无助手（ASSI < 0）时岔去 K11_KOJO2，不进简易助手分支',
  },
  {
    desc: 'M2358 主人非男性 CALL K11_KOJO2 丢失（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  } else if (era0(`talent:${MASTER}:122`) == 0) {\n    // 主人非男性时二回目以降（简易助手口上不适用）\n    await k11_kojo2(); // CALL K11_KOJO2\n  } else if (assi == 17) {',
    replace:
      '  } else if (era0(`talent:${MASTER}:122`) == 0) {\n    // 变异：主人非男性 CALL K11_KOJO2 丢失\n  } else if (assi == 17) {',
    tests: ['kojo-k11-lily'],
    must_mention:
      '主人非男性（TALENT:MASTER:122==0）时岔去 K11_KOJO2，不进简易助手分支',
  },
  {
    desc: 'M2359 助手非玛奥 CALL K11_KOJO2 丢失（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  } else {\n    // 口上のある助手が居ない場合（助手非玛奥，或无助手专属口上）\n    await k11_kojo2(); // CALL K11_KOJO2\n  }',
    replace: '  } else {\n    // 变异：助手非玛奥 CALL K11_KOJO2 丢失\n  }',
    tests: ['kojo-k11-lily'],
    must_mention: '助手非玛奥时岔去 K11_KOJO2，不进简易助手分支',
  },
  {
    desc: 'M2360 助手玛奥初めて それ以外 CFLAG:202 推进写错（1 改 2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.简易助手_0 = 1;\n      }\n      return 1;',
    replace: '        kojo.简易助手_0 = 2; // 变异\n      }\n      return 1;',
    tests: ['kojo-k11-lily'],
    must_mention: '助手玛奥初めて：未持爱慕/淫乱时それ以外分档，CFLAG:202 = 1',
  },
  {
    desc: 'M2361 助手玛奥初めて 陷落事件（已持爱慕）CFLAG:202 推进写错（2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          );\n        }\n        kojo.简易助手_0 = 2;\n      } else if (era0(`talent:${target}:76`) == 1 && kojo.初调教 >= 5) {',
    replace:
      '          );\n        }\n        kojo.简易助手_0 = 1; // 变异\n      } else if (era0(`talent:${target}:76`) == 1 && kojo.初调教 >= 5) {',
    tests: ['kojo-k11-lily'],
    must_mention:
      '助手玛奥初めて：已持爱慕且 CFLAG:201>=5 时陷落事件分档，CFLAG:202 = 2',
  },
  {
    desc: 'M2362 助手玛奥二回目以降（爱慕）CFLAG:202 推进写错（2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          `看着已经彻底变样了的姐姐，${assi_name}微笑了起来………`,\n        );\n        kojo.简易助手_0 = 2;\n      } else if (era0(`talent:${target}:76`) == 1) {',
    replace:
      '          `看着已经彻底变样了的姐姐，${assi_name}微笑了起来………`,\n        );\n        kojo.简易助手_0 = 1; // 变异\n      } else if (era0(`talent:${target}:76`) == 1) {',
    tests: ['kojo-k11-lily'],
    must_mention:
      '助手玛奥二回目以降：CFLAG:202==1 且爱慕时进一步陷落，CFLAG:202 = 2',
  },
  {
    desc: 'M2363 助手玛奥それ以外（拒绝分档）误改为推进 CFLAG:202（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      await era.printAndWait(`「不要…不要不要不要啊…神啊，救救我………」`);\n      return 1;',
    replace:
      '      await era.printAndWait(`「不要…不要不要不要啊…神啊，救救我………」`);\n      era.set(`cflag:${target}:202`, 2); // 变异：それ以外不推进\n      return 1;',
    tests: ['kojo-k11-lily'],
    must_mention:
      '助手玛奥それ以外（未持爱慕/淫乱、CFLAG:202==1）：拒绝分档，不改 CFLAG:202',
  },
  {
    desc: 'M2364 K11_KOJO2 崩坏条件错格（TALENT:9==1 改 ==0）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: "  const kojo = chara(target).kojo;\n\n  if (era0(`talent:${target}:9`) == 1 && era0('flag:7') == 2) {\n    // 崩坏\n    era.drawLine();",
    replace:
      "  const kojo = chara(target).kojo;\n\n  if (era0(`talent:${target}:9`) == 0 && era0('flag:7') == 2) {\n    // 变异：崩坏条件错格\n    era.drawLine();",
    tests: ['kojo-k11-lily'],
    must_mention:
      '崩坏后（TALENT:9==1 且 CFLAG:201==9）改走 K11_KOJO2，不再打崩坏台词',
  },
  {
    desc: 'M2365 K11_KOJO2 反発刻印Lv3条件错格（MARK:3==3 改 ==2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    return 1;
  } else if (era0(\`mark:\${target}:3\`) == 3 && era0('flag:7') == 2) {
    // 反発刻印Lv3`,
    replace: `    return 1;
  } else if (era0(\`mark:\${target}:3\`) == 2 && era0('flag:7') == 2) {
    // 变异：反発刻印Lv3条件错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'K11_KOJO2：反発刻印Lv3',
  },
  {
    desc: 'M2366 K11_KOJO2 屈服刻印Lv3＋爱慕/淫乱無し CFLAG:202 分档条件颠倒（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    era.drawLine();
    if (kojo.简易助手_0 >= 1) {
      if (rand_n(2) == 0) {
        await era.printAndWait(
          \`「原来你就是用这种方式……把我的妹妹……变成那个样子的吗……」\`,`,
    replace: `    era.drawLine();
    if (kojo.简易助手_0 < 1) {
      // 变异：条件颠倒
      if (rand_n(2) == 0) {
        await era.printAndWait(
          \`「原来你就是用这种方式……把我的妹妹……变成那个样子的吗……」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'K11_KOJO2：屈服刻印Lv3＋爱慕/淫乱無し，按 CFLAG:202 是否见过妹妹分档',
  },
  {
    desc: 'M2367 K11_KOJO2 淫乱分支检查错格（TALENT:76==1 改 ==0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  } else if (era0(\`talent:\${target}:76\`) == 1 && era0('flag:7') == 2) {
    // 淫乱（含魔族化分支）`,
    replace: `  } else if (era0(\`talent:\${target}:76\`) == 0 && era0('flag:7') == 2) {
    // 变异：淫乱分支检查错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'K11_KOJO2：淫乱含魔族化分支',
  },
  {
    desc: 'M2368 K11_KOJO2 爱慕分支检查错格（TALENT:85==1 改 ==0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  } else if (era0(\`talent:\${target}:85\`) == 1 && era0('flag:7') == 2) {
    // 爱慕（含魔族化分支）`,
    replace: `  } else if (era0(\`talent:\${target}:85\`) == 0 && era0('flag:7') == 2) {
    // 变异：爱慕分支检查错格`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'K11_KOJO2：爱慕分档（RAND 三选一，落到隐式 RETURN 0 前提早覆盖为 return 1）',
  },

  {
    desc: 'M2372 EVENTEND 崩坏条件错格（TALENT:9==1 改 ==0）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: "  if (era0(`talent:${target}:9`) == 1 && era0('flag:7') == 2) {\n    // 崩坏\n    era.drawLine();\n    await era.printAndWait(`「咕嘿……咕嘿嘿嘿………」`);\n    await era.printAndWait(`少女眼中理性的光芒已经不复存在………`);",
    replace:
      "  if (era0(`talent:${target}:9`) == 0 && era0('flag:7') == 2) {\n    // 变异：崩坏条件错格\n    era.drawLine();\n    await era.printAndWait(`「咕嘿……咕嘿嘿嘿………」`);\n    await era.printAndWait(`少女眼中理性的光芒已经不复存在………`);",
    tests: ['kojo-k11-lily'],
    must_mention: 'EVENTEND：崩坏分档',
  },
  {
    desc: 'M2373 EVENTEND 反発刻印Lv3+爱慕无 CFLAG:202 分档条件颠倒（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    era.drawLine();\n    if (kojo.简易助手_0 >= 1) {\n      await era.printAndWait(`「我，我是绝对不会认输的……」`);',
    replace:
      '    era.drawLine();\n    if (kojo.简易助手_0 < 1) {\n      // 变异：条件颠倒\n      await era.printAndWait(`「我，我是绝对不会认输的……」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'EVENTEND：反発刻印Lv3+爱慕无，按 CFLAG:202 分支',
  },
  {
    desc: 'M2374 EVENTEND 淫乱体力500分档阈值改错（>= 500 改 >= 700）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  } else if (\n    era0(`talent:${target}:76`) == 1 &&\n    era0(`base:${target}:0`) >= 500\n  ) {\n    // 淫乱(体力500以上)',
    replace:
      '  } else if (\n    era0(`talent:${target}:76`) == 1 &&\n    era0(`base:${target}:0`) >= 700 // 变异\n  ) {\n    // 淫乱(体力500以上)',
    tests: ['kojo-k11-lily'],
    must_mention: 'EVENTEND：淫乱按体力 500 分档',
  },
  {
    desc: 'M2375 EVENTEND 爱慕体力500分档阈值改错（>= 500 改 >= 700）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  } else if (\n    era0(`talent:${target}:85`) == 1 &&\n    era0(`base:${target}:0`) >= 500\n  ) {\n    // 爱慕(体力500以上)',
    replace:
      '  } else if (\n    era0(`talent:${target}:85`) == 1 &&\n    era0(`base:${target}:0`) >= 700 // 变异\n  ) {\n    // 爱慕(体力500以上)',
    tests: ['kojo-k11-lily'],
    must_mention: 'EVENTEND：爱慕按体力 500 分档',
  },
  // —— #242（J32 续轮）：K11 莉莉口上 KOJO_MESSAGE_COM_11 头部检查 +
  // SELECTCOM 0/1/2（M2377-M2401 号段） ——
  {
    desc: 'M2377 COM_11 助手非玛奥检查删（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  // 助手マオ以外が調教した時に口上をスキップする\n  if (era_flag.assi > 0 && era_flag.assiplay && era_flag.assi !== 17) {\n    return 0;\n  }',
    replace: `  // 变异：助手非玛奥检查删`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM_11 检查：助手非玛奥调教时静默跳过',
  },
  {
    desc: 'M2378 COM_11 口塞检查删（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  // ボールギャグ着用時には口上をスキップする（SELECTCOM==45 自己说话不算）\n  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {\n    return 0;\n  }',
    replace: `  // 变异：口塞检查删`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM_11 检查：口塞中（非口塞指令）静默跳过',
  },
  {
    desc: 'M2379 COM_11 失神检查删（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  // 失神時には口上をスキップする\n  if (game.train.失神) {\n    return 0;\n  }',
    replace: `  // 变异：失神检查删`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM_11 检查：失神中静默跳过',
  },
  {
    desc: 'M2380 COM_11 兽奸检查被删除（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  // 獣姦プレイ中は専用口上\n  if (era.get(`tequip:${target}:89`)) {',
    replace:
      '  // 獣姦プレイ中は専用口上\n  if (false) { // 变异：删除兽奸检查',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM_11 检查：兽奸中改走 DOG_KOJO_11 真身',
  },
  {
    desc: 'M2381 COM_11 死斗场真身调用被删除（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  if (era.get(\`tequip:\${target}:55\`)) {
    return colosseum_kojo_11(rand_n);
  }`,
    replace: `  if (era.get(\`tequip:\${target}:55\`)) {
    return 0; // 变异：删除死斗场真身调用
  }`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM_11 检查：死斗场中改走 COLOSSEUM_KOJO_11 真身',
  },
  {
    desc: 'M2382 COM_11 崩坏检查删（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  // 崩坏した場合は口上をスキップする\n  if (era.get(`talent:${target}:9`) === 1) {\n    return 0;\n  }',
    replace: `  // 变异：崩坏检查删`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM_11 检查：崩坏后静默跳过',
  },
  {
    desc: 'M2383 COM_11 触手检查删（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  // 触手調教中は口上をスキップする\n  if (era.get(`tequip:${target}:90`)) {\n    return 0;\n  }',
    replace: `  // 变异：触手检查删`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM_11 检查：触手调教中静默跳过',
  },
  {
    desc: 'M2384 COM0 初めて助手玛奥条件错格（ASSIPLAY 丢失，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  const assi_mao =
    era_flag.assi > 0 && era_flag.assiplay && era_flag.assi === 17;`,
    replace: `  const assi_mao = era_flag.assi > 0 && era_flag.assi === 17; // 变异：ASSIPLAY 丢失`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM0 初めて：ASSI 是玛奥但 ASSIPLAY 为 0 时不算助手玛奥分档',
  },
  {
    desc: 'M2385 COM0 初めて屈服刻印Lv2以上条件错格（>=2 改 >=3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (mark(2) >= 2) {
        // 屈服刻印Lv2以上`,
    replace: `      } else if (mark(2) >= 3) {
        // 变异：屈服刻印Lv2以上条件错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM0 初めて：屈服刻印恰为 Lv2（非 Lv3）也命中温柔分档',
  },
  {
    desc: 'M2386 COM0 初めて CFLAG:301 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      }\n      kojo.爱抚 = 1;',
    replace: '      }\n      kojo.爱抚 = 0; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM0 初めて：それ以外（非助手玛奥、屈服刻印Lv2未満）推进到 1',
  },
  {
    desc: 'M2387 COM0 二回目助手玛奥+淫乱上限条件错格（<=5 改 <=4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      if (\n        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱\n        await era.printAndWait(\n          `『姐姐终于坦率地面对自己的欲望了呢，我真为你高兴${heart(1)}』`,\n        );',
    replace:
      '      if (\n        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2) // 变异：上限错格\n      ) {\n        // 淫乱\n        await era.printAndWait(\n          `『姐姐终于坦率地面对自己的欲望了呢，我真为你高兴${heart(1)}』`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM0 二回目：助手玛奥+淫乱恰在 CFLAG:301==5 时仍命中（<=5 含边界）',
  },
  {
    desc: 'M2388 COM0 二回目屈服刻印Lv3条件错格（==3 改 ==2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (mark(2) === 3 && (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv3`,
    replace: `    } else if (mark(2) === 2 && (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)) {
      // 变异：屈服刻印Lv3条件错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM0 二回目：非助手玛奥 + 屈服刻印Lv3 推进到 4',
  },
  {
    desc: 'M2389 COM0 二回目それ以外 RAND:2 条件颠倒（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      await era.printAndWait(`「一，一点舒服的感觉都没有…嗯啊…啊啊！」`);\n      if (rand_n(2)) {',
    replace:
      '      await era.printAndWait(`「一，一点舒服的感觉都没有…嗯啊…啊啊！」`);\n      if (!rand_n(2)) {\n        // 变异：RAND:2 条件颠倒',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM0 二回目：非助手玛奥 + それ以外（RAND:2 追加句可控）',
  },
  {
    desc: 'M2390 COM1 初めて处女条件错格（==1 改 ==0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  if (era_flag.selectcom === 1) {
    const virgin = era.get(\`talent:\${target}:0\`) === 1;`,
    replace: `  if (era_flag.selectcom === 1) {
    const virgin = era.get(\`talent:\${target}:0\`) === 0; // 变异：处女条件错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM1 初めて：处女 + 非助手玛奥推进到 1',
  },
  {
    desc: 'M2391 COM1 初めて CFLAG:302 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      }\n      kojo.舔阴 = 1;',
    replace: '      }\n      kojo.舔阴 = 0; // 变异',
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
    desc: 'M2393 COM1 二回目反抗刻印Lv1以上条件错格（>=1 改 >=2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      mark(3) >= 1 &&
      mark(2) <= 2 &&
      (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2)`,
    replace: `      mark(3) >= 2 && // 变异：反抗刻印Lv1以上条件错格
      mark(2) <= 2 &&
      (kojo.舔阴 <= 1 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM1 二回目：反抗刻印恰为 Lv1（非 Lv2）也命中反抗分档',
  },
  {
    desc: 'M2394 COM1 二回目それ以外 CFLAG:302 写错（2 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.舔阴 = 2;\n    }\n    return 0; // 隐式（RETURN 0）',
    replace:
      '      kojo.舔阴 = 3; // 变异\n    }\n    return 0; // 隐式（RETURN 0）',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM1 二回目：非助手玛奥 + それ以外（屈服刻印Lv3未満）推进到 2',
  },
  {
    desc: 'M2395 COM2 初めて助手玛奥台词分档条件错格（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (kojo.肛门爱抚 === 0) {
      if (assi_mao) {`,
    replace: `    if (kojo.肛门爱抚 === 0) {
      if (!assi_mao) {
        // 变异：助手玛奥条件颠倒`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM2 初めて：非助手玛奥推进到 1',
  },
  {
    desc: 'M2396 COM2 二回目润滑值丢失 UP:3（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    const p = chara(target).train.润滑 + chara(target).train.润滑增量; // P = PALAM:3 + UP:3',
    replace: `    const p = chara(target).train.润滑; // 变异：润滑增量 UP:3 丢失`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM2 二回目：润滑增量（delta:3 / UP:3）与本体（palam:3）合计才达阈值',
  },
  {
    desc: 'M2397 COM2 二回目淫乱+润滑高条件错格（PALAMLV[2] 改 [1]，#242）',
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
    find: '      kojo.肛门爱抚 = 7;',
    replace: `      kojo.肛门爱抚 = 6; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM2 二回目：淫乱 + 润滑Lv2以上推进到 7',
  },
  {
    desc: 'M2399 COM2 二回目それ以外条件错格（首次耻情Lv2 <=1 改 <=0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (kojo.首次耻情Lv2 <= 1 || game.kojo.口上开关 === 2) {`,
    replace: `    } else if (kojo.首次耻情Lv2 <= 0 || game.kojo.口上开关 === 2) {
      // 变异：それ以外条件错格`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM2 二回目：それ以外恰在 CFLAG:223==1 时仍命中（<=1 含边界）',
  },
  {
    desc: 'M2400 COM2 二回目それ以外 CFLAG:303 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.肛门爱抚 = 2;',
    replace: `      kojo.肛门爱抚 = 1; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM2 二回目：それ以外（爱慕無し、润滑Lv2未満、A感覚Lv3未満）推进到 2',
  },
  {
    desc: 'M2202 K9 初調教人间分档推进值错（CFLAG:201 = 1 改 2，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '    // CFLAG:201  = 1（变量语义：CFLAG 族，201）\n    kojo.初调教 = 1;',
    replace: '    // 变异\n    kojo.初调教 = 2;',
    tests: ['kojo-k9-diamond'],
    must_mention: 'CFLAG:201 推进到 1',
  },
  {
    desc: 'M2203 K9 初調教魔族分档条件错格（TALENT:314 == 9 改 8，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '    if (era.get(`talent:${target}:314`) == 9) {\n      await era.printAndWait(`${target_name}在调教之前，被进行了魔族化改造。`);',
    replace:
      '    if (era.get(`talent:${target}:314`) == 8) { // 变异\n      await era.printAndWait(`${target_name}在调教之前，被进行了魔族化改造。`);',
    tests: ['kojo-k9-diamond'],
    must_mention: '魔族化标记',
  },
  {
    desc: 'M2204 K9 魔族化（１回のみ）改造标记写错（CFLAG:370 = 2 改 3，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '      // CFLAG:370  = 1（变量语义：CFLAG 族，370）\n      kojo.魔族化 = 1;',
    replace: '      // 变异\n      kojo.魔族化 = 2;',
    tests: ['kojo-k9-diamond'],
    must_mention: '魔族化标记',
  },
  {
    desc: 'M2205 K9 NTR再捕获爱慕支解除标记写错（CFLAG:650 = 0 改 1，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '      // CFLAG:650  = 0（变量语义：CFLAG 族，650）\n      kojo.NTR再捕获 = 0;\n    } else {',
    replace: '      // 变异\n      kojo.NTR再捕获 = 1;\n    } else {',
    tests: ['kojo-k9-diamond'],
    must_mention: 'NTR 开关清 0',
  },
  {
    desc: 'M2206 K9 屈服刻印Lv1推进值错（CFLAG:201 = 2 改 3，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '    // CFLAG:201  = 2（变量语义：CFLAG 族，201）\n    kojo.初调教 = 2;',
    replace: '    // 变异\n    kojo.初调教 = 3;',
    tests: ['kojo-k9-diamond'],
    must_mention: 'CFLAG:201 推进到 2',
  },
  {
    desc: 'M2207 K9 崩坏推进值错（CFLAG:201 = 9 改 8，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '    // CFLAG:201  = 9（变量语义：CFLAG 族，201）\n    kojo.初调教 = 9;',
    replace: '    // 变异\n    kojo.初调教 = 8;',
    tests: ['kojo-k9-diamond'],
    must_mention: 'CFLAG:201 推进到 9',
  },
  {
    desc: 'M2208 K9 崩坏只播一次检查删松（CFLAG:201 < 9 改 <= 9，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  } else if (era.get(`talent:${target}:9`) == 1 && kojo.初调教 < 9) {',
    replace:
      '  } else if (era.get(`talent:${target}:9`) == 1 && kojo.初调教 <= 9) { // 变异',
    tests: ['kojo-k9-diamond'],
    must_mention: '崩坏只播一次',
  },
  {
    desc: 'M2209 K9 简易助手（黑方片本人）首次推进值错（CFLAG:202 = 1 改 2，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '        // CFLAG:202  = 1（变量语义：CFLAG 族，202）\n        kojo.简易助手_0 = 1;',
    replace: '        // 变异\n        kojo.简易助手_0 = 2;',
    tests: ['kojo-k9-diamond'],
    must_mention: 'CFLAG:202 首次推进到 1',
  },
  {
    desc: 'M2210 K9 头部检查①：ASSI>0&&ASSIPLAY 删除（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (era_flag.assi > 0 && era_flag.assiplay) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {',
    replace:
      '  if (false) { // 变异：ASSI>0&&ASSIPLAY 删除\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {',
    tests: ['kojo-k9-diamond'],
    must_mention: '头部检查',
  },
  {
    desc: 'M2211 K9 头部检查②：TEQUIP:45 口塞检查删除（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {\n    return 0;\n  }',
    replace:
      '  if (false) { // 变异：TEQUIP:45 口塞检查删除\n    return 0;\n  }',
    tests: ['kojo-k9-diamond'],
    must_mention: '头部检查',
  },
  {
    desc: 'M2212 K9 头部检查③：TFLAG:899 失神删除（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (game.train.失神) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:89`)) {\n    // 兽奸PLAY中は専用口上',
    replace:
      '  if (false) { // 变异：TFLAG:899 失神删除\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:89`)) {\n    // 兽奸PLAY中は専用口上',
    tests: ['kojo-k9-diamond'],
    must_mention: '头部检查',
  },
  {
    desc: 'M2213 K9 头部检查④：TEQUIP:89 不再岔去 DOG_KOJO_9（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (era.get(`tequip:${target}:89`)) {\n    // 兽奸PLAY中は専用口上\n    await dog_kojo_9(rand_n);\n    return 0;\n  }',
    replace:
      '  if (false) { // 变异：TEQUIP:89 不再岔去 DOG_KOJO_9\n    // 兽奸PLAY中は専用口上\n    await dog_kojo_9(rand_n);\n    return 0;\n  }',
    tests: ['kojo-k9-diamond'],
    must_mention: '全篇为未填写模板',
  },
  {
    desc: 'M2214 K9 头部检查⑤：TEQUIP:55 不再岔去 COLOSSEUM_KOJO_9（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (era.get(`tequip:${target}:55`)) {\n    // 死斗场中は専用口上\n    await colosseum_kojo_9(rand_n);\n    return 0;\n  }',
    replace:
      '  if (false) { // 变异：TEQUIP:55 不再岔去 COLOSSEUM_KOJO_9\n    // 死斗场中は専用口上\n    await colosseum_kojo_9(rand_n);\n    return 0;\n  }',
    tests: ['kojo-k9-diamond'],
    must_mention: '连站起来的力气都没有了',
  },
  {
    desc: 'M2215 K9 头部检查⑥：TALENT:9 崩坏删除（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (era.get(`talent:${target}:9`) == 1) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:90`)) {',
    replace:
      '  if (false) { // 变异：TALENT:9 崩坏删除\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:90`)) {',
    tests: ['kojo-k9-diamond'],
    must_mention: '头部检查',
  },
  {
    desc: 'M2216 K9 头部检查⑦：TEQUIP:90 触手删除（#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (era.get(`tequip:${target}:90`)) {\n    return 0;\n  }\n\n  if (era_flag.selectcom == 0) {',
    replace:
      '  if (false) { // 变异：TEQUIP:90 触手删除\n    return 0;\n  }\n\n  if (era_flag.selectcom == 0) {',
    tests: ['kojo-k9-diamond'],
    must_mention: '头部检查',
  },
  {
    desc: 'M2217 K9 SELECTCOM==0 爱抚初回推进值错（CFLAG:301 = 1 改 2，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '        await era.printAndWait(`「你这个变态…下流的手在摸哪里啊…啊…啊啊啊！」`);\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 1;\n      return 0;',
    replace:
      '        await era.printAndWait(`「你这个变态…下流的手在摸哪里啊…啊…啊啊啊！」`);\n      }\n      // 变异\n      kojo.爱抚 = 2;\n      return 0;',
    tests: ['kojo-k9-diamond'],
    must_mention: 'CFLAG:301 推进到 1',
  },
  {
    desc: 'M2218 K9 SELECTCOM==87 穿环 P==1 条件错格（改 P==9，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '          );\n\n          if (P == 1) {\n            await era.printAndWait(\n              `「嗯哼哼~、怎样呀~…真是跟现在的我特别合适的装饰品呢…${heart(1)}」`,\n            );',
    replace:
      '          );\n\n          if (P == 9) { // 变异\n            await era.printAndWait(\n              `「嗯哼哼~、怎样呀~…真是跟现在的我特别合适的装饰品呢…${heart(1)}」`,\n            );',
    tests: ['kojo-k9-diamond'],
    must_mention: 'P==1 乳环文案缺失',
  },
  {
    desc: 'M2219 K9 COLOSSEUM ITEM:4 回退成 ITEM:PBAND 具名寻址（#240；目标改到 #623 提取的 assi_band 条件上）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '        era.get(`item:${PBAND}`) == 1;\n      await era.printAndWait(\n        `${assi_name}看着${target_name}舔着` +',
    replace:
      "        era.get('item:PBAND') == 1; // 变异：回退成具名寻址（不解析）\n      await era.printAndWait(\n        `${assi_name}看着${target_name}舔着` +",
    tests: ['kojo-k9-diamond'],
    must_mention: '假阴茎判定丢失',
  },
  {
    desc: 'M2220 K9 PALAMCNG 首超阈值状态写错（CFLAG:221 = 1 改 2，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）\n    kojo.首次润滑Lv2 = 1;',
    replace: '    // 变异\n    kojo.首次润滑Lv2 = 2;',
    tests: ['kojo-k9-diamond'],
    must_mention: 'CFLAG:221 首超推进到 1',
  },
  {
    desc: 'M2221 K9 MARKCNG 苦痛刻印Lv3条件错格（苦痛刻印变动 == 3 改 4，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {',
    replace:
      '  if (game.system.苦痛刻印变动 == 4 && kojo.苦痛刻印Lv3 == 0) { // 变异',
    tests: ['kojo-k9-diamond'],
    must_mention: '好痛呜呜',
  },
  {
    desc: 'M2222 K9 SELF_KOJO TFLAG:13==1 崩坏分支条件错格（TALENT:9==1 改 TALENT:9==9，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '    if (era.get(`talent:${target}:9`) == 1) {\n      await era.printAndWait(`${target_name}就像被弄坏的玩具一样不停地自慰………`);\n    } else if (q == 1) {',
    replace:
      '    if (era.get(`talent:${target}:9`) == 9) { // 变异\n      await era.printAndWait(`${target_name}就像被弄坏的玩具一样不停地自慰………`);\n    } else if (q == 1) {',
    tests: ['kojo-k9-diamond'],
    must_mention: '不停地自慰',
  },
  {
    desc: 'M2223 K9 SELF_KOJO 跨模块全局 S 阈值错（s >= 3 改 s >= 9，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '      if (s >= 3) {',
    replace: '      if (s >= 9) { // 变异',
    tests: ['kojo-k9-diamond'],
    must_mention: 'S 阈值判定丢失',
  },
  {
    desc: 'M2224 K9 DUNGEON_VICTORY 体力低于五成追加台词阈值错（50 改 5，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '    (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 50 ||\n    (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 50\n  ) {',
    replace:
      '    (era.get(`base:${a}:0`) * 100) / era.get(`maxbase:${a}:0`) < 5 || // 变异\n    (era.get(`base:${a}:1`) * 100) / era.get(`maxbase:${a}:1`) < 5\n  ) {',
    tests: ['kojo-k9-diamond'],
    must_mention: '难看的胜利',
  },
  {
    desc: 'M2225 K9 DUNGEON_ATTACK CFLAG:1（invasion.状态）条件错格（== 2 改 9，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (chara(target).invasion.状态 == 2) {',
    replace: '  if (chara(target).invasion.状态 == 9) { // 变异',
    tests: ['kojo-k9-diamond'],
    must_mention: '接招吧',
  },
  {
    desc: 'M2226 K9 DUNGEON_RYOUZYOKU 处女条件错格（TALENT:0 == 1 改 2，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (era.get(`talent:${target}:0`) == 1) {\n    await era.printAndWait(`「不…不要…我是不会将第一次交给你们的！」`);',
    replace:
      '  if (era.get(`talent:${target}:0`) ==2) { // 变异\n    await era.printAndWait(`「不…不要…我是不会将第一次交给你们的！」`);',
    tests: ['kojo-k9-diamond'],
    must_mention: '不会将第一次交给你们',
  },
  {
    desc: 'M2227 K9 GOHOUBI_REQUEST CFLAG:A:504 条件错格（== 0 改 1，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '\n  if (chara(a).stronghold.要求奖赏 == 0) {',
    replace: '\n  if (chara(a).stronghold.要求奖赏 == 1) { // 变异',
    tests: ['kojo-k9-diamond'],
    must_mention: '我想要金钱作为奖励',
  },
  {
    desc: 'M2228 K9 GOHOUBI_AFTER choice==0 条件错格（改 choice==9，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (choice == 0) {\n    await era.printAndWait(`「为、为什么啦！」`);',
    replace:
      '  if (choice == 9) { // 变异\n    await era.printAndWait(`「为、为什么啦！」`);',
    tests: ['kojo-k9-diamond'],
    must_mention: '为、为什么啦',
  },
  {
    desc: 'M2229 K9 OSIOKI choice==0 条件错格（改 choice==9，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (choice == 0) {\n    await era.printAndWait(`「真、真是失礼了」`);',
    replace:
      '  if (choice == 9) { // 变异\n    await era.printAndWait(`「真、真是失礼了」`);',
    tests: ['kojo-k9-diamond'],
    must_mention: '真、真是失礼了',
  },
  {
    desc: 'M2230 K9 GOBI 悲档槽位改错（原 arg_0==3 分支随 #865 并入常量表，#240）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "    tiers: ['的噢♡', '来的哦！', '来的……。', '来的呢……。', '来的……呜呜。'],",
    replace:
      "    tiers: ['的噢♡', '来的哦！', '来的……！', '来的呢……。', '来的……呜呜。'], // 变异",
    tests: ['kojo-k9-diamond'],
    must_mention: '来的……。',
  },
  {
    desc: 'M2231 K9 BENKI 门面 game.train.肉便器行动 条件错格（== 0 改 1，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (game.train.肉便器行动 == 0) {',
    replace: '  if (game.train.肉便器行动 == 1) { // 变异',
    tests: ['kojo-k9-diamond'],
    must_mention: '弄脏我吧',
  },
  {
    desc: 'M2232 K9 ENTERENEMY 淫乱条件错格（TALENT:76 == 1 改 2，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (era.get(`talent:${a}:76`) == 1) {\n    await era.printAndWait(',
    replace:
      '  if (era.get(`talent:${a}:76`) == 2) { // 变异\n    await era.printAndWait(',
    tests: ['kojo-k9-diamond'],
    must_mention: '真的能被干了个爽吗',
  },
  {
    desc: 'M2233 K9 NTR_KOUJO 首次标记写错（CFLAG:650 = 1 改 2，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (kojo.NTR再捕获 == 0) {\n    // CFLAG:650  = 1（变量语义：CFLAG 族，650）\n    kojo.NTR再捕获 = 1;',
    replace:
      '  if (kojo.NTR再捕获 == 0) {\n    // 变异\n    kojo.NTR再捕获 = 2;',
    tests: ['kojo-k9-diamond'],
    must_mention: 'CFLAG:650 首次标记写为 1',
  },
  {
    desc: 'M2234 K9 EXUCUTION 处分方式 条件错格（== 4 改 5，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (event_no == 4) {',
    replace: '  if (event_no == 5) { // 变异',
    tests: ['kojo-k9-diamond'],
    must_mention: '不要成为怪物的安慰物',
  },
  {
    desc: 'M2235 K9 MUSEUM 展品编号 条件错格（== 0 改 1，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (event_no == 0) {\n    await era.printAndWait(\n      `「脚、脚被…脚慢慢地变冷了起来…我、我是要死了吧…拜托了…至少，至少回到最初的故…乡…里………………」`,\n    );',
    replace:
      '  if (event_no == 1) { // 变异\n    await era.printAndWait(\n      `「脚、脚被…脚慢慢地变冷了起来…我、我是要死了吧…拜托了…至少，至少回到最初的故…乡…里………………」`,\n    );',
    tests: ['kojo-k9-diamond'],
    must_mention: '至少回到最初的故',
  },
  {
    desc: 'M2236 K9 BANISHMENT 处分号 条件错格（== 0 改 1，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (event_no == 0) {\n    await era.printAndWait(`「我失去作为战士的力量…已经………」`);',
    replace:
      '  if (event_no == 1) { // 变异\n    await era.printAndWait(`「我失去作为战士的力量…已经………」`);',
    tests: ['kojo-k9-diamond'],
    must_mention: '我失去作为战士的力量',
  },
  {
    desc: 'M2237 K9 PUBLIC_EXUCUTION 处分号 条件错格（== 0 改 1，#240）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  if (event_no == 0) {\n    await era.printAndWait(\n      `「快杀了我吧…我的那里已经…裂开了…啊啊啊…已经什么都感觉不到了啊…啊啊…啊啊啊………」`,\n    );',
    replace:
      '  if (event_no == 1) { // 变异\n    await era.printAndWait(\n      `「快杀了我吧…我的那里已经…裂开了…啊啊啊…已经什么都感觉不到了啊…啊啊…啊啊啊………」`,\n    );',
    tests: ['kojo-k9-diamond'],
    must_mention: '快杀了我吧',
  },
  {
    desc: 'M2238 K9 GROTESQUE 处分方式 条件错格（== 0 改 1，#240；源全空，红在分支路由而非文本）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: "  if (event_no == 0) {\n    await era.printAndWait('');",
    replace: "  if (event_no == 1) { // 变异\n    await era.printAndWait('');",
    tests: ['kojo-k9-diamond'],
    must_mention: 'GROTESQUE 分支路由错位',
  },
  // —— #242（续轮）：K11 莉莉口上 KOJO_MESSAGE_COM_11 SELECTCOM 3
  // （M2402-M2417 号段） ——
  {
    desc: 'M2402 COM3 初めて助手玛奥条件颠倒（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      // 初めて（CFLAG:304 == 0）\n      if (assi_mao) {',
    replace:
      '      // 初めて（CFLAG:304 == 0）\n      if (!assi_mao) {\n        // 变异：助手玛奥条件颠倒',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 初めて：助手玛奥分档',
  },
  {
    desc: 'M2403 COM3 初めて CFLAG:304 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.自慰 = 1;',
    replace: `      kojo.自慰 = 0; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 初めて：非助手玛奥分档',
  },
  {
    desc: 'M2404 COM3 二回目 助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱`,
    replace: `      if (
        era.get(\`talent:\${target}:85\`) === 1 && // 变异：条件错格
        (kojo.自慰 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 二回目：助手玛奥 + 淫乱 + 处女推进到 7',
  },
  {
    desc: 'M2405 COM3 二回目 助手玛奥淫乱 CFLAG:304 写错（7 改 6，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.自慰 = 7;',
    replace: '        kojo.自慰 = 6; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 二回目：助手玛奥 + 淫乱 + 处女推进到 7',
  },
  {
    desc: 'M2406 COM3 二回目 助手玛奥爱慕 CFLAG:304 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.自慰 = 5;',
    replace: '        kojo.自慰 = 4; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 二回目：助手玛奥 + 爱慕 + 非处女推进到 5',
  },
  {
    desc: 'M2407 COM3 二回目 非助手玛奥淫乱+处女条件错格（TALENT:0 丢失，#242）',
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
    find: '      kojo.自慰 = 9;',
    replace: `      kojo.自慰 = 8; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 二回目：非助手玛奥 + 淫乱+处女推进到 9',
  },
  {
    desc: 'M2409 COM3 二回目 淫乱+自慰中毒Lv3以上条件错格（>=3 改 >=2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      era.get(\`talent:\${target}:76\`) === 1 &&
      chara(target).train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 7 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱＋自慰中毒Lv3以上`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 &&
      chara(target).train.自慰中毒 >= 2 && // 变异：条件错格
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
        // 变异：RAND:3 首支条件错格`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM3 二回目：非助手玛奥 + 淫乱+自慰中毒Lv3以上，RAND:3 三选一可控',
  },
  {
    desc: 'M2411 COM3 二回目 淫乱+自慰中毒Lv3以上 CFLAG:304 写错（8 改 7，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.自慰 = 8;',
    replace: `      kojo.自慰 = 7; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM3 二回目：非助手玛奥 + 淫乱+自慰中毒Lv3以上，RAND:3 三选一可控',
  },
  {
    desc: 'M2412 COM3 二回目 淫乱+自慰中毒Lv3未満 CFLAG:304 写错（7 改 6，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.自慰 = 7;\n    } else if (',
    replace: '      kojo.自慰 = 6; // 变异\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM3 二回目：非助手玛奥 + 淫乱+自慰中毒Lv3未満，RAND:2 二选一可控',
  },
  {
    desc: 'M2413 COM3 二回目 爱慕+处女条件错格（TALENT:0 丢失，#242）',
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
    desc: 'M2414 COM3 二回目 爱慕+自慰中毒Lv3以上条件错格（>=3 改 >=2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      era.get(\`talent:\${target}:85\`) === 1 &&
      chara(target).train.自慰中毒 >= 3 &&
      (kojo.自慰 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋自慰中毒Lv3以上`,
    replace: `      era.get(\`talent:\${target}:85\`) === 1 &&
      chara(target).train.自慰中毒 >= 2 && // 变异：条件错格
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
    find: '      kojo.自慰 = 4;',
    replace: `      kojo.自慰 = 3; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM3 二回目：非助手玛奥 + 爱慕+自慰中毒Lv3未満，RAND:2 二选一可控',
  },
  {
    desc: 'M2416 COM3 二回目 屈服刻印Lv3+自慰中毒Lv1以上条件错格（MARK:2==3 改 ==2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      era.get(\`mark:\${target}:2\`) === 3 &&
      chara(target).train.自慰中毒 >= 1 &&
      (kojo.自慰 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3+自慰中毒Lv1以上`,
    replace: `      era.get(\`mark:\${target}:2\`) === 2 && // 变异：条件错格
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
    find: '      kojo.自慰 = 2;',
    replace: `      kojo.自慰 = 1; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM3 二回目：非助手玛奥 + それ以外推进到 2',
  },
  // —— #242（续轮）：K11 莉莉口上 KOJO_MESSAGE_COM_11 SELECTCOM 5
  // （M2418-M2419 号段；原 M2420-M2429 十条撞了 #231 的 M2420-M2599 分配，
  // #295 唯一性门合并即红，已改号至 M2800-M2809，见文件后段） ——
  {
    desc: 'M2418 COM5 初めて助手玛奥条件颠倒（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      // 初めて（CFLAG:306 == 0）\n      if (assi_mao) {',
    replace:
      '      // 初めて（CFLAG:306 == 0）\n      if (!assi_mao) {\n        // 变异：助手玛奥条件颠倒',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 初めて：助手玛奥分档',
  },
  {
    desc: 'M2419 COM5 初めて CFLAG:306 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      }\n      kojo.胸爱抚 = 1;',
    replace: '      }\n      kojo.胸爱抚 = 0; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 初めて：非助手玛奥分档',
  },
  // —— #242（续轮）：K11 莉莉口上 SELECTCOM 5 续段，改号自 M2420-M2429
  // （#295 唯一性门冲突 #231 的 M2420-M2599，见上方号段说明） ——
  {
    desc: 'M2800 COM5 二回目 助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱`,
    replace: `      if (
        era.get(\`talent:\${target}:85\`) === 1 && // 变异：条件错格
        (kojo.胸爱抚 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2801 COM5 二回目 助手玛奥淫乱 CFLAG:306 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        );\n        kojo.胸爱抚 = 5;',
    replace: '        );\n        kojo.胸爱抚 = 4; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2802 COM5 二回目 助手玛奥爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        era.get(\`talent:\${target}:85\`) === 1 &&
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕`,
    replace: `      } else if (
        era.get(\`talent:\${target}:76\`) === 1 && // 变异：条件错格
        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 二回目：助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2803 COM5 二回目 助手玛奥B感覚Lv3以上条件错格（>=3 改 >=2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        chara(target).system.乳房感觉 >= 3 &&
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // B感覚Lv3以上`,
    replace: `      } else if (
        chara(target).system.乳房感觉 >= 2 && // 变异：条件错格
        (kojo.胸爱抚 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // B感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM5 二回目：助手玛奥 + 乳房感觉恰为 Lv2（未达 Lv3）不误入 B感覚 分档',
  },
  {
    desc: 'M2804 COM5 二回目 助手玛奥それ以外 CFLAG:306 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        );\n        kojo.胸爱抚 = 2;',
    replace: '        );\n        kojo.胸爱抚 = 1; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 二回目：助手玛奥 + それ以外推进到 2',
  },
  {
    desc: 'M2805 COM5 二回目 非助手玛奥淫乱 RAND:2 三目分支写反（TERN_MOAN，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      const moan_word = rand_n(2) ? '继续、继续' : '去了、要去了';`,
    replace: `      const moan_word = rand_n(2) ? '去了、要去了' : '继续、继续'; // 变异：分支写反`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM5 二回目：非助手玛奥 + 淫乱，RAND:2 三目分岔可控，推进到 5',
  },
  {
    desc: 'M2806 COM5 二回目 非助手玛奥淫乱 CFLAG:306 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.胸爱抚 = 5;\n    } else if (',
    replace: '      kojo.胸爱抚 = 4; // 变异\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM5 二回目：非助手玛奥 + 淫乱，RAND:2 三目分岔可控，推进到 5',
  },
  {
    desc: 'M2807 COM5 二回目 非助手玛奥爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      era.get(\`talent:\${target}:85\`) === 1 &&
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕`,
    replace: `      era.get(\`talent:\${target}:76\`) === 1 && // 变异：条件错格
      (kojo.胸爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 二回目：非助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2808 COM5 二回目 非助手玛奥B感覚Lv3以上 CFLAG:306 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.胸爱抚 = 3;\n    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '      kojo.胸爱抚 = 2; // 变异\n    } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 二回目：非助手玛奥 + B感覚Lv3以上推进到 3',
  },
  {
    desc: 'M2809 COM5 二回目 非助手玛奥それ以外 CFLAG:306 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.胸爱抚 = 2;\n    }',
    replace: '      kojo.胸爱抚 = 1; // 变异\n    }',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM5 二回目：非助手玛奥 + それ以外推进到 2',
  },

  // —— #242（续轮）：K11 莉莉口上 SELECTCOM 6（接吻 CFLAG:307） ——
  {
    desc: 'M2810 COM6 首吻 淫乱かつ主人条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        !era_flag.assiplay &&
        chara(target).train.兽奸 === 0 &&
        chara(target).train.触手 === 0
      ) {
        // 淫乱かつ主人`,
    replace: `      if (
        era.get(\`talent:\${target}:85\`) === 1 && // 变异：条件错格
        !era_flag.assiplay &&
        chara(target).train.兽奸 === 0 &&
        chara(target).train.触手 === 0
      ) {
        // 淫乱かつ主人`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 首吻：淫乱且非助手陪玩',
  },
  {
    desc: 'M2811 COM6 首吻 爱慕かつ主人条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        era.get(\`talent:\${target}:85\`) === 1 &&
        !era_flag.assiplay &&
        chara(target).train.兽奸 === 0 &&
        chara(target).train.触手 === 0
      ) {
        // 爱慕かつ主人`,
    replace: `      } else if (
        era.get(\`talent:\${target}:76\`) === 1 && // 变异：条件错格
        !era_flag.assiplay &&
        chara(target).train.兽奸 === 0 &&
        chara(target).train.触手 === 0
      ) {
        // 爱慕かつ主人`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 首吻：爱慕且非助手陪玩',
  },
  {
    desc: 'M2812 COM6 首吻 助手玛奥淫乱 sub-branch 条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        // それ以外 → 助手玛奥
        if (era.get(\`talent:\${target}:76\`) === 1) {
          // 淫乱`,
    replace: `        // それ以外 → 助手玛奥
        if (era.get(\`talent:\${target}:85\`) === 1) {
          // 变异：条件错格（原 76）`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 首吻：助手玛奥 + 淫乱',
  },
  {
    desc: 'M2813 COM6 首吻 助手玛奥爱慕 sub-branch 条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          );\n        } else if (era.get(`talent:${target}:85`) === 1) {\n          // 爱慕\n          await era.printAndWait(`『嘿嘿嘿，和姐姐亲亲了${heart(1)}呣呣呣呒』`);',
    replace:
      '          );\n        } else if (era.get(`talent:${target}:76`) === 1) {\n          // 变异：条件错格（原 85）\n          await era.printAndWait(`『嘿嘿嘿，和姐姐亲亲了${heart(1)}呣呣呣呒』`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 首吻：助手玛奥 + 爱慕',
  },
  {
    desc: 'M2814 COM6 首吻 CFLAG:307 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        );\n      }\n      kojo.接吻 = 1;',
    replace: '        );\n      }\n      kojo.接吻 = 0; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 首吻：非助手玛奥 + それ以外',
  },
  {
    desc: 'M2815 COM6 初めて 助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      if (assi_mao) {\n        if (era.get(`talent:${target}:76`) === 1) {\n          // 淫乱\n          await era.printAndWait(`『最喜欢姐姐了♪』`);',
    replace:
      '      if (assi_mao) {\n        if (era.get(`talent:${target}:85`) === 1) {\n          // 变异：条件错格（原 76）\n          await era.printAndWait(`『最喜欢姐姐了♪』`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 初めて：助手玛奥 + 淫乱',
  },
  {
    desc: 'M2816 COM6 初めて 助手玛奥爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        } else if (era.get(\`talent:\${target}:85\`) === 1) {
          // 爱慕
          await era.printAndWait(
            \`「不，不要啦，\${player_name}…这种事…一点都不想做」\`,`,
    replace: `        } else if (era.get(\`talent:\${target}:76\`) === 1) {
          // 变异：条件错格（原 85）
          await era.printAndWait(
            \`「不，不要啦，\${player_name}…这种事…一点都不想做」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 初めて：助手玛奥 + 爱慕',
  },
  {
    desc: 'M2817 COM6 初めて 非助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (era.get(\`talent:\${target}:76\`) === 1) {
        // 淫乱
        await era.printAndWait(
          \`「呣呣呣…呣呒…魔王大人嘴里的味道…真好\${heart(1)}呣呣呣…」\`,`,
    replace: `      } else if (era.get(\`talent:\${target}:85\`) === 1) {
        // 变异：条件错格（原 76）
        await era.printAndWait(
          \`「呣呣呣…呣呒…魔王大人嘴里的味道…真好\${heart(1)}呣呣呣…」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 初めて：非助手玛奥 + 淫乱',
  },
  {
    desc: 'M2818 COM6 初めて 非助手玛奥爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (era.get(\`talent:\${target}:85\`) === 1) {
        // 爱慕
        await era.printAndWait(
          \`「唔？！呣呣呒…魔，魔王大人…呣啾啾\${heart(1)}」\`,`,
    replace: `      } else if (era.get(\`talent:\${target}:76\`) === 1) {
        // 变异：条件错格（原 85）
        await era.printAndWait(
          \`「唔？！呣呣呒…魔，魔王大人…呣啾啾\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 初めて：非助手玛奥 + 爱慕',
  },
  {
    desc: 'M2819 COM6 初めて CFLAG:307 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        await era.printAndWait(`${target_name}的眼泪已经夺眶而出………`);\n      }\n      kojo.接吻 = 1;',
    replace:
      '        await era.printAndWait(`${target_name}的眼泪已经夺眶而出………`);\n      }\n      kojo.接吻 = 0; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 初めて：非助手玛奥 + それ以外',
  },
  {
    desc: 'M2820 COM6 二回目 助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          \`「呣呣…舌头进来了、呣呣呣…跟姐姐亲亲舒服吗？\${heart(1)}」\`,`,
    replace: `      if (
        era.get(\`talent:\${target}:85\`) === 1 && // 变异：条件错格
        (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          \`「呣呣…舌头进来了、呣呣呣…跟姐姐亲亲舒服吗？\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2821 COM6 二回目 助手玛奥淫乱 CFLAG:307 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        );\n        kojo.接吻 = 5;',
    replace: '        );\n        kojo.接吻 = 4; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2822 COM6 二回目 助手玛奥爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕\n        await era.printAndWait(`『姐姐，好喜欢你…最喜欢了♪』`);',
    replace:
      '      } else if (\n        era.get(`talent:${target}:76`) === 1 && // 变异：条件错格\n        (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕\n        await era.printAndWait(`『姐姐，好喜欢你…最喜欢了♪』`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 二回目：助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2823 COM6 二回目 助手玛奥爱慕 CFLAG:307 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        );\n        kojo.接吻 = 4;',
    replace: '        );\n        kojo.接吻 = 3; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 二回目：助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2824 COM6 二回目 助手玛奥従順Lv2以上条件错格（>=2 改 >=1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        chara(target).system.顺从 >= 2 &&\n        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 従順Lv2以上\n        await era.printAndWait(`『来、姐姐，来亲亲♪』`);',
    replace:
      '      } else if (\n        chara(target).system.顺从 >= 1 && // 变异：条件错格\n        (kojo.接吻 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 従順Lv2以上\n        await era.printAndWait(`『来、姐姐，来亲亲♪』`);',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM6 二回目：助手玛奥 + 顺从恰为 Lv1（未达 Lv2）不误入従順分档',
  },
  {
    desc: 'M2825 COM6 二回目 助手玛奥従順Lv2以上 CFLAG:307 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        );\n        kojo.接吻 = 3;',
    replace: '        );\n        kojo.接吻 = 2; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 二回目：助手玛奥 + 従順Lv2以上推进到 3',
  },
  {
    desc: 'M2826 COM6 二回目 助手玛奥それ以外 CFLAG:307 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        await era.printAndWait(`「不行啊、我们是姐妹啊…不可以——呣呣呣！」`);\n        kojo.接吻 = 2;',
    replace:
      '        await era.printAndWait(`「不行啊、我们是姐妹啊…不可以——呣呣呣！」`);\n        kojo.接吻 = 1; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 二回目：助手玛奥 + それ以外推进到 2',
  },
  {
    desc: 'M2827 COM6 二回目 非助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        \`「吻我…魔王大人…呣呣…呣呒……再激烈一点…我想品尝魔王大人的，呣呣…呣呒，味道\${heart(1)}」\`,`,
    replace: `    } else if (
      era.get(\`talent:\${target}:85\`) === 1 && // 变异：条件错格
      (kojo.接吻 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        \`「吻我…魔王大人…呣呣…呣呒……再激烈一点…我想品尝魔王大人的，呣呣…呣呒，味道\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 二回目：非助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2828 COM6 二回目 非助手玛奥淫乱 CFLAG:307 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.接吻 = 5;\n    } else if (',
    replace: '      kojo.接吻 = 4; // 变异\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 二回目：非助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2829 COM6 二回目 非助手玛奥爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    } else if (\n      era.get(`talent:${target}:85`) === 1 &&\n      (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)\n    ) {\n      // 爱慕\n      await era.printAndWait(`「唔——呣呣呒…魔，魔王大人…呣啾啾${heart(1)}」`);',
    replace:
      '    } else if (\n      era.get(`talent:${target}:76`) === 1 && // 变异：条件错格\n      (kojo.接吻 <= 3 || game.kojo.口上开关 === 2)\n    ) {\n      // 爱慕\n      await era.printAndWait(`「唔——呣呣呒…魔，魔王大人…呣啾啾${heart(1)}」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 二回目：非助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2830 COM6 二回目 非助手玛奥爱慕 CFLAG:307 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.接吻 = 4;\n    } else if (',
    replace: '      kojo.接吻 = 3; // 变异\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 二回目：非助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2831 COM6 二回目 非助手玛奥従順Lv2以上 CFLAG:307 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.接吻 = 3;\n    } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '      kojo.接吻 = 2; // 变异\n    } else if (kojo.接吻 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 二回目：非助手玛奥 + 従順Lv2以上推进到 3',
  },
  {
    desc: 'M2832 COM6 二回目 非助手玛奥それ以外 CFLAG:307 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.接吻 = 2;\n    }',
    replace: '      kojo.接吻 = 1; // 变异\n    }',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM6 二回目：非助手玛奥 + それ以外推进到 2',
  },

  // —— #242（续轮）：K11 莉莉口上 SELECTCOM 7（自己扒开 CFLAG:308） ——
  {
    desc: 'M2833 COM7 初めて 助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (assi_mao) {
        if (era.get(\`talent:\${target}:76\`) === 1) {
          // 淫乱
          await era.printAndWait(
            \`「啊啊…还是有点害羞呢\${heart(1)} 为什么老是要这么欺负姐姐呢\${heart(1)}」\`,`,
    replace: `      if (assi_mao) {
        if (era.get(\`talent:\${target}:85\`) === 1) {
          // 变异：条件错格（原 76）
          await era.printAndWait(
            \`「啊啊…还是有点害羞呢\${heart(1)} 为什么老是要这么欺负姐姐呢\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 初めて：助手玛奥 + 淫乱',
  },
  {
    desc: 'M2834 COM7 初めて 非助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (era.get(\`talent:\${target}:76\`) === 1) {
        // 淫乱
        await era.printAndWait(
          \`「哈啊、请吧，魔王大人，尽情欣赏少女最私密的地方吧………\${heart(1)}」\`,`,
    replace: `      } else if (era.get(\`talent:\${target}:85\`) === 1) {
        // 变异：条件错格（原 76）
        await era.printAndWait(
          \`「哈啊、请吧，魔王大人，尽情欣赏少女最私密的地方吧………\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 初めて：非助手玛奥 + 淫乱 + 处女',
  },
  {
    desc: 'M2835 COM7 初めて 非助手玛奥淫乱处女分支写反（virgin 条件颠倒，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        await era.printAndWait(\n          `${target_name}扬起眉毛，献媚般地向${player_name}展示着自己的蜜穴深处。`,\n        );\n        if (virgin) {',
    replace:
      '        await era.printAndWait(\n          `${target_name}扬起眉毛，献媚般地向${player_name}展示着自己的蜜穴深处。`,\n        );\n        if (!virgin) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 初めて：非助手玛奥 + 淫乱 + 处女',
  },
  {
    desc: 'M2836 COM7 初めて CFLAG:308 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.自己扒开 = 1;',
    replace: `      kojo.自己扒开 = 0; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 初めて：非助手玛奥 + それ以外',
  },
  {
    desc: 'M2837 COM7 二回目 助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (virgin) {`,
    replace: `      if (
        era.get(\`talent:\${target}:85\`) === 1 && // 变异：条件错格
        (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (virgin) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 二回目：助手玛奥 + 淫乱 + 处女推进到 5',
  },
  {
    desc: 'M2838 COM7 二回目 助手玛奥淫乱 CFLAG:308 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.自己扒开 = 5;',
    replace: `        kojo.自己扒开 = 4; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 二回目：助手玛奥 + 淫乱 + 处女推进到 5',
  },
  {
    desc: 'M2839 COM7 二回目 助手玛奥爱慕露出癖条件错格（>=3 改 >=2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          await era.printAndWait(`「不要开玩笑啦！」`);\n          if (chara(target).system.露出癖 >= 3) {',
    replace:
      '          await era.printAndWait(`「不要开玩笑啦！」`);\n          if (chara(target).system.露出癖 >= 2) {\n            // 变异：条件错格',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM7 二回目：助手玛奥 + 爱慕 + 处女 + 露出癖恰为 Lv2（未达 Lv3）不误入爱液满溢分支',
  },
  {
    desc: 'M2840 COM7 二回目 助手玛奥爱慕 CFLAG:308 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.自己扒开 = 4;',
    replace: `        kojo.自己扒开 = 3; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM7 二回目：助手玛奥 + 爱慕 + 非处女 + 露出癖Lv3以上推进到 4',
  },
  {
    desc: 'M2841 COM7 二回目 助手玛奥露出癖Lv3以上条件错格（>=3 改 >=2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        chara(target).system.露出癖 >= 3 &&\n        (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 露出癖Lv3以上\n        await era.printAndWait(`「啊啊…这个姿势…能全部看清楚了吗？」`);',
    replace:
      '      } else if (\n        chara(target).system.露出癖 >= 2 && // 变异：条件错格\n        (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 露出癖Lv3以上\n        await era.printAndWait(`「啊啊…这个姿势…能全部看清楚了吗？」`);',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM7 二回目：助手玛奥 + 露出癖恰为 Lv2（未达 Lv3）不误入露出癖分档',
  },
  {
    desc: 'M2842 COM7 二回目 助手玛奥露出癖Lv3以上 CFLAG:308 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.自己扒开 = 3;',
    replace: `        kojo.自己扒开 = 2; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 二回目：助手玛奥 + 露出癖Lv3以上 + 处女推进到 3',
  },
  {
    desc: 'M2843 COM7 二回目 助手玛奥それ以外 CFLAG:308 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.自己扒开 = 2;',
    replace: `        kojo.自己扒开 = 1; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 二回目：助手玛奥 + それ以外 + 非处女推进到 2',
  },
  {
    desc: 'M2844 COM7 二回目 非助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    } else if (\n      era.get(`talent:${target}:76`) === 1 &&\n      (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)\n    ) {\n      // 淫乱\n      await era.printAndWait(`「哈啊…这个姿势就能全部看清了吧………${heart(1)}」`);',
    replace:
      '    } else if (\n      era.get(`talent:${target}:85`) === 1 && // 变异：条件错格\n      (kojo.自己扒开 <= 4 || game.kojo.口上开关 === 2)\n    ) {\n      // 淫乱\n      await era.printAndWait(`「哈啊…这个姿势就能全部看清了吧………${heart(1)}」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 二回目：非助手玛奥 + 淫乱 + 非处女推进到 5',
  },
  {
    desc: 'M2845 COM7 二回目 非助手玛奥淫乱 CFLAG:308 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.自己扒开 = 5;\n    } else if (',
    replace: '      kojo.自己扒开 = 4; // 变异\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 二回目：非助手玛奥 + 淫乱 + 非处女推进到 5',
  },
  {
    desc: 'M2846 COM7 二回目 非助手玛奥爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    } else if (\n      era.get(`talent:${target}:85`) === 1 &&\n      (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)\n    ) {\n      // 爱慕\n      await era.printAndWait(`「魔，魔王大人，请…看个够吧…${heart(1)}」`);',
    replace:
      '    } else if (\n      era.get(`talent:${target}:76`) === 1 && // 变异：条件错格\n      (kojo.自己扒开 <= 3 || game.kojo.口上开关 === 2)\n    ) {\n      // 爱慕\n      await era.printAndWait(`「魔，魔王大人，请…看个够吧…${heart(1)}」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 二回目：非助手玛奥 + 爱慕 + 处女推进到 4',
  },
  {
    desc: 'M2847 COM7 二回目 非助手玛奥爱慕 CFLAG:308 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.自己扒开 = 4;\n    } else if (',
    replace: '      kojo.自己扒开 = 3; // 变异\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 二回目：非助手玛奥 + 爱慕 + 处女推进到 4',
  },
  {
    desc: 'M2848 COM7 二回目 非助手玛奥露出癖Lv3以上条件错格（>=3 改 >=2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      chara(target).system.露出癖 >= 3 &&
      (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 露出癖Lv3以上
      await era.printAndWait(
        \`「羞，羞死人了…这个姿势…实在太羞耻了！可是…为什么手指…就是挪不开…哈啊」\`,`,
    replace: `    } else if (
      chara(target).system.露出癖 >= 2 && // 变异：条件错格
      (kojo.自己扒开 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 露出癖Lv3以上
      await era.printAndWait(
        \`「羞，羞死人了…这个姿势…实在太羞耻了！可是…为什么手指…就是挪不开…哈啊」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM7 二回目：非助手玛奥 + 露出癖恰为 Lv2（未达 Lv3）不误入露出癖分档',
  },
  {
    desc: 'M2849 COM7 二回目 非助手玛奥露出癖Lv3以上 CFLAG:308 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.自己扒开 = 3;\n    } else if (kojo.自己扒开 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '      kojo.自己扒开 = 2; // 变异\n    } else if (kojo.自己扒开 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 二回目：非助手玛奥 + 露出癖Lv3以上 + 非处女推进到 3',
  },
  {
    desc: 'M2850 COM7 二回目 非助手玛奥それ以外 CFLAG:308 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.自己扒开 = 2;\n    }',
    replace: '      kojo.自己扒开 = 1; // 变异\n    }',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 二回目：非助手玛奥 + それ以外 + 处女推进到 2',
  },
  {
    desc: 'M2851 COM7 处女条件错格（==1 改 ==0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  if (era_flag.selectcom === 7) {
    const virgin = era.get(\`talent:\${target}:0\`) === 1;`,
    replace: `  if (era_flag.selectcom === 7) {
    const virgin = era.get(\`talent:\${target}:0\`) === 0; // 变异：处女条件错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM7 初めて：非助手玛奥 + 淫乱 + 处女',
  },
  {
    desc: 'M2852 COM8 初めて 淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (era.get(`talent:${target}:76`) === 1) {\n        // 淫乱\n        await era.printAndWait(\n          `「哈啊${heart(1)} 感觉到了，你湿漉漉的手指${heart(1)}」`,\n        );',
    replace:
      '      } else if (era.get(`talent:${target}:85`) === 1) {\n        // 变异：条件错格\n        await era.printAndWait(\n          `「哈啊${heart(1)} 感觉到了，你湿漉漉的手指${heart(1)}」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 初めて：非助手玛奥 + 淫乱推进到 1',
  },
  {
    desc: 'M2853 COM8 初めて 屈服刻印Lv3+爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (mark(2) === 3 && era.get(`talent:${target}:85`) === 1) {\n        // 屈服刻印Lv3+爱慕\n        await era.printAndWait(`「魔王大人的话…想怎么做什么都可以…嗯啊啊！」`);',
    replace:
      '      } else if (mark(2) === 3 && era.get(`talent:${target}:76`) === 1) {\n        // 变异：条件错格\n        await era.printAndWait(`「魔王大人的话…想怎么做什么都可以…嗯啊啊！」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 初めて：非助手玛奥 + 屈服刻印Lv3+爱慕推进到 1',
  },
  {
    desc: 'M2854 COM8 初めて CFLAG:309 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.插入手指 = 1;\n      return 0;',
    replace: '      kojo.插入手指 = 0; // 变异\n      return 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 初めて：助手玛奥推进到 1',
  },
  {
    desc: 'M2855 COM8 二回目 助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (assi_mao) {
      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
      ) {`,
    replace: `    if (assi_mao) {
      if (
        era.get(\`talent:\${target}:85\`) === 1 && // 变异：条件错格
        (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)
      ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2856 COM8 二回目 助手玛奥淫乱 CFLAG:309 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.插入手指 = 5;',
    replace: `        kojo.插入手指 = 4; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2857 COM8 二回目 助手玛奥爱慕＋屈服刻印Lv3条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        era.get(\`talent:\${target}:85\`) === 1 &&
        mark(2) === 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋屈服刻印Lv3`,
    replace: `      } else if (
        era.get(\`talent:\${target}:76\`) === 1 && // 变异：条件错格
        mark(2) === 3 &&
        (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋屈服刻印Lv3`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 二回目：助手玛奥 + 爱慕＋屈服刻印Lv3推进到 4',
  },
  {
    desc: 'M2858 COM8 二回目 助手玛奥爱慕＋屈服刻印Lv3 CFLAG:309 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.插入手指 = 4;',
    replace: `        kojo.插入手指 = 3; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 二回目：助手玛奥 + 爱慕＋屈服刻印Lv3推进到 4',
  },
  {
    desc: 'M2859 COM8 二回目 助手玛奥屈服刻印Lv3条件错格（==3 改 ==2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        mark(2) === 3 &&\n        (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 屈服刻印Lv3\n        await era.printAndWait(`『姐姐变得老实得多了呢，是感觉到快感了吧？』`);',
    replace:
      '      } else if (\n        mark(2) === 2 && // 变异：条件错格\n        (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 屈服刻印Lv3\n        await era.printAndWait(`『姐姐变得老实得多了呢，是感觉到快感了吧？』`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 二回目：助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M2860 COM8 二回目 助手玛奥屈服刻印Lv3 CFLAG:309 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.插入手指 = 3;',
    replace: `        kojo.插入手指 = 2; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 二回目：助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M2861 COM8 二回目 助手玛奥それ以外 CFLAG:309 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.插入手指 = 2;',
    replace: `        kojo.插入手指 = 1; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 二回目：助手玛奥 + それ以外推进到 2',
  },
  {
    desc: 'M2862 COM8 二回目 非助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    } else if (\n      era.get(`talent:${target}:76`) === 1 &&\n      (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)\n    ) {\n      // 淫乱\n      await era.printAndWait(\n        `「哈啊${heart(1)} 蜜穴都湿透了，都是因为你${heart(1)}嗯啊」`,\n      );',
    replace:
      '    } else if (\n      era.get(`talent:${target}:85`) === 1 && // 变异：条件错格\n      (kojo.插入手指 <= 4 || game.kojo.口上开关 === 2)\n    ) {\n      // 淫乱\n      await era.printAndWait(\n        `「哈啊${heart(1)} 蜜穴都湿透了，都是因为你${heart(1)}嗯啊」`,\n      );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 二回目：非助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2863 COM8 二回目 非助手玛奥淫乱 CFLAG:309 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.插入手指 = 5;\n    } else if (',
    replace: '      kojo.插入手指 = 4; // 变异\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 二回目：非助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2864 COM8 二回目 非助手玛奥爱慕＋屈服刻印Lv3条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era.get(\`talent:\${target}:85\`) === 1 &&
      mark(2) === 3 &&
      (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋屈服刻印Lv3`,
    replace: `    } else if (
      era.get(\`talent:\${target}:76\`) === 1 && // 变异：条件错格
      mark(2) === 3 &&
      (kojo.插入手指 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋屈服刻印Lv3`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 二回目：非助手玛奥 + 爱慕＋屈服刻印Lv3推进到 4',
  },
  {
    desc: 'M2865 COM8 二回目 非助手玛奥爱慕＋屈服刻印Lv3 CFLAG:309 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.插入手指 = 4;\n    } else if (',
    replace: '      kojo.插入手指 = 3; // 变异\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 二回目：非助手玛奥 + 爱慕＋屈服刻印Lv3推进到 4',
  },
  {
    desc: 'M2866 COM8 二回目 非助手玛奥屈服刻印Lv3条件错格（==3 改 ==2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      mark(2) === 3 &&
      (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3`,
    replace: `    } else if (
      mark(2) === 2 && // 变异：条件错格
      (kojo.插入手指 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 二回目：非助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M2867 COM8 二回目 非助手玛奥屈服刻印Lv3 CFLAG:309 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.插入手指 = 3;\n    } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '      kojo.插入手指 = 2; // 变异\n    } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 二回目：非助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M2868 COM8 二回目 非助手玛奥それ以外 CFLAG:309 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.插入手指 = 2;\n    }',
    replace: '      kojo.插入手指 = 1; // 变异\n    }',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM8 二回目：非助手玛奥 + それ以外推进到 2',
  },
  {
    desc: 'M2869 COM9 初めて 淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (era.get(`talent:${target}:76`) === 1) {\n        // 淫乱\n        await era.printAndWait(`「真是的！连那种地方也要舔，你真是变态！」`);',
    replace:
      '      } else if (era.get(`talent:${target}:85`) === 1) {\n        // 变异：条件错格\n        await era.printAndWait(`「真是的！连那种地方也要舔，你真是变态！」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 初めて：非助手玛奥 + 淫乱推进到 1',
  },
  {
    desc: 'M2870 COM9 初めて 爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (era.get(`talent:${target}:85`) === 1) {\n        // 爱慕\n        await era.printAndWait(\n          `「不，不要舔那里，那里太…肮脏了啊！呜呜…嗯啊啊」`,\n        );',
    replace:
      '      } else if (era.get(`talent:${target}:76`) === 1) {\n        // 变异：条件错格\n        await era.printAndWait(\n          `「不，不要舔那里，那里太…肮脏了啊！呜呜…嗯啊啊」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 初めて：非助手玛奥 + 爱慕推进到 1',
  },
  {
    desc: 'M2871 COM9 初めて CFLAG:310 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      }\n      kojo.舔肛 = 1;\n      return 0;',
    replace: '      }\n      kojo.舔肛 = 0; // 变异\n      return 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 初めて：助手玛奥推进到 1',
  },
  {
    desc: 'M2872 COM9 二回目 助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (assi_mao) {
      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {`,
    replace: `    if (assi_mao) {
      if (
        era.get(\`talent:\${target}:85\`) === 1 && // 变异：条件错格
        (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)
      ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2873 COM9 二回目 助手玛奥淫乱 CFLAG:310 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        );\n        kojo.舔肛 = 5;',
    replace: '        );\n        kojo.舔肛 = 4; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2874 COM9 二回目 助手玛奥爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕\n        await era.printAndWait(\n          `「啊啊…这样太羞耻了…快停下，${player_name}…嗯啊啊」`,\n        );',
    replace:
      '      } else if (\n        era.get(`talent:${target}:76`) === 1 && // 变异：条件错格\n        (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕\n        await era.printAndWait(\n          `「啊啊…这样太羞耻了…快停下，${player_name}…嗯啊啊」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 二回目：助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2875 COM9 二回目 助手玛奥爱慕 CFLAG:310 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        );\n        kojo.舔肛 = 4;',
    replace: '        );\n        kojo.舔肛 = 3; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 二回目：助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2876 COM9 二回目 助手玛奥屈服刻印Lv3条件错格（==3 改 ==2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        mark(2) === 3 &&\n        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 屈服刻印Lv3\n        await era.printAndWait(\n          `「呃啊啊…姐姐一点都不觉得舒服…快，快点结束啦…嗯啊啊！」`,\n        );',
    replace:
      '      } else if (\n        mark(2) === 2 && // 变异：条件错格\n        (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 屈服刻印Lv3\n        await era.printAndWait(\n          `「呃啊啊…姐姐一点都不觉得舒服…快，快点结束啦…嗯啊啊！」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 二回目：助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M2877 COM9 二回目 助手玛奥屈服刻印Lv3 CFLAG:310 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        );\n        kojo.舔肛 = 3;',
    replace: '        );\n        kojo.舔肛 = 2; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 二回目：助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M2878 COM9 二回目 助手玛奥それ以外 CFLAG:310 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        );\n        kojo.舔肛 = 2;',
    replace: '        );\n        kojo.舔肛 = 1; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 二回目：助手玛奥 + それ以外推进到 2',
  },
  {
    desc: 'M2879 COM9 二回目 非助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    } else if (\n      era.get(`talent:${target}:76`) === 1 &&\n      (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)\n    ) {\n      // 淫乱\n      await era.printAndWait(\n        `「啊啊…魔王大人真是变态…喜欢…舔人家的肛门${heart(1)}哈啊」`,\n      );',
    replace:
      '    } else if (\n      era.get(`talent:${target}:85`) === 1 && // 变异：条件错格\n      (kojo.舔肛 <= 4 || game.kojo.口上开关 === 2)\n    ) {\n      // 淫乱\n      await era.printAndWait(\n        `「啊啊…魔王大人真是变态…喜欢…舔人家的肛门${heart(1)}哈啊」`,\n      );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 二回目：非助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2880 COM9 二回目 非助手玛奥淫乱 CFLAG:310 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.舔肛 = 5;\n    } else if (',
    replace: '      kojo.舔肛 = 4; // 变异\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 二回目：非助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2881 COM9 二回目 非助手玛奥爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era.get(\`talent:\${target}:85\`) === 1 &&
      (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕`,
    replace: `    } else if (
      era.get(\`talent:\${target}:76\`) === 1 && // 变异：条件错格
      (kojo.舔肛 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 二回目：非助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2882 COM9 二回目 非助手玛奥爱慕 CFLAG:310 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.舔肛 = 4;\n    } else if (mark(2) === 3 && (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)) {',
    replace:
      '      kojo.舔肛 = 3; // 变异\n    } else if (mark(2) === 3 && (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 二回目：非助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2883 COM9 二回目 非助手玛奥屈服刻印Lv3条件错格（==3 改 ==2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (mark(2) === 3 && (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)) {
      // 屈服刻印Lv3`,
    replace: `    } else if (mark(2) === 2 && (kojo.舔肛 <= 2 || game.kojo.口上开关 === 2)) {
      // 变异：条件错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 二回目：非助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M2884 COM9 二回目 非助手玛奥屈服刻印Lv3 CFLAG:310 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.舔肛 = 3;\n    } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '      kojo.舔肛 = 2; // 变异\n    } else if (kojo.舔肛 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 二回目：非助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M2885 COM9 二回目 非助手玛奥それ以外 CFLAG:310 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.舔肛 = 2;\n    }',
    replace: '      kojo.舔肛 = 1; // 变异\n    }',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM9 二回目：非助手玛奥 + それ以外推进到 2',
  },
  {
    desc: 'M2886 COM10 初めて 淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (era.get(`talent:${target}:76`) === 1) {\n        // 淫乱\n        await era.printAndWait(\n          `「啊啊，这样的震动…真让人…欲仙欲死${heart(1)}」`,\n        );',
    replace:
      '      } else if (era.get(`talent:${target}:85`) === 1) {\n        // 变异：条件错格\n        await era.printAndWait(\n          `「啊啊，这样的震动…真让人…欲仙欲死${heart(1)}」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 初めて：非助手玛奥 + 淫乱推进到 1',
  },
  {
    desc: 'M2887 COM10 初めて 屈服刻印Lv3+爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (mark(2) === 3 && era.get(\`talent:\${target}:85\`) === 1) {
        // 屈服刻印Lv3+爱慕
        await era.printAndWait(
          \`「呜啊！这，这是什么？啊啊啊震得太…太厉害了！」\`,
        );`,
    replace: `      } else if (mark(2) === 3 && era.get(\`talent:\${target}:76\`) === 1) {
        // 变异：条件错格
        await era.printAndWait(
          \`「呜啊！这，这是什么？啊啊啊震得太…太厉害了！」\`,
        );`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 初めて：非助手玛奥 + 屈服刻印Lv3+爱慕推进到 1',
  },
  {
    desc: 'M2888 COM10 初めて CFLAG:311 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.振动宝石 = 1;\n      return 0;',
    replace: '      kojo.振动宝石 = 0; // 变异\n      return 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 初めて：助手玛奥推进到 1',
  },
  {
    desc: 'M2889 COM10 二回目 助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (assi_mao) {
      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
      ) {`,
    replace: `    if (assi_mao) {
      if (
        era.get(\`talent:\${target}:85\`) === 1 && // 变异：条件错格
        (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)
      ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2890 COM10 二回目 助手玛奥淫乱 CFLAG:311 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.振动宝石 = 5;',
    replace: `        kojo.振动宝石 = 4; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2891 COM10 二回目 助手玛奥爱慕＋屈服刻印Lv3条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        era.get(\`talent:\${target}:85\`) === 1 &&
        mark(2) === 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋屈服刻印Lv3`,
    replace: `      } else if (
        era.get(\`talent:\${target}:76\`) === 1 && // 变异：条件错格
        mark(2) === 3 &&
        (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋屈服刻印Lv3`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 二回目：助手玛奥 + 爱慕＋屈服刻印Lv3推进到 4',
  },
  {
    desc: 'M2892 COM10 二回目 助手玛奥爱慕＋屈服刻印Lv3 CFLAG:311 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.振动宝石 = 4;',
    replace: `        kojo.振动宝石 = 3; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 二回目：助手玛奥 + 爱慕＋屈服刻印Lv3推进到 4',
  },
  {
    desc: 'M2893 COM10 二回目 助手玛奥屈服刻印Lv3条件错格（==3 改 ==2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        mark(2) === 3 &&\n        (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 屈服刻印Lv3\n        await era.printAndWait(`『姐姐变得老实多了呢，是不是已经有快感了？』`);',
    replace:
      '      } else if (\n        mark(2) === 2 && // 变异：条件错格\n        (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 屈服刻印Lv3\n        await era.printAndWait(`『姐姐变得老实多了呢，是不是已经有快感了？』`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 二回目：助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M2894 COM10 二回目 助手玛奥屈服刻印Lv3 CFLAG:311 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.振动宝石 = 3;',
    replace: `        kojo.振动宝石 = 2; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 二回目：助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M2895 COM10 二回目 助手玛奥それ以外 CFLAG:311 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.振动宝石 = 2;',
    replace: `        kojo.振动宝石 = 1; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 二回目：助手玛奥 + それ以外推进到 2',
  },
  {
    desc: 'M2896 COM10 二回目 非助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    } else if (\n      era.get(`talent:${target}:76`) === 1 &&\n      (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)\n    ) {\n      // 淫乱\n      await era.printAndWait(\n        `「呜啊啊！好舒服……小豆豆…好舒服！哈啊…嗯啊啊${heart(1)}」`,\n      );',
    replace:
      '    } else if (\n      era.get(`talent:${target}:85`) === 1 && // 变异：条件错格\n      (kojo.振动宝石 <= 4 || game.kojo.口上开关 === 2)\n    ) {\n      // 淫乱\n      await era.printAndWait(\n        `「呜啊啊！好舒服……小豆豆…好舒服！哈啊…嗯啊啊${heart(1)}」`,\n      );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 二回目：非助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2897 COM10 二回目 非助手玛奥淫乱 CFLAG:311 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.振动宝石 = 5;\n    } else if (',
    replace: '      kojo.振动宝石 = 4; // 变异\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 二回目：非助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2898 COM10 二回目 非助手玛奥爱慕＋屈服刻印Lv3条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era.get(\`talent:\${target}:85\`) === 1 &&
      mark(2) === 3 &&
      (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋屈服刻印Lv3`,
    replace: `    } else if (
      era.get(\`talent:\${target}:76\`) === 1 && // 变异：条件错格
      mark(2) === 3 &&
      (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕＋屈服刻印Lv3`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 二回目：非助手玛奥 + 爱慕＋屈服刻印Lv3推进到 4',
  },
  {
    desc: 'M2899 COM10 二回目 非助手玛奥爱慕＋屈服刻印Lv3 CFLAG:311 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.振动宝石 = 4;\n    } else if (',
    replace: '      kojo.振动宝石 = 3; // 变异\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 二回目：非助手玛奥 + 爱慕＋屈服刻印Lv3推进到 4',
  },
  {
    desc: 'M4000 COM10 二回目 非助手玛奥屈服刻印Lv3条件错格（==3 改 ==2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      mark(2) === 3 &&
      (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3`,
    replace: `    } else if (
      mark(2) === 2 && // 变异：条件错格
      (kojo.振动宝石 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 二回目：非助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M4001 COM10 二回目 非助手玛奥屈服刻印Lv3 CFLAG:311 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.振动宝石 = 3;\n    } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '      kojo.振动宝石 = 2; // 变异\n    } else if (kojo.振动宝石 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 二回目：非助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M4002 COM10 二回目 非助手玛奥それ以外 CFLAG:311 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.振动宝石 = 2;\n    }',
    replace: '      kojo.振动宝石 = 1; // 变异\n    }',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM10 二回目：非助手玛奥 + それ以外推进到 2',
  },
  {
    desc: 'M4003 COM11 初めて 处女条件错格（TALENT:0 == 1 改 == 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  if (era_flag.selectcom === 11) {
    const virgin = era.get(\`talent:\${target}:0\`) === 1;`,
    replace: `  if (era_flag.selectcom === 11) {
    const virgin = era.get(\`talent:\${target}:0\`) === 0; // 变异：条件错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 初めて（TEQUIP:11）：处女 + 助手玛奥 + 淫乱',
  },
  {
    desc: 'M2904 COM11 初めて 处女＋助手玛奥＋淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '            if (era.get(`talent:${target}:76`) === 1) {\n              // 淫乱\n              await era.printAndWait(\n                `「哈啊，啊啊啊…虽说是这样…但是…还是…很舒服啊${heart(1)}哈……」`,\n              );',
    replace:
      '            if (era.get(`talent:${target}:85`) === 1) {\n              // 变异：条件错格\n              await era.printAndWait(\n                `「哈啊，啊啊啊…虽说是这样…但是…还是…很舒服啊${heart(1)}哈……」`,\n              );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 初めて（TEQUIP:11）：处女 + 助手玛奥 + 淫乱',
  },
  {
    desc: 'M2905 COM11 初めて 处女＋助手玛奥＋爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `            } else if (era.get(\`talent:\${target}:85\`) === 1) {
              // 爱慕
              await era.printAndWait(
                \`「你，你明明知道我的心情！为什么还要…还要说这么残酷的话？！把它拔出去，拔出去啊！求求你………」\`,`,
    replace: `            } else if (era.get(\`talent:\${target}:76\`) === 1) {
              // 变异：条件错格
              await era.printAndWait(
                \`「你，你明明知道我的心情！为什么还要…还要说这么残酷的话？！把它拔出去，拔出去啊！求求你………」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 初めて：处女 + 助手玛奥 + 爱慕',
  },
  {
    desc: 'M2906 COM11 初めて 处女＋非助手玛奥＋淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `          } else if (era.get(\`talent:\${target}:76\`) === 1) {
            // 非助手玛奥・淫乱`,
    replace: `          } else if (era.get(\`talent:\${target}:85\`) === 1) {
            // 变异：条件错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 初めて：处女 + 非助手玛奥 + 淫乱',
  },
  {
    desc: 'M2907 COM11 初めて 处女＋非助手玛奥＋爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `          } else if (era.get(\`talent:\${target}:85\`) === 1) {
            // 非助手玛奥・爱慕`,
    replace: `          } else if (era.get(\`talent:\${target}:76\`) === 1) {
            // 变异：条件错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 初めて：处女 + 非助手玛奥 + 爱慕',
  },
  {
    desc: 'M2908 COM11 初めて 非处女＋助手玛奥条件错格（assi_mao 短路失效，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (assi_mao) {\n          // 非处女・助手玛奥\n          await era.printAndWait(`『啊哈哈、姐姐看，虫子从你下面钻进去了♪』`);',
    replace:
      '        } else if (!assi_mao) {\n          // 变异：条件错格\n          await era.printAndWait(`『啊哈哈、姐姐看，虫子从你下面钻进去了♪』`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 初めて：非处女 + 助手玛奥',
  },
  {
    desc: 'M2909 COM11 初めて 非处女＋淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        } else if (era.get(\`talent:\${target}:76\`) === 1) {
          // 非处女・淫乱`,
    replace: `        } else if (era.get(\`talent:\${target}:85\`) === 1) {
          // 变异：条件错格`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 初めて：非处女 + 非助手玛奥 + 淫乱',
  },
  {
    desc: 'M2910 COM11 初めて CFLAG:312 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.壶虫 = 1;\n        return 0;',
    replace: '        kojo.壶虫 = 0; // 变异\n        return 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 初めて（TEQUIP:11）：处女 + 助手玛奥 + 淫乱',
  },
  {
    desc: 'M2911 COM11 二回目 助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (assi_mao) {
        if (
          era.get(\`talent:\${target}:76\`) === 1 &&
          (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
        ) {`,
    replace: `      if (assi_mao) {
        if (
          era.get(\`talent:\${target}:85\`) === 1 && // 变异：条件错格
          (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)
        ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2912 COM11 二回目 助手玛奥淫乱 CFLAG:312 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.壶虫 = 5;',
    replace: `          kojo.壶虫 = 4; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2913 COM11 二回目 助手玛奥爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          // 爱慕\n          await era.printAndWait(\n            `『姐姐，告诉我，被蠕虫插进去舒服还是被阴茎插进去舒服些？』`,\n          );',
    replace:
      '        } else if (\n          era.get(`talent:${target}:76`) === 1 && // 变异：条件错格\n          (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          // 爱慕\n          await era.printAndWait(\n            `『姐姐，告诉我，被蠕虫插进去舒服还是被阴茎插进去舒服些？』`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 二回目：助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2914 COM11 二回目 助手玛奥爱慕 CFLAG:312 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.壶虫 = 4;',
    replace: `          kojo.壶虫 = 3; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 二回目：助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2915 COM11 二回目 助手玛奥V感覚Lv3以上条件错格（>= 3 改 >= 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        } else if (
          chara(target).system.私处感觉 >= 3 &&
          (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // V感覚Lv3以上
          await era.printAndWait(
            \`『哎呀，姐姐一副口水都要流出来了的表情呢，真的有那么舒服吗\${heart(1)}虫子已经要全部爬进去了哦哦』\`,`,
    replace: `        } else if (
          chara(target).system.私处感觉 >= 4 && // 变异：条件错格
          (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
        ) {
          // V感覚Lv3以上
          await era.printAndWait(
            \`『哎呀，姐姐一副口水都要流出来了的表情呢，真的有那么舒服吗\${heart(1)}虫子已经要全部爬进去了哦哦』\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 二回目：助手玛奥 + V感覚Lv3以上推进到 3',
  },
  {
    desc: 'M2916 COM11 二回目 助手玛奥V感覚Lv3以上 CFLAG:312 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.壶虫 = 3;',
    replace: `          kojo.壶虫 = 2; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 二回目：助手玛奥 + V感覚Lv3以上推进到 3',
  },
  {
    desc: 'M2917 COM11 二回目 助手玛奥それ以外 CFLAG:312 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.壶虫 = 2;',
    replace: `          kojo.壶虫 = 1; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 二回目：助手玛奥 + それ以外推进到 2',
  },
  {
    desc: 'M2918 COM11 二回目 非助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱\n        await era.printAndWait(\n          `「哈啊…啊！蜜穴被虫子…！啊啊…好…好舒服${heart(1)}」`,\n        );',
    replace:
      '      } else if (\n        era.get(`talent:${target}:85`) === 1 && // 变异：条件错格\n        (kojo.壶虫 <= 4 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱\n        await era.printAndWait(\n          `「哈啊…啊！蜜穴被虫子…！啊啊…好…好舒服${heart(1)}」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 二回目：非助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2919 COM11 二回目 非助手玛奥淫乱 CFLAG:312 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.壶虫 = 5;\n      } else if (',
    replace: '        kojo.壶虫 = 4; // 变异\n      } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 二回目：非助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2920 COM11 二回目 非助手玛奥爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕\n        await era.printAndWait(`「哈啊…啊！进，进去了…虫子…蜜穴里…嗯啊啊」`);',
    replace:
      '      } else if (\n        era.get(`talent:${target}:76`) === 1 && // 变异：条件错格\n        (kojo.壶虫 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕\n        await era.printAndWait(`「哈啊…啊！进，进去了…虫子…蜜穴里…嗯啊啊」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 二回目：非助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2921 COM11 二回目 非助手玛奥爱慕 CFLAG:312 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.壶虫 = 4;\n      } else if (',
    replace: '        kojo.壶虫 = 3; // 变异\n      } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 二回目：非助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2922 COM11 二回目 非助手玛奥V感覚Lv3以上条件错格（>= 3 改 >= 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        chara(target).system.私处感觉 >= 3 &&
        (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // V感覚Lv3以上
        await era.printAndWait(
          \`「这，这种东西钻进去…不会感觉到舒服的啦啊啊啊…哈啊…嗯啊啊！」\`,`,
    replace: `      } else if (
        chara(target).system.私处感觉 >= 4 && // 变异：条件错格
        (kojo.壶虫 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // V感覚Lv3以上
        await era.printAndWait(
          \`「这，这种东西钻进去…不会感觉到舒服的啦啊啊啊…哈啊…嗯啊啊！」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 二回目：非助手玛奥 + V感覚Lv3以上推进到 3',
  },
  {
    desc: 'M2923 COM11 二回目 非助手玛奥V感覚Lv3以上 CFLAG:312 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.壶虫 = 3;\n      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '        kojo.壶虫 = 2; // 变异\n      } else if (kojo.壶虫 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 二回目：非助手玛奥 + V感覚Lv3以上推进到 3',
  },
  {
    desc: 'M2924 COM11 二回目 非助手玛奥それ以外 CFLAG:312 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.壶虫 = 2;\n      }',
    replace: '        kojo.壶虫 = 1; // 变异\n      }',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 二回目：非助手玛奥 + それ以外推进到 2',
  },
  {
    desc: 'M2925 COM11 脱着時 淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (
      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {`,
    replace: `    if (
      era.get(\`talent:\${target}:85\`) === 1 && // 变异：条件错格
      (kojo.壶虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 脱着時（TEQUIP:11 == 0）：淫乱推进到 3',
  },
  {
    desc: 'M2926 COM11 脱着時 淫乱 CFLAG:372 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.壶虫着脱 = 3;',
    replace: `      kojo.壶虫着脱 = 2; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 脱着時（TEQUIP:11 == 0）：淫乱推进到 3',
  },
  {
    desc: 'M2927 COM11 脱着時 爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era.get(\`talent:\${target}:85\`) === 1 &&
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {`,
    replace: `    } else if (
      era.get(\`talent:\${target}:76\`) === 1 && // 变异：条件错格
      (kojo.壶虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 脱着時：爱慕推进到 2',
  },
  {
    desc: 'M2928 COM11 脱着時 爱慕 CFLAG:372 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.壶虫着脱 = 2;',
    replace: `      kojo.壶虫着脱 = 1; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 脱着時：爱慕推进到 2',
  },
  {
    desc: 'M2929 COM11 脱着時 それ以外 CFLAG:372 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.壶虫着脱 = 1;',
    replace: `      kojo.壶虫着脱 = 0; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM11 脱着時：それ以外推进到 1',
  },
  {
    desc: 'M2930 COM12 初めて 助手玛奥条件错格（assi_mao 短路失效，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      if (assi_mao) {\n        await era.printAndWait(\n          `『这个震动起来很厉害的哦，不知道姐姐能坚持多久呢♪』`,\n        );',
    replace:
      '      if (!assi_mao) {\n        // 变异：条件错格\n        await era.printAndWait(\n          `『这个震动起来很厉害的哦，不知道姐姐能坚持多久呢♪』`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 初めて：助手玛奥推进到 1',
  },
  {
    desc: 'M2931 COM12 初めて 淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (era.get(\`talent:\${target}:76\`) === 1) {
        // 淫乱
        await era.printAndWait(
          \`「啊啊啊…这个震动的频率…太，太快……啊啊啊…好…好舒服啊…\${heart(1)}」\`,`,
    replace: `      } else if (era.get(\`talent:\${target}:85\`) === 1) {
        // 变异：条件错格
        await era.printAndWait(
          \`「啊啊啊…这个震动的频率…太，太快……啊啊啊…好…好舒服啊…\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 初めて：非助手玛奥 + 淫乱推进到 1',
  },
  {
    desc: 'M2932 COM12 初めて 爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (era.get(`talent:${target}:85`) === 1) {\n        // 爱慕\n        await era.printAndWait(\n          `「这，这是？！这种东西不是用来按摩肩膀的——啊啊啊！」`,\n        );',
    replace:
      '      } else if (era.get(`talent:${target}:76`) === 1) {\n        // 变异：条件错格\n        await era.printAndWait(\n          `「这，这是？！这种东西不是用来按摩肩膀的——啊啊啊！」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 初めて：非助手玛奥 + 爱慕推进到 1',
  },
  {
    desc: 'M2933 COM12 初めて CFLAG:313 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.振动杖 = 1;\n      return 0;',
    replace: '      kojo.振动杖 = 0; // 变异\n      return 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 初めて：助手玛奥推进到 1',
  },
  {
    desc: 'M2934 COM12 二回目 助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (assi_mao) {
      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
      ) {`,
    replace: `    if (assi_mao) {
      if (
        era.get(\`talent:\${target}:85\`) === 1 && // 变异：条件错格
        (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
      ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2935 COM12 二回目 助手玛奥淫乱 CFLAG:313 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.振动杖 = 5;',
    replace: `        kojo.振动杖 = 4; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 二回目：助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2936 COM12 二回目 助手玛奥爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        era.get(\`talent:\${target}:85\`) === 1 &&
        (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          \`「哈…啊…又是这个！快，快拿开啊，姐姐怕痒啊啊啊…呼…呼…呃啊啊啊！」\`,`,
    replace: `      } else if (
        era.get(\`talent:\${target}:76\`) === 1 && // 变异：条件错格
        (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          \`「哈…啊…又是这个！快，快拿开啊，姐姐怕痒啊啊啊…呼…呼…呃啊啊啊！」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 二回目：助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2937 COM12 二回目 助手玛奥爱慕 CFLAG:313 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.振动杖 = 4;',
    replace: `        kojo.振动杖 = 3; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 二回目：助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2938 COM12 二回目 助手玛奥屈服刻印Lv3条件错格（==3 改 ==2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        mark(2) === 3 &&
        (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          \`『姐姐也开始露出舒服和享受的表情了呢，真是可爱～』\`,`,
    replace: `      } else if (
        mark(2) === 2 && // 变异：条件错格
        (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          \`『姐姐也开始露出舒服和享受的表情了呢，真是可爱～』\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 二回目：助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M2939 COM12 二回目 助手玛奥屈服刻印Lv3 CFLAG:313 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.振动杖 = 3;',
    replace: `        kojo.振动杖 = 2; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 二回目：助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M2940 COM12 二回目 助手玛奥それ以外 CFLAG:313 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.振动杖 = 2;',
    replace: `        kojo.振动杖 = 1; // 变异`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 二回目：助手玛奥 + それ以外推进到 2',
  },
  {
    desc: 'M2941 COM12 二回目 非助手玛奥淫乱条件错格（TALENT:76 改 :85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        \`「啊啊啊…这个感觉…好棒呃啊啊…简直太舒服了嗯啊啊啊…\${heart(1)}」\`,`,
    replace: `    } else if (
      era.get(\`talent:\${target}:85\`) === 1 && // 变异：条件错格
      (kojo.振动杖 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 淫乱
      await era.printAndWait(
        \`「啊啊啊…这个感觉…好棒呃啊啊…简直太舒服了嗯啊啊啊…\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 二回目：非助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2942 COM12 二回目 非助手玛奥淫乱 CFLAG:313 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.振动杖 = 5;\n    } else if (',
    replace: '      kojo.振动杖 = 4; // 变异\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 二回目：非助手玛奥 + 淫乱推进到 5',
  },
  {
    desc: 'M2943 COM12 二回目 非助手玛奥爱慕条件错格（TALENT:85 改 :76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era.get(\`talent:\${target}:85\`) === 1 &&
      (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        \`「啊啊啊…太…太激烈了…嗯啊啊…哈…哈…呃啊啊啊\${heart(1)}」\`,`,
    replace: `    } else if (
      era.get(\`talent:\${target}:76\`) === 1 && // 变异：条件错格
      (kojo.振动杖 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕
      await era.printAndWait(
        \`「啊啊啊…太…太激烈了…嗯啊啊…哈…哈…呃啊啊啊\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 二回目：非助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2944 COM12 二回目 非助手玛奥爱慕 CFLAG:313 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.振动杖 = 4;\n    } else if (',
    replace: '      kojo.振动杖 = 3; // 变异\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 二回目：非助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M2945 COM12 二回目 非助手玛奥屈服刻印Lv3条件错格（==3 改 ==2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    } else if (\n      mark(2) === 3 &&\n      (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)\n    ) {\n      // 屈服刻印Lv3\n      await era.printAndWait(`「不，不行啊…再继续就…就啊啊…哈啊…哈啊…！」`);',
    replace:
      '    } else if (\n      mark(2) === 2 && // 变异：条件错格\n      (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)\n    ) {\n      // 屈服刻印Lv3\n      await era.printAndWait(`「不，不行啊…再继续就…就啊啊…哈啊…哈啊…！」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 二回目：非助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M2946 COM12 二回目 非助手玛奥屈服刻印Lv3 CFLAG:313 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.振动杖 = 3;\n    } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '      kojo.振动杖 = 2; // 变异\n    } else if (kojo.振动杖 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 二回目：非助手玛奥 + 屈服刻印Lv3推进到 3',
  },
  {
    desc: 'M2947 COM12 二回目 非助手玛奥それ以外 CFLAG:313 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.振动杖 = 2;\n    }',
    replace: '      kojo.振动杖 = 1; // 变异\n    }',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM12 二回目：非助手玛奥 + それ以外推进到 2',
  },
  // ---- SELECTCOM 13（肛门虫 CFLAG:314／着脱 CFLAG:374，#242） ----
  {
    desc: 'M4004 COM13 TEQUIP:13 已装/未装条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `if (era_flag.selectcom === 13) {
    if (era.get(\`tequip:\${target}:13\`)) {`,
    replace: `if (era_flag.selectcom === 13) {
    if (!era.get(\`tequip:\${target}:13\`)) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 初めて（TEQUIP:13）：助手玛奥推进到 1',
  },
  {
    desc: 'M4005 COM13 初めて 淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (era.get(`talent:${target}:76`) === 1) {\n          // 淫乱\n          await era.printAndWait(\n            `「哈啊…哈啊………肛门要被这样的东西侵犯了………这个感觉…嗯啊啊${heart(1)}」`,\n          );',
    replace:
      '        } else if (era.get(`talent:${target}:85`) === 1) {\n          // 淫乱\n          await era.printAndWait(\n            `「哈啊…哈啊………肛门要被这样的东西侵犯了………这个感觉…嗯啊啊${heart(1)}」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 初めて：非助手玛奥 + 淫乱推进到 1',
  },
  {
    desc: 'M4006 COM13 初めて 爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (era.get(`talent:${target}:85`) === 1) {\n          // 爱慕\n          await era.printAndWait(\n            `「如果…如果是魔王大人希望这样的话…我会…我会…呃呃…呃嗯…」`,\n          );',
    replace:
      '        } else if (era.get(`talent:${target}:76`) === 1) {\n          // 爱慕\n          await era.printAndWait(\n            `「如果…如果是魔王大人希望这样的话…我会…我会…呃呃…呃嗯…」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 初めて：非助手玛奥 + 爱慕推进到 1',
  },
  {
    desc: 'M4007 COM13 初めて それ以外・A感覚Lv3以上条件错格（>=3 改 >=4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        } else if (chara(target).system.肛门感觉 >= 3) {
          // それ以外・A感覚Lv3以上`,
    replace: `        } else if (chara(target).system.肛门感觉 >= 4) {
          // それ以外・A感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 初めて：それ以外 + A感覚Lv3以上推进到 1',
  },
  {
    desc: 'M4008 COM13 初めて CFLAG:314 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.肛门虫 = 1;',
    replace: '        kojo.肛门虫 = 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 初めて：それ以外 + それ以外推进到 1',
  },
  // ---- 二回目以降・助手玛奥 ----
  {
    desc: 'M4009 COM13 二回目 助手玛奥淫乱＋A感覚Lv3以上条件错格（>=3 改 >=4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        if (\n          era.get(`talent:${target}:76`) === 1 &&\n          chara(target).system.肛门感觉 >= 3 &&\n          (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)\n        ) {\n          // 淫乱＋A感覚Lv3以上\n          await era.printAndWait(\n            `「哈啊…哈啊！虫子…完全进去了${heart(1)} 哈啊…呀呀…呀啊啊…姐姐的肛门……舒服得…要说不出话来了！」`,\n          );',
    replace:
      '        if (\n          era.get(`talent:${target}:76`) === 1 &&\n          chara(target).system.肛门感觉 >= 4 &&\n          (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)\n        ) {\n          // 淫乱＋A感覚Lv3以上\n          await era.printAndWait(\n            `「哈啊…哈啊！虫子…完全进去了${heart(1)} 哈啊…呀呀…呀啊啊…姐姐的肛门……舒服得…要说不出话来了！」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：助手玛奥 + 淫乱＋A感覚Lv3以上推进到 6',
  },
  {
    desc: 'M4010 COM13 二回目 助手玛奥淫乱＋A感覚Lv3以上 CFLAG:314 写错（6 改 5，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.肛门虫 = 6;\n        } else if (\n          era.get(`talent:${target}:76`) === 1 &&',
    replace:
      '          kojo.肛门虫 = 5;\n        } else if (\n          era.get(`talent:${target}:76`) === 1 &&',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：助手玛奥 + 淫乱＋A感覚Lv3以上推进到 6',
  },
  {
    desc: 'M4011 COM13 二回目 助手玛奥淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (\n          era.get(`talent:${target}:76`) === 1 &&\n          (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)\n        ) {\n          // 淫乱\n          await era.printAndWait(\n            `「哎…哎哟…稍微，稍微温柔一点啦…哈啊…啊啊！」`,\n          );',
    replace:
      '        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)\n        ) {\n          // 淫乱\n          await era.printAndWait(\n            `「哎…哎哟…稍微，稍微温柔一点啦…哈啊…啊啊！」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：助手玛奥 + 淫乱推进到 6',
  },
  {
    desc: 'M4012 COM13 二回目 助手玛奥淫乱 CFLAG:314 写错（6 改 5，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.肛门虫 = 6;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&',
    replace:
      '          kojo.肛门虫 = 5;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：助手玛奥 + 淫乱推进到 6',
  },
  {
    desc: 'M4013 COM13 二回目 助手玛奥爱慕＋A感覚Lv3以上条件错格（>=3 改 >=4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          chara(target).system.肛门感觉 >= 3 &&\n          (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)\n        ) {\n          // 爱慕＋A感覚Lv3以上\n          await era.printAndWait(\n            `「啊……哈啊…稍微…稍微慢一点…这样，这样就已经很舒服了！不，不需要再深入了！啊哈…啊啊…呀啊啊」`,\n          );',
    replace:
      '        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          chara(target).system.肛门感觉 >= 4 &&\n          (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)\n        ) {\n          // 爱慕＋A感覚Lv3以上\n          await era.printAndWait(\n            `「啊……哈啊…稍微…稍微慢一点…这样，这样就已经很舒服了！不，不需要再深入了！啊哈…啊啊…呀啊啊」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：助手玛奥 + 爱慕＋A感覚Lv3以上推进到 5',
  },
  {
    desc: 'M4014 COM13 二回目 助手玛奥爱慕＋A感覚Lv3以上 CFLAG:314 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.肛门虫 = 5;',
    replace: '          kojo.肛门虫 = 4;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：助手玛奥 + 爱慕＋A感覚Lv3以上推进到 5',
  },
  {
    desc: 'M4015 COM13 二回目 助手玛奥爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          // 爱慕\n          await era.printAndWait(\n            `「饶，饶了我吧，不要再欺负姐姐了…这样的东西…真的…不喜啊啊啊…啊哈…啊…！」`,\n          );',
    replace:
      '        } else if (\n          era.get(`talent:${target}:76`) === 1 &&\n          (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          // 爱慕\n          await era.printAndWait(\n            `「饶，饶了我吧，不要再欺负姐姐了…这样的东西…真的…不喜啊啊啊…啊哈…啊…！」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M4016 COM13 二回目 助手玛奥爱慕 CFLAG:314 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.肛门虫 = 4;',
    replace: '          kojo.肛门虫 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M4017 COM13 二回目 助手玛奥A感覚Lv3以上条件错格（>=3 改 >=4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (\n          chara(target).system.肛门感觉 >= 3 &&\n          (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)\n        ) {\n          // A感覚Lv3以上\n          await era.printAndWait(\n            `「哈…哈啊…进，进来…不，不可以…哈啊…呀呀…呀啊啊！」`,\n          );',
    replace:
      '        } else if (\n          chara(target).system.肛门感觉 >= 4 &&\n          (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)\n        ) {\n          // A感覚Lv3以上\n          await era.printAndWait(\n            `「哈…哈啊…进，进来…不，不可以…哈啊…呀呀…呀啊啊！」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：助手玛奥 + A感覚Lv3以上推进到 3',
  },
  {
    desc: 'M4018 COM13 二回目 助手玛奥A感覚Lv3以上 CFLAG:314 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.肛门虫 = 3;',
    replace: '          kojo.肛门虫 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：助手玛奥 + A感覚Lv3以上推进到 3',
  },
  {
    desc: 'M4019 COM13 二回目 助手玛奥それ以外 CFLAG:314 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.肛门虫 = 2;\n        }\n      } else if (\n        era.get(`talent:${target}:76`) === 1 &&\n        chara(target).system.肛门感觉 >= 3 &&\n        (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '          kojo.肛门虫 = 1;\n        }\n      } else if (\n        era.get(`talent:${target}:76`) === 1 &&\n        chara(target).system.肛门感觉 >= 3 &&\n        (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：助手玛奥 + それ以外推进到 2',
  },
  // ---- 二回目以降・非助手玛奥 ----
  {
    desc: 'M4020 COM13 二回目 非助手玛奥淫乱＋A感覚Lv3以上条件错格（>=3 改 >=4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        era.get(`talent:${target}:76`) === 1 &&\n        chara(target).system.肛门感觉 >= 3 &&\n        (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱＋A感覚Lv3以上\n        await era.printAndWait(\n          `「哈…哈啊${heart(1)} 全部，全部进到肛门里面了${heart(1)} 啊哈…啊啊…舒服得…要说不出话了${heart(1)}」`,\n        );',
    replace:
      '      } else if (\n        era.get(`talent:${target}:76`) === 1 &&\n        chara(target).system.肛门感觉 >= 4 &&\n        (kojo.肛门虫 <= 6 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱＋A感覚Lv3以上\n        await era.printAndWait(\n          `「哈…哈啊${heart(1)} 全部，全部进到肛门里面了${heart(1)} 啊哈…啊啊…舒服得…要说不出话了${heart(1)}」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：非助手玛奥 + 淫乱＋A感覚Lv3以上推进到 6',
  },
  {
    desc: 'M4021 COM13 二回目 非助手玛奥淫乱＋A感覚Lv3以上 CFLAG:314 写错（6 改 5，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.肛门虫 = 6;\n      } else if (\n        era.get(`talent:${target}:76`) === 1 &&',
    replace:
      '        kojo.肛门虫 = 5;\n      } else if (\n        era.get(`talent:${target}:76`) === 1 &&',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：非助手玛奥 + 淫乱＋A感覚Lv3以上推进到 6',
  },
  {
    desc: 'M4022 COM13 二回目 非助手玛奥淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱\n        await era.printAndWait(\n          `「哈啊…再，再稍微温柔一些…还是有点…哈啊，啊啊${heart(1)}」`,\n        );',
    replace:
      '      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        (kojo.肛门虫 <= 5 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱\n        await era.printAndWait(\n          `「哈啊…再，再稍微温柔一些…还是有点…哈啊，啊啊${heart(1)}」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：非助手玛奥 + 淫乱推进到 6',
  },
  {
    desc: 'M4023 COM13 二回目 非助手玛奥淫乱 CFLAG:314 写错（6 改 5，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.肛门虫 = 6;\n      } else if (\n        era.get(`talent:${target}:85`) === 1 &&',
    replace:
      '        kojo.肛门虫 = 5;\n      } else if (\n        era.get(`talent:${target}:85`) === 1 &&',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：非助手玛奥 + 淫乱推进到 6',
  },
  {
    desc: 'M4024 COM13 二回目 非助手玛奥爱慕＋A感覚Lv3以上条件错格（>=3 改 >=4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        chara(target).system.肛门感觉 >= 3 &&\n        (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕＋A感覚Lv3以上\n        await era.printAndWait(\n          `「哈啊，呼呼…整，整只都钻，钻进去了…啊哈…啊啊…舒服得…要说不出话了${heart(1)}」`,\n        );',
    replace:
      '      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        chara(target).system.肛门感觉 >= 4 &&\n        (kojo.肛门虫 <= 4 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕＋A感覚Lv3以上\n        await era.printAndWait(\n          `「哈啊，呼呼…整，整只都钻，钻进去了…啊哈…啊啊…舒服得…要说不出话了${heart(1)}」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：非助手玛奥 + 爱慕＋A感覚Lv3以上推进到 5',
  },
  {
    desc: 'M4025 COM13 二回目 非助手玛奥爱慕＋A感覚Lv3以上 CFLAG:314 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.肛门虫 = 5;\n      } else if (',
    replace: '        kojo.肛门虫 = 4;\n      } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：非助手玛奥 + 爱慕＋A感覚Lv3以上推进到 5',
  },
  {
    desc: 'M4026 COM13 二回目 非助手玛奥爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕\n        await era.printAndWait(\n          `「呃…还，还是有点害怕，但如果是魔王大人的要求的话…我会，我会——嗯啊啊啊…啊啊！」`,\n        );',
    replace:
      '      } else if (\n        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.肛门虫 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕\n        await era.printAndWait(\n          `「呃…还，还是有点害怕，但如果是魔王大人的要求的话…我会，我会——嗯啊啊啊…啊啊！」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：非助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M4027 COM13 二回目 非助手玛奥爱慕 CFLAG:314 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.肛门虫 = 4;\n      } else if (',
    replace: '        kojo.肛门虫 = 3;\n      } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：非助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M4028 COM13 二回目 非助手玛奥A感覚Lv3以上条件错格（>=3 改 >=4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        chara(target).system.肛门感觉 >= 3 &&\n        (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // A感覚Lv3以上\n        await era.printAndWait(\n          `「哈啊，呼呼…整，整只都钻，钻进去了…啊哈…啊啊${heart(1)}」`,\n        );',
    replace:
      '      } else if (\n        chara(target).system.肛门感觉 >= 4 &&\n        (kojo.肛门虫 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // A感覚Lv3以上\n        await era.printAndWait(\n          `「哈啊，呼呼…整，整只都钻，钻进去了…啊哈…啊啊${heart(1)}」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：非助手玛奥 + A感覚Lv3以上推进到 3',
  },
  {
    desc: 'M4029 COM13 二回目 非助手玛奥A感覚Lv3以上 CFLAG:314 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.肛门虫 = 3;\n      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '        kojo.肛门虫 = 2;\n      } else if (kojo.肛门虫 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：非助手玛奥 + A感覚Lv3以上推进到 3',
  },
  {
    desc: 'M4030 COM13 二回目 非助手玛奥それ以外 CFLAG:314 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.肛门虫 = 2;\n      }\n      return 0;',
    replace: '        kojo.肛门虫 = 1;\n      }\n      return 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 二回目：非助手玛奥 + それ以外推进到 2',
  },
  // ---- 脱着時（TEQUIP:13 == 0） ----
  {
    desc: 'M4031 COM13 脱着時 淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    // 脱着時（TEQUIP:13 == 0）\n    if (\n      era.get(`talent:${target}:76`) === 1 &&\n      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 === 2)\n    ) {',
    replace:
      '    // 脱着時（TEQUIP:13 == 0）\n    if (\n      era.get(`talent:${target}:85`) === 1 &&\n      (kojo.肛门虫着脱 < 4 || game.kojo.口上开关 === 2)\n    ) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 脱着時（TEQUIP:13 == 0）：淫乱推进到 4',
  },
  {
    desc: 'M4032 COM13 脱着時 淫乱 CFLAG:374 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.肛门虫着脱 = 4;',
    replace: '      kojo.肛门虫着脱 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 脱着時（TEQUIP:13 == 0）：淫乱推进到 4',
  },
  {
    desc: 'M4033 COM13 脱着時 爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era.get(\`talent:\${target}:85\`) === 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {`,
    replace: `    } else if (
      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.肛门虫着脱 < 3 || game.kojo.口上开关 === 2)
    ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 脱着時：爱慕推进到 3',
  },
  {
    desc: 'M4034 COM13 脱着時 爱慕 CFLAG:374 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.肛门虫着脱 = 3;',
    replace: '      kojo.肛门虫着脱 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 脱着時：爱慕推进到 3',
  },
  {
    desc: 'M4035 COM13 脱着時 A感覚Lv3以上条件错格（>=3 改 >=4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {`,
    replace: `    } else if (
      chara(target).system.肛门感觉 >= 4 &&
      (kojo.肛门虫着脱 < 2 || game.kojo.口上开关 === 2)
    ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 脱着時：A感覚Lv3以上推进到 2',
  },
  {
    desc: 'M4036 COM13 脱着時 A感覚Lv3以上 CFLAG:374 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.肛门虫着脱 = 2;',
    replace: '      kojo.肛门虫着脱 = 1;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 脱着時：A感覚Lv3以上推进到 2',
  },
  {
    desc: 'M4037 COM13 脱着時 それ以外 CFLAG:374 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.肛门虫着脱 = 1;\n    }\n    return 0;',
    replace: '      kojo.肛门虫着脱 = 0;\n    }\n    return 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM13 脱着時：それ以外推进到 1',
  },
  // ---- SELECTCOM 14（阴蒂夹 CFLAG:315／着脱 CFLAG:375，#242） ----
  {
    desc: 'M4038 COM14 TEQUIP:14 已装/未装条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `if (era_flag.selectcom === 14) {
    if (era.get(\`tequip:\${target}:14\`)) {`,
    replace: `if (era_flag.selectcom === 14) {
    if (!era.get(\`tequip:\${target}:14\`)) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 初めて：助手玛奥推进到 1',
  },
  {
    desc: 'M4039 COM14 初めて 淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (era.get(`talent:${target}:76`) === 1) {\n          // 淫乱\n          await era.printAndWait(\n            `「啊哈…嗯啊啊啊啊${heart(1)} 这个小玩意，怎么这么…呃啊啊${heart(1)} 舒服啊啊啊${heart(1)}」`,\n          );',
    replace:
      '        } else if (era.get(`talent:${target}:85`) === 1) {\n          // 淫乱\n          await era.printAndWait(\n            `「啊哈…嗯啊啊啊啊${heart(1)} 这个小玩意，怎么这么…呃啊啊${heart(1)} 舒服啊啊啊${heart(1)}」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 初めて：非助手玛奥 + 淫乱推进到 1',
  },
  {
    desc: 'M4040 COM14 初めて 爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (era.get(`talent:${target}:85`) === 1) {\n          // 爱慕\n          await era.printAndWait(\n            `「啊啊？！这…这是什么…额啊啊……太，太激烈了，魔王大人…能不能稍微…呃啊啊啊！」`,\n          );',
    replace:
      '        } else if (era.get(`talent:${target}:76`) === 1) {\n          // 爱慕\n          await era.printAndWait(\n            `「啊啊？！这…这是什么…额啊啊……太，太激烈了，魔王大人…能不能稍微…呃啊啊啊！」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 初めて：非助手玛奥 + 爱慕推进到 1',
  },
  {
    desc: 'M4041 COM14 初めて CFLAG:315 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.阴蒂夹 = 1;',
    replace: '        kojo.阴蒂夹 = 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 初めて：それ以外推进到 1',
  },
  // ---- 二回目以降・助手玛奥 ----
  {
    desc: 'M4042 COM14 二回目 助手玛奥淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        if (\n          era.get(`talent:${target}:76`) === 1 &&\n          (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          // 淫乱\n          await era.printAndWait(\n            `「哈啊…啊啊、还能不能…开得再强烈…一点点…啊啊…哈啊${heart(1)}」`,\n          );',
    replace:
      '        if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          // 淫乱\n          await era.printAndWait(\n            `「哈啊…啊啊、还能不能…开得再强烈…一点点…啊啊…哈啊${heart(1)}」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 二回目：助手玛奥 + 淫乱推进到 4',
  },
  {
    desc: 'M4043 COM14 二回目 助手玛奥淫乱 CFLAG:315 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.阴蒂夹 = 4;',
    replace: '          kojo.阴蒂夹 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 二回目：助手玛奥 + 淫乱推进到 4',
  },
  {
    desc: 'M4044 COM14 二回目 助手玛奥爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)\n        ) {\n          // 爱慕\n          await era.printAndWait(\n            `「哈啊…啊啊，这，这样就行了…不要再…加强了！」`,\n          );',
    replace:
      '        } else if (\n          era.get(`talent:${target}:76`) === 1 &&\n          (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)\n        ) {\n          // 爱慕\n          await era.printAndWait(\n            `「哈啊…啊啊，这，这样就行了…不要再…加强了！」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 二回目：助手玛奥 + 爱慕推进到 3',
  },
  {
    desc: 'M4045 COM14 二回目 助手玛奥爱慕 CFLAG:315 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.阴蒂夹 = 3;',
    replace: '          kojo.阴蒂夹 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 二回目：助手玛奥 + 爱慕推进到 3',
  },
  {
    desc: 'M4046 COM14 二回目 助手玛奥それ以外 CFLAG:315 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.阴蒂夹 = 2;',
    replace: '          kojo.阴蒂夹 = 1;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 二回目：助手玛奥 + それ以外推进到 2',
  },
  // ---- 二回目以降・非助手玛奥 ----
  {
    desc: 'M4047 COM14 二回目 非助手玛奥淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱\n        await era.printAndWait(\n          `「哈…哈啊…又是这个${heart(1)} 阴蒂感觉…太棒了啊啊…整个人都要…嗯啊啊啊${heart(1)}」`,\n        );',
    replace:
      '      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        (kojo.阴蒂夹 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱\n        await era.printAndWait(\n          `「哈…哈啊…又是这个${heart(1)} 阴蒂感觉…太棒了啊啊…整个人都要…嗯啊啊啊${heart(1)}」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 二回目：非助手玛奥 + 淫乱推进到 4',
  },
  {
    desc: 'M4048 COM14 二回目 非助手玛奥淫乱 CFLAG:315 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.阴蒂夹 = 4;\n      } else if (',
    replace: '        kojo.阴蒂夹 = 3;\n      } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 二回目：非助手玛奥 + 淫乱推进到 4',
  },
  {
    desc: 'M4049 COM14 二回目 非助手玛奥爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕\n        await era.printAndWait(\n          `「请、请魔王大人随意调教…${target_name}的阴蒂…嗯啊啊…啊啊${heart(1)}…震动…太强了…整个人好像都要…融化了${heart(1)}」`,\n        );',
    replace:
      '      } else if (\n        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.阴蒂夹 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕\n        await era.printAndWait(\n          `「请、请魔王大人随意调教…${target_name}的阴蒂…嗯啊啊…啊啊${heart(1)}…震动…太强了…整个人好像都要…融化了${heart(1)}」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 二回目：非助手玛奥 + 爱慕推进到 3',
  },
  {
    desc: 'M4050 COM14 二回目 非助手玛奥爱慕 CFLAG:315 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.阴蒂夹 = 3;\n      } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '        kojo.阴蒂夹 = 2;\n      } else if (kojo.阴蒂夹 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 二回目：非助手玛奥 + 爱慕推进到 3',
  },
  {
    desc: 'M4051 COM14 二回目 非助手玛奥それ以外 CFLAG:315 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.阴蒂夹 = 2;\n      }',
    replace: '        kojo.阴蒂夹 = 1;\n      }',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 二回目：非助手玛奥 + それ以外推进到 2',
  },
  // ---- 脱着時（TEQUIP:14 == 0） ----
  {
    desc: 'M4052 COM14 脱着時 淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    // 脱着時（TEQUIP:14 == 0）\n    if (\n      era.get(`talent:${target}:76`) === 1 &&\n      (kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 === 2)\n    ) {',
    replace:
      '    // 脱着時（TEQUIP:14 == 0）\n    if (\n      era.get(`talent:${target}:85`) === 1 &&\n      (kojo.阴蒂夹着脱 < 3 || game.kojo.口上开关 === 2)\n    ) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 脱着時（TEQUIP:14 == 0）：淫乱推进到 3',
  },
  {
    desc: 'M4053 COM14 脱着時 淫乱 CFLAG:375 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.阴蒂夹着脱 = 3;',
    replace: '      kojo.阴蒂夹着脱 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 脱着時（TEQUIP:14 == 0）：淫乱推进到 3',
  },
  {
    desc: 'M4054 COM14 脱着時 爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era.get(\`talent:\${target}:85\`) === 1 &&
      (kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {`,
    replace: `    } else if (
      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.阴蒂夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 脱着時：爱慕推进到 2',
  },
  {
    desc: 'M4055 COM14 脱着時 爱慕 CFLAG:375 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.阴蒂夹着脱 = 2;',
    replace: '      kojo.阴蒂夹着脱 = 1;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 脱着時：爱慕推进到 2',
  },
  {
    desc: 'M4056 COM14 脱着時 それ以外 CFLAG:375 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.阴蒂夹着脱 = 1;\n    }\n    return 0;',
    replace: '      kojo.阴蒂夹着脱 = 0;\n    }\n    return 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM14 脱着時：それ以外推进到 1',
  },
  // ---- SELECTCOM 15（乳头夹 CFLAG:316／着脱 CFLAG:376，#242） ----
  {
    desc: 'M4057 COM15 TEQUIP:15 已装/未装条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `if (era_flag.selectcom === 15) {
    if (era.get(\`tequip:\${target}:15\`)) {`,
    replace: `if (era_flag.selectcom === 15) {
    if (!era.get(\`tequip:\${target}:15\`)) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 初めて：助手玛奥推进到 1',
  },
  {
    desc: 'M4058 COM15 初めて 淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (era.get(`talent:${target}:76`) === 1) {\n          // 淫乱\n          await era.printAndWait(\n            `「哈啊…啊啊${heart(1)} 这个是…？夹在乳头上…感觉还挺合适的…${heart(1)}」`,\n          );',
    replace:
      '        } else if (era.get(`talent:${target}:85`) === 1) {\n          // 淫乱\n          await era.printAndWait(\n            `「哈啊…啊啊${heart(1)} 这个是…？夹在乳头上…感觉还挺合适的…${heart(1)}」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 初めて：非助手玛奥 + 淫乱推进到 1',
  },
  {
    desc: 'M4059 COM15 初めて 爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (era.get(`talent:${target}:85`) === 1) {\n          // 爱慕\n          await era.printAndWait(\n            `「哈，哈啊…这个…还会震动的…不过，好，好舒服…呼，呼，魔王大人…我这样…好看吗${heart(1)}」`,\n          );',
    replace:
      '        } else if (era.get(`talent:${target}:76`) === 1) {\n          // 爱慕\n          await era.printAndWait(\n            `「哈，哈啊…这个…还会震动的…不过，好，好舒服…呼，呼，魔王大人…我这样…好看吗${heart(1)}」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 初めて：非助手玛奥 + 爱慕推进到 1',
  },
  {
    desc: 'M4060 COM15 初めて CFLAG:316 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.乳头夹 = 1;',
    replace: '        kojo.乳头夹 = 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 初めて：それ以外推进到 1',
  },
  // ---- 二回目以降・助手玛奥 ----
  {
    desc: 'M4061 COM15 二回目 助手玛奥淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        if (\n          era.get(`talent:${target}:76`) === 1 &&\n          (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          // 淫乱\n          await era.printAndWait(\n            `『很般配哦，姐姐粉红色的乳头，戴上这个夹子后更色情了♪』`,\n          );',
    replace:
      '        if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          // 淫乱\n          await era.printAndWait(\n            `『很般配哦，姐姐粉红色的乳头，戴上这个夹子后更色情了♪』`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 二回目：助手玛奥 + 淫乱推进到 4',
  },
  {
    desc: 'M4062 COM15 二回目 助手玛奥淫乱 CFLAG:316 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.乳头夹 = 4;',
    replace: '          kojo.乳头夹 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 二回目：助手玛奥 + 淫乱推进到 4',
  },
  {
    desc: 'M4063 COM15 二回目 助手玛奥爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)\n        ) {\n          // 爱慕\n          await era.printAndWait(\n            `『这可是魔王大人赏赐的饰品哦，姐姐还不高高兴兴地戴上${heart(1)}』`,\n          );',
    replace:
      '        } else if (\n          era.get(`talent:${target}:76`) === 1 &&\n          (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)\n        ) {\n          // 爱慕\n          await era.printAndWait(\n            `『这可是魔王大人赏赐的饰品哦，姐姐还不高高兴兴地戴上${heart(1)}』`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 二回目：助手玛奥 + 爱慕推进到 3',
  },
  {
    desc: 'M4064 COM15 二回目 助手玛奥爱慕 CFLAG:316 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.乳头夹 = 3;',
    replace: '          kojo.乳头夹 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 二回目：助手玛奥 + 爱慕推进到 3',
  },
  {
    desc: 'M4065 COM15 二回目 助手玛奥それ以外 CFLAG:316 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.乳头夹 = 2;',
    replace: '          kojo.乳头夹 = 1;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 二回目：助手玛奥 + それ以外推进到 2',
  },
  // ---- 二回目以降・非助手玛奥 ----
  {
    desc: 'M4066 COM15 二回目 非助手玛奥淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱\n        await era.printAndWait(\n          `「啊啊…嗯啊啊${heart(1)} 我的乳头…要是坏掉了…你可要…负责人…哈啊…啊啊啊${heart(1)}」`,\n        );',
    replace:
      '      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        (kojo.乳头夹 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱\n        await era.printAndWait(\n          `「啊啊…嗯啊啊${heart(1)} 我的乳头…要是坏掉了…你可要…负责人…哈啊…啊啊啊${heart(1)}」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 二回目：非助手玛奥 + 淫乱推进到 4',
  },
  {
    desc: 'M4067 COM15 二回目 非助手玛奥淫乱 CFLAG:316 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.乳头夹 = 4;\n      } else if (',
    replace: '        kojo.乳头夹 = 3;\n      } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 二回目：非助手玛奥 + 淫乱推进到 4',
  },
  {
    desc: 'M4068 COM15 二回目 非助手玛奥爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕\n        await era.printAndWait(\n          `「${target_name}更…更希望魔王大人亲自…用嘴…和手指…调教…疼爱${target_name}的乳头${heart(1)}，这，这种道具…根本比不上…啊啊啊…哈啊」`,\n        );',
    replace:
      '      } else if (\n        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.乳头夹 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕\n        await era.printAndWait(\n          `「${target_name}更…更希望魔王大人亲自…用嘴…和手指…调教…疼爱${target_name}的乳头${heart(1)}，这，这种道具…根本比不上…啊啊啊…哈啊」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 二回目：非助手玛奥 + 爱慕推进到 3',
  },
  {
    desc: 'M4069 COM15 二回目 非助手玛奥爱慕 CFLAG:316 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.乳头夹 = 3;\n      } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '        kojo.乳头夹 = 2;\n      } else if (kojo.乳头夹 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 二回目：非助手玛奥 + 爱慕推进到 3',
  },
  {
    desc: 'M4070 COM15 二回目 非助手玛奥それ以外 CFLAG:316 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.乳头夹 = 2;\n      }',
    replace: '        kojo.乳头夹 = 1;\n      }',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 二回目：非助手玛奥 + それ以外推进到 2',
  },
  // ---- 脱着時（TEQUIP:15 == 0） ----
  {
    desc: 'M4071 COM15 脱着時 淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    // 脱着時（TEQUIP:15 == 0）\n    if (\n      era.get(`talent:${target}:76`) === 1 &&\n      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 === 2)\n    ) {',
    replace:
      '    // 脱着時（TEQUIP:15 == 0）\n    if (\n      era.get(`talent:${target}:85`) === 1 &&\n      (kojo.乳头夹着脱 < 3 || game.kojo.口上开关 === 2)\n    ) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 脱着時（TEQUIP:15 == 0）：淫乱推进到 3',
  },
  {
    desc: 'M4072 COM15 脱着時 淫乱 CFLAG:376 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.乳头夹着脱 = 3;',
    replace: '      kojo.乳头夹着脱 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 脱着時（TEQUIP:15 == 0）：淫乱推进到 3',
  },
  {
    desc: 'M4073 COM15 脱着時 爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era.get(\`talent:\${target}:85\`) === 1 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {`,
    replace: `    } else if (
      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.乳头夹着脱 < 2 || game.kojo.口上开关 === 2)
    ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 脱着時：爱慕推进到 2',
  },
  {
    desc: 'M4074 COM15 脱着時 爱慕 CFLAG:376 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.乳头夹着脱 = 2;',
    replace: '      kojo.乳头夹着脱 = 1;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 脱着時：爱慕推进到 2',
  },
  {
    desc: 'M4075 COM15 脱着時 それ以外 CFLAG:376 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.乳头夹着脱 = 1;\n    }\n    return 0;',
    replace: '      kojo.乳头夹着脱 = 0;\n    }\n    return 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM15 脱着時：それ以外推进到 1',
  },
  // ---- SELECTCOM 16（榨乳器 CFLAG:317／着脱 CFLAG:377，#242） ----
  {
    desc: 'M4076 COM16 TEQUIP:16 已装/未装条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `if (era_flag.selectcom === 16) {
    if (era.get(\`tequip:\${target}:16\`)) {`,
    replace: `if (era_flag.selectcom === 16) {
    if (!era.get(\`tequip:\${target}:16\`)) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 初めて：助手玛奥推进到 1',
  },
  {
    desc: 'M4077 COM16 初めて 淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (era.get(`talent:${target}:76`) === 1) {\n          // 淫乱\n          await era.printAndWait(\n            `「啊啊啊……分泌出乳汁了……不过感觉……好舒服${heart(1)}」`,\n          );',
    replace:
      '        } else if (era.get(`talent:${target}:85`) === 1) {\n          // 淫乱\n          await era.printAndWait(\n            `「啊啊啊……分泌出乳汁了……不过感觉……好舒服${heart(1)}」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 初めて：非助手玛奥 + 淫乱推进到 1',
  },
  {
    desc: 'M4078 COM16 初めて 爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (era.get(`talent:${target}:85`) === 1) {\n          // 爱慕\n          await era.printAndWait(\n            `「啊啊……乳汁，乳汁满满地出来了${heart(1)} 感觉……好奇怪……但是好舒服……${heart(1)}」`,\n          );',
    replace:
      '        } else if (era.get(`talent:${target}:76`) === 1) {\n          // 爱慕\n          await era.printAndWait(\n            `「啊啊……乳汁，乳汁满满地出来了${heart(1)} 感觉……好奇怪……但是好舒服……${heart(1)}」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 初めて：非助手玛奥 + 爱慕推进到 1',
  },
  {
    desc: 'M4079 COM16 初めて CFLAG:317 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.榨乳器 = 1;',
    replace: '        kojo.榨乳器 = 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 初めて：それ以外推进到 1',
  },
  // ---- 二回目以降・助手玛奥 ----
  {
    desc: 'M4080 COM16 二回目 助手玛奥淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        if (\n          era.get(`talent:${target}:76`) === 1 &&\n          (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          // 淫乱\n          await era.printAndWait(\n            `『哎嘿嘿，我又来给母牛姐姐挤奶了哦，这对淫乱的大胸部，不用来挤奶，真是太浪费了！』`,\n          );',
    replace:
      '        if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          // 淫乱\n          await era.printAndWait(\n            `『哎嘿嘿，我又来给母牛姐姐挤奶了哦，这对淫乱的大胸部，不用来挤奶，真是太浪费了！』`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM16 二回目：助手玛奥 + 淫乱 + RAND:2 命中（seq 1）推进到 4',
  },
  {
    desc: 'M4081 COM16 二回目 助手玛奥淫乱 RAND:2 条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          if (rand_n(2)) {\n            await era.printAndWait(\n              `「请……请吧……姐姐的胸部……想要怎么玩都可以${heart(1)}」`,',
    replace:
      '          if (!rand_n(2)) {\n            await era.printAndWait(\n              `「请……请吧……姐姐的胸部……想要怎么玩都可以${heart(1)}」`,',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM16 二回目：助手玛奥 + 淫乱 + RAND:2 命中（seq 1）推进到 4',
  },
  {
    desc: 'M4082 COM16 二回目 助手玛奥淫乱 CFLAG:317 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.榨乳器 = 4;',
    replace: '          kojo.榨乳器 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM16 二回目：助手玛奥 + 淫乱 + RAND:2 命中（seq 1）推进到 4',
  },
  {
    desc: 'M4083 COM16 二回目 助手玛奥爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)\n        ) {\n          // 爱慕\n          await era.printAndWait(\n            `『哎嘿嘿，姐姐的乳汁，一会儿我会全部好好喝光的哦♪』`,\n          );',
    replace:
      '        } else if (\n          era.get(`talent:${target}:76`) === 1 &&\n          (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)\n        ) {\n          // 爱慕\n          await era.printAndWait(\n            `『哎嘿嘿，姐姐的乳汁，一会儿我会全部好好喝光的哦♪』`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 二回目：助手玛奥 + 爱慕推进到 3',
  },
  {
    desc: 'M4084 COM16 二回目 助手玛奥爱慕 CFLAG:317 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.榨乳器 = 3;',
    replace: '          kojo.榨乳器 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 二回目：助手玛奥 + 爱慕推进到 3',
  },
  {
    desc: 'M4085 COM16 二回目 助手玛奥それ以外 CFLAG:317 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.榨乳器 = 2;',
    replace: '          kojo.榨乳器 = 1;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 二回目：助手玛奥 + それ以外推进到 2',
  },
  // ---- 二回目以降・非助手玛奥 ----
  {
    desc: 'M4086 COM16 二回目 非助手玛奥淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱\n        await era.printAndWait(\n          `「啊啊……开始习惯这种感觉了呢${heart(1)} 其实……还挺舒服的${heart(1)} 」`,\n        );',
    replace:
      '      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        (kojo.榨乳器 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱\n        await era.printAndWait(\n          `「啊啊……开始习惯这种感觉了呢${heart(1)} 其实……还挺舒服的${heart(1)} 」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 二回目：非助手玛奥 + 淫乱推进到 4',
  },
  {
    desc: 'M4087 COM16 二回目 非助手玛奥淫乱 CFLAG:317 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.榨乳器 = 4;\n      } else if (',
    replace: '        kojo.榨乳器 = 3;\n      } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 二回目：非助手玛奥 + 淫乱推进到 4',
  },
  {
    desc: 'M4088 COM16 二回目 非助手玛奥爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕\n        await era.printAndWait(\n          `「明明是给宝宝喝的东西、不过……如果魔王大人想要品尝的话，我也不介意啦${heart(1)}！」`,\n        );',
    replace:
      '      } else if (\n        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.榨乳器 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕\n        await era.printAndWait(\n          `「明明是给宝宝喝的东西、不过……如果魔王大人想要品尝的话，我也不介意啦${heart(1)}！」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 二回目：非助手玛奥 + 爱慕推进到 3',
  },
  {
    desc: 'M4089 COM16 二回目 非助手玛奥爱慕 CFLAG:317 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.榨乳器 = 3;\n      } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '        kojo.榨乳器 = 2;\n      } else if (kojo.榨乳器 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 二回目：非助手玛奥 + 爱慕推进到 3',
  },
  {
    desc: 'M4090 COM16 二回目 非助手玛奥それ以外 CFLAG:317 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.榨乳器 = 2;\n      }',
    replace: '        kojo.榨乳器 = 1;\n      }',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 二回目：非助手玛奥 + それ以外推进到 2',
  },
  // ---- 脱着時（TEQUIP:16 == 0） ----
  {
    desc: 'M4091 COM16 脱着時 淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    // 脱着時（TEQUIP:16 == 0）\n    if (\n      era.get(`talent:${target}:76`) === 1 &&\n      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)\n    ) {',
    replace:
      '    // 脱着時（TEQUIP:16 == 0）\n    if (\n      era.get(`talent:${target}:85`) === 1 &&\n      (kojo.榨乳器着脱 < 3 || game.kojo.口上开关 === 2)\n    ) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 脱着時（TEQUIP:16 == 0）：淫乱推进到 3',
  },
  {
    desc: 'M4092 COM16 脱着時 淫乱 CFLAG:377 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.榨乳器着脱 = 3;',
    replace: '      kojo.榨乳器着脱 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 脱着時（TEQUIP:16 == 0）：淫乱推进到 3',
  },
  {
    desc: 'M4093 COM16 脱着時 爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era.get(\`talent:\${target}:85\`) === 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 === 2)
    ) {`,
    replace: `    } else if (
      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.榨乳器着脱 < 2 || game.kojo.口上开关 === 2)
    ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 脱着時：爱慕推进到 2',
  },
  {
    desc: 'M4094 COM16 脱着時 爱慕 CFLAG:377 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.榨乳器着脱 = 2;',
    replace: '      kojo.榨乳器着脱 = 1;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 脱着時：爱慕推进到 2',
  },
  {
    desc: 'M4095 COM16 脱着時 それ以外 CFLAG:377 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.榨乳器着脱 = 1;\n    }\n    return 0;',
    replace: '      kojo.榨乳器着脱 = 0;\n    }\n    return 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM16 脱着時：それ以外推进到 1',
  },
  // ---- SELECTCOM 19（肛珠 CFLAG:320／脱着 CFLAG:379，#242） ----
  {
    desc: 'M4096 COM19 TEQUIP:19 已装/未装条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `if (era_flag.selectcom === 19) {
    if (era.get(\`tequip:\${target}:19\`)) {`,
    replace: `if (era_flag.selectcom === 19) {
    if (!era.get(\`tequip:\${target}:19\`)) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 初めて：助手玛奥推进到 1',
  },
  {
    desc: 'M4097 COM19 初めて 淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        } else if (era.get(\`talent:\${target}:76\`) === 1) {
          // 淫乱
          await era.printAndWait(
            \`「哈啊…哈呼…又，又进来一颗\${heart(1)}一会儿…再一下全部拔出去…♪」\`,`,
    replace: `        } else if (era.get(\`talent:\${target}:85\`) === 1) {
          // 淫乱
          await era.printAndWait(
            \`「哈啊…哈呼…又，又进来一颗\${heart(1)}一会儿…再一下全部拔出去…♪」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 初めて：非助手玛奥 + 淫乱推进到 1',
  },
  {
    desc: 'M4098 COM19 初めて 爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        } else if (era.get(\`talent:\${target}:85\`) === 1) {
          // 爱慕
          await era.printAndWait(
            \`「这个姿势真是…好害羞…呃啊…稍…稍微温柔一点…魔王大人……嗯啊…啊啊！」\`,`,
    replace: `        } else if (era.get(\`talent:\${target}:76\`) === 1) {
          // 爱慕
          await era.printAndWait(
            \`「这个姿势真是…好害羞…呃啊…稍…稍微温柔一点…魔王大人……嗯啊…啊啊！」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 初めて：非助手玛奥 + 爱慕推进到 1',
  },
  {
    desc: 'M4099 COM19 初めて CFLAG:320 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.肛珠 = 1;',
    replace: '        kojo.肛珠 = 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 初めて：それ以外推进到 1',
  },
  // ---- 二回目以降・助手玛奥 ----
  {
    desc: 'M4100 COM19 二回目 助手玛奥淫乱＋A感覚条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱＋A感覚Lv3以上`,
    replace: `        era.get(\`talent:\${target}:85\`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱＋A感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：助手玛奥 + 淫乱＋A感覚Lv3以上推进到 7',
  },
  {
    desc: 'M4101 COM19 二回目 助手玛奥淫乱＋A感覚 ABL 阈值错格（>=3 改 >=4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱＋A感覚Lv3以上`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        chara(target).system.肛门感觉 >= 4 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱＋A感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：助手玛奥 + 淫乱＋A感覚Lv3以上推进到 7',
  },
  {
    desc: 'M4102 COM19 二回目 助手玛奥淫乱＋A感覚 CFLAG:320 写错（7 改 6，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.肛珠 = 7;',
    replace: '          kojo.肛珠 = 6;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：助手玛奥 + 淫乱＋A感覚Lv3以上推进到 7',
  },
  {
    desc: 'M4103 COM19 二回目 助手玛奥淫乱 CFLAG:320 写错（6 改 5，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.肛珠 = 6;',
    replace: '          kojo.肛珠 = 5;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：助手玛奥 + 淫乱推进到 6',
  },
  {
    desc: 'M4104 COM19 二回目 助手玛奥爱慕＋A感覚条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        era.get(\`talent:\${target}:85\`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋A感覚Lv3以上`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋A感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：助手玛奥 + 爱慕＋A感覚Lv3以上推进到 5',
  },
  {
    desc: 'M4105 COM19 二回目 助手玛奥爱慕＋A感覚 CFLAG:320 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.肛珠 = 5;',
    replace: '          kojo.肛珠 = 4;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：助手玛奥 + 爱慕＋A感覚Lv3以上推进到 5',
  },
  {
    desc: 'M4106 COM19 二回目 助手玛奥爱慕 CFLAG:320 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.肛珠 = 4;',
    replace: '          kojo.肛珠 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M4107 COM19 二回目 助手玛奥 A感覚 ABL 阈值错格（>=3 改 >=4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // A感覚Lv3以上`,
    replace: `        chara(target).system.肛门感觉 >= 4 &&
        (kojo.肛珠 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // A感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：助手玛奥 + A感覚Lv3以上推进到 3',
  },
  {
    desc: 'M4108 COM19 二回目 助手玛奥 A感覚 CFLAG:320 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.肛珠 = 3;',
    replace: '          kojo.肛珠 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：助手玛奥 + A感覚Lv3以上推进到 3',
  },
  {
    desc: 'M4109 COM19 二回目 助手玛奥それ以外 CFLAG:320 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.肛珠 = 2;',
    replace: '          kojo.肛珠 = 1;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：助手玛奥 + それ以外推进到 2',
  },
  // ---- 二回目以降・非助手玛奥 ----
  {
    desc: 'M4110 COM19 二回目 非助手玛奥淫乱＋A感覚条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱＋A感覚Lv3以上`,
    replace: `        era.get(\`talent:\${target}:85\`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 6 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱＋A感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：非助手玛奥 + 淫乱＋A感覚Lv3以上推进到 7',
  },
  {
    desc: 'M4111 COM19 二回目 非助手玛奥淫乱＋A感覚 CFLAG:320 写错（7 改 6，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.肛珠 = 7;\n      } else if (',
    replace: '        kojo.肛珠 = 6;\n      } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：非助手玛奥 + 淫乱＋A感覚Lv3以上推进到 7',
  },
  {
    desc: 'M4112 COM19 二回目 非助手玛奥淫乱 CFLAG:320 写错（6 改 5，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.肛珠 = 6;\n      } else if (',
    replace: '        kojo.肛珠 = 5;\n      } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：非助手玛奥 + 淫乱推进到 6',
  },
  {
    desc: 'M4113 COM19 二回目 非助手玛奥爱慕＋A感覚条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        era.get(\`talent:\${target}:85\`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋A感覚Lv3以上`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.肛珠 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕＋A感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：非助手玛奥 + 爱慕＋A感覚Lv3以上推进到 5',
  },
  {
    desc: 'M4114 COM19 二回目 非助手玛奥爱慕＋A感覚 CFLAG:320 写错（5 改 4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.肛珠 = 5;\n      } else if (',
    replace: '        kojo.肛珠 = 4;\n      } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：非助手玛奥 + 爱慕＋A感覚Lv3以上推进到 5',
  },
  {
    desc: 'M4115 COM19 二回目 非助手玛奥爱慕 CFLAG:320 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.肛珠 = 4;\n      } else if (',
    replace: '        kojo.肛珠 = 3;\n      } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：非助手玛奥 + 爱慕推进到 4',
  },
  {
    desc: 'M4116 COM19 二回目 非助手玛奥 A感覚 CFLAG:320 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.肛珠 = 3;\n      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '        kojo.肛珠 = 2;\n      } else if (kojo.肛珠 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：非助手玛奥 + A感覚Lv3以上推进到 3',
  },
  {
    desc: 'M4117 COM19 二回目 非助手玛奥それ以外 CFLAG:320 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.肛珠 = 2;\n      }',
    replace: '        kojo.肛珠 = 1;\n      }',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 二回目：非助手玛奥 + それ以外推进到 2',
  },
  // ---- 脱着時（TEQUIP:19 == 0） ----
  {
    desc: 'M4118 COM19 脱着時 淫乱条件错格（TALENT:76 改 85，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    // 脱着時（TEQUIP:19 == 0）\n    if (\n      era.get(`talent:${target}:76`) === 1 &&\n      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 === 2)\n    ) {',
    replace:
      '    // 脱着時（TEQUIP:19 == 0）\n    if (\n      era.get(`talent:${target}:85`) === 1 &&\n      (kojo.肛珠着脱 < 4 || game.kojo.口上开关 === 2)\n    ) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 脱着時（TEQUIP:19 == 0）：淫乱推进到 4',
  },
  {
    desc: 'M4119 COM19 脱着時 淫乱 CFLAG:379 写错（4 改 3，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.肛珠着脱 = 4;',
    replace: '      kojo.肛珠着脱 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 脱着時（TEQUIP:19 == 0）：淫乱推进到 4',
  },
  {
    desc: 'M4120 COM19 脱着時 爱慕条件错格（TALENT:85 改 76，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era.get(\`talent:\${target}:85\`) === 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 === 2)
    ) {`,
    replace: `    } else if (
      era.get(\`talent:\${target}:76\`) === 1 &&
      (kojo.肛珠着脱 < 3 || game.kojo.口上开关 === 2)
    ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 脱着時：爱慕推进到 3',
  },
  {
    desc: 'M4121 COM19 脱着時 爱慕 CFLAG:379 写错（3 改 2，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.肛珠着脱 = 3;',
    replace: '      kojo.肛珠着脱 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 脱着時：爱慕推进到 3',
  },
  {
    desc: 'M4122 COM19 脱着時 A感覚 ABL 阈值错格（>=3 改 >=4，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 === 2)
    ) {`,
    replace: `    } else if (
      chara(target).system.肛门感觉 >= 4 &&
      (kojo.肛珠着脱 < 2 || game.kojo.口上开关 === 2)
    ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 脱着時：A感覚Lv3以上推进到 2',
  },
  {
    desc: 'M4123 COM19 脱着時 A感覚 CFLAG:379 写错（2 改 1，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.肛珠着脱 = 2;',
    replace: '      kojo.肛珠着脱 = 1;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 脱着時：A感覚Lv3以上推进到 2',
  },
  {
    desc: 'M4124 COM19 脱着時 それ以外 CFLAG:379 写错（1 改 0，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.肛珠着脱 = 1;',
    replace: '      kojo.肛珠着脱 = 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM19 脱着時：それ以外推进到 1',
  },
  // ---- SELECTCOM 20（正常位 CFLAG:321，#242） ----
  {
    desc: 'M4125 COM20 weapon 三目条件 && 改 ||（TALENT:121/122 条件松动）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    const weapon =
      era0(\`talent:\${player}:121\`) === 0 && era0(\`talent:\${player}:122\`) === 0
        ? '电动假阳具'
        : '阴茎';
    if (kojo.正常位 === 0) {`,
    replace: `    const weapon =
      era0(\`talent:\${player}:121\`) === 0 || era0(\`talent:\${player}:122\`) === 0
        ? '电动假阳具'
        : '阴茎';
    if (kojo.正常位 === 0) {`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM20 二回目：weapon 三目条件为 &&——TALENT:121/122 一 0 一 1 时须选阴茎',
  },
  {
    desc: 'M4126 COM20 初めて 处女条件 === 1 改 === 0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    if (kojo.正常位 === 0) {\n      // 初めて\n      const virgin = era.get(`talent:${target}:0`) === 1;',
    replace:
      '    if (kojo.正常位 === 0) {\n      // 初めて\n      const virgin = era.get(`talent:${target}:0`) === 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM20 初めて：处女 + 助手玛奥 + 淫乱',
  },
  {
    desc: 'M4127 COM20 初めて CFLAG:321 写错（1 改 0）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: 'kojo.正常位 = 1;',
    replace: 'kojo.正常位 = 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM20 初めて：处女 + 助手玛奥 + 淫乱',
  },
  {
    desc: 'M4128 COM20 助手玛奥淫乱 CFLAG:321 写错（6 改 5）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.正常位 = 6;',
    replace: '        kojo.正常位 = 5;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM20 二回目：助手玛奥 + 淫乱',
  },
  {
    desc: 'M4129 COM20 助手玛奥爱慕 CFLAG:321 写错（5 改 4）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.正常位 = 5;',
    replace: '        kojo.正常位 = 4;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM20 二回目：助手玛奥 + 爱慕，推进到 5',
  },
  {
    desc: 'M4130 COM20 助手玛奥屈服刻印Lv3＋V感覚 CFLAG:321 写错（4 改 3）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.正常位 = 4;',
    replace: '        kojo.正常位 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM20 二回目：助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4',
  },
  {
    desc: 'M4131 COM20 助手玛奥屈服刻印Lv3 CFLAG:321 写错（3 改 2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.正常位 = 3;',
    replace: '        kojo.正常位 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM20 二回目：助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4132 COM20 助手玛奥それ以外 CFLAG:321 写错（2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.正常位 = 2;',
    replace: '        kojo.正常位 = 1;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM20 二回目：助手玛奥 + それ以外，推进到 2',
  },
  {
    desc: 'M4133 COM20 非助手玛奥淫乱 CFLAG:321 写错（6 改 5）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.正常位 = 6;\n    } else if (',
    replace: '      kojo.正常位 = 5;\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM20 二回目：非助手玛奥 + 淫乱，推进到 6',
  },
  {
    desc: 'M4134 COM20 非助手玛奥爱慕 CFLAG:321 写错（5 改 4）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.正常位 = 5;\n    } else if (',
    replace: '      kojo.正常位 = 4;\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM20 二回目：非助手玛奥 + 爱慕，推进到 5',
  },
  {
    desc: 'M4135 COM20 非助手玛奥屈服刻印Lv3＋V感覚 CFLAG:321 写错（4 改 3）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.正常位 = 4;\n    } else if (',
    replace: '      kojo.正常位 = 3;\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM20 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，RAND:3 分岔推进到 4',
  },
  {
    desc: 'M4136 COM20 非助手玛奥屈服刻印Lv3 CFLAG:321 写错（3 改 2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.正常位 = 3;\n    } else if (kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '      kojo.正常位 = 2;\n    } else if (kojo.正常位 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM20 二回目：非助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4137 COM20 非助手玛奥それ以外 CFLAG:321 写错（2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.正常位 = 2;\n    }',
    replace: '      kojo.正常位 = 1;\n    }',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM20 二回目：それ以外，推进到 2',
  },
  {
    desc: 'M4138 COM20 助手玛奥 屈服刻印Lv3＋V感覚层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上`,
    replace: `        mark(2) === 2 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM20 二回目：助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4',
  },
  {
    desc: 'M4139 COM20 非助手玛奥 屈服刻印Lv3＋V感覚层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      mark(2) === 3 &&
      chara(target).system.私处感觉 >= 3 &&
      (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上`,
    replace: `      mark(2) === 2 &&
      chara(target).system.私处感觉 >= 3 &&
      (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM20 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，RAND:3 分岔推进到 4',
  },
  {
    desc: 'M4140 COM20 助手玛奥 屈服刻印Lv3＋V感覚层检查 私处感觉>=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上`,
    replace: `        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 4 &&
        (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM20 二回目：助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4',
  },
  {
    desc: 'M4141 COM20 非助手玛奥 屈服刻印Lv3＋V感覚层检查 私处感觉>=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      mark(2) === 3 &&
      chara(target).system.私处感觉 >= 3 &&
      (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上`,
    replace: `      mark(2) === 3 &&
      chara(target).system.私处感觉 >= 4 &&
      (kojo.正常位 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM20 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，RAND:3 分岔推进到 4',
  },
  {
    desc: 'M4142 COM20 助手玛奥 屈服刻印Lv3层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        mark(2) === 3 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3`,
    replace: `        mark(2) === 2 &&
        (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM20 二回目：助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4143 COM20 非助手玛奥 屈服刻印Lv3层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      mark(2) === 3 &&
      (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3`,
    replace: `      mark(2) === 2 &&
      (kojo.正常位 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM20 二回目：非助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4144 COM20 助手玛奥淫乱 RAND:3 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        if (rand_n(3) === 0) {
          await era.print(
            \`『姐姐的蜜穴……真是舒服得让人无法忍受啊啊\${heart(1)}』\`,`,
    replace: `        if (rand_n(3) === 1) {
          await era.print(
            \`『姐姐的蜜穴……真是舒服得让人无法忍受啊啊\${heart(1)}』\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM20 二回目：助手玛奥 + 淫乱，RAND:3 三选一 + ABL:2 私处感觉门槛可控',
  },
  {
    desc: 'M4145 COM20 非助手玛奥淫乱 RAND:3 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (rand_n(3) === 0) {
        await era.printAndWait(
          \`「哈啊…啊啊…还可以…再，再深一点…再往里一点…\${heart(1)}」\`,`,
    replace: `      if (rand_n(3) === 1) {
        await era.printAndWait(
          \`「哈啊…啊啊…还可以…再，再深一点…再往里一点…\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM20 二回目：weapon 三目——玩家持 TALENT:121 时改用阴茎',
  },
  {
    desc: 'M4146 COM20 非助手玛奥屈服刻印Lv3＋V感覚 RAND:3 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      if (rand_n(3) === 0) {\n        await era.printAndWait(`「哈啊…嗯啊啊…插，插进来了…」`);\n        await era.printAndWait(',
    replace:
      '      if (rand_n(3) === 1) {\n        await era.printAndWait(`「哈啊…嗯啊啊…插，插进来了…」`);\n        await era.printAndWait(',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM20 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，RAND:3 分岔推进到 4',
  },
  // ---- SELECTCOM 21（背后位 CFLAG:322，#242） ----
  {
    desc: 'M4147 COM21 weapon_doggy 三目条件 && 改 ||（TALENT:121/122 条件松动）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    const weapon_doggy =
      era0(\`talent:\${player}:121\`) === 0 && era0(\`talent:\${player}:122\`) === 0
        ? '震动假阳具'
        : '阴茎';`,
    replace: `    const weapon_doggy =
      era0(\`talent:\${player}:121\`) === 0 || era0(\`talent:\${player}:122\`) === 0
        ? '震动假阳具'
        : '阴茎';`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM21 初めて：非处女 + 助手玛奥 + 爱慕',
  },
  {
    desc: 'M4148 COM21 初めて 处女条件 === 1 改 === 0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    if (kojo.背后位 === 0) {\n      // 初めて\n      const virgin = era.get(`talent:${target}:0`) === 1;',
    replace:
      '    if (kojo.背后位 === 0) {\n      // 初めて\n      const virgin = era.get(`talent:${target}:0`) === 0;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM21 初めて：处女 + 助手玛奥 + 淫乱，weapon_doggy 三目震动假阳具支',
  },
  {
    desc: 'M4149 COM21 初めて CFLAG:322 写错（1 改 0）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      }\n      kojo.背后位 = 1;',
    replace: '      }\n      kojo.背后位 = 0;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM21 初めて：处女 + 助手玛奥 + 淫乱，weapon_doggy 三目震动假阳具支',
  },
  {
    desc: 'M4150 COM21 助手玛奥淫乱 CFLAG:322 写错（6 改 5）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        }\n        kojo.背后位 = 6;',
    replace: '        }\n        kojo.背后位 = 5;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM21 二回目：助手玛奥 + 淫乱，RAND:3 三选一 + ABL:2 私处感觉分岔可控',
  },
  {
    desc: 'M4151 COM21 助手玛奥爱慕 CFLAG:322 写错（5 改 4）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        }\n        kojo.背后位 = 5;',
    replace: '        }\n        kojo.背后位 = 4;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM21 二回目：助手玛奥 + 爱慕，推进到 5',
  },
  {
    desc: 'M4152 COM21 助手玛奥屈服刻印Lv3＋V感覚 CFLAG:322 写错（4 改 3）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        }\n        kojo.背后位 = 4;',
    replace: '        }\n        kojo.背后位 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM21 二回目：助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4',
  },
  {
    desc: 'M4153 COM21 助手玛奥屈服刻印Lv3 CFLAG:322 写错（3 改 2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        );\n        kojo.背后位 = 3;',
    replace: '        );\n        kojo.背后位 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM21 二回目：助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4154 COM21 助手玛奥それ以外 CFLAG:322 写错（2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        );\n        kojo.背后位 = 2;',
    replace: '        );\n        kojo.背后位 = 1;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM21 二回目：助手玛奥 + それ以外，推进到 2',
  },
  {
    desc: 'M4155 COM21 非助手玛奥淫乱 CFLAG:322 写错（6 改 5）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.背后位 = 6;\n    } else if (',
    replace: '      kojo.背后位 = 5;\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM21 二回目：非助手玛奥 + 淫乱，推进到 6',
  },
  {
    desc: 'M4156 COM21 非助手玛奥爱慕 CFLAG:322 写错（5 改 4）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.背后位 = 5;\n    } else if (',
    replace: '      kojo.背后位 = 4;\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM21 二回目：非助手玛奥 + 爱慕，推进到 5',
  },
  {
    desc: 'M4157 COM21 非助手玛奥屈服刻印Lv3＋V感覚 CFLAG:322 写错（4 改 3）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.背后位 = 4;\n    } else if (',
    replace: '      kojo.背后位 = 3;\n    } else if (',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM21 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4',
  },
  {
    desc: 'M4158 COM21 非助手玛奥屈服刻印Lv3 CFLAG:322 写错（3 改 2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.背后位 = 3;\n    } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {',
    replace:
      '      kojo.背后位 = 2;\n    } else if (kojo.背后位 <= 1 || game.kojo.口上开关 === 2) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM21 二回目：非助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4159 COM21 それ以外 CFLAG:322 写错（2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.背后位 = 2;\n    }',
    replace: '      kojo.背后位 = 1;\n    }',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM21 二回目：それ以外，推进到 2',
  },
  {
    desc: 'M4160 COM21 助手玛奥 屈服刻印Lv3＋V感覚层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上`,
    replace: `      } else if (
        mark(2) === 2 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM21 二回目：助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4',
  },
  {
    desc: 'M4161 COM21 非助手玛奥 屈服刻印Lv3＋V感覚层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      mark(2) === 3 &&
      chara(target).system.私处感觉 >= 3 &&
      (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上`,
    replace: `    } else if (
      mark(2) === 2 &&
      chara(target).system.私处感觉 >= 3 &&
      (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3＋V感覚Lv3以上`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM21 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4',
  },
  {
    desc: 'M4162 COM21 助手玛奥 屈服刻印Lv3层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        mark(2) === 3 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3`,
    replace: `      } else if (
        mark(2) === 2 &&
        (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM21 二回目：助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4163 COM21 非助手玛奥 屈服刻印Lv3层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      mark(2) === 3 &&
      (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3`,
    replace: `    } else if (
      mark(2) === 2 &&
      (kojo.背后位 <= 2 || game.kojo.口上开关 === 2)
    ) {
      // 屈服刻印Lv3`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM21 二回目：非助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4164 COM21 助手玛奥淫乱 talent:76 检查 === 1 改 === 0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱`,
    replace: `      if (
        era.get(\`talent:\${target}:76\`) === 0 &&
        (kojo.背后位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM21 二回目：助手玛奥 + 淫乱，RAND:3 三选一 + ABL:2 私处感觉分岔可控',
  },
  {
    desc: 'M4165 COM21 非助手玛奥爱慕 talent:85 检查 === 1 改 === 0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era.get(\`talent:\${target}:85\`) === 1 &&
      (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕`,
    replace: `    } else if (
      era.get(\`talent:\${target}:85\`) === 0 &&
      (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)
    ) {
      // 爱慕`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM21 二回目：非助手玛奥 + 爱慕，推进到 5',
  },
  {
    desc: 'M4166 COM21 助手玛奥淫乱 RAND:3 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        if (rand_n(3) === 0) {
          await era.print(
            \`『哈啊…姐姐的蜜穴…全部由我来填满吧啊啊啊啊…\${heart(1)}』\`,`,
    replace: `        if (rand_n(3) === 1) {
          await era.print(
            \`『哈啊…姐姐的蜜穴…全部由我来填满吧啊啊啊啊…\${heart(1)}』\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM21 二回目：助手玛奥 + 淫乱，RAND:3 三选一 + ABL:2 私处感觉分岔可控',
  },
  {
    desc: 'M4167 COM21 非助手玛奥淫乱 RAND:3 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (rand_n(3) === 0) {
        await era.printAndWait(
          \`「呜……呜啊……这种姿势……好像……狗在交配一样\${heart(1)} 但是……好棒……好舒服\${heart(1)}」\`,`,
    replace: `      if (rand_n(3) === 1) {
        await era.printAndWait(
          \`「呜……呜啊……这种姿势……好像……狗在交配一样\${heart(1)} 但是……好棒……好舒服\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM21 二回目：非助手玛奥 + 淫乱，推进到 6',
  },
  {
    desc: 'M4168 COM21 助手玛奥淫乱 ABL:2 私处感觉门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              \`「啊啊…哈啊…\${player_name}好厉害\${heart(1)} 我从来不知道…被自己的妹妹侵犯…是这么……舒服的事情啊啊\${heart(1)}」\`,`,
    replace: `          if (chara(target).system.私处感觉 >= 4) {
            await era.printAndWait(
              \`「啊啊…哈啊…\${player_name}好厉害\${heart(1)} 我从来不知道…被自己的妹妹侵犯…是这么……舒服的事情啊啊\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM21 二回目：助手玛奥 + 淫乱，RAND:3 三选一 + ABL:2 私处感觉分岔可控',
  },
  // ---- SELECTCOM 22（对面座位 CFLAG:323，#242） ----
  {
    desc: 'M4169 COM22 初めて 处女条件 === 1 改 === 0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    if (kojo.对面座位 === 0) {\n      // 初めて\n      const virgin = era.get(`talent:${target}:0`) === 1;',
    replace:
      '    if (kojo.对面座位 === 0) {\n      // 初めて\n      const virgin = era.get(`talent:${target}:0`) === 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM22 初めて：非处女 + 助手玛奥 + 淫乱',
  },
  {
    desc: 'M4170 COM22 初めて CFLAG:323 写错（1 改 0）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: 'kojo.对面座位 = 1;',
    replace: 'kojo.对面座位 = 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM22 初めて：处女支为空模板骨架，无输出但仍推进 CFLAG:323',
  },
  {
    desc: 'M4171 COM22 助手玛奥淫乱 CFLAG:323 写错（6 改 5）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          }\n        }\n        kojo.对面座位 = 6;',
    replace: '          }\n        }\n        kojo.对面座位 = 5;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM22 二回目：助手玛奥 + 淫乱，RAND:3 三选一 + ABL:2 私处感觉门槛可控',
  },
  {
    desc: 'M4172 COM22 助手玛奥爱慕 CFLAG:323 写错（5 改 4）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          }\n        }\n        kojo.对面座位 = 5;',
    replace: '          }\n        }\n        kojo.对面座位 = 4;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM22 二回目：助手玛奥 + 爱慕，推进到 5',
  },
  {
    desc: 'M4173 COM22 助手玛奥屈服刻印Lv3＋V感覚 CFLAG:323 写错（4 改 3）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '            `${target_name}被自己的妹妹持续侵犯着蜜穴，在背德感与快感的双重折磨中呻吟了起来……`,\n          );\n        }\n        kojo.对面座位 = 4;',
    replace:
      '            `${target_name}被自己的妹妹持续侵犯着蜜穴，在背德感与快感的双重折磨中呻吟了起来……`,\n          );\n        }\n        kojo.对面座位 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM22 二回目：助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4',
  },
  {
    desc: 'M4174 COM22 助手玛奥屈服刻印Lv3 CFLAG:323 写错（3 改 2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          `${target_name}被${player_name}抱在腿上，肆意玩弄着双乳，蜜穴也被持续侵犯着……`,\n        );\n        kojo.对面座位 = 3;',
    replace:
      '          `${target_name}被${player_name}抱在腿上，肆意玩弄着双乳，蜜穴也被持续侵犯着……`,\n        );\n        kojo.对面座位 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM22 二回目：助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4175 COM22 助手玛奥それ以外 CFLAG:323 写错（2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.对面座位 = 2;\n      }\n    } else {',
    replace: '        kojo.对面座位 = 1;\n      }\n    } else {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM22 二回目：助手玛奥 + それ以外，推进到 2',
  },
  {
    desc: 'M4176 COM22 非助手玛奥淫乱 CFLAG:323 写错（6 改 5）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          );\n        }\n        kojo.对面座位 = 6;',
    replace: '          );\n        }\n        kojo.对面座位 = 5;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM22 二回目：非助手玛奥 + 淫乱，两次独立 RAND:3 各自决定开场句与收尾句',
  },
  {
    desc: 'M4177 COM22 非助手玛奥爱慕 CFLAG:323 写错（5 改 4）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          );\n        }\n        kojo.对面座位 = 5;',
    replace: '          );\n        }\n        kojo.对面座位 = 4;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM22 二回目：非助手玛奥 + 爱慕，推进到 5',
  },
  {
    desc: 'M4178 COM22 非助手玛奥屈服刻印Lv3＋V感覚 CFLAG:323 写错（4 改 3）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '            `${target_name}被${player_name}抱在怀中、随着蜜穴被阴茎一次次顶入，快感也一波波传递向大脑……`,\n          );\n        }\n        kojo.对面座位 = 4;',
    replace:
      '            `${target_name}被${player_name}抱在怀中、随着蜜穴被阴茎一次次顶入，快感也一波波传递向大脑……`,\n          );\n        }\n        kojo.对面座位 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM22 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4',
  },
  {
    desc: 'M4179 COM22 非助手玛奥屈服刻印Lv3 CFLAG:323 写错（3 改 2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          `${target_name}被${player_name}强行抱在怀里蹂躏着蜜穴，只能边呻吟边拼命忍耐着`,\n        );\n        kojo.对面座位 = 3;',
    replace:
      '          `${target_name}被${player_name}强行抱在怀里蹂躏着蜜穴，只能边呻吟边拼命忍耐着`,\n        );\n        kojo.对面座位 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM22 二回目：非助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4180 COM22 それ以外 CFLAG:323 写错（2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          `${player_name}过于激烈的动作让${target_name}痛苦地悲鸣了起来……`,\n        );\n        kojo.对面座位 = 2;',
    replace:
      '          `${player_name}过于激烈的动作让${target_name}痛苦地悲鸣了起来……`,\n        );\n        kojo.对面座位 = 1;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM22 二回目：それ以外，推进到 2',
  },
  {
    desc: 'M4181 COM22 助手玛奥 屈服刻印Lv3＋V感覚层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        if (rand_n(2) === 0) {
          await era.printAndWait(
            \`「嗯啊……咿啊啊……为，为什么……会这么舒服的！」\`,`,
    replace: `      } else if (
        mark(2) === 2 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        if (rand_n(2) === 0) {
          await era.printAndWait(
            \`「嗯啊……咿啊啊……为，为什么……会这么舒服的！」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM22 二回目：助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4',
  },
  {
    desc: 'M4182 COM22 非助手玛奥 屈服刻印Lv3＋V感覚层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        await era.printAndWait(
          \`「好舒服……已经舒服得……没有办法思考了啊啊啊\${heart(1)}」\`,`,
    replace: `      } else if (
        mark(2) === 2 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.对面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        await era.printAndWait(
          \`「好舒服……已经舒服得……没有办法思考了啊啊啊\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM22 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，推进到 4',
  },
  {
    desc: 'M4183 COM22 助手玛奥 屈服刻印Lv3层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        mark(2) === 3 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          \`「求，求你了……稍微温柔一点吧……看在我是你的姐姐的份上……」\`,`,
    replace: `      } else if (
        mark(2) === 2 &&
        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          \`「求，求你了……稍微温柔一点吧……看在我是你的姐姐的份上……」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM22 二回目：助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4184 COM22 非助手玛奥 屈服刻印Lv3层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        mark(2) === 3 &&\n        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 屈服刻印Lv3\n        await era.printAndWait(`「饶，饶了我吧……魔王大人……已经不行了……」`);',
    replace:
      '      } else if (\n        mark(2) === 2 &&\n        (kojo.对面座位 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 屈服刻印Lv3\n        await era.printAndWait(`「饶，饶了我吧……魔王大人……已经不行了……」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM22 二回目：非助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4185 COM22 助手玛奥淫乱 talent:76 检查 === 1 改 === 0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱`,
    replace: `      if (
        era.get(\`talent:\${target}:76\`) === 0 &&
        (kojo.对面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM22 二回目：助手玛奥 + 淫乱，RAND:3 三选一 + ABL:2 私处感觉门槛可控',
  },
  {
    desc: 'M4186 COM22 非助手玛奥爱慕 talent:85 检查 === 1 改 === 0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        era.get(\`talent:\${target}:85\`) === 1 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          await era.printAndWait(
            \`「呜……呜啊啊……魔王大人，魔王大人，尽情的侵犯你的性奴\${target_name}吧\${heart(1)}」\`,`,
    replace: `      } else if (
        era.get(\`talent:\${target}:85\`) === 0 &&
        (kojo.对面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          await era.printAndWait(
            \`「呜……呜啊啊……魔王大人，魔王大人，尽情的侵犯你的性奴\${target_name}吧\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM22 二回目：非助手玛奥 + 爱慕，推进到 5',
  },
  {
    desc: 'M4187 COM22 助手玛奥淫乱 RAND:3 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        // 淫乱
        if (rand_n(3) === 0) {
          await era.printAndWait(
            \`「哈……哈啊……！这样……这样好舒服……\${heart(1)} 继续……舔姐姐的乳头吧……\${player_name}\${heart(1)}」\`,`,
    replace: `        // 淫乱
        if (rand_n(3) === 1) {
          await era.printAndWait(
            \`「哈……哈啊……！这样……这样好舒服……\${heart(1)} 继续……舔姐姐的乳头吧……\${player_name}\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM22 二回目：助手玛奥 + 淫乱，RAND:3 三选一 + ABL:2 私处感觉门槛可控',
  },
  {
    desc: 'M4188 COM22 非助手玛奥淫乱 开场 RAND:3 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        if (rand_n(3) === 0) {
          await era.printAndWait(
            \`「呜……呜啊啊……尽情地，侵犯人家的淫穴吧魔王大人……侵犯到人家彻底坏掉吧啊啊啊\${heart(1)} 」\`,`,
    replace: `        if (rand_n(3) === 1) {
          await era.printAndWait(
            \`「呜……呜啊啊……尽情地，侵犯人家的淫穴吧魔王大人……侵犯到人家彻底坏掉吧啊啊啊\${heart(1)} 」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM22 二回目：非助手玛奥 + 淫乱，两次独立 RAND:3 各自决定开场句与收尾句',
  },
  {
    desc: 'M4189 COM22 非助手玛奥淫乱 收尾 RAND:3 阈值 === 0 改 === 1（第二次独立抽样，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        if (rand_n(3) === 0) {\n          await era.printAndWait(\n            `${target_name}被${player_name}抱在腿上，淫浪的娇喘声伴随着每一次交合响彻整个房间……`,\n          );',
    replace:
      '        if (rand_n(3) === 1) {\n          await era.printAndWait(\n            `${target_name}被${player_name}抱在腿上，淫浪的娇喘声伴随着每一次交合响彻整个房间……`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM22 二回目：非助手玛奥 + 淫乱，两次独立 RAND:3 各自决定开场句与收尾句',
  },
  {
    desc: 'M4190 COM22 助手玛奥淫乱 ABL:2 私处感觉门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `          if (chara(target).system.私处感觉 >= 3) {
            await era.printAndWait(
              \`「是……是的……姐姐就是一只淫乱的……母狗啊啊啊…\${heart(1)}」\`,`,
    replace: `          if (chara(target).system.私处感觉 >= 4) {
            await era.printAndWait(
              \`「是……是的……姐姐就是一只淫乱的……母狗啊啊啊…\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM22 二回目：助手玛奥 + 淫乱，RAND:3 三选一 + ABL:2 私处感觉门槛可控',
  },
  // ---- SELECTCOM 23（背面座位 CFLAG:324，#242） ----
  {
    desc: 'M4191 COM23 初めて 处女条件 === 1 改 === 0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    if (kojo.背面座位 === 0) {\n      // 初めて\n      const virgin = era.get(`talent:${target}:0`) === 1;',
    replace:
      '    if (kojo.背面座位 === 0) {\n      // 初めて\n      const virgin = era.get(`talent:${target}:0`) === 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM23 初めて：非处女 + 助手玛奥 + 淫乱',
  },
  {
    desc: 'M4192 COM23 初めて CFLAG:324 写错（1 改 0）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: 'kojo.背面座位 = 1;',
    replace: 'kojo.背面座位 = 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM23 初めて：处女支为空模板骨架，无输出但仍推进 CFLAG:324',
  },
  {
    desc: 'M4193 COM23 助手玛奥淫乱 CFLAG:324 写错（6 改 5）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '              `${player_name}伸手环住${target_name}丰满的双乳，边搓揉着边挺着腰继续侵犯着姐姐的蜜穴……`,\n            );\n          }\n        }\n        kojo.背面座位 = 6;',
    replace:
      '              `${player_name}伸手环住${target_name}丰满的双乳，边搓揉着边挺着腰继续侵犯着姐姐的蜜穴……`,\n            );\n          }\n        }\n        kojo.背面座位 = 5;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM23 二回目：助手玛奥 + 淫乱，RAND:3==0 命中开场句，ABL:2 未达门槛走 else',
  },
  {
    desc: 'M4194 COM23 助手玛奥爱慕 CFLAG:324 写错（5 改 4）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '              `${target_name}在${player_name}命令下展开双腿，展露着自己正被侵犯着的蜜穴……`,\n            );\n          }\n        }\n        kojo.背面座位 = 5;',
    replace:
      '              `${target_name}在${player_name}命令下展开双腿，展露着自己正被侵犯着的蜜穴……`,\n            );\n          }\n        }\n        kojo.背面座位 = 4;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM23 二回目：助手玛奥 + 爱慕，推进到 5',
  },
  {
    desc: 'M4195 COM23 助手玛奥屈服刻印Lv3＋V感覚 CFLAG:324 写错（4 改 3）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        );\n        kojo.背面座位 = 4;',
    replace: '        );\n        kojo.背面座位 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM23 二回目：助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，RAND:2 二选一可控',
  },
  {
    desc: 'M4196 COM23 助手玛奥屈服刻印Lv3 CFLAG:324 写错（3 改 2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.背面座位 = 3;\n      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {\n        // それ以外\n        await era.printAndWait(\n          `「放，放开我啊，${player_name}！我是，我是你的姐姐啊……呜呜呜……不，不要再折磨我了……」`,',
    replace:
      '        kojo.背面座位 = 2;\n      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {\n        // それ以外\n        await era.printAndWait(\n          `「放，放开我啊，${player_name}！我是，我是你的姐姐啊……呜呜呜……不，不要再折磨我了……」`,',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM23 二回目：助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4197 COM23 助手玛奥それ以外 CFLAG:324 写错（2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.背面座位 = 2;\n      }\n    } else {',
    replace: '        kojo.背面座位 = 1;\n      }\n    } else {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM23 二回目：助手玛奥 + それ以外，推进到 2',
  },
  {
    desc: 'M4198 COM23 非助手玛奥淫乱 CFLAG:324 写错（6 改 5）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '              `交合的同时，${target_name}的胸部也被${player_name}揉捏着……`,\n            );\n          }\n        }\n        kojo.背面座位 = 6;',
    replace:
      '              `交合的同时，${target_name}的胸部也被${player_name}揉捏着……`,\n            );\n          }\n        }\n        kojo.背面座位 = 5;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM23 二回目：非助手玛奥 + 淫乱，RAND:3==0 开场句 + ABL:2 达门槛',
  },
  {
    desc: 'M4199 COM23 非助手玛奥爱慕 CFLAG:324 写错（5 改 4）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '              `交合的同时，${target_name}的胸部也被${player_name}揉捏着……`,\n            );\n          }\n        }\n        kojo.背面座位 = 5;',
    replace:
      '              `交合的同时，${target_name}的胸部也被${player_name}揉捏着……`,\n            );\n          }\n        }\n        kojo.背面座位 = 4;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM23 二回目：非助手玛奥 + 爱慕，推进到 5',
  },
  {
    desc: 'M4200 COM23 非助手玛奥屈服刻印Lv3＋V感覚 CFLAG:324 写错（4 改 3）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        }\n        kojo.背面座位 = 4;',
    replace: '        }\n        kojo.背面座位 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM23 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，双独立 RAND:2 结构可控',
  },
  {
    desc: 'M4201 COM23 非助手玛奥屈服刻印Lv3 CFLAG:324 写错（3 改 2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.背面座位 = 3;\n      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {\n        // それ以外\n        await era.printAndWait(`「住，住手！放开我啊啊！！」`);',
    replace:
      '        kojo.背面座位 = 2;\n      } else if (kojo.背面座位 <= 1 || game.kojo.口上开关 === 2) {\n        // それ以外\n        await era.printAndWait(`「住，住手！放开我啊啊！！」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM23 二回目：非助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4202 COM23 それ以外 CFLAG:324 写错（2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.背面座位 = 2;\n      }\n    }\n    return 0;',
    replace: '        kojo.背面座位 = 1;\n      }\n    }\n    return 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM23 二回目：それ以外，推进到 2',
  },
  {
    desc: 'M4203 COM23 助手玛奥 屈服刻印Lv3＋V感覚层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        mark(2) === 3 &&\n        chara(target).system.私处感觉 >= 3 &&\n        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 屈服刻印Lv3＋V感覚Lv3以上\n        if (rand_n(2) === 0) {\n          await era.print(`「好舒服……已经没有办法思考了啊啊啊${heart(1)}」`);',
    replace:
      '      } else if (\n        mark(2) === 2 &&\n        chara(target).system.私处感觉 >= 3 &&\n        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        // 屈服刻印Lv3＋V感覚Lv3以上\n        if (rand_n(2) === 0) {\n          await era.print(`「好舒服……已经没有办法思考了啊啊啊${heart(1)}」`);',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM23 二回目：助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，RAND:2 二选一可控',
  },
  {
    desc: 'M4204 COM23 非助手玛奥 屈服刻印Lv3＋V感覚层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        mark(2) === 3 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        if (rand_n(2) === 0) {
          await era.print(
            \`「不，不行了……小穴……舒服得……要上天了啊啊啊\${heart(1)}」\`,`,
    replace: `      } else if (
        mark(2) === 2 &&
        chara(target).system.私处感觉 >= 3 &&
        (kojo.背面座位 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3＋V感覚Lv3以上
        if (rand_n(2) === 0) {
          await era.print(
            \`「不，不行了……小穴……舒服得……要上天了啊啊啊\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM23 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，双独立 RAND:2 结构可控',
  },
  {
    desc: 'M4205 COM23 助手玛奥 屈服刻印Lv3层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        mark(2) === 3 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          \`「呜……呜啊……不，不能再往里顶了……会，会坏掉的！」\`,`,
    replace: `      } else if (
        mark(2) === 2 &&
        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)
      ) {
        // 屈服刻印Lv3
        await era.printAndWait(
          \`「呜……呜啊……不，不能再往里顶了……会，会坏掉的！」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM23 二回目：助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4206 COM23 非助手玛奥 屈服刻印Lv3层检查 mark(2)===3 改 ===2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (\n        mark(2) === 3 &&\n        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 屈服刻印Lv3\n        await era.printAndWait(`「饶，饶了我吧……真的要……坏掉了！」`);',
    replace:
      '      } else if (\n        mark(2) === 2 &&\n        (kojo.背面座位 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // 屈服刻印Lv3\n        await era.printAndWait(`「饶，饶了我吧……真的要……坏掉了！」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM23 二回目：非助手玛奥 + 屈服刻印Lv3，推进到 3',
  },
  {
    desc: 'M4207 COM23 助手玛奥淫乱 talent:76 检查 === 1 改 === 0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (rand_n(3) === 0) {
          await era.print(
            \`『双腿分开些啊姐姐，好好让魔王大人看看你的淫乱模样♪』\`,`,
    replace: `      if (
        era.get(\`talent:\${target}:76\`) === 0 &&
        (kojo.背面座位 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        if (rand_n(3) === 0) {
          await era.print(
            \`『双腿分开些啊姐姐，好好让魔王大人看看你的淫乱模样♪』\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM23 二回目：助手玛奥 + 淫乱，RAND:3==0 命中开场句，ABL:2 未达门槛走 else',
  },
  {
    desc: 'M4208 COM23 非助手玛奥爱慕 talent:85 检查 === 1 改 === 0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (
        era.get(\`talent:\${target}:85\`) === 1 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          await era.printAndWait(
            \`「呜啊……魔王大人……不，不可以……同时攻击胸部和小穴……啊啊啊\${heart(1)}」\`,`,
    replace: `      } else if (
        era.get(\`talent:\${target}:85\`) === 0 &&
        (kojo.背面座位 <= 4 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        if (rand_n(3) === 0) {
          await era.printAndWait(
            \`「呜啊……魔王大人……不，不可以……同时攻击胸部和小穴……啊啊啊\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM23 二回目：非助手玛奥 + 爱慕，推进到 5',
  },
  {
    desc: 'M4209 COM23 助手玛奥淫乱 RAND:3 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        // 淫乱
        if (rand_n(3) === 0) {
          await era.print(
            \`『双腿分开些啊姐姐，好好让魔王大人看看你的淫乱模样♪』\`,`,
    replace: `        // 淫乱
        if (rand_n(3) === 1) {
          await era.print(
            \`『双腿分开些啊姐姐，好好让魔王大人看看你的淫乱模样♪』\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM23 二回目：助手玛奥 + 淫乱，RAND:3==0 命中开场句，ABL:2 未达门槛走 else',
  },
  {
    desc: 'M4210 COM23 助手玛奥淫乱 ABL:2 私处感觉门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          );\n          if (chara(target).system.私处感觉 >= 3) {\n            await era.printAndWait(\n              `「不，不行了……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,',
    replace:
      '          );\n          if (chara(target).system.私处感觉 >= 4) {\n            await era.printAndWait(\n              `「不，不行了……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM23 二回目：助手玛奥 + 淫乱，RAND:3==0 + ABL:2 达门槛时选中体感句',
  },
  {
    desc: 'M4211 COM23 助手玛奥爱慕 RAND:3 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        // 爱慕
        if (rand_n(3) === 0) {
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              \`「嗯啊啊……啊啊……小穴……舒服得……要上天了啊啊啊\${heart(1)}」\`,`,
    replace: `        // 爱慕
        if (rand_n(3) === 1) {
          if (chara(target).system.私处感觉 >= 3) {
            await era.print(
              \`「嗯啊啊……啊啊……小穴……舒服得……要上天了啊啊啊\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM23 二回目：助手玛奥 + 爱慕，推进到 5',
  },
  {
    desc: 'M4212 COM23 助手玛奥屈服刻印Lv3＋V感覚 RAND:2 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        // 屈服刻印Lv3＋V感覚Lv3以上\n        if (rand_n(2) === 0) {\n          await era.print(`「好舒服……已经没有办法思考了啊啊啊${heart(1)}」`);',
    replace:
      '        // 屈服刻印Lv3＋V感覚Lv3以上\n        if (rand_n(2) === 1) {\n          await era.print(`「好舒服……已经没有办法思考了啊啊啊${heart(1)}」`);',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM23 二回目：助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，RAND:2 二选一可控',
  },
  {
    desc: 'M4213 COM23 非助手玛奥淫乱 RAND:3 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        if (rand_n(3) === 0) {
          await era.printAndWait(
            \`「呜……呜啊…\${heart(1)} 顶，顶到最里面了啊啊…\${heart(1)}」\`,`,
    replace: `        if (rand_n(3) === 1) {
          await era.printAndWait(
            \`「呜……呜啊…\${heart(1)} 顶，顶到最里面了啊啊…\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM23 二回目：非助手玛奥 + 淫乱，RAND:3==0 开场句 + ABL:2 达门槛',
  },
  {
    desc: 'M4214 COM23 非助手玛奥淫乱 ABL:2 私处感觉门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          );\n          if (chara(target).system.私处感觉 >= 3) {\n            await era.print(`「呜呜……要，要去了，要去了啊啊啊${heart(1)}」`);\n            await era.printAndWait(',
    replace:
      '          );\n          if (chara(target).system.私处感觉 >= 4) {\n            await era.print(`「呜呜……要，要去了，要去了啊啊啊${heart(1)}」`);\n            await era.printAndWait(',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM23 二回目：非助手玛奥 + 淫乱，RAND:3==0 开场句 + ABL:2 达门槛',
  },
  {
    desc: 'M4215 COM23 非助手玛奥爱慕 RAND:3 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        // 爱慕
        if (rand_n(3) === 0) {
          await era.printAndWait(
            \`「呜啊……魔王大人……不，不可以……同时攻击胸部和小穴……啊啊啊\${heart(1)}」\`,`,
    replace: `        // 爱慕
        if (rand_n(3) === 1) {
          await era.printAndWait(
            \`「呜啊……魔王大人……不，不可以……同时攻击胸部和小穴……啊啊啊\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM23 二回目：非助手玛奥 + 爱慕，推进到 5',
  },
  {
    desc: 'M4216 COM23 非助手玛奥屈服刻印Lv3＋V感覚 第一次独立 RAND:2 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        // 屈服刻印Lv3＋V感覚Lv3以上\n        if (rand_n(2) === 0) {\n          await era.print(\n            `「不，不行了……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,\n          );\n        } else {\n          await era.print(`「侵犯得……太激烈了……但，但是……真的好舒服啊啊！」`);\n        }\n        if (rand_n(2) === 0) {\n          await era.print(`「呜？！不，不可以同时……攻击胸部啊啊！」`);',
    replace:
      '        // 屈服刻印Lv3＋V感覚Lv3以上\n        if (rand_n(2) === 1) {\n          await era.print(\n            `「不，不行了……小穴……舒服得……要上天了啊啊啊${heart(1)}」`,\n          );\n        } else {\n          await era.print(`「侵犯得……太激烈了……但，但是……真的好舒服啊啊！」`);\n        }\n        if (rand_n(2) === 0) {\n          await era.print(`「呜？！不，不可以同时……攻击胸部啊啊！」`);',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM23 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，双独立 RAND:2 结构可控',
  },
  {
    desc: 'M4217 COM23 非助手玛奥屈服刻印Lv3＋V感覚 第二次独立 RAND:2 阈值 === 0 改 === 1（第二次独立抽样，#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        }\n        if (rand_n(2) === 0) {\n          await era.print(`「呜？！不，不可以同时……攻击胸部啊啊！」`);',
    replace:
      '        }\n        if (rand_n(2) === 1) {\n          await era.print(`「呜？！不，不可以同时……攻击胸部啊啊！」`);',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM23 二回目：非助手玛奥 + 屈服刻印Lv3＋V感覚Lv3以上，双独立 RAND:2 第二次抽样独立于第一次',
  },
  // ---- SELECTCOM 26（正常位肛交 CFLAG:327，#242） ----
  {
    desc: 'M4218 COM26 初めて CFLAG:327 写错（1 改 0）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: 'kojo.正常位肛交 = 1;',
    replace: 'kojo.正常位肛交 = 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 初めて：助手玛奥 + 淫乱',
  },
  {
    desc: 'M4219 COM26 助手玛奥淫乱＋A感覚Lv3以上 CFLAG:327 写错（7 改 6）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '            `「尽情……尽情地把${target_name}的肛门……侵犯到坏掉吧啊啊啊${heart(1)}」`,\n          );\n        }\n        kojo.正常位肛交 = 7;',
    replace:
      '            `「尽情……尽情地把${target_name}的肛门……侵犯到坏掉吧啊啊啊${heart(1)}」`,\n          );\n        }\n        kojo.正常位肛交 = 6;',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM26 二回目：助手玛奥 + 淫乱＋A感覚Lv3以上，RAND:3 三选一可控',
  },
  {
    desc: 'M4220 COM26 助手玛奥淫乱 CFLAG:327 写错（6 改 5）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          `『最喜欢姐姐了${heart(1)} 给我用肛门高潮吧${heart(1)}』`,\n        );\n        kojo.正常位肛交 = 6;',
    replace:
      '          `『最喜欢姐姐了${heart(1)} 给我用肛门高潮吧${heart(1)}』`,\n        );\n        kojo.正常位肛交 = 5;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：助手玛奥 + 淫乱，推进到 6',
  },
  {
    desc: 'M4221 COM26 助手玛奥爱慕＋A感覚Lv3以上 CFLAG:327 写错（5 改 4）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '            `「不……不要……这么激烈${heart(1)} ${player_name}把姐姐的肛门……弄得要去了啊啊啊${heart(1)}」`,\n          );\n        }\n        kojo.正常位肛交 = 5;',
    replace:
      '            `「不……不要……这么激烈${heart(1)} ${player_name}把姐姐的肛门……弄得要去了啊啊啊${heart(1)}」`,\n          );\n        }\n        kojo.正常位肛交 = 4;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：助手玛奥 + 爱慕＋A感覚Lv3以上，推进到 5',
  },
  {
    desc: 'M4222 COM26 助手玛奥爱慕 CFLAG:327 写错（4 改 3）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          `虽然这么说着，但是${player_name}丝毫没有减慢动作，反而更激烈地侵犯着${target_name}的肛门。`,\n        );\n        kojo.正常位肛交 = 4;',
    replace:
      '          `虽然这么说着，但是${player_name}丝毫没有减慢动作，反而更激烈地侵犯着${target_name}的肛门。`,\n        );\n        kojo.正常位肛交 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：助手玛奥 + 爱慕，推进到 4',
  },
  {
    desc: 'M4223 COM26 助手玛奥 A感覚Lv3以上 CFLAG:327 写错（3 改 2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        }\n        kojo.正常位肛交 = 3;',
    replace: '        }\n        kojo.正常位肛交 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：助手玛奥 + A感覚Lv3以上，推进到 3',
  },
  {
    desc: 'M4224 COM26 助手玛奥それ以外 CFLAG:327 写错（2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.正常位肛交 = 2;\n      }\n    } else {',
    replace: '        kojo.正常位肛交 = 1;\n      }\n    } else {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：助手玛奥 + それ以外，推进到 2',
  },
  {
    desc: 'M4225 COM26 非助手玛奥淫乱＋A感覚Lv3以上 CFLAG:327 写错（7 改 6）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '            `${target_name}已经完全沦为沉浸在肛交快感中的性奴了………`,\n          );\n        }\n        kojo.正常位肛交 = 7;',
    replace:
      '            `${target_name}已经完全沦为沉浸在肛交快感中的性奴了………`,\n          );\n        }\n        kojo.正常位肛交 = 6;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：非助手玛奥 + 淫乱＋A感覚Lv3以上，推进到 7',
  },
  {
    desc: 'M4226 COM26 非助手玛奥淫乱 CFLAG:327 写错（6 改 5）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          `${target_name}感受着肛门被慢慢撑开的奇异快感，呻吟了起来`,\n        );\n        kojo.正常位肛交 = 6;',
    replace:
      '          `${target_name}感受着肛门被慢慢撑开的奇异快感，呻吟了起来`,\n        );\n        kojo.正常位肛交 = 5;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：非助手玛奥 + 淫乱，推进到 6',
  },
  {
    desc: 'M4227 COM26 非助手玛奥爱慕＋A感覚Lv3以上 CFLAG:327 写错（5 改 4）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '            `「魔，魔王大人……请尽情在……肛门里射精吧${heart(1)}」`,\n          );\n        }\n        kojo.正常位肛交 = 5;',
    replace:
      '            `「魔，魔王大人……请尽情在……肛门里射精吧${heart(1)}」`,\n          );\n        }\n        kojo.正常位肛交 = 4;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：非助手玛奥 + 爱慕＋A感覚Lv3以上，推进到 5',
  },
  {
    desc: 'M4228 COM26 非助手玛奥爱慕 CFLAG:327 写错（4 改 3）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          `${target_name}被慢慢撑开的肛门却传来了奇特的满足感，让她忍不住呻吟了起来……`,\n        );\n        kojo.正常位肛交 = 4;',
    replace:
      '          `${target_name}被慢慢撑开的肛门却传来了奇特的满足感，让她忍不住呻吟了起来……`,\n        );\n        kojo.正常位肛交 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：非助手玛奥 + 爱慕，推进到 4',
  },
  {
    desc: 'M4229 COM26 非助手玛奥 A感覚Lv3以上 CFLAG:327 写错（3 改 2）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        await era.printAndWait(`「为，为什么……屁股也会……这么舒服的啊啊！」`);\n        kojo.正常位肛交 = 3;',
    replace:
      '        await era.printAndWait(`「为，为什么……屁股也会……这么舒服的啊啊！」`);\n        kojo.正常位肛交 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：非助手玛奥 + A感覚Lv3以上，推进到 3',
  },
  {
    desc: 'M4230 COM26 それ以外 CFLAG:327 写错（2 改 1）（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          `意识到自己没有任何逃脱的机会，只能闭上眼睛拼命忍耐着`,\n        );\n        kojo.正常位肛交 = 2;',
    replace:
      '          `意识到自己没有任何逃脱的机会，只能闭上眼睛拼命忍耐着`,\n        );\n        kojo.正常位肛交 = 1;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：それ以外，推进到 2',
  },
  {
    desc: 'M4231 COM26 助手玛奥淫乱＋A感覚Lv3以上 ABL:3 检查 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        chara(target).system.肛门感觉 >= 3 &&\n        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱＋A感覚Lv3以上\n        if (rand_n(3) === 0) {\n          await era.print(\n            `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,\n          );',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        chara(target).system.肛门感觉 >= 4 &&\n        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)\n      ) {\n        // 淫乱＋A感覚Lv3以上\n        if (rand_n(3) === 0) {\n          await era.print(\n            `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM26 二回目：助手玛奥 + 淫乱＋A感覚Lv3以上，RAND:3 三选一可控',
  },
  {
    desc: 'M4232 COM26 助手玛奥爱慕＋A感覚Lv3以上 ABL:3 检查 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        era.get(`talent:${target}:85`) === 1 &&\n        chara(target).system.肛门感觉 >= 3 &&\n        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕＋A感覚Lv3以上\n        if (rand_n(3) === 0) {\n          await era.print(\n            `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,\n          );',
    replace:
      '        era.get(`talent:${target}:85`) === 1 &&\n        chara(target).system.肛门感觉 >= 4 &&\n        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕＋A感覚Lv3以上\n        if (rand_n(3) === 0) {\n          await era.print(\n            `「不，不行了……肛门……舒服得……要上天了啊啊啊${heart(1)}」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：助手玛奥 + 爱慕＋A感覚Lv3以上，推进到 5',
  },
  {
    desc: 'M4233 COM26 非助手玛奥淫乱＋A感覚Lv3以上 ABL:3 检查 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            \`「哈啊……嗯啊啊\${heart(1)} 淫荡的肛门……得到魔王大人的……疼爱了\${heart(1)}」\`,`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        chara(target).system.肛门感觉 >= 4 &&
        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {
        if (rand_n(3) === 0) {
          await era.printAndWait(
            \`「哈啊……嗯啊啊\${heart(1)} 淫荡的肛门……得到魔王大人的……疼爱了\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：非助手玛奥 + 淫乱＋A感覚Lv3以上，推进到 7',
  },
  {
    desc: 'M4234 COM26 非助手玛奥爱慕＋A感覚Lv3以上 ABL:3 检查 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        era.get(`talent:${target}:85`) === 1 &&\n        chara(target).system.肛门感觉 >= 3 &&\n        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕＋A感覚Lv3以上\n        if (rand_n(3) === 0) {\n          await era.print(`「肛交……太棒了……真的是世界上最棒的事情了啊啊啊」`);',
    replace:
      '        era.get(`talent:${target}:85`) === 1 &&\n        chara(target).system.肛门感觉 >= 4 &&\n        (kojo.正常位肛交 <= 4 || game.kojo.口上开关 === 2)\n      ) {\n        // 爱慕＋A感覚Lv3以上\n        if (rand_n(3) === 0) {\n          await era.print(`「肛交……太棒了……真的是世界上最棒的事情了啊啊啊」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：非助手玛奥 + 爱慕＋A感覚Lv3以上，推进到 5',
  },
  {
    desc: 'M4235 COM26 助手玛奥 A感覚Lv3以上检查 肛门感觉>=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        chara(target).system.肛门感觉 >= 3 &&\n        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // A感覚Lv3以上\n        await era.print(\n          `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,\n        );',
    replace:
      '        chara(target).system.肛门感觉 >= 4 &&\n        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // A感覚Lv3以上\n        await era.print(\n          `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：助手玛奥 + A感覚Lv3以上，推进到 3',
  },
  {
    desc: 'M4236 COM26 非助手玛奥 A感覚Lv3以上检查 肛门感觉>=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        chara(target).system.肛门感觉 >= 3 &&\n        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // A感覚Lv3以上\n        await era.printAndWait(`「呜……呜啊啊……插……插进屁股里了……！」`);',
    replace:
      '        chara(target).system.肛门感觉 >= 4 &&\n        (kojo.正常位肛交 <= 2 || game.kojo.口上开关 === 2)\n      ) {\n        // A感覚Lv3以上\n        await era.printAndWait(`「呜……呜啊啊……插……插进屁股里了……！」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：非助手玛奥 + A感覚Lv3以上，推进到 3',
  },
  {
    desc: 'M4237 COM26 助手玛奥淫乱（非A感覚）talent:76 检查 === 1 改 === 0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.print(
          \`『这次一定要让姐姐的肛门高潮\${heart(1)} 姐姐的肛门实在是太棒了\${heart(1)} ！』\`,`,
    replace: `        era.get(\`talent:\${target}:76\`) === 0 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.print(
          \`『这次一定要让姐姐的肛门高潮\${heart(1)} 姐姐的肛门实在是太棒了\${heart(1)} ！』\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：助手玛奥 + 淫乱，推进到 6',
  },
  {
    desc: 'M4238 COM26 助手玛奥爱慕（非A感覚）talent:85 检查 === 1 改 === 0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        era.get(\`talent:\${target}:85\`) === 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.print(
          \`『姐姐感觉到舒服了吗\${heart(1)} 我可是很舒服呢\${heart(1)} 嘿嘿嘿！』\`,`,
    replace: `        era.get(\`talent:\${target}:85\`) === 0 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.print(
          \`『姐姐感觉到舒服了吗\${heart(1)} 我可是很舒服呢\${heart(1)} 嘿嘿嘿！』\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：助手玛奥 + 爱慕，推进到 4',
  },
  {
    desc: 'M4239 COM26 非助手玛奥淫乱（非A感覚）talent:76 检查 === 1 改 === 0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          \`「呜，呜啊\${heart(1)} 魔……魔王大人的阴茎……插进屁股里了\${heart(1)}」\`,`,
    replace: `        era.get(\`talent:\${target}:76\`) === 0 &&
        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        // 淫乱
        await era.printAndWait(
          \`「呜，呜啊\${heart(1)} 魔……魔王大人的阴茎……插进屁股里了\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：非助手玛奥 + 淫乱，推进到 6',
  },
  {
    desc: 'M4240 COM26 非助手玛奥爱慕（非A感覚）talent:85 检查 === 1 改 === 0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        era.get(\`talent:\${target}:85\`) === 1 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          \`「呜……还……还是有点点痛……不过，不要紧的……请魔王大人……尽情的……！」\`,`,
    replace: `        era.get(\`talent:\${target}:85\`) === 0 &&
        (kojo.正常位肛交 <= 3 || game.kojo.口上开关 === 2)
      ) {
        // 爱慕
        await era.printAndWait(
          \`「呜……还……还是有点点痛……不过，不要紧的……请魔王大人……尽情的……！」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：非助手玛奥 + 爱慕，推进到 4',
  },
  {
    desc: 'M4241 COM26 初めて 非助手玛奥淫乱 肛门感觉检查 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          if (chara(target).system.肛门感觉 >= 3) {\n            await era.printAndWait(\n              `经过充分调教和开发的肛门，好像主动吸住了${player_name}的阴茎一般。`,\n            );',
    replace:
      '          if (chara(target).system.肛门感觉 >= 4) {\n            await era.printAndWait(\n              `经过充分调教和开发的肛门，好像主动吸住了${player_name}的阴茎一般。`,\n            );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 初めて：非助手玛奥 + 淫乱，ABL:3 达门槛走 if',
  },
  {
    desc: 'M4242 COM26 初めて 非助手玛奥それ以外 肛门感觉检查 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `          if (chara(target).system.肛门感觉 >= 3) {
            await era.printAndWait(
              \`「不，不行啊啊……那种地方……不，不是用来……呜啊啊！」\`,`,
    replace: `          if (chara(target).system.肛门感觉 >= 4) {
            await era.printAndWait(
              \`「不，不行啊啊……那种地方……不，不是用来……呜啊啊！」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 初めて：非助手玛奥 + それ以外，ABL:3 二态分岔可控',
  },
  {
    desc: 'M4243 COM26 助手玛奥淫乱＋A感覚Lv3以上 RAND:3 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        // 淫乱＋A感覚Lv3以上\n        if (rand_n(3) === 0) {\n          await era.print(\n            `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,\n          );',
    replace:
      '        // 淫乱＋A感覚Lv3以上\n        if (rand_n(3) === 1) {\n          await era.print(\n            `「好舒服……已经舒服得……没有办法思考了啊啊啊${heart(1)}」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention:
      'COM26 二回目：助手玛奥 + 淫乱＋A感覚Lv3以上，RAND:3 三选一可控',
  },
  {
    desc: 'M4244 COM26 それ以外 RAND:3 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        if (rand_n(3) === 0) {\n          await era.printAndWait(`「不可以，不可以啊啊啊！！！」`);',
    replace:
      '        if (rand_n(3) === 1) {\n          await era.printAndWait(`「不可以，不可以啊啊啊！！！」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：それ以外，推进到 2',
  },
  {
    desc: 'M4245 COM26 助手玛奥 A感覚Lv3以上 RAND:3 阈值 === 0 改 === 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        if (rand_n(3) === 0) {\n          await era.printAndWait(`「哈啊……啊啊……太，太激烈了啊啊！」`);',
    replace:
      '        if (rand_n(3) === 1) {\n          await era.printAndWait(`「哈啊……啊啊……太，太激烈了啊啊！」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM26 二回目：助手玛奥 + A感覚Lv3以上，推进到 3',
  },
  {
    desc: 'M4246 COM27 背后位肛交计数推进 1 改 2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      }\n      kojo.背后位肛交 = 1;',
    replace: '      }\n      kojo.背后位肛交 = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 初次推进背后位肛交',
  },
  {
    desc: 'M4247 COM27 背后位肛交计数推进 7 改 6（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '              `「是……是啊……姐姐是${player_name}和魔王大人的母狗${heart(1)} 母狗又怎么会感到羞耻呢…${heart(1)}　不，不行了……屁股太舒服了……舒服得……要去了啊啊${heart(1)}」`,\n            );\n          }\n          kojo.背后位肛交 = 7;',
    replace:
      '              `「是……是啊……姐姐是${player_name}和魔王大人的母狗${heart(1)} 母狗又怎么会感到羞耻呢…${heart(1)}　不，不行了……屁股太舒服了……舒服得……要去了啊啊${heart(1)}」`,\n            );\n          }\n          kojo.背后位肛交 = 6;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：助手玛奥六档推进',
  },
  {
    desc: 'M4248 COM27 背后位肛交计数推进 6 改 5（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '            `${target_name}被妹妹从身后侵犯着肛门，发出了享受的娇喘………`,\n          );\n          kojo.背后位肛交 = 6;',
    replace:
      '            `${target_name}被妹妹从身后侵犯着肛门，发出了享受的娇喘………`,\n          );\n          kojo.背后位肛交 = 5;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：助手玛奥六档推进',
  },
  {
    desc: 'M4249 COM27 背后位肛交计数推进 5 改 4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '              `${player_name}享受着和姐姐的乱伦肛交，前后动着腰，更加激烈地抽插起来……`,\n            );\n          }\n          kojo.背后位肛交 = 5;',
    replace:
      '              `${player_name}享受着和姐姐的乱伦肛交，前后动着腰，更加激烈地抽插起来……`,\n            );\n          }\n          kojo.背后位肛交 = 4;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：助手玛奥六档推进',
  },
  {
    desc: 'M4250 COM27 背后位肛交计数推进 4 改 3（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          }\n          kojo.背后位肛交 = 4;',
    replace: '          }\n          kojo.背后位肛交 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：助手玛奥六档推进',
  },
  {
    desc: 'M4251 COM27 背后位肛交计数推进 3 改 2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.背后位肛交 = 3;\n        } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.print(`『啊嘿嘿，性奴姐姐，屁股感觉舒服吗？』`);',
    replace:
      '          kojo.背后位肛交 = 2;\n        } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.print(`『啊嘿嘿，性奴姐姐，屁股感觉舒服吗？』`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：助手玛奥六档推进',
  },
  {
    desc: 'M4252 COM27 背后位肛交计数推进 2 改 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.背后位肛交 = 2;\n        }\n      } else {',
    replace: '          kojo.背后位肛交 = 1;\n        }\n      } else {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：助手玛奥六档推进',
  },
  {
    desc: 'M4253 COM27 背后位肛交计数推进 7 改 6（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '              `「啊啊……呜啊啊${heart(1)} 肛交……真的是……太舒服了……舒服的要上天了啊啊啊${heart(1)}」`,\n            );\n          }\n          kojo.背后位肛交 = 7;',
    replace:
      '              `「啊啊……呜啊啊${heart(1)} 肛交……真的是……太舒服了……舒服的要上天了啊啊啊${heart(1)}」`,\n            );\n          }\n          kojo.背后位肛交 = 6;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：非助手玛奥六档推进',
  },
  {
    desc: 'M4254 COM27 背后位肛交计数推进 6 改 5（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '            `${player_name}舔着嘴唇，按着${target_name}光洁的臀部，更加激烈地抽插着……`,\n          );\n          kojo.背后位肛交 = 6;',
    replace:
      '            `${player_name}舔着嘴唇，按着${target_name}光洁的臀部，更加激烈地抽插着……`,\n          );\n          kojo.背后位肛交 = 5;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：非助手玛奥六档推进',
  },
  {
    desc: 'M4255 COM27 背后位肛交计数推进 5 改 4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '              `${player_name}欣赏着自己的调教成果，更加激烈地抽插着……`,\n            );\n          }\n          kojo.背后位肛交 = 5;',
    replace:
      '              `${player_name}欣赏着自己的调教成果，更加激烈地抽插着……`,\n            );\n          }\n          kojo.背后位肛交 = 4;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：非助手玛奥六档推进',
  },
  {
    desc: 'M4256 COM27 背后位肛交计数推进 4 改 3（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          );\n          kojo.背后位肛交 = 4;',
    replace: '          );\n          kojo.背后位肛交 = 3;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：非助手玛奥六档推进',
  },
  {
    desc: 'M4257 COM27 背后位肛交计数推进 3 改 2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.背后位肛交 = 3;\n        } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(',
    replace:
      '          kojo.背后位肛交 = 2;\n        } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：非助手玛奥六档推进',
  },
  {
    desc: 'M4258 COM27 背后位肛交计数推进 2 改 1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.背后位肛交 = 2;\n        }\n        return 0;',
    replace: '          kojo.背后位肛交 = 1;\n        }\n        return 0;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：非助手玛奥六档推进',
  },
  {
    desc: 'M4263 COM27 武器三目 && 改 ||（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: "  // IF SELECTCOM == 27（背后位肛交 CFLAG:328）\n  if (era_flag.selectcom === 27) {\n    const weapon =\n      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0\n        ? '电动假阳具'\n        : '阴茎';",
    replace:
      "  // IF SELECTCOM == 27（背后位肛交 CFLAG:328）\n  if (era_flag.selectcom === 27) {\n    // 变异：武器三目条件改回 ||（缺陷写法：前两档误读 CFLAG:327 正常位肛交）\n    const weapon =\n      era0(`talent:${player}:121`) === 0 || era0(`talent:${player}:122`) === 0\n        ? '电动假阳具'\n        : '阴茎';",
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 初次助手玛奥使用三目武器名',
  },
  {
    desc: 'M4264 COM27 初次爱慕肛门感觉 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (era.get(`talent:${target}:85`) === 1) {\n          if (chara(target).system.肛门感觉 >= 3) {\n            await era.printAndWait(\n              `${target_name}被充分调教，开发的肛门和直肠紧紧夹着${player_name}的阴茎，感受着来自背后的侵犯。`,\n            );',
    replace:
      '        } else if (era.get(`talent:${target}:85`) === 1) {\n          if (chara(target).system.肛门感觉 >= 4) {\n            await era.printAndWait(\n              `${target_name}被充分调教，开发的肛门和直肠紧紧夹着${player_name}的阴茎，感受着来自背后的侵犯。`,\n            );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 初次爱慕肛门感觉达标',
  },
  {
    desc: 'M4265 COM27 助手爱慕＋A感覚门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.背后位肛交 = 6;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          chara(target).system.肛门感觉 >= 3 &&\n          (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)\n        ) {\n          if (rand_n(3) === 0) {\n            await era.print(',
    replace:
      '          kojo.背后位肛交 = 6;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          chara(target).system.肛门感觉 >= 4 &&\n          (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)\n        ) {\n          if (rand_n(3) === 0) {\n            await era.print(',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：助手玛奥六档推进',
  },
  {
    desc: 'M4266 COM27 非助手爱慕＋A感覚门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.背后位肛交 = 6;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          chara(target).system.肛门感觉 >= 3 &&\n          (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)\n        ) {\n          if (rand_n(3) === 0) {\n            await era.printAndWait(',
    replace:
      '          kojo.背后位肛交 = 6;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          chara(target).system.肛门感觉 >= 4 &&\n          (kojo.背后位肛交 <= 4 || game.kojo.口上开关 === 2)\n        ) {\n          if (rand_n(3) === 0) {\n            await era.printAndWait(',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：非助手玛奥六档推进',
  },
  {
    desc: 'M4267 COM27 助手爱慕 RAND:3 ===0 改 ===1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          await era.print(`『哎嘿嘿，姐姐的漂亮的小肛门……要开始侵犯了哦♪』`);\n          await era.printAndWait(\n            `${player_name}坏笑着，前后动着腰，开始肆意地侵犯，蹂躏着${target_name}的肛门。`,\n          );\n          if (rand_n(3) === 0) {',
    replace:
      '          (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          await era.print(`『哎嘿嘿，姐姐的漂亮的小肛门……要开始侵犯了哦♪』`);\n          await era.printAndWait(\n            `${player_name}坏笑着，前后动着腰，开始肆意地侵犯，蹂躏着${target_name}的肛门。`,\n          );\n          if (rand_n(3) === 1) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 助手玛奥爱慕 RAND 第二档',
  },
  {
    desc: 'M4268 COM27 非助手爱慕 RAND:2 ===0 改 ===1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          await era.printAndWait(`「拜……拜托了……魔王大人……请温柔一点！」`);\n          await era.printAndWait(\n            `${target_name}还有点不适应肛交的感觉，整个背部都因为不适而弓了起来。`,\n          );\n          if (rand_n(2) === 0) {',
    replace:
      '          await era.printAndWait(`「拜……拜托了……魔王大人……请温柔一点！」`);\n          await era.printAndWait(\n            `${target_name}还有点不适应肛交的感觉，整个背部都因为不适而弓了起来。`,\n          );\n          if (rand_n(2) === 1) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 非助手玛奥爱慕 RAND 第一档',
  },
  {
    desc: 'M4269 COM27 初次爱慕素质检查 ===1 改 ===0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (era.get(`talent:${target}:85`) === 1) {\n          if (chara(target).system.肛门感觉 >= 3) {\n            await era.printAndWait(\n              `${target_name}被充分调教，开发的肛门和直肠紧紧夹着${player_name}的阴茎，感受着来自背后的侵犯。`,\n            );\n            await era.printAndWait(\n              `「啊啊……啊啊啊……魔王大人全，全部插进来了……好……好厉害啊啊啊${heart(1)}」`,\n            );\n            await era.printAndWait(\n              `「尽，尽情侵，侵犯${target_name}的肛门吧${heart(1)}」`,\n            );\n            await era.printAndWait(\n              `在${target_name}一阵阵甘甜的娇喘声中、${player_name}前后动着腰抽插着………`,\n            );\n          } else {',
    replace:
      '        } else if (era.get(`talent:${target}:85`) === 0) {\n          if (chara(target).system.肛门感觉 >= 3) {\n            await era.printAndWait(\n              `${target_name}被充分调教，开发的肛门和直肠紧紧夹着${player_name}的阴茎，感受着来自背后的侵犯。`,\n            );\n            await era.printAndWait(\n              `「啊啊……啊啊啊……魔王大人全，全部插进来了……好……好厉害啊啊啊${heart(1)}」`,\n            );\n            await era.printAndWait(\n              `「尽，尽情侵，侵犯${target_name}的肛门吧${heart(1)}」`,\n            );\n            await era.printAndWait(\n              `在${target_name}一阵阵甘甜的娇喘声中、${player_name}前后动着腰抽插着………`,\n            );\n          } else {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 初次爱慕肛门感觉达标',
  },
  {
    desc: 'M4270 COM27 助手爱慕素质检查 ===1 改 ===0（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          kojo.背后位肛交 = 5;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          await era.print(`『哎嘿嘿，姐姐的漂亮的小肛门……要开始侵犯了哦♪』`);',
    replace:
      '          kojo.背后位肛交 = 5;\n        } else if (\n          era.get(`talent:${target}:85`) === 0 &&\n          (kojo.背后位肛交 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          await era.print(`『哎嘿嘿，姐姐的漂亮的小肛门……要开始侵犯了哦♪』`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM27 二回目：助手玛奥六档推进',
  },
  ...[
    {
      desc: 'M4271 COM28 初次 CFLAG:329 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.对面座位肛交 = 1;',
      replace: 'kojo.对面座位肛交 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM28 初次第 1 档推进',
    },
    {
      desc: 'M4272 COM28 助手淫乱＋A感覚 CFLAG:329 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.对面座位肛交 = 7;',
      replace: '        kojo.对面座位肛交 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM28 助手玛奥第 1 档推进',
    },
    {
      desc: 'M4273 COM28 助手淫乱 CFLAG:329 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.对面座位肛交 = 6;',
      replace: '        kojo.对面座位肛交 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM28 助手玛奥第 2 档推进',
    },
    {
      desc: 'M4274 COM28 助手爱慕＋A感覚 CFLAG:329 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.对面座位肛交 = 5;',
      replace: '        kojo.对面座位肛交 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM28 助手玛奥第 3 档推进',
    },
    {
      desc: 'M4275 COM28 助手爱慕 CFLAG:329 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.对面座位肛交 = 4;',
      replace: '        kojo.对面座位肛交 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM28 助手玛奥第 4 档推进',
    },
    {
      desc: 'M4276 COM28 助手A感覚 CFLAG:329 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.对面座位肛交 = 3;',
      replace: '        kojo.对面座位肛交 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM28 助手玛奥第 5 档推进',
    },
    {
      desc: 'M4277 COM28 助手それ以外 CFLAG:329 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.对面座位肛交 = 2;',
      replace: '        kojo.对面座位肛交 = 1;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM28 助手玛奥第 6 档推进',
    },
    {
      desc: 'M4278 COM28 非助手淫乱＋A感覚 CFLAG:329 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.对面座位肛交 = 7;\n    } else if (',
      replace: '      kojo.对面座位肛交 = 6;\n    } else if (',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM28 非助手玛奥第 1 档推进',
    },
    {
      desc: 'M4279 COM28 非助手淫乱 CFLAG:329 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.对面座位肛交 = 6;\n    } else if (',
      replace: '      kojo.对面座位肛交 = 5;\n    } else if (',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM28 非助手玛奥第 2 档推进',
    },
    {
      desc: 'M4280 COM28 非助手爱慕＋A感覚 CFLAG:329 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.对面座位肛交 = 5;\n    } else if (',
      replace: '      kojo.对面座位肛交 = 4;\n    } else if (',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM28 非助手玛奥第 3 档推进',
    },
    {
      desc: 'M4281 COM28 非助手爱慕 CFLAG:329 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.对面座位肛交 = 4;\n    } else if (',
      replace: '      kojo.对面座位肛交 = 3;\n    } else if (',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM28 非助手玛奥第 4 档推进',
    },
    {
      desc: 'M4282 COM28 非助手A感覚 CFLAG:329 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.对面座位肛交 = 3;\n    } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 === 2) {',
      replace:
        '      kojo.对面座位肛交 = 2;\n    } else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 === 2) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM28 非助手玛奥第 5 档推进',
    },
    {
      desc: 'M4283 COM28 非助手それ以外 CFLAG:329 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.对面座位肛交 = 2;\n    }',
      replace: '      kojo.对面座位肛交 = 1;\n    }',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM28 非助手玛奥第 6 档推进',
    },
  ],
  {
    desc: 'M4536 COM56 首次 CFLAG:357 推进写错（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.交谈 = 1;\n      return 0;\n    } else {\n      if (era.get(`tequip:${target}:53`) === 1) {',
    replace:
      '      kojo.交谈 = 2;\n      return 0;\n    } else {\n      if (era.get(`tequip:${target}:53`) === 1) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM56 首次推进 CFLAG:357=1',
  },
  {
    desc: 'M4537 COM56 录像内容未按位保留（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: "          // 是 SIF 的插入段，末行 PRINTFORML 才收行（#623）\n          const masturbation_talk = chara(target).train.自慰中毒 >= 3;\n          await era.print(\n            `${target_name}介绍了自己的名字和迄今为止的性经验` +\n              (masturbation_talk\n                ? '、自慰的时候幻想的内容和对象也说出来了'\n                : '') +\n              `说得自己都兴奋起来了……`,\n          );\n          await era.print(\n            `似乎在期待着被全村的人看到自己现在的样子，股间也开始湿润了……`,\n          );\n          await era.printAndWait(\n            `「啊啊……我，我最喜欢在魔王大人的视线下自慰了……那样特别有感觉${heart(1)} 自慰的时候……我会想着叔父和他的小儿子……想着被他们一起侵犯${heart(1)}」`,\n          );\n          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）\n          game.kojo.录像内容 |= 2;",
    replace:
      "          // 是 SIF 的插入段，末行 PRINTFORML 才收行（#623）\n          const masturbation_talk = chara(target).train.自慰中毒 >= 3;\n          await era.print(\n            `${target_name}介绍了自己的名字和迄今为止的性经验` +\n              (masturbation_talk\n                ? '、自慰的时候幻想的内容和对象也说出来了'\n                : '') +\n              `说得自己都兴奋起来了……`,\n          );\n          await era.print(\n            `似乎在期待着被全村的人看到自己现在的样子，股间也开始湿润了……`,\n          );\n          await era.printAndWait(\n            `「啊啊……我，我最喜欢在魔王大人的视线下自慰了……那样特别有感觉${heart(1)} 自慰的时候……我会想着叔父和他的小儿子……想着被他们一起侵犯${heart(1)}」`,\n          );\n          // TFLAG:32 | = 2（变量语义：TFLAG 族，32 |）\n          game.kojo.录像内容 = 2;",
    tests: ['kojo-k11-lily'],
    must_mention: 'COM56 录像内容按位保留',
  },
  ...[
    {
      desc: 'M4538 COM63 初次 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.六九式 = 1;',
      replace: 'kojo.六九式 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 初めて：助手玛奥与非助手各三档',
    },
    {
      desc: 'M4539 COM63 助手档9 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `两人摇着腰肢，尽情享受着姐妹百合之爱，娇喘声连绵不绝。`,\n          );\n          // CFLAG:TARGET:364  = 9（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 9;',
      replace:
        '            `两人摇着腰肢，尽情享受着姐妹百合之爱，娇喘声连绵不绝。`,\n          );\n          // CFLAG:TARGET:364  = 9（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4540 COM63 助手档8 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`两人摇着腰肢，享受着姐妹百合之爱`);\n          // CFLAG:TARGET:364  = 8（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 8;',
      replace:
        '          await era.printAndWait(`两人摇着腰肢，享受着姐妹百合之爱`);\n          // CFLAG:TARGET:364  = 8（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4541 COM63 助手档7 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `虽然嘴上这么说，但是${target_name}还是逐渐兴奋了起来，享受着和${player_name}摩擦下体的快感……`,\n          );\n          // CFLAG:TARGET:364  = 7（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 7;',
      replace:
        '            `虽然嘴上这么说，但是${target_name}还是逐渐兴奋了起来，享受着和${player_name}摩擦下体的快感……`,\n          );\n          // CFLAG:TARGET:364  = 7（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4542 COM63 助手档6 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `两人摇着腰肢，尽情享受着姐妹百合之爱，娇喘声连绵不绝。`,\n          );\n          // CFLAG:TARGET:364  = 6（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 6;',
      replace:
        '            `两人摇着腰肢，尽情享受着姐妹百合之爱，娇喘声连绵不绝。`,\n          );\n          // CFLAG:TARGET:364  = 6（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4543 COM63 助手档5 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}满脸通红地享受着和妹妹的百合之爱……`,\n          );\n          // CFLAG:TARGET:364  = 5（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 5;',
      replace:
        '            `${target_name}满脸通红地享受着和妹妹的百合之爱……`,\n          );\n          // CFLAG:TARGET:364  = 5（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4544 COM63 助手档4 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `虽然嘴上这么说者，而且脸也红到了耳根，但是相互摩擦着的蜜穴传来的快感还是让${player_name}忍不住娇喘了起来`,\n          );\n          // CFLAG:TARGET:364  = 4（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 4;',
      replace:
        '            `虽然嘴上这么说者，而且脸也红到了耳根，但是相互摩擦着的蜜穴传来的快感还是让${player_name}忍不住娇喘了起来`,\n          );\n          // CFLAG:TARGET:364  = 4（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4545 COM63 助手档3 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.六九式 = 3;\n        } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `${player_name}强行分开${target_name}的双腿，紧贴着彼此的下体摩擦起来，爱液不断地从两人的交合处流出。`,',
      replace:
        '          kojo.六九式 = 99;\n        } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `${player_name}强行分开${target_name}的双腿，紧贴着彼此的下体摩擦起来，爱液不断地从两人的交合处流出。`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4546 COM63 助手档2 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.六九式 = 2;\n        }\n      } else {',
      replace: '          kojo.六九式 = 99;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4547 COM63 非助手档9 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}尽情扭动着腰身，享受着百合之乐……`,\n          );\n          // CFLAG:TARGET:364  = 9（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 9;',
      replace:
        '            `${target_name}尽情扭动着腰身，享受着百合之乐……`,\n          );\n          // CFLAG:TARGET:364  = 9（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4548 COM63 非助手档8 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:TARGET:364  = 8（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 8;',
      replace:
        '          );\n          // CFLAG:TARGET:364  = 8（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4549 COM63 非助手档7 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}娇喘着，享受着蜜穴被摩擦传来的阵阵快感……`,\n          );\n          // CFLAG:TARGET:364  = 7（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 7;',
      replace:
        '            `${target_name}娇喘着，享受着蜜穴被摩擦传来的阵阵快感……`,\n          );\n          // CFLAG:TARGET:364  = 7（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4550 COM63 非助手档6 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}尽情扭动着腰身，享受着百合之乐……`,\n          );\n          // CFLAG:TARGET:364  = 6（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 6;',
      replace:
        '            `${target_name}尽情扭动着腰身，享受着百合之乐……`,\n          );\n          // CFLAG:TARGET:364  = 6（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4551 COM63 非助手档5 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}与${player_name}继续扭动着腰身，寻求着更多的快感。`,\n          );\n          // CFLAG:TARGET:364  = 5（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 5;',
      replace:
        '            `${target_name}与${player_name}继续扭动着腰身，寻求着更多的快感。`,\n          );\n          // CFLAG:TARGET:364  = 5（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4552 COM63 非助手档4 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}红着脸，完全沉浸在百合之乐的快感中……`,\n          );\n          // CFLAG:TARGET:364  = 4（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 4;',
      replace:
        '            `${target_name}红着脸，完全沉浸在百合之乐的快感中……`,\n          );\n          // CFLAG:TARGET:364  = 4（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4553 COM63 非助手档3 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.六九式 = 3;\n        } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `${player_name}强行分开${target_name}的双腿，紧贴着彼此的小穴相互摩擦起来。`,',
      replace:
        '          kojo.六九式 = 99;\n        } else if (kojo.六九式 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `${player_name}强行分开${target_name}的双腿，紧贴着彼此的小穴相互摩擦起来。`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4554 COM63 非助手档2 CFLAG:364 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`${target_name}无力抵抗，只能哭泣着忍受……`);\n          // CFLAG:TARGET:364  = 2（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 2;',
      replace:
        '          await era.printAndWait(`${target_name}无力抵抗，只能哭泣着忍受……`);\n          // CFLAG:TARGET:364  = 2（变量语义：CFLAG 族，TARGET:364）\n          kojo.六九式 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM63 二回目：非助手玛奥八档推进',
    },
  ],
  {
    desc: 'M4555 COM64 非玛奥助手检查条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: 'if (era_flag.assi > 0 && era_flag.assi !== 17) {',
    replace: 'if (era_flag.assi > 0 && era_flag.assi === 17) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM64 检查：助手不是玛奥时静默跳过',
  },
  {
    desc: 'M4556 COM64 首次 CFLAG:391 推进写错（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: 'kojo.三人PLAY = 1;',
    replace: 'kojo.三人PLAY = 2;',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM64 初めて：处女/非处女×玛奥助手/无助手×六种部位组合',
  },
  {
    desc: 'M4557 COM64 助手性器三目 && 改 ||（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      era_flag.assi > 0 &&
      era0(\`talent:\${era_flag.assi}:121\`) === 0 &&
      era0(\`talent:\${era_flag.assi}:122\`) === 0`,
    replace: `      era_flag.assi > 0 &&
      (era0(\`talent:\${era_flag.assi}:121\`) === 0 ||
        era0(\`talent:\${era_flag.assi}:122\`) === 0)`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM64 根据主人和助手性器素质显示电动假阳具或阴茎',
  },
  {
    desc: 'M4558 COM64 主人性器三目 && 改 ||（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: 'era0(`talent:${MASTER}:121`) === 0 && era0(`talent:${MASTER}:122`) === 0',
    replace:
      'era0(`talent:${MASTER}:121`) === 0 || era0(`talent:${MASTER}:122`) === 0',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM64 根据主人和助手性器素质显示电动假阳具或阴茎',
  },
  ...[
    {
      desc: 'M4559 COM65 初次 CFLAG:366 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.侵犯助手 = 1;',
      replace: 'kojo.侵犯助手 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM65 初めて：玛奥是否处女×淫乱、爱慕与其余三档',
    },
    {
      desc: 'M4560 COM65 淫乱＋百合气质Lv5 CFLAG:366 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.侵犯助手 = 9;',
      replace: 'kojo.侵犯助手 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM65 二回目：玛奥助手八档推进',
    },
    {
      desc: 'M4561 COM65 淫乱＋百合气质Lv3 CFLAG:366 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.侵犯助手 = 8;',
      replace: 'kojo.侵犯助手 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM65 二回目：玛奥助手八档推进',
    },
    {
      desc: 'M4562 COM65 淫乱 CFLAG:366 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.侵犯助手 = 7;',
      replace: 'kojo.侵犯助手 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM65 二回目：玛奥助手八档推进',
    },
    {
      desc: 'M4563 COM65 爱慕＋百合气质Lv5 CFLAG:366 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.侵犯助手 = 6;',
      replace: 'kojo.侵犯助手 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM65 二回目：玛奥助手八档推进',
    },
    {
      desc: 'M4564 COM65 爱慕＋百合气质Lv3 CFLAG:366 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.侵犯助手 = 5;',
      replace: 'kojo.侵犯助手 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM65 二回目：玛奥助手八档推进',
    },
    {
      desc: 'M4565 COM65 爱慕 CFLAG:366 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.侵犯助手 = 4;',
      replace: 'kojo.侵犯助手 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM65 二回目：玛奥助手八档推进',
    },
    {
      desc: 'M4566 COM65 百合气质Lv3 CFLAG:366 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.侵犯助手 = 3;',
      replace: 'kojo.侵犯助手 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM65 二回目：玛奥助手八档推进',
    },
    {
      desc: 'M4567 COM65 其余 CFLAG:366 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.侵犯助手 = 2;',
      replace: 'kojo.侵犯助手 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM65 二回目：玛奥助手八档推进',
    },
  ],
  ...[
    {
      desc: 'M4568 COM66 初次 CFLAG:367 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.双人口交 = 1;',
      replace: 'kojo.双人口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM66 初めて：玛奥助手淫乱、爱慕与其余三档',
    },
    {
      desc: 'M4569 COM66 玛奥淫乱 CFLAG:367 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          }\n          // CFLAG:367  = 5（变量语义：CFLAG 族，367）\n          kojo.双人口交 = 5;',
      replace:
        '          }\n          // CFLAG:367  = 5（变量语义：CFLAG 族，367）\n          kojo.双人口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM66 二回目：玛奥助手四档与 RAND 三分支',
    },
    {
      desc: 'M4570 COM66 玛奥爱慕 CFLAG:367 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          }\n          // CFLAG:367  = 4（变量语义：CFLAG 族，367）\n          kojo.双人口交 = 4;',
      replace:
        '          }\n          // CFLAG:367  = 4（变量语义：CFLAG 族，367）\n          kojo.双人口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM66 二回目：玛奥助手四档与 RAND 三分支',
    },
    {
      desc: 'M4571 COM66 玛奥侍奉精神 CFLAG:367 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.双人口交 = 3;\n        } else if (kojo.双人口交 <= 1 || game.kojo.口上开关 === 2) {\n          switch (',
      replace:
        '          kojo.双人口交 = 99;\n        } else if (kojo.双人口交 <= 1 || game.kojo.口上开关 === 2) {\n          switch (',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM66 二回目：玛奥助手四档与 RAND 三分支',
    },
    {
      desc: 'M4572 COM66 玛奥其余 CFLAG:367 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.双人口交 = 2;\n        }\n      } else {',
      replace: '          kojo.双人口交 = 99;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM66 二回目：玛奥助手四档与 RAND 三分支',
    },
    {
      desc: 'M4573 COM66 无玛奥淫乱 CFLAG:367 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: "          await era.printAndWait('');\n          // CFLAG:367  = 5（变量语义：CFLAG 族，367）\n          kojo.双人口交 = 5;",
      replace:
        "          await era.printAndWait('');\n          // CFLAG:367  = 5（变量语义：CFLAG 族，367）\n          kojo.双人口交 = 99;",
      tests: ['kojo-k11-lily'],
      must_mention: 'COM66 二回目：没有玛奥助手时四档只推进空模板',
    },
    {
      desc: 'M4574 COM66 无玛奥爱慕 CFLAG:367 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: "          await era.printAndWait('');\n          // CFLAG:367  = 4（变量语义：CFLAG 族，367）\n          kojo.双人口交 = 4;",
      replace:
        "          await era.printAndWait('');\n          // CFLAG:367  = 4（变量语义：CFLAG 族，367）\n          kojo.双人口交 = 99;",
      tests: ['kojo-k11-lily'],
      must_mention: 'COM66 二回目：没有玛奥助手时四档只推进空模板',
    },
    {
      desc: 'M4575 COM66 无玛奥侍奉精神 CFLAG:367 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: "          kojo.双人口交 = 3;\n        } else if (kojo.双人口交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait('');",
      replace:
        "          kojo.双人口交 = 99;\n        } else if (kojo.双人口交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait('');",
      tests: ['kojo-k11-lily'],
      must_mention: 'COM66 二回目：没有玛奥助手时四档只推进空模板',
    },
    {
      desc: 'M4576 COM66 无玛奥其余 CFLAG:367 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: "          await era.printAndWait('');\n          // CFLAG:367  = 2（变量语义：CFLAG 族，367）\n          kojo.双人口交 = 2;",
      replace:
        "          await era.printAndWait('');\n          // CFLAG:367  = 2（变量语义：CFLAG 族，367）\n          kojo.双人口交 = 99;",
      tests: ['kojo-k11-lily'],
      must_mention: 'COM66 二回目：没有玛奥助手时四档只推进空模板',
    },
  ],
  ...[
    {
      desc: 'M4577 COM68 初次 CFLAG:369 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.双人侍奉口交 = 1;',
      replace: 'kojo.双人侍奉口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM68 初めて：玛奥助手淫乱、爱慕与其余三档',
    },
    {
      desc: 'M4578 COM68 玛奥淫乱 CFLAG:369 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          }\n          // CFLAG:369  = 5（变量语义：CFLAG 族，369）\n          kojo.双人侍奉口交 = 5;',
      replace:
        '          }\n          // CFLAG:369  = 5（变量语义：CFLAG 族，369）\n          kojo.双人侍奉口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM68 二回目：玛奥助手四档与姐妹素质、RAND 分支',
    },
    {
      desc: 'M4579 COM68 玛奥爱慕 CFLAG:369 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          }\n          // CFLAG:369  = 4（变量语义：CFLAG 族，369）\n          kojo.双人侍奉口交 = 4;',
      replace:
        '          }\n          // CFLAG:369  = 4（变量语义：CFLAG 族，369）\n          kojo.双人侍奉口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM68 二回目：玛奥助手四档与姐妹素质、RAND 分支',
    },
    {
      desc: 'M4580 COM68 玛奥侍奉精神 CFLAG:369 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.双人侍奉口交 = 3;\n        } else if (kojo.双人侍奉口交 <= 1 || game.kojo.口上开关 === 2) {\n          switch (',
      replace:
        '          kojo.双人侍奉口交 = 99;\n        } else if (kojo.双人侍奉口交 <= 1 || game.kojo.口上开关 === 2) {\n          switch (',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM68 二回目：玛奥助手四档与姐妹素质、RAND 分支',
    },
    {
      desc: 'M4581 COM68 玛奥其余 CFLAG:369 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.双人侍奉口交 = 2;\n        }\n      } else {',
      replace: '          kojo.双人侍奉口交 = 99;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM68 二回目：玛奥助手四档与姐妹素质、RAND 分支',
    },
    {
      desc: 'M4582 COM68 无玛奥淫乱 CFLAG:369 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: "          await era.printAndWait('');\n          // CFLAG:369  = 5（变量语义：CFLAG 族，369）\n          kojo.双人侍奉口交 = 5;",
      replace:
        "          await era.printAndWait('');\n          // CFLAG:369  = 5（变量语义：CFLAG 族，369）\n          kojo.双人侍奉口交 = 99;",
      tests: ['kojo-k11-lily'],
      must_mention: 'COM68 二回目：没有玛奥助手时四档只推进空模板',
    },
    {
      desc: 'M4583 COM68 无玛奥爱慕 CFLAG:369 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: "          await era.printAndWait('');\n          // CFLAG:369  = 4（变量语义：CFLAG 族，369）\n          kojo.双人侍奉口交 = 4;",
      replace:
        "          await era.printAndWait('');\n          // CFLAG:369  = 4（变量语义：CFLAG 族，369）\n          kojo.双人侍奉口交 = 99;",
      tests: ['kojo-k11-lily'],
      must_mention: 'COM68 二回目：没有玛奥助手时四档只推进空模板',
    },
    {
      desc: 'M4584 COM68 无玛奥侍奉精神 CFLAG:369 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: "          kojo.双人侍奉口交 = 3;\n        } else if (kojo.双人侍奉口交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait('');",
      replace:
        "          kojo.双人侍奉口交 = 99;\n        } else if (kojo.双人侍奉口交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait('');",
      tests: ['kojo-k11-lily'],
      must_mention: 'COM68 二回目：没有玛奥助手时四档只推进空模板',
    },
    {
      desc: 'M4585 COM68 无玛奥其余 CFLAG:369 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: "          await era.printAndWait('');\n          // CFLAG:369  = 2（变量语义：CFLAG 族，369）\n          kojo.双人侍奉口交 = 2;",
      replace:
        "          await era.printAndWait('');\n          // CFLAG:369  = 2（变量语义：CFLAG 族，369）\n          kojo.双人侍奉口交 = 99;",
      tests: ['kojo-k11-lily'],
      must_mention: 'COM68 二回目：没有玛奥助手时四档只推进空模板',
    },
  ],
  ...[
    {
      desc: 'M4586 COM123 初次 CFLAG:360 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.乳夹口交 = 1;',
      replace: 'kojo.乳夹口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM123 初めて：淫乱、爱慕、侍奉精神与其余四档',
    },
    {
      desc: 'M4587 COM123 助手淫乱 CFLAG:360 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `『嗯啊……是啊……姐姐快把嘴张开，我要射在你的舌头上${heart(1)}』`,\n          );\n          // CFLAG:360  = 5（变量语义：CFLAG 族，360）\n          kojo.乳夹口交 = 5;',
      replace:
        '            `『嗯啊……是啊……姐姐快把嘴张开，我要射在你的舌头上${heart(1)}』`,\n          );\n          // CFLAG:360  = 5（变量语义：CFLAG 族，360）\n          kojo.乳夹口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM123 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4588 COM123 助手爱慕 CFLAG:360 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `『人家……也很舒服啊${heart(1)} 啊啊啊姐姐张开嘴……我要射了，你要全部喝下去啊${heart(1)}』`,\n          );\n          // CFLAG:360  = 4（变量语义：CFLAG 族，360）\n          kojo.乳夹口交 = 4;',
      replace:
        '            `『人家……也很舒服啊${heart(1)} 啊啊啊姐姐张开嘴……我要射了，你要全部喝下去啊${heart(1)}』`,\n          );\n          // CFLAG:360  = 4（变量语义：CFLAG 族，360）\n          kojo.乳夹口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM123 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4589 COM123 助手侍奉精神 CFLAG:360 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.乳夹口交 = 3;\n        } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `『哇啊啊……被姐姐这对淫荡的大胸部乳交起来真舒服啊……不过嘴也不能闲着，得好好舔啊？』`,',
      replace:
        '          kojo.乳夹口交 = 99;\n        } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `『哇啊啊……被姐姐这对淫荡的大胸部乳交起来真舒服啊……不过嘴也不能闲着，得好好舔啊？』`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM123 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4590 COM123 助手其余 CFLAG:360 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.乳夹口交 = 2;\n        }\n      } else {',
      replace: '          kojo.乳夹口交 = 99;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM123 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4591 COM123 非助手淫乱 CFLAG:360 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「魔王大人要射精的话……记得全部射在我的嘴里哦${heart(1)}」`,\n          );\n          // CFLAG:360  = 5（变量语义：CFLAG 族，360）\n          kojo.乳夹口交 = 5;',
      replace:
        '            `「魔王大人要射精的话……记得全部射在我的嘴里哦${heart(1)}」`,\n          );\n          // CFLAG:360  = 5（变量语义：CFLAG 族，360）\n          kojo.乳夹口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM123 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4592 COM123 非助手爱慕 CFLAG:360 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「唔呣……唔呣……唔呣${heart(1)} 魔王大人这次想要射在什么地方呢${heart(1)}」`,\n          );\n          // CFLAG:360  = 4（变量语义：CFLAG 族，360）\n          kojo.乳夹口交 = 4;',
      replace:
        '            `「唔呣……唔呣……唔呣${heart(1)} 魔王大人这次想要射在什么地方呢${heart(1)}」`,\n          );\n          // CFLAG:360  = 4（变量语义：CFLAG 族，360）\n          kojo.乳夹口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM123 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4593 COM123 非助手侍奉精神 CFLAG:360 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.乳夹口交 = 3;\n        } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「呜呜呜……这种事情……到底有什么好的………」`);',
      replace:
        '          kojo.乳夹口交 = 99;\n        } else if (kojo.乳夹口交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「呜呜呜……这种事情……到底有什么好的………」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM123 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4594 COM123 非助手其余 CFLAG:360 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.乳夹口交 = 2;\n        }\n      }\n      return 0;',
      replace:
        '          kojo.乳夹口交 = 99;\n        }\n      }\n      return 0;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM123 二回目：非助手玛奥四档推进',
    },
  ],
  ...[
    {
      desc: 'M4595 COM125 初次 CFLAG:361 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.口交时自慰 = 1;',
      replace: 'kojo.口交时自慰 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM125 初めて：淫乱、爱慕、侍奉精神与其余四档',
    },
    {
      desc: 'M4596 COM125 助手淫乱 CFLAG:361 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}再度张开嘴，将${player_name}的阴茎含进口中卖力地吸吮起来………`,\n          );\n          // CFLAG:361  = 5（变量语义：CFLAG 族，361）\n          kojo.口交时自慰 = 5;',
      replace:
        '            `${target_name}再度张开嘴，将${player_name}的阴茎含进口中卖力地吸吮起来………`,\n          );\n          // CFLAG:361  = 5（变量语义：CFLAG 族，361）\n          kojo.口交时自慰 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM125 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4597 COM125 助手爱慕 CFLAG:361 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「好啦，知道啦……咕呣……咕呣…${heart(1)}」`);\n          // CFLAG:361  = 4（变量语义：CFLAG 族，361）\n          kojo.口交时自慰 = 4;',
      replace:
        '          await era.printAndWait(`「好啦，知道啦……咕呣……咕呣…${heart(1)}」`);\n          // CFLAG:361  = 4（变量语义：CFLAG 族，361）\n          kojo.口交时自慰 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM125 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4598 COM125 助手侍奉精神 CFLAG:361 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.口交时自慰 = 3;\n        } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「别催啦……我，我会照做的……咕呣……咕呣……这样……就可以了吧？」`,',
      replace:
        '          kojo.口交时自慰 = 99;\n        } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「别催啦……我，我会照做的……咕呣……咕呣……这样……就可以了吧？」`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM125 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4599 COM125 助手其余 CFLAG:361 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.口交时自慰 = 2;\n        }\n      } else {',
      replace: '          kojo.口交时自慰 = 99;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM125 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4600 COM125 非助手淫乱 CFLAG:361 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}继续卖力地吸吮着${player_name}的阴茎，发出一阵阵淫秽不堪的声音……`,\n          );\n          // CFLAG:361  = 5（变量语义：CFLAG 族，361）\n          kojo.口交时自慰 = 5;',
      replace:
        '            `${target_name}继续卖力地吸吮着${player_name}的阴茎，发出一阵阵淫秽不堪的声音……`,\n          );\n          // CFLAG:361  = 5（变量语义：CFLAG 族，361）\n          kojo.口交时自慰 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM125 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4601 COM125 非助手爱慕 CFLAG:361 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「好，好丢人……咕呣……咕呣${heart(1)}」`);\n          // CFLAG:361  = 4（变量语义：CFLAG 族，361）\n          kojo.口交时自慰 = 4;',
      replace:
        '          await era.printAndWait(`「好，好丢人……咕呣……咕呣${heart(1)}」`);\n          // CFLAG:361  = 4（变量语义：CFLAG 族，361）\n          kojo.口交时自慰 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM125 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4602 COM125 非助手侍奉精神 CFLAG:361 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.口交时自慰 = 3;\n        } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「别催啦……我，我会照做的……咕呣……咕呣……这样……就可以了吧？？」`,',
      replace:
        '          kojo.口交时自慰 = 99;\n        } else if (kojo.口交时自慰 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「别催啦……我，我会照做的……咕呣……咕呣……这样……就可以了吧？？」`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM125 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4603 COM125 非助手其余 CFLAG:361 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.口交时自慰 = 2;\n        }\n      }\n      return 0;',
      replace:
        '          kojo.口交时自慰 = 99;\n        }\n      }\n      return 0;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM125 二回目：非助手玛奥四档推进',
    },
  ],
  ...[
    {
      desc: 'M4604 COM126 初次 CFLAG:362 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.手搓口交 = 1;',
      replace: 'kojo.手搓口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM126 初めて：淫乱、爱慕、侍奉精神与其余四档',
    },
    {
      desc: 'M4605 COM126 助手淫乱 CFLAG:362 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}脸上浮现出了妖艳的笑容，用舌头拨弄着${player_name}的龟头，手指按摩着根部………`,\n          );\n          // CFLAG:362  = 5（变量语义：CFLAG 族，362）\n          kojo.手搓口交 = 5;',
      replace:
        '            `${target_name}脸上浮现出了妖艳的笑容，用舌头拨弄着${player_name}的龟头，手指按摩着根部………`,\n          );\n          // CFLAG:362  = 5（变量语义：CFLAG 族，362）\n          kojo.手搓口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM126 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4606 COM126 助手爱慕 CFLAG:362 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「咕呣……来吧，${player_name}${heart(1)} 射在姐姐嘴里吧${heart(1)}」`,\n          );\n          // CFLAG:362  = 4（变量语义：CFLAG 族，362）\n          kojo.手搓口交 = 4;',
      replace:
        '            `「咕呣……来吧，${player_name}${heart(1)} 射在姐姐嘴里吧${heart(1)}」`,\n          );\n          // CFLAG:362  = 4（变量语义：CFLAG 族，362）\n          kojo.手搓口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM126 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4607 COM126 助手侍奉精神 CFLAG:362 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.手搓口交 = 3;\n        } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「咕呣……咕呣……呣呣……」`);',
      replace:
        '          kojo.手搓口交 = 99;\n        } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「咕呣……咕呣……呣呣……」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM126 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4608 COM126 助手其余 CFLAG:362 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.手搓口交 = 2;\n        }\n      } else {',
      replace: '          kojo.手搓口交 = 99;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM126 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4609 COM126 非助手淫乱 CFLAG:362 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「咕呣……呣呣……${heart(1)} 魔王大人${heart(1)} 这次是要射在人家手上……还是嘴里呢${heart(1)}」`,\n          );\n          // CFLAG:362  = 5（变量语义：CFLAG 族，362）\n          kojo.手搓口交 = 5;',
      replace:
        '            `「咕呣……呣呣……${heart(1)} 魔王大人${heart(1)} 这次是要射在人家手上……还是嘴里呢${heart(1)}」`,\n          );\n          // CFLAG:362  = 5（变量语义：CFLAG 族，362）\n          kojo.手搓口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM126 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4610 COM126 非助手爱慕 CFLAG:362 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「当然了……魔王大人的人……我也一样喜欢${heart(1)}」`,\n          );\n          // CFLAG:362  = 4（变量语义：CFLAG 族，362）\n          kojo.手搓口交 = 4;',
      replace:
        '            `「当然了……魔王大人的人……我也一样喜欢${heart(1)}」`,\n          );\n          // CFLAG:362  = 4（变量语义：CFLAG 族，362）\n          kojo.手搓口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM126 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4611 COM126 非助手侍奉精神 CFLAG:362 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.手搓口交 = 3;\n        } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「咕呣……唔唔……呕！」`);',
      replace:
        '          kojo.手搓口交 = 99;\n        } else if (kojo.手搓口交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「咕呣……唔唔……呕！」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM126 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4612 COM126 非助手其余 CFLAG:362 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.手搓口交 = 2;\n        }\n      }\n      return 0;',
      replace:
        '          kojo.手搓口交 = 99;\n        }\n      }\n      return 0;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM126 二回目：非助手玛奥四档推进',
    },
  ],
  ...[
    {
      desc: 'M4613 COM127 初次 CFLAG:363 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.真空口交 = 1;',
      replace: 'kojo.真空口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM127 初めて：淫乱、爱慕、侍奉精神与其余四档',
    },
    {
      desc: 'M4614 COM127 助手淫乱 CFLAG:363 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `更加兴奋起来的${player_name}在姐姐的嘴里激烈地抽插着……`,\n          );\n          // CFLAG:363  = 5（变量语义：CFLAG 族，363）\n          kojo.真空口交 = 5;',
      replace:
        '            `更加兴奋起来的${player_name}在姐姐的嘴里激烈地抽插着……`,\n          );\n          // CFLAG:363  = 5（变量语义：CFLAG 族，363）\n          kojo.真空口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM127 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4615 COM127 助手爱慕 CFLAG:363 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「最，最喜欢${player_name}的阴茎了、让姐姐帮你把精液全部吸出来吧…${heart(1)}  咕啾……咕啾……唔唔${heart(1)}」`,\n          );\n          // CFLAG:363  = 4（变量语义：CFLAG 族，363）\n          kojo.真空口交 = 4;',
      replace:
        '            `「最，最喜欢${player_name}的阴茎了、让姐姐帮你把精液全部吸出来吧…${heart(1)}  咕啾……咕啾……唔唔${heart(1)}」`,\n          );\n          // CFLAG:363  = 4（变量语义：CFLAG 族，363）\n          kojo.真空口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM127 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4616 COM127 助手侍奉精神 CFLAG:363 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}被${player_name}用言语羞辱着，只能继续进行着口交侍奉………`,\n          );\n          // CFLAG:363  = 3（变量语义：CFLAG 族，363）\n          kojo.真空口交 = 3;',
      replace:
        '            `${target_name}被${player_name}用言语羞辱着，只能继续进行着口交侍奉………`,\n          );\n          // CFLAG:363  = 3（变量语义：CFLAG 族，363）\n          kojo.真空口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM127 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4617 COM127 助手其余 CFLAG:363 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.真空口交 = 2;\n        }\n      } else {',
      replace: '          kojo.真空口交 = 99;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM127 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4618 COM127 非助手淫乱 CFLAG:363 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}在阴茎强烈味道的刺激下，更加激烈的进行着真空口交侍奉………`,\n          );\n          // CFLAG:363  = 5（变量语义：CFLAG 族，363）\n          kojo.真空口交 = 5;',
      replace:
        '            `${target_name}在阴茎强烈味道的刺激下，更加激烈的进行着真空口交侍奉………`,\n          );\n          // CFLAG:363  = 5（变量语义：CFLAG 族，363）\n          kojo.真空口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM127 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4619 COM127 非助手爱慕 CFLAG:363 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}完全沉浸在阴茎的味道之中，更加激烈的进行着真空口交侍奉………`,\n          );\n          // CFLAG:363  = 4（变量语义：CFLAG 族，363）\n          kojo.真空口交 = 4;',
      replace:
        '            `${target_name}完全沉浸在阴茎的味道之中，更加激烈的进行着真空口交侍奉………`,\n          );\n          // CFLAG:363  = 4（变量语义：CFLAG 族，363）\n          kojo.真空口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM127 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4620 COM127 非助手侍奉精神 CFLAG:363 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「唔呣……唔呣！咕啾……魔王大人……让我，让我休息一下吧……」`,\n          );\n          // CFLAG:363  = 3（变量语义：CFLAG 族，363）\n          kojo.真空口交 = 3;',
      replace:
        '            `「唔呣……唔呣！咕啾……魔王大人……让我，让我休息一下吧……」`,\n          );\n          // CFLAG:363  = 3（变量语义：CFLAG 族，363）\n          kojo.真空口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM127 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4621 COM127 非助手其余 CFLAG:363 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.真空口交 = 2;\n        }\n      }\n      return 0;',
      replace:
        '          kojo.真空口交 = 99;\n        }\n      }\n      return 0;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM127 二回目：非助手玛奥四档推进',
    },
  ],
  ...[
    {
      desc: 'M4622 COM69 初次 CFLAG:370 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.魔族化 = 1;',
      replace: 'kojo.魔族化 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM69 初めて：双方性器名由 LOCALS:0-3 代入，四档推进到 1',
    },
    {
      desc: 'M4623 COM69 助手淫乱 CFLAG:370 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.魔族化 = 5;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.魔族化 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          await era.printAndWait(\n            `「唔呣……唔呣……${heart(1)} 啊啊啊……${player_name}舔得姐姐好舒服……${heart(1)}」`,',
      replace:
        '          kojo.魔族化 = 99;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.魔族化 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          await era.printAndWait(\n            `「唔呣……唔呣……${heart(1)} 啊啊啊……${player_name}舔得姐姐好舒服……${heart(1)}」`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM69 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4624 COM69 助手爱慕 CFLAG:370 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.魔族化 = 4;\n        } else if (\n          chara(target).system.侍奉精神 >= 3 &&\n          (kojo.魔族化 <= 2 || game.kojo.口上开关 === 2)\n        ) {\n          await era.printAndWait(\n            `「呜呜呜……明明……不喜欢这种事情……为什么……却停不下来……而且……好舒服啊啊！！」`,',
      replace:
        '          kojo.魔族化 = 99;\n        } else if (\n          chara(target).system.侍奉精神 >= 3 &&\n          (kojo.魔族化 <= 2 || game.kojo.口上开关 === 2)\n        ) {\n          await era.printAndWait(\n            `「呜呜呜……明明……不喜欢这种事情……为什么……却停不下来……而且……好舒服啊啊！！」`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM69 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4625 COM69 助手侍奉精神 CFLAG:370 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.魔族化 = 3;\n        } else if (kojo.魔族化 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「呜呜呜……为什么……要做这种这么下流的事情！」`,',
      replace:
        '          kojo.魔族化 = 99;\n        } else if (kojo.魔族化 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「呜呜呜……为什么……要做这种这么下流的事情！」`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM69 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4626 COM69 助手其余 CFLAG:370 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.魔族化 = 2;\n        }\n      } else {',
      replace: '          kojo.魔族化 = 99;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM69 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4627 COM69 非助手淫乱 CFLAG:370 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.魔族化 = 5;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.魔族化 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          await era.printAndWait(\n            `「唔呣……唔呣……啊啊啊${heart(1)} 魔王大人……舔得人家……太舒服了……${heart(1)}但，但我不能松懈……我，我也要好好侍奉魔王大人……」`,',
      replace:
        '          kojo.魔族化 = 99;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.魔族化 <= 3 || game.kojo.口上开关 === 2)\n        ) {\n          await era.printAndWait(\n            `「唔呣……唔呣……啊啊啊${heart(1)} 魔王大人……舔得人家……太舒服了……${heart(1)}但，但我不能松懈……我，我也要好好侍奉魔王大人……」`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM69 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4628 COM69 非助手爱慕 CFLAG:370 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.魔族化 = 4;\n        } else if (\n          chara(target).system.侍奉精神 >= 3 &&\n          (kojo.魔族化 <= 2 || game.kojo.口上开关 === 2)\n        ) {\n          await era.printAndWait(\n            `「唔呣……唔呣……唔啊啊啊……为，为什么……会这么舒服的……脑子还是下面都……乱七八糟了啊啊！」`,',
      replace:
        '          kojo.魔族化 = 99;\n        } else if (\n          chara(target).system.侍奉精神 >= 3 &&\n          (kojo.魔族化 <= 2 || game.kojo.口上开关 === 2)\n        ) {\n          await era.printAndWait(\n            `「唔呣……唔呣……唔啊啊啊……为，为什么……会这么舒服的……脑子还是下面都……乱七八糟了啊啊！」`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM69 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4629 COM69 非助手侍奉精神 CFLAG:370 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.魔族化 = 3;\n        } else if (kojo.魔族化 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「唔呣……唔呣……？！不，不可以咬那里啊啊啊啊！」`,',
      replace:
        '          kojo.魔族化 = 99;\n        } else if (kojo.魔族化 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「唔呣……唔呣……？！不，不可以咬那里啊啊啊啊！」`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM69 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4630 COM69 非助手其余 CFLAG:370 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.魔族化 = 2;\n        }\n      }\n      return 0;',
      replace:
        '          kojo.魔族化 = 99;\n        }\n      }\n      return 0;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM69 二回目：非助手玛奥四档推进',
    },
  ],
  ...[
    {
      desc: 'M4631 COM124 初次 CFLAG:365 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.深喉 = 1;',
      replace: 'kojo.深喉 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM124 初めて：淫乱、爱慕、侍奉精神与其余四档',
    },
    {
      desc: 'M4632 COM124 助手淫乱 CFLAG:365 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `『哈啊……哈啊${heart(1)} 淫乱的姐姐把人家的小鸡鸡全部吃进去了呢${heart(1)}』`,\n          );\n          // CFLAG:365  = 5（变量语义：CFLAG 族，365）\n          kojo.深喉 = 5;',
      replace:
        '            `『哈啊……哈啊${heart(1)} 淫乱的姐姐把人家的小鸡鸡全部吃进去了呢${heart(1)}』`,\n          );\n          // CFLAG:365  = 5（变量语义：CFLAG 族，365）\n          kojo.深喉 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM124 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4633 COM124 助手爱慕 CFLAG:365 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `『唔哇哇、我会把姐姐的喉咙里射的满满都是精液的${heart(1)} 再，再深一点！』`,\n          );\n          // CFLAG:365  = 4（变量语义：CFLAG 族，365）\n          kojo.深喉 = 4;',
      replace:
        '            `『唔哇哇、我会把姐姐的喉咙里射的满满都是精液的${heart(1)} 再，再深一点！』`,\n          );\n          // CFLAG:365  = 4（变量语义：CFLAG 族，365）\n          kojo.深喉 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM124 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4634 COM124 助手侍奉精神 CFLAG:365 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.深喉 = 3;\n        } else if (kojo.深喉 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「喉，喉咙深处也要吗……呜呜……咕呜……咕呣…！」`);',
      replace:
        '          kojo.深喉 = 99;\n        } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「喉，喉咙深处也要吗……呜呜……咕呜……咕呣…！」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM124 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4635 COM124 助手其余 CFLAG:365 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.深喉 = 2;\n        }\n      } else {',
      replace: '          kojo.深喉 = 99;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM124 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4636 COM124 非助手淫乱 CFLAG:365 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「咕呜……咕呜…${heart(1)} 人家的喉咙小穴……舒服吗${heart(1)} 」`,\n          );\n          // CFLAG:365  = 5（变量语义：CFLAG 族，365）\n          kojo.深喉 = 5;',
      replace:
        '            `「咕呜……咕呜…${heart(1)} 人家的喉咙小穴……舒服吗${heart(1)} 」`,\n          );\n          // CFLAG:365  = 5（变量语义：CFLAG 族，365）\n          kojo.深喉 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM124 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4637 COM124 非助手爱慕 CFLAG:365 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「咕呜……咕呜…${heart(1)} 请${player_name}把精液全部射进喉咙里吧…${heart(1)} 呜呜……咕呜${heart(1)}」`,\n          );\n          // CFLAG:365  = 4（变量语义：CFLAG 族，365）\n          kojo.深喉 = 4;',
      replace:
        '            `「咕呜……咕呜…${heart(1)} 请${player_name}把精液全部射进喉咙里吧…${heart(1)} 呜呜……咕呜${heart(1)}」`,\n          );\n          // CFLAG:365  = 4（变量语义：CFLAG 族，365）\n          kojo.深喉 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM124 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4638 COM124 非助手侍奉精神 CFLAG:365 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.深喉 = 3;\n        } else if (kojo.深喉 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「呜呜……咕呜……整根都……唔呣！」`);',
      replace:
        '          kojo.深喉 = 99;\n        } else if (kojo.真空口交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「呜呜……咕呜……整根都……唔呣！」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM124 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4639 COM124 非助手其余 CFLAG:365 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.深喉 = 2;\n        }\n      }\n      return 0;',
      replace: '          kojo.深喉 = 99;\n        }\n      }\n      return 0;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM124 二回目：非助手玛奥四档推进',
    },
  ],
  ...[
    {
      desc: 'M4641 COM80 初次 CFLAG:381 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.强制口交 = 1;',
      replace: 'kojo.强制口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM80 初めて：淫乱、爱慕、侍奉精神与其余四档',
    },
    {
      desc: 'M4642 COM80 助手淫乱 CFLAG:381 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.强制口交 = 5;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)',
      replace:
        '          kojo.强制口交 = 99;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM80 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4643 COM80 助手爱慕 CFLAG:381 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`『嘴再张大一点，我觉得还能再进去一些呢！』`);\n          await era.printAndWait(\n            `${target_name}在侵犯下，竭尽全力也保持不了呼吸，几乎要窒息过去了……`,\n          );\n          // CFLAG:381  = 4（变量语义：CFLAG 族，381）\n          kojo.强制口交 = 4;',
      replace:
        '          await era.printAndWait(`『嘴再张大一点，我觉得还能再进去一些呢！』`);\n          await era.printAndWait(\n            `${target_name}在侵犯下，竭尽全力也保持不了呼吸，几乎要窒息过去了……`,\n          );\n          // CFLAG:381  = 4（变量语义：CFLAG 族，381）\n          kojo.强制口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM80 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4644 COM80 助手侍奉精神 CFLAG:381 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:381  = 3（变量语义：CFLAG 族，381）\n          kojo.强制口交 = 3;',
      replace:
        '          );\n          // CFLAG:381  = 3（变量语义：CFLAG 族，381）\n          kojo.强制口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM80 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4645 COM80 助手其余 CFLAG:381 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.强制口交 = 2;\n        }\n      } else {',
      replace: '          kojo.强制口交 = 99;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM80 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4646 COM80 非助手淫乱 CFLAG:381 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.强制口交 = 5;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          chara(target).system.侍奉精神 >= 5 &&',
      replace:
        '          kojo.强制口交 = 99;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          chara(target).system.侍奉精神 >= 5 &&',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM80 二回目：非助手玛奥的爱慕档还要求侍奉精神 Lv5',
    },
    {
      desc: 'M4647 COM80 非助手爱慕 CFLAG:381 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          await era.printAndWait(\n            `${target_name}在侵犯下，竭尽全力也保持不了呼吸，几乎要窒息过去了……`,\n          );\n          // CFLAG:381  = 4（变量语义：CFLAG 族，381）\n          kojo.强制口交 = 4;',
      replace:
        '          );\n          await era.printAndWait(\n            `${target_name}在侵犯下，竭尽全力也保持不了呼吸，几乎要窒息过去了……`,\n          );\n          // CFLAG:381  = 4（变量语义：CFLAG 族，381）\n          kojo.强制口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM80 二回目：非助手玛奥的爱慕档还要求侍奉精神 Lv5',
    },
    {
      desc: 'M4648 COM80 非助手侍奉精神 CFLAG:381 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「唔唔……唔呣……要，要死了……呕呕呕！」`);\n          // CFLAG:381  = 3（变量语义：CFLAG 族，381）\n          kojo.强制口交 = 3;',
      replace:
        '          await era.printAndWait(`「唔唔……唔呣……要，要死了……呕呕呕！」`);\n          // CFLAG:381  = 3（变量语义：CFLAG 族，381）\n          kojo.强制口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM80 二回目：非助手玛奥的爱慕档还要求侍奉精神 Lv5',
    },
    {
      desc: 'M4649 COM80 非助手其余 CFLAG:381 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「唔唔……唔呣……已经要，要死了……呕呕呕……」`);\n          // CFLAG:381  = 2（变量语义：CFLAG 族，381）\n          kojo.强制口交 = 2;',
      replace:
        '          await era.printAndWait(`「唔唔……唔呣……已经要，要死了……呕呕呕……」`);\n          // CFLAG:381  = 2（变量语义：CFLAG 族，381）\n          kojo.强制口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM80 二回目：非助手玛奥的爱慕档还要求侍奉精神 Lv5',
    },
  ],
  {
    desc: 'M4650 COM80 非助手爱慕档删除侍奉精神 Lv5 门槛（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          chara(target).system.侍奉精神 >= 5 &&\n          (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)\n        ) {',
    replace:
      '        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)\n        ) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM80 二回目：非助手玛奥的爱慕档还要求侍奉精神 Lv5',
  },
  ...[
    {
      desc: 'M4651 COM87 初次 CFLAG:348 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.穿环 = 1;',
      replace: 'kojo.穿环 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM87 初めて：七种穿环部位的装上与取下分支均推进到 1',
    },
    {
      desc: 'M4652 COM87 淫乱 CFLAG:348 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.穿环 = 4;',
      replace: 'kojo.穿环 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM87 二回目：三档遍历七种部位的装上与取下分支',
    },
    {
      desc: 'M4653 COM87 爱慕 CFLAG:348 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.穿环 = 3;',
      replace: 'kojo.穿环 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM87 二回目：三档遍历七种部位的装上与取下分支',
    },
    {
      desc: 'M4654 COM87 其余 CFLAG:348 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.穿环 = 2;',
      replace: 'kojo.穿环 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM87 二回目：三档遍历七种部位的装上与取下分支',
    },
  ],
  ...[
    {
      desc: 'M4655 COM87 首次淫乱穿环部位 P=1 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`第一次穿孔让${target_name}忍不住呻吟了出来`);\n\n          if (p === 1) {',
      replace:
        '          await era.printAndWait(`第一次穿孔让${target_name}忍不住呻吟了出来`);\n\n          if (p === 99) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM87 初めて：七种穿环部位的装上与取下分支均推进到 1',
    },
    {
      desc: 'M4656 COM87 首次淫乱穿环部位 P=2 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              await era.printAndWait(`『很适合你的淫乱大胸部哦姐姐！』`);\n              await era.printAndWait(`「是，是吗……谢谢${heart(1)}」`);\n              await era.printAndWait(\n                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,\n              );\n            } else {\n              await era.printAndWait(\n                `「哈……哈啊……可以用这个拉着乳头${heart(1)} 好像会很舒服的样子……♪」`,\n              );\n              await era.printAndWait(\n                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,\n              );\n            }\n          } else if (p === 2) {',
      replace:
        '              await era.printAndWait(`『很适合你的淫乱大胸部哦姐姐！』`);\n              await era.printAndWait(`「是，是吗……谢谢${heart(1)}」`);\n              await era.printAndWait(\n                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,\n              );\n            } else {\n              await era.printAndWait(\n                `「哈……哈啊……可以用这个拉着乳头${heart(1)} 好像会很舒服的样子……♪」`,\n              );\n              await era.printAndWait(\n                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,\n              );\n            }\n          } else if (p === 99) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM87 初めて：七种穿环部位的装上与取下分支均推进到 1',
    },
    {
      desc: 'M4657 COM87 首次淫乱穿环部位 P=4 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              await era.printAndWait(`『很适合你的淫乱大胸部哦姐姐！』`);\n              await era.printAndWait(`「是，是吗……谢谢${heart(1)}」`);\n              await era.printAndWait(\n                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,\n              );\n            } else {\n              await era.printAndWait(\n                `「哈……哈啊……可以用这个拉着乳头${heart(1)} 好像会很舒服的样子……♪」`,\n              );\n              await era.printAndWait(\n                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,\n              );\n            }\n          } else if (p === 2) {\n            if (assi_mao) {\n              await era.printAndWait(`『哎哎，姐姐看上去好可爱${heart(1)}』`);\n              await era.printAndWait(\n                `「是，是吗……你要不要也穿一个呢、${player_name}？」`,\n              );\n              await era.printAndWait(\n                `${target_name}的肚脐上穿入了闪闪发光的银环……`,\n              );\n            } else {\n              await era.printAndWait(`「呜哇，这个环好漂亮……」`);\n              await era.printAndWait(\n                `${target_name}的肚脐上穿入了闪闪发光的银环……`,\n              );\n            }\n          } else if (p === 4) {',
      replace:
        '              await era.printAndWait(`『很适合你的淫乱大胸部哦姐姐！』`);\n              await era.printAndWait(`「是，是吗……谢谢${heart(1)}」`);\n              await era.printAndWait(\n                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,\n              );\n            } else {\n              await era.printAndWait(\n                `「哈……哈啊……可以用这个拉着乳头${heart(1)} 好像会很舒服的样子……♪」`,\n              );\n              await era.printAndWait(\n                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,\n              );\n            }\n          } else if (p === 2) {\n            if (assi_mao) {\n              await era.printAndWait(`『哎哎，姐姐看上去好可爱${heart(1)}』`);\n              await era.printAndWait(\n                `「是，是吗……你要不要也穿一个呢、${player_name}？」`,\n              );\n              await era.printAndWait(\n                `${target_name}的肚脐上穿入了闪闪发光的银环……`,\n              );\n            } else {\n              await era.printAndWait(`「呜哇，这个环好漂亮……」`);\n              await era.printAndWait(\n                `${target_name}的肚脐上穿入了闪闪发光的银环……`,\n              );\n            }\n          } else if (p ===99) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM87 初めて：七种穿环部位的装上与取下分支均推进到 1',
    },
    {
      desc: 'M4658 COM87 首次淫乱穿环部位 P=8 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              await era.printAndWait(`『很适合你的淫乱大胸部哦姐姐！』`);\n              await era.printAndWait(`「是，是吗……谢谢${heart(1)}」`);\n              await era.printAndWait(\n                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,\n              );\n            } else {\n              await era.printAndWait(\n                `「哈……哈啊……可以用这个拉着乳头${heart(1)} 好像会很舒服的样子……♪」`,\n              );\n              await era.printAndWait(\n                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,\n              );\n            }\n          } else if (p === 2) {\n            if (assi_mao) {\n              await era.printAndWait(`『哎哎，姐姐看上去好可爱${heart(1)}』`);\n              await era.printAndWait(\n                `「是，是吗……你要不要也穿一个呢、${player_name}？」`,\n              );\n              await era.printAndWait(\n                `${target_name}的肚脐上穿入了闪闪发光的银环……`,\n              );\n            } else {\n              await era.printAndWait(`「呜哇，这个环好漂亮……」`);\n              await era.printAndWait(\n                `${target_name}的肚脐上穿入了闪闪发光的银环……`,\n              );\n            }\n          } else if (p === 4) {\n            if (assi_mao) {\n              await era.printAndWait(\n                `『哇哇，姐姐很适合穿环啊，小穴穿上环之后更漂亮了呢♪』`,\n              );\n              await era.printAndWait(\n                `「嗯嗯，谢谢${player_name}、阿啦，魔王大人也来看看？」`,\n              );\n              await era.printAndWait(\n                `${target_name}用手指分开自己的蜜穴，对你展示着上面的银环……`,\n              );\n            } else {\n              await era.printAndWait(`「下面穿上银环之后……好像更好看了…？」`);\n              await era.printAndWait(\n                `${target_name}用手指分开自己的蜜穴，对你展示着上面的银环……`,\n              );\n            }\n          } else if (p === 8) {',
      replace:
        '              await era.printAndWait(`『很适合你的淫乱大胸部哦姐姐！』`);\n              await era.printAndWait(`「是，是吗……谢谢${heart(1)}」`);\n              await era.printAndWait(\n                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,\n              );\n            } else {\n              await era.printAndWait(\n                `「哈……哈啊……可以用这个拉着乳头${heart(1)} 好像会很舒服的样子……♪」`,\n              );\n              await era.printAndWait(\n                `${target_name}挺立的乳头上插入了闪闪发光的银环………`,\n              );\n            }\n          } else if (p === 2) {\n            if (assi_mao) {\n              await era.printAndWait(`『哎哎，姐姐看上去好可爱${heart(1)}』`);\n              await era.printAndWait(\n                `「是，是吗……你要不要也穿一个呢、${player_name}？」`,\n              );\n              await era.printAndWait(\n                `${target_name}的肚脐上穿入了闪闪发光的银环……`,\n              );\n            } else {\n              await era.printAndWait(`「呜哇，这个环好漂亮……」`);\n              await era.printAndWait(\n                `${target_name}的肚脐上穿入了闪闪发光的银环……`,\n              );\n            }\n          } else if (p === 4) {\n            if (assi_mao) {\n              await era.printAndWait(\n                `『哇哇，姐姐很适合穿环啊，小穴穿上环之后更漂亮了呢♪』`,\n              );\n              await era.printAndWait(\n                `「嗯嗯，谢谢${player_name}、阿啦，魔王大人也来看看？」`,\n              );\n              await era.printAndWait(\n                `${target_name}用手指分开自己的蜜穴，对你展示着上面的银环……`,\n              );\n            } else {\n              await era.printAndWait(`「下面穿上银环之后……好像更好看了…？」`);\n              await era.printAndWait(\n                `${target_name}用手指分开自己的蜜穴，对你展示着上面的银环……`,\n              );\n            }\n          } else if (p ===99) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM87 初めて：七种穿环部位的装上与取下分支均推进到 1',
    },
    {
      desc: 'M4659 COM87 首次淫乱穿环部位 P=16 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          } else if (p === 16) {\n            if (assi_mao) {\n              await era.printAndWait(`『嘿嘿，姐姐舌头上也有位置呢♪』`);\n              await era.printAndWait(`「啊……还真的有点想试一下呢${heart(1)}」`);\n              await era.printAndWait(\n                `${target_name}被打了银钉的舌尖轻轻舔着嘴唇………`,\n              );\n            } else {\n              await era.printAndWait(\n                `「嘻嘻，以后再舌吻好像会很舒服呢${heart(1)}」`,\n              );\n              await era.printAndWait(\n                `${target_name}被打了银钉的舌尖轻轻舔着嘴唇………`,\n              );\n            }\n          } else if (p === 32) {\n            if (assi_mao) {\n              await era.printAndWait(`『啦啦，姐姐来亲亲吧…』`);\n              await era.printAndWait(`「呣呣……还要继续吗？」`);\n              await era.printAndWait(\n                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,\n              );\n            } else {\n              await era.printAndWait(`「呣呣，好像挺合适的？」`);\n              await era.printAndWait(\n                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,\n              );\n            }\n          } else if (p === 64) {\n            if (assi_mao) {\n              await era.printAndWait(\n                `『嘿嘿嘿，在这里穿上环，姐姐就真的变成母牛了呢』`,\n              );\n              await era.printAndWait(`「就，就是这样呢♪」`);\n              await era.printAndWait(\n                `${target_name}欣赏着自己鼻翼上穿着的银环……`,\n              );\n            } else {\n              await era.printAndWait(`「意外的好看呢♪」`);\n              await era.printAndWait(\n                `${target_name}欣赏着自己鼻翼上穿着的银环……`,\n              );\n            }\n          }\n        } else {\n          await era.printAndWait(\n            `${target_name}轻轻地擦拭着穿环处留下的血迹……`,\n          );\n        }\n      } else if (era.get(`talent:${target}:85`) === 1) {',
      replace:
        '          } else if (p ===99) {\n            if (assi_mao) {\n              await era.printAndWait(`『嘿嘿，姐姐舌头上也有位置呢♪』`);\n              await era.printAndWait(`「啊……还真的有点想试一下呢${heart(1)}」`);\n              await era.printAndWait(\n                `${target_name}被打了银钉的舌尖轻轻舔着嘴唇………`,\n              );\n            } else {\n              await era.printAndWait(\n                `「嘻嘻，以后再舌吻好像会很舒服呢${heart(1)}」`,\n              );\n              await era.printAndWait(\n                `${target_name}被打了银钉的舌尖轻轻舔着嘴唇………`,\n              );\n            }\n          } else if (p === 32) {\n            if (assi_mao) {\n              await era.printAndWait(`『啦啦，姐姐来亲亲吧…』`);\n              await era.printAndWait(`「呣呣……还要继续吗？」`);\n              await era.printAndWait(\n                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,\n              );\n            } else {\n              await era.printAndWait(`「呣呣，好像挺合适的？」`);\n              await era.printAndWait(\n                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,\n              );\n            }\n          } else if (p === 64) {\n            if (assi_mao) {\n              await era.printAndWait(\n                `『嘿嘿嘿，在这里穿上环，姐姐就真的变成母牛了呢』`,\n              );\n              await era.printAndWait(`「就，就是这样呢♪」`);\n              await era.printAndWait(\n                `${target_name}欣赏着自己鼻翼上穿着的银环……`,\n              );\n            } else {\n              await era.printAndWait(`「意外的好看呢♪」`);\n              await era.printAndWait(\n                `${target_name}欣赏着自己鼻翼上穿着的银环……`,\n              );\n            }\n          }\n        } else {\n          await era.printAndWait(\n            `${target_name}轻轻地擦拭着穿环处留下的血迹……`,\n          );\n        }\n      } else if (era.get(`talent:${target}:85`) === 1) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM87 初めて：七种穿环部位的装上与取下分支均推进到 1',
    },
    {
      desc: 'M4660 COM87 首次淫乱穿环部位 P=32 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          } else if (p === 32) {\n            if (assi_mao) {\n              await era.printAndWait(`『啦啦，姐姐来亲亲吧…』`);\n              await era.printAndWait(`「呣呣……还要继续吗？」`);\n              await era.printAndWait(\n                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,\n              );\n            } else {\n              await era.printAndWait(`「呣呣，好像挺合适的？」`);\n              await era.printAndWait(\n                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,\n              );\n            }\n          } else if (p === 64) {\n            if (assi_mao) {\n              await era.printAndWait(\n                `『嘿嘿嘿，在这里穿上环，姐姐就真的变成母牛了呢』`,\n              );\n              await era.printAndWait(`「就，就是这样呢♪」`);\n              await era.printAndWait(\n                `${target_name}欣赏着自己鼻翼上穿着的银环……`,\n              );\n            } else {\n              await era.printAndWait(`「意外的好看呢♪」`);\n              await era.printAndWait(\n                `${target_name}欣赏着自己鼻翼上穿着的银环……`,\n              );\n            }\n          }\n        } else {\n          await era.printAndWait(\n            `${target_name}轻轻地擦拭着穿环处留下的血迹……`,\n          );\n        }\n      } else if (era.get(`talent:${target}:85`) === 1) {',
      replace:
        '          } else if (p ===99) {\n            if (assi_mao) {\n              await era.printAndWait(`『啦啦，姐姐来亲亲吧…』`);\n              await era.printAndWait(`「呣呣……还要继续吗？」`);\n              await era.printAndWait(\n                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,\n              );\n            } else {\n              await era.printAndWait(`「呣呣，好像挺合适的？」`);\n              await era.printAndWait(\n                `${target_name}娇嫩嘴唇上的银环在闪闪发亮…`,\n              );\n            }\n          } else if (p === 64) {\n            if (assi_mao) {\n              await era.printAndWait(\n                `『嘿嘿嘿，在这里穿上环，姐姐就真的变成母牛了呢』`,\n              );\n              await era.printAndWait(`「就，就是这样呢♪」`);\n              await era.printAndWait(\n                `${target_name}欣赏着自己鼻翼上穿着的银环……`,\n              );\n            } else {\n              await era.printAndWait(`「意外的好看呢♪」`);\n              await era.printAndWait(\n                `${target_name}欣赏着自己鼻翼上穿着的银环……`,\n              );\n            }\n          }\n        } else {\n          await era.printAndWait(\n            `${target_name}轻轻地擦拭着穿环处留下的血迹……`,\n          );\n        }\n      } else if (era.get(`talent:${target}:85`) === 1) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM87 初めて：七种穿环部位的装上与取下分支均推进到 1',
    },
    {
      desc: 'M4661 COM87 首次淫乱穿环部位 P=64 写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          } else if (p === 64) {\n            if (assi_mao) {\n              await era.printAndWait(\n                `『嘿嘿嘿，在这里穿上环，姐姐就真的变成母牛了呢』`,\n              );\n              await era.printAndWait(`「就，就是这样呢♪」`);\n              await era.printAndWait(\n                `${target_name}欣赏着自己鼻翼上穿着的银环……`,\n              );\n            } else {\n              await era.printAndWait(`「意外的好看呢♪」`);\n              await era.printAndWait(\n                `${target_name}欣赏着自己鼻翼上穿着的银环……`,\n              );\n            }\n          }\n        } else {\n          await era.printAndWait(\n            `${target_name}轻轻地擦拭着穿环处留下的血迹……`,\n          );\n        }\n      } else if (era.get(`talent:${target}:85`) === 1) {',
      replace:
        '          } else if (p ===99) {\n            if (assi_mao) {\n              await era.printAndWait(\n                `『嘿嘿嘿，在这里穿上环，姐姐就真的变成母牛了呢』`,\n              );\n              await era.printAndWait(`「就，就是这样呢♪」`);\n              await era.printAndWait(\n                `${target_name}欣赏着自己鼻翼上穿着的银环……`,\n              );\n            } else {\n              await era.printAndWait(`「意外的好看呢♪」`);\n              await era.printAndWait(\n                `${target_name}欣赏着自己鼻翼上穿着的银环……`,\n              );\n            }\n          }\n        } else {\n          await era.printAndWait(\n            `${target_name}轻轻地擦拭着穿环处留下的血迹……`,\n          );\n        }\n      } else if (era.get(`talent:${target}:85`) === 1) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM87 初めて：七种穿环部位的装上与取下分支均推进到 1',
    },
  ],
  {
    desc: 'M4662 COM87 不再读取 COM111 写入的穿环位掩码 P（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    const p = piercing_state.p; // COM111 穿环着脱写入的跨模块位掩码 P',
    replace: '    const p = 0; // 变异：丢弃跨模块穿环位掩码 P',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM87 初めて：七种穿环部位的装上与取下分支均推进到 1',
  },
  {
    desc: 'M4663 DOG_KOJO_11 分发被删除（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    return dog_kojo_11(rand_n);',
    replace: '    return 0; // 变异：删除兽奸专用口上分发',
    tests: ['kojo-k11-lily'],
    must_mention: '兽奸中改走 DOG_KOJO_11 真身',
  },
  ...[
    {
      desc: 'M4664 DOG_KOJO_11 爱抚首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 1;',
      replace:
        '      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '十三个 SELECTCOM 首次状态均推进到 1',
    },
    {
      desc: 'M4665 DOG_KOJO_11 舔阴首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      // CFLAG:302  = 1（变量语义：CFLAG 族，302）\n      kojo.舔阴 = 1;',
      replace:
        '      // CFLAG:302  = 1（变量语义：CFLAG 族，302）\n      kojo.舔阴 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '十三个 SELECTCOM 首次状态均推进到 1',
    },
    {
      desc: 'M4666 DOG_KOJO_11 胸爱抚首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）\n      kojo.胸爱抚 = 1;',
      replace:
        '      // CFLAG:TARGET:306  = 1（变量语义：CFLAG 族，TARGET:306）\n      kojo.胸爱抚 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '十三个 SELECTCOM 首次状态均推进到 1',
    },
    {
      desc: 'M4667 DOG_KOJO_11 接吻首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.接吻 = 1;\n      return 0;\n    } else if (kojo.接吻 === 0) {',
      replace:
        '      kojo.接吻 = 99;\n      return 0;\n    } else if (kojo.接吻 === 0) {',
      tests: ['kojo-k11-lily'],
      must_mention: '接吻首吻与普通首次两条入口都推进 CFLAG:307',
    },
    {
      desc: 'M4668 DOG_KOJO_11 接吻首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.接吻 = 1;\n      return 0;\n    } else {',
      replace: '      kojo.接吻 = 99;\n      return 0;\n    } else {',
      tests: ['kojo-k11-lily'],
      must_mention: '接吻首吻与普通首次两条入口都推进 CFLAG:307',
    },
    {
      desc: 'M4669 DOG_KOJO_11 舔肛首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）\n      kojo.舔肛 = 1;',
      replace:
        '      // CFLAG:TARGET:310  = 1（变量语义：CFLAG 族，TARGET:310）\n      kojo.舔肛 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '十三个 SELECTCOM 首次状态均推进到 1',
    },
    {
      desc: 'M4670 DOG_KOJO_11 背后位首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      // CFLAG:322  = 1（变量语义：CFLAG 族，322）\n      kojo.背后位 = 1;',
      replace:
        '      // CFLAG:322  = 1（变量语义：CFLAG 族，322）\n      kojo.背后位 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '十三个 SELECTCOM 首次状态均推进到 1',
    },
    {
      desc: 'M4671 DOG_KOJO_11 背后位肛交首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）\n      kojo.背后位肛交 = 1;',
      replace:
        '      // CFLAG:TARGET:328  = 1（变量语义：CFLAG 族，TARGET:328）\n      kojo.背后位肛交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '十三个 SELECTCOM 首次状态均推进到 1',
    },
    {
      desc: 'M4672 DOG_KOJO_11 手淫首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: "        await era.printAndWait('');\n      }\n      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）\n      kojo.手淫 = 1;",
      replace:
        "        await era.printAndWait('');\n      }\n      // CFLAG:TARGET:331  = 1（变量语义：CFLAG 族，TARGET:331）\n      kojo.手淫 = 99;",
      tests: ['kojo-k11-lily'],
      must_mention: '十三个 SELECTCOM 首次状态均推进到 1',
    },
    {
      desc: 'M4673 DOG_KOJO_11 口交_奴首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: "        await era.printAndWait('');\n      }\n      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）\n      kojo.口交_奴 = 1;",
      replace:
        "        await era.printAndWait('');\n      }\n      // CFLAG:TARGET:332  = 1（变量语义：CFLAG 族，TARGET:332）\n      kojo.口交_奴 = 99;",
      tests: ['kojo-k11-lily'],
      must_mention: '十三个 SELECTCOM 首次状态均推进到 1',
    },
    {
      desc: 'M4674 DOG_KOJO_11 骑乘位首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.骑乘位 = 1;\n      return 0;\n    } else {\n      if (\n        era.get(`talent:${target}:136`) === 1 &&',
      replace:
        '      kojo.骑乘位 =99;\n      return 0;\n    } else {\n      if (\n        era.get(`talent:${target}:136`) === 1 &&',
      tests: ['kojo-k11-lily'],
      must_mention: '十三个 SELECTCOM 首次状态均推进到 1',
    },
    {
      desc: 'M4675 DOG_KOJO_11 肛门侍奉首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: "        await era.printAndWait('');\n      }\n      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）\n      kojo.肛门侍奉 = 1;",
      replace:
        "        await era.printAndWait('');\n      }\n      // CFLAG:TARGET:338  = 1（变量语义：CFLAG 族，TARGET:338）\n      kojo.肛门侍奉 = 99;",
      tests: ['kojo-k11-lily'],
      must_mention: '十三个 SELECTCOM 首次状态均推进到 1',
    },
    {
      desc: 'M4676 DOG_KOJO_11 眼罩首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: "        await era.printAndWait('');\n      }\n      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）\n      kojo.眼罩 = 1;",
      replace:
        "        await era.printAndWait('');\n      }\n      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）\n      kojo.眼罩 = 99;",
      tests: ['kojo-k11-lily'],
      must_mention: '十三个 SELECTCOM 首次状态均推进到 1',
    },
    {
      desc: 'M4677 DOG_KOJO_11 交谈首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.交谈 = 1;\n      return 0;\n    } else {\n      if (era.get(`tequip:${target}:53`)) {',
      replace:
        '      kojo.交谈 = 99;\n      return 0;\n    } else {\n      if (era.get(`tequip:${target}:53`)) {',
      tests: ['kojo-k11-lily'],
      must_mention: '十三个 SELECTCOM 首次状态均推进到 1',
    },
  ],
  ...[
    {
      desc: 'M4678 DOG_KOJO_11 爱抚后续高档写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.爱抚 = 7;',
      replace: 'kojo.爱抚 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '牝犬与复合素质的后续高档推进',
    },
    {
      desc: 'M4679 DOG_KOJO_11 背后位后续高档写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.背后位 = 7;',
      replace: 'kojo.背后位 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '牝犬与复合素质的后续高档推进',
    },
    {
      desc: 'M4680 DOG_KOJO_11 背后位肛交后续高档写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.背后位肛交 = 7;\n      } else if (',
      replace: '        kojo.背后位肛交 = 99;\n      } else if (',
      tests: ['kojo-k11-lily'],
      must_mention: '牝犬与复合素质的后续高档推进',
    },
    {
      desc: 'M4681 DOG_KOJO_11 手淫后续高档写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.手淫 = 7;',
      replace: 'kojo.手淫 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '牝犬与复合素质的后续高档推进',
    },
    {
      desc: 'M4682 DOG_KOJO_11 口交_奴后续高档写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.口交_奴 = 4;\n      } else if (',
      replace: '        kojo.口交_奴 = 99;\n      } else if (',
      tests: ['kojo-k11-lily'],
      must_mention: '牝犬与复合素质的后续高档推进',
    },
    {
      desc: 'M4683 DOG_KOJO_11 肛门侍奉后续高档写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.肛门侍奉 = 6;',
      replace: 'kojo.肛门侍奉 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '牝犬与复合素质的后续高档推进',
    },
    {
      desc: 'M4684 DOG_KOJO_11 兽奸眼罩后续高档写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.兽奸眼罩 = 4;',
      replace: 'kojo.兽奸眼罩 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '眼罩着脱各档条件读 CFLAG:444 自身',
    },
    {
      desc: 'M4685 DOG_KOJO_11 交谈后续高档写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.交谈 = 5;',
      replace: 'kojo.交谈 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '录像交谈后续牝犬档推进 CFLAG:357=5',
    },
  ],
  ...[
    {
      desc: 'M4702 SELF_KOJO_K11 调教后自慰首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.调教后自慰 = 1;',
      replace: 'kojo.调教后自慰 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'TFLAG:13=1 推进 CFLAG:261',
    },
    {
      desc: 'M4703 SELF_KOJO_K11 百合PLAY首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.百合PLAY = 1;',
      replace: 'kojo.百合PLAY = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'TFLAG:13=2 推进 CFLAG:262',
    },
    {
      desc: 'M4704 SELF_KOJO_K11 朝口交首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.朝口交 = 1;',
      replace: 'kojo.朝口交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'TFLAG:13=3 推进 CFLAG:263',
    },
    {
      desc: 'M4705 SELF_KOJO_K11 调教后性交首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.调教后性交 = 1;',
      replace: 'kojo.调教后性交 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'TFLAG:13=4 推进 CFLAG:264',
    },
    {
      desc: 'M4706 SELF_KOJO_K11 夜袭首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.夜袭 = 1;',
      replace: 'kojo.夜袭 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'TFLAG:13=5 推进 CFLAG:265',
    },
    {
      desc: 'M4707 SELF_KOJO_K11 妊娠发觉首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.妊娠发觉 = 1;\n    } else {',
      replace: '      kojo.妊娠发觉 = 99;\n    } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'TFLAG:13=11 推进 CFLAG:271',
    },
    {
      desc: 'M4708 SELF_KOJO_K11 生产首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.生产 = 1;\n    } else {',
      replace: '      kojo.生产 = 99;\n    } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'TFLAG:13=12 推进 CFLAG:272',
    },
    {
      desc: 'M4709 SELF_KOJO_K11 育儿室首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.育儿室 = 1;',
      replace: 'kojo.育儿室 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'TFLAG:13=13 推进 CFLAG:273',
    },
    {
      desc: 'M4710 SELF_KOJO_K11 亲离首次状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.亲离 = 1;',
      replace: 'kojo.亲离 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: 'TFLAG:13=14 推进 CFLAG:274',
    },
  ],
  {
    desc: 'M4711 SELF_KOJO_K11 夜袭 F=1 分支错位（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      if (f === 1) {',
    replace: '      if (f === 2) {\n        // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: '夜袭按单字母全局 F 选择蜜穴或肛门',
  },
  {
    desc: 'M4712 SELF_KOJO_K11 中出次数三回门槛改为四回（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      if (s >= 3) {',
    replace: '      if (s >= 4) {\n        // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: '调教后性交读取 aftertrain 的 S',
  },
  {
    desc: 'M4713 SELF_KOJO_K11 结束不清 TFLAG:13（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  game.train.初吻与自我口上 = 0;',
    replace: '  game.train.初吻与自我口上 = 1; // （变异）',
    tests: ['kojo-k11-lily'],
    must_mention: '并清 TFLAG:13',
  },
  ...[
    [
      4714,
      'ryouzyoku_kojo_family',
      'dungeon_ryouzyoku_k11',
      '迷宫凌辱前后口上注册进两个分发族',
    ],
    [
      4715,
      'ryouzyoku_after_kojo_family',
      'dungeon_ryouzyoku_after_k11',
      '迷宫凌辱前后口上注册进两个分发族',
    ],
    [
      4716,
      'benki_koujo_family',
      'benki_koujo_k11',
      '肉便器、胜利与攻击口上注册进各自分发族',
    ],
    [
      4717,
      'dungeon_victory_family',
      'dungeon_victory_k11',
      '肉便器、胜利与攻击口上注册进各自分发族',
    ],
    [
      4718,
      'dungeon_attack_family',
      'dungeon_attack_k11',
      '肉便器、胜利与攻击口上注册进各自分发族',
    ],
  ].map(([id, family, , must_mention]) => ({
    desc: `M${id} K11 ${family} 注册号错位（#242）`,
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `${family}.register(11, (...args) =>`,
    replace: `${family}.register(12, (...args) =>`,
    tests: ['kojo-k11-lily'],
    must_mention,
  })),
  {
    desc: 'M4719 K11 胜利口上首个 RAND:3 分支失效（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  if (random(3) === 0) {\n    await era.printAndWait(`「哈，这就……胜利了？」`);',
    replace:
      '  if (random(3) === 9) {\n    // 变异\n    await era.printAndWait(`「哈，这就……胜利了？」`);',
    tests: ['kojo-k11-lily'],
    must_mention: '肉便器、胜利与攻击口上注册进各自分发族',
  },
  {
    desc: 'M4720 K11 攻击口上迎击状态条件错位（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  if (chara(target).invasion.状态 === 2) {',
    replace: '  if (chara(target).invasion.状态 === 3) {\n    // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: '肉便器、胜利与攻击口上注册进各自分发族',
  },
  {
    desc: 'M4722 K11 NTR P=4 场景记录错位（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    chara(target).kojo.NTR_654 = 1; // CFLAG:654',
    replace: '    chara(target).kojo.NTR_655 = 1; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'NTR P=1-7',
  },
  {
    desc: 'M4723 K11 NTR 假阳具条件漏掉 FLAG:500==2（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  const king_has_penis =\n    game.system.狂王性别 === 0 || game.system.狂王性别 === 2;',
    replace:
      '  const king_has_penis =\n    game.system.狂王性别 === 0 || game.system.狂王性别 === 9; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'FLAG:500 在肉棒与假阳具称呼间分岔',
  },
  {
    desc: 'M4724 K11 NTR 公开生育妊娠相手条件错位（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      if (chara(target).event.妊娠相手 === 1) {',
    replace: '      if (chara(target).event.妊娠相手 === 2) { // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: '按妊娠相手区分魔王之子',
  },
  ...[
    [4725, 'exucution_koujo_family', 'exucution_koujo_k11'],
    [4726, 'museum_koujo_family', 'museum_koujo_k11'],
    [4727, 'banishment_koujo_family', 'banishment_koujo_k11'],
    [4728, 'public_exucution_koujo_family', 'public_exucution_koujo_k11'],
    [4729, 'grotesque_koujo_family', 'grotesque_koujo_k11'],
  ].map(([id, family]) => ({
    desc: `M${id} K11 ${family} 注册号错位（#242）`,
    file: 'ere/kojo/kojo-k11-lily.js',
    // 行首的换行是必需的：public_exucution_koujo_family 的名字以
    // exucution_koujo_family 结尾，不带行界会命中两处
    find: `\n${family}.register(11, (...args) =>`,
    replace: `\n${family}.register(12, (...args) =>`,
    tests: ['kojo-k11-lily'],
    must_mention: '处刑、博物馆、放逐、公开处刑与猎奇族均注册',
  })),
  {
    desc: 'M4731 K11 ENTERENEMY 淫乱条件错位（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  if (era0(`talent:${a}:76`) === 1) {',
    replace: '  if (era0(`talent:${a}:76`) === 9) { // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'ENTERENEMY：淫乱、爱慕与寻妹三档',
  },
  {
    desc: 'M4733 K11 GOHOUBI_REQUEST 兽种映射错位（#242；#600 起目标改成拼接行前的映射表）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: "    const animal = ['', '狗', '猪', '马'][request];",
    replace: "    const animal = ['', '猪', '狗', '马'][request]; // 变异",
    tests: ['kojo-k11-lily'],
    must_mention: 'GOHOUBI_REQUEST：十种要求',
  },
  {
    desc: 'M4734 K11 GOHOUBI_AFTER choice 2 被跳过（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    (choice === 2 && request >= 0 && request <= 9)',
    replace: '    (choice === 3 && request >= 0 && request <= 9)',
    tests: ['kojo-k11-lily'],
    must_mention: 'GOHOUBI_AFTER 与 OSIOKI',
  },
  {
    desc: 'M4735 K11 OSIOKI choice 6 输出被跳过（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: "  if (choice === 6 || choice === 7) {\n    await era.print('');\n  } else if (choice >= 0 && choice <= 9) {",
    replace:
      "  if (choice === 16 || choice === 7) {\n    await era.print('');\n  } else if (choice >= 0 && choice <= 9 && choice !== 6) { // 变异",
    tests: ['kojo-k11-lily'],
    must_mention: 'GOHOUBI_AFTER 与 OSIOKI',
  },
  {
    desc: 'M4736 K11 AEGI arg=0 默认段数少一段（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  const count = (arg === 0 ? 2 : arg) + random(2);',
    replace: '  const count = (arg === 0 ? 1 : arg) + random(2); // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: 'arg=0 改为两段',
  },
  {
    desc: 'M4737 K11 AEGI 阴道与肛门词库对调（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: "    args === '膣' ? VAGINAL_MOANS : args === '肛门' ? ANAL_MOANS : null;",
    replace:
      "    args === '膣' ? ANAL_MOANS : args === '肛门' ? VAGINAL_MOANS : null; // 变异",
    tests: ['kojo-k11-lily'],
    must_mention: '阴道与肛门词库按 RAND:56',
  },
  {
    desc: 'M4738 K11 AEGI 词库随机上界少一项（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    result += moans[random(56)];',
    replace: '    result += moans[random(55)]; // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: '阴道与肛门词库按 RAND:56',
  },
  {
    desc: 'M4739 K11 AEGI 爱慕未进入沦陷连接符分档（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  const fallen =\n    era0(`talent:${era_flag.target}:85`) ||\n    era0(`talent:${era_flag.target}:76`);',
    replace:
      '  const fallen =\n    era0(`talent:${era_flag.target}:185`) ||\n    era0(`talent:${era_flag.target}:76`); // 变异',
    tests: ['kojo-k11-lily'],
    must_mention: '爱慕/淫乱使用心形连接',
  },
  {
    desc: 'M4740 K11 AEGI 沦陷最终心形结尾错位（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: "      result += ['♪', heart(1), '！'][random(3)];",
    replace: "      result += ['♪', '！', heart(1)][random(3)]; // 变异",
    tests: ['kojo-k11-lily'],
    must_mention: '爱慕/淫乱使用心形连接',
  },
  {
    desc: 'M4686 PALAMCNG_11 非玛奥助手检查被删除（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: "      : '阴茎';\n  void rand;\n\n  if (era_flag.assi > 0 && era_flag.assiplay && era_flag.assi !== 17) {",
    replace:
      "      : '阴茎';\n  void rand;\n\n  if (false) {\n    // 变异：删除非玛奥助手检查",
    tests: ['kojo-k11-lily'],
    must_mention: '非玛奥助手参与调教时整段静默跳过',
  },
  {
    desc: 'M4687 PALAMCNG_11 润滑首超严格大于改为大于等于（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  if (p1 > PALAMLV[2] && kojo.首次润滑Lv2 === 0) {',
    replace: '  if (p1 >= PALAMLV[2] && kojo.首次润滑Lv2 === 0) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'PALAM+UP 恰等于 Lv2 时不触发首超',
  },
  ...[
    {
      desc: 'M4688 PALAMCNG_11 首次润滑Lv2状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.首次润滑Lv2 = 1;',
      replace: 'kojo.首次润滑Lv2 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '四类参数首超由 PALAM+UP 严格越过 Lv2',
    },
    {
      desc: 'M4689 PALAMCNG_11 首次欲情Lv2状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.首次欲情Lv2 = 1;',
      replace: 'kojo.首次欲情Lv2 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '四类参数首超由 PALAM+UP 严格越过 Lv2',
    },
    {
      desc: 'M4690 PALAMCNG_11 首次耻情Lv2状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.首次耻情Lv2 = 1;',
      replace: 'kojo.首次耻情Lv2 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '四类参数首超由 PALAM+UP 严格越过 Lv2',
    },
    {
      desc: 'M4691 PALAMCNG_11 首次恐怖Lv2状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.首次恐怖Lv2 = 1;',
      replace: 'kojo.首次恐怖Lv2 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '四类参数首超由 PALAM+UP 严格越过 Lv2',
    },
    {
      desc: 'M4692 PALAMCNG_11 首次C绝顶状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.首次C绝顶 = 1;',
      replace: 'kojo.首次C绝顶 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '四类首次绝顶分别推进 CFLAG:225-228',
    },
    {
      desc: 'M4693 PALAMCNG_11 首次V绝顶状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.首次V绝顶 = 1;',
      replace: 'kojo.首次V绝顶 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '四类首次绝顶分别推进 CFLAG:225-228',
    },
    {
      desc: 'M4694 PALAMCNG_11 首次A绝顶状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.首次A绝顶 = 1;',
      replace: 'kojo.首次A绝顶 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '四类首次绝顶分别推进 CFLAG:225-228',
    },
    {
      desc: 'M4695 PALAMCNG_11 首次B绝顶状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.首次B绝顶 = 1;',
      replace: 'kojo.首次B绝顶 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '四类首次绝顶分别推进 CFLAG:225-228',
    },
    {
      desc: 'M4696 PALAMCNG_11 处女丧失状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.处女丧失 = 1;',
      replace: 'kojo.处女丧失 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '处女丧失累计 UP11+UP12',
    },
  ],
  {
    desc: 'M4697 MARKCNG_11 非玛奥助手检查被删除（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  const kojo = chara(target).kojo;\n  void rand;\n\n  if (era_flag.assi > 0 && era_flag.assiplay && era_flag.assi !== 17) {',
    replace:
      '  const kojo = chara(target).kojo;\n  void rand;\n\n  if (false) {\n    // 变异：删除非玛奥助手检查',
    tests: ['kojo-k11-lily'],
    must_mention: 'MARKCNG_11 非玛奥助手参与调教时整段静默跳过',
  },
  ...[
    {
      desc: 'M4698 MARKCNG_11 苦痛刻印Lv3状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.苦痛刻印Lv3 = 1;',
      replace: 'kojo.苦痛刻印Lv3 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '四类 Lv3 刻印可在同轮依次取得并推进 CFLAG:297-300',
    },
    {
      desc: 'M4699 MARKCNG_11 快乐刻印Lv3状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.快乐刻印Lv3 = 1;',
      replace: 'kojo.快乐刻印Lv3 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '四类 Lv3 刻印可在同轮依次取得并推进 CFLAG:297-300',
    },
    {
      desc: 'M4700 MARKCNG_11 屈服刻印Lv3状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.屈服刻印Lv3 = 1;',
      replace: 'kojo.屈服刻印Lv3 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '四类 Lv3 刻印可在同轮依次取得并推进 CFLAG:297-300',
    },
    {
      desc: 'M4701 MARKCNG_11 反抗刻印Lv3状态写错（#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.反抗刻印Lv3 = 1;',
      replace: 'kojo.反抗刻印Lv3 = 99;',
      tests: ['kojo-k11-lily'],
      must_mention: '四类 Lv3 刻印可在同轮依次取得并推进 CFLAG:297-300',
    },
  ],
  {
    desc: 'M4284 COM28 助手淫乱＋A感覚门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (assi_mao) {
      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        chara(target).system.肛门感觉 >= 3 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {`,
    replace: `    if (assi_mao) {
      if (
        era.get(\`talent:\${target}:76\`) === 1 &&
        chara(target).system.肛门感觉 >= 4 &&
        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
      ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM28 助手玛奥第 1 档推进',
  },
  {
    desc: 'M4285 COM28 助手爱慕＋A感覚门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        kojo.对面座位肛交 = 6;\n      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        chara(target).system.肛门感觉 >= 3 &&',
    replace:
      '        kojo.对面座位肛交 = 6;\n      } else if (\n        era.get(`talent:${target}:85`) === 1 &&\n        chara(target).system.肛门感觉 >= 4 &&',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM28 助手玛奥第 3 档推进',
  },
  {
    desc: 'M4286 COM28 非助手淫乱＋A感覚门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    } else if (
      era.get(\`talent:\${target}:76\`) === 1 &&
      chara(target).system.肛门感觉 >= 3 &&
      (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
    ) {`,
    replace: `    } else if (
      era.get(\`talent:\${target}:76\`) === 1 &&
      chara(target).system.肛门感觉 >= 4 &&
      (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)
    ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM28 非助手玛奥第 1 档推进',
  },
  {
    desc: 'M4287 COM28 非助手爱慕＋A感覚门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      kojo.对面座位肛交 = 6;\n    } else if (\n      era.get(`talent:${target}:85`) === 1 &&\n      chara(target).system.肛门感觉 >= 3 &&',
    replace:
      '      kojo.对面座位肛交 = 6;\n    } else if (\n      era.get(`talent:${target}:85`) === 1 &&\n      chara(target).system.肛门感觉 >= 4 &&',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM28 非助手玛奥第 3 档推进',
  },
  {
    desc: 'M4288 COM28 助手淫乱＋A感覚第二次 RAND:2 ===0 改 ===1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (rand_n(2) === 0) {\n          await era.printAndWait(\n            `${target_name}主动扭起了腰，如饥似渴地追求着更强烈的肛交快感。`,\n          );',
    replace:
      '        } else if (rand_n(2) === 1) {\n          await era.printAndWait(\n            `${target_name}主动扭起了腰，如饥似渴地追求着更强烈的肛交快感。`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM28 助手玛奥淫乱＋A感覚 RAND 第二档台词',
  },
  {
    desc: 'M4289 COM28 非助手爱慕第二次 RAND:2 ===0 改 ===1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else if (rand_n(2) === 0) {\n        await era.printAndWait(\n          `「原，原来……用屁股做……也可以这么舒服的……${heart(1)}」`,\n        );',
    replace:
      '      } else if (rand_n(2) === 1) {\n        await era.printAndWait(\n          `「原，原来……用屁股做……也可以这么舒服的……${heart(1)}」`,\n        );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM28 非助手玛奥爱慕 RAND 第三档台词',
  },
  ...[
    {
      desc: 'M4290 COM29 初次 CFLAG:330 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.背面座位肛交 = 1;',
      replace: 'kojo.背面座位肛交 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM29 初次第 1 档推进',
    },
    {
      desc: 'M4291 COM29 助手淫乱＋A感覚 CFLAG:330 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              `${player_name}抱着${target_name}双腿，坚挺的${weapon}持续侵犯着在快感中抽搐着的肛门……`,\n            );\n          }\n          // CFLAG:330  = 7（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 7;',
      replace:
        '              `${player_name}抱着${target_name}双腿，坚挺的${weapon}持续侵犯着在快感中抽搐着的肛门……`,\n            );\n          }\n          // CFLAG:330  = 7（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM29 助手玛奥第 1 档推进',
    },
    {
      desc: 'M4292 COM29 助手淫乱 CFLAG:330 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}嬉笑着，娇喘着分开双腿，一览无余地展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门…`,\n          );\n          // CFLAG:330  = 6（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 6;',
      replace:
        '            `${target_name}嬉笑着，娇喘着分开双腿，一览无余地展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门…`,\n          );\n          // CFLAG:330  = 6（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM29 助手玛奥第 2 档推进',
    },
    {
      desc: 'M4293 COM29 助手爱慕＋A感覚 CFLAG:330 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              `胸部的刺激让肛门变得更加敏感，抽搐一般紧紧夹着的${player_name}的${weapon}……`,\n            );\n          }\n          // CFLAG:330  = 5（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 5;',
      replace:
        '              `胸部的刺激让肛门变得更加敏感，抽搐一般紧紧夹着的${player_name}的${weapon}……`,\n            );\n          }\n          // CFLAG:330  = 5（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM29 助手玛奥第 3 档推进',
    },
    {
      desc: 'M4294 COM29 助手爱慕 CFLAG:330 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `胸部的刺激让肛门变得更加敏感，抽搐一般紧紧夹着的${player_name}的${weapon}……`,\n          );\n          // CFLAG:330  = 4（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 4;',
      replace:
        '            `胸部的刺激让肛门变得更加敏感，抽搐一般紧紧夹着的${player_name}的${weapon}……`,\n          );\n          // CFLAG:330  = 4（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM29 助手玛奥第 4 档推进',
    },
    {
      desc: 'M4295 COM29 助手A感覚 CFLAG:330 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.背面座位肛交 = 3;\n        } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「呜呜呜……屁股……不是用来做这种事情的啊…」`);',
      replace:
        '          kojo.背面座位肛交 = 2;\n        } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「呜呜呜……屁股……不是用来做这种事情的啊…」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM29 助手玛奥第 5 档推进',
    },
    {
      desc: 'M4296 COM29 助手それ以外 CFLAG:330 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.背面座位肛交 = 2;\n        }\n      } else {',
      replace: '          kojo.背面座位肛交 = 1;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM29 助手玛奥第 6 档推进',
    },
    {
      desc: 'M4297 COM29 非助手淫乱＋A感覚 CFLAG:330 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              `坚挺的阴茎持续地侵犯，抽插着已经被彻底调教成性器的肛门……`,\n            );\n          }\n          // CFLAG:330  = 7（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 7;',
      replace:
        '              `坚挺的阴茎持续地侵犯，抽插着已经被彻底调教成性器的肛门……`,\n            );\n          }\n          // CFLAG:330  = 7（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM29 非助手玛奥第 1 档推进',
    },
    {
      desc: 'M4298 COM29 非助手淫乱 CFLAG:330 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `肛交的快感让${target_name}忘我的呻吟，娇喘着………`,\n          );\n          // CFLAG:330  = 6（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 6;',
      replace:
        '            `肛交的快感让${target_name}忘我的呻吟，娇喘着………`,\n          );\n          // CFLAG:330  = 6（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM29 非助手玛奥第 2 档推进',
    },
    {
      desc: 'M4299 COM29 非助手爱慕＋A感覚 CFLAG:330 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              `极度的快感让${target_name}一张一合，紧紧夹着${player_name}的阴茎……`,\n            );\n          }\n          // CFLAG:330  = 5（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 5;',
      replace:
        '              `极度的快感让${target_name}一张一合，紧紧夹着${player_name}的阴茎……`,\n            );\n          }\n          // CFLAG:330  = 5（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM29 非助手玛奥第 3 档推进',
    },
    {
      desc: 'M4300 COM29 非助手爱慕 CFLAG:330 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `异样的快感让${target_name}一张一合，紧紧夹着${player_name}的阴茎……`,\n          );\n          // CFLAG:330  = 4（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 4;',
      replace:
        '            `异样的快感让${target_name}一张一合，紧紧夹着${player_name}的阴茎……`,\n          );\n          // CFLAG:330  = 4（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM29 非助手玛奥第 4 档推进',
    },
    {
      desc: 'M4301 COM29 非助手A感覚 CFLAG:330 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.背面座位肛交 = 3;\n        } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {\n          if (rand_n(3) === 0) {',
      replace:
        '          kojo.背面座位肛交 = 2;\n        } else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 === 2) {\n          if (rand_n(3) === 0) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM29 非助手玛奥第 5 档推进',
    },
    {
      desc: 'M4302 COM29 非助手それ以外 CFLAG:330 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.背面座位肛交 = 2;\n        }\n      }\n      return 0;',
      replace:
        '          kojo.背面座位肛交 = 1;\n        }\n      }\n      return 0;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM29 非助手玛奥第 6 档推进',
    },
  ],
  {
    desc: 'M4303 COM29 武器三目 && 改 ||（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: "  // IF SELECTCOM == 29（背面座位肛交 CFLAG:330）\n  if (era_flag.selectcom === 29) {\n    const weapon =\n      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0\n        ? '电动假阳具'\n        : '阴茎';",
    replace:
      "  // IF SELECTCOM == 29（背面座位肛交 CFLAG:330）\n  if (era_flag.selectcom === 29) {\n    const weapon =\n      era0(`talent:${player}:121`) === 0 || era0(`talent:${player}:122`) === 0\n        ? '电动假阳具'\n        : '阴茎';",
    tests: ['kojo-k11-lily'],
    must_mention: 'COM29 武器三目单侧素质时使用阴茎',
  },
  {
    desc: 'M4304 COM29 助手淫乱＋A感覚门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (assi_mao) {
        if (
          era.get(\`talent:\${target}:76\`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {`,
    replace: `      if (assi_mao) {
        if (
          era.get(\`talent:\${target}:76\`) === 1 &&
          chara(target).system.肛门感觉 >= 4 &&
          (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM29 助手玛奥第 1 档推进',
  },
  {
    desc: 'M4305 COM29 助手爱慕＋A感覚门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '            `${target_name}嬉笑着，娇喘着分开双腿，一览无余地展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门…`,\n          );\n          // CFLAG:330  = 6（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 6;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          chara(target).system.肛门感觉 >= 3 &&',
    replace:
      '            `${target_name}嬉笑着，娇喘着分开双腿，一览无余地展露着正在被${player_name}的${weapon}侵犯得一张一合的肛门…`,\n          );\n          // CFLAG:330  = 6（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 6;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          chara(target).system.肛门感觉 >= 4 &&',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM29 助手玛奥第 3 档推进',
  },
  {
    desc: 'M4306 COM29 非助手淫乱＋A感覚门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else {
        if (
          era.get(\`talent:\${target}:76\`) === 1 &&
          chara(target).system.肛门感觉 >= 3 &&
          (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {`,
    replace: `      } else {
        if (
          era.get(\`talent:\${target}:76\`) === 1 &&
          chara(target).system.肛门感觉 >= 4 &&
          (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)
        ) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM29 非助手玛奥第 1 档推进',
  },
  {
    desc: 'M4307 COM29 非助手爱慕＋A感覚门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '            `肛交的快感让${target_name}忘我的呻吟，娇喘着………`,\n          );\n          // CFLAG:330  = 6（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 6;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          chara(target).system.肛门感觉 >= 3 &&',
    replace:
      '            `肛交的快感让${target_name}忘我的呻吟，娇喘着………`,\n          );\n          // CFLAG:330  = 6（变量语义：CFLAG 族，330）\n          kojo.背面座位肛交 = 6;\n        } else if (\n          era.get(`talent:${target}:85`) === 1 &&\n          chara(target).system.肛门感觉 >= 4 &&',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM29 非助手玛奥第 3 档推进',
  },
  {
    desc: 'M4308 COM29 助手淫乱＋A感覚第二次 RAND:2 ===0 改 ===1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          } else if (rand_n(2) === 0) {\n            await era.printAndWait(\n              `「呜啊……嗯啊啊${heart(1)} 肛交……好舒服……真的是太棒了啊啊${heart(1)}」`,\n            );',
    replace:
      '          } else if (rand_n(2) === 1) {\n            await era.printAndWait(\n              `「呜啊……嗯啊啊${heart(1)} 肛交……好舒服……真的是太棒了啊啊${heart(1)}」`,\n            );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM29 助手玛奥淫乱＋A感覚 RAND 第二档台词',
  },
  {
    desc: 'M4309 COM29 非助手それ以外第二次 RAND:2 ===0 改 ===1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          } else if (rand_n(2) === 0) {\n            await era.printAndWait(\n              `「不，不可以全部……插进来啊……好痛！好痛！！」`,\n            );',
    replace:
      '          } else if (rand_n(2) === 1) {\n            await era.printAndWait(\n              `「不，不可以全部……插进来啊……好痛！好痛！！」`,\n            );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM29 非助手玛奥それ以外 RAND 第二档台词',
  },
  ...[
    {
      desc: 'M4310 COM30 初次 CFLAG:331 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.手淫 = 1;\n      return 0;\n    } else {\n      if (assi_mao) {',
      replace:
        '      kojo.手淫 = 2;\n      return 0;\n    } else {\n      if (assi_mao) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM30 初次第 1 档推进',
    },
    {
      desc: 'M4311 COM30 助手淫乱 CFLAG:331 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「来吧，在姐姐的手上射精吧${heart(1)}」`);\n          // CFLAG:331  = 5（变量语义：CFLAG 族，331）\n          kojo.手淫 = 5;',
      replace:
        '          await era.printAndWait(`「来吧，在姐姐的手上射精吧${heart(1)}」`);\n          // CFLAG:331  = 5（变量语义：CFLAG 族，331）\n          kojo.手淫 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM30 助手玛奥可达第 1 档推进',
    },
    {
      desc: 'M4312 COM30 助手爱慕 CFLAG:331 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(\n            `『姐姐和小鸡鸡都好喜欢，但是最喜欢的还是给我侍奉小鸡鸡的姐姐，真是太棒了！』`,\n          );\n          // CFLAG:331  = 4（变量语义：CFLAG 族，331）\n          kojo.手淫 = 4;',
      replace:
        '          await era.printAndWait(\n            `『姐姐和小鸡鸡都好喜欢，但是最喜欢的还是给我侍奉小鸡鸡的姐姐，真是太棒了！』`,\n          );\n          // CFLAG:331  = 4（变量语义：CFLAG 族，331）\n          kojo.手淫 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM30 助手玛奥可达第 2 档推进',
    },
    {
      desc: 'M4313 COM30 助手それ以外 CFLAG:331 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.手淫 = 2;\n        }\n      } else {',
      replace: '          kojo.手淫 = 1;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM30 助手玛奥可达第 4 档推进',
    },
    {
      desc: 'M4314 COM30 非助手淫乱 CFLAG:331 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          }\n          // CFLAG:331  = 5（变量语义：CFLAG 族，331）\n          kojo.手淫 = 5;',
      replace:
        '          }\n          // CFLAG:331  = 5（变量语义：CFLAG 族，331）\n          kojo.手淫 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM30 非助手玛奥可达第 1 档推进',
    },
    {
      desc: 'M4315 COM30 非助手爱慕 CFLAG:331 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          }\n          // CFLAG:331  = 4（变量语义：CFLAG 族，331）\n          kojo.手淫 = 4;',
      replace:
        '          }\n          // CFLAG:331  = 4（变量语义：CFLAG 族，331）\n          kojo.手淫 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM30 非助手玛奥可达第 2 档推进',
    },
    {
      desc: 'M4316 COM30 非助手それ以外 CFLAG:331 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:331  = 2（变量语义：CFLAG 族，331）\n          kojo.手淫 = 2;',
      replace:
        '          );\n          // CFLAG:331  = 2（变量语义：CFLAG 族，331）\n          kojo.手淫 = 1;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM30 非助手玛奥可达第 4 档推进',
    },
  ],
  {
    desc: 'M4317 COM30 初次助手淫乱素质 76 改 75（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      if (assi_mao) {\n        if (era.get(`talent:${target}:76`) === 1) {\n          await era.printAndWait(\n            `『姐姐弄得人家的小肉棒好舒服啊啊${heart(1)}』`,\n          );',
    replace:
      '      if (assi_mao) {\n        if (era.get(`talent:${target}:75`) === 1) {\n          await era.printAndWait(\n            `『姐姐弄得人家的小肉棒好舒服啊啊${heart(1)}』`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM30 初次第 1 档台词',
  },
  {
    desc: 'M4318 COM30 初次助手爱慕素质 85 改 84（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (era.get(`talent:${target}:85`) === 1) {\n          await era.printAndWait(\n            `「居然会有给${player_name}……做这种事情的一天…」`,\n          );',
    replace:
      '        } else if (era.get(`talent:${target}:84`) === 1) {\n          await era.printAndWait(\n            `「居然会有给${player_name}……做这种事情的一天…」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM30 初次第 2 档台词',
  },
  {
    desc: 'M4319 COM30 初次助手奉仕精神门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (chara(target).system.侍奉精神 >= 3) {\n          await era.printAndWait(\n            `『姐姐，要好好侍奉人家的小鸡鸡啊${heart(1)}』`,\n          );',
    replace:
      '        } else if (chara(target).system.侍奉精神 >= 4) {\n          await era.printAndWait(\n            `『姐姐，要好好侍奉人家的小鸡鸡啊${heart(1)}』`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM30 初次第 3 档台词',
  },
  {
    desc: 'M4320 COM30 初次非助手淫乱素质 76 改 75（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '      } else {\n        if (era.get(`talent:${target}:76`) === 1) {\n          await era.printAndWait(\n            `「啊啊……魔王大人的阴茎……雄伟地树立在人家面前${heart(1)}」`,\n          );',
    replace:
      '      } else {\n        if (era.get(`talent:${target}:75`) === 1) {\n          await era.printAndWait(\n            `「啊啊……魔王大人的阴茎……雄伟地树立在人家面前${heart(1)}」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM30 初次第 5 档台词',
  },
  {
    desc: 'M4321 COM30 初次非助手爱慕素质 85 改 84（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (era.get(`talent:${target}:85`) === 1) {\n          await era.printAndWait(\n            `「啊啊……魔王大人的阴茎……在人家的手里变得硬邦邦的了${heart(1)}」`,\n          );',
    replace:
      '        } else if (era.get(`talent:${target}:84`) === 1) {\n          await era.printAndWait(\n            `「啊啊……魔王大人的阴茎……在人家的手里变得硬邦邦的了${heart(1)}」`,\n          );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM30 初次第 6 档台词',
  },
  {
    desc: 'M4322 COM30 初次非助手奉仕精神门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '        } else if (chara(target).system.侍奉精神 >= 3) {\n          await era.printAndWait(`「真是的……这种……黏糊糊的感觉……」`);',
    replace:
      '        } else if (chara(target).system.侍奉精神 >= 4) {\n          await era.printAndWait(`「真是的……这种……黏糊糊的感觉……」`);',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM30 初次第 7 档台词',
  },
  {
    desc: 'M4323 COM30 助手淫乱奉仕精神门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `          era.get(\`talent:\${target}:76\`) === 1 &&
          chara(target).system.侍奉精神 >= 3 &&
          (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)`,
    replace: `          era.get(\`talent:\${target}:76\`) === 1 &&
          chara(target).system.侍奉精神 >= 4 &&
          (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM30 助手玛奥可达第 1 档推进',
  },
  {
    desc: 'M4324 COM30 助手爱慕前档检查收紧（#242，#688 后侍奉精神档递补命中）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `          (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            \`『嘿嘿，这个小鸡鸡可是魔王大人给我装上的哦，要温柔地对待呀♪』\`,`,
    replace: `          (kojo.手淫 <= 0 || game.kojo.口上开关 === 2)
        ) {
          await era.printAndWait(
            \`『嘿嘿，这个小鸡鸡可是魔王大人给我装上的哦，要温柔地对待呀♪』\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM30 助手玛奥可达第 2 档推进',
  },
  {
    desc: 'M4325 COM30 非助手爱慕前档检查收紧（#242，#688 后侍奉精神档递补命中）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `          (kojo.手淫 <= 3 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(2) === 0) {
            await era.printAndWait(
              \`「哈啊……魔王大人的阴茎，在\${target_name}的手里……变得硬邦邦的了\${heart(1)}」\`,`,
    replace: `          (kojo.手淫 <= 0 || game.kojo.口上开关 === 2)
        ) {
          if (rand_n(2) === 0) {
            await era.printAndWait(
              \`「哈啊……魔王大人的阴茎，在\${target_name}的手里……变得硬邦邦的了\${heart(1)}」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM30 非助手玛奥可达第 2 档推进',
  },
  {
    desc: 'M4326 COM30 非助手淫乱 RAND:2 ===0 改 ===1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          if (rand_n(2) === 0) {\n            await era.printAndWait(\n              `「嘿嘿，${target_name}的手交侍奉如何呀…一会儿可要满满地射出来哦${heart(1)}」`,\n            );',
    replace:
      '          if (rand_n(2) === 1) {\n            await era.printAndWait(\n              `「嘿嘿，${target_name}的手交侍奉如何呀…一会儿可要满满地射出来哦${heart(1)}」`,\n            );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM30 非助手玛奥淫乱 RAND 第一档台词',
  },
  {
    desc: 'M4327 COM30 非助手爱慕 RAND:2 ===0 改 ===1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '          if (rand_n(2) === 0) {\n            await era.printAndWait(\n              `「哈啊……魔王大人的阴茎，在${target_name}的手里……变得硬邦邦的了${heart(1)}」`,\n            );',
    replace:
      '          if (rand_n(2) === 1) {\n            await era.printAndWait(\n              `「哈啊……魔王大人的阴茎，在${target_name}的手里……变得硬邦邦的了${heart(1)}」`,\n            );',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM30 非助手玛奥爱慕 RAND 第二档台词',
  },
  ...[
    {
      desc: 'M4328 COM31 初次 CFLAG:332 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.口交_奴 = 1;\n      return 0;\n    } else {\n      if (assi_mao) {',
      replace:
        '      kojo.口交_奴 = 2;\n      return 0;\n    } else {\n      if (assi_mao) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM31 初次第 1 档推进',
    },
    {
      desc: 'M4329 COM31 助手淫乱 CFLAG:332 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:332  = 5（变量语义：CFLAG 族，332）\n          kojo.口交_奴 = 5;',
      replace:
        '          );\n          // CFLAG:332  = 5（变量语义：CFLAG 族，332）\n          kojo.口交_奴 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM31 助手玛奥第 1 档推进',
    },
    {
      desc: 'M4330 COM31 助手爱慕 CFLAG:332 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「不，不行了——唔呣……唔唔…！」`);\n          // CFLAG:332  = 4（变量语义：CFLAG 族，332）\n          kojo.口交_奴 = 4;',
      replace:
        '          await era.printAndWait(`「不，不行了——唔呣……唔唔…！」`);\n          // CFLAG:332  = 4（变量语义：CFLAG 族，332）\n          kojo.口交_奴 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM31 助手玛奥第 2 档推进',
    },
    {
      desc: 'M4331 COM31 助手奉仕 CFLAG:332 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.口交_奴 = 3;\n        } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「姐，姐姐会努力的……所以请早点射精吧…呜呜呜……唔呣，唔呣」`,',
      replace:
        '          kojo.口交_奴 = 2;\n        } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「姐，姐姐会努力的……所以请早点射精吧…呜呜呜……唔呣，唔呣」`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM31 助手玛奥第 3 档推进',
    },
    {
      desc: 'M4332 COM31 助手其余 CFLAG:332 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.口交_奴 = 2;\n        }\n      } else {',
      replace: '          kojo.口交_奴 = 1;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM31 助手玛奥第 4 档推进',
    },
    {
      desc: 'M4333 COM31 非助手淫乱 CFLAG:332 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          }\n          // CFLAG:332  = 5（变量语义：CFLAG 族，332）\n          kojo.口交_奴 = 5;',
      replace:
        '          }\n          // CFLAG:332  = 5（变量语义：CFLAG 族，332）\n          kojo.口交_奴 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM31 非助手玛奥第 1 档推进',
    },
    {
      desc: 'M4334 COM31 非助手爱慕 CFLAG:332 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          }\n          // CFLAG:332  = 4（变量语义：CFLAG 族，332）\n          kojo.口交_奴 = 4;',
      replace:
        '          }\n          // CFLAG:332  = 4（变量语义：CFLAG 族，332）\n          kojo.口交_奴 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM31 非助手玛奥第 2 档推进',
    },
    {
      desc: 'M4335 COM31 非助手奉仕 CFLAG:332 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.口交_奴 = 3;\n        } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「唔呣……呣呣……这么丢人的事……唔呣……」`);',
      replace:
        '          kojo.口交_奴 = 2;\n        } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「唔呣……呣呣……这么丢人的事……唔呣……」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM31 非助手玛奥第 3 档推进',
    },
    {
      desc: 'M4336 COM31 非助手其余 CFLAG:332 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.口交_奴 = 2;\n        }\n      }\n      return 0;',
      replace:
        '          kojo.口交_奴 = 1;\n        }\n      }\n      return 0;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM31 非助手玛奥第 4 档推进',
    },
  ],
  {
    desc: 'M4341 COM31 初次助手奉仕精神门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        } else if (chara(target).system.侍奉精神 >= 3) {\n          await era.printAndWait(\n            \`「唔呣……唔唔……唔呣……这，这样可以吗……还要继续？」\`,`,
    replace: `        } else if (chara(target).system.侍奉精神 >= 4) {\n          await era.printAndWait(\n            \`「唔呣……唔唔……唔呣……这，这样可以吗……还要继续？」\`,`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM31 初次第 3 档台词',
  },
  {
    desc: 'M4342 COM31 初次非助手奉仕精神门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        } else if (chara(target).system.侍奉精神 >= 3) {\n          await era.printAndWait(\n            \`「嗯哈…嗯啾…咻…哈呣`,
    replace: `        } else if (chara(target).system.侍奉精神 >= 4) {\n          await era.printAndWait(\n            \`「嗯哈…嗯啾…咻…哈呣`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM31 初次第 7 档台词',
  },
  ...[
    [
      4343,
      'rand_n(3) === 0',
      'rand_n(3) === 1',
      'COM31 非助手玛奥淫乱 RAND 第二档台词',
    ],
    [
      4344,
      'rand_n(2) === 0',
      'rand_n(2) === 1',
      'COM31 非助手玛奥淫乱 RAND 第二档台词',
    ],
  ].map(([id, find_rand, replace_rand, must_mention]) => ({
    desc: `M${id} COM31 非助手淫乱随机条件改错（#242）`,
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `${id === 4343 ? 'if (' : '} else if ('}${find_rand}) {\n            // COM31-RAND`,
    replace: `${id === 4343 ? 'if (' : '} else if ('}${replace_rand}) {\n            // COM31-RAND`,
    tests: ['kojo-k11-lily'],
    must_mention,
  })),
  {
    desc: 'M4345 COM31 非助手奉仕精神 RAND:2 ===0 改 ===1（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `          if (rand_n(2) === 0) {\n            await era.printAndWait(\n              \`「我，我会努力的`,
    replace: `          if (rand_n(2) === 1) {\n            await era.printAndWait(\n              \`「我，我会努力的`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM31 非助手玛奥奉仕精神 RAND 第二档台词',
  },
  ...[
    {
      desc: 'M4346 COM32 初次 CFLAG:333 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.乳交 = 1;',
      replace: 'kojo.乳交 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM32 初次第 1 档推进',
    },
    {
      desc: 'M4347 COM32 助手淫乱 CFLAG:333 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.乳交 = 5;',
      replace: '        kojo.乳交 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM32 助手玛奥第 1 档推进',
    },
    {
      desc: 'M4348 COM32 助手爱慕 CFLAG:333 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.乳交 = 4;',
      replace: '        kojo.乳交 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM32 助手玛奥第 2 档推进',
    },
    {
      desc: 'M4349 COM32 助手奉仕 CFLAG:333 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.乳交 = 3;',
      replace: '        kojo.乳交 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM32 助手玛奥第 3 档推进',
    },
    {
      desc: 'M4350 COM32 助手其余 CFLAG:333 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.乳交 = 2;',
      replace: '        kojo.乳交 = 1;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM32 助手玛奥第 4 档推进',
    },
    {
      desc: 'M4351 COM32 非助手淫乱 CFLAG:333 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.乳交 = 5;\n    } else if (',
      replace: '      kojo.乳交 = 4;\n    } else if (',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM32 非助手玛奥第 1 档推进',
    },
    {
      desc: 'M4352 COM32 非助手爱慕 CFLAG:333 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.乳交 = 4;\n    } else if (',
      replace: '      kojo.乳交 = 3;\n    } else if (',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM32 非助手玛奥第 2 档推进',
    },
    {
      desc: 'M4353 COM32 非助手奉仕 CFLAG:333 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.乳交 = 3;\n    } else if (kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {',
      replace:
        '      kojo.乳交 = 2;\n    } else if (kojo.乳交 <= 1 || game.kojo.口上开关 === 2) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM32 非助手玛奥第 3 档推进',
    },
    {
      desc: 'M4354 COM32 非助手其余 CFLAG:333 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.乳交 = 2;\n    }',
      replace: '      kojo.乳交 = 1;\n    }',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM32 非助手玛奥第 4 档推进',
    },
  ],
  {
    desc: 'M4355 COM32 初次奉仕精神门槛 >=3 改 >=4（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      } else if (chara(target).system.侍奉精神 >= 3) {
        await era.printAndWait(\`「呜啊啊…用，用胸部这样做……感觉舒服吗？」\`);`,
    replace: `      } else if (chara(target).system.侍奉精神 >= 4) {
        await era.printAndWait(\`「呜啊啊…用，用胸部这样做……感觉舒服吗？」\`);`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM32 初次第 4 档台词',
  },
  ...[
    {
      desc: 'M4358 COM33 初次 CFLAG:334 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.股间性交 = 1;',
      replace: 'kojo.股间性交 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM33 初次第 1 档推进',
    },
    {
      desc: 'M4359 COM33 助手淫乱处女 CFLAG:334 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.股间性交 = 6;',
      replace: '        kojo.股间性交 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM33 助手玛奥第 1 档推进',
    },
    {
      desc: 'M4360 COM33 助手淫乱 CFLAG:334 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.股间性交 = 5;',
      replace: '        kojo.股间性交 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM33 助手玛奥第 2 档推进',
    },
    {
      desc: 'M4361 COM33 助手爱慕处女 CFLAG:334 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.股间性交 = 4;',
      replace: '        kojo.股间性交 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM33 助手玛奥第 3 档推进',
    },
    {
      desc: 'M4362 COM33 助手爱慕 CFLAG:334 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.股间性交 = 3;',
      replace: '        kojo.股间性交 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM33 助手玛奥第 4 档推进',
    },
    {
      desc: 'M4363 COM33 助手其余 CFLAG:334 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.股间性交 = 2;',
      replace: '        kojo.股间性交 = 1;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM33 助手玛奥第 5 档推进',
    },
    {
      desc: 'M4364 COM33 非助手淫乱处女 CFLAG:334 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.股间性交 = 6;\n    } else if (',
      replace: '      kojo.股间性交 = 5;\n    } else if (',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM33 非助手玛奥第 1 档推进',
    },
    {
      desc: 'M4365 COM33 非助手淫乱 CFLAG:334 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.股间性交 = 5;\n    } else if (',
      replace: '      kojo.股间性交 = 4;\n    } else if (',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM33 非助手玛奥第 2 档推进',
    },
    {
      desc: 'M4366 COM33 非助手爱慕处女 CFLAG:334 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.股间性交 = 4;\n    } else if (',
      replace: '      kojo.股间性交 = 3;\n    } else if (',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM33 非助手玛奥第 3 档推进',
    },
    {
      desc: 'M4367 COM33 非助手爱慕 CFLAG:334 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.股间性交 = 3;\n    } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {',
      replace:
        '      kojo.股间性交 = 2;\n    } else if (kojo.股间性交 <= 1 || game.kojo.口上开关 === 2) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM33 非助手玛奥第 4 档推进',
    },
    {
      desc: 'M4368 COM33 非助手其余 CFLAG:334 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.股间性交 = 2;\n    }',
      replace: '      kojo.股间性交 = 1;\n    }',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM33 非助手玛奥第 5 档推进',
    },
  ],
  {
    desc: 'M4369 COM33 助手淫乱处女条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `        era.get(\`talent:\${target}:0\`) === 1 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          \`「嗯啊……啊啊……干脆把姐姐的处女`,
    replace: `        era.get(\`talent:\${target}:0\`) === 0 &&
        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
      ) {
        await era.printAndWait(
          \`「嗯啊……啊啊……干脆把姐姐的处女`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM33 助手玛奥第 1 档推进',
  },
  {
    desc: 'M4370 COM33 非助手淫乱处女条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      era.get(\`talent:\${target}:0\`) === 1 &&
      (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        \`「嗯啊……哎啊！求你了`,
    replace: `      era.get(\`talent:\${target}:0\`) === 0 &&
      (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(
        \`「嗯啊……哎啊！求你了`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM33 非助手玛奥第 1 档推进',
  },
  ...[
    {
      desc: 'M4371 COM34 初次 CFLAG:335 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.骑乘位 = 1;\n      return 0;\n    } else {\n      if (assi_mao) {',
      replace:
        '      kojo.骑乘位 = 2;\n      return 0;\n    } else {\n      if (assi_mao) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM34 初次第 1 档推进',
    },
    {
      desc: 'M4372 COM34 助手淫乱 CFLAG:335 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              `${target_name}带着一脸沉醉的表情，完全沉浸在交媾的快感之中……`,\n            );\n          }\n          // CFLAG:335  = 6（变量语义：CFLAG 族，335）\n          kojo.骑乘位 = 6;',
      replace:
        '              `${target_name}带着一脸沉醉的表情，完全沉浸在交媾的快感之中……`,\n            );\n          }\n          // CFLAG:335  = 6（变量语义：CFLAG 族，335）\n          kojo.骑乘位 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM34 助手玛奥第 1 档推进',
    },
    {
      desc: 'M4373 COM34 助手爱慕 CFLAG:335 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              `当着深爱的${master_name}的面，${target_name}被${player_name}从下方持续地侵犯着，反而更加兴奋了………`,\n            );\n          }\n          // CFLAG:335  = 5（变量语义：CFLAG 族，335）\n          kojo.骑乘位 = 5;',
      replace:
        '              `当着深爱的${master_name}的面，${target_name}被${player_name}从下方持续地侵犯着，反而更加兴奋了………`,\n            );\n          }\n          // CFLAG:335  = 5（变量语义：CFLAG 族，335）\n          kojo.骑乘位 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM34 助手玛奥第 2 档推进',
    },
    {
      desc: 'M4374 COM34 助手屈服刻印＋私处感觉 CFLAG:335 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              `那纠结在屈辱与快感之中的表情，勾起了${master_name}强烈的欲望……`,\n            );\n          }\n          // CFLAG:335  = 4（变量语义：CFLAG 族，335）\n          kojo.骑乘位 = 4;',
      replace:
        '              `那纠结在屈辱与快感之中的表情，勾起了${master_name}强烈的欲望……`,\n            );\n          }\n          // CFLAG:335  = 4（变量语义：CFLAG 族，335）\n          kojo.骑乘位 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM34 助手玛奥第 3 档推进',
    },
    {
      desc: 'M4375 COM34 助手屈服刻印 CFLAG:335 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.骑乘位 = 3;\n        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {\n          await era.print(`『笨蛋姐姐，腰也要自己动起来啊！』`);',
      replace:
        '          kojo.骑乘位 = 2;\n        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {\n          await era.print(`『笨蛋姐姐，腰也要自己动起来啊！』`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM34 助手玛奥第 4 档推进',
    },
    {
      desc: 'M4376 COM34 助手其余 CFLAG:335 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.骑乘位 = 2;\n        }\n      } else {',
      replace: '          kojo.骑乘位 = 1;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM34 助手玛奥第 5 档推进',
    },
    {
      desc: 'M4377 COM34 非助手淫乱 CFLAG:335 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              `${target_name}娇喘着，享受着骑乘位交合的快感………`,\n            );\n          }\n          // CFLAG:335  = 6（变量语义：CFLAG 族，335）\n          kojo.骑乘位 = 6;',
      replace:
        '              `${target_name}娇喘着，享受着骑乘位交合的快感………`,\n            );\n          }\n          // CFLAG:335  = 6（变量语义：CFLAG 族，335）\n          kojo.骑乘位 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM34 非助手玛奥第 1 档推进',
    },
    {
      desc: 'M4378 COM34 非助手爱慕 CFLAG:335 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              `${target_name}娇喘着，享受着骑乘位交合的快感………`,\n            );\n          }\n          // CFLAG:335  = 5（变量语义：CFLAG 族，335）\n          kojo.骑乘位 = 5;',
      replace:
        '              `${target_name}娇喘着，享受着骑乘位交合的快感………`,\n            );\n          }\n          // CFLAG:335  = 5（变量语义：CFLAG 族，335）\n          kojo.骑乘位 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM34 非助手玛奥第 2 档推进',
    },
    {
      desc: 'M4379 COM34 非助手屈服刻印＋私处感觉 CFLAG:335 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              `${target_name}虽然一脸的屈辱与羞耻，但是按捺不住的娇喘却暴露着内心的真正感受………`,\n            );\n          }\n          // CFLAG:335  = 4（变量语义：CFLAG 族，335）\n          kojo.骑乘位 = 4;',
      replace:
        '              `${target_name}虽然一脸的屈辱与羞耻，但是按捺不住的娇喘却暴露着内心的真正感受………`,\n            );\n          }\n          // CFLAG:335  = 4（变量语义：CFLAG 族，335）\n          kojo.骑乘位 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM34 非助手玛奥第 3 档推进',
    },
    {
      desc: 'M4380 COM34 非助手屈服刻印 CFLAG:335 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.骑乘位 = 3;\n        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「呜……呜呜……这种丢人的姿势……！」`);',
      replace:
        '          kojo.骑乘位 = 2;\n        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「呜……呜呜……这种丢人的姿势……！」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM34 非助手玛奥第 4 档推进',
    },
    {
      desc: 'M4381 COM34 非助手其余 CFLAG:335 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.骑乘位 = 2;\n        }\n      }\n      return 0;',
      replace:
        '          kojo.骑乘位 = 1;\n        }\n      }\n      return 0;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM34 非助手玛奥第 5 档推进',
    },
  ],
  {
    desc: 'M4382 COM34 电动假阳具条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  // IF SELECTCOM == 34（骑乘位 CFLAG:335）\n  if (era_flag.selectcom === 34) {\n    const weapon =\n      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) === 0',
    replace:
      '  // IF SELECTCOM == 34（骑乘位 CFLAG:335）\n  if (era_flag.selectcom === 34) {\n    const weapon =\n      era0(`talent:${player}:121`) === 0 && era0(`talent:${player}:122`) !== 0',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM34 初次第 3 档条件性器文本',
  },
  {
    desc: 'M4383 COM34 初次处女助手玛奥条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `      if (era.get(\`talent:\${target}:0\`) === 1) {
        if (assi_mao) {
          if (era.get(\`talent:\${target}:76\`) === 1) {
            await era.printAndWait(
              \`「呜……我的处女`,
    replace: `      if (era.get(\`talent:\${target}:0\`) === 1) {
        if (!assi_mao) {
          if (era.get(\`talent:\${target}:76\`) === 1) {
            await era.printAndWait(
              \`「呜……我的处女`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM34 初次第 1 档台词',
  },
  ...[
    {
      desc: 'M4384 COM35 初次 CFLAG:336 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.全身擦洗 = 1;',
      replace: 'kojo.全身擦洗 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM35 初次第 1 档推进',
    },
    {
      desc: 'M4385 COM35 助手淫乱＋奉仕精神 CFLAG:336 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:336  = 5（变量语义：CFLAG 族，336）\n          kojo.全身擦洗 = 5;',
      replace:
        '          );\n          // CFLAG:336  = 5（变量语义：CFLAG 族，336）\n          kojo.全身擦洗 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM35 助手玛奥第 1 档推进',
    },
    {
      desc: 'M4386 COM35 助手爱慕＋奉仕精神 CFLAG:336 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「好好洗澡啦！不要乱摸啊${heart(1)}」`);\n          // CFLAG:336  = 4（变量语义：CFLAG 族，336）\n          kojo.全身擦洗 = 4;',
      replace:
        '          await era.printAndWait(`「好好洗澡啦！不要乱摸啊${heart(1)}」`);\n          // CFLAG:336  = 4（变量语义：CFLAG 族，336）\n          kojo.全身擦洗 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM35 助手玛奥第 2 档推进',
    },
    {
      desc: 'M4387 COM35 助手奉仕精神 CFLAG:336 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.全身擦洗 = 3;\n        } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「好好洗澡啦，${player_name}……手，不要乱摸姐姐的身体啦…」`,',
      replace:
        '          kojo.全身擦洗 = 2;\n        } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「好好洗澡啦，${player_name}……手，不要乱摸姐姐的身体啦…」`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM35 助手玛奥第 3 档推进',
    },
    {
      desc: 'M4388 COM35 助手其余 CFLAG:336 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.全身擦洗 = 2;\n        }\n      } else {',
      replace: '          kojo.全身擦洗 = 1;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM35 助手玛奥第 4 档推进',
    },
    {
      desc: 'M4389 COM35 非助手淫乱＋奉仕精神 CFLAG:336 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          }\n          // CFLAG:336  = 5（变量语义：CFLAG 族，336）\n          kojo.全身擦洗 = 5;',
      replace:
        '          }\n          // CFLAG:336  = 5（变量语义：CFLAG 族，336）\n          kojo.全身擦洗 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM35 非助手玛奥第 1 档推进',
    },
    {
      desc: 'M4390 COM35 非助手爱慕＋奉仕精神 CFLAG:336 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:336  = 4（变量语义：CFLAG 族，336）\n          kojo.全身擦洗 = 4;',
      replace:
        '          );\n          // CFLAG:336  = 4（变量语义：CFLAG 族，336）\n          kojo.全身擦洗 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM35 非助手玛奥第 2 档推进',
    },
    {
      desc: 'M4391 COM35 非助手奉仕精神 CFLAG:336 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.全身擦洗 = 3;\n        } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「要，要我用胸部帮你……擦身！？就不能……好好用毛巾吗……呜呜」`,',
      replace:
        '          kojo.全身擦洗 = 2;\n        } else if (kojo.全身擦洗 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「要，要我用胸部帮你……擦身！？就不能……好好用毛巾吗……呜呜」`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM35 非助手玛奥第 3 档推进',
    },
    {
      desc: 'M4392 COM35 非助手其余 CFLAG:336 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:336  = 2（变量语义：CFLAG 族，336）\n          kojo.全身擦洗 = 2;',
      replace:
        '          );\n          // CFLAG:336  = 2（变量语义：CFLAG 族，336）\n          kojo.全身擦洗 = 1;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM35 非助手玛奥第 4 档推进',
    },
  ],
  {
    desc: 'M4393 COM35 初次助手玛奥条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (kojo.全身擦洗 === 0) {
      if (assi_mao) {
        await era.printAndWait(
          \`『嘻嘻，和姐姐一起洗澡真高兴`,
    replace: `    if (kojo.全身擦洗 === 0) {
      if (!assi_mao) {
        await era.printAndWait(
          \`『嘻嘻，和姐姐一起洗澡真高兴`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM35 初次第 1 档台词',
  },
  ...[
    {
      desc: 'M4394 COM36 初次 CFLAG:337 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.骑乘位肛交 = 1;',
      replace: 'kojo.骑乘位肛交 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM36 初めて：助手玛奥与非助手玛奥三档',
    },
    {
      desc: 'M4395 COM36 助手淫乱＋肛门感觉 CFLAG:337 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              `当着所有认识的人的面被侵犯，${target_name}光是这么想象着，就已经感觉无比兴奋了…`,\n            );\n          }\n          // CFLAG:337  = 7（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 7;',
      replace:
        '              `当着所有认识的人的面被侵犯，${target_name}光是这么想象着，就已经感觉无比兴奋了…`,\n            );\n          }\n          // CFLAG:337  = 7（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM36 二回目：助手玛奥六档推进',
    },
    {
      desc: 'M4396 COM36 助手淫乱 CFLAG:337 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}扭动着腰，感受着被妹妹侵犯肛门的快感……`,\n          );\n          // CFLAG:337  = 6（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 6;',
      replace:
        '            `${target_name}扭动着腰，感受着被妹妹侵犯肛门的快感……`,\n          );\n          // CFLAG:337  = 6（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM36 二回目：助手玛奥六档推进',
    },
    {
      desc: 'M4397 COM36 助手爱慕＋肛门感觉 CFLAG:337 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            );\n          }\n          // CFLAG:337  = 5（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 5;',
      replace:
        '            );\n          }\n          // CFLAG:337  = 5（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM36 二回目：助手玛奥六档推进',
    },
    {
      desc: 'M4398 COM36 助手爱慕 CFLAG:337 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}感受着被妹妹侵犯肛门的背德快感，身体更加燥热了………`,\n          );\n          // CFLAG:337  = 4（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 4;',
      replace:
        '            `${target_name}感受着被妹妹侵犯肛门的背德快感，身体更加燥热了………`,\n          );\n          // CFLAG:337  = 4（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM36 二回目：助手玛奥六档推进',
    },
    {
      desc: 'M4399 COM36 助手肛门感觉 CFLAG:337 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          }\n          // CFLAG:337  = 3（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 3;',
      replace:
        '          }\n          // CFLAG:337  = 3（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM36 二回目：助手玛奥六档推进',
    },
    {
      desc: 'M4400 COM36 助手其余 CFLAG:337 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.骑乘位肛交 = 2;\n        }\n      } else {',
      replace: '          kojo.骑乘位肛交 = 1;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM36 二回目：助手玛奥六档推进',
    },
    {
      desc: 'M4401 COM36 非助手淫乱＋肛门感觉 CFLAG:337 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '              `「啊啊啊……人家的肛门……能够让魔王大人满意${heart(1)} 好高兴啊啊啊${heart(1)}」`,\n            );\n          }\n          // CFLAG:337  = 7（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 7;',
      replace:
        '              `「啊啊啊……人家的肛门……能够让魔王大人满意${heart(1)} 好高兴啊啊啊${heart(1)}」`,\n            );\n          }\n          // CFLAG:337  = 7（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM36 二回目：非助手玛奥六档推进',
    },
    {
      desc: 'M4402 COM36 非助手淫乱 CFLAG:337 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `骑在${player_name}身上的${target_name}扭动着腰，尽情享受着肛交的快感……`,\n          );\n          // CFLAG:337  = 6（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 6;',
      replace:
        '            `骑在${player_name}身上的${target_name}扭动着腰，尽情享受着肛交的快感……`,\n          );\n          // CFLAG:337  = 6（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM36 二回目：非助手玛奥六档推进',
    },
    {
      desc: 'M4403 COM36 非助手爱慕＋肛门感觉 CFLAG:337 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            await era.printAndWait(`${target_name}红着脸，大声乞求着……`);\n          }\n          // CFLAG:337  = 5（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 5;',
      replace:
        '            await era.printAndWait(`${target_name}红着脸，大声乞求着……`);\n          }\n          // CFLAG:337  = 5（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM36 二回目：非助手玛奥六档推进',
    },
    {
      desc: 'M4404 COM36 非助手爱慕 CFLAG:337 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}边扭着腰，边发出甜美的，放佛要融化了一般的喘息……`,\n          );\n          // CFLAG:337  = 4（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 4;',
      replace:
        '            `${target_name}边扭着腰，边发出甜美的，放佛要融化了一般的喘息……`,\n          );\n          // CFLAG:337  = 4（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM36 二回目：非助手玛奥六档推进',
    },
    {
      desc: 'M4405 COM36 非助手肛门感觉 CFLAG:337 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:337  = 3（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 3;',
      replace:
        '          );\n          // CFLAG:337  = 3（变量语义：CFLAG 族，337）\n          kojo.骑乘位肛交 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM36 二回目：非助手玛奥六档推进',
    },
    {
      desc: 'M4406 COM36 非助手其余 CFLAG:337 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.骑乘位肛交 = 2;\n        }\n      }\n      return 0;',
      replace:
        '          kojo.骑乘位肛交 = 1;\n        }\n      }\n      return 0;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM36 二回目：非助手玛奥六档推进',
    },
  ],
  {
    desc: 'M4407 COM36 初次助手玛奥条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (kojo.骑乘位肛交 === 0) {
      if (assi_mao) {
        if (era.get(\`talent:\${target}:76\`) === 1) {
          await era.printAndWait(\`「呜啊……啊啊……好，好舒服`,
    replace: `    if (kojo.骑乘位肛交 === 0) {
      if (!assi_mao) {
        if (era.get(\`talent:\${target}:76\`) === 1) {
          await era.printAndWait(\`「呜啊……啊啊……好，好舒服`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM36 初めて：助手玛奥与非助手玛奥三档',
  },
  ...[
    {
      desc: 'M4408 COM37 初次 CFLAG:338 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.肛门侍奉 = 1;\n      return 0;\n    } else {\n      if (assi_mao) {',
      replace:
        '      kojo.肛门侍奉 = 2;\n      return 0;\n    } else {\n      if (assi_mao) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM37 初めて：助手玛奥与非助手玛奥奉仕精神分档',
    },
    {
      desc: 'M4409 COM37 助手淫乱＋奉仕精神 CFLAG:338 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「是啊……最喜欢了${heart(1)} 会一直舔的${heart(1)}」`,\n          );\n          // CFLAG:338  = 5（变量语义：CFLAG 族，338）\n          kojo.肛门侍奉 = 5;',
      replace:
        '            `「是啊……最喜欢了${heart(1)} 会一直舔的${heart(1)}」`,\n          );\n          // CFLAG:338  = 5（变量语义：CFLAG 族，338）\n          kojo.肛门侍奉 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM37 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4410 COM37 助手爱慕＋奉仕精神 CFLAG:338 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「都…都是为了你……才学会这种害羞的事情的啦………${heart(1)}」`,\n          );\n          // CFLAG:338  = 4（变量语义：CFLAG 族，338）\n          kojo.肛门侍奉 = 4;',
      replace:
        '            `「都…都是为了你……才学会这种害羞的事情的啦………${heart(1)}」`,\n          );\n          // CFLAG:338  = 4（变量语义：CFLAG 族，338）\n          kojo.肛门侍奉 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM37 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4411 COM37 助手奉仕精神 CFLAG:338 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「…这种夸奖……一点都不觉得高兴啊！」`);\n          // CFLAG:338  = 3（变量语义：CFLAG 族，338）\n          kojo.肛门侍奉 = 3;',
      replace:
        '          await era.printAndWait(`「…这种夸奖……一点都不觉得高兴啊！」`);\n          // CFLAG:338  = 3（变量语义：CFLAG 族，338）\n          kojo.肛门侍奉 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM37 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4412 COM37 助手其余 CFLAG:338 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.肛门侍奉 = 2;\n        }\n      } else {',
      replace: '          kojo.肛门侍奉 = 1;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM37 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4413 COM37 非助手淫乱＋奉仕精神 CFLAG:338 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}就着自己的口水，仔细地舔舐着${player_name}的肛门，每一处皱褶都舔得干干净净……`,\n          );\n          // CFLAG:338  = 5（变量语义：CFLAG 族，338）\n          kojo.肛门侍奉 = 5;',
      replace:
        '            `${target_name}就着自己的口水，仔细地舔舐着${player_name}的肛门，每一处皱褶都舔得干干净净……`,\n          );\n          // CFLAG:338  = 5（变量语义：CFLAG 族，338）\n          kojo.肛门侍奉 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM37 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4414 COM37 非助手爱慕＋奉仕精神 CFLAG:338 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}用舌尖探入到${player_name}的肛门里，仔细地舔舐着………`,\n          );\n          // CFLAG:338  = 4（变量语义：CFLAG 族，338）\n          kojo.肛门侍奉 = 4;',
      replace:
        '            `${target_name}用舌尖探入到${player_name}的肛门里，仔细地舔舐着………`,\n          );\n          // CFLAG:338  = 4（变量语义：CFLAG 族，338）\n          kojo.肛门侍奉 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM37 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4415 COM37 非助手奉仕精神 CFLAG:338 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.肛门侍奉 = 3;\n        } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「是…是的……我会好好舔的……咕呣……咕呣……」`);',
      replace:
        '          kojo.肛门侍奉 = 2;\n        } else if (kojo.肛门侍奉 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「是…是的……我会好好舔的……咕呣……咕呣……」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM37 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4416 COM37 非助手其余 CFLAG:338 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.肛门侍奉 = 2;\n        }\n      }\n      return 0;',
      replace:
        '          kojo.肛门侍奉 = 1;\n        }\n      }\n      return 0;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM37 二回目：非助手玛奥四档推进',
    },
  ],
  {
    desc: 'M4417 COM37 初次助手玛奥条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `    if (kojo.肛门侍奉 === 0) {
      if (assi_mao) {
        await era.printAndWait(`,
    replace: `    if (kojo.肛门侍奉 === 0) {
      if (!assi_mao) {
        await era.printAndWait(`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM37 初めて：助手玛奥与非助手玛奥奉仕精神分档',
  },
  ...[
    {
      desc: 'M4418 COM40 初次 CFLAG:341 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.打屁股 = 1;',
      replace: 'kojo.打屁股 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM40 初めて：助手玛奥与非助手玛奥分档',
    },
    {
      desc: 'M4419 COM40 助手淫乱＋抖M气质 CFLAG:341 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「啊啊……哎啊……就是这样……姐姐……就是一只母猪性奴啊啊${heart(1)}」`,\n          );\n          // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）\n          kojo.打屁股 = 5;',
      replace:
        '            `「啊啊……哎啊……就是这样……姐姐……就是一只母猪性奴啊啊${heart(1)}」`,\n          );\n          // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）\n          kojo.打屁股 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM40 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4420 COM40 助手爱慕＋抖M气质 CFLAG:341 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「不，不是的，是因为被打了才会……嗯啊啊……」`);\n          // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）\n          kojo.打屁股 = 4;',
      replace:
        '          await era.printAndWait(`「不，不是的，是因为被打了才会……嗯啊啊……」`);\n          // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）\n          kojo.打屁股 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM40 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4421 COM40 助手双刻印 CFLAG:341 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.打屁股 = 3;\n        } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {\n          await era.printAndWait(`『不听话的话还要打哦♪』`);',
      replace:
        '          kojo.打屁股 = 2;\n        } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {\n          await era.printAndWait(`『不听话的话还要打哦♪』`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM40 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4422 COM40 助手其余 CFLAG:341 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.打屁股 = 2;\n        }\n      } else {',
      replace: '          kojo.打屁股 = 1;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM40 二回目：助手玛奥四档推进',
    },
    {
      desc: 'M4423 COM40 非助手淫乱＋抖M气质 CFLAG:341 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}被${player_name}狠狠拍打着屁股，却发出了享受的娇喘……`,\n          );\n          // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）\n          kojo.打屁股 = 5;',
      replace:
        '            `${target_name}被${player_name}狠狠拍打着屁股，却发出了享受的娇喘……`,\n          );\n          // CFLAG:TARGET:341  = 5（变量语义：CFLAG 族，TARGET:341）\n          kojo.打屁股 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM40 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4424 COM40 非助手爱慕＋抖M气质 CFLAG:341 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）\n          kojo.打屁股 = 4;',
      replace:
        '          );\n          // CFLAG:TARGET:341  = 4（变量语义：CFLAG 族，TARGET:341）\n          kojo.打屁股 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM40 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4425 COM40 非助手双刻印 CFLAG:341 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.打屁股 = 3;\n        } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「啊啊啊！好痛……好痛……住手啊啊！！」`);',
      replace:
        '          kojo.打屁股 = 2;\n        } else if (kojo.打屁股 <= 1 && game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「啊啊啊！好痛……好痛……住手啊啊！！」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM40 二回目：非助手玛奥四档推进',
    },
    {
      desc: 'M4426 COM40 非助手其余 CFLAG:341 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.打屁股 = 2;\n        }\n      }\n      return 0;',
      replace:
        '          kojo.打屁股 = 1;\n        }\n      }\n      return 0;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM40 二回目：非助手玛奥四档推进',
    },
  ],
  {
    desc: 'M4427 COM40 初次助手玛奥条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    if (kojo.打屁股 === 0) {\n      if (assi_mao) {',
    replace: '    if (kojo.打屁股 === 0) {\n      if (!assi_mao) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM40 初めて：助手玛奥与非助手玛奥分档',
  },
  ...[
    {
      desc: 'M4428 COM41 初次 CFLAG:342 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.鞭 = 1;',
      replace: 'kojo.鞭 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 初めて：助手玛奥与非助手玛奥三档',
    },
    {
      desc: 'M4429 COM41 助手淫乱＋抖M气质Lv5 CFLAG:342 写错（9 改 8，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}完全沉浸在妹妹施予的痛苦带来的扭曲的受虐快感中……`,\n          );\n          // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 9;',
      replace:
        '            `${target_name}完全沉浸在妹妹施予的痛苦带来的扭曲的受虐快感中……`,\n          );\n          // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 8;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4430 COM41 助手淫乱＋抖M气质Lv3 CFLAG:342 写错（8 改 7，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${player_name}更加兴奋地挥着鞭子狠狠抽打着${target_name}……`,\n          );\n          // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 8;',
      replace:
        '            `${player_name}更加兴奋地挥着鞭子狠狠抽打着${target_name}……`,\n          );\n          // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 7;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4431 COM41 助手淫乱 CFLAG:342 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `而你只是微笑着，欣赏着${player_name}鞭笞着${target_name}的样子……`,\n          );\n          // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 7;',
      replace:
        '            `而你只是微笑着，欣赏着${player_name}鞭笞着${target_name}的样子……`,\n          );\n          // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4432 COM41 助手爱慕＋抖M气质Lv5 CFLAG:342 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${player_name}带着吃惊的表情，更用力地抽打着自己的姐姐………`,\n          );\n          // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 6;',
      replace:
        '            `${player_name}带着吃惊的表情，更用力地抽打着自己的姐姐………`,\n          );\n          // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4433 COM41 助手爱慕＋抖M气质Lv3 CFLAG:342 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 5;',
      replace:
        '          );\n          // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4434 COM41 助手爱慕 CFLAG:342 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`${player_name}更加用力地挥动着鞭子……`);\n          // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 4;',
      replace:
        '          await era.printAndWait(`${player_name}更加用力地挥动着鞭子……`);\n          // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4435 COM41 助手抖M气质 CFLAG:342 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.鞭 = 3;\n        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`『哈哈哈，姐姐变成我的奴隶吧！』`);',
      replace:
        '          kojo.鞭 = 2;\n        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`『哈哈哈，姐姐变成我的奴隶吧！』`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4436 COM41 助手其余 CFLAG:342 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.鞭 = 2;\n        }\n      } else {',
      replace: '          kojo.鞭 = 1;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4437 COM41 非助手淫乱＋抖M气质Lv5 CFLAG:342 写错（9 改 8，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「嗯啊……啊啊啊${heart(1)} 尽，尽情地打我吧${heart(1)} 呜啊啊啊${heart(1)}」`,\n          );\n          // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 9;',
      replace:
        '            `「嗯啊……啊啊啊${heart(1)} 尽，尽情地打我吧${heart(1)} 呜啊啊啊${heart(1)}」`,\n          );\n          // CFLAG:TARGET:342  = 9（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 8;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4438 COM41 非助手淫乱＋抖M气质Lv3 CFLAG:342 写错（8 改 7，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「哈啊……啊啊啊${heart(1)} 再继续打我${heart(1)}」`,\n          );\n          // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 8;',
      replace:
        '            `「哈啊……啊啊啊${heart(1)} 再继续打我${heart(1)}」`,\n          );\n          // CFLAG:TARGET:342  = 8（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 7;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4439 COM41 非助手淫乱 CFLAG:342 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}在鞭子抽打下发出了惨叫，${player_name}却乐在其中地欣赏着……`,\n          );\n          // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 7;',
      replace:
        '            `${target_name}在鞭子抽打下发出了惨叫，${player_name}却乐在其中地欣赏着……`,\n          );\n          // CFLAG:TARGET:342  = 7（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4440 COM41 非助手爱慕＋抖M气质Lv5 CFLAG:342 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「呜哇……啊啊啊${heart(1)} 好痛……但是好舒服啊啊${heart(1)}」`,\n          );\n          // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 6;',
      replace:
        '            `「呜哇……啊啊啊${heart(1)} 好痛……但是好舒服啊啊${heart(1)}」`,\n          );\n          // CFLAG:TARGET:342  = 6（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4441 COM41 非助手爱慕＋抖M气质Lv3 CFLAG:342 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「哈……哈啊……不，不要这样对人家了啊啊……」`);\n          // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 5;',
      replace:
        '          await era.printAndWait(`「哈……哈啊……不，不要这样对人家了啊啊……」`);\n          // CFLAG:TARGET:342  = 5（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4442 COM41 非助手爱慕 CFLAG:342 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 4;',
      replace:
        '          );\n          // CFLAG:TARGET:342  = 4（变量语义：CFLAG 族，TARGET:342）\n          kojo.鞭 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4443 COM41 非助手抖M气质 CFLAG:342 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.鞭 = 3;\n        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「啊啊……饶了我吧……呜啊啊啊！」`);',
      replace:
        '          kojo.鞭 = 2;\n        } else if (kojo.骑乘位 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「啊啊……饶了我吧……呜啊啊啊！」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4444 COM41 非助手其余 CFLAG:342 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.鞭 = 2;\n        }\n      }\n      return 0;',
      replace: '          kojo.鞭 = 1;\n        }\n      }\n      return 0;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM41 二回目：非助手玛奥八档推进',
    },
  ],
  {
    desc: 'M4445 COM41 初次助手玛奥条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    if (kojo.鞭 === 0) {\n      if (assi_mao) {',
    replace: '    if (kojo.鞭 === 0) {\n      if (!assi_mao) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM41 初めて：助手玛奥与非助手玛奥三档',
  },
  ...[
    {
      desc: 'M4446 COM42 初次 CFLAG:343 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.针 = 1;',
      replace: 'kojo.针 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 初めて：助手玛奥与非助手玛奥三档',
    },
    {
      desc: 'M4447 COM42 助手淫乱＋抖M气质Lv5 CFLAG:343 写错（9 改 8，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `已经完全沦为受虐狂的${target_name}被妹妹当成玩具一样肆意虐待着，反而心中涌起了异样的满足与快感……`,\n          );\n          // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 9;',
      replace:
        '            `已经完全沦为受虐狂的${target_name}被妹妹当成玩具一样肆意虐待着，反而心中涌起了异样的满足与快感……`,\n          );\n          // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 8;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4448 COM42 助手淫乱＋抖M气质Lv3 CFLAG:343 写错（8 改 7，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}痛苦的呻吟之中，不知不觉混入了享受的娇喘……`,\n          );\n          // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 8;',
      replace:
        '            `${target_name}痛苦的呻吟之中，不知不觉混入了享受的娇喘……`,\n          );\n          // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 7;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4449 COM42 助手淫乱 CFLAG:343 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「呜……好痛！好痛！不要啊啊！」`);\n          // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 7;',
      replace:
        '          await era.printAndWait(`「呜……好痛！好痛！不要啊啊！」`);\n          // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4450 COM42 助手爱慕＋抖M气质Lv5 CFLAG:343 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `受虐癖在心中完全绽开的${target_name}被妹妹当成玩具一样肆意虐待着，反而心中涌起了异样的满足与快感……`,\n          );\n          // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 6;',
      replace:
        '            `受虐癖在心中完全绽开的${target_name}被妹妹当成玩具一样肆意虐待着，反而心中涌起了异样的满足与快感……`,\n          );\n          // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4451 COM42 助手爱慕＋抖M气质Lv3 CFLAG:343 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}痛苦的呻吟之中，不知不觉混入了享受的娇喘……`,\n          );\n          // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 5;',
      replace:
        '            `${target_name}痛苦的呻吟之中，不知不觉混入了享受的娇喘……`,\n          );\n          // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4452 COM42 助手爱慕 CFLAG:343 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「不，不要，好痛啊啊！好痛！！」`);\n          // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 4;',
      replace:
        '          await era.printAndWait(`「不，不要，好痛啊啊！好痛！！」`);\n          // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4453 COM42 助手抖M气质 CFLAG:343 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.针 = 3;\n        } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`『姐姐淫乱的大胸部，接受惩罚吧♪』`);',
      replace:
        '          kojo.针 = 2;\n        } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`『姐姐淫乱的大胸部，接受惩罚吧♪』`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4454 COM42 助手其余 CFLAG:343 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.针 = 2;\n        }\n      } else {',
      replace: '          kojo.针 = 1;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4455 COM42 非助手淫乱＋抖M气质Lv5 CFLAG:343 写错（9 改 8，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `然而受虐狂的本性驱使下，${target_name}痛苦的呻吟逐渐被享受的娇喘取代……`,\n          );\n          // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 9;',
      replace:
        '            `然而受虐狂的本性驱使下，${target_name}痛苦的呻吟逐渐被享受的娇喘取代……`,\n          );\n          // CFLAG:TARGET:343  = 9（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 8;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4456 COM42 非助手淫乱＋抖M气质Lv3 CFLAG:343 写错（8 改 7，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}被针毫不留情地扎着胸部和下体，但是已经养成受虐癖的身体却愈发的兴奋起来……`,\n          );\n          // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 8;',
      replace:
        '            `${target_name}被针毫不留情地扎着胸部和下体，但是已经养成受虐癖的身体却愈发的兴奋起来……`,\n          );\n          // CFLAG:TARGET:343  = 8（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 7;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4457 COM42 非助手淫乱 CFLAG:343 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 7;',
      replace:
        '          );\n          // CFLAG:TARGET:343  = 7（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4458 COM42 非助手爱慕＋抖M气质Lv5 CFLAG:343 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `已经完全沦为受虐狂的${target_name}却从痛苦中感受到了无上的快感和心理满足……`,\n          );\n          // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 6;',
      replace:
        '            `已经完全沦为受虐狂的${target_name}却从痛苦中感受到了无上的快感和心理满足……`,\n          );\n          // CFLAG:TARGET:343  = 6（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4459 COM42 非助手爱慕＋抖M气质Lv3 CFLAG:343 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}在针刺下悲鸣，颤抖着，但是受虐癖的本性也将这痛苦转化成了异样的快感，渗血的乳头兴奋地坚挺着，下体也湿润了…`,\n          );\n          // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 5;',
      replace:
        '            `${target_name}在针刺下悲鸣，颤抖着，但是受虐癖的本性也将这痛苦转化成了异样的快感，渗血的乳头兴奋地坚挺着，下体也湿润了…`,\n          );\n          // CFLAG:TARGET:343  = 5（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4460 COM42 非助手爱慕 CFLAG:343 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 4;',
      replace:
        '          );\n          // CFLAG:TARGET:343  = 4（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4461 COM42 非助手抖M气质 CFLAG:343 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.针 = 3;\n        } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「呜啊啊！饶……饶命啊……魔王大人……这样，这样真的会死掉的！！」`,',
      replace:
        '          kojo.针 = 2;\n        } else if (kojo.针 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `「呜啊啊！饶……饶命啊……魔王大人……这样，这样真的会死掉的！！」`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4462 COM42 非助手其余 CFLAG:343 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 2;',
      replace:
        '          );\n          // CFLAG:TARGET:343  = 2（变量语义：CFLAG 族，TARGET:343）\n          kojo.针 = 1;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM42 二回目：非助手玛奥八档推进',
    },
  ],
  {
    desc: 'M4463 COM42 初次助手玛奥条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    if (kojo.针 === 0) {\n      if (assi_mao) {',
    replace: '    if (kojo.针 === 0) {\n      if (!assi_mao) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM42 初めて：助手玛奥与非助手玛奥三档',
  },
  ...[
    {
      desc: 'M4464 COM43 装上初次 CFLAG 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        await era.printAndWait(`「这，这是要做什么？！」`);\n      }\n      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）\n      kojo.眼罩 = 1;',
      replace:
        '        await era.printAndWait(`「这，这是要做什么？！」`);\n      }\n      // CFLAG:TARGET:344  = 1（变量语义：CFLAG 族，TARGET:344）\n      kojo.眼罩 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM43 装上初めて：淫乱、爱慕与其余三档',
    },
    {
      desc: 'M4465 COM43 装上淫乱＋抖M气质Lv5 CFLAG 写错（9 改 8，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        );\n        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）\n        kojo.眼罩 = 9;',
      replace:
        '        );\n        // CFLAG:TARGET:344  = 9（变量语义：CFLAG 族，TARGET:344）\n        kojo.眼罩 = 8;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM43 装上二回目：八档推进',
    },
    {
      desc: 'M4466 COM43 装上淫乱＋抖M气质Lv3 CFLAG 写错（8 改 7，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        );\n        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）\n        kojo.眼罩 = 8;',
      replace:
        '        );\n        // CFLAG:TARGET:344  = 8（变量语义：CFLAG 族，TARGET:344）\n        kojo.眼罩 = 7;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM43 装上二回目：八档推进',
    },
    {
      desc: 'M4467 COM43 装上淫乱 CFLAG 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        await era.printAndWait(`「咦咦……魔王大人是想出了什么新玩法吗？」`);\n        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）\n        kojo.眼罩 = 7;',
      replace:
        '        await era.printAndWait(`「咦咦……魔王大人是想出了什么新玩法吗？」`);\n        // CFLAG:TARGET:344  = 7（变量语义：CFLAG 族，TARGET:344）\n        kojo.眼罩 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM43 装上二回目：八档推进',
    },
    {
      desc: 'M4468 COM43 装上爱慕＋抖M气质Lv5 CFLAG 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        );\n        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）\n        kojo.眼罩 = 6;',
      replace:
        '        );\n        // CFLAG:TARGET:344  = 6（变量语义：CFLAG 族，TARGET:344）\n        kojo.眼罩 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM43 装上二回目：八档推进',
    },
    {
      desc: 'M4469 COM43 装上爱慕＋抖M气质Lv3 CFLAG 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        await era.printAndWait(`「哈，哈啊……心扑通扑通的，跳得好快……♪」`);\n        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）\n        kojo.眼罩 = 5;',
      replace:
        '        await era.printAndWait(`「哈，哈啊……心扑通扑通的，跳得好快……♪」`);\n        // CFLAG:TARGET:344  = 5（变量语义：CFLAG 族，TARGET:344）\n        kojo.眼罩 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM43 装上二回目：八档推进',
    },
    {
      desc: 'M4470 COM43 装上爱慕 CFLAG 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        );\n        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）\n        kojo.眼罩 = 4;',
      replace:
        '        );\n        // CFLAG:TARGET:344  = 4（变量语义：CFLAG 族，TARGET:344）\n        kojo.眼罩 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM43 装上二回目：八档推进',
    },
    {
      desc: 'M4471 COM43 装上抖M气质 CFLAG 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        kojo.眼罩 = 3;\n      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {\n        await era.printAndWait(`「才，才不会害怕呢……」`);',
      replace:
        '        kojo.眼罩 = 2;\n      } else if (kojo.眼罩 <= 1 || game.kojo.口上开关 === 2) {\n        await era.printAndWait(`「才，才不会害怕呢……」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM43 装上二回目：八档推进',
    },
    {
      desc: 'M4472 COM43 装上其余 CFLAG 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '        await era.printAndWait(`「才，才不会害怕呢……」`);\n        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）\n        kojo.眼罩 = 2;',
      replace:
        '        await era.printAndWait(`「才，才不会害怕呢……」`);\n        // CFLAG:TARGET:344  = 2（变量语义：CFLAG 族，TARGET:344）\n        kojo.眼罩 = 1;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM43 装上二回目：八档推进',
    },
    {
      desc: 'M4473 COM43 取下淫乱 CFLAG 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.眼罩着脱 = 3;',
      replace: 'kojo.眼罩着脱 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM43 取下：淫乱、爱慕与其余三档推进',
    },
    {
      desc: 'M4474 COM43 取下爱慕 CFLAG 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.眼罩着脱 = 2;',
      replace: 'kojo.眼罩着脱 = 1;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM43 取下：淫乱、爱慕与其余三档推进',
    },
    {
      desc: 'M4475 COM43 取下其余 CFLAG 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.眼罩着脱 = 1;',
      replace: 'kojo.眼罩着脱 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM43 取下：淫乱、爱慕与其余三档推进',
    },
  ],
  {
    desc: 'M4476 COM43 装上条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  if (era_flag.selectcom === 43 && era0(\`tequip:\${target}:43\`) !== 0) {`,
    replace: `  if (era_flag.selectcom === 43 && era0(\`tequip:\${target}:43\`) === 0) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM43 装上初めて：淫乱、爱慕与其余三档',
  },
  ...[
    {
      desc: 'M4477 COM44 装上初次 CFLAG 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.绳子 = 1;',
      replace: 'kojo.绳子 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上初めて：助手玛奥与非助手玛奥三档',
    },
    {
      desc: 'M4478 COM44 助手档9 CFLAG 写错（9 改 8，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${player_name}哼笑着，继续用绳子将${target_name}的四肢反绑起来，吊在调教室中间……`,\n          );\n          // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 9;',
      replace:
        '            `${player_name}哼笑着，继续用绳子将${target_name}的四肢反绑起来，吊在调教室中间……`,\n          );\n          // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 8;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4479 COM44 助手档8 CFLAG 写错（8 改 7，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「感觉什么的……才没有呢……哈啊${heart(1)}」`);\n          // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 8;',
      replace:
        '          await era.printAndWait(`「感觉什么的……才没有呢……哈啊${heart(1)}」`);\n          // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 7;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4480 COM44 助手档7 CFLAG 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「好，好痛……轻一点啦，${player_name}」`);\n          // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 7;',
      replace:
        '          await era.printAndWait(`「好，好痛……轻一点啦，${player_name}」`);\n          // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4481 COM44 助手档6 CFLAG 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `「啊……嗯啊啊……不，不要这样玩了啦${heart(1)}！」`,\n          );\n          // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 6;',
      replace:
        '            `「啊……嗯啊啊……不，不要这样玩了啦${heart(1)}！」`,\n          );\n          // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4482 COM44 助手档5 CFLAG 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「什……什么啦……哪有兴奋什么的！」`);\n          // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 5;',
      replace:
        '          await era.printAndWait(`「什……什么啦……哪有兴奋什么的！」`);\n          // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4483 COM44 助手档4 CFLAG 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「绳子……太紧了……只感觉痛而已啦！」`);\n          // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 4;',
      replace:
        '          await era.printAndWait(`「绳子……太紧了……只感觉痛而已啦！」`);\n          // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4484 COM44 助手档3 CFLAG 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「不，不要……说这种话了……快点放姐姐下来！」`);\n          // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 3;',
      replace:
        '          await era.printAndWait(`「不，不要……说这种话了……快点放姐姐下来！」`);\n          // CFLAG:TARGET:345  = 3（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4485 COM44 助手档2 CFLAG 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.绳子 = 2;\n        }\n      } else {',
      replace: '          kojo.绳子 = 1;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：助手玛奥八档推进',
    },
    {
      desc: 'M4486 COM44 非助手档9 CFLAG 写错（9 改 8，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `被${player_name}用绳子捆住四肢，展露着下体的${target_name}只能一扭一扭地呻吟着，渴求着侵犯和调教……`,\n          );\n          // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 9;',
      replace:
        '            `被${player_name}用绳子捆住四肢，展露着下体的${target_name}只能一扭一扭地呻吟着，渴求着侵犯和调教……`,\n          );\n          // CFLAG:TARGET:345  = 9（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 8;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4487 COM44 非助手档8 CFLAG 写错（8 改 7，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 8;',
      replace:
        '          );\n          // CFLAG:TARGET:345  = 8（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 7;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4488 COM44 非助手档7 CFLAG 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 7;',
      replace:
        '          );\n          // CFLAG:TARGET:345  = 7（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4489 COM44 非助手档6 CFLAG 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${player_name}用绳子捆住四肢，展露着下体的${target_name}扭动着身体，感受着绳子摩擦着身体的敏感点……`,\n          );\n          // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 6;',
      replace:
        '            `${player_name}用绳子捆住四肢，展露着下体的${target_name}扭动着身体，感受着绳子摩擦着身体的敏感点……`,\n          );\n          // CFLAG:TARGET:345  = 6（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4490 COM44 非助手档5 CFLAG 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 5;',
      replace:
        '          );\n          // CFLAG:TARGET:345  = 5（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4491 COM44 非助手档4 CFLAG 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 4;',
      replace:
        '          );\n          // CFLAG:TARGET:345  = 4（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4492 COM44 非助手档3 CFLAG 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.绳子 = 3;\n        } else if (kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「放，放开我啊啊……捆绑什么的，超讨厌啊！」`);',
      replace:
        '          kojo.绳子 = 2;\n        } else if (kojo.绳子 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「放，放开我啊啊……捆绑什么的，超讨厌啊！」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4493 COM44 非助手档2 CFLAG 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 2;',
      replace:
        '          );\n          // CFLAG:TARGET:345  = 2（变量语义：CFLAG 族，TARGET:345）\n          kojo.绳子 = 1;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 装上二回目：非助手玛奥八档推进',
    },
    {
      desc: 'M4494 COM44 取下淫乱 CFLAG 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.绳子着脱 = 2;\n    } else if (\n      era.get(`talent:${target}:85`) === 1 &&',
      replace:
        '      kojo.绳子着脱 = 1;\n    } else if (\n      era.get(`talent:${target}:85`) === 1 &&',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 取下：淫乱、爱慕与其余三档推进',
    },
    {
      desc: 'M4495 COM44 取下爱慕 CFLAG 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '      kojo.绳子着脱 = 2;\n    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 === 2) {',
      replace:
        '      kojo.绳子着脱 = 1;\n    } else if (kojo.绳子着脱 < 1 || game.kojo.口上开关 === 2) {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 取下：淫乱、爱慕与其余三档推进',
    },
    {
      desc: 'M4496 COM44 取下其余 CFLAG 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.绳子着脱 = 1;',
      replace: 'kojo.绳子着脱 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM44 取下：淫乱、爱慕与其余三档推进',
    },
  ],
  {
    desc: 'M4497 COM44 初次助手玛奥条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '    if (kojo.绳子 === 0) {\n      if (assi_mao) {',
    replace: '    if (kojo.绳子 === 0) {\n      if (!assi_mao) {',
    tests: ['kojo-k11-lily'],
    must_mention: 'COM44 装上初めて：助手玛奥与非助手玛奥三档',
  },
  ...[
    {
      desc: 'M4498 COM45 装上初次 CFLAG 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.口塞 = 1;',
      replace: 'kojo.口塞 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM45 装上初めて：淫乱、爱慕与其余三档',
    },
    {
      desc: 'M4499 COM45 装上档9 CFLAG 写错（9 改 8，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.口塞 = 9;',
      replace: 'kojo.口塞 = 8;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM45 装上二回目：八档推进',
    },
    {
      desc: 'M4500 COM45 装上档8 CFLAG 写错（8 改 7，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.口塞 = 8;',
      replace: 'kojo.口塞 = 7;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM45 装上二回目：八档推进',
    },
    {
      desc: 'M4501 COM45 装上档7 CFLAG 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.口塞 = 7;',
      replace: 'kojo.口塞 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM45 装上二回目：八档推进',
    },
    {
      desc: 'M4502 COM45 装上档6 CFLAG 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.口塞 = 6;',
      replace: 'kojo.口塞 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM45 装上二回目：八档推进',
    },
    {
      desc: 'M4503 COM45 装上档5 CFLAG 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.口塞 = 5;',
      replace: 'kojo.口塞 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM45 装上二回目：八档推进',
    },
    {
      desc: 'M4504 COM45 装上档4 CFLAG 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.口塞 = 4;',
      replace: 'kojo.口塞 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM45 装上二回目：八档推进',
    },
    {
      desc: 'M4505 COM45 装上档3 CFLAG 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.口塞 = 3;',
      replace: 'kojo.口塞 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM45 装上二回目：八档推进',
    },
    {
      desc: 'M4506 COM45 装上档2 CFLAG 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.口塞 = 2;',
      replace: 'kojo.口塞 = 1;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM45 装上二回目：八档推进',
    },
    {
      desc: 'M4507 COM45 取下淫乱 CFLAG 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.口塞着脱 = 3;',
      replace: 'kojo.口塞着脱 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM45 取下：淫乱、爱慕与其余三档推进',
    },
    {
      desc: 'M4508 COM45 取下爱慕 CFLAG 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.口塞着脱 = 2;',
      replace: 'kojo.口塞着脱 = 1;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM45 取下：淫乱、爱慕与其余三档推进',
    },
    {
      desc: 'M4509 COM45 取下其余 CFLAG 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.口塞着脱 = 1;',
      replace: 'kojo.口塞着脱 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM45 取下：淫乱、爱慕与其余三档推进',
    },
  ],
  {
    desc: 'M4510 COM45 装上条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  if (era_flag.selectcom === 45 && era0(\`tequip:\${target}:45\`) !== 0) {`,
    replace: `  if (era_flag.selectcom === 45 && era0(\`tequip:\${target}:45\`) === 0) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM45 装上初めて：淫乱、爱慕与其余三档',
  },
  ...[
    {
      desc: 'M4511 COM46 初次 CFLAG:347 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.灌肠肛塞 = 1;',
      replace: 'kojo.灌肠肛塞 = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM46 装上初めて：助手玛奥与非助手玛奥三档',
    },
    {
      desc: 'M4512 COM46 助手档7 CFLAG:347 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}抱着自己胀起的小腹，拼命忍耐着排泄欲，内心却更加兴奋了……`,\n          );\n          // CFLAG:347  = 7（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 7;',
      replace:
        '            `${target_name}抱着自己胀起的小腹，拼命忍耐着排泄欲，内心却更加兴奋了……`,\n          );\n          // CFLAG:347  = 7（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM46 装上二回目：助手玛奥六档推进',
    },
    {
      desc: 'M4513 COM46 助手档6 CFLAG:347 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${player_name}恶意地笑着，边玩弄着肛塞，边看着${target_name}拼命忍耐着排泄欲的样子……`,\n          );\n          // CFLAG:347  = 6（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 6;',
      replace:
        '            `${player_name}恶意地笑着，边玩弄着肛塞，边看着${target_name}拼命忍耐着排泄欲的样子……`,\n          );\n          // CFLAG:347  = 6（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM46 装上二回目：助手玛奥六档推进',
    },
    {
      desc: 'M4514 COM46 助手档5 CFLAG:347 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}光是想象着妹妹描述的场景，就已经面红耳赤，排泄欲更加强烈了，身体却愈发地兴奋……`,\n          );\n          // CFLAG:347  = 5（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 5;',
      replace:
        '            `${target_name}光是想象着妹妹描述的场景，就已经面红耳赤，排泄欲更加强烈了，身体却愈发地兴奋……`,\n          );\n          // CFLAG:347  = 5（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM46 装上二回目：助手玛奥六档推进',
    },
    {
      desc: 'M4515 COM46 助手档4 CFLAG:347 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${player_name}坏笑着，边玩弄着肛塞，欣赏着${target_name}拼命忍耐着排泄欲的样子……`,\n          );\n          // CFLAG:347  = 4（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 4;',
      replace:
        '            `${player_name}坏笑着，边玩弄着肛塞，欣赏着${target_name}拼命忍耐着排泄欲的样子……`,\n          );\n          // CFLAG:347  = 4（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM46 装上二回目：助手玛奥六档推进',
    },
    {
      desc: 'M4516 COM46 助手档3 CFLAG:347 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.灌肠肛塞 = 3;\n        } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `『哎呀呀，姐姐满头大汗了，已经充分感觉到灌肠的舒服了呢』`,',
      replace:
        '          kojo.灌肠肛塞 = 2;\n        } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(\n            `『哎呀呀，姐姐满头大汗了，已经充分感觉到灌肠的舒服了呢』`,',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM46 装上二回目：助手玛奥六档推进',
    },
    {
      desc: 'M4517 COM46 助手档2 CFLAG:347 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.灌肠肛塞 = 2;\n        }\n      } else {',
      replace: '          kojo.灌肠肛塞 = 1;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM46 装上二回目：助手玛奥六档推进',
    },
    {
      desc: 'M4518 COM46 非助手档7 CFLAG:347 写错（7 改 6，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}在痛苦与快感的交织中摇晃着臀部，肛塞上的铃铛也随之响了起来……`,\n          );\n          // CFLAG:347  = 7（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 7;',
      replace:
        '            `${target_name}在痛苦与快感的交织中摇晃着臀部，肛塞上的铃铛也随之响了起来……`,\n          );\n          // CFLAG:347  = 7（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 6;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM46 装上二回目：非助手玛奥六档推进',
    },
    {
      desc: 'M4519 COM46 非助手档6 CFLAG:347 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，她还得忍上好一会儿呢……`,\n          );\n          // CFLAG:347  = 6（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 6;',
      replace:
        '            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，她还得忍上好一会儿呢……`,\n          );\n          // CFLAG:347  = 6（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM46 装上二回目：非助手玛奥六档推进',
    },
    {
      desc: 'M4520 COM46 非助手档5 CFLAG:347 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}感受着灌肠液在体内的肆虐，不住地呻吟着，然而在震动肛塞刺激下抽搐着的肛门，却不住地传来快感…`,\n          );\n          // CFLAG:347  = 5（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 5;',
      replace:
        '            `${target_name}感受着灌肠液在体内的肆虐，不住地呻吟着，然而在震动肛塞刺激下抽搐着的肛门，却不住地传来快感…`,\n          );\n          // CFLAG:347  = 5（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM46 装上二回目：非助手玛奥六档推进',
    },
    {
      desc: 'M4521 COM46 非助手档4 CFLAG:347 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，她还得忍上好一会儿呢……`,\n          );\n          // CFLAG:347  = 4（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 4;',
      replace:
        '            `${target_name}开始感受着灌肠液在体内肆虐的痛苦，不过，游戏才刚刚开始，她还得忍上好一会儿呢……`,\n          );\n          // CFLAG:347  = 4（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM46 装上二回目：非助手玛奥六档推进',
    },
    {
      desc: 'M4522 COM46 非助手档3 CFLAG:347 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.灌肠肛塞 = 3;\n        } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「呜……呜呜……求，求你了，让我上厕所吧…」`);',
      replace:
        '          kojo.灌肠肛塞 = 2;\n        } else if (kojo.灌肠肛塞 <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「呜……呜呜……求，求你了，让我上厕所吧…」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM46 装上二回目：非助手玛奥六档推进',
    },
    {
      desc: 'M4523 COM46 非助手档2 CFLAG:347 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:347  = 2（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 2;',
      replace:
        '          );\n          // CFLAG:347  = 2（变量语义：CFLAG 族，347）\n          kojo.灌肠肛塞 = 1;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM46 装上二回目：非助手玛奥六档推进',
    },
  ],
  {
    desc: 'M4524 COM46 装上条件取反（#242）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: `  if (era_flag.selectcom === 46 && era0(\`tequip:\${target}:46\`) !== 0) {`,
    replace: `  if (era_flag.selectcom === 46 && era0(\`tequip:\${target}:46\`) === 0) {`,
    tests: ['kojo-k11-lily'],
    must_mention: 'COM46 装上初めて：助手玛奥与非助手玛奥三档',
  },
  ...[
    {
      desc: 'M4525 COM55 初次 CFLAG:356 写错（1 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: 'kojo.放置PLAY = 1;',
      replace: 'kojo.放置PLAY = 2;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM55 初めて：淫乱、爱慕与其余三档',
    },
    {
      desc: 'M4526 COM55 助手档6 CFLAG:356 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}体内的欲火被妹妹燎拨着，燃烧得更旺了……`,\n          );\n          // CFLAG:356  = 6（变量语义：CFLAG 族，356）\n          kojo.放置PLAY = 6;',
      replace:
        '            `${target_name}体内的欲火被妹妹燎拨着，燃烧得更旺了……`,\n          );\n          // CFLAG:356  = 6（变量语义：CFLAG 族，356）\n          kojo.放置PLAY = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM55 二回目：助手玛奥五档推进',
    },
    {
      desc: 'M4527 COM55 助手档5 CFLAG:356 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          );\n          // CFLAG:356  = 5（变量语义：CFLAG 族，356）\n          kojo.放置PLAY = 5;',
      replace:
        '          );\n          // CFLAG:356  = 5（变量语义：CFLAG 族，356）\n          kojo.放置PLAY = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM55 二回目：助手玛奥五档推进',
    },
    {
      desc: 'M4528 COM55 助手档4 CFLAG:356 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `${target_name}体内的欲火被妹妹用眼神和语言燎拨着，燃烧得更旺了……`,\n          );\n          // CFLAG:356  = 4（变量语义：CFLAG 族，356）\n          kojo.放置PLAY = 4;',
      replace:
        '            `${target_name}体内的欲火被妹妹用眼神和语言燎拨着，燃烧得更旺了……`,\n          );\n          // CFLAG:356  = 4（变量语义：CFLAG 族，356）\n          kojo.放置PLAY = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM55 二回目：助手玛奥五档推进',
    },
    {
      desc: 'M4529 COM55 助手档3 CFLAG:356 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.放置PLAY = 3;\n        } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`『哎呀，别用那样的眼神瞪我嘛……』`);',
      replace:
        '          kojo.放置PLAY = 2;\n        } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`『哎呀，别用那样的眼神瞪我嘛……』`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM55 二回目：助手玛奥五档推进',
    },
    {
      desc: 'M4530 COM55 助手档2 CFLAG:356 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.放置PLAY = 2;\n        }\n      } else {',
      replace: '          kojo.放置PLAY = 1;\n        }\n      } else {',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM55 二回目：助手玛奥五档推进',
    },
    {
      desc: 'M4531 COM55 非助手档6 CFLAG:356 写错（6 改 5，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `欲火难耐的${target_name}焦躁地摇摆着身体，诱惑着${player_name}，渴求着调教和侵犯……`,\n          );\n          // CFLAG:356  = 6（变量语义：CFLAG 族，356）\n          kojo.放置PLAY = 6;',
      replace:
        '            `欲火难耐的${target_name}焦躁地摇摆着身体，诱惑着${player_name}，渴求着调教和侵犯……`,\n          );\n          // CFLAG:356  = 6（变量语义：CFLAG 族，356）\n          kojo.放置PLAY = 5;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM55 二回目：非助手玛奥五档推进',
    },
    {
      desc: 'M4532 COM55 非助手档5 CFLAG:356 写错（5 改 4，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「啊……啊……不，不会就这么结束了吧？」`);\n          // CFLAG:356  = 5（变量语义：CFLAG 族，356）\n          kojo.放置PLAY = 5;',
      replace:
        '          await era.printAndWait(`「啊……啊……不，不会就这么结束了吧？」`);\n          // CFLAG:356  = 5（变量语义：CFLAG 族，356）\n          kojo.放置PLAY = 4;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM55 二回目：非助手玛奥五档推进',
    },
    {
      desc: 'M4533 COM55 非助手档4 CFLAG:356 写错（4 改 3，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '            `欲火难耐的${target_name}不断地自言自语着，然而渴望的视线却一直投向${player_name}……`,\n          );\n          // CFLAG:356  = 4（变量语义：CFLAG 族，356）\n          kojo.放置PLAY = 4;',
      replace:
        '            `欲火难耐的${target_name}不断地自言自语着，然而渴望的视线却一直投向${player_name}……`,\n          );\n          // CFLAG:356  = 4（变量语义：CFLAG 族，356）\n          kojo.放置PLAY = 3;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM55 二回目：非助手玛奥五档推进',
    },
    {
      desc: 'M4534 COM55 非助手档3 CFLAG:356 写错（3 改 2，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          kojo.放置PLAY = 3;\n        } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「别，别用那样的眼神看人家……」`);',
      replace:
        '          kojo.放置PLAY = 2;\n        } else if (kojo.放置PLAY <= 1 || game.kojo.口上开关 === 2) {\n          await era.printAndWait(`「别，别用那样的眼神看人家……」`);',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM55 二回目：非助手玛奥五档推进',
    },
    {
      desc: 'M4535 COM55 非助手档2 CFLAG:356 写错（2 改 1，#242）',
      file: 'ere/kojo/kojo-k11-lily.js',
      find: '          await era.printAndWait(`「别，别用那样的眼神看人家……」`);\n          // CFLAG:356  = 2（变量语义：CFLAG 族，356）\n          kojo.放置PLAY = 2;',
      replace:
        '          await era.printAndWait(`「别，别用那样的眼神看人家……」`);\n          // CFLAG:356  = 2（变量语义：CFLAG 族，356）\n          kojo.放置PLAY = 1;',
      tests: ['kojo-k11-lily'],
      must_mention: 'COM55 二回目：非助手玛奥五档推进',
    },
  ],
  {
    desc: 'M2273 K10 EVENTTRAIN 自身检查①口上开关条件反转（<=0 改 >0，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: "  const time_word = era_flag.time == 0 ? '今日' : '今夜'; // 「TIME == 0 ? 今日 # 今夜」三目（K7 先例，page-main-menu.js 的 TIME 惯例）\n\n  if ((game.kojo.口上开关 || 0) <= 0) {\n    return 0;\n  }",
    replace:
      "  const time_word = era_flag.time == 0 ? '今日' : '今夜'; // 「TIME == 0 ? 今日 # 今夜」三目（K7 先例，page-main-menu.js 的 TIME 惯例）\n\n  if ((game.kojo.口上开关 || 0)> 0) {  // 变异\n    return 0;\n  }",
    tests: ['kojo-k10-club'],
    must_mention: '自身检查①口上开关',
  },
    desc: 'M2274 K10 EVENTTRAIN 自身检查②TALENT:170 条件反转（!=1 改 ==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (era.get(`talent:${target}:170`) != 1) {\n    return 0;\n  }\n\n  if (era.get(`talent:${target}:121`) != 1) {',
    replace:
      '  if (era.get(`talent:${target}:170`) == 1) {  // 变异\n    return 0;\n  }\n\n  if (era.get(`talent:${target}:121`) != 1) {',

    tests: ['kojo-k10-club'],
    must_mention: '自身双检查',
  },
  {
    desc: 'M2275 K10 EVENTTRAIN 自身检查③TALENT:121 条件反转（!=1 改 ==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: `  if (era.get(\`talent:\${target}:121\`) != 1) {`,
    replace: `  if (era.get(\`talent:\${target}:121\`) == 1) {  // 变异`,
    tests: ['kojo-k10-club'],
    must_mention: '自身双检查',
  },
  {
    desc: 'M2276 K10 初调教==0 魔族分档推进值写错（=1 改 2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '    // CFLAG:201  = 1（变量语义：CFLAG 族，201）\n    chara(target).kojo.初调教 = 1;\n    return 1;',
    replace:
      '    // CFLAG:201  = 1（变量语义：CFLAG 族，201）\n    chara(target).kojo.初调教 = 2; // （变异）\n    return 1;',

    tests: ['kojo-k10-club'],
    must_mention: '魔族分档',
  },
  {
    desc: 'M2277 K10 初调教==0 魔族化标记写错（=1 改 2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '      // CFLAG:370  = 1（变量语义：CFLAG 族，370）\n      chara(target).kojo.魔族化 = 1;',
    replace:
      '      // CFLAG:370  = 1（变量语义：CFLAG 族，370）\n      chara(target).kojo.魔族化 = 2; // （变异）',
    tests: ['kojo-k10-club'],
    must_mention: '魔族分档',
  },
  {
    desc: 'M2278 K10 屈服刻印 Lv1 推进值写错（初调教=2 改 3，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '    // CFLAG:201  = 2（变量语义：CFLAG 族，201）\n    chara(target).kojo.初调教 = 2;',
    replace:
      '    // CFLAG:201  = 2（变量语义：CFLAG 族，201）\n    chara(target).kojo.初调教 = 3; // （变异）',
    tests: ['kojo-k10-club'],
    must_mention: '屈服刻印 Lv1',
  },
  {
    desc: 'M2279 K10 屈服刻印 Lv1 条件改错（初调教<2 改 <1，#241）',
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
    desc: 'M2280 K10 K10_KOJO2 崩坏分档检查改错（TALENT:9==1 改 ==0，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (era.get(`talent:${target}:9`) == 1 && game.kojo.口上开关 == 2) {\n    era.drawLine();\n    await era.printAndWait(`「啊……啊啊…啊………」`);',
    replace:
      '  if (era.get(`talent:${target}:9`) == 0 && game.kojo.口上开关 == 2) {  // 变异\n    era.drawLine();\n    await era.printAndWait(`「啊……啊啊…啊………」`);',
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
    desc: 'M2282 K10 K10_KOJO2 MARK:3==3 条件改错（==3 改 ==2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '    if (era.get(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {\n      await era.printAndWait(\n        `「诶 那个…抱歉哦、是来找我做令人舒服的事情吗？」打开门${target_name}一副半梦半醒的样子，头发也乱糟糟的翘起了一堆呆毛`,',
    replace:
      '    if (era.get(`mark:${target}:3`) == 2 && game.kojo.口上开关 == 2) {  // 变异\n      await era.printAndWait(\n        `「诶 那个…抱歉哦、是来找我做令人舒服的事情吗？」打开门${target_name}一副半梦半醒的样子，头发也乱糟糟的翘起了一堆呆毛`,',
    tests: ['kojo-k10-club'],
    must_mention: 'glasses_word',
  },
  {
    desc: 'M2283 K10 KOJO_MESSAGE_COM_10 头部检查①ASSI&&ASSIPLAY 条件删松（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (era_flag.assi > 0 && era_flag.assiplay) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {',
    replace:
      '  if (era_flag.assi > 0 &&!era_flag.assiplay) {  // 变异\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {',
    tests: ['kojo-k10-club'],
    must_mention: '头部第 1 道检查',
  },
  {
    desc: 'M2284 K10 KOJO_MESSAGE_COM_10 头部检查②TEQUIP:45 条件改错（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {\n    return 0;\n  }',
    replace:
      '  if (era.get(`tequip:${target}:46`) && era_flag.selectcom != 45) {  // 变异\n    return 0;\n  }',

    tests: ['kojo-k10-club'],
    must_mention: '头部第 2 道检查',
  },
  {
    desc: 'M2285 K10 KOJO_MESSAGE_COM_10 头部检查③失神条件反转（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (game.train.失神) {\n    // TFLAG:899（跨域读走门面）\n    return 0;\n  }',
    replace:
      '  if (!game.train.失神) {  // 变异\n    // TFLAG:899（跨域读走门面）\n    return 0;\n  }',
    tests: ['kojo-k10-club'],
    must_mention: '头部第 3 道检查',
  },
  {
    desc: 'M2286 K10 KOJO_MESSAGE_COM_10 头部检查④TEQUIP:89 分发对象改错（DOG 改 COLOSSEUM，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (era.get(`tequip:${target}:89`)) {\n    await dog_kojo_10(rand_n);\n    return 0;\n  }',
    replace:
      '  if (era.get(`tequip:${target}:89`)) {\n    await colosseum_kojo_10(rand_n); // 变异：调用对象改错\n    return 0;\n  }',
    tests: ['kojo-k10-club'],
    must_mention: 'DOG_KOJO_10 真身',
  },
  {
    desc: 'M2287 K10 KOJO_MESSAGE_COM_10 头部检查⑤TEQUIP:55 分发对象改错（COLOSSEUM 改 DOG，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (era.get(`tequip:${target}:55`)) {\n    await colosseum_kojo_10(rand_n);\n    return 0;\n  }',
    replace:
      '  if (era.get(`tequip:${target}:55`)) {\n    await dog_kojo_10(rand_n); // 变异：调用对象改错\n    return 0;\n  }',
    tests: ['kojo-k10-club'],
    must_mention: 'COLOSSEUM_KOJO_10 真身',
  },
  {
    desc: 'M2288 K10 KOJO_MESSAGE_COM_10 头部检查⑥TALENT:9 崩坏条件反转（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (era.get(`talent:${target}:9`) == 1) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:90`)) {',
    replace:
      '  if (era.get(`talent:${target}:9`) == 0) {  // 变异\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:90`)) {',
    tests: ['kojo-k10-club'],
    must_mention: '头部第 6 道检查',
  },
  {
    desc: 'M2289 K10 KOJO_MESSAGE_COM_10 头部检查⑦TEQUIP:90 条件反转（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (era.get(`tequip:${target}:90`)) {\n    return 0;\n  }\n\n  if (era_flag.selectcom == 0) {',
    replace:
      '  if (!era.get(`tequip:${target}:90`)) {  // 变异\n    return 0;\n  }\n\n  if (era_flag.selectcom == 0) {',
    tests: ['kojo-k10-club'],
    must_mention: '头部第 7 道检查',
  },
  {
    desc: 'M2290 K10 SELECTCOM==0 爱抚初回推进值写错（CFLAG:301=1 改 2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 1;\n      return 0;',
    replace:
      '      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 2; // （变异）\n      return 0;',
    tests: ['kojo-k10-club'],
    must_mention: 'MARK:2>=2 分档',
  },
  {
    desc: 'M2291 K10 SELECTCOM==0 爱抚初回条件改错（MARK:2>=2 改 >=3，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '      if (era.get(`mark:${target}:2`) >= 2) {\n        await era.printAndWait(\n          `「啊～…嗯~…更、嗯更多的揉那里也可以哟…啊…就是这样」`,\n        );',
    replace:
      '      if (era.get(`mark:${target}:2`) >= 3) {  // 变异\n        await era.printAndWait(\n          `「啊～…嗯~…更、嗯更多的揉那里也可以哟…啊…就是这样」`,\n        );',
    tests: ['kojo-k10-club'],
    must_mention: 'MARK:2>=2 分档',
  },
  {
    desc: 'M2292 K10 SELECTCOM==87 穿环 p 位条件换错（&穿环状态 位条件改错，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '      } else if (era.get(`talent:${target}:76`) == 1) {\n        if (chara(target).train.穿环状态 & p) {\n          await era.printAndWait(`「咕～…啊啊～！」`);',
    replace:
      '      } else if (era.get(`talent:${target}:76`) == 1) {\n        if (chara(target).train.穿环状态 &(p + 1)) {  // 变异\n          await era.printAndWait(`「咕～…啊啊～！」`);',
    tests: ['kojo-k10-club'],
    must_mention: '跨模块存活态',
  },
  {
    desc: 'M2293 K10 TEQUIP:55 分发（COLOSSEUM_KOJO_10）SELECTCOM==55 体力条件反转（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '    if (era.get(`base:${target}:1`) <= 0) {\n      await era.printAndWait(`${target_name}连站立的力气都没有了……`);',
    replace:
      '    if (era.get(`base:${target}:1`) > 0) {  // 变异\n      await era.printAndWait(`${target_name}连站立的力气都没有了……`);',
    tests: ['kojo-k10-club'],
    must_mention: 'COLOSSEUM_KOJO_10 真身',
  },
  {
    desc: 'M2294 K10 KOJO_MESSAGE_PALAMCNG_10 头部检查①ASSI&&ASSIPLAY 条件反转（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%\n  void rand;\n\n  if (era_flag.assi > 0 && era_flag.assiplay) {\n    return 0;\n  }',
    replace:
      '  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%\n  void rand;\n\n  if (era_flag.assi > 0 && !era_flag.assiplay) {  // 变异\n    return 0;\n  }',
    tests: ['kojo-k10-club'],
    must_mention: '头部检查①ASSI&&ASSIPLAY 静默跳过',
  },
  {
    desc: 'M2295 K10 KOJO_MESSAGE_PALAMCNG_10 P1 首超润滑写错值（CFLAG:221=1 改 0，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）\n    chara(target).kojo.首次润滑Lv2 = 1;',
    replace:
      '    // CFLAG:TARGET:221  = 1（变量语义：CFLAG 族，TARGET:221）\n    chara(target).kojo.首次润滑Lv2 = 0; // （变异）',
    tests: ['kojo-k10-club'],
    must_mention: 'PALAMCNG_10',
  },
  {
    desc: 'M2296 K10 KOJO_MESSAGE_MARKCNG_10 头部检查①ASSI&&ASSIPLAY 条件反转（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  const target_name = chara_callname(target); // %SAVESTR:TARGET%\n  void rand;\n\n  if (era_flag.assi > 0 && era_flag.assiplay) {\n    return 0;\n  }',
    replace:
      '  const target_name = chara_callname(target); // %SAVESTR:TARGET%\n  void rand;\n\n  if (era_flag.assi > 0 && !era_flag.assiplay) {  // 变异\n    return 0;\n  }',
    tests: ['kojo-k10-club'],
    must_mention: '头部检查①ASSI&&ASSIPLAY 静默跳过',
  },
  {
    desc: 'M2297 K10 KOJO_MESSAGE_MARKCNG_10 苦痛刻印Lv3 条件改错（==3 改 ==2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (game.system.苦痛刻印变动 == 3 && chara(target).kojo.苦痛刻印Lv3 == 0) {\n    if (era.get(`talent:${target}:85`) == 1) {',
    replace:
      '  if (game.system.苦痛刻印变动 ==2 && chara(target).kojo.苦痛刻印Lv3 == 0) {  // 变异\n    if (era.get(`talent:${target}:85`) == 1) {',
    tests: ['kojo-k10-club'],
    must_mention: 'MARKCNG_10',
  },
  {
    desc: 'M2298 K10 KOJO_MESSAGE_MARKCNG_10 苦痛刻印Lv3 写错值（=1 改 2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '    // CFLAG:297  = 1（变量语义：CFLAG 族，297）\n    chara(target).kojo.苦痛刻印Lv3 = 1;',
    replace:
      '    // CFLAG:297  = 1（变量语义：CFLAG 族，297）\n    chara(target).kojo.苦痛刻印Lv3 = 2; // （变异）',
    tests: ['kojo-k10-club'],
    must_mention: 'MARKCNG_10',
  },
  {
    desc: 'M2299 K10 SELF_KOJO_K10 育儿室（TFLAG:13==13）孕育文案条件丢失（TALENT:153 分支删台词，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '      if (era.get(`talent:${target}:153`)) {\n        await era.printAndWait(\n          `「很快就要生出来了、请安心期待吧、亲・爱・的${heart(1)}」`,\n        );',
    replace:
      '      if (!era.get(`talent:${target}:153`)) {  // 变异\n        await era.printAndWait(\n          `「很快就要生出来了、请安心期待吧、亲・爱・的${heart(1)}」`,\n        );',
    tests: ['kojo-k10-club'],
    must_mention: 'CSTR:2 插值',
  },
  {
    desc: 'M2300 K10 SELF_KOJO_K10 育儿室完成标记写错值（CFLAG:273=1 改 0，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '    // CFLAG:273  = 1（变量语义：CFLAG 族，273）\n    chara(target).kojo.育儿室 = 1;',
    replace:
      '    // CFLAG:273  = 1（变量语义：CFLAG 族，273）\n    chara(target).kojo.育儿室 = 0; // （变异）',
    tests: ['kojo-k10-club'],
    must_mention: 'CSTR:2 插值',
  },
  {
    desc: 'M2301 K10 SELF_KOJO_K10 TFLAG:13 派发条件改错（==13 改 ==14，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (game.train.初吻与自我口上 == 13) {\n    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {',
    replace:
      '  if (game.train.初吻与自我口上 == 14) {  // 变异\n    if (era.get(`talent:${target}:85`) || era.get(`talent:${target}:76`)) {',
    tests: ['kojo-k10-club'],
    must_mention: 'CSTR:2 插值',
  },
  {
    desc: 'M2302 K10 DUNGEON_VICTORY_K10 体力低档追加台词条件删松（<50 改 <500，#241）',
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
    find: '  if (rand_n(3) == 0) {\n    await era.printAndWait(`「唔呼呼、今天的魔力格外顺畅呢♪」`);',
    replace:
      '  if (rand_n(3) == 1) {  // 变异\n    await era.printAndWait(`「唔呼呼、今天的魔力格外顺畅呢♪」`);',
    tests: ['kojo-k10-club'],
    must_mention: 'DUNGEON_VICTORY_K10',
  },
  {
    desc: 'M2304 K10 DUNGEON_RYOUZYOKU_K10 处女条件反转（TALENT:0==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (era.get(`talent:${target}:0`) == 1) {\n    await era.printAndWait(\n      `「请！请住手…哈啊～…求、求你们…人家还是处女…所以说…只有那里请…哈啊～！」`,\n    );',
    replace:
      '  if (era.get(`talent:${target}:0`) ==0) {  // 变异\n    await era.printAndWait(\n      `「请！请住手…哈啊～…求、求你们…人家还是处女…所以说…只有那里请…哈啊～！」`,\n    );',
    tests: ['kojo-k10-club'],
    must_mention: '迷宫败北与凌辱结束口上',
  },
  {
    desc: 'M2305 K10 DUNGEON_RYOUZYOKU_AFTER_K10 处女条件反转（TALENT:0==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (era.get(`talent:${target}:0`) == 1) {\n    await era.printAndWait(`「骗人…我竟然还是处女吗………」`);',
    replace:
      '  if (era.get(`talent:${target}:0`) ==0) {  // 变异\n    await era.printAndWait(`「骗人…我竟然还是处女吗………」`);',
    tests: ['kojo-k10-club'],
    must_mention: '迷宫败北与凌辱结束口上',
  },
  {
    desc: 'M2306 K10 DUNGEON_ATTACK_K10 侵略状态条件改错（==2 改 ==3，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (chara(target).invasion.状态 == 2) {\n    if (rand_n(3) == 0) {\n      await era.printAndWait(`「燃烧吧！」`);',
    replace:
      '  if (chara(target).invasion.状态 == 3) {  // 变异\n    if (rand_n(3) == 0) {\n      await era.printAndWait(`「燃烧吧！」`);',
    tests: ['kojo-k10-club'],
    must_mention: 'DUNGEON_ATTACK_K10',
  },
  {
    desc: 'M2307 K10 BENKI_KOUJO_K10 肉便器行动==0 淫乱分档条件反转（TALENT:76，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (game.train.肉便器行动 == 0) {\n    if (era.get(`talent:${a}:76`) == 1) {\n      await era.printAndWait(`「哈啊～…更多更多…用力干人家吧${heart(1)}」`);',
    replace:
      '  if (game.train.肉便器行动 == 0) {\n    if (era.get(`talent:${a}:76`) ==0) {  // 变异\n      await era.printAndWait(`「哈啊～…更多更多…用力干人家吧${heart(1)}」`);',
    tests: ['kojo-k10-club'],
    must_mention: '肉便器行动',
  },
  {
    desc: 'M2308 K10 BENKI_KOUJO_K10 肉便器行动分档条件改错（==0 改 ==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (game.train.肉便器行动 == 0) {\n    if (era.get(`talent:${a}:76`) == 1) {',
    replace:
      '  if (game.train.肉便器行动 ==1) {  // 变异\n    if (era.get(`talent:${a}:76`) == 1) {',
    tests: ['kojo-k10-club'],
    must_mention: '肉便器行动',
  },
  {
    desc: 'M2309 K10 ENTERENEMY_KOUJO_K10 淫乱/爱慕分岔顺序改错（TALENT:76 条件反转，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (era.get(`talent:${a}:76`) == 1) {\n    await era.printAndWait(\n      `「把魔王大人蹂躏的凄惨兮兮变成人家的宠物什么的…说不定也很有趣呢♪」`,\n    );\n  } else if (era.get(`talent:${a}:85`) == 1) {\n    await era.printAndWait(`「不要逃跑哟、魔王大人${heart(1)}」`);',
    replace:
      '  if (era.get(`talent:${a}:76`) == 1) {\n    await era.printAndWait(\n      `「把魔王大人蹂躏的凄惨兮兮变成人家的宠物什么的…说不定也很有趣呢♪」`,\n    );\n  } else if (era.get(`talent:${a}:85`) == 0) {  // 变异\n    await era.printAndWait(`「不要逃跑哟、魔王大人${heart(1)}」`);',
    tests: ['kojo-k10-club'],
    must_mention: 'ENTERENEMY_KOUJO_K10',
  },
  {
    desc: 'M2310 K10 NTR_KOUJO_K10 首次再捕获标记写错值（CFLAG:650=1 改 0，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '    // CFLAG:650  = 1（变量语义：CFLAG 族，650）\n    chara(target).kojo.NTR再捕获 = 1;',
    replace:
      '    // CFLAG:650  = 1（变量语义：CFLAG 族，650）\n    chara(target).kojo.NTR再捕获 = 0; // （变异）',
    tests: ['kojo-k10-club'],
    must_mention: 'NTR_KOUJO_K10',
  },
  {
    desc: 'M2311 K10 NTR_KOUJO_K10 P==1 分支写入字段改错（CFLAG:651 改 652，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '    // CFLAG:651  = 1（变量语义：CFLAG 族，651）\n    chara(target).kojo.NTR_651 = 1;',
    replace:
      '    // CFLAG:651  = 1（变量语义：CFLAG 族，651）\n    chara(target).kojo.NTR_652 = 1; // （变异）',
    tests: ['kojo-k10-club'],
    must_mention: 'NTR_KOUJO_K10',
  },
  {
    desc: 'M2312 K10 NTR_KOUJO_K10 P 分派条件①改错（==1 改 ==2，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (P == 1) {\n    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {\n      await era.printAndWait(\n        `「不、不要…哈啊～…被你这样的人…人家的第一次…啊～…啊啊～！」`,\n      );',
    replace:
      '  if (P ==2) {  // 变异\n    if (era.get(`talent:${target}:76`) || era.get(`talent:${target}:85`)) {\n      await era.printAndWait(\n        `「不、不要…哈啊～…被你这样的人…人家的第一次…啊～…啊啊～！」`,\n      );',
    tests: ['kojo-k10-club'],
    must_mention: 'NTR_KOUJO_K10',
  },
  {
    desc: 'M2313 K10 EXUCUTION_KOUJO_K10 犬射精或处刑口上条件改错（==4 改 ==5，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (event_no == 4) {\n    await era.printAndWait(\n      `「求、求你么…杀了我…请杀了我吧…肉便器什么的…不要、不要啊………」`,\n    );',
    replace:
      '  if (event_no == 5) {  // 变异\n    await era.printAndWait(\n      `「求、求你么…杀了我…请杀了我吧…肉便器什么的…不要、不要啊………」`,\n    );',
    tests: ['kojo-k10-club'],
    must_mention: '注册且按实参编号可调用',
  },
  {
    desc: 'M2314 K10 MUSEUM_KOUJO_K10 博物馆口上条件改错（==0 改 ==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (event_no == 0) {\n    await era.printAndWait(\n      `「唔呼呼、这种程度的石化魔法，之前的我只要一瞬间就能反制…啊啊……啊………」`,\n    );',
    replace:
      '  if (event_no == 1) {  // 变异\n    await era.printAndWait(\n      `「唔呼呼、这种程度的石化魔法，之前的我只要一瞬间就能反制…啊啊……啊………」`,\n    );',
    tests: ['kojo-k10-club'],
    must_mention: '八档，第一档有台词',
  },
  {
    desc: 'M2315 K10 BANISHMENT_KOUJO_K10 流放口上条件改错（==0 改 ==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (event_no == 0) {\n    await era.printAndWait(`「我的魔法连让小石头动一下都不行了…啊啊………」`);',
    replace:
      '  if (event_no == 1) {  // 变异\n    await era.printAndWait(`「我的魔法连让小石头动一下都不行了…啊啊………」`);',
    tests: ['kojo-k10-club'],
    must_mention: '注册且按实参编号可调用',
  },
  {
    desc: 'M2316 K10 PUBLIC_EXUCUTION_KOUJO_K10 公开处刑口上条件改错（==0 改 ==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (event_no == 0) {\n    await era.printAndWait(\n      `「呐..开玩笑的吧？那样的…我可不觉得好笑…啊～…啊啊～！」`,\n    );',
    replace:
      '  if (event_no == 1) {  // 变异\n    await era.printAndWait(\n      `「呐..开玩笑的吧？那样的…我可不觉得好笑…啊～…啊啊～！」`,\n    );',
    tests: ['kojo-k10-club'],
    must_mention: '注册且按实参编号可调用',
  },
  {
    desc: 'M2318 K10 GOHOUBI_REQUEST_KOUJO_K10 要求奖赏条件改错（==0 改 ==1，#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (chara(a).stronghold.要求奖赏 == 0) {\n    await era.printAndWait(`「好麻烦，唔，那给我一些钱好了」`);',
    replace:
      '  if (chara(a).stronghold.要求奖赏 ==1) {  // 变异\n    await era.printAndWait(`「好麻烦，唔，那给我一些钱好了」`);',
    tests: ['kojo-k10-club'],
    must_mention: '请求金钱',
  },
  {
    desc: 'M2319 K10 GOHOUBI_AFTER_KOUJO_K10 choice==0 条件改错（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  if (choice == 0) {\n    await era.printAndWait(`「就这样不许动？哈？」`);',
    replace:
      '  if (choice == 1) {  // 变异\n    await era.printAndWait(`「就这样不许动？哈？」`);',
    tests: ['kojo-k10-club'],
    must_mention: 'choice 参数传递',
  },
  {
    desc: 'M2320 K10 OSIOKI_KOUJO_K10 choice==6 条件改错（#241）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  } else if (choice == 6) {\n    await era.printAndWait(`「真是难以接受」`);',
    replace:
      '  } else if (choice == 7) {  // 变异\n    await era.printAndWait(`「真是难以接受」`);',
    tests: ['kojo-k10-club'],
    must_mention: 'choice 参数传递',
  },
  {
    desc: 'M2321 K10 GOBI 喜档槽位改错（原 arg0==1 分支随 #865 并入常量表，#241）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "    tiers: ['所以呢♪', '哟！', '怎么这样……。', '……。', '……。'],",
    replace:
      "    tiers: ['哟！', '哟！', '怎么这样……。', '……。', '……。'], // 变异",
    tests: ['kojo-k10-club'],
    must_mention: 'ARG:0 取语尾编号',
  },
  {
    desc: 'M2322 K10 GOBI_KOUJO_K10 arg0==1 输出文案改错（#241）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "    tiers: ['所以呢♪', '哟！', '怎么这样……。', '……。', '……。'],",
    replace:
      "    tiers: ['哟！变异', '哟！', '怎么这样……。', '……。', '……。'], // 变异",
    tests: ['kojo-k10-club'],
    must_mention: 'ARG:0 取语尾编号',
  },
  {
    desc: 'M2500 K8 兽奸检查岔路丢失（TEQUIP:89 不再调 DOG_KOJO_8，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  if (era0(`tequip:${target}:89`)) {\n    await dog_kojo_8(rand); // CALL DOG_KOJO_8\n    return 0;\n  }',
    replace: `  if (era0(\`tequip:\${target}:89\`)) {
    return 0;
  }`,
    tests: ['kojo-k8-spade'],
    must_mention: 'DOG_KOJO_8 それ以外档打印一行空文本',
  },
  {
    desc: 'M2501 K8 死斗场检查岔路丢失（TEQUIP:55 不再调 COLOSSEUM_KOJO_8，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  if (era0(`tequip:${target}:55`)) {\n    await colosseum_kojo_8(); // CALL COLOSSEUM_KOJO_8\n    return 0;\n  }',
    replace: `  if (era0(\`tequip:\${target}:55\`)) {
    return 0;
  }`,
    tests: ['kojo-k8-spade'],
    must_mention: '连站起来的力气都没有了',
  },
  {
    desc: 'M1815 K8 初調教推进写错（CFLAG:201 = 1 改 2，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.初调教 = 1; // CFLAG:201 = 1\n    }',
    replace: '      kojo.初调教 = 2; // 变异\n    }',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:201 推进到 1',
  },
  {
    desc: 'M1816 K8 K8_KOJO2 反抗刻印Lv3 分档条件写错（MARK:3 == 3 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  } else if (era0(`mark:${target}:3`) == 3 && game.kojo.口上开关 == 2) {\n    era.drawLine();',
    replace:
      '  } else if (era0(`mark:${target}:3`) == 4 && game.kojo.口上开关 == 2) {\n    era.drawLine(); // 变异',
    tests: ['kojo-k8-spade'],
    must_mention: '反抗刻印Lv3',
  },
  {
    desc: 'M1817 K8 SELECTCOM 0 爱撫初回刻印分档删（MARK:2 >= 2 分支丢失，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (era0(`mark:${target}:2`) >= 2) {\n        await era.printAndWait(`「呵呵呵…就像稍微强一点的按摩一样呢」`);',
    replace:
      '      if (era0(`mark:${target}:2`) >= 3) {\n        await era.printAndWait(`「呵呵呵…就像稍微强一点的按摩一样呢」`); // 变异',
    tests: ['kojo-k8-spade'],
    must_mention: '屈服刻印Lv2以上分档',
  },
  {
    desc: 'M1818 K8 SELECTCOM 0 爱撫淫乱档推进写错（CFLAG:301 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.爱抚 = 6; // CFLAG:301 = 6',
    replace: '      kojo.爱抚 = 5; // 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:301 推进到 6',
  },
  {
    desc: 'M1819 K8 SELECTCOM 1 舔阴初回推进写错（CFLAG:302 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.舔阴 = 1; // CFLAG:302 = 1',
    replace: '      kojo.舔阴 = 0; // 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:302 推进到 1',
  },
  {
    desc: 'M1820 K8 SELECTCOM 2 阿纳尔爱撫初回推进写错（CFLAG:303 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.肛门爱抚 = 1; // CFLAG:TARGET:303 = 1',
    replace: '      kojo.肛门爱抚 = 0; // 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:303 推进到 1',
  },
  {
    desc: 'M1821 K8 SELECTCOM 2 淫乱+润滑Lv2以上推进写错（CFLAG:303 = 7 改 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        kojo.肛门爱抚 = 7; // CFLAG:303 = 7',
    replace: '        kojo.肛门爱抚 = 6; // 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:303 推进到 7',
  },
  {
    desc: 'M1822 K8 SELECTCOM 3 自慰初回推进写错（CFLAG:304 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.自慰 = 1; // CFLAG:TARGET:304 = 1',
    replace: '      kojo.自慰 = 0; // 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:304 推进到 1',
  },
  {
    desc: 'M1823 K8 SELECTCOM 5 母乳体质判定丢失（TALENT:130 条件删除，恒真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    const milk_body =\n      era0(`talent:${target}:130`) == 1 &&\n      palam(5) > PALAMLV[3] &&\n      era0(`tequip:${target}:16`) == 0 &&\n      era0(`tequip:${target}:15`) == 0; // 母乳体质有效条件',
    replace: '    const milk_body = true; // 变异：条件删除，恒真',
    tests: ['kojo-k8-spade'],
    must_mention: '非母乳体质',
  },
  {
    desc: 'M1824 K8 SELECTCOM 6 初吻门槛丢失（TFLAG:13 判定删除，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: "    // 接吻 CFLAG:307\n    if (kojo.接吻 == 0 && era0('tflag:13')) {",
    replace: '    // 接吻 CFLAG:307\n    if (kojo.接吻 == 0 && true) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1826 K8 SELECTCOM 8 それ以外分支删除（CFLAG:309 <= 1 检查改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    } else if (kojo.插入手指 <= 1 || game.kojo.口上开关 == 2) {\n      // それ以外',
    replace: '    } else if (false) {\n      // それ以外（变异：检查删除）',
    tests: ['kojo-k8-spade'],
    must_mention: '那里…被这样玩弄的话',
  },
  {
    desc: 'M1827 K8 SELECTCOM 9 舔肛初回推进写错（CFLAG:310 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.舔肛 = 1; // CFLAG:TARGET:310 = 1',
    replace: '      kojo.舔肛 = 0; // 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:310 推进到 1',
  },
  {
    desc: 'M1828 K8 SELECTCOM 10 淫乱推进写错（CFLAG:311 = 5 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.振动宝石 = 5; // CFLAG:311 = 5',
    replace: '      kojo.振动宝石 = 4; // 变异',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1829 K8 SELECTCOM 11 壶虫開始時初回推进写错（CFLAG:312 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.壶虫 = 1; // CFLAG:312 = 1',
    replace: '      kojo.壶虫 = 0; // 变异',
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
    find: '        await era.printAndWait(`${target_name}因为肛门被蠕虫钻入而发出悲鸣……`);\n      } else if (era0(`abl:${target}:3`) >= 3) {',
    replace:
      '        await era.printAndWait(`${target_name}因为肛门被蠕虫钻入而发出悲鸣……`);\n      } else if (true) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1832 K8 SELECTCOM 14 阴蒂夹脱着時初回推进写错（CFLAG:375 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.阴蒂夹着脱 = 1; // CFLAG:375 = 1',
    replace: '      kojo.阴蒂夹着脱 = 0; // 变异',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:375 推进到 1',
  },
  {
    desc: 'M1834 K8 SELECTCOM 19 肛珠開始時それ以外·肛门感觉Lv3以上分档判定丢失（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      } else if (era0(`abl:${target}:3`) >= 3) {\n        // それ以外·肛门感觉Lv3以上',
    replace:
      '      } else if (true) {\n        // （变异：肛门感觉Lv3以上判定删除）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1835 K8 SELECTCOM 20 正常位淫乱推进写错（CFLAG:321 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.正常位 = 6; // CFLAG:321 = 6',
    replace: '      kojo.正常位 = 5; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 6',
  },
  {
    desc: 'M1836 K8 SELECTCOM 20 正常位爱慕推进写错（CFLAG:321 = 5 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.正常位 = 5; // CFLAG:321 = 5',
    replace: '      kojo.正常位 = 4; // （变异：推进写错）',
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
    desc: 'M1838 K8 SELECTCOM 20 正常位それ以外检查丢失（CFLAG:321 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '} else if (kojo.正常位 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '} else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1839 K8 SELECTCOM 20 正常位处女+魔族判定丢失（TALENT:314==9 改恒真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        if (era0(`talent:${target}:314`) == 9) {\n          // 魔族\n          if (era0(`talent:${target}:76`) == 1) {\n            await era.printAndWait(\n              `${player_name}分开${target_name}的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,',
    replace:
      '        if (true) {\n          // （变异：种族判定删除）\n          if (era0(`talent:${target}:76`) == 1) {\n            await era.printAndWait(\n              `${player_name}分开${target_name}的双腿押着膝盖，插入的时候像为了展现给她看一样，每次都是缓缓的沉入。`,',
    tests: ['kojo-k8-spade'],
    must_mention: '处女+人間+それ以外',
  },
  {
    desc: 'M1840 K8 SELECTCOM 21 背后位淫乱推进写错（CFLAG:322 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位 = 6; // CFLAG:322 = 6',
    replace: '      kojo.背后位 = 5; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 6',
  },
  {
    desc: 'M1841 K8 SELECTCOM 21 背后位屈服刻印Lv3推进写错（CFLAG:322 = 3 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位 = 3; // CFLAG:322 = 3',
    replace: '      kojo.背后位 = 4; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1842 K8 SELECTCOM 21 背后位それ以外检查丢失（CFLAG:322 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位 = 3; // CFLAG:322 = 3\n    } else if (kojo.背后位 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '      kojo.背后位 = 3; // CFLAG:322 = 3\n    } else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1845 K8 SELECTCOM 22 对面座位淫乱推进写错（CFLAG:323 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.对面座位 = 6; // CFLAG:323 = 6',
    replace: '      kojo.对面座位 = 5; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 6',
  },
  {
    desc: 'M1846 K8 SELECTCOM 22 对面座位屈服刻印Lv3+V感覚Lv3以上推进写错（CFLAG:323 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.对面座位 = 4; // CFLAG:323 = 4',
    replace: '      kojo.对面座位 = 3; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1847 K8 SELECTCOM 22 对面座位それ以外检查丢失（CFLAG:323 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '} else if (kojo.对面座位 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '} else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1849 K8 SELECTCOM 23 背面座位淫乱推进写错（CFLAG:324 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背面座位 = 6; // CFLAG:324 = 6',
    replace: '      kojo.背面座位 = 5; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '镜子加成',
  },
  {
    desc: 'M1850 K8 SELECTCOM 23 背面座位屈服刻印Lv3推进写错（CFLAG:324 = 3 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背面座位 = 3; // CFLAG:324 = 3',
    replace: '      kojo.背面座位 = 4; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1851 K8 SELECTCOM 23 背面座位それ以外检查丢失（CFLAG:324 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '} else if (kojo.背面座位 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '} else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1852 K8 SELECTCOM 26 正常位肛交淫乱+A感觉Lv3以上推进写错（CFLAG:327 = 7 改 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.正常位肛交 = 7; // CFLAG:327 = 7',
    replace: '      kojo.正常位肛交 = 6; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 7',
  },
  {
    desc: 'M1853 K8 SELECTCOM 26 正常位肛交淫乱（A感觉Lv3未満）推进写错（CFLAG:327 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.正常位肛交 = 6; // CFLAG:327 = 6',
    replace: '      kojo.正常位肛交 = 5; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 6',
  },
  {
    desc: 'M1854 K8 SELECTCOM 26 正常位肛交 A感觉Lv3以上（无好感）检查丢失（ABL:3>=3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      era0(`abl:${target}:3`) >= 3 &&\n      (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)',
    replace:
      '      false &&\n      (kojo.正常位肛交 <= 2 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1855 K8 SELECTCOM 26 正常位肛交それ以外检查丢失（CFLAG:327 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '} else if (kojo.正常位肛交 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '} else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1856 K8 SELECTCOM 27 背后位アナル爱慕检查丢失（CFLAG:328 <= 3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位肛交 = 5; // CFLAG:328 = 5\n    } else if (\n      era0(`talent:${target}:85`) == 1 &&\n      (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)',
    replace:
      '      kojo.背后位肛交 = 5; // CFLAG:328 = 5\n    } else if (\n      false &&\n      (kojo.背后位肛交 <= 3 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1857 K8 SELECTCOM 27 背后位アナル淫乱推进写错（CFLAG:328 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位肛交 = 6; // CFLAG:328 = 6',
    replace: '      kojo.背后位肛交 = 5; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 6',
  },
  {
    desc: 'M1858 K8 SELECTCOM 27 背后位アナル爱慕推进写错（CFLAG:328 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位肛交 = 4; // CFLAG:328 = 4',
    replace: '      kojo.背后位肛交 = 3; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1859 K8 SELECTCOM 27 背后位アナルそれ以外检查丢失（CFLAG:328 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位肛交 = 3; // CFLAG:328 = 3\n    } else if (kojo.背后位肛交 <= 1 || game.kojo.口上开关 == 2) {',
    replace:
      '      kojo.背后位肛交 = 3; // CFLAG:328 = 3\n    } else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1860 K8 SELECTCOM 28 对面座位アナル初めて推进写错（CFLAG:329 = 1 改 0，恒不推进，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.对面座位肛交 = 1; // CFLAG:TARGET:329 = 1',
    replace: '      kojo.对面座位肛交 = 0; // （变异：推进写错）',
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
    find: '      kojo.对面座位肛交 = 3; // CFLAG:329 = 3',
    replace: '      kojo.对面座位肛交 = 2; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1863 K8 SELECTCOM 28 对面座位アナルそれ以外检查丢失（CFLAG:329 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '} else if (kojo.对面座位肛交 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '} else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1865 K8 SELECTCOM 29 背面座位肛交それ以外检查丢失（CFLAG:330 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '} else if (kojo.背面座位肛交 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '} else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1866 K8 SELECTCOM 29 背面座位肛交爱慕推进写错（CFLAG:330 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背面座位肛交 = 4; // CFLAG:330 = 4',
    replace: '      kojo.背面座位肛交 = 3; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '台词收尾引号齐全',
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
    find: '      } else if (era0(`abl:${target}:16`) >= 3) {\n        // 侍奉精神Lv3以上\n        await era.printAndWait(`「我不做这种事不行么…真没办法…呵呵呵」`);',
    replace:
      '      } else if (false) {\n        // 侍奉精神Lv3以上（变异：判定删除）\n        await era.printAndWait(`「我不做这种事不行么…真没办法…呵呵呵」`);',
    tests: ['kojo-k8-spade'],
    must_mention: '侍奉精神Lv3以上（无 TALENT）',
  },
  {
    desc: 'M1869 K8 SELECTCOM 30 手淫淫乱+侍奉精神Lv3以上推进写错（CFLAG:331 = 7 改 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.手淫 = 7; // CFLAG:331 = 7',
    replace: '      kojo.手淫 = 6; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 7',
  },
  {
    desc: 'M1870 K8 SELECTCOM 30 手淫爱+侍奉精神Lv5 门槛写错（ABL:16>=5 改 >=3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.手淫 = 6; // CFLAG:331 = 6\n    } else if (\n      era0(`talent:${target}:85`) == 1 &&\n      era0(`abl:${target}:16`) >= 5 &&\n      (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)',
    replace:
      '      kojo.手淫 = 6; // CFLAG:331 = 6\n    } else if (\n      era0(`talent:${target}:85`) == 1 &&\n      era0(`abl:${target}:16`) >= 3 &&\n      (kojo.手淫 <= 4 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 5',
  },
  {
    desc: 'M1872 K8 SELECTCOM 31 口交淫乱推进写错（CFLAG:332 = 5 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.口交_奴 = 5; // CFLAG:332 = 5',
    replace: '      kojo.口交_奴 = 4; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 5',
  },
  {
    desc: 'M1873 K8 SELECTCOM 31 口交爱慕检查丢失（CFLAG:332 <= 3 改 false，#239）',
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
    find: '      kojo.口交_奴 = 3; // CFLAG:332 = 3',
    replace: '      kojo.口交_奴 = 2; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1875 K8 SELECTCOM 31 口交それ以外检查丢失（CFLAG:332 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.口交_奴 = 3; // CFLAG:332 = 3\n    } else if (kojo.口交_奴 <= 1 || game.kojo.口上开关 == 2) {',
    replace:
      '      kojo.口交_奴 = 3; // CFLAG:332 = 3\n    } else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1876 K8 SELECTCOM 32 乳交弄乳狂+淫乱推进写错（CFLAG:333 = 8 改 7，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.乳交 = 8; // CFLAG:333 = 8',
    replace: '      kojo.乳交 = 7; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 8',
  },
  {
    desc: 'M1877 K8 SELECTCOM 32 乳交弄乳狂单独推进写错（CFLAG:333 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.乳交 = 4; // CFLAG:333 = 4',
    replace: '      kojo.乳交 = 3; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1878 K8 SELECTCOM 32 乳交初めて分档丢失（TALENT:78==1 改 false，恒不命中弄乳狂，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (era0(`talent:${target}:78`) == 1) {\n        // 弄乳狂\n        await era.printAndWait(`「啊…用我的好色的胸部让你的阴茎更舒服吧…♪」`);',
    replace:
      '      if (false) {\n        // 弄乳狂（变异：判定删除）\n        await era.printAndWait(`「啊…用我的好色的胸部让你的阴茎更舒服吧…♪」`);',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1879 K8 SELECTCOM 33 股间性交淫乱+处女推进写错（CFLAG:334 = 6 改 5，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.股间性交 = 6; // CFLAG:334 = 6',
    replace: '      kojo.股间性交 = 5; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 6',
  },
  {
    desc: 'M1880 K8 SELECTCOM 33 股间性交爱有り（无处女）检查丢失（CFLAG:334 <= 2 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      era0(`talent:${target}:85`) == 1 &&\n      (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)',
    replace:
      '      false &&\n      (kojo.股间性交 <= 2 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1881 K8 SELECTCOM 33 股间性交それ以外检查丢失（CFLAG:334 <= 1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '} else if (kojo.股间性交 <= 1 || game.kojo.口上开关 == 2) {',
    replace: '} else if (false) {',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1882 K8 SELECTCOM 34 骑乘位初めて处女分档丢失（TALENT:314==9 改 false，恒不命中魔族分支，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        if (era0(`talent:${target}:314`) == 9) {\n          // 魔族\n          if (era0(`talent:${target}:76`) == 1) {\n            await era.printAndWait(\n              `「嗯啊…你的阴茎插进…我的小穴里了…啊…啊啊啊…啊！」`,',
    replace:
      '        if (false) {\n          // 魔族（变异：判定删除）\n          if (era0(`talent:${target}:76`) == 1) {\n            await era.printAndWait(\n              `「嗯啊…你的阴茎插进…我的小穴里了…啊…啊啊啊…啊！」`,',
    tests: ['kojo-k8-spade'],
    must_mention: '张开了双翼',
  },
  {
    desc: 'M1883 K8 SELECTCOM 34 骑乘位淫乱+V感觉Lv3以上推进写错（CFLAG:335 = 8 改 7，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.骑乘位 = 8; // CFLAG:335 = 8',
    replace: '      kojo.骑乘位 = 7; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 8',
  },
  {
    desc: 'M1884 K8 SELECTCOM 34 骑乘位屈服刻印Lv3+V感觉Lv3以上检查丢失（ABL:2>=3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.骑乘位 = 5; // CFLAG:335 = 5\n    } else if (\n      era0(`mark:${target}:2`) == 3 &&\n      era0(`abl:${target}:2`) >= 3 &&\n      (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)',
    replace:
      '      kojo.骑乘位 = 5; // CFLAG:335 = 5\n    } else if (\n      era0(`mark:${target}:2`) == 3 &&\n      false &&\n      (kojo.骑乘位 <= 3 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1885 K8 SELECTCOM 34 骑乘位屈服刻印Lv3推进写错（CFLAG:335 = 3 改 2，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.骑乘位 = 3; // CFLAG:335 = 3',
    replace: '      kojo.骑乘位 = 2; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1886 K8 SELECTCOM 35 全身擦洗初めて分档丢失（ABL:16>=3 改 false，恒不命中侍奉精神分支，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (era0(`abl:${target}:16`) >= 3) {\n        // 侍奉精神Lv3以上\n        await era.printAndWait(`「来，伸出手…这样帮你洗就行了吧？」`);',
    replace:
      '      if (false) {\n        // 侍奉精神Lv3以上（变异：判定删除）\n        await era.printAndWait(`「来，伸出手…这样帮你洗就行了吧？」`);',
    tests: ['kojo-k8-spade'],
    must_mention: '把身体洗干净是很舒服',
  },
  {
    desc: 'M1887 K8 SELECTCOM 35 全身擦洗淫乱＋侍奉精神Lv5推进写错（CFLAG:336 = 5 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.全身擦洗 = 5; // CFLAG:336 = 5',
    replace: '      kojo.全身擦洗 = 4; // （变异：推进写错）',
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
    find: '      if (rand_n(3) == 0) {\n        await era.printAndWait(`「总觉得想起了帮弟弟洗澡的时候………」`);\n      }',
    replace:
      '      if (false) {\n        // 变异：SIF 独立分支判定删除\n        await era.printAndWait(`「总觉得想起了帮弟弟洗澡的时候………」`);\n      }',
    tests: ['kojo-k8-spade'],
    must_mention: '总觉得想起了帮弟弟洗澡的时候',
  },
  {
    desc: 'M1890 K8 SELECTCOM 36 骑乘位肛交初めて淫乱分档丢失（TALENT:76==1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (era0(`talent:${target}:76`) == 1) {\n        // 淫乱\n        if (era0(`abl:${target}:3`) >= 3) {\n          await era.printAndWait(\n            `「嗯…嗯啊…啊啊…你的全部进来了…啊啊${heart(1)}」`,\n          );',
    replace:
      '      if (false) {\n        // 淫乱（变异：判定删除）\n        if (era0(`abl:${target}:3`) >= 3) {\n          await era.printAndWait(\n            `「嗯…嗯啊…啊啊…你的全部进来了…啊啊${heart(1)}」`,\n          );',
    tests: ['kojo-k8-spade'],
    must_mention: '你的全部进来了',
  },
  {
    desc: 'M1891 K8 SELECTCOM 36 骑乘位肛交淫乱+A感觉Lv3以上推进写错（CFLAG:337 = 7 改 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.骑乘位肛交 = 7; // CFLAG:337 = 7',
    replace: '      kojo.骑乘位肛交 = 6; // （变异：推进写错）',
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
    desc: 'M1893 K8 SELECTCOM 36 骑乘位肛交 A感觉Lv3以上检查丢失（ABL:3>=3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    } else if (\n      era0(`abl:${target}:3`) >= 3 &&\n      (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)\n    ) {\n      // A感觉Lv3以上',
    replace:
      '    } else if (\n      false &&\n      (kojo.骑乘位肛交 <= 2 || game.kojo.口上开关 == 2)\n    ) {\n      // A感觉Lv3以上（变异：判定删除）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1894 K8 SELECTCOM 37 肛门侍奉初めて分档丢失（ABL:16>=3 改 false，恒不命中侍奉精神分支，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (era0(`abl:${target}:16`) >= 3) {\n        // 侍奉精神Lv3以上\n        await era.printAndWait(\n          `「你都是让别人帮你把那里舔干净吧…啊啊、我明白…真没办法」`,\n        );',
    replace:
      '      if (false) {\n        // 侍奉精神Lv3以上（变异：判定删除）\n        await era.printAndWait(\n          `「你都是让别人帮你把那里舔干净吧…啊啊、我明白…真没办法」`,\n        );',
    tests: ['kojo-k8-spade'],
    must_mention: '这么干怎么说都有点',
  },
  {
    desc: 'M1895 K8 SELECTCOM 37 肛门侍奉淫乱＋侍奉精神Lv5推进写错（CFLAG:338 = 5 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.肛门侍奉 = 5; // CFLAG:338 = 5',
    replace: '      kojo.肛门侍奉 = 4; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 5',
  },
  {
    desc: 'M1896 K8 SELECTCOM 37 肛门侍奉爱＋侍奉精神Lv5分档丢失（TALENT:85==1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.肛门侍奉 = 5; // CFLAG:338 = 5\n    } else if (\n      era0(`talent:${target}:85`) == 1 &&\n      era0(`abl:${target}:16`) >= 5 &&\n      (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)',
    replace:
      '      kojo.肛门侍奉 = 5; // CFLAG:338 = 5\n    } else if (\n      false &&\n      era0(`abl:${target}:16`) >= 5 &&\n      (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 == 2)',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1897 K8 SELECTCOM 37 肛门侍奉侍奉精神Lv3以上检查丢失（ABL:16>=3 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.肛门侍奉 = 4; // CFLAG:338 = 4\n    } else if (\n      era0(`abl:${target}:16`) >= 3 &&\n      (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)\n    ) {\n      // 侍奉精神Lv3以上',
    replace:
      '      kojo.肛门侍奉 = 4; // CFLAG:338 = 4\n    } else if (\n      false &&\n      (kojo.肛门侍奉 <= 2 || game.kojo.口上开关 == 2)\n    ) {\n      // 侍奉精神Lv3以上（变异：判定删除）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1898 K8 SELECTCOM 40 打屁股淫乱＋受虐狂っ気Lv3推进写错（CFLAG:341 = 5 改 4，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.打屁股 = 5; // CFLAG:TARGET:341 = 5',
    replace: '      kojo.打屁股 = 4; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 5',
  },
  {
    desc: 'M1899 K8 SELECTCOM 40 打屁股苦痛刻印Lv3+屈服刻印Lv3检查丢失（MARK:0==3 改 false，#239）',
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
    find: '      kojo.鞭 = 9; // CFLAG:TARGET:342 = 9',
    replace: '      kojo.鞭 = 8; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 9',
  },
  {
    desc: 'M1901 K8 SELECTCOM 41 鞭受虐狂っ気Lv3以上检查丢失（ABL:21>=3 改 false，#239）',
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
    find: '      kojo.针 = 2; // CFLAG:TARGET:343 = 2',
    replace: '      kojo.针 = 1; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1903 K8 SELECTCOM 43 眼罩開始時淫乱＋受虐狂っ気Lv5以上推进写错（CFLAG:344 = 9 改 8，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.眼罩 = 9; // CFLAG:TARGET:344 = 9',
    replace: '      kojo.眼罩 = 8; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 9',
  },
  {
    desc: 'M1904 K8 SELECTCOM 43 眼罩終了時淫乱推进写错（CFLAG:380 = 3 改 2，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.眼罩着脱 = 3; // CFLAG:380 = 3',
    replace: '      kojo.眼罩着脱 = 2; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1905 K8 SELECTCOM 44 绳子開始時それ以外推进写错（CFLAG:345 = 2 改 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.绳子 = 2; // CFLAG:TARGET:345 = 2',
    replace: '      kojo.绳子 = 1; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1906 K8 SELECTCOM 45 口塞開始時 TEQUIP:43 分岔丢失（首档恒不进已戴分支，#239；#622 起目标在拼接语句上）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      if (era0(`tequip:${target}:43`)) {\n        await era.printAndWait(\n          `${target_name}自己戴上了口枷` + `嘴的缝隙里，漏出了灼热的吐息………`,\n        );',
    replace:
      '      if (false) {\n        await era.printAndWait(\n          `${target_name}自己戴上了口枷` + `嘴的缝隙里，漏出了灼热的吐息………`,\n        ); // （变异：首档判定删除）',
    tests: ['kojo-k8-spade'],
    must_mention: '嘴的缝隙里',
  },
  {
    desc: 'M1907 K8 SELECTCOM 45 口塞終了時爱慕分档丢失（TALENT:85==1 改 false，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    } else if (\n      era0(`talent:${target}:85`) == 1 &&\n      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)\n    ) {\n      // 爱慕',
    replace:
      '    } else if (\n      false &&\n      (kojo.口塞着脱 < 2 || game.kojo.口上开关 == 2)\n    ) {\n      // 爱慕（变异：判定删除）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1908 K8 SELECTCOM 46 灌肠肛塞淫乱＋A感觉Lv3以上＋受虐狂っ気Lv3以上推进写错（CFLAG:347 = 7 改 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.灌肠肛塞 = 7; // CFLAG:347 = 7',
    replace: '      kojo.灌肠肛塞 = 6; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 7',
  },
  {
    desc: 'M1909 K8 SELECTCOM 46 灌肠肛塞 A感觉Lv3以上＋受虐狂っ気Lv3以上检查丢失（ABL:3>=3 改 false，#239）',
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
    find: '      kojo.放置PLAY = 6; // CFLAG:356 = 6',
    replace: '      kojo.放置PLAY = 5; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 6',
  },
  {
    desc: 'M1911 K8 SELECTCOM 56 交谈 初めて·视频自我介绍·TALENT:89 档 TFLAG:32 写入位丢失（|= 2 改 |= 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '          );\n          game.kojo.录像内容 |= 2; // TFLAG:32 |= 2',
    replace:
      '          );\n          game.kojo.录像内容 |= 0; // （变异：写入位丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '写入位 2',
  },
  {
    desc: 'M1912 K8 SELECTCOM 69 六九式 二回目以降·爱慕推进写错（CFLAG:364 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.六九式 = 4; // CFLAG:364 = 4',
    replace: '      kojo.六九式 = 3; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1913 K8 SELECTCOM 80 强制口交 二回目以降·爱＋侍奉精神Lv5 推进写错（CFLAG:381 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.强制口交 = 4; // CFLAG:381 = 4',
    replace: '      kojo.强制口交 = 3; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1914 K8 SELECTCOM 123 乳夹口交 二回目以降·弄乳狂＋淫乱推进写错（CFLAG:360 = 8 改 7，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.乳夹口交 = 8; // CFLAG:360 = 8',
    replace: '      kojo.乳夹口交 = 7; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 8',
  },
  {
    desc: 'M1915 K8 SELECTCOM 125 口交时自慰 二回目以降·それ以外推进写错（CFLAG:361 = 2 改 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.口交时自慰 = 2; // CFLAG:361 = 2',
    replace: '      kojo.口交时自慰 = 1; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 2',
  },
  {
    desc: 'M1916 K8 SELECTCOM 126 手搓口交 二回目以降·侍奉精神Lv3以上推进写错（CFLAG:362 = 3 改 2，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.手搓口交 = 3; // CFLAG:362 = 3',
    replace: '      kojo.手搓口交 = 2; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 3',
  },
  {
    desc: 'M1917 K8 SELECTCOM 127 真空口交 二回目以降·爱慕推进写错（CFLAG:363 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.真空口交 = 4; // CFLAG:363 = 4',
    replace: '      kojo.真空口交 = 3; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1918 K8 SELECTCOM 124 深喉 初めて·爱慕推进写错（CFLAG:365 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.深喉 = 1; // CFLAG:TARGET:365 = 1',
    replace: '      kojo.深喉 = 0; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1919 K8 SELECTCOM 87 穿环 二回目以降·淫乱·P=64（鼻穴）推进写错（CFLAG:348 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.穿环 = 4; // CFLAG:348 = 4',
    replace: '      kojo.穿环 = 3; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1920 K8 DOG_KOJO_8 SC0 爱撫 二回目·牝犬推进写错（CFLAG:301 = 7 改 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.爱抚 = 7;',
    replace: '      kojo.爱抚 = 6; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 7',
  },
  {
    desc: 'M1921 K8 DOG_KOJO_8 SC21 背后位 初めて推进写错（CFLAG:322 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位 = 1;\n      return 0;',
    replace: '      kojo.背后位 = 0; // （变异：推进写错）\n      return 0;',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1922 K8 DOG_KOJO_8 SC21 背后位 二回目·牝犬推进写错（CFLAG:322 = 7 改 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.背后位 = 7;',
    replace: '      kojo.背后位 = 6; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 7',
  },
  {
    desc: 'M1923 K8 DOG_KOJO_8 SC31 口交 二回目·爱＋侍奉精神Lv5推进写错（CFLAG:332 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.口交_奴 = 4;\n    } else if (',
    replace: '      kojo.口交_奴 = 3; // （变异：推进写错）\n    } else if (',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 4',
  },
  {
    desc: 'M1924 K8 DOG_KOJO_8 SC43 眼罩 開始時·初めて推进写错（CFLAG:344 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.眼罩 = 1;\n      return 0;',
    replace: '      kojo.眼罩 = 0; // （变异：推进写错）\n      return 0;',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1926 K8 DOG_KOJO_8 SC43 眼罩 終了時·それ以外推进写错（CFLAG:444 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.兽奸眼罩 = 1;',
    replace: '      kojo.兽奸眼罩 = 0; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:444 推进到 1',
  },
  {
    desc: 'M1927 K8 DOG_KOJO_8 SC56 会話 初めて·有摄像推进写错（CFLAG:357 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.交谈 = 1;\n      return 0;',
    replace: '      kojo.交谈 = 0; // （变异：推进写错）\n      return 0;',
    tests: ['kojo-k8-spade'],
    must_mention: '推进到 1',
  },
  {
    desc: 'M1928 K8 COLOSSEUM_KOJO_8 SC55 放置PLAY 条件反转（BASE:1 <= 0 改 > 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`base:${target}:1`) <= 0) {\n      await era.printAndWait(`${target_name}连站起来的力气都没有了……`); // 气力０以下',
    replace:
      '    if (era0(`base:${target}:1`) > 0) {\n      await era.printAndWait(`${target_name}连站起来的力气都没有了……`); // （变异：条件反转）',
    tests: ['kojo-k8-spade'],
    must_mention: '连站起来的力气都没有了',
  },
  {
    desc: 'M1929 K8 COLOSSEUM_KOJO_8 SC56 交谈 外层条件反转（BASE:1 <= 0 改 > 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`base:${target}:1`) <= 0) {\n      // 气力０以下',
    replace:
      '    if (era0(`base:${target}:1`) > 0) {\n      // （变异：条件反转）',
    tests: ['kojo-k8-spade'],
    must_mention: '咕…输给你了',
  },
  {
    desc: 'M1930 K8 COLOSSEUM_KOJO_8 SC31 口交 阴茎判定失效（TALENT:121/122 改 == 9，#239；#622 起目标在语句外的取值变量上）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      // 同一行输出：无后缀 PRINTFORM + 两条 SIF 的 PRINT\n      // + 收行的 PRINTFORMW（#622）。SIF 条件提到语句外当条件、文本留在输出语句里\n      const assi_has_penis =\n        era0(`talent:${assi}:121`) == 1 || era0(`talent:${assi}:122`) == 1;',
    replace:
      '      // 同一行输出：无后缀 PRINTFORM + 两条 SIF 的 PRINT\n      // + 收行的 PRINTFORMW（#622）。SIF 条件提到语句外当条件、文本留在输出语句里\n      const assi_has_penis =\n        era0(`talent:${assi}:121`) == 9 || era0(`talent:${assi}:122`) == 9; // 变异：判定失效',
    tests: ['kojo-k8-spade'],
    must_mention: '阴茎',
  },
  {
    desc: 'M1931 K8 COLOSSEUM_KOJO_8 SC5 胸爱撫 助手检查失效（ASSI/ASSIPLAY 改 assi > 999，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era_flag.assi > 0 && era_flag.assiplay) {\n      await era.printAndWait(\n        `「嗯啊…啊啊拜托你了…因为我是后辈温柔点吧…啊…嗯嗯！」`,\n      );',
    replace:
      '    if (era_flag.assi > 999) {\n      await era.printAndWait(\n        `「嗯啊…啊啊拜托你了…因为我是后辈温柔点吧…啊…嗯嗯！」`,\n      ); // （变异）',
    tests: ['kojo-k8-spade'],
    must_mention: '因为我是后辈温柔点吧',
  },
  {
    desc: 'M1932 K8 COLOSSEUM_KOJO_8 SC21 背后位 巨魔判定失效（TFLAG:400 == 206 改 == 999，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    } else if (game.train.死斗场敌种 == 206) {\n      // 巨魔（TFLAG:400 死斗场敌种 == 206，走 game.train.死斗场敌种 门面）',
    replace:
      '    } else if (game.train.死斗场敌种 == 999) {\n      // （变异：巨魔判定失效）（TFLAG:400 死斗场敌种 == 206，走 game.train.死斗场敌种 门面）',
    tests: ['kojo-k8-spade'],
    must_mention: '要、要坏掉了',
  },
  {
    desc: 'M1933 K8 COLOSSEUM_KOJO_8 SC27 背后位アナル 助手检查失效（ASSI/ASSIPLAY 改 assi > 999，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era_flag.assi > 0 && era_flag.assiplay) {\n      await era.printAndWait(\n        `「求、求你…啊咕…饶了我吧…啊啊…嗯…牙啊啊啊啊啊！」`,\n      );',
    replace:
      '    if (era_flag.assi > 999) {\n      await era.printAndWait(\n        `「求、求你…啊咕…饶了我吧…啊啊…嗯…牙啊啊啊啊啊！」`,\n      ); // （变异）',
    tests: ['kojo-k8-spade'],
    must_mention: '求、求你',
  },
  {
    desc: 'M1934 K8 COLOSSEUM_KOJO_8 SC51 媚药史莱姆 台词内容篡改（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    await era.printAndWait(`「啊啊…史莱姆么…嗯…连这种地方都进来了…啊啊！」`);',
    replace:
      '    await era.printAndWait(`「啊啊…史莱姆…」`); // （变异：台词内容篡改）',
    tests: ['kojo-k8-spade'],
    must_mention: '连这种地方都进来了',
  },
  {
    desc: 'M1935 K8 PALAMCNG_8 头部检查 TEQUIP:45（口塞）短路失效（#239）',
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
    find: '    kojo.首次润滑Lv2 = 1; // CFLAG:TARGET:221 = 1',
    replace: '    kojo.首次润滑Lv2 = 0; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '首次润滑Lv2',
  },
  {
    desc: 'M1937 K8 PALAMCNG_8 首次欲情Lv2 推进写错（CFLAG:222 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.首次欲情Lv2 = 1; // CFLAG:222 = 1',
    replace: '    kojo.首次欲情Lv2 = 0; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '首次欲情Lv2',
  },
  {
    desc: 'M1938 K8 PALAMCNG_8 首次耻情Lv2 推进写错（CFLAG:223 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.首次耻情Lv2 = 1; // CFLAG:223 = 1',
    replace: '    kojo.首次耻情Lv2 = 0; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '首次耻情Lv2',
  },
  {
    desc: 'M1939 K8 PALAMCNG_8 首次恐怖Lv2 推进写错（CFLAG:224 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.首次恐怖Lv2 = 1; // CFLAG:224 = 1',
    replace: '    kojo.首次恐怖Lv2 = 0; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '首次恐怖Lv2',
  },
  {
    desc: 'M1940 K8 PALAMCNG_8 首次C绝顶 推进写错（CFLAG:225 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.首次C绝顶 = 1; // CFLAG:225 = 1',
    replace: '    kojo.首次C绝顶 = 0; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '首次C绝顶',
  },
  {
    desc: 'M1941 K8 PALAMCNG_8 首次V绝顶 推进写错（CFLAG:226 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.首次V绝顶 = 1; // CFLAG:TARGET:226 = 1',
    replace: '    kojo.首次V绝顶 = 0; // （变异：推进写错）',
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
    find: '      // それ以外\n      await era.printAndWait(\n        `「不行…再继续的话…我…我的…肛门要…变得奇怪了…啊啊——！」`,\n      );',
    replace:
      '      // （变异：台词内容篡改）\n      await era.printAndWait(`「篡改」`);',
    tests: ['kojo-k8-spade'],
    must_mention: '肛门要',
  },
  {
    desc: 'M1944 K8 PALAMCNG_8 乳房绝顶二回目 RAND 分档失效（rand_n(3) == 0 改 == 9，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        `「啊…啊啊啊…胸部…要去…要去了…啊啊啊…我的胸部…好奇怪啊${heart(1)}」`,\n      );\n      if (rand_n(3) == 0) {',
    replace:
      '        `「啊…啊啊啊…胸部…要去…要去了…啊啊啊…我的胸部…好奇怪啊${heart(1)}」`,\n      );\n      if (rand_n(3) == 9) {',
    tests: ['kojo-k8-spade'],
    must_mention: '胸部要融化了',
  },
  {
    desc: 'M1945 K8 PALAMCNG_8 处女丧失 推进写错（CFLAG:229 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.处女丧失 = 1; // CFLAG:TARGET:229 = 1',
    replace: '    kojo.处女丧失 = 0; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '处女丧失',
  },
  {
    desc: 'M1946 K8 PALAMCNG_8 处女丧失 主人以外·それ以外 台词内容篡改（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        // それ以外\n        await era.printAndWait(\n          `「嗯啊…这样的话还不如干脆用自己的手…来做就好了………」`,\n        );',
    replace:
      '        // （变异：台词内容篡改）\n        await era.printAndWait(`「篡改」`);',
    tests: ['kojo-k8-spade'],
    must_mention: '用自己的手',
  },
  {
    desc: 'M1947 K8 MARKCNG_8 头部检查 TEQUIP:45（口塞）短路失效（#239）',
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
    find: '    kojo.苦痛刻印Lv3 = 1; // CFLAG:297 = 1',
    replace: '    kojo.苦痛刻印Lv3 = 0; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '苦痛刻印Lv3',
  },
  {
    desc: 'M1949 K8 MARKCNG_8 快乐刻印Lv3 推进写错（CFLAG:298 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.快乐刻印Lv3 = 1; // CFLAG:298 = 1',
    replace: '    kojo.快乐刻印Lv3 = 0; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '快乐刻印Lv3',
  },
  {
    desc: 'M1950 K8 MARKCNG_8 屈服刻印Lv3 推进写错（CFLAG:299 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.屈服刻印Lv3 = 1; // CFLAG:299 = 1',
    replace: '    kojo.屈服刻印Lv3 = 0; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '屈服刻印Lv3',
  },
  {
    desc: 'M1951 K8 MARKCNG_8 反抗刻印Lv3 推进写错（CFLAG:300 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.反抗刻印Lv3 = 1; // CFLAG:300 = 1',
    replace: '    kojo.反抗刻印Lv3 = 0; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '反抗刻印Lv3',
  },
  {
    desc: 'M1952 K8 SELF_KOJO_K8 调教后自慰 淫乱写错（CFLAG:261 = 4 改 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        kojo.调教后自慰 = 4; // CFLAG:261 = 4',
    replace: '        kojo.调教后自慰 = 3; // （变异：推进写错）',
    tests: ['kojo-k8-spade'],
    must_mention: '调教后自慰 CFLAG:261',
  },
  {
    desc: 'M1953 K8 SELF_KOJO_K8 百合PLAY 崩坏支写错（CFLAG:262 = 6 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.百合PLAY = 6; // CFLAG:262 = 6',
    replace: '      kojo.百合PLAY = 0; // （变异：推进丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '百合PLAY CFLAG:262',
  },
  {
    desc: 'M1954 K8 SELF_KOJO_K8 朝口交 それ以外写错（CFLAG:263 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.朝口交 = 1; // CFLAG:263 = 1',
    replace: '      kojo.朝口交 = 0; // （变异：推进丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '朝口交 CFLAG:263',
  },
  {
    desc: 'M1955 K8 SELF_KOJO_K8 调教后性交 V感觉Lv4以上写错（CFLAG:264 = 2 改 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.调教后性交 = 2; // CFLAG:264 = 2',
    replace: '      kojo.调教后性交 = 1; // （变异：推进写错）',
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
    find: '      kojo.调教后性交 = 1; // CFLAG:264 = 1',
    replace: '      kojo.调教后性交 = 0; // （变异：推进丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '调教后性交 CFLAG:264',
  },
  {
    desc: 'M1958 K8 SELF_KOJO_K8 夜袭外层检查丢失（CFLAG:265 < 1 改恒真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (kojo.夜袭 < 1 || game.kojo.口上开关 === 2) {',
    replace: '    if (true) {',
    tests: ['kojo-k8-spade'],
    must_mention: '外层 CFLAG:265 < 1 检查应拦下整支',
  },
  {
    desc: 'M1959 K8 SELF_KOJO_K8 夜袭 崩坏支写错（CFLAG:265 = 2 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        kojo.夜袭 = 2; // CFLAG:265 = 2',
    replace: '        kojo.夜袭 = 0; // （变异：推进丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '夜袭 CFLAG:265',
  },
  {
    desc: 'M1960 K8 SELF_KOJO_K8 卖却扶她检查取反（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`talent:${target}:122`) !== 1) {\n      await sell_maturo_k0(',
    replace:
      '    if (era0(`talent:${target}:122`) === 1) {\n      // （变异：条件取反）\n      await sell_maturo_k0(',
    tests: ['kojo-k8-spade'],
    must_mention: '非扶她尾调 SELL_MATURO_K0',
  },
  {
    desc: 'M1961 K8 SELF_KOJO_K8 妊娠发觉 首次写错（CFLAG:271 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.妊娠发觉 = 1; // CFLAG:271 = 1\n    } else {',
    replace: '      kojo.妊娠发觉 = 0; // （变异：推进丢失）\n    } else {',
    tests: ['kojo-k8-spade'],
    must_mention: '妊娠发觉 CFLAG:271',
  },
  {
    desc: 'M1963 K8 SELF_KOJO_K8 生产 首次写错（CFLAG:272 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      kojo.生产 = 1; // CFLAG:272 = 1\n    } else {',
    replace: '      kojo.生产 = 0; // （变异：推进丢失）\n    } else {',
    tests: ['kojo-k8-spade'],
    must_mention: '生产 CFLAG:272',
  },
  {
    desc: 'M1964 K8 SELF_KOJO_K8 育儿室写错（CFLAG:273 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.育儿室 = 1; // CFLAG:273 = 1',
    replace: '    kojo.育儿室 = 0; // （变异：推进丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '育儿室 CFLAG:273',
  },
  {
    desc: 'M1965 K8 SELF_KOJO_K8 亲离写错（CFLAG:274 = 1 改 0，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.亲离 = 1; // CFLAG:274 = 1',
    replace: '    kojo.亲离 = 0; // （变异：推进丢失）',
    tests: ['kojo-k8-spade'],
    must_mention: '亲离 CFLAG:274',
  },
  {
    desc: 'M1966 K8 SELF_KOJO_K8 末行复位丢失（TFLAG:13 = 0 删除，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  game.train.初吻与自我口上 = 0; // TFLAG:13 = 0',
    replace: '  // 变异：末行复位丢失',
    tests: ['kojo-k8-spade'],
    must_mention: '末行复位',
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
    desc: 'M1971 K8 DUNGEON_VICTORY 決め台詞首支写错（RAND:3 == 0 串到第三支，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    await era.printAndWait(`「哼、没有会输的要素、这是理所当然的结果」`);',
    replace:
      '    await era.printAndWait(`「又砍了无聊的东西」`); // （变异：串支）',
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
    desc: 'M1973 K8 DUNGEON_ATTACK 侵攻/迎击检查取反（CFLAG:1 == 2 改 != 2，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  if (chara(target).invasion.状态 == 2) {',
    replace: '  if (chara(target).invasion.状态 != 2) {',
    tests: ['kojo-k8-spade'],
    must_mention: '侵攻中 CFLAG:1 == 2',
  },
  {
    desc: 'M1974 K8 BENKI 档位检查写错（FLAG:62 == 0 改 == 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  if (game.train.肉便器行动 == 0) {',
    replace: '  if (game.train.肉便器行动 == 1) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'FLAG:62==0 淫乱',
  },
  {
    desc: 'M1975 K8 BENKI 第 0 档侍奉精神门槛放宽（ABL:16 >= 5 改 >= 0，それ以外支不可达，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    } else if (era0(`abl:${a}:16`) >= 5) {\n      // 侍奉精神Lv5以上\n      await era.printAndWait(`「请、请让我服侍大家的阴茎…嗯…嗯咕！？」`);',
    replace:
      '    } else if (era0(`abl:${a}:16`) >= 0) {\n      // （变异：门槛放宽）\n      await era.printAndWait(`「请、请让我服侍大家的阴茎…嗯…嗯咕！？」`);',
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
    desc: 'M1978 K8 BENKI V プレイ淫乱支第二处爱心丢失（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        `「啊嗯…啊嗯啊${heart(1)} 继续侵犯我的小穴…满满的射出精液吧…${heart(1)}」`,',
    replace:
      '        `「啊嗯…啊嗯啊${heart(1)} 继续侵犯我的小穴…满满的射出精液吧…」`,',
    tests: ['kojo-k8-spade'],
    must_mention: 'BENKI：FLAG:62==4 淫乱支两处爱心',
  },
  {
    desc: 'M1979 K8 BENKI 第 5 档检查改恒真（FLAG:62 越界不再静默，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  } else if (game.train.肉便器行动 == 5) {',
    replace: '  } else {',
    tests: ['kojo-k8-spade'],
    must_mention: 'FLAG:62 越界时六档全不命中',
  },
  {
    desc: 'M1980 K8 NTR 入口再捕获位不再补写（CFLAG:650 赋值删掉，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.NTR再捕获 = 1; // CFLAG:650 = 1',
    replace: '    // 变异：再捕获位不补',
    tests: ['kojo-k8-spade'],
    must_mention: 'NTR 再捕获 CFLAG:650',
  },
  {
    desc: 'M1981 K8 NTR 狂王性别判定漏掉扶她的 2（0 || 2 改只判 0，#239；#622 起目标在拼接语句上）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  const futa = () => game.system.狂王性别 == 0 || game.system.狂王性别 == 2;',
    replace: '  const futa = () => game.system.狂王性别 == 0;',
    tests: ['kojo-k8-spade'],
    must_mention: 'NTR：P==2 陥落済支',
  },
  {
    desc: 'M1982 K8 NTR P==1 それ以外支的按摩棒串成巨根（#239；#622 起目标在同一条输出的取值三元上）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find:
      '          (futa() ? `狂王的巨根` : `特大号的按摩棒`) +\n' +
      '          `深深的插了进去。破瓜之血从秘裂里流了出来。`,',
    replace:
      '          (futa() ? `特大号的按摩棒` : `狂王的巨根`) +\n' +
      '          `深深的插了进去。破瓜之血从秘裂里流了出来。`, // 变异：串支',
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
    desc: 'M1985 K8 NTR P==5 只判 FLAG:500 == 0 的那处被「统一」成 0 或 2（#239；#622 补查起目标在拼接语句里的取值三元上）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '          (game.system.狂王性别 == 0\n',
    replace: '          (futa()\n',
    tests: ['kojo-k8-spade'],
    must_mention:
      'FLAG:500==2 在本支走假阳具（与同函数其余各处的 0 或 2 判定不同）',
  },
  {
    desc: 'M1986 K8 NTR P==7 记位写到 CFLAG:655 上（串位，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    kojo.NTR_657 = 1; // CFLAG:657 = 1',
    replace: '    kojo.NTR_655 = 1; // （变异：串位）',
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
    desc: 'M1988 K8 EXUCUTION 首档检查写错（处分方式 == 4 改 == 3，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  if (event_no == 4) {',
    replace: '  if (event_no == 3) {',
    tests: ['kojo-k8-spade'],
    must_mention: '处分方式==4 肉便器刑',
  },
  {
    desc: 'M1989 K8 MUSEUM 蜡人形档值被「修正」成 2（档值是 21，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  } else if (event_no == 21) {',
    replace: '  } else if (event_no == 2) {',
    tests: ['kojo-k8-spade'],
    must_mention: '蜡人形档条件为 21',
  },
  {
    desc: 'M1990 K8 BANISHMENT 追放档检查写错（处分号 == 0 改 == 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  if (event_no == 0) {\n    // 追放\n    await era.printAndWait(`「这样就自由了…但是、失去力量的我的存在价值………」`);',
    replace:
      '  if (event_no == 1) {\n    // 追放\n    await era.printAndWait(`「这样就自由了…但是、失去力量的我的存在价值………」`);',
    tests: ['kojo-k8-spade'],
    must_mention: 'BANISHMENT：处分号 追放有词，其余四档空行',
  },
  {
    desc: 'M1992 K8 GROTESQUE 末档（处分方式 == 6 ゾンビ化）丢失（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: "  } else if (event_no == 6) {\n    // ゾンビ化\n    await era.printAndWait('');",
    replace:
      "  } else if (false) {\n    // ゾンビ化\n    await era.printAndWait('');",
    tests: ['kojo-k8-spade'],
    must_mention: '处分方式编号七档全未填写，逐档只出空行',
  },
  {
    desc: 'M1993 K8 ENTERENEMY 爱慕档检查丢失（TALENT:85 == 1 改恒真，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  } else if (era0(`talent:${a}:85`) == 1) {',
    replace: '  } else if (true) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'ENTERENEMY：淫乱 → 爱慕 → それ以外 三选一',
  },
  {
    desc: 'M1994 K8 GOHOUBI_REQUEST 兽奸档合并检查漏掉马（1||2||3 改 1||2，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  } else if (gohoubi == 1 || gohoubi == 2 || gohoubi == 3) {',
    replace: '  } else if (gohoubi == 1 || gohoubi == 2) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:504==3 兽奸要求',
  },
  {
    desc: 'M1995 K8 GOHOUBI_REQUEST 兽名串档（猪 → 犬，#239；#622 起目标在同一条输出的取值三元上）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: "        (gohoubi == 1 ? `犬` : gohoubi == 2 ? `猪` : gohoubi == 3 ? `马` : '') +",
    replace:
      "        (gohoubi == 1 ? `犬` : gohoubi == 2 ? `犬` : gohoubi == 3 ? `马` : '') + // 变异：串档",
    tests: ['kojo-k8-spade'],
    must_mention: 'CFLAG:504==2 兽奸要求',
  },
  {
    desc: 'M1996 K8 GOHOUBI_REQUEST キス档被补上没有的旁白行（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    await era.printAndWait(`「回来之后想要魔王大人的吻…想要认真的吻」`);',
    replace:
      '    await era.printAndWait(`「回来之后想要魔王大人的吻…想要认真的吻」`);\n    await era.printAndWait(`${a_name}要求接吻作为报酬。`); // 变异：补旁白',
    tests: ['kojo-k8-spade'],
    must_mention: 'キス档只有一行（无旁白）',
  },
  {
    desc: 'M1997 K8 GOHOUBI_AFTER 放置 PLAY 档检查写错（choice == 0 改 == 1，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  if (choice == 0) {\n    // 放置PLAY\n    await era.printAndWait(`「………知道了、我就这样退下了」`);',
    replace:
      '  if (choice == 1) {\n    // （变异：档位检查写错）\n    await era.printAndWait(`「………知道了、我就这样退下了」`);',
    tests: ['kojo-k8-spade'],
    must_mention: 'GOHOUBI_AFTER：choice 0/1 各一行，choice 越界静默',
  },
  {
    desc: 'M1999 K8 GOHOUBI_AFTER 童贞狩档膣/肛门两支被串成同文（#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        await era.printAndWait(`「怎么样、我的身体是最棒的吧？」`);',
    replace:
      '        await era.printAndWait(`「屁股小穴里插着新品阴茎最棒了♪」`); // （变异：串支）',
    tests: ['kojo-k8-spade'],
    must_mention: 'GOHOUBI_AFTER：童贞狩档的膣/肛门两支文字不同（对照上一条）',
  },
  {
    desc: 'M2502 K8 OSIOKI 脱粪刑门槛被「统一」成自慰刑的 4（应为 6，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`abl:${a}:17`) >= 6) {',
    replace: '    if (era0(`abl:${a}:17`) >= 4) {',
    tests: ['kojo-k8-spade'],
    must_mention: '脱粪刑门槛是 6，Lv4 不够',
  },
  {
    desc: 'M2503 K8 OSIOKI 小便器刑的或判退化成只认受虐狂（TALENT:76 分支丢失，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    if (era0(`talent:${a}:88`) == 1 || era0(`talent:${a}:76`) == 1) {',
    replace: '    if (era0(`talent:${a}:88`) == 1) {',
    tests: ['kojo-k8-spade'],
    must_mention: 'OSIOKI：小便器刑 受虐狂 TALENT:88 或淫乱 TALENT:76 任一即可',
  },
  {
    desc: 'M2504 K8 OSIOKI 厕所打扫刑与断食刑串档（两段台词互换，#239）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '    await era.printAndWait(`「这不是我应该做的事啊………」`);',
    replace:
      '    await era.printAndWait(`「这样的刑罚，3天左右没事的」`); // （变异：串档）',
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
    desc: 'M2506 K8 GOBI 悲伤档串成害羞档（两段语尾互换，#239）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "    tiers: ['什么啊♪', '哼！', '唉……。', '嗯……。', '啊……啊……。'],",
    replace:
      "    tiers: ['什么啊♪', '哼！', '嗯……。', '嗯……。', '啊……啊……。'], // 变异：串档",
    tests: ['kojo-k8-spade'],
    must_mention: 'ARG:0 == 3',
  },
  {
    desc: 'M2507 K8 GOBI 默认支第二支被「去重」成第三支的语尾（两支同文，#239）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "    fallback: ['啊。', '啊。', '什么啊。'],",
    replace:
      "    fallback: ['啊。', '什么啊。', '什么啊。'], // 变异：两支同文被改",
    tests: ['kojo-k8-spade'],
    must_mention: '默认支（含 ARG:0==0）三选一，前两支同文',
  },

  // —— #231 J21 口上·K0 慈爱（M1600-M1649 + M1790-M2015；撞号条目并入 M2420-M2599） ——
  {
    desc: 'M1600 K0 爱抚首次状态推进写错（CFLAG:301 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.爱抚 = 1;',
    replace: '      kojo.爱抚 = 2; // （变异）',
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
    desc: 'M1602 K0 爱抚淫乱素质条件错格（TALENT:76 改 77）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    // 淫乱（TALENT:76）\n    if (\n      era.get(`talent:${target}:76`) === 1 &&\n      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)',
    replace:
      '    // 淫乱（TALENT:76）\n    if (\n      era.get(`talent:${target}:77`) === 1 &&\n      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)',
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
    desc: 'M1605 K0 失神检查删除（TFLAG:899 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  // 失神時（TFLAG:899）——跨域读属主 train 的一维门面\n  if (game.train.失神) {',
    replace:
      '  // 失神時（TFLAG:899）——跨域读属主 train 的一维门面\n  if (false) { // 变异：失神检查删除',
    tests: ['kojo-k0-tender'],
    must_mention: '失神（TFLAG:899）：不输出',
  },
  {
    desc: 'M1607 K0 舔阴首次状态推进写错（CFLAG:302 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.舔阴 = 1;',
    replace: '      kojo.舔阴 = 2; // （变异）',
    tests: ['kojo-k0-tender'],
    must_mention: '舔阴首次推进到 1',
  },
  {
    desc: 'M1608 K0 舔阴处女素质条件错格（TALENT:0 改 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      // 处女（TALENT:0）\n      if (era.get(`talent:${target}:0`) === 1) {',
    replace:
      '      // 处女（TALENT:0）\n      if (era.get(`talent:${target}:1`) === 1) {',

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
    desc: 'M1610 K0 死斗场检查删除（TEQUIP:55 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  // 死斗场中は専用口上\n  if (era.get(`tequip:${target}:55`)) {',
    replace: '  if (false) { // 变异：死斗场检查删除',
    tests: ['kojo-k0-tender'],
    must_mention: '死斗场（TEQUIP:55）',
  },
  {
    desc: 'M1611 K0 助手调教检查删除（ASSI/ASSIPLAY 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  // 助手が調教した時に口上をスキップする\n  if (era_flag.assi > 0 && era_flag.assiplay) {',
    replace:
      '  // 助手が調教した時に口上をスキップする\n  if (false) { // 变异：助手检查删除',
    tests: ['kojo-k0-tender'],
    must_mention: '助手调教中',
  },
  {
    desc: 'M1612 K0 口塞检查删除（TEQUIP:45 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {',
    replace: '  if (false) { // 变异：口塞检查删除',
    tests: ['kojo-k0-tender'],
    must_mention: '口塞（TEQUIP:45）',
  },
  {
    desc: 'M1613 K0 崩坏检查删除（TALENT:9 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  // 崩坏した場合（TALENT:9）——K0 把崩坏放在兽奸前\n  if (era.get(`talent:${target}:9`) === 1) {\n    return 0;\n  }',
    replace:
      '  // 崩坏した場合（TALENT:9）——K0 把崩坏放在兽奸前\n  if (false) { // 变异：崩坏检查删除\n    return 0;\n  }',
    tests: ['kojo-k0-tender'],
    must_mention: '崩坏（TALENT:9）',
  },
  {
    desc: 'M1614 K0 兽奸检查删除（TEQUIP:89 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  // 兽奸PLAY中は専用口上\n  if (era.get(`tequip:${target}:89`)) {',
    replace: '  if (false) { // 变异：兽奸检查删除',
    tests: ['kojo-k0-tender'],
    must_mention: '兽奸（TEQUIP:89）',
  },
  {
    desc: 'M1615 K0 触手检查删除（TEQUIP:90 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  // 触手調教中（TEQUIP:90）\n  if (era.get(`tequip:${target}:90`)) {',
    replace: '  if (false) { // 变异：触手检查删除',
    tests: ['kojo-k0-tender'],
    must_mention: '触手（TEQUIP:90）',
  },
  {
    desc: 'M1617 K0 爱抚爱慕素质条件错格（TALENT:85 改 86）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      // 爱慕（TALENT:85）\n      era.get(`talent:${target}:85`) === 1 &&\n      (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)',
    replace:
      '      // 爱慕（TALENT:85）\n      era.get(`talent:${target}:86`) === 1 &&\n      (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '爱慕分支',
  },
  {
    desc: 'M1618 K0 爱抚屈服刻印 Lv3 分档错位（MARK:2 == 3 改 == 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      // 屈服刻印Lv3\n      mark(2) === 3 &&',
    replace: '      // 屈服刻印Lv3\n      mark(2) === 4 &&',
    tests: ['kojo-k0-tender'],
    must_mention: '屈服刻印 Lv3',
  },
  {
    desc: 'M1619 K0 爱抚屈服刻印 Lv2 分档错位（MARK:2 == 2 改 == 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      // 屈服刻印Lv2\n      mark(2) === 2 &&',
    replace: '      // 屈服刻印Lv2\n      mark(2) === 1 &&',
    tests: ['kojo-k0-tender'],
    must_mention: '屈服刻印 Lv3 / Lv2',
  },
  {
    desc: 'M1620 K0 肛门爱抚首次状态推进写错（CFLAG:303 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.肛门爱抚 = 1;',
    replace: '      kojo.肛门爱抚 = 2; // （变异）',
    tests: ['kojo-k0-tender'],
    must_mention: '肛门爱抚首次推进到 1',
  },
  {
    desc: 'M1621 K0 肛门爱抚润滑 Lv2 阈值错档（PALAMLV[2] 改 PALAMLV[3]）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    // 淫乱+润滑Lv2以上\n    if (\n      era.get(`talent:${target}:76`) === 1 &&\n      p >= PALAMLV[2] &&',
    replace:
      '    // 淫乱+润滑Lv2以上\n    if (\n      era.get(`talent:${target}:76`) === 1 &&\n      p >= PALAMLV[3] &&',
    tests: ['kojo-k0-tender'],
    must_mention: '肛门爱抚二次淫乱+润滑 Lv2',
  },
  {
    desc: 'M1623 K0 肛门爱抚 A钝感附加句删除（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "      await era.printAndWait('「啊呜～…好棒～！再来…往深处挖！往深处抠！」');\n      // A感覚Lv3以上＋A鈍感\n      if (a_sense >= 3 && a_insensible) {",
    replace:
      "      await era.printAndWait('「啊呜～…好棒～！再来…往深处挖！往深处抠！」');\n      // A感覚Lv3以上＋A鈍感\n      if (false) {",
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
    desc: 'M1625 K0 舔阴爱慕素质条件错格（TALENT:85 改 86）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      // 爱慕（TALENT:85）\n      era.get(`talent:${target}:85`) === 1 &&\n      (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)',
    replace:
      '      // 爱慕（TALENT:85）\n      era.get(`talent:${target}:86`) === 1 &&\n      (kojo.舔阴 <= 3 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '好吃吗',
  },
  {
    desc: 'M1626 K0 自慰首次状态推进写错（CFLAG:304 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.自慰 = 1;',
    replace: '      kojo.自慰 = 2; // （变异）',
    tests: ['kojo-k0-tender'],
    must_mention: '自慰首次推进到 1',
  },
  {
    desc: 'M1627 K0 自慰首次爱慕素质条件错格（TALENT:85 改 86）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      // 爱＆淫乱\n      if (\n        era.get(`talent:${target}:85`) === 1 ||',
    replace:
      '      // 爱＆淫乱\n      if (\n        era.get(`talent:${target}:86`) === 1 ||',
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
    desc: 'M1629 K0 自慰淫乱拍摄检查删除（TEQUIP:53 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      // 撮影中\n      if (filming) {\n        // 同一行输出：PRINTFORM、鸡鸡分档\n        // 与收尾都不换行（#624）',
    replace:
      '      // 撮影中\n      if (false) {\n        // 同一行输出：PRINTFORM、鸡鸡分档\n        // 与收尾都不换行（#624）',
    tests: ['kojo-k0-tender'],
    must_mention: '看吧～♡　噗咻噗咻勃起的',
  },
  {
    desc: 'M1630 K0 自慰拍摄鸡鸡条件错格（TALENT:122 改 123）（#231）',
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
    find: '      // 淫乱＋自慰中毒Lv3以上\n      era.get(`talent:${target}:76`) === 1 &&\n      masturbation_addiction >= 3 &&',
    replace:
      '      // 淫乱＋自慰中毒Lv3以上\n      era.get(`talent:${target}:76`) === 1 &&\n      masturbation_addiction >= 4 &&',
    tests: ['kojo-k0-tender'],
    must_mention: '自慰二次淫乱+自慰中毒 Lv3',
  },
  {
    desc: 'M1632 K0 自慰爱慕+处女素质条件错格（TALENT:85 改 86）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      // 爱＋处女\n      era.get(`talent:${target}:85`) === 1 &&',
    replace: '      // 爱＋处女\n      era.get(`talent:${target}:86`) === 1 &&',
    tests: ['kojo-k0-tender'],
    must_mention: '专属小穴',
  },
  {
    desc: 'M1633 K0 自慰屈服刻印 Lv3 分档错位（MARK:2 == 3 改 == 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      // 屈服刻印Lv3+自慰中毒Lv1以上\n      (era.get(`mark:${target}:2`) || 0) === 3 &&',
    replace:
      '      // 屈服刻印Lv3+自慰中毒Lv1以上\n      (era.get(`mark:${target}:2`) || 0) === 4 &&',
    tests: ['kojo-k0-tender'],
    must_mention: '如果这是你希望的话',
  },
  {
    desc: 'M1634 K0 自慰爱慕拍摄检查删除（TEQUIP:53 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      // 撮影中\n      if (filming) {\n        // 与上一支同型：PRINTFORM + 鸡鸡分档 + PRINTFORMW 收行（#624）',
    replace:
      '      // 撮影中\n      if (false) {\n        // 与上一支同型：PRINTFORM + 鸡鸡分档 + PRINTFORMW 收行（#624）',
    tests: ['kojo-k0-tender'],
    must_mention: '看见了吗？～♪　噗咻噗咻勃起的',
  },
  {
    desc: 'M1635 K0 自慰淫乱 RAND:3 首支旁路失效（=== 0 改 === 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '          `「${sc()}今天也是情绪高涨！请大家一起看我做舒服的事吧～${heart(1)}」`,\n        );\n      } else if (rand_n(3) === 0) {',
    replace:
      '          `「${sc()}今天也是情绪高涨！请大家一起看我做舒服的事吧～${heart(1)}」`,\n        );\n      } else if (rand_n(3) === 1) {',
    tests: ['kojo-k0-tender'],
    must_mention: '飞起来了～飞起来了～',
  },
  {
    desc: 'M1636 K0 胸爱抚首次状态推进写错（CFLAG:306 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.胸爱抚 = 1;',
    replace: '      kojo.胸爱抚 = 2; // （变异）',
    tests: ['kojo-k0-tender'],
    must_mention: '胸爱抚首次推进到 1',
  },
  {
    desc: 'M1637 K0 胸爱抚母乳体质条件错格（TALENT:130 改 131）（#231）',
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
    find: '          // B鈍感\n          if (b_insensible) {',
    replace: '          // B鈍感\n          if (false) {',
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
    find: '      // B感覚Lv3以上＋B鈍感\n      if (b_sense >= 3 && b_insensible) {\n        await era.printAndWait(\n          `${target_name}钝感的乳头已被完全开发、被含进嘴里舔得完全勃起了………`,',
    replace:
      '      // B感覚Lv3以上＋B鈍感\n      if (false) {\n        await era.printAndWait(\n          `${target_name}钝感的乳头已被完全开发、被含进嘴里舔得完全勃起了………`,',
    tests: ['kojo-k0-tender'],
    must_mention: '被含进嘴里舔得完全勃起了',
  },
  {
    desc: 'M1643 K0 胸爱抚二次母乳爱慕素质条件错格（TALENT:85 改 86）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        // 爱慕\n        era.get(`talent:${target}:85`) === 1 &&',
    replace: '        // 爱慕\n        era.get(`talent:${target}:86`) === 1 &&',
    tests: ['kojo-k0-tender'],
    must_mention: '吸我的奶来恢复精神吧',
  },
  {
    desc: 'M1644 K0 接吻首次状态推进写错（CFLAG:307 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.接吻 = 1;\n      return 0;\n    }\n\n    // （調教では）初めて（CFLAG:307 == 0）',
    replace:
      '      kojo.接吻 = 2;\n      return 0;\n    }\n\n    // （調教では）初めて（CFLAG:307 == 0）',
    tests: ['kojo-k0-tender'],
    must_mention: '接吻首次推进到 1',
  },
  {
    desc: 'M1645 K0 接吻初吻故乡恋人条件错格（TALENT:317 == 4 改 == 5）（#231）',
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
    find: '      // 顺从Lv2以上\n      (era.get(`abl:${target}:10`) || 0) >= 2 &&',
    replace:
      '      // 顺从Lv2以上\n      (era.get(`abl:${target}:10`) || 0) >= 3 &&',
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
    desc: 'M2420 K0 插入手指首次状态推进写错（CFLAG:309 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.插入手指 = 1;',
    replace: '      kojo.插入手指 = 2;',
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
    find: "      await era.printAndWait('「啊啊～再往里面插吧！把小穴弄得湿漉漉的吧！」');\n      // V感覚Lv3以上＋V鈍感\n      if (v_sense >= 3 && v_insensible) {",
    replace:
      "      await era.printAndWait('「啊啊～再往里面插吧！把小穴弄得湿漉漉的吧！」');\n      // V感覚Lv3以上＋V鈍感\n      if (false) {",
    tests: ['kojo-k0-tender'],
    must_mention: '贪婪的吞下了你所有的爱抚',
  },
  {
    desc: 'M2423 K0 舔肛首次状态推进写错（CFLAG:310 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.舔肛 = 1;',
    replace: '      kojo.舔肛 = 2;',
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
    find: '      // A感覚Lv3以上＋A鈍感\n      if (a_sense >= 3 && a_insensible) {\n        await era.printAndWait(\n          `${target_name}钝感的肛门被开发了、被${player_name}的舌头弄得发出了非常带感的声音………`,',
    replace:
      '      // A感覚Lv3以上＋A鈍感\n      if (false) {\n        await era.printAndWait(\n          `${target_name}钝感的肛门被开发了、被${player_name}的舌头弄得发出了非常带感的声音………`,',
    tests: ['kojo-k0-tender'],
    must_mention: '被你的舌头弄得发出了非常带感的声音',
  },
  {
    desc: 'M2426 K0 振动宝石首次状态推进写错（CFLAG:311 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.振动宝石 = 1;',
    replace: '      kojo.振动宝石 = 2;',
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
    find: '      // 爱＋屈服刻印Lv3\n      era.get(`talent:${target}:85`) === 1 &&\n      (era.get(`mark:${target}:2`) || 0) === 3 &&\n      (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)',
    replace:
      '      // 爱＋屈服刻印Lv3\n      era.get(`talent:${target}:85`) === 1 &&\n      (era.get(`mark:${target}:2`) || 0) === 4 &&\n      (kojo.振动宝石 <= 3 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '忍耐阴核的震动',
  },
  {
    desc: 'M2429 K0 壶虫首次状态推进写错（CFLAG:312 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.壶虫 = 1;',
    replace: '      kojo.壶虫 = 2;',
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
    find: '      // V感覚Lv3以上＋V鈍感\n      if (v_sense >= 3 && v_insensible) {\n        await era.printAndWait(\n          `${target_name}钝感的私处已经被完全开发了、把壶虫贪婪的连根吞了进去………`,',
    replace:
      '      // V感覚Lv3以上＋V鈍感\n      if (false) {\n        await era.printAndWait(\n          `${target_name}钝感的私处已经被完全开发了、把壶虫贪婪的连根吞了进去………`,',
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
    find: '      kojo.振动杖 = 1;',
    replace: '      kojo.振动杖 = 2;',
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
    find: '      // 屈服刻印Lv3\n      (era.get(`mark:${target}:2`) || 0) === 3 &&\n      (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)',
    replace:
      '      // 屈服刻印Lv3\n      (era.get(`mark:${target}:2`) || 0) === 4 &&\n      (kojo.振动杖 <= 2 || game.kojo.口上开关 === 2)',
    tests: ['kojo-k0-tender'],
    must_mention: '明明被用这种东西玩弄',
  },
  {
    desc: 'M2436 K0 肛门虫首次状态推进写错（CFLAG:314 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.肛门虫 = 1;',
    replace: '      kojo.肛门虫 = 2;',
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
    find: '      kojo.肛门虫 = 6;\n    } else if (\n      // 爱＋A感覚Lv3以上',
    replace:
      '      kojo.肛门虫 = 5;\n    } else if (\n      // 爱＋A感覚Lv3以上',
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
    find: '      kojo.阴蒂夹 = 1;',
    replace: '      kojo.阴蒂夹 = 2;',
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
    find: '      kojo.乳头夹 = 1;',
    replace: '      kojo.乳头夹 = 2;',
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
    find: '        `从${target_name}不像话的表情上完全看不出圣女时期的清纯了………`,\n      );\n      // B感覚Lv3以上＋B鈍感\n      if (b_sense >= 3 && b_insensible) {',
    replace:
      '        `从${target_name}不像话的表情上完全看不出圣女时期的清纯了………`,\n      );\n      // B感覚Lv3以上＋B鈍感\n      if (false) {',
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
    find: '      kojo.榨乳器 = 1;',
    replace: '      kojo.榨乳器 = 2;',
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
    find: '      kojo.肛珠 = 1;',
    replace: '      kojo.肛珠 = 2;',
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
    find: '      kojo.肛珠 = 7;',
    replace: '      kojo.肛珠 = 6;',
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
    find: '      kojo.正常位 = 1;',
    replace: '      kojo.正常位 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位首次推进到 1',
  },
  {
    desc: 'M3010 K0 正常位二次淫乱+性爱狂门槛错位（CFLAG:321 <= 8 改 <= 7）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        era.get(`talent:${target}:75`) === 1 &&\n        (kojo.正常位 <= 8 || game.kojo.口上开关 === 2)\n      ) {\n        if (rand_n(3) === 0) {\n          await era.printAndWait(\n            `「肉棒好棒～${heart(1)}…好棒哦～${heart(1)}…好想被插一整天啊～${heart(1)}」`,',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        era.get(`talent:${target}:75`) === 1 &&\n        (kojo.正常位 <= 7 || game.kojo.口上开关 === 2)\n      ) {\n        if (rand_n(3) === 0) {\n          await era.printAndWait(\n            `「肉棒好棒～${heart(1)}…好棒哦～${heart(1)}…好想被插一整天啊～${heart(1)}」`,',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位二次淫乱+性爱狂：RAND 三支 / 写 9',
  },
  {
    desc: 'M3011 K0 正常位二次淫乱+性爱狂写回错档（CFLAG:321 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.正常位 = 9;',
    replace: '        kojo.正常位 = 8;',
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
    find: '            await era.printAndWait(\n              `但是比起这个${target_name}更为被${player_name}所抱住的这一事实而心动不已………`,\n            );\n          } else {\n            await era.printAndWait(\n              `「啊啊…被爱着的愉悦…真美妙…${heart(1)} 啊～…啊啊～…又插的…更深了${heart(1)}」`,',
    replace:
      '            // deleted lowercase printformw\n          } else {\n            await era.printAndWait(\n              `「啊啊…被爱着的愉悦…真美妙…${heart(1)} 啊～…啊啊～…又插的…更深了${heart(1)}」`,',
    tests: ['kojo-k0-tender'],
    must_mention: '但是比起这个琼更为被你所抱住的这一事实而心动不已',
  },
  {
    desc: 'M3014 K0 正常位二次屈服Lv3+V感觉写回错档（CFLAG:321 = 4 改 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.正常位 = 4;',
    replace: '        kojo.正常位 = 3;',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位二次屈服Lv3+V感觉：自称首字插值，推进到 4',
  },
  {
    desc: 'M3015 K0 背后位首次状态推进写错（CFLAG:322 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.背后位 = 1;',
    replace: '      kojo.背后位 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '背后位首次推进到 1',
  },
  {
    desc: 'M3017 K0 背后位二次淫乱+性爱狂写回错档（CFLAG:322 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.背后位 = 9;',
    replace: '        kojo.背后位 = 8;',
    tests: ['kojo-k0-tender'],
    must_mention: '背后位二次淫乱+性爱狂写 9',
  },
  {
    desc: 'M3018 K0 背后位二次爱慕门槛错位（CFLAG:322 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:85`) === 1 &&\n        (kojo.背后位 <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:85`) === 1 &&\n        (kojo.背后位 <= 3 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '背后位二次爱慕 + V钝感附加句 / 阈值闸',
  },
  {
    desc: 'M3019 K0 对面座位首次状态推进写错（CFLAG:323 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.对面座位 = 1;',
    replace: '      kojo.对面座位 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位首次推进到 1',
  },
  {
    desc: 'M3021 K0 对面座位二次淫乱+性爱狂写回错档（CFLAG:323 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.对面座位 = 9;',
    replace: '        kojo.对面座位 = 8;',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位二次淫乱+性爱狂写 9',
  },
  {
    desc: 'M3022 K0 对面座位二次淫乱黑心插值改成白心（heart_black→heart）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '            `「呀～啊啊啊～…咕～…好紧～${heart_black(3)}」`,',
    replace: '            `「呀～啊啊啊～…咕～…好紧～${heart(3)}」`,',
    tests: ['kojo-k0-tender'],
    must_mention: '门槛读 CFLAG:323 / 黑心插值',
  },
  {
    desc: 'M3023 K0 背面座位首次状态推进写错（CFLAG:324 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.背面座位 = 1;',
    replace: '      kojo.背面座位 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位首次推进到 1',
  },
  {
    desc: 'M3025 K0 背面座位二次淫乱+性爱狂写回错档（CFLAG:324 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.背面座位 = 9;',
    replace: '        kojo.背面座位 = 8;',
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
    find: '      kojo.正常位肛交 = 1;',
    replace: '      kojo.正常位肛交 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位肛交首次推进到 1',
  },
  {
    desc: 'M3028 K0 正常位肛交二次淫乱+A感觉门槛错位（CFLAG:327 <= 6 改 <= 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        a_sense >= 3 &&\n        (kojo.正常位肛交 <= 6 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        a_sense >= 3 &&\n        (kojo.正常位肛交 <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位肛交二次：淫乱+A感觉写 7 / 阈值闸',
  },
  {
    desc: 'M3029 K0 正常位肛交二次淫乱+A感觉写回错档（CFLAG:327 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.正常位肛交 = 7;',
    replace: '        kojo.正常位肛交 = 6;',
    tests: ['kojo-k0-tender'],
    must_mention: '正常位肛交二次淫乱+A感觉写 7',
  },
  {
    desc: 'M3030 K0 背后位肛交首次状态推进写错（CFLAG:328 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.背后位肛交 = 1;',
    replace: '      kojo.背后位肛交 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '背后位肛门首次推进到 1',
  },
  {
    desc: 'M3031 K0 背后位肛交二次淫乱+A感觉门槛错位（CFLAG:328 <= 6 改 <= 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        a_sense >= 3 &&\n        (kojo.背后位肛交 <= 6 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        a_sense >= 3 &&\n        (kojo.背后位肛交 <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '背后位肛门二次：淫乱+A感觉写 7 / 阈值闸',
  },
  {
    desc: 'M3032 K0 背后位肛交二次淫乱+A感觉写回错档（CFLAG:328 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.背后位肛交 = 7;',
    replace: '        kojo.背后位肛交 = 6;',
    tests: ['kojo-k0-tender'],
    must_mention: '背后位肛门二次淫乱+A感觉写 7',
  },
  {
    desc: 'M3033 K0 对面座位肛交首次状态推进写错（CFLAG:329 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.对面座位肛交 = 1;',
    replace: '      kojo.对面座位肛交 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位肛交首次推进到 1',
  },
  {
    desc: 'M3034 K0 对面座位肛交二次淫乱+A感觉门槛错位（CFLAG:329 <= 6 改 <= 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        a_sense >= 3 &&\n        (kojo.对面座位肛交 <= 6 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        a_sense >= 3 &&\n        (kojo.对面座位肛交 <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位肛交二次：淫乱+A感觉写 7 / 阈值闸',
  },
  {
    desc: 'M3035 K0 对面座位肛交二次淫乱+A感觉写回错档（CFLAG:329 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.对面座位肛交 = 7;',
    replace: '        kojo.对面座位肛交 = 6;',
    tests: ['kojo-k0-tender'],
    must_mention: '对面座位肛交二次淫乱+A感觉写 7',
  },
  {
    desc: 'M3036 K0 背面座位肛交首次状态推进写错（CFLAG:330 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.背面座位肛交 = 1;',
    replace: '      kojo.背面座位肛交 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位肛交首次推进到 1',
  },
  {
    desc: 'M3037 K0 背面座位肛交二次淫乱+A感觉门槛错位（CFLAG:330 <= 6 改 <= 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        a_sense >= 3 &&\n        (kojo.背面座位肛交 <= 6 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        a_sense >= 3 &&\n        (kojo.背面座位肛交 <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位肛交二次：淫乱+A感觉写 7 / 阈值闸',
  },
  {
    desc: 'M3038 K0 背面座位肛交二次淫乱+A感觉写回错档（CFLAG:330 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.背面座位肛交 = 7;',
    replace: '        kojo.背面座位肛交 = 6;',
    tests: ['kojo-k0-tender'],
    must_mention: '背面座位肛交二次淫乱+A感觉写 7',
  },
  {
    desc: 'M3039 K0 手淫首次状态推进写错（CFLAG:331 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.手淫 = 1;',
    replace: '      kojo.手淫 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '手淫首次推进到 1',
  },
  {
    desc: 'M3040 K0 手淫二次淫乱+侍奉门槛错位（CFLAG:331 <= 5 改 <= 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        serve >= 3 &&\n        (kojo.手淫 <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        serve >= 3 &&\n        (kojo.手淫 <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '手淫二次：淫乱+侍奉写 6 / 阴茎形状读 PLAYER / 阈值闸',
  },
  {
    desc: 'M3041 K0 手淫二次淫乱+侍奉写回错档（CFLAG:331 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.手淫 = 6;',
    replace: '        kojo.手淫 = 5;',
    tests: ['kojo-k0-tender'],
    must_mention: '手淫二次淫乱+侍奉写 6',
  },
  {
    desc: 'M3042 K0 手淫二次阴茎形状读 TARGET 而非 PLAYER（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  // IF SELECTCOM == 30（手淫，CFLAG:331）\n  if (era_flag.selectcom === 30) {\n    const serve = era.get(`abl:${target}:16`) || 0;\n    const semen_addict = era.get(`abl:${target}:32`) || 0;\n    const penis = era.get(`talent:${era_flag.player}:318`) || 0;',
    replace:
      '  // IF SELECTCOM == 30（手淫，CFLAG:331）\n  if (era_flag.selectcom === 30) {\n    const serve = era.get(`abl:${target}:16`) || 0;\n    const semen_addict = era.get(`abl:${target}:32`) || 0;\n    const penis = era.get(`talent:${target}:318`) || 0;',
    tests: ['kojo-k0-tender'],
    must_mention: '手淫二次：淫乱+侍奉写 6 / 阴茎形状读 PLAYER / 阈值闸',
  },
  {
    desc: 'M3043 K0 口交首次状态推进写错（CFLAG:332 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.口交_奴 = 1;',
    replace: '      kojo.口交_奴 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '口交首次推进到 1',
  },
  {
    desc: 'M3044 K0 口交二次淫乱+侍奉门槛错位（CFLAG:332 <= 3 改 <= 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        serve >= 5 &&\n        (kojo.口交_奴 <= 3 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        serve >= 5 &&\n        (kojo.口交_奴 <= 2 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '口交二次：淫乱+侍奉写 6 / 阴茎形状读 PLAYER / 阈值闸',
  },
  {
    desc: 'M3045 K0 口交二次淫乱+侍奉写回错档（CFLAG:332 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.口交_奴 = 6;',
    replace: '        kojo.口交_奴 = 5;',
    tests: ['kojo-k0-tender'],
    must_mention: '口交二次淫乱+侍奉写 6',
  },
  {
    desc: 'M3046 K0 口交二次阴茎形状读 TARGET 而非 PLAYER（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  // IF SELECTCOM == 31（口交，CFLAG:332）\n  if (era_flag.selectcom === 31) {\n    const serve = era.get(`abl:${target}:16`) || 0;\n    const semen_addict = era.get(`abl:${target}:32`) || 0;\n    const penis = era.get(`talent:${era_flag.player}:318`) || 0;',
    replace:
      '  // IF SELECTCOM == 31（口交，CFLAG:332）\n  if (era_flag.selectcom === 31) {\n    const serve = era.get(`abl:${target}:16`) || 0;\n    const semen_addict = era.get(`abl:${target}:32`) || 0;\n    const penis = era.get(`talent:${target}:318`) || 0;',
    tests: ['kojo-k0-tender'],
    must_mention: '口交二次：淫乱+侍奉写 6 / 阴茎形状读 PLAYER / 阈值闸',
  },
  {
    desc: 'M3047 K0 乳交首次状态推进写错（CFLAG:333 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.乳交 = 1;',
    replace: '      kojo.乳交 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '乳交首次推进到 1',
  },
  {
    desc: 'M3049 K0 乳交二次淫乱+侍奉门槛错位（CFLAG:333 <= 5 改 <= 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        serve >= 5 &&\n        (kojo.乳交 <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        serve >= 5 &&\n        (kojo.乳交 <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '乳交二次：淫乱+侍奉写 6 / 门槛读 CFLAG:333',
  },
  {
    desc: 'M3050 K0 乳交二次淫乱+侍奉写回错档（CFLAG:333 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.乳交 = 6;',
    replace: '        kojo.乳交 = 5;',
    tests: ['kojo-k0-tender'],
    must_mention: '乳交二次淫乱+侍奉写 6',
  },
  {
    desc: 'M3051 K0 股间性交首次状态推进写错（CFLAG:334 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.股间性交 = 1;',
    replace: '      kojo.股间性交 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '股间性交首次推进到 1',
  },
  {
    desc: 'M3052 K0 股间性交二次淫乱+处女门槛错位（CFLAG:334 <= 5 改 <= 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        era.get(`talent:${target}:0`) === 1 &&\n        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        era.get(`talent:${target}:0`) === 1 &&\n        (kojo.股间性交 <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '股间性交二次：淫乱+处女写 6 / 阈值闸',
  },
  {
    desc: 'M3053 K0 股间性交二次淫乱+处女写回错档（CFLAG:334 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.股间性交 = 6;',
    replace: '        kojo.股间性交 = 5;',
    tests: ['kojo-k0-tender'],
    must_mention: '股间性交二次淫乱+处女写 6',
  },
  {
    desc: 'M3054 K0 股间性交二次丢掉处女条件（TALENT:0）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        era.get(`talent:${target}:0`) === 1 &&\n        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.股间性交 <= 5 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(',
    tests: ['kojo-k0-tender'],
    must_mention: '股间性交二次：淫乱+处女写 6 / 阈值闸',
  },
  {
    desc: 'M3055 K0 骑乘位首次状态推进写错（CFLAG:335 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.骑乘位 = 1;',
    replace: '      kojo.骑乘位 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位首次推进到 1',
  },
  {
    desc: 'M3057 K0 骑乘位二次淫乱+性爱狂门槛错位（CFLAG:335 <= 8 改 <= 7）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        era.get(`talent:${target}:75`) === 1 &&\n        (kojo.骑乘位 <= 8 || game.kojo.口上开关 === 2)\n      ) {\n        if (rand_n(4) === 0) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        era.get(`talent:${target}:75`) === 1 &&\n        (kojo.骑乘位 <= 7 || game.kojo.口上开关 === 2)\n      ) {\n        if (rand_n(4) === 0) {',
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位二次：淫乱+性爱狂写 9 / 门槛读 CFLAG:335',
  },
  {
    desc: 'M3058 K0 骑乘位二次淫乱+性爱狂写回错档（CFLAG:335 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.骑乘位 = 9;',
    replace: '        kojo.骑乘位 = 8;',
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位二次淫乱+性爱狂写 9',
  },
  {
    desc: 'M3059 K0 全身擦洗首次状态推进写错（CFLAG:336 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.全身擦洗 = 1;',
    replace: '      kojo.全身擦洗 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '全身擦洗首次推进到 1',
  },
  {
    desc: 'M3060 K0 全身擦洗二次淫乱+侍奉门槛错位（CFLAG:336 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        serve >= 5 &&\n        (kojo.全身擦洗 <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        serve >= 5 &&\n        (kojo.全身擦洗 <= 3 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '全身擦洗二次：淫乱+侍奉写 5 / 阈值闸',
  },
  {
    desc: 'M3061 K0 全身擦洗二次淫乱+侍奉写回错档（CFLAG:336 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.全身擦洗 = 5;',
    replace: '        kojo.全身擦洗 = 4;',
    tests: ['kojo-k0-tender'],
    must_mention: '全身擦洗二次淫乱+侍奉写 5',
  },
  {
    desc: 'M3062 K0 骑乘位肛交首次状态推进写错（CFLAG:337 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.骑乘位肛交 = 1;',
    replace: '      kojo.骑乘位肛交 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位肛交首次推进到 1',
  },
  {
    desc: 'M3063 K0 骑乘位肛交二次淫乱+A感觉门槛错位（CFLAG:337 <= 6 改 <= 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        a_sense >= 3 &&\n        (kojo.骑乘位肛交 <= 6 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        a_sense >= 3 &&\n        (kojo.骑乘位肛交 <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位肛交二次：淫乱+A感觉写 7 / 阈值闸',
  },
  {
    desc: 'M3064 K0 骑乘位肛交二次淫乱+A感觉写回错档（CFLAG:337 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.骑乘位肛交 = 7;',
    replace: '        kojo.骑乘位肛交 = 6;',
    tests: ['kojo-k0-tender'],
    must_mention: '骑乘位肛交二次淫乱+A感觉写 7',
  },
  {
    desc: 'M3065 K0 肛门侍奉首次状态推进写错（CFLAG:338 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.肛门侍奉 = 1;',
    replace: '      kojo.肛门侍奉 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '肛门侍奉首次推进到 1',
  },
  {
    desc: 'M3066 K0 肛门侍奉二次淫乱+侍奉门槛错位（CFLAG:338 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        serve >= 5 &&\n        (kojo.肛门侍奉 <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        serve >= 5 &&\n        (kojo.肛门侍奉 <= 3 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '肛门侍奉二次：淫乱+侍奉写 5 / 阈值闸',
  },
  {
    desc: 'M3067 K0 肛门侍奉二次淫乱+侍奉写回错档（CFLAG:338 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.肛门侍奉 = 5;',
    replace: '        kojo.肛门侍奉 = 4;',
    tests: ['kojo-k0-tender'],
    must_mention: '肛门侍奉二次淫乱+侍奉写 5',
  },
  {
    desc: 'M3068 K0 打屁股首次状态推进写错（CFLAG:341 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.打屁股 = 1;',
    replace: '      kojo.打屁股 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '打屁股首次推进到 1',
  },
  {
    desc: 'M3069 K0 打屁股二次淫乱+抖M门槛错位（CFLAG:341 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        masochism >= 3 &&\n        (kojo.打屁股 <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        masochism >= 3 &&\n        (kojo.打屁股 <= 3 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '打屁股二次：淫乱+抖M写 5 / 末支须 FLAG:7==2 / 阈值闸',
  },
  {
    desc: 'M3070 K0 打屁股二次淫乱+抖M写回错档（CFLAG:341 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.打屁股 = 5;',
    replace: '        kojo.打屁股 = 4;',
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
    find: '      kojo.鞭 = 1;',
    replace: '      kojo.鞭 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '鞭首次推进到 1',
  },
  {
    desc: 'M3073 K0 鞭二次淫乱+抖M门槛错位（CFLAG:342 <= 8 改 <= 7）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        masochism >= 5 &&\n        (kojo.鞭 <= 8 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        masochism >= 5 &&\n        (kojo.鞭 <= 7 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '末支门槛读 CFLAG:342 / 阈值闸',
  },
  {
    desc: 'M3074 K0 鞭二次淫乱+抖M写回错档（CFLAG:342 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.鞭 = 9;',
    replace: '        kojo.鞭 = 8;',
    tests: ['kojo-k0-tender'],
    must_mention: '鞭二次淫乱+抖M写 9',
  },
  {
    desc: 'M3076 K0 针首次状态推进写错（CFLAG:343 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.针 = 1;',
    replace: '      kojo.针 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '针首次推进到 1',
  },
  {
    desc: 'M3077 K0 针二次淫乱+抖M门槛错位（CFLAG:343 <= 8 改 <= 7）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        masochism >= 5 &&\n        (kojo.针 <= 8 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        masochism >= 5 &&\n        (kojo.针 <= 7 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '针二次：淫乱+抖M写 9 / 阈值闸',
  },
  {
    desc: 'M3078 K0 针二次淫乱+抖M写回错档（CFLAG:343 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.针 = 9;',
    replace: '        kojo.针 = 8;',
    tests: ['kojo-k0-tender'],
    must_mention: '针二次淫乱+抖M写 9',
  },
  {
    desc: 'M3079 K0 眼罩开始首次状态推进写错（CFLAG:344 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.眼罩 = 1;',
    replace: '      kojo.眼罩 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '眼罩首次推进到 1',
  },
  {
    desc: 'M3080 K0 眼罩开始二次爱慕+抖M门槛错位（CFLAG:344 <= 5 改 <= 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:85`) === 1 &&\n        masochism >= 5 &&\n        (kojo.眼罩 <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:85`) === 1 &&\n        masochism >= 5 &&\n        (kojo.眼罩 <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '眼罩开始二次：爱慕+抖M写 6 / 阈值闸',
  },
  {
    desc: 'M3081 K0 眼罩开始二次爱慕+抖M写回错档（CFLAG:344 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.眼罩 = 6;',
    replace: '        kojo.眼罩 = 5;',
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
    find: '      kojo.绳子 = 1;',
    replace: '      kojo.绳子 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '绳子首次推进到 1',
  },
  {
    desc: 'M3084 K0 绳子开始二次淫乱+抖M门槛错位（CFLAG:345 <= 8 改 <= 7）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        masochism >= 5 &&\n        (kojo.绳子 <= 8 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        masochism >= 5 &&\n        (kojo.绳子 <= 7 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '绳子开始二次：淫乱+抖M写 9 / 阈值闸',
  },
  {
    desc: 'M3085 K0 绳子开始二次淫乱+抖M写回错档（CFLAG:345 = 9 改 8）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.绳子 = 9;',
    replace: '        kojo.绳子 = 8;',
    tests: ['kojo-k0-tender'],
    must_mention: '绳子开始二次淫乱+抖M写 9',
  },
  {
    desc: 'M3086 K0 绳子脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      era.get(`talent:${target}:76`) === 1 &&\n      (kojo.绳子着脱 < 2 || game.kojo.口上开关 === 2)\n    ) {',
    replace:
      '      era.get(`talent:${target}:76`) === 1 &&\n      (kojo.绳子着脱 <= 2 || game.kojo.口上开关 === 2)\n    ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '绳子脱着：淫乱写 CFLAG:385 = 2，门槛是 < 不是 <=',
  },
  {
    desc: 'M3087 K0 口塞开始首次状态推进写错（CFLAG:346 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.口塞 = 1;',
    replace: '      kojo.口塞 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '口塞首次推进到 1',
  },
  {
    desc: 'M3088 K0 口塞开始二次爱慕+抖M门槛错位（CFLAG:346 <= 5 改 <= 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:85`) === 1 &&\n        masochism >= 5 &&\n        (kojo.口塞 <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:85`) === 1 &&\n        masochism >= 5 &&\n        (kojo.口塞 <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '口塞开始二次：爱慕+抖M写 6 / 阈值闸',
  },
  {
    desc: 'M3089 K0 口塞开始二次爱慕+抖M写回错档（CFLAG:346 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.口塞 = 6;',
    replace: '        kojo.口塞 = 5;',
    tests: ['kojo-k0-tender'],
    must_mention: '口塞开始二次爱慕+抖M写 6',
  },
  {
    desc: 'M3090 K0 口塞脱着门槛改成 <=（原文是 <）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      (era.get(`talent:${target}:85`) === 1 ||\n        era.get(`talent:${target}:76`) === 1) &&\n      (kojo.口塞着脱 < 2 || game.kojo.口上开关 === 2)\n    ) {',
    replace:
      '      (era.get(`talent:${target}:85`) === 1 ||\n        era.get(`talent:${target}:76`) === 1) &&\n      (kojo.口塞着脱 <= 2 || game.kojo.口上开关 === 2)\n    ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '口塞脱着：爱慕或淫乱写 CFLAG:386 = 2，门槛是 < 不是 <=',
  },
  {
    desc: 'M3091 K0 灌肠肛塞开始首次状态推进写错（CFLAG:347 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.灌肠肛塞 = 1;',
    replace: '      kojo.灌肠肛塞 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '灌肠肛塞首次推进到 1',
  },
  {
    desc: 'M3092 K0 灌肠肛塞开始二次淫乱+A感觉+抖M门槛错位（CFLAG:347 <= 6 改 <= 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        a_sense >= 3 &&\n        masochism >= 3 &&\n        (kojo.灌肠肛塞 <= 6 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        a_sense >= 3 &&\n        masochism >= 3 &&\n        (kojo.灌肠肛塞 <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '灌肠+肛塞开始二次：淫乱+A感觉+抖M写 7 / 阈值闸',
  },
  {
    desc: 'M3093 K0 灌肠肛塞开始二次淫乱+A感觉+抖M写回错档（CFLAG:347 = 7 改 6）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.灌肠肛塞 = 7;',
    replace: '        kojo.灌肠肛塞 = 6;',
    tests: ['kojo-k0-tender'],
    must_mention: '灌肠肛塞开始二次淫乱+A感觉+抖M写 7',
  },
  {
    desc: 'M3094 K0 灌肠肛塞脱着 RAND:2 首支旁路失效（=== 0 改 === 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: `        await era.printAndWait(
          (rand_n(2) === 0
            ? '「呀…嗯啊、啊、啊啊！　'`,
    replace: `        await era.printAndWait(
          (rand_n(2) === 1
            ? '「呀…嗯啊、啊、啊啊！　'`,
    tests: ['kojo-k0-tender'],
    must_mention: '灌肠+肛塞脱着：淫乱+A感觉拼句',
  },
  {
    desc: 'M3095 K0 灌肠肛塞脱着壶虫检查删除（TEQUIP:11 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        if (era.get(`tequip:${target}:11`)) {',
    replace: '        if (false) {',
    tests: ['kojo-k0-tender'],
    must_mention: '壶虫',
  },
  {
    desc: 'M3096 K0 灌肠肛塞脱着空 PRINTFORMW 等待被删（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "        await era.printAndWait('');\n      }\n    } else if (era.get(`talent:${target}:85`) === 1) {",
    replace:
      '        // 空等待被删\n      }\n    } else if (era.get(`talent:${target}:85`) === 1) {',
    tests: ['kojo-k0-tender'],
    must_mention: '空 PRINTFORMW 仍等待',
  },
  {
    desc: 'M3097 K0 放置PLAY首次状态推进写错（CFLAG:356 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.放置PLAY = 1;',
    replace: '      kojo.放置PLAY = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '放置PLAY首次推进到 1',
  },
  {
    desc: 'M3098 K0 放置PLAY二次淫乱+欲情门槛错位（CFLAG:356 <= 5 改 <= 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        (era.get(`palam:${target}:5`) || 0) >= PALAMLV[3] &&\n        (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        (era.get(`palam:${target}:5`) || 0) >= PALAMLV[3] &&\n        (kojo.放置PLAY <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '放置PLAY二次：淫乱+欲情写 6 / 阈值闸',
  },
  {
    desc: 'M3099 K0 放置PLAY二次淫乱+欲情写回错档（CFLAG:356 = 6 改 5）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.放置PLAY = 6;',
    replace: '        kojo.放置PLAY = 5;',
    tests: ['kojo-k0-tender'],
    must_mention: '放置PLAY二次淫乱+欲情写 6',
  },
  {
    desc: 'M3100 K0 放置PLAY二次欲情门槛改成 PALAMLV[4]（原文是 PALAMLV[3]）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        (era.get(`palam:${target}:5`) || 0) >= PALAMLV[3] &&\n        (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&\n        (kojo.放置PLAY <= 5 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '放置PLAY二次：淫乱+欲情写 6 / 阈值闸',
  },
  {
    desc: 'M3101 K0 放置PLAY首次壶虫 SIF 检查删除（TEQUIP:11 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "        await era.printAndWait(`${target_name}偷偷看着这边………`);\n      }\n      era.print('');\n\n      if (era.get(`tequip:${target}:11`)) {",
    replace:
      "        await era.printAndWait(`${target_name}偷偷看着这边………`);\n      }\n      era.print('');\n\n      if (false) {",
    tests: ['kojo-k0-tender'],
    must_mention: '首次装备 SIF：壶虫',
  },
  {
    desc: 'M3102 K0 放置PLAY二次 PRINTL 空行被删（耗尽档应仍输出）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "        kojo.放置PLAY = 2;\n      }\n      era.print('');",
    replace: '        kojo.放置PLAY = 2;\n      }\n      // PRINTL 被删',
    tests: ['kojo-k0-tender'],
    must_mention: '放置PLAY二次：淫乱+欲情写 6 / 阈值闸',
  },
  {
    desc: 'M3103 K0 交谈首次状态推进写错（CFLAG:357 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.交谈 = 1;',
    replace: '      kojo.交谈 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '交谈首次推进到 1',
  },
  {
    desc: 'M3104 K0 交谈录像自白 TFLAG:32 按位或改成赋值（|= 2 改 = 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "          // 当条件、文本留在输出语句里\n          const masturbation = (era.get(`abl:${target}:31`) || 0) >= 3;\n          era.print(\n            `于是${target_name}就将自己的本名、至今为止的性体验` +\n              (masturbation ? '以及自慰时妄想的内容' : '') +\n              `开始愉快的说了起来……`,\n          );\n          era.print(\n            `单是想到这个水晶球会流传到故乡认识的人手里，${target_name}两腿之间就变的湿润起来了……`,\n          );\n          game.kojo.录像内容 |= 2;",
    replace:
      "          // 当条件、文本留在输出语句里\n          const masturbation = (era.get(`abl:${target}:31`) || 0) >= 3;\n          era.print(\n            `于是${target_name}就将自己的本名、至今为止的性体验` +\n              (masturbation ? '以及自慰时妄想的内容' : '') +\n              `开始愉快的说了起来……`,\n          );\n          era.print(\n            `单是想到这个水晶球会流传到故乡认识的人手里，${target_name}两腿之间就变的湿润起来了……`,\n          );\n          game.kojo.录像内容 = 2;",
    tests: ['kojo-k0-tender'],
    must_mention: '录像自白 TFLAG:32 |= 2',
  },
  {
    desc: 'M3105 K0 交谈二次录像沉默支仍写 TFLAG:32（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '          era.print(`于是${target_name}就对着水晶球作起了自我介绍。`);\n          game.kojo.录像内容 |= 2;\n        } else {\n          await era.printAndWait(`但${target_name}把头转向一边什么话也不说。`);',
    replace:
      '          era.print(`于是${target_name}就对着水晶球作起了自我介绍。`);\n          game.kojo.录像内容 |= 2;\n        } else {\n          await era.printAndWait(`但${target_name}把头转向一边什么话也不说。`);\n          game.kojo.录像内容 |= 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '沉默支不写 TFLAG:32',
  },
  {
    desc: 'M3106 K0 交谈二次插着不拔门面改成 tflag:59（原文是 TFLAG:60）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '          era.print(`于是${target_name}就对着水晶球作起了自我介绍。`);\n          game.kojo.录像内容 |= 2;\n        } else {\n          await era.printAndWait(`但${target_name}把头转向一边什么话也不说。`);\n        }\n      } else {\n        if (\n          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&\n          (era.get(`talent:${target}:85`) === 1 ||\n            (era.get(`abl:${target}:10`) || 0) >= 5) &&\n          game.event.插着不拔\n        ) {',
    replace:
      "          era.print(`于是${target_name}就对着水晶球作起了自我介绍。`);\n          game.kojo.录像内容 |= 2;\n        } else {\n          await era.printAndWait(`但${target_name}把头转向一边什么话也不说。`);\n        }\n      } else {\n        if (\n          (era.get(`palam:${target}:5`) || 0) >= PALAMLV[4] &&\n          (era.get(`talent:${target}:85`) === 1 ||\n            (era.get(`abl:${target}:10`) || 0) >= 5) &&\n          era.get('tflag:59')\n        ) {",
    tests: ['kojo-k0-tender'],
    must_mention: '交谈二次：不写 CFLAG / 插着不拔情话',
  },
  {
    desc: 'M3107 K0 交谈首次录像自白 RAND:3 旁路失效（=== 0 改 === 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '          rand_n(3) === 0 &&\n          (era.get(`talent:${target}:89`) === 1 ||\n            (era.get(`abl:${target}:17`) || 0) >= 5)\n        ) {\n          // 同一行输出：无后缀 PRINTFORM 连续不换行，',
    replace:
      '          rand_n(3) === 1 &&\n          (era.get(`talent:${target}:89`) === 1 ||\n            (era.get(`abl:${target}:17`) || 0) >= 5)\n        ) {\n          // 同一行输出：无后缀 PRINTFORM 连续不换行，',
    tests: ['kojo-k0-tender'],
    must_mention: '交谈首次：淫乱推进到 1 / 录像自白写 TFLAG:32 |= 2',
  },
  {
    desc: 'M3108 K0 乳夹口交首次状态推进写错（CFLAG:360 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.乳夹口交 = 1;',
    replace: '      kojo.乳夹口交 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '乳夹口交首次推进到 1',
  },
  {
    desc: 'M3109 K0 乳夹口交二次淫乱写回错档（CFLAG:360 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.乳夹口交 = 5;',
    replace: '        kojo.乳夹口交 = 4;',
    tests: ['kojo-k0-tender'],
    must_mention: '乳夹口交二次淫乱写 5',
  },
  {
    desc: 'M3110 K0 乳夹口交二次淫乱门槛错位（CFLAG:360 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.乳夹口交 <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.乳夹口交 <= 3 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '乳夹口交二次：淫乱写 5 / 阈值闸',
  },
  {
    desc: 'M3111 K0 乳夹口交首次巨乳 SIF 检查删除（TALENT:110 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      if (era.get(`talent:${target}:76`) === 1) {\n        await era.printAndWait(\n          `${target_name}用双乳夹住了${master_name}的阴茎并把前端含进嘴里开始细致的舔舐起来。`,\n        );\n        if (\n          era.get(`talent:${target}:110`) === 1 ||\n          era.get(`talent:${target}:114`) === 1 ||\n          era.get(`talent:${target}:119`) === 1\n        ) {',
    replace:
      '      if (era.get(`talent:${target}:76`) === 1) {\n        await era.printAndWait(\n          `${target_name}用双乳夹住了${master_name}的阴茎并把前端含进嘴里开始细致的舔舐起来。`,\n        );\n        if (\n          false ||\n          era.get(`talent:${target}:114`) === 1 ||\n          era.get(`talent:${target}:119`) === 1\n        ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '乳夹口交首次：淫乱，推进到 1 / 巨乳 SIF',
  },
  {
    desc: 'M3112 K0 口交时自慰首次状态推进写错（CFLAG:361 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.口交时自慰 = 1;',
    replace: '      kojo.口交时自慰 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '口交时自慰首次推进到 1',
  },
  {
    desc: 'M3113 K0 口交时自慰二次淫乱写回错档（CFLAG:361 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.口交时自慰 = 5;',
    replace: '        kojo.口交时自慰 = 4;',
    tests: ['kojo-k0-tender'],
    must_mention: '口交时自慰二次淫乱写 5',
  },
  {
    desc: 'M3114 K0 口交时自慰二次淫乱门槛错位（CFLAG:361 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.口交时自慰 <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.口交时自慰 <= 3 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '口交时自慰二次：淫乱写 5 / 阈值闸',
  },
  {
    desc: 'M3115 K0 手搓口交首次状态推进写错（CFLAG:362 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.手搓口交 = 1;',
    replace: '      kojo.手搓口交 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '手搓口交首次推进到 1',
  },
  {
    desc: 'M3116 K0 手搓口交二次淫乱写回错档（CFLAG:362 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.手搓口交 = 5;',
    replace: '        kojo.手搓口交 = 4;',
    tests: ['kojo-k0-tender'],
    must_mention: '手搓口交二次淫乱写 5',
  },
  {
    desc: 'M3117 K0 手搓口交二次淫乱门槛错位（CFLAG:362 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.手搓口交 <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.手搓口交 <= 3 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '手搓口交二次：淫乱写 5 / 阈值闸',
  },
  {
    desc: 'M3118 K0 真空口交首次状态推进写错（CFLAG:363 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.真空口交 = 1;',
    replace: '      kojo.真空口交 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '真空口交首次推进到 1',
  },
  {
    desc: 'M3119 K0 真空口交二次淫乱写回错档（CFLAG:363 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.真空口交 = 5;',
    replace: '        kojo.真空口交 = 4;',
    tests: ['kojo-k0-tender'],
    must_mention: '真空口交二次淫乱写 5',
  },
  {
    desc: 'M3120 K0 真空口交二次淫乱门槛错位（CFLAG:363 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.真空口交 <= 4 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(\n          `${target_name}把阴茎吞入喉咙深处、发出下流的声音开始吮吸起来。`,',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.真空口交 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(\n          `${target_name}把阴茎吞入喉咙深处、发出下流的声音开始吮吸起来。`,',
    tests: ['kojo-k0-tender'],
    must_mention: '真空口交二次：淫乱写 5 / 阈值闸',
  },
  {
    desc: 'M3121 K0 六九式首次状态推进写错（CFLAG:364 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.六九式 = 1;',
    replace: '      kojo.六九式 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '六九式首次推进到 1',
  },
  {
    desc: 'M3122 K0 六九式二次淫乱写回错档（CFLAG:364 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.六九式 = 5;',
    replace: '        kojo.六九式 = 4;',
    tests: ['kojo-k0-tender'],
    must_mention: '六九式二次淫乱写 5',
  },
  {
    desc: 'M3123 K0 六九式二次淫乱门槛错位（CFLAG:364 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.六九式 <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.六九式 <= 3 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '六九式二次：淫乱写 5 / 阈值闸',
  },
  {
    desc: 'M3124 K0 深喉首次状态推进写错（CFLAG:365 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.深喉 = 1;',
    replace: '      kojo.深喉 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '深喉首次推进到 1',
  },
  {
    desc: 'M3125 K0 深喉二次淫乱写回错档（CFLAG:365 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.深喉 = 5;',
    replace: '        kojo.深喉 = 4;',
    tests: ['kojo-k0-tender'],
    must_mention: '深喉二次淫乱写 5',
  },
  {
    desc: 'M3127 K0 深喉二次淫乱门槛错位（CFLAG:365 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.深喉 <= 4 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(\n          `${target_name}把阴茎吞入喉咙深处、用嘴唇紧紧含着根部。`,',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.深喉 <= 3 || game.kojo.口上开关 === 2)\n      ) {\n        await era.printAndWait(\n          `${target_name}把阴茎吞入喉咙深处、用嘴唇紧紧含着根部。`,',
    tests: ['kojo-k0-tender'],
    must_mention: '深喉二次：淫乱门槛读 CFLAG:365',
  },
  {
    desc: 'M3128 K0 强制口交首次状态推进写错（CFLAG:381 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.强制口交 = 1;',
    replace: '      kojo.强制口交 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '强制口交首次推进到 1',
  },
  {
    desc: 'M3129 K0 强制口交二次淫乱写回错档（CFLAG:381 = 5 改 4）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.强制口交 = 5;',
    replace: '        kojo.强制口交 = 4;',
    tests: ['kojo-k0-tender'],
    must_mention: '强制口交二次淫乱写 5',
  },
  {
    desc: 'M3130 K0 强制口交二次淫乱门槛错位（CFLAG:381 <= 4 改 <= 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.强制口交 <= 4 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.强制口交 <= 3 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '强制口交二次：淫乱写 5 / 黑心 / 阈值闸',
  },
  {
    desc: 'M3131 K0 强制口交二次淫乱黑心插值改成白心（heart_black→heart）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '          `「嗯～嗯呼唔呜…嗯～…嗯姆呜呜…嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}嗯～${heart_black(1)}」`,\n        );\n        if (semen_addict >= 3) {',
    replace:
      '          `「嗯～嗯呼唔呜…嗯～…嗯姆呜呜…嗯～${heart(1)}嗯～${heart(1)}嗯～${heart(1)}嗯～${heart(1)}嗯～${heart(1)}」`,\n        );\n        if (semen_addict >= 3) {',
    tests: ['kojo-k0-tender'],
    must_mention: '强制口交二次：淫乱写 5 / 黑心 / 阈值闸',
  },
  {
    desc: 'M3132 K0 穿环首次状态推进写错（CFLAG:348 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.穿环 = 1;',
    replace: '      kojo.穿环 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环首次推进到 1',
  },
  {
    desc: 'M3133 K0 穿环二次淫乱写回错档（CFLAG:348 = 4 改 3）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.穿环 = 4;',
    replace: '        kojo.穿环 = 3;',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环二次淫乱写 4',
  },
  {
    desc: 'M3134 K0 穿环二次淫乱门槛错位（CFLAG:348 <= 3 改 <= 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.穿环 <= 3 || game.kojo.口上开关 === 2)\n      ) {',
    replace:
      '        era.get(`talent:${target}:76`) === 1 &&\n        (kojo.穿环 <= 2 || game.kojo.口上开关 === 2)\n      ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环二次：淫乱写 4 / 阈值闸',
  },
  {
    desc: 'M3135 K0 穿环二次爱慕写回错档（CFLAG:348 = 3 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.穿环 = 3;',
    replace: '        kojo.穿环 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环二次爱慕写 3',
  },
  {
    desc: 'M3136 K0 穿环二次それ以外写回错档（CFLAG:348 = 2 改 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.穿环 = 2;',
    replace: '        kojo.穿环 = 1;',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环二次それ以外写 2',
  },
  {
    desc: 'M3137 K0 穿环首次 CFLAG:7 位图闸改恒真（取下支失效）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      } else if (era.get(`talent:${target}:76`) === 1) {\n        if (train.穿环状态 & p) {',
    replace:
      '      } else if (era.get(`talent:${target}:76`) === 1) {\n        if (true) {',
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
    find: '            await era.printAndWait(`「额呵呵、好像很时尚呢…♪」`);\n            await era.printAndWait(`${target_name}抚摸着被穿环的肚脐的周边………`);\n          } else if (p === 4) {\n            await era.printAndWait(\n              `「啊啊啊～！请…请不要这样拉扯啊…咿～～！」`,\n            );\n            await era.printAndWait(\n              `${target_name}因为被拉扯穿环而扩张开的阴唇而悲鸣起来………`,\n            );\n          } else if (p === 8) {\n            if (\n              era.get(`talent:${target}:121`) ||\n              era.get(`talent:${target}:122`)\n            ) {',
    replace:
      '            await era.printAndWait(`「额呵呵、好像很时尚呢…♪」`);\n            await era.printAndWait(`${target_name}抚摸着被穿环的肚脐的周边………`);\n          } else if (p === 4) {\n            await era.printAndWait(\n              `「啊啊啊～！请…请不要这样拉扯啊…咿～～！」`,\n            );\n            await era.printAndWait(\n              `${target_name}因为被拉扯穿环而扩张开的阴唇而悲鸣起来………`,\n            );\n          } else if (p === 8) {\n            if (\n              era.get(`talent:${target}:121`) ||\n              era.get(`talent:${target}:123`)\n            ) {',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环二次：爱慕写 3 / 阴茎位走鸡鸡支',
  },
  {
    desc: 'M3140 K0 穿环首次乳头位 P==1 改 P==2（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '            `${target_name}因为肌肤头一次被开洞而痛得禁不住悲鸣起来。`,\n          );\n          if (p === 1) {',
    replace:
      '            `${target_name}因为肌肤头一次被开洞而痛得禁不住悲鸣起来。`,\n          );\n          if (p === 2) {',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环首次：淫乱 + 乳头位（P=1）装上，推进到 1',
  },
  {
    desc: 'M3141 K0 穿环首次淫乱素质条件错格（TALENT:76 改 77）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      } else if (era.get(`talent:${target}:76`) === 1) {\n        if (train.穿环状态 & p) {',
    replace:
      '      } else if (era.get(`talent:${target}:77`) === 1) {\n        if (train.穿环状态 & p) {',
    tests: ['kojo-k0-tender'],
    must_mention: '穿环首次：淫乱 + 乳头位（P=1）装上，推进到 1',
  },
  {
    desc: 'M3142 K0 EVENTTRAIN NORMAL 总开关检查删松（<= 0 改 < 0）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "  const assi_name = assi >= 0 ? chara_callname(assi) : '';\n\n  if (game.kojo.口上开关 <= 0) {\n    return 0;\n  }",
    replace:
      "  const assi_name = assi >= 0 ? chara_callname(assi) : '';\n\n  if (game.kojo.口上开关 < 0) {\n    return 0;\n  }",
    tests: ['kojo-k0-tender'],
    must_mention: 'FLAG:7 <= 0 静默',
  },
    desc: 'M3143 K0 EVENTTRAIN NORMAL 慈爱素质检查错格（!== 1 改 !== 0）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (chara(target).chara.慈爱 !== 1) {\n    return 0;\n  }\n  if (kojo.初调教 === 0) {',
    replace:
      '  if (chara(target).chara.慈爱 !== 0) {\n    return 0;\n  }\n  if (kojo.初调教 === 0) {',
    tests: ['kojo-k0-tender'],
    must_mention: 'K0 EVENTTRAIN NORMAL：非慈爱素质静默',
  },
  {
    desc: 'M3144 K0 EVENTTRAIN NORMAL 首次精灵状态推进写错（CFLAG:201 = 1 改 2）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      await era.printAndWait(`只是想想如何去玷污这个女精灵你就猛地硬了起来………`);\n      kojo.初调教 = 1;',
    replace:
      '      await era.printAndWait(`只是想想如何去玷污这个女精灵你就猛地硬了起来………`);\n      kojo.初调教 = 2;',
    tests: ['kojo-k0-tender'],
    must_mention: '首次精灵推进到 1',
  },
  {
    desc: 'M3145 K0 EVENTTRAIN NORMAL 首次魔族不写 CFLAG:370（改 0）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      kojo.初调教 = 1;\n      kojo.魔族化 = 1;',
    replace: '      kojo.初调教 = 1;\n      kojo.魔族化 = 0;',
    tests: ['kojo-k0-tender'],
    must_mention: '首次魔族同时写 CFLAG:370 = 1',
  },
  {
    desc: 'M3146 K0 EVENTTRAIN NORMAL 魔族化二次写 2 改 3（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    kojo.魔族化 = 2;',
    replace: '    kojo.魔族化 = 3;',
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
    find: '      kojo.NTR再捕获 = 0;\n    } else {',
    replace: '      kojo.NTR再捕获 = 1;\n    } else {',
    tests: ['kojo-k0-tender'],
    must_mention: 'NTR 再捕获爱慕清 650',
  },
  {
    desc: 'M3149 K0 EVENTTRAIN NORMAL NTR 未陷落不清 650（写 1）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      await era.printAndWait(`看起来${target_name}已经接受了自己的命运………`);\n      kojo.NTR再捕获 = 0;',
    replace:
      '      await era.printAndWait(`看起来${target_name}已经接受了自己的命运………`);\n      kojo.NTR再捕获 = 1;',
    tests: ['kojo-k0-tender'],
    must_mention: 'NTR 再捕获未陷落清 650',
  },
  {
    desc: 'M3150 K0 EVENTTRAIN NORMAL 屈服 Lv1 写 2 改 3（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    kojo.初调教 = 2;',
    replace: '    kojo.初调教 = 3;',
    tests: ['kojo-k0-tender'],
    must_mention: '屈服 Lv1 写 2',
  },
  {
    desc: 'M3151 K0 EVENTTRAIN NORMAL 淫乱写 5 改 6（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    kojo.初调教 = 5;',
    replace: '    kojo.初调教 = 6;',
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
    find: '    kojo.初调教 = 7;',
    replace: '    kojo.初调教 = 8;',
    tests: ['kojo-k0-tender'],
    must_mention: '爱慕写 7',
  },
  {
    desc: 'M3153 K0 EVENTTRAIN NORMAL 崩坏写 9 改 8（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    kojo.初调教 = 9;',
    replace: '    kojo.初调教 = 8;',
    tests: ['kojo-k0-tender'],
    must_mention: '崩坏写 9',
  },
  {
    desc: 'M3154 K0 二次口上崩坏 FLAG:7==2 改 ==1（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 2) {\n    era.drawLine();\n    await era.printAndWait(`「嘻嘻～…嘻～…请不要打扰我的祈祷…嘻～…嘻～」`);',
    replace:
      '  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 1) {\n    era.drawLine();\n    await era.printAndWait(`「嘻嘻～…嘻～…请不要打扰我的祈祷…嘻～…嘻～」`);',
    tests: ['kojo-k0-tender'],
    must_mention: '无助手落入二次口上（崩坏祈祷）',
  },
  {
    desc: 'M3155 K0 二次口上故乡恋人 TALENT:317 == 4 改 5（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    if (chara(target).chara.喜欢的东西 === 4) {\n      await era.printAndWait(`（啊啊…无论发生什么…${sc()}都会与你同在……）`);',
    replace:
      '    if (chara(target).chara.喜欢的东西 === 5) {\n      await era.printAndWait(`（啊啊…无论发生什么…${sc()}都会与你同在……）`);',
    tests: ['kojo-k0-tender'],
    must_mention: '屈服 Lv0 故乡恋人',
  },
  {
    desc: 'M3156 K0 二次口上淫乱 FLAG:7==2 改 ==1（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  } else if (era.get(`talent:${target}:76`) === 1 && game.kojo.口上开关 === 2) {\n    era.drawLine();',
    replace:
      '  } else if (era.get(`talent:${target}:76`) === 1 && game.kojo.口上开关 === 1) {\n    era.drawLine();',
    tests: ['kojo-k0-tender'],
    must_mention: 'K0 二次口上：FLAG:7==1 静默',
  },
  {
    desc: 'M3157 K0 EVENTTRAIN NORMAL 村娘助手首次写 202 = 1 改 2（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '        kojo.简易助手_0 = 1;',
    replace: '        kojo.简易助手_0 = 2;',
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
    desc: 'M3159 K0 EVENTEND NORMAL 死亡检查 <= 0 改 < 0（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (chara(target).dungeon.体力 <= 0) {\n    return 0;\n  }',
    replace: '  if (chara(target).dungeon.体力 < 0) {\n    return 0;\n  }',
    tests: ['kojo-k0-tender'],
    must_mention: '角色死亡 BASE:0 <= 0 静默',
  },
  {
    desc: 'M3160 K0 EVENTEND NORMAL 崩坏 FLAG:7==2 改 ==1（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  }\n\n  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 2) {',
    replace:
      '  }\n\n  if (era.get(`talent:${target}:9`) === 1 && game.kojo.口上开关 === 1) {',
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
    desc: 'M3167 K0 SELF_KOJO 性交档写 2 改 1（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      era.set(`cflag:${target}:264`, 2);',
    replace: '      era.set(`cflag:${target}:264`, 1);',
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==4 性交（ABL:2>=4 推进 CFLAG:264）',
  },
  {
    desc: 'M3168 K0 SELF_KOJO 夜间档写 1 改 2（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '      era.set(`cflag:${target}:265`, 1);',
    replace: '      era.set(`cflag:${target}:265`, 2);',
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==5 夜间（推进 CFLAG:265）',
  },
  {
    desc: 'M3169 K0 SELF_KOJO 卖出爱慕支素质条件错格（TALENT:85 改 86）（#231）',
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
    find: '  game.train.初吻与自我口上 = 0; // TFLAG:13 = 0（跨域走门面）',
    replace: `  // 变异：TFLAG:13 清理删除`,
    tests: ['kojo-k0-tender'],
    must_mention: '结尾清 TFLAG:13',
  },
  {
    desc: 'M3172 K0 SELF_KOJO 自慰档读 TFLAG:13 改成 TFLAG:14（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (game.train.初吻与自我口上 === 1) {',
    replace: '  if (game.train.初吻与自我口上 === 14) {',
    tests: ['kojo-k0-tender'],
    must_mention: 'TFLAG:13==1 自慰 Q==0 主人档（淫乱推进 CFLAG:261）',
  },

  {
    desc: 'M3173 K0 PALAMCNG 润滑首超检查删松（P 阈值改恒 true）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  let p = (era.get(`palam:${target}:3`) || 0) + chara(target).train.润滑增量;\n  if (p > PALAMLV[2] && (era.get(`cflag:${target}:221`) || 0) === 0) {',
    replace:
      '  let p = (era.get(`palam:${target}:3`) || 0) + chara(target).train.润滑增量;\n  if (true) { // 变异：P 阈值删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'PALAMCNG：Lv2 阈值前保留首次口上，超过后各触发一次',
  },
  {
    desc: 'M3174 K0 PALAMCNG CFLAG:221 防重删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  let p = (era.get(`palam:${target}:3`) || 0) + chara(target).train.润滑增量;\n  if (p > PALAMLV[2] && (era.get(`cflag:${target}:221`) || 0) === 0) {',
    replace:
      '  let p = (era.get(`palam:${target}:3`) || 0) + chara(target).train.润滑增量;\n  if (p > PALAMLV[2] && false) { // 变异：防重删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'PALAMCNG：Lv2 阈值前保留首次口上，超过后各触发一次',
  },
    desc: 'M3175 K0 PALAMCNG 总开关检查删松（flag_guard 关掉）（#231）',
    file: 'ere/kojo/kojo-system.js',
    find: "  return run_kojo('kojo_message_palamcng', kojo_message_palamcng_family, {\n    args: [rand],\n    flag_guard: true,",
    replace:
      "  return run_kojo('kojo_message_palamcng', kojo_message_palamcng_family, {\n    args: [rand],\n    flag_guard: false, // 变异：总开关删松",
    tests: ['kojo-k0-tender'],
    must_mention: 'PALAMCNG：总开关 FLAG:7 <= 0 静默',
  },
  {
    desc: 'M3176 K0 PALAMCNG 助手调教检查删松（ASSI/ASSIPLAY 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%\n  const sc = () => self_call(target); // %SELF_CALL(TARGET)%\n  const kojo = chara(target).kojo;\n\n  if (era_flag.assi > 0 && era_flag.assiplay) {',
    replace:
      '  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%\n  const sc = () => self_call(target); // %SELF_CALL(TARGET)%\n  const kojo = chara(target).kojo;\n\n  if (false) { // 变异：助手检查删松',
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
    desc: 'M3179 K0 MARKCNG 总开关检查删松（flag_guard 关掉）（#231）',
    file: 'ere/kojo/kojo-system.js',
    find: "  return run_kojo('kojo_message_markcng', kojo_message_markcng_family, {\n    args: [rand],\n    flag_guard: true,",
    replace:
      "  return run_kojo('kojo_message_markcng', kojo_message_markcng_family, {\n    args: [rand],\n    flag_guard: false, // 变异：总开关删松",
    tests: ['kojo-k0-tender'],
    must_mention: 'MARKCNG：总开关 FLAG:7 <= 0 静默',
  },
  {
    desc: 'M3180 K0 MARKCNG 助手调教检查删松（ASSI/ASSIPLAY 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  const target = era_flag.target;\n  const sc = () => self_call(target); // %SELF_CALL(TARGET)%\n  const kojo = chara(target).kojo;\n\n  if (era_flag.assi > 0 && era_flag.assiplay) {',
    replace:
      '  const target = era_flag.target;\n  const sc = () => self_call(target); // %SELF_CALL(TARGET)%\n  const kojo = chara(target).kojo;\n\n  if (false) { // 变异：助手检查删松',
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
    find: '      era.get(`talent:${target}:22`) === 1\n    ) {\n      await era.printAndWait(`「………好吧、尽管来吧」`);',
    replace:
      '      if (false) { // 变异：淫乱分支删松\n      await era.printAndWait(`「………好吧、尽管来吧」`);',
    tests: ['kojo-k0-tender'],
    must_mention: 'DUNGEON_RYOUZYOKU：非处女 + 淫乱（TALENT:76）分档出声',
  },
  {
    desc: 'M3183 K0 GOHOUBI_REQUEST 奖金分支删松（CFLAG:504==0 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '\n  if ((era.get(`cflag:${target}:504`) || 0) === 0) {',
    replace: '\n  if (false) { // 变异：奖金分支删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'GOHOUBI_REQUEST：CFLAG:504==0 奖金请求',
  },
  {
    desc: 'M2445 K0 GOHOUBI_AFTER choice==0 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (choice === 0) {\n    await era.printAndWait(`「………那个、不、没什么」`);',
    replace:
      '  if (false) { // 变异：choice==0 删松\n    await era.printAndWait(`「………那个、不、没什么」`);',
    tests: ['kojo-k0-tender'],
    must_mention: 'GOHOUBI_AFTER：choice==0 无特别',
  },
  {
    desc: 'M2446 K0 GOHOUBI_AFTER 买药分支删松（CFLAG:504==0 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    if ((era.get(`cflag:${target}:504`) || 0) === 0) {',
    replace: '  if (false) { // 变异：买药分支删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'GOHOUBI_AFTER：choice==2 && CFLAG:504==0 买药台词',
  },
  {
    desc: 'M2447 K0 OSIOKI choice==1 快感分支删松（ABL:21 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    if (era.get(`abl:${target}:21`) >= 3) {\n      await era.printAndWait(`「哈咿～～！哔哩哔哩～哔哩哔哩的好爽啊～！」`);',
    replace:
      '  if (false) { // 变异：快感分支删松\n      await era.printAndWait(`「哈咿～～！哔哩哔哩～哔哩哔哩的好爽啊～！」`);',
    tests: ['kojo-k0-tender'],
    must_mention: 'OSIOKI：choice==1 && ABL:21 >= 3 快感台词',
  },

  {
    desc: 'M2448 K0 BENKI 分档删松（FLAG:62==0 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: "  if (era.get('flag:62') === 0) {",
    replace: '  if (false) { // 变异：FLAG:62==0 删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'BENKI_KOUJO：FLAG:62=0 + FLAG:63=1 → 施舍工作台词',
  },
  {
    desc: 'M2449 K0 VICTORY 首句删松（改恒 true）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  await era.printAndWait(`「爱能拯救世界！」`);',
    replace:
      '  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));\n  // 变异：首句删除',
    tests: ['kojo-k0-tender'],
    must_mention: 'VICTORY：素质分档 + 体力比判定',
  },
  {
    desc: 'M2450 K0 ATTACK CFLAG:1==2 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (era.get(`cflag:${target}:1`) === 2) {',
    replace: '  if (false) { // 变异：CFLAG:1==2 删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'ATTACK：CFLAG:1==2 + 强气素质 → 爱的火焰',
  },
  {
    desc: 'M2451 K0 GOBI 喜档槽位改错（原 arg_0==1 分支随 #865 并入常量表，#231）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "    tiers: ['♪', '！', '……。', '……。', '……呜呜。'],",
    replace:
      "    tiers: ['', '！', '……。', '……。', '……呜呜。'], // 变异：档位 1 不再落这一支",
    tests: ['kojo-k0-tender'],
    must_mention: 'GOBI：arg_0=1 → 返回 ♪',
  },
  {
    desc: 'M2452 K0 ENTERENEMY 献身分支删松（TALENT:21/22 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '    era.get(`talent:${target}:21`) === 1 ||\n    era.get(`talent:${target}:22`) === 1\n  ) {\n    await era.printAndWait(`「……我是不会输的」`);',
    replace:
      '    if (false) { // 变异：献身分支删松\n    await era.printAndWait(`「……我是不会输的」`);',
    tests: ['kojo-k0-tender'],
    must_mention: 'ENTERENEMY：献身（TALENT:21）→ 我是不会输的',
  },

  {
    desc: 'M2453 K0 NTR P==1 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '\n  if (p === 1) {',
    replace: '\n  if (false) { // 变异：P==1 删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'NTR：P==1 + 淫乱（TALENT:76）→ 求饶台词 + CFLAG:651 记录',
  },
  {
    desc: 'M2454 K0 EXUCUTION 事件类型 4 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (event_type === 4) {',
    replace: '  if (false) { // 变异：事件类型 4 删松',
    tests: ['kojo-k0-tender'],
    must_mention: 'EXUCUTION：事件类型 4 → 求饶台词',
  },
  {
    desc: 'M2455 K0 MUSEUM 事件类型 3 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  } else if (event_type === 3) {\n    await era.printAndWait(`「${sc()}、不想…变成·这·样…」`);',
    replace:
      '  if (false) { // 变异：事件类型 3 删松\n    await era.printAndWait(`「${sc()}、不想…变成·这·样…」`);',
    tests: ['kojo-k0-tender'],
    must_mention: 'MUSEUM：事件类型 3 → 不想变成这样',
  },
  {
    desc: 'M2456 K0 BANISHMENT 事件类型 0 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (event_type === 0) {\n    await era.printAndWait(`「即使失去力量…${sc()}也有能做的事…！」`);',
    replace:
      '  if (false) { // 变异：事件类型 0 删松\n    await era.printAndWait(`「即使失去力量…${sc()}也有能做的事…！」`);',
    tests: ['kojo-k0-tender'],
    must_mention: 'BANISHMENT：事件类型 0 → 失去力量也有能做的事',
  },
  {
    desc: 'M2457 K0 PUBLIC_EXUCUTION 事件类型 0 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (event_type === 0) {\n    await era.printAndWait(\n      `「啊啊…啊啊…为什么要…这样对待${sc()}…咿…咿呀啊啊啊啊啊啊啊啊！」`,',
    replace:
      '  if (false) { // 变异：事件类型 0 删松\n    await era.printAndWait(\n      `「啊啊…啊啊…为什么要…这样对待${sc()}…咿…咿呀啊啊啊啊啊啊啊啊！」`,',
    tests: ['kojo-k0-tender'],
    must_mention: 'PUBLIC_EXUCUTION：事件类型 0 → 为什么这样对待',
  },
  {
    desc: 'M2458 K0 COLOSSEUM selectcom 55 分支删松（改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (era_flag.selectcom === 55) {\n    if (era.get(`base:${target}:1`) <= 0) {',
    replace:
      '  if (false) { // 变异：selectcom 55 删松\n    if (era.get(`base:${target}:1`) <= 0) {',
    tests: ['kojo-k0-tender'],
    must_mention:
      '死斗场（TEQUIP:55）最先：岔进 COLOSSEUM_KOJO_0 真身（selectcom 55 + 体力低）',
  },

  {
    desc: 'M2459 K0 DOG selectcom 0 初次分支删松（CFLAG:301==0 改恒 false）（#231）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: '  if (era_flag.selectcom === 0) {\n    if ((era.get(`cflag:${target}:301`) || 0) === 0) {',
    replace:
      '  if (false) { // 变异：selectcom 0 删松\n    if ((era.get(`cflag:${target}:301`) || 0) === 0) {',
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
    desc: 'M3303 K13 EVENTTRAIN 自身检查①口上开关条件反转（<=0 改 >0，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '  const { rand_n, target, target_name, master_name, sc, kojo } = bind_ctx(rand);\n  if (game.kojo.口上开关 <= 0) {\n    return 0;\n  }',
    replace:
      '  const { rand_n, target, target_name, master_name, sc, kojo } = bind_ctx(rand);\n  if (game.kojo.口上开关 > 0) { // 变异\n    return 0;\n  }',
    tests: ['kojo-k13-protector'],
    must_mention: '自身检查①口上开关',
  },
  {
    desc: 'M3321 K13 爱抚初回刻印分档删（MARK:2>=2 改 >=3，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '      if (era0(`mark:${target}:2`) >= 2) {\n        await era.printAndWait(`「噫、再这样摸下去的话……不行了！」`);',
    replace:
      '      if (era0(`mark:${target}:2`) >= 3) { // 变异\n        await era.printAndWait(`「噫、再这样摸下去的话……不行了！」`);',
    tests: ['kojo-k13-protector'],
    must_mention: '爱抚初回刻印推进到 1',
  },
  {
    desc: 'M3322 K13 爱抚淫乱档推进写错（CFLAG:301=6 改 5，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '        await era.printAndWait(`「啊、啊……快点让${sc()}的身子燃烧起来吧……♪」`);\n        // CFLAG:301  = 6（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 6;',
    replace:
      '        await era.printAndWait(`「啊、啊……快点让${sc()}的身子燃烧起来吧……♪」`);\n        // CFLAG:301  = 6（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 5; // （变异）',
    tests: ['kojo-k13-protector'],
    must_mention: '淫乱分支推进到 6',
  },
  {
    desc: 'M3323 K13 爱抚爱慕档推进写错（CFLAG:301=5 改 4，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '        await era.printAndWait(`「请用力地抚弄${sc()}……还要……♪」`);\n\n        // CFLAG:301  = 5（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 5;',
    replace:
      '        await era.printAndWait(`「请用力地抚弄${sc()}……还要……♪」`);\n\n        // CFLAG:301  = 5（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 4; // （变异）',
    tests: ['kojo-k13-protector'],
    must_mention: '爱慕分支推进到 5',
  },
  {
    desc: 'M3324 K13 爱抚屈服Lv3 档推进写错（CFLAG:301=4 改 3，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '        }\n        // CFLAG:301  = 4（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 4;',
    replace:
      '        }\n        // CFLAG:301  = 4（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 3; // （变异）',
    tests: ['kojo-k13-protector'],
    must_mention: '屈服Lv3 分支推进到 4',
  },
  {
    desc: 'M3325 K13 爱抚屈服Lv2 档推进写错（CFLAG:301=3 改 2，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '        await era.printAndWait(`「手法还挺……熟练的嘛？」`);\n        // CFLAG:301  = 3（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 3;',
    replace:
      '        await era.printAndWait(`「手法还挺……熟练的嘛？」`);\n        // CFLAG:301  = 3（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 2; // （变异）',
    tests: ['kojo-k13-protector'],
    must_mention: '屈服Lv2 分支推进到 3',
  },
  {
    desc: 'M3326 K13 爱抚それ以外推进写错（CFLAG:301=2 改 1，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '        );\n        // CFLAG:301  = 2（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 2;',
    replace:
      '        );\n        // CFLAG:301  = 2（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 1; // （变异）',
    tests: ['kojo-k13-protector'],
    must_mention: 'それ以外推进到 2',
  },
  {
    desc: 'M3327 K13 阈值闸旁路删松（FLAG:7==2 改恒 false，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '        era0(`talent:${target}:76`) == 1 &&\n        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)\n      ) {\n        await era.printAndWait(`「啊、啊……快点让${sc()}的身子燃烧起来吧……♪」`);',
    replace:
      '        era0(`talent:${target}:76`) == 1 &&\n        (kojo.爱抚 <= 5 || false)\n      ) {\n        await era.printAndWait(`「啊、啊……快点让${sc()}的身子燃烧起来吧……♪」`);',
    tests: ['kojo-k13-protector'],
    must_mention: '阈值闸 FLAG:7==2 旁路重出声',
  },
  {
    desc: 'M3330 K13 PALAMCNG 口塞检查删（TEQUIP:45 不再跳过，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '  if (era0(`tequip:${target}:45`)) {\n    return 0;\n  }\n\n  if (game.train.失神) {',
    replace:
      '  if (false) { // 变异\n    return 0;\n  }\n\n  if (game.train.失神) {',
    tests: ['kojo-k13-protector'],
    must_mention: 'PALAMCNG 口塞检查',
  },
  {
    desc: 'M3331 K13 PALAMCNG 首次润滑推进写错（CFLAG:221=1 改 2，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '    kojo.首次润滑Lv2 = 1;',
    replace: '    kojo.首次润滑Lv2 = 2; // （变异）',
    tests: ['kojo-k13-protector'],
    must_mention: 'PALAMCNG 首次润滑Lv2 推进到 1',
  },
  {
    desc: 'M3332 K13 PALAMCNG 首次C绝顶推进写错（CFLAG:225=1 改 2，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '    kojo.首次C绝顶 = 1;',
    replace: '    kojo.首次C绝顶 = 2; // （变异）',
    tests: ['kojo-k13-protector'],
    must_mention: 'PALAMCNG 首次C绝顶推进到 1',
  },
  {
    desc: 'M3333 K13 MARKCNG 苦痛刻印Lv3 推进写错（CFLAG:297=1 改 2，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '    kojo.苦痛刻印Lv3 = 1;',
    replace: '    kojo.苦痛刻印Lv3 = 2; // （变异）',
    tests: ['kojo-k13-protector'],
    must_mention: 'MARKCNG 苦痛刻印Lv3 推进到 1',
  },
  {
    desc: 'M3334 K13 正常位初回推进写错（CFLAG:321=1 改 2，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '      kojo.正常位 = 1;',
    replace: '      kojo.正常位 = 2; // （变异）',
    tests: ['kojo-k13-protector'],
    must_mention: '正常位初回推进到 1',
  },
  {
    desc: 'M3335 K13 SELF_KOJO 成熟出售真身调用丢失（#338）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '      await sell_maturo_k0(target, { rand }); // CALL SELL_MATURO_K0',
    replace: `      // 变异：成熟出售真身调用丢失`,
    tests: ['sell-maturo'],
    must_mention: '14 个活动口上的成熟出售事件均进入市场真身',
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
    desc: 'M3337 K13 DUNGEON_ATTACK 侵略状态==2 条件反转（==2 改 ==1，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: `  if (chara(target).invasion.状态 == 2) {`,
    replace: `  if (chara(target).invasion.状态 == 1) { // 变异`,
    tests: ['kojo-k13-protector'],
    must_mention: 'DUNGEON_ATTACK 侵略状态==2',
  },
  {
    desc: 'M3338 K13 GOHOUBI_AFTER choice==0 台词改错（#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '    await era.printAndWait(`「这样啊……真失望」`);',
    replace: '    await era.printAndWait(`「这样啊……真高兴」`); // （变异）',
    tests: ['kojo-k13-protector'],
    must_mention: 'GOHOUBI_AFTER choice==0',
  },
  {
    desc: 'M3339 K13 NTR P==1 首次开关写错（CFLAG:650=1 改 0，#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '    kojo.NTR再捕获 = 1;',
    replace: '    kojo.NTR再捕获 = 0; // （变异）',
    tests: ['kojo-k13-protector'],
    must_mention: 'NTR 开关 CFLAG:650',
  },
  {
    desc: 'M3340 K13 GOBI ARG:0==1 语尾改错（#244）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "    tiers: ['嗯♪', '哦！', '是的……。', '……。', '就是这样……。'],",
    replace:
      "    tiers: ['哦！', '哦！', '是的……。', '……。', '就是这样……。'], // 变异",
    tests: ['kojo-k13-protector'],
    must_mention: 'GOBI ARG:0==1',
  },
  {
    desc: 'M3341 K13 ENTERENEMY 默认档台词改错（#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '    await era.printAndWait(`「呵呵、${self_call(a)}、会努力的♪」`);',
    replace:
      '    await era.printAndWait(`「呵呵、${self_call(a)}不会努力的♪」`); // （变异）',
    tests: ['kojo-k13-protector'],
    must_mention: 'ENTERENEMY 默认档',
  },
  {
    desc: 'M3342 K13 EXUCUTION 档4 台词改错（#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '    await era.printAndWait(`「噫、有谁……可以救救我」`);',
    replace:
      '    await era.printAndWait(`「噫、没人……可以救救我」`); // （变异）',
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
    find: '    await era.printAndWait(`「怎么会这样……${sc()}的……第一次……」`);',
    replace:
      '    await era.printAndWait(`「怎么会这样……${sc()}的……第二次……」`); // （变异）',
    tests: ['kojo-k13-protector'],
    must_mention: 'DUNGEON_RYOUZYOKU 处女默认档',
  },
  {
    desc: 'M3345 K13 BENKI 肉便器行动==0 默认档台词改错（#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '      await era.printAndWait(`「好的……会尽全力服侍的……」`);',
    replace:
      '      await era.printAndWait(`「好的……不会服侍的……」`); // （变异）',
    tests: ['kojo-k13-protector'],
    must_mention: 'BENKI 肉便器行动==0',
  },
  {
    desc: 'M3346 K13 GOHOUBI_REQUEST 金钱台词改错（#244）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: 'await era.printAndWait(`「等${sc()}存够了钱、我们一起出去旅游吧♪　呵呵」`);',
    replace:
      'await era.printAndWait(`「等${sc()}存够了钱、我们一起出去不旅游吧♪　呵呵」`);',
    tests: ['kojo-k13-protector'],
    must_mention: 'GOHOUBI_REQUEST 金钱',
  },
  {
    desc: 'M3402 K14 EVENTTRAIN 初调教通常男档写回值改错（初调教=1 改 2，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '      kojo.初调教 = 1;\n    } else if (',
    replace: '      kojo.初调教 = 2; // （变异）\n    } else if (',
    tests: ['kojo-k14-nobleman'],
    must_mention: '通常男（TALENT:122）',
  },
  {
    desc: 'M3403 K14 EVENTTRAIN 男魔族档写回值改错（初调教=1 改 2，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '        `但对于魔族之王的你的忠诚已经深刻于心，从心底感觉到无法违抗………`,\n      );\n      // CFLAG:201  = 1（变量语义：CFLAG 族，201）\n      kojo.初调教 = 1;',
    replace:
      '        `但对于魔族之王的你的忠诚已经深刻于心，从心底感觉到无法违抗………`,\n      );\n      // CFLAG:201  = 1（变量语义：CFLAG 族，201）\n      kojo.初调教 = 2; // （变异）',
    tests: ['kojo-k14-nobleman'],
    must_mention: '男魔族（TALENT:122 && 314==9）',
  },
  {
    desc: 'M3404 K14 EVENTTRAIN 魔族化仅一次写回值改错（魔族化=2 改 1，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'kojo.魔族化 = 2;',
    replace: 'kojo.魔族化 = 1; // （变异）',
    tests: ['kojo-k14-nobleman'],
    must_mention: '魔族化仅一次',
  },
  {
    desc: 'M3405 K14 EVENTTRAIN NTR 再捕获清除值改错（NTR再捕获=0 改 1，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '      kojo.NTR再捕获 = 0;\n    } else {',
    replace: '      kojo.NTR再捕获 = 1; // （变异）\n    } else {',
    tests: ['kojo-k14-nobleman'],
    must_mention: 'NTR 再捕获（201>=1',
  },
  {
    desc: 'M3406 K14 COM 爱抚初回写回值改错（爱抚=1 改 2，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '      kojo.爱抚 = 1;\n      return 0;\n    } else {\n      if (\n        era.get(`talent:${target}:76`) == 1 &&',
    replace:
      '      kojo.爱抚 =2; // （变异）\n      return 0;\n    } else {\n      if (\n        era.get(`talent:${target}:76`) == 1 &&',
    tests: ['kojo-k14-nobleman'],
    must_mention: '爱抚初回：置 CFLAG:301 = 1',
  },
  {
    desc: 'M3407 K14 COM 爱抚二回目淫乱写回值改错（爱抚=6 改 5，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: "      if (\n        era.get(`talent:${target}:76`) == 1 &&\n        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)\n      ) {\n        await era.printAndWait('');\n        // CFLAG:301  = 6（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 6;",
    replace:
      "      if (\n        era.get(`talent:${target}:76`) == 1 &&\n        (kojo.爱抚 <= 5 || game.kojo.口上开关 == 2)\n      ) {\n        await era.printAndWait('');\n        // CFLAG:301  = 6（变量语义：CFLAG 族，301）\n        kojo.爱抚 = 5; // （变异）",
    tests: ['kojo-k14-nobleman'],
    must_mention: '爱抚二回目 淫乱',
  },
  {
    desc: 'M3408 K14 COM 肛门爱抚二回目「それ以外」写回值改错（肛门爱抚=2 改 3，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'kojo.肛门爱抚 = 2;',
    replace: 'kojo.肛门爱抚 = 3; // （变异）',
    tests: ['kojo-k14-nobleman'],
    must_mention: '肛门爱抚二回目 润滑',
  },
  {
    desc: 'M3409 K14 PALAMCNG 首次润滑 Lv2 写回删除（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'kojo.首次润滑Lv2 = 1;',
    replace: `// 变异：删除写回`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '首次润滑超Lv2',
  },
  {
    desc: 'M3410 K14 MARKCNG 苦痛刻印 Lv3 初回写回删除（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'kojo.苦痛刻印Lv3 = 1;',
    replace: `// 变异：删除写回`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '苦痛刻印 Lv3 初回',
  },
  {
    desc: 'M3411 K14 SELF 调教后性交写回删除（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'kojo.调教后性交 = 1;',
    replace: `// 变异：删除写回`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '调教后性交（TFLAG:13==4）',
  },
  {
    desc: 'M3412 K14 NTR 场景 1 写回删除（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'kojo.NTR_651 = 1;',
    replace: `// 变异：删除写回`,
    tests: ['kojo-k14-nobleman'],
    must_mention: 'NTR 再捕获（P==1',
  },
  {
    desc: 'M3413 K14 EVENTEND 反発刻印Lv3+愛なし台词改字（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'await era.printAndWait(`「嘁…！给我去死啊…！！！」`);',
    replace:
      'await era.printAndWait(`「嘁…！给我去死啊…改字…！！！」`); // （变异）',
    tests: ['kojo-k14-nobleman'],
    must_mention: '反発刻印Lv3+愛なし：去死台词',
  },
  {
    desc: 'M3414 K14 EVENTEND 愛(体力500未満)男档感谢台词改字（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '        `「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~」`,\n      );\n    } else if (era.get(`talent:${target}:314`) == 9) {',
    replace:
      '        `「啊…，今天真的是辛苦您了…，还真的是非常感谢呢~（变异）」`,\n      );\n    } else if (era.get(`talent:${target}:314`) == 9) {',
    tests: ['kojo-k14-nobleman'],
    must_mention: '爱（85）体力 500 未満',
  },
  {
    desc: 'M3415 K14 初调教通常男台词改字（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'await era.printAndWait(\n        `「可…可恶啊！！！你这个肮脏的魔王！！我郑重告诉你！${sc()}是绝对不会屈服于你的…！！」`,\n      );',
    replace:
      'await era.printAndWait(\n        `「可…可恶啊！！！你这个肮脏的魔王！！我郑重告诉你！${sc()}是绝对不会屈服于你的…！！（改）」`,\n      ); // （变异）',
    tests: ['kojo-k14-nobleman'],
    must_mention: '通常男（TALENT:122）',
  },
  {
    desc: 'M3416 K14 K14_KOJO2 反抗刻印Lv3台词改字（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'await era.printAndWait(`「去死一死吧！！你这个又脏又可恶的魔王！！」`);',
    replace:
      'await era.printAndWait(`「去死一死吧！！你这个又脏又可恶的魔王！！（改）」`); // （变异）',
    tests: ['kojo-k14-nobleman'],
    must_mention: '反抗刻印Lv3 分档台词',
  },
  {
    desc: 'M3417 K14 DUNGEON_VICTORY 臆病档台词改回日文残留（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'await era.printAndWait(`「魔的力量、居然强大到了这种地步……」`);',
    replace:
      'await era.printAndWait(`「魔の力、これほどとは……」`); // （变异）',
    tests: ['kojo-k14-nobleman'],
    must_mention: '臆病（TALENT:10）',
  },
  {
    desc: 'M3418 K14 BENKI 野外露出配信 %SELF_CALL(A)% 改回字面量（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '    if (game.dungeon.肉便器常识改写 == 1) {\n      await era.printAndWait(`「啊、那个…元冒险者的${target_name}、来着」`);\n      await era.printAndWait(\n        `「${sc()}败给了伟大的魔王大人…虽然身心都被彻底的玩弄了、但不会就此屈服的！」`,\n      );',
    replace:
      '    if (game.dungeon.肉便器常识改写 == 1) {\n      await era.printAndWait(`「啊、那个…元冒险者的${target_name}、来着」`);\n      await era.printAndWait(\n        `「%SELF_CALL(A)%败给了伟大的魔王大人…虽然身心都被彻底的玩弄了、但不会就此屈服的！」`,\n      ); // （变异）',
    tests: ['kojo-k14-nobleman'],
    must_mention: '野外露出配信',
  },
  {
    desc: 'M3419 K14 GOHOUBI_REQUEST 接吻(4)档台词改字（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '      `${chara_callname(a)}提出了回来之后想与你接吻的奖励。`,\n    );',
    replace:
      '      `${chara_callname(a)}提出了回来之后想与你接吻的奖励。（变异）`,\n    );',
    tests: ['kojo-k14-nobleman'],
    must_mention: 'GOHOUBI_REQUEST CFLAG:504==4',
  },
  {
    desc: 'M3420 K14 GOBI 语尾得意档改字（#245）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "    tiers: ['哦~♪', '哦！', '啦……。', '什么的……。', '什么啊……。'],",
    replace:
      "    tiers: ['哦～♪', '哦！', '啦……。', '什么的……。', '什么啊……。'], // 变异",
    tests: ['kojo-k14-nobleman'],
    must_mention: 'GOBI 语尾 ARG:0==1',
  },
  {
    desc: 'M3421 K14 GOBI 语尾默认档随机首支改字（#245）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "    fallback: ['啦。', '嘛。', '的啦。'],",
    replace: "    fallback: ['啦～。', '嘛。', '的啦。'], // 变异",
    tests: ['kojo-k14-nobleman'],
    must_mention: 'GOBI 语尾 ARG:0==0',
  },
  {
    desc: 'M3422 K14 EVENTTRAIN 检查①口上开关条件反转（<=0 改 >0，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '  const scf = () => self_call_first(target); // %SELF_CALL_FIRST(TARGET)%\n\n  if ((game.kojo.口上开关 || 0) <= 0) {\n    return 0;',
    replace:
      '  const scf = () => self_call_first(target); // %SELF_CALL_FIRST(TARGET)%\n\n  if ((game.kojo.口上开关 || 0) > 0) {\n    return 0;',
    tests: ['kojo-k14-nobleman'],
    must_mention: '口上开关<0（玩家显式关掉）',
  },
  {
    desc: 'M3423 K14 COM 检查①口塞条件删除（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {',
    replace: '  if (false) { // 变异：口塞检查删除',
    tests: ['kojo-k14-nobleman'],
    must_mention: '口塞（TEQUIP:45',
  },
  {
    desc: 'M3424 K14 COM 检查②失神条件删除（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '  if (game.train.失神) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:89`)) {',
    replace:
      '  if (false) { // 变异：失神检查删除\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:89`)) {',
    tests: ['kojo-k14-nobleman'],
    must_mention: '失神（TFLAG:899）',
  },
  {
    desc: 'M3425 K14 COM 兽奸检查岔路丢失（TEQUIP:89 不再调 dog，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '  if (era.get(`tequip:${target}:89`)) {\n    await dog_kojo_14(rand_n); // CALL DOG_KOJO_14',
    replace: '  if (era.get(`tequip:${target}:89`)) {\n    // 变异：不调 DOG',
    tests: ['kojo-k14-nobleman'],
    must_mention: '兽奸检查（TEQUIP:89）',
  },
  {
    desc: 'M3426 K14 COM 死斗场检查岔路丢失（TEQUIP:55 不再调 colosseum，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '  if (era.get(`tequip:${target}:55`)) {\n    await colosseum_kojo_14(rand_n); // CALL COLOSSEUM_KOJO_14',
    replace:
      '  if (era.get(`tequip:${target}:55`)) {\n    // 变异：不调 COLOSSEUM',
    tests: ['kojo-k14-nobleman'],
    must_mention: '死斗场检查（TEQUIP:55）',
  },
  {
    desc: 'M3427 K14 DOG 兽奸爱抚初回写回值改错（爱抚=1 改 2，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '      kojo.爱抚 = 1;\n      return 0;\n    } else {\n      if (\n        era.get(`talent:${target}:136`) == 1 &&',
    replace:
      '      kojo.爱抚 =2; // （变异）\n      return 0;\n    } else {\n      if (\n        era.get(`talent:${target}:136`) == 1 &&',
    tests: ['kojo-k14-nobleman'],
    must_mention: 'CALL DOG：走兽奸计数器',
  },
  {
    desc: 'M3428 K14 COM 穿环初回写回删除（kojo.穿环=1 删，#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '      kojo.穿环 = 1;',
    replace: `      // 变异：删除写回`,
    tests: ['kojo-k14-nobleman'],
    must_mention: '穿环初回',
  },
  {
    desc: 'M3429 K14 ENTERENEMY 反抗的（TALENT:11）台词改字（#245）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '    await era.printAndWait(`「魔王！　不可原谅！」`);',
    replace:
      '    await era.printAndWait(`「魔王！　绝不原谅！」`); // （变异）',
    tests: ['kojo-k14-nobleman'],
    must_mention: 'ENTERENEMY 反抗的',
  },
  {
    desc: 'M3503 K15 EVENTTRAIN 自身检查①口上开关条件反转（<=0 改 >0，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '  const kojo = chara(target).kojo;\n\n  if ((game.kojo.口上开关 || 0) <= 0) {\n    return 0;\n  }',
    replace:
      '  const kojo = chara(target).kojo;\n\n  if ((game.kojo.口上开关 || 0) > 0) {  // 变异\n    return 0;\n  }',
    tests: ['kojo-k15-clever'],
    must_mention: 'EVENTTRAIN 自身检查①口上开关<0（玩家显式关掉）静默跳过',
  },
  {
    desc: 'M3527 K15 接吻调教首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.接吻 = 1;\n      return 0;\n    } else {\n      if (\n        era0(`talent:${target}:76`) == 1 &&',
    replace:
      '      kojo.接吻 =2;\n      return 0;\n    } else {\n      if (\n        era0(`talent:${target}:76`) == 1 &&',
    tests: ['kojo-k15-clever'],
    must_mention: '调教初回推进到 1',
  },
  {
    desc: 'M3528 K15 自己扒开首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.自己扒开 = 1;',
    replace: '      kojo.自己扒开 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '自己扒开初回推进到 1',
  },
  {
    desc: 'M3529 K15 插入手指首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.插入手指 = 1;',
    replace: '      kojo.插入手指 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '插入手指初回 → 1',
  },
  {
    desc: 'M3530 K15 舔肛首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: "        await era.printAndWait('');\n      }\n      kojo.舔肛 = 1;",
    replace:
      "        await era.printAndWait('');\n      }\n      kojo.舔肛 = 2;",
    tests: ['kojo-k15-clever'],
    must_mention: '舔肛初回 → 1',
  },
  {
    desc: 'M3531 K15 振动宝石首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.振动宝石 = 1;',
    replace: '      kojo.振动宝石 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '振动宝石初回 → 1',
  },
  {
    desc: 'M3532 K15 壶虫首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.壶虫 = 1;',
    replace: '      kojo.壶虫 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '壶虫初回 → 1',
  },
  {
    desc: 'M3533 K15 振动杖首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.振动杖 = 1;',
    replace: '      kojo.振动杖 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '振动杖初回 → 1',
  },
  {
    desc: 'M3534 K15 肛门虫首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.肛门虫 = 1;',
    replace: '      kojo.肛门虫 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '肛门虫初回 → 1',
  },
  {
    desc: 'M3535 K15 肛珠首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.肛珠 = 1;',
    replace: '      kojo.肛珠 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '肛珠初回 → 1',
  },
  {
    desc: 'M3536 K15 正常位首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.正常位 = 1;',
    replace: '      kojo.正常位 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '正常位初回 → 1',
  },
  {
    desc: 'M3537 K15 对面座位首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.对面座位 = 1;',
    replace: '      kojo.对面座位 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '对面座位初回 → 1',
  },
  {
    desc: 'M3538 K15 正常位肛交首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.正常位肛交 = 1;',
    replace: '      kojo.正常位肛交 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '正常位肛交初回 → 1',
  },
  {
    desc: 'M3539 K15 对面座位肛交首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.对面座位肛交 = 1;',
    replace: '      kojo.对面座位肛交 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '对面座位肛交初回 → 1',
  },
  {
    desc: 'M3540 K15 背面座位肛交首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.背面座位肛交 = 1;',
    replace: '      kojo.背面座位肛交 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '背面座位肛交初回 → 1',
  },
  {
    desc: 'M3541 K15 手淫首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '        );\n      }\n      kojo.手淫 = 1;',
    replace: '        );\n      }\n      kojo.手淫 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '手淫初回 → 1',
  },
  {
    desc: 'M3542 K15 口交_奴首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '        );\n      }\n      kojo.口交_奴 = 1;',
    replace: '        );\n      }\n      kojo.口交_奴 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '口交初回 → 1',
  },
  {
    desc: 'M3543 K15 乳交覆盖首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.乳交 = 1;',
    replace: '      kojo.乳交 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '乳交：初回推进到 1',
  },
  {
    desc: 'M3544 K15 股间性交首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.股间性交 = 1;',
    replace: '      kojo.股间性交 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '股间性交初回 → 1',
  },
  {
    desc: 'M3545 K15 骑乘位首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '          );\n        }\n      }\n      kojo.骑乘位 = 1;',
    replace: '          );\n        }\n      }\n      kojo.骑乘位 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '骑乘位 / 骑乘位肛交：初回それ以外 + 二回目淫乱',
  },
  {
    desc: 'M3546 K15 全身擦洗首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.全身擦洗 = 1;',
    replace: '      kojo.全身擦洗 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '全身擦洗初回 → 1',
  },
  {
    desc: 'M3547 K15 骑乘位肛交首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.骑乘位肛交 = 1;',
    replace: '      kojo.骑乘位肛交 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '骑乘位肛交初回 → 1',
  },
  {
    desc: 'M3548 K15 肛门侍奉首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.肛门侍奉 = 1;\n      return 0;\n    } else {\n      if (\n        era0(`talent:${target}:76`) == 1 &&',
    replace:
      '      kojo.肛门侍奉 =2;\n      return 0;\n    } else {\n      if (\n        era0(`talent:${target}:76`) == 1 &&',
    tests: ['kojo-k15-clever'],
    must_mention: '肛门侍奉初回 → 1',
  },
  {
    desc: 'M3549 K15 打屁股首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.打屁股 = 1;',
    replace: '      kojo.打屁股 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '打屁股初回 → 1',
  },
  {
    desc: 'M3550 K15 鞭首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.鞭 = 1;',
    replace: '      kojo.鞭 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '鞭初回 → 1',
  },
  {
    desc: 'M3551 K15 针首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.针 = 1;',
    replace: '      kojo.针 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '针初回 → 1',
  },
  {
    desc: 'M3552 K15 眼罩开始首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.眼罩 = 1;\n      return 0;\n    } else {\n      if (\n        era0(`talent:${target}:76`) == 1 &&',
    replace:
      '      kojo.眼罩 =2;\n      return 0;\n    } else {\n      if (\n        era0(`talent:${target}:76`) == 1 &&',
    tests: ['kojo-k15-clever'],
    must_mention: '眼罩开始初回 → 1',
  },
  {
    desc: 'M3553 K15 绳子开始首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.绳子 = 1;',
    replace: '      kojo.绳子 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '绳子开始初回 → 1',
  },
  {
    desc: 'M3554 K15 口塞开始首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.口塞 = 1;',
    replace: '      kojo.口塞 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '口塞开始初回 → 1',
  },
  {
    desc: 'M3555 K15 灌肠肛塞首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.灌肠肛塞 = 1;',
    replace: '      kojo.灌肠肛塞 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '灌肠开始初回 → 1',
  },
  {
    desc: 'M3556 K15 放置PLAY首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.放置PLAY = 1;',
    replace: '      kojo.放置PLAY = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '放置PLAY 初回 → 1',
  },
  {
    desc: 'M3557 K15 交谈首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '            `${target_name}转过了头去，冷淡地发挥着毒舌的本领……`,\n          );\n        }\n      }\n      kojo.交谈 = 1;',
    replace:
      '            `${target_name}转过了头去，冷淡地发挥着毒舌的本领……`,\n          );\n        }\n      }\n      kojo.交谈 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '交谈（SELECTCOM 56）：录像 / 爱慕 ASSIPLAY / 二回目それ以外',
  },
  {
    desc: 'M3558 K15 深喉首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.深喉 = 1;',
    replace: '      kojo.深喉 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '深喉初回 → 1',
  },
  {
    desc: 'M3559 K15 穿环首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.穿环 = 1;',
    replace: '      kojo.穿环 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '穿环初回 → 1',
  },
  {
    desc: 'M3560 K15 眼罩着脱首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.眼罩着脱 = 1;',
    replace: '      kojo.眼罩着脱 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '眼罩着脱それ以外 → 1',
  },
  {
    desc: 'M3561 K15 绳子着脱首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.绳子着脱 = 1;',
    replace: '      kojo.绳子着脱 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '绳子着脱それ以外 → 1',
  },
  {
    desc: 'M3562 K15 口塞着脱首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.口塞着脱 = 1;',
    replace: '      kojo.口塞着脱 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '口塞着脱それ以外 → 1',
  },
  {
    desc: 'M3563 K15 乳夹口交首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.乳夹口交 = 1;',
    replace: '      kojo.乳夹口交 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention:
      '乳夹口交 / 口交时自慰 / 手搓口交 / 真空口交 / 六九式 / 强制口交：空 PRINTFORMW 仍推进',
  },
  {
    desc: 'M3564 K15 兽奸爱抚首次状态推进写错（=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '          `当狗磨蹭到裸露的皮肤时，${target_name}忍不住怒斥了起来……`,\n        );\n      }\n      kojo.爱抚 = 1;',
    replace:
      '          `当狗磨蹭到裸露的皮肤时，${target_name}忍不住怒斥了起来……`,\n        );\n      }\n      kojo.爱抚 = 2;',
    tests: ['kojo-k15-clever'],
    must_mention: '兽奸爱抚初回推进 CFLAG:301=1',
  },
  {
    desc: 'M3567 K15 胸爱抚爱慕+ASSIPLAY 分支条件反转（源不写计数器，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2) &&
        era_flag.assiplay`,
    replace: `        (kojo.胸爱抚 <= 3 || game.kojo.口上开关 == 2) &&
        !era_flag.assiplay  // 变异`,
    tests: ['kojo-k15-clever'],
    must_mention: '胸爱抚二回目以降：淫乱 / 爱慕+ASSIPLAY 不写计数器 / B感覚',
  },
  {
    desc: 'M3573 K15 兽奸眼罩着脱それ以外推进值写错（CFLAG:444=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      kojo.兽奸眼罩 = 1;',
    replace: '      kojo.兽奸眼罩 = 2; // （变异）',
    tests: ['kojo-k15-clever'],
    must_mention: '兽奸眼罩着脱それ以外 → CFLAG:444=1',
  },
  {
    desc: 'M3574 K15 PALAMCNG 口塞检查条件改错（TEQUIP:45 改 46，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '  if (era0(`tequip:${target}:45`)) {\n    return 0;\n  }\n\n  const P_lube =',
    replace:
      '  if (era0(`tequip:${target}:46`)) {  // 变异\n    return 0;\n  }\n\n  const P_lube =',
    tests: ['kojo-k15-clever'],
    must_mention: 'PALAMCNG 口塞检查跳过润滑',
  },
  {
    desc: 'M3575 K15 PALAMCNG 首次润滑条件抬档（PALAMLV[2] 改 [3]，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (P_lube > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {`,
    replace: `  if (P_lube > PALAMLV[3] && kojo.首次润滑Lv2 == 0) {  // 变异`,
    tests: ['kojo-k15-clever'],
    must_mention: '润滑首次超 LV2 → 221=1',
  },
  {
    desc: 'M3576 K15 PALAMCNG C绝顶阴茎分档条件改错（TALENT:121 改 123，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      if (era0(`talent:${target}:121`) || era0(`talent:${target}:122`)) {\n        await era.printAndWait(`「不！不要！呜！要……要射了……唔!……啊…啊～♡」`);',
    replace:
      '      if (era0(`talent:${target}:123`) || era0(`talent:${target}:122`)) {  // 变异\n        await era.printAndWait(`「不！不要！呜！要……要射了……唔!……啊…啊～♡」`);',
    tests: ['kojo-k15-clever'],
    must_mention: 'C绝顶阴茎分档',
  },
  {
    desc: 'M3577 K15 PALAMCNG 处女丧失推进值写错（CFLAG:229=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '    kojo.处女丧失 = 1;',
    replace: '    kojo.处女丧失 = 2; // （变异）',
    tests: ['kojo-k15-clever'],
    must_mention: '处女丧失 → 229=1',
  },
  {
    desc: 'M3578 K15 MARKCNG 口塞检查条件改错（TEQUIP:45 改 46，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '  if (era0(`tequip:${target}:45`)) {\n    return 0;\n  }\n\n  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {',
    replace:
      '  if (era0(`tequip:${target}:46`)) {  // 变异\n    return 0;\n  }\n\n  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {',
    tests: ['kojo-k15-clever'],
    must_mention: 'MARKCNG 口塞检查跳过苦痛',
  },
  {
    desc: 'M3579 K15 MARKCNG 苦痛刻印Lv3 推进值写错（CFLAG:297=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '    kojo.苦痛刻印Lv3 = 1;',
    replace: '    kojo.苦痛刻印Lv3 = 2; // （变异）',
    tests: ['kojo-k15-clever'],
    must_mention: '苦痛刻印Lv3 → 297=1',
  },
  {
    desc: 'M3580 K15 MARKCNG 快乐刻印Lv3 推进值写错（CFLAG:298=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '    kojo.快乐刻印Lv3 = 1;',
    replace: '    kojo.快乐刻印Lv3 = 2; // （变异）',
    tests: ['kojo-k15-clever'],
    must_mention: '快乐刻印Lv3 → 298=1',
  },
  {
    desc: 'M3581 K15 MARKCNG 屈服刻印Lv3 推进值写错（CFLAG:299=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '    kojo.屈服刻印Lv3 = 1;',
    replace: '    kojo.屈服刻印Lv3 = 2; // （变异）',
    tests: ['kojo-k15-clever'],
    must_mention: '屈服刻印Lv3 → 299=1',
  },
  {
    desc: 'M3582 K15 MARKCNG 反抗刻印Lv3 推进值写错（CFLAG:300=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '    kojo.反抗刻印Lv3 = 1;',
    replace: '    kojo.反抗刻印Lv3 = 2; // （变异）',
    tests: ['kojo-k15-clever'],
    must_mention: '反抗刻印Lv3 → 300=1',
  },
  {
    desc: 'M3583 K15 SELF_KOJO leftover_q 助手条件改错（Q==1 改 ==2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `    } else if (Q == 1) {`,
    replace: `    } else if (Q == 2) {  // 变异`,
    tests: ['kojo-k15-clever'],
    must_mention: 'SELF_KOJO leftover_q 助手',
  },
  {
    desc: 'M3584 K15 SELF_KOJO 调教后自慰推进值写错（CFLAG:261=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '    kojo.调教后自慰 = 1;',
    replace: '    kojo.调教后自慰 = 2; // （变异）',
    tests: ['kojo-k15-clever'],
    must_mention: '调教后自慰 → 261=1',
  },
  {
    desc: 'M3585 K15 SELF_KOJO 夜袭推进值写错（CFLAG:265=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '    kojo.夜袭 = 1;',
    replace: '    kojo.夜袭 = 2; // （变异）',
    tests: ['kojo-k15-clever'],
    must_mention: '夜袭 → 265=1',
  },
  {
    desc: 'M3586 K15 SELF_KOJO 成熟出售真身调用丢失（#338）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '      await sell_maturo_k0(target, { rand }); // CALL SELL_MATURO_K0',
    replace: `      void 0; // 变异：删除成熟出售真身调用`,
    tests: ['sell-maturo'],
    must_mention: '14 个活动口上的成熟出售事件均进入市场真身',
  },
  {
    desc: 'M3587 K15 SELF_KOJO 妊娠发觉推进值写错（CFLAG:271=1 改 2，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '    kojo.妊娠发觉 = 1;',
    replace: '    kojo.妊娠发觉 = 2; // （变异）',
    tests: ['kojo-k15-clever'],
    must_mention: '妊娠发觉 → 271=1',
  },
  {
    desc: 'M3589 K15 DUNGEON_RYOUZYOKU 处女条件反转（TALENT:0==1 改 ==0，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '  if (era0(`talent:${target}:0`) == 1) {\n    await era.printAndWait(\n      `「可恶！走…走开！为什么${sc()}的第一次要被你们这些残渣……呜！」`,',
    replace:
      '  if (era0(`talent:${target}:0`) ==0) {  // 变异\n    await era.printAndWait(\n      `「可恶！走…走开！为什么${sc()}的第一次要被你们这些残渣……呜！」`,',
    tests: ['kojo-k15-clever'],
    must_mention: 'DUNGEON_RYOUZYOKU 处女それ以外；AFTER 处女',
  },
  {
    desc: 'M3590 K15 DUNGEON_RYOUZYOKU_AFTER 处女条件反转（TALENT:0==1 改 ==0，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '  if (era0(`talent:${target}:0`) == 1) {\n    await era.printAndWait(\n      `「还好${sc()}的处女还在…不然…一定要杀了你们…！！」`,',
    replace:
      '  if (era0(`talent:${target}:0`) ==0) {  // 变异\n    await era.printAndWait(\n      `「还好${sc()}的处女还在…不然…一定要杀了你们…！！」`,',
    tests: ['kojo-k15-clever'],
    must_mention: '凌辱后处女',
  },
  {
    desc: 'M3591 K15 DUNGEON_VICTORY それ以外 RAND 条件改错（==0 改 ==1，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '    if (rand_n(3) == 0) {\n      await era.printAndWait(`「跟这种杂鱼战斗，根本没有悬念。」`);',
    replace:
      '    if (rand_n(3) == 1) {  // 变异\n      await era.printAndWait(`「跟这种杂鱼战斗，根本没有悬念。」`);',
    tests: ['kojo-k15-clever'],
    must_mention: '胜利それ以外 RAND:3==0',
  },
  {
    desc: 'M3592 K15 DUNGEON_ATTACK 侵攻中条件改错（状态==2 改 ==1，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (chara(target).invasion.状态 == 2) {`,
    replace: `  if (chara(target).invasion.状态 == 1) {  // 变异`,
    tests: ['kojo-k15-clever'],
    must_mention: '攻击侵攻中それ以外',
  },
  {
    desc: 'M3593 K15 BENKI 肉便器行动条件改错（==0 改 ==99，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: `  if (game.train.肉便器行动 == 0) {`,
    replace: `  if (game.train.肉便器行动 == 99) {  // 变异`,
    tests: ['kojo-k15-clever'],
    must_mention: 'BENKI 空 PRINTFORMW',
  },
  {
    desc: 'M3594 K15 NTR 再捕获首次标记写错值（CFLAG:650=1 改 0，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '    chara(target).kojo.NTR再捕获 = 1;',
    replace: '    chara(target).kojo.NTR再捕获 = 0; // （变异）',
    tests: ['kojo-k15-clever'],
    must_mention: 'NTR再捕获',
  },
  {
    desc: 'M3595 K15 NTR P==1 分支写入字段改错（CFLAG:651 改 652，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '    chara(target).kojo.NTR_651 = 1;',
    replace: '    chara(target).kojo.NTR_652 = 1; // （变异）',
    tests: ['kojo-k15-clever'],
    must_mention: 'NTR_651',
  },
  {
    desc: 'M3596 K15 GOHOUBI_REQUEST 要求奖赏条件改错（==0 改 ==1，#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '\n  if (chara(a).stronghold.要求奖赏 == 0) {',
    replace: '\n  if (chara(a).stronghold.要求奖赏 == 1) {  // 变异',
    tests: ['kojo-k15-clever'],
    must_mention: 'GOHOUBI_REQUEST 钱',
  },
  {
    desc: 'M3597 K15 GOHOUBI_AFTER choice==1 条件改错（#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '  } else if (choice == 1) {\n    await era.printAndWait(`「能得到您的肯定，是${sc()}最大的荣幸。」`);',
    replace:
      '  } else if (choice == 2) {  // 变异\n    await era.printAndWait(`「能得到您的肯定，是${sc()}最大的荣幸。」`);',
    tests: ['kojo-k15-clever'],
    must_mention: 'GOHOUBI_AFTER 勋章',
  },
  {
    desc: 'M3598 K15 OSIOKI choice==0 条件改错（#246）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '  if (choice == 0) {\n    await era.printAndWait(`「您是如此的宽容！下次${sc()}一定会更加努力。」`);',
    replace:
      '  if (choice == 1) {  // 变异\n    await era.printAndWait(`「您是如此的宽容！下次${sc()}一定会更加努力。」`);',
    tests: ['kojo-k15-clever'],
    must_mention: 'OSIOKI 何もしない',
  },
  {
    desc: 'M3599 K15 GOBI arg0==1 输出文案改错（#246）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "    tiers: ['♪', '！', '……。', '……。', '……。'],",
    replace: "    tiers: ['！', '！', '……。', '……。', '……。'], // 变异",
    tests: ['kojo-k15-clever'],
    must_mention: 'GOBI ARG:0==1 语尾；EXUCUTION 处分方式 4 空 PRINTFORMW',
  },

  {
    desc: 'M3200 K12 爱抚初次状态推进写错（=1 改 2）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '      // CFLAG:301 = 1\n      kojo.爱抚 = 1;',
    replace: '      // CFLAG:301 = 1\n      kojo.爱抚 = 2; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '初回',
  },
  {
    desc: 'M3201 K12 自慰二回目 RAND 推进写错（CFLAG:304 = 8 改 9）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '      kojo.自慰 = 8;',
    replace: '      kojo.自慰 = 9; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '自慰）淫乱+自慰中毒Lv3',
  },
  {
    desc: 'M3202 K12 胸爱抚二回目 B感覚写错（CFLAG:306 = 3 改 4）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '        kojo.胸爱抚 = 3;\n      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {\n        await era.printAndWait(`「果然呢、胸部一点感觉都没有」`);',
    replace:
      '        kojo.胸爱抚 = 4; // （变异）\n      } else if (kojo.胸爱抚 <= 1 || game.kojo.口上开关 == 2) {\n        await era.printAndWait(`「果然呢、胸部一点感觉都没有」`);',
    tests: ['kojo-k12-intellectual'],
    must_mention: '胸爱抚）二回目 B感覚',
  },
  {
    desc: 'M3203 K12 接吻初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '        await era.printAndWait(`「初吻什么的、带上感情是无意义的」`);\n      }\n      // CFLAG:307  = 1（变量语义：CFLAG 族，307）\n      kojo.接吻 = 1;',
    replace:
      '        await era.printAndWait(`「初吻什么的、带上感情是无意义的」`);\n      }\n      // CFLAG:307  = 1（变量语义：CFLAG 族，307）\n      kojo.接吻 = 2; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '接吻）初吻',
  },
  {
    desc: 'M3204 K12 自己扒开初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.自己扒开 = 1;',
    replace: 'kojo.自己扒开 = 2; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '自己扒开）初回',
  },
  {
    desc: 'M3205 K12 插入手指初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.插入手指 = 1;',
    replace: 'kojo.插入手指 = 2; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '插入手指）初回',
  },
  {
    desc: 'M3206 K12 振动宝石二回目屈服刻印档写错（CFLAG:311 = 3 改 4）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '        kojo.振动宝石 = 3;',
    replace: '        kojo.振动宝石 = 4; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '振动宝石）二回目屈服刻印Lv3',
  },
  {
    desc: 'M3207 K12 壶虫初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.壶虫 = 1;',
    replace: 'kojo.壶虫 = 2; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '壶虫）装着初回',
  },
  {
    desc: 'M3208 K12 振动杖二回目屈服刻印档写错（CFLAG:313 = 3 改 4）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '        kojo.振动杖 = 3;',
    replace: '        kojo.振动杖 = 4; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '振动杖）二回目屈服刻印Lv3',
  },
  {
    desc: 'M3209 K12 正常位初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.正常位 = 1;',
    replace: 'kojo.正常位 = 2; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '正常位）初回',
  },
  {
    desc: 'M3210 K12 背后位妊娠分支写错（CFLAG:322 = 6 改 5）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '            `${target_name}完全抛弃了狼人的的自尊心、沦为一头纯粹的母兽了。`,\n          );\n        }\n        // CFLAG:322  = 6（变量语义：CFLAG 族，322）\n        kojo.背后位 = 6;',
    replace:
      '            `${target_name}完全抛弃了狼人的的自尊心、沦为一头纯粹的母兽了。`,\n          );\n        }\n        // CFLAG:322  = 6（变量语义：CFLAG 族，322）\n        kojo.背后位 = 5; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '背后位）妊娠淫乱',
  },
  {
    desc: 'M3214 K12 骑乘位初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '          await era.printAndWait(`「让我自己来……可恶」`);\n        }\n      }\n      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）\n      kojo.骑乘位 = 1;',
    replace:
      '          await era.printAndWait(`「让我自己来……可恶」`);\n        }\n      }\n      // CFLAG:TARGET:335  = 1（变量语义：CFLAG 族，TARGET:335）\n      kojo.骑乘位 = 2; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '骑乘位）初回',
  },
  {
    desc: 'M3215 K12 打屁股初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.打屁股 = 1;',
    replace: 'kojo.打屁股 = 2; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '打屁股）初回',
  },
  {
    desc: 'M3216 K12 鞭初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.鞭 = 1;',
    replace: 'kojo.鞭 = 2; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '鞭）初回',
  },
  {
    desc: 'M3217 K12 穿环初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'kojo.穿环 = 1;',
    replace: 'kojo.穿环 = 2; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: '穿环）读 piercing_state',
  },
  {
    desc: 'M3218 K12 DOG 爱抚初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 1;',
    replace:
      '      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      kojo.爱抚 = 2; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: 'dog_kojo_12 SELECTCOM 0 二回目',
  },
  {
    desc: 'M3219 K12 DOG 舔阴初次状态推进写错',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '      // CFLAG:302  = 1（变量语义：CFLAG 族，302）\n      kojo.舔阴 = 1;',
    replace:
      '      // CFLAG:302  = 1（变量语义：CFLAG 族，302）\n      kojo.舔阴 = 2; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: 'dog_kojo_12 SELECTCOM 1（舔阴）初回',
  },
  {
    desc: 'M3220 K12 DOG 胸爱抚二回目淫乱档写错（CFLAG:306 = 6 改 5）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '        kojo.胸爱抚 = 6;',
    replace: '        kojo.胸爱抚 = 5; // （变异）',
    tests: ['kojo-k12-intellectual'],
    must_mention: 'dog_kojo_12 SELECTCOM 5 二回目牝犬',
  },
  {
    desc: 'M3224 K12 KOJO_MESSAGE_COM_12 口塞检查删松',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {',
    replace: 'if (false) { // 变异：口塞检查删松',
    tests: ['kojo-k12-intellectual'],
    must_mention: '头部检查① TEQUIP:45（口塞）',
  },
  {
    desc: 'M3225 K12 KOJO_MESSAGE_COM_12 失神检查删松',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '  if (game.train.失神) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:89`)) {',
    replace:
      '  if (false) { // 变异：失神检查删松\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:89`)) {',
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
    desc: 'M3227 K12 PALAMCNG 首次润滑 Lv2 条件删松',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'if (P1 > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {',
    replace: 'if (false) { // 变异：首次润滑 Lv2 删松',
    tests: ['kojo-k12-intellectual'],
    must_mention: '首超润滑 Lv2',
  },
  {
    desc: 'M3228 K12 NTR P=1 CFLAG:650 记位删除',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '    kojo.NTR再捕获 = 1;',
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
    desc: 'M3230 K12 KOJO_MESSAGE_COM_12 检查③ TEQUIP:89（兽奸岔入 DOG）删松',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '  if (era.get(`tequip:${target}:89`)) {',
    replace: '  if (false) { // 变异：兽奸岔入检查删松',
    tests: ['kojo-k12-intellectual'],
    must_mention: '头部检查③ TEQUIP:89（兽奸）岔去 dog_kojo_12 真身',
  },
  {
    desc: 'M3231 K12 KOJO_MESSAGE_COM_12 检查④ TEQUIP:55（死斗场岔入 COLOSSEUM）删松',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '  if (era.get(`tequip:${target}:55`)) {',
    replace: '  if (false) { // 变异：死斗场岔入检查删松',
    tests: ['kojo-k12-intellectual'],
    must_mention: '头部检查④ TEQUIP:55（死斗场）岔去 colosseum_kojo_12 真身',
  },
  {
    desc: 'M3232 K12 MARKCNG 苦痛刻印 Lv3 首超条件删松',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '  if (game.system.苦痛刻印变动 == 3 && kojo.苦痛刻印Lv3 == 0) {',
    replace: '  if (false) { // 变异：苦痛刻印首超条件删松',
    tests: ['kojo-k12-intellectual'],
    must_mention: 'kojo_message_markcng_12 苦痛刻印Lv3 取得',
  },
    desc: 'M6401 K903 EVENTTRAIN EX_TALENT:103 检查删除（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '  if (era0(`ex_talent:${target}:103`) != 1) {\n    return 0;\n  }\n\n  if (kojo.初调教 == 0) {',
    replace:
      '  if (false) { // 变异：EX_TALENT:103 检查删除\n    return 0;\n  }\n\n  if (kojo.初调教 == 0) {',
    tests: ['kojo-k903-garde'],
    must_mention: 'EX_TALENT:103 缺席',
  },
  {
    desc: 'M6402 K903 CFLAG:201 初调教初回写错（1 改 2）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '    kojo.初调教 = 1;',
    replace: '    kojo.初调教 = 2; // （变异）',
    tests: ['kojo-k903-garde'],
    must_mention: 'CFLAG:201：初调教',
  },
  {
    desc: 'M6403 K903 CFLAG:650 NTR 再捕获清除删除（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '      // CFLAG:650  = 0（变量语义：CFLAG 族，650）\n      kojo.NTR再捕获 = 0;\n    } else {',
    replace:
      '      // CFLAG:650  = 0（变量语义：CFLAG 族，650）\n      // 变异：NTR 再捕获清除删除\n    } else {',
    tests: ['kojo-k903-garde'],
    must_mention: 'CFLAG:201：初调教',
  },
  {
    desc: 'M6404 K903 CFLAG:201 屈服 Lv1 写错（2 改 3）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '    kojo.初调教 = 2;',
    replace: '    kojo.初调教 = 3; // （变异）',
    tests: ['kojo-k903-garde'],
    must_mention: 'CFLAG:201：初调教',
  },
  {
    desc: 'M6405 K903 CFLAG:201 屈服 Lv2 写错（3 改 4）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '    kojo.初调教 = 3;',
    replace: '    kojo.初调教 = 4; // （变异）',
    tests: ['kojo-k903-garde'],
    must_mention: 'CFLAG:201：初调教',
  },
  {
    desc: 'M6406 K903 CFLAG:201 屈服 Lv3 写错（4 改 5）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '    kojo.初调教 = 4;',
    replace: '    kojo.初调教 = 5; // （变异）',
    tests: ['kojo-k903-garde'],
    must_mention: 'CFLAG:201：初调教',
  },
  {
    desc: 'M6407 K903 CFLAG:201 淫乱阶段写错（5 改 6）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '    kojo.初调教 = 5;',
    replace: '    kojo.初调教 = 6; // （变异）',
    tests: ['kojo-k903-garde'],
    must_mention: 'CFLAG:201：初调教',
  },
  {
    desc: 'M6408 K903 CFLAG:201 爱慕阶段写错（6 改 7）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '    kojo.初调教 = 6;',
    replace: '    kojo.初调教 = 7; // （变异）',
    tests: ['kojo-k903-garde'],
    must_mention: 'CFLAG:201：初调教',
  },
  {
    desc: 'M6409 K903 COM 检查① TEQUIP:45 删松（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '  if (era0(`tequip:${target}:45`) && era_flag.selectcom != 45) {',
    replace: '  if (false) { // 变异：TEQUIP:45 口塞检查删松',
    tests: ['kojo-k903-garde'],
    must_mention: 'COM 仅五道检查活动',
  },
  {
    desc: 'M6410 K903 COM 检查② TFLAG:899 失神删松（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '  if (game.train.失神) {\n    return 0;\n  }\n\n  if (era0(`tequip:${target}:89`)) {',
    replace:
      '  if (false) { // 变异：TFLAG:899 失神检查删松\n    return 0;\n  }\n\n  if (era0(`tequip:${target}:89`)) {',
    tests: ['kojo-k903-garde'],
    must_mention: 'COM 仅五道检查活动',
  },
  {
    desc: 'M6411 K903 COM 检查③ TEQUIP:89 DOG 分发删松（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '  if (era0(`tequip:${target}:89`)) {',
    replace: '  if (false) { // 变异：TEQUIP:89 DOG 分发检查删松',
    tests: ['kojo-k903-garde'],
    must_mention: 'COM 仅五道检查活动',
  },
  {
    desc: 'M6412 K903 COM 检查④ TEQUIP:90 触手删松（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '  if (era0(`tequip:${target}:90`)) {',
    replace: '  if (false) { // 变异：TEQUIP:90 触手检查删松',
    tests: ['kojo-k903-garde'],
    must_mention: 'COM 仅五道检查活动',
  },
  {
    desc: 'M6413 K903 COM 检查⑤ TEQUIP:55 竞技场分发删松（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '  if (era0(`tequip:${target}:55`)) {\n    await colosseum_kojo_903(rand);\n    return 0;\n  }',
    replace:
      '  if (false) { // 变异：TEQUIP:55 竞技场分发检查删松\n    await colosseum_kojo_903(rand);\n    return 0;\n  }',
    tests: ['kojo-k903-garde'],
    must_mention: 'COM 仅五道检查活动',
  },
  {
    desc: 'M6414 K903 SELECTCOM:0 爱抚初回计数写错（1 改 2）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '          `「不要拿你凡间蛆虫的脏手碰本宫，当真不怕降下神罚吗！」她激烈地抵抗着你的双手。`,\n        );\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      chara(target).kojo.爱抚 = 1;',
    replace:
      '          `「不要拿你凡间蛆虫的脏手碰本宫，当真不怕降下神罚吗！」她激烈地抵抗着你的双手。`,\n        );\n      }\n      // CFLAG:301  = 1（变量语义：CFLAG 族，301）\n      chara(target).kojo.爱抚 = 2; // （变异）',
    tests: ['kojo-k903-garde'],
    must_mention: '全部活动 SELECTCOM',
  },
  {
    desc: 'M6415 K903 SELECTCOM:0 爱抚淫乱计数写错（6 改 5）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '          `「只……只是被你简单地碰到就～啊～再努力一点啊，怎么可能这么简单就满足本宫呢～～」`,\n        );\n        // CFLAG:301  = 6（变量语义：CFLAG 族，301）\n        chara(target).kojo.爱抚 = 6;',
    replace:
      '          `「只……只是被你简单地碰到就～啊～再努力一点啊，怎么可能这么简单就满足本宫呢～～」`,\n        );\n        // CFLAG:301  = 6（变量语义：CFLAG 族，301）\n        chara(target).kojo.爱抚 = 5; // （变异）',
    tests: ['kojo-k903-garde'],
    must_mention: 'SELECTCOM 二次状态',
  },
  {
    desc: 'M6418 K903 SELECTCOM:8 插入手指初回计数写错（1 改 2）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '      chara(target).kojo.插入手指 = 1;',
    replace: '      chara(target).kojo.插入手指 = 2; // （变异）',
    tests: ['kojo-k903-garde'],
    must_mention: '全部活动 SELECTCOM',
  },
  {
    desc: 'M6419 K903 PALAMCNG 润滑首超边界删严（> 改 >=）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '  if (p_lube > PALAMLV[2] && kojo.首次润滑Lv2 == 0) {',
    replace: '  if (p_lube >= PALAMLV[2] && kojo.首次润滑Lv2 == 0) {',
    tests: ['kojo-k903-garde'],
    must_mention: 'PALAMCNG：221-229',
  },
  {
    desc: 'M6420 K903 PALAMCNG NOWEX:0 首次 C 绝顶条件删松（>0 改 >1）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '  if (era0(`nowex:${target}:0`) > 0 && kojo.首次C绝顶 == 0) {',
    replace: '  if (era0(`nowex:${target}:0`) > 1 && kojo.首次C绝顶 == 0) {',
    tests: ['kojo-k903-garde'],
    must_mention: 'PALAMCNG：221-229',
  },
  {
    desc: 'M6421 K903 MARKCNG 苦痛刻印 Lv3 首超条件删松（==3 改 ==4）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '  if (game.system.苦痛刻印变动 == 3 && chara(target).kojo.苦痛刻印Lv3 == 0) {',
    replace:
      '  if (game.system.苦痛刻印变动 == 4 && chara(target).kojo.苦痛刻印Lv3 == 0) {',
    tests: ['kojo-k903-garde'],
    must_mention: 'MARKCNG：297-300',
  },
  {
    desc: 'M6422 K903 MARKCNG 快乐刻印 Lv3 首超条件删松（==3 改 ==4）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '  if (game.system.快乐刻印变动 == 3 && chara(target).kojo.快乐刻印Lv3 == 0) {',
    replace:
      '  if (game.system.快乐刻印变动 == 4 && chara(target).kojo.快乐刻印Lv3 == 0) {',
    tests: ['kojo-k903-garde'],
    must_mention: 'MARKCNG：297-300',
  },
  {
    desc: 'M6423 K903 MARKCNG 屈服刻印 Lv3 首超条件删松（==3 改 ==4）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '  if (game.system.屈服刻印变动 == 3 && chara(target).kojo.屈服刻印Lv3 == 0) {',
    replace:
      '  if (game.system.屈服刻印变动 == 4 && chara(target).kojo.屈服刻印Lv3 == 0) {',
    tests: ['kojo-k903-garde'],
    must_mention: 'MARKCNG：297-300',
  },
  {
    desc: 'M6424 K903 MARKCNG 反抗刻印 Lv3 首超条件删松（==3 改 ==4）（#249）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '  if (game.system.反抗刻印变动 == 3 && chara(target).kojo.反抗刻印Lv3 == 0) {',
    replace:
      '  if (game.system.反抗刻印变动 == 4 && chara(target).kojo.反抗刻印Lv3 == 0) {',
    tests: ['kojo-k903-garde'],
    must_mention: 'MARKCNG：297-300',
  },
  {
    desc: 'M6000 K19 SELECTCOM 0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.爱抚 = 1;',
    replace: 'chara(target).kojo.爱抚 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 0 首回合推进 CFLAG:301',
  },
  {
    desc: 'M6001 K19 SELECTCOM 1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.舔阴 = 1;',
    replace: 'chara(target).kojo.舔阴 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 1 首回合推进 CFLAG:302',
  },
  {
    desc: 'M6002 K19 SELECTCOM 2 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛门爱抚 = 1;',
    replace: 'chara(target).kojo.肛门爱抚 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 2 首回合推进 CFLAG:303',
  },
  {
    desc: 'M6003 K19 SELECTCOM 3 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.自慰 = 1;',
    replace: 'chara(target).kojo.自慰 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 3 首回合推进 CFLAG:304',
  },
  {
    desc: 'M6004 K19 SELECTCOM 5 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.胸爱抚 = 1;',
    replace: 'chara(target).kojo.胸爱抚 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 5 首回合推进 CFLAG:306',
  },
  {
    desc: 'M6005 K19 SELECTCOM 6 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '      chara(target).kojo.接吻 = 1;\n      return 0;\n    } else {',
    replace:
      '      chara(target).kojo.接吻 = 2;\n      return 0;\n    } else {',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 6 首回合推进 CFLAG:307',
  },
  {
    desc: 'M6006 K19 SELECTCOM 7 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.自己扒开 = 1;',
    replace: 'chara(target).kojo.自己扒开 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 7 首回合推进 CFLAG:308',
  },
  {
    desc: 'M6007 K19 SELECTCOM 8 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.插入手指 = 1;',
    replace: 'chara(target).kojo.插入手指 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 8 首回合推进 CFLAG:309',
  },
  {
    desc: 'M6008 K19 SELECTCOM 9 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.舔肛 = 1;',
    replace: 'chara(target).kojo.舔肛 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 9 首回合推进 CFLAG:310',
  },
  {
    desc: 'M6009 K19 SELECTCOM 10 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.振动宝石 = 1;',
    replace: 'chara(target).kojo.振动宝石 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 10 首回合推进 CFLAG:311',
  },
  {
    desc: 'M6010 K19 SELECTCOM 11 TEQUIP:11=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.壶虫 = 1;',
    replace: 'chara(target).kojo.壶虫 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 11 TEQUIP:11=1 首回合推进 CFLAG:312',
  },
  {
    desc: 'M6011 K19 SELECTCOM 11 TEQUIP:11=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.壶虫着脱 = 1;',
    replace: 'chara(target).kojo.壶虫着脱 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 11 TEQUIP:11=0 首回合推进 CFLAG:372',
  },
  {
    desc: 'M6012 K19 SELECTCOM 12 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.振动杖 = 1;',
    replace: 'chara(target).kojo.振动杖 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 12 首回合推进 CFLAG:313',
  },
  {
    desc: 'M6013 K19 SELECTCOM 13 TEQUIP:13=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛门虫 = 1;',
    replace: 'chara(target).kojo.肛门虫 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 13 TEQUIP:13=1 首回合推进 CFLAG:314',
  },
  {
    desc: 'M6014 K19 SELECTCOM 13 TEQUIP:13=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛门虫着脱 = 1;',
    replace: 'chara(target).kojo.肛门虫着脱 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 13 TEQUIP:13=0 首回合推进 CFLAG:374',
  },
  {
    desc: 'M6015 K19 SELECTCOM 14 TEQUIP:14=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.阴蒂夹 = 1;',
    replace: 'chara(target).kojo.阴蒂夹 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 14 TEQUIP:14=1 首回合推进 CFLAG:315',
  },
  {
    desc: 'M6016 K19 SELECTCOM 14 TEQUIP:14=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.阴蒂夹着脱 = 1;',
    replace: 'chara(target).kojo.阴蒂夹着脱 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 14 TEQUIP:14=0 首回合推进 CFLAG:375',
  },
  {
    desc: 'M6017 K19 SELECTCOM 15 TEQUIP:15=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.乳头夹 = 1;',
    replace: 'chara(target).kojo.乳头夹 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 15 TEQUIP:15=1 首回合推进 CFLAG:316',
  },
  {
    desc: 'M6018 K19 SELECTCOM 15 TEQUIP:15=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.乳头夹着脱 = 1;',
    replace: 'chara(target).kojo.乳头夹着脱 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 15 TEQUIP:15=0 首回合推进 CFLAG:376',
  },
  {
    desc: 'M6019 K19 SELECTCOM 19 TEQUIP:19=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛珠 = 1;',
    replace: 'chara(target).kojo.肛珠 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 19 TEQUIP:19=1 首回合推进 CFLAG:320',
  },
  {
    desc: 'M6020 K19 SELECTCOM 19 TEQUIP:19=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛珠着脱 = 1;',
    replace: 'chara(target).kojo.肛珠着脱 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 19 TEQUIP:19=0 首回合推进 CFLAG:379',
  },
  {
    desc: 'M6021 K19 SELECTCOM 20 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.正常位 = 1;',
    replace: 'chara(target).kojo.正常位 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 20 首回合推进 CFLAG:321',
  },
  {
    desc: 'M6022 K19 SELECTCOM 21 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.背后位 = 1;',
    replace: 'chara(target).kojo.背后位 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 21 首回合推进 CFLAG:322',
  },
  {
    desc: 'M6023 K19 SELECTCOM 22 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.对面座位 = 1;',
    replace: 'chara(target).kojo.对面座位 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 22 首回合推进 CFLAG:323',
  },
  {
    desc: 'M6024 K19 SELECTCOM 23 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.背面座位 = 1;',
    replace: 'chara(target).kojo.背面座位 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 23 首回合推进 CFLAG:324',
  },
  {
    desc: 'M6025 K19 SELECTCOM 26 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.正常位肛交 = 1;',
    replace: 'chara(target).kojo.正常位肛交 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 26 首回合推进 CFLAG:327',
  },
  {
    desc: 'M6026 K19 SELECTCOM 27 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.背后位肛交 = 1;',
    replace: 'chara(target).kojo.背后位肛交 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 27 首回合推进 CFLAG:328',
  },
  {
    desc: 'M6027 K19 SELECTCOM 28 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.对面座位肛交 = 1;',
    replace: 'chara(target).kojo.对面座位肛交 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 28 首回合推进 CFLAG:329',
  },
  {
    desc: 'M6028 K19 SELECTCOM 29 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '            `被${master_name}抱在怀里侵犯着的${target_name}微弱的挣扎着。`,\n          );\n        }\n      }\n      // CFLAG:337  = 1（变量语义：CFLAG 族，337）\n      chara(target).kojo.骑乘位肛交 = 1;',
    replace:
      '            `被${master_name}抱在怀里侵犯着的${target_name}微弱的挣扎着。`,\n          );\n        }\n      }\n      // CFLAG:337  = 1（变量语义：CFLAG 族，337）\n      chara(target).kojo.骑乘位肛交 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 29 首回合推进 CFLAG:337',
  },
  {
    desc: 'M6029 K19 SELECTCOM 30 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.手淫 = 1;',
    replace: 'chara(target).kojo.手淫 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 30 首回合推进 CFLAG:331',
  },
  {
    desc: 'M6030 K19 SELECTCOM 31 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.口交_奴 = 1;',
    replace: 'chara(target).kojo.口交_奴 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 31 首回合推进 CFLAG:332',
  },
  {
    desc: 'M6031 K19 SELECTCOM 32 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.乳交 = 1;',
    replace: 'chara(target).kojo.乳交 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 32 首回合推进 CFLAG:333',
  },
  {
    desc: 'M6032 K19 SELECTCOM 33 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.股间性交 = 1;',
    replace: 'chara(target).kojo.股间性交 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 33 首回合推进 CFLAG:334',
  },
  {
    desc: 'M6033 K19 SELECTCOM 34 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.骑乘位 = 1;',
    replace: 'chara(target).kojo.骑乘位 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 34 首回合推进 CFLAG:335',
  },
  {
    desc: 'M6034 K19 SELECTCOM 35 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.全身擦洗 = 1;',
    replace: 'chara(target).kojo.全身擦洗 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 35 首回合推进 CFLAG:336',
  },
  {
    desc: 'M6035 K19 SELECTCOM 36 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '            `${target_name}轻轻的抽泣着，晶莹的泪珠不断的沿着脸颊滑落。`,\n          );\n        }\n      }\n      // CFLAG:337  = 1（变量语义：CFLAG 族，337）\n      chara(target).kojo.骑乘位肛交 = 1;',
    replace:
      '            `${target_name}轻轻的抽泣着，晶莹的泪珠不断的沿着脸颊滑落。`,\n          );\n        }\n      }\n      // CFLAG:337  = 1（变量语义：CFLAG 族，337）\n      chara(target).kojo.骑乘位肛交 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 36 首回合推进 CFLAG:337',
  },
  {
    desc: 'M6036 K19 SELECTCOM 37 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛门侍奉 = 1;',
    replace: 'chara(target).kojo.肛门侍奉 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 37 首回合推进 CFLAG:338',
  },
  {
    desc: 'M6037 K19 SELECTCOM 38 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.足交 = 1;',
    replace: 'chara(target).kojo.足交 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 38 首回合推进 CFLAG:339',
  },
  {
    desc: 'M6038 K19 SELECTCOM 40 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.打屁股 = 1;',
    replace: 'chara(target).kojo.打屁股 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 40 首回合推进 CFLAG:341',
  },
  {
    desc: 'M6039 K19 SELECTCOM 41 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.鞭 = 1;',
    replace: 'chara(target).kojo.鞭 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 41 首回合推进 CFLAG:342',
  },
  {
    desc: 'M6040 K19 SELECTCOM 42 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.针 = 1;',
    replace: 'chara(target).kojo.针 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 42 首回合推进 CFLAG:343',
  },
  {
    desc: 'M6041 K19 SELECTCOM 43 TEQUIP:43=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.眼罩 = 1;',
    replace: 'chara(target).kojo.眼罩 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 43 TEQUIP:43=1 首回合推进 CFLAG:344',
  },
  {
    desc: 'M6042 K19 SELECTCOM 43 TEQUIP:43=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.眼罩着脱 = 1;',
    replace: 'chara(target).kojo.眼罩着脱 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 43 TEQUIP:43=0 首回合推进 CFLAG:380',
  },
  {
    desc: 'M6043 K19 SELECTCOM 44 TEQUIP:44=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.绳子 = 1;',
    replace: 'chara(target).kojo.绳子 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 44 TEQUIP:44=1 首回合推进 CFLAG:345',
  },
  {
    desc: 'M6044 K19 SELECTCOM 44 TEQUIP:44=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.绳子着脱 = 1;',
    replace: 'chara(target).kojo.绳子着脱 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 44 TEQUIP:44=0 首回合推进 CFLAG:385',
  },
  {
    desc: 'M6045 K19 SELECTCOM 45 TEQUIP:45=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.口塞 = 1;',
    replace: 'chara(target).kojo.口塞 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 45 TEQUIP:45=1 首回合推进 CFLAG:346',
  },
  {
    desc: 'M6046 K19 SELECTCOM 45 TEQUIP:45=0 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.口塞着脱 = 1;',
    replace: 'chara(target).kojo.口塞着脱 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 45 TEQUIP:45=0 首回合推进 CFLAG:386',
  },
  {
    desc: 'M6047 K19 SELECTCOM 46 TEQUIP:46=1 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.灌肠肛塞 = 1;',
    replace: 'chara(target).kojo.灌肠肛塞 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 46 TEQUIP:46=1 首回合推进 CFLAG:347',
  },
  {
    desc: 'M6048 K19 SELECTCOM 55 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.放置PLAY = 1;',
    replace: 'chara(target).kojo.放置PLAY = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 55 首回合推进 CFLAG:356',
  },
  {
    desc: 'M6049 K19 SELECTCOM 56 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.交谈 = 1;',
    replace: 'chara(target).kojo.交谈 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 56 首回合推进 CFLAG:357',
  },
  {
    desc: 'M6050 K19 SELECTCOM 125 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.口交时自慰 = 1;',
    replace: 'chara(target).kojo.口交时自慰 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 125 首回合推进 CFLAG:361',
  },
  {
    desc: 'M6051 K19 SELECTCOM 126 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.手搓口交 = 1;',
    replace: 'chara(target).kojo.手搓口交 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 126 首回合推进 CFLAG:362',
  },
  {
    desc: 'M6052 K19 SELECTCOM 127 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.真空口交 = 1;',
    replace: 'chara(target).kojo.真空口交 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 127 首回合推进 CFLAG:363',
  },
  {
    desc: 'M6053 K19 SELECTCOM 69 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.六九式 = 1;',
    replace: 'chara(target).kojo.六九式 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 69 首回合推进 CFLAG:364',
  },
  {
    desc: 'M6054 K19 SELECTCOM 124 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.深喉 = 1;',
    replace: 'chara(target).kojo.深喉 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 124 首回合推进 CFLAG:365',
  },
  {
    desc: 'M6055 K19 SELECTCOM 80 首回合状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.强制口交 = 1;',
    replace: 'chara(target).kojo.强制口交 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 80 首回合推进 CFLAG:381',
  },
  {
    desc: 'M6056 K19 头部助手调教检查删松（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));\n  if (era_flag.assi > 0 && era_flag.assiplay) {',
    replace:
      '  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));\n  if (false && era_flag.assi > 0 && era_flag.assiplay) {',
    tests: ['kojo-k19-fia'],
    must_mention: '助手调教检查无输出',
  },
  {
    desc: 'M6057 K19 头部口塞检查删松（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {',
    replace:
      'if (false && era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {',
    tests: ['kojo-k19-fia'],
    must_mention: '口塞检查无输出',
  },
  {
    desc: 'M6058 K19 头部失神检查删松（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {\n    return 0;\n  }\n\n  if (game.train.失神) {',
    replace:
      '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {\n    return 0;\n  }\n\n  if (false && game.train.失神) {',
    tests: ['kojo-k19-fia'],
    must_mention: '失神检查无输出',
  },
  {
    desc: 'M6059 K19 头部兽奸检查删松（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {\n    return 0;\n  }\n\n  if (game.train.失神) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:89`)) {',
    replace:
      '  if (era.get(`tequip:${target}:45`) && era_flag.selectcom != 45) {\n    return 0;\n  }\n\n  if (game.train.失神) {\n    return 0;\n  }\n\n  if (false && era.get(`tequip:${target}:89`)) {',
    tests: ['kojo-k19-fia'],
    must_mention: '兽奸检查无输出',
  },
  {
    desc: 'M6060 K19 头部触手检查删松（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '  if (era.get(`tequip:${target}:90`)) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:55`)) {\n    return colosseum_kojo_19();',
    replace:
      '  if (false && era.get(`tequip:${target}:90`)) {\n    return 0;\n  }\n\n  if (era.get(`tequip:${target}:55`)) {\n    return colosseum_kojo_19();',
    tests: ['kojo-k19-fia'],
    must_mention: '触手检查无输出',
  },
  {
    desc: 'M6061 K19 头部死斗场检查删松（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '  if (era.get(`tequip:${target}:55`)) {\n    return colosseum_kojo_19();',
    replace:
      '  if (false && era.get(`tequip:${target}:55`)) {\n    return colosseum_kojo_19();',
    tests: ['kojo-k19-fia'],
    must_mention: '死斗场检查转入专用口上',
  },
  {
    desc: 'M6062 K19 头部崩坏检查删松（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '    return colosseum_kojo_19();\n  }\n\n  if (era.get(`talent:${target}:9`) == 1) {',
    replace:
      '    return colosseum_kojo_19();\n  }\n\n  if (false && era.get(`talent:${target}:9`) == 1) {',
    tests: ['kojo-k19-fia'],
    must_mention: '崩坏检查无输出',
  },
  {
    desc: 'M6063 K19 PALAMCNG 首次润滑状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.首次润滑Lv2 = 1;',
    replace: 'chara(target).kojo.首次润滑Lv2 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: '首次润滑推进',
  },
  {
    desc: 'M6064 K19 PALAMCNG 首次C绝顶状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.首次C绝顶 = 1;',
    replace: 'chara(target).kojo.首次C绝顶 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: '首次C绝顶推进',
  },
  {
    desc: 'M6065 K19 PALAMCNG 首次V绝顶状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.首次V绝顶 = 1;',
    replace: 'chara(target).kojo.首次V绝顶 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: '首次V绝顶推进',
  },
  {
    desc: 'M6066 K19 PALAMCNG 首次A绝顶状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.首次A绝顶 = 1;',
    replace: 'chara(target).kojo.首次A绝顶 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: '首次A绝顶推进',
  },
  {
    desc: 'M6067 K19 PALAMCNG 首次B绝顶状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.首次B绝顶 = 1;',
    replace: 'chara(target).kojo.首次B绝顶 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: '首次B绝顶推进',
  },
  {
    desc: 'M6068 K19 MARKCNG 苦痛刻印首超推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.苦痛刻印Lv3 = 1;',
    replace: 'chara(target).kojo.苦痛刻印Lv3 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: '苦痛刻印首超推进',
  },
  {
    desc: 'M6069 K19 MARKCNG 快乐刻印首超推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.快乐刻印Lv3 = 1;',
    replace: 'chara(target).kojo.快乐刻印Lv3 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: '快乐刻印首超推进',
  },
  {
    desc: 'M6070 K19 MARKCNG 屈服刻印首超推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.屈服刻印Lv3 = 1;',
    replace: 'chara(target).kojo.屈服刻印Lv3 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: '屈服刻印首超推进',
  },
  {
    desc: 'M6071 K19 MARKCNG 反抗刻印首超推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.反抗刻印Lv3 = 1;',
    replace: 'chara(target).kojo.反抗刻印Lv3 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: '反抗刻印首超推进',
  },
  {
    desc: 'M6074 K19 初调教 CFLAG:201 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '      chara(target).kojo.初调教 = 1;\n      return 1;',
    replace:
      '      chara(target).kojo.初调教 = 2; // （变异）\n      return 1;',
    tests: ['kojo-k19-fia'],
    must_mention: '人类初调教推进到 1',
  },
  {
    desc: 'M6078 K19 NTR 再捕获状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.NTR再捕获 = 1;',
    replace: 'chara(target).kojo.NTR再捕获 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'NTR 再捕获状态推进',
  },
  {
    desc: 'M6079 K19 NTR P==1 状态推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.NTR_651 = 1;',
    replace: 'chara(target).kojo.NTR_651 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'NTR P==1 状态推进',
  },
  {
    desc: 'M6080 K19 EVENTTRAIN CFLAG:201 1→2 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.初调教 = 2;',
    replace: 'chara(target).kojo.初调教 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: '初调教主状态机 1 → 2',
  },
  {
    desc: 'M6081 K19 EVENTTRAIN CFLAG:201 2→3 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.初调教 = 3;',
    replace: 'chara(target).kojo.初调教 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: '初调教主状态机 2 → 3',
  },
  {
    desc: 'M6082 K19 EVENTTRAIN CFLAG:201 3→4 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.初调教 = 4;',
    replace: 'chara(target).kojo.初调教 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: '初调教主状态机 3 → 4',
  },
  {
    desc: 'M6083 K19 EVENTTRAIN CFLAG:201 4→5 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.初调教 = 5;',
    replace: 'chara(target).kojo.初调教 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: '初调教主状态机 4 → 5',
  },
  {
    desc: 'M6084 K19 EVENTTRAIN CFLAG:201 5→6 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.初调教 = 6;',
    replace: 'chara(target).kojo.初调教 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: '初调教主状态机 5 → 6',
  },
  {
    desc: 'M6085 K19 EVENTTRAIN CFLAG:201 6→7 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.初调教 = 7;',
    replace: 'chara(target).kojo.初调教 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: '初调教主状态机 6 → 7',
  },
  {
    desc: 'M6086 K19 EVENTTRAIN CFLAG:201 7→8 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '      chara(target).kojo.初调教 = 8;\n      return 1;\n    } else if (chara(target).kojo.魔族化 == 2) {',
    replace:
      '      chara(target).kojo.初调教 = 99;\n      return 1;\n    } else if (chara(target).kojo.魔族化 == 2) {',
    tests: ['kojo-k19-fia'],
    must_mention: '初调教主状态机 7 → 8',
  },
  {
    desc: 'M6087 K19 EVENTTRAIN CFLAG:201 8→9 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.初调教 = 9;',
    replace: 'chara(target).kojo.初调教 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: '初调教主状态机 8 → 9',
  },
  {
    desc: 'M6088 K19 SELECTCOM 0 后续 CFLAG:301 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.爱抚 = 2;',
    replace: 'chara(target).kojo.爱抚 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 0 后续档推进 CFLAG:301=2',
  },
  {
    desc: 'M6089 K19 SELECTCOM 1 后续 CFLAG:302 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.舔阴 = 2;',
    replace: 'chara(target).kojo.舔阴 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 1 后续档推进 CFLAG:302=2',
  },
  {
    desc: 'M6090 K19 SELECTCOM 2 后续 CFLAG:303 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛门爱抚 = 2;',
    replace: 'chara(target).kojo.肛门爱抚 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 2 后续档推进 CFLAG:303=2',
  },
  {
    desc: 'M6091 K19 SELECTCOM 3 后续 CFLAG:304 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.自慰 = 2;',
    replace: 'chara(target).kojo.自慰 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 3 后续档推进 CFLAG:304=2',
  },
  {
    desc: 'M6092 K19 SELECTCOM 5 后续 CFLAG:306 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '          `${target_name}在${master_name}的怀里挣扎着，不过这只是徒劳的让揉捏的力度增大罢了。`,\n        );\n        // CFLAG:306  = 2（变量语义：CFLAG 族，306）\n        chara(target).kojo.胸爱抚 = 2;',
    replace:
      '          `${target_name}在${master_name}的怀里挣扎着，不过这只是徒劳的让揉捏的力度增大罢了。`,\n        );\n        // CFLAG:306  = 2（变量语义：CFLAG 族，306）\n        chara(target).kojo.胸爱抚 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 5 后续档推进 CFLAG:306=2',
  },
  {
    desc: 'M6093 K19 SELECTCOM 6 后续 CFLAG:307 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.接吻 = 2;',
    replace: 'chara(target).kojo.接吻 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 6 后续档推进 CFLAG:307=2',
  },
  {
    desc: 'M6094 K19 SELECTCOM 8 后续 CFLAG:309 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.插入手指 = 2;',
    replace: 'chara(target).kojo.插入手指 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 8 后续档推进 CFLAG:309=2',
  },
  {
    desc: 'M6095 K19 SELECTCOM 9 后续 CFLAG:310 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.舔肛 = 2;',
    replace: 'chara(target).kojo.舔肛 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 9 后续档推进 CFLAG:310=2',
  },
  {
    desc: 'M6096 K19 SELECTCOM 10 后续 CFLAG:311 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.振动宝石 = 2;',
    replace: 'chara(target).kojo.振动宝石 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 10 后续档推进 CFLAG:311=2',
  },
  {
    desc: 'M6097 K19 SELECTCOM 11 后续 CFLAG:312 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.壶虫 = 2;',
    replace: 'chara(target).kojo.壶虫 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 11 TEQUIP:11=1 后续档推进 CFLAG:312=2',
  },
  {
    desc: 'M6098 K19 SELECTCOM 11 后续 CFLAG:372 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.壶虫着脱 = 3;',
    replace: 'chara(target).kojo.壶虫着脱 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 11 TEQUIP:11=0 后续档推进 CFLAG:372=3',
  },
  {
    desc: 'M6099 K19 SELECTCOM 12 后续 CFLAG:313 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.振动杖 = 2;',
    replace: 'chara(target).kojo.振动杖 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 12 后续档推进 CFLAG:313=2',
  },
  {
    desc: 'M6100 K19 SELECTCOM 13 后续 CFLAG:314 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛门虫 = 2;',
    replace: 'chara(target).kojo.肛门虫 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 13 TEQUIP:13=1 后续档推进 CFLAG:314=2',
  },
  {
    desc: 'M6101 K19 SELECTCOM 13 后续 CFLAG:374 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛门虫着脱 = 3;',
    replace: 'chara(target).kojo.肛门虫着脱 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 13 TEQUIP:13=0 后续档推进 CFLAG:374=3',
  },
  {
    desc: 'M6102 K19 SELECTCOM 14 后续 CFLAG:315 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.阴蒂夹 = 2;',
    replace: 'chara(target).kojo.阴蒂夹 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 14 TEQUIP:14=1 后续档推进 CFLAG:315=2',
  },
  {
    desc: 'M6103 K19 SELECTCOM 14 后续 CFLAG:375 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.阴蒂夹着脱 = 2;',
    replace: 'chara(target).kojo.阴蒂夹着脱 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 14 TEQUIP:14=0 后续档推进 CFLAG:375=2',
  },
  {
    desc: 'M6104 K19 SELECTCOM 15 后续 CFLAG:316 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.乳头夹 = 2;',
    replace: 'chara(target).kojo.乳头夹 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 15 TEQUIP:15=1 后续档推进 CFLAG:316=2',
  },
  {
    desc: 'M6105 K19 SELECTCOM 15 后续 CFLAG:376 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.乳头夹着脱 = 2;',
    replace: 'chara(target).kojo.乳头夹着脱 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 15 TEQUIP:15=0 后续档推进 CFLAG:376=2',
  },
  {
    desc: 'M6106 K19 SELECTCOM 19 后续 CFLAG:320 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛珠 = 2;',
    replace: 'chara(target).kojo.肛珠 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 19 TEQUIP:19=1 后续档推进 CFLAG:320=2',
  },
  {
    desc: 'M6107 K19 SELECTCOM 19 后续 CFLAG:379 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛珠着脱 = 3;',
    replace: 'chara(target).kojo.肛珠着脱 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 19 TEQUIP:19=0 后续档推进 CFLAG:379=3',
  },
  {
    desc: 'M6108 K19 SELECTCOM 20 后续 CFLAG:321 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.正常位 = 2;',
    replace: 'chara(target).kojo.正常位 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 20 后续档推进 CFLAG:321=2',
  },
  {
    desc: 'M6109 K19 SELECTCOM 21 后续 CFLAG:322 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.背后位 = 2;',
    replace: 'chara(target).kojo.背后位 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 21 后续档推进 CFLAG:322=2',
  },
  {
    desc: 'M6110 K19 SELECTCOM 22 后续 CFLAG:323 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.对面座位 = 2;',
    replace: 'chara(target).kojo.对面座位 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 22 后续档推进 CFLAG:323=2',
  },
  {
    desc: 'M6111 K19 SELECTCOM 23 后续 CFLAG:324 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.背面座位 = 2;',
    replace: 'chara(target).kojo.背面座位 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 23 后续档推进 CFLAG:324=2',
  },
  {
    desc: 'M6112 K19 SELECTCOM 26 后续 CFLAG:327 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.正常位肛交 = 2;',
    replace: 'chara(target).kojo.正常位肛交 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 26 后续档推进 CFLAG:327=2',
  },
  {
    desc: 'M6113 K19 SELECTCOM 27 后续 CFLAG:328 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.背后位肛交 = 2;',
    replace: 'chara(target).kojo.背后位肛交 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 27 后续档推进 CFLAG:328=2',
  },
  {
    desc: 'M6114 K19 SELECTCOM 28 后续 CFLAG:329 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.对面座位肛交 = 2;',
    replace: 'chara(target).kojo.对面座位肛交 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 28 后续档推进 CFLAG:329=2',
  },
  {
    desc: 'M6115 K19 SELECTCOM 29 后续 CFLAG:337 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '          `${target_name}擦拭着眼角，幼小的身体拼命的排斥着入侵的异物。`,\n        );\n        // CFLAG:337  = 2（变量语义：CFLAG 族，337）\n        chara(target).kojo.骑乘位肛交 = 2;',
    replace:
      '          `${target_name}擦拭着眼角，幼小的身体拼命的排斥着入侵的异物。`,\n        );\n        // CFLAG:337  = 2（变量语义：CFLAG 族，337）\n        chara(target).kojo.骑乘位肛交 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 29 后续档推进 CFLAG:337=2',
  },
  {
    desc: 'M6116 K19 SELECTCOM 30 后续 CFLAG:331 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.手淫 = 2;',
    replace: 'chara(target).kojo.手淫 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 30 后续档推进 CFLAG:331=2',
  },
  {
    desc: 'M6117 K19 SELECTCOM 31 后续 CFLAG:332 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.口交_奴 = 2;',
    replace: 'chara(target).kojo.口交_奴 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 31 后续档推进 CFLAG:332=2',
  },
  {
    desc: 'M6118 K19 SELECTCOM 32 后续 CFLAG:333 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.乳交 = 2;',
    replace: 'chara(target).kojo.乳交 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 32 后续档推进 CFLAG:333=2',
  },
  {
    desc: 'M6119 K19 SELECTCOM 33 后续 CFLAG:334 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.股间性交 = 2;',
    replace: 'chara(target).kojo.股间性交 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 33 后续档推进 CFLAG:334=2',
  },
  {
    desc: 'M6120 K19 SELECTCOM 34 后续 CFLAG:335 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.骑乘位 = 2;',
    replace: 'chara(target).kojo.骑乘位 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 34 后续档推进 CFLAG:335=2',
  },
  {
    desc: 'M6121 K19 SELECTCOM 35 后续 CFLAG:336 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.全身擦洗 = 2;',
    replace: 'chara(target).kojo.全身擦洗 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 35 后续档推进 CFLAG:336=2',
  },
  {
    desc: 'M6122 K19 SELECTCOM 36 后续 CFLAG:337 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '          `几乎伏在了${master_name}身上的${target_name}不停地抽泣着。`,\n        );\n        // CFLAG:337  = 2（变量语义：CFLAG 族，337）\n        chara(target).kojo.骑乘位肛交 = 2;',
    replace:
      '          `几乎伏在了${master_name}身上的${target_name}不停地抽泣着。`,\n        );\n        // CFLAG:337  = 2（变量语义：CFLAG 族，337）\n        chara(target).kojo.骑乘位肛交 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 36 后续档推进 CFLAG:337=2',
  },
  {
    desc: 'M6123 K19 SELECTCOM 37 后续 CFLAG:338 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.肛门侍奉 = 2;',
    replace: 'chara(target).kojo.肛门侍奉 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 37 后续档推进 CFLAG:338=2',
  },
  {
    desc: 'M6124 K19 SELECTCOM 38 后续 CFLAG:339 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.足交 = 2;',
    replace: 'chara(target).kojo.足交 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 38 后续档推进 CFLAG:339=2',
  },
  {
    desc: 'M6125 K19 SELECTCOM 40 后续 CFLAG:341 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.打屁股 = 2;',
    replace: 'chara(target).kojo.打屁股 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 40 后续档推进 CFLAG:341=2',
  },
  {
    desc: 'M6126 K19 SELECTCOM 41 后续 CFLAG:342 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.鞭 = 2;',
    replace: 'chara(target).kojo.鞭 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 41 后续档推进 CFLAG:342=2',
  },
  {
    desc: 'M6127 K19 SELECTCOM 42 后续 CFLAG:343 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.针 = 2;',
    replace: 'chara(target).kojo.针 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 42 后续档推进 CFLAG:343=2',
  },
  {
    desc: 'M6128 K19 SELECTCOM 43 后续 CFLAG:344 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.眼罩 = 2;',
    replace: 'chara(target).kojo.眼罩 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 43 TEQUIP:43=1 后续档推进 CFLAG:344=2',
  },
  {
    desc: 'M6129 K19 SELECTCOM 43 后续 CFLAG:380 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.眼罩着脱 = 2;',
    replace: 'chara(target).kojo.眼罩着脱 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 43 TEQUIP:43=0 后续档推进 CFLAG:380=2',
  },
  {
    desc: 'M6130 K19 SELECTCOM 44 后续 CFLAG:345 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.绳子 = 2;',
    replace: 'chara(target).kojo.绳子 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 44 TEQUIP:44=1 后续档推进 CFLAG:345=2',
  },
  {
    desc: 'M6131 K19 SELECTCOM 44 后续 CFLAG:385 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.绳子着脱 = 2;',
    replace: 'chara(target).kojo.绳子着脱 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 44 TEQUIP:44=0 后续档推进 CFLAG:385=2',
  },
  {
    desc: 'M6132 K19 SELECTCOM 45 后续 CFLAG:346 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.口塞 = 2;',
    replace: 'chara(target).kojo.口塞 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 45 TEQUIP:45=1 后续档推进 CFLAG:346=2',
  },
  {
    desc: 'M6133 K19 SELECTCOM 45 后续 CFLAG:386 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.口塞着脱 = 2;',
    replace: 'chara(target).kojo.口塞着脱 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 45 TEQUIP:45=0 后续档推进 CFLAG:386=2',
  },
  {
    desc: 'M6134 K19 SELECTCOM 46 后续 CFLAG:347 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.灌肠肛塞 = 2;',
    replace: 'chara(target).kojo.灌肠肛塞 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 46 TEQUIP:46=1 后续档推进 CFLAG:347=2',
  },
  {
    desc: 'M6135 K19 SELECTCOM 55 后续 CFLAG:356 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.放置PLAY = 2;',
    replace: 'chara(target).kojo.放置PLAY = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 55 TEQUIP:55=0 后续档推进 CFLAG:356=2',
  },
  {
    desc: 'M6136 K19 SELECTCOM 125 后续 CFLAG:361 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.口交时自慰 = 2;',
    replace: 'chara(target).kojo.口交时自慰 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 125 后续档推进 CFLAG:361=2',
  },
  {
    desc: 'M6137 K19 SELECTCOM 126 后续 CFLAG:362 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.手搓口交 = 2;',
    replace: 'chara(target).kojo.手搓口交 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 126 后续档推进 CFLAG:362=2',
  },
  {
    desc: 'M6138 K19 SELECTCOM 127 后续 CFLAG:363 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.真空口交 = 2;',
    replace: 'chara(target).kojo.真空口交 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 127 后续档推进 CFLAG:363=2',
  },
  {
    desc: 'M6139 K19 SELECTCOM 69 后续 CFLAG:364 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.六九式 = 2;',
    replace: 'chara(target).kojo.六九式 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 69 后续档推进 CFLAG:364=2',
  },
  {
    desc: 'M6140 K19 SELECTCOM 124 后续 CFLAG:365 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.深喉 = 2;',
    replace: 'chara(target).kojo.深喉 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 124 后续档推进 CFLAG:365=2',
  },
  {
    desc: 'M6141 K19 SELECTCOM 80 后续 CFLAG:381 推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.强制口交 = 2;',
    replace: 'chara(target).kojo.强制口交 = 99;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELECTCOM 80 后续档推进 CFLAG:381=2',
  },
  {
    desc: 'M6142 K19 PALAMCNG CFLAG:222 首次推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.首次欲情Lv2 = 1;',
    replace: 'chara(target).kojo.首次欲情Lv2 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: '首次欲情推进',
  },
  {
    desc: 'M6143 K19 PALAMCNG CFLAG:223 首次推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.首次耻情Lv2 = 1;',
    replace: 'chara(target).kojo.首次耻情Lv2 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: '首次耻情推进',
  },
  {
    desc: 'M6144 K19 PALAMCNG CFLAG:224 首次推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.首次恐怖Lv2 = 1;',
    replace: 'chara(target).kojo.首次恐怖Lv2 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: '首次恐怖推进',
  },
  {
    desc: 'M6145 K19 PALAMCNG CFLAG:229 首次推进写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.处女丧失 = 1;',
    replace: 'chara(target).kojo.处女丧失 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: '处女丧失推进',
  },
  {
    desc: 'M6146 K19 SELF_KOJO TFLAG:13=1 推进 CFLAG:261 写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.调教后自慰 = 1;',
    replace: 'chara(target).kojo.调教后自慰 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELF_KOJO TFLAG:13=1 推进 CFLAG:261',
  },
  {
    desc: 'M6147 K19 SELF_KOJO TFLAG:13=2 推进 CFLAG:262 写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.百合PLAY = 1;',
    replace: 'chara(target).kojo.百合PLAY = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELF_KOJO TFLAG:13=2 推进 CFLAG:262',
  },
  {
    desc: 'M6148 K19 SELF_KOJO TFLAG:13=3 推进 CFLAG:263 写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.朝口交 = 1;',
    replace: 'chara(target).kojo.朝口交 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELF_KOJO TFLAG:13=3 推进 CFLAG:263',
  },
  {
    desc: 'M6149 K19 SELF_KOJO TFLAG:13=4 推进 CFLAG:264 写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.调教后性交 = 1;',
    replace: 'chara(target).kojo.调教后性交 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELF_KOJO TFLAG:13=4 推进 CFLAG:264',
  },
  {
    desc: 'M6150 K19 SELF_KOJO TFLAG:13=5 推进 CFLAG:265 写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.夜袭 = 1;',
    replace: 'chara(target).kojo.夜袭 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELF_KOJO TFLAG:13=5 推进 CFLAG:265',
  },
  {
    desc: 'M6151 K19 SELF_KOJO TFLAG:13=11 推进 CFLAG:271 写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '      chara(target).kojo.妊娠发觉 = 1;\n    } else {',
    replace: '      chara(target).kojo.妊娠发觉 = 2;\n    } else {',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELF_KOJO TFLAG:13=11 推进 CFLAG:271',
  },
  {
    desc: 'M6152 K19 SELF_KOJO TFLAG:13=12 推进 CFLAG:272 写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '      chara(target).kojo.生产 = 1;\n    } else {',
    replace: '      chara(target).kojo.生产 = 2;\n    } else {',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELF_KOJO TFLAG:13=12 推进 CFLAG:272',
  },
  {
    desc: 'M6153 K19 SELF_KOJO TFLAG:13=13 推进 CFLAG:273 写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.育儿室 = 1;',
    replace: 'chara(target).kojo.育儿室 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELF_KOJO TFLAG:13=13 推进 CFLAG:273',
  },
  {
    desc: 'M6154 K19 SELF_KOJO TFLAG:13=14 推进 CFLAG:274 写错（#247）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: 'chara(target).kojo.亲离 = 1;',
    replace: 'chara(target).kojo.亲离 = 2;',
    tests: ['kojo-k19-fia'],
    must_mention: 'SELF_KOJO TFLAG:13=14 推进 CFLAG:274',
  },
  {
    desc: 'M6204 EX_FLAG 动态读取下标偏移（#248）',
    file: 'ere/era-utils/era-exflag.js',
    find: 'era_exflag.get = (index) => era.get(`exflag:${index}`) || 0;',
    replace: 'era_exflag.get = (index) => era.get(`exflag:${index + 1}`) || 0;',
    tests: ['kojo-system'],
    must_mention: '动态读取 EX_FLAG:102',
  },
  {
    desc: 'M6205 EX_FLAG 动态写入下标偏移（#248）',
    file: 'ere/era-utils/era-exflag.js',
    find: 'era_exflag.set = (index, value) => era.set(`exflag:${index}`, value);',
    replace:
      'era_exflag.set = (index, value) => era.set(`exflag:${index + 1}`, value);',
    tests: ['kojo-system'],
    must_mention: '动态写入 EX_FLAG:102',
  },
  {
    desc: 'M6206 get_ex_kojo_num 扫描漏掉 EX_TALENT:102（#248）',
    file: 'ere/system/chara/chara-ex.js',
    find: '  for (let count = 101; count < 801; count += 1) {',
    replace: '  for (let count = 101; count < 102; count += 1) {',
    tests: ['kojo-system'],
    must_mention: 'EX_TALENT:102 → 口上编号 1002',
  },
  {
    desc: 'M6207 get_ex_kojo_num 映射偏移 +900 改 +901（#248）',
    file: 'ere/system/chara/chara-ex.js',
    find: '      get_ex_kojo_num_local = count + 900;',
    replace: '      get_ex_kojo_num_local = count + 901;',
    tests: ['kojo-system'],
    must_mention: 'EX_TALENT:102 → 口上编号 1002',
  },
  {
    desc: 'M6208 GET_KOJO_NUM 删除 EX 扫描接入（#248）',
    file: 'ere/kojo/kojo-system.js',
    find: '  let local = get_ex_kojo_num(cid); // EX 口上先判，普通素质后写覆盖',
    replace: '  let local = 0; // 变异：删除 EX 扫描接入',
    tests: ['kojo-system'],
    must_mention: 'EX_TALENT:102 → 口上编号 1002',
  },
  {
    desc: 'M12510 K8 交谈·初めて·求爱档拆回两条（#622：%SAVESTR:PLAYER% 又占一行）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '          await era.print(\n            `${player_name}刚和她交谈了几句、${target_name}就一边晃着腰一边说出了求爱的话语`,\n          );',
    replace:
      '          await era.print(`${player_name}`); // 变异：拆回\n' +
      '          await era.print(\n' +
      '            `刚和她交谈了几句、${target_name}就一边晃着腰一边说出了求爱的话语`,\n' +
      '          ); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: '是一行',
  },
  {
    desc: 'M12511 K8 交谈·二回目·求爱档拆回两条（#622）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '        await era.print(\n          `${player_name}刚和她交谈了几句、${target_name}就一边晃着腰一边说出了求爱的话语`,\n        );',
    replace:
      '        await era.print(`${player_name}`); // 变异：拆回\n' +
      '        await era.print(\n' +
      '          `刚和她交谈了几句、${target_name}就一边晃着腰一边说出了求爱的话语`,\n' +
      '        ); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: '是一行',
  },
  {
    desc: 'M12512 K8 交谈·初めて·视频自我介绍拆回三条（#622：SIF 段又占一行）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: "          await era.print(\n            `${target_name}把自己的本名和至今为止的性经验` +\n              (masturbation ? `甚至自慰时妄想的内容都` : '') +\n              `微笑的娓娓道来……`,\n          );",
    replace:
      '          await era.print(`${target_name}把自己的本名和至今为止的性经验`); // 变异：拆回\n' +
      '          if (masturbation) {\n' +
      '            await era.print(`甚至自慰时妄想的内容都`); // 变异：拆回\n' +
      '          }\n' +
      '          await era.print(`微笑的娓娓道来……`); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: '是一行',
  },
  {
    desc: 'M12513 K8 交谈·二回目·视频自我介绍拆回三条（#622）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: "        await era.print(\n          `${target_name}把自己的本名和至今为止的性经验` +\n            (masturbation ? `、甚至自慰时妄想的内容都` : '') +\n            `一边微笑一边喋喋不休的讲着……`,\n        );",
    replace:
      '        await era.print(`${target_name}把自己的本名和至今为止的性经验`); // 变异：拆回\n' +
      '        if (masturbation) {\n' +
      '          await era.print(`、甚至自慰时妄想的内容都`); // 变异：拆回\n' +
      '        }\n' +
      '        await era.print(`一边微笑一边喋喋不休的讲着……`); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: '是一行',
  },
  {
    desc: 'M12514 K8 交谈·初めて·装备档拆回多条（#622：快乐/痛苦又各占一行）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: "          await era.print(\n            talk_prefix +\n              `刚和她交谈了几句、${target_name}就一边发出着` +\n              (equip_pleasure ? `快乐的` : equip_pain ? `痛苦的` : '') +\n              `声音，一边拼命忍耐着的回着话`,\n          );",
    replace:
      '          await era.print(\n' +
      '            talk_prefix + `刚和她交谈了几句、${target_name}就一边发出着`,\n' +
      '          ); // 变异：拆回\n' +
      '          if (equip_pleasure) {\n' +
      '            await era.print(`快乐的`); // 变异：拆回\n' +
      '          } else if (equip_pain) {\n' +
      '            await era.print(`痛苦的`); // 变异：拆回\n' +
      '          }\n' +
      '          await era.print(`声音，一边拼命忍耐着的回着话`); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: '是一行',
  },
  {
    desc: 'M12515 K8 交谈·二回目·装备档拆回多条（#622）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: "        await era.print(\n          talk_prefix +\n            `刚和她交谈了几句、${target_name}就一边发出着` +\n            (equip_pleasure ? `快乐的` : equip_pain ? `痛苦的` : '') +\n            `声音、一边拼命忍耐着的回着话`,\n        );",
    replace:
      '        await era.print(\n' +
      '          talk_prefix + `刚和她交谈了几句、${target_name}就一边发出着`,\n' +
      '        ); // 变异：拆回\n' +
      '        if (equip_pleasure) {\n' +
      '          await era.print(`快乐的`); // 变异：拆回\n' +
      '        } else if (equip_pain) {\n' +
      '          await era.print(`痛苦的`); // 变异：拆回\n' +
      '        }\n' +
      '        await era.print(`声音、一边拼命忍耐着的回着话`); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: '是一行',
  },
  {
    desc: 'M12516 K8 死斗场·SC31 助手拆回多条（#622：部位词又各占一行）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: "      await era.printAndWait(\n        `${assi_name}因为` +\n          (assi_has_penis ? `阴茎` : '') +\n          (assi_has_strap ? `假阴茎` : '') +\n          `被${target_name}舔着而露出了心旷神怡的表情……`,\n      );",
    replace:
      '      await era.print(`${assi_name}因为`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`阴茎`); // 变异：拆回\n' +
      '      }\n' +
      '      if (assi_has_strap) {\n' +
      '        await era.print(`假阴茎`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`被${target_name}舔着而露出了心旷神怡的表情……`); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: '是一行',
  },
  {
    desc: 'M12517 K8 死斗场·SC21 助手拆回多条（#622）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: "      await era.printAndWait(\n        `${assi_name}一边听着${target_name}的悲鸣用` +\n          (assi_has_penis ? `阴茎` : '') +\n          (assi_has_strap ? `假阴茎` : '') +\n          `毫不留情的蹂躏着${target_name}的腔内。`,\n      );",
    replace:
      '      await era.print(`${assi_name}一边听着${target_name}的悲鸣用`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`阴茎`); // 变异：拆回\n' +
      '      }\n' +
      '      if (assi_has_strap) {\n' +
      '        await era.print(`假阴茎`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`毫不留情的蹂躏着${target_name}的腔内。`); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: ':7386..:7391 是一行',
  },
  {
    desc: 'M12518 K8 死斗场·SC27 助手拆回多条（#622）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: "      await era.printAndWait(\n        `${assi_name}一边听着${target_name}的悲鸣。一边用` +\n          (assi_has_penis ? `阴茎` : '') +\n          (assi_has_strap ? `假阴茎` : '') +\n          `一般毫不留情的继续蹂躏着${target_name}的肛门。`,\n      );",
    replace:
      '      await era.print(`${assi_name}一边听着${target_name}的悲鸣。一边用`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`阴茎`); // 变异：拆回\n' +
      '      }\n' +
      '      if (assi_has_strap) {\n' +
      '        await era.print(`假阴茎`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`一般毫不留情的继续蹂躏着${target_name}的肛门。`); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: ':7413..:7418 是一行',
  },
  {
    desc: 'M12519 K8 NTR·P==1 陥落済拆回两条（#622：武器名又占一行）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      await era.printAndWait(\n        (futa() ? `然后、狂王的巨根` : `然后、特大号的按摩棒`) +\n          `慢慢的插进了${target_name}的秘裂。在镜头下${target_name}还不知道男人的蜜壶被插进了深处。`,\n      );',
    replace:
      '      if (futa()) {\n' +
      '        await era.print(`然后、狂王的巨根`); // 变异：拆回\n' +
      '      } else {\n' +
      '        await era.print(`然后、特大号的按摩棒`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(\n' +
      '        `慢慢的插进了${target_name}的秘裂。在镜头下${target_name}还不知道男人的蜜壶被插进了深处。`,\n' +
      '      ); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: '是一行',
  },
  {
    desc: 'M12520 K8 NTR·P==1 それ以外拆回两条（#622）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      await era.printAndWait(\n        `还是处女的${target_name}的秘裂被` +\n          (futa() ? `狂王的巨根` : `特大号的按摩棒`) +\n          `深深的插了进去。破瓜之血从秘裂里流了出来。`,\n      );',
    replace:
      '      await era.print(`还是处女的${target_name}的秘裂被`); // 变异：拆回\n' +
      '      if (futa()) {\n' +
      '        await era.print(`狂王的巨根`); // 变异：拆回\n' +
      '      } else {\n' +
      '        await era.print(`特大号的按摩棒`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`深深的插了进去。破瓜之血从秘裂里流了出来。`); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: '是一行',
  },
  {
    desc: 'M12521 K8 NTR·P==2 陥落済拆回两条（#622）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      await era.printAndWait(\n        (futa() ? `狂王的巨根` : `特大号的按摩棒`) +\n          `在${target_name}的肛门里转动着、${target_name}露出了喘息的声音………`,\n      );\n    } else {',
    replace:
      '      if (futa()) {\n        await era.print(`狂王的巨根`); // 变异：拆回\n      } else {\n        await era.print(`特大号的按摩棒`); // 变异：拆回\n      }\n      await era.printAndWait(\n        `在${target_name}的肛门里转动着、${target_name}露出了喘息的声音………`,\n      ); // 变异：拆回\n    } else {',
    tests: ['kojo-k8-spade'],
    must_mention: '是一行',
  },
  {
    desc: 'M12522 K8 NTR·P==2 それ以外拆回两条（#622）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      // 同上（#622）\n      await era.printAndWait(\n        (futa() ? `狂王的巨根` : `特大号的按摩棒`) +\n          `在${target_name}的肛门里转动着、${target_name}露出了喘息的声音………`,\n      );',
    replace:
      '      // 同上（#622）\n      if (futa()) {\n        await era.print(`狂王的巨根`); // 变异：拆回\n      } else {\n        await era.print(`特大号的按摩棒`); // 变异：拆回\n      }\n      await era.printAndWait(\n        `在${target_name}的肛门里转动着、${target_name}露出了喘息的声音………`,\n      ); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: '是一行',
  },
  {
    desc: 'M12523 K8 NTR·P==4 淫乱拆回两条（#622）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      await era.printAndWait(\n        (futa() ? `狂王的巨根` : `特大号的按摩棒`) +\n          `不停的侵犯着${target_name}的蜜壶、${target_name}发出了野兽一样的喘息。`,\n      );',
    replace:
      '      if (futa()) {\n' +
      '        await era.print(`狂王的巨根`); // 变异：拆回\n' +
      '      } else {\n' +
      '        await era.print(`特大号的按摩棒`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(\n' +
      '        `不停的侵犯着${target_name}的蜜壶、${target_name}发出了野兽一样的喘息。`,\n' +
      '      ); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: '是一行',
  },
  {
    desc: 'M12524 K8 NTR·P==4 それ以外（武器名与收行同属一行）拆回两条（#622）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      await era.printAndWait(\n        (futa() ? `狂王的巨根` : `特大号的按摩棒`) +\n          `不停的侵犯着${target_name}的蜜壶、${target_name}发出了逞强的声音。`,\n      );',
    replace:
      '      if (futa()) {\n' +
      '        await era.print(`狂王的巨根`); // 变异：拆回\n' +
      '      } else {\n' +
      '        await era.print(`特大号的按摩棒`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(\n' +
      '        `不停的侵犯着${target_name}的蜜壶、${target_name}发出了逞强的声音。`,\n' +
      '      ); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: '武器名与收行同属一行',
  },
  {
    desc: 'M12525 K8 迎击奖赏·兽奸要求拆回多条（#622：兽名又占一行）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: "    await era.printAndWait(\n      `「我呢，想要和` +\n        (gohoubi == 1 ? `犬` : gohoubi == 2 ? `猪` : gohoubi == 3 ? `马` : '') +\n        `交尾的那种${heart(1)}」`,\n    );",
    replace:
      '    await era.print(`「我呢，想要和`); // 变异：拆回\n' +
      '    if (gohoubi == 1) {\n' +
      '      await era.print(`犬`); // 变异：拆回\n' +
      '    } else if (gohoubi == 2) {\n' +
      '      await era.print(`猪`); // 变异：拆回\n' +
      '    } else if (gohoubi == 3) {\n' +
      '      await era.print(`马`); // 变异：拆回\n' +
      '    }\n' +
      '    await era.printAndWait(`交尾的那种${heart(1)}」`); // 变异：拆回',
    tests: ['kojo-k8-spade'],
    must_mention: '兽奸三档只换中间那个兽名',
  },
  // —— #622：口上剩余拆行第 B 组（kojo-k1-confident.js 20 处「同一行输出被拆」的
  // 合并点，各配一条「拆回多条」变异；M12526-M12545。整行文本断言见
  // test/kojo-k1-confident.test.js 同名用例） ——
  {
    desc: 'M12526 K1 交谈·初めて·视频自我介绍拆回三条（#622：SIF 段又占一行）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: "            // + 收行的 PRINTFORML（#622）。SIF 条件提到语句外当条件、文本留在语句里\n            const masturbation = era.get(`abl:${target}:31`) >= 3;\n            await era.print(\n              `于是${target_name}将自己的本名、至今为止的性体验` +\n                (masturbation ? `以及自慰时意淫的内容` : '') +\n                `津津有味的说了起来……`,\n            );",
    replace:
      '            // + 收行的 PRINTFORML（#622）。SIF 条件提到语句外当条件、文本留在语句里\n            const masturbation = era.get(`abl:${target}:31`) >= 3;\n            await era.print(`于是${target_name}将自己的本名、至今为止的性体验`); // 变异：拆回\n            if (masturbation) {\n              await era.print(`以及自慰时意淫的内容`); // 变异：拆回\n            }\n            await era.print(`津津有味的说了起来……`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: '交谈·初めて·视频·TALENT:89（RAND:3==0）：同属一行',
  },
  {
    desc: 'M12527 K1 交谈·初めて·无摄像·求爱档拆回两条（#622：%SAVESTR:PLAYER% 又占一行）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '            await era.print(\n              `一边与${player_name}说着情话、${target_name}一边扭动着腰。`,\n            );',
    replace:
      '            await era.print(`一边与${player_name}`); // 变异：拆回\n' +
      '            await era.print(`说着情话、${target_name}一边扭动着腰。`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: '是一行',
  },
  {
    desc: 'M12528 K1 交谈·初めて·无摄像·装备档拆回多条（#622：快乐/痛苦又各占一行）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: "            await era.print(\n              chat_prefix +\n                `聊天、${target_name}一边发出着` +\n                (equip_pleasure ? `快乐的` : equip_pain ? `痛苦的` : '') +\n                `声音、一边拼命地回应着${player_name}。`,\n            );",
    replace:
      '            await era.print(\n' +
      '              chat_prefix + `聊天、${target_name}一边发出着`,\n' +
      '            ); // 变异：拆回\n' +
      '            if (equip_pleasure) {\n' +
      '              await era.print(`快乐的`); // 变异：拆回\n' +
      '            } else if (equip_pain) {\n' +
      '              await era.print(`痛苦的`); // 变异：拆回\n' +
      '            }\n' +
      '            await era.print(`声音、一边拼命地回应着${player_name}。`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: '是一行',
  },
  {
    desc: 'M12529 K1 交谈·二回目·视频自我介绍拆回三条（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: "            // 与上一段同型（#622）\n            const masturbation = era.get(`abl:${target}:31`) >= 3;\n            await era.print(\n              `于是${target_name}将自己的本名、至今为止的性体验` +\n                (masturbation ? `以及自慰时意淫的内容` : '') +\n                `津津有味的说了起来……`,\n            );",
    replace:
      '            // 与上一段同型（#622）\n            const masturbation = era.get(`abl:${target}:31`) >= 3;\n            await era.print(`于是${target_name}将自己的本名、至今为止的性体验`); // 变异：拆回\n            if (masturbation) {\n              await era.print(`以及自慰时意淫的内容`); // 变异：拆回\n            }\n            await era.print(`津津有味的说了起来……`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: '交谈·二回目·视频·TALENT:89（RAND:3==0）：同属一行',
  },
  {
    desc: 'M12530 K1 交谈·二回目·无摄像·求爱档拆回两条（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '            await era.print(\n              `${player_name}让${target_name}一边扭动着腰一边与${player_name}说着情话。`,\n            );',
    replace:
      '            await era.print(`${player_name}让`); // 变异：拆回\n' +
      '            await era.print(\n' +
      '              `${target_name}一边扭动着腰一边与${player_name}说着情话。`,\n' +
      '            ); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: '是一行',
  },
  {
    desc: 'M12531 K1 交谈·二回目·无摄像·装备档拆回多条（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: "            await era.print(\n              chat_prefix +\n                `${target_name}一边发出着` +\n                (equip_pleasure ? `快乐的` : equip_pain ? `痛苦的` : '') +\n                `声音、一边拼命地回应着${player_name}。`,\n            );",
    replace:
      '            await era.print(\n' +
      '              chat_prefix + `${target_name}一边发出着`,\n' +
      '            ); // 变异：拆回\n' +
      '            if (equip_pleasure) {\n' +
      '              await era.print(`快乐的`); // 变异：拆回\n' +
      '            } else if (equip_pain) {\n' +
      '              await era.print(`痛苦的`); // 变异：拆回\n' +
      '            }\n' +
      '            await era.print(`声音、一边拼命地回应着${player_name}。`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: '是一行',
  },
  {
    desc: 'M12532 K1 兽奸会話·初めて·牝犬自我介绍拆回三条（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '          await era.printAndWait(\n            `「现在是优秀的` +\n              (chara(target).chara.结婚对象 === 900 ? `狗的妻子` : `母狗`) +\n              `！快乐的作为家畜生活着${heart(1)}」`,\n          );',
    replace:
      '          await era.print(`「现在是优秀的`); // 变异：拆回\n' +
      '          if (chara(target).chara.结婚对象 === 900) {\n' +
      '            await era.print(`狗的妻子`); // 变异：拆回\n' +
      '          } else {\n' +
      '            await era.print(`母狗`); // 变异：拆回\n' +
      '          }\n' +
      '          await era.printAndWait(`！快乐的作为家畜生活着${heart(1)}」`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: 'DOG 兽奸会話·初めて·视频·牝犬：两段各是一行',
  },
  {
    desc: 'M12533 K1 兽奸会話·初めて·牝犬的「在最后」拆回多条（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '          await era.printAndWait(\n            `「在最后` +\n              (former_life === 1\n                ? `同班同学的大家`\n                : former_life === 2\n                  ? `修道院的大家`\n                  : former_life === 15 || former_life === 18\n                    ? `在${sc()}的店里消费过的客人`\n                    : former_life === 19\n                      ? `部下的大家`\n                      : former_life === 21\n                        ? `最重要的你`\n                        : `爸爸、妈妈`) +\n              `、我成为了这样的变态母狗……对不起啊${heart(1)}」`,\n          );\n        } else if (era.get(`talent:${target}:76`) === 1) {',
    replace:
      '          await era.print(`「在最后`); // 变异：拆回\n          if (former_life === 1) {\n            await era.print(`同班同学的大家`); // 变异：拆回\n          } else if (former_life === 2) {\n            await era.print(`修道院的大家`); // 变异：拆回\n          } else if (former_life === 15 || former_life === 18) {\n            await era.print(`${sc()}的店里消费过的客人`); // 变异：拆回\n          } else if (former_life === 19) {\n            await era.print(`部下的大家`); // 变异：拆回\n          } else if (former_life === 21) {\n            await era.print(`最重要的你`); // 变异：拆回\n          } else {\n            await era.print(`爸爸、妈妈`); // 变异：拆回\n          }\n          await era.printAndWait(\n            `、我成为了这样的变态母狗……对不起啊${heart(1)}」`,\n          ); // 变异：拆回\n        } else if (era.get(`talent:${target}:76`) === 1) {',
    tests: ['kojo-k1-confident'],
    must_mention: 'DOG 兽奸会話·初めて·视频·牝犬：两段各是一行',
  },
  {
    desc: 'M12534 K1 兽奸会話·二回目·牝犬自我介绍拆回三条（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '          await era.printAndWait(\n            `「现在是优秀的` +\n              (chara(target).chara.结婚对象 === 900 ? `狗的妻子` : `母狗`) +\n              `、快乐的作为家畜生活着${heart(1)}」`,\n          );',
    replace:
      '          await era.print(`「现在是优秀的`); // 变异：拆回\n' +
      '          if (chara(target).chara.结婚对象 === 900) {\n' +
      '            await era.print(`狗的妻子`); // 变异：拆回\n' +
      '          } else {\n' +
      '            await era.print(`母狗`); // 变异：拆回\n' +
      '          }\n' +
      '          await era.printAndWait(`、快乐的作为家畜生活着${heart(1)}」`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: 'DOG 兽奸会話·二回目·视频·牝犬：两段各是一行',
  },
  {
    desc: 'M12535 K1 兽奸会話·二回目·牝犬的「在最后」拆回多条（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '          await era.printAndWait(\n            `「在最后` +\n              (former_life === 1\n                ? `同班同学的大家`\n                : former_life === 2\n                  ? `修道院的大家`\n                  : former_life === 15 || former_life === 18\n                    ? `在${sc()}的店里消费过的客人`\n                    : former_life === 19\n                      ? `部下的大家`\n                      : former_life === 21\n                        ? `最重要的你`\n                        : `爸爸、妈妈`) +\n              `、我成为了这样的变态母狗……对不起啊${heart(1)}」`,\n          );\n          // CFLAG:357  = 5（变量语义：CFLAG 族，357）',
    replace:
      '          await era.print(`「在最后`); // 变异：拆回\n          if (former_life === 1) {\n            await era.print(`同班同学的大家`); // 变异：拆回\n          } else if (former_life === 2) {\n            await era.print(`修道院的大家`); // 变异：拆回\n          } else if (former_life === 15 || former_life === 18) {\n            await era.print(`${sc()}的店里消费过的客人`); // 变异：拆回\n          } else if (former_life === 19) {\n            await era.print(`部下的大家`); // 变异：拆回\n          } else if (former_life === 21) {\n            await era.print(`最重要的你`); // 变异：拆回\n          } else {\n            await era.print(`爸爸、妈妈`); // 变异：拆回\n          }\n          await era.printAndWait(\n            `、我成为了这样的变态母狗……对不起啊${heart(1)}」`,\n          ); // 变异：拆回\n          // CFLAG:357  = 5（变量语义：CFLAG 族，357）',
    tests: ['kojo-k1-confident'],
    must_mention: 'DOG 兽奸会話·二回目·视频·牝犬：两段各是一行',
  },
  {
    desc: 'M12536 K1 兽奸会話·初めて·淫乱自我介绍拆回三条（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: "          // + 收行的 PRINTFORML（#622）。SIF 条件提到语句外当条件、文本留在语句里\n          const masturbation = era.get(`abl:${target}:31`) >= 3;\n          await era.print(\n            `${target_name}说出了自己的本名和至今为止关于性的体验` +\n              (masturbation ? `、更说出了在自慰的时候意淫的内容、` : '') +\n              `高兴地开始津津有味的说了起来……`,\n          );",
    replace:
      '          // + 收行的 PRINTFORML（#622）。SIF 条件提到语句外当条件、文本留在语句里\n          const masturbation = era.get(`abl:${target}:31`) >= 3;\n          await era.print(`${target_name}说出了自己的本名和至今为止关于性的体验`); // 变异：拆回\n          if (masturbation) {\n            await era.print(`、更说出了在自慰的时候意淫的内容、`); // 变异：拆回\n          }\n          await era.print(`高兴地开始津津有味的说了起来……`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: '兽奸会話·初めて·视频·淫乱：同属一行',
  },
  {
    desc: 'M12537 K1 兽奸会話·初めて·爱慕自我介绍拆回三条（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: "          await era.print(\n            `${target_name}说出了自己的本名和至今为止关于性的体验` +\n              (masturbation ? `、更说出了在自慰的时候意淫的内容、` : '') +\n              `开始高兴地讲着……`,\n          );",
    replace:
      '          await era.print(`${target_name}说出了自己的本名和至今为止关于性的体验`); // 变异：拆回\n' +
      '          if (masturbation) {\n' +
      '            await era.print(`、更说出了在自慰的时候意淫的内容、`); // 变异：拆回\n' +
      '          }\n' +
      '          await era.print(`开始高兴地讲着……`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: '是一行',
  },
  {
    desc: 'M12538 K1 兽奸会話·二回目·淫乱自我介绍拆回三条（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: "          await era.print(\n            `${target_name}说出了自己的本名和至今为止关于性的体验` +\n              (masturbation ? `、更说出了在自慰的时候意淫的内容、` : '') +\n              `高兴地开始津津有味的说了起来……`,\n          );\n          await era.print(\n            `只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……`,\n          );\n          // CFLAG:357  = 4（变量语义：CFLAG 族，357）",
    replace:
      '          await era.print(`${target_name}说出了自己的本名和至今为止关于性的体验`); // 变异：拆回\n          if (masturbation) {\n            await era.print(`、更说出了在自慰的时候意淫的内容、`); // 变异：拆回\n          }\n          await era.print(`高兴地开始津津有味的说了起来……`); // 变异：拆回\n          await era.print(\n            `只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……`,\n          );\n          // CFLAG:357  = 4（变量语义：CFLAG 族，357）',
    tests: ['kojo-k1-confident'],
    must_mention: '是一行',
  },
  {
    desc: 'M12539 K1 兽奸会話·二回目·爱慕自我介绍拆回三条（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: "          await era.print(\n            `${target_name}说出了自己的本名和至今为止关于性的体验` +\n              (masturbation ? `、更说出了在自慰的时候意淫的内容、` : '') +\n              `高兴地开始津津有味的说了起来……`,\n          );\n          await era.print(\n            `只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……`,\n          );\n          // CFLAG:357  = 3（变量语义：CFLAG 族，357）",
    replace:
      '          await era.print(`${target_name}说出了自己的本名和至今为止关于性的体验`); // 变异：拆回\n          if (masturbation) {\n            await era.print(`、更说出了在自慰的时候意淫的内容、`); // 变异：拆回\n          }\n          await era.print(`高兴地开始津津有味的说了起来……`); // 变异：拆回\n          await era.print(\n            `只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……`,\n          );\n          // CFLAG:357  = 3（变量语义：CFLAG 族，357）',
    tests: ['kojo-k1-confident'],
    must_mention: '是一行',
  },
  {
    desc: 'M12540 K1 妊娠発覚 1回目·牝犬野良犬拆回两条（#622：名字又占一行）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '          // 各支自带收行，前缀在分支外取值；首支那句把整行写在一起\n          const dog_name_prefix = `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…`;\n          if (rand_n(9) === 0) {\n            await era.printAndWait(\n              `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…波奇？」`,\n            );',
    replace:
      '          // 各支自带收行，前缀在分支外取值；首支那句把整行写在一起\n          const dog_name_prefix = `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…`;\n          await era.print(\n            `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…`,\n          ); // 变异：拆回\n          if (rand_n(9) === 0) {\n            await era.printAndWait(`波奇？」`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: '是一行',
  },
  {
    desc: 'M12541 K1 妊娠発覚 2回目以降·牝犬野良犬拆回两条（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '          // 无后缀 PRINTFORM 前缀，与下面 IF 链首支的收行同属一行（#622）。\n          // 各支自带收行，前缀在分支外取值；首支那句把整行写在一起\n          const dog_name_prefix = `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…`;\n          if (rand_n(9) === 0) {\n            await era.printAndWait(\n              `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…波奇？」`,\n            );',
    replace:
      '          // 无后缀 PRINTFORM 前缀，与前面同型（#622）\n          const dog_name_prefix = `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…`;\n          await era.print(\n            `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…`,\n          ); // 变异：拆回\n          if (rand_n(9) === 0) {\n            await era.printAndWait(`波奇？」`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: '是一行',
  },
  {
    desc: 'M12542 K1 死斗场·SC31 口交拆回多条（#622：部位词又各占一行）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: "      await era.printAndWait(\n        `${assi_name}因为` +\n          (assi_has_penis ? `真正的小鸡鸡` : '') +\n          (assi_has_strap ? `假阳具` : '') +\n          `被${target_name}含了进去而露出了心旷神怡的表情……`,\n      );",
    replace:
      '      await era.print(`${assi_name}因为`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`真正的小鸡鸡`); // 变异：拆回\n' +
      '      }\n' +
      '      if (assi_has_strap) {\n' +
      '        await era.print(`假阳具`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`被${target_name}含了进去而露出了心旷神怡的表情……`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: '是一行',
  },
  {
    desc: 'M12543 K1 死斗场·SC21 背后位拆回多条（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: "      await era.printAndWait(\n        `${assi_name}一边听着悲鸣一边用` +\n          (assi_has_penis ? `真正的小鸡鸡` : '') +\n          (assi_has_strap ? `假阳具` : '') +\n          `毫不留情的继续蹂躏${target_name}的阴道……`,\n      );",
    replace:
      '      await era.print(`${assi_name}一边听着悲鸣一边用`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`真正的小鸡鸡`); // 变异：拆回\n' +
      '      }\n' +
      '      if (assi_has_strap) {\n' +
      '        await era.print(`假阳具`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`毫不留情的继续蹂躏${target_name}的阴道……`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: '是一行',
  },
  {
    desc: 'M12544 K1 死斗场·SC27 背后位アナル拆回多条（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: "      await era.printAndWait(\n        `${assi_name}一边听着悲鸣一边用` +\n          (assi_has_penis ? `真正的小鸡鸡` : '') +\n          (assi_has_strap ? `假阳具` : '') +\n          `毫不留情的继续蹂躏${target_name}的肛门……`,\n      );",
    replace:
      '      await era.print(`${assi_name}一边听着悲鸣一边用`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`真正的小鸡鸡`); // 变异：拆回\n' +
      '      }\n' +
      '      if (assi_has_strap) {\n' +
      '        await era.print(`假阳具`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`毫不留情的继续蹂躏${target_name}的肛门……`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: '是一行',
  },
  {
    desc: 'M12545 K1 迎击奖赏·兽奸要求拆回多条（#622：兽名又占一行）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: "    await era.printAndWait(\n      `「胜利之后、想要和` +\n        (reward === 1 ? `狗` : reward === 2 ? `猪` : reward === 3 ? `马` : '') +\n        `交尾」`,\n    );",
    replace:
      '    await era.print(`「胜利之后、想要和`); // 变异：拆回\n' +
      '    if (reward === 1) {\n' +
      '      await era.print(`狗`); // 变异：拆回\n' +
      '    } else if (reward === 2) {\n' +
      '      await era.print(`猪`); // 变异：拆回\n' +
      '    } else if (reward === 3) {\n' +
      '      await era.print(`马`); // 变异：拆回\n' +
      '    }\n' +
      '    await era.printAndWait(`交尾」`); // 变异：拆回',
    tests: ['kojo-k1-confident'],
    must_mention: ':8075..:8083 是一行',
  },
  // —— #622：口上剩余拆行第 B 组（kojo-k10-club.js 11 处「同一行输出被拆」的
  // 合并点，各配一条「拆回多条」变异；M12546-M12556。整行文本断言见
  // test/kojo-k10-club.test.js 同名用例） ——
  {
    desc: 'M12546 K10 肛门爱抚二回目拆回两条（#622：首支台词又占一行）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '          await era.printAndWait(\n            `「啊嗯～、啊啊～${heart(1)} 更多的…摸那里…伸、伸进去…${heart(1)}」`,\n          );',
    replace:
      '          await era.print(`「啊嗯～、啊啊～`); // 变异：拆回\n' +
      '          await era.printAndWait(\n' +
      '            `${heart(1)} 更多的…摸那里…伸、伸进去…${heart(1)}」`,\n' +
      '          ); // 变异：拆回',
    tests: ['kojo-k10-club'],
    must_mention: '二回目·淫乱·TEQUIP:13：两段是一行',
  },
  {
    desc: 'M12547 K10 交谈·初めて·视频自我介绍拆回三条（#622：SIF 段又占一行）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: "          await era.print(\n            `${target_name}将自己的本名、至今为止的性经验` +\n              (masturbation ? `甚至自慰时想的什么` : '') +\n              `都微笑地讲了出来……`,\n          );",
    replace:
      '          await era.print(`${target_name}将自己的本名、至今为止的性经验`); // 变异：拆回\n' +
      '          if (masturbation) {\n' +
      '            await era.print(`甚至自慰时想的什么`); // 变异：拆回\n' +
      '          }\n' +
      '          await era.print(`都微笑地讲了出来……`); // 变异：拆回',
    tests: ['kojo-k10-club'],
    must_mention: '初めて·视频·TALENT:89：三段是一行',
  },
  {
    desc: 'M12548 K10 交谈·初めて·无摄像·求爱档拆回两条（#622：前缀又占一行）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '          await era.print(\n            `在和${player_name}会话的过程中，${target_name}扭动着腰呢喃着充满爱意的话语。`,\n          );',
    replace:
      '          await era.print(`在和${player_name}`); // 变异：拆回\n' +
      '          await era.print(\n' +
      '            `会话的过程中，${target_name}扭动着腰呢喃着充满爱意的话语。`,\n' +
      '          ); // 变异：拆回',
    tests: ['kojo-k10-club'],
    must_mention: '初めて·无摄像·求爱档：两段是一行',
  },
  {
    desc: 'M12549 K10 交谈·初めて·无摄像·装备档拆回多条（#622：语调词又占一行）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: "          // PRINT（互斥两支）+ 收行的 PRINTFORML（#622）\n          await era.print(\n            chat_prefix +\n              `会话的过程中，${target_name}` +\n              (equip_pleasure\n                ? `带着快乐的语调`\n                : equip_pain\n                  ? `带着痛苦的语调`\n                  : '') +\n              `拼命地回应着。`,\n          );",
    replace:
      '          // PRINT（互斥两支）+ 收行的 PRINTFORML（#622）\n          await era.print(\n            chat_prefix + `会话的过程中，${target_name}`,\n          ); // 变异：拆回\n          if (equip_pleasure) {\n            await era.print(`带着快乐的语调`); // 变异：拆回\n          } else if (equip_pain) {\n            await era.print(`带着痛苦的语调`); // 变异：拆回\n          }\n          await era.print(`拼命地回应着。`); // 变异：拆回',
    tests: ['kojo-k10-club'],
    must_mention: '初めて·无摄像·装备档：四段是一行',
  },
  {
    desc: 'M12550 K10 交谈·二回目·视频自我介绍拆回三条（#622）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: "          await era.print(\n            `${target_name}将自己的本名、至今为止的性经验` +\n              (masturbation ? `甚至手淫时想到的什么` : '') +\n              `都微笑地讲了出来……`,\n          );",
    replace:
      '          await era.print(`${target_name}将自己的本名、至今为止的性经验`); // 变异：拆回\n' +
      '          if (masturbation) {\n' +
      '            await era.print(`甚至手淫时想到的什么`); // 变异：拆回\n' +
      '          }\n' +
      '          await era.print(`都微笑地讲了出来……`); // 变异：拆回',
    tests: ['kojo-k10-club'],
    must_mention: '（RAND:3==0）：三段是一行',
  },
  {
    desc: 'M12551 K10 交谈·二回目·无摄像·求爱档拆回两条（#622）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '          await era.print(\n            `在和${master_name}会话的过程中，${target_name}扭动着腰呢喃着充满爱意的话语。`,\n          );',
    replace:
      '          await era.print(`在和${master_name}`); // 变异：拆回\n' +
      '          await era.print(\n' +
      '            `会话的过程中，${target_name}扭动着腰呢喃着充满爱意的话语。`,\n' +
      '          ); // 变异：拆回',
    tests: ['kojo-k10-club'],
    must_mention: '二回目·无摄像·求爱档：两段是一行',
  },
  {
    desc: 'M12552 K10 交谈·二回目·无摄像·装备档拆回多条（#622）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: "          // 与初回同型（#622）\n          await era.print(\n            chat_prefix +\n              `会话的过程中，${target_name}` +\n              (equip_pleasure\n                ? `带着快乐的语调`\n                : equip_pain\n                  ? `带着痛苦的语调`\n                  : '') +\n              `拼命地回应着。`,\n          );",
    replace:
      '          // 与初回同型（#622）\n          await era.print(\n            chat_prefix + `会话的过程中，${target_name}`,\n          ); // 变异：拆回\n          if (equip_pleasure) {\n            await era.print(`带着快乐的语调`); // 变异：拆回\n          } else if (equip_pain) {\n            await era.print(`带着痛苦的语调`); // 变异：拆回\n          }\n          await era.print(`拼命地回应着。`); // 变异：拆回',
    tests: ['kojo-k10-club'],
    must_mention: '二回目·无摄像·装备档：四段是一行',
  },
  {
    desc: 'M12553 K10 死斗场·SC31 口交拆回多条（#622：部位词又各占一行）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: "      await era.printAndWait(\n        `${assi_name}` +\n          (assi_has_penis ? `坚硬的雄性器` : '') +\n          (assi_has_strap ? `粗大的假阳具` : '') +\n          `让${target_name}一边舔一边露出了心旷神怡的表情……`,\n      );",
    replace:
      '      await era.print(`${assi_name}`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`坚硬的雄性器`); // 变异：拆回\n' +
      '      }\n' +
      '      if (assi_has_strap) {\n' +
      '        await era.print(`粗大的假阳具`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(\n' +
      '        `让${target_name}一边舔一边露出了心旷神怡的表情……`,\n' +
      '      ); // 变异：拆回',
    tests: ['kojo-k10-club'],
    must_mention: '同一行里拼「假阳具」',
  },
  {
    desc: 'M12554 K10 死斗场·SC21 背后位拆回多条（#622）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: "      await era.printAndWait(\n        `${assi_name}听着${target_name}的悲鸣` +\n          (assi_has_penis ? `用坚硬的雄性器` : '') +\n          (assi_has_strap ? `用粗大的假阳具` : '') +\n          `${target_name}的肛门被无慈悲的继续蹂躏着。`,\n      );\n      await era.printAndWait(\n        `${target_name}的悲鸣传到观众席，让观客们欢呼了起来………`,\n      );\n    } else if (game.train.死斗场敌种 == 206) {\n      await era.printAndWait(`「咳哦…呜噗…咔呃…咳…喀呃哦」`);",
    replace:
      '      await era.print(`${assi_name}听着${target_name}的悲鸣`); // 变异：拆回\n      if (assi_has_penis) {\n        await era.print(`用坚硬的雄性器`); // 变异：拆回\n      }\n      if (assi_has_strap) {\n        await era.print(`用粗大的假阳具`); // 变异：拆回\n      }\n      await era.printAndWait(`${target_name}的肛门被无慈悲的继续蹂躏着。`); // 变异：拆回\n      await era.printAndWait(\n        `${target_name}的悲鸣传到观众席，让观客们欢呼了起来………`,\n      );\n    } else if (game.train.死斗场敌种 == 206) {\n      await era.printAndWait(`「咳哦…呜噗…咔呃…咳…喀呃哦」`);',
    tests: ['kojo-k10-club'],
    must_mention: '同一行里拼「假阳具」',
  },
  {
    desc: 'M12555 K10 死斗场·SC27 背后位アナル拆回多条（#622）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: "      await era.printAndWait(\n        `${assi_name}听着${target_name}的悲鸣` +\n          (assi_has_penis ? `用坚硬的雄性器` : '') +\n          (assi_has_strap ? `用粗大的假阳具` : '') +\n          `${target_name}的肛门被无慈悲的继续蹂躏着。`,\n      );\n      await era.printAndWait(\n        `${target_name}的悲鸣传到观众席，让观客们欢呼了起来………`,\n      );\n    } else if (game.train.死斗场敌种 == 206) {\n      await era.printAndWait(`「啊嘎…咳…咔啊～…咕呃～…咔呃…咳咳～」`);",
    replace:
      '      await era.print(`${assi_name}听着${target_name}的悲鸣`); // 变异：拆回\n      if (assi_has_penis) {\n        await era.print(`用坚硬的雄性器`); // 变异：拆回\n      }\n      if (assi_has_strap) {\n        await era.print(`用粗大的假阳具`); // 变异：拆回\n      }\n      await era.printAndWait(`${target_name}的肛门被无慈悲的继续蹂躏着。`); // 变异：拆回\n      await era.printAndWait(\n        `${target_name}的悲鸣传到观众席，让观客们欢呼了起来………`,\n      );\n    } else if (game.train.死斗场敌种 == 206) {\n      await era.printAndWait(`「啊嘎…咳…咔啊～…咕呃～…咔呃…咳咳～」`);',
    tests: ['kojo-k10-club'],
    must_mention: '同一行里拼「假阳具」',
  },
  {
    desc: 'M12556 K10 迎击奖赏·兽奸要求拆回多条（#622：兽名又占一行）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: "    await era.printAndWait(\n      `「人家想和` +\n        (reward == 1 ? `犬` : reward == 2 ? `猪` : reward == 3 ? `马` : '') +\n        `交尾试试看♪」`,\n    );",
    replace:
      '    await era.print(`「人家想和`); // 变异：拆回\n' +
      '    if (reward == 1) {\n' +
      '      await era.print(`犬`); // 变异：拆回\n' +
      '    } else if (reward == 2) {\n' +
      '      await era.print(`猪`); // 变异：拆回\n' +
      '    } else if (reward == 3) {\n' +
      '      await era.print(`马`); // 变异：拆回\n' +
      '    }\n' +
      '    await era.printAndWait(`交尾试试看♪」`); // 变异：拆回',
    tests: ['kojo-k10-club'],
    must_mention: ':7101..:7109 是一行',
  },
  {
    desc: 'M12557 K1 交谈·二回目·无摄像·装备两档写反（快乐 ↔ 痛苦，#622：换档变异，钉档位映射）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: "            await era.print(\n              chat_prefix +\n                `${target_name}一边发出着` +\n                (equip_pleasure ? `快乐的` : equip_pain ? `痛苦的` : '') +\n                `声音、一边拼命地回应着${player_name}。`,\n            );",
    replace:
      "            await era.print(\n              chat_prefix +\n                `${target_name}一边发出着` +\n                (equip_pleasure ? `痛苦的` : equip_pain ? `快乐的` : '') +\n                `声音、一边拼命地回应着${player_name}。`,\n            ); // （变异：两档写反）",
    tests: ['kojo-k1-confident'],
    must_mention: '一边发出着痛苦的声音',
  },
  {
    desc: 'M12558 K10 交谈·二回目·无摄像·语调两档写反（快乐 ↔ 痛苦，#622：换档变异，钉档位映射）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: "          // 与初回同型（#622）\n          await era.print(\n            chat_prefix +\n              `会话的过程中，${target_name}` +\n              (equip_pleasure\n                ? `带着快乐的语调`\n                : equip_pain\n                  ? `带着痛苦的语调`\n                  : '') +\n              `拼命地回应着。`,\n          );",
    replace:
      "          // 与初回同型（#622）\n          await era.print(\n            chat_prefix +\n              `会话的过程中，${target_name}` +\n              (equip_pleasure\n                ? `带着痛苦的语调`\n                : equip_pain\n                  ? `带着快乐的语调`\n                  : '') +\n              `拼命地回应着。`,\n          ); // （变异：两档写反）",
    tests: ['kojo-k10-club'],
    must_mention: '带着痛苦的语调',
  },
  {
    desc: 'M12559 K1 妊娠発覚 1回目·狗名链第二支漏拼前缀（#622：非首支必须自己带前缀）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '          // 各支自带收行，前缀在分支外取值；首支那句把整行写在一起\n          const dog_name_prefix = `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…`;\n          if (rand_n(9) === 0) {\n            await era.printAndWait(\n              `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…波奇？」`,\n            );\n          } else if (rand_n(8) === 0) {\n            await era.printAndWait(dog_name_prefix + `哈娜？」`);',
    replace:
      '          // 各支自带收行，前缀在分支外取值；首支那句把整行写在一起\n          const dog_name_prefix = `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…`;\n          if (rand_n(9) === 0) {\n            await era.printAndWait(\n              `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…波奇？」`,\n            );\n          } else if (rand_n(8) === 0) {\n            await era.printAndWait(`哈娜？」`); // （变异：漏拼前缀）',
    tests: ['kojo-k1-confident'],
    must_mention: '非首支也带前缀（漏拼前缀会红）',
  },
  {
    desc: 'M12560 K1 妊娠発覚 2回目以降·狗名链第二支漏拼前缀（#622）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '          // 无后缀 PRINTFORM 前缀，与上一段同型（#622）\n          const dog_name_prefix = `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…`;\n          if (rand_n(9) === 0) {\n            await era.printAndWait(\n              `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…波奇？」`,\n            );\n          } else if (rand_n(8) === 0) {\n            await era.printAndWait(dog_name_prefix + `哈娜？」`);',
    replace:
      '          // 无后缀 PRINTFORM 前缀，与上一段同型（#622）\n          const dog_name_prefix = `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…`;\n          if (rand_n(9) === 0) {\n            await era.printAndWait(\n              `「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…波奇？」`,\n            );\n          } else if (rand_n(8) === 0) {\n            await era.printAndWait(`哈娜？」`); // （变异：漏拼前缀）',
    tests: ['kojo-k1-confident'],
    must_mention: '非首支也带前缀（2回目以降，漏拼前缀会红）',
  },
  // —— #621：口上剩余拆行 A 组（K6/K7 共 53 组）的「拆回多条」变异 ——
  // 每组一条：把合成后的那一条 era.print* 又拆成两条，对应测试的整行断言必须红
  // （条目按工单 #621 的组序编号 M12400-M12452）
  {
    desc: 'M12400 K6 口塞初回·淫乱拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        if (blindfold_3954) {\n          await era.print(`配合地戴上口塞的${target_name}带着期待地晃动着………`);',
    replace:
      '        if (blindfold_3954) {\n          await era.print(`配合地戴上口塞的${target_name}`); // 变异：拆回\n          await era.print(`带着期待地晃动着………`); // 变异：拆回\n\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口塞初回三档：前缀与收行段合成一条输出',
  },
  {
    desc: 'M12401 K6 口塞初回·爱慕拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '          await era.print(\n            `配合地戴上口塞的${target_name}带着温柔的眼神晃动着………`,\n          );\n',
    replace:
      '          await era.print(`配合地戴上口塞的${target_name}`); // 变异：拆回\n' +
      '          await era.print(`带着温柔的眼神晃动着………`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口塞初回三档：前缀与收行段合成一条输出',
  },
  {
    desc: 'M12402 K6 口塞初回·それ以外拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        if (blindfold_3972) {\n          await era.print(`戴上口塞的${target_name}左右摇着头………`);',
    replace:
      '        if (blindfold_3972) {\n          await era.print(`戴上口塞的${target_name}`); // 变异：拆回\n          await era.print(`左右摇着头………`); // 变异：拆回\n\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口塞初回三档：前缀与收行段合成一条输出',
  },
  {
    desc: 'M12403 K6 口塞二回目·淫乱受虐狂Lv5拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '          await era.print(`配合地戴上口塞的${target_name}粗重急促地喘息着………`);\n',
    replace:
      '          await era.print(`配合地戴上口塞的${target_name}`); // 变异：拆回\n' +
      '          await era.print(`粗重急促地喘息着………`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口塞二回目四档：前缀与收行段合成一条输出',
  },
  {
    desc: 'M12404 K6 口塞二回目·淫乱拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        if (blindfold_4001) {\n          await era.print(`配合地戴上口塞的${target_name}带着期待地晃动着………`);',
    replace:
      '        if (blindfold_4001) {\n          await era.print(`配合地戴上口塞的${target_name}`); // 变异：拆回\n          await era.print(`带着期待地晃动着………`); // 变异：拆回\n\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口塞二回目四档：前缀与收行段合成一条输出',
  },
  {
    desc: 'M12405 K6 口塞二回目·受虐狂Lv3拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '          await era.print(`${target_name}习以为常地被口塞塞住嘴眼色朦胧………`);\n',
    replace:
      '          await era.print(`${target_name}习以`); // 变异：拆回\n' +
      '          await era.print(`为常地被口塞塞住嘴眼色朦胧………`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口塞二回目四档：前缀与收行段合成一条输出',
  },
  {
    desc: 'M12406 K6 口塞二回目·それ以外拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        if (blindfold_4036) {\n          await era.print(`戴上口塞的${target_name}左右摇着头………`);',
    replace:
      '        if (blindfold_4036) {\n          await era.print(`戴上口塞的${target_name}`); // 变异：拆回\n          await era.print(`左右摇着头………`); // 变异：拆回\n\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口塞二回目四档：前缀与收行段合成一条输出',
  },
  {
    desc: 'M12407 K6 交谈初回·爱意拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '          await era.print(\n            `在和${player_name}会话的过程中，${target_name}呢喃着充满爱意的话语。`,\n          );\n',
    replace:
      '          await era.print(`在和${player_name}会话的过程中，`); // 变异：拆回\n' +
      '          await era.print(`${target_name}呢喃着充满爱意的话语。`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention:
      '#621 交谈・通常会話七支：前缀与各支收行段合成一条输出（初回与二回目两组）',
  },
  {
    desc: 'M12408 K6 交谈二回目·爱意拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '          await era.print(\n            `在和${player_name}会话的过程中，${target_name}呢喃着充满爱意的话语`,\n          );\n',
    replace:
      '          await era.print(`在和${player_name}会话的过程中，`); // 变异：拆回\n' +
      '          await era.print(`${target_name}呢喃着充满爱意的话语`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention:
      '#621 交谈・通常会話七支：前缀与各支收行段合成一条输出（初回与二回目两组）',
  },
  {
    desc: 'M12409 K6 口交时自慰初回·淫乱拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '          await era.print(\n            `${target_name}含住${player_name}的阴茎显得十分兴奋，用手摆弄着插入私处和肛门的蠕虫，激烈地抽插着……`,\n          );\n',
    replace:
      '          await era.print(`${target_name}含住${player_name}的阴`); // 变异：拆回\n' +
      '          await era.print(`茎显得十分兴奋，用手摆弄着插入私处和肛门的蠕虫，激烈地抽插着……`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口交时自慰八组：前缀与各支收行段合成一条输出',
  },
  {
    desc: 'M12410 K6 口交时自慰初回·爱慕拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '          await era.print(\n            `${target_name}用舌头纠缠着${player_name}的阴茎，两穴里的蠕虫蠕动着，自慰激烈地继续………`,\n          );\n',
    replace:
      '          await era.print(`${target_name}用舌头纠缠着${player_name}`); // 变异：拆回\n' +
      '          await era.print(`的阴茎，两穴里的蠕虫蠕动着，自慰激烈地继续………`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口交时自慰八组：前缀与各支收行段合成一条输出',
  },
  {
    desc: 'M12411 K6 口交时自慰初回·侍奉Lv3拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        const serve_front_4620 = `${target_name}被命令用口服侍${player_name}的阴茎，`;\n        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {\n          await era.print(\n            `${target_name}被命令用口服侍${player_name}的阴茎，两穴里的蠕虫蠕动着，自慰仍在继续………`,\n          );',
    replace:
      '        const serve_front_4620 = `${target_name}被命令用口服侍${player_name}的阴茎，`;\n        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {\n          await era.print(`${target_name}被命令用口服侍${player_name}`); // 变异：拆回\n          await era.print(`的阴茎，两穴里的蠕虫蠕动着，自慰仍在继续………`); // 变异：拆回\n\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口交时自慰八组：前缀与各支收行段合成一条输出',
  },
  {
    desc: 'M12412 K6 口交时自慰初回·それ以外拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        const serve_front_4633 = `${target_name}被命令用口服侍${player_name}的阴茎，`;\n        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {\n          await era.print(\n            `${target_name}被命令用口服侍${player_name}的阴茎，两穴里的蠕虫蠕动着，自慰仍在继续………`,\n          );',
    replace:
      '        const serve_front_4633 = `${target_name}被命令用口服侍${player_name}的阴茎，`;\n        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {\n          await era.print(`${target_name}被命令用口服侍${player_name}`); // 变异：拆回\n          await era.print(`的阴茎，两穴里的蠕虫蠕动着，自慰仍在继续………`); // 变异：拆回\n\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口交时自慰八组：前缀与各支收行段合成一条输出',
  },
  {
    desc: 'M12413 K6 口交时自慰二回目·淫乱拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '          await era.print(\n            `${target_name}含住${player_name}的阴茎显得十分兴奋，两穴里的蠕虫蠕动着蠕动着，自慰激烈地继续………`,\n          );\n',
    replace:
      '          await era.print(`${target_name}含住${player_name}的`); // 变异：拆回\n' +
      '          await era.print(`阴茎显得十分兴奋，两穴里的蠕虫蠕动着蠕动着，自慰激烈地继续………`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口交时自慰八组：前缀与各支收行段合成一条输出',
  },
  {
    desc: 'M12414 K6 口交时自慰二回目·爱慕拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '          await era.print(\n            `${target_name}用舌头纠缠着${player_name}的阴茎，任两穴里的蠕虫蠕动着，摇动着纤腰………`,\n          );\n',
    replace:
      '          await era.print(`${target_name}用舌头纠缠着${player_name}`); // 变异：拆回\n' +
      '          await era.print(`的阴茎，任两穴里的蠕虫蠕动着，摇动着纤腰………`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口交时自慰八组：前缀与各支收行段合成一条输出',
  },
  {
    desc: 'M12415 K6 口交时自慰二回目·侍奉Lv3拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        const serve_front_4683 = `${target_name}被命令用口服侍${player_name}的阴茎，`;\n        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {\n          await era.print(\n            `${target_name}被命令用口服侍${player_name}的阴茎，两穴里的蠕虫蠕动着，自慰激烈地继续………`,\n          );',
    replace:
      '        const serve_front_4683 = `${target_name}被命令用口服侍${player_name}的阴茎，`;\n        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {\n          await era.print(`${target_name}被命令用口服侍${player_name}`); // 变异：拆回\n          await era.print(`的阴茎，两穴里的蠕虫蠕动着，自慰激烈地继续………`); // 变异：拆回\n\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口交时自慰八组：前缀与各支收行段合成一条输出',
  },
  {
    desc: 'M12416 K6 口交时自慰二回目·それ以外拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        const serve_front_4699 = `${target_name}被命令用口服侍${player_name}的阴茎，`;\n        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {\n          await era.print(\n            `${target_name}被命令用口服侍${player_name}的阴茎，两穴里的蠕虫蠕动着，自慰激烈地继续………`,\n          );',
    replace:
      '        const serve_front_4699 = `${target_name}被命令用口服侍${player_name}的阴茎，`;\n        if (era.get(`tequip:${target}:11`) && era.get(`tequip:${target}:13`)) {\n          await era.print(`${target_name}被命令用口服侍${player_name}`); // 变异：拆回\n          await era.print(`的阴茎，两穴里的蠕虫蠕动着，自慰激烈地继续………`); // 变异：拆回\n\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 口交时自慰八组：前缀与各支收行段合成一条输出',
  },
  {
    desc: 'M12417 K6 百合PLAY·爱慕拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        await era.printAndWait(\n          `${assi_name}苦笑着和${target_name}以女人间特有的方式纠缠在一起，直到黄昏………`,\n        );\n',
    replace:
      '        await era.printAndWait(`${assi_name}苦笑着和${target_name}`); // 变异：拆回\n' +
      '        await era.printAndWait(`以女人间特有的方式纠缠在一起，直到黄昏………`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention:
      '#621 百合PLAY 两处：前缀与「直到黄昏/夜幕渐深」合成一条输出（爱慕与百合中毒两组）',
  },
  {
    desc: 'M12418 K6 百合PLAY·百合中毒Lv3拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '        await era.printAndWait(\n          `尝到百合滋味的${target_name}嬉笑着和${assi_name}纠缠着，直到黄昏………`,\n        );\n',
    replace:
      '        await era.printAndWait(`尝到百合滋味的${target_name}嬉笑着`); // 变异：拆回\n' +
      '        await era.printAndWait(`和${assi_name}纠缠着，直到黄昏………`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention:
      '#621 百合PLAY 两处：前缀与「直到黄昏/夜幕渐深」合成一条输出（爱慕与百合中毒两组）',
  },
  {
    desc: 'M12419 K6 录像自我介绍初回（SIF ABL:31）拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: "          await era.print(\n            `面带微笑的${target_name}介绍了自己的本名和性经验` +\n              (dirty_exp ? `，甚至还有手淫的时候想到的内容` : '') +\n              `……`,\n          );\n",
    replace:
      '          await era.print(`面带微笑的${target_name}介绍了自己的本名和性经验`); // 变异：拆回\n' +
      "          await era.print((dirty_exp ? `，甚至还有手淫的时候想到的内容` : '') +\n" +
      '              `……`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention:
      '#621 录像自我介绍（SIF ABL:31）：前缀与收行段合成一条输出（初回与二回目两组）',
  },
  {
    desc: 'M12420 K6 录像自我介绍二回目（SIF ABL:31）拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: "          await era.print(\n            `${target_name}面带微笑地介绍了自己的本名和性经验` +\n              (dirty_exp_4384 ? `，甚至还有手淫的时候想到的内容` : '') +\n              `……`,\n          );\n",
    replace:
      '          await era.print(`${target_name}面带微笑地介绍了自己的本名和性经验`); // 变异：拆回\n' +
      "          await era.print((dirty_exp_4384 ? `，甚至还有手淫的时候想到的内容` : '') +\n" +
      '              `……`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention:
      '#621 录像自我介绍（SIF ABL:31）：前缀与收行段合成一条输出（初回与二回目两组）',
  },
  {
    desc: 'M12421 K6 死斗场口交（助手性器两档）拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: "      await era.printAndWait(\n        `${assi_name}将` +\n          (assi_has_penis_7493 ? `阴茎` : '') +\n          (assi_dildo_7495 ? `假阳具` : '') +\n          `塞入${target_name}的口中。她吞吐着，脸上带有几分愉悦的表情……`,\n      );\n",
    replace:
      "      await era.printAndWait(`${assi_name}将`); // 变异：拆回\n      await era.printAndWait((assi_has_penis_7493 ? `阴茎` : '') +\n          (assi_dildo_7495 ? `假阳具` : '') +\n          `塞入${target_name}的口中。她吞吐着，脸上带有几分愉悦的表情……`); // 变异：拆回\n",
    tests: ['kojo-k6-wicked'],
    must_mention:
      'COLOSSEUM_KOJO_6：SC31/21/27 助手无 121/122 且持假阳具（item:4）→ 整行含「假阳具」',
  },
  {
    desc: 'M12422 K6 死斗场后背位（助手性器两档）拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: "      await era.printAndWait(\n        `${assi_name}边听着惨叫边用` +\n          (assi_has_penis_7526 ? `阴茎` : '') +\n          (assi_dildo_7528 ? `假阳具` : '') +\n          `毫不留情地蹂躏着${target_name}的阴道……`,\n      );\n",
    replace:
      "      await era.printAndWait(`${assi_name}边听着惨叫边用`); // 变异：拆回\n      await era.printAndWait((assi_has_penis_7526 ? `阴茎` : '') +\n          (assi_dildo_7528 ? `假阳具` : '') +\n          `毫不留情地蹂躏着${target_name}的阴道……`); // 变异：拆回\n",
    tests: ['kojo-k6-wicked'],
    must_mention:
      'COLOSSEUM_KOJO_6：SC31/21/27 助手无 121/122 且持假阳具（item:4）→ 整行含「假阳具」',
  },
  {
    desc: 'M12423 K6 死斗场后背位アナル（助手性器两档）拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: "      await era.printAndWait(\n        `${assi_name}边听着惨叫边用` +\n          (assi_has_penis_7550 ? `阴茎` : '') +\n          (assi_dildo_7552 ? `假阳具` : '') +\n          `蹂躏着${target_name}那鲜嫩的肛门……`,\n      );\n",
    replace:
      "      await era.printAndWait(`${assi_name}边听着惨叫边用`); // 变异：拆回\n      await era.printAndWait((assi_has_penis_7550 ? `阴茎` : '') +\n          (assi_dildo_7552 ? `假阳具` : '') +\n          `蹂躏着${target_name}那鲜嫩的肛门……`); // 变异：拆回\n",
    tests: ['kojo-k6-wicked'],
    must_mention:
      'COLOSSEUM_KOJO_6：SC31/21/27 助手无 121/122 且持假阳具（item:4）→ 整行含「假阳具」',
  },
  {
    desc: 'M12424 K6 交谈初回·语调三档拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: "          await era.print(\n            talk_front_4342 +\n              `会话的过程中，${target_name}` +\n              (excited_4349\n                ? `带着快乐的语调`\n                : painful_4351\n                  ? `带着痛苦的语调`\n                  : '') +\n              `拼命地回应着。`,\n          );\n",
    replace:
      '          await era.print(talk_front_4342); // 变异：拆回\n' +
      '          await era.print(`会话的过程中，${target_name}` +\n' +
      '              (excited_4349\n' +
      '                ? `带着快乐的语调`\n' +
      '                : painful_4351\n' +
      '                  ? `带着痛苦的语调`\n' +
      "                  : '') +\n" +
      '              `拼命地回应着。`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention:
      '#621 交谈・通常会話七支：前缀与各支收行段合成一条输出（初回与二回目两组）',
  },
  {
    desc: 'M12425 K6 交谈二回目·语调三档拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: "          await era.print(\n            talk_front_4414 +\n              `会话的过程中，${target_name}` +\n              (excited_4421\n                ? `带着快乐的语调`\n                : painful_4423\n                  ? `带着痛苦的语调`\n                  : '') +\n              `拼命地回应着。`,\n          );\n",
    replace:
      '          await era.print(talk_front_4414); // 变异：拆回\n' +
      '          await era.print(`会话的过程中，${target_name}` +\n' +
      '              (excited_4421\n' +
      '                ? `带着快乐的语调`\n' +
      '                : painful_4423\n' +
      '                  ? `带着痛苦的语调`\n' +
      "                  : '') +\n" +
      '              `拼命地回应着。`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention:
      '#621 交谈・通常会話七支：前缀与各支收行段合成一条输出（初回与二回目两组）',
  },
  {
    desc: 'M12426 K6 迎击奖励请求·动物名三档拆回多条（#621）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: '    await era.printAndWait(request_animal_7812 + `性交啦♪」`);\n',
    replace:
      '    await era.printAndWait(request_animal_7812); // 变异：拆回\n' +
      '    await era.printAndWait(`性交啦♪」`); // 变异：拆回\n',
    tests: ['kojo-k6-wicked'],
    must_mention: '#621 迎击奖励请求：动物名与收行段合成一条输出',
  },
  {
    desc: 'M12427 K7 屈服刻印Lv3·靠近分档拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '      await era.printAndWait(\n        `${player_name}慢慢的靠近了${target_name}抓过她的金发嗅着。`,\n      );\n',
    replace:
      '      await era.printAndWait(`${player_name}慢慢的靠近了`); // 变异：拆回\n' +
      '      await era.printAndWait(`${target_name}抓过她的金发嗅着。`); // 变异：拆回\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 屈服刻印Lv3 的靠近分档：三支各合成一条输出',
  },
  {
    desc: 'M12428 K7 口塞初回·淫乱拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '        const mouth_front_5105 = `${target_name}因为嘴被塞住而稍稍不满的`;\n        if (era0(`tequip:${target}:43`)) {\n          await era.printAndWait(\n            `${target_name}因为嘴被塞住而稍稍不满的动了起来………`,\n          );',
    replace:
      '        const mouth_front_5105 = `${target_name}因为嘴被塞住而稍稍不满的`;\n        if (era0(`tequip:${target}:43`)) {\n          await era.printAndWait(`${target_name}因为`); // 变异：拆回\n          await era.printAndWait(`嘴被塞住而稍稍不满的动了起来………`); // 变异：拆回\n\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 口塞初回三档：前缀与收行段合成一条输出',
  },
  {
    desc: 'M12429 K7 口塞初回·爱慕拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '        const mouth_front_5114 = `${target_name}好像期待着什么就那样`;\n        if (era0(`tequip:${target}:43`)) {\n          await era.printAndWait(\n            `${target_name}好像期待着什么就那样动了起来………`,\n          );',
    replace:
      '        const mouth_front_5114 = `${target_name}好像期待着什么就那样`;\n        if (era0(`tequip:${target}:43`)) {\n          await era.printAndWait(`${target_name}好`); // 变异：拆回\n          await era.printAndWait(`像期待着什么就那样动了起来………`); // 变异：拆回\n\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 口塞初回三档：前缀与收行段合成一条输出',
  },
  {
    desc: 'M12430 K7 口塞初回·それ以外拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '          await era.printAndWait(`${target_name}的嘴被口枷塞住，左右摇着头………`);\n',
    replace:
      '          await era.printAndWait(`${target_name}的`); // 变异：拆回\n' +
      '          await era.printAndWait(`嘴被口枷塞住，左右摇着头………`); // 变异：拆回\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 口塞初回三档：前缀与收行段合成一条输出',
  },
  {
    desc: 'M12431 K7 口塞二回目·淫乱拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '        const mouth_front_5147 = `${target_name}因为嘴被塞住而稍稍不满的`;\n        if (era0(`tequip:${target}:43`)) {\n          await era.printAndWait(\n            `${target_name}因为嘴被塞住而稍稍不满的动了起来………`,\n          );',
    replace:
      '        const mouth_front_5147 = `${target_name}因为嘴被塞住而稍稍不满的`;\n        if (era0(`tequip:${target}:43`)) {\n          await era.printAndWait(`${target_name}因为`); // 变异：拆回\n          await era.printAndWait(`嘴被塞住而稍稍不满的动了起来………`); // 变异：拆回\n\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 口塞二回目三档：前缀与收行段合成一条输出',
  },
  {
    desc: 'M12432 K7 口塞二回目·爱慕拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '        const mouth_front_5167 = `${target_name}好像期待着什么就那样`;\n        if (era0(`tequip:${target}:43`)) {\n          await era.printAndWait(\n            `${target_name}好像期待着什么就那样动了起来………`,\n          );',
    replace:
      '        const mouth_front_5167 = `${target_name}好像期待着什么就那样`;\n        if (era0(`tequip:${target}:43`)) {\n          await era.printAndWait(`${target_name}好`); // 变异：拆回\n          await era.printAndWait(`像期待着什么就那样动了起来………`); // 变异：拆回\n\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 口塞二回目三档：前缀与收行段合成一条输出',
  },
  {
    desc: 'M12433 K7 口塞二回目·それ以外拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '          await era.printAndWait(`${target_name}的嘴被口枷塞住左右摇着头………`);\n',
    replace:
      '          await era.printAndWait(`${target_name}`); // 变异：拆回\n' +
      '          await era.printAndWait(`的嘴被口枷塞住左右摇着头………`); // 变异：拆回\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 口塞二回目三档：前缀与收行段合成一条输出',
  },
  {
    desc: 'M12434 K7 交谈初回·爱意拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: "        const talk_front_5408 = `被${player_name}`;\n        if (\n          era0(`palam:${target}:5`) >= PALAMLV[4] &&\n          (era0(`talent:${target}:85`) || era0(`abl:${target}:10`) >= 5) &&\n          era0('tflag:60')\n        ) {\n          await era.print(\n            `被${player_name}搭着话、${target_name}摇着腰说出了爱的话语`,\n          );",
    replace:
      "        const talk_front_5408 = `被${player_name}`;\n        if (\n          era0(`palam:${target}:5`) >= PALAMLV[4] &&\n          (era0(`talent:${target}:85`) || era0(`abl:${target}:10`) >= 5) &&\n          era0('tflag:60')\n        ) {\n          await era.print(`被${player_name}搭着话、`); // 变异：拆回\n          await era.print(`${target_name}摇着腰说出了爱的话语`); // 变异：拆回\n\n",
    tests: ['kojo-k7-heart'],
    must_mention:
      '#621 交谈・通常会話七支（初回与二回目两组）：前缀与各支收行段合成一条输出',
  },
  {
    desc: 'M12435 K7 交谈二回目·爱意拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: "        const talk_front_5485 = `被${player_name}`;\n        if (\n          era0(`palam:${target}:5`) >= PALAMLV[4] &&\n          (era0(`talent:${target}:85`) || era0(`abl:${target}:10`) >= 5) &&\n          era0('tflag:60')\n        ) {\n          await era.print(\n            `被${player_name}搭着话、${target_name}摇着腰说出了爱的话语`,\n          );",
    replace:
      "        const talk_front_5485 = `被${player_name}`;\n        if (\n          era0(`palam:${target}:5`) >= PALAMLV[4] &&\n          (era0(`talent:${target}:85`) || era0(`abl:${target}:10`) >= 5) &&\n          era0('tflag:60')\n        ) {\n          await era.print(`被${player_name}搭着话、`); // 变异：拆回\n          await era.print(`${target_name}摇着腰说出了爱的话语`); // 变异：拆回\n\n",
    tests: ['kojo-k7-heart'],
    must_mention:
      '#621 交谈・通常会話七支（初回与二回目两组）：前缀与各支收行段合成一条输出',
  },
  {
    desc: 'M12436 K7 迷宫凌辱·「作为代替」拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '      await era.printAndWait(\n        `作为代替${target_name}的肛门被彻底侵犯，逆流出了分不清是精液还是粘液的液体。`,\n      );\n',
    replace:
      '      await era.printAndWait(`作为代替${target_name}的肛门被`); // 变异：拆回\n' +
      '      await era.printAndWait(`彻底侵犯，逆流出了分不清是精液还是粘液的液体。`); // 变异：拆回\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 迷宫凌辱「作为代替」：前缀与收行段合成一条输出',
  },
  {
    desc: 'M12437 K7 录像自我介绍初回（SIF ABL:31）拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: "          await era.print(\n            `${target_name}把自己的本名和至今为止的性体验` +\n              (recall_dirty ? `、甚至连自慰时妄想的内容都` : '') +\n              `高兴地讲了出来……`,\n          );\n",
    replace:
      "          await era.print(`${target_name}把自己的本名和至今为止的性体验`); // 变异：拆回\n          await era.print((recall_dirty ? `、甚至连自慰时妄想的内容都` : '') +\n              `高兴地讲了出来……`); // 变异：拆回\n",
    tests: ['kojo-k7-heart'],
    must_mention:
      '#621 录像自我介绍（SIF ABL:31）：前缀与收行段合成一条输出（初回与二回目两组）',
  },
  {
    desc: 'M12438 K7 录像自我介绍二回目（SIF ABL:31）拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: "          await era.print(\n            `${target_name}把自己的本名和至今为止的性体验` +\n              (recall_dirty_5470 ? `、甚至连自慰时妄想的内容都` : '') +\n              `高兴地讲了出来……`,\n          );\n",
    replace:
      "          await era.print(`${target_name}把自己的本名和至今为止的性体验`); // 变异：拆回\n          await era.print((recall_dirty_5470 ? `、甚至连自慰时妄想的内容都` : '') +\n              `高兴地讲了出来……`); // 变异：拆回\n",
    tests: ['kojo-k7-heart'],
    must_mention:
      '#621 录像自我介绍（SIF ABL:31）：前缀与收行段合成一条输出（初回与二回目两组）',
  },
  {
    desc: 'M12439 K7 死斗场口交（助手性器两档）拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: "      await era.printAndWait(\n        `${assi_name}因为` +\n          (assi_has_penis_8255 ? `肉棒` : '') +\n          (assi_dildo_8257 ? `假阴茎` : '') +\n          `被${target_name}舔着而露出了心旷神怡的额表情……`,\n      );\n",
    replace:
      "      await era.printAndWait(`${assi_name}因为`); // 变异：拆回\n      await era.printAndWait((assi_has_penis_8255 ? `肉棒` : '') +\n          (assi_dildo_8257 ? `假阴茎` : '') +\n          `被${target_name}舔着而露出了心旷神怡的额表情……`); // 变异：拆回\n",
    tests: ['kojo-k7-heart'],
    must_mention: '#621 COLOSSEUM_KOJO_7 三处：性器名与收行段合成一条输出',
  },
  {
    desc: 'M12440 K7 死斗场正常位（助手性器两档）拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: "      await era.printAndWait(\n        `${assi_name}一边听着${target_name}的悲鸣一边用` +\n          (assi_has_penis_8290 ? `肉棒` : '') +\n          (assi_dildo_8292 ? `假阴茎` : '') +\n          `继续毫不留情的蹂躏着${target_name}的小穴。`,\n      );\n",
    replace:
      "      await era.printAndWait(`${assi_name}一边听着${target_name}的悲鸣一边用`); // 变异：拆回\n      await era.printAndWait((assi_has_penis_8290 ? `肉棒` : '') +\n          (assi_dildo_8292 ? `假阴茎` : '') +\n          `继续毫不留情的蹂躏着${target_name}的小穴。`); // 变异：拆回\n",
    tests: ['kojo-k7-heart'],
    must_mention: '#621 COLOSSEUM_KOJO_7 三处：性器名与收行段合成一条输出',
  },
  {
    desc: 'M12441 K7 死斗场后背位アナル（助手性器两档）拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: "      await era.printAndWait(\n        `${assi_name}一边听着${target_name}的悲鸣一边用` +\n          (assi_has_penis_8317 ? `肉棒` : '') +\n          (assi_dildo_8319 ? `假阴茎` : '') +\n          `继续毫不留情的蹂躏着${target_name}的小穴。`,\n      );\n",
    replace:
      "      await era.printAndWait(`${assi_name}一边听着${target_name}的悲鸣一边用`); // 变异：拆回\n      await era.printAndWait((assi_has_penis_8317 ? `肉棒` : '') +\n          (assi_dildo_8319 ? `假阴茎` : '') +\n          `继续毫不留情的蹂躏着${target_name}的小穴。`); // 变异：拆回\n",
    tests: ['kojo-k7-heart'],
    must_mention: '#621 COLOSSEUM_KOJO_7 三处：性器名与收行段合成一条输出',
  },
  {
    desc: 'M12442 K7 交谈初回·语调三档拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: "          await era.print(\n            talk_front_5408 +\n              `搭着话、${target_name}一边发出` +\n              (excited_5415 ? `快乐的` : painful_5417 ? `痛苦的` : '') +\n              `的声音、一边拼死的回着话`,\n          );\n",
    replace:
      '          await era.print(talk_front_5408); // 变异：拆回\n' +
      '          await era.print(`搭着话、${target_name}一边发出` +\n' +
      "              (excited_5415 ? `快乐的` : painful_5417 ? `痛苦的` : '') +\n" +
      '              `的声音、一边拼死的回着话`); // 变异：拆回\n',
    tests: ['kojo-k7-heart'],
    must_mention:
      '#621 交谈・通常会話七支（初回与二回目两组）：前缀与各支收行段合成一条输出',
  },
  {
    desc: 'M12443 K7 交谈二回目·语调三档拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: "          await era.print(\n            talk_front_5485 +\n              `搭着话、${target_name}一边发出` +\n              (excited_5492 ? `快乐的` : painful_5494 ? `痛苦的` : '') +\n              `声音、一边拼死的回着话`,\n          );\n",
    replace:
      '          await era.print(talk_front_5485); // 变异：拆回\n' +
      '          await era.print(`搭着话、${target_name}一边发出` +\n' +
      "              (excited_5492 ? `快乐的` : painful_5494 ? `痛苦的` : '') +\n" +
      '              `声音、一边拼死的回着话`); // 变异：拆回\n',
    tests: ['kojo-k7-heart'],
    must_mention:
      '#621 交谈・通常会話七支（初回与二回目两组）：前缀与各支收行段合成一条输出',
  },
  {
    desc: 'M12444 K7 NTR·P1 插进秘裂拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '      await era.printAndWait(\n        (king_penis_8361 ? `然后、狂王的巨根` : `然后、特大号按摩棒`) +\n          `慢慢的插进了${target_name}的秘裂。在镜头里能看见${target_name}的蜜壶被深深的贯穿了。`,\n      );\n',
    replace:
      '      await era.printAndWait((king_penis_8361 ? `然后、狂王的巨根` : `然后、特大号按摩棒`)); // 变异：拆回\n      await era.printAndWait(\n          `慢慢的插进了${target_name}的秘裂。在镜头里能看见${target_name}的蜜壶被深深的贯穿了。`); // 变异：拆回\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 NTR_KOUJO_K7 八组：性器名与收行段合成一条输出',
  },
  {
    desc: 'M12445 K7 NTR·P1 それ以外拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '      await era.printAndWait(\n        (king_penis_8374 ? `狂王的巨根` : `特大号按摩棒`) +\n          `深深的插入了${target_name}的蜜壶、破瓜之血顺着大腿流了下来………`,\n      );\n',
    replace:
      '      await era.printAndWait((king_penis_8374 ? `狂王的巨根` : `特大号按摩棒`)); // 变异：拆回\n      await era.printAndWait(\n          `深深的插入了${target_name}的蜜壶、破瓜之血顺着大腿流了下来………`); // 变异：拆回\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 NTR_KOUJO_K7 八组：性器名与收行段合成一条输出',
  },
  {
    desc: 'M12446 K7 NTR·P2 肛门吞下（肛开Lv3）拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '        await era.printAndWait(\n          `${target_name}被开发了的肛门轻易地吞下了` +\n            (king_penis_8389 ? `狂王的巨根` : `特大号按摩棒`) +\n            `、${target_name}开始发出了呻吟声。`,\n        );\n',
    replace:
      '        await era.printAndWait(`${target_name}被开发了的肛门轻易地吞下了`); // 变异：拆回\n        await era.printAndWait((king_penis_8389 ? `狂王的巨根` : `特大号按摩棒`) +\n            `、${target_name}开始发出了呻吟声。`); // 变异：拆回\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 NTR_KOUJO_K7 八组：性器名与收行段合成一条输出',
  },
  {
    desc: 'M12447 K7 NTR·P2 肛门吞下（苦痛）拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '        await era.printAndWait(\n          `${target_name}的肛门吞下了` +\n            (king_penis_8399 ? `狂王的巨根` : `特大号按摩棒`) +\n            `、${target_name}因为强烈的苦痛而悲鸣着。`,\n        );\n',
    replace:
      '        await era.printAndWait(`${target_name}的肛门吞下了`); // 变异：拆回\n        await era.printAndWait((king_penis_8399 ? `狂王的巨根` : `特大号按摩棒`) +\n            `、${target_name}因为强烈的苦痛而悲鸣着。`); // 变异：拆回\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 NTR_KOUJO_K7 八组：性器名与收行段合成一条输出',
  },
  {
    desc: 'M12448 K7 NTR·P2 それ以外拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '      await era.printAndWait(\n        (king_penis_8410 ? `狂王的巨根` : `特大号按摩棒`) +\n          `插进了${target_name}的肛门、${target_name}发出娇喘取悦着狂王………`,\n      );\n',
    replace:
      '      await era.printAndWait((king_penis_8410 ? `狂王的巨根` : `特大号按摩棒`)); // 变异：拆回\n      await era.printAndWait(\n          `插进了${target_name}的肛门、${target_name}发出娇喘取悦着狂王………`); // 变异：拆回\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 NTR_KOUJO_K7 八组：性器名与收行段合成一条输出',
  },
  {
    desc: 'M12449 K7 NTR·P4 性爱狂拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '      await era.printAndWait(\n        `虽然因为完全变成性爱狂的${target_name}而困惑着，但还是用` +\n          (king_penis_8438 ? `他的巨根` : `特大号按摩棒`) +\n          `不停地侵犯着${target_name}的蜜壶。然后随着抽送${target_name}发出着野兽一样的呻吟声。`,\n      );\n',
    replace:
      '      await era.printAndWait(`虽然因为完全变成性爱狂的${target_name}而困惑着，但还是用`); // 变异：拆回\n      await era.printAndWait((king_penis_8438 ? `他的巨根` : `特大号按摩棒`) +\n          `不停地侵犯着${target_name}的蜜壶。然后随着抽送${target_name}发出着野兽一样的呻吟声。`); // 变异：拆回\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 NTR_KOUJO_K7 八组：性器名与收行段合成一条输出',
  },
  {
    desc: 'M12450 K7 NTR·P4 爱慕拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '      await era.printAndWait(\n        (king_penis_8449 ? `狂王的巨根` : `特大号按摩棒`) +\n          `不停的侵犯着${target_name}的蜜壶、${target_name}发出了甜美的呻吟。`,\n      );\n',
    replace:
      '      await era.printAndWait((king_penis_8449 ? `狂王的巨根` : `特大号按摩棒`)); // 变异：拆回\n      await era.printAndWait(\n          `不停的侵犯着${target_name}的蜜壶、${target_name}发出了甜美的呻吟。`); // 变异：拆回\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 NTR_KOUJO_K7 八组：性器名与收行段合成一条输出',
  },
  {
    desc: 'M12451 K7 NTR·P4 それ以外拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '      await era.printAndWait(\n        (king_penis_8459 ? `狂王的巨根` : `特大号按摩棒`) +\n          `不停地侵犯着${target_name}的蜜穴、${target_name}呻吟着。`,\n      );\n',
    replace:
      '      await era.printAndWait((king_penis_8459 ? `狂王的巨根` : `特大号按摩棒`)); // 变异：拆回\n      await era.printAndWait(\n          `不停地侵犯着${target_name}的蜜穴、${target_name}呻吟着。`); // 变异：拆回\n',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 NTR_KOUJO_K7 八组：性器名与收行段合成一条输出',
  },
  {
    desc: 'M12452 K7 迎击奖励请求·动物名三档拆回多条（#621）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '    await era.printAndWait(\n      `「奖励？　我想尝试和` +\n        (beast_kind_8680 == 1 ? `犬` : beast_kind_8680 == 2 ? `豚` : `马`) +\n        `性交看看」`,\n    );',
    replace:
      '    await era.printAndWait(`「奖励？　我想尝试和`); // 变异：拆回\n    await era.printAndWait((beast_kind_8680 == 1\n          ? `犬`\n          : beast_kind_8680 == 2\n            ? `豚`\n            : `马`) +\n        `性交看看」`); // 变异：拆回',
    tests: ['kojo-k7-heart'],
    must_mention: '#621 迎击奖励请求：动物名与收行段合成一条输出',
  },
  {
    desc: 'M12561 K8 NTR P==5 それ以外·蜜裂与肛门段拆回三条（#622 补查：普查把这一组归一类误报，只并第一支会漏）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '      // 一整行：无后缀 PRINTFORM + IF/ELSE 的 PRINT\n      // （互斥两支，各支自带收尾，块后没有共同的收行语句）（#622 补查）。\n      // 这一处只判 FLAG:500 == 0（与上文各处的 0 或 2 不同）\n      await era.print(\n        `${target_name}的蜜裂和肛门被` +\n          (game.system.狂王性别 == 0\n            ? `阴茎搅动着、精液不停的溢了出来………`\n            : `假阳具搅动着、爱液不停的溢了出来………`),\n      );',
    replace:
      '      await era.print(`${target_name}的蜜裂和肛门被`); // 变异：拆回\n' +
      '      if (game.system.狂王性别 == 0) {\n' +
      '        await era.print(`阴茎搅动着、精液不停的溢了出来………`); // 变异：拆回\n' +
      '      } else {\n' +
      '        await era.print(`假阳具搅动着、爱液不停的溢了出来………`); // 变异：拆回\n' +
      '      }',
    tests: ['kojo-k8-spade'],
    must_mention:
      'P==5 それ以外支只判 FLAG:500 == 0（扶她的 2 走假阳具）：同一行输出',
  },
  // —— #625：口上剩余拆行第 E 组（11 个文件 70 组「同一行输出被拆」的合并点），
  // 各配一条「拆回多条」变异。（每处合并后的整行断言见对应测试文件；
  // 条目按工单给的 M12800 起编号）——
  {
    desc: 'M12800 K12 褒美请求·兽名拆回三条（#625：兽名与前后文又各占一行）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '    await era.printAndWait(\n      `${chara_callname(a)}提出了与` + beast_word + `交尾的要求`,\n    );',
    replace:
      '    await era.print(`${chara_callname(a)}提出了与`); // 变异：拆回\n' +
      '    await era.print(beast_word); // 变异：拆回\n' +
      '    await era.printAndWait(`交尾的要求`); // 变异：拆回',
    tests: ['kojo-k12-intellectual'],
    must_mention: '兽名与前后文落在同一行',
  },
  {
    desc: 'M12801 K14 褒美请求·兽名拆回三条（#625：兽名与前后文又各占一行）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: '    await era.printAndWait(\n      `${chara_callname(a)}提出了想要和` + beast_word + `进行交配的奖励。`,\n    );',
    replace:
      '    await era.print(`${chara_callname(a)}提出了想要和`); // 变异：拆回\n' +
      '    await era.print(beast_word); // 变异：拆回\n' +
      '    await era.printAndWait(`进行交配的奖励。`); // 变异：拆回',
    tests: ['kojo-k14-nobleman'],
    must_mention: '兽名与前后文落在同一行',
  },
  {
    desc: 'M12802 K15 接吻初吻·擦嘴段拆回三条（#625：擦嘴段又占一行）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: "        await era.printAndWait(\n          `${target_name}` +\n            (wiped\n              ? '像擦拭什么脏东西那样，用力地用手模擦着自己的嘴唇，'\n              : '') +\n            `恼怒地说着挑衅着话语……`,\n        );",
    replace:
      '        await era.print(`${target_name}`); // 变异：拆回\n' +
      '        if (wiped) {\n' +
      "          await era.print('像擦拭什么脏东西那样，用力地用手模擦着自己的嘴唇，'); // 变异：拆回\n" +
      '        }\n' +
      '        await era.printAndWait(`恼怒地说着挑衅着话语……`); // 变异：拆回',
    tests: ['kojo-k15-clever'],
    must_mention: '擦嘴段与挑衅段落在同一行',
  },
  {
    desc: 'M12803 K15 死斗场口交·武器名拆回三条（#625：武器名又占一行）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: "      await era.printAndWait(\n        `${assi_name}粗暴地拉起${target_name}的头发，得意地用` +\n          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +\n          `侵犯着对方的口腔……`,\n      );",
    replace:
      '      await era.print(`${assi_name}粗暴地拉起${target_name}的头发，得意地用`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`阴茎`); // 变异：拆回\n' +
      '      } else if (assi_has_toy) {\n' +
      '        await era.print(`假阳具`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`侵犯着对方的口腔……`); // 变异：拆回',
    tests: ['kojo-k15-clever'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12804 K15 褒美请求·兽名拆回三条（#625：兽名与前后文又各占一行）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '    await era.printAndWait(\n      `「迎击成功的话，请让${sc()}跟` + beast_word + `进行交配好吗？」`,\n    );',
    replace:
      '    await era.print(`「迎击成功的话，请让${sc()}跟`); // 变异：拆回\n' +
      '    await era.print(beast_word); // 变异：拆回\n' +
      '    await era.printAndWait(`进行交配好吗？」`); // 变异：拆回',
    tests: ['kojo-k15-clever'],
    must_mention: '兽名与前后文落在同一行',
  },
  {
    desc: 'M12805 K903 死斗场 SC31·武器名拆回四条（#625：武器名又占一行）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: "      await era.printAndWait(\n        `${assi_name}把` +\n          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +\n          `粗暴地塞入${target_name}的嘴里，露出了心满意足的神情……`,\n      );",
    replace:
      '      await era.print(`${assi_name}把`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`阴茎`); // 变异：拆回\n' +
      '      } else if (assi_has_toy) {\n' +
      '        await era.print(`假阳具`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(\n' +
      '        `粗暴地塞入${target_name}的嘴里，露出了心满意足的神情……`,\n' +
      '      ); // 变异：拆回',
    tests: ['kojo-k903-garde'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12806 K903 死斗场 SC21·武器名拆回四条（#625）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: "      await era.printAndWait(\n        `${assi_name}听到悲鸣，更加兴奋了，继续用` +\n          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +\n          `毫不留情地蹂躏着${target_name}的私处……`,\n      );",
    replace:
      '      await era.print(`${assi_name}听到悲鸣，更加兴奋了，继续用`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`阴茎`); // 变异：拆回\n' +
      '      } else if (assi_has_toy) {\n' +
      '        await era.print(`假阳具`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`毫不留情地蹂躏着${target_name}的私处……`); // 变异：拆回',
    tests: ['kojo-k903-garde'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12807 K903 死斗场 SC27·武器名拆回四条（#625）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: "      await era.printAndWait(\n        `${assi_name}听到悲鸣，更加兴奋了，继续用` +\n          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +\n          `毫不留情地蹂躏着${target_name}的肛门……`,\n      );",
    replace:
      '      await era.print(`${assi_name}听到悲鸣，更加兴奋了，继续用`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`阴茎`); // 变异：拆回\n' +
      '      } else if (assi_has_toy) {\n' +
      '        await era.print(`假阳具`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`毫不留情地蹂躏着${target_name}的肛门……`); // 变异：拆回',
    tests: ['kojo-k903-garde'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12808 K903 褒美请求·兽名拆回三条（#625：兽名与前后文又各占一行）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '    await era.printAndWait(\n      `「魔王大人，你懂得的吧…让本宫和` + beast_word + `好好地玩・一・玩吧♪」`,\n    );',
    replace:
      '    await era.print(`「魔王大人，你懂得的吧…让本宫和`); // 变异：拆回\n' +
      '    await era.print(beast_word); // 变异：拆回\n' +
      '    await era.printAndWait(`好好地玩・一・玩吧♪」`); // 变异：拆回',
    tests: ['kojo-k903-garde'],
    must_mention: '兽名与前后文落在同一行',
  },
  {
    desc: 'M12809 K4 K4_KOJO2 眼镜段拆回三条（#625：眼镜段又占一行）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: "    await era.printAndWait(\n      `${target_name}` + (glasses ? '眼镜下' : '') + `的目光异常冰冷…`,\n    );",
    replace:
      '    await era.print(`${target_name}`); // 变异：拆回\n' +
      '    if (glasses) {\n' +
      "      await era.print('眼镜下'); // 变异：拆回\n" +
      '    }\n' +
      '    await era.printAndWait(`的目光异常冰冷…`); // 变异：拆回',
    tests: ['kojo-k4-stoic'],
    must_mention: '眼镜段与后半句落在同一行',
  },
  {
    desc: 'M12810 K4 死斗场 SC31·武器名拆回四条（#625：武器名又占一行）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: "      await era.printAndWait(\n        `${assi_name}把` +\n          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +\n          `粗暴地塞入${target_name}的嘴里，露出了心满意足的神情……`,\n      );",
    replace:
      '      await era.print(`${assi_name}把`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`阴茎`); // 变异：拆回\n' +
      '      } else if (assi_has_toy) {\n' +
      '        await era.print(`假阳具`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(\n' +
      '        `粗暴地塞入${target_name}的嘴里，露出了心满意足的神情……`,\n' +
      '      ); // 变异：拆回',
    tests: ['kojo-k4-stoic'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12811 K4 死斗场 SC21·武器名拆回四条（#625）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: "      await era.printAndWait(\n        `${assi_name}听到悲鸣，更加兴奋了，继续用` +\n          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +\n          `毫不留情地蹂躏着${target_name}的私处……`,\n      );",
    replace:
      '      await era.print(`${assi_name}听到悲鸣，更加兴奋了，继续用`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`阴茎`); // 变异：拆回\n' +
      '      } else if (assi_has_toy) {\n' +
      '        await era.print(`假阳具`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`毫不留情地蹂躏着${target_name}的私处……`); // 变异：拆回',
    tests: ['kojo-k4-stoic'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12812 K4 死斗场 SC27·武器名拆回四条（#625）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: "      await era.printAndWait(\n        `${assi_name}听到悲鸣，更加兴奋了，继续用` +\n          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +\n          `毫不留情地蹂躏着${target_name}的肛门……`,\n      );",
    replace:
      '      await era.print(`${assi_name}听到悲鸣，更加兴奋了，继续用`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`阴茎`); // 变异：拆回\n' +
      '      } else if (assi_has_toy) {\n' +
      '        await era.print(`假阳具`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`毫不留情地蹂躏着${target_name}的肛门……`); // 变异：拆回',
    tests: ['kojo-k4-stoic'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12813 K4 褒美请求·兽名拆回三条（#625：兽名与前后文又各占一行）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '    await era.printAndWait(`「拜托了…让我和` + beast_word + `交配吧……！」`);',
    replace:
      '    await era.print(`「拜托了…让我和`); // 变异：拆回\n' +
      '    await era.print(beast_word); // 变异：拆回\n' +
      '    await era.printAndWait(`交配吧……！」`); // 变异：拆回',
    tests: ['kojo-k4-stoic'],
    must_mention: '兽名与前后文落在同一行',
  },
  {
    desc: 'M12814 K2 交谈首次·自我介绍拆回三条（#625：自白段又占一行）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: "          const masturbation_note = (era.get(`abl:${target}:31`) || 0) >= 3;\n          await era.print(\n            `于是${target_name}将自己的本名、之前的性体验` +\n              (masturbation_note ? '还有一个人手淫的时候想着谁之类的' : '') +\n              `面带微笑的说了出来……`,\n          );\n          await era.printAndWait(",
    replace:
      "          const masturbation_note = (era.get(`abl:${target}:31`) || 0) >= 3;\n          await era.print(`于是${target_name}将自己的本名、之前的性体验`); // 变异：拆回\n          if (masturbation_note) {\n            await era.print('还有一个人手淫的时候想着谁之类的'); // 变异：拆回\n          }\n          await era.print(`面带微笑的说了出来……`); // 变异：拆回\n          await era.printAndWait(",
    tests: ['kojo-k2-timid'],
    must_mention: '本名段与后文落在同一行',
  },
  {
    desc: 'M12815 K2 交谈二次·自我介绍拆回三条（#625）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: "          const masturbation_note = (era.get(`abl:${target}:31`) || 0) >= 3;\n          await era.print(\n            `于是${target_name}将自己的本名、之前的性体验` +\n              (masturbation_note ? '还有一个人手淫的时候想着谁之类的' : '') +\n              `面带微笑的说了出来……`,\n          );\n          await era.print(",
    replace:
      "          const masturbation_note = (era.get(`abl:${target}:31`) || 0) >= 3;\n          await era.print(`于是${target_name}将自己的本名、之前的性体验`); // 变异：拆回\n          if (masturbation_note) {\n            await era.print('还有一个人手淫的时候想着谁之类的'); // 变异：拆回\n          }\n          await era.print(`面带微笑的说了出来……`); // 变异：拆回\n          await era.print(",
    tests: ['kojo-k2-timid'],
    must_mention: '本名段与后文落在同一行',
  },
  {
    desc: 'M12816 K2 交谈首次·按捺住声音拆回五条（#625：工具档又占一行）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: "          // ELSE 三档互斥——条件提到语句外当取值，文本留在输出语句里（#625）\n          const overwhelmed_by_tool =\n            era.get(`tequip:${target}:11`) ||\n            era.get(`tequip:${target}:13`) ||\n            era.get(`tequip:${target}:14`) ||\n            era.get(`tequip:${target}:15`) ||\n            era.get(`tequip:${target}:16`) ||\n            era.get(`tequip:${target}:17`);\n          const overwhelmed_by_pain =\n            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);\n          await era.print(\n            `${target_name}一边竭力按捺住` +\n              (overwhelmed_by_tool\n                ? '快乐的'\n                : overwhelmed_by_pain\n                  ? '痛苦的'\n                  : '自己的') +\n              `声音，一边努力地回应着${player_name}。`,\n          );",
    replace:
      '          // ELSE 三档互斥——条件提到语句外当取值，文本留在输出语句里（#625）\n          const overwhelmed_by_tool =\n            era.get(`tequip:${target}:11`) ||\n            era.get(`tequip:${target}:13`) ||\n            era.get(`tequip:${target}:14`) ||\n            era.get(`tequip:${target}:15`) ||\n            era.get(`tequip:${target}:16`) ||\n            era.get(`tequip:${target}:17`);\n          const overwhelmed_by_pain =\n            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);\n          await era.print(`${target_name}一边竭力按捺住`); // 变异：拆回\n          if (overwhelmed_by_tool) {\n            await era.print(`快乐的`); // 变异：拆回\n          } else if (overwhelmed_by_pain) {\n            await era.print(`痛苦的`); // 变异：拆回\n          } else {\n            await era.print(`自己的`); // 变异：拆回\n          }\n          await era.print(`声音，一边努力地回应着${player_name}。`); // 变异：拆回',
    tests: ['kojo-k2-timid'],
    must_mention: '工具档与前后文落在同一行',
  },
  {
    desc: 'M12817 K2 交谈二次·按捺住声音拆回五条（#625）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: "          // 同一行输出：无后缀 PRINTFORM/\n          // PRINT 连续不换行，末行 PRINTFORML 才收行。前段工具档与\n          // ELSE 三档互斥——条件提到语句外当取值，文本留在输出语句里（#625）\n          const overwhelmed_by_tool =\n            era.get(`tequip:${target}:11`) ||\n            era.get(`tequip:${target}:13`) ||\n            era.get(`tequip:${target}:14`) ||\n            era.get(`tequip:${target}:15`) ||\n            era.get(`tequip:${target}:16`) ||\n            era.get(`tequip:${target}:17`);\n          const overwhelmed_by_pain =\n            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);\n          await era.print(\n            `${target_name}一边竭力按捺住` +\n              (overwhelmed_by_tool\n                ? '快乐的'\n                : overwhelmed_by_pain\n                  ? '痛苦的'\n                  : '自己的') +\n              `声音，一边努力地回应着${player_name}。`,\n          );",
    replace:
      '          const overwhelmed_by_tool =\n            era.get(`tequip:${target}:11`) ||\n            era.get(`tequip:${target}:13`) ||\n            era.get(`tequip:${target}:14`) ||\n            era.get(`tequip:${target}:15`) ||\n            era.get(`tequip:${target}:16`) ||\n            era.get(`tequip:${target}:17`);\n          const overwhelmed_by_pain =\n            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);\n          await era.print(`${target_name}一边竭力按捺住`); // 变异：拆回\n          if (overwhelmed_by_tool) {\n            await era.print(`快乐的`); // 变异：拆回\n          } else if (overwhelmed_by_pain) {\n            await era.print(`痛苦的`); // 变异：拆回\n          } else {\n            await era.print(`自己的`); // 变异：拆回\n          }\n          await era.print(`声音，一边努力地回应着${player_name}。`); // 变异：拆回',
    tests: ['kojo-k2-timid'],
    must_mention: '工具档与前后文落在同一行',
  },
  {
    desc: 'M12818 K2 死斗场 SC31·武器名拆回四条（#625：武器名又占一行）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: "      await era.printAndWait(\n        `${assi_name}把` +\n          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +\n          `塞入${target_name}的口中，她一脸愉悦的吞吐着肉棒……`,\n      );",
    replace:
      '      await era.print(`${assi_name}把`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`阴茎`); // 变异：拆回\n' +
      '      } else if (assi_has_toy) {\n' +
      '        await era.print(`假阳具`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(\n' +
      '        `塞入${target_name}的口中，她一脸愉悦的吞吐着肉棒……`,\n' +
      '      ); // 变异：拆回',
    tests: ['kojo-k2-timid'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12819 K2 死斗场 SC21·武器名拆回四条（#625）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: "      await era.printAndWait(\n        `${assi_name}仔细聆听传来的悲鸣，用` +\n          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +\n          `将${target_name}的小穴无情地蹂躏着……`,\n      );",
    replace:
      '      await era.print(`${assi_name}仔细聆听传来的悲鸣，用`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`阴茎`); // 变异：拆回\n' +
      '      } else if (assi_has_toy) {\n' +
      '        await era.print(`假阳具`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`将${target_name}的小穴无情地蹂躏着……`); // 变异：拆回',
    tests: ['kojo-k2-timid'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12820 K2 死斗场 SC27·武器名拆回四条（#625）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: "      await era.printAndWait(\n        `${assi_name}仔细聆听传来的悲鸣，用` +\n          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阳具' : '') +\n          `将${target_name}的肛门无情地蹂躏着……`,\n      );",
    replace:
      '      await era.print(`${assi_name}仔细聆听传来的悲鸣，用`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`阴茎`); // 变异：拆回\n' +
      '      } else if (assi_has_toy) {\n' +
      '        await era.print(`假阳具`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`将${target_name}的肛门无情地蹂躏着……`); // 变异：拆回',
    tests: ['kojo-k2-timid'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12821 K2 褒美请求·兽名拆回三条（#625：兽名与前后文又各占一行）',
    file: 'ere/kojo/kojo-k2-timid.js',
    find: '    await era.printAndWait(\n      `「那个…回来的话…能让` + beast_word + `来和我…做…吗」`,\n    );',
    replace:
      '    await era.print(`「那个…回来的话…能让`); // 变异：拆回\n' +
      '    await era.print(beast_word); // 变异：拆回\n' +
      '    await era.printAndWait(`来和我…做…吗」`); // 变异：拆回',
    tests: ['kojo-k2-timid'],
    must_mention: '兽名与前后文落在同一行',
  },
  {
    desc: 'M12822 K19 交谈·自我介绍拆回三条（#625：自白段又占一行）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: "          // 那一段——条件提到语句外当取值，文本留在输出语句里（#625）\n          const masturbation_note = era.get(`abl:${target}:31`) >= 3;\n          await era.printAndWait(\n            `于是${target_name}将自己的名字、喜欢的H的方式` +\n              (masturbation_note ? '还有手淫时妄想的内容' : '') +\n              `之类的介绍了出来……`,\n          );",
    replace:
      '          // 那一段——条件提到语句外当取值，文本留在输出语句里（#625）\n          const masturbation_note = era.get(`abl:${target}:31`) >= 3;\n          await era.print(`于是${target_name}将自己的名字、喜欢的H的方式`); // 变异：拆回\n          if (masturbation_note) {\n            await era.print(`还有手淫时妄想的内容`); // 变异：拆回\n          }\n          await era.printAndWait(`之类的介绍了出来……`); // 变异：拆回',
    tests: ['kojo-k19-fia'],
    must_mention: '名字段与后文落在同一行',
  },
  {
    desc: 'M12823 K19 交谈·自我介绍·二次拆回三条（#625）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: "          // 同一行输出：无后缀 PRINTFORM 连续不换行，\n          // 末行 PRINTFORMW 才收行。SIF ABL:31 >= 3 只护住\n          // 那一段——条件提到语句外当取值，文本留在输出语句里（#625）\n          const masturbation_note = era.get(`abl:${target}:31`) >= 3;\n          await era.printAndWait(\n            `于是${target_name}将自己的名字、喜欢的H的方式` +\n              (masturbation_note ? '还有手淫时妄想的内容' : '') +\n              `之类的介绍了出来……`,\n          );",
    replace:
      '          const masturbation_note = era.get(`abl:${target}:31`) >= 3;\n          await era.print(`于是${target_name}将自己的名字、喜欢的H的方式`); // 变异：拆回\n          if (masturbation_note) {\n            await era.print(`还有手淫时妄想的内容`); // 变异：拆回\n          }\n          await era.printAndWait(`之类的介绍了出来……`); // 变异：拆回',
    tests: ['kojo-k19-fia'],
    must_mention: '名字段与后文落在同一行',
  },
  {
    desc: 'M12824 K19 交谈·压抑着呼吸声拆回四条（#625：工具档又占一行）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: "          await era.print(\n            `${target_name}一边压抑着` +\n              (overwhelmed_by_tool\n                ? '快乐的'\n                : overwhelmed_by_pain\n                  ? '痛苦的'\n                  : '') +\n              `呼吸声，一边努力回应着${master_name}……`,\n          );",
    replace:
      '          await era.print(`${target_name}一边压抑着`); // 变异：拆回\n' +
      '          if (overwhelmed_by_tool) {\n' +
      '            await era.print(`快乐的`); // 变异：拆回\n' +
      '          } else if (overwhelmed_by_pain) {\n' +
      '            await era.print(`痛苦的`); // 变异：拆回\n' +
      '          }\n' +
      '          await era.print(`呼吸声，一边努力回应着${master_name}……`); // 变异：拆回',
    tests: ['kojo-k19-fia'],
    must_mention: '工具档与前后文落在同一行',
  },
  {
    desc: 'M12825 K19 交谈·压抑着呼吸声·二次拆回四条（#625）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: "          // 同组的一整行（#625）\n          const overwhelmed_by_tool =\n            era.get(`tequip:${target}:11`) ||\n            era.get(`tequip:${target}:13`) ||\n            era.get(`tequip:${target}:14`) ||\n            era.get(`tequip:${target}:15`) ||\n            era.get(`tequip:${target}:16`) ||\n            era.get(`tequip:${target}:17`);\n          const overwhelmed_by_pain =\n            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);\n          await era.print(\n            player_prefix +\n              `${target_name}一边压抑着` +\n              (overwhelmed_by_tool\n                ? '快乐的'\n                : overwhelmed_by_pain\n                  ? '痛苦的'\n                  : '') +\n              `呼吸声，一边努力回应着${master_name}……`,\n          );",
    replace:
      '          const overwhelmed_by_tool =\n            era.get(`tequip:${target}:11`) ||\n            era.get(`tequip:${target}:13`) ||\n            era.get(`tequip:${target}:14`) ||\n            era.get(`tequip:${target}:15`) ||\n            era.get(`tequip:${target}:16`) ||\n            era.get(`tequip:${target}:17`);\n          const overwhelmed_by_pain =\n            era.get(`tequip:${target}:44`) || era.get(`tequip:${target}:49`);\n          await era.print(player_prefix + `${target_name}一边压抑着`); // 变异：拆回\n          if (overwhelmed_by_tool) {\n            await era.print(`快乐的`); // 变异：拆回\n          } else if (overwhelmed_by_pain) {\n            await era.print(`痛苦的`); // 变异：拆回\n          }\n          await era.print(`呼吸声，一边努力回应着${master_name}……`); // 变异：拆回',
    tests: ['kojo-k19-fia'],
    must_mention: '工具档与前后文落在同一行',
  },
  {
    desc: 'M12826 K19 交谈·PLAYER 前缀与尾段拆回两条（#625）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '          await era.print(\n            `${player_name}${target_name}一边与${master_name}说着话，一边对着${master_name}露出了重要的地方。`,\n          );',
    replace:
      '          await era.print(player_prefix); // 变异：拆回\n' +
      '          await era.print(\n' +
      '            `${target_name}一边与${master_name}说着话，一边对着${master_name}露出了重要的地方。`,\n' +
      '          ); // 变异：拆回',
    tests: ['kojo-k19-fia'],
    must_mention: 'PLAYER 前缀与尾段落在同一行',
  },
  {
    desc: 'M12827 K19 死斗场 SC31·武器名拆回四条（#625：武器名又占一行）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: "      await era.printAndWait(\n        `${assi_name}因为` +\n          (assi_has_penis ? '阴茎' : assi_has_toy ? '假阴茎' : '') +\n          `被${target_name}含住而露出了快乐的的表情……`,\n      );",
    replace:
      '      await era.print(`${assi_name}因为`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`阴茎`); // 变异：拆回\n' +
      '      } else if (assi_has_toy) {\n' +
      '        await era.print(`假阴茎`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(\n' +
      '        `被${target_name}含住而露出了快乐的的表情……`,\n' +
      '      ); // 变异：拆回',
    tests: ['kojo-k19-fia'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12828 K19 死斗场 SC21·武器名拆回四条（#625）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: "      await era.printAndWait(\n        `${assi_name}一边听着悲鸣，一边用` +\n          (assi_has_penis ? '肉棒' : assi_has_toy ? '假阴茎' : '') +\n          `毫不留情的继续蹂躏着${target_name}的腔内……`,\n      );",
    replace:
      '      await era.print(`${assi_name}一边听着悲鸣，一边用`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`肉棒`); // 变异：拆回\n' +
      '      } else if (assi_has_toy) {\n' +
      '        await era.print(`假阴茎`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`毫不留情的继续蹂躏着${target_name}的腔内……`); // 变异：拆回',
    tests: ['kojo-k19-fia'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12829 K19 死斗场 SC27·武器名拆回四条（#625）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: "      await era.printAndWait(\n        `${assi_name}一边听着悲鸣，一边用` +\n          (assi_has_penis ? '肉棒' : assi_has_toy ? '假阴茎' : '') +\n          `毫不留情的继续蹂躏着${target_name}的肛门……`,\n      );",
    replace:
      '      await era.print(`${assi_name}一边听着悲鸣，一边用`); // 变异：拆回\n' +
      '      if (assi_has_penis) {\n' +
      '        await era.print(`肉棒`); // 变异：拆回\n' +
      '      } else if (assi_has_toy) {\n' +
      '        await era.print(`假阴茎`); // 变异：拆回\n' +
      '      }\n' +
      '      await era.printAndWait(`毫不留情的继续蹂躏着${target_name}的肛门……`); // 变异：拆回',
    tests: ['kojo-k19-fia'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12830 K19 褒美请求·兽名拆回三条（#625：空首尾又各占一行）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '    await era.printAndWait(beast_word);',
    replace:
      "    await era.print(''); // 变异：拆回\n" +
      '    await era.print(beast_word); // 变异：拆回\n' +
      "    await era.printAndWait(''); // 变异：拆回",
    tests: ['kojo-k19-fia'],
    must_mention: '空首尾不再各占一行',
  },
  {
    desc: 'M12840 K13 正常位恳求·三档拆回多条（#625：恳求段又占一行）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '            await era.printAndWait(\n              `「亲爱的…请原谅……` +\n                (rand_n(3) == 0\n                  ? `啊啊啊…`\n                  : rand_n(2) == 0\n                    ? `不行…`\n                    : `噫噫…`) +\n                `${heart(3)}」`,\n            );',
    replace:
      '            await era.print(`「亲爱的…请原谅……`); // 变异：拆回\n' +
      '            if (rand_n(3) == 0) {\n' +
      '              await era.print(`啊啊啊…`); // 变异：拆回\n' +
      '            } else if (rand_n(2) == 0) {\n' +
      '              await era.print(`不行…`); // 变异：拆回\n' +
      '            } else {\n' +
      '              await era.print(`噫噫…`); // 变异：拆回\n' +
      '            }\n' +
      '            await era.printAndWait(`${heart(3)}」`); // 变异：拆回',
    tests: ['kojo-k13-protector'],
    must_mention: '恳求段与收行落在同一行',
  },
  {
    desc: 'M12841 K13 背后位·把…弄乱拆回三条（#625：把…段又占一行）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '              await era.printAndWait(\n                moan_front +\n                  moan_act +\n                  moan_pat +\n                  `……` +\n                  `把${sc()}` +\n                  (rand_n(2) == 0 ? `弄得乱七八糟的` : `插得更加乱七八糟`) +\n                  `${heart(3)}」`,\n              );',
    replace:
      '              await era.print(\n' +
      '                moan_front + moan_act + moan_pat + `……`,\n' +
      '              ); // 变异：拆回\n' +
      '              await era.print(\n' +
      '                `把${sc()}` +\n' +
      '                  (rand_n(2) == 0 ? `弄得乱七八糟的` : `插得更加乱七八糟`),\n' +
      '              ); // 变异：拆回\n' +
      '              await era.printAndWait(`${heart(3)}」`); // 变异：拆回',
    tests: ['kojo-k13-protector'],
    must_mention: ':1675 组必须出声',
  },
  {
    desc: 'M12842 K13 背后位恳求·三档拆回多条（#625）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '            await era.printAndWait(\n              `「亲爱的…请原谅……` +\n                (rand_n(3) == 0\n                  ? `啊啊啊啊啊`\n                  : rand_n(2) == 0\n                    ? `不行`\n                    : `噫噫`) +\n                `${heart(3)}」`,\n            );',
    replace:
      '            await era.print(`「亲爱的…请原谅……`); // 变异：拆回\n' +
      '            if (rand_n(3) == 0) {\n' +
      '              await era.print(`啊啊啊啊啊`); // 变异：拆回\n' +
      '            } else if (rand_n(2) == 0) {\n' +
      '              await era.print(`不行`); // 变异：拆回\n' +
      '            } else {\n' +
      '              await era.print(`噫噫`); // 变异：拆回\n' +
      '            }\n' +
      '            await era.printAndWait(`${heart(3)}」`); // 变异：拆回',
    tests: ['kojo-k13-protector'],
    must_mention: '恳求段与收行落在同一行',
  },
  {
    desc: 'M12843 K13 NTR·前缀与再生处女膜拆回两条（#625）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: "        await era.printAndWait(\n          `狂王毫不介意${sc()}的话、邪笑了起来、将` +\n            (king_has_penis ? '胯下的巨根' : '极粗的假阳具') +\n            `刺穿了` +\n            `由魔王再生的处女膜。`,\n        );",
    replace:
      '        await era.print(\n' +
      '          `狂王毫不介意${sc()}的话、邪笑了起来、将` +\n' +
      "            (king_has_penis ? '胯下的巨根' : '极粗的假阳具') +\n" +
      '            `刺穿了`,\n' +
      '        ); // 变异：拆回\n' +
      '        await era.printAndWait(`由魔王再生的处女膜。`); // 变异：拆回',
    tests: ['kojo-k13-protector'],
    must_mention: '前缀段与收行同属一行',
  },
  {
    desc: 'M12844 K13 NTR·冷笑与一口气刺穿拆回三条（#625：武器名又占一行）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '      await era.print(\n        `狂王冷笑了一番、蹂躏了一番${sc()}的屁股、将` +\n          (king_has_penis ? `胯下的巨根` : `取出的极粗假阳具`) +\n          `一口气刺穿了`,\n      );',
    replace:
      '      await era.print(`狂王冷笑了一番、蹂躏了一番${sc()}的屁股、将`); // 变异：拆回\n' +
      '      await era.print(king_has_penis ? `胯下的巨根` : `取出的极粗假阳具`); // 变异：拆回\n' +
      '      await era.print(`一口气刺穿了`); // 变异：拆回',
    tests: ['kojo-k13-protector'],
    must_mention: ':5547 组是一行',
  },
  {
    desc: 'M12845 K13 NTR·处女膜段与赤印拆回两条（#625）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '      await era.print(\n        (regen_hymen\n          ? `由魔王再生的处女膜、`\n          : `尚未经人事的小穴、蛮横地抽插着、`) + `纯洁的赤印将地板染红了。`,\n      );',
    replace:
      '      await era.print(\n' +
      '        regen_hymen\n' +
      '          ? `由魔王再生的处女膜、`\n' +
      '          : `尚未经人事的小穴、蛮横地抽插着、`,\n' +
      '      ); // 变异：拆回\n' +
      '      await era.print(`纯洁的赤印将地板染红了。`); // 变异：拆回',
    tests: ['kojo-k13-protector'],
    must_mention: ':5557 组是一行',
  },
  {
    desc: 'M12846 K13 NTR·亲密接触整行拆回多条（#625）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: "      await era.printAndWait(\n        (has_hymen ? `（老公……抱歉……最终还是……）` : '') +\n          `不仅无视了伴随着呜咽声求饶的${sc()}、狂王还愉快地将` +\n          (king_has_penis ? `腰` : `极粗假阳具`) +\n          `与${a_name}亲密接触的模样记录在了水晶球中。`,\n      );",
    replace:
      "      await era.print(has_hymen ? `（老公……抱歉……最终还是……）` : ''); // 变异：拆回\n" +
      '      await era.print(`不仅无视了伴随着呜咽声求饶的${sc()}、狂王还愉快地将`); // 变异：拆回\n' +
      '      await era.print(king_has_penis ? `腰` : `极粗假阳具`); // 变异：拆回\n' +
      '      await era.printAndWait(`与${a_name}亲密接触的模样记录在了水晶球中。`); // 变异：拆回',
    tests: ['kojo-k13-protector'],
    must_mention: ':5563 组是一行',
  },
  {
    desc: 'M12847 K13 NTR P==4·昂与比魔王大人拆回三条（#625）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: "      await era.print(\n        `「昂${heart(1)}　` +\n          (has_hymen ? `比那个人、` : '') +\n          `比魔王大人${heart(3)}」`,\n      );",
    replace:
      '      await era.print(`「昂${heart(1)}　`); // 变异：拆回\n' +
      "      await era.print(has_hymen ? `比那个人、` : ''); // 变异：拆回\n" +
      '      await era.print(`比魔王大人${heart(3)}」`); // 变异：拆回',
    tests: ['kojo-k13-protector'],
    must_mention: ':5593 组是一行',
  },
  {
    desc: 'M12848 K13 褒美请求·兽名拆回三条（#625：兽名与前后文又各占一行）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '    await era.printAndWait(`${a_name}要求奖励与` + beast_word + `交尾`);',
    replace:
      '    await era.print(`${a_name}要求奖励与`); // 变异：拆回\n' +
      '    await era.print(beast_word); // 变异：拆回\n' +
      '    await era.printAndWait(`交尾`); // 变异：拆回',
    tests: ['kojo-k13-protector'],
    must_mention: '兽名与前后文落在同一行',
  },
  {
    desc: 'M12849 K5 交谈·自我介绍拆回三条（#625：自白段又占一行）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: "          // 语句外当取值，文本留在输出语句里（#625）\n          const masturbation_note = era.get(`abl:${target}:31`) >= 3;\n          await era.print(\n            `${target_name}将自己的本名和接下来要进行的性体验` +\n              (masturbation_note ? `、甚至是连自慰时妄想的事情` : '') +\n              `十分欣喜地全部说了出来……`,\n          );",
    replace:
      '          // 语句外当取值，文本留在输出语句里（#625）\n          const masturbation_note = era.get(`abl:${target}:31`) >= 3;\n          await era.print(`${target_name}将自己的本名和接下来要进行的性体验`); // 变异：拆回\n          if (masturbation_note) {\n            await era.print(`、甚至是连自慰时妄想的事情`); // 变异：拆回\n          }\n          await era.print(`十分欣喜地全部说了出来……`); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '名字段与后文落在同一行',
  },
  {
    desc: 'M12850 K5 交谈二次·自我介绍拆回三条（#625）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: "          // 同一行输出：无后缀 PRINTFORM 连续不换行，末行\n          // PRINTFORML 才收行。SIF ABL:31 >= 3 只护住前段——条件提到\n          // 语句外当取值，文本留在输出语句里（#625）\n          const masturbation_note = era.get(`abl:${target}:31`) >= 3;\n          await era.print(\n            `${target_name}将自己的本名和接下来要进行的性体验` +\n              (masturbation_note ? `、甚至是连自慰时妄想的事情` : '') +\n              `十分欣喜地全部说了出来……`,\n          );",
    replace:
      '          // 同组的一整行（#625）\n          const masturbation_note = era.get(`abl:${target}:31`) >= 3;\n          await era.print(`${target_name}将自己的本名和接下来要进行的性体验`); // 变异：拆回\n          if (masturbation_note) {\n            await era.print(`、甚至是连自慰时妄想的事情`); // 变异：拆回\n          }\n          await era.print(`十分欣喜地全部说了出来……`); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '名字段与后文落在同一行',
  },
  {
    desc: 'M12851 K5 交谈·发出了…的声音拆回三条（#625：工具档又占一行）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: "          await era.print(\n            maid_front +\n              `向少女搭话后、${target_name}发出了` +\n              (overwhelmed_by_tool\n                ? `快乐的`\n                : overwhelmed_by_pain\n                  ? `痛苦的`\n                  : '') +\n              `的声音、拼命地向着${player_name}说了起来`,\n          );",
    replace:
      '          await era.print(maid_front + `向少女搭话后、${target_name}发出了`); // 变异：拆回\n' +
      '          await era.print(overwhelmed_by_tool ? `快乐的` : overwhelmed_by_pain ? `痛苦的` : ``); // 变异：拆回\n' +
      '          await era.print(`的声音、拼命地向着${player_name}说了起来`); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '前缀与工具档、前后文落在同一行',
  },
  {
    desc: 'M12852 K5 交谈二次·发出了…的声音拆回三条（#625）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: "          await era.print(\n            maid_front_4858 +\n              `向少女搭话后，${target_name}发出了` +\n              (overwhelmed_by_tool\n                ? `快乐的`\n                : overwhelmed_by_pain\n                  ? `痛苦的`\n                  : '') +\n              `的声音、拼命地向着${player_name}说了起来`,\n          );",
    replace:
      '          await era.print(maid_front_4858 + `向少女搭话后，${target_name}发出了`); // 变异：拆回\n' +
      '          await era.print(overwhelmed_by_tool ? `快乐的` : overwhelmed_by_pain ? `痛苦的` : ``); // 变异：拆回\n' +
      '          await era.print(`的声音、拼命地向着${player_name}说了起来`); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '前缀与工具档、前后文落在同一行',
  },
  {
    desc: 'M12853 K5 六九式初回·淫乱拆回三条（#625：武器名又占一行）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '        await era.printAndWait(\n          `「啊嗯~…更加地…玩弄那里嘛~…那样的话我就会好好地吸主人的` +\n            (player_has_penis ? `大鸡巴` : `花蕾`) +\n            `的啦~${heart(1)}」`,\n        );',
    replace:
      '        await era.print(\n' +
      '          `「啊嗯~…更加地…玩弄那里嘛~…那样的话我就会好好地吸主人的`,\n' +
      '        ); // 变异：拆回\n' +
      '        await era.print(player_has_penis ? `大鸡巴` : `花蕾`); // 变异：拆回\n' +
      '        await era.printAndWait(`的啦~${heart(1)}」`); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '整行拼接「假阳具」',
  },
  {
    desc: 'M12854 K5 六九式初回·爱慕拆回四条（#625）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '        await era.printAndWait(\n          `${target_name}吮吸起${player_name}的` +\n            (player_has_penis\n              ? `阴茎`\n              : player_has_toy && rand_n(3) === 0\n                ? `假阳具`\n                : `阴唇`) +\n            `，而${player_name}也没有停下来继续着口腔侍奉。`,\n        );\n      } else if (era.get(`abl:${target}:16`) >= 3) {',
    replace:
      '        await era.print(`${target_name}吮吸起${player_name}的`); // 变异：拆回\n        await era.print(\n          player_has_penis\n            ? `阴茎`\n            : player_has_toy && rand_n(3) === 0\n              ? `假阳具`\n              : `阴唇`,\n        ); // 变异：拆回\n        await era.printAndWait(`，而${player_name}也没有停下来继续着口腔侍奉。`); // 变异：拆回\n      } else if (era.get(`abl:${target}:16`) >= 3) {',
    tests: ['kojo-k5-mao'],
    must_mention: '整行拼接「假阳具」',
  },
  {
    desc: 'M12855 K5 六九式二回目·爱慕拆回四条（#625）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '        await era.printAndWait(\n          `${target_name}吮吸起${player_name}的` +\n            (player_has_penis\n              ? `阴茎`\n              : player_has_toy && rand_n(3) === 0\n                ? `假阳具`\n                : `阴唇`) +\n            `，而${player_name}也没有停下来继续着口腔侍奉。`,\n        );\n        await era.printAndWait(',
    replace:
      '        await era.print(`${target_name}吮吸起${player_name}的`); // 变异：拆回\n        await era.print(\n          player_has_penis\n            ? `阴茎`\n            : player_has_toy && rand_n(3) === 0\n              ? `假阳具`\n              : `阴唇`,\n        ); // 变异：拆回\n        await era.printAndWait(`，而${player_name}也没有停下来继续着口腔侍奉。`); // 变异：拆回\n        await era.printAndWait(',
    tests: ['kojo-k5-mao'],
    must_mention: '整行拼接「假阳具」',
  },
  {
    desc: 'M12856 K5 死斗场 SC31·武器名拆回三条（#625：武器名又占一行）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: "      await era.printAndWait(\n        `舔着${assi_name}的` +\n          (assi_has_penis ? `阴茎` : assi_has_toy ? `假阳具` : '') +\n          `${target_name}露出心旷神怡的表情……`,\n      );",
    replace:
      '      await era.print(`舔着${assi_name}的`); // 变异：拆回\n' +
      '      await era.print(assi_has_penis ? `阴茎` : assi_has_toy ? `假阳具` : ``); // 变异：拆回\n' +
      '      await era.printAndWait(`${target_name}露出心旷神怡的表情……`); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12857 K5 死斗场 SC21·武器名拆回三条（#625）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: "      await era.printAndWait(\n        `${assi_name}一边听着哀嚎` +\n          (assi_has_penis ? `阴茎` : assi_has_toy ? `假阳具` : '') +\n          `继续毫不留情地蹂躏着${target_name}的阴道……`,\n      );",
    replace:
      '      await era.print(`${assi_name}一边听着哀嚎`); // 变异：拆回\n' +
      '      await era.print(assi_has_penis ? `阴茎` : assi_has_toy ? `假阳具` : ``); // 变异：拆回\n' +
      '      await era.printAndWait(`继续毫不留情地蹂躏着${target_name}的阴道……`); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12858 K5 死斗场 SC27·武器名拆回三条（#625）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: "      await era.printAndWait(\n        `${assi_name}一边听着哀嚎` +\n          (assi_has_penis ? `阴茎` : assi_has_toy ? `假阳具` : '') +\n          `继续毫不留情地蹂躏着${target_name}的肛门……`,\n      );",
    replace:
      '      await era.print(`${assi_name}一边听着哀嚎`); // 变异：拆回\n' +
      '      await era.print(assi_has_penis ? `阴茎` : assi_has_toy ? `假阳具` : ``); // 变异：拆回\n' +
      '      await era.printAndWait(`继续毫不留情地蹂躏着${target_name}的肛门……`); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '武器名与前后文落在同一行',
  },
  {
    desc: 'M12859 K5 褒美请求·兽名拆回三条（#625：兽名与前后文又各占一行）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '    await era.printAndWait(\n      `「如果打倒勇者姐姐的话请给我奖赏、好想和` + beast_word + `做爱啊♪」`,\n    );',
    replace:
      '    await era.print(`「如果打倒勇者姐姐的话请给我奖赏、好想和`); // 变异：拆回\n' +
      '    await era.print(beast_word); // 变异：拆回\n' +
      '    await era.printAndWait(`做爱啊♪」`); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '兽名与前后文落在同一行',
  },
  {
    desc: 'M12860 K5 交谈·前缀行（该分支）拆回两条（#625：前缀又单独占一行）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '          await era.print(\n            `${player_name}向少女搭话后、${target_name}晃动着腰部说起了充满爱意的话语`,\n          );',
    replace:
      '          await era.print(`${player_name}`); // 变异：拆回\n' +
      '          await era.print(\n' +
      '            `向少女搭话后、${target_name}晃动着腰部说起了充满爱意的话语`,\n' +
      '          ); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '前缀与分支文本落在同一行',
  },
  {
    desc: 'M12861 K5 交谈二次·前缀行（该分支）拆回两条（#625）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '          await era.print(\n            `${player_name}向少女搭话后，${target_name}晃动着腰部说起了充满爱意的话语`,\n          );',
    replace:
      '          await era.print(`${player_name}`); // 变异：拆回\n' +
      '          await era.print(\n' +
      '            `向少女搭话后，${target_name}晃动着腰部说起了充满爱意的话语`,\n' +
      '          ); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '前缀与分支文本落在同一行',
  },
  {
    desc: 'M12862 K5 百合 PLAY·前缀与收行拆回两条（#625）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '          await era.printAndWait(\n            `${assi_name}看着那样的少女、感到很满意` +\n              `直到天黑一直都在玩弄着少女………`,\n          );',
    replace:
      '          await era.print(assi_front_6150); // 变异：拆回\n' +
      '          await era.printAndWait(`直到天黑一直都在玩弄着少女………`); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '前缀与收行落在同一行',
  },
  {
    desc: 'M12863 K13 哈啊…请您·整段拆回三条（#625：前缀与整段又各占一行）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '                await era.printAndWait(\n                  `「哈啊…请您` +\n                    (act_is_insert\n                      ? `抽插${sc()}的时候`\n                      : `侵犯${sc()}的时候`) +\n                    `${heart(1)}` +\n                    `……` +\n                    `再激烈一点…` +\n                    `才好啊${heart(3)}」`,\n                );',
    replace:
      '                await era.print(\n' +
      '                  `「哈啊…请您` +\n' +
      '                    (act_is_insert ? `抽插${sc()}的时候` : `侵犯${sc()}的时候`) +\n' +
      '                    `${heart(1)}`,\n' +
      '                ); // 变异：拆回\n' +
      '                await era.print(`……`); // 变异：拆回\n' +
      '                await era.printAndWait(`再激烈一点…才好啊${heart(3)}」`); // 变异：拆回',
    tests: ['kojo-k13-protector'],
    must_mention: '前缀与整段落在同一行',
  },
  {
    desc: 'M12864 K13 有感觉了什么的拆回两条（#625：前缀又单独占一行）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '            await era.printAndWait(`「有感觉了什么的……」`);',
    replace:
      '            await era.print(moan_front_1709); // 变异：拆回\n' +
      '            await era.printAndWait(`」`); // 变异：拆回',
    tests: ['kojo-k13-protector'],
    must_mention: '前缀与收行落在同一行',
  },
  {
    desc: 'M12865 K13 这副模样／好羞耻拆回三条（#625）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '          await era.printAndWait(\n            (shame_if ? `「这副模样……` : `「`) +\n              `好羞耻……` +\n              (shame_heart ? `啊啊${heart(3)}」` : `」`),\n          );',
    replace:
      '          await era.print(shame_if ? `「这副模样……` : `「`); // 变异：拆回\n' +
      '          await era.print(`好羞耻……`); // 变异：拆回\n' +
      '          await era.printAndWait(shame_heart ? `啊啊${heart(3)}」` : `」`); // 变异：拆回',
    tests: ['kojo-k13-protector'],
    must_mention: '头部与收尾落在同一行',
  },
  {
    desc: 'M12866 K5 交谈·下流的话语（该分支）拆回两条（#625：非首支又漏拼前缀）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '          await era.print(\n            maid_front +\n              `向少女搭话后、${target_name}一边晃着腰一边不停地说着下流的话语`,\n          );',
    replace:
      '          await era.print(maid_front); // 变异：拆回\n' +
      '          await era.print(\n' +
      '            `向少女搭话后、${target_name}一边晃着腰一边不停地说着下流的话语`,\n' +
      '          ); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '前缀与分支文本落在同一行',
  },
  {
    desc: 'M12867 K5 交谈二次·下流的话语（该分支）拆回两条（#625：非首支又漏拼前缀）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '          await era.print(\n            maid_front_4858 +\n              `向少女搭话后，${target_name}一边晃着腰一边不停地说着下流的话语`,\n          );',
    replace:
      '          await era.print(maid_front_4858); // 变异：拆回\n' +
      '          await era.print(\n' +
      '            `向少女搭话后，${target_name}一边晃着腰一边不停地说着下流的话语`,\n' +
      '          ); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '前缀与分支文本落在同一行',
  },
  {
    desc: 'M12868 K5 交谈·牢骚（该分支）拆回两条（#625：非首支又漏拼前缀）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '          await era.print(\n            maid_front +\n              `向少女搭话后、${target_name}如同打发无聊一样发起了牢骚`,\n          );',
    replace:
      '          await era.print(maid_front); // 变异：拆回\n' +
      '          await era.print(\n' +
      '            `向少女搭话后、${target_name}如同打发无聊一样发起了牢骚`,\n' +
      '          ); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '前缀与分支文本落在同一行',
  },
  {
    desc: 'M12869 K5 交谈二次·牢骚（该分支）拆回两条（#625：非首支又漏拼前缀）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '          await era.print(\n            maid_front_4858 +\n              `向少女搭话后，${target_name}如同打发无聊一样发起了牢骚`,\n          );',
    replace:
      '          await era.print(maid_front_4858); // 变异：拆回\n' +
      '          await era.print(\n' +
      '            `向少女搭话后，${target_name}如同打发无聊一样发起了牢骚`,\n' +
      '          ); // 变异：拆回',
    tests: ['kojo-k5-mao'],
    must_mention: '前缀与分支文本落在同一行',
  },
  // —— #557：重叠检测直接报错的调用点变异（与 M11427 同一目标、独立条目：
  // 那条守的是随机数/顺序断言，这条守夹具的重叠抛错本身）——
  {
    desc: 'M12356 强制肉偿调用点漏写 await（重叠检测直接报错：不等真身跑完，自慰判定与肉偿抢同一个输入，#557/#544）',
    file: 'ere/kojo/kojo-dungeon-bitch.js',
    find: '    // CALL 强制肉偿(ARG)\n    await forced_payment(arg, rand);',
    replace:
      '    // CALL 强制肉偿(ARG)\n    forced_payment(arg, rand); // 变异：漏 await',
    tests: ['kojo-forced-payment', 'kojo-dungeon-bitch'],
    must_mention: '疑似漏写 await',
  },

  {
    desc: "M15411 K7 录像自我介绍「初回・自我介绍」支退回 era.set('tflag:32 |', 2)（初回）",
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '          await era.print(`${target_name}向着水晶球做了自我介绍`);\n          game.kojo.录像内容 |= 2;\n        } else {\n          await era.print(`${target_name}头扭向一边什么都不说`);\n        }\n      } else {\n        // 同一行输出：无后缀 PRINTFORM 不换行，各支的',
    replace:
      "          await era.print(`${target_name}向着水晶球做了自我介绍`);\n          era.set('tflag:32 |', 2); // 变异：写到键「32 |」上\n        } else {\n          await era.print(`${target_name}头扭向一边什么都不说`);\n        }\n      } else {\n        // 同一行输出：无后缀 PRINTFORM 不换行，各支的",
    tests: ['kojo-k7-heart'],
    must_mention: '初回・自我介绍',
  },
  {
    desc: "M15412 K7 录像自我介绍「二回目・本名」支退回 era.set('tflag:32 |', 2)（二回目）",
    file: 'ere/kojo/kojo-k7-heart.js',
    find: "              (recall_dirty_5470 ? `、甚至连自慰时妄想的内容都` : '') +\n              `高兴地讲了出来……`,\n          );\n          await era.print(\n            `一想到这个水晶球很快就会送往狂王大人的身边股间就湿了……`,\n          );\n          game.kojo.录像内容 |= 2;\n",
    replace:
      "              (recall_dirty_5470 ? `、甚至连自慰时妄想的内容都` : '') +\n              `高兴地讲了出来……`,\n          );\n          await era.print(\n            `一想到这个水晶球很快就会送往狂王大人的身边股间就湿了……`,\n          );\n          era.set('tflag:32 |', 2); // 变异：写到键「32 |」上\n",
    tests: ['kojo-k7-heart'],
    must_mention: '二回目・本名',
  },
  {
    desc: "M15413 K7 录像自我介绍「二回目・爱的话语」支退回 era.set('tflag:32 |', 2)（二回目）",
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '          await era.print(`${target_name}一边扭着腰一边向水晶球说着爱的话语`);\n          game.kojo.录像内容 |= 2;\n',
    replace:
      "          await era.print(`${target_name}一边扭着腰一边向水晶球说着爱的话语`);\n          era.set('tflag:32 |', 2); // 变异：写到键「32 |」上\n",
    tests: ['kojo-k7-heart'],
    must_mention: '二回目・爱的话语',
  },
  {
    desc: "M15414 K7 录像自我介绍「二回目・下流的词语」支退回 era.set('tflag:32 |', 2)（二回目）",
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '            `${target_name}一边扭着腰一边向水晶球喊出了下流的词语`,\n          );\n          game.kojo.录像内容 |= 2;\n',
    replace:
      "            `${target_name}一边扭着腰一边向水晶球喊出了下流的词语`,\n          );\n          era.set('tflag:32 |', 2); // 变异：写到键「32 |」上\n",
    tests: ['kojo-k7-heart'],
    must_mention: '二回目・下流的词语',
  },
  {
    desc: "M15415 K7 录像自我介绍「二回目・下流的话」支退回 era.set('tflag:32 |', 2)（二回目）",
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '          await era.print(`${target_name}向着水晶球开始说出了下流的话`);\n          game.kojo.录像内容 |= 2;\n        } else if (\n          era0(`talent:${target}:85`) ||\n          era0(`abl:${target}:10`) >= 3 ||\n          era0(`abl:${target}:11`) >= 4 ||\n          era0(`abl:${target}:17`) >= 2\n        ) {\n          await era.print(`${target_name}向着水晶球做了自我介绍`);\n          game.kojo.录像内容 |= 2;\n        } else {\n          await era.print(`${target_name}头扭向一边什么都不说`);\n        }\n      } else {\n        // 同一行：前缀提到语句外共用，',
    replace:
      "          await era.print(`${target_name}向着水晶球开始说出了下流的话`);\n          era.set('tflag:32 |', 2); // 变异：写到键「32 |」上\n        } else if (\n          era0(`talent:${target}:85`) ||\n          era0(`abl:${target}:10`) >= 3 ||\n          era0(`abl:${target}:11`) >= 4 ||\n          era0(`abl:${target}:17`) >= 2\n        ) {\n          await era.print(`${target_name}向着水晶球做了自我介绍`);\n          game.kojo.录像内容 |= 2;\n        } else {\n          await era.print(`${target_name}头扭向一边什么都不说`);\n        }\n      } else {\n        // 同一行：前缀提到语句外共用，",
    tests: ['kojo-k7-heart'],
    must_mention: '二回目・下流的话',
  },
  {
    desc: 'M15416 K7 录像自我介绍「二回目・自我介绍」支改成直接赋值（冲掉处女丧失位）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '          await era.print(`${target_name}向着水晶球做了自我介绍`);\n          game.kojo.录像内容 |= 2;\n        } else {\n          await era.print(`${target_name}头扭向一边什么都不说`);\n        }\n      } else {\n        // 同一行：前缀提到语句外共用，',
    replace:
      '          await era.print(`${target_name}向着水晶球做了自我介绍`);\n          game.kojo.录像内容 = 2; // 变异：冲掉别的位\n        } else {\n          await era.print(`${target_name}头扭向一边什么都不说`);\n        }\n      } else {\n        // 同一行：前缀提到语句外共用，',
    tests: ['kojo-k7-heart'],
    must_mention: '二回目・自我介绍',
  },
  {
    desc: 'M15417 K1 助手 17 号判断退回读 no:${assi}（取到第 assi+1 个加入的角色）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '  } else if (assi === 17) {',
    replace: '  } else if ((era.get(`no:${assi}`) || assi) === 17) {',
    tests: ['kojo-k1-confident'],
    must_mention: '助手专属台词按助手自己的 ID 判断 17 号',
  },
  {
    desc: 'M15550 口上基类默认值被改（benki_koujo 默认 return 1）',
    file: 'ere/kojo/kojo-base.js',
    find: '  async benki_koujo() {\n    return 0;\n  }',
    replace:
      '  async benki_koujo() {\n    return 1; // 变异：默认值不是「不输出」\n  }',
    tests: ['kojo-base-factory'],
    must_mention: '的默认值',
  },
  {
    desc: 'M15551 口上工厂丢掉实例缓存（每次新建，钩子上的状态不共享）',
    file: 'ere/kojo/kojo-factory.js',
    find: '  obj_dict.set(id, instance);',
    replace: '  // 变异：不缓存实例',
    tests: ['kojo-base-factory'],
    must_mention: '同一编号复用实例',
  },
  {
    desc: 'M15553 口上工厂重复注册不报错（后注册的静默遮蔽前一个）',
    file: 'ere/kojo/kojo-factory.js',
    find: '  if (cons_dict.has(id)) {\n    throw new Error(`口上编号 ${id} 重复注册（同名遮蔽，启动期即报）`);\n  }',
    replace: '  // 变异：重复注册不报错',
    tests: ['kojo-base-factory'],
    must_mention: '重复注册',
  },
  {
    desc: 'M15554 口上工厂不校验基类继承（缺钩子的类也能注册）',
    file: 'ere/kojo/kojo-factory.js',
    find: "  if (typeof Ctor !== 'function' || !(Ctor.prototype instanceof KojoBase)) {",
    replace: "  if (typeof Ctor !== 'function') {",
    tests: ['kojo-base-factory'],
    must_mention: '必须继承 KojoBase',
  },
  {
    desc: 'M15555 口上工厂不校验编号是整数',
    file: 'ere/kojo/kojo-factory.js',
    find: '  if (!Number.isInteger(id)) {\n    throw new TypeError(`口上编号必须是整数，收到 ${id}`);\n  }',
    replace: '  // 变异：不校验编号',
    tests: ['kojo-base-factory'],
    must_mention: '必须是整数',
  },
  {
    desc: 'M15556 基类模板方法跳过七道头部检查（直接进指令分支）',
    file: 'ere/kojo/kojo-base.js',
    find: '    if (!(await this.header_checks(rand))) {\n      return 0;\n    }',
    replace: '    // 变异：跳过头部检查',
    tests: ['kojo-k4-stoic'],
    must_mention: '口塞（TEQUIP:45 且非指令45）：静默跳过',
  },
  {
    desc: 'M15557 基类头部检查默认不放行（所有未覆盖的性格一律不响）',
    file: 'ere/kojo/kojo-base.js',
    find: '  async header_checks() {\n    return true;\n  }',
    replace:
      '  async header_checks() {\n    return false; // 变异：默认不放行\n  }',
    tests: ['kojo-base-factory'],
    must_mention: '头部检查默认放行',
  },
  {
    desc: 'M15558 K4 的 select_com 不转交本体（指令口上集体失声）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '  async select_com(rand) {\n    return kojo_message_com_4(rand);\n  }',
    replace: '  async select_com(rand) {\n    return 0; // 变异：不转交\n  }',
    tests: ['kojo-k4-stoic'],
    must_mention:
      '爱撫初回（CFLAG:301 == 0 且 MARK:2 < 2）：一句拒绝 + 推进到 1',
  },
  {
    desc: 'M15559 K4 不进工厂（run_kojo 找不到实例，回落旧族）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: 'register_kojo(4, KojoK4);',
    replace: '// 变异：K4 不进工厂',
    tests: ['kojo-base-factory'],
    must_mention: 'K4 注册进了工厂',
  },
  {
    desc: 'M15562 run_kojo 钩子名错用（恒调 select_com，其余钩子永不执行）',
    file: 'ere/kojo/kojo-system.js',
    find: '  return kojo[hook](...hook_args);',
    replace: '  return kojo.select_com(...hook_args); // 变异：钩子名错用',
    tests: ['kojo-base-factory'],
    must_mention: '钩子实参与入口语义一致',
  },
  // —— #855：K0/K1/K2/K3/K5 迁成口上子类（族注册转发到工厂实例） ——
  {
    desc: 'M15564 K0 不进工厂（run_kojo 找不到实例，K0 的口上整体回落旧族）',
    file: 'ere/kojo/kojo-k0-tender.js',
    find: 'register_kojo(0, KojoK0);',
    replace: '// 变异：K0 不进工厂',
    tests: ['kojo-classes-k0-k5'],
    must_mention: 'kojo[0] 不是 KojoK0',
  },
  {
    desc: 'M15566 K5 的 select_com 不转交本体（指令口上集体失声）',
    file: 'ere/kojo/kojo-k5-mao.js',
    find: '  async select_com(...args) {\n    return kojo_message_com_5(...args);\n  }',
    replace: '  async select_com() {\n    return 0; // 变异：不转交\n  }',
    tests: ['kojo-classes-k0-k5'],
    must_mention: '缺转交方法',
  },
  {
    desc: 'M15567 K1 的语尾钩子不转交（语尾恒空串，调用方那一行照常结束）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: '  async gobi_koujo(...args) {\n    return gobi_koujo_k1(...args);\n  }',
    replace: "  async gobi_koujo() {\n    return ''; // 变异：不转交\n  }",
    tests: ['kojo-classes-k0-k5'],
    must_mention: '缺转交方法',
  },
  // —— #856：K6/K7/K8/K9/K10 迁成口上子类（族注册转发到工厂实例） ——
  {
    desc: 'M15570 K6 不进工厂（run_kojo 找不到实例，K6 的口上整体回落旧族）',
    file: 'ere/kojo/kojo-k6-wicked.js',
    find: 'register_kojo(6, KojoK6);',
    replace: '// 变异：K6 不进工厂',
    tests: ['kojo-classes-k6-k10'],
    must_mention: 'kojo[6] 不是 KojoK6',
  },
  {
    desc: 'M15572 K10 的 select_com 不转交本体（指令口上集体失声）',
    file: 'ere/kojo/kojo-k10-club.js',
    find: '  async select_com(...args) {\n    return kojo_message_com_10(...args);\n  }',
    replace: '  async select_com() {\n    return 0; // 变异：不转交\n  }',
    tests: ['kojo-classes-k6-k10'],
    must_mention: '缺转交方法',
  },
  {
    desc: 'M15573 K9 的语尾钩子不转交（语尾恒空串，调用方那一行照常结束）',
    file: 'ere/kojo/kojo-k9-diamond.js',
    find: '  async gobi_koujo(...args) {\n    return gobi_koujo_k9(...args);\n  }',
    replace: "  async gobi_koujo() {\n    return ''; // 变异：不转交\n  }",
    tests: ['kojo-classes-k6-k10'],
    must_mention: '缺转交方法',
  },
  {
    desc: 'M15576 K8 的奖赏结算钩子丢了实参适配（随机源位不再留空，实参整体错位）',
    file: 'ere/kojo/kojo-k8-spade.js',
    find: '  async gohoubi_after_koujo(cid, choice) {\n    return gohoubi_after_koujo_k8(undefined, cid, choice);\n  }',
    replace:
      '  async gohoubi_after_koujo(cid, choice) {\n    return gohoubi_after_koujo_k8(cid, choice);\n  }',
    tests: ['kojo-classes-k6-k10'],
    must_mention: '的实参表须与迁移前的注册适配器一致',
  },
  // —— #857：K11/K12/K13/K14/K15/K903 迁口上子类 ——
  {
    desc: 'M15577 K12 不进工厂（run_kojo 找不到实例，K12 的口上整体回落旧族）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: 'register_kojo(12, KojoK12);',
    replace: '// 变异：K12 不进工厂',
    tests: ['kojo-classes-k11-k903'],
    must_mention: 'kojo[12] 不是 KojoK12',
  },
  {
    desc: 'M15579 K12 的 select_com 不转交本体（指令口上集体失声）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '  async select_com(...args) {\n    return kojo_message_com_12(...args);\n  }',
    replace: '  async select_com() {\n    return 0; // 变异：不转交\n  }',
    tests: ['kojo-classes-k11-k903'],
    must_mention: '应转交',
  },
  {
    desc: 'M15583 K15 不进工厂（run_kojo 找不到实例，K15 的口上整体回落旧族）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: 'register_kojo(15, KojoK15);',
    replace: '// 变异：K15 不进工厂',
    tests: ['kojo-classes-k11-k903'],
    must_mention: 'kojo[15] 不是 KojoK15',
  },
  {
    desc: 'M15584 K15 的指令分支钩子转交到迁移前的 COM 本体失败（改指别的本体）',
    file: 'ere/kojo/kojo-k15-clever.js',
    find: '  async select_com(...args) {\n    return kojo_message_com_15(...args);\n  }',
    replace:
      '  async select_com(...args) {\n    return k15_kojo2(...args);\n  }',
    tests: ['kojo-classes-k11-k903'],
    must_mention: '应转交',
  },
  {
    desc: 'M15585 K903 不进工厂（run_kojo 找不到实例，嘉德的口上整体回落旧族）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: 'register_kojo(903, KojoK903);',
    replace: '// 变异：K903 不进工厂',
    tests: ['kojo-classes-k11-k903'],
    must_mention: 'kojo[903] 不是 KojoK903',
  },
  {
    desc: 'M15586 K903 的惩罚结算钩子丢掉三参适配（族的两参直接顶进旧三参本体）',
    file: 'ere/kojo/kojo-k903-garde.js',
    find: '  async osioski_koujo(cid, choice) {\n    return osioki_koujo_k903(undefined, cid, choice);\n  }',
    replace:
      '  async osioski_koujo(cid, choice) {\n    return osioki_koujo_k903(cid, choice);\n  }',
    tests: ['kojo-classes-k11-k903'],
    must_mention: '应转交',
  },
  {
    desc: 'M15587 K11 不进工厂（run_kojo 找不到实例，莉莉的口上整体回落旧族）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: 'register_kojo(11, KojoK11);',
    replace: '// 变异：K11 不进工厂',
    tests: ['kojo-classes-k11-k903'],
    must_mention: 'kojo[11] 不是 KojoK11',
  },
  {
    desc: 'M15588 K11 的 NTR 钩子把族的两参顺序写反（rand 与 p 互换，口上按错的场景号分档）',
    file: 'ere/kojo/kojo-k11-lily.js',
    find: '  async ntr_koujo(...args) {\n    return ntr_koujo_k11(...args);\n  }',
    replace:
      '  async ntr_koujo(...args) {\n    return ntr_koujo_k11(...args.reverse());\n  }',
    tests: ['kojo-classes-k11-k903'],
    must_mention: '应转交',
  },
  {
    desc: 'M15589 K14 不进工厂（run_kojo 找不到实例，貴公子的口上整体回落旧族）',
    file: 'ere/kojo/kojo-k14-nobleman.js',
    find: 'register_kojo(14, KojoK14);',
    replace: '// 变异：K14 不进工厂',
    tests: ['kojo-classes-k11-k903'],
    must_mention: 'kojo[14] 不是 KojoK14',
  },
  {
    desc: 'M15581 K13 不进工厂（run_kojo 找不到实例，K13 的口上整体回落旧族）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: 'register_kojo(13, KojoK13);',
    replace: '// 变异：K13 不进工厂',
    tests: ['kojo-classes-k11-k903'],
    must_mention: 'kojo[13] 不是 KojoK13',
  },
  {
    desc: 'M15582 K13 的奖赏请求钩子丢了零参适配（族的 cid 被当成随机源传进本体）',
    file: 'ere/kojo/kojo-k13-protector.js',
    find: '  async gohoubi_request_koujo() {\n    return gohoubi_request_koujo_k13();\n  }',
    replace:
      '  async gohoubi_request_koujo(...args) {\n    return gohoubi_request_koujo_k13(...args);\n  }',
    tests: ['kojo-classes-k11-k903'],
    must_mention: '应转交',
  },
  {
    desc: 'M15580 K12 的奖赏结算钩子丢了实参适配（随机源位不再留空，实参整体错位）',
    file: 'ere/kojo/kojo-k12-intellectual.js',
    find: '  async gohoubi_after_koujo(cid, choice) {\n    return gohoubi_after_koujo_k12(undefined, cid, choice);\n  }',
    replace:
      '  async gohoubi_after_koujo(cid, choice) {\n    return gohoubi_after_koujo_k12(cid, choice);\n  }',
    tests: ['kojo-classes-k11-k903'],
    must_mention: '应转交',
  },
  // —— #817：处刑钩子从实参读处分方式，不再读 tflag ——
  {
    desc: 'M16009 K4 处刑口上：处分方式分档错位（6 → 4）',
    file: 'ere/kojo/kojo-k4-stoic.js',
    find: '  } else if (event_no == 6) {\n    await era.printAndWait(`「混蛋！给我记住！！………」`);',
    replace:
      '  } else if (event_no == 4) {\n    await era.printAndWait(`「混蛋！给我记住！！………」`);',
    tests: ['execution-params'],
    must_mention: 'K4 处刑 6',
  },
  {
    desc: 'M16010 K7 博物馆口上：展品编号分档错位（0 → 1）',
    file: 'ere/kojo/kojo-k7-heart.js',
    find: '  if (event_no == 0) {\n    await era.printAndWait(\n      `「啊…奇、奇怪，身体…身体动不了了…咕…啊…啊啊啊啊啊啊…啊………」`,\n    );',
    replace:
      '  if (event_no == 1) {\n    await era.printAndWait(\n      `「啊…奇、奇怪，身体…身体动不了了…咕…啊…啊啊啊啊啊啊…啊………」`,\n    );',
    tests: ['execution-params'],
    must_mention: 'K7 博物馆 0',
  },
  {
    desc: 'M16750 语尾取值：表外编号不再返回空串（K11 的语尾静默变成默认支文字）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "  if (row === undefined) {\n    return '';\n  }",
    replace:
      "  if (row === undefined) {\n    return '。'; // 变异：表外编号不再空串\n  }",
    tests: ['gobi-koujo-const'],
    must_mention: 'K11 没有语尾函数',
  },
  {
    desc: 'M16751 语尾取值：情绪档下标错位一格（arg0 - 1 改 arg0）',
    file: 'ere/data/gobi-koujo-const.js',
    find: '  const tier = row.tiers[arg0 - 1];',
    replace: '  const tier = row.tiers[arg0]; // 变异：档位错位一格',
    tests: ['kojo-gobi'],
    must_mention: 'K0 ARG:0 == 1',
  },
  {
    desc: 'M16752 语尾取值：默认支的随机序颠倒（先 RAND:2 再 RAND:3）',
    file: 'ere/data/gobi-koujo-const.js',
    find: '  if (rand_n(3) === 0) {\n    index = 0;\n  } else if (rand_n(2) === 0) {\n    index = 1;\n  }',
    replace:
      '  if (rand_n(2) === 0) {\n    index = 0;\n  } else if (rand_n(3) === 0) {\n    index = 1;\n  } // 变异：随机序颠倒',
    tests: ['gobi-koujo-const'],
    must_mention: '先掷 RAND:3 再掷 RAND:2',
  },
  {
    desc: 'M16753 语尾取值：单支也掷随机（K15 的源被多掷一次）',
    file: 'ere/data/gobi-koujo-const.js',
    find: '  if (texts.length === 1) {',
    replace: '  if (texts.length === 2) { // 变异：单支也掷随机',
    tests: ['gobi-koujo-const'],
    must_mention: 'K15 的随机源不得被掷',
  },
  {
    desc: 'M16754 语尾取值：%SELF_CALL% 不替换（占位符原样漏进行内）',
    file: 'ere/data/gobi-koujo-const.js',
    find: '  if (!text.includes(SELF_CALL_TOKEN)) {',
    replace: '  if (true) { // 变异：不替换占位符',
    tests: ['gobi-koujo-const'],
    must_mention: 'K19 怒档：缺省自称',
  },
  {
    desc: 'M16755 语尾取值：默认支第三支退到第二支（index 初值 2 改 1）',
    file: 'ere/data/gobi-koujo-const.js',
    find: '  let index = 2;',
    replace: '  let index = 1; // 变异：第三支退到第二支',
    tests: ['kojo-gobi'],
    must_mention: 'K0 默认支',
  },
  {
    desc: 'M16756 语尾取值：自称取错角色（era_flag.target 改常量 -1）',
    file: 'ere/data/gobi-koujo-const.js',
    find: '  const called = self_call(era_flag.target);',
    replace: '  const called = self_call(-1); // 变异：自称取错角色',
    tests: ['gobi-koujo-const'],
    must_mention: 'K19 怒档：CSTR:60 非空则用它',
  },
  {
    desc: 'M16757 语尾文字表：K15 的行被删（注册号与表行不再一一对应）',
    file: 'ere/data/gobi-koujo-const.js',
    find: "  15: {\n    tiers: ['♪', '！', '……。', '……。', '……。'],\n    fallback: ['。'],\n  },\n",
    replace: '',
    tests: ['gobi-koujo-const'],
    must_mention: '有语尾真身的编号必须与表行一一对应',
  },
  {
    // 「一个人会怎么写错」：读到 `TEQUIP:N === 0` 就把 0 当成「没装」之外的东西，
    // 把判等写反——尚未预置时代（夹具读 undefined）两种写法在测试里都恒假，
    // 预置后只有 `=== 0` 才命中真机的脱着一支（#977）。
    desc: 'M18448 K1 口塞脱着判等写反（`TEQUIP:45 === 0` 改 `!== 0`——真机的脱着支不再命中）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `    era_flag.selectcom === 45 &&
    era.get(\`tequip:\${target}:45\`) === 0`,
    replace: `    era_flag.selectcom === 45 &&
    era.get(\`tequip:\${target}:45\`) !== 0 // 变异：判等写反`,
    tests: ['kojo-k1-confident'],
    must_mention: '脱着台词（TEQUIP:45 由声明集预置 0）',
  },
  {
    // 同上：初吻那一支的 89/90 两格。夹着 talent:76 的上下文取唯一匹配
    // （同函数里还有一处结构相同的 85 分支）。
    desc: 'M18449 K1 淫乱初吻的 TEQUIP:89/90 判等写反（`=== 0` 改 `!== 0`）',
    file: 'ere/kojo/kojo-k1-confident.js',
    find: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era_flag.assiplay === 0 &&
        era.get(\`tequip:\${target}:89\`) === 0 &&
        era.get(\`tequip:\${target}:90\`) === 0`,
    replace: `        era.get(\`talent:\${target}:76\`) === 1 &&
        era_flag.assiplay === 0 &&
        era.get(\`tequip:\${target}:89\`) !== 0 && // 变异：判等写反
        era.get(\`tequip:\${target}:90\`) !== 0`,
    tests: ['kojo-k1-confident'],
    must_mention: 'TEQUIP:89/90 预置 0 → 淫乱初吻台词',
  },
  {
    // #934：第一轮扫描退回列头值 —— 与主循环的怪物号成两套量纲，
    // 「同一怪物再来」只剩怪物号恰为 100 时命中
    desc: 'M18423 凌辱畏怖扫描：MON_FEAR 退回列头值（列头与怪物号比较，累加恒不成立）',
    file: 'ere/kojo/kojo-dungeon-ravish.js',
    find: '        mon_fear = local_1; // 记忆中的怪物号',
    replace: '        mon_fear = mon_count * 100; // 变异：退回列头值',
    tests: ['kojo-dungeon-ravish'],
    must_mention: '同一怪物再来，畏怖计数递增到 3',
  },
  {
    // #934：哨兵退回 0 ——「没有记忆」与「记忆落在第 1 列」又撞在同一个值上
    desc: 'M18424 凌辱畏怖哨兵：无记忆的初值退回 0（与记忆落在第 1 列同值）',
    file: 'ere/kojo/kojo-dungeon-ravish.js',
    find: '  let mon_fear = -1;',
    replace: '  let mon_fear = 0; // 变异：哨兵退回 0',
    tests: ['kojo-dungeon-ravish'],
    must_mention: '凌辱畏怖记忆推进：CFLAG:130 = 怪物号',
  },
  {
    // #934：不同怪物分支也改写记忆（先出场的怪物会顶掉记忆里的那只）
    desc: 'M18425 凌辱畏怖分支：不同怪物也改写 CFLAG:130',
    file: 'ere/kojo/kojo-dungeon-ravish.js',
    find: '    } else if (row.rape_type > 0) {\n      // 不同怪物：只打台词，不动记忆\n      await era.printAndWait(`${monstername(local_1)}的凌辱开始了。`);',
    replace:
      '    } else if (row.rape_type > 0) {\n      // 变异：不同怪物也改写记忆\n      chara(arg).dungeon.凌辱畏怖记忆_怪物 = local_1;\n      await era.printAndWait(`${monstername(local_1)}的凌辱开始了。`);',
    tests: ['kojo-dungeon-ravish'],
    must_mention: '记忆仍是兽人——先出场的狗头人不得改写它',
  },
  {
    desc: 'M18426 凌辱畏怖计数：同一怪物再来的增量写错（+1 改 +2）',
    file: 'ere/kojo/kojo-dungeon-ravish.js',
    find: 'chara(arg).dungeon.凌辱畏怖计数 += 1; // CFLAG:131++',
    replace: 'chara(arg).dungeon.凌辱畏怖计数 += 2; // 变异：增量 +2',
    tests: ['kojo-dungeon-ravish'],
    must_mention: '畏怖计数递增到 3',
  },
  {
    desc: 'M18427 凌辱畏怖首次记忆：畏怖计数不清零（写 1）',
    file: 'ere/kojo/kojo-dungeon-ravish.js',
    find: '      chara(arg).dungeon.凌辱畏怖计数 = 0; // CFLAG:131',
    replace: '      chara(arg).dungeon.凌辱畏怖计数 = 1; // 变异：首次不清零',
    tests: ['kojo-dungeon-ravish'],
    must_mention: '第 1 场：首次记忆，计数 0',
  },
  // —— #858：菲娅 K19 迁成口上子类，K904 改为继承 K19（差异只剩三处） ——
  {
    desc: 'M18518 K19 的口上素质读错格（TALENT:179 改 178：K19 永远不认为自己是本口上）（#858）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '    return era.get(`talent:${target}:179`) == 1;',
    replace:
      '    return era.get(`talent:${target}:178`) == 1; // 变异：素质错格',
    tests: ['kojo-k19-fia', 'kojo-classes-k19-k904'],
    must_mention: 'K19 认 TALENT:179',
  },
  {
    desc: 'M18519 K19 的指令分支体不转交本体（select_com 直接返回 0：整段指令口上失声）（#858）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '  async select_com(...args) {\n    return kojo_message_com_19(...args);',
    replace:
      '  async select_com(...args) {\n    return 0; // 变异：指令分支不转交',
    tests: ['kojo-k19-fia', 'kojo-classes-k19-k904'],
    must_mention: '爱抚计数推进到 1',
  },
  {
    desc: 'M18520 K19 的语尾钩子不转交本体（gobi_koujo 返回空串）（#858）',
    file: 'ere/kojo/kojo-k19-fia.js',
    find: '  async gobi_koujo(...args) {\n    return gobi_koujo_k19(...args);',
    replace:
      "  async gobi_koujo(...args) {\n    return ''; // 变异：语尾不转交",
    tests: ['kojo-k19-fia', 'kojo-classes-k19-k904'],
    must_mention: '语尾返回文字',
  },
  {
    desc: 'M18522 K904 注册进工厂时退回父类（三处差异全丢：素质、存在标志、语尾）（#858）',
    file: 'ere/kojo/kojo-k904-fia.js',
    find: 'register_kojo(904, KojoK904);',
    replace: 'register_kojo(904, KojoK19); // 变异：K904 退回父类',
    tests: ['kojo-k19-fia', 'kojo-classes-k19-k904'],
    must_mention: '只有本套素质在身时才响',
  },
];
