/**
 * @file 侵略时的凌辱旁白（issue #470，阶段 5c Q13 侵略残余·3）。
 *
 * 文件名按仓库约定意译（凌辱 → ravish；同词先例是
 * `tools/kojo-transpiler.js` 的 `DUNGEON_RYOUZYOKU.ERB → kojo-dungeon-ravish.js`）；
 * 函数名 `invasion_ryouzyoku` 1:1 跟随原作 `@INVASION_RYOUZYOKU`，不改。
 *
 * 源: target/ERB/侵略/INVASION_RYOUZYOKU.ERB  @INVASION_RYOUZYOKU（:1-66，
 *       分发）× 12 个战场旁白函数：@ORC_INV（:71-162）/ @SLIME_INV
 *       （:165-237）/ @INSECT_INV（:240-291）/ @IVY_INV（:294-346）/
 *       @SYOKUSYU_INV（:349-402）/ @FAILY_INV（:405-460）/ @GIANT_INV
 *       （:463-527）/ @MAN_INV（:531-591）/ @GIRL_INV（:594-653）/
 *       @BEAST_INV（:655-697）/ @BRAIN_INV（:700-738）/ @HORSE_INV（:741-782）
 *
 * 调用方是 侵略/INVASION.ERB:671-683 与 :867-879 的出兵路线（人间界/精灵
 * 领域/龙之山/天界/天神宫各一段），两条路线目前都还是 page-invasion.js 的
 * 存根（[0] 怪物出兵 / [2] 勇者出兵），所以本模块现下没有运行时调用方——
 * 按原样接真身，等出兵路线票接线（本票不动 page-invasion.js 的存根分支）。
 *
 * 整份模块是**无状态纯叙事**：只有 PRINTFORMW/PRINTW/PRINTFORML 输出，没有
 * 任何 CFLAG/BASE/FLAG 写入。唯一的对外依赖是 MONSTER_DATA（写 E: 三列的
 * 怪物数据，:15）与 %ITEMNAME%（:24 读 Item.yml 的登记名）。
 *
 * 移植说明（有意保留的原作形态，均注明出处）：
 *   - :10 `ARG:1 /= 5000` 是侵攻点的整数除算（0..10 档）；分发函数只在入口
 *     归一一次，12 个旁白函数收到的已是归一后的档位。
 *   - :14 `X = (RAND:9 + 1) * 10 + 100 + RAND:5` 抽 110-194 的怪物号
 *     （`(RAND:9 + 1)` 上界 9 → 190，再 + RAND:5 的上界 4），:15
 *     `CALL MONSTER_DATA, X, COUNT, 0, -1` 把数据写进第 COUNT 列
 *     （COUNT = 0/1/2 三列），rand 一路透传。
 *   - :19-21 `IF E:NUM <= 0 THEN E:RYOUZYOKU = 0` 是原作的就地清零：
 *     该列无怪（数量 0）时把凌辱类型抹掉，后续 `E:RYOUZYOKU > 0` 与分发
 *     都走不到。**该守卫在 ere 侧不可达**：`monster_data` 给 0–2 列写的
 *     数量（`E:列头+99`）恒 ≥ 1——它算这个数的「数量第二骰」（原作
 *     `:184-214`）每条分支的取值都 ≥ 1，三处提前返回只发生在 `line` 为
 *     3/4/5，而本模块只传 0/1/2。保留只为 1:1，不删不改行为（issue #486；
 *     不可达分支无法用变异守住，故不设变异条目）。
 *   - :63 `PRINTL` 的空行分隔每列一段，照排。
 *   - @IVY_INV 的战场表（:312）把 `ELSEIF ARG == 5` 写成了
 *     `ELSEIF ARG == 4`——第二臂不可达，天神宫（5）落进 ELSE。原作缺陷，
 *     1:1 保留并登记 issue #14；本文件的天神宫档因此取 ELSE 的名字。
 *
 * 跨域：本文件属 invasion 域；E: 数组与 ITEMNAME 都在 dungeon 域，
 * 经 ere/dungeon/monster-data.js 的具名导出读取，不是裸寻址。
 */

'use strict';

const era = require('#/era-electron');
const {
  e_get,
  e_set,
  item_name,
  monster_data,
} = require('#/dungeon/monster-data');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = [];

/** 原作 RAND:N（0..N-1）的缺省实现 */
const default_rand = (n) => Math.floor(Math.random() * n);

