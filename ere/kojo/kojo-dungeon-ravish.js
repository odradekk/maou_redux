/**
 * @file 迷宫凌辱事件——DUNGEON_RYOUZYOKU.ERB 二十八函数（issue #182，阶段 3 H13）。
 *
 * 源: target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB  @RYOUZYOKU（:2-175，败者凌辱
 *     主框架）、@ORC_RYOU（:177-802）@SLIME_RYOU（:803-894）@INSECT_RYOU
 *     （:895-989）@IVY_RYOU（:990-1046）@SYOKUSYU_RYOU（:1047-1147）
 *     @FAILY_RYOU（:1148-1236）@GIANT_RYOU（:1237-1407）@MAN_RYOU
 *     （:1408-1665）@GIRL_RYOU（:1666-2046）@BEAST_RYOU（:2047-2153）
 *     @BRAIN_RYOU（:2154-2236）@HORSE_RYOU（:2237-2343）@PC_RYOU
 *     （:2344-2770，对人格斗败北演出）@VICTORY_RYOUZYOKU（:2771-2840，
 *     胜利后「間違いが起こる」）@*_RYOU_YUSYA（:2841-2915，勇者版胜利
 *     演出）@DUNGEON_RYOUZYOKU_ESCAPE（:2916-3016，逃脱分支）
 *
 * 调用点：
 *   - @RYOUZYOKU —— DUNGEON_BATLLE.ERB:346（CALL RYOUZYOKU，FLAG:5 & 1
 *     陵辱許可配置位内；#175 起真身内）——战斗循环里勇者败北（DEATH_CHECK
 *     == 2）后进入。原作函数开头 `ARG = A`（A = 当前攻击者 = 勇者），
 *     ere 侧由 dungeon-battle.js 的 ryouzyoku(atker) 显式传参。
 *   - @PC_RYOU —— DUNGEON_BATLLE2.ERB:385/:422/:444/:463（CALL PC_RYOU,
 *     ARG:0, ARG:1；FLAG:5 & 1 配置位内）——对人格斗（勇者队 vs 魔王队）
 *     败北演出。ARG:0 = 魔王側、ARG:1 = 勇者側。
 *   - @VICTORY_RYOUZYOKU —— DUNGEON_BATLLE.ERB:355（勇者胜利后）——
 *     原作 `ARG = -1` 缺省、`SIF ARG < 0 → ARG = A`，ere 侧由
 *     dungeon-battle.js 的 victory_ryouzyoku(atker) 显式传参。
 *   - @DUNGEON_RYOUZYOKU_ESCAPE —— @RYOUZYOKU 结尾（CALL
 *     DUNGEON_RYOUZYOKU_ESCAPE,ARG）——畏怖记忆的机会太少，追加逃跑分支。
 *
 * == 移植说明（有意偏离，均注明依据） ==
 *
 *   - **`MON_NUM = E:(B + 99)` 以参数注入**（#5 决议第六条「指针不隐式读
 *     全局」）：B 是 @RYOUZYOKU 主循环的全局单字母变量（0/100/200，即
 *     三列怪物的队列号），`E:(B+99)` 是「该列怪物数量」（怪物相關/
 *     MONSTER_DATA.ERB 的 E 数组语义：E:Y+99 == 数量）。E 表由迷宫战斗
 *     系统（H5/H6）经 @MONSTER_DATA 建桶写入，ere 的 `era.get('e:99')`
 *     在桶缺失时报 key error（#183 引擎实测）；本文件各函数以 mon_num
 *     形参接收该值，由 @RYOUZYOKU 分派时读出传入（#183 同款处置）。
 *     分派循环的 E 表读（E:MON_COUNT 怪物号 / E:(MON_COUNT+7) 凌辱类型 /
 *     E:(MON_COUNT+99) 数量）随本文件经 e_get 收口——E 表由战斗系统
 *     建桶（yml/E.yml，#175 落表），e_get 读未写槽兜 0。
 *   - **%SAVESTR:ARG% 经 chara_callname(arg) 承载**（#5 决议：SAVESTR 无
 *     引擎通道，#171 实测三段完全静默丢弃）：ARG 是参数角色号（被凌辱者），
 *     与口上文件的 TARGET 不同源，本文件用独立的 arg_name 变量。
 *   - **PRINTDATA/PRINTDATAW（DATAFORM 随机数组）**：原作在块内随机取一
 *     条输出。转译器把 DATAFORM 行落成注释（未覆盖方言，见 #182 返工），
 *     复核时改写成 `pick(list, rand_n(n))`——随机取一条（#117：无全局
 *     RAND 序列，随机经注入的 rand_n 掷出，测试注入定值序；#183 同款）。
 *   - **`JUEL:ARG:n += v` / `EXP:ARG:n += v` 转 era.add**：转译器把 `+=`
 *     错拼进下标（`juel:${arg}:9 +`），复核修正为 `era.add('juel:${arg}:9', v)`
 *     （era.add 语义 = 引擎的 +=，juel-check.js 先例；#183 同款）。
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
 *     train（ownership/cstr-ownership.yml），无既有门面访问器——本票经
 *     tools/facade-names.js 补名（初体验对象名）并重生成门面，
 *     `chara(arg1).train.初体验对象名 = name_of(arg0)`。
 *   - **`SIF CFLAG:16 == -1 → CFLAG:16 = 995`**：初吻对象标记（995 = 怪物
 *     的阴茎，#47 的 page-info-exp.js 值域注释）。CFLAG:16 是 train 域跨域
 *     写（#71 门面规则），但门面 getter 的 `|| 0` 会吞 -1（未经历）判据，
 *     读用裸寻址 `era.get('cflag:${arg}:16') ?? 0`，写走门面
 *     `chara(arg).train.初吻对象 = 995`（#183 同款处置）。
 *   - **`CALL GOBI_KOUJO` 落存根**：语尾口上分派（EVENT_K.ERB 的 @GOBI_KOUJO），
 *     全库多处调用、未移植（#183 首次消费，登记 stub-registry）。分支
 *     TALENT:17（プライド低い）→ 1 / 否则 5，结构 1:1 保留。
 *   - **`Y += 10` / `Y = 10` 是死代码**：Y 是原作全局单字母变量（100000
 *     维），全库无初始化、函数内也无读取者（#183 同款：MAN 版 :862/:868，
 *     本文件 :1622/:1628/:2378）。ere 侧无单字母变量通道，注释保留不落
 *     变量（DUNGEON.ERB 的 X *= 2 同款处置）。
 *   - **`WAIT` → `await era.waitAnyKey()`**（PRINTW 的等待语义，#73；
 *     enter-enemy.js:86 先例）。
 *   - **`VIRGIN`（#DIM :3）是死变量**：声明并赋值（VIRGIN = TALENT:ARG:0）
 *     后全文件无读取，注释保留不落变量（与 #183 的 Y 同款判定）。
 *   - **`RAND:n` → rand_n(n)**（#117：随机源注入，缺省均匀随机）。
 *   - **`RAND:FEAR`（:2937 等，变量上界）** → `rand_n(fear)`——RAND 的
 *     变量参数形态（emuera-basic-agent-guide in-expression-functions
 *     .md：RAND(x) 取 [0, x)），转译器 #184 已支持 RAND:(expr)，REVIEW
 *     时人工定 fear 变量（#183 的 MON_NUM 先例）。
 *   - **TALENT:ARG:种族 / 阴毛状态 / 魅力点 等中文下标**：yml/Talent.yml
 *     的名字表有「种族」（id 314）等条目，引擎列名寻址
 *     `talent:${cid}:种族` 可用（#183 引擎实测 setVar 通过中文名翻译）。
 *   - **`CALL DUNGEON_RYOUZYOKU` / `CALL DUNGEON_RYOUZYOKU_AFTER`**
 *     （EVENT_K.ERB 的 @DUNGEON_RYOUZYOKU / @DUNGEON_RYOUZYOKU_AFTER）：
 *     口上前置/后置分派（TRYCALLFORM DUNGEON_RYOUZYOKU_K{LOCAL-100} /
 *     DUNGEON_RYOUZYOKU_AFTER_K{LOCAL-100}）。20 个角色口上文件定义了
 *     这些钩子（K0-K15/K19/K902-K904），随各自口上票落地；本文件用
 *     DispatchFamily 声明同款编号空间（普通口上 0-39 + EX 口上 901-1600），
 *     当前零注册 → 族调用返回 whenMissing（TRYCALL 落空语义），角色口上
 *     落地后在模块里 register。TARGET = ARG（原作 @RYOUZYOKU :57 在
 *     分派前置 TARGET）经 era_flag.target 设置——GET_KOJO_NUM 缺省读它。
 *   - **`CALL CHA_IMG2(ARG)` / `IF 立绘`（:14/:2353）**：立绘显示（魔改
 *     新增/img.ERB @CHA_IMG2）未移植（HTML_PRINT 无通道，dungeon-battle
 *     .js:34 同款）；`立绘` 是 SAVEDATA 开关（魔改使用.ERH:6，未入 yml），
 *     CHA_IMG2 无引擎通道。`IF 立绘` 分支保留结构注释、不移植调用。
 *   - **`CALL SHOW_DATA(ARG)`（:18）**：角色状态显示（キャラ関数/
 *     CHARA_INFO_SHOW ver1.1.2.ERB @SHOW_DATA，未移植——随角色信息票），
 *     存根占位（stub-registry 登记）。
 *   - **`CALL EQUIP_DATABASE`（:2379）与 W:0/W:1 装备记录**：@PC_RYOU 的
 *     武器检查（W:0 = CFLAG:550 存储编号，素手时装剑 40；CALL
 *     EQUIP_DATABASE 填 W:1 识别号）。ERE 侧用 #174 真身
 *     equip_database(w)（ere/system/equip/equip-lookup.js），装备记录
 *     为普通对象（键 = W 列中文语义，#174 数据文件头注）；W:1 识别号
 *     49 = 触手武器分支。素手（存储编号 <= 0）时写入 CFLAG:550（chara
 *     域跨域写——cflag:550 属主 chara，无门面访问器，本票经
 *     tools/facade-names.js 补名「武器存储编号」并重生成门面）。
 *   - **`CALL MONSTER_DATA`（:2464）**：PC_RYOU 里裸 CALL（无实参，读
 *     全局 A/B/C 上下文）——原作此时 B/C 是上一段残留（PC_RYOU 的
 *     分派上下文之外），函数体未消费其 RESULT（后续直接按 TALENT 分支）。
 *     #182 复核判为**死调用**（B/C 在该点无定义读取方、RESULT 无消费），
 *     注释保留不落调用（#14 登记：与原作缺陷同款判定，#103 先例）。
 *   - **`CALL CHECK_STATUS, ARG, 1`（:2930）**：队伍伤势判定（#172 真身，
 *     ere/dungeon/dungeon.js 的 check_status）——返回 8 槽数组，RESULT:7
 *     = 队伍当前状态评级（> 9 时同伴无力救援）。
 *   - **`CALL KARMA, ARG, -10`（:2791）**：善恶值增减（阶段 5 存根，
 *     ere/dungeon/dungeon.js 的 karma 存根，#172 登记）。
 *   - **`$INPUT_LOOP` / `INPUT` / `GOTO`（:23-29/:2359-2365）**：旁观/不
 *     凌辱的选择循环。ERE 侧以 while 循环 + era.input() 重写（输入 < 0
 *     或 >= 2 重来；== 1 返回 0——page-save-load 的 input 先例）。
 *
 * == 与本文件同名的函数 ==
 *
 * H14（#183）的 DUNGEON_RYOUZYOKU_MAN.ERB 前 11 段是 `@*_RYOU男`（带
 * 「男」字）——两组函数名不同，不触发 #12 的首个加载生效遮蔽。本文件
 * 的 @RYOUZYOKU 分派（:77-156）按 `TALENT:ARG:122`（男人）分发：为真 →
 * CALL *_RYOU男（H14 文件），否则 → CALL *_RYOU（本文件）。本票交付
 * 无「男」版 + 主框架（@RYOUZYOKU / @PC_RYOU / @VICTORY_RYOUZYOKU /
 * @*_RYOU_YUSYA / @DUNGEON_RYOUZYOKU_ESCAPE）。
 *
 * @module
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');
const { chara } = require('#/facade/chara');
const { stub_line } = require('#/utils/stub-line');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const { get_kojo_num } = require('#/kojo/kojo-system');
const { e_get, e_set } = require('#/dungeon/monster-data');
const { monstername } = require('#/dungeon/monster-data');
const { equip_database } = require('#/system/equip/equip-lookup');
// 注意：check_status / karma 来自 #/dungeon/dungeon，而 dungeon.js 顶层
// require dungeon-battle/-battle2，后者将 require 本文件——顶层引用会成环。
// 本文件在函数体内延迟 require（dungeon-battle.js :1273 的 karma 先例）。

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['CHA_IMG2', 'SHOW_DATA', 'KARMA'];

/** PRINTDATA/PRINTDATAW 的随机取一条（DATAFORM 数组的等价物） */
function pick(list, rand_n) {
  return list[rand_n(list.length)];
}

/** 通用：取被凌辱者名字（%SAVESTR:ARG% 的等价物） */
function arg_name_of(arg) {
  return chara_callname(arg);
}

/**
 * SHE(ARG) 代词（%SHE(x)% 的等价物；魔改新增/文本校正.ERB :1-7 的三行
 * 纯函数，dungeon-battle.js 同款内联）。TALENT:122 = 男人 → 他，否则 她。
 * @param {number} cid 角色号
 * @returns {string}
 */
function she(cid) {
  return (era.get(`talent:${cid}:122`) || 0) !== 0 ? '他' : '她';
}

/**
 * 声明的编号空间：分发守卫（EVENT_K.ERB :256/:270）能拼出的全部
 * DUNGEON_RYOUZYOKU_K{N} / DUNGEON_RYOUZYOKU_AFTER_K{N} 名（与
 * kojo-system 的 KOJO_MESSAGE_COM 同款）。普通口上 0-39 + EX 口上
 * 901-1600；空间内缺失 = TRYCALL 落空（合法）。
 */
const DECLARED_KOJO_IDS = [
  ...Array.from({ length: 40 }, (_, i) => i),
  ...Array.from({ length: 700 }, (_, i) => i + 901),
];

/** @DUNGEON_RYOUZYOKU_K{N}：凌辱前的角色口上钩子（口上票落地后注册） */
const ryouzyoku_kojo_family = new DispatchFamily(
  'DUNGEON_RYOUZYOKU_K',
  DECLARED_KOJO_IDS,
);

/** @DUNGEON_RYOUZYOKU_AFTER_K{N}：凌辱后的角色口上钩子（口上票落地后注册） */
const ryouzyoku_after_kojo_family = new DispatchFamily(
  'DUNGEON_RYOUZYOKU_AFTER_K',
  DECLARED_KOJO_IDS,
);

