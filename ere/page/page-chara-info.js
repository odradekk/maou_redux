/**
 * @file 角色信息主屏：角色名册（四种排序视图）+ 个别角色详情页的骨架与
 * 导航（列表内容渲染真身；详情正文由 page-chara-info-show.js 的
 * show_chara_info 承载，#390 起实现，本文件只调用）。
 *
 * 调用方：page-shop.js 的 usershop 分发（result===101 → chara_info，
 * result===498/499 → chara_info_individual_wrapped（当前调教目标/助手））。
 *
 * 实现说明（取舍点均注明依据）：
 *   - 序号世界改写为角色 ID 世界（issue #21 通例，
 *     page-select-target.js/page-dungeon-info2.js 同款）：四个列表函数的
 *     翻页与排序数组一律基于 `era.getAddedCharacters()`（已加入角色 ID，
 *     天然无缺口），不做按下标的序号算术；魔王行经 added_chara_ids 滤掉、
 *     由表头单独打印，不需要「跳过魔王插入位、行数不足补空行」这类序号
 *     世界特有的补丁；
 *   - 「编号」视图的顺序按移植自建的排序编号（#545 返工：number_view_order，
 *     PORTCFLAG:角色:排序编号，默认＝角色 ID）。ere 里 ID 即身份，换号
 *     只交换排序编号这一个值，行内编号格显示的仍是角色 ID（＝可点击可手输的
 *     快捷键），细节与该取舍的依据见 page-chara-number-swap.js 文件头；
 *   - 名册的页码与排序选择是本函数的局部变量：子流程返回后不归零靠的是
 *     「同一轮循环 continue 重绘」；但**从名册之外重进**（主菜单 → 名单）
 *     会回初值——#391 起的既有取舍，保持不动（#606 曾让包装入口恒回 0、
 *     使这一取舍决定结婚是否结束本回合，#652 起包装入口改正为透传内层
 *     返回值，见 chara_info_individual_wrapped；换号页的页码是另一个
 *     模块级变量，跨次进入沿用，见 page-chara-number-swap.js 文件头）；
 *   - 「清掉刚画的几行就地重画」的局部重绘不做（page-dungeon-info2.js/
 *     page-select-target.js 同款先例）：本文件的 chara_info 与
 *     chara_info_individual 都是「每轮整屏重绘」的 `for(;;)` 循环；
 *   - 行首编号从「拼定宽文字」升级为真按钮（本项目通例：`[N] 文字`+键盘
 *     输入的惯用法升级为 `era.printButton`）——上一页/返回/下一页等原本
 *     就是按钮，这里额外把角色行本身也做成按钮，比「肉眼看号、手动敲号」
 *     更符合引擎的点击交互；
 *     **按钮正文不写编号**：`[N]` 由引擎按 showAcc 拼成 `[N] ` 一层
 *     （AGENTS.md 硬约束，PR #30 实机撞见 `[0] [0]`；#530 纠正魔王行、
 *     #535 纠正角色行）。定宽右对齐的编号（`[{n,MAX_NUM_LEN}]` 格式）
 *     做不到：引擎这条前缀不补齐位数、正文空白又被折叠成一个空格；
 *     排版在引擎里实测核对过（#535 验收评论）：各格是 el-col、`config.width`
 *     被引擎钳成 24 列网格的跨度（1-24），格的横向位置由跨度决定、不随前一格
 *     文本长度变化——编号格写成 `[1] `/`[11] ` 只影响本格自身填空的长度，
 *     不会带着后列左移；可见的姓名列只由姓名格内部的偏移决定，所以魔王行的
 *     名字格空档取 9 格（4 个全角空格 + 1 个半角空格），与角色行的「徽章
 *     8 格 + 1 个半角空格」同宽（原来给 10 格，实测「你」比角色行的名字
 *     右一个半角字符；#535 改成同宽的 9 格）；
 *   - HP/MP 双槽显示为纯文字 `HP{cur}/{max}`，不升级成 `printMultiColumns`
 *     的原生进度条格：一行要同时容纳编号按钮、状态徽章、姓名等级、攻防或
 *     种族性格、双槽、爱慕/淫乱/收藏/组队/归还六七个字段，原生进度条格
 *     占用独立网格列且不支持塞进彩色文字片段，硬凑会挤爆一行的可用宽度；
 *     `page-invasion.js`「文本条 → 原生进度条」的升级先例只适用于「一行
 *     一条」的场景，这里不适用。已知局限，留给真正在引擎里核对排版时调整；
 *   - 四个列表的行内彩色片段（爱慕/淫乱/组队/归还/侵攻迎击徽章）用
 *     `{content,color}` 片段数组承载（page-dungeon-info2.js 同款 fragments
 *     写法），颜色写成 `#rrggbb` 十六进制色值；
 *   - 角色行的按钮快捷键 = 角色 ID，与同屏的固定编号（表头 [1200]-[1500]、
 *     一并积极性 [1600]、换号 [1700]、上一页/返回/下一页 [997]-[999]）共存
 *     ——后代 ID 因此必须落在固定编号之上（chara-pregnancy.js 的
 *     FIRST_CHILD_ID = 100000，issue #560 的决定；静态检查见
 *     test/child-id-collision.test.js）；
 *   - case 8 / case 16 的分发沿用项目按钮输入通例：ere 的 input 只接受
 *     本轮已打印按钮的快捷键（#129），[8]/[16] 只在满足条件的分页打印，
 *     其余场合（含魔王页与按钮不显示的分页）键入会被输入层弹回——按钮的
 *     可见性判定因此变成访问限制。两处 case 内的注释写明，行为保持
 *     （第 1 轮验收补记）；
 *   - 立绘更换按钮 `[20]`：立绘系统判不移植（#542，#540 范围决定 4——
 *     开关默认关、素材不在仓库、只增强显示），#638 起按「缺内容的去掉
 *     入口」删除按钮与对应分支：显示条件里的立绘开关恒假，按钮本就永远
 *     按不到。打工 MOD 按钮同样判不移植，只保留默认态的 [18] 卖春积极性
 *     按钮（真身实现，分发见 chara_info_individual 的 case 18）；
 *   - 调试按钮 `[99] 修改角色`：本项目没有编译期调试开关的概念，按
 *     「非调试构建」处理——按钮本就不渲染；#638 起调试面板判不移植的
 *     处理分支一并删除；
 *   - case 500（前一人）/ case 600（后一人）的分发各有一支以魔王号
 *     （恒为 0 的角色号）为合取项的条件，逻辑与运算里恒假、实际不可达
 *     ——不保留死分支，只实现可达分支；
 *   - 「选中值为 0 时改写为魔王号」的分支（角色行选中处）同理恒假（魔王号
 *     就是 0），不需要代码，仅在注释中说明；
 *   - 换号与统一卖春积极性两个子流程曾按 MOD 内容登记占位；#540 起按
 *     「新增内容照常移植」处理，随 #545 实现真身——换号见
 *     ere/page/page-chara-number-swap.js（含「换号只换排列键」的做法与
 *     依据），统一卖春积极性见 ere/page/page-uniform-bitch-level.js。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
// 导入分组按 AGENTS.md（system 在 page 前；本文件存量的 chara-before-page
// 顺序是历史写法，新增行按约定位置放）
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

// —— show_chara_act ——

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
  // 未登记状态的回显串 -F\u3000―\u3000（"F" 是残留字符，字面量有意保留）
  return { content: '-F\u3000\u2015\u3000' };
}

// —— compare_chara_act ——

/**
 * @param {number} a 角色 a
 * @param {number} b 角色 b
 * @param {number} [act=2] 名次的基准状态（调用点恒传字面量 2；与
 *   chara_info 里控制排序模式切换的 sort_act 是两回事）
 * @returns {number} -1/0/1
 */
