/**
 * @file 恋人系统（issue #341，阶段 5a L10）。
 *
 * 源: target/ERB/其他/LOVERS.ERB  @ENTER_LOVER（:7-72）、
 *     @NAME_LOVER（:73-143）、@DUNGEON_TOWN_LOVER（:144-1616）、
 *     @DUNGEON_TOWN_LOVER_CHARA_ENTER（:1617-1708）。
 *
 * `DUNGEON_TOWN_LOVER` 的 :201-1043 是二十种恋人的文本密集分支；这里把
 * 每个叶子的正文与 LOVE_EXP 增量收成静态表，选择顺序仍与原作一致。结算段
 * 保留 Emuera 整数除法的向零截断。原作 `JUEL += LOCAL * 5` 在 :1526/:1528
 * 读的是精液经验计算前遗留的 LOCAL，而非刚打印的 LOVE_EXP:9；该缺陷 1:1
 * 保留为固定值 50。
 */

'use strict';

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const { chara_callname } = require('#/utils/callname-utils');
const { karma, chara_id_output } = require('#/chara/chara-stats');
const { search_family } = require('#/chara/chara-family');
const { nakadashi_check } = require('#/event/event-pregnancy');
const { select_yes_no } = require('#/page/page-life-list');
const { get_look_info } = require('#/kojo/kojo-dungeon-bitch-log');

const default_rand = (n) => Math.floor(Math.random() * n);
const name_of = (cid) => chara_callname(cid);

const LOVER_NAMES = new Map([
  [1, '温柔的青年'],
  [2, '威严的彪形大汉'],
  [3, '粗野的流氓'],
  [4, '大腹便便的中年人'],
  [21, '丑陋的兽人'],
  [22, '精灵美男子'],
  [23, '暗黑精灵'],
  [24, '奴隶'],
  [41, '妓女'],
  [42, '女学生'],
  [43, '贵妇'],
  [44, '女骑士'],
  [61, '懦弱少年'],
  [62, '戴眼镜的男学生'],
  [63, '活泼的少年'],
  [64, '可爱的男学生'],
  [81, '大型宠物狗'],
  [82, '爱马'],
  [83, '宠物猪'],
  [84, '农家的牛'],
  [200, '恋人'],
]);

/** @NAME_LOVER（:73-143）：返回登记状态；print_flag=1 时打印 14 格名称。 */
function name_lover(lover, print_flag = 0) {
  const name = LOVER_NAMES.get(lover) ?? '';
  if (!name) return 0;
  if (print_flag === 1) era.print(name.padEnd(14, '　'));
  return 1;
}

/** @ENTER_LOVER（:7-72）：选择派去接近勇者的恋人类型。 */
async function enter_lover(cid) {
  if (cid < 0) return 0;
  era.print('派遣魔王的手下外出，设下恋爱陷阱诱惑对象勇者堕落');
  era.print(`选择派遣谁外出诱惑${name_of(cid)}呢？`);
  era.print(
    '--------------------------------------------------------------------------------',
  );
  era.printButton('谁都不派遣', 0);
  for (let lover = 1; lover < 100; lover += 1) {
    const name = LOVER_NAMES.get(lover);
    if (name) era.printButton(name, lover);
  }
  era.printButton('取消', 999);
  era.print(
    '--------------------------------------------------------------------------------',
  );

  let selected;
  for (;;) {
    // Emuera INPUT 是自由数值输入；保留隐藏的 200 与无效值重问语义。
    selected = await era.input({ useRule: false });
    if (selected === 999) return 0;
    if (selected === 0 || LOVER_NAMES.has(selected)) break;
  }

  const previous = era.get(`cflag:${cid}:606`) || 0; // CFLAG:606 = 恋人类型
  era.set(`cflag:${cid}:606`, selected);
  if (selected !== previous) {
    era.set(`cflag:${cid}:607`, 0); // CFLAG:607 = 爱情度/交往日数
  }
  if (selected > 0) {
    era.print(`${name_of(cid)}为目标`);
    name_lover(selected, 1);
    await era.printAndWait('开始接触邂逅了');
  } else {
    await era.printAndWait(`引诱${name_of(cid)}的行动正在进行中`);
  }
  return 1;
}

function add_exp(exp, pairs) {
  for (const [index, value] of pairs) exp[index] += value;
}

function choose_stage(marriage, love_lv, has_marriage_stages = true) {
  if (marriage === 902 && has_marriage_stages) {
    if (love_lv < 10) return 0;
    if (love_lv < 30) return 1;
    return 2;
  }
  if (love_lv <= 0) return 3;
  if (love_lv < 10) return 4;
  if (love_lv < 20) return 5;
  if (love_lv < 30) return 6;
  if (love_lv < 40) return 7;
  return 8;
}