/**
 * @RYOUZYOKU（:2-175）：败者的凌辱事件主框架。
 *
 * 流程：选择（旁观/不要，INPUT 循环）→ 凌辱畏怖记忆扫描（CFLAG:130 记录
 * 上次凌辱的怪物 ID、CFLAG:131 计数递增）→ 口上前置钩子（TARGET = ARG）→
 * 按 E:列头+7（凌辱类型 1-12）逐列分派怪物凌辱（男人 TALENT:122 → H14
 * *_RYOU男，否则 → 本文件 *_RYOU）→ 处女丧失判定（EXP:0 > 0 且 TALENT:0
 * == 1，魔王 0 的专属）→ 口上后置钩子 → 逃脱分支。
 *
 * @param {number} arg 败北勇者角色号（原作 ARG，开头 `ARG = A`）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function ryouzyoku(arg, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  // :9 VIRGIN = TALENT:ARG:0 —— 死变量（#DIM :3 声明后全文件无读取，见文件头）
  // :11 PRINTFORML %SAVESTR:ARG%将被凌辱――
  await era.print(`${arg_name_of(arg)}将被凌辱――`); // :11
  await era.print(''); // :12 PRINTL
  era.drawLine(); // :13

  // :14-17 立绘（CALL CHA_IMG2(ARG)，未移植——见文件头）
  // :18 CALL SHOW_DATA(ARG)（角色状态显示，未移植——存根）
  stub_line('SHOW_DATA', '角色状态显示', '随角色信息票');
  await era.print(''); // :19 PRINTL

  // :21-29 选择循环：旁观凌辱 / 不要凌辱
  await era.print('[0] - 旁观凌辱'); // :21
  await era.print('[1] - 不要凌辱'); // :22
  for (;;) {
    const result = await era.input(); // :24 INPUT
    if (result < 0 || result >= 2) {
      continue; // :26/:28 GOTO INPUT_LOOP
    }
    if (result === 1) {
      return 0; // :31 SIF RESULT == 1 → RETURN 0
    }
    break;
  }

  // —— 凌辱畏怖記憶があるか（:34-54）——
  // MON_COUNT / MON_FEAR 是函数局部变量（#DIM :4/:5）
  let mon_count = 0; // :35
  let mon_fear = 0; // :36
  // 第一轮扫描：找 E 表里哪一列有怪物、且 CFLAG:130（上次凌辱怪物 ID）
  // 命中该列 → MON_FEAR = 该列头（0/100/200）
  while (mon_count < 300) {
    // :41-44 数量槽 <= 0 时清掉凌辱类型槽（E:LOCAL = 0）
    let local = mon_count + 99; // :41
    if (e_get(local) <= 0) {
      e_set(local - 92, 0); // :43-44 E:(MON_COUNT+7) = 0（local-92 = +7）
    }
    local = mon_count + 7; // :46
    if (e_get(local) > 0) {
      const local_1 = e_get(mon_count); // :48 LOCAL:1 = E:MON_COUNT（怪物号）
      // :50 SIF CFLAG:ARG:130 == LOCAL:1 → MON_FEAR = MON_COUNT
      if ((era.get(`cflag:${arg}:130`) || 0) === local_1) {
        mon_fear = mon_count; // :51
      }
    }
    mon_count += 100; // :53
  }

  // :57 TARGET = ARG（口上钩子的 GET_KOJO_NUM 缺省读它）
  era_flag.target = arg;

  // :58 CALL DUNGEON_RYOUZYOKU（EVENT_K.ERB:249-257：按 GET_KOJO_NUM 分派）
  const ryou_local = get_kojo_num();
  if ((ryou_local >= 100 && ryou_local < 140) || ryou_local > 1000) {
    await ryouzyoku_kojo_family.call(ryou_local - 100, {
      whenMissing: 0,
      args: [],
    });
  }
  // —— 主循环（:60-160）：逐列处理怪物凌辱 ——
  mon_count = 0; // :60
  while (mon_count < 300) {
    const local = mon_count + 7; // :62
    const local_1 = e_get(mon_count); // :63 LOCAL:1 = E:MON_COUNT（怪物号）
    if (e_get(local) > 0 && mon_fear === 0) {
      // :65 首次遇到凌辱怪物：记畏怖记忆
      await era.printAndWait(`${monstername(local_1)}的凌辱开始了。`); // :65
      chara(arg).dungeon.凌辱畏怖记忆_怪物 = local_1; // :67 CFLAG:130
      mon_fear = local_1; // :68
      chara(arg).dungeon.凌辱畏怖计数 = 0; // :69 CFLAG:131
    } else if (e_get(local) > 0 && mon_fear === local_1) {
      // :71 同一怪物再来：畏怖计数++
      await era.printAndWait(`${monstername(local_1)}的凌辱开始了。`); // :65
      chara(arg).dungeon.凌辱畏怖计数 += 1; // :72 CFLAG:131++
    } else if (e_get(local) > 0 && mon_fear !== local_1) {
      // :74 不同怪物：只打台词，不动记忆
      await era.printAndWait(`${monstername(local_1)}的凌辱开始了。`); // :65
    }

    const b = mon_count; // :76 B = MON_COUNT（列头，传各 *_ryou 作数量列基址）
    const type = e_get(local); // E:(MON_COUNT+7) 凌辱类型 1-12
    const mon_num = e_get(b + 99); // E:(B+99) 该列怪物数量
    const is_male = (era.get(`talent:${arg}:122`) || 0) !== 0; // TALENT:ARG:122

    // :77-156 按凌辱类型分派（男人 → H14 *_RYOU男，否则 → 本文件 *_RYOU）
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

    await era.print(''); // :158 PRINTL
    mon_count += 100; // :159
  }

  // :162-166 魔王（角色 0）被凌辱的处女丧失（EXP:0 > 0 且 TALENT:0 == 1）
  if (
    (era.get(`exp:${0}:0`) || 0) > 0 &&
    (era.get(`talent:${0}:0`) || 0) === 1
  ) {
    chara(0).chara.处女 = 0; // :163 TALENT:0 = 0（chara 域门面）
    await era.print('【处女丧失】'); // :164
    chara(0).train.初体验对象 = 104; // :165 CFLAG:15 = 104（怪物）
  }

  // :168 CALL DUNGEON_RYOUZYOKU_AFTER（EVENT_K.ERB:263-271：按 GET_KOJO_NUM 分派）
  const ryou_after_local = get_kojo_num();
  if (
    (ryou_after_local >= 100 && ryou_after_local < 140) ||
    ryou_after_local > 1000
  ) {
    await ryouzyoku_after_kojo_family.call(ryou_after_local - 100, {
      whenMissing: 0,
      args: [],
    });
  }
  // :172 CALL DUNGEON_RYOUZYOKU_ESCAPE,ARG
  await dungeon_ryouzyoku_escape(arg, rand_n);

  return 0; // :174
}

// @ORC_RYOU(ARG) // :177
/**
 * 兽人凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列兽人数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function orc_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const c131 = era.get(`cflag:${arg}:131`) || 0;

  // :179-183 男人の場合（TALENT:122）——本文件只服务女性对象；分派已在
  // @RYOUZYOKU 按 TALENT:122 分流，此守卫保留 1:1 结构（防御性）
  if (era.get(`talent:${arg}:122`)) {
    await era.printAndWait('『把这家伙绑起来…』'); // :183
    return 0; // :181
  }

  // :185-231 畏怖阶段口上（PRINTDATAW 三档 + 处女/非处女）
  if (c131 > 5) {
    // :186-198 隷属状態
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
    ); // :190-199
  } else if (c131 > 3) {
    // :199-210 強畏怖状態
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
    ); // :204-213
  } else if (c131 > 0) {
    // :211-222 弱畏怖状態
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
    ); // :218-227
  } else if (era.get(`talent:${arg}:122`)) {
    // :224-236 初次・男人（不可达——本文件只收女性对象，结构保留）
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
    ); // :232-242
  } else {
    // :237-251 初次・女人
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
    ); // :246-256
  }

  // :261 MON_NUM = E:(B + 99)（参数注入，见文件头）

  // :263-275 处女封印（TALENT:273）
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait('『可恶！这家伙有封印！』'); // :265
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量守卫着，一摸上去，手都发麻了。`,
    ); // :266
    await era.printAndWait('『行啊你！我就不信你把便便的洞也封住了！』'); // :267
    await era.printAndWait(`${arg_name}的另一个穴，被发泄了兽欲……`); // :268
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`精液经验+${mon_num}`); // :270
    chara(arg).dungeon.肛门经验 += mon_num; // :271 EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // :272 EXP:ARG:20 精液经验
    await era.waitAnyKey(); // :273 WAIT
    return 0; // :274
  }

  if (mon_num === 1) {
    // :277-391 单只兽人（MON_NUM == 1）
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
    ); // :280-283 PRINTDATAL
    await era.print(`${arg_name}被一只兽人推倒，拼命抽插着，射满了精液。`); // :285
    await era.print(
      '她四肢着地趴在地上，脸贴着地板，随着身后的抽插不停地哭泣。',
    ); // :286
    await era.print('私处经验+1'); // :287
    await era.print('精液经验+1'); // :288
    chara(arg).dungeon.私处经验 += 1; // :289 EXP:ARG:0 私处经验
    chara(arg).dungeon.精液经验 += 1; // :290 EXP:ARG:20 精液经验

    if (era.get(`talent:${arg}:12`)) {
      // :292-296 刚强
      await era.printAndWait(`${arg_name}咬着嘴唇忍受着凌辱……`); // :294
      await era.printAndWait('在那刚强的脸上，精液无情地飞撒着。'); // :295
      await era.print(`苦痛点数+${mon_num * 10}`); // :296
      era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    } else {
      await era.printAndWait(`${arg_name}耷拉着头，`); // :299
    }

    await era.print('四肢着地趴在地上，'); // :302

    // :304-308 阴毛状态
    if ((era.get(`talent:${arg}:阴毛状态`) || 0) > 200) {
      await era.print('硬毛露了出来'); // :305
    } else if ((era.get(`talent:${arg}:阴毛状态`) || 0) > 150) {
      await era.print('隐约看见了阴毛'); // :307
    }

    // :310-318 魅力点（屁股）
    if ((era.get(`talent:${arg}:魅力点`) || 0) === 14) {
      await era.print('美丽的屁股从后露了出来'); // :312 ヒップライン
    } else if ((era.get(`talent:${arg}:魅力点`) || 0) === 23) {
      await era.print('大的屁股从后露了出来'); // :315 大きな尻
    } else {
      await era.print('屁股从后露了出来'); // :317
    }

    // :320-326 PRINTDATA 阴茎五选一
    await era.print(
      pick(
        ['阴茎', '脏污的阴茎', '带肉刺的阴茎', '巨根', '蘑菇似的阴茎'],
        rand_n,
      ),
    ); // :321-325

    await era.print('便插了进去，'); // :328
    await era.print('脸上'); // :330

    // :331-374 畏怖阶段分档
    if (c131 > 5) {
      if (era.get(`talent:${arg}:35`)) {
        await era.print('流露着沉浸在了羞耻与情欲之中的神色……'); // :335 恥じらい
        await era.print(`耻情点数+${mon_num * 12}`); // :336
        era.add(`juel:${arg}:8`, mon_num * 10); // :337 JUEL:ARG:8 耻情
      } else {
        await era.print('的神情为屈服的喜悦与口水所浸染……'); // :339
        await era.print(`屈服点数+${mon_num * 12}`); // :340
        era.add(`juel:${arg}:6`, mon_num * 10); // :341 JUEL:ARG:6 屈服
      }
    } else if (c131 > 2) {
      if (era.get(`talent:${arg}:35`)) {
        await era.print('流露着在羞耻与快乐间彷徨的神色……'); // :347 恥じらい
        await era.print(`耻情点数+${mon_num * 12}`); // :336
        era.add(`juel:${arg}:8`, mon_num * 10); // :337 JUEL:ARG:8 耻情
      } else {
        await era.print('隐约露出了屈服的喜悦……'); // :351
        await era.print(`屈服点数+${mon_num * 12}`); // :340
        era.add(`juel:${arg}:6`, mon_num * 10); // :341 JUEL:ARG:6 屈服
      }
    } else {
      if (
        (era.get(`talent:${arg}:14`) ||
          era.get(`talent:${arg}:26`) ||
          era.get(`talent:${arg}:44`)) &&
        (era.get(`talent:${arg}:45`) || 0) === 0
      ) {
        // :356-360 大人しい・悲観的・涙もろい（且不泣かない）
        await era.print('被眼泪浸湿了……'); // :358
        await era.print(`恐怖点数+${mon_num * 10}`); // :359
        era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
      } else if (era.get(`talent:${arg}:35`)) {
        await era.print('浸染着羞耻的神色……'); // :363 恥じらい
        await era.print(`耻情点数+${mon_num * 10}`); // :364
        era.add(`juel:${arg}:8`, mon_num * 10); // :337 JUEL:ARG:8 耻情
      } else if (era.get(`talent:${arg}:11`)) {
        await era.print('的表情因愤怒而扭曲……'); // :368 反抗的
      } else {
        await era.print('染上了绝望的神色……'); // :370
        await era.print(`屈服点数+${mon_num * 10}`); // :371
        era.add(`juel:${arg}:6`, mon_num * 10); // :341 JUEL:ARG:6 屈服
      }
    }

    await era.print('私处经验+1'); // :287
    await era.print('精液经验+1'); // :288
    chara(arg).dungeon.私处经验 += 1; // :378 EXP:ARG:0 私处经验
    chara(arg).dungeon.精液经验 += 1; // :379 EXP:ARG:20 精液经验

    if (era.get(`talent:${arg}:0`)) {
      await era.print('『处女诶！　恭喜破处啦……』'); // :383
    }
    if (era.get(`talent:${arg}:42`)) {
      await era.print('『这家伙被强奸着都湿了啊』'); // :386 濡れやすい
    }

    await era.waitAnyKey(); // :388 WAIT
    return 0; // :390
  }

  if (rand_n(5) === 0) {
    // :393-485 口交
    await era.printAndWait(
      pick(
        [
          '『喂！闭嘴……别吵啦！快点喝下去！』',
          '『舔个……干净……』',
          '『打得都勃起了……』',
        ],
        rand_n,
      ),
    ); // :396-398 PRINTDATAW

    if (era.get(`talent:${arg}:52`)) {
      // :401-406 擅用舌头
      await era.printAndWait('『呃……这家伙，简直就是经验丰富的妓女嘛～』'); // :403
      await era.printAndWait(
        `${arg_name}拼命地用舌头侍奉着，展现出天赋般的好技术。`,
      ); // :404
      await era.printAndWait(
        `兽人抵受不住她那灵活的舌头，射在${arg_name}的嘴里了。`,
      ); // :405
      mon_num *= 2; // :406 舌使いボーナス
    }

    if ((era.get(`talent:${arg}:种族`) || 0) === 4) {
      await era.print('无头骑士的'); // :410
    }

    await era.print(`${arg_name}`); // :412

    if ((era.get(`talent:${arg}:种族`) || 0) === 4) {
      await era.print('身体被固定住了，只剩下脑袋来像飞机杯似的'); // :415
    } else {
      await era.print('全裸地'); // :417
    }
    await era.printAndWait('侍奉着兽人们的阴茎。'); // :419
    await era.printAndWait(
      `只要喝掉所有${mon_num}只兽人的精液的话，它们就答应不侵犯她的下体………`,
    ); // :420

    // :422-461 畏怖阶段分档（性格状语）
    if (c131 > 5) {
      if (era.get(`talent:${arg}:13`)) {
        await era.print('毫无犹豫、'); // :426 素直
      } else if (era.get(`talent:${arg}:14`)) {
        await era.print('小心翼翼地、'); // :429 大人しい
      } else if (era.get(`talent:${arg}:17`)) {
        await era.print('一边土下座扭着腰部的'); // :432 プライド低い
      } else if (era.get(`talent:${arg}:35`)) {
        await era.print('期待与羞耻将脸染红的'); // :435 恥じらい
      } else if (era.get(`talent:${arg}:0`)) {
        await era.print('为了守住自己处女的'); // :438 処女
      } else {
        await era.print('面露期待的'); // :440
      }
    } else if (c131 > 2) {
      if (era.get(`talent:${arg}:13`)) {
        await era.print('老实遵从于兽人的'); // :446 素直
      } else if (era.get(`talent:${arg}:14`)) {
        await era.print('煞有其事地、'); // :449 大人しい
      } else if (era.get(`talent:${arg}:17`)) {
        await era.print('不住向阴茎献媚的'); // :452 プライド低い
      } else if (era.get(`talent:${arg}:35`)) {
        await era.print('面对阴茎羞红了脸的'); // :455 恥じらい
      } else if (era.get(`talent:${arg}:0`)) {
        await era.print('为了守住自己处女的'); // :438 処女
      } else {
        await era.print('已然无法反抗的'); // :460
      }
    } else {
      if (era.get(`talent:${arg}:11`)) {
        await era.print('带着反抗的目光看着它们，其中一只兽人对她怒喝了一声，'); // :465 反抗的
        await era.print(`恐怖点数+${mon_num * 10}`); // :359
        era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
      } else if (era.get(`talent:${arg}:13`)) {
        await era.print(
          '迫于兽人的威胁，她衡量了一下得失之后，老实地接受了屈辱的命运……听天由命地流泪，',
        ); // :470 素直
        await era.print(`耻情点数+${mon_num * 10}`); // :364
        era.add(`juel:${arg}:8`, mon_num * 10); // :337 JUEL:ARG:8 耻情
      } else if (era.get(`talent:${arg}:14`)) {
        await era.print('提心吊胆地'); // :475 大人しい
      } else if (era.get(`talent:${arg}:17`)) {
        await era.print('嘿嘿媚笑着'); // :478 プライド低い
      } else if (era.get(`talent:${arg}:35`)) {
        await era.print('不敢直视肉棒而闭上了眼睛'); // :481 恥じらい
      } else if (era.get(`talent:${arg}:0`)) {
        await era.print('为了守住自己处女的'); // :438 処女
      }
    }

    await era.print(`${arg_name}把`); // :488

    // :488-496 PRINTDATA 阴茎五选一
    await era.print(
      pick(
        ['阴茎', '脏污的阴茎', '带肉刺的阴茎', '巨根', '蘑菇似的阴茎'],
        rand_n,
      ),
    ); // :489-495

    await era.print('含了下去，'); // :498

    if (era.get(`talent:${arg}:52`)) {
      // :499-505 舌使い
      await era.printAndWait('『呃……这家伙，简直就是经验丰富的妓女嘛～』'); // :403
      await era.printAndWait(
        `${arg_name}拼命地用舌头侍奉着，展现出天赋般的好技术。`,
      ); // :503
      await era.printAndWait(
        `兽人抵受不住她那灵活的舌头，射在${arg_name}的嘴里了。`,
      ); // :504
      mon_num *= 2; // :504 舌使いボーナス
    } else if (era.get(`talent:${arg}:21`)) {
      await era.print('像工作一样地奉仕着，'); // :509 無関心
    } else if (era.get(`talent:${arg}:36`)) {
      await era.print('不禁发出了粗俗的声音，'); // :512 恥薄い
    } else if (era.get(`talent:${arg}:50`)) {
      await era.print('很快地抓住了奉仕的诀窍，'); // :515 習得早い
    } else if (era.get(`talent:${arg}:62`)) {
      await era.print('忍受着腥臭味，'); // :518 汚臭敏感
    } else if (era.get(`talent:${arg}:63`)) {
      await era.print('拼命地用舌头奉仕着，'); // :521 献身的
    }

    await era.print('奉仕持续了下去……'); // :524

    await era.print(`口交经验+${mon_num}`); // :526
    await era.print(`精液经验+${mon_num}`); // :270
    chara(arg).dungeon.口交经验 += mon_num; // :526 EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // :527 EXP:ARG:20 精液经验

    // :529-530 初吻（SIF CFLAG:16 == -1）
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // :530 CFLAG:16 = 995（怪物的阴茎）
    }
  } else if (rand_n(4) === 0) {
    // :532-614 全穴奉仕
    await era.printAndWait(
      pick(
        [
          '『兄弟们，把所有的穴都塞满哦！』',
          '『嘿，简直像三明治一样』',
          '『连耳朵，都给你灌满精液咯』',
        ],
        rand_n,
      ),
    ); // :540-542 PRINTDATAW

    await era.printAndWait(
      `${arg_name}被${mon_num}只兽人用积存已久的精液，将私处、嘴巴、肛门……所有能用的穴，注满了精液……`,
    ); // :545
    await era.printAndWait(
      '她用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。',
    ); // :546
    await era.printAndWait(
      `${arg_name}的脸和性器都用精液化上了妆。兽人们看着她这样子，开怀大笑。`,
    ); // :547

    await era.print('兽人的'); // :549

    // :546-552 PRINTDATA 阴茎五选一
    await era.print(
      pick(
        ['阴茎', '脏污的阴茎', '带肉刺的阴茎', '巨根', '蘑菇似的阴茎'],
        rand_n,
      ),
    ); // :552-556

    await era.print(
      `插进了${arg_name}的喉咙深处，射精的同时喷溅出来的精液在${arg_name}的`,
    ); // :559

    // :556-568 魅力点/眼镜分档
    if ((era.get(`cflag:${arg}:42`) || 0) === 83) {
      await era.print('眼镜上飞撒着……'); // :562
    } else if ((era.get(`talent:${arg}:魅力点`) || 0) === 2) {
      await era.print('可爱的眼睛上飞撒着……'); // :564
    } else if ((era.get(`talent:${arg}:魅力点`) || 0) === 3) {
      await era.print('漂亮的鼻子里喷了出来……'); // :566
    } else if ((era.get(`talent:${arg}:魅力点`) || 0) === 22) {
      await era.print('光鲜亮丽的头发上飞撒着……'); // :568
    } else {
      await era.print('脸上飞撒着……'); // :570
    }
    await era.print(''); // :572 PRINTL

    if (era.get(`talent:${arg}:12`)) {
      // :569-574 刚强
      await era.printAndWait(`${arg_name}咬着嘴唇忍受着凌辱……`); // :294
      await era.printAndWait('在那刚强的脸上，精液无情地飞撒着。'); // :295
      await era.print(`苦痛点数+${mon_num * 10}`); // :296
      era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    } else if (era.get(`talent:${arg}:70`) || era.get(`talent:${arg}:73`)) {
      // :576-583 接受快感・容易陷落
      await era.printAndWait('在凌辱开始不久后，渐渐地听到了妩媚的娇喘声。'); // :582
      await era.printAndWait('『喔！这家伙有感觉了哦！』'); // :583
      await era.printAndWait(`${arg_name}被快感冲击着，忍不住主动扭着腰。`); // :584
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    } else {
      await era.printAndWait(
        '她用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。',
      ); // :589
    }

    await era.printAndWait(''); // :594 PRINTW（空行等待）

    await era.print(`兽人们把润滑液涂在了${arg_name}的`); // :595

    // :592-608 魅力点/体型分档
    if ((era.get(`talent:${arg}:魅力点`) || 0) === 21) {
      await era.print('漂亮的'); // :598
    } else if ((era.get(`talent:${arg}:魅力点`) || 0) === 14) {
      await era.print('漂亮的屁股的缝隙中的'); // :600
    } else if ((era.get(`talent:${arg}:魅力点`) || 0) === 23) {
      await era.print('大的屁股的缝隙中的'); // :602
    } else if (era.get(`talent:${arg}:125`)) {
      await era.print('无毛额'); // :604 白虎
    } else if (era.get(`talent:${arg}:248`)) {
      await era.print('肌肉明显的两腿间的'); // :606 筋肉質
    } else if ((era.get(`talent:${arg}:阴毛状态`) || 0) > 200) {
      await era.print('从阴阜到肛门都被茂密的阴毛所覆盖的'); // :608
    } else if ((era.get(`talent:${arg}:阴毛状态`) || 0) > 150) {
      await era.print('长着茂盛的阴毛的'); // :610
    }

    await era.print('性器和肛门上'); // :613
    await era.print(`在${arg_name}的`); // :614

    if (era.get(`talent:${arg}:99`)) {
      await era.print('魁梧的身体上'); // :618 魁梧
    } else if (era.get(`talent:${arg}:100`)) {
      await era.print('娇小的身体上'); // :621 娇小
    } else if (era.get(`talent:${arg}:115`)) {
      await era.print('松松垮垮的身体上'); // :624 肥満
    } else if (era.get(`talent:${arg}:248`)) {
      await era.print('紧致的身体上'); // :627 筋肉質
    } else if (era.get(`talent:${arg}:256`)) {
      await era.print('窈窕的身体上'); // :630 虚弱
    } else if ((era.get(`talent:${arg}:体型`) || 0) <= 100) {
      await era.print('纤细的身体上'); // :632
    } else if ((era.get(`talent:${arg}:体型`) || 0) > 200) {
      await era.print('肉感的身体上'); // :634
    } else {
      await era.print('身体上'); // :636
    }

    await era.print('像要挤爆她似的激烈地持续侵犯着……'); // :639

    await era.printAndWait(
      '她用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。',
    ); // :641

    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    await era.print(`私处经验+${mon_num}`); // :646
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`口交经验+${mon_num}`); // :526
    await era.print(`精液经验+${mon_num}`); // :270
    chara(arg).dungeon.私处经验 += mon_num; // :645 EXP:ARG:0 私处经验
    chara(arg).dungeon.肛门经验 += mon_num; // :646 EXP:ARG:1 肛门经验
    chara(arg).dungeon.口交经验 += mon_num; // :647 EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // :648 EXP:ARG:20 精液经验

    // :650-651 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // :651
    }
  } else if (rand_n(3) === 0) {
    // :653-734 屈辱プレイ
    await era.printAndWait(
      pick(
        [
          '『你不要做人了。从今往后就是家畜了。像猪一样叫几声来听听。』',
          '『猪就要有，猪的样子』',
          '『你只是，比我们还低级的，家畜罢了！』',
        ],
        rand_n,
      ),
    ); // :663-665 PRINTDATAW

    await era.print(`${arg_name}全裸地四肢着地趴在地下、`); // :668

    if (era.get(`talent:${arg}:10`) || era.get(`talent:${arg}:14`)) {
      await era.print('浑身颤抖着、'); // :672 臆病・大人しい
    } else if (era.get(`talent:${arg}:11`)) {
      await era.print('怒目圆睁着、'); // :675 反抗的
    } else if (era.get(`talent:${arg}:13`)) {
      await era.print('拼命服从着、'); // :678 素直
    } else if (era.get(`talent:${arg}:17`)) {
      await era.print('拼命献媚着、'); // :681 プライド低い
    } else if (era.get(`talent:${arg}:35`)) {
      await era.print('羞红了脸、'); // :684 恥じらい
    }

    await era.printAndWait('屈辱地模仿猪叫……'); // :687

    await era.printAndWait(
      `${mon_num}只兽人看到这个情形都笑了。完全没有了光辉冒险者的样子，就是一只惨叫的猪而已。`,
    ); // :689

    if (era.get(`abl:${arg}:17`)) {
      // :685-691 露出癖
      await era.printAndWait(
        `${arg_name}的脸犹如发烧一般，不停地重复着上述行为。`,
      ); // :693
      await era.printAndWait('好像因为被视奸，而有了感觉。'); // :694
      await era.print(`耻情点数+${mon_num * 10}`); // :364
      era.add(`juel:${arg}:8`, mon_num * 10); // :337 JUEL:ARG:8 耻情
    }

    if (era.get(`abl:${arg}:21`)) {
      // :693-699 抖M气质
      await era.printAndWait(`${arg_name}好像因为被骂而有了感觉。`); // :701
      await era.printAndWait('『明明就是母猪，还说自己是冒险者！』'); // :702
      await era.printAndWait(`${arg_name}连眼神都湿润了～`); // :703
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    }

    await era.print('『猪'); // :708
    if (era.get(`talent:${arg}:17`)) {
      await require('#/kojo/kojo-system').gobi_koujo(1); // :705 CALL GOBI_KOUJO, 1
    } else {
      await require('#/kojo/kojo-system').gobi_koujo(5); // :708 CALL GOBI_KOUJO, 5
    }
    await era.print('还自称冒险者……简直傻了'); // :717

    if (era.get(`talent:${arg}:17`)) {
      await require('#/kojo/kojo-system').gobi_koujo(1); // :714 CALL GOBI_KOUJO, 1
    } else {
      await require('#/kojo/kojo-system').gobi_koujo(5); // :717 CALL GOBI_KOUJO, 5
    }
    await era.printAndWait('　噗噗，噗嘻！』'); // :728

    if (era.get(`talent:${arg}:17`)) {
      // :721-726 プライド低い
      await era.printAndWait(`${arg_name}抛弃了自尊心，拼命地求饶着。`); // :732
      await era.print(`屈服点数+${mon_num * 10}`); // :371
      era.add(`juel:${arg}:6`, mon_num * 10); // :341 JUEL:ARG:6 屈服
    }

    await era.print(`耻情点数+${mon_num * 10}`); // :364
    await era.print(`屈服点数+${mon_num * 10}`); // :371
    era.add(`juel:${arg}:8`, mon_num * 10); // :337 JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // :341 JUEL:ARG:6 屈服
  } else if (rand_n(2) === 0) {
    // :733-770 武器捅私处
    await era.printAndWait('『来试试，看能放多粗的东西进去？』'); // :742
    await era.printAndWait(`${arg_name}感受到了自己身上的危机，拼命地哀求着。`); // :743
    await era.printAndWait(
      '不过，她的身体依旧被兽人们牢牢抓住。M字开脚地把不设防的性器和肛门展示在大家面前。',
    ); // :744
    await era.printAndWait(
      `其中一只兽人，拿起她的心爱的武器用柄的那端捅入她的私处。`,
    ); // :745
    await era.printAndWait(
      `${arg_name}的喊叫声，回响在${mon_num}只兽人的耳边。`,
    ); // :746

    if (era.get(`talent:${arg}:40`)) {
      // :740-746 害怕疼痛
      await era.printAndWait('「好痛……不要啊……呜哇哇哇哇哇哇！」'); // :750
      await era.printAndWait(`${arg_name}受不了痛楚，高声哭喊着。`); // :751
      await era.print(`苦痛点数+${mon_num * 10}`); // :296
      era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    }

    if (era.get(`abl:${arg}:21`)) {
      // :748-754 抖M气质
      await era.printAndWait(`${arg_name}在痛楚中感到了愉悦。`); // :758
      await era.printAndWait(
        `难道自己是个潜在的性变态？这么想着，${arg_name}对自身的反应感到害怕。`,
      ); // :759
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    }

    await era.print(`私处经验+${mon_num}`); // :646
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    await era.print(`恐怖点数+${mon_num * 10}`); // :359
    chara(arg).dungeon.私处经验 += mon_num; // :760 EXP:ARG:0 私处经验
    chara(arg).dungeon.肛门经验 += mon_num; // :761 EXP:ARG:1 肛门经验
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
  } else {
    // :765-796 抬屁股
    await era.printAndWait('『抬起屁股！然后说：请用！』'); // :773
    await era.printAndWait(
      `${arg_name}用屈辱的姿势抬起了屁股，把手扶在地下城的墙壁上。`,
    ); // :774
    await era.printAndWait(
      `她完全被淹没在${mon_num}只兽人之中，兽人们大笑着，轮流侵犯她的私处和肛门。`,
    ); // :775
    await era.printAndWait(
      `${arg_name}的呜咽，被兽人们的欢呼声掩埋在地下城的黑暗中。`,
    ); // :776

    if (era.get(`talent:${arg}:70`) || era.get(`talent:${arg}:73`)) {
      // :771-777 接受快感・容易陷落
      await era.printAndWait(
        `随着凌辱的持续，${arg_name}的私处里渐渐滴出了粘液。`,
      ); // :780
      await era.printAndWait(
        '『别这么快就去了啊！老子都不知道操哭多少人类女性了。』',
      ); // :781
      await era.printAndWait(`${arg_name}呼出了炽热的气息，双腿直抖着。`); // :782
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    } else if (era.get(`talent:${arg}:11`)) {
      // :779-782 反抗心
      await era.printAndWait('『喂！把腰抬起来！还没完呢！』'); // :788
      await era.printAndWait(`${arg_name}用冰冷的目光瞪了兽人们一眼。`); // :789
    }

    await era.print(`私处经验+${mon_num}`); // :646
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`精液经验+${mon_num}`); // :270
    chara(arg).dungeon.私处经验 += mon_num; // :788 EXP:ARG:0 私处经验
    chara(arg).dungeon.肛门经验 += mon_num; // :789 EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // :790 EXP:ARG:20 精液经验
  }
  await era.waitAnyKey(); // :792 WAIT
  return 0; // :793
}

// @SLIME_RYOU(ARG) // :803
/**
 * 史莱姆凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列史莱姆数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function slime_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // :806-812 男人の場合（TALENT:122）——结构保留（本文件只收女性对象）
  if (era.get(`talent:${arg}:122`)) {
    await era.printAndWait('黏液缠住了冒险者的腿，令他无法移动。'); // :809
    await era.waitAnyKey(); // :809 WAIT
    return 0; // :810
  }

  // :815-820 PRINTDATAW 五选一
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
  ); // :815-819

  // :822 MON_NUM = E:(B + 99)（参数注入）

  // :824-839 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量守卫着，将试图入侵的黏液弹开了。`,
    ); // :826
    await era.printAndWait('黏液迷茫了一会儿，但马上又发现了另一个突破口。'); // :827
    await era.printAndWait(`${arg_name}的嘴巴和肛门，被灌入了黏液。`); // :828
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    await era.print(`恐怖点数+${mon_num * 10}`); // :359
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // :834 EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // :836 WAIT
    return 0; // :837
  }

  if (rand_n(5) === 0) {
    // :842-848 黏液入口
    await era.printAndWait('黏液杀到了冒险者的嘴巴里。'); // :840
    await era.printAndWait(
      `${arg_name}感觉呼吸困难，正挣扎着，突然呼吸又顺畅了。但一部分的黏液已经借机流入了内脏，从内部蹂躏着。`,
    ); // :841
    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    await era.print(`恐怖点数+${mon_num * 10}`); // :359
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
  } else if (rand_n(4) === 0) {
    // :850-871 黏液入肛
    await era.printAndWait('黏液杀到了冒险者的肛门里。'); // :847
    await era.printAndWait(
      `${arg_name}被肛门里大量逆流的黏液弄的苦不堪言，但是四肢都被黏液牢牢控制，无法反抗。`,
    ); // :848
    if (era.get(`cflag:${arg}:131`) > 5) {
      await era.printAndWait(
        `${arg_name}反弓起腰来、似乎沉浸于粘液的杠虐快感之中……`,
      ); // :851 隷属状態
    } else if (era.get(`cflag:${arg}:131`) > 3) {
      await era.printAndWait(`${arg_name}已然被粘液攻陷了……`); // :854 強畏怖状態
    } else if (era.get(`cflag:${arg}:131`) > 0) {
      await era.printAndWait(`${arg_name}开始习惯被粘液涌入的感觉……`); // :857 弱畏怖状態
    } else {
      await era.printAndWait('冒险者在肛虐的痛苦中癫狂地惨叫着。'); // :859
    }
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    await era.print(`恐怖点数+${mon_num * 10}`); // :359
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // :870 EXP:ARG:1 肛门经验
  } else if (rand_n(3) === 0) {
    // :873-878 四脚着地
    await era.printAndWait('被全裸地四脚着地压在地上，黏液逆流到肛门里了。'); // :868
    await era.printAndWait(
      `${arg_name}腹部运劲，将黏液喷出肛门，但依然有大量的黏液流入体内。`,
    ); // :869
    await era.print(`耻情点数+${mon_num * 10}`); // :364
    await era.print(`屈服点数+${mon_num * 10}`); // :371
    era.add(`juel:${arg}:8`, mon_num * 10); // :337 JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // :341 JUEL:ARG:6 屈服
  } else if (rand_n(2) === 0) {
    // :881-891 大量黏液
    await era.printAndWait(
      '黏液疯狂地凌辱着，大量的黏液灌入了直肠里让冒险者的肚子都膨胀了几分。',
    ); // :875
    await era.printAndWait(`${arg_name}坚强地试图站起来。`); // :876
    await era.printAndWait(
      '但是大量的黏液一下子又从肛门里汹涌地喷出来了，膝盖一软又跪倒在地。',
    ); // :877
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    await era.print(`恐怖点数+${mon_num * 10}`); // :359
    chara(arg).dungeon.肛门经验 += mon_num; // :888 EXP:ARG:1 肛门经验
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
  } else {
    // :892-897 治愈黏液
    await era.printAndWait('冒险者被包在黏液里，只露出头部发出呜呜的呻吟。'); // :885
    await era.printAndWait(`看来没人相救的话，${arg_name}要被消化在黏液里了。`); // :886
    await era.printAndWait(
      `但黏液持续的爱抚着身体，可能也会让${she(arg)}溶化在快感之中。`,
    ); // :887
    await era.printAndWait(
      `黏液的麻痹成分，渐渐把${arg_name}遭受凌辱的苦痛身体治愈了。`,
    ); // :888
    chara(arg).dungeon.体力 += 100; // :897 BASE:ARG:0 += 100（体力回复）
  }
  await era.waitAnyKey(); // :899 WAIT
  return 0; // :900
}

// @INSECT_RYOU(ARG) // :895（源 :895-989；行号见上）
/**
 * 昆虫凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列昆虫数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function insect_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // :899-903 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.printAndWait('节肢动物在冒险者的脖子上打入了麻痹毒素。'); // :901
    return 0; // :902
  }

  // :905-926 畏怖阶段口上（PRINTDATAW 四档）
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
    ); // :908-912 隷属状態
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
    ); // :917-921 強畏怖状態
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
    ); // :926-930 弱畏怖状態
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
    ); // :934-938 初见
  }

  // :946 MON_NUM = E:(B + 99)（参数注入）

  // :948-965 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait('『叽吱叽吱叽吱……』'); // :971
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量守卫着，节肢动物无法入侵。`,
    ); // :947
    await era.printAndWait('它怒了，将输卵管直接插入肛门里。'); // :948
    await era.printAndWait(`${arg_name}因剧痛发出了凄厉的惨叫……`); // :949
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    await era.print(`恐怖点数+${mon_num * 10}`); // :359
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // :959 EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // :961 WAIT
    return 0; // :962
  }

  if (mon_num === 1) {
    // :964-975 单只昆虫
    await era.print('『叽吱叽吱叽吱……』'); // :961
    await era.print(`${arg_name}被节肢动物抓住，直接被输卵管插入私处里。`); // :962
    await era.print('她不断地惨叫着，但节肢动物依旧毫不留情。'); // :963
    await era.print('私处经验+1'); // :964
    chara(arg).dungeon.私处经验 += 1; // :969 EXP:ARG:0 私处经验
    await era.waitAnyKey(); // :971 WAIT
    return 0; // :972
  }

  if (rand_n(2) === 0) {
    // :977-984 嘴巴产卵
    await era.printAndWait('『叽吱叽吱叽吱……』'); // :979
    await era.printAndWait(`${arg_name}的嘴巴被输卵管插入了，被播下了卵。`); // :972
    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    await era.print(`恐怖点数+${mon_num * 10}`); // :359
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
  } else {
    // :985-992 肛门产卵
    await era.printAndWait('『叽吱叽吱叽吱……』'); // :946
    await era.printAndWait(`${arg_name}的肛门被输卵管插入了，被播下了卵。`); // :980
    await era.printAndWait(
      '不喝下打虫药剂的话，魔界的虫子就会从肛门里孵化了吧。',
    ); // :981
    await era.printAndWait(
      `${mon_num}只节肢动物轮流扑在${arg_name}身上，从臀部到背部全被卵覆盖了。`,
    ); // :982
    await era.print(`肛门经验+${mon_num}`); // :269
    chara(arg).dungeon.肛门经验 += mon_num; // :991 EXP:ARG:1 肛门经验
  }
  await era.waitAnyKey(); // :993 WAIT
  return 0; // :994
}

// @IVY_RYOU(ARG) // :990（源 :990-1046）
/**
 * 蔦触手凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列蔦触手数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function ivy_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // :994-998 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.printAndWait('植物用藤蔓抢走了冒险者的武器。'); // :996
    return 0; // :997
  }

  // :1001-1006 PRINTDATAW 五选一
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
  ); // :1001-1005

  // :1008 MON_NUM = E:(B + 99)（参数注入）

  // :1010-1021 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量守卫着，将试图入侵的藤蔓烧毁。`,
    ); // :1012
    await era.printAndWait('但是，本来就对纯洁这东西没概念的植物，'); // :1013
    await era.printAndWait(`把目标转移到了${arg_name}的肛门……`); // :1014
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    await era.print(`恐怖点数+${mon_num * 10}`); // :359
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // :1020 EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // :1022 WAIT
    return 0; // :1023
  }

  if (rand_n(2) === 0) {
    // :1025-1030 勒颈
    await era.printAndWait('藤蔓勒住了冒险者的脖子。'); // :1026
    await era.printAndWait(
      `${arg_name}呼吸困难，痛苦挣扎着，被开放的时候，忍不住粗声地喘息。`,
    ); // :1027
    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    await era.print(`恐怖点数+${mon_num * 10}`); // :359
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
  } else {
    // :1032-1042 肛门扎根
    await era.printAndWait('藤蔓在冒险者的肛门里扎根了。'); // :1033
    await era.printAndWait(
      `${arg_name}的肛门被蹂躏着，发出了喊破喉咙的惨叫声。`,
    ); // :1034
    await era.printAndWait('藤蔓吸收到了足够的养分，一下子从直肠里连根拔走。'); // :1035
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    await era.print(`恐怖点数+${mon_num * 10}`); // :359
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // :1041 EXP:ARG:1 肛门经验
  }
  await era.waitAnyKey(); // :1043 WAIT
  return 0; // :1044
}

// @SYOKUSYU_RYOU(ARG) // :1047（源 :1047-1147）
/**
 * 触手凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列触手数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function syokusyu_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // :1051-1055 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.printAndWait('冒险者的身体被触手缠住了。'); // :1053
    return 0; // :1054
  }

  // :1057-1095 畏怖阶段口上（PRINTDATAW 三档）
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
    ); // :1061-1065 隷属状態
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
    ); // :1071-1076 強畏怖状態
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
    ); // :1080-1084 初见
  }

  // :1088 MON_NUM = E:(B + 99)（参数注入）

  // :1090-1103 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量保护着，触手一摸上去，就发麻了。`,
    ); // :1092
    await era.printAndWait('触手放弃了，向次要目标进发。'); // :1093
    await era.printAndWait(`${arg_name}的菊花，被强行撬开了。`); // :1094
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    await era.print(`恐怖点数+${mon_num * 10}`); // :359
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // :1100 EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // :1102 WAIT
    return 0; // :1103
  }

  if (rand_n(5) === 0) {
    // :1105-1108 触手入嘴
    await era.printAndWait('触手伸进了冒险者的嘴巴里。'); // :1106
    await era.printAndWait(
      `${arg_name}的喉咙被大量的体液灌入，呛到了。不久，${she(arg)}的意识开始模糊了。`,
    ); // :1107
    await era.print(`欲情点数+${mon_num * 10}`); // :585
    era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
  } else if (rand_n(4) === 0) {
    // :1110-1117 触手入肛
    await era.printAndWait('触手伸进了冒险者的肛门里。'); // :1111
    await era.printAndWait(
      `${arg_name}的肛门被大量的体液灌入，直肠吸收了里面的成分。不久，${she(arg)}的意识开始模糊了。`,
    ); // :1112
    await era.printAndWait(
      '不一会儿，全身肌肉都松弛了，大量的浑浊体液从肛门流出。',
    ); // :1113
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`欲情点数+${mon_num * 10}`); // :585
    era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    chara(arg).dungeon.肛门经验 += mon_num; // :1117 EXP:ARG:1 肛门经验
  } else if (rand_n(3) === 0) {
    // :1118-1124 触手侵犯私处
    await era.printAndWait('仰面倒下的冒险者，正被触手侵犯着私处。'); // :1119
    await era.printAndWait(
      `${arg_name}不断悲鸣着，但被大量的体液灌入私处后，开始半张着嘴流着口水，目光虚无地看着上方。`,
    ); // :1120
    await era.print(`私处经验+${mon_num}`); // :646
    await era.print(`欲情点数+${mon_num * 10}`); // :585
    era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    chara(arg).dungeon.私处经验 += mon_num; // :1124 EXP:ARG:0 私处经验
  } else if (rand_n(2) === 0) {
    // :1125-1134 吊缚
    await era.printAndWait('触手把冒险者绑了起来，吊在半空。'); // :1126
    await era.printAndWait(
      `${arg_name}的嘴巴也好，私处也好，肛门也好，能被触手侵犯的地方都被灌入了大量的体液。`,
    ); // :1127
    await era.printAndWait(
      '……不久，地上滴落的液体里，开始出现了触手体液之外的东西。',
    ); // :1128
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`私处经验+${mon_num}`); // :646
    await era.print(`欲情点数+${mon_num * 10}`); // :585
    era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    chara(arg).dungeon.肛门经验 += mon_num; // :1133 EXP:ARG:1 肛门经验
    chara(arg).dungeon.私处经验 += mon_num; // :1134 EXP:ARG:0 私处经验
  } else {
    // :1135-1144 榨乳
    await era.printAndWait('冒险者被触手吸着乳头，不断的挤奶。'); // :1136
    await era.printAndWait(
      `${arg_name}带着难以置信的表情，感受着触手的体液顺着乳头流入，最终融化到了脑髓里。`,
    ); // :1137
    await era.printAndWait(
      `不久之后${she(arg)}感到乳房发胀，触手顺势开始了榨乳。`,
    ); // :1138
    await era.printAndWait(
      `不久之后，${arg_name}母乳开始无法抑制地从乳头喷出。`,
    ); // :1139
    await era.print('喷奶经验+1'); // :1140
    chara(arg).train.喷奶经验 += 1; // :1141 EXP:ARG:54 喷奶经验
  }
  await era.printAndWait(`触手经验+${mon_num}`); // :1143
  chara(arg).dungeon.触手经验 += mon_num; // :1144 EXP:ARG:55 触手经验
  return 0; // :1145
}

// @FAILY_RYOU(ARG) // :1148（源 :1148-1236）
/**
 * 妖精凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列妖精数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function faily_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // :1152-1156 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.printAndWait('『下次再来玩啊～』'); // :1154
    return 0; // :1155
  }

  // :1158-1186 畏怖阶段口上（PRINTDATAW 三档）
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
    ); // :1161-1165 隷属状態
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
    ); // :1171-1176 強畏怖状態
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
    ); // :1180-1184 初见
  }

  // :1188 MON_NUM = E:(B + 99)（参数注入）

  // :1190-1206 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait('『所谓的冒险者真是牢不可破啊！』'); // :1192
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量守卫着，一摸上去，手都发麻了。`,
    ); // :1193
    await era.printAndWait('妖精拿出了一根和自己身高相等的假阳具。'); // :1194
    await era.printAndWait('『小姐姐来享受这边的穴吧！』'); // :1195
    await era.printAndWait(`${arg_name}的惨叫回响在洞窟里……`); // :1196
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    await era.print(`恐怖点数+${mon_num * 10}`); // :359
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // :1202 EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // :1204 WAIT
    return 0; // :1205
  }

  if (mon_num === 1) {
    // :1207-1217 单只妖精
    await era.print('『小姐姐，要做我的肉便器吗？』'); // :1208
    await era.print(`${arg_name}的阴蒂，被一只妖精不停舔舐着。`); // :1209
    await era.print(`${arg_name}忍受着M字开脚的这份屈辱……`); // :1210
    await era.print('阴核点数+1'); // :1211
    era.add(`juel:${arg}:0`, 10); // :1212 JUEL:ARG:0 阴核
    await era.waitAnyKey(); // :1214 WAIT
    return 0; // :1215
  }

  if (rand_n(2) === 0) {
    // :1219-1225 私处钻入
    await era.printAndWait('『小姐姐的里面，是什么模样呢？』'); // :1218
    await era.printAndWait(
      `${arg_name}的私处被妖精钻入了。妖精对她的反应感到相当有趣，不断地玩弄着私处内的皱褶。`,
    ); // :1219
    await era.print(`私处经验+${mon_num}`); // :646
    await era.print(`私处点数+${mon_num * 10}`); // :1221
    chara(arg).dungeon.私处经验 += mon_num; // :1224 EXP:ARG:0 私处经验
    era.add(`juel:${arg}:1`, mon_num * 10); // :360 JUEL:ARG:1 私处点数
  } else {
    // :1226-1232 舔舐
    await era.printAndWait('『舔舔看！』'); // :1225
    await era.printAndWait(`${arg_name}的阴蒂和两乳头都被妖精们舔舐着。`); // :1226
    await era.printAndWait('身体在妖精们的欺负下越发苦闷了。'); // :1227
    await era.print(`阴核点数+${mon_num * 10}`); // :1228
    await era.print(`欲情点数+${mon_num * 10}`); // :585
    era.add(`juel:${arg}:0`, mon_num * 10); // :1212 JUEL:ARG:0 阴核
    era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
  }
  await era.waitAnyKey(); // :1235 WAIT
  return 0; // :1236
}

// @GIANT_RYOU(ARG) // :1237（源 :1237-1407）
/**
 * 巨人凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列巨人数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function giant_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // :1241-1245 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.waitAnyKey(); // :1243 WAIT
    return 0; // :1244
  }

  // :1247-1275 畏怖阶段口上（PRINTDATAW 三档）
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
    ); // :1250-1254 隷属状態
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
    ); // :1260-1265 強畏怖状態
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
    ); // :1269-1273 初见
  }

  // :1277 MON_NUM = E:(B + 99)（参数注入）

  // :1279-1293 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait('『你这家伙，尽然被封印了』'); // :1282
    await era.printAndWait(`${arg_name}的纯洁被神圣力量守卫着，巨人无法打破。`); // :1283
    await era.printAndWait('『尾指的话，应该能进去』'); // :1284
    await era.printAndWait(`${arg_name}狭窄的肛门，被巨人粗壮的尾指捅入。`); // :1285
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    await era.print(`恐怖点数+${mon_num * 10}`); // :359
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // :1290 EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // :1292 WAIT
    return 0; // :1293
  }

  if (mon_num === 1) {
    // :1295-1310 单只巨人
    await era.print('『喝下去哦』'); // :1296
    await era.print(
      `${arg_name}侍奉着一只巨人，不过怎么张嘴都吞不进巨人的阴茎，只能舔舐着。`,
    ); // :1297
    await era.print(`绝顶了的巨人，把精液从头到脚浇了${she(arg)}一身。`); // :1298
    await era.print('口交经验+1'); // :1299
    await era.print('精液经验+1'); // :288
    chara(arg).dungeon.口交经验 += 1; // :1301 EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += 1; // :1302 EXP:ARG:20 精液经验

    // :1304-1305 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // :1305 CFLAG:16 = 995（怪物的阴茎）
    }
    await era.waitAnyKey(); // :1307 WAIT
    return 0; // :1308
  }

  if (rand_n(4) === 0) {
    // :1310-1343 贯穿
    await era.printAndWait('『简直就像洋娃娃一样』'); // :1311
    await era.printAndWait(`${arg_name}的腰被巨人抓着，用巨大的阴茎贯穿了。`); // :1312
    await era.printAndWait('『喂！还要继续的啊！』'); // :1313

    if (era.get(`talent:${arg}:41`)) {
      // :1315-1323 不惧疼痛
      await era.printAndWait(`${arg_name}因为平时的训练，勉强保留着意识。`); // :1317
      await era.printAndWait('『不错的声音哦！来吧！』'); // :1318
      await era.printAndWait(
        `${arg_name}痛苦得基本叫不出声了，拼命地忍受着扩张。`,
      ); // :1319
      await era.print(`恐怖点数+${mon_num * 10}`); // :359
      era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
    } else {
      // :1323-1326 その他
      await era.printAndWait(
        `经历过最初的失禁以及失神之后，${she(arg)}已经不知道这是第几个巨人了。`,
      ); // :1325
    }

    await era.print(`私处经验+${mon_num}`); // :646
    await era.print(`精液经验+${mon_num}`); // :270
    await era.print(`阴道扩张经验+${mon_num}`); // :1330
    await era.print('异常经验+1'); // :1331
    chara(arg).dungeon.私处经验 += mon_num; // :1332 EXP:ARG:0 私处经验
    chara(arg).dungeon.精液经验 += mon_num; // :1333 EXP:ARG:20 精液经验
    chara(arg).dungeon.异常经验 += 1; // :1334 EXP:ARG:50 异常经验
    // :1335 原作显示「阴道扩张经验」却写 EXP:53（肛门扩张经验）——显示与
    // 写入不一致是原作缺陷（#14 登记；MAN 版 :678 显示肛门扩张经验写 EXP:53，
    // 与女版显示不同、写入同），1:1 保留
    chara(arg).dungeon.肛门扩张经验 += mon_num; // :1335 EXP:ARG:53 肛门扩张经验
  } else if (rand_n(3) === 0) {
    // :1336-1360 舔舐
    await era.printAndWait('『快点啊！』'); // :1337
    await era.printAndWait(`${arg_name}拼命地舔舐着巨人的阴茎。`); // :1338
    await era.printAndWait(
      `${she(arg)}拼命地哀求着，请饶了${she(arg)}，不要玩坏她的性器和肛门。`,
    ); // :1339
    await era.printAndWait(
      `必须快点搞定这${mon_num}只巨人，不然不知道他们什么时候会改变主意。`,
    ); // :1340

    if (era.get(`talent:${arg}:52`)) {
      // :1342-1349 擅用舌头
      await era.printAndWait('『哦！小东西，你很擅长用舌头嘛！』'); // :1344
      await era.printAndWait(
        `${arg_name}拼命地用舌头侍奉着，展现出天赋般的好技术。`,
      ); // :1345
      await era.printAndWait(
        `巨人被${she(arg)}灵活的舌头弄射了，精液像喷泉一样，从${arg_name}的头顶淋到脚底。`,
      ); // :1346
      mon_num *= 2; // :1347
    }

    await era.print(`口交经验+${mon_num}`); // :526
    await era.print(`精液经验+${mon_num}`); // :270
    chara(arg).dungeon.口交经验 += mon_num; // :1352 EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // :1353 EXP:ARG:20 精液经验

    // :1355-1356 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // :1356
    }
  } else if (rand_n(2) === 0) {
    // :1357-1385 肛门贯穿
    await era.printAndWait('『哦！小东西，叫得不错嘛！』'); // :1358
    await era.printAndWait(
      `${arg_name}的肛门被巨人强行用阴茎贯穿，撕裂的痛楚让她声嘶力竭地惨叫着，晕了过去。肛门处流出了鲜血。`,
    ); // :1359
    await era.printAndWait('『又一个坏掉了吗？用点回复药或许可以再来几下。』'); // :1360
    await era.printAndWait(
      `插坏了的肛门，用了回复药之后被继续玩弄着，直到满足了所有${mon_num}只巨人为止……`,
    ); // :1361

    if (era.get(`talent:${arg}:34`)) {
      // :1363-1373 抵抗
      await era.printAndWait(
        `${arg_name}竭尽全力地企图爬走，但是被轻易地抓了回来。`,
      ); // :1365
      await era.printAndWait(`『喂！这里有个想逃跑的！抓住${she(arg)}！』`); // :1366
      await era.printAndWait(
        `${arg_name}被巨人抓着四肢，那不设防的肛门，又一次被巨人的巨根插入了……`,
      ); // :1367
      await era.print(`恐怖点数+${mon_num * 10}`); // :359
      era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
    }

    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`精液经验+${mon_num}`); // :270
    await era.print(`肛门扩张经验+${mon_num}`); // :1375
    await era.print('异常经验+1'); // :1331
    chara(arg).dungeon.肛门经验 += mon_num; // :1380 EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // :1381 EXP:ARG:20 精液经验
    chara(arg).dungeon.异常经验 += 1; // :1382 EXP:ARG:50 异常经验
    chara(arg).dungeon.肛门扩张经验 += mon_num; // :1383 EXP:ARG:53 肛门扩张经验
  } else {
    // :1384-1403 精液水盆
    await era.printAndWait('『我想到好主意了』'); // :1382
    await era.printAndWait(
      '巨人们不知为何开始集体打飞机，集中射在巨大的水盆里。',
    ); // :1383
    await era.printAndWait(`${arg_name}对未知状况非常恐惧。`); // :1384
    await era.printAndWait(`巨人端着一大盆精液，对${she(arg)}说，`); // :1385
    await era.printAndWait('『不想死的话，就全部喝光。』'); // :1386
    await era.printAndWait(`${arg_name}脸上血色褪尽。`); // :1387

    if (era.get(`talent:${arg}:11`)) {
      // :1392-1401 反抗心
      await era.printAndWait(`${arg_name}用冷淡的眼神瞪着巨人，表示不从。`); // :1391
      await era.printAndWait('『看来还不明白啊！』'); // :1392
      await era.printAndWait(
        `巨人用巨大的手掌按着${arg_name}的头，直接把头按入水盆里。`,
      ); // :1393
      await era.printAndWait('「咕噜，咕噜，咕咕噜」'); // :1394
      await era.printAndWait(
        `巨人把${she(arg)}的头抓起来，那张满脸精液的脸上，再也见不到反抗的意思了。`,
      ); // :1395
      await era.print(`恐怖点数+${mon_num * 10}`); // :359
      era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
    }

    await era.print(`精液经验+${mon_num * 10}`); // :1401
    chara(arg).dungeon.精液经验 += mon_num * 10; // :1405 EXP:ARG:20 精液经验
  }
  await era.waitAnyKey(); // :1407 WAIT
  return 0; // :1408
}

// @MAN_RYOU(ARG) // :1408（源 :1408-1665）
/**
 * 魔族男人凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列魔族男人数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function man_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const c131 = era.get(`cflag:${arg}:131`) || 0;

  // :1412-1416 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.waitAnyKey(); // :1414 WAIT
    return 0; // :1415
  }

  // :1418-1446 畏怖阶段口上（PRINTDATAW 三档）
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
    ); // :1421-1425 隷属状態
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
    ); // :1431-1436 強畏怖状態
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
    ); // :1440-1444 初见
  }

  // :1448 MON_NUM = E:(B + 99)（参数注入）

  // :1450-1462 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait('『笨女人，前面严防死守，后面却全是破绽。』'); // :1452
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量保护着，不过没能堵住肛门。`,
    ); // :1453
    await era.printAndWait('『来吧！让菊花绽放！』'); // :1454
    await era.printAndWait(`${arg_name}的肛门被插入了，不断地被灌入了精液。`); // :1455
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`精液经验+${mon_num}`); // :270
    chara(arg).dungeon.肛门经验 += mon_num; // :1458 EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // :1459 EXP:ARG:20 精液经验
    await era.waitAnyKey(); // :1461 WAIT
    return 0; // :1462
  }

  if (mon_num === 1) {
    // :1464-1474 单只魔族男人
    await era.print('『如果作为肉便器被卖掉了话，我每晚都来抱你～』'); // :1465
    await era.print(`${arg_name}被魔族男人从后侵犯着。`); // :1466
    await era.print(
      '她四肢着地趴在地上，脸贴着地板，随着身后的抽插不停地哭泣。',
    ); // :1467
    await era.print('私处经验+1'); // :287
    await era.print('精液经验+1'); // :288
    chara(arg).dungeon.私处经验 += 1; // :1470 EXP:ARG:0 私处经验
    chara(arg).dungeon.精液经验 += 1; // :1471 EXP:ARG:20 精液经验
    await era.waitAnyKey(); // :1473 WAIT
    return 0; // :1474
  }

  if (rand_n(5) === 0) {
    // :1476-1507 乳交/口交
    if (era.get(`talent:${arg}:109`)) {
      // :1478-1481 贫乳
      await era.printAndWait('『完全没有胸嘛！屁股露出来，抬高点！』'); // :1479
      await era.printAndWait(
        `${arg_name}露出了屈辱的神色，向魔族男人翘起了屁股。`,
      ); // :1480
    } else {
      await era.printAndWait('『用胸部来…乳交你不知道？』'); // :1483
    }
    await era.printAndWait(
      `${arg_name}全裸地侍奉着兽人们的阴茎。只要喝掉所有${mon_num}个男人的精液的话，它们就答应不侵犯${she(arg)}的下体………`,
    ); // :1485

    if (
      era.get(`talent:${arg}:110`) ||
      era.get(`talent:${arg}:114`) ||
      era.get(`talent:${arg}:119`)
    ) {
      // :1487-1494 巨乳・爆乳・超乳
      await era.printAndWait(
        `被${arg_name}傲人的丰满胸部夹着，魔族男人们纷纷去了。`,
      ); // :1489
      await era.printAndWait('『喔！真是一双好乳房啊……阴茎专用的乳房！』'); // :1490
      await era.printAndWait(`胸部的触感让${arg_name}红晕满脸，低下了头。`); // :1491
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    } else if (era.get(`talent:${arg}:109`)) {
      // :1495-1498 贫乳
      await era.printAndWait('『接下来用嘴！鸡鸡都被你弄脏了，弄干净！』'); // :1497
      await era.printAndWait(`${arg_name}依照吩咐，用嘴巴侍奉着阴茎……`); // :1498
    }

    await era.print(`口交经验+${mon_num}`); // :526
    await era.print(`精液经验+${mon_num}`); // :270
    chara(arg).dungeon.口交经验 += mon_num; // :1502 EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // :1503 EXP:ARG:20 精液经验

    // :1505-1506 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // :1506
    }
  } else if (rand_n(4) === 0) {
    // :1508-1584 肉便器
    await era.printAndWait(
      `${arg_name}被强行宣布为肉便器，全身都被写满了淫秽的话语。`,
    ); // :1511

    await era.print(`${arg_name}的身上，被写着`); // :1514
    if (era.get(`talent:${arg}:0`)) {
      await era.print('【处女开通纪念】'); // :1517 处女
    } else {
      await era.print('【最喜欢阴茎】'); // :1519
    }
    if (era.get(`talent:${arg}:22`) || era.get(`talent:${arg}:21`)) {
      await era.print('【性冷淡便器】'); // :1524 感情淡薄・冷漠
    }
    if (era.get(`talent:${arg}:24`) || era.get(`talent:${arg}:30`)) {
      await era.print('【千金小姐便器出道】'); // :1529 保守的・看重贞操
    }
    if (era.get(`talent:${arg}:42`)) {
      await era.print('【又粘又湿】'); // :1534 容易湿
    }
    if (era.get(`talent:${arg}:70`) || era.get(`talent:${arg}:73`)) {
      await era.print('【愉悦的脸】'); // :1539 接受快感・容易陷落
    }
    if (
      era.get(`talent:${arg}:110`) ||
      era.get(`talent:${arg}:114`) ||
      era.get(`talent:${arg}:119`)
    ) {
      await era.print('【乳牛】'); // :1544 巨乳・爆乳・超乳
    }
    if (era.get(`talent:${arg}:121`) || era.get(`talent:${arg}:122`)) {
      await era.print('【有鸡鸡的奴隶】'); // :1549 扶她・男人
    }
    if (rand_n(3) === 0) {
      await era.print('【操我】'); // :1553
    } else if (rand_n(2) === 0) {
      await era.print('【肛门免费】'); // :1555
    } else {
      await era.print('【母猪】'); // :1557
    }
    await era.print('之类的话。'); // :1560

    await era.printAndWait(
      '络绎不绝的魔族男人，将嘴巴、私处、肛门等等地方都侵犯了，精液流得到处都是。',
    ); // :1562
    await era.printAndWait(
      `当被最后一人抱着的时候，${arg_name}已经失去了任何表情，成为全身的穴都流出着精液的下流便器了。`,
    ); // :1563
    await era.printAndWait(
      `地下城里，充斥着${mon_num}人份的精液和爱液的异样臭味。魔族男人对原冒险者重生成为肉便器相当欢迎。`,
    ); // :1564

    // :1555-1564 肌の色で分岐
    if (era.get(`talent:${arg}:244`)) {
      await era.printAndWait(`${arg_name}的蓝色肌肤，被沾满了精液……`); // :1569 恶魔肌肤
    } else if (era.get(`talent:${arg}:253`)) {
      await era.printAndWait(
        `${arg_name}健康的褐色肌肤，与白浊的精液形成鲜明又淫靡的对比……`,
      ); // :1572 褐色肌肤
    } else if (era.get(`talent:${arg}:255`)) {
      await era.printAndWait(`${arg_name}美丽的白皙肌肤被精液玷污了……`); // :1575 白皙
    }

    await era.print(`私处经验+${mon_num}`); // :646
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`口交经验+${mon_num}`); // :526
    await era.print(`精液经验+${mon_num}`); // :270
    chara(arg).dungeon.私处经验 += mon_num; // :1571 EXP:ARG:0 私处经验
    chara(arg).dungeon.肛门经验 += mon_num; // :1572 EXP:ARG:1 肛门经验
    chara(arg).dungeon.口交经验 += mon_num; // :1573 EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // :1574 EXP:ARG:20 精液经验

    // :1576-1577 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // :1507
    }
  } else if (rand_n(3) === 0) {
    // :1578-1600 灌肠
    await era.printAndWait('『明明是冒险者，却忍不住了吗？』'); // :1590
    await era.printAndWait(
      `${arg_name}的肛门被灌入了灌肠液，忍受着强烈的便意。`,
    ); // :1591
    await era.printAndWait(
      '『快点自慰！在漏出来之前自慰去了的话就带你上厕所！』',
    ); // :1592
    await era.printAndWait(
      `${arg_name}拼命地自慰着，但是在这异常的状况中，却无法兴奋起来。`,
    ); // :1593
    await era.printAndWait('肛门里的污物，终于无法忍耐地飞散而出。'); // :1594
    await era.printAndWait(
      `魔族男人们看到这样，毫不留情地说着侮蔑的话，${arg_name}在这份屈辱中泣不成声。`,
    ); // :1595

    if (era.get(`talent:${arg}:62`)) {
      // :1586-1591 反感污臭
      await era.printAndWait(
        `${arg_name}因自己拉出的东西的味道而皱起眉头，羞愧欲死。`,
      ); // :1599
      await era.print(`苦痛点数+${mon_num * 10}`); // :296
      era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    }

    await era.print(`耻情点数+${mon_num * 10}`); // :364
    await era.print(`屈服点数+${mon_num * 10}`); // :371
    await era.print('自慰经验+1'); // :1606
    await era.print('调教自慰经验+1'); // :1607
    era.add(`juel:${arg}:8`, mon_num * 10); // :337 JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // :341 JUEL:ARG:6 屈服
    chara(arg).dungeon.自慰经验 += 1; // :1599 EXP:ARG:10 自慰经验
    chara(arg).dungeon.调教自慰经验 += 1; // :1600 EXP:ARG:11 调教自慰经验
  } else if (rand_n(2) === 0) {
    // :1601-1623 舔肛
    await era.printAndWait('『那个冒险者大人，在舔我的肛门哦！』'); // :1613
    await era.printAndWait(
      `${arg_name}以舔肛门为代价，获得了魔族男人对于生命安全的保证。`,
    ); // :1614
    await era.printAndWait('『你的尊严，真不值钱呢！』'); // :1615
    await era.printAndWait(
      `${arg_name}拼命地侍奉着，听到这话，心里想死的心都有了，泪水在眼眶中打转。`,
    ); // :1616
    await era.printAndWait(
      `侍奉结束之后，${arg_name}还被迫要说出淫秽的话语。${she(arg)}忍无可忍地大哭着，宣布自己喜欢舔肛。`,
    ); // :1617

    if (era.get(`talent:${arg}:17`)) {
      // :1608-1612 低姿态
      await era.printAndWait(
        `自尊心低下的${arg_name}，拼命地说着自己是舔肛用奴隶。`,
      ); // :1621
      // :1611 Y += 10 —— 死代码（Y 全库无初始化与读取，见文件头）
    }
    if (era.get(`talent:${arg}:62`)) {
      // :1614-1618 反感污臭
      await era.printAndWait(`${arg_name}因为舔肛而恶心地吐了。`); // :1627
      // :1617 Y += 10 —— 死代码（同上）
    }

    await era.print(`苦痛点数+${mon_num * 10}`); // :296
    await era.print(`恐怖点数+${mon_num * 10}`); // :359
    era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
  } else {
    // :1624-1653 娼妓
    await era.printAndWait('『这个为了保命就来者不拒的妓女！』'); // :1636
    await era.printAndWait(
      `${arg_name}屁股翘起，用屈辱的姿势承受着不知多少个魔族男人的肉棒。沐浴在他们的精液和骂声之中。`,
    ); // :1637
    await era.printAndWait(
      '『说！说我是个相对于做冒险者，更喜欢做妓女的淫乱贱婊！』',
    ); // :1638
    await era.printAndWait(
      `${arg_name}在激烈的抽插中，不断地重复着屈辱的台词。`,
    ); // :1639

    if (era.get(`talent:${arg}:17`)) {
      // :1630-1635 低姿态
      await era.printAndWait(
        `${arg_name}拼命地重复着淫乱的话语乞求饶命，美丽的脸庞在恐惧和淫媚中扭曲了……`,
      ); // :1643
      await era.print(`屈服点数+${mon_num * 10}`); // :371
      era.add(`juel:${arg}:6`, mon_num * 10); // :341 JUEL:ARG:6 屈服
    }
    if ((era.get(`abl:${arg}:21`) || 0) > 0) {
      // :1637-1642 抖M气质
      await era.printAndWait(`说着过激的言语，${arg_name}的心里产生了情欲。`); // :1650
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    }

    await era.print(`私处经验+${mon_num}`); // :646
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`精液经验+${mon_num}`); // :270
    chara(arg).dungeon.私处经验 += mon_num; // :1656 EXP:ARG:0 私处经验
    chara(arg).dungeon.肛门经验 += mon_num; // :1657 EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // :1658 EXP:ARG:20 精液经验
  }
  await era.waitAnyKey(); // :1651 WAIT
  return 0; // :1652
}

// @GIRL_RYOU(ARG) // :1666（源 :1666-2046）
/**
 * 女魔族凌辱（女性对象；兼男性对象的防御分支）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列女魔族数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function girl_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // :1670-1672 SIF NO:ARG == 0 → RETURN 0（角色 0 = 魔王不可被凌辱）
  // :1670-1672 SIF NO:ARG == 0 → RETURN 0（NO = 角色 ID，ere 侧直接判 arg）
  if (arg === 0) {
    return 0;
  }

  // :1673-1779 男人の場合（TALENT:122）——结构保留（分派已按 TALENT:122
  // 分流到 H14，此分支对女性对象不可达）
  if (era.get(`talent:${arg}:122`)) {
    if (era.get(`talent:${arg}:100`)) {
      // :1676-1684 娇小
      if (rand_n(3) === 0) {
        await era.printAndWait('『嘻嘻，真是好孩子呢』'); // :1676
      } else if (rand_n(2) === 0) {
        await era.printAndWait('『让姐姐来教你一些好事！』'); // :1678
      } else {
        await era.printAndWait('『哎呀？勃起了么？』'); // :1680
      }
    } else {
      await era.printAndWait('『可悲的人呢，勃起了么？』'); // :1683
    }

    if (mon_num === 1) {
      // :1691-1727 一人
      await era.printAndWait('『独占你了！难道这是第一次？』'); // :1690
      await era.printAndWait(`${arg_name}被魔界的女人口交着，`); // :1691
      await era.print(`紫色的长舌头，在${arg_name}的`); // :1692
      const p318 = era.get(`talent:${arg}:318`) || 0; // :1694 阴茎分档
      if (p318 === 1) {
        await era.print('巨根'); // :1694
      } else if (p318 === 2) {
        await era.print('短小包茎'); // :1696
      } else if (p318 === 3) {
        await era.print('包茎'); // :1698
      } else if (p318 === 4) {
        await era.print('马阴茎'); // :1701 自然発生はしない
      } else {
        await era.print('阴茎'); // :1704 0もしくはイレギュラー
      }
      await era.printAndWait('上舔舐着，吸取着精气。'); // :1706
      if (p318 === 1) {
        await era.printAndWait('『好大，下巴都要脱落了♪』'); // :1708
      } else if (p318 === 2) {
        await era.printAndWait('『冒险者大人的这里，像小孩子一样♪』'); // :1710
      } else if (p318 === 3) {
        await era.printAndWait('『让我帮你把包皮里的污垢弄干净吧』'); // :1712
      } else if (p318 === 4) {
        await era.printAndWait('『呵呵，被谁改造的？』'); // :1715
      } else {
        await era.printAndWait('『加油哦！不要一下子就射了哦♪』'); // :1718
      }
      await era.print(`耻情点数+${mon_num * 10}`); // :364
      await era.print(`屈服点数+${mon_num * 10}`); // :371
      await era.print(`绝顶经验+${mon_num}`); // :1722
      await era.print(`射精经验+${mon_num}`); // :1723
      era.add(`juel:${arg}:8`, mon_num * 10); // :337 JUEL:ARG:8 耻情
      era.add(`juel:${arg}:6`, mon_num * 10); // :341 JUEL:ARG:6 屈服
      chara(arg).dungeon.绝顶经验 += mon_num; // :1725 EXP:ARG:2 绝顶经验
      chara(arg).train.射精经验 += mon_num; // :1726 EXP:ARG:3 射精经验
    } else if (rand_n(3) === 0) {
      // :1728-1762 多人口交
      await era.printAndWait(
        '『大家一起来帮他含，一下就射的话，就要好好处罚你喔！』',
      ); // :1731
      await era.printAndWait(`${arg_name}被魔界的女人口交着，`); // :1691
      await era.print(`紫色的长舌头，在${arg_name}的`); // :1692
      const p318b = era.get(`talent:${arg}:318`) || 0; // :1735 阴茎分档
      if (p318b === 1) {
        await era.print('巨根'); // :1735
      } else if (p318b === 2) {
        await era.print('短小包茎'); // :1696
      } else if (p318b === 3) {
        await era.print('包茎'); // :1739
      } else if (p318b === 4) {
        await era.print('马阴茎'); // :1742 自然発生はしない
      } else {
        await era.print('阴茎'); // :1745 0もしくはイレギュラー
      }
      await era.printAndWait('上舔舐着，吸取着精气。'); // :1706
      if (p318b === 1) {
        await era.printAndWait('『好大，下巴都要脱落了♪』'); // :1708
      } else if (p318b === 2) {
        await era.printAndWait('『冒险者大人的这里，小孩子一样♪』'); // :1751
      } else if (p318b === 3) {
        await era.printAndWait('『让我帮你把包皮里的污垢弄干净吧』'); // :1712
      } else if (p318b === 4) {
        await era.printAndWait('『呵呵，被谁改造的？』'); // :1715
      } else {
        await era.printAndWait('『加油哦！不要一下子就射了哦♪』'); // :1718
      }
      await era.print(`耻情点数+${mon_num * 10}`); // :364
      await era.print(`屈服点数+${mon_num * 10}`); // :371
      await era.print(`绝顶经验+${mon_num}`); // :1722
      await era.print(`射精经验+${mon_num}`); // :1723
      era.add(`juel:${arg}:8`, mon_num * 10); // :337 JUEL:ARG:8 耻情
      era.add(`juel:${arg}:6`, mon_num * 10); // :341 JUEL:ARG:6 屈服
      chara(arg).dungeon.绝顶经验 += mon_num; // :1762 EXP:ARG:2 绝顶经验
      chara(arg).train.射精经验 += mon_num; // :1763 EXP:ARG:3 射精经验
    } else if (rand_n(2) === 0) {
      // :1764-1790 跨坐
      await era.printAndWait(
        '『让魔界的女人来教你什么才是女人的滋味……试过一次你就不会再想和你的同胞做的了。』',
      ); // :1773
      await era.printAndWait(`${arg_name}被魔界的女性跨坐在身上，吸取着精气。`); // :1774
      const p318c = era.get(`talent:${arg}:318`) || 0;
      if (p318c === 1) {
        await era.printAndWait('『哎呀，好大♪』'); // :1778 巨根
      } else if (p318c === 2) {
        await era.printAndWait('『小的都不知道你进来了没有……♪』'); // :1781 短小包茎
      } else if (p318c === 4) {
        await era.printAndWait('『好，好厉害……好大，好棒』'); // :1784 馬ペニス
      } else {
        await era.printAndWait('『加油哦！不要一下子就射了哦♪』'); // :1718 普通・包茎
      }
      await era.print(`耻情点数+${mon_num * 15}`); // :1790
      await era.print(`屈服点数+${mon_num * 15}`); // :1791
      await era.print(`性交经验+${mon_num}`); // :1792
      await era.print(`绝顶经验+${mon_num}`); // :1722
      await era.print(`射精经验+${mon_num}`); // :1723
      era.add(`juel:${arg}:8`, mon_num * 15); // :337 JUEL:ARG:8 耻情
      era.add(`juel:${arg}:6`, mon_num * 15); // :341 JUEL:ARG:6 屈服
      chara(arg).dungeon.性交经验 += mon_num; // :1785 EXP:ARG:5 性交经验
      chara(arg).dungeon.绝顶经验 += mon_num; // :1786 EXP:ARG:2 绝顶经验
      chara(arg).train.射精经验 += mon_num; // :1787 EXP:ARG:3 射精经验
    } else {
      // :1788-1814 喂奶
      await era.printAndWait('『胸部，味道好吗？舔个没完呢～』'); // :1803
      await era.printAndWait(`${arg_name}被魔界的女性一边喂奶，一边被撸着。`); // :1804
      await era.print(`紫色的手，温柔地在${arg_name}的`); // :1805
      const p318d = era.get(`talent:${arg}:318`) || 0; // :1809 阴茎分档
      if (p318d === 1) {
        await era.print('巨根'); // :1807
      } else if (p318d === 2) {
        await era.print('短小包茎'); // :1696
      } else if (p318d === 3) {
        await era.print('包茎'); // :1811
      } else if (p318d === 4) {
        await era.print('马阴茎'); // :1814 自然発生はしない
      } else {
        await era.print('阴茎'); // :1817 0もしくはイレギュラー
      }
      await era.printAndWait('上爱抚着。'); // :1819
      if (p318d === 1) {
        await era.printAndWait('『好大啊……来享受快乐吧♪』'); // :1821
      } else if (p318d === 2) {
        await era.printAndWait('『带皮的短小鸡鸡♪变得黏糊糊的～』'); // :1823
      } else if (p318d === 3) {
        await era.printAndWait('『帮你剥皮除垢哦～』'); // :1825
      } else if (p318d === 4) {
        await era.printAndWait('『呵呵，被谁改造的？』'); // :1715
      } else {
        await era.printAndWait('『加油哦！不要一下子就射了哦♪』'); // :1718
      }
      await era.print(`耻情点数+${mon_num * 5}`); // :1834
      await era.print(`屈服点数+${mon_num * 15}`); // :1791
      await era.print(`绝顶经验+${mon_num}`); // :1722
      await era.print(`射精经验+${mon_num}`); // :1723
      era.add(`juel:${arg}:8`, mon_num * 5); // :337 JUEL:ARG:8 耻情
      era.add(`juel:${arg}:6`, mon_num * 15); // :341 JUEL:ARG:6 屈服
      chara(arg).dungeon.绝顶经验 += mon_num; // :1822 EXP:ARG:2 绝顶经验
      chara(arg).train.射精经验 += mon_num; // :1823 EXP:ARG:3 射精经验
    }

    await era.waitAnyKey(); // :1826 WAIT
    return 0; // :1827
  }

  // —— 女性对象主流程 ——

  // :1830-1859 畏怖阶段口上（PRINTDATAW 三档；含 %UNICODE(0x2661) *1% 心形）
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
    ); // :1852-1856 隷属状態
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
    ); // :1861-1866 強畏怖状態
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
    ); // :1870-1877 初见
  }

  // :1862 MON_NUM = E:(B + 99)（参数注入）

  // :1864-1890 处女封印
  if (era.get(`talent:${arg}:273`)) {
    if (rand_n(2) === 0) {
      if (rand_n(2) === 0) {
        await era.printAndWait(
          '『真是较真。这样的孩子反而容易觉醒后面的快感呢～』',
        ); // :1887
      } else {
        await era.print('『这边的穴'); // :1889
        if (rand_n(2) === 0) {
          await era.print('才有的'); // :1872
        } else {
          await era.print('也有的'); // :1874
        }
        await era.printAndWait('个中滋味 好好感・受・吧』'); // :1895
      }
      await era.printAndWait(
        `${arg_name}的纯洁被神圣力量保护着，不过没能防住肛门。`,
      ); // :1898
      if (rand_n(2) === 0) {
        await era.printAndWait('『放松一些。以后还会经常被这么玩的啦～』'); // :1900
      } else {
        await era.printAndWait('『舒服的话就好好发出声音来才好哦？』'); // :1902
      }
      await era.printAndWait(
        `${arg_name}肛门里的皱褶，被魔族女性仔细地舔舐着。`,
      ); // :1904
    } else {
      // :1883-1885 空分支（原作 ELSE 无内容）
    }

    if ((era.get(`abl:${arg}:22`) || 0) > 0 || era.get(`talent:${arg}:81`)) {
      // :1887-1891 百合气质・双性恋
      await era.printAndWait(`${arg_name}感到心中有什么在蠢动着。`); // :1910
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    }

    await era.print(`肛门经验+${mon_num * 5}`); // :1915
    chara(arg).dungeon.肛门经验 += mon_num * 5; // :1894 EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // :1896 WAIT
    return 0; // :1900
  }

  if (mon_num === 1) {
    // :1899-1915 单只女魔族
    // :1900-1905 原作 IF RAND:3 == 0 / ELSEIF RAND:3 == 0 是重复条件
    // （第二臂恒不达——死代码，#14 登记）；文本保留、结构并成单条件
    if (rand_n(3) === 0) {
      await era.print('『弄得好的话就好好奖励你』'); // :1923
      await era.print('『那样子弄，完全不舒服嘛』'); // :1925（原作第二臂，恒不达）
    } else {
      await era.print('『再好好努力哦』'); // :1927
    }
    await era.print(`${arg_name}被强迫着舔舐魔族女人的阴部。`); // :1929
    await era.print('她像狗一样的趴在地上，拼命地侍奉着自己的女主人。'); // :1930

    if ((era.get(`abl:${arg}:22`) || 0) > 0 || era.get(`talent:${arg}:81`)) {
      // :1910-1914 百合气质・双性恋
      await era.printAndWait(`${arg_name}感到心中有什么在蠢动着。`); // :1910
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    }

    await era.print('百合经验+1'); // :1939
    chara(arg).train.百合经验 += 1; // :1917 EXP:ARG:40 百合经验
    await era.waitAnyKey(); // :1919 WAIT
    return 0; // :1920
  }

  if (rand_n(5) === 0) {
    // :1922-1931 舔舐奴隶
    await era.printAndWait('『你的新职业就是舔舐奴隶了哦！原冒险者大人♪』'); // :1946
    await era.printAndWait(
      `${arg_name}全裸着像狗一样地侍奉着魔族女性，把全部${mon_num}人都舔满足的话，就饶${she(arg)}一命。`,
    ); // :1947

    if ((era.get(`abl:${arg}:22`) || 0) > 0 || era.get(`talent:${arg}:81`)) {
      // :1926-1930 百合气质・双性恋
      await era.printAndWait(`${arg_name}感到心中有什么在蠢动着。`); // :1910
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    }

    await era.print(`百合经验+${mon_num}`); // :1956
    chara(arg).train.百合经验 += mon_num; // :1933 EXP:ARG:40 百合经验
  } else if (rand_n(4) === 0) {
    // :1934-1949 乱交派对
    await era.printAndWait('『哎呀，这么粗的也没问题吗？』'); // :1959
    await era.printAndWait(
      `${arg_name}成为了魔族女人们的玩具，私处和肛门被插入了粗大的假阳具。`,
    ); // :1960
    await era.printAndWait('空闲的嘴巴也被强行要求舔舐，爱液喷到了脸上。'); // :1961
    await era.printAndWait(
      `不知不觉间，大家都兴奋了，就在外头，以${arg_name}为中心开始了乱交派对。`,
    ); // :1962
    await era.printAndWait(
      `${arg_name}和${mon_num}个魔族女孩肉体碰撞着，相互在对方身上贪求着快乐，爱液汇聚成了一小水潭。`,
    ); // :1963

    if ((era.get(`abl:${arg}:22`) || 0) > 0 || era.get(`talent:${arg}:81`)) {
      // :1941-1945 百合气质・双性恋
      await era.printAndWait(`${arg_name}感到心中有什么在蠢动着。`); // :1910
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    }

    await era.print(`私处经验+${mon_num}`); // :646
    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`百合经验+${mon_num}`); // :1956
    chara(arg).dungeon.私处经验 += mon_num; // :1950 EXP:ARG:0 私处经验
    chara(arg).dungeon.肛门经验 += mon_num; // :1951 EXP:ARG:1 肛门经验
    chara(arg).train.百合经验 += mon_num; // :1952 EXP:ARG:40 百合经验
  } else if (rand_n(3) === 0) {
    // :1953-1969 喝尿
    await era.printAndWait('『想尿尿了呢～』'); // :1979
    await era.printAndWait(`${arg_name}有讨厌的预感。`); // :1980
    await era.printAndWait(
      '『对了，要把我的尿喝光哦！不然不会放过你的。要是洒出来了，从今往后就把你当成女子便器了哦♪』',
    ); // :1981
    await era.printAndWait(
      `${arg_name}的嘴巴被魔族女性压在阴部处，对着脸撒起尿来。`,
    ); // :1982
    await era.printAndWait('尿液无情地从嘴里不断灌入……'); // :1983
    await era.printAndWait(
      `魔族女人们，看着一边哭泣一边喝尿的${arg_name}笑了。不断用侮辱的语言刺激着${she(arg)}。`,
    ); // :1984

    if ((era.get(`abl:${arg}:22`) || 0) > 0 || era.get(`talent:${arg}:81`)) {
      // :1961-1965 百合气质・双性恋
      await era.printAndWait(`${arg_name}感到心中有什么在蠢动着。`); // :1910
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    }

    await era.print(`耻情点数+${mon_num * 10}`); // :364
    await era.print(`屈服点数+${mon_num * 10}`); // :371
    await era.print(`百合经验+${mon_num}`); // :1956
    chara(arg).train.百合经验 += mon_num; // :1970 EXP:ARG:40 百合经验
    era.add(`juel:${arg}:8`, mon_num * 10); // :337 JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // :341 JUEL:ARG:6 屈服
  } else if (rand_n(2) === 0) {
    // :1973-1990 当众自慰
    await era.printAndWait('『快点，在大家面前自慰哦！』'); // :2000
    await era.printAndWait(`${arg_name}在众目睽睽之下被迫自慰着。`); // :2001
    await era.printAndWait(
      '『这样的自慰可是女人的专利哦。从今往后就当百合奴隶吧，原冒险者大人♪』',
    ); // :2002
    await era.printAndWait(
      `${arg_name}的周围，魔族女孩们正以奇妙的方式交合着。`,
    ); // :2003
    await era.printAndWait(
      `在${she(arg)}感觉自己性癖都在扭曲的时候，魔族女孩们高潮了。`,
    ); // :2004

    if ((era.get(`abl:${arg}:22`) || 0) > 0 || era.get(`talent:${arg}:81`)) {
      // :1980-1984 百合气质・双性恋
      await era.printAndWait(`${arg_name}感到心中有什么在蠢动着。`); // :1910
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    }

    await era.print(`耻情点数+${mon_num * 10}`); // :364
    await era.print(`屈服点数+${mon_num * 10}`); // :371
    await era.print('自慰经验+1'); // :1606
    await era.print('调教自慰经验+1'); // :1607
    await era.print('绝顶经验+1'); // :2017
    await era.print(`百合经验+${mon_num}`); // :1956
    chara(arg).train.百合经验 += mon_num; // :1996 EXP:ARG:40 百合经验
    era.add(`juel:${arg}:8`, mon_num * 10); // :337 JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // :341 JUEL:ARG:6 屈服
    chara(arg).dungeon.自慰经验 += 1; // :1995 EXP:ARG:10 自慰经验
    chara(arg).dungeon.调教自慰经验 += 1; // :1996 EXP:ARG:11 调教自慰经验
    chara(arg).dungeon.绝顶经验 += 1; // :1997 EXP:ARG:2 绝顶经验
  } else {
    // :1998-2011 女人强奸女人
    await era.printAndWait('『也想强奸一次女人呢～♪』'); // :2026
    await era.printAndWait(
      `${arg_name}的屁股被抬高，以屈辱的姿态，迎接着身后假阳具的激烈抽插。`,
    ); // :2027
    await era.printAndWait('『哈哈～好姐妹啊～被女人侵犯，兴奋起来了吗？』'); // :2028
    await era.printAndWait(
      `${arg_name}被女人侵犯着，在这异常的性爱中，心里有什么萌芽了。`,
    ); // :2029

    if ((era.get(`abl:${arg}:22`) || 0) > 0 || era.get(`talent:${arg}:81`)) {
      // :2004-2008 百合气质・双性恋
      await era.printAndWait(`${arg_name}为心中萌发的感情而感到兴奋……`); // :2033
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    }

    await era.print(`私处经验+${mon_num}`); // :646
    chara(arg).dungeon.私处经验 += mon_num; // :2011 EXP:ARG:0 私处经验
    await era.print(`百合经验+${mon_num}`); // :1956
    chara(arg).train.百合经验 += mon_num; // :2013 EXP:ARG:40 百合经验
  }
  await era.waitAnyKey(); // :2015 WAIT
  return 0; // :2016
}

// @BEAST_RYOU(ARG) // :2047（源 :2047-2153）
/**
 * 魔兽凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列魔兽数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function beast_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // :2051-2055 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.waitAnyKey(); // :2053 WAIT
    return 0; // :2054
  }

  // :2057-2085 畏怖阶段口上（PRINTDATAW 三档）
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
    ); // :2060-2064 隷属状態
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
    ); // :2070-2075 強畏怖状態
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
    ); // :2079-2083 初见
  }

  // :2087 MON_NUM = E:(B + 99)（参数注入）

  // :2089-2105 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait('『噢！』'); // :2091
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量守卫着，魔兽转而寻找其它洞穴。`,
    ); // :2092
    await era.printAndWait('「啊！呜！不要啊……啊啊啊！」'); // :2093
    await era.printAndWait(`${arg_name}的肛门被野兽的阴茎蹂躏了……`); // :2094

    if ((era.get(`talent:${arg}:314`) || 0) === 2) {
      // :2096-2100 人狼
      await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和野兽做爱……`); // :2098
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    }

    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`精液经验+${mon_num}`); // :270
    await era.printAndWait(`兽奸经验+${mon_num}`); // :2105
    chara(arg).dungeon.肛门经验 += mon_num; // :2105 EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // :2106 EXP:ARG:20 精液经验
    chara(arg).dungeon.兽奸经验 += mon_num; // :2107 EXP:ARG:56 兽奸经验
    await era.waitAnyKey(); // :2109 WAIT
    return 0; // :2110
  }

  if (mon_num === 1) {
    // :2112-2126 单只魔兽
    await era.printAndWait('野兽压在冒险者的身上。'); // :2114
    await era.printAndWait(`${arg_name}的私处被野兽野蛮地侵犯了，高声尖叫着。`); // :2115
    await era.printAndWait(`不一会儿，野兽在${she(arg)}体内射出了精液……`); // :2116

    if ((era.get(`talent:${arg}:314`) || 0) === 2) {
      // :2117-2121 人狼
      await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和野兽做爱……`); // :2098
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    }

    await era.printAndWait('私处经验+1'); // :2125
    chara(arg).dungeon.私处经验 += 1; // :2126 EXP:ARG:0 私处经验
    await era.printAndWait('兽奸经验+1'); // :2127
    chara(arg).dungeon.兽奸经验 += 1; // :2129 EXP:ARG:56 兽奸经验
    await era.waitAnyKey(); // :2128 WAIT
    return 0; // :2129
  }

  // :2131-2149 轮奸
  await era.printAndWait('野兽们，开始轮番兽奸冒险者。'); // :2133
  await era.printAndWait(
    `${arg_name}无法面对自己被野兽轮奸的事实，保持着母狗的姿态，呆若木鸡……`,
  ); // :2134

  if ((era.get(`talent:${arg}:314`) || 0) === 2) {
    // :2135-2139 人狼
    await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和野兽做爱……`); // :2098
    await era.print(`欲情点数+${mon_num * 10}`); // :585
    era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
  }

  await era.print(`苦痛点数+${mon_num * 10}`); // :296
  await era.print(`恐怖点数+${mon_num * 10}`); // :359
  await era.print(`私处经验+${mon_num}`); // :646
  chara(arg).dungeon.私处经验 += mon_num; // :2144 EXP:ARG:0 私处经验
  era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
  era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
  await era.printAndWait(`兽奸经验+${mon_num}`); // :2105
  chara(arg).dungeon.兽奸经验 += mon_num; // :2148 EXP:ARG:56 兽奸经验
  return 0; // :2149
}

// @BRAIN_RYOU(ARG) // :2154（源 :2154-2236）
/**
 * 食脑魔凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列食脑魔数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function brain_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // :2158-2162 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.waitAnyKey(); // :2160 WAIT
    return 0; // :2161
  }

  // :2163-2191 畏怖阶段口上（PRINTDATAW 三档）
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
    ); // :2166-2170 隷属状態
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
    ); // :2176-2180 強畏怖状態
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
    ); // :2184-2188 初见
  }

  // :2193 MON_NUM = E:(B + 99)（参数注入）

  // :2195-2206 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait(`食脑魔咬住冒险者的头，开始支配${she(arg)}的精神。`); // :2196
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量保护着，不过食脑魔对这些事完全没兴趣。`,
    ); // :2197
    await era.printAndWait('「啊…啊…啊…啊…啊……」'); // :2198
    await era.printAndWait(`${arg_name}眼珠上翻，伸出舌头，脱粪了。`); // :2199
    await era.print(`肛门经验+${mon_num * 10}`); // :2200
    chara(arg).dungeon.肛门经验 += mon_num * 10; // :2202 EXP:ARG:1 肛门经验
    await era.waitAnyKey(); // :2204 WAIT
    return 0; // :2205
  }

  if (mon_num === 1) {
    // :2207-2217 单只食脑魔（致死）
    await era.print('「啊…啊…啊……呜，喔！……啊……」'); // :2208
    await era.print(
      `${arg_name}的头盖骨被食脑魔用坚硬的触手贯通了，开始直接吸啜脑髓。`,
    ); // :2209
    await era.print(`${she(arg)}的四肢狂乱地挥动，失禁，死掉了……`); // :2210
    chara(arg).dungeon.体力 = 0; // :2211 BASE:ARG:0 = 0
    await era.print('异常经验+1'); // :1331
    chara(arg).dungeon.异常经验 += 1; // :2213 EXP:ARG:50 异常经验
    await era.waitAnyKey(); // :2215 WAIT
    return 0; // :2216
  }

  if (rand_n(40) === 0) {
    // :2218-2226 低概率致死
    await era.print('「啊…啊…啊……呜，喔！……啊……」'); // :2208
    await era.print(
      `${arg_name}的头盖骨被食脑魔用坚硬的触手贯通了，开始直接吸啜脑髓。`,
    ); // :2220
    await era.print(`${she(arg)}的四肢狂乱地挥动，失禁，死掉了……`); // :2210
    chara(arg).dungeon.体力 = 0; // :2222 BASE:ARG:0 = 0
    await era.print('异常经验+1'); // :1331
    chara(arg).dungeon.异常经验 += 1; // :2224 EXP:ARG:50 异常经验
  } else {
    // :2227-2234 媚药触手
    await era.printAndWait(
      `食脑魔的触手缠绕着冒险者，${she(arg)}死命地挣扎，却无法挣脱。`,
    ); // :2226
    await era.printAndWait(
      `食脑魔的触手，直接突入到${arg_name}的脑子里，往脑髓注入媚药成分。`,
    ); // :2227
    await era.printAndWait(`${arg_name}被过度的快感弄失禁了，成了废人。`); // :2228
    await era.printAndWait('幸好，躯干还是完好的。'); // :2229
    await era.print('异常经验+1'); // :1331
    chara(arg).dungeon.异常经验 += 1; // :2233 EXP:ARG:50 异常经验
  }
  await era.waitAnyKey(); // :2235 WAIT
  return 0; // :2236
}

// @HORSE_RYOU(ARG) // :2237（源 :2237-2343）
/**
 * 马凌辱（女性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列马数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function horse_ryou(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  // :2241-2245 男人の場合（TALENT:122）——结构保留
  if (era.get(`talent:${arg}:122`)) {
    await era.waitAnyKey(); // :2243 WAIT
    return 0; // :2244
  }

  // :2247-2275 畏怖阶段口上（PRINTDATAW 三档）
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
    ); // :2250-2254 隷属状態
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
    ); // :2260-2264 強畏怖状態
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
    ); // :2268-2272 初见
  }

  // :2277 MON_NUM = E:(B + 99)（参数注入）

  // :2279-2297 处女封印
  if (era.get(`talent:${arg}:273`)) {
    await era.printAndWait(
      '养马人给马的阴茎施加了缩小的魔法，让它变小至适应肛门的大小。',
    ); // :2280
    await era.printAndWait(
      `${arg_name}的纯洁被神圣力量保护着，不过没能防住肛门。`,
    ); // :2281
    await era.printAndWait(
      '『你很有素质嘛～看在这个份上，就用魔法让你好受些。』',
    ); // :2282
    await era.printAndWait(`${arg_name}不得不用肛门承受着兽奸……`); // :2283

    if ((era.get(`talent:${arg}:314`) || 0) === 2) {
      // :2286-2290 人狼
      await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和马做爱……`); // :2287
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    }

    await era.print(`肛门经验+${mon_num}`); // :269
    await era.print(`精液经验+${mon_num}`); // :270
    await era.printAndWait(`兽奸经验+${mon_num}`); // :2105
    chara(arg).dungeon.肛门经验 += mon_num; // :2295 EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // :2296 EXP:ARG:20 精液经验
    chara(arg).dungeon.兽奸经验 += mon_num; // :2297 EXP:ARG:56 兽奸经验
    await era.waitAnyKey(); // :2299 WAIT
    return 0; // :2300
  }

  if (mon_num === 1) {
    // :2302-2317 单匹马
    await era.printAndWait('马压在冒险者的身上。'); // :2303
    await era.printAndWait(`${arg_name}的私处被马野蛮地侵犯了，高声尖叫着。`); // :2304
    await era.printAndWait(`不一会儿，马在${she(arg)}体内射出了精液……`); // :2305

    if ((era.get(`talent:${arg}:314`) || 0) === 2) {
      // :2307-2311 人狼
      await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和马做爱……`); // :2287
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
    }

    await era.printAndWait('私处经验+1'); // :2314
    chara(arg).dungeon.私处经验 += 1; // :2314 EXP:ARG:0 私处经验
    await era.printAndWait('兽奸经验+1'); // :2127
    chara(arg).dungeon.兽奸经验 += 1; // :2316 EXP:ARG:56 兽奸经验
    return 0; // :2317
  }

  // :2319-2339 轮奸
  await era.printAndWait('好几匹马，开始轮番兽奸冒险者。'); // :2321
  await era.printAndWait(
    `${arg_name}无法面对自己被马轮奸的事实，保持着母狗的姿态，呆若木鸡……`,
  ); // :2322

  if ((era.get(`talent:${arg}:314`) || 0) === 2) {
    // :2323-2327 人狼
    await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和马做爱……`); // :2287
    await era.print(`欲情点数+${mon_num * 10}`); // :585
    era.add(`juel:${arg}:5`, mon_num * 10); // :586 JUEL:ARG:5 欲情
  }

  await era.print(`苦痛点数+${mon_num * 10}`); // :296
  await era.print(`恐怖点数+${mon_num * 10}`); // :359
  await era.print(`私处经验+${mon_num}`); // :646
  chara(arg).dungeon.私处经验 += mon_num; // :2332 EXP:ARG:0 私处经验
  era.add(`juel:${arg}:9`, mon_num * 10); // :297 JUEL:ARG:9 苦痛
  era.add(`juel:${arg}:10`, mon_num * 10); // :360 JUEL:ARG:10 恐怖
  await era.printAndWait(`兽奸经验+${mon_num}`); // :2105
  chara(arg).dungeon.兽奸经验 += mon_num; // :2336 EXP:ARG:56 兽奸经验
  return 0; // :2337
}

// @PC_RYOU, ARG:0, ARG:1 // :2344（源 :2344-2770）
/**
 * PC 被凌辱的演出（对人格斗败北时，DUNGEON_BATLLE2.ERB 调用）。
 *
 * ARG:0 = 魔王側（胜者）、ARG:1 = 勇者側（败者）。流程：旁观/不要选择 →
 * 武器检查（W:0 = 魔王武装存储编号；素手时装剑 40，CALL EQUIP_DATABASE）→
 * 按武器识别号（W:1）分四大支：49 触手 / 50 圣剑？→ 默认（魔界武器）→
 * 三连 REPEAT 随机凌辱 → 收尾百合判定。
 *
 * @param {number} arg0 魔王側角色号（原作 ARG:0）
 * @param {number} arg1 勇者側角色号（原作 ARG:1）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function pc_ryou(arg0, arg1, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const winner_name = arg_name_of(arg0); // %SAVESTR:(ARG:0)%
  const loser_name = arg_name_of(arg1); // %SAVESTR:(ARG:1)%
  // MON_NUM：本函数无 E 表读取（原作 #DIM 但未赋值——CALL MONSTER_DATA
  // 在 :2464 是死调用，不产生 MON_NUM 写入，见文件头）。所有 {MON_NUM}
  // 显示插值原作即为 0（JS 侧 mon_num 参数缺省 0，行为一致）。
  const mon_num = 0;

  await era.print(''); // :2350 PRINTL
  era.drawLine(); // :2351
  await era.print(''); // :2352 PRINTL

  // :2354-2357 立绘（CALL CHA_IMG2(ARG:1)，未移植——见文件头；:2355 的
  // PRINTL 空格行并入占位注释，不单独输出）
  await era.print(''); // :2357 PRINTL

  // :2360-2366 选择循环：旁观凌辱 / 不要凌辱
  await era.print('[0] - 旁观凌辱'); // :21
  await era.print('[1] - 不要凌辱'); // :22
  for (;;) {
    const result = await era.input(); // :2364 INPUT
    if (result < 0 || result >= 2) {
      continue; // :2366/:2368 GOTO INPUT_LOOP
    }
    if (result === 1) {
      return 0; // :2370 SIF RESULT == 1 → RETURN 0
    }
    break;
  }

  // :2372-2381 武器チェック（W:0 = CFLAG:ARG:0:550 武装存储编号）
  let w = { 存储编号: chara(arg0).chara.武装 }; // :2372 W:0
  // :2373-2377 素手の場合剑を装備（W:0 <= 0 → W:0 = 40，写回 CFLAG:550）
  if (w.存储编号 <= 0) {
    w.存储编号 = 40; // :2374
    chara(arg0).chara.武装 = w.存储编号; // :2375 CFLAG:ARG:0:550
  }
  equip_database(w); // :2379 CALL EQUIP_DATABASE
  // :2380 Y = 10 —— 死代码（Y 全库无初始化与读取，见文件头）
  const weapon_id = w.识别号; // W:1

  // :2382-2446 武器分岐：49 = 触手
  if (weapon_id === 49) {
    await era.printAndWait(`${winner_name}用触手把${loser_name}绑了起来。`); // :2382

    if (era.get(`talent:${arg1}:273`)) {
      // :2385-2420 处女封印（肛门路线）
      await era.printAndWait(
        `${loser_name}的纯洁被神圣力量保护着，不过没能防住肛门。`,
      ); // :2386
      await era.printAndWait(
        `${winner_name}操纵着油腻腻的触手，开始侵犯${loser_name}的肛门……`,
      ); // :2387

      if (
        (era.get(`abl:${arg1}:22`) || 0) > 0 ||
        era.get(`talent:${arg1}:81`)
      ) {
        // :2390-2394 百合气质・双性恋
        await era.printAndWait(`${loser_name}感到心中有什么在蠢动着。`); // :1910
        await era.print(`欲情点数+${mon_num * 10}`); // :585
        era.add(`juel:${arg1}:5`, mon_num * 10); // :586 JUEL:ARG:1:5 欲情
      }

      await era.print('肛门经验+10'); // :2396
      await era.print('苦痛点数+80'); // :2397
      await era.print('恐怖点数+80'); // :2398
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('百合经验+5'); // :2400
      }
      await era.print('触手经验+1'); // :2401
      chara(arg1).dungeon.肛门经验 += 10; // :2402 EXP:ARG:1:1 肛门经验
      era.add(`juel:${arg1}:9`, 80); // :297 JUEL:ARG:1:9 苦痛
      era.add(`juel:${arg1}:10`, 80); // :360 JUEL:ARG:1:10 恐怖
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        chara(arg0).train.百合经验 += 5; // :2407 EXP:ARG:0:40 百合经验
        chara(arg1).train.百合经验 += 5; // :2408 EXP:ARG:1:40 百合经验
      }
      chara(arg1).dungeon.触手经验 += 1; // :2409 EXP:ARG:1:55 触手经验
      await era.waitAnyKey(); // :2410 WAIT
      return 0; // :2411
    }

    // :2413-2444 触手（无封印，私处路线）
    await era.printAndWait(`无法动弹的${loser_name}被吊在半空中。`); // :2414
    await era.printAndWait(
      `${winner_name}用凶恶的触手，捅入了${loser_name}的私处里……`,
    ); // :2415

    if ((era.get(`abl:${arg1}:22`) || 0) > 0 || era.get(`talent:${arg1}:81`)) {
      // :2417-2421 百合气质・双性恋
      await era.printAndWait(`${loser_name}感到心中有什么在蠢动着。`); // :1910
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg1}:5`, mon_num * 10); // :586 JUEL:ARG:1:5 欲情
    }

    await era.print('苦痛点数+80'); // :2397
    await era.print('恐怖点数+80'); // :2398
    if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
      await era.print('百合经验+1'); // :1939
    }
    if (!era.get(`talent:${arg1}:122`)) {
      await era.print('私处经验+10'); // :2429
    }
    await era.print('触手经验+1'); // :2401
    if (!era.get(`talent:${arg1}:122`)) {
      chara(arg1).dungeon.私处经验 += 10; // :2431 EXP:ARG:1:0 私处经验
    }
    if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
      chara(arg0).train.百合经验 += 1; // :2434 EXP:ARG:0:40 百合经验
      chara(arg1).train.百合经验 += 1; // :2435 EXP:ARG:1:40 百合经验
    }
    era.add(`juel:${arg1}:9`, 80); // :297 JUEL:ARG:1:9 苦痛
    era.add(`juel:${arg1}:10`, 80); // :360 JUEL:ARG:1:10 恐怖
    chara(arg1).dungeon.触手经验 += 1; // :2439 EXP:ARG:1:55 触手经验
    if (
      (era.get(`exp:${arg1}:0`) || 0) > 0 &&
      (era.get(`talent:${arg1}:0`) || 0) === 1
    ) {
      chara(arg1).chara.处女 = 0; // :2442 TALENT:ARG:1:0 = 0
      await era.print('【处女丧失】'); // :164
      // :2444-2446 初体験の相手を記録（+1 記録；NO:(ARG:0) = 角色号）
      chara(arg1).train.初体验对象 = arg0 + 1; // :2445 CFLAG:ARG:1:15 = NO:(ARG:0) + 1
      chara(arg1).train.初体验对象名 = winner_name; // :2446 CSTR:ARG:1:3
    }

    await era.waitAnyKey(); // :2448 WAIT
    return 0; // :2449
  }

  // :2452-2457 随机开场演出（RAND:5 链）
  if (rand_n(5) === 0) {
    await era.printAndWait(
      `${winner_name}看着${loser_name}，开始舔舐${she(arg1)}的身体。`,
    ); // :2454
  } else if (rand_n(4) === 0) {
    await era.printAndWait(
      `${winner_name}像对食物一样，用舌头拨弄${loser_name}。`,
    ); // :2456
  } else if (rand_n(3) === 0) {
    await era.printAndWait(`${winner_name}对${loser_name}爱抚着。`); // :2458
  } else if (rand_n(2) === 0) {
    await era.printAndWait(`${winner_name}让${loser_name}跪下。`); // :2460
  } else {
    await era.printAndWait(`${winner_name}让${loser_name}摆出母狗一样的姿势。`); // :2462
  }

  // :2463 CALL MONSTER_DATA —— 死调用（B/C 无定义读取方、RESULT 无消费，
  // 见文件头 #182 判定），注释保留不落调用。

  // :2466-2481 处女封印（假阳具肛门路线）
  if (era.get(`talent:${arg1}:273`)) {
    await era.printAndWait(
      `${loser_name}的纯洁被神圣力量保护着，不过没能堵住肛门。`,
    ); // :2471
    await era.printAndWait(
      `${winner_name}拿出假阳具，开始侵犯${loser_name}的肛门……`,
    ); // :2472

    if ((era.get(`abl:${arg1}:22`) || 0) > 0 || era.get(`talent:${arg1}:81`)) {
      // :2471-2475 百合气质・双性恋
      await era.printAndWait(`${loser_name}感到心中有什么在蠢动着。`); // :1910
      await era.print(`欲情点数+${mon_num * 10}`); // :585
      era.add(`juel:${arg1}:5`, mon_num * 10); // :586 JUEL:ARG:1:5 欲情
    }

    await era.print('肛门经验+10'); // :2396
    await era.print('苦痛点数+50'); // :2482
    await era.print('恐怖点数+50'); // :2483
    if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
      await era.print('百合经验+5'); // :2400
    }
    chara(arg1).dungeon.肛门经验 += 10; // :2482 EXP:ARG:1:1 肛门经验
    era.add(`juel:${arg1}:9`, 50); // :297 JUEL:ARG:1:9 苦痛
    era.add(`juel:${arg1}:10`, 50); // :360 JUEL:ARG:1:10 恐怖
    if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
      chara(arg0).train.百合经验 += 5; // :2487 EXP:ARG:0:40 百合经验
      chara(arg1).train.百合经验 += 5; // :2488 EXP:ARG:1:40 百合经验
    }
    await era.waitAnyKey(); // :2490 WAIT
    return 0; // :2491
  }

  // :2494-2682 三连 REPEAT 随机凌辱
  for (let loop = 0; loop < 3; loop += 1) {
    if (rand_n(7) === 0) {
      // :2497-2526 口交
      await era.printAndWait(`${winner_name}强迫${loser_name}舔${she(arg0)}，`); // :2499
      await era.printAndWait(`${loser_name}全裸地像狗一样趴跪舔舐着，`); // :2500
      await era.printAndWait(
        `对舌头的动作不满意，${winner_name}直接抓着冒险者的头，用性器摩擦${she(arg1)}的脸来取乐。`,
      ); // :2501

      if (era.get(`talent:${arg1}:11`)) {
        // :2502-2504 反抗心
        await era.printAndWait(
          `${loser_name}用反抗的目光瞪着${winner_name}，不过考虑到生命安危，还是服从了。`,
        ); // :2505
      } else if (era.get(`talent:${arg1}:17`)) {
        // :2505-2507 低姿态
        await era.printAndWait(
          `${loser_name}谦卑地用狗一样的神态舔舐着${winner_name}的下体。`,
        ); // :2508
      }
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('百合经验+1'); // :1939
        chara(arg0).train.百合经验 += 1; // :2511 EXP:ARG:0:40 百合经验
        chara(arg1).train.百合经验 += 1; // :2512 EXP:ARG:1:40 百合经验
      }
    } else if (rand_n(6) === 0 && !era.get(`talent:${arg1}:122`)) {
      // :2514-2544 巨型假阳具
      await era.printAndWait(`${winner_name}拿来小臂般粗的巨型假阳具。`); // :2516
      await era.print(`${loser_name}的`); // :2517
      if (era.get(`talent:${arg1}:122`)) {
        await era.print('后穴'); // :2519
      } else {
        await era.print('前后两穴都'); // :2521
      }
      await era.printAndWait(
        `被巨型假阳具插入了，${winner_name}用手抚摸着入口周边。`,
      ); // :2523
      await era.printAndWait(
        `被污物及爱液弄脏了的巨型假阳具，${loser_name}还被要求用舌头漂亮地清洁干净。`,
      ); // :2524

      if (era.get(`talent:${arg1}:12`)) {
        // :2525-2527 刚强
        await era.printAndWait(`${loser_name}咬牙切齿忍受着屈辱。`); // :2528
      } else if (era.get(`talent:${arg1}:26`)) {
        // :2528-2530 悲观的
        await era.printAndWait(`${loser_name}眼中含泪，不断重复着谢罪的话语。`); // :2531
      }
      if (!era.get(`talent:${arg1}:122`)) {
        await era.print('私处经验+10'); // :2429
        await era.print('肛门经验+10'); // :2396
      }
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('百合经验+1'); // :1939
        chara(arg0).train.百合经验 += 1; // :2537 EXP:ARG:0:40 百合经验
        chara(arg1).train.百合经验 += 1; // :2538 EXP:ARG:1:40 百合经验
      }
      if (!era.get(`talent:${arg1}:122`)) {
        chara(arg1).dungeon.私处经验 += 10; // :2541 EXP:ARG:1:0 私处经验
      }
      chara(arg1).dungeon.肛门经验 += 10; // :2542 EXP:ARG:1:1 肛门经验
      if (
        (era.get(`exp:${arg1}:0`) || 0) > 0 &&
        (era.get(`talent:${arg1}:0`) || 0) === 1
      ) {
        chara(arg1).chara.处女 = 0; // :2545 TALENT:ARG:1:0 = 0
        await era.print('【处女丧失】'); // :164
        chara(arg1).train.初体验对象 = 101; // :2547 CFLAG:ARG:1:15 = 101（壶虫）
      }
    } else if (rand_n(5) === 0) {
      // :2548-2600 兽人轮
      await era.printAndWait(`${winner_name}叫来了打杂的兽人们，站成一排。`); // :2550
      await era.printAndWait(`${loser_name}被下了用嘴满足全员的命令。`); // :2551
      await era.printAndWait(`然后，${loser_name}全裸地四肢着地侍奉着。`); // :2552
      if (era.get(`talent:${arg1}:121`) || era.get(`talent:${arg1}:122`)) {
        await era.printAndWait('之后，被从后侵犯了，自己的阴茎也老实地勃起。'); // :2554
      } else {
        await era.printAndWait('之后，被从后侵犯了。'); // :2556
      }
      await era.printAndWait(
        `${loser_name}承受着来自下体的刺激继续侍奉着，兽人们则毫不留情地借机辱骂着${she(arg1)}。`,
      ); // :2558
      await era.printAndWait(
        `『哈哈，${winner_name}大人，下次还有这种乐子也要叫上咱们啊！喂！再认真点！！』`,
      ); // :2559

      if (era.get(`talent:${arg1}:13`)) {
        // :2559-2561 坦率
        await era.printAndWait(
          `${loser_name}老实地遵循着命令，舔舐着兽人们肮脏的阴茎。`,
        ); // :2563
      } else if (era.get(`talent:${arg1}:62`)) {
        // :2562-2564 反感污臭
        await era.printAndWait(
          `嗅觉灵敏的${loser_name}有意无意地回避着兽人肮脏的阴茎，又被骂了。`,
        ); // :2566
      }

      await era.print('耻情点数+100'); // :2569
      await era.print('屈服点数+100'); // :2570
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('百合经验+1'); // :1939
      }
      await era.print('口交经验+10'); // :2573
      await era.print('精液经验+10'); // :2574
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('私处经验+10'); // :2429
      }
      if (!era.get(`talent:${arg1}:122`)) {
        chara(arg1).dungeon.私处经验 += 10; // :2575 EXP:ARG:1:0 私处经验
      }
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        chara(arg0).train.百合经验 += 1; // :2578 EXP:ARG:0:40 百合经验
        chara(arg1).train.百合经验 += 1; // :2579 EXP:ARG:1:40 百合经验
      }
      chara(arg1).dungeon.口交经验 += 10; // :2580 EXP:ARG:1:22 口交经验
      chara(arg1).dungeon.精液经验 += 10; // :2581 EXP:ARG:1:20 精液经验
      era.add(`juel:${arg1}:8`, 100); // :337 JUEL:ARG:1:8 耻情
      era.add(`juel:${arg1}:6`, 100); // :341 JUEL:ARG:1:6 屈服

      // :2584-2585 初吻
      if ((era.get(`cflag:${arg1}:16`) ?? 0) === -1) {
        chara(arg1).train.初吻对象 = 995; // :2585 CFLAG:ARG:1:16 = 995（怪物的阴茎）
      }
      if (
        (era.get(`exp:${arg1}:0`) || 0) > 0 &&
        (era.get(`talent:${arg1}:0`) || 0) === 1
      ) {
        chara(arg1).chara.处女 = 0; // :2588 TALENT:ARG:1:0 = 0
        await era.print('【处女丧失】'); // :164
        // :2590-2592 初体験の相手を記録（NO:(ARG:0) + 1）
        chara(arg1).train.初体验对象 = arg0 + 1; // :2591 CFLAG:ARG:1:15 = NO:(ARG:0) + 1
        chara(arg1).train.初体验对象名 = winner_name; // :2592 CSTR:ARG:1:3
      }
    } else if (rand_n(4) === 0) {
      // :2594-2622 当众自慰
      await era.printAndWait(`${winner_name}叫来了手下。`); // :2599
      if (
        era.get(`talent:${arg1}:121`) === 1 ||
        era.get(`talent:${arg1}:122`)
      ) {
        await era.printAndWait(
          `${loser_name}的肛门，被阴茎用背面座位侵犯着，自己的阴茎也老实地勃起了。`,
        ); // :2601
      } else {
        await era.printAndWait(`${loser_name}的肛门，被阴茎用背面座位侵犯着。`); // :2603
      }
      await era.printAndWait('在这种情况下，被下达了当众自慰的命令。'); // :2605

      if (era.get(`talent:${arg1}:35`)) {
        // :2602-2604 害羞
        await era.printAndWait(
          `${loser_name}面红耳赤，回避了大家的炽热视线，开始自慰了。`,
        ); // :2609
      } else if (era.get(`talent:${arg1}:60`)) {
        // :2605-2607 容易自慰
        await era.printAndWait(
          `${loser_name}没怎么抵抗就开始自慰了，拼命地反复求饶着。`,
        ); // :2612
      }

      await era.print('耻情点数+200'); // :2615
      await era.print('屈服点数+200'); // :2616
      await era.print('自慰经验+1'); // :1606
      await era.print('调教自慰经验+1'); // :1607
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('百合经验+1'); // :1939
      }
      await era.print('肛门经验+10'); // :2396
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        chara(arg0).train.百合经验 += 1; // :2617 EXP:ARG:0:40 百合经验
        chara(arg1).train.百合经验 += 1; // :2618 EXP:ARG:1:40 百合经验
      }
      chara(arg1).dungeon.肛门经验 += 10; // :2619 EXP:ARG:1:1 肛门经验
      era.add(`juel:${arg1}:8`, 200); // :337 JUEL:ARG:1:8 耻情
      era.add(`juel:${arg1}:6`, 200); // :341 JUEL:ARG:1:6 屈服
      chara(arg1).dungeon.自慰经验 += 1; // :2622 EXP:ARG:1:10 自慰经验
      chara(arg1).dungeon.调教自慰经验 += 1; // :2623 EXP:ARG:1:11 调教自慰经验
    } else if (rand_n(3) === 0) {
      // :2624-2651 头发压脸
      await era.printAndWait(`${winner_name}抓住${loser_name}的头发，`); // :2632
      if (
        era.get(`talent:${arg0}:121`) === 1 ||
        era.get(`talent:${arg0}:122`)
      ) {
        await era.printAndWait(`将${she(arg1)}的脸强行压到自己的阴茎上。`); // :2634
      } else {
        await era.printAndWait(`将${she(arg1)}的脸强行压到自己的阴部上。`); // :2636
      }

      if (era.get(`talent:${arg1}:11`)) {
        // :2631-2633 反抗心
        await era.printAndWait(
          `${loser_name}用反抗的目光瞪着${winner_name}，不过考虑到生命安危，还是服从了。`,
        ); // :2641
      } else if (era.get(`talent:${arg1}:17`)) {
        // :2634-2642 低姿态
        await era.print(
          `${loser_name}谦卑地用狗一样的神态舔舐着${winner_name}的`,
        ); // :2644
        if (
          era.get(`talent:${arg0}:121`) === 1 ||
          era.get(`talent:${arg0}:122`)
        ) {
          await era.print('阴茎'); // :2646
        } else {
          await era.print('私处'); // :2648
        }
        await era.printAndWait('。'); // :2650
      }

      await era.print('耻情点数+150'); // :2653
      await era.print('屈服点数+150'); // :2654
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('百合经验+1'); // :1939
      }

      if (
        era.get(`talent:${arg0}:121`) === 1 ||
        era.get(`talent:${arg0}:122`)
      ) {
        await era.print('口交经验+10'); // :2573
        await era.print('精液经验+10'); // :2574
        chara(arg1).dungeon.口交经验 += 10; // :2653 EXP:ARG:1:22 口交经验
        chara(arg1).dungeon.精液经验 += 10; // :2654 EXP:ARG:1:20 精液经验
      }
      era.add(`juel:${arg1}:8`, 150); // :337 JUEL:ARG:1:8 耻情
      era.add(`juel:${arg1}:6`, 150); // :341 JUEL:ARG:1:6 屈服
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        chara(arg0).train.百合经验 += 1; // :2659 EXP:ARG:0:40 百合经验
        chara(arg1).train.百合经验 += 1; // :2660 EXP:ARG:1:40 百合经验
      }
    } else if (rand_n(2) === 0) {
      // :2661-2700 捆绑
      await era.printAndWait(`${winner_name}用绳子将${loser_name}紧紧捆住`); // :2672
      if (rand_n(3) === 0) {
        // :2663-2681 鞭打/蜡烛
        await era.print(`向伏在地上的${loser_name}的背上`); // :2674
        if (rand_n(2) === 0) {
          await era.printAndWait('用鞭子不停地抽打着、'); // :2676
          await era.printAndWait(`在${loser_name}的背上留下了数道血痕`); // :2677
        } else {
          await era.printAndWait('将点燃的蜡烛倾倒了上去'); // :2679
          await era.printAndWait(
            `过热的刺痛让${loser_name}的身体不住地抽搐着、身上更是被滴上了更多的蜡`,
          ); // :2680
        }
        await era.print('耻情点数+200'); // :2615
        await era.print('屈服点数+200'); // :2616
        await era.print('紧缚经验+5'); // :2684
        if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
          await era.print('百合经验+1'); // :1939
        }
        era.add(`juel:${arg1}:8`, 200); // :337 JUEL:ARG:1:8 耻情
        era.add(`juel:${arg1}:6`, 200); // :341 JUEL:ARG:1:6 屈服
        chara(arg1).train.紧缚经验 += 5; // :2680 EXP:ARG:1:51 紧缚经验
        if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
          chara(arg0).train.百合经验 += 1; // :2682 EXP:ARG:0:40 百合经验
          chara(arg1).train.百合经验 += 1; // :2683 EXP:ARG:1:40 百合经验
        }
      } else {
        // :2684-2699 扩张模具
        if (!era.get(`talent:${arg1}:122`)) {
          await era.printAndWait(
            `${loser_name}的阴道与肛门被${winner_name}用扩张模具强行插入`,
          ); // :2696
        } else {
          await era.printAndWait(
            `${loser_name}的肛门被${winner_name}用扩张模具强行插入`,
          ); // :2698
        }
        await era.printAndWait(
          `${winner_name}在${loser_name}放弃之前不停地侵犯着、将${loser_name}的屁股打得又红又肿`,
        ); // :2700
        if (!era.get(`talent:${arg1}:122`)) {
          await era.print('私处经验+10'); // :2429
          await era.print('肛门经验+10'); // :2396
        }
        if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
          await era.print('百合经验+10'); // :2705
        }
        await era.print('紧缚经验+5'); // :2684
        if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
          chara(arg0).train.百合经验 += 10; // :2697 EXP:ARG:0:40 百合经验
          chara(arg1).train.百合经验 += 10; // :2698 EXP:ARG:1:40 百合经验
        }
        if (!era.get(`talent:${arg1}:122`)) {
          chara(arg1).dungeon.私处经验 += 10; // :2700 EXP:ARG:1:0 私处经验
        }
        chara(arg1).dungeon.肛门经验 += 10; // :2701 EXP:ARG:1:1 肛门经验
        chara(arg1).train.紧缚经验 += 5; // :2702 EXP:ARG:1:51 紧缚经验
        if (
          (era.get(`exp:${arg1}:0`) || 0) > 0 &&
          (era.get(`talent:${arg1}:0`) || 0) === 1
        ) {
          chara(arg1).chara.处女 = 0; // :2704 TALENT:ARG:1:0 = 0
          await era.print('【处女丧失】'); // :164
          chara(arg1).train.初体验对象 = 101; // :2706 CFLAG:ARG:1:15 = 101（壶虫）
        }
      }
      if ((era.get(`abl:${arg1}:21`) || 0) >= 3) {
        // :2708-2712 抖M气质
        await era.printAndWait(`${loser_name}心中萌生了兴奋的情绪……`); // :2722
        await era.print(`欲情点数+${mon_num * 10}`); // :585
        era.add(`juel:${arg1}:5`, mon_num * 10); // :586 JUEL:ARG:1:5 欲情
      }
    } else {
      // :2713-2746 乱交派对
      await era.printAndWait(
        `${winner_name}召集了梦魔以及魔族们，开始了乱交派对。`,
      ); // :2727
      await era.printAndWait('大家都在尽情交欢着，不过有一人却四脚趴地'); // :2728
      await era.printAndWait(
        `做着${winner_name}的人肉座椅，${loser_name}在派对中不被当人看。`,
      ); // :2729
      if (!era.get(`talent:${arg1}:122`)) {
        await era.printAndWait(
          `${loser_name}的后面，私处和肛门也正被假阳具狠狠侵犯着。`,
        ); // :2731
      } else {
        await era.printAndWait(`${loser_name}的嘴巴和肛门也正被狠狠侵犯着。`); // :2733
      }
      await era.printAndWait(
        `在${she(arg1)}面前则是一个接着一个不停地有人来要求舔下体，`,
      ); // :2735
      await era.printAndWait(`坐在这样的椅子上，${winner_name}满意地自慰着……`); // :2736
      if (!era.get(`talent:${arg1}:122`)) {
        await era.print('私处经验+10'); // :2429
      }
      await era.print('肛门经验+10'); // :2396
      if (!(era.get(`talent:${arg0}:122`) || era.get(`talent:${arg1}:122`))) {
        await era.print('百合经验+10'); // :2705
        chara(arg0).train.百合经验 += 10; // :2728 EXP:ARG:0:40 百合经验
        chara(arg1).train.百合经验 += 10; // :2729 EXP:ARG:1:40 百合经验
      }
      if (!era.get(`talent:${arg1}:122`)) {
        chara(arg1).dungeon.私处经验 += 10; // :2731 EXP:ARG:1:0 私处经验
      }
      chara(arg1).dungeon.肛门经验 += 10; // :2732 EXP:ARG:1:1 肛门经验
      if (
        (era.get(`exp:${arg1}:0`) || 0) > 0 &&
        (era.get(`talent:${arg1}:0`) || 0) === 1
      ) {
        chara(arg1).chara.处女 = 0; // :2735 TALENT:ARG:1:0 = 0
        await era.print('【处女丧失】'); // :164
        chara(arg1).train.初体验对象 = 101; // :2737 CFLAG:ARG:1:15 = 101（壶虫）
      }
    }
    await era.waitAnyKey(); // :2739 WAIT（REPEAT 内）
    await era.print(''); // :2755 PRINTL
  }

  // :2742-2748 收尾百合判定
  if ((era.get(`abl:${arg1}:22`) || 0) > 0 || era.get(`talent:${arg1}:81`)) {
    // :2744-2748 百合气质・双性恋
    await era.printAndWait(`${loser_name}感到心中有什么在蠢动着。`); // :1910
    await era.print(`欲情点数+${mon_num * 10}`); // :585
    era.add(`juel:${arg1}:5`, mon_num * 10); // :586 JUEL:ARG:1:5 欲情
  }

  await era.waitAnyKey(); // :2750 WAIT
  await era.print(''); // :2766 PRINTL
  return 0; // :2753
}

// @VICTORY_RYOUZYOKU, ARG = -1 // :2771（源 :2771-2840）
/**
 * 胜利后的凌辱事件（勇者胜后「間違いが起こる」）。
 *
 * 原作 `ARG = -1` 缺省、`SIF ARG < 0 → ARG = A`（A = 当前攻击者 = 勇者）。
 * 门槛：善恶值（CFLAG:ARG:151）必须 <= -50（善恶低才发生），且 RAND:12 != 0。
 * 命中后按 E 表第 1 列（B = RAND:3 * 100 列头）的凌辱类型分派到 *_RYOU_YUSYA
 * （勇者版演出）；原作仅 SLIME_RYOU_YUSYA（E:C == 2）与 GIRL_RYOU_YUSYA
 * （E:C == 9）未注释，其余分支全在注释内（死代码）。
 *
 * @param {number} [arg] 胜者（原作 ARG；缺省 -1 → A）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function victory_ryouzyoku(arg = -1, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  // :2775 SIF ARG < 0 → ARG = A（当前攻击者，调用方已传）
  if (arg < 0) {
    return 0; // 无调用方传参时不做任何事（原作读全局 A，ere 侧由调用方保证）
  }
  // （arg_name 未用——本函数台词无 %SAVESTR:ARG% 插值，见 :2791 用 MONSTERNAME）

  // :2780-2781 善恶值が低くないとダメ（CFLAG:ARG:151 > -50 → RETURN 0）
  if ((era.get(`cflag:${arg}:151`) || 0) > -50) {
    return 0;
  }

  // :2783-2784 SIF RAND:12 == 0 → RETURN 0（低概率触发）
  if (rand_n(12) === 0) {
    return 0;
  }

  // :2786 B = RAND:3 * 100（列头）
  const b = rand_n(3) * 100;
  const c = b + 7; // :2787 C = B + 7（凌辱类型槽）

  // :2789-2793 该列有怪物 → 冒险者被瘴气侵袭、玩弄怪物（善恶值 -10）
  if (e_get(c) > 0) {
    const local_1 = e_get(b); // LOCAL:1 = E:B（怪物号）
    await era.printAndWait(
      `冒险者被魔界的瘴气侵袭着，玩弄起${monstername(local_1)}来。（善恶值:-10）`,
    ); // :2793
    // :2792 CALL KARMA, ARG, -10（阶段 5 存根）
    const { karma: karma_stub } = require('#/dungeon/dungeon');
    karma_stub(arg, -10);
  }

  // :2796-2822 ペニスを使った凌辱を先行実装（E:C 分派；注释掉的死分支保留）
  const type = e_get(c);
  if (type === 2) {
    // 史莱姆（未注释的活分支）
    await slime_ryou_yusya(arg, rand_n);
  } else if (type === 9) {
    // 女（未注释的活分支）
    await girl_ryou_yusya(arg, rand_n);
  }
  // :2800/:2804/:2808/:2812/:2816/:2820 其余分支（ORC/INSECT/IVY/SYOKUSYU/
  // FAILY/GIANT/BEAST/BRAIN/HORSE）在原作是注释（死代码），不移植——结构
  // 注释见 :2798-2821。

  await era.print(''); // :2836 PRINTL
  return 0; // :2826
}

// @ORC_RYOU_YUSYA(ARG) // :2841（源 :2841-2843）
/**
 * 勇者版胜利演出：兽人（原作空实现，RETURN 0）。
 * @returns {Promise<number>} 0
 */
