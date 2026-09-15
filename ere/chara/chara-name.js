/**
 * @file 角色命名链：随机命名、固定名落地、名字重建与 NID 族（issue #384，N2）。
 *
 * 源: target/ERB/キャラ関数/CHARA_NAME.ERB 全函数——
 *       @CHARA_NAME_RANDOM_DEFINE（:14-141）、@CHARA_NAME_DEFINE（:147-202）、
 *       @CHARA_NAME_RESET（:209-218）、@CN_REBUILD（:225-230）、
 *       @NID_FINDCHARAS（:236-250）、@NID_GET_TYPE（:255-265）、@NID（:270-276）、
 *       @NID_R（:278-285）、@CN_SPAN_COMBINE_NAME_NUM（:291-333）、
 *       @CN_SPAN_COMBINE_NAME（:339-604）
 *       target/ERB/キャラ関数/CHARA_NAME.ERH  五个计数声明（:7-22）
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 *   - **@NID_GET_TYPE 自 ere/chara/chara-family.js 收拢回本文件**（#384）：
 *     它的原作出处就是本文件 :255，先前寄在 chara-family.js 是 #349 的临时
 *     落点（chara-self-call.js / chara-pregnancy.js 都从那里导入）。两份真身
 *     比两份存根危险（改了一边另一边静默不同步），故本票按「一个函数一个
 *     落点」收拢：真身在 chara-name.js，两个消费方改从本文件导入。
 *     **@NID / @NID_R 留在 chara-family.js**：那边已有实现与既有测试面
 *     （chara-self-call / chara-pregnancy 的 NID 用例），本票只保证调用面
 *     对得上，不搬动已跑绿的代码——搬动的收益是目录美观，代价是一批测试
 *     与变异条目的靶文件改址，不成比例。
 *
 *   - **RELATION_RENAME_REBUILD 走 chara-family.js 的现成实现**（:160/:169）：
 *     它是 RELATION.ERB:52 的函数，属 #349 的范围，本文件只是调用点。
 *
 *   - **名字三键（NAME / CALLNAME / SAVESTR）在 ere 侧同为 callname 表**
 *     （#5 决议；CONTEXT.md「称呼」条：-1 = 名前、-2 = 呼び名，且本作把
 *     SAVESTR 赋成 %NAME%）。故 :179-181 三行写的是同两个键，与
 *     event-chara-leave.js:194-195 改名处的写法一致。
 *
 *   - **CSVCALLNAME(NO:L_A) 不用三段静态寻址**（:155/:213）：与
 *     chara-self-call.js 同一处崩溃面（对没有 CSTR 预设的角色取
 *     `staticData.chara[c].cstr` 会抛 TypeError），改用引擎文档化的
 *     `era.get('chara:${cid}')` 取整份预设对象后按可选链读 callname。
 *
 *   - **两处死分支 1:1 保留为注释，不落代码**：
 *     @CN_SPAN_COMBINE_NAME_NUM 的 `SIF L_I < 0 BREAK`（:327-328，FOR 计数器
 *     恒非负）与紧随其后的 `L_I -= 10`（:329-330）都不可达——后者只能被
 *     前者放行，而 :329 的判据 `L_L == 1` 与 :320 的 `RAND:8 == 0 && L_L != 1`
 *     互斥（L_L == 1 时 L_N 落 [400,427]，与列举的 200/201/204/205/207/208/
 *     210/215/217/218/219/227 无交集）。两行都保留行号注释，判定依据写在此。
 *     @CN_SPAN_COMBINE_NAME 的 `ELSEIF B > 1000000000`（:515）同属不可达：
 *     上式 `IF ARG > 2000000000` 已吞掉全部更高区间，而 B 是 ARG 的别名。
 *
 *   - **@CN_SPAN_COMBINE_NAME 的 `%LOCALS:9%…` 自拼接**（:519-598）等价于
 *     逐步 += ；`:603 RESULTS '= LOCALS:9` 是函数的返回值出口（原作用
 *     RESULTS 回传而非 RETURNF）。
 *
 *   - **名字空间真被占满时 :98 的重掷循环会空转**（原作同款，1:1 保留）：
 *     四条「占满」规则只改 L_TYPE，不改循环出口；一旦某个类型的两张表都
 *     掷不出空闲编号（例如组合名 4500 已被占用、而 RAND:789 反复给出同一个
 *     偏移），循环就再也退不出来。实测入口是「先后生成两个后代、随机源
 *     恒定」这类测试场景（test/chara-pregnancy.test.js 的用例已按此调整
 *     随机源）。生产路径不可达：全库 CHARANUM ≤ 90，而第一、二条规则的
 *     阈值是 1126 / 469。**不修**——修了就不是 1:1，且要在原作没有的地方
 *     发明一套「名字空间耗尽」的降级策略（那是设计决定，不是移植）。
 *
 *   - **名字空间「占满」四条规则里的第三条不可达**（:130-131，男性和名占满）：
 *     它的判据 `L_TYPE == 0 && TALENT:L_A:122 && CHARANUM*4/10 > JAPEN_MALE_NAME_COUNT`
 *     蕴含第一条的 `L_TYPE == 0 && CHARANUM*4/10 > JAPEN_NAME_COUNT`（1059 > 450），
 *     而第一条先判、先中的分支不会再往下走。整条按 1:1 保留在 if 链里（结构
 *     与原文一致，便于将来对照），但**执行流永远进不去**：`ELSEIF` 只是写法，
 *     判断顺序才是语义。第四条（男性洋名占满，:132-133）不同——窄区间
 *     (362, 468] 内第二条不成立、它成立，是可达的。
 */

