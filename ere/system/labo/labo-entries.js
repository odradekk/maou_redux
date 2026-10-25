/**
 * @file 秘密实验室的条目表：每个改造条目的定价、提示文案、选人检查与成交
 * 写入（#888）。
 *
 * 一个条目就是一份数据，由页面的 `run_modify` 驱动：页面负责画选人屏、
 * 收确认键、把 `apply` 返回的播报行打出去；这里负责「值多少钱、谁不能改、
 * 改成什么」。**本文件不调用输出与输入 API**，文案一律经返回值交回。
 *
 * 形状相同的条目落成表（价格、提示串、检查、应用），形状有额外菜单/输入/
 * 加价的（BUSTUP/BUSTDOWN/FUTANARI/HAIR_COLOR/SKIN_COLOR/BLOCK_FEELING/
 * DEMON_REBIRTH/ST_UP_LABO/SUMMON_SLAVE/SET_FREE_TRAIN/TATOO/AMNESIA/
 * RESULECTION/TRANS_SPECIALTALENT/GIVEN_HUMAN_LIFE/BOUGT_TENTACLES/
 * 肉棒改造）在页面与 labo-calc 里各自单写。
 */

'use strict';

const { n_breast_grow, n_breast_reverse } = require('#/chara/chara-pregnancy');
const { chara } = require('#/facade/chara');
const {
  cflag,
  exp_of,
  expname,
  regenerated_bust,
  savestr,
  settings_bitmap,
  talent,
  talentname,
} = require('#/system/labo/labo-calc');
const { MASTER } = require('#/utils/master');

/** modify_bonyu：母乳体质化。 */
const MODIFY_BONYU_ITEM = {
  price: 50000,
  poor: '有钱的孩子才有奶喝',
  intro: ['活化改在对象的乳腺，让她分泌母乳。', '要将谁母乳化？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 122)) {
      return `【${talentname(122)}】不能改造母乳体质。`;
    }
    if (talent(cid, 109) || talent(cid, 116)) {
      return '死心吧，这么小的胸，要挤奶也无从下手。';
    }
    if (talent(cid, 130)) {
      return `${savestr(cid)}已经是母乳体质了。`;
    }
    return null;
  },
  confirm: (cid) => [`将${savestr(cid)}母乳体质化吗？`],
  apply: (cid) => {
    chara(cid).chara.母乳体质 = 1;
    return [`《${savestr(cid)}的母乳，现在随时为你待命了》`];
  },
  after: (cid, rand) => n_breast_grow(cid, rand), // CALL N_BREAST_GROW, T
};

/** modify_futanari_erase：去扶她化。 */
const MODIFY_FUTANARI_ERASE_ITEM = {
  price: 10000,
  poor: '钱不够，快快去挣钱',
  intro: ['扶她消去', '要消去谁的扶她呢？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 122)) {
      return '本作暂不提供阉割功能！';
    }
    if (talent(cid, 121) === 0) {
      return '没有可消去的阴茎';
    }
    return null;
  },
  confirm: (cid) => [`将${savestr(cid)}的阴茎消去么？`],
  apply: (cid) => {
    chara(cid).chara.扶她 = 0;
    return [`《${savestr(cid)}的【${talentname(121)}】消去了》`];
  },
};

/** modify_animal：赋予动物耳朵。 */
const MODIFY_ANIMAL_ITEM = {
  price: 2000,
  poor: '钱不够',
  intro: [
    '将用动物的遗传因子覆盖改造对象的一部分遗传因子。',
    '赋予谁动物耳朵呢？',
  ],
  master: true,
  guard: (cid) =>
    talent(cid, 124) ? `${savestr(cid)}已经有动物耳朵了。` : null,
  confirm: (cid) => [`赋予${savestr(cid)}动物耳朵吗？`],
  apply: (cid) => {
    chara(cid).chara.动物耳朵 = 1;
    if (talent(cid, 314) === 2) {
      // 人狼（种族 2）的场合换文案
      return [`《${savestr(cid)}取得人狼的象征【${talentname(124)}】了！》`];
    }
    return [`《${savestr(cid)}长出【${talentname(124)}】了》`];
  },
};

