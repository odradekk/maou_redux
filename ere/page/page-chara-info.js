/**
 * @file 角色信息主屏：角色名册（四种排序视图）+ 个别角色详情页的骨架与
 * 导航（列表内容渲染真身；SHOW_CHARA_INFO 详情正文属 CHARA_INFO_SHOW
 * ver1.1.2.ERB，已随 #390 落地，本文件只调用）。
 *
 * 源: target/ERB/キャラ関数/CHARA_INFO ver1.0.1.ERB 全 9 函数——
 *     @CHARA_INFO（:4-113，主循环）/@SHOW_CHARA_INFO_LIST（:114-217）/
 *     @SHOW_CHARA_ACT_LIST（:218-382）/@CHARA_MARRIGE_BEFORE（:383-433，
 *     仅供 ACT_LIST 的婚姻括号列）/@SHOW_CHARA_MONEY_LIST（:434-595）/
 *     @SHOW_CHARA_DEBT_LIST（:596-757）/@SHOW_CHARA_ACT（:758-797）/
 *     @COMPARE_CHARA_ACT（:798-819，#FUNCTION 比较器）/
 *     @CHARA_INFO_INDIVIDUAL_WAPPED（:820-832）/
 *     @CHARA_INFO_INDIVIDUAL（:833-1100）。
 *
 * 调用方：page-shop.js 的 USERSHOP 分发（result===101 → CHARA_INFO，
 * result===498/499 → CHARA_INFO_INDIVIDUAL_WAPPED(target/assi)）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - CHARANUM/序号世界改写为角色 ID 世界（issue #21 通例，
 *     page-select-target.js/page-dungeon-info2.js 同款）：四个列表函数的
 *     翻页与排序数组一律基于 `era.getAddedCharacters()`（已加入角色 ID，
 *     天然无缺口），不再用 `LIST_HEADER/LIST_FOOTER` 之类的序号算术，
 *     也不需要原作「跳过魔王插入位、行数不足补空行」那套只服务序号世界
 *     的补丁；
 *   - 「编号」视图的顺序按移植自建的排序编号（#545 返工：number_view_order，
 *     PORTCFLAG:角色:排序编号，默认＝角色 ID）。原作的编号就是序号/数组
 *     下标，「换号」靠 SWAPCHARA 搬角色数据来换编号；ere 里 ID 即身份，换号
 *     只交换排序编号这一个值，行内编号格显示的仍是角色 ID（＝可点击可手输的
 *     快捷键），细节与该取舍的依据见 page-chara-number-swap.js 文件头；
 *   - 名册自己的 NO_PAGE/SORT_SELECT/SORT_ACT 是本函数的局部变量（原作是
 *     静态变量）：子流程返回后不归零靠的是「同一轮循环 continue 重绘」，与
 *     JUMP CHARA_INFO 同效果；但**从名册之外重进**（主菜单 → 名单）会回初值，
 *     原作不会——#391 起的既有取舍，本票不动它（#606 起这一差异还决定结婚
 *     是否结束本回合：1200 视图走包装入口恒回 0，原作停在上次的非 1200 视图
 *     时才结束，见 chara_info_individual_wrapped；换号页的 NO_PAGE 是另一个
 *     函数里的独立静态变量，那个已按原作提到模块级，见该文件头）；
 *   - REDRAW 0/1、CLEARLINE 局部重绘不镜像（page-dungeon-info2.js/
 *     page-select-target.js 同款先例）：本文件的 CHARA_INFO 与
 *     CHARA_INFO_INDIVIDUAL 都是「每轮整屏重绘」的 `for(;;)` 循环；
 *   - 行首编号从「PRINTFORM 拼出的定宽文字」升级为真 PRINTBUTTON（本项目
 *     通例：`[N] 文字`+INPUT 惯用法升级为 `era.printButton`）——上一页/
 *     返回/下一页等原本就是 PRINTLC 按钮，这里额外把角色行本身也做成
 *     按钮，比原作的「肉眼看号、手动敲号」更符合本引擎的点击交互；
 *     **按钮正文不写编号**：`[N]` 由引擎按 showAcc 拼成 `[N] ` 一层
 *     （AGENTS.md 硬约束，PR #30 实机撞见 `[0] [0]`；#530 纠正魔王行、
 *     #535 纠正角色行）。原作的编号是 `[{n,MAX_NUM_LEN}]` 定宽右对齐，
 *     引擎这条前缀不补齐、正文空白又被折叠成一个空格，故补齐做不到；
 *     排版在引擎里实测核对过（#535 验收评论）：各格是 el-col、`config.width`
 *     被引擎钳成 24 列网格的跨度（1-24），格的横向位置由跨度决定、不随前一格
 *     文本长度变化——编号格写成 `[1] `/`[11] ` 只影响本格自身填空的长度，
 *     不会带着后列左移；可见的姓名列只由姓名格内部的偏移决定，所以魔王行的
 *     名字格空档取 9 格（4 个全角空格 + 1 个半角空格），与角色行的「徽章
 *     8 格 + 1 个半角空格」同宽（原来给 10 格，实测「你」比角色行的名字
 *     右一个半角字符；本票改成同宽的 9 格）；
 *   - HP/MP 双槽（原作 `BARSTR(...,8)` 文本条）保留为纯文字 `HP{cur}/{max}`，
 *     不升级成 `printMultiColumns` 的原生进度条格：一行要同时容纳编号按钮、
 *     状态徽章、姓名等级、攻防或种族性格、双槽、爱慕/淫乱/收藏/组队/归还
 *     六七个字段，原生进度条格占用独立网格列且不支持塞进彩色文字片段，
 *     硬凑会挤爆一行的可用宽度；`page-invasion.js`「BARSTR → 原生进度条」
 *     的升级先例只适用于「一行一条」的场景，这里不适用。已知局限，留给
 *     真正在引擎里核对排版时调整；
 *   - 四个列表的行内彩色片段（爱慕/淫乱/组队/归还/侵攻迎击徽章）用
 *     `{content,color}` 片段数组承载（page-dungeon-info2.js 同款 fragments
 *     写法），颜色为 `SETCOLOR r,g,b` 的十六进制等价；
 *   - 角色行的按钮快捷键 = 角色 ID，与同屏的固定编号（表头 [1200]-[1500]、
 *     一并积极性 [1600]、换号 [1700]、上一页/返回/下一页 [997]-[999]）共存
 *     ——后代 ID 因此必须落在固定编号之上（chara-pregnancy.js 的
 *     FIRST_CHILD_ID = 100000，issue #560 的裁定；静态守卫见
 *     test/child-id-collision.test.js）；
 *   - CASE 8 / CASE 16 的分发（:1062/:1070-1074）沿用项目按钮输入通例：
 *     原作两支 CASE 无前置判断、Emuera 的 INPUT 接受任意整数（手输 8/16 在
 *     任何分页都进得去，含魔王与按钮不显示的场合）；ere 只接受已打印按钮
 *     的快捷键（#129），[8]/[16] 的可见性判定因此变成访问限制——两处
 *     case 内的注释写明，行为保持（第 1 轮验收补记）；
 *   - 立绘更换按钮 `[20]`（:870-871）：立绘系统判不移植（#542，#540 范围
 *     决定 4——开关默认关、素材不在仓库、只增强显示），#638 起按「缺内容的
 *     去掉入口」删除按钮与 CASE 20：原作守卫「立绘开关 && CFLAG:ARG:1 == 0
 *     && ARG != MASTER」的开关项恒假，按钮本就永远按不到。`:883 CALL
 *     PTJ_BUTTON` 同票落判——打工 MOD 不移植，默认态分支
 *     （[18] 卖春积极性按钮，SHOW_BUTTON_BICH_LEVEL）换真身接线；
 *   - `[IF_DEBUG][99] 修改角色[ENDIF]` 调试按钮（分发端 :934 的 CASE 99 →
 *     `CHAR_DEBUG`）：本项目未移植 Emuera 的编译期调试开关概念，直接按
 *     「非调试构建」处理——按钮本就不渲染；#638 起调试面板判不移植的
 *     处理分支一并删除；
 *   - `CASE 500`（前一人）/`CASE 600`（后一人）原作各含一支
 *     `... && MASTER` 的判据，`MASTER` 是恒为 0 的角色号常量、逻辑与运算
 *     里恒假，两支分支实际不可达——1:1 精简为可达分支，不逐字保留死分支；
 *   - `RESULT == 0 && MASTER` 分支（角色行选中处）同理恒假，不需要代码，
 *     仅在注释中说明；
 *   - `CALL 換號` 的 `@換號` 定义在 `target/ERB/魔改新增/角色編號交換.ERB`
 *     （130 行换号界面）。先前一版票据记录曾把它当 MOD 内容只登记占位；
 *     #540 开图后按「魔改新增/ 其余部分照常移植」随 #545 落地真身——
 *     @換號 见 ere/page/page-chara-number-swap.js（含「换号只换排列键」的
 *     做法与依据），@统一卖春积极性 见 ere/page/page-uniform-bitch-level.js。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
// 导入分组按 AGENTS.md（system 在 page 前；本文件存量的 chara-before-page
// 顺序是历史形态，本票新增行按约定位置放）
const {
  show_button_equip,
  equip_st_show,
} = require('#/system/equip/equip-show');
const { search_family } = require('#/chara/chara-family');
const {
  chara_info_name_edit,
  show_button_name_edit,
} = require('#/chara/chara-name-edit');
const { random_self_call } = require('#/chara/chara-self-call');
const { sort_by_number } = require('#/chara/chara-portcflag');
const { LOVER_NAMES } = require('#/dungeon/dungeon-lovers');
const { is_trainable, is_assistable } = require('#/page/page-select-target');
const { uniform_bitch_level } = require('#/page/page-uniform-bitch-level');
const { chara_number_swap } = require('#/page/page-chara-number-swap');
const { ability_up_core } = require('#/page/page-ability-up');
const { tailor_core } = require('#/page/page-tailor');
const { enemy_compare } = require('#/page/page-dungeon-info2');
const { get_look_info } = require('#/chara/look-info');
const {
  set_bich_level,
  bich_level_text,
} = require('#/kojo/kojo-dungeon-bitch');
const {
  is_able_to_ability_up,
  is_able_to_cloth,
  chara_info_recover_hp,
  chara_info_up_level,
  chara_info_callback,
} = require('#/chara/chara-info-actions');
const { transfer_soul } = require('#/chara/chara-soul-transfer');
const {
  show_button_job_change,
  chara_info_job_change,
} = require('#/chara/chara-job-change');
const {
  show_button_temptation,
  temptation,
} = require('#/chara/chara-temptation');
const { show_button_marriage, marriage } = require('#/chara/chara-marriage');
const {
  child_care_chara,
  show_button_child_care,
} = require('#/event/event-pregnancy');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { show_chara_info } = require('#/page/page-chara-info-show');
const NUM_PAGE = 24;

function name_of(cid) {
  return era.get(`callname:${cid}:-1`) ?? '';
}

// —— @SHOW_CHARA_ACT（:758-797） ——

/**
 * 行动状态徽章：8 格右对齐色块（本文件不做定宽对齐，见文件头局限说明）。
 * @param {number} cid 角色 ID
 * @returns {{content: string, color?: string}}
 */
