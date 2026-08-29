/**
 * @file 地下城情报与建设界面（建设向）：@DUNGEON_INFO 的主循环 +
 * @ENEMY_EXIST 部下显示 + @ROOM_SETUP 设施改造 + @DUNGEON_INFO_MAP 的 2D
 * 模式分流 + @MON_SET_OMAKASE 随机放置的 1:1 移植（issue #180，阶段 3 H11）。
 *
 * 源: target/ERB/迷宮/DUNGEON_SETUP.ERB  @DUNGEON_INFO（:5-231）/
 *     @ENEMY_EXIST（:237-264）/ @ROOM_SETUP（:268-307）/
 *     @DUNGEON_INFO_MAP（:311-483）/ @MON_SET_OMAKASE（:486-516）
 *
 * 与 page-dungeon-info2.js 的 @DUNGEON_INFO2 是**两个不同的界面**（#180 票面
 * 裁定，勿合并）：本文件是建设向（逐层设定的列表界面：一行一层的陷阱三列 +
 * 设施 + 宝箱，楼层子画面的 A/B/C 列指定），那边是情报向（三标签页矩阵 +
 * 位图批量选择）。@ENEMY_EXIST 与 @ENEMY_EXIST2 同理成对：本文件的版本是
 * 逐角色一行（无排序、无队伍分组），那边是按队伍归并 + enemy_compare 排序。
 *
 * 入口现状：@DUNGEON_INFO 在原作全库**零调用者**（主菜单 [102] 走的是
 * DUNGEON_INFO2，SHOP ver1.0.2.ERB:109）——按票面「8 函数 1:1 移植、两套
 * 保留」照移植并导出；@DUNGEON_INFO_MAP 仅在 FLAG:502 == 1（2D 模式，
 * FIRST_SETTING 的一问随 #181 H12）时经 :8-11 分流进入，当前不可达；
 * @ROOM_SETUP / @MON_SET_OMAKASE 是它的两个子流程。
 *
 * 原作 → ere 的映射（本文件语义依据集中在此）：
 *   - GOTO INPUT_LOOP 的「无效输入重输」分支（:88-92/:181-185/:211-215 等）
 *     1:1 保留为 continue，但在 ere 侧结构性不可达——引擎 input() 只回传
 *     已打印按钮的快捷键（useRule 默认开，#130 镜像进夹具），非按钮值在
 *     渲染层就被拒收，到不了游戏逻辑；
 *   - 原作 PRINTFORM 拼行的多按钮布局 → 一行一钮（#73 排版近似，功能面
 *     等价）；
 *   - X/Y/Z 全局（楼层与槽位的跨函数传递）→ 参数化（floor 等）；
 *   - @ENEMY_EXIST 读调用方的全局 X（:241/:259）→ 参数 floor；
 *   - SETFONT "ＭＳ ゴシック"（:453/:470，等宽字体保证 32×32 网格对齐）
 *     无 era API 通道，不镜像（BARL 同款先例，dungeon.js 文件头）；
 *   - DB:(Y):(X) 二维寻址 → db:(Y*100+X) 一维折叠（yml/DB.yml 建桶，
 *     见该表头注）；
 *   - MONEY 与 EX_FLAG:4444（非作弊资金）双扣：era_flag.money 与
 *     era_exflag.legit_money 同减（:300-301，ROOM_SETUP 与 INFO2 的批量
 *     改造同族）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { ScreenBlock } = require('#/page/components/screen-block');
const { item_name } = require('#/dungeon/monster-data');
// 2D 地图三真身与 DB 折叠包装自 #181（H12）起收敛于 ere/dungeon/（labo-map
// 的域内存根与本地 db_get/db_set 随返工撤销——包装的唯一真相源在 labo.js）
const { db_set } = require('#/dungeon/labo');
const { geo_output_2, mon_limit, chip_draw } = require('#/dungeon/labo-map');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。#181（H12）返工后 GEO_OUTPUT_2 /
 * MON_LIMIT / CHIP_DRAW 三者收敛于 ere/dungeon/labo-map.js 真身（域内存根
 * 撤销），名单清空。
 */
const STUBBED_CALLS = [];

