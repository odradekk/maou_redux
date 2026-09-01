// 内联行号引用校核器（issue #44 验收整改；#48 验收整改起纳入 emuera.log；
// #63 起 ERB 侧补齐同款扫描完整性；#156 起多样本：引用前缀按样本名派生；
// #290 起锚表按 js 文件拆进 tools/trace-refs/，本文件只留校核）。
//
// 守什么：ere/ 移植文件正文里的 `// :N 原作片段` 注释，以及 #48 起
// tools/compare 等处指向黄金样本 target/emuera.log 的 `log:N` 注释。文件头
// 的「源: 文件 @函数」在历次验收里靠人核对了，但正文内联引用数量大、成片
// 偏移靠人眼查不出来（#44 实测：偏早 2~30 行；#48 实测：emuera.log 引用
// 26/42 处错——数值读对、行号指错，同一款亏）。
//
// 怎么守：输入一张「js 文件 → 源 ERB」映射 + 每条引用的锚（源文件在所引
// 行上应含的内容）。对每条：
//   1. js 文件里必须仍写着这条 `:N`（引用被删/被改，先红在这里）；
//   2. 源文件的第 N..M 行必须命中锚（行号偏移、源文件漂移，红在这里）。
// emuera.log 引用（LOG_REFS）同款两道，外加第三道**扫描完整性**：
//   3. ere/ tools/ test/ 全部 .js/.mjs 里出现的每个 log:N / emuera.log:N
//      （含区间）都必须在 LOG_REFS 登记——新增引用不登记即红，防绕过。
//      #156 起引用可带**样本名前缀**：`<样本名>-log:行号`（如范围 B 的
//      mainmenu-natural-log:行号）。前缀的样本名必须在 SAMPLES（唯一
//      真相源 tools/compare/samples.js，与 cli --sample 共用——两边映射
//      漂移 = 静默错判）登记，引用锚表按样本名分住在 SAMPLE_LOG_REFS，
//      校核目标是该样本名对应的样本文件。**裸 log:N 与 legacy
//      emuera.log:N 恒等价旧样本 target/emuera.log，存量注释一行不改**；
//      不带前缀写新样本的行号，扫描只会拿它去核旧样本（核对目标错位且
//      不报错）——所以新样本引用必须带前缀（#109 裁定）。
// ERB 侧同款第三道（#63 起）：
//   4. ere/ 全部 .js 注释里出现的每个 :N / :N-M 都必须在 FILES 登记或在
//      tools/trace-exempt.mjs 豁免——新增引用静默失守即红（#63 之前，
//      page-main-menu.js 零登记，派单时已知 3 条引用指错、实审得 7 条，
//      两颗贯通验证都没抓到）。引用形态统一定义为「注释内、冒号前不是词字符/点号/花括号的
//      :数字」——覆盖工单指出的三种写法（行尾 `// :N`、块注释 `* :N`、
//      括号 `（:N）`/`(:N)`）及其复合（斜杠链 `:A/:B`、`@函数名 :N`），
//      同时天然排除 `era.get('base:0:0')` 与注释里的 `deltabase:${cid}:0`
//      一类变量寻址（花括号排除 `}:0` 形态）与 `ERB:2` 一类
//      文件名:行号（后者不进锁：改写它会连坐 mutation-check 的 find 串）。
//      代码侧（注释外）一律不扫：三段寻址 `cflag:${id}:1` 无法与引用区分。
// 豁免清单是 #63 冻结的现有待办（未审计、行号对错未知）：只能变短
//   （本工具内嵌 ERB_EXEMPT_BASELINE 基线固定，超基线即红）、不许过期失效
//   （条目对应的 js 引用消失也红）——两条都在本工具里执行，退出码语义
//   对二者同样生效。行号一律以原始文件为准（emuera.log 是 UTF-8 BOM
//   + CRLF，BOM 不占行）。后来者改代码动了引用：把表里的 ref/锚一起更新，
//   锚对着 target/ 原文重新落位——表本身以源文件为准，不以致动者的记忆
//   为准。
//
// #290：FILES / LOG_REFS / SAMPLE_LOG_REFS 按「一个 js 文件一份锚表」落在
// tools/trace-refs/，加载器按目录扫描、新增分片即入账。按域合成不够——
// 二十张口上票全落 kojo.mjs 仍互撞。本文件只留校核。
//
// 用法：node tools/trace-check.mjs（全绿退出码 0，任何失配退出码 1）。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import samples_module from './compare/samples.js';
import { ERB_EXEMPT } from './trace-exempt.mjs';
import { DEFAULT_TRACE_REFS_DIR, load_trace_refs } from './trace-refs-load.mjs';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 样本名 → 样本文件（唯一真相源 tools/compare/samples.js；default 互导拿整
// 份 module.exports，不依赖 CJS 具名导出的静态分析）。
const SAMPLES = samples_module.SAMPLES;

