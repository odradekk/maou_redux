/**
 * @file 高级 COM 升格分发：@GET_ADV_COM 的骨架与升格机制（issue #213——
 * 各族的升格规则随族票注册，这张票只立分发面）。
 *
 * 源: target/ERB/調教相關/COMF_JUMP.ERB  @GET_ADV_COM（:1-684 全文；
 *     SELECTCASE ARG 共 21 个 CASE——6/1/3/4/5/8/20/21/22/23/26/27/30/
 *     31/32/33/34/40/61/80/135，尾坠 RETURN ARG）
 *
 * == 原作的机制（升格 = 「前两回合序列 → 高级 COM」） ==
 *
 * @GET_ADV_COM(ARG) 按当前指令号查升格规则：规则读 PREVCOM（上回合指令）、
 * TFLAG:59（上上回合指令，由回合循环推进）、TFLAG:50（上回合调教者是否
 * 助手）、ASSIPLAY、ABL:PLAYER:12（调教者技巧）与 PALAM:5（欲情）等，
 * 命中则 CALL COM_ABLE<目标> 复核后 RETURN 高级号（不可用则落空），
 * 不命中落到函数尾 RETURN ARG——**原样返回当前指令号**。
 *
 * 两个调用面（ere 侧同一族供给）：
 *   - 渲染侧：@SHOW_COMMENU 的 CALL GET_ADV_COM, L_I（USERCOM.ERB:209），
 *     方格标签取 %TRAIN_NAME:RESULT%——名字用升格后的号、编号用升格前的
 *     位次（#211 实证：8 号格标签已是「刺激Ｇ点」＝COM84 而编号仍是 8）；
 *   - 执行侧：COMF*.ERB 头部的 LOCAL = n / CALL GET_ADV_COM,LOCAL /
 *     SIF RESULT != LOCAL / JUMPFORM COM{RESULT}（21 个文件，如
 *     COMF8_指挿入れ.ERB:17-20）——玩家选了 n、实际执行升格后的号。
 *     JUMPFORM 的目标集静态可枚举（#7 的六族之一），ere 侧由族票在
 *     com-<族>.js 里以 com_family.call(升格号) 同位落地。
 *
 * == 升格规则的副作用（1:1 保留在规则体内，随族票） ==
 *
 * CASE 20-34 的体位族升格会写 FLAG:71（体位连续记录，1120/1121/2120…），
 * CASE 20/21/26/27/31/80 的 3P 升格写 TFLAG:42 = 1（3P 连续旗标）并先清
 * TFLAG:42 = 0——渲染侧逐格调用时这些写入照常发生（原作同形：SHOW_COMMENU
 * 的 CALL 亦带副作用）。
 *
 * == 规则挂点与缺失语义 ==
 *
 * 规则挂在**可直选空间**（DECLARED_TRAIN_IDS 101 个号）：SHOW_COMMENU 与
 * COMF 头部传入的都是玩家可直选的 L_I。21 个 CASE ⊂ 101（135 在
 * Train.csv 有效行内）。空间内未注册 = 该指令无升格规则 = 原样返回
 * （RETURN ARG 的等价物，由调用点以 whenMissing 传入——#7 决议：缺失
 * 语义归调用点，本族不硬编码）；空间外 = 拼写错误，启动/调用即抛错。
 *
 * @param 随机源以参数注入（RAND:N → (n) => [0, n) 整数；缺省均匀随机），
 *   kojo_message_com 同款先例——CASE 31 的 RAND:11 深喉/真空分流等规则
 *   体经它取随机，测试注入定值序固定分支。
 */

const { DispatchFamily } = require('#/system/dispatch/dispatch-family');
const { DECLARED_TRAIN_IDS } = require('#/system/train/com-family');

/**
 * @GET_ADV_COM 的升格规则族。规则签名（#213 定死，族票照此写）：
 *   async (rand) => number——返回升格后的 COM 号；不升级返回当前号。
 * rand 是 RAND:N 的随机源（[0, n) 整数）。
 */
const adv_com_family = new DispatchFamily('GET_ADV_COM', DECLARED_TRAIN_IDS);

/**
 * @GET_ADV_COM（COMF_JUMP.ERB:1-684）。
 *
 * 这张票（#213）零规则注册：未注册的号原样返回（RETURN ARG）。族票
 * （J9-J20）把各 CASE 的升格规则注册进 adv_com_family。
 *
 * @param {number} id 当前指令号（可直选空间内；玩家所选的 L_I）
 * @param {(n: number) => number} [rand] RAND:N 随机源（缺省均匀随机）
 * @returns {Promise<number>} 升格后的 COM 号（无规则/未命中时 = id）
 * @throws {Error} id 不在可直选空间内（拼写错误）
 */
async function get_adv_com(id, rand) {
  const rule_rand = rand ?? ((n) => Math.floor(Math.random() * n));
  return adv_com_family.call(id, { whenMissing: id, args: [rule_rand] });
}

module.exports = { adv_com_family, get_adv_com };