function compare_chara_act(a, b, act = 2) {
  if (a === b) return 0;
  const state_a = era.get(`cflag:${a}:1`) || 0;
  const state_b = era.get(`cflag:${b}:1`) || 0;
  const rank_a = (state_a + 11 - act) % 11;
  const rank_b = (state_b + 11 - act) % 11;
  if (rank_a !== rank_b) return rank_a < rank_b ? -1 : 1;
  // 这一支的条件按「(状态 ∈ {2,3}) && 楼层不等」结合，不是「状态 2 直
  // 接过、状态 3 才比楼层」——两态都吃楼层条件，楼层相等时整支不命中，
  // 落到末行的 `a < b ? -1 : 1`（#517）。
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

// —— chara_marriage_before ——

/**
 * 压缩家族码（TALENT:320）的「未婚前家族关系」描述，仅供
 * `CFLAG:x:601 == 0`（无配偶登记）时的婚姻括号列使用。
 *
 * 本函数返回字符串供拼进行内片段，不直接输出；类别 5 与未列举的类别
 * 无文本，返回空串。
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
  return ''; // 其余类别：无文本（空串）
}

/**
 * show_chara_act_list 行的婚姻括号文本（`[婚: ... ]` 内部，五路分支）。
 * @param {number} cid 角色 ID
 * @returns {string}
 */
function marriage_bracket_text(cid) {
  const spouse = era.get(`cflag:${cid}:601`) || 0;
  if (spouse === 900) return '野狗';
  if (spouse === 901) return name_of(0);
  if (spouse === 0) return chara_marriage_before(cid);
  if (spouse === 902) {
    // 情人（CFLAG:606）：读同一张登记表取裸文本（整行打印的场合另有
    // 14 格填充，此处拼进行内片段）
    return LOVER_NAMES.get(era.get(`cflag:${cid}:606`) || 0) ?? '';
  }
  // 其余配偶值：内部两支 `cflag:601==0` 条件在此处恒假
  // （外层已排除 spouse==0），无输出，只实现其余可达分支
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

// —— 列表行的共享渲染（四个列表函数共用的行结构） ——

/**
 * 名册第一行的魔王：编号做成**真按钮**（#530）。
 *
 * 名册这一轮的白名单非空——角色行按角色号、排序表头 1200-1700、翻页
 * 997/998、返回 999 都在同屏打印过，而 `added_chara_ids()` 把 0 滤掉了，
 * **没有别的按钮编号是 0**。纯文本的 `[0] …` 玩家因此敲不进编号（引擎只认
 * 本轮打印过的按钮快捷键），主循环里 `result === 0` 那条分支（主循环内
 * 的注释已引）会成为死支路。编号由
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

// —— show_chara_info_list ——

/**
 * @param {number} no_page 页码（0 起）
 * @returns {number[]} 本视图的角色 ID 顺序，供 chara_info_individual_wrapped
 *   的前一人/后一人导航复用；本视图是「编号」视图，顺序按排序编号
 *   （#545 返工，见 number_view_order）
 */
function show_chara_info_list(no_page) {
  const order = number_view_order();
  print_master_header();
  for (const cid of page_slice(order, no_page)) {
    print_chara_row(cid, atk_def_fragment(cid), common_suffix_fragments(cid));
  }
  return order;
}

// —— show_chara_act_list ——

/**
 * 插入排序重建「状态」视图的顺序（逐个扫描已填槽位、在首个比较结果为
 * 负处插入）——比较器不保证严格全序，必须保持同一套插入过程，不能替换
 * 成通用 `Array.prototype.sort`。
 * @param {number} act 0/1（chara_info 的 sort_act % 2）
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

// —— show_chara_money_list ——

/**
 * 按 CFLAG:580 降序、原始 ID 升序（迭代顺序）为次序的稳定排序——
 * `Array.prototype.sort` 规范保证稳定，直接实现即可，效果与「反复取
 * 当前最大值」的选择排序一致。
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

// —— show_chara_debt_list ——

/**
 * 与 show_chara_money_list 同构，取 CFLAG:582（借金，按负值存储）
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

// —— chara_info ——

/**
 * 角色名册主屏。
 * @returns {Promise<number>} 0 = 回到主菜单；1 = 回合结束（个别页触发的
 *   回合结束转场上浮）
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
      // uniform_bitch_level（#545 真身：page-uniform-bitch-level.js）。
      // 被调函数结束后回到名册循环：页码与排序选择在本函数里是局部
      // 变量，靠「同一轮循环 continue 重绘」在子流程返回后不归零（从名册
      // 之外重进会回初值，见文件头的取舍说明）
      await uniform_bitch_level();
      continue;
    }
    if (result === 1700) {
      // chara_number_swap（#545 真身：page-chara-number-swap.js）。唯一出口
      // [1999] 结束换号 → 回到名册循环（同上：同一轮 continue 沿用现值）；
      // 「返回 0」出口在确认屏只打印 [4000]/[4001] 的输入白名单下不可达
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
      // 选中角色行的范围判断（ID 语义：0=魔王或已加入角色）。「选中值
      // 为 0 时改写为魔王号」的分支恒假（魔王号就是 0），无需代码
      // sort_select === 1200 走包装入口（透传内层返回值，见该函数注释）；
      // 其余视图直调内层：两路的返回值都直达回合结束判断
      const sub_result =
        sort_select === 1200
          ? await chara_info_individual_wrapped(result)
          : await chara_info_individual(result, order);
      if (sub_result === 1) {
        return 1;
      }
      continue;
    }
    // 无效输入：整屏重绘（本项目每轮天然重绘，直接回到循环头）
  }
}

/**
 * chara_info_individual_wrapped：「编号」视图（sort_select === 1200）下
 * 打开个别信息页的入口——传入 number_view_order 的顺序（按移植自建
 * 的排序编号）作为前一人/后一人导航依据。
 *
 * 包装透传内层返回值：内层返回 1（婚礼完成 / enter_lover 成功）即上浮
 * 结束本回合，与其余视图一致。
 * @param {number} cid 角色 ID
 * @returns {Promise<number>} 内层的返回值（0 = 回到名册；1 = 回合结束）
 */
async function chara_info_individual_wrapped(cid) {
  return chara_info_individual(cid, number_view_order());
}

// —— chara_info_individual ——

/**
 * 个别角色信息页：详情正文存根 + 操作按钮 + 分页/换人导航。
 * @param {number} arg 角色 ID
 * @param {number[]} chara_sort 本次前一人/后一人导航所依据的顺序（调用方
 *   传入，页内不重算）
 * @returns {Promise<number>} 0 = 回到名册；1 = 回合结束（上浮给 chara_info）
 */
async function chara_info_individual(arg, chara_sort) {
  let current = arg;
  let sub_page = 0;

  for (;;) {
    const l_indx = current !== 0 ? chara_sort.indexOf(current) : -1;

    // #390 起正文换真身（sub_page 0-4 五页；正文的当前角色由显式 cid 承载）
    await show_chara_info(current, sub_page);

    const state = era.get(`cflag:${current}:1`) || 0;
    const hp = era.get(`base:${current}:0`) || 0;
    const max_hp = era.get(`maxbase:${current}:0`) || 0;
    const mp = era.get(`base:${current}:1`) || 0;
    const max_mp = era.get(`maxbase:${current}:1`) || 0;

    // 操作按钮块：sub_page 0-2 各按条件出一批按钮、sub_page 3 零按钮。
    // 记下行数差判断这一轮有没有打过按钮（块内只有 printButton，见 #596）
    const button_anchor = era.getLineCount();
    if (sub_page === 0) {
      // 两个改名按钮（#384 落真身：ere/chara/chara-name-edit.js）
      show_button_name_edit(0, current);
      show_button_name_edit(1, current, 1);
      // 三个动作按钮（#393 落真身，三个同构模块各一对）
      show_button_job_change(2, current);
      show_button_temptation(3, current);
      show_button_marriage(4, current);
      // show_button_child_care（#401 真身，ere/event/event-pregnancy.js）
      show_button_child_care(5, current);
      if (is_able_to_ability_up(current)) era.printButton('提升能力', 10);
      if (current !== 0) {
        era.printButton(
          era.get(`cflag:${current}:700`) || 0 ? '取消收藏' : '收藏',
          9,
        );
      }
      // [20] 更换立绘随 #638 删除：立绘系统判不移植（#542），
      // 按「缺内容的去掉入口」处理——按钮与对应分支一并移除（见文件头）
    } else if (sub_page === 1 || sub_page === 2) {
      if (is_trainable(current) === 0) era.printButton('设为目标', 6);
      if (is_assistable(current) === 0) era.printButton('设为助手', 7);
      // show_button_equip（#546 真身：system/equip/
      // equip-show.js——五道 OR 判定放行才渲染按钮，不放行时零输出）
      show_button_equip(16, current);
      // 打工 MOD（EX_FLAG:9000 第 2 位）判不移植（#542），只保留默认态的
      // [18] 卖春积极性按钮（档位文案
      // kojo-dungeon-bitch.js；引擎只送达已打印按钮的编号），打工变体
      // 按钮不渲染
      era.printButton('卖春积极性 - ' + bich_level_text(current), 18);
      if (is_able_to_cloth(current)) era.printButton('更换服装', 11);
      if (state === 8) era.printButton('解除固定', 12);
      if (state === 3) era.printButton('强行召回', 13);
      if (state === 0 && (hp < max_hp || mp < max_mp)) {
        era.printButton('回复体力', 14);
      }
      if (state === 0) era.printButton('提升等级', 15);
      if (state === 0) era.printButton('灵魂转移', 17);
      // [99] 修改角色（调试构建限定）：本项目没有编译期调试开关的概念，
      // 不渲染（文件头）
    }
    // sub_page === 3：条件都不命中，无操作按钮

    // 块尾的 println：打过按钮时只结束那一行（按钮
    // 行与分割线逐行相邻）；一个按钮都没打时它落在已收行的空行上 = 真空行
    // （sub_page 3，以及所有条件都不放行的角色页）
    if (era.getLineCount() === button_anchor) {
      era.println();
    }
    era.drawLine();
    era.printButton('前页', 101);
    era.printButton('返回', 100);
    era.printButton('后页', 102);
    if (current > 0) era.printButton('前一人', 500);
    // 显示条件按「角色总数含魔王（chara_sort.length+1）」换算成不含魔王的
    // `l_indx >= chara_sort.length - 1`；这里不额外要求 `l_indx >= 0`——
    // 魔王行（l_indx=-1）同样受这条条件支配，且 -1 通常小于
    // chara_sort.length-1，所以魔王行也会画出「后一人」（对应 case 600
    // 分发端 `current===0` 分支跳到 chara_sort[0] 的既有逻辑）。
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
        // 前一人（另一支分发条件以魔王号为合取项、恒假不可达，
        // 只实现可达分支，见文件头）
        if (l_indx > 0) current = chara_sort[l_indx - 1];
        else if (l_indx === 0) current = 0;
        continue;
      case 600:
        // 后一人（首支分发条件同上恒假，只实现可达分支）
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
        // ability_up_core（#397 真身：page/page-ability-up.js）
        if (is_able_to_ability_up(current)) {
          await ability_up_core(current);
        }
        continue;
      case 11:
        // tailor_core（#397 真身：page/page-tailor.js）
        if (is_able_to_cloth(current)) {
          await tailor_core(current);
        }
        continue;
      case 12:
        // 拘束台解放：此后直接走「返回名册」出口，
        // 不留在页内重画——与 case 13 同款
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
        // 改名（#384 落真身）
        await chara_info_name_edit(current);
        continue;
      case 1:
        // 恢复原名（#384 落真身）
        await chara_info_name_edit(current, 1);
        continue;
      case 2: {
        // chara_info_job_change（#393 真身）
        const job_result = await chara_info_job_change(current);
        if (job_result !== 2) return job_result; // 2 以外的返回值上浮
        continue;
      }
      case 3: {
        // temptation（#393 真身）。收尾按被调方的返回值
        // 分流：0/1 上浮给名册（0 = 回名册、1 = 回合结束），其余落回本页
        // 重画——三支「动作」都照此接（case 0/1/5 等其它 case 的「留在
        // 页内」是各自工单的既有处置，不在本张工单改动面内）
        const temptation_result = await temptation(current);
        if (temptation_result !== 2) return temptation_result;
        continue;
      }
      case 4: {
        // marriage（#393 真身；1 = 回合结束，上浮给
        // 名册——「结婚即结束本回合」是最初就写明的出口）
        const marriage_result = await marriage(current);
        if (marriage_result !== 2) return marriage_result;
        continue;
      }
      case 5:
        // child_care_chara（#401 真身；返回 2 是「侵攻中的
        // 勇者」防御支，此处与其它 case 同款忽略返回值，留在页内继续导航）
        await child_care_chara(current);
        continue;
      case 8:
        // random_self_call（#546 真身：chara/chara-
        // self-call.js）第 3 参传 1——自定义输入分支；[8] 按钮由 show_block
        // 渲染，见 components/chara-info-title.js）。
        // 有意偏离（第 1 轮验收补记）：[8] 只在非魔王的页 0/1 打印，ere 的
        // input 又只接受本轮已打印按钮的快捷键（#129）——可见性判定在这里
        // 变成了**访问限制**（魔王与第 2/3 页的一人称无法自定义）。行为
        // 保持，与项目按钮输入通例一致
        await random_self_call(current, undefined, 1);
        continue;
      case 9:
        if (current !== 0) {
          chara(current).chara.收藏 = chara(current).chara.收藏 ? 0 : 1;
        }
        continue;
      case 16:
        // equip_st_show（#546 真身：system/equip/equip-show.js）同步输出
        // 后等键，再 continue 回页首重画（本循环天然整页重绘）。
        // 有意偏离（第 1 轮验收补记）：装备查看条件不放行时只是不显示
        // [16] 按钮；ere 只接受已打印按钮的快捷键，不放行 = 完全
        // 不可达。行为保持，与项目按钮输入通例一致
        equip_st_show(current); // 同步纯输出，无等待；等待按键在下一行
        await era.waitAnyKey();
        continue;
      case 18:
        await set_bich_level(current);
        continue;
      // case 20（更换立绘）与 case 99（调试面板）随 #638 删除：
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
