---
title: '#6 输出'
---

第五章笔者介绍了基本的输入输出API，如何使用这些API实现基本交互逻辑，以及所有的 era.input 系 API。任何复杂的游戏都是在基本交互逻辑的基础上扩展而来，或者从输出端扩展，或者从输入端扩展。因此本章主要介绍从输出端扩展基本交互逻辑的方法和工具：era.print 系指令。

> 在开始之前笔者在此重复一下之前提过而本章即将用到的重要概念：
> * `#/era-electron.js`文件称为 **SDK**，会导出一个对象，其中的函数被称为 **API**；
> * `#/era-electron.js`一般通过 **`const era = require('#/era-electron');`** 指令导入，通过 **`era.*`** 调用；
> * era.input 系 API 全都涉及玩家交互，因此全都是**异步函数**，调用时必须用 await 关键词转同步逻辑处理。

本章将从标题界面的实现开始，在推进读者之前创建的游戏项目的同时介绍扩展基本交互逻辑输出端的主要思路，然后介绍 era.print 系指令。

# 标题界面的实现

本节以标题界面的实现为例来介绍基本交互逻辑输出端的扩展方法和主要思路。标题界面是游戏展现给玩家的第一个界面，玩家需要与这个界面互动才能进入游戏、查看其他信息或者退出，因此标题界面也是游戏的第一个交互循环（代码上实现了交互逻辑的循环），其他交互循环理论上都是在标题界面的基础上衍生而来。

## 设计

任何开发过程都离不开设计这一步骤，游戏开发也不例外。在本教程中，笔者主要注重设计和实现这两个步骤（当然正式的开发流程比这要长得多）。就标题界面的设计而言，开发者要梳理思路，回答以下问题：

1. 标题界面要展示什么？以什么顺序展示？
2. 标题界面有哪些可互动元素？每个可互动元素分别会导致什么变化？

很显然，标题界面首先要有一个标题，以及开发者、版本号等信息，然后是新游戏、加载存档等功能按钮，这些是标题界面的基本组成元素。其次，标题界面的可互动元素应该是功能按钮，其中新游戏会导向一个新界面，允许玩家捏人和调整游戏的基础设置，然后进入游戏的主要界面；加载存档按钮则会导向加载存档界面，允许玩家查看、选择和删除存档，并在玩家选择存档后加载对应存档并进入主要界面。

根据上面的设计，标题界面应该如下所示：

---

游戏标题（图片或者文本）<br>
游戏版本号（文本）<br>
游戏开发者（文本）

---

开始游戏（按钮）<br>
加载存档（按钮）<br>
鸣谢列表（按钮）

---

其中所有元素都呈居中，点击任何按钮都可以触发下一步互动行为。

## 代码实现

在设计阶段确定界面元素和交互行为后，就要用 API 实现出来了。目前已经介绍过 era.print 可以用于输出文本，era.printButton 可以输出按钮，而 era.input 可以接收经过按钮限制过的玩家输入。为了实现上面设计的标题界面，我们还需要其他的一些 API：era.drawLine，可以输出一条分割线。此外，为了让界面元素居中，还需要用到 era.print 的第二参数和 era.printButton 的第三参数。

首先，打开`#/main.js`文件，然后输入以下内容：
```javascript
const era = require('#/era-electron');

module.exports = async () => {
  let flag = true;
  while (flag) {
    era.drawLine();
    era.print('我是一个游戏标题',{align:'center'});
    // 这里用 era.get 读取了游戏的版本号
    era.print(`v${era.get('gamebase').version / 1000}`,{align:'center'});
    era.print('你',{align:'center'});
    era.drawLine();
    era.printButton('开始游戏',1,{align:'center'});
    era.printButton('加载存档',2,{align:'center'});
    era.printButton('鸣谢列表',3,{align:'center'});
    era.drawLine();
    await era.input();
  }
};
```

然后在引擎中加载游戏，显示如下：

![标题界面](../imgs/11-标题界面.png)

在上面的交互循环中，首先使用 era.drawLine 输出了一条分割线，后续的三个 era.print 每个都输出了一行文本，再一条分割线后的三个 era.printButton 则输出了三个独占一行的按钮，最后是 era.drawLine 和 era.input。

