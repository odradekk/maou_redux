/**
 * @file 测试夹具：让游戏代码在不启动 Electron GUI 的情况下可测。
 *
 * 全项目只开一处缝（issue #16）：require('#/era-electron') 返回的真实 SDK 对象。
 * 夹具加载真实 SDK 文件，把引擎注入的那层换成可观测的记录实现，
 * 游戏代码本身零修改、不留任何测试钩子。
 *
 * 三条已实测的约束（直接采纳）：
 *   1. 纯 Node 不认 '#/' 前缀（package.json imports 会抛
 *      ERR_INVALID_MODULE_SPECIFIER），须像引擎一样替换 Module.prototype.require；
 *   2. SDK 尾部守卫在 version.engine === undefined 时拒绝执行（era-electron.js:616），
 *      须先把它置为非 undefined；
 *   3. SDK 是普通可变对象、无 Object.freeze，可在 require 之后就地替换函数。
 *
 * 已知限制：未拦截 require.resolve('#/x')（游戏代码目前未用）。
 */

const Module = require('node:module');
const path = require('node:path');

// '#/xxx' 一律映射到 <仓库>/ere/xxx，与引擎行为及 ere/jsconfig.json 的别名一致
const ERE_DIR = path.resolve(__dirname, '..', '..', 'ere');

// 安装 '#/' 前缀解析：进程级、幂等。手法与引擎一致（替换 Module.prototype.require）
function install_hash_resolver() {
  if (Module.prototype.require._hash_resolver) {
    return;
  }
  const original_require = Module.prototype.require;
  const patched_require = function (request, ...rest) {
    if (typeof request === 'string' && request.startsWith('#/')) {
      return original_require.call(
        this,
        path.join(ERE_DIR, request.slice(2)),
        ...rest,
      );
    }
    return original_require.call(this, request, ...rest);
  };
  patched_require._hash_resolver = true;
  Module.prototype.require = patched_require;
}

// 清掉 ere/ 下所有模块缓存，保证每个用例拿到全新的 SDK 与游戏模块
function purge_ere_cache() {
  const prefix = ERE_DIR + path.sep;
  Object.keys(require.cache)
    .filter((key) => key.startsWith(prefix))
    .forEach((key) => delete require.cache[key]);
}

// 把 TextContent（字符串或片段数组，见 SDK 的 @typedef）压平成纯文本，供断言
function normalize_content(content) {
  if (typeof content === 'string') {
    return content;
  }
  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === 'string') {
          return item;
        }
        // isBr 片段的引擎语义是换行，压成 '\n' 保留信息；isBlank 等其余片段无文本
        if (item?.isBr !== undefined) {
          return '\n';
        }
        return String(item?.content ?? '');
      })
      .join('');
  }
  return String(content ?? '');
}

// 创建一套干净的夹具：真实 SDK + 记录层。每个测试用例各建一个，互不污染。
// Math.random 的替换是进程级的（见 override_math_random），原值在此捕获
const real_math_random = Math.random;

