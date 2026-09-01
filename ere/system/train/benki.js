/**
 * @file 肉便器系统：@BENKI（全角色每日肉便器业务）、@SELECT_BENKI_MENU /
 * @NAME_BENKI_MENU / @GET_EXP_BENKI_MENU（战斗肉便器三段）与
 * @BENKI_PLAYER_NAME（侍奉对象名）的真身（issue #217，J7）。
 *
 * 源: target/ERB/調教相關/BENKI.ERB  @BENKI（:2-1356）
 *     @SELECT_BENKI_MENU（:1359-1427）@NAME_BENKI_MENU（:1430-1494）
 *     @GET_EXP_BENKI_MENU（:1497-1654）@BENKI_PLAYER_NAME（:1656-1681）
 *
 * == 调用点（全库已查实） ==
 *
 *   - @BENKI 由 @EVENTTURNEND 普通档逐角色调用（SYSTEM ver1.0.3.ERB:729，
 *     ere/system/turnend-settle.js——本票把 stub_line 换成 run_benki）；
 *   - @SELECT_BENKI_MENU / @NAME_BENKI_MENU / @GET_EXP_BENKI_MENU 由
 *     DUNGEON_BATLLE.ERB 的战斗调用（:565/:653/:819/:873，ere/dungeon/
 *     dungeon-battle.js——本票把三个存根换成真身）；
 *   - @BENKI_KOUJO（肉便器口上）由 @BENKI 在五个分支配对后调用（:591/
 *     :808/:982/:1128/:1310）——**属轴 B 的口上票（#210 裁定 2）**，本票
 *     建存根登记、不实现（见 STUBBED_CALLS 与 docs/stub-registry.md）；
 *   - @BENKI_PLAYER_NAME 是 @BENKI 内部的行内名字函数（读 FLAG:64），
 *     @BENKI_KOUJO 之外的口上文件（K0/K3/K12 等）也会调它读 FLAG:64——
 *     ere 侧真身随本票，口上票直接 require 使用。
 *
 * == 文本约定 ==
 *
 * 玩家可见文本按 #60 归一简体（源文件繁简混用）。@GET_EXP_BENKI_MENU 的
 * %PALAMNAME:LOCAL% 由 era.get(`palamname:${idx}`) 取引擎静态表列名
 * （page-info-exp 先例；BENKI 写的 0/1/2/5/6/7 全部在 yml/Palam.yml 在册）。
 * 输出行与换行语义：PRINT 不换行、PRINTL/PRINTFORML 换行——同一显示行的
 * 拼接归并为一次 era.print（dungeon-battle 先例）；PRINTW = print + 等键
 * （printAndWait 内部即这两步，夹具统一走 waitAnyKey 观测）。WAIT 在
 * 演出中段出现（:491）——等键与分行 1:1 保留。
 *
 * == 随机源 ==
 *
 * RAND:N → rand_n(N)（[0, n) 整数，缺省均匀随机；SELECT_BENKI_MENU 的
 * RAND:DICE 经参数注入，测试用定值序固定分支——kojo 同款先例）。
 *
 * == 域边界（#71 门面） ==
 *
 * 本文件属 train 域。跨域写清单（ownership 实测）：
 *   - flag:63（肉便器常识改写）属主 dungeon——写走 game.dungeon.肉便器常识改写；
 *   - exp 下标 0/1/5/20/52/53/56/80 属主 dungeon——写走 chara(cid).dungeon
 *     门面（私处经验/肛门经验/性交经验/精液经验/私处扩张经验/肛门扩张经验/
 *     兽奸经验/战斗经验）；exp 3/40/70 属主 train，域内直写（chara(cid).train
 *     门面或裸寻址均可，取门面统一）；
 *   - flag:62/64 属主 train，域内直写（era.set 裸寻址合法）；
 *   - juel 无所有权产物（#70 未测量）——读写不判定，裸 era.set 即合法
 *     （dungeon-after 先例）。
 *   - **TEQUIP 只读不写**（建模归 J5，#215；本票只有守卫判定读取）。
 *   - BASE:0/1 只读（体力/气力门槛）。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { v_able } = require('#/system/train/v-able');
const { chara_callname } = require('#/utils/callname-utils');
const { benki_koujo } = require('#/kojo/kojo-system');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。分发层在 kojo-system.js：未注册性格
 * 仍打占位行（K3/K5 路径），K1 真身随 #232 落地。
 */
const STUBBED_CALLS = ['BENKI_KOUJO'];

/** 原作 RAND:N（0..N-1）的缺省实现 */
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/** SAVESTR:x 的读数源（#5 决议：本作里 = 名前） */
function name_of(cid) {
  return chara_callname(cid);
}

/** SHE(ARG) 代词（魔改新增/文本校正.ERB :1-7 的三行纯函数，BENKI 内联同款） */
function she(cid) {
  return (era.get(`talent:${cid}:122`) || 0) !== 0 ? '他' : '她';
}

/** 素质读取助手（带 || 0 兜底，#13） */
function t(cid, idx) {
  return era.get(`talent:${cid}:${idx}`) || 0;
}

/** 能力读取助手 */
function abl(cid, idx) {
  return era.get(`abl:${cid}:${idx}`) || 0;
}

/** 经验读取助手 */
function exp(cid, idx) {
  return era.get(`exp:${cid}:${idx}`) || 0;
}

/** 肉便器行动内容（FLAG:62，属主 train——域内直写） */
function flag62() {
  return era.get('flag:62') || 0;
}

/** 肉便器侍奉对象（FLAG:64，属主 train——域内直写） */
function flag64() {
  return era.get('flag:64') || 0;
}

/** 肉便器常识改写（FLAG:63，属主 dungeon——跨域写走门面） */
function flag63() {
  return game.dungeon.肉便器常识改写;
}

