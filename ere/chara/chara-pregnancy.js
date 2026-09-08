/**
 * @file 妊娠、生产与育儿（issue #346，阶段 5a L15）。
 *
 * 源: target/ERB/其他/NINSIN.ERB 全函数（:16-1098）。
 *
 * 移植说明：
 *   - MASTER 恒为角色 ID 0；SAVESTR 读 callname:id:-1。
 *   - RAND:N 经 rand 参数逐层透传；测试可注入确定性序列。
 *   - 生产的复制角色用 addCharacter([新 ID, 预设 ID])。动态 ID 从 1000
 *     起按预设编号各保留 100 位，令存档中的 ID 可反推出原作 NO；这既避免
 *     覆盖预设角色，也让同一预设连续生子和多代生育保留模板身份。
 *   - 原作调教外借 TFLAG:13 传 SELF_KOJO 事件码，走 game.train 的调用链
 *     临时值，不伪造调教期。
 *   - 三处 JUMP 都是不返回的尾调用：GB_DEFINE_NAME 与 CHILD_CARE_BEGIN
 *     直接返回被调函数结果；SUMMON_MONSTER 侧的自跳见对应模块。
 */

'use strict';

const era = require('#/era-electron');
const { char_size_generate } = require('#/chara/chara-body');
const { chara_ex } = require('#/chara/chara-ex');
const {
  family_birth_to_dad,
  family_birth_to_mom,
  nid,
  nid_get_type,
  nid_r,
} = require('#/chara/chara-family');
const { chara_make } = require('#/chara/chara-make');
const { chara_make_inherit } = require('#/chara/chara-make-inherit');
const { chara_name_random_define } = require('#/chara/chara-name');
const { st_up } = require('#/dungeon/dungeon-lvup');
const { item_name } = require('#/dungeon/monster-data');
const summon_mod = require('#/dungeon/monster-summon');
const { game } = require('#/facade/game');
const { chara } = require('#/facade/chara');
const { self_kojo } = require('#/kojo/kojo-system');
const { ntr_child_birth } = require('#/system/ntr');
const era_flag = require('#/era-utils/era-flag');
const { stub_line } = require('#/utils/stub-line');

const MAX_CHARANUM = 90;
const FIRST_CHILD_ID = 1000;
const CHILD_ID_BLOCK_SIZE = 100;
const STUBBED_CALLS = ['CHARA_INFO_CALLBACK'];

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

function talent_name(id) {
  return era.get(`talentname:${id}`) ?? '';
}

function setting_bit(bit) {
  return ((game.dungeon.游戏设定 >> bit) & 1) !== 0;
}

function int_div(value, divisor) {
  return Math.trunc(value / divisor);
}

function allocate_child_id(source) {
  const added = new Set(era.getAddedCharacters());
  // 每个预设保留一个 100 位区间，令存档中的角色 ID 自带原作 NO；角色总数
  // 上限为 90，因此单一预设不可能耗尽一个区间。
  let cid = FIRST_CHILD_ID + (source - 1) * CHILD_ID_BLOCK_SIZE;
  while (added.has(cid)) cid += 1;
  return cid;
}

function template_no_of(cid) {
  if (cid < FIRST_CHILD_ID) return cid;
  return Math.trunc((cid - FIRST_CHILD_ID) / CHILD_ID_BLOCK_SIZE) + 1;
}

function child_source_init(child, source) {
  if (!era.addCharacter([child, source])) {
    // 原作 GB_ADD_GUARD 会抽出 200，但静态预设只有 201–211；按 #14 的
    // 先 1:1 原则保留这个随机失败出口，不擅自把下界修成 201。
    throw new Error(`后代预设角色 ${source} 不存在`);
  }
  if (source >= 17 || source === 0) {
    return chara_ex.call(source, { whenMissing: 0, args: [child] });
  }
  return 0;
}

function resolve_father(mother) {
  const stored = chara(mother).event.孩子父亲;
  if (stored === 0) return 0;
  return stored > 0 ? nid_r(stored - 1) : stored;
}