function show_chara_act(cid) {
  const state = era.get(`cflag:${cid}:1`) || 0;
  const floor = era.get(`cflag:${cid}:501`) || 0;
  if (state === 2) return { content: `${floor}F侵攻中`, color: '#ff6464' };
  if (state === 3) return { content: `${floor}F迎击中`, color: '#64ffff' };
  if (state === 0) return { content: '[可调教]', color: '#6464ff' };
  if (state === 7) return { content: '[ 苗床 ]', color: '#64ff64' };
  if (state === 8) return { content: '[拘束台]', color: '#64ff64' };
  if (state === 9) return { content: '[ NTR中]', color: '#ff0000' };
  if (state === 10) return { content: '[育儿室]', color: '#64ff64' };
  // :791 LOCALS = -F\u3000―\u3000（原作字面量，"F" 疑似残留字符，1:1 保留）
  return { content: '-F\u3000\u2015\u3000' };
}

// —— @COMPARE_CHARA_ACT（:798-819，#FUNCTION） ——

/**
 * @param {number} a 角色 a（原作 ARG）
 * @param {number} b 角色 b（原作 ARG:1）
 * @param {number} [act=2] 原作 ARG:2（全库调用点恒传字面量 2，与
 *   CHARA_INFO 里控制排序模式切换的 SORT_ACT/ACT 变量是两回事）
 * @returns {number} -1/0/1
 */
