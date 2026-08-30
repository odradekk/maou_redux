/**
 * @file 自动调教系统（EVENT_AUTOTRAIN.ERB 与各 COMF AUTO 移植）。
 *
 * 源: target/ERB/EVENT/EVENT_AUTOTRAIN.ERB
 *     @AUTOTRAIN（:11-47）
 *     @FORMAT_AUTOTRAIN（:51-87）
 *     @BEFORE_AUTOTRAIN（:91-104）
 *     @AFTER_AUTOTRAIN（:108-159）
 *     target/ERB/調教相關/COMF0_愛撫.ERB @COM0_AUTO
 *     target/ERB/調教相關/COMF3_自慰.ERB @COM3_AUTO
 *     target/ERB/調教相關/COMF13_アナルワーム.ERB @COM13_AUTO
 *     target/ERB/調教相關/COMF50_ローション.ERB @COM50_AUTO
 *     target/ERB/調教相關/COMF63_貝あわせ.ERB @COM63_AUTO
 *     target/ERB/迷宮/DUNGEON_TOWN.ERB @RAND_AUTOTRAIN
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');
const { clothtype_text } = require('#/page/page-clothtype');
const { juel_check_main } = require('#/system/train/juel-check');
const { chara } = require('#/facade/chara');
const { stub_line } = require('#/utils/stub-line');
const STUBBED_CALLS = ['KARMA', 'AUTO_ABLUP'];

/**
 * 获取角色称呼（SAVESTR / CALLNAME）
 * @param {number} cid
 * @returns {string}
 */
function chara_name(cid) {
  return chara_callname(cid);
}

/**
 * @BEFORE_AUTOTRAIN（:91-104）：自动调教前的重置
 */
function before_autotrain() {
  for (let local = 0; local < 17; local += 1) {
    era.set(`source:${local}`, 0);
  }
  const target = era_flag.target;
  if (target >= 0) {
    for (let local = 0; local < 17; local += 1) {
      era.set(`delta:${target}:${local}`, 0);
    }
  }
  return 0;
}

/**
 * @FORMAT_AUTOTRAIN（:51-87）：自动调教初始化格式化
 */
function format_autotrain() {
  const target = era_flag.target;
  const assi = era_flag.assi;

  chara(0).train.射精槽 = 0;
  chara(target).train.射精槽 = 0;
  if (assi >= 0) {
    chara(assi).train.射精槽 = 0;
  }
  chara(target).train.母乳槽 = 0;
  chara(0).train.触手射精槽 = 0;

  era.set('losebase:0', 0);
  era.set('losebase:1', 0);

  for (let i = 0; i < 200; i += 1) {
    era.set(`tflag:${i}`, 0);
  }

  for (let local = 0; local < 17; local += 1) {
    era.set(`palam:${target}:${local}`, 0);
  }

  before_autotrain();

  if (era.get(`talent:${target}:271`)) {
    chara(target).train.润滑 = 3000;
    chara(target).train.欲情 = 3000;
  }

  const { game } = require('#/facade/game');
  game.train.死斗场收入 = 0;
  return 0;
}

/**
 * @AFTER_AUTOTRAIN（:108-159）：自动调教后处理
 * @param {number} target
 */
async function after_autotrain(target) {
  // 善恶值增减
  if (era.get(`ex:${target}:1`)) {
    era.print('(私处绝顶导致善良值下降:-1)');
    await era.waitAnyKey();
    stub_line('KARMA', '善恶值增减');
  }
  if (era.get(`ex:${target}:2`)) {
    era.print('(肛门绝顶导致善良值下降:-2)');
    await era.waitAnyKey();
    stub_line('KARMA', '善恶值增减');
  }

  // 常时发情
  if ((era.get('flag:75') || 0) === 0 && !era.get(`talent:${target}:271`)) {
    const palam3 = era.get(`palam:${target}:3`) || 0;
    if (palam3 >= 10000) {
      chara(target).train.蓄积润滑 += Math.floor(palam3 / 10000);
    } else {
      chara(target).train.蓄积润滑 = 0;
    }

    const palam5 = era.get(`palam:${target}:5`) || 0;
    if (palam5 >= 10000) {
      chara(target).train.蓄积欲情 += Math.floor(palam5 / 10000);
    } else {
      chara(target).train.蓄积欲情 = 0;
    }
  }

  era.set(`gotjuel:${target}:100`, 0);
  era.add(`cflag:${target}:667`, era.get(`cflag:${target}:666`) || 0);

  juel_check_main(target);

  if ((era.get('flag:5') || 0) & (1 << 35)) {
    stub_line('AUTO_ABLUP', '自动能力提升');
  }

  if ((era.get(`cflag:${target}:667`) || 0) > 50) {
    era.set(`cflag:${target}:667`, 50);
  }

  return 0;
}

