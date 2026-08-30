/**
 * @file 调教状态画面：@SHOW_STATUS 的处理器 + 引擎内建 PRINT_PALAM 的移植
 * （issue #44；#74 起整页为画面组件、参数条换引擎原生进度条）。
 *
 * 源: target/ERB/調教相關/TRAIN_MAIN.ERB  @SHOW_STATUS（:60-259，无标记
 *     = 普通档事件）
 *     PRINT_PALAM（Emuera 内建命令，PRINT_STATUS 系——非 ERB 函数，ere 侧
 *     以本文件的 print_palam 承载）
 *     USERCOM.ERB :179-186 —— @SET_CLEAR_POINT/@CLEAR_TO_POINT：锚点跨度
 *     重绘的原作习语（@SHOW_STATUS 尾部记锚点、清回锚点重画），ere 侧由
 *     ScreenBlock（page/components/screen-block.js，#73）承载
 *
 * 骨架范围：@SHOW_STATUS 的子调用中 SHOW_EQUIP_1/2 与 PRINT_CLOTHTYPE 存根
 * 化（J5 #215 服装与 TEQUIP 建模）；LIFE_BAR/VITAL_BAR（#212，组件在
 * ere/page/components/chara-bars.js）与射精/母乳/触手槽条段（:144-252，
 * #212 就地实现）已写真身。其余直线代码（日期行、目标行、绝顶计数、
 * MAXBASE 修正）1:1 照搬。
 *
 * #74 的两条换表现层（比对都在旁边看着——本画面在黄金样本覆盖内）：
 *   - 参数条：手绘 10 格字符条退役，printMultiColumns 的 progress 格承载。
 *     语义值（参数名 + palam 原值）在条内/条后文字里，归一化器零解析直取
 *     （tools/compare/normalize.js 的 progress 分支）；percentage 纯表现。
 *   - 整页＝一个 ScreenBlock（@SHOW_STATUS 函数粒度，原作锚点也在函数尾）。
 *     重绘时机见 SHOW_STATUS 处理器的 prevcom 判据。
 */

const era = require('#/era-electron');
const { on } = require('#/system/event/registry');
const { ScreenBlock } = require('#/page/components/screen-block');
const {
  life_bar,
  print_base_bar,
  vital_bar,
} = require('#/page/components/chara-bars');
const era_flag = require('#/era-utils/era-flag');
const { stub_line } = require('#/utils/stub-line');
const { chara_callname, chara_name } = require('#/utils/callname-utils');
// PRINT_CLOTHTYPE 自 #215（J5）起为真身（ere/page/page-clothtype.js 的
// 串构造：SHOW_STATUS 的【…】包裹段消费）
const { clothtype_text } = require('#/page/page-clothtype');
// PALAMLV/palam_level 自 #45 起收敛在 era-utils/palam-level.js（SOURCE_CHECK
// 一族共用）；此处再导出 palam_level 供既有用例继续从本模块取用
const { PALAMLV, palam_level } = require('#/era-utils/palam-level');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 * LIFE_BAR/VITAL_BAR（#212 落地，ere/page/components/chara-bars.js）、
 * PRINT_CLOTHTYPE（#215 落地，ere/page/page-clothtype.js）与
 * 射精/母乳/触手槽条段（:144-252，就地实现）不在名单里。
 */
const STUBBED_CALLS = ['SHOW_EQUIP_2', 'SHOW_EQUIP_1'];

// 参数条的引擎原生渲染参数（#74 起手绘 10 格字符条退役）：
//   - 条内文字（inContent）＝参数名；条后文字（outContent）＝右对齐宽 5 的
//     数值（原作 PRINT_PALAM 数值列的同款形状，log 实测）；
//   - PALAM_PROGRESS_BAR_WIDTH：24 格网格里条占 16、条后文字占 8——
//     ProgressConfig 的 barWidth 取 24 时**不显示条后文字**（dev-guides/08），
//     语义值必须玩家可见，故 < 24；
//   - 每行 3 格（printMultiColumns 一次 3 格＝1 Row，与原作三列排版同构）。
const PALAM_COLUMNS = 3;
const PALAM_PROGRESS_BAR_WIDTH = 16;
const PALAM_VALUE_WIDTH = 5;