const era = require('#/era-electron');

const { relation_rename_rebuild } = require('#/chara/chara-family');
const {
  get_fixed_chara_name,
  LIST_CHARA_NAME_SIZE,
} = require('#/chara/chara-name-list');

/** CHARA_NAME.ERH:10-22 五个名字表计数（#332 起在本文件） */
const WEST_NAME_COUNT = 585;
const JAPANESE_NAME_COUNT = 450;
const WEST_MALE_NAME_COUNT = 453;
const JAPANESE_MALE_NAME_COUNT = 1059;
const CHINESE_NAME_COUNT = 789;

const default_rand = (n) => Math.floor(Math.random() * n);

/** 本文件存根化的原作调用名（docs/stub-registry.md 核对固定）。
 * #384 起本文件的十个函数全部落真身，名单清空。 */
const STUBBED_CALLS = [];

/**
 * Emuera 的整数除法（向零截断）：`CHARANUM*4/10` 这类判据在原作里是整型运算，
 * 用 JS 的浮点除法会在边界上差一档（1126-1127 之间）。
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const int_div = (a, b) => Math.trunc(a / b);

/**
 * CSVCALLNAME(NO:cid) 的等价物：角色预设（yml/CharaN.yml）里的呼び名。
 * 见文件头「有意偏离」条——不用三段静态寻址，它会在无该预设键的角色上崩溃。
 * @param {number} cid 角色 ID（= 原作 NO）
 * @returns {string} 空串表示无预设
 */
function csv_callname(cid) {
  const preset = era.get(`chara:${cid}`);
  return String(preset?.callname ?? '');
}

/**
 * @CHARA_NAME_RANDOM_DEFINE（:14-141）：按职业、种族与性别选择名字表并避免
 * 重复，末行 JUMP CHARA_NAME_DEFINE。
 *
 * @param {number} cid 角色 ID（原作 L_A）
 * @param {number} [type=-1] 0=和名、1=洋名、2=组合名、-1=自动
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {void} JUMP 不向调用点返回结果
 */
