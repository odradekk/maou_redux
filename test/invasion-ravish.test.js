/**
 * ere/invasion/invasion-ravish.js 的行为测试（issue #470，Q13
 * 侵略残余·3）。
 *
 * 源: target/ERB/侵略/INVASION_RYOUZYOKU.ERB 的 @INVASION_RYOUZYOKU（:1-66）
 * 与 12 个战场旁白函数（:71-782）。整份模块无状态、只输出，所以测试分两层：
 *
 *   1. 分发层（:13-64）：三列各抽一个怪物（X = (RAND:9+1)*10+100+RAND:5）、
 *      MONSTER_DATA 写列、按凌辱类型（E:列头+7）调旁白、每列末尾一行空行。
 *      怪物 110 = 兽人（凌辱类型 1，ere/data/monster-database.js 的 @ORC），
 *      用 knob 把 X 定到 110、item:110 置 1 只，即可让三列都走 @ORC_INV。
 *   2. 旁白层：12 个函数各自「战场表 5 档 + ELSE」× 「随机分支 × 侵攻点
 *      门槛」。战场表用 ELSE 臂的探针行逐个断言（area 1-5 与 6 的回落），
 *      随机分支与嵌套门槛用表驱动逐条给值。
 *
 * knob 缺省返回 1：所有 `== 0` 的守卫都不命中、`> N` 门槛一律要显式给点。
 *
 * **战场表是手抄的**：#470 独立审查抓到一处「龙族女神官 → 龙族神官」的抄漏，
 * 而期望值也手抄同一份、两侧同步错，测试照样绿。加称呼表或改表时，逐字对着
 * `target/ERB/侵略/INVASION_RYOUZYOKU.ERB` 的 `LOCALS:n = …` 行核一遍
 * （`Select-String -Pattern 'LOCALS:2 = '` 之类），别信这份镜像。
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { create_era_fixture } = require('./helpers/era-fixture');

/** 按上界取值的确定性随机源（缺省 1 = 所有 `RAND:N == 0` 守卫不命中） */
function knob(overrides = {}) {
  return (n) => {
    const value = overrides[n] ?? 1;
    assert(value >= 0 && value < n, `随机值 ${value} 不在 RAND:${n} 范围内`);
    return value;
  };
}

/** 旁白函数的一次调用：预置输入后取该次新增的文本行 */
async function run_plain(fixture, name, area, point, rand) {
  const mod = fixture.load_module('invasion/invasion-ravish');
  await mod[name](area, point, rand);
  return fixture.text_lines();
}

// —— 1. 分发层 ——

test('分发：三列各抽一怪、写 E: 列、按凌辱类型调旁白、列间空行', async () => {
  const fixture = create_era_fixture();
  fixture.store.set('item:110', 1); // 兽人（110-199 段的第一个），持有 1 只
  fixture.store.set('itemname:110', '兽人');
  const mod = fixture.load_module('invasion/invasion-ravish');
  const r = await mod.invasion_ryouzyoku(1, 0, knob({ 9: 0, 5: 0 }));
  assert.equal(r, 0, '原作 :66 RETURN 0');

  // X = (RAND:9 + 1) * 10 + 100 + RAND:5 = 110 → 三列同怪
  for (const top of [0, 100, 200]) {
    assert.equal(fixture.store.get(`e:${top + 7}`), 1, `${top} 列凌辱类型 1`);
    assert.equal(fixture.store.get(`e:${top + 99}`), 1, `${top} 列怪物数 1`);
    assert.equal(fixture.store.get(`e:${top}`), 110, `${top} 列怪物番号`);
  }
  const texts = fixture.text_lines();
  assert.equal(
    texts.filter((line) => line === '兽人的凌辱开始了。').length,
    3,
    '%ITEMNAME:ID%的凌辱开始了。每列一次（:24）',
  );
  // 侵攻点 0 → 兽人的第一臂（sinkou > 1）不走，knob 又让其余守卫全落空 → ELSE
  assert(
    texts.includes('「新人，就在里面！」'),
    '凌辱类型 1 → @ORC_INV（:26-28）',
  );
  assert.equal(
    texts.filter((line) => line === '').length,
    3,
    ':63 PRINTL 每列一行空行',
  );
});

