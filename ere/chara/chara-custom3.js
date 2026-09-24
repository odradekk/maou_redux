/**
 * @file 外观定制页与外观编码分发（issue #392，N8 段 2）。
 *
 * 源: target/ERB/キャラ関数/CHARA_CUSTOM3.ERB 的 3 个函数：
 *     @CHAR_CUSTOM_LOOK_PAGE（:1-111）、@CHAR_CUSTOM_LOOK_DEAL（:118-182）、
 *     @PRINT_ARR_GROUP（:184-231）
 *
 * 调用面：同票的 ere/chara/chara-custom2.js 的 @CHAR_CUSTOM 主循环
 * （源 CHARA_CUSTOM2 ver1.0.1.ERB:28 的 `CALL CHAR_CUSTOM_LOOK_PAGE(L_PAGE-3)`
 * 与 :118-183 的 `CALL CHAR_CUSTOM_LOOK_DEAL(RESULT)`）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 *   - **TARGET 隐式读写显式化**：源里 `TALENT:头发颜色` 这类无角色段的寻址
 *     一律指 TARGET，本文件以 cid 形参承载；只有 :1-117/:1-117/:1-117 三处
 *     `IF TARGET == MASTER` 的原作判据按 cid === 0 落地。
 *   - **按钮正文不写 `[...]` 包装**：源 :223 是
 *     `PRINTBUTTON @"[%LOCALS%]", L_IDX * 100 + L_I`——Emuera 的按钮正文
 *     原样显示（print-system.md「虽非必须但建议保留 [0] 等标记」），
 *     EraElectron 的 `era.printButton` 则**自动**拼 `[快捷键] 正文`
 *     （夹具 make_button_entry 的 rendered 公式）。照抄方括号会渲染成
 *     `[1100] [金色]`，故正文只给名字（与 menu-button.js 文件头第 1 条同款）。
 *   - **`PRINTV "  "` 的行首缩进不搬运**：那是 Emuera 字符流里的两格缩进，
 *     EraElectron 的 `printMultiColumns` 是栅格布局，行首空格没有对应位置。
 *     列的排布改由 :212-218 的 80 宽换行决定（每行一个 Row，见下）。
 *   - **一次换行 = 一个 `printMultiColumns` Row**：源里每个 `PRINTL` 断行
 *     对应 EraElectron 的一行；按钮在 `printMultiColumns` 里以 GridObject
 *     承载（page-save-load.js 的 PRINTFORMLC 先例），每格宽度按本行格数均分
 *     24 列（栅格满行 24 列，`?? 24` 是引擎缺省，见夹具 make_grid_entry）。
 *     三个量都可断言：本行几格（Row 分组）、何时换行（80 宽阈值）、每格宽度
 *     （夹具按钮格的 `grid_width`，引擎 getValidWidth 的实测同源）。
 *   - **选中态用 `config.color`**：源 :220-226 的 `RESETCOLOR` /
 *     `SETCOLORBYNAME GRAY` 是 Emuera 的字符色，EraElectron 按钮色的等价物
 *     是 el-button 的 --el-button-text-color（page-ablup.js 的 GRAY 同值
 *     #808080；menu-button.js 文件头第 2 条：命名色在 hover 态会拼出非法值，
 *     必须十六进制串）。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');

/**
 * 本文件存根化的原作调用名：无（三个函数全部落地）。
 * docs/stub-registry.md 的核对测试读这个导出。
 */
const STUBBED_CALLS = [];

/** `SETCOLORBYNAME GRAY` 的十六进制（page-ablup.js 同值） */
const GRAY = '#808080';

/** `L_LEN >= 80` 的换行阈值（源 :214） */
const WRAP_WIDTH = 80;

/** `L_EXCEED > 10` 的早退阈值（源 :207） */
const MAX_BLANKS = 10;

/** 栅格的满行宽度（引擎 24 列，夹具 make_grid_entry 的 `?? 24`） */
const GRID_COLUMNS = 24;

// —— 外观看板的字面量表（源 target/ERB/其他/VARIABLES.ERH，逐表标注出处）——

/** ARR_头发颜色2（:22）——注意与 look-info.js 的 HAIR_COLOR_MAP（ARR_HAIRCOLOR，:1-117）是两张表 */
const ARR_头发颜色2 = [
  '',
  '金色',
  '栗色',
  '黑色',
  '红色',
  '银色',
  '蓝色',
  '绿色',
  '紫色',
  '白色',
  '暗金色',
  '粉色',
];