const LOVER_SCENES = new Map([
  [
    1,
    {
      name: '温柔的青年',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙……', []],
        ['新婚的{hero}和{lover}越来越熟悉对方的身体……', [[4, 1]]],
        [
          '{hero}和{lover}过着和睦而又淫荡的新婚生活……',
          [
            [4, 2],
            [3, 1],
          ],
        ],
        ['“偶然之下”{lover}帮了{hero}一把……', []],
        ['{hero}和{lover}再次相遇，说着毫无营养的话……', []],
        ['{hero}和{lover}开始约会了……', []],
        ['{hero}已经可以自由进出{lover}的家，还会为对方准备料理……', []],
        ['{hero}已经住进了{lover}的家……', [[4, 1]]],
        [
          '{hero}一进家门，就被{lover}抱住开始激烈的性交……',
          [
            [4, 2],
            [3, 1],
          ],
        ],
      ],
    },
  ],
  [
    2,
    {
      name: '威严的彪形大汉',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', [[4, 1]]],
        [
          '新婚的{hero}为了和{lover}生孩子而努力准备着……',
          [
            [4, 2],
            [3, 1],
          ],
        ],
        [
          '{hero}和{lover}过着和睦而又淫荡的新婚生活……',
          [
            [4, 2],
            [3, 2],
          ],
        ],
        ['某次{hero}陷入危机之时，被{lover}出手相救……', []],
        ['{hero}和{lover}再次相遇，说着毫无营养的话……', []],
        ['{hero}和{lover}开始约会了……', []],
        ['{hero}去{lover}的家里做客、被推倒了……', [[4, 1]]],
        [
          '{hero}已经住进了{lover}的家……',
          [
            [4, 2],
            [3, 1],
          ],
        ],
        [
          '{hero}一进家门，就被{lover}抱住开始激烈的性交……',
          [
            [4, 2],
            [3, 2],
          ],
        ],
      ],
    },
  ],
  [
    3,
    {
      name: '粗野的流氓',
      marriage: true,
      stages: [
        [
          '新婚，{hero}努力配合着{lover}各种花样的性要求……',
          [
            [4, 1],
            [3, 1],
          ],
        ],
        [
          '新婚的{hero}为了和{lover}生孩子而努力准备着……',
          [
            [4, 2],
            [3, 2],
            [1, 1],
          ],
        ],
        [
          '{hero}和{lover}过着和睦而又淫荡的新婚生活……',
          [
            [4, 3],
            [3, 2],
            [5, 1],
            [1, 2],
          ],
        ],
        ['某一天{hero}在街头被{lover}搭讪了……', []],
        ['{hero}和{lover}再次相遇，说着毫无营养的话……', []],
        [
          '{hero}和{lover}开始约会了……',
          [
            [4, 1],
            [3, 1],
          ],
        ],
        [
          '{hero}去{lover}的家中相会、没多久，两人抽起了事后烟……',
          [
            [4, 2],
            [3, 1],
            [1, 1],
          ],
        ],
        [
          '{hero}已经住进了{lover}的家……',
          [
            [4, 2],
            [3, 2],
            [1, 1],
          ],
        ],
        [
          '{hero}一进家门，就被{lover}抱住开始激烈的性交……',
          [
            [4, 3],
            [5, 1],
            [3, 2],
            [1, 2],
          ],
        ],
      ],
    },
  ],
  [
    4,
    {
      name: '大腹便便的中年人',
      marriage: false,
      stages: [
        null,
        null,
        null,
        ['某天在酒吧里，{lover}请{hero}喝酒并搭讪了……', []],
        ['{hero}和{lover}再次相遇，说着毫无营养的话……', []],
        [
          '{hero}和{lover}开始约会了……',
          [
            [4, 1],
            [3, 1],
          ],
        ],
        [
          '{hero}开始进出{lover}的家、并收到了昂贵的首饰作为礼物……',
          [
            [4, 2],
            [3, 1],
          ],
        ],
        [
          '{hero}已经住进了{lover}的家……',
          [
            [4, 2],
            [3, 2],
          ],
        ],
        [
          '{hero}一进家门，就被{lover}抱住开始激烈的性交……',
          [
            [4, 3],
            [5, 1],
            [3, 2],
          ],
        ],
      ],
    },
  ],
  [
    21,
    {
      name: '丑陋的兽人',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', []],
        ['新婚的{hero}和{lover}越来越熟悉对方的身体……', [[4, 1]]],
        [
          '{hero}和{lover}过着和睦而又淫荡的新婚生活……',
          [
            [4, 2],
            [3, 1],
          ],
        ],
        ['“偶然之下”{lover}帮了{hero}一把……', []],
        ['{hero}和{lover}再次相遇，说着毫无营养的话……', []],
        ['{hero}和{lover}开始约会了……', []],
        ['{hero}已经可以自由进出{lover}的家，还会为对方准备料理……', []],
        ['{hero}已经住进了{lover}的家……', [[4, 1]]],
        [
          '{hero}一进家门，就被{lover}抱住开始激烈的性交……',
          [
            [4, 3],
            [3, 1],
          ],
        ],
      ],
    },
  ],
  [
    22,
    {
      name: '精灵美男子',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', [[4, 1]]],
        [
          '新婚的{hero}为了和{lover}生孩子而努力准备着……',
          [
            [4, 2],
            [3, 1],
          ],
        ],
        [
          '{hero}和{lover}过着和睦而又淫荡的新婚生活……',
          [
            [4, 2],
            [3, 2],
          ],
        ],
        ['“偶然之下”{lover}帮了{hero}一把……', []],
        ['{hero}和{lover}再次相遇，说着毫无营养的话……', []],
        ['{hero}和{lover}开始约会了……', []],
        ['{hero}已经可以自由进出{lover}的家，还会为对方准备料理……', [[4, 1]]],
        [
          '{hero}已经住进了{lover}的家……',
          [
            [4, 2],
            [3, 1],
          ],
        ],
        [
          '{hero}一进家门，就被{lover}抱住开始激烈的性交……',
          [
            [4, 3],
            [3, 1],
          ],
        ],
      ],
    },
  ],
  [
    23,
    {
      name: '暗黑精灵',
      marriage: true,
      stages: [
        [
          '新婚，{hero}努力配合着{lover}各种花样的性要求……',
          [
            [4, 1],
            [3, 1],
          ],
        ],
        [
          '新婚的{hero}为了和{lover}生孩子而努力准备着……',
          [
            [4, 2],
            [3, 2],
            [1, 1],
          ],
        ],
        [
          '{hero}和{lover}过着和睦而又淫荡的新婚生活……',
          [
            [4, 3],
            [3, 2],
            [5, 1],
            [1, 2],
          ],
        ],
        ['某一天{hero}在街头被{lover}搭讪了……', []],
        ['{hero}和{lover}再次相遇，说着毫无营养的话……', []],
        [
          '{hero}和{lover}开始约会了……',
          [
            [4, 1],
            [3, 1],
          ],
        ],
        [
          '{hero}去{lover}的家中相会、没多久，两人抽起了事后烟……',
          [
            [4, 2],
            [3, 1],
            [1, 1],
          ],
        ],
        [
          '{hero}已经住进了{lover}的家……',
          [
            [4, 2],
            [3, 2],
            [1, 1],
          ],
        ],
        [
          '{hero}一进家门，就被{lover}抱住开始激烈的性交……',
          [
            [4, 3],
            [5, 1],
            [3, 2],
            [1, 2],
            [2, 1],
          ],
        ],
      ],
    },
  ],
  [
    24,
    {
      name: '奴隶',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', []],
        ['新婚的{hero}和{lover}越来越熟悉对方的身体……', [[4, 1]]],
        [
          '{hero}和{lover}过着和睦而又淫荡的新婚生活……',
          [
            [4, 2],
            [3, 1],
          ],
        ],
        ['某天，路过的{hero}被{lover}工作的身影吸引了……', []],
        ['{hero}找上了奴隶主，表示想和{lover}说说话……', []],
        ['{hero}从奴隶主手中买下了{lover}，并开始和{lover}约会了……', []],
        ['{hero}已经可以自由进出{lover}的家，还会为对方准备料理……', []],
        ['{hero}已经住进了{lover}的家……', [[4, 1]]],
        [
          '{hero}一进家门，就被{lover}抱住开始激烈的性交……',
          [
            [4, 3],
            [3, 1],
          ],
        ],
      ],
    },
  ],
  [
    41,
    {
      name: '妓女',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', []],
        ['新婚的{hero}和{lover}越来越熟悉对方的身体……', [[6, 1]]],
        ['{hero}和{lover}过着和睦而又淫荡的新婚生活……', [[6, 3]]],
        ['某天，{hero}帮了“身处困难”的{lover}一把…………', []],
        ['{hero}和{lover}再次相遇，说着毫无营养的话……', []],
        ['{hero}和{lover}约好、一起吃饭……', []],
        ['{hero}已经可以自由进出{lover}的家，还会为对方准备料理……', [[6, 1]]],
        ['{hero}已经住进了{lover}的家……', [[6, 2]]],
        ['{hero}一进家门，就被{lover}抱住开始亲热……', [[6, 3]]],
      ],
    },
  ],
  [
    42,
    {
      name: '女学生',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', []],
        ['新婚的{hero}和{lover}越来越熟悉对方的身体……', [[6, 1]]],
        ['{hero}和{lover}过着和睦而又淫荡的新婚生活……', [[6, 2]]],
        ['某天，{hero}帮了“身处困难”的{lover}一把…………', []],
        ['{hero}和{lover}再次相遇，说着毫无营养的话……', []],
        ['{hero}和{lover}约好、一起吃饭……', []],
        ['{hero}已经可以自由进出{lover}的家，还会为对方准备料理……', []],
        ['{hero}已经住进了{lover}的家……', [[6, 1]]],
        ['{hero}一进家门，就被{lover}抱住开始亲热……', [[6, 2]]],
      ],
    },
  ],
  [
    43,
    {
      name: '贵妇',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', []],
        ['新婚的{hero}和{lover}越来越熟悉对方的身体……', [[6, 1]]],
        ['{hero}和{lover}过着和睦而又淫荡的新婚生活……', [[6, 3]]],
        ['某一天，{hero}被{lover}打招呼了……', []],
        ['{hero}和{lover}再次见面、说起了工作的事……', []],
        ['{hero}和{lover}约好、一起吃饭……', []],
        ['{hero}和{lover}去开房了……', [[6, 1]]],
        ['{hero}已经住进了{lover}的家……', [[6, 2]]],
        ['{hero}一进家门，就被{lover}抱住开始激烈的性交……', [[6, 3]]],
      ],
    },
  ],
  [
    44,
    {
      name: '女骑士',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', []],
        ['新婚的{hero}和{lover}越来越熟悉对方的身体……', [[6, 1]]],
        ['{hero}和{lover}过着和睦而又淫荡的新婚生活……', [[6, 3]]],
        ['某一天，{hero}被{lover}打招呼了……', []],
        ['{hero}和{lover}再次见面、说起了工作的事……', []],
        ['{hero}和{lover}约好、一起吃饭……', []],
        ['{hero}已经可以自由进出{lover}的家，还会为对方准备料理……', []],
        ['{hero}已经住进了{lover}的家……', [[6, 1]]],
        ['{hero}一进家门，就被{lover}抱住开始亲热……', [[6, 3]]],
      ],
    },
  ],
  [
    61,
    {
      name: '懦弱少年',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', [[3, 1]]],
        [
          '新婚的{hero}和{lover}越来越熟悉对方的身体……',
          [
            [4, 1],
            [3, 1],
          ],
        ],
        [
          '{hero}和{lover}过着和睦而又淫荡的新婚生活……',
          [
            [4, 2],
            [3, 2],
          ],
        ],
        ['某天，{hero}帮了“身处困难”的{lover}一把…………', []],
        ['{hero}和{lover}再次相遇，说着毫无营养的话……', []],
        ['{hero}和{lover}一起出去玩、直到黄昏才回来……', []],
        ['{hero}已经可以自由进出{lover}的家，还会为对方准备料理……', [[3, 1]]],
        [
          '{hero}已经住进了{lover}的家……',
          [
            [4, 1],
            [3, 1],
          ],
        ],
        [
          '{hero}一进家门，就被{lover}抱住开始激烈的性交……',
          [
            [4, 2],
            [3, 2],
          ],
        ],
      ],
    },
  ],
  [
    62,
    {
      name: '戴眼镜的男学生',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', [[3, 1]]],
        [
          '新婚的{hero}和{lover}越来越熟悉对方的身体……',
          [
            [4, 1],
            [3, 1],
          ],
        ],
        [
          '{hero}和{lover}过着和睦而又淫荡的新婚生活……',
          [
            [4, 2],
            [3, 2],
          ],
        ],
        ['{hero}接受了家庭教师的委托，开始辅导{lover}的功课……', []],
        ['{lover}对{hero}的辅导不是很上心、总是说一些其他的事……', []],
        ['{lover}对{hero}的辅导不是很上心、总爱说些私人话题……', []],
        [
          '{lover}根本不在意{hero}教了什么、总是说一些让人心跳加速的情话……',
          [[3, 1]],
        ],
        [
          '{hero}和{lover}开始约会了……',
          [
            [4, 1],
            [3, 1],
          ],
        ],
        [
          '{hero}总是在辅导中被打断，然后和{lover}开始做其他的事情……',
          [
            [4, 2],
            [3, 2],
          ],
        ],
      ],
    },
  ],
  [
    63,
    {
      name: '活泼的少年',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', [[3, 1]]],
        [
          '新婚的{hero}和{lover}越来越熟悉对方的身体……',
          [
            [4, 1],
            [3, 1],
          ],
        ],
        [
          '{hero}和{lover}过着和睦而又淫荡的新婚生活……',
          [
            [4, 2],
            [3, 2],
          ],
        ],
        ['某天，{hero}帮了“身处困难”的{lover}一把…………', []],
        ['{hero}和{lover}再次相遇，说着毫无营养的话……', []],
        ['{hero}和{lover}一起出去玩、直到黄昏才回来……', []],
        ['{hero}已经可以自由进出{lover}的家，还会为对方准备料理……', []],
        ['{hero}已经住进了{lover}的家……', [[3, 1]]],
        [
          '{hero}一进家门，就被{lover}抱住开始激烈的性交……',
          [
            [4, 2],
            [3, 1],
          ],
        ],
      ],
    },
  ],
  [
    64,
    {
      name: '可爱的男子学生',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', [[3, 1]]],
        [
          '新婚的{hero}和{lover}越来越熟悉对方的身体……',
          [
            [4, 1],
            [3, 1],
          ],
        ],
        [
          '{hero}和{lover}过着和睦而又淫荡的新婚生活……',
          [
            [4, 2],
            [3, 2],
          ],
        ],
        ['{hero}接受了家庭教师的委托，开始辅导{lover}的功课……', []],
        ['{lover}对{hero}的辅导不是很上心、总是说一些其他的事……', []],
        ['{lover}对{hero}的辅导不是很上心、总爱说些私人话题……', []],
        [
          '{lover}根本不在意{hero}教了什么、只顾着说那些让人心跳加速的情话……',
          [[3, 1]],
        ],
        [
          '{hero}和{lover}开始约会了……',
          [
            [4, 1],
            [3, 1],
          ],
        ],
        [
          '{hero}总是在辅导中被打断，然后和{lover}开始做其他的事情……',
          [
            [4, 1],
            [3, 3],
          ],
        ],
      ],
    },
  ],
  [
    81,
    {
      name: '大型宠物狗',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，还是有些笨拙…………', []],
        [
          '新婚的{hero}和{lover}终于开始交尾……',
          [
            [3, 1],
            [7, 1],
          ],
        ],
        [
          '{hero}像母狗一样被{lover}骑在身下没日没夜的猛艹……',
          [
            [3, 2],
            [4, 2],
            [7, 2],
          ],
        ],
        ['有一天、{hero}从宠物商店把光鲜亮丽的{lover}买回家了……', []],
        ['{hero}总喜欢带着{lover}举止过分亲昵的到处游玩、引来无数非议……', []],
        ['{hero}终于明白了自己对{lover}的心意……', []],
        ['{hero}开始故意挑逗{lover}……', []],
        [
          '{hero}成功的让{lover}性奋起来了……',
          [
            [3, 1],
            [7, 1],
          ],
        ],
        [
          '{hero}开始被{lover}艹上瘾了……',
          [
            [3, 2],
            [4, 2],
            [7, 2],
          ],
        ],
      ],
    },
  ],
  [
    82,
    {
      name: '马',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', []],
        [
          '新婚的{hero}和{lover}终于开始交尾……',
          [
            [3, 1],
            [7, 1],
          ],
        ],
        [
          '{hero}像母马一样被{lover}骑在身下没日没夜的猛艹…………',
          [
            [3, 2],
            [4, 2],
            [7, 2],
          ],
        ],
        ['某一天，{hero}将坐骑{lover}买回来了……', []],
        ['{hero}带着{lover}举止过分亲昵的到处游玩、引来无数非议……', []],
        ['{hero}终于明白了自己对{lover}的心意……', []],
        ['{hero}开始故意挑逗{lover}……', []],
        [
          '{hero}成功的让{lover}性奋起来了……',
          [
            [3, 1],
            [7, 1],
          ],
        ],
        [
          '{hero}开始被{lover}艹上瘾了……',
          [
            [3, 2],
            [4, 2],
            [7, 2],
          ],
        ],
      ],
    },
  ],
  [
    83,
    {
      name: '宠物猪',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', []],
        [
          '新婚的{hero}和{lover}终于开始交尾……',
          [
            [3, 1],
            [7, 1],
          ],
        ],
        [
          '{hero}像母猪一样被{lover}骑在身下没日没夜的猛艹…………',
          [
            [3, 2],
            [4, 2],
            [7, 2],
          ],
        ],
        ['有一天、{hero}在宠物商店看上了{lover}，并买回家了…………', []],
        ['{hero}带着{lover}举止过分亲昵的到处游玩、引来无数非议……', []],
        ['{hero}终于明白了自己对{lover}的心意……', []],
        ['{hero}开始故意挑逗{lover}……', []],
        [
          '{hero}成功的让{lover}性奋起来了……',
          [
            [3, 1],
            [7, 1],
          ],
        ],
        [
          '{hero}开始被{lover}艹上瘾了……',
          [
            [3, 2],
            [4, 2],
            [7, 3],
          ],
        ],
      ],
    },
  ],
  [
    84,
    {
      name: '农家的牛',
      marriage: true,
      stages: [
        ['新婚的{hero}和{lover}相处时，依旧有些笨拙…………', []],
        [
          '新婚的{hero}和{lover}终于开始交尾……',
          [
            [3, 1],
            [7, 1],
          ],
        ],
        [
          '{hero}像母牛一样被{lover}骑在身下没日没夜的猛艹…………',
          [
            [3, 2],
            [4, 2],
            [7, 2],
          ],
        ],
        ['某一天，{hero}发现身边似乎具有不可思议魅力的{lover}了……', []],
        ['{hero}为了接近照顾{lover}，特意去农家帮忙……', []],
        ['{hero}终于明白了自己对{lover}的心意……', []],
        ['{hero}开始故意挑逗{lover}……', []],
        [
          '{hero}成功的让{lover}性奋起来了……',
          [
            [3, 1],
            [7, 1],
          ],
        ],
        [
          '{hero}开始被{lover}艹上瘾了……',
          [
            [3, 2],
            [4, 2],
            [7, 3],
          ],
        ],
      ],
    },
  ],
]);