/**
 * @INVASION_RYOUZYOKU（:1-66）：侵略时的凌辱旁白分发。抽三列怪物的数据，
 * 按各列的凌辱类型（E:(列头+7)，由 MONSTER_DATA 写入）调对应的旁白。
 * @param {number} area 战场（原作 ARG:0：1 人间界 / 2 精灵领域 / 3 龙之山 /
 *   4 天界 / 5 天神宫；其余落旁白函数内的 ELSE 臂）
 * @param {number} sinkou 侵攻点（原作 ARG:1，本函数内 ÷5000 归一到 0..10）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function invasion_ryouzyoku(area, sinkou, rand = default_rand) {
  // :10 侵攻ポイントを調整（整数除算で 0..10 档）
  const point = Math.floor(sinkou / 5000);

  // :13-64 戦争で陵辱（三列分）
  for (let count = 0; count < 3; count += 1) {
    const x = (rand(9) + 1) * 10 + 100 + rand(5); // :14
    monster_data(x, count, 0, -1, -1, rand); // :15

    const ryouzyoku = count * 100 + 7; // :17
    const num = count * 100 + 99; // :18
    if (e_get(num) <= 0) {
      e_set(ryouzyoku, 0); // :20 その列に怪物がいなければ凌辱类型を消す
    }
    if (e_get(ryouzyoku) > 0) {
      const id = e_get(count * 100); // :23
      await era.printAndWait(`${item_name(id)}的凌辱开始了。`); // :24
    }

    // :26-62 凌辱类型 → 旁白（1 兽人 / 2 史莱姆 / 3 昆虫 / 4 藤蔓 / 5 触手 /
    // 6 妖精 / 7 巨人 / 8 男 / 9 女 / 10 兽 / 11 脑奸 / 12 马）
    if (e_get(ryouzyoku) === 1) {
      await orc_inv(area, point, rand);
    } else if (e_get(ryouzyoku) === 2) {
      await slime_inv(area, point, rand);
    } else if (e_get(ryouzyoku) === 3) {
      await insect_inv(area, point, rand);
    } else if (e_get(ryouzyoku) === 4) {
      await ivy_inv(area, point, rand);
    } else if (e_get(ryouzyoku) === 5) {
      await syokusyu_inv(area, point, rand);
    } else if (e_get(ryouzyoku) === 6) {
      await faily_inv(area, point, rand);
    } else if (e_get(ryouzyoku) === 7) {
      await giant_inv(area, point, rand);
    } else if (e_get(ryouzyoku) === 8) {
      await man_inv(area, point, rand);
    } else if (e_get(ryouzyoku) === 9) {
      await girl_inv(area, point, rand);
    } else if (e_get(ryouzyoku) === 10) {
      await beast_inv(area, point, rand);
    } else if (e_get(ryouzyoku) === 11) {
      await brain_inv(area, point, rand);
    } else if (e_get(ryouzyoku) === 12) {
      await horse_inv(area, point, rand);
    }
    era.print(''); // :63 PRINTL（空行分隔）
  }

  return 0; // :63-66
}

/**
 * @ORC_INV（:71-162）：兽人（凌辱类型 1）。
 * @param {number} area 战场（原作 ARG:0）
 * @param {number} sinkou 侵攻点档位（原作 ARG:1，已 ÷5000）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function orc_inv(area, sinkou, rand = default_rand) {
  // :74-102 戦場別の称呼（ELSE 臂 = 人间界的三个名字）
  const [l0, l1, l2] = {
    1: ['看板娘', '女骑士', '少女'],
    2: ['精灵少女', '精灵猎手', '精灵少女'],
    3: ['看板娘', '龙族女战士', '龙族少女'],
    4: ['天使', '破邪天使', '妙龄天使'],
    5: ['十字军', '十字军队长', '十字军军官'],
  }[area] ?? ['看板娘', '女骑士', '少女'];

  if (rand(5) === 0 && sinkou > 1) {
    // :104-109
    await era.printAndWait(`被亚人群所包围的${l1}的部队、被迫做出了决断`);
    await era.printAndWait(
      '『已经无法再期待救援了……既然这样干脆就保持着纯洁而玉碎吧……』',
    );
    await era.printAndWait('就在此时、阵地内响起了本应听不到的亚人的声音');
    await era.printAndWait('大本营揭起了白旗、同伴们一个接一个被解除了武装');
    await era.printAndWait(
      `${l1}看到的是、曾经信任的团长取悦着亚人的阴茎的媚态……`,
    );
  } else if (rand(4) === 0) {
    // :110-125
    await era.printAndWait(
      `${l1}的抵抗是如此地无力，一个又一个的据点被攻占下来了，抵抗的部队也都尽数被捕虏了。`,
    );
    if (sinkou > 6) {
      era.print(
        '亚人军队的攻势不知什么时候才会停止、就好像席卷而来的波涛一般排山倒海',
      );
    } else if (sinkou > 2) {
      era.print(`${l1}的部队寡不敌众、没办法做出很好的抵抗`);
    }
    await era.printAndWait('「回国的时候，要做新娘咯～♪哇哈哈哈哈哈！」');
    await era.printAndWait(`已经无力反抗的${l1}们，眼里再也见不到希望的光芒，`);
    await era.printAndWait('身体因为妊娠促进剂而受胎，肚子夸张地膨胀着。');
    await era.printAndWait('『啊啊……孩子在动着……兽人的孩子…………』');
    if (sinkou > 7) {
      era.print(`${l1}的妊娠数已经超过了三位数、已经被改造得无法与同族生育了`);
    } else if (sinkou > 3) {
      era.print(`${l1}的妊娠数已经超过了两位数`);
    }
  } else if (rand(3) === 0) {
    // :126-143
    await era.printAndWait('「这，这里是面包店……要买面包么？」');
    await era.printAndWait(`兽人们冲入面包店，把里面的${l0}抓住，按倒在地，`);
    await era.printAndWait(
      '『不，不要啊～～！快，快停……快停下，啊啊啊啊啊啊啊！』',
    );
    await era.printAndWait(`${l0}的私处内被灌满了兽人的浓厚精液。`);
    if (sinkou > 6) {
      era.print(`${l0}的住街变成了亚人们的公众便所`);
      era.print('街中回响着肉便器们的娇喘声……');
    } else if (sinkou > 2) {
      era.print(`${l0}的住街被完全破坏了、街上的女人全部成为了亚人的肉便器`);
    }
    await era.printAndWait(
      '「哈哈哈！真是个不错的面包店啊！以后我们每天都会来光顾的啦！」',
    );
    if (sinkou > 7) {
      era.print(`成为肉便器的${l0}在烤面包`);
      era.print('变成接客房间的面包屋里、充满了盖过面包香味程度的性臭味……');
    } else if (sinkou > 3) {
      era.print(`${l0}在烤面包、并且不得不履行身为肉便器的职责……`);
    }
  } else if (rand(2) === 0) {
    // :144-152
    await era.printAndWait(
      '『被这种下等兽人……如果当时有增援的话，也不会这样……』',
    );
    await era.printAndWait(`${l1}在广场上被公开处刑。`);
    await era.printAndWait(
      '脖子和手腕被固定的枷锁死死扣住，光溜溜的屁股被轮流侵犯。',
    );
    await era.printAndWait(
      '「不会杀你的！你是大家的便器！一直在这里侍奉大家吧！」',
    );
    await era.printAndWait(
      `${l1}已经连续在广场被使用了几天，好像胜利纪念品一样。`,
    );
    await era.printAndWait(
      '『停下吧……我再也不会反抗你们了……求求你们，停下啊啊啊啊啊啊啊～啊啊啊！！』',
    );
    await era.printAndWait(`嚎啕大哭的${l1}眼前，兽人的阴茎晃动着。`);
    await era.printAndWait('「舔吧！母猪！」');
  } else {
    // :153-159
    await era.printAndWait('「新人，就在里面！」');
    await era.printAndWait(
      `作为新的奴隶的${l2}，被带入奴隶的帐篷中，看到了这样一幅光景：`,
    );
    await era.printAndWait(
      '大量被锁着，两眼无神的全裸女人正在不停地侍奉着兽人，起码有一半明显是怀孕了。',
    );
    await era.printAndWait(
      '过度的使用让大部分人的性器都成了黑木耳，头发和阴毛杂乱地生长着，精液不断从私处、肛门里流出来…',
    );
    await era.printAndWait('『这就是……我的……未来……』');
    await era.printAndWait(`${l2}全身无力，崩溃了。`);
  }

  return 0; // :159-162
}

/**
 * @SLIME_INV（:165-237）：史莱姆（凌辱类型 2）。
 * @param {number} area 战场（原作 ARG:0）
 * @param {number} sinkou 侵攻点档位（原作 ARG:1，已 ÷5000）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function slime_inv(area, sinkou, rand = default_rand) {
  // :168-195 戦場別の称呼（ELSE 臂 = 人间界的三个名字）
  const [l0, l1, l2] = {
    1: ['女人', '女孩', '年轻修女'],
    2: ['精灵女性', '精灵女孩', '精灵巫女'],
    3: ['龙族女性', '龙族女孩', '龙族女神官'],
    4: ['天使', '妙龄天使', '天使神官'],
    5: ['十字军', '十字军护卫', '十字军神官'],
  }[area] ?? ['女人', '女孩', '年轻修女'];

  if (rand(4) === 0 && sinkou > 1) {
    // :197-202
    await era.printAndWait(`成为俘虏的${l2}被往肛门里尽可能地注入了泥浆`);
    await era.printAndWait(`在其它${l2}的注视中、全裸的跨在神谕的书物之上`);
    await era.printAndWait('「被干趴的话、同伴、全部奴隶的干活」');
    await era.printAndWait(`魔物使命令兽人、操起了${l2}的大屁股`);
    await era.printAndWait(`在持续数小时的肛交之后、${l2}再也忍受不住了……`);
  } else if (rand(3) === 0) {
    // :203-208
    await era.printAndWait(`${l2}们，在战火中祈祷着。`);
    await era.printAndWait(`逃入圣堂里的${l2}们，已经做好了死的觉悟。`);
    await era.printAndWait('『……怎么回事……身体……动不了……了……』');
    await era.printAndWait(
      `麻痹史莱姆悄悄地从排水渠钻进了圣堂。散发出麻痹的毒气让${l2}们无法动弹了。`,
    );
    await era.printAndWait(
      '门外，伴随着可憎的的口音和下流的呼喊，大量的脚步声传进来了。想死，也没这么容易噢～',
    );
  } else if (rand(2) === 0) {
    // :209-226
    await era.printAndWait(
      `${l0}千辛万苦地躲入不起眼的屋子里，在外面，战斗正在打响。`,
    );
    if (sinkou > 6) {
      era.print(`${l0}们的住街已经被兽人的魔物使占领了一半以上了`);
      era.print(
        '要是被抓到的话就会被当作繁殖奴隶一直被侵犯直到用完丢掉为止吧……',
      );
    } else if (sinkou > 2) {
      era.print(
        `${l0}的住街遭受了兽人魔物使的袭击、防卫部队已经处于半崩溃状态`,
      );
    }
    await era.printAndWait(`突然，孤身一人的${l0}闻到了异样的臭味。`);
    await era.printAndWait('『史，史莱姆！』');
    await era.printAndWait('史莱姆从通气孔中钻入了！');
    await era.printAndWait(
      `当兽人战士破门而入的时候，${l0}还在被史莱姆狠狠侵犯之中。`,
    );
    if (sinkou > 7) {
      era.print(`${l0}们之后、在被破坏的街上成为了史莱姆培养奴隶`);
      era.print('在高潮的同时从肛门里喷出史莱姆的样子、不会被任何人怜悯……');
    } else if (sinkou > 3) {
      era.print(`${l0}们之后、持续不断地被在肛门中培养史莱姆的样子……`);
    }
  } else {
    // :227-234
    await era.printAndWait('『快停下！放过我吧！不要啊！』');
    await era.printAndWait(`作为营地的余兴节目，${l1}被丢入有史莱姆的浴池里。`);
    await era.printAndWait('史莱姆占据了半个浴池，马上开始侵犯着下半身，');
    await era.printAndWait(`私处和肛门都被大量的粘液灌入了，${l1}尖叫了起来。`);
    await era.printAndWait('「不错的玩法，不如将所有史莱姆都拿过来吧。」');
    await era.printAndWait('一只兽人这么提议到，全军都沸腾地表示赞成。');
    await era.printAndWait(`${l1}脸色铁青，彻底绝望了。`);
  }

  return 0; // :234-237
}

/**
 * @INSECT_INV（:240-291）：昆虫（凌辱类型 3）。
 * @param {number} area 战场（原作 ARG:0）
 * @param {number} sinkou 侵攻点档位（原作 ARG:1，已 ÷5000）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function insect_inv(area, sinkou, rand = default_rand) {
  // :243-264 戦場別の称呼（ELSE 臂 = 人间界的两个名字）
  const [l0, l1] = {
    1: ['女人', '女学生'],
    2: ['女精灵', '精灵学生'],
    3: ['龙族女人', '龙族学生'],
    4: ['天使', '见习天使'],
    5: ['十字军', '见习十字军'],
  }[area] ?? ['女人', '女学生'];

  if (rand(3) === 0 && sinkou > 1) {
    // :266-271
    await era.printAndWait(
      `被捕获的${l1}们、被逼往嘴里吞下了紫芋虫。很快出现了各种症状`,
    );
    await era.printAndWait(
      `芋虫在肠中分泌媚薬、理性被破坏的${l1}们互相抱在一起`,
    );
    await era.printAndWait(`${l1}们变成了脑子只有做爱的性奴隶`);
    await era.printAndWait('男学生和女学生被一一配对、成为了生育奴隶的装置');
    await era.printAndWait(
      '头被锁链锁在一起的二人的表情、看上去好像无比的幸福',
    );
  } else if (rand(2) === 0) {
    // :272-283
    await era.printAndWait(`${l1}们，从战场上避的难途中，被魔虫群袭击了。`);
    await era.printAndWait('用臭布裹体的兽人虫使，用魔虫笛操纵着虫群。');
    if (sinkou > 6) {
      era.print(`成为奴隶的${l0}被兽人虫使用阴茎磨蹭起了脸颊`);
      era.print('屈服于兽人的她、泄露出了学生们的避难地点');
    } else if (sinkou > 2) {
      era.print(`兽人虫使、把成为阴茎容器的${l0}绑了起来`);
    }
    await era.printAndWait(`当场将${l1}们剥光，用魔虫的粘丝捆绑起来。`);
    await era.printAndWait(`哀叫着的${l1}们，就这样被带回了魔虫的巢穴。`);
    await era.printAndWait(
      '又有新的虫卵，新的虫子了。兽人虫使这么想着，开心地笑了。',
    );
  } else {
    // :284-289
    await era.printAndWait(`在战场上被抓获的${l0}们，成为了魔界昆虫的孵化箱。`);
    await era.printAndWait(
      `脖子被锁着，${l0}们的私处和肛门，被虫子下了很多卵。`,
    );
    await era.printAndWait('『啊啊…啊啊啊啊啊…啊啊啊…』');
    await era.printAndWait(`${l0}们彻底绝望，精神崩溃了。`);
    await era.printAndWait(
      `不一会儿，从${l0}们的粘膜中吸取了足够的养分，虫子的幼虫从私处和肛门中爬出来了，然后又继续地被产卵。`,
    );
  }

  return 0; // :289-291
}

/**
 * @IVY_INV（:294-346）：藤蔓触手（凌辱类型 4）。
 *
 * **原作缺陷**：战场表 :312 把天神宫的 `ELSEIF ARG == 5` 写成了
 * `ELSEIF ARG == 4`（与 :309 重复），第二臂不可达，天神宫落进 ELSE。
 * 1:1 保留，登记 issue #14。
 *
 * @param {number} area 战场（原作 ARG:0）
 * @param {number} sinkou 侵攻点档位（原作 ARG:1，已 ÷5000）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function ivy_inv(area, sinkou, rand = default_rand) {
  // :297-318 戦場別の称呼（:312 的第二臂 == 4 恒不可达，天神宫落 ELSE）
  const [l0, l1] = {
    1: ['女人', '女兵士'],
    2: ['精灵女性', '精灵守卫'],
    3: ['龙族女人', '龙族女战士'],
    4: ['天使', '破邪天使'],
  }[area] ?? ['女人', '女兵士'];

  if (rand(3) === 0 && sinkou > 1) {
    // :320-325
    await era.printAndWait(
      `植物型魔物在一夜之间吞没了城寨、${l1}们全被巨大的藤蔓缠住了`,
    );
    await era.printAndWait(`然后、${l1}们被集中到盛开着紫色花朵的花园里`);
    await era.printAndWait(
      `在花粉的作用下产生了幻觉、${l1}们与城里的男人们专心致志地做爱起来`,
    );
    await era.printAndWait('『喜欢……还要……来吧……给我孩子……让我怀孕』');
    await era.printAndWait(
      '生下来的孩子将被当做奴隶卖掉。她们在花的诱惑下持续着交尾……。',
    );
  } else if (rand(2) === 0) {
    // :326-337
    await era.printAndWait(`${l1}们被覆盖了战场的植物群给吞没了`);
    await era.printAndWait('手足被藤蔓缠住、毫无防备的肛门被根茎插了进去');
    await era.printAndWait(`从根分泌出的物质很快令${l1}们露出了啊嘿颜、`);
    await era.printAndWait('就这样与植物形成了共生状态');
    if (sinkou > 5) {
      era.print(
        '根须从耳一直伸到大脑、很快精神被改造得除了快感其他什么也感觉不到了的样子',
      );
      era.print(`在植物的养分作用下${l1}的筋肉绷紧起来变成了动弹不得的肉块`);
    } else if (sinkou > 3) {
      era.print(`${l1}的筋肉绷紧起来变成了动弹不得的肉块`);
    }
    await era.printAndWait(
      '『哈啊啊、好爽啊啊啊～！　屁股、要变成傻瓜了！　要变成屁股了～～～～！』',
    );
  } else {
    // :338-344
    await era.printAndWait(
      `在被镇压了的据点上，种满了魔界的植物，${l0}们被抓了过来，提供养分。`,
    );
    await era.printAndWait(
      '被扎根在体内的女性，现在和植物已经是共生状态，不断地产出着优质的肥料。',
    );
    await era.printAndWait(
      '「这是你的饲料，吃啊！吃进去，拉出来，这就是你们的使命！」',
    );
    await era.printAndWait(`有时，男人和兽人们会侵犯身不能动的${l0}`);
    await era.printAndWait('『侵犯我！再来！！啊！好！好棒！好棒啊！』');
    await era.printAndWait(
      `除了脱粪以外，性交已经是唯一的娱乐。${l0}们都堕落为淫乱的女人了。`,
    );
  }

  return 0; // :344-346
}

/**
 * @SYOKUSYU_INV（:349-402）：触手（凌辱类型 5）。
 * @param {number} area 战场（原作 ARG:0）
 * @param {number} sinkou 侵攻点档位（原作 ARG:1，已 ÷5000）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function syokusyu_inv(area, sinkou, rand = default_rand) {
  // :352-379 戦場別の称呼（ELSE 臂 = 人间界的三个名字）
  const [l0, l1, l2] = {
    1: ['女人', '侍女', '贵族女人'],
    2: ['女精灵', '精灵侍女', '精灵贵族'],
    3: ['龙族女人', '龙族侍女', '龙族贵族'],
    4: ['天使', '天使仆从', '上位天使'],
    5: ['十字军', '十字军仆从', '高阶十字军'],
  }[area] ?? ['女人', '侍女', '贵族女人'];

  if (rand(3) === 0 && sinkou > 1) {
    // :381-386
    await era.printAndWait(`${l2}被捕获后、被触手细致地催眠了`);
    await era.printAndWait(`数日后、婚纱装的${l2}走到了史莱姆的街道上`);
    await era.printAndWait(
      '头被触手包的紧紧的、她们的眼里充满了不合时宜的慈爱',
    );
    await era.printAndWait(
      `流浪者被集中起来。今天是${l2}的结婚仪式。将高贵的血统分配给下贱的东西`,
    );
    await era.printAndWait(
      '『好开心～……大家都成为新娘子了～……要生好多的孩子哦……』',
    );
  } else if (rand(2) === 0) {
    // :387-393
    await era.printAndWait(
      `侍奉着贵族的${l1}，让主人的千金躲到暗格里，自己一个抵抗着。`,
    );
    await era.printAndWait(`${l1}毫无悬念地被抓住了，接受着触手的快感拷问。`);
    await era.printAndWait(
      '阴蒂被触手改造成阴茎的样子，两性倒错的快感轻易地就让她堕落了。',
    );
    await era.printAndWait(
      '『把大小姐出卖了的话，就把她的贞操奖励给你哦！～』触手师这么笑着说。',
    );
    await era.printAndWait(
      '在这种诱惑下，供出了千金的所在，两人一同成为奴隶了。',
    );
    await era.printAndWait(
      '『大小姐……一直、一直都恋慕着你！　啊哈！　侵犯……大小姐什么的！　最最舒服啦！！』',
    );
  } else {
    // :394-400
    await era.printAndWait('被镇压的据点里，临时设置了触手生产工厂。');
    await era.printAndWait(
      `被镶嵌到恶心的肉壁中，${l0}们个个都挺着怀孕的大肚子。`,
    );
    await era.printAndWait('『讨厌……不要生出来……讨厌……』');
    await era.printAndWait(
      `危险日和安全日都完全不管，触手不停地在${l0}们的私处内灌入精液。`,
    );
    await era.printAndWait('『去了！要去了！！明明不想去的～～～～～～！！』');
    await era.printAndWait(
      `触手的精液中含有大量的春药成分，${l0}们被多次地强制绝顶了。`,
    );
  }

  return 0; // :400-402
}

/**
 * @FAILY_INV（:405-460）：妖精（凌辱类型 6）。
 * @param {number} area 战场（原作 ARG:0）
 * @param {number} sinkou 侵攻点档位（原作 ARG:1，已 ÷5000）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function faily_inv(area, sinkou, rand = default_rand) {
  // :408-435 戦場別の称呼（ELSE 臂 = 人间界的三个名字）
  const [l0, l1, l2] = {
    1: ['女人', '少女', '人类'],
    2: ['精灵女性', '精灵少女', '精灵'],
    3: ['龙族女性', '龙族少女', '龙族'],
    4: ['天使', '天使少女', '天使'],
    5: ['十字军', '天使少女', '天使'],
  }[area] ?? ['女人', '少女', '人类'];

  if (rand(3) === 0 && sinkou > 1) {
    // :436-441
    await era.printAndWait('都会学校被妖精们占据了、学生全被囚禁起来');
    await era.printAndWait('「你们、将作为妖精的奴隶尽情地生产哦～」');
    await era.printAndWait(
      `${l2}的学生们被喂下了妖精的媚薬、全员变成了发情的性兽`,
    );
    await era.printAndWait(
      '在成为繁殖场的校舍里、男学生不分场地的侵犯着女学生',
    );
    await era.printAndWait(
      `一个${l2}的优等生、以生下5个孩子的奴隶身份得到了优秀的表扬`,
    );
  } else if (rand(2) === 0) {
    // :442-451
    await era.printAndWait(`${l0}被拘束着，承受妖精们的欺凌。`);
    await era.printAndWait(
      '被魔法强制勃起的阴蒂，对于体型娇小的妖精来说，正好可以当阴茎使。',
    );
    await era.printAndWait(
      `快感也被魔法增幅了。${l0}情不自禁地随着妖精的起伏摆动着自己的腰。`,
    );
    await era.printAndWait('『不要……会回不去的……腰都变得奇怪了啊！！』');
    await era.printAndWait(
      '「哎呀呀～在说什么啦？　哦？大姐姐你说要一生都做阴蒂奴隶啊？好咧！！～♪」',
    );
    if (sinkou > 3) {
      await era.printAndWait(`之后、${l0}的乳头也被改造成能与妖精性交了`);
    }
    if (sinkou > 6) {
      await era.printAndWait(`阴蒂勃起的${l0}直到死都无休止地被妖精们泄欲着`);
    }
  } else {
    // :452-458
    await era.printAndWait(`妖精们宛如孩子般天真无邪的玩弄着破坏着${l0}们。`);
    await era.printAndWait('「哈哈～不如把尿道也侵犯了吧！」');
    await era.printAndWait('『啊～啊啊～！求求你们，不要再继续了！！』');
    await era.printAndWait(`并排被拘束着的${l0}们，被妖精随心所欲地破坏着。`);
    await era.printAndWait('「尿道性交！！嘻嘻，会让姐姐你很舒服的啦！」');
    await era.printAndWait(
      `看到这个情形，作为下批牺牲者的${l1}们，浮现出绝望的表情。`,
    );
  }

  return 0; // :458-460
}

/**
 * @GIANT_INV（:463-527）：巨人（凌辱类型 7）。
 * @param {number} area 战场（原作 ARG:0）
 * @param {number} sinkou 侵攻点档位（原作 ARG:1，已 ÷5000）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function giant_inv(area, sinkou, rand = default_rand) {
  // :466-493 戦場別の称呼（ELSE 臂 = 人间界的三个名字）
  const [l0, l1, l2] = {
    1: ['女奴隶', '魔导士', '人类'],
    2: ['精灵女奴隶', '精灵使', '精灵'],
    3: ['龙族女奴隶', '龙族术士', '龙族'],
    4: ['天界奴隶', '破邪天使', '天使'],
    5: ['天神奴隶', '破落天使', '天使'],
  }[area] ?? ['女奴隶', '魔导士', '人类'];

  if (rand(4) === 0 && sinkou > 1) {
    // :495-500
    await era.printAndWait(
      `因为巨人们的余兴而被捕获的${l0}们成为了稀罕的收藏品`,
    );
    await era.printAndWait(
      '被全裸的放在一起的奴隶们、男女配对进行着各种各样的竞技',
    );
    await era.printAndWait('因为输了说不定就会被杀掉、奴隶们拼命地展现着丑态');
    await era.printAndWait('看到这些的巨人们大笑了起来');
    await era.printAndWait(
      '在输掉就会被杀的恐惧前、二人展现着猥琐下流的性交猥杂、苟延残喘着',
    );
  } else if (rand(3) === 0) {
    // :501-507
    await era.printAndWait(`本来就身份低微的${l0}们被抓获了，`);
    await era.printAndWait(
      '顺势给她们施加了淫媚的魔法，成为了随军用的飞机杯。',
    );
    await era.printAndWait('在巨人那巨根的关照下，身体逐渐飞机杯化了。');
    await era.printAndWait(
      `最初还在抵抗的${l0}们，在快感魔法下已经连续高潮了不知多少次。`,
    );
    await era.printAndWait(
      `一次次的侵犯，让${l2}的眼泪和口水，随着爱液四处飞散，理智渐渐崩坏了。`,
    );
    await era.printAndWait(
      `『我是飞机杯！${'\u3000'}我不要做${l2}了！${'\u3000'}再狠狠地操我吧！！让我作为飞机杯，狠狠地泄出来吧！！！』`,
    );
  } else if (rand(2) === 0) {
    // :508-514
    await era.printAndWait(`在战场上被抓获的${l0}们，在接受最初的洗礼。`);
    await era.printAndWait('在巨人的大量精液中洗澡。');
    await era.printAndWait('『这是什么…讨厌…呀啊啊啊啊啊啊！』');
    await era.printAndWait(`嫌弃的${l0}们，会被强制丢入浴池。`);
    await era.printAndWait('反抗的，则会连头都被按下去。');
    await era.printAndWait(
      `${l0}们战战兢兢地在精液中沐浴着，不知道自己过后将被如何处置。`,
    );
  } else {
    // :515-526
    await era.printAndWait(`${l1}被巨人压倒了，连续的战斗让她的魔力已经见底。`);
    await era.printAndWait('『被这种下等的家伙……队长！？』');
    await era.printAndWait('队长用残存的魔力，把自己的内心摧毁了。');
    await era.printAndWait('『好痛…这里是……哪里…』');
    await era.printAndWait('『不要啊！不要不要啊！…呜哇哇哇哇哇哇！』');
    await era.printAndWait(
      '不是勇者的她们的身体，承受巨人的凌辱的话，可能三天左右就不行了吧。',
    );
    if (sinkou > 3) {
      await era.printAndWait('到那时会对她们使用魔法、让坏掉的身体再生吧');
    }
    if (sinkou > 6) {
      await era.printAndWait(
        `只要一戳内心坏掉的${l1}的阴茎套、就会像说胡话似的咏唱起再生魔法`,
      );
    }
  }

  return 0; // :525-527
}

/**
 * @MAN_INV（:531-591）：男（凌辱类型 8）。
 * @param {number} area 战场（原作 ARG:0）
 * @param {number} sinkou 侵攻点档位（原作 ARG:1，已 ÷5000）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function man_inv(area, sinkou, rand = default_rand) {
  // :534-561 戦場別の称呼（ELSE 臂 = 人间界的三个名字）
  const [l0, l1, l2] = {
    1: ['女神官', '女战士', '人类的法律'],
    2: ['精灵女神官', '女精灵战士', '投降'],
    3: ['龙族女神官', '龙族女战士', '投降'],
    4: ['天使', '破邪天使', '投降'],
    5: ['天使', '破邪天使', '投降'],
  }[area] ?? ['女神官', '女战士', '人类的法律'];

  if (rand(4) === 0 && sinkou > 1) {
    // :563-570
    await era.printAndWait(
      `${l1}用锐利的视线睨视着魔王军的兵士。但是、她的眼里含着泪水。`,
    );
    await era.printAndWait(
      `从${l1}的股间、很是可爱的小指尺寸的阴茎勃起着、被前列腺液打湿。`,
    );
    await era.printAndWait(
      '「真是个可爱的扶他战士。看到同伴被强奸就很有精神的勃起了吗」',
    );
    await era.printAndWait(
      `眼前的是被侵犯着的同伴们。大半用轻蔑的目光望着${l1}。`,
    );
    await era.printAndWait('「用你的粗鸡鸡侵犯同伴的话、就饶你一命哦」');
    await era.printAndWait(`${l1}被强拽到两侧被抱住的同伴的两腿之间。`);
    await era.printAndWait('她的腰、因为对性交的期待微微晃动着。');
  } else if (rand(3) === 0) {
    // :571-577
    await era.printAndWait(
      `被捕获了的${l0}，为求饶命而向魔王军团发誓忠诚于魔王。`,
    );
    await era.printAndWait('结果被要求向自己信仰的神像撒尿。');
    await era.printAndWait('『做……做不到啦！　这种事……做不到啊……』');
    await era.printAndWait('「是么？你的同伴可是已经成为我们的人啦哦！」');
    await era.printAndWait(
      `一回头，看到曾经一个神殿的${l0}，正坐在另外的神像上拼命地扭腰和怪物交合着。`,
    );
    await era.printAndWait(
      `看着同伴那彻底失去理智的神色，${l0}绝望了，一个激灵，终于忍不住地尿了出来。`,
    );
  } else if (rand(2) === 0) {
    // :578-583
    await era.printAndWait('「今后也一直为肉棒祈祷吧，神官大人。」');
    await era.printAndWait('哪怕在街上的寺院里，凌辱也在继续着。');
    await era.printAndWait('『神啊，为什么要降下这样的试炼……』');
    await era.printAndWait('「废话真多！让你的菊花也感受神的召唤吧！」');
    await era.printAndWait(`魔族男人这么说着，直接贯穿了${l0}的肛门。`);
  } else {
    // :584-589
    await era.printAndWait('『呀！讨厌……啊啊啊！』');
    await era.printAndWait(`年轻的${l1}投降了，当然魔王军可不接受${l2}。`);
    await era.printAndWait('马上就被年轻的魔族轮奸了。');
    await era.printAndWait('「再打点药！药呢？」');
    await era.printAndWait(`已经成为肉便器的${l1}，什么都无法思考了。`);
  }

  return 0; // :589-591
}

/**
 * @GIRL_INV（:594-653）：女（凌辱类型 9）。
 * @param {number} area 战场（原作 ARG:0）
 * @param {number} sinkou 侵攻点档位（原作 ARG:1，已 ÷5000）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function girl_inv(area, sinkou, rand = default_rand) {
  // :597-624 戦場別の称呼（ELSE 臂 = 人间界的三个名字）
  const [l0, l1, l2] = {
    1: ['女司令官', '秘书', '女人'],
    2: ['精灵士官', '侍从', '精灵女性'],
    3: ['龙族女战士', '侍从', '龙族女性'],
    4: ['破邪天使', '侍从', '天使'],
    5: ['破邪天使', '侍从', '天使'],
  }[area] ?? ['女司令官', '秘书', '女人'];

  // :626 第一臂没有侵攻点门槛（与其它函数不同，照抄）
  if (rand(3) === 0) {
    // :626-634
    await era.printAndWait(`据点被攻陷，${l0}成功地突围逃命，不过`);
    await era.printAndWait(`${l0}的${l1}却被女魔族俘虏了。`);
    await era.printAndWait(`「${l0}逃哪去了？告诉我吧！」`);
    await era.printAndWait('『休想！我绝对不会开口的！！……』');
    await era.printAndWait('「呵呵～成为了我们的同类的话，还是这样说么？」');
    await era.printAndWait(
      `${l1}最终在女魔族的快感拷问之下陷落了，按其自身的意愿，被改造成了魔族。`,
    );
    await era.printAndWait(
      `身为女魔族的${l1}的瞳孔深处，仍能察觉对${l0}的恋慕之情。`,
    );
    await era.printAndWait(`不过她现在即将带队，亲手去抓拿${l0}回来拷问！`);
  } else if (rand(2) === 0) {
    // :635-644
    await era.printAndWait(`前线的${l0}和${l1}一起被抓住了。`);
    await era.printAndWait(
      `「${l1}，如果你去侵犯那边的${l0}大人的话，就饶你一命。」`,
    );
    await era.printAndWait('女魔族，淫笑着，拿出一支超大的假阳具。');
    await era.printAndWait('『怎…怎么这样…』');
    await era.printAndWait('『因为我是好人啊！呵呵～～你也想得救的吧……』');
    await era.printAndWait(`${l1}犹豫着装上了假阳具，把${l0}的私处贯穿了。`);
    await era.printAndWait(
      '『呀哇哇哇哇！太大！太突然了！………啊啊啊啊啊啊啊！』',
    );
    await era.printAndWait('『对不起…真的对不起…！』');
    await era.printAndWait('女魔族微笑着，欣赏百合奴隶玩弄对方身体的身姿。');
  } else {
    // :645-651
    await era.printAndWait('『舔…呃呃…舔…』');
    await era.printAndWait(
      '「哦，舔得不错啊！作为百合便器也是有板有眼的呢～」',
    );
    await era.printAndWait('为了犒赏魔王军中的女魔族，设置了百合便器。');
    await era.printAndWait('「肛门也仔细地舔舔。能做到吧？」');
    await era.printAndWait('『是…是的大人…』');
    await era.printAndWait(
      `自尊心已经完全崩溃，作为百合便器的${l2}伸出舌头仔细地舔舐着肛门。`,
    );
  }

  return 0; // :651-653
}

/**
 * @BEAST_INV（:655-697）：兽（凌辱类型 10）。
 * @param {number} area 战场（原作 ARG:0）
 * @param {number} sinkou 侵攻点档位（原作 ARG:1，已 ÷5000）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function beast_inv(area, sinkou, rand = default_rand) {
  // :658-679 戦場別の称呼（ELSE 臂 = 人间界的两个名字）
  const [l0, l1] = {
    1: ['女人', '贵族千金'],
    2: ['精灵猎手', '精灵千金'],
    3: ['龙族女战士', '龙族贵妇'],
    4: ['破邪天使', '天使圣女'],
    5: ['破邪天使', '天使圣女'],
  }[area] ?? ['女人', '贵族千金'];

  // :681 第一臂没有侵攻点门槛（与其它函数不同，照抄）
  if (rand(2) === 0) {
    // :681-687
    await era.printAndWait(
      `在被俘的${l1}身上，施加了强力的催眠魔法，持续的心理暗示，让她成为一只发情期的母兽了。`,
    );
    await era.printAndWait(
      `嫌碍事自己把漂亮端庄的高贵衣服撕得稀烂，${l1}四脚爬爬地跪趴在地，扭动着屁股。`,
    );
    await era.printAndWait('作为魔王军魔兽的性处理用家畜便器，被随军带着。');
    await era.printAndWait(`${l1}完全是一副发情的母兽表情，流着口水喘着粗气。`);
    await era.printAndWait('『哈哈……哈哈……唔哦……～』');
    await era.printAndWait(
      `和魔兽不停地激烈交配着，${l1}发出了像野兽一样的高亢叫声。`,
    );
  } else {
    // :688-695
    await era.printAndWait(
      `在魔王军的驻地里，偶尔被抓获的${l0}作为俘虏被戏耍着。`,
    );
    await era.printAndWait('一只魔兽，被带到她的面前。');
    await era.printAndWait('『要，要干嘛…？……难道……』');
    await era.printAndWait('「久等了各位！兽奸秀马上开始！」');
    await era.printAndWait(
      '围观的男魔族，马上报以热烈的喝彩声，其中还混有少数的女魔族。',
    );
    await era.printAndWait('『这…不是……真的…吧………』');
    await era.printAndWait(
      `${l0}终于明白了自己作为俘虏，地位还在魔兽以下，以牝犬的样子承受着魔兽的侵犯。`,
    );
  }

  return 0; // :695-697
}

/**
 * @BRAIN_INV（:700-738）：脑奸（凌辱类型 11）。
 * @param {number} area 战场（原作 ARG:0）
 * @param {number} sinkou 侵攻点档位（原作 ARG:1，已 ÷5000）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function brain_inv(area, sinkou, rand = default_rand) {
  // :705-720 戦場別の称呼（只有一个名字；ELSE 臂 = 人间界的「女」）
  const [l0] = {
    1: ['女'],
    2: ['女精灵'],
    3: ['龙女'],
    4: ['天使'],
    5: ['天使'],
  }[area] ?? ['女'];

  // :721 第一臂没有侵攻点门槛（与其它函数不同，照抄）
  if (rand(2) === 0) {
    // :721-727
    await era.printAndWait(
      `${l0}司令官的拷问开始了。为了下一步的进军，有必要让她说出全部。`,
    );
    await era.printAndWait(
      '被绑在椅子上，可怕的食脑魔把细小的触手从耳朵伸进脑子里了。',
    );
    await era.printAndWait(
      `发出了噗呲，噗呲的水声，${l0}司令官两眼反白，偶尔哼出短促的喘息。`,
    );
    await era.printAndWait(
      '『啊……是……部队的规模是……唔……补给线在……是……啊……噢……』',
    );
    await era.printAndWait('套取情报的同时，直接往她的脑子里注入了春药。');
    await era.printAndWait(
      '爱液和小便弄脏了椅子，顺着椅脚流下，和地上的血与汗一起，混合成一个小水坑。',
    );
  } else {
    // :728-736
    await era.printAndWait(`${l0}间谍的拷问在持续着。`);
    await era.printAndWait('『无论怎么折磨我，都是徒劳的！…』');
    await era.printAndWait(
      '被打肿的脸上满是刚强的神色，不过这种逞强，在食脑魔出现以后就化为无边的恐惧了。',
    );
    await era.printAndWait('为了自杀在牙齿里藏了毒药，但牙齿已经被拔掉了。');
    await era.printAndWait('食脑魔，一口咬住了间谍的头部。');
    await era.printAndWait(
      '『呜…呀哇哇哇哇，啊啊啊啊啊喔啊啊啊啊噢啊啊啊噢啊！』',
    );
    await era.printAndWait(
      '几分钟之后，大脑和情报都被咀嚼完毕的她，大小便失禁地倒下了。',
    );
    await era.printAndWait(
      '因为这个身体是极品，在大脑里灌满了淫媚的意识，作为慰安用便器被再利用。',
    );
  }

  return 0; // :736-738
}

/**
 * @HORSE_INV（:741-782）：马（凌辱类型 12）。
 * @param {number} area 战场（原作 ARG:0）
 * @param {number} sinkou 侵攻点档位（原作 ARG:1，已 ÷5000）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function horse_inv(area, sinkou, rand = default_rand) {
  // :745-766 戦場別の称呼（ELSE 臂 = 人间界的两个名字）
  const [l0, l1] = {
    1: ['女人', '本地女领主'],
    2: ['女精灵', '精灵女族长'],
    3: ['龙女', '龙族女长老'],
    4: ['天使', '天使长'],
    5: ['十字军', '十字军军官'],
  }[area] ?? ['女人', '本地女领主'];

  // :768 第一臂没有侵攻点门槛（与其它函数不同，照抄）
  if (rand(2) === 0) {
    // :768-774
    await era.printAndWait('魔王军将军骑的马的肚子下，吊着奇妙的肉块。');
    await era.printAndWait(`居然是原来的${l1}，现在成为了马的阴茎套。`);
    await era.printAndWait('被魔法变成了肉袋，很轻易的将马的巨根纳入腔中。');
    await era.printAndWait(`她的脖子上还挂着作为${l1}时的美丽肖像，`);
    await era.printAndWait('不过肖像上贤淑的影子，已经在这个肉袋上找不到了。');
    await era.printAndWait('带着一副贪欲的阿嘿颜，和下流无比的神色在游街。');
  } else {
    // :775-780
    await era.printAndWait(
      `『马奸刑…？那是什么…』${l0}被全裸锁在木马上，挣扎着。`,
    );
    await era.printAndWait('当一匹马勃起着走过来的时候，她马上什么都明白了。');
    await era.printAndWait(
      '『不会吧…不会吧……不要！不要啊！哇哦哦哦哦哦哦哦哦哦哦哦哦哦哦！』',
    );
    await era.printAndWait(`马跨到${l0}身上，将自己的巨根插入了。`);
    await era.printAndWait(
      `${l0}口吐白沫失神了，但马依然非常兴奋，激烈地侵犯着她，大量的精液一吐为快地射在私处里。`,
    );
  }

  return 0; // :780-782
}

module.exports = {
  STUBBED_CALLS,
  invasion_ryouzyoku,
  orc_inv,
  slime_inv,
  insect_inv,
  ivy_inv,
  syokusyu_inv,
  faily_inv,
  giant_inv,
  man_inv,
  girl_inv,
  beast_inv,
  brain_inv,
  horse_inv,
};
