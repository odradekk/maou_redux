---
name: ere-game-development
description: Use when creating, extending, debugging, or packaging an EraElectron (ere / era-electron) game — a JavaScript ERA-style text game that runs on the ere engine from a game folder containing csv/ (static data) and ere/ (scripts). Covers scaffolding a runnable project, pages and the game loop with the era.* API, CSV tables and characters, saves, 口上/.kojo dialogue, validation, and building the packaged/Android form.
---

# 制作 ere 游戏

> **在本项目里使用**（移植自 dsh-ere-game-builder v1.3.2，来源与本地改动见 `tools/ere-game-builder/README.md`）
>
> - 文中的 `ere_*` 工具改用命令行 `node tools/ere-game-builder/cli.mjs <工具名> [--参数 值]`，参数名与原工具相同，加 `--help` 看说明。文中的「插件」指 `tools/ere-game-builder/`，`assets/` 指它下面的 `assets/`。
> - 知识库按引擎 5.0.0 核对；本项目运行引擎 4.8.0，静态数据只用 `yml/`。两边不一致时，引擎行为以 `dev-guides/` 和 app.asar 里的引擎源码为准，写法和目录组织以 `AGENTS.md` 和现有代码为准。
> - 本项目的检查以 `npm test`、`npm run lint`、`npm run format:check` 为准。`ere_check_game` 在本项目上会大量误报数据路径错误（`CFlag.yml` 等表按约定不登记名字、`portcflag` 是 `_fixed.json` 声明的扩展表、表名动态拼接），不要按它的输出改 `ere/` 或 `yml/`。

EraElectron（简称 **ere**）是基于 Electron 的 ERA 游戏引擎，游戏用 **JavaScript（CommonJS）** 编写，
界面用行列输出描述，数据用 **CSV 静态数据文件** 声明。本技能负责「把游戏做出来并且真的能在引擎里跑起来」。

## 三条铁律

1. **不要凭记忆写 API。** 名字写错不会报错，只会静默 `undefined`。用 `ere_api_lookup` 确认签名，用
   `ere_search_reference` 确认用法。
2. **不要凭记忆写数据路径。** `era.get('flag:金钱')` 里的表名与变量名必须与 `csv/` 中的声明一字不差。
3. **写完了必须用 `ere_check_game` 检查，并修掉所有 errors。** 然后再让用户用引擎实际打开一次。

## 标准工作流

```
1. ere_scaffold_game        在目标目录生成一个可直接运行的最小工程（csv/ + ere/ + SDK）
2. read/write/edit          改 csv/ 里的数据表、写 ere/ 下的游戏脚本
3. ere_check_game           静态检查：结构、静态数据（csv/json/yml）、数据路径、API 名、语法、require 解析、.kojo 口上、开发套件
4. ere_search_reference     遇到不确定的 API / 数据表 / 配置时检索内置知识库
5. 请用户用引擎【游戏】-【打开游戏】选目录实跑；改完脚本按 Ctrl/Command+R 重载
6. 正式发布前：提醒用户跑 unimported 查未使用文件（见「发布前自查」一节）
```

如果目标目录已经是一个 ere 工程，直接从第 2 步开始，**先读一遍 `csv/` 与 `ere/main.js`** 再动手。

如果只写 `.kojo` 口上、手上没有游戏工程，用 `ere_check_kojo` 直接查那个文件或目录（见「口上（`.kojo`）」一节）。

## 一个 ere 游戏由什么组成

```
游戏文件夹/
├── csv/                       静态数据（引擎唯一必需的目录；也支持 json/ 或 yml/）
│   ├── GameBase.csv           游戏信息表 —— 必需，缺了引擎直接拒绝加载
│   ├── Flag.csv / Base.csv …  变量数据表：声明存档里有哪些变量
│   └── Chara/Chara0000.csv    角色预设数据（可以放在 csv/ 的任意子目录）
├── ere/                       游戏脚本集
│   ├── era-electron.js        引擎 SDK —— 必需，从引擎的 sdk/era-electron.js 原样复制
│   ├── main.js                入口，必须 module.exports = async () => {…}
│   └── page/ event/ sys/ utils/ data/   你自己组织的模块
├── res/                       可选：图片与音频注册表
└── webpack.config.js 等       可选：只用于打包版 / 安卓版
```

引擎的加载顺序：读配置 → 读 `csv/`（或 json/yml）→ 读脚本集 → 把 SDK 的 API 注入
`era-electron.js` → 等玩家按键 → 调用 `main.js` 导出的函数。

> 只有 `csv/GameBase.csv`、`ere/main.js`、`ere/era-electron.js` 是**引擎必需**的；
> 其余表、角色、页面全部按需增删。

