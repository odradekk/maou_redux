/**
 * @file 2D 地下城模式的野外推进（issue #181，阶段 3 H12）：
 * LABO_DUNGEON_MAP.ERB 五函数。
 *
 * 源: target/ERB/迷宮/LABO_DUNGEON_MAP.ERB  @DUNGEON_MAP（:5-78，野外
 *       推进主流程）、@UNIT_MOVE（:83-235，单位移动）、
 *       @CONFIG_LABO_MAP_STATUS（:238-247，模式状态显示）、
 *       @CONFIG_LABO_MAP_SETTING（:250-270，模式设置菜单）、@LABO_MAP_SET
 *       （:273-281，2D 地图初始化）
 *
 * 源文件头注（:1-3 逐字）：「フィールドでの戦闘；水面下での開発に戻しました；
 * この部分のコードが欲しいひとは0.310以前のバージョンを参照してください」
 * ——野外战斗被作者撤回开发，证据在本票查实：**@DUNGEON_BATTLE 与
 * @DUNGEON_BATTLE2 在 target/ 全库无定义**，唯二调用点就在本文件 :187/:211，
 * 原作 Emuera 运行到这两个分支会因「関数が見つかりません」报错停止
 * （缺陷登记 #14）。ere 侧处置：两处调用点 1:1 保留位置与 RESULT 分支
 * 结构，调用本身落为占位存根（RESULT 中性值 0——不陷落、不击退），
 * 不替作者补写 0.310 版的野外战斗（与 #116「不修好原作缺陷」同一约定；
 * M:2 怪物 LV 的传参形态也与既有 3D 战斗（dungeon_party_battle 系）对不上，
 * 映射无据）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - 原作全局 A（推进中的单位）经显式传参（#5 决议第六条）；D:20（侵攻度）
 *     是 event 属主（cflag-ownership.yml「502」），经 chara().event.侵攻度
 *     门面读写，UNIT_MOVE 内部的修改经「传入 walk20 + 返回更新值」显式
 *     换手（dungeon.js 的 D:20 同款承载）；CFLAG:506/507（invasion.新人/
 *     回城标志）与 CFLAG:510/511（event.X坐标/Y坐标，本票补的门面字段）
 *     走门面；501/503/505/509 属主 dungeon，域内裸寻址（dungeon.js 惯例）；
 *   - SAVESTR 无引擎通道（#171 钉下）：%SAVESTR:A%/%SAVESTR:B% 的名字承载
 *     一律走 callname:${id}:-1（#5 决议，dungeon.js 同款）；
 *   - MONEY → era_flag.money / era_flag.money += …（EX_FLAG:4444 镜像不在
 *     本文件原作正文里，不搬）；TARGET → era_flag.target；
 *   - 原作 :56-74 的三臂 IF/ELSEIF/ELSEIF：第二臂条件与第一臂字面相同
 *     （:64 复制粘贴产物），逻辑上不可达——1:1 保留结构（check_status
 *     的不可达分支先例）；
 *   - CLEARLINE 1（:269，无效输入清行重问）无 era API 通道，重问循环
 *     收敛为再问（SETFONT/CLEARLINE 同为渲染细节，跳过不落）；
 *   - ere 无全局 RAND 序列（#117），随机经注入的 rand 掷出（缺省
 *     Math.random，enter-enemy.js 先例）；
 *   - X /= 2（:101）与 D:20 /= 10（:140）：X ∈ {RAND:90 ≥ 0, -90} 且先经
 *     ×2 后均为偶数、D:20 > 10 为正——整除无损，Math.floor 与 Emuera 的
 *     截断除法在此值域等价，沿用项目惯例。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { stub_line_wait } = require('#/utils/stub-line');
const { equip_check } = require('#/system/equip/equip-check');
const { equip_select } = require('#/system/equip/equip-select');
const { use_ex_item } = require('#/dungeon/dungeon'); // 3D 路径同款存根（单点登记）
const { ending_2 } = require('#/event/event-ending');
const dungeon_bitch_mod = require('#/kojo/kojo-dungeon-bitch'); // :29-30（真身 #184；模块对象引用，测试可替换）
const { da, db, geo_test } = require('#/dungeon/labo');
const { unit_check, mon_check, set_vil } = require('#/dungeon/labo-map');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）。DUNGEON_BATTLE / DUNGEON_BATTLE2 不是「归后续票的待办」而是
 * 「原作即缺失的调用目标」（文件头），登记栏写明判据。
 */
