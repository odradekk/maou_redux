/**
 * @file 角色命名链：随机命名、固定名实现、名字重建与名字编号类型判定（issue #384，N2）。
 *
 * 移植说明（有意偏离既有行为，均注明依据）：
 *
 *   - **nid_get_type 自 ere/chara/chara-family.js 收拢回本文件**（#384）：
 *     先前寄在 chara-family.js 是 #349 的临时落点（chara-self-call.js /
 *     chara-pregnancy.js 都从那里导入）。两份真身比两处寄放危险（改了一边
 *     另一边静默不同步），故本工单按「一个函数一个落点」收拢：真身在
 *     chara-name.js，两个消费方改从本文件导入。**nid 与 nid_r 留在
 *     chara-family.js**：那边已有实现与既有测试面（chara-self-call /
 *     chara-pregnancy 的 nid 用例），本工单只保证调用面对得上，不搬动已
 *     跑绿的代码——搬动的收益是目录美观，代价是一批测试与变异条目的
 *     目标文件改址，不成比例。
 *
 *   - **relation_rename_rebuild 走 chara-family.js 的现成实现**：属 #349
 *     的范围，本文件只是调用点。
 *
 *   - **姓名与称呼在 ere 侧同存 callname 表**（#5 决议；CONTEXT.md「称呼」
 *     条：-1 = 名前、-2 = 呼び名），存档说明字段与姓名共用 callname:cid:-1。
 *     定名处的成对写入落在这同两个键上，与 event-chara-leave.js:194-195
 *     改名处的写法一致。
 *
 *   - **csv_callname 不用三段静态寻址**：与 chara-self-call.js 同一处崩溃面
 *     （对没有 CSTR 预设的角色取 `staticData.chara[c].cstr` 会抛
 *     TypeError），改用引擎文档化的 `era.get('chara:${cid}')` 取整份预设
 *     对象后按可选链读 callname。
 *
 *   - **组合名编号生成里有两处不可达分支，不写进代码**：循环计数器恒非负
 *     的「为负则跳出」、只由它放行的减 10（两者的条件互斥）；以及被更高
 *     区间 `> 2e9` 判定整段吞掉的 `> 1e9` 分支（两条判定比的是同一个值）。
 *     判定依据写在此。
 *
 *   - **cn_span_combine_name 的逐段自拼接等价于逐步 +=**：累积串即函数的
 *     返回值出口。
 *
 *   - **名字空间真被占满时重掷循环会空转**：四条「占满」规则只改名字
 *     类型、不改循环出口，一旦某个类型的两张表都掷不出空闲编号，循环就
 *     再也退不出来。生产路径不可达：已加入角色数远低于「占满」阈值，只有
 *     测试的恒定随机源才会触发；不为它发明「名字空间耗尽」的降级策略。
 *
 *   - **四条「占满」规则里的第三条（男性和名占满）恒不命中**：它的条件
 *     蕴含第一条（和名占满），第一条先判、先中的分支不会再往下走。整条
 *     留在 if 链里维持条件全集——else-if 只是写法，判断顺序才是语义。第
 *     四条（男性洋名占满）不同：窄区间内第二条不成立、它成立，是可达的。
 */

const era = require('#/era-electron');

const { relation_rename_rebuild } = require('#/chara/chara-family');
const {
  get_fixed_chara_name,
  LIST_CHARA_NAME_SIZE,
} = require('#/chara/chara-name-list');

/** 五个名字表计数（#332 起在本文件） */
const WEST_NAME_COUNT = 585;
const JAPANESE_NAME_COUNT = 450;
const WEST_MALE_NAME_COUNT = 453;
const JAPANESE_MALE_NAME_COUNT = 1059;
const CHINESE_NAME_COUNT = 789;

const default_rand = (n) => Math.floor(Math.random() * n);

/**
 * 整数除法（向零截断）：「已加入角色数 × 4 ÷ 10」这类条件按整型运算，
 * 用 JS 的浮点除法会在边界上差一档（1126-1127 之间）。
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const int_div = (a, b) => Math.trunc(a / b);

/**
 * csv_callname：取角色预设（yml/CharaN.yml）里的称呼。
 * 见文件头「有意偏离」条——不用三段静态寻址，它会在无该预设键的角色上崩溃。
 * @param {number} cid 角色 ID
 * @returns {string} 空串表示无预设
 */