## 核心运行模型

游戏代码**不是 Vue 组件，也不碰 DOM**。一个「页面」就是一个 `async` 函数：

```javascript
const era = require('#/era-electron');

async function page_home() {
  let running = true;
  while (running) {
    await era.clear();                       // 清屏（异步！）
    era.drawLine({ content: '主界面' });      // 画分割线
    era.print('你好，世界');                   // 输出一行文本
    era.print(`金钱：${era.get('flag:金钱')}`);
    era.printButton('去冒险', 1);              // 按钮，快捷键 1
    era.printButton('回标题', 99);

    switch (await era.input()) {             // 等待玩家点击/按键，返回快捷键
      case 1:
        await era.printAndWait('你踏上了旅途。');
        break;
      case 99:
        running = false;
        break;
    }
  }
}

module.exports = page_home;
```

要点：

- `era.print*` 只是「画」，`await era.input()` 才「停」并拿到返回值；两者总是在循环里配合。
- `era.clear`、`era.input`、`era.waitAnyKey`、`era.printAndWait`、`era.delay`、`era.saveData`、
  `era.loadData`、`era.rmData`、`era.saveGlobal`、`era.loadGlobal`、`era.resetGlobal`、`era.isLandscape`
  都是**异步**的。
  - **顺序等待**时加 `await`；**需要并发时故意不加**，改成接 `.then()` —— 这就是引擎的「多线程」，**不是写漏了**。
    实时玩法、计时器、动画、自动播放、跳过演出都靠它：见 `references/systems.md` 的「实时循环、计时与演出」
    （帧时钟 `await era.delay(150)` + 不 `await` 的 `era.input({any:true})` + `era.replaceInColRows` 重绘；
    该文件开头的索引表列出了每一节的行号，只读这一节即可）。
    **判断「引擎做不到」之前先查这一节** —— 「能不能做」和「该不该做」是两件事，先把前者查清。
- 排版是 **24 列网格**：`config.width`（1–24）、`config.offset`（0–23）；
  一行放多个元素用 `era.printMultiColumns([...])` / `era.printInColRows(...)`。
- 界面分层的通用做法：进入子界面前记住 `era.getLineCount()`，返回后
  `await era.clear(era.getLineCount() - 记录值)` 只清掉子界面画出来的行。

## 游戏入口

```javascript
// ere/main.js
const era = require('#/era-electron');

const page_home = require('#/page/home');

module.exports = async () => {
  let running = true;
  while (running) {
    await era.clear();
    era.setAlign('center');
    era.drawLine({ isSolid: true });
    era.print('我的游戏');
    era.print(`v${era.get('gamebase').version / 1000}`);   // gamebase 是只读对象
    era.drawLine({ isSolid: true });
    era.printButton('开始游戏', 1);
    era.printButton('读取存档', 2);
    era.printButton('离开游戏', 3);
    era.setAlign('left');

    switch (await era.input()) {
      case 1:
        era.resetData();                                   // 清空当前存档数据
        [0, 1].forEach((id) => era.addCharacter(id));      // 按 Chara*.csv 初始化角色
        era.set('flag:金钱', 1000);
        await page_home();
        break;
      case 3:
        running = false;
        break;
    }
  }
  era.quit();
};
```

## 读写数据

`era.get` / `era.set` / `era.add` 的参数是「表名[:角色ID]:变量名」：

```javascript
era.get('flag:金钱');                 // 一维表：flag:变量名
era.set('flag:金钱', 500);
era.add('flag:金钱', 100);

era.get('base:1:体力');               // 二维表：表名:角色ID:变量名
era.get('maxbase:1:体力');            // 上限（base 的写入会被钳制到 0..maxbase）
era.get('abl:1:技巧');
era.get('cstr:1:代表色');

era.get('item:体力药');               // item 是一维扁平表，不要写 item:角色ID:道具
era.get('itemprice:体力药');

era.get('callname:1:-2');             // 旁白对角色 1 的称呼
era.get('relation:1:0');              // 角色 1 对角色 0 的好感度
era.get('global:saves:1');            // 存档栏位 1 的备注
era.get('gamebase').title;            // GameBase.csv（只读）
era.get('flagnames');                 // 所有 flag 变量名（还有 flagkeys / flagentries）
```

表名清单、变量名清单、别名规则见 `ere-data-files` 技能与 `assets/reference/wiki-digest.md`；
**变量名必须与 `csv/` 中的声明完全一致**（引擎会把它们按小写存取）。

## 存档

```javascript
await era.saveData(1, '存档 1');       // sav/1.sav
await era.loadData(1);                // 返回是否读档成功
await era.rmData(1);
era.set('global:saves:1', '新备注');
await era.saveGlobal();               // 备注改完要写回 global.sav
```