const STUBBED_CALLS = ['DUNGEON_BATTLE', 'DUNGEON_BATTLE2'];

/** 名字承载（#5 决议；savestr 通道不存在，dungeon.js 同款） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/** 原作 RAND:N（0..N-1）的缺省实现 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/**
 * @DUNGEON_BATTLE 存根（原作缺失，文件头）：野外战斗（勇者对怪物）。
 * 原作读全局 A（勇者）与 M:2（怪物 LV），调用点 :211 之后的 RESULT 消费
 * 只判 CFLAG:A:1（陷落）——存根 RESULT 0 中性。参数不落形参（dungeon.js
 * 存根同款：真身落地时按调用点实参定签名）。
 * @returns {Promise<number>} 原作 RESULT（存根恒 0）
 */
async function dungeon_battle() {
  await stub_line_wait(
    'DUNGEON_BATTLE',
    '野外战斗',
    '原作即缺失（0.310 以前存在，#14 登记），ere 不补写',
  );
  return 0;
}

/**
 * @DUNGEON_BATTLE2 存根（原作缺失，文件头）：野外战斗（单位对单位）。
 * 调用点 :189-199 消费 RESULT（2 = 对方陷落 / 1 = 本方被击退）——存根
 * RESULT 0 两臂皆不进，行为中性。参数同上不落形参。
 * @returns {Promise<number>} 原作 RESULT（存根恒 0）
 */
async function dungeon_battle2() {
  await stub_line_wait(
    'DUNGEON_BATTLE2',
    '野外战斗（单位对单位）',
    '原作即缺失（0.310 以前存在，#14 登记），ere 不补写',
  );
  return 0;
}

/**
 * @UNIT_MOVE（:83-235）：单位移动——按侵攻度 D:20 决定趋近/远离中心，
 * 逐格随机抖动，避开领域外与（80% 概率）高低差；到达中心 (16,16) 触发
 * 魔王城攻略（JUMP ENDING_2）；撞上其他单位/怪物时按分支处理。
 *
 * @param {number} a 推进中的单位（原作全局 A）
 * @param {number} walk20 侵攻度 D:20（传入时的值；函数内修改后经返回值
 *   显式传出——原作全局换手，#5 决议第六条）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 更新后的 D:20（:229-233 的钳制后）
 */
