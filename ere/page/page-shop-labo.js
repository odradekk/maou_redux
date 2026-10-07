/**
 * @file 秘密实验室：全 52 函数（issue #398 / N14 段 3）。
 *
 * 调用点（这张工单接入）：page/page-shop.js 的 usershop [110] 分支（检查
 * TALENT:0:325 == 1，即 `CALL SECRET_LABO` 的调用位）。
 * 本文件是**单入口的树**：除 secret_labo 外 51 个函数只被本文件内部调用。
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 * 1. **选人骨架收成一处**（`pick_slave`）：本文件 40 余个函数各写一遍同一段
 *    `$INPUT_LOOP`（画提示 → LIFE_LIST → 三个页脚键 → INPUT → 999/1000/1001/
 *    越界/濒死五道公共检查 → 各自的追加检查）。判断条件只有一处真相，页数与列表
 *    不会分家（page-life-list.js 文件头第 4b 条同款处置）。各函数的追加检查走
 *    `guard` 钩子，仍逐条保留原文案与提前返回语义。
 *
 * 2. **MODIFY_* 族表驱动**（工单「共同形状做对，剩下的是数据」）：形状完全
 *    相同的条目落成 `run_modify` + 数据表（价格、提示串、检查、应用），
 *    每条目仍按独立函数导出（modify_bonyu_erase 等），可逐条追溯。形状
 *    有额外菜单/输入/加价的（BUSTUP/BUSTDOWN/FUTANARI/HAIR_COLOR/SKIN_COLOR/
 *    BLOCK_FEELING/DEMON_REBIRTH/ST_UP_LABO/SUMMON_SLAVE/SET_FREE_TRAIN/
 *    TATOO/AMNESIA/RESULECTION/TRANS_SPECIALTALENT/GIVEN_HUMAN_LIFE/
 *    BOUGT_TENTACLES/肉棒改造）各自单写。
 *
 * 3. **固定选项按钮化；需要自由输入的用 `useRule: false`**：
 *    `PRINTL [n] - …` 之类的固定选项在 ere 侧是 `era.printButton(…, n)`
 *    （PR #53 通则，page-tailor.js 先例；**正文里的 `- ` 照写**，它是显示正文
 *    的一部分，见 page-ability-up.js:184）；需要玩家敲任意数字/字符串的输入
 *    （SUMMON_SLAVE 的收录编号 150-199、ST_UP_LABO 的强化次数 1-D、TATOO 的
 *    刺青文字）保留正文为普通文本并用 `era.input({ useRule: false })`——那一轮
 *    的有效取值是**没显示出来的**编号或文字，按钮集给不出。`useRule: false`
 *    只跳过校验、不封锁按钮，与按钮并存是既定做法（event-museum.js:83-85 的
 *    先例即「按钮 + 自由输入」；引擎依据见 tools/engine-contract-facts.mjs 的
 *    `input-userule-false-keeps-buttons`）。**它不能反过来读成「打了按钮自由
 *    输入就进不去」**——那是 #530 的旧推断，#572 已纠正（详见
 *    docs/research/plaintext-options.md 第二节 C 类）。
 *    随之而来的结构性不可达：按钮化之后「输入不在按钮集里」的缺省分支
 *    （各 `ELSE GOTO INPUT_LOOP` / `ELSE RETURN 0`）在实机上不可达，结构保留
 *    不补用例（page-ability-up.js 文件头同款）。
 *    **两处自由文字输入（刺青、自由局部调教）的 0 ＝ 空输入**
 *    （#567）：旧引擎靠「留空」表达消去/重置，ere 侧经共享判断条件
 *    `#/utils/input-text` 把引擎归一后的 0 还原成空串（引擎把 `''` 与 `"0"`
 *    都归一成 0，条件与依据见该模块文件头），两处提示后各补一句输入 0 的说明。
 *
 * 4. **段落跳转（GOTO）用循环标签复刻**，`CLEARLINE`（局部重绘）不镜像
 *    （ere 是滚动视图，page-ability-up.js / page-tailor.js 同款），`PRINTW`
 *    按既有约定显式组合 `era.print + era.waitAnyKey`，
 *    `WAIT` 用 `era.waitAnyKey()`。
 *
 * 5. **`[SKIPSTART]`…`[SKIPEND]` 两段死代码不移植**：「旧ソース」段与追加
 *    素质段按 `SKIPSTART` 语义被跳过，本移植不收。
 *    注意登记在案的跨域写 152 条里**有 62 条落在「旧ソース」段**
 *    （MARK/ABL/PALAM/EXP/CFLAG:15,16/CFLAG:2/TALENT:75,78 的 VARSET 与赋值）
 *    ——扫描器只剥注释、不剥 SKIPSTART 块，故那 62 条是登记在册的死代码，
 *    活代码只有 90 条（下表逐条对照）。
 *
 * 6. **跨域写逐条走属主域门面**（#71/#72，domain-check 强制）：本文件在
 *    ownership 里的 writer 是 stronghold，而 `ere/page/` 文件的域是 page，
 *    故所有落到有属主下标的写都必须经 `chara(cid).<域>.<字段>` / `game.<域>.<字段>`。
 *    152 条里活着的 90 条逐条对照如下（表:下标 → 门面字段；cflag 420/454/455/71
 *    与 cstr 7 五个访问器随这张工单补进 tools/facade-names.js 后重新生成）：
 *
 *    | 写 | 属主域 | 门面 |
 *    | --- | --- | --- |
 *    | talent 116/109/110/114/119、cflag 454/455 | chara | `chara(cid).chara.绝壁/贫乳/巨乳/爆乳/超乳`、`.体重/.胸围` |
 *    | 同上（贫乳化） | chara | 同上 |
 *    | talent 130 | chara | `chara(cid).chara.母乳体质` |
 *    | talent 121/318/1 | chara/train | `chara(cid).chara.扶她/阴茎的状态`、`chara(cid).train.童贞` |
 *    | talent 121 | chara | `chara(cid).chara.扶她` |
 *    | talent 124（两处） | chara | `chara(cid).chara.动物耳朵` |
 *    | talent 310/311 | chara | `chara(cid).chara.阴毛状态/阴毛生长极限` |
 *    | talent 135 | train | `chara(cid).train.未熟` |
 *    | talent 318、cflag 454/455 | chara | `…阴茎的状态`、`…体重/胸围` |
 *    | flag 2 | event | `game.event.上次助手` |
 *    | talent 86 | event | `chara(cid).event.盲从` |
 *    | cflag 2 | chara | `chara(cid).chara.好感度` |
 *    | talent 130（第二处） | chara | `…母乳体质` |
 *    | talent 57、exp 31 | event/system | `chara(cid).event.漏尿癖`、`chara(cid).system.放尿经验` |
 *    | talent 0、cflag 71 | chara/stronghold | `…处女`、`chara(cid).stronghold.处女膜已再生` |
 *    | talent 273（两处） | chara | `…私处封印` |
 *    | talent 300 | chara | `…头发颜色` |
 *    | talent 255/253/244 | chara | `…白皙/褐色肌肤/恶魔肌肤` |
 *    | talent 122/0/121/1 | chara/train | `…男人/处女/扶她`、`chara(cid).train.童贞` |
 *    | exp 50 | dungeon | `chara(cid).dungeon.异常经验` |
 *    | talent 124（第三处） | chara | `…动物耳朵` |
 *    | tflag 13 | train | `game.train.初吻与自我口上`（调教外走 `with_self_kojo_event`） |
 *    | exp 81（四处分发） | event | `chara(0).event.勋章经验` |
 *    | talent 123 | event | `chara(cid).event.疯狂` |
 *    | talent 264 | chara | `…角` |
 *    | talent 244/253/255 | chara | `…恶魔肌肤/褐色肌肤/白皙` |
 *    | talent 245/246/247（三处体征） | chara | `…恶魔翅膀/恶魔尾巴/恶魔眼睛` |
 *    | talent 321/314/322 | chara | `…原种族/种族/现种族` |
 *    | talent 300（转生改发色） | chara | `…头发颜色`（labo_dr_change_hair_color） |
 *    | cflag 13/14 | chara | `…基础攻击/基础防御` |
 *    | talent 257 | chara | `…魔法耐性` |
 *    | cstr 7 | stronghold | `chara(cid).stronghold.自由调教内容` |
 *    | abl 4/40（动态 cid） | train | `chara(local).train.局部感觉/局部中毒` |
 *    | cstr 1 | chara | `chara(new).chara.加入时名字` |
 *    | talent 292、cflag 1/420 | stronghold/invasion/chara | `…魔王之影`、`chara(new).invasion.状态`、`…命名检查` |
 *    | cflag 9、flag 83 | chara/invasion | `chara(0).chara.等级`、`game.invasion.肉便器数` |
 *    | cflag 451/452 | chara | `…年龄/种族年龄` |
 *    | talent 121/318/1（肉棒改造） | chara/train | `…扶她/阴茎的状态`、`…童贞` |
 *
 *    其余属主（talent 9/76/85/125/271/272/280/326/340、cflag 0/10/49/70、
 *    base 10、item 90）都是 stronghold 域：ownership 里 writer 也是 stronghold，
 *    在 cross-domain 清单里不出现；但 ere 侧本文件属 page 域，照样一律走门面。
 *    无属主产物的写（maxbase 0/1、juel、mark/abl/talent/flag 的动态下标段、
 *    cstr 10-19 的刺青位）按 domain-check 的既定政策直写，逐处注明。
 *
 * 7. **一处调用实参与意图不符，按显见意图修正**：modify_amnesia 的育儿支写
 *    `CALL CHILD_CARE_CHANGE_NURSE(C)`，而同一函数的 C 是价格
 *    （`C = 100000`）、角色号在 D —— 对照**旧ソース**那一版
 *    （`C = RESULT` 正是角色号），可知改名时漏改了调用点。本移植按
 *    意图传角色号（`child_care_change_nurse(d)`），否则会把 100000 当角色号
 *    去写数据。
 *
 * 8. **序号世界 → 角色 ID 世界**（issue #21 通例）：「角色号」在 ere 侧
 *    是「角色 ID」，分页窗按位置开（page-life-list.js 文件头第 1 条），
 *    越界判断 `RESULT >= CHARANUM` 相应改为「不在 getAddedCharacters() 里」，
 *    翻页上界仍按 `(NO_PAGE+1)*NUM_PAGE <= charanum()`（角色数含魔王，
 *    与 CHARANUM 是同一个判定标准）。
 */

'use strict';
/* eslint-disable no-irregular-whitespace -- 正文里的全角空格（`　[…]`、`　　此项改造…`、`%SAVESTR:RESULT%　…`，原文标点保留） */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { weapon_restore } = require('#/system/equip/weapon-restore');
const { wearing_cloth_able } = require('#/system/train/cloth');
const { life_list } = require('#/page/page-life-list');
const { change_screen } = require('#/page/components/screen-change');
const { char_size_generate } = require('#/chara/chara-body');
const { char_create } = require('#/chara/chara-custom');
const { add_chara_ex, DECLARED_CHARA_IDS } = require('#/chara/chara-ex');
const {
  MAX_CHARANUM,
  n_breast_grow,
  n_breast_reverse,
  child_care_change_nurse,
} = require('#/chara/chara-pregnancy');
const { get_look_info, KIND } = require('#/chara/look-info');
const { self_kojo } = require('#/kojo/kojo-system');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const {
  chara_callname,
  chara_name,
  chara_nickname,
} = require('#/utils/callname-utils');
const { input_text } = require('#/utils/input-text');

/** MASTER 常量（内置常量，恒 0） */
const MASTER = 0;
/** 选人列表的每页行数（45 处 `#DIM NUM_PAGE = 23`） */
const NUM_PAGE = 23;
/** RAND 的缺省随机源（测试一律显式注入确定序列） */
const default_rand = (n) => Math.floor(Math.random() * n);

// —— 读数助手（跨域读放行，#70 决议）——

/** CFLAG 读数缺省（未声明下标 undefined → 0，#13） */
const cflag = (cid, idx) => era.get(`cflag:${cid}:${idx}`) || 0;
/** TALENT 读数缺省 */
const talent = (cid, idx) => era.get(`talent:${cid}:${idx}`) || 0;
/** ABL 读数缺省 */
const abl = (cid, idx) => era.get(`abl:${cid}:${idx}`) || 0;
/** EXP 读数缺省 */
const exp_of = (cid, idx) => era.get(`exp:${cid}:${idx}`) || 0;
/** MARK 读数缺省 */
const mark = (cid, idx) => era.get(`mark:${cid}:${idx}`) || 0;
/** CSTR 读数缺省（空串） */
const cstr = (cid, idx) => era.get(`cstr:${cid}:${idx}`) ?? '';
/** BASE 读数缺省 */
const base = (cid, idx) => era.get(`base:${cid}:${idx}`) || 0;
/** MAXBASE 读数缺省（无属主产物，读写都不经门面） */
const maxbase = (cid, idx) => era.get(`maxbase:${cid}:${idx}`) || 0;
/** 角色数（CHARANUM，含魔王） */
const charanum = () => era.getAddedCharacters().length;
/** `%TALENTNAME:n%`（引擎静态表 talent 的列名） */
const talentname = (id) => era.get(`talentname:${id}`) ?? '';
/** `%ITEMNAME:n%` */
const itemname = (id) => era.get(`itemname:${id}`) ?? '';
/** 预设的「名前」（不在场的角色也能读） */
const csv_name = (no) => String(era.get(`chara:${no}`)?.name ?? '');
/** `%EXPNAME:n%` */
const expname = (id) => era.get(`expname:${id}`) ?? '';
/** `%ITEMPRICE:n%`（转生门槛 `ITEMPRICE:L_ID / 20` 用） */
const item_price = (id) => era.get(`itemprice:${id}`) || 0;
/** `%SAVESTR:x%`（本作里 = 名前） */
const savestr = (cid) => chara_callname(cid);
/** `%GET_LOOK_INFO(cid, "头发颜色")%` */
const hair_color_name = (cid) => get_look_info(cid, KIND.HAIR_COLOR);

/** 开局设置位图（FLAG:5；era-utils 里没有具名读法，既有消费者一律直读） */
const settings_bitmap = () => era.get('flag:5') || 0;

/** FLAG:5 的两位闸门（GETBIT(FLAG:5,12) / (FLAG:5,15)，各函数同款） */
function bust_regen_enabled() {
  const settings = settings_bitmap();
  return ((settings >> 12) & 1) !== 0 || ((settings >> 15) & 1) !== 0;
}

/**
 * 付费（成对的 `MONEY -= X` 与 `EX_FLAG:4444 -= X`）。
 * @param {number} amount 金额
 */
function pay(amount) {
  era_flag.money -= amount;
  era_exflag.legit_money -= amount;
}

/**
 * `PRINTW` 的等价物：print 一行 + 等键（page-tailor.js:138 的 print_wait 同款）。
 * @param {string} text 提示正文
 */
