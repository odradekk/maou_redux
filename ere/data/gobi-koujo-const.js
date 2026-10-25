/**
 * @file 语尾（GOBI_KOUJO）的文字表与取值函数（issue #865）。
 *
 * 语尾是接在对话句尾的一小段语气词，由调用方拼进自己那一行（`「……」` 的
 * 「」之前）——它从不单独成行，所以这里给的是**文字**，不是输出。
 *
 * 为什么在表里而不是在函数里：旧写法的语尾是每性格一个 `gobi_koujo_k*`
 * 真身，各写一棵 if 链，文字散在 18 份文件里；迁 .kojo 时篇目只能输出、
 * 不能把文字交回调用方拼接，文字必须先成为数据才能同时供 JS 调用点与
 * 篇目引用。改完之后真身只剩「转交一行」，文字只在这里有一份。
 *
 * == 编号与档位 ==
 *
 * 编号 = 口上编号（分发族的键，LOCAL - 100）。没有这一套语尾的性格
 * （如 K11）在表里没有行——取值返回空串，调用方那一行照常结束。
 *
 * 档位 `arg0` 是旧引擎的 ARG:0：1 喜 / 2 怒 / 3 悲 / 4 恥 / 5 情けない；
 * 0（不给档位）与越界值走 `fallback`。表里 `tiers` 按 `arg0 - 1` 排列。
 *
 * `fallback` 是默认支的候选：一支（K15）直接取，不掷随机；三支按旧真身的
 * 顺序先掷 RAND:3、落空再掷 RAND:2——顺序与上界都别改，概率形状就是它。
 *
 * == %SELF_CALL% ==
 *
 * K19/K904 的怒档把角色的自称插进句子中间（旧真身在真身里求值）。表里留
 * `%SELF_CALL%` 占位符、由取值函数按当前 TARGET 替换：表因此仍是纯数据，
 * 与 `.kojo` 的 `%KEY%` 替换是同一个记号。
 */

const era_flag = require('#/era-utils/era-flag');
const { self_call } = require('#/kojo/kojo-text');

/** 自称占位符（`.kojo` 字典里的同记号） */
const SELF_CALL_TOKEN = '%SELF_CALL%';

/**
 * 编号 → 语尾文字。逐条对应改动前的 18 个真身；同文的性格各占一行
 * （K4/K903、K19/K904 逐字相同），不合并——每行对应一个可注册的编号。
 */
const GOBI_KOUJO = {
  0: {
    tiers: ['♪', '！', '……。', '……。', '……呜呜。'],
    fallback: ['。', '哟。', '呢。'],
  },
  1: {
    tiers: [
      '哎哟♪',
      '哎呦！',
      '哎……。',
      '哎哟……什么、不好！？',
      '这样的事……。',
    ],
    fallback: ['哈。', '哎呦。', '的哇。'],
  },
  2: {
    tiers: ['啊～', '哟！', '啊……。', '啊啊……。', '呼……唔唔。'],
    fallback: ['唔。', '什么啊。', '什么啊。'],
  },
  3: {
    tiers: ['的噢~♪', '的啊！', '来着……。', '来的……呢~。', '的噢……呜~。'],
    fallback: ['的说。', '噢。', '噢。'],
  },
  4: {
    tiers: ['哦～♪', '哦！', '啦……。', '吧……算是……。', '什么的……。'],
    fallback: ['呢。', '嘛。', '啦。'],
  },
  5: {
    tiers: ['的噢~♪', '的啊！', '来着……。', '来的呢……。', '的啊……。'],
    fallback: ['来着。', '的啊。', '的噢。'],
  },
  6: {
    tiers: ['的哟♪', '啊！', '来着……。', '啦……。', '呢……。'],
    fallback: ['啊。', '呢。', '的说。'],
  },
  7: {
    tiers: ['哇~♡', '什么啊！', '哦……。', '真是……唉。', '唉……。'],
    fallback: ['哦。', '啊。', '没办法了。'],
  },
  8: {
    tiers: ['什么啊♪', '哼！', '唉……。', '嗯……。', '啊……啊……。'],
    // 前两支同文：源里两支都是「啊。」，不是漏抄，别按去重改
    fallback: ['啊。', '啊。', '什么啊。'],
  },
  9: {
    tiers: ['的噢♡', '来的哦！', '来的……。', '来的呢……。', '来的……呜呜。'],
    fallback: ['来的。', '来的哦。', '的噢~。'],
  },
  10: {
    tiers: ['所以呢♪', '哟！', '怎么这样……。', '……。', '……。'],
    fallback: ['。', '。', '。'],
  },
  12: {
    tiers: ['的哟♪', '的呢！', '的哟……。', '的样子……呢。', '的哟……。'],
    fallback: ['的哟。', '的样子哦。', '什么的。'],
  },
  13: {
    tiers: ['嗯♪', '哦！', '是的……。', '……。', '就是这样……。'],
    fallback: ['嗯。', '呢。', '呀。'],
  },
  14: {
    tiers: ['哦~♪', '哦！', '啦……。', '什么的……。', '什么啊……。'],
    fallback: ['啦。', '嘛。', '的啦。'],
  },
  15: {
    tiers: ['♪', '！', '……。', '……。', '……。'],
    fallback: ['。'],
  },
  19: {
    tiers: [
      '，诶嘿嘿～♪',
      '，呜～～%SELF_CALL%要咬人了的说～～',
      '哈呜呜……',
      '呜……\\/\\/\\/\\/',
      '',
    ],
    fallback: ['', '', ''],
  },
  903: {
    tiers: ['哦～♪', '哦！', '啦……。', '吧……算是……。', '什么的……。'],
    fallback: ['呢。', '嘛。', '啦。'],
  },
  904: {
    tiers: [
      '，诶嘿嘿～♪',
      '，呜～～%SELF_CALL%要咬人了的说～～',
      '哈呜呜……',
      '呜……\\/\\/\\/\\/',
      '',
    ],
    fallback: ['', '', ''],
  },
};

/**
 * %SELF_CALL% 换成当前 TARGET 的自称（CSTR:60 非空取值，否则「我」）。
 * @param {string} text 表里的语尾文字
 * @returns {string} 替换后的文字
 */
function fill_self_call(text) {
  if (!text.includes(SELF_CALL_TOKEN)) {
    return text;
  }
  const called = self_call(era_flag.target);
  return text.split(SELF_CALL_TOKEN).join(called);
}

/**
 * 语尾取值：编号 + 情绪档 → 文字。
 *
 * @param {number} id 口上编号（= LOCAL - 100，分发族的键）
 * @param {number} arg0 情绪档（1-5；0 与其余值走默认支）
 * @param {(n: number) => number} [rand] RAND:N 的随机源（默认支三选一用；
 *   不传时用均匀随机，与旧真身一致）
 * @returns {string} 语尾文字；表里没有这个编号时是空串（调用方的行照常结束）
 */
function gobi_text(id, arg0, rand) {
  const row = GOBI_KOUJO[id];
  if (row === undefined) {
    return '';
  }
  const tier = row.tiers[arg0 - 1];
  if (tier !== undefined) {
    return fill_self_call(tier);
  }
  const texts = row.fallback;
  if (texts.length === 1) {
    return fill_self_call(texts[0]);
  }
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  let index = 2;
  if (rand_n(3) === 0) {
    index = 0;
  } else if (rand_n(2) === 0) {
    index = 1;
  }
  return fill_self_call(texts[index]);
}

module.exports = { GOBI_KOUJO, gobi_text };
