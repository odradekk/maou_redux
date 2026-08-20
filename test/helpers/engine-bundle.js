/**
 * @file 引擎代码测试助手：从 app.asar 解包 background.js，把引擎自己的
 * 解析器、装载循环与 EraApi 方法直接交给测试用（issue #35）。
 *
 * 为什么需要它：test/helpers/era-fixture.js 的记录层只能证明「我们调了这个
 * API」，证不了「引擎接受了这次调用」——#21/#22 的「初始角色被加入」验收
 * 正是这样漏过实机的（yml/ 缺角色表时 addCharacter 整段短路，测试却全绿）。
 * 自写的解析镜像又会漂移。这里的做法是把 #17 实机验证的手法固化成测试：
 * 用引擎自己的代码当基准。
 *
 * 手法（均为 app.asar 的实测结构）：
 *   1. asar 头是一段 JSON 目录（前 16 字节是两个 UInt32 的 pickle 长度），
 *      按 offset/size 切出 background.js（webpack bundle）；
 *   2. 把入口调用 `r(r.s=311)` 替换成暴露 webpack require——入口模块是
 *      Electron 装配代码，不执行它，其余模块全部惰性、可按号取用；
 *   3. `new Function('require', …)` 求值（模块里的外部依赖走 Node 的
 *      require，本助手用到的模块树不需要 Electron）。
 *
 * 模块号是 ere-4.8.0 的实测值（见各字段注释），引擎升版后编号漂移会在这里
 * 抛错——那是重新核读新版的信号，不是本助手的缺陷。
 *
 * asar 定位顺序：环境变量 ERE_ENGINE_ASAR → 仓库内 ere-4.8.0-win-x64/
 * （全新克隆按 AGENTS.md 放置引擎运行时即命中）→ D:\Code\era 主 checkout。
 * 三处都没有时 load_engine_bundle() 返回 undefined，依赖它的用例以
 * test.skip 退场并留一行警告——引擎对拍是加强项，不该让无引擎的裸克隆
 * 连 npm test 都跑不过。
 */

