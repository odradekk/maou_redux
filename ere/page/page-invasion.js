/**
 * @file 侵略画面：侵略入口分派（invasion()）、地上征服后菜单与水晶球投放
 *     菜单。侵略主流程（四条出兵路线、中途事件、据点横幅、结局判定）在
 *     system/invasion/ 下，本文件只画菜单、读输入、把派发交给那边。
 *
 * 以下移植说明覆盖整个侵略域（含 system/invasion/ 下的部分），按现象登记、
 * 不按文件分（issue #117 魔力出兵；issue #118 结局判定本体与 ENDING_1 接入；
 * issue #468 地上征服后菜单渲染与派发、campaign_menu 接通；issue #503 怪物
 * 出兵 / 勇者掠夺两条路线；issue #504 勇者出兵路线与 FORT / CHALLENGE 两
 * 分支；issue #505 地区续接与 start_campaign 的地区泛化）。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - CLEARLINE 局部重绘不镜像：ere 控制台是滚动视图，画面每次进入
 *     整屏重画（page-select-target 同款先例）；两个输入循环对无效输入
 *     只重问不重画，行为保留；
 *   - [999]/[1000] 旧版同行显示（叙述接等键，不换行）；ere 侧按钮是块级
 *     元素，拆成两个 printButton 各占一行，功能等价；
 *   - BARSTR 文本条 → era 原生进度条格（printMultiColumns 的 progress 格，
 *     page-train 先例）：barWidth 16 保住条后数值列（引擎缺省 24 会被
 *     el-col-0 吞掉，M155 的教训）；进度条标签按 AREA 取自 CAMPAIGN_REGIONS，
 *     为对齐 BAR 而在标签两侧写的全角空格一并丢弃（只留「侵攻度」
 *     「精灵族领域的侵攻度」这样的正文，与 #117 起的写法一致）；本路径无
 *     黄金样本（#108 接受），逐字锁随 #109 决定后补。SEIEI 战斗体的
 *     HP/气力条同款（`print_progress_line`）；
 *   - invasion_event() 的 RAND:10 分发**自 #503 起掷骰真分发**：#117 只
 *     做魔力路线时，三分支对 INV_TYPE == 1 一律「打印首档传闻后 RETURN -1」，
 *     掷不掷骰结果相同，故当时归约成直接调 SEIEI 分支。[0]/[3] 实现后
 *     INV_TYPE 取 0/3：CHALLENGE 的 `!= 0 && != 2 && != 3` 链对两者都放行；
 *     FORT 的 `FLAG:SINDO || INV_TYPE != 0 && ...` 按**同优先级左结合**（见
 *     invasion_event_fort 的注释）读成 `((FLAG:SINDO || INV_TYPE != 0) &&
 *     INV_TYPE != 2) && INV_TYPE != 3`——对 2/3 恒不早退、对 0 才看
 *     FLAG:SINDO，两条路线照样可达（已征服的 [3] 也进）。两分支真的可达，
 *     归约的依据当场失效，因此恢复真分发（#504 起三分支的行为体全部实现）；
 *   - **SINKOU 的按引用改写**：中途事件把 SINKOU 按引用参数传进传出，
 *     FORT/CHALLENGE 的强攻/潜入/绕路按比例削减它。ere 侧把
 *     `{sinkou, yusya_i}` 打包成 state 传进传出，`start_campaign()` 在调用
 *     后写回局部量再进侵攻結果共通；
 *   - **PRINTDATA / PRINTDATAL 的抽取**：等概率随机文本块由注入的 rand
 *     抽取、上界 = 块数（`printdata()`）——ere 侧无全局 RAND 序列（#117
 *     决议）；
 *   - [2] 出兵路线自 #504 起是真身（出兵流程 + 结果段）。结果段与
 *     #503 处理 [0]/[3] 时同一理由：不接就会掉进 [1] 的魔力结果段（打印
 *     「魔力爆发」并给魔王经验），是错误行为而不仅是缺功能；
 *   - **地区泛化（#505）**：`AREA`/`SINDO` 由 `CAMPAIGN_REGIONS` 表给出，
 *     各处按 AREA 分派的位置全部读表：出兵菜单标签、累加、四条结果段的
 *     地区名/已征服分支/进度条、invasion_ryouzyoku() 的地区号、kyoten_event()
 *     的实参。侵攻度一律读写 FLAG 侧（`flag:${AREA}`；EX_FLAG:101 没有写
 *     点，天神宫的累加在 FLAG:101）；[0] 的已征服分支列全五个地区。FLAG:101/102
 *     与 K1/K2 的「口上存在标志」同槽（yml/Flag.yml 保留区外的 1xx 段），
 *     累加会覆盖口上标志、读 FLAG:102 会把口上的存在当成「已征服」——#102
 *     查明、ExFlag.yml 头注登记，写侧的重叠保留、由用例钉住；
 *   - [2] 候选条件的第三条：带队者必须是助手可的角色（CFLAG:0 == 2），
 *     其余一律排除，由 `brute_rejected` 的注释与用例钉住；
 *   - SEIEI 战斗体的两处退场检查都判（领军勇者，精锐部队）——「魔王侧
 *     获得胜利」的判断条件是精锐部队倒下，不是魔王被打残；
 *
 *   - kyoten_event() 的 ARG 2/3/4 三分支只有判定骨架：推进赋值整体被注释，
 *     不输出任何内容、不推进，状态字维持原样。三分支随地区续接（#505）可达：
 *     出兵结算尾的 AREA 可取 86/88/90，侵攻度有写入路径。状态字（FLAG:94/95/96）
 *     没有写点：94 号被挪作「人数上限阶梯」的判断条件，CHALLENGE 用的是
 *     EX_FLAG:95 位域；
 *
 *   - FORT 的 [3] 绕路支（勇者掠夺路线）掷 RAND:10：九成平安无事（体力
 *     ×9/10、直接 RETURN 0）、一成埋伏（RETURN 1），与怪物路线同构；
 *
 *
 *   - FORT/CHALLENGE 的 `LOCAL:3`（领军勇者的种族号）与 `LOCAL:12`（复现
 *     职业）都是局部量数组的元素，不是位运算；CHALLENGE 的职业在选区时
 *     就掷定下（早于位域检查的早退），顺序照此；
 *
 *   - SEIEI 战斗体的先制检查用 `SINKOU/2048+1`、伤害式用 `SINKOU/1024+1`
 *     ——两处除数不同是不对称的既有行为，有意不统一；
 *
 *   - 精锐部队的清退在扁平化（#21）下直接用角色号 18/19——
 *     `getAddedCharacters()` 是按角色号升序的名单、取不回「最后加入的一位」
 *   - RESTART 按「回到当前函数开头重新执行」语义（局部量不重置）处理：
 *     invasion() 的开头是按 FLAG:82 分派的征服后菜单，故用 RESTART 常量把
 *     信号透传给 invasion() 的外层循环，由那里重走「分派 → 菜单」（先例：
 *     page-chara-info-show.js 的返回 true 外层重画）；
 *   - %SAVESTR:MASTER%（魔王存档名）经 callname:0:-1 承载（#5 决议，
 *     utils/callname-utils），新档 =「你」；
 *   - 地上征服后菜单（post_conquest_menu，#468）：[0] 复用 start_campaign()
 *     （结算与返回值完全一致）；[4] ARCANA_FORT 接真身（#470，invasion 域跨域
 *     调用不受限）；[1]/[2]/[3]/[5] 自 #505 起按 CAMPAIGN_REGIONS 取
 *     AREA/SINDO 后汇入同一个 start_campaign()；
 *
 *   - [5] 天神宫的渲染与派发共用同一道 route_33 > 500 检查：按钮只在窗口
 *     内渲染，派发拒收窗口外的值，玩家看不到「可选却进不去」的按钮；
 *
 *   - [1001]（AGENT_MENU）是复制改名事故（#103 判定）、不排期——缺内容的
 *     入口随 #638 一并删除：键入 1001 落到 >=6 的拒收支重问；
 *
 *   - FORT 与 CHALLENGE 的选项按钮化（PR #53 的「子画面选项按钮化」通则）：
 *     引擎白名单先一步挡下未渲染的值，`!INRANGE(RESULT,1,3)` 等三处重问支
 *     在真引擎里不可达——结构保留作防御（page-intercept 的等级门同款
 *     处置）；
 *
 *   - barWidth / 连续空白：`怪物数量减少了10\%` 的 `\%` 是打印语法的转义，
 *     值是字面量 `10%`；叙述 + 等键的两段式输出按既有惯例并入一次 print
 *     （退场检查的三条溃败文案、FORT/CHALLENGE 的多处两段式）。
 *
 */

