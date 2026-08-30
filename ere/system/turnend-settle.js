/**
 * @file 回合结束事件 @EVENTTURNEND 的普通档定义（issue #114——回合结算本体）。
 *
 * 源: target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB  @EVENTTURNEND（:234-760，普通档）
 *
 * 与 ere/event/event-turnend.js（#PRI 档）在同一条链上先后执行：#PRI 先跑
 * （时段/日期推进），本处理器随后（#6 语义：#PRI 尾部的 BEGIN SHOP（行 140）只暂存
 * 跳转，链继续），尾部 BEGIN SHOP（行 758）覆盖暂存值（同为 SHOP，无差异）。
 * 第三处 #LATER 定义是空的（ere/event/event-turnend-later.js）。
 *
 * 移植说明：
 *   - 跨域写一律走门面（#71/#72：属主域门面 setter）：base 体力/气力、
 *     cflag 状态/新人/回城标志/休憩/已接任务/好感度/基础攻击/基础防御、
 *     talent 容易陷落/异种婚姻/使役/头发长度/阴毛状态、exp 战斗经验。本
 *     文件属 system 域，flag:81/86/88/90（侵攻度）、cflag:570（从属怪物）、
 *     abl:10（顺从）是域内写，裸寻址即合法；juel 表无所有权产物（#70 未
 *     测量），读写均不判定。
 *   - 角色循环语义：原作以已加入序号迭代（FOR TARGET/A, 0, CHARANUM；结算
 *     主循环 A = 1 起跳过魔王），ere 侧按角色 ID 迭代（era.getAddedCharacters()
 *     逐一遍历，结算循环跳过 cid 0——魔王恒角色 ID 0，与原作跳过首位角色
 *     等价，CONTEXT.md「角色与指针」）。
 *   - EQUIP_CHECK/WEAPON_RESTORE 自 #174（H5）起为真身（ere/system/equip/）：
 *     装备倍率按佩戴效果实际取值，戒指两事件（陷落/洗脑）随 RESULT > 0 可达。
 *     KYOTEN_EVENT（#119）自本票起接线：四个领域的衰减块在衰减完成后按
 *     领域号调用（ere/page/page-invasion.js 的 kyoten_event——system → page
 *     的依赖方向与 juel-check → page-info-exp 同构，判断依据见 issue #119
 *     评论）。ARG:0 == 1 人间界臂是真身；2/3/4 三臂不可达（FLAG:86/88/90
 *     无写入路径恒 0，衰减分支不进），被调时空转。INVASION_CHECK（#118）
 *     不在存根之列：原作即是注释状态（行 621）、1:1 不调用。EVENT_NEWDAY
 *     自 #115 起为真身（ere/event/event-nextday.js，含每日一次的 @ENDCHECK
 *     调用点）。
 */

const era = require('#/era-electron');
const { on } = require('#/system/event/registry');
const { begin, STATE } = require('#/system/flow/begin-signal');
const { kyoten_event } = require('#/page/page-invasion');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const { stub_line } = require('#/utils/stub-line');
const { run_event_newday } = require('#/event/event-nextday');
const { equip_check } = require('#/system/equip/equip-check');
const { weapon_restore } = require('#/system/equip/weapon-restore');
const {
  party_unite,
  party_join,
  party_del,
} = require('#/dungeon/dungeon-party');
const { run_dungeon } = require('#/dungeon/dungeon');
const { dungeon_map } = require('#/dungeon/labo-dungeon-map');
const { geo_output_2 } = require('#/dungeon/labo-map');
const { lvup } = require('#/dungeon/dungeon-lvup');
const { dungeon_after } = require('#/dungeon/dungeon-after');
const { run_benki } = require('#/system/train/benki');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。#172（H3）起 PARTY_UNITE / DUNGEON /
 * PARTY_JOIN / PARTY_DEL 已接真身（ere/dungeon/），从名单移除；#181（H12）
 * 起 DUNGEON_MAP（2D 模式的 else 臂）与 GEO_OUTPUT_2（FLAG:502==1 的地图
 * 重绘）亦接真身（ere/dungeon/labo-dungeon-map.js 与 labo-map.js）；#179
 * （H10）起 LVUP / DUNGEON_AFTER 亦接真身（ere/dungeon/dungeon-lvup.js 与
 * dungeon-after.js）；#217（J7）起 BENKI 亦接真身（ere/system/train/
 * benki.js）——四条均从名单移除。
 */
