/**
 * @file 婚姻：角色信息页的「结婚」与「恋人设定」入口、婚礼典礼与离婚
 * （issue #393，N9）。
 *
 * 调用点：ere/page/page-chara-info.js（「结婚」按钮与按下后的动作）。
 *
 * 移植说明（有意偏离既有行为，均注明依据）：
 *
 *   - **按钮正文不写 `[{NUM}]` 前缀**（chara-name-edit.js 同款处置）：引擎
 *     `printButton` 自动拼 `[快捷键] `，手写会渲染成 `[0] [0] 结婚`。按钮
 *     正文尾部的全角空格保留（渲染层会把连续空白折叠成一个半角空格）。
 *
 *   - **「不可选」项（`[666]` 灰字）落成 `disabled: true` 的灰按钮**：
 *     引擎的禁用按钮仍然渲染出 `[666] 正文`（app.asar 的 getButtonObject
 *     对 `config.disabled` 只跳过入合法输入集、不改渲染公式），与灰字文本
 *     逐字同形；而它的快捷键不会被 input() 回传——正是 `[666]` 编号
 *     的语义（输入 666 会按未持有该物品处理，一路回重问）。灰值取
 *     `#646464`（chara-name-edit.js
 *     的 `0x646464` 同款；既有写法的两个灰值在本作里都指「不可用」的灰，
 *     统一取此值）。
 *
 *   - **`[900]/[901]/[902]/[903]/[904]/[998]/[999]` 与怪物按钮同排一段**：
 *     一律落真按钮（本项目通例），编号即 accelerator，正文不带前缀。
 *
 *   - **`life_list(page, 2)` 用 #397 的真身**
 *     （ere/page/page-life-list.js）：MODE 2 只画列表、不画表头；编号按钮的
 *     accelerator 就是角色
 *     ID（#21 的 ID 世界改写），因此输入值直接与角色 ID 比较。该页同屏
 *     还有固定编号 [999]-[1001]（`slave_sub_menu`），后代 ID 因此必须落在
 *     固定编号之上（chara-pregnancy.js 的 `FIRST_CHILD_ID` = 100000，issue
 *     #560 的决定；静态守见 test/child-id-collision.test.js）。
 *
 *   - **`chara_id_output` 用 #332 的真身**
 *     （ere/chara/chara-stats.js）。
 *
 *   - **「无效输入重问」的几支在 ere 侧结构性不可达**：引擎
 *     `input()` 只回传本轮已打印按钮的快捷键（`useRule` 默认开，#130 镜像
 *     进夹具），未持有怪物的编号、越界编号、`[666]` 这些值都进不了游戏
 *     逻辑。这几支保留为防御性 `continue`，不构造只有夹具能触发
 *     的用例。
 *
 *   - **`NO:ARG + 1` 按 ID 世界写作 `arg + 1`**：#21 起角色 ID
 *     即角色编号（chara-ex.js 头注同款换算），初吻对象的「编号＋1」编码
 *     因此是 `arg + 1`。
 *
 *   - **行尾的对齐空格串不保留**：每项独占一行按钮，对齐交给排版层与
 *     网格宽度；行尾空格串只会被折成一个空格（按钮正文的 `\s+` 折叠）。
 *     标签内部的单个全角空格（「返 回」）是正文，保留。
 *
 *   - **`100,100,80` 的灰值取 `#646464`**：与 chara-name-edit.js
 *     的 `0x646464` 是同一个灰（文件头「不可选」条已说明为什么两者在本作
 *     里等价——都是「不可用」的灰，引擎只认十六进制）。
 *
 *   - **两处 `CFLAG:601 == 5` 的分支（触手初体验码、触手初吻码）在
 *     ID 世界里不可达**：`CFLAG:601` 婚礼后
 *     只会是 900/901/902、怪物物品号（≥100）或 `chara_id_output()+9`（≥9），
 *     取不到 5。两支条件保留（`SPOUSE_TENTACLE` 常量两处共用），不构造只有
 *     夹具能触发的用例。
 *
 *   - **`CFLAG:601 > 0` 的「已婚」检查在清旧账段之前**：所以能走到
 *     清旧账的唯一情形是「`CFLAG:609` 有值而 `CFLAG:601` == 0」。而此时
 *     `search_family` 以「源侧压缩数据 0」的
 *     档案去找，两条出口都真实存在（两侧都有用例）：找不到人时返回 -1，
 *     于是 `divorce(-1)` 被调用（上一段那个例外的实际来源）；若家族册上
 *     恰有角色与该零档案匹配（名字槽等于发起方的 `CFLAG:6`、前身 0、
 *     性格 160、家族构成 0），则返回对方，`divorce(对方)` 先把那一侧
 *     的登记解掉。这不是移植引入的，是既有两条判断条件的先后如此。
 *
 *   - **`current_spouse_text` 里的两支恒假分支已删**：
 *     两支都以 `CFLAG:601 == 0` 开头，而函数前段已经把 `== 0` 整个
 *     分档走完（`talent:315 == 21 || talent:157` 两出口）——后段里再
 *     判一次 `== 0` 永远不成立。精简为可达分支，不保留死支
 *     （page-chara-info.js 的恒假两支同款处置），移除后该函数
 *     只剩「`spouse % 10 == 9` 走家族册、其余查 itemname」两出口。
 *
 *   - **跨域写一律经属主域门面**（逐条登记在案）：婚姻状况
 *     CFLAG:601/602/606/609 走 `chara().chara.结婚对象/
 *     结婚爱情` 与 `chara().dungeon.恋人`（读用裸寻址），状态 CFLAG:1 走
 *     `chara().invasion.状态`，处女丧失对象 CFLAG:15 与初吻对象 CFLAG:16 /
 *     名字 CSTR:4 走 `chara().train.*`（train 域）。**一处例外**：`divorce`
 *     的 `cflag:${found}:601 = 0` 在 search_family 回 -1 时会写到
 *     `cflag:-1:601`——家族册查无此人时解绑落到这里：-1 不是任何角色，
 *     写入无观测影响，不加防护判断。
 */

const era = require('#/era-electron');
const { life_list } = require('#/page/page-life-list');
const { search_family } = require('#/chara/chara-family');
const { chara_id_output } = require('#/chara/chara-stats');
const { enter_lover, LOVER_NAMES } = require('#/dungeon/dungeon-lovers');
const { e_get, monster_data } = require('#/dungeon/monster-data');
const { monsterplay_list } = require('#/dungeon/monster-play');
const { chara } = require('#/facade/chara');

