---
title: '#10 常量数据文件'
---

常量数据是ere游戏中另一类和静态数据不同的、在游戏运行过程中不会改变的数据。在ere游戏中，游戏的基本信息、游戏有哪些保存在存档中的变量、角色有哪些预设数据，这些静态数据由csv（json、yml）等文件夹中的静态数据文件定义，并且会影响存档中的数据结构；其他在游戏运行时所需、和游戏机制相关的数据，例如EraUma中一次训练能够提升多少属性、带战斗要素的游戏中每种攻击能够造成多少伤害，称之为常量数据，只能定义在游戏脚本中。常量数据当然可以在相关系统的代码中随用随赋值，但是将某个系统的所有相关常量归集到一起，以供后续修改和平衡使用是一种良好的编程习惯，有助于提升游戏的**可维护性**（可读性是会下降的，不过可以通过 [IDE](./02-ide) 弥补）。

因为 [模块系统](./04-js-basic#模块module与加载require) 的存在，ere游戏中的常量数据可以定义在模块（module）中，然后通过模块系统引入，使用方式相对自由。因此，本章比起「使用说明」，更接近于「实践参考」，读者可以酌情阅读或者跳过本章前往下一章。

ere游戏中的模块引入函数（require）直接支持两种格式的文件：JS 和 JSON。其中 JS 文件引入时可以不带后缀名，JSON 文件必须带后缀名：

```javascript
// 对 JS 文件，以下两种写法都可以
require('#/a');
require('#/a.js');

// 对 JSON 文件，必须指定后缀名
require('#/a.json');
```

> 笔者使用了 eslint 作为管理代码风格和自动化排版的工具，以下介绍内容均以笔者的开发环境为准。<br>
> 此外，虽然笔者是匈牙利法的忠实信徒，但是在合作者的熏陶下在ere的游戏项目中开始使用下划线法了。[^1]

[^1]: [需要一点基础的ere游戏开发 - #4 必备的JavaScript知识 - 变量的命名](./04-js-basic#变量的命名)

# JS 文件

JS 文件可以导出数值、对象、数组、函数，在作为常量数据文件时一般导出对象或数组。对象的属性名带有空格、或以数字开头时，需要以字符串形式指定；如果有 Unicode 字符，则建议改用 JSON 格式定义。

JS 格式的常量数据文件建议命名为`*-const.js`，以下是 EraUma 中高潮相关的常量数据文件：

```javascript
// orgasm-const.js
const palam2juel = 10;

module.exports = {
  /** 母马一生能生多少 */
  baby_limit: 8,
  // 无任何加减成时的快感上限
  base_limit: 1000,
  /** 一次高潮奖励的基本宝珠数（*palam2juel） */
  base_orgasm_juel_reward: 50 * palam2juel,
  /** 从36周开始的生产概率 */
  birth_percent: [0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 1],
  /** 多重高潮的额外体力精力消耗系数，从二重高潮开始计算 */
  damage_buff: 0.1,
  /** 寸止带来的额外体力精力消耗 */
  damage_from_stop: 0.1,
  /** 阴茎的勃起阈值 */
  erect_border: 0.4,
  /** 高潮时的宝珠奖励系数，从二重高潮开始计算，部位高潮为指数，整体高潮为加法 */
  juel_reward: 0.2,
  lust_border: {
    itch: 5000,
    absent_mind: 7500,
    want_sex: 9000,
    limit: 10001,
    max: 10000,
  },
  lust_from_palam: 1000,
  /** 增加性欲的阈值 */
  lust_palam_border: 0.8,
  /** 最大失神时间，单位是调教回合 */
  max_absent_mind_time: 5,
  orgasm_cost: {
    body: {
      /** 肉体高潮时的体力伤害 */
      stamina: 160,
      /** 肉体高潮时的精力伤害 */
      time: 40,
    },
    spirit: {
      /** 精神高潮时的体力伤害 */
      stamina: 20,
      /** 精神高潮时的精力伤害 */
      time: 240,
    },
  },
  /** 多少累积快感能换一个宝珠 */
  palam2juel,
  /** 部位产生润滑液的快感阈值 */
  palam_border: {
    anal: 0.6,
    breast: 0.3,
    virgin: 0.5,
  },
  /** 从次要部位高潮获得的快感 */
  palam_from_orgasm: 300,
  /** 中毒系快感增加 */
  palam_from_semen_on_part: 0.15,
  /** 高潮时液体分泌量，单位ml，第一个值是基础值，第二个值是动态变化量 */
  secretion_amount: {
    /** 肠液量：5~15ml */
    anal: [5, 15],
    /** 泌乳量：15~25ml */
    breast: [15, 25],
    /** 射精量：2-6ml */
    penis: [2, 6],
    // 阴茎多重高潮时的射精量加成
    penis_times: [1, 1.4, 1.6, 1.7, 1.8, 1.9],
    /** 爱液量：10~30ml */
    virgin: [10, 30],
  },
  // 爱液分泌量的部位尺寸系数
  secretion_coefficient: { breast: [0, 1, 1.5, 1.2] },
  // 失神结束后恢复多少精力
  time_resume_ratio: 0.15,
  /** 根性降低体力精力消耗的最大比率 */
  wp_coefficient: 0.4,
};
```

可以看到笔者添加了很多备注，这些备注信息在用到这些常量的地方鼠标指向时会作为提示信息弹出，有效增加开发效率。

## JS 格式的特殊用法：枚举（enum）

JS 格式的常量数据文件可以用于定义枚举（enum）。枚举是一个被命名的整型常数（Number 类型）的集合。在数学和计算机科学理论中，一个集合的枚举是列出某些有穷序列集的所有成员的程序，或者是一种特定类型对象的计数。这两种类型经常（但不总是）重叠。[^2]

[^2]: [枚举 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/枚举)

使用枚举可以增加运行效率、减少空间占用，尤其是在用枚举指代 String 时：比起 Number 类型的数值，String 类型会占用更多空间，且 String 类型的比较总是比 Number 类型慢。可以参考以下使用枚举表示一周七天的代码：

```javascript
// 直接使用字符串，one_day 变量的空间占用比一个 Number 类型的数值大
let one_day = 'wednesday';

// 比较使用的时间也较长
if (one_day === 'wednesday') {
  // ...
}

const weekdays = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6
};

// 使用枚举节省了 one_day 变量占用的空间，也可快速进行 one_day 和预期取值的比较
one_day = weekdays.wednesday;

if (one_day === weekdays.wednesday) {
  // ...
}
```

此外，在 IDE 的辅助下，枚举还能避免因拼写错误导致的 bug。

在常量数据文件中可以以如下方式定义枚举：

```javascript
const some_enum = {
  type_1: 0,
  type_2: 0,
  type_3: 0,
  // ...
  type_x: 0
};
Object.keys(some_enum).forEach((k, i) => (some_enum[k] = i));
```

上面的代码定义了一个枚举 `some_enum`，并且使用 [Object.keys](./04-js-basic#进阶objectkeysobjectvalues与objectentries) 和 [Array.forEach](./04-js-basic#进阶arrayforeacharraymap和arrayfilter) 为其中的属性赋予了不同的自然数数值，保证了枚举对象中的属性对应不同的属性值。

当需要使用枚举值的名字（即枚举对象中的属性名），可以添加以下代码：

```javascript
// 枚举 some_enum 的定义
some_enum.keys = Object.keys(some_enum);

// 使用变量 v 存放枚举 some_enum 中的随机枚举值
let v;

// 然后可以通过 some_enum.keys 获取枚举值的名字
some_enum.keys[v];
```

以下是 EraUma 中的一个枚举的例子，这个枚举对象 item_enum 定义了性玩具的类型，并用 item_names 定义了每种类型的性玩具显示用的中文名：

```javascript
const item_enum = {
  // 口球
  gag: 0,
  // 夹子（乳樱）
  clamps: 0,
  // 电击器（乳樱）
  electric_stunner: 0,
  // 吸奶器
  milk_pump: 0,
  // 跳蛋（乳核樱菊）
  love_eggs: 0,
  // 伪器（樱菊）
  dildo: 0,
  // 肛塞
  butt_plug: 0,
  // 拉珠
  anal_beads: 0,
  // 眼罩
  blindfold: 0,
  // 项圈
  collar: 0,
  // 全身镜
  mirror: 0,
  // 飞机杯
  artificial_virgin: 0,
};
Object.keys(item_enum).forEach((e, i) => (item_enum[e] = i));

const item_names = [];
item_names[item_enum.anal_beads] = '拉珠';
item_names[item_enum.blindfold] = '眼罩';
item_names[item_enum.butt_plug] = '肛塞';
item_names[item_enum.clamps] = '夹子';
item_names[item_enum.collar] = '项圈';
item_names[item_enum.dildo] = '伪器';
item_names[item_enum.electric_stunner] = '电击器';
item_names[item_enum.gag] = '口球';
item_names[item_enum.love_eggs] = '跳蛋';
item_names[item_enum.milk_pump] = '榨乳器';
item_names[item_enum.mirror] = '全身镜';
item_names[item_enum.artificial_virgin] = '飞机杯';
```

# JSON 文件

JSON 文件只能导出对象和数组。因为 IDE 对 JSON 文件以模块导入时的提示支持不佳，仅建议以 JSON 文件定义属性名含 Unicode 字符的常量对象，例如 EraUma 中角色对应的孩子取名列表（局部）：

```json
{
  "东海帝王": [
    "东海角",
    "奇迹帝王",
    "最终传说",
    "东海一辉",
    "东海龙王",
    "黑色流星",
    "百万引擎",
    "独行跑者",
    "强大血脉",
    "也文砂糖",
    "真的不错",
    "东海庆典",
    "第三舞台"
  ]
}
```