/**
 * @file 调教录像出售与水晶录像书架（issue #336）。
 *
 * 源: target/ERB/售卻相關/SELL_VIDEO.ERB 全文（:7-1244）
 */

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara_callname } = require('#/utils/callname-utils');

const ARCHIVE_SIZE = 20000;

// :191-710 的直线指令表。列依次为：指令、基础价值、能力加成、部位、内容、
// 倾向、特殊；对象键是 PLAY_* 的下标。带装备切换或条件分支的指令在
// apply_command 的 switch 中处理，不在此表重复表达。
const COMMAND_SPECS = [
  [0, 50, 0, { 0: 2, 1: 2 }, { 1: 3 }],
  [1, 50, 0, { 0: 3 }, { 1: 3 }],
  [4, 200, 32, { 0: 3 }, { 1: 3 }],
  [5, 100, 0, { 1: 3 }, { 1: 3 }],
  [6, 100, 0, {}, {}, { 1: 3 }],
  [7, 300, 17, { 0: 2, 2: 2 }, {}, { 4: 2 }],
  [9, 150, 0, { 3: 3 }, { 1: 3 }],
  [10, 250, 0, { 0: 3 }, { 2: 3 }],
  [12, 300, 0, { 0: 3 }, { 2: 3 }],
  [14, 150, 0, { 0: 3 }, { 2: 3 }],
  [15, 150, 0, { 1: 3 }, { 2: 3 }],
  [16, 500, 0, { 1: 3 }, { 2: 3 }, { 3: 3 }, { 4: 10 }],
  [17, 100, 0, { 0: 3 }, { 2: 3 }, { 4: 3 }],
  [19, 700, 0, { 3: 3 }, { 2: 3 }],
  [20, 800, 30, { 2: 3 }, { 3: 3 }],
  [21, 1300, 30, { 2: 3 }, { 3: 3 }],
  [22, 700, 30, { 2: 3 }, { 3: 3 }],
  [23, 1500, 30, { 2: 3 }, { 3: 3 }],
  [26, 1000, 30, { 3: 3 }, { 3: 3 }],
  [27, 1500, 30, { 3: 3 }, { 3: 3 }],
  [28, 900, 30, { 3: 3 }, { 3: 3 }],
  [29, 1700, 30, { 3: 3 }, { 3: 3 }],
  [30, 300, 32, {}, {}, { 1: 3 }],
  [31, 500, 32, {}, {}, { 1: 3 }],
  [32, 650, 32, { 1: 3 }, {}, { 1: 3 }],
  [33, 770, 32, { 0: 3 }, { 3: 3 }, { 1: 3 }],
  [34, 1700, 30, { 2: 3 }, { 3: 3 }, { 2: 3 }],
  [36, 1700, 30, { 3: 3 }, { 3: 3 }, { 2: 3 }],
  [38, 550, 20, {}, {}, { 2: 3 }],
  [40, 250, 21, {}, {}, { 3: 3 }],
  [41, 450, 21, {}, {}, { 3: 3 }],
  [42, 700, 21, {}, {}, { 3: 3 }],
  [43, 150, 0, {}, {}, { 3: 5 }],
  [45, 100, 0, {}, {}, { 3: 5 }],
  [50, 100, 0, {}, {}, {}, { 1: 20 }],
  [56, 10],
  [60, 100],
  [61, 250, 33, {}, { 3: 3 }, { 1: 3 }, { 6: 3 }],
  [62, 800],
  [63, 1000, 33, { 0: 3 }, { 1: 3 }, {}, { 9: 10 }],
  [64, 3000, 0, { 2: 2, 3: 2 }, { 3: 5 }, {}, { 6: 3 }],
  [65, 1200, 33, { 3: 3 }, { 3: 3 }, {}, { 6: 3 }],
  [66, 800, 32, {}, {}, { 1: 3 }, { 6: 3 }],
  [68, 800, 32, {}, {}, { 1: 3 }, { 6: 3 }],
  [69, 600, 32, { 0: 3 }, {}, { 1: 3 }],
  [70, 1200, 0, { 0: 3 }, {}, { 1: 3 }, { 6: 3 }],
  [71, 1300, 0, { 1: 3 }, {}, { 1: 3 }, { 6: 3 }],
  [80, 1000, 32, {}, {}, { 3: 3 }],
  [81, 2000, 21, { 2: 3 }, { 4: 10 }],
  [82, 2500, 21, { 3: 3 }, { 4: 10 }],
  [83, 3000, 21, { 2: 2, 3: 2 }, { 4: 20 }],
  [85, 500, 17, {}, {}, {}, { 5: 5 }],
  [86, 600, 17, {}, {}, {}, { 5: 5 }],
  [90, 900, 35, { 1: 3 }, { 3: 3 }, { 3: 3 }, { 4: 10 }],
  [101, 800, 0, { 2: 3 }, { 3: 3 }, {}, { 8: 5 }],
  [102, 1000, 0, { 3: 3 }, { 3: 3 }, {}, { 8: 5 }],
  [103, 300, 0, { 0: 3 }, { 1: 3 }, {}, { 8: 5 }],
  [104, 300, 0, { 1: 3 }, { 1: 3 }, {}, { 8: 5 }],
  [105, 1000, 0, { 1: 3 }, {}, { 3: 3 }, { 4: 10, 8: 5 }],
  [106, 800, 0, {}, {}, { 3: 20 }, { 3: 20, 8: 5 }],
  [107, 1500, 0, { 3: 3 }, {}, { 3: 3 }, { 5: 20, 8: 5 }],
  [108, 800, 0, {}, {}, { 3: 3 }, { 8: 5 }],
  [109, 1000, 0, { 0: 3 }, { 1: 3 }, {}, { 8: 5, 10: 10 }],
  [120, 1200, 30, { 2: 3 }, { 3: 3 }],
  [121, 1400, 30, { 2: 3 }, { 3: 3 }],
  [122, 200, 32, { 0: 3 }, { 1: 3 }],
  [123, 700, 32, { 1: 3 }, {}, { 1: 3 }],
  [124, 750, 32, {}, {}, { 1: 5 }],
  [125, 800, 32, { 0: 2, 1: 2 }, {}, { 1: 3 }],
  [126, 600, 32, {}, {}, { 1: 4 }],
  [127, 800, 32, {}, {}, { 1: 5 }],
  [128, 800, 30, { 2: 3 }, { 3: 3 }],
  [129, 900, 30, { 1: 2, 2: 3 }, { 3: 3 }],
  [130, 1000, 30, { 2: 3 }, { 3: 4 }],
  [131, 1300, 30, { 1: 2, 2: 3 }, { 3: 3 }],
  [132, 1400, 30, { 2: 3 }, { 3: 3 }, { 2: 3 }],
  [133, 1500, 30, { 2: 3 }, { 3: 3 }],
  [134, 1500, 30, { 2: 3 }, { 3: 3 }],
];
const COMMAND_BY_ID = new Map(COMMAND_SPECS.map((spec) => [spec[0], spec]));

