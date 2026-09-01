/**
 * @file 勇者来袭（issue #171，阶段 3 H2）：@ENTER_ENEMY 与三个附属函数。
 *
 * 源: target/ERB/EVENT/ENTER_ENEMY.ERB  @ENTER_ENEMY（:1-164）、
 *       @K_11_LILY（:169-221，村娘姐姐·莉莉的特殊来袭）、
 *       @K_34_crazylord（:224-323，狂王替身·葵希罗的特殊来袭）、
 *       @GET_ENEMY（:326-405，奴隶确定入手；调用方在侵略线
 *       INVASION.ERB:688/:884，阶段 5 接线，本文件先交出真身）
 *
 * 调用频率是**每日**：EVENT_TURNEND.ERB:93 的 CALL ENTER_ENEMY,0 每次换日
 * 都跑，另有四处按 DAY 的追加调用（ere/event/event-turnend.js 的五个调用
 * 点）。原作「月末才来」的守卫（:11-13）在汉化版里被**注释掉了**，LOCAL 也
 * 从 RAND:10 + 20 写死成 10（:7-8）——这是原作现状，1:1 保留、别「修好」
 * 它（#14 登记；钉住用例 + 反向变异条目防守）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - **SAVESTR 无引擎通道**：EraElectron 4.8.0 的 bundle 里没有 savestr
 *     表（app.asar 全文零命中；寻址 `savestr:N` 经 engine-bundle 驱动引擎
 *     寻址层实测走 era.error「key error in getter/setter!」后静默丢弃）。
 *     原作 SAVESTR:A 的角色名承载按 #5 决议落到 callname:${id}:-1
 *     （addCharacter 从预设写入，test/chara-yml.test.js 锁定）：
 *     `SAVESTR:A = %NAME:A%` 化解为读该键（写入是 no-op——callname:-1 已
 *     是该值），`PRINTS SAVESTR:A` 同读。CSTR:A:1 = %NAME:A% 照写（引擎
 *     有 cstr 表，子桶由 addCharacter 建，engine-bundle 实测可写）；
 *   - 原作经全局 A / RESULT / LOCAL 换手（A = CHARANUM - 1、A = RESULT、
 *     LOCAL 判异国），ere 侧显式传参（#5 决议第六条）。`A = CHARANUM - 1`
 *     取注册序末位＝刚加入者，ere 扁平化（#21）直接用刚 addCharacter 的
 *     角色号；RESULT 即 CHAR_MAKE 的返回值；
 *   - ere 无全局 RAND 序列（#117 决议），随机经注入的 rand_n 掷出（缺省
 *     Math.random，测试注入定值序——chara-make.js 先例），并透传给
 *     CHAR_MAKE / CHAR_MAKE_INPORT。RAND(1,17) 是双参形式，值域
 *     [1,17)＝1..16（emuera-basic-agent-guide：双参数返回 [min,max)），
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
 *   - 初期座標 CFLAG:510/511 两行 1:1 保留（:140-154；@K_34 与 @GET_ENEMY
 *     各有一份复制段，三处同源）：原作注释「現在は死んでいる変数です／
 *     気が変わったときのために残しています」，但裁定 5（#168）让 2D 模式
 *     在 H12 变可达——按死代码删掉会在那张票埋坑；
 *   - 原作 PRINT/PRINTS 不换行、PRINTL 换行，同一显示行的拼接在 ere 侧
 *     归并为一次 era.print（引擎 print 每调用一行，dev-guides/06）；
 *   - CHAR_MAKE_INPORT 判定（RAND(ARG:0)）缺省 ARG:0 = 1 → RAND(1) 恒 0，
 *     恒进异国判定、存根恒 RETURN 0（ere/chara/char-make.js，#170）——
 *     即「异国的勇者」前缀当前不可达，结构 1:1 保留、随异国勇者票。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
// WEARING_CLOTH_ABLE 自 #215（J5）起为真身（ere/system/train/cloth.js）
const { wearing_cloth_able } = require('#/system/train/cloth');
const { chara } = require('#/facade/chara');
const { char_make, char_make_inport } = require('#/chara/char-make');
const { add_chara_ex } = require('#/chara/chara-ex');
const { stub_line, stub_line_wait } = require('#/utils/stub-line');
const { enterenemy_koujo } = require('#/kojo/kojo-system');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = [
  'SHOW_CHARA_INFO',
  'CHAR_BODY_GENERATE_WAPPED',
  'FAMILY_REGISTER',
];

/** MAX_CHARANUM（其他/VARIABLES.ERH:2 `#DEFINE MAX_CHARANUM 90`） */
const MAX_CHARANUM = 90;

