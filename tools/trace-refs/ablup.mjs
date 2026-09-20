// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：ablup.mjs（issue #464）

// 锚文本按逐字复制源文件对应行/片段构造，交给本函数转义成安全正则。
function lit(s) {
  const escaped = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // 多行锚按行拆开、用 \s+ 重接：续行缩进是几个 Tab 靠肉眼数容易数错，
  // 鉴别力判定（trace-check.mjs 头注 #298）只看命中与窗口是否相同，
  // 不校验空白宽度。
  return new RegExp(escaped.split('\n').join('\\s+'), 'm');
}

// 整行锚：避免子串撞进更长的同名行（如 DRAWLINE 撞进 CUSTOMDRAWLINE）；
// 允许行首缩进（Tab 数量不逐字比对，理由见 lit() 头注）。
function whole_line(s) {
  const escaped = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^\\s*${escaped}$`, 'm');
}

const TRAIN_MAIN = 'target/ERB/調教相關/TRAIN_MAIN.ERB';
const ABLUP0 = 'target/ERB/ABL/ABLUP0.ERB';
const ABLUP1 = 'target/ERB/ABL/ABLUP1.ERB';
const ABLUP2 = 'target/ERB/ABL/ABLUP2.ERB';
const ABLUP3 = 'target/ERB/ABL/ABLUP3.ERB';
const ABLUP4 = 'target/ERB/ABL/ABLUP4.ERB';
const ABLUP5 = 'target/ERB/ABL/ABLUP5.ERB';
const ABLUP6 = 'target/ERB/ABL/ABLUP6.ERB';
const ABLUP7 = 'target/ERB/ABL/ABLUP7.ERB';
const ABLUP8 = 'target/ERB/ABL/ABLUP8.ERB';
const ABLUP9 = 'target/ERB/ABL/ABLUP9.ERB';

export const FILES = [
  {
    js: 'ere/system/train/ablup.js',
    refs: [
      // —— juel-check.js 的 @JUEL_CHECK 分发范围（文件头「调用方」一节引用）——
      { src: TRAIN_MAIN, ref: '463-539', any: [lit(';阴蒂感觉')] },

      // —— ABLUP0.ERB @ABLUP0 :7-92 + @GET_ABLUP_STATE :97-110 + @DECIDE_ABLUP0 :126-234 ——
      { src: ABLUP0, ref: '7-92', any: [lit('@ABLUP0')] },
      // :11-16（首段 CALC 计算）与 DECIDE_ABLUP0（:130-136）逐字相同，两处
      // 都不打专门锚——鉴别力判据要求「窗口相同」，这两处紧邻的上下文其实
      // 不同（一处后接 DRAWLINE，一处后接梯子），无法用短文本可靠区分。
      { src: ABLUP0, ref: '19', any: [whole_line('DRAWLINE')] },
      { src: ABLUP0, ref: '20-27', any: [lit('PRINTL 的感度提升了。')] },
      {
        src: ABLUP0,
        ref: '28-35',
        any: [lit('感觉越高，越容易在舔舐、自慰等行为得到更大的快感。')],
      },
      { src: ABLUP0, ref: '36', any: [lit('CUSTOMDRAWLINE ‥')] },
      {
        src: ABLUP0,
        ref: '37-39',
        any: [lit('PRINTW 需要特殊素质才能继续提升')],
      },
      { src: ABLUP0, ref: '40-49', any: [lit('PRINTW 感觉已经被封锁了')] },
      { src: ABLUP0, ref: '50-52', any: [lit('PRINTW 已达最高级')] },
      { src: ABLUP0, ref: '63-67', any: [lit('阴茎点数×{JUEL:0}/{A} ……')] },
      { src: ABLUP0, ref: '64-69', any: [lit('PRINTV GET_ABLUP_STATE(I)')] },
      { src: ABLUP0, ref: '71', any: [lit('PRINTL [100] - 停止')] },
      { src: ABLUP0, ref: '74', any: [whole_line('INPUT')] },
      { src: ABLUP0, ref: '77-78', any: [lit('PRINTL 未满足条件')] },
      { src: ABLUP0, ref: '78-79', any: [lit('未满足条件\nRESTART')] },
      {
        src: ABLUP0,
        ref: '80-81',
        any: [lit('ELSEIF RESULT == 100\nRETURN 0')],
      },
      { src: ABLUP0, ref: '84', any: [lit('ABL:0 += 1')] },
      { src: ABLUP0, ref: '86-88', any: [lit('IF RESULT == 0\nJUEL:0 -= A')] },
      { src: ABLUP0, ref: '90', any: [lit('%ABLNAME:0%变为LV{ABL:0}。')] },
      { src: ABLUP0, ref: '97-110', any: [lit('@GET_ABLUP_STATE(ARG)')] },
      { src: ABLUP0, ref: '126-234', any: [lit('@DECIDE_ABLUP0')] },
      { src: ABLUP0, ref: '151-186', any: [lit('IF ABL:0 == 0\nA = 1')] },
      {
        src: ABLUP0,
        ref: '188-196',
        any: [lit('SIF ABL:0 == 4\nTIMES A , 2.00')],
      },
      { src: ABLUP0, ref: '198-200', any: [lit('阴蒂钝感\nSIF TALENT:101')] },
      { src: ABLUP0, ref: '202-204', any: [lit('阴蒂敏感\nSIF TALENT:102')] },
      {
        src: ABLUP0,
        ref: '206-213',
        any: [lit('他部位の封鎖数\nIF ABL:0 > 5 && ABL:0 <= 10 && CALC > 0')],
      },
      { src: ABLUP0, ref: '215-217', any: [lit('淫乱\nSIF TALENT:76')] },
      { src: ABLUP0, ref: '218-220', any: [lit('自慰狂\nSIF TALENT:74')] },
      { src: ABLUP0, ref: '222-224', any: [lit('最低でも1個は必要')] },
      {
        src: ABLUP0,
        ref: '226-228',
        any: [lit('阴核点数で上げる\nSIF JUEL:0 < A')],
      },

      // —— ABLUP1.ERB @ABLUP1 :7-70 + @DECIDE_ABLUP1 :86-210 ——
      { src: ABLUP1, ref: '7-70', any: [lit('@ABLUP1')] },
      { src: ABLUP1, ref: '18', any: [whole_line('DRAWLINE')] },
      { src: ABLUP1, ref: '19-23', any: [lit('PRINTL 乳头的感度提升了。')] },
      {
        src: ABLUP1,
        ref: '25-27',
        any: [lit('ABL:1 >= 5 && TALENT:78 == 0\nPRINTW')],
      },
      { src: ABLUP1, ref: '28-30', any: [lit('PRINTW 乳房感觉已经被封锁了')] },
      {
        src: ABLUP1,
        ref: '31-33',
        any: [lit('ABL:1 >= CALC * 5 + 10\nPRINTW')],
      },
      {
        src: ABLUP1,
        ref: '45-47',
        any: [lit('%PALAMNAME:14%点数×{JUEL:14}/{A} ……')],
      },
      { src: ABLUP1, ref: '49', any: [lit('PRINTL [100] - 停止')] },
      { src: ABLUP1, ref: '52', any: [whole_line('INPUT')] },
      { src: ABLUP1, ref: '56', any: [lit('PRINTL 未满足条件')] },
      { src: ABLUP1, ref: '62', any: [lit('ABL:1 += 1')] },
      { src: ABLUP1, ref: '64-66', any: [lit('IF RESULT == 0\nJUEL:14 -= A')] },
      { src: ABLUP1, ref: '68', any: [lit('%ABLNAME:1%变为LV{ABL:1}。')] },
      { src: ABLUP1, ref: '86-210', any: [lit('@DECIDE_ABLUP1')] },

      // —— ABLUP2.ERB @ABLUP2 :8-75 + @DECIDE_ABLUP2 :91-237 ——
      { src: ABLUP2, ref: '8-75', any: [lit('@ABLUP2')] },
      { src: ABLUP2, ref: '22', any: [whole_line('DRAWLINE')] },
      {
        src: ABLUP2,
        ref: '23-25',
        any: [lit('私处感觉越高，越容易在振动、性爱等行为得到更大的快感。')],
      },
      {
        src: ABLUP2,
        ref: '27-29',
        any: [lit('ABL:2 >= 5 && TALENT:75 == 0\nPRINTW')],
      },
      { src: ABLUP2, ref: '30-32', any: [lit('PRINTW 私处感觉已经被封锁了')] },
      {
        src: ABLUP2,
        ref: '33-35',
        any: [lit('ABL:2 >= CALC * 5 + 10\nPRINTW')],
      },
      {
        src: ABLUP2,
        ref: '49-51',
        any: [lit('%PALAMNAME:1%点数×{JUEL:1}/{A} ……')],
      },
      { src: ABLUP2, ref: '52-53', any: [lit('%EXPNAME:0%　　{EXP:0}/{B}')] },
      { src: ABLUP2, ref: '55', any: [lit('PRINTL [100] - 停止')] },
      { src: ABLUP2, ref: '57', any: [whole_line('INPUT')] },
      { src: ABLUP2, ref: '61', any: [lit('PRINTL 未满足条件')] },
      { src: ABLUP2, ref: '67', any: [lit('ABL:2 += 1')] },
      { src: ABLUP2, ref: '69-71', any: [lit('IF RESULT == 0\nJUEL:1 -= A')] },
      { src: ABLUP2, ref: '73', any: [lit('%ABLNAME:2%变为LV{ABL:2}。')] },
      { src: ABLUP2, ref: '91-237', any: [lit('@DECIDE_ABLUP2')] },
      {
        src: ABLUP2,
        ref: '119-170',
        any: [lit('IF ABL:2 == 0\nA = 1\nB = 2')],
      },
      {
        src: ABLUP2,
        ref: '173-184',
        any: [lit('TIMES A , 2.00\nTIMES B , 2.00')],
      },
      { src: ABLUP2, ref: '186-190', any: [lit('私处钝感\nIF TALENT:103')] },
      {
        src: ABLUP2,
        ref: '192-202',
        any: [lit('他部位の封鎖数\nIF ABL:2 > 5 && ABL:2 <= 10 && CALC > 0')],
      },
      { src: ABLUP2, ref: '227-228', any: [lit('SIF JUEL:1 < A\nI |= 1')] },
      { src: ABLUP2, ref: '229-231', any: [lit('性交经验は足りている？')] },

      // —— ABLUP3.ERB @ABLUP3 :7-73 + @DECIDE_ABLUP3 :89-233 ——
      { src: ABLUP3, ref: '7-73', any: [lit('@ABLUP3')] },
      { src: ABLUP3, ref: '18', any: [whole_line('DRAWLINE')] },
      {
        src: ABLUP3,
        ref: '19-20',
        any: [lit('肛门的感度提升了。\n;PRINTL 肛门感觉越高')],
      },
      {
        src: ABLUP3,
        ref: '25-27',
        any: [lit('ABL:3 >= 5 && TALENT:77 == 0\nPRINTW')],
      },
      { src: ABLUP3, ref: '28-30', any: [lit('PRINTW 肛门感觉已经被封锁了')] },
      {
        src: ABLUP3,
        ref: '31-33',
        any: [lit('ABL:3 >= CALC * 5 + 10\nPRINTW')],
      },
      {
        src: ABLUP3,
        ref: '47-48',
        any: [lit('%PALAMNAME:2%点数×{JUEL:2}/{A} ……')],
      },
      { src: ABLUP3, ref: '50', any: [lit('%EXPNAME:1%　　{EXP:1}/{B}')] },
      { src: ABLUP3, ref: '52', any: [lit('PRINTL [100] - 停止')] },
      { src: ABLUP3, ref: '55', any: [whole_line('INPUT')] },
      { src: ABLUP3, ref: '59', any: [lit('PRINTL 未满足条件')] },
      { src: ABLUP3, ref: '65', any: [lit('ABL:3 += 1')] },
      { src: ABLUP3, ref: '67-69', any: [lit('IF RESULT == 0\nJUEL:2 -= A')] },
      { src: ABLUP3, ref: '71', any: [lit('%ABLNAME:3%变为LV{ABL:3}。')] },
      { src: ABLUP3, ref: '89-233', any: [lit('@DECIDE_ABLUP3')] },
      { src: ABLUP3, ref: '223-224', any: [lit('SIF JUEL:2 < A\nI |= 1')] },
      { src: ABLUP3, ref: '225-227', any: [lit('肛门经验は足りているか？')] },

      // —— ABLUP4.ERB @ABLUP4 :1-48 + @DECIDE_ABLUP4 :50-83 ——
      { src: ABLUP4, ref: '1-48', any: [lit('@ABLUP4')] },
      { src: ABLUP4, ref: '3', any: [whole_line('DRAWLINE')] },
      { src: ABLUP4, ref: '4-6', any: [lit('PRINTW 已达到MAX。')] },
      {
        src: ABLUP4,
        ref: '11-24',
        any: [lit('PRINT [0] - \nPRINTS PALAMNAME:15')],
      },
      { src: ABLUP4, ref: '16-23', any: [lit('SIF I & 2\nPRINT 经验不足')] },
      { src: ABLUP4, ref: '21-22', any: [lit('SIF I & 2\nPRINT 经验不足')] },
      { src: ABLUP4, ref: '26', any: [lit('PRINTL [100] - 放弃')] },
      { src: ABLUP4, ref: '29', any: [whole_line('INPUT')] },
      { src: ABLUP4, ref: '33', any: [lit('PRINTL 条件不足。')] },
      { src: ABLUP4, ref: '39', any: [lit('ABL:4 += 1')] },
      { src: ABLUP4, ref: '41-43', any: [lit('JUEL:15 -= A')] },
      {
        src: ABLUP4,
        ref: '45-48',
        any: [lit('のレベルが\nPRINTV ABL:4\nPRINTW になりました。')],
      },
      { src: ABLUP4, ref: '50-83', any: [lit('@DECIDE_ABLUP4')] },
      {
        src: ABLUP4,
        ref: '64-66',
        any: [lit('IF TALENT:27\nTIMES A , 2.00\nENDIF')],
      },
      {
        src: ABLUP4,
        ref: '70-72',
        any: [lit('IF TALENT:27\nTIMES A , 3.00\nENDIF')],
      },
      { src: ABLUP4, ref: '76-77', any: [lit('SIF JUEL:15 < A\nI |= 1')] },

      // —— ABLUP5.ERB @ABLUP5 :1-96 ——
      { src: ABLUP5, ref: '1-96', any: [lit('@ABLUP5')] },
      { src: ABLUP5, ref: '3', any: [whole_line('DRAWLINE')] },
      { src: ABLUP5, ref: '4-6', any: [lit('PRINTW 已达到MAX。')] },
      { src: ABLUP5, ref: '12-45', any: [lit('IF ABL:5 == 0\nA = 1\nB = 2')] },
      {
        src: ABLUP5,
        ref: '47-49',
        any: [lit('快Ａ点数で上げる\nSIF JUEL:2 < A')],
      },
      { src: ABLUP5, ref: '51-52', any: [lit('SIF EXP:1 < B')] },
      {
        src: ABLUP5,
        ref: '54-70',
        any: [lit('PRINT 点数×\nPRINTV A\nPRINT 、\nPRINTS EXPNAME:1')],
      },
      { src: ABLUP5, ref: '73', any: [lit('PRINTL [100] - 放弃')] },
      { src: ABLUP5, ref: '76', any: [whole_line('INPUT')] },
      { src: ABLUP5, ref: '80', any: [lit('PRINTL 条件不足。')] },
      { src: ABLUP5, ref: '86', any: [lit('ABL:5 += 1')] },
      { src: ABLUP5, ref: '88-90', any: [lit('JUEL:2 -= A')] },
      {
        src: ABLUP5,
        ref: '92-95',
        any: [lit('のレベルが\nPRINTV ABL:5\nPRINTW になりました。')],
      },

      // —— ABLUP6.ERB @ABLUP6 :3-242 ——
      { src: ABLUP6, ref: '3-242', any: [lit('@ABLUP6')] },
      { src: ABLUP6, ref: '4', any: [whole_line('DRAWLINE')] },
      { src: ABLUP6, ref: '5-7', any: [lit('PRINTW 已达到MAX。')] },
      { src: ABLUP6, ref: '15-56', any: [lit('IF ABL:6 == 0\nA = 100')] },
      { src: ABLUP6, ref: '59-65', any: [lit('倒錯的\nIF TALENT:80')] },
      {
        src: ABLUP6,
        ref: '67-76',
        any: [lit('従順が奉仕精神＋１レベルでないといけない')],
      },
      {
        src: ABLUP6,
        ref: '68-70',
        any: [lit('PRINTS ABLNAME:0\nPRINTV ABL:6+1\nPRINTL LV以上')],
      },
      {
        src: ABLUP6,
        ref: '78-97',
        any: [lit('ＬＶ３から４、４から５に上げるときは異常経験必要')],
      },
      { src: ABLUP6, ref: '100-101', any: [lit('SIF JUEL:6 < A\nI |= 1')] },
      {
        src: ABLUP6,
        ref: '102-104',
        any: [lit('絶頂経験が必要な場合\nSIF EXP:2 < E')],
      },
      {
        src: ABLUP6,
        ref: '105-107',
        any: [lit('精液経験が必要な場合\nSIF EXP:20 < E')],
      },
      { src: ABLUP6, ref: '109-112', any: [lit('PRINTS PALAMNAME:6')] },
      {
        src: ABLUP6,
        ref: '113-122',
        any: [
          lit(
            'PRINTS EXPNAME:2\nPRINTV E\nPRINT 以上\nPRINT 、\nPRINTS EXPNAME:20',
          ),
        ],
      },
      { src: ABLUP6, ref: '123-134', any: [lit('SIF I & 4\nPRINT 能力不足 ')] },
      { src: ABLUP6, ref: '139-140', any: [lit('SIF JUEL:4 < B\nJ |= 1')] },
      {
        src: ABLUP6,
        ref: '141-143',
        any: [lit('この場合奉仕快楽経験が必要なことあり')],
      },
      { src: ABLUP6, ref: '145-148', any: [lit('PRINTS PALAMNAME:4')] },
      { src: ABLUP6, ref: '149-154', any: [lit('PRINTS EXPNAME:21')] },
      { src: ABLUP6, ref: '155-166', any: [lit('IF J == 0\nPRINT ＯＫ')] },
      { src: ABLUP6, ref: '168-170', any: [lit('ELSE\nJ = 256')] },
      { src: ABLUP6, ref: '174-175', any: [lit('SIF JUEL:7 < A\nK |= 1')] },
      {
        src: ABLUP6,
        ref: '176-178',
        any: [lit('この場合絶頂経験が１以上必要\nSIF EXP:2 < 1')],
      },
      { src: ABLUP6, ref: '180-199', any: [lit('PRINTS PALAMNAME:7')] },
      { src: ABLUP6, ref: '201-203', any: [lit('ELSE\nK = 256')] },
      { src: ABLUP6, ref: '205', any: [lit('PRINTL [100] - 放弃')] },
      { src: ABLUP6, ref: '208', any: [whole_line('INPUT')] },
      {
        src: ABLUP6,
        ref: '211-212',
        any: [lit('I != 0 && RESULT == 0\nPRINTL 条件不足。请重新输入。')],
      },
      {
        src: ABLUP6,
        ref: '214-218',
        any: [lit('J == 256 && RESULT == 1\nGOTO INPUT_LOOP')],
      },
      {
        src: ABLUP6,
        ref: '219-223',
        any: [lit('K == 256 && RESULT == 2\nGOTO INPUT_LOOP')],
      },
      {
        src: ABLUP6,
        ref: '224-225',
        any: [lit('ELSEIF RESULT == 100\nRETURN 0')],
      },
      { src: ABLUP6, ref: '228', any: [lit('ABL:6 += 1')] },
      {
        src: ABLUP6,
        ref: '230-231',
        any: [lit('IF RESULT == 0\nJUEL:6 -= A')],
      },
      {
        src: ABLUP6,
        ref: '232-233',
        any: [lit('ELSEIF RESULT == 1\nJUEL:4 -= B')],
      },
      {
        src: ABLUP6,
        ref: '234-235',
        any: [lit('ELSEIF RESULT == 2\nJUEL:7 -= C')],
      },
      {
        src: ABLUP6,
        ref: '238-241',
        any: [lit('のレベルが\nPRINTV ABL:6\nPRINTW になりました。')],
      },

      // —— ABLUP7.ERB @ABLUP7 :2-134 ——
      { src: ABLUP7, ref: '2-134', any: [lit('@ABLUP7')] },
      { src: ABLUP7, ref: '3', any: [whole_line('DRAWLINE')] },
      { src: ABLUP7, ref: '4-6', any: [lit('PRINTW 已达到MAX。')] },
      { src: ABLUP7, ref: '14-30', any: [lit('IF ABL:7 == 0\nA = 100')] },
      {
        src: ABLUP7,
        ref: '32-35',
        any: [lit('倒錯的\nIF TALENT:80\nTIMES A , 0.75\nENDIF')],
      },
      {
        src: ABLUP7,
        ref: '32-40',
        any: [lit('目立ちたがり\nIF TALENT:80\nTIMES A , 0.50')],
      },
      {
        src: ABLUP7,
        ref: '37-40',
        any: [lit('目立ちたがり\nIF TALENT:80\nTIMES A , 0.50')],
      },
      {
        src: ABLUP7,
        ref: '43-45',
        any: [lit('PRINTS ABLNAME:1\nPRINTV ABL:7+1\nPRINTL LV以上')],
      },
      { src: ABLUP7, ref: '46-49', any: [lit('欲望が不足')] },
      { src: ABLUP7, ref: '52-54', any: [lit('PRINTS EXPNAME:50\nPRINTL 有')] },
      {
        src: ABLUP7,
        ref: '55-58',
        any: [lit('IF EXP:50 == 0\n;異常経験が不足\nI |= 2')],
      },
      {
        src: ABLUP7,
        ref: '59-61',
        any: [lit('PRINTS EXPNAME:50\nPRINTL 2以上')],
      },
      {
        src: ABLUP7,
        ref: '62-65',
        any: [lit('IF EXP:50 < 2\n;異常経験が不足\nI |= 2')],
      },
      {
        src: ABLUP7,
        ref: '68-70',
        any: [lit('恥情点数で上げる\nSIF JUEL:8 < A')],
      },
      {
        src: ABLUP7,
        ref: '71-79',
        any: [lit('IF ABL:7 < 2\n;絶頂経験が必要\nSIF EXP:2 == 0')],
      },
      {
        src: ABLUP7,
        ref: '72-74',
        any: [lit('絶頂経験が必要\nSIF EXP:2 == 0\nI |= 2')],
      },
      {
        src: ABLUP7,
        ref: '76-78',
        any: [lit('調教自慰経験が必要\nSIF EXP:11 == 0\nI |= 2')],
      },
      { src: ABLUP7, ref: '81-107', any: [lit('PRINTS PALAMNAME:8')] },
      {
        src: ABLUP7,
        ref: '85-89',
        any: [lit('IF ABL:7 < 2\nPRINT 、\nPRINTS EXPNAME:2')],
      },
      {
        src: ABLUP7,
        ref: '90-94',
        any: [lit('ELSE\nPRINT 、\nPRINTS EXPNAME:11')],
      },
      { src: ABLUP7, ref: '111', any: [lit('PRINTL [100] - 放弃')] },
      { src: ABLUP7, ref: '114', any: [whole_line('INPUT')] },
      { src: ABLUP7, ref: '118', any: [lit('PRINTL 条件不满足。')] },
      { src: ABLUP7, ref: '124', any: [lit('ABL:7 += 1')] },
      { src: ABLUP7, ref: '126-128', any: [lit('JUEL:8 -= A')] },
      {
        src: ABLUP7,
        ref: '130-133',
        any: [lit('的等级提升到\nPRINTV ABL:7\nPRINTW 级了。')],
      },

      // —— ABLUP8.ERB @ABLUP8 :2-225 ——
      { src: ABLUP8, ref: '2-225', any: [lit('@ABLUP8')] },
      { src: ABLUP8, ref: '2-189', any: [lit('@ABLUP8')] },
      { src: ABLUP8, ref: '3', any: [whole_line('DRAWLINE')] },
      { src: ABLUP8, ref: '4-6', any: [lit('PRINTW 已达到MAX。')] },
      { src: ABLUP8, ref: '13-55', any: [lit('IF ABL:8 == 0\nA = 100')] },
      { src: ABLUP8, ref: '57-64', any: [lit('解放\nIF TALENT:33')] },
      {
        src: ABLUP8,
        ref: '66-73',
        any: [lit('倒錯的\nIF TALENT:80\nTIMES A , 0.75\nTIMES B , 0.75')],
      },
      {
        src: ABLUP8,
        ref: '76-78',
        any: [lit('PRINTS ABLNAME:1\nPRINTV ABL:8+1\nPRINTL LV以上')],
      },
      { src: ABLUP8, ref: '87-88', any: [lit('PRINTS EXPNAME:50\nPRINTL 有')] },
      {
        src: ABLUP8,
        ref: '95-96',
        any: [lit('PRINTS EXPNAME:50\nPRINTL 2以上')],
      },
      { src: ABLUP8, ref: '106-107', any: [lit('SIF JUEL:9 < A\nI |= 1')] },
      {
        src: ABLUP8,
        ref: '108-110',
        any: [lit('欲情点数で上げる\nSIF JUEL:5 < B')],
      },
      {
        src: ABLUP8,
        ref: '111-113',
        any: [lit('苦痛快楽経験が必要な場合\nSIF EXP:30 < C')],
      },
      {
        src: ABLUP8,
        ref: '115-122',
        any: [
          lit(
            'PRINTS PALAMNAME:9\nPRINT 点数×\nPRINTV A\nPRINT 、\nPRINTS PALAMNAME:5',
          ),
        ],
      },
      {
        src: ABLUP8,
        ref: '123-128',
        any: [lit('IF C > 0\nPRINT 、\nPRINTS EXPNAME:30')],
      },
      { src: ABLUP8, ref: '129-140', any: [lit('SIF I & 4\nPRINT 能力不足 ')] },
      { src: ABLUP8, ref: '146-147', any: [lit('SIF JUEL:9 < D\nJ |= 1')] },
      {
        src: ABLUP8,
        ref: '148-150',
        any: [lit('屈服点数で上げる\nSIF JUEL:6 < E')],
      },
      {
        src: ABLUP8,
        ref: '151-153',
        any: [lit('この場合苦痛快楽経験が必要なことあり')],
      },
      {
        src: ABLUP8,
        ref: '154-156',
        any: [lit('この場合絶頂経験が１以上必要\nSIF EXP:2 < 1')],
      },
      { src: ABLUP8, ref: '158-165', any: [lit('PRINTS PALAMNAME:6')] },
      {
        src: ABLUP8,
        ref: '166-171',
        any: [lit('IF C > 0\nPRINT 、\nPRINTS EXPNAME:30\nPRINTV C')],
      },
      {
        src: ABLUP8,
        ref: '172-187',
        any: [lit('PRINTS EXPNAME:2\nPRINTV 1\nPRINT 以上\nPRINT ……')],
      },
      { src: ABLUP8, ref: '189-191', any: [lit('ELSE\nJ = 256')] },
      { src: ABLUP8, ref: '193', any: [lit('PRINTL [100] - 放弃')] },
      { src: ABLUP8, ref: '196', any: [whole_line('INPUT')] },
      {
        src: ABLUP8,
        ref: '199-200',
        any: [lit('ELSEIF I != 0 && RESULT == 0\nPRINTL 条件不足。')],
      },
      {
        src: ABLUP8,
        ref: '204-205',
        any: [lit('ELSEIF J != 0 && RESULT == 1\nPRINTL 条件不足。')],
      },
      { src: ABLUP8, ref: '211', any: [lit('ABL:8 += 1')] },
      {
        src: ABLUP8,
        ref: '213-215',
        any: [lit('IF RESULT == 0\nJUEL:9 -= A\nJUEL:5 -= B')],
      },
      {
        src: ABLUP8,
        ref: '216-218',
        any: [lit('ELSEIF RESULT == 1\nJUEL:9 -= D\nJUEL:6 -= E')],
      },
      {
        src: ABLUP8,
        ref: '221-224',
        any: [lit('のレベルが\nPRINTV ABL:8\nPRINTW になりました。')],
      },

      // —— ABLUP9.ERB @ABLUP9 :2-189 ——
      { src: ABLUP9, ref: '2-189', any: [lit('@ABLUP9')] },
      { src: ABLUP9, ref: '3', any: [whole_line('DRAWLINE')] },
      { src: ABLUP9, ref: '4-6', any: [lit('PRINTW 已达到MAX。')] },
      { src: ABLUP9, ref: '13-50', any: [lit('IF ABL:9 == 0\nA = 200')] },
      { src: ABLUP9, ref: '52-58', any: [lit('レズ素質\nIF TALENT:81')] },
      {
        src: ABLUP9,
        ref: '60-66',
        any: [
          lit(
            '倒錯的\nIF TALENT:80\nTIMES A , 0.75\nTIMES B , 0.75\nTIMES C , 0.75\nTIMES D , 0.75',
          ),
        ],
      },
      { src: ABLUP9, ref: '70-71', any: [lit('PRINTS EXPNAME:50\nPRINTL 有')] },
      {
        src: ABLUP9,
        ref: '78-79',
        any: [lit('PRINTS EXPNAME:50\nPRINTL 2以上')],
      },
      { src: ABLUP9, ref: '87-89', any: [lit('SIF JUEL:5 < A\nI |= 1')] },
      {
        src: ABLUP9,
        ref: '90-92',
        any: [lit('充実点数で上げる\nSIF JUEL:6 < C')],
      },
      {
        src: ABLUP9,
        ref: '93-95',
        any: [lit('レズ経験が必要\nSIF EXP:40 < B\nI |= 2')],
      },
      { src: ABLUP9, ref: '97-100', any: [lit('PRINTS PALAMNAME:5')] },
      {
        src: ABLUP9,
        ref: '101-106',
        any: [lit('IF C > 0\nPRINT 、\nPRINTS PALAMNAME:6')],
      },
      { src: ABLUP9, ref: '107-123', any: [lit('SIF I & 4\nPRINT 能力不足 ')] },
      { src: ABLUP9, ref: '127-128', any: [lit('SIF JUEL:0 < D\nJ |= 1')] },
      {
        src: ABLUP9,
        ref: '129-131',
        any: [lit('レズ経験が必要\nSIF EXP:40 < B\nJ |= 2')],
      },
      { src: ABLUP9, ref: '133-153', any: [lit('PRINTS PALAMNAME:0')] },
      { src: ABLUP9, ref: '154-156', any: [lit('ELSE\nJ = 256')] },
      { src: ABLUP9, ref: '158', any: [lit('PRINTL [100] - 放弃')] },
      { src: ABLUP9, ref: '161', any: [whole_line('INPUT')] },
      {
        src: ABLUP9,
        ref: '164-165',
        any: [lit('ELSEIF I != 0 && RESULT == 0\nPRINTL 条件不足。')],
      },
      {
        src: ABLUP9,
        ref: '169-170',
        any: [lit('ELSEIF J != 0 && RESULT == 1\nPRINTL 条件不足。')],
      },
      { src: ABLUP9, ref: '176', any: [lit('ABL:9 += 1')] },
      {
        src: ABLUP9,
        ref: '178-180',
        any: [lit('IF RESULT == 0\nJUEL:5 -= A\nJUEL:6 -= C')],
      },
      {
        src: ABLUP9,
        ref: '181-182',
        any: [lit('ELSEIF RESULT == 1\nJUEL:0 -= D')],
      },
      {
        src: ABLUP9,
        ref: '185-188',
        any: [lit('のレベルが\nPRINTV ABL:9\nPRINTW になりました。')],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
