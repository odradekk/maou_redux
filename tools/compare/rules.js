/**
 * @file T18 输出比对·差异归因规则（issue #48）。
 *
 * #9 的定案：忽略规则每条都要注明理由——否则忽略规则会逐渐变成掩盖缺陷
 * 的地毯。规则只认「有名字的差异」：
 *   - version：黄金样本录自比 target/ 更早的构建（#9 勘误二），54/55/56/
 *     89/110 五个编号的指令菜单差异是构建漂移、不是移植缺陷；
 *   - stub：docs/stub-registry.md 已登记的待办（存根占位行、状态画面未
 *     移植的条段、COM_ABLE 未移植导致的按钮未过滤、SHOW_USERCOM 按钮组）；
 *   - 其余一律 unexplained——真缺陷候选，当次比对必须归零或开票处置。
 *
 * 规则表是**白名单**形态：命中才豁免，改一个字就失配变红，逼改动者有
 * 意识地同步本表（与 #60 豁免名单同一设计哲学）。
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

// —— 指令菜单的构建漂移（#9 勘误二 + 本次新查出）——
// 日志侧：放置PLAY=54、交谈=55、穿脱衣服=89；target 侧：野外PLAY=54、
// 放置PLAY=55、交谈=56、兽奸PLAY=89、穿脱衣服=110。两构建在这些编号上
// 必然对不齐，追它们没有意义。
const VERSION_SKEW_IDS = new Set([54, 55, 56, 89, 110]);

// —— 同族漂移的**标签移位**（这张票首跑比对新发现，勘误二「0-39 全部吻合」
//    的例外）：黄金样本 打屁股[39]（log:66），Train.csv 打屁股=40——target
//    在 39-53 段插过指令、其后编号整体 +1。按 (标签, 侧, 编号) 精确配对，
//    不放宽到裸编号（裸 40 会吞掉真正的 COM_ABLE 回归）。
const MENU_LABEL_SHIFT = [{ key: '打屁股', golden: 39, ere: 40 }];

// —— @SHOW_USERCOM 的按钮组标签（docs/stub-registry.md「指令菜单按钮渲染」
//    行：[100]-[990] 组未挂载）。golden 侧出现这些标签 = 已登记待办 ——
const USERCOM_BUTTON_LABELS = new Set([
  '能力表示',
  '污秽表示',
  '交代助手',
  '对换调教',
  '避孕套设定',
  '爱抚系过滤',
  '器具系过滤',
  '私处性交系过滤',
  '肛门性交系过滤',
  'ＳＭ系过滤',
  '调教菜单登录',
  '调教菜单表示',
  '调教菜单实行',
  '调教结束',
]);

// —— 存根占位行的自报形状（ere/utils/stub-line.js 与 page 内联占位）——
// 存根占位行自愿声明「尚未移植」并给出原作函数名/清单出处；本项目所有
// 占位行都含这个词，正文台词不含（output-lang-lock 同款标准）。
const STUB_TEXT_RE = /尚未移植/;

// —— 状态条待办的 golden 侧键名（SHOW_STATUS 存根登记行）——
//   体力/气力：LIFE_BAR / VITAL_BAR（待认领·状态画面）；
//   射精（你）：SHOW_STATUS 射精/母乳/触手槽条段（登记，随指令/装备票）。
const STUB_GAUGE_KEYS = new Set(['体力', '气力', '射精（你）']);

// —— golden 侧文本的成对差异（服装系统待办）——
//   TRAIN_MESSAGE_B 的服装前缀（PRINT_CLOTHTYPE_SPECIAL，登记随服装票）：
//   golden 带「隔着紧身衣＆裙甲、」前缀，ere 侧没有；ere 侧的裸文本与
//   golden 去前缀后逐字一致才豁免（成对豁免，单边不成立）。
const CLOTH_PREFIX = '隔着紧身衣＆裙甲、';
const STUB_TEXT_EXACT = new Set(['【紧身衣＆裙甲的姿态】']); // PRINT_CLOTHTYPE

// —— 范围 B（#161）：主菜单/存读档/日循环三段的归因。全部受 scope 守卫
//    （context.scope === 'B'，由 cli 的 --sample 传入）——调教段比对不带
//    scope，一条规则都不触发，既有 122 条差异的归因计数零变化 ——
//
// 与调教段归因的本质差异：这里的多数条目不是「待办存根」，而是**两侧
// 已知的形态偏离**（ere 引擎/架构与 Emuera 的交互模型差异，均有出处）：
//   - 按钮化：ere 的 printButton 独占一行且引擎拼 [N] 前缀（PR #30/#53
//     通则），Emuera 的 PRINTBUTTON/PRINTFORM 按钮可与其他文本同行——
//     menu 条目与 text 残段的切分位置不同；
//   - 编号复用：主菜单与存读档画面共用 100-102/200/300 等编号（返回/调教
//     同为 100），menu 集合比对按 val 配对时跨画面异名条目互相错位，产生
//     成对差异——两侧该编号的实际内容都在事件流里，错位只是配对算法的
//     副产品；
//   - 清行：ere 引擎在屏幕有按钮时拒收非按钮输入（05-interaction.md:144）
//     等处逼出的清行与原作 CLEARLINE 的对应关系见 replay-b.js 的观测面节。
const B_MAINMENU_LABELS = new Set([
  '调教',
  '能力显示',
  '场子',
  '地下城',
  '处刑',
  '迎击',
  '能力值提升',
  '贩卖奴隶',
  '购物',
  '换装',
  '实验室',
  '设施·设备',
  '召唤',
  '休息',
  '保存',
  '读取',
  '设定',
  '通信',
]);
const B_MAINMENU_VALS = new Set([
  100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 120, 199, 200,
  300, 777, 888,
]);
// 存读档画面的操作按钮（与主菜单共用编号 100/101/102/200/300）
const B_SAVELOAD_LABELS = new Set([
  '上一页',
  '下一页',
  '返回',
  '为故事命名',
  '删除存档',
  '确定',
  '取消',
]);
// 全角数字网格行（GEO_OUTPUT_2 的地图输出：全角数字/＠出入口/凹凸标记，
// 逗号分隔—— Ere 侧 GEO_OUTPUT_2 未移植，stub-registry 在案）
const B_MAP_GRID_RE = /^[０-９＠凹凸]+(,[０-９＠凹凸]+)+,$/;
// 版本行（伪Ver93.106立绘版 / 伪Ver0.0.1立绘版——版本轴重设，ADR-0006）
const B_VERSION_LINE_RE = /^伪Ver\d+\.\d+(\.\d+)?立绘版$/;

/**
 * TrainCommand.yml 的全部编号（ere 侧菜单条目的合法值域）。
 * 规则用：ere 侧多出来的按钮只有编号在册才可归因「COM_ABLE 未移植」；
 * 编号不在册（拼错/凭空）照样 unexplained。
 */
