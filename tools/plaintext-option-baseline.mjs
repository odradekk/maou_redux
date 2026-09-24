/**
 * @file 纯文本选项行的棘轮基线（生成物，勿手改：issue #530）。
 *
 * 生成：node tools/plaintext-options.mjs --write
 * 消费：test/plaintext-option.test.js（计数不符即红，两个方向都算）。
 *
 * 每项 = 「文件 → 该文件里「era.print('…[N] …')」形态的纯文本选项行条数」。
 * 这些行**今天还能用**（本轮没打印按钮时引擎放行自由输入），但只要同一轮
 * 里多打印一枚按钮，编号就会被引擎拒收、玩家敲不进去（#129 / PR #53 /
 * #530 三次都是这个病灶）。逐处的「真选项／说明文字」判定与处理意见见
 * docs/research/plaintext-options.md。
 *
 * 纪律：棘轮只许收紧不许放松——新增一行必须红，修掉一行必须同步删数
 * （与 tools/engine-contract-ledger.mjs 的「只能变短、不许过期失效」同款）。
 * 收窄扫描面（改判定规则）时要一并重生成本文件，并在 #530 下说明理由。
 *
 * 已知限度（#530 二轮审查指出）：计数按「文件 → 条数」，**同一文件里删一行
 * 再加一行不会红**（净额不变）。要钉到具体行就得把基线换成锚点串，
 * engine-contract-ledger.mjs 那种粒度；本票取的是计数，够拦住「新增一行」
 * 这一主要风险，代价是丢掉了同文件等额增减的分辨力。
 */
export default {
  'ere/chara/chara-custom.js': 2,
  'ere/dungeon/dungeon-battle2.js': 2,
  'ere/event/event-addict.js': 2,
  'ere/event/event-execution.js': 1,
  'ere/event/event-grotesque.js': 1,
  'ere/event/get-specialtalent.js': 2,
  'ere/kojo/kojo-dungeon-bitch.js': 2,
  'ere/kojo/kojo-dungeon-ravish.js': 4,
  'ere/page/page-chara-shop.js': 1,
  'ere/page/page-dungeon-info2.js': 2,
  'ere/page/page-life-list.js': 1,
  'ere/page/page-monster-shop.js': 2,
  'ere/page/page-shop-labo.js': 1,
  'ere/system/train/cloth.js': 2,
  'ere/system/train/com-cloth.js': 24,
  'ere/system/train/com-hardcore.js': 17,
};