/** 判定返回值：不可结婚（状态不对） */
const MARRIAGE_BLOCKED = 1;
/** 判定返回值：侵攻中的勇者（走恋人线） */
const MARRIAGE_HERO = 2;

/** 婚姻状况的三档哨兵（CFLAG:601 的值） */
const SPOUSE_DOG = 900; // 野狗
const SPOUSE_YOU = 901; // 你（魔王）
const SPOUSE_LOVER = 902; // 恋人

/** 恋人及其解码哨兵（CFLAG:606 == 200 时 search_family 的 "LOVE" 找得到实人） */
const LOVER_IS_REAL_PERSON = 200;

/** 奴隶列表的一页人数（翻页按已加入角色数判断，与 life_list 同值） */
const SLAVE_PAGE_SIZE = 20;

/** 结婚前的离婚判定用的配偶名槽（CFLAG:609 > 0） */
const SPOUSE_NAME_SLOT = 609;

/** 处女丧失的四种记录码（按配偶种类分档） */
const FIRST_SEX_YOU = 1;
const FIRST_SEX_MONSTER = 104;
const FIRST_SEX_DOG = 103;
const FIRST_SEX_TENTACLE = 102;
/** `CFLAG:601 == 5` 时记触手 */
const SPOUSE_TENTACLE = 5;

/** 初吻的四种记录码 */
const FIRST_KISS_YOU = 1;
const FIRST_KISS_DOG = 998;
const FIRST_KISS_TENTACLE = 999;
const FIRST_KISS_OTHER = 994;

/**
 * 家族构成码十万位段的「婚姻状态」两位（`talent:320 % 100000 / 10000`，
 * 整数除法）——三处判断条件共用这一个读法。
 * @param {number} cid 角色号
 * @returns {number} 0 未婚 / 1 已婚 / 2 离婚 / 3 重婚 / 4 再婚
 */
function marriage_state(cid) {
  return Math.trunc(
    (talent(cid, 320) % MARRIAGE_STATE_MASK || 0) / MARRIAGE_STATE_DIVISOR,
  );
}

/** 婚姻状态的进位/回落（`+= 20000` / `-= 20000`） */
function shift_marriage_state(cid, delta) {
  era.set(`talent:${cid}:320`, (era.get(`talent:${cid}:320`) || 0) + delta);
}

/** 婚姻状况的十进制编码位（家族构成的高位） */
const MARRIAGE_STATE_MASK = 100000;
const MARRIAGE_STATE_DIVISOR = 10000;
/** 已婚 / 离婚 在编码里的两位（重婚 +20000、再婚 +20000） */
const MARRIAGE_STATE_MARRIED = 1;
const MARRIAGE_STATE_DIVORCED = 2;
/** 重婚（位 3）：divorce 后回落一档 */
const MARRIAGE_STATE_BIGAMY = 3;
/** 再婚（位 4）：同上 */
const MARRIAGE_STATE_REMARRIED = 4;
const REMARRIAGE_DELTA = 20000;

/** 处女丧失的四档判断条件里的「特殊服装 79」 */
const CLOTH_SEX_MARK = 79;
/** 处女丧失的续发判定：CFLAG:42 == 79 时跳过（同上） */
const VIRGIN_B_THRESHOLD = 4;

/** 记录「在故乡等待的伴侣」的素质 */
const T_HOMETOWN_WIFE = 157;
/** 异种婚姻素质 */
const T_CROSS_MARRIAGE = 159;

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** 代词：男人 → 他，其余 → 她 */
function she(cid) {
  return talent(cid, 122) ? '他' : '她';
}

/** 已加入角色 ID 表（#21 的 ID 世界；编号是否在册的判断用它，不拿总数比大小） */
function added_ids() {
  return era.getAddedCharacters();
}

/** 角色显示名（callname 的 -1 列） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/** 物品名（`itemname:n`） */
function itemname(id) {
  return era.get(`itemname:${id}`) ?? '';
}

/** 素质名（`talentname:n`） */
function talentname(id) {
  return era.get(`talentname:${id}`) ?? '';
}

/** 角色素质读数（`talent:${cid}:${idx}`） */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/**
 * 「不可用」灰的统一色值 `#646464`——既有写法的两处灰色
 * 在 ere 侧统一用同一个十六进制值（chara-name-edit.js 先例）。
 */
const COLOR_DISABLED = '#646464';

/**
 * 渲染一个「可选」按钮（正文不带编号前缀；尾部全角空格保留，渲染层折叠）。
 * @param {string} content 按钮正文
 * @param {number} accelerator 快捷键编号
 */
function print_choice(content, accelerator) {
  era.printButton(content, accelerator);
}

/**
 * 渲染一个「不可选」项：灰按钮 + `disabled`，编号恒取 666
 * （文件头「不可选」条）。
 * @param {string} content 按钮正文
 */
function print_disabled(content) {
  era.printButton(content, 666, {
    color: COLOR_DISABLED,
    disabled: true,
  });
}

/**
 * check_able_to_marriage：角色能否结婚。
 *
 * @param {number} arg 角色号
 * @returns {0|1|2} 0 = 可以；1 = 状态不对；2 = 侵攻中的勇者（走恋人线）
 */
function check_able_to_marriage(arg) {
  if ((era.get(`cflag:${arg}:1`) || 0) === 2) return MARRIAGE_HERO;
  const state = era.get(`cflag:${arg}:1`) || 0;
  if (state !== 0 && state !== 3 && state !== 7) return MARRIAGE_BLOCKED;
  return 0;
}

/**
 * show_button_marriage：渲染「结婚」/「恋人设定」按钮。
 *
 * @param {number} num 按钮的快捷键编号
 * @param {number} arg 目标角色号
 */
function show_button_marriage(num, arg) {
  const able = check_able_to_marriage(arg); // LOCAL
  if (able === MARRIAGE_BLOCKED) return; // 結婚不可能ならボタン自体を表示しない
  if (able === MARRIAGE_HERO) {
    // 侵攻中の勇者の場合、恋人選択肢
    print_choice('恋人设定\u3000', num);
    return;
  }
  print_choice('结婚\u3000', num);
}

// —— 十三支种族典礼：同形的「开场 ＋ 三档反应」 ——

