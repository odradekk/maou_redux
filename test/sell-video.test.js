'use strict';
/**
 * 售出调教录像与水晶录像书架的行为测试（issue #336）。
 *
 * 测试注入点：ere/system/stronghold/sell-video.js 的七个领域入口。只通过
 * era-fixture 观察存档变量、资金与玩家可见输出，不碰模块内部辅助函数。
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');
const { join_slave_chara, preset_chara_0 } = require('./helpers/chara');

function seed_world() {
  const fixture = create_era_fixture();
  preset_chara_0(fixture);
  fixture.era.addCharacter(0);
  join_slave_chara(fixture, 31, '温妮');
  fixture.era.beginTrain(0, 31);
  const era_flag = fixture.load_module('era-utils/era-flag');
  era_flag.target = 31;
  era_flag.assi = 0;
  return {
    fixture,
    video: fixture.load_module('system/stronghold/sell-video'),
  };
}

test('录像书架：备份写首个空位，计数并按每页三列显示', () => {
  const { fixture, video } = seed_world();
  fixture.store.set('videoarchive:0', '旧片');
  fixture.store.set('cstr:31:6', '新片');

  video.video_backup(31);

  assert.equal(fixture.store.get('videoarchive:0'), '旧片');
  assert.equal(fixture.store.get('videoarchive:1'), '新片');
  assert.equal(video.video_check(), 2);
  video.video_shelf(0, 1, 0);
  assert.deepEqual(fixture.text_lines(), ['《旧片》', '《新片》']);
  assert.deepEqual(
    fixture.lines.map(({ grid_width, row }) => ({ grid_width, row })),
    [
      { grid_width: 8, row: 0 },
      { grid_width: 8, row: 0 },
    ],
    '录像书架按 8/24 宽度把三个片名排在同一行',
  );

  const table = fs.readFileSync(
    path.resolve(__dirname, '..', 'yml', 'VideoArchive.yml'),
    'utf8',
  );
  assert.match(table, /SUISEI_STR/);
  assert.deepEqual(
    table
      .split(/\r?\n/)
      .filter((line) => line.trim() && !line.trimStart().startsWith('#')),
    [],
    '录像书架必须保持空表，不预填字符串槽',
  );
});

test('VIDEO_MATURO 两入口：开关开启才入库，始终清空 TSTR:30 且不输出', () => {
  const off = seed_world();
  off.fixture.store.set('tstr:30', '处刑记录');
  off.video.video_maturo(31);
  assert.equal(
    off.fixture.store.get('videoarchive:0'),
    undefined,
    '关闭时不入库',
  );
  assert.equal(off.fixture.store.get('tstr:30'), '', '关闭时也清暂存');
  assert.deepEqual(off.fixture.text_lines(), [], '原作不打印任何东西');

  const on = seed_world();
  on.fixture.store.set('exflag:9000', 4); // GETBIT(EX_FLAG:9000, 2)
  on.fixture.store.set('videoarchive:0', '旧片');
  on.fixture.store.set('tstr:30', '处刑记录');
  on.video.video_maturo2(31);
  assert.equal(on.fixture.store.get('videoarchive:1'), '处刑记录');
  assert.equal(
    on.fixture.store.get('exflag:9010'),
    1,
    '普通角色增加水晶球库存',
  );
  assert.equal(on.fixture.store.get('tstr:30'), '');

  on.fixture.store.set('talent:31:220', 1);
  on.fixture.store.set('tstr:30', '无库存记录');
  on.video.video_maturo(31);
  assert.equal(on.fixture.store.get('videoarchive:2'), '无库存记录');
  assert.equal(on.fixture.store.get('exflag:9010'), 1, 'TALENT:220 不增加库存');

  on.fixture.store.set('talent:31:220', 0);
  on.fixture.store.set('ex_talent:31:2', 1);
  on.fixture.store.set('tstr:30', '扩展素质记录');
  on.video.video_maturo(31);
  assert.equal(on.fixture.store.get('videoarchive:3'), '扩展素质记录');
  assert.equal(
    on.fixture.store.get('exflag:9010'),
    1,
    'EX_TALENT:2 不增加库存',
  );

  const full = seed_world();
  full.fixture.store.set('exflag:9000', 4);
  full.fixture.store.set('exflag:9010', 9);
  full.fixture.store.set('tstr:30', '放不下的记录');
  for (let index = 0; index < 20000; index += 1) {
    full.fixture.store.set(`videoarchive:${index}`, `片${index}`);
  }
  full.video.video_maturo(31);
  assert.equal(full.fixture.store.get('exflag:9010'), 9, '书架满时不增加库存');
  assert.equal(full.fixture.store.get('tstr:30'), '', '书架满时仍清暂存');
});

test('EVENT_VIDEO_DAY：公开录像按价值与狂热度结算浏览、粉丝和双资金账', async () => {
  const { fixture, video } = seed_world();
  fixture.store.set('cflag:31:497', 1); // 公开视频
  fixture.store.set('cflag:31:493', 1000); // 上次录像价值
  fixture.store.set('cflag:31:494', 20); // 狂热度
  fixture.store.set('cflag:31:495', 7); // 累计浏览
  fixture.store.set('cflag:31:496', 3); // 累计粉丝
  fixture.store.set('cstr:31:6', '温妮的调教');
  fixture.store.set('flag:10004', 10);
  fixture.store.set('exflag:4444', 10);
  fixture.override_math_random(() => 0.99); // RAND:2 = 1
  try {
    await video.event_video_day(31);
  } finally {
    fixture.restore_math_random();
  }

  // VIEW: 1000/10=100 → 狂热 20：100*80/100+1=81
  // FAV: (81/100 + 1) * (20/2 + 1) = 11
  assert.equal(fixture.store.get('cflag:31:495'), 88);
  assert.equal(fixture.store.get('cflag:31:496'), 14);
  assert.equal(fixture.store.get('flag:10004'), 91);
  assert.equal(fixture.store.get('exflag:4444'), 91);
  assert.deepEqual(fixture.text_lines(), [
    '录制于水晶中的「温妮的调教」在黑市上流通了起来……',
    '收到了81点金钱，并收到了11封粉丝信。',
  ]);
});

test('EVENT_VIDEO_DAY：空标题仍累计浏览与粉丝，但不输出也不发钱', async () => {
  const { fixture, video } = seed_world();
  fixture.store.set('cflag:31:497', 1);
  fixture.store.set('cflag:31:493', 1000);
  fixture.override_math_random(() => 0);
  try {
    await video.event_video_day(31);
  } finally {
    fixture.restore_math_random();
  }
  assert.equal(fixture.store.get('cflag:31:495'), 100);
  assert.equal(fixture.store.get('cflag:31:496'), 1);
  assert.equal(fixture.store.get('flag:10004'), undefined);
  assert.deepEqual(fixture.text_lines(), []);
});

test('SELL_VIDEO：消费有效录像，按内容、拍摄技能与境遇生成片名并同步入账', async () => {
  const { fixture, video } = seed_world();
  fixture.store.set('tequip:31:53', 1); // 录像仍在拍摄
  fixture.store.set('item:28', 2); // 水晶球魔力源
  fixture.store.set('cflag:31:491', 2); // 结束计数后剩一帧
  fixture.store.set('cflag:31:460', 0); // 爱抚
  fixture.store.set('abl:31:70', 2); // 被摄技能 ×1.00
  fixture.store.set('talent:31:140', 1); // 母控标题只追加一次
  fixture.store.set('flag:10004', 100);
  fixture.store.set('exflag:4444', 100);

  await video.sell_video(31, 0);

  assert.equal(fixture.store.get('item:28'), 1, '拍摄中到结算点先扣一份魔力源');
  assert.equal(fixture.store.get('cflag:31:491'), 0, '结算后清录像帧');
  assert.equal(fixture.store.get('cflag:31:493'), 50, '记录本次录像价值');
  assert.equal(fixture.store.get('cflag:31:498'), -1, '录像属性为不纯');
  assert.equal(fixture.store.get('cstr:31:6'), '母控奴隶的调教');
  assert.equal(fixture.store.get('videoarchive:0'), '母控奴隶的调教');
  assert.equal(fixture.store.get('flag:10004'), 150);
  assert.equal(fixture.store.get('exflag:4444'), 150);
  assert.equal(fixture.store.get('exflag:9010'), 1);
  assert.deepEqual(fixture.text_lines(), [
    '调教时的视频有着50点的观赏价值。',
    '卖录像的50点到手了。',
  ]);
});

test('SELL_VIDEO：装备开关会影响后一帧，自慰分支沿录像次序结算', async () => {
  const { fixture, video } = seed_world();
  fixture.store.set('cflag:31:491', 3);
  fixture.store.set('cflag:31:460', 11); // 开振动棒：300
  fixture.store.set('cflag:31:461', 3); // 振动棒自慰：1000
  fixture.store.set('abl:31:70', 2); // ×1.00

  await video.sell_video(31, 0);

  assert.equal(fixture.store.get('cflag:31:493'), 1300);
  assert.equal(fixture.store.get('cstr:31:6'), '奴隶的子宫口蹂躏调教');
});

test('SELL_VIDEO：内容能力的四档倍率逐档生效，助手编码不改变低三位指令', async () => {
  for (const [level, expected] of [
    [0, 800],
    [1, 880],
    [3, 960],
    [6, 1200],
  ]) {
    const { fixture, video } = seed_world();
    fixture.store.set('cflag:31:491', 2);
    fixture.store.set('cflag:31:460', 1020); // 女性助手编码 + 正常位 20
    fixture.store.set('abl:31:30', level);
    fixture.store.set('abl:31:70', 2);
    await video.sell_video(31, 0);
    assert.equal(
      fixture.store.get('cflag:31:493'),
      expected,
      `ABL:30 等级 ${level}`,
    );
  }
});

test('SELL_VIDEO：全部录像指令的单帧基础价值与原作分支一致', async () => {
  const expected_scores = [
    [0, 50],
    [1, 50],
    [2, 100],
    [3, 500],
    [4, 200],
    [5, 100],
    [6, 100],
    [7, 300],
    [8, 150],
    [9, 150],
    [10, 250],
    [11, 300],
    [12, 300],
    [13, 700],
    [14, 150],
    [15, 150],
    [16, 500],
    [17, 100],
    [18, 100],
    [19, 700],
    [20, 800],
    [21, 1300],
    [22, 700],
    [23, 1500],
    [26, 1000],
    [27, 1500],
    [28, 900],
    [29, 1700],
    [30, 300],
    [31, 500],
    [32, 650],
    [33, 770],
    [34, 1700],
    [36, 1700],
    [38, 550],
    [40, 250],
    [41, 450],
    [42, 700],
    [43, 150],
    [44, 500],
    [45, 100],
    [46, 0],
    [50, 100],
    [54, 500],
    [56, 10],
    [58, 0],
    [59, 0],
    [60, 100],
    [61, 250],
    [62, 800],
    [63, 1000],
    [64, 3000],
    [65, 1200],
    [66, 800],
    [68, 800],
    [69, 600],
    [70, 1200],
    [71, 1300],
    [80, 1000],
    [81, 2000],
    [82, 2500],
    [83, 3000],
    [85, 500],
    [86, 600],
    [89, 0],
    [90, 900],
    [100, 100],
    [101, 800],
    [102, 1000],
    [103, 300],
    [104, 300],
    [105, 1000],
    [106, 800],
    [107, 1500],
    [108, 800],
    [109, 1000],
    [120, 1200],
    [121, 1400],
    [122, 200],
    [123, 700],
    [124, 750],
    [125, 800],
    [126, 600],
    [127, 800],
    [128, 800],
    [129, 900],
    [130, 1000],
    [131, 1300],
    [132, 1400],
    [133, 1500],
    [134, 1500],
  ];
  const { fixture, video } = seed_world();
  fixture.store.set('abl:31:70', 2); // 被摄技能 ×1.00

  for (const [command, expected] of expected_scores) {
    fixture.store.set('cflag:31:491', 2);
    fixture.store.set('cflag:31:460', command);
    fixture.store.set('cflag:31:493', 0);
    await video.sell_video(31, 0);
    assert.equal(
      fixture.store.get('cflag:31:493'),
      expected,
      `指令 ${command} 的基础价值`,
    );
  }
});

test('SELL_VIDEO：每个指令的内容能力索引均作用于对应帧', async () => {
  const command_groups = new Map([
    [17, [7, 54, 85, 86]],
    [20, [38]],
    [21, [40, 41, 42, 44, 81, 82, 83]],
    [
      30,
      [
        20, 21, 22, 23, 26, 27, 28, 29, 34, 36, 120, 121, 128, 129, 130, 131,
        132, 133, 134,
      ],
    ],
    [31, [3]],
    [32, [4, 30, 31, 32, 33, 66, 68, 69, 80, 122, 123, 124, 125, 126, 127]],
    [33, [60, 61, 63, 65]],
    [35, [90]],
  ]);

  for (const [ability, commands] of command_groups) {
    for (const command of commands) {
      const base = seed_world();
      base.fixture.store.set('cflag:31:491', 2);
      base.fixture.store.set('cflag:31:460', command);
      base.fixture.store.set('abl:31:70', 2);
      await base.video.sell_video(31, 0);
      const base_score = base.fixture.store.get('cflag:31:493');

      const boosted = seed_world();
      boosted.fixture.store.set('cflag:31:491', 2);
      boosted.fixture.store.set('cflag:31:460', command);
      boosted.fixture.store.set(`abl:31:${ability}`, 1);
      boosted.fixture.store.set('abl:31:70', 2);
      await boosted.video.sell_video(31, 0);
      assert.equal(
        boosted.fixture.store.get('cflag:31:493'),
        Math.trunc(base_score * 1.1),
        `指令 ${command} 由 ABL:${ability} 加成`,
      );
    }
  }

  for (const level of [0, 1]) {
    const beast = seed_world();
    beast.fixture.store.set('cflag:31:491', 3);
    beast.fixture.store.set('cflag:31:460', 89);
    beast.fixture.store.set('cflag:31:461', 0);
    beast.fixture.store.set('abl:31:39', level);
    beast.fixture.store.set('abl:31:70', 2);
    await beast.video.sell_video(31, 0);
    assert.equal(
      beast.fixture.store.get('cflag:31:493'),
      level === 0 ? 50 : 55,
      `兽奸持续装备由 ABL:39 加成（等级 ${level}）`,
    );
  }
});

test('SELL_VIDEO：部位、内容、倾向与特殊题材均进入最终片名', async () => {
  const cases = [
    [[0, 0, 0, 0], '奴隶的阴蒂蹂躏调教'],
    [[5, 5, 5, 5], '奴隶的乳房蹂躏调教'],
    [[9, 9, 9, 9], '奴隶的肛门调教'],
    [[6, 6, 6, 6], '抖S奴隶的调教'],
    [[38, 38, 38, 38], '抖M奴隶的调教'],
    [[17, 17, 17, 17], '奴隶的扶她阴蒂蹂躏自慰'],
    [[61, 61, 61, 61], '抖S奴隶的乱交性交'],
    [[63, 63, 63, 63], '奴隶的百合阴蒂蹂躏调教'],
    [[106], '奴隶的紧缚调教'],
    [[54], '奴隶的野外调教'],
    [[89, 0, 0, 0, 0], '奴隶的兽奸阴蒂蹂躏调教'],
  ];

  for (const [commands, expected_title] of cases) {
    const { fixture, video } = seed_world();
    fixture.store.set('cflag:31:491', commands.length + 1);
    commands.forEach((command, index) => {
      fixture.store.set(`cflag:31:${460 + index}`, command);
    });
    fixture.store.set('abl:31:70', 2);
    fixture.override_math_random(() => 0);
    try {
      await video.sell_video(31, 0);
    } finally {
      fixture.restore_math_random();
    }
    assert.equal(
      fixture.store.get('cstr:31:6'),
      expected_title,
      `指令序列 ${commands.join('/')}`,
    );
  }
});

test('SELL_VIDEO：处女片段、逐步 TIMES 与助手剪辑均在最终价值中生效', async () => {
  const { fixture, video } = seed_world();
  join_slave_chara(fixture, 32, '助手');
  fixture.store.set('cflag:31:491', 3);
  fixture.store.set('cflag:31:460', 20);
  fixture.store.set('cflag:31:461', 20);
  fixture.store.set('tflag:32', 3); // 处女丧失 + 自我介绍
  fixture.store.set('expname:50', '异常经验');
  fixture.store.set('abl:31:15', 2); // 自我介绍 ×1.05
  fixture.store.set('talent:31:0', 1); // ×1.20
  fixture.store.set('talent:31:35', 1); // ×1.10
  fixture.store.set('abl:31:30', 6); // 两帧各自 ×1.50
  fixture.store.set('abl:31:70', 5); // 总价 ×1.50
  fixture.store.set('abl:32:15', 2); // 剪辑 +10%

  await video.sell_video(31, 32);

  assert.equal(fixture.store.get('exp:31:50'), 1);
  assert.equal(fixture.store.get('cflag:31:493'), 16922);
  assert.equal(fixture.store.get('cstr:31:6'), '奴隶的子宫口蹂躏性交');
  assert.deepEqual(fixture.text_lines(), [
    '影像中记录了温妮丧失处女的画面',
    '异常经验＋１',
    '调教时的视频有着15384点的观赏价值。',
    '助手的巧妙的编辑，令视频价值提高了1538点。',
    '卖录像的16922点到手了。',
  ]);
});

test('SELL_VIDEO：无有效帧时在减计数后早退，不画线也不等待', async () => {
  const { fixture, video } = seed_world();
  fixture.store.set('cflag:31:491', 1);
  fixture.store.set('item:28', 3);
  fixture.store.set('tequip:31:53', 1);

  await video.sell_video(31, 0);

  assert.equal(fixture.store.get('item:28'), 2);
  assert.equal(fixture.store.get('cflag:31:491'), 0);
  assert.deepEqual(fixture.lines, []);
  assert.equal(fixture.waits.length, 0);
});

test('SELL_VIDEO：EX_TALENT:1 只豁免出售录像的水晶球库存', async () => {
  const { fixture, video } = seed_world();
  fixture.store.set('cflag:31:491', 2);
  fixture.store.set('cflag:31:460', 0);
  fixture.store.set('abl:31:70', 2);
  fixture.store.set('ex_talent:31:1', 1);

  await video.sell_video(31, 0);

  assert.equal(
    fixture.store.get('exflag:9010'),
    undefined,
    'EX_TALENT:1 不增加库存',
  );
  assert.equal(
    fixture.store.get('videoarchive:0'),
    '奴隶的调教',
    '仍会备份录像',
  );
});
