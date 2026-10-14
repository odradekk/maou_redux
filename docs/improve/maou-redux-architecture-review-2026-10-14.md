# 魔王 Redux 架构审阅报告

**仓库：** `odradekk/maou_redux`（私有）  
**基准：** `master` · `7936b1621e2aed35c8188c7dbd66fca6529ea03a`  
**基准提交时间：** 2026-10-10 06:13:05 UTC  
**报告日期：** 2026-10-14  
**方法：** Matt Pocock 的 `improve-codebase-architecture`，结合其 `codebase-design`、`DEEPENING` 与 HTML 报告约定。  
**性质：** 只读架构评估；未修改仓库、未创建 Issue/PR，未在本次环境运行游戏或测试。

## 一、结论

**不建议推倒重写。最有价值的改进，是把跨文件的操作顺序、角色归属和编号规则收进少数 module 的 implementation，而不是继续增加薄的转发 module。**

仓库已有值得保留的结构：主循环与事件链分工明确，变量表有唯一真相源，角色门面不缓存状态值，跨域写有检查器约束，真实引擎与独立夹具之间也已有契约比对。这不是一个需要从零建立架构纪律的项目。[S05] [S06] [S11] [S12] [S25]

但是，部分高风险操作的 interface 仍包含大量隐含知识：调用者必须知道哪个全局指针表示什么、什么时候还能读调教期表、什么时候才能删除角色、一个编号应在哪张表取名字。近期修复与当前代码共同表明，这些知识仍分散在调用者之间。[S13] [S14] [S15] [S18] [S19] [S26]

**第一项建议：深化现有调教收尾 module。** 已有 `run_aftertrain` 入口和真实引擎回归，范围比全局角色生命周期小，能够直接检验“调用者需要记住的规则是否减少”。这里的目标是降低再次破坏顺序的概率，不是把已经修好的死亡崩溃重新报成现存缺陷。[S13] [S26] [S29]

### 优先级

| 顺序 | 候选 | 建议强度 | 优先级 | 初始范围 |
| --- | --- | --- | --- | --- |
| 1 | 收拢调教收尾的生命周期责任 | **Strong** | P1 | `run_aftertrain` 与 `EVENTEND` 的收尾协议 |
| 2 | 集中角色除名的共同规则 | **Strong** | P1，接续第 1 项 | 先处理出售与处刑的共同机械步骤 |
| 3 | 集中指令身份与名称规则 | **Worth exploring** | P2 | 指令菜单、上次指令名与已有取名 module |
| 4 | 收拢多角色结算的归属规则 | **Worth exploring** | P2 | COM64 / COM66，保留已抽出的计量槽结算 |
| 5 | 合并真实引擎测试环境的重复装配 | **Worth exploring** | P3，按改动需要提前 | 两个已确认重复装配的测试文件 |

P1/P2/P3 表示建议实施次序，**不是缺陷严重级别**。Strong 表示已有明确的跨文件协议和代码证据；Worth exploring 表示摩擦已存在，但合并范围、净收益还需在设计阶段验证。这里没有把任何候选判为“当前必然出错”。

## 二、审阅范围与证据边界

本次通过 GitHub 连接读取仓库内容。先阅读项目说明、术语、骨架与相关 ADR，再查看最近 50 条提交记录，并沿近期修复向当前代码、调用者和测试追踪。最近提交样本覆盖 2026-10-06 至 2026-10-10；其中包含合并提交，**不能据此计算独立缺陷数或声称得到全库 churn 排名**。[S01] [S02] [S03] [S04] [S29]

核心代码读取包括入口、主循环、事件注册表、调教循环、调教结束事件、出售与处刑公共逻辑、计量槽结算、助手指令的相关区段、指令菜单和取名 module。测试读取包括夹具前部、已有逐步契约比对，以及死亡收尾和角色重复创建的真实引擎回归。证据索引注明了局部读取与搜索片段，未把它们写成全文审阅。

本次**没有**完整克隆后做全库依赖图、循环依赖检测、代码行数统计、覆盖率统计、变异测试或性能测试；没有运行 `npm test`、静态检查或 Electron GUI。因此，本文是“基于当前代码和历史修复的架构深查”，不是可执行验收报告，也不是穷尽式缺陷清单。