test('分发：该列无怪（数量 0）时凌辱类型就地清零，不打印也不调旁白', async () => {
  const fixture = create_era_fixture();
  // 不持有 110 → MONSTER_DATA 的「全滅」早退把它换成 190 骷髅（凌辱类型 0）
  const mod = fixture.load_module('invasion/invasion-ravish');
  const r = await mod.invasion_ryouzyoku(1, 0, knob({ 9: 0, 5: 0 }));
  assert.equal(r, 0);
  assert.equal(fixture.store.get('e:7') ?? 0, 0, '骷髅的凌辱类型是 0');
  const texts = fixture.text_lines();
  assert(
    !texts.some((line) => line.endsWith('的凌辱开始了。')),
    '类型 0 不打「的凌辱开始了」',
  );
  assert(!texts.includes('「新人，就在里面！」'), '也不调任何旁白');
});

test('分发：侵攻点 ÷5000 归一（:10）——门槛按归一后的档位开合', async () => {
  const make = () => {
    const fixture = create_era_fixture();
    fixture.store.set('item:110', 1);
    fixture.store.set('itemname:110', '兽人');
    return fixture;
  };
  const arm_line = '被亚人群所包围的女骑士的部队、被迫做出了决断';

  // 10000 / 5000 = 2 > 1 → 兽人第一臂
  const yes = make();
  await yes
    .load_module('invasion/invasion-ravish')
    .invasion_ryouzyoku(1, 10000, knob({ 9: 0, 5: 0 }));
  assert(yes.text_lines().includes(arm_line), '10000 → 2 档，跨过 > 1');

  // 4999 / 5000 = 0（整数除算）→ 档位不到，第一臂不走
  const no = make();
  await no
    .load_module('invasion/invasion-ravish')
    .invasion_ryouzyoku(1, 4999, knob({ 9: 0, 5: 0 }));
  assert(!no.text_lines().includes(arm_line), '4999 → 0 档');
  assert(no.text_lines().includes('「新人，就在里面！」'), '落 ELSE 臂');
});

// —— 2. 旁白层的战场表（5 档 + ELSE 回落）——

/**
 * 战场表（`{ area: [名字表] }`）连同各自的探针行。area 6 = ELSE 回落的期望值。
 * 探针只够得着表里一个字母，所以另有一条「逐格」用例拿 BRANCH_KNOBS 跑遍
 * 各分支、把每一格都点名（#470 审查抓到的抄漏正落在探针够不着的格上）。
 */