/**
 * PRINT_PALAM（引擎内建命令）的移植：一角色的参数条画面。
 *
 * 渲染规则（#74 换表现层：printMultiColumns 的 progress 格）：
 *   - 枚举 palam 名字表从 0 起的连续序号（Palam.yml 的 0..15；100「否定」
 *     是珠侧专用，参数条不显示——连续段在 16 断开即止）；
 *   - 每格：条内文字＝参数名、条后文字＝右对齐宽 5 的数值、percentage＝
 *     100 × 值 / 下一等级阈值（LV9 满档 100，连续值不取整——原作
 *     floor(10*值/下一阈值) 的格数填充没有等价物，也不需要）；
 *   - 每行 3 格。
 *
 * percentage 是**纯表现**：比对两侧归一的语义值＝条后数值（palam 原值），
 * 条形几何（字符条格数 vs 百分比）不进事件流——「换掉表现层不影响比对」的裁定
 * 本体，见 tools/compare/normalize.js 的 progress 分支与 docs/output-diff.md。
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
    const percentage =
      next_threshold === undefined ? 100 : (100 * value) / next_threshold;
    return {
      type: 'progress',
      percentage,
      inContent: name,
      outContent: String(value).padStart(PALAM_VALUE_WIDTH, ' '),
      config: { barWidth: PALAM_PROGRESS_BAR_WIDTH },
    };
  });

  for (let row = 0; row < cells.length; row += PALAM_COLUMNS) {
    era.printMultiColumns(cells.slice(row, row + PALAM_COLUMNS));
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
    // 与原作逐字一致，比对归 #48）
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

// —— 状态画面组件（#74）：整页一个 ScreenBlock ——
//
// 会话态：BEGIN TRAIN 的事件链（EVENTTRAIN）重建——锚点跨会话复用会拿上一
// 局的锚点清掉本局内容（#73 主菜单同款裁定，跨会话测试固定住）。本处理器不
// 输出任何行，与链上其他 EVENTTRAIN 处理器（PRITRAIN 头部等）无序依赖。
let status_block = null;
// 「本轮指令路径执行过」探针（重绘判据）。PREVCOM 的**值差**不能当判据：
// 重复执行同一指令时 train-loop 步骤 13 同值直写，值不变的指令轮会被误判
// 成无指令轮、重绘吃掉当轮叙述（评审探针实证）。EVENTCOM 是指令路径的
// 必经事件（步骤 11：输入命中可执行指令即发射，与指令编号无关）；本
// 处理器零输出，只翻标志。
let command_path_seen = false;

/**
 * @SHOW_STATUS 的绘制内容（:60-256 的直线段；ScreenBlock 的 draw_content，
 * 只输出、不清屏——清行归 redraw）。
 * @param {number} target 调教目标角色 ID
 */
