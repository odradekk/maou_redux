# ere SDK API 速查表

由 `assets/reference/api-index.json` 生成（SDK 4.8.5）。全部成员共 66 个。
参数类型与默认值来自 SDK 自带的 JSDoc；带「必填」标记的参数省略会得到 `undefined`。
需要完整语义、示例与坑点，用 `ere_api_lookup` 或检索 `api-digest.md`。

## 输出：文本与排版

所有 print 系 API 都会返回它画出的行号；它们只是「画」，不会等待玩家。

| API | 签名 | 说明 |
| --- | --- | --- |
| `era.print` | `print(content, config)` | print some text |
| `era.println` | `println()` | print a line break, if just used to print enter at the end of a line, please use print('*** \n') to replace |
| `era.printAndWait` | `async printAndWait(content, config)` | print some text and wait any key from user |
| `era.drawLine` | `drawLine(config)` | draw a divider to separate lines. the divider is also a line |
| `era.printButton` | `printButton(content, accelerator, config)` | print a button |
| `era.printMultiColumns` | `printMultiColumns(columnObjects, config)` | print multiple columns into a row, excluding inputs |
| `era.printInColRows` | `printInColRows(...columnObjects)` | @see drawLine |
| `era.replaceInColRows` | `replaceInColRows(...columnObjects)` | replace the line just printed with a new in-col-row line **(⚠️ SDK 标注 DANGER：替换「刚输出的那几行」，用于原地重绘（实时循环靠它刷新画面）。中间不要插别的 era.print，否则会替换错行)** |
| `era.replaceText` | `replaceText(content, config)` | replace the line just printed with a new text line **(⚠️ SDK 标注 DANGER：替换「刚输出的那一行」。与 replaceInColRows 同样要注意替换目标)** |
| `era.printProgress` | `printProgress(percentage, inContent, outContent, config)` | print a progress bar |
| `era.setToBottom` | `setToBottom()` | print an empty block and make the following lines shown in the bottom |
| `era.setAlign` | `setAlign(textAlign)` | set default text-align |
| `era.setColor` | `setColor(color)` | Set default text color. |
| `era.setOffset` | `setOffset(offset)` | set default offset |
| `era.setWidth` | `setWidth(width)` | set default width |
| `era.setHorizontalAlign` | `setHorizontalAlign(align)` | set default horizontal align of inColRows |
| `era.setVerticalAlign` | `setVerticalAlign(align)` | set default vertical align of inColRows |
## 输入

两个异步输入 API；返回值是按钮的 accelerator，或玩家输入的数字/字符串。

| API | 签名 | 说明 |
| --- | --- | --- |
| `era.input` | `async input(config)` | wait for user's input, the engine will try to return number |
| `era.waitAnyKey` | `async waitAnyKey()` | wait any key from user |
## 屏幕与系统

清屏、行号、窗口标题、退出、调试开关与日志。

| API | 签名 | 说明 |
| --- | --- | --- |
| `era.clear` | `async clear(lineCount)` | clear printed lines |
| `era.getLineCount` | `getLineCount()` | get the number of current lines |
| `era.setTitle` | `setTitle(title)` | set the title of the window |
| `era.quit` | `quit()` | exit the application and close the window **(⚠️ SDK 标注 DANGER：直接关闭引擎窗口；不是异步函数，不要 await)** |
| `era.delay` | `delay: (function () {` | make the current function to wait for some time |
| `era.notify` | `notify(content, title, type, duration)` | show a notification |
| `era.toggleDebug` | `toggleDebug()` | toggle debug status |
| `era.isDebug` | `isDebug()` | check if is debug mode |
| `era.isLandscape` | `async isLandscape()` | (android) check if is landscape |
| `era.logger` | `logger: {` |  **(无 JSDoc)** |
| `era.logger.assert` | `assert(checkVal, aimVal)` | to log an assert error into program logs as warn level when checkVal !== aimVal |
| `era.logger.debug` | `debug(msg)` | to log something into program logs as debug level |
| `era.logger.error` | `error(msg, stack)` | to log something into program logs as error level |
| `era.logger.info` | `info(msg)` | to log something into program logs as info level |
| `era.logger.warn` | `warn(msg, stack)` | to log something into program logs as warn level |
## 图片与音频

需要游戏设置里打开「启用资源」，并在 res/ 下注册资源。

| API | 签名 | 说明 |
| --- | --- | --- |
| `era.checkImage` | `checkImage(...names)` | check if a or some images are loaded |
| `era.printImage` | `printImage(...names)` | print images that must be declared in csv files in directory res |
| `era.printWholeImage` | `printWholeImage(names, config)` | print the whole image |
| `era.setBack` | `setBack(name, config)` |  |
| `era.setOverlay` | `setOverlay(name, config)` |  |
| `era.setMask` | `setMask(name, config)` |  **(已废弃：replaced with setOverlay)** |
| `era.playMusic` | `playMusic(names, config)` | play the music that must be declared in csv files in directory res |
| `era.stopMusic` | `stopMusic()` | pause the music in the playing |
| `era.resumeMusic` | `resumeMusic()` | resume the music in playing |
## 图表

