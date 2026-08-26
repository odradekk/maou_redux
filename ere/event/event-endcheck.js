/**
 * @file @ENDCHECK 主线剧情监测全链（issue #116：S4「可空转」落地）。
 *
 * 源: target/ERB/EVENT/ENDING ver 1.0.1.ERB  @ENDCHECK（:301-356）
 *     target/ERB/EVENT/ENDINGDATA.ERB  @ENDRESET（:1-35）
 *     target/ERB/EVENT/ENDINGDATA.ERB  @ENDCHECKMAIN（:38-63）
 *     target/ERB/EVENT/ENDINGDATA.ERB  @ENDCHECKCHARA（:64-140）
 *
 * 调用关系（全库唯一调用点，已查实）：@EVENT_NEWDAY :241（「主线剧情
 * 监测」，每日一次）——ere/event/event-nextday.js 的 run_event_newday
 * 尾部。
 *
 * 本票边界（#112 父票定「可空转」）：
 *   - 真做：ENDRESET 十一角清场、ENDCHECKMAIN 五条线、ENDCHECKCHARA 的
 *     七条素质定线与四条子判定**调用**、END 族分派循环。这些是纯 flag
 *     读写，无演出，是后续阶段的挂接面。
 *   - 存根（名单见 STUBBED_CALLS，docs/stub-registry.md）：四个角色线
 *     推进判定（SPADE/SQUARE/GODNESS/GODNESS_SKY_TEMPLE/PRINCESS，
 *     ENDINGDATA.ERB :208-352/:143-207 与 ADDON1 的状态机）与 ENDING_N
 *     演出（#118 的领域，event-ending.js 落地后改为引用其导出）。
 *   - TRYCALL END31 死引用：#14 缺陷 3，1:1 保留（见文件尾注释）。
 *
 * 移植说明：
 *   - 原作 GETCHARA(n) 按登记号寻址；ere 侧登记号已扁平化为角色号
 *     （#21，addCharacter(17) 后 cid=17），在场判定即列表包含。
 *   - EX_FLAG:2801-2815 读写一律走包装层（era-exflag.js，#113 落表）；
 *     葵希罗线与反叛结局原作错写 FLAG 侧（ENDINGDATA.ERB :30-32/:61-63
 *     与 :130-137，ExFlag.yml 头注有登记），1:1 照写 FLAG 侧（era-flag.js，
 *     本票补表）——读点（ENDCHECKCHARA 的定线与 ENDRESET 的清场）与写点必须同侧，状态机行为
 *     才与原作一致；分派循环读的是 EX_FLAG 侧（族错位缺陷，见下）。
 *   - cflag/talent 的读是跨域读，放行（ADR-0002「跨域读放行」），直读
 *     + || 0 兜底（#13：未声明下标读得 undefined）。
 */

const era = require('#/era-electron');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { stub_line } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = [
  'ENDCHECKSPADE',
  'ENDCHECKSQUARE',
  'ENDCHECKGODNESS',
  'ENDCHECKGODNESS_SKY_TEMPLE',
  'ENDCHECKPRINCESS',
  'ENDING_N',
];

/**
 * END 族分发注册表：TRYCALLFORM END{2..15}_{小节} 的等价物（#7 分发族）。
 * 声明空间 = 原作 FOR LOCAL,2,16 的循环域（族号 2..15，@ENDCHECK 头注释
 * 「2-15为分剧情」）。14 族中仅 END7/10/11/14 有定义，其余 10 族全库无
 * 定义（#14 登记）——空间内缺失 = TRYCALLFORM 静默跳过，合法。角色线票
 * 落地时在本注册表 register（id = 族号，小节作参数传入实现）。
 */
const END_FAMILY = new DispatchFamily(
  'END',
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
);

/** 原作 GETCHARA(n) 的等价物：在场返回角色号（= cid，#21 扁平化），不在场 -1 */
function get_chara(no) {
  return era.getAddedCharacters().includes(no) ? no : -1;
}

/**
 * 每日清场（原作 @ENDRESET，ENDINGDATA.ERB :1-35）。
 * 剧情角色不在场则清对应线 flag；银黑桃/嘉德有段位守卫——推进到离队
 * 死亡段（300/500+）后不归零重走。
 */