const era = require('#/era-electron');
const era_flag = require('#/era-utils/era-flag');
const era_exflag = require('#/era-utils/era-exflag');
const { arcana_fort } = require('#/system/invasion/invasion-arcana-fort');
const {
  CAMPAIGN_REGIONS,
  HUMAN_WORLD,
  RESTART,
  start_campaign,
} = require('#/system/invasion/invasion-campaign');
const { print_progress_line } = require('#/system/invasion/invasion-progress');
const { campaign_menu } = require('#/page/page-campaign');
const { change_screen } = require('#/utils/screen-change');
const { chara } = require('#/facade/chara');
const { pad_left } = require('#/utils/display-width');
const { COUNT_RULE } = require('#/utils/input-rule');
// sengen_video 与 sengen_video_bonus 的十二处 ×小数 用 times 而非 times_exact：
// 旧引擎的双精度与 JS 同为 IEEE 754，两边逐位同值，不需要十进制精确乘
const { default_rand, times } = require('#/utils/numeric');

/** 宣传影像顶栏的两格宽度（引擎 24 列网格，两格各占一半） */
const TOP_BAR_COLUMN_WIDTH = 12;

/**
 * 数量读数（sengen_video 的两处「要投放多少」）：这一轮没有打印按钮，
 * 非数字由 `rule` 挡在输入框里——引擎不回传不合法值，`count` 因此恒为数值，
 * 不会再把 NaN 写进 `EX_FLAG:9011`。上界取自库存这类活数据，越界仍由
 * 调用点判定（见 utils/input-rule.js）。
 *
 * 其余读数（菜单与列表选人）都在打印按钮的轮次里，白名单先一步拦下非数字，
 * 直接用 `era.input()`。
 *
 * @returns {Promise<number>} 玩家输入的数量
 */