function chara_name_random_define(cid, type = -1, rand = default_rand) {
  let name_type = type;
  const talent = (index) => era.get(`talent:${cid}:${index}`) || 0;

  // :45-51 职业偏向：骑士偏洋名，巫女/忍者偏和名。
  if (name_type === -1) {
    if (talent(205) && rand(10) !== 0) {
      name_type = 1;
    } else if ((talent(206) || talent(207)) && rand(10) !== 0) {
      name_type = 0;
    }
  }

  // :55-93 种族偏向；人类、魔族及未知种族保持未指定。
  if (name_type === -1) {
    const race = era.get(`cflag:${cid}:314`) || 0; // CFLAG:314 种族
    if ([1, 3, 4, 5, 6, 7, 8, 10, 11].includes(race)) {
      name_type = 1;
    } else if (race === 2) {
      name_type = 0;
    }
  }

  // :95-96 和名有五分之三保持和名
  if (name_type === 0) {
    name_type = rand(5) % 2;
  }

  let nid;
  // :98 $SPAN_NAME_NUM —— 原作以 GOTO 重掷；已加入角色为空时一轮结束。
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

    // :122-123 重复检查：先清自身 NID，再找同 NID 的其他角色。
    //
    // 两个排除项都**不可观察**，因此不设变异条目（#384 返工记录）：
    //   - `other === cid` 与前一行 CFLAG:L_A:6 = -1 同效（自身这时读到 -1，
    //     而 L_NID 恒 >= 200，撞不上）；
    //   - MASTER 的 NID 恒 10000（:159 写死），而随机名编号的上限是
    //     4500 + CHINESE_NAME_COUNT - 1 = 5288（五条掷法里的最大值），
    //     够不着——原作的 `IF LOCAL > 0`（首个命中是 MASTER 时不重掷）
    //     在可达状态里同效。
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

    // :126-136 名字空间占满时改换类型
    const count = era.getAddedCharacters().length; // CHARANUM 的 ere 等价物
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

  // :141 JUMP CHARA_NAME_DEFINE(L_A,L_NID)：只把执行流交给目标，不返回结果
  chara_name_define(cid, nid);
}

/**
 * @CHARA_NAME_DEFINE（:147-202）：给角色定下名字（固定名表或随机组合名）。
 *
 * @param {number} cid 角色 ID（原作 L_A）
 * @param {number} [nid=-1] 固定名编号；-1 表示沿用 CFLAG:cid:6 现值
 * @returns {number|undefined} 特殊角色分支返回 0，其余路径不返回值（原作省略）
 */
function chara_name_define(cid, nid = -1) {
  const chara_no = cid; // NO:L_A——ere 的角色 ID 即原作 NO

  // :153-162 特殊角色使用特定名字
  if ((chara_no >= 17 && chara_no <= 40) || chara_no === 0) {
    const csv = csv_callname(chara_no);
    era.set(`callname:${cid}:-1`, csv); // :154 NAME:L_A '= CSVCALLNAME
    era.set(`callname:${cid}:-2`, csv); // :155 CALLNAME:L_A '= CSVCALLNAME
    // :159 定义 NID
    era.set(`cflag:${cid}:6`, 10_000 + chara_no);
    // :160 CALL RELATION_RENAME_REBUILD(L_A)
    relation_rename_rebuild(cid);
    return 0; // :161
  }

  // :165-170 NID 的取舍
  let name_id = nid;
  if (name_id < 0) {
    name_id = era.get(`cflag:${cid}:6`) || 0; // :166
  } else {
    era.set(`cflag:${cid}:6`, name_id); // :168
    relation_rename_rebuild(cid); // :169
  }

  // :173-202 固定名 或 随机名
  if (name_id < 1_000_000_000) {
    // :175 固定名列表（判的是声明尺寸，不是注册表）
    if (name_id < LIST_CHARA_NAME_SIZE) {
      const fixed = get_fixed_chara_name(name_id); // :176 LIST_CHARA_NAME:L_NID
      if (fixed.length > 0) {
        era.set(`callname:${cid}:-1`, fixed); // :179
        era.set(`callname:${cid}:-2`, fixed); // :180
      } else {
        // :184-186 名字没有被记录
        era.set(`callname:${cid}:-1`, '佳奈美');
        era.set(`callname:${cid}:-2`, '佳奈美');
      }
    } else {
      // :190-193 无效的 NID
      era.set(`callname:${cid}:-1`, '佳奈美');
      era.set(`callname:${cid}:-2`, '佳奈美');
      // :193 的钳位照抄，但它是**死写**：L_NID 在此之后不再被读，函数随即
      // 结束（原作同样如此）——值写不进 cflag、也影响不了任何输出。因此
      // 这一行的变异不可观察，不设变异条目（#384 返工记录）。
      name_id = LIST_CHARA_NAME_SIZE; // :193 L_NID = VARSIZE("LIST_CHARA_NAME")
    }
  } else {
    // :197-201 使用随机名
    const combined = cn_span_combine_name(name_id);
    era.set(`callname:${cid}:-1`, combined); // :199 NAME:L_A '= RESULTS
    era.set(`callname:${cid}:-2`, combined); // :200 CALLNAME:L_A '= RESULTS
  }
  return undefined;
}

