/**
 * @file 角色信息画面的标题行与状态块（@SHOW_INFO_TITLE / @SHOW_BLOCK）。
 *
 * 源: target/ERB/キャラ関数/CHARA_INFO_SHOW ver1.1.2.ERB
 *       @SHOW_INFO_TITLE（:323-371）/ @SHOW_BLOCK（:372-427）
 *
 * 两段是一体的：@SHOW_CHARA_INFO 开局无条件先 CALL SHOW_INFO_TITLE（:28），
 * 页码 0/1 再 CALL SHOW_BLOCK（:261/:274）。等号线与年龄行只属前者。
 *
 * 有意偏离（各条都写了依据）：
 *   - 立绘分支不镜像（:327-334/:366-368 的 `IF 立绘`）：`立绘` 是 SAVEDATA
 *     开关（魔改新增/魔改使用.ERH:6，未入 yml），CHA_IMG 无引擎通道——
 *     kojo-dungeon-ravish.js:96-99 与 components/chara-bars.js:18-24 同款处置。
 *     本文件只取 ELSE 臂（编号不带 12 空格前缀、年龄右对齐 48）；
 *   - 「同行拼接」改逐行：原作 `CALL LIFE_BAR, ARG, 1`（末尾免改行）后接
 *     体重/腰围文本，两者占同一显示行。引擎的 progress 格自带条后文字列且
 *     独占一整个 24 列网格（app.asar 渲染层 `:span="24 - line.barWidth"`），
 *     塞不进任意尾随文本，故体重/臀围两行各自成行。条与数值的语义面
 *     （chara-bars.js 的 `(cur/max)`）不变，差的是排版；
 *   - 条后的对齐衬垫（:401/:412 的 `%UNICODE(0xA0)%` 条件块、:412 行首七个
 *     全角空格）是 32 格字符条时代的对齐把戏，progress 格由引擎排版——
 *     与 chara-bars.js「名字后的全角对齐衬垫不镜像」同一条理由，不镜像；
 *   - `(ARG != MASTER || MASTER)` 化简为 `cid !== 0`：MASTER 是恒为 0 的
 *     角色号常量，`A || 0` ≡ `A`（page-chara-info.js:46-50 同款精简）；
 *   - `@SHOW_INFO_TITLE` 里漏传随机源的 `CALL CHAR_BODY_GENERATE_WAPPED`
 *     （:353-354）按项目通例开成形参 `rand`（缺省真随机，用例显式注入）；
 *   - `CALL QUEST_SELECT, ARG, "名前", 1|2|3`（:392/:406/:417）接
 *     ere/dungeon/dungeon-quest.js 的既有真身 `quest_select`（该文件
 *     :393-396/:445/:528 三处注释就是为本票留的行内形态），本模块只做接线。
 */

const era = require('#/era-electron');
const { life_bar, vital_bar } = require('#/page/components/chara-bars');
const { char_body_generate_wapped, cup_size } = require('#/chara/chara-body');
const { self_call } = require('#/kojo/kojo-text');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const { pad_display, pad_left } = require('#/utils/display-width');

const default_rand = (n) => Math.floor(Math.random() * n);

// 素质编号（yml/Talent.yml 的名字表；原作以名字寻址，ere 侧用编号 + 注释）
const TALENT_AIBA = 85; // 爱慕
const TALENT_INRAN = 76; // 淫乱
const TALENT_MAOU_SHADOW = 292; // 魔王之影（寿命倒计时的显示位）
const TALENT_MAN = 122; // 男人

/** FLAG:5 开局设置位图的分位（SYSTEM/CONFIG.ERB:173-175 的配置页标签） */
const BIT_AGE = 12; // 显示角色的年龄
const BIT_RACE_AGE = 13; // 使用不同种族的年龄设定
const BIT_HUMAN_AGE = 14; // 显示换算成人类的年龄
const BIT_SIZE = 15; // 显示三围数据

/** `SETCOLOR 255,100,100`（爱慕/淫乱标）→ 渲染层 CSS 色串 */
const ENAMORED_COLOR = '#ff6464';

function talent(cid, index) {
  return era.get(`talent:${cid}:${index}`) || 0;
}

/**
 * @SHOW_INFO_TITLE（:323-371）：等号分割线 + 编号/名字/爱慕标 + 年龄行。
 * @param {number} cid 角色 ID（源 ARG）
 * @param {(n: number) => number} [rand] RAND:N 随机源（身体数据缺失时用）
 */
