/**
 * @file 迷宫凌辱事件（男性对象）——11 种怪物的凌辱文本与状态推进（issue #183，阶段 3 H14）。
 *
 * 调用点：H13（#182）的 ryouzyoku 主体——按 `E:(MON_COUNT+7)`（凌辱类型 1-12）
 * 分发，其中 `TALENT:ARG:122`（男人）为真时 CALL 本文件的 `*_RYOU男`，否则 CALL
 * H13（#182）的同名无「男」版。**两组函数名并不相同**（带「男」vs 不带），
 * 互不遮蔽（#12 的首个加载生效规则不触发）——这张工单不合并两组，各归各票。
 *
 * 移植说明（有意偏离，均注明依据）：
 *   - **`MON_NUM = E:(B + 99)` 以参数注入**（#5 决议第六条「指针不隐式读
 *     全局」）：B 是 ryouzyoku 主循环的全局单字母变量（0/100/200，即
 *     三列怪物的队列号），`E:(B+99)` 是「该列怪物数量」（E:Y+99 == 数量）。
 *     E 表由迷宫战斗系统（H5/H6）建桶写入，ere 的 `era.get('e:99')`
 *     在桶缺失时报 key error（#183 引擎实测）；本工单函数以 mon_num 形参
 *     接收该值，由 H13 的分派方读出传入。
 *   - **%SAVESTR:ARG% 经 chara_callname(arg) 承载**（#5 决议：SAVESTR 无
 *     引擎通道，#171 实测三段完全静默丢弃）：ARG 是参数角色号（被凌辱者），
 *     与口上文件的 TARGET 不同源，本文件用独立的 arg_name 变量。
 *   - **PRINTDATA/PRINTDATAW（DATAFORM 随机数组）**：在块内随机取一
 *     条输出，此处改写成
 *     `pick(list, rand_n(n))`——随机取一条（#117：无全局 RAND 序列，
 *     随机经注入的 rand_n 掷出，测试注入定值序）。
 *   - **`JUEL:ARG:n += v` / `EXP:ARG:n += v` 转 era.add**：
 *     `era.add` 语义 = 引擎的 +=（juel-check.js 先例）。
 *   - **`SIF CFLAG:16 == -1 → CFLAG:16 = 995`**：初吻对象标记（995 = 怪物
 *     的阴茎，#47 的 page-info-exp.js 值域注释）。CFLAG:16 是 train 域跨域
 *     写（#71 门面规则），但门面 getter 的 `|| 0` 会吞 -1（未经历）的取值，
 *     读用裸寻址 `era.get('cflag:${arg}:16')`，写走门面
 *     `chara(arg).train.初吻对象 = 995`。
 *   - **`CALL GOBI_KOUJO` 真身接通（#570）**：语尾口上分派（gobi_koujo）
 *     返回语尾文字——『猪…』整段拼成一行（PRINTFORM 夹两处
 *     GOBI 后 PRINTFORMW 收尾），ere 一次 print 即一行，故拼成整串一次
 *     printAndWait。TALENT:17（プライド低い）→ 1（喜んで誇らしげに）、
 *     否则 5（情けなさそうに）。
 *   - **`Y += 10` 是死代码**：Y 是旧引擎全局单字母变量（100000
 *     维），全库无初始化、函数内也无读取者。
 *     ere 侧无单字母变量通道，注释保留不落变量。
 *   - **`WAIT` → `await era.waitAnyKey()`**（PRINTW 的等待语义，#73；
 *     enter-enemy.js 先例）。
 *   - **一行输出的拼接**：旧引擎的无后缀 PRINTFORM/PRINT 不换行，连续多段
 *     输出拼成一条显示行，末段带 W/L 的语句才收行。本文件按
 *     「一条 JS 输出语句 = 一条显示行」合成，函数内的注释只标
 *     「拼成一行：…」的段落构成。
 *   - **TALENT:ARG:种族等中文下标**：yml/Talent.yml 的名字表
 *     有「种族」（id 314）等条目，引擎列名寻址 `talent:${cid}:种族` 可用
 *     （#183 引擎实测 setVar 通过中文名翻译）。
 *   - **`RAND:n` → rand_n(n)**（#117：随机源注入，缺省均匀随机）。
 *   - **`TALENT:ARG:魅力点`**：魅力点 id 312，列名寻址可用。
 *
 * == 与本文件同名的函数 ==
 *
 * H13（#182）的同名无「男」版前 11 段是 `ORC_RYOU(ARG)`（无
 * 「男」字）——两组函数名不同，不触发 #12 的首个加载生效遮蔽。H13 的
 * 分派 `CALL ORC_RYOU男,ARG`（TALENT:ARG:122 为真时）引用的正是本文件
 * 的定义；无「男」版是 H13 的交付物（女性对象）。这张工单只交付带「男」版。
 *
 * @module
 */

const era = require('#/era-electron');
const { chara_callname } = require('#/utils/callname-utils');
const { chara } = require('#/facade/chara');

/** PRINTDATA/PRINTDATAW 的随机取一条（DATAFORM 数组的等价物） */
function pick(list, rand_n) {
  return list[rand_n(list.length)];
}

/**
 * 通用：取被凌辱者名字（%SAVESTR:ARG% 的等价物）。
 * @param {number} arg 角色号
 * @returns {string}
 */
function arg_name_of(arg) {
  return chara_callname(arg);
}

// orc_ryou_man(arg)
/**
 * 兽人凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列兽人数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源（[0,n) 整数；缺省
 *   均匀随机，测试注入定值序）
 * @returns {Promise<number>} 0（RETURN 0；CALL 不读返回值）
 */