const STUBBED_CALLS = [
  'FORMAT_AUTOTRAIN',
  '自動處刑',
  'NAEDOKO',
  'MARRIAGE_DAY',
  'AUTOTRAIN',
  'CAMPAIGN_GAMEOVER',
  'GET_LOOK_INFO',
];

/** 原作 RAND:N（0..N-1）的等价物 */
function rand(n) {
  return Math.floor(Math.random() * n);
}

on('EVENTTURNEND', async () => {
  // :244-247 指针暂存与复位。ASSI_POOL 在原作赋值后无读者（行 755 的助手
  // 还原读 FLAG:2），照搬注释、不落变量
  const target_pool = era_flag.target;
  era_flag.player = 0;
  era_flag.assi = -1;

  // :250-258 全角色：自动调教格式化、新人/自动调教标志消去
  for (const cid of era.getAddedCharacters()) {
    stub_line('FORMAT_AUTOTRAIN', '自动调教格式化');
    chara(cid).invasion.新人 = 0; // CFLAG:506 = 0（行 254）
    chara(cid).train.自动调教 = 0; // CFLAG:666 = 0（行 256）
  }

  // :263 队伍编成（パーティー設定）——#172 起真身（ere/dungeon/）
  party_unite();

  // :265-272 全角色：装备复原；战役中（CFLAG:1 == 12）的角色推进迷宫攻略
  for (const cid of era.getAddedCharacters()) {
    weapon_restore(cid); // CALL WEAPON_RESTORE（行 267；#174 起真身）
    if (chara(cid).invasion.状态 === 12) {
      // 阶段 3 的接入点之一（勇者战役）——#172 起真身。行 270-271
      await run_dungeon(cid);
    }
  }

  // :274-296 起：结算主循环（原作 A = 1 起跳过魔王；LEADER/A 的往复在
  // DUNGEON 存根下无角色增减，按角色 ID 直迭）
  for (const cid of era.getAddedCharacters()) {
    if (cid === 0) {
      continue;
    }

    // 战役结束后的复位（行 280-284）
    if ((era.get('flag:400') || 0) === 0 && chara(cid).invasion.状态 === 12) {
      chara(cid).invasion.状态 = 0;
      chara(cid).dungeon.已接任务 = 0;
    }

    // :286-296 迷宫攻略分档——阶段 3 的接入点之二：勇者探索中（2）或
    // 迎击中（3）且非 2D 模式（FLAG:502 == 0）走迷宫本体（#172 起真身，
    // H1 的勇者生成让守卫第一次可达）；2D 模式走地图（#181 起真身，
    // ere/dungeon/labo-dungeon-map.js，缺省随机源走 Math.random）。
    const place = chara(cid).invasion.状态;
    if ((place === 2 || place === 3) && (era.get('flag:502') || 0) === 0) {
      await run_dungeon(cid);
    } else if (place === 2 || place === 3) {
      await dungeon_map(cid);
    }

    // :298-299 升级结算（侵攻中的勇者除外）——#179 起真身
    //（ere/dungeon/dungeon-lvup.js；守卫 SIF CFLAG:A:1 != 2 原样保留，
    // 与 H2 写入的 CFLAG:1 = 2 直接耦合：侵攻中的勇者不升级）
    if (place !== 2) {
      lvup(cid);
    }

    // :302 战果结算——#179 起真身（ere/dungeon/dungeon-after.js）
    await dungeon_after(cid);

    // :304-352 体力回复。此处 TIME 已被 #PRI 档翻转：午后结算（TIME==1，
    // 调教后的夜休）回 MAX/2，午前结算（日推进回合）回 MAX/10
    if (chara(cid).dungeon.体力 < 1) {
      chara(cid).dungeon.体力 = 1;
    }
    const max_hp = era.get(`maxbase:${cid}:0`) || 0;
    let heal =
      era_flag.time === 1 ? Math.floor(max_hp / 10) : Math.floor(max_hp / 2);

    // :314-326 装备效果（W:8 = 4 HP回复加成乘、W:8 = 13 回复减衰除；行 318
    // 与 324 的 RESULT += 1 已并入调用）
    heal *= equip_check(cid, 4) + 1;
    heal = Math.floor(heal / (equip_check(cid, 13) + 1));

    // :328-330 吸血鬼（TALENT:314 == 3）回复三倍
    if ((era.get(`talent:${cid}:314`) || 0) === 3) {
      heal *= 3;
    }

    // :332-334 侵攻中的勇者回复惩罚（÷30）
    if (place === 2) {
      heal = Math.floor(heal / 30);
    }

    // :336-340 休憩标志（CFLAG:503 & 1）：回复翻倍、消费掉一位
    if (chara(cid).dungeon.休憩 & 1) {
      heal *= 2;
      chara(cid).dungeon.休憩 -= 1;
    }
    chara(cid).train.灌肠经验 = 0; // :341 CFLAG:A:4 = 0

    // :343-348 快速回复（TALENT:111）×2 / 回复缓慢（112）、虚弱（256）÷2
    if (era.get(`talent:${cid}:111`)) {
      heal *= 2;
    } else if (era.get(`talent:${cid}:112`) || era.get(`talent:${cid}:256`)) {
      heal = Math.floor(heal / 2);
    }

    chara(cid).dungeon.体力 += heal;
    if (chara(cid).dungeon.体力 > max_hp) {
      chara(cid).dungeon.体力 = max_hp;
    }

    // :354-384 气力回复：侵攻中的勇者按上限/40 缓回（装备 W:8 = 5/13 与
    // 刚强/胆怯修正在内），其余直接回满
    if (place === 2) {
      const max_wp = era.get(`maxbase:${cid}:1`) || 0;
      let mheal = Math.floor(max_wp / 40);
      mheal *= equip_check(cid, 5) + 1;
      mheal = Math.floor(mheal / (equip_check(cid, 13) + 1));
      if (era.get(`talent:${cid}:12`)) {
        mheal *= 2; // 刚强
      } else if (era.get(`talent:${cid}:10`)) {
        mheal = Math.floor(mheal / 2); // 胆怯
      }
      chara(cid).dungeon.气力 += mheal;
      if (chara(cid).dungeon.气力 > max_wp) {
        chara(cid).dungeon.气力 = max_wp;
      }
    } else {
      chara(cid).dungeon.气力 = era.get(`maxbase:${cid}:1`) || 0;
    }

    // :386-388 场所复位（不在 2/3/7/8/9/10/11/12 任一特殊状态则归 0）
    if (![2, 3, 7, 8, 9, 10, 11, 12].includes(chara(cid).invasion.状态)) {
      chara(cid).invasion.状态 = 0;
    }

    // :390-413 容易陷落戒指（W:8 = 6）。RESULT 按佩戴效果取值（#174 起真身）
    const fall_ring = equip_check(cid, 6);
    era.println(); // PRINTFORML（行 394）
    if (
      fall_ring > 0 &&
      !era.get(`talent:${cid}:69`) &&
      !era.get(`talent:${cid}:73`)
    ) {
      const name = era.get(`callname:${cid}:-1`) ?? '';
      era.print(`${name}手上的粉红色戒指发出诡异的粉色光芒`);
      era.print(`戒指的魔力永久地改变了${name}的身体和心灵`);
      era.print(`${name}身体变得敏感，心中充满了欲望。`);
      await era.waitAnyKey();
      chara(cid).chara.容易陷落 = 1; // TALENT:A:73 = 1（行 399）
      if ((era.get(`juel:${cid}:5`) || 0) < 10000) {
        era.add(`juel:${cid}:5`, Math.floor(fall_ring / 2)); // 按等级欲情（行 401）
      }
    } else if (
      fall_ring > 0 &&
      !era.get(`talent:${cid}:69`) &&
      era.get(`talent:${cid}:73`) &&
      (era.get(`juel:${cid}:5`) || 0) < 10000 &&
      Math.floor(fall_ring / 2) > 0
    ) {
      const name = era.get(`callname:${cid}:-1`) ?? '';
      era.print(`${name}手上的粉红色戒指发出诡异的粉色光芒`);
      era.print(`${name}对情欲的渴求变的更强了。`);
      await era.waitAnyKey();
      if ((era.get(`juel:${cid}:5`) || 0) < 10000) {
        era.add(`juel:${cid}:5`, Math.floor(fall_ring / 2));
      }
    } else if (fall_ring > 0 && era.get(`talent:${cid}:69`)) {
      const name = era.get(`callname:${cid}:-1`) ?? '';
      era.print(`${name}手上的粉红色戒指发出诡异的粉色光芒`);
      era.print(`然而戒指的魔力对${name}完全没有产生任何效果`);
      era.print(
        `${name}用不屑的眼神看了一眼戒指，「在黑暗的地方大概还能照明用吧。」`,
      );
      await era.waitAnyKey();
    }

    // :415-431 攻击/防御增加的装备效果已被原作移进 @WEAPON_RESTORE（注释段）
    // :433-437 经验增加（W:8 = 10）
    {
      const exp_up = equip_check(cid, 10);
      if (exp_up > 0) {
        chara(cid).dungeon.战斗经验 += exp_up * 10;
      }
    }

    // :439-449 攻击防御减少（W:8 = 14），下限 15
    {
      const down = equip_check(cid, 14);
      if (down > 0) {
        chara(cid).chara.基础攻击 = Math.max(
          chara(cid).chara.基础攻击 - down,
          15,
        );
        chara(cid).chara.基础防御 = Math.max(
          chara(cid).chara.基础防御 - down,
          15,
        );
      }
    }

    // :451-494 支配（W:8 = 9）与异种婚姻/使役的伙伴决定
    {
      const dominate = equip_check(cid, 9);
      if (era.get(`talent:${cid}:159`)) {
        // 异种婚姻：结婚对象必定使役（CFLAG:601 是对象 NO，100-199 段之外无效）
        let partner = era.get(`cflag:${cid}:601`) || 0;
        if (partner < 100 || partner >= 200) {
          partner = 0;
        }
        chara(cid).system.从属怪物 = partner;
        if (partner === 0) {
          // 初始化的情况下失去异种婚姻
          chara(cid).chara.异种婚姻 = 0;
        }
      } else if (dominate > 0 && chara(cid).invasion.状态 === 3) {
        // 迎击中的勇者按阶层决定捕获（存根 RESULT 0 下不达，1:1 保留）
        let partner = (era.get(`cflag:${cid}:501`) || 0) - 1;
        partner *= 10;
        partner += 100 + rand(5);
        if ((era.get(`cflag:${cid}:501`) || 0) >= 8 && rand(10) === 0) {
          const rare = 191 + rand(3);
          if ((era.get(`item:${rare}`) || 0) > 0) {
            partner = rare;
          }
        }
        chara(cid).system.从属怪物 = partner;
      } else if (era.get(`talent:${cid}:265`)) {
        // 使役：无伙伴时随机取得（阶层越低概率越高；极稀有超强使役）
        if (chara(cid).system.从属怪物 === 0) {
          let x = 0;
          for (x = 0; x < 9; x += 1) {
            if (rand(3) === 0) {
              break;
            }
          }
          if (x > 8) {
            x = 8;
          }
          x *= 10;
          x += 100 + rand(5);
          if (rand(50) === 0) {
            x = 191 + rand(3);
          }
          chara(cid).system.从属怪物 = x;
        }
      } else {
        chara(cid).system.从属怪物 = 0;
      }
    }

    // :496-523 洗脑戒指（W:8 = 15）。RESULT 按佩戴效果取值（#174 起真身）
    {
      const brainwash = equip_check(cid, 15);
      era.println(); // PRINTFORML（行 499）
      if (brainwash > 0 && era.get(`talent:${cid}:152`)) {
        const name = era.get(`callname:${cid}:-1`) ?? '';
        era.print(`${name}手上的灰色戒指发出奇异的魔法波动`);
        era.print(`一个声音在${name}的脑内不断重复，服从……服从……服从……`);
        era.print(`然而${name}凭借自己强大的意志力无视了戒指的魔法`);
        era.print(
          `${name}用不屑的眼神看了一眼戒指，「看起来倒是还挺漂亮的。」`,
        );
        await era.waitAnyKey();
      } else if (
        brainwash > 0 &&
        chara(cid).invasion.状态 === 2 &&
        !era.get(`talent:${cid}:152`)
      ) {
        const name = era.get(`callname:${cid}:-1`) ?? '';
        chara(cid).invasion.状态 = 0;
        era.print(`${name}手上的灰色戒指发出奇异的魔法波动`);
        era.print(`一个声音在${name}的脑内不断重复，服从……服从……服从……`);
        era.print(
          `${name}的眼神变得空洞，完全忘记了讨伐魔王的事情，自动向魔王的士兵投降了。`,
        );
        era.print(`${name}成了魔王的俘虏。`);
        await era.waitAnyKey();
        chara(cid).invasion.新人 = 1; // CFLAG:506 = 1（行 511）
        chara(cid).invasion.回城标志 = 0; // CFLAG:507 = 0（行 512）
        party_del(cid); // 行 513 CALL PARTY_DEL（#172 起真身）
        chara(cid).system.顺从 += 1; // ABL:A:10 += 1（行 514）
      } else if (
        brainwash > 0 &&
        chara(cid).system.顺从 < brainwash &&
        !era.get(`talent:${cid}:152`)
      ) {
        const name = era.get(`callname:${cid}:-1`) ?? '';
        era.print(`${name}手上的灰色戒指发出奇异的魔法波动`);
        era.print(`一个声音在${name}的脑内不断重复，服从……服从……服从……`);
        era.print(`${name}对魔王的顺从程度增加了`);
        await era.waitAnyKey();
        chara(cid).system.顺从 += 1; // 行 519
      } else if (
        brainwash > 0 &&
        chara(cid).system.顺从 >= brainwash &&
        !era.get(`talent:${cid}:152`)
      ) {
        const name = era.get(`callname:${cid}:-1`) ?? '';
        era.print(`${name}手上的灰色戒指发出奇异的魔法波动`);
        era.print(`但是戒指的魔力似乎不足以再提升${name}的顺从程度了。`);
        await era.waitAnyKey();
      }
    }

    // :525-528 好感度减少（侵攻中的勇者，好感 > 100 时每日衰减 RAND:100）
    if (chara(cid).invasion.状态 === 2 && chara(cid).chara.好感度 > 100) {
      chara(cid).chara.好感度 -= rand(100);
    }

    // :530-547 头发生长（eraWIZ 流用改変）：长到 51/201 时播报。发色一段
    // 的 GET_LOOK_INFO 未移植（占位行随播报），「的」随之缺省避免叠字
    if ((era.get(`talent:${cid}:302`) || 0) <= 201) {
      chara(cid).chara.头发长度 += 1;
      const hair = chara(cid).chara.头发长度;
      if (hair === 51 || hair === 201) {
        const name = era.get(`callname:${cid}:-1`) ?? '';
        const beauty =
          (era.get(`talent:${cid}:312`) || 0) === 22 ? '美丽的' : '';
        stub_line('GET_LOOK_INFO', '发色信息');
        era.print(
          `${name}${beauty}${
            hair === 51 ? '头发半长，到肩膀了。' : '头发很长，长发及腰。'
          }`,
        );
      }
    }

    // :548-582 阴毛生长：TALENT:310 追上 311 停止（125 是「不生长」素质）
    if (
      (era.get(`talent:${cid}:310`) || 0) <
        (era.get(`talent:${cid}:311`) || 0) &&
      !era.get(`talent:${cid}:125`) &&
      (era.get(`talent:${cid}:310`) || 0) <= 200
    ) {
      chara(cid).chara.阴毛状态 += 1;
      const growth = chara(cid).chara.阴毛状态;
      if ([2, 21, 51, 101, 151, 201].includes(growth)) {
        const name = era.get(`callname:${cid}:-1`) ?? '';
        const charm = {
          11: '可爱肚脐下',
          14: '臀部阴影中',
          15: '美丽大腿根',
          22: '艳丽',
        }[era.get(`talent:${cid}:312`) || 0];
        const state_word = {
          2: '汗毛长出来了。',
          21: '汗毛长满了。',
          51: '细毛长满了。',
          101: '嫩草丛生着。',
          151: '刚毛长出来了。',
          201: '森林复苏了。',
        }[growth];
        stub_line('GET_LOOK_INFO', '发色信息'); // 毛色判定同上缺省
        era.print(`${name}${charm ?? ''}的阴阜上，`);
        era.print(state_word);
        if (chara(cid).chara.阴毛状态 >= (era.get(`talent:${cid}:311`) || 0)) {
          // 长满即钳到目标值（行 578-580）
          chara(cid).chara.阴毛状态 = era.get(`talent:${cid}:311`) || 0;
        }
      }
    }
  }

  // :589-609 自动处刑（FLAG:5 & 8 的开关位；EXECUTION_MINI 在原作注释段内，
  // 登记不占位）。FLAG:5 的位 3 开局为 0（@EVENTFIRST 置 17179934119）
  if ((era.get('flag:5') || 0) & 8) {
    stub_line('自動處刑', '自动处刑');
  }

  // :611-617 「战斗日志 SKIP 中断」开关（FLAG:5 位 9）开着则强制等键
  if (((era.get('flag:5') || 0) >> 9) & 1) {
    await era.waitAnyKey(true); // FORCEWAIT
  } else {
    await era.waitAnyKey(); // WAIT
  }

  // :619 魔王的升级结算——#179 起真身（CALL LVUP, 0）
  lvup(0);

  // 原作此处即注释状态（;CALL INVASION_CHECK，行 621）；#118 落地时按其结论处置

  era.println(); // :623 PRINTL
  // :624-699 侵攻度自然衰减：未征服（FLAG:82/87/89/91 == 0）且有余量时每日 RAND:100；
  // 已征服低概率反抗、保底 100。直接决定通关天数（#112 验收的天数估算依据），
  // 1:1 保留。衰减后各领域按领域号 CALL KYOTEN_EVENT, <1-4>（#119 接线，
  // 本体在 ere/page/page-invasion.js）
  await decay_invasion_degree(1, {
    conquered: era.get('flag:82') || 0, // 人间界征服完了
    degree: () => era.get('flag:81') || 0, // 人间界侵攻度
    write: (v) => era.set('flag:81', v),
    resist_text: '人间界的军队反抗着魔王军的侵略………',
    lost_text: '*人间界的侵略度减少了*',
    reconquer_resist_text: '人间界的军队为了夺回领地、反抗着魔王军………',
    reconquer_lost_text: '*地上的魔界领土的侵略度减少了*',
    reconquer_rand: 6,
  }); // 行 624-642（KYOTEN_EVENT,1 的调用点在行 631/640）
  await decay_invasion_degree(2, {
    conquered: era.get('flag:87') || 0, // 精灵领域征服完了
    degree: () => era.get('flag:86') || 0, // 精灵领域侵攻度
    write: (v) => era.set('flag:86', v),
    resist_text: '精灵族的抵抗组织反抗着魔王军………',
    lost_text: '*精灵领域的侵略度减少了*',
    reconquer_resist_text: '精灵族的抵抗组织为了夺回领地、反抗着魔王军………',
    reconquer_lost_text: '*黑暗精灵的领土的侵略度减少了*',
    reconquer_rand: 5,
  }); // 行 643-661（KYOTEN_EVENT,2 的调用点在行 650/659）
  await decay_invasion_degree(3, {
    conquered: era.get('flag:89') || 0, // 龙山征服完了
    degree: () => era.get('flag:88') || 0, // 龙山侵攻度
    write: (v) => era.set('flag:88', v),
    resist_text: '成群的龙抵抗着魔王的军队………',
    lost_text: '*龙之山脉的侵略度减少了*',
    reconquer_resist_text: '成群的龙为了夺回领地、反抗着魔王军………',
    reconquer_lost_text: '*混沌龙之山的侵略度减少了*',
    reconquer_rand: 4,
  }); // 行 662-680（KYOTEN_EVENT,3 的调用点在行 669/678）
  await decay_invasion_degree(4, {
    conquered: era.get('flag:91') || 0, // 天界征服完了
    degree: () => era.get('flag:90') || 0, // 天界侵攻度
    write: (v) => era.set('flag:90', v),
    resist_text: '天界的军队抵抗着魔王军………',
    lost_text: '*天界的侵略度减少了*',
    reconquer_resist_text: '天界的军队为了夺回领地、反抗着魔王军………',
    reconquer_lost_text: '*堕天使的淫界的侵略度减少了*',
    reconquer_rand: 3,
  }); // 行 681-699（KYOTEN_EVENT,4 的调用点在行 688/697）

  // :702-718 魔王的回复：午前结算（TIME==0，日推进的回合）+1400，午后结算
  // +1000；战役中（FLAG:400 > 0）气力改为 -10。TIME 已被 #PRI 翻转
  const maou_heal = era_flag.time === 0 ? 1400 : 1000;
  chara(0).dungeon.体力 += maou_heal;
  const maou_max_hp = era.get('maxbase:0:0') || 0;
  if (chara(0).dungeon.体力 > maou_max_hp) {
    chara(0).dungeon.体力 = maou_max_hp;
  }
  const maou_wp_heal = (era.get('flag:400') || 0) > 0 ? -10 : maou_heal;
  chara(0).dungeon.气力 += maou_wp_heal;
  const maou_max_wp = era.get('maxbase:0:1') || 0;
  if (chara(0).dungeon.气力 > maou_max_wp) {
    chara(0).dungeon.气力 = maou_max_wp;
  }

  // :721 战役败北检查
  stub_line('CAMPAIGN_GAMEOVER', '战役败北检查');

  // :723 目标还原（暂存值；助手不还原——行 755 读 FLAG:2）
  era_flag.target = target_pool;

  // :725-737 全角色：肉便器/苗床业务与结婚日、事件后的场所/任务复位
  for (const cid of era.getAddedCharacters()) {
    // :729 CALL BENKI（#217 真身：肉便器业务——门槛不中静默返回，演出段
    // 输出 + BENKI_KOUJO 口上存根，见 ere/system/train/benki.js）
    await run_benki(cid);
    stub_line('NAEDOKO', '苗床业务');
    stub_line('MARRIAGE_DAY', '结婚日');
    if ((era.get('flag:400') || 0) === 0 && chara(cid).invasion.状态 === 12) {
      chara(cid).invasion.状态 = 0;
      chara(cid).dungeon.已接任务 = 0;
    }
  }

  // :740 自动调教
  stub_line('AUTOTRAIN', '自动调教');

  // :743 队伍结成——#172 起真身（ere/dungeon/；内含 PARTY_UNITE 复调）
  await party_join();

  // :745-746 2D 模式（FLAG:502 == 1）的地图重绘（#181 起真身，
  // ere/dungeon/labo-map.js 的 geo_output_2）
  if ((era.get('flag:502') || 0) === 1) {
    await geo_output_2();
  }

  // :749-751 翌朝的事件（日推进回合 TIME==0 时；#115 真身——影寿命段 +
  // 晨间三事件存根 + 每日一次的 @ENDCHECK 调用点）
  if (era_flag.time === 0) {
    await run_event_newday();
  }

  // :753-758 还原前次的调教对象与助手（FLAG:1/FLAG:2，@EVENTEND 记录）
  era_flag.target = era.get('flag:1') || 0;
  era_flag.assi = era.get('flag:2') || 0;

  // BEGIN SHOP（行 758）—— 覆盖 #PRI 档的暂存值（后写胜出，#6 语义）
  begin(STATE.SHOP);
});