/**
 * @CHARA_NAME_RESET（:209-218）：把一个角色的称呼重置为初始值。
 *
 * 进侵攻中的勇者（NO 17-40）取 CSV 呼び名，其余回落姓名本体。
 * @param {number} cid 角色 ID（原作 L_A）
 * @returns {void}
 */
function chara_name_reset(cid) {
  const callname =
    cid >= 17 && cid <= 40 // :212 INRANGE(NO:L_A, 17,40)
      ? csv_callname(cid) // :213 CSVCALLNAME(NO:L_A)
      : (era.get(`callname:${cid}:-1`) ?? ''); // :215 NAME:L_A
  era.set(`callname:${cid}:-2`, callname); // :218 SAVESTR:L_A '= CALLNAME:L_A
}

/**
 * @CN_REBUILD（:225-230）：把全体角色的存档字串按称呼重建（跳过 MASTER）。
 *
 * 原作以 LOCAL == 0 CONTINUE 跳过魔王——ere 的角色 ID 即原作序号，同一条
 * 判据写作 cid === 0。
 *
 * @returns {void}
 */
function cn_rebuild() {
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) {
      continue; // :227-228 SIF LOCAL == 0 CONTINUE
    }
    era.set(`callname:${cid}:-2`, era.get(`callname:${cid}:-1`) ?? ''); // :229
  }
}

/**
 * @NID_FINDCHARAS（:236-250）：按固定名编号找出全部同 NID 角色，逐条写入
 * RESULT 数组，末行把哨兵 -1 写到「已写入条数」那一格，最后返回 RESULT:0。
 *
 * 两处原作的边角 1:1 保留，都不改：
 *   - `VARSET RESULT`（:241）把整份数组清零，故**无命中**时 :249 的 -1
 *     落在第 0 格、成为返回值（而不是「返回 0」）；
 *   - 有命中时 :249 写的是尾部哨兵，第 0 格仍是**首个命中角色号**。
 * 全库零调用者（只有 :236 这一处定义），不影响任何现行为；照抄是为了
 * 将来接上调用方时语义与原文一致。
 *
 * @param {number} nid 固定名编号
 * @returns {number} 首个同 NID 角色号；无命中时 -1
 */
function nid_findcharas(nid) {
  const found = []; // :241 VARSET RESULT —— 整份清零的等价物
  for (const cid of era.getAddedCharacters()) {
    if ((era.get(`cflag:${cid}:6`) || 0) === nid) {
      found.push(cid); // :244-245 RESULT:L_I = LOCAL
    }
  }
  found.push(-1); // :249 RESULT:L_I = -1（L_I = 已写入条数）
  // :250 RETURN RESULT:0——sentinel 保证数组非空，首元恒有值
  return found[0];
}

