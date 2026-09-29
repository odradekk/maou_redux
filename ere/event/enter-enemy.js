/**
 * @file 勇者来袭（issue #171，阶段 3 H2）：enter_enemy 与三个附属函数。
 *
 * 调用频率是**每日**：回合结算每次换日都跑，
 * 另有四处按 DAY 的追加调用（ere/event/event-turnend.js 的五个调用点）。
 * 月末休战的检查在原流程里就被注释掉，移植不恢复（#574 第 4 条），勇者每日
 * 来袭。
 * 移植说明（有意偏离，均注明依据）：
 *   - **SAVESTR 无引擎通道**：EraElectron 4.8.0 的 bundle 里没有 savestr
 *     表（app.asar 全文零命中；寻址 `savestr:N` 经 engine-bundle 驱动引擎
 *     寻址层实测走 era.error「key error in getter/setter!」后静默丢弃）。
 *     原流程 SAVESTR:A 的角色名承载按 #5 决议落到 callname:${id}:-1
 *     （addCharacter 从预设写入，test/chara-yml.test.js 锁定）：
 *     `SAVESTR:A = %NAME:A%` 化解为读该键（写入是 no-op——callname:-1 已
 *     是该值），`PRINTS SAVESTR:A` 同读。CSTR:A:1 = %NAME:A% 照写（引擎
 *     有 cstr 表，子桶由 addCharacter 建，engine-bundle 实测可写）；
 *   - 原流程经全局 A / RESULT / LOCAL 换手（A = CHARANUM - 1、A = RESULT、
 *     LOCAL 判异国），ere 侧显式传参（#5 决议第六条）。`A = CHARANUM - 1`
 *     取注册序末位＝刚加入者，ere 扁平化（#21）直接用刚 addCharacter 的
 *     角色号；RESULT 即 char_make 的返回值；
 *   - ere 无全局 RAND 序列（#117 决议），随机经注入的 rand_n 掷出（缺省
 *     Math.random，测试注入定值序——chara-make.js 先例），并透传给
 *     char_make / char_make_inport。RAND(1,17) 是双参形式，值域
 *     [1,17)＝1..16（双参 RAND 返回 [min,max)），
 *     不含 17（玛奥）——勇者池正是 Chara1-16；
 *   - GETBIT(FLAG:5,32)：JS 位运算符按 32 位截断（x >> 32 === x >> 0），
 *     位 32 用除法取位（Math.floor(v / 2**32) % 2）；FLAG:5 & 2 等 31 位
 *     内的按位与不受影响；
 *   - 跨域写一律走门面（#71：属主域门面 setter；本文件属 event 域）：
 *     cflag:1（invasion）、cflag:501/508/580（dungeon）、cflag:550/6/151、
 *     talent:121/122 与 cstr:1（chara）、flag:224（chara，经
 *     era_flag.crazylord_entered）。cflag:502/510/511 与 flag:60/223 属主
 *     是 event（域内裸寻址即合法，#70），其中 502 沿用既有门面字段
 *     chara(cid).event.侵攻度；
 *   - 初期座標 CFLAG:510/511 两行照写（K_34 与 GET_ENEMY 各有一份复制
 *     段，三处同源）：这两行原本是死变量备注「現在は死んでいる変数です／
 *     気が変わったときのために残しています」，但结论 5（#168）让 2D 模式
 *     变可达——按死代码删掉会在那张票埋坑；
 *   - 原流程 PRINT/PRINTS 不换行、PRINTL 换行，同一显示行的拼接在 ere 侧
 *     归并为一次 era.print（引擎 print 每调用一行，dev-guides/06）；
 *   - CHAR_MAKE_INPORT 判定（RAND(ARG:0)）缺省 ARG:0 = 1 → RAND(1) 恒 0，
 *     恒进异国判定。#394 起判定通过后进的是真身（ere/chara/chara-
 *     make-inport.js），它只在 `FLAG:76 > 0` 且有可用通信记录时才建角色；
 *     默认档（FLAG:76 = 0，MAOUNET 菜单设定）下恒早退 0，「异国的勇者」
 *     前缀仍不可达——与 #170 时的可观察行为相同，但成因换成了真身的条件。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
// WEARING_CLOTH_ABLE 自 #215（J5）起为真身（ere/system/train/cloth.js）
const { wearing_cloth_able } = require('#/system/train/cloth');
const { chara } = require('#/facade/chara');
const { char_make, char_make_inport } = require('#/chara/char-make');
const { add_chara_ex } = require('#/chara/chara-ex');
const { family_register } = require('#/chara/chara-family');
const { char_body_generate_wapped } = require('#/chara/chara-body'); // #385 起真身
const { show_chara_info } = require('#/page/page-chara-info-show'); // #390 起真身
const { enterenemy_koujo } = require('#/kojo/kojo-system');

/** 在场角色数上限（MAX_CHARANUM = 90） */
const MAX_CHARANUM = 90;

