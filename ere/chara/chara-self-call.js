/**
 * @file 一人称（自称）与其昵称/绰号表的完整落地（issue #383）。
 *
 * 全项目头号枢纽：`%SELF_CALL(x)%` / `%SELF_CALL_FIRST(x)%` 两个式中函数
 * （已由 ere/kojo/kojo-text.js 承载，2,706 处口上调用点不受本票影响）单纯
 * 读 `CSTR:x:60`；本文件移植的是**谁来写这个值**——`@RANDOM_SELF_CALL` 随机
 * 选定一人称的完整分支链，及其两张子表 `@SET_SUIT_SELFCALL`（合适一人称）
 * `@SET_NICK_SELFCALL`（绰号一人称，从姓名派生）与共用的
 * `@CALC_SELFCALL_FACTOR`（角色的教育/姿态/开放三维评分）。
 *
 * 源: target/ERB/キャラ関数/SELF_CALL.ERB
 *       @RANDOM_SELF_CALL（:2-65）@SET_SUIT_SELFCALL（:67-161）
 *       @SET_NICK_SELFCALL（:163-274）@CALC_SELFCALL_FACTOR（:276-396）
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 *   - **MODE=1（自定义输入）分支未建模**（原作 :7-23）：全库唯一调用方
 *     `キャラ関数/CHARA_INFO ver1.0.1.ERB:1062`
 *     `CALL RANDOM_SELF_CALL(ARG,1)` 所在文件未移植（N7/#391），当前没有
 *     任何可达入口能把 mode=1 传进来。`random_self_call` 因此不声明 mode
 *     形参，只实现 :24 起的随机路径（原作 MODE==0 的默认分支）——延续
 *     chara-init.js 在本票之前就已写明的同一条窄路径边界（#118）。CHARA_INFO
 *     落地时如需要，在那张票上补 mode 形参与 INPUTS 交互。
 *
 *   - **CSVCSTR(NO:ARG,60) 不用 `staticcstr:${cid}:60` 三段寻址**，改读
 *     `era.get('chara:${cid}')`（引擎文档化 API，dev-guides/09-static.md
 *     「返回对象形式的、编号为 id 的角色的所有静态数据」）取 `.cstr?.['60']`
 *     ——原始三段形式在**没有 CSTR 预设的角色**上会崩溃（本票用
 *     test/helpers/engine-bundle.js 跑真引擎 setVar 实测钉死）：
 *     `staticcstr:${cid}:60` 落进模块 648 的
 *     `if(a.startsWith("static")){a=a.substring(6);…
 *     this.staticData.chara[c][a][u]}` 分支，`this.staticData.chara[c].cstr`
 *     在全库 45 个角色表里只有 Chara33/Chara35/Chara150 声明过（其余 42 个
 *     没有 `.cstr` 键），对 undefined 取 `['60']` 直接抛
 *     `TypeError: Cannot read properties of undefined (reading '60')`——
 *     `era.get('chara:${cid}')` 落的是同模块 `case"chara":return
 *     this.staticData.chara[u]` 分支，无此崩溃面，返回整份预设对象后本文件
 *     自行按可选链取值。AGENTS.md「引擎 API 与硬约束」点名的崩溃形态在
 *     读侧同样成立，此处是该风险在读路径上的一个实例。
 *
 *   - **`@SELF_CALLNAME` 不移植**（:422-423）：原作本体就是
 *     `THROW 函数@SELF_CALLNAME 已被废弃，请调用函数@RANDOM_SELF_CALL`——
 *     全库零调用者，判定同 #14 的死代码处置（保留追溯注释，不落 JS）。
 *
 *   - **CALC_SELFCALL_FACTOR 的 `SWAP ARG,TARGET`（:345，函数尾对称换回）不移植**：
 *     原作用它把随后几行的裸 `TALENT:163` 一类隐式-TARGET 寻址接到 ARG
 *     身上，纯语法糖，不是真的换角色（函数结束前原样换回）。ere 侧显式传参
 *     （#5 决议第六条），本文件直接对 cid 取值，无需借道全局 TARGET。
 *
 *   - **`@NID_GET_TYPE`（CHARA_NAME.ERB:254-262）不在本文件重复实现**：
 *     `@SET_NICK_SELFCALL` 需要它判定姓名是「和名」还是「洋名」，但
 *     `ere/chara/chara-family.js`（#349）已经落过逐字实现——`nid()`/`nid_r()`
 *     体系与家族相关判定共用同一份函数，`chara-pregnancy.js` 已在用。两份
 *     真身比两份存根危险（将来谁改了一边，另一边会静默不同步且没有测试
 *     会红），本文件直接 `require('#/chara/chara-family')` 复用，不新造
 *     第二份。完整 `CHARA_NAME.ERB` 属另一票（N2/#384），落地时按该票裁定
 *     处理这份共享函数的归属。该实现自身有一处未修的可疑重叠（`nid>=2000`
 *     分支比 `nid<1000||nid>=3000` 分支先判定，导致 [3000,4059) 的和名
 *     男性向 NID 反而落进「洋名」返回值）——1:1 保留，不是本票的判断，
 *     也不是本票能改的范围，`@SET_NICK_SELFCALL` 调用点仍按此行为测试。
 *
 *   - **`@GET_LOOK_INFO` 的「种族2」kind 补进共享子集**
 *     （ere/kojo/kojo-dungeon-bitch-log.js，非本文件）：`CALC_SELFCALL_FACTOR`
 *     判定魔族的种族2 细分需要它，该文件已有「种族」「成为勇者前的生活」等
 *     7 个 kind 的子集实现（#185），本票只补第 8 个，不重复维护一份新映射表。
 *
 *   - **STRLENS/STRLENSU 的宽度区分**（`@SET_NICK_SELFCALL` 的
 *     `STRLENSU(LOCALS)*2 != STRLENS(LOCALS)` 判空判定）：沿用
 *     page-info-exp.js / page-save-load.js 已有的显示宽度启发式
 *     （`charCodeAt(0) > 0xff` 记全角），本文件按同一阈值直接判「是否
 *     每个字符都是全角」，不重复实现一份 display_width。
 */

