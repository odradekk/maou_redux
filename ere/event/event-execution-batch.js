/**
 * @file 处刑改写：批量处刑与自动处刑（issue #543，阶段 6 S2）。
 *
 * 源: target/ERB/魔改新增/處刑改寫.ERB  @批量处刑（:3-417）/
 *     @自動處刑（:419-433）/@自動處刑1（:435-498）
 *
 * 两个玩家入口接在本文件：主菜单 [103]（page/page-shop.js 的 usershop，
 * 原作 SHOP ver1.0.2.ERB:110-112 的 CALL 批量处刑）与 @EVENTTURNEND 的
 * FLAG:5 位 3 开关（system/turnend-settle.js，设置页 [3] 勇者自动处刑）。
 * 处刑本体（BANISHMENT/PUBLIC_EXECUTION/GROTESQUE/MUSEUM 与公共结算）是
 * #348 落的真身，本文件只做入口、批量循环与三处内联分支（肉便器/士兵化/
 * 固定示众/释放），下游直接复用不重写。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - CLEARLINE 局部重绘与补行排版不镜像（ere 控制台是滚动视图，翻页走
 *     整屏重绘——page-select-target.js 的同款先例）；`,N,LEFT/RIGHT` 列宽
 *     填充不复刻（按钮正文被引擎折叠连续空白，PR #30/#53 同款）；
 *   - 列表行渲染为按钮（原作纯文本 + INPUT，实机点不动——PR #53 通则），
 *     快捷键沿用原作编号 = 角色 ID；[SP]（青）与【处刑认可】（红）的
 *     SETCOLOR 不复刻——按钮无法只染标签本身，整按钮染色会曲解原作
 *     意图（page-select-target.js 沦陷标签的同款裁定）；由此引擎只回传
 *     已打印编号，原作「键入未显示编号也能切换标签」的隐藏通道不可达；
 *   - 列表显示条件（:33）读 EX_FLAG:9000 位 1，与 [101] 水晶球开关的
 *     位 2（:109-110/:143）不同位：位 1 在 MOD_SWITCH 里是打工开关，
 *     MOD 判死不移植后恒 0（#540 范围决定 2），EX_TALENT:2 的角色因此
 *     不可见——照原作读写、不拆分（该位在原作无 MOD 时同样恒 0）；
 *   - 删除角色后原作「COUNT = 1; TARGET = 0」的重扫依赖 DELCHARA 的序号
 *     重排（每删一人，当轮末位角色被跳过一次）；ere 是稳定角色 ID（#21
 *     扁平化），重扫等价为「从头再扫一遍剩余角色」——序号重排的跳位是
 *     原作缺陷的副作用，不扩散（event-execution-common.js 对双重 DELCHARA
 *     的同款裁定）。求饶/受限播报在重扫中重复出现，与原作一致；
 *   - 士兵化与固定示众不清处刑标签（原作如此），下轮扫描以「已经士兵化
 *     了」播报跳过——1:1；
 *   - MUSEUM.ERB:46-48 的取消分支条件（`;ELSEIF RESULT == 100`）被注释：
 *     47-48 两行仍属上面那条 `ELSEIF RESULT >= 10 && RESULT != 100` 的分支
 *     体，而该体第一条就是 `GOTO INPUT_LOOP`，故取消体不可达；0-9 与隐藏的
 *     100 按「假条件落到 ENDIF 之后」执行，处理体（MUSEUM.ERB:51-1108）可达
 *     ——ere 的 museum（#347）按处理体实现，与之一致，本文件直接复用（原
 *     登记 #14 的那条结论说反了，已在 #14 下订正）；
 *   - NO_PAGE（:8）是函数静态变量：`JUMP 批量处刑` 只重执行 :11-14，只显式
 *     重置 处刑中/可处刑/TFLAG:16，故翻页位置跨重启与跨调用都保留（见
 *     NUM_PAGE 下方的模块级 no_page）；
 *   - 处刑会话要 TFLAG:16/510/530/500（口上改写通道）。EraElectron 的
 *     tflag 桶只在 beginTrain/endTrain 之间存在，调教外二段寻址落
 *     「key error in getter/setter」（app.asar 寻址层；test/
 *     tstr-train-table.test.js 的正对照）；原作在商店上下文直接读写
 *     TFLAG（Emuera 的 TFLAG 是常驻全局）。为整段会话开一个空窗口：
 *     beginTrain(0) 只建表，gotjewel 恒空、endTrain 的结算是精确无操作
 *     （turnend-settle.js 的同款先例；对照 game-train.js 为单句口上选
 *     闭包通道而非开窗的裁定——这里是四条通道的整段交互会话，开窗的
 *     改动面更小）。
 */