function show_info_title(cid, rand = default_rand) {
  era.drawLine({ isSolid: true }); // :326 CUSTOMDRAWLINE =

  // :336 名字：ARG == 0（魔王）取 NAME、其余取 SAVESTR——两者在 ere 侧同源
  // callname:-1（callname-utils 头注），仍按两个函数取以留住语义分野
  const name = cid === 0 ? chara_name(cid) : chara_callname(cid);
  const title = [{ content: `NO.${pad_display(String(cid), 3)} ` }]; // :333
  title.push({ content: pad_display(name, 12) }); // :336
  // :337-347 爱慕优先于淫乱，两者都不命中时补五个全角空格对齐
  if (talent(cid, TALENT_AIBA) !== 0) {
    title.push({ content: '　<爱慕>　', color: ENAMORED_COLOR });
  } else if (talent(cid, TALENT_INRAN) !== 0) {
    title.push({ content: '　<淫乱>　', color: ENAMORED_COLOR });
  } else {
    title.push({ content: '　　　　　' });
  }

  // :350-365 年龄串（三个 SIF 依次叠加；位 12 未开时为空串）
  let age_str = '';
  if (getbit(BIT_AGE) && cid !== 0) {
    // :353-354 身体数据尚未生成时现生成（生成后 CFLAG:451 非 0）
    if ((era.get(`cflag:${cid}:451`) || 0) === 0) {
      char_body_generate_wapped(cid, rand);
    }
    age_str = getbit(BIT_RACE_AGE)
      ? `${era.get(`cflag:${cid}:452`) || 0} 岁` // :357 种族年龄
      : `${era.get(`cflag:${cid}:451`) || 0} 岁`; // :359 人类年龄
    if (
      getbit(BIT_RACE_AGE) &&
      getbit(BIT_HUMAN_AGE) &&
      (era.get(`cflag:${cid}:451`) || 0) !== (era.get(`cflag:${cid}:452`) || 0)
    ) {
      // :362 换算人类年龄（{..., 3} 是右对齐宽 3）
      age_str += ` (换算人类${pad_left(String(era.get(`cflag:${cid}:451`) || 0), 3)} 岁)`;
    }
    if (talent(cid, TALENT_MAOU_SHADOW) !== 0) {
      // :364 寿命倒计时（{CFLAG:820, 3} 同样右对齐宽 3）
      age_str += ` [寿命还有${pad_left(String(era.get(`cflag:${cid}:820`) || 0), 3)} 天]`;
    }
  }
  // :370 ELSE 臂：PRINTFORML %AGE_STR, 48%
  title.push({ content: pad_left(age_str, 48) });
  era.print(title);
}

/**
 * FLAG:5 的位测试（各消费点写法一致，收一处）。
 * @param {number} bit 位号
 * @returns {boolean}
 */
function getbit(bit) {
  return (((era.get('flag:5') || 0) >> bit) & 1) !== 0;
}

/**
 * `{CFLAG:n:45x / 10}.{CFLAG:n:45x % 10}`：三围的「整数.小数」写法，
 * 整数部分右对齐宽 3（源 :380/:401/:412 一致）。
 * @param {number} cid 角色 ID
 * @param {number} index CFLAG 下标（453 身高 / 454 体重 / 455 胸围 /
 *   456 腰围 / 457 臀围）
 * @returns {string}
 */
function size_str(cid, index) {
  const value = era.get(`cflag:${cid}:${index}`) || 0;
  return `${pad_left(String(Math.trunc(value / 10)), 3)}.${value % 10}`;
}

/**
 * @SHOW_BLOCK（:372-427）：一人称行 + 身高三围行 + 体力/气力条（带受注任务）。
 *
 * 两个 `SIF CFLAG:ARG:534 == 1 && CFLAG:ARG:1 == 2 && GETBIT(FLAG:8,3)` 守卫
 * 把受注中的任务名（页码 1）/ 障碍聚合（页码 2）/ 讨伐对象（页码 3）分别
 * 拼在两条状态行后。FLAG:8 位 3 = 勇者的任务揭示板（CONFIG.ERB:185）。
 *
 * @param {number} cid 角色 ID（源 ARG）
 * @returns {Promise<void>}
 */