function play_named_lover_scene(cid, lover, marriage, love_lv, love_exp) {
  const profile = LOVER_SCENES.get(lover);
  // SELECTCASE 无 CASEELSE：坏存档中的未知正数仍继续结算，LOCALS 保持 ERROR。
  if (!profile) return 'ERROR';
  const stage = choose_stage(marriage, love_lv, profile.marriage);
  const [template, gains] = profile.stages[stage];
  add_exp(love_exp, gains);
  const output = template
    .replaceAll('{hero}', name_of(cid))
    .replaceAll('{lover}', profile.name);
  era.print(output);
  return profile.name;
}

function paired_text(hero, lover, both, self_only, other_only, neither) {
  if (hero && lover) return both;
  if (hero) return self_only;
  if (lover) return other_only;
  return neither;
}

/** :1044-1291 CASE 200，返回 null 表示继续结算，0 表示原作提前 RETURN。 */
function play_character_lover_scene(cid, love_exp) {
  const lover_id = search_family(cid, 'LOVE');
  if (lover_id < 0) return 0;
  const hero_name = name_of(cid);
  const lover_name = name_of(lover_id);
  const hero_place = era.get(`cflag:${cid}:1`) || 0; // CFLAG:1 = 状态
  const lover_place = era.get(`cflag:${lover_id}:1`) || 0;
  const hero_fallen = (era.get(`cflag:${cid}:0`) || 0) > 0; // CFLAG:0 = 陷落
  const lover_fallen = (era.get(`cflag:${lover_id}:0`) || 0) > 0;
  let output;

  if (hero_place === 2 && lover_place === 2) {
    const party = era.get(`cflag:${cid}:533`) || 0; // CFLAG:533 = 队伍编号
    if (party <= 0 || party !== (era.get(`cflag:${lover_id}:533`) || 0))
      return 0;
    output = `${hero_name}吻了${lover_name}……`;
    love_exp[0] += 1;
  } else if (hero_place === 0 && lover_place === 0) {
    output = paired_text(
      hero_fallen,
      lover_fallen,
      `${hero_name}和${lover_name}不顾场合地开始做爱……`,
      `${hero_name}向${lover_name}洗脑了魔族的美好……`,
      `${hero_name}从${lover_name}了解到了魔族的美好……`,
      `${hero_name}和${lover_name}互相鼓励着不屈不挠的内心……`,
    );
  } else if (hero_place === 7 && lover_place === 7) {
    output = paired_text(
      hero_fallen,
      lover_fallen,
      `${hero_name}和${lover_name}互相赞美着怀有身孕的肚子……`,
      `${hero_name}向${lover_name}讲述着孕育魔族的美妙之处……`,
      `${hero_name}见到了孕育着魔族的${lover_name}后，内心崩溃了……`,
      `${hero_name}与${lover_name}下了绝不因成为魔族的生育工具而屈服的决心……`,
    );
  } else if (hero_place === 8 && lover_place === 8) {
    output = paired_text(
      hero_fallen,
      lover_fallen,
      `${hero_name}与${lover_name}比拼着谁更能让观众感到满足……`,
      `${hero_name}向${lover_name}炫耀着让观众满足的自己……`,
      `${hero_name}见到了一脸痴像的${lover_name}后，内心崩溃了……`,
      `${hero_name}与${lover_name}下了绝不因向众人献媚而屈服的决心……`,
    );
  } else if (hero_place === 0 && lover_place === 2) {
    output =
      hero_fallen && !lover_fallen
        ? `${hero_name}期待着${lover_name}成为魔族的那一天……`
        : `${hero_name}相信着${lover_name}一定会来救援……`;
    era.print(output);
    return 0;
  } else if (hero_place === 2 && lover_place === 0) {
    output =
      !hero_fallen && lover_fallen
        ? `${hero_name}听说了${lover_name}堕为魔族的事，备受罪恶感的折磨……`
        : `${hero_name}发誓一定要救${lover_name}出来……`;
    era.print(output);
    return 0;
  } else if (hero_place === 3 && lover_place === 2) {
    era.print(`${hero_name}期待着亲手将${lover_name}转化为魔族的那一天……`);
    return 0;
  } else if (hero_place === 2 && lover_place === 3) {
    era.print(
      `${hero_name}听说了${lover_name}在魔王军中活跃的传闻，内心十分混乱……`,
    );
    return 0;
  } else if (hero_place === 7 && lover_place === 2) {
    era.print(
      hero_fallen && !lover_fallen
        ? `${hero_name}不断地幻想着${lover_name}在自己身旁一同孕育魔族的场面……`
        : `${hero_name}不断地幻想着${lover_name}前来拯救自己的场面……`,
    );
    return 0;
  } else if (hero_place === 2 && lover_place === 7) {
    era.print(
      !hero_fallen && lover_fallen
        ? `${hero_name}听说了${lover_name}乐于孕育魔族的传言，异样地兴奋并自慰了……`
        : `${hero_name}听说了${lover_name}孕育魔族的传言，哭着自慰了……`,
    );
    return 0;
  } else if (hero_place === 8 && lover_place === 2) {
    era.print(
      hero_fallen && !lover_fallen
        ? `${hero_name}向着寄给${lover_name}的水晶球高兴地展现着被侵犯的场面……`
        : `${hero_name}向着寄给${lover_name}的水晶球哭着求救……`,
    );
    return 0;
  } else if (hero_place === 2 && lover_place === 8) {
    era.print(
      !hero_fallen && lover_fallen
        ? `${hero_name}看着收到的水晶球中显现的${lover_name}淫荡的话语，异样地兴奋得难以自已并自慰了……`
        : `${hero_name}看着收到的水晶球中显现的${lover_name}惨烈身姿，因罪恶感而落泪并自慰了……`,
    );
    return 0;
  } else if (hero_place === 7 && lover_place === 0) {
    output = paired_text(
      hero_fallen,
      lover_fallen,
      `${hero_name}怀有身孕的腹部，${lover_name}十分怜爱地抚摸着……`,
      `${hero_name}向${lover_name}讲述着孕育魔族的快感……`,
      `${hero_name}感受到${lover_name}向自己怀有身孕的腹部投来了怜爱的目光，${hero_name}感到十分绝望……`,
      `${hero_name}因孕育着魔族的事向${lover_name}谢罪……`,
    );
  } else if (hero_place === 0 && lover_place === 7) {
    output = paired_text(
      hero_fallen,
      lover_fallen,
      `${hero_name}十分怜爱地抚摸着${lover_name}怀有身孕的腹部……`,
      `${hero_name}向${lover_name}讲述着孕育魔族的美妙之处……`,
      `${hero_name}对沉溺于孕育魔族快感的${lover_name}感到绝望……`,
      `${hero_name}让孕育着魔族的${lover_name}鼓起勇气坚持下去……`,
    );
  } else if (hero_place === 8 && lover_place === 0) {
    output = paired_text(
      hero_fallen,
      lover_fallen,
      `${hero_name}为了让${lover_name}展现痴态似地把腰越抬越高……`,
      `${hero_name}向绝望了的${lover_name}展现着自己的痴态……`,
      `${hero_name}感受到了${lover_name}向被凌辱的自己投来恋爱的目光，感到十分绝望……`,
      `${hero_name}因被凌辱的事向${lover_name}谢罪……`,
    );
  } else if (hero_place === 0 && lover_place === 8) {
    output = paired_text(
      hero_fallen,
      lover_fallen,
      `${hero_name}和裸露于人前的${lover_name}接吻着自慰了……`,
      `${hero_name}向绝望了的${lover_name}诉说着魔族的美好……`,
      `${hero_name}对欢乐地抬起屁股的${lover_name}感到了异样的兴奋，开始自慰了起来……`,
      `${hero_name}向裸露于人前的${lover_name}哭着谢罪，感同身受地自慰了起来……`,
    );
  } else {
    return 0;
  }
  era.print(output);
  return null;
}

