/**
 * 口上子类 K6 / K7 / K8 / K9 / K10 的契约（issue #856）。
 *
 * #856 的验收第一条是「这些性格的**全部**口上都通过工厂执行」。这条断言拆成
 * 三层，每层都能单独变红：
 *
 *   1. **静态**：五个文件里每个 `X_family.register(N, …)` 的第二参必须是转发到
 *      工厂实例的闭包（`(...args) => kojo_kN.hook(...args)`），不许直挂本体
 *      ——一处刻意保留的裸注册见 `BARE_REGISTERED`；类里每个钩子必须是一行转交，
 *      实参按迁移前族注册的形状递进本体（`select_com` →
 *      `kojo_message_com_N`，另有三处族实参与本体形参位不同的适配器）。两处合起来
 *      即「入口 → 工厂 → 本体」这条链的唯一形状。
 *   2. **运行期 · 族**：每个族的每个号实测——把实例上的钩子换成探针后，族调用
 *      必须走到探针（不是本体，也不是别的方法）。
 *   3. **运行期 · 入口**：`EVENT_K_DISPATCH_TABLE` 的 21 条分发入口逐条驱动，
 *      命中这五个性格时必须调实例钩子；同一条入口经工厂与直接调实例钩子的输出
 *      逐行一致（入口那层只剩总开关与存在判定）。
 *
 * 旧路径（迁移前族直挂本体）在运行期已经不可能复现——模块一装载，族注册就被
 * 转发到实例上了；所以「行为零变化」的证据分两处：本文件的静态一层证明钩子是
 * 原样转交，各性格自己的测试文件（kojo-k6-wicked 等）一字未改而全绿。
 *
 * 缝 = test/helpers/era-fixture.js（全项目唯一注入点）。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { register_handlers } = require('./helpers/event-registration');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

const REPO = path.resolve(__dirname, '..');

/**
 * 五个迁移的性格。#856 的接口面就是这张表：`hooks` 是「钩子 → 本体」（= 迁移前
 * 族注册的第二参），`adapters` 是族实参与本体形参位不同的那几处（迁移前的注册
 * 适配器照搬进钩子），`own_families` 是迁移前在本文件里登记过的那几个族。
 *
 * 注意 `select_com`：基类的模板方法 `kojo_message_com` 不覆盖（覆盖就绕开了头部
 * 检查），指令口上的本体挂在 `select_com` 上——它的头部检查仍在本体内部，见各
 * 文件类注释。
 */