function load_traincommand_ids(
  repo_root = path.resolve(__dirname, '..', '..'),
) {
  const text = fs.readFileSync(
    path.join(repo_root, 'yml', 'TrainCommand.yml'),
    'utf8',
  );
  return new Set(
    [...text.matchAll(/"(.+)":\r?\n\s+id:\s*(\d+)/g)].map((m) => Number(m[2])),
  );
}

/**
 * 归因单条差异条目。
 *
 * @param {object} entry 差异条目（kind 同 normalize）
 * @param {'golden'|'ere'} side 条目所在侧
 * @param {object} context { traincommand_ids: Set<number>,
 *   counterpart?: 对侧同编号/同键条目（成对差异时给） }
 * @returns {{category: 'version'|'stub', reason: string} | null
 *   null = 无法归因（unexplained，真缺陷候选）}
 */
function classify_entry(entry, side, context) {
  // 范围 B（#161）的规则组先于调教段规则：scope 守卫保证调教段比对
  // （无 scope）零触发；范围 B 内编号与调教规则的重叠（110 等）也由
  // 先到先得消解——范围 B 样本里 110 是主菜单的实验室按钮
  if (context.scope === 'B') {
    const hit = classify_scope_b(entry, side, context);
    if (hit) {
      return hit;
    }
  }
  const tc_ids = context.traincommand_ids ?? load_traincommand_ids();

  if (entry.kind === 'menu') {
    const shift = MENU_LABEL_SHIFT.find(
      (s) => s.key === entry.key && s[side] === entry.val,
    );
    if (VERSION_SKEW_IDS.has(entry.val)) {
      return {
        category: 'version',
        reason: `指令编号 ${entry.val} 在黄金样本与 Train.csv 间漂移（#9 勘误二）`,
      };
    }
    if (shift) {
      return {
        category: 'version',
        reason: `标签移位：${shift.key} 在黄金样本是 ${shift.golden}、Train.csv 是 ${shift.ere}（勘误二「0-39 吻合」的例外，这张票实证）`,
      };
    }
    if (side === 'golden' && USERCOM_BUTTON_LABELS.has(entry.key)) {
      return {
        category: 'stub',
        reason: `@SHOW_USERCOM 按钮组未挂载（${entry.key}，docs/stub-registry.md）`,
      };
    }
    if (
      side === 'ere' &&
      tc_ids.has(entry.val) &&
      !USERCOM_BUTTON_LABELS.has(entry.key) &&
      // 编号与 golden 侧同一指令撞名（change 对）时必须由对侧规则归因：
      // golden 是按钮组标签 → 存根待办；否则同编号异名 = unexplained
      context.counterpart !== undefined &&
      USERCOM_BUTTON_LABELS.has(context.counterpart.key)
    ) {
      return {
        category: 'stub',
        reason: `触手系指令 ${entry.key} 未被 COM_ABLE 过滤（COM_ABLE 族未移植）`,
      };
    }
    if (
      side === 'ere' &&
      context.counterpart === undefined &&
      tc_ids.has(entry.val)
    ) {
      return {
        category: 'stub',
        reason: `指令 ${entry.key}(${entry.val}) 未被 COM_ABLE 过滤（COM_ABLE 族未移植，随各自指令票）`,
      };
    }
    return null;
  }

  if (
    entry.kind === 'gauge' &&
    side === 'golden' &&
    STUB_GAUGE_KEYS.has(entry.key)
  ) {
    return {
      category: 'stub',
      reason: `${entry.key}条未移植（LIFE_BAR/VITAL_BAR 或射精槽条段，docs/stub-registry.md）`,
    };
  }

  if (entry.kind === 'text') {
    if (side === 'ere' && STUB_TEXT_RE.test(entry.text)) {
      return {
        category: 'stub',
        reason:
          '存根占位行（ere/utils/stub-line.js 形状，docs/stub-registry.md）',
      };
    }
    if (side === 'golden' && STUB_TEXT_EXACT.has(entry.text)) {
      return {
        category: 'stub',
        reason: '服装类型显示未移植（PRINT_CLOTHTYPE，docs/stub-registry.md）',
      };
    }
    if (
      side === 'golden' &&
      entry.text.startsWith(CLOTH_PREFIX) &&
      context.counterpart?.kind === 'text' &&
      context.counterpart.text === entry.text.slice(CLOTH_PREFIX.length)
    ) {
      return {
        category: 'stub',
        reason:
          '服装前缀未移植（PRINT_CLOTHTYPE_SPECIAL，docs/stub-registry.md）',
      };
    }
    if (
      side === 'ere' &&
      context.counterpart?.kind === 'text' &&
      context.counterpart.text === CLOTH_PREFIX + entry.text
    ) {
      return {
        category: 'stub',
        reason: '同上：服装前缀差异的 ere 半边（成对豁免）',
      };
    }
  }

  // —— 范围 B（#161）：主菜单/存读档/日循环的规则组（独立函数，由
  //    classify_entry 在 scope 守卫下优先调用） ——
  return null;
}