async function print_wait(text) {
  era.print(text); // PRINTW
  await era.waitAnyKey();
}

/**
 * 「改造前先付费」的公共流程：`MONEY < C` → PRINTW + RETURN 0。
 * @param {number} price 价格
 * @param {string} poor 钱不够的提示
 * @returns {Promise<boolean>} 钱够不够
 */
async function require_money(price, poor) {
  if (era_flag.money < price) {
    await print_wait(poor); // PRINTW
    return false;
  }
  return true;
}

/**
 * 选人画面的一帧（`$INPUT_LOOP` 段的绘制半）。
 *
 * `CUSTOMDRAWLINE =` 以 solid 分割线近似（page-shop-trap.js 文件头的布局
 * 映射先例）；三个页脚键的正文是 `- 上一页 / - 返  回 / - 下一页`。
 *
 * @param {string[]} intro 提示行
 * @param {number} no_page 页码
 * @param {number} mode LIFE_LIST 的 MODE（第 2 实参）
 * @param {string} cancel 取消键正文（缺省「返  回」，GIVEN_HUMAN_LIFE 用「取  消」）
 */
function draw_pick(intro, no_page, mode, cancel) {
  era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =
  for (const text of intro) {
    era.print(text);
  }
  era.drawLine(); // DRAWLINE
  life_list(no_page, mode, NUM_PAGE); // CALL LIFE_LIST(NO_PAGE,,NUM_PAGE)
  // 页脚三个 PRINTLC（`[1000] - 上一页` / `[999] - 返  回` / `[1001] - 下一页`）
  // 打在同一行，紧随的 PRINTL 只结束它们那一行——PRINTLC 左对齐补位、
  // **不换行**，故不产生空行。ere 的 printButton 自成一行（＝ PRINTLC +
  // 收尾的 PRINTL），不再补空行（语义与勘误见 CONTEXT.md「输出 API 的排版
  // 与对齐」）。
  era.printButton('- 上一页', 1000); // PRINTLC [1000] - 上一页
  era.printButton(`- ${cancel}`, 999); // PRINTLC [999] - 返  回
  era.printButton('- 下一页', 1001); // PRINTLC [1001] - 下一页
}

/**
 * 选人循环（各 `$INPUT_LOOP` 段的公共骨架，见文件头第 1 条）。
 *
 * @param {object} cfg 配置
 * @param {string[]} cfg.intro 提示行
 * @param {number} [cfg.mode] LIFE_LIST 的 MODE
 * @param {boolean} [cfg.master] 是否接受魔王（`SIF RESULT == 0 → RESULT = MASTER`
 *   的档为真；SOULBOUND 族等 `RESULT < 1` 的档为假）
 * @param {string} [cfg.cancel] 取消键正文
 * @param {(cid: number) => (null | string | {text: string, wait: boolean})} [cfg.guard]
 *   追加检查：null 放行；字符串 = 提示后等键并 RETURN 0；对象可关掉等待
 * @returns {Promise<{cancelled: boolean, cid?: number}>}
 */
async function pick_slave(cfg) {
  let no_page = 0; // #DIM NO_PAGE = 0
  for (;;) {
    // 每轮绘制前换屏：画面上只有当前这一屏（ADR-0009）——这是全部选人
    // 画面的公共骨架，一处接入覆盖所有条目
    await change_screen();
    draw_pick(cfg.intro, no_page, cfg.mode ?? 1, cfg.cancel ?? '返  回');
    const result = await era.input(); // INPUT

    if (result === 999) {
      return { cancelled: true }; // 等 RETURN 0
    }
    if (result === 1000) {
      // 上一页：NO_PAGE > 0 才退（CLEARLINE 不镜像）
      if (no_page > 0) {
        no_page -= 1;
      }
      continue;
    }
    if (result === 1001) {
      // 下一页：(NO_PAGE+1)*NUM_PAGE <= CHARANUM 才进
      if ((no_page + 1) * NUM_PAGE <= charanum()) {
        no_page += 1;
      }
      continue;
    }
    if (result < 0 || !era.getAddedCharacters().includes(result)) {
      continue; // RESULT < 0 || RESULT >= CHARANUM → GOTO INPUT_LOOP
    }
    if (base(result, 0) < 1) {
      continue; // 臨死中のキャラは排除
    }
    if (cfg.master === false && result === MASTER) {
      continue; // RESULT == MASTER → GOTO INPUT_LOOP（SOULBOUND 族）
    }
    const verdict = cfg.guard ? cfg.guard(result) : null;
    if (verdict !== null && verdict !== undefined) {
      const text = typeof verdict === 'string' ? verdict : verdict.text;
      era.print(text);
      if (typeof verdict === 'string' || verdict.wait !== false) {
        await era.waitAnyKey(); // PRINTFORMW / PRINTW
      }
      return { cancelled: true }; // 各检查的 RETURN 0
    }
    return { cancelled: false, cid: result };
  }
}

/**
 * 是非确认（各 `PRINTL  [0] - 好的` / `PRINTL  [1] - 不要` + INPUT）。
 * @param {string} [yes] 肯定键正文
 * @param {string} [no] 否定键正文
 * @returns {Promise<number>} 0 或 1
 */
async function ask_yes_no(yes = '好的', no = '不要') {
  era.printButton(`- ${yes}`, 0);
  era.printButton(`- ${no}`, 1);
  return era.input();
}

/**
 * 族的公共驱动：钱的初检 → 选人 → 确认 → 应用 → 扣款。
 *
 * 对应每个 modify_* 条目的同一形状（以 modify_bonyu 为例）：定价 →
 * 钱不够则退出 → `$INPUT_LOOP` 选人 → 确认 → 应用 → 扣款 → `RETURN 1`。
 *
 * @param {object} item 条目（price/poor/intro/guard/confirm/apply 等）
 * @param {(n: number) => number} rand 随机源（透传给需要重算身体的条目）
 * @returns {Promise<number>} 1 成交 / 0 取消或检查拦下
 */
async function run_modify(item, rand) {
  if (!(await require_money(item.price, item.poor))) {
    return 0;
  }
  for (;;) {
    const picked = await pick_slave({
      intro: item.intro,
      mode: item.mode,
      master: item.master,
      cancel: item.cancel,
      guard: item.guard,
    });
    if (picked.cancelled) {
      return 0;
    }
    const cid = picked.cid;
    for (const text of item.confirm(cid)) {
      era.print(text);
    }
    const answer = await ask_yes_no();
    if (answer === 1) {
      return 0; // IF RESULT == 1 → RETURN 0
    }
    if (answer === 0) {
      item.apply(cid, rand); // 结果文案 + 变量写入
      pay(item.price); // MONEY -= C / EX_FLAG:4444 -= C
      if (item.after) {
        item.after(cid, rand); // 应用之后的追加动作（身体重算等）
      }
      // apply 的结果文案在回主菜单屏前经按键确认（ADR-0009）——全部
      // 条目的 apply 都打印，这里必等且只等一次
      await era.waitAnyKey();
      return 1;
    }
    if (item.confirm_else === 'return') {
      return 0; // 少数条目的 `ELSE RETURN 0`
    }
    // 其余条目 `ELSE GOTO INPUT_LOOP`（按钮化之后不可达，见文件头第 3 条）
  }
}

/**
 * 胸围重算（modify_bustup/bustdown/deimmaturity 的公共尾段）。
 *
 * 角色不是魔王且 FLAG:5 的位 12/15 任一开时，跑
 * `CALL CHAR_SIZE_GENERATE, T, CFLAG:T:451, 1` 并把返回值 3/4 写回
 * CFLAG:454（体重）/455（胸围）。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} rand 随机源
 */
function regenerated_bust(cid, rand) {
  if (cid === MASTER) {
    return; // IF T != 0
  }
  if (!bust_regen_enabled()) {
    return; // GETBIT(FLAG:5,12) || GETBIT(FLAG:5,15)
  }
  const body = char_size_generate(cid, cflag(cid, 451), 1, rand);
  chara(cid).chara.体重 = body[3]; // CFLAG:T:454 = RESULT:3
  chara(cid).chara.胸围 = body[4]; // CFLAG:T:455 = RESULT:4
}

// ————————————————————————————————————————————————
// MODIFY_* 族（形状相同的一批，见文件头第 2 条）
// ————————————————————————————————————————————————

/** 阳具形状的显示名（`《巨根》` 等，0 = 普通） */
const FUTANARI_SHAPES = ['普通', '巨根', '短小包茎', '包茎', '马阴茎'];

/** modify_bustup：丰胸改造（已有巨乳/爆乳时加价到 50000）。 */
async function modify_bustup(rand = default_rand) {
  if (!(await require_money(20000, '钱不多，胸不大'))) {
    return 0; // （C = 20000）
  }
  for (;;) {
    const picked = await pick_slave({
      intro: ['改造后，改造对象的乳房将增大到一个新的层次', '要为谁丰胸？'],
      master: true,
      guard: (cid) => {
        if (talent(cid, 122)) {
          return `【${talentname(122)}】不能巨乳化。`;
        }
        if (talent(cid, 119)) {
          return `知足吧，${savestr(cid)}的胸，已经是奇尺大乳了。`;
        }
        return null;
      },
    });
    if (picked.cancelled) {
      return 0;
    }
    const cid = picked.cid;
    let cost = 20000; // C = 20000
    if (talent(cid, 110) || talent(cid, 114)) {
      // 已是大胸：先报加价，钱不够则回选人（GOTO INPUT_LOOP，
      // 「这样还要继续么？」在 SIF 之后，钱不够时打不出来）
      era.print(`${savestr(cid)}胸部伟岸，要更上一层楼，需要50000点。`);
      cost = 50000;
      if (era_flag.money < cost) {
        continue;
      }
      era.print('这样还要继续么？');
    } else {
      era.print(`为${savestr(cid)}进行巨乳化改造吗？`);
    }
    const answer = await ask_yes_no();
    if (answer === 1) {
      return 0;
    }
    if (answer !== 0) {
      return 0; // 的 ELSE RETURN 0（不可达，见文件头第 3 条）
    }
    // 乳房档位递升。**不调 N_BREAST_GROW**：那条函数是妊娠/母乳
    // 路径的升档，文案与档位取舍都不同——这里采用这一份档位取舍（超乳不再升）
    if (talent(cid, 116)) {
      era.print(`《${savestr(cid)}的【${talentname(109)}】消去了》`);
      chara(cid).chara.绝壁 = 0; // TALENT:T:116 = 0
      chara(cid).chara.贫乳 = 1; // TALENT:T:109 = 1
    } else if (talent(cid, 109)) {
      era.print(`《${savestr(cid)}的胸是标准大小》`);
      chara(cid).chara.贫乳 = 0;
    } else if (talent(cid, 110)) {
      era.print(`《${savestr(cid)}获得【${talentname(114)}】了》`);
      chara(cid).chara.巨乳 = 0;
      chara(cid).chara.爆乳 = 1;
    } else if (talent(cid, 114)) {
      era.print(`《${savestr(cid)}获得【${talentname(119)}】了》`);
      chara(cid).chara.爆乳 = 0;
      chara(cid).chara.超乳 = 1;
    } else {
      era.print(`《${savestr(cid)}获得【${talentname(110)}】了》`);
      chara(cid).chara.巨乳 = 1;
    }
    pay(cost);
    regenerated_bust(cid, rand);
    // 档位播报在回选人/主菜单屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/** modify_bustdown：平胸改造。 */
async function modify_bustdown(rand = default_rand) {
  if (!(await require_money(10000, '钱不够'))) {
    return 0; // （C = 10000）
  }
  for (;;) {
    const picked = await pick_slave({
      intro: ['改造对象的乳房将变小到一个新的层次。', '要推平谁的胸？'],
      master: true,
      guard: (cid) => {
        if (talent(cid, 122)) {
          return `【${talentname(122)}】不能贫乳化。`;
        }
        if (talent(cid, 116)) {
          return `${savestr(cid)}已经平如镜子，放过她吧。`;
        }
        return null;
      },
    });
    if (picked.cancelled) {
      return 0;
    }
    const cid = picked.cid;
    era.print(`对${savestr(cid)}进行贫乳改造吗？`);
    const answer = await ask_yes_no();
    if (answer === 1) {
      return 0;
    }
    if (answer !== 0) {
      return 0; // 的 ELSE RETURN 0
    }
    // 乳房档位递降（文案与 N_BREAST_REVERSE 的档位取舍不同：超乳不再升，既有行为）
    if (talent(cid, 119)) {
      era.print(`《${savestr(cid)}获得了【${talentname(114)}】》`);
      chara(cid).chara.超乳 = 0;
      chara(cid).chara.爆乳 = 1;
    } else if (talent(cid, 114)) {
      era.print(`《${savestr(cid)}获得了【${talentname(110)}】》`);
      chara(cid).chara.爆乳 = 0;
      chara(cid).chara.巨乳 = 1;
    } else if (talent(cid, 110)) {
      era.print(`《${savestr(cid)}的胸是标准大小》`);
      chara(cid).chara.巨乳 = 0;
    } else if (talent(cid, 109)) {
      era.print(`《${savestr(cid)}的胸部线条完全没有了》`);
      chara(cid).chara.贫乳 = 0;
      chara(cid).chara.绝壁 = 1;
    } else {
      era.print(`《${savestr(cid)}获得了【${talentname(109)}】》`);
      chara(cid).chara.贫乳 = 1;
    }
    pay(10000);
    regenerated_bust(cid, rand);
    // 档位播报在回选人/主菜单屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/** modify_bonyu：母乳体质化。 */
const MODIFY_BONYU_ITEM = {
  price: 50000,
  poor: '有钱的孩子才有奶喝',
  intro: ['活化改在对象的乳腺，让她分泌母乳。', '要将谁母乳化？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 122)) {
      return `【${talentname(122)}】不能改造母乳体质。`;
    }
    if (talent(cid, 109) || talent(cid, 116)) {
      return '死心吧，这么小的胸，要挤奶也无从下手。';
    }
    if (talent(cid, 130)) {
      return `${savestr(cid)}已经是母乳体质了。`;
    }
    return null;
  },
  confirm: (cid) => [`将${savestr(cid)}母乳体质化吗？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}的母乳，现在随时为你待命了》`);
    chara(cid).chara.母乳体质 = 1;
  },
  after: (cid, rand) => n_breast_grow(cid, rand), // CALL N_BREAST_GROW, T
};

/** modify_bonyu */
async function modify_bonyu(rand = default_rand) {
  return run_modify(MODIFY_BONYU_ITEM, rand);
}

/** modify_futanari：扶她化（附阳具形状菜单）。 */
async function modify_futanari() {
  if (!(await require_money(50000, '这么穷，就不要这么变态啦。'))) {
    return 0; // （C = 50000）
  }
  for (;;) {
    const picked = await pick_slave({
      intro: [
        '将改造对象的阴蒂给阳具化，',
        '在卵巢内加入精囊一样的组织。',
        '要将谁扶她化？',
      ],
      master: true,
      guard: (cid) => {
        if (talent(cid, 121) || talent(cid, 122)) {
          return `${savestr(cid)}已经有兵器了。`;
        }
        return null;
      },
    });
    if (picked.cancelled) {
      return 0;
    }
    const cid = picked.cid;
    era.print(`给${savestr(cid)}怎么样的阳具呢？？`);
    // 阳具形状选项
    for (const [index, label] of FUTANARI_SHAPES.entries()) {
      era.printButton(`- ${label}`, index);
    }
    era.printButton('- 停止', 999);
    const shape = await era.input(); // INPUT
    if (shape === 999) {
      return 0;
    }
    if (shape < 0 || shape > 4) {
      continue; // 的 ELSE GOTO INPUT_LOOP（不可达）
    }
    era.print(`《${savestr(cid)}获得【${talentname(121)}】了》`);
    era.print('阴茎的状态：'); // PRINT
    era.print(`《${FUTANARI_SHAPES[shape]}》`);
    chara(cid).chara.扶她 = 1;
    chara(cid).stronghold.肉芽诅咒 = 0; // TALENT:T:326 = 0（属主 stronghold）
    chara(cid).chara.阴茎的状态 = shape;
    chara(cid).train.童贞 = 1;
    pay(50000);
    // 改造播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/** modify_futanari_erase：去扶她化。 */
const MODIFY_FUTANARI_ERASE_ITEM = {
  price: 10000,
  poor: '钱不够，快快去挣钱',
  intro: ['扶她消去', '要消去谁的扶她呢？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 122)) {
      return '本作暂不提供阉割功能！';
    }
    if (talent(cid, 121) === 0) {
      return '没有可消去的阴茎';
    }
    return null;
  },
  confirm: (cid) => [`将${savestr(cid)}的阴茎消去么？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}的【${talentname(121)}】消去了》`);
    chara(cid).chara.扶她 = 0;
  },
};

/** modify_futanari_erase */
async function modify_futanari_erase() {
  return run_modify(MODIFY_FUTANARI_ERASE_ITEM);
}

/** modify_animal：赋予动物耳朵。 */
const MODIFY_ANIMAL_ITEM = {
  price: 2000,
  poor: '钱不够',
  intro: [
    '将用动物的遗传因子覆盖改造对象的一部分遗传因子。',
    '赋予谁动物耳朵呢？',
  ],
  master: true,
  guard: (cid) =>
    talent(cid, 124) ? `${savestr(cid)}已经有动物耳朵了。` : null,
  confirm: (cid) => [`赋予${savestr(cid)}动物耳朵吗？`],
  apply: (cid) => {
    if (talent(cid, 314) === 2) {
      // 人狼（种族 2）的场合换文案
      era.print(
        `《${chara_name(cid)}取得人狼的象征【${talentname(124)}】了！》`,
      );
    } else {
      era.print(`《${chara_name(cid)}长出【${talentname(124)}】了》`);
    }
    chara(cid).chara.动物耳朵 = 1;
  },
};

/** modify_animal */
async function modify_animal() {
  return run_modify(MODIFY_ANIMAL_ITEM);
}

/** modify_animal_erase：去除动物耳朵。 */
const MODIFY_ANIMAL_ERASE_ITEM = {
  price: 1000,
  poor: '钱不够',
  intro: ['消去动物耳朵', '消去谁的动物耳朵？'],
  master: true,
  guard: (cid) => (talent(cid, 124) === 0 ? '没有动物耳朵给你消去' : null),
  confirm: (cid) => [`要消去${savestr(cid)}的动物耳朵吗？`],
  apply: (cid) => {
    if (talent(cid, 314) === 2) {
      era.print(
        `《${chara_name(cid)}失去了人狼的象征【${talentname(124)}】了……》`,
      );
    } else {
      era.print(`《${chara_name(cid)}的【${talentname(124)}】消去了》`);
    }
    chara(cid).chara.动物耳朵 = 0;
  },
};

/** modify_animal_erase */
async function modify_animal_erase() {
  return run_modify(MODIFY_ANIMAL_ERASE_ITEM);
}

/** modify_removehair：永久脱毛（白虎）。 */
const MODIFY_REMOVEHAIR_ITEM = {
  price: 5000,
  poor: '钱不够',
  intro: ['阴毛长了还分叉？魔王帮你一劳永逸！', '帮谁永久脱毛呢？？'],
  master: true,
  guard: (cid) => (talent(cid, 125) ? `${savestr(cid)}本来就是白虎。` : null),
  confirm: (cid) => [`帮${savestr(cid)}永久脱毛吗？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}获得【${talentname(125)}】了》`);
    chara(cid).stronghold.白虎 = 1;
    chara(cid).chara.阴毛状态 = 1;
    chara(cid).chara.阴毛生长极限 = 1;
  },
};

/** modify_removehair */
async function modify_removehair() {
  return run_modify(MODIFY_REMOVEHAIR_ITEM);
}

/** modify_deimmaturity：消去未熟。 */
const MODIFY_DEIMMATURITY_ITEM = {
  price: 10000,
  poor: '钱不够',
  intro: ['把改造对象的性器发育，可以进行正常性行为。', '要消去谁的未熟呢？'],
  master: true,
  guard: (cid) =>
    talent(cid, 135) === 0 ? `${savestr(cid)}不是未熟的人。` : null,
  confirm: (cid) => [`消去${savestr(cid)}的未熟么？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}的【${talentname(135)}】消去了》`);
    era.print(`《${savestr(cid)}的身体发育了》`);
    chara(cid).train.未熟 = 0;
  },
  // 除去未熟后性征成长（男性/扶她降一档阴茎状态；非男性重算胸围）
  after: (cid, rand) => {
    if (cid === MASTER) {
      return; // IF T != 0
    }
    if (talent(cid, 122) || talent(cid, 121)) {
      if (talent(cid, 318) > 1) {
        chara(cid).chara.阴茎的状态 = talent(cid, 318) - rand(2);
      }
      // 「念のため」的下限钳制
      if (talent(cid, 318) < 0) {
        chara(cid).chara.阴茎的状态 = 0;
      }
    }
    if (talent(cid, 122) === 0) {
      regenerated_bust(cid, rand);
    }
  },
};