/**
 * 侵攻度自然衰减（行 624-699 四个领域的同构块）。
 *
 * 未征服（conquered == 0）：余量 > 0 时每日衰减 RAND:100、下限 0；
 * 已征服（conquered == 1）：每 reconquer_rand 日一遇的反抗，余量 > 100 时
 * 衰减 RAND:100、下限 100。衰减完成后 CALL KYOTEN_EVENT, region（#119 接线，
 * 调用点行号见各调用处注释）。
 *
 * @param {number} region 领域号（KYOTEN_EVENT 的原作实参 1-4）
 * @param {object} spec 一个领域的衰减参数
 * @param {number} spec.conquered 征服完了旗标（FLAG:82/87/89/91）
 * @param {Function} spec.degree 侵攻度读子（FLAG:81/86/88/90）
 * @param {Function} spec.write 侵攻度写子（域内写，直落 flag）
 * @param {string} spec.resist_text 未征服时的抵抗播报（PRINTL）
 * @param {string} spec.lost_text 侵攻度减少播报（PRINTW）
 * @param {string} spec.reconquer_resist_text 已征服时的反抗播报（PRINTL）
 * @param {string} spec.reconquer_lost_text 领土夺回播报（PRINTW）
 * @param {number} spec.reconquer_rand 反抗判定分母（RAND:N == 0 的 N）
 */
async function decay_invasion_degree(region, spec) {
  if (spec.conquered === 0) {
    if (spec.degree() > 0) {
      spec.write(spec.degree() - rand(100));
      era.print(spec.resist_text);
      era.print(spec.lost_text);
      await era.waitAnyKey(); // PRINTW 的读键
      if (spec.degree() < 0) {
        spec.write(0);
      }
      // CALL KYOTEN_EVENT, region（未征服臂，原作 :631/:650/:669/:688）
      await kyoten_event(region);
    }
  } else if (spec.conquered === 1 && rand(spec.reconquer_rand) === 0) {
    if (spec.degree() > 100) {
      spec.write(spec.degree() - rand(100));
      era.print(spec.reconquer_resist_text);
      era.print(spec.reconquer_lost_text);
      await era.waitAnyKey();
      if (spec.degree() < 100) {
        spec.write(100);
      }
      // CALL KYOTEN_EVENT, region（征服后反抗臂，原作 :640/:659/:678/:697）
      await kyoten_event(region);
    }
  }
}

module.exports = { STUBBED_CALLS };