/** ARR_发型（:31） */
const ARR_发型 = [
  '',
  '自然',
  '中分',
  '不均分',
  '长束发',
  '马尾',
  '侧马尾',
  '垂发辫',
  '双马尾',
  '顶束发',
  '侧束发',
  '鱼骨辫',
  '卷发',
];

/** 头发长度档（源 :14 的 `LOCALS '= "短", "半长", "长"`，三档） */
const ARR_头发长度 = ['短', '半长', '长'];

/** ARR_头发状态（:25） */
const ARR_头发状态 = [
  '',
  '直发',
  '卷发',
  '内卷发',
  '外卷发',
  '天然卷',
  '大波浪',
];

/** ARR_头发修剪方式（:28） */
const ARR_头发修剪方式 = ['', '基本剪法', '齐剪', '层剪', '碎发'];

/** ARR_目（:34） */
const ARR_目 = [
  '',
  '细长眼',
  '大眼',
  '深邃眼',
  '吊眼',
  '水汪汪眼',
  '标准眼',
  '三白眼',
  '下垂眼',
];

/** ARR_瞳色（:37） */
const ARR_瞳色 = ['', '蓝色', '棕色', '灰色', '金色', '红色', '黑色'];

/** ARR_唇（:40） */
const ARR_唇 = ['', '肉感的', '薄的', '丰润的', '标准'];

/** 体型档（源 :37 的 `LOCALS '= "纤细", "标准", "丰满"`，三档） */
const ARR_体型 = ['纤细', '标准', '丰满'];

/** 阴毛状态档（源 :41 的 `LOCALS '=` 七档） */
const ARR_阴毛状态 = ['白虎', '胎毛', '新长的', '稀薄', '标准', '浓密', '硬毛'];

/** ARR_乳头（:43） */
const ARR_乳头 = ['', '粉红色', '褐色', '标准', '凹陷'];

/** ARR_魅力点（:46） */
const ARR_魅力点 = [
  '',
  '皮肤',
  '眼角',
  '鼻梁',
  '嘴角',
  '泪痣',
  '锁骨',
  '小臂',
  '手腕',
  '手',
  '手指',
  '肚脐',
  '美乳',
  '腰线',
  '臀部线条',
  '腿部线条',
  '膝盖',
  '脚踝',
  '脚跟',
  '背脊',
  '耳朵',
  '性器',
  '头发的光泽',
  '丰满的屁股',
  '长睫毛',
  '虎牙',
  '眉毛',
  '指甲',
  '寝癖',
];

/** ARR_癖（:49） */
const ARR_癖 = [
  '',
  '舔嘴唇',
  '往后看',
  '摸头发',
  '用腿夹住手',
  '抱手臂',
  '手指交握',
  '抖腿',
  '打拍子',
  '仰视对方',
  '歪脖子',
  '叹气',
  '动作夸张',
  '频繁眨眼',
  '鼓腮',
  '咬紧牙关',
  '遮住嘴',
  '摸耳朵',
  '懒散',
  '咂嘴',
  '咬指甲',
  '挠鼻子',
  '扶额',
  '握拳',
  '用手指人',
  '说口头禅',
  '扭腰',
  '闭上一只眼',
  '眯眼',
  '歪嘴',
  '碎碎念',
  '总往角落躲',
  '估算物体长度',
  '说话越说越近',
  '舔手背',
];

/** ARR_喜欢的东西（:63） */
const ARR_喜欢的东西 = [
  '',
  '甜食',
  '辣条',
  '唱歌',
  '故乡的恋人',
  '钱',
  '跳舞',
  '绘画',
  '家族',
  '使命',
  '故乡',
  '憧憬的那个人',
  '可爱的动物',
  '美丽的饰品',
  '宝石',
  '点心',
  '喝茶',
  '睡觉',
  '小说',
  '开怀大笑',
  '游泳',
];

/** ARR_成为勇者前的生活（:52）——**无空串首项**，0 号是「不明」 */
const ARR_成为勇者前的生活 = [
  '不明',
  '学生',
  '修女',
  '农民',
  '渔民',
  '妓女',
  '小偷',
  '乞丐',
  '贵族',
  '贫民',
  '守墓人',
  '巫女',
  '圣女',
  '预言家',
  '占卜师',
  '商人',
  '采药人',
  '隐士',
  '面包师',
  '军人',
  '奴隶',
  '主妇',
  '淫乱的产物',
  '堕落的结果',
  '爱的结晶',
  '交欢的副产品',
  '魔族的孽种',
];

