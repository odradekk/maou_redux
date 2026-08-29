/**
 * @file 地下城卖春日志与文本函数（issue #185，H16）：DUNGEON_BITCH_LOG.ERB
 * 十四函数的移植。卖春主流程（ere/kojo/kojo-dungeon-bitch.js，#184）的
 * 日志/文本调用点此前以占位行（STUBBED_CALLS）替代，本文件落地真身后换接。
 *
 * 源: target/ERB/迷宮/DUNGEON_BITCH_LOG.ERB  @LOG_TRY_BITCH（:8-49）
 *     @FS_BITCH（:51-277）@FS_LOG_BITCH（:279-316）@LOG_AFTER_BITCH
 *     （:318-378）@LOG_BITCH_HAND（:380-552）@LOG_BITCH_ORAL（:554-722）
 *     @LOG_BITCH_LES（:724-936）@LOG_BITCH_ANAL（:938-1174）
 *     @LOG_BITCH_SEX（:1176-1449）@LOG_BITCH_ANIMAL（:1451-1483）
 *     @LOG_BITCH_SELF（:1485-1519）@DUNGEON_SEX_LOG（:1532-1782）
 *     @DUNGEON_ANAL_LOG（:1784-1999）@DUNGEON_LES_LOG（:2001-2181）
 *
 * == 死代码判定（登记 #14） ==
 *
 * `@DUNGEON_SEX_LOG` / `@DUNGEON_ANAL_LOG` / `@DUNGEON_LES_LOG` 三个函数
 * **定义不在** [SKIPSTART]～[SKIPEND] 块内（源文件的 [SKIPSTART] 只有两处
 * 小段 :1460-1463 与 :1469-1478，都在 @LOG_BITCH_ANIMAL 体内；:1523 的
 * `;[SKIPSTART]` 以分号开头是**注释行**，不触发预处理，所以 :1532 起的
 * 三个函数定义会被 Emuera 装载）。但它们的**唯一调用方**（@DUNGEON_SEX
 * :1457、@DUNGEON_ANAL :1635、@DUNGEON_LES :1824）全在 DUNGEON_BITCH.ERB
 * 的 [SKIPSTART]（:1199）～[SKIPEND]（:3132）预处理块内（#184 判定的
 * 旧構文死代码）——全库无活调用点。判定：三个函数是**装载但无活调用**的
 * 原作死代码，移植保留函数定义（1:1，追溯注释齐全），但不接线。反向
 * 变异 M52x 守住「不被活代码引用」。
 *
 * == 文本 ==
 *
 * 口上正文经转译器离线归一为简体（issue #60，对 1:1 的有意偏离——源文件
 * 汉化本身繁简混用）。保真锁（test/kojo-text-fidelity.test.js 锁 D）对
 * ERB 侧应用同一张表归一后比对。
 *
 * == GET_LOOK_INFO 子集 ==
 *
 * `%GET_LOOK_INFO(ARG, "头发颜色")%` 是 LOOK.ERB:2885 的式中函数，本文件
 * 的 @FS_BITCH "LOOKS" 用到其中 7 个子集（头发颜色/目/阴毛状态/魅力点/
 * 癖/种族/成为勇者前的生活）。LOOK.ERB 的完整函数仍属「角色信息」票
 * （docs/stub-registry.md 的 GET_LOOK_INFO 行），本文件实现的是该函数
 * 的**被本文件使用的子集**（逐字对照 LOOK.ERB 对应段，出处标注在原处）。
 *
 * == 随机源 ==
 *
 * 与 kojo-dungeon-bitch.js 同款：每个函数接受可选的 rand 参数（[0, n)
 * 整数，缺省均匀随机），测试注入定值序固定随机分支。PRINTDATAL 随机选一
 * 即 `cands[rand(cands.length)]`。
 */

const era = require('#/era-electron');
const { chara_callname } = require('#/utils/callname-utils');

/** 默认随机源（[0, n) 整数）；测试注入定值序 */
const default_rand = (n) => Math.floor(Math.random() * n);

/** 角色的显示名（%SAVESTR:ARG% 的等价物） */
const name_of = (cid) => chara_callname(cid);

/**
 * 经验名（%EXPNAME:idx% 的等价物；引擎静态表 exp 的列名）。
 * width 对齐源 %EXPNAME:LCOUNT, 16, RIGHT%（宽度对齐参数，见 page-info-exp
 * 的 SUBSTRING 处理；本文件不参与对齐）。
 * @param {number} idx 经验下标
 * @returns {string}
 */
function expname(idx) {
  return era.get(`expname:${idx}`) ?? '';
}

/**
 * 点数名（%PALAMNAME:idx% 的等价物；引擎静态表 palam 的列名）。
 * @param {number} idx 点数下标
 * @returns {string}
 */
function palamname(idx) {
  return era.get(`palamname:${idx}`) ?? '';
}

/**
 * %GET_LOOK_INFO(cid, kind)% 的子集实现（LOOK.ERB:2885 的一部分，仅本文件
 * 用到的 7 个 kind；完整函数随「角色信息」票）。
 *
 * 源: target/ERB/キャラ関数/LOOK.ERB @GET_LOOK_INFO（:2885）——"头发颜色"
 *     （:2922）"目"（:3020）"阴毛状态"（:3095）"魅力点"（:3114）"癖"
 *     （:3180）"种族"（:3253）"成为勇者前的生活"（:3315）
 *
 * @param {number} cid 角色 ID
 * @param {string} kind 子集名
 * @returns {string}
 */
function get_look_info(cid, kind) {
  const t = (idx) => era.get(`talent:${cid}:${idx}`) || 0;
  switch (kind) {
    case '头发颜色': {
      // LOOK.ERB:2922-2948
      const map = {
        1: '金发',
        2: '栗发',
        3: '黑发',
        4: '红发',
        5: '银发',
        6: '蓝发',
        7: '绿发',
        8: '紫发',
        9: '白发',
        10: '暗金发',
        11: '粉发',
      };
      return map[t(300)] ?? '黑发'; // CASEELSE = 黑发
    }
    case '目': {
      // LOOK.ERB:3020-3039
      const map = {
        1: '细长眼',
        2: '大眼',
        3: '深邃眼',
        4: '吊眼',
        5: '水汪汪眼',
        6: '标准眼',
        7: '三白眼',
        8: '下垂眼',
      };
      return map[t(305)] ?? 'ERROR';
    }
    case '阴毛状态': {
      // LOOK.ERB:3095-3112（CASE 2 TO 20 等区间）
      const v = t(310);
      if (v === 1) return '白虎';
      if (v >= 2 && v <= 20) return '胎毛';
      if (v > 20 && v <= 50) return '新长的';
      if (v > 50 && v <= 100) return '稀薄';
      if (v > 100 && v <= 150) return '标准';
      if (v > 150 && v <= 200) return '浓密';
      if (v > 200 && v <= 500) return '硬毛';
      return 'ERROR';
    }
    case '魅力点': {
      // LOOK.ERB:3114-3180
      const map = {
        1: '皮肤',
        2: '眼角',
        3: '鼻梁',
        4: '嘴角',
        5: '泪痣',
        6: '锁骨',
        7: '小臂',
        8: '手腕',
        9: '手',
        10: '手指',
        11: '肚脐',
        12: '美乳',
        13: '腰线',
        14: '臀部线条',
        15: '腿部线条',
        16: '膝盖',
        17: '脚踝',
        18: '脚跟',
        19: '背脊',
        20: '耳朵',
        21: '性器',
        22: '头发的光泽',
        23: '丰满的屁股',
        24: '长睫毛',
        25: '虎牙',
        26: '眉毛',
        27: '指甲',
        28: '寝癖',
      };
      const v = t(312);
      if (v === 29) {
        // LOOK.ERB:3162-3166 CASE 29：SIF 男人/扶她 PRINT 自己的鸡鸡，否则 PRINT 私处
        if (t(121) === 1 || t(122) === 1) {
          return '自己的鸡鸡';
        }
        return '私处';
      }
      return map[v] ?? 'ERROR';
    }
    case '癖': {
      // LOOK.ERB:3180-3251
      const map = {
        1: '舔嘴唇',
        2: '往后看',
        3: '摸头发',
        4: '用腿夹住手',
        5: '抱手臂',
        6: '手指交握',
        7: '抖腿',
        8: '打拍子',
        9: '仰视对方',
        10: '歪脖子',
        11: '叹气',
        12: '动作夸张',
        13: '频繁眨眼',
        14: '鼓腮',
        15: '咬紧牙关',
        16: '遮住嘴',
        17: '摸耳朵',
        18: '懒散',
        19: '咂嘴',
        20: '咬指甲',
        21: '挠鼻子',
        22: '扶额',
        23: '握拳',
        24: '用手指人',
        25: '说口头禅',
        26: '扭腰',
        27: '闭上一只眼',
        28: '眯眼',
        29: '歪嘴',
        30: '碎碎念',
        31: '总往角落躲',
        32: '估算物体长度',
        33: '说话越说越近',
        34: '舔手背',
      };
      return map[t(313)] ?? 'ERROR';
    }
    case '种族': {
      // LOOK.ERB:3253-3282
      const map = {
        0: '人类',
        1: '精灵',
        2: '狼人',
        3: '吸血鬼',
        4: '无头骑士',
        5: '龙族',
        6: '天使',
        7: '暗精灵',
        8: '堕天使',
        9: '魔族',
        10: '霍比特人',
        11: '矮人',
      };
      return map[t(314)] ?? 'ERROR';
    }
    case '成为勇者前的生活': {
      // LOOK.ERB:3315-3389
      const v = t(315);
      const is_male = t(122) === 1;
      const map = {
        0: '不明',
        1: '学生',
        2: is_male ? '修士' : '修女',
        3: '农民',
        4: '渔民',
        5: '娼妓',
        6: '小偷',
        7: '乞丐',
        8: '贵族',
        9: '贫民',
        10: '守墓人',
        11: is_male ? '巫者' : '巫女',
        12: is_male ? '圣者' : '圣女',
        13: '预言家',
        14: '占卜师',
        15: '商人',
        16: '采药人',
        17: '隐士',
        18: '面包师',
        19: '军人',
        20: '奴隶',
        21: is_male ? '主夫' : '主妇',
        90: '淫乱的产物',
        91: '堕落的结果',
        92: '爱的结晶',
        93: '交欢的副产品',
        94: '魔族的孽种',
      };
      return map[v] ?? 'ERROR';
    }
    default:
      return 'ERROR';
  }
}

/**
 * @FS_BITCH（:51-277，#FUNCTIONS 返回字符串）：卖春用各种文字列取得函数。
 *
 * 分档：
 *   "PLAY"     玩法内容（1-7 → HAND/ORAL/LES/ANAL/SEX/ANIMAL/SELF）
 *   "PLAYNAME" 玩法显示名（1-7 → 手淫奉侍/…）
 *   "TOWN_MAN"/"TOWN_GIRL"  街中客名（1-5）
 *   "DUNGEON_MAN"/"DUNGEON_GIRL" 地下城客名（1-5）
 *   "LOOKS"    本人描写（随机覆盖式外貌/性格串，DICE = 2）
 *
 * @param {string} type 分档名
 * @param {number} arg 角色 ID（LOOKS 用）或序号（其余分档）
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {string}
 */
