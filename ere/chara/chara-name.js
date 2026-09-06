/**
 * @file 随机命名入口与姓名缓存重建（issue #332）。
 *
 * 源: target/ERB/キャラ関数/CHARA_NAME.ERB
 *       @CHARA_NAME_RANDOM_DEFINE（:14-146）、@CN_REBUILD（:225-230）
 */

const era = require('#/era-electron');
const { stub_line } = require('#/utils/stub-line');

const WEST_NAME_COUNT = 585;
const JAPANESE_NAME_COUNT = 450;
const WEST_MALE_NAME_COUNT = 453;
const JAPANESE_MALE_NAME_COUNT = 1059;
const CHINESE_NAME_COUNT = 789;

const STUBBED_CALLS = ['CHARA_NAME_DEFINE', 'CN_REBUILD'];
const default_rand = (n) => Math.floor(Math.random() * n);

/**
 * @CHARA_NAME_DEFINE 的范围外存根。
 * @param {number} cid 角色 ID
 * @param {number} nid 固定名 ID
 */
function chara_name_define(cid, nid = -1) {
  stub_line('CHARA_NAME_DEFINE', `角色 ${cid}，NID ${nid}`, '随开局设置票');
}

/**
 * @CHARA_NAME_RANDOM_DEFINE：按职业、种族与性别选择名字表并避免重复。
 * 末行是 JUMP CHARA_NAME_DEFINE，故本函数不产生可供调用点继续消费的结果。
 *
 * @param {number} cid 角色 ID
 * @param {number} [type=-1] 0=和名、1=洋名、2=组合名、-1=自动
 * @param {(n: number) => number} [rand] RAND:N 随机源
 */
function chara_name_random_define(cid, type = -1, rand = default_rand) {
  let name_type = type;
  const talent = (index) => era.get(`talent:${cid}:${index}`) || 0;

  // :44-52 职业偏向：骑士偏洋名，巫女/忍者偏和名。
  if (name_type === -1) {
    if (talent(205) && rand(10) !== 0) {
      name_type = 1;
    } else if ((talent(206) || talent(207)) && rand(10) !== 0) {
      name_type = 0;
    }
  }

  // :56-88 种族偏向；人类、魔族及未知种族保持未指定。
  if (name_type === -1) {
    const race = era.get(`cflag:${cid}:314`) || 0; // CFLAG:314 种族
    if ([1, 3, 4, 5, 6, 7, 8, 10, 11].includes(race)) {
      name_type = 1;
    } else if (race === 2) {
      name_type = 0;
    }
  }

  if (name_type === 0) {
    name_type = rand(5) % 2; // :95-96 和名有五分之三保持和名
  }

  let nid;
  // 原作以 GOTO SPAN_NAME_NUM 重掷；已加入角色为空时一次结束。
  for (;;) {
    const male = talent(122) !== 0; // TALENT:122 男人
    if (name_type === 0) {
      nid = rand(JAPANESE_NAME_COUNT) + 200;
      if (male) {
        nid = rand(JAPANESE_MALE_NAME_COUNT) + 3000;
      }
    } else if (name_type === 2) {
      nid = rand(CHINESE_NAME_COUNT) + 4500;
    } else {
      name_type = 1;
      nid = rand(WEST_NAME_COUNT);
      if (nid >= 200) {
        nid += 1000;
      }
      if (male) {
        nid = rand(WEST_MALE_NAME_COUNT) + 2000;
      }
    }

    era.set(`cflag:${cid}:6`, -1); // :122 重复检查时排除自身
    const duplicate = era
      .getAddedCharacters()
      .some(
        (other) =>
          other !== 0 &&
          other !== cid &&
          (era.get(`cflag:${other}:6`) || 0) === nid,
      );
    if (!duplicate) {
      break;
    }

    const count = era.getAddedCharacters().length; // CHARANUM 的 ere 等价物
    if (name_type === 0 && count * 0.4 > JAPANESE_NAME_COUNT) {
      name_type = 1;
    } else if (name_type === 1 && count > WEST_NAME_COUNT * 0.8) {
      name_type = 0;
    } else if (
      name_type === 0 &&
      male &&
      count * 0.4 > JAPANESE_MALE_NAME_COUNT
    ) {
      name_type = 1;
    } else if (name_type === 1 && male && count > WEST_MALE_NAME_COUNT * 0.8) {
      name_type = 0;
    } else {
      name_type = 2;
    }
  }

  // :141 JUMP：只把执行流交给目标，不向原调用点返回 RESULT。
  chara_name_define(cid, nid);
}

/** @CN_REBUILD 的范围外存根。 */
function cn_rebuild() {
  stub_line('CN_REBUILD', '名字重建', '随角色名票');
}

module.exports = {
  STUBBED_CALLS,
  chara_name_define,
  chara_name_random_define,
  cn_rebuild,
};
