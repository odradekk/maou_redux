/**
 * @file 强制肉偿（issue #544，S3）：魔改新增/强制肉偿.ERB 单函数移植。
 *
 * 源: target/ERB/魔改新增/强制肉偿.ERB  @强制肉偿（:2-117）
 *
 * == 入口 ==
 *
 * 唯一调用点是 DUNGEON_BITCH.ERB:77 的 `CALL 强制肉偿(ARG)`——债务
 * CFLAG:582 < -10000、非处女（!TALENT:0）、!RAND:3 三条同时成立时触发。
 * ere 落在 ere/kojo/kojo-dungeon-bitch.js 的 heroine_bitch（#544 换真身）。
 * 两个模块相互引用：该模块顶层 import 本文件的 forced_payment，本文件对
 * exp_bitch 走**函数内延迟 require**——循环由此在装载期被打断（不这样做
 * 就会在模块初始化时固化半成品导出，dungeon-trap.js:1996 的 #175 先例）。
 *
 * == 原作缺陷（1:1 保留，登记 #14） ==
 *
 *   1. `#DIMS ORAL / ANAL / SEX`（:5-7）只声明、全库无任何赋值点（实测
 *      grep 无写入），所以 `CALL EXP_BITCH(ARG,, ORAL, PLAY)`（:105 无条件
 *      一次，:107/:111 在 `IF TALENT:ARG:122` 两臂内各一次）传进
 *      @EXP_BITCH 的 TYPE 恒为空串（第二实参省略，PLACE 也是空串）——
 *      SELECTCASE 不落任何臂，EXP/JUEL **实际一个也不变**，只有紧跟其后
 *      的 PRINTFORML 声称「经验值上升了{PLAY}」「点数＋…」。#184 的
 *      exp_bitch 真身按 TYPE 分档，本文件按「实参是空串」调用三次，不臆改
 *      为 "ORAL"/"ANAL"/"SEX"；测试钉住「调用三次、TYPE 全空」与「除
 *      EXP:50/70 外 EXP/JUEL 全不变」。
 *   2. 拍片片酬 `COST*1/3 + RAND:100` 在显示（:92）与入账（:95）各求值
 *      一次，RAND:100 因此取两次——片酬显示值与实际入账值不相等。
 *
 * == PRINTFORM 的拼接 ==
 *
 * 原作 PRINTFORM 不换行，一串 PRINTFORM 拼成**一条**显示行。本文件与
 * kojo-dungeon-bitch.js（#184）同款，**逐条 ERB 输出语句一次 era.print**
 * ——保真锁（test/kojo-text-fidelity.test.js 锁 A–D）按「一条 ERB PRINT
 * 行 ↔ 一条 JS 输出语句」配对，见该文件头。代价是结算行（:78-86）、片酬
 * 行（:90-94、:96-100）这类拼接线在 ere 里各占一行：有意偏离，与 #184
 * 对 DUNGEON_BITCH.ERB:212-217 的既有处理一致。SETCOLORBYNAME /
 * RESETCOLOR（:79/:81/:83/:85、:91/:93/:97/:99）配色不做、逐条注释留痕
 * （#175 先例）。
 *
 * == 变量与依赖 ==
 *
 *   - CFLAG:ARG:582（欠金，负数）→ chara(arg).patch.借款（patch 域门面，
 *     dungeon-trap.js 的诈骗陷阱同款）；
 *   - EXP:70 拍摄经验属 train 域（ere/facade/chara-train.js 的访问器），
 *     跨域写与 ere/dungeon/dungeon-lovers.js:1203 同款；EXP:50 异常经验、
 *     EXP:0/1/5/20/22/74 走 dungeon 域访问器；
 *   - KARMA → ere/chara/chara-stats.js 的 karma；EXPNAME / PALAMNAME →
 *     ere/kojo/kojo-dungeon-bitch-log.js 的两个查表口。
 */

const era = require('#/era-electron');
const { karma } = require('#/chara/chara-stats');
const { expname, palamname } = require('#/kojo/kojo-dungeon-bitch-log');
const { chara } = require('#/facade/chara');
const { chara_callname } = require('#/utils/callname-utils');

