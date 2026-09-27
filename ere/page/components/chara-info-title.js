/**
 * @file 角色信息画面的标题行与状态块（show_info_title / show_block）。
 *
 * 两段是一体的：show_chara_info 开局无条件先打印标题行，页码 0/1 再打印
 * 状态块。等号线与年龄行只属前者。
 *
 * 有意偏离（各条都写了依据）：
 *   - 立绘分支不镜像：`立绘` 是旧引擎存档（SAVEDATA）里的开关，本项目没有对应设置，
 *     CHA_IMG 无引擎通道——kojo-dungeon-ravish.js 与 components/chara-bars.js
 *     同款处置。本文件只取无立绘分支（编号不带 12 空格前缀、年龄右对齐 48）；
 *   - 「同行拼接」改逐行：体力条后接体重/腰围文本本来占同一显示行，但引擎
 *     的 progress 格自带条后文字列且独占一整个 24 列网格，塞不进任意尾随
 *     文本，故体重/臀围两行各自成行。条与数值的语义面（chara-bars.js 的
 *     `(cur/max)`）不变，差的是排版；
 *   - 条后的对齐衬垫是 32 格字符条时代的对齐把戏，progress 格由引擎排版——
 *     与 chara-bars.js「名字后的全角对齐衬垫不镜像」同一条理由，不镜像；
 *   - 魔王判断化简为 `cid !== 0`：MASTER 是恒为 0 的角色号常量（page-chara-info.js
 *     同款精简）；
 *   - show_info_title 的身体数据生成按项目通例开成形参 `rand`（缺省真随机，
 *     用例显式注入）；
 *   - 受注任务名接 ere/dungeon/dungeon-quest.js 的既有 quest_select，本模块
 *     只做接入。
 */

const era = require('#/era-electron');
const { life_bar, vital_bar } = require('#/page/components/chara-bars');
const { char_body_generate_wapped, cup_size } = require('#/chara/chara-body');
const { self_call } = require('#/kojo/kojo-text');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
const { NBSP, pad_display, pad_left } = require('#/utils/display-width');

const default_rand = (n) => Math.floor(Math.random() * n);

// 素质编号（yml/Talent.yml 的名字表；本项目用编号 + 行尾注释寻址）
const TALENT_AIBA = 85; // 爱慕
const TALENT_INRAN = 76; // 淫乱
const TALENT_MAOU_SHADOW = 292; // 魔王之影（寿命倒计时的显示位）
const TALENT_MAN = 122; // 男人

/** FLAG:5 开局设置位图的分位（设置页对应开关的标签见各常量行尾注释） */
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
 * show_info_title：等号分割线 + 编号/名字/爱慕标 + 年龄行。
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} [rand] 随机源（身体数据缺失时现生成用）
 */