报告中对测试的表述是“源码已有这些断言”，而不是“本次运行通过”。历史提交里的通过数量也不作为当前测试规模或当前 CI 结论使用。

## 三、如何使用该技能评估本仓库

本报告沿用技能的术语：**module** 是对外隐藏实现的代码单元；**interface** 不仅包含可调用入口，也包含调用顺序、参数前提和必须理解的隐含状态；**implementation** 是可以在 module 内部改变的实现。

**depth** 衡量一个较小 interface 隐藏了多少有效复杂性；**leverage** 指一次规则修改能惠及多少调用者；**locality** 指理解和修改一个行为时，知识是否集中在少数位置。**seam** 是可以替换依赖进行验证的位置；**adapter** 是该位置的一种具体实现。

因此：

- 一个只有二十来行的计量槽 module 也可能是 **deep**：它隐藏了引擎立即封顶、严格阈值和余量处理。[S17]
- 一串名字清晰的调用仍可能整体偏 **shallow**：调用者必须自行决定先结算、再清表、最后除名，并理解指针哨兵值。[S13] [S14]
- 引擎规定的入口 `main.js` 即使只是委托，也不是本次应该删除的“坏抽象”；它承担启动契约。[S10]
- 文件大、函数多、中文字段多，不单独构成重构理由；必须证明集中后有规则从调用者的 interface 中消失。

本次五项均标为 **local-substitutable**：它们依赖本地引擎状态或装配，且已有可替换的夹具；内部纯计算属于 **in-process**，但整个操作不是纯函数。不需要新增远程 ports & adapters，也没有必须用网络 mock 才能验证的依赖。[S24] [S26]

## 四、必须保留的结构与约束

### 4.1 唯一真相源与存档语义

`chara(cid)` 的门面只持角色 ID，不另存角色状态；实际值来自引擎变量表。另建一套 JS 领域状态对象再与表同步，会违背 ADR-0001。可以集中行为，不能顺便引入第二套持久状态。[S05]

**ADR-0006 的文件标题已不能代表当前政策。** 文末 2026-10-03 的“玩家存档保护”取代了早期废档政策：最低支持版本固定在 1000（0.1.0）；先避开破坏性改动，避不开则用读档后的 `era.get('version')` 编写并测试迁移；提高最低支持版本需要用户单独决定。[S08]

这些候选默认不改变存档编号、字段含义或表结构。尤其不能为一次架构清理随意新增角色扩展表：ADR-0001 记录了旧档角色数据桶的引擎限制；已有扩展表的新字段也必须正确处理缺值。[S05] [S08]

### 4.2 事件链与分发族不能合并成一种机制

事件链按三档优先级、同档注册顺序执行所有处理器；`BeginSignal` 只结束当前处理器，整个事件链继续，最后一次转场生效。分发族则是一个编号选中一个实现，并区分“空间内缺失”和“空间外错误”。这两种语义不应为了“统一”而抹平。[S04] [S12]

### 4.3 现有测试 seam 是资产

已有 `create_era_fixture` 在 SDK 处提供替换，另有真实引擎代码与夹具的逐步比对。生产实现与测试实现已经给这个 seam 提供了实际理由，无需为每个函数再新增依赖注入入口。[S24] [S25]

夹具仍须能在无引擎环境运行。真实引擎缺失与引擎结构漂移不能混为一谈：前者可按既定规则跳过，后者应失败。渲染源码锚点也不等于实际 GUI 验收。[S07]

### 4.4 跨域写约束继续生效

角色除名同时涉及角色、事件、队伍等状态，不意味着应制造一个新的“公共区”或改成裸字符串跨域写。重构后的 implementation 仍需经既有属主的具名写入口，并接受现有所有权检查。[S06] [S09]

## 五、候选 01：收拢调教收尾的生命周期责任

**Strong · P1 · local-substitutable**  
**文件：** `ere/system/train/train-loop.js`、`ere/event/event-end.js`；验证面为 `test/train-end-engine.test.js`。[S13] [S14] [S26]

