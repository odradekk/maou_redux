/**
 * @file 设置页的年龄/三围子菜单与种族年龄编辑器（issue #547）。
 *
 * 源: target/ERB/キャラ関数/CHARA_BODY.ERB  @CONFIG_AGE_SETTING（:853-929）、
 *       @RACE_CONFIG（:931-1333）
 *     入口: target/ERB/SYSTEM/CONFIG.ERB:224（设置页 [15]，ere/page/
 *     page-config.js 的 dispatch_config 接入）。
 *
 * 两个函数是 CHARA_BODY.ERB 里仅存的配置界面段（其余都是生成算法，住
 * ere/chara/chara-body.js）；编辑对象是同一张种族年龄表（FLAG:26/27 的数组
 * 承载，#105 决议四），读写经 game.chara.种族年龄设定_0/1 门面——page 是
 * 伪域，裸寻址写会被域检查拦下（tools/domain-check.mjs）。
 *
 * 对原作的四类有意偏离（前两类沿 page-config.js 文件头的既有裁定）：
 *
 * - 颜色不镜像：当前档高亮（0,255,80）、次要说明（40,128,255）、无效选项
 *   灰字（112,112,112）都是纯视觉状态；可读信息由 ON/OFF 文字与当前档
 *   说明行承载，不静默丢弃。
 * - 按钮独占一行 + 引擎自动加 [n] 前缀（PR #30）：原作一行多个按钮的数字
 *   网格、PRINT 后接 PRINTFORM 的行内拼接（如「■ 种族 […] 的年龄设定：」
 *   与档位说明同行）全部竖排；按钮正文不手写 [n] 前缀，编号列的
 *   `[-]`/`[1]` 视觉态（依赖项关闭时编号显示为 -）随之不镜像——按钮编号
 *   恒显示真实值，输入语义与原作一致（Emuera 自由键入也收 1）。
 * - [9] 详细设定原作仅位 13 开时打印（:865-866），Emuera 自由键入在位 13
 *   关时仍可达（IF RESULT == 9 不查位 13）；ere 的按钮白名单（#130）在未
 *   打印时拒收 9——隐藏分支不可达，与 [22] 男冒险者许可的既有裁定同款。
 * - 原作 :1145-1162 的「无匹配档（cla≥5）时 PRINT 缓冲接到下一行」无法
 *   镜像（ere 引擎每次 print 即一行）：说明行与 17 岁预览行分开打印，
 *   cla≥5 时各自打短行。
 * - **档位网格与说明行的按钮正文对不齐（已知差异，#577 普查登记）。** 这些
 *   正文用 `pad_display` / `pad_left` 排成表格，但引擎渲染层的按钮行构造器
 *   对正文做 `/\s+/g → ' '`（JS 的 `\s` 连 U+00A0 一起匹配，见 CONTEXT.md
 *   的「输出 API 与原作的对应」），任何空白补位都会被压成一格——#577 之前
 *   用半角空格补位也是同一结果，实机表现不变。要真正对齐得改用
 *   `printMultiColumns` 的列宽（按钮格 + 文本格），不在本票范围。
 *
 * 原作怪癖 1:1 保留（不修）：
 * - 顶层表格行对 cla≥5 的槽不写 PRINT_STR（:1015-1016 空 ELSE）——残留
 *   上一行的文案（Emuera #DIMS 跨循环残留），本文件同样保留前值。
 * - [99] 的打包（:1050-1057）先于确认 INPUT：确认页选「再想想」也写回
 *   编辑态（见 test 的取消用例）。
 * - [110]-[112] 只在 SET_VAR:4 > 0（已选过上限）时切算法档（:1297-1317），
 *   只按了下限、未选上限时 [999] 仍按旧档保存。
 */

'use strict';

const era = require('#/era-electron');
const {
  char_size_generate,
  race_age_generate,
  race_config_value,
  unpack_race_config,
} = require('#/chara/chara-body');
const { game } = require('#/facade/game');
const { chara } = require('#/facade/chara');
const { pad_display, pad_left } = require('#/utils/display-width');

const default_rand = (n) => Math.floor(Math.random() * n);
const int = Math.trunc;

/** GETBIT(X, n)：FLAG:5 的位 32-36 会溢出 32 位位运算，算术实现（同 page-config.js） */
function getbit(v, n) {
  return Math.floor(v / 2 ** n) % 2;
}

/** INVERTBIT X, n（返回新值；写回由调用方） */
function invertbit(v, n) {
  return getbit(v, n) ? v - 2 ** n : v + 2 ** n;
}

