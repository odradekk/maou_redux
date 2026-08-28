/**
 * @file 地下城情报界面（情报向）：@DUNGEON_INFO2 的主循环 + @ENEMY_COMPARE
 * 比较器 + @ENEMY_EXIST2 部下一行的 1:1 移植（issue #180，阶段 3 H11）。
 *
 * 源: target/ERB/迷宮/DUNGEON_INFO2.ERB  @DUNGEON_INFO2（:2-492）/
 *     @ENEMY_COMPARE（:496-541，#FUNCTION 比较器）/ @ENEMY_EXIST2（:545-645）
 *
 * 入口：主菜单 [102] 地下城（SHOP ver1.0.2.ERB:109 的 CALL DUNGEON_INFO2，
 * ere 侧 page-shop.js usershop 的 102 分支）。
 *
 * 与 page-dungeon-setup.js 的 @DUNGEON_INFO 是**两个不同的界面**（#180 票面
 * 裁定，勿合并）：本文件是情报向（三标签页：陷阱 / 设施 / 宝物 + 部下总览），
 * 那边是建设向（逐层设定的列表界面 + 2D 模式分流）。@ENEMY_EXIST 与
 * @ENEMY_EXIST2 同理成对（两套部下显示，显示形态与排序都不同）。
 *
 * 原作 → ere 的映射（本文件语义依据集中在此）：
 *   - REDRAW 0/1（:12/:491，抑制逐行重绘防闪烁）无 ere 对应语义，不镜像
 *     （page-main-menu.js 同款先例）；
 *   - LINE_COUNT 预计算块（:20-46）与 DISPLAY_LINE 计数（:18 及全文）的唯一
 *     目的是算 CLEARLINE 的清行数（下半区高度可变，先算空白填充对齐）——
 *     ere 侧行数由 ScreenBlock 运行时测量（#73 裁定），整块省略；
 *   - 原作 PRINTFORM 拼行的多按钮布局（每层一行：阶层钮 + 三列陷阱）→
 *     一行一钮（ere 的按钮独占一行，#73 两条 UI 结论的排版近似；功能面
 *     等价——每个可输入项都是按钮，快捷键集合不变）；
 *   - %名,18,LEFT% 一类的等宽填充省略：引擎 showAcc 会把按钮正文里的连续
 *     空白折叠成一个空格（PR #30），填充不 survive 渲染；
 *   - 按钮 [100] 的状态文案「關閉/開啟」按 #60 归一为简体「关闭/开启」；
 *   - 局部变量 DISPLAY_FLAG/SELECT_FLAG/DIALOGUE 在原作是跨调用持久的
 *     #DIM（:483-488 尾部手工复位），ere 侧是函数局部变量，天然复位；
 *   - @ENEMY_EXIST2 尾部 :632 的 `IF X == 10` 读的是调用方（@DUNGEON_INFO2
 *     部下一览 :454）设置的全局 X——与实参同一个值（原作笔误式全局读，
 *     行为无差），ere 侧参数化 floor；
 *   - KAI_LIST = RESULT（:439）是死写（全库零读者），省略。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { menu_button } = require('#/page/components/menu-button');
const { ScreenBlock } = require('#/page/components/screen-block');
const { stub_line_wait } = require('#/utils/stub-line');
const { item_name, monstername } = require('#/dungeon/monster-data');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['MONSTER_SETUP'];

// :65/:87/:107 SETCOLOR 128,255,0（选中项绿色）
const COLOR_SELECTED = 'rgb(128, 255, 0)';
// :67/:89/:109 SETCOLORBYNAME RoyalBlue（未选中列蓝）
const COLOR_ROYAL_BLUE = 'royalblue';
// :132 SETCOLOR 128,128,128（三页全未选时下半区置灰）
const COLOR_DIM = 'rgb(128, 128, 128)';
// :603 SETCOLOR 200,200,100（逃走中）
const COLOR_FLEE = 'rgb(200, 200, 100)';
// :607/:624 SETCOLOR 100,255,255（迎击中）
const COLOR_INTERCEPT = 'rgb(100, 255, 255)';
// :611/:622 SETCOLOR 255,100,100（侵攻中）
const COLOR_INVASION = 'rgb(255, 100, 100)';
// :240-241 SETCOLOR 255,255,0（@ENEMY_EXIST 同款家族色，部下名黄）
const COLOR_SUBORDINATE = 'rgb(255, 255, 0)';

/** FLAG:N 读：未声明下标 undefined → 0 兜底（#13） */
function flag_get(i) {
  return era.get(`flag:${i}`) || 0;
}