async function orc_ryou_yusya() {
  return 0; // :2843
}

// @SLIME_RYOU_YUSYA(ARG) // :2845（源 :2845-2860）
/**
 * 勇者版胜利演出：史莱姆。
 *
 * PLAY = RAND:10 + 5（次数）；TALENT:121/122/326（扶她/男人/性癖）命中时
 * 打印并加欲情点数。
 *
 * @param {number} arg 角色号（原作 ARG）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0
 */
async function slime_ryou_yusya(arg, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const play = rand_n(10) + 5; // :2849 PLAY = RAND:10 + 5
  const arg_name = arg_name_of(arg);

  // :2851-2857 扶她/男人/性癖
  if (
    (era.get(`talent:${arg}:121`) || 0) === 1 ||
    (era.get(`talent:${arg}:122`) || 0) === 1 ||
    (era.get(`talent:${arg}:326`) || 0) === 1
  ) {
    await era.printAndWait(
      `${arg_name}无法抑制自己的欲望，沉醉在被黏液凌辱肉棒的快感中……`,
    ); // :2851
    await era.print(`欲情点数+${play * 10}`); // :2853
    era.add(`juel:${arg}:5`, play * 10); // :586 JUEL:ARG:5 欲情
  } else {
    // :2856-2858 空 ELSE
  }
  return 0; // :2859
}

