# ere 游戏常见错误与陷阱速查

按「症状 → 原因 → 修法」排列。前 12 条是让游戏**加载失败或直接不工作**的硬错误，后面的属于容易写出「看起来能跑但行为不对」的软错误。

写完游戏请用插件的 `ere_check_game` 过一遍：它能自动发现其中大部分问题。

---

## 硬错误：引擎根本加载不了

### 1. 引擎报 `GameBase.csv 不存在! 游戏数据载入失败!`

- **原因**：`csv/GameBase.csv` 缺失（文件名大小写不限，但必须在 `csv/` 根目录）。
- **修法**：创建它，并填齐 7 个必填项：游戏名称、作者、追加信息、发布时间、游戏标识、版本、最低支持版本。

### 2. 引擎报 `静态数据文件夹 (yml / json / csv) 不存在! 游戏数据载入失败!`

- **原因**：游戏根目录下没有 `csv/`（也没有 `json/`、`yml/`）。
- **修法**：建一个 `csv/` 目录放静态数据。注意引擎的格式优先级是 **yml > json > csv**，同时存在多个只会读优先级最高的那个。

### 3. 引擎加载成功但按任意键后什么都没发生

- **原因**：`ere/era-electron.js`（SDK）缺失，或 `ere/main.js` 没有导出函数。
- **修法**：把引擎的 `sdk/era-electron.js` 原样复制到 `ere/`；`main.js` 必须 `module.exports = async () => { ... }`（异步函数）。
- 用 `ere_scaffold_game` 生成的工程自带这两样，可直接对照。

### 4. `require('#/xxx')` 找不到模块

- **原因**：路径写错。`#/` 是引擎提供的别名，指向游戏目录下的 **`ere/`**，不是游戏根目录。
  - `require('#/era-electron')` → `ere/era-electron.js`
  - `require('#/page/home')` → `ere/page/home.js`
- **注意**：文件引用的**大小写必须完全匹配**（Windows 上看似正常、换平台就炸）。
- **修法**：路径首字母别写 `#/` 之外的前缀；用 `ere_check_game` 会自动检查每个 `#/` require 能否解析。

### 5. 用了 ESM 语法（`import` / `export`）

- **原因**：游戏脚本在引擎里按 **CommonJS** 执行（`require` / `module.exports`）。
- **修法**：改成 `const era = require('#/era-electron');` 与 `module.exports = ...`。不要用 `import`、`export`、顶层 `await`。

### 6. `require('fs')`、`require('path')` 等 Node 内置模块

- **原因**：出于安全考虑，引擎禁止游戏脚本引入 Node 内置模块，**唯一例外是 `crypto`**；第三方 npm 包同样不可用。
- **修法**：用引擎自己的 API 完成任务；需要哈希/随机就用 `crypto` 或 `Math.random`。

### 7. 编码不是 UTF-8

- **原因**：Excel 默认把 CSV 存成 GBK/ANSI，中文会乱码或整表读不出来。
- **修法**：存成 **UTF-8** 或 **UTF-8-BOM**（要用 Excel 打开就选带 BOM 的，否则 Excel 里中文乱码）。
- **行尾**：LF / CRLF 都能读，官方例程统一 LF —— 新建文件时保持一致。

### 8. 变量表放错位置

- **原因**：变量数据表（`Flag.csv`、`Base.csv` …）**不能放在 `csv/` 的子文件夹里**。只有角色数据表 `Chara*.csv` 可以放子文件夹（官方例程放在 `csv/Chara/`）。
- **修法**：把变量表挪回 `csv/` 根目录。

### 9. 同时存在 `csv/` 和 `json/`（或 `yml/`）

- **原因**：引擎只读优先级最高的一个（yml > json > csv），你改的那个可能根本没被读。
- **修法**：只保留一种格式；要用别的格式，就在 `ere.config.json` 里显式写 `"system": { "static": "csv" }`。

### 10. CSV 行里的空字段会让后面的列错位