/**
 * @BENKI（BENKI.ERB:2-1356）：肉便器业务（全角色每回合）。
 *
 * 流程：门槛（角色/素质/体力/状态/育儿）→ 内容与人数清算（BENKI_MENU
 * 8 源 + PLAY 人数）→ 行动分派（配信 / 兽奸 / 奉仕 / 同性爱 / 一般）→
 * 每分派各输出演出、口上（BENKI_KOUJO 存根）、珠/经验结算。
 *
 * @param {number} arg 角色 ID（原作 ARG:0）
 * @param {(n: number) => number} [rand_n] RAND:N 随机源（RAND:4 的 PLAY 加算）
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function run_benki(arg, rand_n = default_rand) {
  // —— :4-6 指针与局部数组 ——
  const target_pool = era_flag.target; // TARGET_POOL = TARGET

  // BENKI_MENU（:4 #DIM BENKI_MENU,10）：0 奉仕 / 1 V / 2 A / 3 同性爱 /
  // 4 兽奸 / 5 露出 / 6 视频 / 7 自慰（8/9 无人消费，照原作留 0）
  const menu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // BENKI_MENU:0 = 0,0,...

  // —— :26-30 魔王除外 / 非肉便器除外 ——
  if (arg === 0) {
    return 0; // 魔王様は除外
  }
  if (t(arg, 204) === 0) {
    return 0; // 肉便器以外は除外（TALENT:204 肉便器）
  }

  // —— :33-36 気力・体力による制限 ——
  if ((era.get(`base:${arg}:0`) || 0) < 300) {
    return 0; // BASE:0 < 300
  }
  if ((era.get(`base:${arg}:1`) || 0) < 100) {
    return 0; // BASE:1 < 100
  }

  // —— :38-40 調教中以外除去 ——
  if ((era.get(`cflag:${arg}:1`) || 0) !== 0) {
    return 0; // CFLAG:1 != 0（占用状态：待机 0/1 之外不结算）
  }

  // 男人除外（源注释态，不移植——1:1 保持不调用）
  // 育儿中は除外
  if (t(arg, 154)) {
    return 0; // TALENT:育儿中（154）
  }

  // —— :50-52 空行 + 分隔线 ——
  era.print('');
  era.drawLine();

  // FLAG:62 = -1（行动内容初始）
  era.set('flag:62', -1);

  // —— :62-78 常識改変フラグ（FLAG:63）——属主 dungeon，写走门面 ——
  game.dungeon.肉便器常识改写 = 0; // FLAG:63 = 0
  if (t(arg, 283) > 0) {
    game.dungeon.肉便器常识改写 = 1; // 常識改変【日常】
  }

  // 初期人数1人
  let play = 1;

  // —— :94-193 素質による補正 ——
  if (t(arg, 0)) {
    menu[1] -= 20; // 处女（V減少）
  }
  if (t(arg, 63)) {
    menu[0] += 1; // 献身的（奉仕）
  }
  if (t(arg, 75)) {
    menu[1] += 3; // 性爱狂（V）
  }
  if (t(arg, 77)) {
    menu[2] += 3; // 尻穴狂（A）
  }
  if (t(arg, 81) || t(arg, 82)) {
    menu[3] += 1; // 双性恋・讨厌男人（同性爱）
  }
  if (t(arg, 89)) {
    menu[5] += 3; // 露出狂（露出）
  }
  if (t(arg, 124)) {
    menu[4] += 1; // 动物耳朵（兽奸）
  }
  if (t(arg, 136)) {
    menu[4] += 3; // 牝犬（兽奸）
  }
  if (t(arg, 151)) {
    menu[0] -= 20; // 绝不侍奉（奉仕減少）
  }
  if (t(arg, 232)) {
    menu[1] += 3; // 淫壶（V）
  }
  if (t(arg, 233)) {
    menu[2] += 3; // 淫肛（A）
  }
  if (t(arg, 273)) {
    menu[1] -= 20; // 私处封印（V減少）
  }

  // —— :132-155 能力値 ——
  menu[1] += abl(arg, 2); // V感覚（V）
  menu[2] += abl(arg, 3); // A感覚（A）
  menu[6] += abl(arg, 15); // 话术（视频）
  menu[0] += abl(arg, 16); // 侍奉精神（奉仕）
  menu[5] += abl(arg, 17); // 露出癖（露出）
  menu[3] += abl(arg, 33); // 百合中毒（同性爱）
  menu[4] += abl(arg, 39); // 兽奸中毒（兽奸）

  // —— :149-171 特殊な経験の有無 ——
  if (exp(arg, 21)) {
    menu[0] += 1; // 侍奉快乐经验（奉仕）
  }
  if (exp(arg, 52)) {
    menu[1] += 1; // 私处扩张经验（V）
  }
  if (exp(arg, 53)) {
    menu[2] += 1; // 肛门扩张经验（A）
  }
  if (exp(arg, 56)) {
    menu[4] += 1; // 兽奸经验（兽奸）
  }
  if (exp(arg, 56) > 50) {
    menu[4] += 3; // 50回を超える兽奸经验（兽奸）
  }
  if (exp(arg, 70)) {
    menu[6] += 1; // 拍摄经验（视频）
  }
  if (exp(arg, 70) > 50) {
    menu[6] += 3; // 50回を超える拍摄经验（视频）
  }

  // —— :174-176 服装による趣向（貞操帯，V減少） ——
  if (
    (era.get(`cflag:${arg}:42`) || 0) === 79 &&
    ((era.get(`cflag:${arg}:40`) || 0) & 64) !== 0 &&
    (era.get('flag:37') || 0) !== 0
  ) {
    menu[1] -= 20; //
  }

  // —— :181-193 常識改変効果 ——
  if (t(arg, 283) === 1) {
    menu[0] += 3; // 物乞い奉仕（奉仕）
  } else if (t(arg, 283) === 2) {
    menu[5] += 3; // 野外露出（露出）
  } else if (t(arg, 283) === 3) {
    menu[6] += 3; // 痴態公開（视频）
  } else if (t(arg, 283) === 4) {
    play += 3; // 公衆便女（人数）
  } else if (t(arg, 283) === 5) {
    menu[4] += 3; // 獣姦マニア（兽奸）
  }

  // —— :196-225 共通の PLAY 補正 ——
  if (t(arg, 31)) {
    play += 1; // 看轻贞操
  }
  if (t(arg, 70)) {
    play += 1; // 接受快感
  }
  if (t(arg, 76)) {
    play += 1; // 淫乱
  }
  if (t(arg, 88)) {
    play += 1; // 受虐狂
  }
  play += abl(arg, 10); // 顺从
  play += abl(arg, 11); // 欲望
  play += abl(arg, 12); // 技巧
  play += abl(arg, 21); // 抖M气质
  play += rand_n(4); // ランダムボーナス

  // —— :228-240 プレイ内容の判定（钳位 + 人数加算）——
  for (let i = 0; i < 10; i += 1) {
    // BENKI_MENU:(LOCAL:1) 钳 0..9
    menu[i] = Math.min(menu[i], 9);
    menu[i] = Math.max(menu[i], 0);
    play += menu[i]; // ついでにボーナス
  }

  // 未確定の相手
  era.set('flag:64', -1);

  // —— :243-346 配信分岐（BENKI_MENU:6 >= 3 视频源足 → 配信系）——
  if (menu[6] >= 3) {
    if (menu[4] >= 3) {
      era.set('flag:62', 7); // 兽奸配信
      era.set('flag:64', 2); // 相手：大型犬
    } else if (menu[3] >= 3) {
      era.set('flag:62', 8); // 妓女購入配信
      era.set('flag:64', 1); // 相手：娼婦
    } else if (menu[5] >= 3) {
      era.set('flag:62', 9); // 野外露出配信
    } else if (menu[1] >= 3 && menu[2] >= 3) {
      era.set('flag:62', 10); // 公衆便所配信
    } else if (menu[2] >= 3) {
      era.set('flag:62', 11); // A拡張配信
      era.set('flag:64', -2); // 相手無し
    } else {
      era.set('flag:62', 12); // その他・自慰配信
      era.set('flag:64', -2); // 相手無し
    }
  } else if (menu[4] >= 3) {
    era.set('flag:62', 2); // 兽奸便器
    era.set('flag:64', 2); // 相手：大型犬
  } else if (menu[3] >= 3) {
    era.set('flag:62', 1); // レズ便器
    if (t(arg, 142)) {
      era.set('flag:64', 7); // 萝莉控 → 幼い奴隷少女
    } else {
      era.set('flag:64', 9); // 淫魔
    }
  } else if (menu[0] >= 3) {
    era.set('flag:62', 0); // 最下層民奉仕
    era.set('flag:64', 0); // 相手：最下層民
  } else if (menu[1] >= 3 && menu[2] >= 3) {
    era.set('flag:62', 3); // 両穴プレイ
  } else if (menu[1] >= 3) {
    era.set('flag:62', 4); // Vプレイ
  } else if (menu[2] >= 3) {
    era.set('flag:62', 5); // Aプレイ
  } else {
    era.set('flag:62', 6); // その他。フェラ便器
  }

  // —— :393-400 未定の相手を確定 ——
  if (flag64() === -1) {
    if (t(arg, 283) === 1) {
      era.set('flag:64', 8); // 物乞い常識改変
    } else if (t(arg, 143)) {
      era.set('flag:64', 4); // 正太控 → ダークエルフの少年
    } else if (t(arg, 141)) {
      era.set('flag:64', 6); // 恋父情结 → オークの中年
    } else if (t(arg, 62)) {
      era.set('flag:64', 5); // 反感污臭 → 脂ぎったオーク
    } else {
      era.set('flag:64', 3); // 魔族の男
    }
  }

  // —— :411-421 自慰系源（BENKI_MENU:7）——
  if (t(arg, 60)) {
    menu[7] += 1; // 容易自慰
  }
  if (t(arg, 74)) {
    menu[7] += 1; // 自慰狂
  }
  menu[7] += abl(arg, 31); // 自慰中毒
  if (exp(arg, 10)) {
    menu[7] += 1; // 自慰经验
  }

  // —— :426-491 実行（开头演出段）——
  // 妊娠系前置（三素质 → 三句）
  const pregnant_head = () => {
    let s = '';
    if (t(arg, 153)) {
      s += '挺着怀孕的大肚子的'; //
    }
    if (t(arg, 260)) {
      s += '乳房不时胎动着的'; // 乳内妊娠
    }
    if (t(arg, 262)) {
      s += '性器不时鼓动着的'; // 精巣妊娠（触手 262 复用原作拼写）
    }
    return s;
  };

  let line = pregnant_head();
  // %FS_BITCH("LOOKS", ARG)%正——LOOKS 是本人描写串（#185 真身）
  line += `${fs_bitch_looks(arg, rand_n)}正`;

  // 常識改変
  if (flag63() === 1) {
    line += '毫无犹豫地';
  }
  // 高貴/慈愛＆奉仕ボーナス
  if (t(arg, 163) && menu[0] >= 3) {
    line += '举止高贵地 ';
    play += 1;
  } else if (t(arg, 160) && menu[0] >= 3) {
    line += '满怀慈爱地';
    play += 1;
  }
  // 献身的＆奉仕ボーナス
  if (t(arg, 63) && menu[0] >= 3) {
    line += '主动地';
    play += 1;
  }

  // —— :468-491 説明（～をした）——
  const action = {
    0: '成为了', // 最下層モンスター奉仕（接名字 + 们的肉便器。）
    1: '成为了性欲旺盛的淫魔们当做了性处理工具。',
    2: '成为了家畜们的性处理工具。',
    3: '用阴道和菊花来做。',
    4: '用阴道来做。',
    5: '用菊花来做。',
    6: '用嘴来做。',
    7: '将与狗交配着的样子收录在了水晶球中。',
    8: '将与叫来的妓女做爱的样子收录在了水晶球中。',
    9: '将野外露出的样子收录在了水晶球中。',
    10: '将作为公众便器被使用着的样子收录在了水晶球中。',
    11: '将肛门扩张着的样子收录在了水晶球中。',
    12: '将自慰着的样子收录在了水晶球中。',
  };
  const f62 = flag62();
  if (f62 === 0) {
    line += `成为了${benki_player_name()}们的肉便器。`;
  } else {
    line += action[f62] ?? '自慰着。'; // ELSE 自慰
  }
  era.print(line);
  await era.waitAnyKey(); // WAIT

  // —— :495-577 第二演出段 ——
  line = pregnant_head();
  if (menu[6] >= 3) {
    line += '水晶球播放了，'; //
  }
  line += `${name_of(arg)}在`; // %SAVESTR:(ARG:0)%在

  // いつ？
  line += f62 === 9 ? '人来人往的白天，' : '深夜，';

  // （誰がいる）どこで？
  if (f62 === 8) {
    line += '在充斥着呻吟声的风俗店里'; //
  } else if (f62 === 10) {
    line += '在肮脏的公厕里'; //
  } else if (menu[5] >= 3 && menu[4] >= 3) {
    line += '沐浴着研究员的目光，在异种奸研究所中'; //
  } else if (menu[5] >= 5) {
    line += '在能听到大街声音的小巷子里'; //
  } else if (menu[5] >= 3) {
    line += flag64() === 4 ? '在少年们玩耍着的' : '在不会有人经过的'; //
    line += '公园的树丛中'; //
  } else if (f62 === 9) {
    line += '能听到大街声音的小巷子'; //
  } else {
    line += '自己屋子里'; //
  }

  if (menu[6] >= 3) {
    line += '设置了水晶球。'; //
  } else {
    line += '，'; //
  }

  // 巨乳/爆乳/超乳
  if (t(arg, 110)) {
    line += '诱人的巨乳摇晃着，';
  } else if (t(arg, 114)) {
    line += '惊人的爆乳翻腾着，';
  } else if (t(arg, 119)) {
    line += '夸张的超乳翻腾着，';
  }

  // 害羞
  if (t(arg, 35)) {
    line += '害羞着地，';
  }

  // 誰と？
  if (flag64() === -2) {
    line += '';
  } else if (flag64() === 2) {
    line += '和';
  } else if (menu[0] >= 3) {
    line += '对';
  } else {
    line += '任';
  }
  line += benki_player_name(); // CALL BENKI_PLAYER_NAME

  // どうした？
  if (f62 === 11) {
    line += '将巨大的肛塞插入了菊门'; // 拡張配信
  } else if (f62 === 6) {
    line += '将阴茎塞入了口中'; // フェラ
  } else if (flag64() === -2) {
    line += '自慰着'; // 相手無し自慰
  } else if (menu[4] >= 3) {
    line += '交配着'; // 獣姦ソース
  } else if (menu[3] >= 3) {
    line += '赤裸相拥着'; // 同性ソース
  } else if (menu[0] >= 3) {
    line += '服侍了起来'; // 奉仕
  } else if (menu[1] >= 3 && menu[2] >= 3) {
    line += '私处和肛门盛放着发情着'; // A&Vソース3以上
  } else if (menu[1] >= 3) {
    line += '兴奋地做爱着'; // Vソース3以上
  } else {
    line += '兴奋地肛交着'; //
  }

  // 结尾（PRINTW = 等待）
  line += menu[6] >= 3 ? '的样子被拍下来了…' : '…';
  era.print(line);
  await era.waitAnyKey();

  // ビデオボーナス
  play += menu[6];

  // 最低一匹
  if (play < 1) {
    play = 1;
  }

  // A = ARG:0 / TARGET = ARG:0 / CALL BENKI_KOUJO
  era_flag.target = arg;
  await benki_koujo();

  // —— :624-757 配信清算（BENKI_MENU:6 >= 3）——
  if (menu[6] >= 3) {
    era.print(`${name_of(arg)}共${clear_line(f62, play)}`);

    // 噂（水晶球传播）
    let rumor = `录下${name_of(arg)}痴态的水晶球，`;
    rumor += play > 25 ? '公开地' : '暗地里';
    rumor += play > 15 ? '大量地' : '少数地';
    rumor += play > 10 ? '被复制' : '被交易';
    rumor += `传播着，${name_of(arg)}的传闻，传到`;
    if (play > 30) {
      rumor += '故乡';
    } else if (play > 25) {
      rumor += '地下城外';
    } else if (play > 20) {
      rumor += '全地下城';
    } else if (play > 15) {
      rumor += '你的直属部队';
    } else if (play > 10) {
      rumor += '你的身边';
    } else {
      rumor += '你的耳边';
    }
    rumor += '了。';
    era.print(rumor);

    // 珠与经验结算
    juel_settle(arg, play);
    // 兽奸配信 / 妓女購入 / 自慰系 / 一般
    if (f62 === 7) {
      era.print(`兽奸经验+${play}`);
      chara(arg).dungeon.兽奸经验 += play;
    } else if (f62 === 8) {
      era.print(`百合经验+${play}`);
      chara(arg).train.百合经验 += play;
    } else if (f62 === 11 || f62 === 12) {
      era.print(`自慰经验+${play}`);
      chara(arg).dungeon.自慰经验 += play;
    } else {
      era.print(`性交经验+${play}`);
      era.print(`精液经验+${play}`);
      chara(arg).dungeon.性交经验 += play;
      chara(arg).dungeon.精液经验 += play;
    }
    // 拡張配信
    if (f62 === 11) {
      era.print(`肛门扩张经验+${play}`);
      chara(arg).dungeon.肛门扩张经验 += play;
    }
    // V/A ソース
    if (menu[1] >= 3) {
      era.print(`私处点数+${play * 10}`);
      era.print(`私处经验+${play}`);
      chara(arg).dungeon.私处经验 += play;
    }
    if (menu[2] >= 3) {
      era.print(`肛门点数+${play * 10}`);
      era.print(`肛门经验+${play}`);
      chara(arg).dungeon.肛门经验 += play;
    }
    // 拍摄经验 + 战斗经验
    era.print(`拍摄经验+${play}`);
    chara(arg).train.拍摄经验 += play;
    era.print(`经验值+${play}`);
    chara(arg).dungeon.战斗经验 += play;

    // 配信清算段的 JUEL 加算在 juel_settle 内（见下）
  } else if (menu[4] >= 3) {
    // —— :712-861 兽奸便器分派 ——
    era.set('flag:62', 2); //
    era.set('flag:64', 2); //

    let s = pregnant_head(); //
    s += `${fs_bitch_looks(arg, rand_n)}`; //
    if (menu[5] >= 3) {
      s += '身边聚满了看热闹的人，'; //
      play += menu[5]; // 露出ボーナス
    }
    s += '作为公共便器，处理着地下城内魔兽们的性欲。'; //
    era.print(s);

    s = `${name_of(arg)}`; //
    if (menu[1] >= 3 && menu[2] >= 3) {
      s += '的子宫和直肠，灌满了魔兽的精液，';
      play += menu[1] + menu[2]; // A&Vボーナス
    } else if (menu[1] >= 3) {
      s += '的子宫，灌满了魔兽的精液，';
      play += menu[1]; // Vボーナス
    } else if (menu[2] >= 3) {
      s += '的直肠，灌满了魔兽的精液，';
      play += menu[2]; // Aボーナス
    } else {
      s += '不断摩擦着魔兽的阴茎，';
      play += menu[0]; // 奉仕ボーナス
    }
    era.print(s);

    // 奴隷の様子
    if (t(arg, 9)) {
      era.print('浮现出被玩坏的痴笑。'); // 崩坏
    } else if (t(arg, 136)) {
      era.print('高兴地摇着屁股。'); // 牝犬
    } else if (abl(arg, 39)) {
      era.print('沉醉在与魔兽交配的快感之中。'); // 兽奸中毒1以上
    } else {
      era.print('看起来很不自在。'); //
    }

    play += menu[4]; // 兽奸ボーナス
    if (play < 1) {
      play = 1; // 最低一匹
    }

    era.print(`${name_of(arg)}一共处理了${play}只魔兽的性欲。。`); //

    // 噂（兽奸）
    era.print(beast_rumor(arg, play));

    // A = ARG:0 / TARGET = ARG:0 / CALL BENKI_KOUJO
    era_flag.target = arg;
    await benki_koujo();

    // 珠与经验结算
    juel_settle(arg, play);
    if (menu[1] >= 3) {
      era.print(`私处点数+${play * 10}`);
      era.print(`私处经验+${play}`);
      chara(arg).dungeon.私处经验 += play;
    }
    if (menu[2] >= 3) {
      era.print(`肛门点数+${play * 10}`);
      era.print(`肛门经验+${play}`);
      chara(arg).dungeon.肛门经验 += play;
    }
    era.print(`兽奸经验+${play}`);
    era.print(`经验值+${play}`);
    chara(arg).dungeon.兽奸经验 += play;
    chara(arg).dungeon.战斗经验 += play;
  } else if (menu[0] >= 3) {
    // —— :863-1032 奉仕便器分派 ——
    era.set('flag:62', 0); //
    era.set('flag:64', 0); //

    let s = pregnant_head(); //
    s += `${fs_bitch_looks(arg, rand_n)}`; //
    if (menu[5] >= 3) {
      s += '身边聚满了看热闹的人，'; //
      play += menu[5]; // 露出ボーナス
    }
    if (t(arg, 163)) {
      s += '举止高贵地'; // 高贵ボーナス
      play += 1;
    } else if (t(arg, 160)) {
      s += '满怀慈爱地'; // 慈爱ボーナス
      play += 1;
    }
    if (t(arg, 63)) {
      s += '主动地'; // 献身的ボーナス
      play += 1;
    }
    s += '作为侍奉用便器在地下城里服侍着'; //
    s += benki_player_name(); //
    era.print(s);

    s = `${name_of(arg)}`; //
    if (menu[1] >= 3 && menu[2] >= 3) {
      s += '能用上的穴全用上了，';
      play += menu[1] + menu[2]; // A&Vボーナス
    } else if (menu[1] >= 3) {
      s += '用私处';
      play += menu[1]; // Vボーナス
    } else if (menu[2] >= 3) {
      s += '用菊花';
      play += menu[2]; // Aボーナス
    } else {
      s += '用嘴和手'; //
    }
    s += '将底层种族'; //
    if (t(arg, 62)) {
      s += '满是污垢的肮脏的'; // 反感污臭ボーナス
      play += 1;
    }
    s += '阴茎温柔地包裹在内，'; //
    era.print(s);

    // 奴隷の様子
    if (flag63() === 1) {
      era.print('一如平常的面带微笑地交欢着……'); // 常識改変
    } else if (t(arg, 9)) {
      era.print('浮现出被玩坏的痴笑。'); // 崩坏
    } else if (exp(arg, 21) > 100) {
      era.print(`对底层${benki_player_name()}勃起的阴茎报以勉励式的温柔微笑。`); //
    } else if (exp(arg, 21) > 50) {
      era.print(`对底层${benki_player_name()}温柔地微笑着。`); //
    } else {
      era.print('看起来很不自在。'); //
    }

    play += menu[0]; // 奉仕ボーナス
    if (play < 1) {
      play = 1; // 最低一人
    }

    era.print(
      `${name_of(arg)}共处理了${play}个底层${benki_player_name()}的性欲。`,
    ); //

    // 噂（奉仕）
    era.print(service_rumor(arg, play));

    // A = ARG:0 / TARGET = ARG:0 / CALL BENKI_KOUJO
    era_flag.target = arg;
    await benki_koujo();

    // 珠与经验结算
    juel_settle(arg, play);
    if (menu[1] >= 3) {
      era.print(`私处点数+${play * 10}`);
      era.print(`私处经验+${play}`);
      chara(arg).dungeon.私处经验 += play;
    }
    if (menu[2] >= 3) {
      era.print(`肛门点数+${play * 10}`);
      era.print(`肛门经验+${play}`);
      chara(arg).dungeon.肛门经验 += play;
    }
    era.print(`性交经验+${play}`);
    era.print(`精液经验+${play}`);
    era.print(`经验值+${play}`);
    chara(arg).dungeon.性交经验 += play;
    chara(arg).dungeon.精液经验 += play;
    chara(arg).dungeon.战斗经验 += play;
  } else if (menu[3] >= 3) {
    // —— :1059-1185 同性爱便器分派 ——
    era.set('flag:62', 1); //
    if (t(arg, 142)) {
      era.set('flag:64', 7); // 萝莉控 → 幼い奴隷少女
    } else {
      era.set('flag:64', 9); // 淫魔
    }

    let s = pregnant_head(); //
    s += `${fs_bitch_looks(arg, rand_n)}，`; //
    if (menu[5] >= 3) {
      s += '在围观群众的视线下，'; //
      play += menu[5]; // 露出ボーナス
    }
    s += '与性欲旺盛的淫魔们相拥着。'; //
    era.print(s);

    s = '';
    if (t(arg, 121)) {
      s += '双性人的'; // 扶她
    }
    s += `${name_of(arg)}`; //
    if (t(arg, 121) && t(arg, 142)) {
      s += '在精囊被掏空之前，都在和年轻淫魔扭动着腰。'; //
      play += 6;
    } else if (t(arg, 121)) {
      s += '在精囊被掏空之前，不停被吸取着精液。'; //
      play += 3;
    } else if (t(arg, 142)) {
      s += `被年幼的${benki_player_name()}诱惑了，`; //
      play += 3;
    } else {
      s += `被${benki_player_name()}诱惑了，`; //
    }
    era.print(s);

    // 奴隷の様子
    if (flag63() === 1) {
      era.print('一如平常的面带微笑地交欢着……'); //
    } else if (t(arg, 9)) {
      era.print('浮现出被玩坏的痴笑……'); //
    } else if (exp(arg, 40) > 1000) {
      era.print('快乐得快要晕过去了……'); // 百合经验1000超
    } else if (exp(arg, 40) > 500) {
      era.print('沉醉在这种缠绵之中……'); // 百合经验500超
    } else {
      era.print('看起来很不自在……'); //
    }

    play += menu[3]; // 同性爱ボーナス
    if (play < 1) {
      play = 1; // 最低一人
    }

    era.print(
      `${name_of(arg)}一共处理了${play}个${benki_player_name()}的性欲。`,
    ); //

    // 噂（同性爱）
    era.print(lesbian_rumor(arg, play));

    // A = ARG:0 / TARGET = ARG:0 / CALL BENKI_KOUJO
    era_flag.target = arg;
    await benki_koujo();

    // 珠与经验结算
    juel_settle(arg, play);
    if (t(arg, 121)) {
      era.print(`射精经验+${play}`); // 扶她ボーナス
      chara(arg).train.射精经验 += play;
    }
    era.print(`百合经验+${play}`);
    era.print(`经验值+${play}`);
    chara(arg).train.百合经验 += play;
    chara(arg).dungeon.战斗经验 += play;
  } else {
    // —— :1229-1349 一般（両穴/V/A/フェラ）便器分派 ——
    if (menu[1] >= 3 && menu[2] >= 3) {
      era.set('flag:62', 3); // 両穴プレイ
    } else if (menu[1] >= 3) {
      era.set('flag:62', 4); // Vプレイ
    } else if (menu[2] >= 3) {
      era.set('flag:62', 5); // Aプレイ
    } else {
      era.set('flag:62', 6); // その他。フェラ便器
    }

    let s = pregnant_head(); //
    s += `${fs_bitch_looks(arg, rand_n)}的`; //
    if (menu[5] >= 3) {
      s += '身边聚满了看热闹的人，'; //
      play += menu[5]; // 露出ボーナス
    }
    s += '成为了公共便器。'; //
    s += t(arg, 143) ? '魔族的少年在' : '魔族的男人在'; // 正太控
    if (menu[1] >= 3 && menu[2] >= 3) {
      s += `${she(arg)}的子宫、直肠、嘴巴里都灌满了精液。`;
    } else if (menu[1] >= 3) {
      s += `${she(arg)}的子宫和嘴巴里都灌满了精液。`;
    } else if (menu[2] >= 3) {
      s += `${she(arg)}的直肠和嘴巴里都灌满了精液。`;
    } else {
      s += `${she(arg)}的嘴里灌满了精液。`;
    }
    era.print(s);
    era.print(''); // PRINTFORML（空行）

    s = `${name_of(arg)}`; //
    if (t(arg, 26) || t(arg, 10)) {
      s += '最初是恐惧，之后就'; // 悲观的・胆怯
    }
    if (t(arg, 31)) {
      s += '主动分开双腿，'; // 看轻贞操
    }
    era.print(s);

    // 奴隷の様子（常識改変/崩坏/淫乱/爱慕/精液経験）
    if (flag63() === 1) {
      era.print('像家常便饭似的一边聊着天一边交欢着……'); //
    } else if (t(arg, 9)) {
      era.print('浮现出被玩坏的痴笑……'); //
    } else if (t(arg, 76)) {
      era.print('带着淫乱的表情，发出野兽般的娇喘……'); //
    } else if (t(arg, 85)) {
      era.print('泪流满面地在嘴里叨念着你的名字……'); // 爱慕
    } else if (exp(arg, 20) > 1000) {
      era.print('带着谦卑的微笑央求着精液……'); //
    } else if (exp(arg, 20) > 500) {
      era.print('带着谦卑的表情不时吐露着淫语……'); //
    } else if (exp(arg, 20) > 250) {
      era.print('带着生硬的笑容做着V字手势，乞求着原谅……'); //
    } else if (exp(arg, 20) > 100) {
      era.print('带着生硬的笑容被强行做着V字手势……'); //
    } else if (exp(arg, 20) > 50) {
      era.print('不断重复着谢罪的话语……'); //
    } else {
      era.print('两眼无神地看着远方……'); //
    }

    if (menu[1] >= 3 && menu[2] >= 3) {
      play += menu[1] + menu[2]; // A&Vボーナス
    } else if (menu[1] >= 3) {
      play += menu[1]; // Vボーナス
    } else if (menu[2] >= 3) {
      play += menu[2]; // Aボーナス
    } else {
      play += menu[0]; // 奉仕ボーナス
    }
    if (play < 1) {
      play = 1; // 最低一人
    }

    era.print(`${name_of(arg)}共处理了${play}个${benki_player_name()}的性欲。`); //

    // 噂（一般）
    era.print(general_rumor(arg, play));

    // A = ARG:0 / TARGET = ARG:0 / CALL BENKI_KOUJO
    era_flag.target = arg;
    await benki_koujo();

    // 珠与经验结算
    juel_settle(arg, play);
    if (menu[1] >= 3) {
      era.print(`私处点数+${play * 10}`);
      era.print(`私处经验+${play}`);
      chara(arg).dungeon.私处经验 += play;
    }
    if (menu[2] >= 3) {
      era.print(`肛门点数+${play * 10}`);
      era.print(`肛门经验+${play}`);
      chara(arg).dungeon.肛门经验 += play;
    }
    if (menu[1] >= 3 || menu[2] >= 3) {
      era.print(`性交经验+${play}`); // AかVどちらかを満たせば
      chara(arg).dungeon.性交经验 += play;
    }
    era.print(`精液经验+${play}`);
    era.print(`经验值+${play}`);
    chara(arg).dungeon.精液经验 += play;
    chara(arg).dungeon.战斗经验 += play;
  }

  // 出口：DRAWLINE + PRINTW（空行等待）+ TARGET 还原
  era.drawLine();
  era.print('');
  await era.waitAnyKey();
  era_flag.target = target_pool;

  return 0;
}

/**
 * 配信清算首行的「共…」句（BENKI.ERB:626-637）。
 * @param {number} f62 FLAG:62（行动内容）
 * @param {number} play 人数
 * @returns {string}
 */