async function show_block(cid) {
  // :370-373/:374-377/:395/:400/:411 的 (ARG != MASTER || MASTER) 守卫。打印
  // 段用得到它；:395/:400/:411 三处只守 PRINTL 的收行（#596 起不镜像——ere
  // 的 print 自成一行，收行由引擎负责）
  const is_not_master = cid !== 0;
  const show_size = getbit(BIT_SIZE) && is_not_master;

  if (is_not_master) {
    // :374 PRINTPLAINFORM 一人称：%SELF_CALL(ARG),26,LEFT%
    era.print(`一人称：${pad_display(self_call(cid), 26)}`);
    // :375 PRINTFORM [8] 一人称重設 ——原作是与上一行同行的纯文字提示（Emuera
    // 的 INPUT 接受手输任意编号，敲 8 即可）；ere 的 input 只接受本轮已打印
    // 按钮的快捷键（#129），CASE 8（RANDOM_SELF_CALL 的 MODE 1）必须由真
    // 按钮接进——升级为 printButton（本项目通例，#384 改名按钮同款），按钮
    // 自成一行；正文不写 [8] 前缀（AGENTS.md 硬约束），尾部半角空格照抄
    era.printButton('一人称重设 ', 8);
  }

  if (show_size) {
    // :378-385 身高三围行（罩杯括号接在同一行尾）
    const bust = [
      // :380 PRINTPLAINFORM 后三个空格 = 1 个命令分隔符 + 2 个正文（见 chara-info-abl-mark.js 文件头）
      { content: '  ' },
      {
        content: `身高 ${size_str(cid, 453)} cm\u3000B ${size_str(cid, 455)} cm`,
      },
    ];
    if (talent(cid, TALENT_MAN) === 0) {
      bust.push({ content: pad_display(`(${cup_size(cid)})`, 7) }); // :379/:382
    } else {
      bust.push({ content: '       ' }); // :384（男性不显示罩杯，8 空格减分隔符 = 7）
    }
    era.print(bust);
  }

  // :391-393 受注任务名（页码 1，不换行形态；页码 0 时守卫不成立）
  if (quest_guard(cid)) {
    await quest_now()(cid, '名前', 1);
  }
  // :395-396 的 PRINTL 只结束上一行（非魔王时是一人称/身高行、魔王时是
  // LIFE_BAR 留下的未收行），不产生空行

  // :399 CALL LIFE_BAR, ARG, 1（原作末尾免改行，见文件头的逐行说明）
  life_bar(cid);
  if (show_size) {
    // :401 体重/腰围行
    era.print(`体重 ${size_str(cid, 454)} kg\u3000W ${size_str(cid, 456)} cm`);
  }
  if (quest_guard(cid)) {
    await quest_now()(cid, '名前', 2); // :405-406
  }
  // :405-408 的 PRINTL 同理（只收体重行/LIFE_BAR 行）

  // :410 CALL VITAL_BAR, ARG, 1
  vital_bar(cid);
  if (show_size) {
    // :412 臀围行（行首七个全角空格是对齐衬垫，不镜像）
    era.print(` H ${size_str(cid, 457)} cm`);
  }
  if (quest_guard(cid)) {
    await quest_now()(cid, '名前', 3); // :416-417
  }
  // :416-419 的 PRINTL 同理（只收臀围行/VITAL_BAR 行）
}

/**
 * `@QUEST_SELECT` 的**惰性**取用：dungeon-quest.js 顶层 require 了
 * dungeon-battle.js，而后者顶层又 require 回 dungeon-quest（#178 的既有形态）；
 * 本文件经 chara-make → page-chara-info-show 被更早拉进那条链时，顶层引入
 * 会把 dungeon-quest 变成半成品（dungeon-battle 捕到的 `quest_mod` 缺函数）。
 * 只有受注任务那一条支路用它，就在用到处取。
 * @returns {Function} dungeon-quest 的 quest_select
 */
function quest_now() {
  return require('#/dungeon/dungeon-quest').quest_select;
}

/**
 * 受注任务段的守卫（源 :391/:405/:416 三处逐字相同）：该角色接了任务
 * （CFLAG:534 == 1）、处于任务中（CFLAG:1 == 2，勇者状态）、且任务揭示板
 * 功能开着（FLAG:8 位 3）。
 * @param {number} cid 角色 ID
 * @returns {boolean}
 */
function quest_guard(cid) {
  return (
    (era.get(`cflag:${cid}:534`) || 0) === 1 &&
    (era.get(`cflag:${cid}:1`) || 0) === 2 &&
    (((era.get('flag:8') || 0) >> 3) & 1) !== 0
  );
}

module.exports = { show_block, show_info_title };
