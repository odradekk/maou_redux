# dsh-ere-game-builder v1.3.2
_2026/10/19_

## Added

* **引擎的版本政策**：自 5.0.0 起引擎版本号遵循 semver，5.x 内 `era.*` 表面、静态数据格式、`.kojo`、存档与
  构建门槛都保持向后兼容，破坏性变更进入下一个主版本。API 摘要与 wiki 摘要都写进了这条 —— 作者据此知道
  `version.sdk` 是**最低引擎版本**，同一份声明在 5.x 上一直有效，不需要每见一个引擎小版本就跟着改。
* **安卓版引擎（ere.app）的版本关系**：它和 PC 版是两条独立的版本序列，每次发布合并一段 PC 改动并以某个
  PC 版本为**基线**；游戏门槛仍由 `version.sdk` 声明，安卓侧用源码常量 `desktopVersion` 作为「等效 PC
  版本」比较（报错里的「当前引擎等效版本」）。完整的「PC 版本 ↔ ere.app 版本」对照表在引擎仓库的
  `COMPATIBILITY.md`，wiki 的 `19-android` 与 wiki 摘要都指向它。

## Fixed

* 同步引擎 **5.0.0**（`sdk/era-electron.js` 逐字节未变，`version.sdk` 仍为 `4.8.5`，最低引擎版本不变）：
  修复未启用【禁止清屏】时同一位置的进度条微动效果丢失。知识库里的引擎版本标记推进到 5.0.0。

# dsh-ere-game-builder v1.3.1
_2026/10/17_

## Fixed

* 同步引擎 **4.8.7**（`sdk/era-electron.js` 逐字节未变，`version.sdk` 仍为 `4.8.5`，最低引擎版本不变）：
  引擎修好了开发套件生成器的表名错误 —— 该生成器在 **4.8.0** 改成直接读写 `era.raw().data[...]`（更快，
  但把 `param` / `jewel` / `gotjewel` 当成了表名，真名是 `palam` / `juel` / `gotjuel`）。所以
  **4.8.0–4.8.6 生成的套件里 `EraParam` / `EraJewel` / `EraGotjewel` 读写都会落空；4.7.x 及更早的套件
  走 `era.get/set`，不受影响**。技能与 wiki 摘要都写明了这条，处置就是让用户重新生成一次。

# dsh-ere-game-builder v1.3.0
_2026/10/16_

## Added

* **官方例程改为按需获取**：插件不再打包 `ere-example`，也不再维护逐文件的说明（原文那一份是 1954 行）。
  开始一个工程时会问开发者「以例程为起点，还是用最小模板（`ere_scaffold_game`）」；写**调教（训练）系统**时
  会问一次要不要参考例程（其余系统的参考实现，技能的 `systems.md` 已经够用）。例程自己的 `AGENTS.md` 是
  「系统 → 文件 → 读取顺序」的地图，**它的存在也是「这份副本是否最新」的标记**；插件按地图读，不自己扫描
  总结。从例程抄代码等于继承它的**字符串路径**写法（`era.get('flag:当前角色')`）—— 开发套件
  （`ere/era-utils`）才是高效写法，迁移是一笔额外的 token，由开发者决定。

## Changed

* **参考资料检索省下约三分之一**（`ere_search_reference`）：片段从固定 12 行改为按命中取 2+3 行、命中表格时
  自动带上表头、相邻命中合并成一段、同一小节最多两条、已经有完整成员块的 API 不再重复它的签名表行。
  8 个代表性查询合计 39918 → 26815 字符；同段代码被逐行命中 5 次的情况从 2749 降到 511。
* **检查器输出不再被重复项淹没**：同一条规则命中 ≥4 次合并成一行并给出几处行号，单次输出的行数封顶；
  120 条的 `.kojo` 报告 11845 → 743 字符，干净工程一个字符不变。
* **常驻说明瘦身**：工具 schema 3479 → 3152 字符，三个技能的路由描述 1352 → 1134，合计每轮约省 350–500 tokens；
  删的是同义反复与工作流叙述，参数、默认值与检查项一个没删。
* **API 问题一律走工具**：技能脚注不再建议直接读 `api-index.json`（5 万字符的机器索引），`api-digest.md`
  也不再被建议整篇读 —— 单个 API 用 `ere_api_lookup`，语义与坑点用 `ere_search_reference`。
* **`systems.md` 加了小节索引**：1900 行的参考实现文件开头有「小节 → 行号」表，按小节读而不是整篇读。
* **维护者流程移出公开仓库**：发布/tag 约定、隐私闸门说明与扫描脚本都不再随插件分发；README 只留「怎么用」
  与「引擎升级后怎么同步知识库」。

## Fixed

* 同步引擎 **4.8.6**（`sdk/era-electron.js` 逐字节未变，`version.sdk` 仍为 `4.8.5`，最低引擎版本不变）：
  `window.limit` 在 4.8.6 之前开启禁止清屏时不生效、`printMultiColumns` 的 `gutter` 在 4.8.6 之前会画出
  横向滚动条 —— 两条都写进了 API 摘要的版本注记，wiki 的 `03-config.md` 与更新记录同步补上。