const CASES = [
  {
    id: 6,
    module: 'kojo/kojo-k6-wicked',
    cls: 'KojoK6',
    hooks: {
      select_com: 'kojo_message_com_6',
      kojo_message_palamcng: 'kojo_message_palamcng_6',
      kojo_message_markcng: 'kojo_message_markcng_6',
      self_kojo: 'self_kojo_k6',
      dog_kojo: 'dog_kojo_6',
      colosseum_kojo: 'colosseum_kojo_6',
      benki_koujo: 'benki_koujo_k6',
      dungeon_victory: 'dungeon_victory_k6',
      dungeon_attack: 'dungeon_attack_k6',
      dungeon_ryouzyoku: 'dungeon_ryouzyoku_k6',
      dungeon_ryouzyoku_after: 'dungeon_ryouzyoku_after_k6',
      ntr_koujo: 'ntr_koujo_k6',
      exucution_koujo: 'exucution_koujo_k6',
      museum_koujo: 'museum_koujo_k6',
      banishment_koujo: 'banishment_koujo_k6',
      public_exucution_koujo: 'public_exucution_koujo_k6',
      grotesque_koujo: 'grotesque_koujo_k6',
      enterenemy_koujo: 'enterenemy_koujo_k6',
      gohoubi_request_koujo: 'gohoubi_request_koujo_k6',
      gohoubi_after_koujo: 'gohoubi_after_koujo_k6',
      osioski_koujo: 'osioki_koujo_k6',
      gobi_koujo: 'gobi_koujo_k6',
    },
    // K6 的族签名与本体形参同形（本体尾部的 rand 位族本来就不给），不用适配
    adapters: {},
    own_families: [
      'kojo_message_com_family',
      'dog_kojo_family',
      'colosseum_kojo_family',
      'kojo_message_palamcng_family',
      'kojo_message_markcng_family',
      'self_kojo_family',
      'ryouzyoku_kojo_family',
      'ryouzyoku_after_kojo_family',
      'benki_koujo_family',
      'dungeon_victory_family',
      'dungeon_attack_family',
      'ntr_koujo_family',
      'exucution_koujo_family',
      'museum_koujo_family',
      'banishment_koujo_family',
      'public_exucution_koujo_family',
      'grotesque_koujo_family',
      'enterenemy_koujo_family',
      'gohoubi_request_koujo_family',
      'gohoubi_after_koujo_family',
      'osioski_koujo_family',
      'gobi_koujo_family',
    ],
  },
  {
    id: 7,
    module: 'kojo/kojo-k7-heart',
    cls: 'KojoK7',
    hooks: {
      select_com: 'kojo_message_com_7',
      kojo_message_palamcng: 'kojo_message_palamcng_7',
      kojo_message_markcng: 'kojo_message_markcng_7',
      self_kojo: 'self_kojo_k7',
      dog_kojo: 'dog_kojo_7',
      colosseum_kojo: 'colosseum_kojo_7',
      benki_koujo: 'benki_koujo_k7',
      dungeon_victory: 'dungeon_victory_k7',
      dungeon_attack: 'dungeon_attack_k7',
      dungeon_ryouzyoku: 'dungeon_ryouzyoku_k7',
      dungeon_ryouzyoku_after: 'dungeon_ryouzyoku_after_k7',
      ntr_koujo: 'ntr_koujo_k7',
      exucution_koujo: 'exucution_koujo_k7',
      museum_koujo: 'museum_koujo_k7',
      banishment_koujo: 'banishment_koujo_k7',
      public_exucution_koujo: 'public_exucution_koujo_k7',
      grotesque_koujo: 'grotesque_koujo_k7',
      enterenemy_koujo: 'enterenemy_koujo_k7',
      gohoubi_request_koujo: 'gohoubi_request_koujo_k7',
      gohoubi_after_koujo: 'gohoubi_after_koujo_k7',
      osioski_koujo: 'osioki_koujo_k7',
      gobi_koujo: 'gobi_koujo_k7',
    },
    adapters: {},
    // DOG_KOJO_7 / COLOSSEUM_KOJO_7 没有注册（文件内直调）
    own_families: [
      'kojo_message_com_family',
      'self_kojo_family',
      'kojo_message_palamcng_family',
      'kojo_message_markcng_family',
      'gohoubi_after_koujo_family',
      'osioski_koujo_family',
      'gohoubi_request_koujo_family',
      'ryouzyoku_kojo_family',
      'ryouzyoku_after_kojo_family',
      'gobi_koujo_family',
      'benki_koujo_family',
      'enterenemy_koujo_family',
      'dungeon_victory_family',
      'dungeon_attack_family',
      'ntr_koujo_family',
      'exucution_koujo_family',
      'museum_koujo_family',
      'banishment_koujo_family',
      'public_exucution_koujo_family',
      'grotesque_koujo_family',
    ],
  },
  {
    id: 8,
    module: 'kojo/kojo-k8-spade',
    cls: 'KojoK8',
    hooks: {
      select_com: 'kojo_message_com_8',
      kojo_message_palamcng: 'kojo_message_palamcng_8',
      kojo_message_markcng: 'kojo_message_markcng_8',
      self_kojo: 'self_kojo_k8',
      dog_kojo: 'dog_kojo_8',
      colosseum_kojo: 'colosseum_kojo_8',
      benki_koujo: 'benki_koujo_k8',
      dungeon_victory: 'dungeon_victory_k8',
      dungeon_attack: 'dungeon_attack_k8',
      dungeon_ryouzyoku: 'dungeon_ryouzyoku_k8',
      dungeon_ryouzyoku_after: 'dungeon_ryouzyoku_after_k8',
      ntr_koujo: 'ntr_koujo_k8',
      exucution_koujo: 'exucution_koujo_k8',
      museum_koujo: 'museum_koujo_k8',
      banishment_koujo: 'banishment_koujo_k8',
      public_exucution_koujo: 'public_exucution_koujo_k8',
      grotesque_koujo: 'grotesque_koujo_k8',
      enterenemy_koujo: 'enterenemy_koujo_k8',
      gobi_koujo: 'gobi_koujo_k8',
    },
    adapters: {
      gohoubi_request_koujo: {
        body: 'gohoubi_request_koujo_k8',
        params: '',
        args: '',
      },
      gohoubi_after_koujo: {
        body: 'gohoubi_after_koujo_k8',
        params: 'cid, choice',
        args: 'undefined, cid, choice',
      },
      osioski_koujo: {
        body: 'osioki_koujo_k8',
        params: 'cid, choice',
        args: 'undefined, cid, choice',
      },
    },
    // DOG_KOJO_8 / COLOSSEUM_KOJO_8 没有注册（文件内直调）
    own_families: [
      'kojo_message_com_family',
      'kojo_message_palamcng_family',
      'kojo_message_markcng_family',
      'self_kojo_family',
      'ryouzyoku_kojo_family',
      'ryouzyoku_after_kojo_family',
      'dungeon_victory_family',
      'dungeon_attack_family',
      'benki_koujo_family',
      'ntr_koujo_family',
      'exucution_koujo_family',
      'museum_koujo_family',
      'banishment_koujo_family',
      'public_exucution_koujo_family',
      'grotesque_koujo_family',
      'enterenemy_koujo_family',
      'gohoubi_request_koujo_family',
      'gohoubi_after_koujo_family',
      'osioski_koujo_family',
      'gobi_koujo_family',
    ],
  },
  {
    id: 9,
    module: 'kojo/kojo-k9-diamond',
    cls: 'KojoK9',
    hooks: {
      select_com: 'kojo_message_com_9',
      kojo_message_palamcng: 'kojo_message_palamcng_9',
      kojo_message_markcng: 'kojo_message_markcng_9',
      self_kojo: 'self_kojo_k9',
      dog_kojo: 'dog_kojo_9',
      colosseum_kojo: 'colosseum_kojo_9',
      benki_koujo: 'benki_koujo_k9',
      dungeon_victory: 'dungeon_victory_k9',
      dungeon_attack: 'dungeon_attack_k9',
      dungeon_ryouzyoku: 'dungeon_ryouzyoku_k9',
      dungeon_ryouzyoku_after: 'dungeon_ryouzyoku_after_k9',
      ntr_koujo: 'ntr_koujo_k9',
      exucution_koujo: 'exucution_koujo_k9',
      museum_koujo: 'museum_koujo_k9',
      banishment_koujo: 'banishment_koujo_k9',
      public_exucution_koujo: 'public_exucution_koujo_k9',
      grotesque_koujo: 'grotesque_koujo_k9',
      enterenemy_koujo: 'enterenemy_koujo_k9',
      gobi_koujo: 'gobi_koujo_k9',
    },
    adapters: {
      gohoubi_request_koujo: {
        body: 'gohoubi_request_koujo_k9',
        params: '',
        args: '',
      },
      gohoubi_after_koujo: {
        body: 'gohoubi_after_koujo_k9',
        params: 'cid, choice',
        args: 'undefined, cid, choice',
      },
      osioski_koujo: {
        body: 'osioki_koujo_k9',
        params: 'cid, choice',
        args: 'undefined, cid, choice',
      },
    },
    // DOG_KOJO_9 / COLOSSEUM_KOJO_9 没有注册（文件内直调）
    own_families: [
      'kojo_message_com_family',
      'self_kojo_family',
      'kojo_message_palamcng_family',
      'kojo_message_markcng_family',
      'gohoubi_after_koujo_family',
      'osioski_koujo_family',
      'gohoubi_request_koujo_family',
      'ryouzyoku_kojo_family',
      'ryouzyoku_after_kojo_family',
      'gobi_koujo_family',
      'benki_koujo_family',
      'enterenemy_koujo_family',
      'dungeon_victory_family',
      'dungeon_attack_family',
      'ntr_koujo_family',
      'exucution_koujo_family',
      'museum_koujo_family',
      'banishment_koujo_family',
      'public_exucution_koujo_family',
      'grotesque_koujo_family',
    ],
  },
  {
    id: 10,
    module: 'kojo/kojo-k10-club',
    cls: 'KojoK10',
    hooks: {
      select_com: 'kojo_message_com_10',
      kojo_message_palamcng: 'kojo_message_palamcng_10',
      kojo_message_markcng: 'kojo_message_markcng_10',
      self_kojo: 'self_kojo_k10',
      dog_kojo: 'dog_kojo_10',
      colosseum_kojo: 'colosseum_kojo_10',
      benki_koujo: 'benki_koujo_k10',
      dungeon_victory: 'dungeon_victory_k10',
      dungeon_attack: 'dungeon_attack_k10',
      dungeon_ryouzyoku: 'dungeon_ryouzyoku_k10',
      dungeon_ryouzyoku_after: 'dungeon_ryouzyoku_after_k10',
      ntr_koujo: 'ntr_koujo_k10',
      exucution_koujo: 'exucution_koujo_k10',
      museum_koujo: 'museum_koujo_k10',
      banishment_koujo: 'banishment_koujo_k10',
      public_exucution_koujo: 'public_exucution_koujo_k10',
      grotesque_koujo: 'grotesque_koujo_k10',
      enterenemy_koujo: 'enterenemy_koujo_k10',
      gobi_koujo: 'gobi_koujo_k10',
    },
    adapters: {
      gohoubi_request_koujo: {
        body: 'gohoubi_request_koujo_k10',
        params: '',
        args: '',
      },
      gohoubi_after_koujo: {
        body: 'gohoubi_after_koujo_k10',
        params: 'cid, choice',
        args: 'undefined, cid, choice',
      },
      osioski_koujo: {
        body: 'osioki_koujo_k10',
        params: 'cid, choice',
        args: 'undefined, cid, choice',
      },
    },
    // DOG_KOJO_10 / COLOSSEUM_KOJO_10 没有注册（文件内直调）
    own_families: [
      'kojo_message_com_family',
      'self_kojo_family',
      'kojo_message_palamcng_family',
      'kojo_message_markcng_family',
      'gohoubi_after_koujo_family',
      'osioski_koujo_family',
      'gohoubi_request_koujo_family',
      'ryouzyoku_kojo_family',
      'ryouzyoku_after_kojo_family',
      'gobi_koujo_family',
      'benki_koujo_family',
      'enterenemy_koujo_family',
      'dungeon_victory_family',
      'dungeon_attack_family',
      'ntr_koujo_family',
      'exucution_koujo_family',
      'museum_koujo_family',
      'banishment_koujo_family',
      'public_exucution_koujo_family',
      'grotesque_koujo_family',
    ],
  },
];