const AREA_PROBES = [
  // [函数名, 探针行（名字数组 → 期望行）, { area: [名字表] }]
  [
    'orc_inv',
    (n) => `${n[2]}全身无力，崩溃了。`,
    {
      1: ['看板娘', '女骑士', '少女'],
      2: ['精灵少女', '精灵猎手', '精灵少女'],
      3: ['看板娘', '龙族女战士', '龙族少女'],
      4: ['天使', '破邪天使', '妙龄天使'],
      5: ['十字军', '十字军队长', '十字军军官'],
      6: ['看板娘', '女骑士', '少女'],
    },
  ],
  [
    'slime_inv',
    (n) => `${n[1]}脸色铁青，彻底绝望了。`,
    {
      1: ['女人', '女孩', '年轻修女'],
      2: ['精灵女性', '精灵女孩', '精灵巫女'],
      3: ['龙族女性', '龙族女孩', '龙族女神官'],
      4: ['天使', '妙龄天使', '天使神官'],
      5: ['十字军', '十字军护卫', '十字军神官'],
      6: ['女人', '女孩', '年轻修女'],
    },
  ],
  [
    'insect_inv',
    (n) => `${n[0]}们彻底绝望，精神崩溃了。`,
    {
      1: ['女人', '女学生'],
      2: ['女精灵', '精灵学生'],
      3: ['龙族女人', '龙族学生'],
      4: ['天使', '见习天使'],
      5: ['十字军', '见习十字军'],
      6: ['女人', '女学生'],
    },
  ],
  [
    'ivy_inv',
    (n) =>
      `除了脱粪以外，性交已经是唯一的娱乐。${n[0]}们都堕落为淫乱的女人了。`,
    {
      1: ['女人', '女兵士'],
      2: ['精灵女性', '精灵守卫'],
      3: ['龙族女人', '龙族女战士'],
      4: ['天使', '破邪天使'],
      // :312 的第二臂写成 ARG == 4（不可达）→ 天神宫落 ELSE
      5: ['女人', '女兵士'],
      6: ['女人', '女兵士'],
    },
  ],
  [
    'syokusyu_inv',
    (n) => `触手的精液中含有大量的春药成分，${n[0]}们被多次地强制绝顶了。`,
    {
      1: ['女人', '侍女', '贵族女人'],
      2: ['女精灵', '精灵侍女', '精灵贵族'],
      3: ['龙族女人', '龙族侍女', '龙族贵族'],
      4: ['天使', '天使仆从', '上位天使'],
      5: ['十字军', '十字军仆从', '高阶十字军'],
      6: ['女人', '侍女', '贵族女人'],
    },
  ],
  [
    'faily_inv',
    (n) => `妖精们宛如孩子般天真无邪的玩弄着破坏着${n[0]}们。`,
    {
      1: ['女人', '少女', '人类'],
      2: ['精灵女性', '精灵少女', '精灵'],
      3: ['龙族女性', '龙族少女', '龙族'],
      4: ['天使', '天使少女', '天使'],
      5: ['十字军', '天使少女', '天使'],
      6: ['女人', '少女', '人类'],
    },
  ],
  [
    'giant_inv',
    (n) => `${n[1]}被巨人压倒了，连续的战斗让她的魔力已经见底。`,
    {
      1: ['女奴隶', '魔导士', '人类'],
      2: ['精灵女奴隶', '精灵使', '精灵'],
      3: ['龙族女奴隶', '龙族术士', '龙族'],
      4: ['天界奴隶', '破邪天使', '天使'],
      5: ['天神奴隶', '破落天使', '天使'],
      6: ['女奴隶', '魔导士', '人类'],
    },
  ],
  [
    'man_inv',
    (n) => `年轻的${n[1]}投降了，当然魔王军可不接受${n[2]}。`,
    {
      1: ['女神官', '女战士', '人类的法律'],
      2: ['精灵女神官', '女精灵战士', '投降'],
      3: ['龙族女神官', '龙族女战士', '投降'],
      4: ['天使', '破邪天使', '投降'],
      5: ['天使', '破邪天使', '投降'],
      6: ['女神官', '女战士', '人类的法律'],
    },
  ],
  [
    'girl_inv',
    (n) =>
      `自尊心已经完全崩溃，作为百合便器的${n[2]}伸出舌头仔细地舔舐着肛门。`,
    {
      1: ['女司令官', '秘书', '女人'],
      2: ['精灵士官', '侍从', '精灵女性'],
      3: ['龙族女战士', '侍从', '龙族女性'],
      4: ['破邪天使', '侍从', '天使'],
      5: ['破邪天使', '侍从', '天使'],
      6: ['女司令官', '秘书', '女人'],
    },
  ],
  [
    'beast_inv',
    (n) =>
      `${n[0]}终于明白了自己作为俘虏，地位还在魔兽以下，以牝犬的样子承受着魔兽的侵犯。`,
    {
      1: ['女人', '贵族千金'],
      2: ['精灵猎手', '精灵千金'],
      3: ['龙族女战士', '龙族贵妇'],
      4: ['破邪天使', '天使圣女'],
      5: ['破邪天使', '天使圣女'],
      6: ['女人', '贵族千金'],
    },
  ],
  [
    'brain_inv',
    (n) => `${n[0]}间谍的拷问在持续着。`,
    {
      1: ['女'],
      2: ['女精灵'],
      3: ['龙女'],
      4: ['天使'],
      5: ['天使'],
      6: ['女'],
    },
  ],
  [
    'horse_inv',
    (n) => `『马奸刑…？那是什么…』${n[0]}被全裸锁在木马上，挣扎着。`,
    {
      1: ['女人', '本地女领主'],
      2: ['女精灵', '精灵女族长'],
      3: ['龙女', '龙族女长老'],
      4: ['天使', '天使长'],
      5: ['十字军', '十字军军官'],
      6: ['女人', '本地女领主'],
    },
  ],
];