function fs_bitch(type, arg, rand = default_rand) {
  const rand_n = rand;
  switch (type) {
    case 'PLAY': {
      // :60-81 数値→プレイ内容変換
      const map = {
        1: 'HAND',
        2: 'ORAL',
        3: 'LES',
        4: 'ANAL',
        5: 'SEX',
        6: 'ANIMAL',
        7: 'SELF',
      };
      const v = map[arg];
      if (!v) {
        throw new Error(`未知参数{${arg}}`); // :80 THROW 未知参数{ARG}
      }
      return v;
    }
    case 'PLAYNAME': {
      // :83-98 表示用
      const map = {
        1: '手淫奉侍',
        2: '口交奉侍',
        3: '百合奉侍',
        4: '肛交奉侍',
        5: '性交奉侍',
        6: '兽交奉侍',
      };
      const v = map[arg];
      if (!v) {
        throw new Error('未知参数'); // :98 GOTO ERROR_ARG → THROW
      }
      return v;
    }
    case 'TOWN_MAN': {
      // :100-114
      const map = {
        1: '村民',
        2: '冒险者',
        3: '村里少年',
        4: '街边暴发户',
        5: '奸商',
      };
      const v = map[arg];
      if (!v) {
        throw new Error('未知参数');
      }
      return v;
    }
    case 'TOWN_GIRL': {
      // :115-129
      const map = {
        1: '主妇',
        2: '女冒险者',
        3: '女乞丐',
        4: '隐藏身份的贵妇',
        5: '艺伎',
      };
      const v = map[arg];
      if (!v) {
        throw new Error('未知参数');
      }
      return v;
    }
    case 'DUNGEON_MAN': {
      // :130-144
      const map = {
        1: '兽人',
        2: '魔族男人',
        3: '魔族少年',
        4: '魔族暴发户',
        5: '妖精商人',
      };
      const v = map[arg];
      if (!v) {
        throw new Error('未知参数');
      }
      return v;
    }
    case 'DUNGEON_GIRL': {
      // :145-159
      const map = {
        1: '淫魔',
        2: '魔族女人',
        3: '妖精的女乞丐',
        4: '魔族的贵妇人',
        5: '魔族的女祭司',
      };
      const v = map[arg];
      if (!v) {
        throw new Error('未知参数');
      }
      return v;
    }
    case 'LOOKS': {
      // :162-270 本人の描写。DICE = 2，随机覆盖式：每个 SIF 以 RAND:DICE == 0
      // 的概率把 LOCALS 换成候选串（一次都没覆盖则保留初始头发颜色串）。
      let locals = `${get_look_info(arg, '头发颜色')}的`; // :171
      const overwrite = (cond, text) => {
        if (cond && rand_n(2) === 0) {
          locals = text;
        }
      };
      overwrite(t(arg, 253), '小麦色的'); // :174
      overwrite(t(arg, 255), '白皙的'); // :176
      overwrite(t(arg, 244), '青色的'); // :178
      overwrite(t(arg, 310) === 1, '白虎的'); // :181
      overwrite(t(arg, 310) > 150, '阴毛浓密的'); // :183
      overwrite(t(arg, 313) === 7, '毛躁的'); // :186
      overwrite(t(arg, 313) === 9, '翻白眼'); // :188
      overwrite(t(arg, 313) === 10, '歪头'); // :190
      overwrite(t(arg, 313) === 11, '忧郁的样子'); // :192
      overwrite(t(arg, 313) === 14, '鼓腮的'); // :194
      overwrite(t(arg, 313) === 18, '慵懒的'); // :196
      overwrite(t(arg, 313) === 19, '不高兴的'); // :198
      overwrite(t(arg, 305) === 7, '严厉的眼神'); // :201
      overwrite(t(arg, 312) === 10, '手指漂亮的'); // :204
      overwrite(t(arg, 312) === 13, '腰身纤细的'); // :206
      overwrite(t(arg, 312) === 14, '臀部美形的'); // :208
      overwrite(t(arg, 312) === 15, '双腿修长的'); // :210
      overwrite(t(arg, 312) === 22, '艳丽头发的'); // :212
      overwrite(t(arg, 312) === 23, '臀部丰满的'); // :214
      overwrite(t(arg, 312) === 25, '虎牙可爱的'); // :216
      overwrite(t(arg, 315) === 8, '元贵族'); // :219
      overwrite(t(arg, 315) === 12, '元圣女'); // :221
      overwrite(t(arg, 204), '肉便器'); // :223
      overwrite(t(arg, 99), '高大的'); // :225
      overwrite(t(arg, 100), '矮小的'); // :227
      overwrite(t(arg, 256), '脸色不好的'); // :229
      overwrite(t(arg, 21) || t(arg, 22), '假正经的'); // :231
      overwrite(t(arg, 35), '害羞的'); // :233
      overwrite(t(arg, 15) || t(arg, 16), '任性的'); // :235
      overwrite(t(arg, 17), '笑容卑屈的'); // :237
      overwrite(t(arg, 12), '笑容灿烂的'); // :239
      overwrite(t(arg, 10) || t(arg, 26), '要哭了似的'); // :241
      overwrite(t(arg, 23) || t(arg, 25), '开朗的'); // :243
      overwrite(t(arg, 73), '水性杨花的'); // :245
      overwrite(t(arg, 509) === 1, '迷路的'); // :248
      // :250 INRANGE(ABL:ARG:37, 1, 3)
      overwrite(
        (era.get(`abl:${arg}:37`) || 0) >= 1 &&
          (era.get(`abl:${arg}:37`) || 0) <= 3,
        '卖身寻欢的',
      );
      overwrite(
        (era.get(`abl:${arg}:30`) || 0) === 10,
        '无法想象没有肉棒的生活的',
      ); // :253
      overwrite(
        (era.get(`abl:${arg}:31`) || 0) === 10,
        '一有空就不自觉地自慰的',
      ); // :255
      overwrite(
        (era.get(`abl:${arg}:32`) || 0) === 10,
        '变得非常喜欢腥臭精液的',
      ); // :257
      overwrite((era.get(`abl:${arg}:33`) || 0) === 10, '渴望侵犯女性的'); // :259
      overwrite(
        (era.get(`abl:${arg}:37`) || 0) === 10,
        '随时随地的渴望着Sexy，变成了欲望的俘虏',
      ); // :261
      // :264-267 陥落済みである
      if (t(arg, 76)) {
        locals += '好色的';
      } else if (t(arg, 85)) {
        locals += '背叛的';
      }
      // :269 %GET_LOOK_INFO(ARG, "种族")%的%SAVESTR:ARG%
      locals += `${get_look_info(arg, '种族')}的${name_of(arg)}`;
      return locals;
    }
    default:
      throw new Error(`未知的TYPE${type}`); // :271 THROW 未知的TYPE%TYPE%
  }
}

