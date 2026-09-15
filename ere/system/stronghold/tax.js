/**
 * @file 税収：@TAX_GET。
 *
 * 源: target/ERB/SHOP/TAX.ERB  @TAX_GET（:8-230）。被
 *     EVENT/EVENT_NEXTDAY.ERB:181 无条件调用（朝事件段），调用点接入随
 *     #400（N16 的日循环靶）——本票先把税金算出来，让 N16 接手时它已在位。
 *
 * 结算结构（四段，全部累加进 TAX:0；TAX 是原作 #DIM TAX,4 的局部数组，
 * 这里落四个局部量）：威望档位的「魔界支援」（:31-68）→ 土地税 TAX:1
 * （:82）→ 肉便器税 TAX:2（:163）→ 魔王特別税 TAX:3（:205）。末段按黑方片
 * 加成后一并入账 MONEY 与 EX_FLAG:4444（:228-229）。
 *
 * **整数除法**：原作全用 `int / int`（Emuera 截断），本文件逐处 Math.trunc
 * （销售侧 multiply_percent 的同款——ere/system/stronghold/sale.js:113）；
 * 挪成 `/` 的浮点结果会在「单价 × 天数 × 威望 / 100」一类算式上漂移。
 *
 * **FLAG:9 的语义**：魔王特別税按 `(FLAG:9 + 100)%` 加成，收完即清零
 * （:205-213）。#395 的「休息」分支写同一个变量（`+5`，税率百分比的累加，
 * 不是税额），两边语义一致：这里是消费点，那里是积累点。属主是 stronghold
 * （ownership/flag-ownership.yml:36），域内写走 game.stronghold.税金修正
 * ——#395 的调用点即此门面，本文件沿用。
 *
 * 有意不镜像的两处（引擎能力缺席，非漏移植）：
 *   - `DRAWLINE` 的 CUSTOMDRAWLINE 字符：原作 TAX.ERB 未设，用默认 `-`；
 *     ere 的 era.drawLine() 是虚线段，线条字符不镜像（#175 先例）。
 *   - 原作 `WAIT` / `PRINTFORMW` 一律读键：era.print + era.waitAnyKey 两步
 *     展开（PRINTFORMW = PRINTFORM + WAIT），行数与等待次数 1:1。
 */

'use strict';

const era = require('#/era-electron');
const { game } = require('#/facade/game');
const era_exflag = require('#/era-utils/era-exflag');
const era_flag = require('#/era-utils/era-flag');

/** 税収日（:15 `DAY:2 == 10 || DAY:2 == 20 || DAY:2 == 30`） */
const TAX_DAYS = [10, 20, 30];

/**
 * 魔界からの支援（:41-68）：威望（EX_FLAG:99）档位表。
 *
 * `[上限, 单价, 封顶, 文案]`——原作的五支 IF/ELSEIF 依次是
 * `<=20 && >=0`、`<=40 && >20`、`<=60 && >40`、`<=80 && >60`、
 * `<=100 && >80`，即「`> 上一档上限`」；整数域上等价于 `> 上限`（首档的
 * `>= 0` 等价于 `> -1`），故统一写成 `prev_max < p <= max` 的扫描。
 * 首档单价 0、不封顶（原作 `TAX:0 = 0` 是赋值而非加法——此处 TAX:0 此刻
 * 恒为 :21 刚清的 0，加上 0 与赋 0 等价；写成 `cap: 0` 会把单价也盖成
 * 不可观测，故照原作留无封顶）；范围外（<0 或 >100）一支都不命中，连文案
 * 都不打——照搬。
 */
const PRESTIGE_BRACKETS = [
  { max: 20, rate: 0, cap: Infinity, label: '威望值是【岌岌可危】' },
  { max: 40, rate: 30, cap: 5000, label: '威望值是【动荡不安】' },
  { max: 60, rate: 50, cap: 10000, label: '威望值是【略受质疑】' },
  { max: 80, rate: 50, cap: 30000, label: '威望值是【相安无事】' },
  { max: 100, rate: 100, cap: 50000, label: '威望值是【广受爱戴】' },
];

/**
 * 五块领土（:86-121）。前四块同构——「已征服 → 定值 1200 / 否则侵攻度
 * 大于 10 时按 `侵攻度 / 10` 收殖民地税」；第五块只有已征服一支。
 *
 * `conquered` 是已征服的判据值：第一块原作写 `IF FLAG:82`（非零即可），
 * 二至四块写 `== 2`，故前者用 `null` 表示「非零」，其余写死数值。
 * 侵攻度的阈值 10 与除数 10 见 :89-91（同一常量在四块里各写一遍，原作
 * 即如此，不抽公共常量——它们是可以各自被改动的字面量）。
 */