/** 族名 → 定义它的模块（取实例用；其余族都在 kojo-system.js） */
const FAMILY_MODULE = {
  ryouzyoku_kojo_family: 'kojo/kojo-dungeon-ravish',
  ryouzyoku_after_kojo_family: 'kojo/kojo-dungeon-ravish',
  gohoubi_request_koujo_family: 'kojo/kojo-dungeon-after',
  gohoubi_after_koujo_family: 'kojo/kojo-dungeon-after',
  osioski_koujo_family: 'kojo/kojo-dungeon-after',
};

/** 族名（`x_family`）→ 钩子名：去掉 `_family` 与 `_kojo` / `_koujo` 的史拼差异 */
const HOOK_BY_FAMILY = {
  kojo_message_com_family: 'kojo_message_com',
  kojo_message_palamcng_family: 'kojo_message_palamcng',
  kojo_message_markcng_family: 'kojo_message_markcng',
  self_kojo_family: 'self_kojo',
  dog_kojo_family: 'dog_kojo',
  colosseum_kojo_family: 'colosseum_kojo',
  benki_koujo_family: 'benki_koujo',
  dungeon_victory_family: 'dungeon_victory',
  dungeon_attack_family: 'dungeon_attack',
  ryouzyoku_kojo_family: 'dungeon_ryouzyoku',
  ryouzyoku_after_kojo_family: 'dungeon_ryouzyoku_after',
  ntr_koujo_family: 'ntr_koujo',
  exucution_koujo_family: 'exucution_koujo',
  museum_koujo_family: 'museum_koujo',
  banishment_koujo_family: 'banishment_koujo',
  public_exucution_koujo_family: 'public_exucution_koujo',
  grotesque_koujo_family: 'grotesque_koujo',
  enterenemy_koujo_family: 'enterenemy_koujo',
  gohoubi_request_koujo_family: 'gohoubi_request_koujo',
  gohoubi_after_koujo_family: 'gohoubi_after_koujo',
  osioski_koujo_family: 'osioski_koujo',
  gobi_koujo_family: 'gobi_koujo',
};