/** @N_FLAG_CLEAR（:872-881）：清除受孕来源、日期与父亲记录。 */
function n_flag_clear(cid) {
  if (chara(cid).invasion.状态 === 10) chara(cid).invasion.状态 = 0;
  chara(cid).system.主人膣内射精 = 0;
  chara(cid).event.妊娠相手 = 0;
  chara(cid).system.助手膣内射精 = 0;
  chara(cid).system.对象膣内射精 = 0;
  chara(cid).dungeon.客膣内射精 = 0;
  chara(cid).dungeon.犬膣内射精 = 0;
  chara(cid).dungeon.怪物膣内射精 = 0;
  chara(cid).system.狂王膣内射精 = 0;
  chara(cid).event.预产日 = 0;
  chara(cid).event.孩子父亲 = 0;
  chara(cid).event.孩子父亲名字 = '';
  return 0;
}

/** @PREG_TALENT_GET（:202-234）：取得妊娠与异常妊娠素质。 */
async function preg_talent_get(cid) {
  const kind = chara(cid).train.异常妊娠部位;
  const place = {
    1: '于乳房怀孕了',
    2: '于精巢怀孕了',
    3: '因被肛交中出而导致怀孕了',
    4: '因吞精而而导致口腔怀孕了',
    '-1': '于子宫怀孕了',
  }[kind];
  if (place) era.print(place);
  era.print('');
  era.print(`${name_of(cid)}获得了【${talent_name(153)}】`);
  const special = { 1: 341, 2: 342, 3: 343, 4: 344 }[kind];
  if (special) {
    era.print(`${name_of(cid)}获得了【${talent_name(special)}】`);
    era.set(`talent:${cid}:${special}`, 1);
  }
  await era.waitAnyKey();
  chara(cid).chara.妊娠 = 1;
  chara(cid).train.异常妊娠部位 = 0;
  return 1;
}

/** @N_BREAST_GROW（:887-916）：胸部尺寸上升一档。 */
function n_breast_grow(cid, rand = default_rand) {
  const view = chara(cid).chara;
  if (view.绝壁) {
    era.print(
      `${name_of(cid)}的胸部从【${talent_name(116)}】膨胀为【${talent_name(109)}】了。`,
    );
    view.绝壁 = 0;
    view.贫乳 = 1;
  } else if (view.贫乳) {
    era.print(
      `${name_of(cid)}的胸部从【${talent_name(109)}】膨胀为普通大小了。`,
    );
    view.贫乳 = 0;
  } else if (view.巨乳) {
    era.print(
      `${name_of(cid)}的胸部从【${talent_name(110)}】膨胀为【${talent_name(114)}】了。`,
    );
    view.巨乳 = 0;
    view.爆乳 = 1;
  } else if (view.爆乳) {
    era.print(
      `${name_of(cid)}的胸部从【${talent_name(114)}】膨胀为【${talent_name(119)}】了。`,
    );
    view.爆乳 = 0;
    view.超乳 = 1;
  } else if (!view.超乳) {
    era.print(
      `${name_of(cid)}的胸部从普通大小膨胀为【${talent_name(110)}】了。`,
    );
    view.巨乳 = 1;
  }
  if (cid !== 0 && (setting_bit(12) || setting_bit(15))) {
    const result = char_size_generate(cid, chara(cid).chara.年龄, 1, rand);
    era.set(`cflag:${cid}:454`, result[3]); // CFLAG:454 体重
    era.set(`cflag:${cid}:455`, result[4]); // CFLAG:455 胸围
  }
  return 0;
}

/** @N_BREAST_REVERSE（:922-943）：胸部尺寸下降一档。 */
function n_breast_reverse(cid, rand = default_rand) {
  const view = chara(cid).chara;
  if (view.超乳) {
    // 原作 :925-926 将已为 1 的超乳再次写成 1，是“超乳不退档”的字面
    // 缺陷；按 #14 的先 1:1 原则保留，不改成 爆乳。
    view.超乳 = 1;
  } else if (view.爆乳) {
    view.爆乳 = 0;
    view.巨乳 = 1;
  } else if (view.巨乳) {
    view.巨乳 = 0;
  } else if (!view.贫乳 && !view.绝壁) {
    view.贫乳 = 1;
  } else {
    return 0;
  }
  if (cid !== 0 && (setting_bit(12) || setting_bit(15))) {
    const result = char_size_generate(cid, chara(cid).chara.年龄, 1, rand);
    era.set(`cflag:${cid}:454`, result[3]); // CFLAG:454 体重
    era.set(`cflag:${cid}:455`, result[4]); // CFLAG:455 胸围
  }
  return 0;
}

