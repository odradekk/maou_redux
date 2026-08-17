/**
 * @file 调教状态画面：@SHOW_STATUS 的处理器 + 引擎内建 PRINT_PALAM 的移植
 * （issue #44）。
 *
 * 源: target/ERB/調教相關/TRAIN_MAIN.ERB  @SHOW_STATUS（:60-259，无标记
 *     = 普通档事件）
 *     PRINT_PALAM（Emuera 内建命令，PRINT_STATUS 系——非 ERB 函数，ere 侧
 *     以本文件的 print_palam 承载）
 *
 * 骨架范围（工单：循环骨架不是完整状态画面）：@SHOW_STATUS 的子调用除
 * PRINT_PALAM 外一律存根化；射精/母乳/触手槽条段（:144-252）的 TALENT /
 * TEQUIP 守卫在零指令下不可达，整段以注释占位（docs/stub-registry.md）。
 * 其余直线代码（日期行、目标行、绝顶计数、MAXBASE 修正）1:1 照搬。
 */

const era = require('#/era-electron');
const { on } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { stub_line } = require('#/utils/stub-line');
const { chara_callname, chara_name } = require('#/utils/callname-utils');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 对账钉死）；名单变动必须同步清单。
 */
const STUBBED_CALLS = [
  'SHOW_EQUIP_2',
  'LIFE_BAR',
  'VITAL_BAR',
  'PRINT_CLOTHTYPE',
  'SHOW_EQUIP_1',
];

// PALAMLV の初期値（Emuera 默认，_replace.csv 未改此键）：参数等级阈值。
// PRINT_PALAM 的条形以「下一个阈值」为满刻度
const PALAMLV = [
  0, 100, 500, 3000, 10000, 30000, 60000, 100000, 150000, 250000,
];

// 条形填充字符按当前等级爬坡：LV0 '-'、LV1 '='、LV2 '>'、LV3+ '*'。
// 依据 = target/emuera.log 的实机渲染（润滑 2915[>>>>>>>>>.] LV2、屈服 100
// [==........] LV1、抑郁 24[--........] LV0、阴核 5540[*****.....] LV3 …
// 十二处样本全吻合）；逐字对拍归 #48
const PALAM_FILL_BY_LEVEL = ['-', '=', '>', '*'];

// 条形宽度 10、每行 3 列、行首与列间各 6 空格、数值右对齐宽 5（log 实测）
const PALAM_BAR_WIDTH = 10;
const PALAM_COLUMNS = 3;
const PALAM_GAP = '      ';
const PALAM_VALUE_WIDTH = 5;

/**
 * GETPALAMLV 的等价物：值达到的最高等级（阈值含下界）。
 * @param {number} value
 * @returns {number}
 */
function palam_level(value) {
  let level = 0;
  while (level + 1 < PALAMLV.length && value >= PALAMLV[level + 1]) {
    level += 1;
  }
  return level;
}

/**
 * PRINT_PALAM（引擎内建命令）的移植：一角色的参数条画面。
 *
 * 渲染规则（emuera.log 实测钉死，见文件头依据）：
 *   - 枚举 palam 名字表从 0 起的连续序号（Palam.yml 的 0..15；100「否定」
 *     是珠侧专用，参数条不显示——连续段在 16 断开即止）；
 *   - 每条：`名前[10 格条]` + 空格 + 右对齐宽 5 的数值；
 *   - 条形满刻度 = 下一等级阈值，填充数 = floor(10 × 值 / 下一阈值)，
 *     已达最高等级（LV9）则满格；填充字符按等级爬坡（PALAM_FILL_BY_LEVEL）。
 *
 * @param {number} cid 角色 ID（原作实参 TARGET）
 */