/** 确定性随机源：恒 0（上界另有专测） */
const always = () => 0;

/**
 * 世界底座：玛奥（17）入列、口上总开关开、调教已开（SELF_KOJO 的检查会写
 * TFLAG:15，那张表只在调教期存在）。
 * @param {number} [cid=17] 目标角色号
 * @returns {object} 夹具
 */
function setup_kojo(cid = 17) {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, cid, '玛奥');
  fixture.era.beginTrain(0, cid);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = cid;
  era_flag.player = 0;
  era_flag.assi = -1;
  era_flag.assiplay = 0;
  era_flag.selectcom = 0;
  fixture.store.set('flag:7', 2);
  return fixture;
}

/**
 * 播种某性格：素质 160 + 编号 → 口上编号 100 + 编号（`get_kojo_num` 的规则），
 * 存在标志 FLAG:(100 + 编号)。
 * @param {object} fixture 夹具
 * @param {number} id 口上编号（= 分发键）
 * @param {number} [cid=17] 角色号
 */
function seed_kojo(fixture, id, cid = 17) {
  fixture.store.set(`talent:${cid}:${160 + id}`, 1);
  fixture.store.set(`flag:${100 + id}`, 1);
}

/** 取族实例（族住在三个模块里） */
function family_of(fixture, family_name) {
  return fixture.load_module(FAMILY_MODULE[family_name] ?? 'kojo/kojo-system')[
    family_name
  ];
}

