# {{TITLE}}

基于 [EraElectron](https://gitgud.io/umaera/engine/era-electron)（简称 ere）的 ere 游戏工程。

## 目录结构

```
.
├── csv/                    静态数据（引擎唯一必需的目录）
│   ├── GameBase.csv        游戏信息表：名称、作者、版本、游戏标识……（必需）
│   ├── Flag.csv            一维系统变量表
│   ├── Base.csv            角色基础属性表（base / maxbase）
│   ├── Abl.csv             角色技能表
│   ├── Param.csv           角色参数表（juel / jewel）
│   ├── Talent.csv          角色特性表
│   ├── CStr.csv            角色字符串表
│   ├── Item.csv            道具表（序号,道具名,价格）
│   └── Chara/              角色预设数据（Chara*.csv）
├── ere/                    游戏脚本集
│   ├── era-electron.js     引擎 SDK（从引擎的 sdk/era-electron.js 复制而来）
│   ├── main.js             入口，导出异步函数
│   └── page/               界面脚本
└── webpack.config.js       仅用于生成打包版 / 安卓版
```

## 运行

1. 下载 [EraElectron 引擎](https://gitgud.io/umaera/engine/era-electron/-/releases/permalink/latest)；
2. 打开引擎，菜单栏【游戏】-【打开游戏】，选择本文件夹；
3. 引擎会依次读取 `csv/` 和 `ere/`，加载完成后按任意键进入游戏；
4. 修改脚本后在引擎中按 `Ctrl+R`（Windows/Linux）或 `Command+R`（macOS）重载游戏。

## 编写游戏

### 读写数据

```javascript
const era = require('#/era-electron');

era.get('flag:金钱');                 // 一维表：flag:变量名
era.set('flag:金钱', 500);
era.get('base:1:体力');               // 二维表：表名:角色ID:变量名
era.get('maxbase:1:体力');
era.get('item:体力药');               // 道具持有数
era.get('callname:1:-2');             // 旁白对角色 1 的称呼
era.get('relation:1:0');              // 角色 1 对角色 0 的好感度
era.get('gamebase').title;            // GameBase.csv（只读）
```

### 输出与输入

```javascript
await era.clear();                              // 清屏（异步）
era.print('一行文本', { align: 'center' });
era.printButton('选项', 1);                     // 快捷键 1
era.drawLine({ isSolid: true, content: '分隔' });
const choice = await era.input();               // 等待玩家输入/点击
await era.printAndWait('按任意键继续');
```

### 排版

```javascript
era.printMultiColumns([
  { config: { width: 6 }, content: '文本', type: 'text' },
  {
    config: { color: '#009300', height: 20, width: 6 },
    inContent: '2000 / 2000',
    percentage: 100,
    type: 'progress',
  },
]);
```

### 存档

```javascript
await era.saveData(1, '存档 1');   // 写入 sav/1.sav
await era.loadData(1);            // 读取存档，返回是否成功
await era.rmData(1);              // 删除存档
era.get('global:saves:1');        // 读存档备注
era.set('global:saves:1', '备注'); // 改备注后需 await era.saveGlobal()
```

## 打包 / 安卓版

```shell
npm install
npm run webpack       # 生成 dist/era.bundle.js、dist/main.bundle.js、dist/static.json
```

`dist/` 就是安卓版引擎（ere.app）可运行的打包格式。注意：`static.json` 是由引擎菜单栏【帮助】-【生成静态文件】从 `csv/` 生成的，使用 `ere-webpack-plugin` 时需要先有 `build/static.json` 或由插件自动生成。

## 参考

- 引擎 Wiki：EraElectron 的官方文档（开发指南 #1 ~ #20、附录 A ~ E）
- 官方例程：[ere-example](https://gitgud.io/umaera/game/ere-example)