async function unit_move(a, walk20, rand) {
  const rand_n = rand ?? default_rand;

  // :85-89 移动量——撤退中（CFLAG:507 != 0）反向
  let x;
  if (chara(a).invasion.回城标志 === 0) {
    x = rand_n(90);
  } else {
    x = -90;
  }

  // :92-95 装備効果(侵攻)（W:8 = 17，#174 真身）
  if (equip_check(a, 17) > 0) {
    x *= 2;
  }
  // :98-101 装備効果(試練)（W:8 = 19）
  if (equip_check(a, 19) > 0) {
    x = Math.floor(x / 2);
  }

  // :103-111 迷惑状態（CFLAG:509 == 1）：RAND:3 == 0 时解除，否则移动量 0
  if ((era.get(`cflag:${a}:509`) || 0) === 1) {
    if (rand_n(3) === 0) {
      // たまに回復（ハメを防ぐため先に判定する）
      era.set(`cflag:${a}:509`, 0);
    } else {
      x = 0;
    }
  }

  // :113-118 侵攻中（2）累加、其余（迎击 3）倒退两倍速
  if (chara(a).invasion.状态 === 2) {
    walk20 += x;
  } else {
    x *= 2;
    walk20 -= x;
  }

  // $MOVE_LOOP——抖动重试环（领域外 / 高低差拒绝）
  let mx;
  let my;
  let from_level;
  for (;;) {
    mx = chara(a).event.X坐标; // LOCAL:0 = CFLAG:A:510
    my = chara(a).event.Y坐标; // LOCAL:1 = CFLAG:A:511
    from_level = Math.trunc(da[my][mx] / 32); // LOCAL:2 = DA:(y):(x)/32（[y][x]，labo.js 文件头）

    if (walk20 < 0) {
      // :130-138 撤退方向：远离中心（16,16）
      if (mx > 16) {
        mx += rand_n(3) - 1;
      }
      if (mx < 16) {
        mx -= rand_n(3) - 1;
      }
      if (my > 16) {
        my += rand_n(3) - 1;
      }
      if (my < 16) {
        my -= rand_n(3) - 1;
      }
    } else if (walk20 > 10) {
      // :139-148 侵攻方向：先衰减压到十分位，再趋近中心
      walk20 = Math.floor(walk20 / 10);
      if (mx > 16) {
        mx -= rand_n(3) - 1;
      }
      if (mx < 16) {
        mx += rand_n(3) - 1;
      }
      if (my > 16) {
        my -= rand_n(3) - 1;
      }
      if (my < 16) {
        my += rand_n(3) - 1;
      }
    }

    // :151-155 領域外を避ける
    if (mx < 0 || mx > 31) {
      continue; // GOTO MOVE_LOOP
    }
    if (my < 0 || my > 31) {
      continue;
    }

    // :157-161 高低差がある地形を避ける（20% 概率接受）
    const to_level = Math.trunc(da[my][mx] / 32); // LOCAL:10 = DA:(y):(x)/32
    if (from_level !== to_level && rand_n(5) > 0) {
      continue;
    }

    break; // 确定移动目标 (P:0, P:1) = (mx, my)
  }

  // :171-177 移動先が中心——魔王城攻略へ（JUMP ENDING_2）
  if (mx === 16 && my === 16) {
    chara(a).dungeon.侵攻阶层 = 2; // CFLAG:A:501 = 2（:172）
    era.print('这里就是魔王城了吗………'); // :174 PRINTL（简体归一：這裡→这里、嗎→吗，#60）
    await ending_2(); // :175 JUMP ENDING_2（#173 真身；quit 抛出后不返回）
    return 0;
  }

  // :179-202 撞上其他单位
  const other = unit_check(mx, my);
  if (other >= 0) {
    if ((era.get(`cflag:${other}:1`) || 0) === chara(a).invasion.状态) {
      return 0; // :181-183 仲間の場合移動停止
    } else if ((era.get(`cflag:${other}:1`) || 0) === 2) {
      // :184-199 違う場合対戦（原作缺失的 DUNGEON_BATTLE2，文件头）
      const result = await dungeon_battle2(a, other);
      if (result === 2) {
        // 陥落した（:189-195）
        era.print(`${name_of(other)}已经陷落了…`); // PRINTFORML %SAVESTR:B%（简体归一：經→经）
        era_flag.money += 1000 * (era.get(`cflag:${other}:9`) || 0); // MONEY += 1000 * CFLAG:B:9
        era.print(`得到了${1000 * (era.get(`cflag:${other}:9`) || 0)}G！`); // :192 PRINTFORMW
        era.set(`cflag:${a}:505`, (era.get(`cflag:${a}:505`) || 0) + 1); // CFLAG:A:505 += 1
        chara(other).invasion.新人 = 1; // CFLAG:B:506 = 1
        chara(other).invasion.回城标志 = 0; // CFLAG:B:507 = 0
      } else if (result === 1) {
        era_flag.target = -1; // :197 TARGET = -1
        return 0; // :198
      }
    }
    return 0;
  }

  // :205-222 撞上怪物
  const mon_lv = mon_check(mx, my);
  if (mon_lv > 0) {
    if (chara(a).invasion.状态 === 3) {
      return 0; // :208-209 魔王軍は仲間
    }
    await dungeon_battle(a, mon_lv); // :211 CALL DUNGEON_BATTLE（原作缺失，文件头）
    if (chara(a).invasion.状态 !== 2) {
      // 陥落したか否か（:213-220）
      era.print(`${name_of(a)}已经陷落了…`); // PRINTFORML %SAVESTR:A%
      era_flag.money += 1000 * (era.get(`cflag:${a}:9`) || 0);
      era.print(`得到了${1000 * (era.get(`cflag:${a}:9`) || 0)}G！`); // :216 PRINTFORML
      chara(a).invasion.新人 = 1; // CFLAG:A:506 = 1
      chara(a).invasion.回城标志 = 0; // CFLAG:A:507 = 0
    }
    return 0;
  }

  // :226-227 移動を反映（坐标落笔；event 属主门面）
  chara(a).event.X坐标 = mx;
  chara(a).event.Y坐标 = my;

  // :229-233 侵攻度钳制（撤退到头回满 / 推进到头清零）
  if (walk20 < 0) {
    walk20 = 100;
  } else if (walk20 > 100) {
    walk20 = 0;
  }

  return walk20;
}

