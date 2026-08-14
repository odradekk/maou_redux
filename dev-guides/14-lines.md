---
title: '#14 口上系统实现'
---

本章介绍口上系统的实现，主要用到 [JavaScript 的类和继承等语法](./04-js-basic#进阶面向对象基础)。

# 概览与前置

「口上」与「地文」原是日语词，其中口上指「台词/台本」，地文则是非台词的描述。在era游戏发展的过程中，口上和地文的概念也逐渐演化，现在在开发者和玩家之间使用的「口上」和「地文」已经广义化。在本教程中使用的口上和地文的含义则如下所述：

* 口上：指角色相同游戏指令下输出的定制化的文本内容；
* 地文：指与角色无关的通用文本内容。

举例来说，假如游戏中有一个【聊天】指令，点击后会输出「与某某某正在聊天」，然后是与角色的聊天内容。开发者在角色的聊天内容这里进行了检测，如果角色没有指定这里的聊天内容，就会输出「与某某某寒暄了几句」，否则输出对角色定制化的聊天内容。则在这个指令的所有后续输出内容中，「与某某某正在聊天」「与某某某寒暄了几句」就属于**地文**，而对角色定制化的聊天内容就是**口上**。

在此基础上，本章要实现的口上系统就是这样一个「支持为不同角色在不同指令下输出定制化的内容（口上），在没有指定内容的情况下输出通用内容（地文）」的系统。为了能够测试口上系统，首先需要添加一些角色，在csv文件夹下创建Chara文件夹，然后在其中创建以下文件：

```csv
; Chara0001.csv
角色编号,1
姓名,赤红
称呼,小红
```

```csv
; Chara0002.csv
角色编号,2
姓名,碧青
称呼,小青
```

在 Flag.csv 中增加一个变量，用来存储当前互动的角色：

```csv
; Flag.csv
; ...
10,当前角色
```

修改 `#/main.js` 的新游戏入口，在新游戏开始时添加这两个角色，并将当前互动角色设置为1号角色：

```javascript
// #/main.js
// ...
era.resetData();
era.addCharacter(1, 2);
era.set('flag:当前角色', 1);
// ...
```

修改 `#/page/homepage.js`，增加切换互动角色的按钮、按钮【聊天】和输出互动信息的位置：

```javascript
// #/page/homepage.js
// ...
era.printMultiColumns(
  era.getAddedCharacters().map((id) => ({
    accelerator: id,
    config: {
      align: 'center',
      buttonType: id === era.get('flag:当前角色') ? 'warning' : 'info',
      width: 8,
    },
    content: era.get(`callname:${id}:-2`),
    type: 'button',
  })),
);
era.drawLine();
era.printButton('聊天', 100, { align: 'center', width: 8 });
era.drawLine();
// ...
const ret = await era.input();
switch (ret) {
  case 100:
    era.drawLine();
    // 处理【聊天】的互动
    await era.printAndWait('互动信息');
    break;
  // ...
  default:
    // 切换互动角色
    era.set('flag:当前角色', ret);
}
// ...
```

重载游戏后进入游戏，现在游戏主界面如下：

![口上前置](../imgs/85-口上前置.png)

口上系统的目标就是在切换互动角色之后点击【聊天】按钮，让显示【互动信息】的位置显示不同的内容。

# 口上类

在相同指令下，对不同角色输出不同的定制化内容，在 JavaScript 中正有类似的概念和语法与之对应：[类、继承和重载](./04-js-basic#进阶面向对象基础)。在此基础上，口上系统可以按如下思路实现：

* 创建一个通用的基类，对所有的指令都声明一个相应的实例方法，在其中实现地文；
* 对角色创建一个相应继承类，继承基类，然后重载想要输出定制化内容的实例方法；
* 对这些类提供一个通用入口，在尝试获取角色对应的口上对象时实例化对应的类并返回，然后在获取到口上对象的地方调用该对象的对应方法。

在 JavaScript 的类和继承机制下，继承类如果实现了对应的口上方法就会执行继承类里的口上方法，否则会执行基类里的口上方法，就能满足在相同指令下对不同角色输出不同定制化内容、在不存在定制化内容时输出通用内容的要求了。

在当前的游戏项目中，要实现这样的系统需要新增四个文件：实现地文的基类一个文件，两个角色各对应一个继承类共两个文件，通用入口一个文件。

因此新建以下文件并输入以下内容：

```javascript
// #/event/lines-common.js
const era = require('#/era-electron');

// 口上基类，主要实现地文
class CustomizedLines {
  /**
   * 角色的编号
   * @type {number}
   */
  id;

  /**
   * 角色的真名
   * @type {string}
   */
  name;

  /**
   * 角色的默认称呼
   * @type {string}
   */
  callname;

  /** @param {number} id */
  constructor(id) {
    this.id = id;
    this.name = era.get(`callname:${this.id}:-1`);
    this.callname = era.get(`callname:${this.id}:-2`);
  }

  // 【聊天】对应的口上方法
  async talk() {
    await era.printAndWait(['和 ', this.callname, ' 寒暄了一会……']);
  }
}

module.exports = CustomizedLines;
```

```javascript
// #/event/lines-1.js
const era = require('#/era-electron');

const CustomizedLines = require('#/event/lines-common');

// 小红对应的口上继承类
// 因为其他地方暂时用不到这个类，所以直接以匿名类导出
module.exports = class extends CustomizedLines {
  async talk() {
    await era.printAndWait([this.callname, ' 分享了一些好玩的事情。']);
  }
};
```

```javascript
// #/event/lines-2.js
const era = require('#/era-electron');

const CustomizedLines = require('#/event/lines-common');

// 小青对应的口上继承类
// 因为其他地方暂时用不到这个类，所以直接以匿名类导出
module.exports = class extends CustomizedLines {
  async talk() {
    await era.printAndWait([this.callname, ' 简单说了下自己的见闻。']);
  }
};
```

```javascript
// #/event/lines-factory.js
const CustomizedLines = require('#/event/lines-common');

const cons_dict = {};

cons_dict[1] = require('#/event/lines-1');
cons_dict[2] = require('#/event/lines-2');

const obj_dict = {};

module.exports = {
  /**
   * 通用入口函数，返回角色ID对应的实例化继承类，或者实例化的基类
   *
   * @param {number} id
   * @returns {CustomizedLines}
   */
  get_custom_lines(id) {
    if (!obj_dict[id]) {
      obj_dict[id] = new (cons_dict[id] || CustomizedLines)(id);
    }
    return obj_dict[id];
  },
};
```

然后在 `#/page/homepage.js` 中修改相应内容以接入口上系统：

```javascript
// #/page/homepage.js
// ...
const { get_custom_lines } = require('#/event/lines-factory');

async function homepage() {
  // ...
      case 100:
        // 处理【聊天】的互动
        era.drawLine();
        await get_custom_lines(era.get('flag:当前角色')).talk();
        break;
  // ...
}

module.exports = homepage;
```

重载游戏并进入新游戏，效果如下：

![小红聊天](../imgs/86-小红聊天.png)

![小青聊天](../imgs/87-小青聊天.png)

可以看到 `#/event/lines-common.js` 中除了口上方法外还有三个实例字段，这些字段在调用构造函数时会根据传入的角色ID自动赋值，在不同的继承类中取值不同，可以直接在继承类的口上方法中使用。

# 通用处理

除了输出文本之外，大多数指令都还包括角色状态的变化，诸如体力等基础资源的减少、好感度的上升下降、经验的增加等。我们当然可以直接在相应的口上方法中处理这些变化，或者在调用口上方法之后统一处理。但对同一指令而言，大多数角色的状态变化虽然是同质化的，仍可能有需要定制化的空间。为此，还需要在口上系统中增加通用处理的支持。

实现口上系统的通用处理有三种方法：

* 对基类的口上方法进行再划分，为每个指令增加单独的结果处理方法，然后在角色口上继承类的重载方法最后按需调用；
* 对每个口上方法再度细分，直接在地文中实现结果处理，然后将需要定制化的部分再提取出一个口上方法，不需要定制化结果处理的角色口上继承类重载细分后的口上方法即可，需要定制化结果处理的则直接重载整个口上方法；
* 改造口上的入口函数，在调用角色相应的口上方法后执行相应的处理方法。

这三种方法在现在的游戏项目中实现后的效果如下图所示，其中 run_custom_lines 是第三种方法中新的入口函数，由它负责调用相应口上对象中的口上方法以及通用结果处理方法：

![通用处理实现方法](../imgs/87.9-通用处理.png)

这三种方法各有优劣：第一种方法的框架工作量较小，但是角色口上继承类的开发难度和出错率都会上升；第二种方法的框架工作量也较小，但会增加很多口上方法，降低可读性与可维护性；第三种方法的框架工作量较大，但口上继承类的开发难度和出错率相对较低，而且入口函数的可扩展性较高，更易于之后接入各种功能。

本节会依次为读者展示这三种方法，但之后的参考代码和例程的实现将以第三种方法为准，因此前两种方法读者可只作阅览、理清其中的逻辑而并不进行代码实践。为进行测试，设计【聊天】指令默认增加互动角色的1点好感度，但对小青则增加2点好感度，并对 `#/page/homepage.js` 进行以下修改以在游戏主界面显示互动角色的好感度：

```javascript
// #/page/homepage.js
// ...
era.drawLine({ content: '游戏主界面' });
// 输出互动角色的名字和好感度
const cur_chara = era.get('flag:当前角色');
era.printMultiColumns([
  {
    config: { align: 'center', width: 4 },
    content: era.get(`callname:${cur_chara}:-2`),
    type: 'text',
  },
  {
    config: { width: 20 },
    content: `好感度：${era.get(`relation:${cur_chara}:0`)}`,
    type: 'text',
  },
]);
era.drawLine();
// ...
```

同时在 `#/main.js` 的新游戏入口设置角色1和2对角色0的好感度为0：

```javascript
// #/main.js
// ...
era.addCharacter(1, 2);
era.set('relation:1:0', 0);
era.set('relation:2:0', 0);
// ...
```

然后现在游戏主界面会额外显示互动角色的名字和好感度了：

![好感度](../imgs/88-好感度.png)

## 方法一：为口上对象增加结果方法

修改 `#/event/lines-common.js`、`#/event/lines-1.js` 和 `#/event/lines-2.js`：

```javascript
// #/event/lines-common.js
// ...
// 【聊天】对应的口上方法
async talk() {
  await era.printAndWait(['和 ', this.callname, ' 寒暄了一会……']);
  await this.talk_result();
}

// 【聊天】对应的口上结果方法
async talk_result() {
  era.println();
  era.add(`relation:${this.id}:0`, 1);
  await era.printAndWait(['和 ', this.callname, ' 的好感度上升了 1 点……']);
}
// ...
```

```javascript
// #/event/lines-1.js
// ...
async talk() {
  await era.printAndWait([this.callname, ' 分享了一些好玩的事情。']);
  await this.talk_result();
}
// ...
```

```javascript
// #/event/lines-2.js
// ...
async talk() {
  await era.printAndWait([this.callname, ' 简单说了下自己的见闻。']);
  era.println();
  era.add(`relation:${this.id}:0`, 2);
  await era.printAndWait(['和 ', this.callname, ' 的好感度上升了 2 点……']);
}
// ...
```

这样就完成了对通用处理的接入。角色小红使用通用处理方法，【聊天】后好感度上升1点；角色小青则定制化处理，【聊天】后好感度上升2点。

这种方法的缺陷在于随着角色的增多和指令的增加，每个角色的相应口上方法都要在定制化和调用通用处理之间二选一，增加了相当多的冗余工作量，并且容易出错。

## 方法二：继续划分口上方法

```javascript
// #/event/lines-common.js
// ...
// 【聊天】对应的口上方法
async talk() {
  await this.talk_content();
  era.println();
  era.add(`relation:${this.id}:0`, 1);
  await era.printAndWait(['和 ', this.callname, ' 的好感度上升了 1 点……']);
}

// 【聊天】对应的输出内容
async talk_content() {
  await era.printAndWait(['和 ', this.callname, ' 寒暄了一会……']);
}
// ...
```

```javascript
// #/event/lines-1.js
// ...
async talk_content() {
  await era.printAndWait([this.callname, ' 分享了一些好玩的事情。']);
}
// ...
```

```javascript
// #/event/lines-2.js
// ...
async talk() {
  await era.printAndWait([this.callname, ' 简单说了下自己的见闻。']);
  era.println();
  era.add(`relation:${this.id}:0`, 2);
  await era.printAndWait(['和 ', this.callname, ' 的好感度上升了 2 点……']);
}
// ...
```

可以看到工作量和第一种方法仿佛。这种方法在第一种方法的基础上有效降低了工作量，但是因为较为深度地利用了 JavaScript 类的语法和机制，有一定理解成本。另外，在角色和指令增加后，书写错误的可能性也相应增加了。

## 方法三：改造入口函数

对入口函数的改造需要在框架层面重构口上系统（当然对目前的口上系统而言是加法而非减法）。简单来讲，我们需要在 `#/event/lines-factory.js` 导出的对象中增加一个属性 run_custom_lines，可以找到对应的口上对象并执行口上方法，在执行结束后调用对应的口上结果方法。为了能够在 run_custom_lines 中指定口上方法，我们需要用 [枚举](./10-const#js-格式的特殊用法枚举enum) 定义所有可能触发口上的指令，然后将结果处理方法写在一个新文件里统一管理。

为此，需要新增或修改以下文件：

```javascript
// #/data/event/hooks.js
// 定义了所有可能触发口上指令的枚举
// 注意这个枚举中枚举值的名字和 #/event/lines-common.js 中的口上方法应该是有一一对应关系的
const hooks = {
  talk: 0,
};
Object.keys(hooks).forEach((e, i) => (hooks[e] = i));
// 用 hooks.keys 放所有枚举值的名字
// 注意 hooks.keys 这个数组中每个枚举值名字的下标正好是枚举值
hooks.keys = Object.keys(hooks);

module.exports = hooks;
```

```javascript
// #/event/lines-result.js
const era = require('#/era-electron');

const event_hooks = require('#/data/event/hooks');

// 导出一个对象，放置所有指令的通用处理
// [event_hooks.talk] 是取值，例如 event_hooks.talk，则这个函数最后导出的时候名字就会是 '0'
module.exports = {
  /** @param {number} id */
  async [event_hooks.talk](id) {
    era.println();
    era.add(`relation:${id}:0`, 1);
    await era.printAndWait([
      '和 ',
      era.get(`callname:${id}:-2`),
      ' 的好感度上升了 1 点……',
    ]);
  },
};
```

```javascript
// #/data/event/line-arg.js
// 用于表示口上参数的类
class LineArg {
  // result 表示是否要执行通用处理
  result = true;
}

module.exports = LineArg;
```

```javascript
// #/event/lines-factory.js
const CustomizedLines = require('#/event/lines-common');
const lines_result = require('#/event/lines-result');

const LineArg = require('#/data/event/line-arg');
const hooks = require('#/data/event/hooks');

const cons_dict = {};

cons_dict[1] = require('#/event/lines-1');
cons_dict[2] = require('#/event/lines-2');

const obj_dict = {};

/**
 * 通用入口函数之一，返回角色ID对应的实例化继承类，或者实例化的基类<br>
 * 因为 run_custom_lines 也要用到，所以这里提取出来在前面定义，然后在对象里用名字声明为导出对象的属性
 *
 * @param {number} id
 * @returns {CustomizedLines}
 */
function get_custom_lines(id) {
  if (!obj_dict[id]) {
    obj_dict[id] = new (cons_dict[id] || CustomizedLines)(id);
  }
  return obj_dict[id];
}

module.exports = {
  get_custom_lines,
  /**
   * 通用入口函数之二，会根据 hook 对应的枚举值直接调用口上对象中的相应口上方法，
   * 并且根据 arg.result 决定是否要执行通用处理
   *
   * @param {number} id
   * @param {number} hook
   */
  async run_custom_lines(id, hook) {
    const obj = get_custom_lines(id),
      arg = new LineArg();
    // 这里用 hooks.keys 获取枚举值对应的名字，然后获取口上对象中的对应口上方法
    // Function.call 是 JavaScript 中函数对象的内置方法，这里是为了防错，照抄就好
    await obj[hooks.keys[hook]].call(obj, arg);
    // 如果在角色口上对象的口上方法里没有设置 arg.result，就执行通用处理函数
    if (arg.result) {
      // 这里直接使用枚举值
      // 口上类里用枚举值的名字是因为用枚举值的话一些 IDE 不会正确提示重载关系
      await lines_result[hook](id);
    }
  },
};
```

```javascript
// #/event/lines-common.js
// ...
/**
 * 【聊天】对应的口上方法，声明一下接收 LineArg 类型的参数 arg，
 * 不然重载方法也接受不到参数
 *
 * @param {LineArg} arg
 */
// eslint-disable-next-line no-unused-vars
async talk(arg) {
  await era.printAndWait(['和 ', this.callname, ' 寒暄了一会……']);
}
// ...
```

```javascript
// #/event/lines-2.js
const era = require('#/era-electron');

const CustomizedLines = require('#/event/lines-common');

// 小青对应的口上继承类
// 因为其他地方暂时用不到这个类，所以直接以匿名类导出
module.exports = class extends CustomizedLines {
  async talk(arg) {
    await era.printAndWait([this.callname, ' 简单说了下自己的见闻。']);
    // 通过设置 arg.result 表示小青的【聊天】指令不使用通用处理
    arg.result = false;
    era.println();
    era.add(`relation:${this.id}:0`, 2);
    await era.printAndWait(['和 ', this.callname, ' 的好感度上升了 2 点……']);
  }
};
```

然后 `#/page/homepage.js` 里就要用新的 run_custom_lines 函数了：

```javascript
// #/page/homepage.js
// ...
case 100:
  // 处理【聊天】的互动
  era.drawLine();
  await run_custom_lines(era.get('flag:当前角色'), hooks.talk);
  break;
// ...
```

框架重构之后，点击【聊天】之后口上的运行流程如下：

* 调用 `#/event/lines-factory.js` 中的 run_custom_lines，传参要求调用属于角色 `era.get('flag:当前角色')` 口上对象的 `hooks.talk` 口上方法；
* run_custom_lines 调用 get_custom_lines 获取对应的口上对象，包装一个 LineArg 用于对应口上方法设置是否要运行通用处理结果；
* 用枚举值的名字获取到口上对象中的口上方法并执行，如果口上对象的原型继承类有就执行继承类的版本，否则执行基类的版本；
* 检查 LineArg 里的 result，如果是 true 就执行通用处理过程，否则就不执行
* 用枚举值从通用处理对象 `#/event/lines-result.js` 中获取对应的通用处理，然后执行

## 结果

上述任意一种方法实现后，重载游戏并进入新游戏，在小红和小青之间切换互动角色然后点击【聊天】按钮，结果如下：

![小红](../imgs/89-小红.png)

![小青](../imgs/90-小青.png)

口上系统之后的内容以及 [#15 调教系统实现](./15-ero#指令与口上) 中的口上都基于第三种方法实现，以利用其高度的可扩展性。

# （进阶）多口上支持

有些情况下一些角色会拥有不止一份口上，此时口上系统需要具有根据情况在多份口上间切换的能力。首先需要在 CFlag.csv 里增加一个变量：

```csv
; CFlag.csv
0,口上
```

然后在 `#/event/lines-common.js` 中增加一个空的实例方法 switch；在 `#/page/homepage.js` 中增加一个按钮用于切换口上：

```javascript
// #/event/lines-common.js
// ...
// 【切换口上】对应的口上方法
async switch() {
  await era.printAndWait('并无多口上……');
}
// ...
```

```javascript
// #/page/homepage.js
// ...
era.drawLine();
// 触发口上的互动按钮
era.printMultiColumns(
  ['聊天', '切换口上'].map((e, i) => ({
    accelerator: i + 100,
    config: { align: 'center', width: 8 },
    content: e,
    type: 'button',
  })),
);
// ...
case 101:
  // 处理【切换口上】
  era.drawLine();
  await get_custom_lines(era.get('flag:当前角色')).switch();
  break;
// ...
```

现在给小红添加多口上支持。创建 `#/event/lines-1-2.js` 文件，作为小红这个角色的第二口上。第二口上和第一口上一样，也需要是 CustomizedLines 类的继承类。但如果第二口上有部分指令未支持，或者希望以第一口上作为底本的情况下，第二口上类也可以继承第一口上类，这样第二口上类将同时具有第一口上类和基类的所有实例方法，在调用方法时首先在第二口上类中寻找，之后是第一口上类，如果前两者都没有对应方法才会调用基类的版本。这里采取继承第一口上的方法，并在第一口上中实现 switch 方法，以避免重复声明。

```javascript
// #/event/lines-1.js
const era = require('#/era-electron');

const CustomizedLines = require('#/event/lines-common');

// 小红对应的第一口上继承类
// 直接以匿名类导出
module.exports = class extends CustomizedLines {
  // ...
  async switch() {
    let lines = era.get('cflag:1:口上');
    lines = era.set('cflag:1:口上', 1 - lines);
    await era.printAndWait([
      '现在 ',
      this.callname,
      ' 使用第 ',
      (lines + 1).toString(),
      ' 口上。',
    ]);
  }
};
```

```javascript
// #/event/lines-1-2.js
const era = require('#/era-electron');

const Lines1 = require('#/event/lines-1');

// 小红对应的第二口上继承类
// 因为其他地方暂时用不到这个类，所以直接以匿名类导出
module.exports = class extends Lines1 {
  async talk() {
    await era.printAndWait([this.callname, ' 很健谈。']);
  }
};
```

现在重载游戏进入新游戏后，以小红为互动角色时点击【切换口上】会显示切换的情况，而以小青为互动角色时点击【切换口上】则会显示并无多口上：

![小红多口上](../imgs/91-小红多口上.png)

![小青单口上](../imgs/92-小青单口上.png)

那么如何让使用的口上在这两个口上对象间切换呢？关键其实就在 `#/event/lines-factory.js` 导出的 get_custom_lines 函数。现在这个函数会按照 `#/event/lines-factory.js` 中口上类的注册情况返回对应的口上对象，在以 `1` 为参数时，目前它会返回实例化的小红第一口上类。要想让它能返回第二口上类的实例，只需要在构造第一口上对象的同时构造第二口上实例，然后按需返回口上对象即可。

修改 `#/event/lines-common.js`、`#/event/lines-1-2.js` 和 `#/event/lines-factory.js`：

```javascript
// #/event/lines-common.js
const era = require('#/era-electron');

// 口上基类，主要实现地文
class CustomizedLines {
  // ...
  get_this() {
    return this;
  }
  // ...
}
```

```javascript
// #/event/lines-1-2.js
const era = require('#/era-electron');

const Lines1 = require('#/event/lines-1');

// 小红对应的第二口上继承类
// 因为其他地方暂时用不到这个类，所以直接以匿名类导出
module.exports = class extends Lines1 {
  /**
   * 第一口上对象
   *
   * @type {CustomizedLines}
   */
  first;

  constructor(id) {
    super(id);
    this.first = new Lines1(id);
  }
  // ...
  // 按照 cflag 表中的变量返回第一口上对象或第二口上对象
  get_this() {
    if (era.get('cflag:1:口上') === 0) {
      return this.first;
    }
    return this;
  }
};
```

```javascript
// #/event/lines-factory.js
// ...
// 因为两个口上类的实例化是在第二口上里，所以这里注册第二口上类
cons_dict[1] = require('#/event/lines-1-2');
// ...
function get_custom_lines(id) {
  if (!obj_dict[id]) {
    obj_dict[id] = new (cons_dict[id] || CustomizedLines)(id);
  }
  return obj_dict[id].get_this();
}
// ...
```

现在重载游戏并进入新游戏，此时切换口上后可以看到小红已经启用第二口上了：

![小红第二口上](../imgs/93-小红-第二口上.png)

这里因为使用第二口上类继承了第一口上类，所以在第二口上类构造两个口上对象并重载 get_this 方法，否则会导致循环依赖（会导致模块导入导出失败）。

# （进阶）随机事件系统

某些情况下我们会希望指令按钮能触发一系列不同于通常口上的其他事件。
当然，我们可以使用变量的不同取值来控制口上方法的输出。但在使用变量取值判定之外，我们还可以使用另一种更高明的机制来实现这一目标：随机事件。
如果可以在指令按钮触发的动作中插入随机事件，那么就能以此取代，通过在口上方法中使用一连串 if ... else if ... 的条件判断的累赘方式来控制不同文本的输出。
另外，随机事件系统还允许在同一个指令按钮的动作中组合不同角色的事件，增强游戏剧情的表现力。

为实现随机事件系统，首先需要为游戏中所有指令按钮创建一个队列，并实现从中获取事件的函数，其次使用一个类或者对象来表示事件，最后还需要改造 `#/event/lines-factory.js` 允许从口上对象中调用相应的随机事件。

首先在 Flag.csv 里增加一个变量，用来保存随机事件队列（JavaScript 是泛型，所以 flag 表中的变量可以保存非 Number 类型的复杂数据结构）：

```csv
; Flag.csv
; ...
11,事件队列
```

然后创建或修改以下文件：

```javascript
// #/data/event/event-object.js
// 事件对象类
class EventObject {
  /**
   * 随机事件对应的角色ID
   *
   * @type {number}
   */
  chara_id;
  /**
   * 随机事件名，用来从口上对象里获取事件对应的口上方法
   *
   * @type {string}
   */
  event;

  /**
   * 事件队列里的对象在存档再读档后会变成单纯的 Object，所以要用 from_obj 静态方法再转换回类的实例<br>
   * 其实不这么做也可以，只是如果要给 EventObject 加方法的话必须这么做，不然会因为没有原型而丢失方法
   *
   * @param {{chara_id:number,[event]:string}} obj
   * @returns {EventObject}
   */
  static from_obj(obj) {
    const ret = new EventObject(obj.chara_id);
    ret.event = obj.event;
    return ret;
  }

  /** @param {number} id */
  constructor(id) {
    this.chara_id = id;
  }
}

module.exports = EventObject;
```

```javascript
// #/sys/sys-event-queue.js
const era = require('#/era-electron');

const EventObject = require('#/data/event/event-object');

/**
 * 用来放事件队列的变量，通过 init 函数初始化<br>
 * Record 是一类 Object，Record 后面跟着的尖括号会带两个用半角逗号（,）分割的类型<br>
 * 第一个类型恒为 string，第二个类型指定了这个 Object 的属性值类型<br>
 * Record<string,EventObject[]> 表明这个 Object 的所有属性值都是 EventObject[] 类型
 *
 * @type {Record<string,EventObject[]>}
 */
let queue;

module.exports = {
  /**
   * 向相应的指令的队列添加一个事件对象<br>
   * 注意没添加过事件对象的队列还未设置，需要用 ||= [] 保证它一定是一个数组
   *
   * @param {number} hook 指令的枚举值，从 #/data/event/hooks 导出的枚举中取
   * @param {EventObject} event 要添加的事件对象
   */
  add_event(hook, event) {
    queue[hook] ||= [];
    queue[hook].push(event);
  },
  /**
   * 获取一个指令的队列里的第一个事件对象<br>
   * 一样要用 ||= [] 容错
   *
   * @param {number} hook 指令的枚举值，从 #/data/event/hooks 导出的枚举中取
   * @returns {EventObject}
   */
  get_random_event(hook) {
    queue[hook] ||= [];
    // Array.shift：将数组的第一个元素弹出返回，会改变原数组
    return queue[hook].shift();
  },
  // 初始化事件队列的函数，进入新游戏或者读档时需要调用一次，确保事件队列变量跟随存档
  init_queue() {
    // 新游戏状态下，flag:事件队列 是0，此时会执行 era.set('flag:事件队列', {})，将其中保存的值变成空对象再返回
    queue = era.get('flag:事件队列') || era.set('flag:事件队列', {});
    // 拿到 flag:事件队列 保存的对象后，其中的属性值应该都是数组，将所有数组中的事件对象用 EventObject.from_obj 转换成 EventObject
    for (const k in queue) {
      queue[k] = queue[k].map((e) => EventObject.from_obj(e));
    }
  },
};
```

```javascript
// #/sys/sys-get-random-event
const { get_random_event } = require('#/sys/sys-event-queue');

const { run_custom_lines } = require('#/event/lines-factory');

/**
 * 从指令的队列里获取一个随机事件，然后转换成可执行的异步函数对象并返回<br>
 * 这里用异步函数对象的返回值表示是否跳过后续正常的口上输出
 *
 * @param hook 指令的枚举值
 * @returns {function:Promise<boolean|void>} 随机事件的可执行版本，是一个函数对象，注意返回值是 Promise<boolean|void>
 */
function sys_get_random_event(hook) {
  const event = get_random_event(hook);
  // 如果没有随机事件可以触发，返回一个空的异步函数对象，不然在执行的地方会报错
  if (event === undefined) {
    return async () => false;
  }
  return () => run_custom_lines(event.chara_id, hook, event);
}

module.exports = sys_get_random_event;
```

```javascript
// #/event/lines-factory.js
// ...
module.exports = {
  // ...
  /**
   * 通用入口函数之二，会根据 hook 对应的枚举值直接调用口上对象中的相应口上方法，
   * 并且根据 arg.result 决定是否要执行通用处理
   *
   * @param {number} id 角色的ID
   * @param {number} hook 指令的枚举值
   * @param {EventObject} [event] 事件对象，可能是空的
   * @returns {Promise<boolean|void>} 随机事件系统改动：供随机事件系统用的返回值，如果是 true 则表示要跳过正常的口上运行流程
   */
  async run_custom_lines(id, hook, event) {
    const obj = get_custom_lines(id),
      arg = new LineArg();
    let ret;
    // 随机事件系统改动：如果不是随机事件的可执行版本，或者口上对象没有对应事件名的方法，就按照指令的枚举值调用口上方法
    if (event === undefined || obj[event.event] === undefined) {
      // 这里用 hooks.keys 获取枚举值对应的名字，然后获取口上对象中的对应口上方法
      // Function.call 是 JavaScript 中函数对象的内置方法，这里是为了防错，照抄就好
      await obj[hooks.keys[hook]].call(obj, arg, event);
    } else {
      // 随机事件系统改动：否则，就按照随机事件对象指定的事件名调用口上方法
      ret = await obj[event.event].call(obj, arg, event);
    }
    // 如果在角色口上对象的口上方法里没有设置 arg.result，就执行通用处理函数
    if (arg.result) {
      // 这里直接使用枚举值
      // 口上类里用枚举值的名字是因为用枚举值的话一些 IDE 不会正确提示重载关系
      await lines_result[hook](id);
    }
    return ret;
  },
};
```

```javascript
// #/main.js
const era = require('#/era-electron');

const { init_queue } = require('#/sys/sys-event-queue');
// ...
module.exports = async () => {
  // ...
  case 1:
    // 点击【开始游戏】时，重置当前存档并进入 homepage
    era.resetData();
    era.addCharacter(1, 2);
    // 初始化事件队列，让队列跟随存档
    init_queue();
};
```

```javascript
// #/page/page-load-game.js
const era = require('#/era-electron');

const { init_queue } = require('#/sys/sys-event-queue');

async function page_load_game() {
  // ...
  } else if (await era.loadData(ret)) {
    // 这里可以插入对旧版本存档的修复
    // 随机事件系统改动：初始化事件队列，让队列跟随存档
    init_queue();
    // 只有在读档成功的情况下才返回
    return true;
  }
// ...
```

```javascript
// #/page/homepage.js
const era = require('#/era-electron');

const sys_get_random_event = require('#/sys/sys-get-random-event');
// ...
async function homepage() {
  // ...
  case 100:
    // 处理【聊天】的互动
    era.drawLine();
    // 尝试从 hooks.talk 的队列里取一个随机事件，然后转换成可执行的版本在这里执行
    // 返回值类型是 boolean（await 之后），如果是 true，就跳过后面对当前角色口上的执行
    if (!(await sys_get_random_event(hooks.talk)())) {
      await run_custom_lines(era.get('flag:当前角色'), hooks.talk);
    }
    break;
  // ...
}
// ...
```

以上就完成了随机事件系统的全部开发工作，要点在于使用事件对象表示随机事件并可以将其转换为可执行的版本。这个随机事件系统中笔者利用了事件执行结果的返回值，用来控制触发随机事件之后是否还要执行正常的口上，增强剧情事件的表现力。

接下来笔者将为小青增加一个随机事件来举例说明随机事件系统是如何工作的，修改 `#/event/lines-2.js`：

```javascript
// #/event/lines-2.js
const era = require('#/era-electron');

const { add_event } = require('#/sys/sys-event-queue');

const CustomizedLines = require('#/event/lines-common');

const hooks = require('#/data/event/hooks');
const EventObject = require('#/data/event/event-object');

// 小青对应的口上继承类
// 因为其他地方暂时用不到这个类，所以直接以匿名类导出
module.exports = class extends CustomizedLines {
  // 随机事件的口上方法
  async interrupt(arg) {
    await era.printAndWait([this.callname, ' 打断了聊天。']);
    arg.result = false;
    era.println();
    era.add(`relation:${this.id}:0`, 10);
    await era.printAndWait(['和 ', this.callname, ' 的好感度上升了 10 点……']);
    // 通过返回 true 打断后续的口上执行
    return true;
  }

  async talk(arg) {
    await era.printAndWait([this.callname, ' 简单说了下自己的见闻。']);
    arg.result = false;
    era.println();
    const relation = era.add(`relation:${this.id}:0`, 2);
    await era.printAndWait(['和 ', this.callname, ' 的好感度上升了 2 点……']);
    // 检查小青的好感度是否高于10点，如果是则向 hooks.talk 对应的队列中添加一个随机事件，并用随机事件对象的属性指定口上方法 interrupt
    if (relation >= 10) {
      const event = new EventObject(this.id);
      event.event = 'interrupt';
      add_event(hooks.talk, event);
    }
  }
};
```

然后在引擎中重载游戏并开始新游戏，先切换到小青点击5次【聊天】，此时在 `#/event/lines-2.js` 的 talk 方法中检查到小青的好感度高于10点，于是向 hooks.talk 对应的队列中添加了一个事件对象，然后通过设置该对象的属性 event，使该对象转换为的异步函数对象会执行到 `#/event/lines-2.js` 的 interrupt 方法。

然后切换到小红，点击【聊天】，此时游戏脚本会按顺序执行以下内容：

* 触发【聊天】按钮对应的动作，输出一个分割线；
* 调用 sys_get_random_event 尝试获取一个随机事件的可执行版本；
* sys_get_random_event 调用 `#/sys/sys-event-queue.js` 中的函数属性 get_random_event，从【聊天】指令对应的事件队列中获取到一个随机事件；
* sys_get_random_event 将它包装为一个异步函数对象并返回；
* 调用这个异步函数对象，执行到 `#/event/lines-factory.js` 中的 run_custom_lines；
* run_custom_lines 检查参数 event（它应该是一个 EventObject 事件对象或者是 `undefined`），event 不是 `undefined`，并且 event.event 指定了一个口上方法名，而且按照角色ID获取到的小青对应的口上对象中有这个方法，所以 run_custom_lines 选择执行小青对应的口上对象中的 interrupt 方法；
* interrupt 方法中将 arg.result 设置为 false，所以不会执行【聊天】对应的通用处理过程；
* 因为随机事件转换成的异步函数对象执行结果为 true（小青口上对象中的 interrupt 返回了 true），跳过了后续的角色口上执行，所以小红的【聊天】口上不会被执行。

也就是说会显示以下结果：

![小青的随机事件](../imgs/94-小青-打断.png)

# 小结

本章介绍了口上系统的实现，利用了 JavaScript 的类、继承和重载的语法和机制，实现了一个在相同指令下对不同角色输出不同内容、且带有可定制化的通用结果处理的口上系统。作为进阶内容，本章还介绍了如何在口上系统中添加多口上支持，以及如何实现随机事件系统增强剧情事件的表现力。

本章较为深度应用了 JavaScript 的各种机制和特性，理解难度可能稍大，读者可以只掌握基本用法，然后直接取用 [例程](https://gitgud.io/umaera/game/ere-example) 中实现的口上系统 ~~轮子~~，之后在应用中逐渐熟悉即可。

> for 只用轮子的读者：<br>
> 在直接取用的情况下，记住以下关键点即可：
> * 想新增一个可触发口上的指令，需要修改 `#/data/event/hooks.js` 中的枚举定义，在 `#/event/lines-common.js` 中增加同名的函数，在 `#/event/lines-result.js` 中增加相应的结果处理函数；
> * 想新增角色口上，在 `#/event` 下面新增新的口上类并继承 `#/event/lines-common.js` 导出的 CustomizedLines，然后实现有口上的口上方法，并在 `#/event/lines-factory.js` 中注册。
> * 随机事件系统：在指令按钮触发动作里执行口上的地方用 `if (!(await sys_get_random_event(hook)()))` 包起来，用 `#/sys/sys-event-queue.js` 中的 add_event 函数将事件对象 EventObject 添加到指令对应的事件队列中（EventObject 需要设置 event 属性指定对应的口上方法），并在对应角色的口上类里实现一个同名函数（函数的返回类型为 true 时会跳过对应的口上执行）。