/** FS_BITCH 里 LOOKS 用的素质读取助手（带 || 0 兜底） */
function t(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/**
 * @FS_LOG_BITCH（:279-316，#FUNCTIONS 返回字符串）：卖春ログ表示文字列。
 *
 * 把客数/次数按序号拼成「N人的%FS_BITCH(TYPE, N)%」串，逗号分隔。
 *
 * @param {string} type 分档（客种类或 "PLAYNAME"）
 * @param {...number} counts 各序号的出现次数（ARG:1..ARG:5）
 * @returns {string}
 */
function fs_log_bitch(type, ...counts) {
  let locals = '';
  const name_fn =
    type === 'PLAYNAME'
      ? (n) => fs_bitch('PLAYNAME', n)
      : (n) => fs_bitch(type, n);
  for (let lcount = 1; lcount <= 5; lcount += 1) {
    const count = counts[lcount - 1];
    if (!count) {
      continue; // :290 CONTINUE
    }
    if (locals.length > 0) {
      locals += '、'; // :292
    }
    locals += `${count}人的${name_fn(lcount)}`; // :293
  }
  return locals;
}

/**
 * GETBIT 等价物（CHECK 位测试）。
 * @param {number} bits 位集合
 * @param {number} n 位号
 * @returns {number} 0/1
 */
function getbit(bits, n) {
  return (bits >> n) & 1;
}

/**
 * @LOG_TRY_BITCH（:8-49）：卖春直前の文章（还没开始、正否回数不明）。
 *
 * 首行输出 %FS_BITCH("LOOKS", ARG)%（本人描写），随后按场所（DUNGEON/
 * 其他=TOWN）与角色状态分档输出「无法压抑自己的性欲，」等前缀，末行
 * 「考虑着出卖肉体的事。」（PRINTFORMW = 换行等待）。
 *
 * 注意与 H15 的 @FI_TRY_BITCH（玩法抽选，返回玩法号）**不同函数**：
 * 本函数只输出文本、不改状态、无返回值；FI_TRY_BITCH 只返回玩法号、
 * 不输出（测试区分两者，见 test/kojo-dungeon-bitch-log.test.js）。
 *
 * @param {number} arg 角色 ID
 * @param {string} place "DUNGEON" | "TOWN"（源参数 PLACE）
 * @returns {Promise<void>}
 */
async function log_try_bitch(arg, place) {
  era.print(`${fs_bitch('LOOKS', arg)}`); // :14 %FS_BITCH("LOOKS", ARG)%
  if (place === 'DUNGEON') {
    // :16-35 侵入中
    if ((era.get(`cflag:${arg}:1`) || 0) === 2) {
      // :18-26 侵攻中的勇者
      if (
        (era.get(`abl:${arg}:37`) || 0) >= 1 ||
        era.get(`talent:${arg}:76`) ||
        0
      ) {
        era.print('无法压抑自己的性欲，'); // :21
      } else if (
        (era.get(`cflag:${arg}:580`) || 0) +
          (era.get(`cflag:${arg}:581`) || 0) +
          (era.get(`cflag:${arg}:582`) || 0) <
        -5000
      ) {
        era.print('对于借款只减少了一点点感到不满，'); // :23
      } else {
        era.print('在空闲的时间，'); // :25
      }
    } else if (
      (era.get(`cflag:${arg}:1`) || 0) === 3 &&
      (era.get(`cflag:${arg}:533`) || 0) > 1
    ) {
      era.print('瞒着同伴偷偷的'); // :28
    } else if ((era.get(`cflag:${arg}:500`) || 0) === 1) {
      // :29-32 卖春指示
      if (
        (era.get(`talent:${arg}:85`) || 0) &&
        !(
          era.get(`talent:${arg}:180`) ||
          0 ||
          era.get(`talent:${arg}:181`) ||
          0
        )
      ) {
        era.print('被强迫'); // :31
      }
      era.print('遵照命令，'); // :32
    } else {
      era.print('无法压抑自己的性欲，'); // :34
    }
  } else {
    // :36-46 卖淫中毒か淫乱
    if (
      (era.get(`abl:${arg}:37`) || 0) >= 1 ||
      era.get(`talent:${arg}:76`) ||
      0
    ) {
      era.print('无法压抑自己的性欲，'); // :39
    } else if (
      (era.get(`cflag:${arg}:580`) || 0) +
        (era.get(`cflag:${arg}:581`) || 0) +
        (era.get(`cflag:${arg}:582`) || 0) <
      -5000
    ) {
      era.print('由于高额的债务，不由得开始'); // :42
    } else {
      era.print('冒险资金花光了，'); // :44
    }
  }
  await era.printAndWait('考虑着出卖肉体的事。'); // :47
}

/**
 * @LOG_AFTER_BITCH（:318-378）：卖春描写函数呼出函数。
 *
 * 卖春全部结束后（CHECK 位记录玩法与客种类）挑一种玩法与一个客，按
 * CHECK bit0 的场所调 LOG_BITCH_%PLAY%(ARG, DUNGEON/TOWN, KYAKU)。
 *
 * 玩法挑选（DO..LOOP 1 恒真循环 = do-while 抽到命中）：
 *   - CHECK bit6（ANIMAL）→ PLAY = 6（兽）
 *   - CHECK bit3（LES）且 RAND:10 < 5 → 抽女性客（KYAKU+20 位命中），PLAY = 3
 *   - 否则：bit3 命中 → 同抽女性客，PLAY = 3；
 *     否则抽男性客（KYAKU+10 位命中）＋ 抽玩法（1-6，跳过 3，直到 PLAY 位命中）
 *
 * @param {number} arg 角色 ID
 * @param {number} check CHECK 位集合
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {Promise<void>}
 */
async function log_after_bitch(arg, check, rand = default_rand) {
  const rand_n = rand;
  let kyaku = 0;
  let play = 0;

  if (getbit(check, 6)) {
    play = 6; // :326
  } else if (getbit(check, 3) && rand_n(10) < 5) {
    // :329-333 女性客抽选（bit3 LES）
    do {
      kyaku = 1 + rand_n(6 - 1); // :330 RAND(1, 6)
    } while (!getbit(check, kyaku + 20)); // :332 SIF GETBIT(CHECK, KYAKU+20) BREAK
    play = 3; // :334
  } else {
    if (getbit(check, 3)) {
      // :343-347 女性客抽选
      do {
        kyaku = 1 + rand_n(6 - 1);
      } while (!getbit(check, kyaku + 20));
      play = 3; // :348
    } else {
      // :350-354 男性客抽选
      do {
        kyaku = 1 + rand_n(6 - 1);
      } while (!getbit(check, kyaku + 10));
      // :355-361 玩法抽选（1-6，跳过 3，直到 PLAY 位命中）
      do {
        play = 1 + rand_n(6 - 1); // :356 PLAY = RAND(1, 6)
        if (play === 3) {
          continue; // :358 SIF PLAY == 3 CONTINUE
        }
      } while (!getbit(check, play)); // :360 SIF GETBIT(CHECK, PLAY) BREAK
    }
  }

  // :366 %FS_BITCH("PLAY", PLAY)% —— CALLFORM LOG_BITCH_%LOCALS%(ARG, …)
  // 动态函数名分派：按玩法号调对应描写函数
  const play_fn = {
    HAND: log_bitch_hand,
    ORAL: log_bitch_oral,
    LES: log_bitch_les,
    ANAL: log_bitch_anal,
    SEX: log_bitch_sex,
    ANIMAL: log_bitch_animal,
  }[fs_bitch('PLAY', play)];
  if (getbit(check, 0)) {
    // :368 CALLFORM LOG_BITCH_%LOCALS%(ARG, "DUNGEON", KYAKU)
    await play_fn(arg, 'DUNGEON', kyaku, rand);
  } else {
    // :370 CALLFORM LOG_BITCH_%LOCALS%(ARG, "TOWN", KYAKU)
    await play_fn(arg, 'TOWN', kyaku, rand);
  }
  await era.waitAnyKey(); // :372 WAIT
}

/**
 * @LOG_BITCH_HAND（:380-552）：手交卖春描写。
 *
 * 按 ABL:13（手淫经验）分档前缀 → 「进行着手交卖春...」→ 场所/客种类
 * 分档（客名 + PRINTDATAL 随机一条客人台词）→ 两行固定地の文。
 *
 * @param {number} arg 角色 ID
 * @param {string} place "DUNGEON" | "TOWN"
 * @param {number} kyaku 客种类（1-5）
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {Promise<void>}
 */
async function log_bitch_hand(arg, place, kyaku, rand = default_rand) {
  const rand_n = rand;
  era.print(`${name_of(arg)}`); // :386 %SAVESTR:ARG%
  // :385-397 手淫经验分档
  switch (era.get(`abl:${arg}:13`) || 0) {
    case 0:
      era.print('公式般地揉搓着肉棒，一脸厌恶地'); // :389
      break;
    case 1:
      era.print('面对眼前的肉棒，垂下了双眼害羞地'); // :391
      break;
    case 2:
      era.print('看着客人的肉棒，一脸不开心的'); // :393
      break;
    case 3:
    case 4:
      era.print('一边看着客人的反应，一边'); // :395
      break;
    case 5:
    case 6:
      era.print('看着客人勃起时的反应，很高兴的'); // :397
      break;
    case 7:
    case 8:
      era.print('不时微笑着'); // :399
      break;
    case 9:
    case 10:
      era.print('娴熟的说着隐晦的淫词'); // :401
      break;
    default:
      break;
  }
  await era.printAndWait('进行着手交卖春...'); // :403

  if (place === 'DUNGEON') {
    // :401-476 地下城客
    const locals = fs_bitch('DUNGEON_MAN', kyaku); // 客名
    era.print(`客：${locals}`); // :408
    const picks = {
      1: [
        '「哇哦……射了　出来了　抱歉啊」',
        '兽人肚子上的赘肉摇晃着，似乎十分满意……',
        '「三发了，停不下来」',
      ],
      2: [
        '「手上活不错嘛……很有性奴隶的才能嘛」',
        '「对谁都会做这种事么？」',
        '魔族男人双交叉，不可一世的向下看着……',
      ],
      3: [
        '「呜哇……太色情了……」',
        '「被这样服务，好爽啊……」',
        '魔族少年似乎想要马上射出来的样子……',
      ],
      4: [
        '「呵呵……真是下贱的娼妓」',
        '「这个浪货……」',
        '「还能做的更熟练的吧」',
        '「要对得起我出的价让我爽一爽啊」',
      ],
      5: null,
    };
    if (kyaku === 5) {
      // :445-475 妖精商人按性格分档
      const t = (i) => era.get(`talent:${arg}:${i}`) || 0;
      const lines = t(160)
        ? ['「这是一双温婉的手……」']
        : t(161)
          ? ['「表情不错啊」']
          : t(162)
            ? ['「握得用力点啊」']
            : t(163)
              ? ['「小姐你很熟练嘛」']
              : t(164)
                ? ['「表情好恐怖哦」']
                : t(166)
                  ? ['「要仔细闻哦…」']
                  : ['「睾丸也要弄哦」'];
      await era.print(lines[rand_n(lines.length)]); // :445 PRINTDATAL
    } else {
      await era.print(picks[kyaku][rand_n(picks[kyaku].length)]); // :412 PRINTDATAL
    }
  } else {
    // :479-551 街中客
    const locals = fs_bitch('TOWN_MAN', kyaku); // 客名
    era.print(`客：${locals}`); // :481
    const picks = {
      1: ['「呵呵……谢啦……」', `男村民笑着调戏${name_of(arg)}。`],
      2: [
        '「完全成了婊子了啊」',
        `男冒险者把钱塞进了${name_of(arg)}的内衣里。`,
      ],
      3: [
        '「好棒哦，真是个，淫乱的大姐姐……」',
        '双手握住了之后，少年的腰轻轻地颤动着。',
      ],
      4: [
        '「臭婊子！」',
        '「母猪！」',
        '「射了以后要用头发给我擦干净哦」',
        '「嘛，手活做得挺不错的嘛」',
      ],
      5: null,
    };
    if (kyaku === 5) {
      const t = (i) => era.get(`talent:${arg}:${i}`) || 0;
      const lines = t(160)
        ? ['「嘿嘿……好温柔啊」']
        : t(161)
          ? ['「握紧点啊」']
          : t(162)
            ? ['「那眼神啥意思啊」']
            : t(163)
              ? ['「一副大小姐模样……还挺行的嘛」']
              : t(164)
                ? ['「还会抵触嘛」']
                : t(166)
                  ? ['「好好看着肉棒啊」']
                  : ['「不错不错」'];
      await era.print(lines[rand_n(lines.length)]); // :485 PRINTDATAL
    } else {
      await era.print(picks[kyaku][rand_n(picks[kyaku].length)]); // :485 PRINTDATAL
    }
  }
  // :550-551 固定地の文
  await era.printAndWait(
    `${name_of(arg)}跪在地上一边套动着阴茎一边看向客人的脸，时不时伸出舌头舔向马眼，笑嘻嘻的看着客人在快感中颤抖的样子。`,
  ); // :550
  await era.printAndWait(
    `在一阵无可忍耐的射精之后，${name_of(arg)}一边舔着被弄脏的手一边不屑的看着气喘吁吁的客人，随后媚笑着开始下一次服务。`,
  ); // :551
}

/**
 * @LOG_BITCH_ORAL（:554-722）：口交卖春描写。
 *
 * 按 ABL:32（口交经验）分档前缀 → 「进行着收费口交...」→ 场所/客种类
 * 分档（客名 + PRINTDATAL 随机一条客人台词）→ 三行固定地の文。
 *
 * @param {number} arg 角色 ID
 * @param {string} place "DUNGEON" | "TOWN"
 * @param {number} kyaku 客种类（1-5）
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {Promise<void>}
 */
async function log_bitch_oral(arg, place, kyaku, rand = default_rand) {
  const rand_n = rand;
  era.print(`${name_of(arg)}`); // :559 %SAVESTR:ARG%
  // :560-572 口交经验分档
  switch (era.get(`abl:${arg}:32`) || 0) {
    case 0:
      era.print('看着顶到鼻尖的肉棒，脸色发青的'); // :562
      break;
    case 1:
    case 2:
      era.print('艰难的适应着肉棒的气味和味道'); // :564
      break;
    case 3:
    case 4:
      era.print('发出“呷浦呷浦”的下流声音'); // :566
      break;
    case 5:
    case 6:
      era.print('愉悦的享受着肉棒的味道'); // :568
      break;
    case 7:
    case 8:
      era.print('带着轻松愉快的表情'); // :570
      break;
    case 9:
    case 10:
      era.print('用积极又不太过冒犯的态度'); // :572
      break;
    default:
      break;
  }
  await era.printAndWait('进行着收费口交...'); // :574
  await era.printAndWait(
    `${name_of(arg)}跪在地上将客人的阳具吞入口中，用舌头仔细地舔舐着。`,
  ); // :575

  if (place === 'DUNGEON') {
    // :578-650 地下城客
    const locals = fs_bitch('DUNGEON_MAN', kyaku); // 客名
    era.print(`客：${locals}`); // :580
    const picks = {
      1: ['「哇哈哈……给我好好舔」', '「呜哇，舌头舔着好爽啊」'],
      2: ['「后面的屁眼也要替我舔哦」', '「没错，喉咙也要用上！」'],
      3: ['「出来了……有什么要出来了」', '「这个姿势好色情啊！」'],
      4: [
        '「怎么样，味道不错吧？」',
        '「味道如何啊？」',
        '「说好吃看看啊，婊子！」',
        '「真变态啊……」',
      ],
      5: null,
    };
    if (kyaku === 5) {
      const t = (i) => era.get(`talent:${arg}:${i}`) || 0;
      const lines = t(160)
        ? ['「舌头用得真温柔啊……嘿嘿」']
        : t(161)
          ? ['「好好看这边啊」']
          : t(162)
            ? ['「不敢直视的样子也很可爱呢」']
            : t(163)
              ? ['「真是一张，可以回味一辈子的脸呢」']
              : t(164)
                ? ['「眼神不错呢」']
                : t(166)
                  ? ['「别用上牙来咬啊」']
                  : ['「哦哦……感觉不错呢」'];
      await era.print(lines[rand_n(lines.length)]); // :584 PRINTDATAL
    } else {
      await era.print(picks[kyaku][rand_n(picks[kyaku].length)]); // :584 PRINTDATAL
    }
  } else {
    // :653-720 街中客
    const locals = fs_bitch('TOWN_MAN', kyaku); // 客名
    era.print(`客：${locals}`); // :650
    const picks = {
      1: ['「哈哈……挺熟练的嘛……」', '「真拿你没办法，就让你舔吧～」'],
      2: ['「最近都没有洗啊……好好弄干净啊」', '「就那么缺钱吗？」'],
      3: [
        '「啊啊～……好棒～……」',
        '少年在她嘴里一泄如注，似乎不到干涸不会停下来。',
      ],
      4: [
        '「就用这下等的嘴巴爽爽好了」',
        '「真是符合母猪的工作呢」',
        '「不用谢～」',
        '「认真地舔啊！」',
      ],
      5: null,
    };
    if (kyaku === 5) {
      const t = (i) => era.get(`talent:${arg}:${i}`) || 0;
      const lines = t(160)
        ? ['「眼神看起来很温柔嘛」']
        : t(161)
          ? ['「吸得很带劲啊……」']
          : t(162)
            ? ['「别这么害怕嘛」']
            : t(163)
              ? ['「摆出一幅高贵的姿态做这种事什么的……」']
              : t(164)
                ? ['「还摆着一副冰冷的模样呢」']
                : t(166)
                  ? ['「哦吼，好怕怕哦」']
                  : ['「这不是很熟练么」'];
      await era.print(lines[rand_n(lines.length)]); // :654 PRINTDATAL
    } else {
      await era.print(picks[kyaku][rand_n(picks[kyaku].length)]); // :654 PRINTDATAL
    }
  }
  // :719-721 固定地の文
  await era.printAndWait('头突然被用手紧紧的按住，随后腥臭的精液在口中爆发了'); // :719
  await era.printAndWait(
    `还没等其缓过神来，客人就将阳具继续插入喉咙，按着${name_of(arg)}的头前后摇晃着套弄起来`,
  ); // :720
  await era.printAndWait(
    `在粗重的喘息声中，${name_of(arg)}的脸和乳房都沾满了白浊腥臭的精液，更多的精液沿着${name_of(arg)}的嘴角垂流而下`,
  ); // :721
}

/**
 * @LOG_BITCH_LES（:724-936）：百合卖春描写。
 *
 * 按 ABL:33（百合经验）分档前缀 → 「进行着百合卖春...」→ 场所/客种类
 * 分档（女性客 + PRINTDATAL 随机一条客人台词）→ 两行固定地の文。
 *
 * @param {number} arg 角色 ID
 * @param {string} place "DUNGEON" | "TOWN"
 * @param {number} kyaku 客种类（1-5）
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {Promise<void>}
 */
async function log_bitch_les(arg, place, kyaku, rand = default_rand) {
  const rand_n = rand;
  era.print(`${name_of(arg)}`); // :729 %SAVESTR:ARG%
  // :729-741 百合经验分档
  switch (era.get(`abl:${arg}:33`) || 0) {
    case 0:
      era.print('“明明知道不会插进来的”这样喃喃自语着'); // :732
      break;
    case 1:
    case 2:
      era.print('一点点兴奋了起来'); // :734
      break;
    case 3:
    case 4:
      era.print('用发出黏着水声的小穴'); // :736
      break;
    case 5:
    case 6:
      era.print('毫不掩饰自己的兴奋'); // :738
      break;
    case 7:
    case 8:
      era.print('呼喊着不成体统的话语'); // :740
      break;
    case 9:
    case 10:
      era.print('忘记了时间，一次又一次的和客人缠绵着'); // :742
      break;
    default:
      break;
  }
  await era.printAndWait('进行着百合卖春...'); // :744
  await era.printAndWait(
    `${name_of(arg)}跪在地上，用舌头仔细地舔舐着魔女的阴蒂，头突然被用手紧紧的按住，魔女按着她的头前后摇晃着摩擦起来，在高潮的尖叫中潮吹，爱液溅在${name_of(arg)}的唇舌和脸上…`,
  ); // :745
  await era.printAndWait(
    `在沉重的喘息声中，魔女将${name_of(arg)}搂在怀里，雌性发情的阴户互相摩刺激擦着，除了肉体的激烈碰撞声，随之而来的还有魔女和${name_of(arg)}的高潮绝叫…`,
  ); // :746

  if (place === 'DUNGEON') {
    // :748-882 地下城女性客
    const locals = fs_bitch('DUNGEON_GIRL', kyaku); // 客名
    era.print(`客：${locals}`); // :751
    const picks = {
      1: [
        '「你的精气，我不客气啦♪」',
        '「你看起来很可口嘛～」',
        '「胸部也要吸哦」',
        '「谢谢款待♪」',
        '「有你来当晚餐，我真幸福呢～」',
        '「光是接吻就高潮了？」',
        '「满满的精气～吸走了哦」',
        '「我就不客气啦♪」',
      ],
      2: [
        '「小奴隶，把尿接着啊」',
        '「这幅模样，真可爱」',
        '「来，赶快开始，已经习惯了吧？」',
        '「可悲的母猪就是要挨鞭子！小奴隶……」',
        '「就这样一直抱着……」',
        '「好多爱液溢出来了哦」',
        '「就一晚，当我的恋人吧……」',
        '「告诉我，你平常都是怎么自慰的？」',
      ],
      3: [
        '「钱，带来了……」',
        '「感觉软软的，软软的……」',
        '「蹂躏我吧、什么都不要考虑……」',
        '「偶尔奢侈一下，不行吗？」',
        '「卖尻穴来挣钱，然后又可以买女人回来……」',
        '「想把你买下来，然后让你跟别的男人口交来赚钱」',
        '「那么脏的我，被你的爱液洗干净了……」',
      ],
      4: [
        '「能满足我的性欲么？」',
        '「就那么想要钱么？」',
        '「呵呵，真是一只好色的小猫咪」',
        '「钱有的是，你看……」',
        '「那里，在用力点！」',
        '「啊，再多舔几下」',
        '「喂，屁股也要舔哦……」',
        '「吻我，快点」',
        '「我的鞭子，就是用调教你这样下贱的母猪」',
        '「呐，自慰给我看」',
        '「要从阴蒂舔到菊花啊」',
        '「爱抚一下我的小穴吧」',
        '「把你的腿打开，一起磨豆腐吧」',
      ],
      5: null,
    };
    if (kyaku === 5) {
      const t = (i) => era.get(`talent:${arg}:${i}`) || 0;
      const lines = t(160)
        ? [
            '「一起相爱吧」',
            '「来接吻吧，请温柔的」',
            '「好想像这样一直抱着……」',
            '「快乐就是我们的教义呢」',
          ]
        : t(161)
          ? [
              '「再来！再来！越粗暴越好！」',
              '「啊，乳头……再用力地捏……」',
              '「再打我的屁股……打得通红也可以」',
              '「堕落就是我们的教义呐」',
            ]
          : t(162)
            ? [
                '「更认真地舔吧……」',
                '「要好好舔，一直舔到屁股啊」',
                '「啊！表情不错，再呻吟得更大声吧……」',
                '「献媚就是我们的教义哦」',
              ]
            : t(163)
              ? [
                  '「结束了之后，一起去茶会吧」',
                  '「请在这张床上入眠吧」',
                  '「啊，请把尿喝光……」',
                  '「淫荡是我们的教义呢」',
                ]
              : t(164)
                ? [
                    '「若无其事的神色，真漂亮」',
                    '「比起挥剑，你还是卖淫比较有才能呢」',
                    '「啊～腋下～是弱点啦～」',
                    '「暴力是我们的教义」',
                  ]
                : t(166)
                  ? [
                      '「这次不来我们的神殿吗？」',
                      '「肌肤真不错……」',
                      '「这屁股真漂亮呢」',
                      '「放浪就是我们的教义啦」',
                    ]
                  : [
                      '「一起互相缠绕着身体吧」',
                      '「下次也要来我们的神殿哦」',
                      '「唔呼呼~还要再指名哦」',
                      '「快乐就是我们的教义」',
                    ];
      await era.print(lines[rand_n(lines.length)]); // :755 PRINTDATAL
    } else {
      await era.print(picks[kyaku][rand_n(picks[kyaku].length)]); // :755 PRINTDATAL
    }
  } else {
    // :885-934 街中女性客
    const locals = fs_bitch('TOWN_GIRL', kyaku); // 客名
    era.print(`客：${locals}`); // :868
    const picks = {
      1: ['「真好啊，这柔嫩的皮肤」', '「挺年轻的嘛……做这种事」'],
      2: ['「一起抱着睡吧……」', '「呵呵，别这么害怕嘛」'],
      3: ['「这是今天挣到的钱……」', '女乞丐拼命地扭动着腰直至绝顶。'],
      4: [
        '「真是个坏孩子呢～」',
        '「挺漂亮嘛」',
        '「喝酒么？」',
        '「先去洗澡吗？」',
      ],
      5: null,
    };
    if (kyaku === 5) {
      const t = (i) => era.get(`talent:${arg}:${i}`) || 0;
      const lines = t(160)
        ? ['「真是温柔的手法呢」']
        : t(161)
          ? ['「就喜欢帅气的人」']
          : t(162)
            ? ['「我来引领你吧」']
            : t(163)
              ? ['「这么矜持却很有感觉嘛～」']
              : t(164)
                ? ['「挺顽固的嘛～」']
                : t(166)
                  ? ['「请骂我吧！」']
                  : ['「可以喜欢我吗？」'];
      await era.print(lines[rand_n(lines.length)]); // :890 PRINTDATAL
    } else {
      await era.print(picks[kyaku][rand_n(picks[kyaku].length)]); // :872 PRINTDATAL
    }
  }
  // :932-933 固定地の文（源文本只有这两行；:744-745 已在上方）
  // —— 源 :934 无输出；:935-936 是空行/下一函数 ——
}

/**
 * @LOG_BITCH_ANAL（:938-1174）：肛交卖春描写。
 *
 * 按 ABL:3（肛门经验）分档前缀 → 「进行着肛交卖春...」→ 场所/客种类
 * 分档（客名 + PRINTDATAL 随机一条客人台词）→ 四行固定地の文。
 *
 * @param {number} arg 角色 ID
 * @param {string} place "DUNGEON" | "TOWN"
 * @param {number} kyaku 客种类（1-5）
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {Promise<void>}
 */
async function log_bitch_anal(arg, place, kyaku, rand = default_rand) {
  const rand_n = rand;
  era.print(`${name_of(arg)}`); // :943 %SAVESTR:ARG%
  // :943-955 肛门经验分档
  switch (era.get(`abl:${arg}:3`) || 0) {
    case 0:
      era.print('拼命忍耐着痛苦'); // :1185 // :946
      break;
    case 1:
      era.print('用经验不多的肠道'); // :948
      break;
    case 2:
      era.print('因为快乐露出了破绽，依然'); // :950
      break;
    case 3:
    case 4:
      era.print('用充分开发后的尻穴'); // :952
      break;
    case 5:
    case 6:
      era.print('紧锁着不知道用了多少次，已经变成了不逊于小穴的性器'); // :954
      break;
    case 7:
    case 8:
      era.print('不停地摆动着屁股'); // :956
      break;
    case 9:
    case 10:
      era.print('完完全全地沉溺在了H的快感之中'); // :958
      break;
    default:
      break;
  }
  await era.printAndWait('进行着肛交卖春...'); // :960
  await era.printAndWait(`${name_of(arg)}跪伏在床上，像母狗一样摇动着屁股…`); // :961

  if (place === 'DUNGEON') {
    // :961-1136 地下城客
    const locals = fs_bitch('DUNGEON_MAN', kyaku); // 客名
    era.print(`客：${locals}`); // :968
    const picks = {
      1: [
        '「菊穴啊……凑合用吧」',
        '「这完全是性器了嘛」',
        '「又湿又软」',
        '「你是卖肛门的？」',
        '「好啊，屁股翘起来」',
        '「这么淫乱的尻穴」',
        '「就这么喜欢卖菊花吗？」',
        '「唔……你的直肠很舒服」',
        '「这肛门夹得真紧」',
        '「屁股的形状也很漂亮呢」',
        '「你的后面，敏感度如何？」',
        '「屁股，都露外面了哦」',
        '「这不已经习惯用后面了嘛」',
        '「多少人用过这里了？」',
        '「真是个好尻穴……」',
      ],
      2: [
        '「菊花被干也有感觉的变态！」',
        '「这菊花能干几次呢？再来一次吧！」',
        '「完完全全的吸住了呢……」',
        '「这个人，肛门完全被调教过了……」',
        '「菊花一开一合在引诱着我……」',
        '「这个变态肛穴奴隶！」',
        '「用肛门挣钱，感觉舒服吗？」',
        '「肛门越来越紧了，真是天生的尻穴狂呢！」',
      ],
      3: [
        '「这样的屁股，真棒」',
        '「哎？是用后面……？」',
        '「肛门好舒服啊」',
        '「没钱了，只能干后面么」',
        '「好厉害……完全被尻穴吸住了……」',
        '「尻穴……要出来了！」',
        '「这么紧凑的，也只有菊花能做到了吧。」',
        '「原来肛门里面……这样地舒服啊……」',
      ],
      4: [
        '「我知道……想要钱是吧？」',
        '「我拿着钱哦！你想要的话……」',
        '「还没满足吧，这淫乱的娼妓！」',
        '「有钱怎么干都行么？」',
        '「屁股也要舔，一直舔到肛门」',
        '「腰动起来！多扭几下。」',
        '「跪下来说你想要钱！」',
        '「说：请给我这母猪赏点钱」',
        '「为了钱，什么话都能说出来的婊子」',
        '「阴垢也漂亮地清洁了呢」',
        '「跪下来说请给我阴茎」',
        '「跪下来像狗一样地摇屁股」',
        '「在这里像狗一样地尿尿」',
        '「鸡鸡和钱，愿意为了哪个被赏耳光？」',
        '「说自己是最喜欢鸡鸡的淫乱性奴隶！」',
        '「在这里用后庭自慰！」',
        '「说自己是为了钱而卖菊的贱婊子」',
        '「跪下来说我想要鸡鸡」',
        '「再笑给我看看，要更下流的更H的」',
      ],
      5: null,
    };
    if (kyaku === 5) {
      // :1037-1133 妖精商人：先判娼妇のドレス，再按性格分档
      const t = (i) => era.get(`talent:${arg}:${i}`) || 0;
      if (
        (era.get(`cflag:${arg}:40`) || 0) & 28 &&
        (era.get(`cflag:${arg}:41`) || 0) === 203
      ) {
        era.print('「这么H的衣服~」'); // :1042
      }
      const lines = t(160)
        ? [
            '「喜欢用肛门表达爱意？」',
            '「把整个肛塞都吞入了」',
            '「什么都可以放进肛门去是吧？」',
            '「用这种地方表达爱意吗？」',
          ]
        : t(161)
          ? [
              '「肛塞对你来说太弱了吧。」',
              '「看！又放进一个了哦！」',
              '「越是看起来强悍的人，肛门越弱。原来是真的啊！」',
              '「像要把手指吸进去一样！」',
            ]
          : t(162)
            ? [
                '「肛门里放入振动宝石……再用力拔出来」',
                '「嘴巴上说着不要，菊花却自己把它吸进去了」',
                '「肛门也一样舒服呢」',
                '「把屁股再抬高一点……全部都看见了哦！」',
              ]
            : t(163)
              ? [
                  '「哪怕摆出一幅高贵的姿态，菊花也是一样的脏啊」',
                  '「被爆菊感到羞耻了么……记住这份屈辱吧！」',
                  '「肛门张开了～」',
                  '「连振动杖都能塞入了……真是了不起的菊穴啊」',
                ]
              : t(164)
                ? [
                    '「即使是肛交也感不到羞耻么」',
                    '「菊穴真的这么好么……？你看」',
                    '「看来肛门很喜欢振动宝石嘛」',
                    '「哈哈，肛门变得黏黏糊糊的了」',
                  ]
                : t(166)
                  ? [
                      '「性格那么差的女人菊花也是一样的脏呢」',
                      '「勇者大人，菊花被干得舒服吗？」',
                      '「屁股翘起来，把后庭扒开！」',
                      '「即使性格那么差，身体还是很诚实的嘛」',
                    ]
                  : [
                      '「这个卖菊娼妓！」',
                      '「堕落为卖菊的娼妓了么？」',
                      '「在干嘛啊，快点把屁股露出来。」',
                      '「后庭在一开一合地喘息着……！」',
                    ];
      await era.print(lines[rand_n(lines.length)]); // :1045 PRINTDATAL
    } else {
      await era.print(picks[kyaku][rand_n(picks[kyaku].length)]); // :972 PRINTDATAL
    }
  } else {
    // :1139-1172 街中客
    const locals = fs_bitch('TOWN_MAN', kyaku); // 客名
    era.print(`客：${locals}`); // :1102
    const picks = {
      1: ['「菊花挺柔软的嘛」', '「前面那不行吗？」'],
      2: ['「可以灌肠么？」', '「唔……在里面射了」'],
      3: ['「菊花就让我受不了了……」', '「原来用屁股也可以做啊……」'],
      4: [
        '「连菊花也卖……」',
        '「菊花啊……」',
        '「真是个贱货……」',
        '「不会觉得不幸吗？」',
      ],
      5: null,
    };
    if (kyaku === 5) {
      const t = (i) => era.get(`talent:${arg}:${i}`) || 0;
      const lines = t(160)
        ? ['「我就来施舍一下你吧！」']
        : t(161)
          ? ['「这样的家伙，菊花反而是弱点啊！」']
          : t(162)
            ? ['「再把屁股抬高点啊！」']
            : t(163)
              ? ['「就算这么高傲，果然还是用菊花来做的嘛……」']
              : t(164)
                ? ['「那种眼神……是菊花很弱的眼神啊」']
                : t(166)
                  ? ['「随便你怎么哭喊也可以哦！」']
                  : ['「哈哈，多多关照！」'];
      await era.print(lines[rand_n(lines.length)]); // :1141 PRINTDATAL
    } else {
      await era.print(picks[kyaku][rand_n(picks[kyaku].length)]); // :1141 PRINTDATAL
    }
  }
  // :1171-1174 固定地の文（源繁体已归一）
  await era.printAndWait(
    `无法忍耐的客人从背将${name_of(arg)}抱住像狗一样耸动着，肛门在阳具的剧烈抽送中流出了白色的浆汁…`,
  ); // :1171
  await era.printAndWait(
    `四肢着地趴着的${name_of(arg)}的臀瓣每次与客人的腰肢发生撞击，都会提高的发出愉悦的呻吟声…`,
  ); // :1172
  await era.printAndWait(
    `呼吸逐渐变得粗重而凌乱，客人将${name_of(arg)}的臀部像揉面一般地揉抚着，疯狂忘我地耸动着腰部…`,
  ); // :1173
  await era.printAndWait(
    `随后客人躺在地上，让${name_of(arg)}坐上来自己动，${name_of(arg)}跨坐在客人的腰上扭动着自己的身体感受着火热阳具的刺激，乳首也被肆意揉搓着…`,
  ); // :1174
}

/**
 * @LOG_BITCH_SEX（:1176-1449）：性交卖春描写。
 *
 * 按 ABL:2（性交经验）分档前缀（7-8/9-10 档内 RAND:2 分支）→ 「进行着
 * 性交卖春」→ 场所/客种类分档（客名 + PRINTDATAL 随机一条客人台词）→
 * 三行固定地の文。
 *
 * @param {number} arg 角色 ID
 * @param {string} place "DUNGEON" | "TOWN"
 * @param {number} kyaku 客种类（1-5）
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {Promise<void>}
 */
async function log_bitch_sex(arg, place, kyaku, rand = default_rand) {
  const rand_n = rand;
  era.print(`${name_of(arg)}`); // :1182 %SAVESTR:ARG%
  // :1181-1196 性交经验分档
  switch (era.get(`abl:${arg}:2`) || 0) {
    case 0:
      era.print('拼命忍耐着痛苦'); // :1185
      break;
    case 1:
      era.print('用经验不多的阴道'); // :1187 // :1187
      break;
    case 2:
      era.print('沉浸在快乐之中'); // :1189
      break;
    case 3:
    case 4:
      era.print('用已经完完全全的开发了小穴'); // :1191
      break;
    case 5:
    case 6:
      era.print('用饱经疼爱经验丰富的小穴'); // :1193
      break;
    case 7:
    case 8:
      // :1187-1190 IF RAND:2 == 1 && ABL:14 >= 3
      if (rand_n(2) === 1 && (era.get(`abl:${arg}:14`) || 0) >= 3) {
        era.print('上下摆动着那迷人的腰'); // :1196
      } else {
        era.print('不知道是第几次高潮了'); // :1198
      }
      break;
    case 9:
    case 10:
      // :1192-1195 IF RAND:2 == 1 && ABL:14 >= 5
      if (rand_n(2) === 1 && (era.get(`abl:${arg}:14`) || 0) >= 5) {
        era.print('用像要扭断一样的气势挥动着腰'); // :1202
      } else {
        era.print('比起客人那边更疯狂的高潮着'); // :1204
      }
      break;
    default:
      break;
  }
  await era.printAndWait('进行着性交卖春'); // :1207

  if (place === 'DUNGEON') {
    // :1201-1408 地下城客
    const locals = fs_bitch('DUNGEON_MAN', kyaku); // 客名
    era.print(`客：${locals}`); // :1212
    const picks = {
      1: [
        '「居然能抱着魔王大人的奴隶……」',
        '「哦！哦！好舒服的小穴！」',
        '「就这么喜欢精液吗？」',
        '「无论是谁你都能这样打开双腿吧。」',
        '「用手把小穴扒开」',
        '「做Ｖ字手！Ｖ字手！」',
        '「觉得鸡鸡舒服吗？」',
        '「啊！鸡鸡要融化了！」',
        '「真是下贱的母猪！」',
        '「抬起屁股，好好地发情吧」',
        '「真是下流的模样呢，嘿嘿」',
        '「平时也是这样分开双腿侍奉魔王军吧？」',
        '「习惯吮吸小鸡鸡了吗？」',
        '「你和精液很相称呢！」',
        '「射得你头发上都是！」',
      ],
      2: [
        '「穿成这样在这里四处转悠……真是变态啊」',
        '「你很适合精液的气味嘛～」',
        '「这是邀请我进去吗？把腰扭起来啊」',
        '「正好欲求不满的说」',
        '「这也是你的工作？」',
        '「豆豆涨起来了，还开始流出爱液……嘿嘿……」',
        '「勇者也这么堕落，这么淫乱」',
        '「手扶着墙，屁股转过来对着我」',
        '「一定要狠狠地欺负一下你才行……」',
        '「母乳吸不出来么？」',
        '「完全顺从了嘛」',
        '「一开始先来含一下吧？」',
        '「把腿分开，打开那里让我看看」',
        '「即使不当勇者了，也变得这么可爱了嘛」',
        '「已经离不开我了么」',
      ],
      3: [
        '「姐……姐姐……我带钱来了」',
        '「我……还是处男……」',
        '「大姐姐，真好色啊」',
        '「这就是……女人……」',
        '「这就是姐姐的工作吗？」',
        '「哇……厉害」',
        '「唔……我想要尿尿了！！」',
        '「大姐姐，摸起来软软的……」',
        '「噗呲噗呲的」',
        '「我能揉你的胸吗？」',
        '「用力吸乳头的话，会有奶出来吗？」',
        '「好厉害……呜哇～」',
        '「大姐姐，再教我更多……」',
        '「呵呵，姐姐你真可爱」',
        '「小鸡鸡，快爆炸了！！」',
      ],
      4: [
        '「我知道……想要钱是吧？」',
        '「我拿着钱哦！你想要的话……知道要怎么做吧」',
        '「还没满足吧，你这淫乱的娼妓！」',
        '「只要有钱就怎么干都行吧？」',
        '「屁股也要舔，一直舔到肛门」',
        '「让腰动起来！多扭几下。」',
        '「跪下来说你想要钱！」',
        '「说：请给我这母猪赏点钱」',
        '「为了钱，真是什么话都能说出来的婊子呢。」',
        '「阴垢也漂亮地清洁了呢」',
        '「跪下来说请给我阴茎」',
        '「跪下来像狗一样地摇屁股」',
        '「在这里像狗一样地尿尿」',
        '「鸡鸡和钱，愿意为了哪个被赏耳光？」',
        '「说自己是最喜欢鸡鸡的淫乱奴隶！」',
        '「就在这里自慰」',
        '「说自己是为了钱而卖淫的贱婊子」',
        '「跪下来说我想要鸡鸡」',
        '「再笑给我看看，更H的，更下流的」',
      ],
      5: null,
    };
    if (kyaku === 5) {
      // :1303-1396 妖精商人：先判娼妇のドレス，再按性格分档
      const t = (i) => era.get(`talent:${arg}:${i}`) || 0;
      if (
        (era.get(`cflag:${arg}:40`) || 0) & 28 &&
        (era.get(`cflag:${arg}:41`) || 0) === 203
      ) {
        era.print('「这么H的衣服~」'); // :1312
      }
      const lines = t(160)
        ? [
            '「快来爱我啊~」',
            '「爱意满满地来侍奉吧」',
            '「让我好好地来侍奉大人您的阴茎吧！」',
            '「这样下贱的我……也能得到爱吗？」',
          ]
        : t(161)
          ? [
              '「勇者大人，变得这么温顺」',
              '「对自己的性技有自信吗？」',
              '「对这种事很擅长吧！」',
              '「淫乱地更彻底吧。」',
            ]
          : t(162)
            ? [
                '「过来，好好吸它！」',
                '「把腿打开！快点」',
                '「在做什么呢！给我吞进去！」',
                '「笨手笨脚的……把屁股抬起来就行啦！」',
              ]
            : t(163)
              ? [
                  '「习惯肉棒的味道了吗？」',
                  '「好好地侍奉吧！」',
                  '「这么温柔的手法……鸡鸡快爆炸了」',
                  '「居然还有这么淫乱的大小姐。」',
                ]
              : t(164)
                ? [
                    '「不错呢，这冰冷的眼神！」',
                    '「这也是工作吧？」',
                    '「这么冰冷的表情可赚不到钱哦！」',
                    '「完全不会笑的么？YEAH～YEAH！这样」',
                  ]
                : t(166)
                  ? [
                      '「终于在肉棒前变得温顺了吗？」',
                      '「那个性格恶劣的勇者大人已经成为肉棒的俘虏了？」',
                      '「不要说话了，快点把屁股打开啊！」',
                      '「什么嘛这眼神……可恶……」',
                    ]
                  : [
                      '「这个卖肉女！」',
                      '「堕落为出卖春女了么？」',
                      '「在干嘛啊，快把屁股露出来。」',
                      '「给我‘啊啊’地叫出来啊……！」',
                    ];
      await era.print(lines[rand_n(lines.length)]); // :1315 PRINTDATAL
    } else {
      await era.print(picks[kyaku][rand_n(picks[kyaku].length)]); // :1219 PRINTDATAL
    }
  } else {
    // :1411-1447 街中客
    const locals = fs_bitch('TOWN_MAN', kyaku); // 客名
    era.print(`客：${locals}`); // :1372
    const picks = {
      1: ['「这是名器啊！」', '「勇者大人也是会卖身的啊……」'],
      2: ['「居然是勇者大人啊……」', '「哦，你……很懂嘛」'],
      3: ['「我这还是第一次……」', '「我，是处男啊……」'],
      4: [
        '「卖淫女的穴也是可以用的啦」',
        '「钱的话随便给」',
        '「好好谢谢我」',
        '「好好把钱拿着啊」',
      ],
      5: null,
    };
    if (kyaku === 5) {
      const t = (i) => era.get(`talent:${arg}:${i}`) || 0;
      const lines = t(160)
        ? ['「真漂亮啊……」']
        : t(161)
          ? ['「屁股抬高点啊！」']
          : t(162)
            ? ['「喘息像在悲鸣似的」']
            : t(163)
              ? ['「好好接受下贱的种子吧！」']
              : t(164)
                ? ['「再缠得紧密点啊……」']
                : t(166)
                  ? ['「真是难以抗拒你的诱惑啊～」']
                  : ['「挣了多少钱啊？　嗯？」'];
      await era.print(lines[rand_n(lines.length)]); // :1411 PRINTDATAL
    } else {
      await era.print(picks[kyaku][rand_n(picks[kyaku].length)]); // :1416 PRINTDATAL
    }
  }
  // :1447-1449 固定地の文（源繁体已归一）
  await era.printAndWait(
    `${name_of(arg)}仰卧着用双腿用力的夹住趴在自己身上的客人的腰发出呻吟…`,
  ); // :1441
  await era.printAndWait(
    `随即被翻过身来，一边被玩弄肛门一边主动用屁股套弄着巨大的阴茎…`,
  ); // :1442
  await era.printAndWait(
    `随后${name_of(arg)}被客人抱了起来，双腿被架在肩上，像洋娃娃一样被猛烈插入，乳房像面团一样被跳动着变成各种淫靡的形状…`,
  ); // :1443
}

/**
 * @LOG_BITCH_ANIMAL（:1451-1483）：兽交卖春描写。
 *
 * 特殊处理（源注释）：DUNGEON 里无金钱授受、自主进行；TOWN 里 ARG:1 无
 * 意义（公衆プレイ）。TOWN 分支有固定三行地の文；DUNGEON 分支为空。
 * 函数签名 (ARG, PLACE, ARG:1) 的第三参在本函数未使用（:1451 声明，
 * 实际只按 PLACE 分）。
 *
 * @param {number} arg 角色 ID
 * @param {string} place "DUNGEON" | "TOWN"
 * @returns {Promise<void>}
 */
async function log_bitch_animal(arg, place) {
  if (place === 'TOWN') {
    era.print(`${name_of(arg)}`); // :1459 %SAVESTR:ARG%
    await era.printAndWait('在大家的眼前不知羞耻的进行着兽交表演...'); // :1464
    await era.printAndWait(
      `${name_of(arg)}进入了兽栏，在众人炽热的注目下像母狗一样趴在地上，扭动着身躯引诱着发情的猎犬。在野兽舌头的舔舐润滑后，令人兴奋的喘息和呜咽伴随着野兽的咆哮和肉体的撞击声缭绕在兽栏内，${name_of(arg)}比真正的雌兽还要卖力的摇晃着屁股，逢迎着非人的巨大阳具的刺激。`,
    ); // :1465
    await era.printAndWait(
      `随后一条猎犬躺在地上，${name_of(arg)}主动跨坐在野兽的阴茎上扭动着自己的身体，乳首也被旁边的野兽轻轻撕咬拉扯着。肛门的粗暴插入使${name_of(arg)}趴在身下的野兽毛皮上陷入了恍惚，口水不由自主的流淌出来，其后插入口腔的兽茎令${name_of(arg)}窒息，无与伦比的快感让${name_of(arg)}成为了一具供野兽发泄性欲的肉娃娃。`,
    ); // :1466
    await era.printAndWait(
      `围观的观众们一边看着这场兽奸秀一边兴奋的手淫，时不时有人冲上前去向${name_of(arg)}的身上抛洒精液，而${name_of(arg)}也媚眼朦胧的感受着精液的温暖。`,
    ); // :1467
  }
}

/**
 * @LOG_BITCH_SELF（:1485-1519）：自慰日志（口上向き，源注释「一応は置いて
 * おくが口上向きな気もする；呼び出し側で分岐描写が入っているため優先度は
 * 低めでいい」）。本函数体为空：DUNGEON/TOWN × PLAY(1-5) 的 CASE 全是
 * 注释（无输出）——原作即空壳，1:1 保留。
 *
 * @param {number} arg 角色 ID
 * @param {string} place "DUNGEON" | "TOWN"
 * @param {number} play 妄想对象档位（1-5）
 * @returns {Promise<void>}
 */
async function log_bitch_self(arg, place, play) {
  // :1488-1517 全部 CASE 为空（源注释仅标注妄想对象档位，无输出）
  // 保留空函数体（1:1；呼出侧的分歧描写在 self_bitch 已实现）
  void arg;
  void place;
  void play;
}

/**
 * @DUNGEON_SEX_LOG（:1532-1782）：卖春性交客台词（原作死代码）。
 *
 * **死代码判定（登记 #14）**：唯一调用方 @DUNGEON_SEX（DUNGEON_BITCH.ERB
 * :1457）在 [SKIPSTART]（:1199）～[SKIPEND]（:3132）旧構文块内（#184 判定
 * 不装载），全库无活调用点。函数定义本身会被 Emuera 装载（不在 SKIP 块内），
 * 1:1 移植保留，但不接线。ARG:0 = 客种类（0 兽人 / 1 魔族男人 / 2 魔族少年
 * / 3 魔族暴发户 / ELSE 狗头人商人）。
 *
 * @param {number} arg0 客种类
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {Promise<number>} 0
 */

/**
 * @DUNGEON_SEX_LOG（:1532-1782）：卖春性交客台词（原作死代码）。
 *
 * **死代码判定（登记 #14）**：唯一调用方 @DUNGEON_SEX（DUNGEON_BITCH.ERB
 * :1457）在 [SKIPSTART]（:1199）～[SKIPEND]（:3132）旧構文块内（#184 判定
 * 不装载），全库无活调用点。函数定义本身会被 Emuera 装载（不在 SKIP 块内），
 * 1:1 移植保留，但不接线。ARG:0 = 客种类（0 兽人 / 1 魔族男人 / 2 魔族少年
 * / 3 魔族暴发户 / ELSE 狗头人商人）。
 *
 * @param {number} arg0 客种类
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {Promise<number>} 0
 */
async function dungeon_sex_log(arg0, rand = default_rand) {
  const rand_n = rand;
  if (arg0 === 0) {
    // :1543-1576 兽人
    if (
      ((era.get('cflag:0:40') || 0) & 28) !== 0 &&
      (era.get('cflag:0:41') || 0) === 203
    ) {
      era.print('「穿着这么下流的衣服来诱惑人……」'); // :1546
    }
    if (rand_n(15) === 0) {
      era.print('「居然能抱着魔王大人的奴隶……」'); // :1548
    } else if (rand_n(14) === 0) {
      era.print('「哦！哦！舒服的穴！」'); // :1550
    } else if (rand_n(13) === 0) {
      era.print('「就这么喜欢精液吗？」'); // :1552
    } else if (rand_n(12) === 0) {
      era.print('「随便就分开双腿的婊子！」'); // :1554
    } else if (rand_n(11) === 0) {
      era.print('「用手把尻扒开」'); // :1556
    } else if (rand_n(10) === 0) {
      era.print('「做Ｖ字手！Ｖ字手！」'); // :1558
    } else if (rand_n(9) === 0) {
      era.print('「觉得鸡鸡舒服吗？」'); // :1560
    } else if (rand_n(8) === 0) {
      era.print('「啊！鸡鸡要融化了！」'); // :1562
    } else if (rand_n(7) === 0) {
      era.print('「真是最贱的母猪！」'); // :1564
    } else if (rand_n(6) === 0) {
      era.print('「抬起屁股，好好地发情吧」'); // :1566
    } else if (rand_n(5) === 0) {
      era.print('「真是下流的模样呢，嘿嘿」'); // :1568
    } else if (rand_n(4) === 0) {
      era.print('「分开双腿侍奉魔王军了吗？」'); // :1570
    } else if (rand_n(3) === 0) {
      era.print('「习惯吸啜小鸡鸡了吗？」'); // :1572
    } else if (rand_n(2) === 0) {
      era.print('「你和精液很相称呢！」'); // :1574
    } else {
      era.print('「射到你头发上都是！」'); // :1576
    }
  } else if (arg0 === 1) {
    // :1579-1612 魔族男人
    if (
      ((era.get('cflag:0:40') || 0) & 28) !== 0 &&
      (era.get('cflag:0:41') || 0) === 203
    ) {
      era.print('「这一身……完全带动色情的气氛了啊！」'); // :1582
    }
    if (rand_n(15) === 0) {
      era.print('「穿成这样四处转悠……真是变态啊」'); // :1584
    } else if (rand_n(14) === 0) {
      era.print('「你很适合精液的气味嘛～」'); // :1586
    } else if (rand_n(13) === 0) {
      era.print('「这是邀请吗？把腰扭起来啊」'); // :1588
    } else if (rand_n(12) === 0) {
      era.print('「正好欲求不满的说」'); // :1590
    } else if (rand_n(11) === 0) {
      era.print('「这也是你的工作？」'); // :1592
    } else if (rand_n(10) === 0) {
      era.print('「阴蒂涨起来了，还开始流出爱液……嘿嘿……」'); // :1594
    } else if (rand_n(9) === 0) {
      era.print('「勇者也这么堕落，这么淫乱」'); // :1596
    } else if (rand_n(8) === 0) {
      era.print('「手扶着墙，屁股转过来」'); // :1598
    } else if (rand_n(7) === 0) {
      era.print('「一定要狠狠地欺负一下你才行……」'); // :1600
    } else if (rand_n(6) === 0) {
      era.print('「母乳不出来么？」'); // :1602
    } else if (rand_n(5) === 0) {
      era.print('「完全顺从了嘛」'); // :1604
    } else if (rand_n(4) === 0) {
      era.print('「一开始先来含一下吧？」'); // :1606
    } else if (rand_n(3) === 0) {
      era.print('「腿分开，打开那里让我看看」'); // :1608
    } else if (rand_n(2) === 0) {
      era.print('「不当勇者了，也变得可爱了嘛」'); // :1610
    } else {
      era.print('「已经是我们的同伴了嘛」'); // :1612
    }
  } else if (arg0 === 2) {
    // :1615-1648 魔族少年
    if (
      ((era.get('cflag:0:40') || 0) & 28) !== 0 &&
      (era.get('cflag:0:41') || 0) === 203
    ) {
      era.print('「大姐姐的衣服，好色……」'); // :1618
    }
    if (rand_n(15) === 0) {
      era.print('「姐……姐姐……我带钱来了」'); // :1620
    } else if (rand_n(14) === 0) {
      era.print('「我……还是处男……」'); // :1622
    } else if (rand_n(13) === 0) {
      era.print('「大姐姐，真好色啊」'); // :1624
    } else if (rand_n(12) === 0) {
      era.print('「这就是……女人……」'); // :1626
    } else if (rand_n(11) === 0) {
      era.print('「这就是姐姐的工作吗？」'); // :1628
    } else if (rand_n(10) === 0) {
      era.print('「哇……厉害」'); // :1630
    } else if (rand_n(9) === 0) {
      era.print('「唔……要出来了！！」'); // :1632
    } else if (rand_n(8) === 0) {
      era.print('「大姐姐，软软的……」'); // :1634
    } else if (rand_n(7) === 0) {
      era.print('「噗呲噗呲的」'); // :1636
    } else if (rand_n(6) === 0) {
      era.print('「能揉你的胸吗？」'); // :1638
    } else if (rand_n(5) === 0) {
      era.print('「用力吸乳头的话，会有奶吗？」'); // :1640
    } else if (rand_n(4) === 0) {
      era.print('「好厉害……呜哇～」'); // :1642
    } else if (rand_n(3) === 0) {
      era.print('「大姐姐，再教我更多……」'); // :1644
    } else if (rand_n(2) === 0) {
      era.print('「呵呵，姐姐你真可爱」'); // :1646
    } else {
      era.print('「小鸡鸡，快爆炸了！！」'); // :1648
    }
  } else if (arg0 === 3) {
    // :1651-1694 魔族暴发户（两组 RAND 链）
    if (
      ((era.get('cflag:0:40') || 0) & 28) !== 0 &&
      (era.get('cflag:0:41') || 0) === 203
    ) {
      era.print('「真是婊子的打扮啊。」'); // :1654
    }
    if (rand_n(4) === 0) {
      era.print('「我知道……想要钱是吧？」'); // :1656
    } else if (rand_n(3) === 0) {
      era.print('「我拿着钱哦！你想要的话……」'); // :1658
    } else if (rand_n(2) === 0) {
      era.print('「还没满足吧，这淫乱的娼妓！」'); // :1660
    } else {
      era.print('「有钱就怎么都行？」'); // :1662
    }
    if (rand_n(15) === 0) {
      era.print('「屁股也要舔，一直舔到肛门」'); // :1666
    } else if (rand_n(14) === 0) {
      era.print('「腰动起来！多扭几下。」'); // :1668
    } else if (rand_n(13) === 0) {
      era.print('「跪下来说你想要钱！」'); // :1670
    } else if (rand_n(12) === 0) {
      era.print('「说：请给我这母猪赏点钱」'); // :1672
    } else if (rand_n(11) === 0) {
      era.print('「为了钱，什么话都能说出来的婊子」'); // :1674
    } else if (rand_n(10) === 0) {
      era.print('「阴垢也漂亮地清洁了呢」'); // :1676
    } else if (rand_n(9) === 0) {
      era.print('「跪下来说请给我阴茎」'); // :1678
    } else if (rand_n(8) === 0) {
      era.print('「跪下来像狗一样地摇屁股」'); // :1680
    } else if (rand_n(7) === 0) {
      era.print('「在这里像狗一样地尿尿」'); // :1682
    } else if (rand_n(6) === 0) {
      era.print('「鸡鸡和钱，愿意为了哪个被赏耳光？」'); // :1684
    } else if (rand_n(5) === 0) {
      era.print('「说自己是最喜欢鸡鸡的淫乱奴隶！」'); // :1686
    } else if (rand_n(4) === 0) {
      era.print('「就在这里自慰」'); // :1688
    } else if (rand_n(3) === 0) {
      era.print('「说自己是为了钱而卖淫的贱婊子」'); // :1690
    } else if (rand_n(2) === 0) {
      era.print('「跪下来说我想要鸡鸡」'); // :1692
    } else {
      era.print('「再来点媚笑看看，要更淫邪的」'); // :1694
    }
  } else {
    // :1697-1780 狗头人商人（按 TALENT 性格分档）
    if (
      ((era.get('cflag:0:40') || 0) & 28) !== 0 &&
      (era.get('cflag:0:41') || 0) === 203
    ) {
      era.print('「黄暴的衣服！」'); // :1701
    }
    const t = (i) => era.get(`talent:${i}`) || 0;
    if (t(160)) {
      if (rand_n(4) === 0) {
        era.print('「也来爱我啊～」'); // :1705
      } else if (rand_n(3) === 0) {
        era.print('「爱意满满地来侍奉吧」'); // :1707
      } else if (rand_n(2) === 0) {
        era.print('「好好地来侍奉阴茎吧！」'); // :1709
      } else {
        era.print('「这样的我……也能得到爱吗？」'); // :1711
      }
    } else if (t(161)) {
      if (rand_n(4) === 0) {
        era.print('「勇者大人，变得这么温顺」'); // :1716
      } else if (rand_n(3) === 0) {
        era.print('「对自己的性技有自信吗？」'); // :1718
      } else if (rand_n(2) === 0) {
        era.print('「对这种事很擅长吧！」'); // :1720
      } else {
        era.print('「淫乱地如此彻底。」'); // :1722
      }
    } else if (t(162)) {
      if (rand_n(4) === 0) {
        era.print('「来，吸！」'); // :1727
      } else if (rand_n(3) === 0) {
        era.print('「来，腿分开！」'); // :1729
      } else if (rand_n(2) === 0) {
        era.print('「在干嘛，继续舔啊！」'); // :1731
      } else {
        era.print('「笨手笨脚的……把屁股抬起来就行啦！」'); // :1733
      }
    } else if (t(163)) {
      if (rand_n(4) === 0) {
        era.print('「习惯肉棒的味道了吗？」'); // :1738
      } else if (rand_n(3) === 0) {
        era.print('「好好地侍奉吧！」'); // :1740
      } else if (rand_n(2) === 0) {
        era.print('「温柔的手法……鸡鸡快爆炸了」'); // :1742
      } else {
        era.print('「居然还有这么淫乱的大小姐。」'); // :1744
      }
    } else if (t(164)) {
      if (rand_n(4) === 0) {
        era.print('「好啊！这冰冷的眼神！」'); // :1749
      } else if (rand_n(3) === 0) {
        era.print('「这也是工作吧？」'); // :1751
      } else if (rand_n(2) === 0) {
        era.print('「喂，摆出一张更舒服的脸吧！」'); // :1753
      } else {
        era.print('「你不懂笑的吗？YEAH～YEAH！这样」'); // :1755
      }
    } else if (t(166)) {
      if (rand_n(4) === 0) {
        era.print('「终于在肉棒前变得温顺了吗？」'); // :1760
      } else if (rand_n(3) === 0) {
        era.print('「那个性格恶劣的勇者大人已经成为肉棒的俘虏了？」'); // :1762
      } else if (rand_n(2) === 0) {
        era.print('「无需多言！腿打开！」'); // :1764
      } else {
        era.print('「什么嘛这眼神……可恶……」'); // :1766
      }
    } else {
      if (rand_n(4) === 0) {
        era.print('「这卖春女啊！」'); // :1770
      } else if (rand_n(3) === 0) {
        era.print('「堕落为妓女了吗」'); // :1772
      } else if (rand_n(2) === 0) {
        era.print('「在干嘛？赶紧把腿分开啊！」'); // :1774
      } else {
        era.print('「呃呃地喘息……！」'); // :1776
      }
    }
  }
  return 0; // :1781 RETURN 0
}

/**
 * @DUNGEON_ANAL_LOG（:1784-1999）：卖春肛交客台词（原作死代码）。
 *
 * **死代码判定（登记 #14）**：唯一调用方 @DUNGEON_ANAL（DUNGEON_BITCH.ERB
 * :1635）在 [SKIPSTART] 块内，全库无活调用点。1:1 移植保留，不接线。
 *
 * @param {number} arg0 客种类（0 兽人 / 1 魔族男人 / 2 魔族少年 / 3 魔族暴发户 / ELSE 狗头人商人）
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {Promise<number>} 0
 */
async function dungeon_anal_log(arg0, rand = default_rand) {
  const rand_n = rand;
  if (arg0 === 0) {
    // :1795-1825 兽人
    if (rand_n(15) === 0) {
      era.print('「菊穴啊……凑合用吧」'); // :1797
    } else if (rand_n(14) === 0) {
      era.print('「这完全是性器了嘛」'); // :1799
    } else if (rand_n(13) === 0) {
      era.print('「又湿又软」'); // :1801
    } else if (rand_n(12) === 0) {
      era.print('「你是卖肛门的？」'); // :1803
    } else if (rand_n(11) === 0) {
      era.print('「好啊，屁股翘起来」'); // :1805
    } else if (rand_n(10) === 0) {
      era.print('「这么淫乱的尻穴」'); // :1807
    } else if (rand_n(9) === 0) {
      era.print('「就这么喜欢卖菊花吗？」'); // :1809
    } else if (rand_n(8) === 0) {
      era.print('「唔……你的直肠很舒服」'); // :1811
    } else if (rand_n(7) === 0) {
      era.print('「这肛门夹得真紧」'); // :1813
    } else if (rand_n(6) === 0) {
      era.print('「漂亮的后庭」'); // :1815
    } else if (rand_n(5) === 0) {
      era.print('「你的后面，敏感度如何？」'); // :1817
    } else if (rand_n(4) === 0) {
      era.print('「屁股，都露外面了哦」'); // :1819
    } else if (rand_n(3) === 0) {
      era.print('「这不已经习惯用后面了嘛」'); // :1821
    } else if (rand_n(2) === 0) {
      era.print('「多少人用过这里了？」'); // :1823
    } else {
      era.print('「真是个好尻穴……」'); // :1825
    }
  } else if (arg0 === 1) {
    // :1828-1844 魔族男人
    if (rand_n(8) === 0) {
      era.print('「尻穴有感觉的变态！」'); // :1830
    } else if (rand_n(7) === 0) {
      era.print('「这尻穴能用几次？再来一次吧！」'); // :1832
    } else if (rand_n(6) === 0) {
      era.print('「收缩得真厉害啊……」'); // :1834
    } else if (rand_n(5) === 0) {
      era.print('「这个人，肛门被调教过了……」'); // :1836
    } else if (rand_n(4) === 0) {
      era.print('「菊花一开一合在引诱着我……」'); // :1838
    } else if (rand_n(3) === 0) {
      era.print('「这个变态尻穴奴隶！」'); // :1840
    } else if (rand_n(2) === 0) {
      era.print('「用尻穴挣钱，感觉舒服吗？」'); // :1842
    } else {
      era.print('「肛门的感觉真好，你真有天赋！」'); // :1844
    }
  } else if (arg0 === 2) {
    // :1847-1870 魔族少年（TALENT:122 性别分档）
    if (rand_n(8) === 0) {
      if (era.get('talent:122') || 0) {
        era.print('「哥哥的屁股，真棒」'); // :1850
      } else {
        era.print('「姐姐的屁股，真棒」'); // :1852
      }
    } else if (rand_n(7) === 0) {
      era.print('「哎？是用后面……？」'); // :1855
    } else if (rand_n(6) === 0) {
      era.print('「肛门好舒服啊」'); // :1857
    } else if (rand_n(5) === 0) {
      era.print('「没钱了，屁股……」'); // :1859
    } else if (rand_n(4) === 0) {
      era.print('「好厉害……完全被尻穴吸住了……」'); // :1861
    } else if (rand_n(3) === 0) {
      era.print('「尻穴……要出来了！」'); // :1863
    } else if (rand_n(2) === 0) {
      era.print('「这么紧凑的，也只有菊花能做到了吧。」'); // :1865
    } else {
      if (era.get('talent:122') || 0) {
        era.print('「大哥哥的肛门，非常地舒服啊……」'); // :1868
      } else {
        era.print('「大姐姐的肛门，非常地舒服啊……」'); // :1870
      }
    }
  } else if (arg0 === 3) {
    // :1873-1914 魔族暴发户（两组 RAND 链）
    if (rand_n(4) === 0) {
      era.print('「我知道……想要钱是吧？」'); // :1876
    } else if (rand_n(3) === 0) {
      era.print('「我拿着钱哦！你想要的话……」'); // :1878
    } else if (rand_n(2) === 0) {
      era.print('「还没满足吧，这淫乱的娼妓！」'); // :1880
    } else {
      era.print('「有钱就怎么都行？」'); // :1882
    }
    if (rand_n(15) === 0) {
      era.print('「屁股也要舔，一直舔到肛门」'); // :1886
    } else if (rand_n(14) === 0) {
      era.print('「腰动起来！多扭几下。」'); // :1888
    } else if (rand_n(13) === 0) {
      era.print('「跪下来说你想要钱！」'); // :1890
    } else if (rand_n(12) === 0) {
      era.print('「说：请给我这母猪赏点钱」'); // :1892
    } else if (rand_n(11) === 0) {
      era.print('「为了钱，什么话都能说出来的婊子」'); // :1894
    } else if (rand_n(10) === 0) {
      era.print('「阴垢也漂亮地清洁了呢」'); // :1896
    } else if (rand_n(9) === 0) {
      era.print('「跪下来说请给我阴茎」'); // :1898
    } else if (rand_n(8) === 0) {
      era.print('「跪下来像狗一样地摇屁股」'); // :1900
    } else if (rand_n(7) === 0) {
      era.print('「在这里像狗一样地尿尿」'); // :1902
    } else if (rand_n(6) === 0) {
      era.print('「鸡鸡和钱，愿意为了哪个被赏耳光？」'); // :1904
    } else if (rand_n(5) === 0) {
      era.print('「说自己是最喜欢鸡鸡的淫乱尻穴奴隶！」'); // :1906
    } else if (rand_n(4) === 0) {
      era.print('「在这里用后庭自慰！」'); // :1908
    } else if (rand_n(3) === 0) {
      era.print('「说自己是为了钱而卖菊的贱婊子」'); // :1910
    } else if (rand_n(2) === 0) {
      era.print('「跪下来说我想要鸡鸡」'); // :1912
    } else {
      era.print('「再来点媚笑看看，要更淫邪的」'); // :1914
    }
  } else {
    // :1917-1997 狗头人商人（按 TALENT 性格分档）
    const t = (i) => era.get(`talent:${i}`) || 0;
    if (t(160)) {
      if (rand_n(4) === 0) {
        era.print('「喜欢用肛门表达爱意？」'); // :1922
      } else if (rand_n(3) === 0) {
        era.print('「把整个肛塞都吞入了」'); // :1924
      } else if (rand_n(2) === 0) {
        era.print('「什么都可以放进肛门去是吧？」'); // :1926
      } else {
        era.print('「用这种地方表达爱意吗？」'); // :1928
      }
    } else if (t(161)) {
      if (rand_n(4) === 0) {
        era.print('「肛塞对你来说太弱了吧。」'); // :1933
      } else if (rand_n(3) === 0) {
        era.print('「看！又放进一个了哦！」'); // :1935
      } else if (rand_n(2) === 0) {
        era.print('「越是看起来强悍的人，肛门越弱。原来是真的啊！」'); // :1937
      } else {
        era.print('「像要把手指吸进去一样！」'); // :1939
      }
    } else if (t(162)) {
      if (rand_n(4) === 0) {
        era.print('「肛门里放入振动宝石……再用力拔出来」'); // :1944
      } else if (rand_n(3) === 0) {
        era.print('「真是口嫌肛正直呢！」'); // :1946
      } else if (rand_n(2) === 0) {
        era.print('「菊穴，真舒畅……」'); // :1948
      } else {
        era.print('「把屁股再抬高一点……全部都看见了哦！」'); // :1950
      }
    } else if (t(163)) {
      if (rand_n(4) === 0) {
        era.print('「哪怕是一幅高贵的姿态，肮脏的地方也还是脏啊」'); // :1955
      } else if (rand_n(3) === 0) {
        era.print('「被爆菊感到羞耻了么……记住这份屈辱吧！」'); // :1957
      } else if (rand_n(2) === 0) {
        era.print('「肛门张开了～」'); // :1959
      } else {
        era.print('「振动杖都吞入了……真是了不起的菊穴啊」'); // :1961
      }
    } else if (t(164)) {
      if (rand_n(4) === 0) {
        era.print('「卖菊啊，不介意么？」'); // :1966
      } else if (rand_n(3) === 0) {
        era.print('「菊穴真的这么好么……？你看」'); // :1968
      } else if (rand_n(2) === 0) {
        era.print('「看来肛门很喜欢振动宝石嘛」'); // :1970
      } else {
        era.print('「哈哈，肛门变得黏黏糊糊的」'); // :1972
      }
    } else if (t(166)) {
      if (rand_n(4) === 0) {
        era.print('「肮脏的女人肛门也脏！」'); // :1977
      } else if (rand_n(3) === 0) {
        era.print('「勇者大人，菊花舒服吗？」'); // :1979
      } else if (rand_n(2) === 0) {
        era.print('「屁股翘起来，把后庭扒开！」'); // :1981
      } else {
        era.print('「尻穴还挺老实的」'); // :1983
      }
    } else {
      if (rand_n(4) === 0) {
        era.print('「这个卖菊的娼妓！」'); // :1987
      } else if (rand_n(3) === 0) {
        era.print('「堕落为卖菊的婊子了么？」'); // :1989
      } else if (rand_n(2) === 0) {
        era.print('「在干嘛啊，快把屁股露出来。」'); // :1991
      } else {
        era.print('「后庭在呃呃地喘息着……！」'); // :1993
      }
    }
  }
  return 0; // :1998 RETURN 0
}

/**
 * @DUNGEON_LES_LOG（:2001-2181）：卖春百合客台词（原作死代码）。
 *
 * **死代码判定（登记 #14）**：唯一调用方 @DUNGEON_LES（DUNGEON_BITCH.ERB
 * :1824）在 [SKIPSTART] 块内，全库无活调用点。1:1 移植保留，不接线。
 *
 * @param {number} arg0 客种类（0 淫魔 / 1 魔族女人 / 2 妖精的女乞丐 / 3 魔族的贵妇人 / ELSE 魔族的女祭司）
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {Promise<number>} 0
 */
async function dungeon_les_log(arg0, rand = default_rand) {
  const rand_n = rand;
  if (arg0 === 0) {
    // :2014-2028 淫魔
    if (rand_n(8) === 0) {
      era.print('「你的精气，我不客气啦♪」'); // :2014
    } else if (rand_n(7) === 0) {
      era.print('「你看起来很可口嘛～」'); // :2016
    } else if (rand_n(6) === 0) {
      era.print('「胸部也要舔哦」'); // :2018
    } else if (rand_n(5) === 0) {
      era.print('「谢谢款待♪」'); // :2020
    } else if (rand_n(4) === 0) {
      era.print('「拿这样的猎物来当晚餐，我真幸福呢～」'); // :2022
    } else if (rand_n(3) === 0) {
      era.print('「光是接吻就高潮了？」'); // :2024
    } else if (rand_n(2) === 0) {
      era.print('「满满的精气～吸走了哦」'); // :2026
    } else {
      era.print('「我开食啦♪」'); // :2028
    }
  } else if (arg0 === 1) {
    // :2031-2047 魔族女人
    if (rand_n(8) === 0) {
      era.print('「小奴隶，把尿接着啊」'); // :2033
    } else if (rand_n(7) === 0) {
      era.print('「你这样的，真是可爱」'); // :2035
    } else if (rand_n(6) === 0) {
      era.print('「来，赶快开始，已经习惯了吧？」'); // :2037
    } else if (rand_n(5) === 0) {
      era.print('「可悲的母猪就是要挨鞭子！小奴隶……」'); // :2039
    } else if (rand_n(4) === 0) {
      era.print('「就这样一直抱着……」'); // :2041
    } else if (rand_n(3) === 0) {
      era.print('「好多爱液溢出来了哦」'); // :2043
    } else if (rand_n(2) === 0) {
      era.print('「就一晚，我们来做恋人吧……」'); // :2045
    } else {
      era.print('「让我看看，你平常都是怎么自慰的？」'); // :2047
    }
  } else if (arg0 === 2) {
    // :2050-2066 妖精的女乞丐
    if (rand_n(8) === 0) {
      era.print('「钱，带来了……」'); // :2052
    } else if (rand_n(7) === 0) {
      era.print('「软软的……」'); // :2054
    } else if (rand_n(6) === 0) {
      era.print('「弄坏我，什么都不用考虑……」'); // :2056
    } else if (rand_n(5) === 0) {
      era.print('「果然不是抱着女人，就做不来啊！」'); // :2058
    } else if (rand_n(4) === 0) {
      era.print('「偶尔奢侈一下，不行吗？」'); // :2060
    } else if (rand_n(3) === 0) {
      era.print('「卖尻穴来挣钱，然后又可以买女人回来……」'); // :2062
    } else if (rand_n(2) === 0) {
      era.print('「想把你买下来，然后租出去给别人喝精液」'); // :2064
    } else {
      era.print('「这么脏的我，被你的爱液洗干净了……」'); // :2066
    }
  } else if (arg0 === 3) {
    // :2069-2097 魔族的贵妇人（两组 RAND 链）
    if (rand_n(4) === 0) {
      era.print('「能满足我的性欲么？」'); // :2071
    } else if (rand_n(3) === 0) {
      era.print('「看，想要钱吧？」'); // :2073
    } else if (rand_n(2) === 0) {
      era.print('「呵呵，真是一只好色的小猫咪」'); // :2075
    } else {
      era.print('「钱有的是，你看……」'); // :2077
    }
    if (rand_n(9) === 0) {
      era.print('「那里，在用力来！」'); // :2081
    } else if (rand_n(8) === 0) {
      era.print('「啊，再多舔几下」'); // :2083
    } else if (rand_n(7) === 0) {
      era.print('「喂，屁股也要舔……」'); // :2085
    } else if (rand_n(6) === 0) {
      era.print('「再来接吻吧」'); // :2087
    } else if (rand_n(5) === 0) {
      era.print('「我的鞭子，专治母猪……」'); // :2089
    } else if (rand_n(4) === 0) {
      era.print('「喂，自慰给我看」'); // :2091
    } else if (rand_n(3) === 0) {
      era.print('「要从阴蒂舔到菊花啊」'); // :2093
    } else if (rand_n(2) === 0) {
      era.print('「爱抚一下我的那里吧」'); // :2095
    } else {
      era.print('「来磨一下吧？打开你的腿……」'); // :2097
    }
  } else {
    // :2100-2179 魔族的女祭司（按 TALENT 性格分档）
    const t = (i) => era.get(`talent:${i}`) || 0;
    if (t(160)) {
      if (rand_n(4) === 0) {
        era.print('「一起相爱吧」'); // :2105
      } else if (rand_n(3) === 0) {
        era.print('「来接吻吧，奴隶」'); // :2107
      } else if (rand_n(2) === 0) {
        era.print('「想这样一直抱着……」'); // :2109
      } else {
        era.print('「快乐是我们的教义」'); // :2111
      }
    } else if (t(161)) {
      if (rand_n(4) === 0) {
        era.print('「再来！再来！越粗暴越好！」'); // :2116
      } else if (rand_n(3) === 0) {
        era.print('「啊，乳头……再用力地捏……」'); // :2118
      } else if (rand_n(2) === 0) {
        era.print('「再打我的屁股……打得通红也无妨」'); // :2120
      } else {
        era.print('「堕落是我们的教义」'); // :2122
      }
    } else if (t(162)) {
      if (rand_n(4) === 0) {
        era.print('「更认真地舔吧……」'); // :2127
      } else if (rand_n(3) === 0) {
        era.print('「要好好舔，一直舔到屁股啊」'); // :2129
      } else if (rand_n(2) === 0) {
        era.print('「啊！表情不错，再来点更好的声音吧……」'); // :2131
      } else {
        era.print('「献媚是我们的教义」'); // :2133
      }
    } else if (t(163)) {
      if (rand_n(4) === 0) {
        era.print('「结束了之后一起去喝茶吧」'); // :2138
      } else if (rand_n(3) === 0) {
        era.print('「就在这床睡吧」'); // :2140
      } else if (rand_n(2) === 0) {
        era.print('「啊，请把尿喝光……」'); // :2142
      } else {
        era.print('「淫荡是我们的教义」'); // :2144
      }
    } else if (t(164)) {
      if (rand_n(4) === 0) {
        era.print('「若无其事的神色，真漂亮」'); // :2149
      } else if (rand_n(3) === 0) {
        era.print('「比起挥剑，你还是卖淫比较有才能呢」'); // :2151
      } else if (rand_n(2) === 0) {
        era.print('「啊～腋下～是弱点啦～」'); // :2153
      } else {
        era.print('「暴力是我们的教义」'); // :2155
      }
    } else if (t(166)) {
      if (rand_n(4) === 0) {
        era.print('「这次不来我们的神殿吗？」'); // :2160
      } else if (rand_n(3) === 0) {
        era.print('「皮肤真不错……」'); // :2162
      } else if (rand_n(2) === 0) {
        era.print('「好屁股～」'); // :2164
      } else {
        era.print('「脱线是我们的教义」'); // :2166
      }
    } else {
      if (rand_n(4) === 0) {
        era.print('「就这样相互交缠着吧」'); // :2170
      } else if (rand_n(3) === 0) {
        era.print('「下次也要来我们的神殿哦」'); // :2172
      } else if (rand_n(2) === 0) {
        era.print('「呵呵～又指名你了」'); // :2174
      } else {
        era.print('「快乐是我们的教义」'); // :2176
      }
    }
  }
  return 0; // :2181 RETURN 0
}

module.exports = {
  expname,
  palamname,
  get_look_info,
  fs_bitch,
  fs_log_bitch,
  getbit,
  log_try_bitch,
  log_after_bitch,
  log_bitch_hand,
  log_bitch_oral,
  log_bitch_les,
  log_bitch_anal,
  log_bitch_sex,
  log_bitch_animal,
  log_bitch_self,
  dungeon_sex_log,
  dungeon_anal_log,
  dungeon_les_log,
};