async function count_input() {
  return era.input({ rule: COUNT_RULE });
}

/**
 * `FORMAT {值,N}` 的定宽：位数不足补半角空格（右对齐；数字是半角，
 * 与全角算两格的规则无关）。
 * @param {number} value 数值
 * @param {number} width 显示位数
 * @returns {string}
 */
function pad_number(value, width) {
  return pad_left(String(value), width);
}

/**
 * sengen_video_bonus：投放量的随机加成。
 *
 * RESULT 是**按引用回传**的实参（`TIMES RESULT, …` 直接改写调用方的
 * RESULT），ere 侧改成返回值由调用方接。MODE 0（普通）先跳 `$MODE_0`
 * 段，只掷两枚；MODE 1（奸商）先掷三枚加成再落同一段——
 * **判定顺序即 RAND 消费顺序，不可交换**。
 * MODE 1 只会变大（`RESULT <= M → RESULT = M` 保底），
 * MODE 0 可能缩水到 0（×0.80 截断），调用方据此走「投放失败」分支。
 *
 * @param {number} result 投放数（RESULT 的传入值）
 * @param {number} [mode] 0 = 普通，1 = 奸商（MODE 的默认值 0）
 * @param {(n: number) => number} [rand] 随机源（RAND:2/3/4 的上界）
 * @returns {number} 加成后的投放数（回写的 RESULT）
 */
function sengen_video_bonus(result, mode = 0, rand = default_rand) {
  const base = result; // M = RESULT
  let placed = result;
  if (mode !== 0) {
    // 奸商加成段（MODE == 0 时被跳过）
    placed = times(placed, 1.1);
    if (rand(2) === 0) placed = times(placed, 1.2);
    if (rand(3) === 0) placed = times(placed, 1.2);
    if (rand(4) === 0) placed = times(placed, 1.2);
  }
  // $MODE_0 段，两种 MODE 共用
  if (rand(2) === 0) placed = times(placed, 1.2);
  if (rand(3) === 0) placed = times(placed, 0.8);
  // 提示与保底（四条 SIF 的先后即输出次序）
  if (placed > base && mode === 1) {
    era.print('奸商们制作更多的版本提升了投放效果。');
  }
  if (mode === 1 && placed <= base) {
    placed = base;
  }
  if (placed > base && mode === 0) {
    era.print('在投放过程中似乎传出了不同的版本，投放效果提升了。');
  }
  if (placed < base) {
    era.print('似乎有些水晶球投放不是太成功。');
  }
  return placed;
}