const MALE_LIVES = [
  '奴隶',
  '学生',
  '神官',
  '农民',
  '渔民',
  '男妓',
  '小偷',
  '乞丐',
  '大少爷',
  '穷人',
  '守墓人',
  '咒术师',
  '圣人',
  '预言家',
  '占卜师',
  '店员',
  '采药人',
  '隐士',
  '店员',
  '军人',
  '奴隶',
  '主夫',
];
const FEMALE_LIVES = [
  '奴隶',
  '学生',
  '修道女',
  '农妇',
  '海女',
  '妓女',
  '女贼',
  '乞丐',
  '大小姐',
  '穷人',
  '守墓人',
  '巫女',
  '圣女',
  '预言家',
  '占卜师',
  '看板娘',
  '采药人',
  '千金',
  '看板娘',
  '军人',
  '奴隶',
  '主妇',
];

const times = (value, multiplier) => Math.trunc(value * multiplier);

function add_values(target, values = {}) {
  for (const [index, amount] of Object.entries(values)) {
    target[Number(index)] += amount;
  }
}

/** :98-712：解析一帧录像内容并返回下一帧装备状态与本帧价值。 */
function apply_command(cid, assi, command, equipment, state) {
  let score = 0;
  let bonus_abl = 0;
  const toggle = (bit) => {
    equipment = equipment & bit ? equipment - bit : equipment | bit;
  };

  switch (command) {
    case 54:
      if (equipment & 1) equipment -= 1;
      else {
        score = 500;
        state.extra[7] += 4;
        equipment |= 1;
      }
      break;
    case 58:
      toggle(2);
      break;
    case 59:
      toggle(4);
      break;
    case 44:
      if (equipment & 8) equipment -= 8;
      else {
        score = 500;
        state.action[3] += 4;
        state.extra[3] += 4;
        equipment |= 8;
      }
      break;
    case 11:
      score = 300;
      state.cbva[2] += 3;
      state.menu[2] += 3;
      toggle(16);
      break;
    case 13:
      score = 700;
      state.cbva[3] += 3;
      state.menu[2] += 3;
      toggle(32);
      break;
    case 46:
      if (equipment & 64) {
        score = 1500;
        state.cbva[3] += 3;
        state.menu[2] += 3;
        state.action[3] += 5;
        state.extra[5] += 20;
        equipment -= 64;
      } else equipment |= 64;
      break;
    case 89:
      toggle(128);
      break;
    case 100:
      if (equipment & 256) equipment -= 256;
      else {
        score = 100;
        state.extra[8] += 5;
        equipment |= 256;
      }
      break;
    case 18:
      if (equipment & 512) equipment -= 512;
      else {
        equipment |= 512;
        score = 100;
      }
      break;
    case 2:
      score = equipment & 32 ? 600 : 100;
      state.cbva[3] += 3;
      state.menu[1] += 3;
      if (equipment & 32) state.menu[2] += 3;
      break;
    case 3:
      bonus_abl = 31;
      if (equipment & 16 && equipment & 32) {
        score = 1800;
        state.cbva[2] += 2;
        state.cbva[3] += 2;
        state.menu[2] += 3;
        state.action[4] += 5;
      } else if (equipment & 16) {
        score = 1000;
        state.cbva[2] += 3;
        state.menu[2] += 3;
        state.action[4] += 3;
      } else if (equipment & 32) {
        score = 1300;
        state.cbva[3] += 3;
        state.menu[2] += 3;
        state.action[4] += 3;
      } else if (equipment & 512) {
        score = 1200;
        state.cbva[0] += 2;
        state.cbva[1] += 2;
        state.menu[2] += 3;
        state.action[4] += 3;
      } else {
        score = 500;
        state.cbva[0] += 2;
        state.cbva[1] += 2;
        state.action[4] += 3;
      }
      break;
    case 8:
      score = equipment & 16 ? 400 : 150;
      state.cbva[2] += 3;
      state.menu[1] += 3;
      if (equipment & 16) state.menu[2] += 3;
      break;
    default: {
      const spec = COMMAND_BY_ID.get(command);
      // COM50（润滑液）在兽奸装备中不计价，也不追加题材。
      if (spec && !(command === 50 && equipment & 128)) {
        [, score = 0, bonus_abl = 0] = spec;
        add_values(state.cbva, spec[3]);
        add_values(state.menu, spec[4]);
        add_values(state.action, spec[5]);
        add_values(state.extra, spec[6]);
      }
    }
  }

  // 三个持续装备位依次覆盖能力加成，顺序必须与原作一致。
  if (equipment & 1) {
    bonus_abl = 17;
    state.extra[7] += 1;
  }
  if (equipment & 8) {
    bonus_abl = 21;
    state.extra[3] += 1;
  }
  if (equipment & 128) {
    bonus_abl = 39;
    state.extra[11] += 1;
  }
  if (state.video_assi === 1) state.extra[5] += 1;

  // 四条有额外素质条件的直线指令。
  if (command === 4 && era.get(`talent:${cid}:121`)) state.extra[10] += 10;
  if (command === 17 && !era.get(`talent:${cid}:121`)) state.extra[10] += 10;
  if (command === 60 && !era.get(`talent:${assi}:122`)) {
    bonus_abl = 33;
    state.extra[9] += 3;
  }
  if (command === 122 && !era.get(`talent:${cid}:121`)) state.extra[10] += 10;

  if (bonus_abl !== 0) {
    const level = era.get(`abl:${cid}:${bonus_abl}`) || 0;
    if (level > 5) score = times(score, 1.5);
    else if (level > 2) score = times(score, 1.2);
    else if (level > 0) score = times(score, 1.1);
  }
  return { equipment, score };
}

