/**
 * @file 迷宫凌辱事件——二十八函数的凌辱主框架与怪物文本（issue #182，阶段 3 H13）。
 *
 * 调用点：
 *   - ryouzyoku —— 迷宫战斗（#175 起真身内；FLAG:5 & 1 陵辱許可配置位内）
 *     ——战斗循环里勇者败北（DEATH_CHECK == 2）后进入。旧引擎函数开头
 *     `ARG = A`（A = 当前攻击者 = 勇者），ere 侧由 dungeon-battle.js 的
 *     ryouzyoku(atker) 显式传参。
 *   - pc_ryou —— 对人格斗（勇者队 vs 魔王队；FLAG:5 & 1 配置位内）
 *     败北演出。ARG:0 = 魔王側、ARG:1 = 勇者側。
 *   - victory_ryouzyoku —— 勇者胜利后——
 *     旧引擎 `ARG = -1` 缺省、`SIF ARG < 0 → ARG = A`，ere 侧由
 *     dungeon-battle.js 的 victory_ryouzyoku(atker) 显式传参。
 *   - DUNGEON_RYOUZYOKU_ESCAPE —— ryouzyoku 结尾（CALL
 *     DUNGEON_RYOUZYOKU_ESCAPE,ARG）——畏怖记忆的机会太少，追加逃跑分支。
 *
 * == 移植说明（有意偏离，均注明依据） ==
 *
 *   - **`MON_NUM = E:(B + 99)` 以参数注入**（#5 决议第六条「指针不隐式读
 *     全局」）：B 是 ryouzyoku 主循环的全局单字母变量（0/100/200，即
 *     三列怪物的队列号），`E:(B+99)` 是「该列怪物数量」（E:Y+99 == 数量）。
 *     E 表由迷宫战斗系统（H5/H6）建桶写入，ere 的 `era.get('e:99')`
 *     在桶缺失时报 key error（#183 引擎实测）；本文件各函数以 mon_num
 *     形参接收该值，由 ryouzyoku 分派时读出传入（#183 同款处置）。
 *     分派循环的 E 表读（E:MON_COUNT 怪物号 / E:(MON_COUNT+7) 凌辱类型 /
 *     E:(MON_COUNT+99) 数量）随本文件经 e_get 读——E 表由战斗系统
 *     建桶（yml/E.yml），e_get 读未写槽按 0 缺省。
 *   - **%SAVESTR:ARG% 经 chara_callname(arg) 承载**（#5 决议：SAVESTR 无
 *     引擎通道，#171 实测三段完全静默丢弃）：ARG 是参数角色号（被凌辱者），
 *     与口上文件的 TARGET 不同源，本文件用独立的 arg_name 变量。
 *   - **PRINTDATA/PRINTDATAW（DATAFORM 随机数组）**：旧引擎在块内随机取一
 *     条输出，此处改写成 `pick(list, rand_n(n))`——随机取一条（#117：无全局
 *     RAND 序列，随机经注入的 rand_n 掷出，测试注入定值序；#183 同款）。
 *   - **`JUEL:ARG:n += v` / `EXP:ARG:n += v` 转 era.add**：
 *     `era.add` 语义 = 引擎的 +=（juel-check.js 先例；#183 同款）。
 *   - **跨域写走门面（#71）**：exp/base/cflag 的裸写改
 *     `chara(arg).dungeon.*`（dungeon 域访问器）与 `chara(arg).train.*`
 *     （train 域访问器，如 初吻对象 cflag:16 / 初体验对象 cflag:15）与
 *     `chara(arg).invasion.*`（invasion 域访问器，如 状态 cflag:1 /
 *     回城标志 cflag:507）。cflag:130/131（凌辱畏怖记忆：130 = 被凌辱
 *     怪物 ID、131 = 畏怖计数）属 dungeon 域（ownership/cflag-ownership
 *     .yml "130-131" owner: dungeon），无门面访问器——#182 复核时经
 *     tools/facade-names.js 补名并 node tools/gen-facade.js --force 重生成，
 *     本文件读用裸寻址、写走门面（读放行 #70；写必须具名 #72）。
 *   - **CSTR:(ARG):3 = %SAVESTR:(ARG:0)%（初体验对象名）**：CSTR:3-4 属主
 *     train（ownership/cstr-ownership.yml），无既有门面访问器——经
 *     tools/facade-names.js 补名（初体验对象名）并重生成门面，
 *     `chara(arg1).train.初体验对象名 = name_of(arg0)`。
 *   - **`SIF CFLAG:16 == -1 → CFLAG:16 = 995`**：初吻对象标记（995 = 怪物
 *     的阴茎，#47 的 page-info-exp.js 值域注释）。CFLAG:16 是 train 域跨域
 *     写（#71 门面规则），但门面 getter 的 `|| 0` 会吞 -1（未经历）的取值，
 *     读用裸寻址 `era.get('cflag:${arg}:16') ?? 0`，写走门面
 *     `chara(arg).train.初吻对象 = 995`（#183 同款处置）。
 *   - **`CALL GOBI_KOUJO` 真身接通（#570）**：语尾口上分派（gobi_koujo）
 *     返回语尾文字——旧引擎里『猪…』整段是一行（PRINTFORM 夹两处
 *     GOBI 后 PRINTFORMW 收尾），ere 一次 print 即一行，故拼成整串一次
 *     printAndWait。分支 TALENT:17（プライド低い）→ 1 / 否则 5。
 *   - **`Y += 10` / `Y = 10` 是死代码**：Y 是旧引擎全局单字母变量（100000
 *     维），全库无初始化、函数内也无读取者（#183 同款处置）。
 *     ere 侧无单字母变量通道，注释保留不落变量。
 *   - **`WAIT` → `await era.waitAnyKey()`**（PRINTW 的等待语义，#73；
 *     enter-enemy.js 先例）。
 *   - **旁观凌辱 / 不要凌辱的选择项改 `era.printButton`**（#572，PR #53
 *     通则）：正文不写 [编号]（引擎按 showAcc 拼）、原文的「- 」照写；
 *     两处各两枚。旧引擎的
 *     `RESULT < 0 || RESULT >= 2 → GOTO INPUT_LOOP` 随白名单收紧（0/1）
 *     在实机上不可达，保留结构、不补用例（page-ability-up.js 同款）。
 *   - **`VIRGIN`（#DIM :3）是死变量**：声明并赋值（VIRGIN = TALENT:ARG:0）
 *     后全文件无读取，注释保留不落变量（与 #183 的 Y 同款判定）。
 *   - **`RAND:n` → rand_n(n)**（#117：随机源注入，缺省均匀随机）。
 *   - **`RAND:FEAR`（变量上界）** → `rand_n(fear)`——RAND 的
 *     变量参数写法（RAND(x) 取 [0, x)）；
 *     人工定 fear 变量（#183 的 MON_NUM 先例）。
 *   - **TALENT:ARG:种族 / 阴毛状态 / 魅力点 等中文下标**：yml/Talent.yml
 *     的名字表有「种族」（id 314）等条目，引擎列名寻址
 *     `talent:${cid}:种族` 可用（#183 引擎实测 setVar 通过中文名翻译）。
 *   - **`CALL DUNGEON_RYOUZYOKU` / `CALL DUNGEON_RYOUZYOKU_AFTER`**：口上前置/后置
 *     分派（TRYCALLFORM DUNGEON_RYOUZYOKU_K{LOCAL-100} /
 *     DUNGEON_RYOUZYOKU_AFTER_K{LOCAL-100}）。20 个角色口上文件定义了
 *     这些钩子（K0-K15/K19/K902-K904），随各自口上票实现；本文件用
 *     DispatchFamily 声明同款编号空间（普通口上 0-39 + EX 口上 901-1600），
 *     当前零注册 → 族调用返回 whenMissing（TRYCALL 落空语义），角色口上
 *     实现后在模块里 register。TARGET = ARG（分派前置 TARGET）经
 *     era_flag.target 设置——GET_KOJO_NUM 缺省读它。
 *   - **`CALL CHA_IMG2(ARG)` / `IF 立绘`**：立绘显示
 *     未移植（HTML_PRINT 无通道，dungeon-battle.js 同款）；
 *     `立绘` 是 SAVEDATA 开关（未入 yml），
 *     CHA_IMG2 无引擎通道。`IF 立绘` 分支保留结构注释、不移植调用。
 *   - **`CALL SHOW_DATA`**：角色状态显示
 *     已随 #390 实现，真身在
 *     ere/page/components/chara-data.js。
 *   - **`CALL EQUIP_DATABASE` 与 W:0/W:1 装备记录**：pc_ryou 的
 *     武器检查（W:0 = CFLAG:550 存储编号，素手时装剑 40；CALL
 *     EQUIP_DATABASE 填 W:1 识别号）。ERE 侧用 #174 真身
 *     equip_database(w)（ere/system/equip/equip-lookup.js），装备记录
 *     为普通对象（键 = W 列中文语义，#174 数据文件头注）；W:1 识别号
 *     49 = 触手武器分支。素手（存储编号 <= 0）时写入 CFLAG:550（chara
 *     域跨域写——cflag:550 属主 chara，无门面访问器，经
 *     tools/facade-names.js 补名「武器存储编号」并重生成门面）。
 *   - **`CALL MONSTER_DATA`**：pc_ryou 里裸 CALL（无实参，读
 *     全局 A/B/C 上下文）——此时 B/C 是上一段残留（pc_ryou 的
 *     分派上下文之外），函数体未消费其 RESULT（后续直接按 TALENT 分支）。
 *     #182 复核判为**死调用**（B/C 在该点无定义读取方、RESULT 无消费），
 *     注释保留不落调用（#103 的同款死调用判定）。
 *   - **`CALL CHECK_STATUS, ARG, 1`**：队伍伤势判定（#172 真身，
 *     ere/dungeon/dungeon.js 的 check_status）——返回 8 槽数组，RESULT:7
 *     = 队伍当前状态评级（> 9 时同伴无力救援）。
 *   - **`CALL KARMA, ARG, -10`**：善恶值增减（阶段 5 存根，
 *     ere/dungeon/dungeon.js 的 karma 存根，#172 登记）。
 *   - **`$INPUT_LOOP` / `INPUT` / `GOTO`**：旁观/不
 *     凌辱的选择循环。ERE 侧以 while 循环 + era.input() 重写（输入 < 0
 *     或 >= 2 重来；== 1 返回 0——page-save-load 的 input 先例）。
 *
 * == 与本文件同名的函数 ==
 *
 * H14（#183）的同名带「男」版前 11 段是 `@*_RYOU男`（带
 * 「男」字）——两组函数名不同，不触发 #12 的首个加载生效遮蔽。本文件
 * 的分派按 `TALENT:ARG:122`（男人）分发：为真 →
 * CALL *_RYOU男（H14 文件），否则 → CALL *_RYOU（本文件）。这张工单交付
 * 无「男」版 + 主框架（ryouzyoku / pc_ryou / victory_ryouzyoku /
 * *_ryou_yusya / dungeon_ryouzyoku_escape）。
 *
 * @module
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');
const { chara } = require('#/facade/chara');
const { show_data } = require('#/page/components/chara-data'); // #390 起真身
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const { get_kojo_num, in_kojo_window } = require('#/kojo/kojo-system');
const { e_get, e_set } = require('#/dungeon/monster-data');
const { monstername } = require('#/dungeon/monster-data');
const { equip_database } = require('#/system/equip/equip-lookup');
// 注意：check_status / karma 来自 #/dungeon/dungeon，而 dungeon.js 顶层
// require dungeon-battle/-battle2，后者将 require 本文件——顶层引用会成环。
// 本文件在函数体内延迟 require（dungeon-battle.js 的 karma 先例）。

/** PRINTDATA/PRINTDATAW 的随机取一条（DATAFORM 数组的等价物） */
function pick(list, rand_n) {
  return list[rand_n(list.length)];
}

/** 通用：取被凌辱者名字（%SAVESTR:ARG% 的等价物） */
function arg_name_of(arg) {
  return chara_callname(arg);
}

/**
 * SHE(ARG) 代词（%SHE(x)% 的等价物；魔改新增的三行
 * 纯函数，dungeon-battle.js 同款内联）。TALENT:122 = 男人 → 他，否则 她。
 * @param {number} cid 角色号
 * @returns {string}
 */
function she(cid) {
  return (era.get(`talent:${cid}:122`) || 0) !== 0 ? '他' : '她';
}

/**
 * 声明的编号空间：分发检查能拼出的全部
 * DUNGEON_RYOUZYOKU_K{N} / DUNGEON_RYOUZYOKU_AFTER_K{N} 名（与
 * kojo-system 的 KOJO_MESSAGE_COM 同款）。普通口上 0-39 + EX 口上
 * 901-1600；空间内缺失 = TRYCALL 落空（合法）。
 */
const DECLARED_KOJO_IDS = [
  ...Array.from({ length: 40 }, (_, i) => i),
  ...Array.from({ length: 700 }, (_, i) => i + 901),
];

/** DUNGEON_RYOUZYOKU_K{N} 族：凌辱前的角色口上钩子（口上票实现后注册） */
const ryouzyoku_kojo_family = new DispatchFamily(
  'DUNGEON_RYOUZYOKU_K',
  DECLARED_KOJO_IDS,
);

/** DUNGEON_RYOUZYOKU_AFTER_K{N} 族：凌辱后的角色口上钩子（口上票实现后注册） */
const ryouzyoku_after_kojo_family = new DispatchFamily(
  'DUNGEON_RYOUZYOKU_AFTER_K',
  DECLARED_KOJO_IDS,
);

/**
 * 迷宫凌辱两钩子的共同分发体：
 * `LOCAL = GET_KOJO_NUM()`（缺省读当前 TARGET——分派前已
 * `TARGET = ARG`，本分发体不碰 TARGET）→ 检查
 * `in_kojo_window(LOCAL)`（`LOCAL >= 100 && LOCAL < 140 || LOCAL > 1000`
 * ，全库只此一处定义，边界用例在 test/kojo-system.test.js）→
 * `TRYCALLFORM DUNGEON_RYOUZYOKU[_AFTER]_K{LOCAL - 100}`。
 * 存在判定在旧引擎里是注释态，不判。缺席语义 = 静默（TRYCALL 落空）。
 *
 * @param {import('#/system/dispatch/dispatch-family').DispatchFamily} family
 *   目标族（前 = ryouzyoku_kojo_family / 后 = ryouzyoku_after_kojo_family）
 * @returns {Promise<number>} 0（调用方不读）
 */
async function dispatch_ryouzyoku_kojo(family) {
  const local = get_kojo_num();
  if (in_kojo_window(local)) {
    await family.call(local - 100, { whenMissing: 0, args: [] });
  }
  return 0;
}

/**
 * dungeon_ryouzyoku：迷宫凌辱**前**的角色口上钩子。
 *
 * #403 把这段从 ryouzyoku 的内联块整合成本入口（分发点归分发表，
 * 行为不变）。
 *
 * @returns {Promise<number>} 0（调用方不读）
 */
async function dungeon_ryouzyoku() {
  return dispatch_ryouzyoku_kojo(ryouzyoku_kojo_family);
}

/**
 * dungeon_ryouzyoku_after：迷宫凌辱**后**的角色口上
 * 钩子。
 *
 * @returns {Promise<number>} 0（调用方不读）
 */
async function dungeon_ryouzyoku_after() {
  return dispatch_ryouzyoku_kojo(ryouzyoku_after_kojo_family);
}