/** modify_deimmaturity */
async function modify_deimmaturity(rand = default_rand) {
  return run_modify(MODIFY_DEIMMATURITY_ITEM, rand);
}

/** modify_amnesia：记忆消去（ABL/MARK/JUEL 全清）。 */
async function modify_amnesia() {
  if (!(await require_money(100000, '钱不够'))) {
    return 0; // （C = 100000）
  }
  const picked = await pick_slave({
    intro: [
      '维持改造对象的肉体及感觉不变，',
      '将记忆恢复到调教开始之前。',
      '要消除谁的记忆呢？',
    ],
    mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
    master: false, // RESULT == MASTER → GOTO INPUT_LOOP
  });
  if (picked.cancelled) {
    return 0;
  }
  const d = picked.cid; // D = RESULT
  era.print(`要消除${savestr(d)}的记忆吗？`);
  const answer = await ask_yes_no();
  if (answer === 1) {
    return 0;
  }
  if (answer !== 0) {
    return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
  }

  // 助手だった場合は解除
  if (era_flag.assi === d) {
    era_flag.assi = 0;
  }
  // 前回助手だった場合は解除
  if (game.event.上次助手 === d) {
    game.event.上次助手 = -1;
  }

  // ABL / MARK / JUEL / 特殊性癖（74-78）全清（动态下标，无属主判定）
  for (let local = 0; local < 100; local += 1) {
    era.set(`abl:${d}:${local}`, 0); // ABL:D:LOCAL = 0
  }
  for (let local = 0; local < 100; local += 1) {
    era.set(`mark:${d}:${local}`, 0); // MARK:D:LOCAL = 0
  }
  for (let local = 0; local < 100; local += 1) {
    era.set(`juel:${d}:${local}`, 0); // JUEL:D:LOCAL = 0
  }
  for (let local = 74; local < 79; local += 1) {
    era.set(`talent:${d}:${local}`, 0); // TALENT:D:LOCAL = 0
  }

  // 陥落系素質
  chara(d).stronghold.爱慕 = 0; // TALENT:D:85 = 0
  chara(d).event.盲从 = 0; // TALENT:D:86 = 0

  // CFLAG の初期化
  chara(d).stronghold.出售与助手资格 = 0; // CFLAG:D:0 = 0
  chara(d).chara.好感度 = 0; // CFLAG:D:2 = 0
  chara(d).stronghold.调教回数 = 0; // CFLAG:D:10 = 0

  era.print(`《${savestr(d)}失去调教之后的所有记忆了》`);
  await era.waitAnyKey(); // WAIT

  // 妊娠していた場合
  if (talent(d, 153)) {
    era.print(
      '由于身体传来的异样感，让他不由自主地向下看着自己突然膨胀起来的腹部，',
    );
    era.print(`让${chara_nickname(d)}整个人呆愣失神了……`);
    await era.waitAnyKey(); // WAIT
    if (talent(d, 155) === 0 && talent(d, 12) === 0) {
      era.print(`${chara_nickname(d)}的心中有什么东西坏掉了……`);
      era.print(`${chara_nickname(d)}的精神【${talentname(9)}】了`);
      chara(d).stronghold.崩坏 = 1; // TALENT:D:9 = 1
      await era.waitAnyKey(); // WAIT
    }
  }
  // 育児中だった場合
  if (talent(d, 154)) {
    era.print(`${chara_nickname(d)}猛然发现自己在抚养着婴儿……`);
    await era.waitAnyKey(); // WAIT
    if (talent(d, 155) || talent(d, 63)) {
      era.print(
        `自己的乳房被陌生的婴儿含在嘴里、${chara_nickname(d)}露出了不可思议的神情、`,
      );
      era.print(
        `但似乎下定了决心、${savestr(d)}抱起婴儿，把自己的乳头托到了婴儿的嘴边。`,
      );
      era.print(`《${savestr(d)}继续照顾起了孩子》`);
      await era.waitAnyKey(); // WAIT
    } else {
      era.print(
        `自己的乳房被陌生的婴儿含在嘴里、${chara_nickname(d)}露出了惊异莫名的神情`,
      );
      // CALL CHILD_CARE_CHANGE_NURSE(C) 的实参写错——C 是价格、角色号在 D，
      // 改名时漏改了调用点，按意图传角色号（文件头第 7 条）
      await child_care_change_nurse(d);
    }
  }

  pay(100000);
  return 1;
}

/** modify_bonyu_erase：消去母乳体质。 */
const MODIFY_BONYU_ERASE_ITEM = {
  price: 10000,
  poor: '钱不够',
  intro: ['乳腺的退化改造。', '要消去谁的母乳体质呢？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 130) === 0) {
      return '没有母乳体质';
    }
    if (talent(cid, 153)) {
      return '孕妇无法消去母乳体质';
    }
    if (talent(cid, 154)) {
      return '育儿中的女人无法消去母乳体质';
    }
    return null;
  },
  confirm: (cid) => [`消去${savestr(cid)}的母乳体质么？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}不再分泌母乳了》`);
    chara(cid).chara.母乳体质 = 0;
  },
  after: (cid, rand) => n_breast_reverse(cid, rand), // CALL N_BREAST_REVERSE, T
};

/** modify_bonyu_erase */
async function modify_bonyu_erase(rand = default_rand) {
  return run_modify(MODIFY_BONYU_ERASE_ITEM, rand);
}

/** modify_omorashi_erase：消除漏尿癖。 */
const MODIFY_OMORASHI_ERASE_ITEM = {
  price: 10000,
  poor: '钱不够',
  intro: ['治疗漏尿的问题', '消除谁的漏尿癖？'],
  master: true,
  guard: (cid) => (talent(cid, 57) === 0 ? '没有漏尿癖' : null),
  confirm: (cid) => [`消去${savestr(cid)}的漏尿癖吗？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}的漏尿癖被治好了》`);
    chara(cid).event.漏尿癖 = 0;
    chara(cid).system.放尿经验 = 0;
  },
};

/** modify_omorashi_erase */
async function modify_omorashi_erase() {
  return run_modify(MODIFY_OMORASHI_ERASE_ITEM);
}

/** shojo_saisei：处女膜再生术。 */
const SHOJO_SAISEI_ITEM = {
  price: 100000,
  poor: '钱不够',
  intro: ['生命没有第二次，但处女膜可以。', '再生谁的处女膜？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 122)) {
      return '怎么看都是不可能的了，真的谢谢了。'; // PRINTW
    }
    if (talent(cid, 0)) {
      return `${savestr(cid)}本来就是处女。`; // PRINTFORM：换屏规则下改为提示后等键（ADR-0009）
    }
    return null;
  },
  confirm: (cid) => [`再生${savestr(cid)}的处女膜吗？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}获得【${talentname(0)}】》`);
    chara(cid).chara.处女 = 1;
    // CFLAG:T:71 += 1
    chara(cid).stronghold.处女膜已再生 = chara(cid).stronghold.处女膜已再生 + 1;
  },
};

/** shojo_saisei */
async function shojo_saisei() {
  return run_modify(SHOJO_SAISEI_ITEM);
}

/** shojo_seal：施加私处封印。 */
const SHOJO_SEAL_ITEM = {
  price: 10000,
  poor: '钱不够',
  intro: ['封印对象的性器。', '要封印谁的性器呢？'],
  master: true,
  guard: (cid) =>
    talent(cid, 273) ? `${savestr(cid)}的性器已经被封印了。` : null, // PRINTFORM
  confirm: (cid) => [`封印${savestr(cid)}的性器吗？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}获得【${talentname(273)}】》`);
    chara(cid).chara.私处封印 = 1;
  },
};

/** shojo_seal */
async function shojo_seal() {
  return run_modify(SHOJO_SEAL_ITEM);
}

/** shojo_seal_off：解除私处封印。 */
const SHOJO_SEAL_OFF_ITEM = {
  price: 10000,
  poor: '穷鬼玩啥处女啊！',
  intro: ['解除对象的性器封印', '要解除谁的封印呢？'],
  master: true,
  guard: (cid) =>
    talent(cid, 273) === 0 ? `${savestr(cid)}本来就没有被封印。` : null, // PRINTFORM
  confirm: (cid) => [`解除${savestr(cid)}的封印吗？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}的【${talentname(273)}】失去了》`);
    chara(cid).chara.私处封印 = 0;
  },
};

/** shojo_seal_off */
async function shojo_seal_off() {
  return run_modify(SHOJO_SEAL_OFF_ITEM);
}

// ————————————————————————————————————————————————
// 带专属输入流程的条目
// ————————————————————————————————————————————————

/** 刺青部位表（TATOO_NAME:10-17，下标即 CSTR 位） */
const TATOO_NAME = {
  10: '脸',
  11: '胸',
  12: '背',
  13: '下腹',
  14: '屁股',
  15: '性器',
  16: '肛门',
  17: '大腿',
};