/**
 * GETCHARA(n) 单参形式的等价物（event-endcheck.js 同款扁平化）：
 * 在场返回角色号（= cid，#21），不在场 -1。
 * @param {number} no 角色定义编号
 * @returns {number}
 */
function get_chara(no) {
  return era.getAddedCharacters().includes(no) ? no : -1;
}

/**
 * GETCHARA(キャラ番号, 0) 双参形式的 SP=0 语义：在场且该角色
 * CFLAG:0 == 0 → 注册番号；不在场、或 CFLAG:0 为 1（売却可）/2（助手可）
 * → -1——后一场合同一角色号的勇者会再次来袭。
 * @param {number} no 角色定义编号
 * @returns {number}
 */
function getchara_sp0(no) {
  if (!era.getAddedCharacters().includes(no)) {
    return -1;
  }
  return (era.get(`cflag:${no}:0`) || 0) === 0 ? no : -1;
}

/**
 * 人数上限六分支（GET_ENEMY 有一段同构复制，两处各自照写）。命中任一分支
 * = 本次来袭整段取消（RETURN 0）。
 * FLAG:82 人间界已出 ENDING_1 / 87·89·91 精灵·龙·天界征服 / 92 四方
 * 城塞（< 15 未全陷）——征服进度越深、可容纳的来袭者越多（修改点注释
 * 「按照侵攻进度限制勇者数量」）。
 * @returns {boolean} true = 人数已满，须中断
 */
function chara_cap_reached() {
  const charanum = era.getAddedCharacters().length;
  const f = (n) => era.get(`flag:${n}`) || 0;
  if (f(82) === 0 && charanum > 60) {
    return true;
  }
  if (f(87) === 0 && f(89) === 0 && f(91) === 0 && charanum > 65) {
    return true;
  }
  if (
    f(87) * f(89) === 0 &&
    f(89) * f(91) === 0 &&
    f(91) * f(87) === 0 &&
    charanum > 70
  ) {
    return true;
  }
  if ((f(87) === 0 || f(89) === 0 || f(91) === 0) && charanum > 75) {
    return true;
  }
  if (f(92) < 15 && charanum > 80) {
    return true;
  }
  return charanum >= MAX_CHARANUM;
}

/**
 * 初期座標段（K_34_crazylord 与 GET_ENEMY 各有一份同构复制，三处各自
 * 照写——结论 5 让 2D 模式可达，勿删）。
 * @param {(n: number) => number} rand_n 随机源
 * @returns {[number, number]} [CFLAG:510（X 座標）, CFLAG:511（Y 座標）]
 */
function roll_initial_position(rand_n) {
  let x = rand_n(32); // LOCAL:0 = RAND:32
  let y = rand_n(32); // LOCAL:1 = RAND:32
  // 四分之一概率贴边（ELSEIF 链短路：首个掷中后不再掷）
  if (rand_n(4) === 0) {
    x = 0;
  } else if (rand_n(3) === 0) {
    y = 0;
  } else if (rand_n(2) === 0) {
    x = 31;
  } else {
    y = 31;
  }
  return [x, y];
}

/**
 * enter_enemy：勇者来袭的主体。
 *
 * 每日（换日）调用。arg0 = 0 通常来袭；> 0 为「知り合い・家族確定
 * エントリー」——该角色号确定登场，char_make 收 998（性格无指定）与
 * arg0（种族设定）。
 *
 * @param {number} [arg0] 来袭模式（缺省 0）
 * @param {(n: number) => number} [rand] 随机源（缺省均匀随机）
 * @returns {Promise<number>} 1 = 有人来袭，0 = 早退
 *   （人数上限六分支 / 出于对魔王的恐惧）
 */
