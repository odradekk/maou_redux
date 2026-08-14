---
title: '#18 其他辅助开发工具'
---

本章介绍ere游戏的其他辅助开发工具，包括 JavaScript 运行环境 Node.js 和其包管理器 npm，以及Electron引擎生成的开发辅助用的开发套件。

本章同时还是 [#19 生成Android版](./19-android) 和 [#20 检查版本更新](./20-updates) 的基础，其中使用了本章介绍的 Node.js 运行环境和 npm 包管理器。

# Node.js

## 介绍

Node.js 是一个开源和跨平台的 JavaScript 运行时环境。Node.js 在浏览器之外运行 V8 JavaScript 引擎，即 Google Chrome 的核心，这使 Node.js 的性能非常出色。[^1]

[^1]: [Node.js 中文网 — Node.js 简介](https://nodejs.cn/en/learn)

Node.js 通过一些核心模块提供了一些在计算机上而非浏览器中运行 JavaScript 代码的基础功能，同时还可以通过第三方的模块实现其他功能，以满足程序员的需求。EraElectron就是基于 Node.js 开发的软件，基于它的核心模块和一些第三方模块实现了基本功能，并利用 Node.js 的运行环境实现了ere游戏脚本的执行。

出于安全考虑，EraElectron并不允许在ere游戏中引入 Node.js 的核心模块或其他第三方模块（唯一的例外是`crypto`，这是一个 Node.js 内置的安全加密模块），但开发者依然可以利用 Node.js 辅助开发或发布版本等。

## 包管理器 npm

npm 是 Node.js 的标准包管理器，开发者可以利用它轻松下载并管理环境中的第三方模块。

npm 管理器需要项目中的 package.json 文件才能发挥作用，其中声明了游戏开发需要的第三方软件包、依赖的 Node.js 环境版本以及一些用 npm 安装的软件包的运行指令。多数情况下开发者并不需要关注 package.json 的内容，只需要在命令行中运行 npm 相关指令就会自动更新 package.json 文件。

在 `npm install` 等 npm 命令运行后还会出现一种 package-lock.json 文件，它是 npm 在安装软件包时根据开发者的操作系统等信息对软件包进行筛选后的结果，可以理解为用于加速 npm 运行的缓存文件。package-lock.json 可以删除，但在某些情况下最好保留，便于 npm 命令的运行。

## 安装与使用

Node.js 与 npm 的安装可以参考这篇教程：[Node.js 安装配置 | 菜鸟教程](https://www.runoob.com/nodejs/nodejs-install-setup.html)。建议安装偶数版本的 Node.js，如 18.x、20.x 或 22.x，npm 会伴随 Node.js 一同安装。

直接连接 npm 服务器的速度可能较慢，可以在命令行中输入以下指令：

```shell
npm config set registry https://registry.npmmirror.com/
```

> 命令行的打开方法：Windows 的话在左下角徽标键上右键点击，在弹出菜单中点击命令行；或者按 Win + R 打开【运行】窗口，在其中输入 cmd 然后按回车；Mac 开发者可以进入聚焦搜索输入【Terminal】或【终端】，然后打开终端.app；Linux 开发者可以直接 Ctrl + Alt + T 打开终端。<br>
> Windows10 以上开发者建议通过 Microsoft 商店安装 [Windows Terminal](https://apps.microsoft.com/detail/9n0dx20hk701)，以获得更好的使用体验。

这可以为 npm 设置软件包源，加快软件包的安装。

在安装 Node.js 和 npm，并设置 npm 源之后，就可以在游戏文件夹内创建 package.json 或直接运行 `npm install` 指令来安装其他软件包了。因为EraElectron引擎的限制，ere游戏不能使用第三方软件包提供的模块，所以一般将软件包放在 package.json 的 devDependencies 下，或通过 `npm install -D` 将软件包作为开发辅助用的依赖安装。

强烈建议使用 WebStorm 并安装 [eslint](./02-ide#进阶使用eslint管理代码质量) 辅助开发，能够极大提高编程体验！

# 开发套件

ere游戏中使用 era.get 和 era.set 读写游戏存档的各项变量，变量的指定则全靠字符串拼接，拼写错误难以判断，也不利于多语言版本的开发。EraElectron引擎虽然也支持使用变量序号代替变量名指定变量以提高多语言版本兼容性的做法，但会导致可读性极大下降。

> 读者可以尝试阅读一下 erakanon 和 eratohoYMAEM 的源码，感受一下变量序号满天飞的代码可读性如何……

为此，EraElectron引擎提供了【生成开发套件】功能（在菜单栏【帮助】之下，需要完成加载后才能使用），可以根据游戏现在加载的静态数据生成开发套件，以对象对应角色，将角色表的各种变量按照表归类作为角色对象的属性，然后在游戏脚本中就可以以面向对象的风格编程。各变量的含义首先可以通过英语变量名传达，其次也可以使用 WebStorm 等 IDE 的提示进行解读。各变量实际读写时使用的是变量序号，因此也兼具多语言版本兼容性：

```javascript
// #/era-utils/chara/era-base.js
// ereKanon 中基于 Base 表生成的开发套件
const era = require('#/era-electron');

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
  /**
   * 气力
   * @returns {number}
   */
  get sp() {
    return era.get(`base:${this.id}:1`);
  }
  /**
   * 气力
   * @param {number} v
   */
  set sp(v) {
    era.set(`base:${this.id}:1`, v);
  }

  /** @type {number} chara_id */
  constructor(chara_id) {
    this.id = chara_id;
  }
}

module.exports = EraBase;
```

```javascript
// #/page/homepage.js
// ...
// EraChara 是开发套件中的角色类，使用 EraChara.get 可以获取角色ID对应的角色对象
const cur = EraChara.get(era_flag.cur_chara);
era.printMultiColumns(
[
  { content: '体力', config: { width: 2 }, type: 'text' },
  {
    config: {
      color: '#009300',
      height: 20,
      width: 9,
    },
    // cur.base.hp 表示 cur.id 对应的角色的当前体力
    // cur.maxbase.hp 表示 cur.id 对应的角色的最大体力
    inContent: `${Math.floor(cur.base.hp).toLocaleString()}/${cur.maxbase.hp.toLocaleString()}`,
    percentage: (cur.base.hp * 100) / cur.maxbase.hp,
    type: 'progress',
  },
  { content: '气力', config: { offset: 1, width: 2 }, type: 'text' },
  {
    config: {
      color: '#6b6bff',
      height: 20,
      width: 9,
    },
    inContent: `${Math.floor(cur.base.sp).toLocaleString()}/${cur.maxbase.sp.toLocaleString()}`,
    percentage: (cur.base.sp * 100) / cur.maxbase.sp,
    type: 'progress',
  },
],
{ width: 18 },
);
// ...
```

## 数据格式要求

任何格式的静态数据文件都可以生成开发套件，但 JSON 和 YAML 格式的文件因为具有更大的灵活性，可以为每个变量定义更多的元数据。

CSV 格式下，因为每个变量只有变量序号和变量名两种信息，生成的开发套件中代码中的变量名只能根据表名和序号自动推断，也无法尝试指定类型，生成的开发套件会如下所示：

```javascript
// #/era-utils/chara/era-abl.js
// EraUma 根据 Abl 表生成的开发套件
const era = require('#/era-electron');

class EraAbl {
  /**
   * 速度训练等级
   * @returns {number}
   */
  get "abl0"() {
    return era.get(`abl:${this.id}:0`);
  }
  /**
   * 速度训练等级
   * @param {number} v
   */
  set "abl0"(v) {
    era.set(`abl:${this.id}:0`, v);
  }
  /**
   * 耐力训练等级
   * @returns {number}
   */
  get "abl1"() {
    return era.get(`abl:${this.id}:1`);
  }
  /**
   * 耐力训练等级
   * @param {number} v
   */
  set "abl1"(v) {
    era.set(`abl:${this.id}:1`, v);
  }
}
```

在 JSON 和 YAML 格式下，可以为变量指定代码中的变量名和类型（以 ereKanon 为例）：

CFlag.json：

```json
{
  "卖出": {
    "id": 0,
    "name": "sold",
    "type": "number"
  },
  "贞操": {
    "id": 100,
    "name": "virgin",
    "type": "number"
  }
}
```

> 默认的 JSON 格式不支持注释，上面的文件位于 json/CFlag.json

```yaml
# yml/Base.yml
体力:
  id: 0
  name: "hp" # [体力]变量对应的代码中的变量名
  type: "number" # [体力]变量对应的变量类型
气力:
  id: 1
  name: "sp"
  type: "number"
```

基于上面两种格式的静态数据文件可以生成更具可读性的开发套件。

在已经有 CSV 格式的静态数据文件的情况下，可以使用 [【格式转换】功能（在【帮助】-【生成静态文件】下）](./09-static#格式转换) 转换出 JSON 或 YAML 格式的静态数据文件，其中已经填充了默认的代码变量名和变量类型，此时修改这些变量名、修改 ere.config.json 中的 system.static 为对应的格式（`json` 或 `yml`），然后重新加载并生成就好。

## 生成与使用

点击【生成开发套件】后，会在 ere 文件夹下生成 era-utils 文件夹，例如 ereKanon 中的文件结构：

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

引擎会将游戏的系统变量表（一维表）直接生成在 era-utils 下（Flag → era-flag.js、Item → era-item.js、TFlag → era-tflag.js），角色变量表（二维表）生成在 era-utils/chara 下（Abl → era-abl.js 等），然后被 era-chara.js 引入。各表变量的代码变量名与变量序号和变量名的对应关系则在 era-utils/names 下。

era-chara.js、era-info.js 和 era-item.js 的结构和其他表有所不同。

era-chara.js 导出了 EraChara 类，该类有个静态方法 EraChara.get，传入角色的ID获取相应角色的对象，然后可以通过该对象的 id、name、callname、love、title 等属性读写角色的编号、真实姓名、默认称呼、对主角的爱慕和称号（编号和称号是只读的），通过 callname_to、set_callname_to、relation_to、set_relation_to 等方法读写对其他角色的称呼和好感/信赖，以及 abl、base、cflag 等对象属性及其属性读写角色在相应表中的变量。

era-info.js 导出了一个对象 era_info，其中有 gamebase、version 和 saves 等属性，用于读取游戏的基本数据、版本和存档备注（对 saves 可读写）。但注意 saves 只支持0到生成开发套件时设置的游戏存档栏位数，例如 ereKanon 在生成开发套件时游戏存档栏位数设置为10，所以开发套件中 era_info.saves 只有0-10一共11个属性。

era-item.js 导出的对象 era_item 中，每个道具对应一个对象属性，其中又有 count、price 和 sales 三个属性，分别用于读写该道具的持有数、售价和在售数。除此之外，还有 bought、bought_name 用于读写之前购买的道具序号和道具名（bought_name 是只读），sales 和 hold 用于获取在售道具/持有道具对应的代码变量名数组（只读），clear_sales 方法则用于清除所有在售道具。

开发套件的使用案例可见 [ereKanon](https://gitgud.io/umaera/game/ere-kanon)。

开发套件本身不依赖于静态数据文件（只要变量序号不变），缺少生成开发套件所用的静态数据文件不影响开发套件的使用。