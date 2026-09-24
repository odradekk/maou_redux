/**
 * @file 跨存档勇者通信。
 * 源: target/ERB/其他/MAOUNET.ERB  @MAOUNET、@EXPORT、@INPORT_A、@INPORT_B
 *
 * 原作 GLOBALS:0..99 在 EraElectron 4.8.0 已是废弃表名。这里把同样的
 * 100 条记录以 JSON 数组存入 global:100；数组元素仍保持原作下划线与
 * 斜线分隔格式，后续 CHARA_MAKE_INPORT 可以逐字段消费。
 */

'use strict';

const era = require('#/era-electron');
const { begin } = require('#/system/flow/begin-signal');
const { emit } = require('#/system/event/registry');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const era_global = require('#/era-utils/era-global');
const { chara_callname } = require('#/utils/callname-utils');

const BACKUP_SLOT = 999;
const SHARE_SLOT_FIRST = 1000;
const SHARE_SLOT_LAST = 1019;

/**
 * 导出菜单的两个固定编号（原作 MAOUNET.ERB:95-97 的 `[ 99] 决定` / `[100] 取消`）。
 * **#593 起偏离原作**，选点 998/999：
 *   - 候选行以**角色 ID** 作快捷键（export_menu 的 printButton），而预设 100
 *     「怪物的女儿」能以 ID 100 加入（加入路径见 #586 的完成评论），原作的
 *     `[100] 取消` 与 `if (result === 100) return 0` 会把这个角色吃掉；
 *   - 两个数都大于预设 ID 上界（当前 777，见 yml/Chara777.yml）、小于后代 ID
 *     段的起点 FIRST_CHILD_ID = 100000（chara-pregnancy.js；#560 的裁定），
 *     与两类角色 ID 都不同段；
 *   - 999 同时是全库「返回/退出」类键的通行编号（page-chara-info.js:626、
 *     sale.js:605、chara-marriage.js:815 与 842、page-ability-up.js:184、
 *     page-chara-info-show.js 的 LIST_RETURN），998 与它相邻、同属列表页
 *     997-999 的固定编号带（page-chara-info.js:625-627）。
 * 原作的 [99] 今天虽未与预设撞号，也一并移出预设区间——预设编号历来零散
 * 新增（150、201-211、223、777 都是后加的），留在区间内等于把它交给下一位
 * 加表的人。静态守卫见 test/child-id-collision.test.js 的「登记屏幕的同屏
 * 固定编号不与预设 ID 撞号」。
 */
const EXPORT_DECIDE = 998;
const EXPORT_CANCEL = 999;

const TABLE_SIZES = [
  ['abl', 110],
  ['base', 100],
  ['maxbase', 100],
  ['cflag', 1000],
  ['exp', 100],
  ['equip', 100],
  ['juel', 100],
  ['talent', 10000],
  ['mark', 100],
  ['cstr', 100],
];

function get_roster() {
  const value = era_global.communication_roster;
  return value ? JSON.parse(value) : [];
}

function set_roster(records) {
  era_global.communication_roster = JSON.stringify(records);
}

/**
 * LOADDATA 的转场等价物：更新 LASTLOAD_NO，重放 @EVENTLOAD，并把其中的
 * BEGIN 继续抛给外层状态机。特殊档不经过 page-save-load，必须在这里补齐。
 */
async function load_special_save(slot) {
  if (!(await era.loadData(slot))) return false;
  era_flag.last_load_no = slot;
  const next = await emit('EVENTLOAD');
  if (next !== undefined) begin(next);
  return true;
}

function sparse_values(cid, table, size) {
  // @INPORT_B 按表名与动态下标扫描全部序列化面，无法换成
  // 单个具名字段；表名与上界由 TABLE_SIZES 集中限定。
  let result = '';
  for (let index = 0; index < size; index += 1) {
    const value = era.get(`${table}:${cid}:${index}`);
    if (value) result += `${index},${value}/`;
  }
  return result;
}