async function orc_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const t = (n) => era.get(`talent:${arg}:${n}`) || 0;

  if (rand_n(5) === 0) {
    // PRINTDATAW 口交三选一
    await era.printAndWait(
      pick(
        [
          '『喂！闭嘴……别吵啦！快点喝下去！』',
          '『舔个……干净……』',
          '『打得都勃起了……』',
        ],
        rand_n,
      ),
    );

    if (t(52)) {
      // 擅用舌头
      await era.printAndWait(`『呃……这家伙，简直就是经验丰富的娼妓嘛～』`);
      await era.printAndWait(
        `${arg_name}拼命地用舌头侍奉着，展现出天赋般的好技术。`,
      );
      await era.printAndWait(
        `兽人抵受不住他那灵活的舌头，射在${arg_name}的嘴里了。`,
      );
      mon_num *= 2; // 舌使いボーナス
    }

    // 拼成一行：无头骑士前缀（SIF + PRINTFORM）、
    // 名字、种族分档都不换行，到末段的 PRINTFORMW 才收行。
    // 条件提到语句外当取值、片段文本留在输出语句里。
    const headless = t('种族') === 4;
    await era.printAndWait(
      (headless ? '无头骑士的' : '') +
        `${arg_name}` +
        (headless ? '身体被固定住了，只剩下脑袋来像飞机杯似的' : '全裸地') +
        '侍奉着兽人们的阴茎。',
    );
    await era.printAndWait(
      `只要喝掉所有${mon_num}只兽人的精液的话，它们就答应不侵犯他的下体………`,
    );

    if (era.get(`cflag:${arg}:131`) > 5) {
      // 隷属状態
      if (t(13)) {
        await era.print('毫无犹豫、'); // 素直
      } else if (t(14)) {
        await era.print('小心翼翼地、'); // 大人しい
      } else if (t(17)) {
        await era.print('一边土下座扭着腰部的'); // プライド低い
      } else if (t(35)) {
        await era.print('期待与羞耻将脸染红的'); // 恥じらい
      } else {
        await era.print('面露期待的');
      }
    } else if (era.get(`cflag:${arg}:131`) > 2) {
      // 中畏怖状態
      if (t(13)) {
        await era.print('老实遵从于兽人的'); // 素直
      } else if (t(14)) {
        await era.print('煞有其事地、'); // 大人しい
      } else if (t(17)) {
        await era.print('不住向阴茎献媚的'); // プライド低い
      } else if (t(35)) {
        await era.print('面对阴茎羞红了脸的'); // 恥じらい
      } else {
        await era.print('已然无法反抗的');
      }
    } else {
      // 初见的畏惧反应
      if (t(11)) {
        // 反抗的
        // 拼成一行：PRINTFORM + PRINTFORML（#584）
        await era.print(
          `带着反抗的目光看着它们，其中一只兽人对他怒喝了一声，恐怖点数+${mon_num * 10}`,
        );
        era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
      } else if (t(13)) {
        // 素直
        // 拼成一行：PRINTFORM + PRINTFORML（#584）
        await era.print(
          `迫于兽人的威胁，他衡量了一下得失之后，老实地接受了屈辱的命运……听天由命地流泪，耻情点数+${mon_num * 10}`,
        );
        era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
      }
      // （大人しい・プライド低い・恥じらい）的初见分档文本已并进
      // 下面 :81..:105 的整行语句（前缀当取值表达式），此处不再单独输出——
      // 否则同一段会先自占一行、又出现在合并行里（#624 审查发现）
    }

    // PRINTDATA 随机词条夹在整行中间，
    // 提到语句外当取值。
    const penis = pick(
      ['阴茎', '脏污的阴茎', '带肉刺的阴茎', '巨根', '蘑菇似的阴茎'],
      rand_n,
    );

    // 整行的两段互斥收行：初见分档、`%SAVESTR:ARG%把`、随机词条与「含了下去，」
    // 都不换行；TALENT:52 命中时由 PRINTW 收行，其余分支由后面的
    // 分档片段接 PRINTL 收行。
    // 两条收行互斥，且中间的 PRINTW（它自带 W）不能当拼接
    // 中段：链上的 TALENT:52 支照旧把前半段写在语句里，
    // 其余分支用语句外的前缀常量 +
    // 自己的分档与收行合成一条（同 kojo-k7-heart.js 的 talk_front_5485 写法）
    const tongue_front_81 =
      (t(14)
        ? '提心吊胆地'
        : t(17)
          ? '嘿嘿媚笑着'
          : t(35)
            ? '不敢直视肉棒而闭上了眼睛'
            : '') +
      `${arg_name}把` +
      penis +
      '含了下去，';
    //
    // 舌使い：TALENT:52 时由 :105 的 PRINTW 收行
    if (t(52)) {
      await era.printAndWait(
        (t(14)
          ? '提心吊胆地'
          : t(17)
            ? '嘿嘿媚笑着'
            : t(35)
              ? '不敢直视肉棒而闭上了眼睛'
              : '') +
          `${arg_name}把` +
          penis +
          '含了下去，『呃……这家伙，简直就是经验丰富的娼妓嘛～』',
      );
      await era.printAndWait(
        `${arg_name}拼命地用舌头侍奉着，展现出天赋般的好技术。`,
      );
      await era.printAndWait(
        `兽人抵受不住他那灵活的舌头，射在${arg_name}的嘴里了。`,
      );
      mon_num *= 2; // 舌使いボーナス
      await era.print('奉仕持续了下去……');
    } else {
      await era.print(
        tongue_front_81 +
          (t(21)
            ? '像工作一样地奉仕着，'
            : t(36)
              ? '不禁发出了粗俗的声音，'
              : t(50)
                ? '很快地抓住了奉仕的诀窍，'
                : t(62)
                  ? '忍受着腥臭味，'
                  : t(63)
                    ? '拼命地用舌头奉仕着，'
                    : '') +
          '奉仕持续了下去……',
      );
    }

    await era.print(`口交经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.口交经验 += mon_num; // EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验

    // 初吻（SIF CFLAG:16 == -1）
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995; // CFLAG:16 = 995（怪物的阴茎）
    }
  } else if (rand_n(4) === 0) {
    // 全穴奉仕
    // PRINTDATAW 三选一
    await era.printAndWait(
      pick(
        [
          '『兄弟们，把所有的穴都塞满哦！』',
          '『嘿，简直像三明治一样』',
          '『连耳朵，都给你灌满精液咯』',
        ],
        rand_n,
      ),
    );

    await era.printAndWait(
      `${arg_name}被${mon_num}只兽人用积存已久的精液，将嘴巴、肛门……所有能用的穴，注满了精液……`,
    );
    await era.printAndWait(
      `他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。`,
    );
    await era.printAndWait(
      `${arg_name}的脸和性器都用精液化上了妆。兽人们看着他这样子，开怀大笑。`,
    );

    // 拼成一行：「兽人的」、PRINTDATA 的随机词条
    // 与部位分档都不换行，末段的 PRINTL
    // 收行（本身无文本）。条件提到语句外当取值、片段文本留在输出语句里。
    const penis = pick(
      ['阴茎', '脏污的阴茎', '带肉刺的阴茎', '巨根', '蘑菇似的阴茎'],
      rand_n,
    ); // PRINTDATA（DATAFORM 五选一）
    // CFLAG:42 == 83（眼镜）是纯读，提到语句外当取值。
    const glasses = era.get(`cflag:${arg}:42`) === 83;
    await era.print(
      '兽人的' +
        penis +
        `插进了${arg_name}的喉咙深处，射精的同时喷溅出来的精液在${arg_name}的` +
        (glasses
          ? '眼镜上飞撒着……'
          : t('魅力点') === 2
            ? '可爱的眼睛上飞撒着……'
            : t('魅力点') === 3
              ? '漂亮的鼻子里喷了出来……'
              : t('魅力点') === 22
                ? '光鲜亮丽的头发上飞撒着……'
                : '脸上飞撒着……'),
    );

    if (t(12)) {
      // 刚强
      await era.printAndWait(`${arg_name}咬着嘴唇忍受着凌辱……`);
      await era.printAndWait('在那刚强的脸上，精液无情地飞撒着。');
      await era.print(`苦痛点数+${mon_num * 10}`);
      era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    } else if (t(70) || t(73)) {
      // 接受快感・容易陷落
      await era.printAndWait('在凌辱开始不久后，渐渐地听到了妩媚的娇喘声。');
      await era.printAndWait('『喔！这家伙有感觉了哦！』');
      await era.printAndWait(`${arg_name}被快感冲击着，忍不住主动扭着腰。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    } else {
      await era.printAndWait(
        `他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。`,
      );
    }

    await era.printAndWait(''); // PRINTW（空行等待）
    // 拼成一行：PRINTW 是空行，「兽人们把润滑液
    // 涂在了…的」与分档片段都不换行，末段的 PRINTL 收行。
    // 条件提到语句外当取值、片段文本留在输出语句里。
    // 阴毛状态是纯读，提到语句外当取值。
    const pubic = t('阴毛状态');
    await era.print(
      `兽人们把润滑液涂在了${arg_name}的` +
        (t('魅力点') === 21
          ? '漂亮的'
          : t('魅力点') === 14
            ? '漂亮的屁股的缝隙中的'
            : t('魅力点') === 23
              ? '大的屁股的缝隙中的'
              : t(125)
                ? '无毛额'
                : t(248)
                  ? '肌肉明显的两腿间的'
                  : pubic > 200
                    ? '从阴阜到肛门都被茂密的阴毛所覆盖的'
                    : pubic > 150
                      ? '长着茂盛的阴毛的'
                      : '') +
        '性器和肛门上',
    );

    // 拼成一行：「在…的」与体型分档都不
    // 换行，末段的 PRINTL 收行。
    await era.print(
      `在${arg_name}的` +
        (t(99)
          ? '魁梧的身体上'
          : t(100)
            ? '娇小的身体上'
            : t(115)
              ? '松松垮垮的身体上'
              : t(248)
                ? '紧致的身体上'
                : t(256)
                  ? '窈窕的身体上'
                  : t('体型') <= 100
                    ? '纤细的身体上'
                    : t('体型') > 200
                      ? '肉感的身体上'
                      : '身体上') +
        '像要挤爆他似的激烈地持续侵犯着……',
    );

    await era.printAndWait(
      `他用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。`,
    );

    await era.print(`苦痛点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`口交经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.口交经验 += mon_num; // EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验

    // 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995;
    }
  } else if (rand_n(3) === 0) {
    // 屈辱プレイ
    // PRINTDATAW 三选一
    await era.printAndWait(
      pick(
        [
          '『你不要做人了。从今往后就是家畜了。像猪一样叫几声来听听。』',
          '『猪就要有，猪的样子』',
          '『你只是，比我们还低级的，家畜罢了！』',
        ],
        rand_n,
      ),
    );

    // 拼成一行：「…全裸地四肢着地趴在地下、」与
    // 素质分档都不换行，末段的 PRINTW 才收行。条件提到
    // 语句外当取值、片段文本留在输出语句里。
    await era.printAndWait(
      `${arg_name}全裸地四肢着地趴在地下、` +
        (t(10) || t(14)
          ? '浑身颤抖着、'
          : t(11)
            ? '怒目圆睁着、'
            : t(13)
              ? '拼命服从着、'
              : t(17)
                ? '拼命献媚着、'
                : t(35)
                  ? '羞红了脸、'
                  : '') +
        '屈辱地模仿猪叫……',
    );

    await era.printAndWait(
      `${mon_num}只兽人看到这个情形都笑了。完全没有了光辉冒险者的样子，就是一只惨叫的猪而已。`,
    );

    if (era.get(`abl:${arg}:17`)) {
      // 露出癖
      await era.printAndWait(
        `${arg_name}的脸犹如发烧一般，不停地重复着上述行为。`,
      );
      await era.printAndWait('好像因为被视奸，而有了感觉。');
      await era.print(`耻情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
    }

    if (era.get(`abl:${arg}:21`)) {
      // 抖M气质
      await era.printAndWait(`${arg_name}好像因为被骂而有了感觉。`);
      await era.printAndWait('『明明就是母猪，还说自己是冒险者！』');
      await era.printAndWait(`${arg_name}连眼神都湿润了～`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    // 『猪…』整段拼成一行（PRINTFORM 不换行 → 两处 GOBI → PRINTFORMW
    // 收尾）；语尾按 #570 返回文字、拼进同一行，一次 printAndWait 输出。
    const gobi_pig = await require('#/kojo/kojo-system').gobi_koujo(
      t(17) ? 1 : 5,
    ); // （プライド低い → 喜び、否则情けない）
    const gobi_pig2 = await require('#/kojo/kojo-system').gobi_koujo(
      t(17) ? 1 : 5,
    );
    await era.printAndWait(
      `『猪${gobi_pig}还自称冒险者……简直傻了${gobi_pig2}${'\u3000'}噗噗，噗嘻！』`,
    );

    if (t(17)) {
      // プライド低い
      await era.printAndWait(`${arg_name}抛弃了自尊心，拼命地求饶着。`);
      await era.print(`屈服点数+${mon_num * 10}`);
      era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
    }

    await era.print(`耻情点数+${mon_num * 10}`);
    await era.print(`屈服点数+${mon_num * 10}`);
    era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
  } else if (rand_n(2) === 0) {
    // 武器捅后穴
    await era.printAndWait('『来试试，看能放多粗的东西进去？』');
    await era.printAndWait(`${arg_name}感受到了自己身上的危机，拼命地哀求着。`);
    await era.printAndWait(
      `不过，他的身体依旧被兽人们牢牢抓住。M字开脚地把不设防的性器和肛门展示在大家面前。`,
    );
    await era.printAndWait(
      `其中一只兽人，拿起他的心爱的武器用柄的那端捅入他的后穴。`,
    );
    await era.printAndWait(
      `${arg_name}的喊叫声，回响在${mon_num}只兽人的耳边。`,
    );

    if (t(40)) {
      // 害怕疼痛
      await era.printAndWait('「好痛……不要啊……呜哇哇哇哇哇哇！」');
      await era.printAndWait(`${arg_name}受不了痛楚，高声哭喊着。`);
      await era.print(`苦痛点数+${mon_num * 10}`);
      era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    }

    if (era.get(`abl:${arg}:21`)) {
      // 抖M气质
      await era.printAndWait(`${arg_name}在痛楚中感到了愉悦。`);
      await era.printAndWait(
        `难道自己是个潜在的性变态？这么想着，${arg_name}对自身的反应感到害怕。`,
      );
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  } else {
    // 抬屁股
    await era.printAndWait('『抬起屁股！然后说：请用！』');
    await era.printAndWait(
      `${arg_name}用屈辱的姿势抬起了屁股，把手扶在地下城的墙壁上。`,
    );
    await era.printAndWait(
      `他完全被淹没在${mon_num}只兽人之中，兽人们大笑着，轮流侵犯他的嘴巴和肛门。`,
    );
    await era.printAndWait(
      `${arg_name}的呜咽，被兽人们的欢呼声掩埋在地下城的黑暗中。`,
    );

    if (t(70) || t(73)) {
      // 接受快感・容易陷落
      await era.printAndWait(
        `随着凌辱的持续，${arg_name}的前端里渐渐滴出了体液。`,
      );
      await era.printAndWait(
        '『别这么快就去了啊！老子都不知道操哭多少人了。』',
      );
      await era.printAndWait(`${arg_name}呼出了炽热的气息，双腿直抖着。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    } else if (t(11)) {
      // 反抗心
      await era.printAndWait('『喂！把腰抬起来！还没完呢！』');
      await era.printAndWait(`${arg_name}用冰冷的目光瞪了兽人们一眼。`);
    }

    await era.print(`肛门经验+${mon_num}`);
    await era.print(`口交经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.口交经验 += mon_num; // EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// slime_ryou_man(arg)
/**
 * 史莱姆凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列史莱姆数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function slime_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  if (rand_n(6) === 0) {
    // 黏液侵犯
    await era.printAndWait(`黏液侵犯着${arg_name}的嘴巴和肛门，并灌入了黏液。`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
  } else if (rand_n(5) === 0) {
    // 黏液入嘴
    await era.printAndWait('黏液杀到了冒险者的嘴巴里。');
    await era.printAndWait(
      `${arg_name}感觉呼吸困难，正挣扎着，突然呼吸又顺畅了。但一部分的黏液已经借机流入了他的内脏，从内部蹂躏着他。`,
    );
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  } else if (rand_n(4) === 0) {
    // 黏液入肛
    await era.printAndWait('黏液杀到了冒险者的肛门里。');
    await era.printAndWait(
      `${arg_name}被肛门里大量逆流的黏液弄的苦不堪言，但是四肢都被黏液牢牢控制，无法反抗。`,
    );
    if (era.get(`cflag:${arg}:131`) > 5) {
      await era.printAndWait(
        `${arg_name}反弓起腰来、似乎沉浸于粘液的杠虐快感之中……`,
      ); // 隷属状態
    } else if (era.get(`cflag:${arg}:131`) > 3) {
      await era.printAndWait(`${arg_name}已然被粘液攻陷了……`); // 強畏怖状態
    } else if (era.get(`cflag:${arg}:131`) > 0) {
      await era.printAndWait(`${arg_name}开始习惯被粘液涌入的感觉……`); // 弱畏怖状態
    } else {
      await era.printAndWait('冒险者在肛虐的痛苦中癫狂地惨叫着。');
    }
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
  } else if (rand_n(3) === 0) {
    // 四脚着地
    await era.printAndWait('被全裸地四脚着地压在地上，黏液逆流到肛门里了。');
    await era.printAndWait(
      `${arg_name}腹部运劲，将黏液喷出肛门，但依然有大量的黏液流入体内。`,
    );
    await era.print(`耻情点数+${mon_num * 10}`);
    await era.print(`屈服点数+${mon_num * 10}`);
    era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
  } else if (rand_n(2) === 0) {
    // 大量黏液
    await era.printAndWait(
      '黏液疯狂地凌辱着，大量的黏液灌入了直肠里让冒险者的肚子都膨胀了几分。',
    );
    await era.printAndWait(`${arg_name}坚强地试图站起来。`);
    await era.printAndWait(
      '但是大量的黏液一下子又从肛门里汹涌地喷出来了，膝盖一软又跪倒在地。',
    );
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  } else {
    // 治愈黏液
    await era.printAndWait('冒险者被包在黏液里，只露出头部发出呜呜的呻吟。');
    await era.printAndWait(`看来没人相救的话，${arg_name}要被消化在黏液里了。`);
    await era.printAndWait(
      `黏液的麻痹成分，渐渐把${arg_name}遭受凌辱的苦痛身体治愈了。`,
    );
    chara(arg).dungeon.体力 += 100; // BASE:ARG:0 += 100（体力回复）
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// insect_ryou_man(arg)
/**
 * 昆虫凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列昆虫数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function insect_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  if (rand_n(2) === 0) {
    // 嘴巴产卵
    await era.printAndWait('『叽吱叽吱叽吱……』');
    await era.printAndWait(`${arg_name}的嘴巴被输卵管插入了，被播下了卵。`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  } else {
    // 肛门产卵
    await era.printAndWait('『叽吱叽吱叽吱……』');
    await era.printAndWait(`${arg_name}的肛门被输卵管插入了，被播下了卵。`);
    await era.printAndWait(
      '不喝下打虫药剂的话，魔界的虫子就会从肛门里孵化了吧。',
    );
    await era.printAndWait(
      `${mon_num}只节肢动物轮流扑在${arg_name}身上，从臀部到背部全被卵覆盖了。`,
    );
    await era.print(`肛门经验+${mon_num}`);
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// ivy_ryou_man(arg)
/**
 * 蔦触手凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列蔦触手数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function ivy_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  if (rand_n(2) === 0) {
    // 勒颈
    await era.printAndWait('藤蔓勒住了冒险者的脖子。');
    await era.printAndWait(
      `${arg_name}呼吸困难，痛苦挣扎着，被开放的时候，忍不住粗声地喘息。`,
    );
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  } else {
    // 肛门扎根
    await era.printAndWait('藤蔓在冒险者的肛门里扎根了。');
    await era.printAndWait(
      `${arg_name}的肛门被蹂躏着，发出了喊破喉咙的惨叫声。`,
    );
    await era.printAndWait('藤蔓吸收到了足够的养分，一下子从直肠里连根拔走。');
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// syokusyu_ryou_man(arg)
/**
 * 触手凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列触手数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function syokusyu_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  if (rand_n(4) === 0) {
    // 触手入嘴
    await era.printAndWait('触手伸进了冒险者的嘴巴里。');
    await era.printAndWait(
      `${arg_name}的喉咙被大量的体液灌入，呛到了。不久，他的意识开始模糊了。`,
    );
    await era.print(`欲情点数+${mon_num * 10}`);
    era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
  } else if (rand_n(3) === 0) {
    // 触手入肛
    await era.printAndWait('触手伸进了冒险者的肛门里。');
    await era.printAndWait(
      `${arg_name}的肛门被大量的体液灌入，直肠吸收了里面的成分。不久，他的意识开始模糊了。`,
    );
    await era.printAndWait(
      '不一会儿，全身肌肉都松弛了，大量的浑浊体液从肛门流出。',
    );
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`欲情点数+${mon_num * 10}`);
    era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
  } else if (rand_n(2) === 0) {
    // 吊缚
    await era.printAndWait('触手把冒险者绑了起来，吊在半空。');
    await era.printAndWait(
      `${arg_name}的嘴巴也好，肛门也好，能被触手侵犯的地方都被灌入了大量的体液。`,
    );
    await era.printAndWait(
      '……不久，地上滴落的液体里，开始出现了触手体液之外的东西。',
    );
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`欲情点数+${mon_num * 10}`);
    era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
  } else {
    // 榨乳
    await era.printAndWait('冒险者被触手吸着乳头，不断的挤奶。');
    await era.printAndWait(
      `${arg_name}带着难以置信的表情，感受着触手的体液顺着乳头流入，最终融化到了脑髓里。`,
    );
    await era.printAndWait('不久之后他感到乳房发胀，触手顺势开始了榨乳。');
    await era.printAndWait(
      `不久之后，${arg_name}母乳开始无法抑制地从乳头喷出。`,
    );
    await era.print('喷奶经验+1');
    chara(arg).train.喷奶经验 += 1; // EXP:ARG:54 喷奶经验
  }
  await era.printAndWait(`触手经验+${mon_num}`);
  chara(arg).dungeon.触手经验 += mon_num; // EXP:ARG:55 触手经验
  return 0;
}

// faily_ryou_man(arg)
/**
 * 妖精凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列妖精数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function faily_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);

  if (rand_n(2) === 0) {
    // 假阳具
    await era.printAndWait('『所谓的冒险者真是牢不可破啊！』');
    await era.printAndWait('妖精拿出了一根和自己身高相等的假阳具。');
    await era.printAndWait('『小哥哥来享受这边的穴吧！』');
    await era.printAndWait(`${arg_name}的惨叫回响在洞窟里……`);
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
  } else {
    // 后处玩弄
    await era.printAndWait('『小哥哥的里面，是什么模样呢？』');
    await era.printAndWait(
      `${arg_name}的后处被妖精钻入了。妖精对他的反应感到相当有趣，不断地玩弄着后处内的皱褶。`,
    );
    await era.print(`肛门经验+${mon_num}`);
    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// giant_ryou_man(arg)
/**
 * 巨人凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列巨人数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function giant_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const c131 = era.get(`cflag:${arg}:131`);

  // 畏怖阶段口上（PRINTDATAW 三档）
  if (c131 > 5) {
    // 隷属状態
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
    );
  } else if (c131 > 3) {
    // 強畏怖状態
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
    );
  } else {
    // 初见的畏惧
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
    );
  }

  if (mon_num === 1) {
    // 单只巨人
    await era.print('『喝下去哦』');
    await era.print(
      `${arg_name}侍奉着一只巨人，不过怎么张嘴都吞不进巨人的阴茎，只能舔舐着。`,
    );
    await era.print('绝顶了的巨人，把精液从头到脚浇了他一身。');
    await era.print('口交经验+1');
    await era.print('精液经验+1');
    chara(arg).dungeon.口交经验 += 1; // EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += 1; // EXP:ARG:20 精液经验

    // 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995;
    }
    await era.waitAnyKey(); // WAIT
    return 0;
  }

  if (rand_n(3) === 0) {
    // 舔舐
    await era.printAndWait('『快点啊！』');
    await era.printAndWait(`${arg_name}拼命地舔舐着巨人的阴茎。`);
    await era.printAndWait('他拼命地哀求着，请饶了他，不然一定会被玩坏。');
    await era.printAndWait(
      `必须快点搞定这${mon_num}只巨人，不然不知道他们什么时候会改变主意。`,
    );

    if (era.get(`talent:${arg}:52`)) {
      // 擅用舌头
      await era.printAndWait('『哦！小东西，你很擅长用舌头嘛！』');
      await era.printAndWait(
        `${arg_name}拼命地用舌头侍奉着，展现出天赋般的好技术。`,
      );
      await era.printAndWait(
        `巨人被他灵活的舌头弄射了，精液像喷泉一样，从${arg_name}的头顶淋到脚底。`,
      );
      mon_num *= 2;
    }

    await era.print(`口交经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.口交经验 += mon_num; // EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验

    // 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995;
    }
  } else if (rand_n(2) === 0) {
    // 贯穿
    await era.printAndWait('『哦！小东西，叫得不错嘛！』');
    await era.printAndWait(
      `${arg_name}的肛门被巨人强行用阴茎贯穿，撕裂的痛楚让他声嘶力竭地惨叫着，晕了过去。肛门处流出了鲜血。`,
    );
    await era.printAndWait('『又一个坏掉了吗？用点回复药或许可以再来几下。』');
    await era.printAndWait(
      `插坏了的肛门，用了回复药之后被继续玩弄着，直到满足了所有${mon_num}只巨人为止……`,
    );

    if (era.get(`talent:${arg}:34`)) {
      // 抵抗
      await era.printAndWait(
        `${arg_name}竭尽全力地企图爬走，但是被轻易地抓了回来。`,
      );
      await era.printAndWait('『喂！这里有个想逃跑的！抓住他！』');
      await era.printAndWait(
        `${arg_name}被巨人抓着四肢，那不设防的肛门，又一次被巨人的巨根插入了……`,
      );
      await era.print(`恐怖点数+${mon_num * 10}`);
      era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    }

    await era.print(`肛门经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    await era.print(`肛门扩张经验+${mon_num}`);
    await era.print('异常经验+1');
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验
    chara(arg).dungeon.异常经验 += 1; // EXP:ARG:50 异常经验
    chara(arg).dungeon.肛门扩张经验 += mon_num; // EXP:ARG:53 肛门扩张经验
  } else {
    // 精液水盆
    await era.printAndWait('『我想到好主意了』');
    await era.printAndWait(
      '巨人们不知为何开始集体打飞机，集中射在巨大的水盆里。',
    );
    await era.printAndWait(`${arg_name}对未知状况非常恐惧。`);
    await era.printAndWait('巨人端着一大盆精液，对他说，');
    await era.printAndWait('『不想死的话，就全部喝光。』');
    await era.printAndWait(`${arg_name}脸上血色褪尽。`);

    if (era.get(`talent:${arg}:11`)) {
      // 反抗心
      await era.printAndWait(`${arg_name}用冷淡的眼神瞪着巨人，表示不从。`);
      await era.printAndWait('『看来还不明白啊！』');
      await era.printAndWait(
        `巨人用巨大的手掌按着${arg_name}的头，直接把头按入水盆里。`,
      );
      await era.printAndWait('「咕噜，咕噜，咕咕噜」');
      await era.printAndWait(
        `巨人把他的头抓起来，那张满脸精液的脸上，再也见不到反抗的意思了。`,
      );
      await era.print(`恐怖点数+${mon_num * 10}`);
      era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
    }

    await era.print(`精液经验+${mon_num * 10}`);
    chara(arg).dungeon.精液经验 += mon_num * 10; // EXP:ARG:20 精液经验
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// man_ryou_man(arg)
/**
 * 魔族男人凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列魔族男人数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function man_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const c131 = era.get(`cflag:${arg}:131`);

  // 畏怖阶段口上（PRINTDATAW 三档）
  if (c131 > 5) {
    // 隷属状態
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
    );
  } else if (c131 > 3) {
    // 強畏怖状態
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
    );
  } else {
    // 初见的畏惧
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
    );
  }

  if (rand_n(5) === 0) {
    // 翘屁股
    await era.printAndWait('『屁股露出来，抬高点！』');
    await era.printAndWait(
      `${arg_name}露出了屈辱的神色，向魔族男人翘起了屁股。`,
    );
    await era.printAndWait(
      `${arg_name}全裸地侍奉着兽人们的阴茎。只要喝掉所有${mon_num}个男人的精液的话，它们就答应不侵犯他的后穴………`,
    );
    await era.printAndWait('『嘴巴张开点！鸡鸡都被你弄脏了，弄干净！』');
    await era.printAndWait(`${arg_name}依照吩咐，用嘴巴侍奉着阴茎……`);
    await era.print(`口交经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.口交经验 += mon_num; // EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验

    // 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995;
    }
  } else if (rand_n(4) === 0) {
    // 肉便器
    await era.printAndWait(
      `${arg_name}被强行宣布为肉便器，全身都被写满了淫秽的话语。`,
    );

    // 拼成一行：无后缀 PRINT 连续不换行，末行 PRINTFORMW 才收行。
    // 落書的追加档与末尾三选一都在行内，各 IF 的条件提到语句外当取值、
    // 文本留在输出语句里。
    const cold = era.get(`talent:${arg}:22`) || era.get(`talent:${arg}:21`); // 感情淡薄・冷漠
    const modest = era.get(`talent:${arg}:24`) || era.get(`talent:${arg}:30`); // 保守的・看重贞操
    const wet = era.get(`talent:${arg}:42`); // 容易湿
    const pleased = era.get(`talent:${arg}:70`) || era.get(`talent:${arg}:73`); // 接受快感・容易陷落
    const has_penis =
      era.get(`talent:${arg}:121`) || era.get(`talent:${arg}:122`); // 扶他・男人
    await era.printAndWait(
      `${arg_name}的身上，被写着` +
        '【最喜欢阴茎】' +
        (cold ? '【性冷淡便器】' : '') +
        (modest ? '【看似忠贞的便器出道】' : '') +
        (wet ? '【又粘又湿】' : '') +
        (pleased ? '【愉悦的脸】' : '') +
        (has_penis ? '【有鸡鸡的奴隶】' : '') +
        (rand_n(3) === 0
          ? '【操我】'
          : rand_n(2) === 0
            ? '【肛门免费】'
            : '【母猪】') +
        '之类的话。络绎不绝的魔族男人，将嘴巴、肛门等等地方都侵犯了，精液流得到处都是。',
    );
    await era.printAndWait(
      `当被最后一人抱着的时候，${arg_name}已经失去了任何表情，成为全身的穴都流出着精液的下流便器了。`,
    );
    await era.printAndWait(
      `地下城里，充斥着${mon_num}人份的精液和体液的异样臭味。魔族男人对原冒险者重生成为肉便器相当欢迎。`,
    );

    // 肌の色で分岐
    if (era.get(`talent:${arg}:244`)) {
      await era.printAndWait(`${arg_name}的蓝色肌肤，被沾满了精液……`); // 恶魔肌肤
    } else if (era.get(`talent:${arg}:253`)) {
      await era.printAndWait(
        `${arg_name}健康的褐色肌肤，与白浊的精液形成鲜明又淫靡的对比……`,
      ); // 褐色肌肤
    } else if (era.get(`talent:${arg}:255`)) {
      await era.printAndWait(`${arg_name}美丽的白皙肌肤被精液玷污了……`); // 白皙
    }

    await era.print(`肛门经验+${mon_num}`);
    await era.print(`口交经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.口交经验 += mon_num; // EXP:ARG:22 口交经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验

    // 初吻
    if ((era.get(`cflag:${arg}:16`) ?? 0) === -1) {
      chara(arg).train.初吻对象 = 995;
    }
  } else if (rand_n(3) === 0) {
    // 灌肠
    await era.printAndWait('『明明是冒险者，却忍不住了吗？』');
    await era.printAndWait(
      `${arg_name}的肛门被灌入了灌肠液，忍受着强烈的便意。`,
    );
    await era.printAndWait(
      '『快点自慰！在漏出来之前自慰去了的话就带你上厕所！』',
    );
    await era.printAndWait(
      `${arg_name}拼命地自慰着，但是在这异常的状况中，却无法兴奋起来。`,
    );
    await era.printAndWait('肛门里的污物，终于无法忍耐地飞散而出。');
    await era.printAndWait(
      `魔族男人们看到这样，毫不留情地说着侮蔑的话，${arg_name}在这份屈辱中泣不成声。`,
    );

    if (era.get(`talent:${arg}:62`)) {
      // 反感污臭
      await era.printAndWait(
        `${arg_name}因自己拉出的东西的味道而皱起眉头，羞愧欲死。`,
      );
      await era.print(`苦痛点数+${mon_num * 10}`);
      era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    }

    await era.print(`耻情点数+${mon_num * 10}`);
    await era.print(`屈服点数+${mon_num * 10}`);
    await era.print('自慰经验+1');
    await era.print('调教自慰经验+1');
    era.add(`juel:${arg}:8`, mon_num * 10); // JUEL:ARG:8 耻情
    era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
    chara(arg).dungeon.自慰经验 += 1; // EXP:ARG:10 自慰经验
    chara(arg).dungeon.调教自慰经验 += 1; // EXP:ARG:11 调教自慰经验
  } else if (rand_n(2) === 0) {
    // 舔肛
    await era.printAndWait('『那个冒险者大人，在舔我的肛门哦！』');
    await era.printAndWait(
      `${arg_name}以舔肛门为代价，获得了魔族男人对于生命安全的保证。`,
    );
    await era.printAndWait('『你的尊严，真不值钱呢！』');
    await era.printAndWait(
      `${arg_name}拼命地侍奉着，听到这话，心里想死的心都有了，泪水在眼眶中打转。`,
    );
    await era.printAndWait(
      `侍奉结束之后，${arg_name}还被迫要说出淫秽的话语。他忍无可忍地大哭着，宣布自己喜欢舔肛。`,
    );

    if (era.get(`talent:${arg}:17`)) {
      // 低姿态
      await era.printAndWait(
        `自尊心低下的${arg_name}，拼命地说着自己是舔肛用奴隶。`,
      );
      // Y += 10 —— 死代码（Y 全库无初始化与读取，见文件头）
    }
    if (era.get(`talent:${arg}:62`)) {
      // 反感污臭
      await era.printAndWait(`${arg_name}因为舔肛而恶心地吐了。`);
      // Y += 10 —— 死代码（同上）
    }

    await era.print(`苦痛点数+${mon_num * 10}`);
    await era.print(`恐怖点数+${mon_num * 10}`);
    era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
    era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  } else {
    // 娼妓
    await era.printAndWait('『这个为了保命就来者不拒的娼妓！』');
    await era.printAndWait(
      `${arg_name}屁股翘起，用屈辱的姿势承受着不知多少个魔族男人的肉棒。沐浴在他们的精液和骂声之中。`,
    );
    await era.printAndWait(
      '『说！说我是个相对于做冒险者，更喜欢做娼妓的淫乱贱婊！』',
    );
    await era.printAndWait(
      `${arg_name}在激烈的抽插中，不断地重复着屈辱的台词。`,
    );

    if (era.get(`talent:${arg}:17`)) {
      // 低姿态
      await era.printAndWait(
        `${arg_name}拼命地重复着淫乱的话语乞求饶命，美丽的脸庞在恐惧和淫媚中扭曲了……`,
      );
      await era.print(`屈服点数+${mon_num * 10}`);
      era.add(`juel:${arg}:6`, mon_num * 10); // JUEL:ARG:6 屈服
    }
    if (era.get(`abl:${arg}:21`) > 0) {
      // 抖M气质
      await era.printAndWait(`说着过激的言语，${arg_name}的心里产生了情欲。`);
      await era.print(`欲情点数+${mon_num * 10}`);
      era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
    }

    await era.print(`肛门经验+${mon_num}`);
    await era.print(`精液经验+${mon_num}`);
    chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
    chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// beast_ryou_man(arg)
/**
 * 魔兽凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列魔兽数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function beast_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const c131 = era.get(`cflag:${arg}:131`);

  // 畏怖阶段口上（PRINTDATAW 三档）
  if (c131 > 5) {
    // 隷属状態
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
    );
  } else if (c131 > 3) {
    // 強畏怖状態
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
    );
  } else {
    // 初见的畏惧
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
    );
  }

  await era.printAndWait('『噢！』');
  await era.printAndWait(`野兽们，开始轮番兽奸${arg_name}。`);
  await era.printAndWait('「啊！呜！不要啊……啊啊啊！」');
  await era.printAndWait(
    `${arg_name}无法面对自己被野兽轮奸的事实，保持着母狗的姿态，呆若木鸡……`,
  );

  if (era.get(`talent:${arg}:314`) === 2) {
    // 人狼
    await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和野兽做爱……`);
    await era.print(`欲情点数+${mon_num * 10}`);
    era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
  }
  await era.print(`肛门经验+${mon_num}`);
  await era.print(`苦痛点数+${mon_num * 10}`);
  await era.print(`恐怖点数+${mon_num * 10}`);
  chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
  era.add(`juel:${arg}:9`, mon_num * 10); // JUEL:ARG:9 苦痛
  era.add(`juel:${arg}:10`, mon_num * 10); // JUEL:ARG:10 恐怖
  await era.printAndWait(`兽奸经验+${mon_num}`);
  chara(arg).dungeon.兽奸经验 += mon_num; // EXP:ARG:56 兽奸经验
  return 0;
}