// :17 SETCOLORBYNAME RoyalBlue（楼层列表行）
const COLOR_ROYAL_BLUE = 'royalblue';
// :240 SETCOLOR 255,255,0（部下名黄）
const COLOR_SUBORDINATE = 'rgb(255, 255, 0)';

/** FLAG:N 读（undefined → 0 兜底，#13） */
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
 * @ENEMY_EXIST（:237-264）：打印一层楼的部下（逐角色一行，无排序——与
 * INFO2 的 @ENEMY_EXIST2 成对两套，勿合并）。
 *
 * @param {number} floor 阶层（原作读调用方的全局 X；10 = 近卫层，追加
 *   护卫中名单）
 * @returns {void}
 */
function enemy_exist(floor) {
  for (const cid of era.getAddedCharacters()) {
    // 原作 REPEAT CHARANUM 从 0 起；COUNT != MASTER（0 = 魔王）
    if (cflag_get(cid, 501) === floor && cid !== 0) {
      // :242-255 侵攻中（2）/ 迎击中（3），逃走中（CFLAG:507 == 1）追加
      let line = null;
      if (cflag_get(cid, 1) === 2) {
        line = `${name_of(cid)}[侵攻中]`;
      } else if (cflag_get(cid, 1) === 3) {
        line = `${name_of(cid)}[迎击中]`;
      }
      if (line !== null) {
        if (cflag_get(cid, 507) === 1) {
          line += '*逃走中*';
        }
        era.print([{ content: line, color: COLOR_SUBORDINATE }]);
      }
    }
    // :259-260 近卫层：未占用（CFLAG:1 == 0）且 EX_TALENT:x:1 → 护卫中
    if (
      floor === 10 &&
      cid !== 0 &&
      (era.get(`ex_talent:${cid}:1`) || 0) !== 0
    ) {
      era.print([
        { content: `${name_of(cid)}[护卫中]`, color: COLOR_SUBORDINATE },
      ]);
    }
  }
  return 0;
}

/**
 * 部下扫描块（@DUNGEON_INFO :101-137 与 @DUNGEON_INFO_MAP :342-378 共用的
 * REPEAT 100：每层第一格画楼层头 + ENEMY_EXIST，怪物库存逐行打印）。两处
 * 仅标题与楼层头分隔线不同，收成本函数（title / 阶层头回调）。
 *
 * @param {number} start 起始格 Z（0 / 30 / 60 / 90）
 * @param {number} budget 扫描格数上限 R（100 / 30 / 10）
 * @param {string} banner 三行横幅的中行文本
 * @returns {Promise<void>}
 */
async function print_subordinate_scan(start, budget, banner) {
  era.print('******************');
  era.print(banner);
  era.print('******************');
  let z = start;
  let r = budget;
  let floor = 0;
  for (let i = 0; i < 100 && z < 100 && r > 0; i += 1) {
    if (z % 10 === 0) {
      floor = z / 10 + 1;
      era.drawLine();
      // :119-123 第 10 段显示「近卫兵」
      if (floor !== 10) {
        era.print(`第${floor}阶层`);
      } else {
        era.print('近卫兵');
      }
      enemy_exist(floor);
    }
    const a = z + 100;
    const b = item_count(a);
    if (b > 0) {
      // :128-133 PRINTV B / PRINT 只 / PRINTS ITEMNAME:A（纯文本，无按钮——
      // 建设向的部下扫描不可点选，与 INFO2 的 [A] 按钮版成对差异）
      era.print([
        { content: `${b}只${item_name(a)}`, color: COLOR_ROYAL_BLUE },
      ]);
    }
    z += 1;
    r -= 1;
  }
}

/**
 * @ROOM_SETUP（:268-307）：单层的设施改造。通路免费，其它设施 10000p
 * （MONEY 与 EX_FLAG:4444 双扣）。
 *
 * @param {number} floor 楼层（0-8；原作读调用方的全局 X）
 * @returns {Promise<number>} 原作 RETURN（恒 0）
 */