/**
 * tatoo_set_off：刺青的刻印/消去（部位 ＋ 自由文字两段输入）。
 *
 * 刺青位 CSTR:10-19 在 ownership 里无测量事实（cstr 表实测下标 11 个，
 * 不含 10-19），且寻址含变量段、本就是动态下标——按 domain-check 的既定
 * 政策直写（文件头第 6 条末段）。
 */
async function tatoo_set_off() {
  const cost = 10000; // COST = 10000
  if (!(await require_money(cost, '钱不够'))) {
    return 0;
  }
  const picked = await pick_slave({
    intro: ['消除对象的刺青', '要消除谁的刺青？'],
    master: true,
  });
  if (picked.cancelled) {
    return 0;
  }
  const target = picked.cid; // TATOO_TARGET = RESULT

  // 部位一览
  era.print(`${savestr(target)}的刺青`);
  era.print(' '); // PRINTL（一个空格）
  for (const [index, label] of Object.entries(TATOO_NAME)) {
    // `[{TATOO_COUNT}] %TATOO_NAME:..%	 - 『%CSTR:..%』`
    era.printButton(
      `${label}	 - 『${cstr(target, Number(index))}』`,
      Number(index),
    );
  }
  era.printButton('- 停止', 999);

  let select = 0;
  for (;;) {
    const result = await era.input(); // INPUT
    if (result === 999) {
      return 0;
    }
    if (TATOO_NAME[result]) {
      era.print(`${TATOO_NAME[result]}的刺青被处理了。`);
      select = result; // TATOO_SELECT = RESULT
      break;
    }
    return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
  }

  era.print('请自由输入想雕刻的刺青，留空代表将要被消去。');
  const current = cstr(target, select);
  if (current !== '') {
    era.print(`现在雕刻的刺青是：『${current}』。`);
  } else {
    era.print('现在雕刻的刺青是：没有');
  }

  // ere 侧补的输入 0 说明（#567：引擎不受理空提交，0 是「不输入」的等价输入）
  era.print('（输入 0 消去刺青）');
  const results = input_text(await era.input({ useRule: false })); // INPUTS
  if (results !== '') {
    era.print(`在${TATOO_NAME[select]}雕刻『${results}』刺青吗？`);
  } else {
    era.print(`消去${TATOO_NAME[select]}的刺青吗？`);
  }
  const answer = await ask_yes_no();
  if (answer === 1) {
    return 0;
  }
  if (answer !== 0) {
    return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
  }
  if (results !== '') {
    era.print(`《${TATOO_NAME[select]}上雕刻了『${results}』的刺青》`);
  } else {
    era.print(`《${TATOO_NAME[select]}的刺青消去了》`);
  }
  // CSTR:TATOO_TARGET:TATOO_SELECT = %RESULTS%（动态下标，直写）
  era.set(`cstr:${target}:${select}`, results);
  pay(cost);
  // 刺青播报在回选人屏前经按键确认（ADR-0009）
  await era.waitAnyKey();
  return 1;
}

