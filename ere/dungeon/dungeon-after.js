/**
 * @file 迷宫战果结算（issue #179，阶段 3 H10）：@DUNGEON_AFTER 与奖惩两臂。
 *
 * 源: target/ERB/迷宮/DUNGEON_AFTER.ERB  @DUNGEON_AFTER（:2-15）、
 *     @GOHOUBI（:19-322，奖赏 306 行）、@OSIOKI（:325-568，惩罚 264 行）
 *
 * 调用点：ere/system/turnend-settle.js 结算主循环（原作 SYSTEM
 * ver1.0.3.ERB:302，全角色每回合；本票接线）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - 原作经全局 A 传角色（CFLAG:A:1 / SAVESTR:A / EXP:A:N），ere 侧显式
 *     传参 cid（#5 决议第六条）；RESULT（INPUT 的输入值）改局部变量；
 *   - SAVESTR:A → name_of（CONTEXT.md「称呼」：本作 SAVESTR:x = 名前）；
 *   - 奖惩两臂的选项菜单是**纯文本 + 自由输入**（原作 PRINTL [n] + INPUT
 *     循环），不改按钮——多轮 WAIT 的界面里按钮不留在 rule（#180 查实的
 *     引擎行为，见 page-dungeon-info2.js 的 print_subordinates 注释），键盘键入 [n]
 *     全程可达，1:1 于 Emuera 的键盘交互；
 *   - ABL/EXP 走门面（chara 域：顺从/欲望/私处感觉/肛门感觉/露出癖/抖M
 *     气质；dungeon 域：私处/肛门/绝顶/性交/自慰/调教自慰/精液/口交/私处
 *     扩张/肛门扩张/兽奸/药物经验）；EXP:23（爱情）/EXP:81（勋章）无门面
 *     字段，裸寻址 + 注释；JUEL 表无所有权产物（#70），读写均裸寻址；
 *   - **TFLAG:18 改经 choice 参数链内传递**（本票裁定）：原作各分支开头
 *     `TFLAG:18 = N` 的 N 与 INPUT 的 RESULT 同值，唯一读者是同链的口上
 *     分发（读 TFLAG:18 选台词）——ere 引擎的 tflag 桶 beginTrain 建 /
 *     endTrain 删，调教外（EVENTTURNEND）写 `tflag:18` 落引擎兜底分支
 *     era.error 且丢失（engine-bundle 驱动 setVar 的探针实证，裁定全文
 *     见 ere/kojo/kojo-dungeon-after.js 文件头）。故 result 直接作为
 *     第二参传给口上分发，原作各分支的赋值行不落、序号值 1:1 透传；
 *     TFLAG:18 的调教期语义（足コキ / SYSTEM_SOURCE）不受影响——那
 *     些调用点桶在场，仍走 era.set；
 *   - CFLAG:A:504（要求的奖赏种类，フラグまとめ CFLAG:504）裸寻址；
 *     CFLAG:A:7 是穿孔位图（&1 乳首，フラグまとめ CFLAG:7），位判定
 *     裸寻址；
 *   - MONEY / EX_FLAG:4444 → era_flag.money / era_exflag.legit_money
 *     （dungeon-trap.js 先例）；
 *   - @OSIOKI 的 ELSEIF RESULT == 9（:562-566）是死分支——输入循环
 *     （:342-346）把 RESULT >= 9 拦回重输，0-8 全被覆盖，9 永不达。
 *     1:1 保留（结构照搬），不另登记；
 *   - 原作文本的繁/日字按 #60 归一为简体（経験→经验、糞→粪、終→终、
 *     給→给、頭→头、呑→吞、幇→帮、説→说、帯→带、浄→净），玩家可见
 *     文本一律简体的有意识偏离。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara } = require('#/facade/chara');
const {
  gohoubi_after_koujo,
  osioski_koujo,
} = require('#/kojo/kojo-dungeon-after');

/** 名字承载（#5 决议；savestr 通道不存在，dungeon-trap.js 同款） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/**
 * INPUT 循环（原作 $INPUT_LOOP：RESULT < 0 或 >= 上界时 GOTO 重输）。
 *
 * @param {number} upper 合法输入的上界（GOHOUBI 3 / OSIOKI 9）
 * @returns {Promise<number>} 合法的选择值
 */
async function input_choice(upper) {
  let result = await era.input();
  while (result < 0 || result >= upper) {
    result = await era.input();
  }
  return result;
}

