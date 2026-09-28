/**
 * @file 角色离队与归队（issue #405）：调教对象/助手离队时的存档描述串序列化
 * + 队伍/据点引用清理 + 除名，以及归队时的反序列化与重建。
 *
 * 调用点是结局追加数据的角色移除（`EVENT_CHARA_LEAVE(85, GETCHARA(33))`），
 * 在 #404（N20）范围内。这张工单只落函数真身，签名定死：`event_chara_leave(arg,
 * cid)` 与该调用点的两个实参一一对应（ARG 字面量 85、cid = 扁平化角色 ID，
 * #21），N20 接入时不需要再改参数形状。`event_chara_return` 没有调用者
 * ——它是配对提供的归队函数，签名不受任何调用方约束。
 *
 * 四条实现结论（均是这张工单实测发现，工单简报未列出）：
 *
 * 一、STR 字符串表按 issue #5 判「丢弃」——与 RESULTS/CDFLAG/TA/TB 同组，
 *     ere 没有对应表，也不该为了这一对函数新开一张（新开等于推翻 #5）。
 *     但 event_chara_leave 恰恰把 STR:ARG 当跨调用持久存储用——这正是
 *     #5 决议第 3 条明确列出、要逐个甄别的风险（「移植每个函数时需确认它是否
 *     真的依赖跨调用残留」）。处置：不新开表，把 STR:ARG 的角色改造成
 *     JS 返回值——`event_chara_leave` 把要写进 STR:ARG 的描述串直接
 *     `return`，是否持久化交给调用方；`arg` 形参保留但函数体不使用，
 *     只为与调用点字面量 85 的签名形状一致。
 *
 * 二、`event_chara_return` 没有调用者，且描述串写到一半就结束了——最后一行
 *     是 `STR:ARG = `（无右值、无 RETURN，`od -c` 核对过不是读取工具的问题）。
 *     截断点前最后一句语义完整（「若未生成过身体数据则调用身体生成」），
 *     本移植在此收尾，不构造截断之后的半句。
 *
 * 三、旧实现的反序列化下标整体错位一格——自带的 bug，非本项目误读。
 *     event_chara_leave 用 "_" 拼出 13 段（0=NO / 1=CFLAG:9 等级 /
 *     2=NICKNAME / 3=ABL / 4=BASE / 5=MAXBASE / 6=CFLAG /
 *     7=EXP / 8=EQUIP / 9=JUEL / 10=TALENT / 11=MARK / 12=CSTR，SPLIT 后从
 *     0 起序），但 event_chara_return 通篇按 `LOCALS:1`=NO、
 *     `LOCALS:3`=NAME、`LOCALS:4`=ABL……逐项 +1 地读，`LOCALS:2`（本该是
 *     等级）从未被读取。这不是任何文档化的 SPLIT 变体，是单纯的下标
 *     笔误——逐字复刻会让函数把 ABL 数据写进等级、BASE 数据写进
 *     ABL……产出的角色状态是纯垃圾，且因为零调用者、没有样本能验证这
 *     坨垃圾「对不对」。本移植按 event_chara_leave 实际写出的位置
 *     （0-based）读回，让这对函数第一次成为可用、可测的原地往返；这处
 *     偏离不影响任何外部可观察行为——复刻的对象（一个从未被调用过的
 *     函数）根本不存在可观察行为。
 *
 * 四、`CALL PARTY_CHAR_DEL` 之前的 FLAG:1/FLAG:2 第二次调整（"前回の助手・
 *     調教対象より前だった場合减算"，`SIF FLAG:1==CHARA THEN FLAG:1=0` /
 *     `SIF FLAG:2>CHARA THEN FLAG:2=0`）与 ere/dungeon/dungeon-party.js
 *     的 party_char_del 重排段是同一种事故：依赖删除后注册号前移的补偿
 *     写法，ere 扁平化（#21）下角色号=预设号、removeCharacter 不重排，此段
 *     实现即会误杀活引用——按该文件先例同判「死代码不移植」（该文件头有
 *     同款说明）。FLAG:1 的这一行还可独立证实不可达：它紧跟在同条件
 *     `FLAG:1==CHARA→-1` 之后，此时 FLAG:1 已不可能仍等于 CHARA。
 */

