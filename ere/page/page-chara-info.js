/**
 * @file 角色信息主屏：角色名册（四种排序视图）+ 个别角色详情页的骨架与
 * 导航（列表内容渲染真身；SHOW_CHARA_INFO 详情正文属 CHARA_INFO_SHOW
 * ver1.1.2.ERB，另票范围，本文件只存根占位）。
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
 *   - REDRAW 0/1、CLEARLINE 局部重绘不镜像（page-dungeon-info2.js/
 *     page-select-target.js 同款先例）：本文件的 CHARA_INFO 与
 *     CHARA_INFO_INDIVIDUAL 都是「每轮整屏重绘」的 `for(;;)` 循环；
 *   - 行首编号从「PRINTFORM 拼出的定宽文字」升级为真 PRINTBUTTON（本项目
 *     通例：`[N] 文字`+INPUT 惯用法升级为 `era.printButton`）——上一页/
 *     返回/下一页等原本就是 PRINTLC 按钮，这里额外把角色行本身也做成
 *     按钮，比原作的「肉眼看号、手动敲号」更符合本引擎的点击交互；
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
 *   - 立绘更换按钮 `[20]`（原作守卫含未落地的「立绘」资源开关）不渲染：
 *     该开关随资源票（#69）落地前，条件恒不具备渲染意义，登记为已知空缺；
 *   - `[IF_DEBUG][99] 修改角色[ENDIF]` 调试按钮不渲染：本项目未移植
 *     Emuera 的编译期调试开关概念，直接按「非调试构建」处理；
 *   - `CASE 500`（前一人）/`CASE 600`（后一人）原作各含一支
 *     `... && MASTER` 的判据，`MASTER` 是恒为 0 的角色号常量、逻辑与运算
 *     里恒假，两支分支实际不可达——1:1 精简为可达分支，不逐字保留死分支；
 *   - `RESULT == 0 && MASTER` 分支（角色行选中处）同理恒假，不需要代码，
 *     仅在注释中说明；
 *   - `CALL 換號` 的 `@換號` 定义在 `target/ERB/魔改新增/角色編號交換.ERB`
 *     （角色排序编号互换 UI，130 行）——不是死引用（先前一版票据记录有误，
 *     #391 勘误：`魔改新增/` 是已被 #329/#101 划出阶段 6 的 MOD 内容，本票
 *     只登记占位、不随本票移植该文件）。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { search_family } = require('#/chara/chara-family');
const { LOVER_NAMES } = require('#/dungeon/dungeon-lovers');
const { is_trainable, is_assistable } = require('#/page/page-select-target');
const { enemy_compare } = require('#/page/page-dungeon-info2');
const { get_look_info } = require('#/kojo/kojo-dungeon-bitch-log');
const { set_bich_level } = require('#/kojo/kojo-dungeon-bitch');
const {
  is_able_to_ability_up,
  is_able_to_cloth,
  chara_info_recover_hp,
  chara_info_up_level,
  chara_info_callback,
} = require('#/chara/chara-info-actions');
const { transfer_soul } = require('#/chara/chara-soul-transfer');
const { chara } = require('#/facade/chara');
const { game } = require('#/facade/game');
const { stub_line, stub_line_wait } = require('#/utils/stub-line');

const NUM_PAGE = 24;

/**
 * 本文件存根化的原作调用名（docs/stub-registry.md 核对固定）。
 */