/**
 * 一档反应行的公共骨架：开场白（首行 ＋ 分隔 ＋ 典礼正文）之外，末端按
 * 素质分三档（`talent:arg:76` 淫乱 / `talent:arg:85` 爱慕 / 其他）。
 * @param {number} arg 角色号
 * @param {(name: string) => string} lust 淫乱档的整行正文
 * @param {(name: string) => string} love 爱慕档的整行正文
 * @param {(name: string) => string} other 其他档的整行正文
 */
function print_reaction(arg, lust, love, other) {
  const name = name_of(arg);
  if (talent(arg, 76) === 1) {
    era.print(lust(name));
  } else if (talent(arg, 85) === 1) {
    era.print(love(name));
  } else {
    era.print(other(name));
  }
}

/** 二十四行典礼共用的「眼泛泪光」收尾 */
const TREMBLE = (name) => `${name}眼泛泪光，在屈辱和绝望中颤抖着。`;
/** 共用的爱慕档收尾 */
const CALM = (name) => `${name}静静地处理着结婚事宜。`;

/**
 * orc_marriage
 * @param {number} arg 角色号
 * @param {number} groom_num 结婚对象（物品号）
 * @returns {Promise<number>} 恒 0
 */
async function orc_marriage(arg, groom_num) {
  const name = name_of(arg);
  const groom = itemname(groom_num);
  era.print(`${name}和${groom}结婚了。`);
  era.print('---');
  era.print(`${name}的结婚典礼举行了。`);
  era.print(`在臭气熏天的${groom}的巢穴里，${name}出现了，`);
  era.print(`${name}全身赤裸，被涂满了赤黑色的泥一样的东西作为化妆。`);
  era.print('那是魔界的邪恶的纹样，太野蛮了，');
  era.print(`${groom}也带着自豪的神情，被化上了泥土装。`);
  era.print(`用它们的语言，向${name}发着爱的誓言。`);
  era.print(`${groom}的同伴们全部勃起了，看来漫长无比的新婚之夜即将来临……`);
  print_reaction(
    arg,
    (n) => `${n}和${groom}像野兽一样地疯狂拥吻着……`,
    CALM,
    TREMBLE,
  );
  await era.waitAnyKey();
  return 0;
}

/**
 * slime_marriage
 * @param {number} arg 角色号
 * @param {number} groom_num 结婚对象（物品号）
 * @returns {Promise<number>} 恒 0
 */
async function slime_marriage(arg, groom_num) {
  const name = name_of(arg);
  const groom = itemname(groom_num);
  era.print(`${name}和${groom}结婚了。`);
  era.print('---');
  era.print(`${name}的结婚典礼举行了。`);
  era.print(`穿着婚纱的${name}，抱着装着${groom}的瓶子，`);
  era.print(`瓶子和${name}被锁链锁在一起了。`);
  era.print(`没有知性的${groom}，感觉${name}想要袭击自己，准备先发制人，`);
  era.print('不过瓶子的盖紧紧关着，黏液怪无可奈何，');
  era.print(`然后，在${name}宣读爱的誓言之后，打开了瓶盖子。`);
  era.print(`${groom}从瓶子里窜出，弄脏了${name}的礼服……`);
  print_reaction(
    arg,
    (n) => `${n}用手指沾起礼服上的粘液，高兴地舔舐着。`,
    CALM,
    TREMBLE,
  );
  await era.waitAnyKey();
  return 0;
}

/**
 * insect_marriage
 * @param {number} arg 角色号
 * @param {number} groom_num 结婚对象（物品号）
 * @returns {Promise<number>} 恒 0
 */
async function insect_marriage(arg, groom_num) {
  const name = name_of(arg);
  const groom = itemname(groom_num);
  era.print(`${name}和${groom}结婚了。`);
  era.print('---');
  era.print(`${name}的结婚典礼举行了。`);
  era.print(`穿着婚纱的${name}从背后被${groom}抱着，`);
  era.print(`梦魔往${groom}胯部涂上了引起其兴奋的药物。`);
  era.print(`${groom}兴奋不已，把输精管伸出来了。`);
  era.print('「呵呵～请尽情享受新婚之夜吧。」');
  era.print('梦魔妩媚地笑着，宣布礼成。');
  print_reaction(
    arg,
    (n) => `${n}爱怜地抚摸着${groom}的输精管。`,
    CALM,
    TREMBLE,
  );
  await era.waitAnyKey();
  return 0;
}

/**
 * ivy_marriage
 * @param {number} arg 角色号
 * @param {number} groom_num 结婚对象（物品号）
 * @returns {Promise<number>} 恒 0
 */
async function ivy_marriage(arg, groom_num) {
  const name = name_of(arg);
  const groom = itemname(groom_num);
  era.print(`${name}和${groom}结婚了。`);
  era.print('---');
  era.print(`${name}的结婚典礼举行了。`);
  era.print(`穿着婚纱的${name}被盆子里的${groom}抱着。`);
  print_reaction(
    arg,
    (n) => `${n}吸入了带有催淫物质的花粉，细细地品味着。`,
    CALM,
    TREMBLE,
  );
  await era.waitAnyKey();
  return 0;
}

/**
 * syokusyu_marriage：首行写的是字面「触手」（既有写法，
 * 不走 itemname 查表）。
 * @param {number} arg 角色号
 * @param {number} groom_num 结婚对象（物品号）
 * @returns {Promise<number>} 恒 0
 */
async function syokusyu_marriage(arg, groom_num) {
  const name = name_of(arg);
  const groom = itemname(groom_num);
  era.print(`${name}和触手结婚了。`);
  era.print('---');
  era.print(`${name}的结婚典礼举行了。`);
  era.print(`穿着婚纱的${name}不停地扭来扭去，`);
  era.print(`其实，婚纱内满是触手，正爱抚着${she(arg)}的全身，`);
  era.print('一条粗的触手伸到眼前，');
  era.print(`亲吻般地封住了${she(arg)}的嘴巴……`);
  era.print(`${name}在众目睽睽之下，与${groom}交换爱的吻了。`);
  print_reaction(
    arg,
    (n) => `${n}神色陶醉，和${groom}不断地交换着嘴里的粘液。`,
    CALM,
    TREMBLE,
  );
  await era.waitAnyKey();
  return 0;
}

/**
 * faily_marriage
 * @param {number} arg 角色号
 * @param {number} groom_num 结婚对象（物品号）
 * @returns {Promise<number>} 恒 0
 */
