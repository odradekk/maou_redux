/**
 * @file 设施与设备查看页（issue #348）。
 *
 * 源: target/ERB/處刑相關/INFRASTRUCTURE.ERB  @INFRASTRUCTURE（:2-385）
 */

'use strict';

const era = require('#/era-electron');
const { video_check, video_shelf } = require('#/system/stronghold/sell-video');
const { game } = require('#/facade/game');

// FLAG:83/84 = 肉便器/展品总数；600–612 = 十三类展品计数；
// FLAG:613 = 人类牧场播种者；FLAG:614 bit 0/1 = 隐藏记录/出售孩子。
const NUM_PAGE = 29;
// #DIM NO_PAGE = 0 是函数静态槽，只在首次装载初始化；离开录像架后不重置。
let no_page = 0;

const EXHIBITS = new Map([
  [
    0,
    [
      600,
      '石像',
      [
        '被石化了的是原勇者的美丽肢体，一个个都有独一无二的姿势和装饰。',
        '苦闷、惊愕、恍惚、悲壮，石像上浮现着各种各样的表情，好像在对欣赏的人诉说着什么。',
        '那些话语和传说，已经不会被传达到了吧……',
      ],
    ],
  ],
  [
    1,
    [
      601,
      '标本',
      [
        '被制成标本的是原勇者的美丽肢体，空洞的眼神注视着对面墙壁上的装饰。',
        '苦闷、恍惚、悲壮、达观，标本上浮现着各种各样的表情，好像在对欣赏的人诉说着什么。',
        '不过她们被冻结的心，已经不会再产生任何感情了吧……',
      ],
    ],
  ],
  [
    2,
    [
      602,
      '蜡像',
      [
        '被制成蜡像的是原勇者的美丽肢体，一个个都有独一无二的姿势和装饰。',
        '苦闷、惊愕、恍惚、悲壮，蜡像上浮现着各种各样的表情，看上去好像马上就能活动。',
        '不过她们现在的身体，已经不会再做出什么动作了吧…',
      ],
    ],
  ],
  [
    3,
    [
      603,
      '人体模型人偶',
      [
        '被制成人体模型人偶的是原勇者的美丽肢体，一个个都有独一无二的姿势和装饰。',
        '她们的四肢和头部、上下半身，都可以自由地拆卸，完全没有保留作为人的部分了。',
        '拆下来的零件，乱七八糟地散落一地，经常找不到哪个对应哪个，最后只有使用暴力硬装上去。',
        '在她们身上穿戴着不同仪式用的新服装作为展览，随着信仰堕落神的信徒越来越多，这种展览也变得热闹了。',
        '穿着不知廉耻的暴露乳房及其它身体局部的服装，在大众面前展示身段的她们，神色不动，静静伫立……',
      ],
    ],
  ],
  [
    4,
    [
      604,
      '球型关节人偶',
      [
        '被制成球型关节人偶的是原勇者的美丽肢体，一个个都有独一无二的姿势和装饰。',
        '她们的四肢和头部、半身都可以自由活动，能做出许多活人做不出的匪夷所思的动作。',
        '虽然不能和她们做爱，但为了看她们诱惑的姿势慕名而来的游客，也是大有人在。',
        '无论是弄成什么样的猥琐动作，她们都不为所动，被随意摆布着……',
      ],
    ],
  ],
  [
    5,
    [
      605,
      '金属雕像',
      [
        '被制成金属雕像的是原勇者的美丽肢体，一个个都有独一无二的姿势和装饰。',
        '每天，全部的金属雕像都在规定的时间里进行全身打磨，确保她们能发出美丽的光泽展示于人前。',
        '过分的美丽使得经常都忍不住要玩弄她们的全身，一不小心被玩坏了的，也有这么一部分。',
        '曾经美丽的残缺肢体，无论再怎么过分地玩弄，也不会引起反感，她们只是这么静静伫立着……',
      ],
    ],
  ],
  [
    6,
    [
      606,
      '冰雕',
      [
        '被制成冰雕的是原勇者的美丽肢体，一个个都有独一无二的姿势和装饰。',
        '为了保持她们作为冰雕的身形，这里比其它区域的气温低了不少。',
        '冷得大家尿意都出来了，忍不住把尿撒到冰雕上的人相当不少，不过隔日，这些就会成为冰雕上的新的冰柱，迎宾一样地对着客人。',
        '无论对她们做出多么过分的事，都不会破坏她们的表情，继续把曾经美丽的肢体暴露在大众的眼前……',
      ],
    ],
  ],
  [
    7,
    [
      607,
      '宝石像',
      [
        '被制成宝石像的是原勇者的美丽肢体，一个个都有独一无二的姿势和装饰。',
        '每天，全部的金属雕像都在规定的时间里进行全身打磨，确保她们能发出耀眼的光辉展示于人前。',
        '经常有大量的精液沾在宝石像的身上，不过从来没有肇事者特意会回来擦掉。',
        '宝石像带着如泣如诉的生动表情，大概是被这份美丽所感动了吧……',
      ],
    ],
  ],
  [
    8,
    [
      608,
      '家具',
      [
        '原本是活生生的勇者们，现在被再造成无机的家具展出。',
        '烛台里点亮着蓝色火焰的蜡烛，花瓶中插着魔界特有的花朵。',
        '各式各样的工具和杂物都被放在柜子里，还有一些有用的小玩意。',
        '在这种场合，在桌子和椅子上休息的人也络绎不绝。',
        '以打倒魔王为己任的勇者们，现在作为家具在侍奉着魔界的魔物，可喜可贺，可喜可贺……',
      ],
    ],
  ],
  [
    9,
    [
      609,
      '画像',
      [
        '原本是活生生的勇者们，现在被弄成一幅画在展出着。',
        '通过画布前设置的水晶球，游客们能看到画里面的活动。',
        '在画的世界里，人们能欣赏到她们永远被持续凌辱着的样子。',
        '她们不断地求助着，不过这是无法传达到给看客的。于是凌辱天天持续着……',
      ],
    ],
  ],
  [
    11,
    [
      611,
      '石制喷水像',
      [
        '被石化了的是原勇者的美丽肢体，一个个都有独一无二的羞耻姿势和装饰。',
        '乳房、性器、尿道等地方被换成喷水装置的她们，正从各自的位置喷出有气势的漂亮涌泉。',
        '她们已经没有人类的基本羞耻了，今后也会保持着下流的动作，毫不扭捏地持续喷水吧……',
      ],
    ],
  ],
  [
    12,
    [
      612,
      '金属喷水像',
      [
        '被金属化了的是原勇者的美丽肢体，一个个都有独一无二的羞耻姿势和装饰。',
        '乳房、性器、尿道等地方被换成喷水装置的她们，正从各自的位置喷出有气势的漂亮涌泉。',
        '喷出来的水，把金属像的局部锈蚀了。',
        '但她们毫不在意，保持着下流的动作，持续地喷着水……',
      ],
    ],
  ],
]);

