/**
 * @file 一人称（自称）与其昵称/绰号表的完整实现（issue #383）。
 *
 * 全项目头号枢纽：self_call(x) / self_call_first(x) 两个读取函数（由
 * ere/kojo/kojo-text.js 承载，2,706 处口上调用点不受这张工单影响）单纯读
 * `CSTR:x:60`；本文件实现的是**谁来写这个值**——random_self_call 随机选定
 * 一人称的完整分支链，及其两张子表 set_suit_selfcall（合适一人称）、
 * set_nick_selfcall（绰号一人称，从姓名派生）与共用的 calc_selfcall_factor
 * （角色的教育/姿态/开放三维评分）。
 *
 * 移植说明（有意偏离既有行为，均注明依据）：
 *   - **mode=1（自定义输入）分支自 #546 起实现**：唯一调用方是角色详情页
 *     的 [8] 一人称重设入口（ere/page/page-chara-info.js），已接入；mode
 *     形参排在 rand 之后（既有调用方都以第二参传随机源，chara-custom2/test
 *     同款，不破坏签名）。空输入的语义映射见函数体内注释：引擎把 '' 与
 *     "0" 都归一成数值 0 且不受理空提交，「不输入则随机设定」在 ere 的
 *     可达等价物是输入 0；提示行后因此**补了一句 ere 侧说明
 *     「（输入 0 随机设定）」**——有意偏离既有文案（第 1 轮验收要求）。
 *     判断条件自 #567 起统一收在 ere/utils/input-text.js（ere 侧空输入
 *     语义的结论与普查清单见该工单）。
 *
 *   - **preset_self_call 不用 `staticcstr:${cid}:60` 三段寻址**，改读
 *     `era.get('chara:${cid}')`（引擎文档化 API，dev-guides/09-static.md
 *     「返回对象形式的、编号为 id 的角色的所有静态数据」）取 `.cstr?.['60']`
 *     ——三段形式在**没有 CSTR 预设的角色**上会崩溃（这张工单用
 *     test/helpers/engine-bundle.js 跑真引擎 setVar 实测钉死）：
 *     `staticcstr:${cid}:60` 落进模块 648 的
 *     `if(a.startsWith("static")){a=a.substring(6);…
 *     this.staticData.chara[c][a][u]}` 分支，`this.staticData.chara[c].cstr`
 *     在 45 张角色表里只有 Chara33/Chara35/Chara150 声明过（其余 42 个
 *     没有 `.cstr` 键），对 undefined 取 `['60']` 直接抛
 *     `TypeError: Cannot read properties of undefined (reading '60')`——
 *     `era.get('chara:${cid}')` 落的是同模块 `case"chara":return
 *     this.staticData.chara[u]` 分支，无此崩溃面，返回整份预设对象后本文件
 *     自行按可选链取值。AGENTS.md「引擎 API 与硬约束」点名的崩溃写法在
 *     读侧同样成立，此处是该风险在读路径上的一个实例。
 *
 *   - **calc_selfcall_factor 的素质加成直接对 cid 取值**（#5 决议第六条：
 *     显式传参）：按 `talent:${cid}:${下标}` 逐项读取，不经任何全局可变的
 *     「当前角色」。
 *
 *   - **nid_get_type 不在本文件重复实现**：set_nick_selfcall 需要它判定姓名
 *     是「和名」还是「洋名」，但 ere/chara/chara-name.js（#384）已经有一份
 *     实现，与 chara-family.js 的 nid()/nid_r() 名字编号体系共用同一份函数，
 *     `chara-pregnancy.js` 已在用。两份真身比两处寄放危险（将来谁改了一边，
 *     另一边会静默不同步且没有测试会红），本文件直接
 *     `require('#/chara/chara-name')` 复用，不新造第二份。#653 起
 *     `nid_get_type` 已把 [3000,4059) 的男性和名与 [4500,5289) 的中式名
 *     归回和名，本调用点按修复后的行为测试。
 *
 *   - **get_look_info 的「种族2」kind 补进共享子集**
 *     （ere/kojo/kojo-dungeon-bitch-log.js，非本文件）：calc_selfcall_factor
 *     判定魔族的种族2 细分需要它，该文件已有「种族」「成为勇者前的生活」等
 *     7 个 kind 的子集实现（#185），这张工单只补第 8 个，不重复维护一份新
 *     映射表。
 *
 *   - **姓名的全角判定**（set_nick_selfcall 回落姓名本体的判断条件）：沿用
 *     page-info-exp.js / page-save-load.js 已有的显示宽度启发式
 *     （`charCodeAt(0) > 0xff` 记全角），本文件按同一阈值直接判「是否每个
 *     字符都是全角」，不重复实现一份 display_width。
 */