/** @N_RESET_STATUS（:829-851）：妊娠/育儿结束后的恢复。 */
function n_reset_status(cid, rand = default_rand) {
  const view = chara(cid).chara;
  if (view.超乳) {
    era.print(`${name_of(cid)}超乳仍然淫乱地胀大着缩不回去了。`);
  } else {
    n_breast_reverse(cid, rand);
    era.print(`由于不再给孩子哺乳，${name_of(cid)}的胸部而变小了。`);
  }
  if (view.母乳体质 === 1) {
    view.母乳体质 = 0;
    era.print(`${name_of(cid)}不再泌乳了。`);
  }
  view.妊娠 = 0;
  view.育儿中 = 0;
  chara(cid).dungeon.体力上限 += 500;
  n_flag_clear(cid);
  return 0;
}

/** @CHILD_BIRTH_PLACE（:856-867）：输出异常生产部位。 */
function child_birth_place_text(cid) {
  if (chara(cid).chara.乳内妊娠) return '从巨大的乳房中';
  if (chara(cid).chara.精巢妊娠) return '从巨大的阴囊，通过阴茎';
  if (chara(cid).chara.肛内妊娠) return '从巨大的腹中，通过肛门';
  if (chara(cid).chara.口内妊娠) return '从巨大的腹中，通过口腔';
  return '';
}

function child_birth_place(cid) {
  const text = child_birth_place_text(cid);
  if (text) era.print(text);
  return 0;
}

/** 妊娠压力公式；独立入口用于精确验证各项增减。 */
function n_change_stress(cid) {
  const source = chara(cid).event.妊娠相手;
  const father = resolve_father(cid);
  const love = chara(cid).stronghold.爱慕;
  const lewd = chara(cid).stronghold.淫乱;
  let stress = 0;
  if (!love && lewd && source === 1) stress += 30;
  if ((source === 2 || source === 3) && (love || lewd)) {
    const relation = era.get(`relation:${cid}:${father}`) || 0;
    stress += relation
      ? 10 * int_div(200 - relation, 100) + (love ? 10 : 0)
      : love
        ? 20
        : 10;
  }
  if (source === 4) stress += love ? 80 : lewd ? 50 : 0;
  if (source === 5) {
    stress += love ? 100 : lewd ? 80 : 40;
    if (era.get(`talent:${cid}:136`)) stress -= 40; // 牝犬
    if ((era.get(`cflag:${cid}:601`) || 0) === 900) stress -= 40; // 野狗配偶
  }
  if (source === 6) {
    stress += love ? 100 : lewd ? 80 : 40;
    if ((era.get(`talent:${cid}:314`) || 0) === 9) stress -= 40; // 魔族
    const spouse = era.get(`cflag:${cid}:601`) || 0; // CFLAG:601 结婚对象
    if (spouse >= 1 && spouse <= 12) stress -= 40;
  }
  if (source === 7) stress += love ? 80 : lewd ? 30 : 0;
  if (!love && !lewd) stress += 50;
  if (chara(cid).chara.生育经验 > 0 && !love && !lewd) {
    stress += chara(cid).chara.生育经验 * 5;
  }
  if (era.get(`talent:${cid}:12`)) stress -= 20; // 刚强
  if (chara(cid).chara.母性) stress -= 40;
  if (era.get(`talent:${cid}:134`)) stress += 20; // 软弱
  if (chara(cid).chara.生育经验) stress -= 20;
  return stress;
}