function get(name) {
  return era.get(name) || 0;
}

function print_menu() {
  era.print('去哪个设施呢？');
  era.drawLine();
  era.println();
  era.print('[==人=类=牧=场==]');
  era.println();
  era.print('[51] 看看肉便器的样子');
  era.print('＿＿＿＿＿＿');
  era.print('＼ 博 物 馆 ／');
  era.print('  ￣￣￣￣￣');
  era.print('[50] 看看全部展品的样子');
  era.println();
  for (const [index, [, name]] of EXHIBITS) {
    era.print(`[${String(index).padStart(2)}] 看看${name}的状态`);
  }
  era.println();
  era.print('[99] 看看已拍的影像水晶球');
  era.drawLine();
  era.print('[100] 返回');
}

async function show_exhibit(result) {
  const [slot, name, descriptions] = EXHIBITS.get(result);
  const count = get(`flag:${slot}`);
  if (count === 0) {
    await era.printAndWait(`还没制作过${name}。`);
    return;
  }
  const unit = result === 9 ? '幅' : result === 3 || result === 4 ? '个' : '个';
  era.print(`博物馆内现在有 ${count}${unit}${name}。`);
  for (const description of descriptions) {
    await era.printAndWait(description);
  }
}

function seed_name() {
  return (
    ['怪物', '俘虏的中年', '俘虏的少年', '扶她淫魔'][get('flag:613')] ?? '怪物'
  );
}

