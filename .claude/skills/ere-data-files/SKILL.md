---
name: ere-data-files
description: Use when writing or fixing the static data of an EraElectron (ere) game in any of its three formats — yml/ (preferred), json/, or csv/ — including GameBase, the variable tables (Flag, Base, Abl, Talent, Item, Global, TFlag, TEquip…), character preset files (Chara*), extended tables, the era.get/era.set data-path grammar, and the res/ resource registry.
---

# ere 静态数据文件（YAML / JSON / CSV）

> **在本项目里使用**（移植自 dsh-ere-game-builder v1.3.2，来源与本地改动见 `tools/ere-game-builder/README.md`）
>
> - 文中的 `ere_*` 工具改用命令行 `node tools/ere-game-builder/cli.mjs <工具名> [--参数 值]`，参数名与原工具相同，加 `--help` 看说明。文中的「插件」指 `tools/ere-game-builder/`，`assets/` 指它下面的 `assets/`。
> - 知识库按引擎 5.0.0 核对；本项目运行引擎 4.8.0，静态数据只用 `yml/`。两边不一致时，引擎行为以 `dev-guides/` 和 app.asar 里的引擎源码为准，写法和目录组织以 `AGENTS.md` 和现有代码为准。知识库没写全、已在 4.8.0 上确认的行为：
>   - `addCharacter(id)` 遇到没有预设的 id 直接返回 false，不会建角色。
>   - 读 `<表>name:<序号>` 时，序号未声明会抛出 TypeError，游戏卡死。
>   - `saveData(槽, 备注)` 会顺带把备注写进 global 里的存档备注并保存 global；省略备注时，该槽的备注被写成 undefined。
>   - 变量表名称列里的拉丁字母会被引擎转成小写，名字表里存的也是小写。
> - 本项目的检查以 `npm test`、`npm run lint`、`npm run format:check` 为准。`ere_check_game` 的输出要分类处理：
>   - 「未知的数据表」和「没有变量 "<名字>"」是真缺陷，必须修。
>   - 以下几类是本项目约定或工具局限造成的误报，不要按它们改 `ere/` 或 `yml/`：
>     - 「没有序号为 N 的变量」：`CFlag.yml` 等表按约定不登记或只登记部分序号，4.8.0 对未声明的序号按数字下标正常读写。
>     - `palam:<角色>:<序号>` 报「段数不对」：这在 4.8.0 是合法的三段地址，名字取自 `staticData.juel`。
>     - 「表名为空」：表名是 `${table}` 这类动态拼接，工具无法检查。
>     - Chara17 的「第一列 "portcflag" 不是引擎认识的字段」：`portcflag` 是 `_fixed.json` 的 `extendedCharaTables` 声明的扩展表。
>     - 开发套件的两类警告（生成文件缺少 GENERATED 标记、套件与当前静态数据不一致）：原因见下一条。
>   - 默认最多收集 200 条，超出的直接截断，排在后面的警告也一并丢掉。要看全量，加 `--maxFindings 100000`。
> - `ere/era-utils/` 不是引擎的开发套件：带 `// GENERATED START/END` 标记的具名访问器由 `tools/gen-wrapper.js` 生成，`exp-level.js`、`palam-level.js` 是手写模块。它的文件名和标记与引擎生成的套件相同，但 4.8.0 的【帮助】-【生成开发套件】会把两个标记之间的内容换成 `era.raw()` 写法，还会新建一批文件，所以本项目不用它。技能正文和 `ere_check_game` 里「重新生成开发套件」的建议、「有套件就按套件写变量」的说法，在本项目都不适用。

静态数据都在游戏目录的 `csv/` 下（也支持 `json/`、`yml/`，优先级 **yml > json > csv**）。
引擎在启动时把它们读成「表」，游戏脚本通过 `era.get/set/add('表名:…')` 读写。

## 通用规则

- **编码**：只能是 **UTF-8** 或 **UTF-8-BOM**。要用 Excel 编辑就存 UTF-8-BOM，否则 Excel 里中文乱码。
- **分隔符**：半角逗号 `,`。
- **注释**：`;` 之后的整行都是注释 —— 行首可以，**行尾也可以**：
  ```csv
  1,C感觉  ; -1 - 钝感，1 - 敏感
  ```
- **大小写不敏感**：文件名、表名、变量名都可以任意大小写，引擎统一按小写处理。
  但 `'引号里的引用'` 与文件路径必须大小写完全匹配。