function apply_love_bonuses(cid, love_lv, love_exp) {
  const talent = (index) => era.get(`talent:${cid}:${index}`) || 0;
  const abl = (index) => era.get(`abl:${cid}:${index}`) || 0;

  // :1293-1302 贞操带/处女封印：V 行为全部转作 A 行为。
  if (
    ((era.get(`cflag:${cid}:42`) || 0) === 79 &&
      ((era.get(`cflag:${cid}:40`) || 0) & 64) !== 0 &&
      (era.get('flag:37') || 0) !== 0) ||
    talent(273)
  ) {
    love_exp[5] += love_exp[4];
    love_exp[4] = 0;
  }

  if (love_lv >= 10) love_exp[0] += 1;
  if (love_lv >= 20) love_exp[0] += 1;
  if (love_lv >= 30) love_exp[0] += 2;
  if (love_lv >= 40) love_exp[0] += 3;
  if (love_lv >= 60) love_exp[0] += 5;

  if (love_exp[3] > 0) {
    love_exp[3] += abl(12) + abl(13) + abl(16) + abl(32);
    if (talent(52)) love_exp[3] += 1;
    if (talent(61)) love_exp[3] += 1;
    if (talent(62)) love_exp[3] -= 1;
    if (talent(62) && abl(32) > 0) love_exp[3] += abl(32) * 3;
  }
  if (love_exp[4] > 0) {
    love_exp[4] += abl(2);
    if (talent(103)) love_exp[4] -= 1;
    if (talent(104)) love_exp[4] += 1;
    if (talent(75)) love_exp[4] += 1;
    if (talent(232)) love_exp[4] += 1;
  }
  if (love_exp[5] > 0) {
    love_exp[5] += abl(3);
    if (talent(105)) love_exp[5] -= 1;
    if (talent(106)) love_exp[5] += 1;
    if (talent(77)) love_exp[5] += 1;
    if (talent(233)) love_exp[5] += 1;
  }
  if (love_exp[6] > 0 && talent(122) === 0) {
    love_exp[6] += abl(22) + abl(33);
    if (talent(81)) love_exp[6] += 1;
    if (talent(82)) love_exp[6] += 1;
  }
  if (love_exp[7] > 0) {
    if (talent('种族') === 2) love_exp[7] += 1;
    if (talent(317) === 12) love_exp[7] += 1;
    love_exp[7] += abl(39);
    if (talent(136)) love_exp[7] += 3;
    if (love_exp[4] > 0) love_exp[4] += love_exp[7];
    if (love_exp[3] > 0) love_exp[3] += love_exp[7];
  }

  // :1416-1438 拍摄倾向即使本次没有基础拍摄次数也会增减。
  if (talent(10)) love_exp[8] -= 1;
  if (talent(20)) love_exp[8] -= 1;
  if (talent(23)) love_exp[8] += 1;
  if (talent(27)) love_exp[8] -= 1;
  if (talent(28)) love_exp[8] += 2;
  if (talent(89)) love_exp[8] += 3;
  love_exp[8] += abl(17);

  love_exp[9] += love_exp[5] + love_exp[4] + love_exp[6];
  if (love_exp[9] > 0) {
    love_exp[9] += abl(0) + abl(1);
    if (talent(101)) love_exp[9] -= 1;
    if (talent(102)) love_exp[9] += 1;
    if (talent(107)) love_exp[9] -= 1;
    if (talent(108)) love_exp[9] += 1;
    if (talent(74)) love_exp[9] += 1;
    if (talent(78)) love_exp[9] += 1;
    if (talent(230)) love_exp[9] += 1;
    if (talent(231)) love_exp[9] += 1;
  }
}

