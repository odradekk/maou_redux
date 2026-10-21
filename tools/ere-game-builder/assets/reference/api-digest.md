# EraElectron (`ere`) Runtime API Digest

> **阅读提示**：本文由 EraElectron（ere）引擎源码与官方 Wiki 整理而成。文中形如 `src/...`、`example/...`、`sdk/...` 的路径都相对**引擎仓库**根目录，`era-electron.wiki/...` 相对 Wiki 仓库 —— 都不是相对本文件的路径。
> 本插件内置的 `assets/sdk/era-electron.js` 与引擎仓库的 `sdk/era-electron.js` 逐字节相同，可直接作为 SDK 的真值来源。
> **本文是快照。** 如与引擎源码、SDK 或当前 wiki 有出入，以它们为准。

Reference material for an AI agent that must write `ere` games that actually run on EraElectron.

Metadata used to build this document:

| Thing | Value | Source |
|---|---|---|
| Engine version | `5.0.0` | `package.json` (`"version": "5.0.0"`) |
| Minimum engine version the SDK requires | `4.8.5` | `sdk/era-electron.js` (`version: { sdk: '4.8.5', engine: void 0 }`) — **`version.sdk` is a minimum *engine* version**, checked as `engineVersion >= version.sdk`, *not* a version of the SDK itself |
| Official example game | `example/ere` | the engine's `example/` submodule (this bundle does not ship it; the skill fetches it on demand) |
| Engine docs (wiki) | `era-electron.wiki/dev-guides` | cross-check only; where wiki and code disagree, **code wins** (differences are flagged) |