// @INSECT_RYOU_YUSYA(ARG) // :2862（源 :2862-2864）
/** 勇者版胜利演出：昆虫（原作空实现）。@returns {Promise<number>} 0 */
async function insect_ryou_yusya() {
  return 0; // :2864
}

// @IVY_RYOU_YUSYA(ARG) // :2866（源 :2866-2868）
/** 勇者版胜利演出：蔦触手（原作空实现）。@returns {Promise<number>} 0 */
async function ivy_ryou_yusya() {
  return 0; // :2868
}

// @SYOKUSYU_RYOU_YUSYA(ARG) // :2870（源 :2870-2872）
/** 勇者版胜利演出：触手（原作空实现）。@returns {Promise<number>} 0 */
async function syokusyu_ryou_yusya() {
  return 0; // :2872
}

// @FAILY_RYOU_YUSYA(ARG) // :2874（源 :2874-2876）
/** 勇者版胜利演出：妖精（原作空实现）。@returns {Promise<number>} 0 */
async function faily_ryou_yusya() {
  return 0; // :2876
}

// @GIANT_RYOU_YUSYA(ARG) // :2878（源 :2878-2880）
/** 勇者版胜利演出：巨人（原作空实现）。@returns {Promise<number>} 0 */
async function giant_ryou_yusya() {
  return 0; // :2880
}