function clear_line(f62, play) {
  if (f62 === 7) {
    return `处理了${play}只大型犬的性欲。`; // 兽奸配信
  }
  if (f62 === 8) {
    return `向${play}人提供了有偿性服务。`; // 妓女購入配信
  }
  if (f62 === 11 || f62 === 12) {
    return `自慰了${play}次。`; // 拡張配信・自慰配信
  }
  return `和${play}人做爱了。`; //
}

/**
 * 配信清算的珠/经验公共块（BENKI.ERB:645-710）。
 *
 * 阴茎点数（JUEL:0）/ 欲情点数（JUEL:5）/ 耻情点数（JUEL:8）与 V/A 源
 * 的珠加算在此（配信段 :658-660/:696-697，其余分派段各自调 juel_settle
 * 再补 V/A 经验——分派段与配信段的 V/A 珠加算同构，juel_settle 只做
 * 三枚公共珠，V/A 珠在分派段各自的 menu[1]/menu[2] 判断里）。
 *
 * @param {number} cid 角色 ID
 * @param {number} play 人数
 */
function juel_settle(cid, play) {
  if (t(cid, 121) || t(cid, 122)) {
    era.print(`阴茎点数+${play * 10}`); // 扶她/男人
  } else {
    era.print(`阴核点数+${play * 10}`); //
  }
  era.print(`欲情点数+${play * 10}`); //
  era.print(`耻情点数+${play * 5}`); //
  era.set(`juel:${cid}:0`, (era.get(`juel:${cid}:0`) || 0) + play * 10); //
  era.set(`juel:${cid}:5`, (era.get(`juel:${cid}:5`) || 0) + play * 10); //
  era.set(`juel:${cid}:8`, (era.get(`juel:${cid}:8`) || 0) + play * 5); //
}

