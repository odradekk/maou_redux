/**
 * @file 迷宫凌辱事件（男性对象）——11 种怪物的凌辱文本与状态推进（issue #183，阶段 3 H14）。
 *
 * 源: target/ERB/迷宮/DUNGEON_RYOUZYOKU_MAN.ERB  @ORC_RYOU男（:1-399）、
 *     @SLIME_RYOU男（:401-470）、@INSECT_RYOU男（:471-494）、
 *     @IVY_RYOU男（:495-519）、@SYOKUSYU_RYOU男（:520-557）、
 *     @FAILY_RYOU男（:558-586）、@GIANT_RYOU男（:587-709）、
 *     @MAN_RYOU男（:710-902）、@BEAST_RYOU男（:903-959）、
 *     @BRAIN_RYOU男（:960-1014）、@HORSE_RYOU男（:1015-1069）
 *
 * 调用点：target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB 的 @RYOUZYOKU 主体
 * （:77-156）——按 `E:(MON_COUNT+7)`（凌辱类型 1-12）分发，其中
 * `TALENT:ARG:122`（男人）为真时 CALL 本文件的 `*_RYOU男`，否则 CALL
 * H13（#182）的同名无「男」版。**两组函数名并不相同**（带「男」vs 不带），
 * 互不遮蔽（#12 的首个加载生效规则不触发）——本票不合并两组，各归各票。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - **`MON_NUM = E:(B + 99)` 以参数注入**（#5 决议第六条「指针不隐式读
 *     全局」）：B 是 @RYOUZYOKU 主循环的全局单字母变量（0/100/200，即
 *     三列怪物的队列号），`E:(B+99)` 是「该列怪物数量」（怪物相關/
 *     MONSTER_DATA.ERB 的 E 数组语义：E:Y+99 == 数量）。E 表由迷宫
 *     战斗系统（H5/H6）经 @MONSTER_DATA 建桶写入，ere 的 `era.get('e:99')`
 *     在桶缺失时报 key error（#183 引擎实测）；本票函数以 mon_num 形参
 *     接收该值，由 H13 的 @RYOUZYOKU 分派时读出传入。读 E 表本身随战斗
 *     票落地（docs/stub-registry.md 的 MONSTER_DATA 归属）。
 *   - **%SAVESTR:ARG% 经 chara_callname(arg) 承载**（#5 决议：SAVESTR 无
 *     引擎通道，#171 实测三段完全静默丢弃）：ARG 是参数角色号（被凌辱者），
 *     与口上文件的 TARGET 不同源，本文件用独立的 arg_name 变量。
 *   - **PRINTDATA/PRINTDATAW（DATAFORM 随机数组）**：原作在块内随机取一
 *     条输出。转译器把 DATAFORM 行落成注释（未覆盖方言），复核时改写成
 *     `pick(list, rand_n(n))`——随机取一条（#117：无全局 RAND 序列，
 *     随机经注入的 rand_n 掷出，测试注入定值序）。
 *   - **`JUEL:ARG:n += v` / `EXP:ARG:n += v` 转 era.add**：转译器把 `+=`
 *     错拼进下标（`juel:${arg}:9 +`），复核修正为 `era.add('juel:${arg}:9', v)`
 *     （era.add 语义 = 引擎的 +=，juel-check.js 先例）。
 *   - **`SIF CFLAG:16 == -1 → CFLAG:16 = 995`**：初吻对象标记（995 = 怪物
 *     的阴茎，#47 的 page-info-exp.js 值域注释）。CFLAG:16 是 train 域跨域
 *     写（#71 门面规则），但门面 getter 的 `|| 0` 会吞 -1（未经历）判据，
 *     读用裸寻址 `era.get('cflag:${arg}:16')`，写走门面
 *     `chara(arg).train.初吻对象 = 995`。
 *   - **`CALL GOBI_KOUJO` 落存根**：语尾口上分派（EVENT_K.ERB 的 @GOBI_KOUJO），
 *     全库多处调用、未移植（docs/stub-registry.md 无登记——本文件首次
 *     消费，随语尾口上票）。TALENT:17（プライド低い）→ 1（喜んで誇らし
 *     げに）、否则 5（情けなさそうに），分支结构 1:1 保留。
 *   - **`Y += 10`（:862/:868）是死代码**：Y 是原作全局单字母变量（100000
 *     维），全库无初始化、函数内也无读取者（与 H13 的
 *     DUNGEON_RYOUZYOKU.ERB 的 Y += 10 同款）。ere 侧无单字母变量通道，
 *     注释保留不落变量（DUNGEON.ERB 的 X *= 2 同款处置）。
 *   - **`WAIT` → `await era.waitAnyKey()`**（PRINTW 的等待语义，#73；
 *     enter-enemy.js:86 先例）。
 *   - **TALENT:ARG:种族（:22/:26）等中文下标**：yml/Talent.yml 的名字表
 *     有「种族」（id 314）等条目，引擎列名寻址 `talent:${cid}:种族` 可用
 *     （#183 引擎实测 setVar 通过中文名翻译）。
 *   - **`RAND:n` → rand_n(n)**（#117：随机源注入，缺省均匀随机）。
 *   - **`TALENT:ARG:魅力点`（:166 等）**：魅力点 id 312，列名寻址可用。
 *
 * == 与本文件同名的函数 ==
 *
 * H13（#182）的 DUNGEON_RYOUZYOKU.ERB 前 11 段是 `@ORC_RYOU(ARG)`（无
 * 「男」字）——两组函数名不同，不触发 #12 的首个加载生效遮蔽。H13 的
 * 分派 `CALL ORC_RYOU男,ARG`（TALENT:ARG:122 为真时）引用的正是本文件
 * 的定义；无「男」版是 H13 的交付物（女性对象）。本票只交付带「男」版。
 *
 * @module
 */

const era = require('#/era-electron');
const { chara_callname } = require('#/utils/callname-utils');
const { chara } = require('#/facade/chara');
const { gobi_koujo } = require('#/kojo/kojo-system');

/**
 * 本文件存根化的原作调用名。docs/stub-registry.md 必须收录每一个（测试
 * 核对固定）；名单变动必须同步清单。GOBI_KOUJO 已随 K0 口上票落地
 * （#231，kojo-system 的 gobi_koujo 分派），全库调用点换真身。
 */
const STUBBED_CALLS = [];

/** PRINTDATA/PRINTDATAW 的随机取一条（DATAFORM 数组的等价物） */
function pick(list, rand_n) {
  return list[rand_n(list.length)];
}

/**
 * 通用：取被凌辱者名字（%SAVESTR:ARG% 的等价物）。
 * @param {number} arg 原作 ARG（角色号）
 * @returns {string}
 */
function arg_name_of(arg) {
  return chara_callname(arg);
}

// @ORC_RYOU男(ARG) // :1
/**
 * 兽人凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列兽人数量（原作 E:(B+99)，由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0,n) 整数；缺省
 *   均匀随机，测试注入定值序）
 * @returns {Promise<number>} 0（RETURN 0；CALL 不读返回值）
 */