读档会拒绝「游戏标识不同」或「版本低于最低支持版本」的存档。读档成功只替换存档数据，
**你自己维护的运行时状态要重新初始化**。

## 口上（`.kojo`）：写完先自查

`.kojo` 是 YAML，**字典键（`%CHARA%`、`%COLOR%` 这类）不在这份文件里定义** —— 它们由游戏代码在调用
篇目时作为字典传进去（`await kojo['打招呼']({ CHARA: chara.name })`）。所以 `.kojo` 的写法错误几乎都是
**静默**的：引擎不抛异常，只是内容消失或设置失效。

**写完一段口上、贴进游戏之前，用 `ere_check_kojo` 过一遍**（`path` 传文件或目录，不需要游戏工程）：

| 会静默失效的写法 | 实际后果 |
| --- | --- |
| 条目下多写一个 `- `（变成嵌套数组，如 `- - content: …`） | 引擎不为它生成任何代码，**整条消失** |
| 分段文本里写 `color: %COLOR%`（字典键用在 span 上） | 字典只替换 span 的 `content`，这里是字面量 `%COLOR%`，颜色失效 |
| 分割线（`divider: true`）的 `content` 里写 `%KEY%` | `drawLine` 不做字典替换，`%KEY%` 原样显示 |
| 按钮（`acc`）条目上写 `color` / `title` / `fontSize` … | 按钮分支只把 `content` 与 `acc` 交给 `printButton`，这些键一律无效 |
| `if` 里出现 `module` / `require` 子串 | 条件被安全检查**静默删除**，分支恒真 |
| 同一按钮组 `acc` 重复 | 引擎把后者递增到下一个空位，你写的快捷键不是玩家按的那个 |

工具同时按篇目列出这份口上用到的全部字典键，方便和游戏开发者对齐：**列出 ≠ 定义**，它不判断游戏是否
提供了这些键。还要记住：**带 `content` 条目的整行 `color`**（`color: %COLOR%` 配 `content`）是会被替换的，
和「分段文本里的 color」不是一回事。

引擎 4.8.5 起，构建期与运行期也会做一次结构校验（只报告、不中断加载）；`ere_check_kojo` 的价值是
**不用构建、不用启动游戏**就能查到，并且把确定性问题报成 error。

两个检查器**共用一份实现**（`lib/kojo.js`），没有两套规则：`ere_check_game` 从工程出发、把 `.kojo`
的问题混在工程问题里报；`ere_check_kojo` 只认 `.kojo`，并额外给按篇目的字典键清单。改了游戏里的 `.kojo`
就照常跑 `ere_check_game`，不用两个都跑。