/** modify_animal_erase：去除动物耳朵。 */
const MODIFY_ANIMAL_ERASE_ITEM = {
  price: 1000,
  poor: '钱不够',
  intro: ['消去动物耳朵', '消去谁的动物耳朵？'],
  master: true,
  guard: (cid) => (talent(cid, 124) === 0 ? '没有动物耳朵给你消去' : null),
  confirm: (cid) => [`要消去${savestr(cid)}的动物耳朵吗？`],
  apply: (cid) => {
    chara(cid).chara.动物耳朵 = 0;
    if (talent(cid, 314) === 2) {
      return [`《${savestr(cid)}失去了人狼的象征【${talentname(124)}】了……》`];
    }
    return [`《${savestr(cid)}的【${talentname(124)}】消去了》`];
  },
};

/** modify_removehair：永久脱毛（白虎）。 */
const MODIFY_REMOVEHAIR_ITEM = {
  price: 5000,
  poor: '钱不够',
  intro: ['阴毛长了还分叉？魔王帮你一劳永逸！', '帮谁永久脱毛呢？？'],
  master: true,
  guard: (cid) => (talent(cid, 125) ? `${savestr(cid)}本来就是白虎。` : null),
  confirm: (cid) => [`帮${savestr(cid)}永久脱毛吗？`],
  apply: (cid) => {
    chara(cid).stronghold.白虎 = 1;
    chara(cid).chara.阴毛状态 = 1;
    chara(cid).chara.阴毛生长极限 = 1;
    return [`《${savestr(cid)}获得【${talentname(125)}】了》`];
  },
};

/** modify_deimmaturity：消去未熟。 */
const MODIFY_DEIMMATURITY_ITEM = {
  price: 10000,
  poor: '钱不够',
  intro: ['把改造对象的性器发育，可以进行正常性行为。', '要消去谁的未熟呢？'],
  master: true,
  guard: (cid) =>
    talent(cid, 135) === 0 ? `${savestr(cid)}不是未熟的人。` : null,
  confirm: (cid) => [`消去${savestr(cid)}的未熟么？`],
  apply: (cid) => {
    chara(cid).train.未熟 = 0;
    return [
      `《${savestr(cid)}的【${talentname(135)}】消去了》`,
      `《${savestr(cid)}的身体发育了》`,
    ];
  },
  // 除去未熟后性征成长（男性/扶她降一档阴茎状态；非男性重算胸围）
  after: (cid, rand) => {
    if (cid === MASTER) {
      return; // IF T != 0
    }
    if (talent(cid, 122) || talent(cid, 121)) {
      if (talent(cid, 318) > 1) {
        chara(cid).chara.阴茎的状态 = talent(cid, 318) - rand(2);
      }
      // 「念のため」的下限钳制
      if (talent(cid, 318) < 0) {
        chara(cid).chara.阴茎的状态 = 0;
      }
    }
    if (talent(cid, 122) === 0) {
      regenerated_bust(cid, rand);
    }
  },
};

/** modify_bonyu_erase：消去母乳体质。 */
const MODIFY_BONYU_ERASE_ITEM = {
  price: 10000,
  poor: '钱不够',
  intro: ['乳腺的退化改造。', '要消去谁的母乳体质呢？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 130) === 0) {
      return '没有母乳体质';
    }
    if (talent(cid, 153)) {
      return '孕妇无法消去母乳体质';
    }
    if (talent(cid, 154)) {
      return '育儿中的女人无法消去母乳体质';
    }
    return null;
  },
  confirm: (cid) => [`消去${savestr(cid)}的母乳体质么？`],
  apply: (cid) => {
    chara(cid).chara.母乳体质 = 0;
    return [`《${savestr(cid)}不再分泌母乳了》`];
  },
  after: (cid, rand) => n_breast_reverse(cid, rand), // CALL N_BREAST_REVERSE, T
};

/** modify_omorashi_erase：消除漏尿癖。 */
const MODIFY_OMORASHI_ERASE_ITEM = {
  price: 10000,
  poor: '钱不够',
  intro: ['治疗漏尿的问题', '消除谁的漏尿癖？'],
  master: true,
  guard: (cid) => (talent(cid, 57) === 0 ? '没有漏尿癖' : null),
  confirm: (cid) => [`消去${savestr(cid)}的漏尿癖吗？`],
  apply: (cid) => {
    chara(cid).event.漏尿癖 = 0;
    chara(cid).system.放尿经验 = 0;
    return [`《${savestr(cid)}的漏尿癖被治好了》`];
  },
};

