# EraElectron (ere) 引擎技术摘要

> **阅读提示**：本文由 EraElectron（ere）引擎源码与官方 Wiki 整理而成。文中形如 `src/...`、`sdk/...` 的路径都相对**引擎仓库**根目录，`era-electron.wiki/...` 相对 Wiki 仓库 —— 都不是相对本文件的路径。
> 本插件内置的 `assets/sdk/era-electron.js` 与引擎仓库的 `sdk/era-electron.js` 逐字节相同，可直接作为 SDK 的真值来源。
> **本文是快照。** 如与引擎源码、SDK 或当前 wiki 有出入，以它们为准。

> 来源：EraElectron 引擎的 Wiki 仓库 `era-electron.wiki`（home.md、dev-guides.md、_sidebar.md、dev-guides/01-basic.md ~ 20-updates.md、A-api-docs.md、B-tool-class.md、C-kojo.md、D-ere-games.md、E-erauma-train.md）。
> 本文只摘录文档中明确写出的内容，标识符、路径、CSV 行、代码均照抄原文。文档未提到的内容不做补充。

EraElectron（简称 ere）是基于 Electron 的 ERA 引擎，游戏脚本语言为 JavaScript，前端为 Vue.js + Element Plus。基于 ere 的游戏称「ere 游戏」。官方例程：`ere-example`；面向对象风格例程：`ereKanon`。

---

## 1. 项目结构

### 1.1 完整可执行 ere 游戏的最小结构（01-basic 原文）

```
游戏文件夹
├── csv（静态数据文件夹）
│   ├── GameBase.csv
│   ├── _config.json（可选）
│   ├── _fixed.json（可选）
│   └── 其他csv文件
├── ere（游戏脚本集）
│   ├── main.js
│   ├── era-electron.js（或者其他可被识别为SDK的脚本文件）
│   └── 其他文件或文件夹
├── res（多媒体资源文件夹，可选）
└── ere.config.json（可选）
```

### 1.2 引擎启动时的读取顺序（01-basic）

1. 启动 EraElectron；
2. 读取上一次打开的游戏路径，或提示选择游戏文件夹。按顺序查找：① EraElectron 文件夹下的 `game` 文件夹；② EraElectron 之前打开的游戏文件夹。顶部菜单栏【游戏】-【最近打开】记录标题、版本号和路径；
3. 读取游戏设置文件（`ere.config.json` → `csv/_config.json` → 默认配置，再被 `_fixed.json` 覆盖）；
4. 读取 `游戏文件夹/csv/*.csv`。**`GameBase.csv`（或任意大小写格式）最重要，没有它引擎不会继续运行游戏**；
5. （如果有 `res` 文件夹）读取 `游戏文件夹/res/*.csv`，注册所有图片和音频文件。csv 与 res 读取后的内容称为该游戏的**静态数据**；
6. 读取并加载 `游戏文件夹/ere` 下的游戏脚本集，入口为 `游戏文件夹/ere/main.js`。`ere` 文件夹下**必须**有一个类似 `era-electron.js` 的 SDK 脚本；引擎加载完脚本后会查找加载过的 SDK 并建立其内容与引擎内容的链接（**注入**），没有这一步游戏程序无法控制引擎；
7. 加载完成后引擎显示加载完成信息并要求玩家按任意键；
8. 玩家操作后，引擎按静态数据定义重置所有变量，然后执行游戏脚本定义的程序。重置时从 `游戏文件夹/sav` 读取 `global.sav`、扫描该文件夹所有 `*.sav`。

### 1.3 项目根目录/子目录中出现的文件与目录

| 路径 | 性质 | 用途（文档依据） |
|---|---|---|
| `csv/` | 必须 | 静态数据文件夹；文件夹名可为 `csv`/`CSV`/任意大小写；也可整体改用 `json`/`yml` 文件夹 |
| `csv/GameBase.csv` | 必须 | 游戏基本信息表 |
| `csv/_config.json` | 可选 | 默认游戏配置（JSON） |
| `csv/_fixed.json` | 可选 | 强制游戏配置并锁定设置项（JSON） |
| `csv/Flag.csv`、`Item.csv`、`Global.csv`、`Base.csv`、`Abl.csv`、`Talent.csv`、`CFlag.csv`、`CStr.csv`、`Equip.csv`、`Mark.csv`、`Exp.csv`、`Param.csv`/`Palam.csv`、`TFlag.csv`、`TCvar.csv`、`TEquip.csv`、`Source.csv`、`Ex.csv`、`Stain.csv`、`_Replace.csv` | 可选 | 变量数据表与游戏信息表；**变量数据表文件不能放到 csv 文件夹的子文件夹中** |
| `csv/CharaXXXX.csv`、`csv/Chara/*.csv` | 可选 | 角色数据表，文件名以 `Chara` 的任意大小写形式开头，可放在 csv 文件夹下任意位置（含子文件夹） |
| `ere/` | 必须 | 游戏脚本集 |
| `ere/main.js` | 必须 | 游戏脚本入口（引擎以 `#/main.js` 为入口） |
| `ere/era-electron.js` | 必须 | SDK，脚本控制引擎的核心；`require('#/era-electron')` 引入。文档建议**不要改名或移动位置**（改名需改 webpack 的 `sdkPath`/路径） |
| `ere/jsconfig.json` | 可选（推荐） | 让 WebStorm 把 `#` 理解为 `ere` 文件夹 |
| `ere/era-utils/` | 生成 | 【帮助】-【生成开发套件】生成 |
| `res/` | 可选 | 多媒体资源；每个子文件夹中的 csv 只能注册**同文件夹**内的资源 |
| `res/*.csv` | 可选 | 图片/音乐注册文件（如 `res/注册.csv`） |
| `ere.config.json` | 自动/可选 | 当前游戏配置，引擎每次读完会写回 |
| `sav/` | 自动 | 存档文件夹；`sav/global.sav`、`sav/save*.sav` |
| `package.json`、`package-lock.json`、`node_modules/` | 开发用 | npm 包与依赖（`package-lock.json` 可删除） |
| `.eslintrc.js` | 可选 | eslint 配置 |
| `webpack.config.js` | 安卓打包用 | webpack 打包配置 |
| `build/static.json` | 生成 | 【帮助】-【生成静态文件】-【安卓】生成，供安卓打包 |
| `dist/` | 生成 | webpack 输出：`era.bundle.js`、`main.bundle.js`、`static.json`（及可选 `res`） |
| `ci/pages.js`、`ci/build.js`、`ci/android.js` | 可选 | GitLab CI 脚本 |
| `.gitlab-ci.yml` | 可选 | GitLab CI 配置 |
| `.ere-min-version` | 可选 | 最小更新最低支持版本号（项目根目录文本文件） |

安卓版可运行游戏包结构（19-android）：

```
游戏文件夹
├── res文件夹（可选，和PC版引擎使用的多媒体资源 res 文件夹结构相同）
├── era.bundle.js
├── main.bundle.js
└── static.json
```

启动后会自动生成 `sav` 和 `ere.config.json` 等文件夹或文件；启用资源时安卓引擎会在 `res` 下自动生成 `.nomedia`。

---

## 2. 配置

### 2.1 package.json

eslint 开发依赖（02-ide 原文）：

```json
{
  "devDependencies": {
    "eslint": "^8.57.1",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.2.1",
    "eslint-plugin-require-sort": "^1.3.0",
    "eslint-plugin-sort-requires-by-path": "^1.0.2",
    "prettier": "^3.4.2"
  },
  "engines": {
    "node": ">=18"
  }
}
```

打安卓包时增加 `scripts`（19-android 原文）：

```json
{
  "scripts": {
    "webpack": "webpack"
  }
}
```

正文说明：ere 游戏不能使用第三方包提供的模块，一般把软件包放在 `devDependencies` 下或用 `npm install -D` 安装（18-tools）。建议 Node.js 偶数版本（18.x/20.x/22.x）。

### 2.2 .eslintrc.js（02-ide 原文）

```javascript
module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  root: true,
  rules: {
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
};
```

### 2.3 ere/jsconfig.json（02-ide 原文）

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "#/*": [
        "*"
      ]
    }
  }
}
```

作用：WebStorm 将文件路径中的 `#` 理解为 `ere` 文件夹，例如 `#/era-electron.js` → `ere/era-electron.js`，`#/event/rec/rec-factory.js` → `ere/event/rec/rec-factory.js`。

### 2.4 游戏配置三文件：ere.config.json / _config.json / _fixed.json（03-config）

运行原理：

1. 引擎读取游戏文件夹下的 `ere.config.json` 作为当前游戏配置；
   1. 没有 `ere.config.json` 时，从 `游戏文件夹/csv/_config.json` 读取默认配置；
   2. 没有 `_config.json` 时，引擎新建一套默认游戏配置；
2. 读取或创建配置后，读取 `游戏文件夹/csv/_fixed.json`，将游戏配置中与 `_fixed.json` 不同的内容强制改为 `_fixed.json` 的内容，并锁定设置界面中相应配置项；
3. 完成上述操作后，引擎将当前配置写回 `游戏文件夹/ere.config.json`。

优先级：`_fixed.json` > `ere.config.json` > `_config.json` > 引擎默认配置。
三种文件都是 JSON；因其中只有任意编码都相同的基础字符，**可以以任意编码保存**。`_config.json` 和 `_fixed.json` **必须是 JSON 格式**（09-static），可放在任意想使用的数据格式的静态数据文件夹下。

默认配置全文（03-config 原文）：

```json
{
  "system": {
    "_replace": false,
    "saveCompressedData": false,
    "resource": false,
    "saveFiles": 10,
    "collapseBlankLines": false,
    "hideUserInput": false,
    "disableClear": false,
    "extendedCharaTables": [],
    "static": "csv"
  },
  "window": {
    "width": 1000,
    "height": 880,
    "fontSize": 16,
    "audio": 100,
    "autoMax": false,
    "orientation": 1
  }
}
```

| 配置项 | 含义与取值 | 默认 |
|---|---|---|
| `system._replace` | 是否启用 `_Replace.csv` 定义来取代游戏加载信息等 | 禁用 |
| `system.saveCompressedData` | 是否把存档以 gzip 压缩保存（禁用时保存为 JSON）。**安卓版引擎中恒为禁用** | 禁用 |
| `system.resource` | 是否启用图片/音频资源 | 禁用 |
| `system.saveFiles` | 存档数量，10–99 之间的整数 | 10 |
| `system.collapseBlankLines` | 是否自动压缩空行/重复分割线 | 禁用 |
| `system.hideUserInput` | 是否隐藏用户任何输入（含按钮选择） | 禁用 |
| `system.disableClear` | 是否禁止清屏（引擎不再清空屏幕并无视所有清屏指令）。**慎用**：UI 本质是 HTML，不清屏会越来越卡 | 禁用 |
| `system.extendedCharaTables` | 扩展角色表；数组中的表名按角色相关表处理。**无法在引擎中设置** | `[]` |
| `system.static` | 静态数据文件格式，取值 `"yml"\|"json"\|"csv"`，对应静态数据文件夹名。**无法在引擎中设置** | `"csv"` |
| `window.width` | 窗口宽度（px，不含边框），640–3840 整数 | 1000 |
| `window.height` | 窗口高度（px，不含边框/标题栏/菜单栏），480–2160 整数 | 880 |
| `window.limit` | 禁止清屏时界面上保留的最大显示行数，64–1024 整数，仅在禁止清屏时生效。**4.8.6 之前开启禁止清屏时该上限不生效** | 512 |
| `window.fontSize` | 标准字号（px），12–36 整数；`rem` 单位以此为基准（1rem = 该字号） | 16 |
| `window.audio` | 音量，0–100 整数 | 100 |
| `window.autoMax` | 进入游戏后是否自动最大化 | 禁用 |
| `window.orientation` | 屏幕方向（安卓，PC 3.6.0 / 安卓 1.0.8+）：强制竖屏 / 自动 / 强制横屏 | 1 |

`_fixed.json` 片段示例（09-static）：

```json
{
  "system": {
    "extendedCharaTables": [
      "status"
    ]
  },
  "window": {
  }
}
```

```json
{
  "system": {
    "static": "csv"
  },
  "window": {
  }
}
```

### 2.5 .ere-min-version（20-updates）

- 项目文件夹**根目录**下必须有 `.ere-min-version`（用于最小更新版本检查）；
- 规则和 `GameBase.csv` 中的版本号相同，**可单独写在文件中**；
- 构建脚本读取方式为：读文件 → 去掉开头 BOM（`/^\uFEFF/`）→ 按 `\n` 分割 → 取第 0 项 → 去掉行尾空白。即**第一行为最低支持版本号**；
- `.gitlab-ci.yml` 中 `build` 必须写在 `pages` 之前。

### 2.6 build/static.json（19-android）