/**
 * ryouzyoku：败者的凌辱事件主框架。
 *
 * 流程：选择（旁观/不要，INPUT 循环）→ 凌辱畏怖记忆扫描（CFLAG:130 记录
 * 上次凌辱的怪物 ID、CFLAG:131 计数递增）→ 口上前置钩子（TARGET = ARG）→
 * 按 E:列头+7（凌辱类型 1-12）逐列分派怪物凌辱（男人 TALENT:122 → H14
 * *_RYOU男，否则 → 本文件 *_RYOU）→ 处女丧失判定（EXP:0 > 0 且 TALENT:0
 * == 1，魔王 0 的专属）→ 口上后置钩子 → 逃脱分支。
 *
 * @param {number} arg 败北勇者角色号（旧引擎开头 `ARG = A`）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function ryouzyoku(arg, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  // VIRGIN = TALENT:ARG:0 —— 死变量（#DIM 声明后全文件无读取，见文件头）
  // PRINTFORML %SAVESTR:ARG%将被凌辱――
  await era.print(`${arg_name_of(arg)}将被凌辱――`);
  await era.print(''); // PRINTL
  era.drawLine();

  // 立绘（CALL CHA_IMG2，未移植——见文件头）
  // CALL SHOW_DATA（#390 真身）
  show_data(arg); // （#390 真身）
  // 是 `IF 立绘` 分支里的空 PRINT（未移植），不带后缀不换行，与下面的
  // PRINTL 同属一行——合起来仍是空行。
  await era.print(''); // PRINTL

  // 选择循环：旁观凌辱 / 不要凌辱（#572：升格为按钮，正文不写 [编号]，
  // 引擎按 showAcc 拼；「- 」是原文的一部分）
  era.printButton('- 旁观凌辱', 0);
  era.printButton('- 不要凌辱', 1);
  for (;;) {
    const result = await era.input(); // INPUT
    if (result < 0 || result >= 2) {
      continue; // GOTO INPUT_LOOP
    }
    if (result === 1) {
      return 0; // SIF RESULT == 1 → RETURN 0
    }
    break;
  }

  // —— 凌辱畏怖記憶があるか ——
  // MON_COUNT / MON_FEAR 是函数局部变量（#DIM）
  let mon_count = 0;
  let mon_fear = 0;
  // 第一轮扫描：找 E 表里哪一列有怪物、且 CFLAG:130（上次凌辱怪物 ID）
  // 命中该列 → MON_FEAR = 该列头（0/100/200）
  while (mon_count < 300) {
    // 数量槽 <= 0 时清掉凌辱类型槽（E:LOCAL = 0）
    let local = mon_count + 99;
    if (e_get(local) <= 0) {
      e_set(local - 92, 0); // E:(MON_COUNT+7) = 0（local-92 = +7）
    }
    local = mon_count + 7;
    if (e_get(local) > 0) {
      const local_1 = e_get(mon_count); // LOCAL:1 = E:MON_COUNT（怪物号）
      // SIF CFLAG:ARG:130 == LOCAL:1 → MON_FEAR = MON_COUNT
      if ((era.get(`cflag:${arg}:130`) || 0) === local_1) {
        mon_fear = mon_count;
      }
    }
    mon_count += 100;
  }

  // TARGET = ARG（口上钩子的 GET_KOJO_NUM 缺省读它）
  era_flag.target = arg;

  // CALL DUNGEON_RYOUZYOKU（按 GET_KOJO_NUM 分派）
  await dungeon_ryouzyoku();
  // —— 主循环：逐列处理怪物凌辱 ——
  mon_count = 0;
  while (mon_count < 300) {
    const local = mon_count + 7;
    const local_1 = e_get(mon_count); // LOCAL:1 = E:MON_COUNT（怪物号）
    if (e_get(local) > 0 && mon_fear === 0) {
      // 首次遇到凌辱怪物：记畏怖记忆
      await era.printAndWait(`${monstername(local_1)}的凌辱开始了。`);
      chara(arg).dungeon.凌辱畏怖记忆_怪物 = local_1; // CFLAG:130
      mon_fear = local_1;
      chara(arg).dungeon.凌辱畏怖计数 = 0; // CFLAG:131
    } else if (e_get(local) > 0 && mon_fear === local_1) {
      // 同一怪物再来：畏怖计数++
      await era.printAndWait(`${monstername(local_1)}的凌辱开始了。`);
      chara(arg).dungeon.凌辱畏怖计数 += 1; // CFLAG:131++
    } else if (e_get(local) > 0 && mon_fear !== local_1) {
      // 不同怪物：只打台词，不动记忆
      await era.printAndWait(`${monstername(local_1)}的凌辱开始了。`);
    }

    const b = mon_count; // B = MON_COUNT（列头，传各 *_ryou 作数量列基址）
    const type = e_get(local); // E:(MON_COUNT+7) 凌辱类型 1-12
    const mon_num = e_get(b + 99); // E:(B+99) 该列怪物数量
    const is_male = (era.get(`talent:${arg}:122`) || 0) !== 0; // TALENT:ARG:122

    // 按凌辱类型分派（男人 → H14 *_RYOU男，否则 → 本文件 *_RYOU）
    if (type === 1) {
      // カタコト（兽人）
      if (is_male) {
        const man = require('#/kojo/kojo-dungeon-ravish-man');
        await man.orc_ryou_man(arg, mon_num, rand_n);
      } else {
        await orc_ryou(arg, mon_num, rand_n);
      }
    } else if (type === 2) {
      // 史莱姆
      if (is_male) {
        const man = require('#/kojo/kojo-dungeon-ravish-man');
        await man.slime_ryou_man(arg, mon_num, rand_n);
      } else {
        await slime_ryou(arg, mon_num, rand_n);
      }
    } else if (type === 3) {
      // 昆虫
      if (is_male) {
        const man = require('#/kojo/kojo-dungeon-ravish-man');
        await man.insect_ryou_man(arg, mon_num, rand_n);
      } else {
        await insect_ryou(arg, mon_num, rand_n);
      }
    } else if (type === 4) {
      // 蔦触手
      if (is_male) {
        const man = require('#/kojo/kojo-dungeon-ravish-man');
        await man.ivy_ryou_man(arg, mon_num, rand_n);
      } else {
        await ivy_ryou(arg, mon_num, rand_n);
      }
    } else if (type === 5) {
      // 触手
      if (is_male) {
        const man = require('#/kojo/kojo-dungeon-ravish-man');
        await man.syokusyu_ryou_man(arg, mon_num, rand_n);
      } else {
        await syokusyu_ryou(arg, mon_num, rand_n);
      }
    } else if (type === 6) {
      // 妖精
      if (is_male) {
        const man = require('#/kojo/kojo-dungeon-ravish-man');
        await man.faily_ryou_man(arg, mon_num, rand_n);
      } else {
        await faily_ryou(arg, mon_num, rand_n);
      }
    } else if (type === 7) {
      // 巨人
      if (is_male) {
        const man = require('#/kojo/kojo-dungeon-ravish-man');
        await man.giant_ryou_man(arg, mon_num, rand_n);
      } else {
        await giant_ryou(arg, mon_num, rand_n);
      }
    } else if (type === 8) {
      // 男
      if (is_male) {
        const man = require('#/kojo/kojo-dungeon-ravish-man');
        await man.man_ryou_man(arg, mon_num, rand_n);
      } else {
        await man_ryou(arg, mon_num, rand_n);
      }
    } else if (type === 9) {
      // 女（无男版——女魔族只侵犯女性对象）
      await girl_ryou(arg, mon_num, rand_n);
    } else if (type === 10) {
      // 獣
      if (is_male) {
        const man = require('#/kojo/kojo-dungeon-ravish-man');
        await man.beast_ryou_man(arg, mon_num, rand_n);
      } else {
        await beast_ryou(arg, mon_num, rand_n);
      }
    } else if (type === 11) {
      // 脑奸
      if (is_male) {
        const man = require('#/kojo/kojo-dungeon-ravish-man');
        await man.brain_ryou_man(arg, mon_num, rand_n);
      } else {
        await brain_ryou(arg, mon_num, rand_n);
      }
    } else if (type === 12) {
      // 馬
      if (is_male) {
        const man = require('#/kojo/kojo-dungeon-ravish-man');
        await man.horse_ryou_man(arg, mon_num, rand_n);
      } else {
        await horse_ryou(arg, mon_num, rand_n);
      }
    }

    await era.print(''); // PRINTL
    mon_count += 100;
  }

  // 魔王（角色 0）被凌辱的处女丧失（EXP:0 > 0 且 TALENT:0 == 1）
  if (
    (era.get(`exp:${0}:0`) || 0) > 0 &&
    (era.get(`talent:${0}:0`) || 0) === 1
  ) {
    chara(0).chara.处女 = 0; // TALENT:0 = 0（chara 域门面）
    await era.print('【处女丧失】');
    chara(0).train.初体验对象 = 104; // CFLAG:15 = 104（怪物）
  }

  // CALL DUNGEON_RYOUZYOKU_AFTER（按 GET_KOJO_NUM 分派）
  await dungeon_ryouzyoku_after();
  // CALL DUNGEON_RYOUZYOKU_ESCAPE,ARG
  await dungeon_ryouzyoku_escape(arg, rand_n);

  return 0;
}

// orc_ryou(arg)
/**
 * 兽人凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列兽人数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function orc_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const c131 = era.get(`cflag:${arg}:131`) || 0;

  // 男人の場合（TALENT:122）——本文件只服务女性对象；分派已
  // 按 TALENT:122 分流，此检查保留结构（防御性）
  if (era.get(`talent:${arg}:122`)) {
    await era.printAndWait('『把这家伙绑起来…』');
    return 0;
  }

  // 畏怖阶段口上（PRINTDATAW 三档 + 处女/非处女）
  if (c131 > 5) {
    // 隷属状態
    await era.printAndWait(
      pick(
        [
          '『被俺侬的…肉棒…俘虏了啊』',
          '『已经是…俺侬的…老婆啦！』',
          '『又垒了呀…已经、沉迷了吗？』',
          '『俺侬的…崽…拜托啦』',
          '『噗嘻嘻唏…喜欢臭臭的？』',
          '『俺侬的…家畜』',
          '『噗嘻嘻唏！等久啦』',
          '『这么、喜欢、肉棒吗？』',
          '『嘿嘿…可不会放了咯…』',
          '『噗嘻嘻唏、俺侬的同类啦』',
        ],
        rand_n,
      ),
    );
  } else if (c131 > 3) {
    // 強畏怖状態
    await era.printAndWait(
      pick(
        [
          '『延伸不错哟…』',
          '『又是你啊…』',
          '『求求你放过我、才对吧？』',
          '『差不多了吧…』',
          '『噗嘻嘻唏、就是这势头』',
          '『越发老实了啊』',
          '『把屁股翘起来…』',
          '『腚儿转过来』',
          '『哈哈……把手放下来……？』',
          '『脸红了哦？』',
        ],
        rand_n,
      ),
    );
  } else if (c131 > 0) {
    // 弱畏怖状態
    await era.printAndWait(
      pick(
        [
          '『哦…又是…』',
          '『你是、之前的…』',
          '『这家伙…咋又来了？』',
          '『又输给、俺侬了啊』',
          '『噗嘻嘻唏、有够弱的』',
          '『这点水平……』',
          '『又输了啊？』',
          '『太好咯！　又是俺侬的、胜利啦！』',
          '『哈哈…又赢啦…』',
          '『哦吼！　俺侬强爆啦！』',
        ],
        rand_n,
      ),
    );
  } else if (era.get(`talent:${arg}:122`)) {
    // 初次・男人（不可达——本文件只收女性对象，结构保留）
    await era.printAndWait(
      pick(
        [
          '『这…这家伙…喔哦…』',
          '『泄欲啊…好哦…呵呵…』',
          '『这家伙……随便弄，没问题吧？』',
          '『射在，里面也可以吧？反正，又不会有孩子，对吧？』',
          '『嘻嘻嘻，要轮奸啊！…』',
          '『别挣扎了……』',
          '『别挣扎了……出来混总是要还的』',
          '『太好了！　是我们的，胜利！』',
          '『哈哈……开派对啊！……』',
          '『哦哦！　我们也能，赢下来！』',
          '『今天大伙运气不错，哈哈哈！』',
        ],
        rand_n,
      ),
    );
  } else {
    // 初次・女人
    await era.printAndWait(
      pick(
        [
          '『女…女人…喔哦…』',
          '『好女人哦…好哦…呵呵…』',
          '『这家伙……随便弄，没问题吧？』',
          '『怀上，我的孩子吧。你，一定能生下健康的孩子，吧。』',
          '『嘻嘻嘻，是女人啊！…』',
          '『别挣扎了……』',
          '『别挣扎了……出来混总是要还的』',
          '『太好了！　是我们的，胜利！』',
          '『哈哈……是女人啊！……』',
          '『哦哦！　我们也能，赢下来！』',
          '『今天大伙运气不错，哈哈哈！』',
        ],
        rand_n,
      ),
    );
  }

  // MON_NUM = E:(B + 99)（参数注入，见文件头）

  // 处女封印（TALENT:273）
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait('『可恶！这家伙有封印！』');
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量守卫着，一摸上去，手都发麻了。`,
    );
    await era.printAndWait('『行啊你！我就不信你把便便的洞也封住了！』');
    await era.printAndWait(`${arg_name}的另一个穴，被发泄了兽欲……`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (mon_num === 1) {
    // 单只兽人（MON_NUM == 1）
    await era.print(
      pick(
        [
          '『你……是我的东西了…』',
          '『我独占的……噗嘻嘻』',
          '『谁都没看到……』',
          '『赢了！　活下来了！』',
        ],
        rand_n,
      ),
    ); // PRINTDATAL
    await era.print(`${arg_name}被一只兽人推倒，拼命抽插着，射满了精液。`);
    await era.print(
      '她四肢着地趴在地上，脸贴着地板，随着身后的抽插不停地哭泣。',
    );
    await era.print('私处经验+1');
    await era.print('精液经验+1');
    chara(arg).dungeon.私处经验 += 1; // EXP:ARG:0 私处经验
    chara(arg).dungeon.精液经验 += 1; // EXP:ARG:20 精液经验

    if (era.get(`talent:${arg}:12`)) {
      // 刚强
      await era.printAndWait(`${arg_name}咬着嘴唇忍受着凌辱……`);
      await era.printAndWait('在那刚强的脸上，精液无情地飞撒着。');
      await era.print(`苦痛点数+${mon_num * 10}`);
      era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    } else {
      await era.printAndWait(`${arg_name}耷拉着头，`);
    }

    // 旧引擎里这是一整行：「四肢着地趴在地上，」、阴毛
    // 分档、屁股分档、PRINTDATA 的随机词条与
    // PRINTL 收行都不换行。条件提到语句外当取值、片段文本留在输出
    // 语句里。
    const pubic = era.get(`talent:${arg}:阴毛状态`) || 0;
    const charm = era.get(`talent:${arg}:魅力点`) || 0;
    const cock = pick(
      ['阴茎', '脏污的阴茎', '带肉刺的阴茎', '巨根', '蘑菇似的阴茎'],
      rand_n,
    ); // PRINTDATA
    await era.print(
      '四肢着地趴在地上，' +
        (pubic > 200 ? '硬毛露了出来' : pubic > 150 ? '隐约看见了阴毛' : '') +
        (charm === 14
          ? '美丽的屁股从后露了出来'
          : charm === 23
            ? '大的屁股从后露了出来'
            : '屁股从后露了出来') +
        cock +
        '便插了进去，',
    );

    // 的「脸上」是这一行的前缀：与其余分档
    // 各自与它合一条输出——前缀提到语句外共用。
    const face_front = '脸上';
    const shy = (era.get(`talent:${arg}:35`) || 0) !== 0;
    if (c131 > 5 && shy) {
      await era.print(`脸上流露着沉浸在了羞耻与情欲之中的神色……`);
    }

    // 畏怖阶段分档
    if (c131 > 5) {
      if (shy) {
        await era.print(`耻情点数+${mon_num * 12}`);
        era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
      } else {
        await era.print(face_front + '的神情为屈服的喜悦与口水所浸染……');
        await era.print(`屈服点数+${mon_num * 12}`);
        era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
      }
    } else if (c131 > 2) {
      if (era.get(`talent:${arg}:35`)) {
        await era.print(face_front + '流露着在羞耻与快乐间彷徨的神色……'); // 恥じらい
        await era.print(`耻情点数+${mon_num * 12}`);
        era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
      } else {
        await era.print(face_front + '隐约露出了屈服的喜悦……');
        await era.print(`屈服点数+${mon_num * 12}`);
        era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
      }
    } else {
      if (
        (era.get(`talent:${arg}:14`) ||
          era.get(`talent:${arg}:26`) ||
          era.get(`talent:${arg}:44`)) &&
        (era.get(`talent:${arg}:45`) || 0) === 0
      ) {
        // 大人しい・悲観的・涙もろい（且不泣かない）
        await era.print(face_front + '被眼泪浸湿了……');
        await era.print(`恐怖点数+${mon_num * 10}`);
        era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
      } else if (era.get(`talent:${arg}:35`)) {
        await era.print(face_front + '浸染着羞耻的神色……'); // 恥じらい
        await era.print(`耻情点数+${mon_num * 10}`);
        era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
      } else if (era.get(`talent:${arg}:11`)) {
        await era.print(face_front + '的表情因愤怒而扭曲……'); // 反抗的
      } else {
        await era.print(face_front + '染上了绝望的神色……');
        await era.print(`屈服点数+${mon_num * 10}`);
        era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
      }
    }

    await era.print('私处经验+1');
    await era.print('精液经验+1');
    chara(arg).dungeon.私处经验 += 1; // EXP:ARG:0 私处经验
    chara(arg).dungeon.精液经验 += 1; // EXP:ARG:20 精液经验

    if (era.get(`talent:${arg}:0`)) {
      await era.print('『处女诶！　恭喜破处啦……』');
    }
    if (era.get(`talent:${arg}:42`)) {
      await era.print('『这家伙被强奸着都湿了啊』'); // 濡れやすい
    }

    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (rand_n(5) === 0) {
    // 口交
    await era.printAndWait(
      pick(
        [
          '『喂！闭嘴……别吵啦！快点喝下去！』',
          '『舔个……干净……』',
          '『打得都勃起了……』',
        ],
        rand_n,
      ),
    ); // PRINTDATAW

    if (era.get(`talent:${arg}:52`)) {
      // 擅用舌头
      await era.printAndWait('『呃……这家伙，简直就是经验丰富的妓女嘛～』');
      await era.printAndWait(
        `${arg_name}拼命地用舌头侍奉着，展现出天赋般的好技术。`,
      );
      await era.printAndWait(
        `兽人抵受不住她那灵活的舌头，射在${arg_name}的嘴里了。`,
      );
      mon_num *= 2; // 舌使いボーナス
    }

    // 旧引擎里这是一整行：种族 == 4 的 SIF 前缀、名字、
    // 种族分档都不换行，到末段的 PRINTFORMW 才收行。
    const headless = (era.get(`talent:${arg}:种族`) || 0) === 4;
    await era.printAndWait(
      (headless ? '无头骑士的' : '') +
        `${arg_name}` +
        (headless ? '身体被固定住了，只剩下脑袋来像飞机杯似的' : '全裸地') +
        '侍奉着兽人们的阴茎。',
    );
    await era.printAndWait(
      `只要喝掉所有${mon_num}只兽人的精液的话，它们就答应不侵犯她的下体………`,
    );

    // 畏怖阶段分档（性格状语）
    if (c131 > 5) {
      if (era.get(`talent:${arg}:13`)) {
        await era.print('毫无犹豫、'); // 素直
      } else if (era.get(`talent:${arg}:14`)) {
        await era.print('小心翼翼地、'); // 大人しい
      } else if (era.get(`talent:${arg}:17`)) {
        await era.print('一边土下座扭着腰部的'); // プライド低い
      } else if (era.get(`talent:${arg}:35`)) {
        await era.print('期待与羞耻将脸染红的'); // 恥じらい
      } else if (era.get(`talent:${arg}:0`)) {
        await era.print('为了守住自己处女的'); // 処女
      } else {
        await era.print('面露期待的');
      }
    } else if (c131 > 2) {
      if (era.get(`talent:${arg}:13`)) {
        await era.print('老实遵从于兽人的'); // 素直
      } else if (era.get(`talent:${arg}:14`)) {
        await era.print('煞有其事地、'); // 大人しい
      } else if (era.get(`talent:${arg}:17`)) {
        await era.print('不住向阴茎献媚的'); // プライド低い
      } else if (era.get(`talent:${arg}:35`)) {
        await era.print('面对阴茎羞红了脸的'); // 恥じらい
      } else if (era.get(`talent:${arg}:0`)) {
        await era.print('为了守住自己处女的'); // 処女
      } else {
        await era.print('已然无法反抗的');
      }
    } else {
      if (era.get(`talent:${arg}:11`)) {
        await era.print('带着反抗的目光看着它们，其中一只兽人对她怒喝了一声，'); // 反抗的
        await era.print(`恐怖点数+${mon_num * 10}`);
        era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
      } else if (era.get(`talent:${arg}:13`)) {
        // 旧引擎里这两句 PRINTFORM + PRINTFORML 是同一行（#584）
        await era.print(
          `迫于兽人的威胁，她衡量了一下得失之后，老实地接受了屈辱的命运……听天由命地流泪，耻情点数+${mon_num * 10}`,
        );
        era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
      }
      // （大人しい・プライド低い・恥じらい・処女）的初见分档
      // 文本已并进下面的整行语句（前缀当取值表达式），此处不再单独
      // 输出——否则同一段会先自占一行、又出现在合并行里。
    }

    // PRINTDATA 的随机词条夹在这一行
    // 中间，提到语句外当取值。
    const cock = pick(
      ['阴茎', '脏污的阴茎', '带肉刺的阴茎', '巨根', '蘑菇似的阴茎'],
      rand_n,
    ); // PRINTDATA

    // 整行的两段互斥收行：初见分档、`%SAVESTR:ARG%把`、随机词条与
    // 「含了下去，」都不换行；TALENT:52 命中时由 PRINTW 收行，其余
    // 分支由后面的分档片段接 PRINTL 收行。
    // 两条收行互斥，且中间的 PRINTW（它自带 W）不能跳过：
    // 前半段在两条路径上各写一次。
    const quiet = era.get(`talent:${arg}:14`) || 0;
    const proud = era.get(`talent:${arg}:17`) || 0;
    const ashamed = era.get(`talent:${arg}:35`) || 0;
    const maiden = era.get(`talent:${arg}:0`) || 0;
    const indifferent = era.get(`talent:${arg}:21`) || 0;
    const vulgar = era.get(`talent:${arg}:36`) || 0;
    const quick = era.get(`talent:${arg}:50`) || 0;
    const smelly = era.get(`talent:${arg}:62`) || 0;
    const devoted = era.get(`talent:${arg}:63`) || 0;
    // 初见分档 + 前半段：链上的 TALENT:52 支
    // 照旧把文本写在语句里；
    // 其余分支用这个语句外的前缀常量 + 自己的分档与收行合成一条
    //（同 kojo-k7-heart.js 的 talk_front_5485 写法）
    const tongue_front_475 =
      (quiet
        ? '提心吊胆地'
        : proud
          ? '嘿嘿媚笑着'
          : ashamed
            ? '不敢直视肉棒而闭上了眼睛'
            : maiden
              ? '为了守住自己处女的'
              : '') +
      `${arg_name}把` +
      cock +
      '含了下去，';
    //
    // 舌使い：TALENT:52 时由 PRINTW 收行
    if (era.get(`talent:${arg}:52`)) {
      await era.printAndWait(
        (quiet
          ? '提心吊胆地'
          : proud
            ? '嘿嘿媚笑着'
            : ashamed
              ? '不敢直视肉棒而闭上了眼睛'
              : maiden
                ? '为了守住自己处女的'
                : '') +
          `${arg_name}把` +
          cock +
          '含了下去，『呃……这家伙，简直就是经验丰富的妓女嘛～』',
      );
      await era.printAndWait(
        `${arg_name}拼命地用舌头侍奉着，展现出天赋般的好技术。`,
      );
      await era.printAndWait(
        `兽人抵受不住她那灵活的舌头，射在${arg_name}的嘴里了。`,
      );
      mon_num *= 2; // 舌使いボーナス
      await era.print('奉仕持续了下去……');
    } else {
      await era.print(
        tongue_front_475 +
          (indifferent
            ? '像工作一样地奉仕着，'
            : vulgar
              ? '不禁发出了粗俗的声音，'
              : quick
                ? '很快地抓住了奉仕的诀窍，'
                : smelly
                  ? '忍受着腥臭味，'
                  : devoted
                    ? '拼命地用舌头奉仕着，'
                    : '') +
          '奉仕持续了下去……',
      );
    }

    await era.print(`口交经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.口交经验 += mon_num; // EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验

    // 初吻（SIF CFLAG:16 == -1）
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // CFLAG:16 = 995（怪物的阴茎）
    }
  } else if (rand_n(4) === 0) {
    // 全穴奉仕
    await era.printAndWait(
      pick(
        [
          '『兄弟们，把所有的穴都塞满哦！』',
          '『嘿，简直像三明治一样』',
          '『连耳朵，都给你灌满精液咯』',
        ],
        rand_n,
      ),
    ); // PRINTDATAW

    await era.printAndWait(
      `${arg_name}被${mon_num}只兽人用积存已久的精液，将私处、嘴巴、肛门……所有能用的穴，注满了精液……`,
    );
    await era.printAndWait(
      '她用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。',
    );
    await era.printAndWait(
      `${arg_name}的脸和性器都用精液化上了妆。兽人们看着她这样子，开怀大笑。`,
    );

    // 旧引擎里这是一整行：「兽人的」、PRINTDATA 的随机词条
    // 与部位分档都不换行，末段的 PRINTL
    // 收行（本身无文本）。
    const cock = pick(
      ['阴茎', '脏污的阴茎', '带肉刺的阴茎', '巨根', '蘑菇似的阴茎'],
      rand_n,
    ); // PRINTDATA
    const glasses = (era.get(`cflag:${arg}:42`) || 0) === 83;
    const charm = era.get(`talent:${arg}:魅力点`) || 0;
    await era.print(
      '兽人的' +
        cock +
        `插进了${arg_name}的喉咙深处，射精的同时喷溅出来的精液在${arg_name}的` +
        (glasses
          ? '眼镜上飞撒着……'
          : charm === 2
            ? '可爱的眼睛上飞撒着……'
            : charm === 3
              ? '漂亮的鼻子里喷了出来……'
              : charm === 22
                ? '光鲜亮丽的头发上飞撒着……'
                : '脸上飞撒着……'),
    );

    if (era.get(`talent:${arg}:12`)) {
      // 刚强
      await era.printAndWait(`${arg_name}咬着嘴唇忍受着凌辱……`);
      await era.printAndWait('在那刚强的脸上，精液无情地飞撒着。');
      await era.print(`苦痛点数+${mon_num * 10}`);
      era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    } else if (era.get(`talent:${arg}:70`) || era.get(`talent:${arg}:73`)) {
      // 接受快感・容易陷落
      await era.printAndWait('在凌辱开始不久后，渐渐地听到了妩媚的娇喘声。');
      await era.printAndWait('『喔！这家伙有感觉了哦！』');
      await era.printAndWait(`${arg_name}被快感冲击着，忍不住主动扭着腰。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    } else {
      await era.printAndWait(
        '她用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。',
      );
    }

    await era.printAndWait(''); // PRINTW（空行等待）

    // 旧引擎里这是一整行：「兽人们把润滑液涂在了…的」与
    // 部位分档都不换行，末段的 PRINTL 收行。
    const charm_b = era.get(`talent:${arg}:魅力点`) || 0;
    const pubic = era.get(`talent:${arg}:阴毛状态`) || 0;
    const nimble = era.get(`talent:${arg}:125`) || 0;
    const muscular = era.get(`talent:${arg}:248`) || 0;
    await era.print(
      `兽人们把润滑液涂在了${arg_name}的` +
        (charm_b === 21
          ? '漂亮的'
          : charm_b === 14
            ? '漂亮的屁股的缝隙中的'
            : charm_b === 23
              ? '大的屁股的缝隙中的'
              : nimble
                ? '无毛额'
                : muscular
                  ? '肌肉明显的两腿间的'
                  : pubic > 200
                    ? '从阴阜到肛门都被茂密的阴毛所覆盖的'
                    : pubic > 150
                      ? '长着茂盛的阴毛的'
                      : '') +
        '性器和肛门上',
    );

    // 旧引擎里这是一整行：「在…的」与体型分档都不
    // 换行，末段的 PRINTL 收行。
    const burly = era.get(`talent:${arg}:99`) || 0;
    const petite = era.get(`talent:${arg}:100`) || 0;
    const fat = era.get(`talent:${arg}:115`) || 0;
    const frail = era.get(`talent:${arg}:256`) || 0;
    const build = era.get(`talent:${arg}:体型`) || 0;
    await era.print(
      `在${arg_name}的` +
        (burly
          ? '魁梧的身体上'
          : petite
            ? '娇小的身体上'
            : fat
              ? '松松垮垮的身体上'
              : muscular
                ? '紧致的身体上'
                : frail
                  ? '窈窕的身体上'
                  : build <= 100
                    ? '纤细的身体上'
                    : build > 200
                      ? '肉感的身体上'
                      : '身体上') +
        '像要挤爆她似的激烈地持续侵犯着……',
    );

    await era.printAndWait(
      '她用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。',
    );

    await era.print(`苦痛点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    await era.print(`私处经验+${mon_num}`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`口交经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.私处经验 += mon_num; // EXP:ARG:0 私处经验
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.口交经验 += mon_num; // EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验

    // 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995;
    }
  } else if (rand_n(3) === 0) {
    // 屈辱プレイ
    await era.printAndWait(
      pick(
        [
          '『你不要做人了。从今往后就是家畜了。像猪一样叫几声来听听。』',
          '『猪就要有，猪的样子』',
          '『你只是，比我们还低级的，家畜罢了！』',
        ],
        rand_n,
      ),
    ); // PRINTDATAW

    // 旧引擎里这是一整行：「…全裸地四肢着地趴在地下、」与
    // 素质分档都不换行，末段的 PRINTW 才收行。
    const timid = era.get(`talent:${arg}:10`) || 0;
    const quiet = era.get(`talent:${arg}:14`) || 0;
    const rebel = era.get(`talent:${arg}:11`) || 0;
    const honest = era.get(`talent:${arg}:13`) || 0;
    const proud = era.get(`talent:${arg}:17`) || 0;
    const ashamed = era.get(`talent:${arg}:35`) || 0;
    await era.printAndWait(
      `${arg_name}全裸地四肢着地趴在地下、` +
        (timid || quiet
          ? '浑身颤抖着、'
          : rebel
            ? '怒目圆睁着、'
            : honest
              ? '拼命服从着、'
              : proud
                ? '拼命献媚着、'
                : ashamed
                  ? '羞红了脸、'
                  : '') +
        '屈辱地模仿猪叫……',
    );

    await era.printAndWait(
      `${mon_num}只兽人看到这个情形都笑了。完全没有了光辉冒险者的样子，就是一只惨叫的猪而已。`,
    );

    if (era.get(`abl:${arg}:17`)) {
      // 露出癖
      await era.printAndWait(
        `${arg_name}的脸犹如发烧一般，不停地重复着上述行为。`,
      );
      await era.printAndWait('好像因为被视奸，而有了感觉。');
      await era.print(`耻情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
    }

    if (era.get(`abl:${arg}:21`)) {
      // 抖M气质
      await era.printAndWait(`${arg_name}好像因为被骂而有了感觉。`);
      await era.printAndWait('『明明就是母猪，还说自己是冒险者！』');
      await era.printAndWait(`${arg_name}连眼神都湿润了～`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    // 旧引擎里『猪…』整段是一行（PRINTFORM 不换行 → 两处 GOBI → PRINTFORMW
    // 收尾）；语尾按 #570 返回文字、拼进同一行，一次 printAndWait 输出。
    const gobi_pig = await require('#/kojo/kojo-system').gobi_koujo(
      era.get(`talent:${arg}:17`) ? 1 : 5,
    ); // （プライド低い → 喜び、否则情けない）
    const gobi_pig2 = await require('#/kojo/kojo-system').gobi_koujo(
      era.get(`talent:${arg}:17`) ? 1 : 5,
    );
    await era.printAndWait(
      `『猪${gobi_pig}还自称冒险者……简直傻了${gobi_pig2}${'\u3000'}噗噗，噗嘻！』`,
    );

    if (era.get(`talent:${arg}:17`)) {
      // プライド低い
      await era.printAndWait(`${arg_name}抛弃了自尊心，拼命地求饶着。`);
      await era.print(`屈服点数+${mon_num * 10}`);
      era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
    }

    await era.print(`耻情点数+${mon_num * 10}`);
    await era.print(`屈服点数+${mon_num * 10}`);
    era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
  } else if (rand_n(2) === 0) {
    // 武器捅私处
    await era.printAndWait('『来试试，看能放多粗的东西进去？』');
    await era.printAndWait(`${arg_name}感受到了自己身上的危机，拼命地哀求着。`);
    await era.printAndWait(
      '不过，她的身体依旧被兽人们牢牢抓住。M字开脚地把不设防的性器和肛门展示在大家面前。',
    );
    await era.printAndWait(
      `其中一只兽人，拿起她的心爱的武器用柄的那端捅入她的私处。`,
    );
    await era.printAndWait(
      `${arg_name}的喊叫声，回响在${mon_num}只兽人的耳边。`,
    );

    if (era.get(`talent:${arg}:40`)) {
      // 害怕疼痛
      await era.printAndWait('「好痛……不要啊……呜哇哇哇哇哇哇！」');
      await era.printAndWait(`${arg_name}受不了痛楚，高声哭喊着。`);
      await era.print(`苦痛点数+${mon_num * 10}`);
      era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    }

    if (era.get(`abl:${arg}:21`)) {
      // 抖M气质
      await era.printAndWait(`${arg_name}在痛楚中感到了愉悦。`);
      await era.printAndWait(
        `难道自己是个潜在的性变态？这么想着，${arg_name}对自身的反应感到害怕。`,
      );
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.print(`私处经验+${mon_num}`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    chara(arg).dungeon.私处经验 += mon_num; // EXP:ARG:0 私处经验
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  } else {
    // 抬屁股
    await era.printAndWait('『抬起屁股！然后说：请用！』');
    await era.printAndWait(
      `${arg_name}用屈辱的姿势抬起了屁股，把手扶在地下城的墙壁上。`,
    );
    await era.printAndWait(
      `她完全被淹没在${mon_num}只兽人之中，兽人们大笑着，轮流侵犯她的私处和肛门。`,
    );
    await era.printAndWait(
      `${arg_name}的呜咽，被兽人们的欢呼声掩埋在地下城的黑暗中。`,
    );

    if (era.get(`talent:${arg}:70`) || era.get(`talent:${arg}:73`)) {
      // 接受快感・容易陷落
      await era.printAndWait(
        `随着凌辱的持续，${arg_name}的私处里渐渐滴出了粘液。`,
      );
      await era.printAndWait(
        '『别这么快就去了啊！老子都不知道操哭多少人类女性了。』',
      );
      await era.printAndWait(`${arg_name}呼出了炽热的气息，双腿直抖着。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    } else if (era.get(`talent:${arg}:11`)) {
      // 反抗心
      await era.printAndWait('『喂！把腰抬起来！还没完呢！』');
      await era.printAndWait(`${arg_name}用冰冷的目光瞪了兽人们一眼。`);
    }

    await era.print(`私处经验+${mon_num}`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.私处经验 += mon_num; // EXP:ARG:0 私处经验
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// slime_ryou(arg)
/**
 * 史莱姆凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列史莱姆数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function slime_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // 男人の場合（TALENT:122）——结构保留（本文件只收女性对象）
  if (era.get(`talent:${arg}:122`)) {
    await era.printAndWait('黏液缠住了冒险者的腿，令他无法移动。');
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  // PRINTDATAW 五选一
  await era.printAndWait(
    pick(
      [
        '奇妙的黏液蠢动着……',
        '冒险者反感地在黏液中挣扎着……',
        '冒险者发现自己无法逃离这些黏液……',
        '冒险者的身体被黏液缠住了，她高声尖叫了起来……',
        '黏液将冒险者困住了……',
      ],
      rand_n,
    ),
  );

  // MON_NUM = E:(B + 99)（参数注入）

  // 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量守卫着，将试图入侵的黏液弹开了。`,
    );
    await era.printAndWait('黏液迷茫了一会儿，但马上又发现了另一个突破口。');
    await era.printAndWait(`${arg_name}的嘴巴和肛门，被灌入了黏液。`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (rand_n(5) === 0) {
    // 黏液入口
    await era.printAndWait('黏液杀到了冒险者的嘴巴里。');
    await era.printAndWait(
      `${arg_name}感觉呼吸困难，正挣扎着，突然呼吸又顺畅了。但一部分的黏液已经借机流入了内脏，从内部蹂躏着。`,
    );
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  } else if (rand_n(4) === 0) {
    // 黏液入肛
    await era.printAndWait('黏液杀到了冒险者的肛门里。');
    await era.printAndWait(
      `${arg_name}被肛门里大量逆流的黏液弄的苦不堪言，但是四肢都被黏液牢牢控制，无法反抗。`,
    );
    if (era.get(`cflag:${arg}:131`) > 5) {
      await era.printAndWait(
        `${arg_name}反弓起腰来、似乎沉浸于粘液的杠虐快感之中……`,
      ); // 隷属状態
    } else if (era.get(`cflag:${arg}:131`) > 3) {
      await era.printAndWait(`${arg_name}已然被粘液攻陷了……`); // 強畏怖状態
    } else if (era.get(`cflag:${arg}:131`) > 0) {
      await era.printAndWait(`${arg_name}开始习惯被粘液涌入的感觉……`); // 弱畏怖状態
    } else {
      await era.printAndWait('冒险者在肛虐的痛苦中癫狂地惨叫着。');
    }
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
  } else if (rand_n(3) === 0) {
    // 四脚着地
    await era.printAndWait('被全裸地四脚着地压在地上，黏液逆流到肛门里了。');
    await era.printAndWait(
      `${arg_name}腹部运劲，将黏液喷出肛门，但依然有大量的黏液流入体内。`,
    );
    await era.print(`耻情点数+${mon_num * 10}`);
    await era.print(`屈服点数+${mon_num * 10}`);
    era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
  } else if (rand_n(2) === 0) {
    // 大量黏液
    await era.printAndWait(
      '黏液疯狂地凌辱着，大量的黏液灌入了直肠里让冒险者的肚子都膨胀了几分。',
    );
    await era.printAndWait(`${arg_name}坚强地试图站起来。`);
    await era.printAndWait(
      '但是大量的黏液一下子又从肛门里汹涌地喷出来了，膝盖一软又跪倒在地。',
    );
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  } else {
    // 治愈黏液
    await era.printAndWait('冒险者被包在黏液里，只露出头部发出呜呜的呻吟。');
    await era.printAndWait(`看来没人相救的话，${arg_name}要被消化在黏液里了。`);
    await era.printAndWait(
      `但黏液持续的爱抚着身体，可能也会让${she(arg)}溶化在快感之中。`,
    );
    await era.printAndWait(
      `黏液的麻痹成分，渐渐把${arg_name}遭受凌辱的苦痛身体治愈了。`,
    );
    chara(arg).dungeon.体力 += 100; // BASE:ARG:0 += 100（体力回复）
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// insect_ryou(arg)
/**
 * 昆虫凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列昆虫数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function insect_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.printAndWait('节肢动物在冒险者的脖子上打入了麻痹毒素。');
    return 0;
  }

  // 畏怖阶段口上（PRINTDATAW 四档）
  if (era.get(`cflag:${arg}:131`) > 5) {
    await era.printAndWait(
      pick(
        [
          '节肢动物发出了喜悦的声音、冒险者缓缓地拥向了甲壳…',
          '冒险者对感觉不到情感的节肢动物产生了情欲',
          '冒险者忘记了伙伴与使命、正任凭快乐游走于全身',
          '冒险者轻轻地爱抚着、眼前灼灼而立的产卵管',
          '即使语言不通、节肢动物与冒险者之间也产生了无需言语的情爱',
        ],
        rand_n,
      ),
    ); // 隷属状態
  } else if (era.get(`cflag:${arg}:131`) > 3) {
    await era.printAndWait(
      pick(
        [
          '节肢动物发出了喜悦的声音、冒险者脱力了似的靠了上去…',
          '冒险者对感觉不到情感的节肢动物产生了些许期待',
          '冒险者放弃了呼救的念头、将腰拱了起来',
          '面对眼前灼灼而立的产卵管、冒险者满脸通红',
          '即使语言不通、节肢动物也牵手相吻了起来',
        ],
        rand_n,
      ),
    ); // 強畏怖状態
  } else if (era.get(`cflag:${arg}:131`) > 0) {
    await era.printAndWait(
      pick(
        [
          '节肢动物的甲壳像在欢迎似的攒动着…',
          '冒险者对感觉不到情感的节肢动物的陵辱感到窒息',
          '冒险者放弃了呼救的念头、献上了身体',
          '面对眼前灼灼而立的产卵管、冒险者吞了吞口水',
          '即使语言不通、节肢动物的喜悦已一目了然',
        ],
        rand_n,
      ),
    ); // 弱畏怖状態
  } else {
    await era.printAndWait(
      pick(
        [
          '节肢动物用甲壳摩擦着。',
          '被节肢动物无情地凌辱着，冒险者非常害怕。',
          '冒险者拼命地呼救着，但节肢动物置若罔闻。',
          '节肢动物把输卵管伸到冒险者面前。',
          '冒险者完全无法与对方交流，绝望了。',
        ],
        rand_n,
      ),
    ); // 初见
  }

  // MON_NUM = E:(B + 99)（参数注入）

  // 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait('『叽吱叽吱叽吱……』');
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量守卫着，节肢动物无法入侵。`,
    );
    await era.printAndWait('它怒了，将输卵管直接插入肛门里。');
    await era.printAndWait(`${arg_name}因剧痛发出了凄厉的惨叫……`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (mon_num === 1) {
    // 单只昆虫
    await era.print('『叽吱叽吱叽吱……』');
    await era.print(`${arg_name}被节肢动物抓住，直接被输卵管插入私处里。`);
    await era.print('她不断地惨叫着，但节肢动物依旧毫不留情。');
    await era.print('私处经验+1');
    chara(arg).dungeon.私处经验 += 1; // EXP:ARG:0 私处经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (rand_n(2) === 0) {
    // 嘴巴产卵
    await era.printAndWait('『叽吱叽吱叽吱……』');
    await era.printAndWait(`${arg_name}的嘴巴被输卵管插入了，被播下了卵。`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  } else {
    // 肛门产卵
    await era.printAndWait('『叽吱叽吱叽吱……』');
    await era.printAndWait(`${arg_name}的肛门被输卵管插入了，被播下了卵。`);
    await era.printAndWait(
      '不喝下打虫药剂的话，魔界的虫子就会从肛门里孵化了吧。',
    );
    await era.printAndWait(
      `${mon_num}只节肢动物轮流扑在${arg_name}身上，从臀部到背部全被卵覆盖了。`,
    );
    await era.print(`肛门经验+${mon_num}`);
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// ivy_ryou(arg)
/**
 * 蔦触手凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列蔦触手数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function ivy_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.printAndWait('植物用藤蔓抢走了冒险者的武器。');
    return 0;
  }

  // PRINTDATAW 五选一
  await era.printAndWait(
    pick(
      [
        '藤蔓把冒险者缠住了。',
        '冒险者被藤蔓绑了起来。',
        '『吱吱吱吱…』',
        '藤蔓缠得很紧，冒险者不由地惨叫了起来。',
        '被藤蔓彻底包围，冒险者变成了绿色的一团。',
      ],
      rand_n,
    ),
  );

  // MON_NUM = E:(B + 99)（参数注入）

  // 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量守卫着，将试图入侵的藤蔓烧毁。`,
    );
    await era.printAndWait('但是，本来就对纯洁这东西没概念的植物，');
    await era.printAndWait(`把目标转移到了${arg_name}的肛门……`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (rand_n(2) === 0) {
    // 勒颈
    await era.printAndWait('藤蔓勒住了冒险者的脖子。');
    await era.printAndWait(
      `${arg_name}呼吸困难，痛苦挣扎着，被开放的时候，忍不住粗声地喘息。`,
    );
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  } else {
    // 肛门扎根
    await era.printAndWait('藤蔓在冒险者的肛门里扎根了。');
    await era.printAndWait(
      `${arg_name}的肛门被蹂躏着，发出了喊破喉咙的惨叫声。`,
    );
    await era.printAndWait('藤蔓吸收到了足够的养分，一下子从直肠里连根拔走。');
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// syokusyu_ryou(arg)
/**
 * 触手凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列触手数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function syokusyu_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.printAndWait('冒险者的身体被触手缠住了。');
    return 0;
  }

  // 畏怖阶段口上（PRINTDATAW 三档）
  if (era.get(`cflag:${arg}:131`) > 5) {
    await era.printAndWait(
      pick(
        [
          '冒险者充满爱意地抚摸着蠕动的触手………',
          '冒险者满眼期待地看着、形状猥亵的触手',
          '冒险者受触手分泌的媚药成分影响、已是口水鼻涕横流的模样了',
          '冒险者的身体被触手紧缚着、冒险者不住地抽搐了起来……',
          '触手将冒险者围了起来、冒险者主动脱去了衣服诱惑着触手',
        ],
        rand_n,
      ),
    ); // 隷属状態
  } else if (era.get(`cflag:${arg}:131`) > 3) {
    await era.printAndWait(
      pick(
        [
          '冒险者被形似男性生殖器的触手顶着、脸涨得通红',
          '触手察觉到了逐渐放弃抵抗的冒险者、欢快地扭动了起来',
          '冒险者吸入了含有媚药成分的香气、感到股间湿了起来',
          '触手将冒险者围了起来、像是对并未企图逃脱的冒险者困惑不已似的躁动了起来',
          '冒险者的身体被触手紧缚着、非但没有如同过去那般的抵抗、冒险者也只是稍稍地将脸朝向了别处',
          '冒险者在触手跟前、丢下了自己的武器',
        ],
        rand_n,
      ),
    ); // 強畏怖状態
  } else {
    await era.printAndWait(
      pick(
        [
          '奇怪的触手，蠢动着……',
          '冒险者看着形状下流的触手，咒骂着自己的命运。',
          '冒险者被触手分泌的媚药成分弄得头昏脑胀。',
          '冒险者的身体被触手绑起来了。',
          '触手将冒险者包住了。',
        ],
        rand_n,
      ),
    ); // 初见
  }

  // MON_NUM = E:(B + 99)（参数注入）

  // 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量保护着，触手一摸上去，就发麻了。`,
    );
    await era.printAndWait('触手放弃了，向次要目标进发。');
    await era.printAndWait(`${arg_name}的菊花，被强行撬开了。`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (rand_n(5) === 0) {
    // 触手入嘴
    await era.printAndWait('触手伸进了冒险者的嘴巴里。');
    await era.printAndWait(
      `${arg_name}的喉咙被大量的体液灌入，呛到了。不久，${she(arg)}的意识开始模糊了。`,
    );
    await era.print(`欲情点数+${mon_num * 10}`);
    era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
  } else if (rand_n(4) === 0) {
    // 触手入肛
    await era.printAndWait('触手伸进了冒险者的肛门里。');
    await era.printAndWait(
      `${arg_name}的肛门被大量的体液灌入，直肠吸收了里面的成分。不久，${she(arg)}的意识开始模糊了。`,
    );
    await era.printAndWait(
      '不一会儿，全身肌肉都松弛了，大量的浑浊体液从肛门流出。',
    );
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`欲情点数+${mon_num * 10}`);
    era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
  } else if (rand_n(3) === 0) {
    // 触手侵犯私处
    await era.printAndWait('仰面倒下的冒险者，正被触手侵犯着私处。');
    await era.printAndWait(
      `${arg_name}不断悲鸣着，但被大量的体液灌入私处后，开始半张着嘴流着口水，目光虚无地看着上方。`,
    );
    await era.print(`私处经验+${mon_num}`);
    await era.print(`欲情点数+${mon_num * 10}`);
    era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    chara(arg).dungeon.私处经验 += mon_num; // EXP:ARG:0 私处经验
  } else if (rand_n(2) === 0) {
    // 吊缚
    await era.printAndWait('触手把冒险者绑了起来，吊在半空。');
    await era.printAndWait(
      `${arg_name}的嘴巴也好，私处也好，肛门也好，能被触手侵犯的地方都被灌入了大量的体液。`,
    );
    await era.printAndWait(
      '……不久，地上滴落的液体里，开始出现了触手体液之外的东西。',
    );
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`私处经验+${mon_num}`);
    await era.print(`欲情点数+${mon_num * 10}`);
    era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.私处经验 += mon_num; // EXP:ARG:0 私处经验
  } else {
    // 榨乳
    await era.printAndWait('冒险者被触手吸着乳头，不断的挤奶。');
    await era.printAndWait(
      `${arg_name}带着难以置信的表情，感受着触手的体液顺着乳头流入，最终融化到了脑髓里。`,
    );
    await era.printAndWait(
      `不久之后${she(arg)}感到乳房发胀，触手顺势开始了榨乳。`,
    );
    await era.printAndWait(
      `不久之后，${arg_name}母乳开始无法抑制地从乳头喷出。`,
    );
    await era.print('喷奶经验+1');
    chara(arg).train.喷奶经验 += 1; // EXP:ARG:54 喷奶经验
  }
  await era.printAndWait(`触手经验+${mon_num}`);
  chara(arg).dungeon.触手经验 += mon_num; // EXP:ARG:55 触手经验
  return 0;
}

// faily_ryou(arg)
/**
 * 妖精凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列妖精数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function faily_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.printAndWait('『下次再来玩啊～』');
    return 0;
  }

  // 畏怖阶段口上（PRINTDATAW 三档）
  if (era.get(`cflag:${arg}:131`) > 5) {
    await era.printAndWait(
      pick(
        [
          '『小姐姐、还要再来呀』',
          '『从今以后、要一直一起玩哦！』',
          '『耶、小姐姐来啦！』',
          '『小姐姐、结婚吧♪』',
          '『小姐姐、坏得可真彻底呀』',
        ],
        rand_n,
      ),
    ); // 隷属状態
  } else if (era.get(`cflag:${arg}:131`) > 3) {
    await era.printAndWait(
      pick(
        [
          '『小姐姐怎么了吗？』',
          '『又来一起玩了呀』',
          '『变得色情了啊、小姐姐♪』',
          '『又来了哇、小姐姐』',
          '『耶、又来玩了！』',
          '『稍微抵抗下、也可以哟？』',
        ],
        rand_n,
      ),
    ); // 強畏怖状態
  } else {
    await era.printAndWait(
      pick(
        [
          '『小姐姐，来做更Ｈ的事吧』',
          '『来啪啪啪！』',
          '『哇！新的玩具哦！』',
          '『这一次，让小姐姐有全新感受哦！♪』',
          '『小姐姐的那里，想看看呢！』',
        ],
        rand_n,
      ),
    ); // 初见
  }

  // MON_NUM = E:(B + 99)（参数注入）

  // 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait('『所谓的冒险者真是牢不可破啊！』');
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量守卫着，一摸上去，手都发麻了。`,
    );
    await era.printAndWait('妖精拿出了一根和自己身高相等的假阳具。');
    await era.printAndWait('『小姐姐来享受这边的穴吧！』');
    await era.printAndWait(`${arg_name}的惨叫回响在洞窟里……`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (mon_num === 1) {
    // 单只妖精
    await era.print('『小姐姐，要做我的肉便器吗？』');
    await era.print(`${arg_name}的阴蒂，被一只妖精不停舔舐着。`);
    await era.print(`${arg_name}忍受着M字开脚的这份屈辱……`);
    await era.print('阴核点数+1');
    era.add(`juel:${arg}:0`, 10); // JUEL:ARG:0 阴核
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (rand_n(2) === 0) {
    // 私处钻入
    await era.printAndWait('『小姐姐的里面，是什么模样呢？』');
    await era.printAndWait(
      `${arg_name}的私处被妖精钻入了。妖精对她的反应感到相当有趣，不断地玩弄着私处内的皱褶。`,
    );
    await era.print(`私处经验+${mon_num}`);
    await era.print(`私处点数+${mon_num * 10}`);
    chara(arg).dungeon.私处经验 += mon_num; // EXP:ARG:0 私处经验
    era.add(`juel:${arg}:1`, mon_num * 10); // JUEL:ARG:1 私处点数
  } else {
    // 舔舐
    await era.printAndWait('『舔舔看！』');
    await era.printAndWait(`${arg_name}的阴蒂和两乳头都被妖精们舔舐着。`);
    await era.printAndWait('身体在妖精们的欺负下越发苦闷了。');
    await era.print(`阴核点数+${mon_num * 10}`);
    await era.print(`欲情点数+${mon_num * 10}`);
    era.add(`juel:${arg}:0`, mon_num * 10); // JUEL:ARG:0 阴核
    era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// giant_ryou(arg)
/**
 * 巨人凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列巨人数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function giant_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  // 畏怖阶段口上（PRINTDATAW 三档）
  if (era.get(`cflag:${arg}:131`) > 5) {
    await era.printAndWait(
      pick(
        [
          '『瓦全的　变成了　灰机杯了呀』',
          '『巨人肉棒的　形状　几住了哇』',
          '『嘿嘿　已经　淋乱不糠了啊』',
          '『已经　不是巨人阴茎　就没滑　满足　了吗？』',
          '『和巨人肉棒　挺搭的　肉棒套子　嘛』',
        ],
        rand_n,
      ),
    ); // 隷属状態
  } else if (era.get(`cflag:${arg}:131`) > 3) {
    await era.printAndWait(
      pick(
        [
          '『哈哈　熟络起来了欸』',
          '『又垒了呀……活灰机杯』',
          '『正愁呢　来得正好』',
          '『没用的哦　向巨人　反抗啥的……』',
          '冒险者意识到了自己是无法抵抗巨人那压倒性的体型的矮小种族……',
          '面对巨大雄性的体型、冒险者的武器从手中落下、呆呆地跪坐在地上',
        ],
        rand_n,
      ),
    ); // 強畏怖状態
  } else {
    await era.printAndWait(
      pick(
        [
          '『看起来值得凌辱一番。』',
          '『忍不住了！』',
          '『屁股和那个穴，是相连的？』',
          '『要让我满足哦！』',
          '『真是太小啦！』',
        ],
        rand_n,
      ),
    ); // 初见
  }

  // MON_NUM = E:(B + 99)（参数注入）

  // 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait('『你这家伙，尽然被封印了』');
    await era.printAndWait(`${arg_name}的纯洁被神圣力量守卫着，巨人无法打破。`);
    await era.printAndWait('『尾指的话，应该能进去』');
    await era.printAndWait(`${arg_name}狭窄的肛门，被巨人粗壮的尾指捅入。`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (mon_num === 1) {
    // 单只巨人
    await era.print('『喝下去哦』');
    await era.print(
      `${arg_name}侍奉着一只巨人，不过怎么张嘴都吞不进巨人的阴茎，只能舔舐着。`,
    );
    await era.print(`绝顶了的巨人，把精液从头到脚浇了${she(arg)}一身。`);
    await era.print('口交经验+1');
    await era.print('精液经验+1');
    chara(arg).dungeon.口交经验 += 1; // EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += 1; // EXP:ARG:20 精液经验

    // 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // CFLAG:16 = 995（怪物的阴茎）
    }
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (rand_n(4) === 0) {
    // 贯穿
    await era.printAndWait('『简直就像洋娃娃一样』');
    await era.printAndWait(`${arg_name}的腰被巨人抓着，用巨大的阴茎贯穿了。`);
    await era.printAndWait('『喂！还要继续的啊！』');

    if (era.get(`talent:${arg}:41`)) {
      // 不惧疼痛
      await era.printAndWait(`${arg_name}因为平时的训练，勉强保留着意识。`);
      await era.printAndWait('『不错的声音哦！来吧！』');
      await era.printAndWait(
        `${arg_name}痛苦得基本叫不出声了，拼命地忍受着扩张。`,
      );
      await era.print(`恐怖点数+${mon_num * 10}`);
      era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    } else {
      // その他
      await era.printAndWait(
        `经历过最初的失禁以及失神之后，${she(arg)}已经不知道这是第几个巨人了。`,
      );
    }

    await era.print(`私处经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    await era.print(`阴道扩张经验+${mon_num}`);
    await era.print('异常经验+1');
    chara(arg).dungeon.私处经验 += mon_num; // EXP:ARG:0 私处经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验
    chara(arg).dungeon.异常经验 += 1; // EXP:ARG:50 异常经验
    // 显示「阴道扩张经验」，写入对应 EXP:52 私处扩张经验——显示与入账一致
    chara(arg).dungeon.私处扩张经验 += mon_num; // EXP:ARG:52 私处扩张经验
  } else if (rand_n(3) === 0) {
    // 舔舐
    await era.printAndWait('『快点啊！』');
    await era.printAndWait(`${arg_name}拼命地舔舐着巨人的阴茎。`);
    await era.printAndWait(
      `${she(arg)}拼命地哀求着，请饶了${she(arg)}，不要玩坏她的性器和肛门。`,
    );
    await era.printAndWait(
      `必须快点搞定这${mon_num}只巨人，不然不知道他们什么时候会改变主意。`,
    );

    if (era.get(`talent:${arg}:52`)) {
      // 擅用舌头
      await era.printAndWait('『哦！小东西，你很擅长用舌头嘛！』');
      await era.printAndWait(
        `${arg_name}拼命地用舌头侍奉着，展现出天赋般的好技术。`,
      );
      await era.printAndWait(
        `巨人被${she(arg)}灵活的舌头弄射了，精液像喷泉一样，从${arg_name}的头顶淋到脚底。`,
      );
      mon_num *= 2;
    }

    await era.print(`口交经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.口交经验 += mon_num; // EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验

    // 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995;
    }
  } else if (rand_n(2) === 0) {
    // 肛门贯穿
    await era.printAndWait('『哦！小东西，叫得不错嘛！』');
    await era.printAndWait(
      `${arg_name}的肛门被巨人强行用阴茎贯穿，撕裂的痛楚让她声嘶力竭地惨叫着，晕了过去。肛门处流出了鲜血。`,
    );
    await era.printAndWait('『又一个坏掉了吗？用点回复药或许可以再来几下。』');
    await era.printAndWait(
      `插坏了的肛门，用了回复药之后被继续玩弄着，直到满足了所有${mon_num}只巨人为止……`,
    );

    if (era.get(`talent:${arg}:34`)) {
      // 抵抗
      await era.printAndWait(
        `${arg_name}竭尽全力地企图爬走，但是被轻易地抓了回来。`,
      );
      await era.printAndWait(`『喂！这里有个想逃跑的！抓住${she(arg)}！』`);
      await era.printAndWait(
        `${arg_name}被巨人抓着四肢，那不设防的肛门，又一次被巨人的巨根插入了……`,
      );
      await era.print(`恐怖点数+${mon_num * 10}`);
      era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    }

    await era.print(`肛门经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    await era.print(`肛门扩张经验+${mon_num}`);
    await era.print('异常经验+1');
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验
    chara(arg).dungeon.异常经验 += 1; // EXP:ARG:50 异常经验
    chara(arg).dungeon.肛门扩张经验 += mon_num; // EXP:ARG:53 肛门扩张经验
  } else {
    // 精液水盆
    await era.printAndWait('『我想到好主意了』');
    await era.printAndWait(
      '巨人们不知为何开始集体打飞机，集中射在巨大的水盆里。',
    );
    await era.printAndWait(`${arg_name}对未知状况非常恐惧。`);
    await era.printAndWait(`巨人端着一大盆精液，对${she(arg)}说，`);
    await era.printAndWait('『不想死的话，就全部喝光。』');
    await era.printAndWait(`${arg_name}脸上血色褪尽。`);

    if (era.get(`talent:${arg}:11`)) {
      // 反抗心
      await era.printAndWait(`${arg_name}用冷淡的眼神瞪着巨人，表示不从。`);
      await era.printAndWait('『看来还不明白啊！』');
      await era.printAndWait(
        `巨人用巨大的手掌按着${arg_name}的头，直接把头按入水盆里。`,
      );
      await era.printAndWait('「咕噜，咕噜，咕咕噜」');
      await era.printAndWait(
        `巨人把${she(arg)}的头抓起来，那张满脸精液的脸上，再也见不到反抗的意思了。`,
      );
      await era.print(`恐怖点数+${mon_num * 10}`);
      era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    }

    await era.print(`精液经验+${mon_num * 10}`);
    chara(arg).dungeon.精液经验 += mon_num * 10; // EXP:ARG:20 精液经验
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// man_ryou(arg)
/**
 * 魔族男人凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列魔族男人数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function man_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const c131 = era.get(`cflag:${arg}:131`) || 0;

  // 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  // 畏怖阶段口上（PRINTDATAW 三档）
  if (c131 > 5) {
    await era.printAndWait(
      pick(
        [
          '『已经、离不开我们了吗』',
          '『嘿嘿、今儿也会好好疼你』',
          '『对黑暗世界、还习惯吗』',
          '『又来被侵犯了吗』',
          '『又来寻欢啊…不知道过去的自己见到现在这样、会怎么想啊？』',
        ],
        rand_n,
      ),
    ); // 隷属状態
  } else if (c131 > 3) {
    await era.printAndWait(
      pick(
        [
          '『哦、又来啦』',
          '『怕不是故意输掉的吧？』',
          '『这么喜欢我们的肉棒吗？』',
          '『真是心口不一』',
          '冒险者默默服从着魔族男人们的要求……',
          '魔族男人们、缓缓地向冒险者靠近、冒险者将目光撇到了一边',
        ],
        rand_n,
      ),
    ); // 強畏怖状態
  } else {
    await era.printAndWait(
      pick(
        [
          '『真是好女人啊！』',
          '『真是喜欢啊！？』',
          '『小妹妹，欢迎来到黑暗的世界。』',
          '『别怨了，是你们先打下来的。』',
          '『有想过会变成这样吗？』',
        ],
        rand_n,
      ),
    ); // 初见
  }

  // MON_NUM = E:(B + 99)（参数注入）

  // 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait('『笨女人，前面严防死守，后面却全是破绽。』');
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量保护着，不过没能堵住肛门。`,
    );
    await era.printAndWait('『来吧！让菊花绽放！』');
    await era.printAndWait(`${arg_name}的肛门被插入了，不断地被灌入了精液。`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (mon_num === 1) {
    // 单只魔族男人
    await era.print('『如果作为肉便器被卖掉了话，我每晚都来抱你～』');
    await era.print(`${arg_name}被魔族男人从后侵犯着。`);
    await era.print(
      '她四肢着地趴在地上，脸贴着地板，随着身后的抽插不停地哭泣。',
    );
    await era.print('私处经验+1');
    await era.print('精液经验+1');
    chara(arg).dungeon.私处经验 += 1; // EXP:ARG:0 私处经验
    chara(arg).dungeon.精液经验 += 1; // EXP:ARG:20 精液经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (rand_n(5) === 0) {
    // 乳交/口交
    if (era.get(`talent:${arg}:109`)) {
      // 贫乳
      await era.printAndWait('『完全没有胸嘛！屁股露出来，抬高点！』');
      await era.printAndWait(
        `${arg_name}露出了屈辱的神色，向魔族男人翘起了屁股。`,
      );
    } else {
      await era.printAndWait('『用胸部来…乳交你不知道？』');
    }
    await era.printAndWait(
      `${arg_name}全裸地侍奉着兽人们的阴茎。只要喝掉所有${mon_num}个男人的精液的话，它们就答应不侵犯${she(arg)}的下体………`,
    );

    if (
      era.get(`talent:${arg}:110`) ||
      era.get(`talent:${arg}:114`) ||
      era.get(`talent:${arg}:119`)
    ) {
      // 巨乳・爆乳・超乳
      await era.printAndWait(
        `被${arg_name}傲人的丰满胸部夹着，魔族男人们纷纷去了。`,
      );
      await era.printAndWait('『喔！真是一双好乳房啊……阴茎专用的乳房！』');
      await era.printAndWait(`胸部的触感让${arg_name}红晕满脸，低下了头。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    } else if (era.get(`talent:${arg}:109`)) {
      // 贫乳
      await era.printAndWait('『接下来用嘴！鸡鸡都被你弄脏了，弄干净！』');
      await era.printAndWait(`${arg_name}依照吩咐，用嘴巴侍奉着阴茎……`);
    }

    await era.print(`口交经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.口交经验 += mon_num; // EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验

    // 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995;
    }
  } else if (rand_n(4) === 0) {
    // 肉便器
    await era.printAndWait(
      `${arg_name}被强行宣布为肉便器，全身都被写满了淫秽的话语。`,
    );

    // 旧引擎里这是一整行：「…的身上，被写着」、落書各追加档
    //（处女二选一等）、
    // 末尾三选一与「之类的话。」都不换行，
    // 到 PRINTFORMW 才收行。条件提到语句外当取值、片段文本留在输出
    // 语句里；末尾三选一的 RAND 抽数留在语句内惰性求值（与
    // 男版肉便器行同款）
    const dull = era.get(`talent:${arg}:22`) || era.get(`talent:${arg}:21`);
    const modest = era.get(`talent:${arg}:24`) || era.get(`talent:${arg}:30`);
    const wet = era.get(`talent:${arg}:42`);
    const pleased = era.get(`talent:${arg}:70`) || era.get(`talent:${arg}:73`);
    const milky =
      era.get(`talent:${arg}:110`) ||
      era.get(`talent:${arg}:114`) ||
      era.get(`talent:${arg}:119`);
    const has_penis =
      era.get(`talent:${arg}:121`) || era.get(`talent:${arg}:122`);
    const virgin = era.get(`talent:${arg}:0`);
    await era.printAndWait(
      `${arg_name}的身上，被写着` +
        (virgin ? '【处女开通纪念】' : '【最喜欢阴茎】') +
        (dull ? '【性冷淡便器】' : '') +
        (modest ? '【千金小姐便器出道】' : '') +
        (wet ? '【又粘又湿】' : '') +
        (pleased ? '【愉悦的脸】' : '') +
        (milky ? '【乳牛】' : '') +
        (has_penis ? '【有鸡鸡的奴隶】' : '') +
        (rand_n(3) === 0
          ? '【操我】'
          : rand_n(2) === 0
            ? '【肛门免费】'
            : '【母猪】') +
        '之类的话。络绎不绝的魔族男人，将嘴巴、私处、肛门等等地方都侵犯了，精液流得到处都是。',
    );
    await era.printAndWait(
      `当被最后一人抱着的时候，${arg_name}已经失去了任何表情，成为全身的穴都流出着精液的下流便器了。`,
    );
    await era.printAndWait(
      `地下城里，充斥着${mon_num}人份的精液和爱液的异样臭味。魔族男人对原冒险者重生成为肉便器相当欢迎。`,
    );

    // 肌の色で分岐
    if (era.get(`talent:${arg}:244`)) {
      await era.printAndWait(`${arg_name}的蓝色肌肤，被沾满了精液……`); // 恶魔肌肤
    } else if (era.get(`talent:${arg}:253`)) {
      await era.printAndWait(
        `${arg_name}健康的褐色肌肤，与白浊的精液形成鲜明又淫靡的对比……`,
      ); // 褐色肌肤
    } else if (era.get(`talent:${arg}:255`)) {
      await era.printAndWait(`${arg_name}美丽的白皙肌肤被精液玷污了……`); // 白皙
    }

    await era.print(`私处经验+${mon_num}`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`口交经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.私处经验 += mon_num; // EXP:ARG:0 私处经验
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.口交经验 += mon_num; // EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验

    // 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995;
    }
  } else if (rand_n(3) === 0) {
    // 灌肠
    await era.printAndWait('『明明是冒险者，却忍不住了吗？』');
    await era.printAndWait(
      `${arg_name}的肛门被灌入了灌肠液，忍受着强烈的便意。`,
    );
    await era.printAndWait(
      '『快点自慰！在漏出来之前自慰去了的话就带你上厕所！』',
    );
    await era.printAndWait(
      `${arg_name}拼命地自慰着，但是在这异常的状况中，却无法兴奋起来。`,
    );
    await era.printAndWait('肛门里的污物，终于无法忍耐地飞散而出。');
    await era.printAndWait(
      `魔族男人们看到这样，毫不留情地说着侮蔑的话，${arg_name}在这份屈辱中泣不成声。`,
    );

    if (era.get(`talent:${arg}:62`)) {
      // 反感污臭
      await era.printAndWait(
        `${arg_name}因自己拉出的东西的味道而皱起眉头，羞愧欲死。`,
      );
      await era.print(`苦痛点数+${mon_num * 10}`);
      era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    }

    await era.print(`耻情点数+${mon_num * 10}`);
    await era.print(`屈服点数+${mon_num * 10}`);
    await era.print('自慰经验+1');
    await era.print('调教自慰经验+1');
    era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
    chara(arg).dungeon.自慰经验 += 1; // EXP:ARG:10 自慰经验
    chara(arg).dungeon.调教自慰经验 += 1; // EXP:ARG:11 调教自慰经验
  } else if (rand_n(2) === 0) {
    // 舔肛
    await era.printAndWait('『那个冒险者大人，在舔我的肛门哦！』');
    await era.printAndWait(
      `${arg_name}以舔肛门为代价，获得了魔族男人对于生命安全的保证。`,
    );
    await era.printAndWait('『你的尊严，真不值钱呢！』');
    await era.printAndWait(
      `${arg_name}拼命地侍奉着，听到这话，心里想死的心都有了，泪水在眼眶中打转。`,
    );
    await era.printAndWait(
      `侍奉结束之后，${arg_name}还被迫要说出淫秽的话语。${she(arg)}忍无可忍地大哭着，宣布自己喜欢舔肛。`,
    );

    if (era.get(`talent:${arg}:17`)) {
      // 低姿态
      await era.printAndWait(
        `自尊心低下的${arg_name}，拼命地说着自己是舔肛用奴隶。`,
      );
      // Y += 10 —— 死代码（Y 全库无初始化与读取，见文件头）
    }
    if (era.get(`talent:${arg}:62`)) {
      // 反感污臭
      await era.printAndWait(`${arg_name}因为舔肛而恶心地吐了。`);
      // Y += 10 —— 死代码（同上）
    }

    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  } else {
    // 娼妓
    await era.printAndWait('『这个为了保命就来者不拒的妓女！』');
    await era.printAndWait(
      `${arg_name}屁股翘起，用屈辱的姿势承受着不知多少个魔族男人的肉棒。沐浴在他们的精液和骂声之中。`,
    );
    await era.printAndWait(
      '『说！说我是个相对于做冒险者，更喜欢做妓女的淫乱贱婊！』',
    );
    await era.printAndWait(
      `${arg_name}在激烈的抽插中，不断地重复着屈辱的台词。`,
    );

    if (era.get(`talent:${arg}:17`)) {
      // 低姿态
      await era.printAndWait(
        `${arg_name}拼命地重复着淫乱的话语乞求饶命，美丽的脸庞在恐惧和淫媚中扭曲了……`,
      );
      await era.print(`屈服点数+${mon_num * 10}`);
      era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
    }
    if ((era.get(`abl:${arg}:21`) || 0) > 0) {
      // 抖M气质
      await era.printAndWait(`说着过激的言语，${arg_name}的心里产生了情欲。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.print(`私处经验+${mon_num}`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.私处经验 += mon_num; // EXP:ARG:0 私处经验
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// girl_ryou(arg)
/**
 * 女魔族凌辱（女性对象；兼男性对象的防御分支）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列女魔族数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function girl_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // SIF NO:ARG == 0 → RETURN 0（角色 0 = 魔王不可被凌辱）
  // SIF NO:ARG == 0 → RETURN 0（NO = 角色 ID，ere 侧直接判 arg）
  if (arg === 0) {
    return 0;
  }

  // 男人の場合（TALENT:122）——结构保留（分派已按 TALENT:122
  // 分流到 H14，此分支对女性对象不可达）
  if (era.get(`talent:${arg}:122`)) {
    if (era.get(`talent:${arg}:100`)) {
      // 娇小
      if (rand_n(3) === 0) {
        await era.printAndWait('『嘻嘻，真是好孩子呢』');
      } else if (rand_n(2) === 0) {
        await era.printAndWait('『让姐姐来教你一些好事！』');
      } else {
        await era.printAndWait('『哎呀？勃起了么？』');
      }
    } else {
      await era.printAndWait('『可悲的人呢，勃起了么？』');
    }

    if (mon_num === 1) {
      // 一人
      await era.printAndWait('『独占你了！难道这是第一次？』');
      await era.printAndWait(`${arg_name}被魔界的女人口交着，`);
      // 旧引擎里这是一整行：「紫色的长舌头，在…的」与
      // 阴茎分档都不换行，末段的 PRINTFORMW 才收行。
      const p318 = era.get(`talent:${arg}:318`) || 0; // 阴茎分档
      await era.printAndWait(
        `紫色的长舌头，在${arg_name}的` +
          (p318 === 1
            ? '巨根'
            : p318 === 2
              ? '短小包茎'
              : p318 === 3
                ? '包茎'
                : p318 === 4
                  ? '马阴茎'
                  : '阴茎') +
          '上舔舐着，吸取着精气。',
      );
      if (p318 === 1) {
        await era.printAndWait('『好大，下巴都要脱落了♪』');
      } else if (p318 === 2) {
        await era.printAndWait('『冒险者大人的这里，像小孩子一样♪』');
      } else if (p318 === 3) {
        await era.printAndWait('『让我帮你把包皮里的污垢弄干净吧』');
      } else if (p318 === 4) {
        await era.printAndWait('『呵呵，被谁改造的？』');
      } else {
        await era.printAndWait('『加油哦！不要一下子就射了哦♪』');
      }
      await era.print(`耻情点数+${mon_num * 10}`);
      await era.print(`屈服点数+${mon_num * 10}`);
      await era.print(`绝顶经验+${mon_num}`);
      await era.print(`射精经验+${mon_num}`);
      era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
      era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
      chara(arg).dungeon.绝顶经验 += mon_num; // EXP:ARG:2 绝顶经验
      chara(arg).train.射精经验 += mon_num; // EXP:ARG:3 射精经验
    } else if (rand_n(3) === 0) {
      // 多人口交
      await era.printAndWait(
        '『大家一起来帮他含，一下就射的话，就要好好处罚你喔！』',
      );
      await era.printAndWait(`${arg_name}被魔界的女人口交着，`);
      // 与上一个分支同型：「紫色的长舌头，在…的」与
      // 阴茎分档都不换行，末段 PRINTFORMW 才收行（#624）
      const p318b = era.get(`talent:${arg}:318`) || 0; // 阴茎分档
      await era.printAndWait(
        `紫色的长舌头，在${arg_name}的` +
          (p318b === 1
            ? '巨根'
            : p318b === 2
              ? '短小包茎'
              : p318b === 3
                ? '包茎'
                : p318b === 4
                  ? '马阴茎'
                  : '阴茎') +
          '上舔舐着，吸取着精气。',
      );
      if (p318b === 1) {
        await era.printAndWait('『好大，下巴都要脱落了♪』');
      } else if (p318b === 2) {
        await era.printAndWait('『冒险者大人的这里，小孩子一样♪』');
      } else if (p318b === 3) {
        await era.printAndWait('『让我帮你把包皮里的污垢弄干净吧』');
      } else if (p318b === 4) {
        await era.printAndWait('『呵呵，被谁改造的？』');
      } else {
        await era.printAndWait('『加油哦！不要一下子就射了哦♪』');
      }
      await era.print(`耻情点数+${mon_num * 10}`);
      await era.print(`屈服点数+${mon_num * 10}`);
      await era.print(`绝顶经验+${mon_num}`);
      await era.print(`射精经验+${mon_num}`);
      era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
      era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
      chara(arg).dungeon.绝顶经验 += mon_num; // EXP:ARG:2 绝顶经验
      chara(arg).train.射精经验 += mon_num; // EXP:ARG:3 射精经验
    } else if (rand_n(2) === 0) {
      // 跨坐
      await era.printAndWait(
        '『让魔界的女人来教你什么才是女人的滋味……试过一次你就不会再想和你的同胞做的了。』',
      );
      await era.printAndWait(`${arg_name}被魔界的女性跨坐在身上，吸取着精气。`);
      const p318c = era.get(`talent:${arg}:318`) || 0;
      if (p318c === 1) {
        await era.printAndWait('『哎呀，好大♪』'); // 巨根
      } else if (p318c === 2) {
        await era.printAndWait('『小的都不知道你进来了没有……♪』'); // 短小包茎
      } else if (p318c === 4) {
        await era.printAndWait('『好，好厉害……好大，好棒』'); // 馬ペニス
      } else {
        await era.printAndWait('『加油哦！不要一下子就射了哦♪』'); // 普通・包茎
      }
      await era.print(`耻情点数+${mon_num * 15}`);
      await era.print(`屈服点数+${mon_num * 15}`);
      await era.print(`性交经验+${mon_num}`);
      await era.print(`绝顶经验+${mon_num}`);
      await era.print(`射精经验+${mon_num}`);
      era.add(`juel:${arg}:8`, mon_num * 15); // JUEL:ARG:8 耻情
      era.add(`juel:${arg}:6`, mon_num * 15); // JUEL:ARG:6 屈服
      chara(arg).dungeon.性交经验 += mon_num; // EXP:ARG:5 性交经验
      chara(arg).dungeon.绝顶经验 += mon_num; // EXP:ARG:2 绝顶经验
      chara(arg).train.射精经验 += mon_num; // EXP:ARG:3 射精经验
    } else {
      // 喂奶
      await era.printAndWait('『胸部，味道好吗？舔个没完呢～』');
      await era.printAndWait(`${arg_name}被魔界的女性一边喂奶，一边被撸着。`);
      // 与上面两支同型：「紫色的手，温柔地在…的」与
      // 阴茎分档都不换行，末段 PRINTFORMW 才收行（#624）
      const p318d = era.get(`talent:${arg}:318`) || 0; // 阴茎分档
      await era.printAndWait(
        `紫色的手，温柔地在${arg_name}的` +
          (p318d === 1
            ? '巨根'
            : p318d === 2
              ? '短小包茎'
              : p318d === 3
                ? '包茎'
                : p318d === 4
                  ? '马阴茎'
                  : '阴茎') +
          '上爱抚着。',
      );
      if (p318d === 1) {
        await era.printAndWait('『好大啊……来享受快乐吧♪』');
      } else if (p318d === 2) {
        await era.printAndWait('『带皮的短小鸡鸡♪变得黏糊糊的～』');
      } else if (p318d === 3) {
        await era.printAndWait('『帮你剥皮除垢哦～』');
      } else if (p318d === 4) {
        await era.printAndWait('『呵呵，被谁改造的？』');
      } else {
        await era.printAndWait('『加油哦！不要一下子就射了哦♪』');
      }
      await era.print(`耻情点数+${mon_num * 5}`);
      await era.print(`屈服点数+${mon_num * 15}`);
      await era.print(`绝顶经验+${mon_num}`);
      await era.print(`射精经验+${mon_num}`);
      era.add(`juel:${arg}:8`, mon_num * 5); // JUEL:ARG:8 耻情
      era.add(`juel:${arg}:6`, mon_num * 15); // JUEL:ARG:6 屈服
      chara(arg).dungeon.绝顶经验 += mon_num; // EXP:ARG:2 绝顶经验
      chara(arg).train.射精经验 += mon_num; // EXP:ARG:3 射精经验
    }

    await era.waitAnyKey(); // WAIT
    return 0;
  }

  // —— 女性对象主流程 ——

  // 畏怖阶段口上（PRINTDATAW 三档；含 %UNICODE(0x2661) *1% 心形）
  if (era.get(`cflag:${arg}:131`) > 5) {
    await era.printAndWait(
      pick(
        [
          '『完全沉迷其中了呀』',
          '『欢迎光临……呵呵、又来啦』',
          '『已经、忘不掉了对吧』',
          `『已经上瘾了……对吧${'♡'.repeat(1)}』`,
          `『小猫咪、欢迎到来${'♡'.repeat(1)}』`,
        ],
        rand_n,
      ),
    ); // 隷属状態
  } else if (era.get(`cflag:${arg}:131`) > 3) {
    await era.printAndWait(
      pick(
        [
          '『哎呀、又来了呀』',
          '『故意输的？　啊哈哈』',
          '『对暗黑世界、有兴趣？』',
          '『好弱啊。认真的吗？』',
          '冒险者默默服从着魔族女人们的要求……',
          '魔族女人们、缓缓地向冒险者靠近、冒险者将目光撇到了一边',
        ],
        rand_n,
      ),
    ); // 強畏怖状態
  } else {
    await era.printAndWait(
      pick(
        [
          '『是异性恋也无所谓哦～』',
          `『这就让你尝尝${'♡'.repeat(1)}』`,
          '『在你坏掉之前可不会停哦』',
          '『你不知道？黑暗世界的女人，无论男女都不会放过哦！』',
          '『这就让你的身体变得再也不需要男人吧』',
          '『因为同为女性才知道全部舒服的地方啊』',
          '『让你知道未尝过的快乐～』',
          '『魔王大人，偶尔也会也想一个百合奴隶吧？』',
        ],
        rand_n,
      ),
    ); // 初见
  }

  // MON_NUM = E:(B + 99)（参数注入）

  // 处女封印
  if (era.get(`talent:${arg}:273`)) {
    if (rand_n(2) === 0) {
      if (rand_n(2) === 0) {
        await era.printAndWait(
          '『真是较真。这样的孩子反而容易觉醒后面的快感呢～』',
        );
      } else {
        // 旧引擎里这是一整行：「『这边的穴」与 RAND:2 的
        // 二选一都不换行，末段的 PRINTW 才收行。
        // RAND 抽数有状态，留在语句内惰性求值。
        await era.printAndWait(
          '『这边的穴' +
            (rand_n(2) === 0 ? '才有的' : '也有的') +
            '个中滋味 好好感・受・吧』',
        );
      }
      await era.printAndWait(
        `${arg_name}的纯洁被神圣力量保护着，不过没能防住肛门。`,
      );
      if (rand_n(2) === 0) {
        await era.printAndWait('『放松一些。以后还会经常被这么玩的啦～』');
      } else {
        await era.printAndWait('『舒服的话就好好发出声音来才好哦？』');
      }
      await era.printAndWait(
        `${arg_name}肛门里的皱褶，被魔族女性仔细地舔舐着。`,
      );
    } else {
      // 空分支（旧引擎 ELSE 无内容）
    }

    if ((era.get(`abl:${arg}:22`) || 0) > 0 || era.get(`talent:${arg}:81`)) {
      // 百合气质・双性恋
      await era.printAndWait(`${arg_name}感到心中有什么在蠢动着。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.print(`肛门经验+${mon_num * 5}`);
    chara(arg).dungeon.肛门经验 += mon_num * 5; // EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (mon_num === 1) {
    // 单只女魔族
    // 两个分支条件是重复的（IF RAND:3 == 0 / ELSEIF RAND:3 == 0），
    // 第二分支恒不达——两条文本都并在第一分支，结构收拢成单条件
    if (rand_n(3) === 0) {
      await era.print('『弄得好的话就好好奖励你』');
      await era.print('『那样子弄，完全不舒服嘛』'); // （第二分支恒不达，见上注）
    } else {
      await era.print('『再好好努力哦』');
    }
    await era.print(`${arg_name}被强迫着舔舐魔族女人的阴部。`);
    await era.print('她像狗一样的趴在地上，拼命地侍奉着自己的女主人。');

    if ((era.get(`abl:${arg}:22`) || 0) > 0 || era.get(`talent:${arg}:81`)) {
      // 百合气质・双性恋
      await era.printAndWait(`${arg_name}感到心中有什么在蠢动着。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.print('百合经验+1');
    chara(arg).train.百合经验 += 1; // EXP:ARG:40 百合经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (rand_n(5) === 0) {
    // 舔舐奴隶
    await era.printAndWait('『你的新职业就是舔舐奴隶了哦！原冒险者大人♪』');
    await era.printAndWait(
      `${arg_name}全裸着像狗一样地侍奉着魔族女性，把全部${mon_num}人都舔满足的话，就饶${she(arg)}一命。`,
    );

    if ((era.get(`abl:${arg}:22`) || 0) > 0 || era.get(`talent:${arg}:81`)) {
      // 百合气质・双性恋
      await era.printAndWait(`${arg_name}感到心中有什么在蠢动着。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.print(`百合经验+${mon_num}`);
    chara(arg).train.百合经验 += mon_num; // EXP:ARG:40 百合经验
  } else if (rand_n(4) === 0) {
    // 乱交派对
    await era.printAndWait('『哎呀，这么粗的也没问题吗？』');
    await era.printAndWait(
      `${arg_name}成为了魔族女人们的玩具，私处和肛门被插入了粗大的假阳具。`,
    );
    await era.printAndWait('空闲的嘴巴也被强行要求舔舐，爱液喷到了脸上。');
    await era.printAndWait(
      `不知不觉间，大家都兴奋了，就在外头，以${arg_name}为中心开始了乱交派对。`,
    );
    await era.printAndWait(
      `${arg_name}和${mon_num}个魔族女孩肉体碰撞着，相互在对方身上贪求着快乐，爱液汇聚成了一小水潭。`,
    );

    if ((era.get(`abl:${arg}:22`) || 0) > 0 || era.get(`talent:${arg}:81`)) {
      // 百合气质・双性恋
      await era.printAndWait(`${arg_name}感到心中有什么在蠢动着。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.print(`私处经验+${mon_num}`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`百合经验+${mon_num}`);
    chara(arg).dungeon.私处经验 += mon_num; // EXP:ARG:0 私处经验
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).train.百合经验 += mon_num; // EXP:ARG:40 百合经验
  } else if (rand_n(3) === 0) {
    // 喝尿
    await era.printAndWait('『想尿尿了呢～』');
    await era.printAndWait(`${arg_name}有讨厌的预感。`);
    await era.printAndWait(
      '『对了，要把我的尿喝光哦！不然不会放过你的。要是洒出来了，从今往后就把你当成女子便器了哦♪』',
    );
    await era.printAndWait(
      `${arg_name}的嘴巴被魔族女性压在阴部处，对着脸撒起尿来。`,
    );
    await era.printAndWait('尿液无情地从嘴里不断灌入……');
    await era.printAndWait(
      `魔族女人们，看着一边哭泣一边喝尿的${arg_name}笑了。不断用侮辱的语言刺激着${she(arg)}。`,
    );

    if ((era.get(`abl:${arg}:22`) || 0) > 0 || era.get(`talent:${arg}:81`)) {
      // 百合气质・双性恋
      await era.printAndWait(`${arg_name}感到心中有什么在蠢动着。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.print(`耻情点数+${mon_num * 10}`);
    await era.print(`屈服点数+${mon_num * 10}`);
    await era.print(`百合经验+${mon_num}`);
    chara(arg).train.百合经验 += mon_num; // EXP:ARG:40 百合经验
    era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
  } else if (rand_n(2) === 0) {
    // 当众自慰
    await era.printAndWait('『快点，在大家面前自慰哦！』');
    await era.printAndWait(`${arg_name}在众目睽睽之下被迫自慰着。`);
    await era.printAndWait(
      '『这样的自慰可是女人的专利哦。从今往后就当百合奴隶吧，原冒险者大人♪』',
    );
    await era.printAndWait(
      `${arg_name}的周围，魔族女孩们正以奇妙的方式交合着。`,
    );
    await era.printAndWait(
      `在${she(arg)}感觉自己性癖都在扭曲的时候，魔族女孩们高潮了。`,
    );

    if ((era.get(`abl:${arg}:22`) || 0) > 0 || era.get(`talent:${arg}:81`)) {
      // 百合气质・双性恋
      await era.printAndWait(`${arg_name}感到心中有什么在蠢动着。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.print(`耻情点数+${mon_num * 10}`);
    await era.print(`屈服点数+${mon_num * 10}`);
    await era.print('自慰经验+1');
    await era.print('调教自慰经验+1');
    await era.print('绝顶经验+1');
    await era.print(`百合经验+${mon_num}`);
    chara(arg).train.百合经验 += mon_num; // EXP:ARG:40 百合经验
    era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
    chara(arg).dungeon.自慰经验 += 1; // EXP:ARG:10 自慰经验
    chara(arg).dungeon.调教自慰经验 += 1; // EXP:ARG:11 调教自慰经验
    chara(arg).dungeon.绝顶经验 += 1; // EXP:ARG:2 绝顶经验
  } else {
    // 女人强奸女人
    await era.printAndWait('『也想强奸一次女人呢～♪』');
    await era.printAndWait(
      `${arg_name}的屁股被抬高，以屈辱的姿态，迎接着身后假阳具的激烈抽插。`,
    );
    await era.printAndWait('『哈哈～好姐妹啊～被女人侵犯，兴奋起来了吗？』');
    await era.printAndWait(
      `${arg_name}被女人侵犯着，在这异常的性爱中，心里有什么萌芽了。`,
    );

    if ((era.get(`abl:${arg}:22`) || 0) > 0 || era.get(`talent:${arg}:81`)) {
      // 百合气质・双性恋
      await era.printAndWait(`${arg_name}为心中萌发的感情而感到兴奋……`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.print(`私处经验+${mon_num}`);
    chara(arg).dungeon.私处经验 += mon_num; // EXP:ARG:0 私处经验
    await era.print(`百合经验+${mon_num}`);
    chara(arg).train.百合经验 += mon_num; // EXP:ARG:40 百合经验
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// beast_ryou(arg)
/**
 * 魔兽凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列魔兽数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function beast_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  // 畏怖阶段口上（PRINTDATAW 三档）
  if (era.get(`cflag:${arg}:131`) > 5) {
    await era.printAndWait(
      pick(
        [
          '冒险者从魔兽的发臭的气息中感受到了爱意',
          '魔兽慢慢地靠近了冒险者、爬到了土下座着的冒险者身上……',
          '冒险者对逐渐熟悉了与兽相交的自己惊诧不已',
          '被魔兽的眼睛凝视着、冒险者只能伏下身子、将腰抬了起来',
          '冒险者已经无法从野兽粗暴的交尾中、脱身了……',
        ],
        rand_n,
      ),
    ); // 隷属状態
  } else if (era.get(`cflag:${arg}:131`) > 3) {
    await era.printAndWait(
      pick(
        [
          '冒险者渐渐习惯了魔兽的发臭的气息……',
          '魔兽静静的、像确认什么似的盯着冒险者',
          '冒险者这次也在与魔兽交尾的想象中、感受着奇妙的背德感',
          '魔兽的眼睛、像是在期待着什么似的、渐渐被欲望的颜色扭曲了',
          '冒险者想起了几次兽交的经历、股间湿了起来……',
          '魔兽静静的靠近冒险者、冷眼下看着一蹶不振的冒险者',
        ],
        rand_n,
      ),
    ); // 強畏怖状態
  } else {
    await era.printAndWait(
      pick(
        [
          '『咕噜咕噜噜』',
          '冒险者吃不消野兽的臭味。',
          '冒险者还未能接受自己被野兽扑倒的事实。',
          '『嘎哦～呜～～』',
          '冒险者因野兽的粗暴而感到恐惧。',
        ],
        rand_n,
      ),
    ); // 初见
  }

  // MON_NUM = E:(B + 99)（参数注入）

  // 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait('『噢！』');
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量守卫着，魔兽转而寻找其它洞穴。`,
    );
    await era.printAndWait('「啊！呜！不要啊……啊啊啊！」');
    await era.printAndWait(`${arg_name}的肛门被野兽的阴茎蹂躏了……`);

    if ((era.get(`talent:${arg}:314`) || 0) === 2) {
      // 人狼
      await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和野兽做爱……`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.print(`肛门经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    await era.printAndWait(`兽奸经验+${mon_num}`);
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验
    chara(arg).dungeon.兽奸经验 += mon_num; // EXP:ARG:56 兽奸经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (mon_num === 1) {
    // 单只魔兽
    await era.printAndWait('野兽压在冒险者的身上。');
    await era.printAndWait(`${arg_name}的私处被野兽野蛮地侵犯了，高声尖叫着。`);
    await era.printAndWait(`不一会儿，野兽在${she(arg)}体内射出了精液……`);

    if ((era.get(`talent:${arg}:314`) || 0) === 2) {
      // 人狼
      await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和野兽做爱……`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.printAndWait('私处经验+1');
    chara(arg).dungeon.私处经验 += 1; // EXP:ARG:0 私处经验
    await era.printAndWait('兽奸经验+1');
    chara(arg).dungeon.兽奸经验 += 1; // EXP:ARG:56 兽奸经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  // 轮奸
  await era.printAndWait('野兽们，开始轮番兽奸冒险者。');
  await era.printAndWait(
    `${arg_name}无法面对自己被野兽轮奸的事实，保持着母狗的姿态，呆若木鸡……`,
  );

  if ((era.get(`talent:${arg}:314`) || 0) === 2) {
    // 人狼
    await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和野兽做爱……`);
    await era.print(`欲情点数+${mon_num * 10}`);
    era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
  }

  await era.print(`苦痛点数+${mon_num * 10}`);
  await era.print(`恐怖点数+${mon_num * 10}`);
  await era.print(`私处经验+${mon_num}`);
  chara(arg).dungeon.私处经验 += mon_num; // EXP:ARG:0 私处经验
  era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
  era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  await era.printAndWait(`兽奸经验+${mon_num}`);
  chara(arg).dungeon.兽奸经验 += mon_num; // EXP:ARG:56 兽奸经验
  return 0;
}

// brain_ryou(arg)
/**
 * 食脑魔凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列食脑魔数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function brain_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  // 畏怖阶段口上（PRINTDATAW 三档）
  if (era.get(`cflag:${arg}:131`) > 5) {
    await era.printAndWait(
      pick(
        [
          '冒险者几经食脑魔脑改造后、不仅不抵抗了、还满是媚态地纠缠在一起……',
          '食脑魔在媚态的食粮跟前、发出了奇妙的笑声',
          '冒险者沉浸在大脑在改造所致的异次元的快乐中、空洞的双眼里闪烁着期待的神色……',
          '食脑魔舔了舔舌头。看来这份食粮、给它带来了捕食的喜悦',
          '冒险者对即将开始的异次元的快乐兴奋不已、甚至已经失禁了',
        ],
        rand_n,
      ),
    ); // 隷属状態
  } else if (era.get(`cflag:${arg}:131`) > 3) {
    await era.printAndWait(
      pick(
        [
          '冒险者在食脑魔的脑改造后、逐渐感到习惯了……',
          '食脑魔在玩坏了的食粮跟前、发出了令人不寒而栗的笑声',
          '冒险者感到自己的大脑、已经到达了无可挽回的地步',
          '食脑魔在战栗的食粮跟前、舔了舔舌头。冒险者默默地看着这一切……',
          '冒险者想起了食脑魔所带来的异次元地快乐、咬紧了牙关……',
        ],
        rand_n,
      ),
    ); // 強畏怖状態
  } else {
    await era.printAndWait(
      pick(
        [
          '冒险者对食脑魔早有耳闻，吓得屁滚尿流了。',
          '冒险者狂乱地挣扎着，企图逃避食脑魔。',
          '冒险者拼命地乞求着饶命。',
          '冒险者直接精神崩溃，痴痴地笑着。',
          '冒险者因为过度的恐惧而失禁了。',
        ],
        rand_n,
      ),
    ); // 初见
  }

  // MON_NUM = E:(B + 99)（参数注入）

  // 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait(`食脑魔咬住冒险者的头，开始支配${she(arg)}的精神。`);
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量保护着，不过食脑魔对这些事完全没兴趣。`,
    );
    await era.printAndWait('「啊…啊…啊…啊…啊……」');
    await era.printAndWait(`${arg_name}眼珠上翻，伸出舌头，脱粪了。`);
    await era.print(`肛门经验+${mon_num * 10}`);
    chara(arg).dungeon.肛门经验 += mon_num * 10; // EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (mon_num === 1) {
    // 单只食脑魔（致死）
    await era.print('「啊…啊…啊……呜，喔！……啊……」');
    await era.print(
      `${arg_name}的头盖骨被食脑魔用坚硬的触手贯通了，开始直接吸啜脑髓。`,
    );
    await era.print(`${she(arg)}的四肢狂乱地挥动，失禁，死掉了……`);
    chara(arg).dungeon.体力 = 0; // BASE:ARG:0 = 0
    await era.print('异常经验+1');
    chara(arg).dungeon.异常经验 += 1; // EXP:ARG:50 异常经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (rand_n(40) === 0) {
    // 低概率致死
    await era.print('「啊…啊…啊……呜，喔！……啊……」');
    await era.print(
      `${arg_name}的头盖骨被食脑魔用坚硬的触手贯通了，开始直接吸啜脑髓。`,
    );
    await era.print(`${she(arg)}的四肢狂乱地挥动，失禁，死掉了……`);
    chara(arg).dungeon.体力 = 0; // BASE:ARG:0 = 0
    await era.print('异常经验+1');
    chara(arg).dungeon.异常经验 += 1; // EXP:ARG:50 异常经验
  } else {
    // 媚药触手
    await era.printAndWait(
      `食脑魔的触手缠绕着冒险者，${she(arg)}死命地挣扎，却无法挣脱。`,
    );
    await era.printAndWait(
      `食脑魔的触手，直接突入到${arg_name}的脑子里，往脑髓注入媚药成分。`,
    );
    await era.printAndWait(`${arg_name}被过度的快感弄失禁了，成了废人。`);
    await era.printAndWait('幸好，躯干还是完好的。');
    await era.print('异常经验+1');
    chara(arg).dungeon.异常经验 += 1; // EXP:ARG:50 异常经验
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// horse_ryou(arg)
/**
 * 马凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列马数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function horse_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  // 畏怖阶段口上（PRINTDATAW 三档）
  if (era.get(`cflag:${arg}:131`) > 5) {
    await era.printAndWait(
      pick(
        [
          '冒险者不仅不再抵抗与马的交尾、甚至带着期待的眼神伸手触摸着马的阴茎……',
          '马凑近了败倒的冒险者、将勃起的阴茎伸到了眼前',
          '冒险者意识到了自己变得毫不抵触与马相交的事实、露出了令人作呕的笑容……',
          '马粗暴地对待冒险者、冒险者也好不挣扎的接受了……',
          '冒险者对马的粗暴行径、在心中感到了一丝悸动……',
        ],
        rand_n,
      ),
    ); // 隷属状態
  } else if (era.get(`cflag:${arg}:131`) > 3) {
    await era.printAndWait(
      pick(
        [
          '冒险者放弃了抵抗、轻轻戳了戳勃起的马阴茎……',
          '马看着放弃抵抗的冒险者、轻蔑地笑了起来',
          '冒险者回想起与马相交的自己、惊诧不已',
          '马大声嘶吼着、冒险者胆怯不已、手中的武器落在了地上……',
          '冒险者脑中铭刻下了马的粗暴行径、变得无法抵抗了……',
        ],
        rand_n,
      ),
    ); // 強畏怖状態
  } else {
    await era.printAndWait(
      pick(
        [
          '『唔哦哦！』',
          '冒险者吃不消马的臭味。',
          '冒险者还未能接受自己被马扑倒的事实。',
          '『吁！』',
          '冒险者因马的粗暴而感到恐惧。',
        ],
        rand_n,
      ),
    ); // 初见
  }

  // MON_NUM = E:(B + 99)（参数注入）

  // 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait(
      '养马人给马的阴茎施加了缩小的魔法，让它变小至适应肛门的大小。',
    );
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量保护着，不过没能防住肛门。`,
    );
    await era.printAndWait(
      '『你很有素质嘛～看在这个份上，就用魔法让你好受些。』',
    );
    await era.printAndWait(`${arg_name}不得不用肛门承受着兽奸……`);

    if ((era.get(`talent:${arg}:314`) || 0) === 2) {
      // 人狼
      await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和马做爱……`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.print(`肛门经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    await era.printAndWait(`兽奸经验+${mon_num}`);
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验
    chara(arg).dungeon.兽奸经验 += mon_num; // EXP:ARG:56 兽奸经验
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (mon_num === 1) {
    // 单匹马
    await era.printAndWait('马压在冒险者的身上。');
    await era.printAndWait(`${arg_name}的私处被马野蛮地侵犯了，高声尖叫着。`);
    await era.printAndWait(`不一会儿，马在${she(arg)}体内射出了精液……`);

    if ((era.get(`talent:${arg}:314`) || 0) === 2) {
      // 人狼
      await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和马做爱……`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.printAndWait('私处经验+1');
    chara(arg).dungeon.私处经验 += 1; // EXP:ARG:0 私处经验
    await era.printAndWait('兽奸经验+1');
    chara(arg).dungeon.兽奸经验 += 1; // EXP:ARG:56 兽奸经验
    return 0;
  }

  // 轮奸
  await era.printAndWait('好几匹马，开始轮番兽奸冒险者。');
  await era.printAndWait(
    `${arg_name}无法面对自己被马轮奸的事实，保持着母狗的姿态，呆若木鸡……`,
  );

  if ((era.get(`talent:${arg}:314`) || 0) === 2) {
    // 人狼
    await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和马做爱……`);
    await era.print(`欲情点数+${mon_num * 10}`);
    era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
  }

  await era.print(`苦痛点数+${mon_num * 10}`);
  await era.print(`恐怖点数+${mon_num * 10}`);
  await era.print(`私处经验+${mon_num}`);
  chara(arg).dungeon.私处经验 += mon_num; // EXP:ARG:0 私处经验
  era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
  era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  await era.printAndWait(`兽奸经验+${mon_num}`);
  chara(arg).dungeon.兽奸经验 += mon_num; // EXP:ARG:56 兽奸经验
  return 0;
}

// pc_ryou(arg0, arg1)
/**
 * PC 被凌辱的演出（对人格斗败北时调用）。
 *
 * ARG:0 = 魔王側（胜者）、ARG:1 = 勇者側（败者）。流程：旁观/不要选择 →
 * 武器检查（W:0 = 魔王武装存储编号；素手时装剑 40，CALL EQUIP_DATABASE）→
 * 按武器识别号（W:1）分四大支：49 触手 / 50 圣剑？→ 默认（魔界武器）→
 * 三连 REPEAT 随机凌辱 → 收尾百合判定。
 *
 * @param {number} arg0 魔王側角色号
 * @param {number} arg1 勇者側角色号
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function pc_ryou(arg0, arg1, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const winner_name = arg_name_of(arg0); // %SAVESTR:(ARG:0)%
  const loser_name = arg_name_of(arg1); // %SAVESTR:(ARG:1)%
  // MON_NUM：本函数无 E 表读取（#DIM 声明了但从未赋值——CALL MONSTER_DATA
  // 是死调用，不产生 MON_NUM 写入，见文件头）。所有 {MON_NUM}
  // 显示插值旧引擎里即为 0（JS 侧 mon_num 参数缺省 0，行为一致）。
  const mon_num = 0;

  await era.print(''); // PRINTL
  era.drawLine();
  await era.print(''); // PRINTL

  // 立绘（CALL CHA_IMG2(ARG:1)，未移植——见文件头；:2355 的
  // PRINTL 空格行并入占位注释，不单独输出）
  await era.print(''); // PRINTL

  // 选择循环：旁观凌辱 / 不要凌辱（#572：升格为按钮；注释此前误写成
  // 主框架的两行，文本相同故测试没红）
  era.printButton('- 旁观凌辱', 0);
  era.printButton('- 不要凌辱', 1);
  for (;;) {
    const result = await era.input(); // INPUT
    if (result < 0 || result >= 2) {
      continue; // GOTO INPUT_LOOP
    }
    if (result === 1) {
      return 0; // SIF RESULT == 1 → RETURN 0
    }
    break;
  }

  // 武器チェック（W:0 = CFLAG:ARG:0:550 武装存储编号）
  let w = { 存储编号: chara(arg0).chara.武装 }; // W:0
  // 素手の場合剑を装備（W:0 <= 0 → W:0 = 40，写回 CFLAG:550）
  if (w.存储编号 <= 0) {
    w.存储编号 = 40;
    chara(arg0).chara.武装 = w.存储编号; // CFLAG:ARG:0:550
  }
  equip_database(w); // CALL EQUIP_DATABASE
  // Y = 10 —— 死代码（Y 全库无初始化与读取，见文件头）
  const weapon_id = w.识别号; // W:1

  // 武器分岐：49 = 触手
  if (weapon_id === 49) {
    await era.printAndWait(`${winner_name}用触手把${loser_name}绑了起来。`);

    if (era.get(`talent:${arg1}:273`)) {
      // 处女封印（肛门路线）
      await era.printAndWait(
        `${loser_name}的纯洁被神圣力量保护着，不过没能防住肛门。`,
      );
      await era.printAndWait(
        `${winner_name}操纵着油腻腻的触手，开始侵犯${loser_name}的肛门……`,
      );

      if (
        (era.get(`abl:${arg1}:22`) || 0) > 0 ||
        era.get(`talent:${arg1}:81`)
      ) {
        // 百合气质・双性恋
        await era.printAndWait(`${loser_name}感到心中有什么在蠢动着。`);
        await era.print(`欲情点数+${mon_num * 10}`);
        era.add(`juel:${arg1}:5`, mon_num * 10); // JUEL:ARG:1:5 欲情
      }

      await era.print('肛门经验+10');
      await era.print('苦痛点数+80');
      await era.print('恐怖点数+80');
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('百合经验+5');
      }
      await era.print('触手经验+1');
      chara(arg1).dungeon.肛门经验 += 10; // EXP:ARG:1:1 肛门经验
      era.add(`juel:${arg1}:9`, 80); // JUEL:ARG:1:9 苦痛
      era.add(`juel:${arg1}:10`, 80); // JUEL:ARG:1:10 恐怖
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        chara(arg0).train.百合经验 += 5; // EXP:ARG:0:40 百合经验
        chara(arg1).train.百合经验 += 5; // EXP:ARG:1:40 百合经验
      }
      chara(arg1).dungeon.触手经验 += 1; // EXP:ARG:1:55 触手经验
      await era.waitAnyKey(); // WAIT
      return 0;
    }

    // 触手（无封印，私处路线）
    await era.printAndWait(`无法动弹的${loser_name}被吊在半空中。`);
    await era.printAndWait(
      `${winner_name}用凶恶的触手，捅入了${loser_name}的私处里……`,
    );

    if ((era.get(`abl:${arg1}:22`) || 0) > 0 || era.get(`talent:${arg1}:81`)) {
      // 百合气质・双性恋
      await era.printAndWait(`${loser_name}感到心中有什么在蠢动着。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg1}:5`, mon_num * 10); // JUEL:ARG:1:5 欲情
    }

    await era.print('苦痛点数+80');
    await era.print('恐怖点数+80');
    if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
      await era.print('百合经验+1');
    }
    if (!era.get(`talent:${arg1}:122`)) {
      await era.print('私处经验+10');
    }
    await era.print('触手经验+1');
    if (!era.get(`talent:${arg1}:122`)) {
      chara(arg1).dungeon.私处经验 += 10; // EXP:ARG:1:0 私处经验
    }
    if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
      chara(arg0).train.百合经验 += 1; // EXP:ARG:0:40 百合经验
      chara(arg1).train.百合经验 += 1; // EXP:ARG:1:40 百合经验
    }
    era.add(`juel:${arg1}:9`, 80); // JUEL:ARG:1:9 苦痛
    era.add(`juel:${arg1}:10`, 80); // JUEL:ARG:1:10 恐怖
    chara(arg1).dungeon.触手经验 += 1; // EXP:ARG:1:55 触手经验
    if (
      (era.get(`exp:${arg1}:0`) || 0) > 0 &&
      (era.get(`talent:${arg1}:0`) || 0) === 1
    ) {
      chara(arg1).chara.处女 = 0; // TALENT:ARG:1:0 = 0
      await era.print('【处女丧失】');
      // 初体験の相手を記録（+1 記録；NO:(ARG:0) = 角色号）
      chara(arg1).train.初体验对象 = arg0 + 1; // CFLAG:ARG:1:15 = NO:(ARG:0) + 1
      chara(arg1).train.初体验对象名 = winner_name; // CSTR:ARG:1:3
    }

    await era.waitAnyKey(); // WAIT
    return 0;
  }

  // 随机开场演出（RAND:5 链）
  if (rand_n(5) === 0) {
    await era.printAndWait(
      `${winner_name}看着${loser_name}，开始舔舐${she(arg1)}的身体。`,
    );
  } else if (rand_n(4) === 0) {
    await era.printAndWait(
      `${winner_name}像对食物一样，用舌头拨弄${loser_name}。`,
    );
  } else if (rand_n(3) === 0) {
    await era.printAndWait(`${winner_name}对${loser_name}爱抚着。`);
  } else if (rand_n(2) === 0) {
    await era.printAndWait(`${winner_name}让${loser_name}跪下。`);
  } else {
    await era.printAndWait(`${winner_name}让${loser_name}摆出母狗一样的姿势。`);
  }

  // CALL MONSTER_DATA —— 死调用（B/C 无定义读取方、RESULT 无消费，
  // 见文件头 #182 判定），注释保留不落调用。

  // 处女封印（假阳具肛门路线）
  if (era.get(`talent:${arg1}:273`)) {
    await era.printAndWait(
      `${loser_name}的纯洁被神圣力量保护着，不过没能堵住肛门。`,
    );
    await era.printAndWait(
      `${winner_name}拿出假阳具，开始侵犯${loser_name}的肛门……`,
    );

    if ((era.get(`abl:${arg1}:22`) || 0) > 0 || era.get(`talent:${arg1}:81`)) {
      // 百合气质・双性恋
      await era.printAndWait(`${loser_name}感到心中有什么在蠢动着。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg1}:5`, mon_num * 10); // JUEL:ARG:1:5 欲情
    }

    await era.print('肛门经验+10');
    await era.print('苦痛点数+50');
    await era.print('恐怖点数+50');
    if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
      await era.print('百合经验+5');
    }
    chara(arg1).dungeon.肛门经验 += 10; // EXP:ARG:1:1 肛门经验
    era.add(`juel:${arg1}:9`, 50); // JUEL:ARG:1:9 苦痛
    era.add(`juel:${arg1}:10`, 50); // JUEL:ARG:1:10 恐怖
    if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
      chara(arg0).train.百合经验 += 5; // EXP:ARG:0:40 百合经验
      chara(arg1).train.百合经验 += 5; // EXP:ARG:1:40 百合经验
    }
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  // 三连 REPEAT 随机凌辱
  for (let loop = 0; loop < 3; loop += 1) {
    if (rand_n(7) === 0) {
      // 口交
      await era.printAndWait(`${winner_name}强迫${loser_name}舔${she(arg0)}，`);
      await era.printAndWait(`${loser_name}全裸地像狗一样趴跪舔舐着，`);
      await era.printAndWait(
        `对舌头的动作不满意，${winner_name}直接抓着冒险者的头，用性器摩擦${she(arg1)}的脸来取乐。`,
      );

      if (era.get(`talent:${arg1}:11`)) {
        // 反抗心
        await era.printAndWait(
          `${loser_name}用反抗的目光瞪着${winner_name}，不过考虑到生命安危，还是服从了。`,
        );
      } else if (era.get(`talent:${arg1}:17`)) {
        // 低姿态
        await era.printAndWait(
          `${loser_name}谦卑地用狗一样的神态舔舐着${winner_name}的下体。`,
        );
      }
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('百合经验+1');
        chara(arg0).train.百合经验 += 1; // EXP:ARG:0:40 百合经验
        chara(arg1).train.百合经验 += 1; // EXP:ARG:1:40 百合经验
      }
    } else if (rand_n(6) === 0 && !era.get(`talent:${arg1}:122`)) {
      // 巨型假阳具
      await era.printAndWait(`${winner_name}拿来小臂般粗的巨型假阳具。`);
      // 旧引擎里这是一整行：「…的」与二选一
      // 都不换行，末段的 PRINTFORMW 才收行。
      const loser_is_man = era.get(`talent:${arg1}:122`);
      await era.printAndWait(
        `${loser_name}的` +
          (loser_is_man ? '后穴' : '前后两穴都') +
          `被巨型假阳具插入了，${winner_name}用手抚摸着入口周边。`,
      );
      await era.printAndWait(
        `被污物及爱液弄脏了的巨型假阳具，${loser_name}还被要求用舌头漂亮地清洁干净。`,
      );

      if (era.get(`talent:${arg1}:12`)) {
        // 刚强
        await era.printAndWait(`${loser_name}咬牙切齿忍受着屈辱。`);
      } else if (era.get(`talent:${arg1}:26`)) {
        // 悲观的
        await era.printAndWait(`${loser_name}眼中含泪，不断重复着谢罪的话语。`);
      }
      if (!era.get(`talent:${arg1}:122`)) {
        await era.print('私处经验+10');
        await era.print('肛门经验+10');
      }
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('百合经验+1');
        chara(arg0).train.百合经验 += 1; // EXP:ARG:0:40 百合经验
        chara(arg1).train.百合经验 += 1; // EXP:ARG:1:40 百合经验
      }
      if (!era.get(`talent:${arg1}:122`)) {
        chara(arg1).dungeon.私处经验 += 10; // EXP:ARG:1:0 私处经验
      }
      chara(arg1).dungeon.肛门经验 += 10; // EXP:ARG:1:1 肛门经验
      if (
        (era.get(`exp:${arg1}:0`) || 0) > 0 &&
        (era.get(`talent:${arg1}:0`) || 0) === 1
      ) {
        chara(arg1).chara.处女 = 0; // TALENT:ARG:1:0 = 0
        await era.print('【处女丧失】');
        chara(arg1).train.初体验对象 = 101; // CFLAG:ARG:1:15 = 101（壶虫）
      }
    } else if (rand_n(5) === 0) {
      // 兽人轮
      await era.printAndWait(`${winner_name}叫来了打杂的兽人们，站成一排。`);
      await era.printAndWait(`${loser_name}被下了用嘴满足全员的命令。`);
      await era.printAndWait(`然后，${loser_name}全裸地四肢着地侍奉着。`);
      if (era.get(`talent:${arg1}:121`) || era.get(`talent:${arg1}:122`)) {
        await era.printAndWait('之后，被从后侵犯了，自己的阴茎也老实地勃起。');
      } else {
        await era.printAndWait('之后，被从后侵犯了。');
      }
      await era.printAndWait(
        `${loser_name}承受着来自下体的刺激继续侍奉着，兽人们则毫不留情地借机辱骂着${she(arg1)}。`,
      );
      await era.printAndWait(
        `『哈哈，${winner_name}大人，下次还有这种乐子也要叫上咱们啊！喂！再认真点！！』`,
      );

      if (era.get(`talent:${arg1}:13`)) {
        // 坦率
        await era.printAndWait(
          `${loser_name}老实地遵循着命令，舔舐着兽人们肮脏的阴茎。`,
        );
      } else if (era.get(`talent:${arg1}:62`)) {
        // 反感污臭
        await era.printAndWait(
          `嗅觉灵敏的${loser_name}有意无意地回避着兽人肮脏的阴茎，又被骂了。`,
        );
      }

      await era.print('耻情点数+100');
      await era.print('屈服点数+100');
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('百合经验+1');
      }
      await era.print('口交经验+10');
      await era.print('精液经验+10');
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('私处经验+10');
      }
      if (!era.get(`talent:${arg1}:122`)) {
        chara(arg1).dungeon.私处经验 += 10; // EXP:ARG:1:0 私处经验
      }
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        chara(arg0).train.百合经验 += 1; // EXP:ARG:0:40 百合经验
        chara(arg1).train.百合经验 += 1; // EXP:ARG:1:40 百合经验
      }
      chara(arg1).dungeon.口交经验 += 10; // EXP:ARG:1:22 口交经验
      chara(arg1).dungeon.精液经验 += 10; // EXP:ARG:1:20 精液经验
      era.add(`juel:${arg1}:8`, 100); // JUEL:ARG:1:8 耻情
      era.add(`juel:${arg1}:6`, 100); // JUEL:ARG:1:6 屈服

      // 初吻
      if ((era.get(`cflag:${arg1}:16`) ?? 0) === -1) {
        chara(arg1).train.初吻对象 = 995; // CFLAG:ARG:1:16 = 995（怪物的阴茎）
      }
      if (
        (era.get(`exp:${arg1}:0`) || 0) > 0 &&
        (era.get(`talent:${arg1}:0`) || 0) === 1
      ) {
        chara(arg1).chara.处女 = 0; // TALENT:ARG:1:0 = 0
        await era.print('【处女丧失】');
        // 初体験の相手を記録（NO:(ARG:0) + 1）
        chara(arg1).train.初体验对象 = arg0 + 1; // CFLAG:ARG:1:15 = NO:(ARG:0) + 1
        chara(arg1).train.初体验对象名 = winner_name; // CSTR:ARG:1:3
      }
    } else if (rand_n(4) === 0) {
      // 当众自慰
      await era.printAndWait(`${winner_name}叫来了手下。`);
      if (
        era.get(`talent:${arg1}:121`) === 1 ||
        era.get(`talent:${arg1}:122`)
      ) {
        await era.printAndWait(
          `${loser_name}的肛门，被阴茎用背面座位侵犯着，自己的阴茎也老实地勃起了。`,
        );
      } else {
        await era.printAndWait(`${loser_name}的肛门，被阴茎用背面座位侵犯着。`);
      }
      await era.printAndWait('在这种情况下，被下达了当众自慰的命令。');

      if (era.get(`talent:${arg1}:35`)) {
        // 害羞
        await era.printAndWait(
          `${loser_name}面红耳赤，回避了大家的炽热视线，开始自慰了。`,
        );
      } else if (era.get(`talent:${arg1}:60`)) {
        // 容易自慰
        await era.printAndWait(
          `${loser_name}没怎么抵抗就开始自慰了，拼命地反复求饶着。`,
        );
      }

      await era.print('耻情点数+200');
      await era.print('屈服点数+200');
      await era.print('自慰经验+1');
      await era.print('调教自慰经验+1');
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('百合经验+1');
      }
      await era.print('肛门经验+10');
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        chara(arg0).train.百合经验 += 1; // EXP:ARG:0:40 百合经验
        chara(arg1).train.百合经验 += 1; // EXP:ARG:1:40 百合经验
      }
      chara(arg1).dungeon.肛门经验 += 10; // EXP:ARG:1:1 肛门经验
      era.add(`juel:${arg1}:8`, 200); // JUEL:ARG:1:8 耻情
      era.add(`juel:${arg1}:6`, 200); // JUEL:ARG:1:6 屈服
      chara(arg1).dungeon.自慰经验 += 1; // EXP:ARG:1:10 自慰经验
      chara(arg1).dungeon.调教自慰经验 += 1; // EXP:ARG:1:11 调教自慰经验
    } else if (rand_n(3) === 0) {
      // 头发压脸
      await era.printAndWait(`${winner_name}抓住${loser_name}的头发，`);
      if (
        era.get(`talent:${arg0}:121`) === 1 ||
        era.get(`talent:${arg0}:122`)
      ) {
        await era.printAndWait(`将${she(arg1)}的脸强行压到自己的阴茎上。`);
      } else {
        await era.printAndWait(`将${she(arg1)}的脸强行压到自己的阴部上。`);
      }

      if (era.get(`talent:${arg1}:11`)) {
        // 反抗心
        await era.printAndWait(
          `${loser_name}用反抗的目光瞪着${winner_name}，不过考虑到生命安危，还是服从了。`,
        );
      } else if (era.get(`talent:${arg1}:17`)) {
        // 低姿态
        await era.print(
          `${loser_name}谦卑地用狗一样的神态舔舐着${winner_name}的`,
        );
        // 旧引擎里这是一整行：阴茎/私处二选一与
        // 「。」（PRINTFORMW）都不换行。
        const winner_has_cock =
          era.get(`talent:${arg0}:121`) === 1 || era.get(`talent:${arg0}:122`);
        await era.printAndWait((winner_has_cock ? '阴茎' : '私处') + '。');
      }

      await era.print('耻情点数+150');
      await era.print('屈服点数+150');
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('百合经验+1');
      }

      if (
        era.get(`talent:${arg0}:121`) === 1 ||
        era.get(`talent:${arg0}:122`)
      ) {
        await era.print('口交经验+10');
        await era.print('精液经验+10');
        chara(arg1).dungeon.口交经验 += 10; // EXP:ARG:1:22 口交经验
        chara(arg1).dungeon.精液经验 += 10; // EXP:ARG:1:20 精液经验
      }
      era.add(`juel:${arg1}:8`, 150); // JUEL:ARG:1:8 耻情
      era.add(`juel:${arg1}:6`, 150); // JUEL:ARG:1:6 屈服
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        chara(arg0).train.百合经验 += 1; // EXP:ARG:0:40 百合经验
        chara(arg1).train.百合经验 += 1; // EXP:ARG:1:40 百合经验
      }
    } else if (rand_n(2) === 0) {
      // 捆绑
      await era.printAndWait(`${winner_name}用绳子将${loser_name}紧紧捆住`);
      if (rand_n(3) === 0) {
        // 鞭打/蜡烛
        // 同一行的两段互斥收行（RAND:2）：两条收行都自带
        // W，中间的 PRINTW（自带 W）绕不过。链上的鞭子支照旧把
        // 写在语句里；蜡烛支用语句外
        // 的前缀常量 + 自己的收行合成一条（同 kojo-k7-heart.js 的
        // talk_front_5485 写法）。RAND 抽数有状态，提到语句外只抽一次。
        const whip = rand_n(2) === 0;
        const back_2674 = `向伏在地上的${loser_name}的背上`;
        if (whip) {
          await era.printAndWait(
            `向伏在地上的${loser_name}的背上用鞭子不停地抽打着、`,
          );
          await era.printAndWait(`在${loser_name}的背上留下了数道血痕`);
        } else {
          await era.printAndWait(back_2674 + '将点燃的蜡烛倾倒了上去');
          await era.printAndWait(
            `过热的刺痛让${loser_name}的身体不住地抽搐着、身上更是被滴上了更多的蜡`,
          );
        }
        await era.print('耻情点数+200');
        await era.print('屈服点数+200');
        await era.print('紧缚经验+5');
        if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
          await era.print('百合经验+1');
        }
        era.add(`juel:${arg1}:8`, 200); // JUEL:ARG:1:8 耻情
        era.add(`juel:${arg1}:6`, 200); // JUEL:ARG:1:6 屈服
        chara(arg1).train.紧缚经验 += 5; // EXP:ARG:1:51 紧缚经验
        if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
          chara(arg0).train.百合经验 += 1; // EXP:ARG:0:40 百合经验
          chara(arg1).train.百合经验 += 1; // EXP:ARG:1:40 百合经验
        }
      } else {
        // 扩张模具
        if (!era.get(`talent:${arg1}:122`)) {
          await era.printAndWait(
            `${loser_name}的阴道与肛门被${winner_name}用扩张模具强行插入`,
          );
        } else {
          await era.printAndWait(
            `${loser_name}的肛门被${winner_name}用扩张模具强行插入`,
          );
        }
        await era.printAndWait(
          `${winner_name}在${loser_name}放弃之前不停地侵犯着、将${loser_name}的屁股打得又红又肿`,
        );
        if (!era.get(`talent:${arg1}:122`)) {
          await era.print('私处经验+10');
          await era.print('肛门经验+10');
        }
        if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
          await era.print('百合经验+10');
        }
        await era.print('紧缚经验+5');
        if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
          chara(arg0).train.百合经验 += 10; // EXP:ARG:0:40 百合经验
          chara(arg1).train.百合经验 += 10; // EXP:ARG:1:40 百合经验
        }
        if (!era.get(`talent:${arg1}:122`)) {
          chara(arg1).dungeon.私处经验 += 10; // EXP:ARG:1:0 私处经验
        }
        chara(arg1).dungeon.肛门经验 += 10; // EXP:ARG:1:1 肛门经验
        chara(arg1).train.紧缚经验 += 5; // EXP:ARG:1:51 紧缚经验
        if (
          (era.get(`exp:${arg1}:0`) || 0) > 0 &&
          (era.get(`talent:${arg1}:0`) || 0) === 1
        ) {
          chara(arg1).chara.处女 = 0; // TALENT:ARG:1:0 = 0
          await era.print('【处女丧失】');
          chara(arg1).train.初体验对象 = 101; // CFLAG:ARG:1:15 = 101（壶虫）
        }
      }
      if ((era.get(`abl:${arg1}:21`) || 0) >= 3) {
        // 抖M气质
        await era.printAndWait(`${loser_name}心中萌生了兴奋的情绪……`);
        await era.print(`欲情点数+${mon_num * 10}`);
        era.add(`juel:${arg1}:5`, mon_num * 10); // JUEL:ARG:1:5 欲情
      }
    } else {
      // 乱交派对
      await era.printAndWait(
        `${winner_name}召集了梦魔以及魔族们，开始了乱交派对。`,
      );
      await era.printAndWait('大家都在尽情交欢着，不过有一人却四脚趴地');
      await era.printAndWait(
        `做着${winner_name}的人肉座椅，${loser_name}在派对中不被当人看。`,
      );
      if (!era.get(`talent:${arg1}:122`)) {
        await era.printAndWait(
          `${loser_name}的后面，私处和肛门也正被假阳具狠狠侵犯着。`,
        );
      } else {
        await era.printAndWait(`${loser_name}的嘴巴和肛门也正被狠狠侵犯着。`);
      }
      await era.printAndWait(
        `在${she(arg1)}面前则是一个接着一个不停地有人来要求舔下体，`,
      );
      await era.printAndWait(`坐在这样的椅子上，${winner_name}满意地自慰着……`);
      if (!era.get(`talent:${arg1}:122`)) {
        await era.print('私处经验+10');
      }
      await era.print('肛门经验+10');
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('百合经验+10');
        chara(arg0).train.百合经验 += 10; // EXP:ARG:0:40 百合经验
        chara(arg1).train.百合经验 += 10; // EXP:ARG:1:40 百合经验
      }
      if (!era.get(`talent:${arg1}:122`)) {
        chara(arg1).dungeon.私处经验 += 10; // EXP:ARG:1:0 私处经验
      }
      chara(arg1).dungeon.肛门经验 += 10; // EXP:ARG:1:1 肛门经验
      if (
        (era.get(`exp:${arg1}:0`) || 0) > 0 &&
        (era.get(`talent:${arg1}:0`) || 0) === 1
      ) {
        chara(arg1).chara.处女 = 0; // TALENT:ARG:1:0 = 0
        await era.print('【处女丧失】');
        chara(arg1).train.初体验对象 = 101; // CFLAG:ARG:1:15 = 101（壶虫）
      }
    }
    await era.waitAnyKey(); // WAIT（REPEAT 内）
    await era.print(''); // PRINTL
  }

  // 收尾百合判定
  if ((era.get(`abl:${arg1}:22`) || 0) > 0 || era.get(`talent:${arg1}:81`)) {
    // 百合气质・双性恋
    await era.printAndWait(`${loser_name}感到心中有什么在蠢动着。`);
    await era.print(`欲情点数+${mon_num * 10}`);
    era.add(`juel:${arg1}:5`, mon_num * 10); // JUEL:ARG:1:5 欲情
  }

  await era.waitAnyKey(); // WAIT
  await era.print(''); // PRINTL
  return 0;
}

// victory_ryouzyoku(arg = -1)
/**
 * 胜利后的凌辱事件（勇者胜后「間違いが起こる」）。
 *
 * 旧引擎 `ARG = -1` 缺省、`SIF ARG < 0 → ARG = A`（A = 当前攻击者 = 勇者）。
 * 门槛：善恶值（CFLAG:ARG:151）必须 <= -50（善恶低才发生），且 RAND:12 != 0。
 * 命中后按 E 表第 1 列（B = RAND:3 * 100 列头）的凌辱类型分派到 *_RYOU_YUSYA
 *（勇者版演出）；旧引擎里仅 SLIME_RYOU_YUSYA（E:C == 2）与 GIRL_RYOU_YUSYA
 *（E:C == 9）未注释，其余分支全在注释内（死代码）。
 *
 * @param {number} [arg] 胜者（缺省 -1 → A）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function victory_ryouzyoku(arg = -1, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  // SIF ARG < 0 → ARG = A（当前攻击者，调用方已传）
  if (arg < 0) {
    return 0; // 无调用方传参时不做任何事（旧引擎读全局 A，ere 侧由调用方保证）
  }
  // （arg_name 未用——本函数台词无 %SAVESTR:ARG% 插值，见 :2791 用 MONSTERNAME）

  // 善恶值が低くないとダメ（CFLAG:ARG:151 > -50 → RETURN 0）
  if ((era.get(`cflag:${arg}:151`) || 0) > -50) {
    return 0;
  }

  // SIF RAND:12 == 0 → RETURN 0（低概率触发）
  if (rand_n(12) === 0) {
    return 0;
  }

  // B = RAND:3 * 100（列头）
  const b = rand_n(3) * 100;
  const c = b + 7; // C = B + 7（凌辱类型槽）

  // 该列有怪物 → 冒险者被瘴气侵袭、玩弄怪物（善恶值 -10）
  if (e_get(c) > 0) {
    const local_1 = e_get(b); // LOCAL:1 = E:B（怪物号）
    await era.printAndWait(
      `冒险者被魔界的瘴气侵袭着，玩弄起${monstername(local_1)}来。（善恶值:-10）`,
    );
    // CALL KARMA, ARG, -10（阶段 5 存根）
    const { karma } = require('#/dungeon/dungeon');
    karma(arg, -10);
  }

  // ペニスを使った凌辱を先行実装（E:C 分派；注释掉的死分支保留）
  const type = e_get(c);
  if (type === 2) {
    // 史莱姆（未注释的活分支）
    await slime_ryou_yusya(arg, rand_n);
  } else if (type === 9) {
    // 女（未注释的活分支）
    await girl_ryou_yusya(arg, rand_n);
  }
  // 其余分支（ORC/INSECT/IVY/SYOKUSYU/
  // FAILY/GIANT/BEAST/BRAIN/HORSE）在旧引擎里是注释（死代码），不移植——结构
  // 注释保留。

  await era.print(''); // PRINTL
  return 0;
}

// orc_ryou_yusya(arg)
/**
 * 勇者版胜利演出：兽人（旧引擎即空实现，RETURN 0）。
 * @returns {Promise<number>} 0
 */