'use strict';

const era = require('#/era-electron');
const { search_family } = require('#/chara/chara-family');
const { exucution_koujo } = require('#/kojo/kojo-system');
const {
  video_maturo,
  video_maturo2,
} = require('#/system/stronghold/sell-video');
const { get_job_name } = require('#/page/page-select-target');
const { banishment } = require('#/event/event-banishment');
const {
  apply_prestige,
  dispose_character,
  get,
  release_equipment,
  she,
} = require('#/event/event-execution-common');
const { grotesque } = require('#/event/event-grotesque');
const { museum } = require('#/event/event-museum');
const { public_execution } = require('#/event/event-public-execution');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const era_exflag = require('#/era-utils/era-exflag');
const era_flag = require('#/era-utils/era-flag');
const { chara_callname } = require('#/utils/callname-utils');

// #DIM CONST NUM_PAGE = 25（:10）
const NUM_PAGE = 25;

/**
 * #DIM NO_PAGE = 0（:8）：Emuera 的函数静态变量，跨 `JUMP 批量处刑` 与跨
 * 调用都保留——技能指南 user-defined-variables.md「静态变量」：函数退出之后
 * 值不会被重置，需要重置的变量要在函数开头显式初始化；原作 JUMP 段（:12-14）
 * 只显式重置 处刑中/可处刑/TFLAG:16，NO_PAGE 不在其中。故翻页位置在重启
 * （收藏剃除、0-3 号取消）与再次进入处刑时都保留（1:1，不是遗漏）。
 */
let no_page = 0;

/** 方法界面循环的出口信号（对应原作两个 GOTO 目标）。 */
const DONE = Symbol('done'); // 回列表（GOTO 处刑介面）
const RESTART = Symbol('restart'); // 整界面重启（JUMP 批量处刑）

function default_rand(n) {
  return Math.floor(Math.random() * n);
}

/**
 * @SP（img.ERB:249-251，#FUNCTION）：特殊角色判定。定义住在判死的立绘
 * 文件里，但本体是纯素质查询、批量处刑列表要用，照式移植。
 * @param {number} cid 角色 ID
 * @returns {boolean}
 */
function sp_chara(cid) {
  return (
    [165, 167, 168, 169, 170, 171].some((id) => get(`talent:${cid}:${id}`)) ||
    [4, 101, 102, 103, 104].some((id) => get(`ex_talent:${cid}:${id}`))
  );
}

/**
 * 列表显示条件（:33）：状态 0/7，且非 EX_TALENT:1（EX_TALENT:2 者需
 * EX_FLAG:9000 位 1——见文件头「EX_FLAG 位」节）。
 * @param {number} cid
 * @returns {boolean}
 */
function listable(cid) {
  const state = get(`cflag:${cid}:1`);
  return (
    (state === 0 || state === 7) &&
    (!get(`ex_talent:${cid}:1`) ||
      (get(`ex_talent:${cid}:2`) && (era_exflag.mod_switch_bits & 2) !== 0))
  );
}

/**
 * 一行角色（:34-48）：名前 / 职业 / 等级 + 标签。CFLAG:0 = 出售资格、
 * CFLAG:700 = 收藏、TALENT:254 = 魔之刻印（士兵化）、CFLAG:777 = 待处刑
 * 标签（文件头注释 :2）。
 * @param {number} cid
 * @returns {string}
 */
function roster_row(cid) {
  let row = `${chara_callname(cid)} ${get_job_name(cid)} LV${get(`cflag:${cid}:9`)}`;
  if (get(`cflag:${cid}:0`) > 0 && cid !== 0) row += ' [售]';
  if (get(`cflag:${cid}:700`)) row += ' [☆]';
  if (get(`talent:${cid}:254`)) row += ' [兵]';
  if (sp_chara(cid)) row += ' [SP]';
  if (chara(cid).patch.待处刑标签) row += ' 【处刑认可】';
  return row;
}