async function room_setup(floor) {
  // $INPUT_LOOP_4
  for (;;) {
    era.print(`第${floor + 1}阶层`);
    era.printButton('通路', 0);
    for (let i = 500; i < 507; i += 1) {
      // :276-284 REPEAT 7：[500]-[506]（每行 3 个的排版归一行一钮）
      era.printButton(item_name(i), i);
    }
    era.printButton('停止', 999);
    era.print('改造为通路免费。改造为其它设施则需要改装费10000p');
    const result = await era.input();
    if (result === 0) {
      // :290-292 通路（清槽）
      flag_set(floor + 350, 0);
    } else if (result === 999) {
      // :293-294 停止
      return 0;
    } else if (result >= 500 && result <= 507) {
      // :295-303 设施（10000p）
      if (era_flag.money < 10000) {
        // :297-299 资金不足（RETURN 0 退出，原作不打提示以外的动作）
        era.print('*资金不足！！*');
        return 0;
      }
      era_flag.money -= 10000;
      era_exflag.legit_money -= 10000;
      flag_set(floor + 350, result);
    } else {
      // :304-305 无效输入 → 重输（ere 侧结构性不可达，见文件头）
      continue;
    }
    return 0;
  }
}

/**
 * @MON_SET_OMAKASE（:486-516）：怪物随机配置（等级 RAND:10，坐标 RAND:32，
 * (16,16) 的玉座跳过，至多 101 次，每次前置 MON_LIMIT 检查）。
 *
 * @param {() => number} rand 原作 RAND:N 的随机源（注入点，monster-data.js
 *   先例；缺省 Math.random 系）
 * @returns {Promise<number>} 原作 RETURN（恒 0）
 */
async function mon_set_omakase(rand = Math.random) {
  // :492 LOCAL:0 = 0（放置计数）
  let count = 0;
  // $INPUT_LOOP_MONSET_OMAKASE
  for (;;) {
    // :496-497 SIF LOCAL:0 > 100 → RETURN 0
    if (count > 100) {
      return 0;
    }
    // :500-502 許容量チェック
    if ((await mon_limit()) === 0) {
      return 0;
    }
    // :505-507 等级 RAND:10 / X RAND:32 / Y RAND:32
    const lv = Math.floor(rand() * 10);
    const x = Math.floor(rand() * 32);
    const y = Math.floor(rand() * 32);
    // :509-511 玉座 (16,16) 跳过
    if (x === 16 && y === 16) {
      continue;
    }
    // :512 DB:(Y):(X) = LOCAL:2
    db_set(y, x, lv);
    count += 1;
  }
}

/**
 * @DUNGEON_INFO_MAP（:311-483）：2D 模式的地下城管理（FLAG:502 == 1 时
 * @DUNGEON_INFO 的分流目标）。部下配置（DB 手动放置）/ 地图显示（GEO_OUTPUT_2
 * 存根）/ 部下扫描三支。
 *
 * @returns {Promise<number>} 原作 RETURN（恒 0）
 */
