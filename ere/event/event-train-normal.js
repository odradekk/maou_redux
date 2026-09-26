/**
 * @file 调教开始事件 @EVENTTRAIN 的**无属性档**定义（issue #401）。
 *
 * 源: target/ERB/EVENT/EVETRAIN.ERB  @EVENTTRAIN（:1-17）
 *
 * == 引擎保留事件名的多定义（结论来自 emuera-basic-agent-guide，不是猜的） ==
 *
 * `@EVENTTRAIN` 全库零 `CALL` 调用点——它是**引擎保留事件名**，由引擎在
 * `BEGIN TRAIN` 之后自动派发（system-flow.md「系统自动调用 @EVENTTRAIN」）。
 * 同名定义有三处，**不是重名冲突**：事件函数允许有多份定义，按
 * `#PRI` 组 → 无属性组 → `#LATER` 组依次全部执行
 * （core-concepts/user-defined-functions.md「事件函数属性」；version-diff/
 * differences.md:115-119 补充「Emuera 1.800 起精确再现 eramaker 的
 * #PRI → 无属性 → #LATER 分组」；`#SINGLE` 才算中断，且只中断本组）。
 *
 *   | 定义处 | 属性 | ere 侧落点 |
 *   | --- | --- | --- |
 *   | 調教相關/TRAIN_MAIN.ERB:13 | `#PRI` | ere/event/event-train.js |
 *   | **EVENT/EVETRAIN.ERB:1（本文件）** | 无属性 | 本模块 |
 *   | （口上模块各自另有一份 @EVENTTRAIN） | 无属性 | ere/kojo/kojo-k*.js |
 *
 * 无属性组内的次序 = 定义次序（Emuera 是文件装载序），ere 侧由
 * `ere/system/flow/main-loop.js` 的 require 序决定（`system/event/registry.js`
 * 头注：同档追加在尾部）。本模块紧随 event-train（#PRI 那份）之后装载。
 *
 * == 与 #PRI 那份的关系 ==
 *
 * 本体的前半与 TRAIN_MAIN.ERB:13 的 #PRI 定义重叠（射精槽清零、调教者
 * 选择），差别只有一处：**TFLAG 的重置范围**——#PRI 那份是
 * `REPEAT 200 → TFLAG:0..199`，本文件是 `VARSET TFLAG, 0, 0, 201` =
 * TFLAG:0..200（`VARSET 变量名[, 值, 起始索引, 结束索引]`，结束索引**不含**
 * ——commands/system.md:41-51）。两份都跑，后者多清一个 200。1:1 照搬，
 * 不合并。
 *
 * == :10 那 201 条写的落法（工单硬约束六） ==
 *
 * 一条 `VARSET` 展开成 201 个下标写入，其中 **47 个下标属主在 event 域外**
 * （跨域写登记里 file = 本文件的记录正好 47
 * 条：train 31 / system 12 / dungeon 1 / kojo 1 / stronghold 2）。按
 * CONTEXT.md「跨域写必须经属主域导出的具名方法」，这 47 条一律走门面 setter
 * （`game.<域>.<字段>`），**逐条**与所有权表核对过；剩下 154 条的属主是
 * event（本文件所在域），裸寻址合规，用显式下标表 + 循环清（集合逐字可审）。
 * 不用 `for (i of 0..200)` 一把清：那既瞒过 domain-check 的动态下标免检、
 * 也瞒过人的复核。
 *
 * **一份交叉验证**：门面只为「有跨域写者」的下标生成——201 个下标里恰好
 * 60 个有门面字段，且 47 个跨域下标**全部**在其中（另 13 个属 event 域但
 * 有跨域写者）。这与跨域写登记的记录集完全吻合，
 * 是本文件逐条落地的独立佐证。
 */

const era = require('#/era-electron');
const { on } = require('#/system/event/registry');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；#401 起本文件全部落真身，名单为空。
 */
const STUBBED_CALLS = [];