/** :876-1056：由人物背景与录像题材生成标题。 */
function make_video_title(cid, state) {
  let title = '';
  if (state.action[1] > 3) {
    title += Math.floor(Math.random() * 2) ? '虐待癖' : '抖S';
  } else if (state.action[2] > 3) {
    if (Math.floor(Math.random() * 3) === 1) title += '受虐癖';
    else if (Math.floor(Math.random() * 3) === 2) title += '被虐狂';
    else title += '抖M';
  }

  if (era.get(`talent:${cid}:140`)) title += '母控';
  if (era.get(`talent:${cid}:141`)) title += '父控';
  if (era.get(`talent:${cid}:142`)) title += '萝莉控';
  if (era.get(`talent:${cid}:143`)) title += '正太控';
  if (era.get(`talent:${cid}:157`)) title += '人妻';
  if (era.get(`talent:${cid}:153`)) title += '孕妇';

  const life = era.get(`talent:${cid}:315`) || 0; // 成为勇者前的生活
  const lives = era.get(`talent:${cid}:122`) ? MALE_LIVES : FEMALE_LIVES;
  title += lives[life] || '奴隶';
  if ((era.get(`abl:${cid}:17`) || 0) >= 4) title += chara_callname(cid);
  title += '的';

  if (state.extra[7] > 3) title += '野外';
  if (state.extra[3] > 3) title += '紧缚';
  if (state.extra[10] > 3) title += '扶她';
  if (state.extra[9] > 3) title += '百合';
  if (state.extra[6] > 3) title += '乱交';
  if (state.extra[11] > 3) title += '兽奸';

  if (state.cbva[0] > 6) {
    title +=
      era.get(`talent:${cid}:122`) || era.get(`talent:${cid}:121`)
        ? '阴茎蹂躏'
        : '阴蒂蹂躏';
  } else if (state.cbva[1] > 6) title += '乳房蹂躏';
  else if (state.cbva[2] > 3) title += '子宫口蹂躏';
  else if (state.cbva[3] > 3) title += '肛门';

  // 原作检查 PLAY_ACTION 下标 0，但所有“侍奉”累计都写在下标 1；保持差异。
  if (state.action[0] > 3) title += '侍奉';
  else if (state.action[4] > 3) title += '自慰';
  else if (state.menu[3] > 3) title += '性交';
  else title += '调教';
  return title;
}