**Versioning (engine 5.0.0 on, from the engine's `RELEASE.md`):** the engine follows semver — X breaks, Y adds,
Z fixes. Within a major line (5.x) the `era.*` surface, the data formats, `.kojo`, saves and the build thresholds
stay backward compatible, so a game declaring the same `version.sdk` keeps loading; breaking changes go to the
next major.

Public entry points: [era-electron](https://gitgud.io/umaera/engine/era-electron) (engine source) ·
[ere-example](https://gitgud.io/umaera/game/ere-example) (official example game) ·
[kojo-test](https://gitgud.io/umaera/game/kojo-test) (drop a `.kojo` into its `ere/test.kojo` to see the layout in the engine) ·
[engine Wiki](https://gitgud.io/umaera/engine/era-electron/-/wikis).

Confidence labels used below:

* **GAME-FACING** — documented API that game code is expected to call.
* **GAME-FACING (runtime-only)** — present in the running engine but not declared in the SDK stub (`era.raw`, `era.proxyKojo`, `era.dispatchButton`).
* **SDK-ONLY** — implemented inside `era-electron.js` (the SDK file) itself, so it works even when the engine
  does not provide it (`era.delay`). **This is NOT "internal": these are normal game-facing APIs** — read it as
  "implemented in the SDK, not in the engine".
* **INTERNAL** — engine implementation detail; do not call from game code (listed so the reader can avoid it).

---

## 1. How game code is wired in

### 1.1 Directory layout the engine expects

```
<game folder>/                     <- this.path, chosen by the player / ./game next to the exe
├── ere.config.json                <- created/updated by the engine (game config cache)
├── ere/                           <- this.erePath ; the "#" alias root ; "程序集"
│   ├── era-electron.js            <- the SDK, copied from sdk/era-electron.js
│   ├── main.js                    <- REQUIRED entry point
│   └── ... any game modules, .kojo files, subfolders
├── csv/  (or json/ or yml/)       <- static data (only one format is read)
│   ├── GameBase.csv               <- REQUIRED
│   ├── _config.json               <- optional default config
│   ├── _fixed.json                <- optional forced config
│   ├── _Replace.csv               <- optional loading-text replacements
│   ├── Base.csv Abl.csv ...       <- variable definition tables
│   └── chara/Chara0001.csv ...    <- character presets ("Chara*" anywhere under the folder)
├── res/                           <- optional multimedia; each folder has its own *.csv registrations
└── sav/                           <- created by the engine: global.sav, saveN.sav
```

Bundle mode (Android / packaged releases) instead puts **three files in the game root**:
`static.json`, `era.bundle.js`, `main.bundle.js`.

### 1.2 Entry-point contract

`<game>/ere/main.js` must be a CommonJS module whose `module.exports` is an **async function** — the game
loop. It is called by the engine *after* loading, and again on every "return to title"/restart.

`example/ere/main.js#L1-L13`:

```js
const era = require('#/era-electron');

const { init_queue } = require('#/sys/sys-event-queue');

const homepage = require('#/page/homepage');
const page_load_game = require('#/page/page-load-game');

/**
 * 游戏的入口，必须是一个async函数，异步转同步
 *
 * @author 黑奴队长
 */
module.exports = async () => {
  let flag = true;
  while (flag) {
    await era.clear();
    ...
  }
};
```

* The engine passes the post-clear line count as the single argument
  (`this.api.clear().then(this.game)` in `src/era/model/era-class.js#L214-L222`);
  the example ignores it.
* Return value is ignored. Throwing rejects the loop; a rejected error whose `message === 'quit'` is swallowed
  (that is how `era.quit()` unwinds the game).
* `main.js` may be a stub that requires other files, but the SDK **must be required during the loading of
  `main.js`** (directly or transitively): the engine locates the SDK by scanning Node's module cache for a
  module whose exports have `isEra === true`:

  `src/era/model/era-start.js#L80-L88`:

  ```js
  function setSdkModule(modules) {
    if (!modules.era) {
      modules.era = Object.values(modules.this._module._cache).find(
        (m) => m.exports.isEra,
      );
      addProxyFunc(modules.era.exports);
    }
  }
  ```

  If no such module is found, loading fails with `游戏没有引入正确的 ere sdk (era-electron.js)!`.

### 1.3 Exact bootstrap sequence (source / non-bundle mode)

Everything below happens in the **Electron main process** (`src/background.js`),
not in the renderer. Game code therefore has no DOM; it only talks to the renderer over IPC.

1. Renderer boots `app.vue`, calls `window.ipc.load()` → `{action: engineCommand.start}`.
2. Main process `ipcMain.on('engine')` → `era.start()` (`src/background.js#L569-L578`)
   → `src/era/model/era-class.js#L237-L239` → `eraStart.call(this)`
   (`src/era/model/era-start.js#L80`).
3. `eraStart` resets `ready`, `game`, api params, clears the screen, sets the icon, and aborts (with a folder
   picker) if `this.path` does not exist (`src/era/model/era-start.js#L89-L107`).
4. Module-cache purge: everything under the old game path, plus the old SDK module, is deleted
   (`src/era/model/era-start.js#L103-L107`). This is why the game function can
   be re-entered cleanly.
5. Reads `<game>/ere.config.json` if present (`src/era/model/era-start.js#L113-L120`).
6. Chooses the static-data folder suffix: `config.system.static`, else the first existing of
   `staticFormatPriority = ['yml', 'json', 'csv']` (`src/era/const.js#L52-L53`,
   `src/era/model/era-start.js#L128-L141`).
7. `syncConfig()`: resizes the window, sends `setConfig` to the renderer, overlays `fixedConfig` on top of
   `config`, writes `ere.config.json` back, sets the progress bar
   (`src/era/model/era-start.js#L143-L172`).
8. **Bundle branch** if `./static.json`, `./era.bundle.js`, `./main.bundle.js` all exist
   (`src/era/model/era-start.js#L192-L315`).
9. **Source branch** (otherwise) (`src/era/model/era-start.js#L316-L924`):
   1. `_config.json` → `defaultConfig`; `config ||= structuredClone(defaultConfig)`.
   2. `_fixed.json` → `fixedConfig`; `config.system.static = suffix`.
   3. `config.system.extendedCharaTables` → `extendedTables` (type `chara`).
   4. Recursively collect all files of the chosen extension. `*_replace.*` is parsed only when
      `config.system._replace` is on; files matching `chara*.(yml|json|csv)` go to the character list;
      everything else becomes a variable table.
   5. Each normal table builds `staticData[table]` (`变量名 -> 变量序号`, names lower-cased) and
      `fieldNames[table]` (`序号 -> { n: name, k: codeName, t: type }`). Reserved/deprecated table names are
      warned about and skipped (`src/era/model/era-start.js#L430-L572`).
   6. `GameBase` is mandatory, else loading aborts
      (`src/era/model/era-start.js#L573-L580`).
   7. Character files are merged into `staticData.chara[id]` and `staticData.relationship`
      (`src/era/model/era-start.js#L592-L673`).
   8. If `config.system.resource` and `res/` exist, every `res/**/*.csv` registers resources (see §8.5).
   9. Requires `<game>/ere/main.js` to exist, else `没有合法的ERE入口文件 (ere/main.js)!`
      (`src/era/model/era-start.js#L759-L770`).
   10. Installs the custom `Module.prototype.require` (see §9.2), then runs
       `vm.runInContext("main = require('#/main')", context)` with
       `context = vm.createContext({ main: void 0, require: this._module.prototype.require })`
       (`src/era/model/era-start.js#L858-L862`).
   11. Finds the SDK in the module cache, checks
       `semver.satisfies(app.getVersion(), '>=' + sdk.version.sdk)`, and if it passes **injects the engine API
       into the SDK object** (`src/era/model/era-start.js#L863-L911`):

       ```js
       this.apiNames.forEach((f) => {
         if (!eraModule.exports[f]) {
           this.log(`API ${f} 不存在! 请检查 SDK 版本!`, 'from engine', loggerLevelEnum.warn);
         }
         eraModule.exports[f] = this.api[f].bind(this.api);
         eraModule.exports[f]._s = true;
       });
       eraModule.exports.logger.debug = this.api.logger.debug.bind(this.api);
       eraModule.exports.logger.assert = this.api.logger.assert.bind(this.api);
       eraModule.exports.logger.info = this.api.logger.info.bind(this.api);
       eraModule.exports.logger.warn = this.api.logger.warn.bind(this.api);
       eraModule.exports.logger.error = this.api.logger.error.bind(this);
       eraModule.exports.raw = this.api.raw.bind(this.api);
       eraModule.exports.version.engine = app.getVersion();
       ```

       `apiNames` is the sorted list of own prototype methods of `EraApi`
       (`src/era/model/era-class.js#L78-L80`) — i.e. exactly the game-facing
       API surface.
   12. `this.game = context.main`.
10. `this.staticData.global ??= {}`, log success, `connect('prepare')`, print the load banner,
    `await this.api.waitAnyKey()`, `this.ready = true`, then `await this.restart()`.

    `src/era/model/era-class.js#L191-L223` does:

    ```js
    this.api.resetParams();
    this.api.resetData();
    await this.api.loadGlobal();
    this.configPath(`${...title...} v${...versionName...}`, this.oldPath, false, this.staticData.gamebase);
    this.api
      .clear()
      .then(this.game)
      .catch((e) => {
        if (e.message !== 'quit') {
          this.error(e.message, e.stack);
        }
      })
      .then(() => this.api.print([], { flush: true }));
    ```

    So at every start/restart: current save data is wiped (`resetData`), `global.sav` is loaded (or created),
    the screen is cleared, and the exported game function is invoked.

### 1.4 Bundle mode bootstrap (Android / packaged)

* Requires `static.json`, `era.bundle.js`, `main.bundle.js` in the game root.
* `static.json` provides `{ config, extend, fixed, names, static, res }` (see §8.4). Resource paths are
  rewritten to absolute `eeip://` (images) / `emip://` (audio) custom-protocol URLs.
* `src/era/model/era-start.js#L227-L315`:

  ```js
  const self = {};
  global.self = self;
  ...
  eval(`require('${join(this.path, './era.bundle.js').replace(/\\/g, '\\\\')}')`);
  global._era = self._era;
  const sdkVersion = safelyGetObjectEntry(self._era, 'version.sdk');
  ...
  this.apiNames.forEach((f) => {
    self._era[f] = this.api[f].bind(this.api);
    self._era[f]._s = true;
  });
  self._era.logger.debug = ...
  self._era.raw = this.api.raw.bind(this.api);
  addProxyFunc(self._era);
  eval(`require('${join(this.path, './main.bundle.js').replace(/\\/g, '\\\\')}')`);
  ...
  this.game = self.game;
  ```

* The bundle is produced by webpack with two entries named after the globals the engine expects
  (`example/webpack.config.js#L1-L37`):

  ```js
  entry: {
    era:  { import: './era-electron.js', library: { name: '_era', type: 'self' } },
    main: { dependOn: 'era', import: './main.js', library: { name: 'game', type: 'self' } },
  },
  output: { path: resolve(__dirname, 'dist/'), filename: '[name].bundle.js' },
  plugins: [new EreWebpackPlugin()],
  resolve: { alias: { '#': resolve(__dirname, 'ere/') } },
  ```

  `EreWebpackPlugin` copies `./build/static.json` to `dist/static.json` and validates the SDK version
  (`requireVersion = '4.7.0'`) (`webpack-plugin/src/index.js`).

* Distribution: PC package = folders `ere/` + static folder; Android package = webpack `dist/` contents
  (`example/ci/build.js`, `example/ci/android.js`).

---

## 2. The complete game-facing API

### 2.1 What `era` actually is

There is **no global `era`**. Game code does:

```js
const era = require('#/era-electron');            // SDK module export object
const { println, print, get } = require('#/era-electron'); // destructuring also works
```

The engine mutates that same object, replacing each method with a bound engine implementation. The SDK ships
a stub for every documented method plus a safety wrapper
(`sdk/era-electron.js#L613-L633`):

```js
Object.keys(era).forEach((key) => {
  if (typeof era[key] === 'function' && !era[key]._s) {
    era[key] = (...args) => {
      if (era.version.engine === void 0) {
        return console.log('[ERROR] apis has not been injected!', new Error().stack.split('\n').slice(2).join('\n'));
      }
      if (!era[key]._s) {
        return era.logger.error(
          `unsupported api! please check the version of the engine! current version: sdk=${era.version.sdk}, engine=${era.version.engine}`,
          new Error().stack.split('\n').slice(2).join('\n'),
        );
      }
      return era[key](...args);
    };
  }
});
module.exports = era;
```

Consequences:

* Calling an API the running engine does not implement logs `unsupported api!` instead of crashing.
* Destructuring at module top level is safe, because the wrapper closes over the key and dereferences
  `era[key]` at call time.
* Only in bundle mode does the same object also exist as `globalThis._era` (webpack `library.name = '_era'`),
  and the entry function as `globalThis.game`. There is no `window.era` for games; `window.ere` in the
  renderer (`src/renderer/app.vue#L959-L963`) is only a debug helper
  (`ere.showLines()`).

Non-method SDK members:

| Member | Value | Notes |
|---|---|---|
| `era.isEra` | `true` | **GAME-FACING** marker; the engine uses it to find the SDK. Must stay `true`. |
| `era.version.sdk` | `'4.8.5'` | **the minimum engine version this SDK requires** (the engine checks `engineVersion >= version.sdk` and refuses to start below it); also read by the webpack plugin |
| `era.version.engine` | `undefined` until injected, then `app.getVersion()` (`'5.0.0'`) | **GAME-FACING** |

### 2.2 Master signature list

All 57 engine-injected methods (identical to the SDK stubs except `raw`), in alphabetical order. "lines"
means it returns the new on-screen line count and increments the internal counter by 1. This is the
alphabetical view with return types; for the same surface grouped by purpose open the skill's
`references/api-cheatsheet.md`, and for one API's full signature and parameter table use `ere_api_lookup`.

| Signature | Returns | Notes |
|---|---|---|
| `era.add(varName, val)` | `any` | `set(..., isAdd)`. `era.add(k,0)`/`era.add(k)` degrade to `get(k)`. |
| `era.addCharacter(...charaId)` | `boolean \| boolean[]` | adds/creates character data |
| `era.addCharacterForTrain(...charaId)` | `void` | train-only character tables |
| `era.beginTrain(...charaId)` | `void` | creates all train tables (required before train tables) |
| `era.checkImage(...name)` | `boolean \| boolean[]` | resource existence |
| `era.clear(lineCount?)` | `Promise<number>` | clears all (omitted/NaN/too large) or the last N lines; `clear(0)` is a no-op |
| `era.drawLine(config?)` | `number` (lines) | divider line |
| `era.endTrain()` | `void` | merges `gotjuel` → `juel`, deletes train tables |
| `era.get(varName)` | `any` | read save data |
| `era.getAllCharacters()` | `number[]` | ids with static presets |
| `era.getAddedCharacters()` | `number[]` | ids currently in the save |
| `era.getCharactersInTrain()` | `number[]` | ids in train |
| `era.getLineCount()` | `number` | internal line counter |
| `era.input(config?)` | `Promise<any>` | wait for player input; number when numeric |
| `era.isDebug()` | `boolean` | |
| `era.isLandscape()` | `Promise<boolean>` | always `true` on PC |
| `era.loadData(savIndex)` | `Promise<boolean>` | |
| `era.loadGlobal()` | `Promise<boolean>` | |
| `era.nextTurnInTrain()` | `void` | delta→param, nowex→ex, clears source |
| `era.notify(content, title?, type?, duration?)` | `void` | ElNotification |
| `era.playMusic(names, config?)` | `boolean` | resource name(s) |
| `era.print(content, config?)` | `number` (lines) | |
| `era.printAndWait(content, config?)` | `Promise<number>` | print + `waitAnyKey` |
| `era.printButton(content, accelerator, config?)` | `number` (lines) | |
| `era.printImage(...names)` | `number` (lines) | |
| `era.printInColRows(...columnObjects)` | `number` (lines) | nested rows |
| `era.printLineChart(config)` | `number` (lines) | vue-chartjs passthrough (experimental) |
| `era.printMultiColumns(objects, config?)` | `number` (lines) | 24-column grid |
| `era.printProgress(percentage, inContent, outContent, config?)` | `number` (lines) | |
| `era.printWholeImage(names, config?)` | `number` (lines) | |
| `era.println()` | `number` (lines) | empty line |
| `era.quit()` | never returns | closes app by throwing `Error('quit')` |
| `era.removeCharacter(...charaId)` | `void` | deletes character data |
| `era.replaceInColRows(...columnObjects)` | `number` | replaces the last line |
| `era.replaceText(content, config?)` | `number` | replaces the last line |
| `era.resetCharacter(...charaId)` | same as `addCharacter` | alias |
| `era.resetData()` | `void` | wipes current save data, adds `defaultChara` |
| `era.resetGlobal()` | `Promise<boolean>` | recreates `global.sav` |
| `era.resumeMusic()` | `void` | |
| `era.rmData(savIndex)` | `Promise<boolean>` | |
| `era.saveData(savIndex, comment?)` | `Promise<boolean>` | |
| `era.saveGlobal()` | `Promise<boolean>` | |
| `era.set(varName, val?)` | `any` | write (or read if `val === undefined`) |
| `era.setAlign(textAlign)` | `void` | default text-align |
| `era.setBack(name?, config?)` | `void` | background image |
| `era.setColor(color?)` | `void` | default text color |
| `era.setHorizontalAlign(align)` | `void` | affects `printInColRows` only |
| `era.setMask(maskName?, opacity?)` | `void` | deprecated → `setOverlay` |
| `era.setOffset(offset)` | `void` | default grid offset 0-23 |
| `era.setOverlay(name?, config?)` | `void` | overlay image |
| `era.setTitle(title)` | `void` | window title |
| `era.setToBottom()` | `number` (lines) | full-screen spacer |
| `era.setVerticalAlign(align)` | `void` | affects `printInColRows` only |
| `era.setWidth(width)` | `void` | default grid width 1-24 |
| `era.stopMusic()` | `void` | |
| `era.toggleDebug()` | `boolean` | |
| `era.waitAnyKey()` | `Promise<void>` | |

Runtime-only extras (injected but absent from the SDK stub):

| Signature | Returns | Notes |
|---|---|---|
| `era.raw()` | `{ data, global }` | **GAME-FACING (runtime-only)** live references to the save objects; used by generated data beans. `era['raw']().data['base'][id][varNum] = v`. |
| `era.dispatchButton(buttonGroup, accelerator, ...args)` | the handler's return value | **GAME-FACING (runtime-only)** dispatches a kojo button group by accelerator: calls `buttonGroup[accelerator](...args)` and returns its result. A missing accelerator only logs `invalid accelerator: …` — it does not throw (`src/era/model/era-start.js#L95-L99`). Not in the SDK stub. |
| `era.proxyKojo(kojo)` | `Proxy` | **GAME-FACING (runtime-only)** wraps a `{name: fn}` record with `%dict%` substitution (`addProxyFunc`, `src/era/model/era-start.js#L46-L77`). `proxyKojo` is not in the SDK stub. |

SDK-only:

| Signature | Returns | Notes |
|---|---|---|
| `era.delay(delay)` | `Promise<void>` | pure `setTimeout` promise; marked `_s = true` so the engine never replaces it. **GAME-FACING**. |

Logging (SDK declares the object; the engine replaces the methods):

```js
era.logger.debug(msg)          // engine log, debug level, only when debug mode
era.logger.info(msg)           // engine log, info
era.logger.warn(msg, stack?)   // engine log + ElNotification(title '脚本警告')
era.logger.error(msg, stack?)  // engine log + ElNotification(title '脚本错误')
era.logger.assert(checkVal, aimVal) // logs/notifies when checkVal !== aimVal
```

### 2.3 Detailed semantics (implementation-derived)

#### Output / layout

* `era.print(content, config?)` — `content` may be a string (rendered with `\n` split into separate lines,
  `type:'text'`) or an **array** of pieces. When it is an array, the renderer switches to "list" mode and each
  piece becomes a span:
  * a `string` → plain span;
  * `{ content, color?, fontSize?, fontStyle?, fontWeight?, title?, url?, display? }` → styled span / tooltip /
    hyperlink (see `src/renderer/components/text-block.vue`);
  * `{ isBlank: n }` → `n` non-breaking spaces;
  * `{ isBr: n }` → `n` `<br>`;
  * `{ isDivider: true, content? }` → an inline `el-divider`.
  * `config` (`TextConfig`): `align` `'left'|'center'|'right'`, `color`, `fontSize` (string, CSS unit;
    `rem` tracks the configured font size), `isParagraph`, `offset` 0-23, `width` 1-24.
  * Empty string / empty array with no `flush` is converted to `println()`
    (`src/era/model/era-api.js#L504-L531`).
* `era.println()` — one empty line (`lineUp`).
* `era.drawLine(config?)` — `el-divider`; `config`: `content`, `position` `'left'|'center'|'right'`
  (default `'center'`), `isSolid` (default false → dashed), `offset`, `width`.
* `era.printButton(content, accelerator, config?)` — `el-button` when `isButton: true`, else a link-style
  `el-button` (`link` prop). Renderer transforms the label
  (`src/renderer/app.vue#L203-L248`):

  ```js
  contents: (data.config['showAcc'] !== false
    ? `[${data.accelerator}] ${data.content}`
    : `[${data.content}]`
  ).split('\n').map((e) => e.replace(/\s+/g, ' ')),
  buttonType: safeUndefinedCheck(data.config.buttonType, data.config.isButton ? '' : 'warning'),
  ```

  `ButtonConfig` keys: `align` (defaults to `setAlign` value), `badge` (`'dot'` or text, `el-badge`),
  `buttonType` `'primary'|'success'|'warning'|'danger'|'info'|''` (default `'warning'` for links, `''` for
  buttons), `color` (only meaningful when `isButton` is false), `disabled`, `disableContinue`,
  `disableWarning`, `inTextAlign` (default `'center'`), `isButton` (default false), `offset`, `showAcc`
  (default true on PC), `title` (tooltip), `width`.
* `era.printProgress(percentage, inContent, outContent, config?)` — `el-progress` with `text-inside`.
  `config`: `align`, `barWidth` (1-24, default 24), `color`, `duration` (easing length in seconds, default 0.6;
  **0 disables the easing** — use that when you repaint every frame), `easing` (CSS easing function, default
  `'ease'`), `fontColor`, `height` (6-30 px, default 24), `offset`, `width`. `percentage` is clamped to 0-100
  (default 100 when invalid). `duration` / `easing` need engine 4.8.4 or later.
* `era.printImage(...names)` — sliced images (emuera style), stacked in argument order (first = bottom).
  Each name must be registered in `res/`.
* `era.printWholeImage(names, config?)` — full image, `fit` `'fill'|'contain'|'cover'|'none'|'scale-down'`
  (default `'contain'`), `offset`, `width`.
* `era.printMultiColumns(objects, config?)` — one row; `objects` is an array of grid objects, each requiring a
  `type` (`'button' | 'divider' | 'image' | 'image.whole' | 'progress' | 'text'`); objects without `type` or
  with an unknown `type` are **silently dropped**. `config` (`ColumnConfig`): `gutter`,
  `horizontalAlign` (`justify`), `verticalAlign`, `offset`, `width`.
* `era.printInColRows(...columnObjects)` — rows inside columns. Each argument is either an array of grid
  objects (auto-wrapped) or `{ columns, config }`; alignment comes from `setHorizontalAlign` /
  `setVerticalAlign`, not from an argument.
* `era.replaceText(content, config?)` / `era.replaceInColRows(...)` — replace the **previously emitted line**
  (including the echoed user input if input is visible) without incrementing the counter.
* `era.printLineChart(config)` — forwarded to `vue-chartjs`'s `<Line :data="line.data" :options="line.options">`;
  pass `{ data, options }` as for chart.js line charts. `options.scales.x.ticks.callback` /
  `options.scales.y.ticks.callback`, when arrays, are rebuilt via `new Function(...arr)`
  (`src/renderer/app.vue#L858-L879`). Treat as advanced/experimental.
* `era.setToBottom()` — pushes a full-height spacer so subsequent lines start at the bottom.
* `era.setAlign/setColor/setOffset/setWidth` set defaults used when `config` omits `align/color/offset/width`.
  Initial defaults: `textAlign='left'`, `colOffset=0`, `colWidth=24`, `color` unset (renderer default),
  `verticalAlign='top'`, `horizontalAlign='start'`, `gutter=0`.
* `era.setBack(name?, config?)` / `era.setOverlay(name?, config?)` — `name` is a registered whole-image name
  (or `undefined` to clear); `config`: `opacity` (0-1), `position` (number 1-9 or the names
  `'topleft'…'bottomright'`, see `OBPosition`), `fit` (`'contain'|'cover'|'fit'|…`). Old `setMask(name, opacity)`
  is a deprecated alias for `setOverlay`.
* `era.setTitle(title)` — window title; the engine also sets the title from `gamebase` on load.
* `era.notify(content, title?, type?, duration?)` — `ElNotification`; `content` may be a string or an array of
  span-like objects (`{content,color,fontSize,fontWeight}`, `{isBr}`, `{isBlank}`); `type` is
  `'success'|'info'|'warning'|'error'|''`; `duration` is **milliseconds**, `0` keeps the notification on
  screen, default 5000. **Version note:** engines up to 4.8.2 received only `notify(content, title, type)`
  and silently dropped `duration`, so every notification lasted 5000 ms; 4.8.3 and later forward it. Do not
  rely on a sticky notification unless the player's engine is 4.8.3+.

#### Input

`src/era/model/era-api.js#L284-L304`:

```js
input(config) {
  this.inputKey = new Date().getTime().toString();
  config ||= {};
  this.era.connect('input', { config, inputKey: this.inputKey });
  return new Promise((r) => {
    this.era.listen(this.inputKey, (_, ret) => {
      this.era.cleanListener(this.inputKey);
      this.inputKey = undefined;
      const val = getNumber(ret.val);
      this.isContinue = ret.continue;
      if (!safelyGetObjectEntry(this.config, 'system.hideUserInput') && !config.hideInput && !config.any) {
        this.print(val);
      }
      r(val);
    });
  });
}
```

`config` keys: `rule` (regex **string**, matched as `^rule$`), `useRule` (default `true`, renderer-side
`safeUndefinedCheck(data.config.useRule, true)`), `disableBefore` (default `true`), `hideInput`,
`show` (Android only, informational).

Behaviour an agent must know:

* Accelerators of all **enabled** buttons emitted since the last input are collected into the accepted-value
  list; clicking one returns its `accelerator` (a number).
* After user input, previously emitted buttons become disabled (`buttonValCount`), unless the input was made
  with `disableBefore: false`.
* Pressing Enter/clicking the left mouse button with no typed text returns `inputParam.val` via
  `returnFromInput()`; if a rule list has exactly one value, that value is auto-returned; `any` inputs return
  on any click/keystroke.
* **Right click** anywhere = "continue"/fast-forward (`continueReturning()` sets `continue = true`), which is
  why `era.clear()` calls `waitAnyKey(true)` when `isContinue` is set
  (`src/era/model/era-api.js#L222-L230`).
* Returned value is numeric when `Number(val)` is not `NaN` (`getNumber`), otherwise the raw string.
* Invalid input shows `ElMessage` `输入不合法！…` and is not returned.
* **`era.waitAnyKey()` only waits if something new was printed** (`allowWait` is set by every line-emitting
  API; `clear()` can also pass `fromClear`). After a previous wait, a bare `await era.waitAnyKey()` resolves
  immediately (`src/era/model/era-api.js#L904-L913`). `printAndWait` always
  waits because `print` sets the flag.

Typed input example:

```js
console.log(await era.input({ rule: '[0-3]' }));
```

#### Music

```js
era.playMusic(names, config?)   // names: string | string[]; first *registered* name wins
era.stopMusic()                 // pause
era.resumeMusic()               // resume (if readyState > 0)
```

`config`: `{ loop?: boolean, fade?: boolean, fadeInternal?: number }`. If `config` is not an object the engine
uses `{ loop: false }`. `fadeInternal` is the fade length in ms (100-500, default 200) and **had no effect before
engine 4.8.4** — on older engines the fade always used its own default. `playMusic` returns `false` if no matching
audio resource exists. Registration is by
extension (see §8.5).

#### Character lifecycle

* `era.addCharacter(...ids)` creates/overwrites the character's tables from the static presets. Passing an
  array `[dst, src]` clones preset character `src` into slot `dst`
  (`src/era/model/era-api.js#L31-L142`).
* `era.resetCharacter(...ids)` is an alias.
* `era.removeCharacter(...ids)` deletes the character from `no` and all tables, and prunes
  `relation`/`callname` references from other characters.
* `era.getAllCharacters()` = keys of `staticData.chara` (all presets);
  `era.getAddedCharacters()` = keys of `data.base` (in the current save);
  `era.getCharactersInTrain()` = keys of `data.tequip`.
* `era.resetData()` resets the current save to the canonical empty shape
  (`src/era/model/era-api.js#L727-L758`):

  ```js
  this.era.data = {
    abl: {}, base: {}, callname: {}, cflag: {},
    code: this.staticData.gamebase.gameCode, cstr: {}, equip: {}, exp: {},
    flag: {}, item: { bought: -1, hold: {}, price: {}, sales: {} },
    juel: {}, love: {}, mark: {}, maxbase: {}, no: [], relation: {},
    source: {}, talent: {}, version: this.staticData.gamebase.version,
  };
  this.fillData();
  if (this.staticData.gamebase.defaultChara !== undefined) {
    this.addCharacter(this.staticData.gamebase.defaultChara);
  }
  ```

#### Train system

`beginTrain(ids...)` creates `deltabase, tequip, tflag, tcvar, palam, delta, gotjuel, source, stain, ex, nowex`
and calls `addCharacterForTrain(ids...)`; the latter creates per-character sub-tables for those ids (skipping
already-initialised ones). `nextTurnInTrain()` applies `deltabase → base` (clamped to 0..maxbase), `delta →
palam`, `nowex → ex`, and clears `source`. `endTrain()` adds `gotjuel` into `juel` and deletes all train-only
tables. See `src/era/model/era-api.js#L144-L262` and the worked flow in
`example/ere/page/page-ero.js#L219-L229`.

### 2.4 Real usage examples (verbatim)

Title screen choice loop (`example/ere/main.js#L14-L43`):

```js
let flag = true;
while (flag) {
  await era.clear();
  era.setAlign('center');
  era.drawLine({ isSolid: true });
  era.print('我是一个游戏标题');
  era.print(`v${era.get('gamebase').version / 1000}`);
  era.print('你');
  era.drawLine({ isSolid: true });
  era.printButton('开始游戏', 1);
  era.printButton('加载存档', 2);
  era.printButton('鸣谢列表', 3);
  era.drawLine({ isSolid: true });
  era.setAlign('left');
  switch (await era.input()) {
    case 1:
      era.resetData();
      [1, 2].forEach((e) => {
        era.addCharacter(e);
        era.set(`relation:${e}:0`, 0);
      });
      era.set('flag:日元', 10000);
      init_queue();
      era.set('flag:当前角色', 1);
      await homepage();
      break;
    ...
  }
}
```

Mixed layout with buttons + progress bars (`example/ere/page/homepage.js#L26-L57`):

```js
const cur_chara = era.get('flag:当前角色');
era.printMultiColumns([
  {
    config: { align: 'center', color: era.get(`cstr:${cur_chara}:代表色`), width: 4 },
    content: era.get(`callname:${cur_chara}:-2`),
    type: 'text',
  },
  { config: { width: 4 }, content: `好感度：${era.get(`relation:${cur_chara}:0`)}`, type: 'text' },
  {
    config: { color: '#009300', height: 20, width: 7 },
    inContent: `体力：${era.get(`base:${cur_chara}:体力`)} / ${era.get(`maxbase:${cur_chara}:体力`)}`,
    percentage: (era.get(`base:${cur_chara}:体力`) * 100) / era.get(`maxbase:${cur_chara}:体力`),
    type: 'progress',
  },
  ...
]);
```

Buttons generated from an enum array (`example/ere/page/homepage.js#L77-L84`):

```js
era.printMultiColumns(
  ['聊天', '切换口上', '开始调教'].map((e, i) => ({
    accelerator: i + 100,
    config: { align: 'center', width: 8 },
    content: e,
    type: 'button',
  })),
);
```

---

## 3. Element Plus / Vue usage

**Game code never writes Vue or Element Plus.** `ere/*.js` is plain CommonJS running in the Electron main
process; the renderer (`src/renderer/app.vue`, Vue 3 `<script setup>` + Element
Plus) owns all rendering. Game code produces a stream of **line objects** through the `era.print*` family, and
`era.input()` waits for a value back.

Pipeline:

```
game code (main process)
  era.print(...) ──IPC: connect('print', data)──▶ app.vue connector.register('print')
      └─ getTextObject(data) ─▶ lines.value.push(line)
                                     │
                              <template> el-row / el-col / print-block / text-block / button-block
```

"Pages" are therefore just **async functions** that loop: `await era.clear()` → emit lines → `await era.input()`
→ branch. Example page modules: `example/ere/page/homepage.js`,
`example/ere/page/page-ero.js`, `example/ere/page/page-shop.js`,
`example/ere/page/page-info.js`,
`example/ere/page/page-save-game.js`,
`example/ere/page/page-load-game.js`,
`example/ere/page/page-abl-up.js`. Each ends with `module.exports = page_xxx;`
and callers do `await page_xxx(...)`.

### 3.1 API → Element Plus mapping (renderer, GAME-FACING effects only)

| era API | renderer object | Element Plus / HTML |
|---|---|---|
| `era.print` | `text` line | `<el-col>` + styled `<div>` + `<span>`/`<el-tooltip>`/`<el-link>`/inline `<el-divider>` |
| `era.println` | `lineUp` line | `<br>` |
| `era.drawLine` | `divider` line | `<el-divider :border-style :content-position>` |
| `era.printButton` | `button` line | `<el-badge><el-button :type :link :color :disabled>` (+ `<el-tooltip>` when `title`) |
| `era.printImage` | `image` line | `<section>` + absolutely positioned `<img>` with `object-position` cropping |
| `era.printWholeImage` | `image.whole` line | `<section>` + `<img object-fit>` |
| `era.printProgress` | `progress` line | `<el-row><el-col><el-progress :text-inside :stroke-width :color>` |
| `era.printMultiColumns` | `multiCol` line | `<el-col :offset :span><el-row :justify :align :gutter>` + nested `print-block` |
| `era.printInColRows` | `inColRows` line | `<el-row>` of `<el-col>` each containing its own nested `<el-row>` |
| `era.printLineChart` | `lineChart` line | `vue-chartjs` `<Line :data :options>` (chart.js) |
| `era.setToBottom` | `empty` line | full-height `<div>` |
| `era.notify` | IPC `notify` | `ElNotification` |
| input errors | IPC `input` + rule | `ElMessage` `输入不合法！…` |
| `era.logger.warn/error` | IPC `warn`/`error` | `ElNotification` `脚本警告`/`脚本错误` (duration 0) |

`el-container / el-main / el-scrollbar / el-input` form the page skeleton; the input box is a single
`<el-input>` at the bottom of the scroll area
(`src/renderer/app.vue#L992-L1116`).

### 3.2 24-column grid rules

* Every line is an `el-row`; inside it, widths/offsets are in **columns of 24**.
* `offset` ∈ [0,23], `width` ∈ [1,24]; out-of-range values fall back to the current defaults
  (`getValidOffset`/`getValidWidth`).
* Text wraps inside its column; button labels do not wrap.
* In `printMultiColumns(objects, {offset, width})`, the second argument sizes the **outer** column; the
  per-object `config.width` is relative to that outer width.
* `printInColRows` is the tool for "independent column heights" (each big column is its own nested row).

### 3.3 Practical rendering notes

* `flush: true` in a print config bypasses the renderer's batching so lines appear immediately (the engine uses
  it during loading). It also suppresses the empty-string → `println` conversion.
* `system.collapseBlankLines` (config) hides consecutive `lineUp`s and duplicate dividers.
* `system.disableClear` makes the renderer ignore clears and trim to `window.limit` lines (default 512).
  **Bug before 4.8.6:** that trim never ran, so the screen grew without bound.
* A non-zero `gutter` in `printMultiColumns` / `printInColRows` drew a horizontal scrollbar before 4.8.6
  (the row margins are removed from 4.8.6 on).
* The whole interface is inside a scroll container that auto-scrolls to the input line after each flush.

---

## 4. Data access APIs

All save-data access goes through `era.get` / `era.set` / `era.add`, implemented in
`src/era/model/apis/era-set.js`.

```js
era.get(varName)          // === era.set(varName, undefined)
era.set(varName, val?)    // returns the (new) value
era.add(varName, val)     // set(varName, val, isAdd = true); returns new value
```

### 4.1 Key grammar

A key is `table` or `table:index1` or `table:index2:index3`. The whole key is lower-cased with
`key.split(':').map((x) => x.toLocaleLowerCase())` before lookup, so **variable names are case-insensitive**
(`快C` ≡ `快c`, `C感觉` ≡ `c感觉`).

Normalisations applied first (`src/era/model/apis/era-set.js#L18-L25`):

```js
if (tableName === 'param') tableName = 'palam';
else if (tableName.endsWith('jewel')) tableName = tableName.substring(0, len - 5) + 'juel';
```

So `param*` is an alias of `palam*`, and `jewel`/`gotjewel` alias `juel`/`gotjuel`.

#### One-part keys (system tables and metadata)

| Key | Result |
|---|---|
| `'no'` | `data.no` — array of added character ids |
| `'gameconfig'` | the live config object (read via `config`) |
| `'gamebase'` | `staticData.gamebase` (title, author, version, gameCode, allowVersion, …) — read-only |
| `'version'` | current save version; `set('version', n)` writes it |
| `'chara'` | sorted array of all preset character ids |
| `'global'` | the whole global-save object (`{saves, version, code, …Global.csv vars}`) |
| `'<table>'` | whole table object, for `flag`, `global`, `item`, `tflag`, `love`, and any extended table of type `normal` |
| `'<table>names'` | array of variable **names** (declaration order / numeric order) |
| `'<table>keys'` | array of variable **numbers** |
| `'<table>entries'` | array of `[name, number]` pairs |

Special-cased plural families: `paramnames|paramkeys|paramentries` and `jewel*` operate on `staticData.juel`;
`itemnames|itemkeys|itementries` operate on `staticData.item.name`.

Real usages (`example/ere/page/page-ero.js#L38-L49`,
`example/ere/page/page-info.js#L51-L138`):

```js
era.get('paramkeys').filter((e) => era.get(`source:${target}:${e}`) > 0)...
era.get(`paramname:${e}`).toUpperCase()
era.get('talentkeys').map((e) => { const val = era.get(`talent:${id}:${e}`); ... })
era.get(`jewelkeys`).filter((k) => k !== 2)
era.get(`jewelname:${k}`).toUpperCase()
era.get(`expkeys`)
era.get(`markkeys`)
era.get(`ablkeys`)
era.get(`itemprice:${item_id}`)
era.get(`itemname:${item_id}`)
```

#### Two-part keys

| Key | Result |
|---|---|
| `'callname:<id>'` | that character's whole callname object |
| `'chara:<id>'` | that character's static preset object |
| `'love:<id>'` | love value; writable |
| `'global:<var>'` | global variable; writable |
| `'relation:<id>'` | that character's relation object |
| `'<table>name:<num>'` (`ablname`, `talentname`, `markname`, `expname`, `sourcename`, `paramname`, `jewelname`, `itemname`, …) | name of the variable with that number |
| `'itemname:bought'` | name of the last bought item |
| `'item:bought'` | last bought item number; writable |
| `'item:<name\|num>'` | held count; writable |
| `'itemprice:<name\|num>'` | price; writable |
| `'itemsales:<name\|num>'` | on-sale count; writable |
| `'<table>:<var>'` for one-dimensional tables (`flag`, `global`, `tflag`, `love`, extended normal tables) | value; writable |

#### Three-part keys (character tables)

| Key | Result |
|---|---|
| `'callname:<A>:<B>'` | A's name for B; falls back to B's default callname (`-2`), else `'-'`; writable |
| `'relation:<A>:<B>'` | A→B relation; writable |
| `'global:<A>:<B>'` | nested global object access (`global:saves:3` reads/writes `global.saves[3]`) |
| `'base:<id>:<var>'` | current base value; writing clamps to `0..maxbase` when `maxbase > 0` |
| `'maxbase:<id>:<var>'`, `'deltabase:<id>:<var>'` | writable |
| `'static:<id>:<attr>'` | preset scalar (`name`, `callname`, `title`, …) — read-only |
| `'static<Table>:<id>:<var>'` | preset value inside a table, e.g. `'staticbase:1:体力'` — read-only |
| `'palam\|param:<id>:<var>'`, `'delta:<id>:<var>'`, `'gotjuel\|gotjewel:<id>:<var>'` | train parameters (numbers resolved through the `juel` table) |
| `'nowex:<id>:<var>'` | resolves ids through the `ex` table |
| `'juel\|jewel:<id>:<var>'`, `'abl:<id>:<var>'`, `'talent:<id>:<var>'`, `'cflag:<id>:<var>'`, `'cstr:<id>:<var>'`, `'equip:<id>:<var>'`, `'mark:<id>:<var>'`, `'exp:<id>:<var>'`, `'source:<id>:<var>'`, `'stain:<id>:<var>'`, `'tequip:<id>:<var>'`, `'tcvar:<id>:<var>'`, `'ex:<id>:<var>'` | character tables; writable |

### 4.2 Table inventory

| Table | Dimension | Defined by | Storage | Display/notes |
|---|---|---|---|---|
| `flag` | 1D | Flag.csv | `data.flag[num]` | system flags, per-save |
| `tflag` | 1D | TFlag.csv | `data.tflag[num]` | train-only (created by `beginTrain`) |
| `global` | 1D | Global.csv | `era.global[num]` | survives across saves (`global.sav`) |
| `love` | 1D | (built-in) | `data.love[id]` | love toward `defaultChara` |
| `item` | 1D | Item.csv | `data.item.{hold,price,sales}[num]`, `data.item.bought` | 3-column csv `num,name,price` |
| `base` / `maxbase` | 2D | Base.csv | `data.base[id][num]` / `data.maxbase[id][num]` | writes to `base` clamp |
| `deltabase` | 2D | Base.csv | train-only delta |
| `abl` | 2D | Abl.csv | `data.abl[id][num]` | |
| `talent` | 2D | Talent.csv | `data.talent[id][num]` | values may be negative (e.g. `-1` insensitivity) |
| `cflag` | 2D | CFlag.csv | `data.cflag[id][num]` | character flags |
| `cstr` | 2D | CStr.csv | `data.cstr[id][num]` | strings, default `''` |
| `equip` | 2D | Equip.csv | `data.equip[id][num]` | |
| `mark` | 2D | Mark.csv | `data.mark[id][num]` | |
| `exp` | 2D | Exp.csv | `data.exp[id][num]` | |
| `juel` (`jewel`) | 2D | Param.csv / Palam.csv | `data.juel[id][num]` | jewel counts |
| `palam` (`param`) | 2D | Param.csv / Palam.csv | `data.palam[id][num]` | train parameters (emotions/values) |
| `delta`, `gotjuel` (`gotjewel`) | 2D | Param.csv | train-only |
| `source` | 2D | Source.csv | train-only, cleared each `nextTurnInTrain` |
| `stain` | 2D | Stain.csv | train-only, bitfield by convention |
| `ex` / `nowex` | 2D | Ex.csv | train-only marks, merged by `nextTurnInTrain` |
| `tequip` | 2D | TEquip.csv | train-only equipment |
| `tcvar` | 2D | TCvar.csv | train-only |
| `callname` | 2D built-in | — | `data.callname[id][-1]=name`, `[id][-2]=default callname`, `[A][B]` |
| `relation` | 2D built-in | — | `data.relation[A][B]` |
| extended tables | 1D by default | any `Foo.csv` | `data.foo[num]`; add to `system.extendedCharaTables` for 2D `data.foo[id][num]`. **Bug before 4.8.3:** the chara-type check was wrong, so extended tables did not initialise correctly — on engines older than 4.8.3 treat 2D extended tables as unavailable |

Alias/reserved-name rules (`src/era/model/era-start.js#L433-L572`,
`src/era/name-mapping.json`):

* Deprecated (skipped with warning): `variablesize, str, strname, globals, train`.
* Protected (skipped with warning): `maxbase, deltabase, juel, jewel, delta, gotjuel, gotjewel, nowex, no,
  static, callname, love, relation, code, version, res`.
* `<table>names`, `<table>keys`, `<table>values`, `<table>entries` are refused as file names (they belong to an
  existing table).
* Character csv first column may use Chinese/Japanese names, English names or aliases from
  `name-mapping.json` (`角色编号/番号 → id`, `姓名/名前 → name`, `称呼/呼び名/callname_to → callname`,
  `基础属性/基礎 → base`, `技能/能力 → abl`, `特性/特质/素質 → talent`, `角色flag/フラグ → cflag`,
  `角色str → cstr`, `信赖/相性 → relation`, `装备/装着物 → equip`, `刻印 → mark`, `经验/経験 → exp`,
  `珠/宝珠/jewel → juel`, `称号/别名/あだ名 → title`).
* GameBase column names are mapped by `name-mapping.json` too (`作者 → author`, `游戏名称/タイトル → title`,
  `游戏标识/コード → gameCode`, `初始角色编号 → defaultChara`, `版本 → version`, `版本代号 → versionName`,
  `最低支持版本 → allowVersion`, `发布页 → site`, `游戏图标 → icon`, `版本检查 → versionCheck`,
  `程序更新 → baseZip`, `追加信息/追加情報 → info`, `发布时间/製作年 → year`).
* In a character file, `item`, `flag`, `global` and tables already marked `normal` are rejected with
  `角色定义中使用了错误的表名`.

### 4.3 `fillData()` — what a new save contains

Called by `resetData()` and after `loadData()` (`src/era/model/era-api-base.js#L91-L201`):
every `flag` starts at `0`; every item gets `hold=0`, `sales=0`, `price=Item.csv price`; every `base`/`maxbase`
and every 2D table variable is `0` (`cstr` → `''`); extended tables are initialised; `callname[id][-1/-2]` and
`relationship` presets are applied. This is what makes old saves compatible with newly added variables.

### 4.4 Quirks that bite

1. **Unknown variable names inside a valid table do not error.** `safeUndefinedCheck` falls back to the raw
   name, so `era.get('source:1:润滑')` returns `undefined` when `润滑` is not in Source.csv. `era.add` on such
   a key computes `undefined + n = NaN` (silent corruption). Only an unknown 1-part/2-part *table* name (or a
   missing 1-D table such as `tflag` before `beginTrain`) produces
   `key error in getter/setter! key (...)` (`era.error`, i.e. console + notification); 3-part keys on a table
   whose per-character object is missing just return `undefined`.
2. **`era.add(key, 0)` and `era.add(key)` call `get`** because of `if (!v) return this.get(k)`
   (`src/era/model/era-api.js#L24-L29`). Adding `0` never writes.
3. **`param` means `palam`, not `juel`.** All train parameters (`快C`, `快V`, `润滑`, `欲望`, `痛苦`, `否定`)
   live in `palam`; `juel` is the jewel table. Both are created only by `beginTrain`.
4. **Train tables require `beginTrain`.** Before that, 3-part keys on `stain`/`ex`/`nowex`/`source`/`delta`/
   `tequip`/`tcvar`/`palam`/`gotjuel`/`deltabase` return `undefined` (the per-character object does not exist,
   no error), while the 1-D train table `tflag` (2-part key) falls through to
   `key error in getter/setter!` because `data.tflag` itself is missing.
5. **`item` is flat.** `era.get('item:1:媚药')` / `era.add('item:2:润滑液', -1)`
   (as used in `example/ere/event/ero/ero-result.js#L122-L127`)
   silently return `undefined` and change nothing. Use `era.get('item:媚药')` / `era.add('item:媚药', -1)`.
6. **`base` writes clamp** to `0..maxbase` when `maxbase > 0`; `maxbase`/`deltabase` do not.
7. **Names come back lower-cased.** Static variable names are stored lower-cased, so display code calls
   `.toUpperCase()` (see the comment in `example/ere/page/page-info.js#L82-L84`).
   Values (`cstr` contents, text) keep their case.
8. `era.get('callname:<id>')` returns an object, not a string; use `callname:<id>:-1` / `:-2`.
9. `relation:<A>:<B>` returns `undefined` for non-added characters; `callname` returns `'-'`.
10. `era.raw()` returns **live** objects; mutating them bypasses clamping and defaults (that is intentional in
    generated beans, where `base` gets its own `setBase` helper).

---

## 5. Event / line (口上) system

Two layers exist:

1. **Hand-written JS layer** in the official example (`#/data/event`, `#/event/lines`, `#/event/ero`,
   `#/sys/sys-event-queue.js`). This is *game architecture*, not engine API — copy it or replace it.
2. **`.kojo` text layer**, an engine (and webpack-loader) feature for writing dialogue in YAML.

### 5.1 Hook enum

`example/ere/data/event/hooks.js`:

```js
// 定义了所有可能触发口上指令的枚举
// 注意这个枚举中枚举值的名字和 #/event/lines/lines-common.js 中的口上方法应该是有一一对应关系的
const hooks = {
  // 聊天
  talk: 0,
};
Object.keys(hooks).forEach((e, i) => (hooks[e] = i));
// 用 hooks.keys 放所有枚举值的名字
// 注意 hooks.keys 这个数组中每个枚举值名字的下标正好是枚举值
hooks.keys = Object.keys(hooks);

module.exports = hooks;
```

Contract: **enum member name === method name on the 口上 class**, and `hooks.keys[hook]` maps the numeric
value back to the method name. Values are the declaration order (0,1,2,…).

### 5.2 Value objects

`example/ere/data/event/line-arg.js` — carries "should the generic/common
handler run?":

```js
class LineArg {
  // result 表示是否要执行通用处理
  result = true;
}
```

`example/ere/data/event/check-object.js` — execution-value (实行值) check
buffer: `{ buffer: string[], check: number, border: number }`.

`example/ere/data/event/event-object.js` — a queued random event
`{ chara_id: number, event?: string }` plus `static from_obj(obj)` because class instances degrade to plain
objects after save/load.

### 5.3 Dispatch: `lines-factory.js`

`example/ere/event/lines/lines-factory.js`:

```js
const cons_dict = {};
cons_dict[1] = require('#/event/lines/lines-1-2');
cons_dict[2] = require('#/event/lines/lines-2');

const obj_dict = {};

function get_custom_lines(id) {
  if (!obj_dict[id]) {
    obj_dict[id] = new (cons_dict[id] || CustomizedLines)(id);
  }
  return obj_dict[id].get_this();
}

module.exports = {
  get_custom_lines,
  async run_custom_lines(id, hook, event) {
    const obj = get_custom_lines(id), arg = new LineArg();
    let ret;
    if (event === undefined || obj[event.event] === undefined) {
      await obj[hooks.keys[hook]].call(obj, arg);
    } else {
      ret = await obj[event.event].call(obj, arg, event);
    }
    if (arg.result) {
      await lines_result[hook](id);
    }
    return ret;
  },
};
```

Dispatch rules to preserve when writing a new game:

* `cons_dict[id]` maps a character id to its 口上 subclass; unknown ids fall back to the base class.
  `get_this()` allows a sub-class to delegate to another instance (second-口上 pattern in
  `example/ere/event/lines/lines-1-2.js`).
* Normal call: `obj[hooks.keys[hook]](arg)`.
* Random event with `event.event` naming a method on the object: `obj[event.event](arg, event)`; its **truthy
  return value** tells the caller to skip the normal 口上 (`homepage.js`: `if (!(await
  sys_get_random_event(hooks.talk)()))`).
* If the method left `arg.result === true`, the generic result handler `lines_result[hook](id)` runs.
* The base class `example/ere/event/line-base.js` caches `id`, `name`
  (`callname:<id>:-1`) and `callname` (`callname:<id>:-2`) in the constructor and provides `get_this()`.
* Base 口上 `example/ere/event/lines/lines-common.js` implements the default
  `talk(arg)` / `switch()`.
* Every hook also needs an entry in `example/ere/event/lines/lines-result.js`,
  keyed by the enum value:

  ```js
  module.exports = {
    /** @param {number} id */
    async [event_hooks.talk](id) {
      era.println();
      era.add(`relation:${id}:0`, 1);
      await era.printAndWait(['和 ', era.get(`callname:${id}:-2`), ' 的好感度上升了 1 点……']);
    },
  };
  ```

### 5.4 Event queue (save-safe random events)

`example/ere/sys/sys-event-queue.js` keeps the queue
**inside the save** under `flag:事件队列`, so it survives save/load, and rebuilds class instances on load:

```js
let queue;

module.exports = {
  add_event(hook, event) {
    queue[hook] ||= [];
    queue[hook].push(event);
  },
  get_random_event(hook) {
    queue[hook] ||= [];
    return queue[hook].shift();
  },
  init_queue() {
    queue = era.get('flag:事件队列') || era.set('flag:事件队列', {});
    for (const k in queue) {
      queue[k] = queue[k].map((e) => EventObject.from_obj(e));
    }
  },
};
```

`init_queue()` must be called on new game and after a successful `era.loadData`
(`example/ere/main.js#L40`, `example/ere/page/page-load-game.js#L61`).
Producing a reducible event (`example/ere/event/lines/lines-2.js#L26-L39`):

```js
async talk(arg) {
  await era.printAndWait([this.callname, ' 简单说了下自己的见闻。'], {
    color: era.get(`cstr:${this.id}:代表色`),
  });
  arg.result = false;
  era.println();
  const relation = era.add(`relation:${this.id}:0`, 2);
  await era.printAndWait(['和 ', this.callname, ' 的好感度上升了 2 点……']);
  if (relation >= 10) {
    const event = new EventObject(this.id);
    event.event = 'interrupt';
    add_event(hooks.talk, event);
  }
}
```

On the next `talk`, `sys_get_random_event(hooks.talk)` builds `() => run_custom_lines(event.chara_id, hook,
event)` (`example/ere/sys/sys-get-random-event.js`); returning `true`
from the event method skips the ordinary 口上.

### 5.5 Ero (train) 口上 factory

`example/ere/event/ero/ero-factory.js` mirrors the line
factory with `action_enum.keys[action]` and a `result_handlers` table filled by
`example/ere/event/ero/ero-result.js`:

```js
async run_custom_ero(id, action, check) {
  const obj = get_custom_ero(id),
    func = action_enum.keys[action],
    arg = new LineArg();
  const ret = await obj[func].call(obj, arg, check);
  if (arg.result && result_handlers[action] !== undefined) {
    await result_handlers[action](id, check);
    return true;
  }
  return ret;
}
```

`run_custom_ero` returning `true` is the signal for `example/ere/page/page-ero.js#L409`
to run the whole common settlement (source scaling, orgasm, stamina, marks, jewels). The 口上 base class
`example/ere/event/ero/ero-common.js` implements the 地文 (`pet`,
`masturbate(arg, check)`, `missionary`, `stimulate_g_spot`, `poison`, `lubricant`, plus empty hooks
`not_virgin`, `get_hate_mark(_old,_new)`, `get_pain_mark(_old,_new)`), and
`example/ere/sys/sys-check-action.js` provides
`add_abl_check / add_mark_check / add_param_check / add_talent_check / add_tequip_check`
(all return the contributed value and append a human-readable fragment to `check.buffer`).

### 5.6 `.kojo` dialogue files (engine feature)

`require('#/xxx.kojo')` from game code is intercepted by the engine's custom require and compiled to JS
(`src/era/model/era-start.js#L811-L847`):

```js
const code = `(function(exports,require,module,__filename,__dirname){const era=require(${JSON.stringify(modules.era.id)});${parseKojo(yaml)}});`;
const compiledCode = vm.runInThisContext(code, { displayErrors: true, filename: path, lineOffset: 0 });
```

* The SDK must already be loaded before the first `.kojo` require (the generated code requires the SDK module
  id found in the cache).
* The same transformation is available at build time via `kojo-loader`
  (`src/kojo-loader/src/index.js`), configured as
  `{ test: /\.kojo$/, use: { loader: ..., options: { sdkPath: '#/era-electron' } } }`.
* YAML shape: top-level keys are 篇目 names mapping to a list of lines. Supported per-line forms (see
  `src/kojo-loader/src/parse-kojo.js` and the wiki chapter
  `era-electron.wiki/dev-guides/C-kojo.md`):
  * `- 文本` → `await era.printAndWait('文本', { dict })`
  * `-` (null) / `- lineUp: true` → `era.println()`
  * `- divider: true` + DividerConfig keys → `era.drawLine(config)`
  * `- acc: N` + `content:` (+ `comment:`, `if:`, `lines:`) → `era.printButton(content, N, {dict})`, adjacent
    `acc` lines form one button group ended by a single `await era.input()`
  * `- random: true` + `lines:` → random choice among sibling entries, `if:`-filtered
  * `- content: ...` + TextConfig keys → `era.printAndWait(content, config)`
  * `- if: <js expr>` on almost anything; expressions may use JS, `Math`, **synchronous** `era` APIs, `d`
    (dict) and `a` (array of chosen accelerators)
  * `- lines:` (without `acc`/`random`) → conditional closure
  * `- color: %KEY%` → dict-substituted colour; `%KEY%` in text/button content is dict-substituted
  * `sync: true` + `lines:` at the 篇目 level → synchronous function using `era.print` (no `await`), and it
    cannot contain button groups
* Exports of a `.kojo` module: a record of functions. Async ones return an array of the accelerator values the
  player chose, in click order.
  Functions may carry extra properties (e.g. `lines['key'].title`, used as a header string).
* How dict substitution is implemented (`src/era/model/era-start.js#L46-L77`):
  `proxyKojo` turns `%key%` into `new RegExp('%key%','g')` replacements from the dict; the replacement value is
  `(v ?? 'void 0').toString()`, and the raw dict is passed as the second argument (`d`).

Minimal example:

```yaml
test:
  - 测试口上
  -
  - 这是第一行
  - 这是第二行
  -
  - acc: 0
    content: 点击继续
  -
  - color: '#ffffa0'
    content: 这是第三行
  - content:
      - 这是
      - fontWeight: bold
        content: 第四行
```

---

## 6. Save / load APIs

Files live in `<game>/sav/`:

* `global.sav` — JSON: `{ ...Global.csv vars, code, saves: {index: comment}, version }`.
* `save<N>.sav` — JSON (`system.saveCompressedData === false`) or gzip (`true`) of the whole `data` object
  plus `code`/`version`.

```js
await era.resetGlobal();          // rebuild global.sav from scratch; Promise<boolean>
await era.loadGlobal();           // read global.sav (also scans sav/); Promise<boolean>
await era.saveGlobal();           // write global.sav; Promise<boolean>

era.resetData();                  // wipe current save in memory (non-async, void)
await era.saveData(sav, comment?);// Promise<boolean>
await era.loadData(sav);          // Promise<boolean>
await era.rmData(sav);            // Promise<boolean>
```

Details from `src/era/model/era-api.js#L306-L412,L460-L484,L760-L830`:

* `loadData` tries plain JSON first, then gzip (`saveCompressedData` flips the order). Fails with
  `invalid saved data!` when neither parses. It then checks `code === gamebase.gameCode` and
  `version >= gamebase.allowVersion`; on mismatch it logs an error and returns `false`. On success it assigns
  `era.data = tmp` and runs `fillData()` to add new tables/variables from the current static data.
* `saveData` writes `data.version = gamebase.version` and `data.code = gamebase.gameCode`, creates `sav/` if
  needed, writes the file, sets `global.saves[sav] = comment`, then `saveGlobal()`.
* `loadGlobal` on a code mismatch **throws**; on a missing/too-old file it calls `resetGlobal()`. It ends with
  `listSaveFiles()` + `saveGlobal()`. `listSaveFiles()` (INTERNAL, `src/era/model/era-api-base.js#L279-L298`)
  scans `sav/save0..save<system.saveFiles>` and rewrites comments to `UNNAMED SAVE FILE` or prefixes
  `(FILE LOST) `.
* `rmData` deletes `sav/saveN.sav`, `delete global.saves[N]`, then `saveGlobal()`. **It does not log errors
  visibly** — it returns `false` on exception.
* `Era.restart()` calls `resetData()` + `loadGlobal()` on every start, so a game's `main.js` always begins with
  a clean save and loaded globals.
* `system.saveFiles` (10-99, default 10) only affects the automatic scan; any natural number can be used with
  the APIs.

Canonical save/load UI loops: `example/ere/page/page-save-game.js` and
`example/ere/page/page-load-game.js`:

```js
} else if (await era.loadData(ret)) {
  // 这里可以插入对旧版本存档的修复
  init_queue();
  return true;
}
```

```js
} else {
  const comment = era.get(`global:saves:${ret}`);
  if (comment !== undefined && !comment.startsWith('(FILE LOST) ')) {
    era.print('该栏位已存在存档！是否覆盖？');
    era.printButton('是', 1);
    era.printButton('否', 2);
    if ((await era.input()) === 2) { continue; }
  }
  await era.saveData(ret, '存档 ' + ret);
}
```

---

## 7. Randomness / math / utility helpers

* **No engine RNG API exists.** Games use JavaScript `Math.random()` directly. The official example provides
  `example/ere/utils/value-utils.js`:

  ```js
  get_random_value(min, max, is_float) {
    if (min >= max) { return min; }
    const dice = Math.random();
    if (is_float) { return min + (max - min) * dice; }
    return Math.floor(min + (max - min + 1) * dice);
  }
  ```

  and `example/ere/utils/color-utils.js` `get_gradient_color(start,
  end, ratio)` which returns an `rgb(...)` string.
* `era.delay(ms)` (**GAME-FACING**, implemented in the SDK itself) is the timing helper every realtime effect
  is built on: `() => new Promise((resolve) => setTimeout(() => resolve(), delay))`. Two usages:
  `await era.delay(ms)` to wait in sequence, or **`era.delay(ms).then(...)` as a concurrent timer** (the
  "frame clock" of a realtime loop). See the realtime-loop recipe in
  [`systems.md`](../skills/ere-game-development/references/systems.md) and wiki-digest §10.
* Other timer primitives are plain JS and usable from game code (`setTimeout`, `setInterval`, `Promise`). A
  *blocking* loop stalls the whole game (everything runs on the single main process) — but a loop that
  `await`s `era.delay()` between frames is exactly how realtime games are written. `era.input(...)` called
  **without** `await` is the input-listener half of that pattern.
* Engine-internal numeric helpers (INTERNAL, not available to games, but informative for parsing behaviour):
  `getNumber` (string → number when possible), `getValidValue(val, lowest, highest, defVal)`,
  `safeUndefinedCheck`, `safelyGetObjectEntry`, `toLowerCase`, `getGameVersion(version)` = `version/1000`
  formatted (``src/renderer/utils/value-utils.js`).
* `get` / `set` / `add` are cheap synchronous in-memory operations — a loop of a million calls is not a
  performance concern.

---

## 8. Developer tools inside the engine

All three are triggered from the Electron menu (帮助 / Help) and are defined under
`src/era/tools`; they run in the main process with `this` bound to the `Era`
instance.

### 8.1 `generate-data-beans.js` — "生成开发套件"

Input: live `fieldNames`, `extendedTables`, `config.system.saveFiles`.
Output: `<game>/ere/era-utils/` with a generated region delimited by `// GENERATED START` / `// GENERATED END`
(existing files are patched in place, `src/era/tools/generate-data-beans.js#L13-L29`):

```
ere/era-utils/
├── era-flag.js  era-tflag.js  era-item.js  era-info.js  era-chara.js
├── chara/era-base.js era-maxbase.js era-deltabase.js era-abl.js era-talent.js era-cflag.js
│        era-cstr.js era-equip.js era-mark.js era-exp.js era-palm.js… (param/delta/jewel/gotjewel)
│        era-source.js era-stain.js era-ex.js era-nowex.js era-tequip.js era-tcvar.js … extended chara tables
└── names/era-<table>-names.js
```

Content patterns (exact):

* 1D tables → `era-<table>.js` with `get(name)`, `set(name,val)`, `add(name,val)` and `get/set <k>` accessors
  that touch `era['raw']().data['<table>'][id]` (flag tables) — `global` uses `era['raw']().global`.
* 2D tables → `chara/era-<table>.js` exporting a class `Era<Table>` with per-variable `get/set <k>` using
  `era['raw']().data['<table>'][this.id][<num>]`; `base` additionally clamps through a local `setBase`.
* `era-chara.js` exports `class EraChara` with `static get(id)` (a cache), `static get all`, `static get added`,
  `get/set name`, `get/set callname`, `get/set love`, read-only `get title`, `callname_to`,
  `set_callname_to`, `get_all_callnames`, `relation_to`, `set_relation_to`, `get_all_relations`, and one
  property per generated 2D table (`this.abl = new EraAbl(chara_id)`, …).
* `era-item.js` exports `era_item` with per-item `{count, price, sales}` accessors, `bought`, read-only
  `bought_name`, `sales`/`hold` (arrays of code names), `clear_sales()`.
* `era-info.js` exports `era_info` with `gamebase`, `version`, and `saves[0..system.saveFiles]`.
* `names/era-<table>-names.js` exports `{ era<Table>Enum, era<Table>Names }` mapping code name ↔ display name.

Variable code names (`k`) come from the static data: `Base.csv` has no code-name column, so they default to
`base0`, `base1`, `abl0`, …; JSON/YAML tables can supply `name`/`type` per variable
(see `era-electron.wiki/dev-guides/18-tools.md#数据格式要求`).

### 8.2 `generate-static-data.js` — Android `static.json` (menu item "安卓")

Writes `<game>/build/static.json` from the **currently loaded** engine state
(`src/era/tools/generate-static-data.js#L19-L50`):

```js
const tables = {
  config: sortTable(this.defaultConfig),
  extend: sortTable(this.extendedTables),
  fixed: sortTable(this.fixedConfig),
  names: sortTable(this.fieldNames),
  static: sortTable(this.staticData),
};
tables.res = {};
for (const k in this.res) {
  tables.res[k] = {};
  Object.assign(tables.res[k], this.res[k]);
  if (!tables.res[k].path.startsWith('http')) {
    if (tables.res[k].type === resTypeEnum.image) {
      // image entries keep x/y/width/height/posX/posY; only the path is made game-relative
      tables.res[k].path = tables.res[k].path.substring(this.oldPath.length + 8).replace(/\\/g, '/');
    } else if (tables.res[k].type === resTypeEnum.audio) {
      // audio entries are reduced to { path, type }
      tables.res[k] = { path: tables.res[k].path.substring(this.oldPath.length + 8).replace(/\\/g, '/'), type: resTypeEnum.audio };
    }
  }
}
writeFileSync(filePath, JSON.stringify(tables, undefined, 2));
```

`EreWebpackPlugin` then copies it to `dist/static.json` so the bundle loads without re-parsing csv.

### 8.3 `generate-static-directory.js` — "生成静态文件" (format conversion)

Writes a whole static-data folder in `csv`, `json` or `yml` under `<game>/<format>/`, from the loaded data
(`src/era/tools/generate-static-directory.js`):

* `_config.json` (with `system.static` removed), `_fixed.json`;
* `gamebase.<fmt>`, `_replace.<fmt>` (when present);
* one file per table (`item` keeps its price column; `juel` is written as `param`);
* `chara/chara<id>.<fmt>` with `callname_to` / `relation` rows when presets exist;
* `translate = true` writes display names (and `jewel` as the table keyword), `false` writes code names —
  the menu exposes both "可读" (readable, translated) and "兼容" (compatible) variants and disables the
  currently-active format.

### 8.4 `build/static.json` format

Top-level object with exactly six keys, produced by 8.2 and consumed by bundle mode:

| Key | Type | Meaning |
|---|---|---|
| `config` | `EraConfig` | the **default** config (`_config.json`/engine defaults) |
| `fixed` | `EraConfig` | `_fixed.json` forced settings |
| `extend` | `Record<string, 1\|2>` | `extendedTables` (`1` = normal (1D), `2` = chara (2D)) |
| `names` | `Record<table, Record<num, {n,k,t}>>` | `fieldNames`: `n` display name, `k` code name, `t` type |
| `static` | `EraStatic` | all static data incl. `gamebase`, `chara`, `relationship`, per-table name→num maps |
| `res` | `Record<name, EraResource>` | resource registry with game-relative paths |

Real excerpt from `example/build/static.json`:

```json
{
  "config": {
    "system": {
      "_replace": false, "collapseBlankLines": false, "disableClear": false,
      "extendedCharaTables": [], "hideUserInput": false, "resource": false,
      "saveCompressedData": false, "saveFiles": 10
    },
    "window": { "audio": 100, "autoMax": false, "fontSize": 16, "height": 880, "width": 1000 }
  },
  "extend": {},
  "fixed": {},
  "names": {
    "abl":   { "0": { "n": "c感觉", "k": "abl0", "t": "number" }, "1": { "n": "v感觉", "k": "abl1", "t": "number" } },
    "base":  { "0": { "n": "体力", "k": "base0", "t": "number" }, "1": { "n": "气力", "k": "base1", "t": "number" } },
    "juel":  { "0": { "n": "快c", "k": "param0", "t": "number" }, ... },
    "item":  { "0": { "n": "体力药", "k": "item0", "t": "number" }, ... },
    "flag":  { "0": { "n": "日元", "k": "flag0", "t": "number" }, "10": { "n": "当前角色", "k": "flag10", "t": "number" } }
  },
  "static": {
    "relationship": { "callname": {}, "relation": {} },
    "abl": { "c感觉": 0, "v感觉": 1, "欲望": 2 },
    "base": { "体力": 0, "气力": 1 },
    "flag": { "日元": 0, "当前角色": 10, "事件队列": 11 },
    "item": { "name": { "体力药": 0, "媚药": 10, "润滑液": 11 }, "price": { "0": 100, "10": 2000, "11": 4000 } },
    "juel": { "快c": 0, "快v": 1, "润滑": 2, "欲望": 3, "痛苦": 4, "否定": 5 },
    "gamebase": {
      "author": "你", "info": "第一款Era游戏", "year": "202X", "title": "Example",
      "gameCode": 114514, "version": 1, "allowVersion": 1, "defaultChara": 0,
      "site": "https://...", "versionCheck": "https://...", "baseZip": "https://.../base.zip"
    },
    "chara": {
      "1": { "id": 1, "name": "赤红", "callname": "小红",
             "base": { "0": 2000, "1": 1000 }, "talent": { "0": 1, "1": 1 }, "cstr": { "0": "#ff7373" } }
    }
  },
  "res": {}
}
```

Notes: `names.<table>` keys are **numeric strings** (variable numbers) and `static.<table>` keys are names;
`static.chara` is keyed by character id with numeric table indexes; `static.relationship.callname` /
`.relation` use `"<from>|<to>"` keys.

### 8.5 Resource registration (`res/**/*.csv`)

Parsed by `src/era/model/era-start.js#L678-L751` into
`new EraResource(path, x, y, width, height, posX, posY)` (`src/era/model/era-resource.js`):

```csv
; 注册名,文件名,x,y,width,height,posX,posY
立ち絵_服_通常_1001,1001.png,0,0,180,180,0,0
; 全图/省略形式（宽高自动用 image-size 读取）
背景,back.png
; 音频（按扩展名判定：gif/jpeg/jpg/png/svg/webp = 图片；flac/mp3/wav/wma = 音频）
test,test.mp3
```

Resource names are matched case-insensitively via `toLowerCase`; `checkImage` reports only images.
`era-start` requires `config.system.resource === true` before reading `res/`.

### 8.6 Version / update plumbing

* `gamebase.versionCheck` URL is fetched on start; the response's first line is the newest version number and the
  second line the minimum version that may use the incremental `baseZip`
  (`src/background.js#L518-L543`).
* `example/ci/pages.js` generates that file as `` `${game_version}\n${min_version}` ``; `.ere-min-version`
  holds the minimum supported version.
* `gamebase.baseZip` may contain `${VERSION}`; the renderer rewrites it into an `era://` link which the main
  process downloads, unzips and overlays onto the game folder.

---

## 9. Module format and syntax constraints

### 9.1 Module system

* Game code is **CommonJS**: `require(...)` and `module.exports`. Every example and test file uses
  `const era = require('#/era-electron')` and `module.exports = ...`.
* **ESM `import` is not usable in source mode.** `ere/*.js` is executed through the engine's own
  `Module.prototype.require` override inside a Node `vm` context; there is no loader for ESM. ESM may happen to
  work only inside a webpack bundle (webpack 5 understands it), but the official examples, the `kojo-loader`
  output and the generated beans are all CommonJS — write CommonJS.
* Path resolution inside game code (`src/era/model/era-start.js#L773-L808`):
  * `'#/x'` → `<game>/ere/x` (the engine rewrites `#` to the ere folder);
  * `'.'`-prefixed → delegated to Node's normal require (relative to the requiring file);
  * anything else (bare specifier) is **blocked** unless it is in `safeLibs`, i.e. only `crypto`
    (`src/era/const.js#L51`). Blocked requires log
    `游戏在试图加载内置库: <name>! …` and return `{}`.
  * Requires are cached in Node's module cache; circular requires produce a warning
    (`circular! requiring <path>`).
* In bundle mode the webpack config supplies `resolve.alias['#'] = <game>/ere` and the same rule applies at
  build time (`'#'` prefix), while bare Node built-ins are simply not polyfilled.
* `require('#/xxx.kojo')` is a special case handled by the engine (source mode) or `kojo-loader` (bundle).

### 9.2 Runtime environment

* Game code runs in the **Electron main process** — no DOM, no `window`, no Vue, no Element Plus.
* `console.log/debug/warn/error` are **replaced** by the engine and routed into the engine log (and the
  renderer console) with file/line mapping
  (`src/era/model/era-class.js#L97-L131`); the originals are kept as
  `console.lInfo`, `console.lDebug`, `console.lWarn`, `console.lErr`. `console.debug` only prints in debug mode
  (`era.toggleDebug()` / dev builds).
* `Module.constructor._load` is guarded: direct access logs `请不要直接访问 module.constructor._load！`.
* Everything is single-threaded: a blocking loop freezes the UI; use `await era.delay(ms)` or `await
  era.input()` to yield.
* Global state created inside the game (module-level `let`) survives re-entry from `homepage` but is wiped when
  the SDK/game modules are purged on reload. Anything that must follow a save belongs in `era.set` (the example
  stores the event queue in `flag:事件队列`).

### 9.3 Syntax / tooling

* Engine `.browserslistrc`: `> 1%`, `last 2 versions`, `not dead`, `not ie 11`.
* Game bundle Babel config (`example/webpack.config.js#L18-L32`):
  `@babel/preset-env` with `{ modules: false, targets: { chrome: '60' }, useBuiltIns: false }`.
  Write modern-but-transpilable JS; the example game uses classes, class fields, `??=`, `||=`, optional
  chaining, private static fields (generated beans) — the engine's own code uses the same.
* Engine `.eslintrc.js`: `env.node`, `plugin:vue/vue3-essential` (engine only), `eslint:recommended`,
  `prettier` with `{ semi: true, singleQuote: true, trailingComma: 'all', endOfLine: 'auto' }`,
  `require-sort` (sorted requires inside a block) and `sort-requires-by-path`.
* Example game `eslint.config.js`: flat config, `ecmaVersion: 'latest'`, `max-lines` warn at 1000,
  same prettier rules.
* Observed code style: 2-space indentation, single quotes, semicolons, trailing commas, `const`/`let`,
  JSDoc `@param`/`@returns` comments (including Chinese prose), snake_case helper function names and
  `module.exports = <function>` per page.

### 9.4 Naming / encoding constraints

* Static file encoding: UTF-8; a leading BOM is stripped (`fuckOffUtf8Bom`). `.kojo` must be UTF-8/BOM with
  spaces (never tabs) for indentation.
* Variable/table names are **lower-cased** at load and at lookup; never rely on case. Display names need
  `.toUpperCase()` or the generated `names` beans.
* Numbers/strings in CSV: every cell is passed through `getNumber` and skipped when empty; `;` starts a comment
  to end of line; extra columns are kept only for `chara`, `item` and `res`
  (`src/era/static-file-utils.js`).
* `GameBase` is mandatory; `gameCode`, `version` and `allowVersion` are used by save compatibility checks.
* Character preset files must match `chara*.(yml|json|csv)` (`staticFormatRegex`) and may live in subfolders;
  variable tables must be directly in the static folder (not subfolders).
* `ere/main.js` path and name are hard requirements in source mode.

---

## 10. Pitfalls checklist for an agent writing a new game

1. Copy `sdk/era-electron.js` to `<game>/ere/era-electron.js`; never edit
   `isEra`/`version.sdk`.
2. `ere/main.js` must `module.exports = async () => {…}` and must require the SDK during load.
3. Every screen is a loop of `await era.clear()` → print → `await era.input()`.
4. Remember `await` on `clear`, `input`, `printAndWait`, `waitAnyKey`, `loadData`, `saveData`, `saveGlobal`,
   `loadGlobal`, `resetGlobal`, `rmData`.
5. Call `era.beginTrain(...)` before touching `palam/param/delta/gotjuel/source/stain/ex/nowex/tequip/tcvar/
   tflag/deltabase`, and `era.endTrain()` when finished.
6. `item` is a flat table: `item:<name>`, `itemprice:<name>`, `itemsales:<name>`, `item:bought` only.
7. Use `era.get('gamebase')` for title/version; `gamebase.versionName` is derived as `version/1000` when absent.
8. Keep UI widths within 24 columns; reset `setOffset/setWidth/setAlign` after temporary changes.
9. Store anything that must survive a save in `era.set`; `sav/` writes are asynchronous.
10. Never `import`; use `require`. Never require a bare package other than `crypto`.
11. Don't call `era.get` with a typo in the table name (it throws an engine error); typos in variable names are
    silent `undefined`/`NaN` traps.
12. Use `buttonType`, not `type`, for `printButton`; the `print` config key `p` is ignored.
13. `era.add('item:${id}:x', …)` is a no-op — `item` is one-dimensional (see §4.4).
14. `era.quit()` only works by throwing; do not wrap the entry loop in a bare `try/catch` that swallows
    `Error('quit')` unless you rethrow.

---

## 11. Source map used for this digest

| Topic | Primary sources |
|---|---|
| SDK stubs / typedefs / wrapper | `sdk/era-electron.js` |
| Loading, require override, kojo compile, resources | `src/era/model/era-start.js` |
| API behaviour (print/input/save/train) | `src/era/model/era-api.js`, `src/era/model/era-api-base.js` |
| get/set/add key grammar | `src/era/model/apis/era-set.js` |
| Era class, restart, console override | `src/era/model/era-class.js` |
| Typedefs of data/config | `src/era/model/definitions.js` |
| Constants (formats, res types, safeLibs) | `src/era/const.js` |
| CSV/JSON/YAML parsing | `src/era/static-file-utils.js` |
| Resource model | `src/era/model/era-resource.js` |
| Static name/alias mapping | `src/era/name-mapping.json` |
| Menu, IPC, protocols, updates | `src/background.js`, `src/preload.js` |
| Renderer line model + Element Plus | `src/renderer/app.vue`, `src/renderer/components/print-block.vue`, `src/renderer/components/text-block.vue`, `src/renderer/components/button-block.vue`, `src/renderer/utils/embedded.js` |
| Dev tools | `src/era/tools/generate-data-beans.js`, `src/era/tools/generate-static-data.js`, `src/era/tools/generate-static-directory.js`, `webpack-plugin/src/index.js` |
| Example game (口上/ero/queue/pages) | `example/ere` |
| Cross-checks and prose explanations | `era-electron.wiki/dev-guides` (`A-api-docs`, `03-config`, `09-static`, `11-saves`, `18-tools`, `C-kojo`, `08-ui`, `16-resources`) |