function endreset() {
  // :3-5 玛奥（角色号 17）
  if (get_chara(17) < 0) {
    era_exflag.route_17 = 0;
  }
  // :6-8 金红桃（20）
  if (get_chara(20) < 0) {
    era_exflag.route_20 = 0;
  }
  // :9-11 银黑桃（21）——段位 >= 300（放走/死亡段）不清
  if (get_chara(21) < 0 && era_exflag.route_21 < 300) {
    era_exflag.route_21 = 0;
  }
  // :12-14 黑方片（22）
  if (get_chara(22) < 0) {
    era_exflag.route_22 = 0;
  }
  // :15-17 白梅花（23）
  if (get_chara(23) < 0) {
    era_exflag.route_23 = 0;
  }
  // :18-20 莉莉（24）
  if (get_chara(24) < 0) {
    era_exflag.route_24 = 0;
  }
  // :21-23 琼（31）
  if (get_chara(31) < 0) {
    era_exflag.route_31 = 0;
  }
  // :24-26 普林希斯（32）
  if (get_chara(32) < 0) {
    era_exflag.route_32 = 0;
  }
  // :27-29 嘉德（33）——原作守卫读 EX_FLAG:2814（银黑桃线值，疑为 2810
  // 的笔误：写入的是 2810；银黑桃线值上界 311，2814 < 500 实际恒真，故
  // 行为上等价于无守卫，嘉德离队即每天清 2810）。1:1 照抄读 2814，勿修
  if (get_chara(33) < 0 && era_exflag.route_21 < 500) {
    era_exflag.route_33 = 0;
  }
  // :30-32 葵希罗（34）——原作错写 FLAG 侧（见文件头），照写 era_flag
  if (get_chara(34) < 0) {
    era_flag.route_34 = 0;
  }
  // :33-35 菲娅（35）
  if (get_chara(35) < 0) {
    era_exflag.route_35 = 0;
  }
}

/**
 * 全局判定（原作 @ENDCHECKMAIN，ENDINGDATA.ERB :38-63）：五条线。
 * 2802/2803/2804 的真实消费者是 @DEBUG_CHECK（反作弊，EVENT_TURNEND.ERB
 * :170-334，随反作弊票）；本函数只负责置位。
 */
function endcheck_main() {
  // :42-44 一周目 500 日 Normal End 门槛：DAY:0 == 500 且主线空闲
  // （2801 == 0 未起步，或 >= 90 真结局收尾中）→ 置 99。99 同时是分派
  // 循环的短路条件（ENDING ver 1.0.1.ERB :344）
  if (
    era_flag.day_count === 500 &&
    (era_exflag.first_run_deadline === 0 || era_exflag.first_run_deadline >= 90)
  ) {
    era_exflag.first_run_deadline = 99;
  }

  // :46-47 资金异常：持有金超过「非作弊获得资金」追踪器 +8766 的容差
  // → 置 10（分派循环会拼出 END2_1，无定义，静默——反作弊计数器与剧情
  // flag 区间的碰撞，docs/research/ending-paths.md 第一节）
  if (era_flag.money > era_exflag.legit_money + 8766) {
    era_exflag.money_cheat_ending = 10;
  }

  // :51-55 奴隶魔力过载：任一角色（含 0 号魔王）CFLAG:9 >= 5000 且无
  // 占用/调教中标记（CFLAG:x:1 == 0）→ 记角色号。原作 DO 循环从 0 号
  // 扫到 CHARANUM-1、后命中覆盖先命中；ere 侧迭代序＝引擎键序
  // （getAddedCharacters 数值升序，#150），覆盖写语义同，「最后」＝
  // 最大命中 ID——非升序加入时与原作位序模型分道，取舍随 #21 的
  // ID 语义扁平化
  for (const cid of era.getAddedCharacters()) {
    // CFLAG:x:9 魔力存量；CFLAG:x:1 占用/状态标记（0=空闲）
    if (
      (era.get(`cflag:${cid}:9`) || 0) >= 5000 &&
      (era.get(`cflag:${cid}:1`) || 0) === 0
    ) {
      era_exflag.runaway_slave_id = cid;
    }
  }

  // :58-59 魔王自己过载（登记号 0 = 角色 0）：CFLAG:0:9 >= 1500 → 置 10，
  // 消费者是 @DEBUG_CHECK 的大冲击 GAMEOVER
  if ((era.get('cflag:0:9') || 0) >= 1500) {
    era_exflag.maou_runaway_ending = 10;
  }

  // :61-63 反叛判定：威望（EX_FLAG:99）耗尽 → FLAG 侧 2816 置 10。
  // 原作错写 FLAG 侧（见文件头）；全库无消费点（死代码），1:1 保留写入
  if (era_exflag.prestige <= 0) {
    era_flag.rebellion_ending = 10;
  }
}

/**
 * 七角素质定线表（@ENDCHECKCHARA 的同型块，ENDINGDATA.ERB :66-137）。
 * 结构：角色在场 && 线 flag == 0 → TALENT:85 恋慕置 10 / TALENT:76 淫乱
 * 置 20。no = 角色号；holder/name = 线 flag 所在的包装层对象与访问器名
 * （葵希罗在 FLAG 侧——原作错写，见文件头）。src = 源码区间。
 */
const LINE_STARTERS = [
  { no: 17, holder: era_exflag, name: 'route_17', src: ':66-73' }, // 玛奥
  { no: 20, holder: era_exflag, name: 'route_20', src: ':74-81' }, // 金红桃
  { no: 23, holder: era_exflag, name: 'route_23', src: ':90-97' }, // 白梅花
  { no: 24, holder: era_exflag, name: 'route_24', src: ':98-105' }, // 莉莉
  { no: 31, holder: era_exflag, name: 'route_31', src: ':106-113' }, // 琼
  { no: 32, holder: era_exflag, name: 'route_32', src: ':114-121' }, // 普林希斯
  { no: 34, holder: era_flag, name: 'route_34', src: ':130-137' }, // 葵希罗（FLAG 侧）
];