/** @returns {string} */
function archive_title(index) {
  return era.get(`videoarchive:${index}`) || '';
}

/** 把给定片名写入首个空槽；满架时按原作静默丢弃。 */
function archive_first_empty(title) {
  for (let index = 0; index < ARCHIVE_SIZE; index += 1) {
    if (archive_title(index) === '') {
      era.set(`videoarchive:${index}`, title);
      return true;
    }
  }
  return false;
}

/**
 * @VIDEO_BACKUP（:1180-1193）：把角色最后一次出售的片名写进首个空槽。
 * @param {number} cid
 */
function video_backup(cid) {
  const title = chara(cid).stronghold.录像标题;
  archive_first_empty(title);
}

/**
 * @VIDEO_MATURO / @VIDEO_MATURO2（:1146-1179）的共同本体。
 * 两个原作入口逐字同构，仍分别导出以供售出与处刑调用方接线。
 */
function save_temporary_video(cid) {
  // EX_FLAG:9000 第 2 位 = 水晶球录像保存开关。
  if ((era_exflag.mod_switch_bits & 4) !== 0) {
    const stored = archive_first_empty(era.get('tstr:30') || '');
    if (
      stored &&
      !era.get(`talent:${cid}:220`) &&
      !era.get(`ex_talent:${cid}:2`)
    ) {
      era_exflag.crystal_ball_stock += 1;
    }
  }
  // TSTR:30 = 售卖物名暂存；开关关闭或书架已满也必须消费。
  era.set('tstr:30', '');
}