const STUBBED_CALLS = [
  'SHOW_CHARA_INFO',
  'SHOW_BUTTON_NAME_EDIT',
  'SHOW_BUTTON_JOB_CHANGE',
  'SHOW_BUTTON_TEMPTATION',
  'SHOW_BUTTON_MARRIAGE',
  'SHOW_BUTTON_CHILD_CARE',
  'SHOW_BUTTON_EQUIP',
  'PTJ_BUTTON',
  'CHARA_INFO_NAME_EDIT',
  'CHARA_INFO_JOB_CHANGE',
  'TEMPTATION',
  'MARRIAGE',
  'CHILD_CARE_CHARA',
  'EQUIP_ST_SHOW',
  'CHAR_DEBUG',
  'RANDOM_SELF_CALL',
  '更换立绘',
  '统一卖春积极性',
  '换号',
];

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
  // Emuera && 优先于 ||：state_a==2 时不论楼层是否相等都进这支（相等时
  // "< " 判假，b 反而排前——原作如此，1:1 保留）
  if (
    state_a === 2 ||
    (state_a === 3 &&
      (era.get(`cflag:${a}:501`) || 0) !== (era.get(`cflag:${b}:501`) || 0))
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

function print_master_header() {
  era.print(
    `[0]\u3000\u3000\u3000\u3000\u3000${name_of(0)} LV${era.get('cflag:0:9') || 0}`,
  );
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
      content: `[${cid}]`,
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

function page_slice(ids, no_page) {
  return ids.slice(no_page * NUM_PAGE, (no_page + 1) * NUM_PAGE);
}

// —— @SHOW_CHARA_INFO_LIST（:114-217） ——

/**
 * @param {number} no_page 页码（0 起）
 * @returns {number[]} 本视图的角色 ID 顺序（原作 CHARA_SORT 的 ere 等价，
 *   供 CHARA_INFO_INDIVIDUAL_WAPPED 的前一人/后一人导航复用）
 */
function show_chara_info_list(no_page) {
  const order = added_chara_ids();
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
      await stub_line_wait(
        '统一卖春积极性',
        '一并调整全部角色的卖春积极性',
        '随卖春票',
      );
      continue;
    }
    if (result === 1700) {
      // 换号：@換號 定义在 target/ERB/魔改新增/角色編號交換.ERB（阶段 6 MOD
      // 内容，已被 #329/#101 划出本票范围，文件头有勘误说明）
      await stub_line_wait(
        '换号',
        '角色排序编号互换',
        '阶段 6 MOD 范围，随 MOD 票',
      );
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
      const sub_result =
        sort_select === 1200
          ? await chara_info_individual(result, added_chara_ids())
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
 * 个别信息页的入口——建 1..N 的顺位表（ere 侧用已加入 ID 表，见文件头）。
 * @param {number} cid 角色 ID
 * @returns {Promise<number>}
 */
async function chara_info_individual_wrapped(cid) {
  return chara_info_individual(cid, added_chara_ids());
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

    await stub_line(
      'SHOW_CHARA_INFO',
      '角色详情正文',
      'CHARA_INFO_SHOW ver1.1.2.ERB 另票',
    );

    const state = era.get(`cflag:${current}:1`) || 0;
    const hp = era.get(`base:${current}:0`) || 0;
    const max_hp = era.get(`maxbase:${current}:0`) || 0;
    const mp = era.get(`base:${current}:1`) || 0;
    const max_mp = era.get(`maxbase:${current}:1`) || 0;

    if (sub_page === 0) {
      await stub_line('SHOW_BUTTON_NAME_EDIT', '「改名」按钮', '随改名票');
      await stub_line('SHOW_BUTTON_NAME_EDIT', '「恢复原名」按钮', '随改名票');
      await stub_line('SHOW_BUTTON_JOB_CHANGE', '「转职」按钮', '随转职票');
      await stub_line('SHOW_BUTTON_TEMPTATION', '「魔的诱惑」按钮', '随堕落票');
      await stub_line('SHOW_BUTTON_MARRIAGE', '「结婚」按钮', '随结婚票');
      await stub_line('SHOW_BUTTON_CHILD_CARE', '「育儿室」按钮', '随育儿票');
      if (is_able_to_ability_up(current)) era.printButton('提升能力', 10);
      if (current !== 0) {
        era.printButton(
          era.get(`cflag:${current}:700`) || 0 ? '取消收藏' : '收藏',
          9,
        );
      }
      // [20] 更换立绘：守卫含未落地的资源开关，不渲染（文件头）
    } else if (sub_page === 1 || sub_page === 2) {
      if (is_trainable(current) === 0) era.printButton('设为目标', 6);
      if (is_assistable(current) === 0) era.printButton('设为助手', 7);
      await stub_line('SHOW_BUTTON_EQUIP', '「装备确认」按钮', '随装备票');
      await stub_line('PTJ_BUTTON', '兼职按钮', '随兼职票');
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

    era.print('');
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
        if (is_able_to_ability_up(current)) {
          await stub_line_wait(
            'ABILITY_UP_CORE',
            '能力提升核心流程',
            '随能力票',
          );
        }
        continue;
      case 11:
        if (is_able_to_cloth(current)) {
          await stub_line_wait('TAILOR_CORE', '换装核心流程', '随换装票');
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
        await stub_line_wait('CHARA_INFO_NAME_EDIT', '改名', '随改名票');
        continue;
      case 1:
        await stub_line_wait('CHARA_INFO_NAME_EDIT', '恢复原名', '随改名票');
        continue;
      case 2:
        await stub_line_wait('CHARA_INFO_JOB_CHANGE', '转职', '随转职票');
        continue;
      case 3:
        await stub_line_wait('TEMPTATION', '魔的诱惑', '随堕落票');
        continue;
      case 4:
        await stub_line_wait('MARRIAGE', '结婚', '随结婚票');
        continue;
      case 5:
        await stub_line_wait('CHILD_CARE_CHARA', '育儿室', '随育儿票');
        continue;
      case 8:
        // RANDOM_SELF_CALL(ARG,1)：MODE 1 是自定义输入改名分支，已落地的
        // random_self_call() 只实现 MODE 0（随机重掷），两者不是同一行为
        // （chara-init.js 文件头），此处不能借用，登记为独立存根
        await stub_line_wait(
          'RANDOM_SELF_CALL',
          '一人称改名（自定义输入模式）',
          '随改名票',
        );
        continue;
      case 9:
        if (current !== 0) {
          chara(current).chara.收藏 = chara(current).chara.收藏 ? 0 : 1;
        }
        continue;
      case 16:
        await stub_line_wait('EQUIP_ST_SHOW', '装备状态一览', '随装备票');
        continue;
      case 18:
        await set_bich_level(current);
        continue;
      case 20:
        await stub_line_wait('更换立绘', '更换立绘', '随资源票');
        continue;
      case 99:
        await stub_line_wait('CHAR_DEBUG', '角色调试面板', '调试功能，不移植');
        continue;
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
  STUBBED_CALLS,
  show_chara_act,
  compare_chara_act,
  chara_marriage_before,
  show_chara_info_list,
  show_chara_act_list,
  show_chara_money_list,
  show_chara_debt_list,
  chara_info,
  chara_info_individual,
  chara_info_individual_wrapped,
};