/**
 * 原作 GETCHARA(n) 单参形态的等价物（event-endcheck.js 同款扁平化）：
 * 在场返回角色号（= cid，#21），不在场 -1。
 * @param {number} no 角色定义编号
 * @returns {number}
 */
function get_chara(no) {
  return era.getAddedCharacters().includes(no) ? no : -1;
}

/**
 * 原作 GETCHARA(キャラ番号, 0) 双参形态的 SP=0 语义（源 :51-52 的注释是
 * 该形态在全库的唯一用例与说明）：在场且该角色 CFLAG:0 == 0 → 注册番号；
 * 不在场、或 CFLAG:0 为 1（売却可）/2（助手可）→ -1——后一场合同一角色
 * 号的勇者会再次来袭。
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
 * 人数上限六分支（:35-47；@GET_ENEMY 的 :332-344 是同一段的复制，两处
 * 各自 1:1 保留）。命中任一分支 = 本次来袭整段取消（原作 RETURN 0）。
 * FLAG:82 人间界已出 ENDING_1 / 87·89·91 精灵·龙·天界征服 / 92 四方
 * 城塞（< 15 未全陷）——征服进度越深、可容纳的来袭者越多（STICK 修改，
 * :34 注释「按照侵攻进度限制勇者数量」）。
 * @returns {boolean} true = 人数已满，须中断
 */
function chara_cap_reached() {
  const charanum = era.getAddedCharacters().length;
  const f = (n) => era.get(`flag:${n}`) || 0;
  if (f(82) === 0 && charanum > 60) {
    return true; // :35-36
  }
  if (f(87) === 0 && f(89) === 0 && f(91) === 0 && charanum > 65) {
    return true; // :37-38
  }
  if (
    f(87) * f(89) === 0 &&
    f(89) * f(91) === 0 &&
    f(91) * f(87) === 0 &&
    charanum > 70
  ) {
    return true; // :39-40
  }
  if ((f(87) === 0 || f(89) === 0 || f(91) === 0) && charanum > 75) {
    return true; // :41-42
  }
  if (f(92) < 15 && charanum > 80) {
    return true; // :43-44
  }
  return charanum >= MAX_CHARANUM; // :45-46
}

/**
 * 初期座標段（:140-154；@K_34_crazylord 的 :306-317 与 @GET_ENEMY 的
 * :388-399 是同一段的复制，三处各自 1:1 保留——裁定 5 让 2D 模式在 H12
 * 可达，勿删）。
 * @param {(n: number) => number} rand_n RAND:N 随机源
 * @returns {[number, number]} [CFLAG:510（X 座標）, CFLAG:511（Y 座標）]
 */