const era = require('#/era-electron');

const { nid_get_type } = require('#/chara/chara-family');
const { get_look_info } = require('#/kojo/kojo-dungeon-bitch-log');
const { chara_callname } = require('#/utils/callname-utils');

/** 默认随机源（[0, n) 整数）；测试注入定值序固定分支 */
const default_rand = (n) => Math.floor(Math.random() * n);

/** 洋名昵称表 CASE 3/4 的首字白名单（SELF_CALL.ERB:251，洋名 CASE 4 处逐字重复） */
const WEST_NICK_FIRST_CHARS = new Set([
  '爱',
  '艾',
  '安',
  '薇',
  '夏',
  '菲',
  '伊',
  '珍',
  '若',
  '索',
  '佩',
  '洛',
  '露',
  '莎',
]);

/**
 * Unicode 感知子串（SUBSTRINGU 的等价物）：按码点而非 UTF-16 code unit 切片。
 * @param {string} s
 * @param {number} start
 * @param {number} [len] 缺省時取到结尾
 * @returns {string}
 */
function substringu(s, start, len) {
  const chars = Array.from(s);
  return len === undefined
    ? chars.slice(start).join('')
    : chars.slice(start, start + len).join('');
}

/**
 * 是否每个字符都是全角（STRLENSU(s)*2 == STRLENS(s) 的等价判定）。
 * 阈值与 page-info-exp.js display_width 同款：码点 > 0xff 记全角。
 * @param {string} s
 * @returns {boolean}
 */
function is_all_fullwidth(s) {
  return Array.from(s).every((ch) => ch.codePointAt(0) > 0xff);
}

/**
 * CSVCSTR(NO:ARG, 60) 的等价物：角色预设（yml/CharaN.yml「CSTR」段）里的
 * 原始一人称字串，不经存档态。见文件头「有意偏离」条——不用三段寻址是
 * 因为它会在无 CSTR 预设的角色上崩溃。
 * @param {number} cid
 * @returns {string} 空串表示无预设（对应原作 STRLENS(LOCALS) == 0）
 */
function preset_self_call(cid) {
  const preset = era.get(`chara:${cid}`);
  return preset?.cstr?.['60'] ?? '';
}

/**
 * @CALC_SELFCALL_FACTOR（SELF_CALL.ERB:276-396）：角色的教育/姿态/开放
 * 三维评分，供 @SET_SUIT_SELFCALL 挑选合适的一人称。
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} [rand] RAND:N 的随机源（恶女/贵公子加成掷骰）
 * @returns {[number, number, number]} [教育, 姿态, 开放]
 */