/** modify_hair_color：头发颜色改变（角色 ＋ 颜色两段菜单）。 */
async function modify_hair_color() {
  if (!(await require_money(5000, '金钱不足'))) {
    return 0; // （C = 5000）
  }
  // 的 RESTART 回到函数头（局部变量回 #DIM 默认值、TARGET 等
  // 全局不回退）——用带标签的外层循环复刻，不新开栈帧
  restart: for (;;) {
    const picked = await pick_slave({
      intro: ['想给谁改变头发颜色？'],
      master: true,
    });
    if (picked.cancelled) {
      return 0;
    }
    const t = picked.cid; // T = RESULT

    // 颜色菜单
    const colors = ['金色', '栗色', '黑色', '红色', '银色', '蓝色', '绿色'];
    let col = 0;
    for (;;) {
      era.print(`变成什么颜色？（现在：${hair_color_name(t)}）`);
      for (const [index, name] of colors.entries()) {
        era.printButton(name, index);
      }
      era.printButton('- 算了，居然没有光头……', 999);
      const result = await era.input();
      if (result === 999) {
        continue restart; // RESTART（回函数头重选角色）
      }
      if (result < 0 || result > 6) {
        continue; // LOOP !INRANGE(RESULT, 0, 6)（不可达）
      }
      col = result + 1; // COL = RESULT + 1
      break;
    }

    // 确认（临时 SWAP 取显示名再换回）
    for (;;) {
      const before = talent(t, 300);
      chara(t).chara.头发颜色 = col; // SWAP TALENT:T:头发颜色, COL
      const shown = hair_color_name(t); // GET_LOOK_INFO
      chara(t).chara.头发颜色 = before; // SWAP 换回
      era.print(`要将${savestr(t)}的头发变成${shown}吗？`);
      const answer = await ask_yes_no('确定', '取消');
      if (answer === 1) {
        return 0;
      }
      if (answer === 0) {
        break;
      }
      return 0; // LOOP RESULT != 0（不可达）
    }
    chara(t).chara.头发颜色 = col; // TALENT:T:头发颜色 = COL
    era.print(`《${savestr(t)}的发色变成【${hair_color_name(t)}】了》`);
    pay(5000);
    // 发色播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/** modify_skin_color：肤色改变（普通/白皙/褐色三档）。 */
async function modify_skin_color() {
  if (!(await require_money(5000, '没钱还想整容？！'))) {
    return 0; // （C = 5000）
  }
  // 的 RESTART 回到函数头（重选角色）——带标签的外层循环复刻
  restart: for (;;) {
    const picked = await pick_slave({
      intro: ['给谁变换肤色？'],
      master: true,
    });
    if (picked.cancelled) {
      return 0;
    }
    const t = picked.cid; // T = RESULT

    // 现在的肤色
    let current;
    if (talent(t, 255)) {
      current = '白皙';
    } else if (talent(t, 253)) {
      current = '褐色肌肤';
    } else if (talent(t, 244)) {
      current = '恶魔肌肤';
    } else {
      current = '普通肤色';
    }

    const skin_names = ['普通肌肤', '白皙', '褐色肌肤']; // LOCALS
    let col = 0;
    for (;;) {
      era.print(`想要变成什么肤色？（现在：${current}）`);
      for (const [index, name] of skin_names.entries()) {
        era.printButton(name, index);
      }
      era.printButton('- 取消', 999);
      const result = await era.input();
      if (result === 999) {
        continue restart; // RESTART（回函数头重选角色）
      }
      if (result < 0 || result > 2) {
        continue; // LOOP !INRANGE(RESULT, 0, 2)（不可达）
      }
      col = result; // COL = RESULT
      break;
    }
    for (;;) {
      era.print(`将${savestr(t)}变为${skin_names[col]}吗？`);
      const answer = await ask_yes_no('确定', '取消');
      if (answer === 1) {
        return 0;
      }
      if (answer === 0) {
        break;
      }
      return 0; // LOOP RESULT != 0（不可达）
    }
    // 先三清再置一
    chara(t).chara.白皙 = 0;
    chara(t).chara.褐色肌肤 = 0;
    chara(t).chara.恶魔肌肤 = 0;
    if (col === 1) {
      chara(t).chara.白皙 = 1;
    } else if (col === 2) {
      chara(t).chara.褐色肌肤 = 1;
    }
    era.print(`《${savestr(t)}的${current}变成${skin_names[col]}了》`);
    pay(5000);
    // 肤色播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/** 部位号 → 钝感素质下标（`PID * 2 + 101`） */
const PID_TALENT = [101, 103, 105, 107];
/** 部位号 → 能力下标（PAID 映射：0→0、1→2、2→3、3→1） */
const PID_ABL = [0, 2, 3, 1];
/** 部位号 → 默认名（阴核感觉/私处感觉/肛门感觉/乳房感觉） */
const PID_NAMES = ['阴核感觉', '私处感觉', '肛门感觉', '乳房感觉'];
/** 部位号 → 钝感素质的访问器名（与 PID_TALENT 同序） */
const PID_TALENT_NAMES = ['阴蒂钝感', '私处钝感', '肛门钝感', '乳房钝感'];
/** 部位号 → 男性文案 */
const PID_LABEL_MALE = ['阴茎', '私处', '肛门', '乳房'];
/** 部位号 → 女性文案 */
const PID_LABEL_FEMALE = ['阴核', '私处', '肛门', '乳房'];

/**
 * block_feeling：感觉封锁（角色 → 部位两段菜单）。
 *
 * 部位的钝感位是 TALENT:101/103/105/107 的第 2 位（`|= 2`），经门面读改写。
 */
async function block_feeling() {
  if (!(await require_money(20000, '金钱不足'))) {
    return 0; // （C = 20000）
  }
  // 的 GOTO CHAR_TOP（重选角色）——带标签的外层循环复刻
  char_top: for (;;) {
    const picked = await pick_slave({
      intro: [
        '感觉封锁，被封锁的部位，感觉被锁定。其它性感带的感觉提升。',
        '封锁谁的感觉？',
      ],
      master: true,
    });
    if (picked.cancelled) {
      return 0;
    }
    const cid = picked.cid; // CID = RESULT

    // 选部位（GOTO PART_TOP 的循环）
    for (;;) {
      era.print(`封锁${savestr(cid)}哪个部位？`);
      era.print(''); // PRINTL

      // 四个部位的按钮（已封锁 = bit2，以灰显标注）
      for (let pid = 0; pid < 4; pid += 1) {
        if (pid === 1 && talent(cid, 122)) {
          continue; // SIF !TALENT:CID:122（男性不画私处行）
        }
        const label =
          pid === 0
            ? talent(cid, 122)
              ? '阴茎感觉'
              : '阴核感觉'
            : PID_NAMES[pid];
        const blocked = (talent(cid, PID_TALENT[pid]) & 2) !== 0;
        if (blocked) {
          // 封锁后把编号换成 `-`（灰显 + 点不动）：按钮化会
          // 把编号原样留着，于是「点已封锁部位」变成可达——这里仍打文本行
          era.print(`　[-] ${label}　已经封锁`);
        } else {
          // 未封锁时渲染的是 `　[0] 阴茎感觉`：那个 `-` 在方括号**内**，
          // 是 `\@ FLAG_B ? - # 0 \@` 三元式的真分支（编号替身），**不是分隔符**
          // ——正文不能再写 `- `（#612 反向普查改正）
          era.printButton(label, pid);
        }
      }
      era.print(''); // PRINTL
      era.printButton('选择角色', 9); // [9] 选择角色
      era.drawLine(); // DRAWLINE
      era.printButton('- 取消', 999);

      const pid = await era.input(); // INPUT
      if (pid === 9) {
        continue char_top; // GOTO CHAR_TOP（回选人）
      }
      if (pid === 999) {
        return 0;
      }
      if (pid < 0 || pid > 3) {
        continue; // 无支（按钮外输入不可达）
      }
      if (abl(cid, PID_ABL[pid]) > 0) {
        era.print('已经超过LV1以上的部位无法封锁'); // PRINTL
        await era.waitAnyKey(); // WAIT
        continue; // GOTO PART_TOP
      }
      if ((talent(cid, PID_TALENT[pid]) & 2) !== 0) {
        era.print('已经封锁过了'); // PRINTL
        await era.waitAnyKey(); // WAIT
        continue; // GOTO PART_TOP
      }
      era.print('　　此项改造属于小白鼠专用，魔王表示一但实行就无法逆转');
      era.print('　　确定要执行？');
      era.print(''); // PRINTL
      era.printButton('　　　- 走你！', 0);
      era.printButton('　　　- 容我三思……', 1);
      const answer = await era.input(); // INPUT
      if (answer === 0) {
        // TALENT:CID:(PID * 2 + 101) |= 2（读改写经门面）
        chara(cid).chara[PID_TALENT_NAMES[pid]] =
          talent(cid, PID_TALENT[pid]) | 2;
        pay(20000);
        const part_label = talent(cid, 122)
          ? PID_LABEL_MALE[pid]
          : PID_LABEL_FEMALE[pid];
        era.print(`　　《${savestr(cid)}的${part_label}被封锁了》`);
        await era.waitAnyKey(); // WAIT
        era.print(''); // PRINTL
      }
      if (era_flag.money >= 20000) {
        continue; // SIF MONEY >= C → GOTO PART_TOP
      }
      return 0; // 落到函数底（隐式返回 0）
    }
  }
}

/** trans_sex：变性。 */
const TRANS_SEX_ITEM = {
  price: 200000,
  poor: '钱不够',
  intro: [
    '更改对象的性别。',
    '一但换了，就不能再换回原来的了。除非是魔王。',
    '要更换谁的性别？',
  ],
  master: true,
  guard: (cid) => {
    if (cflag(cid, 70) && cid !== MASTER) {
      return `${savestr(cid)}已经被性转过了。`;
    }
    return null;
  },
  confirm: (cid) => [`更改${savestr(cid)}的性别吗？`],
  apply: (cid) => {
    if (talent(cid, 122)) {
      // 男人ならそれを外す
      era.print(`《${savestr(cid)}的【${talentname(122)}】被消去了》`);
      chara(cid).chara.男人 = 0;
      chara(cid).chara.处女 = 1;
      chara(cid).train.童贞 = 0;
    } else {
      // 男人でなければ男人をつける（扶她先消去）
      if (talent(cid, 121)) {
        era.print(`《${savestr(cid)}的【${talentname(121)}】被消去了》`);
        chara(cid).chara.扶她 = 0;
      }
      era.print(`《${savestr(cid)}获得【${talentname(122)}】了》`);
      chara(cid).chara.男人 = 1;
      chara(cid).chara.处女 = 0;
      chara(cid).train.童贞 = 1;
    }
    era.print(`${expname(50)}＋1`); // PRINTFORMW %EXPNAME:50%＋{Z}（Z = 1）
    chara(cid).dungeon.异常经验 = exp_of(cid, 50) + 1; // EXP:T:50 += Z
    chara(cid).stronghold.已性转 = 1; // CFLAG:T:70 = 1
  },
};

/** trans_sex */
async function trans_sex() {
  return run_modify(TRANS_SEX_ITEM);
}

/**
 * brain_washing：洗脑。
 *
 * 费用与附加素质由主分发传入（`C` 与 `B`）。
 * @param {number} cost 费用
 * @param {number} b 追加的素质编号
 */
async function brain_washing(cost, b) {
  if (!(await require_money(cost, '钱不够'))) {
    return 0;
  }
  const picked = await pick_slave({
    intro: ['外部改写洗脑对象的深层心理。', `给谁附加【${talentname(b)}】？`],
    mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
    master: false, // RESULT == MASTER → GOTO INPUT_LOOP
    guard: (cid) => {
      if (talent(cid, b)) {
        return `${savestr(cid)}已经有【${talentname(b)}】了。`;
      }
      if (cid !== MASTER && cflag(cid, 0) < 2) {
        return '不能洗脑不可做助手的角色。';
      }
      if (talent(cid, 121) === 0 && talent(cid, 122) === 0 && b === 133) {
        return `不是【${talentname(122)}】和【${talentname(121)}】不能附加该素质，没有相应设备。`;
      }
      if (talent(cid, 152)) {
        return `【${talentname(152)}】的人不能被洗脑。`;
      }
      return null;
    },
  });
  if (picked.cancelled) {
    return 0;
  }
  const cid = picked.cid;
  era.print(`为${savestr(cid)}附加【${talentname(b)}】吗？`);
  const answer = await ask_yes_no();
  if (answer === 1) {
    return 0;
  }
  if (answer !== 0) {
    return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
  }
  era.print(`${savestr(cid)}获得【${talentname(b)}】了。`);
  era.set(`talent:${cid}:${b}`, 1); // TALENT:T:B = 1（参数化下标，直写）
  await era.waitAnyKey(); // WAIT
  pay(cost);
  return 1;
}

/** bougt_tentacles：购买触手生物。 */
async function bougt_tentacles() {
  if (!(await require_money(50000, '钱不够'))) {
    return 0; // （C = 50000）
  }
  for (;;) {
    era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =
    era.print(`${itemname(90)}是身体改造失败的性奴隶的悲催下场……`);
    era.print(`　购买${itemname(90)}吗？`);
    era.drawLine(); // DRAWLINE
    const answer = await ask_yes_no();
    if (answer === 0) {
      era.print(`《${itemname(90)}入手了》`);
      game.stronghold.触手生物 = 1; // ITEM:90 = 1
      pay(50000);
      await era.waitAnyKey(); // WAIT
      return 1;
    }
    if (answer === 1) {
      return 0;
    }
    // GOTO INPUT_LOOP（不可达）
  }
}

/**
 * `CALL ADDCHARA_EX`（`TRYCALLFORM CHARA_EX_{NO:ARG}` 的分发入口）：
 * 对没有分发实现的编号，旧引擎按缺省静默跳过，而 `chara-ex.js` 的分发
 * 家族把「声明空间外」判成拼写错误会抛。本文件两处调用点的编号来自玩家输入
 * 或数据表（召唤 150-199、苏生 1-100），不是代码里的字面量，先问声明空间，
 * 不在里面就照旧静默跳过。
 * @param {number} cid 角色 ID
 * @returns {Promise<void>}
 */
async function add_chara_ex_defined(cid) {
  if (DECLARED_CHARA_IDS.includes(cid)) {
    await add_chara_ex(cid);
  }
}

/**
 * 调教外借 TFLAG:13 传口上事件码（game.train 的既有承载：
 * 据点期没有 tflag 表，with_self_kojo_event 用调用链内的临时值承载）。
 * @param {number} event 事件码
 * @param {() => Promise<unknown>} callback 口上调用
 * @returns {Promise<unknown>}
 */
function with_self_kojo(event, callback) {
  return game.train.with_self_kojo_event(event, callback);
}

/** given_human_life：赋予生命（延长寿命，消耗勋章）。 */
async function given_human_life(rand = default_rand) {
  if (exp_of(MASTER, 81) <= 0) {
    era.print('人的生命是金钱无法购买的……'); // PRINTW
    await era.waitAnyKey();
    return 0;
  }
  const picked = await pick_slave({
    intro: [
      '人的生命是无法直接触摸的',
      '然而某些特殊之人',
      '可以通过转换他人生命的方式为其延长寿命',
      '为谁续命？',
    ],
    mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
    cancel: '取  消', // PRINTLC [999] - 取  消
    master: true, // 条件是 RESULT < 0（魔王 0 可被选中）
    guard: (cid) => {
      if (talent(cid, 85) === 0) {
        return `${savestr(cid)}已经没有继续留在人间的理由了。`;
      }
      if (base(cid, 10) === 0 && talent(cid, 124) === 0) {
        return `${savestr(cid)}已经拥有超长的寿命了`;
      }
      return null;
    },
  });
  if (picked.cancelled) {
    return 0;
  }
  const t = picked.cid;
  if (base(t, 10) === 0) {
    // 非人类且无动物耳朵：只提示，不返回（继续往下走）
    era.print(`${savestr(t)}并非人类、`);
    era.print('作为那个种族的特性，原本已经远超人类的寿命');
    era.print('已经无法再延长了'); // PRINT
  }
  era.print(`为${savestr(t)}延长寿命？`);
  const answer = await ask_yes_no(
    '你一秒，我一秒，蛤蛤蛤蛤…………',
    '算了，水表还没换',
  );
  if (answer === 1) {
    return 0;
  }
  if (answer !== 0) {
    return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
  }
  if (talent(t, 124)) {
    era.print(`${savestr(t)}的寿命被延长了`);
    chara(t).chara.动物耳朵 = 0; // TALENT:T:124 = 0
  }
  if (base(t, 10) > 0) {
    era.print(`${savestr(t)}的寿命还有很久，无需延长。`);
    chara(t).stronghold.寿命 = 0; // BASE:T:10 = 0
  }
  await era.waitAnyKey(); // WAIT
  // 口上（TFLAG:13 = 15 + CALL SELF_KOJO）
  await with_self_kojo(15, () => self_kojo(rand, undefined, true));
  era.print('《失去了【勋章】》');
  chara(MASTER).event.勋章经验 = 0; // EXP:MASTER:81 = 0
  await era.waitAnyKey(); // WAIT
  return 1;
}

/** resulection：死者苏生（消耗勋章，复活 1000-1099 号标记的亡者）。 */
async function resulection() {
  if (exp_of(MASTER, 81) <= 0) {
    era.print('人的生命可是无法购买的……'); // PRINTW
    await era.waitAnyKey();
    return 0;
  }
  // 一次能持有的奴隶数上限
  if (charanum() > 30) {
    await print_wait('这个世界好像已经没有亡者容身之所了');
    return 0;
  }
  if (settings_bitmap() !== 9 && charanum() > 10) {
    // FLAG:5 != 9
    await print_wait('这个世界好像已经没有亡者容身之所了');
    return 0;
  }
  // 有没有可复活的（FLAG:1000-1099 < 0）
  let d = 0;
  for (let count = 0; count < 100; count += 1) {
    if ((era.get(`flag:${count + 1000}`) || 0) < 0) {
      d += 1;
    }
  }
  if (d === 0) {
    era.print('找不到想要唤醒的人'); // PRINTW
    await era.waitAnyKey();
    return 0;
  }
  // 确认
  for (;;) {
    era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =
    era.print('过去从这个世界上消失和逝去的人，');
    era.print('所有的记忆都将被忘记，');
    era.print('好似重获新生一般出现在你面前。');
    era.print('……这样的结果，是你想要的吗？');
    era.drawLine(); // DRAWLINE
    const answer = await ask_yes_no('确定', '取消');
    if (answer === 1) {
      return 0;
    }
    if (answer === 0) {
      break;
    }
    // ELSE GOTO INPUT_LOOP_00（不可达）
  }
  // 选人（按钮 100-199 = 预设 1-100）
  let revived = 0;
  for (;;) {
    era.drawLine(); // DRAWLINE
    era.print('想要苏醒谁？');
    era.drawLine(); // DRAWLINE
    for (let count = 0; count < 100; count += 1) {
      const c = count + 1000;
      const idx = count + 100;
      if ((era.get(`flag:${c}`) || 0) <= -2) {
        // 亡者已不在场，名字只能取预设数据；ITEMNAME 100-199 是魔物名表，
        // 和亡者对不上，而且有一半编号没有声明（#740）。正文带「- 」（#612）
        era.printButton(`- ${csv_name(count + 1)}`, idx);
      }
    }
    era.printButton('- 取消', 999);
    const result = await era.input();
    if (result === 999) {
      return 0;
    }
    if (result < 100 || result > 199) {
      continue; // GOTO INPUT_LOOP_01
    }
    const c = result + 900; // C = RESULT + 900
    if ((era.get(`flag:${c}`) || 0) >= 0) {
      continue; // 的 ELSE GOTO INPUT_LOOP_01（标记不为负 = 不可复活）
    }
    // 加入角色并做专属初始化：`ADDCHARA D`（D = RESULT - 99，
    // 即预设编号），`C = CHARANUM - 1` 在新加入即末位的序号世界等于 D——
    // ere 侧角色 ID 就是预设编号（文件头第 8 条）
    const preset = result - 99; // D = RESULT - 99
    era.addCharacter(preset); // ADDCHARA D
    revived = preset; // C = CHARANUM - 1
    await add_chara_ex_defined(revived); // CALL ADDCHARA_EX, CHARANUM-1
    era.set(`flag:${c}`, -1); // FLAG:C = -1（购买标记）
    era.print(`《${savestr(revived)}被从彼岸召唤回来了》`);
    era_flag.target = revived; // TARGET = C
    await era.waitAnyKey(); // WAIT
    break;
  }
  era.print('《失去了【勋章】》');
  chara(MASTER).event.勋章经验 = 0; // EXP:MASTER:81 = 0
  await era.waitAnyKey(); // WAIT
  return 1;
}

/** cure_insane：安抚崩坏的心（消耗 30 勋章）。 */
const CURE_INSANE_ITEM = {
  price: 0, // 消耗的是勋章（30 枚），不走 MONEY 支
  poor: '',
  intro: [
    '也许对这些动不动就坏掉的脆弱奴隶来说，坏掉反而更幸福吧！',
    '面对这等弱者，没必要浪费时间慢慢哄！食脑魔，给我上！！',
    '消耗三十个勋章，恢复谁的理智？',
  ],
  mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
  master: true, // 条件是 RESULT < 0（0 可选中）
  guard: (cid) => {
    if (talent(cid, 9) === 0 && talent(cid, 123) === 0) {
      return `${savestr(cid)}的精神没有崩坏。`;
    }
    return null;
  },
  confirm: (cid) => [`恢复${savestr(cid)}的理智么？`],
  apply: (cid) => {
    if (talent(cid, 9)) {
      era.print(`《${savestr(cid)}的瞳孔，再度射出理性的光辉了。》`);
      chara(cid).stronghold.崩坏 = 0; // TALENT:T:9 = 0
    }
    if (talent(cid, 123)) {
      era.print(`《${savestr(cid)}从无尽的噩梦中苏醒了。》`);
      chara(cid).event.疯狂 = 0; // TALENT:T:123 = 0
    }
  },
};

/** cure_insane：勋章门槛在 run 里单独判。 */
async function cure_insane() {
  if (exp_of(MASTER, 81) <= 30) {
    era.print('勋章，是最好的药啊魔王大人！'); // PRINTW
    await era.waitAnyKey();
    return 0;
  }
  const ret = await run_modify(CURE_INSANE_ITEM);
  if (ret === 1) {
    era.print('《【勋章】不见了》');
    chara(MASTER).event.勋章经验 = exp_of(MASTER, 81) - 30; // EXP:MASTER:81 -= 30
    await era.waitAnyKey(); // WAIT
  }
  return ret;
}

/** reget_chastity_key：寻访贞操带钥匙（消耗 1 枚勋章）。 */
async function reget_chastity_key() {
  if (exp_of(MASTER, 81) <= 0) {
    era.print('穷……是世上最无可奈何的事…………'); // PRINTW
    await era.waitAnyKey();
    return 0;
  }
  const picked = await pick_slave({
    intro: ['把那该死的贞操带钥匙找回来！', '要寻找谁的贞操带钥匙呢？'],
    mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
    master: true, // 条件是 RESULT < 0（0 可选中）
    guard: (cid) => {
      if (cflag(cid, 49) === 0) {
        return `没有${chara_nickname(cid)}贞操带钥匙的必要。`;
      }
      return null;
    },
  });
  if (picked.cancelled) {
    return 0;
  }
  const t = picked.cid;
  era.print(`确认寻找${savestr(t)}的贞操带钥匙吗？`);
  const answer = await ask_yes_no();
  if (answer === 1) {
    return 0;
  }
  if (answer !== 0) {
    return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
  }
  era.print(`《${savestr(t)}的贞操带钥匙找到了》`);
  chara(t).stronghold.贞操带钥匙已丢弃 = 0; // CFLAG:T:49 = 0
  era.print('《【勋章】不见了》');
  chara(MASTER).event.勋章经验 = 0; // EXP:MASTER:81 = 0
  await era.waitAnyKey(); // WAIT
  return 1;
}

/** horn：赋予犄角。 */
const HORN_ITEM = {
  price: 20000,
  poor: '角可是很贵的',
  intro: ['让奴隶的头上长出犄角', '要让谁长出犄角呢？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 264) === 1) {
      return `${savestr(cid)}已经长着犄角了。`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`让${savestr(cid)}长出犄角吗？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}长出了犄角》`);
    chara(cid).chara.角 = 1; // TALENT:T:264 = 1
  },
};

/** horn */
async function horn() {
  return run_modify(HORN_ITEM);
}

/** 四改造的「已经有了」措辞（名字之后的部分） */
const EVIL_ALREADY = {
  244: '的肌肤已经是蓝色的了。',
  245: '已经长着恶魔的翅膀了。',
  246: '已经长着恶魔的尾巴了。',
  247: '已经有恶魔的眼睛了。',
};

/** 恶魔四改造的共同检查 */
function evil_body_guard(index) {
  return (cid) => {
    if (talent(cid, index) === 1) {
      return `${savestr(cid)}${EVIL_ALREADY[index]}`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  };
}

/** evilapp：恶魔体征改造的分发菜单。 */
async function evilapp() {
  era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =
  era.print('要进行什么样的恶魔改造呢？？');
  era.drawLine(); // DRAWLINE
  era.printButton('- 恶魔的蓝色肌肤', 1);
  era.printButton('- 恶魔的翅膀', 2);
  era.printButton('- 恶魔的尾巴', 3);
  era.printButton('- 恶魔的眼睛', 4);
  era.printButton('- 返  回', 999); // PRINTLC
  // 的 PRINTL 只结束 [999] 那一行（PRINTLC 不换行，见 CONTEXT.md
  // 「输出 API 的排版与对齐」）；ere 的 printButton 自成一行（＝ PRINTLC +
  // 收尾的 PRINTL），不再补空行。
  const result = await era.input();
  if (result === 999) {
    return 0;
  }
  if (result === 1) {
    return blueskin();
  }
  if (result === 2) {
    return evilwing();
  }
  if (result === 3) {
    return eviltail();
  }
  if (result === 4) {
    return evilsight();
  }
  return 0; // 无 ELSE（按钮外输入不可达）
}

/** blueskin：恶魔的蓝色肌肤。 */
const BLUESKIN_ITEM = {
  price: 20000,
  poor: '钱不够',
  intro: ['改造成为恶魔的蓝色肌肤', '赋予谁蓝色肌肤？'],
  master: true,
  guard: evil_body_guard(244),
  confirm: (cid) => [`赋予${savestr(cid)}恶魔肌肤吗？`],
  apply: (cid) => {
    if (talent(cid, 253) === 1 || talent(cid, 255) === 1) {
      // 褐色肌肤或白皙被恶魔肌肤取代时的措辞
      const from = talent(cid, 253) === 1 ? '褐色肌肤' : '白皙';
      era.print(`《${savestr(cid)}的${from}变成恶魔肌肤了》`);
    } else {
      era.print(`《${savestr(cid)}获得恶魔般的肌肤了》`);
    }
    chara(cid).chara.恶魔肌肤 = 1; // TALENT:T:244 = 1
    chara(cid).chara.褐色肌肤 = 0;
    chara(cid).chara.白皙 = 0;
  },
};

/** blueskin */
async function blueskin() {
  return run_modify(BLUESKIN_ITEM);
}

/** evilwing：恶魔的翅膀。 */
const EVILWING_ITEM = {
  price: 20000,
  poor: '钱不够',
  intro: ['给对象赋予恶魔的翅膀。', '给谁赋予恶魔的翅膀呢？'],
  master: true,
  guard: evil_body_guard(245),
  confirm: (cid) => [`赋予${savestr(cid)}恶魔的翅膀吗？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}长出了恶魔的翅膀》`);
    chara(cid).chara.恶魔翅膀 = 1;
  },
};

/** evilwing */
async function evilwing() {
  return run_modify(EVILWING_ITEM);
}

/** eviltail：恶魔的尾巴。 */
const EVILTAIL_ITEM = {
  price: 20000,
  poor: '钱不够',
  intro: ['赋予对象恶魔的尾巴。', '要赋予谁恶魔的尾巴呢？'],
  master: true,
  guard: evil_body_guard(246),
  confirm: (cid) => [`赋予${savestr(cid)}恶魔的尾巴？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}长出恶魔的尾巴了》`);
    chara(cid).chara.恶魔尾巴 = 1;
  },
};

/** eviltail */
async function eviltail() {
  return run_modify(EVILTAIL_ITEM);
}

/** evilsight：恶魔的眼睛。 */
const EVILSIGHT_ITEM = {
  price: 20000,
  poor: '钱不够',
  intro: ['赋予对象恶魔的眼睛。', '要赋予谁恶魔的眼睛呢？'],
  master: true,
  guard: evil_body_guard(247),
  confirm: (cid) => [`赋予${savestr(cid)}恶魔的眼睛？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}获得了恶魔的眼睛》`);
    chara(cid).chara.恶魔眼睛 = 1;
  },
};

/** evilsight */
async function evilsight() {
  return run_modify(EVILSIGHT_ITEM);
}

/** 魔族类型表（TYPEDATA，11 行 × 若干列） */
const DEMON_TYPES = [
  [133, 143, 153, 163, 160, 170], // 男巫/女巫/男祭司/女忍/黑暗骑士/女祭司
  [104, 113, 114, 172, 181], // 丧尸/丧尸虫/丧尸猎犬/吸血鬼/死亡领主
  [110, 130, 121, 150], // 兽人/巨魔/食人魔/巨人
  [101, 111, 123, 134, 164, 171], // 哥布林/熊地精/小仙子/报丧女妖/小精灵/无头骑士
  [100, 120], // 狗头人/蜥蜴人
  [102, 131, 142, 173, 184], // 黏液怪/石像鬼/史莱姆/幽灵/眼魔
  [122, 141, 151, 162, 183], // 食铠者/地狱猎犬/奇美拉/食脑魔/梦魇
  [103, 124, 174], // 龙头苍蝇/毒蜈蚣/死亡蝎
  [112, 144], // 藤蔓怪/吸血树
  [132, 140, 180], // 小恶魔/下等恶魔/大恶魔
  [154, 152, 182], // 夜少女/魅魔/莉莉丝
];

/** 转生附加素质（两条活代码；SKIPSTART 段不移植，见文件头第 5 条） */
const DEMON_BONUS = {
  狗头人: [124, '头上长出【动物耳】了！'],
  丧尸猎犬: [124, '头上长出【动物耳】了！'],
  地狱猎犬: [124, '头上长出【动物耳】了！'],
  奇美拉: [124, '头上长出【动物耳】了！'],
  梦魇: [124, '头上长出【动物耳】了！'],
  魅魔: [91, '的肉体上散发出致命的诱惑，获得了【魅惑】……'],
  莉莉丝: [91, '的肉体上散发出致命的诱惑，获得了【魅惑】……'],
};

/**
 * 类型条件表（COND）：0 = 条件不满足（灰显 + 拒绝）。
 * 只有 1（恶魔肌肤）、2（魁梧）、9（四件恶魔体征）、10（四件 + 淫乱）四行
 * 有条件，其余行恒 1。
 * @param {number} cid 角色 ID
 * @returns {number[]} 11 行的条件位
 */
function demon_conditions(cid) {
  const cond = new Array(11).fill(1); // VARSET COND, 1
  if (!talent(cid, 244)) {
    cond[1] = 0; // SIF !TALENT:T:恶魔肌肤
  }
  if (!talent(cid, 307)) {
    cond[2] = 0; // SIF !TALENT:T:魁梧
  }
  if (
    (talent(cid, 244) &&
      talent(cid, 247) &&
      talent(cid, 245) &&
      talent(cid, 246)) === 0
  ) {
    cond[9] = 0;
  }
  if (
    (talent(cid, 244) &&
      talent(cid, 247) &&
      talent(cid, 245) &&
      talent(cid, 246) &&
      talent(cid, 76)) === 0
  ) {
    cond[10] = 0;
  }
  return cond;
}

/** labo_dr_get_talent：转生时补一项素质（缺了才补并报文案）。 */
function labo_dr_get_talent(cid, index, message) {
  if (!talent(cid, index)) {
    era.set(`talent:${cid}:${index}`, 1); // （参数化下标，直写）
    era.print(''); // PRINTL
    era.print(`${savestr(cid)}${message}`); // PRINTFORMW
  }
}

/** labo_dr_change_hair_color：转生时改发色。 */
function labo_dr_change_hair_color(cid, color) {
  if (talent(cid, 300) !== color) {
    era.print(`${savestr(cid)}的头发颜色从${hair_color_name(cid)}`); // PRINTFORM
    chara(cid).chara.头发颜色 = color; // TALENT:ARG:头发颜色 = ARG:1
    era.print(`变成${hair_color_name(cid)}了`); // PRINTFORMW
  }
}

/**
 * demon_rebirth：转生的秘法（选魔族类型 → 确认 → 转生）。
 */
async function demon_rebirth(rand = default_rand) {
  if (!(await require_money(50000, '没钱还想换壳？'))) {
    return 0; // （C = 50000）
  }
  // 的 RESTART（类型菜单的 [999] 回函数头重选角色）——
  // 带标签的外层循环复刻，不新开栈帧
  restart: for (;;) {
    const picked = await pick_slave({
      intro: [
        '转生的秘法将会抽取对象的灵魂，将其投入魔族的身体',
        '抽取谁的灵魂？',
      ],
      master: true, // SIF RESULT == 0 → MASTER
      guard: (cid) => {
        if (cflag(cid, 1) === 2) {
          return `${savestr(cid)}还不在你的统治之下。`;
        }
        return null;
      },
    });
    if (picked.cancelled) {
      return 0;
    }
    const t = picked.cid; // T = RESULT

    era.drawLine(); // DRAWLINE
    if (talent(t, 314) !== 9 && talent(t, 322) > 0) {
      era.print(
        `要让${savestr(t)}（${itemname(talent(t, 322))}）转生为何种魔族？`,
      );
    } else {
      era.print(`要让${savestr(t)}转生为何种魔族？`);
    }
    era.drawLine(); // DRAWLINE
    // 类型按钮：ere 侧一个按钮一行（PRINTCPERLINE 折行不镜像）；
    // 条件不满足/等级不够的项按 SETCOLORBYNAME GRAY 灰显，仍可点
    const cond = demon_conditions(t);
    for (const [row, ids] of DEMON_TYPES.entries()) {
      for (const [col, id] of ids.entries()) {
        if (talent(t, 322) === id) {
          continue; // 现种族与它相同的跳过
        }
        era.printButton(`${itemname(id)}`, row * 10 + col);
      }
    }
    era.drawLine(); // DRAWLINE
    era.printButton('返回', 999); // `[999] 返回`

    // 类型选择
    let type_id = 0;
    for (;;) {
      const result = await era.input(); // INPUT 999
      if (result === 999) {
        continue restart; // RESTART（回函数头重选角色）
      }
      const row = Math.trunc(result / 10); // L_T = RESULT / 10
      const col = result % 10; // L_I = RESULT % 10
      const id = (DEMON_TYPES[row] ?? [])[col] ?? 0; // L_ID = TYPEDATA:L_T:L_I
      if (id <= 0) {
        continue; // CLEARLINE 1 + GOTO INPUT_LOOP_1（不可达）
      }
      if (cond[row] === 0 || cflag(t, 9) < Math.trunc(item_price(id) / 20)) {
        // 条件不足：等级与素质提示
        era.print(
          `${savestr(t)}必须达到Lv${Math.trunc(item_price(id) / 20)}（当前Lv${cflag(t, 9)}）`,
        );
        if (cond[row] === 0) {
          era.print('且具备');
          for (let count = 1; count < 5; count += 1) {
            era.print(`[${talentname(243 + count)}]`);
          }
          if (row === 10) {
            era.print('[淫乱]');
          }
        }
        await era.waitAnyKey(); // WAIT
        continue; // GOTO INPUT_LOOP_1
      }
      if (talent(t, 322) === id) {
        era.print(`${savestr(t)}已经是${itemname(id)}了`);
        await era.waitAnyKey();
        return 0;
      }
      type_id = id; // TYPEN = L_ID
      break;
    }

    // 确认与转生
    for (;;) {
      era.print(`确定要将${savestr(t)}转生为${itemname(type_id)}吗？`);
      const answer = await ask_yes_no('确定', '取消');
      if (answer === 1) {
        return 0;
      }
      if (answer !== 0) {
        return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
      }
      // 种族切换（原种族只在首次转生时记录）
      if (talent(t, 314) !== 9) {
        chara(t).chara.原种族 = talent(t, 314);
      }
      chara(t).chara.种族 = 9;
      chara(t).chara.现种族 = type_id;
      era.print('浓郁的魔力充斥四周………');
      era.print(`${savestr(t)}的转生仪式成功了，已经转生为`);
      era.print(`《【魔族中的${itemname(talent(t, 322))}】了》`);

      // 付加素質（SKIPSTART 段不移植，见文件头第 5 条）
      const bonus = DEMON_BONUS[itemname(type_id)];
      if (bonus) {
        labo_dr_get_talent(t, bonus[0], bonus[1]); // 的两支活代码
      }
      // 头发颜色（1/3 概率变，1-7 之一）
      if (rand(3) === 0) {
        labo_dr_change_hair_color(t, rand(7) + 1);
      }
      pay(50000);
      // 转生播报在回选人屏前经按键确认（ADR-0009）
      await era.waitAnyKey();
      return 1;
    }
  }
}

/** soulbound：魂缚的诅咒。 */
const SOULBOUND_ITEM = {
  price: 10000,
  poor: '金钱不足',
  intro: [
    '魂缚实施之后，目标在心智上将不会再有半点动摇，',
    '各种刻印和好感度的增减都会被锁定，',
    '要对谁施展？',
  ],
  mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
  master: false, // RESULT < 1
  guard: (cid) => {
    if (chara(cid).stronghold.魂缚) {
      return `${savestr(cid)}的灵魂已经被束缚过了`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`${savestr(cid)}施展魂缚吗？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}的灵魂》`);
    chara(cid).stronghold.魂缚 = 1; // TALENT:T:魂缚 = 1
  },
};

/** soulbound */
async function soulbound() {
  return run_modify(SOULBOUND_ITEM);
}

/** soulbound_erase：魂缚的解咒。 */
const SOULBOUND_ERASE_ITEM = {
  price: 50000,
  poor: '金钱不足',
  intro: ['将目标从魂缚的状态解除', '要选谁做为目标呢？'],
  mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
  master: false, // RESULT < 1
  guard: (cid) => {
    if (!chara(cid).stronghold.魂缚) {
      return `${savestr(cid)}的灵魂没有被束缚`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`${savestr(cid)}的魂缚状态解除吗？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}的魂缚状态解除了》`);
    chara(cid).stronghold.魂缚 = 0;
  },
};

/** soulbound_erase */
async function soulbound_erase() {
  return run_modify(SOULBOUND_ERASE_ITEM);
}

/** encharmed_erase：狂王俘虏的消去。 */
const ENCHARMED_ERASE_ITEM = {
  price: 50000,
  poor: '金钱不足',
  intro: ['把目标曾被狂王俘虏的印记消去', '要消去谁的？'],
  master: true, // SIF RESULT == 0 → MASTER
  guard: (cid) => {
    if (!talent(cid, 280)) {
      return `你确定${savestr(cid)}曾被狂王俘虏过？`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`将${savestr(cid)}被狂王俘虏的印记消去？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}的【${talentname(280)}】被消去了》`);
    chara(cid).stronghold.狂王俘虏 = 0;
  },
};

/** encharmed_erase */
async function encharmed_erase() {
  return run_modify(ENCHARMED_ERASE_ITEM);
}

/** st_up_labo 的四项名称（PRINT HP / 气力 / 攻击 / 防御） */
const ST_UP_NAMES = ['HP', '气力', '攻击', '防御'];

/**
 * st_up_labo：能力值强化（HP/气力/攻击/防御，次数手输）。
 *
 * 费用与项目由主分发传入（`C = 5000` 与 `B = 0..3`）。
 * @param {number} cost 单价
 * @param {number} b 项目（0 = HP / 1 = 气力 / 2 = 攻击 / 3 = 防御）
 */
async function st_up_labo(cost, b) {
  if (!(await require_money(cost, '钱不够'))) {
    return 0;
  }
  // 的 GOTO INPUT_LOOP（「数值太大了」后重来整段，标签在选人画面
  // 之前）——带标签的外层循环复刻
  input_loop: for (;;) {
    const picked = await pick_slave({
      intro: [
        `强化奴隶的${ST_UP_NAMES[b]}`, // （PRINT + PRINTL）
        '要强化谁呢？',
      ],
      master: true,
      guard: (cid) =>
        cflag(cid, 1) === 2 ? `${savestr(cid)}还不在你的统治之下。` : null,
    });
    if (picked.cancelled) {
      return 0;
    }
    const t = picked.cid;
    // 上限检查（每项的上限公式各不相同）
    const caps = [
      [maxbase(t, 0), 2000 + cflag(t, 9) * 50, '*HP的成长到极限了*'],
      [maxbase(t, 1), 2000 + cflag(t, 9) * 50, '*气力的成长到极限了*'],
      [cflag(t, 13), cflag(t, 9) * 5, '*攻击值的成长到极限了*'],
      [cflag(t, 14), cflag(t, 9) * 5, '*防御值的成长到极限了*'],
    ];
    const [current, limit, label] = caps[b];
    if (current >= limit) {
      era.print(label); // PRINTL
      era.print('*请提高等级*'); // PRINTW
      await era.waitAnyKey();
      return 0;
    }
    // 可强化次数（点数上限按项目不同）
    let d = Math.trunc(era_flag.money / cost); // D = MONEY/C
    const local = [
      Math.trunc((2000 + cflag(t, 9) * 50 - maxbase(t, 0)) / 10),
      Math.trunc((2000 + cflag(t, 9) * 50 - maxbase(t, 1)) / 10),
      cflag(t, 9) * 5 - cflag(t, 13),
      cflag(t, 9) * 5 - cflag(t, 14),
    ][b];
    if (local < d) {
      d = local; // SIF LOCAL < D → D = LOCAL
    }
    era.print(`强化${savestr(t)}多少次呢？(1-${d})`);
    const times = await era.input({ useRule: false }); // INPUT（自由输入）
    if (times === 0) {
      return 0;
    }
    if (times < 1 || times > d) {
      era.print('数值太大了。'); // PRINTL
      // 提示后等键再重画（ADR-0009：换屏前的输出先经按键确认）
      await era.waitAnyKey();
      continue input_loop; // GOTO INPUT_LOOP（重来整段）
    }
    // 逐项强化
    if (b === 0) {
      era.print('HP强化了。'); // PRINTW
      era.set(`maxbase:${t}:0`, maxbase(t, 0) + 10 * times); // （无属主产物）
    } else if (b === 1) {
      era.print('气力强化了。'); // PRINTW
      era.set(`maxbase:${t}:1`, maxbase(t, 1) + 10 * times);
    } else if (b === 2) {
      era.print('攻击强化了。'); // PRINTW
      chara(t).chara.基础攻击 = cflag(t, 13) + times; // CFLAG:T:13 += RESULT
    } else {
      era.print('防御强化了。'); // PRINTW
      chara(t).chara.基础防御 = cflag(t, 14) + times;
    }
    await era.waitAnyKey(); // 的 PRINTW 等待
    pay(cost * times);
    // (stick增加，修正实际攻防)：A = T; CALL WEAPON_RESTORE
    weapon_restore(t);
    return 1;
  }
}

/** magicresist：赋予魔法耐性。 */
const MAGICRESIST_ITEM = {
  price: 50000,
  poor: '钱不够',
  intro: ['魔法耐性可以抵挡敌方的魔法攻击。', '赋予谁魔法耐性呢？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 257) === 1) {
      return `${savestr(cid)}已经拥有魔法耐性了。`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`赋予${savestr(cid)}魔法耐性吗？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}获得了魔法耐性》`);
    chara(cid).chara.魔法耐性 = 1;
  },
};