async function faily_marriage(arg, groom_num) {
  const name = name_of(arg);
  const groom = itemname(groom_num);
  era.print(`${name}和${groom}结婚了。`);
  era.print('---');
  era.print(`${name}的结婚典礼举行了。`);
  era.print(`穿着婚纱的${name}，被妖精吻着，`);
  era.print('由花朵和蘑菇装饰着的婚礼台，令人犹如置身在森林中，');
  era.print(`${groom}私酿的烈酒，被端了上来，两人一饮而尽……`);
  era.print('马上摇摇晃晃，变得犹如梦中，');
  era.print(`${name}在众人的祝福声下，与${groom}交换爱的吻了。`);
  print_reaction(
    arg,
    (n) => `${n}神色陶醉，和${groom}不断地交换着嘴里的唾液。`,
    CALM,
    (n) => `${n}醉倒了，什么事都不记得。`,
  );
  await era.waitAnyKey();
  return 0;
}

/**
 * giant_marriage
 * @param {number} arg 角色号
 * @param {number} groom_num 结婚对象（物品号）
 * @returns {Promise<number>} 恒 0
 */
async function giant_marriage(arg, groom_num) {
  const name = name_of(arg);
  const groom = itemname(groom_num);
  era.print(`${name}和${groom}结婚了。`);
  era.print(`从今以后，${name}要过着成为${groom}飞机杯的生活了。`);
  era.print('---');
  era.print(`${name}的结婚典礼举行了。`);
  era.print(`${name}穿着暴露的婚纱，`);
  era.print(`高大魁梧的${groom}，被牵过来了，`);
  era.print(
    `${name}被抱了起来，在${she(arg)}的胯下，${groom}的超巨型阴茎，激昂挺立着，`,
  );
  era.print('在自己里面放进这个吗？……');
  era.print(`${name}深吸了一口气……`);
  print_reaction(
    arg,
    (n) => `${n}怀着期待，昂首挺胸。`,
    CALM,
    (n) => `${n}彻底绝望了。`,
  );
  await era.waitAnyKey();
  return 0;
}

/**
 * man_marriage 与 girl_marriage 各自的前缀（talent:141
 * 中年 / 143 少年；talent:140 熟女 / 142 幼女）。
 * @param {number} arg 角色号
 * @param {number} groom_num 结婚对象（物品号）
 * @param {[number, string][]} prefixes [素质下标, 前缀] 的两档
 * @returns {string} 拼好的对象名
 */
function groom_with_prefix(arg, groom_num, prefixes) {
  const groom = itemname(groom_num);
  for (const [idx, prefix] of prefixes) {
    if (talent(arg, idx)) return `${prefix}${groom}`;
  }
  return groom;
}

/**
 * man_marriage
 * @param {number} arg 角色号
 * @param {number} groom_num 结婚对象（物品号）
 * @returns {Promise<number>} 恒 0
 */
async function man_marriage(arg, groom_num) {
  const name = name_of(arg);
  const groom = groom_with_prefix(arg, groom_num, [
    [141, '中年'],
    [143, '少年'],
  ]);
  era.print(`${name}和${groom}结婚了。`);
  era.print('---');
  era.print(`${name}的结婚典礼举行了。`);
  era.print(`${name}穿着高露出度的婚纱，`);
  era.print(`和${groom}交换了戒指，`);
  era.print('并相互亲吻着……');
  print_reaction(
    arg,
    (n) => `${n}因为对婚后生活的期待，心怦怦直跳。`,
    CALM,
    (n) => `${n}绝望了。`,
  );
  await era.waitAnyKey();
  return 0;
}

/**
 * girl_marriage
 * @param {number} arg 角色号
 * @param {number} groom_num 结婚对象（物品号）
 * @returns {Promise<number>} 恒 0
 */
async function girl_marriage(arg, groom_num) {
  const name = name_of(arg);
  const groom = groom_with_prefix(arg, groom_num, [
    [140, '熟女'],
    [142, '幼女'],
  ]);
  era.print(`${name}和${groom}结婚了。`);
  era.print('---');
  era.print(`${name}的结婚典礼举行了。`);
  era.print(`${name}和${groom}都穿着高露出度的婚礼礼服，`);
  era.print('交换戒指，拥抱着，');
  era.print('并相互亲吻着……');
  print_reaction(
    arg,
    (n) => `${n}因为对婚后生活的期待，心怦怦直跳。`,
    CALM,
    (n) => `${n}绝望了。`,
  );
  await era.waitAnyKey();
  return 0;
}

/**
 * 野兽系三支典礼的反应档：`talent:arg:136` 牝犬 / `abl:arg:39` 兽奸中毒 / 其他
 * （与 `talent:arg:76/85` 那套不是同一组分支）。
 * @param {number} arg 角色号
 * @param {(name: string) => string} beast 牝犬档
 * @param {(name: string) => string} addict 兽奸中毒档
 */
function print_beast_reaction(arg, beast, addict) {
  const name = name_of(arg);
  if (talent(arg, 136) === 1) {
    era.print(beast(name));
  } else if ((era.get(`abl:${arg}:39`) || 0) >= 1) {
    era.print(addict(name));
  } else {
    era.print(TREMBLE(name));
  }
}

/**
 * beast_marriage：这支典礼没有 waitAnyKey（保留既有行为）。
 * @param {number} arg 角色号
 * @param {number} groom_num 结婚对象（物品号）
 * @returns {number} 恒 0
 */
function beast_marriage(arg, groom_num) {
  const name = name_of(arg);
  const groom = itemname(groom_num);
  era.print(`${name}和${groom}结婚了。`);
  era.print('---');
  era.print(`${name}的结婚典礼举行了。`);
  era.print(`魔王的宫殿里，台上出现了未戴项圈的${groom}和${name}，`);
  era.print(`穿着婚纱的${name}四脚爬爬地被牵了过来，`);
  era.print(`嘴里叼着和${groom}的项圈成对的项圈。`);
  era.print('作为媒婆的梦魔，向双方询问着永远的爱的誓言，');
  era.print(`${groom}用吼声代替宣誓，`);
  era.print('然后，给双方都戴上项圈，礼成了……');
  print_beast_reaction(
    arg,
    (n) => `${n}气息慌乱，舌尖滴着口水。完全作为一只母兽正在发情着。`,
    (n) => `${n}自豪地用脸蹭擦着${groom}，发出了野兽一样的吼叫。`,
  );
  return 0;
}

/**
 * brain_marriage
 * @param {number} arg 角色号
 * @param {number} groom_num 结婚对象（物品号）
 * @returns {Promise<number>} 恒 0
 */