/** @N_CHANGE_STATUS（:647-823）：妊娠发觉时的身体与精神变化。 */
async function n_change_status(cid, rand = default_rand) {
  chara(cid).dungeon.体力上限 = Math.max(1, chara(cid).dungeon.体力上限 - 500);
  chara(cid).dungeon.体力 = Math.min(
    chara(cid).dungeon.体力上限,
    chara(cid).dungeon.体力,
  );
  n_breast_grow(cid, rand);
  era.print(`由于怀孕，${name_of(cid)}的胸部而变大了。`);
  if (!chara(cid).chara.母乳体质) {
    era.print(`${name_of(cid)}开始分泌母乳了。`);
    await era.waitAnyKey();
    chara(cid).chara.母乳体质 = 1;
  }

  const stress = n_change_stress(cid);
  const love = chara(cid).stronghold.爱慕;
  const lewd = chara(cid).stronghold.淫乱;

  if (stress < 100 || cid === 0) {
    era.print(`${name_of(cid)}高兴地爱抚着自己的肚子………`);
  } else if (!chara(cid).stronghold.崩坏) {
    era.print(`${name_of(cid)}呆如木鸡，`);
    era.print(`${name_of(cid)}的心中，有什么东西坏掉了……`);
    era.print(`${name_of(cid)}的精神【${talent_name(9)}】了。`);
    await era.waitAnyKey();
    if (love) {
      era.print(`${name_of(cid)}失去了【${talent_name(85)}】。`);
      chara(cid).stronghold.爱慕 = 0;
    }
    if (lewd) {
      era.print(`${name_of(cid)}失去了【${talent_name(76)}】。`);
      chara(cid).stronghold.淫乱 = 0;
    }
    chara(cid).stronghold.崩坏 = 1;
    await era.waitAnyKey();
  }
  era_flag.target = cid;
  await game.train.with_self_kojo_event(11, () =>
    self_kojo(rand, undefined, true),
  );
  era.drawLine();
  return 0;
}

/** @NINSIN_AWARE（:68-199）：检查受孕条件并进入妊娠状态。 */
async function ninsin_aware(cid, rand = default_rand) {
  const cv = chara(cid).chara;
  if (
    cv.妊娠 ||
    cv.育儿中 ||
    cv.乳内妊娠 ||
    cv.精巢妊娠 ||
    cv.肛内妊娠 ||
    cv.口内妊娠
  )
    return 0;
  if (!setting_bit(2)) return 0;
  const abnormal = chara(cid).stronghold.异常妊娠体质;
  if ((cv.处女 || cv.私处封印 || cv.男人) && !abnormal) return 0;
  if (cv.年龄 <= 9) {
    n_flag_clear(cid);
    return 0;
  }
  const kind = chara(cid).train.异常妊娠部位;
  if ([1, 2, 3, 4].includes(kind) && !abnormal) return 0;
  if (kind === 2 && !era.get(`talent:${cid}:121`) && !cv.男人) return 0;
  if (cv.年龄 <= 14 && rand(5) > 1) {
    n_flag_clear(cid);
    return 0;
  }
  const chance = chara(cid).stronghold.排卵诱发剂 ? 11 : 5;
  if (rand(chance) <= 2) {
    n_flag_clear(cid);
    return 0;
  }

  const source = chara(cid).event.妊娠相手;
  const due = chara(cid).event.预产日;
  const long_term = source >= 1 && source <= 4;
  if (
    !(source >= 1 && source <= 7) ||
    due > era_flag.day_count + (long_term ? 54 : 24)
  )
    return 0;

  era.print(`${name_of(cid)}的样子有点奇怪……`);
  if (source === 1) era.print(`${name_of(cid)}好像有了${name_of(0)}的孩子，`);
  else if (source === 2 || source === 3)
    era.print(
      `${name_of(cid)}好像有了${chara(cid).event.孩子父亲名字}的孩子，`,
    );
  else if (source === 4)
    era.print(`${name_of(cid)}好像有了连名字都不知道的男人的孩子，`);
  else if (source === 5) era.print(`${name_of(cid)}好像有了野狗的孩子。`);
  else if (source === 6) {
    let monster = '怪物';
    if (chara(cid).dungeon.胎儿怪物编号 > 0 && rand(3) === 0) {
      monster = item_name(chara(cid).dungeon.胎儿怪物编号);
    } else {
      chara(cid).dungeon.胎儿怪物编号 = 0;
    }
    era.print(`${name_of(cid)}好像有了${monster}的孩子。`);
  } else era.print(`${name_of(cid)}好像有了狂王的孩子，`);
  if (source !== 6) era.print('');
  await preg_talent_get(cid);
  if (source === 5 || source === 6) {
    era.print('异种妊娠经验+1');
    chara(cid).chara.异种妊娠经验 += 1;
    await era.waitAnyKey();
    cv.妊娠 = 1;
  }
  await n_change_status(cid, rand);
  return 1;
}