/**
 * sengen_video：水晶球投放菜单（post_conquest_menu 的 [1000]，进入后
 * RETURN 0）。
 *
 * 四档操作：投放、雇奸商代理投放（付 5000G/枚 或 1 枚勋章）、花钱增强
 * 流行效果、花钱延长流行时间；[999] 退出。
 *
 * 循环写法沿用文件头的既有取舍：回主菜单重画整屏、子画面只重问不重画；
 * 选项 `PRINTL [n] …` 改 printButton（引擎自动拼 `[n] `，正文不得自带前缀，
 * PR #30）；`{值,N}` 走 pad_number。
 *
 * 两处行为在此登记：
 *   - 犒赏段的两条按钮渲染条件（`(M*5000) < MONEY`、`M < EXP:0:81`）与
 *     接受条件同式，支付发生在**加成之后**、判断条件用的是 `M`（= 投入数）。
 *     犒赏段只有这两枚按钮是出口，所以投放前的检查取这组条件的反面：
 *     `M*5000 >= MONEY` 且 `M >= 勋章数`（两枚都不显示）时在投放前就拒绝，
 *     否则恰好相等的数量会进到没有按钮可按的犒赏段，永远出不去；
 *   - 效果增强与时长延长在随机段之后各有一道封顶（×2 / +5）与一道保底
 *     （时长的 `(9013 - M) < 1 → M + 1`，即最小也涨 1 天）。
 *
 * 三处由引擎行为带出的说明（都不是行为偏离）：
 *   - 两处数量读数（「要投放多少」）走 count_input()：那一轮没有按钮，
 *     非数字由 rule 挡在输入框里；其余读数都在打印按钮的轮次里，白名单
 *     先一步拦下非数字，直接用 era.input()；
 *   - 菜单每轮至少打印 `[999]`，所以 `STOCK == 0 && RESULT != 999` 与落尾
 *     的空 ELSE 在真引擎里都不可达——白名单外的手工键入送不到游戏层，两
 *     支都按原样保留；
 *   - 顶栏原按 `\t\t` 与前导 NBSP 补位对齐；引擎输出走 HTML 会折叠连续
 *     空白，列对齐在实机上不成立，改由网格两格（各 12 列）承担。
 *
 * @param {(n: number) => number} [rand] 随机源（增强段的 RAND:2/5 与
 *   SENGEN_VIDEO_BONUS 的上界）
 * @returns {Promise<0>} 两条出口都 RETURN 0
 */