'use strict';

const era = require('#/era-electron');
const { char_body_generate_wapped } = require('#/chara/chara-body'); // #385 起真身
const { game } = require('#/facade/game');
const { chara } = require('#/facade/chara');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { st_up } = require('#/dungeon/dungeon-lvup');

function get(name) {
  return era.get(name) || 0;
}

// VARSIZE("<表>") 的 ere 等价物：旧引擎按 CSV 声明容量枚举，ere 没有「表
// 容量」查询（issue #5 决议：稀疏声明，不追求容量对齐）。容量按实测的
// 最大字面量下标留余量（如 TALENT 声明 10000、实际字面量下标约 320），
// 此余量不影响归档完整性。
const WALK_BOUND = {
  abl: 120,
  base: 20,
  cflag: 700,
  exp: 100,
  equip: 100,
  juel: 20,
  talent: 340,
  mark: 10,
  cstr: 20,
};

/** 某个二维表的非零/非空条目编码为 "序号,值/序号,值/…"（LEAVE 用） */
function encode_table(cid, table, bound, is_string = false) {
  const parts = [];
  for (let idx = 0; idx < bound; idx += 1) {
    const value = get(`${table}:${cid}:${idx}`);
    const present = is_string ? String(value ?? '').length > 0 : Boolean(value);
    if (present) {
      parts.push(`${idx},${value}`);
    }
  }
  return parts.join('/');
}

/** encode_table 的逆操作：把 "序号,值/…" 写回某个二维表（RETURN 用） */
function decode_table(cid, table, segment, is_string = false) {
  if (!segment) {
    return;
  }
  for (const piece of segment.split('/')) {
    const [idx_text, value_text] = piece.split(',');
    const idx = Number(idx_text);
    era.set(
      `${table}:${cid}:${idx}`,
      is_string ? value_text : Number(value_text),
    );
  }
}

/**
 * event_chara_leave：角色离队——存档描述串序列化 + 队伍/据点
 * 引用清理 + 除名。
 *
 * @param {number} arg STR 槽位号（ere 不落 STR 表，见文件头一；仅为
 *   与调用点的签名形状一致而保留，函数体内不使用）
 * @param {number} cid 离队角色 ID（#21 扁平化直传）
 * @returns {string} 描述串；调用方按需持久化
 *
 */
// eslint-disable-next-line no-unused-vars -- arg 仅为调用点签名占位，见文件头一
function event_chara_leave(arg, cid) {
  // NO_等级_呼び名 前缀（#21：角色号本就是预设号，NO:CHARA = cid）
  const level = get(`cflag:${cid}:9`);
  const nickname = era.get(`callname:${cid}:-2`) ?? '';

  // 十张二维表按非零/非空条目归档
  const descriptor = [
    cid,
    level,
    nickname,
    encode_table(cid, 'abl', WALK_BOUND.abl),
    encode_table(cid, 'base', WALK_BOUND.base),
    encode_table(cid, 'maxbase', WALK_BOUND.base),
    encode_table(cid, 'cflag', WALK_BOUND.cflag),
    encode_table(cid, 'exp', WALK_BOUND.exp),
    encode_table(cid, 'equip', WALK_BOUND.equip),
    encode_table(cid, 'juel', WALK_BOUND.juel),
    encode_table(cid, 'talent', WALK_BOUND.talent),
    encode_table(cid, 'mark', WALK_BOUND.mark),
    encode_table(cid, 'cstr', WALK_BOUND.cstr, true),
  ].join('_');

  // 前回の助手・調教対象だった場合はフラグを空に（第二次「减算」
  // 调整是删除重排残留，按 dungeon-party.js 先例不移植，见文件头四）
  if (get('flag:1') === cid) {
    game.event.上次调教对象 = -1;
  }
  if (get('flag:2') === cid) {
    game.event.上次助手 = -1;
  }

  // 队伍/据点引用清理（party_char_del 已实现，issue #172）
  party_char_del(cid);
  // 除名
  era.removeCharacter(cid);

  return descriptor;
}

