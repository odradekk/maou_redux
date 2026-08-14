---
title: '#15 调教系统实现'
---

本章介绍era和ere游戏的核心玩法——调教系统的实现。在经典的era游戏中，调教系统涉及 abl、talent、exp、mark、jewel 等表，以及所有 [专属于调教系统的数据表](./09-static#调教系统使用的表)（tflag、tcvar、tequip、param、gotjewel、source、ex、nowex、stain等），复杂度胜过存读档系统和商店系统。

> 理论上调教系统的子系统——升级系统其实就是商店系统的变体。

EraElectron引擎提供的与调教有关的 API 有 era.beginTrain、era.addCharacterForTrain、era.getCharactersInTrain、era.nextTurnInTrain 和 era.endTrain。本章将综合利用之前介绍的 API、系统实现和引擎/语言特性实现一个经典era风格（参考元祖era [erakanon](https://cbaku2.sakura.ne.jp/b/2010/12/eramaker/)）的简易调教系统，尽可能包含经典era调教系统中的大多数元素。

> 本章是第四部分中唯一一个不可以参考EraUma相关实现的章节，因为本章是按照经典era游戏的思路去实现调教系统，而EraUma的调教系统以 [《卡琳监狱》](https://store.steampowered.com/app/1619750/Karryns_Prison/) 为蓝本。

# 概览

在具体实现之前，本节将梳理调教系统的界面和主要交互循环，列出为实现调教系统的所有开发工作，并补全调教系统所需的所有变量和数据定义。

## 调教系统逻辑梳理

经典era风格的调教系统界面主要分为三个横向区域：

* 上方的横向区域显示基本资源（一般是被调教者的体力和气力，base 表）、被调教者的身体参数和参数等级（param 表）、调教者的部分参数（param 表，用于计算射精之类会影响到被调教者的调教者高潮）；
* 中部的横向区域显示可选择的调教指令；
* 下方的横向区域显示一些调教系统的设置或者情报按钮，例如筛选指令、显示角色情报、显示脏污情况等。

调教系统的设计理念一般遵循以下要点：

* **指令形式的性爱互动**是这种调教系统的核心，代表与角色的某种性爱交互；
* 指令首先造成角色 **来源（source）** 和 **经验（exp）** 的变化，然后根据来源造成 **角色参数（param/delta）** 的变化，根据参数的变化结算 **高潮（ex/nowex）** 与 **刻印（mark）**；
  * **来源（source）** 与 **参数（param/delta）**：参数可以理解为角色在本次调教中积累的身体快感和精神情感，而来源则是这些快感和情感的获得途径；指令对应的一次性行为可能通过多种途径影响了角色的身体快感和精神情感，来源和参数的分离设计正是为了模拟这一点；在程序上，参数分为记录整个调教过程积累下来的 param 表和单次性行为导致的 delta 表；
  * **高潮**：顾名思义，某些身体快感积累到一定程度就会诱发的身体的强烈反应，只会因为身体快感而获得；在程序上，高潮分为记录整个调教过程积累的 ex 表和单次性行为导致的 nowex 表；
  * **刻印**：因某些参数的变化而获得，它代表的是角色在调教中经受的极端的事件，例如欢愉（快楽）刻印一般由角色的身体快感上升量到达一定程度后获得、表示角色经受了强烈的性高潮，苦痛刻印一般由角色的痛苦参数上升量到达一定程度后获得、表示角色经受过的剧烈的痛苦；
* 在结束调教后，根据获得的参数获得升级 **能力（abl）** 用的 **宝珠（jewel/gotjewel）**；
  * **宝珠（jewel）**：宝珠其实是与经验相对的可消耗的经验值，或者用于购买能力用的货币；宝珠一般与参数一一对应，因调教中积累的身体参数得来，当然也存在润滑之类单纯的身体参数；在程序上，宝珠分为多次调教积累下来的总 jewel 表和单次调教过程积累下来获得的 gotjewel 表；
  * 经典era风格的调教系统中参数和经验都有分级的设定，来区分有一点湿/洪水泛滥或一张白纸/经验丰富的情况，在将参数结算为宝珠的时候也会按照分级阶梯性地获得宝珠；
* 调教指令一般有条件和实行值的区别，这些会受能力、**素质（talent，可以理解为不能升级的能力）**、参数、刻印、经验、道具等的综合影响：
  * 条件：决定指令是否具备基本的可执行性，例如男性没有可以被插入的小穴、没有协助者的情况下不能要求协助者与调教对象接吻、没有跳蛋不能使用跳蛋，没有通过条件检查的指令不会被显示在调教指令区域；影响条件的因素一般是素质、道具、人员等；
  * 实行值：决定指令是否可以被最终执行，例如虽然角色可以自慰、但是在没有屈服之前不会因玩家的命令而自慰，没有通过实行值检定的指令不会被最终执行，不会造成来源、参数、高潮或刻印的变化。

> 讨论：如何确定来源和参数？<br>
> 来源和参数算是经典era风格的调教系统中最容易让人迷惑的内容了，source 表和 delta 表（在emuera中则是 UP/DOWN 表）是单次调教指令限定的表，每次调教指令结算之后就会被清空（delta 表会结算到 param 表中导致角色参数的变化）。<br>
> 之前讲来源和参数是模拟一次指令通过多种途径对角色的影响。但在笔者看来，这在程序上其实是一种数据压缩的手段。<br>
> [#1 基本知识](./01-basic#eraelectron运行流程) 一章中笔者简要介绍了UTF-8等字符编码技术。如果深究根源，字符编码技术的根本问题就在于如何用二进制数表示人类使用的语言文字。这个问题有一个直观的解法：首先列出人类常用的一些字符，然后用相同数量的二进制位与之一一对应。这个解法除了每个字符都要用一长串二进制表示之外并无问题：假设常用的字符有30万个，那每个字符就对应30万位二进制。当然，这需要非常庞大的存储空间，所以编码技术以一系列位的组合来表示一个字符，大大减少了表示一个字符所需要的二进制位，提高了表达效率和存储利用率。<br>
> 通过合理安排变量/数据表示与值的对应关系，提高表达效率和存储利用率、降低要处理问题的复杂度是编程中很常见的手段（其实也是数学建模的重要部分），而era游戏中的来源和参数其实也有类似的关系：通过来源向参数的转化，开发者可以利用较少的来源变量控制较多的参数变量；在开发支持新的指令时，开发者可以仅关注较少的来源变量，进行更缜密的设计和更妥善的安排，降低犯错的可能性。<br>
> 从这个角度考虑，其实元祖era erakanon的设计并不完善：erakanon的 source 变量多达17个，而 param 变量只有15个，也就是说在开发支持新指令时所需要考虑的来源变量甚至比直接处理角色参数变量时多，完全没有起到简化问题提高效率的作用，反而在系统层面上产生了迷惑（source 变量和 param 变量同名的情况）；另外，还有能力、素质、经验、刻印作用混淆的问题，这也会影响到玩家的游玩体验。<br>
> 总而言之，在设计游戏的调教系统时，如果考虑指令对角色快感和情感造成影响的途径过多（来源多于参数）的情况，可以考虑抛开来源变量，直接对角色参数（delta）进行读写；如果角色参数变量较多，则可以尝试安排较少的来源（source），然后在指令的结算阶段将来源转换为角色参数；能力、素质、经验、刻印对来源和参数的影响也应该尽可能统一，能力、素质和经验应尽量只影响来源，而刻印因为表示曾经经历过的极端情况可以与参数变化量挂钩；此外，在一个指令对应的处理流程中，一个因素（能力、素质、经验、刻印、角色参数）应尽量只参与一次计算。当然这只是笔者的一家之言，读者可以酌情考量。<br>
> 当然在本章中，为了尽可能贴近经典era风格调教系统的设计思路和实现方式，笔者会启用来源作为参数计算的中间结果。

调教系统的交互循环一般遵循以下流程：

* 开始调教：初始化相关变量，设置污垢情况；
* 玩家选择调教指令；
* 系统调用调教指令对应的角色口上，其中可能进行实行值的检查，检查不通过则拒绝执行指令并显示提示；
* 根据调教指令，设置调教者和被调教者的来源（source 表）、身体部位污垢情况（stain 表）、以及行为或者体验的经验（exp 表）；
* 根据调教者和被调教者的来源（source 表），转换为身体参数（param 表）并更新高潮情况（nowex 表）：
  * 首先结算与高潮相关的身体参数（param 表）的来源（source 表）转换，更新身体参数获得量（delta 表），更新高潮情况（nowex 表）；
  * 有高潮的情况，更新其他与高潮无关的来源（source 表），更新相关的经验（exp 表）；
  * 将与高潮无关的参数相关的来源（source 表）转换为身体参数（delta 表）；
  * 根据高潮的情况，设置相关的身体参数获得量（delta 表），使其在更新到身体参数（param 表）后使相关身体参数重置为基准值；
  * 检查身体参数的获得量（delta 表），更新角色的刻印（mark 表）；
* 将本次指令造成的身体参数获得量（delta 表）结算到身体参数（param 表）中，将本次指令造成的高潮（nowex 表）结算到整个调教过程的高潮情况（ex 表）中；
* 清空 delta 表、source 表和 nowex 表；
* 进入下次交互循环，绘制调教系统界面，显示新的身体参数（param 表），并根据条件更新可执行的调教指令；
* 结束调教：根据身体参数（param 表）和高潮情况（ex 表），计算宝珠获取数量（gotjewel 表），进行相关宝珠抵消计算后结算到角色的宝珠数量中（jewel 表）。

## 调教系统设计

参考元祖era [erakanon](https://cbaku2.sakura.ne.jp/b/2010/12/eramaker/)，本章实现了一个简单的调教系统，涉及6个调教指令、6种来源、6种参数、2种经验、2种高潮、2种刻印、2种调教道具、3种身体部位与3种污垢、3种能力和3种素质。这里从调教指令为中心出发简单梳理一下调教系统的设计思路：

* **6个调教指令** 分为两类：
  * **爱抚**：直接性爱行动，通过刺激阴核（来源[快C]）制造阴核快感（参数[快C]）、通过前戏（来源[欲望]）勾起欲望（参数[欲望]），增加[C经验]该指令无条件检查和实行值检查；爱抚时调教者的手会和被调教者的小穴接触，沾染污垢（污垢[手]和[穴]）；
  * **要求自慰**：直接性爱行动，要求调教对象通过刺激阴核（来源[快C]）制造阴核快感（参数[快C]）、通过前戏（来源[欲望]）勾起欲望（参数[欲望]），增加[C经验]，无条件检查，但需要通过实行值检查；可以通过提升阴核敏感度（能力[C敏感]）、基础欲望（能力[欲望]）并制造痛苦（刻印[苦痛]）提高实行值；在调教中没有欲求的情况下（参数[欲望]不高于3级）会因为反感（来源[反感]）否定调教结果（参数[否定]）；爱抚时被调教者的手会和小穴接触，沾染污垢（污垢[手]和[穴]）；
  * **正常位**：直接性爱行动，将肉棒插入小穴，通过刺激小穴（来源[快V]）制造小穴快感（参数[快V]）并勾起欲望（参数[欲望]），增加[V经验]，并使被调教者处女丧失（素质[处女]），该指令无条件检查和实行值检查；在润滑不足（参数[润滑]低于3级）的情况下会造成痛苦（来源[痛觉]和参数[痛苦]）并招致反感（来源[反感]和参数[否定]）；调教者的肉棒会和被调教者的小穴接触，沾染污垢（污垢[棒]和[穴]）；调教者因为肉棒的快感会积累射精量表（参数[快C]）；
  * **刺激G点**：直接性爱行动，通过G点对被调教者的小穴制造强烈刺激（来源和参数[快V]）并勾起欲望（参数[欲望]），需要满足肉棒在小穴内的条件（之前的指令为[正常位]），增加[V经验]，无实行值检查；在润滑不足（参数[润滑]低于3级）的情况下会造成痛苦（来源[痛觉]和参数[痛苦]）并招致反感（来源[反感]和参数[否定]）；调教者的肉棒会和被调教者的小穴接触，沾染污垢（污垢[棒]和[穴]）；调教者因为肉棒的快感会积累射精量表（参数[快C]）；
  * **媚药**：道具行动，通过喂食媚药大幅提高被调教者的欲望（来源和参数[欲望]），但会微幅招致反感（来源[反感]和参数[否定]），需要持有媚药、被调教者没有服用过媚药时才能使用（道具和调教装备[媚药]），使用后标记角色不能再喂食（调教装备[媚药]），无实行值检查；
  * **润滑**：道具行动，通过使用润滑液大幅提高被调教者的润滑等级（来源[液体]和参数[润滑]），但会微幅招致反感（来源[反感]和参数[否定]），需要持有润滑液、被调教者润滑不足（参数[润滑]等级低于3级）时才能使用，无实行值检查。
* **6个来源** 和 **6个参数** 分别一一对应：
  * **来源和参数[快C]**：调教结束后转化为宝珠[快C]；
  * **来源和参数[快V]**：调教结束后转化为宝珠[快V]；
  * **来源[液体]** 和 **参数[润滑]**：参数[润滑]表示被调教者的润滑程度，等级越高程度越高，减少因摩擦带来的[痛觉]并微幅增加来源[欲望]的获取；调教结束后不会转化为任何宝珠；
  * **来源** 和 **参数[欲望]**：参数[欲望]表示被调教者的欲求，等级越高欲望就越炽烈，能够提高指令[要求自慰]的实行值，减少来源[痛觉]和[反感]的获取；调教结束后转化为宝珠[欲望]
  * **来源[痛觉]** 和 **参数[痛苦]**：来源[痛觉]主要转化为参数[痛苦]，也会以一定比例转化为参数[否定]；参数[痛苦]表示被调教者的痛苦程度，等级越高越痛苦，会降低指令[要求自慰]的实行值，增加来源[痛觉]和[反感]的获取，一次获得大量参数[痛苦]会使角色获得刻印[苦痛]；调教结束后转化为宝珠[痛苦]；
  * **来源[反感]** 和 **参数[否定]**：一次获得大量参数[否定]会使角色获得刻印[反抗]；调教结束后转化为宝珠[否定]，并与前面四种宝珠抵消；
* **2种高潮**：在参数[快C]到达4级以上时发生 **[C高潮]**，参数[快V]到达4级以上时发生 **[V高潮]**，每次高潮都会奖励大量相应宝珠；玩家的[C高潮]会导致玩家射精，被调教角色的[C高潮]和[V高潮]会因为爱液的渗出而获得大量来源[液体]；
* **2种刻印**：**[苦痛]** 为正面刻印，可以提高指令[要求自慰]的实行值，通过一次性获得大量参数[痛苦]获得；**[反抗]** 为负面刻印，会降低所有指令的实行值，通过一次性获得大量参数[否定]获得；
* **2种调教道具**：在执行对应指令时使用，会消耗对应道具，其中道具 **[媚药]** 的使用会设置被调教者的调教装备[媚药]，来禁止反复使用；
* **3种身体部位** 和 **3种经验**：玩家具有 **[手]** 和 **[棒]** 两种身体部位，被调教者具有 **[手]** 和 **[穴]** 两种部位；在调教开始时，[棒]会渗出先走液（以`<Ｐ>`表示），[穴]会渗出爱液（以`<Ｖ>`表示），射精后[棒]及其接触部位会沾染精液（以`<精>`表示）；
* **3种能力**：**[C感觉]** 和 **[V感觉]** 分别使用[快C]和[快V]宝珠升级，以指数提高来源[快C]/[快V]的获取；**能力[欲望]** 使用宝珠[欲望]升级，以指数提高来源[欲望]的获取；所有能力最高升级到5级；
* **3种素质**：**[处女]** 表示角色是否是处女，在执行指令[正常位]之后消失，拥有素质[处女]的情况下经验[V经验]一定是0；**[C感觉]** 和 **[V感觉]** 分别通过取值+-1来表示敏感和钝感两种情况，敏感会导致相应的来源获取+50%，钝感则导致相应的来源获取-50%。

为此，需要更新或新增一些静态数据文件、变量和运行常量：

```csv
; Base.csv
0,体力
1,气力
```

```csv
; Exp.csv
0,C经验
1,V经验
```

```csv
; TFlag.csv
0,前回行动
```

```csv
; Source.csv
0,快C
1,快V
2,痛觉
3,液体
4,欲望
5,反感
```

```csv
; Param.csv
0,快C
1,快V
2,润滑
3,欲望
4,痛苦
5,否定
```

```csv
; Ex.csv
0,C高潮
1,V高潮

10,体力消耗
11,气力消耗
```

```csv
; Stain.csv
0,手
1,棒
2,穴
```

```csv
; Mark.csv
0,苦痛
1,反抗
```

```csv
; Item.csv
; ...
10,媚药,2000
11,润滑液,4000
```

```csv
; TEquip.csv
0,媚药
```

```csv
; Chara0000.csv
角色编号,0
姓名,主角
称呼,你
基础属性,体力,2000
基础属性,气力,2000
```

```csv
; Chara0001.csv
; ...
基础属性,体力,2000
基础属性,气力,1000
素质,处女,1
素质,C感觉,1
```

```csv
; Chara0002.csv
; ...
基础属性,体力,2000
基础属性,气力,1000
素质,处女,1
素质,V感觉,-1
```

```csv
; GameBase.csv
; ...
初始角色编号,0
```

```javascript
// #/data/ero/action-const.js
/**
 * 调教指令的枚举
 */
const actions = {
  // 爱抚
  pet: 0,
  // 自慰
  masturbate: 1,
  // 正常位
  missionary: 2,
  // 刺激G点
  stimulate_g_spot: 3,
  // 媚药
  poison: 4,
  // 润滑
  lubricant: 5,
};
Object.keys(actions).forEach((k, i) => (actions[k] = i));
actions.keys = Object.keys(actions);

/**
 * 调教指令的名称
 */
const action_names = [];
action_names[actions.pet] = '爱抚';
action_names[actions.masturbate] = '要求自慰';
action_names[actions.missionary] = '正常位';
action_names[actions.stimulate_g_spot] = '刺激G点';
action_names[actions.poison] = '媚药';
action_names[actions.lubricant] = '润滑';

module.exports = { action_enum: actions, action_names };
```

```javascript
// #/data/ero/param-const.js
const borders = [100, 500, 3000, 10000, 30000, 60000, 100000, 150000, 250000];

module.exports = {
  /**
   * 根据参数数值获取相应的宝珠
   *
   * @param {number} param 参数数值
   * @returns {number} 获取的宝珠数量
   */
  convert_to_jewel(param) {
    if (param < borders[0]) {
      return 0;
    } else if (param < 3 * borders[0]) {
      return 1;
    } else if (param < borders[1]) {
      return 2;
    } else if (param < 3 * borders[1]) {
      return 10;
    } else if (param < borders[2]) {
      return 20;
    } else if (param < 2 * borders[2]) {
      return 100;
    } else if (param < borders[3]) {
      return 200;
    } else if (param < borders[4]) {
      return 1000;
    } else if (param < borders[5]) {
      return 2000;
    } else if (param < borders[6]) {
      return 3000;
    } else if (param < borders[7]) {
      return 5000;
    } else if (param < borders[8]) {
      return 8000;
    }
    return 12000;
  },
  /**
   * 根据参数数值获取参数等级
   *
   * @param {number} param 参数数值
   * @returns {number} 参数的等级
   */
  get_param_level(param) {
    let level = 0;
    while (param >= borders[level]) {
      level++;
    }
    return level;
  },
  // 参数等级对应的上限参数数值
  param_level_borders: borders,
  // 参数进度条的颜色
  progress_colors: ['#b05a76', '#cf00cf'],
};
```

```javascript
// #/data/ero/stain-const.js
/**
 * 污垢类型的枚举<br>
 * 因为同一个部位可以有多种污垢，所以使用位运算来表示<br>
 * 例如：0x03（16进制，等于10进制下的3，等于二进制的0b11）表示部位既有爱液又有先走液
 */
const stains = {
  // 爱液
  virgin: 0,
  // 先走液
  penis: 1,
  // 精液
  semen: 2,
};
Object.keys(stains).forEach((k, i) => (stains[k] = 1 << i));

/**
 * 污垢类型的名称
 */
const stain_names = {};
stain_names[stains.virgin] = '<Ｖ>';
stain_names[stains.penis] = '<Ｐ>';
stain_names[stains.semen] = '<精>';

module.exports = { stain_enum: stains, stain_names };
```

然后在 `#/page/homepage.js` 新增一个按钮，用来进入调教：

```javascript
// #/page/homepage.js
// ...
era.printMultiColumns(
  ['聊天', '切换口上', '开始调教'].map((e, i) => ({
    accelerator: i + 100,
    config: { align: 'center', width: 8 },
    content: e,
    type: 'button',
  })),
);
// ...
  case 102:
    // 调教的入口
    break;
// ...
```

# 调教界面

本节先为调教系统创建一个简单的界面，并实现所有的功能按钮。创建 `#/page/page-ero.js`，输入以下内容：

```javascript
// #/page/page-ero.js
const era = require('#/era-electron');

const { get_gradient_color } = require('#/utils/color-utils');

const { action_enum, action_names } = require('#/data/ero/action-const');
const {
  get_param_level,
  param_level_borders,
  progress_colors,
} = require('#/data/ero/param-const');
const { stain_enum, stain_names } = require('#/data/ero/stain-const');

/**
 * 调教系统的入口
 */
async function page_ero() {
  const cur_chara = era.get('flag:当前角色');
  let flag = true;
  // 开始调教，不调用这个API不会创建所需的表，后面的所有 era.get 和 era.set 都会出错
  era.beginTrain(0, cur_chara);
  // 设置所有角色的污垢
  era.getCharactersInTrain().forEach((e) => {
    era.set(`stain:${e}:棒`, stain_enum.penis);
    era.set(`stain:${e}:穴`, stain_enum.virgin);
  });
  era.set('tflag:前回行动', -1);
  while (flag) {
    await era.clear();
    era.drawLine();
    // 输出正在调教的角色名
    era.print([
      '正在调教 ',
      {
        content: era.get(`callname:${cur_chara}:-1`),
        color: era.get(`cstr:${cur_chara}:代表色`),
      },
    ]);
    const hp = era.get(`base:${cur_chara}:体力`),
      sp = era.get(`base:${cur_chara}:气力`);
    // 输出体力和气力的进度条
    era.printMultiColumns(
      [
        { content: '体力', config: { width: 2 }, type: 'text' },
        {
          config: {
            color: hp < 1000 ? 'red' : '#009300',
            height: 20,
            width: 9,
          },
          inContent: `${Math.floor(hp).toLocaleString()}/${era.get(`maxbase:${cur_chara}:体力`).toLocaleString()}`,
          percentage: (hp * 100) / era.get(`maxbase:${cur_chara}:体力`),
          type: 'progress',
        },
        { content: '气力', config: { offset: 1, width: 2 }, type: 'text' },
        {
          config: {
            color: '#6b6bff',
            height: 20,
            width: 9,
          },
          inContent: `${Math.floor(sp).toLocaleString()}/${era.get(`maxbase:${cur_chara}:气力`).toLocaleString()}`,
          percentage: (sp * 100) / era.get(`maxbase:${cur_chara}:气力`),
          type: 'progress',
        },
      ],
      { width: 18 },
    );
    let buffer = [];
    // 输出角色的各种参数
    era.get('paramkeys').forEach((key) => {
      const param = era.get(`param:${cur_chara}:${key}`),
        level = Math.min(get_param_level(param), 4);
      buffer.push(
        {
          config: { width: 2 },
          // paramkeys拿到的是参数变量序号的数组，所以需要用paramname来获取参数变量名
          content: era.get(`paramname:${key}`).toUpperCase(),
          type: 'text',
        },
        {
          config: {
            barWidth: 16,
            // get_gradient_color 是一个颜色渐变函数，它接受三个参数：
            // 第一个参数是起始颜色，第二个参数是结束颜色，第三个参数是比例
            // 比例是一个 0-1 的数字，它表示从起始颜色到结束颜色的渐变比例
            // 这个函数返回一个颜色字符串，它是起始颜色和结束颜色之间的渐变颜色
            color: get_gradient_color(
              progress_colors[0],
              progress_colors[1],
              level / 4,
            ),
            height: 20,
            width: 6,
          },
          // 按照参数等级输出进度条内的文字
          inContent:
            level >= 4
              ? Math.floor(param).toLocaleString()
              : `${Math.floor(param).toLocaleString()}/${param_level_borders[level].toLocaleString()}`,
          // 进度条外的文字输出参数等级
          outContent: `Lv.${level}`,
          percentage:
            level >= 4 ? 100 : (param * 100) / param_level_borders[level],
          type: 'progress',
        },
      );
    });
    era.printMultiColumns(buffer, { offset: 1, width: 23 });
    // 输出射精进度条，注意玩家的阴茎快感记录在参数[快C]里
    const ejac = era.get('param:0:快C');
    era.printMultiColumns(
      [
        { config: { width: 2 }, content: '射精', type: 'text' },
        {
          config: {
            color: get_gradient_color(
              progress_colors[0],
              progress_colors[1],
              ejac / 100,
            ),
            height: 20,
            width: 21,
          },
          inContent: `${ejac.toLocaleString()}/10,000`,
          percentage: ejac / 100,
          type: 'progress',
        },
      ],
      { width: 18 },
    );
    era.drawLine();
    buffer = [];
    // 取所有指令的枚举值数组，然后挨个输出为指令按钮
    Object.keys(action_enum.keys).forEach((a) =>
      buffer.push({
        accelerator: a,
        content: action_names[a],
        config: { width: 8 },
        type: 'button',
      }),
    );
    // 输出一个空行手动换行，将指令和功能按钮分隔开
    buffer.push({ content: [], type: 'text' });
    ['角色情报', '污垢情况'].forEach((e, i) =>
      buffer.push({
        accelerator: 100 + i,
        config: { width: 8 },
        content: e,
        type: 'button',
      }),
    );
    buffer.push({
      accelerator: 200,
      config: { width: 8 },
      content: '结束调教',
      type: 'button',
    });
    era.printMultiColumns(buffer, { offset: 2, width: 22 });
    const ret = await era.input();
    switch (ret) {
      case 100:
        // 显示角色情报
        break;
      case 101:
        // 显示污垢情况
        era.drawLine();
        era.getCharactersInTrain().forEach((e) =>
          // 只有玩家有肉棒，其他角色都是女性只有小穴
          ['手', e === 0 ? '棒' : '穴'].forEach((p) => {
            const buffer = [],
              stain = era.get(`stain:${e}:${p}`);
            buffer.push(era.get(`callname:${e}:-2`), ' 的 ', p, '：');
            // 挨个检查当前部位的污垢情况，然后输出
            // 一个部位可以有多种污垢，所以通过按位与&符号来检查相应二进制位是不是0，不为0则说明这个部位有这种污垢
            Object.values(stain_enum).forEach((s) => {
              if ((stain & s) > 0) {
                buffer.push(stain_names[s]);
              }
            });
            era.print(buffer);
          }),
        );
        await era.waitAnyKey();
        break;
      case 200:
        flag = false;
        break;
      default:
      // 执行调教指令
    }
  }
  // 结束调教，把 gotjewel 结算到 jewel 里然后删除所有调教相关的表
  era.endTrain();
}

module.exports = page_ero;
```

在上面的函数中，首先对调教系统进行初始化，调用 era.beginTrain 创建相应的表并创建属于玩家和角色的子表，设置玩家和角色的污垢情况。然后在交互循环中分别输出了 [逻辑梳理一节](#调教系统逻辑梳理) 中提及的三个主要区域。需要注意的是目前并未对指令进行条件检查，所以现在会输出所有调教指令。

底部的三个功能按钮中，角色情报并不专属于调教系统，因此实现在其他文件 `#/page/page-info.js` 中。污垢情况则分角色输出污垢情况，根据角色的性别对身体部位进行筛选，并使用 `#/data/stain-const.js` 中定义的枚举值按位检查污垢情况然后输出。最后是结束调教，跳出交互循环并调用 era.endTrain 完成 jewel 表的结算和调教相关表的删除。

修改 `#/page/homepage.js` 中【开始调教】按钮的绑定动作，然后开始新游戏，点击【开始调教】，显示如下界面：

![调教界面](../imgs/95-调教界面.png)

为实现角色情报功能，创建 `#/page/page-info.js`，输入如下内容：

```javascript
// #/page/page-info.js
const era = require('#/era-electron');

/**
 * 角色情报界面
 *
 * @param id 角色的ID
 */
async function page_info(id) {
  const buffer = [],
    hp = era.get(`base:${id}:体力`),
    sp = era.get(`base:${id}:气力`),
    max_hp = era.get(`maxbase:${id}:体力`),
    max_sp = era.get(`maxbase:${id}:气力`);
  // 输出角色的名字和体力气力进度条
  buffer.push(
    {
      // 这里将角色的名字输出在分割线上
      config: { content: era.get(`callname:${id}:-1`), position: 'left' },
      type: 'divider',
    },
    { content: '体力', config: { width: 2 }, type: 'text' },
    {
      config: {
        color: '#009300',
        height: 20,
        width: 9,
      },
      inContent: `${Math.floor(hp).toLocaleString()}/${Math.floor(max_hp).toLocaleString()}`,
      percentage: (hp * 100) / max_hp,
      type: 'progress',
    },
    { content: '气力', config: { offset: 1, width: 2 }, type: 'text' },
    {
      config: {
        color: '#6b6bff',
        height: 20,
        width: 9,
      },
      inContent: `${Math.floor(sp).toLocaleString()}/${Math.floor(max_sp).toLocaleString()}`,
      percentage: (sp * 100) / max_sp,
      type: 'progress',
    },
  );
  // 遍历所有素质并输出
  buffer.push(
    {
      config: { content: '素质', position: 'left' },
      type: 'divider',
    },
    {
      content: era
        .get(`talentkeys`)
        .map((e) => {
          const val = era.get(`talent:${id}:${e}`);
          if (val === 0) {
            return '';
          }
          // 因为C敏感/钝感和V敏感/钝感是各用一个变量保存的，所以要分情况讨论
          switch (e) {
            case 0:
              return '[处女]';
            case 1:
              return `[C${val > 0 ? '敏感' : '钝感'}]`;
            case 2:
              return `[V${val > 0 ? '敏感' : '钝感'}]`;
          }
        })
        .join(''),
      type: 'text',
    },
  );
  // 遍历所有宝珠并输出宝珠数量
  buffer.push({ config: { content: '珠', position: 'left' }, type: 'divider' });
  era
    .get(`jewelkeys`)
    // 筛掉润滑，因为没有润滑之珠
    .filter((k) => k !== 2)
    .forEach((k) =>
      buffer.push({
        config: { width: 6 },
        content: [
          // 注意EraElectron在读取变量名后会保存为小写模式（以支持大小写兼容）
          // 用 String.toUpperCase 转全大写
          era.get(`jewelname:${k}`).toUpperCase(),
          '：',
          era.get(`jewel:${id}:${k}`).toLocaleString(),
        ],
        type: 'text',
      }),
    );
  // 遍历所有经验并输出
  buffer.push({
    config: { content: '经验', position: 'left' },
    type: 'divider',
  });
  era.get(`expkeys`).forEach((k) =>
    buffer.push({
      config: { width: 6 },
      content: [
        era.get(`expname:${k}`).toUpperCase(),
        '：',
        era.get(`exp:${id}:${k}`).toLocaleString(),
      ],
      type: 'text',
    }),
  );
  // 遍历所有刻印并输出
  buffer.push({
    config: { content: '刻印', position: 'left' },
    type: 'divider',
  });
  era.get(`markkeys`).forEach((k) =>
    buffer.push({
      config: { width: 6 },
      content: [
        era.get(`markname:${k}`).toUpperCase(),
        '刻印：',
        era.get(`mark:${id}:${k}`).toLocaleString(),
      ],
      type: 'text',
    }),
  );
  // 遍历所有能力并输出
  buffer.push({
    config: { content: '能力', position: 'left' },
    type: 'divider',
  });
  era.get(`ablkeys`).forEach((k) =>
    buffer.push({
      config: { width: 6 },
      content: [
        era.get(`ablname:${k}`).toUpperCase(),
        '：',
        era.get(`abl:${id}:${k}`).toLocaleString(),
      ],
      type: 'text',
    }),
  );
  era.printMultiColumns(buffer, { width: 18 });
  await era.waitAnyKey();
}

module.exports = page_info;
```

情报界面的逻辑比较简单，以角色体力气力、素质、宝珠、经验、刻印和能力的顺序遍历输出，然后等待用户输入再返回即可。需要注意的是素质和宝珠，素质仅在相关变量不为0的情况下输出（0表示没有相关的素质），宝珠需要筛除润滑变量（因为没有润滑之珠）。

修改调教界面互动逻辑的相应入口后，调教界面除指令和相关处理外的所有内容就开发完毕了。

# 指令与口上

指令及处理是调教系统的核心部分，在流程上分为执行前的条件检查和实行值检查、指令口上输出和指令结算。

## 指令条件

本章实现的调教系统中共设计了6个指令，其中[刺激G点]、[媚药]和[润滑]有使用条件，需要在 `#/page/page-ero.js` 中输出指令按钮前检查是否可以使用它们。在 `#/data/ero/action-const.js` 中新定义一个 Record 声明这些指令的条件检查函数，并以对象属性的形式导出：

```javascript
// #/data/ero/action-const.js
const era = require('#/era-electron');

const { get_param_level } = require('#/data/ero/param-const');
// ...
/**
 * 调教指令的条件检查函数<br>
 * 如果返回false，则指令无效<br>
 * 条件检查函数的参数是 number 类型的调教对象ID，可以按照需求增补调教者的ID
 *
 * @type {Record<string,function(number):boolean|void>}
 */
const action_checks = {};

// 刺激G点：之前进行过正常位或刺激G点
action_checks[actions.stimulate_g_spot] = () =>
  era.get('tflag:前回行动') === actions.missionary ||
  era.get('tflag:前回行动') === actions.stimulate_g_spot;
// 媚药：没有服用过媚药并且有媚药
action_checks[actions.poison] = (target) =>
  era.get(`tequip:${target}:媚药`) === 0 && era.get('item:媚药') > 0;
// 润滑：润滑不足并且有润滑液
action_checks[actions.lubricant] = (target) =>
  get_param_level(era.get(`param:${target}:润滑`)) < 3 &&
  era.get('item:润滑液') > 0;

module.exports = { action_checks, action_enum: actions, action_names };
```

然后就可以给 `#/page/page-ero.js` 的指令输出部分加上条件筛选了：

```javascript
// #/page/page-ero.js
// ...
// 取所有指令的枚举值数组，然后挨个输出为指令按钮
Object.keys(action_enum.keys)
  // 条件检查：没有条件限制的指令，或条件检查函数返回 true 的指令才会被输出
  .filter((e) => !action_checks[e] || action_checks[e](cur_chara))
  .forEach((a) =>
    buffer.push({
      accelerator: a,
      content: action_names[a],
      config: { width: 8 },
      type: 'button',
    }),
  );
// ...
```

如[爱抚]、[要求自慰]和[正常位]等指令没有条件检查，直接调用 `action_checks[e](cur_chara)` 会报错，因此通过 `!action_checks[e]` 检测。在 JavaScript 中，表达式 `!action_checks[e] || action_checks[e](cur_chara)` 如果 `!action_checks[e]` 为 `true` 会直接返回 `true`，否则才会执行 `action_checks[e](cur_chara)` 并返回其结果，因此可以满足无限制或通过检查的指令才会被输出的要求。

## 指令口上与实行值检查

在点击指令按钮后，交互循环就会输出指令口上，也就是说需要一个属于调教指令的口上系统。笔者将实行值检查也实现在口上中，这样可以支持某些角色跳过实行值检查，实现较高的定制化程度。因此本节首先要实现一个属于指令口上的系统。大概来说，笔者实现了一个 [#14 口上系统实现](./14-lines#通用处理) 中方法二和方法三结合的口上系统，基于方法三的框架结合口上输出和指令结算，然后基于方法二的框架输出实行值检查成功或失败的口上以支持在角色口上中跳过实行值检查。

首先将 `#/event` 下新建一个 lines 文件夹，将原来的 `lines-*.js` 文件拖进去（其他文件里 require 的路径也要相应修改，如果用 WebStorm 等 IDE 可以交给 IDE 帮忙）；然后创建 ero 文件夹，并创建以下文件：

```javascript
// #/data/event/check-object.js
// 用于实行值检查的参数类
class CheckObject {
  /**
   * 指令的实行值检查输出内容缓冲区
   *
   * @type {string[]}
   */
  buffer;
  /**
   * 执行指令的实行值
   *
   * @type {number}
   */
  check;
  /**
   * 执行指令所需的实行值
   *
   * @type {number}
   */
  border = 0;

  /**
   * @param {string[]} buffer
   * @param {number} check
   */
  constructor(buffer, check) {
    this.buffer = buffer;
    this.check = check;
  }
}

module.exports = CheckObject;
```

```javascript
// #/sys/sys-check-action.js
const era = require('#/era-electron');

const { get_param_level } = require('#/data/ero/param-const');

/**
 * 实行值检查的工具函数包
 */
module.exports = {
  /**
   * @param {string[]} buffer 输出缓冲区
   * @param {number} target 调教对象的ID
   * @param {string} abl 能力名称
   * @param {number} times 实行值的倍率，该能力带来的实行值会是等级*倍率
   */
  add_abl_check(buffer, target, abl, times) {
    const level = era.get(`abl:${target}:${abl}`),
      check = level * times;
    if (check !== 0) {
      buffer.push(
        buffer.length > 0 ? ' + ' : '',
        check.toString(),
        ' (能力 [',
        abl.toUpperCase(),
        '] Lv.',
        level.toString(),
        ')',
      );
    }
    return check;
  },
  /**
   * @param {string[]} buffer 输出缓冲区
   * @param {number} target 调教对象的ID
   * @param {string} mark 刻印名称
   * @param {number} times 实行值的倍率，该刻印带来的实行值会是等级*倍率
   */
  add_mark_check(buffer, target, mark, times) {
    const level = era.get(`mark:${target}:${mark}`),
      check = level * times;
    if (check !== 0) {
      buffer.push(
        check < 0 ? ' - ' : buffer.length > 0 ? ' + ' : '',
        // Math.abs：取绝对值
        // 正负号在前面处理，所以这里只需要取绝对值
        Math.abs(check).toString(),
        ' (刻印 [',
        mark.toUpperCase(),
        '] Lv.',
        level.toString(),
        ')',
      );
    }
    return check;
  },
  /**
   * @param {string[]} buffer 输出缓冲区
   * @param {number} target 调教对象的ID
   * @param {string} param 参数名称
   * @param {number} times 实行值的倍率，该参数带来的实行值会是等级*倍率
   */
  add_param_check(buffer, target, param, times) {
    const level = Math.min(
        get_param_level(era.get(`param:${target}:${param}`)),
        5,
      ),
      check = level * times;
    if (check !== 0) {
      buffer.push(
        check < 0 ? ' - ' : buffer.length > 0 ? ' + ' : '',
        Math.abs(check).toString(),
        ' (参数 [',
        param.toUpperCase(),
        '] Lv.',
        level.toString(),
        ')',
      );
    }
    return check;
  },
  /**
   * @param {string[]} buffer 输出缓冲区
   * @param {number} target 调教对象的ID
   * @param {string} talent 素质名称
   * @param {number} times 该素质带来的实行值
   */
  add_talent_check(buffer, target, talent, times) {
    const level = era.get(`talent:${target}:${talent}`),
      check = level * times;
    if (check !== 0) {
      let name;
      switch (talent) {
        case 'C感觉':
          name = level === 1 ? 'C敏感' : 'C钝感';
          break;
        case 'V感觉':
          name = level === 1 ? 'V敏感' : 'V钝感';
          break;
        default:
          name = talent.toUpperCase();
      }
      buffer.push(
        check < 0 ? ' - ' : buffer.length > 0 ? ' + ' : '',
        Math.abs(check).toString(),
        ' (素质 [',
        name,
        '])',
      );
    }
    return check;
  },
  /**
   * @param {string[]} buffer 输出缓冲区
   * @param {number} target 调教对象的ID
   * @param {string} tequip 调教装备名称
   * @param {number} times 该调教装备带来的实行值
   */
  add_tequip_check(buffer, target, tequip, times) {
    const level = era.get(`tequip:${target}:${tequip}`),
      check = level * times;
    if (check !== 0) {
      buffer.push(
        buffer.length > 0 ? ' + ' : '',
        check.toString(),
        ' (',
        tequip.toUpperCase(),
        ')',
      );
    }
    return check;
  },
};
```

```javascript
// #/event/ero/ero-common.js
const era = require('#/era-electron');

const {
  add_abl_check,
  add_param_check,
  add_talent_check,
} = require('#/sys/sys-check-action');

/**
 * 角色调教指令口上的基类，主要实现地文
 */
class CustomizedEro {
  // ...
  // 和 CustomizedLines 一样的类实例属性和构造函数声明
  // ...
  /**
   * 爱抚的地文，无实行值检查
   *
   * @param {LineArg} arg
   */
  // eslint-disable-next-line no-unused-vars
  async pet(arg) {
    await era.printAndWait([
      era.get('callname:0:-2'),
      ' 爱抚着 ',
      this.callname,
      '……',
    ]);
  }

  /**
   * 要求自慰的地文，有实行值检查
   *
   * @param {LineArg} arg
   * @param {CheckObject} check
   */
  async masturbate(arg, check) {
    // 要求自慰指令独有的实行值检查内容
    check.check += add_param_check(check.buffer, this.id, '快C', 1);
    check.check += add_talent_check(check.buffer, this.id, 'C感觉', 2);
    check.check += add_abl_check(check.buffer, this.id, 'C感觉', 3);
    // 执行指令所需的实行值
    check.border = 30;
    check.buffer.push(
      check.buffer.length > 0 ? ' = ' : '',
      check.check.toString(),
    );
    const success = check.check - check.border;
    if (success > 0) {
      check.buffer.push(' > ');
    } else if (success === 0) {
      check.buffer.push(' = ');
    } else {
      check.buffer.push(' < ');
    }
    check.buffer.push(check.border.toString(), ' (实行值)');
    // 输出实行值检查的结果
    await era.printAndWait(check.buffer.join(''), { fontSize: '0.75rem' });
    // 如果未通过检查，设置 arg.result 为 false 跳过后续的通用处理
    if (success < 0) {
      arg.result = false;
      await this.masturbate_reject();
      return;
    }
    // 否则输出同意的地文然后继续
    await this.masturbate_agree();
  }

  /**
   * 要求自慰 - 同意的地文
   */
  async masturbate_agree() {
    await era.printAndWait([
      '在 ',
      era.get('callname:0:-2'),
      ' 的要求下，',
      this.callname,
      ' 开始自慰……',
    ]);
  }

  /**
   * 要求自慰 - 拒绝的地文
   */
  async masturbate_reject() {
    await era.printAndWait([this.callname, ' 拒绝了自慰要求……']);
  }

  /**
   * 正常位的地文，无实行值检查
   *
   * @param {LineArg} arg
   */
  // eslint-disable-next-line no-unused-vars
  async missionary(arg) {
    await era.printAndWait([
      era.get('callname:0:-2'),
      ' 以正常位抽插着 ',
      this.callname,
      ' 的小穴……',
    ]);
  }

  /**
   * 刺激G点的地文，无实行值检查
   *
   * @param {LineArg} arg
   */
  // eslint-disable-next-line no-unused-vars
  async stimulate_g_spot(arg) {
    await era.printAndWait([
      era.get('callname:0:-2'),
      ' 用肉棒深入刺激着 ',
      this.callname,
      ' 的G点……',
    ]);
  }

  /**
   * 媚药的地文，无实行值检查
   *
   * @param {LineArg} arg
   */
  // eslint-disable-next-line no-unused-vars
  async poison(arg) {
    await era.printAndWait([
      era.get('callname:0:-2'),
      ' 给 ',
      this.callname,
      ' 喂食了媚药……',
    ]);
  }

  /**
   * 润滑的地文，无实行值检查
   *
   * @param {LineArg} arg
   */
  // eslint-disable-next-line no-unused-vars
  async lubricant(arg) {
    await era.printAndWait([
      era.get('callname:0:-2'),
      ' 使用润滑液打湿了 ',
      this.callname,
      ' 的小穴……',
    ]);
  }
}

module.exports = CustomizedEro;
```

```javascript
// #/event/ero/ero-factory.js
const CustomizedEro = require('#/event/ero/ero-common');

const { action_enum } = require('#/data/ero/action-const');
const LineArg = require('#/data/event/line-arg');

const cons_dict = {};

const obj_dict = {};

/**
 * 放置所有调教指令通用处理的 Record 对象，key是指令的枚举值，value是处理函数<br>
 * 函数的第一参数是角色的ID，第二参数是实行值检查对象（以应对根据实行值增减来源的情况）<br>
 * 设置为异步函数以处理需要等待的情况
 *
 * @type {Record<string,function(number,CheckObject):Promise>}
 */
const result_handlers = {};

/**
 * 通用入口函数之一，返回角色ID对应的实例化继承类，或者实例化的基类<br>
 * 因为 run_custom_ero 也要用到，所以这里提取出来在前面定义，然后在对象里用函数名声明为导出对象的属性
 *
 * @param {number} id 角色的ID
 * @returns {CustomizedEro}
 */
function get_custom_ero(id) {
  if (!obj_dict[id]) {
    obj_dict[id] = new (cons_dict[id] || CustomizedEro)(id);
  }
  return obj_dict[id].get_this();
}

module.exports = {
  get_custom_ero,
  /**
   * 通用入口函数之二，会根据指令的枚举值直接调用角色对象中的相应指令方法，
   * 并且根据 arg.result 决定是否要执行通用处理
   *
   * @param {number} id 角色的ID
   * @param {number} action 指令的枚举值
   * @param {CheckObject} check 指令实行值的检查对象
   * @returns {boolean|void} 供调教界面用的返回值，返回 true 的情况下需要结算
   */
  async run_custom_ero(id, action, check) {
    const obj = get_custom_ero(id),
      func = action_enum.keys[action],
      arg = new LineArg();
    // 在存在实行值检查的情况下，口上方法调用有两种情况：
    // 一种是进行实行值检查，在通过后调用通用处理并通知 #/page/page-ero.js 进行结算，不通过则设置 arg.result 不执行通用处理
    // 另一种是通过重载跳过了实行值检查，此时需要手动在口上方法最后返回 true，通知 #/page/page-ero.js 进行结算
    const ret = await obj[func].call(obj, arg, check);
    if (arg.result && result_handlers[action] !== undefined) {
      await result_handlers[action](id, check);
      return true;
    }
    return ret;
  },
};
```

然后修改 `#/page/page-ero.js`：

```javascript
// ...
default:
  // 执行调教指令
  era.drawLine();
  era.print(['【', action_names[ret], '】']);
  // 计算共通的实行值
  temp = new CheckObject([], 0);
  temp.check += add_param_check(temp.buffer, cur_chara, '欲望', 5);
  temp.check += add_param_check(temp.buffer, cur_chara, '痛苦', -2);
  temp.check += add_tequip_check(temp.buffer, cur_chara, '媚药', 5);
  temp.check += add_mark_check(temp.buffer, cur_chara, '苦痛', 3);
  temp.check += add_mark_check(temp.buffer, cur_chara, '反抗', -2);
  temp.check += add_talent_check(temp.buffer, cur_chara, '处女', -2);
  temp.check += add_abl_check(temp.buffer, cur_chara, '欲望', 1);
  if (await run_custom_ero(cur_chara, ret, temp)) {
    // 指令结算
  }
// ...
```

这样在点击指令按钮后，系统会先输出指令名，计算对所有指令的实行值而言共通的检查，然后将实行值检查对象作为参数之一调用 run_custom_ero。

指令特定的实行值检查在口上对象的实例方法内进行，例如 CustomizedEro.masturbate 会检查参数[快C]、素质[C感觉]和能力[C感觉]对实行值的影响，然后将整个计算公式输出。如果实行值检查不通过，则将 arg.result 设置为 false 以取消后续的执行流程，并调用 CustomizedEro.masturbate_reject 输出拒绝的口上/地文；如果通过，则调用 CustomizedEro.masturbate_agree 输出同意的口上/地文。角色的调教指令口上中可以只重载 CustomizedEro.masturbate_agree 和 CustomizedEro.masturbate_reject，即只修改文本，也可以通过重载 CustomizedEro.masturbate 对实行值进行调整或者跳过，例如为小青创建调教指令口上类 `#/event/ero/ero-2.js`：

```javascript
// #/event/ero/ero-2.js
const CustomizedEro = require('#/event/ero/ero-common');

/**
 * 小青的调教指令口上
 */
module.exports = class extends CustomizedEro {
  /**
   * 小青的要求自慰指令地文，通过重载跳过了实行值检查<br>
   * 也就是说要求小青自慰的指令将永远成功
   */
  async masturbate() {
    await this.masturbate_agree();
  }
};
```

在引擎中加载游戏，进入新游戏后分别以小红和小青为对象进入调教并点击[要求自慰]，结果如下：

![小红自慰](../imgs/96-小红自慰.png)

![小青自慰](../imgs/97-小青自慰.png)

可以看到小青的【要求自慰】指令的实行值检查被跳过了。

实行值检查部分的要点在于工具类 `#/sys/sys-check-action.js`，声明了一个含有5个函数属性的对象，分别检查能力、刻印、参数、素质和调教装备变量对实行值的影响，将影响值写入缓冲区等待最后在指令口上实例方法中输出，并返回该项变量对实行值数值的影响。在调用这些工具函数的位置，则通过加法赋值运算符（+=）累加到实行值检查对象的实行值中。这五个工具函数本质上是对单项实行值检查过程的封装，通过提取共通计算部分并封装为函数能够简化代码，提高可读性和可维护性。

## 指令结算

点击指令按钮、检查实行值并输出口上后，就到了指令的结算阶段。指令结算阶段分为以下过程和子过程：

* 指令专属的效果结算，例如：
    * [爱抚]提高角色的来源[快C]和[欲望]并增加经验[C经验]；
    * [正常位]提高玩家的参数[快C]并可能诱发高潮[C高潮]（射精）并提高角色的来源[快V]
    * [润滑]提高角色的来源[液体]和[反感]并消耗道具[润滑液]等；
* 指令共通的效果结算：
    * 来源结算：更新 source 表并输出；
    * 高潮相关的参数结算：更新高潮相关参数的 delta 表；
    * 高潮结算：更新 nowex 表与其他来源的 source 表，包括体力等基础资源的变化；
    * 其他参数结算：更新其他参数的 delta 表；
    * 基础资源结算：更新 base 表；
    * 刻印结算：根据 delta 表，更新 mark 表，并输出刻印变化；
    * 参数结算：输出参数变化，调用 era.nextTurnInTrain（清空 source 表并将 delta 表和 nowex 表结算到 param 表和 ex 表中）。

### 指令专属的效果结算

新建或修改以下文件：

```javascript
// #/event/ero/ero-result.js
const era = require('#/era-electron');

const { action_enum } = require('#/data/ero/action-const');
const { get_param_level } = require('#/data/ero/param-const');
const { stain_enum } = require('#/data/ero/stain-const');

/**
 * 增加调教者的快C<br>
 * 直接结算到 param 表中，不经过 source 结算
 *
 * @param {number} target
 */
function add_trainer_ejaculation(target) {
  let param = 1500;
  param *= 1 + 0.1 * era.get(`abl:${target}:欲望`);
  param *=
    0.4 + 0.3 * Math.min(get_param_level(era.get(`param:${target}:润滑`)), 4);
  param *= 1 + 0.5 * era.get('abl:0:C感觉');
  era.add('param:0:快C', param);
}

/**
 * 计算调教者的射精并结算角色的污垢和润滑
 *
 * @param {number} target
 */
function check_trainer_ejaculation(target) {
  const param = era.get('param:0:快C');
  if (param >= 20000) {
    era.print('大量射精');
    era.set('nowex:0:C高潮', 2);
    era.set('param:0:快C', Math.min(param - 20000, 9999));
    era.add(`source:${target}:润滑`, 1000);
  } else if (param >= 10000) {
    era.print('射精');
    era.set('nowex:0:C高潮', 1);
    era.set('param:0:快C', Math.min(param - 10000, 9999));
    era.add(`source:${target}:润滑`, 500);
  }
  if (era.get('nowex:0:C高潮')) {
    era.set('stain:0:棒', era.get('stain:0:棒') | stain_enum.semen);
  }
}

/**
 * 调教指令通用处理函数的注册函数
 *
 * @param {Record<string,function(number):Promise>} handlers
 */
module.exports = (handlers) => {
  handlers[action_enum.pet] = async (target) => {
    era.set(`nowex:${target}:体力消耗`, 5);
    era.set(`nowex:${target}:气力消耗`, 50);
    era.set(`source:${target}:快C`, 20);
    era.set(`source:${target}:欲望`, 50);
    era.add(`exp:${target}:C经验`, 1);
    era.print('C经验+1');
    let stain = era.get('stain:0:手') | era.get(`stain:${target}:穴`);
    era.set('stain:0:手', stain);
    era.set(`stain:${target}:穴`, stain);
  };
  handlers[action_enum.masturbate] = async (target) => {
    era.set(`nowex:${target}:体力消耗`, 5);
    era.set(`nowex:${target}:气力消耗`, 50);
    era.set(`source:${target}:快C`, 20);
    era.set(`source:${target}:欲望`, 20);
    era.add(`exp:${target}:C经验`, 1);
    era.print('C经验+1');
    const level = get_param_level(era.get(`param:${target}:润滑`));
    if (level < 3) {
      era.set(`source:${target}:反感`, 500 * (3 - level));
    }
    let stain = era.get(`stain:${target}:手`) | era.get(`stain:${target}:穴`);
    era.set(`stain:${target}:手`, stain);
    era.set(`stain:${target}:穴`, stain);
  };
  handlers[action_enum.missionary] = async (target) => {
    add_trainer_ejaculation(target);
    era.set(`nowex:${target}:体力消耗`, 50);
    era.set(`nowex:${target}:气力消耗`, 100);
    era.set(`source:${target}:快V`, 50);
    era.set(`source:${target}:欲望`, 20);
    const level = get_param_level(era.get(`param:${target}:润滑`));
    if (level < 3) {
      era.set(`source:${target}:痛觉`, 1000 * (3 - level));
    }
    // 破处痛，并放大痛觉
    if (era.get(`talent:${target}:处女`) === 1) {
      era.add(`source:${target}:痛觉`, 200);
      era.set(`source:${target}:痛觉`, era.get(`source:${target}:痛觉`) * 1.2);
    }
    era.add(`exp:${target}:V经验`, 1);
    era.print('V经验+1');
    check_trainer_ejaculation(target);
    let stain = era.get('stain:0:棒') | era.get(`stain:${target}:穴`);
    era.set('stain:0:棒', stain);
    era.set(`stain:${target}:穴`, stain);
  };
  handlers[action_enum.stimulate_g_spot] = async (target) => {
    add_trainer_ejaculation(target);
    era.set(`nowex:${target}:体力消耗`, 100);
    era.set(`nowex:${target}:气力消耗`, 200);
    era.set(`source:${target}:快V`, 60);
    era.set(`source:${target}:欲望`, 30);
    const level = get_param_level(era.get(`param:${target}:润滑`));
    if (level < 3) {
      era.set(`source:${target}:痛觉`, 1500 * (3 - level));
    }
    era.add(`exp:${target}:V经验`, 2);
    era.print('V经验+2');
    check_trainer_ejaculation(target);
    let stain = era.get('stain:0:棒') | era.get(`stain:${target}:穴`);
    era.set('stain:0:棒', stain);
    era.set(`stain:${target}:穴`, stain);
  };
  handlers[action_enum.poison] = async (target) => {
    era.set(`nowex:${target}:体力消耗`, 300);
    era.set(`nowex:${target}:气力消耗`, 300);
    era.add(`source:${target}:欲望`, 5000);
    era.set(`source:${target}:反感`, 2000);
    era.set(`tequip:${target}:媚药`, 1);
    era.add(`item:${target}:媚药`, -1);
  };
  handlers[action_enum.lubricant] = async (target) => {
    era.set(`source:${target}:液体`, 10000);
    era.set(`source:${target}:反感`, 300);
    era.add(`item:${target}:润滑液`, -1);
  };
};
```

```javascript
// #/event/ero/ero-factory.js
// ...
const result_handlers = {};

// 将放所有调教指令通用处理的 Record 对象作为参数传给注册函数<br>
// 注册函数会构造相应调教指令通用处理的函数对象并赋值给 Record
require('#/event/ero/ero-result')(result_handlers);
// ...
```

可以看到 `#/event/ero/ero-result.js` 中构造的函数对象基本就是 [前文](#调教系统设计) 设计的调教指令的实现。关键点在于[正常位]和[刺激G点]中对调教者射精的处理，调教者的射精条（参数[快C]）会在最开始跳过 source 表和 delta 表直接结算到 param 表中，然后射精的检查则是在调教对象的经验情报输出后、污垢情况更新前结算，通过逻辑分离实现有组织的内容输出。

### 指令共通的效果结算

修改 `#/page/page-ero.js`：

```javascript
// #/page/page-ero.js
// ...
/**
 * 检查角色的 source 并输出
 *
 * @param {number} target
 */
function show_source(target) {
  const buffer = era
    .get('sourcekeys')
    .filter((e) => era.get(`source:${target}:${e}`) > 0)
    .map(
      (e) =>
        `${era.get(`sourcename:${e}`).toUpperCase()} (${Math.floor(era.get(`source:${target}:${e}`)).toLocaleString()})`,
    );
  if (buffer.length > 0) {
    era.println();
    era.print(['来源：', buffer.join(' ')]);
  }
}

/**
 * 检查角色的参数变化并输出
 *
 * @param {number} target
 */
function show_delta(target) {
  const buffer = era
    .get('paramkeys')
    .filter((e) => era.get(`delta:${target}:${e}`) !== 0);
  if (buffer.length > 0) {
    era.println();
    era.print('参数：');
    buffer.forEach((e) => {
      const param = era.get(`param:${target}:${e}`),
        delta = era.get(`delta:${target}:${e}`);
      era.print([
        era.get(`paramname:${e}`).toUpperCase(),
        ' ',
        Math.floor(param).toLocaleString(),
        delta > 0 ? '+' : '',
        Math.floor(delta).toLocaleString(),
        '=',
        Math.floor(param + delta).toLocaleString(),
      ]);
    });
  }
}
// ...
// 指令共通的效果结算
era.println();
const line_object = get_custom_ero(cur_chara);

// 处女丧失处理
if (
  era.get(`talent:${cur_chara}:处女`) === 1 &&
  era.get(`exp:${cur_chara}:V经验`) > 0
) {
  await era.printAndWait('处女丧失');
  await line_object.not_virgin();
  era.set(`talent:${cur_chara}:处女`, 0);
}

// 1. 来源结算
// 快C
let s_clitoris = era.get(`source:${cur_chara}:快C`);
// 能力[C感觉]的效果：快C乘以2的2倍[C感觉]等级的次方
// << 是左移运算符，它的作用是将一个数的二进制位向左移动指定的位数，在数值上就是乘2的相应位数的次方
s_clitoris = s_clitoris << (2 * era.get(`abl:${cur_chara}:C感觉`));
// 素质[C感觉]的结算，1是敏感，-1是钝感，通过乘0.5实现+-50%
s_clitoris *= 1 + 0.5 * era.get(`talent:${cur_chara}:C感觉`);
era.set(`source:${cur_chara}:快C`, s_clitoris);

// 快V
let s_vagina = era.get(`source:${cur_chara}:快V`);
// 能力[V感觉]的效果类似[C感觉]
s_vagina = s_vagina << (2 * era.get(`abl:${cur_chara}:V感觉`));
// 素质[V感觉]的效果类似[V感觉]
s_vagina *= 1 + 0.5 * era.get(`talent:${cur_chara}:V感觉`);
era.set(`source:${cur_chara}:快V`, s_vagina);

// 欲望
let s_lust = era.get(`source:${cur_chara}:欲望`);
// 能力[欲望]的效果：快C乘以2的[欲望]等级的次方
s_lust = s_lust << era.get(`abl:${cur_chara}:欲望`);
// 参数[润滑]微幅增加来源[欲望]获取
let l_lubricant = get_param_level(era.get(`param:${cur_chara}:润滑`));
if (l_lubricant >= 3) {
  s_lust *= 1 + 0.1 * Math.min(l_lubricant - 2, 3);
}
era.set(`source:${cur_chara}:欲望`, s_lust);

// 痛觉
let s_pain = era.get(`source:${cur_chara}:痛觉`);
// 参数[欲望]减少来源[痛觉]获取
let l_lust = Math.min(
  get_param_level(era.get(`param:${cur_chara}:欲望`)),
  4,
);
s_pain *= 1 - 0.1 * l_lust;
era.set(`source:${cur_chara}:痛觉`, s_pain);

// 反感
let s_hate = era.get(`source:${cur_chara}:反感`);
s_hate += s_pain / 5;
s_hate *= 1 - 0.1 * l_lust;
era.set(`source:${cur_chara}:反感`, s_hate);

// 输出来源变化
show_source(cur_chara);

// 2. 高潮相关的参数结算
// 快C
let p_clitoris =
  era.get(`param:${cur_chara}:快C`) +
  era.add(`delta:${cur_chara}:快C`, s_clitoris);
era.add(`delta:${cur_chara}:欲望`, s_clitoris / 20);
// 快V
let p_vagina =
  era.get(`param:${cur_chara}:快V`) +
  era.add(`delta:${cur_chara}:快V`, s_vagina);
era.add(`delta:${cur_chara}:欲望`, s_vagina / 10);
// 爱液渗出
let s_liquid = era.add(
  `source:${cur_chara}:液体`,
  era.get(`delta:${cur_chara}:快C`) +
    era.get(`delta:${cur_chara}:快V`),
);

// 3. 高潮结算
let e_clitoris;
if ((e_clitoris = Math.min(Math.floor(p_clitoris / 10000), 2)) > 0) {
  era.print(['C高潮', '强烈C高潮'][e_clitoris - 1]);
  era.set(
    `delta:${cur_chara}:快C`,
    1000 - era.get(`param:${cur_chara}:快C`),
  );
}
let e_vagina;
if ((e_vagina = Math.min(Math.floor(p_vagina / 10000), 2)) > 0) {
  era.print(['V高潮', '强烈V高潮'][e_clitoris - 1]);
  era.set(
    `delta:${cur_chara}:快V`,
    1000 - era.get(`param:${cur_chara}:快V`),
  );
}
if (e_clitoris > 0 && e_vagina > 0) {
  era.print(['C & V高潮', { isBr: true }, '（获得 2 倍的宝珠）']);
  e_clitoris *= 2;
  e_vagina *= 2;
}
era.set(`nowex:${cur_chara}:C高潮`, e_clitoris);
era.set(`nowex:${cur_chara}:V高潮`, e_vagina);
if (e_clitoris > 0) {
  era.add(`nowex:${cur_chara}:体力消耗`, 20);
  era.add(`nowex:${cur_chara}:体力消耗`, 10);
}
if (e_vagina > 0) {
  era.add(`nowex:${cur_chara}:体力消耗`, 40);
  era.add(`nowex:${cur_chara}:体力消耗`, 20);
}

// 4. 其他参数结算
// 液体
era.add(`delta:${cur_chara}:润滑`, s_liquid);
// 欲望
era.add(`delta:${cur_chara}:欲望`, s_lust);
// 痛苦
let d_pain = era.add(`delta:${cur_chara}:痛苦`, s_pain);
// 否定
let d_deny = era.add(`delta:${cur_chara}:否定`, s_hate);
if (era.get('tflag:前回行动') === ret) {
  era.print('<同一命令连续执行>');
  era.set(
    `delta:${cur_chara}:欲望`,
    era.get(`delta:${cur_chara}:欲望`) / 2,
  );
}

// 5. 基础资源结算
if (era.get(`base:${cur_chara}:气力`) === 0) {
  era.print('★气力0★');
  era.set(
    `delta:${cur_chara}:润滑`,
    era.get(`delta:${cur_chara}:润滑`) / 2,
  );
  era.set(
    `delta:${cur_chara}:欲望`,
    era.get(`delta:${cur_chara}:欲望`) / 2,
  );
  d_pain = era.set(
    `delta:${cur_chara}:痛苦`,
    era.get(`delta:${cur_chara}:痛苦`) / 2,
  );
  era.set(
    `nowex:${cur_chara}:体力消耗`,
    era.get(`nowex:${cur_chara}:体力消耗`) * 2 + 80,
  );
  era.set(`nowex:${cur_chara}:气力消耗`, 0);
}

let hp_down = era.add(
    `nowex:${cur_chara}:体力消耗`,
    (d_pain * 9) / 16,
  ),
  sp_down = era.add(`nowex:${cur_chara}:气力消耗`, (d_pain * 9) / 16);
era.add(`base:${cur_chara}:体力`, -hp_down);
era.add(`base:${cur_chara}:气力`, -sp_down);
era.print([
  '体力-',
  Math.floor(hp_down).toLocaleString(),
  ' 气力-',
  Math.floor(sp_down).toLocaleString(),
]);

// 6. 刻印结算
// 反抗
let old_hate = era.get(`mark:${cur_chara}:反抗`),
  new_hate = old_hate;
if (d_deny >= 500 && d_deny < 1200 && old_hate === 0) {
  new_hate = era.set(`mark:${cur_chara}:反抗`, 1);
  era.print(['取得了 反抗刻印 Lv.1']);
} else if (d_deny >= 1200 && d_deny < 3000 && old_hate <= 1) {
  new_hate = era.set(`mark:${cur_chara}:反抗`, 2);
  era.print(['取得了 反抗刻印 Lv.2']);
} else if (d_deny >= 3000 && old_hate <= 2) {
  new_hate = era.set(`mark:${cur_chara}:反抗`, 3);
  era.print(['取得了 反抗刻印 Lv.3']);
}
if (new_hate > old_hate) {
  await line_object.get_hate_mark(old_hate, new_hate);
}
// 苦痛
let old_pain = era.get(`mark:${cur_chara}:苦痛`),
  new_pain = old_pain;
if (d_pain >= 500 && d_pain < 1200 && old_pain === 0) {
  new_pain = era.set(`mark:${cur_chara}:苦痛`, 1);
  era.print(['取得了 苦痛刻印 Lv.1']);
} else if (d_pain >= 1200 && d_pain < 3000 && old_pain <= 1) {
  new_pain = era.set(`mark:${cur_chara}:苦痛`, 2);
  era.print(['取得了 苦痛刻印 Lv.2']);
} else if (d_pain >= 3000 && old_pain <= 2) {
  new_pain = era.set(`mark:${cur_chara}:苦痛`, 3);
  era.print(['取得了 苦痛刻印 Lv.3']);
}
if (new_pain > old_pain) {
  await line_object.get_pain_mark(old_pain, new_pain);
}

// 7. 参数结算
show_delta(cur_chara);
await era.waitAnyKey();
era.set('tflag:前回行动', ret);
era.nextTurnInTrain();

if (era.get(`base:${cur_chara}:体力`) < 500) {
  era.drawLine();
  await era.printAndWait('（体力到达了界限，调教结束）');
  flag = false;
}
// ...
```

再次重载游戏并进入调教，此时点击任意调教指令就都会有结果输出了：

![小红爱抚](../imgs/98-小红爱抚.png)

可以注意到笔者在效果结算的开头通过 get_custom_ero 获取了角色的调教指令口上对象，然后在一些关键点插入了对相关口上方法的调用。例程中这些方法都是空函数，读者可以根据自己的需要实现它们，或者在其他地方插入自己的口上支持。

另外，笔者将效果结算实现在 `#/page/page-ero.js` 仅仅出于实现方便，在实际开发中因为设计通常会更加复杂，一般需要拆分成多个文件，请读者自行斟酌。

# 小结

本章介绍了经典era风格的调教系统的实现，包括调教界面、调教指令的条件检查、调教指令口上与实行值检查、调教指令结算等内容，并实现了一个较为简单的调教界面与系统。大多数era游戏的调教系统都有类似的界面和模式，但细节有所不一，读者在取用本章实现的系统时需要根据实际开发需求自行取舍。

因为篇幅原因，调教系统还有一些子系统的实现未在本章列出，主要包括结束调教后的宝珠结算过程和能力升级子系统。宝珠结算的难点仅在于否定之珠和其他宝珠的相互抵消，而能力升级子系统本质上是商店系统的变形。读者可以参考相关章节自行实现 ~~作为习题~~，或者直接从 [例程](https://gitgud.io/umaera/game/ere-example) 中取用。

> 希望我加了足够的注释。

作为era游戏核心，调教系统涉及到游戏的方方面面，复杂度明显高于本教程实现的其他系统。读者可以通过阅读掌握调教系统实现的思路和基本用法，并在取用和扩展例程中的调教系统 ~~轮子~~ 的过程中逐渐熟悉即可。

> for 只用轮子的读者：<br>
> 在直接取用的情况下，请记住以下关键点：
> * 想新增一个调教指令，需要：
>     * 修改 `#/data/ero/action-const.js` 中的枚举值、新增调教指令的名字，并按需要新增条件检查函数；
>     * 修改 `#/event/ero/ero-common.js`，用枚举值的名字创建同名的地文实例函数，在其中实现该指令的地文；
>         * 如果是有实行值检查的指令，可以不像例程一样拆分成多个函数以提高基类的复用性；
>     * 修改 `#/event/ero/ero-result.js` 导出的通用处理函数的注册函数，创建一个函数对象注册给该指令的枚举值，并在其中操作 nowex、source、exp、stain、item 和 tequip 等表。
> * 调教系统在实现基本框架之后非常重设计，新增来源、角色参数、能力和素质时需要设计其相互影响关系，主要需要修改 `#/event/ero/ero-result.js` 和 `#/page/page-ero.js` 中的相关结算部分；
> * （非必须）笔者对设计的建议：
>     * 如果考虑指令对角色快感和情感造成影响的途径过多（来源多于参数）的情况，可以考虑抛开来源变量，直接对角色参数（delta）进行读写；
>     * 如果角色参数变量较多，则可以尝试安排较少的来源（source），然后在指令的结算阶段将来源转换为角色参数；
>     * 能力、素质、经验、刻印对来源和参数的影响也应该尽可能统一，能力、素质和经验应尽量只影响来源，而刻印因为表示曾经经历过的极端情况可以与参数变化量挂钩；
>     * 在一个指令对应的处理流程中，一个因素（能力、素质、经验、刻印、角色参数）应尽量只参与一次计算，且处理它们的逻辑应尽量集中（如例程中各种因素的影响基本集中在来源结算的部分），便于修改和维护。
> * 对想要参考借鉴元祖era erakanon的读者，可以在 [这里](https://gitgud.io/umaera/game/ere-kanon) 找到它的移植版本。不过它是基于EraElectron引擎生成的开发套件开发的，具有更强的可读性和多语言兼容性，编程体验接近面向对象编程，但是对零基础的读者来说可能比较难懂，读者可以在阅读 [相关章节](./18-tools#开发套件) 后再尝试基于它进行新era游戏的开发。