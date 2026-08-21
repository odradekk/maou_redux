/**
 * @file 调教目标选择画面：@SELECT_TARGET 的真身 + @SHOW_LIST_TRAINABLE 的
 * 骨架 + IS_TRAINABLE / IS_ASSISTABLE 判定（issue #44）。
 *
 * 源: target/ERB/SHOP/SHOP ver1.0.2.ERB  @SELECT_TARGET（:234-327）
 *     target/ERB/SHOP/SHOP_FUNCTION.ERB  @SHOW_LIST_TRAINABLE（:10-52）
 *     @IS_TRAINABLE（:105-112）/@IS_ASSISTABLE（:116-133）
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - 判定函数的 `ARG >= CHARANUM`（序号越界）按 ID 语义改写为「不在已
 *     加入列表」（CONTEXT.md：两种编号在原作重合但不等价，ere 一律用
 *     角色 ID——reset_out_of_range_pointers 的同款处理）；
 *   - @SHOW_LIST_TRAINABLE 的显示位计数（T_LCOUNT 只在渲染分支内自增，
 *     SHOP_FUNCTION.ERB:32-43）在原作是一处缺陷：翻页后窗口起点永远算
 *     出第 1 页的同一批人（T_LCOUNT 应按「可训练序号」而非「已渲染数」
 *     自增）。此处按显见意图移植——按可训练序号开窗，翻页真正翻页；
 *   - CLEARLINE 局部重绘与补行排版（:280-285/:311-321）不镜像：ere 控制台
 *     是滚动视图，翻页走整屏重绘（page-title/page-shop 同款先例）；
 *     LIST_POS/PREV_PAGE 滚动缓存随之退化为局部变量（原作调用侧本就
 *     从未读到被调侧的更新，缓存不生效）；
 *   - 列表行只渲染 `[编号] 名字`；富化列（职业 GET_JOB_NAME / 等级 /
 *     HP 条 / 调教回数 / 沦陷标签）待办，见 docs/stub-registry.md。
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const { stub_line } = require('#/utils/stub-line');
const { chara_callname } = require('#/utils/callname-utils');

/**
 * 本文件存根化的原作调用名（docs/stub-registry.md 核对固定）。
 */
const STUBBED_CALLS = ['MONSTER_PLAY', 'SHOW_LIST_TRAINABLE'];

/**
 * @IS_TRAINABLE（SHOP_FUNCTION.ERB:105-113，#FUNCTION）：编号可调教返回 0，
 * 否则 1（范围外/魔王）或 2（CFLAG:x:1 != 0，占用中）。
 * @param {number} cid 角色 ID
 * @returns {number} 0 = 可调教
 */
function is_trainable(cid) {
  // :109-110 SIF ARG < 1 || ARG >= CHARANUM || ARG == MASTER（=0，魔王）→ 1。
  // CHARANUM 判据的 ID 语义改写见文件头
  if (cid < 1 || !era.getAddedCharacters().includes(cid) || cid === 0) {
    return 1;
  }
  // :111-112 SIF CFLAG:ARG:1 != 0 → 2
  if ((era.get(`cflag:${cid}:1`) || 0) !== 0) {
    return 2;
  }
  return 0;
}

/**
 * @IS_ASSISTABLE（SHOP_FUNCTION.ERB:116-128，#FUNCTION）：可当助手返回 0，
 * 否则 1（范围外）/2（CFLAG:x:0 != 2，非助手役）/3（占用中）/4（当前目标）。
 * @param {number} cid 角色 ID
 * @returns {number} 0 = 可当助手
 */
function is_assistable(cid) {
  // :120-121 范围外（ID 语义改写，见 is_trainable）
  if (cid < 1 || !era.getAddedCharacters().includes(cid)) {
    return 1;
  }
  // :122-123 SIF CFLAG:ARG:0 != 2
  if ((era.get(`cflag:${cid}:0`) || 0) !== 2) {
    return 2;
  }
  // :124-125 SIF CFLAG:ARG:1 != 0
  if ((era.get(`cflag:${cid}:1`) || 0) !== 0) {
    return 3;
  }
  // :126-127 SIF TARGET == ARG（目标不能兼助手）
  if (era_flag.target === cid) {
    return 4;
  }
  return 0;
}

/**
 * @SHOW_LIST_TRAINABLE 的骨架：分页列出可选奴隶。
 *
 * @param {number} no_page 页码（0 起）
 * @param {number} num_page 每页人数（原作 #DIM NUM_PAGE = 26）
 * @returns {number} 可调教总人数（原作 LOCAL——注意返回的是**总数**不是
 *   本页渲染数；调用侧 RESULT < 1 即「列表为空」取消）
 */