async function settle_love_exp(
  cid,
  lover,
  lover_name,
  marriage,
  love_exp,
  rand,
) {
  const view = chara(cid);
  const first_kiss = era.get(`cflag:${cid}:16`) ?? 0; // -1 有语义，不走门面 getter
  if (love_exp[0] > 0 && first_kiss === 0) {
    era.print('?初吻?');
    view.train.初吻对象 = 1; // CFLAG:16（跨域写，属主 train）
    view.train.初吻对象名 = lover_name; // CSTR:4（跨域写）
  } else if (love_exp[3] > 0 && first_kiss === 0) {
    era.print('?初吻?');
    view.train.初吻对象 = 101;
    view.train.初吻对象名 = lover_name;
  }
  if (view.chara.处女 === 1 && love_exp[4] > 0) {
    era.print('?处女丧失?');
    view.chara.处女 = 0; // TALENT:0（跨域写，属主 chara）
    view.train.初体验对象 = 100; // CFLAG:15（跨域写，属主 train）
    view.train.初体验对象名 = lover_name; // CSTR:3（跨域写）
  }
  if (love_exp[8] > 0) {
    era.print(`${name_of(cid)}特意将水晶球保留了下来、向认识的人炫耀……`);
  }

  const summary = [];
  if (love_exp[0] > 0) summary.push(`接吻：${love_exp[0]}次 `);
  if (love_exp[1] > 0) summary.push(`吸烟：${love_exp[1]}根 `);
  if (love_exp[2] > 0) {
    summary.push(`药物经验＋${love_exp[2]} `);
    era.add(`exp:${cid}:57`, love_exp[2]); // EXP:57 = 药物经验
  }
  if (love_exp[3] > 0) {
    summary.push(`口交经验＋${love_exp[3]} `);
    era.add(`exp:${cid}:22`, love_exp[3]); // EXP:22 = 口交经验
  }
  if (love_exp[9] > 0) {
    summary.push(`${era.get('palamname:0') || ''}点数＋${love_exp[9] * 5} `);
    era.add(`juel:${cid}:0`, 250); // :1526 LOCAL 是首个 FOR 结束值 50（原作缺陷）
    summary.push(`${era.get('palamname:14') || ''}点数＋${love_exp[9] * 5} `);
    era.add(`juel:${cid}:14`, 250); // :1528 同上，不是 LOVE_EXP:9 * 5
  }
  if (love_exp[4] > 0) {
    summary.push(`私处经验＋${love_exp[4]} `);
    era.add(`exp:${cid}:0`, love_exp[4]); // EXP:0 = 私处经验
    summary.push(`${era.get('palamname:1') || ''}点数＋${love_exp[4] * 5} `);
    era.add(`juel:${cid}:1`, love_exp[4] * 5);
  }
  if (love_exp[5] > 0) {
    summary.push(`肛门经验＋${love_exp[5]} `);
    era.add(`exp:${cid}:1`, love_exp[5]); // EXP:1 = 肛门经验
    summary.push(`${era.get('palamname:2') || ''}点数＋${love_exp[5] * 5} `);
    era.add(`juel:${cid}:2`, love_exp[5] * 5);
  }
  const intercourse = love_exp[5] + love_exp[4];
  if (intercourse > 0) {
    summary.push(`性交经验＋${intercourse} `);
    era.add(`exp:${cid}:5`, intercourse); // EXP:5 = 性交经验
  }
  const semen = Math.trunc((love_exp[5] + love_exp[4] + love_exp[3]) / 2);
  if (semen > 0) {
    summary.push(`精液经验＋${semen} `);
    era.add(`exp:${cid}:20`, semen); // EXP:20 = 精液经验
  }
  if (love_exp[7] > 0) {
    summary.push(`兽奸经验＋${love_exp[7]} `);
    era.add(`exp:${cid}:56`, love_exp[7]); // EXP:56 = 兽奸经验
  }
  if (love_exp[8] > 0) {
    summary.push(`拍摄经验＋${love_exp[8]} `);
    view.train.拍摄经验 += love_exp[8]; // EXP:70（跨域写，属主 train）
  }
  if (summary.length > 0) era.print(summary.join(''));

  if (Math.trunc(love_exp[4] / 2) > 0) {
    let race = 0;
    if ((lover >= 1 && lover <= 20) || (lover >= 41 && lover <= 80)) {
      race = 4;
      view.dungeon.客膣内射精 = love_exp[4]; // CFLAG:105
    } else if (lover === 81) {
      race = 5;
      view.dungeon.犬膣内射精 = love_exp[4]; // CFLAG:106
    } else if ((lover >= 21 && lover <= 40) || (lover >= 82 && lover <= 100)) {
      race = 6;
      view.dungeon.怪物膣内射精 = love_exp[4]; // CFLAG:107
    }
    await nakadashi_check(cid, race, rand);
  }

  if (marriage !== 902) {
    await era.printAndWait('(善恶值减少:-1)');
    karma(cid, -1);
  } else {
    await era.waitAnyKey();
  }
}