async function show_farm() {
  const count = get('flag:83');
  if (count === 0) {
    await era.printAndWait('还没放置过肉便器。');
    return;
  }
  era.print(`地下城内现在有 ${count}台肉便器。`);
  era.print('肉便器们，不分昼夜地被');
  await era.printAndWait(`${seed_name()}们使用着。`);
  era.print('无论是疯了、晕了还是怀孕了，都不能阻止这种狂暴的侵犯。');
  if (get('flag:613') === 1) {
    await era.printAndWait(
      '俘虏的中年的黏稠腥臭的精液让肉便器的改造子宫一瞬怀孕、产生了魔物的孩子……',
    );
  } else if (get('flag:613') === 2) {
    await era.printAndWait(
      '俘虏的少年年轻的浓稠精液让肉便器的改造子宫一瞬怀孕、产生了魔物的孩子……',
    );
  } else if (get('flag:613') === 3) {
    await era.printAndWait(
      '扶她淫魔的媚药精液让肉便器的改造子宫一瞬怀孕、产生了魔物的孩子……',
    );
  }

  for (;;) {
    await era.printAndWait(
      '地下城的便所里，散发着酸臭。充斥着崩坏的呻吟和悲鸣……',
    );
    era.print('各种设定');
    era.print(`[0] 播种者  现在：${seed_name()}`);
    era.print(
      `[1] 人类牧场记录  现在：${get('flag:614') & 1 ? '不显示' : '显示'}`,
    );
    era.print(
      `[2] 卖掉产出的孩子  现在：${get('flag:614') & 2 ? '出售' : '不出售'}`,
    );
    era.print('[999]返回');
    const result = await era.input({ useRule: false });
    if (result === 999) return;
    if (result === 0) {
      era.print('请选择播种者');
      era.print('[0] 怪物');
      era.print('[1] 俘虏的中年');
      era.print('[2] 俘虏的少年');
      era.print('[3] 扶她淫魔');
      let selected = await era.input({ useRule: false });
      if (selected < 1 || selected > 3) selected = 0;
      await era.printAndWait(
        `播种者设为${['怪物', '俘虏的中年', '俘虏的少年', '扶她淫魔'][selected]}了`,
      );
      game.event.人间牧场竿役 = selected;
    } else if (result >= 1 && result <= 2) {
      era.set('flag:614', get('flag:614') ^ (1 << (result - 1)));
    }
  }
}

async function show_video_shelf() {
  const stored_slots = video_check();
  if (stored_slots === 0) {
    await era.printAndWait('还没拍摄过任何影像。');
    return;
  }
  const videos = Math.ceil(stored_slots / 3);
  const max_page = Math.ceil(videos / NUM_PAGE) - 1;
  let list_pos = 0;
  let previous_page = 0;
  let previous_list_pos = 0;
  for (;;) {
    if (no_page === 0) {
      list_pos = 0;
      previous_page = 0;
      previous_list_pos = 0;
    } else if (no_page < previous_page) {
      [list_pos, previous_list_pos] = [previous_list_pos, list_pos];
    } else if (no_page === previous_page) {
      list_pos = previous_list_pos;
    } else {
      previous_list_pos = list_pos;
    }
    const screen_anchor = era.getLineCount();
    era.print(`总共拍摄了${video_check()}部水晶球。`);
    era.drawLine();
    video_shelf(no_page, NUM_PAGE, list_pos);
    const shelf_height = era.getLineCount() - screen_anchor;
    for (let row = shelf_height; row < NUM_PAGE; row += 1) {
      era.println();
    }
    era.drawLine();
    era.print('[1000] - 上一页');
    era.print('[999] - 离  开');
    era.print('[1001] - 下一页');
    const result = await era.input({ useRule: false });
    if (result === 999) return;
    previous_page = no_page;
    if (result === 1000 && no_page > 0) {
      no_page -= 1;
      await era.clear(era.getLineCount() - screen_anchor);
    } else if (result === 1001 && no_page < max_page) {
      no_page += 1;
      await era.clear(era.getLineCount() - screen_anchor);
    }
  }
}

async function infrastructure(selectable_count) {
  if (selectable_count === 0) {
    await era.printAndWait(
      '没有待机中的奴隶，没有人能保护你，并挡住可能出现的勇者。',
    );
    return 0;
  }
  print_menu();
  for (;;) {
    const result = await era.input({ useRule: false });
    if (result < 0) continue;
    if (EXHIBITS.has(result)) await show_exhibit(result);
    else if (result === 50) {
      const count = get('flag:84');
      if (count === 0) await era.printAndWait('还没制作过展品。');
      else {
        era.print(`博物馆内现在有 ${count}个展品。`);
        era.print('原勇者的美丽肢体，现在被残忍地做成各种各样的标本及雕像。');
        era.print('苦闷的表情、震惊的表情、绝望的表情……各种神情一览无遗。');
        await era.printAndWait(
          '现在，任何人都没有办法改变她们这种冻结的神态了。',
        );
      }
    } else if (result === 51) await show_farm();
    else if (result === 99) await show_video_shelf();
    else if (result === 100) return 0;
    else if (result >= selectable_count) continue;
    return 0;
  }
}

module.exports = { infrastructure };
