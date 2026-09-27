/**
 * @file 失神状态机：失神判定、失神中的计数与文本、恢复时的参数回流、
 * 野外失神的带回处理。
 *
 * TFLAG 簿记：
 *   - 864-882：失神中的状态保存与计算用（864-865/866-867/877-878 等分位
 *     装备，868-876 精液/污液计数，879-882 特殊装备/媚药利尿/情景/触手）；
 *   - 883-894：失神中的 UP 暂存（883-888 失神瞬间 / 889-894 失神中）；
 *   - 895：本回合是否新触发失神（1 快感 / 2 苦痛 / 3 恐怖 / 4 快感+苦痛 /
 *     6 苦痛+恐怖）；896/897/898：恐怖/绝顶/苦痛的相位（2 失神中 / 3 恢复）；
 *   - 899：失神中的指令执行回数（≥ 1 即失神中——kojo_message_com_family
 *     的第 4 道头部检查读它，#213）。
 *
 * 这张工单在阶段里的位置：TFLAG:899 的**写入路径**（#213 七道检查的
 * 第四道此前无真实置位者）。passout_check 是唯一写点，测试里有「写入
 * 路径 → 检查」的端到端证明（test/passout.test.js）。
 *
 * 实现说明（有意偏离，均注明依据）：
 *   - G / X / Y（passout_message 尾部写给 passout_palam_up 读的三个
 *     跨函数值）不落表，模块级承载（#214 A/S 同款结论：跨函数
 *     显式传递的结构，此处跨的是 message → palam_up 的调用间隙，且
 *     CFLAG:99 剪裁路径会跳过 message——跳过时残留旧值，模块级
 *     let 恰好同构）。
 *   - passout_text 恢复分支里一段被注释掉的调用（设 TFLAG:200 = 12 后
 *     调 self_kojo；注记理由「TFLAG:200 が中身違うのでスルー」＝此处
 *     TFLAG:200 内容不同，跳过）维持不启用——self_kojo 的分发族
 *     （SELF_KOJO_K{n}）已由 kojo-system.js 承载，这条调用不接。
 *   - 侵犯持续骨架句的代词取对象角色 she(cid)——按对象的性别显示他/她。
 *   - FLAG:70（失神系统开关）全库零写点 → 恒 0 → 系统恒开，检查照读
 *     flag:70。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');

/** MASTER：魔王主角，恒为角色 0（CONTEXT.md） */
const MASTER = 0;

const tal = (id, i) => era.get(`talent:${id}:${i}`) || 0;
const abl = (id, i) => Math.floor(era.get(`abl:${id}:${i}`) || 0);
const tequip = (id, i) => era.get(`tequip:${id}:${i}`) || 0;
const tflag = (i) => era.get(`tflag:${i}`) || 0;
const set_tflag = (i, v) => era.set(`tflag:${i}`, v);
const add_tflag = (i, v) => era.add(`tflag:${i}`, v);
/** UP（delta）的读写——表属主 train（PORT_TABLE_OWNERS），直写 */
const up = (id, i) => era.get(`delta:${id}:${i}`) || 0;
const add_up = (id, i, v) => era.add(`delta:${id}:${i}`, v);
const zero_up = (id, i) => era.set(`delta:${id}:${i}`, 0);
/** 名字承载（#5 决议：无 savestr 通道，读 callname） */
const name_of = (id) => era.get(`callname:${id}:-1`) ?? '';

/** 代词 she：按 TALENT:122 显示他/她（三行纯函数，随这张工单内联） */
function she(id) {
  return tal(id, 122) ? '他' : '她';
}

// G/X/Y：passout_message 尾写、passout_palam_up 读（头注——不落表）
let G = 0; // 精液系计数和（868+869+870+874+875+876）
let X = 0; // 装备系计数和（取负，867+877+878+866+879+864+865+880+881）
let Y = 0; // 膣内/肛内精液计数和（871+872）