async function brain_marriage(arg, groom_num) {
  const name = name_of(arg);
  const groom = itemname(groom_num);
  era.print(`${name}和${groom}结婚了。`);
  era.print('---');
  era.print(`${name}的结婚典礼举行了。`);
  era.print(`${name}穿着露出度高的婚纱，`);
  era.print(`和${groom}相互交换了戒指，`);
  era.print(`然后，${groom}用触手的嘴亲吻了${she(arg)}的嘴……`);
  print_reaction(
    arg,
    (n) => `${n}因为对婚后生活的期待，心怦怦直跳。`,
    CALM,
    (n) => `${n}彻底绝望了。`,
  );
  await era.waitAnyKey();
  return 0;
}

/**
 * horse_marriage：与 beast_marriage 同族，同样没有 waitAnyKey。
 * @param {number} arg 角色号
 * @param {number} groom_num 结婚对象（物品号）
 * @returns {number} 恒 0
 */
function horse_marriage(arg, groom_num) {
  const name = name_of(arg);
  const groom = itemname(groom_num);
  era.print(`${name}和${groom}结婚了。`);
  era.print(`从今以后，${name}要到马厩和${groom}共同生活了。`);
  era.print('---');
  era.print(`${name}的结婚典礼举行了。`);
  era.print(`魔王的宫殿里，${groom}和${name}被牵到台上，`);
  era.print(`${name}的面前，${groom}的雄伟阴茎在晃荡着，`);
  era.print('作为媒婆的梦魔，向双方询问着永远的爱的誓言，');
  era.print(`${groom}用嘶叫声代替宣誓，`);
  era.print(`从现在起，${she(arg)}就是一匹母马了……`);
  print_beast_reaction(
    arg,
    (n) => `${n}气息慌乱，舌尖滴着口水。完全作为一匹母马正在发情着。`,
    (n) => `${n}得意洋洋地用脸蹭擦着${groom}的阴茎。`,
  );
  return 0;
}

/**
 * marriage_dog：这支典礼没有 waitAnyKey（收尾直接 return），
 * 与 beast_marriage / horse_marriage 同族。首行的对象名是字面「野狗」
 * （既有写法，不走 itemname 查表）。
 * @param {number} arg 角色号
 * @returns {number} 恒 0
 */
function marriage_dog(arg) {
  const name = name_of(arg);
  era.print(`${name}和野狗结婚了。`);
  era.print(`从今以后，${name}将在狗屋和野狗一起生活。`);
  era.print('---');
  era.print(`${name}的结婚典礼举行了。`);
  era.print(`魔王的宫殿里，台上出现了未戴项圈的公狗和${name}，`);
  era.print(`穿着婚纱的${name}四脚爬爬地被牵了过来，`);
  era.print('嘴里叼着和公狗的项圈成对的项圈。');
  era.print('作为媒婆的梦魔，向双方询问着永远的爱的誓言，');
  era.print('狗用吠叫声代替宣誓，');
  era.print('然后，给双方都戴上项圈，礼成了……');
  print_beast_reaction(
    arg,
    (n) => `${n}气息慌乱，舌尖滴着口水。完全作为一只母狗正在发情着。`,
    (n) => `${n}一副自豪的样子，对着狗汪汪地叫。`,
  );
  return 0;
}

/**
 * marriage_you：与「你」结婚的典礼。
 * @param {number} arg 角色号
 * @returns {Promise<number>} 恒 0
 */
async function marriage_you(arg) {
  const name = name_of(arg);
  era.print(`${name}和你结婚了。`);
  era.print(`从今以后，${name}就是魔王的妃子之一了，魔王妃千岁！`);
  await era.waitAnyKey();
  return 0;
}

/**
 * marriage_lovers：与恋人结婚的典礼。
 * @param {number} arg 角色号
 * @returns {Promise<number>} 恒 0
 */
async function marriage_lovers(arg) {
  const name = name_of(arg);
  const lover = era.get(`cflag:${arg}:606`) || 0;
  era.print(`${name}被允许与信赖的恋人结婚了`);
  era.print(`从此以后${name}和`);
  era.print(`${LOVER_NAMES.get(lover) ?? ''}可以共同过上幸福生活了……`);
  await era.waitAnyKey();
  return 0;
}

/**
 * slave_marriage：与选中奴隶的婚礼。
 * @param {number} arg 角色号
 * @param {number} partner 对方角色号
 * @returns {Promise<number>} 恒 0
 */
async function slave_marriage(arg, partner) {
  const name = name_of(arg);
  const other = name_of(partner);
  era.print(`${name}和${other}结婚了。`);
  era.print(`从今往后${name}和${other}将携手白头……`);
  await era.waitAnyKey();
  return 0;
}

// —— 主流程 ——

/**
 * 当前结婚对象的正文（菜单尾部的「目前结婚对象」列）。
 *
 * 与 page-chara-info.js 的 `marriage_bracket_text`（角色信息页的括号列）
 * **不是同一支**：那一支的「无配偶」走压缩家族码，本函数走「在故乡等待
 * 的伴侣」与婚史查询——两条支路，互不合并。
 *
 * @param {number} cid 角色号
 * @returns {string}
 */
function current_spouse_text(cid) {
  const spouse = era.get(`cflag:${cid}:601`) || 0;
  if (spouse === SPOUSE_DOG) return '野狗';
  if (spouse === SPOUSE_YOU) return '你';
  if (spouse === 0) {
    // 主婦?人妻の場合、夫がいる
    if (talent(cid, 315) === 21 || talent(cid, T_HOMETOWN_WIFE)) {
      return '在故乡等待的伴侣';
    }
    return '无';
  }
  if (spouse === SPOUSE_LOVER) {
    // 恋人名只要裸文本，读同一张登记表
    //（page-chara-info.js 的 marriage_bracket_text 同款读法）
    return LOVER_NAMES.get(era.get(`cflag:${cid}:606`) || 0) ?? '';
  }
  // ELSE：先看家族册上的婚姻关系
  const found = search_family(cid, 'MARRIAGE');
  if ((era.get(`ex_talent:${cid}:2`) || 0) !== 0 && found < 0) return '无';
  if ((era.get('cflag:0:601') || 0) === (era.get(`cflag:${cid}:6`) || 0)) {
    return name_of(0);
  }
  // `CFLAG:601 == 0` 的两支分档在上面的 `== 0` 早退之后恒假——死支已删，
  // 精简为可达分支
  // （page-chara-info.js 的恒假两支同款处置）。
  if (spouse % 10 === 9) {
    // 一の位が 9：家族册上的人
    const partner = search_family(cid, 'MARRIAGE');
    return partner > 0 ? name_of(partner) : '无';
  }
  return itemname(spouse);
}

