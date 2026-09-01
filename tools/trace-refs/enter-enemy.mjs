// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：enter-enemy.mjs

export const FILES = [
  // —— #171 H2 勇者来袭：ere/event/enter-enemy.js。锚由源文件逐行原文
  //    生成（ENTER_ENEMY.ERB 全量 + GET_ENEMY 调用方的两行 INVASION.ERB）。 ——
  {
    js: 'ere/event/enter-enemy.js',
    refs: [
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '1-164',
        any: [/@ENTER_ENEMY,ARG:0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '7-8',
        any: [/LOCAL = 10/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '10-13',
        any: [/;FLAG:60 = 勇者基礎レベル補正/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '11-13',
        any: [/;SIF DAY:2 > LOCAL \&\& ARG:0 == 0 \&\& FL/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '14-16',
        any: [/SIF ARG:0 == 0 \|\| TALENT:\(ARG:0\):村娘Ａ/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '18-19',
        any: [/CALL K_34_crazylord/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '21-32',
        any: [/;フラグ確保/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '34',
        any: [
          /;キャラが多すぎる場合中断\(STICK修改，按照侵攻进度限制勇者数量\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '34-47',
        any: [/IF FLAG:82 == 0 \&\& CHARANUM > 60/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '35-36',
        any: [/IF FLAG:82 == 0 \&\& CHARANUM > 60/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '35-47',
        any: [/IF FLAG:82 == 0 \&\& CHARANUM > 60/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '37-38',
        any: [/ELSEIF FLAG:87 == 0 \&\& FLAG:89 == 0 \&\&/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '39-40',
        any: [/ELSEIF \(\(FLAG:87 \* FLAG:89 == 0\) \&\& \(F/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '41-42',
        any: [/ELSEIF \(FLAG:87 == 0 \|\| FLAG:89 == 0 \|/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '43-44',
        any: [/ELSEIF FLAG:92 < 15  \&\& CHARANUM > 80/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '45-46',
        any: [/ELSEIF CHARANUM >= MAX_CHARANUM/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '50',
        any: [/CHARA = RAND\(1, 17\)/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '51-52',
        any: [/;GETCHARA\(キャラ番号, SPフラグ\)でキャラが存在しない場合は\-1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '53',
        any: [/IF GETBIT\(FLAG:5,32\) \|\| GETCHARA\(CHARA/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '55-60',
        any: [/IF ARG:0 > 0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '56',
        any: [/LOCAL = 0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '57',
        any: [/ADDCHARA CHARA/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '58',
        any: [/CALL ADDCHARA_EX, CHARANUM\-1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '59-60',
        any: [/A = CHARANUM \- 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '62-72',
        any: [/CALL CHAR_MAKE_INPORT/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '63',
        any: [/CALL CHAR_MAKE_INPORT/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '65',
        any: [/LOCAL = 0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '66',
        any: [/ADDCHARA CHARA/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '67',
        any: [/CALL ADDCHARA_EX, CHARANUM\-1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '68-69',
        any: [/A = CHARANUM \- 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '71',
        any: [/LOCAL = 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '73',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '73-91',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '74-75',
        any: [/SIF LOCAL/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '76-77',
        any: [/SIF TALENT:RESULT:1000/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '78-82',
        any: [/IF TALENT:RESULT:122/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '83-84',
        any: [/PRINTS SAVESTR:RESULT/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '85',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      { src: 'target/ERB/EVENT/ENTER_ENEMY.ERB', ref: '86', any: [/WAIT/] },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '87-91',
        any: [/IF FLAG:5 \& 2/],
      },
      { src: 'target/ERB/EVENT/ENTER_ENEMY.ERB', ref: '93-96', any: [/ELSE/] },
      { src: 'target/ERB/EVENT/ENTER_ENEMY.ERB', ref: '98', any: [/PRINTL/] },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '99',
        any: [/A = RESULT/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '101-103',
        any: [/SIF CFLAG:A:151 < \-100/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '105',
        any: [/CALL ENTERENEMY_KOUJO/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '107-133',
        any: [/LOCAL = 0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '110',
        any: [/LOCAL = 0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '111-112',
        any: [/SIF TALENT:A:126/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '114-115',
        any: [/SIF TALENT:A:315 == 7 \|\| TALENT:A:315 /],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '117-118',
        any: [/SIF TALENT:A:315 == 8 \|\| TALENT:A:315 /],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '120-121',
        any: [/SIF TALENT:A:316 == 2 \|\| TALENT:A:316 /],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '123-124',
        any: [/SIF TALENT:A:316 == 9 \|\| TALENT:A:316 /],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '128',
        any: [/LOCAL \+= CFLAG:A:9/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '131',
        any: [/LOCAL = LOCAL <= 0 \? 0 \# LOCAL/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '133',
        any: [/CFLAG:A:580 \+= LOCAL/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '135-156',
        any: [/LOCAL:0 = RAND:32/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '140-154',
        any: [/LOCAL:0 = RAND:32/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '143-151',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '158-162',
        any: [/IF GETBIT\(FLAG:8, 1\)/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '160',
        any: [/CALL SHOW_CHARA_INFO, A/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '164',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '169-221',
        any: [/@K_11_LILY/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '173-174',
        any: [/SIF FLAG:223 == 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '176-177',
        any: [/SIF DAY < 200 \|\| GETCHARA\(17\) < 0 \|\| G/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '178',
        any: [/LOCAL = GETCHARA\(17\)/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '180-181',
        any: [/SIF LOCAL < 0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '183-184',
        any: [/SIF TALENT:LOCAL:85 == 0 \&\& TALENT:LOC/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '186-187',
        any: [/SIF CFLAG:LOCAL:1 != 0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '189',
        any: [/ADDCHARA 24/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '190',
        any: [/CALL ADDCHARA_EX, CHARANUM\-1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '194',
        any: [/FLAG:223 = 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '196',
        any: [/A = CHARANUM \- 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '197',
        any: [/SAVESTR:A = %NAME:A%/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '198',
        any: [/CSTR:A:1 = %NAME:A%/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '200',
        any: [/CFLAG:A:550 = 40/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '202',
        any: [/TARGET = A/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '203',
        any: [/CALL WEARING_CLOTH_ABLE/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '204',
        any: [/CALL CHAR_BODY_GENERATE_WAPPED, A/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '205',
        any: [/CALL FAMILY_REGISTER\(A\)/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '206',
        any: [/TARGET = FLAG:1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '207',
        any: [/CFLAG:A:501 = 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '208',
        any: [/CFLAG:A:502 = 0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '209',
        any: [/CFLAG:A:1 = 2/],
      },
      { src: 'target/ERB/EVENT/ENTER_ENEMY.ERB', ref: '210', any: [/PRINTL/] },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '211',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '212',
        any: [
          /PRINTL 魔王的地下城附近的村子里有一对姐妹。她们没有双亲，一起在亲戚的/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '213',
        any: [
          /PRINTL 某一天，魔王复活了，妹妹也同时下落不明。姐姐像是发疯一般地四处/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '214',
        any: [
          /PRINTW 又过了半年，姐姐终于下定了决心，前往魔王的地下城。一只手拿着提/,
        ],
      },
      { src: 'target/ERB/EVENT/ENTER_ENEMY.ERB', ref: '215', any: [/PRINTL/] },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '216-218',
        any: [/PRINT 村娘/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '219',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '220',
        any: [/CALL ENTERENEMY_KOUJO/],
      },
      { src: 'target/ERB/EVENT/ENTER_ENEMY.ERB', ref: '221', any: [/PRINTL/] },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '224-323',
        any: [/@K_34_crazylord/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '228-229',
        any: [/SIF FLAG:224 == 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '231',
        any: [/SIF DAY < 350 \|\| GETCHARA\(20\) < 0 \|\| G/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '233',
        any: [/LOCAL = GETCHARA\(20\)/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '235-236',
        any: [/SIF LOCAL < 0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '238-239',
        any: [/SIF TALENT:LOCAL:85 == 0 \&\& TALENT:LOC/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '241-242',
        any: [/SIF CFLAG:LOCAL:1 != 0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '244-245',
        any: [/SIF FLAG:92 != 15/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '247',
        any: [/ADDCHARA 34/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '248',
        any: [/CALL ADDCHARA_EX, CHARANUM\-1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '252',
        any: [/FLAG:224 = 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '254',
        any: [/A = CHARANUM \- 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '255',
        any: [/SAVESTR:A = %NAME:A%/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '256',
        any: [/CSTR:A:1 = %NAME:A%/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '258-267',
        any: [/IF FLAG:500 == 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '270',
        any: [/TARGET = A/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '271',
        any: [/CALL WEARING_CLOTH_ABLE/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '272',
        any: [/CALL CHAR_BODY_GENERATE_WAPPED, A/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '273',
        any: [/TARGET = FLAG:1/],
      },
      { src: 'target/ERB/EVENT/ENTER_ENEMY.ERB', ref: '275', any: [/PRINTL/] },
      { src: 'target/ERB/EVENT/ENTER_ENEMY.ERB', ref: '276', any: [/PRINTL/] },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '277',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '278',
        any: [
          /PRINTL 狡猾的狂王，原来对作为情妇和亲卫队长的金红桃也不是推心置腹。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '279',
        any: [/PRINTL 在对你已经唯命是从的金红桃身上，没有得到任何情报。/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '280',
        any: [
          /PRINTL 其它的人也是对狂王的行踪一无所知，各地的魔物也没有找到狂王。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '281',
        any: [
          /PRINTL 正当你满脑疑惑和不安的时候，一个蓝发红眼的身影出现在地下城门口/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '282',
        any: [/PRINTL 迈着悠闲的步伐，一抬手就将守门的怪物全灭了，是狂王？！/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '283',
        any: [/PRINTL 不对，这幽波纹的流动，证明了她只是狂王的替身！/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '284',
        any: [
          /PRINTL 既是她，也不是她…………但不管如何，她带着再次封印你的斗志，向/,
        ],
      },
      { src: 'target/ERB/EVENT/ENTER_ENEMY.ERB', ref: '285', any: [/PRINTW/] },
      { src: 'target/ERB/EVENT/ENTER_ENEMY.ERB', ref: '286', any: [/PRINTL/] },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '287-288',
        any: [/PRINT 狂王的替身/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '289',
        any: [/PRINTL 开始了地下城的攻略！/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '290',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '291',
        any: [/CALL ENTERENEMY_KOUJO/],
      },
      { src: 'target/ERB/EVENT/ENTER_ENEMY.ERB', ref: '292', any: [/PRINTL/] },
      { src: 'target/ERB/EVENT/ENTER_ENEMY.ERB', ref: '293', any: [/PRINTL/] },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '294-295',
        any: [
          /PRINTFORML \[0\] 夭寿啦！！来人哪！！护驾？！！！护驾？！～！？/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '296-300',
        any: [/CFLAG:A:501 = 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '297',
        any: [/CFLAG:A:501 = 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '298',
        any: [/CFLAG:A:502 = 0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '299',
        any: [/CFLAG:A:1 = 2/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '300',
        any: [/CFLAG:A:508 = 3/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '303',
        any: [/CFLAG:A:6 = RAND:80/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '305-320',
        any: [/LOCAL:0 = RAND:32/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '306-317',
        any: [/LOCAL:0 = RAND:32/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '323',
        any: [/RETURN 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '326-405',
        any: [/@GET_ENEMY/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '331-344',
        any: [/IF FLAG:82 == 0 \&\& CHARANUM > 60/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '332-344',
        any: [/IF FLAG:82 == 0 \&\& CHARANUM > 60/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '347',
        any: [/CHARA = RAND\(1, 17\)/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '349-359',
        any: [/CALL CHAR_MAKE_INPORT,10/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '350',
        any: [/CALL CHAR_MAKE_INPORT,10/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '353',
        any: [/ADDCHARA CHARA/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '354',
        any: [/CALL ADDCHARA_EX, CHARANUM\-1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '355-356',
        any: [/A = CHARANUM \- 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '358',
        any: [/LOCAL = 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '360',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '360-373',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '361-362',
        any: [/SIF LOCAL/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '363-364',
        any: [/SIF TALENT:RESULT:1000/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '365-369',
        any: [/IF TALENT:RESULT:122/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '370',
        any: [/PRINTS SAVESTR:RESULT/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '371',
        any: [/PRINTL 被俘虏了！/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '372',
        any: [
          /PRINTL \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/,
        ],
      },
      { src: 'target/ERB/EVENT/ENTER_ENEMY.ERB', ref: '373', any: [/WAIT/] },
      { src: 'target/ERB/EVENT/ENTER_ENEMY.ERB', ref: '374', any: [/PRINTL/] },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '375',
        any: [/A = RESULT/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '377-379',
        any: [/SIF CFLAG:A:151 < \-100/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '381-385',
        any: [/CFLAG:A:501 = 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '382',
        any: [/CFLAG:A:501 = 1/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '383',
        any: [/CFLAG:A:502 = 0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '384',
        any: [/CFLAG:A:1 = 0/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '385',
        any: [/CFLAG:A:508 = 3/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '387-402',
        any: [/LOCAL:0 = RAND:32/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '388-399',
        any: [/LOCAL:0 = RAND:32/],
      },
      {
        src: 'target/ERB/EVENT/ENTER_ENEMY.ERB',
        ref: '405',
        any: [/RETURN A/],
      },
      {
        src: 'target/ERB/侵略/INVASION.ERB',
        ref: '884',
        any: [/CALL GET_ENEMY/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
