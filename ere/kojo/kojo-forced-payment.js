/**
 * @file 强制肉偿（issue #544，S3）：魔改新增/强制肉偿.ERB 单函数移植。
 *
 * == 入口 ==
 *
 * 唯一调用点是卖春主流程（ere/kojo/kojo-dungeon-bitch.js 的 heroine_bitch）
 * ——债务 CFLAG:582 < -10000、非处女（!TALENT:0）、!RAND:3 三条同时成立时触发。
 * 调用方是 ere/kojo/kojo-dungeon-bitch.js 的 heroine_bitch（#544 换真身，
 * 该模块顶层 import 本文件的 forced_payment）。
 *
 * == 结算与显示的一致 ==
 *
 *   1. 经验/点数按文案实际入账：文案声称「口交/精液/卖淫经验、肛门或私处
 *      经验、性交经验 上升了 PLAY」「肛门或私处点数＋PLAY*10、欲情点数
 *      ＋PLAY*20、习得点数＋PLAY」，写入逐一对应（男人 TALENT:122 走肛门档，
 *      非男人走私处档）。此前版本把结算委托给卖春系统的 exp_bitch、但玩法
 *      参数传的是从未赋值的空串，SELECTCASE 不落任何臂——文案声称的增加
 *      实际不发生；本文件直接入账，不经 exp_bitch。
 *   2. 拍片片酬 `COST*1/3 + RAND:100` 只求值一次：显示多少入账多少。此前
 *      版本显示与入账各取一次随机数，两个金额几乎总不相等。
 *
 * == PRINTFORM 的拼接 ==
 *
 * 原作 PRINTFORM 不换行，一串 PRINTFORM 拼成**一条**显示行。本文件与
 * kojo-dungeon-bitch.js（#184）同款，**逐条 ERB 输出语句一次 era.print**
 * ——按「一条源 PRINT 行 ↔ 一条 JS 输出语句」的配对纪律逐条对应
 *（同 kojo-dungeon-bitch.js）。代价是结算行（:78-86）、片酬
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
  // PLAY = 次数 / COST = 抵债额
  let play = 0;
  let cost = 0;

  await era.printAndWait(
    `由于${name_of(arg)}欠的债务实在太高了，在休息的时候${name_of(arg)}被某位的债主绑架了！`,
  );

  // SELECTCASE RAND:4（:12/:25/:41/:58 四档，RAND:4 恒在 0-3）
  switch (rand_n(4)) {
    // 第一档：乱交派对
    case 0:
      era.print(
        `${name_of(arg)}被强制灌了媚药并换上只有几根吊带之外什么也没有的淫荡内衣`,
      );
      era.print(
        `然后几乎跟全裸没什么两样的${name_of(arg)}，被丢入乱交派对里进行还债。`,
      );
      era.print(
        `昏昏沉沉的${name_of(arg)}带着迷茫的媚笑，就这样跟派对里的男男女女一直交媾着……`,
      );
      if (is_veteran(arg)) {
        await era.printAndWait(
          `${name_of(arg)}那幅晃腰摆臀的淫荡模样，大大取悦了派对的宾客们`,
        );
        play = rand_n(20) + 10;
        cost = play * 100 + rand_n(1000) + 1000;
      } else {
        await era.printAndWait(
          `${name_of(arg)}那青涩懵懂的模样，让派对的宾客们感到新鲜`,
        );
        play = rand_n(10) + 5;
        cost = play * 100 + rand_n(500) + 500;
      }
      break;

    // 第二档：壁洞公共便所
    case 1:
      era.print(
        `${name_of(arg)}被蒙上了眼睛并除去下半身的衣物，然后固定在一个壁洞上`,
      );
      era.print('也不知道是在城里的那个位置，就这样开始了壁洞公共便所的PLAY……');
      era.print(
        `什么也看不见的${name_of(arg)}，除了能听见不知是谁的污言秽语与指指点点之外`,
      );
      era.print('就只能感受到炙热的肉棒在身后及嘴巴里来来回回进出着……');
      if (is_veteran(arg)) {
        await era.printAndWait(
          `即使不知对象是谁，${name_of(arg)}那淫荡的身体居然因为这样的PLAY兴奋了`,
        );
        await era.printAndWait('让围在这个壁洞"消遣"的人们络绎不绝……');
        play = rand_n(20) + 10;
        cost = play * 100 + rand_n(1000) + 1000;
      } else {
        await era.printAndWait(
          `即使不知对象是谁，${name_of(arg)}那青涩懵懂的身体也因为这样的PLAY渐渐兴奋了起来`,
        );
        await era.printAndWait('让围在这个壁洞"消遣"的人们络绎不绝……');
        play = rand_n(10) + 5;
        cost = play * 100 + rand_n(500) + 500;
      }
      break;

    // 第三档：教堂审判
    case 2:
      era.print(
        `${name_of(arg)}被蒙上了眼睛并除去全身的衣物，然后固定在一个十字架上`,
      );
      era.print(
        `这难道是在在城里的哪个教堂吗？茫然的${name_of(arg)}就这样开始被审判了……`,
      );
      era.print(
        `什么也看不见的${name_of(arg)}，能听见底下不知是谁的祈祷声与窃窃私语`,
      );
      era.print(
        `欠债过多的${name_of(arg)}最后被判决了犯了"贪婪"的罪名，并需要立即接受教徒的"净化"`,
      );
      era.print(
        `基于神的仁爱，教徒们决定用滚烫的肉棒代替了烙铁，在${name_of(arg)}的身体，嘴巴里进进出出着……`,
      );
      if (is_veteran(arg)) {
        await era.printAndWait(
          `在受刑时，${name_of(arg)}那淫荡的身体反应，让教徒们更加地谴责`,
        );
        await era.printAndWait(
          `为了彻底纠正${name_of(arg)}的淫行，只好一直追加"刑罚"的数量了……`,
        );
        play = rand_n(20) + 10;
        cost = play * 100 + rand_n(1000) + 1000;
      } else {
        await era.printAndWait(
          `在受刑时，${name_of(arg)}那青涩懵懂的身体不停挣扎着，被教徒们认定为是不服从审判的反应`,
        );
        await era.printAndWait(
          `为了让${name_of(arg)}认清自己的罪行，只好一直追加"刑罚"的数量了……`,
        );
        play = rand_n(10) + 5;
        cost = play * 100 + rand_n(500) + 500;
      }
      break;

    // 第四档：牢房安抚
    case 3:
      era.print(
        `${name_of(arg)}被剥除全身的衣物，然后丢入牢房中进行"安抚"犯人们的活动`,
      );
      era.print(
        '为了降低牢狱的暴动率，维护社会的秩序，果然还是需要人挺身而出进行奉献',
      );
      era.print(
        `就这样${name_of(arg)}变成了犯人们的泄欲工具，上上下下的洞口全被被不停地轮奸着……`,
      );
      if (is_veteran(arg)) {
        await era.printAndWait(
          `${name_of(arg)}那积极的服务精神，连牢头都赞赏不已，甚至加入了体验的行列……`,
        );
        play = rand_n(20) + 10;
        cost = play * 100 + rand_n(1000) + 1000;
      } else {
        await era.printAndWait(
          `在服务时，${name_of(arg)}那青涩懵懂的身体不停挣扎着，连牢头看了都摇头不已`,
        );
        await era.printAndWait(
          `最后只好将${name_of(arg)}铐在栏杆上，让他好好为整个牢狱进行贡献……`,
        );
        play = rand_n(10) + 5;
        cost = play * 100 + rand_n(500) + 500;
      }
      break;
  }

  // 债务结算：抵得完清零，抵不完累加
  if (chara(arg).patch.借款 + cost >= 0) {
    chara(arg).patch.借款 = 0;
  } else {
    chara(arg).patch.借款 += cost;
  }

  // 结算行：原作五条 PRINTFORM/PRINTFORMW 拼成一行（#584；
  // 中间行 :79 SETCOLORBYNAME SkyBlue / :83 LightSalmon 的染色本作未建模）
  await era.printAndWait(
    `被强制用肉体偿债的${name_of(arg)}抵销了${cost}点的债务，当前欠金变为${debt_of(arg)}点……`,
  );

  // 1/3 机率被拍片纪录，增加还债的金额
  if (!rand_n(3)) {
    await era.printAndWait(`${name_of(arg)}用肉体还债的过程被人拍下来了！`);
    // 原作两条 PRINTFORM + PRINTFORMW 拼成一行（#584；:91 SkyBlue 染色未建模）
    // 片酬只求值一次：显示与入账同一个数（RAND:100 只取一次）
    const shown_price = Math.trunc((cost * 1) / 3) + rand_n(100);
    await era.printAndWait(
      `这部淫荡煽情的影像以${shown_price}的金额，被人买下收藏了`,
    );
    chara(arg).patch.借款 += shown_price;
    // 原作两条 PRINTFORM + PRINTFORMW 拼成一行（#584；:97 LightSalmon 染色未建模）
    await era.printAndWait(`当前欠金变为${debt_of(arg)}点……`);
    era.print(`${name_of(arg)}的${expname(50)}，${expname(70)} 经验值上升了 1`);
    chara(arg).dungeon.异常经验 += 1; // EXP:ARG:50
    chara(arg).train.拍摄经验 += 1; // EXP:ARG:70（train 域）
  }

  // 经验/点数结算：按上方文案实际入账（文案声称增加多少就写多少）。
  // 口交/精液/卖淫/性交经验与欲情、习得点数两档共用；第三经验与第一
  // 点数按 TALENT:122 分档（男人肛门、非男人私处）。
  chara(arg).dungeon.口交经验 += play; // EXP:ARG:22 口交经验
  chara(arg).dungeon.精液经验 += play; // EXP:ARG:20 精液经验
  chara(arg).dungeon.卖淫经验 += play; // EXP:ARG:74 卖淫经验
  chara(arg).dungeon.性交经验 += play; // EXP:ARG:5 性交经验
  era.add(`juel:${arg}:5`, play * 20); // JUEL:ARG:5 欲情
  era.add(`juel:${arg}:7`, play); // JUEL:ARG:7 习得
  if (era.get(`talent:${arg}:122`)) {
    chara(arg).dungeon.肛门经验 += play; // EXP:ARG:1 肛门经验
    era.add(`juel:${arg}:2`, play * 10); // JUEL:ARG:2 肛门
    era.print(
      `${name_of(arg)}的${expname(22)}，${expname(20)}，${expname(74)}，${expname(1)}，${expname(5)}经验值上升了${play}`,
    );
    era.print(
      `${name_of(arg)}的${palamname(2)}点数＋${play * 10}，${palamname(5)}点数＋${play * 20}，${palamname(7)}点数＋${play}`,
    );
  } else {
    chara(arg).dungeon.私处经验 += play; // EXP:ARG:0 私处经验
    era.add(`juel:${arg}:1`, play * 10); // JUEL:ARG:1 私处
    era.print(
      `${name_of(arg)}的${expname(22)}，${expname(20)}，${expname(74)}，${expname(0)}，${expname(5)}经验值上升了${play}`,
    );
    era.print(
      `${name_of(arg)}的${palamname(1)}点数＋${play * 10}，${palamname(5)}点数＋${play * 20}，${palamname(7)}点数＋${play}`,
    );
  }

  // 善恶值下调（Emuera 的整数除法向零截断）
  const local = Math.trunc((-1 * play) / 4);
  await era.printAndWait(`（善恶值减少了：${local}）`);
  karma(arg, local);

  return 0;
}

module.exports = {
  forced_payment,
};