async function orc_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const t = (n) => era.get(`talent:${arg}:${n}`) || 0;

  if (rand_n(5) === 0) {
    // :5-11 PRINTDATAW 口交三选一
    await era.printAndWait(
      pick(
        [
          '『喂！闭嘴……别吵啦！快点喝下去！』',
          '『舔个……干净……』',
          '『打得都勃起了……』',
        ],
        rand_n,
      ),
    ); // :7-10

    if (t(52)) {
      // :13-19 擅用舌头
      await era.printAndWait(`『呃……这家伙，简直就是经验丰富的娼妓嘛～』`); // :15
      await era.printAndWait(
        `${arg_name}拼命地用舌头侍奉着，展现出天赋般的好技术。`,
      ); // :16
      await era.printAndWait(
        `兽人抵受不住他那灵活的舌头，射在${arg_name}的嘴里了。`,
      ); // :17
      mon_num *= 2; // :18 舌使いボーナス
    }

    if (t('种族') === 4) {
      // :22 无头骑士的
      await era.print('无头骑士的');
    }

    await era.print(`${arg_name}`); // :24

    if (t('种族') === 4) {
      // :27 身体被固定住了
      await era.print('身体被固定住了，只剩下脑袋来像飞机杯似的');
    } else {
      await era.print('全裸地'); // :29
    }
    await era.printAndWait('侍奉着兽人们的阴茎。'); // :31
    await era.printAndWait(
      `只要喝掉所有${mon_num}只兽人的精液的话，它们就答应不侵犯他的下体………`,
    ); // :32

    if (era.get(`cflag:${arg}:131`) > 5) {
      // :34-50 隷属状態
      if (t(13)) {
        await era.print('毫无犹豫、'); // :38 素直
      } else if (t(14)) {
        await era.print('小心翼翼地、'); // :41 大人しい
      } else if (t(17)) {
        await era.print('一边土下座扭着腰部的'); // :44 プライド低い
      } else if (t(35)) {
        await era.print('期待与羞耻将脸染红的'); // :47 恥じらい
      } else {
        await era.print('面露期待的'); // :49
      }
    } else if (era.get(`cflag:${arg}:131`) > 2) {
      // :51-67 中畏怖状態
      if (t(13)) {
        await era.print('老实遵从于兽人的'); // :55 素直
      } else if (t(14)) {
        await era.print('煞有其事地、'); // :58 大人しい
      } else if (t(17)) {
        await era.print('不住向阴茎献媚的'); // :61 プライド低い
      } else if (t(35)) {
        await era.print('面对阴茎羞红了脸的'); // :64 恥じらい
      } else {
        await era.print('已然无法反抗的'); // :66
      }
    } else {
      // :68-88 初见的畏惧反应
      if (t(11)) {
        // :69-73 反抗的
        await era.print(`带着反抗的目光看着它们，其中一只兽人对他怒喝了一声，`); // :71
        await era.print(`恐怖点数+${mon_num * 10}`); // :72
        era.add(`juel:${arg}:10`, mon_num * 10); // :73 JUEL:ARG:10 恐怖
      } else if (t(13)) {
        // :74-78 素直
        await era.print(
          `迫于兽人的威胁，他衡量了一下得失之后，老实地接受了屈辱的命运……听天由命地流泪，`,
        ); // :76
        await era.print(`耻情点数+${mon_num * 10}`); // :77
        era.add(`juel:${arg}:8`, mon_num * 10); // :78 JUEL:ARG:8 耻情
      } else if (t(14)) {
        await era.print('提心吊胆地'); // :81 大人しい
      } else if (t(17)) {
        await era.print('嘿嘿媚笑着'); // :84 プライド低い
      } else if (t(35)) {
        await era.print('不敢直视肉棒而闭上了眼睛'); // :87 恥じらい
      }
    }

    await era.print(`${arg_name}把`); // :91

    // :93-99 PRINTDATA 阴茎五选一
    await era.print(
      pick(
        ['阴茎', '脏污的阴茎', '带肉刺的阴茎', '巨根', '蘑菇似的阴茎'],
        rand_n,
      ),
    ); // :94-98

    await era.print('含了下去，'); // :101

    if (t(52)) {
      // :103-109 舌使い
      await era.printAndWait(`『呃……这家伙，简直就是经验丰富的娼妓嘛～』`); // :105
      await era.printAndWait(
        `${arg_name}拼命地用舌头侍奉着，展现出天赋般的好技术。`,
      ); // :106
      await era.printAndWait(
        `兽人抵受不住他那灵活的舌头，射在${arg_name}的嘴里了。`,
      ); // :107
      mon_num *= 2; // :109 舌使いボーナス
    } else if (t(21)) {
      await era.print('像工作一样地奉仕着，'); // :112 無関心
    } else if (t(36)) {
      await era.print('不禁发出了粗俗的声音，'); // :115 恥薄い
    } else if (t(50)) {
      await era.print('很快地抓住了奉仕的诀窍，'); // :118 習得早い
    } else if (t(62)) {
      await era.print('忍受着腥臭味，'); // :121 汚臭敏感
    } else if (t(63)) {
      await era.print('拼命地用舌头奉仕着，'); // :124 献身的
    }

    await era.print('奉仕持续了下去……'); // :127

    await era.print(`口交经验+${mon_num}`); // :129
    await era.print(`精液经验+${mon_num}`); // :130
    chara(arg).dungeon.口交经验 += mon_num; // :131 EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // :132 EXP:ARG:20 精液经验

    // :134-136 初吻（SIF CFLAG:16 == -1）
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // :135 CFLAG:16 = 995（怪物的阴茎）
    }
  } else if (rand_n(4) === 0) {
    // :138-256 全穴奉仕
    // :142-146 PRINTDATAW 三选一
    await era.printAndWait(
      pick(
        [
          '『兄弟们，把所有的穴都塞满哦！』',
          '『嘿，简直像三明治一样』',
          '『连耳朵，都给你灌满精液咯』',
        ],
        rand_n,
      ),
    ); // :143-145

    await era.printAndWait(
      `${arg_name}被${mon_num}只兽人用积存已久的精液，将嘴巴、肛门……所有能用的穴，注满了精液……`,
    ); // :148
    await era.printAndWait(
      `他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。`,
    ); // :149
    await era.printAndWait(
      `${arg_name}的脸和性器都用精液化上了妆。兽人们看着他这样子，开怀大笑。`,
    ); // :150

    await era.print('兽人的'); // :152

    // :154-160 PRINTDATA 阴茎五选一
    await era.print(
      pick(
        ['阴茎', '脏污的阴茎', '带肉刺的阴茎', '巨根', '蘑菇似的阴茎'],
        rand_n,
      ),
    ); // :155-159

    await era.print(
      `插进了${arg_name}的喉咙深处，射精的同时喷溅出来的精液在${arg_name}的`,
    ); // :162

    if (era.get(`cflag:${arg}:42`) === 83) {
      await era.print('眼镜上飞撒着……'); // :165
    } else if (t('魅力点') === 2) {
      await era.print('可爱的眼睛上飞撒着……'); // :167
    } else if (t('魅力点') === 3) {
      await era.print('漂亮的鼻子里喷了出来……'); // :169
    } else if (t('魅力点') === 22) {
      await era.print('光鲜亮丽的头发上飞撒着……'); // :171
    } else {
      await era.print('脸上飞撒着……'); // :173
    }
    await era.print(''); // :175 PRINTL

    if (t(12)) {
      // :176-181 刚强
      await era.printAndWait(`${arg_name}咬着嘴唇忍受着凌辱……`); // :178
      await era.printAndWait('在那刚强的脸上，精液无情地飞撒着。'); // :179
      await era.print(`苦痛点数+${mon_num * 10}`); // :180
      era.add(`juel:${arg}:9`, mon_num * 10); // :181 JUEL:ARG:9 苦痛
    } else if (t(70) || t(73)) {
      // :183-189 接受快感・容易陷落
      await era.printAndWait('在凌辱开始不久后，渐渐地听到了妩媚的娇喘声。'); // :185
      await era.printAndWait('『喔！这家伙有感觉了哦！』'); // :186
      await era.printAndWait(`${arg_name}被快感冲击着，忍不住主动扭着腰。`); // :187
      await era.print(`欲情点数+${mon_num * 10}`); // :188
      era.add(`juel:${arg}:5`, mon_num * 10); // :189 JUEL:ARG:5 欲情
    } else {
      await era.printAndWait(
        `他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。`,
      ); // :192
    }

    await era.printAndWait(''); // :197 PRINTW（空行等待）
    await era.print(`兽人们把润滑液涂在了${arg_name}的`); // :198

    if (t('魅力点') === 21) {
      await era.print('漂亮的'); // :201
    } else if (t('魅力点') === 14) {
      await era.print('漂亮的屁股的缝隙中的'); // :203
    } else if (t('魅力点') === 23) {
      await era.print('大的屁股的缝隙中的'); // :205
    } else if (t(125)) {
      await era.print('无毛额'); // :207 白虎
    } else if (t(248)) {
      await era.print('肌肉明显的两腿间的'); // :209 筋肉質
    } else if (t('阴毛状态') > 200) {
      await era.print('从阴阜到肛门都被茂密的阴毛所覆盖的'); // :211
    } else if (t('阴毛状态') > 150) {
      await era.print('长着茂盛的阴毛的'); // :213
    }

    await era.print('性器和肛门上'); // :216
    await era.print(`在${arg_name}的`); // :217

    if (t(99)) {
      await era.print('魁梧的身体上'); // :221 魁梧
    } else if (t(100)) {
      await era.print('娇小的身体上'); // :224 娇小
    } else if (t(115)) {
      await era.print('松松垮垮的身体上'); // :227 肥満
    } else if (t(248)) {
      await era.print('紧致的身体上'); // :230 筋肉質
    } else if (t(256)) {
      await era.print('窈窕的身体上'); // :233 虚弱
    } else if (t('体型') <= 100) {
      await era.print('纤细的身体上'); // :235
    } else if (t('体型') > 200) {
      await era.print('肉感的身体上'); // :237
    } else {
      await era.print('身体上'); // :239
    }

    await era.print('像要挤爆他似的激烈地持续侵犯着……'); // :242

    await era.printAndWait(
      `他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。`,
    ); // :244

    await era.print(`苦痛点数+${mon_num * 10}`); // :246
    era.add(`juel:${arg}:9`, mon_num * 10); // :247 JUEL:ARG:9 苦痛
    await era.print(`肛门经验+${mon_num}`); // :248
    await era.print(`口交经验+${mon_num}`); // :249
    await era.print(`精液经验+${mon_num}`); // :250
    chara(arg).dungeon.肛门经验 += mon_num; // :251 EXP:ARG:1 肛门经验
    chara(arg).dungeon.口交经验 += mon_num; // :252 EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // :253 EXP:ARG:20 精液经验

    // :255-256 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // :256
    }
  } else if (rand_n(3) === 0) {
    // :258-340 屈辱プレイ
    // :262-266 PRINTDATAW 三选一
    await era.printAndWait(
      pick(
        [
          '『你不要做人了。从今往后就是家畜了。像猪一样叫几声来听听。』',
          '『猪就要有，猪的样子』',
          '『你只是，比我们还低级的，家畜罢了！』',
        ],
        rand_n,
      ),
    ); // :263-265

    await era.print(`${arg_name}全裸地四肢着地趴在地下、`); // :268

    if (t(10) || t(14)) {
      await era.print('浑身颤抖着、'); // :272 臆病・大人しい
    } else if (t(11)) {
      await era.print('怒目圆睁着、'); // :275 反抗的
    } else if (t(13)) {
      await era.print('拼命服从着、'); // :278 素直
    } else if (t(17)) {
      await era.print('拼命献媚着、'); // :281 プライド低い
    } else if (t(35)) {
      await era.print('羞红了脸、'); // :284 恥じらい
    }

    await era.printAndWait('屈辱地模仿猪叫……'); // :287

    await era.printAndWait(
      `${mon_num}只兽人看到这个情形都笑了。完全没有了光辉冒险者的样子，就是一只惨叫的猪而已。`,
    ); // :289

    if (era.get(`abl:${arg}:17`)) {
      // :291-297 露出癖
      await era.printAndWait(
        `${arg_name}的脸犹如发烧一般，不停地重复着上述行为。`,
      ); // :293
      await era.printAndWait('好像因为被视奸，而有了感觉。'); // :294
      await era.print(`耻情点数+${mon_num * 10}`); // :295
      era.add(`juel:${arg}:8`, mon_num * 10); // :296 JUEL:ARG:8 耻情
    }

    if (era.get(`abl:${arg}:21`)) {
      // :299-306 抖M气质
      await era.printAndWait(`${arg_name}好像因为被骂而有了感觉。`); // :301
      await era.printAndWait('『明明就是母猪，还说自己是冒险者！』'); // :302
      await era.printAndWait(`${arg_name}连眼神都湿润了～`); // :303
      await era.print(`欲情点数+${mon_num * 10}`); // :304
      era.add(`juel:${arg}:5`, mon_num * 10); // :305 JUEL:ARG:5 欲情
    }

    await era.print('『猪'); // :308
    if (t(17)) {
      // :309-312 プライド低い → 喜び
      await gobi_koujo(1); // :312 CALL GOBI_KOUJO, 1
    } else {
      // :313-316 情けない
      await gobi_koujo(5); // :315 CALL GOBI_KOUJO, 5
    }
    await era.print('还自称冒险者……简直傻了'); // :317

    if (t(17)) {
      // :319-326
      await gobi_koujo(1); // :322 CALL GOBI_KOUJO, 1
    } else {
      await gobi_koujo(5); // :325 CALL GOBI_KOUJO, 5
    }
    await era.printAndWait('　噗噗，噗嘻！』'); // :328

    if (t(17)) {
      // :330-335 プライド低い
      await era.printAndWait(`${arg_name}抛弃了自尊心，拼命地求饶着。`); // :332
      await era.print(`屈服点数+${mon_num * 10}`); // :333
      era.add(`juel:${arg}:6`, mon_num * 10); // :334 JUEL:ARG:6 屈服
    }

    await era.print(`耻情点数+${mon_num * 10}`); // :337
    await era.print(`屈服点数+${mon_num * 10}`); // :338
    era.add(`juel:${arg}:8`, mon_num * 10); // :339 JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // :340 JUEL:ARG:6 屈服
  } else if (rand_n(2) === 0) {
    // :341-369 武器捅后穴
    await era.printAndWait('『来试试，看能放多粗的东西进去？』'); // :342
    await era.printAndWait(`${arg_name}感受到了自己身上的危机，拼命地哀求着。`); // :343
    await era.printAndWait(
      `不过，他的身体依旧被兽人们牢牢抓住。M字开脚地把不设防的性器和肛门展示在大家面前。`,
    ); // :344
    await era.printAndWait(
      `其中一只兽人，拿起他的心爱的武器用柄的那端捅入他的后穴。`,
    ); // :345
    await era.printAndWait(
      `${arg_name}的喊叫声，回响在${mon_num}只兽人的耳边。`,
    ); // :346

    if (t(40)) {
      // :348-354 害怕疼痛
      await era.printAndWait('「好痛……不要啊……呜哇哇哇哇哇哇！」'); // :350
      await era.printAndWait(`${arg_name}受不了痛楚，高声哭喊着。`); // :351
      await era.print(`苦痛点数+${mon_num * 10}`); // :352
      era.add(`juel:${arg}:9`, mon_num * 10); // :353 JUEL:ARG:9 苦痛
    }

    if (era.get(`abl:${arg}:21`)) {
      // :356-362 抖M气质
      await era.printAndWait(`${arg_name}在痛楚中感到了愉悦。`); // :358
      await era.printAndWait(
        `难道自己是个潜在的性变态？这么想着，${arg_name}对自身的反应感到害怕。`,
      ); // :359
      await era.print(`欲情点数+${mon_num * 10}`); // :360
      era.add(`juel:${arg}:5`, mon_num * 10); // :361 JUEL:ARG:5 欲情
    }

    await era.print(`肛门经验+${mon_num}`); // :364
    await era.print(`苦痛点数+${mon_num * 10}`); // :365
    await era.print(`恐怖点数+${mon_num * 10}`); // :366
    chara(arg).dungeon.肛门经验 += mon_num; // :367 EXP:ARG:1 肛门经验
    era.add(`juel:${arg}:9`, mon_num * 10); // :368 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :369 JUEL:ARG:10 恐怖
  } else {
    // :370-396 抬屁股
    await era.printAndWait('『抬起屁股！然后说：请用！』'); // :371
    await era.printAndWait(
      `${arg_name}用屈辱的姿势抬起了屁股，把手扶在地下城的墙壁上。`,
    ); // :372
    await era.printAndWait(
      `他完全被淹没在${mon_num}只兽人之中，兽人们大笑着，轮流侵犯他的嘴巴和肛门。`,
    ); // :373
    await era.printAndWait(
      `${arg_name}的呜咽，被兽人们的欢呼声掩埋在地下城的黑暗中。`,
    ); // :374

    if (t(70) || t(73)) {
      // :376-382 接受快感・容易陷落
      await era.printAndWait(
        `随着凌辱的持续，${arg_name}的前端里渐渐滴出了体液。`,
      ); // :378
      await era.printAndWait(
        '『别这么快就去了啊！老子都不知道操哭多少人了。』',
      ); // :379
      await era.printAndWait(`${arg_name}呼出了炽热的气息，双腿直抖着。`); // :380
      await era.print(`欲情点数+${mon_num * 10}`); // :381
      era.add(`juel:${arg}:5`, mon_num * 10); // :382 JUEL:ARG:5 欲情
    } else if (t(11)) {
      // :384-387 反抗心
      await era.printAndWait('『喂！把腰抬起来！还没完呢！』'); // :386
      await era.printAndWait(`${arg_name}用冰冷的目光瞪了兽人们一眼。`); // :387
    }

    await era.print(`肛门经验+${mon_num}`); // :390
    await era.print(`口交经验+${mon_num}`); // :391
    await era.print(`精液经验+${mon_num}`); // :392
    chara(arg).dungeon.肛门经验 += mon_num; // :393 EXP:ARG:1 肛门经验
    chara(arg).dungeon.口交经验 += mon_num; // :394 EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // :395 EXP:ARG:20 精液经验
  }
  await era.waitAnyKey(); // :397 WAIT
  return 0; // :398
}

