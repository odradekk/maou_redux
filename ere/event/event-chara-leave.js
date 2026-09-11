/**
 * @file 角色离队与归队（issue #405）：调教对象/助手离队时的存档描述串序列化
 * + 队伍/据点引用清理 + 除名，以及归队时的反序列化与重建。
 *
 * 源: target/ERB/EVENT/EVENT_CHARA_LEAVE.ERB  @EVENT_CHARA_LEAVE（:1-70）、
 *     @EVENT_CHARA_RETURN（:71-160，截断，见下）
 *
 * 调用点 ENDINGDATA_ADDON1.ERB:434（`CALL EVENT_CHARA_LEAVE(85, GETCHARA(33))`）
 * 在 #404（N20）范围内，本票只落函数真身，签名定死：`event_chara_leave(arg,
 * cid)` 与该调用点的两个实参一一对应（ARG 字面量 85、cid = 扁平化角色 ID，
 * #21），N20 接线时不需要再改参数形状。`event_chara_return` 全库零调用者
 * （实测：346 个 ERB 文件里提到 `EVENT_CHARA_RETURN` 的唯一位置就是它自己
 * 的定义行），签名不受任何调用方约束。
 *
 * 四条移植决议（均是本票实测发现，工单简报未列出）：
 *
 * 一、STR（Emuera 内置全局字符串数组）已被 issue #5 判「丢弃」——与
 *     RESULTS/CDFLAG/TA/TB 同组，ere 没有对应表，也不该为了这一对函数
 *     新开一张（新开等于推翻 #5）。但 @EVENT_CHARA_LEAVE 恰恰把 STR:ARG
 *     当跨调用持久存储用——这正是 #5 决议第 3 条点名要逐个甄别的风险
 *     （「移植每个函数时需确认它是否真的依赖跨调用残留」），#5 定案时
 *     显然没见过这两个函数。处置：不新开表，把 STR:ARG 的角色改造成
 *     JS 返回值——`event_chara_leave` 把原作要写进 STR:ARG 的描述串直接
 *     `return`，是否持久化交给调用方；`arg` 形参保留但函数体不使用，
 *     只为与调用点字面量 85 的签名形状一致。
 *
 * 二、`@EVENT_CHARA_RETURN` 全库零调用者，且源文件在 :160 截断——最后一行
 *     是 `STR:ARG = `（无右值、无 RETURN，file 到此为止；`od -c` 核对过
 *     不是读取工具的问题）。截断点前最后一句语义完整（「若未生成过身体
 *     数据则调用 CHAR_BODY_GENERATE_WAPPED」），本移植在此收尾，不构造
 *     截断之后的半句。
 *
 * 三、`@EVENT_CHARA_RETURN` 的反序列化下标整体错位一格——原作 bug，非本
 *     项目误读。`@EVENT_CHARA_LEAVE` 用 "_" 拼出 13 段（0=NO / 1=CFLAG:9
 *     等级 / 2=NICKNAME / 3=ABL / 4=BASE / 5=MAXBASE / 6=CFLAG / 7=EXP /
 *     8=EQUIP / 9=JUEL / 10=TALENT / 11=MARK / 12=CSTR，SPLIT 后从 0 起序
 *     ——emuera-basic-agent-guide 的 string-operations.md 逐字确认），但
 *     `@EVENT_CHARA_RETURN` 通篇按 `LOCALS:1`=NO、`LOCALS:3`=NAME、
 *     `LOCALS:4`=ABL……逐项 +1 地读，`LOCALS:2`（本该是等级）从未被读取。
 *     这不是任何文档化的 SPLIT 变体，是原作单纯的下标笔误——逐字复刻会让
 *     函数把 ABL 数据写进等级、BASE 数据写进 ABL……产出的角色状态是纯
 *     垃圾，且因为零调用者、没有黄金样本能验证这坨垃圾「对不对」。本
 *     移植按 `@EVENT_CHARA_LEAVE` 实际写出的位置（0-based）读回，让这对
 *     函数第一次成为可用、可测的原地往返；这处偏离不影响任何外部可观察
 *     行为——1:1 复刻的对象（一个从未被调用过的函数）根本不存在可观察
 *     行为。
 *
 * 四、原作 `CALL PARTY_CHAR_DEL`（:67）之前的 FLAG:1/FLAG:2 第二次调整（:62-65，"前回の助手・
 *     調教対象より前だった場合减算"，`SIF FLAG:1==CHARA THEN FLAG:1=0` /
 *     `SIF FLAG:2>CHARA THEN FLAG:2=0`）与 `ere/dungeon/dungeon-party.js`
 *     的 `@PARTY_CHAR_DEL` 重排段是同一种事故：依赖 DELCHARA 后注册号
 *     前移的补偿写法，ere 扁平化（#21）下角色号=预设号、removeCharacter
 *     不重排，此段落地即会误杀活引用——按该文件先例同判「死代码不移植」
 *     （见该文件头「@PARTY_CHAR_DEL 的重排段不移植」）。FLAG:1 的这一行
 *     还可独立证实不可达：它紧跟在同判据 `FLAG:1==CHARA→-1` 之后，此时
 *     FLAG:1 已不可能仍等于 CHARA。
 */

'use strict';

const era = require('#/era-electron');
const { game } = require('#/facade/game');
const { chara } = require('#/facade/chara');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { st_up } = require('#/dungeon/dungeon-lvup');
const { stub_line } = require('#/utils/stub-line');

function get(name) {
  return era.get(name) || 0;
}