async function enter_enemy(arg0 = 0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  // LOCAL = 10 写死（早退阈值用）：原月末检查要求 DAY:2 > LOCAL，该检查
  // 被注释掉的功能不恢复，每日来袭（#574 第 4 条）

  // 莉莉出現（ARG:0 == 0 的通常来袭，或对方持 TALENT:村娘Ａ）
  // TALENT:村娘Ａ = talent:165（yml/Talent.yml id 165）
  if (arg0 === 0 || (era.get(`talent:${arg0}:165`) || 0) !== 0) {
    await k_11_lily(rand_n);
  }

  // 狂王出现（无条件）
  await k_34_crazylord(rand_n);

  // 被注释掉的旗标段（フラグ確保 / 今いるキャラのフラグを消す）保持
  // 注释状态、不移植

  // キャラが多すぎる場合中断（六分支）
  if (chara_cap_reached()) {
    return 0;
  }

  // キャラのNOを選定——值域 [1,17) = 1..16（文件头）
  const chara_id = 1 + rand_n(16);

  // GETBIT(FLAG:5,32)（调试位）|| GETCHARA(CHARA,0) == -1（不在场
  // 或已売却/助手化）才生成。FLAG:5 的位 32 超出 JS 位运算的 31 位界，
  // 按文件头用除法取位
  const settings = era.get('flag:5') || 0; // FLAG:5 开局设置位图
  const debug_bit32 = Math.floor(settings / 2 ** 32) % 2;
  // LOCAL / RESULT 跨段存活（A = RESULT 在 ENDIF 后），
  // 声明随之外提
  let foreign;
  let result; // char_make 的返回（角色号）
  if (debug_bit32 === 1 || getchara_sp0(chara_id) === -1) {
    if (arg0 > 0) {
      // 知り合い確定エントリー
      foreign = false; // LOCAL = 0
      era.addCharacter(chara_id); // ADDCHARA CHARA
      await add_chara_ex(chara_id); // add_chara_ex（扁平化直传）
      result = await char_make(chara_id, 998, arg0, rand_n);
    } else {
      // 異国の勇者の判定をする（缺省判定恒非异国，文件头）
      const inport = await char_make_inport(1, rand_n);
      if (inport === 0) {
        foreign = false;
        era.addCharacter(chara_id);
        await add_chara_ex(chara_id);
        result = await char_make(chara_id, 0, 0, rand_n);
      } else {
        foreign = true;
        result = inport; // 异国勇者已由 CHAR_MAKE_INPORT 生成，RESULT 沿用
      }
    }

    // 演出段（生成分支的公共尾部；同一显示行的 PRINT/PRINTS 归并，
    // 文件头）
    era.print('*****************************************');
    let head = '';
    if (foreign) {
      head += '异国的'; // SIF LOCAL
    }
    if ((era.get(`talent:${result}:1000`) || 0) !== 0) {
      head += '异界的'; // TALENT:RESULT:1000（异界素质）
    }
    // 冒险者（TALENT:RESULT:122 男人位非 0）/ 勇者
    head += (era.get(`talent:${result}:122`) || 0) !== 0 ? '冒险者' : '勇者';
    // 角色名读 callname:-1（#5 决议，文件头）
    const name = era.get(`callname:${result}:-1`) ?? '';
    era.print(`${head}${name}开始了地下城的攻略！`);
    era.print('*****************************************');
    await era.waitAnyKey(); // WAIT

    // 勇者LVUP（FLAG:5 & 2：勇者基础等级校正开关）
    if ((settings & 2) !== 0) {
      // FLAG:60 勇者基礎レベル補正（event 域内直写）
      era.add('flag:60', 1);
      era.print(`勇者基础等级校正后现在是等级${era.get('flag:60') || 0}`);
      await era.waitAnyKey();
    }
  } else {
    // 同号勇者仍在队且未被処理 → 本次不来
    era.print('出于对魔王的恐惧，勇者没有出现。');
    await era.waitAnyKey();
    return 0;
  }

  // 空行
  era.println();
  // A = RESULT（生成角色的号；扁平化下即上面一路带下来的 result）
  const a = result;

  // 善悪値調整（下限 -100）
  if (chara(a).chara.善恶值 < -100) {
    chara(a).chara.善恶值 = -100;
  }

  // 来袭口上（向 21 个口上文件的 ENTERENEMY_KOUJO_K<n> 分派）
  await enterenemy_koujo(a);
  // 初期金钱（七条修正 + 等级补正 + 下限）
  let money = 0; // LOCAL = 0
  const tv = (n) => era.get(`talent:${a}:${n}`) || 0;
  if (tv(126) !== 0) {
    money += 1000; // 高人气ボーナス
  }
  if (tv(315) === 7 || tv(315) === 9) {
    money -= 500; // 物乞い・貧民は援助が少ない（出身）
  }
  if (tv(315) === 8 || tv(315) === 12 || tv(315) === 19) {
    money += 1500; // 貴族・聖女・軍人は多い
  }
  if (tv(316) === 2 || tv(316) === 11) {
    money -= 500; // 金のため・自暴自棄は援助が少ない（动机）
  }
  if (tv(316) === 9 || tv(316) === 13) {
    money += 500; // 国に命じられて・命令されては多い
  }
  money += era.get(`cflag:${a}:9`) || 0; // レベル補正（CHAR_MAKE 置 1）
  if (money <= 0) {
    money = 0; // 对于不受欢迎的勇者（本次赠与额下限 0）
  }
  chara(a).dungeon.所持金 += money; // CFLAG:A:580 += LOCAL

  // 初期座標（死变量保留，文件头）
  const [pos_x, pos_y] = roll_initial_position(rand_n);
  era.set(`cflag:${a}:510`, pos_x); // event 域内直写
  era.set(`cflag:${a}:511`, pos_y);

  // GETBIT(FLAG:8,1) 时显示角色信息（FLAG:8 = 开局设置位图 2）
  const settings2 = era.get('flag:8') || 0;
  if (((settings2 >> 1) & 1) !== 0) {
    era.println(); // 空行：信息展示前隔一行
    await show_chara_info(a, -1, rand); // （#390 真身）目标 = 刚来袭的新勇者
    era.println(); // 空行：信息展示后隔一行
  }

  return 1;
}