/**
 * @NID_GET_TYPE（:255-265）：返回 NID 对应名字的类型，0 = 和名，1 = 洋名，
 * 2 = 组合名。
 *
 * 分支顺序 1:1 保留原作，含一处**已知的重叠缺陷**：[3000,4059) 的男性和名
 * 编号先撞上 `L_NID >= 2000` 那条而落进「洋名」。不是本票能修的范围，
 * chara-self-call.test.js 已按此行为钉住（#383 的用例）。
 *
 * @param {number} nid 固定名编号
 * @returns {0|1|2} 类型
 */
function nid_get_type(nid) {
  if (nid > 1_000_000_000) {
    return 2; // :259 组合名
  }
  if (nid < 200 || nid >= 2000) {
    return 1; // :261 洋名
  }
  if (nid < 1000 || nid >= 3000) {
    return 0; // :263 和名
  }
  return 1; // :265
}

/**
 * @CN_SPAN_COMBINE_NAME_NUM（:291-333）：生成随机假名组合名的编号。
 *
 * 组合规则：长度 1-3 段，每段 3 位数；首段的百位取 2（通用两音）/3（通用
 * 一音），非首段的百位取 5（终端的 ー/ン）；末段落在 400 段（终端两音）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {number} 组合名编号（>= 2_000_000_000）
 */
function cn_span_combine_name_num(rand = default_rand) {
  // :299 L_L = 3 - RAND:2 - RAND:3 % 2 —— 3, 2, 1
  const length = 3 - rand(2) - (rand(3) % 2);
  let result = 0; // :298/:301 L_RET

  for (let i = 0; i < length; i += 1) {
    result *= 1000; // :303

    let mode;
    // :305-310 80% 的第一轮循环取两音段
    if (i === 0 && length > 1 && rand(5) !== 0) {
      mode = 2;
    } else {
      mode = 1;
    }

    let piece;
    if (mode === 1) {
      // :313-318 第一次循环
      if ((rand(3) === 0 && length !== 1) || (rand(2) === 0 && length === 3)) {
        piece = rand(9) + 300; // :315 通用一音
      } else {
        piece = rand(30) + 200; // :317 通用两音
      }
    } else if (rand(8) === 0 && length !== 1) {
      // :320-321
      piece = rand(2) + 500; // :321 终端的 ー/ン
    } else {
      piece = rand(27) + 400; // :323 终端两音
    }
    result += piece; // :326

    // :327-328 SIF L_I < 0 BREAK —— FOR 计数器恒非负，不可达（文件头）
    // :329-330 SIF L_L == 1 && (L_N == 200 || …) L_I -= 10 —— 只由上一行放行，
    //   同样不可达（:320 的守卫已排除 L_L == 1 落进 200 段）
  }

  return result + 2_000_000_000; // :332
}

/**
 * @CN_SPAN_COMBINE_NAME（:339-604）：按组合名编号拼出名字串。
 *
 * :344 起的两张表以「数百位」分档：300/500 段是一音、400 段是终端两音，
 * ARG > 2e9（ver0.2）时用 SUBSTRING 逐段切片并处理「ア/イ/ウ/エ/オ/ン/ー」
 * 不再作段首的连接处理；ARG 落在 [1e9,2e9]（ver0.1）时用另一张表逐段自拼。
 *
 * @param {number} arg 组合名编号
 * @returns {string} 名字串（原作经 RESULTS 回传）
 */