async function orc_ryou_yusya() {
  return 0;
}

// slime_ryou_yusya(arg)
/**
 * 勇者版胜利演出：史莱姆。
 *
 * PLAY = RAND:10 + 5（次数）；TALENT:121/122/326（扶她/男人/性癖）命中时
 * 打印并加欲情点数。
 *
 * @param {number} arg 角色号
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0
 */
async function slime_ryou_yusya(arg, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const play = rand_n(10) + 5; // PLAY = RAND:10 + 5
  const arg_name = arg_name_of(arg);

  // 扶她/男人/性癖
  if (
    (era.get(`talent:${arg}:121`) || 0) === 1 ||
    (era.get(`talent:${arg}:122`) || 0) === 1 ||
    (era.get(`talent:${arg}:326`) || 0) === 1
  ) {
    await era.printAndWait(
      `${arg_name}无法抑制自己的欲望，沉醉在被黏液凌辱肉棒的快感中……`,
    );
    await era.print(`欲情点数+${play * 10}`);
    era.add(`juel:${arg}:5`, play * 10); // JUEL:ARG:5 欲情
  } else {
    // 空 ELSE
  }
  return 0;
}

// insect_ryou_yusya(arg)
/** 勇者版胜利演出：昆虫（旧引擎即空实现）。@returns {Promise<number>} 0 */
async function insect_ryou_yusya() {
  return 0;
}

