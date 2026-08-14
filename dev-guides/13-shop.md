---
title: '#13 商店系统实现'
---

本章主要介绍商店系统的实现，主要用到 [era.get 和 era.set 等 API](./09-static#eraget-和-eraset)，以及 [flag 和 item 等数据结构](./09-static#一维表系统变量)。

# 前置变量与系统

商店系统需要展示一些道具、道具的价格以及商品购买按钮，然后在玩家点击按钮后购买道具。商店系统需要有以下前置：

* 游戏中需要有货币和道具；
* 确定商店贩售的道具列表。

## 货币和道具

为创建货币和道具，需要在静态数据文件中增加相应的变量。在csv文件夹创建 Flag.csv 和 Item.csv 两个文件，然后输入以下内容：

```csv
; Flag.csv
0,日元
```

```csv
; Item.csv
0,体力药,100
1,精力药,100
```

重载游戏后在控制台输入 `era.logStatic()`，可以看到静态数据中已经有 flag 和 item 表的定义了；开始新游戏后，在控制台输入 `era.logData()`，可以看到存档数据中 flag 和 item 表的内容也增加了。

## 道具列表

道具列表的生成途径有两种：表示道具是否在售的 `` `itemsales:${i}` `` 变量，与实现商店系统函数的参数。综合起来分为三种方法。

使用 `itemsales` 变量是比较传统的方法，在ere游戏中需要和 `era.get('itemkeys')` 结合使用。在设置一些道具的 `itemsales` 之后，可以用如下代码获取在售的道具序号数组：

```javascript
era.get('itemkeys').filter(e => era.get(`itemsales:${e}`) > 0);
```

使用参数是比较直观的方法，直接将在售的道具序号数组传入就可以控制商店系统中道具的售卖。但是这种做法需要在代码中指定道具序号数组，新增道具或者道具序号的改变可能会导致代码的大规模修改，提高出错的概率。

第三种方法是以上两种方法的结合，此时可以使用道具序号数组控制道具的售卖，同时使用 `itemsales` 表示道具的库存量，这样可以部分模拟现实商店的运行逻辑，即需要「进货」。

无论是哪种方法，在进入商店系统时贩售的道具列表应该已经完全确定，开发者可以在商店系统函数的入口之前（使用参数的方法）或者商店系统交互循环的开头（使用变量的方法或混合方法）完成该列表的计算。下文实现的商店系统将使用参数指定道具列表，以介绍商店系统能够支撑大部分主流玩法的实现方法。

# 基本商店界面

首先先实现基本的商店界面。创建 `#/page/page-shop.js` 文件，输入以下内容：

```javascript
// #/page/page-shop.js
const era = require('#/era-electron');

/** @param {number[]} item_list */
async function page_shop(item_list) {
  let flag = true;
  while (flag) {
    await era.clear();
    const buffer = [],
      money = era.get('flag:日元');
    buffer.push({ config: { content: '购买道具' }, type: 'divider' });
    for (const item_id of item_list) {
      // 用 itemprice 获取道具价格
      const price = era.get(`itemprice:${item_id}`);
      buffer.push({
        accelerator: item_id,
        // 如果钱不够，禁用掉购买按钮
        config: { disabled: price > money },
        // 用 itemname 获取道具名
        content: `${era.get(`itemname:${item_id}`)} (${price.toString()} 日元/件)`,
        type: 'button',
      });
    }
    buffer.push(
      { type: 'divider' },
      {
        config: { width: 20 },
        content: `现在还有 ${money} 日元`,
        type: 'text',
      },
      {
        accelerator: 999,
        config: { align: 'right', width: 4 },
        content: '返回',
        type: 'button',
      },
    );
    era.printMultiColumns(buffer);
    switch (await era.input()) {
      case 999:
        flag = false;
    }
  }
}

module.exports = page_shop;
```

上面的代码有三个关键点，第一是使用 `flag:日元` 和 itemprice 获取持有货币和道具价格，第二是对每个道具检查持有货币是否足够购买道具对购买道具的按钮设置禁用，第三是使用 itemname 获取道具名。

然后在 `#/page/homepage.js` 添加系统的入口：

```javascript
// #/page/homepage.js
// ...
const page_shop = require('#/page/page-shop');
// ...
era.drawLine({ content: '游戏主界面' });
era.printButton('道具商店', 200, { align: 'center', width: 8 });
era.printMultiColumns(
  ['保存进度', '加载存档', '标题界面'].map((e, i) => ({
    accelerator: i + 300,
    config: { align: 'center', width: 8 },
    content: e,
    type: 'button',
  })),
);
switch (await era.input()) {
  // 商店系统的入口，指定贩售列表为前两个道具
  case 200:
    await page_shop([0, 1]);
    break;
  case 300:
    await page_save_game();
    break;
  case 301:
    await page_load_game();
    break;
  case 302:
    flag = false;
}
// ...
```

可以注意到游戏主界面的所有快捷键都有改动，这是为后续的功能入口留出扩展空间。

在引擎中加载游戏，进入游戏后即可进入商店界面：

![商店界面](../imgs/81-商店界面.png)

可以看到因为没有任何货币，所有道具按钮都处于禁用状态。此时通过控制台增加一些货币：

```javascript
// 这里是控制台
era.set('flag:货币', 10000);
```

退出回到游戏主界面再次进入后，就会发现所有按钮都可以点击了：

![可购买道具](../imgs/82-可购买道具.png)

# 动作绑定

在界面的基础上，在 `#/page/page-shop.js` 交互循环中的 switch 添加相应的 case 就可以给相应的道具绑定购买动作，这可以实现如 [eratohoYMAEM](https://gitgud.io/era-games-zh/touhou/eratohoYMAEM_Chinese) 等购买的同时直接使用的道具系统，即：

```javascript
// #/page/page-shop.js
// ...
switch (await era.input()) {
  case 0:
    // 做点什么事
    break;
  case 1:
    // 做点什么事
    break;
  case 999:
    flag = false;
}
// ...
```

如果将购买和使用分离，则可以将 switch 换成 if ... else ...：

```javascript
// #/page/page-shop.js
// ...
const ret = await era.input();
if (ret === 999) {
  flag = false;
} else {
  era.add('flag:日元', -era.get(`itemprice:${ret}`));
  era.add(`item:${ret}`, 1);
  era.printAndWait(`购买了 1 个 ${era.get(`itemname:${ret}`)}。`);
}
// ...
```

在这种设计下，稍加改造，即可实现同时购买多种物品的功能：

```javascript
// #/page/page-shop.js
const era = require('#/era-electron');

/** @param {number[]} item_list */
async function page_shop(item_list) {
  // 用 to_buy 表示每个道具要购买的数量
  const to_buy = {},
    // 用 price_dict 保存每个道具的价格，避免重复计算
    price_dict = {};
  item_list.forEach((item_id) => {
    to_buy[item_id] = 1;
    price_dict[item_id] = era.get(`itemprice:${item_id}`);
  });
  let flag = true;
  while (flag) {
    await era.clear();
    const buffer = [],
      money = era.get('flag:日元');
    buffer.push({ config: { content: '购买道具' }, type: 'divider' });
    for (const item_id of item_list) {
      buffer.push(
        {
          accelerator: item_id,
          config: {
            width: 4,
          },
          content: era.get(`itemname:${item_id}`),
          type: 'button',
        },
        // -1 按钮，不允许购买 0 件
        {
          accelerator: item_id + 100,
          config: {
            align: 'center',
            disabled: to_buy[item_id] === 1,
            width: 4,
          },
          content: '-1',
          type: 'button',
        },
        // 显示要购买几件
        {
          config: {
            align: 'center',
            width: 2,
          },
          content: `x ${to_buy[item_id]}`,
          type: 'text',
        },
        // +1 按钮，最多买 99 件，如果已经超过持有货币就不允许继续增加
        {
          accelerator: item_id + 200,
          config: {
            align: 'center',
            disabled:
              to_buy[item_id] === 99 ||
              price_dict[item_id] * to_buy[item_id] > money,
            width: 4,
          },
          content: '+1',
          type: 'button',
        },
        // 购买按钮，超过持有货币不允许购买
        {
          accelerator: item_id + 300,
          config: {
            disabled: price_dict[item_id] * to_buy[item_id] > money,
            width: 10,
          },
          content: `购买 ${to_buy[item_id]} 件 (${price_dict[item_id] * to_buy[item_id]} 日元)`,
          type: 'button',
        },
      );
    }
    buffer.push(
      { type: 'divider' },
      {
        config: { width: 20 },
        content: `现在还有 ${money} 日元`,
        type: 'text',
      },
      {
        accelerator: 999,
        config: { align: 'right', width: 4 },
        content: '返回',
        type: 'button',
      },
    );
    era.printMultiColumns(buffer);
    const ret = await era.input();
    if (ret === 999) {
      flag = false;
    } else if (ret >= 300) {
      const item_id = ret - 300;
      // 按购买数量扣除货币，增加库存
      const money = era.add(
        'flag:日元',
        -to_buy[item_id] * price_dict[item_id],
      );
      era.add(`item:${item_id}`, to_buy[item_id]);
      await era.printAndWait(
        `购买了 ${to_buy[item_id]} 个 ${era.get(`itemname:${item_id}`)}。`,
      );
      // 购买后将所有道具的购买数量重置到允许购买的最大数量
      item_list.forEach((id) => {
        // 购买后剩余的日元除以道具的价格，下取整，即是可以购买的最大数量
        // 然后最大数量取和1之间的最大值，取和当前要购买的道具数量的最小值
        to_buy[id] = Math.min(
          Math.max(Math.floor(money / price_dict[id]), 1),
          to_buy[id],
        );
      });
    } else if (ret >= 200) {
      const item_id = ret - 200;
      to_buy[item_id]++;
    } else if (ret >= 100) {
      const item_id = ret - 100;
      to_buy[item_id]--;
    } else {
      await era.printAndWait(era.get(`itemname:${ret}`));
      // 这里可以输出道具的介绍
    }
  }
}

module.exports = page_shop;
```

在引擎中重载游戏进入商店界面：

![多重购买](../imgs/83-多重购买.png)

# 分页

在贩售列表过长的情况下，商店界面的高度可能超出引擎显示界面，此时可以让商店界面一次只显示一部分道具，然后增加按钮允许玩家控制显示的部分，这就是**分页（Pagination）**。分页需要在游戏脚本中增加几个变量：

* 表示每页道具数的常量：在运行过程中一般不变，可以定义在商店脚本 `#/page/page-shop.js` 的开头；
* 一共有多少页的常量：在进入商店界面后通过贩售道具列表和每页道具数的常量计算得到（除法，结果上取整），可以使用 JavaScript 中的内置函数 Math.ceil；
* 当前处于第几页的变量：玩家可以控制的变量，增加一组按钮来修改；
* 当前页的道具列表：可以用贩售道具列表、每页道具数的常量和当前处于第几页的变量计算得到，可以使用 JavaScript 中数组的函数属性 Array.slice。

为能够测试分页系统，首先需要在 Item.csv 中增加一些道具：

```csv
; Item.csv
; ...
2,圣灵药,100
3,体力合剂,500
4,精力合剂,500
5,圣灵合剂,500
6,体力秘药,2000
7,精力秘药,2000
8,圣灵秘药,2000
```

然后修改 `#/page/page-shop.js`：

```javascript
// #/page/page-shop.js
const era = require('#/era-electron');

// 每页道具数
const page_size = 5;

/** @param {number[]} item_list */
async function page_shop(item_list) {
  const to_buy = {},
    price_dict = {},
    // 一共有多少页
    max_page = Math.ceil(item_list.length / page_size);
  item_list.forEach((item_id) => {
    to_buy[item_id] = 1;
    price_dict[item_id] = era.get(`itemprice:${item_id}`);
  });
  let flag = true,
    // 当前页的道具列表
    shop_list,
    // 当前处于第几页
    cur_page = 1;
  while (flag) {
    await era.clear();
    // 在每次循环开头计算一下当前页的道具列表
    // Array.slice 会在不改变原数组的情况下从中截取一段返回
    // Array.slice 接受两个参数，决定从数组的第几个元素开始截取数组，以及截取到第几个元素（左闭右开）
    // 第二个参数可以省略，此时截取的结果会一直到数组的最后一个元素
    shop_list = item_list.slice(
      (cur_page - 1) * page_size,
      cur_page * page_size,
    );
    const buffer = [],
      money = era.get('flag:日元');
    buffer.push({ config: { content: '购买道具' }, type: 'divider' });
    // 这里使用当前页的道具列表生成按钮
    for (const item_id of shop_list) {
    // ...
    buffer.push(
      { type: 'divider' },
      {
        config: { width: 8 },
        content: `现在还有 ${money} 日元`,
        type: 'text',
      },
    );
    // 在有多个页的情况下再输出控制分页的按钮
    if (max_page > 1) {
      buffer.push(
        {
          accelerator: 900,
          config: { align: 'center', disabled: cur_page === 1, width: 4 },
          content: '上一页',
          type: 'button',
        },
        {
          config: {
            align: 'center',
            width: 4,
          },
          content: `${cur_page} / ${max_page}`,
          type: 'text',
        },
        {
          accelerator: 901,
          config: {
            align: 'center',
            disabled: cur_page === max_page,
            width: 4,
          },
          content: '下一页',
          type: 'button',
        },
      );
    }
    buffer.push({
      accelerator: 999,
      config: { align: 'right', width: max_page === 1 ? 16 : 4 },
      content: '返回',
      type: 'button',
    });
    era.printMultiColumns(buffer);
    const ret = await era.input();
    if (ret === 999) {
      flag = false;
    } else if (ret === 900) {
      cur_page--;
    } else if (ret === 901) {
      cur_page++;
    } else if (ret >= 300) {
// ...
```

现在可以重载游戏并进入商店界面，可以发现在贩售道具列表长度并不足触发分页时，商店界面的显示和之前并无不同。

修改 `#/page/homepage.js` 中的商店系统入口，然后重载游戏并进入商店界面：

```javascript
// #/page/homepage.js
// ...
case 200:
  // 商店系统的入口
  await page_shop([0, 1, 2, 3, 4, 5, 6, 7, 8]);
// ...
```

![商店分页](../imgs/84-分页.png)

# 小结

本章介绍了商店系统的实现，利用了 [era.get 和 era.set 等 API](./09-static#eraget-和-eraset) 和 flag 和 item 表等数据结构，实现了一个可以根据传入参数决定贩售道具列表、并根据列表长度自适应分页的商店系统。

本章使用了以下一些 JavaScript 内置函数：Math.floor（对传入参数下取整）、Math.ceil（对传入参数上取整）、Math.max（取所有传入参数的最大值）、Math.min（取所有传入参数的最小值）和 Array.slice（取数组的子数组）。这些常用函数在后续的系统实现中也会用到。