/**
 * 兽奸便器的噂（BENKI.ERB:805-827）。
 * @param {number} cid 角色 ID
 * @param {number} play 人数
 * @returns {string}
 */
function beast_rumor(cid, play) {
  const name = name_of(cid);
  if (play > 30) {
    return `${name}与其和同族做爱，还是比较喜欢在厕所与魔兽的阴茎玩。这样的传闻扩散到${she(cid)}的故乡。这么可爱的脸却有这么变态的欲望，被乡人蔑视了。`;
  }
  if (play > 25) {
    return `${name}的痴态传到了地下城外，作为相比外面的同类还是更喜欢和地底魔兽玩的变态而出名了。`;
  }
  if (play > 20) {
    return `${name}在地下城居民中作为魔兽的变态便器而闻名。`;
  }
  if (play > 15) {
    return `${name}在魔王的直属部队里有着【比魔兽更下等的变态】的传言。`;
  }
  if (play > 10) {
    return `${name}在魔王的亲信之间流传着是变态的传言。`;
  }
  if (play > 5) {
    return `${name}在好事之徒之间有着喜欢厕所兽奸的传言。`;
  }
  return `${name}的行为不为人知。`;
}

/**
 * 奉仕便器的噂（BENKI.ERB:992-1021）。
 * @param {number} cid 角色 ID
 * @param {number} play 人数
 * @returns {string}
 */