- **症状**：某一列的值跑到了前一列上。例如 `csv/Item.csv` 里写 `10,,2000`，结果道具名变成了 `2000`、价格反而为空。
- **原因**：引擎按半角逗号切分整行后**丢掉空字段**，于是 `10,,2000` 变成 `['10', '2000']` —— 后面的列整体左移一格。4.8.3 起改为「空字段保留为 `undefined`、列不错位」，但**同一份 csv 在旧版本上依然会错位**，所以不能依赖。
- **修法**：**不要留空字段。** 某一列没有内容时，宁可重排表格结构或填一个占位值，也不要靠「留空」表达「没有」。这样在哪个引擎版本上行为都一致。
- **顺带一条（CSV 特有，且是刻意设计）**：除角色数据表 `Chara*.csv`、`Item.csv` 和 `res/` 下的资源表之外，**其他表的每一行只会取前两列**，第 3 列及以后会被引擎直接丢掉。这不是 bug —— CSV 是引擎的旧实现，只能表达「序号 + 名称」；给 `Flag.csv`、`Base.csv` 这类表写第 3 列没有意义。**需要携带代码变量名和变量类型时，请改用 JSON 或 YAML**（每条可以多带 `name` / `type`，引擎的【生成开发套件】正是靠它们生成可读的套件），而且引擎默认就优先读 `yml/`（优先级 `yml > json > csv`）。
- **注意**：整行只有逗号（如 `,,`）会被当作空行忽略。

### 11. 函数声明成了同步的

- **原因**：`era.input`、`era.clear`、`era.waitAnyKey`、`era.printAndWait`、`era.delay`、`era.saveData`、`era.loadData`、`era.rmData`、`era.saveGlobal`、`era.loadGlobal`、`era.resetGlobal`、`era.isLandscape` 全是 **异步**的。
- **修法**：调用处一律 `await`；承载它们的函数必须是 `async`。

### 12. 进入界面时没清屏

- **原因**：`era.clear()` 也是异步的，忘了 `await` 会交叉执行，界面内容错乱。
- **修法**：`await era.clear();` 再开始画。

### 13. 变量序号重复 / 变量名重复

- **原因**：同一个表里两行用了同样的序号或同样的名字。引擎会容错（自动找一个空序号、或让后定义的生效），但**存档会因此错位**。
- **修法**：用 `ere_check_game` 检查重复；改变量表时**不要改已有变量的序号**（序号是存档的索引）。

---

## 软错误：能跑但行为不对

### 14. `era.get('表名:变量名')` 写错表名或变量名

- **症状**：静默返回 `undefined`，随后 `NaN`、`undefined` 拼进字符串，或比较永不成立。
- **原因**：引擎对不认识的变量名**不报错**；`era.add` 遇到非数值还会变出 `NaN`。
- **修法**：表名只有这些（大小写不敏感）：
  - 一维：`flag`、`tflag`、`global`、`love`、`item`、以及自定义扩展表
  - 二维：`base`、`maxbase`、`deltabase`、`abl`、`talent`、`cflag`、`cstr`、`equip`、`mark`、`exp`、`juel`(=`jewel`)、`palam`(=`param`)、`delta`、`gotjuel`、`source`、`stain`、`ex`、`nowex`、`tequip`、`tcvar`、`callname`、`relation`
  - 变量名必须与 `csv/` 里声明的一字不差（中文名也行）。
- **用 `ere_check_game` 检查**：它会把不存在的表名/变量名连同最接近的拼写建议一起报出来。

### 15. `item` 表当成了二维表

- **错误**：`era.get('item:1:媚药')`、`era.add('item:${id}:媚药', -1)` —— 这写法静默无效。
- **正确**：`item` 是**一维**的扁平表，按道具序号或名字访问：
  ```js
  era.get('item:媚药');        // 持有数
  era.set('item:媚药', 3);
  era.get('itemprice:媚药');   // 价格
  era.get('itemsales:媚药');   // 在售
  era.get('itemname:0');       // 序号 → 名字
  ```

### 16. 调教（调教系统）专用表在 `beginTrain` 之前读取

- **症状**：`undefined`。
- **原因**：`tflag`、`tequip`、`tcvar`、`palam`、`delta`、`gotjuel`、`source`、`stain`、`ex`、`nowex`、`deltabase` 这些表只有在 `era.beginTrain(...)` 之后才存在。**只有 `juel`（宝珠）在进入调教前就能用。**
- **修法**：把读写这些表的代码放在调教流程内；或者在 `beginTrain` 之后再做。

### 17. 给 `base` 赋值被「自动修正」