* 自检新增三组守卫：**shipped 文档里的链接必须落在 bundle 内或指向公开地址**（此前有 148 条指向作者工作区的
  链接，对读者全是死链）、**技能脚注不得再引导去读机器索引**、**`systems.md` 的索引行号必须落在真实标题上**。

# dsh-ere-game-builder v1.2.0
_2026/10/12_

## Added

* 同步引擎 **4.8.5**：内置 SDK 更新为 `version.sdk = '4.8.5'` —— **最低引擎版本随之从 4.8.4 提高到 4.8.5**，
  API 索引与速查表一并重新生成
* `.kojo` 校验补上引擎 4.8.5 清单里的两项：**顶层篇目重名**（yamljs 会静默合并同名键，前一段整段消失）
  与**按钮缺 `content`**（会渲染成没有文字的按钮）
* 知识库补充引擎 4.8.5 的两条构建期行为：`ere-webpack-plugin` **拒绝加载内置/三方模块**；且要求 `ere/` 下的
  SDK **不低于 4.8.5**，否则构建失败
* **新增工具 `ere_check_kojo`**：面向口上作者的 `.kojo` 校验入口，`path` 传单个文件或目录即可，**不需要游戏工程**
  （不需要 `csv/`、`ere/`、SDK，也不构建、不启动引擎）。除结构校验外，它按篇目列出用到的字典键（`%CHARA%` …），
  并报出**永远不会被字典替换**的位置：分段文本的 `color`、分割线的 `content`/`color`，以及按钮条目上
  `printButton` 根本收不到的键（`color` / `title` / `fontSize` …）；`if` 里通过 `d['…']` 取用的键也单独列出
* 新增结构校验：**嵌套数组条目**（条目下多写一个 `- `，`- - content: …`）。`parse-kojo.js` 对首元素既非按钮
  也非 `random: true` 的数组**不生成任何语句**，整条静默消失

## Changed

* **修正一条错的结论**：嵌套数组条目原先被报成「引擎会把它 JSON 序列化后当台词打印」——实际上只有标量条目
  才走 JSON 兜底，数组条目整条不生成代码。现在两种形状分开报（数组 = error，标量 = warning）
* **修正 SDK 识别**：原先要求 SDK 里有 `const era = {`（带空格），压缩过或手工裁剪过的 SDK（如 kojo-test 里
  那份 `const era={…}`）会被误报成「找不到引擎 SDK」。改为按引擎真正的契约识别
  （`module.exports = era;` 且导出 `version.sdk`）
* **修正 BOM 处理**：`.kojo` 允许 UTF-8 BOM，但按原始文本定位行号时，第 1 行的 BOM（`\uFEFF`，会被 `\s`
  匹配）会让第一行顶层篇目「隐形」—— 行号变成 0，且它的**重名检测直接失效**。现在入口处先去 BOM
* **修正 `ere_check_game` 的输出**：`sdkFile` / `staticFormat` 为 `undefined` 时整个工具会以
  「returned invalid output: value is not lossless JSON」失败，检查结果一个字都看不到；现在缺失时给 `null`
* `ere_check_game` 与 `ere_check_kojo` **统一到同一个检查器**：两者共用 `lib/kojo.js` 的 `auditKojo`
  （结构校验 + 字典占位符审计）。原先 `ere_check_game` 只跑结构部分，现在工程检查同样会报出「`%KEY%`
  放在引擎不会替换的位置」与「按钮上 `printButton` 收不到的键」，与 `ere_check_kojo` 不再有功能差集