### 现状与证据

`run_aftertrain` 保存 `target_backup`，等待完整 `EVENTEND`，执行 `era.endTrain()`，最后根据 `target !== 0 && era_flag.target === -1` 决定删除原目标并重建称呼。[S13]

死亡判定和准备动作却在另一个 module：`event-end.js` 登记除名、清空目标与助手指针、从队伍移除目标、清零目标的待结算珠，再发起转场。引擎层的实际角色删除则被留给外层收尾。[S14]

这段顺序已经被修正，并有真实引擎回归。问题不再是“现在先删角色导致崩溃”，而是**一个完整生命周期的含义仍需跨两个 module，通过可变全局指针间接传递**。[S26] [S29]

```text
当前（已修复）
run_aftertrain → EVENTEND 完整事件链 → endTrain → 由指针哨兵判断除名
                     │                               ↑
                     └─ 备份角色、清珠、置 target=-1 ──┘

建议
主循环 → 收尾 module 的 interface
               implementation 内集中：完整事件链 → 珠结算协调
                    → 调教期表销毁 → 合法时机除名 → 转场结果
```

### 建议与删除测试

深化**已有**收尾 module，让它拥有“会话何时结束、哪些数据必须保留到何时”的完整责任；把 `EVENTEND` 中与生命周期协议相关的部分重新归位，而不是增加一个只包住 `run_aftertrain` 的转发函数。具体 interface 形状留到设计阶段确定。

删除测试的目标不是删掉事件链，而是：**后续新增一个收尾步骤时，维护者不再需要从另一文件反推 `target=-1` 为什么意味着某个备份角色应被删除。** 若引入新 module 后这条隐含协议仍原封不动地跨文件存在，depth 没有增加。

### 已有测试与验收条件

现有真实引擎测试已检查：事件链内死亡目标数据仍可读取；死亡目标不获珠；幸存角色只结算一次；调教期表被销毁；存活与濒死自动结束路径保留角色；下一场不残留上场待结算珠。应保留这些行为断言和真实入口。[S26]

重构还必须保持广播事件链与最终转场的语义；不能把正常转场当普通异常吞掉，也不能未经行为核对就用 `finally` 强制完成所有清理。正常死亡、游戏终止和普通异常不天然具有相同收尾策略。[S12] [S14]

**收益：** locality 集中会话协议；leverage 覆盖所有调教结束路径；测试继续命中 `run_aftertrain` 的行为面。**代价：** 需要准确划分生命周期操作和剧情处理，不能整体搬走所有 `EVENTEND` 内容。

## 六、候选 02：集中角色除名的共同规则

**Strong · P1，接续候选 01 · local-substitutable**  
**文件：** `ere/system/stronghold/sale.js`、`ere/event/event-execution-common.js`，后续再连接调教收尾。[S15] [S16]

### 现状与证据

出售的 `kill_target` 和处刑的 `dispose_character` 都需要处理除名登记、队伍清理、实际删除、前次目标/助手引用和称呼重建；但步骤的排列、额外奖励、装备处理与提示各有差异。[S15] [S16]

仓库已经有两项局部集中：`mark_hero_removed` 被共同调用，处刑侧已有 `dispose_character`。因此正确问题不是“没有抽象”，而是**共同的角色存在性与引用清理规则尚未完全被原因特定流程隐藏**。[S13] [S15] [S16]

```text
当前
出售流程 → 登记 / 队伍 / 删除 / 指针 / 称呼
处刑流程 → 装备 / 登记 / 指针 / 队伍 / 删除 / 称呼 / 奖励
调教结束 → 事件链内准备 + 引擎收尾后实际删除

建议
出售政策 ─┐
处刑政策 ─┼→ 共同除名 module → 既有属主写入口与引擎
收尾协调 ─┘      （只集中被证明相同的机械规则）
```

### 建议与范围控制

先在出售和处刑之间识别真正相同的除名规则，集中这些 implementation；原因特定的装备归还、经验、威望、录像、剧情和等待步骤留在各自流程。**不要把现有 `dispose_character` 不断加布尔参数，改造成所有生命事件的总入口。**