/**
 * k_11_lily：村娘姐姐（莉莉，角色 24）的特殊来袭。
 *
 * 条件：开局 200 日以上、玛奥在场且持【爱】或【淫乱】、玛奥待机中、
 * 莉莉本人不在场、无登场済标志（FLAG:223）。登场后与普通勇者同样置
 * CFLAG:1 = 2，但**不设**再起点 CFLAG:508（按原样保留）。
 *
 * @returns {Promise<number>} 隐式 0
 */
async function k_11_lily(rand_n = (n) => Math.floor(Math.random() * n)) {
  // エントリーフラグが立っていると出ない（FLAG:223 莉莉登场済，
  // event 域内直写）
  if ((era.get('flag:223') || 0) === 1) {
    return 0;
  }
  // 200 日未満、玛奥不在场、莉莉已在场则不出
  if (era_flag.day_count < 200 || get_chara(17) < 0 || get_chara(24) > 0) {
    return 0;
  }
  const local = get_chara(17);
  if (local < 0) {
    return 0; // 念のため
  }
  // 玛奥に爱（TALENT:85）も淫乱（TALENT:76）もないと出ない
  if (
    (era.get(`talent:${local}:85`) || 0) === 0 &&
    (era.get(`talent:${local}:76`) || 0) === 0
  ) {
    return 0;
  }
  // 玛奥が待機中（CFLAG:LOCAL:1 == 0）じゃないと出ない
  if (chara(local).invasion.状态 !== 0) {
    return 0;
  }

  era.addCharacter(24);
  await add_chara_ex(24);
  // エントリーフラグを使用（登场済标志，防重复登场）
  era.set('flag:223', 1);
  const a = 24; // A = CHARANUM-1（扁平化：刚加入的 24）
  // SAVESTR:A = %NAME:A% → callname:-1 承载（文件头，写入 no-op）
  const name = era.get(`callname:${a}:-1`) ?? '';
  chara(a).chara.加入时名字 = name; // CSTR:A:1
  chara(a).chara.武装 = 40; // 初期装備：剑（CFLAG:A:550）
  era_flag.target = a; // 着替え装着
  wearing_cloth_able(a); // —— #215（J5）真身
  char_body_generate_wapped(a, rand_n); // —— #385 起真身
  family_register(a, rand_n);
  era_flag.target = 0; // TARGET = FLAG:1（MASTER 恒角色 0，CONTEXT.md）
  chara(a).dungeon.侵攻阶层 = 1; // CFLAG:A:501
  chara(a).event.侵攻度 = 0; // CFLAG:A:502
  chara(a).invasion.状态 = 2; // CFLAG:A:1 侵攻中
  era.println();
  era.print('*****************************************');
  era.print(
    '魔王的地下城附近的村子里有一对姐妹。她们没有双亲，一起在亲戚的家里生活。',
  );
  era.print(
    '某一天，魔王复活了，妹妹也同时下落不明。姐姐像是发疯一般地四处寻找，也拜托了勇者，却还是找不到妹妹。',
  );
  era.print(
    '又过了半年，姐姐终于下定了决心，前往魔王的地下城。一只手拿着提灯，另一只手握着勇者丢弃的旧剑。',
  );
  await era.waitAnyKey();
  era.println(); // 空行：叙述与点名之间隔一行
  era.print(`村娘${name}开始了地下城的攻略！`);
  era.print('*****************************************');
  await enterenemy_koujo(a);
  era.println();
  return 0;
}

