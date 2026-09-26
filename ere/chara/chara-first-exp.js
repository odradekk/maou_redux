/**
 * @file 初吻与初体验的初始化（issue #394，N10）。
 *
 * 源: target/ERB/キャラ関数/CHARA_FIRST_EXP.ERB  @CHARA_FIRST_EXP（:2-670）
 *
 * 调用面：唯一调用点是 ere/chara/chara-make.js 的 cm_ns_exp（源
 * CHARA_MAKE.ERB:1103 `CALL CHARA_FIRST_EXP, A`，角色生成管线 @CM_NS_EXP
 * 段的初体验一句）。函数没有返回值出口（原作 `RETURN 0`），产物全在四个
 * 「初体验/初吻」变量上。
 *
 * 局部量与产物对照（原作局部量在 ere 侧一律落 JS 局部，不进变量表）：
 *
 *   | 原作            | 含义                                          | ere 落点                      |
 *   | ---             | ---                                           | ---                           |
 *   | `FIRST_KISS`    | 初吻部位编码（-1 未初始化、0 未体验）          | CFLAG:cid:16（写回，train 域）|
 *   | `FIRST_SEX`     | 初体验对象编码（同上）                         | CFLAG:cid:15（写回，train 域）|
 *   | `LOCALS`        | 初吻对象的称呼串                               | CSTR:cid:4（写回，train 域）  |
 *   | `LOCALS:1`      | 初体验对象的称呼串                             | CSTR:cid:3（写回，train 域）  |
 *   | `LOCALS:2`      | 当前候选对象的称呼（一次性暂存）               | `candidate`                   |
 *   | `KISS_POINT`    | 「预约」的初吻部位编码                         | `kiss_point`                  |
 *   | `MEN_OR_GIRL`   | 候选对象的性别（1 男 / 2 女 / 3 扶她 / 4 随机） | `candidate_gender`            |
 *   | `MEN_OR_GIRL:1` | 已被采纳的性别（0 = 尚无）                     | `matched_gender`              |
 *   | `LOCAL:1`       | 家族编码的分位截取（反复覆写）                 | `scratch`                     |
 *   | `LOCAL:3`       | 家族编码                                       | `family`                      |
 *   | `LOCAL:4`       | 家族设定有无（编码个位）                       | `family_flag`                 |
 *   | `LOCAL:2`       | 家族编码的低十位（配偶性别数字位）              | `family_low`                  |
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 *   - **跨域写走门面**（#71）：四个产物里 CFLAG:15/16 与 CSTR:3/4 的属主都是
 *     train 域（跨域写下标，逐条登记在案），写一律经 `chara(cid).train`
 *     的具名访问器；四项产物的初值也走同一组 getter 取回，其余读是裸寻址
 *     （#70 跨域读放行）。
 *   - **原作 `CASE 0,4,8` / `CASE 1,5,7` / `CASEELSE` 的三分数字位**（:67-129
 *     五处婚姻段）抽成查表 `MARRIAGE_PARTNER`，判定内容一字不改：键是
 *     `LOCAL:1 / 10000` 的五个婚姻状态，值是内层三臂。
 *   - **男／扶她两段逐字相同**（:224-302 与 :304-382，逐行比对确认），落成
 *     同一张职业表 `JOB_PARTNER_MALE_LIKE`；女的那段（:384-464）另立一张。
 *     两段原文确实一字不差，共用表不改变任何一条判定的结果。
 *   - **"貴族" 在女那一段没有 `ELSE`**（:406-412）：链全不中时 `LOCALS:2`
 *     保留上一轮的值。表里用 `fallback: null` 表达这处不同。
 *   - 原作无随机源缝（`RAND:N` 直接内联在表达式里），ere 侧按 chara-init.js
 *     先例把它提成 `rand` 形参，调用方注入定值序；缺省均匀随机。
 */

'use strict';

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');

const default_rand = (n) => Math.floor(Math.random() * n);