const EMUERA_LOG = 'target/emuera.log';

// #282 注释自身的引用（本文件注释里写了 emuera.log:26，被完整性扫描
// 扫到；登记后自洽）——条目仍挂本文件，不跟锚表一起搬走。
const { FILES, LOG_REFS, SAMPLE_LOG_REFS } = await load_trace_refs(
  DEFAULT_TRACE_REFS_DIR,
);

// —— 校核 ——

const source_cache = new Map();
function load_source(rel) {
  if (!source_cache.has(rel)) {
    source_cache.set(
      rel,
      fs.readFileSync(path.join(REPO, rel), 'utf8').split(/\r?\n/),
    );
  }
  return source_cache.get(rel);
}

let failures = 0;
let checked = 0;

for (const { js, refs } of FILES) {
  const js_path = path.join(REPO, js);
  const js_text = fs.readFileSync(js_path, 'utf8');
  for (const { src, ref, any } of refs) {
    checked += 1;
    const label = `${js} :${ref} ↔ ${src}`;
    // 1) js 侧：引用仍在（防静默删除/改动）
    const ref_re = new RegExp(`:${ref.replace('-', '-')}(?!\\d)`);
    if (!ref_re.test(js_text)) {
      console.log(
        `✗ ${label} —— js 里已不存在「:${ref}」（引用被删或被改？同步更新本表）`,
      );
      failures += 1;
      continue;
    }
    // 2) 源侧：所引行命中锚（防行号偏移/源漂移）
    const lines = load_source(src);
    const [a, b = a] = ref.split('-').map(Number);
    const slice = lines.slice(a - 1, b).join('\n');
    if (!any.some((anchor) => anchor.test(slice))) {
      console.log(
        `✗ ${label} —— 源文件 ${a}${b === a ? '' : `-${b}`} 行未命中任何锚`,
      );
      failures += 1;
    }
  }
}

// —— emuera.log 引用：同款两道校验（presence 用带 log: 前缀的更严形态，
//    单值引用不得被区间引用的「log:N-M」前缀冒名满足）——

const js_text_cache = new Map();
function load_js_text(rel) {
  if (!js_text_cache.has(rel)) {
    js_text_cache.set(rel, fs.readFileSync(path.join(REPO, rel), 'utf8'));
  }
  return js_text_cache.get(rel);
}

for (const { js, refs } of LOG_REFS) {
  const js_text = load_js_text(js);
  for (const { ref, any } of refs) {
    checked += 1;
    const label = `${js} log:${ref} ↔ ${EMUERA_LOG}`;
    // 前瞻防区间冒名（单值不被 log:N-M 满足）；后顾防样本前缀冒名
    // （<样本名>-log:N 不是裸 log:N，不得满足裸引用的在场检查——那是
    // 另一个样本的行号，#156 静默错判的另一半）
    const presence = new RegExp(`(?<![A-Za-z0-9-])log:${ref}(?!-?\\d)`);
    if (!presence.test(js_text)) {
      console.log(
        `✗ ${label} —— js 里已不存在「log:${ref}」（引用被删或被改？同步更新本表）`,
      );
      failures += 1;
      continue;
    }
    const lines = load_source(EMUERA_LOG);
    const [a, b = a] = ref.split('-').map(Number);
    const slice = lines.slice(a - 1, b).join('\n');
    if (!any.some((anchor) => anchor.test(slice))) {
      console.log(
        `✗ ${label} —— 样本 ${a}${b === a ? '' : `-${b}`} 行未命中任何锚`,
      );
      failures += 1;
    }
  }
}

// —— 带样本名前缀的引用：同款两道校验（在场 + 锚），目标是 SAMPLES 里
//    该样本名对应的样本文件。样本名未登记 / 样本文件不在库，先红——
//    引用锚到不存在的样本等于没锚。 ——