/**
 * 结婚对象选择的列表页：怪物列表 ＋ 特殊五项 ＋ 当前对象。
 * @param {number} arg 角色号
 */
function print_marriage_menu(arg) {
  const lover = era.get(`cflag:${arg}:606`) || 0;
  const married = (era.get(`cflag:${arg}:601`) || 0) !== 0;
  // 四道 DRAWLINE ＋ 两行标题（逐行排布，以 monsterplay_list 为基准）
  era.drawLine();
  era.print('怪物');
  era.drawLine();
  monsterplay_list();
  era.drawLine();
  era.print('特殊');
  era.drawLine();
  if ((era.get('item:22') || 0) >= 1) {
    print_choice('野狗', SPOUSE_DOG);
  } else {
    print_disabled('野狗');
  }
  print_choice('你', SPOUSE_YOU);
  if (lover > 0) {
    print_choice('与恋人结婚', SPOUSE_LOVER);
  } else {
    print_disabled('与恋人结婚');
  }
  if (lover === 0) {
    print_choice('恋人设定', SPOUSE_LOVER);
  } else {
    print_disabled('恋人设定');
  }
  if (lover > 0) {
    print_choice('与恋人分手', 903);
  } else {
    print_disabled('与恋人分手');
  }
  print_choice('从奴隶中选', 904);
  if (married) {
    print_choice('离婚', 998);
  } else {
    print_disabled('离婚');
  }
  print_choice('返回', 999);
  // 尾部的「目前结婚对象」列
  era.print(`[${name_of(arg)}目前结婚对象:${current_spouse_text(arg)}]`);
}

/**
 * 奴隶子菜单：`life_list(page, 2)` ＋ 翻页 ＋ 选中校验。
 *
 * 返回值：`partner === null` 表示回外层重画（`GOTO INPUT_LOOP`），
 * 否则是选中的角色 ID；`no_page` 是翻页后的页码（页码不就地更新，
 * 按「进出一对」返回）。
 *
 * 越界判断按 #21 的 ID 世界改写为
 * 「不在已加入角色表里」——ID 世界的角色 ID 可以有缺口，拿总数比大小会把
 * 合法的高位 ID 误判成越界（文件头）。
 *
 * @param {number} arg 发起方角色号（「自恋」判断用）
 * @param {number} no_page 当前页码
 * @returns {Promise<{partner: number|null, no_page: number}>}
 */
async function slave_sub_menu(arg, no_page) {
  let page = no_page;
  for (;;) {
    // 子菜单每轮重画的四道输出（以 life_list 为基准）
    era.drawLine();
    life_list(page, 2);
    print_choice('- 上一页', 1000);
    print_choice('- 返  回', 999);
    print_choice('- 下一页', 1001);

    const pick = await era.input();

    if (pick === 999) return { partner: null, no_page: page };
    if (pick === 1000) {
      // 上一页（首屏时 page 不降、回菜单重画）
      if (page > 0) page -= 1;
      continue;
    }
    if (pick === 1001) {
      // 下一页（末页时 page 不升、回菜单重画）
      if ((page + 1) * SLAVE_PAGE_SIZE <= added_ids().length) page += 1;
      continue;
    }
    if (pick < 0 || !added_ids().includes(pick)) {
      return { partner: null, no_page: page }; // 越界（ID 世界改写）
    }
    if ((era.get(`cflag:${pick}:1`) || 0) === 2) {
      era.print(`${name_of(pick)}尚未在支配之下。`);
      return { partner: null, no_page: page };
    }
    if ((era.get(`cflag:${pick}:1`) || 0) !== 0) {
      era.print(`${name_of(pick)}处于无法出席婚礼的状态。`);
      return { partner: null, no_page: page };
    }
    if ((era.get(`cflag:${pick}:601`) || 0) !== 0) {
      era.print(`${name_of(pick)}已婚了。`);
      return { partner: null, no_page: page };
    }
    // 自恋条件：内层只有这一支，命中即回重画
    if (pick === arg) {
      era.print(`${name_of(pick)}并不是一个自恋狂。`);
      return { partner: null, no_page: page };
    }
    return { partner: pick, no_page: page };
  }
}

/**
 * 结婚前的旧账清理：有配偶名槽但家族册上找不到人时，
 * `divorce` 会以 -1 被调用（见文件头的例外说明）。
 * @param {number} arg 角色号
 */
function settle_previous_marriage(arg) {
  if ((era.get(`cflag:${arg}:${SPOUSE_NAME_SLOT}`) || 0) > 0) {
    const found = search_family(arg, 'MARRIAGE');
    if (!(era.get(`ex_talent:${arg}:2`) && found < 0)) {
      divorce(found);
    }
  }
}

/**
 * 婚礼对象的显示名（`*…和…举行了结婚典礼*` 播报行的后半段）。
 *
 * 副作用与显示名同源：奴隶婚要交换双方的名槽与婚姻编码、怪物婚要跑一次
 * `monster_data` 取陵辱类型。`groom_num` 是跨函数的输出，
 * 用 `{ groom_num, groom_type }` 这对返回值承载。
 *
 * @param {number} arg 角色号
 * @param {number} groom_num 当前的结婚对象编码
 * @param {number} groom_type 当前的结婚对象类型
 * @param {number} partner 选中的奴隶（仅 groom_type == 1000 时有效）
 * @param {(n: number) => number} rand 随机源
 * @returns {{label: string, groom_num: number, groom_type: number}}
 */