**静态检查通过 ≠ 效果没问题。** 排版、颜色、按钮位置好不好看，只有引擎说了算。**向作者提这件事，并给出
测试工程地址**：[kojo-test](https://gitgud.io/umaera/game/kojo-test) —— 把 `.kojo` 的内容贴进它的
`ere/test.kojo`，在引擎里【游戏】-【打开游戏】选该目录（`ere` 的父目录），进入后按篇目逐个执行、逐行打印。

> 注意：kojo-test 的 `ere/main.js` 调用篇目时传的是空字典（`{}`），所以 `%CHARA%` 这类占位符在那里会
> **原样显示**、`%COLOR%` 也不生效。那是测试工程自身的现状，**不要据此改口上**。想看到替换效果，需要让
> 用户自己给 `ere/main.js` 的 `dict` 填值。

插件维护的是一份**独立实现**（不 vendor 引擎的 `kojo-loader/src/validate-kojo.js`）；与引擎规则的对齐靠
`scripts/selftest.mjs` 的 **rule parity** 一节 —— 引擎加规则时在那里补 fixture，不要去改引擎的校验器。

## 发布前自查：未使用文件（`unimported`）

`ere_check_game` 只判断「游戏能否被引擎加载」，**不管有没有文件没人 import** —— 那是发布前的清理工作，
交给外部工具 [`unimported`](https://www.npmjs.com/package/unimported)。**本插件不运行它**（不装、不跑工程里的
npm 工具、也不联网），这里只是推荐做法。

> **正式发布游戏之前，主动提醒用户跑一次 `unimported`。** 没人引用的页面、事件脚本或资源注册代码会白占
> 打包体积，更容易让人误以为某段逻辑还在生效。

```json
// .unimportedrc.json
{
  "entry": ["ere/main.js"],
  "extensions": [".js"],
  "ignorePatterns": ["node_modules/**", "**/*.config.js"]
}
```

- **若它把 `ere/era-utils/**`（开发套件）报成未使用** —— 属于常见现象：套件是引擎按静态数据生成的，
  未必每个模块都被用到（尤其 `chara/`、`names/` 这类子目录）。此时**问用户是否要把 `ere/era-utils/**`
  加进 `ignorePatterns`**，不要替用户决定 —— 套件删掉不会报错（可重新生成），保留也无害。
- **`.kojo` 不用做这个检查**：`extensions` 只配了 `.js`，而 `.kojo` 是 YAML、走 kojo-loader，对打包体积与
  模块解析的影响远小于 `.js`。要查就让用户自己查。
- **被列出的文件只是候选**，删之前先确认真没人引用 —— 生成物与间接引用最容易误判：

  ```bash
  # 例：怀疑 era-utils 没人引用时（names/ 就曾被误判为"旧残留"）
  grep -rn "#/era-utils/" <工程>/ere --include="*.js" | grep -v "/ere/era-utils/"
  ```

## 什么时候查哪里

| 需求 | 用哪个 |
| --- | --- |
| 确认某个 `era.*` 的签名、参数、返回、config 字段 | `ere_api_lookup` |
| 找某个功能的做法（进度条、多列排版、商店、口上、kojo、打包…） | `ere_search_reference` |
| **写一个具体系统（标题界面 / 主界面 / 存读档界面 / 商店 / 随机事件队列 / 口上 / 调教 / **实时循环与演出**）的参考实现** | `read` 本技能目录下的 `references/systems.md` —— **先看文件开头的索引表，用 `offset` / `limit` 只取需要的小节，那一整个文件有 1900 行**。**调教**另见下面「参考实现」：插件那份偏薄，按那里的流程问开发者要不要取官方例程 |
| 深入某个主题 | `read` 本技能目录下的 `references/`，或插件的 `assets/reference/` |
| 检查工程能不能跑 | `ere_check_game` |
| **检查 `.kojo` 口上（不需要游戏工程）** | `ere_check_kojo` |
| 从零建工程 | `ere_scaffold_game` |

`assets/reference/` 里有五份大文档：`wiki-digest.md`（引擎与开发指南摘要）、
`api-digest.md`（源码级 API 语义）、`example-game.md`（官方例程的结论与坑点）、
`pitfalls.md`（常见错误速查）、`i18n.md`（多语言参考实现）。需要细节时直接读，不要猜。
`example-game.md` 只讲官方例程的**结论与坑点**，不再逐文件导航 —— 导航在例程自己的 `AGENTS.md` 里。

## 参考实现

官方例程 [ere-example](https://gitgud.io/umaera/game/ere-example)（只有 `master`）是完整可运行的游戏，
插件**不打包**它，按需取。

**开始一个工程时问开发者**：以例程为起点，还是用最小模板（`ere_scaffold_game`）？两条路都行：

- **以例程为起点** ⇒ clone 到开发者指定的目录，然后改造：改 `csv/GameBase.csv`（游戏标识 / 版本 / 标题）→
  按下文「变量写法」处理 → 用 `ere_check_game` 检查。
- **只作参考** ⇒ 写具体系统时按需取一份，放在**游戏工程之外**的目录。放进工程里会被 webpack 打包，
  `ere_check_game` 也会把它当成游戏脚本一起查。

**地图**：例程根目录的 `AGENTS.md` 是「系统 → 文件 → 读取顺序」的地图。**有它就照它读**，不要自己扫描、
总结这份例程 —— 那既费 token，结论也不稳。没有 `AGENTS.md` 说明这份副本该更新了，让开发者自己处理：

- 干净的 git 仓库（`git remote get-url origin` 指向 `ere-example`、且没有本地改动）→ 原地 `git pull`；
- 否则（不是仓库 / 有本地改动 / 拉不下来）→ 请开发者 clone 一份新的，或直接问他要一个现成路径。

**什么时候取**：写 **调教（训练）系统**时问一次要不要参考（其余系统的参考实现，插件的
`references/systems.md` 已经够用）。开发者拒绝过之后，**本次会话不要再问**。调教那套文件多，
读取顺序见地图，别只读 `page-ero.js`。

**变量写法**：动手前先看工程里有没有 `ere/era-utils`（开发套件）：

- **有** ⇒ 全程跟着它写：表名与变量用套件导出的，不要写 `era.get('flag:当前角色')` 这种字符串路径。
  从例程抄代码时注意 —— 例程是旧写法，迁移到套件风格**会多花一笔 token**，先跟开发者说清再动手。
- **没有** ⇒ 按字符串路径写。**不要自己造套件**：它只能由人在引擎界面【帮助】-【生成开发套件】生成。