/**
 * passout_check：失神判定。
 * 三条触发线：连续强绝顶（Z = NOWEX:0-3 之和 ≥ 16 两回，8% / 60%）、
 * 单回合苦痛 ≥ 7500 或累计 ≥ 15000（50%）、单回合恐怖 ≥ 5000（50%）；
 * 已失神中（TFLAG:899 ≥ 1）不重复触发。恢复判定在尾段（强绝顶 /
 * 苦痛 ≥ 5000 / 执行 4 回）。EXP:65 = 调教失神经验。
 * @param {(n: number) => number} [rand] 随机源（须返回 [0, n) 的整数）
 * @returns {Promise<void>}
 */
async function passout_check(rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const cid = era_flag.target;
  if ((era.get('flag:70') || 0) === 1) {
    return; // 系统关闭（头注：全库零写点，恒开）
  }
  set_tflag(895, 0);

  const z = // Z = 本回合四部位绝顶计数和（NOWEX:0-3）
    (era.get(`nowex:${cid}:0`) || 0) +
    (era.get(`nowex:${cid}:1`) || 0) +
    (era.get(`nowex:${cid}:2`) || 0) +
    (era.get(`nowex:${cid}:3`) || 0);

  // 连续强绝顶（首回 8% 记相位、次回 60% 失神）
  if (z >= 16 && tflag(897) === 0 && tflag(899) < 1 && rand_n(10) < 8) {
    set_tflag(897, 1);
  } else if (z >= 16 && tflag(897) === 1 && tflag(899) < 1 && rand_n(10) < 6) {
    set_tflag(895, 1);
    set_tflag(897, 2);
    era.add(`exp:${cid}:65`, 1);
    era.print('失神');
  } else if (z < 16 && tflag(897) < 2 && tflag(899) < 1) {
    set_tflag(897, 0); // 连续中断，相位回退
  }

  // 苦痛（PALAM:9 的累计跨回合折算：≥ 15000 减去之）
  let a = era.get(`palam:${cid}:9`) || 0;
  if (a >= 15000) {
    a -= 15000;
  }
  if (
    (up(cid, 9) >= 7500 || up(cid, 9) + a >= 15000) &&
    tflag(899) < 1 &&
    rand_n(10) < 5
  ) {
    if (tflag(895) === 0) {
      set_tflag(895, 2);
      set_tflag(898, 2);
      era.add(`exp:${cid}:65`, 1);
      era.print('失神');
    } else if (tflag(895) === 1) {
      // 快感失神叠加苦痛 → 4
      set_tflag(895, 4);
      set_tflag(898, 2);
    }
  }

  // 恐怖（UP:10 ≥ 5000，50%）
  if (up(cid, 10) >= 5000 && tflag(899) < 1 && rand_n(10) < 5) {
    if (tflag(895) === 0) {
      set_tflag(895, 3);
      set_tflag(896, 2);
      era.add(`exp:${cid}:65`, 1);
      era.print('失神');
    } else if (tflag(895) === 2) {
      // 苦痛失神叠加恐怖 → 6
      set_tflag(895, 6);
      set_tflag(896, 2);
    }
  }

  // 失神中的指令执行回数（含失神当回——≥ 1 即失神中）
  if (tflag(896) >= 2 || tflag(897) >= 2 || tflag(898) >= 2) {
    if (tflag(899) === 0) {
      set_tflag(899, 1);
    } else if (tflag(899) >= 1) {
      add_tflag(899, 1);
    }
  }

  // 恢复判定（失神次回起；条件满足过一次后每回都判）
  if (tflag(899) >= 2) {
    if (z >= 16 || (tflag(899) >= 2 && up(cid, 9) >= 5000) || tflag(899) >= 4) {
      set_tflag(896, 3);
      set_tflag(897, 3);
      set_tflag(898, 3);
      era.print('从失神中恢复了');
    }
  }
}

/**
 * passout_text：失神瞬间的清零 + 每回合的精液/装备计数 +
 * 装备快照（初回）/ 变化检测（次回起，未失神回合同样跑 else 分支）+
 * 失神文案（895 分档 / 恢复 / 依然未醒）。
 * @returns {Promise<void>}
 */