function resolve_groom(arg, groom_num, groom_type, partner, rand) {
  if (groom_num === SPOUSE_DOG) return { label: '野狗', groom_num, groom_type };
  if (groom_num === SPOUSE_YOU) return { label: '你', groom_num, groom_type };
  if (groom_num === SPOUSE_LOVER) {
    // 恋人
    if ((era.get(`cflag:${arg}:606`) || 0) === LOVER_IS_REAL_PERSON) {
      const found = search_family(arg, 'LOVE');
      let label = '';
      if (found >= 0) {
        // 恋人就是家族册上的实人：同时把对方那一侧登记好
        label = name_of(found);
        chara(found).chara.结婚对象 = SPOUSE_LOVER; // CFLAG:601
        chara(found).chara.结婚爱情 = 0; // CFLAG:602
        // 已婚 / 离婚 的状态各进一位
        const state = marriage_state(found);
        if (
          state === MARRIAGE_STATE_MARRIED ||
          state === MARRIAGE_STATE_DIVORCED
        ) {
          shift_marriage_state(found, REMARRIAGE_DELTA);
        }
      }
      return { label, groom_num, groom_type };
    }
    // 一般恋人：查 LOVER_NAMES 登记表
    return {
      label: LOVER_NAMES.get(era.get(`cflag:${arg}:606`) || 0) ?? '',
      groom_num,
      groom_type,
    };
  }
  if (groom_type === 1000) {
    // 奴隷との結婚
    era.set(
      `cflag:${partner}:${SPOUSE_NAME_SLOT}`,
      era.get(`cflag:${arg}:6`) || 0,
    );
    era.set(
      `cflag:${arg}:${SPOUSE_NAME_SLOT}`,
      era.get(`cflag:${partner}:6`) || 0,
    );
    if (arg === 0) {
      chara(partner).chara.结婚对象 = SPOUSE_YOU;
    } else {
      chara(partner).chara.结婚对象 = chara_id_output(arg) + 9;
    }
    return {
      label: name_of(partner),
      groom_num: chara_id_output(partner) + 9,
      groom_type,
    };
  }
  // ELSE：怪物。monster_data 把陵辱类型写进 E:507（列头 500 + 7）
  monster_data(groom_num, 5, -1, -1, -1, rand);
  return {
    label: itemname(groom_num),
    groom_num,
    groom_type: e_get(507),
  };
}

/** 十三支种族典礼的分发表（键 = `E:507` 的陵辱类型） */
const MONSTER_RITUALS = new Map([
  [1, orc_marriage],
  [2, slime_marriage],
  [3, insect_marriage],
  [4, ivy_marriage],
  [5, syokusyu_marriage],
  [6, faily_marriage],
  [7, giant_marriage],
  [8, man_marriage],
  [9, girl_marriage],
  [10, beast_marriage],
  [11, brain_marriage],
  [12, horse_marriage],
]);

/**
 * 处女丧失的掷骰与「同为女性」那一档的直接生效。
 * @param {number} arg 角色号
 * @param {number} groom_type 结婚对象类型
 * @param {number} partner 对方角色号（仅奴隶婚有效）
 * @param {(n: number) => number} rand 随机源
 * @returns {number} VIRGIN_B
 */
function virgin_roll(arg, groom_type, partner, rand) {
  let virgin_b = 0;
  // 蟲、スライム、植物と結婚するの場合、ランダムで处女丧失
  if (groom_type === 2 || groom_type === 3 || groom_type === 4) {
    virgin_b = rand(9);
  }
  if (groom_type !== 1000) return virgin_b;
  // 同じ女性の場合（五档性别组合）
  const partner_male = talent(partner, 122);
  const partner_futa = talent(partner, 121);
  const arg_male = talent(arg, 122);
  const arg_futa = talent(arg, 121);
  if (!partner_male && !partner_futa && !arg_male && !arg_futa) {
    return rand(5) + 3;
  }
  if ((partner_male || partner_futa) && !arg_male) return rand(7);
  if (partner_male && arg_futa) return rand(9);
  if (partner_futa && arg_futa) return rand(5) + 1;
  if (!partner_male && talent(partner, 0) && arg_male) {
    // partner 为女性、arg 为男性：直接让对方破处
    era.print(`${name_of(partner)}【处女丧失】`);
    era.set(`talent:${partner}:0`, 0);
  }
  return virgin_b;
}

/**
 * 处女丧失的实现与记录码。
 * @param {number} arg 角色号
 * @param {number} groom_type 结婚对象类型
 * @param {number} virgin_b VIRGIN_B
 */
function apply_virgin_loss(arg, groom_type, virgin_b) {
  if (
    talent(arg, 0) !== 1 ||
    (era.get(`exp:${arg}:0`) || 0) !== 0 ||
    talent(arg, 273) !== 0 ||
    (era.get(`cflag:${arg}:42`) || 0) === CLOTH_SEX_MARK ||
    virgin_b >= VIRGIN_B_THRESHOLD ||
    groom_type === 1000
  ) {
    return;
  }
  era.print('【处女丧失】');
  era.set(`talent:${arg}:0`, 0);
  const spouse = era.get(`cflag:${arg}:601`) || 0;
  let code = FIRST_SEX_MONSTER; // ELSE
  if (spouse === SPOUSE_YOU) code = FIRST_SEX_YOU;
  else if (spouse === SPOUSE_DOG) code = FIRST_SEX_DOG;
  else if (spouse === SPOUSE_TENTACLE) code = FIRST_SEX_TENTACLE;
  chara(arg).train.初体验对象 = code; // CFLAG:15（train 域）
}

/**
 * 初吻的实现与记录码。
 * @param {number} arg 角色号
 */
function apply_first_kiss(arg) {
  if ((era.get(`cflag:${arg}:16`) ?? 0) !== -1) return;
  era.print('【初吻】');
  const spouse = era.get(`cflag:${arg}:601`) || 0;
  const view = chara(arg).train;
  if (spouse === SPOUSE_YOU) {
    // 既有写法先后写 1 与「你的 ID + 1」（你的 ID 恒 0，两次同值，
    // 第一行是冗余赋值）；#21 起角色 ID 即编号，故两次同值
    view.初吻对象 = FIRST_KISS_YOU;
    view.初吻对象名 = name_of(0); // CSTR:4
    if ((era.get('cflag:0:16') ?? 0) === -1) {
      // 調教者の初吻（NO:ARG + 1 编码）
      chara(0).train.初吻对象 = arg + 1;
      chara(0).train.初吻对象名 = name_of(arg);
    }
  } else if (spouse === SPOUSE_DOG) {
    view.初吻对象 = FIRST_KISS_DOG;
  } else if (spouse === SPOUSE_TENTACLE) {
    view.初吻对象 = FIRST_KISS_TENTACLE;
  } else {
    view.初吻对象 = FIRST_KISS_OTHER;
  }
}

/**
 * 异种婚姻：欲望 LV ≥ 5 且异种奸经验 ≥ 300 且已有主从逆转 /
 * 异种恋慕时，改判【异种婚姻】。
 * @param {number} arg 角色号
 */