/**
 * @DUNGEON_AFTER（DUNGEON_AFTER.ERB:2-15）：战果结算的分派层。
 *
 * 任务归来状态 CFLAG:x:1 == 5（凯旋）→ 奖赏；== 6（败北）→ 惩罚；两臂
 * 结束后状态归 0。其余状态不动作。
 *
 * @param {number} cid 角色 ID（原作全局 A）
 * @returns {Promise<number>} 0（原作 RETURN 0；调用方不读）
 */
async function dungeon_after(cid) {
  if (chara(cid).invasion.状态 === 5) {
    await gohoubi(cid);
    chara(cid).invasion.状态 = 0;
  } else if (chara(cid).invasion.状态 === 6) {
    await osioski(cid);
    chara(cid).invasion.状态 = 0;
  }
  return 0;
}

/**
 * 奖赏的档位表（@GOHOUBI :40-62，顺从 ABL:10 → LOCAL:10）。
 * ABL:10 > 10 时 LOCAL:10 保持 0（Emuera 局部量初值）。
 * @param {number} cid 角色 ID
 * @returns {number} 欲情/私处/肛门点数的增量
 */
function gohoubi_reward_level(cid) {
  return (
    [150, 300, 600, 1200, 2500, 5000, 10000, 20000, 40000, 80000, 150000][
      chara(cid).system.顺从
    ] ?? 0
  );
}

/**
 * 惩罚的两张档位表（@OSIOKI :353-401）：LOCAL:10 按顺从（欲情增量）、
 * LOCAL:11 按欲望（苦痛/屈服增量）。
 * @param {number} cid 角色 ID
 * @returns {{ju: number, desire: number}} 顺从档位 / 欲望档位的点数
 */
function osioski_reward_levels(cid) {
  const table = [50, 100, 200, 400, 800, 1500, 3000, 6000, 12000, 25000, 50000];
  return {
    ju: table[chara(cid).system.顺从] ?? 0,
    desire: table[chara(cid).system.欲望] ?? 0,
  };
}

/**
 * @GOHOUBI（DUNGEON_AFTER.ERB:19-322）：奖赏臂——凯旋奴隶的犒赏。
 *
 * 三选（[0] 应份 / [1] 勋章 / [2] 承诺之物），第三选按该奴隶要求的奖赏
 * 种类（CFLAG:x:504）分十档：0 金币（金库不足回落否定）/ 1-3 兽奸（犬・
 * 豚・馬）/ 4 接吻 / 5 性交 / 6 精液 / 7 乱交 / 8 饮尿 / 9 童贞狩。
 * 兽奸・性交・乱交・童贞狩按身体（处女或男人 → 肛门，否则私处；性交与
 * 童贞狩按私处/肛门感觉高低）分两臂，各自加算 JUEL 点数与 EXP 经验。
 * 每档结算中段 CALL GOHOUBI_AFTER_KOUJO（口上分发，ere/kojo/
 * kojo-dungeon-after.js；未移植的性格不发一言）。
 *
 * @param {number} cid 角色 ID（原作全局 A）
 * @returns {Promise<void>} 原作无 RETURN（RESULT 0 落回）
 */