function print_palam(cid) {
  // 'palamkeys'：引擎寻址的名字表全部序号（含断档后的 100），连续段取完
  const all_keys = era.get('palamkeys') || [];
  const names = [];
  for (let i = 0; all_keys.includes(i); i += 1) {
    names.push(era.get(`palamname:${i}`));
  }

  const cells = names.map((name, index) => {
    const value = era.get(`palam:${cid}:${index}`) || 0;
    const level = palam_level(value);
    const next_threshold = PALAMLV[level + 1];
    const filled =
      next_threshold === undefined
        ? PALAM_BAR_WIDTH
        : Math.floor((PALAM_BAR_WIDTH * value) / next_threshold);
    const fill_char = PALAM_FILL_BY_LEVEL[Math.min(level, 3)];
    const bar = fill_char.repeat(filled) + '.'.repeat(PALAM_BAR_WIDTH - filled);
    const value_text = String(value).padStart(PALAM_VALUE_WIDTH, ' ');
    return `${name}[${bar}] ${value_text}`;
  });

  for (let row = 0; row < cells.length; row += PALAM_COLUMNS) {
    era.print(
      PALAM_GAP + cells.slice(row, row + PALAM_COLUMNS).join(PALAM_GAP),
    );
  }
}

// @SHOW_STATUS 的绝顶计数段（:95-124）：EX:0-5 的方括号行，有任一非零才成行
function print_ex_counters(cid) {
  // 未声明读值 undefined → || 0（#13）；EX 全零（零指令空转）时整段静默
  const ex = Array.from(
    { length: 6 },
    (_, i) => era.get(`ex:${cid}:${i}`) || 0,
  );
  const parts = [];
  // :95-103 EX:0：阴茎（TALENT:121 扶她 / 122 男人）或阴蒂
  if (ex[0] > 0) {
    const organ =
      era.get(`talent:${cid}:122`) || era.get(`talent:${cid}:121`)
        ? '阴茎'
        : '阴蒂';
    parts.push(`[${organ}绝顶：${ex[0]}次]  `);
  }
  // :104-105 EX:1 私处
  if (ex[1] > 0) {
    parts.push(`[私处绝顶：${ex[1]}次]  `);
  }
  // :106-107 EX:2 肛门
  if (ex[2] > 0) {
    parts.push(`[肛门绝顶：${ex[2]}次]  `);
  }
  // :108-109 EX:3 乳房
  if (ex[3] > 0) {
    parts.push(`[乳房绝顶：${ex[3]}次]  `);
  }
  // :110-111 EX:4（%CSTR:7% = 癖好名，未落表读空）
  if (ex[4] > 0) {
    parts.push(`[${era.get(`cstr:${cid}:7`) ?? ''}绝顶：${ex[4]}次]  `);
  }
  // :112-122 EX:5：阴茎侧「射精（喷乳）」（TALENT:130 母乳体质）/「射精」，
  // 否则「喷乳」
  if (ex[5] > 0) {
    if (era.get(`talent:${cid}:122`) || era.get(`talent:${cid}:121`)) {
      parts.push(
        era.get(`talent:${cid}:130`)
          ? `[射精(喷乳)：${ex[5]}次]  `
          : `[射精：${ex[5]}次]  `,
      );
    } else {
      parts.push(`[喷乳：${ex[5]}次]  `);
    }
  }
  if (parts.length > 0) {
    // :123-124 SIF EX 任一非零 → PRINTL（拼行 + 补换行；各段尾自带双空格，
    // 与原作逐字一致，对拍归 #48）
    era.print(parts.join(''));
  }
}

// @SHOW_STATUS 的 MAXBASE 修正段（:128-142）：射精槽（BASE:2）上限缺省
// 10000、早泄（TALENT:133）压到 5000；三处（目标/主人/助手）判据各有微差
// （助手档是 ELSEIF MAXBASE:2 != 0 && TALENT:133，与另两处的 != 5000 不同，
// 1:1 保留）
function fix_maxbase(cid, assi_variant = false) {
  const gauge = era.get(`maxbase:${cid}:2`) || 0;
  if (gauge === 0) {
    era.set(`maxbase:${cid}:2`, 10000);
  } else if ((assi_variant || gauge !== 5000) && era.get(`talent:${cid}:133`)) {
    era.set(`maxbase:${cid}:2`, 5000);
  }
}