- `base` 的写入会被钳制到 `0 .. maxbase`（当 `maxbase > 0`）。
- 想直接改数值、绕过钳制，用 `era.raw().data.base[id][序号] = v`（`era.raw()` 是运行时注入的、SDK 里没有声明的 API）。

### 18. 角色没 `addCharacter` 就读它的变量

- **症状**：`undefined`。
- **原因**：角色相关的变量表要为每个角色建立子表，只有 `era.addCharacter(id)`（或 `beginTrain`）之后才有。
- **修法**：`era.resetData()` 之后立刻 `era.addCharacter(...)`；写在 `Chara*.csv` 里的预设值只有被添加时才生效。
- `era.addCharacter` 传入**没有 `Chara*.csv` 预设**的 id 不会报错，但该角色没有任何预设数据。

### 19. 存档后没恢复运行时状态

- **原因**：`era.loadData()` 只替换存档数据，不重建你自己维护的运行时状态（例程里的事件队列就是靠 `flag:事件队列` + `init_queue()` 实现的）。
- **修法**：把需要跨存档保留的状态放进 CSV 声明的表里，并在读档成功后重新初始化。

### 20. `era.saveData` 前没先写 `global`

- 存档备注住在 `global` 表：`era.set('global:saves:1', '备注')` 之后必须 `await era.saveGlobal()` 才会写进 `global.sav`。

### 21. 读档被拒绝

- 存档里记了 `code`（游戏标识）与 `version`。改了 `GameBase.csv` 的**游戏标识**，旧存档全部拒绝读取；`version` 低于**最低支持版本**也会被拒绝。
- 因此：`最低支持版本` ≤ `版本`，二者都是纯数字。

### 22. 按钮快捷键冲突

- `era.printButton(content, accelerator)` 的 `accelerator` 就是 `era.input()` 的返回值。**同一屏里快捷键必须唯一**，而且不要和「返回 / 翻页」等保留值撞车。
- 例程里用 `栏位号` 和 `栏位号 + 100` 区分「存档」与「改名」两个动作。

### 23. 忘了 `era.print` 之后要 `era.input()` 才停住

- `era.print*` 只是把内容画出来；`await era.input()` 才等待玩家点击/按键并返回其快捷键。忘记调用就会瞬间刷过整屏。

### 24. 用 `era.waitAnyKey()` 期待「一定停一下」

- 如果上一次 `input` 之后**没有新输出**，它是一个空操作。

### 25. 把界面当成 Vue 写

- 游戏脚本里**不能**写 Vue / Element Plus / DOM。页面就是普通的 `async` 函数：用 `era.print*` 系列输出行，用 `await era.input()` 收输入。排版靠 `width` / `offset`（24 列网格）。

### 26. 中文变量名拿来当对象属性

- 引擎读取数据表后会**把名字存成小写**；需要大写展示时自己 `.toUpperCase()`。
- 变量名用中文完全合法（引擎会做名称/变量名/别名映射），但要注意「字符一字不差」，别写成形近字。

### 27. 误判「引擎做不到实时 / 计时」

- **症状**：想做实时推进 / 计时器 / 倒计时 / 动画 / 自动播放 / 跳过演出 / 帧循环，但判断成「引擎没有定时器、
  `era.input` 是阻塞的，所以做不到」，并**基于这个前提**把设计换成了另一种形态。
- **原因**：把「异步 API 必须 `await`」当成绝对规则，就以为**任何**并发都不可能。实际上引擎支持
  **Promise 多线程**：**不 `await`** 地调用异步 API 再接 `.then()`，逻辑就分两股同时推进
  （官方 wiki 第 17 章「多线程」的原话：「即使其中一个因等待玩家输入而暂停时另一个也可以继续计算」）。
  「没有定时器 API」同样是误判：`era.delay` 就是定时器（`setTimeout` 的 Promise 包装），
  而 `setTimeout` / `setInterval` / `Promise` 在游戏脚本里本来就能直接用。
- ⚠️ **但这不等于「必须做实时」。** 回合制、按步推进、用资源压力替代手速，都是完全正当的设计 ——
  很多玩法就该这么做，跟能不能做实时无关。这条要防的只是**拿一个错误的技术前提去否决设计**；
  如果你清楚实时可行、经过权衡仍然选择回合制，那是设计决定，不是踩坑。**不要在读完这条后反过来硬上实时。**