/** 本文件存根化的原作调用名（#544 起全部接真身，名单已空） */
const STUBBED_CALLS = [];

/** 默认随机源（[0, n) 整数）；测试注入定值序 */
const default_rand = (n) => Math.floor(Math.random() * n);

/** 角色的显示名（%SAVESTR:ARG% 的等价物） */
const name_of = (cid) => chara_callname(cid);

/** CFLAG:ARG:582 欠金（负数）的读取口——结算行与片酬行的显示值 */
const debt_of = (cid) => chara(cid).patch.借款;

/**
 * :16 / :30 / :47 / :62 的分档条件（四档共用同一条件，三项析取）：
 * ABL:11（欲望）>= 3、ABL:37（卖淫中毒）非零、EXP:20（精液经验）>= 30。
 *
 * @param {number} arg 角色 ID
 * @returns {boolean} true = 高档（PLAY/COST 取大值）
 */
function is_veteran(arg) {
  return (
    (era.get(`abl:${arg}:11`) || 0) >= 3 ||
    Boolean(era.get(`abl:${arg}:37`)) ||
    (era.get(`exp:${arg}:20`) || 0) >= 30
  );
}

/**
 * @强制肉偿（:2-117）：债务过高时的强制卖春。四档叙事 + 债务抵销 + 1/3
 * 拍片 + 经验/点数显示 + 善恶值下调。
 *
 * @param {number} arg 角色 ID
 * @param {(n: number) => number} [rand] RAND 随机源
 * @returns {Promise<number>} 0（原作无 RETURN 语句，Emuera 的缺省返回值）
 */