/**
 * 角色列表（:25-52）：按位置开窗每页 25 行，快捷键 = 角色 ID。
 * @param {number[]} added 已加入角色（era.getAddedCharacters()）
 * @param {number} no_page 页码（0 起）
 */
function print_roster(added, no_page) {
  added.forEach((cid, position) => {
    // FOR COUNT, NO_PAGE*NUM_PAGE + 1, (NO_PAGE+1)*NUM_PAGE + 1（:25）：
    // 位置 0 是魔王（COUNT == MASTER），窗口从 1 号位起
    if (
      position < no_page * NUM_PAGE + 1 ||
      position > (no_page + 1) * NUM_PAGE
    ) {
      return;
    }
    if (cid === 0) return;
    // 已在示众台处刑剃除（:29-31）
    if (chara(cid).invasion.状态 === 8) return;
    if (listable(cid)) era.printButton(roster_row(cid), cid);
  });
}

/**
 * $待处刑（:117-137）：找下一个带标签目标。士兵化的两类受限目标先播报
 * 后跳过（NO 17-40 = 【不受洗脑】的角色段，TALENT:254 = 已士兵化）。
 * @param {number} method TFLAG:16 的当前值（口上可改写）
 * @returns {Promise<number>} 目标角色 ID；无目标返回 -1
 */
async function next_tagged(method) {
  for (const cid of era.getAddedCharacters()) {
    // 已在示众台处刑剃除（:118-122）
    if (chara(cid).invasion.状态 === 8) continue;
    if (method === 5 && chara(cid).patch.待处刑标签) {
      const unbrainwashable = cid >= 17 && cid <= 40; // INRANGE(NO,17,40)
      const soldiered = get(`talent:${cid}:254`) !== 0;
      if (unbrainwashable) {
        await era.printAndWait(
          `${chara_callname(cid)}拥有【不受洗脑】，无法进行士兵化洗脑。`,
        );
      }
      if (soldiered) {
        await era.printAndWait(`${chara_callname(cid)}已经士兵化了。`);
      }
      if (unbrainwashable || soldiered) continue;
    }
    if (chara(cid).patch.待处刑标签) {
      era.println(); // PRINTL（:130-132）
      return cid;
    }
  }
  return -1;
}

/**
 * $进行处刑 的 4 号分支（:191-304）：做成肉便器。与旧 @EXECUTION 的同段
 * （event-execution.js 的 make_toilet）三处不同：本作改写版用 SHE(A) 代
 * 硬编码「她」（:208/:234 等）、C 敏感段按扶她/男人分支阴茎文案（:246-252）、
 * SUISEI_STR:A 归档末路标题（:303）。结尾接公共结算（:361-394 的装备
 * 回收 + 除名 + 经验），经验文案用本文件的写法（:405-406）。
 * @param {number} cid
 */