- **正确做法**（完整骨架见 `systems.md` 的「实时循环、计时与演出」一节）：
  - **帧时钟** = `await era.delay(150)` 放在 `while` 循环里；150–200ms 一帧（5～7 FPS）对按格推进的玩法足够；
  - **输入监听** = 不 `await` 的 `era.input({ any: true, hideInput: true })` —— 它在**敲下第一个字符时立刻返回那个字符**，所以用 WASD 这类字符键（**没有方向键 API**，输入是文本框，只有 Enter 提交）；
  - **原地重绘** = `era.replaceInColRows([...])`，画面才是「刷新」而不是不断追加新行。
- **两个坑**：不要用 `Promise.race([input, delay])` 做节拍（输掉的那次 `input` 永不 resolve，会积累野监听）；每帧重发同一按钮要加 `config: { disableWarning: true }`。
- **下「做不到」这种结论之前先查**：`era.delay` 是公开 API（SDK 自带实现，`_s = true` 让引擎不覆盖），不是内部工具；具体做法在 `systems.md` 的「实时循环、计时与演出」和 wiki-digest §10。

### 28. 网格对象少写 `type`，被引擎静默丢弃

- **症状**：`era.printMultiColumns([...])` 里的某一项、或 `era.printInColRows(...)` 某一列里的某一项**完全不显示**，控制台没有任何提示。
- **原因**：引擎按 `type !== undefined` 过滤元素，而且过滤是**静默**的，有两个地方：
  - `printInColRows` / `replaceInColRows` → `era-api-base.js` 的 `inColRows` 过滤 `ColumnObject.columns` 里的元素；
  - `printMultiColumns` → `era-api.js` 过滤传入数组的顶层元素。
  合法值：`'text'`、`'button'`、`'image'`、`'image.whole'`、`'progress'`、`'divider'`。
- **修法**：每个网格对象都显式写上 `type`；用 `ere_check_game` 兜底（它会检查这类调用里的对象字面量）。
- **顺带一个易混点**：`ColumnObject` 自己是 `{ columns: [...], config? }`，**没有也不需要 `type`** ——
  给外层加 `type` 不起作用，外层有 `type` 也不代表内层可以省。

### 29. `.kojo` 写错了却什么都不报

- **症状**：某段口上不出现、某个按钮变成了普通文本、或者屏幕上突然打印出一串 `{"ac":0,...}` 这样的 JSON。
- **原因**：`.kojo` 的错误几乎都是**静默**的 —— 引擎不抛异常，只在 YAML 语法层面记一条日志：
  - YAML 语法错误（尤其 **Tab 缩进**）→ 日志一条后继续加载，**该文件所有口上消失**；
  - 顶层值既不是条目数组、也没有数组型的 `lines` → **整个函数不会生成**；
  - 条目下多写一个 `- `、写成嵌套数组（`- - content: …`）→ `parse-kojo.js` 对首元素既非按钮也非 `random: true` 的数组**不生成任何语句**，**整条静默消失**（注意与下一条区分：只有标量条目才走 JSON 兜底）；
  - 条目里没有任何 kojo 认识的键（`lineUp` / `divider` / `acc` / `random` / `lines` / `content` / `if` / `comment` / `key`，**区分大小写**）→ 异步口上会**把该条目的 JSON 当台词打印**，同步口上则什么都不输出；
  - 键名近似拼错（`ac`、`devider`、`lineup`、`randon`）→ 同上；
  - 同一按钮组里 `acc` 重复 → 引擎自动递增找空位，**你写的快捷键被静默改掉**；
  - `random: true` 没写 `lines` → 空体；
  - `if` 里含 `module` / `require` → 条件被**静默删除**。
  - 字典键**用错位置**（引擎只替换正文、按钮文字、`comment`，以及**带 `content` 条目的整行 `color`**）：分段文本的 `color`、分割线的 `content`/`color`、任何配置字段（`fontSize` / `align` / `title` …）里的 `%KEY%` 都**不会被替换**，会原样打印或直接失效；按钮（`acc`）条目上除 `content` / `lines` / `if` / `comment` / `key` 之外的键（`color`、`title` …）也**不会传给 `printButton`**，一律无效。