可以注意到，era.print 和 era.printButton 都多了一个对象类型的参数，这个参数在两个 API 的声明中都叫 config，用于向 API 传入输出内容的具体设置。这个例子中传入的设置内容只有 `align:'center'` 一项，它会控制输出的内容在界面中居中。如果读者觉得这样太过繁琐的话，可以使用 era.setAlign 来代替：这个 API 接受表示对齐方式的字符串，设置之后输出内容的默认对齐方式，即只要调用 API 输出内容时传入的 config 参数中没有设置 align，就会按照 era.setAlign 传入的参数来控制对齐方式。在 era.setAlign 的帮助下，`#/main.js`的代码可以简化为如下的内容：
```javascript
// ...
era.drawLine();
era.setAlign('center');
era.print('我是一个游戏标题');
// 这里用 era.get 读取了游戏的版本号
era.print(`v${era.get('gamebase').version / 1000}`);
era.print('你');
era.drawLine();
era.printButton('开始游戏',1);
era.printButton('加载存档',2);
era.printButton('鸣谢列表',3);
era.drawLine();
era.setAlign('left');
await era.input();
// ...
```

与之前的实现相比，在交互循环的一开始通过 era.setAlign 设置后续输出内容的默认对齐方式为居中（`'center'`），之后 era.print 和 era.printButton 都没有传入参数设置对齐方式。注意在最后输入之前又使用 era.setAlign 改为了左对齐，这是为了防止之后的内容也受到影响。

era.drawLine 默认输出的是虚分割线。如果想输出实线，需要传入参数 `{isSolid:true}`，然后引擎中显示的内容如下：

![实分割线](../imgs/12-实分割线.png)