/**
 * 婚姻段的配偶称呼与性别（:64-130 的外层 `SELECTCASE LOCAL:1 / 10000` ×
 * 内层 `SELECTCASE LOCAL:2 / 1000000000`）。
 *
 * 键 = `LOCAL:1 / 10000`（1 已婚 / 2 离婚 / 3 重婚 / 4 再婚 / 5 未亡人）；
 * 值是内层三臂的 `[称呼, 性别]`：数字位 ∈ {0,4,8} → 男、∈ {1,5,7} → 扶她、
 * 其余 → 女。
 */
const MARRIAGE_PARTNER = new Map([
  [
    1,
    [
      ['丈夫', 1],
      ['扶她妻子', 3],
      ['妻子', 2],
    ],
  ],
  [
    2,
    [
      ['前夫', 1],
      ['前扶她妻子', 3],
      ['前妻', 2],
    ],
  ],
  [
    3,
    [
      ['丈夫', 1],
      ['扶她妻子', 3],
      ['妻子', 2],
    ],
  ],
  [
    4,
    [
      ['前夫', 1],
      ['前扶她妻子', 3],
      ['前妻', 2],
    ],
  ],
  [
    5,
    [
      ['亡夫', 1],
      ['亡妻（扶她）', 3],
      ['亡妻', 2],
    ],
  ],
]);

/**
 * 内层三臂的取法（:68-76 等的 `CASE 0,4,8` / `CASE 1,5,7` / `CASEELSE`）。
 * @param {number} digit `LOCAL:2 / 1000000000`
 * @returns {number} 0 = 男、1 = 扶她、2 = 女（`MARRIAGE_PARTNER` 行下标）
 */
function marriage_branch(digit) {
  if (digit === 0 || digit === 4 || digit === 8) return 0;
  if (digit === 1 || digit === 5 || digit === 7) return 1;
  return 2; // CASEELSE
}

/**
 * `IF RAND:N == 0 … ELSEIF RAND:M == 0 …` 链：逐条掷，命中即返回。
 * 掷的顺序与原作一致——前一条不中才掷下一条（emuera-basic-agent-guide
 * operators.md「短路求值」）。
 *
 * @param {Array<[number, number]>} chain [分母, 命中值] 列表
 * @param {(n: number) => number} rand RAND:N 随机源
 * @returns {number|undefined} undefined = 全不中（`ELSE` 由调用方接）
 */
function roll_chain(chain, rand) {
  for (const [denominator, value] of chain) {
    if (rand(denominator) === 0) return value;
  }
  return undefined;
}

/**
 * 职业段的单个 `CASE`：固定称呼，或一条 RAND 链加兜底。
 * @param {object} spec `{ label }` 或 `{ chain, fallback }`
 * @param {string} previous 上一轮的候选称呼
 * @param {(n: number) => number} rand
 * @returns {string} 本轮的候选称呼
 */
function resolve_case_label(spec, previous, rand) {
  if (spec.label !== undefined) {
    return spec.label;
  }
  const hit = roll_chain(spec.chain, rand);
  if (hit !== undefined) {
    return hit;
  }
  return spec.fallback === null ? previous : spec.fallback;
}

/**
 * 「キスしたかもしれない職業」段的职业 → 候选对象表（键 = `TALENT:315`
 * 成为勇者前的生活）。男／扶她共用一张（:225-300 与 :305-380 逐字相同），
 * 女另一张（:385-462）。`kiss` 是该 CASE 顺带预约的初吻部位。
 */