function apply_cross_marriage(arg) {
  if ((era.get(`abl:${arg}:11`) || 0) < 5) return;
  if (!talent(arg, 293) && !talent(arg, 294)) return;
  if ((era.get(`exp:${arg}:58`) || 0) < 300) return;
  if (talent(arg, T_CROSS_MARRIAGE) !== 0) return;
  const name = name_of(arg);
  era.print(`${name}与肉体・精神接彼此相爱的伙伴结婚了…`);
  era.print('今后将不再是以主从的关系，而是将彼此当成对等的存在来一起生活');
  era.print(`${name}得到了【${talentname(T_CROSS_MARRIAGE)}】`);
  era.set(`talent:${arg}:${T_CROSS_MARRIAGE}`, 1);
}

/**
 * marriage：结婚按钮被按下后的整场流程。
 *
 * @param {number} arg 角色号
 * @param {(n: number) => number} [rand] 随机源
 * @returns {Promise<number>} 0 = 回角色信息页；1 = 回合结束；
 *   2 = 不可结婚（按钮本不该显示）
 */
async function marriage(arg, rand = default_rand) {
  const able = check_able_to_marriage(arg); // LOCAL
  if (able !== 0) {
    if (able === MARRIAGE_BLOCKED) return 2;
    if ((await enter_lover(arg)) === 1) return 1; // 成功でターンエンド
    return 0; // （不可结婚与恋人线两条出口的收尾）
  }

  let no_page = 0; // #DIM NO_PAGE
  let groom_num = 0;
  let groom_type = 0;
  let partner = 0;

  for (;;) {
    print_marriage_menu(arg);

    const result = await era.input();
    groom_num = result;

    if (result === 999) return 0;
    if (result === SPOUSE_YOU) {
      // 你と結婚
      if (arg === 0) {
        era.print('魔王大人，自恋也是要有限度的啦。');
        continue;
      }
    } else if (result === SPOUSE_LOVER) {
      // 恋人设定（还没有恋人时才走）
      if ((era.get(`cflag:${arg}:606`) || 0) === 0) {
        await enter_lover(arg);
        continue;
      }
    } else if (result === 903) {
      // 恋人別れる
      chara(arg).dungeon.恋人 = 0; // CFLAG:606 = 0（dungeon 域）
      era.print('与恋人分手了。');
      continue;
    } else if (result === 904) {
      // 从奴隶中
      const picked = await slave_sub_menu(arg, no_page);
      no_page = picked.no_page;
      if (picked.partner === null) continue;
      partner = picked.partner;
      groom_type = 1000;
    } else if (result === 998) {
      // 離婚
      divorce(arg);
      return 0;
    } else if (!(era.get(`item:${result}`) || 0) && result !== SPOUSE_DOG) {
      continue; // いない怪物を指定（ere 侧结构性不可达）
    } else if (result === SPOUSE_DOG && (era.get('item:22') || 0) <= 0) {
      continue; // いない野狗を指定（同上）
    } else if (result <= 99) {
      era.print('恋物癖，请自重。'); // （同上）
      continue;
    } else if (result === (era.get(`cflag:${arg}:601`) || 0)) {
      era.print('对象已婚了。');
      return 0;
    } else if ((era.get(`cflag:${arg}:601`) || 0) > 0) {
      era.print(`${name_of(arg)}已婚了。`);
      return 0;
    }

    settle_previous_marriage(arg);

    // *X和Y举行了结婚典礼*
    const resolved = resolve_groom(arg, groom_num, groom_type, partner, rand);
    groom_num = resolved.groom_num;
    groom_type = resolved.groom_type;
    era.print(`*${name_of(arg)}和${resolved.label}举行了结婚典礼*`);

    // 結婚相手と結婚爱情の再設定
    chara(arg).chara.结婚对象 = groom_num;
    chara(arg).chara.结婚爱情 = 0;

    // 結婚状態の更新（重婚 +20000、再婚 +20000）
    const married_state = marriage_state(arg);
    if (
      married_state === MARRIAGE_STATE_MARRIED ||
      married_state === MARRIAGE_STATE_DIVORCED
    ) {
      shift_marriage_state(arg, REMARRIAGE_DELTA);
    }

    // 結婚式（特殊三支按 groom_num、种族十二支与奴隶婚按 groom_type）
    if (groom_num === SPOUSE_DOG) await marriage_dog(arg);
    else if (groom_num === SPOUSE_YOU) await marriage_you(arg);
    else if (groom_num === SPOUSE_LOVER) await marriage_lovers(arg);
    else if (groom_type === 1000) await slave_marriage(arg, partner);
    else {
      const ritual = MONSTER_RITUALS.get(groom_type);
      if (ritual) await ritual(arg, groom_num);
    }

    apply_virgin_loss(
      arg,
      groom_type,
      virgin_roll(arg, groom_type, partner, rand),
    );
    apply_first_kiss(arg);
    apply_cross_marriage(arg);

    return 1; // リターン１でターンエンドする
  }
}

/**
 * divorce：离婚。归还双方的婚姻登记，并按编码回落婚姻状态。
 *
 * @param {number} arg 角色号
 * @returns {number} 恒 0
 */
function divorce(arg) {
  const found = search_family(arg, 'MARRIAGE');
  // found 是不是真角色：大于 0 且在已加入角色表里（#21 的 ID 世界，
  // ID 可以有缺口，见文件头）
  if (found > 0 && added_ids().includes(found)) {
    era.set(`cflag:${found}:601`, 0);
    era.set(`cflag:${found}:609`, 0);
  }
  era.set(`cflag:${arg}:601`, 0);
  era.set(`cflag:${arg}:609`, 0);
  era.print(`${name_of(arg)}离婚了。`);
  // 結婚状態の更新（重婚/再婚 → 単婚）
  const state = marriage_state(arg);
  if (state === MARRIAGE_STATE_BIGAMY || state === MARRIAGE_STATE_REMARRIED) {
    shift_marriage_state(arg, -REMARRIAGE_DELTA);
  }
  return 0;
}

module.exports = {
  show_button_marriage,
  check_able_to_marriage,
  marriage,
  divorce,
  current_spouse_text,
  marriage_dog,
  marriage_you,
  marriage_lovers,
  slave_marriage,
  orc_marriage,
  slime_marriage,
  insect_marriage,
  ivy_marriage,
  syokusyu_marriage,
  faily_marriage,
  giant_marriage,
  man_marriage,
  girl_marriage,
  beast_marriage,
  brain_marriage,
  horse_marriage,
};