era.drawLine 在声明中接受的参数也名为 config，更多细节可参见 [下文](#eradrawline)。

此外，上面例子中的第二个 era.print 使用了 [模版字符串](./04-js-basic#string) 和 era.get，其中 era.get 读取了 GameBase.csv 中的游戏版本号，具体的用法将在 [#9 静态数据文件](./09-static#eraget-和-eraset) 中介绍。

## 子界面

现在我们有了一个正式的标题界面，其中有三个功能按钮，但还没有实现它们的交互行为。本节笔者将介绍如何实现从属于标题界面的子界面——鸣谢列表界面，以及该过程中使用的 era.clear、era.getLineCount 等 API。

> 在实际开发中，鸣谢列表并不一定需要实现为一个单独的界面，比如EraUma的鸣谢列表就只是将所有鸣谢信息输出出来。实际开发中要面向具体的需求进行设计和开发，本教程将它实现为一个子界面也只是为了举例，目的是为了介绍新的 API 和实现方式。

在本教程中，主要界面是会单独显示的界面，例如标题界面、游戏的正式界面，在显示时会将之前的输出内容全部清空以单独占满引擎的显示区域；与主要界面相对的就是子界面，不会单独占满显示区域，而是会从属于主要界面出现，并且会有独立的交互循环。按照这个定义，[第五章的第三个例子](./05-interaction#通过按钮交互) 中点击按钮后输出的文本并非是子界面，因为它没有独立的交互循环。

首先我们先对之前实现的标题界面进行简单改造。现在的标题界面在点击按钮后会再输出一个标题界面，这不符合一般意义上对标题界面的认知：标题界面作为主界面应该单独占满屏幕，不能这样重复出现。因此我们需要一个新的 API：era.clear。era.clear 是一个**异步函数**，主要功能是清屏，有两种使用方式，这里使用第一种：不带任何参数调用，然后这个 API 会清空整个界面。打开`#/main.js`文件，在循环体的开始新加一行`await era.clear();`：
```javascript
const era = require('#/era-electron');

module.exports = async () => {
  let flag = true;
  while (flag) {
    await era.clear();
    era.drawLine({isSolid:true});
    // ...
  }
};
```

在引擎中重载游戏后，现在点击任何按钮都会回到界面中只有标题界面的状态，也就是在标题界面的每次交互循环中都让标题界面单独显示。点击任何按钮之后因为没有绑定交互行为，所以引擎会直接运行到下一次交互循环，清屏，然后输出标题界面。

然后我们需要给鸣谢列表界面加上交互行为，并在其中输出一个子界面。和标题界面一样，鸣谢列表子界面也需要先设计：

* 鸣谢列表要展示什么：鸣谢列表会按顺序列出所有为游戏项目做出贡献的个人和组织，首先是设计游戏框架和负责实现的游戏开发者，然后是为游戏提供内容的口上作者，最后是帮助测试、反馈意见和维护社区环境的玩家或群体。
* 鸣谢列表有哪些可互动元素：这里将鸣谢列表的要显示的内容分为三类，那么就需要三个按钮来控制输出对应的内容，另外还需要一个按钮来退出鸣谢列表返回标题界面。

实现阶段和标题界面不同的是，标题界面是一个主界面，所以可以每次循环时将屏幕清空然后输出；鸣谢列表界面是一个子界面，它输出的时候上面是有标题界面的，所以不能在交互循环的开始将屏幕清空。读者可能会想：那我把鸣谢列表的那部分清空不就好了？这就是 era.clear 的第二种使用方式：仅清空最后输出的几行。era.clear 可以接受一个正整数参数，然后从屏幕低端清空相应数量的行。在 EraElectron 中，每次单独调用的 era.print 和 era.drawLine 等 API 都会单独输出一行。

综上所述，可以对`#/main.js`进行如下改造：
```javascript
const era = require('#/era-electron');

module.exports = async () => {
  let flag = true;
  while (flag) {
    await era.clear();
    era.setAlign('center');
    era.drawLine({isSolid:true});
    era.print('我是一个游戏标题');
    // 这里用 era.get 读取了游戏的版本号
    era.print(`v${era.get('gamebase').version / 1000}`);
    era.print('你');
    era.drawLine({isSolid:true});
    era.printButton('开始游戏',1);
    era.printButton('加载存档',2);
    era.printButton('鸣谢列表',3);
    era.drawLine({isSolid:true});
    era.setAlign('left');
    if (await era.input() === 3) {
      // 子界面交互循环的开始
      let copyright_flag = true;
      while (copyright_flag) {
        era.setAlign('center');
        era.printButton('开发人员',1);
        era.printButton('口上作者',2);
        era.printButton('社区维护',3);
        era.printButton('回到标题',4);
        era.setAlign('left');
        const ret = await era.input();
        era.setAlign('center');
        switch (ret) {
          case 1:
            await era.printAndWait('这里是开发人员列表');
            break;
          case 2:
            await era.printAndWait('这里是口上作者列表');
            break;
          case 3:
            await era.printAndWait('这里是社区维护列表');
            break;
          case 4:
            copyright_flag = false;
        }
        if (ret < 4) {
          await era.clear(6);
        }
        era.setAlign('left');
      }
    }
  }
};
```

然后在引擎中重载游戏，效果如下图所示：

![鸣谢列表](../imgs/13-鸣谢列表.png)

现在在标题界面点击鸣谢列表后，引擎会禁用之前标题界面的按钮，然后在不清空屏幕的情况下显示鸣谢列表界面。鸣谢列表界面会显示4个居中的按钮，点击前三个按钮之一都会禁用所有按钮然后输出相应的鸣谢信息，因为使用了 era.printAndWait 所以在输出鸣谢信息后会显示按任意键继续。在点击任意键后，界面会回到禁用的标题界面 + 鸣谢列表界面的四个按钮的情况，这是因为 `await era.clear(6);` 将鸣谢列表界面中刚刚输出的内容全部清除，然后重新输出了按钮。

可以看到，`await era.clear(6);` 仅在选择前三个选项时才会被调用，这是因为选择第四个选项会直接跳出鸣谢列表界面的交互循环，进入标题界面的下一次交互循环，然后清空界面再重新输出标题界面。清除的行数是6是因为先输出了4个按钮，然后默认情况下玩家的输入也会被作为单独一行输出一次，然后才是相应鸣谢信息文本的行，即4+1+1。在某些情况下，例如游戏设置中将隐藏用户输入打开，或某些鸣谢信息多于一行，`await era.clear(6);` 就可能不会产生预期的效果。这个时候我们可以使用 era.getLineCount 获取当前输出的行数，然后由计算结果决定要擦除几行，即可以改造成这样：

```javascript
// ***
// 子界面交互循环的开始
const curr_line = era.getLineCount();
let copyright_flag = true;
while (copyright_flag) {
  era.setAlign('center');
  era.printButton('开发人员',1);
  era.printButton('口上作者',2);
  era.printButton('社区维护',3);
  era.printButton('回到标题',4);
  era.setAlign('left');
  const ret = await era.input();
  era.setAlign('center');
  switch (ret) {
    case 1:
      await era.printAndWait('这里是开发人员列表');
      break;
    case 2:
      await era.printAndWait('这里是口上作者列表');
      break;
    case 3:
      await era.printAndWait('这里是社区维护列表');
      break;
    case 4:
      copyright_flag = false;
  }
  if (ret < 4) {
    await era.clear(era.getLineCount() - curr_line);
  }
  era.setAlign('left');
}
// ***
```

引擎中重载游戏后可以得到一样的效果。在新的代码中，我们在进入鸣谢列表子界面之前先用 era.getLineCount 获取了一次当前输出的行数，在要清除屏幕的地方又获取了一次行数，因为第一次获取的行数不包括鸣谢列表子界面的输出内容而第二次获取的将其包括在内，两次获取的行数的差值就是鸣谢列表界面总共输出的行数，用 era.clear 清除相应的行数就可以达到预期的结果。

# era.print 系 API

## era.print

![era.print](../imgs/14-era.print.png)

用于输出文本的 API。era.print 接受两个参数，第一个参数 content 是要输出的内容，第二个参数 config 则是对本次输出效果的控制。era.print 返回 Number 类型的返回值，表示输出这一行后显示在界面上的行数。

content 参数有如下几种可能：

* 一个字符串，即输出一个字符串，此时可以通过在字符串中输出`'\n'`来将文本分割为两行；
* 一个对象数组，会按照对象数组中的内容分段输出，一个元素一段，但仍属于同一行。其中每个对象可能是以下几种之一：
    * PrintedSpan：这是一种自定义的对象，必须有一个 String 类型的 content 属性，以及 color、fontSize、fontStyle、fontWeight、url 等 String 类型的可选属性。

        ![PrintedSpan](../imgs/15-printed-span.png)

        * content：这一段的具体文本，String 类型；
        * color：这一段文本的颜色，String 类型，可以是颜色的英语名（如`red`）、rgb形式的字符串（`rgb(255,0,0)`）或者#开头的十六进制字符串（`#ff0000`），即 CSS 标准中 color 的任意合法取值（可以参考 [RGB颜色对照表](https://tool.oschina.net/commons?type=3) 确定颜色对应的英文名、RGB值和十六进制值），默认值为`'#ffffff'`，即白色；
        * display：显示方式，一般设置为`'inline-block'`使这段文本不会自动换行；
        * fontSize：字号，Number 类型，带有单位的数字，单位可以是px（像素）、em和rem等，比较常用的是px和rem，其中rem是EraElectron引擎推荐的单位，1rem恒等于游戏配置中设置的字号，2rem会是游戏配置中设置的字号的2倍，以此类推，因此以rem为单位设置字号可以使字号随游戏配置中的设置而变化；
        * fontStyle：文本的样式，String 类型，主要用于设置斜体文本，设置为`'italic'`或`'oblique'`时文本就会显示为斜体，其中`'oblique'`还可以后带一个度数来控制倾斜的程度，如`'oblique 10deg'`；
        * fontWeight：文本的粗细程度，String 类型，设置为`'bold'`即可设置为粗体；
        * title：这段文本的注释，String 类型，会在鼠标悬浮在这段文字一段时间后在文字附近弹出悬浮框显示出来，在其中输入`\n`可以换行；
        * url：一个网址，设置这个属性后这段文本会变成一个超链接，点击后会在默认浏览器中打开相应的网页。
    
    * `{isBlank:true}`：用于输出空格，一个该对象可以输出一个空格，宽度约为半个中文字符；

        > 为什么要用这个对象来输出空格：EraElectron引擎本质会将游戏界面显示在HTML中，HTML有一个特性就是会压缩多个空格，即多个连续输出的空格会显示为一个，所以单纯在字符串中写多个空格也会被压缩为一个。

    * `{isBr}`：换行，注意这里的换行只是显示意义上的，即在输出后前后两段文本会显示在不同的行中，但是在编程意义上它们仍然属于EraElectron引擎前端的同一行，调用 `await era.clear(1);` 会一同清除它们；此外，如果想在末尾输出空行的话，需要打连续两个该对象；
    * `{isDivider}`：会输出一个竖形的分割线；
    * 字符串：即这一段具体的文本。

![文本设置对象](../imgs/14.1-TextConfig.png)

config 参数为可选的对象类型的参数，可以有以下可选属性：

* align：这一行文本的对齐方式，有`'left'`左对齐、`'center'`居中和`'right'`右对齐三种，默认为左对齐；
* color：String 类型，这一行文本的颜色；
* fontSize：String 类型，这一行文本的字号；
* isParagraph：Boolean 类型，是否要将这一段文本显示为一个段落，显示为段落的话这一行文本和上下的行之间会出现比较宽的空隙，默认为否；<br>
    ![段落文本和非段落文本](../imgs/16-isParagraph.png)
* offset：Number 类型，这一行的偏移量，具体用法见 [#8 排版](./08-ui#偏移量offset与宽度width)；
* width：Number 类型，这一行的宽度，具体用法见 [#8 排版](./08-ui#偏移量offset与宽度width)。

如果 era.print 的第一个参数 content 没有任何有效内容（是空字符串`''`或由`undefined`、0或者空字符串组成的数组），era.print 会调用 era.println 输出空行并返回。

## era.replaceText

![era.replaceText](../imgs/17-era.replaceText.png)

会将此前最后输出的行替换成传入 API 的参数对应的文本，可以看到它的参数和 era.print 是完全相同的，但是返回值会和在此时调用的 era.getLineCount 相同。

注意替换的是**此前最后输出的行**，也就是说如果未设置【隐藏用户输入】，即使输出的玩家输入的内容也会被替换。

## era.printButton

![era.printButton](../imgs/18-era.printButton.png)

用于输出按钮的 API，会以 Number 类型返回输出按钮后显示在界面上的行数。

era.printButton 的声明中有三个参数，String 类型的 content 和 Number 类型的 accelerator 是必须的，分别表示按钮的内容和数字快捷键。

![ButtonConfig](../imgs/18.1-ButtonConfig.png)

第三个参数 config 是对象类型的可选参数，可以有以下可选属性：

* align：String 类型，按钮的对齐方式；
* badge：String 类型，按钮的 ~~吧唧~~ 徽章，在按钮以按钮形式输出时会在右上角额外显示的信息，`'dot'`时就是单纯的一个点，其他字符串则会显示对应的信息，如果不填就不会显示；
* buttonType：String 类型，按钮颜色的几种预设类型，`'primary'`对应蓝色按钮，`'success'`对应绿色，`'warning'`对应黄色，`'danger'`对应红色，`'info'`对应灰色，`''`对应白色；以按钮形式输出时默认值是白色，以选项形式输出时默认值是黄色；
* color：String 类型，按钮的颜色，可以设置为预设类型之外的颜色，但注意和isButton不会同时生效（isButton为是时会严格按照buttonType设置颜色）；
* disabled：Boolean 类型，是否禁用按钮，被禁用时按钮无法被点击，输入对应的快捷键也不会返回给游戏脚本；
* disableWarning：Boolean 类型，如果快捷键重复，是否禁用警告，如果是否则会在控制台输出相应的报错信息，详情见 [#7 调试与控制台](./07-debug)，默认值为否；
* inTextAlign：String 类型，按钮内文本的对齐方式，和 align 的取值范围相同，但是默认值是居中；
* isButton：Boolean 类型，是否以按钮形式输出按钮，取是时输出为按钮，取默认值（否）时会输出为选项（链接）；
* offset：Number 类型，按钮的偏移量；
* showAcc：Boolean 类型，是否显示按钮的快捷键，取 `true` 时按钮文字会显示为 `[快捷键] 按钮文本`，取 `false` 时会显示为 `[按钮文本]`，在 PC 引擎中默认值为是（`true`），但在安卓引擎上恒为否（`false`）；
* title：String 类型，按钮的悬浮提示（3.5.0加入）；
* width：Number 类型，按钮的宽度。

![按钮](../imgs/19-按钮.png)

## era.printImage

用于输出图片的 API，返回输出该图片后显示在界面上的行数，具体用法将在 [#16 多媒体资源处理](./16-resources#eraprintimage) 中介绍。

## era.printLineChart

![LineChart](../imgs/21-era.printLineChart.png)

用于输出折线图的 API，参数和 [chart.js](https://chart.nodejs.cn/) 中 [line chart](https://chart.nodejs.cn/docs/latest/charts/line.html) 的 option 相同

> 非常进阶的内容，需要用到的时候来社区对接吧……

## era.println

![换行](../imgs/22-era.println.png)

用于在编程意义上换行的 API，会输出一个新的空行，注意和 era.print 中的换行区分：`await era.clear(1);` 只会清除 `era.println();` 刚输出的空行（在编程意义上是新的一行），而对 era.print 而言会把换行前后的内容一起擦除（在编程意义上换行前后的内容是同一行）。

```javascript
// 以下两行代码会输出一行文本和一个空行
// 调用了两次 API，在编程意义上就是两行
era.print('这里是一行文字');
era.println();
// era.clear 只会清除最后输出的空行
await era.clear(1);

// 以下一行代码也会输出一行文本和一个空行
// 调用了一次 API，在编程意义上只是一行
era.print('这里是一行文字\n\n');
// era.clear 会把文本和空行一起清除
await era.clear(1);
```

## era.printProgress

![进度条](../imgs/23-era.printProgress.png)

用于输出进度条的 API，会以 Number 类型返回输出进度条后显示在界面上的行数。

era.printProgress 声明了4个参数：

* percentage：Number 类型，必选，指定进度条的进度，0-100之间的有理数，表示进度条的进度百分比；
* inContent：String 类型，必选，进度条内的文本；
* outContent：String 类型，必选，紧跟进度条的文本；
* config：对象类型，可选，用于控制进度条的输出，可以有以下可选属性：
    
    ![ProgressConfig](../imgs/23.1-ProgressConfig.png)

    * align：String 类型，进度条的对齐方式；
    * barWidth：Number 类型，进度条在进度条和紧跟文本的总宽度中所占的宽度，可以取1-24之间的值，取24时意味着没有紧跟的文本，进度条占满这一行；
    * color：String 类型，进度条的颜色；
    * fontColor：String 类型，进度条内外文本的颜色；
    * height：Number 类型，进度条的高度，单位为像素，可以取6-30之间的值，默认值是24px（像素）；
    * offset：Number 类型，进度条的偏移量；
    * width：Number 类型，进度条的宽度。

```javascript
era.printProgress(100,'我是一个进度条，我占满了这一行','');
era.printProgress(50,'我是一个进度条，我占了一半的宽度','谢谢前面的老爷😠',{barWidth:12});
era.printProgress(100,'我是一个红色的进度条','',{color:'red'});
era.printProgress(100,'我是一个绿色的进度条，我的文字是黑色的','',{color:'green',fontColor:'black'});
era.printProgress(100,'我是一个紫色的进度条，我的文字是灰色的','那我呢',{barWidth:20,color:'purple',fontColor:'grey'});
```

上面的代码会输出下面几种进度条：

![进度条](../imgs/24-进度条.png)

## era.printWholeImage

用于输出图片的 API，返回输出该图片后显示在界面上的行数，具体用法将在 [#16 多媒体资源处理](./16-resources#eraprintwholeimage) 中介绍。

## era.drawLine

![分割线](../imgs/25-era.drawLine.png)

用于输出横向分割线的 API，返回输出该分割线后显示在界面上的行数，可以接受对象类型的可选参数 config。

![DividerConfig](../imgs/25.1-DividerConfig.png)

config 可以有如下可选属性：

* content：String 类型，显示在分割线上的文本；
* position：String 类型，分割线上文本的位置，`'left'`、`'center'`、`'right'`，分别代表左中右，默认值是`'center'`；
* isSolid：Boolean 类型，控制分割线是实线还是虚线，默认值是否（虚线）；
* offset：Number 类型，分割线的偏移量。
* width：Number 类型，分割线的宽度。

## era.notify

![提醒](../imgs/26-era.notify.png)

用于在界面右上角显示浮动的提醒信息的 API，因为不会在界面上输出内容所以没有返回值（`undefined`）。

era.notify 声明了4个参数：

* content：提醒信息的文本内容，可以是 String 类型或对象数组，对象数组的情况下是分段形式的文本内容，数组的元素有如下几种可能：
    * 文本对象：这一段文本的对象，有如下属性：
        * content：String 类型，必选，这段文本的内容；
        * color：String 类型，可选，这段文本的颜色；
        * fontSize：String 类型，字号；
        * fontWeight：String 类型，是否加粗。
    * `{isBr:true}`：用于给前后两段文本换行。
* title：String 类型，可选，这段提醒信息的标题；
* type：String 类型，可选，这段提醒信息的类型，设置之后会在提醒信息的左上角显示对应颜色的图标，分别为`'success'`（成功）、`'info'`（信息）、`'warning'`（警告）、`'error'`（报错）和默认值`''`（不显示任何图标）；
* duration：Number 类型，可选，这段提醒信息的持续时间，持续时间结束后会自动消失，单位是毫秒，默认是 5,000（5秒）；如果设置为0，则提醒信息不会自动消失。

![提醒信息](../imgs/27-提醒信息.png)

提醒信息可以用来提示获得成就或发生的重要错误等。

# 用于辅助输出的其他 API

除上述 era.print 系 API 之外，还有一些 API 虽然不会直接输出内容，但是具备一定的辅助作用。

## era.clear

![清屏](../imgs/28-era.clear.png)

用于清除屏幕的 API，返回值是清屏之后界面上显示的行数。era.clear 具有 Number 类型的可选参数 lineCount，不设置时会清空整个屏幕，设置时会清空从最后输出的行往上的 lineCount 行内容。

注意 era.clear 是一个**异步函数**，使用时必须带 await 关键词转同步逻辑处理。

按右键快进显示时如果遇到 era.clear 会在清屏前停下。

## era.delay

![等待](../imgs/29-era.delay.png)

用于等待一段时间的 API，会将游戏脚本执行强行静止一段时间，时间结束后才会继续后续的逻辑。Number 类型的参数 delay 是要等待的时间，单位是毫秒。

注意 era.delay 会改变交互行为，所以也是一个**异步函数**，使用时必须带 await 关键词转同步逻辑处理。

> 读过 [异步与等待的进阶内容](./04-js-basic#进阶异步与promise机制) 的读者知道，async 关键词的本质是把函数的返回值包上了一个 Promise，await 本质上也是 Promise 对象使用的关键词。这里 era.delay 虽然没有加 async 关键词，但返回了 Promise，因此也是异步函数。

另外等待本质上会卡住游戏脚本，所以等待时间不宜过长。

## era.getLineCount

![行号](../imgs/30-era.getLineCount.png)

用于获取当前界面上显示的行数的 API，没有参数，返回 Number 类型的行数（自然数）。

## era.setAlign

![设置排版](../imgs/31-era.setAlign.png)

可以设置之后输出内容的默认对齐方式的 API，参数 textAlign 有 `'left'`、`'center'`、`'right'`三种取值，分别代表左对齐、居中和右对齐。

默认情况下，输出内容的默认对齐方式是左对齐。建议在使用 era.setAlign 设置对齐方式并输出一些内容后再将默认对齐方式改回 `'left'`，以避免不可预期的显示错误。

## era.setMask

可以设置界面滤镜的 API，具体用法将在 [#16 多媒体资源处理](./16-resources#erasetmask) 中介绍。

## era.setTitle

![设置标题](../imgs/32-era.setTitle.png)

可以设置游戏标题的 API，String 类型的参数 title 是将要改成的游戏标题。

游戏标题显示在引擎界面的标题栏，默认值为`${游戏名} v${游戏版本代号或版本号除以1,000} @ ${游戏ID}`，这个模版字符串中的变量的取值将在 [#9 静态数据文件](./09-static#gamebasecsv) 中介绍。

## era.setToBottom

![置底](../imgs/33-era.setToBottom.png)

可以将之后输出的内容置于页面底部的 API，本质上是输出了一个高度和界面高度相同的空行，所以返回的是输出这个高空行之后界面上显示的行数。

# 小结

本章介绍了从输出端扩展基本交互逻辑以输出界面的思路和方法，以及主要工具 era.drawLine、era.clear 和 era.getLineCount 等 API，其中 era.drawLine 可以输出分割线，era.clear 可以清除整个屏幕或者从底部清除一定数量的行，era.getLineCount 可以获得当前输出的行数以配合 era.clear 使用。然后本章列出了所有 era.print 系 API 以及所有用于辅助输出的其他 API。有了这些 API，开发者就可以按行构建游戏的界面并进行一定的排版。

需要注意的是，era.clear 和 era.delay 是**异步函数**，使用的时候需要用 await 关键词转同步逻辑处理。