/** 每个函数「跑遍全部分支」要用的 knob 集合（空对象 = ELSE 臂） */
const BRANCH_KNOBS = {
  orc_inv: [
    { 5: 0 },
    { 5: 1, 4: 0 },
    { 5: 1, 4: 1, 3: 0 },
    { 5: 1, 4: 1, 3: 1, 2: 0 },
    {},
  ],
  slime_inv: [{ 4: 0 }, { 4: 1, 3: 0 }, { 4: 1, 3: 1, 2: 0 }, {}],
  insect_inv: [{ 3: 0 }, { 3: 1, 2: 0 }, {}],
  ivy_inv: [{ 3: 0 }, { 3: 1, 2: 0 }, {}],
  syokusyu_inv: [{ 3: 0 }, { 3: 1, 2: 0 }, {}],
  faily_inv: [{ 3: 0 }, { 3: 1, 2: 0 }, {}],
  giant_inv: [{ 4: 0 }, { 4: 1, 3: 0 }, { 4: 1, 3: 1, 2: 0 }, {}],
  man_inv: [{ 4: 0 }, { 4: 1, 3: 0 }, { 4: 1, 3: 1, 2: 0 }, {}],
  girl_inv: [{ 3: 0 }, { 3: 1, 2: 0 }, {}],
  beast_inv: [{ 2: 0 }, {}],
  brain_inv: [{ 2: 0 }, {}],
  horse_inv: [{ 2: 0 }, {}],
};

test('战场表：12 个旁白函数的 area 1-5 与 ELSE 回落逐个可区分', async () => {
  for (const [name, probe, areas] of AREA_PROBES) {
    for (const [area, names] of Object.entries(areas)) {
      const fixture = create_era_fixture();
      const lines = await run_plain(fixture, name, Number(area), 0, knob());
      assert(
        lines.includes(probe(names)),
        `战场表：${name} area ${area} → ${names.join('/')}`,
      );
    }
  }
});

test('战场表逐格：每一格都出现在该战场的输出里（防手抄漏字）', async () => {
  // 上面那条探针每个函数只够得着一格（ELSE 臂用的那个字母）；#470 审查抓到
  // 的「龙族女神官 → 龙族神官」正落在够不着的格上。这里把该函数所有分支
  // （侵攻点给满 7，让嵌套门槛也开）的输出并起来，逐格点名。
  for (const [name, , areas] of AREA_PROBES) {
    for (const [area, names] of Object.entries(areas)) {
      const lines = [];
      for (const overrides of BRANCH_KNOBS[name]) {
        const fixture = create_era_fixture();
        lines.push(
          ...(await run_plain(fixture, name, Number(area), 7, knob(overrides))),
        );
      }
      for (const cell of names) {
        assert(
          lines.some((line) => line.includes(cell)),
          `逐格：${name} area ${area} 的「${cell}」不在任何分支的输出里`,
        );
      }
    }
  }
});

// —— 3. 随机分支与侵攻点门槛 ——

