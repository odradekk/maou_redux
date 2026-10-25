# 变量读写用引擎生成的开发套件，按表分组

决定见 #820，迁移工单挂在路线图 #813 下。本 ADR 取代 [ADR-0001](./0001-engine-tables-as-single-source-of-truth.md) 中「所有读写经门面、门面按玩法域分组」的部分，并废止 [ADR-0002](./0002-region-ownership-from-measurement.md) 和依附于它的 [ADR-0007](./0007-stateless-cross-domain-modules.md)。

## 问题

同一个变量现在有三种写法：数字地址 `era.get('flag:81')`、扁平访问器 `era_flag.human_realm_invasion`、按域分组的门面 `game.system.人间界侵攻度`。2026-10-21 的审查统计到 23,116 处数字地址，按名字寻址的只有 46 处；cflag 里已有门面名的序号仍有 2,301 处直接写数字。门面的名字只写在 `tools/facade-names.js` 里，引擎的名字表、按名寻址和开发套件生成器都读不到。

ere 官方给了两种写法（`dev-guides/E-erauma-train.md`）：官方例程按名字拼字符串，ereKanon 用引擎【帮助】-【生成开发套件】产出的访问器。`dev-guides/18-tools.md` 把开发套件作为引擎对「字符串拼接容易拼错、序号满天飞」的解决办法。

## 决定

变量读写统一用引擎生成的开发套件。

- **yml**：每个变量写「中文键 + `name` + `type`」，`name` 用英文 snake_case（例如 `level`、`cur_chara`）。名字只在 yml 里写一份。
- **`ere/era-utils/`**：只放引擎生成的文件，不手改，也不放手写文件。yml 改了以后在引擎里重新生成；生成器只替换 `// GENERATED START/END` 之间的内容。
- **一维表**：`era_flag.<name>`、`era_global.<name>`、`era_tflag.<name>`，自定义一维表是 `era_<表>.<name>`。
- **角色表**：`EraChara.get(id).<表>.<name>`，例如 `EraChara.get(34).cflag.level`；称呼和好感用 EraChara 自带的方法。
- **道具**：`era_item.<name>.count / price / sales`。
- **动态下标**（循环变量、算出来的序号）：用访问器的 `get(param)` / `set(param, val)` / `add(param, val)`。
- **仍直接调用 `era.get`**：只剩开发套件不覆盖的数据路径，即元数据（`gamebase`、`chara:<id>` 等）和名字表（`<表>names`、`<表>name:<序号>` 等）。

门面（`ere/facade/`、`tools/gen-facade.js`、`tools/facade-names.js`）和自建的生成器 `tools/gen-wrapper.js` 在迁移完成后删除。

ADR-0001 里另外两条继续有效：引擎变量表是唯一真相源，不另建并行的 JS 对象模型；二次开发的新字段放进自定义扩展表。

## 为什么按表分组，不按域分组

ADR-0001 按域分组，是为了让跨域写在调用处显眼，好由 ADR-0002 的检查器抓出来。开发套件由引擎按表生成，没有域的概念。要在生成代码上重建域检查，就得维护一套从属性到表、到序号区段、再到域的映射，等于把 `ownership/` 和门面换个形式留下来。官方规范里没有这层约束，本项目也已经与原作分离（ADR-0008），所以跨域写检查不再保留，模块边界交给目录分层：`system/` 按域分子目录，`page/` 只放界面。

## 后果

- **读到不存在的数据时直接报错**：开发套件的具名属性直接读写 `era.raw().data`，不经过 `era.get / era.set`。读没加入的角色、在调教期之外读调教表，会抛 TypeError；现在的写法是静默返回 undefined。迁移时要逐处确认这些读法。
- **用到的序号必须先登记**：具名属性没有 `|| 0`。登记过的序号由引擎在 `addCharacter` 和读档时初始化为预设值或 0，所以每个用到的序号都要在 yml 登记。登记后旧存档读档时会被补成预设值或 0，按 ADR-0006 逐个确认。
- **base 写入仍会钳位**：生成的 base 访问器按 maxbase 钳位，和 `era.set` 一致；其余表本来就没有钳位。
- **测试夹具要支持 `raw()`**：夹具要提供结构与引擎相同的 `raw()`，并按 ADR-0005 用引擎比对。
- **生成要人操作**：开发套件只能由人在引擎界面上点菜单生成，改了 yml 要记得重新生成。`ere_check_game` 会报告开发套件与静态数据不一致。
- **删除的工具**：`tools/domain-check.mjs`、`tools/domain-ledger.mjs` 和对应测试随 #904 删除；`ownership/` 随门面在 #832 删除。文档里依赖区段所有权的说法（例如 CONTEXT.md 的「无域状态模块」）一并删除或改写。