/**
 * @AUTOTRAIN（:11-47）：全角色自动调教遍历
 */
async function autotrain() {
  const keep_target = era_flag.target;
  const keep_assi = era_flag.assi;
  era_flag.player = 0;
  era_flag.assi = -1;

  const characters = era.getAllCharacters();
  for (let i = 0; i < characters.length; i += 1) {
    const target = characters[i];
    era_flag.target = target;

    if ((era.get(`cflag:${target}:666`) || 0) === 0) {
      continue;
    }

    const cloth_str = clothtype_text(target);
    era.print(`【${cloth_str}】`);
    era.print(`${chara_name(target)}的调教结果`);

    await after_autotrain(target);

    if ((era.get('flag:5') || 0) & (1 << 9)) {
      await era.waitAnyKey();
    } else {
      await era.waitAnyKey();
    }
  }

  era_flag.target = keep_target;
  era_flag.assi = keep_assi;
  return 0;
}

/**
 * @COM0_AUTO：爱抚自动调教（COMF0_愛撫.ERB:174-257）
 */
function com0_auto() {
  const target = era_flag.target;
  era.print('≪摸来摸去≫');

  era.add('losebase:0', 1);
  era.add('losebase:1', 5);

  let source0 = 0;
  let source17 = 0;
  let source3 = 0;
  const source4 = 60;
  const source8 = 30;
  const source12 = 100;

  const abl0 = era.get(`abl:${target}:0`) || 0; // C感觉
  if (abl0 === 0) {
    source0 = 20;
    source3 = 25;
  } else if (abl0 === 1) {
    source0 = 100;
    source3 = 50;
  } else if (abl0 === 2) {
    source0 = 500;
    source3 = 80;
  } else if (abl0 === 3) {
    source0 = 1200;
    source3 = 100;
  } else if (abl0 === 4) {
    source0 = 2000;
    source3 = 115;
  } else {
    source0 = 2800;
    source3 = 125;
  }

  const abl1 = era.get(`abl:${target}:1`) || 0; // B感觉
  if (abl1 === 0) {
    source17 = 15;
    source3 += 25;
  } else if (abl1 === 1) {
    source17 = 50;
    source3 += 50;
  } else if (abl1 === 2) {
    source17 = 300;
    source3 += 80;
  } else if (abl1 === 3) {
    source17 = 700;
    source3 += 100;
  } else if (abl1 === 4) {
    source17 = 1100;
    source3 += 115;
  } else {
    source17 = 1600;
    source3 += 125;
  }

  chara(target).train.阴核快感 = source0;
  chara(target).train.乳房快感 = source17;
  chara(target).train.情爱 = source3;
  chara(target).train.性行为 = source4;
  chara(target).train.不洁 = source8;
  chara(target).train.露出 = source12;

  chara(target).train.自动调教 += 1;
  return 1;
}

/**
 * @COM3_AUTO：自慰自动调教（COMF3_自慰.ERB:872-1010）
 */