const JOB_PARTNER_MALE_LIKE = {
  gender: 2, // :302 / :382 とりあえず女限定
  cases: new Map([
    [
      1,
      {
        chain: [
          [4, '学校的后辈'],
          [3, '学校的先辈'],
          [2, '女教师'],
        ],
        fallback: '同级生',
      },
    ],
    [3, { label: '农妇' }],
    [4, { label: '港口的娼妇' }],
    [6, { label: '街边的娼妇' }],
    [8, { chain: [[2, '家庭教师']], fallback: '小女仆' }],
    [
      15,
      {
        chain: [
          [3, '女上司'],
          [2, '客户'],
        ],
        fallback: '熟客',
      },
    ],
    [18, { label: '熟客' }],
    [
      19,
      {
        chain: [
          [6, '战地的少女'],
          [5, '战友'],
          [4, '长官'],
          [3, '部下'],
          [2, '部下的女儿'],
        ],
        fallback: '长官的女儿',
      },
    ],
    [
      5,
      {
        label: '女客人',
        kiss: [
          [3, 301],
          [2, 401],
        ],
      },
    ],
    [
      20,
      {
        label: '女奴隶主',
        kiss: [
          [3, 301],
          [2, 401],
        ],
      },
    ],
  ]),
};

const JOB_PARTNER_FEMALE = {
  gender: 1, // :464 とりあえず男限定
  cases: new Map([
    [
      1,
      {
        chain: [
          [4, '学校的后辈'],
          [3, '学校的先辈'],
          [2, '教师'],
        ],
        fallback: '同级生',
      },
    ],
    [3, { label: '农夫' }],
    [4, { label: '渔民' }],
    [6, { label: '流氓' }],
    // :406-412 貴族：两条链都没有 ELSE，全不中即保留上一轮候选
    [
      8,
      {
        chain: [
          [20, '家庭教师'],
          [25, '佣人'],
        ],
        fallback: null,
      },
    ],
    [
      15,
      {
        chain: [
          [3, '上司'],
          [2, '客户'],
        ],
        fallback: '熟客',
      },
    ],
    [18, { label: '熟客' }],
    [
      19,
      {
        chain: [
          [7, '战地的少年'],
          [6, '战友'],
          [5, '长官'],
          [4, '部下'],
          [3, '部下的儿子'],
          [2, '长官的儿子'],
        ],
        fallback: '少年士兵',
      },
    ],
    [
      5,
      {
        label: '中年客人',
        kiss: [
          [3, 101],
          [2, 401],
        ],
      },
    ],
    [
      20,
      {
        label: '奴隶主',
        kiss: [
          [3, 101],
          [2, 401],
        ],
      },
    ],
  ]),
};

/**
 * `SELECTCASE RAND:3` 的三臂（`CASE 0` / `CASE 1` / `CASEELSE`）。
 * @param {string[]} options 三选项
 * @param {(n: number) => number} rand
 * @returns {string}
 */
function pick_three(options, rand) {
  const roll = rand(3); // :478 / :497 / :516 / :551 / :563 / :575 的选择式
  if (roll === 0) return options[0];
  if (roll === 1) return options[1];
  return options[2]; // CASEELSE
}

/**
 * @CHARA_FIRST_EXP（:2-670）：按角色的性别、家族与职业设定初吻与初体验的
 * 对象与部位，写回 CFLAG:15/16 与 CSTR:3/4。
 *
 * @param {number} cid 角色 ID（原作 ARG）
 * @param {(n: number) => number} [rand] 原作 `RAND:N`（[0,n) 整数）的随机源，
 *   缺省均匀随机
 * @returns {void} 原作 `RETURN 0`，调用点不读返回值
 */
