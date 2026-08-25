/**
 * @file 归一表与转换器的单元测试（issue #60）。
 *
 * 钉三件事：
 *   1. **表不变量**：load_table() 对坏形状（非单字、链式映射、词级 target
 *      再含键、空豁免）必须 throw——表只能以合法形状生长；
 *   2. **实测覆盖**：MEASURED_* 是 2026-08 对 target/ 全部 PRINT* 行的字种
 *      普查（繁 492 / 日 75，收录方法见各常量头注释），机械映射必须覆盖
 *      其中每一个，且普查本身仍然可复现（每个字今天仍能在 target/ 的
 *      PRINT 行里数到——防止 MEASURED 集自己抄错字，2026-08 勘测时靠这一
 *      步抓出过三处误记）；
 *   3. **转换行为**：ere/ 现存非简体串的归一结果逐条固定（词级优先于字级、
 *      五条歧义字的裁定、幂等、豁免按整串放行、假名单独报出）。
 *
 * 工单「机械映射覆盖当前实测的 133 字种」的统计差异：工单只数 A 类繁体行
 * （1,818 行 / 67 文件，得 133 字种 / 4,305 字次）；本测试的普查数全部
 * PRINT* 行（含日文汉字行、简体行里的个别繁体字），得 492 / 7,330——
 * 是工单给的超集，下界断言仍按工单的 133 固定。
 */

'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const {
  convert_source,
  find_offenders,
  is_exempted,
  load_table,
  scan_string_literals,
  to_simplified,
  validate,
} = require('../tools/lang-normalize');
const table = require('../tools/lang-table');

const REPO_ROOT = path.resolve(__dirname, '..');

// —— 2026-08 实测字种集（target/ 全部 PRINT* 行普查；改这里必须有新勘测） ——
// 方法：扫 target/**/*.ER(B|H) 的 /^\s*PRINT[A-Z]*\s/ 行，取 CJK 字符频次，
// 人工分类出「简体文本里不存在同形字」的字种。下方两串即普查结果本体。
const MEASURED_TRAD =
  '這個變別現發聲話於請喲還調讓體陰寶對點滿長態壞雙難張連與顫負裝續宮搖樂當視復淚說嬌腸誰恥細惡膚該計東兩諒厲應實悅潤關卻臨擺員謝騙絕聽餘夾稱陽並濃鮮離壺靜隨軍奮電試親睜憤纏韻脹撥嘗獎記貞達盡論幾瘋護遠選擇聖確問勝揚禮乾賜濕幫辦習慣設剛領斷衛養場備殺轉針類熾脫製產掙館況吶閉錯擁棄敗戰題準換勞顯貼係費誠黃擴飛罰藥聞擊喪團執喚華樹聯畫寬侶師斬歸標潔競療綳趕劃渾彎務戲擠憂幹癮兒摳齡條鬆顏懲滯濺獻戀飼擔屬學礦賣艱鬥憶漢臥濁聳瀕虜衆書園訓銀曬運講攝擡貫懇飯爭顛倫誘義跡飄膩狽緒軀嘆貧較擰圓駡銷尋徹嚕雜顆綺贊囂濘竊諂嚨鬱繞戶藝財闆評價輩輪嚇車擾險礙醜曠佈燙腦憫遺剝鳥絞獵勵監鎖數縛飾淨陸噴賤項紮營糞蹟鷄豬婦揮據嚥糾檢縮隻獸適專觸騰環綫噥奪舊皺違飢牽構絲圖塗鑽壓鬧腫寵攪農慘側緣撐捨嘔錢質塊優責識歡處興鳴攣痙將氣紅夠雖嗎強帶熱蕩無溫給莖頂傳隊馬覺結時們異種為驗傢夥隸討厭憐買躪靈狀葉邁術畢鏈瑪臉艷蟲報見許總資姦淩妳樣從間懷緊機認殘賞癱輕慾亂議響傷須偉貪奧則級敵納繼圍獲陣貴導約純詛謎慄簡濫摀嚐勳墮訴憊練髮頻盤順範煩駕決勢襲極終丟穢虛髒褲紋麗慮語維諸際願啟麽墻著後裏裡爲來開邊會過頭經門沒愛進動嗚撫衹';