function csv_callname(cid) {
  const preset = era.get(`chara:${cid}`);
  return String(preset?.callname ?? '');
}

/**
 * chara_name_random_define：按职业、种族与性别选择名字表并避免重复，
 * 末尾把执行流交给 chara_name_define。
 *
 * @param {number} cid 角色 ID
 * @param {number} [type=-1] 0=和名、1=洋名、2=组合名、-1=自动
 * @param {(n: number) => number} [rand] 随机源
 * @returns {void} 尾部转交执行流，不向调用点返回结果
 */
function chara_name_random_define(cid, type = -1, rand = default_rand) {
  let name_type = type;
  const talent = (index) => era.get(`talent:${cid}:${index}`) || 0;

  // 职业偏向：骑士偏洋名，巫女/忍者偏和名。
  if (name_type === -1) {
    if (talent(205) && rand(10) !== 0) {
      name_type = 1;
    } else if ((talent(206) || talent(207)) && rand(10) !== 0) {
      name_type = 0;
    }
  }

  // 种族偏向；人类、魔族及未知种族保持未指定。
  if (name_type === -1) {
    const race = era.get(`cflag:${cid}:314`) || 0; // CFLAG:314 种族
    if ([1, 3, 4, 5, 6, 7, 8, 10, 11].includes(race)) {
      name_type = 1;
    } else if (race === 2) {
      name_type = 0;
    }
  }

  // 和名有五分之三保持和名
  if (name_type === 0) {
    name_type = rand(5) % 2;
  }

  let nid;
  // 掷名循环：同编号已存在时重掷；已加入角色为空时一轮结束。
  for (;;) {
    const male = talent(122) !== 0; // TALENT:122 男人
    if (name_type === 0) {
      nid = rand(JAPANESE_NAME_COUNT) + 200;
      if (male) {
        nid = rand(JAPANESE_MALE_NAME_COUNT) + 3000;
      }
    } else if (name_type === 2) {
      nid = rand(CHINESE_NAME_COUNT) + 4500;
    } else {
      name_type = 1;
      nid = rand(WEST_NAME_COUNT);
      if (nid >= 200) {
        nid += 1000;
      }
      if (male) {
        nid = rand(WEST_MALE_NAME_COUNT) + 2000;
      }
    }

    // 重复检查：先清自身名字编号，再找同编号的其他角色。
    //
    // 两个排除项都**不可观察**，因此不设变异条目（#384 返工记录）：
    //   - `other === cid` 与前一行 cflag:cid:6 = -1 同效（自身这时读到 -1，
    //     而 nid 恒 >= 200，撞不上）；
    //   - MASTER 的名字编号恒 10000（chara_name_define 对编号 0 写死），
    //     而随机名编号的上限是 4500 + CHINESE_NAME_COUNT - 1 = 5288（五条
    //     掷法里的最大值），够不着——「首个命中是 MASTER 时不重掷」在可达
    //     状态里等价。
    era.set(`cflag:${cid}:6`, -1);
    const duplicate = era.getAddedCharacters().some((other) => {
      if (other === 0 || other === cid) {
        return false;
      }
      return (era.get(`cflag:${other}:6`) || 0) === nid;
    });
    if (!duplicate) {
      break;
    }

    // 名字空间占满时改换类型
    const count = era.getAddedCharacters().length; // 已加入角色数
    if (name_type === 0 && int_div(count * 4, 10) > JAPANESE_NAME_COUNT) {
      name_type = 1;
    } else if (name_type === 1 && count > int_div(WEST_NAME_COUNT * 8, 10)) {
      name_type = 0;
    } else if (
      name_type === 0 &&
      male &&
      int_div(count * 4, 10) > JAPANESE_MALE_NAME_COUNT
    ) {
      name_type = 1;
    } else if (
      name_type === 1 &&
      male &&
      count > int_div(WEST_MALE_NAME_COUNT * 8, 10)
    ) {
      name_type = 0;
    } else {
      name_type = 2;
    }
  }

  // chara_name_define(cid, nid)：只把执行流交给目标，不返回结果
  chara_name_define(cid, nid);
}