/**
 * 角色线推进（原作 @ENDCHECKCHARA，ENDINGDATA.ERB :64-140）。
 * 七条素质定线真做；四个推进状态机（好感/阶段计数器逐级爬段）存根。
 */
async function endcheck_chara() {
  for (const starter of LINE_STARTERS) {
    if (get_chara(starter.no) > 0) {
      // 源码区间见 LINE_STARTERS 的 src 列
      if (starter.holder[starter.name] === 0) {
        // TALENT:85 恋慕 / TALENT:76 淫乱（素质定线，直读子表）
        if (era.get(`talent:${starter.no}:85`) || 0) {
          starter.holder[starter.name] = 10;
        } else if (era.get(`talent:${starter.no}:76`) || 0) {
          starter.holder[starter.name] = 20;
        }
      }
    }
  }

  // :82-85 银黑桃（21）：在场且段位 < 300 才判定（300+ 是放走/死亡段）
  if (get_chara(21) > 0 && era_exflag.route_21 < 300) {
    stub_line('ENDCHECKSPADE', '银黑桃线推进判定');
  }
  // :86-89 黑方片（22）：在场即判定（无段位守卫）
  if (get_chara(22) > 0) {
    stub_line('ENDCHECKSQUARE', '黑方片线推进判定');
  }
  // :122-129 嘉德（33）：< 500 段在场判定；>= 500 段离队后转天神宫线
  if (
    (get_chara(33) > 0 && era_exflag.route_33 < 500) ||
    era_exflag.route_33 >= 500
  ) {
    if (get_chara(33) > 0) {
      stub_line('ENDCHECKGODNESS', '嘉德线推进判定');
    } else {
      stub_line('ENDCHECKGODNESS_SKY_TEMPLE', '嘉德离队后的天神宫线判定');
    }
  }
  // :138-139 菲娅（35）：判定状态机含线起步（2807 = 10 初次会面），
  // 随菲娅线票整体落地
  if (get_chara(35) > 0) {
    stub_line('ENDCHECKPRINCESS', '菲娅线推进判定');
  }
}

/**
 * 主线剧情监测（原作 @ENDCHECK，ENDING ver 1.0.1.ERB :301-356）。
 * 每日一次，@EVENT_NEWDAY :241 调用。
 */
async function run_endcheck() {
  // :310 每日清场
  endreset();
  // :312 全局判定（五条线）
  endcheck_main();
  // :314-339 LOCAL:1..15 = 各线 flag % 100——死代码：赋值后无任何消费者
  // （:342 之后的分派直接读 EX_FLAG:(2800+LOCAL)），照搬不模拟（先例：
  // event-nextday.js 的 :11-12 SIF CONTINUE）
  // :342 角色线推进
  await endcheck_chara();
  // :344-349 分派循环：EX_FLAG:28xx 十位 = 小节、个位 = 0 才演出（防重播，
  // 演出函数尾部 += 1 置个位）。2801 == 99（Normal End 已定）时整体短路。
  // EX_FLAG:(2800+LOCAL) 是动态下标（原作拼名寻址的读侧），直读 + || 0
  if (era_exflag.first_run_deadline !== 99) {
    for (let local = 2; local < 16; local += 1) {
      const stage = era.get(`exflag:${2800 + local}`) || 0;
      if (stage % 10 === 0) {
        // TRYCALLFORM END{local}_{stage / 10}：Emuera 整数除法向零截断，
        // 等价 Math.trunc。小节为负合法（菲娅线崩坏态 2807 = -10 →
        // END7_-1，无定义静默）。实现缺失时 whenMissing 0 = TRYCALL
        // 落空 RESULT = 0 的缺省
        await END_FAMILY.call(local, {
          whenMissing: 0,
          args: [Math.trunc(stage / 10)],
        });
      }
    }
  }
  // :351-352 Normal End 演出：2801 == 99 && DAY:0 == 500。演出是 #118
  // 的领域（event-ending.js），当前存根占位
  if (era_exflag.first_run_deadline === 99 && era_flag.day_count === 500) {
    stub_line('ENDING_N', 'Normal End 演出', '随结局演出票 #118');
  }
  // :354-356 TRYCALL END31——死引用（#14 缺陷 3）：全库无 @END31 定义，
  // EX_FLAG:2803 非零时原作静默无动作，1:1 保留 = 不实现、勿「修好」。
  // 2803 的真实消费者是 @DEBUG_CHECK（EVENT_TURNEND.ERB :237-308）
}

module.exports = { run_endcheck, END_FAMILY, STUBBED_CALLS };