function calc_selfcall_factor(cid, rand = default_rand) {
  let edu = 0; // L_教育
  let attitude = 0; // L_姿态
  let openness = 0; // L_开放

  // :286-308 种族（GOTO CASE_魔族 展开为内层种族2 判定，:311-322）
  switch (get_look_info(cid, '种族')) {
    case '精灵':
    case '暗精灵':
      edu += 2;
      attitude += 2;
      openness += 2;
      break;
    case '天使':
    case '堕天使':
      openness += 2;
      break;
    case '吸血鬼':
      edu += 2;
      attitude += 1;
      break;
    case '龙族':
      edu += 2;
      attitude += 1;
      openness -= 2;
      break;
    case '魔族':
      // :302-303 GOTO CASE_魔族，跳进上面注释点名的 IF 0 死块（只经 GOTO 到达）
      switch (get_look_info(cid, '种族2')) {
        case '植物':
          attitude -= 1;
          break;
        case '妖精':
        case '史莱姆':
          edu += 1;
          break;
        case '魔兽':
          edu -= 2;
          break;
        default:
          break;
      }
      break;
    case '矮人':
      edu -= 2;
      attitude += 1;
      openness -= 1;
      break;
    default:
      break;
  }

  // :324-343 成为勇者前的生活（"修女"/"巫女" 等仅女性向词条命中，1:1——
  // get_look_info 对同一素质值按性别返回不同词，本处不额外处理性别）
  switch (get_look_info(cid, '成为勇者前的生活')) {
    case '学生':
      edu += 1;
      break;
    case '修女':
      edu += 1;
      attitude -= 1;
      break;
    case '巫女':
    case '预言家':
    case '占卜师':
    case '隐士':
      edu += 1;
      openness -= 2;
      break;
    case '小偷':
    case '乞丐':
    case '贫民':
      edu -= 2;
      break;
    case '商人':
      edu += 1;
      attitude -= 2;
      break;
    case '军人':
      attitude -= 2;
      break;
    case '贵族':
      attitude += 2;
      break;
    default:
      break;
  }

  const talent = (idx) => era.get(`talent:${cid}:${idx}`) || 0;

  // :347-392 素质加成（原作借 SWAP ARG,TARGET 走裸 TALENT 寻址，文件头）
  if (talent(163)) {
    // 高贵
    edu += 2;
    attitude += 2;
  }
  if (talent(172)) {
    // 智慧
    edu += 2;
    attitude -= 1;
  }
  if (talent(162)) {
    // 懦弱
    attitude -= 2;
  }
  if (talent(166)) {
    // 恶女
    edu += 1;
    attitude += 2;
    if (rand(4) === 0) {
      attitude += 1;
    }
  }
  if (talent(174)) {
    // 贵公子
    edu += 2;
    attitude += 1;
    if (rand(4) === 0) {
      attitude += 2;
    }
    if (rand(3) === 0) {
      edu += 1;
    }
  }
  if (talent(23)) {
    // 好奇的
    openness += 5;
  }
  if (talent(24)) {
    // 保守的
    openness = -10;
  }
  if (talent(16) || talent(18)) {
    // 嚣张、傲娇
    attitude += 5;
  }
  if (talent(15)) {
    // 高姿态
    attitude = 10;
  }
  if (talent(17)) {
    // 低姿态
    attitude = -10;
  }

  return [edu, attitude, openness]; // :396 RETURN L_教育,L_姿态,L_开放
}

/**
 * @SET_SUIT_SELFCALL（SELF_CALL.ERB:67-161）：按角色的三维评分挑选一句
 * 「合适的」一人称。$SELECT_LOOP 每次先 `LOCAL++` 再判定，某档条件不满足
 * 时 `GOTO SELECT_LOOP` 相当于本函数里的 `continue`（重入循环顶端，local
 * 自增到下一档）；四档（0-3）全部落空即 CASEELSE 返回 -1。
 * @param {number} cid 角色 ID
 * @param {number} [start=-1] ARG:1（起始档位，随机入口恒 -1）
 * @param {(n: number) => number} [rand] RAND:N 随机源（CASE 0 的吾辈/老身掷骰）
 * @returns {number} 命中档位（0-3）或 -1（全部落空）
 */