/** FLAG:N 写 */
function flag_set(i, v) {
  era.set(`flag:${i}`, v);
}

/** ITEM:N 读（库存数） */
function item_count(i) {
  return era.get(`item:${i}`) || 0;
}

/** CFLAG:cid:N 读 */
function cflag_get(cid, i) {
  return era.get(`cflag:${cid}:${i}`) || 0;
}

/** SAVESTR:cid（部下显示名）——dungeon.js name_of 同款寻址（#5 决议） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/**
 * @MONSTER_SETUP 存根（怪物相關/MONSTER_DATA.ERB:2479；怪物票）：把部下
 * 怪物设置到防卫位置。调用点在本界面部下一览的 [100-199] 输入分发
 * （:472），返回后 GOTO PRINT 重画；原作返回值此处不消费，存根 0 自洽。
 * @param {number} monster_id 怪物识别号（原作 ARG = RESULT；存根不消费）
 * @returns {Promise<number>} 原作 RETURN（存根恒 0）
 */
// eslint-disable-next-line no-unused-vars
async function monster_setup(monster_id) {
  await stub_line_wait(
    'MONSTER_SETUP',
    '怪物设置（把怪物配置到防卫位置）',
    '随怪物票',
  );
  return 0;
}

/**
 * @ENEMY_COMPARE（:496-541，#FUNCTION）：部下列表的排序比较器。
 *
 * 键序（依次）：所在阶层（CFLAG:x:501，低层靠前）→ 状态类（勇者奴隶的
 * 队长 / 迎击者本体）→ 队伍攻略度（CFLAG:x:502）→ 队长优先 → 队员次序
 * （CFLAG:x:531）。
 *
 * @param {number} a 角色 a（原作 ARG）
 * @param {number} b 角色 b（原作 ARG:1）
 * @returns {number} -1 / 0 / 1（a 排前 / 同位 / b 排前）
 */
function enemy_compare(a, b) {
  // :501-502 SIF ARG == ARG:1 → RETURNF 0
  if (a === b) {
    return 0;
  }
  // :505-506 比较阶层
  if (cflag_get(a, 501) !== cflag_get(b, 501)) {
    return cflag_get(a, 501) < cflag_get(b, 501) ? -1 : 1;
  }
  // :508-511 状态归类：迎击中（CFLAG:1 == 3）且勇者(T)配下（CFLAG:500 == 4，
  // 即 E 表 LINE == 4 的列）视为「潜入中 2」，其余取 CFLAG:1 原值
  const state_a =
    cflag_get(a, 1) === 3 && cflag_get(a, 500) === 4 ? 2 : cflag_get(a, 1);
  const state_b =
    cflag_get(b, 1) === 3 && cflag_get(b, 500) === 4 ? 2 : cflag_get(b, 1);
  // :514-528 两类混合时取各自的队长（CFLAG:x:533）比较；两个迎击者取本体；
  // 两个勇者取队长
  let ref_a;
  let ref_b;
  if (state_a !== state_b) {
    ref_a = state_a === 2 ? cflag_get(a, 533) : a;
    ref_b = state_b === 2 ? cflag_get(b, 533) : b;
  } else if (state_a === 3) {
    ref_a = a;
    ref_b = b;
  } else {
    ref_a = cflag_get(a, 533);
    ref_b = cflag_get(b, 533);
  }
  // :531-532 比较两支队伍的攻略度
  if (cflag_get(ref_a, 502) !== cflag_get(ref_b, 502)) {
    return cflag_get(ref_a, 502) < cflag_get(ref_b, 502) ? -1 : 1;
  }
  // :535-538 队长优先
  if (ref_a === a) {
    return -1;
  }
  if (ref_b === b) {
    return 1;
  }
  // :541 两个队员：a 是 b 的队长则 b 靠前，反之 a 靠前
  return cflag_get(ref_a, 531) === a ? -1 : 1;
}