const MEASURED_JP =
  '変挿実満覚経説戦脳両壊専昇圧値増廃陥抜豊渇悪帰拡縄汎処浄斉営掲団舎雑軽応姉栄緑毎晩歳様砕乗闘幇郷撃獣呑顔験絶証寛険汚呪効黒巣楽搾対帯亜揺録収発鈍壷囲産';
// 词级条目的全库出现次数（2026-08 实测，方法：target/**/*.ERB 全文计数）
// ハウンド：ERB 全库 3 次（SUMMON_MONSTER.ERB:91 ヘルハウンド、:100 ゾンビハウンド+ヘルハウンド，
// 注释里的子串）；作为整词的实据在 target/CSV/Chara/Chara210.csv:3（呼び名 ハウンドL），
// count_word 只扫 ERB、CSV 不在口径内，#139 收录时登记。
const MEASURED_WORDS = { 奴隷: 426, 気力: 169, 回復: 85, ハウンド: 3 };

// —— 表不变量 ——

test('load_table：合法表载入即过，形状各不变量逐条报出', () => {
  const tbl = load_table();
  assert.ok(tbl.char_map.size >= 500, '字级条目意外地少，表八成没载全');
  assert.ok(tbl.word_map.length >= 3);
});

test('validate：坏表形状必须载入期就红（逐条变异过）', () => {
  const bad = (mutate) => {
    const raw = JSON.parse(JSON.stringify(table));
    mutate(raw);
    validate(raw);
  };
  assert.throws(
    () =>
      bad((raw) => {
        raw.TRAD_CHAR_MAP['這個'] = '这个'; // 两字键
      }),
    /非单字条目/,
  );
  assert.throws(
    () =>
      bad((raw) => {
        raw.TRAD_CHAR_MAP['後'] = '後'; // 无变化
      }),
    /无变化条目/,
  );
  assert.throws(
    () =>
      bad((raw) => {
        // 链式：造 后→後 即成 后 → 後 → 后
        raw.TRAD_CHAR_MAP['后'] = '後';
      }),
    /链式映射/,
  );
  assert.throws(
    () =>
      bad((raw) => {
        raw.WORD_MAP.push({ source: '隷', target: '隶' }); // 单字词
      }),
    /词级条目过短/,
  );
  assert.throws(
    () =>
      bad((raw) => {
        // target 里含字级键（廃）：转换一趟之后还会被字级再转一次
        raw.WORD_MAP.push({ source: '戰廃', target: '战廃' });
      }),
    /词级 target 含字级键/,
  );
  assert.throws(() => {
    bad((raw) => {
      raw.EXEMPT_STRINGS.push({ value: '', where: 'x', why: 'x' });
    });
  }, /豁免条目 value 为空/);
});

// —— 实测覆盖 ——

/** 重跑 2026-08 的普查：target/ 全部 PRINT* 行的 CJK 字符频次 */
function scan_corpus_chars() {
  const freq = new Map();
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.ERB$|\.ERH$/i.test(entry.name)) {
        for (const line of fs.readFileSync(full, 'utf8').split(/\r?\n/)) {
          const m = line.match(/^\s*PRINT[A-Z]*\s+(.*)$/);
          if (!m) {
            continue;
          }
          for (const ch of m[1]) {
            if (/[\u3400-\u9FFF\uF900-\uFAFF]/.test(ch)) {
              freq.set(ch, (freq.get(ch) ?? 0) + 1);
            }
          }
        }
      }
    }
  };
  walk(path.join(REPO_ROOT, 'target'));
  return freq;
}