// @MAN_RYOU_YUSYA(ARG) // :2882（源 :2882-2884）
/** 勇者版胜利演出：魔族男人（原作空实现）。@returns {Promise<number>} 0 */
async function man_ryou_yusya() {
  return 0; // :2884
}

// @GIRL_RYOU_YUSYA(ARG) // :2886（源 :2886-2901）
/**
 * 勇者版胜利演出：女魔族。
 *
 * PLAY = RAND:10 + 5；TALENT:121/122/326 命中时打印并加欲情点数。
 *
 * @param {number} arg 角色号（原作 ARG）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0
 */
async function girl_ryou_yusya(arg, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const play = rand_n(10) + 5; // :2890 PLAY = RAND:10 + 5
  const arg_name = arg_name_of(arg);

  // :2892-2898 扶她/男人/性癖
  if (
    (era.get(`talent:${arg}:121`) || 0) === 1 ||
    (era.get(`talent:${arg}:122`) || 0) === 1 ||
    (era.get(`talent:${arg}:326`) || 0) === 1
  ) {
    await era.printAndWait(
      `${arg_name}无法抑制自己的欲望，沉醉在被女魔族凌辱肉棒的快感中……`,
    ); // :2892
    await era.print(`欲情点数+${play * 10}`); // :2894
    era.add(`juel:${arg}:5`, play * 10); // :586 JUEL:ARG:5 欲情
  } else {
    // :2897-2899 空 ELSE
  }
  return 0; // :2900
}

