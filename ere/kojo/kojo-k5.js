/**
 * @file マオ（村娘A）口上 K5：指令口上的爱抚分支（issue #46——实机唯一能
 * 触发的一支：玛奥 Chara17 的素质表带 165 村娘A，GET_KOJO_NUM 映射 105）。
 *
 * 源: target/ERB/口上/EVENT_K5_マオ.ERB  @EVENTTRAIN #PRI（:80-84，存在
 *     标志 FLAG:105）@EVENTEND #LATER（:86-88，清标志）
 *     @KOJO_MESSAGE_COM_5（:770；七道跳过判定 :771-793，**顺序与 K3 不同**
 *     且兽奸支是静默跳过、无 DOG_KOJO 调用；爱抚 CFLAG:301 状态机
 *     :802-848）
 *
 * == 正文已归一为简体（issue #60） ==
 *
 * 移植源本身是繁体（K3 简体、K5 繁体，汉化不一致），照抄会把这份混乱原样
 * 带给玩家。游戏语言统一为简体是产品决定（对 1:1 的有意偏离）：本文件的
 * 口上正文经 tools/lang-normalize.js 离线归一，对照依据是 tools/lang-table.js
 * （唯一真相源）；保真锁（test/kojo-text-fidelity.test.js 锁 D）对 ERB 侧
 * 应用同一张表归一后比对，简体锁（test/output-lang-lock.test.js）保证 JS
 * 侧不再残留非简体字符。
 *
 * == 状态机（CFLAG:301，个位数推进） ==
 *
 * 与 K3 同构但阈值是个位数：初回 → 1；二回目以降按「淫乱(76) → 爱慕(85) →
 * 屈服刻印Lv3 → Lv2 → それ以外(MARK:2 <= 1)」取首个命中，各支门槛
 * CFLAG:301 <= 5/4/3/2/1，写入 6/5/4/3/2——FLAG:7 == 2（默认）时上限被
 * 旁路、同支每次出声；FLAG:7 == 1 时逐阶段各出一次声。无随机分支。
 *
 * 本票存根（docs/stub-registry.md）：COLOSSEUM_KOJO_5 与 SELECTCOM != 0
 * 的其余指令分支（随各自指令票）。
 */

const era = require('#/era-electron');
const { on, TIER } = require('#/system/event/registry');
const era_flag = require('#/era-utils/era-flag');
const { kojo_message_com_family } = require('#/kojo/kojo-system');
const { heart } = require('#/kojo/kojo-text');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { chara_callname } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 对账钉死）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['COLOSSEUM_KOJO_5', 'KOJO_MESSAGE_COM_5'];

// @EVENTTRAIN #PRI（:80-84）：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    game.kojo.口上存在_5 = 1; // :82 FLAG:105 = 1（K5 口上存在标志）
    if (game.kojo.口上开关 === 0) {
      game.kojo.口上开关 = 2; // :83-84
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:86-88）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    game.kojo.口上存在_5 = 0; // :88
  },
  TIER.LATER,
);

/**
 * @KOJO_MESSAGE_COM_5（:770-848）：七道跳过判定 + 爱抚分支。
 *
 * 守卫顺序照 K5 原文（:771-793）：助手调教 → 口塞 → 失神 → 兽奸（静默）→
 * 触手 → 死斗场（专用口上存根）→ 崩坏——与 K3 的顺序不同，各文件 1:1。
 *
 * 分发族以 args: [rand] 统一传随机源（K3 的 RAND:N 分支用）；K5 的爱抚
 * 分支无随机、不声明该形参（JS 忽略多余实参），其余指令分支落地时若需
 * 随机再补。
 *
 * @returns {Promise<number>} 0（RETURN 0；TRYCALLFORM 不读返回值）
 */
