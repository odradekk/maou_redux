/**
 * @file 圣灵骑士堡垒攻略（issue #470，阶段 5c Q13 侵略残余·3）。
 *
 * 源: target/ERB/侵略/ARCANA_FORT.ERB  @ARCANA_FORT（:2-551，单一大函数）
 *
 * 东南西北四门各一名圣灵骑士守将（FLAG:92 位掩码：&1 东·黑方片 / &2 南·
 * 银黑桃 / &4 西·白梅花 / &8 北·金红桃，预设号东 22 西 23 南 21 北 20）。
 * 玩家选一个奴隶去攻打：赢了俘虏对方入队、拿钱、拿牌（FLAG:92 置位）；
 * 四门全下（FLAG:92 == 15）后菜单只剩总结叙述。战斗本体是
 * ere/invasion/invasion-arcana-battle.js 的 arcana_battle（本票同批落地）。
 *
 * 移植说明（有意保留的原作形态，均注明出处）：
 *   - 勇者选择列表的非妊娠分支（:227-325）无效输入 GOTO INPUT_LOOP1
 *     （:294-295 RESULT<0、:308-309 越界）——跳进**妊娠出撃可**分支的
 *     循环头（:153），列表改按无妊娠过滤重渲染、且后续选择也按该过滤
 *     映射。原作复制粘贴事故，1:1 保留为「无效输入把列表模式翻到妊娠
 *     允许」（mode 翻转）；MAX_PAGE 在进入列表前算一次（:239-244）、
 *     翻转后不重算，同样照抄。
 *     **这两条守卫与妊娠分支内的同款（:197-198 / :211-212）在
 *     EraElectron 都是引擎死路径**：列表项与 1000/999/1001 都经
 *     printButton 落地，引擎渲染层只回传本轮已打印按钮的快捷键，越界值
 *     根本送不到游戏代码（#130；page-invasion.js 的同款裁定见
 *     test/page-invasion.test.js:177）。保留是 1:1 照抄，不是为了实跑。
 *   - 候选行的 [可以攻击] 着色段（:179-182 SETCOLOR 255,100,100）无引擎
 *     通道；原作判据 CFLAG:0 > 1 && COUNT != 0 对候选过滤（CFLAG:0 == 2）
 *     恒真，按恒真并入行文本。列宽对齐（%SAVESTR:COUNT,12,LEFT% 等）
 *     不镜像，page-select-target.js 的行文本先例。
 *   - :466 TARGET = A_ARCANA 的全局换手被 wearing_cloth_able 的形参吸收
 *     （#5 决议第六条）；战斗侧 duel_attack 自管 target。
 *   - SAVESTR:A = %NAME:A%（:399/:414/:431/:447）在 ere 侧是 no-op——
 *     callname:-1 已是名前（#5 决议；enter-enemy.js 文件头同款说明），
 *     CSTR:1（:400 等）照写。
 *   - A_ARCANA = CHARANUM - 1（:398/:413/:430/:446、敗北側 :541）在扁平化
 *     模型（#21）下角色号 = 预设号，直接用 a_arcana（chara-custom.js
 *     char_append 先例）。
 *   - 跨域写一律走门面（#71；本文件属 invasion 域）：FLAG:92（era_flag.
 *     arcana_fort_stage）、MONEY/EX_FLAG:4444（era_flag.money /
 *     era_exflag.legit_money，#175 的镜像对）、CFLAG:1/状态、CFLAG:550/6/
 *     15/CSTR:1/451-457（chara 门面）、ABL:31（train）、EXP:0/5/10
 *     （dungeon）、FLAG:1/2（game.event，狂王线败北清槽）、BASE:0/1
 *     （dungeon）。FLAG:5/60/500 只读。
 */

