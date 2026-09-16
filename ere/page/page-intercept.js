/**
 * @file 迎击派遣：@INTERCEPT（issue #397 / N13 段 3）。
 *
 * 源: target/ERB/SHOP/SHOP_2.ERB  @INTERCEPT（:257-658）。
 *
 * 调用点（本票接入）：page/page-shop.js 的 usershop [104] 分支。
 *
 * 三个子画面 1:1 搬：角色列表（$INPUT_LOOP_MAIN0）→ 迎击设定
 * （$INPUT_LOOP_MAIN，派遣对象、出发阶层、随行行动、道具补给、出击）
 * → 出发阶层设定（$INPUT_LOOP_4）与行动设定（$INPUT_LOOP_3）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 * 1. **资格判据收在一处**：原作把同一段七条 filter 写了两遍（列表过滤
 *    :284-291/:325-335 与输入守卫 :367-407），两遍必须同步改。本移植抽成
 *    `reject_reason(cid)`（0 = 可派遣，否则给出原因码），列表过滤与输入守卫
 *    共用；守卫的提示文案按原因码分派（:375-406 的六条 PRINTW/PRINTFORMW）。
 *
 * 2. **列表开窗按命中序号**（同 page-life-list.js 文件头第 7 条的修正）：
 *    原作的 `LIST_POS` 扫描起点 + `T_LCOUNT` 计数窗在按值传递下翻不动页，
 *    本移植按命中序号开窗。
 *
 * 3. **子画面的选项按钮化**（PR #53 通则，page-select-target.js 同款）：
 *    出发层 1-9、行动 0-5、迎击设定 0/1/2/998/999 都改 `era.printButton`。
 *    **等级不足的动作用途项仍按原作渲染成灰显的 `[---] （魔王等级不足）`
 *    纯文本**（:559-596），不渲染成按钮——于是 :602-616 的六个等级门守卫
 *    在 ere 侧不可达（引擎只回传已打印按钮的编号）；门的阈值与档名由
 *    `WORK_GATES` 一处提供，渲染与守卫共用（判据本身仍被渲染侧用例覆盖）。
 *
 * 4. **随机源显式化**：原作 :496 的 `CALL ADD_EX_ITEM, -1, SELECT , 2` 与
 *    @GOHOUBI_REQUEST 的 `RAND:3` 都吃随机。ere 侧 `add_ex_item` 本就带
 *    `rand` 形参（dungeon/ex-item.js），本函数照 juel-check 的既有做法把
 *    `rand` 提到形参上（缺省均匀随机），测试注入定值序。
 *
 * 5. **PRINTW / CLEARLINE / SETFONT**：与 page-ability-up.js 同款处理
 *    （print + waitAnyKey 显式组合、局部重绘不镜像、字体命令无对应 API）。
 */

'use strict';
/* eslint-disable no-irregular-whitespace -- 迎击设定的三行按钮正文里的全角空格（原作 :423-438 的 `[0] 出发阶层　　　-` 等），1:1 保留原文标点 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { add_ex_item } = require('#/dungeon/ex-item');
const { chara } = require('#/facade/chara');
const { gohoubi_request } = require('#/system/stronghold/gohoubi-request');
const { life_list_item } = require('#/page/page-life-list');
const { chara_callname } = require('#/utils/callname-utils');
const { getbit } = require('#/kojo/kojo-dungeon-bitch-log');

/** 每页行数（:266 `#DIM NUM_PAGE = 26`） */
const NUM_PAGE = 26;
/** 派遣费用（:318 `COST = 6000`） */
const DISPATCH_COST = 6000;
/** 道具补给 / 设施扩张的费用（:430/:440/:575/:640 的 2000） */
const EQUIP_COST = 2000;
/** 出发阶层的可取值范围（:519 的 `(1-9)`、:522 的判据） */
const FLOOR_MIN = 1;
const FLOOR_MAX = 9;
/** 出击时写入的固定值（:479 `CFLAG:SELECT:502 = 90`、:480 的 505 = 0） */
const DISPATCH_DURATION = 90;
/** 行动设定各档（:557-596 的渲染与 :602-616 的守卫共用一处） */
const WORK_GATES = [
  { work: 1, level: 10, label: '卖淫' },
  { work: 2, level: 20, label: '补充陷阱' },
  { work: 3, level: 30, label: '扩张设施(要2000G)' },
  { work: 4, level: 40, label: '潜入工作' },
  { work: 5, level: 50, label: '训练' },
];
/**
 * 迎击设定的行动说明（:425-437 的六档）。与 WORK_GATES 同源派生：三档名字
 * 逐字相同，另两档（潜入敌方 / 训练）是迎击设定侧的措辞，单独补。
 */