function create_era_fixture() {
  install_hash_resolver();
  purge_ere_cache();

  // 故意经 '#/' 加载真实 SDK 文件（与游戏代码同一路径）
  const era = require('#/era-electron');

  // 绕过 SDK 尾部的「未注入」守卫
  era.version.engine = era.version.sdk;

  // —— 记录层状态（每个夹具独立） ——
  const lines = []; // 输出行记录：print 系列（逐格；一次多列调用的格子共享 row）
  // 全量行史（被动记录，只增不删）：clear/replace 从 lines 删掉的条目仍留
  // 在这里——#73 起主菜单就地重绘，终态只留最后一轮，「哪轮画过什么」的
  // 取证看这份（与 var_reads 同类的观测记录，不影响 lines 的比对语义）
  const lines_history = [];
  const calls = []; // 无专门实现的 API 的兜底调用记录
  const var_reads = []; // 变量读记录
  const var_writes = []; // 变量写记录
  const logs = []; // logger 记录
  const inputs_consumed = []; // 已消费的输入
  const input_queue = []; // 预置输入队列，等待输入的 API 依次消费
  // 本轮合法输入集（#130）：= 引擎渲染层 inputParam.rule 的数组形态——
  // 已打印按钮的快捷键去重累积。任何一次成功回传（input / waitAnyKey 的
  // any 键 / printAndWait 的内部等待）都把它清空；clear 不碰它（app.vue
  // 的 clear 处理只删行，returnFromButton 才重置 rule）。era.input 消费
  // 预置值时按它校验，见「输入」段
  const input_rules = [];
  const store = new Map(); // 变量存储

  // —— Row 记账（#68）：一次输出调用 = 一个 Row，与引擎标准一致 ——
  //
  // 引擎侧证据（app.asar 两处实测，非手册推断）：
  //   主进程 EraApi（模块 183）：print / printAndWait(经 print) / println /
  //     printButton / printMultiColumns / printInColRows / printProgress /
  //     drawLine / printImage / printWholeImage / printLineChart / setToBottom
  //     每次调用结尾恰好调一次 addTotalLines()（++totalLines）；空内容
  //     print 落到 println 分支，同样 +1。print('\n' 多行) 与片段数组的
  //     {isBr} 是显示级换行，编程上仍是一个 Row。
  //   渲染层 app.vue：printMultiCols / printInColRows 各自把整次调用装进
  //     **一个**行对象（multiCol / inColRows 类型）——printInColRows 的多个
  //     ColumnObject 不拆成多个 Row，与 printMultiColumns 同一标准。
  //   不增行：replaceText / replaceInColRows 返回 totalLines 原值（渲染层
  //     handleChange 把最后一个行对象整个换掉）；notify 无行。
  //   input 回显（已镜像，见「输入」段）：普通 input() 计 +1 Row；三段
  //     短路（system.hideUserInput / hideInput / any）任一命中则不增，
  //     只调计数器不推条目。waitAnyKey 不占行的机制同源：引擎内部走
  //     input({any:true})，e.any 命中回显短路。
  // 以下已查实但本夹具暂不实现（游戏代码未用，随用随补）：printLineChart /
  //   setToBottom（各 +1 Row）、notify（无行）。printWholeImage 自 #69 起随
  //   媒体资源落地（+1 Row，见「媒体资源」段）。
  let total_rows = 0; // 引擎 totalLines 的等价物：计数器，非从 lines 派生

  // —— allowWait 镜像（app.asar 逐字，#73 发回整改）——
  // 引擎（EraApi 主进程侧）：
  //   addTotalLines(){return this.allowWait=!0,++this.totalLines}
  //     —— 任何输出（addTotalLines 收尾的 print 系）都置位
  //   async waitAnyKey(e){(this.allowWait||e)&&(this.allowWait=!1,
  //     await this.input({any:!0,fromClear:e,useRule:!1}))}
  //     —— 有输出（或强制 e）才等键，等待即消费清零
  //   async clear(e){…disableClear 短路…:(0!==e&&this.isContinue&&
  //     await this.waitAnyKey(!0), await this.clearScreen(e))}
  //     —— isContinue（右键快进）时，非 0 的 clear 在清屏前强制等键
  //   clearScreen 监听器末尾 setTotalLines(r)：totalLines!==r 时**再置位**
  //   input 的回显 this.print(i) 同样经 addTotalLines 置位
  // 已查实、有意不镜像的分歧（#91 起逐条冻结在 tools/engine-contract-ledger.mjs，
  // 检查器两项检查守「只能变短、不许过期失效」；disableClear 短路 #91 起已镜像，
  // 见 clear 处）：setBack/setOverlay 的独立
  //   置位（游戏代码未用这两个 API）；fromClear/useRule（渲染层簿记参数）；
  //   printAndWait 的内部等待（引擎 =
  //   print + waitAnyKey 两步组合）不进 inputs_consumed——注入点对「等待」的
  //   观测统一走显式 waitAnyKey 的记录，该契约由 fixture 用例钉住。
  let allow_wait = false;
  // 引擎 isContinue 由渲染层 input 回包的 continue 字段维护（右键快进态）；
  // 夹具的 take_input 只回纯值，以本旋钮代位（默认 false = 非快进）
  let is_continue = false;
  // 全部 waitAnyKey 调用的观测记录（含未等待的）：{waited, rows_at_wait,
  // forced}。rows_at_wait = 调用瞬间的行数——「等待发生时屏幕上最新的是
  // 哪一行」的直接证据（#73：分发期输出必须在重绘前被玩家看到）
  const waits = [];

  // 一次输出调用的全部条目共用当前 Row 号，调用尾计数 +1。
  // 返回值 = 引擎 addTotalLines() 的结果：输出后的行数。
  // addTotalLines 的副作用 allowWait=!0 一并镜像（任何输出都置位——引擎
  // waitAnyKey 据此判定「有输出才等键」，见 allowWait 镜像注释）
  const push_row = (entries) => {
    const row = total_rows;
    entries.forEach((entry) => {
      entry.row = row;
      lines.push(entry);
      lines_history.push(entry);
    });
    total_rows += 1;
    allow_wait = true;
    return total_rows;
  };

  // 替换系（replaceText / replaceInColRows）：换掉最后一个 Row 的全部条目，
  // 计数不动（引擎返回 totalLines 原值）。最后一行是多列 Row 时整行消失。
  // total_rows === 0 时引擎主/渲染两层分歧（渲染层会凭空插入一行、计数仍
  // 0），此处按主进程标准：条目记到 row 0、计数不动
  const replace_row = (entries) => {
    const row = total_rows - 1;
    if (row >= 0) {
      for (let i = lines.length - 1; i >= 0; i -= 1) {
        if (lines[i].row === row) {
          lines.splice(i, 1);
        }
      }
    }
    entries.forEach((entry) => {
      entry.row = Math.max(0, row);
      lines.push(entry);
      lines_history.push(entry);
    });
    return total_rows;
  };

  const make_text_entry = (content) => ({
    type: 'text',
    text: normalize_content(content),
    content,
  });

  // printButton 与多列按钮对象共用：按钮条目的引擎渲染公式（app.asar）
  const make_button_entry = (content, accelerator, config) => {
    // 入合法输入集（引擎 app.vue 的按钮行构造 P 逐字）：disabled 按钮
    // 整体短路不入集；快捷键去重（重复时引擎只 console.log 一条
    // 「duplicate accelerator」告警，此处不记录——不影响校验语义）
    if (!config?.disabled && !input_rules.includes(accelerator)) {
      input_rules.push(accelerator);
    }
    const text = normalize_content(content);
    return {
      type: 'button',
      text,
      accelerator,
      // 引擎实际显示的文本。showAcc 默认为 true（判定是 !== false），引擎会
      // 自动拼上 `[快捷键] `，并把文本里的连续空白折叠成一个空格；showAcc 为
      // false 时显示 `[按钮文本]`。公式抄自引擎 app.asar 的按钮渲染层。
      // 断言按钮外观必须看这个字段：只看 text 会漏掉手写前缀与引擎前缀撞车
      // （实机曾渲染出「[0] [0] 旧的奴隶」）。
      rendered: (config?.showAcc !== false
        ? `[${accelerator}] ${text}`
        : `[${text}]`
      ).replace(/\s+/g, ' '),
      // config.color 直通 el-button 的 --el-button-text-color（app.asar 实证，
      // 按钮明暗一类断言看这里；未给 color 时为 undefined）
      color: config?.color,
    };
  };

  // printProgress 与多列进度条对象共用：inContent/outContent 都留字段。
  // barWidth 镜像（#74 发回整改，app.vue 渲染层原始源码副本逐字）：
  //   <el-col :span="line.barWidth"><el-progress>条内文字</el-progress></el-col>
  //   <el-col v-if="line.outContent" :span="24 - line.barWidth">条后文字</el-col>
  //   barWidth: data.config.barWidth ?? 24        ← 引擎缺省 24
  // barWidth=24 时第二列 span=0（el-col-0 = display:none）——**条后数值整列
  // 不渲染，而 24 正是缺省值**：不传 config 就吞掉数值（AGENTS.md「输出类
  // API 会二次加工参数」的又一例）。故夹具把默认物化进记录（bar_width 恒为
  // 数字、不留 undefined——留 undefined 等于没镜像），并派生 out_visible＝
  // 「条后文字真的会渲染出来」的可断言形态：span>0（barWidth<24）且引擎的
  // v-if="line.outContent" 命中（out 非空）。
  const make_progress_entry = (percentage, in_content, out_content, config) => {
    const out = normalize_content(out_content ?? '');
    const bar_width = config?.barWidth ?? 24;
    return {
      type: 'progress',
      percentage,
      text: normalize_content(in_content ?? ''),
      out,
      bar_width,
      out_visible: bar_width < 24 && out !== '',
    };
  };

  // —— 输出 ——
  era.print = (content) => push_row([make_text_entry(content)]);
  // 引擎 printAndWait = print + await waitAnyKey()（app.asar 逐字），print
  // 刚置位 allowWait → 必等键 → 任何一次回传都清空合法输入集（#130）
  era.printAndWait = async (content) => {
    const returned = push_row([make_text_entry(content)]);
    input_rules.length = 0;
    return returned;
  };
  era.println = () => push_row([{ type: 'br', text: '' }]);
  era.drawLine = (config) =>
    push_row([
      {
        type: 'divider',
        text: normalize_content(config?.content ?? ''),
        // 引擎渲染层（app.asar）：content 是分隔线中央的标签文字而非线型字符，
        // isSolid 决定 el-divider 的 border-style（solid/dashed）。原作
        // DRAWLINEFORM 的双线 ═ / 单线 ─ 以 solid/dashed 近似，断言线型看这里。
        border: config?.isSolid ? 'solid' : 'dashed',
      },
    ]);
  era.printButton = (content, accelerator, config) =>
    push_row([make_button_entry(content, accelerator, config)]);
  era.replaceText = (content) => replace_row([make_text_entry(content)]);
  // —— 多列输出族（#48 比对录制 + #68 Row 归并）：printMultiColumns /
  //    printInColRows 的 GridObject 逐格压平成既有条目类型（button/text/
  //    divider/image/progress），printImage 压 image 条目——比对关心的是
  //    「输出了什么」，这里不做列布局；同时整次调用共用一个 Row 号（引擎
  //    渲染层把整次调用装进一个行对象，见 Row 记账注释），getLineCount /
  //    clear / replace 系按 Row 计——画面组件要知道自己占几行，看的是这层。
  //    替换系（replaceInColRows）与顶层 printProgress 虽暂无游戏代码调用，
  //    仍先落地：它们是 Row 语义（整行替换 / +1 Row）的直接断言靶点，
  //    #68 命中「替换系、进度条」查明即录。
  const make_grid_entry = (obj) => {
    if (obj?.type === 'button') {
      return make_button_entry(obj.content, obj.accelerator, obj.config);
    }
    if (obj?.type === 'text') {
      return make_text_entry(obj.content);
    }
    if (obj?.type === 'divider') {
      return {
        type: 'divider',
        text: normalize_content(obj.config?.content ?? ''),
        border: obj.config?.isSolid ? 'solid' : 'dashed',
      };
    }
    if (obj?.type === 'image' || obj?.type === 'image.whole') {
      return { type: 'image', names: obj.names };
    }
    if (obj?.type === 'progress') {
      return make_progress_entry(
        obj.percentage,
        obj.inContent,
        obj.outContent,
        obj.config,
      );
    }
    return { type: 'text', text: normalize_content(obj?.content) };
  };
  // printInColRows / replaceInColRows 的实参：ColumnObject({columns}) 或裸
  // GridObject[]，与 SDK 的 @param {...ColumnObject|GridObject[]} 一致
  const collect_col_rows_cells = (columnObjects) => {
    const cells = [];
    columnObjects.forEach((arg) => {
      if (Array.isArray(arg)) {
        arg.forEach((obj) => cells.push(make_grid_entry(obj)));
      } else {
        (arg?.columns ?? []).forEach((obj) => cells.push(make_grid_entry(obj)));
      }
    });
    return cells;
  };
  era.printMultiColumns = (columnObjects) =>
    push_row((columnObjects ?? []).map(make_grid_entry));
  era.printInColRows = (...columnObjects) =>
    push_row(collect_col_rows_cells(columnObjects));
  era.replaceInColRows = (...columnObjects) =>
    replace_row(collect_col_rows_cells(columnObjects));
  // SDK 签名 printProgress(percentage, inContent, outContent, config?)——
  // 第四参数是 ProgressConfig（barWidth 等），#74 发回：此前夹具丢掉整个
  // config，barWidth 从不进记录
  era.printProgress = (percentage, in_content, out_content, config) =>
    push_row([
      make_progress_entry(percentage, in_content, out_content, config),
    ]);

  // —— 媒体资源（issue #69）：注册表 + 引擎查名/解析/计行语义的镜像 ——
  //
  // 以下语义全部抄自 app.asar（EraApi 模块 183 与 eraStart 资源装载段）：
  //   - 注册名装载时统一小写落表（eraStart：`const s = toLowerCase(t[0])`），
  //     查名同样先小写——HEART 注册进引擎就是 'heart'，checkImage('HEART')
  //     能否命中取决于小写后的键；
  //   - playMusic(names, config)：config 非对象一律重置为 {loop: false}——
  //     引擎的「缺省不循环」，与 Emuera PLAYBGM 默认循环相反，想循环必须
  //     显式 {loop: true}；names 收 String 或 String[]，逐个小写后取第一个
  //     注册为音频的条目播放，命中返回 true，全落空返回 false（不报错）；
  //   - 计行（#68 的 Row 的计法，app.asar 逐字实测）：playMusic / stopMusic /
  //     resumeMusic 只 connect、不调 addTotalLines——**不占 Row**，只进
  //     music[] 事件记录；printImage / printWholeImage 结尾各调一次
  //     addTotalLines——各 +1 Row，走 push_row；
  //   - checkImage(...names)：零参返回 false；单参返回布尔、多参返回布尔
  //     数组；判定是「已注册 **且类型为 image**」——dev-guides/16 宣称它可
  //     查音乐存在性，与引擎代码冲突（代码只放行 image 类型），以代码为
  //     准；要探音频是否已注册，用 playMusic 的返回值；
  //   - printImage/printWholeImage 的 names 每层（数组元素或整串）按 '\t'
  //     切开取第一个已注册的 image 条目（引擎 getImageObject/getWholeImage
  //     的容错链），整层全落空则该层被引擎丢弃、不输出——resolved 字段
  //     （仅非空时挂上）记录每层实际解析出的注册名（小写）。空 resolved
  //     不挂是刻意的：#68 的逐条 deepEqual 用例钉了 image 条目的裸形状；
  //     make_grid_entry 的多列 image 格同样暂不带 resolved（游戏代码未用，
  //     随用随补）。
  const res_registry = new Map(); // 小写注册名 → 'image' | 'audio'
  const music = []; // 音乐事件记录：{api:'play'|'stop'|'resume', ...}

  /** 引擎 getImageObject/getWholeImage 的逐层解析：返回命中的小写注册名或 null */
  function resolve_image_layer(layer) {
    const spec = typeof layer === 'string' ? { names: layer } : (layer ?? {});
    const candidates = String(spec.names ?? '').split('\t');
    for (const name of candidates) {
      const key = name.toLowerCase();
      if (res_registry.get(key) === 'image') {
        return key;
      }
    }
    return null;
  }

  era.checkImage = (...names) => {
    if (names.length === 0) {
      return false;
    }
    const results = names.map(
      (name) => res_registry.get(String(name).toLowerCase()) === 'image',
    );
    return names.length === 1 ? results[0] : results;
  };
  era.playMusic = (names, config) => {
    const cfg = typeof config === 'object' ? config : { loop: false }; // 引擎：非对象重置
    const list = (Array.isArray(names) ? names : [names]).map((name) =>
      String(name).toLowerCase(),
    );
    const played =
      list.find((name) => res_registry.get(name) === 'audio') ?? null;
    music.push({ api: 'play', names: list, config: cfg, played });
    return played !== null;
  };
  era.stopMusic = () => {
    music.push({ api: 'stop' });
  };
  era.resumeMusic = () => {
    music.push({ api: 'resume' });
  };
  era.printImage = (...names) => {
    const resolved = names.map(resolve_image_layer).filter(Boolean);
    const entry =
      resolved.length > 0
        ? { type: 'image', names, resolved }
        : { type: 'image', names };
    return push_row([entry]);
  };
  era.printWholeImage = (names, config) => {
    const resolved = (Array.isArray(names) ? names : [names])
      .map(resolve_image_layer)
      .filter(Boolean);
    // 引擎：falsy config 重置为 {}
    const base = { type: 'image.whole', names, config: config || {} };
    return push_row([resolved.length > 0 ? { ...base, resolved } : base]);
  };
  era.getLineCount = () => total_rows;
  era.clear = async (line_count) => {
    // 引擎 clear 的第一段短路（app.asar 逐字）：system.disableClear 配置开着
    // 时整体无操作、返回当前行数——不清、不等、不置位。#68 时裁定「已查实
    // 不镜像」，#91 起进注入点（契约测试逐步比对守卫链，缺它第一层对不齐），
    // 旋钮在 system_config.disableClear（默认 false，与引擎默认一致）
    if (system_config.disableClear) {
      return total_rows;
    }
    // 引擎 clear 的 isContinue 短路（app.asar 逐字）：0!==e && isContinue →
    // 清屏前强制等键（waitAnyKey(!0)——右键快进在清屏前的打断点，ADR-0003
    // 「快进遇 era.clear 会停下」的机制本体）。e 是原始实参（clear(0) 不等，
    // clear(undefined)/clear(n) 在快进态等），判据不用 Number 归一。
    if (line_count !== 0 && is_continue) {
      await era.waitAnyKey(true);
    }
    // 渲染层公式（app.vue 的 clear）：Number(lineCount) 为 NaN（含无参）或
    // 大于现有行数 → 整屏清空；0 → 无操作；否则删最近 n 个 Row。返回清屏
    // 后的行数（主进程 setTotalLines(渲染层回传值)，getLineCount 读同一
    // 计数）。条目删除按 row >= 剩余行数切尾——不带 row 的条目（比对回放
    // 注入的输入标记）不是 Row，只在整屏清空时随之消失。
    const before = total_rows;
    const n = Number(line_count);
    if (Number.isNaN(n) || n > total_rows) {
      total_rows = 0;
    } else if (n > 0) {
      total_rows -= n;
    }
    const cut = lines.findIndex(
      (l) => l.row !== undefined && l.row >= total_rows,
    );
    if (cut >= 0) {
      lines.splice(cut);
    }
    // 引擎 setTotalLines(r)：行数有变时再置位 allowWait（clearScreen 监听器
    // 末尾的收尾动作——清屏本身算一次「屏幕有新内容」）
    if (total_rows !== before) {
      allow_wait = true;
    }
    return total_rows;
  };

  // —— 变量 ——
  // 调教域表的引擎守卫镜像（app.asar 寻址层 648 的实测语义，issue #44）：
  //   - tflag/tequip/tcvar/palam/param/delta/gotjuel/deltabase/ex/nowex/stain
  //     在 beginTrain 前不存在：二段寻址（tflag:0）落到兜底分支，引擎报
  //     「key error in getter/setter」——夹具同款抛错；
  //   - 三段寻址（palam:0:3）在角色未入调教时静默丢弃写入（引擎
  //     `if(!this.data[a]||!this.data[a][c])return;`），source 表虽随 resetData
  //     预建、角色子表仍只有 addCharacterForTrain 才建——同一守卫；
  //   - juel/flag/base 等常驻表不受限。
  // 「我们调了 era.set」证明不了「引擎接受了」——#21/#22 的教训，此处镜像
  // 引擎侧守卫，让 beginTrain 的时序错误在夹具里同样炸出来。
  const TRAIN_ONLY_TABLES = new Set([
    'tflag',
    'tequip',
    'tcvar',
    'palam',
    'param',
    'delta',
    'gotjuel',
    'gotjewel',
    'deltabase',
    'ex',
    'nowex',
    'stain',
  ]);
  const TRAIN_CHAR_GUARD_TABLES = new Set([...TRAIN_ONLY_TABLES, 'source']);
  let train_open = false;
  const chars_in_train = new Set();

  // 引擎的表名归一：param→palam、*jewel→*juel（寻址层 648 原文同款）
  function normalize_table_name(var_name) {
    let table = String(var_name).split(':')[0].toLowerCase();
    if (table === 'param') {
      table = 'palam';
    }
    if (table.endsWith('jewel')) {
      table = `${table.slice(0, -5)}juel`;
    }
    return table;
  }

  // 按引擎守卫检查一次寻址：越界抛错 / 静默丢弃返回 false，正常放行 true
  function train_table_allows(var_name) {
    const table = normalize_table_name(var_name);
    if (!TRAIN_CHAR_GUARD_TABLES.has(table)) {
      return true;
    }
    const segments = String(var_name).split(':');
    if (!train_open) {
      // 二段 tflag:0 → 引擎兜底分支报错；三段 palam:0:3 → data.palam 整表
      // 缺失，同样走 `if(!this.data[a]||...)return;` 静默丢弃
      if (segments.length <= 2) {
        throw new Error(`key error in getter/setter! key (${var_name})`);
      }
      return false;
    }
    if (segments.length >= 3) {
      // 三段寻址要求角色已 addCharacterForTrain：子表不在即静默丢弃
      return chars_in_train.has(Number(segments[1]));
    }
    return true;
  }

  era.get = (var_name) => {
    if (var_name !== 'gamebase' && !train_table_allows(var_name)) {
      var_reads.push({ name: var_name, value: undefined });
      return undefined;
    }
    const value = store.get(var_name);
    var_reads.push({ name: var_name, value });
    return value;
  };
  era.set = (var_name, value) => {
    if (var_name !== 'gamebase' && !train_table_allows(var_name)) {
      return undefined; // 引擎静默丢弃：不落盘、不留写记录
    }
    store.set(var_name, value);
    var_writes.push({ name: var_name, value });
    return value;
  };
  era.add = (var_name, value) => {
    if (var_name !== 'gamebase' && !train_table_allows(var_name)) {
      return undefined;
    }
    // 引擎语义：累加后落盘并返回新值；无现值时按 0 起算
    const next = (store.get(var_name) ?? 0) + value;
    store.set(var_name, next);
    var_writes.push({ name: var_name, value: next });
    return next;
  };

  // —— 存档 API（#137）：saveData / loadData / rmData 的数据层语义 ——
  //
  // 此前是「不设防的桩」：走兜层只记录、返回 undefined——loadData 的成功
  // 路径要靠用例就地替换，版本闸门与「数据被整体替换」从来没有被夹具
  // 表达过（#136 实机验收在同一张票上撞出的三个缺陷有两个同此根因，
  // #137 评论移交）。此处镜像引擎 loadData 的两道语义（app.asar 逐字）：
  //   1. 版本闸门：`if (r.version && !(r.version < allowVersion))` ——
  //      存档的 version 为 falsy（0/undefined）或低于最低支持版本即拒读
  //      （返回 false，不替换数据）。#138 的版本轴起点 0.0.1 正是为躲开
  //      `r.version` 的 truthy 短路；
  //   2. 整体替换：`this.era.data = r` + fillData()——读档成功后变量表
  //      整个换成存档时的快照。
  // 快照口径：global:* 键与 gamebase（静态表）不随档走（global 存
  // global.sav、gamebase 是静态数据），快照与灌回都跳过；其余平表全量。
  // 备注（global:saves:n）由 saveData 落、rmData 删，与引擎一致（11-saves）。
  //
  // 旋钮 save_gate：{current_version, allow_version}，默认 1/1（非 0——
  // 0 会撞 truthy 短路，与 #138 的版本轴决定一致）。用例造「旧版本存档」
  // 的姿势：先降 current_version 再 saveData，或直接造 save_files（不推荐）。
  const save_files = new Map(); // slot -> {version, snapshot: Map 副本}
  const save_gate = { current_version: 1, allow_version: 1 };
  const snapshot_store = () =>
    new Map(
      [...store.entries()].filter(
        ([key]) => !key.startsWith('global:') && key !== 'gamebase',
      ),
    );
  const restore_store = (snapshot) => {
    // 只清「随档走」的键：global:*/gamebase 保持现值（引擎不重置它们）
    for (const key of [...store.keys()]) {
      if (!key.startsWith('global:') && key !== 'gamebase') {
        store.delete(key);
      }
    }
    for (const [key, value] of snapshot) {
      store.set(key, value);
    }
  };
  era.saveData = async (slot, comment) => {
    calls.push({ api: 'saveData', args: [slot, comment] });
    save_files.set(slot, {
      version: save_gate.current_version,
      snapshot: snapshot_store(),
    });
    // 引擎：备注落 global:saves 并自动 saveGlobal（11-saves.md）
    store.set(`global:saves:${slot}`, comment);
    return true;
  };
  era.loadData = async (slot) => {
    calls.push({ api: 'loadData', args: [slot] });
    const record = save_files.get(slot);
    if (record === undefined) {
      return false; // 无此档（引擎读文件失败同 false）
    }
    // 引擎版本闸门逐字（含 truthy 短路）：拒读 = false，数据不动
    if (record.version && !(record.version < save_gate.allow_version)) {
      restore_store(record.snapshot);
      return true;
    }
    return false;
  };
  era.rmData = async (slot) => {
    calls.push({ api: 'rmData', args: [slot] });
    save_files.delete(slot);
    store.delete(`global:saves:${slot}`);
    return true;
  };

  // —— 输入 ——
  // 只取值、不落 inputs_consumed：era.input 校验通过后才记录——被白名单
  // 拒收的值引擎不会回传给游戏，记进去会把「玩家试过」误当「游戏收到」
  const take_input = () => {
    if (input_queue.length === 0) {
      throw new Error(
        '测试夹具：era.input() 等待输入，但预置输入已耗尽（先用 set_inputs 预置）',
      );
    }
    return input_queue.shift();
  };
  // 引擎 system.hideUserInput / system.disableClear 配置（ere.config.json 的
  // 键，游戏代码不能改）的镜像：hideUserInput 默认 false＝回显计行、
  // disableClear 默认 false＝clear 正常清——测试翻转以覆盖 input 回显三段
  // 短路的第一段与 clear 的第一段短路（#91 契约测试的探针旋钮）
  const system_config = { hideUserInput: false, disableClear: false };
  // 引擎 input() 回显计行的三段短路，逐字镜像（app.asar 主进程 input）：
  //   v(this.config,"system.hideUserInput") || e.hideInput || e.any
  //     || this.print(i)
  // 即普通 input() 对回显值 print → addTotalLines → +1 Row；任一短路命中
  // 则不 print。夹具只调计数器、不推条目——条目层的回显由比对回放的输入
  // 标记承载（tools/compare/replay.js），再推条目会把比对窗口的输入边界
  // 翻倍（回显行与标记各产生一次 input 事件）。waitAnyKey 不占行的机制
  // 也在这条短路上：引擎 waitAnyKey 内部走 input({any:true})，e.any 命中
  // 第三段、回显 print 不发生——不是另一套独立实现（夹具的 waitAnyKey
  // 仍是不取输入的记录桩，见下，机制同源）。
  const input_echo_adds_row = (config) =>
    !system_config.hideUserInput && !config?.hideInput && !config?.any;
  era.input = async (config) => {
    const value = take_input();
    // —— 按钮白名单校验（#130）：镜像引擎渲染层 returnFromButton 的拒收 ——
    // 引擎（app.vue，两处逐字）：useRule 默认开（safeUndefinedCheck 兜底
    // true）；config.rule（字符串）先把合法集合换成 RegExp（showInput），
    // 判据 !rule.test(val.toString())，文案「输入不合法！输入规范：…」；
    // 数组分支（按钮快捷键）非空才设限，判据 rule.indexOf(Number(val))
    // === -1，文案「输入不合法！请输入以下值之一：a, b, c」——拒收即弹
    // 错且**不回传**，游戏逻辑拿不到该值。夹具同款抛错：喂进引擎永远不会
    // 送达的输入（如 #129 的 [109]、PR #53 的 [100]）当场红，不再靠人开
    // 引擎发现。集合为空（本轮没打印过按钮）＝自由输入不设限——引擎对
    // 取名等场景的原生出口（dev-guides/05-interaction.md），不是豁免通道
    if (config?.useRule !== false) {
      if (config?.rule) {
        if (!new RegExp(`^${config.rule}$`).test(String(value))) {
          throw new Error(
            `测试夹具：输入不合法！输入规范：${config.rule}（era.input() 的 config.rule 校验，引擎同款）`,
          );
        }
      } else if (
        input_rules.length > 0 &&
        !input_rules.includes(Number(value))
      ) {
        throw new Error(
          `测试夹具：输入不合法！请输入以下值之一：${input_rules.join(', ')}（era.input() 只接受本轮已打印按钮的快捷键；本轮＝上一次输入之后，引擎同款校验）`,
        );
      }
    }
    // 引擎：任何一次成功回传都把 rule 清空（returnFromButton 成功路径的
    // rule=[]）——上一轮按钮对下一次 input 不再有约束力。inputs_consumed
    // 也在此刻记录：校验通过＝游戏真的收到了这个值
    input_rules.length = 0;
    inputs_consumed.push({ api: 'input', value });
    if (input_echo_adds_row(config)) {
      total_rows += 1; // this.print(回显值)：+1 Row
      allow_wait = true; // 回显经 print → addTotalLines：同样置位（逐字）
    }
    return value;
  };
  // 引擎 waitAnyKey(e) 的逐字镜像：((allowWait || e) && (allowWait = !1,
  // await input({any:true})))——有输出（或强制 e）才等键、等待即消费清零。
  // 「等待」在本桩里的可观测面：waited=true 时记 inputs_consumed 一条
  // {api:'waitAnyKey'}（与既有取证兼容），全部调用（含跳过的）进 waits
  // 观测记录。不取输入队列（既定桩策略）；不占 Row（input({any:true}) 的
  // e.any 命中回显短路，见上方注释）。
  era.waitAnyKey = async (force) => {
    const waited = allow_wait || Boolean(force);
    allow_wait = false;
    waits.push({ waited, rows_at_wait: total_rows, forced: Boolean(force) });
    if (waited) {
      // 引擎：等待＝input({any:true,useRule:false}) 真回传一次，returnFromButton
      // 成功路径同样清空 rule——waitAnyKey 之前打印的按钮不再约束后续 input
      input_rules.length = 0;
      inputs_consumed.push({ api: 'waitAnyKey' });
    }
  };

  // —— 角色：addCharacter 有专门实现，不再是只记录的空壳（issue #35）——
  //
  // 引擎语义（app.asar 的 EraApi.addCharacter）：第一步就是
  // `!!staticData.chara[源编号]` 的短路——无预设数据时返回 false、一个字段
  // 都不写、不报错。#21/#22 的验收正是被空壳夹具放过：断言只证「调了」，
  // 证不了「引擎接受了」。夹具镜像这条守卫与加入动作；预设数据由用例经
  // seed_chara 提供（夹具不读 yml/——静态表正确性由 test/chara-yml.test.js
  // 直接驱动引擎代码比对，两层不重复）。
  const chara_presets = new Map(); // 源编号 → 预设对象（对应引擎 staticData.chara）
  const chara_no = []; // 已加入角色（对应引擎 data.no：先滤同号再入列）
  era.addCharacter = (...chara_ids) => {
    calls.push({ api: 'addCharacter', args: chara_ids });
    const results = chara_ids.map((arg) => {
      // 双参数形态 [目标号, 源数据号]；单参数两者同号
      const [target, source] = Array.isArray(arg) ? arg : [arg, arg];
      if (!chara_presets.has(source)) {
        return false; // 引擎短路：无预设数据不加
      }
      const index = chara_no.indexOf(target);
      if (index >= 0) {
        chara_no.splice(index, 1);
      }
      chara_no.push(target);
      // 引擎 addCharacter 方法体的两条赋值（app.asar，test/chara-yml.test.js
      // 用引擎真方法比对锁定）：callname[id][-1] = 预设 name、
      // [id][-2] = 预设 callname ?? name。游戏代码读 callname:${id}:-1/-2
      // 由此取值（#5 决议：SAVESTR/CSTR 的名字承载）。直接写 store 不经
      // era.set：引擎侧这是数据层赋值、不经 setVar，var_writes 只收录游戏
      // 代码经 era.set 的写入（全量断言的写清单不被引擎内部动作混入）。
      const preset = chara_presets.get(source);
      store.set(`callname:${target}:-1`, preset.name);
      store.set(`callname:${target}:-2`, preset.callname ?? preset.name);
      return true;
    });
    return chara_ids.length === 1 ? results[0] : results;
  };

  // CHARANUM 的等价物：主菜单的指针钳制读它（page-main-menu.js）。
  // 返回副本，调用方改不动夹具内部状态。
  era.getAddedCharacters = () => [...chara_no];

  // —— 调教 API：镜像引擎 beginTrain/endTrain 一族的数据层语义（#44）——
  // beginTrain 创建仅限调教的表并把 tflag 静态条目清 0（表只建一次）、
  // endTrain 结算 gotjuel 后删表；两者间 getCharactersInTrain 读已入列角色。
  // 结算/删除的实际数值语义（gotjuel→juel、delta→palam 等）不在此镜像：
  // 夹具的 store 是平表，per-chara 子表结构不存在——那层比对归引擎
  // bundle 用例（test/train-loop.test.js 的寻址锁）。这里只镜像「何时可寻址」
  // 与调用记录，让时序错误（beginTrain 之前写 tflag）当场暴露。
  era.beginTrain = (...chara_ids) => {
    calls.push({ api: 'beginTrain', args: chara_ids });
    train_open = true; // 引擎：表已存在时跳过重建，此处等价（守卫只看开闭）
    chara_ids.forEach((id) => chars_in_train.add(id));
    return undefined;
  };
  era.addCharacterForTrain = (...chara_ids) => {
    calls.push({ api: 'addCharacterForTrain', args: chara_ids });
    chara_ids.forEach((id) => chars_in_train.add(id));
    return undefined;
  };
  era.getCharactersInTrain = () => [...chars_in_train];
  era.nextTurnInTrain = () => {
    calls.push({ api: 'nextTurnInTrain', args: [] });
    return undefined;
  };
  era.endTrain = () => {
    calls.push({ api: 'endTrain', args: [] });
    train_open = false;
    chars_in_train.clear();
    return undefined;
  };

  // 引擎 resetData 会清空全部存档数据；夹具只清已加入列表——store 里静态
  // 预置与存档数据尚未分离，全面清空需要先做那层区分。
  era.resetData = () => {
    // 与 addCharacter 同样记录：有专门实现的 API 不走兜底记录层，不显式
    // push 的话 fixture.calls 里就看不见它（用例断言「先清档」要读这里）
    calls.push({ api: 'resetData', args: [] });
    chara_no.length = 0;
    return undefined;
  };
  // removeCharacter（DELCHARA 的引擎等价物，#44 的 @EVENTEND 死亡分支用）：
  // 镜像引擎的过滤删除（data.no.filter，命中即出列）；其余角色表的清理在
  // 平表 store 里天然发生（键带着旧角色 ID，不再被读到）。
  era.removeCharacter = (...chara_ids) => {
    calls.push({ api: 'removeCharacter', args: chara_ids });
    const kept = chara_no.filter((id) => !chara_ids.includes(id));
    chara_no.length = 0;
    chara_no.push(...kept);
    return chara_ids.length === 1
      ? !chara_no.includes(chara_ids[0])
      : undefined;
  };

  // —— quit：throw 型控制流的逐字镜像（issue #148，普查报告 G5）——
  //
  // 引擎（app.asar 模块 183，逐字）：quit(){throw this.era.quit(),new Error("quit")}
  // ——逗号表达式：先发关窗 IPC，然后抛 Error("quit")。装载循环显式识别并
  // 静默放行（'quit' !== e.message && this.error(...)），即游戏脚本的整个
  // Promise 链被炸穿、QUIT 之后的所有语句（含各层调用方的后续）不可达。
  // 夹具同构：先记录调用（关窗 IPC 的观测面），再抛同 message 的 Error——
  // era.quit() 的调用点从此在测试里拿到与真机一致的控制流；拆掉 throw 就
  // 是把它降格回「恒值成功」的无害桩（普查报告第四节纪律 2 所禁的形态）。
  era.quit = () => {
    calls.push({ api: 'quit', args: [] });
    throw new Error('quit');
  };

  // —— logger：必须整对象替换。
  // 只置 version.engine 不够：SDK 自带的 logger 在 engine 非空时会自调用
  // （era-electron.js:291-295），形成无限递归
  era.logger = {
    debug: (msg) => logs.push({ level: 'debug', msg }),
    info: (msg) => logs.push({ level: 'info', msg }),
    warn: (msg, stack) => logs.push({ level: 'warn', msg, stack }),
    error: (msg, stack) => logs.push({ level: 'error', msg, stack }),
    assert: (check_val, aim_val) =>
      logs.push({ level: 'assert', msg: { check_val, aim_val } }),
  };

  // —— 其余 API 兜底：只记录、不抛错，保证未覆盖的调用可见且无害 ——
  const implemented = new Set([
    'print',
    'printAndWait',
    'println',
    'drawLine',
    'printButton',
    'replaceText',
    'printMultiColumns',
    'printInColRows',
    'replaceInColRows',
    'printProgress',
    'printImage',
    'printWholeImage',
    'checkImage',
    'playMusic',
    'stopMusic',
    'resumeMusic',
    'getLineCount',
    'clear',
    'get',
    'set',
    'add',
    'saveData',
    'loadData',
    'rmData',
    'input',
    'waitAnyKey',
    'addCharacter',
    'getAddedCharacters',
    'resetData',
    'beginTrain',
    'addCharacterForTrain',
    'getCharactersInTrain',
    'nextTurnInTrain',
    'endTrain',
    'removeCharacter',
    'quit',
  ]);
  Object.keys(era).forEach((key) => {
    if (
      typeof era[key] === 'function' &&
      // delay 自带真实实现（带 _s 标记、不经守卫包装），保留不动
      key !== 'delay' &&
      !implemented.has(key)
    ) {
      era[key] = (...args) => {
        calls.push({ api: key, args });
        return undefined;
      };
    }
  });

  return {
    /** 注入了记录层的真实 SDK 对象 */
    era,
    /** 输出行记录 [{type, text, row, ...}]，含 text/br/divider/button；
     * 一次多列输出的全部格子共享同一 row 号（#68，比对看格、组件看 Row） */
    lines,
    /** 仅取文本行（type === 'text'）的纯文本，最常用的断言入口 */
    text_lines() {
      return lines.filter((line) => line.type === 'text').map((l) => l.text);
    },
    /** 全量行史（含已被 clear/replace 删掉的条目；#73 起就地重绘的取证层）。
     *  条目形状与 lines 相同；比对归一化器只读 lines，不看这里 */
    lines_history,
    /** 兜底调用记录 [{api, args}] */
    calls,
    /** 变量读记录 [{name, value}] */
    var_reads,
    /** 变量写记录 [{name, value}] */
    var_writes,
    /** 变量存储 Map，可预置状态、可直接断言 */
    store,
    /** logger 记录 [{level, msg}] */
    logs,
    /** 音乐事件记录 [{api: 'play'|'stop'|'resume', ...}]（issue #69） */
    music,
    /** 全部 waitAnyKey 调用记录 [{waited, rows_at_wait, forced}]（含跳过的；
     *  rows_at_wait = 调用瞬间的行数，#73 分发期可见性的直接证据） */
    waits,
    /** 引擎 allowWait 的只读观测面（#91 契约测试逐步比对用）：每一步比对
     *  {行数, allowWait}，行为本体仍在 push_row / waitAnyKey / input / clear
     *  的镜像里——这里只开观测，不开写口 */
    get allow_wait() {
      return allow_wait;
    },
    /** 引擎 isContinue（右键快进态）的代位旋钮：置 true 后非 0 的 clear
     *  在清屏前强制等键（引擎语义见 clear 处注释；默认 false = 非快进） */
    set is_continue(value) {
      is_continue = Boolean(value);
    },
    get is_continue() {
      return is_continue;
    },
    /** 已消费的输入 [{api, value?}] */
    inputs_consumed,
    /**
     * 预置一串输入，等待输入的 API 依次消费
     */
    set_inputs(...values) {
      input_queue.push(...values);
    },
    /**
     * 清空输入队列后重新预置（#120 端到端）：驱动方逐轮供输入时，上一轮
     * 未消费的条目（如仅触发轮才消费的结局询问 [0]）会残留在队头，普通
     * set_inputs 只会追加到其后、造成错位——先清再供，让每轮的输入序列
     * 恒从队头开始。返回清掉的条目数，供驱动方核对消费量
     */
    reset_inputs(...values) {
      const dropped = input_queue.length;
      input_queue.length = 0;
      input_queue.push(...values);
      return dropped;
    },
    /**
     * 替换全局 Math.random 为给定函数（#120）：ere 侧原作 RAND:N 的等价物
     * 散布在 turnend-settle / event-nextday / chara-init / kojo / juel-check
     * 的**事件处理器体内**，外部无参数通道（chara-init 的函数参数注入先例
     * 只适用于被显式调用的函数）；在 ere/ 开随机源缝会破坏「游戏代码零
     * 修改、不留任何测试钩子」的注入点原则（本文件头）。Math.random 是
     * JS 可变全局，在夹具层替换它是唯一不动游戏代码的随机源注入点——
     * 与 set_inputs 同属「驱动方对世界的预设」。
     *
     * 进程级副作用：必须成对调 restore_math_random()（同文件后续用例才
     * 不被污染；node --test 的文件间进程隔离管不到同文件）
     */
    override_math_random(fn) {
      Math.random = fn;
    },
    /** 恢复 override_math_random 替换前的 Math.random（幂等） */
    restore_math_random() {
      Math.random = real_math_random;
    },
    /**
     * 预置已注册的媒体资源（对应引擎 res 注册表，注册名自动小写——与
     * eraStart 的装载行为一致）。type 取 'image'（默认）或 'audio'。
     */
    seed_res(name, type = 'image') {
      res_registry.set(String(name).toLowerCase(), type);
    },
    /** 引擎 system 配置的镜像（hideUserInput / disableClear，默认与引擎
     *  一致为 false）：置 true 后 input 回显不计 Row / clear 整体无操作，
     *  覆盖两条引擎短路的对应段，见「输入」段与 clear 处注释 */
    system_config,
    /** 存档闸门旋钮（#137）：current_version = saveData 盖章的版本、
     *  allow_version = 【最低支持版本】（loadData 的拒读下限）。默认 1/1
     *  （非 0，避开 truthy 短路）。造「旧版本存档」：先降 current_version
     *  再 saveData，或 saveData 后改 record（不推荐） */
    save_gate,
    /** 预置角色预设数据（对应引擎 staticData.chara[id]），addCharacter 守卫放行 */
    seed_chara(chara_id, preset) {
      chara_presets.set(chara_id, preset);
    },
    /** 已加入的角色（对应引擎 data.no）；无预设的 addCharacter 不会进这里 */
    chara_no,
    /** 经 '#/' 加载游戏模块，与引擎的加载路径一致 */
    load_module(name) {
      return require(`#/${name}`);
    },
  };
}

module.exports = { create_era_fixture };
