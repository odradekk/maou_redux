/**
 * @file 角色表族二段寻址守卫（#212 返工三）：扫 ere/ 全部 .js，角色表的
 * 二段字面量（`'<表>:<数字>'`）即红。
 *
 * 缘由：同一类缺陷在 #184、#185、#212 三张独立票里各出一次、三次都零测试
 * 拦截——原作 `TEQUIP:35` / `JUEL:1` / `TALENT:122` 这类省略角色位的写法，
 * Emuera 语义是「== TARGET」，ere 侧必须三段（`tequip:${target}:35`）。
 * 写成二段在引擎里的后果比读不到更糟（app.asar setVar 二段分支实测）：
 *   - `tequip:35` → 命中**角色 35** 的整行对象（恒 truthy——Chara35 是真实
 *     角色，避孕套后缀因此恒显示）；
 *   - `tequip:37` → undefined（没有编号 37 的角色，守卫恒不触发）；
 *   - `era.add('juel:1', …)` → 打在角色 1 的行对象上，加算从未生效。
 * 夹具是平表、镜像不出这个差别，所以靠静态扫描（判据只认字面量前缀，与
 * test/static-table-coverage.test.js 同款做法）。
 *
 * 表族清单的依据（显式列出，勿凭记忆增删）：
 *   - 引擎模块 649 的 initCharaTable：abl/talent/cflag/equip/mark/exp/juel
 *     （app.asar 实测原文，fillData 按角色预填这些表）；
 *   - fillData 的特设角色表：base/maxbase（["base","maxbase"] 分支）与
 *     cstr（按角色预填空串）；
 *   - beginTrain→addCharacterForTrain 按角色建桶的调教域表：
 *     palam（param 是引擎归一别名）/gotjuel（gotjewel 同）/delta/
 *     deltabase/ex/nowex/stain/source/tequip/tcvar（era-fixture 的
 *     TRAIN_ONLY_TABLES 同款清单）；
 *   - yml/_fixed.json 的 extendedCharaTables（tableType.chara）：
 *     portcflag/ex_talent。
 * **不在名单**（二段是其合法形态，勿误伤）：callname/relation/love——
 * setVar 二段 switch 的显式 case（callname:c 与 relation:c 返回行对象、
 * love:c 是按角色的值）；flag/tflag/tstr/global/item 等平表。
 *
 * 阳性对照：对清单里**每一个**表族喂已知坏样本，必须被抓——防两件事：
 * 扫描正则失效（空转）、清单被摘条（摘掉哪族哪族红）。这是 M715 反向变异
 * 的靶子。**本守卫不放豁免名单**（#212 返工时十一处已全部修完，树是
 * 干净的；将来真有豁免需求，先想清楚是不是又在写二段）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const REPO_ROOT = path.resolve(__dirname, '..');
const ERE_DIR = path.join(REPO_ROOT, 'ere');

// 角色表族清单（依据见文件头，逐组注明）
const CHARA_TABLE_FAMILIES = [
  // 引擎模块 649 initCharaTable（角色预设装载表）
  'abl',
  'talent',
  'cflag',
  'equip',
  'mark',
  'exp',
  'juel',
  // fillData 特设角色表（base/maxbase 分支 + cstr 预填）
  'base',
  'maxbase',
  'cstr',
  // beginTrain→addCharacterForTrain 按角色建的调教域表（含引擎归一别名）
  'palam',
  'param',
  'gotjuel',
  'gotjewel',
  'delta',
  'deltabase',
  'ex',
  'nowex',
  'stain',
  'source',
  'tequip',
  'tcvar',
  // yml/_fixed.json 的 extendedCharaTables（tableType.chara）
  'portcflag',
  'ex_talent',
];

// 二段字面量：引号包住、恰一个冒号、第二段纯数字。模板串里是表达式
//（`tequip:${target}:35`）或三段（`juel:${arg}:1` 是三段）都不会命中。
const literal_re = (family) => new RegExp(`['"\`]${family}:\\d+['"\`]`, 'g');

/**
 * 扫一段源码文本，返回其中的角色表二段字面量违例。
 * @param {string} body 源码文本
 * @returns {Array<{family: string, literal: string}>}
 */
function scan_text(body) {
  const hits = [];
  for (const family of CHARA_TABLE_FAMILIES) {
    for (const m of body.matchAll(literal_re(family))) {
      hits.push({ family, literal: m[0] });
    }
  }
  return hits;
}

/** 递归收集 ere/ 下的 .js（引擎 SDK 的 JSDoc 例子不算游戏代码） */
function walk_js(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk_js(full, out);
    } else if (entry.name.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
}

test('守卫（真树）：ere/ 里不得有角色表族的二段字面量', () => {
  const violations = [];
  for (const file of walk_js(ERE_DIR)) {
    if (path.basename(file) === 'era-electron.js') {
      continue;
    }
    for (const hit of scan_text(fs.readFileSync(file, 'utf8'))) {
      violations.push(
        `${path.relative(REPO_ROOT, file)}：${hit.literal}（${hit.family} 是角色表，省略位 == TARGET 的 Emuera 写法须展开为三段）`,
      );
    }
  }
  assert.deepEqual(
    violations,
    [],
    '角色表二段寻址（#184/#185/#212 三次踩中的形态，引擎侧读行对象或 undefined）：\n' +
      violations.join('\n'),
  );
});

test('守卫（阳性对照）：清单与期望名单一致，且每个表族的坏样本都被抓住', () => {
  // 期望名单独立写死在此（与实现清单互为镜像，增删必须两侧同步）——
  // 只对实现清单自身做循环，摘条会让被摘的族根本不被检查（M715 首版教训）
  const EXPECTED = [
    'abl',
    'talent',
    'cflag',
    'equip',
    'mark',
    'exp',
    'juel',
    'base',
    'maxbase',
    'cstr',
    'palam',
    'param',
    'gotjuel',
    'gotjewel',
    'delta',
    'deltabase',
    'ex',
    'nowex',
    'stain',
    'source',
    'tequip',
    'tcvar',
    'portcflag',
    'ex_talent',
  ];
  assert.deepEqual(
    new Set(CHARA_TABLE_FAMILIES),
    new Set(EXPECTED),
    '守卫清单与期望名单不一致——增删表族必须有依据（见文件头），并同步两侧',
  );
  for (const family of EXPECTED) {
    for (const bad of [`'${family}:35'`, `\`${family}:35\``]) {
      const hits = scan_text(`era.get(${bad})`);
      assert.equal(
        hits.length,
        1,
        `${bad} 必须被判违例——${family} 不在守卫清单里，或扫描正则失效`,
      );
    }
  }
});

test('守卫（阴性对照）：三段与平表二段不误伤', () => {
  // 三段（正确形态）与含表达式的模板串
  assert.deepEqual(
    scan_text(
      "era.get(`tequip:${target}:35`) era.set(`juel:${arg}:1`, x) era.set('tflag:402', 0)",
    ),
    [],
  );
  // 平表二段是合法形态（tstr:90 / flag / global / item 等）
  assert.deepEqual(
    scan_text("era.set('tstr:90', '') era.get('flag:81') era.get(`global:3`)"),
    [],
  );
  // 二段合法的角色特例（callname/relation/love 的 setVar 显式 case）
  assert.deepEqual(scan_text("era.get('callname:31') era.get('love:0')"), []);
});
