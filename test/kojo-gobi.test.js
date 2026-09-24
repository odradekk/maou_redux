/**
 * @file 语尾口上（GOBI_KOUJO）的返回值契约（issue #570）。
 *
 * 原作 @GOBI_KOUJO_K{n} 用**不换行 PRINT** 把语尾写进调用方的当前行——
 * LOOK.ERB:875-878 的 `PRINTFORM 的%SAVESTR%` → `CALL GOBI_KOUJO` →
 * `PRINT 」` 在 Emuera 里是一行。ere 引擎一次 era.print 即一行（引擎源
 * `print(...e){…this.text("print",…e),this.addTotalLines()}`，见
 * page-shop-trap.js 头注的同一结论），「插入后再续写」没有对应形态，
 * #570 起真身改为**返回语尾文字**、由调用方拼进行内。本文件锁：
 *
 *   - 各档位（ARG:0 1-5）与默认三选一的**返回文字**逐字锁定（表驱动，
 *     全部 18 个真身；默认支用注入随机源钉住三选一）；
 *   - 真身不得有任何输出（era.print 一次即一行；行内拼接只能由调用方做）；
 *   - 分发入口 kojo-system.gobi_koujo 转交真身返回值；未命中（原作
 *     TRYCALLFORM 落空——如 K11 原作就没有语尾函数，两侧同缺）返回空串；
 *   - K3 形参序回归：#403 起真身签名 (rand, arg_0) 与族实参 [arg0, rand]
 *     反接，真调用即 TypeError（docs/stub-registry.md 曾登记该偏差，
 *     本票修正为 (arg_0, rand)）。
 *
 * 行内拼接的行为面（LOOK_INFO 的「」、迷宫凌辱的『猪…』）由
 * test/look.test.js 与 test/kojo-dungeon-ravish*.test.js 各自钉住。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

const KOJO_DIR = path.resolve(__dirname, '..', 'ere', 'kojo');

/** 装载全部口上模块（注册发生在模块加载期；漏一个族成员就分不到） */
function load_all_kojo(fixture) {
  for (const name of fs.readdirSync(KOJO_DIR)) {
    if (name.endsWith('.js')) {
      fixture.load_module(`kojo/${name.replace(/\.js$/, '')}`);
    }
  }
}

/**
 * RAND:N 定值序：draws 依次被消费，越界取模（同 kojo-dungeon-ravish-man.test）。
 * 默认支先掷 RAND:3 再掷 RAND:2：(0) → 第一支、(1,0) → 第二支、(1,1) → 第三支。
 */
const seq_rand =
  (...draws) =>
  (n) => {
    const value = draws.shift() ?? 0;
    return value % n;
  };

/**
 * 全部真身的期望表：键 = 族内编号，tiers = ARG:0 1-5 的返回文字，
 * defaults = 默认支（含 0 与越界档）三选一。K15（无随机）与 K19/K904
 * 的空语尾（源 PRINTFORM 空）按源逐字保留。
 */
