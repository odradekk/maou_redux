# 夹具对引擎闸门与控制流语义的镜像覆盖面普查

对应工单：[issue #143](https://github.com/odradekk/maou_redux/issues/143)。
调查对象：`test/helpers/era-fixture.js`（全项目唯一注入点，issue #16）对引擎行为的镜像面，引擎侧以 `ere-4.8.0-win-x64/resources/app.asar` 的实际代码为准（background.js 的 webpack bundle，模块 183 = `EraApi` 类；渲染层 `js/app.2cccec57.js`），`dev-guides/` 手册次之。
起点不是零：#135（版本闸门 truthy 短路）、#136（按钮缺失勘误）、#137（`LOADDATA` 的转场语义）三类逃逸机制已实机确证，本报告**直接引用、不重新诊断**，往下扩查同型缺口。
本票只查只写：不改夹具、不改任何用例，修复归本报告产出的后续票。

## 结论摘要

1. 存档系列六个 API（`loadData` / `saveData` / `rmData` / `saveGlobal` / `loadGlobal` / `resetGlobal`）全部不在夹具的 `implemented` 名单（`era-fixture.js:747-780`），落兜底层只记录、恒返回 `undefined`（:788-791）——#135/#137 撞出的两个缺陷只是这一族的最先暴露者（G1）。
2. 普查新查出七条同型缺口，其中两条是活的控制流缺口：`quit()` 在引擎里是 **throw 型**（`new Error("quit")`，装载循环按 message 静默放行），夹具是无害桩，`event-ending.js:95` 的 `era.quit(); return 1;` 在真机上 `return 1` 不可达（G5）；`removeCharacter` 引擎恒返回 `undefined`，夹具发明了布尔返回值且被 `fixture.test.js:109` 钉成断言（G3）。
3. 四项工单点名复核全部仍完整：变量缺表三态（`static-table-coverage` + 夹具 train 守卫 + `train-loop.test.js:352-380` 引擎比对三层锁）、`input` 白名单（#130）、`waitAnyKey` 的 allowWait 状态机（#91 契约测试）、`printButton` 的 `showAcc` 拼接与空白折叠（PR #30）。
4. 夹具里自陈的七处有意简化（`beginTrain`/`endTrain` 数值语义、`resetData` 只清已加入列表等）不是缺口，第三节单列；其中两处有值得登记的锐边。
5. 手册与引擎代码有三处实质分歧（`useRule` 默认值、`nextTurnInTrain` 的结算去向与钳制、`notify` 词条误植），附录登记，佐证「以 bundle 代码为准」的证据排序。

## 一、方法与证据等级

- 引擎行为：经 `test/helpers/engine-bundle.js` 直接驱动 `app.asar` 的模块 183（EraApi 原型方法）逐个导出方法体，渲染层行为从 `js/app.2cccec57.js` 直读。**引用一律标注出处**，`#135` 勘误已确证的手册缺漏（`loadData` 与 `loadGlobal` 的判空写法不一致）不重查。
- 夹具行为：`test/helpers/era-fixture.js` 全文精读，引用带行号。
- 使用面：`ere/` 全目录 grep 每个 API 的真实调用点，决定缺口的「活/潜伏」定性——同一个缺口，游戏代码在用就是活缺口，没人用是登记项。
- 测试面：全测试套件的就地替换（`fixture.era.X = ...`）共两处五种用法已逐处核实（第四节）。

## 二、缺口清单

### G1（必须补）存档系列：六 API 全走兜底，引擎闸门一个都没镜像

引擎真实行为（app.asar 模块 183，逐字核对）：

| API             | 引擎闸门/副作用                                                                                                                                                                                                                                                                                                           | 夹具现状                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `loadData(e)`   | ①文件不存在或解不开 → `era.error("invalid saved data!")` + `false`；②`r.code !== gameCode` → 报错 + `false`；③版本闸门 `r.version && !(r.version < allowVersion)`，**truthy 判空**，`version: 0` 直接短路落报错分支（#135 确证）；④成功 = `this.era.data = r` **整份数据替换** + `fillData()` 补建已声明序号，返回 `true` | 兜底记录返回 `undefined`（:788-791） |
| `saveData(e,t)` | 盖 `data.version`/`data.code` 戳（取自 GameBase）→ 写文件（按 `system.saveCompressedData` 决定 gzip）→ **`this.global.saves[e] = t` + 自动 `await this.saveGlobal()`**（手册 `dev-guides/11-saves.md:85` 亦有记载）                                                                                                       | 同上                                 |
| `rmData(e)`     | 删文件 + `delete this.global.saves[e]` + 自动 `saveGlobal()`（`11-saves.md:99`）                                                                                                                                                                                                                                          | 同上                                 |
| `saveGlobal()`  | 盖 `global.version`/`code` 戳、写 `global.sav`，失败 `false`                                                                                                                                                                                                                                                              | 同上                                 |
| `loadGlobal()`  | gameCode 不匹配 → 报错 + **`throw new Error`**（引擎启动拒绝的机制本体，AGENTS.md 已记）；版本闸门是 \*\*`void 0 === n.version                                                                                                                                                                                            |                                      | n.version < allowVersion`**（undefined 判空，与 `loadData`的 truthy 判空写法不同，#135 勘误已点）；缺失/低版 →`resetGlobal()` 重建 | 同上 |
| `resetGlobal()` | 重建 `{code, saves:{}, version}`、静态 global 键清 0、`listSaveFiles()` + `saveGlobal()`                                                                                                                                                                                                                                  | 同上                                 |

可能逃逸的缺陷形态：

- 已确证两案：`version: 0` 被拒读（#135）、读档转场语义丢失（#137）。
- 潜在一案（尚无用例踩中，耦合真实存在）：`page-save-load.js:475-477` 存档后靠「引擎自动 `saveGlobal`」让备注落 `global:saves`，但夹具下这条耦合从未成立——用例全靠 `seed_save` 手种（`test/page-save-load.test.js` 的 `seed_save` 帮手）。「存档 → 立刻回到槽列表看到新备注」这条端到端路径在夹具里测不出断点。
- 引擎内部 `listSaveFiles()`（不在 SDK 面上，`ere/era-electron.js` 无此方法）会做槽位对账：文件在而备注缺 → `"UNNAMED SAVE FILE"`，备注在而文件丢 → 加 `"(FILE LOST) "` 前缀。`page-save-load.js:98-101` 的 `has_valid_save` 消费的正是这个约定，而 `"(FILE LOST) "` 分支目前无用例钉住（`test/page-save-load.test.js` grep 为空）。

### G2（锐边必须小补；defaultChara 为观察项）`resetData`：引擎重建全部表，夹具只清列表且 store 残留

引擎 `resetData()`（模块 183）：**整份重建** `this.era.data`（含 `item` 的 `{bought:-1, hold:{}, price:{}, sales:{}}` 形状）、`fillData()` 给已声明序号补 0，然后**若 GameBase 设了【初始角色编号】则自动 `addCharacter(defaultChara)`**（手册 `A-api-docs.md` resetData 词条有载）。

夹具 `era-fixture.js:714-720`（自陈 :712-713）：只清 `chara_no`。

锐边（自陈范围之外）：夹具的 `store` 是平表（:106），`resetData` 后旧键原样残留、`era.get` 照读。逃逸形态：「标题选『新的猎物』清档重开后读到上一局旧值」类缺陷在夹具下测不出——每个用例都拿全新夹具，天然掩盖了「同一夹具内 reset 后应回初值」这层语义。真机上新局是**同一进程同一份 data**，引擎靠整表重建保证干净。

观察项：本项目 `yml/GameBase.yml` 未设【初始角色编号】，`page-title.js:207-208` 是 `resetData()` 后手动 `addCharacter(0)`，双加不会发生；但若将来设了该键，引擎会自动加一次、ere 侧再手动加一次（`addCharacter` 引擎侧先滤同号，重复加入不报错但绕一圈）。登记备查。

### G3（必须补，当前危害低）`removeCharacter`：返回值是发明的，且漏删幸存者的三段键

引擎（模块 183）：方法体无 return 语句，**恒返回 `undefined`**；除过滤 `data.no` 外，还**删除每个幸存者指向被删者的条目**（`delete this.data.relation[r][t]`、`delete this.data.callname[r][t]`，对每个幸存者 r × 被删者 t）。

夹具 `era-fixture.js:724-732`：单参调用返回布尔（`!chara_no.includes(id)`），多参返回 `undefined`。**`test/fixture.test.js:109` 把 `assert.equal(fixture.era.removeCharacter(31), true)` 钉成了断言**——这正是工单所说「代价二」的变体：不是把错误行为固化，是把**不存在的行为**固化。游戏代码 `event-end.js:113` 不用返回值，所以现在无害，但断言在替发明作证。

另一处分歧超出 :721-723 注释自陈的范围：注释称其余角色表的清理「在平表 store 里天然发生（键带着旧角色 ID，不再被读到）」——对 `relation:幸存者:被删者`、`callname:幸存者:被删者` 这类三段键**不成立**：键的主段是幸存者，夹具下残留可读，引擎下是 `undefined`。

### G4（应补）`getAddedCharacters` / `getCharactersInTrain`：引擎按数值升序，夹具按插入序

引擎（模块 183）：`getAddedCharacters()` = `Object.keys(this.data.base).map(Number)`，`getCharactersInTrain()` = `Object.keys(this.data.tequip || {}).map(Number)`。JS 对整数键的 `Object.keys` 恒按**数值升序**迭代——与加入顺序无关。

夹具 `era-fixture.js:680` / `:700`：数组/Set 的**插入序**。加入顺序非升序时（先 31 后 0）两侧返回顺序不同。

影响面：`event-nextday.js`、`event-endcheck.js`、`train-loop.js:123` 都逐角色迭代这两个 API——顺序分歧会改变日循环事件的处理顺序（输出比对可撞上），也会改变 `beginTrain` 的入参序。现有用例的加入序恰好都是升序（如 `fixture.test.js` 的 `[0, 31]`），未踩中。

### G5（必须补）`quit`：throw 型控制流，夹具是无害桩

引擎（模块 183，逐字）：

```js
quit(){throw this.era.quit(),new Error("quit")}
```

逗号表达式：先发关窗 IPC，然后**抛出** `Error("quit")`。引擎装载循环显式识别它并静默放行（background.js，模块 757807 处的装配代码）：

```js
this.api
  .clear()
  .then(this.game)
  .catch((e) => {
    'quit' !== e.message && this.error(e.message, e.stack);
  });
```

即：游戏脚本的整个 Promise 链被这个异常炸穿，`QUIT` 之后的**所有**语句（含各层调用方的后续）不可达；引擎侧按 message 静默收场。

夹具：`quit` 不在 `implemented`（:747-780），兜底记录返回 `undefined`。于是 `event-ending.js:95` 的 `era.quit(); return 1;` 在夹具下顺利返回哨兵值 1，`event-ending.test.js:157-164` 断言「quit 被调、FLAG:82 不置 1」在夹具下成立。**真机上 `return 1` 不可达**——哨兵值沿 `invasion_check` 的消费路径（跳过威望 +10，见 `event-ending.js` 的 JSDoc :50-55）在真机上走的是完全不同的机制（异常炸穿 vs 哨兵短路）。这是 #137 转场语义缺口的同型：控制流语义被降格成普通返回值，且已有用例在替这个降格背书。

### G6（应补）`input` 回传值的数值归一

引擎（模块 183）：回传前过 `getNumber`（模块 65）——`Number(val)` 可解析则转数值，否则原样。渲染层回包的 `val` 是字符串，普通 `input()` 回给游戏代码的**几乎总是数值**。

夹具 `era-fixture.js:584-622`：预置什么回什么，不归一。`set_inputs('3')`（字符串）时夹具回 `'3'`、引擎回 `3`，游戏代码的 `result === 3` 分岔。现有用例都预置数字值，未踩中；这是「未来一踩一个准」型。

### G7（登记项）`printButton` 的 `config.dict` 替换链未镜像

引擎（模块 183）：`Array.isArray(r.dict)&&r.dict.forEach(e=>n.content=n.content.replace(...e))`——`config.dict` 的 `[from, to]` 对在发送渲染层**之前**替换正文。夹具 `make_button_entry`（:203-228）不处理 `dict`。游戏代码未用（`ere/` grep `dict:` 为空），随用随补即可，登记。

### G8（可接受，登记观察面）`setAlign` 等 12 个样式 API 走兜底

引擎侧 `setAlign` = `this.era.connect("setAlign", e)`，纯渲染事件：无守卫、无行数、无返回值。游戏代码在用（7 处：`event-first.js` / `page-main-menu.js` / `page-title.js`），夹具兜底层记录在 `calls` 里可断言调用发生（`fixture.test.js:49-58` 即此写法）。对齐是渲染属性，不进 `lines` 条目，比对工具（`tools/compare/`）也不记录——「标题画面居中」这类视觉语义在测试与比对两层都不可见。属观察面限制而非闸门缺口，登记；`setTitle`/`setColor`/`setBack` 等其余 11 个样式 API 游戏代码零调用。

### G9（可接受，两个低危观察项）变量族

工单点名的缺表三态复核：**仍完整**。三层锁都在——`test/static-table-coverage.test.js`（从 `ere/` 源码扫寻址族、用引擎真 `setVar` 探测，含 :143 的「缺名字表直接崩溃」引擎实证用例）、夹具的调教域表守卫（:476-526，镜像 issue #44 的引擎语义）、以及 `test/train-loop.test.js:352-380` 把该守卫与引擎寻址代码直接比对。两个低危观察项：

1. **寻址段的数值归一**：引擎把 `flag:01` 与 `flag:1` 归同一槽（setVar 逐段 `Number` 归一后寻址）；夹具 `store` 是字符串键平表，不归一。游戏代码均以规范格式拼键，未踩中。
2. **`add(name)` 无值调法**：引擎 `add(e,t){return t?this.set(e,t,!0):this.get(e)}`——无值时退化为读；夹具（:545-554）会算出 `NaN` 落盘。游戏代码都带值调用（如 `event-end.js:142`），未踩中。

## 三、已声明的有意简化（与缺口分开，勿当问题）

夹具自陈、且分层归属明确，本报告认定为**非缺口**的七处：

| 自陈处                   | 内容                                                                               | 承接层                                                         |
| ------------------------ | ---------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `era-fixture.js:682-688` | `beginTrain`/`endTrain` 的结算与删表数值语义（gotjuel→juel、delta→palam 等）不镜像 | `test/train-loop.test.js` 的引擎比对 + `static-table-coverage` |
| `era-fixture.js:712-713` | `resetData` 只清已加入列表（store 静态预设与存档数据未分离）                       | 锐边见 G2，分层归 engine-bundle 生态                           |
| `era-fixture.js:147-149` | `printAndWait` 的内部等待不进 `inputs_consumed`                                    | 冻结于 `tools/engine-contract-ledger.mjs`（#91）               |
| `era-fixture.js:126-128` | `printLineChart`/`setToBottom`（各 +1 Row）、`notify`（无行）不实现                | 游戏代码未用，随用随补                                         |
| `era-fixture.js:151-153` | `isContinue` 以旋钮代位渲染层回包的 continue 字段                                  | `system_config` 同类旋钮，#91                                  |
| `era-fixture.js:576-581` | `input` 回显只计数不推条目                                                         | 比对回放的输入标记承载（`tools/compare/replay.js`）            |
| `era-fixture.js:643-648` | `addCharacter` 只镜像守卫与 `callname:-1/-2`，完整数据层装载不镜像                 | `test/chara-yml.test.js` 驱动引擎真方法比对                    |

G5 的锐边说明：`beginTrain`/`endTrain` 自陈的「删表不镜像」意味着夹具 `store` 里 `tflag:*`、`palam:*` 等旧值**跨调教场残留可读**（引擎 `endTrain` 删整表、下次 `beginTrain` 重建并把 tflag 静态清 0）。归入已声明范围，但反向锐边真实存在：残留值可能掩盖「忘清 tflag」的真缺陷（夹具下读得到旧值、引擎下是 0）。后续票清单里给了低优先级处理项。

## 四、对「就地替换」手法的处置建议

现状普查（全套件仅两处五种用法）：

- `test/page-save-load.test.js:463/480/490/523`：`fixture.era.loadData = async () => true/false`——**闸门绕过**，#135/#137 两缺陷的直接来源；`:466` 的 `assert.equal(await load_game(), 0)` 更是把「读档后返回调用方」的错误控制流钉成断言（#137 已立项修复）。
- `test/page-train.test.js:409-416`：替换 `clear` 的返回值模拟行数漂移，**try/finally 恢复**——这是故障注入（注入「引擎可能发生的漂移」以测自校验），不是伪造成功，属正当用法与先例。

建议（供后续票采纳，本票不动手）：

1. **替换值改为经 `engine-bundle` 驱动引擎真方法产出**（工单给定的方向）。存档族的落点：`EraApi.prototype.loadData.call(假this, 槽号)`，假 this 的 `era.path` 指向临时目录、`staticData` 由现有 `create_chara_loader`/`create_variable_loader` 装载 `yml/` 产物拼出、`config` 按需带 `system.saveCompressedData`。这样 gameCode 闸门、truthy 版本闸门、JSON 解析、数据替换 + `fillData` 全部是**引擎自己在执行**，夹具不复述任何判据——`#135` 勘误要求的那种「喂 `version: 0` 确认被拒」的守卫用例才有真地基。无引擎环境（CI）下按既有约定退化：`load_engine_bundle()` 返回 `undefined` 时相关用例 skip，跳过数基线的调整由实施票按 SOP 自觉完成。
2. **就地替换仅限故障注入**：必须 try/finally 恢复 + 断言「注入真的发生了」（`page-train` 先例）；对带闸门或控制流语义的 API（`loadData`/`saveData`/`quit` 等）**禁止**替换成恒值成功——那等于把引擎判据整个请出测试。
3. **断言纪律**：断言转场/控制流类行为前，用例必须先回答「引擎在这个点上的控制流是什么」（`system-flow.md` 或 bundle 代码），不允许把 ere 侧现状直接钉死。`:466` 的教训写进后续票的验收项：翻修时该断言必须改成「`begin(STATE.SHOP)` 被发出」（#137 的修复落地后）。
4. **夹具缺口信号**：今后任何用例若发现自己在替换一个带闸门的 API，视为夹具缺口的暴露，按后续票流程补夹具，而非就地绕过。

## 五、分级总表与后续票清单

| 编号 | 一句话                                                            | 分级             | 依据                                      |
| ---- | ----------------------------------------------------------------- | ---------------- | ----------------------------------------- |
| G1   | 存档六 API 无守卫（版本/gameCode/数据替换/`global.saves` 副作用） | 必须补           | #135/#137 已确证两案 + 潜在存档回显耦合   |
| G5   | `quit` 的 throw 型控制流                                          | 必须补           | ENDING 路径真机行为未被任何用例表达       |
| G2   | `resetData` 的 store 残留                                         | 锐边必须小补     | 同进程新局旧值可读；defaultChara 登记备查 |
| G3   | `removeCharacter` 返回值发明 + 幸存者三段键漏删                   | 必须补（低危害） | 断言在固化不存在的行为                    |
| G4   | 角色列表的顺序语义（升序 vs 插入序）                              | 应补             | 日循环处理顺序、`beginTrain` 入参序分歧   |
| G6   | `input` 回传值数值归一                                            | 应补             | 字符串预置输入的分支岔                    |
| G7   | `printButton` 的 `config.dict`                                    | 登记项           | 游戏代码未用                              |
| G8   | 样式 API 观察面                                                   | 可接受           | 兜底记录可断言调用                        |
| G9   | 寻址归一、`add` 无值调法                                          | 可接受           | 未踩中，登记                              |

后续票（按优先级，本票不实施）：

1. **P0**：夹具存档系列真实现——经 `engine-bundle` 驱动引擎真方法（临时目录 + `yml/` 产物拼 `staticData`），`loadData` 四闸门、`saveData`/`rmData` 的 `global.saves` 副作用、数据替换语义一并落地；配「同一串调用逐步比对」的契约测试（`engine-contract.test.js` 的模式扩到存档族）；同步翻修 `page-save-load.test.js` 四处在地替换与 `:466` 断言。**依赖 #137（读档钩子）合并后进行**，避免冲突面重叠。
2. **P1**：`quit` 控制流建模。先在 bundle 侧考古完整（装载循环的 catch 已核实，见 G5），再二选一：夹具 `quit` 镜像 throw（连带翻修 `event-ending` 用例），或 ere 侧显式建模「quit 后不可达」。翻修时 `event-ending.js` 的哨兵 JSDoc 与 `invasion_check` 消费点一并核对。
3. **P1**：`removeCharacter` 对齐引擎——返回值恒 `undefined`（翻修 `fixture.test.js:109`）、补幸存者 `relation`/`callname` 三段键清理；配 `engine-bundle` 真方法比对用例。
4. **P2**：`getAddedCharacters`/`getCharactersInTrain` 改按引擎键序（数值升序）镜像，加「先 31 后 0」的非升序用例钉住。
5. **P2**：`input` 回传值 `getNumber` 归一镜像（夹具侧，一行级改动 + 用例）。
6. **P3**：`beginTrain` 重建时清 `tflag` 静态为 0 / `endTrain` 后删跨场残留键，或至少在自陈注释里登记该锐边。
7. **P3**：手册分歧登记的归宿——本报告附录即登记处；若要改 `dev-guides/`（引擎官方手册副本）需单独决策，不在本票范围。

## 附录：手册与引擎代码的分歧（本次普查新查出）

`dev-guides/` 是官方手册的仓库内副本，以下分歧**以 bundle 代码为准**（夹具均已按代码走或应按代码走）：

1. `input` 的 `useRule` 默认值：`A-api-docs.md` 写「默认值为 `false`」；渲染层代码是 `safeUndefinedCheck(e.config.useRule, !0)`（`js/app.2cccec57.js` 的 `pe` 函数）——默认 **true**。夹具按代码（`era-fixture.js:596` 的 `config?.useRule !== false`）。另核实：`config.rule` 构造 RegExp 的锚定 ``new RegExp(`^${rule}$`)`` 渲染层与夹具逐字一致。
2. `nextTurnInTrain` 词条（`A-api-docs.md`）：「将 delta 表结算到 **param** 表中」；代码结算进 **palam**（`this.data.palam[e][t] += this.data.delta[e][t]`）。且 `deltabase` → `base` 的结算带 `maxbase` 钳制（`Math.max(Math.min(base+delta, maxbase), 0)`，仅 `maxbase > 0` 时），手册只字未提。
3. `notify` 词条（`A-api-docs.md`）：参数与返回值段落误植了 `printWholeImage` 的文档（`WholeImageConfig`、「显示全图后显示在界面上的行数」）；代码 `notify` 是 `connect("notify", {...})`，无返回值。

## 相关

- 缺陷记录：#135、#136、#137（结论全部直接引用，未重新诊断）
- 同型前例：#21/#22（`addCharacter` 短路）、#129（`input()` 只收已打印按钮）、#130（白名单镜像）
- 修复路径基础设施：`test/helpers/engine-bundle.js`（#35/#67/#91）、`test/engine-contract.test.js`（#91）