async function kojo_message_com_5() {
  const target = era_flag.target;
  const target_name = chara_callname(target); // %SAVESTR:TARGET%
  const player_name = chara_callname(era_flag.player); // %SAVESTR:PLAYER%
  const kojo = chara(target).kojo;

  // :772-773 助手が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }
  // :775-776 ボールギャグ着用時（SELECTCOM == 45 自己说话不算）
  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    return 0;
  }
  // :778-779 失神時（TFLAG:899）——跨域读属主 train 的一维门面
  if (game.train.失神) {
    return 0;
  }
  // :781-782 獣姦プレイ中（K5 是静默跳过，无 DOG_KOJO 调用）
  if (era.get(`tequip:${target}:89`)) {
    return 0;
  }
  // :784-785 触手調教中（TEQUIP:90）
  if (era.get(`tequip:${target}:90`)) {
    return 0;
  }
  // :787-790 コロシアム中は専用口上
  if (era.get(`tequip:${target}:55`)) {
    stub_line('COLOSSEUM_KOJO_5', '死斗场专用口上', '随死斗场票');
    return 0;
  }
  // :792-793 崩坏した場合（TALENT:9）
  if (era.get(`talent:${target}:9`) === 1) {
    return 0;
  }

  // :802 IF SELECTCOM == 0（爱抚）。其余指令分支随各自指令票
  if (era_flag.selectcom === 0) {
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;

    // :803-814 初めて（CFLAG:301 == 0）
    if (kojo.爱抚 === 0) {
      // :805-812 屈服刻印Lv2以上
      if (mark(2) >= 2) {
        await era.printAndWait('「咕…呜呜…啊！」'); // :807
      } else {
        await era.printAndWait('「你这个变态…别、别碰我！」'); // :810
        await era.printAndWait(
          '（现在如果发出奇怪的声音的话…只会让这家伙感到高兴、一定要忍耐…！）',
        ); // :811
      }
      kojo.爱抚 = 1; // :813
      return 0; // :814
    }

    // :815-847 二回目以降
    // :817-822 淫乱（TALENT:76）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (kojo.爱抚 <= 5 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「嗯…啊…主人的手指好厉害…${heart(1)}」`); // :819
      await era.printAndWait(
        `${target_name}弯曲着身体、把${player_name}的手夹在自己的大腿间。`,
      ); // :820
      await era.printAndWait(`「请让我的H小穴…变得更加淫乱吧${heart(1)}」`); // :821
      kojo.爱抚 = 6; // :822
    } else if (
      // :823-828 愛慕（TALENT:85）
      era.get(`talent:${target}:85`) === 1 &&
      (kojo.爱抚 <= 4 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「啊…啊哈…啊${heart(1)}不要嗯${heart(1)}」`); // :825
      await era.printAndWait(`故意发出尖叫的${target_name}显得十分的可爱。`); // :826
      await era.printAndWait(
        `「主人、再多摸摸我嘛${heart(1)} 舒服的我都要叫出来了啦${heart(1)}」`,
      ); // :827
      kojo.爱抚 = 5; // :828
    } else if (
      // :829-834 屈服刻印Lv3
      mark(2) === 3 &&
      (kojo.爱抚 <= 3 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait(`「哈…呜…嗯咕${heart(1)}…啊…啊…嗯${heart(1)}……」`); // :831
      await era.printAndWait(`${target_name}的嘴里不住地发出甜美的娇喘。`); // :832
      await era.printAndWait('（明明只是被触摸而已…声音…却…忍不住了…啦）'); // :833
      kojo.爱抚 = 4; // :834
    } else if (
      // :835-839 屈服刻印Lv2
      mark(2) === 2 &&
      (kojo.爱抚 <= 2 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「啊…啊咕…呜呜…嗯咕…！」'); // :837
      await era.printAndWait(
        `${target_name}感受到了从未体验过的愉悦在沸腾着、忍不住皱起了脸………`,
      ); // :838
      kojo.爱抚 = 3; // :839
    } else if (
      // :840-844 それ以外（MARK:2 <= 1）
      mark(2) <= 1 &&
      (kojo.爱抚 <= 1 || game.kojo.口上开关 === 2)
    ) {
      await era.printAndWait('「不要、那、那里…不要…碰那里…啊！」'); // :842
      await era.printAndWait(`${target_name}不停地扭动着身体进行反抗………`); // :843
      kojo.爱抚 = 2; // :844
    }
    return 0; // :846
  }

  // :848 ENDIF（IF SELECTCOM == 0 的收口）——其余指令欠账，占位一行
  stub_line(
    'KOJO_MESSAGE_COM_5',
    `指令 ${era_flag.selectcom} 的口上`,
    '随各自指令票',
  );
  return 0;
}

// 注册进分发族（TRYCALLFORM KOJO_MESSAGE_COM_5 的等价物；重复注册抛错）
kojo_message_com_family.register(5, kojo_message_com_5);

module.exports = { STUBBED_CALLS, kojo_message_com_5 };
