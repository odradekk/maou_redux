/**
 * @file ere_check_game（tools/ere-game-builder）两处误报的回归（issue #819）：
 *   1. 表定义只认文件名 `param`。引擎的 `parseObject` 把 `param` 与 `palam`
 *      放在同一个装载分支里，都写进 `staticData.juel`；本项目把文件叫
 *      `Palam.yml`，于是 `palam`/`delta`/`gotjuel` 被当成自定义一维表，
 *      三段地址全判「段数不对」（全库 314 条）。
 *   2. 「在 beginTrain 之前读取」对每个「文件 × 表」报一次，不分析调用路径；
 *      判断一条读取是否发生在调教期间需要跨文件调用图，逐文件扫描做不到，
 *      所以改为默认不收集，只有 includeInfo 才出现。
 *
 * 夹具用 `json/` 而不是 `yml/`：yml 要经 yamljs 解析，而它是仓库的
 * devDependency，变异测试的隔离副本（COPY_DENY 排除 node_modules）里没有——
 * 那样的用例会在副本里因为缺依赖而红，把变异结果染成误报。文件→表的识别与
 * 格式无关，json 夹具同样走到 classifyFile。
 */

'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const LIB = path.join(ROOT, 'tools', 'ere-game-builder', 'lib');
const CLI = path.join(ROOT, 'tools', 'ere-game-builder', 'cli.mjs');

const check_module = import(pathToFileURL(path.join(LIB, 'check.js')));
const data_path_module = import(pathToFileURL(path.join(LIB, 'data-path.js')));
const tables_module = import(pathToFileURL(path.join(LIB, 'tables.js')));

/** 与仓库里的 Palam.yml 同一形状：键是变量名，值是至少带 id 的映射。 */
const PALAM = JSON.stringify({ 阴核: { id: 0 }, 欲情: { id: 5 } });

const GAMEBASE = JSON.stringify({
  title: '检查器夹具',
  author: '测试',
  info: '',
  year: 2026,
  gameCode: 100000,
  version: 1,
  allowVersion: 1,
});

/** 引擎 SDK 的最小特征：两个标记都命中，检查器才认为找到了 SDK。 */
const SDK = [
  "const era = { version: { sdk: '5.0.0' } };",
  'module.exports = era;',
  '',
].join('\n');

/** 一个在调教期之外读调教表的脚本：tflag 读两次、deltabase 读一次。 */
const TRAIN_SCRIPT = [
  "'use strict';",
  "const era = require('#/era-electron');",
  'function read_train_tables() {',
  "  era.get('tflag:1');",
  "  era.set('tflag:2', 1);",
  "  return era.get('deltabase:0:1');",
  '}',
  'module.exports = { read_train_tables };',
  '',
].join('\n');

/** 够用的 API 清单：只列出夹具脚本用到的成员。 */
const API_INDEX = {
  api: { get: {}, set: {}, add: {}, beginTrain: {} },
  runtime: {},
};

/**
 * 造一个只有 json/ 的游戏目录。
 *
 * @param {Record<string, string>} staticFiles - json/ 下的文件内容。
 * @returns {string} 临时目录（调用方负责删除）。
 */
function make_static_game(staticFiles) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ere-check-'));
  fs.mkdirSync(path.join(root, 'json'));
  for (const [name, text] of Object.entries(staticFiles)) {
    fs.writeFileSync(path.join(root, 'json', name), text, 'utf8');
  }
  return root;
}

/**
 * 再补上能被 ere_check_game 完整扫描的脚本目录。
 *
 * @param {string} root - make_static_game() 造的目录。
 * @param {Record<string, string>} ereFiles - ere/ 下的文件内容（相对路径 → 文本）。
 * @returns {string} 同一个目录。
 */
function add_ere_files(root, ereFiles) {
  fs.mkdirSync(path.join(root, 'ere'));
  for (const [name, text] of Object.entries(ereFiles)) {
    const target = path.join(root, 'ere', name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, text, 'utf8');
  }
  return root;
}

