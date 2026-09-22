# 纯文本选项行普查（`[N] 文字` + `era.input()` 的组合）

对应工单：[issue #530](https://github.com/odradekk/maou_redux/issues/530)（阻断项：
战役招募在真引擎里卡死）。引擎侧结论以 `~/.era-engine/app.asar` 的实际代码为准
（渲染层 `returnFromButton` / `getButtonObject`，压缩版与内嵌可读版逐字比对一致），
手册次之。

## 一、结论摘要

1. **病灶的机制**：引擎的输入校验只认**本轮打印过的按钮快捷键**。渲染层
   `returnFromButton(val)` 在 `Array.isArray(rule) && rule.length > 0 &&
rule.indexOf(Number(val)) === -1` 时弹「输入不合法！请输入以下值之一：…」
   并 `return`——**值不回传游戏**，`inputParam.val` 也不清空。玩家看到的就是
   「敲了没反应、画面无新增输出」。这就是 #129（主菜单 `[109]`）、PR #53
   （`[100]` 调教按钮）、#530（战役招募）三次发作的共同形态。
2. **`rule` 的生命周期**（渲染层逐字）：`printButton` / 按钮格到达时
   `getButtonObject` 把 accelerator 推进 `rule`（repeated 快捷键只告警不入集，
   disabled 按钮整体不入集）；**任何一次成功回传**（`input`、`waitAnyKey` 的
   `input({any:true})`、`printAndWait` 的内部等待）都把 `rule` 置空；`clear`
   不碰它。夹具（`test/helpers/era-fixture.js:892-919`，由 #130 落地）已逐字
   镜像这条规则。
3. **普查规模**：`ere/` 全目录共 **142 行 / 27 个文件**属于「`era.print` 的
   字面量里含 `[数字]`、且随后有 `era.input()`」这个形态（修前是 149 行 /
   28 个文件——本票把 `chara-make.js` 的 2 行、`page-chara-info-show.js` 的
   5 行改成了按钮）。清单见第四节，扫描器 `tools/plaintext-options.mjs` 可
   重跑，计数冻结在 `tools/plaintext-option-baseline.mjs`（棘轮：只能变短、
   不许过期失效；两个方向各有一条变异条目守着，M11207/M11208）。
4. **本票修掉的**（第 7 行那类「同一轮里已有按钮」的死路）：
   - `ere/chara/chara-make.js` 的招募确认对话 3 + 2 个选项（阻断项本体）；
   - `ere/page/page-chara-info-show.js` 的 5 处（祭品名单的 `[100] 返回` 是
     实测**必然被拒收**的一处——名单轮次的白名单非空，夹具当场复现）。
5. **「PR #53 的通则没扫干净」这个前提只对了一半**：剩余 142 行既不是漏扫、
   也不是都安全——它们落在**本轮没有按钮**的轮次里（引擎的自由输入通道），
   其中 `ere/dungeon/dungeon-after.js` 与 `ere/page/page-dungeon-info2.js`
   两处还有**在案的有意保留**（#180 的裁定，见第二节）。把它们一律按钮化会
   **更坏**：那些界面的多轮 `WAIT` 会清空白名单，早段按钮会被整段拒收。
   `page-chara-info-show.js` 的献祭确认正是「碰巧安全」的活样本：两个选项
   一起退回纯文本时该轮白名单为空、`1`/`0` 走自由输入照样过（M11205 实测），
   但只要同一轮多打一枚按钮（名单的 `[100] 返回` 就是），它就当场变成死路。
6. **一条必须记下的不确定性**：战役招募那一步的 `rule` 在离线模型里重建为
   **空**（夹具的真实 `input` 也因此放行 `0/1/2/3`），实机却拒收。也就是说
   **离线重建的 `rule` 不完全可信**，本报告第三节的 A/B 分类只能当**指示**、
   不能当**判据**：一个站点到底安不安全，只有引擎实测能定。
7. **因此**：本票不扫全库改按钮（会与 #180 的裁定冲突，且 142 行分布在 27 个
   文件、每处都要按界面轮次单独判断）。剩下的清单、判据与重跑方式就是本报告，
   建议另开一张普查/整改票按界面逐个过。

## 二、判据：什么时候纯文本是对的

`ere/page/page-dungeon-info2.js:331-338`（#180 查实后的在案裁定，逐字）：

> `:460 PRINTFORML [{A}] {B}只%MONSTERNAME(A)%`——纯文本 + 自由输入（原作形态）。
> **不**改按钮（PR #53 通则在此处的例外）：本界面的逐层 WAIT（:447）在 ere
> 引擎里会清空按钮白名单（任何一次成功回传都把 rule 置空，waitAnyKey 内部走
> `input({any:true})`），最后一个 WAIT 之前打印的按钮会整段拒收——怪物行改按钮
> 会让早段怪物在实机上不可选。纯文本 + 无按钮轮 = 引擎的自由输入通道
> （`dev-guides/05-interaction.md`），键盘键入 `[A]` 与 `[999]` 全程可达，
> 1:1 于 Emuera 的键盘交互。

`ere/dungeon/dungeon-after.js:14-17` 同款（奖惩两臂的选项菜单）。

由此得到两类判据：

| 类                | 条件                                                    | 纯文本是否正确                                 |
| ----------------- | ------------------------------------------------------- | ---------------------------------------------- |
| **A（死路）**     | 消费这次输入的轮次里，上一次回传之后已打印过按钮        | **错**。`rule` 非空，编号被拒收。必须改成按钮  |
| **B（自由输入）** | 该轮没有按钮（或最近的按钮已被 `WAIT`／上一次回传清掉） | **对**。引擎放行自由输入，纯文本是唯一可行形态 |

A 类的修法只能是 `printButton` / `printMultiColumns` 的按钮格；正文不写 `[N]`
前缀（引擎按 `showAcc` 自动拼，自带会显示成 `[1] [1] …`，AGENTS.md 硬约束、
PR #30 实机撞见）。B 类**不要**顺手按钮化——#180 的例外正是这么来的。

## 三、为什么离线守不住这一类

夹具的 `input()` 判据（`test/helpers/era-fixture.js:904-919`）与引擎同构：

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
   移植偏离**（`page-chara-info-show.js` 文件头的六个页码臂里 `-2` = 贡品时、
   `-1` = 调教时），本票按「不夹带无关修改」未动，登记在此备查。

两者都不影响本票的修法：选项做成按钮后，`1/2/3` 无论 `rule` 里还有什么都在
集内，输入必然回传。

## 四、清单（142 行 / 27 个文件）

计数为**冻结值**（`tools/plaintext-option-baseline.mjs`）；逐行位置用
`node tools/plaintext-options.mjs` 重跑。

| 文件                                  | 行数 | 判定要点                                                                                                                                |
| ------------------------------------- | ---: | --------------------------------------------------------------------------------------------------------------------------------------- |
| `ere/chara/chara-custom.js`           |    2 | 真选项（性别选择、`[999]` 返回）                                                                                                        |
| `ere/chara/chara-custom2.js`          |   10 | 真选项（种族/部位/性别选择组，多行拼行）                                                                                                |
| `ere/chara/chara-make.js`             |    2 | **已修 5 处后的余项**：`:1821` `[0] 印象 ： `、`:1841` `[1] 发色 ： ` 是形象确认轮的标签式选项（0/1 改性格/发色，100 继续），该轮无按钮 |
| `ere/dungeon/dungeon-after.js`        |    6 | 真选项；**有意保留纯文本**（文件头 :14-17，#180）                                                                                       |
| `ere/dungeon/dungeon-battle2.js`      |    2 | 真选项（`[0] 好的 [1] 不要`）                                                                                                           |
| `ere/event/event-addict.js`           |    2 | 同上                                                                                                                                    |
| `ere/event/event-banishment.js`       |    5 | 真选项（流放处置五选一）                                                                                                                |
| `ere/event/event-ending.js`           |   10 | 真选项（后缀选择的两页：性格 8 项、发色 10 项、`[100] 决定`）                                                                           |
| `ere/event/event-execution.js`        |    2 | 真选项（`:113` 的 `[100] 停止`；同段的 `[101]` 走数组形态打印，在扫描面外）                                                             |
| `ere/event/event-nextday.js`          |    6 | 真选项（三组是非提问）                                                                                                                  |
| `ere/event/event-public-execution.js` |    3 | 真选项（处刑三选一）                                                                                                                    |
| `ere/event/get-specialtalent.js`      |    2 | 真选项（封印二选一）                                                                                                                    |
| `ere/kojo/kojo-dungeon-bitch.js`      |    1 | 真选项（卖春积极性等级 `[0]`-`[5]`）                                                                                                    |
| `ere/kojo/kojo-dungeon-ravish.js`     |    4 | 真选项（旁观/不要，两处重复段）                                                                                                         |
| `ere/kojo/kojo-k10-club.js`           |    4 | 真选项（两处二选一）                                                                                                                    |
| `ere/page/page-chara-info.js`         |    1 | 真选项（名单里的魔王行 `[0] …`）                                                                                                        |
| `ere/page/page-chara-shop.js`         |    4 | 真选项（性别、返回、`[0]/[1]` 确认）                                                                                                    |
| `ere/page/page-dungeon-info2.js`      |    1 | `[999] 返回`；**有意保留纯文本**（:331-338，#180）                                                                                      |
| `ere/page/page-infrastructure.js`     |   15 | 真选项（博物馆/牧场两级菜单，编号含 `[50]/[51]/[99]/[100]`）                                                                            |
| `ere/page/page-item-shop.js`          |    2 | 真选项（购买确认）                                                                                                                      |
| `ere/page/page-life-list.js`          |    1 | 真选项（`[0] 是的 [1] 不要`）                                                                                                           |
| `ere/page/page-monster-shop.js`       |   12 | 真选项（召唤菜单：性别三选一、种族九选三、返回）                                                                                        |
| `ere/page/page-shop-labo.js`          |    1 | 真选项（`[0] - 不生成`）                                                                                                                |
| `ere/system/train/cloth.js`           |    2 | 真选项（洗/不洗）                                                                                                                       |
| `ere/system/train/com-cloth.js`       |   24 | 真选项（COM110 穿脱衣服大菜单，两页）                                                                                                   |
| `ere/system/train/com-hardcore.js`    |   17 | 真选项（COM 穿环菜单，两页两态）                                                                                                        |
| `ere/system/train/com-toy.js`         |    1 | 真选项（满月确认 `[0] 好的 [1] 算了`）                                                                                                  |

**没有「纯说明文字」的误判**：模板插值里的下标（`${items[0]}`、`pm[0]`、
`talent_multipliers[310]` 一类）已在扫描器里剥掉；数组形态
`era.print([{content: '[8] 一人称重设 '}])` 是排版片段（原作本身用
PRINTPLAINFORM，不由 INPUT 消费），也在扫描面外——这是**有意收窄**，理由写在
`tools/plaintext-options.mjs` 的判定面注释里。

### 扫描面外的同类（已核出 14 行，不在棘轮里）

判定面是「`era.print` / `println` / `printAndWait` 的**首实参字面量**」，
所以下面三种写法漏在外面。它们是同一病灶，只是选项文本不落在那一个字面量上，
本次逐个核过（用 `logs/` 下的临时核查脚本比对「字面量含 `[N]`」与扫描命中，
再逐处读上下文）：

| 位置                                          | 行数 | 形态                                                                                                    | 判定                                                                                             |
| --------------------------------------------- | ---: | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `ere/data/ending-scripts.js`                  |   11 | 结局脚本数据表的 `['w', '[1] 点头 [2] 摇头']` 类条目，由渲染器逐条 `era.print` 后等输入                 | 真选项。该表是数据不是打印调用点，要不要按钮化取决于渲染器的白名单状态，需按结局流程单独看       |
| `ere/event/event-ending.js:537`               |    1 | 选项文本是 `lines` 数组的元素，经 `era.print(line)` + `waitAnyKey` 循环打印                             | 真选项（B 类：循环里每行都隔一次 `WAIT`，白名单为空）                                            |
| `ere/event/event-execution.js:116`            |    1 | 数组形态 `era.print([{content: '[101] 水晶球记录'}])`（同段的 `[100] 停止` 是首实参字面量，在扫描面内） | 真选项                                                                                           |
| `ere/page/components/chara-info-title.js:151` |    1 | 数组形态 `{ content: '[8] 一人称重设 ' }`                                                               | **有意不是按钮**：原作此处用 `PRINTPLAINFORM`，是页码提示文字，不由 INPUT 消费（该行注释已写明） |

把数据表也纳入棘轮会把「数据」和「打印调用点」混在一个判定面里，噪声大于收益；
后续整改票按界面过的时候一并处理这张清单即可（`event-ending.js:537` 与
`event-execution.js:116` 属 B 类，可与各自的界面一起按钮化）。

## 五、重跑与守护

```
node tools/plaintext-options.mjs            # 打印清单（含每文件条数）
node tools/plaintext-options.mjs --write    # 重生成棘轮基线
node tools/run-node.mjs -- --test test/plaintext-option.test.js
```

`test/plaintext-option.test.js` 两个方向都判红：新增一行即红；修掉一行而基线
没同步删数也红。**计数不符时不要直接改基线**——先按第二节的判据判断新增的是
选项还是排版文字，是选项就改成 `printButton` / `printMultiColumns` 的按钮格。

## 六、后续建议

按界面轮次逐个过 A/B（一次一个界面，各配一条走夹具真实 `input` 的用例）：
先做**没有多轮 WAIT**、按钮化不会自我矛盾的界面（`event-ending.js`、
`page-monster-shop.js`、`page-infrastructure.js`、`com-cloth.js`、
`com-hardcore.js` 这几处行数最多、也最像常规菜单），`dungeon-after.js` 与
`page-dungeon-info2.js` 按 #180 维持现状并在扫描器里登记豁免理由。

战役招募那一步的实机复现与 `-1`／`-2` 页码偏离（第三节）应由 #530 的验收
方在引擎里一并确认。