// brain_ryou_man(arg)
/**
 * 食脑魔凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列食脑魔数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function brain_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const c131 = era.get(`cflag:${arg}:131`);

  // 畏怖阶段口上（PRINTDATAW 三档）
  if (c131 > 5) {
    // 隷属状態
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
    );
  } else if (c131 > 3) {
    // 強畏怖状態
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
    );
  } else {
    // 初见的畏惧
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
    );
  }

  if (rand_n(2) === 0) {
    // 处女封印
    await era.printAndWait('食脑魔咬住冒险者的头，开始支配他的精神。');
    await era.printAndWait('「啊…啊…啊…啊…啊……」');
    await era.printAndWait(`${arg_name}眼珠上翻，伸出舌头，脱粪了。`);
    await era.print(`肛门经验+${mon_num * 10}`);
    await era.print('异常经验+1');
    chara(arg).dungeon.异常经验 += 1; // EXP:ARG:50 异常经验
    chara(arg).dungeon.肛门经验 += mon_num * 10; // EXP:ARG:1 肛门经验
  } else {
    // 触手入脑
    await era.printAndWait(
      '食脑魔的触手缠绕着冒险者，他死命地挣扎，却无法挣脱。',
    );
    await era.printAndWait(
      `食脑魔的触手，直接突入到${arg_name}的脑子里，往脑髓注入媚药成分。`,
    );
    await era.printAndWait(`${arg_name}被过度的快感弄失禁了，成了废人。`);
    await era.printAndWait('幸好，躯干还是完好的。');
    await era.print('异常经验+1');
    chara(arg).dungeon.异常经验 += 1; // EXP:ARG:50 异常经验
  }
  await era.waitAnyKey(); // WAIT
  return 0;
}

// horse_ryou_man(arg)
/**
 * 马凌辱（男性对象）。
 *
 * @param {number} arg 被凌辱者角色号
 * @param {number} mon_num 该列马数量（由分派方传入）
 * @param {(n: number) => number} [rand] RAND:N 随机源
 * @returns {Promise<number>} 0（RETURN 0）
 */