function compare_chara_act(a, b, act = 2) {
  if (a === b) return 0;
  const state_a = era.get(`cflag:${a}:1`) || 0;
  const state_b = era.get(`cflag:${b}:1`) || 0;
  const rank_a = (state_a + 11 - act) % 11;
  const rank_b = (state_b + 11 - act) % 11;
  if (rank_a !== rank_b) return rank_a < rank_b ? -1 : 1;
  // :813 `CFLAG:ARG:1==2 || CFLAG:ARG:1==3 && CFLAG:ARG:501!=CFLAG:(ARG:1):501`
  // 按 Emuera 的「&& 与 || 同优先级、左结合」读作
  // `(CFLAG:ARG:1 ∈ {2,3}) && 楼层不等`——两态都吃楼层判据，楼层相等时
  // 整支不命中，落到末行的 `a < b ? -1 # 1`（#517）。
  if (
    (state_a === 2 || state_a === 3) &&
    (era.get(`cflag:${a}:501`) || 0) !== (era.get(`cflag:${b}:501`) || 0)
  ) {
    const floor_a = era.get(`cflag:${a}:501`) || 0;
    const floor_b = era.get(`cflag:${b}:501`) || 0;
    return floor_a < floor_b ? -1 : 1;
  }
  return a < b ? -1 : 1;
}

// —— @CHARA_MARRIGE_BEFORE（:383-433） ——

/**
 * 压缩家族码（TALENT:320）的「未婚前家族关系」描述，仅供
 * `CFLAG:x:601 == 0`（无配偶登记）时的婚姻括号列使用。
 *
 * 原作用 `PRINT`（副作用输出）；本函数改为返回字符串以便拼进行内片段，
 * 观测到的文本完全一致。CASE 5 / CASEELSE 原作只赋值 `LOCALS` 未打印
 * （死代码，#14 登记），此处同样不产生任何文本。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function chara_marriage_before(cid) {
  const code = era.get(`talent:${cid}:320`) || 0;
  if (code % 10 === 0) return '无';
  const local1 = code % 100000;
  const local2 = code % 10000000000;
  const category = Math.trunc(local1 / 10000);
  if (category === 0 || category === 2) return '无';
  if (category === 1 || category === 3 || category === 4) {
    const kind = Math.trunc(local2 / 1000000000);
    if ([0, 4, 8].includes(kind)) return '故乡丈夫';
    if ([1, 5, 7].includes(kind)) return '故乡扶她';
    return '故乡妻子';
  }
  return ''; // CASE 5 / CASEELSE：原作死代码，无输出
}

/**
 * ACT_LIST 专用的婚姻括号文本（`[婚: ... ]` 内部，:333-375 五路分支）。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function marriage_bracket_text(cid) {
  const spouse = era.get(`cflag:${cid}:601`) || 0;
  if (spouse === 900) return '野狗';
  if (spouse === 901) return name_of(0);
  if (spouse === 0) return chara_marriage_before(cid);
  if (spouse === 902) {
    // CALL NAME_LOVER,CFLAG:COUNT:606,1（原函数按 print_flag=1 直接打印
    // 14 格填充；此处只需裸文本，改读同一张登记表）
    return LOVER_NAMES.get(era.get(`cflag:${cid}:606`) || 0) ?? '';
  }
  // :351-374 ELSE 分支：其内两支 `CFLAG:COUNT:601==0` 判据在此处恒假
  // （外层已排除 spouse==0），原作死代码，1:1 保留其余可达分支
  const partner = search_family(cid, 'MARRIAGE');
  if ((era.get(`ex_talent:${cid}:2`) || 0) !== 0 && partner < 0) return '无';
  if ((era.get('cflag:0:601') || 0) === (era.get(`cflag:${cid}:6`) || 0)) {
    return name_of(0);
  }
  if (spouse % 10 === 9) {
    const found = search_family(cid, 'MARRIAGE');
    return found > 0 ? name_of(found) : '无';
  }
  return era.get(`itemname:${spouse}`) ?? '';
}

// —— 列表行的共享渲染（四个 SHOW_CHARA_*_LIST 共用的行结构） ——

/**
 * 名册第一行的魔王（源 :141-143）：编号做成**真按钮**（#530）。
 *
 * 名册这一轮的白名单非空——角色行按角色号、排序表头 1200-1700、翻页
 * 997/998、返回 999 都在同屏打印过，而 `added_chara_ids()` 把 0 滤掉了，
 * **没有别的按钮编号是 0**。纯文本的 `[0] …` 玩家因此敲不进编号（引擎只认
 * 本轮打印过的按钮快捷键），主循环里 `result === 0` 那条分支（原作
 * `:91-94 CASE 0 TO CHARANUM-1`，主循环内的注释已引）会成为死支路。编号由
 * 引擎按 showAcc 拼成 `[0] `，正文不写 `[N]`（AGENTS.md 硬约束）。
 *
 * 名字格的空档是**姓名列的定位**：9 格 = 4 个全角空格 + 1 个半角空格，与
 * 角色行姓名格开头的「徽章 8 格 + 1 个半角空格」同宽（#535；引擎里每格的
 * 横向位置由 el-col 的 span 决定，可见列只取决于格内偏移，见文件头）。
 */