function service_rumor(cid, play) {
  const name = name_of(cid);
  const saint = t(cid, 122) ? '圣者' : '圣女'; // 男人→圣者/否则圣女
  if (play > 30) {
    return `${name}拥有肮脏欲望和差劲眼光的传闻扩散到了故乡，以无论多脏的东西会乐意给予性施舍的${saint}而闻名。`;
  }
  if (play > 25) {
    return `${name}的痴态传到了地下城外，以无论多脏的东西会乐意给予性施舍的${saint}而闻名。`;
  }
  if (play > 20) {
    return `${name}在地下城内被广泛讨论，以无论多脏的东西会乐意给予性施舍的色情狂而闻名。`;
  }
  if (play > 15) {
    return `${name}在魔王的直属部队里有着无论多脏都愿意上的传闻。`;
  }
  if (play > 10) {
    return `${name}在魔王的亲信中有着纯粹的色情狂这样的传闻。`;
  }
  if (play > 5) {
    return `${name}在好事之徒之中有着做侍奉便器的传闻。`;
  }
  return `${name}的行为不为人知。`;
}

/**
 * 同性爱便器的噂（BENKI.ERB:1168-1192）。
 * @param {number} cid 角色 ID
 * @param {number} play 人数
 * @returns {string}
 */
function lesbian_rumor(cid, play) {
  const name = name_of(cid);
  if (play > 30) {
    return `${name}是个喜欢强奸女人的女勇者，这样的传闻传到了故乡，被朋友的女儿们嫌弃了。以变态百合女而闻名。`;
  }
  if (play > 25) {
    return `${name}的痴态传到了地下城外，以女勇者是个彻底的变态百合女而闻名。`;
  }
  if (play > 20) {
    return `${name}的传闻在地下城内流传，以女勇者是个强奸女人的不得了的变态女而闻名。`;
  }
  if (play > 15) {
    return `${name}在魔王的直属部队里有着只要是女人来者不拒的传闻。`;
  }
  if (play > 10) {
    return `${name}在魔王的亲信之间流传着作为变态百合女的传闻。`;
  }
  if (play > 5) {
    return `${name}在好事之徒之间有着百合便器的传闻。`;
  }
  return `${name}的行为不为人知。`;
}