/**
 * @ENEMY_EXIST2（:545-645）：打印一层楼的部下（勇者侧）按队伍分组的一行。
 * 筛选：CFLAG:x:501 == floor 且（侵攻 2 / 迎击 3 / TALENT:x:221 的奴隶），
 * 排序经 enemy_compare 插入。纯输出、不输入。
 *
 * @param {number} floor 阶层（1-9；10 = 近卫层——尾部追加护卫中名单）
 * @returns {void}
 */
async function enemy_exist2(floor) {
  // :553-554 VARSET LOCAL + L_LEN = 0（插入排序的缓冲区与长度）
  const sorted = [];
  let max_name_len = 0;
  // :557-580 筛选并排序
  for (const cid of era.getAddedCharacters()) {
    // 原作 FOR L_CHAR, 1, CHARANUM 从 1 起（0 = 魔王不在其列）
    if (cid < 1) {
      continue;
    }
    // :559-560 SIF ARG == 10 → CONTINUE（近卫层不走楼层筛选）
    if (floor === 10) {
      continue;
    }
    // :562-563 不在当前阶层
    if (cflag_get(cid, 501) !== floor) {
      continue;
    }
    // :565-566 不在侵攻/迎击/奴隶（TALENT:x:221 = 勇者奴隶素质）
    const is_slave = (era.get(`talent:${cid}:221`) || 0) !== 0;
    const state = cflag_get(cid, 1);
    if (
      (state !== 2 && state !== 3 && !is_slave) ||
      (((state !== 0 && floor === 10) || (state !== 3 && state !== 2)) &&
        is_slave)
    ) {
      continue;
    }
    const name = name_of(cid);
    max_name_len = Math.max(name.length, max_name_len);
    // :571-579 插入排序（enemy_compare < 0 插前）
    let inserted = false;
    for (let i = 0; i < sorted.length; i += 1) {
      if (enemy_compare(cid, sorted[i]) < 0) {
        sorted.splice(i, 0, cid);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      sorted.push(cid);
    }
  }
  // :581-628 逐个打印：同队（CFLAG:533 相同）同行——原作靠「新队伍才
  // PRINTL」把一队收在一行，ere 的 print 一次一行，按队归并片段数组
  let last_char = 0;
  let row_fragments = null;
  for (const cid of sorted) {
    // :584 L_LAST = CFLAG:L_CHAR:533（用上一轮角色的队长，再更新 L_CHAR）
    const last_team = cflag_get(last_char, 533);
    last_char = cid;
    // :591 同一只队伍中（上一轮队长的队长 == 本轮的队长）
    const same_team =
      last_team > 0 && cflag_get(last_team, 533) === cflag_get(cid, 533);
    if (!same_team) {
      // :595 新的队伍开头（上一行在此落行）
      if (row_fragments !== null) {
        era.print(row_fragments);
      }
      row_fragments = [];
      // :602-618 新的一行开头：状态前缀与颜色
      let prefix_color = null;
      let prefix = null;
      if (cflag_get(cid, 507) === 1) {
        prefix_color = COLOR_FLEE;
        prefix = '[逃走中]\u3000';
      } else if (cflag_get(cid, 1) === 3) {
        prefix_color = COLOR_INTERCEPT;
        prefix = '[迎击中]\u3000';
      } else if (cflag_get(cid, 1) === 2) {
        prefix_color = COLOR_INVASION;
        // :613-617 侵攻中且 CFLAG:520 > 0 → 「{520+1}F侵攻」（推进层数显示）
        prefix =
          cflag_get(cid, 520) > 0
            ? `[${cflag_get(cid, 520) + 1}F侵攻]\u3000`
            : '[侵攻中]\u3000';
      }
      if (prefix !== null) {
        row_fragments.push({ content: prefix, color: prefix_color });
      }
    }
    // :620-625 更换颜色（勇者红 / 迎击青）
    let body_color = null;
    if (cflag_get(cid, 1) === 2) {
      body_color = COLOR_INVASION;
    } else if (cflag_get(cid, 1) === 3) {
      body_color = COLOR_INTERCEPT;
    }
    // :627 %SAVESTR:L_CHAR,MAX_NAME_LEN,LEFT%（名字对齐到最长名）
    row_fragments.push({
      content: `${name_of(cid).padEnd(max_name_len, ' ')}\u3000`,
      ...(body_color ? { color: body_color } : {}),
    });
  }
  // :629-630 最后一支队伍的结尾换行 + RESETCOLOR（ere 的片段色不残留，免）
  if (row_fragments !== null) {
    era.print(row_fragments);
  }
  // :632-645 近卫层（floor == 10）：追加护卫中名单（EX_TALENT:x:1 且未占用）
  if (floor === 10) {
    for (const cid of era.getAddedCharacters()) {
      // 原作 FOR COUNT, 0, CHARANUM 从 0 起
      if (
        cflag_get(cid, 1) === 0 &&
        (era.get(`ex_talent:${cid}:1`) || 0) !== 0
      ) {
        const fragments = [
          { content: '[护卫中]\u3000', color: COLOR_SUBORDINATE },
          { content: `[${cid}]`, color: COLOR_SUBORDINATE },
          // :637 %SAVESTR:COUNT,MAX_NAME_LEN,LEFT%
          { content: name_of(cid).padEnd(max_name_len, ' ') },
        ];
        // :638-641 TALENT:200-211 的素质名依次追加
        for (let t = 200; t < 212; t += 1) {
          if ((era.get(`talent:${cid}:${t}`) || 0) !== 0) {
            fragments.push({
              content: String(era.get(`talentname:${t}`) ?? ''),
            });
          }
        }
        era.print(fragments);
      }
    }
  }
}

/**
 * 部下状态总览（@DUNGEON_INFO2 的 $PRINT 块 :421-477，输入面 [100-199] +
 * [999]）：打印所选区段的楼层头 + 怪物库存 + ENEMY_EXIST2 的勇侧行，等输入。
 * 原作 GOTO PRINT 的重画收在调用方（主循环 continue 触发 ScreenBlock.redraw
 * 之前，先经本函数重建画面）。
 *
 * @param {number} kai_result 主菜单输入（10-14：总览 / 1-3 层 / 4-6 层 /
 *   7-9 层 / 近卫兵）
 * @returns {Promise<number>} 部下一览的输入结果（100-199 = 选怪物，999 = 返回）
 */
async function print_subordinates(kai_result) {
  // :421-424 横幅
  era.print('******************');
  era.print('地下城内的部下');
  era.print('******************');
  // :426-438 扫描区段：Z 起点与 R 剩余格数（KAI_RESULT 10 = 全 100 格）
  let z = 0;
  let r = 100;
  if (kai_result >= 11 && kai_result <= 20) {
    r = 30;
    if (kai_result === 12) {
      z = 30;
    } else if (kai_result === 13) {
      z = 60;
    } else if (kai_result === 14) {
      r = 10;
      z = 90;
    }
  }
  // :440-465 REPEAT 100：怪物槽 Z = 层*10 + 格（A = Z + 100 即 Item.yml 的
  // 怪物库存段 100-199），每层第一格画楼层头
  let floor = 0;
  for (let i = 0; i < 100 && z < 100 && r > 0; i += 1) {
    if (z % 10 === 0) {
      floor = z / 10 + 1;
      // :447 WAIT（楼层头前等键）
      await era.waitAnyKey();
      era.drawLine();
      // :449-453 第 10 段显示「近卫兵」
      if (floor !== 10) {
        era.print(`第${floor}阶层`);
      } else {
        era.print('近卫兵');
      }
      await enemy_exist2(floor);
    }
    const a = z + 100;
    const b = item_count(a);
    if (b > 0) {
      // :460 PRINTFORML [{A}] {B}只%MONSTERNAME(A)%——纯文本 + 自由输入
      //（原作形态）。**不**改按钮（PR #53 通则在此处的例外）：本界面的
      // 逐层 WAIT（:447）在 ere 引擎里会清空按钮白名单（任何一次成功
      // 回传都把 rule 置空，waitAnyKey 内部走 input({any:true})），最后
      // 一个 WAIT 之前打印的按钮会整段拒收——怪物行改按钮会让早段怪物
      // 在实机上不可选。纯文本 + 无按钮轮 = 引擎的自由输入通道（dev-
      // guides/05-interaction.md），键盘键入 [A] 与 [999] 全程可达，
      // 1:1 于 Emuera 的键盘交互。
      era.print(`[${a}] ${b}只${monstername(a)}`);
    }
    z += 1;
    r -= 1;
  }
  era.drawLine();
  // :468 PRINTL [999] 返回——同上，纯文本（不打按钮，保住自由输入通道）
  era.print('[999] 返回');
  // :469 INPUT
  return era.input();
}

/**
 * @DUNGEON_INFO2（:2-492）：地下城情报界面主循环。
 *
 * 三标签页（DISPLAY_FLAG 0/1/2 = 陷阱/设施/宝物，[900]-[902] 切换）；每页
 * 上半区是 9 层的布置矩阵（选中位图 SELECT_FLAG[0..2]，每层一位，行/列/
 * 单元/全部四类选择），下半区是当前页的库存列表或设施确认对话；尾部
 * [10]-[14] 部下总览、[100] 怪物迎击开关、[999] 返回。
 *
 * @returns {Promise<void>} 原作无 RESULT 消费（CALL 方即主菜单分发）
 */
async function dungeon_info2() {
  // :3-9 #DIM 局部（DISPLAY_FLAG/SELECT_FLAG/COMPARE_BIT/DIALOGUE——原作
  // 跨调用持久 + :483-488 尾部复位，ere 侧函数局部天然复位）
  let display_flag = 0;
  const select_flag = [0, 0, 0];
  // DIALOGUE[0] = 选中的设施号（0 = 通路）；DIALOGUE[1] = 对话状态
  //（0 = 无对话 / >0 = 待确认的层数 / -1 = 未选对象 / -2 = 钱不够）
  const dialogue = [0, 0];
  const screen = new ScreenBlock(async () => {
    // :15 CUSTOMDRAWLINE =（等号线）
    era.drawLine({ isSolid: true });
    // :48-52 FONTBOLD + 三枚标签页按钮（未选中的调暗；▌ 前缀归 menu_button。
    // FONTBOLD 的加粗无 printButton 通道，省略）
    menu_button('陷 阱', 900, display_flag !== 0);
    menu_button('设 施', 901, display_flag !== 1);
    menu_button('戒 指', 902, display_flag !== 2);
    // :54-123 九层的布置矩阵
    let compare_bit = 1;
    for (let l = 0; l < 9; l += 1) {
      // :56 阶层面板按钮（行选择：110/120/.../190）
      era.printButton(`第${l + 1}阶层`, (l + 1) * 10 + 100);
      if (display_flag === 0) {
        // :58-79 陷阱：三列各一枚单元按钮（111-113/121-123/.../191-193）
        for (let c = 0; c < 3; c += 1) {
          const x = l + c * 10 + 300;
          const y = flag_get(x);
          const color =
            (select_flag[c] & compare_bit) !== 0
              ? COLOR_SELECTED
              : COLOR_ROYAL_BLUE;
          let body;
          if (y <= 0) {
            body = '陷阱：无';
          } else if (item_count(y) > 0) {
            body = `陷阱：${item_name(y)}(${item_count(y)})`;
          } else {
            // :75-76 库存查无 → 显示无并清槽（-1）
            body = '陷阱：无';
            flag_set(x, -1);
          }
          era.printButton(body, (l + 1) * 10 + c + 101, { color });
        }
      } else if (display_flag === 1) {
        // :81-99 设施：单值槽（无单元按钮，阶层面板按钮即选择器）
        const x = l + 350;
        const y = flag_get(x);
        const color =
          (select_flag[0] & compare_bit) !== 0
            ? COLOR_SELECTED
            : COLOR_ROYAL_BLUE;
        let body;
        if (y <= 0) {
          body = '设施：通路';
        } else if (y >= 500 && y <= 507) {
          body = `设施：${item_name(y)}`;
        } else {
          // :96-97 越界值归通路（0）
          body = '设施：通路';
          flag_set(x, 0);
        }
        era.print([{ content: body, color }]);
      } else {
        // :101-119 宝物：单值槽
        const x = l + 340;
        const y = flag_get(x);
        const color =
          (select_flag[0] & compare_bit) !== 0
            ? COLOR_SELECTED
            : COLOR_ROYAL_BLUE;
        let body;
        if (y <= 0) {
          body = '宝箱：无';
        } else if (item_count(y) > 0) {
          body = `宝箱：${item_name(y)}(${item_count(y)})`;
        } else {
          body = '宝箱：无';
          flag_set(x, -1);
        }
        era.print([{ content: body, color }]);
      }
      compare_bit *= 2;
    }
    // :124-128 批量选择按钮
    if (display_flag === 0) {
      era.printButton('全部陷阱', 200);
      era.printButton('陷阱Ａ', 201);
      era.printButton('陷阱Ｂ', 202);
      era.printButton('陷阱Ｃ', 203);
    } else {
      era.printButton('全部阶层', 200);
    }
    // :131-132 三页全未选时下半区置灰（颜色由后续行携带，此处无独立动作）
    const none_selected =
      select_flag[0] === 0 && select_flag[1] === 0 && select_flag[2] === 0;
    // :134-246 下半区（当前页的库存 / 确认对话）
    if (display_flag === 0) {
      // 陷阱库存列表（:136-166）
      if (dialogue[1] === 0) {
        // :139 [  0] 解除陷阱
        era.printButton(
          '解除陷阱',
          0,
          none_selected ? { color: COLOR_DIM } : undefined,
        );
        for (let i = 60; i < 89; i += 1) {
          if (item_count(i) > 0) {
            // :149 %ITEMNAME%,16,LEFT%（{数,2}）——按钮正文即库存项
            era.printButton(
              `${item_name(i)}（${item_count(i)}）`,
              i,
              none_selected ? { color: COLOR_DIM } : undefined,
            );
          }
        }
      } else if (dialogue[1] === -1) {
        // :153-159 未选对象提示（等键后复位，主循环处理）
        era.print([
          { content: '\u3000\u3000* 还没有选择对象！！ *', color: COLOR_DIM },
        ]);
      }
    } else if (display_flag === 1) {
      if (dialogue[1] > 0) {
        // :171-180 设施确认对话
        if (dialogue[0] !== 0) {
          era.print(
            `\u3000在 ${dialogue[1]} 个阶层修建 ${item_name(dialogue[0])}`,
          );
          era.print(
            `\u3000\u3000合计花费 ${10000 * dialogue[1]}p，确认执行吗？`,
          );
        } else {
          era.print(`\u3000在 ${dialogue[1]} 个阶层修建 通路`);
          era.print('\u3000\u3000合计花费\u3000    0p ，确认执行吗？');
        }
        era.printButton('好的', 0);
        era.printButton('不要', 1);
      } else if (dialogue[1] === -1) {
        era.print([
          { content: '\u3000\u3000* 还没有选择对象！！ *', color: COLOR_DIM },
        ]);
      } else if (dialogue[1] === -2) {
        // :187-192 钱不够提示
        era.print([
          { content: '\u3000\u3000* 钱不够！！ *', color: COLOR_DIM },
        ]);
      } else {
        // :193-204 设施库存列表：[  0] 通路 + [500-507]
        era.printButton(
          '通路',
          0,
          none_selected ? { color: COLOR_DIM } : undefined,
        );
        for (let i = 500; i < 508; i += 1) {
          era.printButton(
            item_name(i),
            i,
            none_selected ? { color: COLOR_DIM } : undefined,
          );
        }
      }
    } else {
      // 宝物库存列表（:214-245）
      if (dialogue[1] === 0) {
        era.printButton(
          '取下宝物',
          0,
          none_selected ? { color: COLOR_DIM } : undefined,
        );
        for (let i = 300; i < 321; i += 1) {
          if (item_count(i) > 0) {
            era.printButton(
              `${item_name(i)}（${item_count(i)}）`,
              i,
              none_selected ? { color: COLOR_DIM } : undefined,
            );
          }
        }
      } else if (dialogue[1] === -1) {
        era.print([
          { content: '\u3000\u3000* 还没有选择对象！！ *', color: COLOR_DIM },
        ]);
      }
    }
    // :249-252 尾部指令区
    era.printButton('部下状态总览', 10);
    era.printButton('1～3层', 11);
    era.printButton('4～6层', 12);
    era.printButton('7～9层', 13);
    era.printButton('近卫兵', 14);
    // :251 PRINTPLAIN 显示部下（尾部全角空格填充只服务原作对齐，ere 版式
    // 已不同，取语义文本）
    era.print('显示部下');
    // :252 [100]怪物迎击 现在开启/关闭（FLAG:5 位 4 toggle；#60 归一简体）
    era.printButton(
      `怪物迎击\u3000现在：${(flag_get(5) & 16) !== 0 ? '关闭' : '开启'}`,
      100,
    );
    era.drawLine();
    era.printButton('- 返回', 999);
  });

  // :17 WHILE RESULT != 999
  let result = 0;
  while (result !== 999) {
    await screen.redraw();
    // :256-262 注意书き表示時は入力を無視（DIALOGUE:1 < 0 → 等键复位重画）
    if (dialogue[1] < 0) {
      await era.waitAnyKey();
      dialogue[1] = 0;
      continue;
    }
    result = await era.input();
    // :265-320 陷阱設定時の入力判定
    if (display_flag === 0) {
      if (result > 100 && result < 204) {
        // :268 COMPARE_BIT = 1 << RESULT/10 - 11（110→位0 ... 190→位8）
        const compare_bit = 1 << (Math.floor(result / 10) - 11);
        if (result === 200) {
          // :270-279 全指定：三列全开（511）或全关
          if (
            select_flag[0] === 511 &&
            select_flag[1] === 511 &&
            select_flag[2] === 511
          ) {
            select_flag[0] = 0;
            select_flag[1] = 0;
            select_flag[2] = 0;
          } else {
            select_flag[0] = 511;
            select_flag[1] = 511;
            select_flag[2] = 511;
          }
        } else if (result % 10 === 0) {
          // :281-291 行指定：三列同层翻转
          const all_on =
            (select_flag[0] & compare_bit) !== 0 &&
            (select_flag[1] & compare_bit) !== 0 &&
            (select_flag[2] & compare_bit) !== 0;
          if (all_on) {
            select_flag[0] ^= compare_bit;
            select_flag[1] ^= compare_bit;
            select_flag[2] ^= compare_bit;
          } else {
            select_flag[0] |= compare_bit;
            select_flag[1] |= compare_bit;
            select_flag[2] |= compare_bit;
          }
        } else if (result > 200) {
          // :293-298 列指定：201/202/203 → SELECT_FLAG[0..2] 全开（511）或全关
          const col = result - 201;
          select_flag[col] = select_flag[col] === 511 ? 0 : 511;
        } else if (result % 10 < 4) {
          // :300-301 単独指定：111-113 等 → 对应列的该层翻转
          select_flag[(result % 10) - 1] ^= compare_bit;
        }
      } else if (
        result === 0 ||
        (result >= 60 && result < 89 && item_count(result) > 0)
      ) {
        // :304-319 陷阱の指定：写入所有选中单元（0 = 解除 → -1）
        if (
          select_flag[0] === 0 &&
          select_flag[1] === 0 &&
          select_flag[2] === 0
        ) {
          dialogue[1] = -1;
        } else {
          let compare_bit = 1;
          for (let l = 0; l < 9; l += 1) {
            for (let c = 0; c < 3; c += 1) {
              if ((select_flag[c] & compare_bit) !== 0) {
                flag_set(l + c * 10 + 300, result === 0 ? -1 : result);
              }
            }
            compare_bit *= 2;
          }
        }
      }
    } else if (display_flag === 1) {
      // :322-376 设施設定時の入力判定
      if (dialogue[1] > 0) {
        // :324-346 确认对话的输入
        if (result === 0) {
          // :325 通路免费；设施 10000p/层（MONEY 与 EX_FLAG:4444 双减 :334-335）
          if (
            (era_flag.money >= 10000 * dialogue[1] && dialogue[0] !== 0) ||
            dialogue[0] === 0
          ) {
            let compare_bit = 1;
            for (let i = 350; i < 359; i += 1) {
              if ((select_flag[0] & compare_bit) !== 0) {
                flag_set(i, dialogue[0]);
              }
              compare_bit *= 2;
            }
            if (dialogue[0] !== 0) {
              era_flag.money -= 10000 * dialogue[1];
              era_exflag.legit_money -= 10000 * dialogue[1];
            }
            select_flag[0] = 0;
            dialogue[0] = 0;
            dialogue[1] = 0;
          } else {
            dialogue[1] = -2;
          }
        } else if (result === 1) {
          dialogue[0] = 0;
          dialogue[1] = 0;
        }
        continue;
      }
      if (result > 100 && result < 200) {
        // :352-353 単独指定（阶层面板按钮 110-190）
        select_flag[0] ^= 1 << (Math.floor(result / 10) - 11);
      } else if (result === 200) {
        // :355-360 全指定
        select_flag[0] = select_flag[0] === 511 ? 0 : 511;
      } else if (result === 0 || (result >= 500 && result < 508)) {
        // :362-375 设施の指定：选中层数进确认对话
        if (select_flag[0] === 0) {
          dialogue[1] = -1;
        } else {
          dialogue[0] = result;
          dialogue[1] = 0;
          let compare_bit = 1;
          for (let l = 0; l < 9; l += 1) {
            // :370 IF SELECT_FLAG & COMPARE_BIT（裸名 = [0]，设施页只用 [0]）
            if ((select_flag[0] & compare_bit) !== 0) {
              dialogue[1] += 1;
            }
            compare_bit *= 2;
          }
        }
      }
    } else {
      // :378-403 宝物設定時の入力判定
      if (result > 100 && result < 200) {
        // :381-382 単独指定
        select_flag[0] ^= 1 << (Math.floor(result / 10) - 11);
      } else if (result === 200) {
        // :384-389 全指定
        select_flag[0] = select_flag[0] === 511 ? 0 : 511;
      } else if (
        result === 0 ||
        (result >= 300 && result < 340 && item_count(result) > 0)
      ) {
        // :391-402 宝物の指定：写入所有选中层的宝箱槽
        if (select_flag[0] === 0) {
          dialogue[1] = -1;
        } else {
          let compare_bit = 1;
          for (let l = 0; l < 9; l += 1) {
            // :397 IF SELECT_FLAG & COMPARE_BIT（裸名 = [0]，宝物页只用 [0]）
            if ((select_flag[0] & compare_bit) !== 0) {
              flag_set(l + 340, result);
            }
            compare_bit *= 2;
          }
        }
      }
    }
    // :407-412 全設定時：[900]-[902] 标签页切换（选择位图清零）
    if (result >= 900 && result <= 902) {
      display_flag = result % 10;
      select_flag[0] = 0;
      select_flag[1] = 0;
      select_flag[2] = 0;
    }
    // :415-417 コンフィグ「怪物迎撃禁止」（FLAG:5 位 4 翻转）
    if (result === 100) {
      flag_set(5, flag_get(5) ^ 16);
    }
    // :420-477 部下の表示（[10]-[14]）
    if (result >= 10 && result <= 14) {
      // $PRINT 块：部下一览（内部等输入；[100-199] → MONSTER_SETUP 后重画）
      for (;;) {
        const sub_result = await print_subordinates(result);
        if (sub_result >= 100 && sub_result < 200) {
          // :472-473 CALL MONSTER_SETUP, RESULT → GOTO PRINT（重画部下一览）
          await monster_setup(sub_result);
          continue;
        }
        // [999] 返回（或其它值——原作 INPUT 后只判 100-199，其余落空回到
        // 主循环 CONTINUE）
        break;
      }
    }
    // :479-480 SIF RESULT != 999 → CLEARLINE（主循环顶部 redraw 承担）
  }
  // :483-491 尾部复位 + REDRAW 1（局部变量天然复位，免）
}

module.exports = {
  STUBBED_CALLS,
  dungeon_info2,
  enemy_compare,
  enemy_exist2,
  monster_setup,
};