async function sengen_video(rand = default_rand) {
  // $INPUT_LOOP（画在循环头：GOTO INPUT_LOOP 即重画）
  menu: for (;;) {
    // 每轮绘制前换屏：画面上只有当前这一屏（ADR-0009）
    await change_screen();
    const stock =
      era_exflag.crystal_ball_stock - era_exflag.crystal_ball_deployed;
    era.drawLine();
    // 顶栏两格同行（各 12 列）：左格投放数、右格已投放数
    era.printMultiColumns([
      {
        type: 'text',
        content: `可用于投放的水晶球${pad_number(stock, 3)}部`,
        config: { width: TOP_BAR_COLUMN_WIDTH, align: 'left' },
      },
      {
        type: 'text',
        content: `已投放${pad_number(era_exflag.crystal_ball_deployed, 3)}部`,
        config: { width: TOP_BAR_COLUMN_WIDTH, align: 'left' },
      },
    ]);
    // 两者都非零才显示流行中的数量与剩余天数
    if (era_exflag.crystal_ball_popularity && era_exflag.crystal_ball_expire) {
      era.printMultiColumns([
        {
          type: 'text',
          content: `正流行的有${pad_number(era_exflag.crystal_ball_popularity, 3)}部`,
          config: { width: TOP_BAR_COLUMN_WIDTH, align: 'left' },
        },
        {
          type: 'text',
          content: `${pad_number(era_exflag.crystal_ball_expire, 2)}天后将过时`,
          config: { width: TOP_BAR_COLUMN_WIDTH, align: 'left' },
        },
      ]);
    } else {
      era.print('目前没有投放中的水晶球');
    }
    era.drawLine();
    if (stock > 0) {
      era.printButton('投放水晶球', 1);
      era.printButton('派奸商投放水晶球', 2);
      era.printButton('增强流行效果', 3);
      era.printButton('延长流行时间', 4);
    } else {
      era.print('当前没有可以用于投放的水晶球');
    }
    era.drawLine();
    era.printButton('离开', 999);

    const result = await era.input();
    if (stock === 0 && result !== 999) {
      continue; // （引擎白名单先一步拒收未渲染的 [1]-[4]）
    }

    if (result === 1) {
      // 投放
      era.drawLine();
      era.print('通过投放拍摄的影像，激起反抗魔王的决心。');
      era.drawLine();
      era.print('请输入要投放的数量');
      // $INPUT_LOOP_TMP0（0 = 回菜单，超量 = 只重问）
      let count;
      for (;;) {
        count = await count_input();
        if (count === 0) {
          continue menu; // GOTO INPUT_LOOP
        }
        if (count > stock) {
          era.print('超出数量，请重新输入');
          continue; // GOTO INPUT_LOOP_TMP0
        }
        break;
      }
      era_exflag.crystal_ball_deployed += count; // EX_FLAG:9011 += RESULT
      // sengen_video_bonus 的返回值即回写后的投放数
      const placed = sengen_video_bonus(count, 0, rand);
      if (placed >= 1) {
        era.print(`成功投放${placed}部水晶球`);
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
        era_exflag.crystal_ball_popularity += placed;
        era_exflag.crystal_ball_expire += placed;
      } else {
        era.print('投放，似乎失败了。');
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
      }
      // 分支出口已各自等键（PRINTFORMW 的 WAIT），回菜单换屏前无未读输出
      continue; // GOTO INPUT_LOOP
    }

    if (result === 2) {
      // 奸商代理投放
      era.drawLine();
      era.print('通过奸商代理投放拍摄的影像，或许更能激起反抗魔王的决心。');
      era.print('但需要收取代理酬劳，每部5000G或是1枚勋章。');
      era.drawLine();
      era.print('请输入要投放的数量');
      // $INPUT_LOOP_TMP1
      let count;
      for (;;) {
        count = await count_input();
        if (count === 0) {
          continue menu; // GOTO INPUT_LOOP
        }
        if (count > stock) {
          era.print('超出可投放数量，请重新输入');
          continue; // GOTO INPUT_LOOP_TMP1
        }
        // 两种酬劳都付不起：重问（与犒赏按钮的显示条件互补，见函数 JSDoc）
        if (
          count >= chara(0).event.勋章经验 &&
          count * 5000 >= era_flag.money
        ) {
          era.print('没有足够的奖赏来打动奸商');
          continue; // GOTO INPUT_LOOP_TMP1
        }
        break;
      }
      era_exflag.crystal_ball_deployed += count; // EX_FLAG:9011 += RESULT
      // 奸商模式的 sengen_video_bonus；犒赏段消费的
      // M 就是调用前的投入数（M 是全局量，赋值后一直留到调用方）
      const base = count;
      const placed = sengen_video_bonus(count, 1, rand);
      if (placed >= 1) {
        era.print(`成功投放${placed}部水晶球`);
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
        era_exflag.crystal_ball_popularity += placed;
        era_exflag.crystal_ball_expire += placed;
        if (base * 5000 < era_flag.money) {
          era.printButton('犒赏金币', 1);
        }
        if (base < chara(0).event.勋章经验) {
          era.printButton('犒赏勋章', 2);
        }
        // $INPUT_LOOP_TMP2（无效输入重问；投放前的检查保证至少有一枚按钮）
        for (;;) {
          const pay = await era.input();
          if (pay === 1 && base * 5000 < era_flag.money) {
            era.print(`犒赏了奸商${base * 5000}G`);
            era_flag.money -= base * 5000; // MONEY -= (M * 5000)
            era_exflag.legit_money -= base * 5000; // EX_FLAG:4444 -=
            break;
          }
          if (pay === 2 && base < chara(0).event.勋章经验) {
            era.print(`犒赏了奸商${base}枚勋章`);
            chara(0).event.勋章经验 -= base; // EXP:0:81 -= M
            break;
          }
          // ELSE → GOTO INPUT_LOOP_TMP2
        }
        // 犒赏播报在回菜单换屏前经按键确认（ADR-0009）
        await era.waitAnyKey();
      } else {
        era.print('投放，似乎失败了。');
        await era.waitAnyKey(); // PRINTFORMW 的 WAIT
      }
      continue; // GOTO INPUT_LOOP
    }

    if (result === 3) {
      // 增强流行效果
      era.drawLine();
      era.print('通过奸商代理投放拍摄的影像，增强投放的效果。');
      era.print('将收取50000G或是5枚勋章。');
      era.drawLine();
      era.print('请选择要支付方式');
      if (era_flag.money > 50000) {
        era.printButton('支付金币', 1);
      }
      if (chara(0).event.勋章经验 > 5) {
        era.printButton('支付勋章', 2);
      }
      era.printButton('离开', 999);
      // $INPUT_LOOP_TMP3
      for (;;) {
        const pay = await era.input();
        if (pay === 1 && era_flag.money > 50000) {
          era.print('犒赏了奸商50000G');
          era_flag.money -= 50000;
          era_exflag.legit_money -= 50000;
          break;
        }
        if (pay === 2 && chara(0).event.勋章经验 > 5) {
          era.print('犒赏了奸商5枚勋章');
          chara(0).event.勋章经验 -= 5;
          break;
        }
        if (pay === 999) {
          continue menu; // GOTO INPUT_LOOP
        }
        // ELSE → GOTO INPUT_LOOP_TMP3
      }
      // ×1.20，1/5 再 ×1.60，1/2 再 ×1.20，封顶 ×2
      const before = era_exflag.crystal_ball_popularity; // M = EX_FLAG:9012
      let grown = times(before, 1.2); // TIMES EX_FLAG:9012, 1.20
      if (rand(5) === 0) grown = times(grown, 1.6);
      if (rand(2) === 0) grown = times(grown, 1.2);
      if (grown > before * 2) grown = before * 2;
      era_exflag.crystal_ball_popularity = grown;
      era.print('因为剪辑出了更多的版本，投放效果增强了');
      // 支付与效果播报在回菜单换屏前经按键确认（ADR-0009）
      await era.waitAnyKey();
      continue; // GOTO INPUT_LOOP
    }

    if (result === 4) {
      // 延长流行时间
      era.drawLine();
      era.print('通过增加投放量延长流行时间。');
      era.print('将收取50000G。');
      era.drawLine();
      if (era_flag.money > 50000) {
        era.printButton('支付', 1);
      }
      era.printButton('算了', 999);
      // $INPUT_LOOP_TMP4
      for (;;) {
        const pay = await era.input();
        if (pay === 1 && era_flag.money > 50000) {
          era.print('支付了50000G');
          era_flag.money -= 50000;
          era_exflag.legit_money -= 50000;
          break;
        }
        if (pay === 999) {
          continue menu; // GOTO INPUT_LOOP
        }
        // ELSE → GOTO INPUT_LOOP_TMP4
      }
      // ×1.20，1/5 再 ×1.60，1/2 再 ×1.20，封顶 +5、保底 +1
      const before = era_exflag.crystal_ball_expire; // M = EX_FLAG:9013
      let grown = times(before, 1.2); // TIMES EX_FLAG:9013, 1.20
      if (rand(5) === 0) grown = times(grown, 1.6);
      if (rand(2) === 0) grown = times(grown, 1.2);
      if (grown > before + 5) grown = before + 5;
      if (grown - before < 1) grown = before + 1;
      era_exflag.crystal_ball_expire = grown;
      era.print('流行时间延长了');
      // 支付与播报在回菜单换屏前经按键确认（ADR-0009）
      await era.waitAnyKey();
      continue; // GOTO INPUT_LOOP
    }

    if (result === 999) {
      return 0; // （[999] 的 RETURN 0 与紧随其后落尾的空 ELSE 同值）
    }
    // 其余值落在空 ELSE 上：落尾即隐式 RETURN 0，同样退出菜单。
    // 真引擎里同样不可达（菜单每轮都打印 [999]，白名单外的手工键入送不到
    // 游戏层），两支都按原结构保留
    return 0;
  }
}