async function passout_text() {
  const cid = era_flag.target;
  const com = era_flag.selectcom || 0;
  const cflag74 = () => era.get(`cflag:${cid}:74`) || 0;
  const condom = () => chara(cid).event.主人避孕套; // TEQUIP:35（属主 event）

  // 失神瞬间：864-894 全清（REPEAT 31）
  if (tflag(895) > 0) {
    for (let i = 0; i < 31; i += 1) {
      set_tflag(864 + i, 0);
    }
  }

  // 失神次回起：精液/污液计数（射到哪算哪——TEQUIP:35 戴套
  // 时计数减 1，头套不省）
  if (tflag(899) > 1) {
    if (tflag(0) + tflag(6) >= 1) {
      if (com === 80 || cflag74() === 1 || cflag74() === 2) {
        if (condom() === 0) {
          add_tflag(868, tflag(0) + tflag(6)); // 口内
        } else {
          add_tflag(868, tflag(0) + tflag(6) - 1);
        }
      } else if (com === 29 || cflag74() === 3 || cflag74() === 5) {
        if (condom() === 0) {
          add_tflag(869, tflag(0) + tflag(6)); // 被肛交射
        } else {
          add_tflag(869, tflag(0) + tflag(6) - 1);
        }
      }
    }
    if (tflag(1) + tflag(6) >= 1) {
      if (condom() === 0) {
        add_tflag(870, tflag(1) + tflag(6)); // 手/乳
      } else {
        add_tflag(870, tflag(1) + tflag(6) - 1);
      }
    }
    if (tflag(2) + tflag(6) >= 1) {
      // 膣内（体位组指令）/ 肛内（肛交位组）
      if (
        [
          20, 21, 22, 23, 34, 64, 120, 121, 128, 129, 130, 131, 132, 133, 134,
        ].includes(com)
      ) {
        if (condom() === 0) {
          add_tflag(871, tflag(2) + tflag(6));
        }
      } else if ([26, 27, 28, 29, 36].includes(com)) {
        if (condom() === 0) {
          add_tflag(872, tflag(2) + tflag(6));
        }
      }
    }
    add_tflag(873, tflag(3)); // 处女丧失
    if (tflag(2) + tflag(6) >= 1) {
      // 素股（33）与ぶっかけ位（CFLAG:74 4/6/7）
      if (com === 33 || cflag74() === 4 || cflag74() === 6 || cflag74() === 7) {
        if (condom() === 0) {
          add_tflag(874, tflag(6));
        } else {
          add_tflag(874, tflag(6) - 1);
        }
      }
    }
    if (tflag(2) >= 1) {
      add_tflag(875, tflag(2));
    }
    if (tflag(15) >= 1) {
      // 怪物/触手射精（101 触手 = 100、102 = 1000）
      if (com === 101) {
        add_tflag(876, 100);
      } else if (com === 102) {
        add_tflag(876, 1000);
      } else {
        add_tflag(876, tflag(15));
      }
    }
  }

  if (tflag(899) === 1) {
    // 失神初回：装备快照（此刻装着什么，恢复文本的参照系）
    set_tflag(867, 0);
    set_tflag(877, 0);
    if (tequip(cid, 13) === 1 || tequip(cid, 19) === 1) {
      set_tflag(867, 1); // 肛门侧插入系（蠕虫/肛珠）
    }
    if (tequip(cid, 11) === 1) {
      set_tflag(877, 1); // 私处侧插入系（蠕虫）
    }
    set_tflag(866, 0);
    set_tflag(878, 0);
    if (tequip(cid, 14) === 1 || tequip(cid, 17) === 1) {
      set_tflag(866, 1); // 取り付け系
    }
    if (tequip(cid, 15) === 1 || tequip(cid, 16) === 1) {
      set_tflag(878, 1); // 取り付け系（吸着系）
    }
    set_tflag(864, 0);
    set_tflag(865, 0);
    set_tflag(879, 0);
    if (tequip(cid, 44)) {
      set_tflag(864, tequip(cid, 44)); // 绳（值 = 绳种）
    }
    if (tequip(cid, 45) === 1) {
      set_tflag(865, tequip(cid, 45)); // 口塞
    }
    if (tequip(cid, 46) === 1 || tequip(cid, 49) === 1) {
      set_tflag(879, 1); // 被虐系装具
    }
    set_tflag(880, 0);
    if (tequip(cid, 21)) {
      set_tflag(880, 21); // 媚药
    } else if (tequip(cid, 22)) {
      set_tflag(880, 22); // 利尿剂
    }
    set_tflag(881, 0);
    if (tequip(cid, 53)) {
      set_tflag(881, 53); // 摄影机
    } else if (tequip(cid, 54)) {
      set_tflag(881, 54); // 野外
    } else if (tequip(cid, 58)) {
      set_tflag(881, 58); // 浴室
    }
    set_tflag(882, tequip(cid, 90)); // 触手
    if (cflag74() !== 0) {
      era.set(`cflag:${cid}:74`, 0); // ぶっかけ位复位
    }
  } else {
    // 失神次回起（含未失神回合）：与快照不同的位标 -1
    if (tequip(cid, 11) === 1 && tflag(877) !== 1) {
      set_tflag(877, -1);
    }
    if ((tequip(cid, 13) === 1 || tequip(cid, 19) === 1) && tflag(867) !== 1) {
      set_tflag(867, -1);
    }
    if ((tequip(cid, 14) === 1 || tequip(cid, 17) === 1) && tflag(866) !== 1) {
      set_tflag(866, -1);
    }
    if ((tequip(cid, 15) === 1 || tequip(cid, 16) === 1) && tflag(878) !== 1) {
      set_tflag(878, -1);
    }
    if (tequip(cid, 44) && tflag(864) !== tequip(cid, 44)) {
      set_tflag(864, -1);
    }
    if (tequip(cid, 45) === 1 && tflag(865) !== tequip(cid, 45)) {
      set_tflag(865, -1);
    }
    if ((tequip(cid, 46) === 1 || tequip(cid, 49) === 1) && tflag(879) !== 1) {
      set_tflag(879, -1);
    }
    if (
      (tequip(cid, 21) && tflag(880) !== 21) ||
      (tequip(cid, 22) && tflag(880) !== 22)
    ) {
      set_tflag(880, -1);
    }
    if (
      (tequip(cid, 53) && tflag(881) !== 53) ||
      (tequip(cid, 54) && tflag(881) !== 54) ||
      (tequip(cid, 58) && tflag(881) !== 58)
    ) {
      set_tflag(881, -1);
    }
    if (tequip(cid, 90) === 1 && tflag(882) !== 1) {
      set_tflag(882, -1);
    }
  }

  if (tflag(899) >= 1) {
    // 失神文案（895 分档；口塞 45 时首行台词吞掉）
    const gagged = () => tequip(cid, 45) === 0; // TEQUIP:45 == 0 才印
    if (tflag(895) === 1) {
      // 快感失神
      if (gagged()) {
        era.print('「噢哈啊啊啊啊啊啊啊！！…啊啊……哈……喔…♪」');
      }
      // 空内容输出落在上一行已收行之后 → 真空行（#595）
      era.print('');
      era.print(`…绝顶的快感令${name_of(cid)}全身抽搐，当场倒下了，`);
      era.print('因为过于强烈的刺激失去了意识。');
    } else if (tflag(895) === 2) {
      // 苦痛失神
      if (gagged()) {
        era.print('「不行了～～～～！！！…放、放过……我……吧」');
      }
      // 空内容输出落在上一行已收行之后 → 真空行（#595）
      era.print('');
      era.print(`…${name_of(cid)}当场倒下，因为过于强烈的痛楚失去了意识。`);
    } else if (tflag(895) === 3) {
      // 恐怖失神
      if (gagged()) {
        era.print('「不行了～～～～！！！…放、放过……我……吧」');
      }
      // 空内容输出落在上一行已收行之后 → 真空行（#595）
      era.print('');
      era.print(`…${name_of(cid)}当场倒下，因为过于强烈的恐惧失去了意识`);
    } else if (tflag(895) === 4) {
      // 快感 + 苦痛
      if (gagged()) {
        era.print('「噢哈啊啊啊啊啊啊啊！！…放、放过……我……吧」');
      }
      // 空内容输出落在上一行已收行之后 → 真空行（#595）
      era.print('');
      era.print(`…${name_of(cid)}全身抽搐，当场倒下了，`);
      era.print('被快感和痛楚同时冲击，失去了意识。');
    } else if (tflag(895) === 6) {
      // 苦痛 + 恐怖
      if (gagged()) {
        era.print('「不行了～～～～！！！…放、放过……我……吧」');
      }
      // 空内容输出落在上一行已收行之后 → 真空行（#595）
      era.print('');
      era.print(`…${name_of(cid)}全身抽搐，当场倒下了，`);
      era.print('受不了无法忍耐的痛楚和恐惧，失去了意识。');
    } else if (tflag(896) === 3 && tflag(897) === 3 && tflag(898) === 3) {
      // 恢复（等键 → 地の文章（CFLAG:99 == 0 才印））
      era.print(`${name_of(cid)}恢复了意识。`);
      await era.waitAnyKey();
      if ((era.get(`cflag:${cid}:99`) || 0) === 0) {
        await passout_message();
      }
      // 此处原样保留被注释掉的 TFLAG:200 = 12 / 调 SELF_KOJO——头注
    } else {
      // 空内容输出落在上一行已收行之后 → 真空行（#595）
      era.print('');
      era.print(`${name_of(cid)}依然未醒来。`);
    }
  }
}