test('随机分支：12 个函数的第一臂、后续臂与 ELSE 逐条可区分', async () => {
  const cases = [
    // [函数名, 覆盖 knob, 侵攻点, 命中行]
    ['orc_inv', { 5: 0 }, 2, '被亚人群所包围的女骑士的部队、被迫做出了决断'],
    [
      'orc_inv',
      { 5: 1, 4: 0 },
      2,
      '女骑士的抵抗是如此地无力，一个又一个的据点被攻占下来了，抵抗的部队也都尽数被捕虏了。',
    ],
    [
      'orc_inv',
      { 5: 1, 4: 1, 3: 0 },
      3,
      '看板娘的住街被完全破坏了、街上的女人全部成为了亚人的肉便器',
    ],
    ['orc_inv', { 5: 1, 4: 1, 3: 1, 2: 0 }, 2, '女骑士在广场上被公开处刑。'],
    ['orc_inv', { 5: 1, 4: 1, 3: 1, 2: 1 }, 2, '「新人，就在里面！」'],
    [
      'slime_inv',
      { 4: 0 },
      2,
      '成为俘虏的年轻修女被往肛门里尽可能地注入了泥浆',
    ],
    ['slime_inv', { 4: 1, 3: 0 }, 0, '年轻修女们，在战火中祈祷着。'],
    [
      'slime_inv',
      { 4: 1, 3: 1, 2: 0 },
      3,
      '女人的住街遭受了兽人魔物使的袭击、防卫部队已经处于半崩溃状态',
    ],
    ['slime_inv', { 4: 1, 3: 1, 2: 1 }, 0, '『快停下！放过我吧！不要啊！』'],
    [
      'insect_inv',
      { 3: 0 },
      2,
      '被捕获的女学生们、被逼往嘴里吞下了紫芋虫。很快出现了各种症状',
    ],
    ['insect_inv', { 3: 1, 2: 0 }, 3, '兽人虫使、把成为阴茎容器的女人绑了起来'],
    [
      'insect_inv',
      { 3: 1, 2: 1 },
      0,
      '在战场上被抓获的女人们，成为了魔界昆虫的孵化箱。',
    ],
    [
      'ivy_inv',
      { 3: 0 },
      2,
      '植物型魔物在一夜之间吞没了城寨、女兵士们全被巨大的藤蔓缠住了',
    ],
    ['ivy_inv', { 3: 1, 2: 0 }, 4, '女兵士的筋肉绷紧起来变成了动弹不得的肉块'],
    [
      'ivy_inv',
      { 3: 1, 2: 1 },
      0,
      '在被镇压了的据点上，种满了魔界的植物，女人们被抓了过来，提供养分。',
    ],
    ['syokusyu_inv', { 3: 0 }, 2, '贵族女人被捕获后、被触手细致地催眠了'],
    [
      'syokusyu_inv',
      { 3: 1, 2: 0 },
      2,
      '侍奉着贵族的侍女，让主人的千金躲到暗格里，自己一个抵抗着。',
    ],
    [
      'syokusyu_inv',
      { 3: 1, 2: 1 },
      0,
      '被镇压的据点里，临时设置了触手生产工厂。',
    ],
    ['faily_inv', { 3: 0 }, 2, '都会学校被妖精们占据了、学生全被囚禁起来'],
    [
      'faily_inv',
      { 3: 1, 2: 0 },
      4,
      '之后、女人的乳头也被改造成能与妖精性交了',
    ],
    [
      'faily_inv',
      { 3: 1, 2: 1 },
      0,
      '妖精们宛如孩子般天真无邪的玩弄着破坏着女人们。',
    ],
    [
      'giant_inv',
      { 4: 0 },
      2,
      '因为巨人们的余兴而被捕获的女奴隶们成为了稀罕的收藏品',
    ],
    ['giant_inv', { 4: 1, 3: 0 }, 0, '本来就身份低微的女奴隶们被抓获了，'],
    [
      'giant_inv',
      { 4: 1, 3: 1, 2: 0 },
      0,
      '在战场上被抓获的女奴隶们，在接受最初的洗礼。',
    ],
    [
      'giant_inv',
      { 4: 1, 3: 1, 2: 1 },
      4,
      '到那时会对她们使用魔法、让坏掉的身体再生吧',
    ],
    [
      'man_inv',
      { 4: 0 },
      2,
      '女战士用锐利的视线睨视着魔王军的兵士。但是、她的眼里含着泪水。',
    ],
    [
      'man_inv',
      { 4: 1, 3: 0 },
      0,
      '被捕获了的女神官，为求饶命而向魔王军团发誓忠诚于魔王。',
    ],
    [
      'man_inv',
      { 4: 1, 3: 1, 2: 0 },
      0,
      '「今后也一直为肉棒祈祷吧，神官大人。」',
    ],
    [
      'man_inv',
      { 4: 1, 3: 1, 2: 1 },
      0,
      '年轻的女战士投降了，当然魔王军可不接受人类的法律。',
    ],
    // 女 / 兽 / 脑奸 / 马的第一臂没有侵攻点门槛（:626/:681/:721/:768）
    ['girl_inv', { 3: 0 }, 0, '据点被攻陷，女司令官成功地突围逃命，不过'],
    ['girl_inv', { 3: 1, 2: 0 }, 0, '前线的女司令官和秘书一起被抓住了。'],
    ['girl_inv', { 3: 1, 2: 1 }, 0, '『舔…呃呃…舔…』'],
    [
      'beast_inv',
      { 2: 0 },
      0,
      '在被俘的贵族千金身上，施加了强力的催眠魔法，持续的心理暗示，让她成为一只发情期的母兽了。',
    ],
    [
      'beast_inv',
      { 2: 1 },
      0,
      '在魔王军的驻地里，偶尔被抓获的女人作为俘虏被戏耍着。',
    ],
    [
      'brain_inv',
      { 2: 0 },
      0,
      '女司令官的拷问开始了。为了下一步的进军，有必要让她说出全部。',
    ],
    ['brain_inv', { 2: 1 }, 0, '女间谍的拷问在持续着。'],
    ['horse_inv', { 2: 0 }, 0, '魔王军将军骑的马的肚子下，吊着奇妙的肉块。'],
    [
      'horse_inv',
      { 2: 1 },
      0,
      '『马奸刑…？那是什么…』女人被全裸锁在木马上，挣扎着。',
    ],
  ];
  for (const [name, overrides, point, expected] of cases) {
    const fixture = create_era_fixture();
    const lines = await run_plain(fixture, name, 1, point, knob(overrides));
    assert(
      lines.includes(expected),
      `分支：${name} ${JSON.stringify(overrides)}`,
    );
  }
});