async function make_toilet(cid) {
  game.invasion.肉便器数 += 1; // FLAG:83（:192）
  apply_prestige(cid); // EX_FLAG:99（:193-199）
  const family_id = search_family(cid); // FAMILY = CFLAG:A:605（:200-204）
  const name = chara_callname(cid);
  const prelude = get(`talent:${cid}:85`)
    ? `深爱着你的${name}不知道自己为什么要被做成肉便器，不停地高叫着你的名字，请求饶恕。`
    : '';
  await era.printAndWait(
    `${prelude}但${chara_callname(0)}依然给${name}烙上了封锁所有力量的封印，`,
  );
  await era.printAndWait(
    `被吸收了全部力量的${she(cid)}，身体变成淫靡的肉块了。`,
  );
  await era.printAndWait('作为地下城里怪物的慰问品被使用着，');
  await era.printAndWait('今后别说重新当勇者，就连看一眼阳光也不可能了吧。');

  if (get(`talent:${cid}:原种族`) === 1) {
    await era.printAndWait(`精灵族的${name}在丑陋的兽人中广受好评。`);
  }
  if (get(`abl:${cid}:32`) > 0 || get(`talent:${cid}:擅用舌头`)) {
    await era.printAndWait(
      `${name}作为精液便器，每天都心怀欢喜地把精液喝光了。`,
    );
  }
  if (get(`abl:${cid}:33`) > 0 || get(`abl:${cid}:22`) > 2) {
    await era.printAndWait(
      `作为女子便器的${name}获得了很高的评价。阴部、肛门有污垢也毫不在意，老老实实地把她们舔高潮了。`,
    );
  }
  if (get(`abl:${cid}:21`) > 0) {
    await era.printAndWait(
      `沐浴在骂声中的${name}腿间开始湿润，脸上浮现起恍惚的笑容。`,
    );
  }
  if (get(`abl:${cid}:17`) > 0) {
    await era.printAndWait(
      `${name}在地下城的大街上展露痴态。不管是不是怪物，对所有路过的客人，均热情献媚。`,
    );
  }
  if (get(`abl:${cid}:16`) > 0) {
    await era.printAndWait(
      `完全崩坏了的${name}连自我都失去了，只有在侍奉肉棒时能感觉到喜悦。`,
    );
  }
  if (get(`abl:${cid}:2`) > 3) {
    await era.printAndWait(
      `被数之不尽的阴茎抽插，${name}的私处完全扩张，失去弹性了。最近的对象，全是巨魔和马这样有巨根的。`,
    );
  }
  if (get(`abl:${cid}:3`) > 3) {
    await era.printAndWait(
      `已经算不上是性器官，${name}的肛门，被极限扩张，关都关不上了。可是哪怕这样，只要有肉棒在直肠射精，${she(cid)}还是兴奋得快疯了似得。`,
    );
  }
  if (get(`talent:${cid}:85`)) {
    await era.printAndWait(`${name}把所有的阴茎都幻想成深爱的你的阴茎的模样。`);
  }
  if (get(`talent:${cid}:104`) || get(`talent:${cid}:232`)) {
    await era.printAndWait(
      `${name}对被什么东西插入并不在意，用卑微的话语哀求着打种。`,
    );
  }
  if (get(`talent:${cid}:106`) || get(`talent:${cid}:233`)) {
    await era.printAndWait(
      `${name}的肛门特别有感觉，恶魔们特意把${she(cid)}的肛门改造成能怀孕的样子。`,
    );
  }
  if (get(`talent:${cid}:102`) || get(`talent:${cid}:230`)) {
    if (get(`talent:${cid}:121`) || get(`talent:${cid}:122`)) {
      await era.printAndWait(
        `${name}的阴茎膨胀了起来，一鞭子下去，${she(cid)}就精液四射，口水横流地绝顶了。`,
      );
    } else {
      await era.printAndWait(
        `${name}的阴蒂又大又肿，一鞭子下去，${she(cid)}就爱液四射，口水横流地绝顶了。`,
      );
    }
  }
  if (get(`talent:${cid}:108`) || get(`talent:${cid}:231`)) {
    await era.printAndWait(
      `${name}的乳头被恶魔们改造过，现在可以插入乳头里性交了。`,
    );
  }
  if (get(`talent:${cid}:241`) || get(`talent:${cid}:250`)) {
    await era.printAndWait(
      `有魔力的${name}，头部完全被头罩包裹，强制地被削弱了魔力。`,
    );
  }
  if (get(`talent:${cid}:242`)) {
    await era.printAndWait(
      `有神圣之力的${name}，被恶魔们强制肛交了无数次，完全堕落为恶魔的力量了。`,
    );
  }
  if (get(`talent:${cid}:121`) && game.invasion.肉便器数 >= 2) {
    const penis = get(`talent:${cid}:318`);
    if (penis === 1) {
      era.print(`扶她巨根的${name}被改造成更大的阴茎，`);
      await era.printAndWait('奉命去侵犯其它的肉便器了。');
    } else if (penis === 2) {
      era.print(`扶她短小包茎的${name}为了发泄性欲压在其它肉便器身上。`);
      await era.printAndWait('但即使激烈地摆动腰身，也无法令对方满足。');
    } else if (penis === 3) {
      era.print(`扶她包茎的${name}哪怕洗澡，也不剥开包皮清洗里面的污垢。`);
      await era.printAndWait('而是让其它肉便器用口服侍清洁。');
    } else {
      era.print(`扶她的${name}积极地侵犯着其它肉便器，`);
      await era.printAndWait('巨大的阴囊生产了大量的精液，射到周围都是。');
    }
  }
  const charm_lines = {
    12: '作为魅力点的美乳，现在变成一堆丑陋膨胀的肉块了。',
    14: '作为魅力点的臀部曲线，现在变成一团下流膨胀的肉块了。',
    21: '作为魅力点的性器，现在正变成奇怪的肉块。',
    22: '作为魅力点的光泽的头发，现在完全褪色了。',
    23: '作为魅力点的大屁股，现在变成了充满下流气息的成熟桃子。',
  };
  const charm_line = charm_lines[get(`talent:${cid}:312`)];
  if (charm_line) await era.printAndWait(charm_line);
  if (get(`talent:${cid}:317`) === 4 || get(`talent:${cid}:317`) === 11) {
    await era.printAndWait(
      `${name}双眼空虚，在重复着谁的名字。也许正在妄想和爱人拥抱吧。`,
    );
  }
  era.print(`现在的肉便器数量：${game.invasion.肉便器数}`);
  const title = `肉便器${name}`;
  if (family_id >= 0) era.set(`cstr:${family_id}:5`, title); // :302
  era.set('tstr:30', title);
  era.set(`videoarchive:${cid}`, title); // SUISEI_STR:A（:303）
  video_maturo(cid);
  return dispose_character(cid, {
    experience_message: (experience) =>
      `《封印吸收了力量，使你获得了${experience}的经验值！》`,
  });
}