function show_info_title(cid, rand = default_rand) {
  era.drawLine({ isSolid: true });

  // 名字：魔王（cid === 0）与其余角色在 ere 侧同源（callname:-1，
  // 见 callname-utils 头注），仍按两个函数取以留住语义分野
  const name = cid === 0 ? chara_name(cid) : chara_callname(cid);
  const title = [{ content: `NO.${pad_display(String(cid), 3)} ` }];
  title.push({ content: pad_display(name, 12) });
  // 爱慕优先于淫乱，两者都不命中时补五个全角空格对齐
  if (talent(cid, TALENT_AIBA) !== 0) {
    title.push({ content: '　<爱慕>　', color: ENAMORED_COLOR });
  } else if (talent(cid, TALENT_INRAN) !== 0) {
    title.push({ content: '　<淫乱>　', color: ENAMORED_COLOR });
  } else {
    title.push({ content: '　　　　　' });
  }

  // 年龄串（三段依次叠加；位 12 未开时为空串）
  let age_str = '';
  if (getbit(BIT_AGE) && cid !== 0) {
    // 身体数据尚未生成时现生成（生成后 CFLAG:451 非 0）
    if ((era.get(`cflag:${cid}:451`) || 0) === 0) {
      char_body_generate_wapped(cid, rand);
    }
    age_str = getbit(BIT_RACE_AGE)
      ? `${era.get(`cflag:${cid}:452`) || 0} 岁` // 种族年龄
      : `${era.get(`cflag:${cid}:451`) || 0} 岁`; // 人类年龄
    if (
      getbit(BIT_RACE_AGE) &&
      getbit(BIT_HUMAN_AGE) &&
      (era.get(`cflag:${cid}:451`) || 0) !== (era.get(`cflag:${cid}:452`) || 0)
    ) {
      // 换算人类年龄（{..., 3} 是右对齐宽 3）
      age_str += ` (换算人类${pad_left(String(era.get(`cflag:${cid}:451`) || 0), 3)} 岁)`;
    }
    if (talent(cid, TALENT_MAOU_SHADOW) !== 0) {
      // 寿命倒计时（{CFLAG:820, 3} 同样右对齐宽 3）
      age_str += ` [寿命还有${pad_left(String(era.get(`cflag:${cid}:820`) || 0), 3)} 天]`;
    }
  }
  // 年龄行同样入标题行：右对齐宽 48（位 12 未开时为空白）
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
 * 整数部分右对齐宽 3。
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
 * show_block：一人称行 + 身高三围行 + 体力/气力条（带受注任务）。
 *
 * 受注中的任务名（页码 1）/ 障碍聚合（页码 2）/ 讨伐对象（页码 3）分别
 * 拼在两条状态行后，条件见文件尾的 quest_guard。FLAG:8 位 3 = 勇者的
 * 任务揭示板。
 *
 * @param {number} cid 角色 ID
 * @returns {Promise<void>}
 */
async function show_block(cid) {
  // 非魔王判断（化简见文件头）。三围行要用它；收行不镜像（#596 起——
  // ere 的 print 自成一行，收行由引擎负责）
  const is_not_master = cid !== 0;
  const show_size = getbit(BIT_SIZE) && is_not_master;

  if (is_not_master) {
    // 一人称行：左对齐宽 26
    era.print(`一人称：${pad_display(self_call(cid), 26)}`);
    // [8] 一人称重设：ere 的 input 只接受本轮已打印按钮的快捷键（#129），
    // 输入 8 的路径必须由真按钮接入——用 printButton（#384 改名按钮同款
    // 通例），按钮自成一行；正文不写 [8] 前缀（AGENTS.md 硬约束），
    // 尾部半角空格保留
    era.printButton('一人称重设 ', 8);
  }

  if (show_size) {
    // 身高三围行（罩杯括号接在同一行尾）
    const bust = [
      // 前导两格（3 个空格减去 1 个命令分隔符，见 chara-info-abl-mark.js 文件头）
      { content: '\u00A0\u00A0' },
      {
        content: `身高 ${size_str(cid, 453)} cm\u3000B ${size_str(cid, 455)} cm`,
      },
    ];
    if (talent(cid, TALENT_MAN) === 0) {
      bust.push({ content: pad_display(`(${cup_size(cid)})`, 7) });
    } else {
      bust.push({ content: NBSP.repeat(7) }); // （男性不显示罩杯，补 7 格保持行宽）
    }
    era.print(bust);
  }

  // 受注任务名（页码 1；页码 0 时检查不成立）
  if (quest_guard(cid)) {
    await quest_now()(cid, '名前', 1);
  }
  // 条自身成行，此处不补空行
  // 体力条（「同行拼接」的说明见文件头）
  life_bar(cid);
  if (show_size) {
    // 体重/腰围行
    era.print(`体重 ${size_str(cid, 454)} kg\u3000W ${size_str(cid, 456)} cm`);
  }
  if (quest_guard(cid)) {
    await quest_now()(cid, '名前', 2);
  }
  // 同上，条自身成行
  // 气力条
  vital_bar(cid);
  if (show_size) {
    // 臀围行（对齐衬垫不镜像，见文件头）
    era.print(` H ${size_str(cid, 457)} cm`);
  }
  if (quest_guard(cid)) {
    await quest_now()(cid, '名前', 3);
  }
  // 同上，条自身成行
}

/**
 * quest_select 的**惰性**取用：dungeon-quest.js 顶层 require 了
 * dungeon-battle.js，而后者顶层又 require 回 dungeon-quest（#178 的既有写法）；
 * 本文件经 chara-make → page-chara-info-show 被更早拉进那条链时，顶层引入
 * 会把 dungeon-quest 变成半成品（dungeon-battle 捕到的 `quest_mod` 缺函数）。
 * 只有受注任务那一条支路用它，就在用到处取。
 * @returns {Function} dungeon-quest 的 quest_select
 */
function quest_now() {
  return require('#/dungeon/dungeon-quest').quest_select;
}

/**
 * 受注任务段的检查：该角色接了任务（CFLAG:534 == 1）、处于任务中
 * （CFLAG:1 == 2，勇者状态）、且任务揭示板功能开着（FLAG:8 位 3）。
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