const WORK_TEXTS = {
  ...Object.fromEntries(WORK_GATES.map((gate) => [gate.work, gate.label])),
  4: '潜入敌方',
  5: '训练',
};
/** 设施扩张的判定（:529/:538 的两处 +10 与 :541 的上限 3） */
const ROOM_ID_BASE = 349;
const ROOM_LEVEL_OFFSET = 10;
const ROOM_LEVEL_MAX = 3;
/** SETCOLORBYNAME DarkSeaGreen（:445，按钮用十六进制，命名色在 hover 态会拼错） */
const DARK_SEA_GREEN = '#8fbc8f';
/** SETCOLOR 80,80,80（:560 等，等级不足的灰显） */
const GRAY = '#505050';

/** 默认随机源（[0, n) 整数）；测试注入定值序 */
const default_rand = (n) => Math.floor(Math.random() * n);

/** CFLAG 读数兜底（#13） */
function cflag(cid, idx) {
  return era.get(`cflag:${cid}:${idx}`) || 0;
}

/** TALENT 读数兜底 */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/** EX_TALENT 读数兜底 */
function ex_talent(cid, idx) {
  return era.get(`ex_talent:${cid}:${idx}`) || 0;
}

/**
 * 派遣资格判据（:284-291 与 :325-335 的同一段七条 filter，输入守卫
 * :367-407 逐条镜像）。返回原因码；0 = 可派遣。
 *
 * 七条（原作的顺序）：濒死 → 魔王自己 → 非待机 → 未驯服（CFLAG:0 == 0
 * 且 TALENT:254 == 0）→ 孕妇（且未开「孕妇可出征」位）→ 近卫兵 →
 * 后代（且未开「后代可出征」位）。
 *
 * @param {number} cid 角色 ID
 * @returns {number|string} 0 或原因码（'BASE'/'MASTER'/'BUSY'/'UNTAMED'/
 *   'PREGNANT'/'GUARD'/'CHILD'）
 */
function reject_reason(cid) {
  if ((era.get(`base:${cid}:0`) || 0) < 1) return 'BASE'; // :284-285
  if (cid === 0) return 'MASTER'; // :286
  if (cflag(cid, 1) !== 0) return 'BUSY'; // :287
  if (cflag(cid, 0) === 0 && talent(cid, 254) === 0) return 'UNTAMED'; // :287
  if (talent(cid, 153) === 1 && getbit(era.get('flag:5') || 0, 10) === 0) {
    return 'PREGNANT'; // :288
  }
  if (ex_talent(cid, 1) !== 0 && ex_talent(cid, 2) === 0) return 'GUARD'; // :289
  if (
    ex_talent(cid, 1) !== 0 &&
    ex_talent(cid, 2) !== 0 &&
    getbit(era.get('exflag:9000') || 0, 1) === 0
  ) {
    return 'CHILD'; // :290
  }
  return 0;
}

/**
 * 可派遣的角色 ID（升序）——列表窗口按位置切，见文件头第 2 条。
 * @returns {number[]}
 */
function dispatchable_ids() {
  return era.getAddedCharacters().filter((cid) => reject_reason(cid) === 0);
}

/** 拒因对应的提示（:375-406；BASE/BUSY 无提示，原作只是 CLEARLINE 1 回输入） */
const REJECT_MESSAGES = {
  MASTER: () => '魔王大人，亲自迎击的话，这几天就不能爱爱了哦！才不要！',
  UNTAMED: (cid) => `${chara_callname(cid)}还未被驯服，拒绝你的命令了。`,
  PREGNANT: (cid) =>
    `${chara_callname(cid)}怀孕了，派孕妇打仗是违反月内瓦条约的～`,
  GUARD: () => '待着身边的才叫近卫嘛。',
  CHILD: () => '毕竟是自己的孩子，怎么忍心随意放手嘛。',
};

/** 校验类提示（PRINTW 习语，见文件头第 5 条） */
async function print_wait(text) {
  era.print(text);
  await era.waitAnyKey();
}

/**
 * 迎击设定的绘制（:421-448）。
 * @param {number} select 派遣对象
 * @param {number} floor 出发阶层
 * @param {number} work 随行行动
 * @param {number} item_get 道具补给标志
 */