// @BEAST_RYOU_YUSYA(ARG) // :2903（源 :2903-2905）
/** 勇者版胜利演出：魔兽（原作空实现）。@returns {Promise<number>} 0 */
async function beast_ryou_yusya() {
  return 0; // :2905
}

// @BRAIN_RYOU_YUSYA(ARG) // :2907（源 :2907-2909）
/** 勇者版胜利演出：食脑魔（原作空实现）。@returns {Promise<number>} 0 */
async function brain_ryou_yusya() {
  return 0; // :2909
}

// @HORSE_RYOU_YUSYA(ARG) // :2911（源 :2911-2913）
/** 勇者版胜利演出：马（原作空实现）。@returns {Promise<number>} 0 */
async function horse_ryou_yusya() {
  return 0; // :2913
}

// @DUNGEON_RYOUZYOKU_ESCAPE,ARG // :2916（源 :2916-3016）
/**
 * 逃脱分支：被凌辱的勇者被同伴发现并救援。
 *
 * 依据队长记忆（CFLAG:533）解析三人（SIDEA/SIDEB），检查队伍伤势
 * （CHECK_STATUS RESULT:7 > 9 = 队友无力救援），按畏怖计数（CFLAG:131）
 * 分档决定救援成功（RAND:FEAR == 0）与否。成功时：队长回城标志 507 = 1、
 * 勇者体力/气力 +100、状态回侵攻中（CFLAG:1 = 2）。
 *
 * @param {number} arg 被凌辱勇者角色号（原作 ARG）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function dungeon_ryouzyoku_escape(arg, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  let sidea;
  let sideb;

  // :2920-2931 队伍解析（队长记忆 CFLAG:533）
  if ((era.get(`cflag:${arg}:533`) || 0) === arg) {
    // :2921-2924 自己是队长
    sidea = era.get(`cflag:${arg}:531`) || 0;
    sideb = era.get(`cflag:${arg}:532`) || 0;
  } else {
    // :2925-2931 自己是同伴：读队长的；自己占同伴位时换成队长号
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

  // :2933 FEAR = CFLAG:ARG:131（畏怖计数）
  let fear = era.get(`cflag:${arg}:131`) || 0;
  // :2934-2935 SIF FEAR < 2 → FEAR++
  if (fear < 2) {
    fear += 1;
  }

  // :2937-2938 SIF !SIDEA && !SIDEB → RETURN 0（无同伴不触发）
  if (!sidea && !sideb) {
    return 0;
  }

  // :2940 分析队伍状态（CALL CHECK_STATUS, ARG, 1——MODE 1 静默）
  const { check_status: check_status_fn } = require('#/dungeon/dungeon');
  const status = await check_status_fn(arg, 1);
  const rating = status[7]; // RESULT:7 队伍当前状态评级

  // :2942-2947 发现奄奄一息的勇者
  if (sidea && sideb) {
    await era.printAndWait(
      `${arg_name_of(sidea)}与${arg_name_of(sideb)}发现了奄奄一息的${arg_name_of(arg)}`,
    ); // :2943
  } else if (sidea && !sideb) {
    await era.printAndWait(
      `${arg_name_of(sidea)}发现了奄奄一息的${arg_name_of(arg)}`,
    ); // :2945
  } else if (!sidea && sideb) {
    await era.printAndWait(
      `${arg_name_of(sideb)}发现了奄奄一息的${arg_name_of(arg)}`,
    ); // :2947
  }

  const arg_name = arg_name_of(arg);
  // :2949-3012 救援判定分档
  if (rating > 9) {
    // :2950-2953 队伍状况不容乐观——只能眼睁睁看着被带走
    await era.print(
      `${arg_name_of(sidea)}与${arg_name_of(sideb)}的状况实在不容乐观`,
    ); // :2951
    await era.printAndWait(`只能眼睁睁地看着${arg_name}被带往了地下城深处…`); // :2952
  } else if ((era.get(`cflag:${arg}:131`) || 0) > 5) {
    // :2954-2970 畏怖 > 5：被凌辱者已无脱身念头
    await era.print(`但${arg_name}似乎并没有脱身念头…`); // :2954
    if (
      (era.get(`cflag:${sidea}:131`) || 0) <= 3 &&
      (era.get(`cflag:${sideb}:131`) || 0) <= 3
    ) {
      await era.print(
        `${arg_name_of(sidea)}与${arg_name_of(sideb)}只好悻悻离去…`,
      ); // :2956
    } else {
      if (
        (era.get(`cflag:${sidea}:131`) || 0) > 3 &&
        (era.get(`cflag:${sideb}:131`) || 0) <= 3
      ) {
        await era.print(
          `${arg_name_of(sidea)}看着${arg_name}的样子、吞了吞口水`,
        ); // :2959
        await era.print('露出了若有所思的神情、似乎已经出神了'); // :2960
        await era.printAndWait(
          `${arg_name_of(sideb)}只得带着${arg_name_of(sidea)}悻悻离去…`,
        ); // :2961
      } else if (
        (era.get(`cflag:${sideb}:131`) || 0) > 3 &&
        (era.get(`cflag:${sidea}:131`) || 0) <= 3
      ) {
        await era.print(
          `${arg_name_of(sideb)}看着${arg_name}的样子、吞了吞口水`,
        ); // :2963
        await era.print('露出了若有所思的神情、似乎已经出神了'); // :2960
        await era.printAndWait(
          `${arg_name_of(sidea)}只得带着${arg_name_of(sideb)}悻悻离去…`,
        ); // :2965
      }
    }
  } else if ((era.get(`cflag:${arg}:131`) || 0) > 3) {
    // :2971-2995 畏怖 > 3：同伴伺机而动
    if (
      (era.get(`cflag:${sidea}:131`) || 0) <= 3 &&
      (era.get(`cflag:${sideb}:131`) || 0) <= 3
    ) {
      await era.print(`${arg_name_of(sidea)}与${arg_name_of(sideb)}伺机而动`); // :2970
      if (rand_n(fear) === 0) {
        // :2975-2980 救援成功
        await era.printAndWait(`终于寻到机会将${arg_name}救下并逃出了地下城`); // :2972
        const leader = era.get(`cflag:${arg}:533`) || 0;
        chara(leader).invasion.回城标志 = 1; // :2977 CFLAG:(CFLAG:ARG:533):507
        chara(arg).dungeon.体力 += 100; // :2978 BASE:ARG:0 += 100
        chara(arg).dungeon.气力 += 100; // :2979 BASE:ARG:1 += 100
        chara(arg).invasion.状态 = 2; // :2980 CFLAG:ARG:1 = 2（侵攻中）
      } else {
        await era.printAndWait(`但${arg_name}很快就被魔族们带往了地下城深处…`); // :2978
      }
    } else {
      await era.print(`${arg_name_of(sidea)}与${arg_name_of(sideb)}伺机而动`); // :2970
      if (
        (era.get(`cflag:${sidea}:131`) || 0) > 3 &&
        (era.get(`cflag:${sideb}:131`) || 0) <= 3
      ) {
        await era.print(
          `${arg_name_of(sidea)}看着${arg_name}的样子、吞了吞口水`,
        ); // :2983
        await era.print('露出了若有所思的神情、似乎已经出神了'); // :2960
        if (rand_n(fear) === 0) {
          await era.print(`终于寻到机会将${arg_name}救下并逃出了地下城`); // :2986
          const leader = era.get(`cflag:${arg}:533`) || 0;
          chara(leader).invasion.回城标志 = 1; // :2991
          chara(arg).dungeon.体力 += 100; // :2992
          chara(arg).dungeon.气力 += 100; // :2993
          chara(arg).invasion.状态 = 2; // :2994
        } else {
          await era.print(`但${arg_name}很快就被魔族们带往了地下城深处…`); // :2992
        }
      } else if (
        (era.get(`cflag:${sideb}:131`) || 0) > 3 &&
        (era.get(`cflag:${sidea}:131`) || 0) <= 3
      ) {
        await era.print(
          `${arg_name_of(sideb)}看着${arg_name}的样子、吞了吞口水`,
        ); // :2995
        await era.print('露出了若有所思的神情、似乎已经出神了'); // :2960
        if (rand_n(fear) === 0) {
          await era.printAndWait(`终于寻到机会将${arg_name}救下并逃出了地下城`); // :2972
          const leader = era.get(`cflag:${arg}:533`) || 0;
          chara(leader).invasion.回城标志 = 1; // :3003
          chara(arg).dungeon.体力 += 100; // :3004
          chara(arg).dungeon.气力 += 100; // :3005
          chara(arg).invasion.状态 = 2; // :3006
        } else {
          await era.printAndWait(
            `但${arg_name}很快就被魔族们带往了地下城深处…`,
          ); // :3004
        }
      }
    }
  } else {
    // :2996-3010 畏怖 <= 3：直接伺机救援
    if (rand_n(fear) === 0) {
      await era.printAndWait(`终于寻到机会将${arg_name}救下并逃出了地下城`); // :2972
      const leader = era.get(`cflag:${arg}:533`) || 0;
      chara(leader).invasion.回城标志 = 1; // :2999
      chara(arg).dungeon.体力 += 100; // :3000
      chara(arg).dungeon.气力 += 100; // :3001
      chara(arg).invasion.状态 = 2; // :3002
    }
  }
  return 0; // :3014
}

module.exports = {
  STUBBED_CALLS,
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
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
  ryouzyoku_kojo_family,
  ryouzyoku_after_kojo_family,
};
