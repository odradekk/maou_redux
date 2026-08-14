---
title: '#19 生成 Android 版'
---

本章介绍如何在已开发游戏的基础上生成可供安卓版使用的游戏包，包括去除循环依赖和生成静态文件等准备工作，以及准备打包配置等打包工作。

因为安卓设备的计算能力与PC相比较差，为尽可能减少文件读取、提高运行效率，PC版的游戏包需要被打包为数量较少的几个文件。具体来说，游戏的静态数据（csv/json/yml等静态数据文件夹、\_config.json、\_fixed.json和多媒体资源注册文件）会被打包为一个文件，ere文件夹中的游戏脚本集会被打包为两个文件——一个 SDK 文件和一个游戏脚本文件。

因为使用了打包工具 Webpack，在阅读本章之前需要阅读 [#18 其他辅助开发工具](./18-tools#nodejs) 中的相关内容。

# 准备工作

## 检查循环依赖

以下内容摘自 [Node.js 模块系统 | 菜鸟教程](https://www.runoob.com/nodejs/nodejs-module-system.html)：

> 当两个或多个模块相互导入时，称为循环依赖。Node.js 能处理简单的循环依赖，但可能导致部分模块导出的对象未完全初始化。
> ```javascript
> // a.js
> const b = require('./b');
> console.log('a.js:', b.message);
> module.exports = { message: 'Hello from a' };
> 
> // b.js
> const a = require('./a');
> console.log('b.js:', a.message);
> module.exports = { message: 'Hello from b' };
> 
> // main.js
> require('./a');
> ```
> 上面的例子中，b.js 导入 a.js 时，由于 a.js 尚未完全执行，a.message 为 undefined。

因为会导致模块导入导出实效，循环依赖会破坏一部分运行逻辑，导致游戏脚本的运行失败。即使不需要生成安卓版游戏包，也请读者警惕循环依赖。

EraElectron引擎无法直接解决循环依赖，但会在发现循环依赖时会在控制台输出日志，以提示在哪个文件上发生了环形依赖。

解决环形依赖的办法有两种。第一种是提取两个模块公共需求的部分作为第三个模块，让这两个模块都依赖它，例如：

```javascript
// 新模块 c.js
module.exports = { message: 'Hello from b' };

// a.js
const b = require('./c');
console.log('a.js', b.message);
module.exports = { message: 'Hello from a' };

// b.js
const a = require('./a');
const _b = require('./c');
console.log('b.js', a.message);
module.exports = _b;
```

另一种方法主要是针对导入函数，或者导入模块的内容后续在运行时使用的情况：

```javascript
// a.js
let b;
module.exports = {
  a() {
    console.log('a.js', b.message);
  },
  init(_b) {
    b = _b;
  },
  message
};

// b.js
const a = require('./a');
function b() {
  console.log('b.js', a.message);
}
const message = 'Hello from b';
a.init({ message });
module.exports = { b, message }
```

## 生成静态数据文件

安卓版引擎使用的静态数据文件可以直接使用PC版引擎菜单栏的【帮助】-【生成静态文件】-【安卓】功能生成，之后会在游戏项目文件夹的 build 文件夹下生成 static.json 文件。static.json 定义了一个对象，完整版的 static.json 可以分为以下三个部分：

* 静态数据：static、names、extend 三个对象属性，保存了各种数据表中的变量信息以及角色的预设数据；
* 默认设置：config 和 fixed 两个对象属性，分别为默认配置和强制设置，对应 **ere.config.json**（注意这里对应的不是 \_config.json）和 \_fixed.json；
* 多媒体资源：res 对象属性。

需要注意的是，如果想生成的 static.json 中包括 res 对象属性，需要在生成静态数据文件时确保打开了[启用资源]游戏配置、并且读取了多媒体资源文件夹中的 csv 文件（只要确认游戏中使用了多媒体资源的地方是否有正常的图片显示或音乐播放即可）。

# 打包工具

> 按照本节内容进行操作前请确认计算机上已安装好了 Node.js，并在命令行中运行 `npm -v` 有版本号输出而非报错信息。

## Webpack

Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。[^1]

[^1]: [Webpack 入门教程 | 菜鸟教程](https://www.runoob.com/w3cnote/webpack-tutorial.html)

![Webpack](https://www.runoob.com/wp-content../_uploads/2017/01/32af52ff9594b121517ecdd932644da4.png)

在ere游戏项目中，webpack 可以将 ere 文件夹下的游戏脚本集打包到一起，以便于在安卓版引擎上运行。

## 打包配置

首先打开命令行工具，打开到游戏项目文件夹。

> 任何系统的命令行中都可以使用 `cd` 命令，只有细节略微不同。安装了 Windows Terminal 的开发者可以直接在文件管理器的游戏文件夹中右键点击在该文件夹打开 Terminal，打开的终端会自动打开到该文件夹。

在命令行中输入以下指令：

```shell
npm install -D @babel/core @babel/preset-env babel-loader webpack webpack-cli git+https://gitgud.io/umaera/engine/ere-webpack-plugin.git
```

如果之前没有配置 eslint，运行完成后游戏项目文件夹下会出现 node_modules 文件夹和 package.json 文件。

修改 package.json 文件，在其中增加一个对象属性 scripts：

```json
{
  "scripts": {
    "webpack": "webpack"
  }
}
```

> 默认的 JSON 格式不支持注释，请读者将上述内容自行添加到 package.json 中。

在游戏项目文件夹下创建文件 webpack.config.js，输入以下内容：

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

> 可以注意到上面的配置代码中出现了 SDK era-electron.js，如果想使用本章介绍的打包配置 **最好不要对 SDK 文件改名或移动位置**。

> 上面的代码主要作用是新建了 dist 文件夹，将之前生成的静态文件 static.json 最小化后复制到 dist/static.json，然后按照 webpack.config.js 的配置将 ere 文件夹下的 SDK 和以 main.js 为入口的脚本文件集打包为 dist 文件夹下的 main.bundle.js 和 era.bundle.js。<br>
> SDK 改名或者位置改变需要修改 webpack.config.js 中的路径。

以上就完成了所有的打包配置。打包配置和脚本的具体逻辑可以不用细究，只要不对 SDK 改名或者改变位置就可以直接取用。

在完成打包配置后，在游戏项目文件夹下执行命令 `npm run webpack`，就会在游戏项目文件夹的 dist 子文件夹下生成可在安卓版上运行的游戏包。

> 命令 `npx webpack` 也可以。<br>
> EraElectron PC版引擎具备运行安卓版游戏包的能力，在引擎中打开刚刚生成的 dist 文件夹即可。开发者可以借此测试打包是否成功。

> 如果游戏中有 .kojo 文件，需要配置 kojo-loader，详见 [#C .kojo 口上文件](./C-kojo#生成-android-版) 。

# 游玩安卓版游戏

## 文件结构要求

因为技术限制，安卓版引擎可以加载的游戏包必须位于安卓手机的个人文件夹内（就是有下载、文档等子文件夹的文件夹），在此基础上可以放置于任意文件夹下，不过还是建议放在 Downloads/下载 等文件夹内，或者专门创建一个 Games/游戏 文件夹来放置。

一个安卓版引擎 ere.app 可运行的游戏包需要满足以下文件结构：

    游戏文件夹
    ├── res文件夹（可选，和PC版引擎使用的多媒体资源 res 文件夹结构相同）
    ├── era.bundle.js
    ├── main.bundle.js
    └── static.json

在启动后，会自动在游戏文件夹下生成 sav 和 ere.config.json 等文件夹或文件。

如果在安卓版引擎中启用了资源，安卓版引擎会自动在 res 文件夹下生成 .nomedia 文件，用于告知安卓系统不要将这个文件夹及子文件夹的内容计入照片或类似应用的管理范围。

## 存档互通

安卓版引擎会禁用压缩的存档文件格式（即配置中[存档文件格式]的选项锁定为[普通JSON文件]），也无法读取压缩保存的存档文件。幸运的是，PC版引擎可以同时读写两种格式的文件，因此可以实现相同游戏在两版引擎间的存档互通：

* 安卓版引擎→PC版引擎：可以直接使用，放置到 sav 文件夹中即可读写；
* PC版引擎→安卓版引擎：普通JSON文件保存的存档文件可以直接放置到 sav 文件夹中读写，压缩保存的存档文件需要先切换到普通JSON文件格式覆盖保存后才可以在安卓版引擎中使用。