/**
 * 5 号分支：士兵化（:305-318）。与旧 @EXECUTION 的差异：意识残存句改写、
 * 战力变化带具体数值、可迎击播报、SUISEI_STR 归档。不除名（GOTO
 * LABEL_EXIT，公共结算被跳过）。
 * @param {number} cid
 */
async function keep_as_soldier(cid) {
  const name = chara_callname(cid);
  chara(cid).chara.魔之刻印 = 1; // TALENT:254（:306）
  era.print(`在${name}的身体上刻上了服从的刻印，`);
  await era.printAndWait(
    '只残留一点点的意识和记忆，随时可以下命令去把勇者杀光。',
  );
  chara(cid).chara.基础攻击 = Math.trunc(chara(cid).chara.基础攻击 / 2); // :309
  chara(cid).chara.基础防御 = Math.trunc(chara(cid).chara.基础防御 / 2); // :310
  era.print(
    `法术的副作用导致其战斗力下降了！攻击变成${chara(cid).chara.基础攻击}，防御变成${chara(cid).chara.基础防御}`, // :311
  );
  era.print(`${name}可以于迎击名单中派遣出场了！`); // :312
  const title = `魔王傀儡${name}`;
  era.set(`cstr:${cid}:30`, title); // CSTR:30（:313，无下标 = TARGET）
  era.set('tstr:30', title);
  era.set(`videoarchive:${cid}`, title); // SUISEI_STR:A（:315-317）
  video_maturo2(cid);
}

/**
 * 6 号分支：固定示众（:321-336）。CFLAG:1 = 8，之后不再列入任何扫描。
 * @param {number} cid
 */
async function keep_on_display(cid) {
  const name = chara_callname(cid);
  chara(cid).invasion.状态 = 8; // :320
  era.print(`把${name}的屁股抬高，扣在固定的枷锁上，`);
  await era.printAndWait('任由怪物们发泄性欲，');
  if (get(`talent:${cid}:9`) === 1) {
    await era.printAndWait('被玩坏了的奴隶，什么都意识不到，在痴笑着。');
  } else if (get(`talent:${cid}:76`) === 1) {
    await era.printAndWait('淫乱的奴隶，不如说，正在享受现在的样子。');
  } else {
    await era.printAndWait('悲哀的奴隶，对今后将发生的制裁害怕极了。');
  }
  const title = `魔族公厕${name}`;
  era.set(`cstr:${cid}:30`, title);
  era.set('tstr:30', title);
  era.set(`videoarchive:${cid}`, title); // SUISEI_STR:A（:332）
  video_maturo2(cid);
}

/**
 * 7 号分支：消除记忆后释放（:337-356）。没收所持金、复位冒险状态、夹持
 * 善恶/好感、清处刑标签；不除名。
 * @param {number} cid
 */
