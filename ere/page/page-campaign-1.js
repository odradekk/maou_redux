/**
 * @file 战役1「赤蛮咒森」：CAMPAIGN_1.ERB 的 13 个编号函数（#469）。
 *
 * 源: target/ERB/侵略/CAMPAIGN/CAMPAIGN_1.ERB
 *
 * 本文件向 page-campaign.js（CAMPAIGN_NAME/EXIST/SET）与各域文件
 * （dungeon.js 等）声明的 DispatchFamily 注册战役 1 的实现，只 register(1,
 * fn)，不参与 family 的声明——与 kojo/kojo-kN-*.js 向 kojo-dungeon-after.js
 * 声明的族注册同构（该文件头有先例说明）。注册是顶层副作用，必须由
 * system/flow/main-loop.js 显式 require 才会触发。
 *
 * `CAMPAIGN_DUNGEON_LV_1`（:278-281，RETURN 45）已在
 * ere/dungeon/monster-data.js 真身实现（按 FLAG:400 手写 if/else，非
 * DispatchFamily），不在本文件重复。`CAMPAIGN_MONSTER_EXTRA_1`（:261-275）
 * 登记不实现：唯一潜在调用方 `@CAMPAIGN_MONSTER_EXTRA` 全库零调用点，
 * 原作本身不可达（issue #469 实测范围评论）。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const {
  campaign_name_family,
  campaign_exist_family,
  campaign_set_family,
} = require('#/page/page-campaign');
const {
  campaign_room_family,
  campaign_quest_family,
  campaign_story_family,
} = require('#/dungeon/dungeon');
const { campaign_room_extra_family } = require('#/dungeon/dungeon-room');
const { campaign_trap_family } = require('#/dungeon/dungeon-trap');
const { campaign_equip_select_family } = require('#/system/equip/equip-select');
const { campaign_monster_list_family } = require('#/dungeon/dungeon-battle');
const { chara_callname } = require('#/utils/callname-utils');

/** 原作 RAND:N（0..N-1）的缺省实现 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** 战役名两段展示文本（:76/:78/:80 FONTBOLD 段 + FONTREGULAR 段） */
const NAME_BOLD = '赤森谜路 ';
const NAME_REGULAR = '-ROAD・to・CRIMSON・FOREST-';

/**
 * @CAMPAIGN_NAME_1（:73-81）：战役名展示（菜单头部，随 CAMPAIGN_MENU 调用）。
 * @returns {number} RETURN 0
 */
function campaign_name_1() {
  era.print([
    { content: NAME_BOLD, fontWeight: 'bold' },
    { content: NAME_REGULAR },
  ]);
  return 0;
}
campaign_name_family.register(1, campaign_name_1);

/**
 * @CAMPAIGN_EXIST_1（:51-57）：战役选择菜单的列表项。
 *
 * 移植说明：原作 `PRINT [1] ` + `CALL CAMPAIGN_NAME_1` 拼在同一行；本移植
 * 按钮化（PR #53 通则，见 page-campaign.js 文件头），FONTBOLD 加粗在按钮
 * 场景丢失（printButton 的 content 只接受纯字符串）。
 * @param {number} slot 战役槽位号（来自 SELECT_CAMPAIGN 的 FOR 循环，本
 *   函数固定注册在槽位 1，形参只用于 printButton 的第二实参）
 * @returns {number} RETURN 1
 */
function campaign_exist_1(slot) {
  era.printButton(`${NAME_BOLD}${NAME_REGULAR}`, slot);
  return 1;
}
campaign_exist_family.register(1, campaign_exist_1);

/**
 * @CAMPAIGN_SET_1（:59-71）：选中战役后的初始设置。
 * @returns {number} RETURN 1
 */
async function campaign_set_1() {
  era_flag.hero_campaign_active = 1; // :62 FLAG:400 = 1
  const master = chara_callname(0); // %SAVESTR:MASTER%
  const lines = [
    '极东之地、赤蛮咒森。魔王的支配无法触及的诅咒之地',
    `${master}听到了一条有趣的传言`,
    '咒森的深处、有一尊能令任何女人都淫乱至狂的神奇雕像',
    '强大的邪教集团支配着那片土地、并设置了抵御魔王的铁壁结界',
    `${master}拥有迷惑女人的力量`,
    '迷惑能够出入咒森的巫女、纳为侵略咒森的棋子',
    '用不了多久咒森也会开始向魔王领地派兵吧。然后、将她们也化为棋子吧――',
  ];
  for (const line of lines) {
    era.print(line);
    await era.waitAnyKey();
  }
  return 1;
}
campaign_set_family.register(1, campaign_set_1);