const GOBI_TABLE = [
  {
    key: 0,
    file: 'kojo-k0-tender',
    tiers: ['♪', '！', '……。', '……。', '……呜呜。'],
    defaults: ['。', '哟。', '呢。'],
  },
  {
    key: 1,
    file: 'kojo-k1-confident',
    tiers: [
      '哎哟♪',
      '哎呦！',
      '哎……。',
      '哎哟……什么、不好！？',
      '这样的事……。',
    ],
    defaults: ['哈。', '哎呦。', '的哇。'],
  },
  {
    key: 2,
    file: 'kojo-k2-timid',
    tiers: ['啊～', '哟！', '啊……。', '啊啊……。', '呼……唔唔。'],
    defaults: ['唔。', '什么啊。', '什么啊。'],
  },
  {
    key: 3,
    file: 'kojo-k3-noble',
    tiers: ['的噢~♪', '的啊！', '来着……。', '来的……呢~。', '的噢……呜~。'],
    defaults: ['的说。', '噢。', '噢。'],
  },
  {
    key: 4,
    file: 'kojo-k4-stoic',
    tiers: ['哦～♪', '哦！', '啦……。', '吧……算是……。', '什么的……。'],
    defaults: ['呢。', '嘛。', '啦。'],
  },
  {
    key: 5,
    file: 'kojo-k5-mao',
    tiers: ['的噢~♪', '的啊！', '来着……。', '来的呢……。', '的啊……。'],
    defaults: ['来着。', '的啊。', '的噢。'],
  },
  {
    key: 6,
    file: 'kojo-k6-wicked',
    tiers: ['的哟♪', '啊！', '来着……。', '啦……。', '呢……。'],
    defaults: ['啊。', '呢。', '的说。'],
  },
  {
    key: 7,
    file: 'kojo-k7-heart',
    tiers: ['哇~♡', '什么啊！', '哦……。', '真是……唉。', '唉……。'],
    defaults: ['哦。', '啊。', '没办法了。'],
  },
  {
    key: 8,
    file: 'kojo-k8-spade',
    tiers: ['什么啊♪', '哼！', '唉……。', '嗯……。', '啊……啊……。'],
    defaults: ['啊。', '啊。', '什么啊。'],
  },
  {
    key: 9,
    file: 'kojo-k9-diamond',
    tiers: ['的噢♡', '来的哦！', '来的……。', '来的呢……。', '来的……呜呜。'],
    defaults: ['来的。', '来的哦。', '的噢~。'],
  },
  {
    key: 10,
    file: 'kojo-k10-club',
    tiers: ['所以呢♪', '哟！', '怎么这样……。', '……。', '……。'],
    defaults: ['。', '。', '。'],
  },
  {
    key: 12,
    file: 'kojo-k12-intellectual',
    tiers: ['的哟♪', '的呢！', '的哟……。', '的样子……呢。', '的哟……。'],
    defaults: ['的哟。', '的样子哦。', '什么的。'],
  },
  {
    key: 13,
    file: 'kojo-k13-protector',
    tiers: ['嗯♪', '哦！', '是的……。', '……。', '就是这样……。'],
    defaults: ['嗯。', '呢。', '呀。'],
  },
  {
    key: 14,
    file: 'kojo-k14-nobleman',
    tiers: ['哦~♪', '哦！', '啦……。', '什么的……。', '什么啊……。'],
    defaults: ['啦。', '嘛。', '的啦。'],
  },
  {
    key: 15,
    file: 'kojo-k15-clever',
    tiers: ['♪', '！', '……。', '……。', '……。'],
    defaults: ['。'],
  },
  {
    key: 19,
    file: 'kojo-k19-fia',
    tiers: [
      '，诶嘿嘿～♪',
      '，呜～～我要咬人了的说～～',
      '哈呜呜……',
      '呜……\\/\\/\\/\\/',
      '',
    ],
    defaults: ['', '', ''],
  },
  {
    key: 903,
    file: 'kojo-k903-garde',
    tiers: ['哦～♪', '哦！', '啦……。', '吧……算是……。', '什么的……。'],
    defaults: ['呢。', '嘛。', '啦。'],
  },
  {
    key: 904,
    file: 'kojo-k904-fia',
    tiers: [
      '，诶嘿嘿～♪',
      '，呜～～我要咬人了的说～～',
      '哈呜呜……',
      '呜……\\/\\/\\/\\/',
      '',
    ],
    defaults: ['', '', ''],
  },
];

test('GOBI 真身：五档与默认三选一逐字返回（表驱动，18 真身）', async () => {
  const fixture = create_era_fixture();
  load_all_kojo(fixture);
  const { gobi_koujo_family } = fixture.load_module('kojo/kojo-system');

  for (const row of GOBI_TABLE) {
    // 五档：ARG:0 1-5 各返回固定文字
    for (let tier = 1; tier <= 5; tier += 1) {
      const text = await gobi_koujo_family.call(row.key, { args: [tier] });
      assert.equal(text, row.tiers[tier - 1], `K${row.key} ARG:0 == ${tier}`);
    }
    // 默认支（ARG:0 == 0）：三选一按注入随机源落位；K15 无随机只有一支
    for (const [draws, expected] of [
      [[0], row.defaults[0]],
      [[1, 0], row.defaults[1]],
      [[1, 1], row.defaults[2]],
    ]) {
      if (expected === undefined) continue;
      const text = await gobi_koujo_family.call(row.key, {
        args: [0, seq_rand(...draws)],
      });
      assert.equal(
        text,
        expected,
        `K${row.key} 默认支 ${JSON.stringify(draws)}`,
      );
    }
    // 越界档（99）与 0 同走默认支（源 else 兜底）
    const oob = await gobi_koujo_family.call(row.key, {
      args: [99, seq_rand(0)],
    });
    assert.equal(oob, row.defaults[0], `K${row.key} ARG:0 越界走默认支`);
  }
});