function serialize_character(cid) {
  const current = chara(cid);
  const fields = [
    current.system.通信勇者唯一标记,
    cid, // NO:CHARA；ere 的角色 ID 即预设编号
    current.chara.等级,
    chara_callname(cid), // NICKNAME 的等价名字载体
  ];
  for (const [table, size] of TABLE_SIZES) {
    fields.push(sparse_values(cid, table, size));
  }
  return fields.join('_');
}

/** @INPORT_B：把特殊档中的角色写入公共通信记录，再恢复 999 号操作档。 */
async function inport_b() {
  const records = get_roster();
  const known = new Set(
    records.map((record) => String(record).split('_', 1)[0]),
  );
  let added = 0;
  for (const cid of era.getAddedCharacters()) {
    if (records.length >= 100) {
      await era.printAndWait('从别处来的勇者已经满员，无法追加！');
      break;
    }
    const unique = String(chara(cid).system.通信勇者唯一标记);
    if (known.has(unique)) continue;
    records.push(serialize_character(cid));
    known.add(unique);
    added += 1;
  }
  set_roster(records);
  await era.printAndWait(
    added ? `${added}名勇者追加完毕` : '没有可以追加的勇者',
  );
  await era.saveGlobal();
  await load_special_save(BACKUP_SLOT);
  return added;
}

/**
 * 生成只含选中角色的 1000 号共享档，然后恢复操作档。
 * @param {number[]} selected 角色 ID（最多五名，不含魔王与敌人）
 * @param {string} team_name 队伍名
 * @param {() => number} [now] GETMILLISECOND 的等价来源
 */
async function export_characters(selected, team_name, now = Date.now) {
  const chosen = [...new Set(selected)].slice(0, 5);
  await era.saveData(BACKUP_SLOT, '数据保存');
  const all = era.getAddedCharacters();
  const stamp = now();
  for (const cid of all) {
    if (chosen.includes(cid)) {
      chara(cid).system.通信勇者唯一标记 = stamp + cid;
    } else {
      era.removeCharacter(cid);
    }
  }
  await era.saveData(
    SHARE_SLOT_FIRST,
    `${new Date(stamp).toLocaleString('zh-CN')} ${team_name}`,
  );
  await era.printAndWait(
    '已经将队伍保存到了SAVE1000.sav，在其他存档中可以从这个文件召来勇者！',
  );
  await load_special_save(BACKUP_SLOT);
  return chosen.length;
}

async function export_menu() {
  const selected = [];
  const anchor = era.getLineCount();
  for (;;) {
    for (const cid of era.getAddedCharacters()) {
      if (cid === 0 || chara(cid).invasion.状态 !== 0) continue;
      const current = chara(cid);
      era.printButton(
        `${chara_callname(cid)} LV${current.chara.等级}\u3000HP ${current.dungeon.体力}／${current.dungeon.体力上限} 调教次数 ${current.stronghold.调教回数}`,
        cid,
        selected.includes(cid) ? { color: '#66ffff' } : undefined,
      );
    }
    era.drawLine();
    era.print(`请选择要共享到其他存档中的奴隶(${selected.length}/5)`);
    era.drawLine();
    era.printButton(
      '决定',
      EXPORT_DECIDE,
      selected.length === 0 ? { disabled: true } : undefined,
    );
    era.printButton('取消', EXPORT_CANCEL);
    const result = await era.input();
    if (result === EXPORT_CANCEL) return 0;
    if (result === EXPORT_DECIDE && selected.length > 0) {
      selected.forEach((cid) => era.print(chara_callname(cid)));
      era.print(`${selected.length}名勇者就可以了吗？`);
      era.printButton('好的', 0);
      era.printButton('不要', 1);
      if ((await era.input()) === 0) {
        era.print('请输入队伍名');
        // 原作 MAOUNET.ERB 的队伍名 INPUTS 没有空输入分支（直接落地），
        // 按 #567「没有空输入分支的地方不动」保持原样：0 在这里仍是字面量
        // 文本，不接共享判据——例外理由见 ere/utils/input-text.js 文件头。
        const team_name = String(await era.input({ useRule: false }));
        era.print(`「${team_name}」这个队伍名可以吗？`);
        era.printButton('好的', 0);
        era.printButton('不要', 1);
        if ((await era.input()) === 0) {
          return export_characters(selected, team_name);
        }
      }
    } else if (
      era.getAddedCharacters().includes(result) &&
      result !== 0 &&
      chara(result).invasion.状态 === 0
    ) {
      const index = selected.indexOf(result);
      if (index >= 0) selected.splice(index, 1);
      else if (selected.length < 5) selected.push(result);
      else await era.printAndWait('一次最多送出5人！');
    }
    await era.clear(era.getLineCount() - anchor);
  }
}