// ivy_ryou_yusya(arg)
/** 勇者版胜利演出：蔦触手（旧引擎即空实现）。@returns {Promise<number>} 0 */
async function ivy_ryou_yusya() {
  return 0;
}

// syokusyu_ryou_yusya(arg)
/** 勇者版胜利演出：触手（旧引擎即空实现）。@returns {Promise<number>} 0 */
async function syokusyu_ryou_yusya() {
  return 0;
}

// faily_ryou_yusya(arg)
/** 勇者版胜利演出：妖精（旧引擎即空实现）。@returns {Promise<number>} 0 */
async function faily_ryou_yusya() {
  return 0;
}

// giant_ryou_yusya(arg)
/** 勇者版胜利演出：巨人（旧引擎即空实现）。@returns {Promise<number>} 0 */
async function giant_ryou_yusya() {
  return 0;
}

// man_ryou_yusya(arg)
/** 勇者版胜利演出：魔族男人（旧引擎即空实现）。@returns {Promise<number>} 0 */
async function man_ryou_yusya() {
  return 0;
}

// girl_ryou_yusya(arg)
/**
 * 勇者版胜利演出：女魔族。
 *
 * PLAY = RAND:10 + 5；TALENT:121/122/326 命中时打印并加欲情点数。
 *
 * @param {number} arg 角色号
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0
 */
