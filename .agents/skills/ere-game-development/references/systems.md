# ere 系统参考实现

这份文档是「照着抄就能跑」的系统级参考实现合集：标题界面、主界面、存读档、数值反馈、商店、
可存档的随机事件队列、口上系统、调教系统，以及存档兼容性的做法。

代码取自官方例程 [ere-example](https://gitgud.io/umaera/game/ere-example) 的 `ere/` 目录
（原文引用或略作裁剪/压缩注释），数据路径、表名、API 名与引擎 5.0.0 / SDK 4.8.5 一致。

四条约定，全文所有代码都遵守：

- **CommonJS**：`require` + `module.exports`，**不要用 `import`**。
- 内部模块一律用 `#/…` 引用（`#` 就是游戏的 `ere/` 目录），SDK 固定写 `require('#/era-electron')`。
- **异步 API 必须 `await`**：`clear`、`input`、`printAndWait`、`waitAnyKey`、`delay`、
  `saveData`、`loadData`、`rmData`、`saveGlobal`、`loadGlobal`、`resetGlobal`、`isLandscape`。
- 同步 API **不要 `await`**：`get`、`set`、`add`、`print`、`println`、`printButton`、
  `printMultiColumns`、`drawLine`、`setAlign`、`getLineCount`、`addCharacter`、`resetData`、
  `beginTrain`、`nextTurnInTrain`、`endTrain`、`notify`。

---

## 本文索引

本文 1900+ 行，**不要整篇读**：按下表用 `read` 的 `offset` / `limit` 只取需要的小节。

| 小节 | 行 | 内含小节（行号） |
| --- | --- | --- |
| 目录组织 | 39-89 |  |
| 标题界面与游戏循环 | 90-209 |  |
| 实时循环、计时与演出（帧循环） | 210-270 | 三个部件 216 · 标准骨架（实时玩法） 226 · 三个容易踩的点 252 · 其它两种常见变体 258 · 版本与限制 263 |
| 主界面（hub） | 271-434 |  |
| 存档与读档界面 | 435-617 | 存档界面 443 · 读档界面 524 |
| 数值变化与提示 | 618-730 | 通用「旧值 → 新值」模板 620 · `era.printAndWait` 669 · `era.notify` 702 |
| 商店 | 731-937 |  |
| 随机事件与可存档的事件队列 | 938-1152 | 1. CSV：用 flag 表声明队列变量 943 · 2. 事件对象：能被 JSON 往返的纯数据类 956 · 3. 队列：模块级变量 + `init_queue()` 绑定到存档 1000 · 4. 把队列内容变成可执行函数 1095 · 5. 往队列里塞事件 1135 |
| 口上（自定义台词）系统 | 1153-1514 | 数据流 1158 · 1. 指令枚举 1172 · 2. 三个值对象 1194 · 3. 基类：角色 ID / 姓名 / 称呼 + 多口上切换点 1249 · 4. 最小 2 类示例 1281 · 5. 工厂：注册表 + 实例缓存 + 分发 1346 · 6. 通用后处理 1413 · 7. 随机事件返回 `true` 就跳过通用口上 1440 · 8. 调教口上是同一套形状 1468 |
| 调教（训练）系统 | 1515-1803 | 生命周期 1517 · 最小可跑的调教页 1553 · 延伸：例程结算里的其他分支 1735 |
| 存档兼容性 | 1804-1908 | 引擎给了什么保证 1806 · 三条会破坏老存档的操作 1819 · 版本号与最低支持版本 1865 · 读档处的补丁位 1886 |

## 目录组织

```
游戏文件夹/
├── csv/                            静态数据（也支持 json/ 或 yml/，三者只读其中一种）
│   ├── GameBase.csv                游戏信息表 —— 引擎必需，缺了直接拒绝加载
│   ├── Flag.csv / Base.csv / …     变量数据表：声明存档里有哪些变量、什么序号
│   ├── Item.csv                    道具表（三列：序号,名称,价格）
│   └── Chara/Chara0000.csv …       角色预设数据（可以放在 csv/ 的任意子目录）
├── ere/                            游戏脚本集（“#”别名指向这里）
│   ├── era-electron.js             引擎 SDK —— 必需，从引擎 sdk/era-electron.js 原样复制
│   ├── main.js                     入口 —— 必需，必须 module.exports = async () => {…}
│   ├── page/                       整屏交互循环，一个文件一个界面
│   ├── event/                      「口上」（角色台词）：口上类、调教地文、工厂
│   │   ├── line-base.js            口上/地文类的共同基类
│   │   ├── lines/                  聊天、切换口上等一般口上 + lines-factory.js
│   │   └── ero/                    调教指令地文 + ero-factory.js + 通用结算
│   ├── sys/                        与画面无关的系统功能（事件队列、实行值检查…）
│   ├── utils/                      纯函数工具（随机数、颜色渐变…）
│   ├── data/                       常量数据与枚举（不是静态数据！）
│   │   ├── event/                  hooks / LineArg / CheckObject / EventObject
│   │   └── ero/                    action-const / param-const / exp-const / stain-const
│   └── jsconfig.json               可选：只为编辑器提供 "#/*" 路径提示
├── res/                            可选：图片与音频注册表（每个子目录一个 *.csv）
└── sav/                            引擎生成：global.sav、saveN.sav
```

每个目录该放什么：

| 路径 | 放什么 | 必需性 |
| --- | --- | --- |
| `ere/main.js` | 游戏入口，标题界面与主循环 | **必需** |
| `ere/era-electron.js` | 引擎 SDK，原样复制，不要改 `isEra` / `version.sdk` | **必需** |
| `csv/GameBase.csv` | 游戏名称、作者、版本、游戏标识、初始角色编号 | **必需** |
| `ere/page/` | 一个整屏界面一个文件；导出 `async function`，结尾 `module.exports = page_xxx;` | 按需 |
| `ere/event/` | 口上类与工厂。**只放台词和分支**，通用数值结算放 `event/ero/ero-result.js` 一类文件 | 按需 |
| `ere/sys/` | 与界面绘制无关的系统功能：事件队列、实行值检查工具 | 按需 |
| `ere/utils/` | 无副作用的纯函数（随机数、颜色插值） | 按需 |
| `ere/data/` | 常量数据 **和枚举**。枚举用 `Object.keys().forEach((k, i) => (e[k] = i))` 生成序号 | 按需 |
| `csv/` | 静态数据表。变量数据表**不能放进子目录**，角色表可以 | **必需** |

`#` 别名要在两处同时存在：源码侧由引擎把 `#` 重写成 `ere/`；Webpack/安卓打包还需要
`webpack.config.js` 里的 `resolve.alias['#'] = resolve(__dirname, 'ere/')`；编辑器提示需要
`ere/jsconfig.json` 里的 `"paths": { "#/*": ["*"] }`。

变量数据表与「常量数据」是两回事：**存档里会变的**东西必须在 `csv/` 里声明（`flag`、`base`、
`cflag`…）；**运行中不变的**东西（一次调教加多少点、每级要多少宝珠）直接写在
`ere/data/*-const.js` 里，不要塞进 CSV。

---

## 标题界面与游戏循环

`ere/main.js` 必须导出 async 函数，引擎在加载完成、以及每次「回标题」重开时都会调用它。
它自己就是一个 `while` 循环 —— 从主界面返回后会自动重画标题。

```javascript
// ere/main.js
const era = require('#/era-electron');

const { init_queue } = require('#/sys/sys-event-queue');

const homepage = require('#/page/homepage');
const page_load_game = require('#/page/page-load-game');

// 入口必须是一个 async 函数
module.exports = async () => {
  let flag = true;
  while (flag) {
    await era.clear();
    era.setAlign('center');
    era.drawLine({ isSolid: true });
    era.print('我是一个游戏标题');
    // gamebase 是只读对象；CSV 里写 0001，读出来是数字 1
    era.print(`v${era.get('gamebase').version / 1000}`);
    era.print('你');
    era.drawLine({ isSolid: true });
    era.printButton('开始游戏', 1);
    era.printButton('加载存档', 2);
    era.printButton('鸣谢列表', 3);
    era.printButton('结束游戏', 4);
    era.drawLine({ isSolid: true });
    era.setAlign('left');
    let copyright_flag, curr_line;
    switch (await era.input()) {
      case 1:
        // 新游戏：resetData 清空存档，并按 GameBase 的「初始角色编号」自动建 0 号角色
        era.resetData();
        [1, 2].forEach((e) => {
          era.addCharacter(e);
          era.set(`relation:${e}:0`, 0);
        });
        era.set('flag:日元', 10000);
        // 队列存在 flag:事件队列 里，换了存档必须重新绑定一次
        init_queue();
        era.set('flag:当前角色', 1);
        await homepage();
        break;
      case 2:
        // 读档成功才进主界面；读档界面内部已经调用过 init_queue()
        if (await page_load_game()) {
          await homepage();
        }
        break;
      case 3:
        // 子界面循环：进之前记行号，之后按差值只清子界面画出来的行
        copyright_flag = true;
        curr_line = era.getLineCount();
        while (copyright_flag) {
          era.setAlign('center');
          era.printButton('开发人员', 1);
          era.printButton('口上作者', 2);
          era.printButton('社区维护', 3);
          era.printButton('回到标题', 4);
          era.setAlign('left');
          const ret = await era.input();
          era.setAlign('center');
          switch (ret) {
            case 1:
              await era.printAndWait('这里是开发人员列表');
              await era.printAndWait('这里是开发人员列表2');
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
          // 还留在子界面里才清自己画的行；按【回到标题】不清，让外层整屏重画
          if (ret < 4) {
            await era.clear(era.getLineCount() - curr_line);
          }
          era.setAlign('left');
        }
        break;
      case 4:
        // quit() 靠抛出 Error('quit') 关闭引擎，别把它包进会被吞掉的 try/catch
        era.quit();
        break;
    }
  }
};
```

要点：

- `era.resetData()` 是**同步**的，不要 `await`。它清空所有数据表，并按 `GameBase.csv` 的
  「初始角色编号」（`defaultChara`）自动 `addCharacter` 一次，所以主角（0 号）不用手动添加，
  其他登场角色才需要逐个 `era.addCharacter(id)`。
- 新游戏的初始值用 `era.set('flag:…', …)` 写，这些变量必须已经在 `csv/Flag.csv` 里声明过：

  ```csv
  0,日元

  10,当前角色
  11,事件队列
  ```

- 子界面（鸣谢列表、能力升级、改名提示）统一模式：
  **进之前 `curr_line = era.getLineCount()` → 内部循环 → 每次处理完
  `await era.clear(era.getLineCount() - curr_line)`**。`era.clear(0)` 是空操作，
  所以第一次迭代不会多清。
- `era.quit()` 不是异步函数，**不加 `await`**。
- 入口里不要重复引擎已经做过的事：每次启动/重启时引擎自己会跑 `resetData()` +
  `loadGlobal()` + `clear()`。

---

## 实时循环、计时与演出（帧循环）

**想做实时效果就照这一节。** 适用的需求：贪吃蛇这类持续推进的玩法、计时器 / 倒计时、自动播放、动画刷新、跳过演出、选项延迟出现、选择超时返回默认值。

**不需要任何特殊 API**：`era.delay` 就是帧时钟，`era.input` 不 `await` 就是输入监听器，`era.replaceInColRows` 就是重绘。

### 三个部件

| 部件 | 作用 |
|---|---|
| 不 `await` + `.then()` | 让逻辑分两股同时推进：一边等玩家输入，一边继续算（**不要**加 `await`，加了就变成顺序阻塞。异步 API 的"必须 await"只适用于顺序等待的场合） |
| `era.delay(ms)` | **帧时钟**。SDK 自带实现并用 `_s = true` 标记让引擎不覆盖它，可直接用 |
| `era.replaceInColRows([...])` | **原地重绘**：替换刚输出的那几行，所以画面是刷新而不是不断追加 |

注意：`replaceInColRows` 在 SDK 里带 `DANGER` 标注，意思是**它替换的是"刚输出的那几行"**——所以必须保证上一次输出的就是你这次要替换的那块内容，中间不要插别的 `era.print`，否则会替换错行。SDK 里标记 `DANGER` 的另一个同类 API 是 `removeCharacter`。

### 标准骨架（实时玩法）

```js
// 1) 先画一帧，让"刚输出的行"就是棋盘
await era.printAndWait('按 WASD 转向，Q 退出。');
era.replaceInColRows(draw(board));      // 棋盘 = 固定行数的一行内容

// 2) 只挂一个输入监听；按键后重新挂（时刻保持恰好一个在等）
let dir = 'w', quit = false;
(function listen() {
  era.input({ any: true, hideInput: true }).then((k) => {
    if (k === 'q') quit = true;
    else if ('wasd'.includes(String(k))) dir = String(k);
    if (!quit) listen();
  });
})();

// 3) 帧循环
while (!quit) {
  step(board, dir);                     // 推进一格
  era.replaceInColRows(draw(board));    // 原地重绘
  await era.delay(150);                 // 150ms 一格 ≈ 6.7 FPS，经典贪吃蛇正合适
}
await era.clear();
```

### 三个容易踩的点

- **不要用 `Promise.race([era.input(...), era.delay(ms)])` 做节拍。** 输掉的那次 `era.input` 永远不会 resolve，引擎按 `inputKey` 注册的监听不会被清理，会积累"野监听"。用上面的"重挂"写法。
- **没有方向键 API。** 输入是文本框，只有 Enter 提交（方向键只移动光标）。单键靠 `era.input({ any: true, hideInput: true })`——**它会在敲下第一个字符时立刻 resolve 并返回那个字符**，且不回显。`era.waitAnyKey()` 内部就是这个调用，但它**丢弃**按键值，而且**连续调用只生效一次**，所以实时玩法不要用它。用 WASD 这类字符键。
- **每帧重发同一个按钮必须加 `config: { disableWarning: true }`**，否则控制台会被"快捷键重复"警告刷屏。

### 其它两种常见变体

- **延时出现**：`era.delay(ms).then(() => { ...; era.replaceInColRows(buffer); })` 前面配一次 `era.input()`——玩家选了就不动，没选就刷新出新的选项。
- **超时默认**：同上，但到点时把原来的选项**替换成**一句文本或默认选项。

### 版本与限制

- PC 上 `era.input({ show: false })` **不会隐藏输入框**（`show` 是安卓版参数，PC 渲染层只把它用于行对象显隐），配方照常可用。
- 帧率不必高：上面 150–200ms 一帧（5～7 FPS）已经够用；每个 `await era.delay()` 都会让出控制权，所以帧内计算不要写长循环，否则整体会卡。
- `await era.delay()` 期间玩家仍可点击已输出的按钮，但**上一次 `era.input` 之前输出的按钮已被禁用**——实时循环里靠"重挂监听 + 重绘按钮"来解决。

---

## 主界面（hub）

主界面负责：状态显示（`era.printMultiColumns` 里混排 `type: 'text'` 与 `type: 'progress'`）、
角色切换（每个已添加角色一个按钮，`accelerator` 就是角色 ID）、功能按钮组。

```javascript
// ere/page/homepage.js
const era = require('#/era-electron');

const sys_get_random_event = require('#/sys/sys-get-random-event');

const page_abl_up = require('#/page/page-abl-up');
const page_ero = require('#/page/page-ero');
const page_info = require('#/page/page-info');
const page_load_game = require('#/page/page-load-game');
const page_save_game = require('#/page/page-save-game');
const page_shop = require('#/page/page-shop');

const {
  get_custom_lines,
  run_custom_lines,
} = require('#/event/lines/lines-factory');

const hooks = require('#/data/event/hooks');

async function homepage() {
  let flag = true;
  while (flag) {
    await era.clear();
    era.drawLine({ content: '游戏主界面' });
    const cur_chara = era.get('flag:当前角色');
    // 一行里混排文本与进度条：每个对象都必须有 type，否则会被静默丢掉
    era.printMultiColumns([
      {
        config: {
          align: 'center',
          color: era.get(`cstr:${cur_chara}:代表色`),
          width: 4,
        },
        content: era.get(`callname:${cur_chara}:-2`),
        type: 'text',
      },
      {
        config: { width: 4 },
        content: `好感度：${era.get(`relation:${cur_chara}:0`)}`,
        type: 'text',
      },
      {
        config: { color: '#009300', height: 20, width: 7 },
        inContent: `体力：${era.get(`base:${cur_chara}:体力`)} / ${era.get(`maxbase:${cur_chara}:体力`)}`,
        percentage:
          (era.get(`base:${cur_chara}:体力`) * 100) /
          era.get(`maxbase:${cur_chara}:体力`),
        type: 'progress',
      },
      {
        config: { color: '#6b6bff', height: 20, offset: 1, width: 7 },
        inContent: `气力：${era.get(`base:${cur_chara}:气力`)} / ${era.get(`maxbase:${cur_chara}:气力`)}`,
        percentage:
          (era.get(`base:${cur_chara}:气力`) * 100) /
          era.get(`maxbase:${cur_chara}:气力`),
        type: 'progress',
      },
    ]);
    era.drawLine();
    // 角色切换：accelerator 直接用角色 ID，input 就会返回这个 ID
    era.printMultiColumns(
      era
        .getAddedCharacters()
        .filter((id) => id > 0)
        .map((id) => ({
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
    era.printMultiColumns(
      ['聊天', '切换口上', '开始调教'].map((e, i) => ({
        accelerator: i + 100,
        config: { align: 'center', width: 8 },
        content: e,
        type: 'button',
      })),
    );
    era.drawLine();
    era.printMultiColumns(
      ['角色情报', '道具商店'].map((e, i) => ({
        accelerator: i + 200,
        config: { align: 'center', width: 8 },
        content: e,
        type: 'button',
      })),
    );
    era.printMultiColumns(
      ['保存进度', '加载存档', '标题界面'].map((e, i) => ({
        accelerator: i + 300,
        config: { align: 'center', width: 8 },
        content: e,
        type: 'button',
      })),
    );
    const ret = await era.input();
    switch (ret) {
      case 100:
        // 先尝试执行一个排队中的随机事件；它返回 true 表示跳过通用口上
        era.drawLine();
        if (!(await sys_get_random_event(hooks.talk)())) {
          await run_custom_lines(era.get('flag:当前角色'), hooks.talk);
        }
        break;
      case 101:
        // 切换口上：由角色自己的 switch() 决定切成哪一套
        era.drawLine();
        await get_custom_lines(era.get('flag:当前角色')).switch();
        break;
      case 102:
        await page_ero();
        await page_abl_up();
        break;
      case 200:
        await page_info(era.get('flag:当前角色'));
        break;
      case 201:
        await page_shop([0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11]);
        break;
      case 300:
        await page_save_game();
        break;
      case 301:
        await page_load_game();
        break;
      case 302:
        flag = false;
        break;
      default:
        // 剩下的返回值只可能来自角色切换按钮，accelerator 就是角色 ID
        era.set('flag:当前角色', ret);
    }
  }
}

module.exports = homepage;
```

要点：

- `era.printMultiColumns` 数组里每个元素都**必须有 `type`**：
  `'text' | 'button' | 'progress' | 'divider' | 'image' | 'image.whole'`。
  没有 `type` 或 `type` 不认识的对象会被**静默丢掉** —— 不报错，只是画不出来。
- `type: 'progress'` 的对象字段是 `percentage` + `inContent`（可选 `outContent`），
  配置项是 `color` / `height` / `width` / `barWidth` / `offset` / `align`。
- 一行总宽 **24 列**，`config.width` 是相对宽度，`config.offset` 是左侧留白。
- 角色切换不要另开快捷键区间：`accelerator` 直接设成角色 ID，`default` 分支自然处理。
  但要注意功能按钮的区间（100/200/300/900/999）不能和角色 ID 撞车。
- `era.printMultiColumns` 出来的整行在编程意义上算 1 行，`await era.clear(1)` 会整行一起清掉。

---

## 存档与读档界面

存档栏位备注保存在 **global 表** 里的 `global:saves:<栏位号>`（写进 `global.sav`），
存档主体保存在 `sav/save<栏位号>.sav`。改完备注必须 `await era.saveGlobal()` 写回。

快捷键约定：栏位本体用栏位号 `i`，行尾次要操作用 `i + 100`（改名 / 删除），`999` 固定返回。
所以分支判断要先看 `999`，再看 `> 100` / `>= 100`。

### 存档界面

```javascript
// ere/page/page-save-game.js
const era = require('#/era-electron');

async function page_save_game() {
  let flag = true;
  while (flag) {
    await era.clear();
    const buffer = [];
    buffer.push({ config: { content: '保存游戏' }, type: 'divider' });
    // 0 号栏位留给自动存档，所以这里从 1 开始
    for (let i = 1; i <= 10; ++i) {
      const comment = era.get(`global:saves:${i}`);
      buffer.push(
        {
          accelerator: i,
          config: { width: 20 },
          content: comment || '空栏位',
          type: 'button',
        },
        {
          accelerator: i + 100,
          config: {
            align: 'right',
            disabled:
              comment === undefined || comment.startsWith('(FILE LOST) '),
            width: 4,
          },
          content: '改名',
          type: 'button',
        },
      );
    }
    buffer.push(
      { type: 'divider' },
      {
        accelerator: 999,
        config: { align: 'right' },
        content: '返回',
        type: 'button',
      },
    );
    era.printMultiColumns(buffer);
    const ret = await era.input();
    if (ret === 999) {
      flag = false;
    } else if (ret > 100) {
      // 改名分支：ret - 100 才是栏位号
      const savIndex = ret - 100;
      let comment;
      // 记住当前行号，之后只清「输入提示 + 回显的输入」这几行
      const cur_line = era.getLineCount();
      do {
        await era.clear(era.getLineCount() - cur_line);
        era.print('请输入新存档名（不超过10个字符）');
        comment = (await era.input()).toString();
        // 检查 comment 的长度是否超出 10 个字符
      } while (comment.length > 10);
      era.set(`global:saves:${savIndex}`, comment);
      // 保存通用公共存档到 global.sav
      await era.saveGlobal();
    } else {
      const comment = era.get(`global:saves:${ret}`);
      if (comment !== undefined && !comment.startsWith('(FILE LOST) ')) {
        era.print('该栏位已存在存档！是否覆盖？');
        era.printButton('是', 1);
        era.printButton('否', 2);
        if ((await era.input()) === 2) {
          continue;
        }
      }
      await era.saveData(ret, '存档 ' + ret);
    }
  }
}

module.exports = page_save_game;
```

### 读档界面

```javascript
// ere/page/page-load-game.js
const era = require('#/era-electron');

const { init_queue } = require('#/sys/sys-event-queue');

async function page_load_game() {
  let flag = true;
  while (flag) {
    await era.clear();
    const buffer = [];
    buffer.push({ config: { content: '读取游戏' }, type: 'divider' });
    // 读档界面包含 0 号（自动存档）栏位
    for (let i = 0; i <= 10; ++i) {
      const comment = era.get(`global:saves:${i}`);
      buffer.push(
        {
          accelerator: i,
          config: {
            disabled:
              comment === undefined || comment.startsWith('(FILE LOST) '),
            width: 20,
          },
          content: comment || '空栏位',
          type: 'button',
        },
        {
          accelerator: i + 100,
          config: {
            align: 'right',
            disabled: comment === undefined,
            width: 4,
          },
          content: '删除',
          type: 'button',
        },
      );
    }
    buffer.push(
      { type: 'divider' },
      {
        accelerator: 999,
        config: { align: 'right' },
        content: '返回',
        type: 'button',
      },
    );
    era.printMultiColumns(buffer);
    const ret = await era.input();
    if (ret === 999) {
      flag = false;
      // 通过判断快捷键进入删除分支
    } else if (ret >= 100) {
      const savIndex = ret - 100;
      era.print(`是否删除栏位 ${savIndex} 的存档？`);
      era.printButton('是', 1);
      era.printButton('否', 2);
      if ((await era.input()) === 1) {
        await era.rmData(savIndex);
      }
    } else if (await era.loadData(ret)) {
      // 这里可以插入对旧版本存档的修复
      // 初始化事件队列，让队列跟随存档
      init_queue();
      // 只有在读档成功的情况下才返回
      return true;
    }
  }
  return false;
}

module.exports = page_load_game;
```

要点：

- **`era.loadData` 失败时返回 `false` 而不抛异常**：游戏标识 `code` 不匹配、或存档版本低于
  `GameBase.csv` 的「最低支持版本」时都会失败。所以必须写成
  `else if (await era.loadData(ret))`，失败就留在读档界面。
- 读档成功后**必须**重新初始化你维护的运行时状态：事件队列（`init_queue()`）、当前角色、
  缓存对象等。存档里只有数据，没有类实例。
- `era.rmData(savIndex)` 删 `sav/saveN.sav` 并清掉 `global.saves[N]`，内部自己会 `saveGlobal()`，
  不用再手动调。
- `(FILE LOST) ` 是引擎在 `loadGlobal` 扫描 `sav/` 时加的前缀（有备注但文件不存在），
  界面上要当成「不可用栏位」处理。
- `era.saveData(savIndex, comment)` 自己会把备注写进 `global.saves` 并 `saveGlobal()`；
  只有**单独改备注**（改名分支）才需要你手动 `await era.saveGlobal()`。
- 栏位号可以是任意自然数；`system.saveFiles`（默认 10）只影响引擎自动扫描的文件数量。
  例程固定画 1..10 / 0..10，要改数量就两处循环一起改。

---

## 数值变化与提示

### 通用「旧值 → 新值」模板

`era.add` 返回**相加后的新值**，`era.set` 返回**写入的值**，抓住返回值就省一次 `era.get`：

```javascript
// ere/utils/value-feedback.js
const era = require('#/era-electron');

/**
 * 改变一个数值，并输出「名称 旧值 +n = 新值」这样一行反馈
 *
 * @param {string} key 数据路径，例如 'flag:日元'、'relation:1:0'
 * @param {number} delta 变化量
 * @param {string} name 显示名
 * @returns {number} 变化后的值
 */
function change_value(key, delta, name) {
  const before = era.get(key);
  const after = era.add(key, delta);
  if (after !== before) {
    era.print([
      name,
      ' ',
      Math.floor(before).toLocaleString(),
      delta >= 0 ? ' + ' : ' - ',
      Math.abs(Math.floor(delta)).toLocaleString(),
      ' = ',
      Math.floor(after).toLocaleString(),
    ]);
  }
  return after;
}

module.exports = { change_value };
```

注意 `era.add(key, 0)` 等价于 `era.get(key)`（**不写值**），所以「加了 0」不会被记进存档。

结算处不用 `printAndWait`，用同步的 `era.print` 连着输出（例程 `ero-result.js` 的写法）：

```javascript
era.add(`exp:${target}:C经验`, 1);
era.print('C经验+1');
```

口上里更常见的是「说一句人话」：`era.println()` 空行 → `era.add(…)` 改数值 →
`await era.printAndWait([…])` 等玩家点一下。完整文件见「口上（自定义台词）系统」里的
`ere/event/lines/lines-result.js`。

### `era.printAndWait`

`await era.printAndWait(content, config?)` = `era.print` + `era.waitAnyKey`，是最常用的
「说一句、等玩家点一下」。`content` 可以是字符串，也可以是富文本数组：

```javascript
module.exports = class extends CustomizedLines {
  // 口上方法体里的三种写法
  async show() {
    // 纯文本
    await era.printAndWait('存档已保存。');

    // 富文本：数组里每项是字符串，或 { content, color, fontSize, fontWeight, title, url }
    await era.printAndWait(
      [this.callname, ' 分享了一些好玩的事情。'],
      { color: era.get(`cstr:${this.id}:代表色`) },
    );

    // 富文本里插入换行与非断行空格
    await era.printAndWait([
      '第一行',
      { isBr: 1 },
      '第二行',
      { isBlank: 4 },
      '缩进后的字',
    ]);
  }
};
```

`era.waitAnyKey()` 只在「上一条输出之后还没等待过」时才真的停一下，所以连续调用不会重复卡住。
需要在 `printAndWait` 之后再停一次时，先 `era.println()` 制造新行。

### `era.notify`

右上角浮动提醒，适合「数值变化 / 资源不足 / 存档结果」这类不打断流程的反馈。

```javascript
// 签名：era.notify(content, title?, type?, duration?)
// type 取 'success' | 'info' | 'warning' | 'error' | ''
era.notify('存档已保存', '提示', 'success');

// content 也可以是 span 数组
era.notify(
  [
    { content: '体力不足', color: '#ff0000', fontWeight: 'bold' },
    { isBr: 1 },
    { content: '请先休息' },
  ],
  '无法调教',
  'warning',
);
```

> `duration` 是毫秒，`0` 表示不自动关闭，默认 5000。**注意版本差异**：4.8.2 及更早的引擎只接收
> `notify(content, title, type)`，会丢掉 `duration`，通知一律 5000 ms 后消失；4.8.3 起正常透传。
> 想让提醒常驻，要先确认玩家用的引擎版本。
> **需要玩家确认的内容仍然要用 `printAndWait`，不要用 `notify`。**
> `notify` 是同步 API，不要 `await`。

---

## 商店

商店页是「分页 + 每项数量按钮」的循环：

- 分页：每页 `page_size` 个道具，用 `Array.prototype.slice` 截当前页，`900`/`901` 翻页。
- 每项 4 个快捷键：`id`（查看/介绍）、`id + 100`（-1）、`id + 200`（+1）、`id + 300`（购买）。
- 钱存在 **一维 flag 表** 里（示例用 `flag:日元`）；能不能买就是 `价格 × 数量 > 钱`。
- 价格与持有量都走 **一维的 `item` 系列键**：`itemprice:<道具>`、`item:<道具>`。

```javascript
// ere/page/page-shop.js
const era = require('#/era-electron');

// 每页道具数
const page_size = 8;

/** @param {number[]} item_list */
async function page_shop(item_list) {
  // to_buy：每个道具要购买的数量；price_dict：价格缓存，避免重复计算
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
    // Array.slice 左闭右开；第二个参数省略时截到数组末尾
    shop_list = item_list.slice(
      (cur_page - 1) * page_size,
      cur_page * page_size,
    );
    const buffer = [],
      money = era.get('flag:日元');
    buffer.push({ config: { content: '购买道具' }, type: 'divider' });
    for (const item_id of shop_list) {
      buffer.push(
        {
          accelerator: item_id,
          config: { width: 4 },
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
          config: { align: 'center', width: 2 },
          content: `x ${to_buy[item_id]}`,
          type: 'text',
        },
        // +1 按钮，最多买 99 件，超过持有货币不允许继续增加
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
      { config: { width: 8 }, content: `现在还有 ${money} 日元`, type: 'text' },
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
          config: { align: 'center', width: 4 },
          content: `${cur_page} / ${max_page}`,
          type: 'text',
        },
        {
          accelerator: 901,
          config: { align: 'center', disabled: cur_page === max_page, width: 4 },
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
        // 剩余日元除以价格下取整 = 还能买几个；再夹在 1 和原数量之间
        to_buy[id] = Math.min(
          Math.max(Math.floor(money / price_dict[id]), 1),
          to_buy[id],
        );
      });
    } else if (ret >= 200) {
      to_buy[ret - 200]++;
    } else if (ret >= 100) {
      to_buy[ret - 100]--;
    } else {
      await era.printAndWait(era.get(`itemname:${ret}`));
      // 这里可以输出道具的介绍
    }
  }
}

module.exports = page_shop;
```

道具表 `csv/Item.csv` 是三列 `序号,名称,价格`（序号可以不连续，空行与 `;` 注释会被跳过）：

```csv
0,体力药,100
1,气力药,100
3,体力合剂,500

10,媚药,2000
11,润滑液,4000
```

`era.get('itemkeys')` / `era.get('itemnames')` 可以拿到全部序号与名称；上面 `page_shop([...])`
的入参就是要在店里出现的那批序号。

> **`item` 是一维表。** 正确的键只有四种：
>
> | 键 | 含义 |
> | --- | --- |
> | `item:<道具名>` / `item:<道具序号>` | 持有数量，可读写 |
> | `itemprice:<道具名或序号>` | 价格，可读写（默认来自 `Item.csv` 第三列） |
> | `itemsales:<道具名或序号>` | 上架/售出计数，可读写 |
> | `item:bought` / `itemname:bought` | 最后被购买的道具序号 / 名称 |
>
> **不要写 `item:<角色ID>:<道具名>`。** 那是 `表:角色ID:变量名` 的形式，`item` 不吃这一套：
> 它不会报错，只会静默返回 `undefined`（再用 `era.add` 就会得到 `NaN`）。
> **不要照抄这种写法**（`era.add(\`item:${target}:媚药\`, -1)`）—— 它不生效。

`itemsales` 的用法（例程没用到它，这里只给最保守的读/写/加写法，语义按「上架计数」使用）：

```javascript
// 上架 5 个，卖一个减一个
era.set('itemsales:体力药', 5);
if (era.get('itemsales:体力药') > 0) {
  era.add('itemsales:体力药', -1);
  era.add('item:体力药', 1);
}
// 引擎会记录「最后购买的道具」，可以直接拿来显示
era.print(`最后购买：${era.get('itemname:bought')}`);
```

---

## 随机事件与可存档的事件队列

目标：事件**排队**在存档里，读档后还在；到该触发时从队列头部取一个执行；如果这个事件自己
处理完了，就**跳过**通用口上输出。

### 1. CSV：用 flag 表声明队列变量

```csv
; csv/Flag.csv
0,日元

10,当前角色
11,事件队列
```

队列本身是普通对象 `{ [hook]: EventObject[] }`，直接由 `era.get`/`era.set` 存取；
因为它在 `flag` 表里，所以**跟着存档走**（`era.saveData` 存的是整个 `data` 对象）。

### 2. 事件对象：能被 JSON 往返的纯数据类

```javascript
// ere/data/event/event-object.js
// 事件对象类
class EventObject {
  /**
   * 随机事件对应的角色ID
   *
   * @type {number}
   */
  chara_id;
  /**
   * 随机事件名，用来从口上对象里获取事件对应的方法
   *
   * @type {string}
   */
  event;

  /** @param {number} id */
  constructor(id) {
    this.chara_id = id;
  }

  /**
   * 事件队列里的对象在存档再读档后会变成单纯的 Object，
   * 所以要用 from_obj 静态方法再转换回类的实例
   *
   * @param {{chara_id:number,[event]:string}} obj
   * @returns {EventObject}
   */
  static from_obj(obj) {
    const ret = new EventObject(obj.chara_id);
    ret.event = obj.event;
    return ret;
  }
}

module.exports = EventObject;
```

> 存档只能放纯数据：**自定义类的实例存档再读档后会退化成普通 Object**，方法全部丢失 ——
> 这就是 `from_obj` 存在的理由。给事件对象加方法时，一定要在 `from_obj` 里补齐。

### 3. 队列：模块级变量 + `init_queue()` 绑定到存档

```javascript
// ere/sys/sys-event-queue.js
const era = require('#/era-electron');

const EventObject = require('#/data/event/event-object');

/**
 * 用来放事件队列的变量，通过 init 函数初始化<br>
 * Record<string,EventObject[]> 表明这个 Object 的所有属性值都是 EventObject[]
 *
 * @type {Record<string,EventObject[]>}
 */
let queue;

module.exports = {
  /**
   * 向相应的指令的队列添加一个事件对象<br>
   * 没添加过事件对象的队列还未设置，需要用 ||= [] 保证它一定是一个数组
   *
   * @param {number} hook 指令的枚举值，从 #/data/event/hooks 导出的枚举中取
   * @param {EventObject} event 要添加的事件对象
   */
  add_event(hook, event) {
    queue[hook] ||= [];
    queue[hook].push(event);
  },
  /**
   * 获取一个指令的队列里的第一个事件对象（FIFO）
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
    // 新游戏状态下 flag:事件队列 是 0，此时会执行 era.set('flag:事件队列', {})，
    // 将其中的值变成空对象再返回
    queue = era.get('flag:事件队列') || era.set('flag:事件队列', {});
    // 拿到对象后，其中的属性值应该都是数组，
    // 将所有数组中的事件对象用 EventObject.from_obj 转换成 EventObject
    for (const k in queue) {
      queue[k] = queue[k].map((e) => EventObject.from_obj(e));
    }
  },
};
```

**为什么 `era.resetData()` 之后、以及 `era.loadData()` 成功之后都必须再调用一次 `init_queue()`：**

1. `queue` 是模块级 `let`，本身**不在存档里**；它只是一个指向 `era.get('flag:事件队列')`
   那个对象的引用。存档数据换了，这个引用就指向旧对象（或 `undefined`）。
2. `era.resetData()` 把 `flag:事件队列` 重置为 `0`。此时 `era.get('flag:事件队列')` 是 falsy，
   `init_queue()` 会走 `era.set('flag:事件队列', {})` 建一个新空对象并绑定。
   **不调用的话 `queue` 还指着上一局的对象、甚至仍是 `undefined`，`add_event` 直接 `TypeError`。**
3. `era.loadData()` 成功后，`era.get('flag:事件队列')` 是读出来的那个对象，但里面的元素是
   **普通 Object**（`JSON.parse` 的产物），必须用 `from_obj` 重新装配成类实例。

两处调用点：

```javascript
// ere/main.js —— 【开始游戏】分支
async function new_game() {
  // resetData 清空存档，并按 GameBase 的「初始角色编号」自动建 0 号角色
  era.resetData();
  [1, 2].forEach((e) => {
    era.addCharacter(e);
    era.set(`relation:${e}:0`, 0);
  });
  era.set('flag:日元', 10000);
  // 初始化事件队列，让队列跟随存档
  init_queue();
  era.set('flag:当前角色', 1);
  await homepage();
}
```

```javascript
// ere/page/page-load-game.js —— 读档成功分支（完整页面见「存档与读档界面」）
async function load_and_init(sav) {
  if (await era.loadData(sav)) {
    // 这里可以插入对旧版本存档的修复
    // 初始化事件队列，让队列跟随存档
    init_queue();
    return true;
  }
  return false;
}
```

### 4. 把队列内容变成可执行函数

调用方永远要能 `await xxx()`，所以队列为空时返回一个「假事件」而不是 `undefined`：

```javascript
// ere/sys/sys-get-random-event.js
const { get_random_event } = require('#/sys/sys-event-queue');

const { run_custom_lines } = require('#/event/lines/lines-factory');

/**
 * 从指令的队列里获取一个随机事件，然后转换成可执行的异步函数对象并返回<br>
 * 这里用异步函数对象的返回值表示是否跳过后续正常的口上输出
 *
 * @param hook 指令的枚举值
 * @returns {function:Promise<boolean|void>} 随机事件的可执行版本
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

调用点（注意「返回 `true` 就跳过通用口上」的方向）：

```javascript
// ere/page/homepage.js 的【聊天】分支
async function talk() {
  if (!(await sys_get_random_event(hooks.talk)())) {
    await run_custom_lines(era.get('flag:当前角色'), hooks.talk);
  }
}
```

### 5. 往队列里塞事件

事件由口上方法自己产生（例程：好感度 ≥ 10 时排一个 `interrupt`）：

```javascript
// ere/event/lines/lines-2.js 摘录
const relation = era.add(`relation:${this.id}:0`, 2);
// 好感度高于 10 点则向 hooks.talk 的队列添加一个随机事件，
// 并用事件对象的属性指定口上方法 interrupt
if (relation >= 10) {
  const event = new EventObject(this.id);
  event.event = 'interrupt';
  add_event(hooks.talk, event);
}
```

---

## 口上（自定义台词）系统

「口上」= 每个角色自己的一套台词方法。它不是引擎 API，而是官方例程用
**枚举 + 基类 + 工厂**实现的模式。

### 数据流

```
调用方（homepage / page-ero）
   └─ run_custom_lines(id, hook, event?)          ← 工厂（唯一入口）
        ├─ get_custom_lines(id)                    ← 按 ID 取（缓存的）口上实例
        │     └─ cons_dict[id] || CustomizedLines  ← 角色专属类，缺省用基类
        │           └─ .get_this()                 ← 多套口上的切换点
        ├─ new LineArg()                           ← 参数对象，result 决定要不要跑通用处理
        ├─ obj[hooks.keys[hook]](arg)              ← 普通调用：枚举值 → 方法名
        │  或 obj[event.event](arg, event)          ← 随机事件调用：事件名 → 方法名
        └─ if (arg.result) lines_result[hook](id)  ← 通用后处理（好感度 +1 之类）
```

### 1. 指令枚举

```javascript
// ere/data/event/hooks.js
// 定义了所有可能触发口上指令的枚举
// 注意这个枚举中枚举值的名字和 #/event/lines/lines-common.js 中的口上方法应该是一一对应的
const hooks = {
  // 聊天
  talk: 0,
};
Object.keys(hooks).forEach((e, i) => (hooks[e] = i));
// 用 hooks.keys 放所有枚举值的名字
// 注意 hooks.keys 这个数组中每个枚举值名字的下标正好是枚举值
hooks.keys = Object.keys(hooks);

module.exports = hooks;
```

**约定（很容易踩坑）：枚举成员名 === 口上类上的方法名**，`hooks.keys[hook]` 是
「枚举值 → 方法名」的反查表。加一个新指令 = 在 `hooks` 里加成员（值不用管，会被重新编号）
+ 基类里加同名方法 + `lines-result.js` 里加同名通用处理。

### 2. 三个值对象

```javascript
// ere/data/event/line-arg.js
// 用于表示口上参数的类
class LineArg {
  // result 表示是否要执行通用处理
  result = true;
}

module.exports = LineArg;
```

```javascript
// ere/data/event/check-object.js
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

`EventObject` 见上一节的 `ere/data/event/event-object.js`。

- `LineArg.result`（默认 `true`）：口上方法里把它设成 `false`，工厂就**不再**执行通用后处理。
- `CheckObject`：`buffer` 是给人看的算式片段（`' + 15 (能力 [C感觉] Lv.5)'`），`check` 是累加出来的
  实行值，`border` 是阈值。

### 3. 基类：角色 ID / 姓名 / 称呼 + 多口上切换点

```javascript
// ere/event/line-base.js
const era = require('#/era-electron');

/**
 * 角色口上和调教指令口上的共同的基类，声明一些基本的内容以避免反复
 */
class LineBase {
  /**
   * @param {number} id 角色的编号
   */
  constructor(id) {
    this.id = id;
    /** @type {string} 角色的真名 */
    this.name = era.get(`callname:${this.id}:-1`);
    /** @type {string} 角色的默认称呼 */
    this.callname = era.get(`callname:${this.id}:-2`);
  }

  get_this() {
    return this;
  }
}

module.exports = LineBase;
```

`get_this()` 是「一个角色多套口上」的接缝：子类可以让它返回**另一个实例**，
这样同一角色就能通过 `cflag:<id>:口上` 在几套台词之间切换。

### 4. 最小 2 类示例

第一类：通用基类（没有专属台词的角色都走这一套）。

```javascript
// ere/event/lines/lines-common.js
const era = require('#/era-electron');

const LinesBase = require('#/event/line-base');

// 角色口上基类，主要实现地文
class CustomizedLines extends LinesBase {
  /**
   * 【聊天】对应的口上方法
   *
   * @param {LineArg} arg
   */
  // eslint-disable-next-line no-unused-vars
  async talk(arg) {
    await era.printAndWait(['和 ', this.callname, ' 寒暄了一会……']);
  }

  // 【切换口上】对应的口上方法
  async switch() {
    await era.printAndWait('并无多口上……');
  }
}

module.exports = CustomizedLines;
```

第二类：给 1 号角色写专属台词，并实现「切换口上」：`switch()` 翻转 `cflag:1:口上`。
（只有一套口上时这个开关没有可见效果，再加上一个重写 `get_this()` 的继承类才真正切换。）

```javascript
// ere/event/lines/lines-1.js
const era = require('#/era-electron');

const CustomizedLines = require('#/event/lines/lines-common');

// 小红对应的第一口上继承类，直接以匿名类导出
module.exports = class extends CustomizedLines {
  async talk() {
    await era.printAndWait([this.callname, ' 分享了一些好玩的事情。'], {
      color: era.get(`cstr:${this.id}:代表色`),
    });
  }

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

> 想给同一角色做多套口上，就再写一个继承类并重写 `get_this()`：让它按 `cflag:<id>:口上`
> 返回另一套口上的实例。工厂里注册的始终是**最外层那一套**。

### 5. 工厂：注册表 + 实例缓存 + 分发

```javascript
// ere/event/lines/lines-factory.js
const CustomizedLines = require('#/event/lines/lines-common');
const lines_result = require('#/event/lines/lines-result');

const hooks = require('#/data/event/hooks');
const LineArg = require('#/data/event/line-arg');

const cons_dict = {};

// 有专属口上的角色在这里注册，值是那个口上类；示例只展开 1 号角色
cons_dict[1] = require('#/event/lines/lines-1');
// cons_dict[2] = require('#/event/lines/lines-2');

const obj_dict = {};

/**
 * 通用入口函数之一，返回角色ID对应的实例化继承类，或者实例化的基类
 *
 * @param {number} id
 * @returns {CustomizedLines}
 */
function get_custom_lines(id) {
  if (!obj_dict[id]) {
    obj_dict[id] = new (cons_dict[id] || CustomizedLines)(id);
  }
  return obj_dict[id].get_this();
}

module.exports = {
  get_custom_lines,
  /**
   * 通用入口函数之二，会根据 hook 对应的枚举值直接调用口上对象中的相应口上方法，
   * 并且根据 arg.result 决定是否要执行通用处理
   *
   * @param {number} id 角色的ID
   * @param {number} hook 指令的枚举值
   * @param {EventObject} [event] 事件对象，可能是空的
   * @returns {Promise<boolean|void>} 供随机事件系统用的返回值，true 表示跳过正常口上流程
   */
  async run_custom_lines(id, hook, event) {
    const obj = get_custom_lines(id),
      arg = new LineArg();
    let ret;
    // 如果不是随机事件的可执行版本，或者口上对象没有对应事件名的方法，
    // 就按照指令的枚举值调用口上方法
    if (event === undefined || obj[event.event] === undefined) {
      // 用 hooks.keys 取枚举值对应的名字，再取口上对象里的同名方法
      // Function.call 在这里是为了防错，照抄就好
      await obj[hooks.keys[hook]].call(obj, arg);
    } else {
      // 否则按照随机事件对象指定的事件名调用口上方法
      ret = await obj[event.event].call(obj, arg, event);
    }
    // 如果在口上方法里没有设置 arg.result，就执行通用处理函数
    if (arg.result) {
      // 这里直接使用枚举值
      // 口上类里用枚举值的名字是因为用枚举值的话一些 IDE 不会正确提示重载关系
      await lines_result[hook](id);
    }
    return ret;
  },
};
```

### 6. 通用后处理

每个 hook 在 `lines-result.js` 里有一个同名通用处理（用**计算属性名** `[event_hooks.talk]`，
这样键就是枚举值 `0`）。它在角色口上没设置 `arg.result = false` 时被调用：

```javascript
// ere/event/lines/lines-result.js
const era = require('#/era-electron');

const event_hooks = require('#/data/event/hooks');

// 导出一个对象，放置所有指令的通用处理
// [event_hooks.talk] 是取值，所以这个函数最后导出的时候名字就会是 '0'
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

### 7. 随机事件返回 `true` 就跳过通用口上

```javascript
// ere/event/lines/lines-2.js 摘录
module.exports = class extends CustomizedLines {
  // 随机事件的口上方法
  async interrupt(arg) {
    await era.printAndWait([this.callname, ' 打断了聊天。'], {
      color: era.get(`cstr:${this.id}:代表色`),
    });
    arg.result = false;
    era.println();
    era.add(`relation:${this.id}:0`, 10);
    await era.printAndWait(['和 ', this.callname, ' 的好感度上升了 10 点……']);
    // 通过返回 true 打断后续的口上执行
    return true;
  }
};
```

三点合起来才是完整的「跳过」：

1. `interrupt` 自己把 `arg.result = false`，所以工厂不会跑 `lines_result[hooks.talk]`；
2. 方法最后 `return true`，成为 `run_custom_lines` 的返回值 → `sys_get_random_event` 包装的
   那个可执行函数的返回值；
3. 调用方 `if (!(await sys_get_random_event(hooks.talk)()))` 拿到 `true`，于是**不执行**
   当前角色普通的 `talk`。

### 8. 调教口上是同一套形状

`ere/event/ero/` 完全对称，只是把 `hooks` 换成 `action_enum`、把 `lines_result` 换成
「通用结算 `result_handlers`」，返回值语义变成「这一回合要不要结算」：

```javascript
// ere/event/ero/ero-factory.js 摘录
module.exports = {
  async run_custom_ero(id, action, check) {
    const obj = get_custom_ero(id),
      func = action_enum.keys[action],
      arg = new LineArg();
    // 两种调用情况：
    // 1. 做实行值检查：通过后调用通用处理并返回 true 通知页面结算，
    //    不通过则设置 arg.result = false 跳过通用处理；
    // 2. 重载跳过了实行值检查：需要在口上方法最后手动 return true 通知页面结算。
    const ret = await obj[func].call(obj, arg, check);
    if (arg.result && result_handlers[action] !== undefined) {
      await result_handlers[action](id, check);
      return true;
    }
    return ret;
  },
};
```

```javascript
// ere/event/ero/ero-2.js —— 重载跳过实行值检查的例子
const CustomizedEro = require('#/event/ero/ero-common');

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

> 重载掉「带 `check` 参数」的版本时，`arg.result` 仍是初始的 `true`，所以 `run_custom_ero`
> 会走 `result_handlers` 分支并返回 `true` —— 页面结算是靠**`run_custom_ero` 的返回值**，
> 不是靠 `arg.result`。

---

## 调教（训练）系统

### 生命周期

```
era.beginTrain(0, target)      创建所有「仅限调教」的表，并为这些角色建子表
   ↓  ┐
   │  │ 每个回合：
   │  │   读 param / 写 source / 写 delta / 写 nowex
   │  │   era.nextTurnInTrain() → delta → param，nowex → ex，清空 source/delta/nowex
   │  ┘   （循环，直到玩家点结束或体力不足）
   ↓
era.endTrain()                 gotjuel(gotjewel) 累加进 juel(jewel)，然后删除所有调教专用表
```

**只有 `beginTrain()` 之后才存在的表**（在此之前读它们会拿到 `undefined`；读一维的 `tflag`
还会直接报 `key error in getter/setter!`）：

| 表 | 维度 | 用途 |
| --- | --- | --- |
| `tflag` | 1D | 调教期间的临时标记（例程用「前回行动」） |
| `deltabase` | 2D | `base` 的待结算增减，`nextTurnInTrain` 时并入 `base`（钳制到 `0..maxbase`） |
| `palam`（别名 `param`） | 2D | 调教参数：快C / 快V / 润滑 / 欲望 / 痛苦 / 否定 |
| `delta` | 2D | 本回合参数的待结算增减，`nextTurnInTrain` 时并入 `palam` |
| `gotjuel`（别名 `gotjewel`） | 2D | 本场调教累计的宝珠，`endTrain` 时并入 `juel` |
| `source` | 2D | 本回合的「来源」（一次指令提供的刺激量），`nextTurnInTrain` 时清空 |
| `stain` | 2D | 污垢，按位表示的位域 |
| `ex` / `nowex` | 2D | 回合级标记（高潮次数、体力/气力消耗），`nextTurnInTrain` 时 `nowex` 并入 `ex` |
| `tequip` | 2D | 装着中的调教装备（例程用「媚药」） |
| `tcvar` | 2D | 其他调教临时变量 |

> 这些表都在 `era.endTrain()` 里被**删掉**。任何需要长期保存的数值都不要放在它们里，
> 该放 `flag` / `global` / 普通 2D 角色表。
>
> 另一条源码级硬规则：`param` 是 **`palam` 的别名**，`jewel`/`gotjewel` 是
> **`juel`/`gotjuel` 的别名**。`param:角色:快C` 读写的是调教参数，`jewel:角色:快C` 才是宝珠数量 ——
> 名字像，但不是同一张表。

### 最小可跑的调教页

调教口上的工厂（`#/event/ero/ero-factory.js`）与上一节的口上工厂完全同形，这里不再重复：
把 `cons_dict` 换成 `#/event/ero/ero-<角色ID>`、把 `lines_result` 换成
`#/event/ero/ero-result.js` 注册出来的 `result_handlers` 即可。下面把「台词 + 通用结算」
内联进页面，保证单独抄下来就能跑。

指令枚举（`Object.keys().forEach((k, i) => …)` 会给成员**按声明顺序重新编号**，
`action_names` / `action_checks` 都用枚举值做键，所以三者永远同步）：

```javascript
// ere/data/ero/action-const.js 摘录
const era = require('#/era-electron');

const actions = {
  pet: 0,
  masturbate: 0,
  missionary: 1,
  stimulate_g_spot: 2,
  poison: 3,
  lubricant: 4,
};
Object.keys(actions).forEach((k, i) => (actions[k] = i));
actions.keys = Object.keys(actions);

const action_names = [];
action_names[actions.pet] = '爱抚';
action_names[actions.masturbate] = '要求自慰';
action_names[actions.missionary] = '正常位';
action_names[actions.stimulate_g_spot] = '刺激G点';
action_names[actions.poison] = '媚药';
action_names[actions.lubricant] = '润滑';

// 可用性检查：返回 falsy 的指令不会出现在按钮里
const action_checks = {};
action_checks[actions.stimulate_g_spot] = () =>
  era.get('tflag:前回行动') === actions.missionary ||
  era.get('tflag:前回行动') === actions.stimulate_g_spot;
action_checks[actions.poison] = (target) =>
  era.get(`tequip:${target}:媚药`) === 0 && era.get('item:媚药') > 0;

module.exports = { action_checks, action_enum: actions, action_names };
```

例程还用它限制了「润滑不足且持有润滑液时才能用润滑」（要用到 `get_param_level`）。
真实项目里指令的**台词**放在 `#/event/ero/ero-<角色ID>.js`、**通用结算**放在
`#/event/ero/ero-result.js`，由上一节的 `run_custom_ero(id, action, check)` 串起来。

调教页本体：

```javascript
// ere/page/page-train.js
const era = require('#/era-electron');

const {
  action_checks,
  action_enum,
  action_names,
} = require('#/data/ero/action-const');

// 每个指令的通用结算：写入本回合的 source / nowex
// （真实项目里这一步放在 #/event/ero/ero-result.js，由 run_custom_ero 调用）
function settle_action(target, action) {
  if (action === action_enum.pet) {
    era.set(`nowex:${target}:体力消耗`, 5);
    era.set(`nowex:${target}:气力消耗`, 50);
    era.set(`source:${target}:快C`, 20);
    era.set(`source:${target}:欲望`, 50);
    era.add(`exp:${target}:C经验`, 1);
    era.print('C经验+1');
  } else if (action === action_enum.missionary) {
    era.set(`nowex:${target}:体力消耗`, 50);
    era.set(`nowex:${target}:气力消耗`, 100);
    era.set(`source:${target}:快V`, 50);
    // 润滑不足会带来痛觉
    if (era.get(`param:${target}:润滑`) < 3000) {
      era.set(`source:${target}:痛觉`, 1000);
    }
    era.add(`exp:${target}:V经验`, 1);
    era.print('V经验+1');
  }
}

async function page_train() {
  // 玩家（调教者）固定是 0 号角色，被调教者是当前互动角色
  const target = era.get('flag:当前角色');
  // 【必须】不调用 beginTrain，下面的 tflag / param / delta / nowex / source 全部不存在
  era.beginTrain(0, target);
  era.set('tflag:前回行动', -1);
  let flag = true;
  while (flag) {
    await era.clear();
    era.drawLine({ content: `调教 · ${era.get(`callname:${target}:-2`)}` });
    era.print([
      '体力 ',
      Math.floor(era.get(`base:${target}:体力`)).toLocaleString(),
      ' / ',
      Math.floor(era.get(`maxbase:${target}:体力`)).toLocaleString(),
      '　气力 ',
      Math.floor(era.get(`base:${target}:气力`)).toLocaleString(),
      ' / ',
      Math.floor(era.get(`maxbase:${target}:气力`)).toLocaleString(),
    ]);
    // paramkeys 是变量序号数组，paramname 取显示名
    era.get('paramkeys').forEach((e) =>
      era.print([
        era.get(`paramname:${e}`).toUpperCase(),
        '：',
        Math.floor(era.get(`param:${target}:${e}`)).toLocaleString(),
      ]),
    );
    era.drawLine();
    const buffer = [];
    // 有条件检查且没通过的指令不输出
    Object.keys(action_enum.keys)
      .filter((e) => !action_checks[e] || action_checks[e](target))
      .forEach((e) =>
        buffer.push({
          accelerator: Number(e),
          config: { width: 8 },
          content: action_names[e],
          type: 'button',
        }),
      );
    buffer.push({
      accelerator: 200,
      config: { width: 8 },
      content: '结束调教',
      type: 'button',
    });
    era.printMultiColumns(buffer);
    const ret = await era.input();
    if (ret === 200) {
      flag = false;
      continue;
    }
    // ——— 一个回合 ———
    era.drawLine();
    era.print(['【', action_names[ret], '】']);
    settle_action(target, ret);
    // 来源结算：能力[快V] 把来源乘以 2^(2×等级)，素质[V感觉] ±50%
    let source =
      era.get(`source:${target}:快V`) << (2 * era.get(`abl:${target}:V感觉`));
    source *= 1 + 0.5 * era.get(`talent:${target}:V感觉`);
    era.set(`source:${target}:快V`, source);
    // 来源 → delta：nextTurnInTrain 时才真正加进 param
    const param =
      era.get(`param:${target}:快V`) + era.add(`delta:${target}:快V`, source);
    // 高潮：每 10,000 点一次，最多 2 次，结算后参数回到 1,000
    const orgasm = Math.min(Math.floor(param / 10000), 2);
    if (orgasm > 0) {
      era.print(['V高潮', '强烈V高潮'][orgasm - 1]);
      era.set(`delta:${target}:快V`, 1000 - era.get(`param:${target}:快V`));
    }
    era.set(`nowex:${target}:V高潮`, orgasm);
    // 体力/气力消耗：先写 nowex，再从 base 里扣现值
    const hp_down = era.add(`nowex:${target}:体力消耗`, 20),
      sp_down = era.add(`nowex:${target}:气力消耗`, 40);
    era.add(`base:${target}:体力`, -hp_down);
    era.add(`base:${target}:气力`, -sp_down);
    era.print([
      '体力-',
      Math.floor(hp_down).toLocaleString(),
      ' 气力-',
      Math.floor(sp_down).toLocaleString(),
    ]);
    await era.waitAnyKey();
    // 收尾：记住这次行动，delta → param、nowex → ex，清空 source / delta / nowex
    era.set('tflag:前回行动', ret);
    era.nextTurnInTrain();
    if (era.get(`base:${target}:体力`) < 500) {
      await era.printAndWait('（体力到达了界限，调教结束）');
      flag = false;
    }
  }
  // 【必须】结束调教：gotjuel 累加进 juel，然后删除所有调教专用表
  era.endTrain();
}

module.exports = page_train;
```

### 延伸：例程结算里的其他分支

下面两段摘自官方例程 `ere/page/page-ero.js`，是上面的页面没有展开的部分：

```javascript
// 爱液渗出：把这一回合的快感增量记进 source[液体]，再转成润滑
const s_liquid = era.add(
  `source:${cur_chara}:液体`,
  era.get(`delta:${cur_chara}:快C`) + era.get(`delta:${cur_chara}:快V`),
);
era.add(`delta:${cur_chara}:润滑`, s_liquid);

// 刻印：按本回合的痛苦 delta 发牌（≥500 / ≥1200 / ≥3000 三档，只升不降）
const old_pain = era.get(`mark:${cur_chara}:苦痛`);
if (d_pain >= 500 && d_pain < 1200 && old_pain === 0) {
  era.set(`mark:${cur_chara}:苦痛`, 1);
  era.print(['取得了 苦痛刻印 Lv.1']);
} else if (d_pain >= 1200 && d_pain < 3000 && old_pain <= 1) {
  era.set(`mark:${cur_chara}:苦痛`, 2);
  era.print(['取得了 苦痛刻印 Lv.2']);
} else if (d_pain >= 3000 && old_pain <= 2) {
  era.set(`mark:${cur_chara}:苦痛`, 3);
  era.print(['取得了 苦痛刻印 Lv.3']);
}
```

宝珠要在 `endTrain()` **之前**结算：例程先把 `param` 换算成宝珠写进 `gotjewel`（本场累计），
显示完再 `era.endTrain()`，由引擎把 `gotjuel` 并进 `juel`：

```javascript
// ere/page/page-ero.js 结尾
async function end_ero(cur_chara) {
  // 宝珠结算
  await check_jewel(cur_chara);
  await check_deny(cur_chara);
  // 结束调教，把 gotjewel 结算到 jewel 里然后删除所有调教相关的表
  era.endTrain();
}
```

实行值算式的拼装见 `ere/sys/sys-check-action.js`：`add_abl_check` / `add_mark_check` /
`add_param_check` / `add_talent_check` / `add_tequip_check`，每个都**既往 `check.buffer` 里塞一段
人话**（`' + 15 (能力 [C感觉] Lv.5)'`），**又返回它对实行值的贡献**，所以调用方负责累加：

```javascript
// ere/event/ero/ero-common.js 摘录：要求自慰的实行值检查
module.exports = class extends CustomizedEro {
  async masturbate(arg, check) {
    check.check += add_param_check(check.buffer, this.id, '快C', 1);
    check.check += add_talent_check(check.buffer, this.id, 'C感觉', 2);
    check.check += add_abl_check(check.buffer, this.id, 'C感觉', 3);
    check.border = 30;
    check.buffer.push(check.buffer.length > 0 ? ' = ' : '', check.check.toString());
    const success = check.check - check.border;
    check.buffer.push(success > 0 ? ' > ' : success === 0 ? ' = ' : ' < ');
    check.buffer.push(check.border.toString(), ' (实行值)');
    await era.printAndWait(check.buffer.join(''), { fontSize: '0.75rem' });
    if (success < 0) {
      arg.result = false;
      await this.masturbate_reject();
      return;
    }
    await this.masturbate_agree();
  }
};
```

---

## 存档兼容性

### 引擎给了什么保证

`era.loadData()` 成功后会自动跑一次 `fillData()`，因此**新增内容不会让老存档读不出来**：

- 存档里没有的**变量数据表**会被创建，普通表每个变量填 `0`，`cstr` 表填 `''`；
- 存档里没有的**变量**同样补 `0` / `''`；
- 新增的**道具**（`Item.csv` 里新加的行）会补上 `hold = 0`、`sales = 0`、
  `price` 取 `Item.csv` 的价格；
- 新加的**角色变量表子表**会为所有已添加角色建好并初始化；
- 登记在 `system.extendedCharaTables` 里的扩展二维表也会被初始化。

所以「更新版本后玩家用旧存档继续玩」是默认支持的，**不需要写迁移代码**。

### 三条会破坏老存档的操作

1. **不要给已有变量重新编号。**
   存档里存的不是变量名，而是**变量序号**（`data.flag[11]` 这样的数组下标），
   变量名 ↔ 序号 的映射来自 `csv/` 的声明。把 `11,事件队列` 改成 `4,事件队列` 后，
   老存档 `data.flag[11]` 里的值就成了没有名字的孤儿，而新的 `4` 号位置是 `0` ——
   表现为「玩家进度莫名清零」，且**不会报任何错**。
2. **不要复用已删除变量的序号。**
   删掉 `11,事件队列` 之后又把别的变量写成 `11,新东西`，老存档里那一格数据会被新变量直接继承。
3. **不要把需要长期保存的数据放进调教专用表。**
   `tflag` / `palam(param)` / `delta` / `deltabase` / `gotjuel(gotjewel)` / `source` / `stain` /
   `ex` / `nowex` / `tequip` / `tcvar` 由 `era.beginTrain()` 创建、由 `era.endTrain()` 删除，
   它们不属于标准存档结构。

正确做法只有一种：**在 CSV 末尾追加新变量 / 新表**，编号往后排。

```csv
; csv/Flag.csv —— 旧版本
0,日元
10,当前角色
11,事件队列

; csv/Flag.csv —— 新版本：只在末尾追加，前面一个字都不动
0,日元
10,当前角色
11,事件队列
12,已解锁章节
13,通关次数
```

新的二维角色表要同时在 `_fixed.json`（或 `_config.json`）里登记，否则引擎会当成一维表：

```json
{
  "system": {
    "extendedCharaTables": ["回忆"]
  }
}
```

```csv
; csv/回忆.csv —— 登记后 era.get('回忆:1:初次见面') 才是二维角色表
0,初次见面
1,初次调教
```

### 版本号与最低支持版本

`csv/GameBase.csv` 里有两个版本字段，它们决定老存档能不能读：

```csv
版本,0002
最低支持版本,0001
```

- **版本**（`gamebase.version`）：写进每个存档；显示用的版本号是 `version / 1000`。
- **最低支持版本**（`gamebase.allowVersion`）：`era.loadData()` 检查
  `存档的 version >= allowVersion`，低于就直接返回 `false`（读档界面里表现为点了没反应）。

| 改动 | 要不要动版本号 |
| --- | --- |
| 只追加变量 / 追加表 / 追加道具 / 追加角色 | **不用动** `最低支持版本`，只把 `版本` 往前走 |
| 修改了已有变量的语义（同一格数据含义变了） | 把 `最低支持版本` 提到新版本，老存档会被拒绝 |
| 调整了 `gameCode`（游戏标识） | 所有老存档立刻失效（`loadData` 会检查 `code`） |

`gameCode` 是存档的「游戏指纹」，除非故意作废全部存档，否则**永远不要改**。

### 读档处的补丁位

`era.loadData` 只负责把数据搬进来；如果某次更新必须对老存档做一次性修正，
就写在读档成功、`init_queue()` 之前的位置：

```javascript
// ere/page/page-load-game.js 的读档成功分支：先修数据，再 init_queue()
async function patch_and_init(sav) {
  if (await era.loadData(sav)) {
    // 按老规则补齐某个新变量（只在它还是初始值时才写，避免覆盖新存档）
    if (era.get('version') < 2 && era.get('flag:已解锁章节') === 0) {
      era.set('flag:已解锁章节', 1);
    }
    // 初始化事件队列，让队列跟随存档
    init_queue();
    return true;
  }
  return false;
}
```

`era.get('version')` 读的是**这个存档**的版本号，可以据此判断它来自哪一代。
但更推荐的做法仍然是：**只追加、不改语义**，让补丁位保持为空。
