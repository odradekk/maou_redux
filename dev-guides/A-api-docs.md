---
title: '#A API 文档'
---

# 安装说明

下载 [SDK脚本](https://gitgud.io/umaera/engine/era-electron/-/blob/master/sdk/era-electron.js)，放置到游戏项目下的ere文件夹中。

# 使用示例

```javascript
// 引入 SDK
const era = require('#/era-electron');

// 通过 era 对象调用 API
era.println();

// 或者通过解构赋值语法引入
const { println } = require('#/era-electron');
println();

// 解构赋值的同时改名
const { println: era_println } = require('#/era-electron');
era_println();
```

# 类型定义

## ButtonConfig

用于控制按钮输出的对象，用于 [printButton](#printbuttoncontent-accelerator-config)、[printMultiColumns](#printmulticolumnscolumnobjects-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中。

该对象具有以下可选属性：

- align
    - **类型**：`'left'|'center'|'right'`
    - **描述**：按钮的对齐方式。
    - **默认值**：跟随 [setAlign](#setaligntextalign)。
- badge
    - **类型**：`'dot'|string`
    - **描述**：按钮的 ~~吧唧~~ 徽章，在按钮以按钮形式输出时会在右上角额外显示的信息，`'dot'`时就是单纯的一个点，其他字符串则会显示对应的信息，如果不填就不会显示。
    - **默认值**：`undefined`
- buttonType
    - **类型**：`'primary'|'success'|'warning'|'danger'|'info'|''`
    - **描述**：按钮颜色的几种预设类型，六种取值分别对应蓝色、绿色、黄色、红色、灰色和白色；以按钮形式输出时默认值是白色，以选项形式输出时默认值是黄色。
    - **默认值**：`'warning'`
- color
    - **类型**：string
    - **描述**：按钮的颜色，可以设置为预设类型之外的颜色，但注意和 isButton 不会同时生效（isButton 为 `true` 时会严格按照buttonType设置颜色）。
    - **默认值**：`undefined`
- disabled
    - **类型**：boolean
    - **描述**：是否禁用按钮，被禁用时按钮无法被点击，输入对应的快捷键也不会返回给游戏脚本。
    - **默认值**：`false`
- disableContinue
    - **类型**：boolean
    - **描述**：_（PC 引擎 4.3.0、安卓引擎 1.2.3 及以上版本）_ 是否禁用自动快进，禁用自动快进时会停止自动快进。
    - **默认值**：`false`
- disableWarning
    - **类型**：boolean
    - **描述**：如果快捷键重复，是否禁用警告，如果是否则会在控制台输出相应的报错信息，详情见 [#7 调试与控制台](./07-debug)，默认值为否。
    - **默认值**：`false`
- inTextAlign
    - **类型**：`'left'|'center'|'right'`
    - **描述**：按钮内文本的对齐方式，和 align 的取值范围相同，但是默认值是居中
    - **默认值**：`'center'`
- isButton
    - **类型**：boolean
    - **描述**：是否以按钮形式输出按钮，取 `true` 时输出为按钮，取默认值（`false`）时会输出为选项（链接）。
    - **默认值**：`false`
- offset
    - **类型**：number，0-23
    - **描述**：按钮的偏移量。
    - **默认值**：跟随 [setOffset](#setoffsetoffset)。
- showAcc
    - **类型**：boolean
    - **描述**：是否显示快捷键，为是时按钮文本显示为 `[快捷键] 按钮文本`，否则显示为 `[按钮文本]`。
    - **默认值**：在 PC 引擎中为 `true`，在安卓引擎中恒为 `false`。
- title
    - **类型**：string
    - **描述**：按钮的悬浮提示（3.5.0加入）。
    - **默认值**：`undefined`。
- width
    - **类型**：number，1-24
    - **描述**：按钮的宽度。
    - **默认值**：跟随 [setWidth](#setwidthwidth)。

该对象的使用案例可见 [#6 输出](./06-output#eraprintbutton)。

## ButtonObject

[printMultiColumns](#printmulticolumnscolumnobjects-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中用于控制显示对象的 [网格对象](./08-ui#用对象表示显示内容) 之一。

该对象具有以下属性：

- accelerator
    - **类型**：number
    - **描述**：按钮的快捷键。
    - **默认值**：必选属性，无默认值。
- config（可选）
    - **类型**：[ButtonConfig](#buttonconfig)
    - **描述**：按钮显示的其他可选项。
    - **默认值**：`{}`，即空的 [ButtonConfig](#buttonconfig)。
- content
    - **类型**：string
    - **描述**：按钮的文本内容。
    - **默认值**：必选属性，无默认值。
- type
    - **类型**：`'button'`
    - **描述**：该网格对象的类型。
    - **默认值**：必选属性，`'button'`。

## ColumnConfig

[printMultiColumns](#printmulticolumnscolumnobjects-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中用于控制大网格内小网格的显示方式的对象。

该对象具有以下可选属性：

- gutter
    - **类型**：number
    - **描述**：设置同一行内网格的间距，单位为px（像素）。
    - **默认值**：0
- horizontalAlign
    - **类型**：`'start'|'center'|'end'|'space-between'|'space-around'|'space-evenly'`
    - **描述**：设置网格的横向对齐方式，上述六种取值分别对应左对齐、居中、右对齐、无边距等距分散、半边距等距分散、完全等距分散。
    - **默认值**：`'start'`
- offset
    - **类型**：number，0-23
    - **描述**：大网格的偏移量。
    - **默认值**：跟随 [setOffset](#setoffsetoffset)。
- verticalAlign
    - **类型**：`'top'|'middle'|'bottom'`
    - **描述**：设置网格的纵向对齐方式，上述三种取值分别对应顶部对齐、垂直居中、底部对齐。
    - **默认值**：`'top'`
- width
    - **类型**：number，1-24
    - **描述**：大网格的宽度。
    - **默认值**：跟随 [setWidth](#setwidthwidth)。

该对象的使用案例可见 [#8 排版](./08-ui#config-参数)。

## ColumnObject

[printMultiColumns](#printmulticolumnscolumnobjects-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中用于表示大网格的网格对象。

该对象具有以下属性：

- columns
    - **类型**：[GridObject](#gridobject)[]
    - **描述**：大网格包含的网格对象数组。
    - **默认值**：`[]`，即空的数组。
- config（可选）
    - **类型**：[ColumnConfig](#columnconfig)
    - **描述**：控制大网格内小网格的显示方式的对象。
    - **默认值**：`{}`，即空的 [ColumnConfig](#columnconfig)。

## DividerConfig

用于控制按钮输出的对象，用于 [drawLine](#drawlineconfig)、[printMultiColumns](#printmulticolumnscolumnobjects-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中。

该对象具有以下可选属性：

- content
    - **类型**：string
    - **描述**：显示在分割线上的文本。
    - **默认值**：`undefined`
- position
    - **类型**：`'left'|'center'|'right'`
    - **描述**：分割线上文本的位置。
    - **默认值**：`'center'`
- isSolid
    - **类型**：boolean
    - **描述**：控制分割线是实线还是虚线，默认值是 `false`（虚线）
    - **默认值**：`false`
- offset
    - **类型**：number，0-23
    - **描述**：分割线的偏移量。
    - **默认值**：跟随 [setOffset](#setoffsetoffset)。
- width
    - **类型**：number，1-24
    - **描述**：分割线的宽度。
    - **默认值**：跟随 [setWidth](#setwidthwidth)。

## DividerObject

[printMultiColumns](#printmulticolumnscolumnobjects-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中用于控制显示对象的 [网格对象](./08-ui#用对象表示显示内容) 之一。

该对象具有以下属性：

- config（可选）
    - **类型**：[DividerConfig](#dividerconfig)
    - **描述**：分割线显示的其他可选项。
    - **默认值**：`{}`，即空的 [DividerConfig](#dividerconfig)。
- type
    - **类型**：`'divider'`
    - **描述**：该网格对象的类型。
    - **默认值**：必选属性，`'divider'`。

## GridObject

[printMultiColumns](#printmulticolumnscolumnobjects-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中用于控制显示对象的 [网格对象](./08-ui#用对象表示显示内容)。

可能取值为 [ButtonObject](#buttonobject)、[DividerObject](#dividerobject)、[ImageObject](#imageobject)、[ProgressObject](#progressobject)、[TextObject](#textconfig) 或 [WholeImageObject](#wholeimageobject)。

## ImageObject

[printMultiColumns](#printmulticolumnscolumnobjects-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中用于控制显示对象的 [网格对象](./08-ui#用对象表示显示内容) 之一。

该对象具有以下属性：

- names
    - **类型**：`string|string[]`
    - **描述**：要显示的切分图的注册名，为数组时会显示堆叠的多张图片，靠前的置于底部。
    - **默认值**：必选属性，无默认值。
- type
    - **类型**：`'image'`
    - **描述**：该网格对象的类型。
    - **默认值**：必选属性，`'image'`。

## PrintedSpan

[print](#printcontent-config) 和 [printAndWait](#printandwaitcontent-config) 等 API 中、[TextContent](#textcontent) 等类型中用于控制输出文本的对象。

该对象具有以下属性：

- color（可选）
    - **类型**：string
    - **描述**：该段文本的颜色。
    - **默认值**：`undefined`
- content
    - **类型**：string
    - **描述**：该段文本的内容。
    - **默认值**：必选属性，无默认值。
- display（可选）
    - **类型**：string
    - **描述**：该段文本的显示方式，一般设置为`'inline-block'`使这段文本不会自动换行。
    - **默认值**：`undefined`
- fontSize（可选）
    - **类型**：string
    - **描述**：字号，带有单位的数字，单位可以是px（像素）、em和rem等，比较常用的是px和rem，其中rem是EraElectron引擎推荐的单位，1rem恒等于游戏配置中设置的字号，2rem会是游戏配置中设置的字号的2倍，以此类推，因此以rem为单位设置字号可以使字号随游戏配置中的设置而变化。
    - **默认值**：`'1rem'`
- fontStyle（可选）
    - **类型**：string
    - **描述**：文本样式，主要用于设置斜体文本，取 `'italic'` 或 `'oblique'` 时会使该段文本显示为斜体，`'oblique'` 还可以带一个用于设置倾斜度的参数（单位为reg，角度），如 `'oblique 10deg'`。
    - **默认值**：`undefined`
- fontWeight（可选）
    - **类型**：string
    - **描述**：文本的粗细程度，设置为 `'bold'` 时就是粗体。
    - **默认值**：`undefined`
- title（可选）
    - **类型**：string
    - **描述**：文本的注释，会在鼠标悬浮在这段文字一段时间后在文字附近弹出悬浮框显示出来，在其中输入 `'\n'` 可以换行。
    - **默认值**：`undefined`
- url（可选）
    - **类型**：string
    - **描述**：网址，使该段文本变成超链接，点击后会在默认浏览器中打开。
    - **默认值**：`undefined`

## ProgressConfig

用于控制进度条输出的对象，用于 [printProgress](#printprogresspercentage-incontent-outcontent-config)、[printMultiColumns](#printmulticolumnscolumnobjects-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中。

该对象具有以下可选属性：

- align
    - **类型**：`'left'|'center'|'right'`
    - **描述**：进度条网格内，紧跟进度条的文本的对齐方式。
    - **默认值**：跟随 [setAlign](#setaligntextalign)。
- barWidth
    - **类型**：number，1-24
    - **描述**：进度条在进度条和紧跟文本的总宽度中所占的宽度，24为没有紧跟的文本，进度条占满这个网格。
    - **默认值**：24
- color
    - **类型**：string
    - **描述**：进度条的颜色。
    - **默认值**：`'#5a9cf8'`
- fontColor
    - **类型**：string
    - **描述**：紧跟进度条的文本的颜色。
    - **默认值**：`undefined`
- height
    - **类型**：number，6-30
    - **描述**：进度条的高度，单位为px（像素）。
    - **默认值**：24
- offset
    - **类型**：number，0-23
    - **描述**：进度条的偏移量。
    - **默认值**：跟随 [setOffset](#setoffsetoffset)。
- width
    - **类型**：number，1-24
    - **描述**：进度条的宽度。
    - **默认值**：跟随 [setWidth](#setwidthwidth)。

该对象的使用案例可见 [#6 输出](./06-output#eraprintprogress)。

## ProgressObject

[printMultiColumns](#printmulticolumnscolumnobjects-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中用于控制显示对象的 [网格对象](./08-ui#用对象表示显示内容) 之一。

该对象具有以下属性：

- config（可选）
    - **类型**：[ProgressConfig](#progressconfig)
    - **描述**：进度条显示的其他可选项。
    - **默认值**：`{}`，即空的 [ProgressConfig](#progressconfig)。
- inContent
    - **类型**：string
    - **描述**：进度条内的文字。
    - **默认值**：`''`
- outContent
    - **类型**：string
    - **描述**：紧跟进度条的文字，仅在 config.barWidth 小于 24 时显示。
    - **默认值**：`''`
- percentage
    - **类型**：number，0-100
    - **描述**：进度条的进度，表示进度条的进度百分比。
    - **默认值**：必选属性，无默认值。
- type
    - **类型**：`'progress'`
    - **描述**：该网格对象的类型。
    - **默认值**：必选属性，`'progress'`。

## TextConfig

用于控制进度条输出的对象，用于 [print](#printcontent-config)、[printMultiColumns](#printmulticolumnscolumnobjects-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中。

该对象具有以下可选属性：

- align
    - **类型**：`'left'|'center'|'right'`
    - **描述**：网格内文本的对齐方式。
    - **默认值**：跟随 [setAlign](#setaligntextalign)。
- color
    - **类型**：string
    - **描述**：文本的颜色。
    - **默认值**：`'white'`
- fontSize
    - **类型**：string
    - **描述**：字号，带有单位的数字，单位可以是px（像素）、em和rem等，比较常用的是px和rem，其中rem是EraElectron引擎推荐的单位，1rem恒等于游戏配置中设置的字号，2rem会是游戏配置中设置的字号的2倍，以此类推，因此以rem为单位设置字号可以使字号随游戏配置中的设置而变化。
    - **默认值**：`'1rem'`
- isParagraph
    - **类型**：boolean
    - **描述**：是否要将这段文本显示为一个段落，段落文本和上下行之间会出现较宽的空隙，案例可见 [#6 输出](./06-output#eraprintbutton)。
    - **默认值**：`false`
- offset
    - **类型**：number，0-23
    - **描述**：文本网格的偏移量。
    - **默认值**：跟随 [setOffset](#setoffsetoffset)。
- width
    - **类型**：number，1-24
    - **描述**：文本网格的宽度。
    - **默认值**：跟随 [setWidth](#setwidthwidth)。

## TextContent

[print](#printcontent-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中用于控制输出文本的对象。

可能取值为 string 或数组，数组的元素可能是：

- [PrintedSpan](#printedspan)；
- 对象，其唯一属性可能是：
    - `isBlank`（`true`）：表示输出一个半角空格；
    - `isBr`（`true`）：表示输出一个换行符，使前后的文本分行显示；
    - `isDivider`（`true`）：表示输出一个纵向的分隔符；
- 字符串。

## TextObject

[printMultiColumns](#printmulticolumnscolumnobjects-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中用于控制显示对象的 [网格对象](./08-ui#用对象表示显示内容) 之一。

该对象具有以下属性：

- config（可选）
    - **类型**：[TextConfig](#textconfig)
    - **描述**：文本显示的其他可选项。
    - **默认值**：`{}`，即空的 [TextConfig](#textconfig)。
- content
    - **类型**：[TextContent](#textcontent)
    - **描述**：要输出的内容。
    - **默认值**：必选属性，无默认值。
- type
    - **类型**：`'text'`
    - **描述**：该网格对象的类型。
    - **默认值**：必选属性，`'text'`。

## WholeImageConfig

用于控制全图输出的对象，用于 [printWholeImage](#printwholeimagename-config)、[printMultiColumns](#printmulticolumnscolumnobjects-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中。

该对象具有以下可选属性：

- fit
    - **类型**：`'fill'|'contain'|'cover'|'none'|'scale-down'`
    - **描述**：该全图在网格中的填充方式，分别为拉伸、缩放、裁切、保留原值、缩放或保留原值中更小的尺寸。
    - **默认值**：`'contain'`
- offset
    - **类型**：number，0-23
    - **描述**：全图的偏移量。
    - **默认值**：跟随 [setOffset](#setoffsetoffset)。
- width
    - **类型**：number，1-24
    - **描述**：全图的宽度。
    - **默认值**：跟随 [setWidth](#setwidthwidth)。

## WholeImageObject

[printMultiColumns](#printmulticolumnscolumnobjects-config) 和 [printInColRows](#printincolrowscolumnobjects) 等 API 中用于控制显示对象的 [网格对象](./08-ui#用对象表示显示内容) 之一。

该对象具有以下属性：

- config（可选）
    - **类型**：[WholeImageConfig](#wholeimageconfig)
    - **描述**：全图显示的其他可选项。
    - **默认值**：`{}`，即空的 [WholeImageConfig](#wholeimageconfig)。
- names
    - **类型**：`string|string[]`
    - **描述**：要显示的全图的注册名，为数组时会显示堆叠的多张图片，靠前的置于底部。
    - **默认值**：必选属性，无默认值。
- type
    - **类型**：`'progress'`
    - **描述**：该网格对象的类型。
    - **默认值**：必选属性，`'progress'`。

# API

## add(varName, val)

- **描述**：操作存档数据。如果将 [set](#setvarname-val) 理解为`=`，add 就是`+=`。请确认要操作的对象是一个数值（number）类型！
- **参数**：
    - `varName`（string）：变量名，规则见 [#9 静态数据文件](./09-static#eraget-和-eraset)。
    - `val`（number）：要加上的数值。
- **返回值**：`number`，与 `val` 相加后的数值。如果是 base 表中的变量，会自动修正为 0-maxbase 之间的数值。

## addCharacter(...charaId)

- **描述**：向游戏中添加角色，在所有角色表中新建与该角色对应的对象，之后就可以操作该角色相关的变量。会重新初始化角色。
- **参数**：
    - `charaId`（`number|number[]`，可变）：要添加的角色的ID，如果传入的是数组时会按照第二个参数对应的角色预设数据添加第一个参数对应的角色，可用于根据预设角色添加新角色。
- **返回值**：只传入一个角色ID时返回 `boolean`，多个时返回 `boolean[]`，表示添加角色是否成功。

## addCharacterForTrain(...charaId)

- **描述**：向调教系统添加角色，在所有调教相关的角色表中新建与该角色对应的对象，之后就可以操作该角色相关的变量。必须在 [beginTrain](#begintraincharaid) 之后、[endTrain](#endtrain) 之前调用。不会重复初始化角色。
- **参数**：
    - `charaId`（number，可变）：要向调教系统添加的角色ID。
- **返回值**：`void`

## beginTrain(...charaId)

- **描述**：初始化调教系统。创建所有调教系统相关的数据表，然后根据传入的参数调用 [addCharacterForTrain](#addcharacterfortraincharaid)。多次调用不会重复创建相关数据表。
- **参数**：
    - `charaId`（number，可变）：要向调教系统添加的角色ID。
- **返回值**：`void`

## checkImage(...name)

- **描述**：检查注册名对应的多媒体资源是否存在。
- **参数**：
    - `name`（string，可变）：多媒体资源的注册名。
- **返回值**：只传入一个注册名时返回 `boolean`，多个时返回 `boolean[]`，表示注册名对应的多媒体资源是否存在，与传入参数一一对应。

## clear(lineCount?)

- **描述**：清除屏幕上的内容。
- **参数**：
    - `lineCount`（number，可选）：从屏幕底部要清理的行数，当不设置或大于屏幕行数时清除整个屏幕。
- **返回值**：`Promise<number>`，清屏后屏幕上的行数；本函数是个 **异步函数**，需要用 `await` 关键词转同步处理。

## delay(delay)

- **描述**：等待一段时间。同步处理时会卡住游戏脚本，使用时请注意，或配合 [多线程](./17-multithreading) 使用。
- **参数**：
    - `delay`（number）：要等待的时间，单位是ms（毫秒）。
- **返回值**：`Promise<void>`，因此本函数是个 **异步函数**，需要用 `await` 关键词转同步处理。

## drawLine(config?)

- **描述**：输出横向分割线。
- **参数**：
    - `config`（[DividerConfig](#dividerconfig)，可选）：分割线显示的其他可选项。
- **返回值**：`number`，显示分割线后显示在界面上的行数。

## endTrain()

- **描述**：结束调教，将 gotjewel 表结算到 jewel 表中，并删除所有仅限调教有效的变量数据表。
- **返回值**：`void`

## get(varName)

- **描述**：读取一个存档数据变量。
- **参数**：
    - `varName`（string）：变量名，规则见 [#9 静态数据文件](./09-static#eraget-和-eraset)。
- **返回值**：`any`，存档数据变量的值。

## getAddedCharacters()

- **描述**：获取所有已添加角色的ID。
- **返回值**：`number[]`，所有已添加角色的ID，添加顺序排列。

## getAllCharacters()

- **描述**：获取所有有预设数据的角色的ID。
- **返回值**：`number[]`，所有有预设数据的角色的ID。

## getCharactersInTrain()

- **描述**：获取所有添加到调教系统中的角色的ID。
- **返回值**：`number[]`，所有添加到调教系统中的角色的ID。

## getLineCount()

- **描述**：获取当前界面上显示的行数的 API。
- **返回值**：`number`，当前界面上显示的行数的 API。在开启 [自动压缩空行] 游戏设置选项的情况下，也会包含被隐藏的空行的数量。

## input(config)

- **描述**：获取玩家输入内容。
- **参数**：
    - `config`（object，可选）：获取输入内容的其他可选项，可以有以下属性：
        - `disableBefore`（boolean，可选）：接收到玩家输入后是否禁用之前输出的按钮，默认值为 `true`；
        - `rule`（string，可选）：正则表达式，在没有输出按钮的情况下可以用于控制玩家的输入内容，使用时 `useRule` 必须为 `true`；
        - `useRule`（boolean，可选）：是否启用规则检查，默认值为 `true`；
        - `hideInput`（boolean，可选）：是否隐藏玩家的输入，默认值为 `false`，为 `true` 时本次玩家的输入将不会被输出到引擎中；
        - `show`（boolean，仅限安卓版，可选）：是否显示输入框，为 `false` 时当使用按钮限制玩家输入时输入框将不会显示。
- **返回值**：`any`，玩家输入的内容或点击按钮的快捷键。

## isDebug()

- **描述**：获取是否处于调试模式。
- **返回值**：`boolean`，是否处于调试模式。

## isLandscape()
_PC引擎3.6.0、安卓引擎1.0.8及以上版本_

- **描述**：获取是否处于横屏状态。
- **返回值**：`Promise<boolean>`，是否处于横屏或强制横屏状态；本函数是个 **异步函数**，需要用 `await` 关键词转同步处理。

## loadData(savIndex)

- **描述**：读取特定存档，具体过程可见 [#11 存档文件](./11-saves#eraloaddata读取特定存档)。
- **参数**：
    - `savIndex`（number）：要读取的存档栏位号。
- **返回值**：`Promise<boolean>`，读取特定存档是否成功；本函数是个 **异步函数**，需要用 `await` 关键词转同步处理。

## loadGlobal()

- **描述**：手动读取公共存档，具体过程可见 [#11 存档文件](./11-saves#eraloadglobal读取公共存档)。
- **返回值**：`Promise<boolean>`，读取公共存档是否成功；本函数是个 **异步函数**，需要用 `await` 关键词转同步处理。

## logger.assert(checkVal, aimVal)

- **描述**：判断作为参数传入的两个变量是否完全相等，不相等的话在引擎界面显示浮动的提醒信息。
- **参数**：
    - `checkVal`（any）：要检查的变量；
    - `aimVal`（any）：该变量应该的取值。
- **返回值**：`void`

## logger.debug(msg)

- **描述**：在控制台中输出一条 DEBGUG 级别的消息，并附上调用者及文件信息。仅在调试模式下有效。
- **参数**：
    - `info`（any）：要输出的消息。
- **返回值**：`void`

## logger.error(msg, stack?)

- **描述**：在控制台中输出一条 ERROR 级别的消息，并在引擎界面中显示浮动的提醒信息。
- **参数**：
    - `msg`（any）：要输出的消息，会同时显示在控制台和提醒信息中；
    - `stack`（any，可选）：仅在控制台中显示的消息，一般是调用栈信息。如果没有传入，则会自动提取当前调用栈。
- **返回值**：`void`

## logger.info(msg)

- **描述**：在控制台中输出一条 INFO 级别的消息，并附上调用者及文件信息。
- **参数**：
    - `info`（any）：要输出的消息。
- **返回值**：`void`

## logger.warn(msg, stack?)

_PC引擎 4.2.2_

- **描述**：在控制台中输出一条 WARNING 级别的消息。
- **参数**：
    - `msg`（any）：要输出的消息，会同时显示在控制台和提醒信息中；
    - `stack`（any，可选）：仅在控制台中显示的消息，一般是调用栈信息。如果没有传入，则会自动提取当前调用栈。
- **返回值**：`void`

## nextTurnInTrain()

- **描述**：对所有调教中的角色，将 deltabase 表结算到 base 表中（对应 maxbase 大于 0 时，base 会被钳制在 [0, maxbase] 区间内），delta 表结算到 palam 表中，nowex 表结算到 ex 表中，并将 source、deltabase、delta 与 nowex 表中已有的键逐个置为 0（表与键本身保留）。
- **返回值**：`void`

## notify(content, title?, type?)

- **描述**：在引擎界面中显示一条浮动的提醒信息，使用案例可见 [#6 输出](./06-output#eranotify)。
- **参数**：
    - `content`（`string|({content:string,color:string,fontSize:string,fontWeight}|{isBr:true})[]`）：提醒信息内的文本内容，是对象数组时每个元素的属性含义可以参考 [PrintedSpan](#printedspan)；
    - `title`（string，可选）：提醒信息的标题；
    - `type`（`'success'|'info'|'warning'|'error'|''`，可选）：提醒信息的类型，会在提醒信息左上角显示对应颜色的图标，五种取值分别对应成功（绿色）、信息（灰色）、警告（黄色）、错误（红色）、默认值（不显示）。
- **返回值**：`void`

## playMusic(names, config?)

- **描述**：播放音乐。
- **参数**：
    - `names`（`string|string[]`）：要播放的音乐的注册名，以多个注册名的数组传入时只会播放第一个注册了的音乐文件。
    - `config`（对象，可选）：播放音乐的其他可选项。
        - `loop`（boolean，可选）：是否循环播放。
        - `fade`（boolean，可选）：是否与之前播放的音乐淡入淡出。
        - `fadeInternal`（number，可选）：淡入淡出的时间间隔，100-500，单位为ms（毫秒），默认值为200ms。
- **返回值**：`boolean`，是否找到了注册了的音乐文件并成功播放。

## print(content, config?)

- **描述**：输出一段文本。
- **参数**：
    - `content`（[TextContent](#textcontent)）：要输出的文本内容；如果是空字符串或者空数组，会转而调用 [println](#println) 输出一个空行；
    - `config`（[TextConfig](#textconfig)，可选）：文本显示的其他可选项。
- **返回值**：`number`，显示文本后显示在界面上的行数。

## printAndWait(content, config?)

- **描述**：输出一段文本，等待玩家按任意键或点击界面后再继续，等价于先执行 [print](#printcontent-config) 再执行 [waitAnyKey](#waitanykey)。
- **参数**：
    - `content`（[TextContent](#textcontent)）：要输出的文本内容；
    - `config`（[TextConfig](#textconfig)，可选）：文本显示的其他可选项。
- **返回值**：`Promise<number>`，显示文本后显示在界面上的行数；本函数是个 **异步函数**，需要用 `await` 关键词转同步处理。

## printButton(content, accelerator, config?)

- **描述**：输出一个独占一行的按钮。
- **参数**：
    - `content`（string）：按钮的文本内容，其中可用 `'\n'` 换行；
    - `accelerator`（number）：按钮的快捷键，玩家点击该按钮后会返回给 [input](#inputconfig)；
    - `config`（[ButtonConfig](#buttonconfig)，可选）：按钮显示的其他可选项。
- **返回值**：`number`，显示按钮后显示在界面上的行数。

## printImage(...names)

- **描述**：以切分图风格显示图片，每个图层都可以只是原图片文件的一部分，显示尺寸固定。
- **参数**：
    - `names`（string，可变）：要显示的切分图的注册名，传入多个参数时会显示堆叠在一起的多张图片，先传入的参数会置于底部。
- **返回值**：`number`，显示该切分图后显示在界面上的行数。

## printInColRows(...columnObjects)

- **描述**：在一行中输出多列内容，使用案例可见 [#8 排版](./08-ui#eraprintincolrows在一行中输出多列内容)。
- **参数**：
    - `columnObjects`（[ColumnObject](#columnobject)，可变）：要输出的大网格，传入多个参数时会在一行输出多个对应的大网格。
- **返回值**：`number`，显示这些同行的大网格后显示在界面上的行数。

## printLineChart(config)

- **描述**：输出一张折线图。
- **参数**：
    - `config`（any）：折线图的具体设置，与 [chart.js](https://chart.nodejs.cn/) 中 [line chart](https://chart.nodejs.cn/docs/latest/charts/line.html) 的 option 相同。
- **返回值**：`number`，显示该折线图后显示在界面上的行数。

## println()

- **描述**：输出一个空行。
- **返回值**：`number`，显示该空行后显示在界面上的行数。

## printMultiColumns(columnObjects, config?)

- **描述**：在一行中输出多种内容，使用案例可见 [#8 排版](./08-ui#eraprintmulticolumns在一行中输出多个内容)。
- **参数**：
    - `columnObjects`（[GridObject](#gridobject)[]）：要输出的网格对象的数组；
    - `config`（[ColumnConfig]）：这些网格对象显示的其他可选项。
- **返回值**：`number`，显示这些同行的网格对象后显示在界面上的行数。

## printProgress(percentage, inContent, outContent, config?)

- **描述**：输出进度条。
- **参数**：
    - `percentage`（0-100）：进度条的进度百分比；
    - `inContent`（string）：进度条内的文字；
    - `outContent`（string）：紧跟进度条的文字；
    - `config`（[ProgressConfig](#progressconfig)，可选）：进度条显示的其他可选项。
- **返回值**：`number`，显示进度条后显示在界面上的行数。

## printWholeImage(name, config?)

- **描述**：以全图风格显示图片，每个图层都会是原图片文件的全部，显示尺寸可随窗口/网格大小变化而变化。
- **参数**：
    - `names`（`string|string[]`）：要显示的切分图的注册名，数组形式时会显示堆叠在一起的多张图片，数组中靠前的注册名对应的图片会置于底部。
    - `config`（[WholeImageConfig](#wholeimageconfig)，可选）：全图显示的其他可选项。
- **返回值**：`number`，显示全图后显示在界面上的行数。

## quit()

- **描述**：结束游戏并关闭引擎。
- **返回值**：`void`

## replaceInColRows(...columnObjects)

- **描述**：将此前输出的最后一行替换为多列内容。
- **参数**：
    - `columnObjects`（[ColumnObject](#columnobject)，可变）：要输出的大网格，传入多个参数时会在一行输出多个对应的大网格。
- **返回值**：`number`，显示在界面上的行数。

## replaceText(content, config?)

- **描述**：将此前输出的最后一行替换为文本。
- **参数**：
    - `content`（[TextContent](#textcontent)）：要输出的文本内容；
    - `config`（[TextConfig](#textconfig)，可选）：文本显示的其他可选项。
- **返回值**：`number`，显示在界面上的行数。

## resetCharacter(...charaId)

- **描述**：重新初始化角色，引擎内部实现为 [addCharacter](#addcharactercharaid) 的别名。
- **参数**：
    - - `charaId`（`number|number[]`，可变）：要重新初始化的角色的ID，如果传入的是数组时会按照第二个参数对应的角色预设数据初始化第一个参数对应的角色。
- **返回值**：只传入一个角色ID时返回 `boolean`，多个时返回 `boolean[]`，表示重新初始化角色是否成功。

## resetData()

- **描述**：重置已读取的存档数据为初始状态，清空所有数据表；如果已在 [GameBase](./09-static#gamebasecsv) 中设置变量【初始角色编号】，会在初始化后调用一次 [addCharacter](#addcharactercharaid)
- **返回值**：`void`

## resetGlobal()

- **描述**：手动重置公共存档。
- **返回值**：`Promise<void>`，因此本函数是个 **异步函数**，需要用 `await` 关键词转同步处理。

## resumeMusic()

- **描述**：继续播放或从头开始播放音乐。
- **返回值**：`void`

## rmData(savIndex)

- **描述**：删除特定存档。
- **参数**：
    - `savIndex`（number）：要删除的存档栏位号。
- **返回值**：`Promise<boolean>`，删除特定存档是否成功；本函数是个 **异步函数**，需要用 `await` 关键词转同步处理。

## saveData(savIndex, comment?)

- **描述**：保存特定存档，具体过程可见 [#11 存档文件](./11-saves#erasavedata保存特定存档)。
- **参数**：
    - `savIndex`（number）：要保存到的存档栏位号。
    - `comment`（string，可选）：该栏位存档的备注。
- **返回值**：`Promise<boolean>`，保存特定存档是否成功；本函数是个 **异步函数**，需要用 `await` 关键词转同步处理。

## saveGlobal()

- **描述**：手动保存公共存档，详细信息可见 [#11 存档文件](./11-saves#erasaveglobal保存公共存档)。
- **返回值**：`Promise<boolean>`，保存公共存档是否成功；本函数是个 **异步函数**，需要用 `await` 关键词转同步处理。

## set(varName, val)

- **描述**：操作存档数据。
- **参数**：
    - `varName`（string）：变量名，规则见 [#9 静态数据文件](./09-static#eraget-和-eraset)。
    - `val`（any）：要设置的数值。
- **返回值**：`any`，存档数据变量的新值。

## setAlign(textAlign)

- **描述**：设置之后输出内容的默认对齐方式。
- **参数**：
    - `textAlign`（`'left'|'center'|'right'`）：对齐方式，三种取值分别代表左对齐、居中和右对齐。
- **返回值**：`void`

## setHorizontalAlign(align)

- **描述**：设置 [printInColRows](#printincolrowscolumnobjects) 输出的大网格的横向对齐方式。
- **参数**：
    - `align`（`'start'|'center'|'end'|'space-between'|'space-around'|'space-evenly'`）：横向对齐方式，六种取值分别对应左对齐、居中、右对齐、无边距等距分散、半边距等距分散、完全等距分散。
- **返回值**：`void`

## setMask(maskName?, opacity?)

- **描述**：设置覆盖整个屏幕的滤镜，不带任何参数调用时为取消滤镜显示。
- **参数**：
    - `maskName`（string，可选）：要作为滤镜显示的图片文件注册名。
    - `opacity`（number，可选）：滤镜的不透明度，0-1，0为完全透明，1为完全不透明。
- **返回值**：`void`。

## setOffset(offset)

- **描述**：设置默认偏移量。
- **参数**：
    - `offset`（0-23）：默认偏移量。
- **返回值**：`void`

## setTitle(title)

- **描述**：设置显示在引擎标题栏的游戏标题。
- **参数**：
    - `title`（string）：要设置的游戏标题；游戏标题默认值见 [#6 输出](./06-output#erasettitle)。
- **返回值**：`void`

## setToBottom()

- **描述**：输出一个占满整个屏幕的空行。
- **返回值**：`number`，显示空行后显示在界面上的行数。

## setVerticalAlign(align)

- **描述**：设置 [printInColRows](#printincolrowscolumnobjects) 输出的大网格的纵向对齐方式。
- **参数**：
    - `align`（`'top'|'middle'|'bottom'`）：纵向对齐方式，三种取值分别对应顶部对齐、垂直居中、底部对齐。
- **返回值**：`void`

## setWidth(width)

- **描述**：设置默认宽度。
- **参数**：
    - `width`（1-24）：默认宽度。
- **返回值**：`void`

## stopMusic()

- **描述**：停止播放音乐。
- **返回值**：`void`

## toggleDebug()

- **描述**：切换调试模式。
- **返回值**：`boolean`，切换后是否处于调试模式。

## waitAnyKey()

- **描述**：等待玩家按任意键或点击游戏界面后继续。
- **返回值**：`Promise<void>`，因此本函数是个 **异步函数**，需要用 `await` 关键词转同步处理。