function com3_auto() {
  const target = era_flag.target;
  era.print('≪自慰≫');

  era.add('losebase:0', 5);
  era.add('losebase:1', 50);
  chara(target).train.逃离 = 400;
  let source0 = 0;
  let source12 = 0;
  let source13 = 0;
  const abl0 = era.get(`abl:${target}:0`) || 0;
  if (abl0 === 0) {
    source0 = 15;
    source12 = 2000;
    source13 = 500;
  } else if (abl0 === 1) {
    source0 = 50;
    source12 = 2300;
    source13 = 800;
  } else if (abl0 === 2) {
    source0 = 300;
    source12 = 2600;
    source13 = 1200;
  } else if (abl0 === 3) {
    source0 = 700;
    source12 = 2900;
    source13 = 1900;
  } else if (abl0 === 4) {
    source0 = 1100;
    source12 = 3200;
    source13 = 2500;
  } else {
    source0 = 1600;
    source12 = 3500;
    source13 = 3000;
  }

  let source17 = 0;
  const abl1 = era.get(`abl:${target}:1`) || 0;
  if (abl1 === 0) source17 = 15;
  else if (abl1 === 1) source17 = 50;
  else if (abl1 === 2) source17 = 300;
  else if (abl1 === 3) source17 = 700;
  else if (abl1 === 4) source17 = 1100;
  else source17 = 1600;

  let source1 = 0;
  let source2 = 0;
  let source4 = 0;

  const abl12 = era.get(`abl:${target}:12`) || 0; // 技巧
  let tech_mult = 1.0;
  if (abl12 === 0) {
    source4 = 100;
    tech_mult = 0.3;
  } else if (abl12 === 1) {
    source4 = 160;
    tech_mult = 0.7;
  } else if (abl12 === 2) {
    source4 = 220;
    tech_mult = 1.0;
  } else if (abl12 === 3) {
    source4 = 280;
    tech_mult = 1.2;
  } else if (abl12 === 4) {
    source4 = 340;
    tech_mult = 1.4;
  } else {
    source4 = 400;
    tech_mult = 1.6;
  }
  source0 = Math.floor(source0 * tech_mult);
  source17 = Math.floor(source17 * tech_mult);
  source1 = Math.floor(source1 * tech_mult);
  source2 = Math.floor(source2 * tech_mult);

  const abl31 = era.get(`abl:${target}:31`) || 0; // 自慰中毒
  let source7 = 0;
  let addict_mult = 1.0;
  let addict_mult_12 = 1.0;
  if (abl31 === 0) {
    source7 = 0;
    addict_mult = 1.0;
    addict_mult_12 = 1.0;
  } else if (abl31 === 1) {
    source7 = 100;
    addict_mult = 1.1;
    addict_mult_12 = 1.1;
  } else if (abl31 === 2) {
    source7 = 300;
    addict_mult = 1.2;
    addict_mult_12 = 1.2;
  } else if (abl31 === 3) {
    source7 = 800;
    addict_mult = 1.3;
    addict_mult_12 = 1.3;
  } else if (abl31 === 4) {
    source7 = 1500;
    addict_mult = 1.5;
    addict_mult_12 = 1.5;
  } else {
    source7 = 2500;
    addict_mult = 1.7;
    addict_mult_12 = 1.5;
  }
  source0 = Math.floor(source0 * addict_mult);
  source17 = Math.floor(source17 * addict_mult);
  source1 = Math.floor(source1 * addict_mult_12);
  source2 = Math.floor(source2 * addict_mult_12);

  if (
    !era.get(`talent:${target}:125`) &&
    (era.get(`talent:${target}:310`) || 0) <= 20
  ) {
    source12 = Math.floor(source12 * 2.0);
  }

  chara(target).train.阴核快感 = source0;
  chara(target).train.私处快感 = source1;
  chara(target).train.肛门快感 = source2;
  chara(target).train.性行为 = source4;
  chara(target).train.成瘾追加 = source7;
  chara(target).train.露出 = source12;
  chara(target).train.屈从 = source13;
  chara(target).train.乳房快感 = source17;

  chara(target).dungeon.自慰经验 += 1;
  era.print('自慰经验＋１');

  chara(target).train.自动调教 += 1;
  return 1;
}

/**
 * @COM13_AUTO：肛门虫自动调教（COMF13_アナルワーム.ERB:384-554）
 */