/** 八个种族的显示名（槽号顺序，CHARA_BODY.ERB:934-941 的注释表） */
const RACE_NAMES = [
  '精灵',
  '狼人',
  '吸血鬼',
  '无头骑士',
  '龙族',
  '天使',
  '霍比特人',
  '矮人',
];

/**
 * 种族年龄表默认值（FLAG:26 = 232015325431115011 / FLAG:27 = 001001 的
 * 数组承载，#105 决议四；与 ere/event/event-first.js 的开局播种同源）。
 */
const RACE_DEFAULT_0 = [11, 115, 431, 325, 15, 232];
const RACE_DEFAULT_1 = [1, 1];

/** 原作 `IF FLAG:26 == 0` 的未设哨兵：数组承载下未设 = getter 缺值按 0 */
function race_table_unset() {
  return game.chara.种族年龄设定_0 === 0;
}

/** 播种默认表（原作 :890-891/:903-904/:1043-1044 三处同款） */
function seed_race_defaults() {
  game.chara.种族年龄设定_0 = [...RACE_DEFAULT_0];
  game.chara.种族年龄设定_1 = [...RACE_DEFAULT_1];
}

/**
 * 顶层表格一行的两段文案（:997-1015）。返回 null = 该档无文案（原作空
 * ELSE，PRINT_STR 残留前值——由调用方保留）。
 * @returns {[string, string] | null} [设定说明, 相当于人类 17 岁的年龄]
 */
function table_texts(cla, deg, num) {
  const cap = num * 10 ** deg;
  const p4 = (v) => pad_left(String(v), 4);
  // 全角空格写在普通字符串里再拼接：模板字面量会触发 no-irregular-whitespace
  //（page-config.js 的既有规避同款）
  if (cla === 0 && num === 1 && deg === 0) {
    return ['和人类一样', '　　　　　' + '17 岁'];
  }
  if (cla === 0) {
    return [
      `换算成人类年龄的${p4(cap)} 倍`,
      `${p4(17 * cap)} ～ ${p4(17 * cap + cap - 1)} 岁`,
    ];
  }
  if (cla === 1) {
    return [
      `换算成人类年龄的${pad_left(String(deg), 2)}.${num} 倍`,
      '　　　　' + `${p4(int((17 * (deg * 10 + num)) / 10))} 岁`,
    ];
  }
  if (cla === 2) {
    return ['　 0 ～ ' + `${p4(cap)} 的随机范围`, '　 0 ～ ' + `${p4(cap)} 岁`];
  }
  if (cla === 3) {
    return [
      `${p4(int(cap / 2))} ～ ${p4(cap)} 的随机范围`,
      `${p4(int(cap / 2))} ～ ${p4(cap)} 岁`,
    ];
  }
  if (cla === 4) {
    return [`年龄 ～ ${p4(cap)} 的随机范围`, '　17 ～ ' + `${p4(cap)} 岁`];
  }
  return null;
}

/**
 * 编辑循环的当前档说明与 17 岁换算预览（:1130-1162）。入参 SET_VAR 是
 * 六元组 [0:方法, 1:整数倍档, 2:小数位, 3:随机下限档, 4:上限数量级, 5:上限位]。
 * 说明无匹配档时为空串（原作不打印）；预览行总有值（内层 ELSE 无条件）。
 * @returns {[string, string]} [档位说明, 预览年龄（17 岁换算或随机区间）]
 */
function edit_texts(sv) {
  const cap0 = sv[2] * 10 ** sv[1];
  const cap = sv[5] * 10 ** sv[4];
  const p4 = (v) => pad_left(String(v), 4);
  if (sv[0] === 0 && sv[1] === 0 && sv[2] === 1) {
    return ['和人类一样', '17 岁'];
  }
  if (sv[0] === 0) {
    return [
      `换算成人类年龄的${p4(cap0)} 倍`,
      `${p4(17 * cap0)} ～ ${p4(17 * cap0 + cap0 - 1)} 岁`,
    ];
  }
  if (sv[0] === 1) {
    return [
      `换算成人类年龄的${pad_left(String(sv[1]), 2)}.${sv[2]} 倍`,
      `${p4(int((17 * (sv[1] * 10 + sv[2])) / 10))} 岁`,
    ];
  }
  let desc = '';
  if (sv[3] === 2) {
    desc = '　 0 ～ ' + `${p4(cap)} 的随机范围`;
  } else if (sv[3] === 3) {
    desc = `${p4(int(cap / 2))} ～ ${p4(cap)} 的随机范围`;
  } else if (sv[3] === 4) {
    desc = `年龄 ～ ${p4(cap)} 的随机范围`;
  }
  // 下限三态：0 / 上限一半 / 人类年龄（全角空格在普通字符串里，同上）
  const lower = sv[3] === 2 ? ' 0' : sv[3] === 3 ? p4(int(cap / 2)) : '　17';
  return [desc, `${lower} ～ ${p4(cap)} 岁`];
}