function video_maturo2(cid) {
  save_temporary_video(cid);
}

function video_maturo(cid) {
  save_temporary_video(cid);
}

/** @VIDEO_CHECK（:1194-1213）：统计书架中全部非空录像。 */
function video_check() {
  let count = 0;
  for (let index = 0; index < ARCHIVE_SIZE; index += 1) {
    if (archive_title(index) !== '') count += 1;
  }
  return count;
}

/**
 * @VIDEO_SHELF（:1214-1244）：从调用方保存的槽位起打印一页三列片名。
 * NO_PAGE 在原作函数体中未使用，保留形参以维持调用契约。
 * @param {number} no_page
 * @param {number} num_page
 * @param {number} content_count
 */
function video_shelf(no_page, num_page, content_count) {
  void no_page;
  const end = content_count + num_page * 3 + 1;
  let shown = content_count;
  let row = [];
  for (let index = content_count; index < end; index += 1) {
    const title = archive_title(index);
    if (title !== '') {
      row.push({
        type: 'text',
        content: `《${title}》`,
        config: { align: 'left', width: 8 },
      });
      shown += 1;
    }
    if (shown % 3 === 0 || (index === end - 1 && row.length > 0)) {
      era.printMultiColumns(row);
      row = [];
    }
  }
}

/**
 * @SELL_VIDEO（:7-1090）：结算当前调教中拍摄的录像。
 * @param {number} cid 调教对象
 * @param {number} assi 助手；0 表示无助手
 */
