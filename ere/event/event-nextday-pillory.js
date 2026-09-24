/**
 * @file 示众台 @PILLORY（issue #400 / N16）。
 *
 * 源: target/ERB/EVENT/EVENT_NEXTDAY.ERB  @PILLORY（:1465-2426）
 *
 * 调用点 EVENT_NEXTDAY.ERB:135（每角色每日、在日循环的角色事件段内）——
 * `ere/event/event-nextday.js` 的 run_event_nextday 逐角色调用本函数。
 * 单独成文件是因为 §949 行里绝大部分是**文本表**（涂鸦、素质台词、叙述），
 * 与主文件的判定逻辑不同类；追溯锚在 tools/trace-refs/event-nextday.mjs。
 *
 * 移植说明：
 *   - 状态门：`CFLAG:1 != 8`（示众台状态以外）即早退；
 *   - 使用次数（COUNT_F/A/B/V/S/Z）是 #DIM 局部量，按 JS 局部处理；
 *     `RAND:N` 一律经形参注入（缺省 Math.random，测试注入定值序）；
 *   - 涂鸦与台词的 SELECTCASE 一律按表驱动（同一维度一条表），表序即 CASE 序；
 *   - `LOCALS`（局部字符串）跨「职业十连」与尾部 SELECTCASE 使用（原作靠
 *     LOCAL/LOCALS 这两个内建局部量传递），此处落一个 JS 局部变量；
 *   - `%SHE()%` 是招式函数（男人→他 / 其余→她，魔改新增/文本校正.ERB 的三行
 *     纯函数，随本票内联）；
 *   - 跨边：`CALL CAMPAIGN_EXP_PILLORY`（:2390）真身未交付 → 存根 + 登记；
 *     `CALL IN_VAGINA_SYOKU_TO_T` / `CONCEPTION_CHECK_SYOKU_TO_T`（:2421/:2422）
 *     在 ere/event/event-pregnancy.js 已有真身 → 直接调用（#400 接线）。
 */

'use strict';

const era = require('#/era-electron');
const { game } = require('#/facade/game');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');
const { clothtype_main2_text } = require('#/page/page-clothtype');
const {
  conception_check_syoku_to_t,
  in_vagina_syoku_to_t,
} = require('#/event/event-pregnancy');

/** 原作 RAND:N（0..N-1）的缺省随机源 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** %TALENTNAME:n% 的读数源 */
function talent_name(n) {
  return era.get(`talentname:${n}`) ?? '';
}

/** %PALAMNAME:n% 的读数源 */
function palam_name(n) {
  return era.get(`palamname:${n}`) ?? '';
}

/** SHE() 代词：男人 → 他，其余 → 她 */
function she(cid) {
  return (era.get(`talent:${cid}:122`) || 0) !== 0 ? '他' : '她';
}

/** 涂鸦开场（临月 / 妊娠 / 其余三支；%SAVESTR% 用调用时的名字填） */
const GRAFFITI_LATE_TERM = [
  '『淫乱的大肚便器，小{n}～』',
  '『快临盘了，但是还是不能忘掉鸡鸡的味道～』',
  '『咦……这样淫乱的妈妈好讨厌～』',
];
const GRAFFITI_PREGNANT = [
  '『祝贺怀孕！』',
  '『随便怀孕不知廉耻的小{n}～』',
  '『怀着不知道父亲是谁的孩子！』',
];
const GRAFFITI_PLAIN = [
  '『精液便器，小{n}哦～』',
  '『请惩罚{n}吧！』',
  '『请随意使用。』',
  '『性处理用便器』',
  '『男厕所』',
  null, // :1581-1582 只在非男人时打印【最爱鸡鸡的婊子便器女】
  '『最爱鸡鸡的婊子便器女』',
];

/** 职业（TALENT:200..209）的十连台词（性器不可用 / 可用两支） */
const JOB_BANNED = [
  '『{n}是肛门特别有感觉的变态{t}』',
  '『{t}勇者{n}，是各位专用的变态肛交妻』',
  '『前穴是魔王大人的专用通道！』',
];
const JOB_NORMAL = [
  '『用肉穴向大家道歉』',
  '『{t}勇者{n}，除了中出，做什么都可以』',
  '『免清洗的阴茎入口』',
];