/**
 * @DUNGEON_MAP（:5-78）：2D 模式的野外推进主流程——turnend-settle 的 else
 * 臂（FLAG:502 != 0 时，SYSTEM ver1.0.3.ERB:295 CALL DUNGEON_MAP 读全局 A）
 * 每次 EVENTTURNEND 对每个侵攻中/迎击中的单位调用。
 *
 * @param {number} a 推进中的单位（原作全局 A）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function dungeon_map(a, rand) {
  const rand_n = rand ?? default_rand;

  // :7-12 迎撃時体力が回復していると迎撃再開（HP/MP 均 > 80%）
  if (chara(a).invasion.状态 === 3) {
    if (
      Math.floor(
        (chara(a).dungeon.体力 * 100) / (era.get(`maxbase:${a}:0`) || 0),
      ) > 80 &&
      Math.floor(
        (chara(a).dungeon.气力 * 100) / (era.get(`maxbase:${a}:1`) || 0),
      ) > 80
    ) {
      chara(a).invasion.回城标志 = 0; // CFLAG:A:507 = 0
    }
  }

  // :14-15 フラグオフ（休憩标志复位）
  chara(a).dungeon.休憩 = 0;

  // :17 CALL UNIT_MOVE（D:20 经返回值换手，文件头）
  const walk20 = await unit_move(a, chara(a).event.侵攻度, rand_n);

  // :19 BASE:A:1 -= RAND:6（冒険の疲れ）
  chara(a).dungeon.气力 -= rand_n(6);

  // :21-28 帰還するかどうか（HP/MP 任一 < 45% 立撤退旗）
  if (
    Math.floor(
      (chara(a).dungeon.体力 * 100) / (era.get(`maxbase:${a}:0`) || 0),
    ) < 45
  ) {
    era.print(`${name_of(a)}决定返回了`); // PRINTFORML %SAVESTR:A%（:23）
    chara(a).invasion.回城标志 = 1; // CFLAG:A:507 = 1
  } else if (
    Math.floor(
      (chara(a).dungeon.气力 * 100) / (era.get(`maxbase:${a}:1`) || 0),
    ) < 45
  ) {
    era.print(`${name_of(a)}决定返回了`); // :26
    chara(a).invasion.回城标志 = 1; // :27
  }
  // :29-30 偶发卖春（真身 #184；rand_n 透传，与 3D 路径 DUNGEON.ERB 行 718
  // 同款模块对象调用）
  if (rand_n(5) === 0) {
    await dungeon_bitch_mod.dungeon_bitch(a, rand_n);
  }

  // :32-34 宝箱を見つける（侵攻中 2 且 1/4 概率；#174 真身）
  if (chara(a).invasion.状态 === 2 && rand_n(4) === 0) {
    await equip_select(a, rand_n);
  }

  // :36-37 アイテムの使用（3D 路径同款存根，单点登记）
  await use_ex_item('战斗后', a);

  // :39-40 移動を反映（D:20 写回 CFLAG:502，event 属主门面）
  chara(a).event.侵攻度 = walk20;

  // —— 休憩フェイズ（:42-74）——
  // :44-48 装備効果(キャンプ)（W:8 = 18）：休憩位 0 且 RESULT > 0 → +1
  if (!(chara(a).dungeon.休憩 & 1) && equip_check(a, 18) > 0) {
    chara(a).dungeon.休憩 += 1;
  }

  // :50-54 装備効果(キャンプ禁止)（W:8 = 19）：休憩位 1 且 RESULT > 0 → -1
  if (chara(a).dungeon.休憩 & 1 && equip_check(a, 19) > 0) {
    chara(a).dungeon.休憩 -= 1;
  }

  // :56-74 休憩演出（FLAG:5 & 32 渲染守卫内）。第二臂（:64）条件与第一臂
  // 字面相同——原作复制粘贴产物，逻辑不可达，1:1 保留（文件头）
  if (chara(a).invasion.状态 === 2 && chara(a).dungeon.休憩 & 1) {
    if ((era.get('flag:5') || 0) & 32) {
      era.println(); // :58 PRINTL（空行）
      era.drawLine(); // :59
      era.printAndWait(`${name_of(a)}藏起来休息了`); // :60 PRINTFORMW（简体归一：來→来）
      era.drawLine(); // :61
      era.println(); // :62
    }
    // 第二臂（:64）条件与第一臂字面相同——原作复制粘贴产物，逻辑不可达，
    // 1:1 保留（check_status 的不可达分支先例）；该规则判的正是这类重复
    // eslint-disable-next-line no-dupe-else-if
  } else if (chara(a).invasion.状态 === 2 && chara(a).dungeon.休憩 & 1) {
    if ((era.get('flag:5') || 0) & 32) {
      era.println();
      era.drawLine();
      era.printAndWait(`${name_of(a)}在安全的地方扎营，休息了`); // :68（简体归一：紮營→扎营）
      era.drawLine();
      era.println();
    }
  } else if (chara(a).invasion.状态 === 3) {
    // :72-73 空体（原作如此）
  }
  if ((era.get('flag:5') || 0) & 32) {
    era.println(); // :75-76 SIF FLAG:5 & 32 PRINTL（空行）
  }
  era_flag.target = -1; // :77 TARGET = -1
  return 0;
}

/**
 * @CONFIG_LABO_MAP_STATUS（:238-247）：模式状态显示——FLAG:502 → ２Ｄ/普通。
 * 原作调用点是注释状态（SYSTEM/CONFIG.ERB:188），运行时不可达（1:1 不接线，
 * INVASION_CHECK 先例）。
 * @returns {void}
 */