/**
 * k_34_crazylord：狂王替身（葵希罗，角色 34）的特殊来袭。
 *
 * 条件：350 日以上、金红桃在场且持【爱】或【淫乱】、金红桃待机中、
 * 替身不在场、四方堡垒全陷落（FLAG:92 == 15）、无登场済标志（FLAG:224）。
 *
 * @param {(n: number) => number} [rand_n] 随机源（缺省均匀随机）
 * @returns {Promise<number>} 1（全部早退口 0）
 */
async function k_34_crazylord(rand_n) {
  const roll = rand_n ?? ((n) => Math.floor(Math.random() * n));
  // エントリーフラグが立っていると出ない（FLAG:224 狂王替身
  // 登场済，chara 属主——跨域走 era_flag 具名）
  if (era_flag.crazylord_entered === 1) {
    return 0;
  }
  // 350 天未满、没有金红桃、替身已存在
  if (era_flag.day_count < 350 || get_chara(20) < 0 || get_chara(34) > 0) {
    return 0;
  }
  const local = get_chara(20);
  if (local < 0) {
    return 0; // 念のため
  }
  // 金红桃必须已获得【爱】（TALENT:85）或【淫乱】（TALENT:76）
  if (
    (era.get(`talent:${local}:85`) || 0) === 0 &&
    (era.get(`talent:${local}:76`) || 0) === 0
  ) {
    return 0;
  }
  // 金红桃调教中（CFLAG:LOCAL:1 != 0）则返回
  if (chara(local).invasion.状态 !== 0) {
    return 0;
  }
  // 四方堡垒全陷落才行（FLAG:92 == 15）
  if ((era.get('flag:92') || 0) !== 15) {
    return 0;
  }

  era.addCharacter(34);
  await add_chara_ex(34);
  // MARK,4,3 的预设补偿不在这里：它写在 chara-ex.js 的 34 号扩展里，
  // 因为所有加入 34 号的路径都要过 ADDCHARA_EX——研究所复活也是（#548 返工）
  era_flag.crazylord_entered = 1;
  const a = 34; // A = CHARANUM-1（扁平化：刚加入的 34）
  // SAVESTR:A = %NAME:A% → callname:-1 承载（文件头，写入 no-op）
  const name = era.get(`callname:${a}:-1`) ?? '';
  chara(a).chara.加入时名字 = name; // CSTR:A:1

  // 性别设定（FLAG:500 狂王性别：1 女性 / 0·2 扶她；IF 无 else，其他值
  // 不写）
  const gender = era.get('flag:500') || 0; // FLAG:500 狂王性别
  if (gender === 1) {
    chara(a).chara.扶她 = 0; // TALENT:A:121
    chara(a).chara.男人 = 0; // TALENT:A:122
  } else if (gender === 0 || gender === 2) {
    chara(a).chara.扶她 = 1;
    chara(a).chara.男人 = 0;
  }

  era_flag.target = a; // 着替え装着
  wearing_cloth_able(a); // —— #215（J5）真身
  char_body_generate_wapped(a, rand_n); // —— #385 起真身
  era_flag.target = 0; // TARGET = FLAG:1（MASTER 恒角色 0）

  era.println();
  era.println();
  era.print(
    '*****************************************************************************',
  );
  era.print('狡猾的狂王，原来对作为情妇和亲卫队长的金红桃也不是推心置腹。');
  era.print('在对你已经唯命是从的金红桃身上，没有得到任何情报。');
  era.print('其它的人也是对狂王的行踪一无所知，各地的魔物也没有找到狂王。');
  era.print('正当你满脑疑惑和不安的时候，一个蓝发红眼的身影出现在地下城门口。');
  era.print('迈着悠闲的步伐，一抬手就将守门的怪物全灭了，是狂王？！');
  era.print('不对，这幽波纹的流动，证明了她只是狂王的替身！');
  era.print(
    '既是她，也不是她…………但不管如何，她带着再次封印你的斗志，向你冲过来了！！',
  );
  era.print(''); // PRINTW（空）
  await era.waitAnyKey();
  era.println(); // 空行：叙述与点名之间隔一行
  era.print(`狂王的替身${name}`); // 称号与名字同一行
  era.print('开始了地下城的攻略！');
  era.print(
    '*****************************************************************************',
  );
  await enterenemy_koujo(a);
  era.println();
  era.println();
  // 仪式性确认输入（无分支；printButton 的偏离说明见
  // event-ending.js 文件头）
  era.printButton('夭寿啦！！来人哪！！护驾？！！！护驾？！～！？！！！', 0);
  await era.input();

  // 侵入階層・侵攻度・侵攻中・再起点設定
  chara(a).dungeon.侵攻阶层 = 1;
  chara(a).event.侵攻度 = 0;
  chara(a).invasion.状态 = 2;
  chara(a).dungeon.再起点 = 3;

  // ランダム名前決定（CFLAG:A:6）
  chara(a).chara.随机名编号 = roll(80);

  // 初期座標（死变量保留，文件头）
  const [pos_x, pos_y] = roll_initial_position(roll);
  era.set(`cflag:${a}:510`, pos_x);
  era.set(`cflag:${a}:511`, pos_y);

  return 1;
}