function roll_initial_position(rand_n) {
  let x = rand_n(32); // LOCAL:0 = RAND:32
  let y = rand_n(32); // LOCAL:1 = RAND:32
  // :143-151 四分之一概率贴边（ELSEIF 链短路：首个掷中后不再掷）
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
 * @ENTER_ENEMY（:1-164）：勇者来袭的主体。
 *
 * 每日（换日）调用。ARG:0 = 0 通常来袭；> 0 为「知り合い・家族確定
 * エントリー」——该角色号确定登场，CHAR_MAKE 收 998（性格无指定）与
 * ARG:0（种族设定）。
 *
 * @param {number} [arg0] 原作 ARG:0（缺省 0）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN：1 = 有人来袭，0 = 早退
 *   （人数上限六分支 / 出于对魔王的恐惧）
 */
async function enter_enemy(arg0 = 0, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  // :7-8 LOCAL = 10（原 RAND:10 + 20 被写死）——原作现状，#14 登记，勿修
  // :10-13 月末才来的守卫（SIF DAY:2 > LOCAL && ARG:0 == 0 && FLAG:60 < 300
  //   → RETURN 0）在汉化版里被整段注释掉，1:1 保持死注释不移植（钉住
  //   用例证明「月末也照来」，反向变异条目防守「修好」它的手滑）

  // :14-16 莉莉出現（ARG:0 == 0 的通常来袭，或对方持 TALENT:村娘Ａ）
  // TALENT:村娘Ａ = talent:165（yml/Talent.yml id 165）
  if (arg0 === 0 || (era.get(`talent:${arg0}:165`) || 0) !== 0) {
    await k_11_lily();
  }

  // :18-19 狂王出现（无条件）
  await k_34_crazylord(rand_n);

  // :21-32 被注释掉的旗标段（フラグ確保 / 今いるキャラのフラグを消す），
  // 1:1 保持注释状态、不移植

  // :34-47 キャラが多すぎる場合中断（六分支）
  if (chara_cap_reached()) {
    return 0;
  }

  // :50 キャラのNOを選定——RAND(1,17) 双参 = [1,17) = 1..16（文件头）
  const chara_id = 1 + rand_n(16);

  // :53 GETBIT(FLAG:5,32)（原作调试位）|| GETCHARA(CHARA,0) == -1（不在场
  // 或已売却/助手化）才生成。FLAG:5 的位 32 超出 JS 位运算的 31 位界，
  // 按文件头用除法取位
  const settings = era.get('flag:5') || 0; // FLAG:5 开局设置位图
  const debug_bit32 = Math.floor(settings / 2 ** 32) % 2;
  // 原作 LOCAL / RESULT 跨 :53 的 IF 块存活（:99 A = RESULT 在 ENDIF 后），
  // 声明随之外提
  let foreign;
  let result; // 原作 RESULT：CHAR_MAKE 的返回（角色号）
  if (debug_bit32 === 1 || getchara_sp0(chara_id) === -1) {
    if (arg0 > 0) {
      // :55-60 知り合い確定エントリー
      foreign = false; // :56 LOCAL = 0
      era.addCharacter(chara_id); // :57 ADDCHARA CHARA
      await add_chara_ex(chara_id); // :58 CALL ADDCHARA_EX, CHARANUM-1（扁平化直传）
      result = await char_make(chara_id, 998, arg0, rand_n); // :59-60
    } else {
      // :62-72 異国の勇者の判定をする（缺省判定恒非异国，文件头）
      const inport = await char_make_inport(1, rand_n); // :63
      if (inport === 0) {
        foreign = false; // :65
        era.addCharacter(chara_id); // :66
        await add_chara_ex(chara_id); // :67
        result = await char_make(chara_id, 0, 0, rand_n); // :68-69
      } else {
        foreign = true; // :71
        result = inport; // 异国勇者已由 CHAR_MAKE_INPORT 生成，RESULT 沿用
      }
    }

    // :73-91 演出段（生成分支的公共尾部；同一显示行的 PRINT/PRINTS 归并，
    // 文件头）
    era.print('*****************************************'); // :73
    let head = '';
    if (foreign) {
      head += '异国的'; // :74-75 SIF LOCAL
    }
    if ((era.get(`talent:${result}:1000`) || 0) !== 0) {
      head += '异界的'; // :76-77 TALENT:RESULT:1000（异界素质）
    }
    // :78-82 冒险者（TALENT:RESULT:122 男人位非 0）/ 勇者
    head += (era.get(`talent:${result}:122`) || 0) !== 0 ? '冒险者' : '勇者';
    // :83-84 PRINTS SAVESTR:RESULT → callname:-1（#5 决议，文件头）
    const name = era.get(`callname:${result}:-1`) ?? '';
    era.print(`${head}${name}开始了地下城的攻略！`);
    era.print('*****************************************'); // :85
    await era.waitAnyKey(); // :86 WAIT

    // :87-91 勇者LVUP（FLAG:5 & 2：勇者基础等级校正开关）
    if ((settings & 2) !== 0) {
      // FLAG:60 勇者基礎レベル補正（event 域内直写）
      era.add('flag:60', 1);
      era.print(`勇者基础等级校正后现在是等级${era.get('flag:60') || 0}`);
      await era.waitAnyKey();
    }
  } else {
    // :93-96 同号勇者仍在队且未被処理 → 本次不来
    era.print('出于对魔王的恐惧，勇者没有出现。');
    await era.waitAnyKey();
    return 0;
  }

  // :98 PRINTL（空行）
  era.println();
  // :99 A = RESULT（生成角色的号；扁平化下即上面一路带下来的 result）
  const a = result;

  // :101-103 善悪値調整（下限 -100）
  if (chara(a).chara.善恶值 < -100) {
    chara(a).chara.善恶值 = -100;
  }

  // :105 来袭口上（向 21 个口上文件的 @ENTERENEMY_KOUJO_K<n> 分派——
  // 口上归裁定 7，随 #107）
  await enterenemy_koujo(a); // :432-440 CALL ENTERENEMY_KOUJO（TARGET = A）

  // :107-133 初期金钱（Ref DUNGEON_TOWN.ERB；七条修正 + 等级补正 + 下限）
  let money = 0; // :110 LOCAL = 0
  const tv = (n) => era.get(`talent:${a}:${n}`) || 0;
  if (tv(126) !== 0) {
    money += 1000; // :111-112 高人气ボーナス
  }
  if (tv(315) === 7 || tv(315) === 9) {
    money -= 500; // :114-115 物乞い・貧民は援助が少ない（出身）
  }
  if (tv(315) === 8 || tv(315) === 12 || tv(315) === 19) {
    money += 1500; // :117-118 貴族・聖女・軍人は多い
  }
  if (tv(316) === 2 || tv(316) === 11) {
    money -= 500; // :120-121 金のため・自暴自棄は援助が少ない（动机）
  }
  if (tv(316) === 9 || tv(316) === 13) {
    money += 500; // :123-124 国に命じられて・命令されては多い
  }
  money += era.get(`cflag:${a}:9`) || 0; // :128 レベル補正（CHAR_MAKE 置 1）
  if (money <= 0) {
    money = 0; // :131 对于不受欢迎的勇者（本次赠与额下限 0）
  }
  chara(a).dungeon.所持金 += money; // :133 CFLAG:A:580 += LOCAL

  // :135-156 初期座標（死变量保留，文件头）
  const [pos_x, pos_y] = roll_initial_position(rand_n);
  era.set(`cflag:${a}:510`, pos_x); // event 域内直写
  era.set(`cflag:${a}:511`, pos_y);

  // :158-162 GETBIT(FLAG:8,1) 时显示角色信息（FLAG:8 = 开局设置位图 2）
  const settings2 = era.get('flag:8') || 0;
  if (((settings2 >> 1) & 1) !== 0) {
    era.println();
    stub_line('SHOW_CHARA_INFO', '角色信息画面', '随角色信息票'); // :160
    era.println();
  }

  return 1; // :164
}

/**
 * @K_11_LILY（:169-221）：村娘姐姐（莉莉，角色 24）的特殊来袭。
 *
 * 条件：开局 200 日以上、玛奥（17）在场且持【爱】或【淫乱】、玛奥待机中、
 * 莉莉本人不在场、无登场済标志（FLAG:223）。登场后与普通勇者同样置
 * CFLAG:1 = 2（:209），但**不设**再起点 CFLAG:508（1:1 照搬原作）。
 *
 * @returns {Promise<number>} 原作无显式 RETURN（隐式 0）
 */
async function k_11_lily() {
  // :173-174 エントリーフラグが立っていると出ない（FLAG:223 莉莉登场済，
  // event 域内直写）
  if ((era.get('flag:223') || 0) === 1) {
    return 0;
  }
  // :176-177 200 日未満、玛奥不在场、莉莉已在场则不出
  if (era_flag.day_count < 200 || get_chara(17) < 0 || get_chara(24) > 0) {
    return 0;
  }
  const local = get_chara(17); // :178
  if (local < 0) {
    return 0; // :180-181 念のため
  }
  // :183-184 玛奥に爱（TALENT:85）も淫乱（TALENT:76）もないと出ない
  if (
    (era.get(`talent:${local}:85`) || 0) === 0 &&
    (era.get(`talent:${local}:76`) || 0) === 0
  ) {
    return 0;
  }
  // :186-187 玛奥が待機中（CFLAG:LOCAL:1 == 0）じゃないと出ない
  if (chara(local).invasion.状态 !== 0) {
    return 0;
  }

  era.addCharacter(24); // :189
  await add_chara_ex(24); // :190
  // :194 エントリーフラグを使用（SELL_CHARA.ERB の @KILL_TARGET 参照——
  // キャラが重複することはない）
  era.set('flag:223', 1);
  const a = 24; // :196 A = CHARANUM-1（扁平化：刚加入的 24）
  // :197 SAVESTR:A = %NAME:A% → callname:-1 承载（文件头，写入 no-op）
  const name = era.get(`callname:${a}:-1`) ?? '';
  chara(a).chara.加入时名字 = name; // :198 CSTR:A:1
  chara(a).chara.武装 = 40; // :200 初期装備：剑（CFLAG:A:550）
  era_flag.target = a; // :202 着替え装着
  wearing_cloth_able(a); // :203 —— #215（J5）真身
  await stub_line_wait(
    'CHAR_BODY_GENERATE_WAPPED',
    '角色身体数据生成',
    '随角色身体票',
  ); // :204
  stub_line('FAMILY_REGISTER', '家族登记', '随家族票'); // :205
  era_flag.target = 0; // :206 TARGET = FLAG:1（MASTER 恒角色 0，CONTEXT.md）
  chara(a).dungeon.侵攻阶层 = 1; // :207 CFLAG:A:501
  chara(a).event.侵攻度 = 0; // :208 CFLAG:A:502
  chara(a).invasion.状态 = 2; // :209 CFLAG:A:1 侵攻中
  era.println(); // :210
  era.print('*****************************************'); // :211
  era.print(
    '魔王的地下城附近的村子里有一对姐妹。她们没有双亲，一起在亲戚的家里生活。',
  ); // :212
  era.print(
    '某一天，魔王复活了，妹妹也同时下落不明。姐姐像是发疯一般地四处寻找，也拜托了勇者，却还是找不到妹妹。',
  ); // :213
  era.print(
    '又过了半年，姐姐终于下定了决心，前往魔王的地下城。一只手拿着提灯，另一只手握着勇者丢弃的旧剑。',
  ); // :214 PRINTW
  await era.waitAnyKey();
  era.println(); // :215
  era.print(`村娘${name}开始了地下城的攻略！`); // :216-218
  era.print('*****************************************'); // :219
  await enterenemy_koujo(a); // :432-440 CALL ENTERENEMY_KOUJO（TARGET = A）
  era.println(); // :221
  return 0;
}

/**
 * @K_34_crazylord（:224-323）：狂王替身（葵希罗，角色 34）的特殊来袭。
 *
 * 条件：350 日以上、金红桃（20）在场且持【爱】或【淫乱】、金红桃待机中、
 * 替身不在场、四方堡垒全陷落（FLAG:92 == 15）、无登场済标志（FLAG:224）。
 *
 * @param {(n: number) => number} [rand_n] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN 1（全部早退口 RETURN 0）
 */
async function k_34_crazylord(rand_n) {
  const roll = rand_n ?? ((n) => Math.floor(Math.random() * n));
  // :228-229 エントリーフラグが立っていると出ない（FLAG:224 狂王替身
  // 登场済，chara 属主——跨域走 era_flag 具名）
  if (era_flag.crazylord_entered === 1) {
    return 0;
  }
  // :231 350 天未满、没有金红桃、替身已存在
  if (era_flag.day_count < 350 || get_chara(20) < 0 || get_chara(34) > 0) {
    return 0;
  }
  const local = get_chara(20); // :233
  if (local < 0) {
    return 0; // :235-236 念のため
  }
  // :238-239 金红桃必须已获得【爱】（TALENT:85）或【淫乱】（TALENT:76）
  if (
    (era.get(`talent:${local}:85`) || 0) === 0 &&
    (era.get(`talent:${local}:76`) || 0) === 0
  ) {
    return 0;
  }
  // :241-242 金红桃调教中（CFLAG:LOCAL:1 != 0）则返回
  if (chara(local).invasion.状态 !== 0) {
    return 0;
  }
  // :244-245 四方堡垒全陷落才行（FLAG:92 == 15）
  if ((era.get('flag:92') || 0) !== 15) {
    return 0;
  }

  era.addCharacter(34); // :247
  await add_chara_ex(34); // :248
  era_flag.crazylord_entered = 1; // :252
  const a = 34; // :254 A = CHARANUM-1（扁平化：刚加入的 34）
  // :255 SAVESTR:A = %NAME:A% → callname:-1 承载（文件头，写入 no-op）
  const name = era.get(`callname:${a}:-1`) ?? '';
  chara(a).chara.加入时名字 = name; // :256 CSTR:A:1

  // :258-267 性别设定（FLAG:500 狂王性别：1 女性 / 0·2 扶她；其他值不写
  // ——原作 IF 无 else，1:1 保留）
  const gender = era.get('flag:500') || 0; // FLAG:500 狂王性别
  if (gender === 1) {
    chara(a).chara.扶她 = 0; // TALENT:A:121
    chara(a).chara.男人 = 0; // TALENT:A:122
  } else if (gender === 0 || gender === 2) {
    chara(a).chara.扶她 = 1;
    chara(a).chara.男人 = 0;
  }

  era_flag.target = a; // :270 着替え装着
  wearing_cloth_able(a); // :271 —— #215（J5）真身
  await stub_line_wait(
    'CHAR_BODY_GENERATE_WAPPED',
    '角色身体数据生成',
    '随角色身体票',
  ); // :272
  era_flag.target = 0; // :273 TARGET = FLAG:1（MASTER 恒角色 0）

  era.println(); // :275
  era.println(); // :276
  era.print(
    '*****************************************************************************',
  ); // :277
  era.print('狡猾的狂王，原来对作为情妇和亲卫队长的金红桃也不是推心置腹。'); // :278
  era.print('在对你已经唯命是从的金红桃身上，没有得到任何情报。'); // :279
  era.print('其它的人也是对狂王的行踪一无所知，各地的魔物也没有找到狂王。'); // :280
  era.print('正当你满脑疑惑和不安的时候，一个蓝发红眼的身影出现在地下城门口。'); // :281
  era.print('迈着悠闲的步伐，一抬手就将守门的怪物全灭了，是狂王？！'); // :282
  era.print('不对，这幽波纹的流动，证明了她只是狂王的替身！'); // :283
  era.print(
    '既是她，也不是她…………但不管如何，她带着再次封印你的斗志，向你冲过来了！！',
  ); // :284
  era.print(''); // :285 PRINTW（空）
  await era.waitAnyKey();
  era.println(); // :286
  era.print(`狂王的替身${name}`); // :287-288 PRINT 狂王的替身 + PRINTL 葵希罗
  era.print('开始了地下城的攻略！'); // :289
  era.print(
    '*****************************************************************************',
  ); // :290
  await enterenemy_koujo(a); // :432-440 CALL ENTERENEMY_KOUJO（TARGET = A）
  era.println(); // :292
  era.println(); // :293
  // :294-295 仪式性确认输入（无分支；printButton 的偏离说明见
  // event-ending.js 文件头）
  era.printButton('夭寿啦！！来人哪！！护驾？！！！护驾？！～！？！！！', 0);
  await era.input();

  // :296-300 侵入階層・侵攻度・侵攻中・再起点設定
  chara(a).dungeon.侵攻阶层 = 1; // :297
  chara(a).event.侵攻度 = 0; // :298
  chara(a).invasion.状态 = 2; // :299
  chara(a).dungeon.再起点 = 3; // :300

  // :303 ランダム名前決定（CFLAG:A:6）
  chara(a).chara.随机名编号 = roll(80);

  // :305-320 初期座標（死变量保留，文件头）
  const [pos_x, pos_y] = roll_initial_position(roll);
  era.set(`cflag:${a}:510`, pos_x);
  era.set(`cflag:${a}:511`, pos_y);

  return 1; // :323
}

/**
 * @GET_ENEMY（:326-405）：奴隷確定入手（俘虏一名勇者直接入库）。
 *
 * 与 @ENTER_ENEMY 的差异：异国判定掷 RAND(10)（十分之一概率）；生成后
 * CFLAG:1 = 0（**不**侵攻——是被俘虏的奴隶，:384）；无口上调用、无初期
 * 金钱段。调用方在侵略线（INVASION.ERB:688/:884，阶段 5 接线）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN A（生成角色号）；人数上限早退 0
 */
async function get_enemy(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));

  // :331-344 キャラが多すぎる場合中断（六分支，与主体同源的复制段）
  if (chara_cap_reached()) {
    return 0;
  }

  // :347 キャラのNOを選定（[1,17) = 1..16，文件头）
  const chara_id = 1 + rand_n(16);

  // :349-359 異国の勇者の判定をする（RAND(10) 十分之一概率为 0 → 判定
  // 通过、存根恒 RETURN 0 → 恒走生成分支）
  const inport = await char_make_inport(10, rand_n); // :350
  let result;
  if (inport === 0) {
    era.addCharacter(chara_id); // :353
    await add_chara_ex(chara_id); // :354
    result = await char_make(chara_id, 0, 0, rand_n); // :355-356
  } else {
    result = inport; // :358 LOCAL = 1（异国路径，RESULT 沿用）
  }

  // :360-373 演出段（*** 框 + 前缀 + 名字 + 被俘虏了！）
  era.print('*****************************************'); // :360
  let head = '';
  if (inport !== 0) {
    head += '异国的'; // :361-362 SIF LOCAL
  }
  if ((era.get(`talent:${result}:1000`) || 0) !== 0) {
    head += '异界的'; // :363-364
  }
  head += (era.get(`talent:${result}:122`) || 0) !== 0 ? '冒险者' : '勇者'; // :365-369
  const name = era.get(`callname:${result}:-1`) ?? ''; // :370 PRINTS SAVESTR:RESULT
  era.print(`${head}${name}被俘虏了！`); // :371
  era.print('*****************************************'); // :372
  await era.waitAnyKey(); // :373 WAIT
  era.println(); // :374

  // :375 A = RESULT
  const a = result;

  // :377-379 カルマ調整（下限 -100）
  if (chara(a).chara.善恶值 < -100) {
    chara(a).chara.善恶值 = -100;
  }

  // :381-385 侵入階層・侵攻度・侵攻中・再起ポイント設定（1 = 俘虏不侵攻）
  chara(a).dungeon.侵攻阶层 = 1; // :382
  chara(a).event.侵攻度 = 0; // :383
  chara(a).invasion.状态 = 0; // :384 CFLAG:A:1 = 0（与主体的 2 相对）
  chara(a).dungeon.再起点 = 3; // :385

  // :387-402 初期座標（死变量保留，文件头）
  const [pos_x, pos_y] = roll_initial_position(rand_n);
  era.set(`cflag:${a}:510`, pos_x);
  era.set(`cflag:${a}:511`, pos_y);

  return a; // :405
}

module.exports = {
  STUBBED_CALLS,
  MAX_CHARANUM,
  enter_enemy,
  k_11_lily,
  k_34_crazylord,
  get_enemy,
  get_chara,
  getchara_sp0,
};
