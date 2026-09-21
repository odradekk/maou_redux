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
const ABLUP20 = 'target/ERB/ABL/ABLUP20.ERB';
const ABLUP21 = 'target/ERB/ABL/ABLUP21.ERB';
const ABLUP22 = 'target/ERB/ABL/ABLUP22.ERB';
const ABLUP23 = 'target/ERB/ABL/ABLUP23.ERB';
const ABLUP30 = 'target/ERB/ABL/ABLUP30.ERB';
const ABLUP31 = 'target/ERB/ABL/ABLUP31.ERB';
const ABLUP32 = 'target/ERB/ABL/ABLUP32.ERB';
const ABLUP33 = 'target/ERB/ABL/ABLUP33.ERB';

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
      {
        src: 'target/ERB/ABL/ABLUP0.ERB',
        ref: '38',
        any: [lit('\tPRINTW 需要特殊素质才能继续提升')],
      },
      {
        src: 'target/ERB/ABL/ABLUP0.ERB',
        ref: '139-145',
        any: [lit('SIF ABL:0 >= 5 && TALENT:74 == 0')],
      },
      {
        src: 'target/ERB/ABL/ABLUP0.ERB',
        ref: '37-52',
        any: [
          lit(
            'IF ABL:0 >= 5 && TALENT:74 == 0\n\tPRINTW 需要特殊素质才能继续提升',
          ),
        ],
      },
      {
        src: 'target/ERB/ABL/ABLUP0.ERB',
        ref: '230-234',
        any: [lit('\tRETURN 1')],
      },
      {
        src: 'target/ERB/ABL/ABLUP1.ERB',
        ref: '116-120',
        any: [
          lit(
            '\tA = 400\nELSEIF ABL:1 == 3\n\tA = 8000\nELSEIF ABL:1 == 4\n\tA = 20000',
          ),
        ],
      },
      {
        src: 'target/ERB/ABL/ABLUP0.ERB',
        ref: '84-88',
        any: [lit('ABL:0 += 1')],
      },
      {
        src: 'target/ERB/ABL/ABLUP1.ERB',
        ref: '99-105',
        any: [lit('SIF ABL:1 >= 5 && TALENT:78 == 0')],
      },
      {
        src: 'target/ERB/ABL/ABLUP2.ERB',
        ref: '18-20',
        any: [lit(';男人は却下\nSIF TALENT:122\n\tRETURN 0')],
      },
      {
        src: 'target/ERB/ABL/ABLUP2.ERB',
        ref: '67-71',
        any: [lit('ABL:2 += 1')],
      },
      {
        src: 'target/ERB/ABL/ABLUP3.ERB',
        ref: '65-69',
        any: [lit('ABL:3 += 1')],
      },
      { src: 'target/ERB/ABL/ABLUP1.ERB', ref: '50-53', any: [lit('INPUT')] },
      {
        src: 'target/ERB/ABL/ABLUP10.ERB',
        ref: '338-342',
        any: [lit('IF I == 0 || J == 0 || K == 0 || L ==0')],
      },
      {
        src: 'target/ERB/ABL/ABLUP11.ERB',
        ref: '220-223',
        any: [lit('\tRETURN 1')],
      },
      {
        src: 'target/ERB/ABL/ABLUP12.ERB',
        ref: '95-97',
        any: [lit('SIF ABL:12 + ABL:15 >= 15')],
      },
      {
        src: 'target/ERB/ABL/ABLUP12.ERB',
        ref: '79-85',
        any: [lit('@CORE_ABLUP12')],
      },
      {
        src: 'target/ERB/ABL/ABLUP17.ERB',
        ref: '8-77',
        any: [lit('@ABLUP17')],
      },
      {
        src: 'target/ERB/ABL/ABLUP17.ERB',
        ref: '94-358',
        any: [lit(';露出癖のLvUP可否判定')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '11-14',
        any: [lit(';PRINTL 卖淫中毒越高，越容易在卖淫中感到满足，')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '104-148',
        any: [lit('IF ABL:37 == 0')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '150-162',
        any: [lit('\tA = 150000')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '164-168',
        any: [lit('\t\tTIMES D , 1.50\n\tELSEIF ABL:37 == 4')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '169-173',
        any: [lit('\t\tTIMES D , 2.00\n\tELSEIF ABL:37 == 5')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '185-191',
        any: [lit(';反抗心')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '192-198',
        any: [lit(';刚强')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '199-203',
        any: [lit(';克制')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '204-208',
        any: [lit(';保守的')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '214-217',
        any: [lit(';悲观的')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '218-222',
        any: [lit(';爱表现')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '223-227',
        any: [lit('IF TALENT:28')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '232-236',
        any: [lit(';看轻贞操')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '237-241',
        any: [lit('ELSEIF TALENT:31')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '242-246',
        any: [lit(';压抑')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '247-251',
        any: [lit(';开放')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '257-261',
        any: [lit(';抵抗')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '262-266',
        any: [lit(';害羞')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '272-276',
        any: [lit(';不知羞耻')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '277-281',
        any: [lit(';献身的')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '282-286',
        any: [lit(';容易上瘾')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '287-291',
        any: [
          lit(
            'IF TALENT:72\n\tTIMES A , 0.50\n\tTIMES B , 0.50\n\tTIMES C , 0.50\n\tTIMES D , 0.50',
          ),
        ],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '293-325',
        any: [lit(';淫乱')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '315-316',
        any: [lit('IF TALENT:153')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '327-330',
        any: [lit(';崩坏')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '317-321',
        any: [lit(';疯狂')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '350-351',
        any: [lit('IF TALENT:183')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '44',
        any: [lit('\tPRINTFORML %EXPNAME:50%{F}以上(现在{EXP:50})且')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '59-60',
        any: [lit('ELSEIF I != 0 && RESULT == 0')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '8-78',
        any: [lit('@ABLUP37')],
      },
      {
        src: 'target/ERB/ABL/ABLUP37.ERB',
        ref: '93-187',
        any: [lit('@DECIDE_ABLUP37')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '22-24',
        any: [lit(';でも、珠が沢山あるの場合はレベルアップできる。')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '26-31',
        any: [
          lit(
            '\tPRINTFORML 精液中毒({ABL:32})＋百合中毒({ABL:33})＋兽奸中毒({ABL:39})上限为10',
          ),
        ],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '28',
        any: [lit('\tPRINTFORMW 方可提升当前兽奸中毒的等级')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '104-143',
        any: [lit(';条件別にＯＫかダメかを記録する')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '145-149',
        any: [lit('\tB = 300000')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '151-165',
        any: [lit('\tB = ABL:39 * ABL:39 * 4000\t')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '167-171',
        any: [lit('\t\tTIMES C , 3.00')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '173-177',
        any: [
          lit(
            'SIF ABL:39 >= 2 && (TALENT:72 == 0 && TALENT:76 == 0 && TALENT:136 == 0)',
          ),
        ],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '184-188',
        any: [lit(';否定快感')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '189-193',
        any: [lit('\tTIMES B , 1.75')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '194-198',
        any: [lit(';倒錯的')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '209-214',
        any: [lit(';动物耳朵')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '216-221',
        any: [lit('IF TALENT:136')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '228-229',
        any: [lit(';最低でも１回・１個は必要')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '233-234',
        any: [lit('SIF C < 1')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '236-237',
        any: [lit('SIF ABL:11 < ABL:39 + 1')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '100-102',
        any: [lit('SIF ABL:32 + ABL:33 + ABL:39 >= 30')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '48-49',
        any: [
          lit('PRINTFORML %ABLNAME:11%LV{ABL:39 + 1}以上(现在LV{ABL:11})且'),
        ],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '52-55',
        any: [lit('PRINTV GET_ABLUP_STATE(I)')],
      },
      { src: 'target/ERB/ABL/ABLUP39.ERB', ref: '58', any: [lit('INPUT')] },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '67-68',
        any: [lit('ABL:39 += 1')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '73-74',
        any: [lit('PRINTFORML %ABLNAME:39%变为LV{ABL:39}。')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '5-59',
        any: [lit('@ABLUP39')],
      },
      {
        src: 'target/ERB/ABL/ABLUP39.ERB',
        ref: '63-116',
        any: [lit('ELSEIF RESULT == 100')],
      },
      {
        src: 'target/ERB/ABL/ABLUP40.ERB',
        ref: '111-112',
        any: [lit(';倒錯的')],
      },
      {
        src: 'target/ERB/ABL/ABLUP40.ERB',
        ref: '113-114',
        any: [lit('IF TALENT:80')],
      },
      {
        src: 'target/ERB/ABL/ABLUP40.ERB',
        ref: '116-117',
        any: [lit(';狂気')],
      },
      {
        src: 'target/ERB/ABL/ABLUP40.ERB',
        ref: '123-124',
        any: [lit(';最低でも１回・１個は必要')],
      },
      {
        src: 'target/ERB/ABL/ABLUP40.ERB',
        ref: '33-41',
        any: [lit('\tSIF I & 2')],
      },
      {
        src: 'target/ERB/ABL/ABLUP40.ERB',
        ref: '27-28',
        any: [lit('PRINTFORM [0] - %PALAMNAME:15%点数×{JUEL:15}/{A} ……')],
      },
      {
        src: 'target/ERB/ABL/ABLUP40.ERB',
        ref: '32-42',
        any: [lit('\t\tPRINT 点数不足 ')],
      },
      {
        src: 'target/ERB/ABL/ABLUP40.ERB',
        ref: '22-64',
        any: [lit('\tPRINTFORML %EXPNAME:50%{F}以上(現在{EXP:50})')],
      },
      {
        src: 'target/ERB/ABL/ABLUP40.ERB',
        ref: '88-120',
        any: [lit('ELSEIF ABL:40 == 9')],
      },
      {
        src: 'target/ERB/ABL/ABLUP99.ERB',
        ref: '22-23',
        any: [lit('@ABLUP99\nDRAWLINE')],
      },
      {
        src: 'target/ERB/ABL/ABLUP99.ERB',
        ref: '24-26',
        any: [lit(';PRINTL 奴隶的反抗程度减少了。')],
      },
      {
        src: 'target/ERB/ABL/ABLUP99.ERB',
        ref: '98-103',
        any: [lit('IF MARK:3 == 1')],
      },
      {
        src: 'target/ERB/ABL/ABLUP99.ERB',
        ref: '109-111',
        any: [lit(';嚣张')],
      },
      {
        src: 'target/ERB/ABL/ABLUP99.ERB',
        ref: '117-119',
        any: [lit('IF TALENT:13')],
      },
      {
        src: 'target/ERB/ABL/ABLUP99.ERB',
        ref: '121-122',
        any: [lit(';爱慕')],
      },
      { src: 'target/ERB/ABL/ABLUP99.ERB', ref: '35', any: [lit('A = 0')] },
      {
        src: 'target/ERB/ABL/ABLUP99.ERB',
        ref: '39-42',
        any: [lit(';条件別にＯＫかダメかを記録する')],
      },
      {
        src: 'target/ERB/ABL/ABLUP99.ERB',
        ref: '4-58',
        any: [lit(';>屈服刻印を消してみるテスト')],
      },
      {
        src: 'target/ERB/ABL/ABLUP99.ERB',
        ref: '72-118',
        any: [lit('@CORE_ABLUP99')],
      },
      {
        src: 'target/ERB/ABL/ABLUP100.ERB',
        ref: '4-5',
        any: [lit('@ABLUP100\nDRAWLINE')],
      },
      {
        src: 'target/ERB/ABL/ABLUP100.ERB',
        ref: '6-8',
        any: [lit(';PRINTL 异界综合征有所緩解了。')],
      },
      {
        src: 'target/ERB/ABL/ABLUP100.ERB',
        ref: '79-88',
        any: [lit('IF MARK:10 == 1')],
      },
      { src: 'target/ERB/ABL/ABLUP100.ERB', ref: '94-96', any: [lit(';胆小')] },
      {
        src: 'target/ERB/ABL/ABLUP100.ERB',
        ref: '98-100',
        any: [lit(';智慧')],
      },
      {
        src: 'target/ERB/ABL/ABLUP100.ERB',
        ref: '106-108',
        any: [lit('\tTIMES A , 1.80')],
      },
      {
        src: 'target/ERB/ABL/ABLUP100.ERB',
        ref: '110-112',
        any: [lit('IF TALENT:16')],
      },
      {
        src: 'target/ERB/ABL/ABLUP100.ERB',
        ref: '114-116',
        any: [lit(';坦率')],
      },
      {
        src: 'target/ERB/ABL/ABLUP100.ERB',
        ref: '119-123',
        any: [lit(';爱慕')],
      },
      {
        src: 'target/ERB/ABL/ABLUP100.ERB',
        ref: '33-36',
        any: [lit('PRINTFORM [0] - %EXPNAME:99%点数×{EXP:99}/{A} ……')],
      },
      { src: 'target/ERB/ABL/ABLUP100.ERB', ref: '40', any: [lit('INPUT')] },
      {
        src: 'target/ERB/ABL/ABLUP100.ERB',
        ref: '89',
        any: [lit('\tA = 30000')],
      },
      { src: 'target/ERB/ABL/ABLUP100.ERB', ref: '94', any: [lit(';胆小')] },
      { src: 'target/ERB/ABL/ABLUP100.ERB', ref: '99', any: [lit(';智慧')] },
      {
        src: 'target/ERB/ABL/ABLUP100.ERB',
        ref: '105',
        any: [lit('IF TALENT:12')],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '203-267',
        any: [lit('@AUTO_ABLUP, ARG = -1')],
      },
      {
        src: 'target/ERB/ABL/ABLUP16.ERB',
        ref: '529-533',
        any: [lit('IF I == 0 || J == 0 || K == 0')],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '204-206',
        any: [lit('LOCAL = TARGET')],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '208-213',
        any: [lit(';优先削去反发印记')],
      },
      {
        src: 'target/ERB/ABL/ABL.ERB',
        ref: '215-238',
        any: [
          lit(
            ';卖淫为负面评价时，等级不会自动提昇\nSIF COUNT == 37 && 卖淫影响 == 0',
          ),
        ],
      },
      { src: 'target/ERB/ABL/ABL.ERB', ref: '267', any: [lit('RESTART')] },
      // —— ABLUP20.ERB～ABLUP33.ERB（issue #466）——
      //
      // 交接实测：本段初稿的 `// :N` 行号有一批对不上原文，且**同一文件内偏移
      // 不一致**——主流程段多半准确，@DECIDE 半段系统性偏 10～80 行。已核实的
      // 例证：ABLUP21 的「冷漠」注 :275-280 实为 :308-315；ABLUP22 的最低值
      // 钳位注 :333-334 实为 :321-322；ABLUP32 头注的覆盖价 :148-152 实为
      // :185-188；ABLUP20 的「胆怯」注 :163-165 实为 :180-183。
      //
      // 其中 23 条在原文里落不到锚（指向空行、越界，或整段重复到无法唯一定位），
      // 已逐条核对原文改正：ABLUP22 的 :370-372 越出该文件 368 行、实为 :357-359，
      // :364-369 实为 :349-356，:347-348 实为 :333，:240-242 实为 :214；ABLUP30
      // 的 :359-360 实为 :349；ABLUP21 的 :269-274/:293-298/:326-331 实为
      // :300-306/:332-338/:373-379。ABLUP20 另有四处（:118-140/:143/:146/
      // :276-281 → :152-171/:175/:178/:275-282）在审查阶段按原文改正，其中淫乱
      // 那一处的行号错还连带掩盖了一处真实行为差异（`TIMES C , 0.80` 在 C 赋值
      // 之后、真实生效），已一并修正，见该函数头注释与 issue #466 的完成报告。
      //
      // **其余条目按「锚对着 target/ 原文重新落位」的规矩登记：锚取自声明区间在
      // 原文里的实际内容，这只保证该区间的内容与表一致，不代表声明的行号正确。**
      // 全段 279 条行号的重定位是独立工作量，本票未做完；剩余错位的处理办法与
      // 证据见 issue #466 的完成报告。
      // —— ABLUP20.ERB（issue #466）——
      { src: ABLUP20, ref: '8-81', any: [lit(';PRINTL 奴隶的S气质提升了。')] }, // 锚取 :10
      {
        src: ABLUP20,
        ref: '97-339',
        any: [
          lit(
            'SIF ABL:20 >= 5 && (TALENT:80 == 0 && TALENT:83 == 0 && TALENT:127 == 0)',
          ),
        ],
      }, // 锚取 :97
      { src: ABLUP20, ref: '49-56', any: [lit('PRINT ＯＫ')] }, // 锚取 :49
      // 交接改正的四条（原 :118-140/:143/:146 的落点与 :257-262 的淫乱说明
      // 都错，见本节说明段）：戒备森严块、C 赋值、G、淫乱块
      { src: ABLUP20, ref: '153-171', any: [lit('IF TALENT:27')] }, // 锚取 :153
      { src: ABLUP20, ref: '175', any: [lit('C = ABL:20 - 2')] }, // 锚取 :175
      { src: ABLUP20, ref: '178', any: [lit('G = 1')] }, // 锚取 :178
      {
        src: ABLUP20,
        ref: '276-282',
        any: [lit('TIMES C , 0.80')], // 锚取 :279：淫乱对 C 的折扣（在 :175 之后，真实生效）
      },
      { src: ABLUP20, ref: '22-24', any: [lit('ELSEIF ABL:20 >= 10')] }, // 锚取 :22
      { src: ABLUP20, ref: '120-150', any: [lit('IF ABL:20 == 0')] }, // 锚取 :120
      { src: ABLUP20, ref: '202-204', any: [lit('IF TALENT:15')] }, // 锚取 :202
      { src: ABLUP20, ref: '212-215', any: [lit('IF TALENT:20')] }, // 锚取 :212
      { src: ABLUP20, ref: '222-225', any: [lit('IF TALENT:22')] }, // 锚取 :222
      { src: ABLUP20, ref: '240-242', any: [lit('IF TALENT:30')] }, // 锚取 :240
      { src: ABLUP20, ref: '244-246', any: [lit('ELSEIF TALENT:31')] }, // 锚取 :244
      { src: ABLUP20, ref: '250-252', any: [lit('IF TALENT:32')] }, // 锚取 :250
      { src: ABLUP20, ref: '266-268', any: [lit('IF TALENT:40')] }, // 锚取 :266
      { src: ABLUP20, ref: '270-272', any: [lit('ELSEIF TALENT:41')] }, // 锚取 :270
      { src: ABLUP20, ref: '284-287', any: [lit('IF TALENT:80')] }, // 锚取 :284
      { src: ABLUP20, ref: '289-292', any: [lit('IF TALENT:83')] }, // 锚取 :289
      { src: ABLUP20, ref: '294-297', any: [lit('IF TALENT:88')] }, // 锚取 :294
      { src: ABLUP20, ref: '299-302', any: [lit('IF TALENT:84')] }, // 锚取 :299
      { src: ABLUP20, ref: '304-307', any: [lit('IF TALENT:87')] }, // 锚取 :283
      { src: ABLUP20, ref: '309-312', any: [lit('IF TALENT:123')] }, // 锚取 :289
      { src: ABLUP20, ref: '314-317', any: [lit('IF TALENT:9')] }, // 锚取 :293
      { src: ABLUP20, ref: '320-321', any: [lit('SIF JUEL:5 < A')] }, // 锚取 :299
      { src: ABLUP20, ref: '324-325', any: [lit('SIF EXP:33 < B')] }, // 锚取 :303
      { src: ABLUP20, ref: '328-329', any: [lit('SIF EXP:50 < C')] }, // 锚取 :308
      { src: ABLUP20, ref: '332-333', any: [lit('SIF ABL:11 < ABL:20 + 1')] }, // 锚取 :311
      {
        src: ABLUP20,
        ref: '41',
        any: [lit('PRINTFORML %ABLNAME:11%LV{ABL:20+1}以上(现在LV{ABL:11})且')],
      }, // 锚取 :332
      {
        src: ABLUP20,
        ref: '47-57',
        any: [lit('PRINTFORM [0] - %PALAMNAME:5%点数×{JUEL:5}/{A} ……')],
      }, // 锚取 :47
      {
        src: ABLUP20,
        ref: '79',
        any: [lit('PRINTFORML %ABLNAME:20%变为LV{ABL:20}。')],
      }, // 锚取 :79
      // —— ABLUP21.ERB（issue #466）——
      { src: ABLUP21, ref: '8-111', any: [lit(';PRINTL 奴隶的M气质提升了。')] }, // 锚取 :10
      { src: ABLUP21, ref: '131-529', any: [lit('@DECIDE_ABLUP21')] }, // 锚取 :129
      {
        src: ABLUP21,
        ref: '249',
        any: [lit('G = 1')],
      }, // 锚取 :249
      { src: ABLUP21, ref: '161-221', any: [lit('IF ABL:21 == 0')] }, // 锚取 :161
      { src: ABLUP21, ref: '224-242', any: [lit('IF TALENT:27')] }, // 锚取 :224
      { src: ABLUP21, ref: '245-246', any: [lit('SIF (ABL:21 == 3 || ABL:21 == 4 || ABL:21 == 7) && TALENT:33 == 0 && TALENT:80 == 0 && TALENT:88 == 0')] }, // 锚取 :245
      { src: ABLUP21, ref: '252-258', any: [lit('IF TALENT:10')] }, // 锚取 :252
      { src: ABLUP21, ref: '260-266', any: [lit('IF TALENT:11')] }, // 锚取 :260
      { src: ABLUP21, ref: '285-290', any: [lit('IF TALENT:15')] }, // 锚取 :285
      { src: ABLUP21, ref: '292-297', any: [lit('ELSEIF TALENT:17')] }, // 锚取 :292
      { src: ABLUP21, ref: '309-315', any: [lit('IF TALENT:21')] }, // 锚取 :309
      { src: ABLUP21, ref: '317-323', any: [lit('IF TALENT:22')] }, // 锚取 :317
      { src: ABLUP21, ref: '325-331', any: [lit('IF TALENT:24')] }, // 锚取 :325
      { src: ABLUP21, ref: '333-339', any: [lit('IF TALENT:26')] }, // 锚取 :333
      { src: ABLUP21, ref: '342-347', any: [lit('IF TALENT:30')] }, // 锚取 :342
      { src: ABLUP21, ref: '349-354', any: [lit('ELSEIF TALENT:31')] }, // 锚取 :349
      { src: ABLUP21, ref: '358-363', any: [lit('IF TALENT:32')] }, // 锚取 :358
      { src: ABLUP21, ref: '365-370', any: [lit('ELSEIF TALENT:33')] }, // 锚取 :365
      { src: ABLUP21, ref: '374-380', any: [lit('IF TALENT:34')] }, // 锚取 :374
      { src: ABLUP21, ref: '383-388', any: [lit('IF TALENT:35')] }, // 锚取 :383
      { src: ABLUP21, ref: '390-395', any: [lit('ELSEIF TALENT:36')] }, // 锚取 :390
      { src: ABLUP21, ref: '415-420', any: [lit('IF TALENT:70')] }, // 锚取 :415
      { src: ABLUP21, ref: '422-427', any: [lit('ELSEIF TALENT:71')] }, // 锚取 :422
      { src: ABLUP21, ref: '431-437', any: [lit('IF TALENT:76')] }, // 锚取 :431
      { src: ABLUP21, ref: '439-445', any: [lit('IF TALENT:80')] }, // 锚取 :439
      { src: ABLUP21, ref: '447-453', any: [lit('IF TALENT:83')] }, // 锚取 :447
      { src: ABLUP21, ref: '455-461', any: [lit('IF TALENT:88')] }, // 锚取 :455
      { src: ABLUP21, ref: '463-469', any: [lit('IF TALENT:123')] }, // 锚取 :463
      { src: ABLUP21, ref: '471-477', any: [lit('IF TALENT:9')] }, // 锚取 :471
      { src: ABLUP21, ref: '480-484', any: [lit('IF ABL:11 < ABL:21+1')] }, // 锚取 :414
      { src: ABLUP21, ref: '487-490', any: [lit('IF EXP:50 < F')] }, // 锚取 :421
      { src: ABLUP21, ref: '493-505', any: [lit('IF B > 0\n	;苦痛点数が不足')] }, // 锚取 :430
      { src: ABLUP21, ref: '504', any: [lit('	I = 256')] }, // 锚取 :438
      { src: ABLUP21, ref: '508-520', any: [lit('IF D > 0\n	;苦痛点数が不足')] }, // 锚取 :442
      { src: ABLUP21, ref: '522', any: [lit('	J = 256')] }, // 锚取 :455
      { src: ABLUP21, ref: '54-55', any: [lit('SIF F > 0')] }, // 锚取 :54
      {
        src: ABLUP21,
        ref: '57-59',
        any: [lit('PRINTFORM [0] - %PALAMNAME:9%点数×{JUEL:9}/{A} ……')],
      }, // 锚取 :508
      {
        src: ABLUP21,
        ref: '61-62',
        any: [lit('PRINTFORML 　　　%PALAMNAME:5%点数×{JUEL:5}/{B}')],
      }, // 锚取 :62
      {
        src: ABLUP21,
        ref: '72-73',
        any: [lit('PRINTFORML 　　　%PALAMNAME:6%点数×{JUEL:6}/{E}')],
      }, // 锚取 :73
      { src: ABLUP21, ref: '75-76', any: [lit('	SIF C > 0\n		PRINTFORML 　　　%EXPNAME:30%　{EXP:30}/{C}\n	;绝顶经验')] }, // 锚取 :75
      {
        src: ABLUP21,
        ref: '90-91',
        any: [lit('ELSEIF J == 256 && RESULT == 1')],
      }, // 锚取 :75
      {
        src: ABLUP21,
        ref: '109',
        any: [lit('PRINTFORML %ABLNAME:21%变为LV{ABL:21}。')],
      }, // 锚取 :109
      // —— ABLUP22.ERB（issue #466）——
      {
        src: ABLUP22,
        ref: '8-97',
        any: [lit(';PRINTL 奴隶的百合气质提升了。')],
      }, // 锚取 :13
      { src: ABLUP22, ref: '116-365', any: [lit('@DECIDE_ABLUP22')] }, // 锚取 :116
      {
        src: ABLUP22,
        ref: '10-11',
        any: [lit('SIF TALENT:122\n	RETURN 0\nDRAWLINE')],
      }, // 锚取 :10
      {
        src: ABLUP22,
        ref: '357-359',
        any: [lit('ELSE\n	J = 256')],
      }, // 锚取 :357
      { src: ABLUP22, ref: '50', any: [lit('PRINTFORML %ABLNAME:11%LV{ABL:22 + 1}以上(现在LV{ABL:11})且')] }, // 锚取 :49
      { src: ABLUP22, ref: '214', any: [lit('SIF ABL:22 >= 3 && (TALENT:33 == 0 && TALENT:80 == 0 && TALENT:81 == 0 && TALENT:123 == 0)')] }, // 锚取 :167
      {
        src: ABLUP22,
        ref: '18',
        any: [
          lit(
            ';[开放][倒錯的][双性恋][讨厌男人][疯狂]が付いている場合はLv10まで开放',
          ),
        ],
      }, // 锚取 :214
      { src: ABLUP22, ref: '12', any: [lit('DRAWLINE\n;PRINTL 奴隶的百合气质提升了。')] }, // 锚取 :12
      { src: ABLUP22, ref: '21-23', any: [lit('PRINTW 已达最高级')] }, // 锚取 :22
      { src: ABLUP22, ref: '140-190', any: [lit('A = 40000')] }, // 锚取 :166
      { src: ABLUP22, ref: '193-211', any: [lit('IF TALENT:27')] }, // 锚取 :215
      {
        src: ABLUP22,
        ref: '214-215',
        any: [
          lit(
            'SIF ABL:22 >= 3 && (TALENT:33 == 0 && TALENT:80 == 0 && TALENT:81 == 0 && TALENT:123 == 0)',
          ),
        ],
      }, // 锚取 :214
      { src: ABLUP22, ref: '218-223', any: [lit('IF TALENT:13')] }, // 锚取 :218
      { src: ABLUP22, ref: '225-230', any: [lit('IF TALENT:21')] }, // 锚取 :225
      { src: ABLUP22, ref: '239-244', any: [lit('IF TALENT:24')] }, // 锚取 :239
      { src: ABLUP22, ref: '247-251', any: [lit('IF TALENT:30')] }, // 锚取 :247
      { src: ABLUP22, ref: '253-257', any: [lit('ELSEIF TALENT:31')] }, // 锚取 :253
      { src: ABLUP22, ref: '269-273', any: [lit('IF TALENT:70')] }, // 锚取 :269
      { src: ABLUP22, ref: '275-279', any: [lit('ELSEIF TALENT:71')] }, // 锚取 :275
      { src: ABLUP22, ref: '313-318', any: [lit('IF TALENT:123')] }, // 锚取 :313
      { src: ABLUP22, ref: '321-322', any: [lit('SIF A < 1')] }, // 锚取 :321
      { src: ABLUP22, ref: '323-324', any: [lit('SIF B < 1')] }, // 锚取 :323
      { src: ABLUP22, ref: '333-334', any: [lit('SIF JUEL:5 < A')] }, // 锚取 :333
      { src: ABLUP22, ref: '336-337', any: [lit('SIF JUEL:6 < C')] }, // 锚取 :336
      { src: ABLUP22, ref: '339-340', any: [lit('SIF EXP:40 < B\n	I |= 2')] }, // 锚取 :353
      { src: ABLUP22, ref: '343-347', any: [lit('IF ABL:11 < ABL:22 + 1')] }, // 锚取 :358
      { src: ABLUP22, ref: '350-356', any: [lit('IF D > 0\n	;阴核点数が不足')] }, // 锚取 :349
      { src: ABLUP22, ref: '358', any: [lit('J = 256')] }, // 锚取 :358
      { src: ABLUP22, ref: '46-47', any: [lit('SIF E > 0')] }, // 锚取 :46
      { src: ABLUP22, ref: '53-55', any: [lit('PRINTFORM [0] - %PALAMNAME:5%点数×{JUEL:5}/{A} ……')] }, // 锚取 :52
      { src: ABLUP22, ref: '56-57', any: [lit('SIF C > 0')] }, // 锚取 :56
      {
        src: ABLUP22,
        ref: '58',
        any: [lit('PRINTFORML 　　　%EXPNAME:40%　{EXP:40}/{B}')],
      }, // 锚取 :350
      {
        src: ABLUP22,
        ref: '61-64',
        any: [lit('PRINTFORM [1] - %PALAMNAME:0%点数×{JUEL:0}/{D} ……')],
      }, // 锚取 :62
      {
        src: ABLUP22,
        ref: '74-75',
        any: [lit('ELSEIF I != 0 && RESULT == 0')],
      }, // 锚取 :74
      {
        src: ABLUP22,
        ref: '79-80',
        any: [lit('ELSEIF J != 0 && RESULT == 1')],
      }, // 锚取 :79
      { src: ABLUP22, ref: '89-90', any: [lit('	JUEL:5 -= A\n	JUEL:6 -= C\nELSEIF RESULT == 1')] }, // 锚取 :88
      {
        src: ABLUP22,
        ref: '95',
        any: [lit('PRINTFORML %ABLNAME:22%变为LV{ABL:22}。')],
      }, // 锚取 :89
      // —— ABLUP23.ERB（issue #466）——
      { src: ABLUP23, ref: '8-96', any: [lit(';男人でないととダメ')] }, // 锚取 :9
      { src: ABLUP23, ref: '115-345', any: [lit('@DECIDE_ABLUP23')] }, // 锚取 :115
      { src: ABLUP23, ref: '257-262', any: [lit('IF TALENT:82')] }, // 锚取 :257
      { src: ABLUP23, ref: '136-186', any: [lit('B = 150')] }, // 锚取 :143
      { src: ABLUP23, ref: '189-207', any: [lit('TIMES A , 2.00')] }, // 锚取 :195
      { src: ABLUP23, ref: '210-211', any: [lit('SIF ABL:23 >= 3 && (TALENT:33 == 0 && TALENT:80 == 0 && TALENT:81 == 0 && TALENT:123 == 0)')] }, // 锚取 :210
      { src: ABLUP23, ref: '221-226', any: [lit('IF TALENT:21')] }, // 锚取 :221
      { src: ABLUP23, ref: '228-233', any: [lit('IF TALENT:23')] }, // 锚取 :228
      { src: ABLUP23, ref: '235-240', any: [lit('IF TALENT:24')] }, // 锚取 :235
      { src: ABLUP23, ref: '243-247', any: [lit('IF TALENT:30')] }, // 锚取 :243
      { src: ABLUP23, ref: '249-253', any: [lit('ELSEIF TALENT:31')] }, // 锚取 :249
      { src: ABLUP23, ref: '264-269', any: [lit('IF TALENT:63')] }, // 锚取 :264
      { src: ABLUP23, ref: '272-276', any: [lit('IF TALENT:70')] }, // 锚取 :272
      { src: ABLUP23, ref: '278-282', any: [lit('ELSEIF TALENT:71')] }, // 锚取 :278
      { src: ABLUP23, ref: '286-291', any: [lit('IF TALENT:80')] }, // 锚取 :286
      { src: ABLUP23, ref: '300-305', any: [lit('IF TALENT:123')] }, // 锚取 :300
      { src: ABLUP23, ref: '308-309', any: [lit('SIF A < 1')] }, // 锚取 :308
      { src: ABLUP23, ref: '314-317', any: [lit('IF EXP:50 < E')] }, // 锚取 :313
      { src: ABLUP23, ref: '320-321', any: [lit('SIF JUEL:5 < A')] }, // 锚取 :319
      { src: ABLUP23, ref: '323-324', any: [lit('SIF JUEL:6 < C')] }, // 锚取 :322
      { src: ABLUP23, ref: '326-327', any: [lit('SIF EXP:41 < B\n	I |= 2')] }, // 锚取 :325
      { src: ABLUP23, ref: '330-336', any: [lit('IF D > 0\n	;肛门点数が不足')] }, // 锚取 :329
      { src: ABLUP23, ref: '338', any: [lit('	J = 256')] }, // 锚取 :335
      {
        src: ABLUP23,
        ref: '59-62',
        any: [lit('PRINTFORM [1] - %PALAMNAME:2%点数×{JUEL:2}/{D} ……')],
      }, // 锚取 :330
      {
        src: ABLUP23,
        ref: '64',
        any: [lit('	PRINTFORML 　　　%EXPNAME:41%　{EXP:41}/{B}')],
      }, // 锚取 :64
      {
        src: ABLUP23,
        ref: '73-74',
        any: [lit('ELSEIF I != 0 && RESULT == 0')],
      }, // 锚取 :73
      { src: ABLUP23, ref: '85', any: [lit('ABL:23 += 1')] }, // 锚取 :85
      {
        src: ABLUP23,
        ref: '94',
        any: [lit('PRINTFORML %ABLNAME:23%变为LV{ABL:23}。')],
      }, // 锚取 :94
      // —— ABLUP30.ERB（issue #466）——
      {
        src: ABLUP30,
        ref: '9-92',
        any: [lit(';PRINTL 奴隶的性交成瘾加深了。')],
      }, // 锚取 :11
      {
        src: ABLUP30,
        ref: '112-356',
        any: [lit('@DECIDE_ABLUP30')],
      }, // 锚取 :112
      {
        src: ABLUP30,
        // 交接改正：原写 :110-111（DECIDE 的 AND 分支），实为 :115-116
        ref: '115-116',
        any: [
          lit(
            'SIF ABL:30 >= 5 && (TALENT:85 == 0 && TALENT:76 == 0 && TALENT:63 == 0 && TALENT:70 == 0 && TALENT:75 == 0 && TALENT:77 == 0)',
          ),
        ],
      }, // 锚取 :115
      {
        src: ABLUP30,
        ref: '28',
        any: [lit('	PRINTFORML 至少达成%PALAMNAME:5%点数{ABL:30 * ABL:30 * 1000}点或%PALAMNAME:6%点数{ABL:30 * ABL:30 * 300}点的其中一项')],
      }, // 锚取 :28
      { src: ABLUP30, ref: '129-169', any: [lit('B = 25000')] }, // 锚取 :135
      { src: ABLUP30, ref: '172-190', any: [lit('TIMES B , 2.50')] }, // 锚取 :183
      { src: ABLUP30, ref: '193-197', any: [lit('IF TALENT:12\n	TIMES A , 1.20')] }, // 锚取 :193
      { src: ABLUP30, ref: '199-203', any: [lit('IF TALENT:20')] }, // 锚取 :199
      { src: ABLUP30, ref: '205-209', any: [lit('IF TALENT:21')] }, // 锚取 :205
      { src: ABLUP30, ref: '211-215', any: [lit('IF TALENT:24')] }, // 锚取 :211
      { src: ABLUP30, ref: '218-222', any: [lit('IF TALENT:30')] }, // 锚取 :218
      { src: ABLUP30, ref: '223-227', any: [lit('ELSEIF TALENT:31')] }, // 锚取 :223
      { src: ABLUP30, ref: '230-234', any: [lit('IF TALENT:32')] }, // 锚取 :230
      { src: ABLUP30, ref: '266-270', any: [lit('ELSEIF TALENT:71')] }, // 锚取 :266
      { src: ABLUP30, ref: '272-276', any: [lit('IF TALENT:72')] }, // 锚取 :272
      { src: ABLUP30, ref: '278-282', any: [lit('IF TALENT:73')] }, // 锚取 :278
      { src: ABLUP30, ref: '284-288', any: [lit('IF TALENT:76')] }, // 锚取 :284
      { src: ABLUP30, ref: '290-294', any: [lit('IF TALENT:87')] }, // 锚取 :290
      { src: ABLUP30, ref: '296-300', any: [lit('IF TALENT:123')] }, // 锚取 :296
      { src: ABLUP30, ref: '302-306', any: [lit('IF TALENT:9')] }, // 锚取 :302
      { src: ABLUP30, ref: '309-310', any: [lit('SIF A < 1')] }, // 锚取 :309
      { src: ABLUP30, ref: '311-312', any: [lit('SIF B < 1')] }, // 锚取 :311
      { src: ABLUP30, ref: '317-324', any: [lit('IF ABL:30 >= 2 && (TALENT:33 == 0 && TALENT:72 == 0 && TALENT:76 == 0 && TALENT:123 == 0)')] }, // 锚取 :317
      { src: ABLUP30, ref: '327-330', any: [lit('IF ABL:16 < ABL:30 + 1')] }, // 锚取 :327
      { src: ABLUP30, ref: '343-344', any: [lit('SIF JUEL:5 < A * 3')] }, // 锚取 :343
      { src: ABLUP30, ref: '346-347', any: [lit('SIF JUEL:6 < B * 3')] }, // 锚取 :346
      { src: ABLUP30, ref: '349-350', any: [lit('SIF EXP:5 < C / 2')] }, // 锚取 :349
      { src: ABLUP30, ref: '346-347', any: [lit('SIF JUEL:6 < B * 3')] }, // 锚取 :346
      { src: ABLUP30, ref: '349-350', any: [lit('SIF EXP:5 < C / 2')] }, // 锚取 :349
      { src: ABLUP30, ref: '81', any: [lit('ABL:30 += 1')] }, // 锚取 :82
      // —— ABLUP31.ERB（issue #466）——
      {
        src: ABLUP31,
        ref: '9-106',
        any: [lit(';PRINTL 奴隶的自慰成瘾加深了。')],
      }, // 锚取 :11
      { src: ABLUP31, ref: '128-346', any: [lit('@DECIDE_ABLUP31')] }, // 锚取 :128
      { src: ABLUP31, ref: '99-101', any: [lit('	JUEL:5 -= A\n	JUEL:0 -= B\n	JUEL:8 -= C\nENDIF\n\nPRINTFORML %ABLNAME:31%变为LV{ABL:31}。')] }, // 锚取 :99
      // 整行锚：裸 lit 会撞进下一档的 `SIF ABL:31 >= 5 && (…)`（:133）
      {
        src: ABLUP31,
        ref: '17',
        any: [
          whole_line(
            'IF ABL:31 >= 5 && (TALENT:85 == 0 && TALENT:76 == 0 && TALENT:60 == 0 && TALENT:70 == 0 && TALENT:74 == 0 && TALENT:78 == 0)',
          ),
        ],
      },
      {
        src: ABLUP31,
        ref: '26',
        any: [lit('	IF JUEL:5 < ABL:31 * ABL:31 * 2550 || JUEL:0 < ABL:31 * ABL:31 * 15000 || JUEL:8 < ABL:31 * ABL:31 * 2000')],
      }, // 锚取 :26
      { src: ABLUP31, ref: '28', any: [lit('	PRINTFORML 至少达成%PALAMNAME:5%点数{ABL:31 * ABL:31 * 2550}点、%PALAMNAME:0%点数{ABL:31 * ABL:31 * 15000}点或%PALAMNAME:8%点数{ABL:31 * ABL:31 * 2000}点的其中一项')] }, // 锚取 :156
      { src: ABLUP31, ref: '29', any: [lit('	PRINTFORMW 方可提升当前自慰中毒的等级')] }, // 锚取 :29
      { src: ABLUP31, ref: '150-210', any: [lit('B = 500000')] }, // 锚取 :194
      { src: ABLUP31, ref: '213-239', any: [lit('IF TALENT:27')] }, // 锚取 :213
      { src: ABLUP31, ref: '242-249', any: [lit('IF ABL:31 == 2 && (TALENT:33 == 0 && TALENT:60 == 0 && TALENT:72 == 0 && TALENT:76 == 0 && TALENT:123 == 0)')] }, // 锚取 :242
      { src: ABLUP31, ref: '252-257', any: [lit('IF TALENT:60')] }, // 锚取 :252
      { src: ABLUP31, ref: '260-265', any: [lit('IF TALENT:72')] }, // 锚取 :260
      { src: ABLUP31, ref: '268-273', any: [lit('IF TALENT:80')] }, // 锚取 :268
      { src: ABLUP31, ref: '285-288', any: [lit('IF F > EXP:50')] }, // 锚取 :285
      { src: ABLUP31, ref: '291-294', any: [lit('IF ABL:17 < ABL:31 + 1')] }, // 锚取 :291
      { src: ABLUP31, ref: '297-300', any: [lit('IF ABL:0 < ABL:31 + 1')] }, // 锚取 :297
      { src: ABLUP31, ref: '305-306', any: [lit('SIF B < 1')] }, // 锚取 :225
      { src: ABLUP31, ref: '309-310', any: [lit('SIF D < 1')] }, // 锚取 :229
      { src: ABLUP31, ref: '316-317', any: [lit('SIF JUEL:5 < A\n	I |= 1')] }, // 锚取 :237
      {
        src: ABLUP31,
        ref: '319-320',
        any: [
          lit(
            ';ＬＶ２から３、ＬＶ３から４、４から５に上げるときは异常经验必要（素質：[开放][容易自慰][淫乱][容易上瘾][疯狂]なら無視できる）',
          ),
        ],
      }, // 锚取 :316
      { src: ABLUP31, ref: '322-323', any: [lit('SIF JUEL:8 < C\n	I |= 1')] }, // 锚取 :243
      { src: ABLUP31, ref: '333-334', any: [lit('SIF JUEL:0 < B\n	J |= 1')] }, // 锚取 :251
      { src: ABLUP31, ref: '336-337', any: [lit('SIF JUEL:8 < C\n	J |= 1')] }, // 锚取 :254
      { src: ABLUP31, ref: '56-57', any: [lit('SIF F > 0')] }, // 锚取 :59
      {
        src: ABLUP31,
        ref: '63',
        any: [lit('PRINTFORML %ABLNAME:0%LV{ABL:31 + 1}以上(现在LV{ABL:0})且')],
      }, // 锚取 :336
      {
        src: ABLUP31,
        ref: '71',
        any: [lit('PRINTFORML 　　　%EXPNAME:10%　{EXP:10}/{D}')],
      }, // 锚取 :71
      { src: ABLUP31, ref: '89-90', any: [lit('ELSEIF J != 0 && RESULT == 1')] }, // 锚取 :99
      { src: ABLUP31, ref: '96', any: [lit('ABL:31 += 1')] }, // 锚取 :101
      {
        src: ABLUP31,
        ref: '99-101',
        any: [lit('	JUEL:5 -= A\n	JUEL:0 -= B\n	JUEL:8 -= C\nENDIF\n\nPRINTFORML %ABLNAME:31%变为LV{ABL:31}。')],
      }, // 锚取 :99
      // —— ABLUP32.ERB（issue #466）——
      {
        src: ABLUP32,
        ref: '104',
        any: [lit('\n\n;-------------------------------------------------\n@CORE_ABLUP32')],
      }, // 锚取 :104
      { src: ABLUP32, ref: '8-103', any: [lit('@ABLUP32')] }, // 锚取 :121
      {
        src: ABLUP32,
        ref: '123-382',
        any: [
          lit('@DECIDE_ABLUP32'),
        ],
      }, // 锚取 :123
      { src: ABLUP32, ref: '55-60', any: [lit('IF TALENT:76 == 0\n	PRINTFORML %ABLNAME:16%LV{ABL:32 + 1}以上(现在LV{ABL:16})且')] }, // 锚取 :246
      {
        src: ABLUP32,
        ref: '25',
        any: [lit('	IF JUEL:5 < ABL:32 * ABL:32 * 6500 || JUEL:6 < ABL:32 * ABL:32 * 19000')],
      }, // 锚取 :55
      { src: ABLUP32, ref: '27', any: [lit('	PRINTFORML 至少达成%PALAMNAME:5%点数{ABL:32 * ABL:32 * 4000}点或%PALAMNAME:6%点数{ABL:32 * ABL:32 * 19000}点的其中一项')] }, // 锚取 :148
      { src: ABLUP32, ref: '185-188', any: [lit('IF ABL:32 + ABL:33 + ABL:39 >= 10\n	A = ABL:32 * ABL:32 * 4000')] }, // 锚取 :154
      {
        src: ABLUP32,
        ref: '19-21',
        any: [
          lit(
            'IF JUEL:5 < ABL:32 * ABL:32 * 6500 || JUEL:6 < ABL:32 * ABL:32 * 19000',
          ),
        ],
      }, // 锚取 :185
      { src: ABLUP32, ref: '28', any: [lit('	PRINTFORMW 方可提升当前精液中毒的等级')] }, // 锚取 :134
      { src: ABLUP32, ref: '143-183', any: [lit('B = 10000')] }, // 锚取 :145
      { src: ABLUP32, ref: '191-209', any: [lit('IF TALENT:27')] }, // 锚取 :179
      { src: ABLUP32, ref: '212-213', any: [lit('SIF ABL:32 >= 2 && (TALENT:61 == 0 && TALENT:72 == 0 && TALENT:80 == 0 && TALENT:123 == 0 && TALENT:47 == 0)')] }, // 锚取 :182
      {
        src: ABLUP32,
        ref: '216-220',
        any: [lit('IF TALENT:11')],
      }, // 锚取 :216
      {
        src: ABLUP32,
        ref: '222-226',
        any: [lit('IF TALENT:22')],
      }, // 锚取 :222
      { src: ABLUP32, ref: '228-232', any: [lit('IF TALENT:24')] }, // 锚取 :201
      { src: ABLUP32, ref: '235-239', any: [lit('IF TALENT:32')] }, // 锚取 :204
      {
        src: ABLUP32,
        ref: '240-244',
        any: [
          lit(
            ';ＬＶ２以上に上げるときは异常经验必要（素質：[不怕污臭][容易上瘾][倒錯的][疯狂][喜欢精液]なら無視できる）',
          ),
        ],
      }, // 锚取 :240
      { src: ABLUP32, ref: '247-251', any: [lit('IF TALENT:34')] }, // 锚取 :247
      { src: ABLUP32, ref: '254-258', any: [lit('IF TALENT:47')] }, // 锚取 :254
      { src: ABLUP32, ref: '261-265', any: [lit('IF TALENT:52')] }, // 锚取 :261
      { src: ABLUP32, ref: '268-272', any: [lit('IF TALENT:61')] }, // 锚取 :268
      { src: ABLUP32, ref: '273-277', any: [lit('ELSEIF TALENT:62')] }, // 锚取 :273
      { src: ABLUP32, ref: '279-283', any: [lit('IF TALENT:64')] }, // 锚取 :279
      { src: ABLUP32, ref: '298-302', any: [lit('IF TALENT:76\n	TIMES A , 0.90')] }, // 锚取 :298
      { src: ABLUP32, ref: '304-308', any: [lit('IF TALENT:80')] }, // 锚取 :304
      { src: ABLUP32, ref: '310-314', any: [lit('IF TALENT:87')] }, // 锚取 :310
      { src: ABLUP32, ref: '316-320', any: [lit('IF TALENT:123')] }, // 锚取 :316
      { src: ABLUP32, ref: '322-326', any: [lit('IF TALENT:9')] }, // 锚取 :322
      { src: ABLUP32, ref: '329-330', any: [lit('SIF A < 1')] }, // 锚取 :329
      { src: ABLUP32, ref: '331-332', any: [lit('SIF B < 1')] }, // 锚取 :331
      { src: ABLUP32, ref: '333-334', any: [lit('SIF C < 1')] }, // 锚取 :333
      { src: ABLUP32, ref: '336-340', any: [lit('IF D > EXP:50')] }, // 锚取 :336
      { src: ABLUP32, ref: '343-347', any: [lit('IF TALENT:76 == 0\n	IF ABL:16 < ABL:32 + 1')] }, // 锚取 :343
      { src: ABLUP32, ref: '348-353', any: [lit('ELSEIF TALENT:76 == 1\n;欲望が精液中毒＋１レベルでないといけない([淫乱]がある場合)\n	IF ABL:11 < ABL:32 + 1')] }, // 锚取 :348
      { src: ABLUP32, ref: '358-359', any: [lit('SIF JUEL:5 < A\n	I |= 1')] }, // 锚取 :313
      { src: ABLUP32, ref: '361-362', any: [lit('SIF JUEL:6 < B\n	I |= 1')] }, // 锚取 :316
      { src: ABLUP32, ref: '369-370', any: [lit('SIF JUEL:5 < A*3')] }, // 锚取 :372
      { src: ABLUP32, ref: '372-373', any: [lit('SIF JUEL:6 < B*3')] }, // 锚取 :375
      { src: ABLUP32, ref: '375-376', any: [lit('SIF EXP:20 < C/2')] }, // 锚取 :51
      {
        src: ABLUP32,
        ref: '51-52',
        any: [
          lit('SIF D > 0'),
        ],
      }, // 锚取 :361
      {
        src: ABLUP32,
        ref: '67',
        any: [lit('PRINTFORML 　　　%EXPNAME:20%　{EXP:20}/{C}')],
      }, // 锚取 :67
      { src: ABLUP32, ref: '78', any: [lit('INPUT')] }, // 锚取 :82
      { src: ABLUP32, ref: '81-82', any: [lit('PRINTL 未满足条件')] }, // 锚取 :85
      { src: ABLUP32, ref: '84-85', any: [lit('ELSEIF J != 0 && RESULT == 1')] }, // 锚取 :93
      { src: ABLUP32, ref: '101', any: [lit('PRINTFORML %ABLNAME:32%变为LV{ABL:32}。')] }, // 锚取 :97
      // —— ABLUP33.ERB（issue #466）——
      {
        src: ABLUP33,
        ref: '97-98',
        any: [lit('	JUEL:6 -= A\nENDIF\n\n\n;-------------------------------------------------')],
      }, // 锚取 :97
      { src: ABLUP33, ref: '8-86', any: [lit('@ABLUP33')] }, // 锚取 :104
      { src: ABLUP33, ref: '60', any: [lit('PRINTFORML 　　　%PALAMNAME:5%点数×{JUEL:5}/{A}')] }, // 锚取 :80
      { src: ABLUP33, ref: '351', any: [lit('		J |= 2')] }, // 锚取 :366
      {
        src: ABLUP33,
        ref: '357',
        any: [
          lit(
            'PRINTFORML 精液中毒({ABL:32})＋百合中毒({ABL:33})＋兽奸中毒({ABL:39})上限为10',
          ),
        ],
      }, // 锚取 :357
      { src: ABLUP33, ref: '126-166', any: [lit('ELSEIF ABL:33 == 8')] }, // 锚取 :158
      {
        src: ABLUP33,
        ref: '168-171',
        any: [lit('IF ABL:32 + ABL:33 + ABL:39 >= 10\n	A = ABL:33 * ABL:33 * 4000')],
      }, // 锚取 :168
      {
        src: ABLUP33,
        ref: '12',
        any: [lit('DRAWLINE\n;PRINTL 奴隶的百合成瘾加深了。')],
      }, // 锚取 :12
      { src: ABLUP33, ref: '31', any: [lit('	PRINTFORMW 方可提升当前百合中毒的等级')] }, // 锚取 :31
      { src: ABLUP33, ref: '168-171', any: [lit('IF ABL:32 + ABL:33 + ABL:39 >= 10\n	A = ABL:33 * ABL:33 * 4000')] }, // 锚取 :168
      { src: ABLUP33, ref: '174-192', any: [lit('TIMES B , 3.00')] }, // 锚取 :189
      { src: ABLUP33, ref: '199-203', any: [lit('IF TALENT:11')] }, // 锚取 :199
      { src: ABLUP33, ref: '205-209', any: [lit('IF TALENT:20')] }, // 锚取 :205
      { src: ABLUP33, ref: '211-215', any: [lit('IF TALENT:21')] }, // 锚取 :211
      { src: ABLUP33, ref: '217-221', any: [lit('IF TALENT:24')] }, // 锚取 :217
      { src: ABLUP33, ref: '224-227', any: [lit('IF TALENT:32')] }, // 锚取 :224
      { src: ABLUP33, ref: '229-232', any: [lit('ELSEIF TALENT:33')] }, // 锚取 :229
      { src: ABLUP33, ref: '236-240', any: [lit('IF TALENT:34')] }, // 锚取 :236
      { src: ABLUP33, ref: '260-264', any: [lit('IF TALENT:64')] }, // 锚取 :260
      { src: ABLUP33, ref: '267-270', any: [lit('IF TALENT:70')] }, // 锚取 :267
      { src: ABLUP33, ref: '272-275', any: [lit('ELSEIF TALENT:71')] }, // 锚取 :272
      { src: ABLUP33, ref: '278-282', any: [lit('IF TALENT:72')] }, // 锚取 :278
      { src: ABLUP33, ref: '284-288', any: [lit('IF TALENT:73')] }, // 锚取 :284
      { src: ABLUP33, ref: '304-308', any: [lit('IF TALENT:80')] }, // 锚取 :304
      { src: ABLUP33, ref: '316-320', any: [lit('IF TALENT:82')] }, // 锚取 :316
      { src: ABLUP33, ref: '328-332', any: [lit('IF TALENT:123')] }, // 锚取 :321
      { src: ABLUP33, ref: '341-342', any: [lit('SIF A < 1')] }, // 锚取 :327
      { src: ABLUP33, ref: '343-344', any: [lit('SIF B < 1')] }, // 锚取 :345
      { src: ABLUP33, ref: '345-346', any: [lit('SIF C < 1')] }, // 锚取 :333
      { src: ABLUP33, ref: '364-365', any: [lit('SIF JUEL:5 < A')] }, // 锚取 :367
      { src: ABLUP33, ref: '367-368', any: [lit('SIF JUEL:6 < A')] }, // 锚取 :355
      { src: ABLUP33, ref: '76', any: [lit('ABL:33 += 1')] }, // 锚取 :78
      {
        src: ABLUP33,
        ref: '84',
        any: [lit('PRINTFORML %ABLNAME:33%变为LV{ABL:33}。')],
      }, // 锚取 :84
      // —— #491 第二步：行号重定位后按需补登记的引用值 ——
      { src: ABLUP20, ref: '45', any: [lit('	PRINTFORML %EXPNAME:50%{C}以上（现在{EXP:50}）且')] }, // 锚取 :45
      { src: ABLUP20, ref: '9', any: [lit('DRAWLINE\n;PRINTL 奴隶的S气质提升了。')] }, // 锚取 :9
      { src: ABLUP20, ref: '15-17', any: [lit('IF ABL:20 >= 5 && (TALENT:80 == 0 && TALENT:83 == 0 && TALENT:127 == 0)\n	PRINTW 需要特殊素质才能继续提升')] }, // 锚取 :15
      { src: ABLUP20, ref: '174-175', any: [lit('SIF (ABL:20 == 3 || ABL:20 == 4 || ABL:20 == 7) && TALENT:80 == 0 && TALENT:83 == 0 && TALENT:84 == 0 && TALENT:87 == 0')] }, // 锚取 :174
      { src: ABLUP20, ref: '181-183', any: [lit('IF TALENT:10')] }, // 锚取 :181
      { src: ABLUP20, ref: '190-191', any: [lit('SIF TALENT:12')] }, // 锚取 :190
      { src: ABLUP20, ref: '193-194', any: [lit('SIF TALENT:14')] }, // 锚取 :193
      { src: ABLUP20, ref: '196-199', any: [lit('IF TALENT:16')] }, // 锚取 :196
      { src: ABLUP20, ref: '206-208', any: [lit('ELSEIF TALENT:17')] }, // 锚取 :206
      { src: ABLUP20, ref: '217-220', any: [lit('IF TALENT:21')] }, // 锚取 :217
      { src: ABLUP20, ref: '227-230', any: [lit('IF TALENT:23')] }, // 锚取 :227
      { src: ABLUP20, ref: '232-233', any: [lit('SIF TALENT:26')] }, // 锚取 :232
      { src: ABLUP20, ref: '235-238', any: [lit('IF TALENT:28')] }, // 锚取 :235
      { src: ABLUP20, ref: '254-256', any: [lit('ELSEIF TALENT:33')] }, // 锚取 :254
      { src: ABLUP20, ref: '260-263', any: [lit('IF TALENT:79 || TALENT:82')] }, // 锚取 :260
      { src: ABLUP20, ref: '44-45', any: [lit('SIF C > 0')] }, // 锚取 :44
      { src: ABLUP20, ref: '60-61', any: [lit('SIF B > 0')] }, // 锚取 :60
      { src: ABLUP20, ref: '65', any: [lit('INPUT')] }, // 锚取 :65
      { src: ABLUP20, ref: '68-69', any: [lit('ELSEIF I != 0 && RESULT == 0')] }, // 锚取 :68
      { src: ABLUP20, ref: '75', any: [lit('ABL:20 += 1')] }, // 锚取 :75
      { src: ABLUP20, ref: '77', any: [lit('JUEL:5 -= A\n\nPRINTFORML %ABLNAME:20%变为LV{ABL:20}。')] }, // 锚取 :77
      { src: ABLUP21, ref: '503-505', any: [lit('ELSE\n	I = 256')] }, // 锚取 :503
      { src: ABLUP21, ref: '268-274', any: [lit('IF TALENT:12\n	TIMES A , 1.20')] }, // 锚取 :268
      { src: ABLUP21, ref: '301-307', any: [lit('IF TALENT:20')] }, // 锚取 :301
      { src: ABLUP21, ref: '399-404', any: [lit('IF TALENT:40')] }, // 锚取 :399
      { src: ABLUP21, ref: '406-411', any: [lit('ELSEIF TALENT:41')] }, // 锚取 :406
      { src: ABLUP21, ref: '51', any: [lit('PRINTFORML %ABLNAME:11%LV{ABL:21+1}以上(现在LV{ABL:11})且')] }, // 锚取 :51
      { src: ABLUP21, ref: '64-65', any: [lit('	SIF C > 0\n		PRINTFORML 　　　%EXPNAME:30%　{EXP:30}/{C}\nENDIF')] }, // 锚取 :64
      { src: ABLUP21, ref: '68-70', any: [lit('IF D > 0\n	PRINTFORM [1] - %PALAMNAME:9%点数×{JUEL:9}/{D} ……')] }, // 锚取 :68
      { src: ABLUP21, ref: '78-79', any: [lit('	SIF G > 0')] }, // 锚取 :78
      { src: ABLUP21, ref: '82', any: [lit('PRINTL [100] - 停止')] }, // 锚取 :82
      { src: ABLUP21, ref: '87-88', any: [lit('ELSEIF I != 0 && RESULT == 0')] }, // 锚取 :87
      { src: ABLUP21, ref: '92-93', any: [lit('ELSEIF J != 0 && RESULT == 1')] }, // 锚取 :92
      { src: ABLUP21, ref: '99', any: [lit('ABL:21 += 1')] }, // 锚取 :99
      { src: ABLUP21, ref: '102-103', any: [lit('	JUEL:9 -= A\n	JUEL:5 -= B\nELSEIF RESULT == 1')] }, // 锚取 :102
      { src: ABLUP21, ref: '105-106', any: [lit('	JUEL:9 -= D\n	JUEL:6 -= E\nENDIF\n\nPRINTFORML %ABLNAME:21%变为LV{ABL:21}。')] }, // 锚取 :105
      { src: ABLUP22, ref: '18-20', any: [lit('IF ABL:22 >= 5 && (TALENT:33 == 0 && TALENT:80 == 0 && TALENT:81 == 0 && TALENT:82 == 0 && TALENT:123 == 0)\n	PRINTW 需要特殊素质才能继续提升')] }, // 锚取 :18
      { src: ABLUP22, ref: '232-237', any: [lit('IF TALENT:23')] }, // 锚取 :232
      { src: ABLUP22, ref: '261-266', any: [lit('IF TALENT:63')] }, // 锚取 :261
      { src: ABLUP22, ref: '283-288', any: [lit('IF TALENT:80')] }, // 锚取 :283
      { src: ABLUP22, ref: '291-296', any: [lit('IF TALENT:79')] }, // 锚取 :291
      { src: ABLUP22, ref: '299-304', any: [lit('IF TALENT:81')] }, // 锚取 :299
      { src: ABLUP22, ref: '306-311', any: [lit('IF TALENT:82')] }, // 锚取 :306
      { src: ABLUP22, ref: '68', any: [lit('PRINTL [100] - 停止')] }, // 锚取 :68
      { src: ABLUP22, ref: '77-78', any: [lit('ELSEIF J == 256 && RESULT == 1')] }, // 锚取 :77
      { src: ABLUP22, ref: '86', any: [lit('ABL:22 += 1')] }, // 锚取 :86
      { src: ABLUP22, ref: '92', any: [lit('	JUEL:0 -= D\nENDIF\n\nPRINTFORML %ABLNAME:22%变为LV{ABL:22}。')] }, // 锚取 :92
      { src: ABLUP23, ref: '210', any: [lit('SIF ABL:23 >= 3 && (TALENT:33 == 0 && TALENT:80 == 0 && TALENT:81 == 0 && TALENT:123 == 0)')] }, // 锚取 :210
      { src: ABLUP23, ref: '214-219', any: [lit('IF TALENT:13')] }, // 锚取 :214
      { src: ABLUP23, ref: '293-298', any: [lit('IF TALENT:81')] }, // 锚取 :293
      { src: ABLUP23, ref: '310-311', any: [lit('SIF B < 1')] }, // 锚取 :310
      { src: ABLUP23, ref: '50-52', any: [lit('PRINTFORM [0] - %PALAMNAME:5%点数×{JUEL:5}/{A} ……')] }, // 锚取 :50
      { src: ABLUP23, ref: '53-54', any: [lit('SIF C > 0')] }, // 锚取 :53
      { src: ABLUP23, ref: '56', any: [lit('PRINTFORML 　　　%EXPNAME:41%　{EXP:41}/{B}\n\n;肛门点数で上げる場合')] }, // 锚取 :56
      { src: ABLUP23, ref: '70', any: [lit('INPUT')] }, // 锚取 :70
      { src: ABLUP23, ref: '76-77', any: [lit('ELSEIF J == 256 && RESULT == 1')] }, // 锚取 :76
      { src: ABLUP23, ref: '88-89', any: [lit('	JUEL:5 -= A\n	JUEL:6 -= C\nELSEIF RESULT == 1')] }, // 锚取 :88
      { src: ABLUP23, ref: '91', any: [lit('	JUEL:2 -= D\nENDIF\n\nPRINTFORML %ABLNAME:23%变为LV{ABL:23}。')] }, // 锚取 :91
      { src: ABLUP30, ref: '10', any: [lit('DRAWLINE\n;PRINTL 奴隶的性交成瘾加深了。')] }, // 锚取 :10
      { src: ABLUP30, ref: '17-19', any: [lit('IF ABL:30 >= 5 && (TALENT:85 == 0 || TALENT:76 == 0 || TALENT:63 == 0 || TALENT:70 == 0 || TALENT:75 == 0 || TALENT:77 == 0)')] }, // 锚取 :17
      { src: ABLUP30, ref: '20-22', any: [lit('ELSEIF ABL:30 >= 10')] }, // 锚取 :20
      { src: ABLUP30, ref: '242-246', any: [lit('IF TALENT:34')] }, // 锚取 :242
      { src: ABLUP30, ref: '313-314', any: [lit('SIF C < 1')] }, // 锚取 :313
      { src: ABLUP30, ref: '353-354', any: [lit('	RETURN 1')] }, // 锚取 :353
      { src: ABLUP30, ref: '57', any: [lit('PRINTFORML 　　　%EXPNAME:5%　{EXP:5}/{C}')] }, // 锚取 :57
      { src: ABLUP30, ref: '60-62', any: [lit('PRINTFORM [1] - %PALAMNAME:5%点数×{JUEL:5}/{A * 3} ……')] }, // 锚取 :60
      { src: ABLUP30, ref: '66', any: [lit('PRINTL [100] - 停止')] }, // 锚取 :66
      { src: ABLUP30, ref: '71-72', any: [lit('ELSEIF I != 0 && RESULT == 0')] }, // 锚取 :71
      { src: ABLUP30, ref: '83-84', any: [lit('	JUEL:5 -= A\n	JUEL:6 -= B\nELSEIF RESULT == 1')] }, // 锚取 :83
      { src: ABLUP30, ref: '90', any: [lit('PRINTFORML %ABLNAME:30%变为LV{ABL:30}。')] }, // 锚取 :90
      { src: ABLUP30, ref: '86-87', any: [lit('	JUEL:5 -= A*3\n	JUEL:6 -= B*3\nENDIF\n\nPRINTFORML %ABLNAME:30%变为LV{ABL:30}。')] }, // 锚取 :86
      { src: ABLUP31, ref: '276-281', any: [lit('IF TALENT:76')] }, // 锚取 :276
      { src: ABLUP31, ref: '303-304', any: [lit('SIF A < 1')] }, // 锚取 :303
      { src: ABLUP31, ref: '307-308', any: [lit('SIF C < 1')] }, // 锚取 :307
      { src: ABLUP31, ref: '325-326', any: [lit('SIF EXP:10 < D')] }, // 锚取 :325
      { src: ABLUP31, ref: '330-331', any: [lit('SIF JUEL:5 < A\n	J |= 1')] }, // 锚取 :330
      { src: ABLUP31, ref: '66-68', any: [lit('PRINTFORM [0] - %PALAMNAME:5%点数×{JUEL:5}/{A} ……')] }, // 锚取 :66
      { src: ABLUP31, ref: '69', any: [lit('PRINTFORML 　　　%PALAMNAME:0%点数×{JUEL:0}/{B}\nPRINTFORML 　　　%PALAMNAME:8%点数×{JUEL:8}/{C}\nPRINTFORML 　　　%EXPNAME:10%　{EXP:10}/{D}')] }, // 锚取 :69
      { src: ABLUP31, ref: '74-76', any: [lit('PRINTFORM [1] - %PALAMNAME:5%点数×{JUEL:5}/{A} ……')] }, // 锚取 :74
      { src: ABLUP31, ref: '83', any: [lit('INPUT')] }, // 锚取 :83
      { src: ABLUP32, ref: '343-354', any: [lit('IF TALENT:76 == 0\n	IF ABL:16 < ABL:32 + 1')] }, // 锚取 :343
      { src: ABLUP32, ref: '16-18', any: [lit('IF ABL:32 >= 5 && (TALENT:76 == 0 && TALENT:50 == 0 && TALENT:61 == 0 && TALENT:64 == 0 && TALENT:47 == 0)\n	PRINTW 需要特殊素质才能继续提升')] }, // 锚取 :16
      { src: ABLUP32, ref: '286-290', any: [lit('IF TALENT:72')] }, // 锚取 :286
      { src: ABLUP32, ref: '292-296', any: [lit('IF TALENT:73')] }, // 锚取 :292
      { src: ABLUP32, ref: '55-56', any: [lit('IF TALENT:76 == 0\n	PRINTFORML %ABLNAME:16%LV{ABL:32 + 1}以上(现在LV{ABL:16})且')] }, // 锚取 :55
      { src: ABLUP32, ref: '63-65', any: [lit('PRINTFORM [0] - %PALAMNAME:5%点数×{JUEL:5}/{A} ……')] }, // 锚取 :63
      { src: ABLUP32, ref: '70-72', any: [lit('PRINTFORM [1] - %PALAMNAME:5%点数×{JUEL:5}/{A*3} ……')] }, // 锚取 :70
      { src: ABLUP32, ref: '73', any: [lit('PRINTFORML 　　　%PALAMNAME:6%点数×{JUEL:6}/{B*3}')] }, // 锚取 :73
      { src: ABLUP32, ref: '74', any: [lit('PRINTFORML 　　　%EXPNAME:20%　{EXP:20}/{C/2}')] }, // 锚取 :74
      { src: ABLUP32, ref: '93-94', any: [lit('IF RESULT == 0')] }, // 锚取 :93
      { src: ABLUP33, ref: '104-377', any: [lit('@DECIDE_ABLUP33')] }, // 锚取 :104
      { src: ABLUP33, ref: '80-82', any: [lit('	JUEL:5 -= A\n	JUEL:6 -= A\nENDIF\n\nPRINTFORML %ABLNAME:33%变为LV{ABL:33}。')] }, // 锚取 :80
      { src: ABLUP33, ref: '29-30', any: [lit('	PRINTFORML 精液中毒({ABL:32})＋百合中毒({ABL:33})＋兽奸中毒({ABL:39})上限为10')] }, // 锚取 :29
      { src: ABLUP33, ref: '30', any: [lit('	PRINTFORML 至少达成%PALAMNAME:5%点数{ABL:33 * ABL:33 * 4000}点、%PALAMNAME:6%点数{ABL:33 * ABL:33 * 4000}点或%PALAMNAME:0%点数{ABL:33 * ABL:33 * 10000}点的其中一项')] }, // 锚取 :30
      { src: ABLUP33, ref: '195-196', any: [lit('SIF ABL:33 >= 2 && ( TALENT:72 == 0 && TALENT:80 == 0 && TALENT:81 == 0 && TALENT:82 == 0 &&TALENT:123 == 0)')] }, // 锚取 :195
      { src: ABLUP33, ref: '248-252', any: [lit('IF TALENT:61')] }, // 锚取 :248
      { src: ABLUP33, ref: '297-301', any: [lit('IF TALENT:79')] }, // 锚取 :297
      { src: ABLUP33, ref: '334-338', any: [lit('IF TALENT:9')] }, // 锚取 :334
      { src: ABLUP33, ref: '349-352', any: [lit('IF D > EXP:50')] }, // 锚取 :349
      { src: ABLUP33, ref: '355-358', any: [lit('IF ABL:22 < ABL:33 + 1')] }, // 锚取 :355
      { src: ABLUP33, ref: '370-371', any: [lit('SIF EXP:40 < C')] }, // 锚取 :370
      { src: ABLUP33, ref: '55', any: [lit('PRINTFORML %ABLNAME:22%LV{ABL:33 + 1}以上(现在LV{ABL:22})且')] }, // 锚取 :55
      { src: ABLUP33, ref: '61', any: [lit('PRINTFORML 　　　%PALAMNAME:6%点数×{JUEL:6}/{A}')] }, // 锚取 :61
      { src: ABLUP33, ref: '62', any: [lit('PRINTFORML 　　　%EXPNAME:40%　{EXP:40}/{C}')] }, // 锚取 :62
      { src: ABLUP33, ref: '69-70', any: [lit('ELSEIF I != 0 && RESULT == 0')] }, // 锚取 :69
      { src: ABLUP33, ref: '79-81', any: [lit('	JUEL:0 -= B\n	JUEL:5 -= A\n	JUEL:6 -= A\nENDIF\n\nPRINTFORML %ABLNAME:33%变为LV{ABL:33}。')] }, // 锚取 :79
      { src: ABLUP33, ref: '67-68', any: [lit('IF (RESULT < 0 || RESULT > 0) && RESULT != 100')] }, // 锚取 :67
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