候选 01 与本项不争夺责任：候选 01 决定调教会话中**何时允许除名**；本项集中合法时机下**如何完成共同除名**。调教之外的流程不能依赖一个调教专用 module。

也不要在第一步顺便统一加入、苏生、换人、后代和所有特殊结局。搜索结果已显示个别结局路径明确保留了特殊的队伍删除参数；未经需求裁定不能把这些差异当“复制错误”消掉。[S31]

### 删除测试与验收

将共同实现集中后，一个普通除名调用者应不再逐条拼装角色引用清理。如果只是把五个低级调用改成五个同名转发 module，leverage 不会提高。

验收至少保留：稳定角色 ID 不重排；只清除真正指向被删角色的引用；其他角色数据不变；原因特定奖励不重复；取消出售或零价拒绝不产生除名副作用；调教死亡必须等引擎收尾完成。这里只列未来验收要求，不声称本次逐项运行过。[S15] [S16] [S26]

已有的行为测试和有效变异继续保留。只有在新 interface 的行为测试能覆盖相同失效模式后，才删除重复的内部步骤断言。

## 七、候选 03：集中指令身份与名称规则

**Worth exploring · P2 · local-substitutable**  
**文件：** `ere/page/page-usercom.js`、`ere/system/train/train-name.js`；协同 `com-family.js`、`com-index.js`、`com-register.js`。[S19] [S20] [S21] [S22] [S23]

### 现状与证据

上次指令名 `p_c`、自定义菜单标签 `command_button_label` 和内建菜单，在页面 module 内分别选择静态名字、别名和空白回退。`train-name.js` 则负责别名播种与直接读取。[S19] [S20]

其中至少有几类必须保留的区别：可直选编号不等于全部分发编号；升格后的编号可用于标签，但按钮仍显示升格前的稳定紧凑序号；上次指令名优先静态名字，自定义菜单一般使用别名，复合动作另有静态拼接规则。高级编号不在静态表内时，必须在读取静态名之前作合法性判定。[S19] [S20] [S21] [S22]

**现有保护已经修复了相关崩溃。** 当前摩擦是页面维护者仍须了解多份编号与命名规则，才能安全地新增一种指令展示。[S19]

```text
当前
上次指令显示 → 自己选择：声明检查 / 静态名 / 别名 / 空白
自定义菜单   → 自己选择：升格 / 复合动作 / 别名 / 序号
内建菜单     → 自己选择：静态名 / 序号

建议
各展示场景 → 指令展示规则 module
                 内部保留场景差异，复用现有编号与别名来源
                 → 页面只负责布局和输出
```

### 建议与删除测试

深化现有取名相关 module 或其近邻，让它集中**指令展示**的命名规则，而不是创造全游戏“安全取名”工具。先覆盖上次指令、内建菜单、自定义菜单三个已存在场景，不把商店、角色预设和道具目录强行并入。

删除测试：从页面移除的应该是“选哪一个编号、哪一种名称来源、何种回退”的判断，而不只是把 `era.get` 换成一个名字更长的函数。仍允许不同展示场景保持不同优先级。

### 验收与不确定性

验收应包含：静态表外的高级指令可显示；未声明静态编号不被读取；可用性变化不改变紧凑编号；自定义别名在存读档后保留；复合动作名字与普通名字保持各自规则。[S19] [S20] [S22]

不要把不同名称来源做成新的持久缓存，也不要让任意未声明编号静默返回空字符串，从而掩盖本应报错的分发错误。[S04] [S05]

**为何不是 Strong：** 现有 module 已各自承担一部分真实职责；合并可能只是将页面复杂性搬家。只有当页面的认知 interface 明显缩小，且测试不再横跨多份取名规则时，才值得实施。

## 八、候选 04：收拢多角色结算的归属规则

**Worth exploring · P2 · local-substitutable**  
**文件：** `ere/system/train/com-assistant.js`、`ere/system/train/calc-ejaculation.js`；相关证据为 PR #779 与 `test/com-assistant.test.js` 的补丁。[S17] [S18] [S28]