- 由 PC 版引擎菜单栏【帮助】-【生成静态文件】-【安卓】生成，位于游戏项目文件夹的 `build` 文件夹下；
- 定义一个对象，完整版分为三部分：
  - **静态数据**：`static`、`names`、`extend` 三个对象属性，保存各数据表变量信息及角色预设数据；
  - **默认设置**：`config` 和 `fixed` 两个对象属性，分别对应 `ere.config.json`（注意不是 `_config.json`）和 `_fixed.json`；
  - **多媒体资源**：`res` 对象属性。要包含 `res` 需生成时打开【启用资源】并已读取 res 的 csv；
- 打包时会把 `build/static.json` 最小化后复制为 `dist/static.json`；CI 中 `require('../build/static.json')` 并 `JSON.stringify` 写入 `dist/static.json`；
- CI 标签名是当前提交下 `GameBase.csv/json/yml` 和 `build/static.json` 中版本号 ÷ 1,000 的结果（版本号 1 → 标签 `0.001`；能整除 1,000 时补小数，如 1,000 → `1.0`）。

### 2.7 webpack.config.js（19-android 原文）

```javascript
// webpack.config.js
const { resolve } = require('path');

const EreWebpackPlugin = require('ere-webpack-plugin');

const out_type = 'self';

module.exports = {
  context: resolve(__dirname, 'ere/'),
  entry: {
    era: {
      import: './era-electron.js',
      library: { name: '_era', type: out_type },
    },
    main: {
      dependOn: 'era',
      import: './main.js',
      library: {
        name: 'game',
        type: out_type,
      },
    },
  },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: { chrome: '60' },
                  useBuiltIns: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  output: {
    path: resolve(__dirname, 'dist/'),
    filename: '[name].bundle.js',
  },
  performance: { hints: false },
  plugins: [new EreWebpackPlugin()],
  resolve: {
    alias: { '#': resolve(__dirname, 'ere/') },
  },
};
```

`.kojo` 支持的 loader 追加规则（C-kojo 原文）：

```javascript
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.kojo$/,
        use: [
          {
            loader: require.resolve('kojo-loader'),
            options: {
              sdkPath: '#/era-electron',
            },
          },
        ],
      },
    ],
  },
  // ...
};
```

---

## 3. ere JS 运行时 API

### 3.1 引入方式（A-api-docs）

```javascript
// 引入 SDK
const era = require('#/era-electron');

// 通过 era 对象调用 API
era.println();

// 或者通过解构赋值语法引入
const { println } = require('#/era-electron');
println();

// 解构赋值的同时改名
const { println: era_println } = require('#/era-electron');
era_println();
```

`#/` 由引擎转换为游戏文件夹下 `ere` 文件夹的路径（04-js-basic）。所有文件都**最多只被引入一次**（模块缓存）。SDK 被引擎「注入」后才能生效：在 `require` 与 `module.exports` 之间、未被函数包裹的部分调用 SDK 内容是**无效的**；近期版本中提前调用会弹出报错信息（04-js-basic）。

### 3.2 输出：era.print 系（A-api-docs + 06-output）

| API | 签名 | 返回 | 要点 |
|---|---|---|---|
| `print` | `print(content, config?)` | `number` 行数 | `content` 为空字符串或空数组时转而调用 `println` 输出空行 |
| `printAndWait` | `printAndWait(content, config?)` | `Promise<number>` **异步** | 等价于先 `print` 再 `waitAnyKey` |
| `printButton` | `printButton(content, accelerator, config?)` | `number` 行数 | 输出独占一行的按钮；`content` 内可用 `'\n'` 换行；`accelerator` 为数字快捷键 |
| `printImage` | `printImage(...names)` | `number` | 切分图；先传入的参数置于底部 |
| `printWholeImage` | `printWholeImage(name, config?)` | `number` | 全图；`names` 为 `string\|string[]`，数组中靠前的置于底部 |
| `printInColRows` | `printInColRows(...columnObjects)` | `number` | 一行中输出多列（嵌套子行） |
| `printMultiColumns` | `printMultiColumns(columnObjects, config?)` | `number` | 一行中输出多种内容 |
| `printLineChart` | `printLineChart(config)` | `number` | `config` 与 chart.js 的 line chart option 相同 |
| `printProgress` | `printProgress(percentage, inContent, outContent, config?)` | `number` | `percentage` 0–100 |
| `println` | `println()` | `number` | 输出一个空行 |
| `drawLine` | `drawLine(config?)` | `number` | 横向分割线 |
| `replaceText` | `replaceText(content, config?)` | `number` | 替换**此前最后输出的行**；返回值与此时 `getLineCount` 相同 |
| `replaceInColRows` | `replaceInColRows(...columnObjects)` | `number` | 替换最后输出的行为复杂行列结构 |
| `notify` | `notify(content, title?, type?, duration?)` | `void` | 界面右上角浮动提醒 |

`era.print` 的 `content`（TextContent，A-api-docs）可能是：

- `string`；
- 数组，元素可能是：
  - `PrintedSpan`；
  - 对象，其唯一属性可能是 `isBlank`（`true`，输出一个半角空格）、`isBr`（`true`，换行）、`isDivider`（`true`，纵向分隔符）；
  - 字符串。

`era.print` 的 `config`（TextConfig）：

| 属性 | 类型 | 默认 | 描述 |
|---|---|---|---|
| `align` | `'left'\|'center'\|'right'` | 跟随 `setAlign` | 网格内文本对齐 |
| `color` | `string` | `'white'` | 文本颜色 |
| `fontSize` | `string` | `'1rem'` | 单位可为 px/em/rem；推荐 rem |
| `isParagraph` | `boolean` | `false` | 段落（上下行之间较宽空隙） |
| `offset` | `number`，0–23 | 跟随 `setOffset` | 偏移量 |
| `width` | `number`，1–24 | 跟随 `setWidth` | 宽度 |

正文补充：`era.print` 也可传对象数组分段输出，一个元素一段但仍属同一行；`PrintedSpan` 有 `content`（必选）、`color`、`display`、`fontSize`、`fontStyle`、`fontWeight`、`title`、`url`；`{isBlank:true}` 输出一个约半个中文字符宽的空格（因为 HTML 会压缩连续空格）；`{isBr}` 是**显示意义**的换行（编程意义上仍是同一行，`await era.clear(1)` 会一同清除），想输出末尾空行需连续两个；`{isDivider}` 输出竖形分割线。`config` 的 `offset`/`width` 默认初始值分别为 0 / 24（08-ui）。

`era.printButton` 的 `config`（ButtonConfig）：

| 属性 | 类型 | 默认 | 描述 |
|---|---|---|---|
| `align` | `'left'\|'center'\|'right'` | 跟随 `setAlign` | 按钮对齐 |
| `badge` | `'dot'\|string` | `undefined` | 徽章；`'dot'` 为单纯一个点 |
| `buttonType` | `'primary'\|'success'\|'warning'\|'danger'\|'info'\|''` | 以按钮形式输出（`isButton` 为 `true`）时为 `''`；以选项形式输出时为 `'warning'` | 预设颜色：蓝/绿/黄/红/灰/白 |
| `color` | `string` | `undefined` | 自定义颜色；与 `isButton` 不同时生效（`isButton` 为 `true` 时严格按 `buttonType`） |
| `disabled` | `boolean` | `false` | 禁用后无法点击、快捷键也不返回 |
| `disableContinue` | `boolean` | `false` | _PC 4.3.0 / 安卓 1.2.3+_ 禁用自动快进 |
| `disableWarning` | `boolean` | `false` | 快捷键重复时是否禁用控制台警告 |
| `inTextAlign` | `'left'\|'center'\|'right'` | `'center'` | 按钮内文本对齐 |
| `isButton` | `boolean` | `false` | `true` 输出为按钮，`false` 输出为选项（链接） |
| `offset` | `number`，0–23 | 跟随 `setOffset` | 偏移量 |
| `showAcc` | `boolean` | PC `true`；安卓恒 `false` | `true` 显示为 `[快捷键] 按钮文本`，否则 `[按钮文本]` |
| `title` | `string` | `undefined` | 悬浮提示（3.5.0 加入） |
| `width` | `number`，1–24 | 跟随 `setWidth` | 宽度 |

`era.printProgress` 的 `config`（ProgressConfig）：

| 属性 | 类型 | 默认 |
|---|---|---|
| `align` | `'left'\|'center'\|'right'` | 跟随 `setAlign` |
| `barWidth` | `number`，1–24 | 24（无紧跟文本，占满网格） |
| `color` | `string` | `'#5a9cf8'` |
| `duration` | `number`，秒 | 0.6（**设为 0 关闭缓动**，适用于按帧渲染） |
| `easing` | `string`（CSS 缓动函数） | `'ease'` |
| `fontColor` | `string` | `undefined` |
| `height` | `number`，6–30（px） | 24 |
| `offset` | `number`，0–23 | 跟随 `setOffset` |
| `width` | `number`，1–24 | 跟随 `setWidth` |

`era.printProgress` 调用示例（06-output）：

```javascript
era.printProgress(100,'我是一个进度条，我占满了这一行','');
era.printProgress(50,'我是一个进度条，我占了一半的宽度','谢谢前面的老爷😠',{barWidth:12});
era.printProgress(100,'我是一个红色的进度条','',{color:'red'});
era.printProgress(100,'我是一个绿色的进度条，我的文字是黑色的','',{color:'green',fontColor:'black'});
era.printProgress(100,'我是一个紫色的进度条，我的文字是灰色的','那我呢',{barWidth:20,color:'purple',fontColor:'grey'});
```

`era.drawLine` 的 `config`（DividerConfig）：

| 属性 | 类型 | 默认 |
|---|---|---|
| `content` | `string` | `undefined` |
| `position` | `'left'\|'center'\|'right'` | `'center'` |
| `isSolid` | `boolean` | `false`（虚线） |
| `offset` | `number`，0–23 | 跟随 `setOffset` |
| `width` | `number`，1–24 | 跟随 `setWidth` |

`era.notify`：

- `content`：`string` 或 `({content:string,color:string,fontSize:string,fontWeight} | {isBr:true})[]`；
- `title`（可选）：`string`；
- `type`（可选）：`'success'|'info'|'warning'|'error'|''`；
- `duration`（可选）：毫秒，默认 5,000；为 0 时不自动消失。

`era.printWholeImage` 的 `config`（WholeImageConfig）：`fit`（`'fill'|'contain'|'cover'|'none'|'scale-down'`，默认 `'contain'`）、`offset`（0–23）、`width`（1–24）。

`era.printImage`：切分图严格遵循注册时填写的图片尺寸，不随窗口/网格变化；同一层可在同一字符串中用制表符 `\t` 分隔多个注册名，引擎取**第一个可以找到对应图片文件**的注册名显示；某层所有注册名都找不到时跳过该层。

`era.printWholeImage` 进阶：`names` 数组中的元素也可以是对象，属性有 `names`（string，必选）、`background`（string，默认 `''`）、`borderRadius`（number，px，默认 0）、`filter`（string，默认 `''`）。

### 3.3 输入：era.input 系

| API | 签名 | 返回 | 要点 |
|---|---|---|---|
| `input` | `input(config)` | `any` | 玩家输入内容或点击按钮的快捷键；**异步**（05-interaction 要求必须 `await`） |
| `waitAnyKey` | `waitAnyKey()` | `Promise<void>` **异步** | 等待玩家按任意键或点击界面；连续多次调用**只会生效一次**（中间没有其他输出 API 时） |

`era.input` 的 `config`：

- `disableBefore`（boolean，可选）：接收到输入后是否禁用之前输出的按钮，默认 `true`；
- `rule`（string，可选）：正则表达式，在没有输出按钮时限制玩家输入，使用时 `useRule` 必须为 `true`；
- `useRule`（boolean，可选）：是否启用规则检查，默认 `true`；
- `hideInput`（boolean，可选）：是否隐藏玩家输入，默认 `false`；
- `show`（boolean，**仅限安卓版**，可选）：是否显示输入框，`false` 时用按钮限制输入时输入框不显示。**PC 上不会隐藏输入框**（渲染层只把 `show` 用于行对象显隐，见 §10.5）；
- `any`（boolean，可选，**未在 API 文档中列出**）：为 `true` 时**敲下第一个字符就立刻 resolve，并返回那个字符**，且不回显、不打印该输入。实时玩法靠它读单键，见 §10.5。`era.waitAnyKey()` 内部就是 `input({any:true, useRule:false})`，但它**丢弃**按键值。

规则：每次 `era.input` 之后，之前输出的按钮被禁用；对一次 `era.input` 有效的按钮是上次 `era.input` 之后、本次之前用 `era.printButton` 输出的，**两次 `era.input` 之间输出的按钮必须给不同快捷键**。输出按钮时 `era.input` 只接受按钮快捷键值（Number）；未输出按钮时会返回任意输入。**era.input 会试图把玩家输入转换为 Number 类型，预期 String 时需自行转换**（如 `.toString()`）。若之前没有输出任何按钮，返回值不会是 `undefined` 或空字符串 `''`。