- **修法**：都用 `ere_check_game` 兜底 —— 它会用**引擎同款 yamljs** 解析并按上面这些规则报错。只有 `.kojo`、没有游戏工程时用 `ere_check_kojo`（同一个校验器，另加字典占位符清单与「用错位置」的检查）。
- **看不到效果时**：静态检查只证明「能跑」。要实机看排版 / 颜色 / 按钮，用作者测试工程 [kojo-test](https://gitgud.io/umaera/game/kojo-test)：把 `.kojo` 内容贴进它的 `ere/test.kojo`，引擎里打开该目录即可。注意它的 `ere/main.js` 传的是**空字典**，占位符会原样显示、`%COLOR%` 不生效 —— 那是测试工程现状，不是口上写错。
- 要把现有 JS 口上改造成 `.kojo`（机制留 JS、输出点换成篇目函数），见 `assets/reference/i18n.md` 的「接驳配方」。
- **引擎从 4.8.5 起也会校验 `.kojo`**：构建期与运行期各一次，**只报告、不中断加载**，报的正是上面这些写法
  （acc 重复、键名拼写错误、`random` 缺 `lines`、`if` 含 `module`/`require`，另有**顶层篇目重名**与
  **按钮缺 `content`**）。所以这些写法不再是完全静默的 —— 但引擎只报告、**不会拦住你**。
  `ere_check_game` 与它互补：**不依赖构建、不启动游戏**就能跑，并且把确定性问题报成 error（可以卡 CI）。

### 30. 不要「优化」枚举的写法（WebStorm 类型检查）

- **现象**：例程与参考实现里的枚举长这样 —— 先写对象字面量，再用 `forEach` 把值覆盖成顺序号：

  ```javascript
  const hooks = { talk: 0 };
  Object.keys(hooks).forEach((e, i) => (hooks[e] = i)); // 覆盖成 0..n-1
  hooks.keys = Object.keys(hooks);                      // 派生的名字数组，不会漂移
  ```

- **看着冗余，但这是必需的**：改成「名字数组 → 生成枚举对象」会让 **WebStorm 无法正确识别枚举里的成员**
  （既有约束）。这是为 IDE 类型推断明知代价仍然要付的交易。
- **可以做的**：加注释说明「后面的枚举数值没有语义，全填 0 也一样，实际值由 `forEach` 赋成顺序号」，
  免得读者以为数字有含义。
- **通用教训**：例程里看着笨拙的写法，背后可能有工具链约束 —— **确认理由之前不要"优化"它**。

### 31. 给翻译库加 `static _`，覆盖字段会静默失效

- **背景**：多语言参考实现里，**基底库**的辅助类用 `static _ = new X()` 暴露一个共享实例
  （避免每个语言包实例化时都重新构造一次，见 `assets/reference/i18n.md`）。
  **翻译库不定义 `static _`**，而是 `new (require('#/i18n/<语言>/x'))()` 直接实例化自己的类。
- **什么时候会踩**：如果你给某个**翻译库**也加上 `static _`，又让别的类去 `extends` 它
  （例如「第三门语言继承第二门」），那么 `Sub._` 会沿构造器原型链解析到**被继承者**的实例 ——
  子类覆盖的字段完全没生效，而且**不报错**，只是那门语言静默变回上一层的文案。
- **修法**：需要子类覆盖后的实例时用 `new Sub()`；`._` 只用于基底库那一份共享实例。
- 相关：多语言的完整机制见 `assets/reference/i18n.md`。

---

## 交付前自检清单

1. `ere_check_game` 返回 `ok: true`（errors 为 0）。
2. `csv/GameBase.csv` 的 7 个必填项齐全，`版本` ≥ `最低支持版本`。
3. `ere/era-electron.js` 存在，且和当前使用的引擎版本匹配。
4. 每个 `#/` require 都能解析到真实文件，大小写一致。
5. 所有异步 API 都被 `await`。
6. 每个界面都从 `await era.clear()` 开始，且每个按钮的快捷键唯一。
7. 所有 `era.get/set/add` 的表名与变量名都能在 `csv/` 或内置表里找到。
8. 用引擎实际打开一次：加载 → 按任意键 → 玩到「开始游戏 → 存档 → 读档 → 回标题」这条主路径。
9. `csv/` 里没有空字段；除 `Chara*.csv`、`Item.csv`、`res/` 外，每行不超过两列。