async function release_without_memory(cid) {
  const name = chara_callname(cid);
  const money = chara(cid).dungeon.所持金; // CFLAG:580
  await era.printAndWait(
    `将${name}身上${money}的金钱掏空之后，并清除所有地下城的记忆丢出去了。`,
  );
  await era.printAndWait(`昏昏沉沉的${name}醒来之后，再次开始了冒险……`);
  era_flag.money += money; // MONEY（:339）
  era_exflag.legit_money += money; // EX_FLAG:4444（:340）
  chara(cid).dungeon.所持金 = 0; // :341
  // 侵入阶层・侵攻度・侵攻中・再起点（:343-346）
  chara(cid).dungeon.侵攻阶层 = 1;
  era.set(`cflag:${cid}:502`, 0);
  chara(cid).invasion.状态 = 2;
  chara(cid).dungeon.再起点 = 3;
  if (chara(cid).chara.善恶值 < -50) chara(cid).chara.善恶值 = -50; // :349-350
  if (chara(cid).chara.好感度 > 20) chara(cid).chara.好感度 = 20; // :352-353
  chara(cid).patch.待处刑标签 = 0; // 去除处刑标签（:354-356）
}

/**
 * $进行处刑（:159-417）：对单个目标执行当前处分。口上先于分发（:163-167，
 * EXUCUTION_KOUJO 可改写 TFLAG:16 改道）；0-3 号的下游各自完成除名，
 * 取消（输入 100）时置 TFLAG:16 = -1 并 JUMP 回批量处刑（BANISHMENT.ERB:
 * 41-43 等）——本函数以 restart 信号回传。
 * @param {number} cid 目标
 * @param {number} method TFLAG:16 的进入值
 * @param {Function} rand_n 随机源
 * @returns {Promise<{restart: boolean, method: number}>}
 */
async function execute_one(cid, method, rand_n) {
  // TARGET = A（:161）
  era_flag.target = cid;
  game.event.犬射精或处刑口上 = method;
  await exucution_koujo(cid, method, rand_n); // TRYCALLFORM EXUCUTION_KOUJO_K{N}
  const result = game.event.犬射精或处刑口上;

  const name = chara_callname(cid);
  if (result === 0) {
    era.print(`${chara_callname(0)}把${name}从地下城里永久驱逐了。`);
    await banishment(cid, rand_n);
  } else if (result === 1) {
    era.print(`${chara_callname(0)}把${name}公开处刑了。`);
    await public_execution(cid, rand_n);
  } else if (result === 2) {
    await era.printAndWait(`${name}被带到了工作室……`);
    await museum(cid, rand_n);
  } else if (result === 3) {
    era.print(`${chara_callname(0)}决定让${name}品尝真正的痛苦…`);
    await era.printAndWait('　　　　　　　　　　< ※ 注 意 ！ ※ >');
    await era.printAndWait('（之后将发生非常黄暴的事！！）');
    await grotesque(cid, rand_n);
  } else if (result === 4) {
    await make_toilet(cid);
  } else if (result === 5) {
    await keep_as_soldier(cid);
  } else if (result === 6) {
    await keep_on_display(cid);
  } else if (result === 7) {
    await release_without_memory(cid);
  }
  // 0-3 号下游的取消信号：TFLAG:16 被置 -1 后 JUMP 回批量处刑（BANISHMENT
  // 等各自的取消支）。只在这一段认它——口上把处分改写成 0-7 之外的值时，
  // 原作走 ELSE → LABEL_EXIT → 待处刑 再入同一目标（死循环，全库无口上
  // 写此类值），移植照搬不额外设防。:14 的 `TFLAG:16 = -1` 初值无读者
  // （每次分发前 execute_one 都会写它），未镜像。
  if (result >= 0 && result <= 3 && game.event.犬射精或处刑口上 === -1) {
    return { restart: true, method: -1 };
  }
  return { restart: false, method: game.event.犬射精或处刑口上 };
}

/**
 * $处刑介面2（:90-147）：选择处分方式并批量执行带标签目标。
 * @param {Function} rand_n 随机源
 * @returns {Promise<symbol>} DONE 回列表 / RESTART 整界面重启
 */
