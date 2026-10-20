---
name: ere-engine-api
description: Use when you need the exact EraElectron (ere) SDK surface — the signature, parameters, return value, or config-object fields of any era.* call (print, printButton, input, get/set/add, saveData, playMusic, logger…), the meaning of a ButtonConfig / TextConfig / ColumnConfig / ProgressConfig / WholeImageConfig field, or the behaviour of an API that "does nothing".
---

# ere SDK API 参考

> **在本项目里使用**（移植自 dsh-ere-game-builder v1.3.2，来源与本地改动见 `tools/ere-game-builder/README.md`）
>
> - 文中的 `ere_*` 工具改用命令行 `node tools/ere-game-builder/cli.mjs <工具名> [--参数 值]`，参数名与原工具相同，加 `--help` 看说明。文中的「插件」指 `tools/ere-game-builder/`，`assets/` 指它下面的 `assets/`。
> - 知识库按引擎 5.0.0 核对；本项目运行引擎 4.8.0，静态数据只用 `yml/`。两边不一致时，引擎行为以 `dev-guides/` 和 app.asar 里的引擎源码为准，写法和目录组织以 `AGENTS.md` 和现有代码为准。
> - 本项目的检查以 `npm test`、`npm run lint`、`npm run format:check` 为准。`ere_check_game` 在本项目上会大量误报数据路径错误（`CFlag.yml` 等表按约定不登记名字、`portcflag` 是 `_fixed.json` 声明的扩展表、表名动态拼接），不要按它的输出改 `ere/` 或 `yml/`。

游戏代码通过 SDK 控制引擎：

```javascript
const era = require('#/era-electron');
```

`ere/era-electron.js` 是引擎仓库 `sdk/era-electron.js` 的**原样副本**：里面只有声明和防空壳，
引擎在加载脚本后会把自己的实现注入进去，并写 `era.version.engine`。所以：

- **不要修改这个文件的内容**，升级引擎时用新版本覆盖它。
- SDK 里没有的成员不等于不能调用：`era.raw()`、`era.proxyKojo()` 是引擎运行时挂上去的（见下）。
- 反之，控制台对象才有 `era.logData` / `era.logStatic` / `era.cleanSave`，**游戏脚本里不可用**。

## 怎么查最准

| 想要 | 做法 |
| --- | --- |
| 某个 API 的签名 + 参数 + 返回 + 相关 config 类型 | `ere_api_lookup` |
| 某个功能的完整语义、真实用法、坑点 | `ere_search_reference`；没命中再用 read 按小节读 `assets/reference/api-digest.md`（1500 行，**别整篇读**） |
| 一张按用途分组的完整签名表 | 读本技能目录下的 `references/api-cheatsheet.md` |
| 某个 config 字段有哪些取值 | 速查表末尾的「config 类型定义」，或 `ere_api_lookup('printButton')` 会自动带出 `ButtonConfig` |

**先查再写。** 引擎对不存在的 API 名会输出一条 `unsupported api!` 日志但不抛错，
对不存在的变量名会**静默返回 `undefined`**，凭记忆写几乎必然踩坑。

## 分组速览

- **输出与排版**：`print` / `println` / `printAndWait` / `printButton` / `drawLine` /
  `printMultiColumns` / `printInColRows` / `replaceText` / `replaceInColRows` / `printProgress` /
  `setToBottom`，以及一批默认样式 `setAlign` `setColor` `setOffset` `setWidth`
  `setHorizontalAlign` `setVerticalAlign`。全部返回所画的行号；都**只画不停**。
- **输入**：`input(config)`、`waitAnyKey()` —— 异步，`await` 之后才继续。
- **屏幕与系统**：`clear(lineCount?)`、`getLineCount()`、`setTitle`、`quit`、`delay`、
  `notify`、`toggleDebug` / `isDebug`、`isLandscape`、`logger`（`logger.debug/info/warn/error`）。