function cn_span_combine_name(arg) {
  let acc = ''; // :340 LOCALS:9 =
  let rest = arg % 1_000_000_000; // :342 N = ARG % 1000000000

  if (arg > 2_000_000_000) {
    // ランダム名 ver0.2
    // :346-497 的 IF 链没有 ELSE：段值不在表里时（唯一的实例是 RAND:27+400
    // 掷出的 401）LOCALS 保持**上一轮的值**，随后的拼接照常执行——本实现
    // 用一个跨轮的 `word` 承接这条语义（首轮落空时它是空串，等价于拼上空串）。
    let word = '';
    while (rest > 1) {
      const piece = rest % 1000;
      word = COMBINE_NAME_V2.get(piece) ?? word;
      // :498-503 与前一段相接时，本段段首的 ア/イ/ウ/エ/オ/ン/ー 被吃掉
      // （吃掉首字，不是丢掉整段）。「相接」= 已累积有内容——首段没有
      // 前文可接，原样保留，否则单段名「アー」「オン」会整个变空。
      const first = word.slice(0, 1);
      const merged =
        acc !== '' && MERGE_HEAD_KANA.includes(first) ? word.slice(1) : word;
      // :504-508 前一段以「ッ」结尾时，本段的「ー」段丢掉尾部两字
      if (acc.endsWith(SOKUON) && first === CHOON) {
        acc = acc.slice(0, -2);
      }
      acc += merged; // :511 LOCALS:9 += LOCALS:1
      rest = Math.trunc(rest / 1000); // :512
    }
  } else if (arg > 1_000_000_000) {
    // ランダム名 ver0.1（:515 的 ELSEIF B > 1000000000）
    while (rest > 1) {
      const piece = rest % 1000;
      acc += COMBINE_NAME_V1.get(piece) ?? ''; // :518-598 逐档自拼
      rest = Math.trunc(rest / 1000); // :599
    }
  }

  return acc; // :603 RESULTS '= LOCALS:9
}

/**
 * :500 段首会被前一段吃掉的假名。原作是一串 `LOCALS:1 == "ア" || …` 的
 * 比较，本实现收成一个字符串 + includes；**这七个假名按整串豁免**
 * （tools/lang-table.js 的 EXEMPT_STRINGS，与两张音节表同款理由）。
 */
const MERGE_HEAD_KANA = 'アイウエオンー';

/** :504 促音「ッ」：它能出现在段首（:481 的「ッラ」）但不在吃字之列 */
const SOKUON = 'ッ';

/** :504 长音符「ー」 */
const CHOON = 'ー';

/**
 * :348-496 ver0.2 档位表，逐行「段值 假名」。
 *
 * **为什么是一整块字符串而不是 Map 字面量**：表值全是假名（原作名字生成器的
 * 音节表，汉化版与 target/ 逐字相同、不是译文残留），而简体锁按字符串字面量
 * 逐个判定、豁免粒度是「整串」——一行一个假名的字面量要 74 条豁免，整表一块
 * 只要 1 条（见 tools/lang-table.js 的 EXEMPT_STRINGS）。
 *
 * 分段与原行号（本表按原作 :348-496 的顺序逐行照录）：
 *   :409-426 汎用一音（300-308）、:428-481 終端（400-426）、:483-486 終端一音
 *   （500/501）、:488-495 使用しない（900-903）。:346-497 是外层
 *   `WHILE N > 1` 循环体，:504 是拼字前的「ッ + ー」判定。
 *
 * 表里**没有 401**：原作 :428-431 是 `ELSEIF N:1 == 400`（:429 ヴィア）紧跟
 * 一条重复的 `ELSEIF N:1 == 400`（:430，オン），先中者胜、后一条是死档；
 * 而 RAND:27+400 能掷出 401，原作在 IF 链上落空——落空时 LOCALS 保持上一轮
 * 的值，`cn_span_combine_name` 因此用「未命中沿用上一段」承接（见该函数）。
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

/** :518-598 ver0.1 档位表，逐行「段值 假名」（同上，块状的理由见上一条） */
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

/** :518-598 ver0.1 表：段值 → 假名（自拼形态，与 ver0.2 是两套档位） */

module.exports = {
  chara_name_define,
  chara_name_random_define,
  chara_name_reset,
  cn_rebuild,
  cn_span_combine_name,
  cn_span_combine_name_num,
  nid_findcharas,
  nid_get_type,
  STUBBED_CALLS,
};