function print_master_header() {
  era.printMultiColumns([
    {
      type: 'button',
      accelerator: 0,
      content: '',
      config: { align: 'left', width: 3 },
    },
    {
      type: 'text',
      // 4 个全角空格 + 1 个半角空格＝9 格：与角色行的「徽章 8 格 + 空格」对齐。
      // 引擎不对文本格折叠空白（#535 验收实测：5 个全角空格显示为 10 格），
      // 这一个半角空格自成一段、前后都不是空白，折叠规则也吃不掉它
      content: `\u3000\u3000\u3000\u3000 ${name_of(0)} LV${era.get('cflag:0:9') || 0}`,
      config: { align: 'left', width: 13 },
    },
  ]);
}

function atk_def_fragment(cid) {
  const atk = era.get(`cflag:${cid}:13`) || 0;
  const def = era.get(`cflag:${cid}:14`) || 0;
  const align = era.get(`cflag:${cid}:151`) || 0;
  return { content: ` 攻击${atk}/防御${def} 善恶值${align}` };
}

function race_mind_fragment(cid) {
  return {
    content: ` ${get_look_info(cid, '种族12')} - ${get_look_info(cid, '性格')}`,
  };
}

function love_lewd_fragment(cid) {
  if (era.get(`talent:${cid}:85`))
    return { content: '<爱慕>', color: '#ff6464' };
  if (era.get(`talent:${cid}:76`))
    return { content: '<淫乱>', color: '#ff6464' };
  return { content: '<未陷落>', color: '#646464' };
}

function favorite_fragment(cid) {
  return {
    content: (era.get(`cflag:${cid}:700`) || 0) !== 0 ? '[\u2606]' : '',
  };
}

function team_fragment(cid) {
  const state = era.get(`cflag:${cid}:1`) || 0;
  const leader = era.get(`cflag:${cid}:533`) || 0;
  const member1 = era.get(`cflag:${cid}:531`) || 0;
  const member2 = era.get(`cflag:${cid}:532`) || 0;
  let content = '';
  if (leader > 0 && member1 === 0 && member2 === 0 && leader !== cid) {
    content = `队员<${leader}>`;
  } else if (leader > 0) {
    content = `队长<${leader}>`;
  }
  const color = state === 2 ? '#ff6464' : state === 3 ? '#64ffff' : undefined;
  return color ? { content, color } : { content };
}

function return_flag_fragment(cid) {
  return (era.get(`cflag:${cid}:507`) || 0) === 1
    ? { content: '<归还中>', color: '#c8c864' }
    : { content: '' };
}

function common_suffix_fragments(cid) {
  return [
    love_lewd_fragment(cid),
    favorite_fragment(cid),
    team_fragment(cid),
    return_flag_fragment(cid),
  ];
}

/**
 * 一名角色的列表行：编号按钮 + 状态/姓名/中段信息 + HP/MP + 尾段标记。
 *
 * 编号按钮的正文为空，编号由引擎按 showAcc 拼成 `[N] `（AGENTS.md 硬约束：
 * 正文自带 `[N]` 会实显成 `[11] [11]`，PR #30；#530 在魔王行、#535 在角色行）。
 * @param {number} cid 角色 ID
 * @param {{content:string,color?:string}} middle_fragment 中段（攻防善恶
 *   或 种族性格）
 * @param {Array<{content:string,color?:string}>} suffix_fragments 尾段
 */
function print_chara_row(cid, middle_fragment, suffix_fragments) {
  const badge = show_chara_act(cid);
  const hp = era.get(`base:${cid}:0`) || 0;
  const max_hp = era.get(`maxbase:${cid}:0`) || 0;
  const mp = era.get(`base:${cid}:1`) || 0;
  const max_mp = era.get(`maxbase:${cid}:1`) || 0;
  era.printMultiColumns([
    {
      type: 'button',
      accelerator: cid,
      content: '',
      config: { align: 'left', width: 3 },
    },
    {
      type: 'text',
      content: [
        badge,
        { content: ` ${name_of(cid)} LV${era.get(`cflag:${cid}:9`) || 0}` },
        middle_fragment,
      ],
      config: { align: 'left', width: 13 },
    },
    {
      type: 'text',
      content: [{ content: ` HP${hp}/${max_hp} 气${mp}/${max_mp}` }],
      config: { align: 'left', width: 6 },
    },
    {
      type: 'text',
      content: suffix_fragments,
      config: { align: 'left', width: 2 },
    },
  ]);
}

function added_chara_ids() {
  return era.getAddedCharacters().filter((id) => id !== 0);
}

/**
 * 名册「编号」视图的排列顺序：按移植自建的排序编号升序（PORTCFLAG:角色:
 * 排序编号，未设＝角色 ID）。名册页 [1700] 的换号只交换这个值，所以「换号」
 * 能看到的净效果就是本视图的行序变化——#545 返工改掉了先前「搬角色数据」
 * 的做法（那个做法把角色 ID 与人对调，与 issue #21「ID 即身份」的约定冲突）。
 * 行内编号格显示的仍是角色 ID（引擎按 showAcc 拼的按钮快捷键），两者不同的
 * 理由见 page-chara-number-swap.js 文件头。
 * @returns {number[]} 角色 ID 表
 */