on('SHOW_STATUS', async () => {
  const target = era_flag.target;

  // :61 DRAWLINE
  era.drawLine();
  // :62-68 {DAY+1}日 (午前/午后)（TIME：0=午前）
  era.print(
    `${era_flag.day_count + 1}日${era_flag.time === 0 ? '(午前)' : '(午后)'}`,
  );

  // :69-82 %SAVESTR:TARGET% 调教中   调教者:（助手调教=粉色助手名+（助手），
  // 否则浅蓝的主人姓名；无助手参与时再补「  助手:名」；行尾三个空格照原作）
  const header = [{ content: `${chara_callname(target)} 调教中   调教者:` }];
  if (era_flag.assiplay !== 0) {
    // SETCOLOR 0xFF1493 → #ff1493（片段 color 直通渲染层，CSS 色串）
    header.push({ content: chara_callname(era_flag.assi), color: '#ff1493' });
    header.push({ content: ' (助手)' });
  } else {
    // SETCOLOR 0x87CEFA → #87cefa；PRINTS NAME:MASTER（姓名 = callname:-2）
    header.push({ content: chara_name(0), color: '#87cefa' });
  }
  if (era_flag.assi > 0 && era_flag.assiplay === 0) {
    header.push({ content: `  助手:${chara_callname(era_flag.assi)}` });
  }
  header.push({ content: '   ' }); // :82 PRINT（行尾三空格）
  era.print(header);

  // :84-86 CALL SHOW_EQUIP_2 / LIFE_BAR / VITAL_BAR —— 存根
  stub_line('SHOW_EQUIP_2', '装备显示', '随装备票');
  stub_line('LIFE_BAR', '生命条', '随状态画面票');
  stub_line('VITAL_BAR', '气力条', '随状态画面票');

  // :87-91 調教時ステータス画面に服装表示を捻じ込んでみた：【PRINT_CLOTHTYPE】
  // （INLINE 占位：原作在同一行内嵌服装名，存根文案并入括号保持单行结构）
  era.print(
    `【服装表示尚未移植（原作 @PRINT_CLOTHTYPE，随服装票，见 docs/stub-registry.md。）】`,
  );
  era.println(); // :93 PRINTL

  // :95-124 绝顶计数（直线段，1:1）
  print_ex_counters(target);

  // :126 PRINT_PALAM TARGET（引擎内建命令的移植，参数条——指令菜单之外
  // 玩家唯一的反馈，工单点名保留）
  print_palam(target);

  // :128-142 MAXBASE 修正（目标/主人/助手三处；助手档判据差异见函数头）
  fix_maxbase(target);
  fix_maxbase(0);
  if (era_flag.assi >= 0) {
    fix_maxbase(era_flag.assi, true);
  }

  // :144-252 射精（主人/助手/目标三段）· 母乳（三段）· 触手/死斗场（TEQUIP
  // 89/90/55）槽条段：TALENT:121/122/130/135 与 TEQUIP 守卫在零指令空转下
  // 全部不可达，整段以注释占位——正文随首条指令/装备票移植（已登记
  // docs/stub-registry.md「SHOW_STATUS 射精/母乳/触手槽条段」行）。

  // :253 CALL SHOW_EQUIP_1 —— 存根
  stub_line('SHOW_EQUIP_1', '装备一览', '随装备票');

  // :255-256 CALL SET_CLEAR_POINT：TFLAG:999 = LINECOUNT（设置清除点；本票
  // 移植——引擎 LINECOUNT 的等价物 getLineCount 直通）
  era.set('tflag:999', era.getLineCount());
});

module.exports = {
  STUBBED_CALLS,
  palam_level,
  print_palam,
};