/** @NINSIN_REACH_TERM（:239-292）：临产前移动与迎击召回。 */
async function ninsin_reach_term(cid, rand = default_rand) {
  era.print(`${name_of(cid)}快要临盘了……`);
  if (chara(cid).invasion.状态 === 9) {
    era.print(`为了准备生产，${name_of(cid)}被移动到了狂王的育儿室。`);
    await era.waitAnyKey();
    era.drawLine();
    return 0;
  }
  let state = chara(cid).invasion.状态;
  if (![3, 7, 8].includes(state)) {
    await era.printAndWait(`为了准备生产，${name_of(cid)}被移动到了育儿室。`);
    chara(cid).invasion.状态 = 10;
  }
  if (setting_bit(10)) {
    if (game.event.上次调教对象 === cid) game.event.上次调教对象 = -1;
    if (game.event.上次助手 === cid) game.event.上次助手 = -1;
  } else {
    if (state === 3) {
      await era.printAndWait(
        `为了准备生产，迎击中的${name_of(cid)}开始了返回。`,
      );
      chara(cid).invasion.回城标志 = 0;
    }
    if (state === 0 || state === 3) chara(cid).invasion.状态 = 10;
    if (game.event.上次调教对象 === cid) game.event.上次调教对象 = -1;
    if (game.event.上次助手 === cid) game.event.上次助手 = -1;
  }
  state = chara(cid).invasion.状态;
  if (state === 3) {
    await era.printAndWait(`为了准备生产，迎击中的${name_of(cid)}开始了返回。`);
    if (rand(9) > 0) {
      await era.printAndWait(`${name_of(cid)}希望被传送召回`);
      stub_line('CHARA_INFO_CALLBACK', `角色 ${cid} 的传送召回`);
    } else {
      chara(cid).invasion.回城标志 = 0;
    }
  }
  era.drawLine();
  return 0;
}

/** @GB_DEFINE_NAME（:628-642）：按父母名字类型尾调用随机命名。 */
function gb_define_name(child, mother, father, rand = default_rand) {
  const type =
    father > 0
      ? nid_get_type(nid(father))
      : mother > 0
        ? nid_get_type(nid(mother))
        : -1;
  return chara_name_random_define(child, type, rand);
}

async function finish_child(child, source, mother, father, race, levels, rand) {
  gb_define_name(child, mother, father, rand);
  family_birth_to_mom(child, mother, rand);
  family_birth_to_dad(child, father, rand);
  await chara_make(child, 0, race === 0 ? -1 : race, rand, source);
  chara_make_inherit(child, mother, father);
  for (let i = 0; i < levels; i += 1) st_up(child, rand);
  chara(child).invasion.状态 = 0;
  return child;
}

/** @GB_ADD_GUARD（:470-558）：生成近卫后代。 */
async function gb_add_guard(mother = 0, father = 0, rand = default_rand) {
  const other = mother === 0 ? father : mother;
  const other_template = other > 0 ? template_no_of(other) : other;
  let source;
  // 原作字面为 RAND:11 + 200，其中 200 没有角色预设；见
  // child_source_init 的 #14 缺陷说明。
  if (other_template === -2 || other_template === -3) source = 200 + rand(11);
  else if (other_template < 0) source = 1 + rand(16);
  else if (
    (other_template >= 1 && other_template <= 16) ||
    (other_template >= 200 && other_template <= 210)
  )
    source = other_template;
  else source = 1 + rand(16);
  const child = allocate_child_id(source);
  await child_source_init(child, source);
  era.set(`ex_talent:${child}:1`, 1); // EX_TALENT:1 近卫后代
  era.set(`ex_talent:${child}:2`, 1); // EX_TALENT:2 后代
  if (other > 0) {
    era.set(`talent:${child}:319`, era.get(`talent:${other}:319`) || 0); // TALENT:319 种族2
    if (source >= 200 && source <= 210) era.set(`talent:${child}:322`, source); // TALENT:322 现种族
  }
  era.set(`talent:${child}:314`, 9); // TALENT:314 种族=魔族
  era.set(`talent:${child}:321`, 9); // TALENT:321 原种族=魔族
  if ((era.get(`talent:${child}:322`) || 0) < 190)
    era.set(`talent:${child}:322`, 191 + rand(3));
  if (father === 0 || mother === 0) era.set(`ex_talent:${child}:3`, 1); // 魔王替身
  const base_level =
    other >= 0
      ? int_div(
          (era.get(`cflag:${other}:9`) || 0) + (era.get('cflag:0:9') || 0),
          2,
        )
      : era.get('cflag:0:9') || 0;
  const levels = int_div(base_level * 6 + rand(8), 10);
  return finish_child(child, source, mother, father, 9, levels, rand);
}