/**
 * passout_message：恢复时的大段地の文章。
 * 按 TFLAG:868-882 的计数与 -1 标记选支，从上到下优先：挿しっぱ无 →
 * 处女丧失 → 膣内精液 → 肛内精液 → 触手污液 → 全身精液 → 插入系装备 →
 * 装具 → 被虐具 → 媚药利尿 → 情景 → 触手。尾段写 G/X/Y 给
 * passout_palam_up（头注）。
 * @returns {Promise<void>}
 */
async function passout_message() {
  const cid = era_flag.target;
  const player = era_flag.player;
  const com = era_flag.selectcom || 0;

  // 挿しっぱ无（TFLAG:60）：侵犯持续中的骨架句
  if (tflag(60) === 1) {
    era.print('不知不觉间，');
    if (com === 101 || com === 102) {
      era.print('触手把');
    }
    if (
      [
        20, 21, 22, 23, 34, 101, 120, 121, 128, 129, 130, 131, 132, 133, 134,
      ].includes(com)
    ) {
      era.print('膣内');
    } else {
      era.print('尻穴');
    }
    era.print(
      `给侵犯了，不顾失去意识的${name_of(cid)}，粗野地对待${she(cid)}。`,
    );
    if (com === 101 || com === 102) {
      era.print('触手');
    } else {
      era.print(name_of(player));
    }
    era.print('的抽插在持续中……');
    await era.waitAnyKey();
  }

  // 计数选支（逐条判断，命中即止）
  if (tflag(873) >= 1) {
    // 处女丧失（血 + 精液/污液的混合）
    if (tflag(60) === 1) {
      if (
        [
          20, 21, 22, 23, 34, 120, 121, 128, 129, 130, 131, 132, 133, 134,
        ].includes(com)
      ) {
        era.print('被阴茎强行塞满，');
      } else if (com === 101) {
        era.print('被触手强行塞满，');
      }
    }
    era.print('从私处里流出了血，');
    if (tflag(871) === 1) {
      era.print('混合着精液，');
    } else if (tflag(871) >= 2) {
      era.print('混合着大量的精液，');
    } else if (tflag(876) >= 100 && tflag(876) < 200) {
      era.print('混合着污液，');
    } else if (tflag(876) >= 200) {
      era.print('混合着大量的污液，');
    }
    era.print('终于察觉了，');
    era.print('不知不觉中，处女被夺走，茫然地呆了…');
    await era.waitAnyKey();
  } else if (tflag(871) >= 1) {
    // 膣内精液
    if (tflag(60) === 1) {
      if (
        [
          20, 21, 22, 23, 34, 120, 121, 128, 129, 130, 131, 132, 133, 134,
        ].includes(com)
      ) {
        era.print('被阴茎强行塞满的');
      } else if (com === 101) {
        era.print('被触手强行塞满的');
      }
    }
    era.print('私处');
    if (tflag(872) >= 1) {
      era.print('和');
      if ([26, 27, 28, 29].includes(com)) {
        era.print('被阴茎强行塞满的');
      } else if (com === 102) {
        era.print('被触手强行塞满的');
      }
      era.print('尻穴');
    }
    era.print('里面，');
    if (tflag(871) >= 2 || tflag(872) >= 2) {
      era.print('流出大量的');
    } else {
      era.print('滴下');
    }
    era.print('精液，终于被察觉了，');
    if (tal(cid, 85) === 1) {
      era.print('茫然地不知如何是好…');
    } else if (tal(cid, 10) === 1) {
      era.print('马上哭了起来…');
    } else {
      era.print(`紧紧地盯着${name_of(player)}…`);
    }
    await era.waitAnyKey();
  } else if (tflag(872) >= 1) {
    // 肛内精液
    if (tflag(60) === 1) {
      if ([26, 27, 28, 29].includes(com)) {
        era.print('被阴茎强行塞满的');
      } else if (com === 102) {
        era.print('被触手强行塞满的');
      }
    }
    era.print('尻穴里');
    if (tflag(871) >= 2 || tflag(872) >= 2) {
      era.print('流出大量的');
    } else {
      era.print('滴下');
    }
    era.print('精液，终于被察觉了，');
    if (tal(cid, 85) === 1) {
      era.print('茫然地不知如何是好…');
    } else if (tal(cid, 10) === 1) {
      era.print('马上哭了起来…');
    } else {
      era.print(`紧紧地盯着${name_of(player)}…`);
    }
    await era.waitAnyKey();
  } else if (tflag(876) >= 1) {
    // 触手污液
    era.print('全身沾满了');
    if (
      tflag(868) +
        tflag(869) +
        tflag(870) +
        tflag(871) +
        tflag(872) +
        tflag(873) +
        tflag(874) +
        tflag(875) >=
      1
    ) {
      era.print('精液，');
    }
    era.print('触手吐出的污液，和无法隐藏的困惑…');
    await era.waitAnyKey();
  } else if (
    tflag(868) + tflag(869) + tflag(870) + tflag(874) + tflag(875) >=
    1
  ) {
    // 全身精液
    era.print('不省人事前，没有感觉到身体');
    if (tflag(868) + tflag(869) + tflag(870) + tflag(874) + tflag(875) >= 3) {
      era.print('里面');
    }
    era.print('被洒满的精液，困惑地看着，');
    if (tal(cid, 85) === 1) {
      era.print('流出来了…');
    } else {
      era.print('并害怕着…');
    }
    await era.waitAnyKey();
  } else if (tflag(867) < 0 || tflag(877) < 0) {
    // 插入系装备（蠕虫/肛珠）
    era.print(' 不知什么时候，');
    if (tequip(cid, 11) === 1) {
      if (tequip(cid, 13) === 1) {
        era.print('两穴都被蠕虫，');
      } else if (tequip(cid, 19) === 1) {
        era.print('私处被蠕虫，肛门被肛珠，');
      } else {
        era.print('私处被蠕虫，');
      }
    } else if (tequip(cid, 13) === 1) {
      era.print('肛门被蠕虫，');
    } else if (tequip(cid, 19) === 1) {
      era.print('肛门被肛珠，');
    }
    era.print('插入了。');
    if (tflag(878) < 0 || tflag(866) < 0) {
      era.print('被装上了异样的器具，');
    }
    if (tflag(879) < 0 || tflag(864) < 0 || tflag(865) < 0) {
      era.print('被装上了器具，');
    }
    if (tequip(cid, 53)) {
      era.print('这个姿态被拍下来了，');
    }
    era.print('对这样的事感到不知所措…');
    await era.waitAnyKey();
  } else if (tflag(878) < 0 || tflag(866) < 0) {
    // 取り付け系装具
    era.print('对不经意间被装上了器具感到不知所措…');
    await era.waitAnyKey();
  } else if (tflag(879) < 0 || tflag(864) < 0 || tflag(865) < 0) {
    // 被虐系具（绳的支有专属句）
    era.print('不知什么时候，');
    if (tequip(cid, 44)) {
      era.print('被绑起来了，');
      if (tflag(878) < 0 || tflag(866) < 0) {
        era.print('之后，被装上了异样的器具，');
      }
      era.print('怎么会这样……');
    } else if (
      tequip(cid, 45) === 1 ||
      tequip(cid, 49) === 1 ||
      tequip(cid, 46) === 1
    ) {
      era.print('被装上了器具，');
    }
    era.print('发现后开始感到困惑和恐惧了…');
    await era.waitAnyKey();
  } else if (tflag(880) < 0) {
    // 媚药/利尿剂
    era.print('发现自己身体的异样，掩饰不住地困惑着，');
    await era.waitAnyKey();
  } else if (tflag(881) < 0) {
    // 情景（摄影机/野外/浴室）
    if (tequip(cid, 53)) {
      era.print('映照出自己的摄影机，');
    } else if (tequip(cid, 54)) {
      era.print('不知不觉间被带到屋外去了，');
    } else if (tequip(cid, 58)) {
      era.print('不知不觉间被带到浴室去了，');
    }
    era.print('发现后开始感到困惑和恐惧了…');
    await era.waitAnyKey();
  } else if (tflag(882) < 0) {
    // 触手
    era.print('不知不觉间…身体被触手缠绕了，开始感到困惑和恐惧了…');
    await era.waitAnyKey();
  }

  // 有任一装备变化或肛内精液 → 再等一次键
  if (
    tflag(867) +
      tflag(877) +
      tflag(878) +
      tflag(866) +
      tflag(879) +
      tflag(864) +
      tflag(865) +
      tflag(881) +
      tflag(882) <
      0 ||
    tflag(872) >= 1
  ) {
    await era.waitAnyKey();
  }

  // G/X/Y 结算（passout_palam_up 读，头注）
  G =
    tflag(868) + tflag(869) + tflag(870) + tflag(874) + tflag(875) + tflag(876);
  X =
    tflag(867) +
    tflag(877) +
    tflag(878) +
    tflag(866) +
    tflag(879) +
    tflag(864) +
    tflag(865) +
    tflag(880) +
    tflag(881);
  Y = tflag(871) + tflag(872);
  X = -X; // 取负
}