function number_view_order() {
  return sort_by_number(added_chara_ids());
}

function page_slice(ids, no_page) {
  return ids.slice(no_page * NUM_PAGE, (no_page + 1) * NUM_PAGE);
}

// —— @SHOW_CHARA_INFO_LIST（:114-217） ——

/**
 * @param {number} no_page 页码（0 起）
 * @returns {number[]} 本视图的角色 ID 顺序（原作 CHARA_SORT 的 ere 等价，
 *   供 CHARA_INFO_INDIVIDUAL_WAPPED 的前一人/后一人导航复用）；本视图是
 *   「编号」视图，顺序按排序编号（#545 返工，见 number_view_order）
 */
function show_chara_info_list(no_page) {
  const order = number_view_order();
  print_master_header();
  for (const cid of page_slice(order, no_page)) {
    print_chara_row(cid, atk_def_fragment(cid), common_suffix_fragments(cid));
  }
  return order;
}

// —— @SHOW_CHARA_ACT_LIST（:218-382） ——

/**
 * 插入排序重建 CHARA_SORT（原作 :243-262 的「扫描已填槽位、首个 RESULT<0
 * 处 ARRAYSHIFT 插入」算法逐字等价——比较器不保证严格全序，必须复现同一
 * 套插入过程，不能替换成通用 `Array.prototype.sort`）。
 * @param {number} act 0/1（SORT_ACT % 2，由 CHARA_INFO 维护）
 * @returns {number[]}
 */
function build_act_sort_order(act) {
  const ids = added_chara_ids();
  const sort = [];
  for (const count of ids) {
    let inserted = false;
    for (let pos = 0; pos < sort.length; pos += 1) {
      const other = sort[pos];
      const other_state = era.get(`cflag:${other}:1`) || 0;
      const count_state = era.get(`cflag:${count}:1`) || 0;
      let cmp;
      if (act === 0) {
        cmp = compare_chara_act(count, other, 2);
      } else if (
        (count_state === 2 || count_state === 3) &&
        (other_state === 2 || other_state === 3)
      ) {
        cmp = enemy_compare(count, other);
      } else {
        cmp = compare_chara_act(count, other, 2);
      }
      if (cmp < 0) {
        sort.splice(pos, 0, count);
        inserted = true;
        break;
      }
    }
    if (!inserted) sort.push(count);
  }
  return sort;
}

/**
 * @param {number} no_page 页码
 * @param {number} act 0/1
 * @returns {number[]}
 */
function show_chara_act_list(no_page, act) {
  const order = build_act_sort_order(act);
  print_master_header();
  for (const cid of page_slice(order, no_page)) {
    print_chara_row(cid, atk_def_fragment(cid), [
      ...common_suffix_fragments(cid),
      { content: `[婚:${marriage_bracket_text(cid)}]` },
    ]);
  }
  return order;
}

// —— @SHOW_CHARA_MONEY_LIST（:434-595） ——

/**
 * 原作是「反复取当前最大值」的选择排序，效果等价于按 CFLAG:580 降序、
 * 原始 ID 升序（迭代顺序）为次序的稳定排序——用 `Array.prototype.sort`
 * （规范保证稳定）复现同一结果，不需要逐字重演选择排序循环。
 * @param {number} no_page 页码
 * @returns {number[]}
 */
function show_chara_money_list(no_page) {
  const order = added_chara_ids().sort(
    (a, b) =>
      (era.get(`cflag:${b}:580`) || 0) - (era.get(`cflag:${a}:580`) || 0),
  );
  print_master_header();
  for (const cid of page_slice(order, no_page)) {
    print_chara_row(cid, race_mind_fragment(cid), [
      { content: ` 所持金:${era.get(`cflag:${cid}:580`) || 0} ` },
      ...common_suffix_fragments(cid),
    ]);
  }
  return order;
}

// —— @SHOW_CHARA_DEBT_LIST（:596-757） ——

/**
 * 与 show_chara_money_list 同构，取 CFLAG:582（借金，原作按负值存储）
 * 升序（数值越负债务越多，越靠前）。
 * @param {number} no_page 页码
 * @returns {number[]}
 */
function show_chara_debt_list(no_page) {
  const order = added_chara_ids().sort(
    (a, b) =>
      (era.get(`cflag:${a}:582`) || 0) - (era.get(`cflag:${b}:582`) || 0),
  );
  print_master_header();
  for (const cid of page_slice(order, no_page)) {
    const debt = era.get(`cflag:${cid}:582`) || 0;
    print_chara_row(cid, race_mind_fragment(cid), [
      { content: `\u3000借金:${0 - debt} ` },
      ...common_suffix_fragments(cid),
    ]);
  }
  return order;
}

function print_sort_header_row() {
  era.printMultiColumns([
    {
      type: 'button',
      accelerator: 1200,
      content: '编号',
      config: { align: 'left', width: 6 },
    },
    {
      type: 'button',
      accelerator: 1300,
      content: '状态',
      config: { align: 'left', width: 6 },
    },
    {
      type: 'button',
      accelerator: 1400,
      content: '所持金',
      config: { align: 'left', width: 6 },
    },
    {
      type: 'button',
      accelerator: 1500,
      content: '借金',
      config: { align: 'left', width: 6 },
    },
  ]);
  era.printButton('一并积极性调整', 1600);
  era.printButton('换号', 1700);
}

// —— @CHARA_INFO（:4-113） ——

/**
 * 角色名册主屏。
 * @returns {Promise<number>} 0 = 回到主菜单（原作 RETURN 0）；1 = 回合结束
 *   （原作 RETURN 1，个别页触发的 BEGIN TURNEND 上浮）
 */