function set_suit_selfcall(cid, start = -1, rand = default_rand) {
  const [edu, attitude, openness] = calc_selfcall_factor(cid, rand);
  const male = (era.get(`talent:${cid}:122`) || 0) !== 0; // TALENT:122 男人

  for (let local = start + 1; ; local += 1) {
    switch (local) {
      case 0: {
        if (openness < -2 && edu > 0) {
          let word;
          if (openness <= -5) {
            word = rand(2) ? '吾辈' : '老身';
          } else {
            word = attitude < -3 ? '奴家' : '妾身';
            if (male) {
              word = attitude < -3 ? '在下' : '鄙人';
            }
          }
          era.set(`cstr:${cid}:60`, word);
          return local;
        }
        break;
      }
      case 1: {
        if (edu < -2) {
          let word = '俺';
          if (attitude >= 5) {
            word = male ? '老子' : '老娘';
          }
          era.set(`cstr:${cid}:60`, word);
          return local;
        }
        break;
      }
      case 2: {
        if (edu > 2) {
          let word;
          if (attitude >= 5) {
            word = '本宫';
          } else if (attitude > 2) {
            word = male ? '本少爷' : '本小姐';
          } else if (attitude < -2) {
            word = male ? '小人' : '小女子';
          } else if (attitude <= -5) {
            // :141 原作可达性存疑：上一支 `attitude < -2` 已把这个区间
            // 拦下，1:1 保留分支不改写
            word = '在下';
          } else {
            break;
          }
          era.set(`cstr:${cid}:60`, word);
          return local;
        }
        break;
      }
      case 3: {
        if (
          edu >= -2 &&
          edu <= 2 &&
          attitude >= -2 &&
          attitude <= 2 &&
          openness >= -2 &&
          openness <= 2
        ) {
          era.set(`cstr:${cid}:60`, male ? '鄙人' : '人家');
          return local;
        }
        break;
      }
      default:
        return -1;
    }
  }
}

/**
 * @SET_NICK_SELFCALL（SELF_CALL.ERB:163-274）：从角色姓名派生绰号一人称。
 * 每次重入 $SELECT_LOOP 都会重新取姓名与全角判定（1:1，原作同款）；姓名
 * 含半角字符时立即回落姓名本体并返回 -1。和名/洋名两套独立的六/五档表，
 * 判据同 SET_SUIT_SELFCALL 的 continue-until-CASEELSE 结构。
 * @param {number} cid 角色 ID
 * @param {number} [start=-1] ARG:1（起始档位，随机入口恒 -1）
 * @param {(n: number) => number} [rand] RAND:N 随机源（截取姓名用字时的掷骰）
 * @returns {number} 命中档位或 -1（全部落空，或姓名含半角字符）
 */
function set_nick_selfcall(cid, start = -1, rand = default_rand) {
  let local = start;
  for (;;) {
    let name = chara_callname(cid); // SAVESTR:ARG（无引擎通道，走 callname，#5 决议）
    const char_count = Array.from(name).length; // STRLENSU(LOCALS)
    local += 1;

    if (!is_all_fullwidth(name)) {
      // :171-175 含半角字符：直接回落姓名本体
      era.set(`cstr:${cid}:60`, name);
      return -1;
    }

    if (nid_get_type(era.get(`cflag:${cid}:6`) || 0) === 0) {
      // :180-225 和名
      switch (local) {
        case 0: {
          // 皐月 -> 皐月
          if (char_count > 2) {
            continue;
          }
          era.set(`cstr:${cid}:60`, name);
          return local;
        }
        case 1: {
          // 佳奈美 -> 佳奈||佳美；纪美子 -> 纪美（先去尾「子」）
          if (char_count <= 2) {
            continue;
          }
          if (substringu(name, char_count - 1) === '子') {
            name = substringu(name, 0, char_count - 1);
          }
          const len = Array.from(name).length;
          const pick = substringu(name, rand(len - 1) + 1, 1);
          era.set(`cstr:${cid}:60`, substringu(name, 0, 1) + pick);
          return local;
        }
        case 2: {
          // 樱 -> 小樱
          if (char_count > 1) {
            name = substringu(name, 0, 1);
          }
          era.set(`cstr:${cid}:60`, `小${name}`);
          return local;
        }
        case 3: {
          // 樱 -> 樱子
          if (char_count > 1) {
            name = substringu(name, 0, 1);
          }
          era.set(`cstr:${cid}:60`, `${name}子`);
          return local;
        }
        case 4: {
          // 樱 -> 樱酱
          if (char_count > 1) {
            name = substringu(name, 0, 1);
          }
          era.set(`cstr:${cid}:60`, `${name}酱`);
          return local;
        }
        case 5: {
          // 樱 -> 樱子樱子；菊枝 -> 菊枝菊枝；佳奈美 -> 佳奈佳奈||佳美佳美
          if (char_count <= 1) {
            name = `${name}子`;
          } else if (char_count > 2) {
            if (substringu(name, char_count - 1) === '子') {
              name = substringu(name, 0, char_count - 1);
            }
            const len = Array.from(name).length;
            name =
              substringu(name, 0, 1) + substringu(name, rand(len - 1) + 1, 1);
          }
          era.set(`cstr:${cid}:60`, name.repeat(2));
          return local;
        }
        default:
          return -1;
      }
    } else {
      // :227-272 洋名
      switch (local) {
        case 0: {
          // 艾莉 -> 艾莉
          if (char_count > 3) {
            continue;
          }
          era.set(`cstr:${cid}:60`, name);
          return local;
        }
        case 1: {
          // 索菲亚 -> 索菲||索亚
          if (char_count <= 2) {
            continue;
          }
          const pick = substringu(name, rand(char_count - 1) + 1, 1);
          era.set(`cstr:${cid}:60`, substringu(name, 0, 1) + pick);
          return local;
        }
        case 2: {
          if (char_count > 1) {
            name = substringu(name, 0, 1);
          }
          era.set(`cstr:${cid}:60`, `小${name}`);
          return local;
        }
        case 3: {
          // 艾提卡 -> 艾儿
          if (char_count < 2) {
            continue;
          }
          if (char_count === 2 && substringu(name, 1, 1) === '儿') {
            continue;
          }
          const first = substringu(name, 0, 1);
          if (!WEST_NICK_FIRST_CHARS.has(first)) {
            continue;
          }
          era.set(`cstr:${cid}:60`, `${first}儿`);
          return local;
        }
        case 4: {
          // 艾提卡 -> 艾卡儿
          if (char_count < 2) {
            continue;
          }
          if (substringu(name, char_count - 1) === '儿') {
            continue;
          }
          const first = substringu(name, 0, 1);
          if (!WEST_NICK_FIRST_CHARS.has(first)) {
            continue;
          }
          const last = substringu(name, char_count - 1);
          era.set(`cstr:${cid}:60`, `${first}${last}儿`);
          return local;
        }
        default:
          return -1;
      }
    }
  }
}