- **文件位置**：变量数据表必须在 `csv/` **根目录**（不能放子文件夹）；只有角色数据表
  `Chara*.csv` 可以放任意子目录。
- **不要留空字段**：引擎按逗号切分整行后会**丢掉空字段**（旧版本如此；新版本改为保留为 `undefined`），
  所以 `10,,2000` 在旧版本上会让后面的列整体左移一格，静默得到错值。某一列没内容时宁可重排表格
  结构或填占位值，不要靠「留空」表示「没有」。
- **列数上限**：除 `Chara*.csv`、`Item.csv` 和 `res/` 下的资源表之外，**其他表每行只会取前两列**，
  第 3 列及以后会被引擎丢掉。
- **文件名字符集**：`<表名>names|keys|values|entries` 这类名字属于已有表，不能拿来做新文件名。

## 三类表

### 1. 游戏信息表 `GameBase.csv`（必需）

两列 `键,值`。第一列可以写中文名、英文变量名或别名，引擎会做映射。

| 名称 | 变量名 | 必填 | 说明 |
| --- | --- | --- | --- |
| 游戏名称 | `title` | 是 | 标题 |
| 作者 | `author` | 是 | 作者 |
| 追加信息 | `info` | 是 | 副标题/补充信息 |
| 发布时间 | `year` | 是 | 年份 |
| 游戏标识 | `gameCode` | 是 | 纯数字，用于区分存档；改了旧存档就拒绝读取 |
| 版本 | `version` | 是 | 纯数字，如 `0001` |
| 最低支持版本 | `allowVersion` | 是 | 纯数字；存档版本低于它会被拒绝读取 |
| 版本代号 | `versionName` | 否 | 标题上显示的版本字符串 |
| 初始角色编号 | `defaultChara` | 否 | 重置数据时自动创建该角色 |
| 发布页 / 游戏图标 / 版本检查 / 程序更新 | `site` / `icon` / `versionCheck` / `baseZip` | 否 | 版权信息、图标、更新检查 |

```csv
作者,你
追加信息,第一款 ere 游戏
发布时间,2026
游戏名称,Example
游戏标识,114456
版本,0001
最低支持版本,0001
```

`era.get('gamebase')` 会返回只读对象，属性名是英文变量名（`title`、`version`…）。

`_Replace.csv` 是可选的两列表，用于替换加载提示文本，仅在 `system._replace` 打开时生效。

### 2. 变量数据表

每行是 `变量序号,变量名[,额外列]`。序号与变量名不能重复；**改表时不要改已有变量的序号**
（序号是存档的索引，改了存档就错位）。

一维表（`表名:变量名`）：

| CSV | 表名 | 说明 |
| --- | --- | --- |
| `Flag.csv` | `flag` | 系统旗标，属于当前存档 |
| `Global.csv` | `global` | 全局变量，单独存到 `global.sav`，跨存档 |
| `Item.csv` | `item` | **三列** `序号,道具名,价格`；扁平一维，不是二维表 |

二维表（`表名:角色ID:变量名`）：

| CSV | 表名 | 说明 |
| --- | --- | --- |
| `Base.csv` | `base` / `maxbase` | 基础属性当前值 / 上限；`base` 写入会被钳制到 `0..maxbase` |
| `Abl.csv` | `abl` | 技能 |
| `Talent.csv` | `talent` | 特性/素质，允许负值 |
| `CFlag.csv` | `cflag` | 角色旗标 |
| `CStr.csv` | `cstr` | 角色字符串，初始为 `''` |
| `Equip.csv` | `equip` | 装备 |
| `Mark.csv` | `mark` | 刻印 |
| `Exp.csv` | `exp` | 经验 |
| `Param.csv` 或 `Palam.csv` | `juel`(=`jewel`) | 宝珠 —— **进入调教前唯一可用的参数表** |

调教（调教系统）专用表：**只有调用 `era.beginTrain(...)` 之后才存在，之前读会得到 `undefined`**。
`Param.csv` 同时提供 `palam`(=`param`)、`delta`、`gotjuel`；`Base.csv` 同时提供 `deltabase`；
`Ex.csv` 同时提供 `nowex`。其余为 `TFlag.csv→tflag`、`TCvar.csv→tcvar`、`TEquip.csv→tequip`、
`Source.csv→source`、`Stain.csv→stain`。