/** 样本名做正则字面量安全转义（样本名约定 [A-Za-z0-9-]，转义是防御） */
function escape_re(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

for (const [sample_name, groups] of Object.entries(SAMPLE_LOG_REFS)) {
  const sample_rel = SAMPLES[sample_name];
  if (sample_rel === undefined) {
    checked += 1;
    console.log(
      `✗ ${sample_name} 的引用锚表 —— 样本名不在 SAMPLES（tools/compare/samples.js 是样本名→文件的唯一真相源，先登记再引用）`,
    );
    failures += 1;
    continue;
  }
  if (!fs.existsSync(path.join(REPO, sample_rel))) {
    checked += 1;
    console.log(
      `✗ ${sample_name} 的引用锚表 —— 样本文件 ${sample_rel} 不在库（#156 阶段二回收后才能登记引用锚）`,
    );
    failures += 1;
    continue;
  }
  for (const { js, refs } of groups) {
    const js_text = load_js_text(js);
    for (const { ref, any } of refs) {
      checked += 1;
      const label = `${js} ${sample_name}-log:${ref} ↔ ${sample_rel}`;
      const presence = new RegExp(
        `${escape_re(sample_name)}-log:${ref}(?!-?\\d)`,
      );
      if (!presence.test(js_text)) {
        console.log(
          `✗ ${label} —— js 里已不存在「${sample_name}-log:${ref}」（引用被删或被改？同步更新本表）`,
        );
        failures += 1;
        continue;
      }
      const lines = load_source(sample_rel);
      const [a, b = a] = ref.split('-').map(Number);
      const slice = lines.slice(a - 1, b).join('\n');
      if (!any.some((anchor) => anchor.test(slice))) {
        console.log(
          `✗ ${label} —— 样本 ${a}${b === a ? '' : `-${b}`} 行未命中任何锚`,
        );
        failures += 1;
      }
    }
  }
}

// —— 扫描完整性：ere/ tools/ test/ 全部 .js/.mjs 里的 log:N 引用都必须
//    在锚表登记（防新增引用绕过锚表——本锁的存在理由就是 #48 的
//    26 处无人看守的偏移）。#156 起引用可带样本名前缀：前缀段 = 紧邻
//    log: 之前、由字母数字与连词符组成且以 - 收尾的一截；带前缀的引用
//    按样本名查 SAMPLES 与 SAMPLE_LOG_REFS，裸引用照旧查 LOG_REFS。
//    legacy 的 emuera.log:N 写法照旧按裸引用解析（存量一行不改）。 ——

const LOG_REF_RE =
  /([A-Za-z0-9]+(?:-[A-Za-z0-9]+)*-)?(?:emuera\.)?log:(\d+)(?:-(\d+))?/g;

function list_js_files(dir_rel) {
  const out = [];
  const stack = [dir_rel];
  while (stack.length > 0) {
    const cur = stack.pop();
    for (const name of fs.readdirSync(path.join(REPO, cur))) {
      if (name === 'node_modules' || name.startsWith('.')) {
        continue;
      }
      const rel = `${cur}/${name}`;
      if (fs.statSync(path.join(REPO, rel)).isDirectory()) {
        stack.push(rel);
      } else if (/\.(js|mjs)$/.test(name)) {
        out.push(rel);
      }
    }
  }
  return out;
}

const tabled_by_file = new Map(
  LOG_REFS.map(({ js, refs }) => [js, new Set(refs.map((r) => r.ref))]),
);
const sample_tabled_by_file = new Map();
for (const [sample_name, groups] of Object.entries(SAMPLE_LOG_REFS)) {
  for (const { js, refs } of groups) {
    const key = `${sample_name}\u0000${js}`;
    const set = sample_tabled_by_file.get(key) ?? new Set();
    refs.forEach((r) => set.add(r.ref));
    sample_tabled_by_file.set(key, set);
  }
}
for (const rel of ['ere', 'tools', 'test'].flatMap(list_js_files)) {
  const found = new Set(
    [...load_js_text(rel).matchAll(LOG_REF_RE)].map((m) => {
      const sample = m[1] ? m[1].slice(0, -1) : '';
      const ref = m[2] ? `${m[2]}${m[3] ? `-${m[3]}` : ''}` : '';
      return `${sample}\u0000${ref}`;
    }),
  );
  for (const entry of found) {
    const [sample, ref] = entry.split('\u0000');
    if (sample === '') {
      if (!tabled_by_file.get(rel)?.has(ref)) {
        console.log(
          `✗ ${rel} log:${ref} —— 未登记进 LOG_REFS（登记后才能过锚校验）`,
        );
        failures += 1;
      }
      continue;
    }
    const token = `${sample}-log:${ref}`;
    if (!Object.hasOwn(SAMPLES, sample)) {
      console.log(
        `✗ ${rel} ${token} —— 样本名不在 SAMPLES（tools/compare/samples.js），先登记样本名再引用`,
      );
      failures += 1;
    } else if (!sample_tabled_by_file.get(`${sample}\u0000${rel}`)?.has(ref)) {
      console.log(
        `✗ ${rel} ${token} —— 未登记进 SAMPLE_LOG_REFS['${sample}']（登记后才能过锚校验）`,
      );
      failures += 1;
    }
  }
}

// —— #63 冻结基线：豁免清单（tools/trace-exempt.mjs）的上界快照 ——
//
// 条目表里的每一条都必须出现在这份基线内——超出即红（清单只能变短）。
// 消化现有条目 = 只动 trace-exempt.mjs（删条目，本表不碰）；要扩表必须连
// 这里一起改——冻结不是不可变，是「改动必须显式发生在标着冻结的地方」。
// 与 log 侧同构：扫描完整性（含它的数据）住在工具里，测试只做行为靶。

const ERB_EXEMPT_BASELINE = {
  'ere/chara/chara-ex.js': ['28-29', '28', '29', '101-102', '102'],
  'ere/era-utils/era-flag.js': ['26', '51', '321', '323'],
  'ere/event/event-com.js': ['261-268'],
  'ere/event/event-comend.js': ['45', '272-310', '292-309'],
  'ere/event/event-end.js': ['314-429', '421'],
  'ere/event/event-first.js': [
    '1',
    '8-9',
    '11-12',
    '15',
    '19',
    '21-24',
    '26',
    '27',
    '29-30',
    '31',
    '33',
    '35',
    '36-40',
    '42',
    '45',
    '47',
    '50-52',
    '53',
    '55',
    '56',
    '60-62',
    '62',
    '65-74',
    '69-73',
    '78',
    '80',
    '82-92',
    '87',
    '91',
    '92',
    '95-187',
    '96-100',
    '102',
    '103',
    '105',
    '107',
    '109',
    '110-119',
    '111',
    '121',
    '126-129',
    '130-133',
    '135-150',
    '138-142',
    '144-147',
    '152-166',
    '168-172',
    '169-170',
    '175',
    '187',
    '190-201',
    '198',
    '199-201',
    '203',
    '205-215',
    '231',
  ],
  'ere/event/event-train.js': ['13-58'],
  'ere/event/event-turnend.js': ['8-140'],
  'ere/event/first-setting.js': [
    '16-17',
    '781-935',
    '787-864',
    '909-915',
    '911',
    '912',
    '913',
    '914-915',
  ],
  'ere/event/source-check.js': [
    '31',
    '45',
    '56',
    '57-68',
    '79-86',
    '88-95',
    '97-104',
    '106-113',
    '115-122',
    '148',
    '152',
    '160-161',
    '222',
    '265',
    '393',
    '398',
    '406',
    '411',
    '504',
    '512',
    '547-549',
    '552',
    '578-655',
    '657-735',
    '691',
    '737-856',
    '740',
    '858-939',
    '936-951',
    '2122',
    '2175',
    '2508-2572',
  ],
  'ere/kojo/kojo-k3-noble.js': [
    '83',
    '84-85',
    '89',
    '887',
    '888-912',
    '918',
    '920-1105',
    '925',
    '928',
    '930',
    '931',
    '932-1104',
    '936',
    '938',
    '939',
    '940',
    '941',
    '943',
    '945',
    '946',
    '948',
    '949',
    '950',
    '951',
    '953',
    '956',
    '958',
    '960',
    '961',
    '963',
    '964',
    '965',
    '966',
    '967',
    '969',
    '970',
    '971',
    '972',
    '973',
    '975',
    '978',
    '980-988',
    '983',
    '984',
    '985',
    '987',
    '989',
    '991-1002',
    '993',
    '994',
    '995',
    '996',
    '998',
    '999',
    '1000',
    '1001',
    '1003',
    '1005',
    '1006',
    '1007',
    '1008',
    '1009',
    '1010-1019',
    '1015',
    '1017',
    '1022',
    '1024',
    '1025',
    '1026',
    '1027',
    '1028',
    '1030',
    '1031',
    '1032',
    '1033',
    '1034',
    '1036',
    '1037',
    '1038',
    '1039',
    '1040',
    '1042-1049',
    '1044',
    '1046',
    '1048',
    '1053',
    '1056-1066',
    '1057',
    '1058',
    '1059',
    '1060',
    '1062-1063',
    '1065',
    '1069-1078',
    '1071',
    '1073',
    '1075',
    '1076',
    '1077',
    '1078',
    '1080-1091',
    '1082',
    '1083',
    '1084',
    '1086',
    '1087',
    '1088',
    '1090',
    '1093-1101',
    '1095',
    '1099',
  ],
  'ere/kojo/kojo-k5-mao.js': [
    '82',
    '83-84',
    '88',
    '770',
    '772-773',
    '802',
    '807',
    '810',
    '811',
    '813',
    '814',
    '815-847',
    '819',
    '820',
    '821',
    '822',
    '825',
    '826',
    '827',
    '828',
    '831',
    '832',
    '833',
    '834',
    '837',
    '838',
    '839',
    '842',
    '843',
    '844',
    '846',
    '848',
  ],
  'ere/kojo/kojo-system.js': [
    '90-91',
    '92-131',
    '134-144',
    '152',
    '155',
    '157',
    '160',
    '161',
  ],
  'ere/page/page-ablup.js': [
    '10-11',
    '29-117',
    '32-33',
    '34-35',
    '36-37',
    '38-39',
    '40-41',
  ],
  'ere/page/page-info-exp.js': [
    '135',
    '1024-1029',
    '1032-1040',
    '1036',
    '1045-1047',
    '1048-1050',
    '1051-1053',
    '1058',
    '1058-1090',
    '1064-1065',
    '1066-1067',
    '1068-1069',
    '1070-1071',
    '1072-1073',
    '1074-1075',
    '1092-1113',
    '1095-1096',
    '1098-1099',
    '1101-1102',
    '1104-1105',
    '1108-1109',
  ],
  'ere/page/page-select-target.js': ['10-52', '105-112', '116-133', '311-321'],
  'ere/page/page-shop.js': [
    '20',
    '22-38',
    '24',
    '25-30',
    '33-36',
    '35',
    '38',
    '40-229',
    '44-57',
    '44',
    '59',
    '59-101',
    '65-68',
    '67-68',
    '68',
    '71-97',
    '79-80',
    '81-82',
    '83-84',
    '85-88',
    '91-92',
    '94-97',
    '96',
    '98-99',
    '99',
    '101',
    '102-106',
    '105',
    '108',
    '110',
    '113',
    '115',
    '117',
    '119-120',
    '121-122',
    '124-128',
    '127',
    '130-131',
    '132-133',
    '134-138',
    '140',
    '142',
    '144',
    '146',
    '148',
    '152',
    '152-153',
    '154',
    '154-155',
    '156-157',
    '158-159',
    '160-161',
    '162-163',
    '164-165',
    '166-167',
    '168-170',
    '172-221',
    '208-216',
    '222-223',
    '226-227',
    '229',
    '236-330',
    '337-421',
  ],
  'ere/page/page-title.js': [
    '2',
    '3-7',
    '13-15',
    '17',
    '19',
    '20-21',
    '25-26',
    '27',
    '29-35',
    '36-37',
    '38',
    '39-86',
    '58-73',
    '73',
    '74-81',
    '76-79',
    '80',
    '82',
    '84',
    '86',
    '89-90',
    '91',
    '92-101',
    '93',
    '99',
    '100',
    '100-103',
    '101-102',
    '102-107',
    '103',
    '106',
    '108-110',
    '111-113',
    '114-115',
  ],
  'ere/page/page-train.js': ['60-259'],
  'ere/page/page-usercom.js': ['7-100', '102-177', '771-780'],
  'ere/system/flow/main-loop.js': ['231'],
  'ere/system/train/com-caress.js': [
    '30',
    '34',
    '76-82',
    '91',
    '92',
    '93',
    '94',
    '97-98',
    '100-101',
    '103-104',
    '117-118',
    '122-123',
    '128-133',
    '134-141',
    '144-165',
    '147-165',
    '149-150',
    '153-154',
    '160',
    '163',
  ],
  'ere/system/train/juel-check.js': [
    '443-549',
    '449-458',
    '540-541',
    '541-546',
    '546',
    '549',
    '558-601',
    '598',
    '607',
    '624',
    '648-656',
    '655',
    '658-735',
    '659-692',
    '669',
    '671',
    '674',
    '682-685',
    '688-691',
    '693-724',
    '707',
    '708-711',
    '720-723',
    '740',
  ],
  'ere/system/train/train-loop.js': ['545'],
  'ere/system/train/train-message.js': [
    '10',
    '12-3049',
    '12',
    '15-1351',
    '15',
    '22-26',
    '28-90',
    '30-120',
    '69',
    '70',
    '71',
    '74-87',
    '94',
  ],
};

// —— ERB 侧扫描完整性（#63）：ere/ 全部 .js 注释里的 :N / :N-M 引用都
//    必须在 FILES 登记或在 ERB_EXEMPT 豁免——与 log 侧第三道同款，防
//    新增引用绕过锚表。引用形态见文件头第 4 条；豁免清单只能变短、
//    不许过期失效（见 tools/trace-exempt.mjs 头注） ——

const ERB_REF_RE = /(?<![A-Za-z0-9_.{}]):(\d+)(?:-(\d+))?/g;

/** 扫单个 js 文本里的 ERB 行号引用（注释侧；代码侧不扫，见文件头） */
function scan_erb_refs(text) {
  const found = new Set();
  for (const line of text.split(/\r?\n/)) {
    const parts = [];
    // 块注释行（jsdoc 的 * 续行与 /* 起始行）整行可扫
    if (/^\s*\*/.test(line) || /^\s*\/\*/.test(line)) {
      parts.push(line);
    }
    // 行注释：只扫 // 之后的部分（前面是代码，含三段寻址）
    const ci = line.indexOf('//');
    if (ci >= 0) {
      parts.push(line.slice(ci));
    }
    // 行内 /* … */ 段（本仓库罕用，出现即扫）
    for (const m of line.matchAll(/\/\*(.*?)\*\//g)) {
      parts.push(m[1]);
    }
    for (const part of parts) {
      for (const m of part.matchAll(ERB_REF_RE)) {
        found.add(m[2] ? `${m[1]}-${m[2]}` : m[1]);
      }
    }
  }
  return found;
}

const erb_registered_by_file = new Map(
  FILES.map(({ js, refs }) => [js, new Set(refs.map((r) => r.ref))]),
);
const erb_baseline_total = Object.values(ERB_EXEMPT_BASELINE).reduce(
  (sum, refs) => sum + refs.length,
  0,
);
let erb_found_total = 0;
let erb_exempt_total = 0;
for (const rel of list_js_files('ere')) {
  if (rel === 'ere/era-electron.js') {
    continue; // 引擎 SDK：JSDoc 示例不是移植注释
  }
  const found = scan_erb_refs(load_js_text(rel));
  erb_found_total += found.size;
  const registered = erb_registered_by_file.get(rel);
  const exempt = ERB_EXEMPT[rel] ?? [];
  erb_exempt_total += exempt.length;
  for (const ref of found) {
    if (!registered?.has(ref) && !exempt.includes(ref)) {
      console.log(
        `✗ ${rel} :${ref} —— 未登记进 FILES（新引用必须登记锚表；豁免清单是 #63 冻结的现有，不收新条目）`,
      );
      failures += 1;
    }
  }
  for (const ref of exempt) {
    if (!found.has(ref)) {
      console.log(
        `✗ ${rel} :${ref} —— 豁免条目在 js 里已不存在（引用被删/改号？同步删本条，清单只能变短）`,
      );
      failures += 1;
    }
  }
}

// 规则 1「只能变短」：条目表条目必须逐条落在 #63 基线内（在工具里执行，
// 与退出码语义一致——验收整改：此前这条只在测试里，条目表 465→466 时
// 单独跑工具的人看到的是绿）
for (const [rel, refs] of Object.entries(ERB_EXEMPT)) {
  const baseline_refs = ERB_EXEMPT_BASELINE[rel] ?? [];
  for (const ref of refs) {
    if (!baseline_refs.includes(ref)) {
      console.log(
        `✗ ${rel} :${ref} —— 豁免条目不在 #63 基线内（清单只能变短：消化现有条目 = 删条目；新引用登记 FILES 锚表，扩基线必须显式改 ERB_EXEMPT_BASELINE）`,
      );
      failures += 1;
    }
  }
}

console.log(
  failures === 0
    ? `✓ ${checked} 条内联行号引用全部与源文件一致；ERB 完整性：ere/ ${erb_found_total} 条引用全数登记或豁免（豁免 ${erb_exempt_total}/${erb_baseline_total} 条，#63 基线内只减不增，条目表见 tools/trace-exempt.mjs）`
    : `✗ ${failures}/${checked} 条引用对不上（另有 ERB 完整性失守计入 failures）`,
);
process.exit(failures === 0 ? 0 : 1);