### 现状与证据

`settle_ejaculation_gauge` 已隐藏“引擎写入 BASE 会立即封顶”的复杂性：先按总量分档，再扣除并写回余量。它保留严格 `>` 阈值。这是一个应保留的 deep module；**不能为了重构再次把它内联回各指令**。[S17]

COM64 的后续处理仍分别把主人、助手、目标和当前主导者与经验、标志、计量增量等副作用关联。当前代码已修正主人和助手的经验归属；PR #779 又补齐了相关助手分支，并通过真实指令入口和不同角色初始经验值检查误记对象。[S18] [S28]

```text
当前
共用计量槽结算 → 档位
                   ├─ 指令自己拼：给主人哪些经验与标志
                   ├─ 指令自己拼：给助手哪些经验与标志
                   └─ 指令自己拼：目标所得与主导者增量

建议
指令的特殊效果 + 多角色结算 module
                     内部集中：角色身份 → 被证明共有的副作用
                     继续调用既有计量槽结算
```

### 建议与范围控制

先对 COM64/COM66 作规则表比对，识别跨指令真正一致的“副作用归谁”规则，再集中该部分 implementation。目标角色得到的经验、装备条件、文本与指令独有副作用并不当然相同，不能为了合并而统一数值。

不创建通用规则引擎，不把所有效果装进巨大的配置对象，也不把所有 `player` 机械替换为 `MASTER`。主人身份、助手身份和当前主导者是三个有时相同、有时不同的概念。[S18] [S28]

### 删除测试与验收

集中后，指令调用者不应再重复决定相同经验归属；若仍需传入或自行计算大量低级标志与收款角色，interface 依旧与 implementation 一样宽，属于 shallow 抽象。

保留现有真实指令入口回归：主人/助手分别主导，未触发/普通/大量/余量封顶，各角色预先播种不同的非零经验值，检查未参与角色不受影响。严格阈值、扣量与余量规则必须不变。[S17] [S28]

**为何不是 Strong：** 近期连续修复支持“归属规则容易分散”这个判断，但不证明所有指令应共享同一种结算。需要先证明共同政策足够稳定，才能获得正的 leverage。

## 九、候选 05：合并真实引擎测试环境的重复装配

**Worth exploring · P3 · local-substitutable**  
**文件：** `test/train-end-engine.test.js`、`test/duplicate-character-creation-engine.test.js`；继续依赖现有 `test/helpers/era-fixture.js` 与 `engine-bundle` 装载能力。[S24] [S26] [S27]

### 现状与证据

两个测试文件都自行完成了相似的上层装配：扫描 YAML、用引擎解析器装载静态表、读取 `_fixed.json` 的扩展角色表、注册扩展表类型、装载角色预设、创建 EraApi、重置数据、创建夹具，再把一组状态方法绑定到真实引擎。[S26] [S27]

它们**已经复用** `create_variable_loader`、`create_chara_loader` 和 `load_engine_bundle`。重复点不是解析器，而是解析器之上的“一个可信的无 GUI 引擎测试世界如何组成”。不同测试绑定的方法集合和角色预设不同，不能未经核对全部改成相同配置。[S26] [S27]

```text
当前
收尾回归 → 自装 YAML / 扩展表 / 预设 / EraApi / SDK 绑定
创建回归 → 自装 YAML / 扩展表 / 预设 / EraApi / SDK 绑定

建议
两个行为回归 → 共用引擎测试装配 module
                    ├─ 复用现有 engine-bundle
                    └─ 经既有 SDK seam 接入夹具
```

### 建议与删除测试

将重复装配集中到测试侧 module，先让上述两个真实引擎回归使用它；各测试仍自己声明场景和行为断言。只集中共同装配，不把业务前置、输入脚本和所有断言都藏进去。

删除测试：未来静态表装载规则变化时，不再逐个修补这两个测试世界；测试作者不必重复掌握 YAML 与 SDK 方法绑定细节。装配 module 的 interface 必须比这套步骤更小，不能只是把每个步骤改成一个必须顺序调用的公开方法。