async function chara_info() {
  let no_page = 0;
  let sort_select = 1200;
  let sort_act = 0;

  for (;;) {
    const total = added_chara_ids().length;
    era.print(
      `请选择一个角色以了解详细信息。\u3000\u3000<第${no_page + 1}页> `,
    );
    era.print(`(总计${total}人)`);
    era.drawLine();

    let order;
    if (sort_select === 1300) {
      order = show_chara_act_list(no_page, sort_act % 2);
    } else if (sort_select === 1400) {
      order = show_chara_money_list(no_page);
    } else if (sort_select === 1500) {
      order = show_chara_debt_list(no_page);
    } else {
      sort_select = 1200;
      order = show_chara_info_list(no_page);
    }

    print_sort_header_row();
    era.drawLine();
    era.printButton('上一页', 997);
    era.printButton('返回', 999);
    era.printButton('下一页', 998);

    const result = await era.input();

    if (result === 1600) {
      // :62-63 CALL 统一卖春积极性（#545 真身：page-uniform-bitch-level.js）。
      // 被调函数尾 JUMP CHARA_INFO：原作的 NO_PAGE/SORT_SELECT/SORT_ACT 是静态
      // 变量（指南 user-defined-variables.md:67-69），重进名册沿用现值；本函数里
      // 它们是局部变量，靠「同一轮循环 continue 重绘」复现该效果——子流程返回后
      // 页码与排序不归零（从名册之外重进会回初值，见文件头的有意偏离）
      await uniform_bitch_level();
      continue;
    }
    if (result === 1700) {
      // :74-75 CALL 換號（#545 真身：page-chara-number-swap.js）。唯一出口
      // [1999] 結束换号 → JUMP CHARA_INFO（同上：同一轮 continue 沿用现值）；
      // RETURN 0 出口在确认屏只打印 [4000]/[4001] 的输入白名单下不可达
      // （该文件文件头）
      await chara_number_swap();
      continue;
    }
    if (
      result === 1200 ||
      result === 1300 ||
      result === 1400 ||
      result === 1500
    ) {
      if (sort_select !== result) {
        sort_select = result;
      } else if (result === 1300) {
        sort_act += 1;
      }
      continue;
    }
    if (result === 999) {
      return 0;
    }
    if (result === 997) {
      if (no_page > 0) no_page -= 1;
      continue;
    }
    if (result === 998) {
      if ((no_page + 1) * NUM_PAGE <= total) no_page += 1;
      continue;
    }
    if (result === 0 || added_chara_ids().includes(result)) {
      // :91-94 CASE 0 TO CHARANUM-1（改写为 ID 语义：0=魔王或已加入
      // 角色）。`SIF RESULT==0 && MASTER: RESULT=MASTER` 恒假（MASTER 是
      // 恒 0 常量，逻辑与运算里恒假），无需代码
      // :95-99 SORT_SELECT==1200 走包装入口（恒回 0，见该函数注释——
      // 原作缺陷，#606 起照搬）；其余视图直调内层，返回值直达 :100 的判据
      const sub_result =
        sort_select === 1200
          ? await chara_info_individual_wrapped(result)
          : await chara_info_individual(result, order);
      if (sub_result === 1) {
        return 1;
      }
      continue;
    }
    // CASEELSE：无效输入，整屏重绘（本项目每轮天然重绘，直接回到循环头）
  }
}

/**
 * @CHARA_INFO_INDIVIDUAL_WAPPED（:820-832）：SORT_SELECT==1200 视图下打开
 * 个别信息页的入口——原作现建的是 `LOCAL:COUNT = COUNT + 1`（1..CHARANUM）
 * 的序号顺位表，即「编号」视图那套顺序；ere 侧换成同一套排列键
 * （number_view_order，按移植自建的排序编号）。
 * 原作在 :829 的 CALL 之后没有 RETURN，直接落到函数末尾；Emuera 对普通函数
 * state.Return(0)`）。本包装入口因此恒回 0：内层返回 1 的操作只有结婚
 * （@MARRIAGE 的两个出口——婚礼完成 CHARA_MARRIAGE.ERB:450-451、
 * ENTER_LOVER 成功 CHARA_MARRIAGE.ERB:71-74；转职最高返回 2，诱惑的
 * RETURN 1 被注释）。名册 1200 视图走此入口时结婚
 * 不结束本回合、回到人物列表；主菜单 498/499 名字按钮的调用点不读返回值
 * （回到主菜单）——原作自身的缺陷（#14 已登记），照搬不修。
 * @param {number} cid 角色 ID
 * @returns {Promise<number>} 恒 0（原作 RESULT 被清 0，不是透传内层返回值）
 */
async function chara_info_individual_wrapped(cid) {
  await chara_info_individual(cid, number_view_order());
  return 0;
}

// —— @CHARA_INFO_INDIVIDUAL（:833-1100） ——

/**
 * 个别角色信息页：详情正文存根 + 操作按钮 + 分页/换人导航。
 * @param {number} arg 角色 ID
 * @param {number[]} chara_sort 本次前一人/后一人导航所依据的顺序（调用方
 *   传入，页内不重算——与原作 CHARA_SORT 作为 REF 只读参数同构）
 * @returns {Promise<number>} 0 = 回到名册；1 = 回合结束（上浮给 CHARA_INFO）
 */