function com13_auto() {
  const target = era_flag.target;
  if ((era.get(`base:${target}:0`) || 0) < 500) return 0;
  if ((era.get(`base:${target}:1`) || 0) < 300) return 0;

  if (era.get(`tequip:${target}:90`)) {
    era.print('＜肛门触手插入中＞');
  } else {
    era.print('＜肛门虫插入中＞');
  }

  era.add('losebase:0', 10);
  era.add('losebase:1', 30);
  chara(target).train.逃离 = 200;
  let local0 = 0;
  let local1 = 0;
  let local2 = 0;

  const abl3 = era.get(`abl:${target}:3`) || 0; // A感觉
  if (abl3 === 0) {
    local0 = 40;
    local1 = 300;
  } else if (abl3 === 1) {
    local0 = 120;
    local1 = 800;
  } else if (abl3 === 2) {
    local0 = 300;
    local1 = 1400;
  } else if (abl3 === 3) {
    local0 = 500;
    local1 = 1800;
  } else if (abl3 === 4) {
    local0 = 650;
    local1 = 2100;
  } else {
    local0 = 850;
    local1 = 2400;
  }

  const exp1 = era.get(`exp:${target}:1`) || 0; // A经验
  if (exp1 < 1) {
    local0 = Math.floor(local0 * 0.5);
    local2 = 2000;
  } else if (exp1 < 4) {
    local0 = Math.floor(local0 * 1.0);
    local2 = 300;
  } else if (exp1 < 20) {
    local0 = Math.floor(local0 * 1.1);
    local2 = 50;
  } else if (exp1 < 50) {
    local0 = Math.floor(local0 * 1.2);
    local2 = 10;
  } else if (exp1 < 200) {
    local0 = Math.floor(local0 * 1.4);
    local2 = 0;
  } else {
    local0 = Math.floor(local0 * 1.6);
    local2 = 0;
  }

  const palam3 = era.get(`palam:${target}:3`) || 0; // 润滑
  if (palam3 < 100) {
    local0 = Math.floor(local0 * 0.4);
    local2 += 800;
  } else if (palam3 < 500) {
    local0 = Math.floor(local0 * 0.8);
    local2 += 500;
  } else if (palam3 < 3000) {
    local0 = Math.floor(local0 * 1.0);
    local2 += 300;
  } else if (palam3 < 10000) {
    local0 = Math.floor(local0 * 1.4);
    local2 += 120;
  } else {
    local0 = Math.floor(local0 * 1.8);
    local2 += 100;
  }

  const palam5 = era.get(`palam:${target}:5`) || 0; // 欲情
  if (palam5 < 100) local0 = Math.floor(local0 * 0.8);
  else if (palam5 < 500) local0 = Math.floor(local0 * 0.9);
  else if (palam5 < 3000) local0 = Math.floor(local0 * 1.0);
  else if (palam5 < 10000) local0 = Math.floor(local0 * 1.1);
  else local0 = Math.floor(local0 * 1.2);

  const abl10 = era.get(`abl:${target}:10`) || 0; // 顺从
  let source14 = 200;
  if (abl10 === 0) {
    local0 = Math.floor(local0 * 0.8);
    source14 = Math.floor(source14 * 2.0);
  } else if (abl10 === 1) {
    local0 = Math.floor(local0 * 0.9);
    source14 = Math.floor(source14 * 1.5);
  } else if (abl10 === 2) {
    source14 = Math.floor(source14 * 1.0);
  } else if (abl10 === 3) {
    source14 = Math.floor(source14 * 0.8);
  } else if (abl10 === 4) {
    source14 = Math.floor(source14 * 0.6);
  } else {
    source14 = Math.floor(source14 * 0.3);
  }

  if (era.get(`talent:${target}:99`)) local2 = Math.floor(local2 * 0.8); // 魁梧
  if (era.get(`talent:${target}:100`)) local2 = Math.floor(local2 * 2.0); // 娇小体型

  let source6 = local2;
  if (era.get(`talent:${target}:135`)) source6 = Math.floor(source6 * 2.0); // 未成熟

  let source13 = local1;
  if (era.get(`talent:${target}:105`)) {
    // A敏感
    source6 = Math.floor(source6 * 1.5);
    source13 = Math.floor(source13 * 1.5);
    source14 = Math.floor(source14 * 1.5);
  } else if (era.get(`talent:${target}:106`)) {
    // A迟钝
    source6 = Math.floor(source6 * 0.6);
    source13 = Math.floor(source13 * 0.6);
    source14 = Math.floor(source14 * 0.6);
  }

  chara(target).train.肛门快感 += local0;
  chara(target).train.屈从 += source13;
  chara(target).train.疼痛 += source6;
  chara(target).train.逃离 = source14;

  if (era.get(`talent:${target}:0`) && era.get(`talent:${target}:30`)) {
    chara(target).train.屈从 = Math.floor(chara(target).train.屈从 * 0.8);
    chara(target).train.逃离 = Math.floor(chara(target).train.逃离 * 0.5);
  }

  let exp1_add = 0;
  if (abl3 <= 1) exp1_add += 1;
  else if (abl3 <= 4) exp1_add += 2;
  else if (abl3 <= 7) exp1_add += 3;
  else exp1_add += 4;

  chara(target).dungeon.肛门经验 += exp1_add;
  era.print(`肛门经验+${exp1_add}`);

  chara(target).train.自动调教 += 1;
  return 1;
}