### seam 与验证边界

现有契约测试已提供真实引擎和独立夹具两个 adapter，不需要新增生产依赖注入点。本项也不意味着让所有夹具测试依赖 `app.asar`。[S07] [S25]

共同装配必须明确哪些状态行为来自真实引擎，避免方法列表遗漏后悄悄退回夹具镜像；同时保持每个测试世界状态与模块缓存隔离。缺引擎沿用既有跳过规则，装载失败或引擎结构漂移不能被伪装为“缺环境”。[S07] [S24] [S26] [S27]

继续扩展 BASE、名字寻址、角色加入/删除、调教期表等行为的逐步差分比对，是**后续验证方向**；本次没有穷尽这些测试的全库覆盖，不把它们统称为“尚无契约测试”。

## 十、实施次序与验收方法

### 阶段 A：先固定候选 01 的行为面

以现有 `run_aftertrain` 入口和 `train-end-engine.test.js` 为准，整理正常结束、死亡结束、濒死自动结束与异常/转场的职责区别。保留当前可观察顺序和数据结果，不更换事件注册机制。[S13] [S26]

本阶段的成果应是“生命周期协议集中”，而不是目录重排。若还必须由不拥有收尾责任的调用者解释备份目标和哨兵值，则继续收窄方案，不扩大改动范围。

### 阶段 B：再集中候选 02 的共同除名动作

先处理出售与处刑，保留原因特定政策；随后明确与调教收尾的交接。新增失败/取消路径断言时，以未改变角色数据、队伍和引用为目标，而不是只验证某个函数被调用。[S15] [S16] [S26]

### 阶段 C：名称与多角色结算各自小步试点

候选 03 只试点三个指令展示场景；候选 04 只试点 COM64/COM66。各自独立验收，不与存档模型、语言迁移、目录重组捆绑。无法减少调用者知识的方案可以直接放弃。

### 阶段 D：测试装配按需要集中

如果 A/B 实施时需要继续复制真实引擎装配，候选 05 可以提前；否则不要为了一个通用测试框架单开大规模改造。先验证两个真实调用者，再决定是否推广。

### 统一验收原则

1. **先保留，后替换测试。** 新 interface 的行为测试覆盖相同失效模式后，才删除内部耦合或重复断言；保留仍有效的变异测试，不把“删除旧测试”误解为削弱回归能力。
2. **检查数据与行为，不只检查调用。** 角色是否真的加入/删除、数据桶是否存在、珠是否只结算一次、标签和输入是否一致，才是结果。[S04] [S26] [S27]
3. **不改变保存语义。** 任何表、编号或字段含义变化需单独评估旧档；不能提高最低支持版本以绕过兼容性。[S08]
4. **完成项目要求的实际验证。** 由实施环境按 `AGENTS.md` 运行相关测试、有效变异、全库检查及必要实机验收；本文不替代这些步骤。[S02] [S07]

## 十一、暂不建议的“重构”

| 不建议 | 原因 |
| --- | --- |
| 另建 JS 状态对象，再与引擎表双向同步 | 违反唯一真相源，增加存读档与生命周期问题。[S05] |
| 按行数拆大文件、拆口上，或全库换目录 | 没有证明 interface 变小，容易增加跨文件跳转。[S04] |
| 把广播事件链与编号分发族统一成通用事件总线 | 两者的执行和缺失语义不同。[S04] [S12] |
| 把全部引擎调用再包一层通用 module | 如果调用者仍需知道相同引擎规则，只增加 indirection，不增加 depth。 |
| 删除已抽出的计量槽结算 | 会让封顶前分档和余量规则重新散落。[S17] |
| 将所有测试夹具改为强制委托真实引擎 | 违背无引擎测试和独立镜像比对的既有选择。[S07] |
| 借重构统一所有角色移除原因 | 原因特定的剧情、奖励、装备和特殊历史行为并不相同。[S15] [S16] [S31] |
| 仅因测试数量多、变异条目多就给出高架构评分 | 测试规模不证明夹具语义正确，本文没有执行验收。 |

## 十二、两个可以单独修正的过期说明