async function chara_info_individual(arg, chara_sort) {
  let current = arg;
  let sub_page = 0;

  for (;;) {
    const l_indx = current !== 0 ? chara_sort.indexOf(current) : -1;

    // #390 起正文换真身（CASE 0-4 五页；原作的 TARGET 换手由显式 cid 承载）
    await show_chara_info(current, sub_page);

    const state = era.get(`cflag:${current}:1`) || 0;
    const hp = era.get(`base:${current}:0`) || 0;
    const max_hp = era.get(`maxbase:${current}:0`) || 0;
    const mp = era.get(`base:${current}:1`) || 0;
    const max_mp = era.get(`maxbase:${current}:1`) || 0;

    // 操作按钮块（:858-884）：sub_page 0-2 各按守卫出一批按钮、sub_page 3 零按钮。
    // 记下行数差判断这一轮有没有打过按钮（块内只有 printButton，见 #596）
    const button_anchor = era.getLineCount();
    if (sub_page === 0) {
      // :858-859 两个改名按钮（#384 落真身：ere/chara/chara-name-edit.js）
      show_button_name_edit(0, current);
      show_button_name_edit(1, current, 1);
      // :860-862 三个动作按钮（#393 落真身，三个同构模块各一对）
      show_button_job_change(2, current);
      show_button_temptation(3, current);
      show_button_marriage(4, current);
      // :863 CALL SHOW_BUTTON_CHILD_CARE(5,ARG)（#401 真身，ere/event/event-pregnancy.js）
      show_button_child_care(5, current);
      if (is_able_to_ability_up(current)) era.printButton('提升能力', 10);
      if (current !== 0) {
        era.printButton(
          era.get(`cflag:${current}:700`) || 0 ? '取消收藏' : '收藏',
          9,
        );
      }
      // [20] 更换立绘（:870-871）随 #638 删除：立绘系统判不移植（#542），
      // 按「缺内容的去掉入口」处理——按钮与 CASE 20 一并移除（见文件头）
    } else if (sub_page === 1 || sub_page === 2) {
      if (is_trainable(current) === 0) era.printButton('设为目标', 6);
      if (is_assistable(current) === 0) era.printButton('设为助手', 7);
      // :880 CALL SHOW_BUTTON_EQUIP(16,ARG)（#546 真身：system/equip/
      // equip-show.js——五道 OR 判定放行才渲染按钮，不放行时零输出）
      show_button_equip(16, current);
      // :883 CALL PTJ_BUTTON(ARG)：打工 MOD（EX_FLAG:9000 第 2 位）判不移植
      // （#542），只保留默认态分支——PTJ.ERB:5 的 ELSE =
      // SHOW_BUTTON_BICH_LEVEL(18,ARG) 的 [18] 卖春积极性按钮（档位文案
      // kojo-dungeon-bitch.js；按本页通例升级 printButton，引擎只送达已打印
      // 按钮的编号），打工变体（SHOW_PTJ_BUTTON_LEVEL）不渲染
      era.printButton('卖春积极性 - ' + bich_level_text(current), 18);
      if (is_able_to_cloth(current)) era.printButton('更换服装', 11);
      if (state === 8) era.printButton('解除固定', 12);
      if (state === 3) era.printButton('强行召回', 13);
      if (state === 0 && (hp < max_hp || mp < max_mp)) {
        era.printButton('回复体力', 14);
      }
      if (state === 0) era.printButton('提升等级', 15);
      if (state === 0) era.printButton('灵魂转移', 17);
      // [99] 修改角色（[IF_DEBUG]）：不移植调试开关概念，不渲染（文件头）
    }
    // sub_page === 3：原作两支 IF/ELSEIF 都不命中，无操作按钮

    // :907 的 PRINTL：打过按钮时只结束那一行（train-upgrade-log:171-172 里按钮
    // 行与分割线逐行相邻）；一个按钮都没打时它落在已收行的空行上 = 真空行
    // （sub_page 3，以及所有守卫都不放行的角色页）
    if (era.getLineCount() === button_anchor) {
      era.println();
    }
    era.drawLine();
    era.printButton('前页', 101);
    era.printButton('返回', 100);
    era.printButton('后页', 102);
    if (current > 0) era.printButton('前一人', 500);
    // :920 `L_INDX >= CHARANUM - 2`：CHARANUM 含魔王（总数=chara_sort.length+1），
    // 换算成不含魔王的 chara_sort.length 得 `l_indx >= chara_sort.length - 1`；
    // 原作没有额外要求 `L_INDX>=0`——魔王行（l_indx=-1）同样受这条判据支配，
    // 且 -1 通常小于 chara_sort.length-1，所以魔王行也会画出「后一人」（对应
    // CASE 600 分发端 `current===0` 分支跳到 chara_sort[0] 的既有逻辑）。
    // 此前一版误加了 `l_indx>=0` 前缀、把魔王行的按钮吞掉，#391 复核修正。
    if (l_indx < chara_sort.length - 1) era.printButton('后一人', 600);

    const result = await era.input();

    switch (result) {
      case 100:
        return 0;
      case 101:
        if (sub_page > 0) sub_page -= 1;
        continue;
      case 102:
        if (sub_page < 3) sub_page += 1;
        continue;
      case 500:
        // 前一人（原作另一支 `L_INDX==MASTER && CHARA_SORT && MASTER` 恒
        // 假，1:1 精简为可达分支，文件头）
        if (l_indx > 0) current = chara_sort[l_indx - 1];
        else if (l_indx === 0) current = 0;
        continue;
      case 600:
        // 后一人（原作首支 `... && MASTER` 同上恒假，精简为可达分支）
        if (current === 0) {
          if (chara_sort.length > 0) current = chara_sort[0];
        } else if (l_indx >= 0 && l_indx + 1 < chara_sort.length) {
          current = chara_sort[l_indx + 1];
        }
        continue;
      case 6:
        if (is_trainable(current) === 0) {
          era_flag.target = current;
          game.event.上次调教对象 = current;
          await era.printAndWait(`${name_of(current)}成为了调教对象……`);
        }
        continue;
      case 7:
        if (is_assistable(current) === 0) {
          era_flag.assi = current;
          game.event.上次助手 = current;
          await era.printAndWait(`${name_of(current)}成为了助手……`);
        }
        continue;
      case 10:
        // :1003 CALL ABILITY_UP_CORE（#397 真身：page/page-ability-up.js）
        if (is_able_to_ability_up(current)) {
          await ability_up_core(current);
        }
        continue;
      case 11:
        // :1009 CALL TAILOR_CORE（#397 真身：page/page-tailor.js）
        if (is_able_to_cloth(current)) {
          await tailor_core(current);
        }
        continue;
      case 12:
        // 拘束台解放（:1012-1017）：原作此后落到 RESULT==0 的「返回名册」
        // 出口，不是 GOTO DRAW_PAGE——与 13 同款
        if (state === 8) {
          chara(current).invasion.状态 = 0;
          if (era.get(`cflag:${current}:77`))
            chara(current).patch.待处刑标签 = 0;
          return 0;
        }
        continue;
      case 13:
        if (state === 3) {
          await chara_info_callback(current);
          return 0;
        }
        continue;
      case 14:
        if (state === 0 && (hp < max_hp || mp < max_mp)) {
          await chara_info_recover_hp(current);
        }
        continue;
      case 15:
        if (state === 0) {
          await chara_info_up_level(current);
        }
        continue;
      case 17:
        if (state === 0) {
          current = await transfer_soul(current);
        }
        continue;
      case 0:
        // :1045 改名（#384 落真身）
        await chara_info_name_edit(current);
        continue;
      case 1:
        // :1048 恢复原名（#384 落真身）
        await chara_info_name_edit(current, 1);
        continue;
      case 2: {
        // :1051 CALL CHARA_INFO_JOB_CHANGE(ARG)（#393 真身）
        const job_result = await chara_info_job_change(current);
        if (job_result !== 2) return job_result; // :1094-1097 的收尾
        continue;
      }
      case 3: {
        // :1054 CALL TEMPTATION(ARG)（#393 真身）。原作 :1094-1099 的收尾
        // 按被调方的 RESULT 分流：0/1 上浮给 CHARA_INFO（0 = 回名册、
        // 1 = 回合结束），其余落回 INPUT_LOOP 重画——三支「动作」都照此接
        // （CASE 0/1/5 等其它 case 的「留在页内」是各自票据的既有处置，
        // 不在本票改动面内）
        const temptation_result = await temptation(current);
        if (temptation_result !== 2) return temptation_result;
        continue;
      }
      case 4: {
        // :1057 CALL MARRIAGE(ARG)（#393 真身；1 = 回合结束，上浮给
        // CHARA_INFO——原作 MARRIAGE 的「結婚するとターンエンド」是最初
        // 就写明的出口）
        const marriage_result = await marriage(current);
        if (marriage_result !== 2) return marriage_result;
        continue;
      }
      case 5:
        // :1060 CALL CHILD_CARE_CHARA(ARG)（#401 真身；返回 2 是「侵攻中的
        // 勇者」防御支，此处与其它 case 同款忽略返回值，留在页内继续导航）
        await child_care_chara(current);
        continue;
      case 8:
        // :1062 CALL RANDOM_SELF_CALL(ARG,1)（#546 真身：chara/chara-
        // self-call.js 的 MODE 1——自定义输入分支；[8] 按钮由 SHOW_BLOCK
        // 渲染，见 components/chara-info-title.js）。
        // 有意偏离（第 1 轮验收补记）：原作 CASE 8 无前置判断，任何分页手输
        // 8（含魔王、[8] 按钮不显示的第 2/3 页）都能重设一人称；ere 的
        // input 只接受本轮已打印按钮的快捷键（#129），[8] 又只在非魔王的
        // 页 0/1 打印——SHOW_BLOCK 的可见性判定在这里变成了**访问限制**
        //（魔王的一人称无法自定义）。行为保持，与项目按钮输入通例一致
        await random_self_call(current, undefined, 1);
        continue;
      case 9:
        if (current !== 0) {
          chara(current).chara.收藏 = chara(current).chara.收藏 ? 0 : 1;
        }
        continue;
      case 16:
        // :1070-1074 LOCAL = LINECOUNT（死赋值，无人再读）→ CALL
        // EQUIP_ST_SHOW, ARG（#546 真身：system/equip/equip-show.js）→ WAIT
        // → GOTO DRAW_PAGE（本循环天然整页重绘，continue 即是）。
        // 有意偏离（第 1 轮验收补记）：原作 CASE 16 同样无前置判断——
        // CHECK_ABLE_TO_SHOW_EQUIP 返回 1 时只是不显示 [16] 按钮，手输 16
        // 在任何分页仍能看装备；ere 只接受已打印按钮，判定不放行 = 完全
        // 不可达。行为保持，与项目按钮输入通例一致
        equip_st_show(current); // 同步纯输出（原作 CALL 无等待），WAIT 在下一行
        await era.waitAnyKey();
        continue;
      case 18:
        await set_bich_level(current);
        continue;
      // case 20（更换立绘）与 case 99（CHAR_DEBUG 调试面板）随 #638 删除：
      // 两者均判不移植（#542），按钮不渲染、引擎输入白名单送不到这两值，
      // 分支只有直调可达——按「缺内容的去掉入口」一并移除
      default:
        if (result >= 15000) {
          const target = result - 15000;
          if (added_chara_ids().includes(target) || target === 0) {
            current = target;
          }
        }
        continue;
    }
  }
}

module.exports = {
  show_chara_act,
  compare_chara_act,
  chara_marriage_before,
  marriage_bracket_text,
  show_chara_info_list,
  show_chara_act_list,
  show_chara_money_list,
  show_chara_debt_list,
  chara_info,
  chara_info_individual,
  chara_info_individual_wrapped,
};