/** magicresist */
async function magicresist() {
  return run_modify(MAGICRESIST_ITEM);
}

/** extra_preg_mark：赋予异常妊娠体质。 */
const EXTRA_PREG_MARK_ITEM = {
  price: 20000,
  poor: '钱不够',
  intro: ['赋予异常妊娠体质', '要赋予给谁？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 340) === 1) {
      return `${savestr(cid)}已经拥有了异常妊娠体质。`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`赋予${savestr(cid)}异常妊娠体质吗？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}获得了异常妊娠体质》`);
    chara(cid).stronghold.异常妊娠体质 = 1; // TALENT:T:340 = 1
  },
};

/** extra_preg_mark */
async function extra_preg_mark() {
  return run_modify(EXTRA_PREG_MARK_ITEM);
}

/** extra_preg_erase：消除异常妊娠体质。 */
const EXTRA_PREG_ERASE_ITEM = {
  price: 35000,
  poor: '钱不够',
  intro: ['消除异常妊娠体质', '要给谁消除？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 340) === 0) {
      return `${savestr(cid)}并不是异常妊娠体质。`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`要消除${savestr(cid)}异常妊娠体质吗？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}的异常妊娠体质消除了》`);
    chara(cid).stronghold.异常妊娠体质 = 0;
  },
};