/**
 * invasion：侵略画面入口，按 FLAG:82 分派。
 *
 * 返回 0 = 取消（不消耗回合，回主菜单）；返回 1 = 回合已耗（调用方
 * page-shop 的 [109] 分支据此 BEGIN TURNEND）；结局选了退出时返回
 * STATE.TITLE（回标题的转场目标，#852，调用方用 is_state 分辨）。
 *
 * 外层 `for (;;)` 承载 RESTART：菜单与其下各层
 * 把 RESTART 信号原样返回，这里重走入口分派——与「回到函数开头重新执行」
 * 等价（RESTART 常量的说明见上）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（透传到出兵路线）
 * @returns {Promise<number|string>} 0 / 1，或转场目标 STATE.TITLE
 */
async function invasion(rand = default_rand) {
  for (;;) {
    const result =
      era_flag.human_realm_fallen !== 0
        ? await post_conquest_menu(rand) // IF FLAG:82：地上征服后菜单（#468）
        : await start_campaign(rand); // ELSE：目标区域默认人间界
    if (result !== RESTART) {
      return result;
    }
  }
}

/**
 * post_conquest_menu：地上征服后的地区选择菜单（#468）。
 *
 * 五条状态行（人间界固定「已征服」；精灵/龙之山/天界随各自 FLAG:87/89/91
 * 征服标记切换标签；天神宫随 route_33 开窗或 shrine_stage >= 4 切换，两
 * 条件都不满足时不渲染；圣灵骑士堡垒没有状态行，仅按钮文案随
 * FLAG:92 == 15 切换）+ 六个可选分支（[0] 与 [1]/[2]/[3]/[5] 都转
 * start_campaign()，区别只在地区实参——[1]/[2]/[3]/[5] 自 #505 起是真身；
 * [4] 转 arcana_fort() 真身，#470）+ [9] campaign_menu() + [999] 退出 +
 * [1000] sengen_video() + 已删除的 [1001] 分支（随 #638 去掉，
 * 键入 1001 落到拒收支——见文件头）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（转 start_campaign）
 * @returns {Promise<number|typeof RESTART>} 0 / 1；RESTART = 出兵路线里
 *   的 RESTART，由 invasion() 的外层循环重走入口分派
 */