/** ARR_成为勇者的契机（:55）——同样**无空串首项** */
const ARR_成为勇者的契机 = [
  '不明',
  '命运的引导',
  '为了钱',
  '受到了上天启示',
  '因使命感而热血沸腾',
  '对日常感到厌倦',
  '经历无尽悲伤后',
  '拯救故乡',
  '复仇',
  '国王的任命',
  '赎罪',
  '自暴自弃',
  '纯属意外',
  '被命令了',
  '无可奈何',
  '测试自己的力量',
  '为了和平',
  '为了正义',
  '梦见成为了勇者',
  '获得了力量',
  '旅行的结果',
  '父母的嘱咐',
  '憧憬魔王',
  '为了出人头地',
  '为了报恩',
  '被恶魔诱惑',
];

/** ARR_种族（:58）——**无空串首项**，0 号是「人类」 */
const ARR_种族 = [
  '人类',
  '精灵',
  '狼人',
  '吸血鬼',
  '无头骑士',
  '龙族',
  '天使',
  '暗精灵',
  '堕天使',
  '魔族',
  '霍比特人',
  '矮人',
];

/** ARR_种族2（:61） */
const ARR_种族2 = [
  '',
  '兽人',
  '史莱姆',
  '昆虫',
  '植物',
  '触手',
  '妖精',
  '巨人',
  '魔族',
  '魔兽',
];

/** 素质下标（yml/Talent.yml） */
const T_精英 = 220;
const T_头发颜色 = 300;
const T_头发状态 = 301;
const T_头发长度 = 302;
const T_头发修剪方式 = 303;
const T_发型 = 304;
const T_目 = 305;
const T_瞳色 = 306;
const T_唇 = 307;
const T_体型 = 308;
const T_乳头 = 309;
const T_阴毛状态 = 310;
const T_魅力点 = 312;
const T_癖 = 313;
const T_种族 = 314;
const T_成为勇者前的生活 = 315;
const T_成为勇者的契机 = 316;
const T_喜欢的东西 = 317;
const T_种族2 = 319;

/** 读取素质（#13：未声明下标读回 undefined，兜底 0） */
function talent(cid, index) {
  return era.get(`talent:${cid}:${index}`) || 0;
}

/** 写素质 */
function set_talent(cid, index, value) {
  era.set(`talent:${cid}:${index}`, value);
}

/** 显示宽度（全角 2 / 半角 1） */
function disp_width(text) {
  let width = 0;
  for (const ch of text) {
    width += ch.codePointAt(0) > 0xff ? 2 : 1;
  }
  return width;
}

/**
 * @PRINT_ARR_GROUP（:184-231）：把一张名字表摆成按钮组。
 *
 * 两个可观察的排版常量：`L_LEN >= 80` 换行（:214，宽度按显示宽度累加，
 * 每项额外 +2 的间隔）与 `L_EXCEED > 10` 早退（:207，**累计**空串数，
 * 不是连续段——源里的 L_EXCEED 从不在非空项上重置）。
 *
 * @param {string[]} arr 名字表（源 L_ARR，`#DIMS REF`）
 * @param {number} val 选中项的表内序号（源 L_VAL；越界即无选中项）
 * @param {number} idx 组号（源 L_IDX；按钮快捷键 = idx * 100 + 序号）
 */
function print_arr_group(arr, val, idx) {
  let blanks = 0;
  let line_len = 0;
  let row = [];

  const flush = () => {
    if (row.length === 0) {
      return;
    }
    // 每格宽度按**本行**的格数均分（栅格满行 24 列，引擎 getValidWidth 的
    // 缺省与上限都是 24）。宽度必须在冲行这一刻才算：本行在循环里还会再长，
    // 早算或先占位（0）都会被引擎按缺省列宽渲染——换行冲出的那些行曾整行
    // 拿到 width: 0（#392 二轮验收实测）
    const width = Math.floor(GRID_COLUMNS / row.length);
    era.printMultiColumns(
      row.map((cell) => ({
        type: 'button',
        accelerator: cell.accelerator,
        content: cell.content,
        config: {
          width,
          ...(cell.color ? { color: cell.color } : {}),
        },
      })),
    );
    row = [];
  };

  for (let i = 0; i < arr.length; i += 1) {
    const name = arr[i];
    const length = disp_width(name);
    if (length < 1) {
      blanks += 1; // :206
      if (blanks > MAX_BLANKS) {
        break; // :207-208
      }
      continue; // :209
    }
    line_len += length + 2; // :212
    if (line_len >= WRAP_WIDTH) {
      flush(); // :184-231 PRINTL（换行）
      line_len = length + 2; // :217
    }
    row.push({
      accelerator: idx * 100 + i, // :223
      content: name,
      color: i === val ? undefined : GRAY, // :220-226（选中项 RESETCOLOR）
    });
  }
  flush();
  era.setColor(''); // :184-231 RESETCOLOR（原作的字符色复位）
  // :231 的 PRINTL 只结束最后一格行（行首 :198 的 PRINTV "  " 起头、按钮逐格
  // 续拼），不产生空行——ere 的 printMultiColumns 自成一行
}