/**
 * 一般（両穴/V/A/フェラ）便器的噂（BENKI.ERB:1375-1403）。
 * @param {number} cid 角色 ID
 * @param {number} play 人数
 * @returns {string}
 */
function general_rumor(cid, play) {
  const name = name_of(cid);
  if (play > 30) {
    return `${name}向魔族谄媚的传闻传到了故乡，被乡里鄙视了。${name}作为最喜欢肮脏阴茎的变态公众便器而闻名。`;
  }
  if (play > 25) {
    return `${name}的痴态传到了地下城外，以最喜欢肮脏阴茎的变态公众便器而闻名。`;
  }
  if (play > 20) {
    return `${name}在地下城内被广泛讨论，作为每晚免费打开双腿的公众便器而闻名。`;
  }
  if (play > 15) {
    return `${name}在魔王的直属部队里有着【公众便器】的传言。`;
  }
  if (play > 10) {
    return `${name}在魔王的亲信中有着来者不拒的传闻。`;
  }
  if (play > 5) {
    return `${name}在好事之徒之中有着做公众便器的传闻。`;
  }
  return `${name}的行为不为人知。`;
}

/** %FS_BITCH("LOOKS", ARG)% 的等价物（DUNGEON_BITCH_LOG.ERB:162-270，随 #185）。
 *  LOOKS 有 DICE = 2 的随机覆盖（#185 真身），随机源与 run_benki 的 rand
 *  同源注入，测试用定值序固定分支（LOOKS 的 RAND 与 PLAY 的 RAND:4 共用
 *  同一序列，与 kojo-dungeon-bitch 的先例一致）。 */