/** 实参名 → 取值（驱动方的上下文） */
function arg_value(name, ctx) {
  switch (name) {
    case 'cid':
      return ctx.cid;
    case 'event_no':
      return 42;
    case 'choice':
      return 9;
    case 'arg0':
      return 2;
    case 'q':
      return 1;
    case 'rand':
      return ctx.rand;
    default:
      throw new Error(`表里出现未登记的实参名：${name}`);
  }
}

/**
 * 一处**不转发**的族注册：K7 的 osioski_koujo 注册的是本体本身。
 * 理由有二：osioki_koujo_k7 的形参 (cid, choice) 已经就是族的签名；更重要的是
 * 这个裸标识符是 `osioki_koujo_k` 这个史拼前缀在「有本体必有注册」扫描器里唯一
 * 的锚点（K2/K5/K6/K8 的本体同样是 osioki 拼写，扫描器靠它才数得到它们）。
 * 入口（osioski_koujo）与迁移前一样经 `run_kojo` → 工厂实例的钩子，不受影响。
 */
const BARE_REGISTERED = { 7: 'osioki_koujo_k7' };

/** 入口名 → 钩子名（分发表里的 entry 与基类方法名只在几处不同名） */
const HOOK_BY_ENTRY = {
  kojo_message_com: 'kojo_message_com',
  kojo_message_palamcng: 'kojo_message_palamcng',
  kojo_message_markcng: 'kojo_message_markcng',
  self_kojo: 'self_kojo',
  dungeon_ryouzyoku: 'dungeon_ryouzyoku',
  dungeon_ryouzyoku_after: 'dungeon_ryouzyoku_after',
  benki_koujo: 'benki_koujo',
  victory_koujo: 'dungeon_victory',
  attack_koujo: 'dungeon_attack',
  attack_koujo_b: 'dungeon_attack',
  ntr_koujo: 'ntr_koujo',
  exucution_koujo: 'exucution_koujo',
  museum_koujo: 'museum_koujo',
  banishment_koujo: 'banishment_koujo',
  public_exucution_koujo: 'public_exucution_koujo',
  grotesque_koujo: 'grotesque_koujo',
  enterenemy_koujo: 'enterenemy_koujo',
  gohoubi_request_koujo: 'gohoubi_request_koujo',
  gohoubi_after_koujo: 'gohoubi_after_koujo',
  osioski_koujo: 'osioski_koujo',
  gobi_koujo: 'gobi_koujo',
};

/** 入口的钩子实参（与迁移前族收到的一致，见 kojo-base.js 的钩子名单） */
const HOOK_ARGS = {
  kojo_message_com: (ctx) => [ctx.rand],
  kojo_message_palamcng: (ctx) => [ctx.rand],
  kojo_message_markcng: (ctx) => [ctx.rand],
  self_kojo: (ctx) => [ctx.rand, 1],
  benki_koujo: (ctx) => [ctx.rand],
  victory_koujo: (ctx) => [ctx.rand],
  attack_koujo: (ctx) => [ctx.rand],
  attack_koujo_b: (ctx) => [ctx.rand],
  ntr_koujo: (ctx) => [ctx.rand, 9],
  exucution_koujo: () => [42],
  museum_koujo: () => [42],
  banishment_koujo: () => [42],
  public_exucution_koujo: () => [42],
  grotesque_koujo: () => [42],
  enterenemy_koujo: (ctx) => [ctx.rand],
  gohoubi_request_koujo: () => [17],
  gohoubi_after_koujo: () => [17, 9],
  osioski_koujo: () => [17, 9],
  gobi_koujo: (ctx) => [2, ctx.rand],
  dungeon_ryouzyoku: () => [],
  dungeon_ryouzyoku_after: () => [],
};