/**
 * @CHAR_CUSTOM_LOOK_PAGE（:1-111）：外观定制页的两屏。
 *
 * @param {number} arg 页号（源 ARG：0 = 头发与外观，1 = 魅力/癖好/来历）
 * @param {number} cid 角色 ID（源里是 TARGET）
 */
function char_custom_look_page(arg, cid = era_flag.target) {
  if (arg === 0) {
    // :5 VARSET LOCALS——本地字符串数组，落 JS 常量，无运行时动作

    era.print('■=== 发色 ===■'); // :7
    print_arr_group(ARR_头发颜色2, talent(cid, T_头发颜色), 11); // :8

    era.print('■=== 发型 ===■'); // :10
    print_arr_group(ARR_发型, talent(cid, T_发型), 12); // :11

    era.print('■=== 头发长度 ===■'); // :13
    // :15 `(TALENT:头发长度-1)/100`：长度 101-300 映到 0-2 档
    print_arr_group(
      ARR_头发长度,
      Math.trunc((talent(cid, T_头发长度) - 1) / 100),
      13,
    );

    era.print('■=== 状态 ===■'); // :17
    print_arr_group(ARR_头发状态, talent(cid, T_头发状态), 14); // :18

    era.print('■=== 修剪 ===■'); // :20
    print_arr_group(ARR_头发修剪方式, talent(cid, T_头发修剪方式), 15); // :21

    // :24 `ELSEIF ARG == 1` 被注释掉——两屏在同一分支里，靠下面的 ELSEIF 分

    era.print('■=== 眼型 ===■'); // :27
    print_arr_group(ARR_目, talent(cid, T_目), 21); // :28

    era.print('■=== 瞳色 ===■'); // :30
    print_arr_group(ARR_瞳色, talent(cid, T_瞳色), 22); // :31

    era.print('■=== 唇型 ===■'); // :33
    print_arr_group(ARR_唇, talent(cid, T_唇), 23); // :34

    era.print('■=== 体型 ===■'); // :36
    print_arr_group(ARR_体型, Math.trunc((talent(cid, T_体型) - 1) / 100), 24); // :38

    era.print('■=== 阴毛状态 ===■'); // :40
    print_arr_group(ARR_阴毛状态, pubic_index(talent(cid, T_阴毛状态)), 25); // :60

    era.print('■=== 乳头 ===■'); // :62
    print_arr_group(ARR_乳头, talent(cid, T_乳头), 26); // :63

    return;
  }

  // :66 ELSEIF ARG == 1
  era.print('■=== 魅力点 ===■'); // :69
  print_arr_group(ARR_魅力点, talent(cid, T_魅力点), 31); // :70

  era.print('■=== 癖 ===■'); // :72
  print_arr_group(ARR_癖, talent(cid, T_癖), 32); // :73

  era.print('■=== 曾经喜欢的东西 ===■'); // :75
  print_arr_group(ARR_喜欢的东西, talent(cid, T_喜欢的东西), 33); // :76

  // :1-117-85 三处标题同名换词（魔王 / 精英 / 其余）
  if (cid === 0) {
    era.print('■=== 成为魔王之前 ===■');
  } else if (talent(cid, T_精英)) {
    era.print('■=== 来到据点之前 ===■');
  } else {
    era.print('■=== 成为勇者之前 ===■');
  }
  print_arr_group(ARR_成为勇者前的生活, talent(cid, T_成为勇者前的生活), 41); // :86

  if (cid === 0) {
    era.print('■=== 成为魔王的契机 ===■'); // :90
  } else if (talent(cid, T_精英)) {
    era.print('■=== 回应召唤的理由 ===■'); // :92
  } else {
    era.print('■=== 成为勇者的契机 ===■'); // :94
  }
  print_arr_group(ARR_成为勇者的契机, talent(cid, T_成为勇者的契机), 42); // :96

  if (cid === 0) {
    // :1-117-100 魔王没有种族组
  } else if (talent(cid, T_精英)) {
    era.print('■=== 精英种族 ===■'); // :102
    print_arr_group(ARR_种族2, talent(cid, T_种族2), 2); // :103
  } else {
    era.print('■=== 种族 ===■'); // :105
    print_arr_group(ARR_种族, talent(cid, T_种族), 1); // :106
  }

  // :109-110 `IF TALENT:314 == 9` 是空块（原地注释），不落地
}