折线图，基于 chart.js。

| API | 签名 | 说明 |
| --- | --- | --- |
| `era.printLineChart` | `printLineChart(config)` | print a line chart by chart.js |
## 存档数据读写

参数是「表名[:角色ID]:变量名」形式的数据路径；变量名写错只会静默返回 undefined。

| API | 签名 | 说明 |
| --- | --- | --- |
| `era.get` | `get(varName)` | get a variable by name |
| `era.set` | `set(varName, val)` | @template T |
| `era.add` | `add(varName, val)` | add a variable by name **(⚠️ SDK 标注 DANGER：变量不存在时会静默退化，与 era.set 一致（不是崩溃）)** |
## 角色

角色相关的数据表要为每个角色建立子表，只有添加过的角色才能读写其变量。

| API | 签名 | 说明 |
| --- | --- | --- |
| `era.addCharacter` | `addCharacter(...charaId)` | add some characters |
| `era.resetCharacter` | `resetCharacter(...charaId)` | reset the data of a character |
| `era.removeCharacter` | `removeCharacter(...charaId)` | remove the character **(⚠️ SDK 标注 DANGER：原地移除角色，不可撤销)** |
| `era.getAddedCharacters` | `getAddedCharacters()` | get all added characters |
| `era.getAllCharacters` | `getAllCharacters()` | get all characters |
## 调教系统

beginTrain 之后才会创建调教专用表（tflag/tequip/tcvar/palam/delta/gotjuel/source/stain/ex/nowex/deltabase）。

| API | 签名 | 说明 |
| --- | --- | --- |
| `era.beginTrain` | `beginTrain(...charaId)` | initialize training and character data |
| `era.addCharacterForTrain` | `addCharacterForTrain(...charaId)` | initialize data of some characters for training |
| `era.getCharactersInTrain` | `getCharactersInTrain()` | get characters added in train |
| `era.nextTurnInTrain` | `nextTurnInTrain()` | add delta table into param table, nowex table into ex table, and clean source, delta and nowex table |
| `era.endTrain` | `endTrain()` | end training, add gotjewel table into jewel table, and destroy temporary data |
## 存档文件

全部是异步 API；读档成功只替换存档数据，运行时状态需要自行重建。

| API | 签名 | 说明 |
| --- | --- | --- |
| `era.saveData` | `async saveData(savIndex, comment)` | save data into a save file |
| `era.loadData` | `async loadData(savIndex)` | load a save file |
| `era.rmData` | `async rmData(savIndex)` | remove a data file |
| `era.saveGlobal` | `async saveGlobal()` | save global variables into save file |
| `era.loadGlobal` | `async loadGlobal()` | load global variables from save file |
| `era.resetData` | `resetData()` | reset all data of the save |
| `era.resetGlobal` | `async resetGlobal()` | reset global variables |
## 元信息与 .kojo

版本对象、引擎标记，以及 .kojo 代理。

| API | 签名 | 说明 |
| --- | --- | --- |
| `era.version` | `version: { sdk: '4.8.5', engine: void 0 }` |  **(无 JSDoc)** |
| `era.isEra` | `isEra: true` |  **(无 JSDoc)** |
## 运行时注入（SDK 未声明）

这些成员由引擎在启动时挂到 SDK 对象上，`sdk/era-electron.js` 里查不到，但对游戏代码可用。

| API | 签名 | 说明 |
| --- | --- | --- |
| `era.raw` | `raw()` | 运行时注入（SDK 未声明）：返回当前存档的活引用 { data, global }。生成的开发套件（era-utils）用它绕过 base 的钳制。直接修改它不会触发引擎的边界处理。 **(运行时注入，SDK 未声明；⚠️ SDK 标注 DANGER：直接改当前存档的活引用，绕过引擎的边界处理)** |
| `era.proxyKojo` | `proxyKojo(kojo)` | 运行时注入（SDK 未声明）：把一个 { name: fn } 记录包装成带 %字典% 替换的代理，用于 .kojo 口上文件。单机游戏代码一般不需要直接调用。 **(运行时注入，SDK 未声明)** |

## config 类型定义

### `ButtonConfig` — type of the param 'config' in era.printButton

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `align` | `'left'|'center'|'right'` | align of the button, 'left' in default |
| `badge` | `'dot'|string` | badge of the button if isButton is true |
| `buttonType` | `'primary'|'success'|'warning'|'danger'|'info'|''` | type of the button in element-plus, 'warning' in default when isButton is false |
| `color` | `string` | color of the button, isButton must be false |
| `disabled` | `boolean` | if the button is disabled, false in default |
| `disableContinue` | `boolean` | if the continue is disabled after clicking the button, false in default |
| `disableWarning` | `boolean` | if disable warning when accelerator has been set, false in default |
| `fontSize` | `string` | font size of the text in the button |
| `inTextAlign` | `'left'|'center'|'right'` | align of the text in the button, 'center' in default |
| `isButton` | `boolean` | if the button is a button, otherwise is a link |
| `offset` | `number` | offset of the button, 0-23, 0 in default |
| `showAcc` | `boolean` | if show the accelerator, true in default on PC, and is always false on Android |
| `title` | `string` | tooltip of the button |
| `width` | `number` | width of the button, 1-24, 24 in default |

