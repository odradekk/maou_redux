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
const ABL = 'target/ERB/ABL/ABL.ERB';
const ABLUP10 = 'target/ERB/ABL/ABLUP10.ERB';
const ABLUP11 = 'target/ERB/ABL/ABLUP11.ERB';
const ABLUP12 = 'target/ERB/ABL/ABLUP12.ERB';
const ABLUP13 = 'target/ERB/ABL/ABLUP13.ERB';
const ABLUP14 = 'target/ERB/ABL/ABLUP14.ERB';
const ABLUP15 = 'target/ERB/ABL/ABLUP15.ERB';
const ABLUP16 = 'target/ERB/ABL/ABLUP16.ERB';
const ABLUP17 = 'target/ERB/ABL/ABLUP17.ERB';

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

      // —— ablup10 ↔ ABLUP10.ERB（issue #465）——
      { src: ABLUP10, ref: '8-115', any: [lit('@ABLUP10')] },
      { src: ABLUP10, ref: '137-342', any: [lit('@DECIDE_ABLUP10')] },
      {
        src: ABLUP10,
        ref: '81-96',
        any: [lit('ELSEIF I != 0 && RESULT == 0')],
      },
      { src: ABLUP10, ref: '9', any: [whole_line('DRAWLINE')] },
      {
        src: ABLUP10,
        ref: '15-17',
        any: [
          lit(
            'IF ABL:10 >= 5 && (TALENT:85 == 0 && TALENT:86 == 0)\n\tPRINTW 需要特殊素质才能继续提升',
          ),
        ],
      },
      { src: ABLUP10, ref: '18-20', any: [lit('ELSEIF ABL:10 >= 10')] },
      { src: ABLUP10, ref: '156-206', any: [lit('IF ABL:10 == 0')] },
      {
        src: ABLUP10,
        ref: '208-216',
        any: [lit(';ＬＶ４から５に上げるときは异常经验必要')],
      },
      { src: ABLUP10, ref: '218-223', any: [lit(';胆怯')] },
      { src: ABLUP10, ref: '224-230', any: [lit(';反抗心')] },
      { src: ABLUP10, ref: '231-237', any: [lit(';刚强')] },
      { src: ABLUP10, ref: '238-242', any: [lit(';坦率')] },
      { src: ABLUP10, ref: '243-248', any: [lit(';嚣张')] },
      { src: ABLUP10, ref: '249-253', any: [lit(';高姿态')] },
      { src: ABLUP10, ref: '254-258', any: [lit(';低姿态')] },
      { src: ABLUP10, ref: '260-266', any: [lit(';压抑')] },
      { src: ABLUP10, ref: '266-269', any: [lit(';开放')] },
      { src: ABLUP10, ref: '270-276', any: [lit(';抵抗')] },
      { src: ABLUP10, ref: '278-280', any: [lit(';淫乱')] },
      { src: ABLUP10, ref: '281-283', any: [lit(';爱慕')] },
      { src: ABLUP10, ref: '284-286', any: [lit(';盲从')] },
      { src: ABLUP10, ref: '288-293', any: [lit(';嫉妒')] },
      { src: ABLUP10, ref: '295-297', any: [lit(';最低でも1個は必要')] },
      { src: ABLUP10, ref: '300-306', any: [lit('IF A > 0')] },
      { src: ABLUP10, ref: '308-310', any: [lit(';恭顺点数は足りている？')] },
      { src: ABLUP10, ref: '312-319', any: [lit(';欲情点数は必要か？')] },
      { src: ABLUP10, ref: '321-328', any: [lit(';屈服点数は足りている？')] },
      { src: ABLUP10, ref: '330-336', any: [lit(';异常经验は足りている？')] },
      { src: ABLUP10, ref: '47-48', any: [lit('SIF E > 0')] },
      { src: ABLUP10, ref: '50-54', any: [lit('IF A > 0')] },
      { src: ABLUP10, ref: '57-60', any: [lit(';恭顺点数で上げる')] },
      { src: ABLUP10, ref: '62-66', any: [lit('IF C > 0')] },
      { src: ABLUP10, ref: '69-73', any: [lit('IF D > 0')] },
      { src: ABLUP10, ref: '76', any: [lit('PRINTL [100] - 停止')] },
      { src: ABLUP10, ref: '78', any: [lit('INPUT')] },
      {
        src: ABLUP10,
        ref: '81-82',
        any: [lit('ELSEIF I != 0 && RESULT == 0')],
      },
      {
        src: ABLUP10,
        ref: '84-85',
        any: [lit('ELSEIF J != 0 && RESULT == 1')],
      },
      {
        src: ABLUP10,
        ref: '87-88',
        any: [lit('ELSEIF K == 256 && RESULT == 2')],
      },
      {
        src: ABLUP10,
        ref: '89-90',
        any: [lit('ELSEIF K != 0 && RESULT == 2')],
      },
      {
        src: ABLUP10,
        ref: '92-93',
        any: [lit('ELSEIF L == 256 && RESULT == 3')],
      },
      {
        src: ABLUP10,
        ref: '94-95',
        any: [lit('ELSEIF L != 0 && RESULT == 3')],
      },
      { src: ABLUP10, ref: '101', any: [lit('ABL:10 += 1')] },
      { src: ABLUP10, ref: '103-104', any: [lit('IF RESULT == 0')] },
      {
        src: ABLUP10,
        ref: '113',
        any: [lit('PRINTFORML %ABLNAME:10%变为LV{ABL:10}。')],
      },
      {
        src: ABLUP10,
        ref: '105-106',
        any: [lit('ELSEIF RESULT == 1\nJUEL:4 -= B')],
      },
      { src: ABLUP10, ref: '107-108', any: [lit('ELSEIF RESULT == 2')] },
      { src: ABLUP10, ref: '109-110', any: [lit('ELSEIF RESULT == 3')] },
      // —— ablup11 ↔ ABLUP11.ERB（issue #465）——
      { src: ABLUP11, ref: '8-71', any: [lit('@ABLUP11')] },
      { src: ABLUP11, ref: '87-223', any: [lit('@DECIDE_ABLUP11')] },
      { src: ABLUP11, ref: '44-45', any: [lit('	SIF I & 1')] },
      { src: ABLUP11, ref: '46-47', any: [lit('	SIF I & 2')] },
      { src: ABLUP11, ref: '100-120', any: [lit('IF ABL:11 == 0')] },
      { src: ABLUP11, ref: '122-132', any: [lit(';戒备森严')] },
      { src: ABLUP11, ref: '134-137', any: [lit(';克制')] },
      { src: ABLUP11, ref: '139-142', any: [lit(';保守的')] },
      { src: ABLUP11, ref: '144-146', any: [lit(';看重贞操')] },
      { src: ABLUP11, ref: '147-150', any: [lit(';看轻贞操')] },
      { src: ABLUP11, ref: '152-154', any: [lit(';压抑')] },
      { src: ABLUP11, ref: '155-158', any: [lit(';开放')] },
      { src: ABLUP11, ref: '160-162', any: [lit(';抵抗')] },
      { src: ABLUP11, ref: '164-166', any: [lit(';害羞')] },
      { src: ABLUP11, ref: '167-170', any: [lit(';不知羞耻')] },
      { src: ABLUP11, ref: '172-174', any: [lit(';接受快感')] },
      { src: ABLUP11, ref: '175-178', any: [lit(';否定快感')] },
      { src: ABLUP11, ref: '180-182', any: [lit(';容易上瘾')] },
      { src: ABLUP11, ref: '183-185', any: [lit(';容易陷落')] },
      { src: ABLUP11, ref: '186-188', any: [lit(';淫乱')] },
      { src: ABLUP11, ref: '189-191', any: [lit(';妓女')] },
      { src: ABLUP11, ref: '192-194', any: [lit(';倾城')] },
      { src: ABLUP11, ref: '195-197', any: [lit(';人妻')] },
      {
        src: ABLUP11,
        ref: '199-205',
        any: [
          lit(
            ';ＬＶ４から５に上げるときは异常经验必要（素質：[开放][接受快感][容易陷落][淫乱][疯狂]なら無視できる）',
          ),
        ],
      },
      { src: ABLUP11, ref: '207-209', any: [lit(';最低でも1個は必要')] },
      { src: ABLUP11, ref: '211-213', any: [lit(';欲情点数は足りている？')] },
      { src: ABLUP11, ref: '215-217', any: [lit(';异常经验は足りている？')] },
      { src: ABLUP11, ref: '36-37', any: [lit('SIF E > 0')] },
      { src: ABLUP11, ref: '39-49', any: [lit(';欲情点数で上げる')] },
      { src: ABLUP11, ref: '51', any: [lit('PRINTL [100] - 停止')] },
      { src: ABLUP11, ref: '53', any: [lit('INPUT')] },
      {
        src: ABLUP11,
        ref: '56-57',
        any: [lit('ELSEIF I != 0 && RESULT == 0')],
      },
      { src: ABLUP11, ref: '63', any: [lit('ABL:11 += 1')] },
      { src: ABLUP11, ref: '65-66', any: [lit('IF RESULT == 0')] },
      {
        src: ABLUP11,
        ref: '69',
        any: [lit('PRINTFORML %ABLNAME:11%变为LV{ABL:11}。')],
      },
      // —— ablup12 ↔ ABLUP12.ERB（issue #465）——
      { src: ABLUP12, ref: '8-75', any: [lit('@ABLUP12')] },
      { src: ABLUP12, ref: '91-203', any: [lit('@DECIDE_ABLUP12')] },
      {
        src: ABLUP12,
        ref: '30',
        any: [lit(';习得点数による可否（I=0:可、I&1:点数不足、I&2:経験不足）')],
      },
      // 审查修复新增引用：组合上限提前 RETURN 后 DECIDE 从未赋值（issue #14）
      {
        src: ABLUP12,
        ref: '99-101',
        any: [lit(';判定変数を空に\nA = 0\nI = 0')],
      },
      {
        src: ABLUP12,
        ref: '197-198',
        any: [lit('SIF NO:TARGET == 0 && ABL:MASTER:12 > FLAG:30 + 1')],
      },
      { src: ABLUP12, ref: '41-47', any: [lit('	SIF I & 1')] },
      { src: ABLUP12, ref: '41-42', any: [lit('	SIF I & 1')] },
      { src: ABLUP12, ref: '43-44', any: [lit('	SIF I & 2')] },
      { src: ABLUP12, ref: '45-46', any: [lit('	SIF I & 4')] },
      {
        src: ABLUP12,
        ref: '14-16',
        any: [lit('IF ABL:12 >= 10\n\tPRINTW 已达最高级')],
      },
      {
        src: ABLUP12,
        ref: '20-23',
        any: [lit('	IF JUEL:7 < ABL:12 * ABL:12 * 1000')],
      },
      { src: ABLUP12, ref: '103-123', any: [lit('IF ABL:12 == 0')] },
      { src: ABLUP12, ref: '126-135', any: [lit('IF TALENT:27')] },
      { src: ABLUP12, ref: '137-139', any: [lit(';坦率')] },
      { src: ABLUP12, ref: '140-142', any: [lit(';冷漠')] },
      { src: ABLUP12, ref: '143-145', any: [lit(';好奇心')] },
      { src: ABLUP12, ref: '146-148', any: [lit(';保守的')] },
      { src: ABLUP12, ref: '150-152', any: [lit(';压抑')] },
      { src: ABLUP12, ref: '153-156', any: [lit(';开放')] },
      { src: ABLUP12, ref: '158-160', any: [lit(';抵抗')] },
      { src: ABLUP12, ref: '162-164', any: [lit(';害羞')] },
      { src: ABLUP12, ref: '165-168', any: [lit(';不知羞耻')] },
      { src: ABLUP12, ref: '170-172', any: [lit(';快速学习')] },
      { src: ABLUP12, ref: '173-176', any: [lit(';学习缓慢')] },
      { src: ABLUP12, ref: '178-180', any: [lit(';擅用舌头')] },
      { src: ABLUP12, ref: '181-183', any: [lit(';献身的')] },
      { src: ABLUP12, ref: '184-186', any: [lit(';不怕脏')] },
      { src: ABLUP12, ref: '188-190', any: [lit(';最低でも1個は必要')] },
      {
        src: ABLUP12,
        ref: '195-196',
        any: [lit('SIF NO:TARGET == 0 && MONEY < 5000')],
      },
      {
        src: ABLUP12,
        ref: '34-35',
        any: [
          lit(
            'SIF NO:TARGET == 0\n    PRINTL 魔王通过这种方式提升技巧仍然需要金钱5000点',
          ),
        ],
      },
      {
        src: ABLUP12,
        ref: '36-48',
        any: [lit('PRINTFORM [0] - %PALAMNAME:7%点数×{JUEL:7}/{A} ……')],
      },
      { src: ABLUP12, ref: '50', any: [lit('PRINTL [100] - 停止')] },
      { src: ABLUP12, ref: '52', any: [lit('INPUT')] },
      {
        src: ABLUP12,
        ref: '55-56',
        any: [lit('ELSEIF I != 0 && RESULT == 0')],
      },
      { src: ABLUP12, ref: '62', any: [lit('ABL:12 += 1')] },
      {
        src: ABLUP12,
        ref: '63-65',
        any: [
          lit('IF NO:TARGET == 0\n    MONEY -= 5000\n\tEX_FLAG:4444 -= 5000'),
        ],
      },
      { src: ABLUP12, ref: '66', any: [lit('	PRINTL 花费金钱5000点。')] },
      { src: ABLUP12, ref: '69-70', any: [lit('IF RESULT == 0')] },
      {
        src: ABLUP12,
        ref: '73',
        any: [lit('PRINTFORML %ABLNAME:12%变为LV{ABL:12}。')],
      },
      // —— ablup13 ↔ ABLUP13.ERB（issue #465）——
      { src: ABLUP13, ref: '9-69', any: [lit('@ABLUP13')] },
      { src: ABLUP13, ref: '86-269', any: [lit('@DECIDE_ABLUP13')] },
      {
        src: ABLUP13,
        ref: '261-263',
        any: [lit(';Lv5からは侍奉精神が侍奉技术+1Lvでないといけない')],
      },
      {
        src: ABLUP13,
        ref: '259-260',
        any: [lit('SIF ABL:13 < 5 && ABL:12 < ABL:13 + 1')],
      },
      { src: ABLUP13, ref: '12', any: [whole_line('DRAWLINE')] },
      { src: ABLUP13, ref: '18-19', any: [lit('	PRINTW 已达最高级')] },
      { src: ABLUP13, ref: '23-24', any: [lit('	SIF ABL:13 < ABL:14')] },
      {
        src: ABLUP13,
        ref: '26',
        any: [lit('	PRINTFORML 侍奉技术({ABL:13})＋性交技术({ABL:14})上限为10')],
      },
      {
        src: ABLUP13,
        ref: '27',
        any: [
          lit(
            '	PRINTFORMW %PALAMNAME:7%点数至少达到{TEMP * TEMP * 500}点、方可突破技术等级限制',
          ),
        ],
      },
      { src: ABLUP13, ref: '102-122', any: [lit('IF ABL:13 == 0')] },
      { src: ABLUP13, ref: '124-125', any: [lit('SIF ABL:13 + ABL:14 >= 10')] },
      { src: ABLUP13, ref: '128-137', any: [lit('IF TALENT:27')] },
      { src: ABLUP13, ref: '143-146', any: [lit(';坦率')] },
      { src: ABLUP13, ref: '160-163', any: [lit(';冷漠')] },
      { src: ABLUP13, ref: '164-167', any: [lit(';感情淡薄')] },
      { src: ABLUP13, ref: '168-171', any: [lit(';好奇心')] },
      { src: ABLUP13, ref: '172-175', any: [lit(';保守的')] },
      { src: ABLUP13, ref: '177-179', any: [lit(';压抑')] },
      { src: ABLUP13, ref: '180-183', any: [lit(';开放')] },
      { src: ABLUP13, ref: '185-188', any: [lit(';抵抗')] },
      { src: ABLUP13, ref: '190-192', any: [lit(';害羞')] },
      { src: ABLUP13, ref: '193-196', any: [lit(';不知羞耻')] },
      { src: ABLUP13, ref: '198-201', any: [lit(';把柄')] },
      { src: ABLUP13, ref: '203-206', any: [lit(';快速学习')] },
      { src: ABLUP13, ref: '211-214', any: [lit(';擅用舌头')] },
      { src: ABLUP13, ref: '215-218', any: [lit(';献身的')] },
      { src: ABLUP13, ref: '219-222', any: [lit(';不怕脏')] },
      { src: ABLUP13, ref: '223-226', any: [lit(';容易陷落')] },
      { src: ABLUP13, ref: '228-231', any: [lit(';倒錯的')] },
      { src: ABLUP13, ref: '232-235', any: [lit(';施虐狂')] },
      {
        src: ABLUP13,
        ref: '237-248',
        any: [lit(';侍奉精神\nIF ABL:16 < 3')],
      },
      { src: ABLUP13, ref: '250-252', any: [lit(';最低でも1個は必要')] },
      { src: ABLUP13, ref: '254-256', any: [lit(';习得点数は足りている？')] },
      {
        src: ABLUP13,
        ref: '258-260',
        any: [lit(';Lv5までは技巧が侍奉技术+1Lvでないといけない')],
      },
      {
        src: ABLUP13,
        ref: '262-263',
        any: [lit(';SIF ABL:13 >= 5 && ABL:16 < ABL:13 + 1')],
      },
      {
        src: ABLUP13,
        ref: '42-43',
        any: [
          lit(
            'SIF ABL:13 < 5\n\tPRINTFORML %ABLNAME:12%LV{ABL:13 + 1}以上(现在LV{ABL:12})且',
          ),
        ],
      },
      {
        src: ABLUP13,
        ref: '48-50',
        any: [lit('PRINTFORM [0] - %PALAMNAME:7%点数×{JUEL:7}/{A} ……')],
      },
      { src: ABLUP13, ref: '64-65', any: [lit('SIF RESULT == 0')] },
      {
        src: ABLUP13,
        ref: '67',
        any: [lit('PRINTFORML %ABLNAME:13%变为LV{ABL:13}。')],
      },
      // —— ablup14 ↔ ABLUP14.ERB（issue #465）——
      { src: ABLUP14, ref: '9-70', any: [lit('@ABLUP14')] },
      { src: ABLUP14, ref: '87-264', any: [lit('@DECIDE_ABLUP14')] },
      {
        src: ABLUP14,
        ref: '257-258',
        any: [lit('SIF ABL:12 < 5 && ABL:12 < ABL:14 + 1')],
      },
      { src: ABLUP14, ref: '101-131', any: [lit('IF ABL:14 == 0')] },
      {
        src: ABLUP14,
        ref: '133-134',
        any: [lit('SIF ABL:13 + ABL:14 >= 10\n\tA = TEMP * TEMP * 500')],
      },
      { src: ABLUP14, ref: '137-151', any: [lit('IF TALENT:27')] },
      { src: ABLUP14, ref: '154-157', any: [lit('IF TALENT:13')] },
      { src: ABLUP14, ref: '159-162', any: [lit('IF TALENT:21')] },
      { src: ABLUP14, ref: '169-172', any: [lit('IF TALENT:23')] },
      { src: ABLUP14, ref: '174-177', any: [lit('IF TALENT:24')] },
      { src: ABLUP14, ref: '184-187', any: [lit('ELSEIF TALENT:33')] },
      { src: ABLUP14, ref: '190-193', any: [lit('IF TALENT:34')] },
      { src: ABLUP14, ref: '196-199', any: [lit('IF TALENT:35')] },
      { src: ABLUP14, ref: '200-203', any: [lit('ELSEIF TALENT:36')] },
      { src: ABLUP14, ref: '206-209', any: [lit('IF TALENT:50')] },
      { src: ABLUP14, ref: '210-213', any: [lit('ELSEIF TALENT:51')] },
      { src: ABLUP14, ref: '216-219', any: [lit('IF TALENT:63')] },
      { src: ABLUP14, ref: '221-224', any: [lit('IF TALENT:64')] },
      { src: ABLUP14, ref: '227-242', any: [lit('IF ABL:30 < 3')] },
      { src: ABLUP14, ref: '245-246', any: [lit('SIF A < 1')] },
      { src: ABLUP14, ref: '247-248', any: [lit('SIF B < 1')] },
      { src: ABLUP14, ref: '253-255', any: [lit(';性交经验が必要')] },
      { src: ABLUP14, ref: '256-258', any: [lit(';Lv4までは技巧が必要')] },
      {
        src: ABLUP14,
        ref: '47-49',
        any: [lit('PRINTFORM [0] - %PALAMNAME:7%点数×{JUEL:7}/{A} ……')],
      },
      { src: ABLUP14, ref: '54', any: [lit('INPUT')] },
      {
        src: ABLUP14,
        ref: '57-58',
        any: [lit('ELSEIF I != 0 && RESULT == 0')],
      },
      { src: ABLUP14, ref: '64', any: [lit('ABL:14 += 1')] },
      {
        src: ABLUP14,
        ref: '68',
        any: [lit('PRINTFORML %ABLNAME:14%变为LV{ABL:14}。')],
      },
      // —— ablup15 ↔ ABLUP15.ERB（issue #465）——
      { src: ABLUP15, ref: '9-68', any: [lit('@ABLUP15')] },
      { src: ABLUP15, ref: '85-304', any: [lit('@DECIDE_ABLUP15')] },
      // 审查修复新增引用：组合上限提前 RETURN 后 DECIDE 从未赋值（issue #14）
      {
        src: ABLUP15,
        ref: '30-38',
        any: [lit('A = 0\n;必要な调教会话经验\nB = 0\n;必要な卖淫经验\nC = 0')],
      },
      {
        src: ABLUP15,
        ref: '93-96',
        any: [lit('A = 0\nB = 0\nC = 0\nI = 0')],
      },
      { src: ABLUP15, ref: '10', any: [whole_line('DRAWLINE')] },
      { src: ABLUP15, ref: '16-17', any: [lit('	PRINTW 已达最高级')] },
      {
        src: ABLUP15,
        ref: '22',
        any: [lit('	PRINTFORMW 技巧({ABL:12})＋话术({ABL:15})上限为15')],
      },
      { src: ABLUP15, ref: '98-138', any: [lit('IF ABL:15 == 0')] },
      { src: ABLUP15, ref: '140-159', any: [lit(';戒备森严')] },
      { src: ABLUP15, ref: '162-166', any: [lit('IF TALENT:11')] },
      { src: ABLUP15, ref: '168-172', any: [lit('IF TALENT:13')] },
      { src: ABLUP15, ref: '174-178', any: [lit('IF TALENT:16')] },
      { src: ABLUP15, ref: '180-184', any: [lit('IF TALENT:15')] },
      { src: ABLUP15, ref: '186-190', any: [lit('IF TALENT:21')] },
      { src: ABLUP15, ref: '192-196', any: [lit('IF TALENT:22')] },
      { src: ABLUP15, ref: '198-202', any: [lit('IF TALENT:23')] },
      { src: ABLUP15, ref: '205-209', any: [lit('IF TALENT:25')] },
      { src: ABLUP15, ref: '210-214', any: [lit('ELSEIF TALENT:26')] },
      { src: ABLUP15, ref: '217-221', any: [lit('IF TALENT:28')] },
      { src: ABLUP15, ref: '224-228', any: [lit('IF TALENT:32')] },
      { src: ABLUP15, ref: '229-233', any: [lit('ELSEIF TALENT:33')] },
      { src: ABLUP15, ref: '236-240', any: [lit('IF TALENT:34')] },
      { src: ABLUP15, ref: '243-247', any: [lit('IF TALENT:35')] },
      { src: ABLUP15, ref: '248-252', any: [lit('ELSEIF TALENT:36')] },
      { src: ABLUP15, ref: '255-259', any: [lit('IF TALENT:50')] },
      { src: ABLUP15, ref: '260-264', any: [lit('ELSEIF TALENT:51')] },
      { src: ABLUP15, ref: '267-271', any: [lit('IF TALENT:92')] },
      { src: ABLUP15, ref: '273-277', any: [lit('IF TALENT:87')] },
      { src: ABLUP15, ref: '279-283', any: [lit('IF TALENT:182')] },
      { src: ABLUP15, ref: '286-287', any: [lit('SIF A < 1')] },
      { src: ABLUP15, ref: '288-289', any: [lit('SIF B < 1')] },
      { src: ABLUP15, ref: '290-291', any: [lit('SIF C < 1')] },
      { src: ABLUP15, ref: '293-295', any: [lit(';习得点数は足りている？')] },
      {
        src: ABLUP15,
        ref: '296-298',
        any: [lit(';调教会话经验か卖淫经验は足りている？')],
      },
      {
        src: ABLUP15,
        ref: '42-44',
        any: [lit('PRINTFORM [0] - %PALAMNAME:7%点数×{JUEL:7}/{A} ……')],
      },
      {
        src: ABLUP15,
        ref: '45',
        any: [lit('PRINTFORML       %EXPNAME:73%　{EXP:73}/{B} or')],
      },
      {
        src: ABLUP15,
        ref: '46',
        any: [lit('PRINTFORML       %EXPNAME:74%　{EXP:74}/{C}')],
      },
      { src: ABLUP15, ref: '48', any: [lit('PRINTL [100] - 停止')] },
      {
        src: ABLUP15,
        ref: '53-54',
        any: [lit('ELSEIF I != 0 && RESULT == 0')],
      },
      { src: ABLUP15, ref: '60', any: [lit('ABL:15 += 1')] },
      { src: ABLUP15, ref: '62-63', any: [lit('IF RESULT == 0')] },
      // —— ablup16 ↔ ABLUP16.ERB（issue #465）——
      { src: ABLUP16, ref: '9-115', any: [lit('@ABLUP16')] },
      { src: ABLUP16, ref: '136-533', any: [lit('@DECIDE_ABLUP16')] },
      // 审查修复新增引用：DECIDE_ABLUP16 在 ABL.ERB 的另两个调用点之一
      // （@SHOW_ABLUP_SELECT 的"*"标记；:78 已由 ABLUP10 的 ref '78' 覆盖）
      { src: ABL, ref: '146', any: [lit('CALL DECIDE_ABLUP16')] },
      {
        src: ABLUP16,
        ref: '16',
        any: [
          lit(
            'IF ABL:16 >= 5 && (TALENT:63 == 0 || TALENT:85 == 0 || TALENT:86 == 0)',
          ),
        ],
      },
      {
        src: ABLUP16,
        ref: '139',
        any: [
          lit(
            'SIF ABL:16 >= 5 && (TALENT:63 == 0 && TALENT:85 == 0 && TALENT:86 == 0)',
          ),
        ],
      },
      {
        src: ABLUP16,
        ref: '16-18',
        any: [
          lit(
            'IF ABL:16 >= 5 && (TALENT:63 == 0 || TALENT:85 == 0 || TALENT:86 == 0)',
          ),
        ],
      },
      { src: ABLUP16, ref: '19-21', any: [lit('ELSEIF ABL:16 >= 10')] },
      { src: ABLUP16, ref: '156-216', any: [lit('IF ABL:16 == 0')] },
      { src: ABLUP16, ref: '219-241', any: [lit('IF TALENT:27')] },
      {
        src: ABLUP16,
        ref: '243-246',
        any: [
          lit(
            ';ＬＶ３以上に上げるときは异常经验必要（素質：[献身的][爱慕][盲从]なら無視できる）',
          ),
        ],
      },
      { src: ABLUP16, ref: '249-254', any: [lit('IF TALENT:11')] },
      {
        src: ABLUP16,
        ref: '257-260',
        any: [lit('IF TALENT:12\n\tTIMES A , 1.20\n\tTIMES D , 1.20')],
      },
      { src: ABLUP16, ref: '263-268', any: [lit('IF TALENT:13')] },
      { src: ABLUP16, ref: '271-274', any: [lit('IF TALENT:16')] },
      { src: ABLUP16, ref: '277-282', any: [lit('IF TALENT:15')] },
      { src: ABLUP16, ref: '283-288', any: [lit('ELSEIF TALENT:17')] },
      { src: ABLUP16, ref: '291-296', any: [lit('IF TALENT:20')] },
      { src: ABLUP16, ref: '299-304', any: [lit('IF TALENT:21')] },
      { src: ABLUP16, ref: '307-312', any: [lit('IF TALENT:22')] },
      { src: ABLUP16, ref: '315-321', any: [lit('IF TALENT:24')] },
      { src: ABLUP16, ref: '324-329', any: [lit('IF TALENT:25')] },
      { src: ABLUP16, ref: '330-335', any: [lit('ELSEIF TALENT:26')] },
      { src: ABLUP16, ref: '338-343', any: [lit('IF TALENT:28')] },
      { src: ABLUP16, ref: '346-351', any: [lit('IF TALENT:32')] },
      { src: ABLUP16, ref: '352-357', any: [lit('ELSEIF TALENT:33')] },
      { src: ABLUP16, ref: '360-366', any: [lit('IF TALENT:34')] },
      { src: ABLUP16, ref: '369-375', any: [lit('IF TALENT:37')] },
      { src: ABLUP16, ref: '378-379', any: [lit('SIF TALENT:50')] },
      { src: ABLUP16, ref: '382-383', any: [lit('SIF TALENT:51')] },
      { src: ABLUP16, ref: '386-387', any: [lit('SIF TALENT:52')] },
      { src: ABLUP16, ref: '390-395', any: [lit('IF TALENT:63')] },
      { src: ABLUP16, ref: '398-400', any: [lit('IF TALENT:70')] },
      { src: ABLUP16, ref: '401-403', any: [lit('ELSEIF TALENT:71')] },
      { src: ABLUP16, ref: '406-411', any: [lit('IF TALENT:73')] },
      { src: ABLUP16, ref: '414-420', any: [lit('IF TALENT:80')] },
      { src: ABLUP16, ref: '423-427', any: [lit('IF TALENT:83')] },
      { src: ABLUP16, ref: '430-435', any: [lit('IF TALENT:85')] },
      { src: ABLUP16, ref: '438-444', any: [lit('IF TALENT:86')] },
      { src: ABLUP16, ref: '447-452', any: [lit('IF TALENT:87')] },
      { src: ABLUP16, ref: '455-461', any: [lit('IF TALENT:123')] },
      { src: ABLUP16, ref: '464-470', any: [lit('IF TALENT:9')] },
      { src: ABLUP16, ref: '473-474', any: [lit('SIF A < 1')] },
      { src: ABLUP16, ref: '475-476', any: [lit('SIF B < 1')] },
      { src: ABLUP16, ref: '477-478', any: [lit('SIF D < 1')] },
      { src: ABLUP16, ref: '479-480', any: [lit('SIF E < 1')] },
      { src: ABLUP16, ref: '483-484', any: [lit('SIF JUEL:6 < A')] },
      { src: ABLUP16, ref: '487-489', any: [lit('IF B > 0')] },
      {
        src: ABLUP16,
        ref: '490-492',
        any: [lit('	;この場合侍奉快乐经验が必要なことあり')],
      },
      { src: ABLUP16, ref: '493-495', any: [lit('ELSE\nJ = 256')] },
      { src: ABLUP16, ref: '498-500', any: [lit('IF C > 0')] },
      {
        src: ABLUP16,
        ref: '501-503',
        any: [lit('	;この場合绝顶经验が１以上必要')],
      },
      { src: ABLUP16, ref: '504-506', any: [lit('ELSE\nK = 256')] },
      { src: ABLUP16, ref: '508-510', any: [lit(';绝顶经验が必要な場合')] },
      { src: ABLUP16, ref: '511-513', any: [lit(';精液经验が必要な場合')] },
      {
        src: ABLUP16,
        ref: '515-520',
        any: [lit(';顺从が侍奉精神＋１レベルでないと能力不足')],
      },
      { src: ABLUP16, ref: '522-527', any: [lit(';异常经验が不足')] },
      { src: ABLUP16, ref: '51-52', any: [lit('SIF F > 0')] },
      {
        src: ABLUP16,
        ref: '55-57',
        any: [lit('PRINTFORM [0] - %PALAMNAME:6%点数×{JUEL:6}/{A} ……')],
      },
      {
        src: ABLUP16,
        ref: '59',
        any: [lit('	PRINTFORML 　　　%EXPNAME:2%　{EXP:2}/{E}')],
      },
      {
        src: ABLUP16,
        ref: '65-67',
        any: [lit('	PRINTFORM [1] - %PALAMNAME:4%点数×{JUEL:4}/{B} ……')],
      },
      {
        src: ABLUP16,
        ref: '74-76',
        any: [lit('	PRINTFORM [2] - %PALAMNAME:7%点数×{JUEL:7}/{C} ……')],
      },
      {
        src: ABLUP16,
        ref: '77',
        any: [lit('	PRINTFORML 　　　%EXPNAME:2%　{EXP:2}/1')],
      },
      { src: ABLUP16, ref: '80', any: [lit('PRINTL [100] - 停止')] },
      { src: ABLUP16, ref: '83', any: [whole_line('INPUT')] },
      {
        src: ABLUP16,
        ref: '86-87',
        any: [lit('ELSEIF I != 0 && RESULT == 0')],
      },
      {
        src: ABLUP16,
        ref: '91-92',
        any: [lit('ELSEIF J != 0 && RESULT == 1')],
      },
      {
        src: ABLUP16,
        ref: '96-97',
        any: [lit('ELSEIF K != 0 && RESULT == 2')],
      },
      { src: ABLUP16, ref: '103', any: [lit('ABL:16 += 1')] },
      // —— ablup17 ↔ ABLUP17.ERB（issue #465）——
      { src: ABLUP17, ref: '9-83', any: [lit('@ABLUP17')] },
      { src: ABLUP17, ref: '99-282', any: [lit('@DECIDE_ABLUP17')] },
      { src: ABLUP17, ref: '106-109', any: [lit('A = 0')] },
      // 审查修复新增引用：C/D 并非恒 0——各自等级分支里赋值一次（issue #14 结论修正）
      {
        src: ABLUP17,
        ref: '113-115',
        any: [lit('IF ABL:17 == 0\nA = 100\nC = 1')],
      },
      { src: ABLUP17, ref: '115', any: [lit('C = 1')] },
      {
        src: ABLUP17,
        ref: '116-118',
        any: [lit('ELSEIF ABL:17 == 1\nA = 1000\nD = 1')],
      },
      { src: ABLUP17, ref: '60-61', any: [lit('SIF D > 0')] },
      { src: ABLUP17, ref: '268-269', any: [lit('SIF EXP:2 < C')] },
      { src: ABLUP17, ref: '271-272', any: [lit('SIF EXP:11 < D')] },
      { src: ABLUP17, ref: '113-135', any: [lit('IF ABL:17 == 0')] },
      { src: ABLUP17, ref: '138-147', any: [lit('IF TALENT:27')] },
      {
        src: ABLUP17,
        ref: '149-152',
        any: [
          lit(
            ';ＬＶ３以上に上げるときは异常经验必要（素質：[爱表现][开放][淫乱][倒錯的][受虐狂][疯狂]なら無視できる）',
          ),
        ],
      },
      { src: ABLUP17, ref: '154-156', any: [lit(';崩坏')] },
      { src: ABLUP17, ref: '157-159', any: [lit(';胆怯')] },
      { src: ABLUP17, ref: '163-165', any: [lit(';刚强')] },
      { src: ABLUP17, ref: '166-168', any: [lit(';嚣张')] },
      { src: ABLUP17, ref: '169-171', any: [lit(';克制')] },
      { src: ABLUP17, ref: '175-177', any: [lit(';感情淡薄')] },
      { src: ABLUP17, ref: '191-194', any: [lit(';开放')] },
      { src: ABLUP17, ref: '196-198', any: [lit(';抵抗')] },
      { src: ABLUP17, ref: '200-202', any: [lit(';害羞')] },
      { src: ABLUP17, ref: '208-210', any: [lit(';把柄')] },
      { src: ABLUP17, ref: '212-214', any: [lit(';容易自慰')] },
      { src: ABLUP17, ref: '216-218', any: [lit(';接受快感')] },
      { src: ABLUP17, ref: '224-226', any: [lit(';容易上瘾')] },
      { src: ABLUP17, ref: '227-229', any: [lit(';容易陷落')] },
      { src: ABLUP17, ref: '230-232', any: [lit(';淫乱')] },
      { src: ABLUP17, ref: '233-235', any: [lit(';倒錯的')] },
      { src: ABLUP17, ref: '236-238', any: [lit(';施虐狂')] },
      { src: ABLUP17, ref: '239-241', any: [lit(';受虐狂')] },
      { src: ABLUP17, ref: '242-244', any: [lit(';疯狂')] },
      {
        src: ABLUP17,
        ref: '246-258',
        any: [
          lit(';欲望が露出癖＋１レベルでないといけない（[爱慕]がない場合）'),
        ],
      },
      { src: ABLUP17, ref: '260-262', any: [lit(';最低でも1個は必要')] },
      { src: ABLUP17, ref: '264-266', any: [lit(';异常经验が不足')] },
      { src: ABLUP17, ref: '267-269', any: [lit(';绝顶经验が不足')] },
      { src: ABLUP17, ref: '270-272', any: [lit(';调教自慰经验が不足')] },
      { src: ABLUP17, ref: '274-276', any: [lit(';耻情点数は足りている？')] },
      { src: ABLUP17, ref: '50-51', any: [lit('SIF B > 0')] },
      {
        src: ABLUP17,
        ref: '53-55',
        any: [lit('PRINTFORM [0] - %PALAMNAME:8%点数×{JUEL:8}/{A} ……')],
      },
      { src: ABLUP17, ref: '65', any: [lit('INPUT')] },
      {
        src: ABLUP17,
        ref: '68-69',
        any: [lit('ELSEIF I != 0 && RESULT == 0')],
      },
      { src: ABLUP17, ref: '75', any: [lit('ABL:17 += 1')] },
      { src: ABLUP17, ref: '77-78', any: [lit('IF RESULT == 0')] },
      {
        src: ABLUP17,
        ref: '81',
        any: [lit('PRINTFORML %ABLNAME:17%变为LV{ABL:17}。')],
      },

      // —— ABL.ERB 本体：@DECIDE_ABLUP 分发 / @USERABLUP / @AUTO_ABLUP
      //    （issue #467；标记渲染侧在 page-ablup.mjs）——
      { src: ABL, ref: '113-189', any: [lit('@DECIDE_ABLUP\n;阴蒂感觉')] },
      { src: ABL, ref: '192-200', any: [lit('@USERABLUP\nIF RESULT == 999')] },
      {
        src: ABL,
        ref: '193-195',
        any: [lit('CALL JUJUN_UP_CHECK\nCALL YOKUBO_UP_CHECK')],
      },
      { src: ABL, ref: '203-241', any: [lit('@AUTO_ABLUP, ARG = -1')] },
      {
        src: ABL,
        ref: '230-232',
        any: [lit('SIF COUNT == 37 && 卖淫影响 == 0')],
      },
      {
        src: ABL,
        ref: '233-235',
        any: [lit('SIF COUNT > 15 && GETBIT(FLAG:5,36)')],
      },
      { src: ABL, ref: '247-267', any: [lit('@AUTO_ABLUP_CORE, NUM, INFO')] },
      { src: ABL, ref: '256', any: [lit('TRYCALLFORM DECIDE_ABLUP{NUM}')] },
      {
        src: ABL,
        ref: '264-265',
        any: [lit('SIF RESULT >= 0 && INFO')],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