async function gohoubi(cid) {
  const name = name_of(cid);
  era.println(); // :23 PRINTL
  era.print(`${name}打倒了勇者，凯旋而归，来到你的身边，`);
  await era.waitAnyKey();
  era.print(`请赐予${name}奖励。`);
  await era.waitAnyKey();

  // :27-29 选项菜单——纯文本 + 自由输入（文件头）
  era.print('[0] 这是你应份的');
  era.print('[1] 授予勋章');
  era.print('[2] 赐予承诺的东西');
  // :30-36 $INPUT_LOOP
  const result = await input_choice(3);

  // :40-62 LOCAL:10 = 顺从档位（点数增量）
  const local10 = gohoubi_reward_level(cid);
  const lv = era.get(`cflag:${cid}:9`) || 0; // CFLAG:9 = 等级

  if (result === 0) {
    // :66-70 应份——否定点数
    era.print(`${name}嘟着嘴回到了自己的房间。`);
    await era.waitAnyKey();
    era.print(`否定点数增加${lv * 60}`);
    await era.waitAnyKey();
    era.add(`juel:${cid}:100`, lv * 60); // JUEL:100 否定点数
    await gohoubi_after_koujo(cid, result);
  } else if (result === 1) {
    // :72-80 勋章
    era.print(`${name}被授予了勋章，`);
    await era.waitAnyKey();
    // :75-76 乳首穿孔位（CFLAG:7 & 1）立着 → 摘钉换勋章
    if (((era.get(`cflag:${cid}:7`) || 0) & 1) === 1) {
      era.print(`${name}毫不犹豫地把乳钉换成了勋章，`);
      await era.waitAnyKey();
    }
    era.print(`${name}自豪地把勋章戴在身上。`); // :77 PRINTFORML（不等键）
    era.print('勋章经验+1');
    await era.waitAnyKey();
    chara(cid).event.勋章经验 += 1; // EXP:81（event 域门面）
    await gohoubi_after_koujo(cid, result);
  } else if (result === 2) {
    // :81-322 承诺之物——按 CFLAG:x:504 分档
    const gift = era.get(`cflag:${cid}:504`) || 0; // CFLAG:504 要求的奖赏
    // 处女（TALENT:0）或男人（TALENT:122）→ 肛门臂（兽奸四档共用判据）
    const anal =
      (era.get(`talent:${cid}:0`) || 0) === 1 ||
      (era.get(`talent:${cid}:122`) || 0) === 1;
    // :213/:291 性交・童贞狩的臂判据：私处感觉 > 肛门感觉
    const vaginal_first =
      chara(cid).system.私处感觉 > chara(cid).system.肛门感觉;

    if (gift === 0) {
      // :83-98 金币
      if (era_flag.money >= lv * 100) {
        era.print(`你赐给${name}装满${lv * 100}金币的袋子。`);
        await era.waitAnyKey();
        era.print(`被抓住的勇者看到${name}如此堕落，很受打击……`);
        await era.waitAnyKey();
        era_flag.money -= lv * 100;
        era_exflag.legit_money -= lv * 100; // EX_FLAG:4444 非作弊资金
        await gohoubi_after_koujo(cid, result);
      } else {
        era.print(`你准备赐给${name}${lv * 100}金币。`);
        await era.waitAnyKey();
        era.print('但是副官突然小声对你说金库里没有那么多钱了……');
        await era.waitAnyKey();
        era.print('你只好改口说奴隶不需要奖赏');
        await era.waitAnyKey();
        era.print(`${name}嘟着嘴回到了自己的房间。`);
        await era.waitAnyKey();
        era.print(`否定点数增加${lv * 60}`);
        await era.waitAnyKey();
        era.add(`juel:${cid}:100`, lv * 60);
        // :91-98 金库不足臂无口上调用（原作如此），不补
      }
    } else if (gift === 1) {
      // :99-132 犬と兽奸
      if (anal) {
        era.print(`${name}全裸着，撑开尻穴在狗屋前勾引着狗，`);
        await era.waitAnyKey();
        era.print(
          `狗跨到身上开始交配，${name}发出像野兽一样的娇喘，用尻穴高潮了，`,
        );
        await era.waitAnyKey();
        era.print('由于战斗的余韵，交配比平常更激烈且持久。');
        await era.waitAnyKey();
        await gohoubi_after_koujo(cid, result);
        era.print(`欲情点数+${local10}`);
        await era.waitAnyKey();
        era.print(`肛门点数+${local10}`);
        await era.waitAnyKey();
        era.print('肛门经验+10');
        era.print('绝顶经验+5');
        era.print('兽奸经验+10');
        await era.waitAnyKey();
        era.add(`juel:${cid}:2`, local10); // JUEL:2 肛门
        era.add(`juel:${cid}:5`, local10); // JUEL:5 欲情
        chara(cid).dungeon.肛门经验 += 10;
        chara(cid).dungeon.绝顶经验 += 5;
        chara(cid).dungeon.兽奸经验 += 10;
      } else {
        era.print(`${name}全裸着，摇着屁股在狗屋前勾引着狗，`);
        await era.waitAnyKey();
        era.print(
          `狗跨到身上开始交配，${name}发出像野兽一样的娇喘，用绝顶高潮了，`,
        );
        await era.waitAnyKey();
        era.print('由于战斗的余韵，交配比平常更激烈且持久。');
        await era.waitAnyKey();
        await gohoubi_after_koujo(cid, result);
        era.print(`私处点数+${local10}`);
        await era.waitAnyKey();
        era.print(`欲情点数+${local10}`);
        await era.waitAnyKey();
        era.print('私处经验+10');
        era.print('绝顶经验+5');
        era.print('兽奸经验+10');
        await era.waitAnyKey();
        era.add(`juel:${cid}:1`, local10); // JUEL:1 私处
        era.add(`juel:${cid}:5`, local10);
        chara(cid).dungeon.私处经验 += 10;
        chara(cid).dungeon.绝顶经验 += 5;
        chara(cid).dungeon.兽奸经验 += 10;
      }
    } else if (gift === 2) {
      // :133-165 豚と兽奸（两臂文本相同）
      era.print(`${name}全裸身体冲进猪窝，着迷地贪求着钻头一样的猪阴茎，`);
      await era.waitAnyKey();
      era.print(
        `因为母猪的登场，公猪们都兴奋了起来，一头头地爬跨到${name}身上，`,
      );
      await era.waitAnyKey();
      era.print(`${name}发出猪叫，醉心于猪的交配中…`);
      await era.waitAnyKey();
      await gohoubi_after_koujo(cid, result);
      if (anal) {
        era.print(`肛门点数+${local10}`);
        await era.waitAnyKey();
        era.print(`欲情点数+${local10}`);
        await era.waitAnyKey();
        era.print('肛门经验+10');
        era.print('绝顶经验+5');
        era.print('兽奸经验+10');
        await era.waitAnyKey();
        era.add(`juel:${cid}:2`, local10);
        era.add(`juel:${cid}:5`, local10);
        chara(cid).dungeon.肛门经验 += 10;
        chara(cid).dungeon.绝顶经验 += 5;
        chara(cid).dungeon.兽奸经验 += 10;
      } else {
        era.print(`私处点数+${local10}`);
        await era.waitAnyKey();
        era.print(`欲情点数+${local10}`);
        await era.waitAnyKey();
        era.print('私处经验+10');
        era.print('绝顶经验+5');
        era.print('兽奸经验+10');
        await era.waitAnyKey();
        era.add(`juel:${cid}:1`, local10);
        era.add(`juel:${cid}:5`, local10);
        chara(cid).dungeon.私处经验 += 10;
        chara(cid).dungeon.绝顶经验 += 5;
        chara(cid).dungeon.兽奸经验 += 10;
      }
    } else if (gift === 3) {
      // :166-202 馬と兽奸（扩张经验随臂）
      era.print(
        `${name}脸朝下被固定在台子上，想到接下来的变态性爱，爱液沿着大腿流下来，`,
      );
      await era.waitAnyKey();
      era.print(
        `小个子的马被牵了进来，跨到了${name}的身上，股间巨大的马阴茎已经勃起，`,
      );
      await era.waitAnyKey();
      era.print(
        `激烈的交配终于开始了，台上的${name}口吐泡沫，滴着爱液，沉迷于快感之中。`,
      );
      await era.waitAnyKey();
      await gohoubi_after_koujo(cid, result);
      if (anal) {
        era.print(`肛门点数+${local10}`);
        await era.waitAnyKey();
        era.print(`欲情点数+${local10}`);
        await era.waitAnyKey();
        era.print('肛门经验+10');
        era.print('绝顶经验+5');
        era.print('兽奸经验+10');
        era.print('肛门扩张经验+10');
        await era.waitAnyKey();
        era.add(`juel:${cid}:2`, local10);
        era.add(`juel:${cid}:5`, local10);
        chara(cid).dungeon.肛门经验 += 10;
        chara(cid).dungeon.绝顶经验 += 5;
        chara(cid).dungeon.肛门扩张经验 += 10;
        chara(cid).dungeon.兽奸经验 += 10;
      } else {
        era.print(`私处点数+${local10}`);
        await era.waitAnyKey();
        era.print(`欲情点数+${local10}`);
        await era.waitAnyKey();
        era.print('私处经验+10');
        era.print('绝顶经验+5');
        era.print('兽奸经验+10');
        era.print('阴道扩张经验+10');
        await era.waitAnyKey();
        era.add(`juel:${cid}:1`, local10);
        era.add(`juel:${cid}:5`, local10);
        chara(cid).dungeon.私处经验 += 10;
        chara(cid).dungeon.绝顶经验 += 5;
        chara(cid).dungeon.私处扩张经验 += 10;
        chara(cid).dungeon.兽奸经验 += 10;
      }
    } else if (gift === 4) {
      // :203-209 接吻
      era.print(`${name}含情脉脉地闭上眼睛，张开双手，要求和你接吻，`);
      await era.waitAnyKey();
      era.print(`你牵起她的手，温柔地吻住了${name}的嘴唇。`);
      await era.waitAnyKey();
      await gohoubi_after_koujo(cid, result);
      era.print('爱情经验+10');
      await era.waitAnyKey();
      chara(cid).train.爱情经验 += 10; // EXP:23（train 域门面）
    } else if (gift === 5) {
      // :210-239 セックス（私处/肛门感觉定臂）
      era.print(`你抱住了${name}因为战斗而发热的身体，`);
      await era.waitAnyKey();
      if (vaginal_first) {
        era.print('充满爱意地在她私处中抽插。');
        await era.waitAnyKey();
        await gohoubi_after_koujo(cid, result);
        era.print(`私处点数+${local10}`);
        await era.waitAnyKey();
        era.print(`欲情点数+${local10}`);
        await era.waitAnyKey();
        era.print('私处经验+10');
        era.print('性交经验+10');
        era.print('绝顶经验+5');
        await era.waitAnyKey();
        era.add(`juel:${cid}:1`, local10);
        era.add(`juel:${cid}:5`, local10);
        chara(cid).dungeon.私处经验 += 10;
        chara(cid).dungeon.性交经验 += 10;
        chara(cid).dungeon.绝顶经验 += 5;
      } else {
        era.print('用阴茎抚慰了饥渴不安的肛门。');
        await era.waitAnyKey();
        await gohoubi_after_koujo(cid, result);
        era.print(`肛门点数+${local10}`);
        await era.waitAnyKey();
        era.print(`欲情点数+${local10}`);
        await era.waitAnyKey();
        era.print('肛门经验+10');
        era.print('性交经验+10');
        era.print('绝顶经验+5');
        await era.waitAnyKey();
        era.add(`juel:${cid}:2`, local10);
        era.add(`juel:${cid}:5`, local10);
        chara(cid).dungeon.肛门经验 += 10;
        chara(cid).dungeon.性交经验 += 10;
        chara(cid).dungeon.绝顶经验 += 5;
      }
    } else if (gift === 6) {
      // :240-250 ザーメン
      era.print(
        `${name}顺从地跪下，张开嘴巴，伸出了舌头乞求着精液。看见她这个模样，你射出了精液。`,
      );
      await era.waitAnyKey();
      era.print(
        `${name}用手将洒落的的精液沾起来舔干净，充满爱意地吮吸起你的阴茎。`,
      );
      await era.waitAnyKey();
      await gohoubi_after_koujo(cid, result);
      era.print(`欲情点数+${local10}`);
      await era.waitAnyKey();
      era.print('口交经验+10');
      era.print('精液经验+5');
      await era.waitAnyKey();
      era.add(`juel:${cid}:5`, local10);
      chara(cid).dungeon.口交经验 += 10;
      chara(cid).dungeon.精液经验 += 5;
    } else if (gift === 7) {
      // :251-279 乱交
      era.print('怪物和魔族都齐聚的乱交派对开始了，');
      await era.waitAnyKey();
      era.print(
        `${name}是主角，不管男女都一起疯狂交换着，身上涂满了精液和爱液，`,
      );
      await era.waitAnyKey();
      era.print(`最后，所有人在${name}身上齐射着精液和小便，派对就结束了。`);
      await era.waitAnyKey();
      await gohoubi_after_koujo(cid, result);
      if (anal) {
        era.print(`肛门点数+${local10}`);
        await era.waitAnyKey();
        era.print(`欲情点数+${local10}`);
        await era.waitAnyKey();
        era.print('肛门经验+10');
        era.print('绝顶经验+5');
        await era.waitAnyKey();
        era.add(`juel:${cid}:2`, local10);
        era.add(`juel:${cid}:5`, local10);
        chara(cid).dungeon.肛门经验 += 10;
        chara(cid).dungeon.绝顶经验 += 5;
      } else {
        era.print(`私处点数+${local10}`);
        await era.waitAnyKey();
        era.print(`欲情点数+${local10}`);
        await era.waitAnyKey();
        era.print('私处经验+10');
        era.print('绝顶经验+5');
        await era.waitAnyKey();
        era.add(`juel:${cid}:1`, local10);
        era.add(`juel:${cid}:5`, local10);
        chara(cid).dungeon.私处经验 += 10;
        chara(cid).dungeon.绝顶经验 += 5;
      }
    } else if (gift === 8) {
      // :280-287 おしっこ——魔王非扶她（121）非男人（122）时是秘裂
      const organ =
        !era.get('talent:0:121') && !era.get('talent:0:122') ? '秘裂' : '阴茎';
      era.print(`在吮吸着${organ}的${name}的嘴里，尿了出来。`);
      await era.waitAnyKey();
      era.print(`${name}高兴地咕嘟咕嘟地喝着，`);
      await era.waitAnyKey();
      era.print('洒在地板上的，也意犹未尽地用舌头舔干净……');
      await era.waitAnyKey();
      await gohoubi_after_koujo(cid, result);
      era.print(`欲情点数+${local10}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:5`, local10);
    } else if (gift === 9) {
      // :288-319 童贞狩り——首行 PRINTFORM 不换行，与臂判词拼一行
      era.print(`${name}将被选中的魔族处男的肉棒`);
      if (vaginal_first) {
        era.print('用私处吞入了，');
        await era.waitAnyKey();
        era.print('教给了他性交的快乐。');
        await era.waitAnyKey();
        await gohoubi_after_koujo(cid, result);
        era.print(`私处点数+${local10}`);
        await era.waitAnyKey();
        era.print(`欲情点数+${local10}`);
        await era.waitAnyKey();
        era.print('私处经验+10');
        era.print('性交经验+10');
        era.print('绝顶经验+5');
        await era.waitAnyKey();
        era.add(`juel:${cid}:1`, local10);
        era.add(`juel:${cid}:5`, local10);
        chara(cid).dungeon.私处经验 += 10;
        chara(cid).dungeon.性交经验 += 10;
        chara(cid).dungeon.绝顶经验 += 5;
      } else {
        era.print('用肛门吞入着，');
        await era.waitAnyKey();
        era.print('用尻穴帮他破处了。');
        await era.waitAnyKey();
        await gohoubi_after_koujo(cid, result);
        era.print(`肛门点数+${local10}`);
        await era.waitAnyKey();
        era.print(`欲情点数+${local10}`);
        await era.waitAnyKey();
        era.print('肛门经验+10');
        era.print('性交经验+10');
        era.print('绝顶经验+5');
        await era.waitAnyKey();
        era.add(`juel:${cid}:2`, local10);
        era.add(`juel:${cid}:5`, local10);
        chara(cid).dungeon.肛门经验 += 10;
        chara(cid).dungeon.性交经验 += 10;
        chara(cid).dungeon.绝顶经验 += 5;
      }
    }
    // :320-321 ELSE 空档（CFLAG:504 > 9 或负值）——无动作
  }
}