/** @GB_ADD_SLAVE（:563-625）：生成普通奴隶/勇者后代。 */
async function gb_add_slave(mother, father, rand = default_rand) {
  const mother_template = template_no_of(mother);
  const source =
    (mother_template >= 1 && mother_template <= 16) ||
    (mother_template >= 200 && mother_template <= 210)
      ? mother_template
      : 1 + rand(16);
  const child = allocate_child_id(source);
  await child_source_init(child, source);
  era.set(`ex_talent:${child}:2`, 1); // EX_TALENT:2 后代
  const race = era.get(`talent:${mother}:314`) || 0;
  era.set(`talent:${child}:314`, race);
  era.set(`talent:${child}:319`, era.get(`talent:${mother}:319`) || 0);
  era.set(`talent:${child}:321`, race);
  era.set(
    `talent:${child}:322`,
    source >= 200 && source <= 210
      ? source
      : era.get(`talent:${mother}:322`) || 0,
  );
  const base_level =
    father >= 0
      ? int_div(
          (era.get(`cflag:${father}:9`) || 0) +
            (era.get(`cflag:${mother}:9`) || 0),
          2,
        )
      : era.get(`cflag:${mother}:9`) || 0;
  const levels = int_div(
    base_level * 6 + (base_level > 0 ? rand(base_level) * 2 : 0),
    10,
  );
  await finish_child(child, source, mother, father, race, levels, rand);
  if (chara(mother).invasion.状态 === 9 || chara(mother).invasion.状态 === 2)
    chara(child).invasion.状态 = 2;
  return child;
}

/** @NINSIN_GIVE_BIRTH（:420-464）：按双亲类型生成后代或怪物。 */
async function ninsin_give_birth(mother, rand = default_rand) {
  const father = resolve_father(mother);
  if (era.getAddedCharacters().length >= MAX_CHARANUM) {
    await era.printAndWait(`（当前登录角色数量超出最大数量${MAX_CHARANUM}）`);
    if (mother === 0) await summon_mod.summon_monster_master(0, rand);
    else await summon_mod.summon_monster(mother, rand);
    return -1;
  }
  if (mother === 0 || father === 0) return gb_add_guard(mother, father, rand);
  if (father === -2 || father === -3) {
    await summon_mod.summon_monster(mother, rand);
    return -1;
  }
  return gb_add_slave(mother, father, rand);
}

function child_description(cid, father) {
  if (father === 0) return `${name_of(0)}的孩子`;
  if (father >= 0) return `${chara(cid).event.孩子父亲名字}的孩子`;
  return (
    {
      '-1': '不知道是谁的孩子',
      '-2': '野狗的孩子',
      '-3': '怪物的孩子',
      '-4': '狂王的孩子',
    }[father] ?? '没有父亲的孩子'
  );
}

/** @CHILD_CARE_CHANGE_NURSE（:981-1068）：改由合格的母性角色照看。 */
async function child_care_change_nurse(cid, rand = default_rand) {
  const eligible = era
    .getAddedCharacters()
    .filter(
      (id) =>
        !chara(id).chara.妊娠 &&
        !chara(id).chara.育儿中 &&
        chara(id).chara.母性 &&
        !chara(id).stronghold.崩坏 &&
        chara(id).stronghold.出售与助手资格 === 2 &&
        chara(id).invasion.状态 === 0,
    );
  const broken = chara(cid).stronghold.崩坏;
  if (!eligible.length) {
    era.print(
      `${broken ? '崩坏了的' : '现在的'}${name_of(cid)}不能照顾孩子。找不到照看孩子的人，${name_of(0)}不得已将孩子遗弃了。`,
    );
    await era.waitAnyKey();
    n_reset_status(cid, rand);
    return 0;
  }
  era.print(
    `${broken ? '崩坏了的' : '现在的'}${name_of(cid)}不能照顾孩子。要把孩子交给谁来照顾？`,
  );
  await era.waitAnyKey();
  era.drawLine();
  for (const [index, id] of eligible.entries()) {
    era.printButton(name_of(id), index);
  }
  era.drawLine();
  const abandon = eligible.length;
  era.printButton('- 遗弃孩子', abandon);
  let selected;
  for (;;) {
    selected = await era.input();
    if (Number.isInteger(selected) && selected >= 0 && selected <= abandon)
      break;
    await era.clear(1);
  }
  if (selected === abandon) {
    era.print(`${name_of(0)}不得已将孩子遗弃了。`);
    await era.waitAnyKey();
  } else {
    selected = eligible[selected];
    chara(selected).event.预产日 = chara(cid).event.预产日;
    chara(selected).invasion.状态 = 10;
    chara(selected).chara.育儿中 = 1;
    if (selected === era_flag.target) era_flag.target = -1;
    if (selected === era_flag.assi) era_flag.assi = -1;
    era.print(`${name_of(selected)}开始在育儿室照顾孩子。`);
    if (!chara(selected).chara.母乳体质 && !chara(selected).chara.男人) {
      era.print(`${name_of(selected)}开始分泌母乳了。`);
      chara(selected).chara.母乳体质 = 1;
    }
    if (!chara(selected).chara.男人) {
      era.print(`由于给孩子哺乳，${name_of(selected)}的胸部变大了。`);
      n_breast_grow(selected, rand);
    }
    await era.waitAnyKey();
  }
  n_reset_status(cid, rand);
  return 0;
}

