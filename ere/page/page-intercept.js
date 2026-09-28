/**
 * @file 迎击派遣：intercept（issue #397 / N13 段 3）。
 *
 * 调用点：page/page-shop.js 的 usershop [104] 分支。
 *
 * 三个子画面逐一移植：角色列表（$INPUT_LOOP_MAIN0）→ 迎击设定
 * （$INPUT_LOOP_MAIN，派遣对象、出发阶层、随行行动、道具补给、出击）
 * → 出发阶层设定（$INPUT_LOOP_4）与行动设定（$INPUT_LOOP_3）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *
 * 1. **资格判断收在一处**：旧引擎把同一段七条 filter 写了两遍（列表过滤
 *    与输入检查各一份），两份必须同步改。本移植抽成
 *    `reject_reason(cid)`（0 = 可派遣，否则给出原因码），列表过滤与输入检查
 *    共用；检查的提示文案按原因码分派（六条 PRINTW/PRINTFORMW）。
 *
 * 2. **列表开窗按命中序号**（同 page-life-list.js 文件头第 7 条的修正）：
 *    `LIST_POS` 扫描起点 + `T_LCOUNT` 计数窗在按值传递下翻不动页，
 *    本移植按命中序号开窗。
 *
 * 3. **子画面的选项按钮化**（PR #53 通则，page-select-target.js 同款）：
 *    出发层 1-9、行动 0-5、迎击设定 0/1/2/998/999 都改 `era.printButton`。
 *    **等级不足的动作用途项仍渲染成灰显的 `[---] （魔王等级不足）`
 *    纯文本**，不渲染成按钮——于是六个等级门检查
 *    在 ere 侧不可达（引擎只回传已打印按钮的编号）；门的阈值与档名由
 *    `WORK_GATES` 一处提供，渲染与检查共用（判断条件本身仍被渲染侧用例覆盖）。
 *
 * 4. **随机源显式化**：`CALL ADD_EX_ITEM, -1, SELECT , 2` 与
 *    gohoubi_request 的 `RAND:3` 都吃随机。ere 侧 `add_ex_item` 本就带
 *    `rand` 形参（dungeon/ex-item.js），本函数照 juel-check 的既有做法把
 *    `rand` 提到形参上（缺省均匀随机），测试注入定值序。
 *
 * 5. **PRINTW / CLEARLINE / SETFONT**：与 page-ability-up.js 同款处理
 *    （print + waitAnyKey 显式组合、局部重绘不镜像、字体命令无对应 API）。
 */

'use strict';
/* eslint-disable no-irregular-whitespace -- 迎击设定的三行按钮正文里的全角空格对齐（`[0] 出发阶层　　　-` 等，全角空格是文案的一部分） */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { add_ex_item } = require('#/dungeon/ex-item');
const { chara } = require('#/facade/chara');
const { gohoubi_request } = require('#/system/stronghold/gohoubi-request');
const { life_list_item } = require('#/page/page-life-list');
const { chara_callname } = require('#/utils/callname-utils');
const { getbit } = require('#/kojo/kojo-dungeon-bitch-log');

/** 每页行数（`#DIM NUM_PAGE = 26`） */
const NUM_PAGE = 26;
/** 派遣费用（`COST = 6000`） */
const DISPATCH_COST = 6000;
/** 道具补给 / 设施扩张的费用（固定 2000） */
const EQUIP_COST = 2000;
/** 出发阶层的可取值范围（`(1-9)`） */
const FLOOR_MIN = 1;
const FLOOR_MAX = 9;
/** 出击时写入的固定值（`CFLAG:SELECT:502 = 90`、505 = 0） */
const DISPATCH_DURATION = 90;
/** 行动设定各档（渲染与检查共用一处） */
const WORK_GATES = [
  { work: 1, level: 10, label: '卖淫' },
  { work: 2, level: 20, label: '补充陷阱' },
  { work: 3, level: 30, label: '扩张设施(要2000G)' },
  { work: 4, level: 40, label: '潜入工作' },
  { work: 5, level: 50, label: '训练' },
];
/**
 * 迎击设定的行动说明（六档）。与 WORK_GATES 同源派生：三档名字
 * 相同，另两档（潜入敌方 / 训练）是迎击设定侧的措辞，单独补。
 */
const WORK_TEXTS = {
  ...Object.fromEntries(WORK_GATES.map((gate) => [gate.work, gate.label])),
  4: '潜入敌方',
  5: '训练',
};
/** 设施扩张的判定（两处 +10 与上限 3） */
const ROOM_ID_BASE = 349;
const ROOM_LEVEL_OFFSET = 10;
const ROOM_LEVEL_MAX = 3;
/** SETCOLORBYNAME DarkSeaGreen（按钮用十六进制，命名色在 hover 态会拼错） */
const DARK_SEA_GREEN = '#8fbc8f';
/** SETCOLOR 80,80,80（等级不足的灰显） */
const GRAY = '#505050';

