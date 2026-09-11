/**
 * @file 安息日事件（issue #405）：满月献祭与三日一次的信徒仪式。
 *
 * 源: target/ERB/EVENT/EVENT_SABBATH.ERB  @SABBATH（:2-229）、
 *     @SABBATH_DAY（:232-314）
 *
 * 调用点 EVENT_NEXTDAY.ERB:137/:139（每角色每日）在 #400（N16）范围内，
 * 本票只落两个函数的真身，不改调用点、不接线——`ere/event/event-nextday.js`
 * 的 STUBBED_CALLS 仍登记 SABBATH/SABBATH_DAY，接线随该票。
 *
 * 移植说明：
 *   - CFLAG:1 = 角色状态（0=調教中/默认待机 1=待機 2=侵攻中…11=召喚酔い，
 *     target/資料_非必要無須解壓/eramaouフラグまとめ.txt:260）。0 同时是
 *     绝大多数角色平时的默认值——只有真的进入某个特殊状态才会偏离 0，
 *     故 @SABBATH 的 `CFLAG:1 != 0 → 排除` 与「非调教状态排除」两种读法
 *     在实践中重合，照原样搬运判据；
 *   - DAY:2（当月第几日）落 era_flag.date（#5 决议，flag:10002）；
 *   - PRINTDATAW/DATAFORM 的随机取一条按 kojo-dungeon-ravish-man.js 先例
 *     译为 `pick(list, rand)` + `rand` 形参（缺省 Math.random，测试注入
 *     定值序）；
 *   - SAVESTR:TARGET → chara_callname（#5 决议，callname 表无引擎对应）。
 *   - **@SABBATH_DAY 的种族向分支（原作 :291/:298，TALENT:315==11/12「大
 *     地女神」「大海女神」冒渎）是死代码，不构造**：函数入口 :244 无条件
 *     `SIF TALENT:242==0 && TALENT:250==0: RETURN 0` 要求「至少持有法术或
 *     咒术之一」，而这两个种族分支要触发，必须先让 :277（TALENT:250 分支）
 *     与 :284（TALENT:242 分支）的 elseif 判定落空——对共享的
 *     `TALENT:17||TALENT:282` 子句已经为真的前提下，落空即 TALENT:242==0
 *     且 TALENT:250==0，而这组合在入口就已经 RETURN 0，函数根本到不了这
 *     里。三次独立验证（两次人工读 :244/:277/:284/:291/:298 逐行核对、一
 *     次夹具穷举 242/250 四种取值组合只命中前两分支）结论一致，处置口径
 *     同 `get-specialtalent.js` 的闘姫死代码：不实现，登记说明；
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { chara_callname } = require('#/utils/callname-utils');

function get(name) {
  return era.get(name) || 0;
}
function talent(cid, n) {
  return get(`talent:${cid}:${n}`);
}
function abl(cid, n) {
  return get(`abl:${cid}:${n}`);
}
function cflag(cid, n) {
  return get(`cflag:${cid}:${n}`);
}
function add_exp(cid, n, v) {
  era.add(`exp:${cid}:${n}`, v);
}
function add_juel(cid, n, v) {
  era.add(`juel:${cid}:${n}`, v);
}

/** PRINTDATA/PRINTDATAW 的随机取一条（DATAFORM 数组的等价物） */
function pick(list, rand) {
  return list[rand(list.length)];
}

const default_rand = (n) => Math.floor(Math.random() * n);

/**
 * @SABBATH（:2-229）：满月（DAY:2 15 日）时，淫乱且持有法术/咒术素质的
 * 角色对地下城怪物进行性施舍，按经历分支结算私处/肛门/精液/兽奸经验与
 * 对应快感点数。
 *
 * @param {number} cid 角色 ID（原作隐式 TARGET）
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0,n) 整数；缺省
 *   均匀随机，测试注入定值序）
 * @returns {Promise<number>} 0（原作 RETURN 0；调用方不读）
 */