function show_list_trainable(no_page, num_page) {
  const added = era.getAddedCharacters();
  const trainable = added.filter((cid) => is_trainable(cid) === 0);
  trainable.forEach((cid, index) => {
    // 显示窗口 [no_page*num_page+1, (no_page+1)*num_page+1)（1 起序号，
    // 按可训练序号开窗——原作缺陷的修正移植，见文件头）
    if (index >= no_page * num_page && index < (no_page + 1) * num_page) {
      // 原作行：PRINTFORM [{COUNT,2}] %SAVESTR:COUNT,12,LEFT% + 富化列（职业/
      // LV/HP 条/调教回数/爱慕·淫乱·未沦陷/收藏标记，整组待办）。
      //
      // 原作是纯文本 + INPUT 收数字；ere 侧改按钮，与本画面下方的翻页/返回
      // 四个按钮、以及 page-title、first-setting 的同款先例一致（实机上纯
      // 文本行点不动，玩家只能靠猜去敲编号）。accelerator 沿用原作编号 =
      // 角色 ID，输入侧的判定不变。
      //
      // 按钮正文不写 [编号] 前缀：引擎 showAcc 默认为真、自动拼成
      // `[快捷键] 正文`，手写会得到「[17] [17] 玛奥」（PR #30 实机踩过）。
      era.printButton(chara_callname(cid), cid);
    }
  });
  return trainable.length;
}

/**
 * @SELECT_TARGET（SHOP ver1.0.2.ERB:234-327）：调教目标选择画面真身。
 *
 * 分页列表 + 输入循环 + 取消路径；选中目标置 TARGET 与 FLAG:1（前回调教
 * 目标），选中可助手指针时置 ASSI 与 FLAG:2（原作如此——目标画面也能挑
 * 助手）。返回 0 = 取消/列表为空，1 = 选中。
 *
 * @returns {Promise<number>} 0 / 1（[1002] 其它入口的返回值随 MONSTER_PLAY
 *   存根恒 0）
 */
async function select_target() {
  const num_page = 26; // #DIM NUM_PAGE = 26
  // :242-254 可调教总数 → 最大页码（0 起；空表为 -1，但首渲染即 RETURN 0，
  // 页码不会被用到）
  const total = era
    .getAddedCharacters()
    .filter((cid) => is_trainable(cid) === 0).length;
  const max_page = Math.ceil(total / num_page) - 1;

  let no_page = 0; // #DIM NO_PAGE = 0（局部，非跨调用静态）
  // $INPUT_LOOP（:256-327；LIST_POS/PREV_PAGE 缓存不生效的说明见文件头）
  for (;;) {
    // :271-273 CUSTOMDRAWLINE = / 标题 / DRAWLINE（'=' 线以 isSolid 近似）
    era.drawLine({ isSolid: true });
    era.print('请魔王大人选择将要调教的奴隶人选');
    era.drawLine();
    // :275 CALL SHOW_LIST_TRAINABLE(NO_PAGE,NUM_PAGE,LIST_POS)；:276-279
    // RESULT < 1 → RETURN 0（列表为空 = 取消）
    if (show_list_trainable(no_page, num_page) < 1) {
      return 0;
    }
    // :280-285 补行对齐（CLEARLINE 排版）不镜像，见文件头
    era.drawLine();
    // :287-290 [1000] 上一页 / [999] 返回 / [1002] 其它 / [1001] 下一页
    //（按钮正文不带 [编号] 前缀——引擎自动拼，PR #30）
    era.printButton('- 上一页', 1000);
    era.printButton('返回', 999);
    era.printButton('其它', 1002);
    era.printButton('- 下一页', 1001);

    // :293 INPUT
    const result = await era.input();
    if (result === 999) {
      // :294-296 返回 → RETURN 0
      return 0;
    }
    if (result === 1002) {
      // :297-300 其它 → CALL MONSTER_PLAY（怪物游玩，存根）；RETURN RESULT
      stub_line('MONSTER_PLAY', '其它（怪物游玩）', '随怪物票');
      return 0;
    }
    if (is_trainable(result) === 0) {
      // :301-305 調教可能な対象 → TARGET = RESULT；FLAG:1 = TARGET；RETURN 1
      era_flag.target = result;
      era.set('flag:1', result);
      return 1;
    }
    if (is_assistable(result) === 0) {
      // :306-310 助手可能な対象 → ASSI = RESULT；FLAG:2 = ASSI；RETURN 1
      era_flag.assi = result;
      era.set('flag:2', result);
      return 1;
    }
    if (result === 1000) {
      // :311-316 上一页（页首不再退；CLEARLINE 不镜像）
      if (no_page > 0) {
        no_page -= 1;
      }
      continue;
    }
    if (result === 1001) {
      // :317-322 下一页（页尾不再进）
      if (no_page < max_page) {
        no_page += 1;
      }
      continue;
    }
    // :323-327 范围外（RESULT < 0 || RESULT >= CHARANUM）与其余输入：
    // CLEARLINE 1 + GOTO INPUT_LOOP —— 重绘不提示（ere：无 CLEARLINE，
    // 直接回循环头整屏重绘）
  }
}

module.exports = {
  STUBBED_CALLS,
  is_assistable,
  is_trainable,
  select_target,
  show_list_trainable,
};