async function post_conquest_menu(rand = default_rand) {
  // 每轮绘制前换屏：画面上只有当前这一屏（ADR-0009）——invasion() 的
  // RESTART 重入与本函数首绘都从这里开始
  await change_screen();
  // 五条状态行（BARSTR 偏离说明见文件头；圣灵骑士堡垒没有状态行，
  // 只有按钮，见下方 [4] 的注释）
  print_progress_line(
    '地上的魔界领土侵攻度',
    era_flag.human_realm_invasion,
    10000,
  );
  print_progress_line(
    era_flag.elf_realm_conquered >= 1
      ? '黑暗精灵的领土侵攻度'
      : '精灵族的领域侵攻度',
    era_flag.elf_realm_invasion,
    10000,
  );
  print_progress_line(
    era_flag.dragon_realm_conquered >= 1
      ? '混沌龙之山侵攻度'
      : '龙之山脉侵攻度',
    era_flag.dragon_realm_invasion,
    10000,
  );
  print_progress_line(
    era_flag.heaven_conquered >= 1 ? '堕天使的淫界侵攻度' : '天界侵攻度',
    era_flag.heaven_invasion,
    10000,
  );
  // route_33 的开窗区间（501-539 与 541-559，540 是区间里的空档）。窗口
  // 开着时 [5] 可点；派发对一切 route_33 > 500 放行（含 540 空档与 ≥560），
  const route_33_open =
    (era_exflag.route_33 >= 501 && era_exflag.route_33 < 540) ||
    (era_exflag.route_33 >= 541 && era_exflag.route_33 < 560);
  if (route_33_open) {
    print_progress_line('天神宫侵攻度', era.get('flag:101') || 0, 10000);
  } else if (era_exflag.shrine_stage >= 4) {
    print_progress_line(
      '淫乱意志的神宫侵攻度',
      era.get('flag:101') || 0,
      10000,
    );
  }
  era.drawLine();
  era.print('地面上已被你征服了，你指挥着你的军队准备进攻其他领土………');
  era.printButton('- 巡视地上的魔界领土（已征服）', 0);
  era.printButton(
    era_flag.elf_realm_conquered >= 1
      ? '- 巡视黑暗精灵的领土（已征服）'
      : '- 入侵精灵族的领域',
    1,
  );
  era.printButton(
    era_flag.dragon_realm_conquered >= 1
      ? '- 巡视混沌龙之山（已征服）'
      : '- 入侵龙之山脉',
    2,
  );
  era.printButton(
    era_flag.heaven_conquered >= 1
      ? '- 巡视堕天使的淫界（已征服）'
      : '- 入侵天界',
    3,
  );
  // FLAG:92（arcana_fort_stage）是位掩码，不是线性阶段数：&1 东 &2 南
  // &4 西 &8 北（arcana_fort 自身按 |= 逐门置位），
  // 15 = 四门全破；这里只判「是否全部攻陷」，不代表推进到第几关
  era.printButton(
    era_flag.arcana_fort_stage === 15
      ? '- 巡视圣灵骑士的卖春堡垒（已征服）'
      : '- 攻略圣灵骑士的堡垒',
    4,
  );
  // [5] 的渲染与派发同一道检查（route_33 > 500）：窗口开着才渲染，
  // 标签随剧情阶段切换；派发拒收窗口外的键入（见下方派发检查）。
  if (era_exflag.route_33 > 500) {
    if (era_exflag.shrine_stage >= 4) {
      era.printButton('- 巡视淫乱意志的神宫（已征服）', 5);
    } else if (era_exflag.shrine_stage >= 1) {
      era.printButton('- 天神宫广场', 5);
    } else if (route_33_open) {
      era.printButton('- 攻略天神宫', 5);
    }
  }
  era.printButton('- 向着世界之外', 9); // 旧文本作「向著」，#60 归一为简体
  era.drawLine();
  era.printButton('- 退出', 999);
  // [1000] 的分子/分母走具名门面（#502 起；此前的「无门面、直读」注释
  // 已过时，era-exflag.js 的 crystal_ball_deployed/stock 早已备好）
  era.printButton(
    `向城里投放水晶球[${era_exflag.crystal_ball_deployed}/${era_exflag.crystal_ball_stock}]`,
    1000,
  );

  // $INPUT_LOOP2：无效输入重问不重画（GOTO，见文件头）
  for (;;) {
    const result = await era.input();
    if (result === 999) {
      return 0;
    }
    if (result === 1000) {
      // 调 sengen_video → RETURN 0（#502 起真身）；注释单占一行，
      // 免得变异条目的 find 串把这行注释当定位串
      await sengen_video();
      return 0;
    }
    // 的 ELSEIF RESULT == 1001 分支随 #638 删除（#103：
    // 复制改名事故、不排期，缺内容的入口去掉），键入 1001 落到
    // 下方的 >=6 拒收支继续重问
    if (result === 9) {
      await campaign_menu();
      return 0;
    }
    if (result === 5 && era_exflag.route_33 <= 500) {
      // [5] 的派发检查与按钮渲染同款（route_33 > 500）：
      // 窗口外键入 5 按无效输入重问
      continue;
    }
    if (result >= 6 || result < 0) {
      continue;
    }

    // 地区选择：RESULT → AREA/SINDO 下标对（CAMPAIGN_REGIONS），
    // 五条分支此后都落到同一个 $START1
    if (result === 0) {
      // 人间界：复用出兵流程；其内部的 RESTART（出兵路线里的
      // [999] 返回等）原样透传，由 invasion() 的外层循环回到入口分派
      return await start_campaign(rand, HUMAN_WORLD);
    }
    if (result === 4) {
      // CALL ARCANA_FORT：RETURN 1（打了一仗、回合已耗）→ 本函数
      // 同样 RETURN 1，由调用方 BEGIN TURNEND；0（撤退/无候选/已全破）→ 0
      return await arcana_fort();
    }
    if (result === 5 && era_exflag.shrine_stage >= 3) {
      era_exflag.shrine_stage = era_exflag.shrine_stage + 1;
    }
    // 精灵/龙/天界/天神宫：取各自的 AREA/SINDO（天神宫的
    // 副作用已在上一步应用），此后都汇入 $START1
    return await start_campaign(rand, CAMPAIGN_REGIONS[result]);
  }
}

module.exports = {
  invasion,
  post_conquest_menu,
  sengen_video,
  sengen_video_bonus,
};
