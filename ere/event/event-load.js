/**
 * @file 读档钩子 @EVENTLOAD（issue #137：C3 读档钩子与自动存档）。
 *
 * Emuera 语义：LOADDATA 是转场命令（与 BEGIN 并列，技能
 * system-flow.md:26）——执行后不回调用方，迁移到 @EVENTLOAD；它跑完后
 * 引擎隐式进入 SHOP 阶段（**不执行 @EVENTSHOP**，同文件 51-53 行）。ere 侧
 * 落点：page-save-load.js 的 load_game 成功分支在 @SYSTEM_LOADGAME 自己的
 * :74-75（EX_FLAG:2801 钳制 + LASTLOAD_NO 自写入）之后 emit 本链，再以
 * begin(STATE.SHOP_AFTER_LOAD) 转场（链内 BEGIN 暂存值覆盖缺省目标——
 * 原作 :769-771 的 BEGIN SHOP 同构）。
 *
 * 逐行处置（复核于 #137）：
 *   - LOADGLOBAL——#137 曾判「ere 引擎行为（global 表在内存、读档不动
 *     它），不镜像」，前提是 global 表变量改完都立即 SAVEGLOBAL（当时的
 *     标题画面开关确实如此）；#547 的 global:3（冒險者性別）改完不即时保存，前提失效，
 *     改为在本链首行镜像 `await era.loadGlobal()`（副作用核对见下）；
 *   - CHARA_NAME_INIT——真身在 chara-name-list.js（#388）：数据已在
 *     yml/NameList.yml，读档后调用是空操作，仅保留调用点可检索；
 *   - EX_TALENTNAME_INIT——非存档的 EX 素质名表初始化，真身在
 *     chara-ex.js；读档后重放，重复调用按守卫早退；
 *   - LASTLOAD_NO == 999 → MAOUNET + SHOP 转场、LASTLOAD_NO ∈ [1000,1020)
 *     → INPORT_B——跨作品数据交换，ere 读档界面只放行 0-99
 *     （page-save-load.js 的槽位分支），LASTLOAD_NO 永远取不到
 *     999/1000+，正常界面不可达；钩子仍保留这两支，供 MAOUNET 的特殊档
 *     流程使用；
 *   - 注释态的 EX_FLAG:2801 钳制——活代码在 load_game（page-save-load.js），
 *     钩子侧保持注释态，不搬；
 *   - 历史补丁体不移植（ADR-0006：修的全是旧档的具体缺陷，「读取旧存档」
 *     已由 #1 判出界）。其中三处对新档仍有语义的行（ADR-0006「逐条判定后
 *     另行安置」，#137 判定依据见下）在本链内等价落地：
 *       1. `SIF A == MASTER → EX_TALENT:A:200 = 1`（魔王高贵标识）——**归
 *          钩子**：历史补丁全库唯一调用点就是读档钩子（读档后重放）；新档
 *          对应写点在 chara-ex.js（#138 已落 ex_talent:0:200），双路径同构。
 *       2. `SIF MAXBASE:A:0 < 600 → 600`、3. `SIF MAXBASE:A:1 < 100 → 100`
 *          （「正太魔王被榨干之后的修正」）——**归钩子**：运行期压低
 *          MAXBASE 的写点（event-addict.js、source-check.js）都自带
 *          600/100 的就地钳制，这两行是读档侧对「存档里已带着的低值」的
 *          兜底重放——只在读档后有意义（新档的 MAXBASE 未被剧情动过），
 *          挪去角色初始化会把时机改错。
 *     其余历史补丁行（TALENT:315/316 取模回填、菲娅修正、EX 素质转移、
 *     FLAG/EX_FLAG 迁移段）全是旧档迁移，一并不移植。
 */

const era = require('#/era-electron');
const { begin, STATE } = require('#/system/flow/begin-signal');
const { on, TIER } = require('#/system/event/registry');
const maounet_mod = require('#/system/cross-save-sharing');
const { ex_talentname_init } = require('#/chara/chara-ex');
const { chara_name_init } = require('#/chara/chara-name-list');
const era_flag = require('#/era-utils/era-flag');

/**
 * @EVENTLOAD：读档成功后的固定钩子。
 *
 * 对读入的存档数据重放；逐行处置见文件头。
 */
on(
  'EVENTLOAD',
  async () => {
    // LOADGLOBAL：global 表整表换回 global.sav 的内容（引擎
    // `this.era.global = n`），丢弃读档前未保存的内存改动——event-first.js
    // 与设置页 [27] 都不即时 SAVEGLOBAL，读档须恢复最近一次保存值
    // （#547 验收第 3 条修正 #137 的判断：当时「global 表变量改完都立即
    // SAVEGLOBAL」的前提被 global:3 打破）。副作用核对过引擎源码：随后
    // listSaveFiles 重扫备注、saveGlobal 写回同值，不动刚读入的存档数据
    await era.loadGlobal();
    // 角色名初始化，真身见 chara-name-list.js（#388）
    chara_name_init();
    // EX素质名初始化（非存档表，读档后重放；重复调用按守卫早退）
    ex_talentname_init();

    // LASTLOAD_NO 999/1000+：普通读档界面仍只放行 0-99，故两支不可达；
    // 保留钩子，供 MAOUNET 的特殊档流程使用。
    if (era_flag.last_load_no === 999) {
      await maounet_mod.maounet();
      begin(STATE.SHOP);
    }
    if (era_flag.last_load_no >= 1000 && era_flag.last_load_no < 1020) {
      await maounet_mod.inport_b();
    }

    // 历史补丁中三处对新档仍有语义的行（判定依据见文件头）。
    // FOR A,0,CHARANUM 对全部已加入角色（含 0 号位）
    for (const cid of era.getAddedCharacters()) {
      // SIF A == MASTER → EX_TALENT:A:200 = 1（历史补丁行，判定依据见文件头）。
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