// @EVENTTRAIN（EVETRAIN.ERB:1-17，无属性档——on 的缺省档即 TIER.NORMAL）
on('EVENTTRAIN', async () => {
  // :3 主人公の射精を0に（BASE:2 = 射精槽，属主 train → 门面）
  chara(0).train.射精槽 = 0;

  // :5 いちおう調教対象と助手も
  chara(era_flag.target).train.射精槽 = 0;
  // :6-7 SIF ASSI >= 0
  if (era_flag.assi >= 0) {
    chara(era_flag.assi).train.射精槽 = 0;
  }

  // :10 VARSET TFLAG, 0, 0, 201 —— 201 个下标逐条清 0（起始 0、结束 201
  // 不含）。分域落法见文件头「:10 那 201 条写的落法」。
  // —— 跨域 47 条：一律走属主域门面 setter（跨域写登记
  //    逐条核对过：train 31 / system 12 / dungeon 1 / kojo 1 / stronghold 2）——
  // train（31 条）
  game.train.口中射精 = 0; // tflag:0 口中射精
  game.train.手中射精 = 0; // tflag:1 手中射精
  game.train.性交射精 = 0; // tflag:2 性交射精
  game.train.处女丧失 = 0; // tflag:3 处女丧失
  game.train.接吻射精 = 0; // tflag:4 接吻射精
  game.train.舔阴射精 = 0; // tflag:5 舔阴射精
  game.train.助手射精 = 0; // tflag:6 助手射精
  game.train.主人犯助手射精 = 0; // tflag:7 主人犯助手射精
  game.train.口交射精后 = 0; // tflag:8 口交射精后
  game.train.股间射精 = 0; // tflag:9 股间射精
  game.train.逆强奸射精 = 0; // tflag:12 逆强奸射精
  game.train.初吻与自我口上 = 0; // tflag:13 初吻与自我口上
  game.train.近亲与自我口上 = 0; // tflag:14 近亲与自我口上
  game.train.怪物射精或购入金 = 0; // tflag:15 怪物射精或购入金
  game.train.童贞丧失_未使用 = 0; // tflag:17 童贞丧失_未使用
  game.train.伴V经验指令 = 0; // tflag:19 伴V经验指令
  game.train.主人导致处女丧失 = 0; // tflag:20 主人导致处女丧失
  game.train.压抑抵抗消灭 = 0; // tflag:25 压抑抵抗消灭
  game.train.侍奉快乐经验 = 0; // tflag:26 侍奉快乐经验
  game.train.被虐快乐经验 = 0; // tflag:27 被虐快乐经验
  game.train.A快乐经验 = 0; // tflag:28 A快乐经验
  game.train.主人经验 = 0; // tflag:30 主人经验
  game.train.死亡时在录像 = 0; // tflag:34 死亡时在录像
  game.train.对象膣内射精 = 0; // tflag:38 对象膣内射精
  game.train.三人PLAY主人部位 = 0; // tflag:40 三人PLAY主人部位
  game.train.三人PLAY助手部位 = 0; // tflag:41 三人PLAY助手部位
  game.train.三人PLAY持续 = 0; // tflag:42 三人PLAY持续
  game.train.下装穿不上 = 0; // tflag:45 下装穿不上
  game.train.珠结算_7 = 0; // tflag:58 珠结算_7
  game.train.快乐经验 = 0; // tflag:100 快乐经验
  game.train.屈服刻印结算 = 0; // tflag:200 屈服刻印结算
  // system（12 条）
  game.system.对象射精 = 0; // tflag:10 对象射精
  game.system.对象喷乳 = 0; // tflag:11 对象喷乳
  game.system.反抗刻印变动 = 0; // tflag:21 反抗刻印变动
  game.system.苦痛刻印变动 = 0; // tflag:22 苦痛刻印变动
  game.system.快乐刻印变动 = 0; // tflag:23 快乐刻印变动
  game.system.屈服刻印变动 = 0; // tflag:24 屈服刻印变动
  game.system.绝顶强度 = 0; // tflag:29 绝顶强度
  game.system.榨乳中 = 0; // tflag:35 榨乳中
  game.system.上次调教者是助手 = 0; // tflag:50 上次调教者是助手
  game.system.V虫产卵 = 0; // tflag:120 V虫产卵
  game.system.A虫产卵 = 0; // tflag:121 A虫产卵
  game.system.反抗刻印回避 = 0; // tflag:150 反抗刻印回避
  // dungeon（1 条）
  game.dungeon.足交射精或处遇口上 = 0; // tflag:18 足交射精或处遇口上
  // kojo（1 条）
  game.kojo.录像内容 = 0; // tflag:32 录像内容
  // stronghold（2 条）
  game.stronghold.召唤暂存_1 = 0; // tflag:101 召唤暂存_1
  game.stronghold.召唤暂存_2 = 0; // tflag:102 召唤暂存_2
  // —— 同域 154 条（属主 event）：本文件在 ere/event/，裸寻址合规。
  //    下标集合逐字列出（VARSET 是一条语句、敲成一条，但集合必须可审——
  //    动态 i 循环会同时绕过 domain-check 的判定与人的复核）——
  for (const index of [
    16, 31, 33, 36, 37, 39, 43, 44, 46, 47, 48, 49, 51, 52, 53, 54, 55, 56, 57,
    59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77,
    78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
    97, 98, 99, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,
    116, 117, 118, 119, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132,
    133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147,
    148, 149, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163,
    164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178,
    179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193,
    194, 195, 196, 197, 198, 199,
  ]) {
    era.set(`tflag:${index}`, 0);
  }

  // :13-17 調教者は誰か（ASSIPLAY 是调教域槽位，经包装层读写）
  if (era_flag.assiplay === 0) {
    era_flag.player = 0; // PLAYER = MASTER（MASTER 恒角色 0，见 event-pregnancy.js）
  } else {
    era_flag.player = era_flag.assi;
  }
});

module.exports = { STUBBED_CALLS };