这两项是已读源码中的**文档不一致**，不是运行时缺陷，适合小改动处理，不必混进主要重构：

- `main-loop.js` 的文件头仍说转场目标只有六种，但当前 `STATE_HANDLERS` 已有 `SHOP_AFTER_LOAD`。应更新头注中的当前状态描述，保留历史决策的链接。[S11]
- `train-loop.js` 的旧步骤说明仍写“指令按钮的渲染是待办”，但 `page-usercom.js` 已实现内建与自定义指令方格。应删除过期完成状态，留下仍有意义的顺序约束。[S13] [S19]

## 十三、最终建议

**先深化调教收尾 module，再集中角色除名的共同规则。** 前者解决“何时可以销毁数据”，后者解决“销毁一个角色时哪些共同状态必须一致”。两者协同，但不是一个无限扩大的生命周期总 module。

是否值得继续，不看新增了几个文件，而看三件事：维护者理解一个结束流程是否少跳文件；调用者是否不再解释底层时序与哨兵；现有行为测试是否能在内部重排后继续成立。

其余三项保留为明确范围的候选，不建议同时启动。当前代码中已有效隐藏引擎语义的 module，应被保留并继续深化，而不是在全面重构中被抹掉。

---

## 证据索引

除技能与 PR 页面外，以下源码链接全部固定到审阅 SHA。私有仓库链接需要已有 GitHub 访问权限。文中引用只支持相应代码事实；“建议、收益与排序”是本报告的架构判断，不是源码自带结论。

- **[S01]** `README.md` — 项目与引擎说明；当前玩家存档承诺。
- **[S02]** `AGENTS.md` — 开发约束、唯一夹具注入点、测试与引擎环境；本次读取前部。
- **[S03]** `CONTEXT.md` — 项目术语、角色 ID、事件链与转场语义；本次读取前部。
- **[S04]** `docs/skeleton.md` — 结构、注册、离线生成与测试约定；本次读取前部。
- **[S05]** `docs/adr/0001-engine-tables-as-single-source-of-truth.md` — 引擎变量表唯一真相源；只持 ID 的角色门面。
- **[S06]** `docs/adr/0002-region-ownership-from-measurement.md` — 区段所有权、具名跨域写与只减不增的现有条目表。
- **[S07]** `docs/adr/0005-engine-semantics-three-tiers.md` — 独立镜像与真实引擎的契约比对；渲染可达性限制。
- **[S08]** `docs/adr/0006-save-compatibility-not-guaranteed.md` — 以文末 2026-10-03 的新规定为准；也读取了历史勘误。
- **[S09]** `docs/adr/0007-stateless-cross-domain-modules.md` — 无域状态的共享模块；代码位置与状态所有权的区别。
- **[S10]** `ere/main.js` — 引擎要求的入口与主循环委托。
- **[S11]** `ere/system/flow/main-loop.js` — 装载顺序、状态处理器、SHOP_AFTER_LOAD 与异常转场。
- **[S12]** `ere/system/event/registry.js` — 三档顺序、事件广播、最后一次转场生效。
- **[S13]** `ere/system/train/train-loop.js` — 统一指令回合；run_aftertrain 的收尾顺序与间接信号。
- **[S14]** `ere/event/event-end.js` — 死亡分支清零待结算珠、置空指针、延迟除名。
- **[S15]** `ere/system/stronghold/sale.js` — 读取 1–220、470–660：候选、提交检查、出售与 kill_target。
- **[S16]** `ere/event/event-execution-common.js` — 已有处刑专用 dispose_character；公共与原因特定副作用。
- **[S17]** `ere/system/train/calc-ejaculation.js` — 先分档后写回、严格阈值、余量封顶的共用实现。
- **[S18]** `ere/system/train/com-assistant.js` — 读取 1390–1550：COM64 的主人、助手、目标与主导者归属。
- **[S19]** `ere/page/page-usercom.js` — 读取 1–180：p_c、command_button_label、内建与自定义菜单。
- **[S20]** `ere/system/train/train-name.js` — 别名持久化、初始化与 read_train_name。
- **[S21]** `ere/system/train/com-family.js` — 搜索片段：可直选编号空间与分发空间的区别。
- **[S22]** `ere/system/train/com-index.js` — 搜索片段：稳定的紧凑序号映射。
- **[S23]** `ere/system/train/com-register.js` — 搜索片段：multi_comable 对可直选空间的资格检查。
- **[S24]** `test/helpers/era-fixture.js` — 读取 1–170：SDK 注入、缓存隔离、记录、引擎镜像。
- **[S25]** `test/engine-contract.test.js` — 读取 1–210：已有真实引擎与夹具两个 adapter。
- **[S26]** `test/train-end-engine.test.js` — 真实引擎收尾回归、YAML 装配与选择性方法绑定。
- **[S27]** `test/duplicate-character-creation-engine.test.js` — 读取 1–145：另一套装配；重复加入会重建同号角色的验证。
- **[S28]** `https://github.com/odradekk/maou_redux/pull/779/files` — 已读取补丁：助手经验修复、真实指令入口测试、相关变异。
- **[S29]** `https://github.com/odradekk/maou_redux/commit/7936b1621e2aed35c8188c7dbd66fca6529ea03a` — 2026-10-10 合并的死亡收尾修复；已读取最近提交与变更文件列表。
- **[S30]** `https://github.com/odradekk/maou_redux/pull/760/files` — 已核对变更文件列表，并读取对应真实引擎测试。
- **[S31]** `ere/event/ending-family.js` — 搜索片段：移植中有意保留的特殊除名参数差异；不可机械合并。

