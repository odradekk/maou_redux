/**
 * @file 污渍一览（stain_info）。
 *
 * 主人／调教对象／助手三方各六行（嘴巴/双手/阴茎/私处/肛门/乳房），每行按
 * STAIN 的位域标出沾了什么。
 *
 * **两处换手是真的交换**：先把「当前调教对象」与 EVENTTRAIN 事件
 * 记录的 TARGET:1（flag:10012）对调、助手与 ASSI:1（flag:10013）
 * 对调；三段部位循环里第二段读的 `TALENT:121`、
 * `STAIN:TARGET:COUNT` 都是换过之后的 TARGET。尾部再换回来，
 * 不留痕迹——所以本函数是**对称的**，进出时 era_flag 的四个槽不变。
 *
 * 跳过规则（三段逐字相同，只把 MASTER 换成对应角色）：阴茎位（2）在既非
 * 扶她也非男人时不显示；私处位（3）与乳房位（5）在男人（TALENT:122）时
 * 不显示。助手段另有整段检查：ASSI < 0 时整段不打印。
 *
 * 收尾等键：`await era.waitAnyKey()`。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname, chara_name } = require('#/utils/callname-utils');

/** 六个部位的行首（六个分支，三段逐字相同） */
const STAIN_PARTS = [
  '的嘴巴：',
  '的双手：',
  '的阴茎：',
  '的私处：',
  '的肛门：',
  '的乳房：',
];

/** 污渍位与标记（六条位测试，顺序即输出顺序） */
const STAIN_BITS = [
  { bit: 1, text: '<爱液>' },
  { bit: 2, text: '<前液>' },
  { bit: 4, text: '<精液>' },
  { bit: 8, text: '<肠液>' },
  { bit: 16, text: '<乳汁>' },
  { bit: 32, text: '<尿液>' },
];

/** 位置码（裸数字，逐个注释） */
const PART_PENIS = 2;
const PART_VAGINA = 3;
const PART_BREAST = 5;

/** 素质编号（yml/Talent.yml） */
const TALENT_FUTA = 121; // 扶她
const TALENT_MAN = 122; // 男人

/**
 * 一方角色的六行污渍（三方各一段，三段同形）。
 *
 * @param {string} head 角色名（姓名或存档名）
 * @param {number} cid 该方角色 ID
 */
function print_stain_block(head, cid) {
  const t = (index) => era.get(`talent:${cid}:${index}`) || 0;
  for (let count = 0; count < STAIN_PARTS.length; count += 1) {
    if (count === PART_PENIS && t(TALENT_FUTA) === 0 && t(TALENT_MAN) === 0) {
      continue;
    }
    if (count === PART_VAGINA && t(TALENT_MAN) !== 0) continue;
    if (count === PART_BREAST && t(TALENT_MAN) !== 0) continue;
    const fragments = [{ content: head + STAIN_PARTS[count] }];
    const value = era.get(`stain:${cid}:${count}`) || 0;
    for (const { bit, text } of STAIN_BITS) {
      if ((value & bit) !== 0) fragments.push({ content: text });
    }
    era.print(fragments);
  }
}

/**
 * stain_info：三方污渍一览。
 * @returns {Promise<number>} 恒 1
 */
async function stain_info() {
  // 换手（TARGET↔TARGET:1、ASSI↔ASSI:1）
  const swap = () => {
    const target = era_flag.target;
    era_flag.target = era_flag.target_record;
    era_flag.target_record = target;
    const assi = era_flag.assi;
    era_flag.assi = era_flag.assi_record;
    era_flag.assi_record = assi;
  };
  swap();

  // 主人（MASTER 恒 0，不受换手影响）
  print_stain_block(chara_name(0), 0);
  // 调教对象（换手后的 TARGET）
  print_stain_block(chara_callname(era_flag.target), era_flag.target);
  // 助手（ASSI < 0 时整段跳过）
  if (era_flag.assi >= 0) {
    print_stain_block(chara_callname(era_flag.assi), era_flag.assi);
  }

  swap();
  await era.waitAnyKey();
  return 1;
}

module.exports = { STAIN_BITS, STAIN_PARTS, print_stain_block, stain_info };