* `ere_check_kojo` 的报告末尾**固定提醒实机检查**，并给出作者测试工程
  [kojo-test](https://gitgud.io/umaera/game/kojo-test) 的使用步骤与「它传空字典、占位符会原样显示」的注意事项；
  README、`ere-game-development` 技能与 `pitfalls.md` 同步记录该地址
* `scripts/selftest.mjs` 新增 **rule parity** 一节：把 `kojo-loader` 4.8.5 `validate-kojo.js` 的 8 条规则
  逐条固化为 fixture，确保插件这份**独立实现**不漏报引擎会报的任何一条（引擎加规则时在那里补 fixture）
* `.kojo` 相关文档说明：引擎 4.8.5 起**构建期与运行期也会校验**（只报告、不中断加载），并写明它与
  `ere_check_game` 的分工（后者不依赖构建、不启动游戏，且把确定性问题报成 error）

# dsh-ere-game-builder v1.1.0
_2026/10/8_

## Added

* 新增多语言（i18n）参考实现文档 `assets/reference/i18n.md`：selector 取词协议、`static _` 单例的用途与用法、
  文案的四种形态（字符串 / 占位符 / 与引擎数据位置对齐的数组 / 组合打印参数的函数）、`.kojo` 接驳配方、
  两个标题界面按钮与语言库完整性检查
* `ere_search_reference` 的文档过滤项从 4 个增至 5 个（新增 `i18n`）
* 陷阱速查新增两条：WebStorm 枚举写法不要「优化」、给翻译库加 `static _` 会让覆盖失效
* 新增本版本日志 `RELEASE.md`
* `ere-game-development` 技能新增「发布前自查：未使用文件」：推荐用 `unimported`（含配置示例），
  并要求**正式发布前提醒用户跑一次**；若它把 `ere/era-utils/**` 报成未使用，**询问用户是否加进 `ignorePatterns`**
* 同步引擎 **4.8.4**：内置 SDK 更新为 `version.sdk = '4.8.4'` —— **最低引擎版本随之从 4.8.2 提高到 4.8.4**，
  API 索引与速查表一并重新生成（66 个成员 / 16 个 typedef）
* `ProgressConfig` 新增 `duration`（缓动时长，秒，默认 0.6，**设为 0 关闭缓动**，适用于按帧渲染）与
  `easing`（CSS 缓动函数，默认 `'ease'`）
* `PrintedSpan` 补上引擎实际支持的 `opacity` / `textAlignLast` / `textShadow`（上游 SDK 的 JSDoc 已补齐，
  本插件重新提取后自动同步）
* 速查表里按钮 `width` 的默认值由 1 更正为 **24**（随 SDK 的 JSDoc 更正）

## Fixed

* 修复 GameBase 字段只认显示名、不认引擎内部名（`gameCode` 等）的问题 —— json / yml 工程正常写内部名，
  原先会被报成 7 个错误；同时修复「建议写成它自己」（`gameCode` → 「是否想写 gameCode」）
* 修复开发套件被误判为「过期」的问题：生成文件里对调教专用表（`delta:` 等）的读取是 `info` 级提示，
  只有 `error` 级才算套件过期
* 修复 `ere/jsconfig.json` 的检查过严的问题：放在游戏根目录同样有效
* 修复 `.ere-min-version` 的比较对象：它与 GameBase 的 `version`（增量更新下限）相关，与 `allowVersion` 无关

## Changed

* `README.md` 补充「静默失效项」检查清单与知识库说明
* 知识库：`i18n.md` 补充表变量名的两种来源、基底库表名语言的前提与决策表，以及 `era*Names` 为何不需要单例；
  `ere-data-files` 技能补充 GameBase 键名规则与三个「版本」字段的区别
* 知识库：`i18n.md` 的「表变量名从哪来」改为**先问、再定** —— 生成前先问用户（数据语言 / 基底库语言 /
  是否用开发套件）；数据语言与基底库语言相同且用户选择用套件、但工程里没有套件时，**请用户生成开发套件**
* `era.playMusic` 的 `fadeInternal`：注明 **4.8.4 起才生效**（此前该参数无效）
* 版本元信息同步到 4.8.4：README 兼容表、`NOTICE.md`、`package.json` 的 `ere` 字段、`systems.md` 的对齐说明

# dsh-ere-game-builder v1.0.0
_2026/10/5_

## Added

* 四个工具：`ere_scaffold_game`（生成可直接运行的最小 ere 工程）、`ere_check_game`（静态检查）、
  `ere_search_reference`（知识库检索）、`ere_api_lookup`（精确查 `era.*` 的签名与 config 字段）
* 三个技能：`ere-game-development`、`ere-data-files`、`ere-engine-api`
* 知识库：引擎 Wiki 摘要、源码级 API 摘要、官方例程逐文件参考、陷阱速查，以及从 SDK 的 JSDoc
  机器提取的 API 索引
* 静态数据支持 **csv / json / yml** 三种格式，与引擎的目录优先级一致
* **`.kojo` 口上校验**：用引擎同款 yamljs 解析 YAML 并校验结构 —— 顶层形状、没有识别键的条目、
  键名近似拼错、同一按钮组里 `acc` 重复、`random` 缺 `lines`、`if` 含 `module`/`require` 被过滤删除
* **网格对象缺 `type` 的检查**：`printInColRows` / `replaceInColRows` / `printMultiColumns` 里少写 `type`
  的元素会被引擎按 `type !== undefined` 静默丢弃，报为 **error**
* **开发套件感知**：识别 `ere/era-utils`、列出它覆盖的表、报出套件过期（生成文件引用了已不存在的变量）
  与缺失 `GENERATED` 标记
* `package.json` 的 `ere` 字段：声明最低引擎版本与知识库参考的引擎版本

## Fixed

* 修复 yml / json 工程无法检查（工具会以 `value is not lossless JSON` 失败）的问题
* 修复角色 `id` / `name` / `callname` 缺失时工具结果无法序列化的问题
* 修复静态数据解析失败引发的连锁误报（把「解析失败」当成「变量不存在」）
* 修正 `ColumnObject` 的形状描述：是 `{ columns, config? }`，**不带** `type`
* 修正 `version.sdk` 的语义说明：它是**最低引擎版本**，不是 SDK 自身的版本号

## Changed

* 内置 SDK 同步到引擎 4.8.3 所提供的版本
