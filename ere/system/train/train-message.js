/**
 * @file 调教文本的公共头与分发族：@TRAIN_MESSAGE_B（指令情景描写，前）与
 * @TRAIN_MESSAGE_A（参数上升反应，后）（issue #213 立分发表——爱抚 0-9
 * 分支随 #219 归 com-caress.js，其余 SELECTCOM 分支随各自指令票在
 * com-<族>.js 注册，default 落存根占位行）。
 *
 * 源: target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB  @TRAIN_MESSAGE_B
 *     （:12-3049 全文；公共头 :19-26 + 107 个 IF SELECTCOM == 分支）
 *     target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB  @TRAIN_MESSAGE_A
 *     （:15-1351 全文；公共头 :22-26 + 82 个分支）
 *
 * 原作 B 在前、A 在后（B 文件头 :10 的调用方注释）；ere 侧同为两次直调：
 * B 由各 @COMn 调（COMF0_愛撫.ERB:11 等），A 由 @SOURCE_CHECK 调
 * （SYSTEM_SOURCE.ERB:478）。
 *
 * == 分发表（#209 裁定 6 / #213 立面） ==
 *
 * 平铺大文件只留公共头做骨架，各族的段跟族票。ere 侧按族建模块
 * （com-<族>.js）：族票把该族的 TRAIN_MESSAGE 分支注册进
 * train_message_b_family / train_message_a_family——声明空间 = 121 段
 * 分发空间（SELECTCOM 经升格可取高级 COM 号，高级号的分支同样在这两张
 * 表里）。缺失（族票未落地）→ 存根占位行；空间外 → 显式抛错（SELECTCOM
 * 只会是 121 之一，越界即引擎对接 bug，不静默回落）。
 *
 * == handler 签名（#219 起，族票照此写）：async (rand) => 0 ==
 *
 * rand 是 RAND:N 的随机源（[0, n) 整数，缺省均匀随机，由本文件的两次
 * dispatch 注入——kojo_message_com / get_adv_com 同款先例）。B 分支 3/4
 * 的 LOCALS 分流（RAND:2 / RAND:3）经它取随机，测试注入定值序固定分支。
 *
 * 这张票存根/登记（docs/stub-registry.md）：
 *   - B/A 的其余 SELECTCOM 分支（射精文本 :30-120 / 振动宝石 :986 起等）：
 *     随各自指令票扩展，default 落存根占位行。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const { DECLARED_COM_IDS } = require('#/system/train/com-family');
const { chara_callname } = require('#/utils/callname-utils');
const { stub_line } = require('#/utils/stub-line');
const { game } = require('#/facade/game');

/**
 * 本文件存根化的原作函数名。docs/stub-registry.md 必须收录每一个；名单
 * 变动必须同步清单。
 */
const STUBBED_CALLS = ['TRAIN_MESSAGE_B', 'TRAIN_MESSAGE_A'];

/**
 * @TRAIN_MESSAGE_B 的分支族（SELECTCOM → 情景描写）。族票在 com-<族>.js
 * 注册：`train_message_b_family.register(<n>, async () => { … })`。
 */
const train_message_b_family = new DispatchFamily(
  'TRAIN_MESSAGE_B',
  DECLARED_COM_IDS,
);

/**
 * @TRAIN_MESSAGE_A 的分支族（SELECTCOM → 参数上升反应）。
 */
const train_message_a_family = new DispatchFamily(
  'TRAIN_MESSAGE_A',
  DECLARED_COM_IDS,
);

// 分支缺失的哨兵：族票未落地的指令走存根占位行（#45 起的既有行为）
const BRANCH_MISSING = Symbol('TRAIN_MESSAGE_BRANCH_MISSING');

/** RAND:N 随机源（缺省均匀随机；get_adv_com 同款注入形状，#219 起） */
const rand_source = () => (n) => Math.floor(Math.random() * n);

/**
 * @TRAIN_MESSAGE_B（:12-）。公共头（省略设定 + 点线）后按 SELECTCOM 分发；
 * 缺失分支落存根占位行，空间外显式抛错（见文件头「分发表」）。
 *
 * @returns {Promise<void>}
 */
async function train_message_b() {
  // :19-21 調教テキスト省略設定（FLAG:6 & 1）→ 直接返回
  if ((era.get('flag:6') || 0) & 1) {
    return;
  }
  // :23 CUSTOMDRAWLINE ‥ —— ere 的 drawLine 是实线分隔（'‥' 点线是排版
  // 近似，记名差异见 issue #45）
  era.drawLine();

  const branch = await train_message_b_family.call(era_flag.selectcom, {
    whenMissing: BRANCH_MISSING,
    args: [rand_source()],
  });
  if (branch === BRANCH_MISSING) {
    stub_line(
      'TRAIN_MESSAGE_B',
      `指令 ${era_flag.selectcom} 的情景描写`,
      '随各自指令票',
    );
  }

  // TFLAG:31 = 本次调教处女丧失：连续插入分支临时置 2，公共尾部归一回
  // 1；其余遗留值清零。FLAG:6 的早退在函数开头，不能越过它执行本段。
  // 源: EVENT_TRAIN_MESSAGE_B.ERB :3041-3046
  const virgin_blood = game.event.本次调教处女丧失;
  game.event.本次调教处女丧失 = virgin_blood === 2 ? 1 : 0;
}