'use strict';

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { add_chara_ex } = require('#/chara/chara-ex');
const {
  char_body_generate_wapped,
  char_size_generate,
} = require('#/chara/chara-body');
const { cn_rebuild } = require('#/chara/chara-name');
const { wearing_cloth_able } = require('#/system/train/cloth');
const { st_up } = require('#/dungeon/dungeon-lvup');
const { party_char_del } = require('#/dungeon/dungeon-party');
const { arcana_battle } = require('#/invasion/invasion-arcana-battle');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。
 */
const STUBBED_CALLS = [];

/** 原作 RAND:N（0..N-1）的缺省实现 */
const default_rand = (n) => Math.floor(Math.random() * n);

/** 名字承载（#5 决议：SAVESTR:x ↔ callname:x:-1） */
function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

/** 每页候选数（#DIM NUM_PAGE = 26，:12） */
const NUM_PAGE = 26;

/**
 * 勇者选择候选判据（:138/:174/:220 妊娠允许版；:234/:271/:318 非妊娠版加
 * TALENT:153 == 0）：状态 0/7 + 爱(85)或淫乱(76) + 种族(CFLAG:0) == 2 +
 * 非魔王。开场侦察（:62-65）用同一判据、无妊娠项（:63）。
 * @param {number} cid 候选角色
 * @param {boolean} pregnant_ok 妊娠者可出击（GETBIT(FLAG:5,10)，:131）
 * @returns {boolean}
 */
function is_candidate(cid, pregnant_ok) {
  const state = chara(cid).invasion.状态;
  if (state !== 0 && state !== 7) {
    return false;
  }
  if (
    (era.get(`talent:${cid}:85`) || 0) !== 1 &&
    (era.get(`talent:${cid}:76`) || 0) !== 1
  ) {
    return false;
  }
  if ((era.get(`cflag:${cid}:0`) || 0) !== 2 || cid === 0) {
    return false;
  }
  return pregnant_ok || (era.get(`talent:${cid}:153`) || 0) === 0;
}

/**
 * @ARCANA_FORT（:2-551）：圣灵骑士堡垒攻略主体。
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @param {object} [move_ctx] 战斗上下文（透传 arcana_battle）
 * @returns {Promise<number>} 原作 RETURN：1 = 回合已耗（打了一仗），
 *   0 = 取消（撤退/无候选/已全破）
 */