async function draw_status_screen(target) {
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

  // :84 CALL SHOW_EQUIP_2 —— 存根（读 TEQUIP 的调教装备显示：触手/死斗场
  // 等位由各自族票点亮后才有可显示内容，随族票；#215 勘误归属，见
  // docs/stub-registry.md 的 SHOW_EQUIP_2 条目）
  stub_line('SHOW_EQUIP_2', '装备显示', '随调教指令族票');
  // :85-86 CALL LIFE_BAR / VITAL_BAR（#212 真身，ere/page/components/
  // chara-bars.js；源住在 CHARA_INFO_SHOW ver1.1.2.ERB:1129/:1175）
  life_bar(target);
  vital_bar(target);

  // :87-91 調教時ステータス画面に服装表示を捻じ込んでみた：PRINT 【 /
  // CALL PRINT_CLOTHTYPE / PRINT 】——Emuera 三段拼一行，
  // :93 PRINTL（空）收行——
  // ere 合成一次 print（#215 真身：ere/page/page-clothtype.js；FLAG:37
  // 着衣模式的守卫在 clothtype_text 内部 :37，关闭时显示全裸——与原作
  // 状态屏恒出【】行的形态一致）
  era.print(`【${clothtype_text(target)}】`); // :87-91 + :93

  // :95-124 绝顶计数（直线段，1:1）
  print_ex_counters(target);

  // :126 PRINT_PALAM TARGET（引擎内建命令的移植，参数条——指令菜单之外
  // 玩家唯一的反馈，工单报出保留）
  print_palam(target);

  // :128-142 MAXBASE 修正（目标/主人/助手三处；助手档判据差异见函数头）
  fix_maxbase(target);
  fix_maxbase(0);
  if (era_flag.assi >= 0) {
    fix_maxbase(era_flag.assi, true);
  }

  // :144-252 射精/母乳/触手槽条段（#212 落地）。守卫素质：121 扶她/
  // 122 男人（阴茎侧）、130 母乳体质、135 未熟。三处射精守卫的 135 臂
  // 形态各异，逐处 1:1：
  //   - 主人（:144）：(TALENT:135 || (TALENT:135 && BASE:2 >= 2000)) == 0
  //     经布尔化简（A || A&&B ≡ A）恒等于 !TALENT:135——主人独缺
  //     「≥2000 也放行」臂；
  //   - 助手（:161）/目标（:177）：TALENT:135 == 0 || (TALENT:135 &&
  //     BASE:2 >= 2000)——有 ≥2000 臂。
  // 名字后的全角对齐衬垫（STRLENSU < 4 补全角空格）是字符条排版，progress
  // 格不镜像（见 chara-bars.js 文件头）。SETCOLOR 的名字着色（主人浅蓝/
  // 助手粉）为纯表现，不镜像（与头行着色同为记名差异）。
  // TEQUIP:35/36/37 缀「避孕套使用中」——注意省略角色位在 Emuera 里恒指
  // TARGET（不是各段自己的角色），三段读的都是 tequip:TARGET:3x（#212
  // 返工修正：首版写成二段 tequip:3x，引擎侧读的是「角色 3x 的整行对象」/
  // undefined——避孕套恒显或恒不显，见返工报告）。

  // :144-158 射精（主人）：TARGET != MASTER（自调教不显示）
  if (
    (era.get('talent:0:121') || era.get('talent:0:122')) &&
    !era.get('talent:0:135') &&
    target !== 0
  ) {
    print_base_bar(
      `射精（${chara_name(0)}）`,
      era.get('base:0:2') || 0,
      era.get('maxbase:0:2') || 0,
      {
        suffix: era.get(`tequip:${target}:35`) ? '避孕套使用中' : '',
      },
    );
  }

  // :160-175 射精（助手）：仅助手调教时（IF ASSIPLAY）
  if (
    era_flag.assiplay !== 0 &&
    (era.get(`talent:${era_flag.assi}:121`) ||
      era.get(`talent:${era_flag.assi}:122`)) &&
    (!era.get(`talent:${era_flag.assi}:135`) ||
      (era.get(`base:${era_flag.assi}:2`) || 0) >= 2000)
  ) {
    print_base_bar(
      `射精（${chara_callname(era_flag.assi)}）`,
      era.get(`base:${era_flag.assi}:2`) || 0,
      era.get(`maxbase:${era_flag.assi}:2`) || 0,
      { suffix: era.get(`tequip:${target}:36`) ? '避孕套使用中' : '' },
    );
  }

  // :177-188 射精（目标）
  if (
    (era.get(`talent:${target}:121`) || era.get(`talent:${target}:122`)) &&
    (!era.get(`talent:${target}:135`) ||
      (era.get(`base:${target}:2`) || 0) >= 2000)
  ) {
    print_base_bar(
      `射精（${chara_callname(target)}）`,
      era.get(`base:${target}:2`) || 0,
      era.get(`maxbase:${target}:2`) || 0,
      { suffix: era.get(`tequip:${target}:37`) ? '避孕套使用中' : '' },
    );
  }

  // :190-200 母乳（主人，TALENT:130 母乳体质）：MAXBASE:3 缺省补 10000
  if (era.get('talent:0:130')) {
    if (!(era.get('maxbase:0:3') > 0)) {
      era.set('maxbase:0:3', 10000);
    }
    print_base_bar(
      `母乳（${chara_callname(0)}）`,
      era.get('base:0:3') || 0,
      era.get('maxbase:0:3') || 0,
    );
  }

  // :202-214 母乳（助手）：守卫 IF ASSI > 0（注意与射精段的 ASSI >= 0 不同，
  // 原作两处写法不一致，1:1 保留）
  if (era_flag.assi > 0 && era.get(`talent:${era_flag.assi}:130`)) {
    if (!(era.get(`maxbase:${era_flag.assi}:3`) > 0)) {
      era.set(`maxbase:${era_flag.assi}:3`, 10000);
    }
    print_base_bar(
      `母乳（${chara_callname(era_flag.assi)}）`,
      era.get(`base:${era_flag.assi}:3`) || 0,
      era.get(`maxbase:${era_flag.assi}:3`) || 0,
    );
  }

  // :216-226 母乳（目标）
  if (era.get(`talent:${target}:130`)) {
    if (!(era.get(`maxbase:${target}:3`) > 0)) {
      era.set(`maxbase:${target}:3`, 10000);
    }
    print_base_bar(
      `母乳（${chara_callname(target)}）`,
      era.get(`base:${target}:3`) || 0,
      era.get(`maxbase:${target}:3`) || 0,
    );
  }

  // :228-235 射精（犬）（TEQUIP:89 兽奸 PLAY）：BASE:MASTER:4 槽，缺省补 10000
  if (era.get(`tequip:${target}:89`)) {
    if (!(era.get('maxbase:0:4') > 0)) {
      era.set('maxbase:0:4', 10000);
    }
    print_base_bar(
      '射精（犬）',
      era.get('base:0:4') || 0,
      era.get('maxbase:0:4') || 0,
    );
  }

  // :237-244 射精（触手）（TEQUIP:90）
  if (era.get(`tequip:${target}:90`)) {
    if (!(era.get('maxbase:0:4') > 0)) {
      era.set('maxbase:0:4', 10000);
    }
    print_base_bar(
      '射精（触手）',
      era.get('base:0:4') || 0,
      era.get('maxbase:0:4') || 0,
    );
  }

  // :246-252 射精（死斗场・怪物）（TEQUIP:55）
  if (era.get(`tequip:${target}:55`)) {
    if (!(era.get('maxbase:0:4') > 0)) {
      era.set('maxbase:0:4', 10000);
    }
    print_base_bar(
      '射精（死斗场・怪物）',
      era.get('base:0:4') || 0,
      era.get('maxbase:0:4') || 0,
    );
  }

  // :253 CALL SHOW_EQUIP_1 —— 存根
  stub_line('SHOW_EQUIP_1', '装备一览', '随装备票');

  // :255-256 CALL SET_CLEAR_POINT：TFLAG:999 = LINECOUNT（设置清除点；这张票
  // 移植——引擎 LINECOUNT 的等价物 getLineCount 直通）
  era.set('tflag:999', era.getLineCount());
}