async function sabbath(cid, rand = default_rand) {
  // :12-14 调教状态以外排除（文件头 CFLAG:1 语义）
  if (cflag(cid, 1) !== 0) {
    return 0;
  }
  // :16-18 满月（当月 15 日）以外排除
  if (era_flag.date <= 14 || era_flag.date >= 16) {
    return 0;
  }
  // :20-22 无法术（242）且无咒术（250）排除
  if (talent(cid, 242) === 0 && talent(cid, 250) === 0) {
    return 0;
  }
  // :24-26 非淫乱（76）排除
  if (talent(cid, 76) === 0) {
    return 0;
  }

  // :28-34 各种经历次数：F 口交 A 肛门 B 胸 V 私处 S 精液 Z 兽奸
  let count_a = 0;
  let count_v = 0;
  let count_s = 0;
  let count_z = 0;

  const name = chara_callname(cid);
  const is_futa = talent(cid, 121) !== 0; // 扶她
  const is_male = talent(cid, 122) !== 0; // 男奴隶

  // :36-48 开场：全裸的魔族女性/女奴隶陪侍（男）｜阴茎勃起（扶她）｜邪恶服装（其余）
  const opening = is_male
    ? '全裸的魔族女性和女奴隶在陪侍着，'
    : is_futa
      ? '暴露乳房的装束让阴茎勃起了，'
      : '穿着乳房、性器、屁股全部暴露的邪恶服装，';
  await era.printAndWait(
    `${name}参与了献给无名的淫荡女神的仪式，${opening}对地下城里的怪物们，进行了性施舍。`,
  );

  if (is_male) {
    // :51-54 男奴隶：抱着魔族女人，将精液施舍给了她
    era.print(`${name}抱着魔族女人，`);
    await era.printAndWait('将精液施舍给了她。');
  } else if (is_futa) {
    // :55-77 扶她：抱着魔族女人，将精液施舍给了她（处女/私处封印分支侍奉方式不同）
    era.print(`${name}抱着魔族女人，`);
    await era.printAndWait('将精液施舍给了她。');
    if (talent(cid, 0) || talent(cid, 273)) {
      // 处女或私处封印：只能用肛门侍奉
      era.print(`${name}因为性器被封印着，`);
      await era.printAndWait('所以使用肛门不停地侍奉着阴茎。');
      if (talent(cid, 77)) {
        // 尻穴狂：从后穴传来的快感
        await era.printAndWait(`${name}陶醉在从后穴传递向前穴的快感中。`);
        count_a += 1;
      }
      count_a += rand(10) + 1;
      count_s += count_a + rand(10);
    } else {
      await era.printAndWait('将自己能用上的穴，全部拿来侍奉阴茎。');
      count_v += rand(10) + 1;
      count_a += rand(10) + 1;
      count_s += count_a + count_v + rand(10);
    }
  } else if (talent(cid, 0)) {
    // :78-88 处女：肛门侍奉
    era.print(`${name}纯洁的性器上被贴上了封条。`);
    await era.printAndWait('所以使用肛门不停地侍奉着阴茎。');
    if (talent(cid, 77)) {
      await era.printAndWait(`${name}因肛门的快感而愉悦着。`);
      count_a += 1;
    }
    count_a += rand(10) + 1;
    count_s += count_a + rand(10);
  } else if (talent(cid, 273)) {
    // :89-99 私处封印：肛门侍奉
    era.print(`${name}因为性器被封印着，`);
    await era.printAndWait('所以使用肛门不停地侍奉着阴茎。');
    if (talent(cid, 77)) {
      await era.printAndWait(`${name}陶醉在从后穴传递向前穴的快感中。`);
      count_a += 1;
    }
    count_a += rand(10) + 1;
    count_s += count_a + rand(10);
  } else if (
    cflag(cid, 42) === 79 &&
    (cflag(cid, 40) & 64) !== 0 &&
    get('flag:37')
  ) {
    // :100-110 贞操带（装备 79，装饰位 40 第 64 位，FLAG:37 贞操带系统开关）
    era.print(`${name}因为带着贞操带，`);
    await era.printAndWait('菊穴和嘴巴被塞得满满的，不曾空闲。');
    if (talent(cid, 77)) {
      await era.printAndWait(`${name}陶醉在从后穴传递向前穴的快感中。`);
      count_a += 1;
    }
    count_a += rand(10) + 1;
    count_s += count_a + rand(10);
  } else if (abl(cid, 39) >= 1 && rand(2) === 0) {
    // :111-135 兽奸中毒：地下城野兽群交
    if (abl(cid, 17) >= 1) {
      // 露出癖：慕名而来的人潮
      era.print(
        `${name}有着喜欢与野兽交配的传闻，聚集了很多从地下城里慕名而来的人。`,
      );
      count_v += abl(cid, 17);
      count_a += abl(cid, 17);
    }
    await era.printAndWait(`${name}满心欢喜地用性器迎接了猪的阴茎。`);
    era.print('为路人呈现了一场献给邪神的兽奸秀。');
    if (talent(cid, 75)) {
      count_v += 1; // 性爱狂
    }
    if (talent(cid, 77)) {
      count_a += 1; // 尻穴狂
    }
    count_v += rand(10) + abl(cid, 39);
    count_a += rand(10) + abl(cid, 39);
    count_s += count_a + count_v + rand(10);
    count_z += count_s;
  } else {
    // :136-166 其余：路过的怪物们轮流侵犯
    if (abl(cid, 17) >= 1) {
      era.print(`${name}在观众的欢呼声中，开始了乱交派对。`);
      count_v += abl(cid, 17);
      count_a += abl(cid, 17);
    }
    if (abl(cid, 16) >= 1) {
      era.print(
        `无论是多么丑陋的怪物和魔族，${name}都一视同仁地给予了性施舍。`,
      );
      count_v += abl(cid, 16);
      count_a += abl(cid, 16);
    }
    era.print(`有空的怪物们不停地排着队，将她所有能用的穴都侵犯了一遍。`);
    await era.printAndWait(
      '浑身里里外外都沾满了精液，整个广场被异样的臭味笼罩着。',
    );
    if (talent(cid, 75)) {
      count_v += 1;
    }
    if (talent(cid, 77)) {
      count_a += 1;
    }
    count_v += rand(10) + 1;
    count_a += rand(10) + 1;
    count_s += count_a + count_v + rand(10);
  }

  // :168-225 经验结算
  if (count_a > 0) {
    era.print(`肛门经验+${count_a}`); // %EXPNAME:1%
    add_exp(cid, 1, count_a);
  }
  if (count_v > 0) {
    era.print(`私处经验+${count_v}`); // %EXPNAME:0%
    add_exp(cid, 0, count_v);
  }
  const intercourse = count_a + count_v;
  if (intercourse > 0) {
    era.print(`性交经验+${intercourse}`); // %EXPNAME:5%
    add_exp(cid, 5, intercourse);
  }
  if (count_s > 0) {
    era.print(`精液经验+${count_s}`); // %EXPNAME:20%
    add_exp(cid, 20, count_s);
  }
  if (count_z > 0) {
    era.print(`兽奸经验+${count_z}`); // %EXPNAME:56%
    add_exp(cid, 56, count_z);
  }
  if (count_a > 0) {
    era.print(`肛门点数+${count_a}`); // %PALAMNAME:2%
    add_juel(cid, 2, count_a);
  }
  if (count_v > 0) {
    era.print(`私处点数+${count_v}`); // %PALAMNAME:1%
    add_juel(cid, 1, count_v);
  }
  const shame = (count_a + count_v + count_s + count_z) * 10;
  if (shame > 0) {
    era.print(`欲情点数+${shame}`); // %PALAMNAME:5%
    era.print(`耻情点数+${shame}`); // %PALAMNAME:8%
    add_juel(cid, 5, shame);
    add_juel(cid, 8, shame);
  }

  // :222-225 童贞丧失（男性初次同性仪式的副作用，随开场分支可能已非处）
  if (talent(cid, 1)) {
    era.print('【童贞丧失】');
    chara(cid).train.童贞 = 0;
  }

  await era.waitAnyKey();
  return 0;
}