async function dungeon_info_map() {
  // $INPUT_LOOP_MAP
  for (;;) {
    era.drawLine();
    era.printButton('部下的配置', 0);
    era.printButton('显示地图', 1);
    era.printButton('部下状态总览', 2);
    era.printButton('1～3Lv', 3);
    era.printButton('4～6Lv', 4);
    era.printButton('7～9Lv', 5);
    era.drawLine();
    era.printButton('- 返回', 100);
    const result = await era.input();
    if (result === 1) {
      // :332-334 显示地图
      await geo_output_2();
      continue;
    }
    if (result >= 2 && result <= 5) {
      // :335-384 部下の表示（区段起止同 @DUNGEON_INFO 的 10-12 族）
      let start = 0;
      let budget = 100;
      if (result >= 3) {
        budget = 30;
        if (result === 4) {
          start = 30;
        } else if (result === 5) {
          start = 60;
        }
      }
      await print_subordinate_scan(start, budget, '\u3000\u3000\u3000魔王军');
      era.drawLine();
      await era.waitAnyKey();
      continue;
    }
    if (result === 100) {
      // :386-387 返回
      return 0;
    }
    // :390-393 許容量チェック（RESULT == 0（满）→ 回菜单）
    if ((await mon_limit()) === 0) {
      continue;
    }
    // $INPUT_LOOP_MONSET（:395-483）：等级 → X → Y → 确认 → DB 写入。
    // 原作的 GOTO INPUT_LOOP_MONSET 都回到**等级输入**（坐标无效 :426-427/
    // :442-443、玉座 :448-451 重头再问），此处外层循环承担
    let placed_or_exit = false;
    while (!placed_or_exit) {
      // :397-411 *放置怪物* + 等级 [1]-[10]（[0] 停止 [100] 自动）
      let lv = 0;
      for (;;) {
        era.print('*放置怪物*');
        era.print('请设定怪物的等级');
        era.printButton('1', 1);
        era.printButton('2', 2);
        era.printButton('3', 3);
        era.printButton('4', 4);
        era.printButton('5', 5);
        era.printButton('6', 6);
        era.printButton('7', 7);
        era.printButton('8', 8);
        era.printButton('9', 9);
        era.printButton('10', 10);
        era.printButton('停止', 0);
        era.printButton('自动', 100);
        const lv_input = await era.input();
        if (lv_input === 0) {
          // :403-404 停止 → 回菜单
          placed_or_exit = true;
          break;
        }
        if (lv_input === 100) {
          // :405-408 自动（随机放置 + PRINTW *随机放置了怪物*）
          await mon_set_omakase();
          era.print('*随机放置了怪物*');
          await era.waitAnyKey();
          placed_or_exit = true;
          break;
        }
        if (lv_input < 0 || lv_input >= 11) {
          // :409-410 无效 → 重问等级
          continue;
        }
        lv = lv_input;
        break;
      }
      if (placed_or_exit) {
        break;
      }
      // :413-428 X 坐标 [1]-[32]（[0] 停止回菜单；无效 → 重问等级）
      let x = 0;
      let x_valid = false;
      for (;;) {
        era.print('请设定怪物的X坐标');
        for (let i = 1; i <= 32; i += 1) {
          era.printButton(String(i).padStart(2, '0'), i);
        }
        era.printButton('停止', 0);
        const x_input = await era.input();
        if (x_input === 0) {
          placed_or_exit = true;
          break;
        }
        if (x_input < 0 || x_input >= 33) {
          x_valid = false;
          break;
        }
        x = x_input;
        x_valid = true;
        break;
      }
      if (placed_or_exit) {
        break;
      }
      if (!x_valid) {
        continue;
      }
      // :430-444 Y 坐标 [1]-[32]（同 X：无效 → 重问等级）
      let y = 0;
      let y_valid = false;
      for (;;) {
        era.print('请设定怪物的Y坐标');
        for (let i = 1; i <= 32; i += 1) {
          era.printButton(String(i).padStart(2, '0'), i);
        }
        era.printButton('停止', 0);
        const y_input = await era.input();
        if (y_input === 0) {
          placed_or_exit = true;
          break;
        }
        if (y_input < 0 || y_input >= 33) {
          y_valid = false;
          break;
        }
        y = y_input;
        y_valid = true;
        break;
      }
      if (placed_or_exit) {
        break;
      }
      if (!y_valid) {
        continue;
      }
      // :448-451 玉座 (16,16) 不可放置 → 重问等级
      if (x === 16 && y === 16) {
        era.print('无法在此放置');
        await era.waitAnyKey();
        continue;
      }
      // :455-468 マップを出力（32×32；★ 在 (x,y)，其余 CHIP_DRAW 存根芯片。
      // SETFONT 等宽无通道，见文件头）
      for (let my = 0; my < 32; my += 1) {
        // chip_draw 真身返回带色分段数组（#181），一行 32 格归并为一次
        // era.print(段数组)——★ 是原作 PRINT ★ / PRINT ,（:459-460），
        // 与其余格子同构（默认色 + 逗号）
        const row = [];
        for (let mx = 0; mx < 32; mx += 1) {
          if (mx === x && my === y) {
            row.push({ content: '★,' });
          } else {
            row.push(...chip_draw(mx, my));
          }
        }
        era.print(row);
      }
      // :472-473 PRINTW 确定放置在★的所在？
      era.print('确定放置在★的所在？');
      await era.waitAnyKey();
      era.printButton('好的', 0);
      era.printButton('不要', 1);
      const confirm = await era.input();
      if (confirm !== 0) {
        // :475-476 不要 → 回菜单
        break;
      }
      // :478 DB:(Y):(X) = LOCAL:2（放置等级）
      db_set(y, x, lv);
      // :480-483 PRINTW *放置了怪物* → 回菜单
      era.print('*放置了怪物*');
      await era.waitAnyKey();
      break;
    }
  }
}