async function arcana_fort(rand = default_rand, move_ctx = {}) {
  const settings = era.get('flag:5') || 0;
  const stage = era_flag.arcana_fort_stage;

  // === 入场叙述（:22-73） ===
  if (stage !== 0) {
    if (stage === 15) {
      // :23-27 四门全破
      era.print('圣灵骑士全部都被打倒了，四个据点也都被攻陷了。');
      await era.waitAnyKey();
      era.print('然后，你得到了四张独特的牌，有何作用呢？');
      await era.waitAnyKey();
      era.print(
        '（作为狂王的情妇及亲卫队长，也许在金红桃身上能得到一点情报？）',
      );
      await era.waitAnyKey();
      return 0;
    }
    if (stage === 14 || stage === 13 || stage === 11 || stage === 7) {
      // :29-39 捕獲３人：只剩一位
      era.print('最后只剩下');
      if ((stage & 1) === 0) {
        era.print('黑方片');
      }
      if ((stage & 2) === 0) {
        era.print('银黑桃');
      }
      if ((stage & 4) === 0) {
        era.print('白梅花');
      }
      if ((stage & 8) === 0) {
        era.print('金红桃');
      }
      era.print('一位圣灵骑士，决战时刻临近了……');
      await era.waitAnyKey();
    } else if (
      stage === 3 ||
      stage === 5 ||
      stage === 9 ||
      stage === 6 ||
      stage === 10 ||
      stage === 12
    ) {
      // :41-42 捕獲２人
      era.print('现在打倒了两位圣灵骑士，还剩下两个堡垒……');
      await era.waitAnyKey();
    } else if (stage === 1 || stage === 2 || stage === 4 || stage === 8) {
      // :44-54 捕獲１人
      era.print('你的奴隶，将伟大的圣灵骑士');
      if (stage === 1) {
        era.print('黑方片');
      }
      if (stage === 2) {
        era.print('银黑桃');
      }
      if (stage === 4) {
        era.print('白梅花');
      }
      if (stage === 8) {
        era.print('金红桃');
      }
      era.print('打倒了，还剩下三位圣灵骑士……');
      await era.waitAnyKey();
    }
  } else {
    // :56-72 初回：俘虏情报 + 有无可派刺客（:62-65 的侦察判据无妊娠项）
    era.print(
      '有俘虏说，狂王的亲卫队【圣灵骑士】正在为进攻你的地下城而在东南西北四个堡垒里特训着。',
    );
    await era.waitAnyKey();
    era.print(
      '其它的俘虏也有提起，圣灵骑士正在为封印你的整个地下城而进行了某种仪式。',
    );
    await era.waitAnyKey();
    era.print('其它不同种族的人，也都或多或少地提到【圣灵骑士堡垒】这东西。');
    await era.waitAnyKey();
    era.print('听起来像是有意传播的谣言呢。');
    await era.waitAnyKey();
    if (era.getAddedCharacters().some((cid) => is_candidate(cid, true))) {
      era.print('但是，从中看出机会的你反而命令你的奴隶去捕捉圣灵骑士……');
      await era.waitAnyKey();
    } else {
      era.print(
        '圣灵骑士全是一骑当千的高手，手下的怪物想必去到也只有被秒杀的份了吧。',
      );
      await era.waitAnyKey();
      era.print('要把这样的猛士抓回来调教，看来必须派遣刺客才行……');
      await era.waitAnyKey();
      return 0;
    }
  }

  // === 東西南北の門（:75-125） ===
  era.drawLine();
  era.print('要向哪个堡垒派遣刺客呢？必须打倒圣灵骑士才算胜利。');
  await era.waitAnyKey();
  // 已攻占的门不是按钮（原作 :80-84 的 PRINTL [*]），输入对应编号会被
  // 引擎拒收（#130；文件头「引擎死路径」条）
  if ((stage & 1) !== 0) {
    era.print('[*] - 东方堡垒（已攻占）');
  } else {
    era.printButton('东方堡垒', 0);
  }
  if ((stage & 4) !== 0) {
    era.print('[*] - 西方堡垒（已攻占）');
  } else {
    era.printButton('西方堡垒', 1);
  }
  if ((stage & 2) !== 0) {
    era.print('[*] - 南方堡垒（已攻占）');
  } else {
    era.printButton('南方堡垒', 2);
  }
  if ((stage & 8) !== 0) {
    era.print('[*] - 北方堡垒（已攻占）');
  } else {
    era.printButton('北方堡垒', 3);
  }
  era.printButton('撤退', 4);

  // $INPUT_LOOP :105-125（GOTO 重问不重画）
  let tmp_arcana = -1;
  for (;;) {
    const result = await era.input();
    if (result === 4) {
      return 0; // :107-108
    }
    if (result >= 5 || result < 0) {
      continue; // :109-113
    }
    if ((stage & 1) !== 0 && result === 0) {
      continue; // :115-116
    }
    if ((stage & 4) !== 0 && result === 1) {
      continue; // :117-118
    }
    if ((stage & 2) !== 0 && result === 2) {
      continue; // :119-120
    }
    if ((stage & 8) !== 0 && result === 3) {
      continue; // :121-122
    }
    tmp_arcana = result; // :125 TMP_ARCANA = RESULT
    break;
  }

  // === 勇者選択（:127-325） ===
  // GETBIT(FLAG:5,10) 妊娠出撃可（:131）→ 允许妊娠（TALENT:153）者出击
  let pregnant_ok = ((settings >> 10) & 1) === 1;
  let candidates = era
    .getAddedCharacters()
    .filter((cid) => is_candidate(cid, pregnant_ok));
  if (candidates.length === 0) {
    // :148-151 / :245-248 *没有可以攻击的勇士*
    era.print('*没有可以攻击的勇士*');
    await era.waitAnyKey();
    return 0;
  }
  // :142-147 / :239-244 MAX_PAGE（0 起；翻转后不重算——文件头）
  let max_page = Math.ceil(candidates.length / NUM_PAGE) - 1;
  let no_page = 0; // #DIM NO_PAGE = 0（:11）

  let y_arcana = 0;
  // $INPUT_LOOP1（:153）/ $INPUT_LOOP2（:250）的合并循环：模式即所在分支
  for (;;) {
    // 每轮重扫（原作 REPEAT CHARANUM 重过滤）；无效输入会把模式翻到
    // 妊娠允许（GOTO INPUT_LOOP1，文件头）
    candidates = era
      .getAddedCharacters()
      .filter((cid) => is_candidate(cid, pregnant_ok));
    era.drawLine();
    era.print('派遣谁去攻击呢？');
    era.drawLine();
    candidates.forEach((cid, index) => {
      if (index >= no_page * NUM_PAGE && index < (no_page + 1) * NUM_PAGE) {
        // :174-184 / :271-281 行文本（[可以攻击] 恒真并入，见文件头）
        era.printButton(
          `${name_of(cid)} LV${era.get(`cflag:${cid}:9`) || 0} 攻击${
            chara(cid).dungeon.攻击力
          } 防御${chara(cid).dungeon.防御力} [可以攻击]`,
          index,
        );
      }
    });
    era.drawLine();
    era.printButton('- 上一页', 1000); // :193 / :290
    era.printButton('返  回', 999); // :194 / :291
    era.printButton('- 下一页', 1001); // :195 / :292

    const result = await era.input();
    if (result === 1000) {
      // 上一页（:199-204 / :296-301）；页首不进，停留在本分支
      if (no_page > 0) {
        no_page -= 1;
      }
      continue;
    }
    if (result === 1001) {
      // 下一页（:205-210 / :302-307）；页尾不进，停留在本分支
      if (no_page < max_page) {
        no_page += 1;
      }
      continue;
    }
    if (result === 999) {
      return 0; // :214-215 / :311-312 返  回
    }
    if (result < 0 || result >= candidates.length) {
      // :211-213 / :308-310 RESULT < 0 或超出本页计数 → GOTO INPUT_LOOP1
      pregnant_ok = true;
      continue;
    }
    y_arcana = candidates[result]; // :217-226 / :315-324 序号 → 角色号
    break;
  }

  // === 東西南北の遭遇叙述（:327-391） ===
  // 曾为勇者（TALENT:167-170）走「曾经的同伴」分支；CFLAG:40 == 0 全裸
  const former_hero =
    (era.get(`talent:${y_arcana}:167`) || 0) !== 0 ||
    (era.get(`talent:${y_arcana}:168`) || 0) !== 0 ||
    (era.get(`talent:${y_arcana}:169`) || 0) !== 0 ||
    (era.get(`talent:${y_arcana}:170`) || 0) !== 0;
  const naked = (era.get(`cflag:${y_arcana}:40`) || 0) === 0;
  const print_w = async (text) => {
    era.print(text);
    await era.waitAnyKey();
  };
  if (tmp_arcana === 0) {
    // :328-342 東の砦 黑方片
    if (former_hero) {
      await print_w('在东方堡垒遇到了黑方片，把剑插在地上，双臂交叉抱于胸前。');
      await print_w(`黑方片看着曾经是同伴的${name_of(y_arcana)}，皱起了眉头。`);
      await print_w(
        '「怎么会这样，难道你已经成为了魔王的手下了吗？…………没办法了，事已至此，受伤可别怪我！做好觉悟吧！！」',
      );
      if (naked) {
        await print_w('「竟然派你全裸来战斗……魔王这混蛋，绝对不可原谅！！」');
      }
      await print_w('黑方片犹豫了一下，但还是挥舞着黑亮的大剑发起了袭击。');
    } else {
      await print_w('在东方堡垒遇到了黑方片，把剑插在地上，双臂交叉抱于胸前。');
      await print_w(
        '「等着我来解放你。唉……可悲的人啊，放弃了勇者光明的未来去做魔王的爪牙，真是何苦！」',
      );
      if (naked) {
        await print_w('「被全裸地派来战斗，真是值得同情啊！」');
      }
      await print_w('黑方片挥舞着黑亮的大剑发起了袭击。');
    }
  } else if (tmp_arcana === 1) {
    // :343-358 西の砦 白梅花
    if (former_hero) {
      await print_w(
        '在西方堡垒遇到了白梅花，发现刺客的她把正在看的书塞回了长袍内。',
      );
      await print_w(`白梅花看着曾经是同伴的${name_of(y_arcana)}，瞪大了眼睛。`);
      await print_w(
        '「哎呀呀…你成了魔王的奴隶真令人意外呢，我还以为你会咬舌自尽之类的。」',
      );
      if (naked) {
        await print_w('「而且要全裸着和我对战啊？稍微有点后悔了吗？」');
      }
      await print_w(
        '白梅花眼神突然变得凌厉了起来，举起雪白的魔杖开始咏唱起咒文！',
      );
    } else {
      await print_w(
        '在西方堡垒遇到了白梅花，发现刺客的她把正在看的书塞回了长袍内。',
      );
      await print_w(
        '「唉…我才刚开始看这本书没多久啊…能让我快点把书看完再来应付你么？…不行么？真没办法呢……」',
      );
      if (naked) {
        await print_w('「哇…全裸战斗这种事…是魔王的恶趣味？」');
      }
      await print_w(
        '白梅花无奈地叹着气，但雪白的魔杖却突然开始放出强烈的魔力波动！',
      );
    }
  } else if (tmp_arcana === 2) {
    // :359-374 南の砦 银黑桃
    if (former_hero) {
      await print_w(
        '在南方堡垒遇到了银黑桃，穿着全套黑色的忍者服，完全不像被偷袭的样子。',
      );
      await print_w(
        `银黑桃看着曾经是同伴的${name_of(y_arcana)}，发出了一声吃惊的声音。`,
      );
      await print_w(
        '「原来如此，与你为敌我也从未想过。既然如此，我也要认真起来了！」',
      );
      if (naked) {
        await print_w('「哪，哪怕你全裸，我也是不会分心的！！」');
      }
      await print_w('银黑桃用脚在地上一踏，分出了分身袭击过来了！');
    } else {
      await print_w(
        '在南方堡垒遇到了银黑桃，穿着全套黑色的忍者服，完全不像被偷袭的样子。',
      );
      await print_w(
        '「哎呀哎呀……这样引你们过来然后捕获实在与我的个性不符…不过这也是狂王大人的命令，效忠一个主公也是一件很艰难的事呢。」',
      );
      if (naked) {
        await print_w('「啊……对了……我还想问你们，全裸了防御力也不下降的么？」');
      }
      await print_w('银黑桃分出了分身袭击过来了！');
    }
  } else if (tmp_arcana === 3) {
    // :375-390 北の砦 金红桃
    if (former_hero) {
      await print_w(
        '在北方堡垒遇到了作为亲卫队长的金红桃，金色的铠甲闪烁着犹如太阳一样的光芒，隐约可见有符文在光芒里浮动着。',
      );
      await print_w(
        `金红桃看着曾经是同伴的${name_of(y_arcana)}，露出了一瞬间的悲伤，但马上又重振了精神。`,
      );
      await print_w(
        '「哎呀呀……真令人为难，我也不想和曾经的同伴兵戎相见但这也是狂王大人的命令～所以……」',
      );
      if (naked) {
        await print_w('「呵呵呵……特意全身赤裸地来挑战是为了被侵犯的么？」');
      }
      await print_w('金红桃微笑着，举起毫不留情的剑刺过来了！');
    } else {
      await print_w(
        '在北方堡垒遇到了作为亲卫队长的金红桃，金色的铠甲闪烁着犹如太阳一样的光芒，隐约可见有符文在光芒里浮动着。',
      );
      await print_w('「欢迎光临～可怜的魔王奴隶哦♪～请务必让我愉悦一下呢！」');
      if (naked) {
        await print_w(
          '「特意全裸出现是为了展示自己的变态么？那个细嫩的肌肤就让我刻点什么上去吧！」',
        );
      }
      await print_w('金红桃微笑着，举起毫不留情的剑刺过来了！');
    }
  }

  // === キャラ追加（:393-463） ===
  const KNIGHTS = {
    0: { preset: 22, weapon: 40 + 9000 + 900000 }, // :395-408 東 黑方片：剑·強度9·暗黑
    1: { preset: 23, weapon: 41 + 9000 + 600000 }, // :410-425 西 白梅花：法杖·強度9·寒冰
    2: { preset: 21, weapon: 44 + 9000 + 300000 }, // :427-441 南 银黑桃：手里剑·強度9·致命
    3: { preset: 20, weapon: 50 + 10000 + 400000 }, // :443-462 北 金红桃：细剑·強度10·强击
  };
  const knight = KNIGHTS[tmp_arcana];
  const a_arcana = knight.preset; // A = CHARANUM-1（扁平化 = 预设号，文件头）
  era.addCharacter(a_arcana); // :396 等 ADDCHARA 22
  await add_chara_ex(a_arcana); // :397 等 ADDCHARA_EX(CHARANUM-1)
  // SAVESTR:A = %NAME:A% 是 no-op（文件头）；CSTR:1 照写
  chara(a_arcana).chara.加入时名字 = name_of(a_arcana); // :400 等 CSTR:A:1
  if (tmp_arcana === 1) {
    chara(a_arcana).train.自慰中毒 = 1; // :416 ABL:A:31 = 1
    chara(a_arcana).dungeon.自慰经验 = 30; // :417 EXP:A:10 = 30
  }
  if (tmp_arcana === 2) {
    chara(a_arcana).dungeon.自慰经验 = 10; // :433 EXP:A:10 = 10
  }
  if (tmp_arcana === 3) {
    chara(a_arcana).dungeon.私处经验 = 20; // :449 EXP:A:0 = 20
    if ((era.get('flag:500') || 0) === 0 || (era.get('flag:500') || 0) === 2) {
      // :451-452 狂王が男か扶她ならば精液经验（EXP:A:5 = EXP:A:0）
      chara(a_arcana).dungeon.性交经验 = chara(a_arcana).dungeon.私处经验;
    }
    chara(a_arcana).train.初体验对象 = 105; // :454 初体験の相手は狂王
  }
  chara(a_arcana).chara.武装 = knight.weapon; // :402/:419/:435/:456 等 初期装備（三段编码累加）
  chara(a_arcana).chara.随机名编号 = rand(80); // :408/:425/:441/:462 名前決定

  // === 衣装与身体（:465-468） ===
  // :466 TARGET = A_ARCANA——全局换手被 wearing_cloth_able 的形参吸收
  wearing_cloth_able(a_arcana); // :467
  char_body_generate_wapped(a_arcana, rand); // :468

  // === レベルアップ処理（:470-475） ===
  const level_ups = era.get('flag:60') || 0;
  for (let i = 0; i < level_ups; i += 1) {
    st_up(a_arcana, rand); // :473
  }

  // :477-478 体力/气力回满
  chara(a_arcana).dungeon.体力 = era.get(`maxbase:${a_arcana}:0`) || 0;
  chara(a_arcana).dungeon.气力 = era.get(`maxbase:${a_arcana}:1`) || 0;

  // === 戦闘（:480-484） ===
  const battle_result = await arcana_battle(y_arcana, a_arcana, rand, move_ctx);

  // === 勝ち（:486-531） ===
  if (battle_result === 2) {
    era.drawLine();
    era.print(`圣灵骑士${name_of(a_arcana)}战败了…`);
    // :490-492 赏金（MONEY / EX_FLAG:4444 镜像）
    const gain = 1000 * (era.get(`cflag:${a_arcana}:9`) || 0);
    era_flag.money += gain;
    era_exflag.legit_money += gain;
    era.print(`获得了${gain}G！`);
    await era.waitAnyKey();
    era.print('而且');

    // :494-521 各门的牌、台词与 FLAG:92 置位；CHAR_SIZE_GENERATE 的
    // 人类换算年龄（東 21 / 西 27 / 南 24 / 北 18，:501/:508/:515/:521）
    const gate_age = { 0: 21, 1: 27, 2: 24, 3: 18 }[tmp_arcana];
    const gate_texts = {
      0: ['获得了黑方片持有的【方片Ａ】牌。', '「我居然输了………」'],
      1: [
        '获得了白梅花持有的【梅花Ａ】牌。',
        '「战败也是我的命运么？…我那无法解读的预言，见到了魔王的话，会明白吗………」',
      ],
      2: ['获得了银黑桃持有的【黑桃Ａ】牌。', '「真是的………放开我！」'],
      3: [
        '获得了金红桃持有的【红桃Ａ】牌。',
        '「怎么这样……狂王大人！救救我啊！！」',
      ],
    }[tmp_arcana];
    await print_w(gate_texts[0]);
    await print_w(`然后，被俘虏了的${name_of(a_arcana)}被带到你的地下城了………`);
    await print_w(gate_texts[1]);
    // :499/:506/:513/:520 FLAG:92 |= 位
    era_flag.arcana_fort_stage = stage | { 0: 1, 1: 4, 2: 2, 3: 8 }[tmp_arcana];
    // :501/:508/:515/:521 CALL CHAR_SIZE_GENERATE（RESULT:0-6 带出）
    const size = char_size_generate(a_arcana, gate_age, 0, rand);

    // :523-531 GETBIT(FLAG:5,12)||GETBIT(FLAG:5,15)：体型回写 451-457
    if (((settings >> 12) & 1) === 1 || ((settings >> 15) & 1) === 1) {
      chara(a_arcana).chara.年龄 = size[0];
      chara(a_arcana).chara.种族年龄 = size[1];
      chara(a_arcana).chara.身高 = size[2];
      chara(a_arcana).chara.体重 = size[3];
      chara(a_arcana).chara.胸围 = size[4];
      chara(a_arcana).chara.腰围 = size[5];
      chara(a_arcana).chara.臀围 = size[6];
    }
  } else if (battle_result === 0) {
    // === 負け（:532-545） ===
    if ((settings & 128) !== 0) {
      // :534-539 狂王线：前回の助手・調教対象だった場合はフラグを空に
      if (game.event.上次调教对象 === y_arcana) {
        game.event.上次调教对象 = -1;
      }
      if (game.event.上次助手 === y_arcana) {
        game.event.上次助手 = -1;
      }
    }
    // :541-544 临时骑士移除（A_ARCANA = CHARANUM-1，扁平化直传预设号）
    party_char_del(a_arcana);
    era.removeCharacter(a_arcana);
    cn_rebuild();
  }

  // :547-550 A/B 清零（ere 侧为局部参数，无全局可清）+ DRAWLINE → RETURN 1
  era.drawLine();
  return 1;
}

module.exports = {
  STUBBED_CALLS,
  arcana_fort,
};
