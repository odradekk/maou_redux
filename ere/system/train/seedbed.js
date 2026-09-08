/**
 * @file 苗床业务（issue #348）。
 *
 * 源: target/ERB/處刑相關/NAEDOKO.ERB
 *     @NAEDOKO（:2-70）/@NAEDOKO_MAN（:72-104）/@NAEDOKO_NOT_V（:106-130）
 */

'use strict';

const era = require('#/era-electron');
const { chara } = require('#/facade/chara');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');
const {
  conception_check_syoku_to_t,
  in_vagina_syoku_to_t,
} = require('#/event/event-pregnancy');

// TALENT:0/1/122/209/273 = 处女/童贞/男人/苗床/私处封印；CFLAG:1 =
// 当前状态（7 为苗床），15 = 初体验记录，40 bit 6 与 42 = 狂王特例条件；
// FLAG:37 = 狂王特例开关；EXP:3 = 射精经验，JUEL:0 = 阴茎点数。
function default_rand(n) {
  return Math.floor(Math.random() * n);
}

function get(name) {
  return era.get(name) || 0;
}

async function naedoko_man(cid) {
  era.drawLine();
  await era.printAndWait(
    `${chara_callname(cid)}被成群的梦魔包围，榨取着精液。`,
  );
  await era.printAndWait('梦魔们面带调笑，排着队翘起屁股，');
  await era.printAndWait(
    '直到让全员怀孕为止，使用精力增强的魔法让他一直勃起着。',
  );
  if (get(`talent:${cid}:1`) === 1) {
    chara(cid).train.童贞 = 0;
    era.print('【童贞丧失】');
  }
  const level = chara(0).chara.等级;
  era.print(`阴茎点数+${level * 10}`);
  era.add(`juel:${cid}:0`, level * 10);
  era.print(`射精经验+${level}`);
  era.add(`exp:${cid}:3`, level);
  era.print(`绝顶经验+${level}`);
  chara(cid).dungeon.绝顶经验 += level;
  await era.printAndWait(`经验值+${level}`);
  chara(cid).dungeon.战斗经验 += level;
  era.drawLine();
  return 0;
}

async function naedoko_not_v(cid) {
  era.drawLine();
  await era.printAndWait(`${chara_callname(cid)}被魔兽在菊穴内产了卵。`);
  await era.printAndWait('卵在肠内茁壮成长，伴随着激烈的快感被排出来了…………');
  const level = chara(0).chara.等级;
  era.print(`肛门点数+${level * 10}`);
  era.add(`juel:${cid}:2`, level * 10);
  era.print(`肛门经验+${level}`);
  chara(cid).dungeon.肛门经验 += level;
  era.print('绝顶经验+1');
  chara(cid).dungeon.绝顶经验 += 1;
  await era.printAndWait(`经验值+${level * 5}`);
  chara(cid).dungeon.战斗经验 += level * 5;
  era.drawLine();
  return 0;
}

async function naedoko(cid, rand_n = default_rand) {
  // TALENT:209 = 苗床；CFLAG:1 = 当前状态（7 为苗床区域）。
  if (get(`talent:${cid}:209`) === 1) {
    chara(cid).invasion.状态 = 7;
  }
  if (chara(cid).invasion.状态 !== 7) return 0;

  // TALENT:122 = 男人。原作 RAND:2 非零走肛门业务，零走种马业务。
  if (get(`talent:${cid}:122`)) {
    return rand_n(2) ? naedoko_not_v(cid) : naedoko_man(cid);
  }
  if (
    get(`talent:${cid}:273`) ||
    (get(`cflag:${cid}:42`) === 79 &&
      (get(`cflag:${cid}:40`) & 64) !== 0 &&
      get('flag:37'))
  ) {
    return naedoko_not_v(cid);
  }

  era.drawLine();
  await era.printAndWait(`${chara_callname(cid)}的肉壁，被带孔的触手填满了`);
  await era.printAndWait('触手不断地把养分、媚药及精液灌溉进去');
  if (get(`talent:${cid}:0`) === 1) {
    chara(cid).chara.处女 = 0;
    era.print('【处女丧失】');
    if (get(`cflag:${cid}:15`) === 0) {
      chara(cid).train.初体验对象 = 102;
    }
  }

  const level = chara(0).chara.等级;
  era.print(`私处点数+${level * 10}`);
  era.print(`私处经验+${level}`);
  era.add(`juel:${cid}:1`, level * 10);
  chara(cid).dungeon.私处经验 += level;
  era.print(`肛门点数+${level * 10}`);
  era.print(`肛门经验+${level}`);
  era.add(`juel:${cid}:2`, level * 10);
  chara(cid).dungeon.肛门经验 += level;
  era.print(`精液经验+${level}`);
  era.print(`绝顶经验+${level}`);
  chara(cid).dungeon.精液经验 += level;
  chara(cid).dungeon.绝顶经验 += level;
  await era.printAndWait(`经验值+${level}`);
  chara(cid).dungeon.战斗经验 += level;
  era.drawLine();

  era_flag.target = cid;
  chara(cid).dungeon.怪物膣内射精 += rand_n(40);
  in_vagina_syoku_to_t(rand_n);
  conception_check_syoku_to_t(rand_n);
  return 0;
}

module.exports = {
  run_seedbed: naedoko,
  seedbed_for_man: naedoko_man,
  seedbed_without_vagina: naedoko_not_v,
};