/**
 * event_chara_return（截断点之后不构造）：角色归队——反序列化
 * 存档描述串、重建角色数据、按 setlv 补足等级。
 *
 * 反序列化下标按 `event_chara_leave` 的实际写出位置读取（0-based），不
 * 复刻旧实现的下标错位 bug，见文件头三。
 *
 * @param {string} descriptor `event_chara_leave` 的返回值
 * @param {number} [setlv=0] 归队后的最低等级（默认 0）
 * @param {(n: number) => number} [rand] ST_UP 掷骰的随机源（透传给
 *   `st_up`，缺省见 dungeon-lvup.js）
 * @returns {number} 归队角色 ID（本函数额外返回 cid
 *   供调用方链式使用，不影响忽略返回值的既有调用形状）
 */
function event_chara_return(descriptor, setlv = 0, rand) {
  const parts = String(descriptor ?? '').split('_');
  const cid = Number(parts[0]); // NO:CHARA（#21：角色号=预设号）
  const archived_level = Number(parts[1] || 0);
  const nickname = parts[2] ?? '';

  // 空白キャラを作成 + NO 指定（ADDVOIDCHARA + NO:CHARA = … → ere
  // 扁平化下即 addCharacter(cid)，复用原预设，#21）
  era.addCharacter(cid);

  // 名前の設定（名字与称呼同值，#5 决议统一落 callname 表的 -1/-2 两槽）
  era.set(`callname:${cid}:-1`, nickname);
  era.set(`callname:${cid}:-2`, nickname);

  // 十张二维表回填（CFLAG:9 等级另议，见下方 archived_level 注释）
  decode_table(cid, 'abl', parts[3]);
  decode_table(cid, 'base', parts[4]);
  decode_table(cid, 'maxbase', parts[5]);
  decode_table(cid, 'cflag', parts[6]);
  decode_table(cid, 'exp', parts[7]);
  decode_table(cid, 'equip', parts[8]);
  decode_table(cid, 'juel', parts[9]);
  decode_table(cid, 'talent', parts[10]);
  decode_table(cid, 'mark', parts[11]);
  decode_table(cid, 'cstr', parts[12], true);
  // 无对应行——等级段从未被读回，本移植按 event_chara_leave
  // 实际写出位置补上，见文件头三
  chara(cid).chara.等级 = archived_level;

  // 侵入階層/侵攻度/侵攻中設定リセット（前两个各归属 dungeon/
  // event 域，走门面已有具名字段；CFLAG:1 角色状态同样走门面具名字段）
  chara(cid).dungeon.侵攻阶层 = 0;
  chara(cid).event.侵攻度 = 0;
  chara(cid).invasion.状态 = 0;

  // SETLV に届かない場合はその差分だけ ST_UP
  const level = get(`cflag:${cid}:9`);
  if (level < setlv) {
    const times = setlv - level;
    for (let i = 0; i < times; i += 1) {
      st_up(cid, rand);
    }
  }

  // HP/気力を上限まで回復
  chara(cid).dungeon.体力 = get(`maxbase:${cid}:0`);
  chara(cid).dungeon.气力 = get(`maxbase:${cid}:1`);

  // 身体データ未生成なら生成（#385 起真身；此处只判年龄，
  // FLAG:5 位 12/15 的闸门在函数内部）
  if (get(`cflag:${cid}:451`) === 0) {
    char_body_generate_wapped(cid, rand);
  }

  return cid;
}

module.exports = { event_chara_leave, event_chara_return };