test('机械映射覆盖 target/ PRINT 行实测的全部字种（普查可复现）', () => {
  const tbl = load_table();
  const freq = scan_corpus_chars();

  // MEASURED 集的出处自查：普查集里今天仍数得到每一个（防抄错字进集）
  const ghost_trad = [...MEASURED_TRAD].filter((ch) => !freq.has(ch));
  const ghost_jp = [...MEASURED_JP].filter((ch) => !freq.has(ch));
  assert.deepEqual(
    { ghost_trad, ghost_jp },
    { ghost_trad: [], ghost_jp: [] },
    'MEASURED 集里有语料中不存在的字——普查串抄错了，重做普查再改',
  );

  // 覆盖断言：实测字种逐个是表键
  const missing_trad = [...new Set(MEASURED_TRAD)].filter(
    (ch) => !tbl.trad_map.has(ch),
  );
  const missing_jp = [...new Set(MEASURED_JP)].filter(
    (ch) => !tbl.jp_map.has(ch),
  );
  assert.deepEqual(
    missing_trad,
    [],
    `繁体字种缺映射（表只能有意识地长——先实证再收，但实测出现过的必须收）：${missing_trad.join('')}`,
  );
  assert.deepEqual(missing_jp, [], `日文字种缺映射：${missing_jp.join('')}`);

  // 工单给的下界固定：133 字种 / 4,305 字次（A 类繁体行标准）
  assert.ok(
    new Set(MEASURED_TRAD).size >= 133,
    `实测繁体字种 ${new Set(MEASURED_TRAD).size} 个，低于工单给的 133——普查退化`,
  );
  const trad_occurrences = [...new Set(MEASURED_TRAD)].reduce(
    (sum, ch) => sum + (freq.get(ch) ?? 0),
    0,
  );
  assert.ok(
    trad_occurrences >= 4305,
    `实测繁体字次 ${trad_occurrences}，低于工单给的 4,305——普查退化`,
  );
});

test('词级译法的各词条语料里真实存在（实测次数逐条登记）', () => {
  const tbl = load_table();
  const count_word = (word) => {
    let hits = 0;
    const walk = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
        } else if (/\.ERB$/i.test(entry.name)) {
          hits += fs.readFileSync(full, 'utf8').split(word).length - 1;
        }
      }
    };
    walk(path.join(REPO_ROOT, 'target')); // 全库标准：含 target 根下的散装 ERB
    return hits;
  };
  for (const { source } of tbl.word_map) {
    const measured = MEASURED_WORDS[source];
    assert.ok(
      measured !== undefined,
      `词级条目「${source}」没有实测登记——新词条必须先在 MEASURED_WORDS 记录语料出现次数`,
    );
    assert.equal(
      count_word(source),
      measured,
      `词「${source}」全库出现次数与登记不符——语料或登记变了，两边核对后更新`,
    );
  }
});

// —— 转换行为 ——

test('ere/ 现存非简体串的归一结果逐条固定（词级优先、字级兜底）', () => {
  assert.equal(
    to_simplified('*因奴隷的愛而回復了気力*'),
    '*因奴隶的爱而恢复了气力*',
    '奴隷→奴隶（词）、気力→气力（词）、回復→恢复（词，字级只会给出「回复」）、愛→爱（字）',
  );
  assert.equal(
    to_simplified('*因調教奴隷而回復了気力*'),
    '*因调教奴隶而恢复了气力*',
  );
  assert.equal(to_simplified('陰莖'), '阴茎');
  assert.equal(to_simplified('★瀕死★'), '★濒死★');
  assert.equal(to_simplified('破坏封印時'), '破坏封印时');
  assert.equal(to_simplified('蹂躪'), '蹂躏');
  assert.equal(to_simplified('也不錯'), '也不错');
  assert.equal(to_simplified('帯回'), '带回', '日文帯→带');
  assert.equal(to_simplified('拖進了牢房'), '拖进了牢房');
  assert.equal(
    to_simplified(
      '（現在如果發出奇怪的聲音的話…隻會讓這傢夥感到高興、一定要忍耐…！）',
    ),
    '（现在如果发出奇怪的声音的话…只会让这家伙感到高兴、一定要忍耐…！）',
  );
});