/**
 * @DUNGEON_INFO（:5-231）：地下城情报与建设（列表版主循环）。
 *
 * 九层的陷阱/设施/宝箱一览 + 部下扫描 + 楼层设定子画面（陷阱 A/B/C 列与
 * 宝物的设定、ROOM_SETUP 的设施改造）。FLAG:502 == 1 时整体分流到
 * @DUNGEON_INFO_MAP（2D 模式）。
 *
 * @returns {Promise<number>} 原作 RETURN（恒 0）
 */
async function dungeon_info() {
  // :8-11 2D 模式分流（FLAG:502 随 #181 H12 的 FIRST_SETTING 一问置位）
  if (flag_get(502) === 1) {
    return dungeon_info_map();
  }
  const screen = new ScreenBlock(async () => {
    // :14 DRAWLINE
    era.drawLine();
    // :16-79 REPEAT 9：一行一层（陷阱三列 + 设施 + 宝箱）
    for (let l = 0; l < 9; l += 1) {
      // :17 SETCOLORBYNAME RoyalBlue
      const color = COLOR_ROYAL_BLUE;
      // :19-28 陷阱A（X = COUNT + 300）
      const trap_a = flag_get(l + 300);
      let trap_a_text;
      if (trap_a <= 0) {
        trap_a_text = '陷阱：无';
      } else if (item_count(trap_a) > 0) {
        trap_a_text = `陷阱：${item_name(trap_a)}(${item_count(trap_a)})`;
      } else {
        trap_a_text = '陷阱：无';
        flag_set(l + 300, -1);
      }
      // :31-52 陷阱B / 陷阱C（同构；C 行收 PRINTFORML）
      const trap_b = flag_get(l + 310);
      let trap_b_text;
      if (trap_b <= 0) {
        trap_b_text = '：无';
      } else if (item_count(trap_b) > 0) {
        trap_b_text = `：${item_name(trap_b)}(${item_count(trap_b)})`;
      } else {
        trap_b_text = '：无';
        flag_set(l + 310, -1);
      }
      const trap_c = flag_get(l + 320);
      let trap_c_text;
      if (trap_c <= 0) {
        trap_c_text = '：无';
      } else if (item_count(trap_c) > 0) {
        trap_c_text = `：${item_name(trap_c)}(${item_count(trap_c)})`;
      } else {
        trap_c_text = '：无';
        flag_set(l + 320, -1);
      }
      // :22 [COUNT] 按钮（楼层选择 0-8）
      era.printButton(
        `第${l + 1}阶层\u3000${trap_a_text} ${trap_b_text} ${trap_c_text}`,
        l,
        { color },
      );
      // :57-66 设施（500-506 为合法设施段，越界归通路 0）
      const facility = flag_get(l + 350);
      let facility_text;
      if (facility <= 0) {
        facility_text = '\u3000设施：通路';
      } else if (facility >= 500 && facility <= 506) {
        facility_text = `\u3000设施：${item_name(facility)}`;
      } else {
        facility_text = '\u3000设施：通路';
        flag_set(l + 350, 0);
      }
      // :69-78 宝箱
      const treasure = flag_get(l + 340);
      let treasure_text;
      if (treasure <= 0) {
        treasure_text = '\u3000宝箱：无';
      } else if (item_count(treasure) > 0) {
        treasure_text = `\u3000宝箱：${item_name(treasure)}(${item_count(treasure)})`;
      } else {
        treasure_text = '\u3000宝箱：无';
        flag_set(l + 340, -1);
      }
      era.print(`${facility_text}${treasure_text}`);
    }
    // :81-82 部下入口
    era.printButton('部下状态总览', 9);
    era.printButton('1～3层 的部下', 10);
    era.printButton('4～6层 的部下', 11);
    era.printButton('7～9层 的部下', 12);
    era.drawLine();
    era.printButton('- 返回', 100);
  });
  // $INPUT_LOOP
  for (;;) {
    await screen.redraw();
    const result = await era.input();
    // :88-92 无效输入 → 重输（ere 侧结构性不可达，见文件头）
    if (result < 0 || (result >= 13 && result !== 100)) {
      continue;
    }
    // :95-143 部下の表示（9-12）
    if (result >= 9 && result <= 12) {
      let start = 0;
      let budget = 100;
      if (result >= 10) {
        budget = 30;
        if (result === 11) {
          start = 30;
        } else if (result === 12) {
          start = 60;
        }
      }
      await print_subordinate_scan(start, budget, '地下城内的部下');
      era.drawLine();
      // :140 WAIT → GOTO INPUT_LOOP
      await era.waitAnyKey();
      continue;
    }
    // :145-146 [100] 返回
    if (result === 100) {
      return 0;
    }
    // :148 X = RESULT（0-8 楼层）→ 设定子画面
    const floor = result;
    // :150-177 进行第{X+1}阶层的设定 + 库存列表 + 指令按钮
    const floor_screen = new ScreenBlock(async () => {
      era.print(`进行第${floor + 1}阶层的设定`);
      era.print('《请选择要设置的陷阱和宝物》');
      // :153-163 陷阱库存 [60-88]
      for (let i = 60; i < 89; i += 1) {
        if (item_count(i) > 0) {
          era.printButton(`${item_name(i)}（${item_count(i)}）`, i);
        }
      }
      // :164-173 宝物库存 [300-320]
      for (let i = 300; i < 321; i += 1) {
        if (item_count(i) > 0) {
          era.printButton(`${item_name(i)}（${item_count(i)}）`, i);
        }
      }
      era.printButton('解除陷阱', 0);
      era.printButton('取下宝物', 1);
      era.printButton('进行设施的设定', 2);
      era.printButton('停止', 998);
      era.printButton('结束地下城的设定', 999);
    });
    // $INPUT_LOOP_2（:179-231）
    let done = false;
    while (!done) {
      await floor_screen.redraw();
      const setup_result = await era.input();
      if (
        setup_result < 0 ||
        (setup_result >= 321 && setup_result !== 998 && setup_result !== 999)
      ) {
        // :181-185 无效输入 → 重输（不重画，$INPUT_LOOP_2 在 INPUT 之前）
        continue;
      }
      if (setup_result === 0) {
        // :187-194 解除陷阱：三列全清
        flag_set(floor + 300, -1);
        flag_set(floor + 310, -1);
        flag_set(floor + 320, -1);
        done = true;
      } else if (setup_result === 1) {
        // :195-198 取下宝物
        flag_set(floor + 340, -1);
        done = true;
      } else if (setup_result === 2) {
        // :199-201 设施的设定（ROOM_SETUP）
        await room_setup(floor);
        done = true;
      } else if (setup_result === 998) {
        // :202-203 停止 → 回主画面
        done = true;
      } else if (setup_result === 999) {
        // :204-205 结束地下城的设定 → RETURN 0
        return 0;
      } else {
        // :207-231 Z = RESULT（60-88 陷阱 / 300-320 宝物）
        const z = setup_result;
        if (z < 100) {
          // :208-229 陷阱的列指定（$INPUT_LOOP_3）
          const col_screen = new ScreenBlock(async () => {
            era.printButton('A', 0);
            era.printButton('B', 1);
            era.printButton('C', 2);
            era.printButton('全部', 3);
          });
          let y = 0;
          for (;;) {
            await col_screen.redraw();
            const col = await era.input();
            if (col < 0 || col >= 4) {
              // :212-215 无效 → 重输
              continue;
            }
            if (col === 3) {
              // :216-223 全部：三列同设
              flag_set(floor + 300, z);
              flag_set(floor + 310, z);
              flag_set(floor + 320, z);
            } else {
              // :225-226 Y = X + 300 + RESULT * 10（A/B/C 列）
              y = floor + 300 + col * 10;
              flag_set(y, z);
            }
            break;
          }
        } else if (z > 300) {
          // :227-229 宝物：Y = X + 340
          flag_set(floor + 340, z);
        }
        done = true;
      }
    }
    // GOTO INPUT_LOOP（回主画面）
  }
}

module.exports = {
  STUBBED_CALLS,
  dungeon_info,
  enemy_exist,
  room_setup,
  dungeon_info_map,
  mon_set_omakase,
};