function draw_settings(select, floor, work, item_get) {
  era.print(`${chara_callname(select)}的迎击设定`); // :421
  era.drawLine(); // :422-423（DRAWLINE + 出发阶层行）
  era.printButton(`出发阶层　　　- ${floor}层`, 0); // :423
  era.printButton(`迎击时顺便　　- ${WORK_TEXTS[work] ?? '内职'}`, 1); // :424-437
  era.printButton(
    `道具的补给　　- ${item_get === 1 ? `全副整装(要${EQUIP_COST}G)` : '裸奔吧，奴隶！'}`,
    2,
  ); // :438-443
  era.print(''); // :444 PRINTL
  // :445-447 SETCOLORBYNAME DarkSeaGreen → RESETCOLOR（只染这一枚按钮）
  era.printButton('去吧！皮卡丘！', 998, { color: DARK_SEA_GREEN });
  era.printButton('返回', 999); // :448
}

/**
 * 出发阶层设定（$INPUT_LOOP_4，:515-547）：1-9 选择，WORK == 3 时顺带做
 * 设施扩张的两道前置检查（无设施 / 已到上限）。
 *
 * 随行行动（WORK == 3 的扩张前置检查）由调用方在拿到层号后做（原作
 * :528-545 在 $INPUT_LOOP_4 返回之后、回 $INPUT_LOOP_MAIN 之前），故本函数
 * 只收派遣对象。
 *
 * @param {number} select 派遣对象
 * @returns {Promise<number>} 选定的出发阶层
 */
async function pick_floor(select) {
  for (;;) {
    era.print('出发层设定'); // :516
    era.print(`可用魔王的力量把${chara_callname(select)}传送到任意阶层。`); // :517
    era.print('从那一层出发？ (1-9)'); // :518
    for (let f = FLOOR_MIN; f <= FLOOR_MAX; f += 1) {
      era.printButton(String(f), f); // :519 的 [1] [2] … [9]
    }
    const result = await era.input(); // :521
    if (result >= FLOOR_MIN && result <= FLOOR_MAX) {
      // :522-523 合法：FLOOR = RESULT，退出本画面
      return result;
    }
    // :524-525 其余输入重问（CLEARLINE 不镜像）
  }
}

/**
 * 设施扩张的两道前置检查（:528-545 与 :622-645 同款）。
 * @param {number} floor 层号
 * @returns {boolean} true = 可扩张；false = 已回退（调用方回迎击设定）
 */
function facility_expandable(floor) {
  const room = era.get(`flag:${floor + ROOM_ID_BASE}`) || 0; // :529-531
  if (room === 0) {
    era.print(`${floor}层没有任何设施`); // :534
    return false;
  }
  const level =
    era.get(`flag:${floor + ROOM_ID_BASE + ROOM_LEVEL_OFFSET}`) || 0; // :538-539
  if (level === ROOM_LEVEL_MAX) {
    era.print(
      `${floor}层的${era.get(`itemname:${room}`) ?? ''}已经扩张到极限了。`,
    ); // :542
    return false;
  }
  return true;
}

/**
 * 行动设定（$INPUT_LOOP_3，:552-656）：0 内职 / 1-5 各档（等级门）。
 *
 * @param {number} select 派遣对象
 * @param {number} floor 出发阶层
 * @returns {Promise<number>} 选定的行动（原作写回 WORK 后回迎击设定）
 */