/**
 * get_enemy：奴隷確定入手（俘虏一名勇者直接入库）。
 *
 * 与 enter_enemy 的差异：异国判定掷十分之一概率；生成后
 * CFLAG:1 = 0（**不**侵攻——是被俘虏的奴隶）；无口上调用、无初期
 * 金钱段。调用方在侵略线（阶段 5 接入）。
 *
 * @param {(n: number) => number} [rand] 随机源（缺省均匀随机）
 * @returns {Promise<number>} 生成角色号；人数上限早退 0
 */
async function get_enemy(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  // キャラが多すぎる場合中断（六分支，与主体同源的复制段）
  if (chara_cap_reached()) {
    return 0;
  }

  // キャラのNOを選定（[1,17) = 1..16，文件头）
  const chara_id = 1 + rand_n(16);

  // 異国の勇者の判定をする（RAND(10) 十分之一概率为 0 → 判定
  // 通过；#394 起真身在 FLAG:76 = 0 时恒早退 0 → 默认档仍走生成分支）
  const inport = await char_make_inport(10, rand_n);
  let result;
  if (inport === 0) {
    era.addCharacter(chara_id);
    await add_chara_ex(chara_id);
    result = await char_make(chara_id, 0, 0, rand_n);
  } else {
    result = inport; // LOCAL = 1（异国路径，RESULT 沿用）
  }

  // 演出段（*** 框 + 前缀 + 名字 + 被俘虏了！）
  era.print('*****************************************');
  let head = '';
  if (inport !== 0) {
    head += '异国的'; // 异国路径
  }
  if ((era.get(`talent:${result}:1000`) || 0) !== 0) {
    head += '异界的';
  }
  head += (era.get(`talent:${result}:122`) || 0) !== 0 ? '冒险者' : '勇者';
  const name = era.get(`callname:${result}:-1`) ?? ''; // 角色名
  era.print(`${head}${name}被俘虏了！`);
  era.print('*****************************************');
  await era.waitAnyKey(); // WAIT
  era.println();

  // A = RESULT
  const a = result;

  // カルマ調整（下限 -100）
  if (chara(a).chara.善恶值 < -100) {
    chara(a).chara.善恶值 = -100;
  }

  // 侵入階層・侵攻度・侵攻中・再起ポイント設定（1 = 俘虏不侵攻）
  chara(a).dungeon.侵攻阶层 = 1;
  chara(a).event.侵攻度 = 0;
  chara(a).invasion.状态 = 0; // CFLAG:A:1 = 0（与主体的 2 相对）
  chara(a).dungeon.再起点 = 3;

  // 初期座標（死变量保留，文件头）
  const [pos_x, pos_y] = roll_initial_position(rand_n);
  era.set(`cflag:${a}:510`, pos_x);
  era.set(`cflag:${a}:511`, pos_y);

  return a;
}

module.exports = {
  MAX_CHARANUM,
  enter_enemy,
  k_11_lily,
  k_34_crazylord,
  get_enemy,
  get_chara,
  getchara_sp0,
};