test('侵攻点门槛：嵌套的两档在边界两侧各自开合', async () => {
  const cases = [
    // [函数名, knob, 命中行（area 1 已代入）, 出档点, 不出档点]
    [
      'orc_inv',
      { 5: 1, 4: 0 },
      '亚人军队的攻势不知什么时候才会停止、就好像席卷而来的波涛一般排山倒海',
      7,
      6,
    ],
    [
      'orc_inv',
      { 5: 1, 4: 0 },
      '女骑士的部队寡不敌众、没办法做出很好的抵抗',
      3,
      2,
    ],
    [
      'orc_inv',
      { 5: 1, 4: 0 },
      '女骑士的妊娠数已经超过了三位数、已经被改造得无法与同族生育了',
      8,
      7,
    ],
    ['orc_inv', { 5: 1, 4: 0 }, '女骑士的妊娠数已经超过了两位数', 4, 3],
    ['orc_inv', { 5: 1, 4: 1, 3: 0 }, '成为肉便器的看板娘在烤面包', 8, 7],
    [
      'orc_inv',
      { 5: 1, 4: 1, 3: 0 },
      '看板娘的住街被完全破坏了、街上的女人全部成为了亚人的肉便器',
      3,
      2,
    ],
    [
      'ivy_inv',
      { 3: 1, 2: 0 },
      '根须从耳一直伸到大脑、很快精神被改造得除了快感其他什么也感觉不到了的样子',
      6,
      5,
    ],
    [
      'giant_inv',
      { 4: 1, 3: 1, 2: 1 },
      '到那时会对她们使用魔法、让坏掉的身体再生吧',
      4,
      3,
    ],
    [
      'giant_inv',
      { 4: 1, 3: 1, 2: 1 },
      '只要一戳内心坏掉的魔导士的阴茎套、就会像说胡话似的咏唱起再生魔法',
      7,
      6,
    ],
    [
      'faily_inv',
      { 3: 1, 2: 0 },
      '之后、女人的乳头也被改造成能与妖精性交了',
      4,
      3,
    ],
    [
      'faily_inv',
      { 3: 1, 2: 0 },
      '阴蒂勃起的女人直到死都无休止地被妖精们泄欲着',
      7,
      6,
    ],
  ];
  for (const [name, overrides, line, show, hide] of cases) {
    const shown = create_era_fixture();
    const shown_lines = await run_plain(shown, name, 1, show, knob(overrides));
    assert(shown_lines.includes(line), `门槛：${name} 点 ${show} → 出`);

    const hidden = create_era_fixture();
    const hidden_lines = await run_plain(
      hidden,
      name,
      1,
      hide,
      knob(overrides),
    );
    assert(!hidden_lines.includes(line), `门槛：${name} 点 ${hide} → 不出`);
  }
});

// —— 4. 原作缺陷 1:1 保留（@IVY_INV 的重复臂）——

test('@IVY_INV 的战场表：:312 的第二臂写成 ARG == 4（不可达），天神宫落 ELSE', async () => {
  // 原作 :309 与 :312 都是 ELSEIF ARG == 4——第二臂恒不可达。若照「修好」
  // 写成 ARG == 5，天神宫应拿到 ['十字军','十字军军官']（同款表格的 :313-314），
  // 现在必须是 ELSE 的 ['女人','女兵士']。缺陷登记 issue #14。
  const fixture = create_era_fixture();
  const lines = await run_plain(fixture, 'ivy_inv', 5, 0, knob());
  assert(
    lines.includes(
      '除了脱粪以外，性交已经是唯一的娱乐。女人们都堕落为淫乱的女人了。',
    ),
    '天神宫（5）落 ELSE：拿人间界的名字',
  );
});