function fs_bitch_looks(cid, rand_n) {
  return require('#/kojo/kojo-dungeon-bitch-log').fs_bitch(
    'LOOKS',
    cid,
    rand_n,
  );
}

/**
 * @SELECT_BENKI_MENU（BENKI.ERB:1359-1427）：战斗中肉便器的 PLAY 类型选择。
 *
 * 以固定概率序列（后判越低概率）从「技巧/奉仕技術/露出癖/奉仕精神/V 感覚/
 * A 感覚」各条件中抽一个调教指令号；全不命中回落 0（爱抚）。
 * 返回 ANSWER = 调教指令号（L_I 空间，与 @COM<n> 同号）。
 *
 * @param {number} arg 角色 ID（原作 ARG）
 * @param {string} args 参照内容（原作 ARGS；当前只有 "战斗" 一个消费方）
 * @param {(n: number) => number} [rand_n] RAND:DICE 随机源
 * @returns {number} 指令号（0-38；缺省 0 爱抚）
 */
function select_benki_menu(arg, args, rand_n = default_rand) {
  let answer = 0; // デフォは愛撫
  let dice = 2; //
  if (args === '战斗') {
    // 技巧2以上で手淫分岐
    if (abl(arg, 12) >= 2 && rand_n(dice) === 0) {
      answer = 30;
      dice += 1;
    }
    // 奉仕技術2以上でフェラ分岐
    if (abl(arg, 13) >= 2 && rand_n(dice) === 0) {
      answer = 31;
      dice += 1;
    }
    // 露出癖2以上で自慰分岐
    if (abl(arg, 17) >= 2 && rand_n(dice) === 0) {
      answer = 3;
      dice += 1;
    }
    // 奉仕精神2以上でアナル奉仕分岐
    if (abl(arg, 16) >= 2 && rand_n(dice) === 0) {
      answer = 37;
      dice += 1;
    }
    // V感覚2以上で正常位分岐（CALL V_ABLE——#213 真身接线）
    if (abl(arg, 2) >= 2 && v_able(arg) === 1 && rand_n(dice) === 0) {
      answer = 20;
      dice += 1;
    }
    // V感覚2以上で後背位分岐
    if (abl(arg, 2) >= 2 && v_able(arg) === 1 && rand_n(dice) === 0) {
      answer = 21;
      dice += 1;
    }
    // A感覚2以上で正常位アナル分岐
    if (abl(arg, 3) >= 2 && rand_n(dice) === 0) {
      answer = 26;
      dice += 1;
    }
    // A感覚2以上で後背位アナル分岐
    if (abl(arg, 3) >= 2 && rand_n(dice) === 0) {
      answer = 27;
      dice += 1;
    }
  }
  return answer;
}

/** @NAME_BENKI_MENU 的指令号 → 名字表（BENKI.ERB:1440-1492 SELECTCASE） */
const NAME_BENKI_MENU_TABLE = {
  0: '爱抚',
  1: '舔阴',
  2: '肛门爱抚',
  3: '自慰',
  4: '口交',
  5: '胸爱抚',
  6: '接吻',
  7: '自己扒开',
  8: '插入手指',
  9: '舔肛',
  10: '振动宝石',
  11: '壶虫',
  20: '正常位',
  21: '背后位',
  22: '对面座位',
  23: '背面座位',
  26: '正常位肛交',
  27: '背后位肛交',
  28: '对面座位肛交',
  29: '背面座位肛交',
  30: '手淫',
  31: '口交',
  32: '乳交',
  33: '股间性交',
  34: '骑乘位',
  36: '骑乘位肛交',
  37: '肛门侍奉',
  38: '足交',
};

/**
 * @NAME_BENKI_MENU（BENKI.ERB:1430-1494）：PLAY 类型名。
 *
 * 原作以 PRINT 拼进攻击演出（「以（名字）进行了诱惑」）；ere 侧为
 * **返回名字串**——Emuera 内联 PRINT 习语的 ere 等价物（#215 裁定 1
 * 同款：GET_CLOTHTYPE 返回串），由调用点拼行。
 *
 * @param {number} arg 指令号（原作 ARG）
 * @returns {string} 类型名（表外号返回空串——原作 SELECTCASE 无 CASEELSE）
 */