/**
 * @OSIOKI（DUNGEON_AFTER.ERB:325-568）：惩罚臂——败北奴隶的处罚。
 *
 * 九选（[0] 不做 / [1] 电椅 / [2] 当街自慰 / [3] 当街脱粪 / [4] 鞭 /
 * [5] 小便器 / [6] 打扫厕所 / [7] 不给吃饭 / [8] 媚药放置），部分选项按
 * 素质/能力分两臂（抖M气质・露出癖・受虐狂/淫乱），各自加算 JUEL 点数与
 * EXP 经验。每档结算中段 CALL OSIOKI_KOUJO（口上分发，同上）。
 *
 * @param {number} cid 角色 ID（原作全局 A）
 * @returns {Promise<void>} 原作 RETURN 0（:568）
 */
async function osioski(cid) {
  const name = name_of(cid);
  era.println(); // :327 PRINTL
  era.print(`${name}没有发现勇者（或者是输了），失败而归`);
  await era.waitAnyKey();
  era.print(`要处罚${name}吗？`);
  await era.waitAnyKey();

  // :331-339 选项菜单——三行拼行（PRINT 不换行 / PRINTL 换行；行尾全角
  // 空格照抄排版）。纯文本 + 自由输入（文件头）
  era.print('[0] 什么也不做\u3000 [1] 低压电椅刑\u3000 [2] 当街自慰刑\u3000');
  era.print(
    '[3] 当街脱粪刑\u3000 [4] 鞭刑\u3000\u3000\u3000\u3000[5] 小便器刑\u3000\u3000',
  );
  era.print('[6] 打扫厕所刑\u3000 [7] 不给吃饭刑\u3000 [8] 媚药放置刑\u3000');
  // :340-346 $INPUT_LOOP
  const result = await input_choice(9);

  // :353-401 档位表：LOCAL:10 顺从（欲情）/ LOCAL:11 欲望（苦痛・屈服）
  const { ju: local10, desire: local11 } = osioski_reward_levels(cid);
  const dabM = chara(cid).system.抖M气质 >= 3; // :413/:487 ABL:21
  const exposure = chara(cid).system.露出癖; // :434/:463 ABL:17

  if (result === 0) {
    // :404-408 什么也不做
    era.print(`${name}露出了放心的表情回到自己房间了。`);
    await era.waitAnyKey();
    await osioski_koujo(cid, result);
  } else if (result === 1) {
    // :409-429 低压电椅刑
    era.print(`把${name}绑在电椅上，用较弱的电流进行折磨，`);
    await era.waitAnyKey();
    if (dabM) {
      era.print(`${name}带着恍惚的表情，因为电击的痛苦，两腿间都湿了。`);
      await era.waitAnyKey();
      await osioski_koujo(cid, result);
      era.print(`苦痛点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:9`, local11); // JUEL:9 苦痛
      era.print(`欲情点数+${local10}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:5`, local10);
      era.print(`屈服点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:6`, local11); // JUEL:6 屈服
    } else {
      era.print(`${name}哭叫着，在电击的痛苦中漏出了小便。`);
      await era.waitAnyKey();
      await osioski_koujo(cid, result);
      era.print(`苦痛点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:9`, local11);
      era.print(`屈服点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:6`, local11);
    }
  } else if (result === 2) {
    // :430-458 当街自慰刑（露出癖 >= 4 定臂）
    era.print(`让${name}全裸着，在地下城的主干道正中央自慰。`);
    await era.waitAnyKey();
    if (exposure >= 4) {
      era.print(
        `${name}不停地说着淫秽不堪的话语，向路过的魔族展示着自己淫乱的姿态。`,
      );
      await era.waitAnyKey();
      await osioski_koujo(cid, result);
      era.print(`欲情点数+${local10}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:5`, local10);
      era.print(`屈服点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:6`, local11);
      era.print('自慰经验+3');
      era.print('调教自慰经验+3');
      await era.waitAnyKey();
      chara(cid).dungeon.自慰经验 += 3;
      chara(cid).dungeon.调教自慰经验 += 3;
    } else {
      era.print(`${name}面红耳赤，战战兢兢地自慰着。`);
      await era.waitAnyKey();
      await osioski_koujo(cid, result);
      era.print(`耻情点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:8`, local11); // JUEL:8 耻情
      era.print(`屈服点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:6`, local11);
      era.print('自慰经验+1');
      era.print('调教自慰经验+1');
      await era.waitAnyKey();
      chara(cid).dungeon.自慰经验 += 1;
      chara(cid).dungeon.调教自慰经验 += 1;
    }
  } else if (result === 3) {
    // :459-482 当街脱粪刑（露出癖 >= 6 定臂）
    era.print(`让${name}全裸着，在地下城的主干道正中央脱粪。`);
    await era.waitAnyKey();
    if (exposure >= 6) {
      era.print(`${name}感受着当众的开放感，淫荡地自慰了起来，`);
      await era.waitAnyKey();
      era.print(`路过的魔族都用轻蔑的表情冷眼看着${name}。`);
      await era.waitAnyKey();
      await osioski_koujo(cid, result);
      era.print(`欲情点数+${local10}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:5`, local10);
      era.print(`屈服点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:6`, local11);
      era.print('自慰经验+3');
      await era.waitAnyKey();
      chara(cid).dungeon.自慰经验 += 3;
    } else {
      era.print(`${name}面红耳赤，一边脱粪，一边因为过度的羞耻失声痛哭。`);
      await era.waitAnyKey();
      era.print(`路过的魔族都用侮蔑的表情冷眼看着${name}`);
      await era.waitAnyKey();
      await osioski_koujo(cid, result);
      era.print(`耻情点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:8`, local11);
      era.print(`屈服点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:6`, local11);
    }
  } else if (result === 4) {
    // :483-503 鞭刑（抖M气质 >= 3 定臂）
    era.print(`把${name}绑起来，用鞭子抽打，`);
    await era.waitAnyKey();
    if (dabM) {
      era.print(`${name}带着恍惚的表情，欢叫着沉醉在被鞭打的快感中。`);
      await era.waitAnyKey();
      await osioski_koujo(cid, result);
      era.print(`苦痛点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:9`, local11);
      era.print(`欲情点数+${local10}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:5`, local10);
      era.print(`屈服点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:6`, local11);
    } else {
      era.print(`被鞭子痛打的${name}哭喊着，小便都漏了出来。`);
      await era.waitAnyKey();
      await osioski_koujo(cid, result);
      era.print(`苦痛点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:9`, local11);
      era.print(`屈服点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:6`, local11);
    }
  } else if (result === 5) {
    // :504-527 小便器刑（受虐狂 TALENT:88 或淫乱 TALENT:76 定臂）
    era.print(`将${name}固定在小便器上，让使用者尽情地往她身上撒尿，`);
    await era.waitAnyKey();
    if (
      (era.get(`talent:${cid}:88`) || 0) === 1 ||
      (era.get(`talent:${cid}:76`) || 0) === 1
    ) {
      era.print(`${name}十分兴奋，用嘴巴接饮着小便，`);
      await era.waitAnyKey();
      era.print(`${name}沾满了尿，带着恍惚的表情，腿间不停地流出爱液。`);
      await era.waitAnyKey();
      await osioski_koujo(cid, result);
      era.print(`苦痛点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:9`, local11);
      era.print(`欲情点数+${local10}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:5`, local10);
      era.print(`屈服点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:6`, local11);
    } else {
      era.print(
        `${name}悲伤地哭喊着，但是使用者仍然毫不留情地把小便淋在她的脸上，`,
      );
      await era.waitAnyKey();
      era.print(`结果，${name}全身沾满小便，带着绝望的表情不断呓语着。`);
      await era.waitAnyKey();
      await osioski_koujo(cid, result);
      era.print(`苦痛点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:9`, local11);
      era.print(`屈服点数+${local11}`);
      await era.waitAnyKey();
      era.add(`juel:${cid}:6`, local11);
    }
  } else if (result === 6) {
    // :528-535 打扫厕所刑
    era.print(`${name}的处罚是打扫厕所，`);
    await era.waitAnyKey();
    era.print(`${name}一脸不满地把厕所打扫干净了。`);
    await era.waitAnyKey();
    await osioski_koujo(cid, result);
    era.print(`屈服点数+${local11}`);
    await era.waitAnyKey();
    era.add(`juel:${cid}:6`, local11);
  } else if (result === 7) {
    // :536-543 不给吃饭刑
    era.print(`${name}的处罚是不给饭食，`);
    await era.waitAnyKey();
    era.print(`${name}的肚子，发出咕咕的叫声。`);
    await era.waitAnyKey();
    await osioski_koujo(cid, result);
    era.print(`屈服点数+${local11}`);
    await era.waitAnyKey();
    era.add(`juel:${cid}:6`, local11);
  } else if (result === 8) {
    // :544-561 媚药放置刑
    era.print(`将${name}的身体固定住，注射了几乎是危险剂量的强力媚药，`);
    await era.waitAnyKey();
    era.print('药效马上就发作了，全身都成了敏感带，令人发狂地痒了起来。');
    await era.waitAnyKey();
    era.print('让魔族的年轻百合女在旁边待机，桌上放了各种各样的淫具，');
    await era.waitAnyKey();
    era.print(
      `对女孩下了命令，不时地让${name}舒服一下免得发疯，但是要做好高潮管理，`,
    );
    await era.waitAnyKey();
    era.print(
      `${name}不断说出各种淫荡和屈辱的话语，乞求着凌辱，旁边的女孩却一副冷淡的表情不为所动。`,
    );
    await era.waitAnyKey();
    era.print(`听着${name}拼命哭喊的声音，你走出了房间。`);
    await era.waitAnyKey();
    await osioski_koujo(cid, result);
    era.print(`苦痛点数+${local11}`);
    await era.waitAnyKey();
    era.add(`juel:${cid}:9`, local11);
    era.print(`欲情点数+${local10}`);
    await era.waitAnyKey();
    era.add(`juel:${cid}:5`, local10);
    era.print(`屈服点数+${local11}`);
    await era.waitAnyKey();
    era.add(`juel:${cid}:6`, local11);
    era.print('药物经验+10');
    await era.waitAnyKey();
    chara(cid).dungeon.药物经验 += 10;
  }
  // :562-566 ELSEIF RESULT == 9 是死分支（输入循环拦回 >= 9，文件头），
  // 0-8 全被上方覆盖——原作结构如此，不另设分支
  return 0;
}

module.exports = { dungeon_after, gohoubi, osioski };