### 3.4 布局/辅助输出

| API | 签名 | 返回 | 说明 |
|---|---|---|---|
| `clear` | `clear(lineCount?)` | `Promise<number>` **异步** | 清除屏幕内容；`lineCount` 为从屏幕底部清理的行数，不设置或大于屏幕行数时清空整屏；返回清屏后行数。按右键快进遇到 `era.clear` 会在清屏前停下 |
| `delay` | `delay(delay)` | `Promise<void>` **异步** | 等待 ms；会卡住脚本 |
| `getLineCount` | `getLineCount()` | `number` | 当前界面显示行数；开启【自动压缩空行】时**也包含被隐藏的空行数量** |
| `setAlign` | `setAlign(textAlign)` | `void` | `'left'\|'center'\|'right'`；建议用完改回 `'left'` |
| `setHorizontalAlign` | `setHorizontalAlign(align)` | `void` | 设置 **printInColRows** 大网格横向对齐：`'start'\|'center'\|'end'\|'space-between'\|'space-around'\|'space-evenly'` |
| `setVerticalAlign` | `setVerticalAlign(align)` | `void` | `'top'\|'middle'\|'bottom'`；仅影响 printInColRows |
| `setOffset` | `setOffset(offset)` | `void` | 默认偏移量，0–23 |
| `setWidth` | `setWidth(width)` | `void` | 默认宽度，1–24 |
| `setToBottom` | `setToBottom()` | `number` | 输出一个占满整屏的空行 |
| `setTitle` | `setTitle(title)` | `void` | 设置标题栏游戏标题；默认 `${游戏名} v${游戏版本代号或版本号除以1,000} @ ${游戏ID}` |

`era.printMultiColumns` 的 `config`（ColumnConfig）：

| 属性 | 类型 | 默认 |
|---|---|---|
| `gutter` | `number`（px） | 0 |
| `horizontalAlign` | `'start'\|'center'\|'end'\|'space-between'\|'space-around'\|'space-evenly'` | `'start'` |
| `offset` | `number`，0–23 | 跟随 `setOffset` |
| `verticalAlign` | `'top'\|'middle'\|'bottom'` | `'top'` |
| `width` | `number`，1–24 | 跟随 `setWidth` |

网格对象（GridObject）：可能取值为 `ButtonObject`、`DividerObject`、`ImageObject`、`ProgressObject`、`TextObject`、`WholeImageObject`。

| 网格对象 | `type` 取值 | 其他属性 |
|---|---|---|
| ButtonObject | `'button'` | `accelerator`（number，必选）、`content`（string，必选）、`config`（ButtonConfig，默认 `{}`） |
| DividerObject | `'divider'` | `config`（DividerConfig，默认 `{}`） |
| ImageObject | `'image'` | `names`（`string\|string[]`，必选） |
| ProgressObject | `'progress'` | `percentage`（number，0–100，必选）、`inContent`（默认 `''`）、`outContent`（默认 `''`）、`config`（ProgressConfig） |
| TextObject | `'text'` | `content`（TextContent，必选）、`config`（TextConfig，默认 `{}`） |
| WholeImageObject | `'image.whole'` | `names`（必选）、`config`（WholeImageConfig） |
| ColumnObject | —（printInColRows 参数） | `columns`（GridObject[]，默认 `[]`）、`config`（ColumnConfig，默认 `{}`） |

排版要点（08-ui）：界面为 24 列网格，每列宽度为窗口宽度的 1/24；`offset` 0–23、`width` 1–24；`offset + width > 24` 会产生超出显示宽度的网格（超出部分直接消失，需拖动横向滚动条）；同一 Row 中网格自动换行，换行前显示行的高度按最高网格确定；`era.printMultiColumns` 输出内容在编程上属同一 Row，`await era.clear(1)` 会同时清除；`era.printInColRows` 用嵌套子行避免高度互相影响。

### 3.5 多媒体

| API | 签名 | 返回 |
|---|---|---|
| `checkImage` | `checkImage(...name)` | 单个返回 `boolean`，多个返回 `boolean[]` |
| `playMusic` | `playMusic(names, config?)` | `boolean`（是否找到并成功播放） |
| `stopMusic` | `stopMusic()` | `void` |
| `resumeMusic` | `resumeMusic()` | `void` |
| `setMask` | `setMask(maskName?, opacity?)` | `void`；不带参数调用时取消滤镜 |

`playMusic`：`names` 为 `string|string[]`（只播放第一个注册了的音乐文件）；`config` 有 `loop`（boolean）、`fade`（boolean）、`fadeInternal`（number，100–500 ms，默认 200 ms；**4.8.4 起才生效**，此前该参数无效）。
`setMask`：`maskName` 为图片注册名，`opacity` 0–1（0 全透明、1 全不透明）。

### 3.6 存档 API

| API | 签名 | 返回 |
|---|---|---|
| `saveGlobal` | `saveGlobal()` | `Promise<boolean>` **异步** |
| `loadGlobal` | `loadGlobal()` | `Promise<boolean>` **异步** |
| `resetGlobal` | `resetGlobal()` | `Promise<void>` **异步** |
| `saveData` | `saveData(savIndex, comment?)` | `Promise<boolean>` **异步** |
| `loadData` | `loadData(savIndex)` | `Promise<boolean>` **异步** |
| `rmData` | `rmData(savIndex)` | `Promise<boolean>` **异步** |
| `resetData` | `resetData()` | `void`（**非异步**，唯一非异步的存档 API） |

- `global.sav` 是 JSON，主体由 `Global.csv` 决定，另有 `code`（游戏标识）、`saves`（栏位号→备注）、`version`（游戏版本）属性。`era.saveGlobal` 还会在这些时机自动调用：`era.loadGlobal` 最后、`era.resetGlobal` 后、`era.saveData` 后、`era.rmData` 后。
- `era.loadGlobal` 会检查 `code` 是否与游戏标识相同（不同则拒绝读取并报错停止），检查 `version` 是否高于最低支持版本（否则报错并调用 `era.resetGlobal` 丢弃全部内容），把未初始化变量赋 0；扫描 sav 文件夹，有备注但文件丢失时在前面加 `(FILE LOST) `，有存档但无备注命名 `UNNAMED SAVE FILE`，有备注但已有 `(FILE LOST) ` 则清除该段文字。**每次开始执行游戏脚本前自动执行一次**。
- 特定存档 `save*.sav`：由栏位号区分（`*` 通常是自然数），一般 `save0.sav` 为自动存档栏位。栏位号可以是任意自然数；`system.saveFiles` 只影响引擎扫描的文件数量。
- `era.saveData` 保存前把当前游戏标识和版本号写入存档的 `code` 和 `version`；按【存档文件格式】决定是否 gzip 压缩；写文件后修改 global 表中相应栏位备注并调用 `era.saveGlobal`。**安卓版引擎跳过配置检查直接以 JSON 格式保存**。
- `era.loadData` 自动尝试 JSON 或压缩格式读取；检查游戏标识符合、版本高于最低支持版本，否则停止并返回 `false`；会为 Item.csv 新增道具设置 item 表、创建存档中不存在的数据表、为新增系统变量表变量赋 0、为所有角色在新增角色变量表创建子表并初始化（cstr 表 `''`，其他 0）。
- `era.resetData` 重置已读取存档为初始状态、清空所有数据表；在 GameBase 设置【初始角色编号】时会自动调用一次 `addCharacter`。

### 3.7 数据读写：era.get / era.set / era.add

| API | 签名 | 返回 |
|---|---|---|
| `get` | `get(varName)` | `any`，存档数据变量的值 |
| `set` | `set(varName, val)` | `any`，变量的新值 |
| `add` | `add(varName, val)` | `number`，与 `val` 相加后的数值（base 表变量会自动修正到 0–maxbase 之间） |

- `val=undefined` 时 `era.set` 只返回当前值，即 `era.get(varName)` 等价于 `era.set(varName, undefined)`。
- `era.add` 相当于 `+=`，**不对操作对象做任何类型识别**，非数值类型会产生意想不到的效果（大概率得到 `NaN`）。
- `varName` 支持的特殊用法：
  - `era.get('gamebase')` → 对象形式的所有 GameBase 数据，**只读**。示例：

    ```javascript
    const result = {
        author: "你",
        info: "第一款Era游戏",
        year: "202X",
        title: "Example",
        gameCode: 114514,
        version: 1,
        allowVersion: 1
    }
    ```
  - `era.get('version')` → 当前特定存档的版本号；val 为 Number 时 `era.set('version', val)` 设置它；
  - `era.get('chara')` → 所有有预设数据的角色 ID 数组（只读）；`era.get('chara:'+id)`（PC 4.3.2 / 安卓 1.2.4+）→ 该角色所有静态数据的对象；
  - `callname`：`` `callname:${A}:${B}` ``（A 对 B 的称呼；读取时先返回该值，否则返回 B 的默认称呼；A 或 B 未添加时返回 `'-'`）、`` `callname:${A}:-1` ``（A 的真实姓名）、`` `callname:${A}:-2` ``（旁白对 A 的称呼）、`` `callname:${A}` ``（A 对所有角色称呼的对象，属性名为角色 ID 或 -1/-2，只读）。**可读写**；
  - `relation`：`` `relation:${A}:${B}` ``（可读写）、`` `relation:${A}` ``（关系对象，只读）；
  - `love`：`` `love:${A}` ``，角色 A 对默认角色的爱慕值，**可读写**；
  - `global`：`'global:code'`、`'global:version'`、`` `global:saves:${Index}` ``（序号为 Index 的特定存档备注），**可读写**；
  - `static`：`` `static:${A}:name` ``、`` `static:${A}:callname` ``、`` `static:${A}:title` ``、`` `static${tableName}:${A}:${变量名或变量序号}` ``。

- 控制台专属：`era.logData()` 输出所有存档数据对象（属性 `data` 与 `global`；变量属性名是**变量序号**而非变量名），`era.logStatic()` 输出所有静态数据对象（属性 `static`（含基础数据、_Replace 数据、变量名↔序号映射、角色预设数据）、`names`（序号→变量名，方向与 static 相反）、`resources`）。`era.cleanSave(savIndex)` 删除存档（内部调用 `era.rmData`）。控制台对象 `era` 共 7 个函数：`add`、`get`、`set`、`logData`、`logStatic`、`toggleDebug`、`cleanSave`。

### 3.8 角色 API

| API | 签名 | 返回 | 说明 |
|---|---|---|---|
| `addCharacter` | `addCharacter(...charaId)` | 单个 `boolean`，多个 `boolean[]` | 向游戏中添加角色，在所有角色表中新建对象；会重新初始化角色。传 `[id, presetId]` 数组时用第二个参数对应角色的预设数据初始化第一个参数角色 |
| `resetCharacter` | `resetCharacter(...charaId)` | 同上 | 重新初始化角色，引擎内部实现为 `addCharacter` 的别名 |
| `getAddedCharacters` | `getAddedCharacters()` | `number[]` | 所有已添加角色的 ID，按添加顺序 |
| `getAllCharacters` | `getAllCharacters()` | `number[]` | 所有有预设数据的角色 ID（与 `era.get('chara')` 相同） |

`era.addCharacter` 的初始化内容：把 id 加入已添加角色列表；在所有非仅限调教使用的角色变量表中创建子表并初始化为预设值或初始值（一般 0，cstr 为 `''`）；把角色姓名和默认称呼赋给 callname 表中该角色的 `-1` 和 `-2`；把与其他已添加角色之间的称呼和好感度赋给 callname 表和 relation 表；根据当前 base 表给 maxbase 表赋值。

### 3.9 调教 API

| API | 签名 | 返回 | 说明 |
|---|---|---|---|
| `beginTrain` | `beginTrain(...charaId)` | `void` | 初始化调教系统，创建所有仅限调教有效的变量数据表并初始化 tflag 所有变量为 0；随后调用一次 `addCharacterForTrain`。**必须调用后才能进入调教**；变量数据表只创建一次，反复调用不会重置 |
| `addCharacterForTrain` | `addCharacterForTrain(...charaId)` | `void` | 在调教相关角色表中新建对象并初始化变量为 0；必须在 `beginTrain` 之后、`endTrain` 之前调用；不会重复初始化 |
| `getCharactersInTrain` | `getCharactersInTrain()` | `number[]` | 当前添加到调教中的角色 ID |
| `nextTurnInTrain` | `nextTurnInTrain()` | `void` | 将 delta 表结算到 param、nowex 结算到 ex，并清空所有角色的 source、delta、nowex 表 |
| `endTrain` | `endTrain()` | `void` | 结束调教，把 gotjewel 结算到 jewel，并删除所有仅限调教有效的变量数据表 |

### 3.10 调试/日志 API