### `ButtonObject`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `accelerator` | `number` | the accelerator key of the button used in the input |
| `config` | `ButtonConfig` | config of the printed button |
| `content` | `string` | the text of the button |
| `type` | `'button'` |  |

### `DividerConfig` — type of the param 'config' in era.drawLine

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `content` | `string` | content of the divider |
| `position` | `'left'|'center'|'right'` | position of the divider, 'center' in default |
| `isSolid` | `boolean` | if the divider is solid, false in default |
| `offset` | `number` | offset of the divider, 0-23, 0 in default |
| `width` | `number` | width of the divider, 1-24, 24 in default |

### `DividerObject`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `config` | `DividerConfig` | config of the line |
| `type` | `'divider'` |  |

### `ImageObject`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `config` | `Object` | config of the image line |
| `config.offset` | `number` | offset of the image line, 0-23, 0 in default |
| `config.width` | `number` | width of the image line, 1-24, 24 in default |
| `names` | `string|string[]` | names of the images, a name may contain several alternatives split by '\t' |
| `type` | `'image'` |  |

### `ProgressConfig` — type of the param 'config' in era.printProgress

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `align` | `'left'|'center'|'right'` | align of the text shown next to the progress bar, 'left' in default |
| `barWidth` | `number` | width of the progress bar, 0-24, 24 in default |
| `color` | `string` | color of the progress bar |
| `duration` | `number` | duration(second) of the bar easing, 0.6 in default, set 0 to disable easing |
| `easing` | `string` | css easing function of the bar easing, 'ease' in default |
| `fontColor` | `string` | color of the font in the progress bar |
| `height` | `number` | height of the progress bar, 6-30(px), 24(px) in default |
| `offset` | `number` | offset of the progress, 0-23, 0 in default |
| `width` | `number` | width of the progress, 1-24, 24 in default |

### `ProgressObject`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `config` | `ProgressConfig` | config of the printed progress |
| `inContent` | `string` | the text shown in the progress bar |
| `outContent` | `string` | the text shown next to the progress bar |
| `percentage` | `number` | the percentage of the progress bar, float, 0-100 |
| `type` | `'progress'` |  |

### `PrintedSpan` — printed span used in the param 'content' in era.print, era.printAndWait and era.replaceText

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `color` | `string` |  |
| `content` | `string` |  |
| `display` | `string` |  |
| `fontSize` | `string` |  |
| `fontStyle` | `string` |  |
| `fontWeight` | `string` |  |
| `opacity` | `number` | opacity of the span, 1 in default |
| `textAlignLast` | `string` | CSS text-align-last of the span |
| `textShadow` | `string` | CSS text-shadow of the span |
| `title` | `string` |  |
| `url` | `string` |  |

### `TextConfig` — type of the param 'config' in era.print, era.printAndWait and era.replaceText

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `align` | `'left'|'center'|'right'` | align of the line, 'left' in default |
| `color` | `string` | color of the line, '#ffffff' in default |
| `fontSize` | `string` | font size of the line, '1rem' in default |
| `fontStyle` | `string` | CSS font-style of the line |
| `fontWeight` | `string` | CSS font-weight of the line |
| `isParagraph` | `boolean` | if the line is in a paragraph, false in default |
| `offset` | `number` | offset of the line, 0-23, 0 in default |
| `width` | `number` | width of the line, 1-24, 24 in default |

### `TextObject`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `config` | `TextConfig` | config of the printed line |
| `content` | `TextContent` |  |
| `type` | `'text'` |  |

### `WholeImageConfig` — type of the param 'config' in era.printWholeImage

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `fit` | `'fill'|'contain'|'cover'|'none'|'scale-down'` | fit of the image |
| `offset` | `number` | offset of the whole image, 0-23, 0 in default |
| `width` | `number` | width of the whole image, 1-24, 24 in default |

### `WholeImageObject`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `config` | `WholeImageConfig` |  |
| `names` | `string|string[]` |  |
| `type` | `'image.whole'` |  |

### `ColumnConfig`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `gutter` | `number` | gutter between columns, 0 in default |
| `horizontalAlign` | `'start'|'center'|'end'|'space-between'|'space-around'|'space-evenly'` | horizontal align of the columns, 'start' in default |
| `offset` | `number` | offset of the row, 0-23, 0 in default |
| `verticalAlign` | `'top'|'middle'|'bottom'` | vertical align of the columns, 'top' in default |
| `width` | `number` | width of the row, 1-24, 24 in default |

### `ColumnObject`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `columns` | `GridObject[]` |  |
| `config` | `ColumnConfig` |  |

### `KojoFunction`

| 字段 | 类型 | 说明 |
| --- | --- | --- |


### `KojoFile`

| 字段 | 类型 | 说明 |
| --- | --- | --- |