/** [98]/[99] 共用的确认页（:1036-1041/:1060-1065），返回是否确认 */
async function confirm_reset(prompt) {
  era.print(`${prompt}\n`);
  era.print('确认吗？\n');
  era.println();
  era.printButton('好的', 0);
  era.printButton('呃……年龄这个问题是个大事啊……让我再想想……', 1);
  return (await era.input()) === 0;
}

/**
 * @CONFIG_AGE_SETTING（:853-929）：年龄/三围显示开关与种族年龄设定入口。
 *
 * 退出块（:900-929，BREAK 后执行）：位 12（显示年龄）或位 15（显示三围）
 * 任一开启时，为 CFLAG:451 尚为 0 的全部角色（魔王 0 除外）生成身体数据
 * （CFLAG:451-457 ← RESULT:0-6）。村娘Ａ/Ｂ在这里用 RAND:5+11 / RAND:5+14
 * 的年龄区间——**与开局生成 @CHAR_BODY_GENERATE_WAPPED 的 RAND:2+12 /
 * RAND:2+17 不同**，两处都是原作，不要合并调用。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function config_age_setting(rand = default_rand) {
  for (;;) {
    const v = game.dungeon.游戏设定;
    // 字符串用 + 拼接而非模板串：全角空格填充避开 no-irregular-whitespace
    // 对模板字面量的差异（同 page-config.js）
    era.printButton(
      '年龄的显示　　　　　　　　　　　　' + (getbit(v, 12) ? 'ON' : 'OFF'),
      0,
    );
    era.printButton(
      '使用不同种族的年龄设定　　　　' + (getbit(v, 13) ? 'ON' : 'OFF'),
      1,
    );
    // :865-866 [9] 只在位 13 开时打印（隐藏分支的 ere 不可达性见文件头）
    if (getbit(v, 13)) {
      era.printButton('详细设定', 9);
    }
    era.printButton(
      '显示换算成人类的年龄　　　' + (getbit(v, 14) ? 'ON' : 'OFF'),
      2,
    );
    era.printButton(
      '显示三围数据　　　　　　　　　　　' + (getbit(v, 15) ? 'ON' : 'OFF'),
      3,
    );
    era.drawLine();
    era.printButton('返回', 100);
    const result = await era.input();
    if (result === 100) {
      break;
    }
    if (result >= 0 && result <= 3) {
      game.dungeon.游戏设定 = invertbit(v, 12 + result);
    } else if (result === 9) {
      // :888-894 表未设时先播种默认，再进详细设定
      if (race_table_unset()) {
        seed_race_defaults();
      }
      await race_config(rand);
    }
  }

  // :899-929 退出块（DO…LOOP 的 BREAK 之后）
  const v = game.dungeon.游戏设定;
  if (getbit(v, 12) || getbit(v, 15)) {
    if (race_table_unset()) {
      seed_race_defaults();
    }
    for (const cid of era.getAllCharacters()) {
      if (cid === 0) {
        continue; // :909-910 魔王跳过
      }
      if (chara(cid).chara.年龄 !== 0) {
        continue; // :911 已生成的跳过
      }
      const talent = (id) => era.get(`talent:${cid}:${id}`) || 0;
      // :912-919 村娘Ａ/Ｂ 指定年龄区间，其余交回年龄生成（age 0）
      let age = 0;
      if (talent(165)) {
        age = rand(5) + 11;
      } else if (talent(171)) {
        age = rand(5) + 14;
      }
      const body = char_size_generate(cid, age, 0, rand);
      // :920-926 CFLAG:451-457 = RESULT:0-6（门面写：page 是伪域）
      chara(cid).chara.年龄 = body[0];
      chara(cid).chara.种族年龄 = body[1];
      chara(cid).chara.身高 = body[2];
      chara(cid).chara.体重 = body[3];
      chara(cid).chara.胸围 = body[4];
      chara(cid).chara.腰围 = body[5];
      chara(cid).chara.臀围 = body[6];
    }
  }
  return 0;
}

/**
 * @RACE_CONFIG（:931-1333）：8 个种族的年龄换算档位编辑器（FLAG:26/27 的
 * 读写界面）。结构是两层循环：顶层表格 + 编辑循环（GOTO SETTING_TOP /
 * INPUT_LOOP 用 labeled continue 镜像）。
 *
 * @param {(n: number) => number} [rand] RAND:N 随机源（[99] 重算用）
 * @returns {Promise<number>} 原作 RETURN 0
 */