/** 默认随机源（[0, n) 整数）；测试注入定值序 */
const default_rand = (n) => Math.floor(Math.random() * n);

/** CFLAG 读数缺省处理（#13） */
function cflag(cid, idx) {
  return era.get(`cflag:${cid}:${idx}`) || 0;
}

/** TALENT 读数缺省处理 */
function talent(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/** EX_TALENT 读数缺省处理 */
function ex_talent(cid, idx) {
  return era.get(`ex_talent:${cid}:${idx}`) || 0;
}

/**
 * 派遣资格判断（同一段七条 filter，输入检查
 * 逐条镜像）。返回原因码；0 = 可派遣。
 *
 * 七条（顺序固定）：濒死 → 魔王自己 → 非待机 → 未驯服（CFLAG:0 == 0
 * 且 TALENT:254 == 0）→ 孕妇（且未开「孕妇可出征」位）→ 近卫兵 →
 * 后代（且未开「后代可出征」位）。
 *
 * @param {number} cid 角色 ID
 * @returns {number|string} 0 或原因码（'BASE'/'MASTER'/'BUSY'/'UNTAMED'/
 *   'PREGNANT'/'GUARD'/'CHILD'）
 */
function reject_reason(cid) {
  if ((era.get(`base:${cid}:0`) || 0) < 1) return 'BASE';
  if (cid === 0) return 'MASTER';
  if (cflag(cid, 1) !== 0) return 'BUSY';
  if (cflag(cid, 0) === 0 && talent(cid, 254) === 0) return 'UNTAMED';
  if (talent(cid, 153) === 1 && getbit(era.get('flag:5') || 0, 10) === 0) {
    return 'PREGNANT';
  }
  if (ex_talent(cid, 1) !== 0 && ex_talent(cid, 2) === 0) return 'GUARD';
  if (
    ex_talent(cid, 1) !== 0 &&
    ex_talent(cid, 2) !== 0 &&
    getbit(era.get('exflag:9000') || 0, 1) === 0
  ) {
    return 'CHILD';
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

/** 拒因对应的提示（BASE/BUSY 无提示，只 CLEARLINE 1 回输入） */
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
 * 迎击设定的绘制。
 * @param {number} select 派遣对象
 * @param {number} floor 出发阶层
 * @param {number} work 随行行动
 * @param {number} item_get 道具补给标志
 */
function draw_settings(select, floor, work, item_get) {
  era.print(`${chara_callname(select)}的迎击设定`);
  era.drawLine(); // （DRAWLINE + 出发阶层行）
  era.printButton(`出发阶层　　　- ${floor}层`, 0);
  era.printButton(`迎击时顺便　　- ${WORK_TEXTS[work] ?? '内职'}`, 1);
  era.printButton(
    `道具的补给　　- ${item_get === 1 ? `全副整装(要${EQUIP_COST}G)` : '裸奔吧，奴隶！'}`,
    2,
  );
  era.print(''); // PRINTL
  // SETCOLORBYNAME DarkSeaGreen → RESETCOLOR（只染这一枚按钮）
  era.printButton('去吧！皮卡丘！', 998, { color: DARK_SEA_GREEN });
  era.printButton('返回', 999);
}

/**
 * 出发阶层设定（$INPUT_LOOP_4）：1-9 选择，WORK == 3 时顺带做
 * 设施扩张的两道前置检查（无设施 / 已到上限）。
 *
 * 随行行动（WORK == 3 的扩张前置检查）由调用方在拿到层号后做
 * （在 $INPUT_LOOP_4 返回之后、回 $INPUT_LOOP_MAIN 之前），故本函数
 * 只收派遣对象。
 *
 * @param {number} select 派遣对象
 * @returns {Promise<number>} 选定的出发阶层
 */
async function pick_floor(select) {
  for (;;) {
    era.print('出发层设定');
    era.print(`可用魔王的力量把${chara_callname(select)}传送到任意阶层。`);
    era.print('从那一层出发？ (1-9)');
    for (let f = FLOOR_MIN; f <= FLOOR_MAX; f += 1) {
      era.printButton(String(f), f); // 的 [1] [2] … [9]
    }
    const result = await era.input();
    if (result >= FLOOR_MIN && result <= FLOOR_MAX) {
      // 合法：FLOOR = RESULT，退出本画面
      return result;
    }
    // 其余输入重问（CLEARLINE 不镜像）
  }
}

/**
 * 设施扩张的两道前置检查（两处同款）。
 * @param {number} floor 层号
 * @returns {boolean} true = 可扩张；false = 已回退（调用方回迎击设定）
 */
function facility_expandable(floor) {
  const room = era.get(`flag:${floor + ROOM_ID_BASE}`) || 0;
  if (room === 0) {
    era.print(`${floor}层没有任何设施`);
    return false;
  }
  const level =
    era.get(`flag:${floor + ROOM_ID_BASE + ROOM_LEVEL_OFFSET}`) || 0;
  if (level === ROOM_LEVEL_MAX) {
    era.print(
      `${floor}层的${era.get(`itemname:${room}`) ?? ''}已经扩张到极限了。`,
    );
    return false;
  }
  return true;
}

/**
 * 行动设定（$INPUT_LOOP_3）：0 内职 / 1-5 各档（等级门）。
 *
 * @param {number} select 派遣对象
 * @param {number} floor 出发阶层
 * @returns {Promise<number>} 选定的行动（由调用方写回 WORK，随后回迎击设定）
 */
async function pick_action(select, floor) {
  const master_lv = cflag(0, 9); // CFLAG:0:9 魔王等级
  for (;;) {
    era.print('在地下城内的行动为');
    era.drawLine(); // （DRAWLINE + 内职项）
    era.printButton('内职', 0);
    for (const gate of WORK_GATES) {
      if (master_lv >= gate.level) {
        era.printButton(gate.label, gate.work);
      } else {
        // 等的灰显不可选（保持纯文本，见文件头第 3 条）
        era.print([{ content: `[---] （魔王等级不足）`, color: GRAY }]);
      }
    }
    era.drawLine(); // （DRAWLINE + INPUT）
    const result = await era.input();

    // 检查（等级门在 ere 侧不可达，见文件头第 3 条；阈值的判断条件
    // 由 WORK_GATES 一处提供，渲染侧用例覆盖）
    if (result < 0) continue;
    if (WORK_GATES.some((g) => g.work === result && master_lv < g.level)) {
      continue;
    }
    if (result > WORK_GATES.length) continue;

    if (result === 1) {
      await print_wait('得到了在地下城中对怪物们卖淫的许可');
    } else if (result === 2) {
      await print_wait('将进行陷阱的补充作业');
    } else if (result === 3) {
      // 扩张设施：两道前置检查 + 资金检查
      if (!facility_expandable(floor)) {
      return 0; // GOTO INPUT_LOOP_MAIN——回迎击设定，WORK 不变
      }
      await print_wait(
        `${floor}层的${era.get(`itemname:${era.get(`flag:${floor + ROOM_ID_BASE}`) ?? 0}`) ?? ''}扩张需要${EQUIP_COST}资金。`,
      );
      if (era_flag.money < EQUIP_COST) {
        await print_wait('* 魔王大人，你怎么这么穷 *');
        return 0;
      }
    } else if (result === 4) {
      await print_wait('对勇者队伍的潜入工作进行中');
    } else if (result === 5) {
      await print_wait('在迎击的过程中进行了训练并得到了经验值');
    } else {
      await print_wait('得到了收入');
    }
    return result; // WORK = RESULT
  }
}

/**
 * intercept：迎击派遣画面。
 *
 *   转交给 add_ex_item 与 gohoubi_request——见文件头第 4 条
 * @returns {Promise<number>} 0（两处 RETURN 0）
 */
async function intercept(rand = default_rand) {
  // #DIM 初值
  let no_page = 0;
  let max_page = 0;
  let select = 0;
  let floor = 0;
  let work = 0;
  let item_get = 0;

  // 可派遣人数 → MAX_PAGE（上取整后 -1，空表为 -1）
  max_page = Math.ceil(dispatchable_ids().length / NUM_PAGE) - 1;

  // $INPUT_LOOP_MAIN0（绘制 + 分发）
  // 的页码缓存（LIST_POS / PREV_PAGE / PREV_LIST_POS）与
  // PREV_PAGE = NO_PAGE 在 ere 侧没有消费者：列表按命中序号开窗（文件头
  // 第 2 条），与 ability_up 同款处置。
  main0: for (;;) {
    era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =
    era.print('派遣谁前去迎击勇者？');
    era.print(`<状态若不为[可被卖]、将需要${DISPATCH_COST}pt资金来派遣>`);
    era.drawLine(); // （DRAWLINE + L_LCOUNT = LINECOUNT）

    // 列表：按命中序号开窗（文件头第 2 条）
    const window_ids = dispatchable_ids().slice(
      no_page * NUM_PAGE,
      (no_page + 1) * NUM_PAGE,
    );
    for (const cid of window_ids) {
      life_list_item(cid);
    }
    // 补行（L_LCOUNT < NUM_PAGE + 1 时补到页高）
    for (let row = window_ids.length; row < NUM_PAGE; row += 1) {
      era.print('');
    }
    era.drawLine(); // （DRAWLINE + 上一页键）
    era.printButton('- 上一页', 1000); // PRINTLC
    era.printButton('- 返 回', 999); // PRINTLC（正文两个空格，引擎折叠成一个）
    era.printButton('- 下一页', 1001);

    // $INPUT_LOOP_2
    for (;;) {
      const result = await era.input(); // INPUT
      if (result === 999) {
        return 0; // （返回键）
      }
      if (result === 1000) {
        if (no_page > 0) {
          no_page -= 1;
        }
        continue main0;
      }
      if (result === 1001) {
        if (no_page < max_page) {
          no_page += 1;
        }
        continue main0;
      }

      // 检查（与列表过滤同一判断条件；实机上只有「金钱不足」一支可达
      // ——列表按钮即输入集，其余拒因对应的角色根本没画出来）
      const reason = reject_reason(result);
      if (reason !== 0) {
        const message = REJECT_MESSAGES[reason];
        if (message) {
          await print_wait(message(result));
        }
        continue; // GOTO INPUT_LOOP_2
      }
      // 売却可之外的派遣要花钱
      if (
        cflag(result, 0) === 0 &&
        talent(result, 254) === 1 &&
        era_flag.money < DISPATCH_COST
      ) {
        await print_wait(`金钱不足，${chara_callname(result)}无视了你的命令`);
        continue;
      }
      // 支付提示（真正扣款在出击决定里）
      if (cflag(result, 0) === 0) {
        era.print('支付了金钱');
      }
      era.print(`*${chara_callname(result)}作为你的爪牙外出迎击了*`); // PRINTFORMW
      select = result;

      // 进入迎击设定
      floor = 9;
      work = cflag(select, 500);
      item_get = 0;

      // $INPUT_LOOP_MAIN
      for (;;) {
        draw_settings(select, floor, work, item_get);
        const choice = await era.input();
        if (choice === 999) {
          continue main0; // 返回列表
        }
        if (choice === 0) {
          floor = await pick_floor(select); // GOTO INPUT_LOOP_4
          // WORK == 3 的前置检查（失败回迎击设定）
          if (work === 3 && !facility_expandable(floor)) {
            continue;
          }
          continue; // GOTO INPUT_LOOP_MAIN
        }
        if (choice === 1) {
          const picked = await pick_action(select, floor); // GOTO INPUT_LOOP_3
          if (picked !== 0) {
            work = picked; // WORK = RESULT
          }
          continue; // GOTO INPUT_LOOP_MAIN
        }
        if (choice === 2 && item_get === 0) {
          // 买补给：两道资金检查
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
          item_get = 0; // 取消补给
          continue;
        }
        if (choice !== 998) {
          continue; // 其余输入重绘
        }
        break; // [998] 落到出撃決定
      }

      // 出撃決定
      // 跨域写走属主域门面（#71/#90 结论；下表同）
      chara(select).invasion.状态 = 3; // CFLAG:SELECT:1 = 3（迎击中）
      chara(select).stronghold.迷宫内行动 = work; // CFLAG:500
      chara(select).dungeon.侵攻阶层 = floor; // CFLAG:501
      chara(select).event.侵攻度 = DISPATCH_DURATION; // CFLAG:502 = 90
      chara(select).dungeon.勇者击破数 = 0; // CFLAG:505 = 0
      if (cflag(select, 0) === 0) {
        // 付费派遣（可被卖状态免 COST）
        era_flag.money -= DISPATCH_COST;
        era_exflag.legit_money -= DISPATCH_COST;
      }
      if (work === 3) {
        // 扩张设施的费用
        era_flag.money -= EQUIP_COST;
        era_exflag.legit_money -= EQUIP_COST;
      }
      if (item_get === 1) {
        // 道具补给：三次抽取，一件都没入手就退款
        era_flag.money -= EQUIP_COST;
        era_exflag.legit_money -= EQUIP_COST;
        let got = 0; // LOCAL:2
        for (let i = 0; i < 3; i += 1) {
          const gained = await add_ex_item(-1, select, 2, rand);
          if (gained > 0) {
            got += 1;
          }
        }
        if (got === 0) {
          era.print('补给已满，资金被退还了。');
          era_flag.money += EQUIP_COST;
          era_exflag.legit_money += EQUIP_COST;
        }
      }

      await gohoubi_request(select, rand); // CALL GOHOUBI_REQUEST, SELECT
      return 0; // （GOHOUBI_REQUEST + RETURN 0）
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