async function pick_action(select, floor) {
  const master_lv = cflag(0, 9); // CFLAG:0:9 魔王等级
  for (;;) {
    era.print('在地下城内的行动为'); // :554
    era.drawLine(); // :555-556（DRAWLINE + 内职项）
    era.printButton('内职', 0); // :556
    for (const gate of WORK_GATES) {
      if (master_lv >= gate.level) {
        era.printButton(gate.label, gate.work); // :558/:566/:575/:583/:591
      } else {
        // :560-562 等的灰显不可选（保持纯文本，见文件头第 3 条）
        era.print([{ content: `[---] （魔王等级不足）`, color: GRAY }]);
      }
    }
    era.drawLine(); // :598-601（DRAWLINE + INPUT）
    const result = await era.input(); // :601

    // :602-616 守卫（等级门在 ere 侧不可达，见文件头第 3 条；阈值的判据
    // 由 WORK_GATES 一处提供，渲染侧用例覆盖）
    if (result < 0) continue;
    if (WORK_GATES.some((g) => g.work === result && master_lv < g.level)) {
      continue;
    }
    if (result > WORK_GATES.length) continue;

    if (result === 1) {
      await print_wait('得到了在地下城中对怪物们卖淫的许可'); // :618-619
    } else if (result === 2) {
      await print_wait('将进行陷阱的补充作业'); // :620-621
    } else if (result === 3) {
      // :622-645 扩张设施：两道前置检查 + 资金检查
      if (!facility_expandable(floor)) {
        return 0; // 原作 GOTO INPUT_LOOP_MAIN——回迎击设定，WORK 不变
      }
      await print_wait(
        `${floor}层的${era.get(`itemname:${era.get(`flag:${floor + ROOM_ID_BASE}`) ?? 0}`) ?? ''}扩张需要${EQUIP_COST}资金。`,
      ); // :640
      if (era_flag.money < EQUIP_COST) {
        await print_wait('* 魔王大人，你怎么这么穷 *'); // :642-644
        return 0;
      }
    } else if (result === 4) {
      await print_wait('对勇者队伍的潜入工作进行中'); // :647-648
    } else if (result === 5) {
      await print_wait('在迎击的过程中进行了训练并得到了经验值'); // :649-650
    } else {
      await print_wait('得到了收入'); // :651-652
    }
    return result; // :654 WORK = RESULT
  }
}

/**
 * @INTERCEPT（:257-658）：迎击派遣画面。
 *
 * @param {(n: number) => number} [rand] 随机源（[0, n) 整数；缺省均匀随机）。
 *   转交给 ADD_EX_ITEM（:496）与 @GOHOUBI_REQUEST（:508）——见文件头第 4 条
 * @returns {Promise<number>} 0（:353-354 与 :508-510 的 RETURN 0）
 */