### 3. 角色数据表 `Chara*.csv`

文件名以 `Chara` 开头（大小写不限），可以放 `csv/` 下任意子目录。第一列同样支持
中文名 / 英文名 / 别名：

| 名称 | 变量名 | 写法 |
| --- | --- | --- |
| 角色编号 | `id` | `角色编号,0` |
| 姓名 | `name` | `姓名,主角` |
| 默认称呼 | `callname` | `默认称呼,你` |
| 称号 | `title` | `称号,第四天灾` |
| 称呼（对某角色） | `callname` | `称呼,1,同学` ← 三列 |
| 信赖 | `relation` | `信赖,1,100` ← 三列 |
| 基础属性 / 技能 / 特性 / 角色flag / 角色str / 装备 / 刻印 / 经验 / 珠 | `base` `abl` `talent` `cflag` `cstr` `equip` `mark` `exp` `juel` | `基础属性,体力,2000` ← 三列 |

```csv
角色编号,0
姓名,主角
默认称呼,你
基础属性,体力,2000
基础属性,气力,1000
技能,技巧,1
```

**预设值只有在 `era.addCharacter(id)` 之后才生效**；`era.resetData()` 只清空数据，不添加角色。

### 自定义扩展表

在 `csv/` 下放一个结构相同的新表（例如 `Status.csv`）就会被自动识别为 **一维表** `status`
（`status:沉睡`）。想当二维表用，把表名加进配置的 `system.extendedCharaTables`：

```json
{ "system": { "extendedCharaTables": ["status"] } }
```

写进 `csv/_fixed.json`（最高优先级，玩家不可改）最稳妥。

## 数据路径语法（速查）

| 写法 | 含义 |
| --- | --- |
| `gamebase` / `gameconfig` / `version` / `chara` / `no` | 元数据对象 |
| `chara:<id>` | 某角色的静态预设对象（只读） |
| `static:<id>:name\|callname\|title`、`static<表名>:<id>:<变量>` | 预设值（只读） |
| `<一维表>`、`<一维表>:<变量名\|序号>` | 整个表 / 单个变量 |
| `<表名>names` / `keys` / `entries` | 名字数组 / 序号数组 / `[名字, 序号]` 数组 |
| `<表名>name:<序号>` | 序号 → 名字（`flagname:0`、`itemname:0`、`jewelname:0`…） |
| `<二维表>:<角色ID>:<变量名\|序号>` | 角色变量 |
| `callname:<A>` / `callname:<A>:<B>` / `callname:<A>:-1` / `-2` | 称呼对象 / A 对 B 的称呼 / 真名 / 旁白称呼 |
| `relation:<A>` / `relation:<A>:<B>` | 好感度 |
| `love:<A>` | 角色 A 对默认角色的爱慕值 |
| `global:code` / `global:version` / `global:saves:<栏位>` | 全局存档特殊项 |
| `item:<名字\|序号>` / `itemprice:` / `itemsales:` / `item:bought` / `itemname:bought` | 道具（一维） |

**别名**：`param` ≡ `palam`，`jewel` ≡ `juel`（`gotjewel` ≡ `gotjuel`）。
名字写错不会报错，只会得到 `undefined` —— 用 `ere_check_game` 检查。

## 格式选择：优先 YAML / JSON，CSV 是旧实现

引擎支持三种静态数据格式，**默认优先级 `yml > json > csv`**（`src/era/const.js` 的
`staticFormatPriority`）—— 只要存在 `yml/` 目录，引擎就优先读它。也可以用 `ere.config.json` 的
`system.static` 显式指定。**不要同时留下多个格式目录**，否则你改的那个可能没被读到。

三者的表达能力差别是**写在代码里**的，不是风格偏好：

| | CSV | JSON / YAML |
|---|---|---|
| 每行几列 | 除 `Chara*.csv`、`Item.csv`、`res/` 外**被截成两列**（`splice(2)`） | 不截断 |
| 能带代码变量名 | ❌ | ✅ `name` |
| 能带变量类型 | ❌ | ✅ `type` |
| 注释 | 只有 `;`（行首/行尾） | YAML 用 `#`；JSON 不支持注释 |

所以：**CSV 只能表达「序号 + 名称」，而 JSON/YAML 每条变量还能带 `name`（代码中使用的变量名）
和 `type`（变量类型）** —— 引擎的【生成开发套件】正是靠这两个字段生成可读的 `era/era-utils/**`；
只有 CSV 时，套件里的变量名只能按表名+序号自动推断（例如 `abl0`），也无法指定类型。