function chara_first_exp(cid, rand = default_rand) {
  const t = (index) => era.get(`talent:${cid}:${index}`) || 0;
  const train = chara(cid).train;
  const dungeon = chara(cid).dungeon;
  const not_virgin = () => t(0) === 0; // TALENT:0 処女 == 0（非処女）

  // :14-17 四项产物的初值（写回在函数末）
  let first_kiss = train.初吻对象; // CFLAG:16
  let kiss_name = train.初吻对象名; // CSTR:4（原作 LOCALS）
  let first_sex = train.初体验对象; // CFLAG:15
  let sex_name = train.初体验对象名; // CSTR:3（原作 LOCALS:1）
  // :18-19 KISS_POINT = 0 / MEN_OR_GIRL:1 = 0
  let kiss_point = 0;
  let matched_gender = 0;
  // MEN_OR_GIRL（元素 0）：候选对象的性别，1 男 / 2 女 / 3 扶她 / 4 随机
  let candidate_gender = 0;
  // :55 LOCALS:2 —— 当前候选对象的称呼，每个「换人」的段头重置
  let candidate = '';

  // :22-23 不是男人又不是处女 → 谈不上「未体验」
  if (t(122) === 0 && not_virgin() && first_sex === -1) {
    first_sex = 0;
  }
  // :25-26 有性交或卖春经验 → 初吻的可能性还在（把 -1 拉回 0）
  if ((dungeon.性交经验 > 0 || dungeon.卖淫经验 > 0) && first_kiss === -1) {
    first_kiss = 0;
  }

  // :29-34 兽姦经历 + 极稀有的野良犬肛门（996）；非处女者顺带初体验 103
  if (
    kiss_name === '' &&
    first_kiss === 0 &&
    dungeon.兽奸经验 > 0 &&
    rand(20) === 0
  ) {
    first_kiss = 996;
    if (not_virgin() && first_sex === 0 && rand(2) === 0) {
      first_sex = 103;
    }
  }
  // :36-41 同前，野良犬阴茎（997），概率高五倍
  if (
    kiss_name === '' &&
    first_kiss === 0 &&
    dungeon.兽奸经验 > 0 &&
    rand(10) === 0
  ) {
    first_kiss = 997;
    if (not_virgin() && first_sex === 0 && rand(2) === 0) {
      first_sex = 103;
    }
  }
  // :43-48 同前，野良犬口（998），概率再高一倍
  if (
    kiss_name === '' &&
    first_kiss === 0 &&
    dungeon.兽奸经验 > 0 &&
    rand(5) === 0
  ) {
    first_kiss = 998;
    if (not_virgin() && first_sex === 0 && rand(2) === 0) {
      first_sex = 103;
    }
  }

  // :51-53 LOCAL:3 = TALENT:320 家族构成 / LOCAL:4 = 家族设定的有无
  const family = t(320);
  const family_flag = family % 10;

  // :58-196 有家族设定时，由配偶与六种亲属里随机挑一位当候选
  if (family_flag === 1) {
    // :61-62 低五位（婚姻状态）与低十位（配偶性别数字位）
    const marriage = Math.trunc((family % 100000) / 10000);
    const family_low = family % 10000000000;
    const partner = MARRIAGE_PARTNER.get(marriage);
    if (partner) {
      const [label, gender] =
        partner[marriage_branch(Math.trunc(family_low / 1000000000))];
      candidate = label;
      candidate_gender = gender;
    }

    // :133-134 兄
    let scratch = Math.trunc((family % 10000000) / 1000000);
    if (scratch > 0 && candidate === '' && rand(20) === 0) {
      candidate = '亲哥哥';
      candidate_gender = 1;
    }
    // :142-143 弟（正太控时概率 UP）
    scratch = Math.trunc((family % 1000000000) / 100000000);
    if (scratch > 0 && candidate === '' && rand(20) === 0) {
      candidate = '亲弟弟';
      candidate_gender = 1;
    } else if (scratch > 0 && candidate === '' && t(143) && rand(5) === 0) {
      candidate = '亲弟弟';
      candidate_gender = 1;
    }
    // :155-156 姉
    scratch = Math.trunc((family % 1000000) / 100000);
    if (scratch > 0 && candidate === '' && rand(20) === 0) {
      candidate = '亲姐姐';
      candidate_gender = 2;
    }
    // :164-165 妹（萝莉控时概率 UP）
    scratch = Math.trunc((family % 100000000) / 10000000);
    if (scratch > 0 && candidate === '' && rand(20) === 0) {
      candidate = '亲妹妹';
      candidate_gender = 2;
    } else if (scratch > 0 && candidate === '' && t(142) && rand(5) === 0) {
      candidate = '亲妹妹';
      candidate_gender = 2;
    }
    // :177-184 父（恋父情结时概率 UP）
    if (candidate === '' && rand(20) === 0) {
      candidate = '亲爹';
      candidate_gender = 1;
    } else if (candidate === '' && t(141) && rand(10) === 0) {
      candidate = '亲爹';
      candidate_gender = 1;
    }
    // :187-194 母（恋母情结时概率 UP）
    if (candidate === '' && rand(20) === 0) {
      candidate = '亲妈';
      candidate_gender = 2;
    } else if (candidate === '' && t(140) && rand(10) === 0) {
      candidate = '亲妈';
      candidate_gender = 2;
    }
  }

  // :199-202 随机让家族候选当上初吻对象
  if (
    kiss_name === '' &&
    first_kiss === 0 &&
    family_flag === 1 &&
    rand(2) === 0
  ) {
    kiss_name += candidate;
    matched_gender = candidate_gender;
  }
  // :204-205 随机让家族候选当上初体验对象
  if (
    not_virgin() &&
    sex_name === '' &&
    first_sex === 0 &&
    family_flag === 1 &&
    rand(2) === 0
  ) {
    sex_name += candidate;
  }

  // :208-212 故郷の恋人（好きなもの == 4）：性别待定（4 = 随机）
  if (t(317) === 4) {
    candidate = '故乡的恋人';
    candidate_gender = 4;
  }

  // :215-218 再掷一次（家族段没选中时的兜底）
  if (kiss_name === '' && first_kiss === 0 && rand(2) === 0) {
    kiss_name += candidate;
    matched_gender = candidate_gender;
  }
  // :220-221 初体验同上
  if (not_virgin() && sex_name === '' && first_sex === 0 && rand(2) === 0) {
    sex_name += candidate;
  }

  // :224-465 「キスしたかもしれない職業」：按性别选表、按职业选候选对象
  const is_male = t(122) !== 0;
  const is_futa = t(121) !== 0;
  const job_table =
    is_male || is_futa ? JOB_PARTNER_MALE_LIKE : JOB_PARTNER_FEMALE;
  const job_case = job_table.cases.get(t(315));
  if (job_case) {
    candidate = resolve_case_label(job_case, candidate, rand);
    if (job_case.kiss) {
      const point = roll_chain(job_case.kiss, rand);
      if (point !== undefined) kiss_point = point;
    }
  }
  candidate_gender = job_table.gender; // :302 / :382 / :464 性别限定写在表里

  // :468-471 随机让职业对象当上初吻对象
  if (kiss_name === '' && first_kiss === 0 && rand(2) === 0) {
    kiss_name += candidate;
    matched_gender = candidate_gender;
  }
  // :473-474 初体验同上
  if (not_virgin() && sex_name === '' && first_sex === 0 && rand(2) === 0) {
    sex_name += candidate;
  }

  // :477-533 不幸なキス：男／扶她（:477-494 与 :496-513 逐字相同）与女
  // 各一组三选项（SELECTCASE RAND:3），并预约部位
  const unlucky =
    is_male || is_futa
      ? {
          gender: 2,
          options: ['狩猎少年的痴女', '淫乱女家教', '女暴露狂'],
          kiss: [
            [3, 301],
            [2, 401],
          ],
        }
      : {
          gender: 1,
          options: ['流氓', '窃贼', '强奸魔'],
          kiss: [
            [3, 101],
            [2, 401],
          ],
        };
  candidate = pick_three(unlucky.options, rand);
  const unlucky_point = roll_chain(unlucky.kiss, rand);
  if (unlucky_point !== undefined) kiss_point = unlucky_point;
  candidate_gender = unlucky.gender;

  // :536-539 随机让不幸的对象当上初吻对象（注意分母是 3，不是 2）
  if (kiss_name === '' && first_kiss === 0 && rand(3) === 0) {
    kiss_name += candidate;
    matched_gender = candidate_gender;
  }
  // :542-543 预约的部位补进初吻
  if (kiss_name !== '' && first_kiss === 0 && kiss_point > 0) {
    first_kiss = kiss_point;
  }
  // :546-547 随机让不幸的对象当上初体验对象（同样分母 3）
  if (not_virgin() && sex_name === '' && first_sex === 0 && rand(3) === 0) {
    sex_name += candidate;
  }

  // :550-585 誰にでもあるキス：同款三选项，但不预约部位
  const any_kiss =
    is_male || is_futa
      ? { gender: 2, options: ['青梅竹马', '女朋友', '初恋'] }
      : { gender: 1, options: ['青梅竹马', '男朋友', '初恋'] };
  candidate = pick_three(any_kiss.options, rand);
  candidate_gender = any_kiss.gender;

  // :588-591 兜底：初吻必定有位对象
  if (kiss_name === '' && first_kiss === 0) {
    kiss_name += candidate;
    matched_gender = candidate_gender;
  }
  // :593-594 初体验同上
  if (not_virgin() && first_sex === 0 && sex_name === '') {
    sex_name += candidate;
  }
  // :596-597 有对象但部位未定 → 初体验编码 100
  if (sex_name !== '' && first_sex === 0) {
    first_sex = 100;
  }

  // :599-631 性别待定（4 = 故郷の恋人）时按持有性征掷出具体性别
  if (matched_gender === 4) {
    if (rand(10) === 0 && is_futa) {
      matched_gender = 2; // 扶她的恋人
    } else if (rand(2) === 0 && is_futa) {
      matched_gender = 3;
    } else if (is_futa) {
      matched_gender = 1;
    } else if (rand(20) === 0 && is_male) {
      matched_gender = 1;
    } else if (rand(8) === 0 && is_male) {
      matched_gender = 3;
    } else if (is_male) {
      matched_gender = 1;
    } else if (rand(20) === 0) {
      matched_gender = 2;
    } else if (rand(8) === 0) {
      matched_gender = 3;
    } else {
      matched_gender = 1;
    }
  }

  // :635-641 与性别矛盾则白纸（ペニス指定却对方是女 / ヴァギナ指定却对方是男）
  if (first_kiss >= 100 && first_kiss < 300 && matched_gender === 2) {
    first_kiss = 0;
  }
  if (first_kiss >= 300 && first_kiss < 400 && matched_gender === 1) {
    first_kiss = 0;
  }

  // :643-662 初吻部位：多半是嘴唇（RAND:30 > 0），否则按对象性别定
  if (kiss_name !== '' && first_kiss === 0 && rand(30) > 0) {
    first_kiss = 1; // 唇
  } else if (kiss_name !== '' && first_kiss === 0 && rand(3) === 0) {
    first_kiss = 401; // アナル
  } else if (kiss_name !== '' && first_kiss === 0 && matched_gender === 1) {
    first_kiss = 101; // 男でペニス
  } else if (kiss_name !== '' && first_kiss === 0 && matched_gender === 2) {
    first_kiss = 301; // 女でヴァギナ
  } else if (
    kiss_name !== '' &&
    first_kiss === 0 &&
    matched_gender === 3 &&
    rand(2) === 0
  ) {
    first_kiss = 101; // 扶她でペニス
  } else if (kiss_name !== '' && first_kiss === 0 && matched_gender === 3) {
    first_kiss = 301; // 扶她でヴァギナ
  }

  // :664-667 写回四项（CFLAG:15/16 与 CSTR:3/4 属 train 域，走门面）
  train.初吻对象 = first_kiss; // CFLAG:16
  train.初吻对象名 = kiss_name; // CSTR:4
  train.初体验对象 = first_sex; // CFLAG:15
  train.初体验对象名 = sex_name; // CSTR:3
}

module.exports = { chara_first_exp };