/** @INPORT_A：选择 1000..1019 号共享档并交给 INPORT_B 登记。 */
async function inport_a() {
  for (;;) {
    era.drawLine();
    era.print('请选择载入的序号');
    era.drawLine();
    for (let index = 0; index < 20; index += 1) {
      const comment = era.get(`global:saves:${index + SHARE_SLOT_FIRST}`);
      // listSaveFiles 受 saveFiles=99 限制，不维护 1000+ 的备注；这里不能据此
      // 禁用特殊档，只能在选择后以 loadData 的返回值判断文件是否存在。
      era.printButton(comment || `SAVE${index + SHARE_SLOT_FIRST}.sav`, index);
    }
    era.printButton('取消', 99);
    const result = await era.input();
    if (result === 99) return 0;
    if (result >= 0 && result <= SHARE_SLOT_LAST - SHARE_SLOT_FIRST) {
      await era.saveData(BACKUP_SLOT, '操作');
      const slot = result + SHARE_SLOT_FIRST;
      if (await load_special_save(slot)) return 0;
    }
    await era.clear(1);
  }
}

/** @MAOUNET：通信菜单。 */
async function maounet() {
  const anchor = era.getLineCount();
  for (;;) {
    era.printButton('将奴隶共享到其他存档', 0);
    era.printButton('从其他存档共享勇者', 1);
    era.printButton('去除从其他存档共享的勇者', 2);
    era.printButton(
      `设定通信勇者的等级上限(现在:Lv${game.system.外来勇者等级上限})`,
      3,
    );
    era.printButton(
      `通信勇者登场时为等级1(现在:${era_flag.communication_hero_level_one & 1 ? 'ON' : 'OFF'})`,
      4,
    );
    // MAOUNET_MODPRINT 的魔界银行（MOD_SWITCH ver1.0.11.ERB:181-186，守卫
    // GETBIT(EX_FLAG:9000,0)）随 MOD/ 整目录判不移植（#542，#540 范围
    // 决定 2）：开关默认关、原作默认态不打印该行，本函数也就不注册 [5]——
    // 输入层不会把 5 送进本函数。
    era.printButton('返回', 9);
    const result = await era.input();
    if (result === 9) return 0;
    if (result === 0) await export_menu();
    else if (result === 1) await inport_a();
    else if (result === 2) {
      set_roster([]);
      await era.saveGlobal();
      await era.printAndWait('已清除登录的通信勇者信息');
    } else if (result === 3) {
      era.print('请输入允许从其他存档来袭的勇者的等级上限');
      era.print('如果输入小于0的数值，则不会从其他存档共享勇者');
      game.system.外来勇者等级上限 = await era.input();
    } else if (result === 4) {
      era_flag.communication_hero_level_one ^= 1;
    }
    await era.clear(era.getLineCount() - anchor);
  }
}

module.exports = {
  get_roster,
  serialize_character,
  export_characters,
  inport_a,
  inport_b,
  maounet,
};