/** extra_preg_erase */
async function extra_preg_erase() {
  return run_modify(EXTRA_PREG_ERASE_ITEM);
}

/** set_free_train：自由局部调教设定（自由文字输入）。 */
async function set_free_train() {
  if (!(await require_money(20000, '钱不够'))) {
    return 0; // （C = 20000）
  }
  const picked = await pick_slave({
    intro: ['设定自由局部调教内容', '要对谁设定呢？'],
    master: true,
    guard: (cid) =>
      cflag(cid, 1) === 2 ? `${savestr(cid)}还不在你的统治之下。` : null,
  });
  if (picked.cancelled) {
    return 0;
  }
  const local = picked.cid; // LOCAL = RESULT
  if (cstr(local, 7) !== '') {
    era.print(`设定新的内容的话${cstr(local, 7)}调教成果将被重置。`);
  }
  era.print(`要对${savestr(local)}进行自由局部调教设定吗？`);
  const answer = await ask_yes_no('是', '放弃');
  if (answer === 1) {
    return 0;
  }
  if (answer !== 0) {
    return 0; // 的 ELSE GOTO INPUT_LOOP（不可达）
  }
  era.print('请输入新的自由局部调教项目。');
  era.print('发送空白将会重置。');
  // ere 侧补的输入 0 说明（#567：引擎不受理空提交，0 是「不输入」的等价输入）
  era.print('（输入 0 重置）');
  const results = input_text(await era.input({ useRule: false })); // INPUTS
  chara(local).stronghold.自由调教内容 = results; // CSTR:LOCAL:7 = %RESULTS%
  chara(local).train.局部感觉 = 0; // ABL:LOCAL:4 = 0
  chara(local).train.局部中毒 = 0; // ABL:LOCAL:40 = 0
  era.set(`juel:${local}:15`, 0); // JUEL:LOCAL:15 = 0（无属主产物，直写）
  if (results === '') {
    era.print('自由局部调教重置完毕。');
  } else {
    era.print(`${results}调教设定完毕。`);
  }
  pay(20000);
  // 设定播报在回选人屏前经按键确认（ADR-0009）
  await era.waitAnyKey();
  return 1;
}