/** 分发表（纯数据；独立夹具加载一次即可） */
function table_rows() {
  return create_era_fixture().load_module('kojo/kojo-system')
    .EVENT_K_DISPATCH_TABLE;
}

/**
 * 入口把钩子返回值交回调用方的那些；其余入口一律 return 0（TRYCALLFORM 的
 * RESULT 不读，这是各入口既有的契约，#854 起未变）。
 */
const VALUE_RETURNING = new Set([
  'kojo_message_palamcng',
  'kojo_message_markcng',
  'benki_koujo',
  'victory_koujo',
  'attack_koujo',
  'attack_koujo_b',
  'enterenemy_koujo',
  'gobi_koujo',
]);

/**
 * 读模块源码并去掉注释（类方法与注册行的静态核对用）。口上文件里的台词含
 * `//`，但都在字符串字面量里；注册行与类方法上不含字符串，粗剥即可。
 * @param {string} file 相对仓库根的路径
 * @returns {string} 源码
 */
function source_of(file) {
  return fs
    .readFileSync(path.join(REPO, file), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
}

/** 钩子方法 → 本体的转交形状：`async h(...) { return body(...); }` */
const DELEGATION_RE =
  /async (\w+)\(([^)]*)\) \{\n\s+return (\w+)\(([^)]*)\);\n\s+\}/g;

/** 某文件里所有一行转交方法（钩子名 → 本体与实参） */
function delegations_of(file) {
  const found = new Map();
  for (const m of source_of(file).matchAll(DELEGATION_RE)) {
    found.set(m[1], { params: m[2], body: m[3], args: m[4] });
  }
  return found;
}

// —— 静态：类与注册的唯一形状 ——

test('静态：五个性格的类都存在、继承基类、覆盖表里的每个钩子', () => {
  const fixture = create_era_fixture();
  const { KojoBase } = fixture.load_module('kojo/kojo-base');
  for (const item of CASES) {
    const mod = fixture.load_module(item.module);
    const Ctor = mod[item.cls];
    assert.equal(typeof Ctor, 'function', `${item.module} 未导出 ${item.cls}`);
    assert.ok(
      Ctor.prototype instanceof KojoBase,
      `${item.cls} 必须继承 KojoBase`,
    );
    // 钩子表里除 select_com 之外的方法都应覆盖（select_com 是模板方法的第二段）
    for (const hook of Object.keys(item.hooks)) {
      assert.notEqual(
        Ctor.prototype[hook],
        KojoBase.prototype[hook],
        `${item.cls} 应覆盖 ${hook}`,
      );
    }
    for (const hook of Object.keys(item.adapters)) {
      assert.notEqual(
        Ctor.prototype[hook],
        KojoBase.prototype[hook],
        `${item.cls} 应覆盖 ${hook}（实参适配的钩子）`,
      );
    }
    assert.equal(
      Ctor.prototype.kojo_message_com,
      KojoBase.prototype.kojo_message_com,
      `${item.cls} 不许覆盖模板方法（覆盖就绕开头部检查）`,
    );
  }
});

test('静态：每个钩子都是一行转交，转交的就是迁移前族注册的那个本体', () => {
  for (const item of CASES) {
    const found = delegations_of(`ere/${item.module}.js`);
    const expected = { ...item.hooks, ...item.adapters };
    for (const [hook, target] of Object.entries(expected)) {
      const body = typeof target === 'string' ? target : target.body;
      const hit = found.get(hook);
      assert.ok(
        hit,
        `${item.cls} 缺转交方法 ${hook}（形状须是 return 本体(…)）`,
      );
      assert.equal(hit.body, body, `${item.cls}.${hook} 应转交 ${body}`);
    }
    // 实参形状：原样透传的必须 ...args；三处适配器的实参表照搬迁移前的注册写法
    for (const [hook, target] of Object.entries(expected)) {
      const hit = found.get(hook);
      if (typeof target === 'string') {
        assert.equal(hit.params, '...args', `${item.cls}.${hook} 的形参`);
        assert.equal(
          hit.args,
          '...args',
          `${item.cls}.${hook} 的形参须原样透传（旧族注册的实参形状）`,
        );
      } else {
        assert.equal(hit.params, target.params, `${item.cls}.${hook} 的形参`);
        assert.equal(
          hit.args,
          target.args,
          `${item.cls}.${hook} 的实参表须与迁移前的注册适配器一致`,
        );
      }
    }
    // 转交方法数要正好等于表里的钩子数：多出来的转交没有被表登记过
    assert.equal(
      found.size,
      Object.keys(expected).length,
      `${item.cls} 的转交方法数与钩子表不符（漏登记或多出）`,
    );
  }
});