/**
 * 范围 B（#161）的归因规则组：只在 context.scope === 'B'（cli --sample
 * 传入）时被 classify_entry 调用。规则依据见文件头的 B_* 常量注释。
 * @param {object} entry 差异条目
 * @param {'golden'|'ere'} side
 * @param {object} context { counterpart?: 对侧同 kind 条目,
 *   segment?: 'mainmenu'|'saveload'|'daycycle'（比对段，daycycle 的
 *   兜底规则用——该段 @EVENTTURNEND 整段未移植，ere 侧无任何日循环输出） }
 * @returns {{category: 'version'|'stub', reason: string} | null}
 */
function classify_scope_b(entry, side, context) {
  {
    if (entry.kind === 'text') {
      if (
        side === 'golden' &&
        / (<<|>>)$/.test(entry.text) &&
        context.counterpart?.kind === 'text' &&
        // 成对豁免：对侧是同一行去掉按钮后缀的形态（ere 按钮独占一行）
        context.counterpart.text === entry.text.replace(/ (<<|>>)$/, '')
      ) {
        return {
          category: 'stub',
          reason:
            '折叠按钮与文本同行（Emuera）vs ere 按钮独占一行（PR #53 通则）——golden 侧带按钮后缀',
        };
      }
      if (
        side === 'ere' &&
        context.counterpart?.kind === 'text' &&
        [' <<', ' >>'].some(
          (suffix) => context.counterpart.text === entry.text + suffix,
        )
      ) {
        return {
          category: 'stub',
          reason:
            '同上：按钮同行差异的 ere 半边（按钮本体已按 menu 条目比对，见 val 8/9 规则）',
        };
      }
      if (side === 'golden' && entry.text === '邪恶正在蔓延………') {
        return {
          category: 'stub',
          reason:
            'Emuera 启动横幅（_replace.csv:17 起動時簡略表示），ere 引擎无对应物（引擎差异，非移植缺陷）',
        };
      }
      if (B_VERSION_LINE_RE.test(entry.text)) {
        return {
          category: 'version',
          reason: `版本轴重设（ADR-0006/#135）：样本 ${entry.text} vs 移植版自算版本号`,
        };
      }
      if (side === 'golden' && entry.text === '兼容性修正中……') {
        return {
          category: 'stub',
          reason:
            '@SYSTEM_LOADEND 载入结束函数未移植（#136 曾判死代码——样本实证引擎在 LOADDATA 后自动调用，勘误见 #161；移植随缺陷票）',
        };
      }
      if (side === 'golden' && entry.text === '[---]') {
        return {
          category: 'stub',
          reason:
            '条件入口灰条未渲染（DRAW_MAINMENU 指令面板段 :208-319 未移植，docs/stub-registry.md）',
        };
      }
      if (side === 'golden' && entry.text === '温妮') {
        return {
          category: 'stub',
          reason:
            '主菜单调教目标名按钮未移植（DRAW_MAINMENU.ERB:100-145，随角色数据票）',
        };
      }
      if (
        side === 'golden' &&
        (entry.text === '▌调教目标 ▌助手' ||
          entry.text === '▌物品/技能 ▌持有陷阱 ▌地城概况 ▌地城日常')
      ) {
        return {
          category: 'stub',
          reason:
            '原作纯文本行，ere 侧按钮化（menu_button，#23；Emuera 同行排版 vs ere 按钮独占行，PR #53 通则）',
        };
      }
      if (side === 'golden' && entry.text.startsWith('技巧Lv：')) {
        return {
          category: 'stub',
          reason:
            '物品/技能面板未移植（DRAW_HAVEITEMS，docs/stub-registry.md；ere 侧为占位行）',
        };
      }
      if (
        side === 'golden' &&
        (entry.text.includes('振动宝石') || entry.text.includes('润滑液'))
      ) {
        return {
          category: 'stub',
          reason:
            '物品/技能面板未移植（DRAW_HAVEITEMS 的物品行，docs/stub-registry.md）',
        };
      }
      if (B_MAP_GRID_RE.test(entry.text)) {
        return {
          category: 'stub',
          reason:
            '2D 地图输出未移植（GEO_OUTPUT_2，@EVENTTURNEND 的 FLAG:502 分支，docs/stub-registry.md）',
        };
      }
      // 主菜单状态行：199 休息是存根（BEGIN TURNEND 出口待办），不推进
      // 日期/时段——ere 侧三版主菜单的状态行都停在第 7 日上午，golden 侧
      // 是 午前→午后→次日午前
      if (
        /^第\d+年 \d+月\d+日（第\d+日） (上午|下午) \(所持金：\d+ pts\.\)$/.test(
          entry.text,
        )
      ) {
        return {
          category: 'stub',
          reason:
            '主菜单状态行：199 休息存根不推进日期/时段（BEGIN TURNEND 出口待办，docs/stub-registry.md）——ere 侧停在第 7 日上午',
        };
      }
      if (
        side === 'golden' &&
        entry.text === '你专心于内政，稍作了休息……（税金+5%）'
      ) {
        return {
          category: 'stub',
          reason:
            '休息（199）未移植：BEGIN TURNEND 出口待办（page-shop.js 的 199 分支，docs/stub-registry.md）',
        };
      }
      if (side === 'golden' && entry.text.includes('召唤出')) {
        return {
          category: 'stub',
          reason: '日循环的怪物召唤段未移植（@EVENTTURNEND，随回合结算票）',
        };
      }
      if (
        side === 'golden' &&
        entry.text === '出于对魔王的恐惧，勇者没有出现。'
      ) {
        return {
          category: 'stub',
          reason: '日循环的勇者判定段未移植（@EVENTTURNEND，随回合结算票）',
        };
      }
      if (side === 'golden' && entry.text.includes('売春判定')) {
        return {
          category: 'stub',
          reason: '日循环的売春判定段未移植（@EVENTTURNEND，随回合结算票）',
        };
      }
      if (side === 'ere' && entry.text === '----') {
        return {
          category: 'stub',
          reason:
            '读档界面空槽降为纯文本（page-save-load.js 有意偏离：原作 CHKDATA 拦下 = 不可选，ere 侧不按钮化——存档界面空槽仍是灰色按钮）',
        };
      }
      if (side === 'ere' && entry.text.startsWith('ERA魔王 年度版')) {
        return {
          category: 'stub',
          reason:
            '标题行输出（page-title.js 图片缺席的回退路径，#19；原作标题由图片承载、该行被注释）',
        };
      }
      // daycycle 段兜底（放具体规则之后）：@EVENTTURNEND 整段未移植
      //（199 存根），ere 侧无任何日循环输出——golden 侧无对侧的文本
      //（日事件/素质条件列表/星号分割线等）统一归此类。仅限无对侧条目：
      // ere 侧一旦输出了对侧（移植推进），该行自动脱离本规则
      if (
        side === 'golden' &&
        context.segment === 'daycycle' &&
        context.counterpart === undefined
      ) {
        return {
          category: 'stub',
          reason:
            '日循环（@EVENTTURNEND）未移植：199 存根无输出（docs/stub-registry.md 的 BEGIN TURNEND 行）',
        };
      }
      // 命名流程三行：ere 侧存档画面循环尾统一清行（滚动视图决策，
      // page-save-load.js 文件头「界面形态说明」）把命名行清掉了——原作
      // 命名后不清行（SYSTEM_DATA.ERB:212 被注释）、直接堆叠重画，黄金侧
      // 三行都在。已知形态差，非缺陷
      if (
        side === 'golden' &&
        (entry.text === '请输入一个名称故事：' ||
          entry.text === '对拍样本' ||
          entry.text.startsWith('将故事命名为'))
      ) {
        return {
          category: 'stub',
          reason:
            '故事命名流程行：ere 侧存档画面循环尾统一清行（滚动视图决策）vs 原作命名后堆叠（:212 注释掉 CLEARLINE）——行在 ere 观测面被清',
        };
      }
    }
    if (entry.kind === 'input' && side === 'ere' && entry.text === '0') {
      return {
        category: 'stub',
        reason:
          '标题读档分支的 CLEARLINE 1（清输入回显行）未镜像（#19 时认为 ere 输入无回显行；#68 实证引擎回显计行——补镜像随小票）',
      };
    }
    if (entry.kind === 'image' && side === 'golden') {
      return {
        category: 'stub',
        reason:
          '图片输出无 ere 对应（resource: false 未启用资源 + 主菜单立绘段未移植，docs/stub-registry.md）',
      };
    }
    if (entry.kind === 'menu') {
      if (entry.val === 8 || entry.val === 9) {
        return {
          category: 'stub',
          reason:
            '标题折叠按钮独占一行（PR #53 通则；Emuera 按钮与文本同行，ere 按钮逐行）',
        };
      }
      if ([496, 497, 500, 501, 504, 505].includes(entry.val)) {
        return {
          category: 'stub',
          reason: `主菜单入口按钮化（menu_button，#23；原作 ${entry.key} 为纯文本）`,
        };
      }
      if (B_MAINMENU_LABELS.has(entry.key) && B_MAINMENU_VALS.has(entry.val)) {
        return {
          category: 'stub',
          reason:
            `主菜单指令面板（DRAW_MAINMENU :208-319）：${entry.key}[${entry.val}] 未渲染` +
            (side === 'golden'
              ? '（ere 侧占位行）'
              : '（跨画面编号复用的配对错位半边）'),
        };
      }
      if (B_SAVELOAD_LABELS.has(entry.key)) {
        return {
          category: 'stub',
          reason:
            `存读档画面按钮 ${entry.key}[${entry.val}]：跨画面编号复用（主菜单/存读档共用 100-102/200/300）` +
            '的集合配对错位——两侧实际内容都在流内，次数差即真差异',
        };
      }
      if (side === 'golden' && entry.key === '----') {
        return {
          category: 'stub',
          reason:
            '空槽 [N] ----：读档界面的 ere 半边是纯文本（page-save-load.js 有意偏离：不可选即等价）——读档空槽不进 menu 集合，还会把存档界面同编号的空槽组错位一档（错位尾巴按 <TS> 备注规则归因）',
        };
      }
      if (typeof entry.key === 'string' && entry.key.startsWith('<TS> ')) {
        return {
          category: 'stub',
          reason:
            '存档备注按钮（正文 = 时间戳 + @SAVEINFO 备注）：两侧正文一致、集合按槽号配对时因读档空槽纯文本化（见 ---- 规则）错位一档的尾巴条目',
        };
      }
    }
  }

  return null;
}

module.exports = {
  B_MAINMENU_LABELS,
  B_SAVELOAD_LABELS,
  CLOTH_PREFIX,
  MENU_LABEL_SHIFT,
  STUB_GAUGE_KEYS,
  STUB_TEXT_EXACT,
  STUB_TEXT_RE,
  USERCOM_BUTTON_LABELS,
  VERSION_SKEW_IDS,
  classify_entry,
  load_traincommand_ids,
};