| API | 签名 | 返回 | 说明 |
|---|---|---|---|
| `toggleDebug` | `toggleDebug()` | `boolean` | 切换调试模式，返回切换后是否处于调试模式（同步函数） |
| `isDebug` | `isDebug()` | `boolean` | 是否处于调试模式，不改变状态 |
| `logger.info` | `logger.info(msg)` | `void` | 控制台输出 INFO，附调用者及文件信息 |
| `logger.debug` | `logger.debug(msg)` | `void` | **仅在调试模式生效**，控制台输出并附调用者及文件信息 |
| `logger.error` | `logger.error(msg, stack?)` | `void` | 控制台输出 ERROR，并在界面右上角触发标题为「脚本错误」的浮动提醒；未传调用栈时自动填充 |
| `logger.warn` | `logger.warn(msg, stack?)` | `void` | _PC 4.2.2_ 控制台输出 WARNING，**不弹窗** |
| `logger.assert` | `logger.assert(checkVal, aimVal)` | `void` | 检查两者全等，不全等时在界面显示浮动提醒并在控制台输出调用栈；**非调试模式仍生效** |

用法示例（07-debug）：

```javascript
era.logger.error("这是一条报错信息");

// Error 是 JavaScript 内置的异常信息类
// try ... catch (e) ... 中的 e 就是 Error 类的实例
era.logger.error("这是一条带调用栈信息的报错信息", new Error().stack);
```

### 3.11 系统/其它

| API | 签名 | 返回 | 说明 |
|---|---|---|---|
| `quit` | `quit()` | `void` | 结束游戏并关闭引擎 |
| `isLandscape` | `isLandscape()` | `Promise<boolean>` **异步** | _PC 3.6.0 / 安卓 1.0.8+_ 是否处于横屏或强制横屏状态 |

隐藏参数：`era.print` 的 config 支持未在 API 文档中列出的 `flush`，用于强制输出内容（17-multithreading：`era.print('World!', { flush: true })`）。