async function forced_payment(arg, rand = default_rand) {
  const rand_n = rand;
  // #DIM PLAY（:3）次数 / #DIM COST（:4）抵债额；#DIMS ORAL/ANAL/SEX
  //（:5-7）恒为空串，见文件头「原作缺陷」1
  let play = 0;
  let cost = 0;

  await era.printAndWait(
    `由于${name_of(arg)}欠的债务实在太高了，在休息的时候${name_of(arg)}被某位的债主绑架了！`,
  ); // :10

  // :11 SELECTCASE RAND:4（:12/:25/:41/:58 四档，RAND:4 恒在 0-3）
  switch (rand_n(4)) {
    // :12-24 第一档：乱交派对
    case 0:
      era.print(
        `${name_of(arg)}被强制灌了媚药并换上只有几根吊带之外什么也没有的淫荡内衣`,
      ); // :13
      era.print(
        `然后几乎跟全裸没什么两样的${name_of(arg)}，被丢入乱交派对里进行还债。`,
      ); // :14
      era.print(
        `昏昏沉沉的${name_of(arg)}带着迷茫的媚笑，就这样跟派对里的男男女女一直交媾着……`,
      ); // :15
      if (is_veteran(arg)) {
        await era.printAndWait(
          `${name_of(arg)}那幅晃腰摆臀的淫荡模样，大大取悦了派对的宾客们`,
        ); // :17
        play = rand_n(20) + 10; // :18
        cost = play * 100 + rand_n(1000) + 1000; // :19
      } else {
        await era.printAndWait(
          `${name_of(arg)}那青涩懵懂的模样，让派对的宾客们感到新鲜`,
        ); // :21
        play = rand_n(10) + 5; // :22
        cost = play * 100 + rand_n(500) + 500; // :23
      }
      break;

    // :25-40 第二档：壁洞公共便所
    case 1:
      era.print(
        `${name_of(arg)}被蒙上了眼睛并除去下半身的衣物，然后固定在一个壁洞上`,
      ); // :26
      era.print('也不知道是在城里的那个位置，就这样开始了壁洞公共便所的PLAY……'); // :27
      era.print(
        `什么也看不见的${name_of(arg)}，除了能听见不知是谁的污言秽语与指指点点之外`,
      ); // :28
      era.print('就只能感受到炙热的肉棒在身后及嘴巴里来来回回进出着……'); // :29
      if (is_veteran(arg)) {
        await era.printAndWait(
          `即使不知对象是谁，${name_of(arg)}那淫荡的身体居然因为这样的PLAY兴奋了`,
        ); // :31
        await era.printAndWait('让围在这个壁洞"消遣"的人们络绎不绝……'); // :32
        play = rand_n(20) + 10; // :33
        cost = play * 100 + rand_n(1000) + 1000; // :34
      } else {
        await era.printAndWait(
          `即使不知对象是谁，${name_of(arg)}那青涩懵懂的身体也因为这样的PLAY渐渐兴奋了起来`,
        ); // :36
        await era.printAndWait('让围在这个壁洞"消遣"的人们络绎不绝……'); // :37
        play = rand_n(10) + 5; // :38
        cost = play * 100 + rand_n(500) + 500; // :39
      }
      break;

    // :41-57 第三档：教堂审判
    case 2:
      era.print(
        `${name_of(arg)}被蒙上了眼睛并除去全身的衣物，然后固定在一个十字架上`,
      ); // :42
      era.print(
        `这难道是在在城里的哪个教堂吗？茫然的${name_of(arg)}就这样开始被审判了……`,
      ); // :43
      era.print(
        `什么也看不见的${name_of(arg)}，能听见底下不知是谁的祈祷声与窃窃私语`,
      ); // :44
      era.print(
        `欠债过多的${name_of(arg)}最后被判决了犯了"贪婪"的罪名，并需要立即接受教徒的"净化"`,
      ); // :45
      era.print(
        `基于神的仁爱，教徒们决定用滚烫的肉棒代替了烙铁，在${name_of(arg)}的身体，嘴巴里进进出出着……`,
      ); // :46
      if (is_veteran(arg)) {
        await era.printAndWait(
          `在受刑时，${name_of(arg)}那淫荡的身体反应，让教徒们更加地谴责`,
        ); // :48
        await era.printAndWait(
          `为了彻底纠正${name_of(arg)}的淫行，只好一直追加"刑罚"的数量了……`,
        ); // :49
        play = rand_n(20) + 10; // :50
        cost = play * 100 + rand_n(1000) + 1000; // :51
      } else {
        await era.printAndWait(
          `在受刑时，${name_of(arg)}那青涩懵懂的身体不停挣扎着，被教徒们认定为是不服从审判的反应`,
        ); // :53
        await era.printAndWait(
          `为了让${name_of(arg)}认清自己的罪行，只好一直追加"刑罚"的数量了……`,
        ); // :54
        play = rand_n(10) + 5; // :55
        cost = play * 100 + rand_n(500) + 500; // :56
      }
      break;

    // :58-71 第四档：牢房安抚
    case 3:
      era.print(
        `${name_of(arg)}被剥除全身的衣物，然后丢入牢房中进行"安抚"犯人们的活动`,
      ); // :59
      era.print(
        '为了降低牢狱的暴动率，维护社会的秩序，果然还是需要人挺身而出进行奉献',
      ); // :60
      era.print(
        `就这样${name_of(arg)}变成了犯人们的泄欲工具，上上下下的洞口全被被不停地轮奸着……`,
      ); // :61
      if (is_veteran(arg)) {
        await era.printAndWait(
          `${name_of(arg)}那积极的服务精神，连牢头都赞赏不已，甚至加入了体验的行列……`,
        ); // :63
        play = rand_n(20) + 10; // :64
        cost = play * 100 + rand_n(1000) + 1000; // :65
      } else {
        await era.printAndWait(
          `在服务时，${name_of(arg)}那青涩懵懂的身体不停挣扎着，连牢头看了都摇头不已`,
        ); // :67
        await era.printAndWait(
          `最后只好将${name_of(arg)}铐在栏杆上，让他好好为整个牢狱进行贡献……`,
        ); // :68
        play = rand_n(10) + 5; // :69
        cost = play * 100 + rand_n(500) + 500; // :70
      }
      break;
  }

  // :73-77 债务结算：抵得完清零，抵不完累加
  if (chara(arg).patch.借款 + cost >= 0) {
    chara(arg).patch.借款 = 0; // :74
  } else {
    chara(arg).patch.借款 += cost; // :76
  }

  era.print(`被强制用肉体偿债的${name_of(arg)}抵销了`); // :78
  era.print(`${cost}`); // :80 SETCOLORBYNAME SkyBlue（:79）
  era.print('点的债务，当前欠金变为'); // :82
  era.print(`${debt_of(arg)}`); // :84 SETCOLORBYNAME LightSalmon（:83）
  await era.printAndWait('点……'); // :86

  // :88-104 1/3 机率被拍片纪录，增加还债的金额
  if (!rand_n(3)) {
    await era.printAndWait(`${name_of(arg)}用肉体还债的过程被人拍下来了！`); // :89
    era.print('这部淫荡煽情的影像以'); // :90
    // :92 显示值：片酬第一次求值（RAND:100 第一次取）
    const shown_price = Math.trunc((cost * 1) / 3) + rand_n(100);
    era.print(`${shown_price}`); // :92 SETCOLORBYNAME SkyBlue（:91）
    await era.printAndWait('的金额，被人买下收藏了'); // :94
    // :95 入账值：片酬第二次求值（RAND:100 再取一次，原作如此——#14）
    chara(arg).patch.借款 += Math.trunc((cost * 1) / 3) + rand_n(100);
    era.print('当前欠金变为'); // :96
    era.print(`${debt_of(arg)}`); // :98 SETCOLORBYNAME LightSalmon（:97）
    await era.printAndWait('点……'); // :100
    era.print(`${name_of(arg)}的${expname(50)}，${expname(70)} 经验值上升了 1`); // :101
    chara(arg).dungeon.异常经验 += 1; // :102 EXP:ARG:50
    chara(arg).train.拍摄经验 += 1; // :103 EXP:ARG:70（train 域）
  }

  // :105-114 经验/点数结算。TYPE 实参恒为空串（见文件头「原作缺陷」1），
  // 三次调用都按空串传给 exp_bitch——实际不动 EXP/JUEL，只打印声称变化的文案。
  // :105 CALL EXP_BITCH(ARG,, ORAL, PLAY)——无条件，在 IF 之前
  require('#/kojo/kojo-dungeon-bitch').exp_bitch(arg, '', '', play);
  if (era.get(`talent:${arg}:122`)) {
    // :107 CALL EXP_BITCH(ARG,, ANAL, PLAY)（ANAL 恒为空串）
    require('#/kojo/kojo-dungeon-bitch').exp_bitch(arg, '', '', play);
    era.print(
      `${name_of(arg)}的${expname(22)}，${expname(20)}，${expname(74)}，${expname(1)}，${expname(5)}经验值上升了${play}`,
    ); // :108
    era.print(
      `${name_of(arg)}的${palamname(2)}点数＋${play * 10}，${palamname(5)}点数＋${play * 20}，${palamname(7)}点数＋${play}`,
    ); // :109
  } else {
    // :111 CALL EXP_BITCH(ARG,, SEX, PLAY)（SEX 恒为空串）
    require('#/kojo/kojo-dungeon-bitch').exp_bitch(arg, '', '', play);
    era.print(
      `${name_of(arg)}的${expname(22)}，${expname(20)}，${expname(74)}，${expname(0)}，${expname(5)}经验值上升了${play}`,
    ); // :112
    era.print(
      `${name_of(arg)}的${palamname(1)}点数＋${play * 10}，${palamname(5)}点数＋${play * 20}，${palamname(7)}点数＋${play}`,
    ); // :113
  }

  // :115-117 善恶值下调（Emuera 的整数除法向零截断）
  const local = Math.trunc((-1 * play) / 4);
  await era.printAndWait(`（善恶值减少了：${local}）`); // :116
  karma(arg, local); // :117

  return 0;
}

module.exports = {
  STUBBED_CALLS,
  forced_payment,
};