const TERRITORIES = [
  {
    flag: 82,
    conquered: null,
    conquered_label: '├ 地上的魔界领土 1200',
    amount: 1200,
    invasion: 81,
    colony_label: '├ 人间界殖民地 ',
  },
  {
    flag: 87,
    conquered: 2,
    conquered_label: '├ 黑暗精灵的领土 1200',
    amount: 1200,
    invasion: 86,
    colony_label: '├ 精灵族领域殖民地 ',
  },
  {
    flag: 89,
    conquered: 2,
    conquered_label: '├ 混沌龙之山 1200',
    amount: 1200,
    invasion: 88,
    colony_label: '├ 龙之山脉殖民地 ',
  },
  {
    flag: 91,
    conquered: 2,
    conquered_label: '├ 堕天使的淫界 1200',
    amount: 1200,
    invasion: 90,
    colony_label: '├ 天界的殖民地 ',
  },
  {
    flag: 92,
    conquered: 15,
    conquered_label: '├ 圣灵骑士的卖春堡垒 1500',
    amount: 1500,
    invasion: null,
    colony_label: null,
  },
];

/**
 * 地下城税六档（:127-145）：`[等级上限（不含）, 等级单价, 基数]`。
 * 首档原作没有下界（`IF CFLAG:0:9 < 20`），负等级照落首档——不补钳制。
 * 末档是原作的 ELSE（本文件用 Infinity 承接）。
 */
const DUNGEON_TAX_BRACKETS = [
  [20, 50, 100],
  [40, 40, 300],
  [80, 30, 700],
  [150, 20, 1500],
  [300, 10, 3000],
  [Infinity, 5, 4500],
];

/**
 * @TAX_GET（:8-230）：税収结算。非税日（:15-19，DAY:2 不是 10/20/30）在
 * **任何输出之前** `RETURN 0`，一行不打。
 *
 * @returns {Promise<number>} 原作两条出口都 RETURN 0
 */