const fs = require('node:fs');
const path = require('node:path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

// asar 候选位置（按顺序取第一个存在的）
function locate_asar() {
  const candidates = [
    process.env.ERE_ENGINE_ASAR,
    path.join(REPO_ROOT, 'ere-4.8.0-win-x64', 'resources', 'app.asar'),
    'D:\\Code\\era\\ere-4.8.0-win-x64\\resources\\app.asar',
  ].filter(Boolean);
  return candidates.find((candidate) => fs.existsSync(candidate));
}

// 从 asar 里切出单个文件的内容；头结构见文件头注释
function read_asar_file(asar_path, name) {
  const buf = fs.readFileSync(asar_path);
  const header_size = buf.readUInt32LE(12);
  const header = JSON.parse(buf.slice(16, 16 + header_size).toString('utf8'));
  const walk = (node) => {
    for (const [file_name, entry] of Object.entries(node.files || {})) {
      if (file_name === name && entry.offset !== undefined) {
        const start = 16 + header_size + Number(entry.offset);
        return buf.slice(start, start + entry.size).toString('utf8');
      }
      if (entry.files) {
        const found = walk(entry);
        if (found !== undefined) {
          return found;
        }
      }
    }
    return undefined;
  };
  return walk(header);
}

let cached_bundle;

/**
 * 加载引擎 bundle，返回引擎函数。找不到 asar 时返回 undefined（用例自行 skip）。
 * 进程内记忆化：44MB 的 asar 与 1MB 的 bundle 每个测试进程只读一次。
 */
function load_engine_bundle() {
  if (cached_bundle !== undefined) {
    return cached_bundle;
  }
  const asar_path = locate_asar();
  if (!asar_path) {
    console.warn(
      '[engine-bundle] 未找到 ere-4.8.0 的 app.asar（可设 ERE_ENGINE_ASAR 指路），引擎对拍用例将跳过',
    );
    cached_bundle = null;
    return cached_bundle;
  }
  const bundle_src = read_asar_file(asar_path, 'background.js');
  if (!bundle_src || !bundle_src.includes('r(r.s=311)')) {
    throw new Error(
      `app.asar 的 background.js 不是已知形状（入口 r(r.s=311) 缺失）：${asar_path}`,
    );
  }
  const patched = bundle_src.replace(
    'r(r.s=311)}',
    'globalThis.__ere_wp = r;}',
  );
  const bootstrap = new Function(
    'require',
    `${patched}; return globalThis.__ere_wp;`,
  );
  const wp = bootstrap(require);

  // 模块号漂移守卫（#91）：4.8.0 实测 EraApi 是模块 183——引擎升版后编号
  // 漂移时 wp(183) 会取到别的模块，下游在 undefined 上炸出不知所云的
  // TypeError。这里就地抛「引擎变了」，与「引擎缺失 → 返回 undefined 让
  // 用例 skip」区分开：asar 在场而模块对不上 = 镜像要重核的时刻，硬红。
  const era_api = wp(183);
  const ERA_API_METHODS = [
    'addTotalLines',
    'setTotalLines',
    'waitAnyKey',
    'getLineCount',
    'clear',
    'print',
    'input',
    'playMusic',
    'printProgress',
    'addCharacter',
  ];
  if (
    !ERA_API_METHODS.every(
      (method) => typeof era_api?.prototype?.[method] === 'function',
    )
  ) {
    throw new Error(
      '引擎变了：app.asar 的模块 183 不再是 EraApi（原型方法缺失）——重新核读 test/helpers/engine-bundle.js 的模块号映射，并核对 docs/adr/0005 的三层可达性判定是否仍成立',
    );
  }

  cached_bundle = {
    /** 引擎静态表解析器（模块 677）：parseDataFile(文本, 'csv'|'yml', 表名) → 行数组 */
    parse_data_file: wp(677),
    /** 引擎键名映射（模块 676）：{ _replace, chara, gamebase } */
    name_mapping: wp(676),
    /** 引擎工具（模块 65）：getNumber / toLowerCase / safeUndefinedCheck 等 */
    engine_utils: wp(65),
    /** EraApi 类（模块 183，已过形状守卫）：addCharacter 是未绑定方法，须以假 this 调用 */
    era_api,
    /** 引擎变量寻址（模块 648）：setVar.call(this, varName, val, isAdd)，get 同路 */
    set_var: wp(648),
  };
  return cached_bundle;
}

/**
 * 新建一份「角色预设装载状态」，并给出与 eraStart 同构的装载入口。
 *
 * 装载循环是 app.asar background.js eraStart 段的逐句转写（this.* 换成局部
 * state、this.error 换成 errors.push；callname 三列行落入 relation 分支的
 * switch fallthrough 是引擎原样，勿“修复”）。static_data 只含 chara/
 * relationship/gamebase——变量表（Base/Talent/Item 等）由调用方按需挂载
 * （test/helpers/static-tables.js，#38）：表不在时缺表行两侧同样落 errors，
 * 表在场时预设经 name→id 翻译真正落进 preset。
 *
 * #67 起 extended_tables 可传二维扩展表登记（引擎侧是
 * `this.extendedTables`，eraStart 由 config 的 extendedCharaTables 填成
 * `表名 → EraApi.tableType.chara`）。装载循环的守卫
 * `extended_tables[mapped] !== tableType.normal` 用它区分：已登记（chara）
 * 与内置表一样进 switch，预设行可落；未登记的自定义表是 normal，预设行
 * 整行跳过（一维表没有按角色预设）。
 *
 * @param {{ extended_tables?: Object<string, number> }} [options]
 *   extended_tables：表名 → EraApi.tableType.chara（2）的登记表
 * @returns {{ static_data: object, errors: string[], load_rows: (rows: Array) => void }}
 */
function create_chara_loader({ extended_tables = {} } = {}) {
  const engine = load_engine_bundle();
  if (!engine) {
    return undefined;
  }
  const { toLowerCase, safeUndefinedCheck } = engine.engine_utils;
  const { chara: chara_mapping } = engine.name_mapping;
  const { tableType } = engine.era_api;

  const static_data = {
    chara: {},
    relationship: { callname: {}, relation: {} },
    gamebase: { defaultChara: 0 },
  };
  const errors = [];

  return {
    static_data,
    errors,
    load_rows(rows) {
      const preset = {};
      let mapped, second, value;
      rows.forEach((row) => {
        row[0] = toLowerCase(row[0]);
        mapped = safeUndefinedCheck(chara_mapping[row[0]], row[0]);
        if (
          'item' !== mapped &&
          'flag' !== mapped &&
          'global' !== mapped &&
          extended_tables[mapped] !== tableType.normal
        ) {
          switch (mapped) {
            case 'id':
            case 'name':
            case 'title':
              preset[mapped] = row[1];
              break;
            case 'callname':
              if (!row[2]) {
                preset[mapped] = row[1];
                break;
              }
            /* falls through */
            case 'relation':
              static_data.relationship[mapped][`${preset.id}|${row[1]}`] =
                row[2];
              break;
            default:
              second = toLowerCase(row[1]);
              value = row[2];
              null != value || (value = 'cstr' === mapped ? '' : 1);
              if (static_data[mapped]) {
                second = safeUndefinedCheck(
                  static_data[mapped][second],
                  second,
                );
                (preset[mapped] || (preset[mapped] = {}))[second] = value;
              } else {
                errors.push(`角色数据表不存在: ${mapped}!`);
              }
          }
        }
      });
      if (void 0 !== preset.id) {
        if (static_data.chara[preset.id]) {
          const existing = static_data.chara[preset.id];
          Object.keys(preset).forEach((key) => {
            if (typeof preset[key] === 'object' && existing[key]) {
              Object.keys(preset[key]).forEach((sub) => {
                existing[key][sub] = preset[key][sub];
              });
            } else {
              existing[key] = preset[key];
            }
          });
        } else {
          static_data.chara[preset.id] = preset;
        }
      }
    },
  };
}

/**
 * 新建一份「变量表装载状态」，并给出与 eraStart 同构的装载入口。
 *
 * 装载循环是 app.asar background.js eraStart 变量表分支的逐句转写
 * （this.staticData/this.fieldNames 换成局部 state、this.log 的序号去重
 * 告警换进 warnings；s() 序号去重函数与 item 特例分支均取引擎原语义）。
 * 与 create_chara_loader 配合即可复现「变量表 + 角色预设」的完整装载：
 * 先 load_rows 变量表、再把 static_data 挂到角色装载器的 state 上。
 *
 * #43 增补两处转写（此前用不到、故未写）：进入内层 switch 前引擎统一把
 * 名称列小写（o.map(e=>(e[1]=toLowerCase(e[1]),e))）；param/palam 两个
 * 表名落到同一分支、装进 staticData.juel 一张名字表（juel/jewel/delta 等
 * 文件名受保护不可用，Emuera 里 JUEL 与 PALAM 共用名字表在引擎侧同样成立，
 * 缺省开发套件键 k 的前缀是 param 而非表名）。
 *
 * @returns {{ static_data: object, field_names: object, warnings: string[],
 *            load_rows: (rows: Array, table: string) => void }}
 */
function create_variable_loader() {
  const engine = load_engine_bundle();
  if (!engine) {
    return undefined;
  }
  const { toLowerCase } = engine.engine_utils;

  const static_data = {};
  const field_names = {};
  const warnings = [];

  // eraStart 的 s()：序号被占用则自增到第一个空位，告警原文同构。
  // names_key 是占用表在 field_names 里的键（param/palam 分支是 juel），
  // label 是告警文本里的表名（引擎用文件表名 i）。
  const dedup_id = (names_key, label, id, name) => {
    let next = id;
    while (field_names[names_key][next]) {
      next += 1;
    }
    if (next !== id) {
      warnings.push(
        `${label}.yml 出现重复变量序号! 变量 ${name} 的序号 ${id} 已被分配给 ` +
          `${field_names[names_key][id].n}! 序号重置为 ${next}`,
      );
    }
    return next;
  };

  return {
    static_data,
    field_names,
    warnings,
    load_rows(rows, table) {
      // 引擎在进入内层 switch 前统一把名称列小写（逐句转写，原地改写）
      rows.forEach((row) => {
        row[1] = toLowerCase(row[1]);
      });
      if (table === 'param' || table === 'palam') {
        // param/palam 分支（引擎原文同构）：共用名字表 juel，k 缺省前缀 param
        static_data.juel = {};
        field_names.juel = {};
        rows.forEach((row) => {
          const id = dedup_id('juel', table, row[0], row[1]);
          static_data.juel[row[1]] = id;
          field_names.juel[id] = {
            n: row[1],
            k: row[3] ?? `param${id}`,
            t: row[4] ?? 'number',
          };
        });
      } else if (table === 'item') {
        // item 特例分支：name/price 双映射（引擎原文同构）
        static_data.item = { name: {}, price: {} };
        field_names[table] = {};
        rows.forEach((row) => {
          const raw_id = row[0];
          const name = row[1];
          const id = dedup_id(table, table, raw_id, name);
          static_data.item.name[name] = id;
          static_data.item.price[id] = row[2];
          field_names[table][id] = {
            n: name,
            k: row[3] ?? `item${id}`,
            t: 'number',
          };
        });
      } else {
        // default 分支：名称 → 序号映射 + fieldNames 的 k/t 缺省（引擎原文）
        static_data[table] = {};
        field_names[table] = {};
        rows.forEach((row) => {
          const raw_id = row[0];
          const name = row[1];
          const id = dedup_id(table, table, raw_id, name);
          static_data[table][name] = id;
          field_names[table][id] = {
            n: name,
            k: row[3] ?? `${table}${id}`,
            t: row[4] ?? (table === 'cstr' ? 'string' : 'number'),
          };
        });
      }
    },
  };
}

/**
 * 以「假 this + 真方法」驱动引擎的 addCharacter（模块 183 的原型方法）。
 *
 * 方法体只依赖 this.staticData / this.data / this.era.extendedTables 与模块
 * 闭包里的工具函数——闭包是真的，this 是按字段清单最小构造的。返回的
 * data.no / data.callname 即引擎内部数据层本身，不是替身。
 *
 * #67 起 options.extended_tables 可传二维扩展表登记（表名 →
 * EraApi.tableType.chara）：引擎的 fillData 会给登记表建顶层桶
 * （`data[表] ||= {}`，eraStart 实证），addCharacter 的扩展表段在顶层桶
 * 上按角色建桶并预填——两处都在这里镜像，未登记时不建（引擎同款）。
 *
 * @param {object} static_data 预设数据（create_chara_loader().static_data）
 * @param {{ extended_tables?: Object<string, number> }} [options]
 * @returns {{ data: object, add: (id: number) => boolean }}
 */
function create_add_character(static_data, { extended_tables = {} } = {}) {
  const engine = load_engine_bundle();
  if (!engine) {
    return undefined;
  }
  // data 的表清单抄自 addCharacter 方法体首段的逐表赋值
  const data = {
    no: [],
    maxbase: {},
    base: {},
    abl: {},
    talent: {},
    cflag: {},
    cstr: {},
    equip: {},
    mark: {},
    exp: {},
    juel: {},
    callname: {},
    relation: {},
    love: {},
  };
  // fillData 的扩展表分支镜像：登记为 chara 且名字表在场的表建顶层桶
  // （`data[表] ||= {}`）；normal（一维）不建角色桶，跳过
  for (const [name, type] of Object.entries(extended_tables)) {
    if (type === engine.era_api.tableType.chara && static_data[name]) {
      data[name] = {};
    }
  }
  const fake_this = {
    staticData: static_data,
    data,
    era: { extendedTables: extended_tables },
  };
  return {
    data,
    add: (chara_id) =>
      engine.era_api.prototype.addCharacter.call(fake_this, chara_id),
  };
}

module.exports = {
  create_add_character,
  create_chara_loader,
  create_variable_loader,
  load_engine_bundle,
  locate_asar,
};