**新游戏建议直接用 YAML**：可以写 `#` 注释，这是 JSON 做不到的。
但用 YAML 时要**保持朴素** —— 引擎的解析器是 `yamljs@^0.3.0`（一个较老的实现），
只用「映射 + 序列 + 标量 + 注释」，不要用锚点/别名/合并键（`&` `*` `<<`）或多行折叠标量。

各格式的条目形状（JSON 与 YAML 同构，键名一致）：

```yaml
# GameBase.yml —— 游戏信息表：键: 值
# 键写显示名（作者 / 游戏名称 / 版本…）或引擎内部名（author / title / version…）**都合法**：
# 引擎把显示名映射成内部名，而内部名原样就是它读取时用的键。json / yml 工程通常直接写内部名。
# 驼峰内部名注意大小写：gameCode 与全小写的 gamecode 都认，GameCode 这种大小写不认。
author: 你
title: Example
version: 0001
gameCode: 100000
```

三个和「版本」有关的字段含义不同，别混：

| 名字 | 在哪 | 含义 |
| --- | --- | --- |
| `version`（版本） | GameBase | 当前游戏版本号 |
| `allowVersion`（最低支持版本） | GameBase | **存档兼容**下限：存档里的版本低于它会被拒绝读取 |
| `.ere-min-version` | 游戏根目录的纯文本文件 | **增量更新**下限：CI 拿它和 GameBase 的 `version` 比较，决定玩家能否只下差异包；与 `allowVersion` 无关 |

```yaml
# Flag.yml —— 一维表：显示名: { id, name?, type? }
我是一个旗标:
  id: 0
  name: my_flag
  type: number
```

```yaml
# Base.yml —— 二维表：结构相同，name 是代码变量名、type 是变量类型
体力:
  id: 0
  name: hp
  type: number
```

```yaml
# Item.yml —— 道具：多一个 price
体力药:
  id: 0
  price: 100
```

```yaml
# Chara0000.yml —— 角色数据表：两列的写成 键: 值，三列的写成一层嵌套
角色编号: 0
姓名: 主角
默认称呼: 你
基础属性:
  体力: 2000
```

> `id` 是每条变量必填的，`name` / `type` 可省。`Chara*.yml` 的嵌套形式对应 CSV 里的三列行
> （`基础属性,体力,2000`）。这些形状由 `src/era/static-file-utils.js` 的 `parseObject` 决定，
> 与 Wiki [#9 静态数据文件](./../../reference/wiki-digest.md) 的 JSON/YAML 示例一致。

## 开发套件（`ere/era-utils/`）

引擎菜单【帮助】-【生成开发套件】会按当前静态数据生成 `ere/era-utils/**`，让游戏代码用对象属性访问数据
（`EraChara.get(id).base.体力`）而不是字符串数据路径。**这个功能你（agent）做不到** —— 它需要游戏已在
引擎里加载、由人点击菜单。

- 工程里**已经有**套件时：直接阅读并使用它，不要另写一套数据访问层；
- 套件是**生成物，不要手改**。`ere_check_game` 会：检测套件并列出它覆盖的表；当生成文件里引用了已不存在的
  表/变量时报「开发套件与当前静态数据不一致」（这是套件过期，**不是你的拼写错误**），并提示让用户在引擎里
  重新生成；当生成文件缺少 `// GENERATED START` / `// GENERATED END` 标记时提示（引擎重新生成会整份覆盖）；
- **4.8.0–4.8.6 生成的套件有表名 bug**：`EraParam`、`EraJewel`、`EraGotjewel` 读写的是
  `era.raw().data['param']` 这类并不存在的表（真名是 `palam` / `juel` / `gotjuel`），数据读写都会落空。
  遇到这种套件（用户反馈数值读写不对、或套件是这几个版本生成的），让他用【生成开发套件】重新生成一次。
  4.7.x 及更早的套件走 `era.get/set`，不受影响；4.8.7 起已修复；
- JSON/YAML 静态数据能带 `name` / `type`，生成的套件可读性好得多，见上面「格式选择」一节。

`res/` 目录下的注册表是另一回事（图片与音频，目前用 CSV），只有 `system.resource`
打开时才生效；细节见 `assets/reference/wiki-digest.md` 的 `#16 多媒体资源处理` 一节。