async function girl_ryou_yusya(arg, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const play = rand_n(10) + 5; // PLAY = RAND:10 + 5
  const arg_name = arg_name_of(arg);

  // 扶她/男人/性癖
  if (
    (era.get(`talent:${arg}:121`) || 0) === 1 ||
    (era.get(`talent:${arg}:122`) || 0) === 1 ||
    (era.get(`talent:${arg}:326`) || 0) === 1
  ) {
    await era.printAndWait(
      `${arg_name}无法抑制自己的欲望，沉醉在被女魔族凌辱肉棒的快感中……`,
    );
    await era.print(`欲情点数+${play * 10}`);
    era.add(`juel:${arg}:5`, play * 10); // JUEL:ARG:5 欲情
  } else {
    // 空 ELSE
  }
  return 0;
}

// beast_ryou_yusya(arg)
/** 勇者版胜利演出：魔兽（旧引擎即空实现）。@returns {Promise<number>} 0 */
async function beast_ryou_yusya() {
  return 0;
}

// brain_ryou_yusya(arg)
/** 勇者版胜利演出：食脑魔（旧引擎即空实现）。@returns {Promise<number>} 0 */
async function brain_ryou_yusya() {
  return 0;
}

// horse_ryou_yusya(arg)
/** 勇者版胜利演出：马（旧引擎即空实现）。@returns {Promise<number>} 0 */
async function horse_ryou_yusya() {
  return 0;
}