/** @CHILD_CARE_BEGIN（:949-974）：进入育儿室；崩坏者尾调用换人。 */
async function child_care_begin(cid, rand = default_rand) {
  if (chara(cid).stronghold.崩坏) return child_care_change_nurse(cid, rand);
  era.print(`${cid === 0 ? name_of(0) : name_of(cid)}开始在育儿室照顾孩子。`);
  chara(cid).invasion.状态 = 10;
  if (game.event.上次调教对象 === cid) game.event.上次调教对象 = -1;
  if (game.event.上次助手 === cid) game.event.上次助手 = -1;
  chara(cid).chara.育儿中 = 1;
  if (
    chara(cid).stronghold.爱慕 &&
    chara(cid).event.孩子父亲 === 0 &&
    !chara(cid).chara.母性
  ) {
    era.print(`${name_of(cid)}温柔地哄着为你生下的孩子………`);
    era.print(`看来${name_of(cid)}的【${talent_name(155)}】觉醒了。`);
    chara(cid).chara.母性 = 1;
  }
  await era.waitAnyKey();
  return 0;
}

/** @NINSIN_REACH_DAY（:297-414）：生产日的流产、NTR 与正常生产分支。 */
async function ninsin_reach_day(cid, rand = default_rand) {
  const stored_father = chara(cid).event.孩子父亲;
  const father = resolve_father(cid);
  if (stored_father > 0 && father >= 0) {
    chara(cid).event.孩子父亲名字 = name_of(father);
  }
  const description = child_description(
    cid,
    stored_father > 0 ? stored_father : father,
  );
  chara(cid).dungeon.私处扩张经验 += 1;
  chara(cid).chara.生育经验 += 1;
  const state = chara(cid).invasion.状态;
  if (state === 3 || state === 2) {
    await era.printAndWait(
      `在地下城内的${name_of(cid)}突然感到一阵剧痛，晕了过去………`,
    );
    if (father === -2 || father === -3) {
      era.print(
        // 原作两处 CALL CHILD_BIRTH_PLACE 都漏传 ARG；用户函数缺省参数为
        // 0，故非魔王生产也读取 0 号角色。缺陷按 #14 的 1:1 原则保留。
        `从血泊中醒来的${name_of(cid)}发现自己在昏迷时${child_birth_place_text(0)}生下了孩子……`,
      );
      await ninsin_give_birth(cid, rand);
      chara(cid).dungeon.体力 = int_div(chara(cid).dungeon.体力, 3);
      chara(cid).dungeon.气力 = int_div(chara(cid).dungeon.气力, 3);
    } else {
      await era.printAndWait(`从血泊中醒来的${name_of(cid)}发现自己流产了………`);
      chara(cid).dungeon.体力上限 = int_div(chara(cid).dungeon.体力上限, 3);
      chara(cid).dungeon.体力 = int_div(chara(cid).dungeon.体力, 6);
      chara(cid).dungeon.气力 = int_div(chara(cid).dungeon.气力, 6);
    }
    n_reset_status(cid, rand);
    return 0;
  }
  if (state === 9) {
    era_flag.target = cid;
    await game.train.with_self_kojo_event(12, () => ntr_child_birth(rand));
    n_reset_status(cid, rand);
    return 0;
  }
  await era.printAndWait(
    `${name_of(cid)}平安的${child_birth_place_text(0)}生下了${description}。`,
  );
  era_flag.target = cid;
  await game.train.with_self_kojo_event(12, () =>
    self_kojo(rand, undefined, true),
  );
  if (father === -2 || father === -3) {
    chara(cid).invasion.状态 = 0;
    await ninsin_give_birth(cid, rand);
    n_reset_status(cid, rand);
    return 0;
  }
  if (chara(cid).stronghold.爱慕 && father === 0) game.chara.爱之奴隶所生 += 1;
  if (
    game.chara.爱之奴隶所生 >= 3 &&
    !chara(0).chara.父性 &&
    chara(0).chara.男人
  ) {
    era.print(`${name_of(0)}的【${talent_name(156)}】觉醒了。`);
    await era.waitAnyKey();
    chara(0).chara.父性 = 1;
  }
  chara(cid).chara.妊娠 = 0;
  if (
    chara(cid).chara.处女 &&
    !chara(cid).chara.乳内妊娠 &&
    !chara(cid).chara.精巢妊娠 &&
    !chara(cid).chara.肛内妊娠 &&
    !chara(cid).chara.口内妊娠
  ) {
    era.print(`${name_of(cid)}再生的处女膜因为生产而破损了………`);
    chara(cid).chara.处女 = 0;
  }
  chara(cid).chara.乳内妊娠 = 0;
  chara(cid).chara.精巢妊娠 = 0;
  chara(cid).chara.肛内妊娠 = 0;
  chara(cid).chara.口内妊娠 = 0;
  await child_care_begin(cid, rand);
  return 0;
}