/**
 * @SABBATH_DAY（:232-314）：每 3 日一次的信徒集会演出（陷落且信仰值 ≥40
 * 的持法术/咒术角色），四种题材按 RAND:4 分派，纯演出、无数值结算。
 *
 * @param {number} cid 角色 ID（原作隐式 TARGET）
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0,n) 整数；缺省
 *   均匀随机，测试注入定值序）
 * @returns {Promise<number>} 0（原作 RETURN 0）
 */
async function sabbath_day(cid, rand = default_rand) {
  // :237-241 每 3 日一次（当月日期 % 3 != 0 跳过）
  if (era_flag.date % 3 > 0) {
    return 0;
  }
  // :243-245 无法术（242）且无咒术（250）排除
  if (talent(cid, 242) === 0 && talent(cid, 250) === 0) {
    return 0;
  }
  // :247-249 未陷落排除
  if (cflag(cid, 0) === 0) {
    return 0;
  }
  // :251-253 信仰值需 ≥40
  if (cflag(cid, 152) < 40) {
    return 0;
  }

  const user = rand(4); // SABBATH_USER
  const name = chara_callname(cid);
  era.println();
  era.print(`${name}参与了献给无名的淫荡女神的仪式，`);
  era.println();

  if (user === 0 && get('item:22')) {
    // :261-267 兽奸仪式（需持有「野良犬」道具 22）
    await era.printAndWait(
      pick(
        [
          '祭坛前，信徒的少女和山羊交配了起来……',
          '为了收集狗的精液的女信徒用嘴巴不停收集着……',
          '祭坛前，信徒的人妻和狗交配着……',
        ],
        rand,
      ),
    );
  } else if (user === 1 && cflag(cid, 152) > 80) {
    // :268-274 乱交仪式
    await era.printAndWait(
      pick(
        [
          '祭坛前，信众们开始做起了爱……',
          '新婚的信众夫妇们玩起了交换Play……',
          '祭坛前年轻的信众们乱交了起来……',
        ],
        rand,
      ),
    );
  } else if (
    user === 2 &&
    cflag(cid, 152) > 60 &&
    talent(cid, 250) &&
    (talent(cid, 17) || talent(cid, 282))
  ) {
    // :276-282 冒渎昔日信仰的死亡女神
    era.print('向潜藏地底的死亡女神');
    await era.printAndWait(
      pick(['献上了她被侵犯着的淫荡画像……', '的圣器里自慰发泄着……'], rand),
    );
  } else if (
    user === 2 &&
    cflag(cid, 152) > 60 &&
    talent(cid, 242) &&
    (talent(cid, 17) || talent(cid, 282))
  ) {
    // :284-289 冒渎昔日信仰的纯洁神圣女神
    era.print('向纯洁的神圣女神');
    await era.printAndWait(
      pick(
        ['唱起了她被人侵犯着的歌词……', '展示着她的信徒在野外被玷污的画面……'],
        rand,
      ),
    );
  } else {
    // :291-304（315==11/12 种族分支）是死代码，不构造，见文件头
    // :305-314 其余：泛用题材
    await era.printAndWait(
      pick(
        [
          '祭坛前，信徒的女孩自慰了起来……',
          '献上了淫荡的雕像，信徒的少年在那上面喷上了精液……',
          '献上了信徒的女精灵和兽人做爱的模样……',
        ],
        rand,
      ),
    );
  }

  return 0;
}

module.exports = { sabbath, sabbath_day };
