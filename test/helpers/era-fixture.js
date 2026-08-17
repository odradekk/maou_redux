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
function create_era_fixture() {
  install_hash_resolver();
  purge_ere_cache();

  // 故意经 '#/' 加载真实 SDK 文件（与游戏代码同一路径）
  const era = require('#/era-electron');

  // 绕过 SDK 尾部的「未注入」守卫
  era.version.engine = era.version.sdk;

  // —— 记录层状态（每个夹具独立） ——
  const lines = []; // 输出行记录：print 系列
  const calls = []; // 无专门实现的 API 的兜底调用记录
  const var_reads = []; // 变量读记录
  const var_writes = []; // 变量写记录
  const logs = []; // logger 记录
  const inputs_consumed = []; // 已消费的输入
  const input_queue = []; // 预置输入队列，等待输入的 API 依次消费
  const store = new Map(); // 变量存储

  const push_line = (entry) => {
    lines.push(entry);
    return lines.length - 1;
  };

  const push_text = (content) =>
    push_line({ type: 'text', text: normalize_content(content), content });

  // —— 输出 ——
  era.print = (content) => push_text(content);
  era.printAndWait = async (content) => push_text(content);
  era.println = () => push_line({ type: 'br', text: '' });
  era.drawLine = (config) =>
    push_line({
      type: 'divider',
      text: normalize_content(config?.content ?? ''),
      // 引擎渲染层（app.asar）：content 是分隔线中央的标签文字而非线型字符，
      // isSolid 决定 el-divider 的 border-style（solid/dashed）。原作
      // DRAWLINEFORM 的双线 ═ / 单线 ─ 以 solid/dashed 近似，断言线型看这里。
      border: config?.isSolid ? 'solid' : 'dashed',
    });
  era.printButton = (content, accelerator, config) => {
    const text = normalize_content(content);
    return push_line({
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
    });
  };
  era.replaceText = (content) => {
    // 语义：替换最后一行。夹具按「弹掉最后一行再压入新文本行」近似
    lines.pop();
    return push_text(content);
  };
  era.getLineCount = () => lines.length;
  era.clear = async (line_count) => {
    // 不带参数清空全部；带参数清除最近 N 行
    if (line_count === undefined) {
      lines.length = 0;
    } else {
      lines.splice(Math.max(0, lines.length - line_count));
    }
    return lines.length;
  };

  // —— 变量 ——
  era.get = (var_name) => {
    const value = store.get(var_name);
    var_reads.push({ name: var_name, value });
    return value;
  };
  era.set = (var_name, value) => {
    store.set(var_name, value);
    var_writes.push({ name: var_name, value });
    return value;
  };
  era.add = (var_name, value) => {
    // 引擎语义：累加后落盘并返回新值；无现值时按 0 起算
    const next = (store.get(var_name) ?? 0) + value;
    store.set(var_name, next);
    var_writes.push({ name: var_name, value: next });
    return next;
  };

  // —— 输入 ——
  const take_input = (api) => {
    if (input_queue.length === 0) {
      throw new Error(
        `测试夹具：era.${api}() 等待输入，但预置输入已耗尽（先用 set_inputs 预置）`,
      );
    }
    const value = input_queue.shift();
    inputs_consumed.push({ api, value });
    return value;
  };
  era.input = async () => take_input('input');
  era.waitAnyKey = async () => {
    // 任意键继续：立即放行、只留痕。预置输入只供 era.input 消费，此处不取
    inputs_consumed.push({ api: 'waitAnyKey' });
  };

  // —— 角色：addCharacter 有专门实现，不再是只记录的空壳（issue #35）——
  //
  // 引擎语义（app.asar 的 EraApi.addCharacter）：第一步就是
  // `!!staticData.chara[源编号]` 的短路——无预设数据时返回 false、一个字段
  // 都不写、不报错。#21/#22 的验收正是被空壳夹具放过：断言只证「调了」，
  // 证不了「引擎接受了」。夹具镜像这条守卫与加入动作；预设数据由用例经
  // seed_chara 提供（夹具不读 yml/——静态表正确性由 test/chara-yml.test.js
  // 直接驱动引擎代码对拍，两层不重复）。
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
      // 用引擎真方法对拍锁定）：callname[id][-1] = 预设 name、
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
  // 引擎 resetData 会清空全部存档数据；夹具只清已加入列表——store 里静态
  // 预置与存档数据尚未分离，全面清空需要先做那层区分。
  era.resetData = () => {
    // 与 addCharacter 同样留痕：有专门实现的 API 不走兜底记录层，不显式
    // push 的话 fixture.calls 里就看不见它（用例断言「先清档」要读这里）
    calls.push({ api: 'resetData', args: [] });
    chara_no.length = 0;
    return undefined;
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
    'getLineCount',
    'clear',
    'get',
    'set',
    'add',
    'input',
    'waitAnyKey',
    'addCharacter',
    'getAddedCharacters',
    'resetData',
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
    /** 输出行记录 [{type, text, ...}]，含 text/br/divider/button */
    lines,
    /** 仅取文本行（type === 'text'）的纯文本，最常用的断言入口 */
    text_lines() {
      return lines.filter((line) => line.type === 'text').map((l) => l.text);
    },
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
    /** 已消费的输入 [{api, value?}] */
    inputs_consumed,
    /** 预置一串输入，等待输入的 API 依次消费 */
    set_inputs(...values) {
      input_queue.push(...values);
    },
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
