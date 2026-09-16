// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// EVENT_TURNEND.ERB（#114/#401）（#401 重落：refs 与 js 逐条对齐）

const SRC = 'target/ERB/EVENT/EVENT_TURNEND.ERB';
const SYSSRC = 'target/ERB/SYSTEM/SYSTEM ver1.0.3.ERB';

export const FILES = [
  {
    js: 'ere/event/event-turnend.js',
    refs: [
      { src: SRC, ref: '8-139', any: [/^@EVENTTURNEND$/m] },
      { src: SRC, ref: '13-27', any: [/^LOCAL = TARGET$/m] },
      { src: SRC, ref: '14', any: [/^FOR TARGET,0,CHARANUM$/m] },
      { src: SRC, ref: '19-20', any: [/^	SIF TARGET != LOCAL$/m] },
      { src: SRC, ref: '23', any: [/^	CALL IN_VAGINA_ALL$/m] },
      { src: SRC, ref: '26', any: [/^	CALL CONCEPTION_CHECK_ALL$/m] },
      { src: SRC, ref: '29', any: [/^TARGET = LOCAL$/m] },
      { src: SRC, ref: '31-51', any: [/^;完全に死んだキャラがいたら削除$/m] },
      { src: SRC, ref: '54', any: [/^FLAG:0 = 0$/m] },
      { src: SRC, ref: '57', any: [/^IF TIME == 1$/m] },
      { src: SRC, ref: '61-74', any: [/^	LOCAL = TARGET$/m] },
      { src: SRC, ref: '64', any: [/^		CALL IN_VAGINA_EXTRA$/m] },
      { src: SRC, ref: '65', any: [/^		CALL CONCEPTION_CHECK_EXTRA$/m] },
      { src: SRC, ref: '68', any: [/^		CALL IN_VAGINA_KYOUOU_TO_T$/m] },
      { src: SRC, ref: '69', any: [/^		CALL CONCEPTION_CHECK_KYOUOU_TO_T$/m] },
      { src: SRC, ref: '70', any: [/^		CALL IN_VAGINA_NTRD_TO_T$/m] },
      { src: SRC, ref: '71', any: [/^		CALL CONCEPTION_CHECK_NTRD_TO_T$/m] },
      { src: SRC, ref: '74', any: [/^	TARGET = LOCAL$/m] },
      { src: SRC, ref: '77', any: [/^	CALL EVENT_NEXTDAY$/m] },
      { src: SRC, ref: '79', any: [/^	DAY:0 \+= 1$/m] },
      { src: SRC, ref: '79-91', any: [/^	DAY:0 \+= 1$/m] },
      { src: SRC, ref: '93', any: [/^	CALL ENTER_ENEMY,0$/m] },
      { src: SRC, ref: '95-107', any: [/^	IF DAY >= 100$/m] },
      { src: SRC, ref: '108-120', any: [/^	SIF SENGEN >= SENGENMAX$/m] },
      { src: SRC, ref: '112', any: [/^		CALL ENTER_ENEMY$/m] },
      { src: SRC, ref: '114', any: [/^		CALL ENTER_ENEMY$/m] },
      { src: SRC, ref: '116', any: [/^		CALL ENTER_ENEMY$/m] },
      { src: SRC, ref: '121-125', any: [/^	IF SENGEN > 0$/m] },
      { src: SRC, ref: '123', any: [/^			CALL ENTER_ENEMY$/m] },
      { src: SRC, ref: '126-128', any: [/^	TIME = 1$/m] },
      { src: SRC, ref: '131', any: [/^CALL AUTO_BUYING$/m] },
      { src: SRC, ref: '134-135', any: [/^TARGET = -1$/m] },
      { src: SRC, ref: '137-138', any: [/^SIF !反作弊$/m] },
      { src: SRC, ref: '140', any: [/^BEGIN SHOP$/m] },
      { src: SRC, ref: '145-167', any: [/^@AUTO_BUYING$/m] },
      {
        src: SRC,
        ref: '147-151',
        any: [/^IF \(FLAG:34 & 1\) && MONEY >= 200 && ITEM:25 == 0$/m],
      },
      {
        src: SRC,
        ref: '153-157',
        any: [
          /^IF \(FLAG:34 & 2\) && MONEY >= 500 && ITEM:6 && ITEM:28 == 0$/m,
        ],
      },
      { src: SRC, ref: '159-167', any: [/^IF \(FLAG:34 & 8\)$/m] },
      { src: SRC, ref: '170-334', any: [/^@DEBUG_CHECK$/m] },
      { src: SRC, ref: '171-172', any: [/^#DIM COUNTER$/m] },
      { src: SRC, ref: '173', any: [/^MINUS = MONEY - EX_FLAG:4444$/m] },
      {
        src: SRC,
        ref: '174-175',
        any: [/^SIF MONEY != EX_FLAG:4444 \+ 8766$/m],
      },
      { src: SRC, ref: '177-182', any: [/^COUNTER = 0$/m] },
      { src: SRC, ref: '184-185', any: [/^SIF CFLAG:0:9 >= 5000$/m] },
      {
        src: SRC,
        ref: '187-235',
        any: [/^IF EX_FLAG:2802 == 1 && EX_FLAG:2801 % 100 < 10$/m],
      },
      {
        src: SRC,
        ref: '188-189',
        any: [/^	PRINTFORMW 一些贪婪的魔物们对宝库里的财宝动起了歪念头。$/m],
      },
      {
        src: SRC,
        ref: '189',
        any: [/^	PRINTFORMW 一些贪婪的魔物们对宝库里的财宝动起了歪念头。$/m],
      },
      { src: SRC, ref: '190', any: [/^	FORCEWAIT$/m] },
      {
        src: SRC,
        ref: '191',
        any: [
          /^	PRINTFORMW 趁着夜深人静，几只无法克制金钱欲望的哥布林企图炸开宝库大门，偷取财宝。$/m,
        ],
      },
      {
        src: SRC,
        ref: '192',
        any: [
          /^	PRINTFORMW 【这是魔王大人的财宝，我们这么干不好吧？】其中一只哥布林担心地说到。$/m,
        ],
      },
      {
        src: SRC,
        ref: '193',
        any: [
          /^	PRINTFORMW 【魔王大人努力得来的我们不偷，这些神力变出来的，我们拿一点也没什么吧！】为首的哥布林充满不屑。$/m,
        ],
      },
      {
        src: SRC,
        ref: '194',
        any: [/^	PRINTFORMW 无奈宝库的大门太过结实，一般的炸药无法撼动。$/m],
      },
      {
        src: SRC,
        ref: '195',
        any: [
          /^	PRINTFORMW 贪婪的绿皮们只能不断地添加当量，结果炸药过多，发生了大爆炸。$/m,
        ],
      },
      {
        src: SRC,
        ref: '196',
        any: [/^	PRINTFORMW 肇事的哥布林们和宝库里的财富都被炸得粉碎了……$/m],
      },
      { src: SRC, ref: '197', any: [/^	PRINTFORMW $/m] },
      { src: SRC, ref: '198', any: [/^	MONEY = 0$/m] },
      { src: SRC, ref: '199', any: [/^	EX_FLAG:4444 = MONEY - 8766$/m] },
      { src: SRC, ref: '200', any: [/^	PRINTFORMW 资金清零了。$/m] },
      { src: SRC, ref: '201', any: [/^	LOCAL:1 = 1$/m] },
      { src: SRC, ref: '201-233', any: [/^	LOCAL:1 = 1$/m] },
      { src: SRC, ref: '203', any: [/^		LOCAL:1 = RAND:CHARANUM$/m] },
      { src: SRC, ref: '204', any: [/^		LOCAL:5 \+\+$/m] },
      {
        src: SRC,
        ref: '206',
        any: [
          /^				PRINTFORMW %SAVESTR:\(LOCAL:1\)%的房间，刚好在宝库的正上方。$/m,
        ],
      },
      {
        src: SRC,
        ref: '207',
        any: [
          /^				PRINTFORMW 睡梦中的她没有任何防备，不幸地被猛烈的爆炸所淹没。$/m,
        ],
      },
      {
        src: SRC,
        ref: '208',
        any: [/^				PRINTFORMW %SAVESTR:\(LOCAL:1\)%被炸死了。$/m],
      },
      {
        src: SRC,
        ref: '209-228',
        any: [/^				;前回の助手・調教対象だった場合はフラグを空に$/m],
      },
      { src: SRC, ref: '210-211', any: [/^				SIF FLAG:1 == LOCAL:1$/m] },
      { src: SRC, ref: '212-213', any: [/^				SIF FLAG:2 == LOCAL:1$/m] },
      {
        src: SRC,
        ref: '215-219',
        any: [/^				;前回の助手・調教対象より前だった場合はフラグを減算$/m],
      },
      { src: SRC, ref: '216-219', any: [/^				SIF FLAG:1 > LOCAL:1$/m] },
      { src: SRC, ref: '221-222', any: [/^				TARGET = FLAG:1$/m] },
      { src: SRC, ref: '224', any: [/^				CALL PARTY_CHAR_DEL, LOCAL:1$/m] },
      { src: SRC, ref: '226', any: [/^				DELCHARA LOCAL:1$/m] },
      { src: SRC, ref: '228', any: [/^				CALL NAME_RESET$/m] },
      { src: SRC, ref: '229', any: [/^				LOCAL:1 = -1$/m] },
      { src: SRC, ref: '230-231', any: [/^			ELSEIF LOCAL:5 >= 5000$/m] },
      { src: SRC, ref: '234', any: [/^	EX_FLAG:2802 = 0$/m] },
      {
        src: SRC,
        ref: '237-308',
        any: [/^IF EX_FLAG:2803 > 0 && EX_FLAG:2801 % 100 < 10		$/m],
      },
      {
        src: SRC,
        ref: '238',
        any: [/^        LOCALS = %SAVESTR:\(EX_FLAG:2803\)%$/m],
      },
      {
        src: SRC,
        ref: '239-240',
        any: [/^		PRINTFORMW 整个地下城，其实就是一个巨大的封印，$/m],
      },
      {
        src: SRC,
        ref: '240',
        any: [/^		PRINTFORMW 整个地下城，其实就是一个巨大的封印，$/m],
      },
      { src: SRC, ref: '241', any: [/^		FORCEWAIT$/m] },
      {
        src: SRC,
        ref: '242',
        any: [/^		PRINTFORMW 封印着魔王的力量，也封印着勇者的力量。$/m],
      },
      {
        src: SRC,
        ref: '243',
        any: [
          /^		PRINTFORMW 加上日常生活和战斗所需的魔力，连同地底不断涌出的魔力，$/m,
        ],
      },
      {
        src: SRC,
        ref: '244',
        any: [/^		PRINTFORMW 组成了地下城里错综复杂的魔力流动。$/m],
      },
      {
        src: SRC,
        ref: '245',
        any: [/^		PRINTFORMW 几只特别强大的怪物和你本人，会聚集大量的魔力。$/m],
      },
      {
        src: SRC,
        ref: '246',
        any: [
          /^		PRINTFORMW 但还是有一些魔力，从封印和法师们的掌控中流出，聚集到奴隶的身边。$/m,
        ],
      },
      {
        src: SRC,
        ref: '247',
        any: [
          /^		PRINTFORMW 你能感觉得到，有一个奴隶，与众不同，身边的魔力在不断聚集着。$/m,
        ],
      },
      {
        src: SRC,
        ref: '248',
        any: [
          /^		PRINTFORMW 因为她的力量已经强于你施加于她的封印，魔力之间相互碰撞，越来越不稳定了。$/m,
        ],
      },
      { src: SRC, ref: '249', any: [/^		PRINTFORMW $/m] },
      { src: SRC, ref: '250', any: [/^		PRINTFORMW 魔力失控！发生大爆炸！$/m] },
      {
        src: SRC,
        ref: '251',
        any: [/^		PRINTFORMW %LOCALS%被自己暴走的魔力炸得粉碎！$/m],
      },
      {
        src: SRC,
        ref: '252-271',
        any: [/^				;前回の助手・調教対象だった場合はフラグを空に$/m],
      },
      { src: SRC, ref: '253-254', any: [/^				SIF FLAG:1 == EX_FLAG:2803$/m] },
      { src: SRC, ref: '255-256', any: [/^				SIF FLAG:2 == EX_FLAG:2803$/m] },
      {
        src: SRC,
        ref: '258-261',
        any: [/^				;前回の助手・調教対象より前だった場合はフラグを減算$/m],
      },
      {
        src: SRC,
        ref: '258-262',
        any: [/^				;前回の助手・調教対象より前だった場合はフラグを減算$/m],
      },
      { src: SRC, ref: '264-265', any: [/^				TARGET = FLAG:1$/m] },
      { src: SRC, ref: '267', any: [/^				CALL PARTY_CHAR_DEL, EX_FLAG:2803$/m] },
      { src: SRC, ref: '269', any: [/^				DELCHARA EX_FLAG:2803$/m] },
      { src: SRC, ref: '271', any: [/^				CALL NAME_RESET$/m] },
      { src: SRC, ref: '274-306', any: [/^		DO$/m] },
      { src: SRC, ref: '275', any: [/^			LOCAL:1 = RAND:CHARANUM$/m] },
      { src: SRC, ref: '276', any: [/^			LOCAL:5 \+\+$/m] },
      {
        src: SRC,
        ref: '278',
        any: [
          /^				PRINTFORMW %SAVESTR:\(LOCAL:1\)%因为房间就在%LOCALS%的旁边，也被她暴走的魔力波及了。$/m,
        ],
      },
      {
        src: SRC,
        ref: '279',
        any: [/^				PRINTFORMW %SAVESTR:\(LOCAL:1\)%也被炸死了。$/m],
      },
      {
        src: SRC,
        ref: '280-299',
        any: [/^				;前回の助手・調教対象だった場合はフラグを空に$/m],
      },
      { src: SRC, ref: '281-282', any: [/^				SIF FLAG:1 == LOCAL:1$/m] },
      { src: SRC, ref: '283-284', any: [/^				SIF FLAG:2 == LOCAL:1$/m] },
      {
        src: SRC,
        ref: '286-290',
        any: [/^				;前回の助手・調教対象より前だった場合はフラグを減算$/m],
      },
      { src: SRC, ref: '292-293', any: [/^				TARGET = FLAG:1$/m] },
      { src: SRC, ref: '295', any: [/^				CALL PARTY_CHAR_DEL, LOCAL:1$/m] },
      { src: SRC, ref: '297', any: [/^				DELCHARA LOCAL:1$/m] },
      { src: SRC, ref: '299', any: [/^				CALL NAME_RESET$/m] },
      { src: SRC, ref: '301', any: [/^				LOCAL:1 = -1$/m] },
      { src: SRC, ref: '303', any: [/^			ELSEIF	LOCAL:5 >= 5000$/m] },
      { src: SRC, ref: '303-305', any: [/^			ELSEIF	LOCAL:5 >= 5000$/m] },
      { src: SRC, ref: '307', any: [/^		EX_FLAG:2803 = 0$/m] },
      {
        src: SRC,
        ref: '310-332',
        any: [/^IF EX_FLAG:2804 == 1 && EX_FLAG:2801 % 100 < 10					$/m],
      },
      {
        src: SRC,
        ref: '311-312',
        any: [/^	PRINTFORMW 整个地下城，其实就是一个巨大的封印，$/m],
      },
      {
        src: SRC,
        ref: '312',
        any: [/^	PRINTFORMW 整个地下城，其实就是一个巨大的封印，$/m],
      },
      { src: SRC, ref: '313', any: [/^	FORCEWAIT$/m] },
      {
        src: SRC,
        ref: '314',
        any: [/^	PRINTFORMW 封印着魔王的力量，也封印着勇者的力量。$/m],
      },
      {
        src: SRC,
        ref: '315',
        any: [
          /^	PRINTFORMW 加上日常生活和战斗所需的魔力，连同地底不断涌出的魔力，$/m,
        ],
      },
      {
        src: SRC,
        ref: '316',
        any: [/^	PRINTFORMW 组成了地下城里错综复杂的魔力流动。$/m],
      },
      {
        src: SRC,
        ref: '317',
        any: [/^	PRINTFORMW 几只特别强大的怪物和你本人，会聚集大量的魔力。$/m],
      },
      {
        src: SRC,
        ref: '318',
        any: [/^	PRINTFORMW 但最近，你感觉魔力在身边聚集越来越多，挥之不去。$/m],
      },
      {
        src: SRC,
        ref: '319',
        any: [
          /^	PRINTFORMW 你能感觉得到，各式各样的魔力在体内不停汇聚着，相互冲击。$/m,
        ],
      },
      { src: SRC, ref: '320', any: [/^	PRINTFORMW 好难受！！！$/m] },
      {
        src: SRC,
        ref: '321',
        any: [
          /^	PRINTFORMW 终于有一天，你再也无法控制。感觉到一股暖流从身体喷涌而出！$/m,
        ],
      },
      { src: SRC, ref: '322', any: [/^	PRINTFORMW $/m] },
      { src: SRC, ref: '323', any: [/^	EX_FLAG:2804 = 0$/m] },
      {
        src: SRC,
        ref: '324',
        any: [/^	PRINTFORMW 你的魔力失控！发生大爆炸！$/m],
      },
      {
        src: SRC,
        ref: '325',
        any: [/^	PRINTFORMW 巨大的威力，将你本人和整个地下城都化为齑粉。$/m],
      },
      {
        src: SRC,
        ref: '326',
        any: [
          /^	PRINTFORMW 四界都能感受到大地的颤抖，余波引起的海啸和地震，摧毁了无数地方。$/m,
        ],
      },
      {
        src: SRC,
        ref: '327',
        any: [
          /^	PRINTFORMW 这次事件造成的伤亡，比你所有侵攻的造成的伤害还要多，世人将这次爆炸称为【大冲击】。$/m,
        ],
      },
      { src: SRC, ref: '328', any: [/^	PRINTFORMW $/m] },
      {
        src: SRC,
        ref: '329',
        any: [
          /^	PRINTL -------------------------------GAMEOVER---------------------------------$/m,
        ],
      },
      { src: SRC, ref: '330', any: [/^	INPUT$/m] },
      { src: SRC, ref: '330-334', any: [/^	INPUT$/m] },
      { src: SRC, ref: '331', any: [/^	QUIT$/m] },
      { src: SYSSRC, ref: '758', any: [/^BEGIN SHOP$/m] },
    ],
  },
];

export const LOG_REFS = [];
export const SAMPLE_LOG_REFS = {};