/**
 * @CAMPAIGN_ROOM_1（:84-95）：楼层设施。4 层以上是人类牧场（502）。
 * @param {number} floor 阶层（原作 ARG:0）
 * @returns {number} 房间类型（0 = 无设施）
 */
function campaign_room_1(floor) {
  return floor > 3 ? 502 : 0;
}
campaign_room_family.register(1, campaign_room_1);

/**
 * @CAMPAIGN_ROOM_EXTRA_1（:98-112）：楼层设施扩张位域。5 层以上 +1（位 0，
 * 搾乳设备），6 层以上再 +2（位 1，种付奴隶）。
 * @param {number} floor 阶层（原作 ARG:0）
 * @returns {number} 扩张位域（0-3）
 */
function campaign_room_extra_1(floor) {
  let extra = 0;
  if (floor > 4) {
    extra += 1;
  }
  if (floor > 5) {
    extra += 2;
  }
  return extra;
}
campaign_room_extra_family.register(1, campaign_room_extra_1);

/** @CAMPAIGN_TRAP_1（:115-168）的 TRAP_NUM → TRAP_ID 映射表 */
const TRAP_ID_BY_NUM = new Map([
  [301, 60],
  [302, 60],
  [303, 82],
  [304, 82],
  [305, 78],
  [312, 72],
  [313, 72],
  [314, 84],
  [315, 84],
  [323, 76],
  [324, 65],
  [325, 65],
]);

/**
 * @CAMPAIGN_TRAP_1（:115-168）：楼层陷阱槽的具体陷阱 ID。
 * @param {number} trap_num FLAG 槽号（原作 ARG:0）
 * @returns {number} 陷阱 ID（未登记的槽号恒 0）
 */
function campaign_trap_1(trap_num) {
  return TRAP_ID_BY_NUM.get(trap_num) ?? 0;
}
campaign_trap_family.register(1, campaign_trap_1);

/** @CAMPAIGN_EQUIP_SELECT_1（:171-189）的楼层 → 戒指 ID 映射表 */
const RING_BY_FLOOR = new Map([
  [3, 313], // 死の指輪
  [4, 314], // 衰弱の指輪
  [5, 319], // 試練の指輪
]);

/**
 * @CAMPAIGN_EQUIP_SELECT_1（:171-189）：楼层指轮宝箱的道具号。
 * @param {number} floor 阶层（原作 ARG:0）
 * @returns {number} 道具号（未登记的楼层恒 0）
 */
function campaign_equip_select_1(floor) {
  return RING_BY_FLOOR.get(floor) ?? 0;
}
campaign_equip_select_family.register(1, campaign_equip_select_1);

/**
 * @CAMPAIGN_MONSTER_LIST_1（:192-258）的楼层 → 三选一怪物 ID 表
 * （DICE = RAND:3 的下标 0/1/2 对应 IF/ELSEIF/ELSE 三支）。
 */
const MONSTER_IDS_BY_FLOOR = new Map([
  [1, [600, 601, 602]],
  [2, [601, 602, 603]],
  [3, [603, 604, 605]],
  [4, [604, 605, 606]],
  [5, [606, 607, 608]],
  [6, [607, 608, 609]],
]);

/**
 * @CAMPAIGN_MONSTER_LIST_1（:192-258）：楼层出现怪物（随机三选一）。
 * @param {number} floor 阶层（原作 ARG:0）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {number} 怪物 ID（未登记的楼层恒 0）
 */
function campaign_monster_list_1(floor, rand = default_rand) {
  // :199 DICE = RAND:3——无条件掷（即使楼层不在表内也照掷），保持 PRNG
  // 序列与原作对齐（dungeon-battle.js 文件头同款纪律）
  const dice = rand(3);
  const ids = MONSTER_IDS_BY_FLOOR.get(floor);
  return ids ? ids[dice] : 0;
}
campaign_monster_list_family.register(1, campaign_monster_list_1);

/**
 * @CAMPAIGN_QUEST_1（:284-307）：楼层踏破判定。
 *
 * 原作按 CFLAG:(ARG:0):501（楼层）分 6 个 IF/ELSEIF 分支，但每支都是空
 * 语句（原作注释「今回はギミック無し」——本战役未设置楼层专属机关），
 * 与恒 RETURN 1 等价，不逐支复刻空分支。
 * @returns {number} RETURN 1（恒成功；原作 ARG:0 全程未被引用）
 */