- **图片与音频**：`checkImage`、`printImage`、`printWholeImage`、`setBack`、`setOverlay`、`setMask`、
  `playMusic` / `stopMusic` / `resumeMusic`（需要 `system.resource` 打开并在 `res/` 注册资源）。
- **图表**：`printLineChart`。
- **数据**：`get` / `set` / `add` / `raw`。
- **角色**：`addCharacter` / `resetCharacter` / `removeCharacter` / `getAddedCharacters` / `getAllCharacters`。
- **调教**：`beginTrain` / `addCharacterForTrain` / `getCharactersInTrain` / `nextTurnInTrain` / `endTrain`。
- **存档**：`saveData` / `loadData` / `rmData` / `saveGlobal` / `loadGlobal` / `resetData` / `resetGlobal`。
- **元信息**：`version`（`{ sdk, engine }`）、`isEra`。

## 布局速记：24 列网格

引擎的界面是一行行「列元素」组成的 24 列网格。每个元素的 `config` 有：

- `width`：占多少列（1–24）
- `offset`：左侧空多少列（0–23）
- `align`：自身对齐 `'left' | 'center' | 'right'`（注意不是 `textAlign`）
- `color`、`height`（进度条高度）等

一行放多个元素用 `era.printMultiColumns([...], config)`；要嵌套行用 `era.printInColRows(...)`，
它的每个参数是 **`{ columns: [...], config? }`**（`ColumnObject`，**没有 `type`**），或者直接给一个网格对象数组。

⚠️ **两端都会静默丢弃缺 `type` 的元素**（不报错、不显示）—— 引擎按 `type !== undefined` 过滤：

```javascript
// era-api-base.js inColRows：过滤 ColumnObject 的 columns 内部元素
columns: obj.columns.filter((y) => typeof y === 'object' && y.type !== undefined)
// era-api.js printMultiColumns：过滤顶层元素
columns: objects.filter((x) => typeof x === 'object' && x.type !== undefined)
```

所以 `printInColRows` / `replaceInColRows` 的 `columns` 里、以及 `printMultiColumns` 的数组里，
**每个网格对象都必须带 `type`**（`'text'` / `'button'` / `'image'` / `'image.whole'` / `'progress'` / `'divider'` 等）。
少写 `type` 的效果是那一项凭空消失，控制台不会有任何提示。

```javascript
era.printMultiColumns([
  { config: { width: 4 }, content: '体力', type: 'text' },
  {
    config: { color: '#009300', height: 20, width: 8 },
    inContent: '2000 / 2000',
    percentage: 100,
    type: 'progress',
  },
]);
```

元素类型（`type`）与对应 config 见速查表的 config 类型定义：
`text`（`TextConfig`）、`button`（`ButtonConfig`）、`progress`（`ProgressConfig`）、
`divider`（`DividerConfig`）、`image` / `image.whole`（`WholeImageConfig`）、`row`（`ColumnConfig`）。

## 容易踩的三个行为

1. **写错名字不报错。** `era.get('flag:金币')` 与 `era.set('abl:1:技巧')` 里的表名/变量名，
   写错就是 `undefined`；`era.add` 对非数值还会算出 `NaN`。用 `ere_check_game` 检查全部数据路径。
2. **`base` 的写入被钳制**在 `0 .. maxbase`。想绕过就用 `era.raw().data.base[id][序号] = v`（`era.raw()` 返回活引用）。
3. **调教表在 `beginTrain` 之前不存在。** `tflag` / `tequip` / `tcvar` / `palam` / `delta` /
   `gotjuel` / `source` / `stain` / `ex` / `nowex` / `deltabase` 要读完 `era.beginTrain(...)`
   才能读写；只有 `juel`（宝珠）在任何时候都能用。

其余行为细节（`era.input` 的 `config.rule` / `hideInput`、`era.clear` 的行数语义、
`era.notify` 的参数、`era.printAndWait` 与 `waitAnyKey` 的区别等）见 `assets/reference/api-digest.md`
的「Detailed semantics」一节，或直接用 `ere_api_lookup` 看 SDK 的 JSDoc。