test('静态：族注册全部转发到工厂实例（一处例外见 BARE_REGISTERED）', () => {
  const FORWARD_RE =
    /(\w+_family)\.register\((\d+), \(\.\.\.args\) => kojo_k(\d+)\.(\w+)\(\.\.\.args\),? ?\)/g;
  for (const item of CASES) {
    const bare_body = BARE_REGISTERED[item.id] ?? null;
    const flat = source_of(`ere/${item.module}.js`).replace(/\s+/g, ' ');
    const calls = [...flat.matchAll(/(\w+_family)\.register\((\d+), /g)];
    assert.equal(
      calls.length,
      item.own_families.length,
      `${item.module} 的族注册数与表不符（漏注册或多注册）`,
    );
    const rows = [...flat.matchAll(FORWARD_RE)];
    const expected = item.own_families.filter(
      (family) => !(bare_body !== null && family === 'osioski_koujo_family'),
    );
    assert.equal(
      rows.length,
      expected.length,
      `${item.module} 有直挂本体（或别种转发形状）的族注册——` +
        '迁移后除 BARE_REGISTERED 登记的例外，每个 register 的第二参都必须是转发到工厂实例的闭包',
    );
    if (bare_body !== null) {
      // 例外：本体签名已合族契约，裸注册同时是 `osioki_koujo_k` 史拼前缀在
      // 「有本体必有注册」扫描器里的锚点（见文件注册处的注释）
      assert.ok(
        flat.includes(
          `osioski_koujo_family.register(${item.id}, ${bare_body});`,
        ),
        `${item.module} 的 osioski 例外应裸注册 ${bare_body}`,
      );
    }
    const by_name = (a, b) => a[0].localeCompare(b[0]);
    assert.deepEqual(
      rows.map((m) => [m[1], Number(m[2]), Number(m[3])]).sort(by_name),
      expected.map((family) => [family, item.id, item.id]).sort(by_name),
      `${item.module} 的族注册应逐个指向 kojo_k${item.id}`,
    );
    for (const m of rows) {
      assert.equal(
        m[4],
        HOOK_BY_FAMILY[m[1]],
        `${m[1]} 的转发应调 ${HOOK_BY_FAMILY[m[1]]}，实际 ${m[4]}`,
      );
    }
  }
});

// —— 运行期 · 工厂与族 ——

test('工厂：五个性格都按编号注册，实例类型正确', () => {
  const fixture = create_era_fixture();
  const { get_kojo } = fixture.load_module('kojo/kojo-factory');
  for (const item of CASES) {
    const mod = fixture.load_module(item.module);
    const instance = get_kojo(item.id);
    assert.ok(
      instance instanceof mod[item.cls],
      `kojo[${item.id}] 不是 ${item.cls}`,
    );
    assert.equal(instance.id, item.id);
  }
});

test('运行期：每个族的每个号都经工厂实例执行（逐个探针）', async () => {
  for (const item of CASES) {
    for (const family_name of item.own_families) {
      const fixture = setup_kojo();
      seed_kojo(fixture, item.id);
      fixture.load_module(item.module);
      const family = family_of(fixture, family_name);
      const { get_kojo } = fixture.load_module('kojo/kojo-factory');
      const instance = get_kojo(item.id);
      const hook = HOOK_BY_FAMILY[family_name];

      assert.equal(
        family.has(item.id),
        true,
        `${family_name}[${item.id}] 未注册（「有本体必有注册」契约）`,
      );
      if (
        BARE_REGISTERED[item.id] !== undefined &&
        family_name === 'osioski_koujo_family'
      ) {
        // 例外：注册的是本体本身（见 BARE_REGISTERED）。这里钉住它注册的
        // 确实是钩子转交的那个本体，两条路径同一份实现。
        assert.equal(
          family.implemented.get(item.id).name,
          BARE_REGISTERED[item.id],
          `${family_name}[${item.id}] 应裸注册 ${BARE_REGISTERED[item.id]}`,
        );
        assert.equal(
          HOOK_BY_FAMILY[family_name],
          'osioski_koujo',
          '族名与钩子名的对应没变',
        );
        continue;
      }
      const real = instance[hook];
      const seen = [];
      instance[hook] = (...args) => {
        seen.push(args);
        return 0;
      };
      try {
        assert.equal(await family.call(item.id, { args: [] }), 0);
      } finally {
        instance[hook] = real;
      }
      assert.equal(
        seen.length,
        1,
        `${family_name}[${item.id}] 没有转发到工厂实例的 ${hook}（迁回旧族直挂？）`,
      );
    }
  }
});

// —— 运行期 · 21 条分发入口 ——

test('入口：命中这五个性格的每条分发都走到工厂实例钩子', async () => {
  // 21 条入口 × 5 个性格：分发表是全库唯一的口上分发目录，逐条驱动
  for (const item of CASES) {
    for (const row of table_rows()) {
      const cid = 17;
      const rand = always;
      const fixture = setup_kojo(cid);
      seed_kojo(fixture, item.id, cid);
      const mod = fixture.load_module(row.module);
      fixture.load_module(item.module);
      const { get_kojo } = fixture.load_module('kojo/kojo-factory');
      const instance = get_kojo(item.id);
      const hook = HOOK_BY_ENTRY[row.entry];
      assert.ok(hook, `${row.entry} 没登记钩子名`);

      const seen = [];
      const real = instance[hook];
      instance[hook] = (...args) => {
        seen.push(args);
        return hook === 'gobi_koujo' ? '尾' : 7;
      };
      let result;
      try {
        fixture.set_inputs(...Array(4).fill(0));
        const ctx = { cid, rand };
        result = await mod[row.entry](
          ...row.call.map((name) => arg_value(name, ctx)),
        );
      } finally {
        instance[hook] = real;
      }

      assert.deepEqual(
        seen,
        [HOOK_ARGS[row.entry]({ cid, rand })],
        `${row.entry} 命中 K${item.id} 时应调实例的 ${hook}，实参与族一致`,
      );
      assert.equal(
        result,
        row.entry === 'gobi_koujo'
          ? '尾'
          : VALUE_RETURNING.has(row.entry)
            ? 7
            : 0,
        `${row.entry} 命中 K${item.id} 的返回值契约（语尾交回文字，其余恒 0）`,
      );
    }
  }
});

test('入口与实例钩子同文：同一状态下逐行一致（入口只剩总开关与存在判定）', async () => {
  for (const item of CASES) {
    const cid = 17;
    const rand = always;

    const via_entry = setup_kojo(cid);
    seed_kojo(via_entry, item.id, cid);
    via_entry.load_module(item.module);
    {
      const entry_mod = via_entry.load_module('kojo/kojo-system');
      await entry_mod.kojo_message_com(rand);
    }

    const via_hook = setup_kojo(cid);
    seed_kojo(via_hook, item.id, cid);
    via_hook.load_module(item.module);
    {
      const { get_kojo } = via_hook.load_module('kojo/kojo-factory');
      await get_kojo(item.id).select_com(rand);
    }

    assert.ok(
      via_entry.text_lines().length > 0,
      `K${item.id} 的指令口上经入口一句未出——钩子没接到本体`,
    );
    assert.deepEqual(
      via_entry.text_lines(),
      via_hook.text_lines(),
      `K${item.id}：入口路径与实例钩子路径的输出必须逐行一致`,
    );
    assert.equal(
      via_entry.store.get(`cflag:${cid}:301`),
      via_hook.store.get(`cflag:${cid}:301`),
      `K${item.id}：状态机推进两侧一致`,
    );
  }
});

// —— 与其它口上模块的接线 ——

test('主启动图装载后五个性格的实例都在工厂里（装配没有漏 require）', () => {
  const fixture = create_era_fixture();
  fixture.load_module('system/flow/main-loop');
  const { get_kojo } = fixture.load_module('kojo/kojo-factory');
  for (const item of CASES) {
    assert.ok(
      get_kojo(item.id) !== null,
      `主启动图没把 ${item.module} 装上——K${item.id} 的口上会整体回落旧族`,
    );
  }
  // register() 只是事件处理器，注册与否不影响工厂；这里顺带确认模块完整装载
  for (const item of CASES) {
    const mod = fixture.load_module(item.module);
    assert.equal(
      typeof mod.register,
      'function',
      `${item.module} 缺 register()`,
    );
    register_handlers(fixture, item.module);
  }
});