async function race_config(rand = default_rand) {
  // :957-968 解包：槽 0-5 ← FLAG:26、槽 6-7 ← FLAG:27（数组承载下即逐槽）
  const cla = [];
  const deg = [];
  const num = [];
  for (let slot = 0; slot < 8; slot += 1) {
    const u = unpack_race_config(race_config_value(slot));
    cla.push(u.cla);
    deg.push(u.deg);
    num.push(u.num);
  }

  top: for (;;) {
    // :972-1022 表头与八种族行（[n] 前缀由引擎加，正文 = 种族名 + 36 列
    // 左对齐的档位说明 + 换算年龄；cla≥5 的行保留前一行的文案，见文件头）
    era.print(
      '　　 种族　　　　设定　　　　　　　　　　　　　　　相当于人类17岁的年龄\n',
    );
    let desc = '';
    let age = '';
    for (let slot = 0; slot < 8; slot += 1) {
      const texts = table_texts(cla[slot], deg[slot], num[slot]);
      if (texts) {
        desc = texts[0];
        age = texts[1];
      }
      era.printButton(
        RACE_NAMES[slot] +
          '　'.repeat(6 - RACE_NAMES[slot].length) +
          pad_display(desc, 36) +
          age,
        slot,
      );
    }
    era.println();
    era.printButton('使用默认设定', 98);
    era.printButton('重新设定种族年龄', 99);
    era.drawLine();
    era.printButton('返回', 100);

    // :1030-1086 顶层输入
    const result = await era.input();
    if (result >= 0 && result < 8) {
      // 种族选择 → 编辑循环（:1088-1108 把槽值装进 SET_VAR）
      const sv = [0, 0, 0, 0, 0, 0];
      let dis_flag;
      sv[0] = cla[result];
      if (sv[0] <= 1) {
        sv[1] = deg[result];
        sv[2] = num[result];
        sv[3] = -1;
        sv[4] = -1;
        sv[5] = -1;
        dis_flag = sv[0];
        if (sv[0] === 0 && sv[1] === 0 && sv[2] === 1) {
          dis_flag = -1; // :1099-1100 和人类一样单列一档
        }
      } else {
        sv[1] = -1;
        sv[2] = -1;
        sv[3] = cla[result];
        sv[4] = deg[result];
        sv[5] = num[result];
        dis_flag = sv[0];
      }

      edit: for (;;) {
        // :1110-1112 编辑头：重画前空行（DO 首拍的 PRINTL）+ 种族名 + 当前档
        // 说明 + 17 岁换算预览
        const [edit_desc, edit_age] = edit_texts(sv);
        era.println(); // :1110-1112 的空行（重画首拍）
        era.print(`■ 种族 [${RACE_NAMES[result]}] 的年龄设定：${edit_desc}\n`);
        era.print('　 换算人类 17 岁左右 ' + edit_age + '\n');
        era.printButton('和人类一样', 101);
        era.printButton('换算成人类年龄的整数倍', 102);
        era.printButton('换算成人类年龄的小数倍', 103);
        era.printButton('在一定范围内随机', 104);
        era.println();

        // :1183-1247 数字网格（当前 DIS_FLAG 的一组）
        if (dis_flag === 0) {
          // 整数倍：2..31 中 %10 ∈ 0-3 ∪ 9 的编号（:1184-1195）
          for (let l = 0; l < 30; l += 1) {
            if (l % 10 > 3 && l % 10 !== 9) continue;
            const n = l + 2;
            era.printButton(
              `${pad_left(String((n % 10) * 10 ** int(n / 10)), 5)} 倍`,
              n,
            );
          }
        } else if (dis_flag === 1) {
          // 小数倍：[0]（0.0 倍）+ 1..30 中 %10 ∈ 0-4 ∪ 9（:1196-1213）
          era.printButton('0.0 倍 （种族的寿命1年以内）', 0);
          for (let l = 0; l < 30; l += 1) {
            if (l % 10 > 4 && l % 10 !== 9) continue;
            const n = l + 1;
            era.printButton(
              `${pad_left(String(int(n / 10)), 3)}.${n % 10} 倍`,
              n,
            );
          }
        } else if (dis_flag > 1) {
          // 随机档：下限三钮 + 上限 21..50 中 %10 ∈ 1-5（:1214-1246）
          era.print('　　■ 下限\n');
          era.printButton('0 岁', 110);
          era.printButton('上限的1 / 2', 111);
          era.printButton('换算成人类年龄', 112);
          era.println();
          era.print('　　■ 上限\n');
          for (let l = 0; l < 30; l += 1) {
            if (l % 10 > 4) continue;
            const n = l + 21;
            era.printButton(
              `${pad_left(String((n % 10) * 10 ** int(n / 10)), 5)} 岁`,
              n,
            );
          }
        }

        era.println();
        era.printButton('决定', 999);
        era.drawLine();
        era.printButton('返回', 100);

        // :1254-1331 编辑输入（$INPUT_LOOP2 的无效输入重试在 ere 不可达：
        // era.input 只回已打印按钮的编号）
        const sub = await era.input();
        if (sub >= 0 && sub < 100 && (sub % 10 !== 0 || dis_flag === 1)) {
          // :1258-1274 数值选择
          if (dis_flag <= 1) {
            sv[0] = dis_flag;
            sv[1] = int(sub / 10);
            sv[2] = sub % 10;
            sv[3] = -1;
            sv[4] = -1;
            sv[5] = -1;
          } else {
            if (sv[3] > 1) {
              sv[0] = dis_flag;
              sv[1] = -1;
              sv[2] = -1;
            }
            sv[4] = int(sub / 10);
            sv[5] = sub % 10;
          }
        } else if (sub === 100) {
          continue top; // :1276-1277 不保存 SET_VAR 回顶层
        } else if (sub === 101) {
          // :1279-1284 和人类一样：只设 DIS_FLAG 与 SET_VAR:0-3——sv[4]/sv[5]
          // 保留现值，随机档种族 [101]→[104]→[110] 才能靠 SET_VAR:4 > 0 切回
          dis_flag = -1;
          sv[0] = 0;
          sv[1] = 0;
          sv[2] = 1;
          sv[3] = -1;
        } else if (sub === 102) {
          dis_flag = 0;
        } else if (sub === 103) {
          dis_flag = 1;
        } else if (sub === 104) {
          dis_flag = 10;
        } else if (sub === 110 || sub === 111 || sub === 112) {
          // :1295-1317 下限三档；已选过上限（SET_VAR:4 > 0）才切算法档
          sv[3] = sub - 108;
          if (sv[4] > 0) {
            sv[0] = dis_flag;
            sv[1] = -1;
            sv[2] = -1;
          }
        } else if (sub === 999) {
          // :1319-1329 决定：SET_VAR 写回工作数组，回顶层（不落 FLAG）
          if (sv[0] <= 1) {
            cla[result] = sv[0];
            deg[result] = sv[1];
            num[result] = sv[2];
          } else {
            cla[result] = sv[3];
            deg[result] = sv[4];
            num[result] = sv[5];
          }
          continue top;
        }
        continue edit;
      }
    } else if (result === 98) {
      // :1035-1048 回默认（确认后直接 RETURN）
      if (await confirm_reset('全种族的年龄均返回默认值。')) {
        seed_race_defaults();
        return 0;
      }
    } else if (result === 99 || result === 100) {
      // :1049-1083 打包写回（[99]/[100] 共用，先于 [99] 的确认 INPUT）
      game.chara.种族年龄设定_0 = cla
        .slice(0, 6)
        .map((c, i) => c * 100 + deg[i] * 10 + num[i]);
      game.chara.种族年龄设定_1 = [6, 7].map(
        (i) => cla[i] * 100 + deg[i] * 10 + num[i],
      );
      if (result === 99) {
        if (await confirm_reset('全种族的年龄按现在的设定重新计算。')) {
          // :1066-1074 按新表重算全体（魔王除外）的种族年龄（CFLAG:452）
          for (const cid of era.getAllCharacters()) {
            if (cid === 0) continue;
            chara(cid).chara.种族年龄 = race_age_generate(
              chara(cid).chara.年龄,
              era.get(`talent:${cid}:314`) || 0,
              rand,
            );
          }
        }
      } else {
        return 0; // :1082-1083 [100] 設定終了
      }
    }
  }
}

module.exports = {
  config_age_setting,
  race_config,
};