test('五条歧义字的裁定生效（著後裏裡發髮爲為）', () => {
  assert.equal(to_simplified('彎曲著身體'), '弯曲着身体', '著→着：助词义');
  assert.equal(to_simplified('之後'), '之后', '後→后');
  assert.equal(to_simplified('這裏'), '这里');
  assert.equal(to_simplified('那裡'), '那里');
  assert.equal(to_simplified('發出'), '发出');
  assert.equal(to_simplified('頭髮'), '头发', '發/髮 合并进 发');
  assert.equal(to_simplified('因爲'), '因为');
  assert.equal(to_simplified('認為'), '认为', '爲/為 是同一字的异体');
});

test('to_simplified 幂等：K5 口上全部 PRINTFORM 行两趟一致', () => {
  const erb = fs.readFileSync(
    path.join(REPO_ROOT, 'target/ERB/口上/EVENT_K5_マオ.ERB'),
    'utf8',
  );
  let checked = 0;
  for (const line of erb.split(/\r?\n/)) {
    const m = line.match(/^\s*PRINTFORM(W|L)\s+(.*)$/);
    if (!m) {
      continue;
    }
    const once = to_simplified(m[2]);
    assert.equal(
      to_simplified(once),
      once,
      `二趟不一致（值里含表键）：「${m[2]}」→「${once}」`,
    );
    checked += 1;
  }
  assert.ok(checked >= 400, `K5 只数到 ${checked} 条 PRINTFORM，语料不对劲`);
});

test('find_offenders：字级/词级/假名分别报出，豁免按整串放行', () => {
  const tbl = load_table();
  assert.deepEqual(find_offenders('你是变态', tbl), []);
  const kinds = find_offenders('你這個變態', tbl).map((h) => h.kind);
  assert.deepEqual(kinds, ['char', 'char', 'char', 'char']);
  assert.ok(find_offenders('奴隷', tbl).some((h) => h.kind === 'word'));
  assert.ok(find_offenders('気力', tbl).some((h) => h.kind === 'word'));
  assert.deepEqual(find_offenders('華胥の亡靈', tbl), [
    { kind: 'char', value: '華' },
    { kind: 'kana', value: 'の' },
    { kind: 'char', value: '靈' },
  ]);
  assert.ok(
    is_exempted(
      '大众性格：谦悟、文文、匿名神人、干掉人龙、歪闷林、華胥の亡靈、Delicious',
      tbl,
    ),
    '致谢名单整串豁免',
  );
  assert.ok(
    !is_exempted('華胥の亡靈', tbl),
    '豁免粒度是字符串整体：名单里抠出来的片段不豁免',
  );
});

test('convert_source：只动字符串字面量，注释/标识符不碰，幂等', () => {
  const tbl = load_table();
  const src = [
    '// 注释里的 這個變態 不转换',
    "const a = '你這個變態…別、別碰我！';",
    'const 這個變態_id = 1; // 标识符（示意）不转换',
    'const exempt =',
    "  '大众性格：谦悟、文文、匿名神人、干掉人龙、歪闷林、華胥の亡靈、Delicious';",
    'const t = `主人、${x}好厲害`;',
  ].join('\n');
  const { text, changes } = convert_source(src, tbl);
  assert.equal(changes.length, 2, `应恰有两处改动，得 ${changes.length}`);
  assert.ok(text.includes("'你这个变态…别、别碰我！'"));
  assert.ok(text.includes('// 注释里的 這個變態 不转换'));
  assert.ok(text.includes('const 這個變態_id = 1;'));
  assert.ok(text.includes('華胥の亡靈'), '豁免串原样保留');
  assert.ok(text.includes('`主人、${x}好厉害`'), '模板字面量归一且插值不伤');
  // 幂等
  const second = convert_source(text, tbl);
  assert.deepEqual(second.changes, []);
});

test('scan_string_literals：注释里的引号与转义不骗扫描器', () => {
  const src = [
    "// it's a comment with 'quotes'",
    'const a = "他\\t發";',
    'const b = `多行',
    '模板`;',
  ].join('\n');
  const lits = scan_string_literals(src);
  assert.equal(lits.length, 2, '注释里的引号不得开字符串');
  assert.equal(
    lits[0].content,
    '他t發',
    '转义序列按其字面值入内容（\\t 即字母 t）',
  );
  assert.ok(lits[1].content.includes('多行'));
});