async function horse_ryou_man(arg, mon_num, rand) {
  const rand_n = rand ?? ((n) => Math.floor(Math.random() * n));
  const arg_name = arg_name_of(arg);
  const c131 = era.get(`cflag:${arg}:131`);

  // 畏怖阶段口上（PRINTDATAW 三档）
  if (c131 > 5) {
    // 隷属状態
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
    );
  } else if (c131 > 3) {
    // 強畏怖状態
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
    );
  } else {
    // 初见的畏惧
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
    );
  }

  await era.printAndWait(
    '养马人给马的阴茎施加了缩小的魔法，让它变小至适应肛门的大小。',
  );
  await era.printAndWait(
    '『你很有素质嘛～看在这个份上，就用魔法让你好受些。』',
  );
  await era.printAndWait(`${arg_name}不得不用肛门承受着兽奸……`);

  if (era.get(`talent:${arg}:314`) === 2) {
    // 人狼
    await era.printAndWait(`身为狼人的${arg_name}貌似不太反感和马做爱……`);
    await era.print(`欲情点数+${mon_num * 10}`);
    era.add(`juel:${arg}:5`, mon_num * 10); // JUEL:ARG:5 欲情
  }
  await era.print(`肛门经验+${mon_num}`);
  await era.print(`精液经验+${mon_num}`);
  await era.printAndWait(`兽奸经验+${mon_num}`);
  chara(arg).dungeon.肛门经验 += mon_num; // EXP:ARG:1 肛门经验
  chara(arg).dungeon.精液经验 += mon_num; // EXP:ARG:20 精液经验
  chara(arg).dungeon.兽奸经验 += mon_num; // EXP:ARG:56 兽奸经验
  await era.waitAnyKey(); // WAIT
  return 0;
}

module.exports = {
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
