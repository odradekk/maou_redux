---
title: '#5 基本交互'
---

本章是「需要一点基础的ere游戏开发」第二部分「实际操作篇」的第一章。经过第一部分的教学，相信读者已经对ere游戏、游戏运行逻辑、游戏配置 ~~以及JavaScript的基础知识~~ 等概念建立了基本了解，完成了 [开发环境的配置](./02-ide)，并且 [创建了游戏项目](./01-basic#一切的开始新建项目)，那么从本章开始我们将深入ere游戏的开发过程，从基本交互逻辑开始，逐渐丰满游戏的表现形式，开始ere游戏开发真正意义上的第一步。

在正式开始之前，请读者检查自己是否完成了开发环境配置和游戏项目创建，如果还未完成可以通过上面的超链接回到相应的部分。本教程从本章开始默认使用Webstorm开发环境，游戏脚本语言为JavaScript。如果遇到看不懂的JavaScript代码可以随时回到 [#4 必备的JavaScript知识](./04-js-basic) 查漏补缺。

# SDK 与 API

被称为 SDK 的 `#/era-electron.js` 文件是游戏脚本控制引擎的核心，其中定义了很多函数，在读取游戏脚本结束后引擎会建立相关功能与 SDK 中函数的连接，然后游戏脚本才能通过这些函数去控制引擎的各项功能。这些函数我们称之为引擎向游戏脚本提供的 **API**，因此下文中出现的 API 均指从 SDK 中引入的函数。

一般情况下，游戏脚本会将 SDK 引入为常量 era，然后就可以通过 `era.*` 的形式去调用API；也可以使用解构赋值语法从 SDK 中部分引入 API，然后直接使用 API 名去调用。
```javascript
// 普通引入与使用
const era = require('#/era-electron');

era.print("Hello World!");

// 解构赋值引入与使用
const { print } = require('#/era-electron');

print("Hello World!");
```

# 构建基本交互逻辑

交互（Interaction）是任何游戏的核心，指的是玩家和游戏逻辑的、可以改变游戏逻辑运行的互动。没有任何交互的游戏不能称之为游戏。交互是双向的，游戏逻辑通过输出向玩家展现文本、图片等信息，而玩家则通过输入向游戏逻辑提供指令等信息，因此游戏输出-玩家输入的循环可以构成一个基本的交互逻辑。任意复杂的游戏都是从一个基本的交互逻辑拓展的。

## 输出与输入

ere SDK 提供了丰富的 API 用于输出文本、图片、进度条、分割线等，统称为 era.print 系；用于输入的 API 则相对简单，统称为 era.input 系（虽然只有两个）。这两系 API 的代表 era.print 和 era.input 也是最基础的输出和输入指令，可以用于构建基本交互逻辑。其中 era.input 系 API 因为都涉及到玩家输入，所以都是**异步函数**，调用时[必须加 await 关键词以同步逻辑处理](./04-js-basic#异步async与等待await)。

打开 `#/main.js`，在其中输入以下内容：
```javascript
const era = require('#/era-electron');

module.exports = async () => {
  let flag = true;
  while (flag) {
    era.print('Hello World!');
    await era.input();
  }
};
```
然后在引擎中打开，进入游戏，引擎会显示如下内容：

![基本交互逻辑](../imgs/5-基本交互逻辑.png)

现在引擎显示`"Hello World!"`，然后输入框处于激活状态，输入任意文字并回车后引擎会将玩家输入的内容输出出来，然后再输出一行`"Hello World!"`继续等待玩家输入。

根据上面的定义，游戏会输出信息，玩家会输入信息，且游戏的运行逻辑因玩家的输入信息发生了变化（输出了玩家输入的文字），这就是游戏的基本交互逻辑，代码上实现了交互逻辑的循环可称为交互循环。

## 通过简单处理实现傻瓜AI

有基本交互逻辑后，这个项目可以正式称为一个游戏了，即使不具备任何玩法、剧情或演出。为了能回答 [#1 基本知识 中提出的问题](./01-basic#小结)，我们还需要继续扩展基本交互逻辑。简单讲，就是将输出变得更复杂，或者输入变得更复杂。在实际开发过程中，我们选择的一般是前者。

本节笔者将使用一个例子来介绍对基本交互逻辑的扩展，这个例子来自于有一定年头的网络模因：说什么就答什么的傻瓜AI（非常可惜的是，笔者没搜到来源链接）。

打开 `#/main.js`，在其中输入以下内容：
```javascript
const era = require('#/era-electron');

module.exports = async () => {
  let flag = true;
  era.print('你好，我是一个傻瓜AI，你可以问我任何问题！');
  while (flag) {
    // 玩家输入的可能是数字，以防万一这里将所有输入内容都转换为字符串
    const ret = (await era.input()).toString();
    // String.replace 是 JavaScript 中每个字符串都有的内置函数，作用是内容替换
    // 这里用的是正则表达式的方式，先不要深究，总之只要知道是把玩家输入中的一些文字替换了就好了
    era.print(ret.replace(/你/g,'我').replace(/吗？/g,'。'));
  }
};
```
然后在引擎中重新载入游戏，此时引擎显示的内容变成了：

![傻瓜AI](../imgs/6-傻瓜AI.png)

现在引擎会在游戏开头输出一行 `'你好，我是一个傻瓜AI，你可以问我任何问题！'`，然后等待玩家输入。在玩家输入后，游戏会将玩家输入的任何文字中的`'你'`替换成`'我'`，`'吗？'`替换成`'。'`，然后在玩家非常配合的情况下就能实现玩家问什么游戏答什么的傻瓜AI。

之所以叫傻瓜，是因为万一玩家不配合，比如问一个`'特别周为什么不A上去？'`之类的问题游戏就会原样输出，本质上其实只是一坨连人工智障都称不上的娱乐代码。但不管这个AI如何呆傻，我们都达成了我们的目的：对基本交互逻辑进行扩展，将输出的部分变得更复杂，然后得到了一个有一点可玩性的游戏。

## 通过按钮交互

上面的例子都要求玩家打字输入，对游戏体验来说实在过于繁琐，而且也不容易限制玩家的输入。有一则码农笑话讲了成群的测试工程师在酒吧前台要了各种稀奇古怪的东西，酒吧运行如常，然后一名顾客点了一份炒饭导致酒吧炸了[^1]。这个笑话其实就说明了限制玩家输入的必要性。

[^1]: [一个测试工程师走进一家酒吧 · 测试之家](https://testerhome.com/topics/10562)

ere游戏中使用按钮来限制玩家的输入，这用到了 era.print 系 API 中的 era.printButton。这个 API 会在引擎中输出一个带有快捷键的按钮，之后玩家可以通过在输入框输入按钮的快捷键或者直接点击按钮来选择这个按钮，然后游戏逻辑将得到这个按钮的快捷键作为返回值，即一个被限制范围的玩家输入。

打开 `#/main.js`，在其中输入以下内容：
```javascript
const era = require('#/era-electron');

module.exports = async () => {
  let flag = true;
  era.print('Hello World!');
  while (flag) {
    era.printButton('进入游戏',1);
    era.printButton('离开游戏',2);
    const ret = await era.input();
    if (ret === 1) {
      era.print('没有游戏可以进入。')
    } else if (ret === 2) {
      era.print('再见~');
      flag = false;
    } else {
      era.print('不存在的第三选项。');
    }
  }
};
```
然后在引擎中重新载入游戏，此时引擎显示的内容变成了：

![按钮交互](../imgs/7-按钮交互.png)

现在游戏开始时会输出一行`'Hello World!'`，然后输出两个选项让玩家选择，玩家可以通过输入快捷键或直接点击按钮进行输入：选择1选项会输出`'没有游戏可以进入。'`，然后再次输出两个按钮；选择2选项会输出`'再见~'`然后禁用输出框，这是因为跳出了循环并运行到了游戏脚本结束，游戏逻辑就不再和玩家交互了。玩家可以在输入框中输入任意文字，但只要不是1或者2其中之一，上方就会出现提示框说明输入不合法，以及什么值是合法的，这保证了游戏逻辑不会获得已输出按钮的快捷键之外的输入内容，即限制了玩家的输入，因此`'不存在的第三选项。'`永远不会被输出到引擎中。

在每次 era.input 之后，之前输出的按钮就会被禁用，无法被点击，输入快捷键也无法选择它们，即对一次 era.input 而言，有效的按钮是上次 era.input 之后、本次 era.input 之前调用的 era.printButton 输出的。注意要给两次 era.input 之间输出的按钮**不同的快捷键**。

era.printButton 还可以接受第三参数，更多的细节参见 [#6 输出](./06-output#eraprintbutton)。

如果 era.input 之前没有输出任何按钮，玩家输入将不受任何限制，era.input 会返回它接受到的任意值（不会是`undefined`或空字符串`''`）。一般情况下，游戏中应该只有供玩家对角色或存档取名等少数地方会使用不受限的 era.input，而其他的 era.input 都应该配合按钮使用。

# era.input 系 API

真正意义上的 era.input 系 API 其实只有两个，等待玩家输入的 era.input 和等待玩家按任意键的 era.waitAnyKey。然而在游戏演出中存在玩家点一下输出一行的需求，因此就有了 era.input 和 era.print 两系 API 杂交得到的 era.printAndWait。

注意 era.input 系 API 都是**异步函数**，调用时**必须加 await 关键词以同步逻辑处理**！

## era.input

![era.input](../imgs/8-era.input.png)

上图是 SDK 中对 era.input 的介绍。era.input 可以接受一个对象类型的可选参数 config，在没有传参时则遵循默认行为。era.input 返回玩家输入的内容。参数 config 可以有以下可选属性：

* disableBefore：Boolean，接收到玩家输入后是否禁用之前输出的按钮，默认为是；
* rule：String，字符串形式定义的正则表达式，可以用于限制玩家的输入（进阶内容，一般用不到）；
* useRule：Boolean，是否启用规则检查，和 rule 配合使用；
* hideInput：Boolean，是否隐藏玩家的输入，默认为否，设置为是时本次玩家的输入将不会被输出到引擎中；
* show：（仅限安卓版）是否显示输入框，为否时当使用按钮限制玩家输入时输入框将不会显示。

在输出了按钮的情况下，era.input 只会接受玩家输入的按钮的快捷键值（Number 类型）；在未输出按钮的情况下，era.input 会返回玩家输入的任意内容。

**注意 era.input 会试图将玩家输入转换为 Number 类型，所以如果预期的输入是 String 需要自行转换（如 [上文](#通过简单处理实现傻瓜ai) 的例子）。**

## era.waitAnyKey

![era.waitAnyKey](../imgs/9-era.waitAnyKey.png)

上图是 SDK 中对 era.waitAnyKey 的介绍。era.waitAnyKey 没有任何参数，也没有任何返回值（或者说返回值是 `undefined`）。这个 API 会暂停游戏逻辑的运行，直到玩家输入任意键（点击界面或在输入框中按下任意键盘按键）后才会继续后面的逻辑。

如果连续调用多次 era.waitAnyKey，引擎会自动屏蔽多余的 era.waitAnyKey，即任何连续的 era.waitAnyKey（中间没有调用其他的输出 API）**只会生效一次**。

## era.printAndWait（杂交版）

![era.printAndWait](../imgs/10-era.printAndWait.png)

上图是 SDK 中对 era.printAndWait 的介绍。era.printAndWait 接受和 era.print 一样的参数，在输出内容后会自动调用一次 era.waitAnyKey，然后和 era.print 一样返回行号。

参数具体的细节可见 [era.print 的介绍](./06-output#eraprint)。

# 小结

本章介绍了基本交互逻辑的构建，用于构建的主要工具 era.print、era.printButton 和 era.input，以及所有的 era.input 系 API。一般使用 while 将 era.print 和 era.input 包起来就可以实现基本的交互循环（代码中实现交互逻辑的循环），era.printButton 则用于限制玩家输入。era.input 系 API 是用于获取玩家输入的 API，全部是异步函数，因此在使用时都需要使用 await 关键词转同步逻辑。