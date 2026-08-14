---
title: '#17 多线程'
---

本章介绍如何通过不使用 await 关键词调用异步函数来实现多线程处理，在阅读之前请确认了解了 [第四章中的相关内容](./04-js-basic#异步async与等待await)。

# 多线程基础

线程（英语：thread）在计算机科学中，是将进程划分为两个或多个线程（实例）或子进程，由单处理器（单线程）或多处理器（多线程）或多核处理系统并发执行。[^1]

[^1]: [线程 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/线程)

多线程（英语：multithreading），是指从软件或者硬件上实现多个线程并发执行的技术。具有多线程能力的计算机因有硬件支持而能够在同一时间执行多于一个线程，进而提升整体处理性能。[^2]

[^2]: [多线程 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/多线程)

在EraElectron引擎中，多线程则主要侧重于将脚本逻辑分成两股同时推进，这样即使其中一个因等待玩家输入而暂停时另一个也可以继续计算。

> Node.js并不具备一般意义上的多线程，因为Node.js本质上是在单线程中靠事件驱动的。

## Promise 链式调用

以下内容摘自 [Promise | JavaScript - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)：

> Promise.then()、Promise.catch() 和 Promise.finally() 方法用于将进一步的操作与已敲定的 Promise 相关联。由于这些方法返回 Promise，因此它们可以被链式调用。<br>
> .then() 方法最多接受两个参数；第一个参数是 Promise 兑现时的回调函数，第二个参数是 Promise 拒绝时的回调函数。每个 .then() 返回一个新生成的 Promise 对象，这个对象可被用于链式调用，例如：
> ```javascript
> const myPromise = new Promise((resolve, reject) => {
>   setTimeout(() => {
>     resolve("foo");
>   }, 300);
> });
> 
> myPromise
>   .then(handleFulfilledA, handleRejectedA)
>   .then(handleFulfilledB, handleRejectedB)
>   .then(handleFulfilledC, handleRejectedC);
> ```
> 即使 .then() 缺少返回 Promise 对象的回调函数，处理程序仍会继续到链的下一个链式调用。因此，在最终的 .catch() 之前，可以安全地省略每个链式调用中处理已拒绝状态的回调函数。<br>
> 在每个 .then() 中处理被拒绝的 Promise 对于 Promise 链的下游有重要的影响。有时候别无选择，因为有的错误必须立即被处理。在这种情况下，必须抛出某种类型的错误以维护链中的错误状态。另一方面，在没有迫切需要的情况下，最好将错误处理留到最后一个 .catch() 语句。.catch() 其实就是一个没有为 Promise 兑现时的回调函数留出空位的 .then()。
> ```javascript
> myPromise
>   .then(handleFulfilledA)
>   .then(handleFulfilledB)
>   .then(handleFulfilledC)
>   .catch(handleRejectedAny);
> ```

在EraElectron引擎中一般只需要使用 Promise.then，极少情况下会用到 Promise.catch。

## 基于 Promise 的多线程处理

在 Promise 的帮助下，ere游戏可以实现以下的多线程处理：

```javascript
era.delay(1000).then(() => {
  // 任意计算逻辑
  // config.flush 是一个隐藏的参数，强制将 era.print 的内容输出
  // 这和EraElectron引擎的实现细节有关，可以不用深究
  // 这里只为举例，下文的功能实现中会换成其他逻辑
  era.print('World!', { flush: true });
});
await era.printAndWait('Hello,');
```

上面的例子中，引擎会先输出一行 `Hello,`，无需任何操作，等待1秒以后会自动输出一行 `World!`。

era.delay 返回了一个 Promise，因此可以通过 .then() 接后续处理。在脚本的正常逻辑中加入一个会返回 Promise 的 API 调用，然后接 .then()，这就是ere游戏中较为常见的多线程处理逻辑。

# 基于多线程的游戏功能实现

将上面的逻辑稍微变形，就可以实现多种功能。本节将简单介绍以下几种：选项延迟出现、选择超时返回默认选项、跳过动态演出等。

这些例子将以完整的 main.js 文件放出，不在例程中演示，请读者按需取用。

## 延时选项

```javascript
// #/main.js
// ...
const buffer = [];
buffer.push(
  {
    accelerator: 1,
    content: '选项1',
    type: 'button',
  },
  {
    accelerator: 2,
    content: '选项2',
    type: 'button',
  }
);
// 使用 era.printInColRows 将所有选项显示在一行
era.printInColRows(buffer);
// 这里为 ret 赋初始值，用于在显示新选项时判断玩家是否已经选择
let ret = -1;
era.delay(2000).then(() => {
  // 2秒后，如果 ret 还是初始值 -1，表示玩家还没选择
  if (ret === -1) {
    buffer.push({
      accelerator: 3,
      content: '2秒后，我出现',
      type: 'button',
    });
    // 使用 era.replaceInColRows 替换整行，以使新的选项出现
    era.replaceInColRows(buffer);
  }
});
ret = await era.input();
switch (ret) {
  case 1:
    era.print('选项1');
    break;
  case 2:
    era.print('选项2');
    break;
  case 3:
    era.print('选项3');
}
// ...
```

最终实现的效果是，在进入游戏后首先输出两行按钮 `[1] 选项1` 和 `[2] 选项2`，然后等待玩家选择。如果玩家选择了任意一个选项，则无事发生；如果玩家不点击任何按钮等待2秒，则会出现第三行按钮 `[3] 2秒后，我出现`。

## 超时默认

选择超时返回默认选项的逻辑和选项延迟出现类似：

```javascript
// #/main.js
// ...
const buffer = [];
buffer.push(
  {
    accelerator: 1,
    content: '选项1',
    type: 'button',
  },
  {
    accelerator: 2,
    content: '选项2',
    type: 'button',
  }
);
// 使用 era.printInColRows 将所有选项显示在一行
era.printInColRows(buffer);
// 这里为 ret 赋初始值，用于在显示新选项时判断玩家是否已经选择
let ret = -1;
era.delay(2000).then(() => {
  // 2秒后，如果 ret 还是初始值 -1，表示玩家还没选择
  if (ret === -1) {
    buffer[0] = {
      content: '你没有选择',
      type: 'text',
    }
    // 使用 era.replaceInColRows 替换整行，以只留下默认值
    era.replaceInColRows(buffer);
  }
});
ret = await era.input();
switch (ret) {
  case 1:
    era.print('选项1');
    break;
  case 2:
    era.print('选项2');
}
// ...
```

最终实现的效果是，在进入游戏后首先输出两行按钮 `[1] 选项1` 和 `[2] 选项2`，然后等待玩家选择。如果玩家选择了任意一个选项，则无事发生；如果玩家不点击任何按钮等待2秒，则第一行按钮 `[1] 选项1` 会被替换为文本 `你没有选择`，此时只剩下 `[2] 选项2` 可以点击。

以上两种功能可以结合起来，在等待一段时间后将所有2个按钮都删去，输出一些文本和第三个选项，作为选择超时之后的默认值。

## 跳过演出

使用 era.replaceText/era.replaceInColRows 和 era.delay，可以实现一定的动态演出效果。在此基础上，可以通过多线程处理实现跳过演出的功能。

```javascript
// #/main.js
// ...
// 这一行会在后面不断被替换掉，实现内容刷新
await era.printAndWait('先输出一行。');
let flag = true, count = 0;
// 开始等待结束按钮的输入
// 当玩家按下结束按钮之后，通过设置 flag 为 false 结束演出
era.input({ show: false }).then(() => (flag = false));
while (flag) {
  // 每 200ms 增加一次计数器，并替换内容实现刷新
  era.replaceInColRows([
    {
      content: `计数器：${++count}`,
      type: 'text'
    },
    {
      accelerator: 0,
      // 因为这个按钮会不断被输出，这里通过 disableWarning 避免控制台一直输出快捷键重复的 Warning
      config: { disableWarning: true },
      content: '结束',
      type: 'button',
    }
  ]);
  // 刷新的时间间隔，200ms 刷新一次相当于每秒5帧的帧率
  await era.delay(200);
}
// 跳过演出之后清屏，继续后面的逻辑
await era.clear();
era.print(`计数结束：${count}`);
// ...
```

# 小结

本章介绍了如何在EraElectron引擎中使用多线程处理，通过 Promise 的链式调用 .then() 将正常的脚本逻辑分成两股，在其中一个等待玩家输入的同时另一个继续进行一系列操作，可以实现选项延迟出现、选择超时返回默认选项、跳过动态演出等游戏功能。

多线程属于进阶编程技巧，因为执行顺序不可预测的特性，在一般的软件开发中即使是熟练工程师也很容易制造错误，例如这个程序员笑话：

> 我遇到了一个问题，尝试用多线程来处理它，现在我了遇一个到问题。

<details> <summary>笑点解析</summary>
这个笑话是关于程序员在使用多线程编程时遇到的常见问题。多线程是一种编程技术，允许程序同时执行多个任务，以提高效率和性能。然而，多线程编程也带来了复杂性，特别是当多个线程需要访问和修改共享资源时，可能会导致竞态条件（race conditions）、死锁（deadlocks）和其他同步问题。<br>
笑话中的程序员最初遇到一个问题，决定用多线程来解决它。然而，由于多线程的复杂性，他最终遇到了更多的问题，即“现在我了遇一个到问题”。这句话的语序混乱，暗示了多线程可能导致的不确定性和混乱状态，因为线程的执行顺序是不确定的，可能会导致程序行为不可预测。<br>
简而言之，这个笑话反映了多线程编程的挑战，即在解决一个问题的同时，可能会引入新的、更复杂的问题。<br>
（By DeepSeek）
</details>

因为 Node.js 本质上是单线程运行的，ere游戏中的多线程处理并没有那么难以控制，但依然有一定使用难度，请读者在取用时多多测试，以尽可能避免出错。