/** shojo_saisei：处女膜再生术。 */
const SHOJO_SAISEI_ITEM = {
  price: 100000,
  poor: '钱不够',
  intro: ['生命没有第二次，但处女膜可以。', '再生谁的处女膜？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 122)) {
      return '怎么看都是不可能的了，真的谢谢了。'; // PRINTW
    }
    if (talent(cid, 0)) {
      return `${savestr(cid)}本来就是处女。`; // PRINTFORM：换屏规则下改为提示后等键（ADR-0009）
    }
    return null;
  },
  confirm: (cid) => [`再生${savestr(cid)}的处女膜吗？`],
  apply: (cid) => {
    chara(cid).chara.处女 = 1;
    // CFLAG:T:71 += 1
    chara(cid).stronghold.处女膜已再生 = chara(cid).stronghold.处女膜已再生 + 1;
    return [`《${savestr(cid)}获得【${talentname(0)}】》`];
  },
};

/** shojo_seal：施加私处封印。 */
const SHOJO_SEAL_ITEM = {
  price: 10000,
  poor: '钱不够',
  intro: ['封印对象的性器。', '要封印谁的性器呢？'],
  master: true,
  guard: (cid) =>
    talent(cid, 273) ? `${savestr(cid)}的性器已经被封印了。` : null, // PRINTFORM
  confirm: (cid) => [`封印${savestr(cid)}的性器吗？`],
  apply: (cid) => {
    chara(cid).chara.私处封印 = 1;
    return [`《${savestr(cid)}获得【${talentname(273)}】》`];
  },
};

/** shojo_seal_off：解除私处封印。 */
const SHOJO_SEAL_OFF_ITEM = {
  price: 10000,
  poor: '穷鬼玩啥处女啊！',
  intro: ['解除对象的性器封印', '要解除谁的封印呢？'],
  master: true,
  guard: (cid) =>
    talent(cid, 273) === 0 ? `${savestr(cid)}本来就没有被封印。` : null, // PRINTFORM
  confirm: (cid) => [`解除${savestr(cid)}的封印吗？`],
  apply: (cid) => {
    chara(cid).chara.私处封印 = 0;
    return [`《${savestr(cid)}的【${talentname(273)}】失去了》`];
  },
};

/** trans_sex：变性。 */
const TRANS_SEX_ITEM = {
  price: 200000,
  poor: '钱不够',
  intro: [
    '更改对象的性别。',
    '一但换了，就不能再换回原来的了。除非是魔王。',
    '要更换谁的性别？',
  ],
  master: true,
  guard: (cid) => {
    if (cflag(cid, 70) && cid !== MASTER) {
      return `${savestr(cid)}已经被性转过了。`;
    }
    return null;
  },
  confirm: (cid) => [`更改${savestr(cid)}的性别吗？`],
  apply: (cid) => {
    const lines = [];
    if (talent(cid, 122)) {
      // 男人ならそれを外す
      lines.push(`《${savestr(cid)}的【${talentname(122)}】被消去了》`);
      chara(cid).chara.男人 = 0;
      chara(cid).chara.处女 = 1;
      chara(cid).train.童贞 = 0;
    } else {
      // 男人でなければ男人をつける（扶她先消去）
      if (talent(cid, 121)) {
        lines.push(`《${savestr(cid)}的【${talentname(121)}】被消去了》`);
        chara(cid).chara.扶她 = 0;
      }
      lines.push(`《${savestr(cid)}获得【${talentname(122)}】了》`);
      chara(cid).chara.男人 = 1;
      chara(cid).chara.处女 = 0;
      chara(cid).train.童贞 = 1;
    }
    lines.push(`${expname(50)}＋1`); // PRINTFORMW %EXPNAME:50%＋{Z}（Z = 1）
    chara(cid).dungeon.异常经验 = exp_of(cid, 50) + 1; // EXP:T:50 += Z
    chara(cid).stronghold.已性转 = 1; // CFLAG:T:70 = 1
    return lines;
  },
};

/** horn：赋予犄角。 */
const HORN_ITEM = {
  price: 20000,
  poor: '角可是很贵的',
  intro: ['让奴隶的头上长出犄角', '要让谁长出犄角呢？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 264) === 1) {
      return `${savestr(cid)}已经长着犄角了。`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`让${savestr(cid)}长出犄角吗？`],
  apply: (cid) => {
    chara(cid).chara.角 = 1; // TALENT:T:264 = 1
    return [`《${savestr(cid)}长出了犄角》`];
  },
};