/**
 * passout_palam_check：失神中的 UP 暂存。
 * 失神瞬间（895 > 0）的 UP 进 883-888，失神中的进 889-894；
 * UP:4/6-13 清零（UP:9 本来就不进暂存——它是失神的触发线）。
 * @returns {void}
 */
function passout_palam_check() {
  const cid = era_flag.target;
  if (tflag(895) > 0) {
    add_tflag(883, up(cid, 6));
    add_tflag(884, up(cid, 8));
    add_tflag(885, up(cid, 10));
    add_tflag(886, up(cid, 11));
    add_tflag(887, up(cid, 12));
    add_tflag(888, up(cid, 13));
  } else {
    add_tflag(889, up(cid, 6));
    add_tflag(890, up(cid, 8));
    add_tflag(891, up(cid, 10));
    add_tflag(892, up(cid, 11));
    add_tflag(893, up(cid, 12));
    add_tflag(894, up(cid, 13));
  }
  // 清零（UP:7 / 4 / 6 / 8 / 9 / 10-13）
  for (const k of [4, 6, 7, 8, 9, 10, 11, 12, 13]) {
    zero_up(cid, k);
  }
}

/**
 * passout_palam_up：恢复时的参数回流。
 * 暂存按 (12 - TFLAG:899) 与 (TFLAG:899 - 2) 折算后放大返还
 * （G/X/Y 的乘算、处女丧失 873 的翻倍、刻印/顺从/爱慕的 Z 折扣），
 * 尾段把 896-899 复位。
 * @returns {void}
 */