// VARSIZE("<表>") 的 ere 等价物：Emuera 按 CSV 声明容量枚举
// （target/CSV/VariableSize.csv），ere 没有「表容量」查询（issue #5 决议：
// 稀疏声明，不追求容量对齐）。改用 issue #5 决议实测的全库最大字面量下标
// 上留出余量兜底——原作声明容量本身远超实际使用（如 TALENT 声明 10000、
// 全库最大字面量下标约 320），此兜底值不影响归档完整性。
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
 * @EVENT_CHARA_LEAVE（:1-70）：角色离队——存档描述串序列化 + 队伍/据点
 * 引用清理 + 除名。
 *
 * @param {number} arg 原作 STR 槽位号（ere 不落 STR 表，见文件头一；仅为
 *   与调用点 `EVENT_CHARA_LEAVE(85, GETCHARA(33))` 的签名形状一致而保留，
 *   函数体内不使用）
 * @param {number} cid 离队角色 ID（原作 CHARA，#21 扁平化直传）
 * @returns {string} 描述串（原作写入 STR:ARG 的内容；调用方按需持久化，
 *   原作 CALL 不读 RETURN 值）
 */
// eslint-disable-next-line no-unused-vars -- arg 仅为调用点签名占位，见文件头一
function event_chara_leave(arg, cid) {
  // :3-5 NO_等级_呼び名 前缀（#21：角色号本就是预设号，NO:CHARA = cid）
  const level = get(`cflag:${cid}:9`);
  const nickname = era.get(`callname:${cid}:-2`) ?? '';

  // :6-54 十张二维表按非零/非空条目归档
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

  // :55-59 前回の助手・調教対象だった場合はフラグを空に（第二次「减算」
  // 调整是 DELCHARA 重排残留，按 dungeon-party.js 先例不移植，见文件头四）
  if (get('flag:1') === cid) {
    game.event.上次调教对象 = -1;
  }
  if (get('flag:2') === cid) {
    game.event.上次助手 = -1;
  }

  // :67 队伍/据点引用清理（@PARTY_CHAR_DEL 已实现，issue #172）
  party_char_del(cid);
  // :69 DELCHARA
  era.removeCharacter(cid);

  return descriptor;
}

/**
 * @EVENT_CHARA_RETURN（:71-160，截断于 :160 不构造）：角色归队——反序列化
 * 存档描述串、重建角色数据、按 setlv 补足等级。
 *
 * 反序列化下标按 `event_chara_leave` 的实际写出位置读取（0-based），不
 * 复刻原作的下标错位 bug，见文件头三。
 *
 * @param {string} descriptor `event_chara_leave` 的返回值
 * @param {number} [setlv=0] 归队后的最低等级（原作 SETLV，:71 默认 0）
 * @param {(n: number) => number} [rand] ST_UP 掷骰的随机源（透传给
 *   `st_up`，缺省见 dungeon-lvup.js）
 * @returns {number} 归队角色 ID（原作 RETURN 无值；本函数额外返回 cid
 *   供调用方链式使用，不影响忽略返回值的既有调用形状）
 */
function event_chara_return(descriptor, setlv = 0, rand) {
  const parts = String(descriptor ?? '').split('_');
  const cid = Number(parts[0]); // NO:CHARA（#21：角色号=预设号）
  const archived_level = Number(parts[1] || 0);
  const nickname = parts[2] ?? '';

  // :79 空白キャラを作成 + NO 指定（ADDVOIDCHARA + NO:CHARA = … → ere
  // 扁平化下即 addCharacter(cid)，复用原预设，#21）
  era.addCharacter(cid);

  // :82-87 名前の設定（SAVESTR 与 CALLNAME 原作同源同值，#5 决议统一落
  // callname 表的 -1/-2 两槽）
  era.set(`callname:${cid}:-1`, nickname);
  era.set(`callname:${cid}:-2`, nickname);

  // :89-138 十张二维表回填（CFLAG:9 等级另议，见下方 archived_level 注释）
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
  // 无对应源行——原作从未读回 LOCALS:2（等级），本移植按 event_chara_leave
  // 实际写出位置补上，见文件头三
  chara(cid).chara.等级 = archived_level;

  // :140-143 侵入階層/侵攻度/侵攻中設定リセット（前两个各归属 dungeon/
  // event 域，走门面已有具名字段；CFLAG:1 角色状态同样走门面具名字段）
  chara(cid).dungeon.侵攻阶层 = 0;
  chara(cid).event.侵攻度 = 0;
  chara(cid).invasion.状态 = 0;

  // :145-151 SETLV に届かない場合はその差分だけ ST_UP
  const level = get(`cflag:${cid}:9`);
  if (level < setlv) {
    const times = setlv - level;
    for (let i = 0; i < times; i += 1) {
      st_up(cid, rand);
    }
  }

  // :153-154 HP/気力を上限まで回復
  chara(cid).dungeon.体力 = get(`maxbase:${cid}:0`);
  chara(cid).dungeon.气力 = get(`maxbase:${cid}:1`);

  // :157-158 身体データ未生成なら生成（CHAR_BODY_GENERATE_WAPPED 全库仍是
  // 存根，接线随点亮该位的族票，见 docs/stub-registry.md）
  if (get(`cflag:${cid}:451`) === 0) {
    stub_line('CHAR_BODY_GENERATE_WAPPED', '角色身体数据生成');
  }

  return cid;
}

module.exports = { event_chara_leave, event_chara_return };