/**
 * @TRAIN_MESSAGE_A（:15-）。公共头（省略设定 + 点线）后按 SELECTCOM 分发；
 * 缺失分支落存根占位行，空间外显式抛错（见文件头「分发表」）。
 *
 * @returns {Promise<void>}
 */
async function train_message_a() {
  // :22-24 調教テキスト省略設定（FLAG:6 & 1）→ 直接返回
  if ((era.get('flag:6') || 0) & 1) {
    return;
  }
  // :26 CUSTOMDRAWLINE ‥（排版近似说明同 train_message_b）
  era.drawLine();

  // —— 公共头的 TFLAG:15（怪物/触手射精旗标）段（:110-146）——
  // 死斗场（TEQUIP:55）的灌精两臂随 J20（#230）：TFLAG:15 的写入者是本族
  // 怪物（com-colosseum 的 monster_ejaculation，SELECTCOM = 凌辱子指令）；
  // 内层三支之外的 SELECTCOM 无输出——且链被死斗场臂消费，触手臂不再落
  // （源 IF 链形状，1:1）。非死斗场的触手两臂（:113-125 与 :143-145，
  // 文本「身上的触手、吐出了体液…」）随 J17（触手族），未落地即无输出。
  // TFLAG:9 的股间射精段（:30-108）随各自指令票，同样未落地
  const tflag15 = era.get('tflag:15') || 0;
  if (tflag15 > 0 && era.get(`tequip:${era_flag.target}:55`)) {
    const com_site = { 31: '嘴里', 21: '私处里', 27: '直肠里' };
    const site = com_site[era_flag.selectcom];
    if (site !== undefined) {
      const target_name = chara_callname(era_flag.target);
      era.print(
        tflag15 === 2
          ? `${target_name}的${site}、被怪物大量的粘稠精液灌满了…` // :135-141
          : `${target_name}的${site}、被灌入了怪物黏黏糊糊的精液…`, // :127-133
      );
    }
  }

  // —— 公共绝顶反应（:377-424）——
  // 这是所有指令共用的 TFLAG:29 消费点，必须先于 SELECTCOM 分支输出；
  // 原作连续 PRINTFORM/PRINT/PRINTL 组成一条可见行，故在此一次性拼接。
  const target = era_flag.target;
  const orgasms = era.get('tflag:29') || 0;
  const faint = era.get('tflag:899') || 0;
  if (orgasms > 0 && faint <= 1) {
    const target_name = chara_callname(target);
    const ejaculates = era.get('tflag:10') || 0;
    const milk = era.get('tflag:11') || 0;
    const intersex =
      (era.get(`talent:${target}:121`) || 0) > 0 ||
      (era.get(`talent:${target}:122`) || 0) > 0;
    let line = target_name;
    if (milk === 1) {
      line += '从胸前滴落母乳';
    } else if (milk === 2) {
      line += '从胸前喷出大量香喷喷的母乳';
    }
    const has_love_fluid = !intersex && orgasms >= 5;
    if (milk > 0 && (has_love_fluid || ejaculates > 0)) {
      line += '、';
    }
    if (!intersex && orgasms >= 5 && orgasms <= 8) {
      line += '阴唇里喷出透明的爱液、';
    } else if (!intersex && orgasms >= 9) {
      line += '阴唇里喷出混合着白浊的爱液、';
    }
    if (ejaculates === 1) {
      const penis = {
        1: '手臂般粗的',
        2: '悲催的短小的',
        3: '包着皮的',
        4: '马一样的',
      }[era.get(`talent:${target}:318`) || 0];
      line += `${penis ?? ''}阴茎喷出了精液。`;
    } else if (ejaculates === 2) {
      const penis =
        {
          1: '怒张着、手臂般粗的',
          2: '颤抖着、可怜的短小的',
          3: '裸露龟头的',
          4: '跳动着、马一样的',
        }[era.get(`talent:${target}:318`) || 0] ?? '跳动着的';
      line += `${penis}阴茎中大量的精液飞散而出。`;
    }
    if (ejaculates === 0 && milk === 0 && (orgasms < 5 || intersex)) {
      line += '背脊夸张地向后仰、';
    }
    line +=
      orgasms < 12
        ? '全身哆嗦着、颤动到了极点。'
        : '露出快乐又淫媚的神色、绝顶高潮了……';
    era.print(line);
  }

  const branch = await train_message_a_family.call(era_flag.selectcom, {
    whenMissing: BRANCH_MISSING,
    args: [rand_source()],
  });
  if (branch === BRANCH_MISSING) {
    stub_line(
      'TRAIN_MESSAGE_A',
      `指令 ${era_flag.selectcom} 的参数反应`,
      '随各自指令票',
    );
  }
}

module.exports = {
  STUBBED_CALLS,
  train_message_a,
  train_message_a_family,
  train_message_b,
  train_message_b_family,
};