// BEGIN TRAIN 初始化链（run_train 步骤 3，先于首个 SHOW_STATUS）：重建
// 本会话的状态画面组件
on('EVENTTRAIN', () => {
  status_block = new ScreenBlock(() => draw_status_screen(era_flag.target));
  command_path_seen = false;
});

// 指令路径探针（步骤 11）：输入命中可执行指令即翻标志——含 @COMxx 未
// 实现的编号（引擎「重新要求输入」路径，原作同样整屏重画 @SHOW_STATUS）
on('EVENTCOM', () => {
  command_path_seen = true;
});

on('SHOW_STATUS', async () => {
  // 首绘兜底：未经 EVENTTRAIN 直发 SHOW_STATUS（如测试直驱）时惰性建块；
  // 真实流程恒经 EVENTTRAIN 重建（跨会话锚点作废）
  status_block ??= new ScreenBlock(() => draw_status_screen(era_flag.target));

  if (command_path_seen) {
    // 指令轮（含重复同指令）：追加绘制（原作 @SHOW_STATUS 本款是追加
    // 滚动，无 CLEARLINE）。就地重绘会清掉玩家还没读的指令结果（叙述/
    // 算式行在锚点跨度内）——「分发期输出必须被玩家看到再被重绘清掉」
    //（#73 确定）要求等键，而等键属叙述所属的指令模块（train-message/
    // SOURCE_CHECK，这张票边界外），状态画面侧不加每轮按键（工单事实 7）
    // 就只能不吃叙述。
    await status_block.draw();
  } else {
    // 无指令轮（无效输入回环）：锚点跨度内只有指令菜单与输入回显——
    // 都已被那一次输入消费，就地重绘（#73 锚点跨度；重绘只发生在玩家
    // 交互之后——本重入必经一次输入）。首绘（组件未画过）时 redraw
    // 等价 draw，不清屏、保住上方内容。未来 USERCOM 分支若输出子画面，
    // 其可见性归它自己的 stub_line_wait（#73 习语），不归本判据。
    await status_block.redraw();
  }
  command_path_seen = false;
});

module.exports = {
  STUBBED_CALLS,
  palam_level,
  print_palam,
};