/** 使用次数掷里的兽奸三句（CASE 序） */
const BEAST_TAGS = ['『谁的鸡鸡都OK！』', '『最爱兽奸！』', '『兽奸死忠』'];

/** 使用次数掷里的其余四句 */
const PLAIN_TAGS = [
  '『什么都可以放进去』',
  '『精液的垃圾箱』',
  '『淫乱』',
  '『中出记录更新中』',
];

/** 涂鸦末段（RAND:14） */
const LAST_TAGS = [
  '『浑身的精液臭味真对不起！』',
  '『勇者之耻』',
  '『热烈欢迎不负责任的中出』',
  '『记住{n}这个名字哦！』',
  '『喜欢一边被殴打，一边被侵犯』',
  '『弱小的』',
  '『我们的目标是——黑木耳』', // :1911-1912 非男人限定（PRINT 『我们的目标是——黑木耳』）
  '『里面请用精液来好好关爱』',
  '『ＷＣ』',
  '『请侵犯来自遥远农村的私处』', // :1918-1919 非男人限定（PRINT 『请侵犯来自遥远农村的私处』）
  '『请卜滋卜滋干个爽吧』',
  '『想要你的阴茎』',
  '『好色的{j}』',
  '『肉穴{j}』',
];

/** 涂鸦「正字」计数表名（CFLAG:661..665） */
const TALLY_SLOTS = [
  ['肉穴使用次数：', '中出次数：', '性经验急速上升中：', '小穴：', '被播种：'],
  ['肛门使用次数：', '菊穴使用次数：', '菊穴：', '屁股：'],
  ['嘴巴：', '污垢处理：', '口爆：'],
  ['胸部：', '乳房：'],
  ['『'],
];

/** 兽奸叙述的侵犯者名（PILLORY_USER 1..4，缺省 5 复用 4） */
const BEAST_USERS = [null, '魔兽', '猪', '小马', '狗'];
/** A&V / A 单支叙述的侵犯者名 */
const HUMAN_USERS = [null, '魔族男人', '暗精灵的少年', '下等恶魔', '兽人'];

/**
 * @PILLORY（:1465-2426）：示众台的每日凌辱结算。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 恒 0（原作 :2419-2426 `RETURN 0`）
 */