// dungeon_ryouzyoku_escape(arg)
/**
 * 逃脱分支：被凌辱的勇者被同伴发现并救援。
 *
 * 依据队长记忆（CFLAG:533）解析三人（SIDEA/SIDEB），检查队伍伤势
 * （CHECK_STATUS RESULT:7 > 9 = 队友无力救援），按畏怖计数（CFLAG:131）
 * 分档决定救援成功（RAND:FEAR == 0）与否。成功时：队长回城标志 507 = 1、
 * 勇者体力/气力 +100、状态回侵攻中（CFLAG:1 = 2）。
 *
 * @param {number} arg 被凌辱勇者角色号
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function dungeon_ryouzyoku_escape(arg, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  let sidea;
  let sideb;

  // 队伍解析（队长记忆 CFLAG:533）
  if ((era.get(`cflag:${arg}:533`) || 0) === arg) {
    // 自己是队长
    sidea = era.get(`cflag:${arg}:531`) || 0;
    sideb = era.get(`cflag:${arg}:532`) || 0;
  } else {
    // 自己是同伴：读队长的；自己占同伴位时换成队长号
    const leader = era.get(`cflag:${arg}:533`) || 0;
    sidea = era.get(`cflag:${leader}:531`) || 0;
    sideb = era.get(`cflag:${leader}:532`) || 0;
    if (sidea === arg) {
      sidea = leader;
    }
    if (sideb === arg) {
      sideb = leader;
    }
  }

  // FEAR = CFLAG:ARG:131（畏怖计数）
  let fear = era.get(`cflag:${arg}:131`) || 0;
  // SIF FEAR < 2 → FEAR++
  if (fear < 2) {
    fear += 1;
  }

  // SIF !SIDEA && !SIDEB → RETURN 0（无同伴不触发）
  if (!sidea && !sideb) {
    return 0;
  }

  // 分析队伍状态（CALL CHECK_STATUS, ARG, 1——MODE 1 静默）
  const { check_status: check_status_fn } = require('#/dungeon/dungeon');
  const status = await check_status_fn(arg, 1);
  const rating = status[7]; // RESULT:7 队伍当前状态评级

  // 发现奄奄一息的勇者
  if (sidea && sideb) {
    await era.printAndWait(
      `${arg_name_of(sidea)}与${arg_name_of(sideb)}发现了奄奄一息的${arg_name_of(arg)}`,
    );
  } else if (sidea && !sideb) {
    await era.printAndWait(
      `${arg_name_of(sidea)}发现了奄奄一息的${arg_name_of(arg)}`,
    );
  } else if (!sidea && sideb) {
    await era.printAndWait(
      `${arg_name_of(sideb)}发现了奄奄一息的${arg_name_of(arg)}`,
    );
  }

  const arg_name = arg_name_of(arg);
  // 救援判定分档
  if (rating > 9) {
    // 队伍状况不容乐观——只能眼睁睁看着被带走
    await era.print(
      `${arg_name_of(sidea)}与${arg_name_of(sideb)}的状况实在不容乐观`,
    );
    await era.printAndWait(`只能眼睁睁地看着${arg_name}被带往了地下城深处…`);
  } else if ((era.get(`cflag:${arg}:131`) || 0) > 5) {
    // 畏怖 > 5：被凌辱者已无脱身念头
    await era.print(`但${arg_name}似乎并没有脱身念头…`);
    if (
      (era.get(`cflag:${sidea}:131`) || 0) <= 3 &&
      (era.get(`cflag:${sideb}:131`) || 0) <= 3
    ) {
      await era.print(
        `${arg_name_of(sidea)}与${arg_name_of(sideb)}只好悻悻离去…`,
      );
    } else {
      if (
        (era.get(`cflag:${sidea}:131`) || 0) > 3 &&
        (era.get(`cflag:${sideb}:131`) || 0) <= 3
      ) {
        await era.print(
          `${arg_name_of(sidea)}看着${arg_name}的样子、吞了吞口水`,
        );
        await era.print('露出了若有所思的神情、似乎已经出神了');
        await era.printAndWait(
          `${arg_name_of(sideb)}只得带着${arg_name_of(sidea)}悻悻离去…`,
        );
      } else if (
        (era.get(`cflag:${sideb}:131`) || 0) > 3 &&
        (era.get(`cflag:${sidea}:131`) || 0) <= 3
      ) {
        await era.print(
          `${arg_name_of(sideb)}看着${arg_name}的样子、吞了吞口水`,
        );
        await era.print('露出了若有所思的神情、似乎已经出神了');
        await era.printAndWait(
          `${arg_name_of(sidea)}只得带着${arg_name_of(sideb)}悻悻离去…`,
        );
      }
    }
  } else if ((era.get(`cflag:${arg}:131`) || 0) > 3) {
    // 畏怖 > 3：同伴伺机而动
    if (
      (era.get(`cflag:${sidea}:131`) || 0) <= 3 &&
      (era.get(`cflag:${sideb}:131`) || 0) <= 3
    ) {
      await era.print(`${arg_name_of(sidea)}与${arg_name_of(sideb)}伺机而动`);
      if (rand_n(fear) === 0) {
        // 救援成功
        await era.printAndWait(`终于寻到机会将${arg_name}救下并逃出了地下城`);
        const leader = era.get(`cflag:${arg}:533`) || 0;
        chara(leader).invasion.回城标志 = 1; // CFLAG:(CFLAG:ARG:533):507
        chara(arg).dungeon.体力 += 100; // BASE:ARG:0 += 100
        chara(arg).dungeon.气力 += 100; // BASE:ARG:1 += 100
        chara(arg).invasion.状态 = 2; // CFLAG:ARG:1 = 2（侵攻中）
      } else {
        await era.printAndWait(`但${arg_name}很快就被魔族们带往了地下城深处…`);
      }
    } else {
      await era.print(`${arg_name_of(sidea)}与${arg_name_of(sideb)}伺机而动`);
      if (
        (era.get(`cflag:${sidea}:131`) || 0) > 3 &&
        (era.get(`cflag:${sideb}:131`) || 0) <= 3
      ) {
        await era.print(
          `${arg_name_of(sidea)}看着${arg_name}的样子、吞了吞口水`,
        );
        await era.print('露出了若有所思的神情、似乎已经出神了');
        if (rand_n(fear) === 0) {
          await era.print(`终于寻到机会将${arg_name}救下并逃出了地下城`);
          const leader = era.get(`cflag:${arg}:533`) || 0;
          chara(leader).invasion.回城标志 = 1;
          chara(arg).dungeon.体力 += 100;
          chara(arg).dungeon.气力 += 100;
          chara(arg).invasion.状态 = 2;
        } else {
          await era.print(`但${arg_name}很快就被魔族们带往了地下城深处…`);
        }
      } else if (
        (era.get(`cflag:${sideb}:131`) || 0) > 3 &&
        (era.get(`cflag:${sidea}:131`) || 0) <= 3
      ) {
        await era.print(
          `${arg_name_of(sideb)}看着${arg_name}的样子、吞了吞口水`,
        );
        await era.print('露出了若有所思的神情、似乎已经出神了');
        if (rand_n(fear) === 0) {
          await era.printAndWait(`终于寻到机会将${arg_name}救下并逃出了地下城`);
          const leader = era.get(`cflag:${arg}:533`) || 0;
          chara(leader).invasion.回城标志 = 1;
          chara(arg).dungeon.体力 += 100;
          chara(arg).dungeon.气力 += 100;
          chara(arg).invasion.状态 = 2;
        } else {
          await era.printAndWait(
            `但${arg_name}很快就被魔族们带往了地下城深处…`,
          );
        }
      }
    }
  } else {
    // 畏怖 <= 3：直接伺机救援
    if (rand_n(fear) === 0) {
      await era.printAndWait(`终于寻到机会将${arg_name}救下并逃出了地下城`);
      const leader = era.get(`cflag:${arg}:533`) || 0;
      chara(leader).invasion.回城标志 = 1;
      chara(arg).dungeon.体力 += 100;
      chara(arg).dungeon.气力 += 100;
      chara(arg).invasion.状态 = 2;
    }
  }
  return 0;
}

module.exports = {
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
  dungeon_ryouzyoku,
  dungeon_ryouzyoku_after,
  ryouzyoku,
  orc_ryou,
  slime_ryou,
  insect_ryou,
  ivy_ryou,
  syokusyu_ryou,
  faily_ryou,
  giant_ryou,
  man_ryou,
  girl_ryou,
  beast_ryou,
  brain_ryou,
  horse_ryou,
  pc_ryou,
  victory_ryouzyoku,
  orc_ryou_yusya,
  slime_ryou_yusya,
  insect_ryou_yusya,
  ivy_ryou_yusya,
  syokusyu_ryou_yusya,
  faily_ryou_yusya,
  giant_ryou_yusya,
  man_ryou_yusya,
  girl_ryou_yusya,
  beast_ryou_yusya,
  brain_ryou_yusya,
  horse_ryou_yusya,
  dungeon_ryouzyoku_escape,
};