const era = require('#/era-electron');

const { nid_get_type } = require('#/chara/chara-name');
const { get_look_info } = require('#/chara/look-info');
const { chara_callname } = require('#/utils/callname-utils');
const { input_text } = require('#/utils/input-text');

/** 默认随机源（[0, n) 整数）；测试注入定值序固定分支 */
const default_rand = (n) => Math.floor(Math.random() * n);

/** 洋名昵称表 case 3/4 的首字白名单 */
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
 * Unicode 感知子串：按码点而非 UTF-16 code unit 切片。
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
 * 是否每个字符都是全角。
 * 阈值与 page-info-exp.js display_width 同款：码点 > 0xff 记全角。
 * @param {string} s
 * @returns {boolean}
 */
function is_all_fullwidth(s) {
  return Array.from(s).every((ch) => ch.codePointAt(0) > 0xff);
}

/**
 * 角色预设（yml/CharaN.yml「CSTR」段）里的原始一人称字串，不经存档态。
 * 见文件头说明——不用三段寻址是因为它会在无 CSTR 预设的角色上崩溃。
 * @param {number} cid
 * @returns {string} 空串表示无预设
 */
function preset_self_call(cid) {
  const preset = era.get(`chara:${cid}`);
  return preset?.cstr?.['60'] ?? '';
}

/**
 * calc_selfcall_factor：角色的教育/姿态/开放三维评分，供 set_suit_selfcall
 * 挑选合适的一人称。
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} [rand] 随机源（恶女/贵公子加成掷骰）
 * @returns {[number, number, number]} [教育, 姿态, 开放]
 */
function calc_selfcall_factor(cid, rand = default_rand) {
  let edu = 0;
  let attitude = 0;
  let openness = 0;

  // 种族；魔族再展开为内层的种族2 判定
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

  // 成为勇者前的生活（"修女"/"巫女" 等仅女性向词条命中——get_look_info
  // 对同一素质值按性别返回不同词，本处不额外处理性别）
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

  // 素质加成（对 cid 显式取值，见文件头说明）
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

  return [edu, attitude, openness]; // [教育, 姿态, 开放]
}

/**
 * set_suit_selfcall：按角色的三维评分挑选一句「合适的」一人称。从起始档位
 * 的下一档起逐档判定，某档条件不满足时 break 进下一档；四档（0-3）全部
 * 落空即返回 -1。
 * @param {number} cid 角色 ID
 * @param {number} [start=-1] 起始档位（随机入口恒 -1）
 * @param {(n: number) => number} [rand] 随机源（档位 0 的吾辈/老身掷骰）
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
            // 可达性存疑的既有分支：上一支 `attitude < -2` 已把这个区间
            // 拦下，保持既有判断条件
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
 * set_nick_selfcall：从角色姓名派生绰号一人称。每轮循环都会重新取姓名与
 * 做全角判定；姓名含半角字符时立即回落姓名本体并返回 -1。和名/洋名两套
 * 独立的六/五档表，档位推进与全部落空返回 -1 的结构同 set_suit_selfcall。
 * @param {number} cid 角色 ID
 * @param {number} [start=-1] 起始档位（随机入口恒 -1）
 * @param {(n: number) => number} [rand] 随机源（截取姓名用字时的掷骰）
 * @returns {number} 命中档位或 -1（全部落空，或姓名含半角字符）
 */