test('GOBI 真身不打印：返回文字之外不得有任何输出（行内拼接由调用方做）', async () => {
  const fixture = create_era_fixture();
  load_all_kojo(fixture);
  const { gobi_koujo_family } = fixture.load_module('kojo/kojo-system');
  for (const row of GOBI_TABLE) {
    for (let tier = 0; tier <= 5; tier += 1) {
      await gobi_koujo_family.call(row.key, { args: [tier, seq_rand(0)] });
    }
  }
  assert.deepEqual(
    fixture.text_lines(),
    [],
    'era.print 一次即一行；真身自行打印就会多出一行（#570 的原始症状）',
  );
});

test('GOBI 分发入口：kojo-system.gobi_koujo 转交真身返回值', async () => {
  const fixture = create_era_fixture();
  load_all_kojo(fixture);
  const { gobi_koujo } = fixture.load_module('kojo/kojo-system');
  const era_flag = fixture.load_module('era-utils/era-flag');
  fixture.seed_chara(31, { id: 31, name: '勇者', callname: '勇者' });
  fixture.era.addCharacter(31);
  era_flag.target = 31; // @GOBI_KOUJO 无参 TARGET 换手，读当前 TARGET
  fixture.store.set('talent:31:164', 1); // K4 冷徹（COUNT 164 − 60 = 104 → 族内 4）
  assert.equal(await gobi_koujo(4), '吧……算是……。', '转交 K4 害羞档');
  assert.equal(
    await gobi_koujo(0, seq_rand(0)),
    '呢。',
    '随机源透传到真身（默认支首项）',
  );
});

test('GOBI 未命中返回空串：K11 原作就没有语尾函数（两侧同缺，行照常结束）', async () => {
  const fixture = create_era_fixture();
  load_all_kojo(fixture);
  const { gobi_koujo } = fixture.load_module('kojo/kojo-system');
  const era_flag = fixture.load_module('era-utils/era-flag');
  fixture.seed_chara(31, { id: 31, name: '温妮', callname: '温妮' });
  fixture.era.addCharacter(31);
  era_flag.target = 31;
  fixture.store.set('talent:31:171', 1); // K11（COUNT 171 − 60 = 111 → 族内 11）
  assert.equal(
    await gobi_koujo(1),
    '',
    '族内缺号（原作同样没有）→ 空串，不是 0 也不是占位行',
  );
  assert.deepEqual(fixture.text_lines(), [], '落空不得输出任何内容');

  // 窗口外（target 无口上性格 → GET_KOJO_NUM = 0）同样空串
  fixture.seed_chara(0, { id: 0, name: '魔王', callname: '魔王' });
  fixture.era.addCharacter(0);
  era_flag.target = 0;
  assert.equal(await gobi_koujo(1), '', '窗口外（魔王无性格）同样空串');
});

test('GOBI K3 形参序回归：族实参 [arg0, rand] 不再反接（#403 登记的偏差）', async () => {
  const fixture = create_era_fixture();
  load_all_kojo(fixture);
  const { gobi_koujo_family } = fixture.load_module('kojo/kojo-system');
  // 反接形态（rand 收到数字 1）会在默认支把 rand_n(3) 调成 TypeError；
  // 五档文字逐字对上即证明 arg0 落在首位
  for (const [tier, expected] of [
    [1, '的噢~♪'],
    [2, '的啊！'],
    [3, '来着……。'],
    [4, '来的……呢~。'],
    [5, '的噢……呜~。'],
  ]) {
    const text = await gobi_koujo_family.call(3, { args: [tier, seq_rand(0)] });
    assert.equal(text, expected, `K3 ARG:0 == ${tier}`);
  }
  const def = await gobi_koujo_family.call(3, { args: [0, seq_rand(0)] });
  assert.equal(def, '的说。', 'K3 默认支（随机源可用，不再把数字当函数）');
});