// @SLIME_RYOU男(ARG) // :401
/**
 * 史莱姆凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列史莱姆数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function slime_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  if (rand_n(6) === 0) {
    // :406-414 黏液侵犯
    await era.printAndWait(`黏液侵犯着${arg_name}的嘴巴和肛门，并灌入了黏液。`); // :407
    await era.print(`肛门经验+${mon_num}`); // :408
    await era.print(`苦痛点数+${mon_num * 10}`); // :409
    await era.print(`恐怖点数+${mon_num * 10}`); // :410
    era.add(`juel:${arg}:9`, mon_num * 10); // :411 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :412 JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // :413 EXP:ARG:1 肛门经验
  } else if (rand_n(5) === 0) {
    // :416-422 黏液入嘴
    await era.printAndWait('黏液杀到了冒险者的嘴巴里。'); // :417
    await era.printAndWait(
      `${arg_name}感觉呼吸困难，正挣扎着，突然呼吸又顺畅了。但一部分的黏液已经借机流入了他的内脏，从内部蹂躏着他。`,
    ); // :418
    await era.print(`苦痛点数+${mon_num * 10}`); // :419
    await era.print(`恐怖点数+${mon_num * 10}`); // :420
    era.add(`juel:${arg}:9`, mon_num * 10); // :421 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :422 JUEL:ARG:10 恐怖
  } else if (rand_n(4) === 0) {
    // :423-443 黏液入肛
    await era.printAndWait('黏液杀到了冒险者的肛门里。'); // :424
    await era.printAndWait(
      `${arg_name}被肛门里大量逆流的黏液弄的苦不堪言，但是四肢都被黏液牢牢控制，无法反抗。`,
    ); // :425
    if (era.get(`cflag:${arg}:131`) > 5) {
      await era.printAndWait(
        `${arg_name}反弓起腰来、似乎沉浸于粘液的杠虐快感之中……`,
      ); // :428 隷属状態
    } else if (era.get(`cflag:${arg}:131`) > 3) {
      await era.printAndWait(`${arg_name}已然被粘液攻陷了……`); // :431 強畏怖状態
    } else if (era.get(`cflag:${arg}:131`) > 0) {
      await era.printAndWait(`${arg_name}开始习惯被粘液涌入的感觉……`); // :434 弱畏怖状態
    } else {
      await era.printAndWait('冒险者在肛虐的痛苦中癫狂地惨叫着。'); // :436
    }
    await era.print(`肛门经验+${mon_num}`); // :438
    await era.print(`苦痛点数+${mon_num * 10}`); // :439
    await era.print(`恐怖点数+${mon_num * 10}`); // :440
    era.add(`juel:${arg}:9`, mon_num * 10); // :441 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :442 JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // :443 EXP:ARG:1 肛门经验
  } else if (rand_n(3) === 0) {
    // :444-450 四脚着地
    await era.printAndWait('被全裸地四脚着地压在地上，黏液逆流到肛门里了。'); // :445
    await era.printAndWait(
      `${arg_name}腹部运劲，将黏液喷出肛门，但依然有大量的黏液流入体内。`,
    ); // :446
    await era.print(`耻情点数+${mon_num * 10}`); // :447
    await era.print(`屈服点数+${mon_num * 10}`); // :448
    era.add(`juel:${arg}:8`, mon_num * 10); // :449 JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // :450 JUEL:ARG:6 屈服
  } else if (rand_n(2) === 0) {
    // :451-460 大量黏液
    await era.printAndWait(
      '黏液疯狂地凌辱着，大量的黏液灌入了直肠里让冒险者的肚子都膨胀了几分。',
    ); // :452
    await era.printAndWait(`${arg_name}坚强地试图站起来。`); // :453
    await era.printAndWait(
      '但是大量的黏液一下子又从肛门里汹涌地喷出来了，膝盖一软又跪倒在地。',
    ); // :454
    await era.print(`肛门经验+${mon_num}`); // :455
    await era.print(`苦痛点数+${mon_num * 10}`); // :456
    await era.print(`恐怖点数+${mon_num * 10}`); // :457
    chara(arg).dungeon.肛门经验 += mon_num; // :458 EXP:ARG:1 肛门经验
    era.add(`juel:${arg}:9`, mon_num * 10); // :459 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :460 JUEL:ARG:10 恐怖
  } else {
    // :461-466 治愈黏液
    await era.printAndWait('冒险者被包在黏液里，只露出头部发出呜呜的呻吟。'); // :462
    await era.printAndWait(`看来没人相救的话，${arg_name}要被消化在黏液里了。`); // :463
    await era.printAndWait(
      `黏液的麻痹成分，渐渐把${arg_name}遭受凌辱的苦痛身体治愈了。`,
    ); // :465
    chara(arg).dungeon.体力 += 100; // :466 BASE:ARG:0 += 100（体力回复）
  }
  await era.waitAnyKey(); // :468 WAIT
  return 0; // :469
}

// @INSECT_RYOU男(ARG) // :471
/**
 * 昆虫凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列昆虫数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function insect_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  if (rand_n(2) === 0) {
    // :476-482 嘴巴产卵
    await era.printAndWait('『叽吱叽吱叽吱……』'); // :477
    await era.printAndWait(`${arg_name}的嘴巴被输卵管插入了，被播下了卵。`); // :478
    await era.print(`苦痛点数+${mon_num * 10}`); // :479
    await era.print(`恐怖点数+${mon_num * 10}`); // :480
    era.add(`juel:${arg}:9`, mon_num * 10); // :481 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :482 JUEL:ARG:10 恐怖
  } else {
    // :484-490 肛门产卵
    await era.printAndWait('『叽吱叽吱叽吱……』'); // :485
    await era.printAndWait(`${arg_name}的肛门被输卵管插入了，被播下了卵。`); // :486
    await era.printAndWait(
      '不喝下打虫药剂的话，魔界的虫子就会从肛门里孵化了吧。',
    ); // :487
    await era.printAndWait(
      `${mon_num}只节肢动物轮流扑在${arg_name}身上，从臀部到背部全被卵覆盖了。`,
    ); // :488
    await era.print(`肛门经验+${mon_num}`); // :489
    chara(arg).dungeon.肛门经验 += mon_num; // :490 EXP:ARG:1 肛门经验
  }
  await era.waitAnyKey(); // :492 WAIT
  return 0; // :493
}

// @IVY_RYOU男(ARG) // :495
/**
 * 蔦触手凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列蔦触手数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function ivy_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  if (rand_n(2) === 0) {
    // :499-505 勒颈
    await era.printAndWait('藤蔓勒住了冒险者的脖子。'); // :500
    await era.printAndWait(
      `${arg_name}呼吸困难，痛苦挣扎着，被开放的时候，忍不住粗声地喘息。`,
    ); // :501
    await era.print(`苦痛点数+${mon_num * 10}`); // :502
    await era.print(`恐怖点数+${mon_num * 10}`); // :503
    era.add(`juel:${arg}:9`, mon_num * 10); // :504 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :505 JUEL:ARG:10 恐怖
  } else {
    // :506-515 肛门扎根
    await era.printAndWait('藤蔓在冒险者的肛门里扎根了。'); // :507
    await era.printAndWait(
      `${arg_name}的肛门被蹂躏着，发出了喊破喉咙的惨叫声。`,
    ); // :508
    await era.printAndWait('藤蔓吸收到了足够的养分，一下子从直肠里连根拔走。'); // :509
    await era.print(`肛门经验+${mon_num}`); // :510
    await era.print(`苦痛点数+${mon_num * 10}`); // :511
    await era.print(`恐怖点数+${mon_num * 10}`); // :512
    era.add(`juel:${arg}:9`, mon_num * 10); // :513 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :514 JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // :515 EXP:ARG:1 肛门经验
  }
  await era.waitAnyKey(); // :517 WAIT
  return 0; // :518
}

// @SYOKUSYU_RYOU男(ARG) // :520
/**
 * 触手凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列触手数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function syokusyu_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  if (rand_n(4) === 0) {
    // :525-529 触手入嘴
    await era.printAndWait('触手伸进了冒险者的嘴巴里。'); // :526
    await era.printAndWait(
      `${arg_name}的喉咙被大量的体液灌入，呛到了。不久，他的意识开始模糊了。`,
    ); // :527
    await era.print(`欲情点数+${mon_num * 10}`); // :528
    era.add(`juel:${arg}:5`, mon_num * 10); // :529 JUEL:ARG:5 欲情
  } else if (rand_n(3) === 0) {
    // :530-537 触手入肛
    await era.printAndWait('触手伸进了冒险者的肛门里。'); // :531
    await era.printAndWait(
      `${arg_name}的肛门被大量的体液灌入，直肠吸收了里面的成分。不久，他的意识开始模糊了。`,
    ); // :532
    await era.printAndWait(
      '不一会儿，全身肌肉都松弛了，大量的浑浊体液从肛门流出。',
    ); // :533
    await era.print(`肛门经验+${mon_num}`); // :534
    await era.print(`欲情点数+${mon_num * 10}`); // :535
    era.add(`juel:${arg}:5`, mon_num * 10); // :536 JUEL:ARG:5 欲情
    chara(arg).dungeon.肛门经验 += mon_num; // :537 EXP:ARG:1 肛门经验
  } else if (rand_n(2) === 0) {
    // :538-545 吊缚
    await era.printAndWait('触手把冒险者绑了起来，吊在半空。'); // :539
    await era.printAndWait(
      `${arg_name}的嘴巴也好，肛门也好，能被触手侵犯的地方都被灌入了大量的体液。`,
    ); // :540
    await era.printAndWait(
      '……不久，地上滴落的液体里，开始出现了触手体液之外的东西。',
    ); // :541
    await era.print(`肛门经验+${mon_num}`); // :542
    await era.print(`欲情点数+${mon_num * 10}`); // :543
    era.add(`juel:${arg}:5`, mon_num * 10); // :544 JUEL:ARG:5 欲情
    chara(arg).dungeon.肛门经验 += mon_num; // :545 EXP:ARG:1 肛门经验
  } else {
    // :546-553 榨乳
    await era.printAndWait('冒险者被触手吸着乳头，不断的挤奶。'); // :547
    await era.printAndWait(
      `${arg_name}带着难以置信的表情，感受着触手的体液顺着乳头流入，最终融化到了脑髓里。`,
    ); // :548
    await era.printAndWait('不久之后他感到乳房发胀，触手顺势开始了榨乳。'); // :549
    await era.printAndWait(
      `不久之后，${arg_name}母乳开始无法抑制地从乳头喷出。`,
    ); // :550
    await era.print('喷奶经验+1'); // :551
    chara(arg).train.喷奶经验 += 1; // :552 EXP:ARG:54 喷奶经验
  }
  await era.printAndWait(`触手经验+${mon_num}`); // :554
  chara(arg).dungeon.触手经验 += mon_num; // :555 EXP:ARG:55 触手经验
  return 0; // :556
}

// @FAILY_RYOU男(ARG) // :558
/**
 * 妖精凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列妖精数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function faily_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  if (rand_n(2) === 0) {
    // :563-573 假阳具
    await era.printAndWait('『所谓的冒险者真是牢不可破啊！』'); // :564
    await era.printAndWait('妖精拿出了一根和自己身高相等的假阳具。'); // :565
    await era.printAndWait('『小哥哥来享受这边的穴吧！』'); // :566
    await era.printAndWait(`${arg_name}的惨叫回响在洞窟里……`); // :567
    await era.print(`肛门经验+${mon_num}`); // :568
    await era.print(`苦痛点数+${mon_num * 10}`); // :569
    await era.print(`恐怖点数+${mon_num * 10}`); // :570
    era.add(`juel:${arg}:9`, mon_num * 10); // :571 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :572 JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // :573 EXP:ARG:1 肛门经验
  } else {
    // :574-582 后处玩弄
    await era.printAndWait('『小哥哥的里面，是什么模样呢？』'); // :575
    await era.printAndWait(
      `${arg_name}的后处被妖精钻入了。妖精对他的反应感到相当有趣，不断地玩弄着后处内的皱褶。`,
    ); // :576
    await era.print(`肛门经验+${mon_num}`); // :577
    await era.print(`苦痛点数+${mon_num * 10}`); // :578
    await era.print(`恐怖点数+${mon_num * 10}`); // :579
    era.add(`juel:${arg}:9`, mon_num * 10); // :580 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :581 JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // :582 EXP:ARG:1 肛门经验
  }
  await era.waitAnyKey(); // :584 WAIT
  return 0; // :585
}

// @GIANT_RYOU男(ARG) // :587
/**
 * 巨人凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列巨人数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function giant_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const c131 = era.get(`cflag:${arg}:131`);

  // :591-619 畏怖阶段口上（PRINTDATAW 三档）
  if (c131 > 5) {
    // :592-599 隷属状態
    await era.printAndWait(
      pick(
        [
          '『瓦全的　变成了　灰机杯了呀』',
          '『巨人肉棒的　形状　几住了哇』',
          '『嘿嘿　已经　淋乱不糠了啊』',
          '『已经　不是巨人阴茎　就没滑　满足　了吗？』',
          '『和巨人肉棒　挺搭的　肉棒套子　嘛』',
        ],
        rand_n,
      ),
    ); // :594-598
  } else if (c131 > 3) {
    // :600-610 強畏怖状態
    await era.printAndWait(
      pick(
        [
          '『哈哈　熟络起来了欸』',
          '『又垒了呀……专用的 灰机杯』',
          '『正愁呢　来得正好』',
          '『没用的哦　向巨人　反抗啥的……』',
          '冒险者意识到了自己是无法抵抗巨人那压倒性的体型的矮小种族……',
          '面对巨大雄性的体型、冒险者的武器从手中落下、呆呆地跪坐在地上',
        ],
        rand_n,
      ),
    ); // :604-609
  } else {
    // :611-618 初见的畏惧
    await era.printAndWait(
      pick(
        [
          '『看起来值得凌辱一番。』',
          '『忍不住了！』',
          '『屁股反正也是能用的穴啊？』',
          '『要让我满足哦！』',
          '『真是太小啦！』',
        ],
        rand_n,
      ),
    ); // :613-617
  }

  if (mon_num === 1) {
    // :623-636 单只巨人
    await era.print('『喝下去哦』'); // :624
    await era.print(
      `${arg_name}侍奉着一只巨人，不过怎么张嘴都吞不进巨人的阴茎，只能舔舐着。`,
    ); // :625
    await era.print('绝顶了的巨人，把精液从头到脚浇了他一身。'); // :626
    await era.print('口交经验+1'); // :627
    await era.print('精液经验+1'); // :628
    chara(arg).dungeon.口交经验 += 1; // :629 EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += 1; // :630 EXP:ARG:20 精液经验

    // :632-633 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // :633
    }
    await era.waitAnyKey(); // :634 WAIT
    return 0; // :635
  }

  if (rand_n(3) === 0) {
    // :639-657 舔舐
    await era.printAndWait('『快点啊！』'); // :640
    await era.printAndWait(`${arg_name}拼命地舔舐着巨人的阴茎。`); // :641
    await era.printAndWait('他拼命地哀求着，请饶了他，不然一定会被玩坏。'); // :642
    await era.printAndWait(
      `必须快点搞定这${mon_num}只巨人，不然不知道他们什么时候会改变主意。`,
    ); // :643

    if (era.get(`talent:${arg}:52`)) {
      // :645-651 擅用舌头
      await era.printAndWait('『哦！小东西，你很擅长用舌头嘛！』'); // :647
      await era.printAndWait(
        `${arg_name}拼命地用舌头侍奉着，展现出天赋般的好技术。`,
      ); // :648
      await era.printAndWait(
        `巨人被他灵活的舌头弄射了，精液像喷泉一样，从${arg_name}的头顶淋到脚底。`,
      ); // :649
      mon_num *= 2; // :650
    }

    await era.print(`口交经验+${mon_num}`); // :653
    await era.print(`精液经验+${mon_num}`); // :654
    chara(arg).dungeon.口交经验 += mon_num; // :655 EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // :656 EXP:ARG:20 精液经验

    // :658-659 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // :659
    }
  } else if (rand_n(2) === 0) {
    // :660-683 贯穿
    await era.printAndWait('『哦！小东西，叫得不错嘛！』'); // :661
    await era.printAndWait(
      `${arg_name}的肛门被巨人强行用阴茎贯穿，撕裂的痛楚让他声嘶力竭地惨叫着，晕了过去。肛门处流出了鲜血。`,
    ); // :662
    await era.printAndWait('『又一个坏掉了吗？用点回复药或许可以再来几下。』'); // :663
    await era.printAndWait(
      `插坏了的肛门，用了回复药之后被继续玩弄着，直到满足了所有${mon_num}只巨人为止……`,
    ); // :664

    if (era.get(`talent:${arg}:34`)) {
      // :666-674 抵抗
      await era.printAndWait(
        `${arg_name}竭尽全力地企图爬走，但是被轻易地抓了回来。`,
      ); // :668
      await era.printAndWait('『喂！这里有个想逃跑的！抓住他！』'); // :669
      await era.printAndWait(
        `${arg_name}被巨人抓着四肢，那不设防的肛门，又一次被巨人的巨根插入了……`,
      ); // :670
      await era.print(`恐怖点数+${mon_num * 10}`); // :671
      era.add(`juel:${arg}:10`, mon_num * 10); // :672 JUEL:ARG:10 恐怖
    }

    await era.print(`肛门经验+${mon_num}`); // :676
    await era.print(`精液经验+${mon_num}`); // :677
    await era.print(`肛门扩张经验+${mon_num}`); // :678
    await era.print('异常经验+1'); // :679
    chara(arg).dungeon.肛门经验 += mon_num; // :680 EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // :681 EXP:ARG:20 精液经验
    chara(arg).dungeon.异常经验 += 1; // :682 EXP:ARG:50 异常经验
    chara(arg).dungeon.肛门扩张经验 += mon_num; // :683 EXP:ARG:53 肛门扩张经验
  } else {
    // :684-705 精液水盆
    await era.printAndWait('『我想到好主意了』'); // :685
    await era.printAndWait(
      '巨人们不知为何开始集体打飞机，集中射在巨大的水盆里。',
    ); // :686
    await era.printAndWait(`${arg_name}对未知状况非常恐惧。`); // :687
    await era.printAndWait('巨人端着一大盆精液，对他说，'); // :688
    await era.printAndWait('『不想死的话，就全部喝光。』'); // :689
    await era.printAndWait(`${arg_name}脸上血色褪尽。`); // :690

    if (era.get(`talent:${arg}:11`)) {
      // :692-702 反抗心
      await era.printAndWait(`${arg_name}用冷淡的眼神瞪着巨人，表示不从。`); // :694
      await era.printAndWait('『看来还不明白啊！』'); // :695
      await era.printAndWait(
        `巨人用巨大的手掌按着${arg_name}的头，直接把头按入水盆里。`,
      ); // :696
      await era.printAndWait('「咕噜，咕噜，咕咕噜」'); // :697
      await era.printAndWait(
        `巨人把他的头抓起来，那张满脸精液的脸上，再也见不到反抗的意思了。`,
      ); // :698
      await era.print(`恐怖点数+${mon_num * 10}`); // :699
      era.add(`juel:${arg}:10`, mon_num * 10); // :700 JUEL:ARG:10 恐怖
    }

    await era.print(`精液经验+${mon_num * 10}`); // :704
    chara(arg).dungeon.精液经验 += mon_num * 10; // :705 EXP:ARG:20 精液经验
  }
  await era.waitAnyKey(); // :707 WAIT
  return 0; // :708
}

// @MAN_RYOU男(ARG) // :710
/**
 * 魔族男人凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列魔族男人数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function man_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const c131 = era.get(`cflag:${arg}:131`);

  // :714-742 畏怖阶段口上（PRINTDATAW 三档）
  if (c131 > 5) {
    // :715-722 隷属状態
    await era.printAndWait(
      pick(
        [
          '『已经、离不开我们了吗』',
          '『嘿嘿、今儿也会好好疼你』',
          '『对黑暗世界、还习惯吗』',
          '『又来被侵犯了吗』',
          '『又来寻欢啊…不知道过去的自己见到现在这样、会怎么想啊？』',
        ],
        rand_n,
      ),
    ); // :717-721
  } else if (c131 > 3) {
    // :723-733 強畏怖状態
    await era.printAndWait(
      pick(
        [
          '『哦、又来啦』',
          '『怕不是故意输掉的吧？』',
          '『这么喜欢我们的肉棒吗？』',
          '『真是心口不一』',
          '冒险者默默服从着魔族男人们的要求……',
          '魔族男人们、缓缓地向冒险者靠近、冒险者将目光撇到了一边',
        ],
        rand_n,
      ),
    ); // :727-732
  } else {
    // :734-741 初见的畏惧
    await era.printAndWait(
      pick(
        [
          '『真是好家伙啊！』',
          '『真是喜欢啊！？』',
          '『好兄弟，欢迎来到黑暗的世界。』',
          '『别怨了，是你们先打下来的。』',
          '『有想过会变成这样吗？』',
        ],
        rand_n,
      ),
    ); // :736-740
  }

  if (rand_n(5) === 0) {
    // :747-761 翘屁股
    await era.printAndWait('『屁股露出来，抬高点！』'); // :749
    await era.printAndWait(
      `${arg_name}露出了屈辱的神色，向魔族男人翘起了屁股。`,
    ); // :750
    await era.printAndWait(
      `${arg_name}全裸地侍奉着兽人们的阴茎。只要喝掉所有${mon_num}个男人的精液的话，它们就答应不侵犯他的后穴………`,
    ); // :751
    await era.printAndWait('『嘴巴张开点！鸡鸡都被你弄脏了，弄干净！』'); // :752
    await era.printAndWait(`${arg_name}依照吩咐，用嘴巴侍奉着阴茎……`); // :753
    await era.print(`口交经验+${mon_num}`); // :754
    await era.print(`精液经验+${mon_num}`); // :755
    chara(arg).dungeon.口交经验 += mon_num; // :756 EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // :757 EXP:ARG:20 精液经验

    // :759-760 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // :760
    }
  } else if (rand_n(4) === 0) {
    // :762-828 肉便器
    await era.printAndWait(
      `${arg_name}被强行宣布为肉便器，全身都被写满了淫秽的话语。`,
    ); // :764

    await era.print(`${arg_name}的身上，被写着`); // :767
    await era.print('【最喜欢阴茎】'); // :768

    if (era.get(`talent:${arg}:22`) || era.get(`talent:${arg}:21`)) {
      await era.print('【性冷淡便器】'); // :771 感情淡薄・冷漠
    }
    if (era.get(`talent:${arg}:24`) || era.get(`talent:${arg}:30`)) {
      await era.print('【看似忠贞的便器出道】'); // :776 保守的・看重贞操
    }
    if (era.get(`talent:${arg}:42`)) {
      await era.print('【又粘又湿】'); // :781 容易湿
    }
    if (era.get(`talent:${arg}:70`) || era.get(`talent:${arg}:73`)) {
      await era.print('【愉悦的脸】'); // :786 接受快感・容易陷落
    }
    if (era.get(`talent:${arg}:121`) || era.get(`talent:${arg}:122`)) {
      await era.print('【有鸡鸡的奴隶】'); // :791 扶他・男人
    }
    if (rand_n(3) === 0) {
      await era.print('【操我】'); // :795
    } else if (rand_n(2) === 0) {
      await era.print('【肛门免费】'); // :797
    } else {
      await era.print('【母猪】'); // :799
    }
    await era.print('之类的话。'); // :802

    await era.printAndWait(
      '络绎不绝的魔族男人，将嘴巴、肛门等等地方都侵犯了，精液流得到处都是。',
    ); // :804
    await era.printAndWait(
      `当被最后一人抱着的时候，${arg_name}已经失去了任何表情，成为全身的穴都流出着精液的下流便器了。`,
    ); // :805
    await era.printAndWait(
      `地下城里，充斥着${mon_num}人份的精液和体液的异样臭味。魔族男人对原冒险者重生成为肉便器相当欢迎。`,
    ); // :806

    // :809-818 肌の色で分岐
    if (era.get(`talent:${arg}:244`)) {
      await era.printAndWait(`${arg_name}的蓝色肌肤，被沾满了精液……`); // :811 恶魔肌肤
    } else if (era.get(`talent:${arg}:253`)) {
      await era.printAndWait(
        `${arg_name}健康的褐色肌肤，与白浊的精液形成鲜明又淫靡的对比……`,
      ); // :814 褐色肌肤
    } else if (era.get(`talent:${arg}:255`)) {
      await era.printAndWait(`${arg_name}美丽的白皙肌肤被精液玷污了……`); // :817 白皙
    }

    await era.print(`肛门经验+${mon_num}`); // :820
    await era.print(`口交经验+${mon_num}`); // :821
    await era.print(`精液经验+${mon_num}`); // :822
    chara(arg).dungeon.肛门经验 += mon_num; // :823 EXP:ARG:1 肛门经验
    chara(arg).dungeon.口交经验 += mon_num; // :824 EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // :825 EXP:ARG:20 精液经验

    // :827-828 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // :828
    }
  } else if (rand_n(3) === 0) {
    // :829-851 灌肠
    await era.printAndWait('『明明是冒险者，却忍不住了吗？』'); // :830
    await era.printAndWait(
      `${arg_name}的肛门被灌入了灌肠液，忍受着强烈的便意。`,
    ); // :831
    await era.printAndWait(
      '『快点自慰！在漏出来之前自慰去了的话就带你上厕所！』',
    ); // :832
    await era.printAndWait(
      `${arg_name}拼命地自慰着，但是在这异常的状况中，却无法兴奋起来。`,
    ); // :833
    await era.printAndWait('肛门里的污物，终于无法忍耐地飞散而出。'); // :834
    await era.printAndWait(
      `魔族男人们看到这样，毫不留情地说着侮蔑的话，${arg_name}在这份屈辱中泣不成声。`,
    ); // :835

    if (era.get(`talent:${arg}:62`)) {
      // :837-842 反感污臭
      await era.printAndWait(
        `${arg_name}因自己拉出的东西的味道而皱起眉头，羞愧欲死。`,
      ); // :839
      await era.print(`苦痛点数+${mon_num * 10}`); // :840
      era.add(`juel:${arg}:9`, mon_num * 10); // :841 JUEL:ARG:9 苦痛
    }

    await era.print(`耻情点数+${mon_num * 10}`); // :844
    await era.print(`屈服点数+${mon_num * 10}`); // :845
    await era.print('自慰经验+1'); // :846
    await era.print('调教自慰经验+1'); // :847
    era.add(`juel:${arg}:8`, mon_num * 10); // :848 JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // :849 JUEL:ARG:6 屈服
    chara(arg).dungeon.自慰经验 += 1; // :850 EXP:ARG:10 自慰经验
    chara(arg).dungeon.调教自慰经验 += 1; // :851 EXP:ARG:11 调教自慰经验
  } else if (rand_n(2) === 0) {
    // :852-874 舔肛
    await era.printAndWait('『那个冒险者大人，在舔我的肛门哦！』'); // :853
    await era.printAndWait(
      `${arg_name}以舔肛门为代价，获得了魔族男人对于生命安全的保证。`,
    ); // :854
    await era.printAndWait('『你的尊严，真不值钱呢！』'); // :855
    await era.printAndWait(
      `${arg_name}拼命地侍奉着，听到这话，心里想死的心都有了，泪水在眼眶中打转。`,
    ); // :856
    await era.printAndWait(
      `侍奉结束之后，${arg_name}还被迫要说出淫秽的话语。他忍无可忍地大哭着，宣布自己喜欢舔肛。`,
    ); // :857

    if (era.get(`talent:${arg}:17`)) {
      // :859-863 低姿态
      await era.printAndWait(
        `自尊心低下的${arg_name}，拼命地说着自己是舔肛用奴隶。`,
      ); // :861
      // :862 Y += 10 —— 死代码（Y 全库无初始化与读取，见文件头）
    }
    if (era.get(`talent:${arg}:62`)) {
      // :865-869 反感污臭
      await era.printAndWait(`${arg_name}因为舔肛而恶心地吐了。`); // :867
      // :868 Y += 10 —— 死代码（同上）
    }

    await era.print(`苦痛点数+${mon_num * 10}`); // :871
    await era.print(`恐怖点数+${mon_num * 10}`); // :872
    era.add(`juel:${arg}:9`, mon_num * 10); // :873 JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // :874 JUEL:ARG:10 恐怖
  } else {
    // :875-899 娼妓
    await era.printAndWait('『这个为了保命就来者不拒的娼妓！』'); // :876
    await era.printAndWait(
      `${arg_name}屁股翘起，用屈辱的姿势承受着不知多少个魔族男人的肉棒。沐浴在他们的精液和骂声之中。`,
    ); // :877
    await era.printAndWait(
      '『说！说我是个相对于做冒险者，更喜欢做娼妓的淫乱贱婊！』',
    ); // :878
    await era.printAndWait(
      `${arg_name}在激烈的抽插中，不断地重复着屈辱的台词。`,
    ); // :879

    if (era.get(`talent:${arg}:17`)) {
      // :881-886 低姿态
      await era.printAndWait(
        `${arg_name}拼命地重复着淫乱的话语乞求饶命，美丽的脸庞在恐惧和淫媚中扭曲了……`,
      ); // :883
      await era.print(`屈服点数+${mon_num * 10}`); // :884
      era.add(`juel:${arg}:6`, mon_num * 10); // :885 JUEL:ARG:6 屈服
    }
    if (era.get(`abl:${arg}:21`) > 0) {
      // :888-893 抖M气质
      await era.printAndWait(`说着过激的言语，${arg_name}的心里产生了情欲。`); // :890
      await era.print(`欲情点数+${mon_num * 10}`); // :891
      era.add(`juel:${arg}:5`, mon_num * 10); // :892 JUEL:ARG:5 欲情
    }

    await era.print(`肛门经验+${mon_num}`); // :895
    await era.print(`精液经验+${mon_num}`); // :896
    chara(arg).dungeon.肛门经验 += mon_num; // :897 EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // :898 EXP:ARG:20 精液经验
  }
  await era.waitAnyKey(); // :900 WAIT
  return 0; // :901
}

// @BEAST_RYOU男(ARG) // :903
/**
 * 魔兽凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列魔兽数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function beast_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const c131 = era.get(`cflag:${arg}:131`);

  // :907-935 畏怖阶段口上（PRINTDATAW 三档）
  if (c131 > 5) {
    // :908-915 隷属状態
    await era.printAndWait(
      pick(
        [
          '冒险者从魔兽的发臭的气息中感受到了爱意',
          '魔兽慢慢地靠近了冒险者、爬到了土下座着的冒险者身上……',
          '冒险者对逐渐熟悉了与兽相交的自己惊诧不已',
          '被魔兽的眼睛凝视着、冒险者只能伏下身子、将腰抬了起来',
          '冒险者已经无法从野兽粗暴的交尾中、脱身了……',
        ],
        rand_n,
      ),
    ); // :910-914
  } else if (c131 > 3) {
    // :916-926 強畏怖状態
    await era.printAndWait(
      pick(
        [
          '冒险者渐渐习惯了魔兽的发臭的气息……',
          '魔兽静静的、像确认什么似的盯着冒险者',
          '冒险者这次也在与魔兽交尾的想象中、感受着奇妙的背德感',
          '魔兽的眼睛、像是在期待着什么似的、渐渐被欲望的颜色扭曲了',
          '冒险者想起了几次兽交的经历、股间硬了起来……',
          '魔兽静静的靠近冒险者、冷眼下看着一蹶不振的冒险者',
        ],
        rand_n,
      ),
    ); // :920-925
  } else {
    // :927-934 初见的畏惧
    await era.printAndWait(
      pick(
        [
          '『咕噜咕噜噜』',
          '冒险者吃不消野兽的臭味。',
          '冒险者还未能接受自己被野兽扑倒的事实。',
          '『嘎哦～呜～～』',
          '冒险者因野兽的粗暴而感到恐惧。',
        ],
        rand_n,
      ),
    ); // :929-933
  }

  await era.printAndWait('『噢！』'); // :939
  await era.printAndWait(`野兽们，开始轮番兽奸${arg_name}。`); // :940
  await era.printAndWait('「啊！呜！不要啊……啊啊啊！」'); // :941
  await era.printAndWait(
    `${arg_name}无法面对自己被野兽轮奸的事实，保持着母狗的姿态，呆若木鸡……`,
  ); // :942

  if (era.get(`talent:${arg}:314`) === 2) {
    // :944-949 人狼
    await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和野兽做爱……`); // :946
    await era.print(`欲情点数+${mon_num * 10}`); // :947
    era.add(`juel:${arg}:5`, mon_num * 10); // :948 JUEL:ARG:5 欲情
  }
  await era.print(`肛门经验+${mon_num}`); // :950
  await era.print(`苦痛点数+${mon_num * 10}`); // :951
  await era.print(`恐怖点数+${mon_num * 10}`); // :952
  chara(arg).dungeon.肛门经验 += mon_num; // :953 EXP:ARG:1 肛门经验
  era.add(`juel:${arg}:9`, mon_num * 10); // :954 JUEL:ARG:9 苦痛
  era.add(`juel:${arg}:10`, mon_num * 10); // :955 JUEL:ARG:10 恐怖
  await era.printAndWait(`兽奸经验+${mon_num}`); // :956
  chara(arg).dungeon.兽奸经验 += mon_num; // :957 EXP:ARG:56 兽奸经验
  return 0; // :958
}

// @BRAIN_RYOU男(ARG) // :960
/**
 * 食脑魔凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列食脑魔数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function brain_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const c131 = era.get(`cflag:${arg}:131`);

  // :964-991 畏怖阶段口上（PRINTDATAW 三档）
  if (c131 > 5) {
    // :965-972 隷属状態
    await era.printAndWait(
      pick(
        [
          '冒险者几经食脑魔脑改造后、不仅不抵抗了、还满是媚态地纠缠在一起……',
          '食脑魔在媚态的食粮跟前、发出了奇妙的笑声',
          '冒险者沉浸在大脑在改造所致的异次元的快乐中、空洞的双眼里闪烁着期待的神色……',
          '食脑魔舔了舔舌头。看来这份食粮、给它带来了捕食的喜悦',
          '冒险者对即将开始的异次元的快乐兴奋不已、甚至已经失禁了',
        ],
        rand_n,
      ),
    ); // :967-971
  } else if (c131 > 3) {
    // :973-982 強畏怖状態
    await era.printAndWait(
      pick(
        [
          '冒险者在食脑魔的脑改造后、逐渐感到习惯了……',
          '食脑魔在玩坏了的食粮跟前、发出了令人不寒而栗的笑声',
          '冒险者感到自己的大脑、已经到达了无可挽回的地步',
          '食脑魔在战栗的食粮跟前、舔了舔舌头。冒险者默默地看着这一切……',
          '冒险者想起了食脑魔所带来的异次元地快乐、咬紧了牙关……',
        ],
        rand_n,
      ),
    ); // :977-981
  } else {
    // :983-990 初见的畏惧
    await era.printAndWait(
      pick(
        [
          '冒险者对食脑魔早有耳闻，吓得屁滚尿流了。',
          '冒险者狂乱地挣扎着，企图逃避食脑魔。',
          '冒险者拼命地乞求着饶命。',
          '冒险者直接精神崩溃，痴痴地笑着。',
          '冒险者因为过度的恐惧而失禁了。',
        ],
        rand_n,
      ),
    ); // :985-989
  }

  if (rand_n(2) === 0) {
    // :995-1003 处女封印
    await era.printAndWait('食脑魔咬住冒险者的头，开始支配他的精神。'); // :997
    await era.printAndWait('「啊…啊…啊…啊…啊……」'); // :998
    await era.printAndWait(`${arg_name}眼珠上翻，伸出舌头，脱粪了。`); // :999
    await era.print(`肛门经验+${mon_num * 10}`); // :1000
    await era.print('异常经验+1'); // :1001
    chara(arg).dungeon.异常经验 += 1; // :1002 EXP:ARG:50 异常经验
    chara(arg).dungeon.肛门经验 += mon_num * 10; // :1003 EXP:ARG:1 肛门经验
  } else {
    // :1004-1010 触手入脑
    await era.printAndWait(
      '食脑魔的触手缠绕着冒险者，他死命地挣扎，却无法挣脱。',
    ); // :1005
    await era.printAndWait(
      `食脑魔的触手，直接突入到${arg_name}的脑子里，往脑髓注入媚药成分。`,
    ); // :1006
    await era.printAndWait(`${arg_name}被过度的快感弄失禁了，成了废人。`); // :1007
    await era.printAndWait('幸好，躯干还是完好的。'); // :1008
    await era.print('异常经验+1'); // :1009
    chara(arg).dungeon.异常经验 += 1; // :1010 EXP:ARG:50 异常经验
  }
  await era.waitAnyKey(); // :1012 WAIT
  return 0; // :1013
}

// @HORSE_RYOU男(ARG) // :1015
/**
 * 马凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号（原作 ARG）
 * @param {number} mon_num 该列马数量（原作 E:(B+99)）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function horse_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const c131 = era.get(`cflag:${arg}:131`);

  // :1019-1046 畏怖阶段口上（PRINTDATAW 三档）
  if (c131 > 5) {
    // :1020-1027 隷属状態
    await era.printAndWait(
      pick(
        [
          '冒险者不仅不再抵抗与马的交尾、甚至带着期待的眼神伸手触摸着马的阴茎……',
          '马凑近了败倒的冒险者、将勃起的阴茎伸到了眼前',
          '冒险者意识到了自己变得毫不抵触与马相交的事实、露出了令人作呕的笑容……',
          '马粗暴地对待冒险者、冒险者也好不挣扎的接受了……',
          '冒险者对马的粗暴行径、在心中感到了一丝悸动……',
        ],
        rand_n,
      ),
    ); // :1022-1026
  } else if (c131 > 3) {
    // :1028-1037 強畏怖状態
    await era.printAndWait(
      pick(
        [
          '冒险者放弃了抵抗、轻轻戳了戳勃起的马阴茎……',
          '马看着放弃抵抗的冒险者、轻蔑地笑了起来',
          '冒险者回想起与马相交的自己、惊诧不已',
          '马大声嘶吼着、冒险者胆怯不已、手中的武器落在了地上……',
          '冒险者脑中铭刻下了马的粗暴行径、变得无法抵抗了……',
        ],
        rand_n,
      ),
    ); // :1032-1036
  } else {
    // :1038-1045 初见的畏惧
    await era.printAndWait(
      pick(
        [
          '『唔哦哦！』',
          '冒险者吃不消马的臭味。',
          '冒险者还未能接受自己被马扑倒的事实。',
          '『吁！』',
          '冒险者因马的粗暴而感到恐惧。',
        ],
        rand_n,
      ),
    ); // :1040-1044
  }

  await era.printAndWait(
    '养马人给马的阴茎施加了缩小的魔法，让它变小至适应肛门的大小。',
  ); // :1050
  await era.printAndWait(
    '『你很有素质嘛～看在这个份上，就用魔法让你好受些。』',
  ); // :1051
  await era.printAndWait(`${arg_name}不得不用肛门承受着兽奸……`); // :1052

  if (era.get(`talent:${arg}:314`) === 2) {
    // :1054-1059 人狼
    await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和马做爱……`); // :1056
    await era.print(`欲情点数+${mon_num * 10}`); // :1057
    era.add(`juel:${arg}:5`, mon_num * 10); // :1058 JUEL:ARG:5 欲情
  }
  await era.print(`肛门经验+${mon_num}`); // :1061
  await era.print(`精液经验+${mon_num}`); // :1062
  await era.printAndWait(`兽奸经验+${mon_num}`); // :1063
  chara(arg).dungeon.肛门经验 += mon_num; // :1064 EXP:ARG:1 肛门经验
  chara(arg).dungeon.精液经验 += mon_num; // :1065 EXP:ARG:20 精液经验
  chara(arg).dungeon.兽奸经验 += mon_num; // :1066 EXP:ARG:56 兽奸经验
  await era.waitAnyKey(); // :1067 WAIT
  return 0; // :1068
}

module.exports = {
  STUBBED_CALLS,
  orc_ryou_man,
  slime_ryou_man,
  insect_ryou_man,
  ivy_ryou_man,
  syokusyu_ryou_man,
  faily_ryou_man,
  giant_ryou_man,
  man_ryou_man,
  beast_ryou_man,
  brain_ryou_man,
  horse_ryou_man,
};