function campaign_quest_1() {
  return 1;
}
campaign_quest_family.register(1, campaign_quest_1);

/** @CAMPAIGN_STORY_1（:310-357）按 FLAG:401（0-5）六档分支的剧情文本 */
const STORY_LINES_BY_PROGRESS = [
  [
    '真是奇妙的森林。奇形怪状的植物、还有与其共生进化而来的动物和昆虫',
    '并非秋季却红的发紫的巨大树叶。半裸的原住民见到{master}的奴隶便四下逃开了',
    '有趣的是这当中并没有年轻的女性。传言的话、所有人都会聚集到森林深处的神殿、只有小孩才能返回',
    '在森林深处进行着荒淫的派对。开得煞是妖艳的花不禁让人联想到了如此画面',
    '总之先向着那里前进吧。{master}的奴隶静静地继续前进了',
    '――水晶球映出的报告到这就结束了',
  ],
  [
    '森林外围墓碑林立。到处都是、被苔藓藤蔓树根常年侵蚀得无法辨识枯坟野冢',
    '护理这些坟墓的是一个看起来30来岁的女守墓人。一番交谈。她解开了自己的长袍、将身体露了出来',
    '清晰可见被破坏了的性器。伤痕累累的身体。碎裂的乳头',
    '「从森林深处回来的都是像我这样的对象。不停地生产、直到不能再用、成了废品为止、就会被抛弃」',
    '谈话结束之后、奴隶便静静地继续前进了',
    '――水晶球映出的报告到这就结束了',
  ],
  [
    '惨遭侵犯的肉便器。被成群结队的红皮兽人不断侵犯着。肚子已经怀孕到了几乎要炸开的程度',
    '看来已经是废弃品了。森林中萦绕着娇喘声和喘息声。女人似乎已经被玩坏了',
    '魔王的奴隶在林间暗中观察着。肉便器的身上被烙着「废弃品」的印记',
    '女人一直痴笑着祈求着精液。可想而知她被从森林弃出之后会是什么下场',
    '兽人射着精、将已然崩坏的笑容染白了',
    '――水晶球映出的报告到这就结束了',
  ],
  [
    '森林深处坐落着巨大的神殿。魔王的奴隶稳健地将敌人击倒、一点一点的前进着',
    '女信徒祈祷着。将腰抬得老高、头点着地面、被从后面侵犯着',
    '无论男女、都进入了兴奋异常的状态、完全没有注意到侵入者的到来',
    '奴隶抬头一看。在眼中映出的是一尊奇妙的雕像。但是、完全感觉不到任何力量',
    '也许在神殿深处的才是「本尊」。是它将奇妙的效果影响到了神殿全域',
    '――水晶球映出的报告到这就结束了',
  ],
  [
    '女王就在那。根据捕获的女信徒的说法。女王被年轻的少年们簇拥着',
    '沐浴着年轻的精液、维持着年轻与美貌的魔女。奴隶得出了她就是雕像管理者的结论',
    '随着向神殿深处迈进、充满野性的腥味越来越浓郁',
    '宽敞的房间里、几个女人疯狂地向巨魔的巨根张开双腿、祈求着临幸',
    '走廊里的情侣们、不断摆动着腰肢流着口水露出了享受的神情',
    '――水晶球映出的报告到这就结束了',
  ],
  [
    '找到女王了。半裸着身子将下半身露了出来、端坐在玉座之上',
    '察觉到了侵入者的气息、便将奴隶少年们拉到一边去',
    '紧接着出现的是护卫的战士们。将肉便器装饰在肉棒上的巨魔、奇怪的魔术师',
    '最后一战一触即发',
  ],
];

/**
 * @CAMPAIGN_STORY_1（:310-357）：按剧情进度打印对应段落。
 * @returns {Promise<number>} RETURN 1
 */
async function campaign_story_1() {
  const master = chara_callname(0); // %SAVESTR:MASTER%
  const lines = STORY_LINES_BY_PROGRESS[era_flag.campaign_story_progress];
  if (lines) {
    for (const line of lines) {
      era.print(line.replace('{master}', master));
      await era.waitAnyKey();
    }
  }
  return 1;
}
campaign_story_family.register(1, campaign_story_1);

module.exports = {
  campaign_name_1,
  campaign_exist_1,
  campaign_set_1,
  campaign_room_1,
  campaign_room_extra_1,
  campaign_trap_1,
  campaign_equip_select_1,
  campaign_monster_list_1,
  campaign_quest_1,
  campaign_story_1,
};