## 所用技能

- [improve-codebase-architecture](https://github.com/mattpocock/skills/tree/main/skills/engineering/improve-codebase-architecture)：本次实际读取其 SKILL.md 和 HTML-REPORT.md。
- [codebase-design](https://github.com/mattpocock/skills/tree/main/skills/engineering/codebase-design)：本次实际读取其 SKILL.md 和 DEEPENING.md。

技能取自本次访问的 `main`；用于识别内容的 blob SHA：`improve-codebase-architecture/SKILL.md = 44cc7d3136c44534d68ac523fa6cd37e759d2846`，`HTML-REPORT.md = e39e8255b8797cf8257d014fb6658fb533f3a399`，`DEEPENING.md = cd94075cfd754d147555c5d747a16431ed4c7dd8`。


[S01]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/README.md
[S02]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/AGENTS.md
[S03]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/CONTEXT.md
[S04]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/docs/skeleton.md
[S05]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/docs/adr/0001-engine-tables-as-single-source-of-truth.md
[S06]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/docs/adr/0002-region-ownership-from-measurement.md
[S07]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/docs/adr/0005-engine-semantics-three-tiers.md
[S08]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/docs/adr/0006-save-compatibility-not-guaranteed.md
[S09]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/docs/adr/0007-stateless-cross-domain-modules.md
[S10]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/main.js
[S11]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/system/flow/main-loop.js
[S12]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/system/event/registry.js
[S13]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/system/train/train-loop.js
[S14]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/event/event-end.js
[S15]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/system/stronghold/sale.js
[S16]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/event/event-execution-common.js
[S17]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/system/train/calc-ejaculation.js
[S18]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/system/train/com-assistant.js
[S19]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/page/page-usercom.js
[S20]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/system/train/train-name.js
[S21]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/system/train/com-family.js
[S22]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/system/train/com-index.js
[S23]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/system/train/com-register.js
[S24]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/test/helpers/era-fixture.js
[S25]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/test/engine-contract.test.js
[S26]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/test/train-end-engine.test.js
[S27]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/test/duplicate-character-creation-engine.test.js
[S28]: https://github.com/odradekk/maou_redux/pull/779/files
[S29]: https://github.com/odradekk/maou_redux/commit/7936b1621e2aed35c8188c7dbd66fca6529ea03a
[S30]: https://github.com/odradekk/maou_redux/pull/760/files
[S31]: https://github.com/odradekk/maou_redux/blob/7936b1621e2aed35c8188c7dbd66fca6529ea03a/ere/event/ending-family.js
