// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #396（N12 段 3）：税金结算 @TAX_GET。
//
// 每条 ref 一对应税収的一段：正整数锚取自该段里全文唯一的源行
// （含正文，非裸命令），行号漂了即红。

export const FILES = [
  {
    js: 'ere/system/stronghold/tax.js',
    refs: [
      // :8-230（锚在源文件第 184 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '8-230',
        any: [
          /^\s*PRINTFORML └ 淫魔卖春税 \{ITEM:143 \* 2 \+ ITEM:152 \* 2 \+ ITEM:182 \* 2 \+ 20\}\s*$/m,
        ],
      },
      // :15（锚在源文件第 15 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '15',
        any: [/^\s*IF DAY:2 == 10 \|\| DAY:2 == 20 \|\| DAY:2 == 30\s*$/m],
      },
      // :15-19（锚在源文件第 15 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '15-19',
        any: [/^\s*IF DAY:2 == 10 \|\| DAY:2 == 20 \|\| DAY:2 == 30\s*$/m],
      },
      // :16（锚在源文件第 16 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '16',
        any: [
          /^\s*PRINTW 今天宜收税，宜鬼畜，宜调教，宜激烈做爱；忌纯爱，忌良心发现……\s*$/m,
        ],
      },
      // :21（锚在源文件第 21 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '21',
        any: [/^\s*TAX:0 = 0\s*$/m],
      },
      // :24-29（锚在源文件第 26 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '24-29',
        any: [/^\s*PRINTL - - - 收税 - - -\s*$/m],
      },
      // :31-68（锚在源文件第 62 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '31-68',
        any: [/^\s*ELSEIF EX_FLAG:99 <= 100 && EX_FLAG:99 > 80\s*$/m],
      },
      // :41-68（锚在源文件第 62 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '41-68',
        any: [/^\s*ELSEIF EX_FLAG:99 <= 100 && EX_FLAG:99 > 80\s*$/m],
      },
      // :46（锚在源文件第 46 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '46',
        any: [/^\s*TAX:0 \+= DAY:0 \* 30 \* EX_FLAG:99 \/ 100\s*$/m],
      },
      // :47-49（锚在源文件第 47 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '47-49',
        any: [/^\s*IF  TAX:0 > 5000\s*$/m],
      },
      // :70-71（锚在源文件第 71 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '70-71',
        any: [/^\s*PRINTFORMW 来自魔界的支援 \{TAX:0\}\s*$/m],
      },
      // :73-152（锚在源文件第 98 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '73-152',
        any: [/^\s*PRINTFORML ├ 精灵族领域殖民地 \{FLAG:86 \/ 10\}\s*$/m],
      },
      // :82（锚在源文件第 82 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '82',
        any: [/^\s*TAX:1 = 0\s*$/m],
      },
      // :84（锚在源文件第 84 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '84',
        any: [/^\s*PRINTL \*土地税\*\s*$/m],
      },
      // :86-121（锚在源文件第 98 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '86-121',
        any: [/^\s*PRINTFORML ├ 精灵族领域殖民地 \{FLAG:86 \/ 10\}\s*$/m],
      },
      // :89-91（锚在源文件第 90 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '89-91',
        any: [/^\s*PRINTFORML ├ 人间界殖民地 \{FLAG:81 \/ 10\}\s*$/m],
      },
      // :126-145（锚在源文件第 137 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '126-145',
        any: [/^\s*PRINTFORML \{CFLAG:0:9 \* 20 \+ 1500\}\s*$/m],
      },
      // :127-145（锚在源文件第 137 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '127-145',
        any: [/^\s*PRINTFORML \{CFLAG:0:9 \* 20 \+ 1500\}\s*$/m],
      },
      // :149-150（锚在源文件第 150 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '149-150',
        any: [/^\s*PRINTFORMW 合计 \{TAX:1\}\s*$/m],
      },
      // :152（锚在源文件第 152 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '152',
        any: [/^\s*TAX:0 \+= TAX:1\s*$/m],
      },
      // :154-196（锚在源文件第 184 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '154-196',
        any: [
          /^\s*PRINTFORML └ 淫魔卖春税 \{ITEM:143 \* 2 \+ ITEM:152 \* 2 \+ ITEM:182 \* 2 \+ 20\}\s*$/m,
        ],
      },
      // :163（锚在源文件第 163 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '163',
        any: [/^\s*TAX:2 = 0\s*$/m],
      },
      // :165-166（锚在源文件第 166 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '165-166',
        any: [/^\s*PRINTL \*肉便器税\*\s*$/m],
      },
      // :168-171（锚在源文件第 169 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '168-171',
        any: [/^\s*PRINTFORML ├ 展品观赏税 \{FLAG:84 \* 10\}\s*$/m],
      },
      // :173-176（锚在源文件第 174 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '173-176',
        any: [/^\s*PRINTFORML ├ 肉便器使用税 \{FLAG:83 \* 10\}\s*$/m],
      },
      // :179-185（锚在源文件第 184 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '179-185',
        any: [
          /^\s*PRINTFORML └ 淫魔卖春税 \{ITEM:143 \* 2 \+ ITEM:152 \* 2 \+ ITEM:182 \* 2 \+ 20\}\s*$/m,
        ],
      },
      // :187-191（锚在源文件第 189 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '187-191',
        any: [/^\s*SIF FLAG:\(LOCAL \+ 349\) == 507\s*$/m],
      },
      // :193-194（锚在源文件第 194 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '193-194',
        any: [/^\s*PRINTFORMW 合计 \{TAX:2\}\s*$/m],
      },
      // :196（锚在源文件第 196 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '196',
        any: [/^\s*TAX:0 \+= TAX:2\s*$/m],
      },
      // :198-213（锚在源文件第 205 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '198-213',
        any: [/^\s*TAX:3 = TAX:0 \* \(FLAG:9 \+ 100\)\s*$/m],
      },
      // :202-203（锚在源文件第 203 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '202-203',
        any: [/^\s*PRINTL \*魔王特別税\*\s*$/m],
      },
      // :205（锚在源文件第 205 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '205',
        any: [/^\s*TAX:3 = TAX:0 \* \(FLAG:9 \+ 100\)\s*$/m],
      },
      // :205-213（锚在源文件第 205 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '205-213',
        any: [/^\s*TAX:3 = TAX:0 \* \(FLAG:9 \+ 100\)\s*$/m],
      },
      // :209（锚在源文件第 209 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '209',
        any: [/^\s*PRINTFORMW 合計 \{TAX:3\}\s*$/m],
      },
      // :211（锚在源文件第 211 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '211',
        any: [/^\s*TAX:0 \+= TAX:3\s*$/m],
      },
      // :213（锚在源文件第 213 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '213',
        any: [/^\s*FLAG:9 = 0\s*$/m],
      },
      // :215-229（锚在源文件第 221 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '215-229',
        any: [/^\s*IF EX_FLAG:2811 >= 51 && EX_FLAG:2811 < 100\s*$/m],
      },
      // :221-225（锚在源文件第 221 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '221-225',
        any: [/^\s*IF EX_FLAG:2811 >= 51 && EX_FLAG:2811 < 100\s*$/m],
      },
      // :226（锚在源文件第 226 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '226',
        any: [/^\s*PRINTFORMW 合计税收 \{TAX:0\}\s*$/m],
      },
      // :228（锚在源文件第 228 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '228',
        any: [/^\s*MONEY \+= TAX:0\s*$/m],
      },
      // :228-229（锚在源文件第 229 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '228-229',
        any: [/^\s*EX_FLAG:4444 \+= TAX:0\s*$/m],
      },
      // :229（锚在源文件第 229 行）
      {
        src: 'target/ERB/SHOP/TAX.ERB',
        ref: '229',
        any: [/^\s*EX_FLAG:4444 \+= TAX:0\s*$/m],
      },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