function set_nick_selfcall(cid, start = -1, rand = default_rand) {
  let local = start;
  for (;;) {
    let name = chara_callname(cid); // 姓名存于 callname:x:-1（#5 决议）
    const char_count = Array.from(name).length;
    local += 1;

    if (!is_all_fullwidth(name)) {
      // 含半角字符：直接回落姓名本体
      era.set(`cstr:${cid}:60`, name);
      return -1;
    }

    if (nid_get_type(era.get(`cflag:${cid}:6`) || 0) === 0) {
      // 和名
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
      // 洋名
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
 * random_self_call：一人称的随机设定入口。
 *
 * 档位（CFLAG:x:450）语义：< 0 或 >= 200 走角色预设回落；[0,9) 直设「我」；
 * [9,100) 合适一人称表；[100,200) 绰号一人称表。两张表均未命中时清空档位
 * 重试一次——重试后必然落进预设回落或 <9 直设，递归恒在一次以内终止。
 *
 * mode 1（#546）：自定义输入分支——两条分割线夹一句提示后等玩家输入，
 * 非空文本落为一人称并把档位清 0；空输入回落到与 mode 0 共用的随机路径
 * （沿用进入时读好的档位）。输入只发生一次，不建循环。
 *
 * **异步化**：mode 1 要 `await era.input()`，整个函数因此是 async——
 * mode 0 路径没有任何等待点，调用方不加 await 也不改变执行顺序，但按项目
 * 约定（AGENTS.md「异步 API 必须 await」）调用点都写 await。
 *
 * @param {number} cid 角色 ID
 * @param {(n: number) => number} [rand] 随机源，贯穿传给两张子表
 * @param {number} [mode] 0 = 随机（默认）；1 = 自定义输入
 * @returns {Promise<number>} 已设定的一人称档位
 */
async function random_self_call(cid, rand = default_rand, mode = 0) {
  // 进入时读好的档位（mode 1 的空输入回落也沿用这个值）
  let local = era.get(`cflag:${cid}:450`) || 0;

  if (mode === 1) {
    // 只有 mode 1 进输入段
    // 两条分割线夹一句提示
    era.drawLine();
    era.print('请输入想设定的第一人称，若不输入则随机设定');
    // 有意偏离既有行为（#567，第 1 轮验收补）：提示行照既有文案印出，但
    // ere 的渲染层不受理空提交（app.asar returnFromInput 的
    // `if (!any && !val) return`——直接回车没有反应），「不输入」走不到
    // 随机路径，只有输入 0 才进随机路径；补一行提示玩家。不能用
    // `era.input({ any: true })` 替代：any 键模式在按下第一个键时就提交，
    // 自由文本反而输不成
    era.print('（输入 0 随机设定）');
    era.drawLine();
    const text = input_text(await era.input());
    // 空输入在引擎里的形式就是数值 0（getNumber 把 '' 与 "0" 都归一成
    // 0，且渲染层不受理空提交），#567 起由共享判断条件统一还原（两条依据
    // 的完整注记见 ere/utils/input-text.js）：空串落随机路径，其余值字符
    // 串化落为自定义一人称
    if (text !== '') {
      // 非空：写入并清档位
      era.set(`cstr:${cid}:60`, text);
      era.set(`cflag:${cid}:450`, 0);
      return 0;
    }
    // 空输入 → 落随机路径（local 已在函数起手读好，等价于重读本档位）
  }

  // 以下为 mode 0/1 共用的随机路径
  // 档位 >= 200 → -1（预设回落档）
  if (local >= 200) {
    local = -1;
  }

  // 档位 < 0：角色预设回落
  if (local < 0) {
    const preset = preset_self_call(cid);
    if (preset) {
      era.set(`cstr:${cid}:60`, preset); // CSTR:x:60 一人称
      era.set(`cflag:${cid}:450`, 0); // CFLAG:x:450 一人称档位
      return 0;
    }
  }

  // 档位 < 9 → 一人称 = 我
  if (local < 9) {
    era.set(`cstr:${cid}:60`, '我');
    era.set(`cflag:${cid}:450`, 9);
    return 9;
  }

  // 档位 < 100 → 合适一人称表
  if (local < 100) {
    const result = set_suit_selfcall(cid, local - 10, rand);
    if (result >= 0) {
      era.set(`cflag:${cid}:450`, result + 10);
      return result + 10;
    }
    local = 99;
  }

  // 档位 < 200 → 绰号一人称表
  if (local < 200) {
    const result = set_nick_selfcall(cid, local - 100, rand);
    if (result >= 0) {
      era.set(`cflag:${cid}:450`, result + 100);
      // 返回值不带 +100：与上面合适一人称表的返回值 +10 不对称，档位写入
      // 与返回值各自独立赋值，两行都保留
      return result;
    }
  }

  // 两张表均未命中：清空档位重试（递归不带 mode，恒走随机路径）
  era.set(`cflag:${cid}:450`, -1);
  return random_self_call(cid, rand);
}

module.exports = {
  calc_selfcall_factor,
  set_suit_selfcall,
  set_nick_selfcall,
  random_self_call,
};