`era.delay(ms)` 的文档在 A-api-docs 的 `## delay(delay)` 一节（「让当前函数等待一段时间」）。它**不是内部工具**：SDK 自带实现，并用 `_s = true` 标记让引擎不去覆盖它，游戏代码可以直接用 —— 而且它是实时循环的**帧时钟**，见 [§10](#10-多线程与实时循环17-multithreading)。

### 3.12 随机函数

**API 文档中没有 `era.random` 之类的随机 API。** 文档中出现的随机手段：

- `Math.random()`（.kojo 条件中可用；B-tool-class 的工具函数也基于它）；
- 通用工具类 `#/utils/value-utils`（B-tool-class 原文）：

```javascript
// value-utils.js
module.exports = {
  /**
   * 生成指定范围内的随机数
   *
   * @param {number} min - 随机数的最小值。
   * @param {number} max - 随机数的最大值。
   * @param {boolean} [is_float] - 是否生成浮点数，默认为 false。
   * @returns {number} - 生成的随机数。
   */
  get_random_value(min, max, is_float) {
    if (min >= max) {
      return min;
    }
    const dice = Math.random();
    if (is_float) {
      return min + (max - min) * dice;
    }
    return Math.floor(min + (max - min + 1) * dice);
  },
};
```

- `list-utils.js` 中的 `get_random_entry(list)`、`gacha(list, max)`、`distinct_list(list, key_cb)`、`sort_list(list, order_by, is_asc)`、`get_extremum_entry(list, order_by)`、`join_list(list, separator)`、`median(list)`；
- `color-utils.js` 中的 `get_gradient_color(_start, _end, ratio)`（返回 `rgb(...)` 字符串）。

### 3.13 控制台对象 ere

- `ere.showLines()`：输出当前界面上每个显示行的控制对象，可展开 `[[Target]]` 检查；启用调试模式时控制对象的 `_s` 属性会显示生成该对象的调用栈。
- 控制台对象 `era` 的函数（`add`/`get`/`set`/`logData`/`logStatic`/`toggleDebug`/`cleanSave`）全部需要跨模块通信（异步），**直接返回值都是 `undefined`，真正返回值紧跟其后出现在下一行**。文档警告：**永远不要在控制台中同时使用两个以上的 `era` 对象的函数**。

### 3.14 开发套件（生成的对象）

【帮助】-【生成开发套件】在 `ere` 文件夹下生成 `era-utils`，结构（18-tools 原文，ereKanon 为例）：

```
era-utils
├── chara
│   ├── era-abl.js
│   ├── era-base.js
│   ├── era-cflag.js
│   ├── era-delta.js
│   ├── era-ex.js
│   ├── era-exp.js
│   ├── era-gotjewel.js
│   ├── era-jewel.js
│   ├── era-mark.js
│   ├── era-maxbase.js
│   ├── era-nowex.js
│   ├── era-param.js
│   ├── era-source.js
│   ├── era-stain.js
│   ├── era-talent.js
│   └── era-tequip.js
├── era-chara.js
├── era-flag.js
├── era-info.js
├── era-item.js
├── era-tflag.js
└── names
    ├── era-abl-names.js
    ├── era-base-names.js
    ├── era-cflag-names.js
    ├── era-ex-names.js
    ├── era-exp-names.js
    ├── era-flag-names.js
    ├── era-item-names.js
    ├── era-mark-names.js
    ├── era-param-names.js
    ├── era-source-names.js
    ├── era-stain-names.js
    ├── era-talent-names.js
    ├── era-tequip-names.js
    └── era-tflag-names.js
```

- 系统变量表（一维表）直接生成在 `era-utils` 下（Flag → `era-flag.js`、Item → `era-item.js`、TFlag → `era-tflag.js`）；角色变量表（二维表）生成在 `era-utils/chara` 下，由 `era-chara.js` 引入；变量名↔序号映射在 `era-utils/names` 下；
- `era-chara.js` 导出 `EraChara` 类，静态方法 `EraChara.get(id)` 获取角色对象；对象有 `id`、`name`、`callname`、`love`、`title` 等属性（编号和称号只读），`callname_to`、`set_callname_to`、`relation_to`、`set_relation_to` 等方法，以及 `abl`、`base`、`cflag` 等对象属性；
- `era-info.js` 导出对象 `era_info`，有 `gamebase`、`version`、`saves` 属性（`saves` 可读写，且只支持 0 到生成时的游戏存档栏位数）；
- `era-item.js` 导出对象 `era_item`，每个道具一个对象属性，含 `count`、`price`、`sales`；另有 `bought`、`bought_name`（只读）、`sales`、`hold`（只读，代码变量名数组）、`clear_sales` 方法；
- 开发套件不依赖静态数据文件（只要变量序号不变），缺少生成时的静态数据不影响使用；
- **4.8.0–4.8.6 生成的套件**：`EraParam` / `EraJewel` / `EraGotjewel` 用的是 `param` / `jewel` /
  `gotjewel` 这些并不存在的表名（真名 `palam` / `juel` / `gotjuel`），读写都会落空；重新生成一次即可。
  4.7.x 及更早走 `era.get/set`，不受影响。

CSV 生成套件时变量名只能按表名+序号推断（如 `get "abl0"()`）；JSON/YAML 可指定 `name` 与 `type`（示例见 18-tools，`json/CFlag.json`、`yml/Base.yml`）。生成器示例代码（18-tools 原文，节选）：

```javascript
class EraBase {
  /**
   * 体力
   * @returns {number}
   */
  get hp() {
    return era.get(`base:${this.id}:0`);
  }
  /**
   * 体力
   * @param {number} v
   */
  set hp(v) {
    era.set(`base:${this.id}:0`, v);
  }
  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}
```

---

## 4. 主入口文件 ere/main.js

最小可运行（01-basic 原文）：

```javascript
const era = require('#/era-electron');

module.exports = async () => {};
```

输出一行文本：

```javascript
const era = require('#/era-electron');

module.exports = async () => {
  era.print('Hello World!');
};
```

规则：

- 引擎以 `#/main.js` 为入口，即先读取 `#/main.js` 再执行其中代码；`main.js` 用 `module.exports` 导出的匿名函数最终被引擎代码 `require` 引入，在玩家按任意键之后执行，开始运行游戏逻辑（04-js-basic）；
- `#/era-electron.js` 是 SDK，引擎在引入结束后、开始执行游戏前查找并**注入**；注入完成后 `era.print` 等才生效（04-js-basic）；
- 因为交互需要等待，`main.js` 导出的内容一般是一个**异步函数**（04-js-basic）；
- `.kojo` 文件的加载**不能在 SDK 加载之前**，可通过在 `main.js` 首行完成 SDK 加载解决（C-kojo）。
- 引擎 **4.8.5 起**会在**构建期与运行期**校验 `.kojo` 结构，**只报告、不中断加载**：报出 acc 重复、键名拼写错误、
  `random` 缺 `lines`、`if` 含 `module`/`require`、顶层篇目重名、按钮缺 `content`（来源：引擎 4.8.5 的 RELEASE.md）。

一个带标题界面/子界面/角色添加的完整 `main.js` 示例见 12-sl；其关键结构：

```javascript
// #/main.js
const era = require('#/era-electron');

const homepage = require('#/page/homepage');

module.exports = async () => {
  let flag = true;
  while (flag) {
    await era.clear();
    era.setAlign('center');
    era.drawLine({ isSolid: true });
    era.print('我是一个游戏标题');
    era.print(`v${era.get('gamebase').version / 1000}`);
    era.print('你');
    era.drawLine({ isSolid: true });
    era.printButton('开始游戏', 1);
    era.printButton('加载存档', 2);
    era.printButton('鸣谢列表', 3);
    era.drawLine({ isSolid: true });
    era.setAlign('left');
    // ...
    switch (await era.input()) {
      case 1:
        // 点击【开始游戏】时，重置当前存档并进入 homepage
        era.resetData();
        await homepage();
        break;
      // ...
    }
  }
};
```

新游戏/读档时的典型初始化（14-lines、15-ero）：

```javascript
era.resetData();
era.addCharacter(1, 2);
era.set('flag:当前角色', 1);
// 调教界面入口
era.beginTrain(0, cur_chara);
```

页面/系统脚本的目录惯例（12-sl）：`ere` 文件夹下创建 `data`（常量数据文件）、`page`（界面脚本）、`system`（与界面绘制无关的系统功能脚本）。

---

## 5. CSV 数据文件格式

### 5.1 通用规则（09-static）

- 所有 CSV 文件都应是 **UTF-8 或 UTF-8-BOM** 编码，以**半角逗号 `,`** 为分隔符（01-basic：若要用 Excel 打开 CSV，请确保是 UTF-8-BOM，否则汉字乱码）；
- CSV 文件中可以使用注释，**注释内容以 `;` 开头**；
- EraElectron 对静态数据自动做**大小写转换**：任意表名和变量名可含任意大小写字母，引擎把大小写不同的字母识别为相同；放置这些文件的文件夹同理（`csv`/`CSV`/任意大小写）；
- 例：`GameBase.csv` 和 `gamebase.csv` 都被识别为游戏信息表；`flag:0`、`Flag:0`、`FLAG:0` 都访问 flag 表 0 号变量；
- 引擎读取变量名后会保存为**小写**模式（15-ero 注释），需要大写显示时用 `String.toUpperCase()`；
- 文档未规定 CSV 的引号/转义规则（只写明分隔符是半角逗号、注释以 `;` 开头）。`_Replace.csv` 的【简化资源加载】用 `|` 分割多段文字。

### 5.2 游戏信息表

#### GameBase.csv

```csv
; GameBase.csv
作者,你
追加信息,第一款Era游戏
发布时间,202X
游戏名称,Example
游戏标识,114514
版本,0001
最低支持版本,0001
```

每行两列：第一列变量名，第二列取值。变量名的位置可填名称、变量名或别名之一，引擎会自动映射。

| 名称 | 作用 | 类型 | 变量名 | 别名 | 必填 |
|---|---|---|---|---|---|
| 游戏名称 | 游戏的名称或标题 | String | `title` | タイトル | 是 |
| 作者 | 游戏制作者 | String | `author` | - | 是 |
| 追加信息 | 游戏信息 | String | `info` | 追加情報 | 是 |
| 发布时间 | 发布时间 | String | `year` | 製作年 | 是 |
| 游戏标识 | 游戏 ID，用于区分存档文件；存档中的 ID 不同时引擎报错并拒绝读取 | Number | `gameCode` | コード | 是 |
| 版本 | 游戏版本号，存档时一同保存 | Number | `version` | バージョン | 是 |
| 版本代号 | 显示在游戏标题的版本代号；没设置时版本号除以 1000（保留小数） | String | `versionName` | バージョン名 | 否 |
| 最低支持版本 | 最低兼容版本；存档版本低于此值时引擎报错并拒绝读取 | Number | `allowVersion` | バージョン違い認める | 是 |
| 初始角色编号 | 默认角色编号；设置后在重置数据时自动创建该角色 | Number | `defaultChara` | 最初からいるキャラ | 否 |
| 发布页 | 发布页网址，点击【帮助】-【版权信息】中的发布页链接会跳转 | String | `site` | 版本情报url、バージョン情報url | 否 |
| 游戏图标 | 图标路径，必须是相对于游戏文件夹的路径 | String | `icon` | - | 否 |
| 版本检查 | 用于更新检查的网址 | String | `versionCheck` | - | 否 |
| 程序更新 | 用于引擎最小更新功能的网址 | String | `baseZip` | - | 否 |

#### _Replace.csv

每行两列，变量名与变量值，类型都是 String。

| 名称 | 作用 | 变量名 | 别名 |
|---|---|---|---|
| 简化加载信息 | 替代读取游戏时的加载信息 | `briefInformationOnLoading` | 起動時簡略表示 |
| 简化资源加载 | 替代读取多媒体资源时的加载信息，**仅于安卓版生效**；可输出多段文字，每段以 `\|` 分割，每读取一定数量资源输出一段 | `briefInformationOnResources` | - |
| 简化加载结束 | 读取游戏结束时显示；未设置时显示 `` `${briefInformationOnLoading}.` `` | `briefInformationAfterLoading` | - |

示例：

```csv
; _Replace.csv
简化加载信息,我在加载
; 简化加载结束,加载结束！
```

仅在游戏设置中【是否启用 _Replace.csv】（`system._replace`）启用时生效。

### 5.3 变量数据表（二维/一维的内部表）

一般格式：**两列**，第一列是变量序号（Number），第二列是变量名（String）。变量序号和变量名**不能重复**，任意变量名也**不能与变量序号相同**。

容错行为（09-static 原文）：

- 序号重复时，引擎从给定序号开始逐渐 +1 直到找到未被使用的序号作为该变量序号（自动生成）；CSV 修改后自动生成的序号可能被新变量占用，导致存档数据含义变更、不兼容；
- 变量名重复时按最后定义的变量序号作为该变量名的序号，之前的序号仍被该变量名占用，初始化后两个序号都有初始化值但只有后者被实际使用，浪费存档空间；
- 变量在初始化时被赋值为 `0`（cstr 表为 `''`）；可以给变量赋 **JavaScript 允许的任意变量类型**（相比 emuera 解除了类型与数量限制）；
- **变量数据表文件不能放到 csv 文件夹的子文件夹中。**

#### 一维表：系统变量

操作方式：`表名:变量名` 或 `表名:变量序号`。

| CSV | 表名 | 说明 | 每行 |
|---|---|---|---|
| `Flag.csv` | `flag` | 系统旗标表，属特定存档 | `序号,变量名` |
| `Item.csv` | `item` | 道具表，属特定存档 | **三列** `序号,道具名,价格` |
| `Global.csv` | `global` | 全局变量表，属全局存档，单独保存为 `global.csv` | `序号,变量名` |

`flag` 表用法：

- `` `flag:${变量名}` ``、`` `flag:${变量序号}` ``；
- `` `flagname:${变量序号}` ``；
- `'flagnames'`（变量名数组，按定义顺序）、`'flagkeys'`（变量序号数组）、`'flagentries'`（`[变量名, 变量序号]` 数组）。

示例与返回值：

```csv
; Flag.csv
0,我是一个旗标
1,我是另一个旗标
```

- `'flagnames'` → `['我是一个旗标', '我是另一个旗标']`
- `'flagkeys'` → `[0, 1]`
- `'flagentries'` → `[['我是一个旗标', 0], ['我是另一个旗标', 1]]`

`item` 表用法：

- `` `item:${道具名}` ``、`` `item:${道具序号}` ``：持有数量；
- `` `itemprice:${道具名}` ``、`` `itemprice:${道具序号}` ``：价格；
- `` `itemsales:${道具名}` ``、`` `itemsales:${道具序号}` ``：是否在售（Number）；
- `'item:bought'`（上次购买的道具序号）、`'itemname:bought'`（上次购买的道具名）；
- `` `itemname:${道具序号}` ``（道具名）；
- `'itemnames'`、`'itemkeys'`、`'itementries'`（同 flag 的三种数组）。

`global` 表用法：`` `global:${变量名}` ``、`` `global:${变量序号}` ``、`` `globalname:${变量序号}` ``、`'globalnames'`、`'globalkeys'`、`'globalentries'`；另有特殊项 `'global:code'`、`'global:version'`、`` `global:saves:${Index}` ``。

#### 二维表：角色变量

操作方式：`` `表名:${角色ID}:变量名` `` 或 `` `表名:${角色ID}:变量序号` ``。

| CSV | 表名 | 说明 | 名称/键查询 |
|---|---|---|---|
| `Base.csv` | `base` 和 `maxbase` | 基础属性表（base 当前值、maxbase 最大值），两者都由 Base.csv 定义 | `` `basename:${序号}` ``、`'basenames'`、`'basekeys'`、`'baseentries'` |
| `Abl.csv` | `abl` | 技能表 | `` `ablname:${序号}` ``、`'ablnames'`、`'ablkeys'`、`'ablentries'` |
| `Talent.csv` | `talent` | 特性/素质表 | `` `talentname:${序号}` ``、`'talentnames'`、`'talentkeys'`、`'talententries'` |
| `CFlag.csv` | `cflag` | 角色旗标表 | `` `cflagname:${序号}` ``、`'cflagnames'`、`'cflagkeys'`、`'cflagentries'` |
| `CStr.csv` | `cstr` | 角色字符串表（字符串版 cflag，子表变量初始化为 `''`） | `` `cstrname:${序号}` ``、`'cstrnames'`、`'cstrkeys'`、`'cstrentries'` |
| `Equip.csv` | `equip` | 装备表 | `` `equipname:${序号}` ``、`'equipnames'`、`'equipkeys'`、`'equipentries'` |
| `Mark.csv` | `mark` | 刻印表 | `` `markname:${序号}` ``、`'marknames'`、`'markkeys'`、`'markentries'` |
| `Exp.csv` | `exp` | 经验表 | `` `expname:${序号}` ``、`'expnames'`、`'expkeys'`、`'expentries'` |
| `Param.csv` / `Palam.csv` | `jewel`、`param`、`gotjewel` | Param.csv 是三者统一定义文件；jewel=宝珠、param=角色参数、gotjewel=宝珠获得量；**只有 jewel 在进入调教前就可以使用** | `` `jewelname:${序号}` ``、`'jewelnames'`、`'jewelkeys'`、`'jewelentries'`；`` `paramname:${序号}` ``、`'paramnames'`、`'paramkeys'`、`'paramentries'` |

别名规则：

- **Param 视为 Palam 的别名**：`Param.csv` 或 `Palam.csv` 均可，`param` 或 `palam` 访问同一数据表；
- **jewel 被视为 juel 的别名**：`jewel`/`juel` 访问同一数据表，`gotjewel`/`gotjuel` 访问另一个调教中有效的同一表。

`maxbase` 表用法：`` `maxbase:${变量名}` ``、`` `maxbase:${变量序号}` ``（注意文档中 maxbase 没有列出 `maxbasename`/数组用法）。引擎自动控制 base 表变量：小于 0 重置为 0，大于 `` `maxbase:${变量名}` `` 时重置为该最大值。

#### 调教系统使用的表

属于特定存档，但**仅在进入调教时才会存在并生效**，此前获取其中变量值只能得到 `undefined`（但 `` `*name:${变量序号}` ``、`'*names'`、`'*keys'`、`'*entries'` 等方式在进入调教前依然有效）。

| CSV | 表名 | 说明 | 用法 |
|---|---|---|---|
| `TFlag.csv` | `tflag` | 调教旗标表，调教表里**唯一的一维表** | `` `tflag:${变量名}` ``、`` `tflag:${变量序号}` ``、`` `tflagname:${变量序号}` ``、`'tflagnames'`、`'tflagkeys'`、`'tflagentries'` |
| `TCvar.csv` | `tcvar` | 角色调教旗标表 | `` `tcvar:${角色ID}:${变量名\|变量序号}` ``、`` `tcvarname:${变量序号}` ``、`'tcvarnames'`、`'tcvarkeys'`、`'tcvarentries'` |
| `TEquip.csv` | `tequip` | 调教装备表 | `` `tequip:${角色ID}:${变量名\|变量序号}` ``、`` `tequipname:${变量序号}` ``、`'tequipnames'`、`'tequipkeys'`、`'tequipentries'` |
| `Param.csv`/`Palam.csv` | `param` | 角色参数表 | 见上 |
| `Param.csv`/`Palam.csv` | `delta` | 角色参数变化表 | `` `delta:${角色ID}:${变量名\|变量序号}` `` |
| `Param.csv`/`Palam.csv` | `gotjewel` | 获得宝珠表 | `` `gotjewel:${角色ID}:${变量名\|变量序号}` `` |
| `Source.csv` | `source` | 来源表 | `` `source:${角色ID}:${变量名\|变量序号}` ``、`` `sourcename:${变量序号}` ``、`'sourcenames'`、`'sourcekeys'`、`'sourceentries'` |
| `Ex.csv` | `ex` 和 `nowex` | ex=高潮变量、nowex=当前高潮变量，Ex.csv 是统一定义文件 | ex：`` `ex:${角色ID}:${变量名\|变量序号}` ``、`` `exname:${变量序号}` ``、`'exnames'`、`'exkeys'`、`'exentries'`；nowex：`` `nowex:${角色ID}:${变量名\|变量序号}` `` |
| `Stain.csv` | `stain` | 污渍表 | `` `stain:${角色ID}:${变量名\|变量序号}` ``、`` `stainname:${变量序号}` ``、`'stainnames'`、`'stainkeys'`、`'stainentries'` |

**受保护的表名**（引擎遇到同名 CSV 会在控制台显示警告而不会读取）：

- `maxbase` → 遇 `MaxBase.csv` 警告；
- `delta`、`jewel`、`gotjewel` → 遇 `Delta.csv`、`Jewel.csv`、`Juel.csv`、`GotJewel.csv`、`GotJuel.csv` 警告；
- `nowex` → 遇 `NowEx.csv` 警告。

#### 开发者自定义的扩展表

在 csv 文件夹下放置结构类似的变量数据表即可增加自定义表；引擎会自动识别、读取并以**一维表**方式初始化。要作为二维表使用，需在配置文件（建议 `_fixed.json`）把表名加入 `system.extendedCharaTables`。

例：添加 `Terminal.csv` 自动创建 `terminal` 表，支持 `` `terminal:${变量名}` ``、`` `terminal:${变量序号}` ``、`` `terminalname:${变量序号}` ``、`'terminalnames'`、`'terminalkeys'`、`'terminalentries'`。
添加 `Status.csv` 并在 `_fixed.json` 中配置 `system.extendedCharaTables: ["status"]` 后创建 `status` 表，支持 `` `status:${角色ID}:${变量名\|变量序号}` ``、`` `statusname:${变量序号}` ``、`'statusnames'`、`'statuskeys'`、`'statusentries'`。

### 5.4 角色数据表（CharaXXXX.csv）

- 文件名以 `Chara` 的任意大小写形式开头，可放在 csv 文件夹下任意位置（含子文件夹）；
- 同一个角色可以有多个角色数据表，引擎按其中设定的角色编号为角色预设数据赋值；
- 可对同一角色的同一变量多次预设，**只有最后设置的值生效**。

可用的变量（第一列名称/变量名/别名任选其一）：

| 名称 | 作用 | 变量名 | 别名 | 用法示例 |
|---|---|---|---|---|
| 角色编号 | 对应角色的 ID | `id` | 番号 | `角色编号,0` |
| 姓名 | 真实姓名 | `name` | 名前 | `姓名,你` |
| 默认称呼 | 默认称呼以及旁白使用的默认称呼 | `callname` | 呼び名 | `默认称呼,你` |
| 称号 | 别名/称号，只能通过 `static` 获取，**只读** | `title` | 别名、あだ名 | `称号,第四天灾` |
| 称呼 | 对其他角色的称呼（**三列**） | `callname`、`callname_to` | - | `称呼,1,同学` |
| 信赖 | 对其他角色的好感度（三列） | `relation` | 相性 | `信赖,1,100` |
| 基础属性 | 设置该基础属性的**最大值**（三列） | `base` | 基礎 | `基础属性,体力,1000` |
| 技能 | （三列） | `abl` | 能力 | `技能,P感觉,1` |
| 特性 | （三列） | `talent` | 特质、素質 | `特性,童贞,1` |
| 角色flag | （三列） | `cflag` | フラグ | `角色flag,性别,1` |
| 角色str | （三列） | `cstr` | - | `角色str,称号,第四天灾` |
| 装备 | （三列） | `equip` | 装着物 | `装备,眼镜,1` |
| 刻印 | （三列） | `mark` | - | `刻印,羞耻,0` |
| 经验 | （三列） | `exp` | 経験 | `经验,插入经验,0` |
| 珠 | （三列） | `jewel` | 宝珠、juel | `珠,P快感,0` |

自定义扩展表也可在角色数据表中预设，此时第一列必须使用扩展表表名：

```csv
; Status.csv
0,沉睡
```

```csv
; Chara0000.csv
; ...
; 使用变量名
status,沉睡,0
; 使用变量序号
; status,0,0
; ...
```

示例（09-static 原文）：

```csv
; Chara0000.csv
角色编号,0
姓名,你
默认称呼,你
称呼,1,同学
基础属性,体力,1000
基础属性,精力,1000
基础属性,力量,100
```

### 5.5 res 多媒体注册 CSV（16-resources）

支持的图片格式：`.gif`、`.jpeg`、`.jpg`、`.png`、`.svg`、`.webp`；音乐格式：`.flac`、`.mp3`、`.wav`、`.wma`。

```csv
; 完整的切分图注册方式
注册名,图片文件名,图片起始横坐标,图片起始纵坐标,图片宽度,图片高度,图片显示横坐标,图片显示纵坐标

; 省略的切分图注册方式
注册名,图片文件名,图片起始横坐标,图片起始纵坐标,图片宽度,图片高度
; 这种方式下图片显示的横纵坐标都会取0

; 完整的全图注册方式
注册名,图片文件名,0,0,图片宽度,图片高度

; 省略的全图注册方式
注册名,图片文件名
; 这种方式下图片宽度和图片高度会自动读取
```

坐标与宽高单位均为 px。**注册用 csv 中的图片文件必须和该 csv 文件处于同一文件夹下**。音乐资源注册方式与省略的全图注册方式相同：`注册名,音乐文件名`。
把文件名换成图片/音乐网址即可注册网络资源；网络图片注册为全图时**必须使用完整注册方式**（image-size 无法读取网络图片宽高）。
示例：

```csv
; res/注册.csv
; res 文件夹下还有 1001.png 和 kaoru_set.png 两个图片文件
立ち絵_服_通常_1001,1001.png,  0,  0,180,180,0,0
立ち絵_服_笑い_1001,1001.png,180,  0,180,180,0,0
立ち絵_服_怒り_1001,1001.png,360,  0,180,180,0,0
立ち絵_裸_通常_1001,1001.png,  0,180,180,180,0,0
立ち絵_裸_笑い_1001,1001.png,180,180,180,180,0,0
立ち絵_裸_怒り_1001,1001.png,360,180,180,180,0,0
```

游戏图标：在 GameBase 中设置【游戏图标】，值是该文件相对于游戏文件夹的相对路径（如 `res/icon.png`）；必须是最大 512x512 的 png；加载时自动启用，不受【启用资源】影响，且**不需要通过注册 csv 注册**。

### 5.6 其它格式（JSON / YAML）的等价写法

JSON 与 CSV 的类型差异：`"1"` 是 String，`1` 是 Number；引擎对 CSV 有自动推断，对 JSON/YAML **没有**。JSON **无法加注释**；YAML 可以（`#` 开头）。

GameBase：

```json
{
  "作者": "你",
  "追加信息": "第一款Era游戏",
  "发布时间": "202X",
  "游戏名称": "Example",
  "游戏标识": 114514,
  "版本": 1,
  "最低支持版本": 1
}
```

```yaml
# GameBase.yml
作者: 你
追加信息: 第一款Era游戏
发布时间: 202X
游戏名称: Example
游戏标识: 114514
版本: 0001
最低支持版本: 0001
```

变量数据表（以变量名为属性名，变量序号为 `id` 属性，书写顺序与 CSV 相反）：

```json
{
  "我是一个旗标": {
    "id": 0
  },
  "我是另一个旗标": {
    "id": 1
  }
}
```

Item（额外 `price` 属性）：

```json
{
  "我是一个道具": {
    "id": 0,
    "price": 100
  },
  "我是另一个道具": {
    "id": 1,
    "price": 111
  }
}
```

角色数据表（变量数据表定义的变量整理成以表名为属性名的对象）：

```json
{
  "角色编号": 0,
  "姓名": "你",
  "默认称呼": "你",
  "称呼": {
    "1": "同学"
  },
  "基础属性": {
    "体力": 1000,
    "精力": 1000,
    "力量": 100
  }
}
```

格式选择与转换：

- 有多个格式的静态数据文件夹时，引擎按 **YAML > JSON > CSV** 的优先级选择一个文件夹读取；可用 `system.static` 指定（取值为文件夹名，`"yml"|"json"|"csv"`）；
- 未指定 `system.static` 时，读取 `_config.json` 和 `_fixed.json` 也按优先级从相应静态数据文件夹读取，因此 `_fixed.json` 需要同时放在优先级最高的文件夹和 `system.static` 指定的文件夹中；
- 【帮助】-【生成静态文件】下有格式转换功能（PC 3.5.0+）：带（可读）后缀的会把变量序号转换为变量名，带（兼容）后缀的直接以变量序号生成；该功能不会覆盖当前读取的静态数据文件（读取 YAML 时无法生成 YAML）；最上方【安卓】功能项生成 `build/static.json`。

---

## 6. 开发流程与工具

### 6.1 IDE 与项目初始化（02-ide）

- 推荐 WebStorm（2024-10-24 起对个人开发者免费）；也可用 Sublime Text、VS Code（三者都不装插件就有代码高亮、输入联想、自动补全）；
- 在 `ere` 文件夹创建 `jsconfig.json`（见 2.3），让 WebStorm 理解 `#` 路径；
- `main.js` 中 `module.exports` 出现波浪下划线时，鼠标移过去选择「启用 Node.js 辅助功能」；
- 快捷键：`Ctrl+F` / `Ctrl+R` 当前文件查找/替换，`Ctrl+Shift+F` / `Ctrl+Shift+R` 所有文件查找/替换；
- eslint 启用步骤：设置-语言和框架-Node.js 下载 Node.js 18 → 包管理器选 npm → 游戏文件夹创建 `package.json`（见 2.1）→ 右键 `npm install` → 创建 `.eslintrc.js`（见 2.2）→ 设置-语言与框架-JavaScript-代码质量工具-ESLint 勾选【自动ESLint设置】和【在保存时运行eslint --fix】。

### 6.2 调试

- **控制台**：菜单栏【调试】-【控制台】。首次打开会挤占游戏画面，点右上角叉号旁的竖状省略号调出菜单，在第一行停靠侧选最左图标可独立窗口显示；可切换中文；首次使用可能要求先输入数字再输入文字解锁；
- 控制台对象：`era`（游戏数据调试，7 个函数）与 `ere`（界面调试，`ere.showLines`）；详见 3.13；
- **调试模式**：`era.toggleDebug()` / 控制台 `era.toggleDebug` 进入；调试模式下：
  - 读取游戏脚本时显示读取到的脚本文件列表；不启用调试模式时可用【调试】-【游戏文件列表】在命令行手动输出；
  - 控制对象 `_s` 属性显示生成该对象的调用栈；
  - `era.logger.debug` 生效；
- 引擎可从命令行启动：在命令提示符或终端进入引擎所在文件夹，输入大写字母 `ERA`，按 Tab 自动补全后回车；方法在游戏文件复杂后可用于检查循环依赖；
- `era.logger` 系 API 用法见 3.10；`era.logger.debug` 只在调试模式生效，可放心在开发中输出数据。

### 6.3 引擎内置开发工具（菜单栏【帮助】下，需完成加载后可用）

| 功能 | 作用 |
|---|---|
| 生成开发套件 | 按当前加载的静态数据在 `ere` 文件夹下生成 `era-utils`（见 3.14） |
| 生成静态文件 | 生成其他格式静态文件（格式转换，见 5.6）；最上方【安卓】生成游戏项目文件夹 `build/static.json` |
| （格式转换） | 见 5.6 |

数据格式要求（18-tools）：任何格式都可以生成开发套件；JSON/YAML 可为每个变量定义更多元数据（`id`/`name`/`type`）；CSV 下变量名只能按表名+序号自动推断。生成步骤：用【格式转换】转出 JSON/YAML → 修改变量名与类型 → 把 `ere.config.json` 的 `system.static` 改成 `json`/`yml` → 重新加载并生成。

### 6.4 本地运行（01-basic）

1. 下载 EraElectron 引擎；
2. 新建游戏文件夹，里面创建 `csv` 和 `ere` 两个文件夹；
3. 在 `csv` 创建 `GameBase.csv`（UTF-8 或 UTF-8-BOM 保存）；
4. 在 `ere` 创建 `main.js`，内容为：

   ```javascript
   const era = require('#/era-electron');

   module.exports = async () => {};
   ```
5. 下载 SDK 脚本 `era-electron.js` 并放到 `ere` 文件夹；
6. 引擎左上角【游戏】-【打开游戏】选择该文件夹。加载成功时引擎显示英语日志（加载了 GameBase、无 resource、`loading success!`），标题显示为 `【Example v0.001 @ 114514】`；
7. 修改脚本后在引擎中按 `Ctrl+R`（Windows）/ `Command+R`（Mac）或菜单栏【游戏】-【重载游戏】重新加载。

### 6.5 构建打包（Android，19-android）

准备工作：

1. **检查循环依赖**（会破坏模块导入导出，安卓打包前必须解决）。引擎发现循环依赖时会在控制台输出日志；解决办法：提取公共部分为第三个模块，或对导入函数/运行时使用的模块内容使用延迟注入（`init`）模式；
2. **生成静态数据文件**：菜单栏【帮助】-【生成静态文件】-【安卓】，生成 `build/static.json`（含 `res` 需打开【启用资源】且已读取 res 的 csv）。

打包：

```shell
npm install -D @babel/core @babel/preset-env babel-loader webpack webpack-cli git+https://gitgud.io/umaera/engine/ere-webpack-plugin.git
```

- 修改 `package.json` 增加 `"scripts": {"webpack": "webpack"}`；
- 创建 `webpack.config.js`（见 2.7）；
- 执行 `npm run webpack` 或 `npx webpack`，生成 `dist/` 下的 `main.bundle.js` 和 `era.bundle.js`；
- PC 版引擎可以打开生成的 `dist` 文件夹测试打包是否成功；
- 有 `.kojo` 文件时需配置 kojo-loader（见 2.7 / 第 7 节）。

安卓游戏包与存档互通：

- 游戏包必须位于安卓手机个人文件夹内（有下载、文档等子文件夹的文件夹），可放在任意子文件夹，建议 `Downloads/下载` 或专门建 `Games/游戏`；
- 安卓版引擎会禁用压缩存档格式（锁定为普通 JSON 文件），也无法读取压缩保存的存档；
- 安卓 → PC：存档可直接放入 `sav` 文件夹读写；
- PC → 安卓：普通 JSON 存档可直接放入；压缩保存的存档需先切换到普通 JSON 格式覆盖保存。

**版本与兼容性**（来源：引擎仓库 `COMPATIBILITY.md`、ere.app 的 `RELEASE.md` / `COMPATIBILITY.md`，非 wiki
原文）：ere.app 与 PC 版是**两个独立的版本序列**（每次 ere.app 发布合并一段 PC 改动，以一个 PC
版本为基线，版本号不一一对应）。游戏门槛由 `version.sdk` 声明，安卓侧用源码常量 `desktopVersion` 作为
「等效 PC 版本」比较 —— 报错里的「当前引擎等效版本」就是它。5.x 内旧游戏可直接在新引擎上运行，新游戏跑旧
引擎不保证；完整的版本对照表见引擎仓库的 `COMPATIBILITY.md`。

### 6.6 版本更新检查与 CI（20-updates）

- **更新检查**：GitLab Pages 静态网站 + `public/RELEASE`（内容为游戏版本号）。`ci/pages.js` 从 `csv/GameBase.csv` 读 `版本,` 行并写 `public/RELEASE`；`.gitlab-ci.yml` 用 `shell` Runner 在标签提交时运行 `node ci/pages.js` 并上传 `public`；
- GameBase 中配置（【发布页】必须）：

  ```csv
  ; GameBase.csv
  ; ...
  ; 注意发布页变量是必须的
  发布页,https://gitgud.io/umaera/game/ere-example
  版本检查,https://umaera.gitgud.site/game/ere-example/RELEASE
  ```

- **最小更新**：把 `csv` 与 `ere` 两个文件夹压缩成 `base.zip` 上传到 Package registry；`ci/pages.js` 把游戏版本号和 `.ere-min-version` 的第一行分两行写入 `public/RELEASE`；当最小更新最低支持版本与当前游戏版本**相同**时不生成基础包（表示希望玩家重下整个游戏包）；GameBase 配置：

  ```csv
  ; GameBase.csv
  ; ...
  程序更新,https://gitgud.io/api/v4/projects/30352/packages/generic/base/${VERSION}/base.zip
  ```

  引擎会自动把 `${VERSION}` 替换为更新检查服务得到的最新版本号；
- **发布（Releases）**：通过 docker 类型 Runner 的 GitLab CI `release` 作业创建，`.gitlab-ci.yml` 中 `GAME_ZIP`、`GAME_URL`、`BASE_URL`、`GAME_BUNDLE_ZIP`、`GAME_BUNDLE_URL` 等变量控制包名与上传地址；压缩包解压密码为 `era`；安卓包由 `ci/android.js` 构建（用 webpack + archiver 的 encrypted zip，`password: 'era'`，`zlib: { level: 9 }`），并把 `build/static.json` 最小化写入 `dist/static.json`；
- 触发 CI 前请确认 Runner 处于运行状态。

---

## 7. .kojo 口上文件

版本要求：`_PC引擎4.0.0、安卓引擎1.0.9及以上版本_`；分割线设置、颜色字典化配置需 PC 4.0.1+；按钮注释需 PC 4.1.0+；条件闭包需 PC 4.1.1+。可用 `Kojo 文件测试` 项目（<https://gitgud.io/umaera/game/kojo-test>）实机验证效果。

### 7.1 语法规则（C-kojo）

- 后缀为 `.kojo`，例如 `red.kojo`；
- **大小写敏感**；
- 必须是 **UTF-8 或 UTF-8 BOM** 编码；
- 用缩进表示层级关系，**不允许使用 tab**，必须是半角空格；空格数量不重要，同层级元素左对齐即可；
- `#` 表示注释，后面内容被无视；
- `:` 号和 `-` 号后面要加空格；
- 每个句子开头和结尾的空格会被无视；有实际含义时用半角引号（`'` 或 `"`）包起来（不要和句子中本身有的引号重复）；
- 句首的 `#` 会导致该句子被无视，此时也用半角引号包住整个句子。

### 7.2 基本单位与文本

篇目为基本单位，篇目名后跟半角冒号并换行，文本行以半角破折号 `-` 开头（后跟一个半角空格）；同一文件中不同篇目名不能相同。

```yaml
# base1.kojo
冬天:
- 过了数日，已是寒风凛冽的时候。
- 被天气剥夺了出行权的瓦来只能在床上坐起，呆呆地从窗口窥探外面的世界。

夏天:
- 似乎离那些花谢了没多久，树上的蝉就鼓噪起来了。
- 瓦来从卧室搬了出来，躺在小隔间的凉席上，然后将卧室和客厅正对着的窗户大大地打开，试图从偶尔吹过的过堂风中获得一丝凉爽。
- 似乎是在庆祝主人又成功挺过了严寒的冬日和微冷的春天，客厅摆放的植物们都青青翠翠的，在明媚的阳光中恣意生长。
```

执行篇目时**分行显示文本，并在显示一行后等待玩家按任意键**（等价于每行文本调用 `era.printAndWait`）。

空行：单独成行的半角破折号（显示空行使用 `era.println`）：

```yaml
# base2.kojo
你好:
- 你好？
-
- 世界！
```

分割线：

```yaml
# base3.kojo
分割线:
- divider: true
- 上面是一个分割线
```

### 7.3 按钮与分支

```yaml
# button1.kojo
按钮:
- 下面是一个按钮：
-
- acc: 0
  content: 一个按钮
-
- 你看到一个按钮了吗？
```

按钮组（相邻多个按钮，显示在不同行，点击其一才继续）：

```yaml
# button2.kojo
按钮组:
- 下面是一个按钮组：
-
- acc: 0
  content: 一号按钮
- acc: 1
  content: 二号按钮
-
- 点击任意一个按钮才能看见我
```

按钮内容分支（`lines` 结构需符合基本用法）：

```yaml
# button3.kojo
分支:
- 下面是一个带内容分支的按钮组：
-
- acc: 0
  content: 一号按钮
  lines:
  - 你点击了一号按钮
  - Good idea!
- acc: 1
  content: 二号按钮
  lines:
  - 你点击了二号按钮
  - Very nice!
-
- 点击任意一个按钮才能看见我
```

按钮注释（PC 4.1.0+，`comment` 字段为紧跟按钮的单行文本）：

```yaml
# button4.kojo
按钮注释:
- 下面是一个带单行注释的按钮组：
-
- acc: 1
  content: 一号按钮
  comment: 这是一号按钮，点击后什么都不会发生。
- acc: 2
  content: 二号按钮
  comment: 这是二号按钮，点击后会输出一行文字。
  lines:
  - 你点击了二号按钮！
```

同一按钮组中的按钮快捷键**可以重复**，引擎加载 .kojo 时会自动解决重复问题，但仍建议避免重复。

### 7.4 随机文本

```yaml
# random2.kojo
随机多行文本:
- random: true
  lines:
  - 你随机到了我！
  - 你真幸运！
- random: true
  lines:
  - 哇我真幸运！
  - 我随机到了你！
  - 太棒了！
```

引擎随机显示其中一组文本，每显示一行等待一次玩家输入。

### 7.5 文本嵌套

按钮分支和随机文本都以 `lines` 定义，可相互嵌套（示例 `# embedding.kojo`，见 C-kojo）。

### 7.6 动态指定

用 `%关键词%` 包起来；执行时以字典对象作为参数传入。字典示例：

```json
{
  "玩家名": "你先生",
  "玩家称呼": "你"
}
```

```yaml
# dictionary.kojo
动态指定:
- %玩家称呼%好，%玩家名%！
```

支持三种显示内容的动态指定：普通文本、按钮文本、颜色（PC 4.0.1+，仅**整行文本**颜色可动态指定，**分段文本的颜色无法通过字典动态指定**）。

### 7.7 条件显示

```yaml
# if.kojo
条件显示:
- divider: true
  if: 2 > 1
- acc: 0
  if: 3 > 2
  content: 条件按钮
- if: Math.random() < 0.5
  content: 我有一半的概率显示，因为 Math.random() 会返回 [0,1) 之间的随机小数
- if: 3 > 4
  lineUp: true
- random: true
  if: era.get('version') > 0
  lines:
  - 随机显示的内容一直会是我，因为只有我的条件检查是可以通过的
- random: true
  if: era.get('version') === undefined
  lines:
  - 随机显示的内容永远不是我，因为我的条件检查是永远不会通过的
```

注意：文本内容需变形为 `content` 才能设条件；空行需转变为 `lineUp: true`；随机文本设条件时先做条件检查再在通过的结果中随机；若所有内容条件都不通过（PC 4.1.1+），则默认所有条件均通过，即在所有内容中随机。

条件内容为 JavaScript 代码，只能使用：

- JavaScript 默认的同步运算符和数据类型；
- JavaScript 内置 `Math` 对象的属性函数（`Math.random`、`Math.ceil`、`Math.floor` 等）；
- EraElectron SDK 的**同步**函数（以变量 `era` 取用，如 `era.get`）；
- 动态指定的字典（以变量 `d` 取用）；
- 玩家选择的按钮快捷键的数组（以变量 `a` 取用）。

条件闭包（PC 4.1.1+，一个条件控制多行）：

```yaml
# if2.kojo
条件闭包:
- if: Math.random() < 0.5
  lines:
  - 我们有 50% 的概率，
  - 会显示出来。
  - 如果没有通过概率判定，
  - 这里只会是一片空白。
```

### 7.8 富文本效果

```yaml
# text1.kojo
富文本:
- content: 一行红色放大的文本
  color: red # 可以使用颜色的英文名，以#开头的十六进制的颜色，或者rgb(x,y,z)这样以RGB定义的颜色
  fontSize: 1.5rem # 将这行文本的字体尺寸为游戏设置的1.5倍，默认设置下将是16*1.5=24 (px)
  align: center # 将这行文本居中显示，设置为 right 会右对齐
# 对分割线的设置需要PC引擎4.0.1及以上版本
- divider: true
  content: 分割线上显示的文本
  position: left # 这会使文本显示在分割线左侧，如果设置为 right 会显示在右侧
```

分段文本富文本：

```yaml
# test2.kojo
分段设置富文本:
- content:
  - 这行文本个个都身怀绝技：
  - color: red
    content: 有染红的，
  - fontSize: 1.5rem
    content: 有变大的，
  - fontWeight: bold
    content: 有变粗的，
  - fontStyle: italic
    content: 有变斜的，
  - title: 我是小提示
    content: 有会显示小提示的，
  - content: 还有什么都不会的
```

动态指定整行颜色：

```yaml
# test3.kojo
动态指定颜色的文本:
- content: 猜猜我是什么颜色？
  color: %COLOR%
```

### 7.9 同时显示文本

```yaml
# sync.kojo
同时显示的文本:
  sync: true
  lines:
  - 我和下面一行文本会同时显示
  - 我和上下两行文本会同时显示
  - 我们不需要玩家按任意键才继续显示
```

设 `sync` 时随机文本、动态指定、条件显示、富文本效果都有效，但**按钮与分支将无效化**，也不能在随机文本中嵌套使用按钮分支。

### 7.10 加载与执行规则（面向开发者）

```javascript
// 普通引入
const base1_kojo = require('#/base1.kojo');

// 或者解构赋值语法
const { '冬天': winter } = require('#/base1.kojo')
```

- **不能在 SDK 加载之前加载 .kojo**（可在 `main.js` 首行完成 SDK 加载）；
- 以函数形态执行：`await base1_kojo['春天']();`；
- **只有同时显示文本的口上可以作为同步函数使用**，其他口上必须以异步函数形态使用：

  ```javascript
  const { '你好': hello } = require('#/base2.kojo');
  await hello();
  const sync_kojo = require('#/sync.kojo');
  sync_kojo['同时显示的文本']();
  ```
- 有动态关键词时以字典对象为参数：

  ```javascript
  const dict = JSON.parse('{"玩家名":"你先生","玩家称呼":"你"}');
  const dict_kojo = require('#/dictionary.kojo');
  await dict_kojo['动态指定'](dict);
  ```
- 异步函数形态下，口上函数输出一个数组，**按玩家点击顺序排列所有玩家选择的按钮快捷键值**，用于触发相应逻辑或修改变量；
- 打包进安卓包需配置 kojo-loader（安装：`npm install -D git+https://gitgud.io/umaera/engine/kojo-loader.git`；webpack 配置见 2.7；`sdkPath` 默认 `'#/era-electron'`，SDK 改名或移动位置时修改）。

---

## 8. 静态数据文件与常量数据文件

### 8.1 静态数据文件（09-static）

**定义**：`csv`（或 `json`/`yml`）文件夹下的文件，定义游戏信息、游戏存档中使用的变量名和预定义角色数据等。主要分为三类：

1. **游戏信息表**：`GameBase.csv`、`_Replace.csv`；
2. **变量数据表**：定义存档数据中的数据表及其变量（Flag/Item/Global/Base/Abl/Talent/CFlag/CStr/Equip/Mark/Exp/Param/TFlag/TCvar/TEquip/Source/Ex/Stain + 自定义扩展表）；
3. **角色数据表**：`Chara*` 文件。

静态数据影响存档中的数据结构；游戏运行时的引擎行为由 `ere.config.json`/`_config.json`/`_fixed.json` 控制（`system.static` 决定读哪个格式的文件夹）。

### 8.2 常量数据文件（10-const）

**定义**：ere 游戏中另一类在运行过程中**不会改变**的数据。静态数据由静态数据文件定义并影响存档数据结构；其他运行时所需、和游戏机制相关的数据（如一次训练提升多少属性、每种攻击造成多少伤害）称为**常量数据**，**只能定义在游戏脚本中**。

- 模块引入函数 `require` 直接支持两种格式：**JS 和 JSON**。JS 文件引入时可不带后缀名，JSON 文件必须带后缀名：

  ```javascript
  // 对 JS 文件，以下两种写法都可以
  require('#/a');
  require('#/a.js');

  // 对 JSON 文件，必须指定后缀名
  require('#/a.json');
  ```
- JS 文件可导出数值、对象、数组、函数，作为常量数据文件时一般导出对象或数组；对象的属性名带空格或以数字开头时需以字符串形式指定；有 Unicode 字符时建议改用 JSON 格式；
- JS 常量数据文件建议命名为 `*-const.js`（示例见 10-const 的 `orgasm-const.js`，含大量注释，注释会在鼠标指向时作为提示弹出）；
- JSON 文件只能导出对象和数组；IDE 对 JSON 模块导入的提示支持不佳，建议仅用于属性名含 Unicode 的常量对象。

#### JS 格式的特殊用法：枚举（enum）

```javascript
const some_enum = {
  type_1: 0,
  type_2: 0,
  type_3: 0,
  // ...
  type_x: 0
};
Object.keys(some_enum).forEach((k, i) => (some_enum[k] = i));
```

需要枚举值名字时：

```javascript
// 枚举 some_enum 的定义
some_enum.keys = Object.keys(some_enum);

// 使用变量 v 存放枚举 some_enum 中的随机枚举值
let v;

// 然后可以通过 some_enum.keys 获取枚举值的名字
some_enum.keys[v];
```

14-lines 中「hooks」即如此定义（`#/data/event/hooks.js`）：

```javascript
const hooks = {
  talk: 0,
};
Object.keys(hooks).forEach((e, i) => (hooks[e] = i));
// 用 hooks.keys 放所有枚举值的名字
// 注意 hooks.keys 这个数组中每个枚举值名字的下标正好是枚举值
hooks.keys = Object.keys(hooks);

module.exports = hooks;
```

> **注意**：文档中并不存在引擎级的「事件注册/hooks」API。ere 的「hook」是 #14 口上系统中由开发者用枚举 + 工厂函数（`run_custom_lines(id, hook)`）+ 事件队列（`#/sys/sys-event-queue.js` 的 `add_event`/`get_random_event`/`init_queue`）自行实现的模式，不是 SDK 的一部分。

### 8.3 `ere/data/**` 与 static.json 的关系

文档没有为 `ere/data/**` 规定固定结构，只给出实践惯例：

- 12-sl：一般在 `ere` 文件夹下创建 `data`（常量数据文件）、`page`（界面脚本）、`system`（与界面绘制无关的系统功能脚本）；
- 10-const 的常量数据文件示例位于 `#/data/...`（如 `#/data/ero/action-const.js`、`#/data/ero/param-const.js`、`#/data/ero/stain-const.js`、`#/data/event/hooks.js`、`#/data/event/line-arg.js`、`#/data/event/event-object.js`、`#/data/event/check-object.js`）；
- `build/static.json` 是**静态数据**的打包产物（`static`/`names`/`extend`/`config`/`fixed`/`res`），与 `ere/data/**` 的常量数据无关（常量数据随 `ere` 脚本一起被 webpack 打包进 `main.bundle.js`）。

---

## 9. 常见陷阱与规则速查

**编码**

- 脚本（.js）与 CSV 必须是 **UTF-8 或 UTF-8-BOM**；用 Excel 打开 CSV 需 UTF-8-BOM，否则汉字乱码；
- `.kojo` 必须是 UTF-8 或 UTF-8 BOM，**不允许 tab 缩进**，大小写敏感；
- `ere.config.json`、`_config.json`、`_fixed.json` 可以任意编码；但 `_config.json`/`_fixed.json` **必须是 JSON 格式**（不能是 YAML）；
- 读版本号的脚本需自行去掉 BOM（`replace(/^\uFEFF/, '')`）。

**大小写**

- 静态数据文件名、表名、变量名大小写不兼容问题：引擎自动转换，`GameBase.csv`/`gamebase.csv`、`flag:0`/`Flag:0`/`FLAG:0` 等价；
- 但**脚本中未被半角引号包住的变量名必须遵守大小写**，否则找不到变量；
- 任意**文件引用**（res 资源注册、脚本间引用）必须大小写完全匹配；
- 引擎读取变量名后保存为小写，显示时需要 `toUpperCase()`。

**模块格式与加载**

- ere 游戏脚本是 **Node.js/CommonJS 式**：`module.exports` 定义模块，`require` 加载；**同一个文件只能导出一次**，多个 `module.exports` 只有最后一个生效；
- `require('#/...')` 中的 `#/` 由引擎转换为 `ere` 文件夹路径；`.js` 可省略后缀，`.json` **必须带后缀**；
- 引入的模块没有 `module.exports` 时 `require` 返回空对象 `{}`，应尽量避免；
- 引擎对模块做缓存，所有文件**最多只被引入一次**；
- `#/era-electron.js` 必须先被引入，注入完成后 `era.*` 才生效；在 `require` 与 `module.exports` 之间调用 `era.*` **无效**（近期版本会报错）；
- `.kojo` 的加载**不能在 SDK 加载之前**；
- **循环依赖**会导致模块导入导出失效（Node.js 能处理简单循环依赖，但可能导致模块导出的对象未完全初始化），安卓打包前必须解决；引擎发现循环依赖时会在控制台输出日志；
- 出于安全考虑，ere 游戏**不允许引入 Node.js 核心模块或其他第三方模块**（唯一例外是 `crypto`）。

**异步**

- 所有与文件和玩家输入相关的指令都是异步的：`era.input`、`era.waitAnyKey`、`era.printAndWait`、`era.clear`、`era.delay`、`era.isLandscape`、`era.saveGlobal`、`era.loadGlobal`、`era.resetGlobal`、`era.saveData`、`era.loadData`、`era.rmData`；
- **两种用法，别混**：
  - **顺序等待**（要等它结束再往下走）→ 加 `await`。只有声明为 `async` 的函数体内才能 `await`，因此 `#/main.js` 一般导出异步函数；
  - **并发 / 帧时钟**（要它和主逻辑同时推进）→ **故意不 `await`**，接 `.then()`。这是「多线程」的正式用法，不是写漏了 —— 见 [§10 多线程与实时循环](#10-多线程与实时循环17-multithreading)。
- `era.delay` 没加 `async` 关键词但返回 Promise，因此也是异步函数。顺序等待时「等待会卡住脚本，时间不宜过长」；但当作**帧时钟**用（`while` 循环里 `await era.delay(200)`）正是它该有的用法。
- 用 `Promise.then()` 可实现「多线程」：不 `await` 地调用异步 API 后接 `.then()`，例如 `era.delay(1000).then(() => {...})`；`era.print` 的隐藏 `flush` 参数可强制输出。
- 连续调用多次 `era.waitAnyKey`（中间没有其他输出 API）**只会生效一次**。
  - 实时玩法需要**连续按键**，不要反复调 `waitAnyKey`：用 `era.input({ any: true, hideInput: true })` 并在 `.then()` 里重挂监听，见 §10.5。

**输入/按钮**

- 两次 `era.input` 之间输出的按钮必须给**不同快捷键**（快捷键重复会在控制台报错，可用 `config.disableWarning` 关闭）；
- 有按钮时 `era.input` 只接受按钮快捷键值（Number）；无按钮时返回任意非空输入，且**会试图把输入转换为 Number**；
- 每次 `era.input` 后之前输出的按钮被禁用；
- 按钮文本不会自动换行（.kojo 中可用 `comment` 补单行说明）。

**数据表**

- 变量数据表**不能放到 csv 文件夹的子文件夹中**（角色数据表可以）；
- 变量序号和变量名不能重复；重复会产生自动生成序号/浪费存档空间等不可预期后果；
- 受保护表名：`maxbase`、`delta`、`jewel`、`gotjewel`、`nowex`（对应同名 CSV 会被警告且不读取）；
- 自定义二维表必须在 `system.extendedCharaTables` 中登记（建议放 `_fixed.json`）；
- 变量初始化值：普通表 `0`，cstr 表 `''`；
- `base` 表变量会被引擎自动修正到 `0`–`` `maxbase` `` 之间；
- `era.add` 不做类型检查，对非数值对象操作大概率得到 `NaN`；
- 存档数据只能保存为纯数据：存档再读档后自定义类的实例会变成普通 Object，需要 `from_obj` 之类的静态方法还原（14-lines 的 `EventObject.from_obj`）；
- 调教表在 `era.beginTrain` 之前不存在，此前读取其中的变量只会得到 `undefined`。

**配置**

- `system.disableClear` 慎用：EraElectron 的 UI 本质是 HTML，不清屏会让内容累积导致卡顿（用 `window.limit` 限制保留行数；4.8.6 之前该上限不生效）；
- `system.saveCompressedData` 在安卓版引擎中恒为禁用，安卓引擎也无法读取压缩存档；
- 生成 `static.json` 时要包含 `res` 必须打开【启用资源】且已读取 res 的 csv；
- 安卓打包**最好不要对 SDK（`era-electron.js`）改名或移动位置**，否则要同步修改 `webpack.config.js` 中 `context`/`entry`/`alias` 以及 kojo-loader 的 `sdkPath`；
- 格式转换功能不会覆盖当前读取的静态数据文件，因此读取 YAML 时无法生成 YAML；
- 未指定 `system.static` 时 `_fixed.json` 需同时放在优先级最高的文件夹和 `system.static` 指定的文件夹中。

**排版**

- 网格为 24 列；`offset` 0–23、`width` 1–24；`offset + width > 24` 的内容会超出显示范围（需横向滚动条）；
- `era.printMultiColumns` 输出的内容在编程意义上属同一 Row，`await era.clear(1)` 会一起清除；非独占一行的分割线不会被【自动压缩空行】与相邻分割线压缩；
- `era.getLineCount()` 在开启【自动压缩空行】时也包含被隐藏的空行数量；
- 使用 `era.setAlign`/`era.setOffset`/`era.setWidth`/`era.setHorizontalAlign`/`era.setVerticalAlign` 修改默认值后应改回默认（`'left'`/0/24/`'start'`/`'top'`），以免影响后续输出；
- `era.print('...\n\n')`（一次 API 调用）与 `era.print(...)` + `era.println()`（两次调用）在编程意义上的行数不同，影响 `era.clear(n)` 的结果。

**调试**

- 控制台对象 `era.*` 的返回值全是 `undefined`，真正返回值在下一行；**永远不要同时使用两个以上的控制台 `era` 函数**；
- 首次打开控制台可能被提示危险行为，需按提示手动输入文字解锁；
- `era.logger.debug` 只在调试模式生效；`era.logger.assert` 在非调试模式仍生效（建议测试后删除断言）。

**性能/交付**

- 安卓设备计算能力较差，为减少文件读取、提高运行效率，PC 版游戏包需被打包为数量较少的文件：静态数据（csv/json/yml 静态数据文件夹、`_config.json`、`_fixed.json` 和多媒体资源注册文件）打包为一个文件，`ere` 里的脚本集打包为两个文件（一个 SDK 文件 `era.bundle.js`、一个游戏脚本文件 `main.bundle.js`）。

## 10. 多线程与实时循环（17-multithreading）

> **想实现任何「持续推进」的效果都看这一节**：实时游戏循环（贪吃蛇这类每格走一步的玩法）、计时器 / 倒计时、自动播放、动画刷新、跳过演出、选项延迟出现、选择超时返回默认值。

引擎对「多线程」的定义（原文）：

> 在EraElectron引擎中，多线程则主要侧重于将脚本逻辑分成两股同时推进，这样即使其中一个因等待玩家输入而暂停时另一个也可以继续计算。

> Node.js并不具备一般意义上的多线程，因为Node.js本质上是在单线程中靠事件驱动的。

### 10.1 基本原理：不 `await` + `.then()`

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

### 10.2 延时选项（选项延迟出现）

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

### 10.3 超时默认（选择超时返回默认选项）

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

### 10.4 跳过演出 —— **这就是实时循环（帧循环）的模板**

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

**上例的四个部件就是所有的实时效果所需**：

| 部件 | 作用 |
|---|---|
| 不 `await` + `.then()` | 让逻辑分两股同时推进：一边等玩家输入，一边继续算 |
| `era.delay(ms)` | **帧时钟**。它返回 Promise，不 `await` 就相当于 `setTimeout` |
| `era.replaceInColRows([...])` | **原地重绘**（替换刚输出的那几行），所以画面能刷新而不是不断追加新行 |
| 按钮 `config: { disableWarning: true }` | 每帧重发同一个按钮时，压掉「快捷键重复」的控制台警告 |

### 10.5 补充：源码核对出来的几个要点（不在 wiki 原文中）

- **没有方向键 API。** 输入是一个文本框，只有 Enter 才提交（`@keyup.enter`），方向键只会移动光标。但 `era.input({ any: true, hideInput: true })` 会在**敲下第一个字符时就立刻 resolve，并把那个字符作为返回值**（引擎源码里 `config.any` 会跳过回显）；`era.waitAnyKey()` 等价于 `input({any:true, useRule:false})`，但它**丢弃**按键值。所以实时玩法用 **WASD** 这类字符键，不需要 Enter。
- **不要用 `Promise.race([input, delay])` 当节拍。** 输掉的那次 `input` 永不 resolve，引擎按 `inputKey` 注册的监听不会被清理，会积累「野监听」。正确做法是**同一时刻只挂一个输入监听，按键后重新挂一个**：
  ```js
  let dir = 'w';
  (function listen() {
    era.input({ any: true, hideInput: true }).then((k) => { dir = k; listen(); });
  })();
  while (running) { step(dir); era.replaceInColRows(draw()); await era.delay(150); }
  ```
- **`show` 参数在 PC 上不隐藏输入框。** A-api-docs 把 `input` 的 `show` 标注为「仅限安卓版」；PC 渲染层只把 `show` 用于**行对象**的显隐，没有作用到输入框。所以 10.4 的例子在 PC 上输入框仍然可见（配方本身照常可用）。
- **帧率不必高。** 10.4 用的是 200ms（每秒 5 帧），而经典贪吃蛇本来就是每格几百毫秒 —— 5～7 FPS 完全够用。