async function method_screen(rand_n) {
  for (;;) {
    era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =（:11）：会话级线型
    era.print([
      { content: '注意：以下0～4项的处刑' },
      { content: '会让人物永远从列表中消失', color: '#ffff33' },
      { content: '（但可获得勋章或经验）' },
    ]);
    era.print('      开启水晶球的话，则可记录0～6项的处刑影像');
    era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =（:11）：会话级线型
    [
      '流放出地下城',
      '公开处刑',
      '博物馆展品',
      '施行猎奇向处刑',
      '做成肉便器',
      '士兵化：让不可迎击的奴隶变成可迎击',
      '固定示众：将奴隶绑在示众台上，任怪物凌辱',
      '消除记忆后释放：此项可没收此奴隶身上所有的现金',
    ].forEach((label, index) => {
      era.printButton(label, index);
    });
    era.println(); // PRINTL（:106-108）
    era.printButton('停止', 100);
    era.printButton(
      `水晶球记录：${(era_exflag.mod_switch_bits & 4) !== 0 ? '开' : '关'}`,
      101,
      {
        color: (era_exflag.mod_switch_bits & 4) !== 0 ? '#ffffff' : '#646464',
      },
    );

    const choice = await era.input(); // INPUT（:110-114）
    if (choice >= 0 && choice <= 7) {
      // CASE 0 TO 7：处刑中 = 1；TFLAG:16 = RESULT（:115-116）
      let method = choice;
      for (;;) {
        const cid = await next_tagged(method); // $待处刑
        if (cid < 0) break;
        const outcome = await execute_one(cid, method, rand_n);
        if (outcome.restart) return RESTART;
        // 口上/下游改写的 TFLAG:16 延续到下一目标（原作全局变量的语义）
        method = outcome.method;
      }
      return DONE; // 处刑中 = 0；GOTO 处刑介面（:138-139）
    }
    if (choice === 100) return DONE; // CASE 100 → GOTO 处刑介面（:140-141）
    if (choice === 101) {
      era_exflag.mod_switch_bits ^= 4; // INVERTBIT EX_FLAG:9000,2（:143）
      continue; // GOTO 处刑介面2
    }
    return DONE; // CASEELSE → GOTO 处刑介面（:145-146）
  }
}

/**
 * @批量处刑（:3-417）：复选处刑对象的主菜单入口。
 * @param {Function} [rand_n] 随机源（透传给 0-3 号下游）
 * @returns {Promise<number>} 0（[1999] 結束处刑 = BEGIN SHOP 的等价物）
 */
async function batch_execution(rand_n = default_rand) {
  // 处刑会话的调教窗口（文件头「tflag 通道」节）
  era.beginTrain(0);
  try {
    restart: for (;;) {
      screen: for (;;) {
        // $处刑介面（:15-73）
        const added = era.getAddedCharacters();
        const charanum = added.length; // CHARANUM
        era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =（:11）
        if (
          game.event.装饰品数 < 20 && // FLAG:84
          era_flag.day_count < 60 && // DAY
          !get('talent:0:329') // TALENT:MASTER:329【造型王】
        ) {
          era.print(
            `<${60 - era_flag.day_count}天以内再展出${20 - game.event.装饰品数}名勇者到博物馆将解锁实绩！>`,
          );
        }
        era.println(); // PRINTL（:19-21）
        era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =（:11）：会话级线型
        era.print('请选出处刑对象(可复选)');
        era.print('标签：[售]可卖出  [☆]收藏中  [兵]已士兵化  [SP]特殊角色');
        era.drawLine({ isSolid: true }); // CUSTOMDRAWLINE =（:11）：会话级线型
        print_roster(added, no_page);
        era.drawLine({ isSolid: true }); // :52-54

        // 收藏目标带标签 → 播报 + 剃除 + JUMP 批量处刑（:54-65）
        let executable = false; // 可处刑
        for (const cid of added) {
          if (chara(cid).invasion.状态 === 8) continue;
          if (chara(cid).patch.待处刑标签 && get(`cflag:${cid}:700`)) {
            await era.printAndWait(
              '有 [☆]收藏 的目标被选中，自动剃除处刑标签，若要处刑请先取消收藏',
            );
            chara(cid).patch.待处刑标签 = 0;
            continue restart;
          }
          if (chara(cid).patch.待处刑标签) executable = true;
        }
        if (executable) era.printButton('选择处刑方式', 121); // SIF 可处刑（:66-67）
        era.println(); // :67-69
        era.println(); // :68-70
        era.printButton('上一页', 2000);
        era.printButton('结束处刑', 1999); // 原文「結束处刑」
        era.printButton('下一页', 2001);

        const result = await era.input(); // INPUT（:72-74）
        if (result === 2000) {
          // 上一页：页首不再退（:75-80）
          if (no_page > 0) no_page -= 1;
          continue screen;
        }
        if (result === 2001) {
          // 下一页：(NO_PAGE+1)*NUM_PAGE <= CHARANUM 才进（:81-86）
          if ((no_page + 1) * NUM_PAGE <= charanum) no_page += 1;
          continue screen;
        }
        if (result === 1999) return 0; // BEGIN SHOP（:87-88）
        if (result === 121) {
          const outcome = await method_screen(rand_n);
          if (outcome === RESTART) continue restart;
          continue screen;
        }
        // CASEELSE：切换处刑标签（:147-157）
        if (result > 0 && added.includes(result)) {
          chara(result).patch.待处刑标签 = chara(result).patch.待处刑标签
            ? 0
            : 1;
        }
      }
    }
  } finally {
    era.endTrain();
  }
}