/**
 * @COM50_AUTO：润滑液自动调教（COMF50_ローション.ERB:30-47）
 */
function com50_auto() {
  const target = era_flag.target;
  era.print('≪粘液≫');

  era.add('losebase:0', 0);
  era.add('losebase:1', 0);

  chara(target).train.液体追加 = 10000;
  chara(target).train.露出 = 300;

  chara(target).train.自动调教 += 1;
  return 1;
}

/**
 * @COM63_AUTO：磨镜自动调教（COMF63_貝あわせ.ERB:157-274）
 */
function com63_auto() {
  const target = era_flag.target;
  era.print(`${chara_name(target)}和妓女用阴唇相互摩擦着…`);

  era.add('losebase:1', 30);
  era.add('losebase:1', 90);

  let source12 = 250;
  let source13 = 400;
  let source14 = 300;

  const abl10 = era.get(`abl:${target}:10`) || 0; // 顺从
  let source11 = 0;
  if (abl10 === 0) source11 = 200;
  else if (abl10 === 1) source11 = 120;
  else if (abl10 === 2) source11 = 60;
  else if (abl10 === 3) source11 = 20;
  else source11 = 0;

  let source0 = 0;
  let source4 = 0;
  let source5 = 0;
  const abl0 = era.get(`abl:${target}:0`) || 0; // C感觉
  if (abl0 === 0) {
    source0 = 20;
    source4 = 0;
    source5 = 0;
    source13 = 20;
    source12 = Math.floor(source12 * 0.8);
  } else if (abl0 === 1) {
    source0 = 80;
    source4 = 10;
    source5 = 50;
    source13 = 20;
    source12 = Math.floor(source12 * 0.9);
  } else if (abl0 === 2) {
    source0 = 350;
    source4 = 50;
    source5 = 100;
    source13 = 20;
    source12 = Math.floor(source12 * 1.0);
  } else if (abl0 === 3) {
    source0 = 750;
    source4 = 100;
    source5 = 300;
    source13 = 20;
    source12 = Math.floor(source12 * 1.1);
  } else if (abl0 === 4) {
    source0 = 1200;
    source4 = 700;
    source5 = 600;
    source13 = 20;
    source12 = Math.floor(source12 * 1.2);
  } else {
    source0 = 1750;
    source4 = 2000;
    source5 = 1000;
    source13 = 20;
    source12 = Math.floor(source12 * 1.3);
  }

  // 技巧乘算
  const abl12 = era.get(`abl:${target}:12`) || 0;
  if (abl12 >= 0) {
    source4 = Math.floor(source4 * 1.0);
    source5 = Math.floor(source5 * 0.6);
    source13 = Math.floor(source13 * 0.5);
  }

  // 侍奉精神乘算
  const abl16 = era.get(`abl:${target}:16`) || 0;
  if (abl16 === 0) source5 = Math.floor(source5 * 0.5);
  else if (abl16 === 1) source5 = Math.floor(source5 * 1.0);
  else if (abl16 === 2) source5 = Math.floor(source5 * 1.2);
  else if (abl16 === 3) source5 = Math.floor(source5 * 1.4);
  else if (abl16 === 4) source5 = Math.floor(source5 * 1.7);
  else source5 = Math.floor(source5 * 2.0);

  chara(target).train.阴核快感 = source0;
  chara(target).train.性行为 = source4;
  chara(target).train.达成感 = source5;
  chara(target).train.欲情追加 = source11;
  chara(target).train.露出 = source12;
  chara(target).train.屈从 = source13;
  chara(target).train.逃离 = source14;

  chara(target).train.自动调教 += 1;
  return 1;
}

/**
 * @RAND_AUTOTRAIN（DUNGEON_TOWN.ERB:705-710）：自动调教随机表（β）
 * 原作只有 TURNS = RAND:5 等未完工空壳，移植保持原样并返回 0。
 * @returns {number} 0
 */
function rand_autotrain() {
  return 0;
}

module.exports = {
  STUBBED_CALLS,
  after_autotrain,
  autotrain,
  before_autotrain,
  com0_auto,
  com3_auto,
  com13_auto,
  com50_auto,
  com63_auto,
  format_autotrain,
  rand_autotrain,
};