/**
 * chara_name_define：给角色定下名字（固定名表或随机组合名）。
 *
 * @param {number} cid 角色 ID
 * @param {number} [nid=-1] 固定名编号；-1 表示沿用 CFLAG:cid:6 现值
 * @returns {number|undefined} 特殊角色分支返回 0，其余路径不返回值
 */
function chara_name_define(cid, nid = -1) {
  const chara_no = cid;

  // 特殊角色使用特定名字
  if ((chara_no >= 17 && chara_no <= 40) || chara_no === 0) {
    const csv = csv_callname(chara_no);
    era.set(`callname:${cid}:-1`, csv); // 姓名
    era.set(`callname:${cid}:-2`, csv); // 称呼
    // 定义名字编号
    era.set(`cflag:${cid}:6`, 10_000 + chara_no);
    relation_rename_rebuild(cid);
    return 0;
  }

  // 名字编号的取舍
  let name_id = nid;
  if (name_id < 0) {
    name_id = era.get(`cflag:${cid}:6`) || 0;
  } else {
    era.set(`cflag:${cid}:6`, name_id);
    relation_rename_rebuild(cid);
  }

  // 固定名 或 随机名
  if (name_id < 1_000_000_000) {
    // 固定名列表（判的是声明尺寸，不是注册表）
    if (name_id < LIST_CHARA_NAME_SIZE) {
      const fixed = get_fixed_chara_name(name_id);
      if (fixed.length > 0) {
        era.set(`callname:${cid}:-1`, fixed);
        era.set(`callname:${cid}:-2`, fixed);
      } else {
        // 名字没有被记录
        era.set(`callname:${cid}:-1`, '佳奈美');
        era.set(`callname:${cid}:-2`, '佳奈美');
      }
    } else {
      // 无效的名字编号
      era.set(`callname:${cid}:-1`, '佳奈美');
      era.set(`callname:${cid}:-2`, '佳奈美');
    }
  } else {
    // 使用随机名
    const combined = cn_span_combine_name(name_id);
    era.set(`callname:${cid}:-1`, combined); // 姓名
    era.set(`callname:${cid}:-2`, combined); // 称呼
  }
  return undefined;
}

/**
 * chara_name_reset：把一个角色的称呼重置为初始值。
 *
 * 侵攻中的勇者（编号 17-40）取预设称呼，其余回落姓名本体。
 * @param {number} cid 角色 ID
 * @returns {void}
 */
function chara_name_reset(cid) {
  const callname =
    cid >= 17 && cid <= 40
      ? csv_callname(cid)
      : (era.get(`callname:${cid}:-1`) ?? ''); // 姓名
  era.set(`callname:${cid}:-2`, callname); // 称呼
}

/**
 * cn_rebuild：把全体角色的称呼重建为各自姓名（魔王跳过）。
 *
 * @returns {void}
 */
function cn_rebuild() {
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) {
      continue; // 跳过魔王
    }
    era.set(`callname:${cid}:-2`, era.get(`callname:${cid}:-1`) ?? '');
  }
}

/**
 * nid_get_type：返回固定名编号对应名字的类型，0 = 和名，1 = 洋名，
 * 2 = 组合名。
 *
 * 名字编号表：和名 [200,650)、男性和名 [3000,4059)、中式名 [4500,5289)、
 * 洋名 [0,585) 与男性洋名 [2000,2453)。判型时先取 ≥3000 的和名两支，再落
 * 洋名/和名的低段——[3000,∞) 的和名判定必须先于 `>= 2000` 的洋名分支，否则
 * 男性和名与中式名会被洋名分支吞掉。
 * @param {number} nid 固定名编号
 * @returns {0|1|2} 类型
 */
function nid_get_type(nid) {
  if (nid > 1_000_000_000) {
    return 2; // 组合名
  }
  if (nid >= 3000) {
    return 0; // 男性和名 [3000,4059) 与中式名 [4500,5289)
  }
  if (nid < 200 || nid >= 2000) {
    return 1; // 洋名（含男性洋名 [2000,2453)）
  }
  if (nid < 1000) {
    return 0; // 和名 [200,650)
  }
  return 1;
}