async function pillory(rand = default_rand) {
  const cid = era_flag.target; // 原作隐式 TARGET
  if ((era.get(`cflag:${cid}:1`) || 0) !== 8) {
    return 0; // :1476-1477 晒し台状態以外は除外
  }

  const name = chara_callname(cid); // %SAVESTR:TARGET%
  const master = chara_callname(0); // %CALLNAME:MASTER%
  const talent = (n) => era.get(`talent:${cid}:${n}`) || 0;
  const cflag = (n) => era.get(`cflag:${cid}:${n}`) || 0;

  // :1480-1488 各种使用次数 + 侵犯者代表
  let count_f = 0;
  let count_a = 0;
  let count_b = 0;
  let count_v = 0;
  let count_s = 0;
  let count_z = 0;
  let user = rand(5) + 1; // :1488 PILLORY_USER = RAND:5（叙述里用 1..5）

  era.drawLine(); // :1490-1491（示众刑标题行）
  let head = `示众刑：${name}`; // :1491
  if (cflag(110) === era_flag.day_count)
    head += '（出产）'; // :1492-1493
  else if (cflag(110) - 2 <= era_flag.day_count && talent(153))
    head += '（临月）'; // :1494-1495
  else if (talent(153))
    head += '（怀孕中）'; // :1496-1497
  else if (talent(0))
    head += '（处女）'; // :1498-1499
  else if (talent(273)) head += '（前穴封印）'; // :1500-1501
  era.print(head); // :1500-1503（五种状态标签的 ELSEIF 链 + PRINTL）
  era.drawLine(); // :1504-1505（被固定在示众台上。）
  era.print(
    `被固定在示众台上。${clothtype_main2_text(cid)}姿态的${name}被大群男性围观着。${name}`,
  ); // :1505-1508（PRINT + CALL PRINT_CLOTHTYPE_MAIN2 + PRINTFORML，拼一行）

  const belly =
    cflag(110) - 2 <= era_flag.day_count && talent(153)
      ? '保护着自己的大肚子，'
      : cflag(661) + cflag(662) === 0
        ? '不安地颤抖着，'
        : cflag(661) + cflag(662) < 20
          ? '被多次中出的不快感折磨着，'
          : cflag(661) + cflag(662) < 50
            ? '无法睡觉，眼睛通红着，'
            : cflag(661) + cflag(662) < 100
              ? '在无穷无尽的凌辱中，奄奄一息地大口喘着气，'
              : '全身都被精液沾满了，';
  era.print(belly); // :1509-1521

  if (talent(163)) {
    // :1523-1531 高贵
    era.print(
      [
        '咬紧牙关，拼命忍耐着……',
        '一言不发地忍耐着……',
        '强压下啜泣的声音，忍耐着……',
      ][rand(3)],
    );
  } else if (talent(15) || talent(24) || talent(30)) {
    // :1533-1541 高姿态/保守的/看重贞操
    era.print(
      [
        '不停地扭动着身体企图阻止侵犯……',
        `用凶悍的眼神瞪着凌辱${she(cid)}的人……`,
        '发出了怨恨的声音……',
      ][rand(3)],
    );
  } else {
    era.print('忍受着耻辱……'); // :1543
  }
  era.print(''); // :1543-1546（非高贵/非保守时的 PRINTL + 空行）

  // :1549-1584 落書き（%SAVESTR% 只在偶数 CASE 出现，n 即目标名）
  const graffiti =
    cflag(110) - 2 <= era_flag.day_count && talent(153)
      ? GRAFFITI_LATE_TERM
      : talent(153)
        ? GRAFFITI_PREGNANT
        : GRAFFITI_PLAIN;
  const pick_graffiti = (table, rolled) => table[rolled];
  if (graffiti === GRAFFITI_LATE_TERM || graffiti === GRAFFITI_PREGNANT) {
    era.print(pick_graffiti(graffiti, rand(3)).replaceAll('{n}', name));
  } else {
    const rolled = rand(6);
    const line = pick_graffiti(graffiti, rolled);
    // :1581-1582 CASE 5 是「非男人限定」——条件不成立时该轮什么都不打印
    if (line !== null && !(rolled === 5 && talent(122))) {
      era.print((line ?? '').replaceAll('{n}', name));
    }
  }

  // :1586-1613 职业十连（TALENT:200..209）：有该项才掷、掷即打印，LOCALS 留到最后
  let locals = '';
  for (let i = 0; i < 10; i += 1) {
    const slot = i + 200;
    if (talent(slot) > 0) {
      const job = talent_name(slot);
      locals = job;
      const table = talent(0) || talent(273) ? JOB_BANNED : JOB_NORMAL;
      era.print(
        table[rand(3)]
          .replaceAll('{t}', job)
          .replaceAll('{n}', name)
          .replaceAll('{j}', job),
      );
    }
  }

  // :1615-1663 使用次数掷（处女 / 菊花专用 / 兽奸 / 贞操带 / 其余）
  const belt =
    (cflag(42) || 0) === 79 &&
    ((cflag(40) || 0) & 64) !== 0 &&
    era.get('flag:37');
  if (talent(0)) {
    era.print('『处女』'); // :1616
    count_a += rand(20) + 1;
    count_f += rand(10) + 1;
    count_s += count_a + count_f + rand(10);
  } else if (talent(273)) {
    era.print('『菊花专用』'); // :1621
    count_a += rand(20) + 1;
    count_f += rand(10) + 1;
    count_s += count_a + count_f + rand(10);
  } else if ((era.get(`abl:${cid}:39`) || 0) >= 1 && rand(2) === 0) {
    era.print(BEAST_TAGS[rand(3)]); // :1628-1632
    count_f += rand(10) + 1;
    count_v += rand(10) + 1;
    if (belt) count_v = 0; // :1637-1638 貞操帯
    count_a += rand(10) + 1;
    count_s += count_f + count_a + count_v + rand(10);
    count_z += count_s;
  } else if (belt) {
    era.print('『私处禁入！』'); // :1644
    count_a += rand(20) + 1;
    count_f += rand(10) + 1;
    count_s += count_a + count_f + rand(10);
  } else {
    era.print(PLAIN_TAGS[rand(4)]); // :1650-1657
    count_f += rand(10) + 1;
    count_v += rand(10) + 1;
    count_a += rand(10) + 1;
    count_s += count_f + count_a + count_v + rand(10);
  }

  // :1665-1701 高姿态
  if (talent(15)) {
    const rolled = rand(3);
    if (rolled === 0) {
      era.print('『自尊心很高的便器哦！』');
    } else if (rolled === 1) {
      // :1671-1697「<种族>之耻」：TALENT:314 十一支
      const race =
        [
          '人类',
          '精灵',
          '狼人',
          '吸血鬼',
          '无头骑士',
          '龙族',
          '天使',
          '暗精灵',
          '堕天使',
          '魔族',
          '霍比特人',
          '矮人',
        ][talent(314)] ?? '';
      era.print(`『${race}之耻』`);
    } else {
      era.print('『死脑筋』');
    }
  }
  if (talent(22) || talent(21)) era.print('『性冷淡』'); // :1703-1706
  if (talent(24) || talent(30) || talent(163)) {
    // :1709-1733 保守的/看重贞操/高贵
    const rolled = rand(5);
    if (rolled === 0) {
      era.print(talent(122) ? '『某家的大少爷』' : '『某家的大小姐』');
    } else if (rolled === 1) {
      era.print(
        talent(0) || talent(273) || talent(122)
          ? '『享受名门世家的肛门吧』'
          : '『享受名门世家的小穴吧』',
      );
    } else if (rolled === 2) {
      era.print('『我很幼稚，请大家用肉棒来教育我吧！』');
    } else if (rolled === 3) {
      era.print(talent(122) ? '『大少爷』' : '『大小姐』');
    }
  }
  if (talent(42)) era.print('『马上就湿的荡妇』'); // :1734-1737
  if (talent(61)) {
    // :1739-1753 不怕污臭
    era.print(
      [
        '『喜欢脏东西』',
        '『请让我舔大家的屁股』',
        '『肮脏的小鸡鸡优先』',
        '『热烈欢迎脏东西』',
        '『做完之后记得尿我身上哦！』',
      ][rand(5)],
    );
  }
  if (talent(70) || talent(73)) era.print('『BITCH』'); // :1755-1758
  if (talent(82)) {
    // :1760-1771 讨厌男人
    const rolled = rand(3);
    if (rolled === 0 && !talent(122)) era.print('『变态百合女』');
    else if (rolled === 1) era.print('『我想跟女孩子做爱』');
    else if (rolled === 2) era.print('『谢绝男人的小鸡鸡』');
  }
  if (talent(100)) {
    // :1773-1783 娇小
    era.print([`『${name}，八岁』`, '『←死小孩』', '『小孩肉穴』'][rand(3)]);
  }
  if (talent(109) || talent(116)) {
    // :1785-1796 贫乳/绝壁
    const rolled = rand(3);
    if (rolled === 0) era.print('『砧板一样的，真对不起！』');
    else if (rolled === 1) era.print('『大家来帮我揉大吧！』');
    else if (!talent(122)) era.print('『前后一致的女人』');
  }
  if (talent(110) || talent(114) || talent(119)) {
    // :1798-1808 巨乳/爆乳/超乳
    era.print(['『大胸部』', '『笨蛋乳』', '『胸大无脑』'][rand(3)]);
  }
  if (talent(121)) {
    // :1810-1822 扶她（阴茎的状态五支）
    const state = talent(318); // TALENT:阴茎的状态
    era.print(
      [
        '『肉棒耶～』',
        '『短小包茎的小鸡鸡漏出精液了哦～』',
        '『这鸡鸡啊……』',
        '『改造的马鞭！』',
        '『肉棒勃起ing』',
      ][state >= 1 && state <= 4 ? state - 1 : 4],
    );
  } else if (talent(122)) {
    // :1823-1833 男人
    era.print(['『人妖小子』', '『男娼』', '『喜欢被操的男人』'][rand(3)]);
  }
  if (talent(248)) era.print('『大猩猩』'); // :1835-1838
  if (talent(140)) {
    // :1840-1849 恋母情结
    era.print(
      ['『妈妈快来看～』', '『妈妈救救我～』', '『比妈妈更淫乱』'][rand(3)],
    );
  }
  if (talent(141)) {
    // :1851-1860 恋父情结
    era.print(
      ['『爸爸快来看～』', '『想要爸爸的小鸡鸡～』', '『爸爸的鸡鸡最棒！』'][
        rand(3)
      ],
    );
  }
  if (talent(142)) {
    // :1862-1871 萝莉控
    era.print(
      ['『萝莉猪』', '『因为萝莉的小穴而兴奋』', '『淫乱萝莉控』'][rand(3)],
    );
  }
  if (talent(143)) {
    // :1873-1883 正太控
    const rolled = rand(3);
    if (rolled === 0) era.print('『正太专用便器』');
    else if (rolled === 1) era.print('『正太小鸡鸡爱好者』');
    else if (!talent(122)) era.print('『对不起，我是痴女』');
  }
  if (talent(153)) {
    // :1885-1895 妊娠
    era.print(
      [
        '『恭喜怀孕！』',
        '『十分感谢大家让我怀孕』',
        '『长枪体内过，腹中婴儿来』',
      ][rand(3)],
    );
  }

  {
    // :1897-1928 通用十四句（%SAVESTR% 与 %LOCALS% 两种占位）
    const rolled = rand(14);
    const line = LAST_TAGS[rolled];
    const male_only_missing =
      (rolled === 6 || rolled === 9) && talent(122) !== 0; // :1906-1912 与 1913-1919（两处非男人限定 CASE）
    if (!male_only_missing) {
      era.print(line.replaceAll('{n}', name).replaceAll('{j}', locals));
    }
  }

  // :1930-2036 CFLAG:661 ≥ 30 时的追加涂鸦（按 COUNT_V 与妊娠三支）
  if (cflag(661) >= 30) {
    if (count_v > 0) {
      if (cflag(110) - 2 <= era_flag.day_count && talent(153)) {
        era.print(
          [
            `『小${name}在怀孕期间也性欲旺盛着』`,
            '『怀孕中，母乳畅饮』',
            '『怀上了不知父亲是谁的孩子』',
            `『${name}的宝宝也请多多指教呢～』`,
            '『一起期待次时代的勇者吧！』',
            '『孕妇』',
            '『肚子大了』',
            '『给小宝宝精液吧！』',
            '『怀孕以后屄里的肉褶越来越多了哦』',
            '『啊～大肚子真碍事～』',
          ][rand(10)],
        );
      } else if (talent(153)) {
        const rolled = rand(10);
        // :1974-1975 CASE 7 是「非男人限定」（PRINT 『月经已停』）——条件不成立时该轮什么都不打印
        const line = [
          `『小${name}稍微胖了吗？』`,
          '『这家伙受精了吗？』',
          '『受精了』',
          `『${name}的宝宝也请多多指教呢～』`,
          '『一起期待次时代的勇者吧！』',
          '『战败纪念受精』',
          '『托各位的福，胸变大了←怀孕了而已吧』',
          '『月经已停』',
          '『乳头变得黑起来了』',
          '『让这家伙的肚子越来越大真的没问题吗？』',
        ][rolled];
        if (!(rolled === 7 && talent(122))) era.print(line);
      } else {
        const rolled = rand(12);
        // :2003-2006 CASE 9 是「非男人限定」（PRINT 『小穴变一层层了』）
        const line = [
          '『现在肉穴松弛了』',
          '『被干怀孕了谢谢大家』',
          '『不管什么都好，想要怀孕啊～』',
          `『来领养${name}的宝宝吧』`,
          '『过于风流』',
          '『确认怀孕』',
          '『感谢精液』',
          '『渴望受精！』',
          '『这家伙的肉穴太厉害了』',
          '『小穴变一层层了』',
          '『←摇啊摇』',
          '『↓插啊插』',
        ][rolled];
        if (!(rolled === 9 && talent(122))) era.print(line);
      }
    } else {
      era.print(
        [
          '『用的太多，尻穴开始松弛了』',
          '『粪穴太松了』',
          '『屁股真漂亮』',
          '『太臭了』',
          // :2022 CASE 4 是「非男人且处女限定」——条件不成立时该轮什么都不打印
          !talent(122) && talent(0) ? '『明明是处女，肛门却很淫荡』' : null,
          '『请让我的肛门喝很多精液吧』',
          '『啊啊……括约肌断了。』',
          '『这家伙的粪穴真臭』',
          '『肛交便器』',
          '『用肛门向大家道歉』',
        ].filter((line, i) => line !== null || i !== 4)[rand(10)] ?? '',
      );
    }
  }

  // :2042-2050 正字计数累加
  era.add(`cflag:${cid}:661`, count_v);
  era.add(`cflag:${cid}:662`, count_a);
  era.add(`cflag:${cid}:663`, count_f);
  era.add(`cflag:${cid}:664`, count_b);
  era.add(`cflag:${cid}:665`, count_s - count_v - count_a - count_f - count_b);

  // :2051-2118 正字显示（五个槽，各自 RAND 选表头 + 五进制笔画）
  for (let slot = 0; slot < 5; slot += 1) {
    const value = cflag(661 + slot);
    if (value <= 0) continue;
    const heads = TALLY_SLOTS[slot];
    const head = slot === 4 ? heads[0] : heads[rand(heads.length)];
    let line = `『${head}`;
    if (slot !== 4) {
      if (value >= 5) line += '正 '.repeat(Math.floor(value / 5));
      line += ['', '一', '丅', '下', '㠪'][value % 5];
    }
    era.print(`${line}』`);
  }
  // :2120-2127 正字里程碑
  if (cflag(661) > 9) era.print('『真的一个打十个！』');
  if (cflag(661) > 29) era.print('『突破三十！！』');
  if (cflag(661) > 49) era.print('『祝贺！达成了五十！！！』');
  if (cflag(661) > 99) era.print('『正字写太多了，有点恶心』');
  // :2128-2129 的 PRINTL 只结束上面 :2120-2127 那一串 `PRINT 『…』` 拼起来
  // 的一行（PRINT 不换行），**不是空行**（#597）。ere 侧每段涂鸦各自一次
  // print，「同一条涂鸦行被拆成多行」是既有记名差异（不在本票范围）
  era.print(`${name}被各种侮辱的涂鸦写在身上了……`); // :2129
  await era.waitAnyKey(); // :2131 WAIT
  era.print(''); // :2129-2133 真空行：2129 行的 PRINTFORML 已收尾（2133 行的 PRINTL 落在空行上）

  // :2135-2310 侵犯叙述（兽奸 / A&V / A / 其余四支）
  const user_name = BEAST_USERS[user] ?? BEAST_USERS[4];
  const human_name = HUMAN_USERS[user] ?? HUMAN_USERS[4];
  if (count_z > 0) {
    era.print(`被拘束着的${name}，抬起了屁股，被${user_name}侵犯着。`);
    if (rand(3) === 0) {
      // eslint-disable-next-line no-irregular-whitespace -- 原文全角空格
      era.print(`『这个大变态！　${user_name}的小鸡鸡就这么舒服么』`);
    } else if (rand(2) === 0) {
      era.print('『讨厌，像野兽一样……』');
    } else {
      era.print('『感觉如何！？大声说交配很舒服！』');
    }
  } else if (count_a > 0 && count_v > 0) {
    era.print(`被拘束着的${name}，抬起了屁股，被${human_name}侵犯着。`);
    // :2176-2177 高姿态之类时换成「猪」的名字表（原作 SIF TALENT:143 → USER = 2）
    const ranked = talent(143) ? 2 : user;
    const partner = HUMAN_USERS[ranked] ?? HUMAN_USERS[4];
    if (ranked === 1) {
      if (rand(3) === 0) era.print('『做吧！真正的免费小穴！』');
      else if (rand(2) === 0) {
        era.print('魔族男人舒畅地射精了。');
        era.print('『不准漏出来，你敢漏出来就给你塞嘴里』');
      } else era.print('『要…流出来了！』『喂！太快了吧！我再给你塞上……』');
    } else if (ranked === 2) {
      if (rand(3) === 0) {
        era.print(
          talent(122)
            ? '『大哥哥……我已经忍不住了！』'
            : '『大姐姐……我已经忍不住了！』',
        );
      } else if (rand(2) === 0) era.print('『啊啊啊……全部出来了！』');
      else {
        era.print('少年拼命地挺动着腰');
        if (!talent(122)) era.print('『大姐姐！～大姐姐！』');
      }
    } else if (ranked === 3) {
      if (rand(3) === 0) era.print('『这个下等便器！』');
      else if (rand(2) === 0) era.print('『听说是免费的…又臭又脏呢』');
      else era.print('『好好来侍奉！』');
    } else {
      if (rand(3) === 0)
        era.print('『啊哈！！肛门也很舒服！来，怀上我的孩子吧！』');
      else if (rand(2) === 0) era.print('『呵呵～魔王大人！太感谢您了……』');
      else era.print('『哇哈哈！这个程度还不足以谢罪啊！』');
    }
    void partner;
  } else if (count_a > 0) {
    era.print(`被拘束着的${name}，抬起了屁股，被${human_name}侵犯着。`);
    const ranked = talent(143) ? 2 : user;
    if (ranked === 1) {
      if (rand(3) === 0) era.print('『走后门的时候，前面的穴居然在潮吹哦！』');
      else if (rand(2) === 0) era.print('『真是淫乱的肛门啊……』');
      else era.print('『后庭已经变得这么柔软了啊？』');
    } else if (ranked === 2) {
      if (rand(3) === 0) {
        era.print(
          talent(122)
            ? '『大哥哥的肛穴……好舒服啊…………』'
            : '『大姐姐的肛穴……好舒服啊…………』',
        );
      } else if (rand(2) === 0) era.print('『啊啊啊……肛穴发出啪啪啪的声音！』');
      else {
        era.print('少年拼命地挺动着腰');
        era.print(
          talent(122)
            ? '『摆脱处男了……用大哥哥的菊花摆脱处男了……』'
            : '『摆脱处男了……用大姐姐的菊花摆脱处男了……』',
        );
      }
    } else if (ranked === 3) {
      if (rand(3) === 0) era.print('『这个下等便器！』');
      else if (rand(2) === 0) era.print('『听说是免费的…又臭又脏呢』');
      else era.print('『好好来侍奉！』');
    } else {
      if (rand(3) === 0)
        era.print('『哈哈！！　后庭最棒啦！　用我的精液来给你灌肠！』');
      else if (rand(2) === 0) era.print('『呵呵～魔王大人！太感谢您了……』');
      else era.print('『哇哈哈！这个程度还不足以谢罪啊！』');
    }
  } else {
    if (rand(3) === 0) {
      era.print(`兽人巨汉，粗鲁地拿${she(cid)}来处理精液。`);
      era.print('『哇哈哈！只有屄穴还算有点用处！』');
    } else if (rand(2) === 0) {
      era.print(`妖精们排着队来侵犯${she(cid)}的屁股。`);
      era.print('『嘻嘻嘻嘻～真舒服…』');
    } else {
      era.print('肥胖的兽人正侵犯着肛门。');
      era.print('『啊哈哈！接受我的种子吧！！』');
    }
  }

  // :2313-2379 经验与珠结算
  if (count_a > 0) {
    era.print(`${era.get('expname:1') ?? ''}+${count_a}`);
    chara(cid).dungeon.肛门经验 += count_a;
  }
  if (count_v > 0 && !talent(122)) {
    era.print(`${era.get('expname:0') ?? ''}+${count_v}`);
    chara(cid).dungeon.私处经验 += count_v;
  }
  if (count_a + count_v > 0) {
    era.print(`${era.get('expname:5') ?? ''}+${count_a + count_v}`);
    chara(cid).dungeon.性交经验 += count_a + count_v;
  }
  if (count_s > 0) {
    era.print(`${era.get('expname:20') ?? ''}+${count_s}`);
    chara(cid).dungeon.精液经验 += count_s;
  }
  if (count_f > 0) {
    era.print(`${era.get('expname:22') ?? ''}+${count_f}`);
    chara(cid).dungeon.口交经验 += count_f;
  }
  if (count_z > 0) {
    era.print(`${era.get('expname:56') ?? ''}+${count_z}`);
    chara(cid).dungeon.兽奸经验 += count_z;
  }
  if (count_a > 0) {
    era.print(`${palam_name(2)}点数+${count_a}`);
    era.add(`juel:${cid}:2`, count_a);
  }
  if (count_v > 0 && !talent(122)) {
    era.print(`${palam_name(1)}点数+${count_v}`);
    era.add(`juel:${cid}:1`, count_v);
  }

  const grader = talent(0) + talent(15) + talent(24) + talent(30) + talent(163);
  const local0 = Math.floor(
    ((count_a + count_v + count_s + count_z) * (10 + grader)) / 2,
  );
  if (local0 > 0) {
    if (cflag(661) > 50) {
      const bonus = Math.floor((local0 * cflag(661)) / 50);
      era.print(`${palam_name(6)}点数+${bonus}`);
      era.add(`juel:${cid}:6`, bonus);
    } else {
      era.print(`${palam_name(6)}点数+${local0}`);
      era.add(`juel:${cid}:6`, local0);
    }
    era.print(`${palam_name(8)}点数+${local0}`);
    era.add(`juel:${cid}:8`, local0);
  }
  if (count_a + count_v + count_s + count_z > 0) {
    era.print(
      `${palam_name(100)}点数+${count_a + count_v + count_s + count_z}`,
    );
    era.add(`juel:${cid}:100`, count_a + count_v + count_s + count_z);
  }
  era.print(
    `${name}的身体，被弄了${cflag(661) + cflag(662) + cflag(663) + cflag(664) + cflag(665)}次，精液流得到处都是……`,
  ); // :2388

  // :2390 战役经验结算（CAMPAIGN_EVENT.ERB:284-300，#469 起真身）：全体
  // 派遣中（CFLAG:1 == 12）的角色按本次示众台平均凌辱次数获得战斗经验
  if (era_flag.hero_campaign_active >= 1) {
    const exp_gain =
      Math.floor(
        (cflag(661) + cflag(662) + cflag(663) + cflag(664) + cflag(665)) / 5,
      ) + 1;
    for (const dispatched of era.getAddedCharacters()) {
      if (chara(dispatched).invasion.状态 === 12) {
        chara(dispatched).dungeon.战斗经验 += exp_gain;
      }
    }
    era.print(`通过榨取攻略中的奴隶的能量获得了${exp_gain}点经验值`);
    // 原作 :298 是 PRINTFORMW（自带等待），调用点 :2392 另有一个 WAIT——
    // 两次等键都要还原，少一次玩家就少一次确认
    await era.waitAnyKey();
  }
  await era.waitAnyKey(); // :2392 WAIT

  // :2394-2416 精神达到极限则解放（第二支判据被第一支吞掉，不可达，照抄）
  if ((era.get(`juel:${cid}:100`) || 0) > 120 + cflag(9) * 40) {
    era.print(`${name}的精神达到极限了……`);
    await era.printAndWait('*从示众台解放*');
    for (const slot of [661, 662, 663, 664, 665]) {
      era.set(`cflag:${cid}:${slot}`, 0);
    }
    chara(cid).invasion.状态 = 0; // :2403 CFLAG:1 = 0
    chara(cid).patch.待处刑标签 = 0; // :2404 CFLAG:777 = 0
  } else if ((era.get(`juel:${cid}:100`) || 0) > 120 + 150 * 40) {
    era.print(`${name}的精神达到极限了……`);
    await era.printAndWait('*从示众台解放*');
    for (const slot of [661, 662, 663, 664, 665]) {
      era.set(`cflag:${cid}:${slot}`, 0);
    }
    chara(cid).invasion.状态 = 0;
    chara(cid).patch.待处刑标签 = 0;
  }

  if (count_v > 0) {
    // :2418-2423 妊娠チェック（被调方是 #401 交付的真身，本票接线）
    chara(cid).dungeon.怪物膣内射精 += count_v; // :2420 CFLAG:107 += COUNT_V
    in_vagina_syoku_to_t(rand);
    conception_check_syoku_to_t(rand);
  }

  void game;
  void master;
  return 0; // :2418-2426（妊娠チェック + RETURN 0）
}

module.exports = { pillory };