/** trans_specialtalent：淫乱 ⇄ 爱慕互换。 */
async function trans_specialtalent() {
  if (!(await require_money(500000, '钱不够'))) {
    return 0; // （C = 500000）
  }
  // 的 GOTO INPUT_LOOP（「改变失败了」后重来）——外层循环复刻
  input_loop: for (;;) {
    const picked = await pick_slave({
      intro: [
        '把对象从淫乱改为爱慕',
        '或者爱慕改为淫乱',
        '不过必须要满足 爱慕淫乱的条件哦',
      ],
      mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
      master: false, // RESULT < 1
    });
    if (picked.cancelled) {
      return 0;
    }
    const t = picked.cid; // T = RESULT
    era.print(`要改变${savestr(t)}吗？`);
    // 两条互换支（条件逐字保留）
    if (
      talent(t, 85) &&
      abl(t, 11) >= 3 &&
      abl(t, 0) + abl(t, 1) + abl(t, 2) + abl(t, 3) >= 10 &&
      exp_of(t, 50) >= 3 &&
      mark(t, 1) === 3 &&
      mark(t, 2) === 3
    ) {
      // 爱慕变淫乱
      era.print(`《${savestr(t)}的【${talentname(85)}】被消去了》`);
      chara(t).stronghold.爱慕 = 0; // TALENT:T:85 = 0
      chara(t).stronghold.淫乱 = 1; // TALENT:T:76 = 1
      era.print(`${savestr(t)}看你的眼神，好像忘记了你还有上半身…`);
      era.print(
        `${savestr(t)}沉迷于${chara_nickname(MASTER)}给予的快感之中了……`,
      );
      era.print(`${savestr(t)}获得了【${talentname(76)}】。`);
    } else if (
      talent(t, 76) &&
      abl(t, 10) >= 3 &&
      exp_of(t, 21) >= 200 &&
      talent(t, 85) === 0 &&
      mark(t, 2) === 3 &&
      abl(t, 16) >= 3
    ) {
      // 淫乱变爱慕
      era.print(`《${savestr(t)}的【${talentname(76)}】被消去了》`);
      chara(t).stronghold.淫乱 = 0;
      chara(t).stronghold.爱慕 = 1;
      era.print(`${savestr(t)}柔情似水地看着你…`);
      era.print(
        `${savestr(t)}因${chara_nickname(MASTER)}的行为而感到喜悦。想粘着你，想为你分忧，为你做些什么…渴望着你的宠爱。`,
      );
      era.print(`${savestr(t)}获得了【${talentname(85)}】。`);
    } else {
      era.print(`${savestr(t)}改变失败了`);
      // 提示后等键再重画选人屏（ADR-0009：换屏前的输出先经按键确认）
      await era.waitAnyKey();
      continue input_loop; // GOTO INPUT_LOOP（重来整段）
    }
    pay(500000);
    // 互换播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

/**
 * summon_slave：召唤影之仆从（自由输入收录编号 150-199）。
 */
async function summon_slave() {
  if (!(await require_money(100000, '召唤资金可是很贵的'))) {
    return 0; // （C = 100000）
  }
  for (;;) {
    era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =
    era.print('读取CSV来生成奴隶');
    era.print('还需要消耗30的等级和30个肉便器');
    era.drawLine(); // DRAWLINE
    if (cflag(MASTER, 9) < 30) {
      era.print('等级不足'); // PRINTW
      await era.waitAnyKey();
      return 0;
    }
    if (game.invasion.肉便器数 < 30) {
      era.print('肉便器数量不足'); // PRINTW
      await era.waitAnyKey();
      return 0;
    }
    era.print('条件达成。要生成奴隶吗？');
    era.print('若要生成，请输入要奴隶的编号');
    // #710：「不生成」改成按钮（正文的 `- ` 是既有文案）。输入保留
    // useRule: false——150-199 的编号是自由输入，不在按钮集里。
    era.printButton('- 不生成', 0);
    const result = await era.input({ useRule: false }); // INPUT
    if (result === 0) {
      return 0;
    }
    if (result > 199 || result < 150) {
      era.print('请确认对象的收录编号在150以上199以下'); // PRINTW
      await era.waitAnyKey();
      continue; // GOTO INPUT_LOOP
    }
    const local = result; // LOCAL = RESULT
    // EXISTCSV LOCAL：预设不存在则不生成
    if (!era.getAllCharacters().includes(local)) {
      era.print('所选奴隶并不存在'); // PRINTW
      await era.waitAnyKey();
      continue; // GOTO INPUT_LOOP
    }
    era.addCharacter(local); // ADDCHARA LOCAL
    // LOCAL:1 = CHARANUM - 1：序号世界里新角色恒在末位；ere 侧角色 ID
    // 就是收录编号（文件头第 8 条）
    const new_cid = local;
    await add_chara_ex_defined(new_cid); // CALL ADDCHARA_EX, CHARANUM-1
    chara(new_cid).chara.加入时名字 = chara_name(new_cid);
    const prev_target = era_flag.target; // LOCAL:2 = TARGET
    era_flag.target = new_cid; // TARGET = LOCAL:1
    wearing_cloth_able(new_cid); // CALL WEARING_CLOTH_ABLE
    era_flag.target = prev_target; // TARGET = LOCAL:2

    era.print('*****************************************');
    era.print(`从魔王的影子中将${savestr(new_cid)}召唤了出来！`);
    era.print('*****************************************');

    chara(new_cid).stronghold.魔王之影 = 1; // TALENT:(LOCAL:1):286-292 = 1
    chara(new_cid).invasion.状态 = 11; // CFLAG:(LOCAL:1):1 = 11（召喚酔い）
    chara(new_cid).chara.命名检查 = 1; // CFLAG:(LOCAL:1):420 = 1
    for (let idx = 800; idx < 810; idx += 1) {
      era.set(`cflag:${new_cid}:${idx}`, 0); // （动态下标，直写）
    }
    chara(MASTER).chara.等级 = cflag(MASTER, 9) - 30; // CFLAG:0:9 -= 30
    game.invasion.肉便器数 = game.invasion.肉便器数 - 30; // FLAG:83 -= 30
    pay(100000);
    era.print('作为代价等级和肉便器减少了30');
    era.print(`${savestr(new_cid)}的召唤并不完全`);
    era.print(
      '请找出 种族・性格・理由・成为勇者前的生活・发色・瞳色 其中一项有与之共通的奴隶做成肉便器',
    );
    await print_wait(
      `各个素质均有相符后耗费30个肉便器将${savestr(new_cid)}解放出来`,
    ); // WAIT
    return 1;
  }
}

/** anti_aging：减龄魔药（10 岁一档）。 */
const ANTI_AGING_ITEM = {
  price: 20000,
  poor: '没钱就别想这些事情',
  intro: ['服用减龄的魔药让肉体恢复青春', '要让谁使用呢？'],
  master: true,
  guard: (cid) => {
    // `CFLAG:RESULT:451 < 18 || GETBIT(FLAG:5,13) && CFLAG:RESULT:452 < 18`
    // 按旧引擎「&& 与 || 同优先级、左结合」的语义读作
    // `(年龄 < 18 || 长命种) && 种族年龄 < 18`——种族年龄不低时整支不命中，
    // 年龄 < 18 也照样放行（#517）。
    const long_lived = ((settings_bitmap() >> 13) & 1) !== 0;
    if ((cflag(cid, 451) < 18 || long_lived) && cflag(cid, 452) < 18) {
      return `${savestr(cid)}无法再变得更年轻了`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`要让${savestr(cid)}服用减龄魔药吗？`],
  apply: (cid) => {
    era.print(`《${savestr(cid)}的肉体年轻了10岁》`);
    chara(cid).chara.年龄 = cflag(cid, 451) - 10; // CFLAG:T:451 -= 10
    chara(cid).chara.种族年龄 = cflag(cid, 452) - 10; // CFLAG:T:452 -= 10
  },
};

/** anti_aging */
async function anti_aging() {
  return run_modify(ANTI_AGING_ITEM);
}

/** penis_remodel：年度版新增的阴茎大小改造（形状菜单）。 */
async function penis_remodel() {
  if (!(await require_money(20000, '没钱还想让肉棒变大？噗噗杂鱼~'))) {
    return 0; // （C = 20000）
  }
  for (;;) {
    const picked = await pick_slave({
      intro: [
        '只要使用实验室传下来的秘传魔法！就可以让任何的肉棒大小进行改造！',
        '也就是说无论是变大！还是变小∽都可以的哦？',
        '所以说魔王大人…要对谁使用呢？',
      ],
      master: true,
      guard: (cid) => {
        if (talent(cid, 122) === 0 && talent(cid, 121) === 0) {
          return '魔王大人哦？这孩子还没有肉棒呢？';
        }
        if (cflag(cid, 1) === 2) {
          return `${savestr(cid)}还不在你的统治之下。`;
        }
        return null;
      },
    });
    if (picked.cancelled) {
      return 0;
    }
    const t = picked.cid; // T = RESULT
    if (talent(t, 121) === 1) {
      era.print(
        `${savestr(t)}被实验室的女主任绑在改造台上，下身的衣物已然被脱了个精光，散落在地上。`,
      );
      era.print(
        `对方口中含着${savestr(t)}的扶她肉棒，在巧妙的口技下${savestr(t)}也难免硬了起来！`,
      );
      era.print('唔？魔王大人，想让这孩子的扶她肉棒，唔！');
      era.print('哈一一一，变成什么样子呢？');
    } else if (talent(t, 122) === 1) {
      era.print(`魔王大人，想让${savestr(t)}的肉棒变成什么样子呢？`);
    }
    // 形状选项
    for (const [index, label] of FUTANARI_SHAPES.entries()) {
      era.printButton(`- ${label}`, index);
    }
    era.printButton('- 我再想想', 999);
    const shape = await era.input(); // INPUT
    if (shape === 999) {
      return 0;
    }
    if (shape < 0 || shape > 4) {
      continue; // 的 ELSE GOTO INPUT_LOOP（不可达）
    }
    era.print(`《${savestr(t)}获得【${talentname(121)}】了》`);
    era.print('肉棒的状态：'); // PRINT
    era.print(`《${FUTANARI_SHAPES[shape]}》`);
    chara(t).chara.扶她 = 1; // TALENT:T:121 = 1
    chara(t).stronghold.肉芽诅咒 = 0; // TALENT:T:326 = 0（属主 stronghold）
    chara(t).chara.阴茎的状态 = shape; // TALENT:T:318 = RESULT
    chara(t).train.童贞 = 1; // TALENT:T:1 = 1
    pay(20000);
    // 改造播报在回选人屏前经按键确认（ADR-0009）
    await era.waitAnyKey();
    return 1;
  }
}

// ————————————————————————————————————————————————
// 主入口与四页菜单（secret_labo + labo_page1-4）
// ————————————————————————————————————————————————

/** 第 1 页的文本行 */
function labo_page1() {
  era.print(''); // PRINTL
  era.print('□肉体改造');
  era.print(''); // PRINTL
  era.printButton('- 丰胸改造               （20000点）', 0);
  era.printButton('- 平胸改造               （10000点）', 1);
  era.printButton('- 加入母乳体质           （50000点）', 2);
  era.printButton('- 扶她化                 （50000点）', 3);
  era.printButton('- 去扶她化               （10000点）', 4);
  era.printButton('- 附上动物耳朵           （2000点）', 5);
  era.printButton('- 去除动物耳朵           （1000点）', 6);
  era.printButton('- 性成熟            　   （10000点）', 7);
  era.printButton('- 记忆消去               （100000点）', 8);
  era.printButton('- 阴部永久脱毛           （5000点）', 9);
  era.printButton('- 消去母乳体质           （10000点）', 10);
  era.printButton('- 消除漏尿癖             （10000点）', 11);
}

/** 第 2 页的文本行 */
function labo_page2() {
  era.print(''); // PRINTL
  era.print('□肉体改造');
  era.print(''); // PRINTL
  era.printButton('- 处女膜再生术           （100000点）', 12);
  era.printButton('- 施加私处封印           （10000点）', 13);
  era.printButton('- 解除私处封印           （10000点）', 14);
  era.printButton('- 刺青的刻印/消去        （10000点）', 15);
  era.printButton('- 头发颜色改变           （5000点）', 16);
  era.printButton('- 肤色改变               （5000点）', 17);
  era.printButton('- 感觉封锁               （20000点）', 18);
  era.printButton('- 异常妊娠体质           （20000点）', 19);
  era.printButton('- 消除异常妊娠体质       （35000点）', 20);
  era.printButton('- 变性                   （200000点）', 21);
  era.printButton('- 自由局部调教设定       （20000点）', 22);
  era.printButton('- 淫乱爱慕互换           （500000点）', 23);
  era.printButton('- 减龄魔药               （20000点）', 24);
  era.printButton('- 肉棒改造               （20000点）', 25);
}

/** 第 3 页的文本行 */
function labo_page3() {
  era.print('□其他');
  era.print(''); // PRINTL
  if (game.stronghold.触手生物 === 0) {
    era.printButton('- 购买触手生物           （50000点）', 50);
  }
  if (exp_of(MASTER, 81)) {
    era.printButton('- 死者苏生               （勋章交换）', 51);
    era.printButton('- 赋予生命               （勋章交换）', 52);
    era.printButton('- 安抚崩坏的心           （勋章交换）', 54);
    era.printButton('- 寻访贞操带钥匙         （勋章交换）', 55);
  }
  era.printButton('- 召唤影之仆从           （100000点）', 56);
  era.printButton('- 赋予犄角               （20000点）', 59);
  era.printButton('- 恶魔体征改造           （20000点）', 60);
  era.printButton('- 转生的秘法             （50000点）', 64);
  era.printButton('- 魂缚的诅咒             （10000点）', 65);
  era.printButton('- 魂缚的解咒             （50000点）', 66);
  era.printButton('- 狂王俘虏的消去         （50000点）', 67);
  era.printButton(
    '- 生命摇篮　             （起价500000点，按素质加价，上百万是正常的）',
    68,
  );
}

/** 第 4 页的文本行 */
function labo_page4() {
  era.print(''); // PRINTL
  era.print('□战斗');
  era.print(''); // PRINTL
  era.printButton('- HP＋10                 （5000点）', 70);
  era.printButton('- 气力＋10               （5000点）', 71);
  era.printButton('- 攻击＋1                （5000点）', 72);
  era.printButton('- 防御＋1                （5000点）', 73);
  era.printButton('- 赋予魔法耐性           （50000点）', 74);
  era.print(''); // PRINTL
  era.print('□洗脑 （助手用）');
  era.print(''); // PRINTL
  era.printButton('-【无视污垢】            （5000点）', 30);
  era.printButton('-【早泄】                （8000点）', 31);
  era.printButton('-【幼稚】                （10000点）', 32);
  era.printButton('-【抖Ｓ】                （10000点）', 33);
}

/**
 * 洗脑四项的「费用 × 素质」（分发里现置 C/B）。
 * 键 = 菜单编号，值 = [费用, 追加素质]。
 */
const WASHING_MENU = {
  30: [5000, 64], // 【无视污垢】
  31: [8000, 133], // 【早泄】
  32: [10000, 132], // 【幼稚】
  33: [10000, 83], // 【抖Ｓ】
};

/** st_up_labo 四项的菜单编号（`C = 5000` 与 `B = 0..3`） */
const ST_UP_MENU = { 70: 0, 71: 1, 72: 2, 73: 3 };

/**
 * secret_labo：秘密实验室的主循环（本文件唯一的外部调用面）。
 *
 * `$DRAW_PAGE`（绘制 + 输入）/ `$INPUT_LOOP`（输入分发）两个标签，
 * 页号 P 在 0-3 之间循环（`P += 3; P %= 4` 与 `P += 1; P %= 4`）。
 *
 * @param {(n: number) => number} rand 随机源（透传给各改造条目）
 * @returns {Promise<number>} 0（`RETURN 0`）
 */
async function secret_labo(rand = default_rand) {
  let p = 0; // P = 0
  for (;;) {
    // $DRAW_PAGE。每轮绘制前换屏：画面上只有当前这一屏（ADR-0009）
    await change_screen();
    era.print('魔界的大门');
    era.print('《可以对奴隶进行肉体和精神的魔改》');
    era.drawLine(); // DRAWLINE
    era.print(
      `${era_flag.day_count + 1}日${era_flag.time === 0 ? ' 午前' : ' 午后'}`,
    ); // （PRINTV DAY+1 / PRINT 日 / PRINTL）
    era.print(`所持金：${era_flag.money}点`);
    era.drawLine(); // DRAWLINE
    if (p === 0) {
      labo_page1();
    } else if (p === 1) {
      labo_page2();
    } else if (p === 2) {
      labo_page3();
    } else {
      labo_page4();
    }
    era.drawLine(); // DRAWLINE
    // 起的三个 PRINTLC 页脚键打在同一行，紧随的 PRINTL 只结束那一行——
    // PRINTLC 左对齐补位、**不换行**，故不产生空行。ere 的 printButton
    // 自成一行（＝ PRINTLC + 收尾的 PRINTL），不再补空行（语义与勘误见
    // CONTEXT.md「输出 API 的排版与对齐」）。
    era.printButton('- 前一页', 997); // PRINTLC  [997] - 前一页
    era.printButton('- 返回', 999); // PRINTLC  [999] - 返回
    era.printButton('- 后一页', 998); // PRINTLC  [998] - 后一页

    // $INPUT_LOOP
    const result = await era.input(); // INPUT
    if (result === 0) {
      await modify_bustup(rand);
    } else if (result === 1) {
      await modify_bustdown(rand);
    } else if (result === 2) {
      await modify_bonyu(rand);
    } else if (result === 3) {
      await modify_futanari();
    } else if (result === 4) {
      await modify_futanari_erase();
    } else if (result === 5) {
      await modify_animal();
    } else if (result === 6) {
      await modify_animal_erase();
    } else if (result === 7) {
      await modify_deimmaturity(rand);
    } else if (result === 8) {
      await modify_amnesia();
    } else if (result === 9) {
      await modify_removehair();
    } else if (result === 10) {
      await modify_bonyu_erase(rand);
    } else if (result === 11) {
      await modify_omorashi_erase();
    } else if (result === 12) {
      await shojo_saisei();
    } else if (result === 13) {
      await shojo_seal();
    } else if (result === 14) {
      await shojo_seal_off();
    } else if (result === 15) {
      await tatoo_set_off();
    } else if (result === 16) {
      await modify_hair_color();
    } else if (result === 17) {
      await modify_skin_color();
    } else if (result === 18) {
      await block_feeling();
    } else if (result === 19) {
      await extra_preg_mark();
    } else if (result === 20) {
      await extra_preg_erase();
    } else if (result === 21) {
      await trans_sex();
    } else if (result === 22) {
      await set_free_train();
    } else if (result === 23) {
      await trans_specialtalent();
    } else if (result === 24) {
      await anti_aging();
    } else if (result === 25) {
      await penis_remodel(); // （年度版新增的功能）
    } else if (WASHING_MENU[result]) {
      // 洗脑四档（C/B 现置后进 brain_washing）
      const [cost, b] = WASHING_MENU[result];
      await brain_washing(cost, b);
    } else if (result === 50 && game.stronghold.触手生物 === 0) {
      await bougt_tentacles();
    } else if (result === 51 && exp_of(MASTER, 81)) {
      await resulection();
    } else if (result === 52 && exp_of(MASTER, 81)) {
      await given_human_life(rand);
    } else if (result === 54 && exp_of(MASTER, 81)) {
      await cure_insane();
    } else if (result === 55 && exp_of(MASTER, 81)) {
      await reget_chastity_key();
    } else if (result === 56) {
      await summon_slave();
    } else if (result === 59) {
      await horn();
    } else if (result === 60) {
      await evilapp();
    } else if (result === 64) {
      await demon_rebirth(rand);
    } else if (result === 65) {
      await soulbound();
    } else if (result === 66) {
      await soulbound_erase();
    } else if (result === 67) {
      await encharmed_erase();
    } else if (result === 68) {
      // 生命摇篮：勇者数量与上限的六道检查（过了才进 char_create）。
      // 六支的条件与阈值各支互不相同，有意不抽成表：抽表反而看不清
      // 「哪一支在拦」
      if (game.event.人间界征服完了 === 0 && charanum() > 60) {
        era.print('勇者数量过多');
        await era.waitAnyKey(); // PRINTW
      } else if (
        game.event.精灵领域征服完了 === 0 &&
        game.event.龙山征服完了 === 0 &&
        game.event.天界征服完了 === 0 &&
        charanum() > 65
      ) {
        era.print('勇者数量过多');
        await era.waitAnyKey();
      } else if (
        game.event.精灵领域征服完了 * game.event.龙山征服完了 === 0 &&
        game.event.龙山征服完了 * game.event.天界征服完了 === 0 &&
        game.event.天界征服完了 * game.event.精灵领域征服完了 === 0 &&
        charanum() > 70
      ) {
        era.print('勇者数量过多');
        await era.waitAnyKey();
      } else if (
        (game.event.精灵领域征服完了 === 0 ||
          game.event.龙山征服完了 === 0 ||
          game.event.天界征服完了 === 0) &&
        charanum() > 75
      ) {
        era.print('勇者数量过多');
        await era.waitAnyKey();
      } else if (game.invasion.亲卫队砦侵攻度 < 15 && charanum() > 80) {
        era.print('勇者数量过多');
        await era.waitAnyKey();
      } else if (charanum() >= MAX_CHARANUM) {
        era.print('勇者数量过多');
        await era.waitAnyKey();
      } else {
        await char_create(0, rand); // CALL CHAR_CREATE(0)（付费定制路径）
      }
    } else if (ST_UP_MENU[result] !== undefined) {
      // 能力值强化四档（C = 5000 与 B 现置后进 st_up_labo）
      await st_up_labo(5000, ST_UP_MENU[result]);
    } else if (result === 74) {
      await magicresist();
    } else if (result === 999) {
      return 0;
    } else if (result === 997) {
      p += 3; // 前一页
      p %= 4;
    } else if (result === 998) {
      p += 1; // 后一页
      p %= 4;
    } else {
      // ELSE CLEARLINE 1 + GOTO INPUT_LOOP（不可达，见文件头第 3 条）
    }
    // GOTO DRAW_PAGE
  }
}

module.exports = {
  secret_labo,
  labo_page1,
  labo_page2,
  labo_page3,
  labo_page4,
  pick_slave,
  run_modify,
  modify_bustup,
  modify_bustdown,
  modify_bonyu,
  modify_futanari,
  modify_futanari_erase,
  modify_animal,
  modify_animal_erase,
  modify_removehair,
  modify_deimmaturity,
  modify_amnesia,
  modify_bonyu_erase,
  modify_omorashi_erase,
  shojo_saisei,
  shojo_seal,
  shojo_seal_off,
  tatoo_set_off,
  modify_hair_color,
  modify_skin_color,
  block_feeling,
  trans_sex,
  brain_washing,
  bougt_tentacles,
  given_human_life,
  resulection,
  cure_insane,
  reget_chastity_key,
  horn,
  evilapp,
  blueskin,
  evilwing,
  eviltail,
  evilsight,
  demon_rebirth,
  labo_dr_get_talent,
  labo_dr_change_hair_color,
  soulbound,
  soulbound_erase,
  encharmed_erase,
  st_up_labo,
  magicresist,
  extra_preg_mark,
  extra_preg_erase,
  set_free_train,
  trans_specialtalent,
  summon_slave,
  anti_aging,
  penis_remodel,
};
