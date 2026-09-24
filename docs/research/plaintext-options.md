# 纯文本选项行普查（`[N] 文字` + `era.input()` 的组合）

对应工单：[issue #530](https://github.com/odradekk/maou_redux/issues/530)（阻断项：
战役招募在真引擎里卡死）。引擎侧结论以 `~/.era-engine/app.asar` 的实际代码为准
（渲染层 `returnFromButton` / `getButtonObject`，压缩版与内嵌可读版逐字比对一致），
手册次之。

## 一、结论摘要

1. **病灶的机制**：引擎的输入校验只认**本轮打印过的按钮快捷键**——渲染层
   `returnFromButton(val)` 先看 `if (useRule)`，正则分支是
   `if (rule.length === undefined) { if (!rule.test(val.toString())) { 报错; return; } }`，
   数组分支是 `else if (rule.length > 0 && rule.indexOf(Number(val)) === -1) { 报错; return; }`；
   两条报错都弹「输入不合法！…」并 `return`——**值不回传游戏**，`inputParam.val`
   也不清空。玩家看到的就是「敲了没反应、画面无新增输出」。
   #129（主菜单 `[109]`）、PR #53（`[100]` 调教按钮）两次是实机确证的形态，
   #530（战役招募）是**推定**同型——见本节第 7 条。
2. **`rule` 的生命周期**（渲染层逐字）：`printButton` / 按钮格到达时
   `getButtonObject` 把 accelerator 推进 `rule`（repeated 快捷键只告警不入集，
   disabled 按钮整体不入集）；**任何一次成功回传**（`input`、`waitAnyKey` 的
   `input({any:true})`、`printAndWait` 的内部等待）都把 `rule` 置空；`clear`
   不碰它。夹具（`test/helpers/era-fixture.js:892-919`，由 #130 实现）已逐字
   镜像这条规则。
3. **还有一条闸门是 `useRule`**：整个校验包在 `if (inputParam.value['useRule'])`
   里，`showInput` 的缺省是 `safeUndefinedCheck(data.config.useRule, true)`。
   游戏侧显式写 `era.input({ useRule: false })` 就**整段跳过白名单**——那种
   消费点上的纯文本选项行**结构性免疫**本病灶，与「本轮有没有按钮」无关。
   面内 **28 行**的消费点就是这个写法（`page-infrastructure.js` 16 行、
   `event-banishment.js` 5 行、`event-public-execution.js` 3 行、
   `event-execution.js` 2 行、`event-grotesque.js` 1 行、
   `page-shop-labo.js` 1 行；逐行标注见扫描器的 `〔useRule:false〕`）。
   项目里这是**在案结论**而不是偶然：`ere/page/page-shop-labo.js:42-47` 写着
   「输入一律按钮化，自由输入用 `useRule: false`……打了按钮就把输入集锁死在
   按钮上，自由输入进不去」。**返工名单必须把这些行排除掉**（§6 已按此改正）。
4. **普查规模**：`ere/` 全目录共 **145 行 / 27 个文件**属于「打印调用的首实参
   字面量里带选项编号（`[1]` 或 `[${index}]` 两种写法）」这个形态（修前是
   153 行 / 29 个文件——本票把 `chara-make.js` 的 2 行、
   `page-chara-info-show.js` 的 5 行、`page-chara-info.js` 的 1 行改成了按钮）。
   清单见第四节，扫描器 `tools/plaintext-options.mjs` 可重跑，计数冻结在
   `tools/plaintext-option-baseline.mjs`（棘轮：只能变短、不许过期失效；
   两个方向各有一条变异条目守着，M11207/M11208）。
5. **本票修掉的**（判断条件见第二节的 A 类）：
   - `ere/chara/chara-make.js` 的招募确认对话 3 + 2 个选项（阻断项本体）；
   - `ere/page/page-chara-info-show.js` 的 5 处（祭品名单的 `[100] 返回` 是
     实测**必然被拒收**的一处——名单轮次的白名单非空，夹具当场复现）；
   - **`ere/page/page-chara-info.js:234` 的魔王行**（第二轮审查查出）：四个
     名单视图的第一行 `[0] 魔王 LV…` 原来是纯文本，而同一轮的白名单是
     `1, 1200, 1300, 1400, 1500, 1600, 1700, 997, 999, 998`——`added_chara_ids()`
     把 0 滤掉了，**没有别的按钮编号是 0**，所以敲 0 被拒收、`:581` 的
     `result === 0`（打开魔王个人信息页）是死支路。这是与 #530 同一病灶的
     活样本，且在战役必经的角色一览界面上（夹具复现：修前抛「输入不合法！
     请输入以下值之一：1, 1200, …」，见 test/page-chara-info.test.js 的
     #530 用例）。
6. **「PR #53 的通则没扫干净」这个前提只对了一半**：剩余 145 行既不是漏扫、
   也不是都安全——**面内**剩余的落在「本轮没有按钮」的轮次里（引擎的自由
   输入通道），或落在 `useRule: false` 的消费点上（第 3 条），其中
   `ere/dungeon/dungeon-after.js` 与 `ere/page/page-dungeon-info2.js` 两处
   还有**在案的有意保留**（#180 的结论，见第二节）。把它们一律按钮化会
   **更坏**：那些界面的多轮 `WAIT` 会清空白名单，早段按钮会被整段拒收。
   `page-chara-info-show.js` 的献祭确认正是「碰巧安全」的活样本：两个选项
   一起退回纯文本时该轮白名单为空、`1`/`0` 走自由输入照样过（M11205 实测），
   但只要同一轮多打一枚按钮（名单的 `[100] 返回`、名单页的魔王行都是），
   它就当场变成死路。
7. **一条必须记下的不确定性**：战役招募那一步的 `rule` 在离线模型里重建为
   **空**（夹具的真实 `input` 也因此放行 `0/1/2/3`），实机却拒收。也就是说
   **离线重建的 `rule` 不完全可信**，本报告第三节的 A/B 分类只能当**指示**、
   不能当**判定条件**：一个站点到底安不安全，只有引擎实测能定。魔王行那一处
   反过来印证了这一点——它在离线重建里是 A 类且被夹具当场拒收，与实机
   一致；战役招募那一步却对不上，两者的差别还没查清。
8. **因此**：本票不扫全库改按钮（会与 #180 的结论和 `useRule: false` 的先例
   冲突，且 145 行分布在 27 个文件、每处都要按界面轮次单独判断）。剩下的
   清单、判断条件与重跑方式就是本报告，建议另开一张普查/返工票按界面逐个过。

## 二、判断条件：什么时候纯文本是对的

`ere/page/page-dungeon-info2.js:331-338`（#180 查实后的在案结论，逐字）：

> `:460 PRINTFORML [{A}] {B}只%MONSTERNAME(A)%`——纯文本 + 自由输入（原作形态）。
> **不**改按钮（PR #53 通则在此处的例外）：本界面的逐层 WAIT（:447）在 ere
> 引擎里会清空按钮白名单（任何一次成功回传都把 rule 置空，waitAnyKey 内部走
> `input({any:true})`），最后一个 WAIT 之前打印的按钮会整段拒收——怪物行改按钮
> 会让早段怪物在实机上不可选。纯文本 + 无按钮轮 = 引擎的自由输入通道
> （`dev-guides/05-interaction.md`），键盘键入 `[A]` 与 `[999]` 全程可达，
> 1:1 于 Emuera 的键盘交互。

`ere/dungeon/dungeon-after.js:14-17` 同款（奖惩两个分支的选项菜单）。

由此得到三类判断条件：

| 类                  | 条件                                                                      | 纯文本是否正确                                                                                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A（死路）**       | 消费这次输入的轮次里，上一次回传之后已打印过按钮，且消费方没关白名单      | **错**。`rule` 非空，编号被拒收。必须改成按钮                                                                                                                                                           |
| **B（自由输入）**   | 该轮没有按钮（或最近的按钮已被 `WAIT`／上一次回传清掉），消费方没关白名单 | **对**。引擎放行自由输入，纯文本是这里唯一可行的形态                                                                                                                                                    |
| **C（白名单关着）** | 消费方传了 `era.input({ useRule: false })`                                | **可按钮化，且要一并保留 `useRule: false`**。校验整段跳过，按钮与自由输入并存（#572 修正：这条原来是「必须保持纯文本」，实为误解——引擎里 `useRule` 只关校验，不封锁按钮；先例 `event-museum.js:83-85`） |

A 类的修法只能是 `printButton` / `printMultiColumns` 的按钮格；正文不写 `[N]`
前缀（引擎按 `showAcc` 自动拼，自带会显示成 `[1] [1] …`，AGENTS.md 硬约束、
PR #30 实机撞见）。B 类**不要**顺手按钮化——#180 的例外正是这么来的；
C 类更不要（按钮会把「敲任意数字」的通道堵死）。

> C 类这一维是第二轮规范审查补上的：判定面的头两版只按「本轮有没有按钮」
> 分类，漏了 `useRule` 这一层——照那个统计方式写返工名单，会把
> `page-infrastructure.js`（面内 16 行、全在 C 类）排进优先按钮化对象，
> 与 `page-shop-labo.js` 的在案结论直接冲突。

## 三、为什么离线守不住这一类

夹具 `input()` 的判断条件（`test/helpers/era-fixture.js:904-919`）与引擎同构：

```js
} else if (input_rules.length > 0 && !input_rules.includes(Number(value))) {
  throw new Error('测试夹具：输入不合法！请输入以下值之一：…');
}
```

`input_rules` **为空时不设限**——这正是引擎的自由输入通道（不是夹具的豁免）。
于是：

- 名单轮次（A 类）能被抓住：那个轮次打印过名单行与六个条件键，
  `test/chara-info-show.test.js` 的 #530 用例在修好之前就是红的，夹具报
  「输入不合法！请输入以下值之一：9, 1000, 1001, 1002, 1003, 1004, 1005」。
- 战役招募那一步（离线重建为 B 类）抓不住：`0/1/2/3` 都能喂进去——**这是
  #530 活到现在的原因**，也是本节标题的由来。

实机与离线模型在这一点上对不上（结论摘要第 6 条）。可能的方向有两个，
都留待引擎实测判定，**不在本票臆断**：

1. 引擎侧另有把 accelerator 推进 `rule` 的路径（离线读源码没找到，但压缩版
   与可读版的 `getButtonObject` 是打印时入集、`clear` 不清空，
   `resetData` 才重置——若渲染层因 `clear` 后的重绘重新入集，就会解释实机）。
2. `ere/chara/chara-make.js:1908` 调 `show_chara_info(newchara, -1, rand_n)`，
   而原作 `target/ERB/キャラ関数/CHAR_MAKE.ERB:150` 传的是 **`-2`**（贡品信息）。
   `-1`（调教信息）多出两处 `await era.waitAnyKey()`。页码取错是**未登记的
   移植偏离**（`page-chara-info-show.js` 文件头的六个页码分支里 `-2` = 贡品时、
   `-1` = 调教时），本票按「不夹带无关修改」未动，登记在此备查。

两者都不影响本票的修法：选项做成按钮后，`1/2/3` 无论 `rule` 里还有什么都在
集内，输入必然回传。

## 四、清单（145 行 / 27 个文件）

计数为**冻结值**（`tools/plaintext-option-baseline.mjs`）；逐行位置用
`node tools/plaintext-options.mjs` 重跑（输出的 `〔useRule:false〕` 标记＝该行属
C 类，消费点关了白名单）。

| 文件                                  | 行数 | 判定要点                                                                                                                                                        |
| ------------------------------------- | ---: | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ere/chara/chara-custom.js`           |    2 | 真选项（性别选择、`[999]` 返回）                                                                                                                                |
| `ere/chara/chara-custom2.js`          |   10 | 真选项（种族/部位/性别选择组，多行拼行）                                                                                                                        |
| `ere/chara/chara-make.js`             |    2 | **已修 5 处后的余项**：`:1821` `[0] 印象 ： `、`:1841` `[1] 发色 ： ` 是形象确认轮的标签式选项（0/1 改性格/发色，100 继续），该轮无按钮                         |
| `ere/dungeon/dungeon-after.js`        |    6 | 真选项；**有意保留纯文本**（文件头 :14-17，#180）                                                                                                               |
| `ere/dungeon/dungeon-battle2.js`      |    2 | 真选项（`[0] 好的 [1] 不要`）                                                                                                                                   |
| `ere/event/event-addict.js`           |    2 | 同上                                                                                                                                                            |
| `ere/event/event-banishment.js`       |    5 | 真选项（流放处置五选一）；**全 5 行属 C 类**（消费点 `useRule: false`）                                                                                         |
| `ere/event/event-ending.js`           |   10 | 真选项（后缀选择的两页：性格 8 项、发色 10 项、`[100] 决定`）                                                                                                   |
| `ere/event/event-execution.js`        |    2 | 真选项（`:113` 的 `[100] 停止`、`:309` 的 `[100] 返回`）；**两行都属 C 类**（之后的下一次输入都传 `useRule: false`；同段的 `[101]` 走数组形态打印，在扫描面外） |
| `ere/event/event-grotesque.js`        |    1 | 真选项（处刑菜单 `[${index}] ${label}`）；**C 类**（消费点 :119 `useRule: false`）                                                                              |
| `ere/event/event-nextday.js`          |    6 | 真选项（三组是非提问）                                                                                                                                          |
| `ere/event/event-public-execution.js` |    3 | 真选项（处刑三选一）；**全 3 行属 C 类**（消费点 :38 `useRule: false`）                                                                                         |
| `ere/event/get-specialtalent.js`      |    2 | 真选项（封印二选一）                                                                                                                                            |
| `ere/kojo/kojo-dungeon-bitch.js`      |    2 | 真选项：`:1651` 的 `[${num}] 卖春积极性 - `（PTJ 菜单行）与 `:1673` 的等级 `[0]`-`[5]`                                                                          |
| `ere/kojo/kojo-dungeon-ravish.js`     |    4 | 真选项（旁观/不要，两处重复段）                                                                                                                                 |
| `ere/kojo/kojo-k10-club.js`           |    4 | 真选项（两处二选一）                                                                                                                                            |
| `ere/page/page-chara-info.js`         |    0 | **A 类死路已修**：名单第一行的魔王行 `[0] …` 曾是纯文本，敲 0 被拒收（结论第 5 条）                                                                             |
| `ere/page/page-chara-shop.js`         |    4 | 真选项（性别、返回、`[0]/[1]` 确认）                                                                                                                            |
| `ere/page/page-dungeon-info2.js`      |    2 | `:339` 怪物行 `[${a}] ${b}只…`（**#180 明文保留**）+ `:346` 的 `[999] 返回`；**有意保留纯文本**（:331-338）                                                     |
| `ere/page/page-infrastructure.js`     |   16 | 真选项（博物馆/牧场两级菜单，含 `:193` 逐展品行）；**全 16 行属 C 类**（四个消费点 :258/:266/:313/:335 都传 `useRule: false`）                                  |
| `ere/page/page-item-shop.js`          |    2 | 真选项（购买确认）                                                                                                                                              |
| `ere/page/page-life-list.js`          |    1 | 真选项（`[0] 是的 [1] 不要`）                                                                                                                                   |
| `ere/page/page-monster-shop.js`       |   12 | 真选项（召唤菜单：性别三选一、种族九选三、返回）                                                                                                                |
| `ere/page/page-shop-labo.js`          |    1 | 真选项（`[0] - 不生成`）；**C 类**（消费点 :2562 `useRule: false`）                                                                                             |
| `ere/system/train/cloth.js`           |    2 | 真选项（洗/不洗）                                                                                                                                               |
| `ere/system/train/com-cloth.js`       |   24 | 真选项（COM110 穿脱衣服大菜单，两页）                                                                                                                           |
| `ere/system/train/com-hardcore.js`    |   17 | 真选项（COM 穿环菜单，两页两态）                                                                                                                                |
| `ere/system/train/com-toy.js`         |    1 | 真选项（满月确认 `[0] 好的 [1] 算了`）                                                                                                                          |

C 类合计 **28 行**（`page-infrastructure` 16、`event-banishment` 5、
`event-public-execution` 3、`event-execution` 2、`event-grotesque` 1、
`page-shop-labo` 1 —— 按扫描器的标记统计）。**没有「纯说明文字」的误判**：
模板插值里的下标（`${items[0]}`、`pm[0]`、`talent_multipliers[310]` 一类）已在
扫描器里剥掉；插值编号那一支还要求「以 `[` 开头且后面跟正文」，把
`[${talentname(243 + count)}]`（条件提示的标签）与 `体力[${'.'.repeat(32)}]`
（死亡提示的装饰括号）挡在外面；数组形态 `era.print([{content: '[8] …'}])`
是有意排除的排版片段（原作本身用 PRINTPLAINFORM）——理由都写在
`tools/plaintext-options.mjs` 的判定面注释里。

### 扫描面外的同类（已核出 17 行，不在棘轮里）

判定面是「`era.print` / `println` / `printAndWait` 的**首实参字面量**」，
所以下面三种写法漏在外面（第二轮审查又查出 `ere/chara/` 的三处：选项文本拼进
字符串变量、再整行 `era.print`，扫描器只吃打印调用的首实参字面量，必然漏掉）。
本次逐个核过（用临时核查脚本比对「字面量含 `[N]`」与扫描命中，再逐处读上下文）：

| 位置                                          | 行数 | 形态                                                                                                                            | 判定                                                                                                                          |
| --------------------------------------------- | ---: | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `ere/data/ending-scripts.js`                  |   11 | 结局脚本数据表的 `['w', '[1] 点头 [2] 摇头']` 类条目，由渲染器逐条 `era.print` 后等输入                                         | 真选项。该表是数据不是打印调用点，要不要按钮化取决于渲染器的白名单状态，需按结局流程单独看                                    |
| `ere/chara/chara-and-hair.js:226`             |    1 | `choose_charasteristic`：`row += \`[${pad_left(String(i),2)}] …\``循环拼行，:230/:233`era.print(row)`后 :238`await era.input()` | 真选项（B 类：该轮没有按钮）。**它正是 `chara-make.js` 形象确认轮调的**，与面内的 `chara-make.js:1821/:1841` 是同一轮的选项组 |
| `ere/chara/chara-and-hair.js:327`             |    1 | `choose_haircolor` 同款（拼行 → 打印 → 输入）                                                                                   | 真选项（B 类）                                                                                                                |
| `ere/chara/chara-custom.js:131`               |    1 | `build_rows` 拼 `[NN] 名`，由 `char_create` 打印后等输入                                                                        | 真选项（B 类）                                                                                                                |
| `ere/event/event-ending.js:537`               |    1 | 选项文本是 `lines` 数组的元素，经 `era.print(line)` + `waitAnyKey` 循环打印                                                     | 真选项（B 类：循环里每行都隔一次 `WAIT`，白名单为空）                                                                         |
| `ere/event/event-execution.js:116`            |    1 | 数组形态 `era.print([{content: '[101] 水晶球记录'}])`（同段的 `[100] 停止` 是首实参字面量，在扫描面内）                         | 真选项                                                                                                                        |
| `ere/page/components/chara-info-title.js:151` |    1 | 数组形态 `{ content: '[8] 一人称重设 ' }`                                                                                       | **有意不是按钮**：原作此处用 `PRINTPLAINFORM`，是页码提示文字，不由 INPUT 消费（该行注释已写明）                              |

合计 **17 行**（11 数据 + 6 代码）。把数据表也纳入棘轮会把「数据」和「打印调用点」
混在一个判定面里，噪声大于收益；后续返工票按界面过的时候一并处理这张清单即可
（`chara-and-hair.js` 的两处与 `chara-custom.js` 那一处都在 B 类，与各自的界面
一起按钮化即可；`event-ending.js:537` 与 `event-execution.js:116` 同理）。

### 本票不改、但值得另开票的一处显示缺陷

`ere/page/page-chara-info.js` 的角色行按钮（`print_chara_row`，:310-336）正文写的是
`` `[${cid}]` ``，而引擎按 `showAcc` 会再拼一层——实测实显 `[1] [1] 甲 LV…`
（`logs/` 里的探针输出；夹具 `rendered` 字段可复现）。这是 PR #30 撞过的那条
AGENTS.md 硬约束，属**显示**缺陷、与 #530 的输入死路不同类；`page-chara-info.test.js`
的行筛选用的是 `text`（`/^\[\d+\]$/`），所以现有用例抓不住它。本票只把新增的魔王行
按正确写法实现（正文空串、编号由引擎拼），**没有**动其余行按钮的正文——那会改变
整屏 24 行的显示，而该文件的文件头明确把这一屏的排版留给引擎实测核对
（:32-38「已知局限，留给真正在引擎里核对排版时调整」）。建议随排版核对一起处理。

## 五、重跑与守护

```
node tools/plaintext-options.mjs            # 打印清单（含每文件条数与 useRule 标记）
node tools/plaintext-options.mjs --write    # 重生成棘轮基线
node tools/run-node.mjs -- --test test/plaintext-option.test.js
```

`test/plaintext-option.test.js` 两个方向都判红：新增一行即红；修掉一行而基线
没同步删数也红。**计数不符时不要直接改基线**——先按第二节的判断条件判断新增的
是 A/B/C 哪一类：A 类改成 `printButton` / `printMultiColumns` 的按钮格；B 类保持
纯文本并在判断条件里说明该轮为什么没有按钮；C 类保持纯文本（消费点关了白名单）。
基线是「文件 → 条数」的粒度，同一文件里删一行再加一行不会红——这是计数粒度
的已知限度，理由与替代方案写在 `tools/plaintext-option-baseline.mjs` 头部。

## 六、后续建议

按界面轮次逐个过 A/B/C（一次一个界面，各配一条走夹具真实 `input` 的用例）。
**先排除 C 类**：`page-infrastructure.js`（16 行，四个消费点全传
`useRule: false`）、`event-banishment.js`（5 行）、`event-public-execution.js`
（3 行）、`event-grotesque.js`（1 行）、`page-shop-labo.js` 的 `:2562` 那一行
——这些行按钮化会把自由输入锁死，`page-shop-labo.js:42-47` 有在案结论，
**不改**。剩下的按「没有多轮 WAIT、按钮化不会自我矛盾」排序：
`event-ending.js`、`page-monster-shop.js`、`com-cloth.js`、`com-hardcore.js`
这几处行数最多、也最像常规菜单；`dungeon-after.js` 与 `page-dungeon-info2.js`
按 #180 维持现状（前者已在文件头登记、后者的怪物行现在计进棘轮了，返工时要把
`:331-338` 的结论一起看）。

### #572 的第一轮结果（本节的两条修正）

[#572](https://github.com/odradekk/maou_redux/issues/572) 按
`rg "era\.print\(['\`]\[[0-9]+\] " ere/` 的判定面（17 个文件、75 行）逐行过了
一轮，结论有三条修正本节的判断：

1. **C 类不是「必须保持纯文本」。** 引擎渲染层里 `useRule: false` 只关掉
   `returnFromButton` 的校验，**并不妨碍按钮**——打按钮与自由输入可以并存
   （先例 `ere/event/event-museum.js:83-85`：按钮 + `useRule: false` 留住
   未显示的 100）。所以 C 类的正确处置是「按钮化 + 保留 `useRule: false`」，
   而不是「一个按钮都不打」。本节第 3 条与 §6 的「先排除 C 类」按此修正。
2. **「多轮 WAIT」要看 WAIT 与菜单的先后。** 引擎按 `valCount < buttonValCount`
   禁用早先的按钮（`getButtonObject`），所以 WAIT 在菜单**之前**的界面
   （`dungeon-after.js` 的奖惩两臂：`:145/:147`、`:534/:536` 两个 WAIT 都在
   选项之前）按钮照常可点——`dungeon-after.js` 由 #180 维持纯文本的理由
   不成立，已在 #572 改正；只有「WAIT 夹在选项之间」（`page-dungeon-info2.js`
   的逐层 WAIT）才必须保持纯文本。
3. **列表轮不要只按钮化收尾项。** 商品/候选人/祭品这类「格行拼行 + 一个
   `[999] 返回`」的轮次里，单把 `[999]` 打成按钮会把白名单收成 999、
   格行的编号（100-199、`[NN]` 候选人）当场拒收。这类要按钮化就得整轮重排
   （多列对齐改 `printMultiColumns` 的按钮格），#572 按「其他」保留现状：
   `page-chara-shop.js:251`、`page-monster-shop.js:389/:557`、
   `event-execution.js:314`、`page-dungeon-info2.js:390`。

棘轮基线随之从 143 行 / 26 文件收到 **66 行 / 16 文件**；剩下的大头仍是面外的
`com-cloth.js`（24 行）与 `com-hardcore.js`（17 行）等按界面继续。

`ere/chara/chara-and-hair.js` 的两处（形象确认轮的选项组）与
`chara-custom.js:131` 属 B 类，跟着各自的界面一起按钮化即可。

战役招募那一步的实机复现与 `-1`／`-2` 页码偏离（第三节）应由 #530 的验收
方在引擎里一并确认——**#530 合入即关**，这条偏离若需要承接，要另开票或写进
#530 的完成评论（不夹带进本票是对的）。