/** 四改造的「已经有了」措辞（名字之后的部分） */
const EVIL_ALREADY = {
  244: '的肌肤已经是蓝色的了。',
  245: '已经长着恶魔的翅膀了。',
  246: '已经长着恶魔的尾巴了。',
  247: '已经有恶魔的眼睛了。',
};

/** 恶魔四改造的共同检查 */
function evil_body_guard(index) {
  return (cid) => {
    if (talent(cid, index) === 1) {
      return `${savestr(cid)}${EVIL_ALREADY[index]}`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  };
}

/** blueskin：恶魔的蓝色肌肤。 */
const BLUESKIN_ITEM = {
  price: 20000,
  poor: '钱不够',
  intro: ['改造成为恶魔的蓝色肌肤', '赋予谁蓝色肌肤？'],
  master: true,
  guard: evil_body_guard(244),
  confirm: (cid) => [`赋予${savestr(cid)}恶魔肌肤吗？`],
  apply: (cid) => {
    chara(cid).chara.恶魔肌肤 = 1; // TALENT:T:244 = 1
    chara(cid).chara.褐色肌肤 = 0;
    chara(cid).chara.白皙 = 0;
    if (talent(cid, 253) === 1 || talent(cid, 255) === 1) {
      // 褐色肌肤或白皙被恶魔肌肤取代时的措辞
      const from = talent(cid, 253) === 1 ? '褐色肌肤' : '白皙';
      return [`《${savestr(cid)}的${from}变成恶魔肌肤了》`];
    }
    return [`《${savestr(cid)}获得恶魔般的肌肤了》`];
  },
};

/** evilwing：恶魔的翅膀。 */
const EVILWING_ITEM = {
  price: 20000,
  poor: '钱不够',
  intro: ['给对象赋予恶魔的翅膀。', '给谁赋予恶魔的翅膀呢？'],
  master: true,
  guard: evil_body_guard(245),
  confirm: (cid) => [`赋予${savestr(cid)}恶魔的翅膀吗？`],
  apply: (cid) => {
    chara(cid).chara.恶魔翅膀 = 1;
    return [`《${savestr(cid)}长出了恶魔的翅膀》`];
  },
};

/** eviltail：恶魔的尾巴。 */
const EVILTAIL_ITEM = {
  price: 20000,
  poor: '钱不够',
  intro: ['赋予对象恶魔的尾巴。', '要赋予谁恶魔的尾巴呢？'],
  master: true,
  guard: evil_body_guard(246),
  confirm: (cid) => [`赋予${savestr(cid)}恶魔的尾巴？`],
  apply: (cid) => {
    chara(cid).chara.恶魔尾巴 = 1;
    return [`《${savestr(cid)}长出恶魔的尾巴了》`];
  },
};

/** evilsight：恶魔的眼睛。 */
const EVILSIGHT_ITEM = {
  price: 20000,
  poor: '钱不够',
  intro: ['赋予对象恶魔的眼睛。', '要赋予谁恶魔的眼睛呢？'],
  master: true,
  guard: evil_body_guard(247),
  confirm: (cid) => [`赋予${savestr(cid)}恶魔的眼睛？`],
  apply: (cid) => {
    chara(cid).chara.恶魔眼睛 = 1;
    return [`《${savestr(cid)}获得了恶魔的眼睛》`];
  },
};

/** soulbound：魂缚的诅咒。 */
const SOULBOUND_ITEM = {
  price: 10000,
  poor: '金钱不足',
  intro: [
    '魂缚实施之后，目标在心智上将不会再有半点动摇，',
    '各种刻印和好感度的增减都会被锁定，',
    '要对谁施展？',
  ],
  mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
  master: false, // RESULT < 1
  guard: (cid) => {
    if (chara(cid).stronghold.魂缚) {
      return `${savestr(cid)}的灵魂已经被束缚过了`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`${savestr(cid)}施展魂缚吗？`],
  apply: (cid) => {
    chara(cid).stronghold.魂缚 = 1; // TALENT:T:魂缚 = 1
    return [`《${savestr(cid)}的灵魂》`];
  },
};

/** soulbound_erase：魂缚的解咒。 */
const SOULBOUND_ERASE_ITEM = {
  price: 50000,
  poor: '金钱不足',
  intro: ['将目标从魂缚的状态解除', '要选谁做为目标呢？'],
  mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
  master: false, // RESULT < 1
  guard: (cid) => {
    if (!chara(cid).stronghold.魂缚) {
      return `${savestr(cid)}的灵魂没有被束缚`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`${savestr(cid)}的魂缚状态解除吗？`],
  apply: (cid) => {
    chara(cid).stronghold.魂缚 = 0;
    return [`《${savestr(cid)}的魂缚状态解除了》`];
  },
};

/** encharmed_erase：狂王俘虏的消去。 */
const ENCHARMED_ERASE_ITEM = {
  price: 50000,
  poor: '金钱不足',
  intro: ['把目标曾被狂王俘虏的印记消去', '要消去谁的？'],
  master: true, // SIF RESULT == 0 → MASTER
  guard: (cid) => {
    if (!talent(cid, 280)) {
      return `你确定${savestr(cid)}曾被狂王俘虏过？`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`将${savestr(cid)}被狂王俘虏的印记消去？`],
  apply: (cid) => {
    chara(cid).stronghold.狂王俘虏 = 0;
    return [`《${savestr(cid)}的【${talentname(280)}】被消去了》`];
  },
};

/** magicresist：赋予魔法耐性。 */
const MAGICRESIST_ITEM = {
  price: 50000,
  poor: '钱不够',
  intro: ['魔法耐性可以抵挡敌方的魔法攻击。', '赋予谁魔法耐性呢？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 257) === 1) {
      return `${savestr(cid)}已经拥有魔法耐性了。`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`赋予${savestr(cid)}魔法耐性吗？`],
  apply: (cid) => {
    chara(cid).chara.魔法耐性 = 1;
    return [`《${savestr(cid)}获得了魔法耐性》`];
  },
};

/** extra_preg_mark：赋予异常妊娠体质。 */
const EXTRA_PREG_MARK_ITEM = {
  price: 20000,
  poor: '钱不够',
  intro: ['赋予异常妊娠体质', '要赋予给谁？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 340) === 1) {
      return `${savestr(cid)}已经拥有了异常妊娠体质。`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`赋予${savestr(cid)}异常妊娠体质吗？`],
  apply: (cid) => {
    chara(cid).stronghold.异常妊娠体质 = 1; // TALENT:T:340 = 1
    return [`《${savestr(cid)}获得了异常妊娠体质》`];
  },
};

/** extra_preg_erase：消除异常妊娠体质。 */
const EXTRA_PREG_ERASE_ITEM = {
  price: 35000,
  poor: '钱不够',
  intro: ['消除异常妊娠体质', '要给谁消除？'],
  master: true,
  guard: (cid) => {
    if (talent(cid, 340) === 0) {
      return `${savestr(cid)}并不是异常妊娠体质。`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`要消除${savestr(cid)}异常妊娠体质吗？`],
  apply: (cid) => {
    chara(cid).stronghold.异常妊娠体质 = 0;
    return [`《${savestr(cid)}的异常妊娠体质消除了》`];
  },
};

/** anti_aging：减龄魔药（10 岁一档）。 */
const ANTI_AGING_ITEM = {
  price: 20000,
  poor: '没钱就别想这些事情',
  intro: ['服用减龄的魔药让肉体恢复青春', '要让谁使用呢？'],
  master: true,
  guard: (cid) => {
    // `CFLAG:RESULT:451 < 18 || GETBIT(FLAG:5,13) && CFLAG:RESULT:452 < 18`
    // 按旧引擎「&& 与 || 同优先级、左结合」的语义读作
    // `(年龄 < 18 || 长命种) && 种族年龄 < 18`——种族年龄不低时整支不命中，
    // 年龄 < 18 也照样放行（#517）。
    const long_lived = ((settings_bitmap() >> 13) & 1) !== 0;
    if ((cflag(cid, 451) < 18 || long_lived) && cflag(cid, 452) < 18) {
      return `${savestr(cid)}无法再变得更年轻了`;
    }
    if (cflag(cid, 1) === 2) {
      return `${savestr(cid)}还不在你的统治之下。`;
    }
    return null;
  },
  confirm: (cid) => [`要让${savestr(cid)}服用减龄魔药吗？`],
  apply: (cid) => {
    chara(cid).chara.年龄 = cflag(cid, 451) - 10; // CFLAG:T:451 -= 10
    chara(cid).chara.种族年龄 = cflag(cid, 452) - 10; // CFLAG:T:452 -= 10
    return [`《${savestr(cid)}的肉体年轻了10岁》`];
  },
};

/** cure_insane：安抚崩坏的心（消耗 30 勋章，不走 MONEY 支）。 */
const CURE_INSANE_ITEM = {
  price: 0,
  poor: '',
  intro: [
    '也许对这些动不动就坏掉的脆弱奴隶来说，坏掉反而更幸福吧！',
    '面对这等弱者，没必要浪费时间慢慢哄！食脑魔，给我上！！',
    '消耗三十个勋章，恢复谁的理智？',
  ],
  mode: 2, // CALL LIFE_LIST(NO_PAGE,2,NUM_PAGE)
  master: true, // 条件是 RESULT < 0（0 可选中）
  guard: (cid) => {
    if (talent(cid, 9) === 0 && talent(cid, 123) === 0) {
      return `${savestr(cid)}的精神没有崩坏。`;
    }
    return null;
  },
  confirm: (cid) => [`恢复${savestr(cid)}的理智么？`],
  apply: (cid) => {
    const lines = [];
    if (talent(cid, 9)) {
      lines.push(`《${savestr(cid)}的瞳孔，再度射出理性的光辉了。》`);
      chara(cid).stronghold.崩坏 = 0; // TALENT:T:9 = 0
    }
    if (talent(cid, 123)) {
      lines.push(`《${savestr(cid)}从无尽的噩梦中苏醒了。》`);
      chara(cid).event.疯狂 = 0; // TALENT:T:123 = 0
    }
    return lines;
  },
};

/**
 * 洗脑四项的「费用 × 素质」（分发里现置 C/B）。
 * 键 = 菜单编号，值 = [费用, 追加素质]。
 */
const WASHING_MENU = {
  30: [5000, 64], // 【无视污垢】
  31: [8000, 133], // 【早泄】
  32: [10000, 132], // 【幼稚】
  33: [10000, 83], // 【抖Ｓ】
};

/** st_up_labo 四项的菜单编号（`C = 5000` 与 `B = 0..3`） */
const ST_UP_MENU = { 70: 0, 71: 1, 72: 2, 73: 3 };

/**
 * 条目表：键是 page/page-shop-labo.js 里的条目名。
 *
 * `apply(cid, rand)` 返回要打印的播报行（写入已在这里完成）；
 * `after(cid, rand)` 是成交之后的追加动作。
 */
const LABO_ITEMS = {
  anti_aging: ANTI_AGING_ITEM,
  animal: MODIFY_ANIMAL_ITEM,
  animal_erase: MODIFY_ANIMAL_ERASE_ITEM,
  blueskin: BLUESKIN_ITEM,
  bonyu: MODIFY_BONYU_ITEM,
  bonyu_erase: MODIFY_BONYU_ERASE_ITEM,
  cure_insane: CURE_INSANE_ITEM,
  deimmaturity: MODIFY_DEIMMATURITY_ITEM,
  encharmed_erase: ENCHARMED_ERASE_ITEM,
  evilwing: EVILWING_ITEM,
  evilsight: EVILSIGHT_ITEM,
  eviltail: EVILTAIL_ITEM,
  extra_preg_erase: EXTRA_PREG_ERASE_ITEM,
  extra_preg_mark: EXTRA_PREG_MARK_ITEM,
  futanari_erase: MODIFY_FUTANARI_ERASE_ITEM,
  horn: HORN_ITEM,
  magicresist: MAGICRESIST_ITEM,
  omorashi_erase: MODIFY_OMORASHI_ERASE_ITEM,
  removehair: MODIFY_REMOVEHAIR_ITEM,
  shojo_saisei: SHOJO_SAISEI_ITEM,
  shojo_seal: SHOJO_SEAL_ITEM,
  shojo_seal_off: SHOJO_SEAL_OFF_ITEM,
  soulbound: SOULBOUND_ITEM,
  soulbound_erase: SOULBOUND_ERASE_ITEM,
  trans_sex: TRANS_SEX_ITEM,
};

module.exports = {
  LABO_ITEMS,
  ST_UP_MENU,
  WASHING_MENU,
};