/** @DUNGEON_TOWN_LOVER（:144-1616）：城镇恋人事件与经验结算。 */
async function dungeon_town_lover(cid, rand = default_rand) {
  if (cid <= 0) return 0;
  let lover = chara(cid).dungeon.恋人;
  if (lover <= 0) {
    const entered = await dungeon_town_lover_chara_enter(cid, rand);
    if (entered === 0) return 0;
    lover = chara(cid).dungeon.恋人;
  }
  const love_lv = chara(cid).dungeon.恋人爱情;
  const marriage = chara(cid).chara.结婚对象;
  const love_exp = Array(50).fill(0);
  let lover_name;
  if (lover === 200) {
    const result = play_character_lover_scene(cid, love_exp);
    if (result === 0) return 0;
    const lover_id = search_family(cid, 'LOVE');
    lover_name = name_of(lover_id);
  } else {
    lover_name = play_named_lover_scene(
      cid,
      lover,
      marriage,
      love_lv,
      love_exp,
    );
    if (lover_name === null) return 0;
  }
  apply_love_bonuses(cid, love_lv, love_exp);
  await settle_love_exp(cid, lover, lover_name, marriage, love_exp, rand);
  chara(cid).dungeon.恋人爱情 += 1; // CFLAG:607
  return 1;
}