async function intercept(rand = default_rand) {
  // #DIM 初值（:258-269）
  let no_page = 0;
  let max_page = 0;
  let select = 0;
  let floor = 0;
  let work = 0;
  let item_get = 0;

  // :282-300 可派遣人数 → MAX_PAGE（上取整后 -1，空表为 -1）
  max_page = Math.ceil(dispatchable_ids().length / NUM_PAGE) - 1;

  // $INPUT_LOOP_MAIN0（:301-349 的绘制 + :351-408 的分发）
  // :304-314 的页码缓存（LIST_POS / PREV_PAGE / PREV_LIST_POS）与 :349 的
  // PREV_PAGE = NO_PAGE 在 ere 侧没有消费者：列表按命中序号开窗（文件头
  // 第 2 条），与 @ABILITY_UP 同款处置。
  main0: for (;;) {
    era.drawLine({ isSolid: true }); // :316 CUSTOMDRAWLINE =
    era.print('派遣谁前去迎击勇者？'); // :317
    era.print(`<状态若不为[可被卖]、将需要${DISPATCH_COST}pt资金来派遣>`); // :319
    era.drawLine(); // :320-321（DRAWLINE + L_LCOUNT = LINECOUNT）

    // :321-338 列表：按命中序号开窗（文件头第 2 条）
    const window_ids = dispatchable_ids().slice(
      no_page * NUM_PAGE,
      (no_page + 1) * NUM_PAGE,
    );
    for (const cid of window_ids) {
      life_list_item(cid); // :337
    }
    // :340-344 补行（L_LCOUNT < NUM_PAGE + 1 时补到页高）
    for (let row = window_ids.length; row < NUM_PAGE; row += 1) {
      era.print('');
    }
    era.drawLine(); // :345-346（DRAWLINE + 上一页键）
    era.printButton('- 上一页', 1000); // :346 PRINTLC
    era.printButton('返  回', 999); // :347
    era.printButton('- 下一页', 1001); // :348

    // $INPUT_LOOP_2（:351-408）
    for (;;) {
      const result = await era.input(); // :352 INPUT
      if (result === 999) {
        return 0; // :353-354（返回键）
      }
      if (result === 1000) {
        if (no_page > 0) {
          no_page -= 1;
        }
        continue main0; // :355-360
      }
      if (result === 1001) {
        if (no_page < max_page) {
          no_page += 1;
        }
        continue main0; // :361-366
      }

      // :367-407 守卫（与列表过滤同判据；实机上只有「金钱不足」一支可达
      // ——列表按钮即输入集，其余拒因对应的角色根本没画出来）
      const reason = reject_reason(result);
      if (reason !== 0) {
        const message = REJECT_MESSAGES[reason];
        if (message) {
          await print_wait(message(result));
        }
        continue; // 原作 GOTO INPUT_LOOP_2
      }
      // :388-391 売却可之外的派遣要花钱
      if (
        cflag(result, 0) === 0 &&
        talent(result, 254) === 1 &&
        era_flag.money < DISPATCH_COST
      ) {
        await print_wait(`金钱不足，${chara_callname(result)}无视了你的命令`);
        continue;
      }
      // :410-412 支付提示（真正扣款在出击决定里）
      if (cflag(result, 0) === 0) {
        era.print('支付了金钱');
      }
      era.print(`*${chara_callname(result)}作为你的爪牙外出迎击了*`); // :412 PRINTFORMW
      select = result; // :414

      // :416-418 进入迎击设定
      floor = 9;
      work = cflag(select, 500);
      item_get = 0;

      // $INPUT_LOOP_MAIN（:420-473）
      for (;;) {
        draw_settings(select, floor, work, item_get); // :421-448
        const choice = await era.input(); // :450
        if (choice === 999) {
          continue main0; // :452-453 返回列表
        }
        if (choice === 0) {
          floor = await pick_floor(select); // :454-455 GOTO INPUT_LOOP_4
          // :528-545 WORK == 3 的前置检查（失败回迎击设定）
          if (work === 3 && !facility_expandable(floor)) {
            continue;
          }
          continue; // :547 GOTO INPUT_LOOP_MAIN
        }
        if (choice === 1) {
          const picked = await pick_action(select, floor); // :456-457 GOTO INPUT_LOOP_3
          if (picked !== 0) {
            work = picked; // :654 WORK = RESULT
          }
          continue; // :656 GOTO INPUT_LOOP_MAIN
        }
        if (choice === 2 && item_get === 0) {
          // :458-467 买补给：两道资金检查
          if (era_flag.money < EQUIP_COST) {
            await print_wait('* 魔王大人，你怎么这么穷 *');
            continue;
          }
          if (
            cflag(select, 0) === 0 &&
            era_flag.money < DISPATCH_COST + EQUIP_COST
          ) {
            await print_wait('* 魔王大人，你怎么这么穷 *');
            continue;
          }
          item_get = 1;
          continue;
        }
        if (choice === 2) {
          item_get = 0; // :468-470 取消补给
          continue;
        }
        if (choice !== 998) {
          continue; // :471-472 其余输入重绘
        }
        break; // [998] 落到出撃決定
      }

      // :475-506 出撃決定
      // 跨域写走属主域门面（#71/#90 裁定；下表同）
      chara(select).invasion.状态 = 3; // :476 CFLAG:SELECT:1 = 3（迎击中）
      chara(select).stronghold.迷宫内行动 = work; // :477 CFLAG:500
      chara(select).dungeon.侵攻阶层 = floor; // :478 CFLAG:501
      chara(select).event.侵攻度 = DISPATCH_DURATION; // :479 CFLAG:502 = 90
      chara(select).dungeon.勇者击破数 = 0; // :480 CFLAG:505 = 0
      if (cflag(select, 0) === 0) {
        // :481-484 付费派遣（可被卖状态免 COST）
        era_flag.money -= DISPATCH_COST;
        era_exflag.legit_money -= DISPATCH_COST;
      }
      if (work === 3) {
        // :486-489 扩张设施的费用
        era_flag.money -= EQUIP_COST;
        era_exflag.legit_money -= EQUIP_COST;
      }
      if (item_get === 1) {
        // :490-506 道具补给：三次抽取，一件都没入手就退款
        era_flag.money -= EQUIP_COST;
        era_exflag.legit_money -= EQUIP_COST;
        let got = 0; // LOCAL:2
        for (let i = 0; i < 3; i += 1) {
          const gained = await add_ex_item(-1, select, 2, rand); // :496
          if (gained > 0) {
            got += 1; // :497-498
          }
        }
        if (got === 0) {
          era.print('补给已满，资金被退还了。'); // :502
          era_flag.money += EQUIP_COST;
          era_exflag.legit_money += EQUIP_COST;
        }
      }

      await gohoubi_request(select, rand); // :508 CALL GOHOUBI_REQUEST, SELECT
      return 0; // :508-510（GOHOUBI_REQUEST + RETURN 0）
    }
  }
}

module.exports = {
  DISPATCH_COST,
  EQUIP_COST,
  NUM_PAGE,
  WORK_GATES,
  intercept,
  reject_reason,
};