function name_benki_menu(arg) {
  return NAME_BENKI_MENU_TABLE[arg] ?? '';
}

/**
 * @GET_EXP_BENKI_MENU（BENKI.ERB:1497-1654）：肉便器战斗的经验加成。
 *
 * 门槛（TALENT:204 肉便器 == 0 / TALENT:281 常识改变【战斗】== 0 → 直接
 * 返回）。按指令号（ARG:1 = PLAY_TYPE）把 PLAY=10 换算成 PALAM 加算
 * （GET_PALAM 数组），逐条输出 %PALAMNAME%+{n}，并全部加进 JUEL。
 * 经验（私处/肛门/口交/自慰）按 CASE 直接 EXP += PLAY/10（整数除法）。
 *
 * @param {number} arg0 角色 ID（原作 ARG:0）
 * @param {number} arg1 指令号（原作 ARG:1）
 * @returns {number} 原作 RETURN 0
 */
async function get_exp_benki_menu(arg0, arg1) {
  if (t(arg0, 204) === 0) {
    return 0; //
  }
  if (t(arg0, 281) === 0) {
    return 0; //
  }

  const get_palam = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //
  const play = 10; //

  // SELECTCASE ARG:1（指令号 → PALAM/经验加算）
  switch (arg1) {
    case 0:
      get_palam[7] += Math.floor(play / 10); // 愛撫
      break;
    case 1:
      get_palam[0] += play; // クンニ
      break;
    case 2:
      get_palam[2] += Math.floor(play / 2); // アナル愛撫
      break;
    case 3:
      get_palam[7] += Math.floor(play / 5); // 自慰
      get_palam[0] += play;
      era.print(`自慰经验+${Math.floor(play / 10)}`);
      await era.waitAnyKey(); // PRINTFORMW
      chara(arg0).dungeon.自慰经验 += Math.floor(play / 10);
      break;
    case 4:
    case 5:
    case 6:
      break; // フェラする / 胸愛撫 / キス（无加算）
    case 7:
      get_palam[7] += Math.floor(play / 8); // 秘貝開帳
      get_palam[0] += play;
      era.print(`自慰经验+${Math.floor(play / 10)}`);
      await era.waitAnyKey(); // PRINTFORMW
      chara(arg0).dungeon.自慰经验 += Math.floor(play / 10);
      break;
    case 8:
      get_palam[1] += Math.floor(play / 2); // 指挿入れ
      era.print(`私处经验+${Math.floor(play / 10)}`);
      await era.waitAnyKey(); // PRINTFORMW
      chara(arg0).dungeon.私处经验 += Math.floor(play / 10);
      break;
    case 9:
      break; // アナル舐め
    case 10:
      get_palam[0] += play; // 振動の宝石
      break;
    case 11:
      get_palam[1] += play; // 壺ワーム
      era.print(`私处经验+${Math.floor(play / 10)}`);
      await era.waitAnyKey(); // PRINTFORMW
      chara(arg0).dungeon.私处经验 += Math.floor(play / 10);
      break;
    case 20:
    case 21:
    case 22:
    case 23:
      get_palam[7] += Math.floor(play / 3); // 正常位/後背位/対面座位/背面座位
      get_palam[1] += play;
      era.print(`私处经验+${Math.floor(play / 10)}`);
      await era.waitAnyKey(); // PRINTFORMW
      chara(arg0).dungeon.私处经验 += Math.floor(play / 10);
      break;
    case 26:
    case 27:
    case 28:
    case 29:
      get_palam[7] += Math.floor(play / 3); // 正常位/後背位/対面座位/背面座位アナル
      get_palam[2] += play;
      era.print(`肛门经验+${Math.floor(play / 10)}`);
      await era.waitAnyKey(); // PRINTFORMW
      chara(arg0).dungeon.肛门经验 += Math.floor(play / 10);
      break;
    case 30:
    case 31:
    case 32:
      get_palam[7] += Math.floor(play / 2); // 手淫/フェラ/パイズリ
      get_palam[6] += Math.floor(play / 3);
      if (arg1 === 31) {
        era.print(`口交经验+${Math.floor(play / 10)}`);
        await era.waitAnyKey(); // PRINTFORMW
        chara(arg0).dungeon.口交经验 += Math.floor(play / 10);
      }
      break;
    case 33:
      get_palam[7] += Math.floor(play / 2); // 素股
      get_palam[0] += play;
      get_palam[6] += Math.floor(play / 3);
      break;
    case 34:
      get_palam[7] += Math.floor(play / 2); // 騎乗位
      get_palam[1] += play;
      get_palam[6] += Math.floor(play / 3);
      era.print(`私处经验+${Math.floor(play / 10)}`);
      await era.waitAnyKey(); // PRINTFORMW
      chara(arg0).dungeon.私处经验 += Math.floor(play / 10);
      break;
    case 36:
      get_palam[7] += Math.floor(play / 2); // 騎乗位アナル
      get_palam[2] += play;
      get_palam[6] += Math.floor(play / 3);
      era.print(`肛门经验+${Math.floor(play / 10)}`);
      await era.waitAnyKey(); // PRINTFORMW
      chara(arg0).dungeon.肛门经验 += Math.floor(play / 10);
      break;
    case 37:
      get_palam[7] += Math.floor(play / 2); // アナル奉仕
      get_palam[6] += Math.floor(play * 2);
      break;
    case 38:
      get_palam[7] += Math.floor(play / 2); // 足コキ
      break;
    default:
      break; // CASEELSE 无加算
  }

  // FOR LOCAL,0,15：非零格输出 %PALAMNAME%+{n}，全部加进 JUEL
  for (let i = 0; i < 15; i += 1) {
    if (get_palam[i]) {
      era.print(`${era.get(`palamname:${i}`) ?? ''}+${get_palam[i]}`);
    }
    era.set(
      `juel:${arg0}:${i}`,
      (era.get(`juel:${arg0}:${i}`) || 0) + get_palam[i],
    );
  }

  return 0;
}

/**
 * @BENKI_PLAYER_NAME（BENKI.ERB:1656-1681）：侍奉对象名（读 FLAG:64）。
 *
 * 原作以 PRINT 拼进行内文案；ere 侧返回名字串由调用点拼行（同
 * name_benki_menu / GET_CLOTHTYPE 先例）。FLAG:64 未定（-2 或无对应）时
 * 返回空串（原作 SELECTCASE 无 ELSE——不输出）。
 *
 * @returns {string} 对象名
 */
function benki_player_name() {
  const map = {
    0: '居住在地下城深渊中散发着恶臭的肮脏眷属',
    1: '妓女',
    2: '大型犬',
    3: '魔族男性',
    4: '黑暗精灵少年',
    5: '全身油脂的兽人',
    6: '中年兽人',
    7: '奴隶少女',
    8: '乞丐',
    9: '女淫魔',
  };
  return map[flag64()] ?? '';
}

module.exports = {
  STUBBED_CALLS,
  run_benki,
  select_benki_menu,
  name_benki_menu,
  get_exp_benki_menu,
  benki_player_name,
};