/** 单段名不宜独存的段值：单段名拼到这些段时追加一段通用两音段。 */
const SINGLE_BAD_PIECES = new Set([
  200, 201, 204, 205, 207, 208, 210, 215, 217, 218, 219, 227,
]);

/**
 * cn_span_combine_name_num：生成随机假名组合名的编号。
 *
 * 组合规则：长度 1-3 段，每段 3 位数；首段的百位取 2（通用两音）/3（通用
 * 一音），非首段的百位取 5（终端的 ー/ン）；末段落在 400 段（终端两音）。
 *
 * @param {(n: number) => number} [rand] 随机源
 * @returns {number} 组合名编号（>= 2_000_000_000）
 */
function cn_span_combine_name_num(rand = default_rand) {
  // 长度取 3, 2, 1
  const length = 3 - rand(2) - (rand(3) % 2);
  let result = 0;

  for (let i = 0; i < length; i += 1) {
    result *= 1000;

    let mode;
    // 80% 的第一轮循环取两音段
    if (i === 0 && length > 1 && rand(5) !== 0) {
      mode = 2;
    } else {
      mode = 1;
    }

    let piece;
    if (mode === 1) {
      // 第一次循环
      if ((rand(3) === 0 && length !== 1) || (rand(2) === 0 && length === 3)) {
        piece = rand(9) + 300; // 通用一音
      } else {
        piece = rand(30) + 200; // 通用两音
      }
    } else if (rand(8) === 0 && length !== 1) {
      piece = rand(2) + 500; // 终端的 ー/ン
    } else {
      piece = rand(27) + 400; // 终端两音
    }
    result += piece;

    // 单段名落在不宜独存的段值时追加一段通用两音段后停止：追加一轮仍先
    // 消耗一音段判定的两个骰子（rand(3)/rand(2)），length == 1 时两个条件
    // 都不成立，段值取通用两音段。
    if (length === 1 && SINGLE_BAD_PIECES.has(piece)) {
      result *= 1000;
      const one_sound =
        (rand(3) === 0 && length !== 1) || (rand(2) === 0 && length === 3);
      result += one_sound ? rand(9) + 300 : rand(30) + 200;
      break;
    }
  }

  return result + 2_000_000_000;
}

/**
 * cn_span_combine_name：按组合名编号拼出名字串。
 *
 * 两张表以「数百位」分档：300/500 段是一音、400 段是终端两音，arg > 2e9
 * （ver0.2）时逐段切片并处理「ア/イ/ウ/エ/オ/ン/ー」不再作段首的连接
 * 处理；arg 落在 [1e9,2e9]（ver0.1）时用另一张表逐段自拼。
 *
 * @param {number} arg 组合名编号
 * @returns {string} 名字串
 */
function cn_span_combine_name(arg) {
  let acc = '';
  let rest = arg % 1_000_000_000;

  if (arg > 2_000_000_000) {
    // ランダム名 ver0.2
    // 查表未命中没有默认分支：段值不在表里时（唯一的实例是 rand(27)+400
    // 掷出的 401）沿用**上一轮的段值**，随后的拼接照常执行——本实现用一个
    // 跨轮的 `word` 承接这条语义（首轮落空时它是空串，等价于拼上空串）。
    let word = '';
    while (rest > 1) {
      const piece = rest % 1000;
      word = COMBINE_NAME_V2.get(piece) ?? word;
      // 与前一段相接时，本段段首的 ア/イ/ウ/エ/オ/ン/ー 被吃掉
      // （吃掉首字，不是丢掉整段）。「相接」= 已累积有内容——首段没有
      // 前文可接，原样保留，否则单段名「アー」「オン」会整个变空。
      const first = word.slice(0, 1);
      const merged =
        acc !== '' && MERGE_HEAD_KANA.includes(first) ? word.slice(1) : word;
      // 前一段以「ッ」结尾时，本段的「ー」段丢掉尾部两字
      if (acc.endsWith(SOKUON) && first === CHOON) {
        acc = acc.slice(0, -2);
      }
      acc += merged;
      rest = Math.trunc(rest / 1000);
    }
  } else if (arg > 1_000_000_000) {
    // ランダム名 ver0.1
    while (rest > 1) {
      const piece = rest % 1000;
      acc += COMBINE_NAME_V1.get(piece) ?? ''; // 逐档自拼
      rest = Math.trunc(rest / 1000);
    }
  }

  return acc;
}