function passout_palam_up() {
  const cid = era_flag.target;
  const t899 = tflag(899);
  let a = tflag(883) * (12 - t899);
  let b = tflag(884) * (12 - t899);
  let c = tflag(885) * (12 - t899);
  let d = tflag(886) * (12 - t899);
  let e = tflag(887) * (12 - t899);
  let f = tflag(888) * (12 - t899);
  if (t899 > 2) {
    a += tflag(889) * (t899 - 2);
    b += tflag(890) * (t899 - 2);
    c += tflag(891) * (t899 - 2);
    d += tflag(892) * (t899 - 2);
    e += tflag(893) * (t899 - 2);
    f += tflag(894) * (t899 - 2);
  }
  // 整数除（向零截断，正值域同 floor）
  a = Math.floor(a / 600);
  b = Math.floor(b / 240);
  c = Math.floor(c / 60);
  d = Math.floor(d / 10);
  e = Math.floor(e / 10);
  f = Math.floor(f / 10);
  // 精液/污液暴露（G ≥ 1）：全额乘 G + 精液中毒档的 UP:5 加成
  if (G >= 1) {
    a += a * G;
    b += b * G;
    c += c * G;
    d += d * G;
    e += e * G;
    f += f * G;
    if (abl(cid, 32) === 3) {
      add_up(cid, 5, 1000);
    } else if (abl(cid, 32) === 4) {
      add_up(cid, 5, 1500);
    } else if (abl(cid, 32) >= 5) {
      add_up(cid, 5, 2000);
    }
  }
  // 装具变化（X ≥ 1）：全额乘 X
  if (X >= 1) {
    a += a * X;
    b += b * X;
    c += c * X;
    d += d * X;
    e += e * X;
    f += f * X;
  }
  // 膣内/肛内精液（Y ≥ 1）：全额乘 Y + 同款 UP:5 加成
  if (Y >= 1) {
    a += a * Y;
    b += b * Y;
    c += c * Y;
    d += d * Y;
    e += e * Y;
    f += f * Y;
    if (abl(cid, 32) === 3) {
      add_up(cid, 5, 1000);
    } else if (abl(cid, 32) === 4) {
      add_up(cid, 5, 1500);
    } else if (abl(cid, 32) >= 5) {
      add_up(cid, 5, 2000);
    }
  }
  // 处女丧失（873 ≥ 1）：翻倍
  if (tflag(873) >= 1) {
    a *= 2;
    b *= 2;
    c *= 2;
    d *= 2;
    e *= 2;
    f *= 2;
  }
  // 恐怖/屈服的折扣率 Z（屈服刻印 MARK:2 与顺从 ABL:10 抬 Z，
  // 爱慕 TALENT:85 减半）
  let z = 100;
  z -= (era.get(`mark:${cid}:2`) || 0) * 10;
  z -= abl(cid, 10) * 5;
  if (tal(cid, 85)) {
    z = Math.floor(z / 2);
  }
  // 分配（恐怖/屈服走 Z，其余走 100 - Z）
  const idiv = (v, w) => Math.floor((v * w) / 100);
  add_up(cid, 7, idiv(a, 100 - z));
  add_up(cid, 8, idiv(b, 100 - z));
  add_up(cid, 10, idiv(c, 100 - z));
  add_up(cid, 11, idiv(d, z));
  add_up(cid, 12, idiv(e, z));
  add_up(cid, 13, idiv(f, z));

  // 恢复完成：相位与回数复位
  if (tflag(896) === 3 || tflag(897) === 3 || tflag(898) === 3) {
    set_tflag(896, 0);
    set_tflag(897, 0);
    set_tflag(898, 0);
    set_tflag(899, 0);
  }
}

/**
 * passout_outdoor：野外 PLAY 中失神 → 解除野外位、带回房间、
 * 调教者体力气力小损（BASE 0/1 各 -20/-10，钳 0——属主 dungeon 走门面）。
 * @returns {Promise<void>}
 */
async function passout_outdoor() {
  const cid = era_flag.target;
  era.set(`tequip:${cid}:54`, 0); // 野外 PLAY 解除（属主 train）
  era.print(`${name_of(cid)}失神了，所以带回了房间…`);
  await era.waitAnyKey();
  // 调教者的体力/气力（BASE:MASTER:0/1，钳 0）
  chara(MASTER).dungeon.体力 = Math.max(
    (era.get(`base:${MASTER}:0`) || 0) - 20,
    0,
  );
  chara(MASTER).dungeon.气力 = Math.max(
    (era.get(`base:${MASTER}:1`) || 0) - 10,
    0,
  );
}

module.exports = {
  passout_check,
  passout_text,
  passout_message,
  passout_palam_check,
  passout_palam_up,
  passout_outdoor,
};