/**
 * 阴毛状态的档位换算（源 :42-59 的 SELECTCASE）。
 *
 * 重叠区间按 Emuera 的「先匹配先取」：20 归 `CASE 2 TO 20`、50 归
 * `CASE 20 TO 50`……链尾的 `CASEELSE` 接 0 与 500 以上（原表的 501-500 空档
 * 之外还有 0 号）。
 *
 * @param {number} value TALENT:阴毛状态（1-500+）
 * @returns {number} ARR_阴毛状态 的表内序号（0-7；7 = CASEELSE 的越界档）
 */
function pubic_index(value) {
  if (value === 1) return 0; // :43-44
  if (value >= 2 && value <= 20) return 1; // :45-46
  if (value >= 20 && value <= 50) return 2; // :47-48
  if (value >= 50 && value <= 100) return 3; // :49-50
  if (value >= 100 && value <= 150) return 4; // :51-52
  if (value >= 150 && value <= 200) return 5; // :53-54
  if (value >= 201 && value <= 500) return 6; // :55-56
  return 7; // :57-58 CASEELSE
}

/**
 * @CHAR_CUSTOM_LOOK_DEAL（:118-182）：把编码（组号 × 100 + 序号）落到素质上。
 *
 * @param {number} arg 编码（源 ARG）
 * @param {number} cid 角色 ID（源里是 TARGET）
 * @returns {number} 0 = 已处理；-1 = 未登记的组号（源 :180）
 */
function char_custom_look_deal(arg, cid = era_flag.target) {
  const idx = Math.trunc(arg / 100); // :122（Emuera 的整数除法向零截断）
  const val = arg - idx * 100; // :123

  if (idx === 1) {
    set_talent(cid, T_种族, val); // :126
  } else if (idx === 2) {
    set_talent(cid, T_种族2, val); // :128
  } else if (idx === 11) {
    set_talent(cid, T_头发颜色, val); // :130
  } else if (idx === 12) {
    set_talent(cid, T_发型, val); // :132
  } else if (idx === 13) {
    set_talent(cid, T_头发长度, val * 100 + 2); // :134
  } else if (idx === 14) {
    set_talent(cid, T_头发状态, val); // :136
  } else if (idx === 15) {
    set_talent(cid, T_头发修剪方式, val); // :138
  } else if (idx === 21) {
    set_talent(cid, T_目, val); // :141
  } else if (idx === 22) {
    set_talent(cid, T_瞳色, val); // :143
  } else if (idx === 23) {
    set_talent(cid, T_唇, val); // :145
  } else if (idx === 24) {
    set_talent(cid, T_体型, val * 100 + 2); // :147
  } else if (idx === 25) {
    // :149-164 七档 SELECTCASE；无 CASEELSE——7 以上静默不写
    const PUBIC_VALUES = [1, 2, 21, 51, 101, 151, 202];
    if (val >= 0 && val < PUBIC_VALUES.length) {
      set_talent(cid, T_阴毛状态, PUBIC_VALUES[val]);
    }
  } else if (idx === 26) {
    set_talent(cid, T_乳头, val); // :166
  } else if (idx === 31) {
    set_talent(cid, T_魅力点, val); // :169
  } else if (idx === 32) {
    set_talent(cid, T_癖, val); // :171
  } else if (idx === 33) {
    set_talent(cid, T_喜欢的东西, val); // :173
  } else if (idx === 41) {
    set_talent(cid, T_成为勇者前的生活, val); // :176
  } else if (idx === 42) {
    set_talent(cid, T_成为勇者的契机, val); // :178
  } else {
    return -1; // :179-180
  }
  return 0; // :182
}

module.exports = {
  STUBBED_CALLS,
  GRAY,
  WRAP_WIDTH,
  MAX_BLANKS,
  print_arr_group,
  char_custom_look_page,
  char_custom_look_deal,
};
