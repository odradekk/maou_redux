/**
 * @file 读档钩子 @EVENTLOAD（issue #137：C3 读档钩子与自动存档）。
 *
 * 源: target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB  @EVENTLOAD（:760-778）
 *
 * Emuera 语义：LOADDATA 是转场命令（与 BEGIN 并列，技能
 * system-flow.md:26）——执行后不回调用方，迁移到 @EVENTLOAD；它跑完后
 * 引擎隐式进入 SHOP 阶段（**不执行 @EVENTSHOP**，同文件 51-53 行）。ere 侧
 * 落点：page-save-load.js 的 load_game 成功分支在 @SYSTEM_LOADGAME 自己的
 * :74-75（EX_FLAG:2801 钳制 + LASTLOAD_NO 自写入）之后 emit 本链，再以
 * begin(STATE.SHOP_AFTER_LOAD) 转场（链内 BEGIN 暂存值覆盖缺省目标——
 * 原作 :769-771 的 BEGIN SHOP 同构）。
 *
 * 原作 :760-778 逐行处置（复核于 #137，别照抄旧清单）：
 *   - :761 LOADGLOBAL——ere 引擎行为（global 表在内存、读档不动它），
 *     不镜像（page-title.js 同款结论）；
 *   - :764 CALL CHARA_NAME_INIT——**存根**（#105 决议：三个角色生成存根
 *     不进阶段 2，本票只交空钩子与「钩子被调用」的用例）；
 *   - :766 CALL EX_TALENTNAME_INIT——**存根**（同上；#138 落的
 *     yml/Ex_Talent.yml 是空名字表，名称条目随角色名初始化票在此补——
 *     补之前先看 yml/CStr.yml 头注的警告：登记进名字表的下标会被
 *     initCharaTable 预置 0）；
 *   - :768-772 LASTLOAD_NO == 999 → CALL MAOUNET + BEGIN SHOP、
 *     :773-774 LASTLOAD_NO ∈ [1000,1020) → CALL INPORT_B——跨作品数据
 *     交换，ere 读档界面只放行 0-99（page-save-load.js 的槽位分支），
 *     LASTLOAD_NO 永远取不到 999/1000+，**不可达，登记不占位**（#119
 *     KYOTEN_EVENT 先例；docs/stub-registry.md 的 MAOUNET/INPORT_B 行）；
 *   - :775-776 注释态的 EX_FLAG:2801 钳制——活代码在 @SYSTEM_LOADGAME 的
 *     :74-75（ere 侧 load_game 已 1:1 保留），此处原作即注释态，不搬；
 *   - :779 CALL DATA_FIX——历史补丁体不移植（ADR-0006：修的全是 Emuera
 *     旧档的具体缺陷，「读取 Emuera 旧存档」已由 #1 判出界；#14 登记）。
 *     其中三处对新档仍有语义的行（ADR-0006「逐条判定后另行安置」，
 *     #137 判定依据见下）在本链内等价落地：
 *       1. `SIF A == MASTER → EX_TALENT:A:200 = 1`（DATA_FIX.ERB 的
 *          170205 段，魔王高贵标识）——**归钩子**：DATA_FIX 全库唯一调用
 *          点就是 @EVENTLOAD（读档后重放）；新档对应写点在 @ADDCHARA_EX
 *          的 @CHARA_EX_0（ere 侧 chara-ex.js，#138 已落
 *          ex_talent:0:200），双路径同构即 1:1。
 *       2. `SIF MAXBASE:A:0 < 600 → 600`、3. `SIF MAXBASE:A:1 < 100 →
 *          100`（170205 段「正太魔王被榨干之后的修正」）——**归钩子**：
 *          原作运行期压低 MAXBASE 的写点（EVENT_ADDICT.ERB:160-172、
 *          SYSTEM_SOURCE_SUB1.ERB:444-453）都自带 600/100 的就地钳制，
 *          这两行 SIF 是读档侧对「存档里已带着的低值」的兜底重放——
 *          只在读档后有意义（新档的 MAXBASE 未被剧情动过），挪去
 *          CHAR_INIT 会把时机改错。
 *     其余历史补丁行（TALENT:315/316 取模回填、菲娅修正、EX 素质转移、
 *     FLAG/EX_FLAG 迁移段）全是旧档迁移，一并不移植（#14 登记）。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const { stub_line } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（名单
 * 变动必须同步清单）。
 */
const STUBBED_CALLS = ['CHARA_NAME_INIT', 'EX_TALENTNAME_INIT'];

/**
 * @EVENTLOAD（SYSTEM ver1.0.3.ERB:760-778）：读档成功后的固定钩子。
 *
 * 1:1 移植（对读入的存档数据重放；逐行处置见文件头）。
 */
on(
  'EVENTLOAD',
  async () => {
    // :764 角色名初始化（存根，#105——随角色名初始化票落地）
    stub_line('CHARA_NAME_INIT', '角色名初始化');
    // :766 EX素质名初始化（存根，#105——名称条目补进 yml/Ex_Talent.yml）
    stub_line('EX_TALENTNAME_INIT', 'EX素质名初始化');

    // :768-772 与 :773-774 999 → MAOUNET、1000-1020 → INPORT_B：不可达（读档界面只
    // 放行 0-99），登记不占位——见文件头

    // :779 CALL DATA_FIX 中三处对新档仍有语义的行（判定依据见文件头）。
    // 原作 FOR A,0,CHARANUM 对全部已加入角色（含 0 号位）
    for (const cid of era.getAddedCharacters()) {
      // DATA_FIX.ERB 170205 段：SIF A == MASTER → EX_TALENT:A:200 = 1。
      // MASTER 恒 0（魔王，本作无换主机制）；ex_talent 表随 #138 落地
      if (cid === 0) {
        // EX_TALENT:200 = 魔王（高贵标识）
        era.set('ex_talent:0:200', 1);
      }
      // MAXBASE:0 = 体力上限、MAXBASE:1 = 气力上限（yml/Base.yml 的列名）。
      // || 0 兜底（#13：读未声明序号得 undefined）
      if ((era.get(`maxbase:${cid}:0`) || 0) < 600) {
        era.set(`maxbase:${cid}:0`, 600);
      }
      if ((era.get(`maxbase:${cid}:1`) || 0) < 100) {
        era.set(`maxbase:${cid}:1`, 100);
      }
    }
  },
  TIER.NORMAL,
);

module.exports = { STUBBED_CALLS };