/**
 * @RANDOM_SELF_CALL（SELF_CALL.ERB:2-65）：一人称的随机设定入口。
 *
 * 档位（CFLAG:x:450）语义：< 0 或 >= 200 走 CSV 预设回落；[0,9) 直设「我」；
 * [9,100) 合适一人称表；[100,200) 绰号一人称表。两张表均未命中时清空档位
 * 重试一次（原作 `;RESTART CALL RANDOM_SELF_CALL, ARG`）——重试后必然落进
 * CSV 回落或 <9 直设，递归恒在一次以内终止。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} [rand] RAND:N 随机源，贯穿传给两张子表
 * @returns {number} 已设定的一人称档位（原作 RETURN 值）
 */
function random_self_call(cid, rand = default_rand) {
  // :6 LOCAL = CFLAG:ARG:450（MODE 恒 0，见文件头「有意偏离」条）
  let local = era.get(`cflag:${cid}:450`) || 0;

  // :25-26 SIF LOCAL >= 200 → LOCAL = -1（CSV 回落档）
  if (local >= 200) {
    local = -1;
  }

  // :28-36 LOCAL < 0：CSV 预设回落
  if (local < 0) {
    const preset = preset_self_call(cid);
    if (preset) {
      era.set(`cstr:${cid}:60`, preset); // CSTR:x:60 一人称
      era.set(`cflag:${cid}:450`, 0); // CFLAG:x:450 一人称档位
      return 0;
    }
  }

  // :38-42 LOCAL < 9 → 一人称 = 我
  if (local < 9) {
    era.set(`cstr:${cid}:60`, '我');
    era.set(`cflag:${cid}:450`, 9);
    return 9;
  }

  // :44-52 LOCAL < 100 → 合适一人称表
  if (local < 100) {
    const result = set_suit_selfcall(cid, local - 10, rand);
    if (result >= 0) {
      era.set(`cflag:${cid}:450`, result + 10);
      return result + 10;
    }
    local = 99; // :51
  }

  // :54-62 LOCAL < 200 → 绰号一人称表
  if (local < 200) {
    const result = set_nick_selfcall(cid, local - 100, rand);
    if (result >= 0) {
      era.set(`cflag:${cid}:450`, result + 100);
      // RETURN RESULT 不带 +100：与上面合适一人称表的 RETURN RESULT+10 不对称，
      // 原作逐字如此（CFLAG 与 RETURN 各自独立赋值），1:1 保留不判定为笔误
      return result;
    }
  }

  // :63-65 两张表均未命中：清空档位重试
  era.set(`cflag:${cid}:450`, -1);
  return random_self_call(cid, rand);
}

module.exports = {
  calc_selfcall_factor,
  set_suit_selfcall,
  set_nick_selfcall,
  random_self_call,
};