/** @CHILD_CARE_DEPART（:1074-1098）：育儿结束并生成孩子。 */
async function child_care_depart(cid, rand = default_rand) {
  era.print(`${name_of(cid)}照顾的孩子终于可以离开母亲了。`);
  era.drawLine();
  await era.waitAnyKey();
  era_flag.target = cid;
  await game.train.with_self_kojo_event(14, () =>
    self_kojo(rand, undefined, true),
  );
  const child = await ninsin_give_birth(cid, rand);
  if (child >= 0) {
    await era.printAndWait(
      `${name_of(cid)}带着起名为${name_of(child)}的孩子离开了育儿室。`,
    );
    chara(cid).invasion.状态 = 0;
    chara(child).invasion.状态 = 0;
  }
  n_reset_status(cid, rand);
  era.drawLine();
  return 0;
}

/** @NINSIN_MAIN（:16-64）：每日妊娠/生产/育儿推进。 */
async function ninsin_main(rand = default_rand) {
  for (const cid of [...era.getAddedCharacters()]) {
    if ((await ninsin_aware(cid, rand)) === 1) continue;
    if (!chara(cid).chara.妊娠 && !chara(cid).chara.育儿中) continue;
    const due = chara(cid).event.预产日;
    if (due - 3 === era_flag.day_count) {
      era.drawLine();
      await ninsin_reach_term(cid, rand);
    } else if (due === era_flag.day_count) {
      era.drawLine();
      await ninsin_reach_day(cid, rand);
    } else if (due - era_flag.day_count >= 0 && due - era_flag.day_count <= 3) {
      if (!setting_bit(10) && chara(cid).invasion.状态 === 0) {
        chara(cid).invasion.状态 = 10;
        era.drawLine();
        era.print(`${name_of(cid)}被移动到了育儿室中……`);
        era.drawLine();
      }
    } else if (due + 5 === era_flag.day_count) {
      era.drawLine();
      await child_care_depart(cid, rand);
    } else if (chara(cid).chara.育儿中) {
      era.drawLine();
      era.print(`${name_of(cid)}在育儿室照顾孩子……`);
      era.drawLine();
    }
  }
  return 0;
}

module.exports = {
  STUBBED_CALLS,
  MAX_CHARANUM,
  ninsin_main,
  ninsin_aware,
  preg_talent_get,
  ninsin_reach_term,
  ninsin_reach_day,
  ninsin_give_birth,
  gb_add_guard,
  gb_add_slave,
  gb_define_name,
  n_change_stress,
  n_change_status,
  n_reset_status,
  child_birth_place,
  n_flag_clear,
  n_breast_grow,
  n_breast_reverse,
  child_care_begin,
  child_care_change_nurse,
  child_care_depart,
};