/**
 * 段首会被前一段吃掉的假名。收成一个字符串 + includes 判成员；
 * **这七个假名按整串豁免**（tools/lang-table.js 的 EXEMPT_STRINGS，与
 * 两张音节表同款理由）。
 */
const MERGE_HEAD_KANA = 'アイウエオンー';

/** 促音「ッ」：它能出现在段首（表中的「ッラ」条目）但不在吃字之列 */
const SOKUON = 'ッ';

/** 长音符「ー」 */
const CHOON = 'ー';

/**
 * ver0.2 档位表，逐行「段值 假名」。
 *
 * **为什么是一整块字符串而不是 Map 字面量**：表值全是假名（名字生成器的
 * 音节表），而简体锁按字符串字面量逐个判定、豁免粒度是「整串」——一行一个
 * 假名的字面量要 74 条豁免，整表一块只要 1 条（见 tools/lang-table.js 的
 * EXEMPT_STRINGS）。
 *
 * 分段：汎用一音（300-308）、終端（400-426）、終端一音（500/501）、
 * 使用しない（900-903）。逐段消费与「ッ + ー」判定见 cn_span_combine_name。
 *
 * 表里**没有 401**：rand(27)+400 能掷出 401，查表落空——落空时沿用上一轮
 * 的段值，`cn_span_combine_name` 用「未命中沿用上一段」承接（见该函数）。
 */
const COMBINE_NAME_V2_ROWS = `200 アー
201 アム
202 アル
203 アン
204 イア
205 ウル
206 エア
207 カル
208 シー
209 シア
210 スト
211 ナル
212 ネア
213 フィル
214 フォル
215 ミス
216 メイ
217 メティ
218 ラオ
219 ラナ
220 リー
221 リィ
222 リズ
223 リュー
224 ルー
225 ルク
226 レイ
227 レセ
228 レラ
229 レン
300 ヴェ
301 シ
302 シェ
303 シャ
304 ティ
305 トゥ
306 リ
307 ル
308 レ
400 ヴィア
402 キア
403 シア
404 タ
405 タリア
406 ティア
407 ディア
408 ティス
409 ニア
410 ファ
411 フィア
412 フラ
413 ミア
414 リア
415 リカ
416 リス
417 リゼ
418 リマ
419 リル
420 ーズ
421 ーゼ
422 ーナ
423 ーファ
424 ーマ
425 ーラ
426 ッラ
500 ー
501 ン
900 サン
901 シフ
902 ソラ
903 ミロ`;

/** ver0.1 档位表，逐行「段值 假名」（同上，块状的理由见上一条） */
const COMBINE_NAME_V1_ROWS = `100 アー
101 アム
102 アル
103 アン
104 イア
105 ヴェ
106 ウル
107 カル
108 サン
109 シ
110 シー
111 シェ
112 シフ
113 シャ
114 ソラ
115 ティ
116 トゥ
117 ネア
118 フィル
119 フォル
120 ミロ
121 リ
122 リー
123 リィ
124 リズ
125 リュー
126 レイ
127 レラ
128 レン
200 ー
201 ヴィア
202 シア
203 タリア
204 ティア
205 ディア
206 ニア
207 フィア
208 ミア
209 リア
210 リカ`;

/** 「段值 假名」块 → Map（两份表共用的解析） */
function parse_combine_rows(rows) {
  return new Map(
    rows.split('\n').map((row) => {
      const [key, value] = row.split(' ');
      return [Number(key), value];
    }),
  );
}

const COMBINE_NAME_V2 = parse_combine_rows(COMBINE_NAME_V2_ROWS);
const COMBINE_NAME_V1 = parse_combine_rows(COMBINE_NAME_V1_ROWS);

/** ver0.1 表：段值 → 假名（逐段自拼，与 ver0.2 是两套档位） */

module.exports = {
  chara_name_define,
  chara_name_random_define,
  chara_name_reset,
  cn_rebuild,
  cn_span_combine_name,
  cn_span_combine_name_num,
  nid_get_type,
};