async function tax_get() {
  const date = era_flag.date; // DAY:2 = 日
  if (!TAX_DAYS.includes(date)) {
    return 0;
  }

  era.print('今天宜收税，宜鬼畜，宜调教，宜激烈做爱；忌纯爱，忌良心发现……'); // :16 PRINTW
  await era.waitAnyKey();
  era.drawLine(); // :24-29 DRAWLINE / PRINTL×3 / WAIT
  era.print('');
  era.print('- - - 收税 - - -');
  era.print('');
  await era.waitAnyKey();

  // :21 TAX:0 = 0（合计，四段累加）
  let total = 0;

  // :31-68 魔界からの支援
  const prestige = era_exflag.prestige; // EX_FLAG:99 = 威望
  const day_count = era_flag.day_count; // DAY:0 = 天数
  let prev_max = -1; // 首档的 `>= 0`
  for (const { max, rate, cap, label } of PRESTIGE_BRACKETS) {
    if (prestige <= max && prestige > prev_max) {
      era.print(label);
      total += Math.trunc((day_count * rate * prestige) / 100); // :46 等
      if (total > cap) {
        total = cap; // :47-49 等（TAX:0 此刻即本档贡献）
      }
      break;
    }
    prev_max = max;
  }

  era.print(''); // :70-71 PRINTL + PRINTFORMW 合计
  era.print(`来自魔界的支援 ${total}`);
  await era.waitAnyKey();

  // :73-152 土地税（TAX:1）
  let land_tax = 0; // :82 TAX:1 = 0
  era.print('*土地税*'); // :84 PRINTL

  for (const {
    flag,
    conquered,
    conquered_label,
    amount,
    invasion,
    colony_label,
  } of TERRITORIES) {
    const flag_value = era.get(`flag:${flag}`) || 0;
    const is_conquered =
      conquered === null ? flag_value !== 0 : flag_value === conquered;
    if (is_conquered) {
      era.print(conquered_label);
      land_tax += amount;
      continue;
    }
    if (invasion === null) {
      continue; // 第五块没有殖民地一支
    }
    const invasion_value = era.get(`flag:${invasion}`) || 0;
    if (invasion_value > 10) {
      const colonies = Math.trunc(invasion_value / 10);
      era.print(`${colony_label}${colonies}`);
      land_tax += colonies;
    }
  }

  // :126-145 地下城（PRINTFORM 不换行 + PRINTFORML 取值 → 同一行）
  const maze_level = era.get('cflag:0:9') || 0; // CFLAG:0:9 = 迷宫 Lv
  const [, rate, base] = DUNGEON_TAX_BRACKETS.find(
    ([limit]) => maze_level < limit,
  );
  const dungeon_tax = maze_level * rate + base;
  era.print(`└ 地下城 ${dungeon_tax}`);
  land_tax += dungeon_tax;

  era.print(''); // :149-150 PRINTL + PRINTFORMW 合计
  era.print(`合计 ${land_tax}`);
  await era.waitAnyKey();
  total += land_tax; // :152 TAX:0 += TAX:1

  // :154-196 肉便器税（TAX:2）
  let toilet_tax = 0; // :163 TAX:2 = 0
  era.print(''); // :165-166 PRINTL + PRINTL
  era.print('*肉便器税*');

  // :168-171 展品观赏税（FLAG:84 = 展品数，> 0 才收，每件 10）
  const exhibits = era.get('flag:84') || 0;
  if (exhibits > 0) {
    era.print(`├ 展品观赏税 ${exhibits * 10}`);
    toilet_tax += exhibits * 10;
  }

  // :173-176 肉便器使用税（FLAG:83 = 肉便器数，> 0 才收，每件 10）
  const toilets = era.get('flag:83') || 0;
  if (toilets > 0) {
    era.print(`├ 肉便器使用税 ${toilets * 10}`);
    toilet_tax += toilets * 10;
  }

  // :179-185 淫魔卖春税（无门槛）：ITEM:143 女巫 / 152 魅魔 / 182 莉莉丝
  // 各 ×2，另加固定 20
  const whores =
    (era.get('item:143') || 0) * 2 +
    (era.get('item:152') || 0) * 2 +
    (era.get('item:182') || 0) * 2 +
    20;
  era.print(`└ 淫魔卖春税 ${whores}`);
  toilet_tax += whores;

  // :187-191 `FOR LOCAL,1,10` + `SIF FLAG:(LOCAL + 349) == 507`：
  // 娼馆街（FLAG:350-358，九个下标、步长 1）每有一处就整体乘 1.1。
  // TIMES 是「整数 × 小数后截断」（Emuera 命令，emuera 技能
  // math-etc.md:209-227），命中多次即逐个复合。
  for (let index = 1; index < 10; index += 1) {
    if ((era.get(`flag:${index + 349}`) || 0) === 507) {
      toilet_tax = Math.trunc(toilet_tax * 1.1);
    }
  }

  era.print(''); // :193-194 PRINTL + PRINTFORMW 合计
  era.print(`合计 ${toilet_tax}`);
  await era.waitAnyKey();
  total += toilet_tax; // :196 TAX:0 += TAX:2

  // :198-213 魔王特別税（TAX:3）：按 FLAG:9 的百分比加成，收完清零。
  // 三行是「乘 (FLAG:9 + 100) → 整除 100 → 减回原额」，故这是「加到
  // total 上的增量」而不是「total 乘以税率」——FLAG:9 为负时修正为负。
  era.print(''); // :202-203 PRINTL + PRINTL
  era.print('*魔王特别税*');
  let surcharge_tax = Math.trunc(
    (total * (game.stronghold.税金修正 + 100)) / 100,
  );
  surcharge_tax -= total;
  era.print(`合计 ${surcharge_tax}`); // :209 PRINTFORMW
  await era.waitAnyKey();
  total += surcharge_tax; // :211 TAX:0 += TAX:3
  game.stronghold.税金修正 = 0; // :213 FLAG:9 = 0

  // :215-229 合计税収
  era.drawLine(); // :215-229 段的 DRAWLINE + PRINTL
  era.print('');

  // :221-225 黑方片的商业运营：EX_FLAG:2811 ∈ [51, 100) 时收入乘
  // (10 + 2811/10)/10——倍数的小数位就是 2811 的十位数字
  const route_22 = era_exflag.route_22;
  if (route_22 >= 51 && route_22 < 100) {
    const level = Math.trunc(route_22 / 10);
    era.print(`黑方片的商业运营有方，收入乘以1.${level}`);
    total = Math.trunc((total * (10 + level)) / 10);
  }

  era.print(`合计税收 ${total}`); // :226 PRINTFORMW
  await era.waitAnyKey();
  era_flag.money += total; // :228 MONEY += TAX:0
  era_exflag.legit_money += total; // :229 EX_FLAG:4444 += TAX:0

  return 0; // 原作尾的 RETURN 0（两句出口同值，见上方 :8-230 的收尾）
}

module.exports = { tax_get };