function config_labo_map_status() {
  if (game.dungeon.迷宫模式 === 1) {
    era.print('２Ｄ'); // :243
  } else {
    era.print('普通'); // :245（FLAG:502 == 0）
  }
  era.println(); // :247 PRINTL
}

/**
 * @CONFIG_LABO_MAP_SETTING（:250-270）：模式设置菜单——[0] 普通 / [1] ２Ｄ /
 * [100] 返回；选 2D 时顺带初始化地图（CALL LABO_MAP_SET）。
 * 原作调用点是注释状态（SYSTEM/CONFIG.ERB:248），运行时不可达（1:1 不接线）。
 * @param {(n: number) => number} [rand] RAND:N 随机源（LABO_MAP_SET 透传）
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function config_labo_map_setting(rand) {
  const rand_n = rand ?? default_rand;
  era.print('普通'); // :253 PRINTL [0]普通——按钮化（first-setting 先例）
  era.print('２Ｄ'); // :254
  era.drawLine(); // :255
  era.print('返回'); // :256 [100]

  for (;;) {
    era.printButton('普通', 0);
    era.printButton('２Ｄ', 1);
    era.printButton('返回', 100);
    const result = await era.input(); // :259
    if (result === 0 || result === 1) {
      // :261-265 CASE 0 TO 1
      game.dungeon.迷宫模式 = result; // FLAG:502 = RESULT（dungeon 属主门面）
      if (game.dungeon.迷宫模式 === 1) {
        await labo_map_set(rand_n); // SIF FLAG:502 == 1 → CALL LABO_MAP_SET
      }
      return 0;
    }
    if (result === 100) {
      return 0; // :266-267
    }
    // CLEARLINE 1（:269，无效输入清行）无 API——重问循环（文件头）
  }
}

/**
 * @LABO_MAP_SET（:273-281）：2D 地图初始化——地质生成 + 村庄设置 + DB 清零。
 * @EVENTFIRST 的 FLAG:502==1 分支（SYSTEM ver1.0.3.ERB:66-74）与本函数
 * （:275-281）是同一段初始化的两处落点（后者多一步 DA 生成前置的语义等价
 * 重跑，配置切换时重建地图）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function labo_map_set(rand) {
  const rand_n = rand ?? default_rand;
  geo_test(rand_n); // :275 CALL GEO_TEST
  set_vil(rand_n); // :276 CALL SET_VIL
  for (let y = 0; y < 50; y += 1) {
    for (let x = 0; x < 50; x += 1) {
      db[y][x] = 0; // :277-281 DB 50×50 清零（[y][x]，EVENTFIRST :69-73 同款）
    }
  }
  return 0;
}

module.exports = {
  STUBBED_CALLS,
  dungeon_map,
  unit_move,
  config_labo_map_status,
  config_labo_map_setting,
  labo_map_set,
};