/** 跑一段断言并保证临时目录被删掉。 */
function with_temp_game(root, body) {
  try {
    return body(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

/**
 * 经命令行跑一次全量检查，取回 --json 结果。
 *
 * @param {string} target - 游戏目录。
 * @param {string[]} extraArgs - 追加的命令行参数。
 * @returns {{ status: number | null, output: string }} 退出码与合并输出。
 */
function run_check_cli(target, extraArgs) {
  const result = spawnSync(
    process.execPath,
    [CLI, 'ere_check_game', target, ...extraArgs],
    {
      encoding: 'utf8',
      timeout: 60_000,
      killSignal: 'SIGKILL',
    },
  );
  return {
    status: result.status,
    output: `${result.stdout ?? ''}${result.stderr ?? ''}`,
  };
}

// —— 误报一：Palam 与 Param 都是 juel 表 ——

for (const fileName of ['Palam.json', 'Param.json']) {
  test(`${fileName} 定义的表按二维表识别，三段地址不再报段数不对`, async () => {
    const { readStaticData } = await tables_module;
    const { validateDataPath } = await data_path_module;
    with_temp_game(make_static_game({ [fileName]: PALAM }), (root) => {
      const model = readStaticData(path.join(root, 'json'), { format: 'json' });
      assert.equal(
        model.variables.juel?.dimension,
        2,
        `${fileName} 必须定义 juel 表，实际定义了：${Object.keys(model.variables).join('、')}`,
      );
      assert.equal(
        model.variables.juel?.file,
        fileName,
        `${fileName} 应当是 juel 表的来源文件`,
      );
      // 三段地址：引擎按角色分桶，是正确写法。info 级的调教期说明另算，这里只看错误
      const three = validateDataPath('palam:0:5', model, 'template').filter(
        (finding) => finding.severity === 'error',
      );
      assert.deepEqual(
        three.map((finding) => finding.message),
        [],
        `${fileName} 下 palam:0:5 是合法的三段地址`,
      );
      // 反向：二维表的两段地址该报，证明真的认成了二维表而不是放行一切
      const two = validateDataPath('palam:0', model, 'template');
      assert.ok(
        two.some(
          (finding) =>
            finding.severity === 'error' &&
            finding.message.includes('段数不对'),
        ),
        `${fileName} 下 palam:0 缺一段，必须报段数不对`,
      );
    });
  });
}

// —— 误报二：调教期专用表的提示默认不收集 ——

test('调教期专用表的提前读取提示默认不收集，includeInfo 才按「文件 × 表」报一次', async () => {
  const { checkGame } = await check_module;
  const root = add_ere_files(
    make_static_game({ 'GameBase.json': GAMEBASE, 'Palam.json': PALAM }),
    {
      'main.js': 'module.exports = async () => {};\n',
      'era-electron.js': SDK,
      'train.js': TRAIN_SCRIPT,
    },
  );
  with_temp_game(root, () => {
    const plain = checkGame({ gameRoot: root, apiIndex: API_INDEX });
    assert.deepEqual(
      plain.findings.filter((finding) => finding.severity === 'info'),
      [],
      '默认不收集 info 级提示：调教期表的误报会挤占 maxFindings 并淹没真错误',
    );
    assert.equal(
      plain.findings.filter((finding) => finding.message.includes('beginTrain'))
        .length,
      0,
      '默认结果里不该出现「在 era.beginTrain() 之前读取」',
    );

    const verbose = checkGame({
      gameRoot: root,
      apiIndex: API_INDEX,
      includeInfo: true,
    });
    const notes = verbose.findings.filter(
      (finding) =>
        finding.severity === 'info' && finding.message.includes('beginTrain'),
    );
    assert.equal(
      notes.length,
      2,
      `同一文件里 tflag 读两次只报一次、deltabase 另报一次，实际：${notes.map((note) => note.message).join(' / ')}`,
    );
    assert.ok(
      notes.some(
        (note) =>
          note.file === 'ere/train.js' &&
          note.message.startsWith('era.get("tflag:1")'),
      ),
      '提示要带出实际的数据路径',
    );
  });
});

test('命令行 --includeInfo 才打开 info 级提示，默认的 --json 结果里没有', () => {
  const root = add_ere_files(
    make_static_game({ 'GameBase.json': GAMEBASE, 'Palam.json': PALAM }),
    {
      'main.js': 'module.exports = async () => {};\n',
      'era-electron.js': SDK,
      'train.js': TRAIN_SCRIPT,
    },
  );
  with_temp_game(root, () => {
    const plain = run_check_cli(root, ['--json']);
    assert.equal(
      plain.status,
      0,
      `夹具本身应当没有错误，实际输出：\n${plain.output}`,
    );
    assert.deepEqual(
      JSON.parse(plain.output).info,
      [],
      '默认的 --json 结果里不该有 info 级提示',
    );

    const verbose = run_check_cli(root, ['--includeInfo', '--json']);
    assert.equal(verbose.status, 0, verbose.output);
    const notes = JSON.parse(verbose.output).info.filter((finding) =>
      finding.message.includes('beginTrain'),
    );
    assert.equal(
      notes.length,
      2,
      '--includeInfo 要能打开 info 级提示（夹具有 tflag 与 deltabase 各一条）',
    );
  });
});