/**
 * @自動處刑（:419-433）：回合结算尾部对新人标签（CFLAG:506）的勇者执行
 * 简易处刑。调教过（顺从 ABL:10 ≥ 2）或收藏中的目标免死；原作处刑后
 * 「COUNT = 1; TARGET = 0」重扫，稳定 ID 语义见文件头。重扫从 0 号位重来
 * （原作 TARGET = 0 后 += 1 → 从 1 号位续扫），只有魔王本人同时满足新人 ×
 * 顺从 < 2 × 无收藏时才分得出——CFLAG:506 的写入点都在侵攻中/戒指陷落支
 * （turnend-settle.js:363-380），魔王不走那些支。
 * @returns {Promise<number>} 0
 */
async function auto_execution() {
  for (;;) {
    let executed = false;
    for (const cid of era.getAddedCharacters()) {
      // :424 三个无下标变量（CFLAG:506/ABL:10/CFLAG:700）都按 TARGET 解读
      if (
        chara(cid).invasion.新人 === 1 &&
        chara(cid).system.顺从 < 2 &&
        !get(`cflag:${cid}:700`)
      ) {
        await auto_execution_one(cid);
        executed = true;
        break; // 重扫剩余角色
      }
      // :428-430 收藏豁免：求饶播报（PRINTFORMW 两条）
      if (chara(cid).invasion.新人 === 1 && get(`cflag:${cid}:700`)) {
        const name = chara_callname(cid);
        await era.printAndWait(`${name}拼命地求饶，向魔王宣誓效忠`);
        await era.printAndWait(`摇尾乞怜的${name}，暂且被免除处刑了`);
      }
    }
    if (!executed) return 0;
  }
}

/**
 * @自動處刑1（:435-498）：简易处刑单体。与 @EXECUTION_MINI（event-
 * execution.js）的差异：调用 NAME_RESET（:482-483）、经验播报文案（:491-492）、
 * 无首尾分隔线。威望结算在装备回收与除名之间（原作顺序），party_char_del
 * 无输出，观感等价。
 * @param {number} cid 目标（原作 ARG 被覆写为 TARGET——调用点实参即它）
 * @returns {Promise<number>} 0
 */
async function auto_execution_one(cid) {
  era_flag.target = cid; // ARG = TARGET（:437）
  release_equipment(cid); // 武装/装饰回收（:438-452）
  era.print(`给${chara_callname(cid)}刻下了封印所有力量的烙印。`);
  await era.printAndWait('继续处刑');
  apply_prestige(cid); // 威望结算（:474-480）
  return dispose_character(cid, {
    equipment: false,
    experience_message: (experience) =>
      `《封印吸收了力量，使你获得了${experience}的经验值！》`,
    medal: true, // 勋章三行播报 + EXP:0:81（:488-491）
    reset_names: true, // CALL NAME_RESET（:482-483）
  });
}

module.exports = { auto_execution, auto_execution_one, batch_execution };