async function sell_video(cid = era_flag.target, assi = era_flag.assi) {
  if (!era.getAddedCharacters().includes(cid)) return 0;
  const target = chara(cid);

  // :25-32 仍在录像时先退一份魔力源，再删去“录像结束”占用的一格计数。
  if (target.train.录像摄影) game.train.水晶球魔力源 -= 1;
  target.train.录像时间 -= 1;
  if (target.train.录像时间 <= 0) return 0;

  era.drawLine();
  const state = {
    cbva: Array(10).fill(0),
    menu: Array(10).fill(0),
    action: Array(10).fill(0),
    extra: Array(20).fill(0),
    video_assi: 0,
  };
  // CFLAG:90 = 拍摄开始时的装备位图；原作全库无写点，仍按源文读取。
  let equipment = era.get(`cflag:${cid}:90`) || 0;
  let score = 0;

  // 上界排他：录像时间已先减一，消费 CFLAG:460..(460+录像时间-1)。
  for (let index = 0; index < target.train.录像时间; index += 1) {
    const packed = era.get(`cflag:${cid}:${index + 460}`) || 0;
    state.video_assi = Math.trunc(packed / 1000);
    const command = packed % 1000;
    const result = apply_command(cid, assi, command, equipment, state);
    equipment = result.equipment;
    score += result.score;
  }

  // TFLAG:32 = 录像内容位图；位 0 为处女丧失、位 1 为自我介绍。
  if (game.kojo.录像内容 & 1) {
    score += 5000;
    era.print(`影像中记录了${chara_callname(cid)}丧失处女的画面`);
    target.dungeon.异常经验 += 1;
    era.print(`${era.get('expname:50') || ''}＋１`);
  }
  if (game.kojo.录像内容 & 2) {
    const talking = era.get(`abl:${cid}:15`) || 0;
    const rates = [0.9, 1, 1.05, 1.1, 1.15, 1.2, 1.25];
    score = times(score, rates[Math.min(talking, 6)]);
  }

  // :783-840 素质倍率按源顺序逐项 TIMES，不合并，保留每步截断。
  const talent_rates = [
    [0, 1.2],
    [9, 0.5],
    [21, 0.7],
    [22, 0.7],
    [35, 1.1],
    [76, 1.5],
    [92, 1.3],
    [100, 1.2],
    [110, 1.2],
    [113, 1.3],
    [114, 1.4],
    [119, 1.6],
    [121, 1.2],
    [123, 0.1],
    [124, 1.1],
    [126, 1.3],
    [130, 1.2],
    [135, 2],
  ];
  for (const [talent, rate] of talent_rates) {
    if (era.get(`talent:${cid}:${talent}`)) score = times(score, rate);
  }
  // 男人且非幼稚时的折价是二项组合，不能并入上面的单素质表。
  if (era.get(`talent:${cid}:122`) && !era.get(`talent:${cid}:132`)) {
    score = times(score, 0.8);
  }

  // :842-865 ABL:70 被摄技能倍率。
  const camera_skill = era.get(`abl:${cid}:70`) || 0;
  const camera_rates = [0.5, 0.8, 1, 1.2, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2];
  score = times(score, camera_rates[Math.min(camera_skill, 10)]);

  const title = make_video_title(cid, state);
  if (score > 0) {
    await era.printAndWait(`调教时的视频有着${score}点的观赏价值。`);
    if (assi > 0 && (era.get(`abl:${assi}:15`) || 0) !== 0) {
      const edit_bonus = Math.trunc(
        (score * (era.get(`abl:${assi}:15`) || 0) * 5) / 100,
      );
      await era.printAndWait(
        `${chara_callname(assi)}的巧妙的编辑，令视频价值提高了${edit_bonus}点。`,
      );
      score += edit_bonus;
    }
    era.print(`卖录像的${score}点到手了。`);
    era_flag.money += score;
    era_exflag.legit_money += score;
    target.stronghold.录像价值 = score;
    target.stronghold.录像标题 = title;
    video_backup(cid);
    target.stronghold.录像属性 = -1;
    if (!era.get(`talent:${cid}:220`) && !era.get(`ex_talent:${cid}:1`)) {
      era_exflag.crystal_ball_stock += 1;
    }
  } else {
    era.print('录制的视频没有成为有用的东西。');
  }

  target.train.录像时间 = 0;
  await era.waitAnyKey();
  return 0;
}

/**
 * @EVENT_VIDEO_DAY（:1091-1145）：公开录像的每日浏览、粉丝与收入结算。
 * @param {number} cid
 */
async function event_video_day(cid) {
  if (!era.getAddedCharacters().includes(cid)) return 0;
  // CFLAG:497 = 公开许可（只读）；0 时整段不推进。
  if (!era.get(`cflag:${cid}:497`)) return 0;

  const view = chara(cid).stronghold;
  let viewers = Math.trunc(view.录像价值 / 10);
  // CFLAG:494 = 狂热度；1..99 时降低浏览数，随后按原作最低补 1。
  const mania = era.get(`cflag:${cid}:494`) || 0;
  if (mania > 0 && mania < 100) {
    viewers = Math.trunc((viewers * (100 - mania)) / 100) + 1;
  }
  let fans = Math.trunc(viewers / 100) + Math.floor(Math.random() * 2);
  fans *= Math.trunc(mania / 2) + 1;
  if (fans > viewers) fans = viewers;

  view.录像浏览数 += viewers;
  view.录像粉丝信数 += fans;

  if (view.录像标题 !== '') {
    era.println();
    era.print(`录制于水晶中的「${view.录像标题}」在黑市上流通了起来……`);
    await era.printAndWait(
      fans > 0
        ? `收到了${viewers}点金钱，并收到了${fans}封粉丝信。`
        : `收到了${viewers}点金钱。`,
    );
    era_flag.money += viewers;
    era_exflag.legit_money += viewers;
    era.println();
  }
  return 0;
}

module.exports = {
  event_video_day,
  sell_video,
  video_backup,
  video_check,
  video_maturo,
  video_maturo2,
  video_shelf,
};