/** @DUNGEON_TOWN_LOVER_CHARA_ENTER（:1617-1708）：随机撮合两名在场角色。 */
async function dungeon_town_lover_chara_enter(cid, rand = default_rand) {
  if (((era.get('flag:8') || 0) & 4) === 0) return 0; // FLAG:8 bit2 = 角色间恋爱
  const source = chara(cid);
  if (source.dungeon.恋人 > 0 || source.chara.结婚对象 > 0) return 0;

  const added = era.getAddedCharacters();
  if (added.length === 0) return 0;
  const candidate = added[rand(added.length)]; // 原作 RAND:CHARANUM；允许抽到自己
  const target = chara(candidate);
  if (target.invasion.状态 !== source.invasion.状态) return 0;
  if (target.dungeon.恋人 > 0 || target.chara.结婚对象 > 0) return 0;

  const source_male = (era.get(`talent:${cid}:122`) || 0) === 1;
  const target_male = (era.get(`talent:${candidate}:122`) || 0) === 1;
  if (
    source_male &&
    target_male &&
    (era.get(`abl:${cid}:23`) || 0) === 0 &&
    (era.get(`abl:${candidate}:23`) || 0) === 0
  ) {
    return 0;
  }
  if (
    !source_male &&
    !target_male &&
    (era.get(`abl:${cid}:22`) || 0) === 0 &&
    (era.get(`abl:${candidate}:22`) || 0) === 0
  ) {
    return 0;
  }
  if (
    source.invasion.状态 === 2 &&
    (era.get(`cflag:${cid}:533`) || 0) !==
      (era.get(`cflag:${candidate}:533`) || 0) // CFLAG:533 = 队伍编号
  ) {
    return 0;
  }
  if (candidate === 0) {
    if ((era.get(`talent:${cid}:85`) || 0) === 0) return 0; // TALENT:85 = 爱
    era.print(`${name_of(cid)}向你表白了……`);
    era.print('要接受吗？');
    if ((await select_yes_no()) === 1) return 0;
  }

  target.dungeon.恋人ID = chara_id_output(cid); // CFLAG:LOCAL:610
  source.dungeon.恋人ID = chara_id_output(candidate); // CFLAG:ARG:610
  target.dungeon.恋人名字 = era.get(`cflag:${cid}:6`) || 0; // CFLAG:608
  source.dungeon.恋人名字 = era.get(`cflag:${candidate}:6`) || 0;
  target.dungeon.恋人 = 200;
  source.dungeon.恋人 = 200;

  if (cid !== 0 && candidate !== cid) {
    await era.printAndWait(
      `${name_of(cid)}被${name_of(candidate)}吸引了，两人开始交往了……`,
    );
  }
  if (candidate === cid) {
    await era.printAndWait(
      `${name_of(cid)}被自己的${get_look_info(cid, '魅力点')}吸引了……`,
    );
  }
  return 1;
}

module.exports = {
  LOVER_NAMES,
  enter_lover,
  name_lover,
  dungeon_town_lover,
  dungeon_town_lover_chara_enter,
};
