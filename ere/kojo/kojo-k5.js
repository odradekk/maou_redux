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
 * == 正文是繁体中文（「這個變態」「隻會」「傢夥」） ==
 *
 * 移植源本身的翻译不一致（K3 简体、K5 繁体），**照抄不统一**——1:1 的
 * 意思包括这个，统一化是对源的人工修订、不属于移植。
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
const { stub_line } = require('#/utils/stub-line');
const { chara_callname } = require('#/utils/callname-utils');
const { heart } = require('#/kojo/kojo-text');
const { kojo_message_com_family } = require('#/kojo/kojo-system');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 对账钉死）；名单变动必须同步清单。
 */
const STUBBED_CALLS = ['COLOSSEUM_KOJO_5', 'KOJO_MESSAGE_COM_5'];

// @EVENTTRAIN #PRI（:80-84）：存在标志 + 总开关补 0
on(
  'EVENTTRAIN',
  () => {
    era.set('flag:105', 1); // :82 FLAG:105 = 1（K5 口上存在标志）
    if ((era.get('flag:7') || 0) === 0) {
      era.set('flag:7', 2); // :83-84
    }
  },
  TIER.PRI,
);

// @EVENTEND #LATER（:86-88）：调教结束清存在标志
on(
  'EVENTEND',
  () => {
    era.set('flag:105', 0); // :88
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

  // :772-773 助手が調教した時に口上をスキップする
  if (era_flag.assi > 0 && era_flag.assiplay) {
    return 0;
  }
  // :775-776 ボールギャグ着用時（SELECTCOM == 45 自己说话不算）
  if (era.get(`tequip:${target}:45`) && era_flag.selectcom !== 45) {
    return 0;
  }
  // :778-779 失神時（TFLAG:899）
  if (era.get('tflag:899') || 0) {
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
    const cflag301 = () => era.get(`cflag:${target}:301`) || 0;
    const set_cflag301 = (v) => era.set(`cflag:${target}:301`, v);
    const mark = (i) => era.get(`mark:${target}:${i}`) || 0;
    const flag7 = () => era.get('flag:7') || 0;

    // :803-814 初めて（CFLAG:301 == 0）
    if (cflag301() === 0) {
      // :805-812 屈服刻印Lv2以上
      if (mark(2) >= 2) {
        await era.printAndWait('「咕…嗚嗚…啊！」'); // :807
      } else {
        await era.printAndWait('「你這個變態…別、別碰我！」'); // :810
        await era.printAndWait(
          '（現在如果發出奇怪的聲音的話…隻會讓這傢夥感到高興、一定要忍耐…！）',
        ); // :811
      }
      set_cflag301(1); // :813
      return 0; // :814
    }

    // :815-847 二回目以降
    // :817-822 淫乱（TALENT:76）
    if (
      era.get(`talent:${target}:76`) === 1 &&
      (cflag301() <= 5 || flag7() === 2)
    ) {
      await era.printAndWait(`「嗯…啊…主人的手指好厲害…${heart(1)}」`); // :819
      await era.printAndWait(
        `${target_name}彎曲著身體、把${player_name}的手夾在自己的大腿間。`,
      ); // :820
      await era.printAndWait(`「請讓我的H小穴…變得更加淫亂吧${heart(1)}」`); // :821
      set_cflag301(6); // :822
    } else if (
      // :823-828 愛慕（TALENT:85）
      era.get(`talent:${target}:85`) === 1 &&
      (cflag301() <= 4 || flag7() === 2)
    ) {
      await era.printAndWait(`「啊…啊哈…啊${heart(1)}不要嗯${heart(1)}」`); // :825
      await era.printAndWait(`故意發出尖叫的${target_name}顯得十分的可愛。`); // :826
      await era.printAndWait(
        `「主人、再多摸摸我嘛${heart(1)} 舒服的我都要叫出來了啦${heart(1)}」`,
      ); // :827
      set_cflag301(5); // :828
    } else if (
      // :829-834 屈服刻印Lv3
      mark(2) === 3 &&
      (cflag301() <= 3 || flag7() === 2)
    ) {
      await era.printAndWait(`「哈…嗚…嗯咕${heart(1)}…啊…啊…嗯${heart(1)}……」`); // :831
      await era.printAndWait(`${target_name}的嘴裏不住地發出甜美的嬌喘。`); // :832
      await era.printAndWait('（明明衹是被觸摸而已…聲音…卻…忍不住了…啦）'); // :833
      set_cflag301(4); // :834
    } else if (
      // :835-839 屈服刻印Lv2
      mark(2) === 2 &&
      (cflag301() <= 2 || flag7() === 2)
    ) {
      await era.printAndWait('「啊…啊咕…嗚嗚…嗯咕…！」'); // :837
      await era.printAndWait(
        `${target_name}感受到了從未體驗過的愉悅在沸騰著、忍不住皺起了臉………`,
      ); // :838
      set_cflag301(3); // :839
    } else if (
      // :840-844 それ以外（MARK:2 <= 1）
      mark(2) <= 1 &&
      (cflag301() <= 1 || flag7() === 2)
    ) {
      await era.printAndWait('「不要、那、那裏…不要…碰那裏…啊！」'); // :842
      await era.printAndWait(`${target_name}不停地扭動著身體進行反抗………`); // :843
      set_cflag301(2); // :844
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
