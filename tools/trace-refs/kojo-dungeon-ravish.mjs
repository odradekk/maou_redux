// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-dungeon-ravish.mjs

export const FILES = [
  {
    js: 'ere/kojo/kojo-dungeon-ravish.js',
    refs: [
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1-7',
        any: [/@RYOUZYOKU,ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2-175',
        any: [/@RYOUZYOKU,ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '3',
        any: [/#DIM VIRGIN/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '4',
        any: [/#DIM MON_COUNT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '5',
        any: [/#DIM MON_FEAR/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '9',
        any: [/VIRGIN = TALENT:ARG:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '11',
        any: [/PRINTFORML %SAVESTR:ARG%将被凌辱――/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '12',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '13',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '14',
        any: [/IF 立绘/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '14-17',
        any: [/CALL CHA_IMG2\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '18',
        any: [/CALL SHOW_DATA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '19',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '21-29',
        any: [/PRINTL \[0\] - 旁观凌辱/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '21',
        any: [/PRINTL \[0\] - 旁观凌辱/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '22',
        any: [/PRINTL \[1\] - 不要凌辱/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '23-29',
        any: [/\$INPUT_LOOP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '24',
        any: [/INPUT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '26',
        any: [/GOTO INPUT_LOOP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '28',
        any: [/GOTO INPUT_LOOP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '31',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '34-54',
        any: [/MON_COUNT = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '35',
        any: [/MON_COUNT = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '36',
        any: [/MON_FEAR = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '41-44',
        any: [/LOCAL = MON_COUNT \+ 99/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '41',
        any: [/LOCAL = MON_COUNT \+ 99/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '43-44',
        any: [/LOCAL = MON_COUNT \+ 7/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '46',
        any: [/LOCAL = MON_COUNT \+ 7/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '48',
        any: [/LOCAL:1 = E:MON_COUNT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '50',
        any: [/SIF CFLAG:ARG:130 == LOCAL:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '51',
        any: [/MON_FEAR = MON_COUNT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '53',
        any: [/MON_COUNT \+= 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '57',
        any: [/TARGET = ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '58',
        any: [/CALL DUNGEON_RYOUZYOKU/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '60-160',
        any: [/MON_COUNT = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '60',
        any: [/MON_COUNT = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '62',
        any: [/LOCAL = MON_COUNT \+ 7/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '63',
        any: [/LOCAL:1 = E:MON_COUNT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '65',
        any: [/PRINTFORMW %MONSTERNAME\(LOCAL:1\)%的凌辱开始了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '67',
        any: [/CFLAG:ARG:130 = LOCAL:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '68',
        any: [/MON_FEAR = LOCAL:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '69',
        any: [/CFLAG:ARG:131 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '71',
        any: [/PRINTFORMW %MONSTERNAME\(LOCAL:1\)%的凌辱开始了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '72',
        any: [/CFLAG:ARG:131\+\+/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '74',
        any: [/PRINTFORMW %MONSTERNAME\(LOCAL:1\)%的凌辱开始了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '76',
        any: [/B = MON_COUNT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '77-156',
        any: [/CALL ORC_RYOU男,ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '158',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '159',
        any: [/MON_COUNT \+= 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '162-166',
        any: [/TALENT:0 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '163',
        any: [/TALENT:0 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '164',
        any: [/PRINTL 【处女丧失】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '165',
        any: [/CFLAG:15 = 104/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '168',
        any: [/CALL DUNGEON_RYOUZYOKU_AFTER/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '172',
        any: [/CALL DUNGEON_RYOUZYOKU_ESCAPE,ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '174',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '177-802',
        any: [/@ORC_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '177',
        any: [/@ORC_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '179-183',
        any: [/PRINTW 『把这家伙绑起来…』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '181',
        any: [/;男人の場合/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '183',
        any: [/PRINTW 『把这家伙绑起来…』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '185-231',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '186-198',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '190-199',
        any: [/DATAFORM 『被俺侬的…肉棒…俘虏了啊』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '199-210',
        any: [/DATAFORM 『噗嘻嘻唏、俺侬的同类啦』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '204-213',
        any: [/DATAFORM 『延伸不错哟…』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '211-222',
        any: [/DATAFORM 『腚儿转过来』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '218-227',
        any: [/DATAFORM 『哦…又是…』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '224-236',
        any: [/DATAFORM 『又输了啊？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '232-242',
        any: [/DATAFORM 『这…这家伙…喔哦…』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '237-251',
        any: [/DATAFORM 『别挣扎了……』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '246-256',
        any: [/DATAFORM 『女…女人…喔哦…』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '256',
        any: [/DATAFORM 『今天大伙运气不错，哈哈哈！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '261',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '263-275',
        any: [/PRINTW 『可恶！这家伙有封印！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '265',
        any: [/PRINTW 『可恶！这家伙有封印！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '266',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，一摸上去/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '267',
        any: [/PRINTFORMW 『行啊你！我就不信你把便便的洞也封住了！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '268',
        any: [/PRINTFORMW %SAVESTR:ARG%的另一个穴，被发泄了兽欲……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '269',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '270',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '271',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '272',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '273',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '274',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '277-391',
        any: [/PRINTFORML %SAVESTR:ARG%被一只兽人推倒，拼命抽插着，射满/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '280-283',
        any: [/DATAFORM 『你……是我的东西了…』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '285',
        any: [/PRINTFORML %SAVESTR:ARG%被一只兽人推倒，拼命抽插着，射满/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '286',
        any: [
          /PRINTL 她四肢着地趴在地上，脸贴着地板，随着身后的抽插不停地哭泣。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '287',
        any: [/PRINTL 私处经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '288',
        any: [/PRINTL 精液经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '289',
        any: [/EXP:ARG:0 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '290',
        any: [/EXP:ARG:20 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '292-296',
        any: [/PRINTFORMW %SAVESTR:ARG%咬着嘴唇忍受着凌辱……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '294',
        any: [/PRINTFORMW %SAVESTR:ARG%咬着嘴唇忍受着凌辱……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '295',
        any: [/PRINTFORMW 在那刚强的脸上，精液无情地飞撒着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '296',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '297',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '299',
        any: [/PRINTFORMW %SAVESTR:ARG%耷拉着头，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '302',
        any: [/PRINT 四肢着地趴在地上，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '304-308',
        any: [/PRINT 硬毛露了出来/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '305',
        any: [/PRINT 硬毛露了出来/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '307',
        any: [/PRINT 隐约看见了阴毛/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '310-318',
        any: [/PRINT 美丽的屁股从后露了出来/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '312',
        any: [/PRINT 美丽的屁股从后露了出来/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '315',
        any: [/PRINT 大的屁股从后露了出来/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '317',
        any: [/PRINT 屁股从后露了出来/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '320-326',
        any: [/PRINTDATA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '321-325',
        any: [/DATAFORM 阴茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '328',
        any: [/PRINTL 便插了进去，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '330',
        any: [/PRINT 脸上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '331-374',
        any: [/PRINTL 流露着沉浸在了羞耻与情欲之中的神色……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '335',
        any: [/PRINTL 流露着沉浸在了羞耻与情欲之中的神色……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '336',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 12\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '337',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '339',
        any: [/PRINTL 的神情为屈服的喜悦与口水所浸染……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '340',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 12\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '341',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '347',
        any: [/PRINTL 流露着在羞耻与快乐间彷徨的神色……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '351',
        any: [/PRINTL 隐约露出了屈服的喜悦……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '356-360',
        any: [/PRINTL 被眼泪浸湿了……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '358',
        any: [/PRINTL 被眼泪浸湿了……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '359',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '360',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '363',
        any: [/PRINTL 浸染着羞耻的神色……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '364',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '368',
        any: [/PRINTL 的表情因愤怒而扭曲……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '370',
        any: [/PRINTL 染上了绝望的神色……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '371',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '378',
        any: [/EXP:ARG:0 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '379',
        any: [/EXP:ARG:20 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '383',
        any: [/PRINTL 『处女诶！　恭喜破处啦……』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '386',
        any: [/PRINTL 『这家伙被强奸着都湿了啊』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '388',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '390',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '393-485',
        any: [/PRINTW 『呃……这家伙，简直就是经验丰富的妓女嘛～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '396-398',
        any: [/DATAFORM 『喂！闭嘴……别吵啦！快点喝下去！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '401-406',
        any: [/PRINTW 『呃……这家伙，简直就是经验丰富的妓女嘛～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '403',
        any: [/PRINTW 『呃……这家伙，简直就是经验丰富的妓女嘛～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '404',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '405',
        any: [/PRINTFORMW 兽人抵受不住她那灵活的舌头，射在%SAVESTR:ARG%/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '406',
        any: [/MON_NUM \*= 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '410',
        any: [/PRINTFORM 无头骑士的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '412',
        any: [/PRINTFORM %SAVESTR:ARG%/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '415',
        any: [/PRINTFORM 身体被固定住了，只剩下脑袋来像飞机杯似的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '417',
        any: [/PRINTFORM 全裸地/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '419',
        any: [/PRINTFORMW 侍奉着兽人们的阴茎。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '420',
        any: [/PRINTFORMW 只要喝掉所有\{MON_NUM\}只兽人的精液的话，它们就答应/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '422',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '422-461',
        any: [/PRINTFORM 毫无犹豫、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '426',
        any: [/PRINTFORM 毫无犹豫、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '429',
        any: [/PRINTFORM 小心翼翼地、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '432',
        any: [/PRINTFORM 一边土下座扭着腰部的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '435',
        any: [/PRINTFORM 期待与羞耻将脸染红的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '438',
        any: [/PRINTFORM 为了守住自己处女的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '440',
        any: [/PRINTFORM 面露期待的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '444',
        any: [/IF TALENT:ARG:13/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '446',
        any: [/PRINTFORM 老实遵从于兽人的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '449',
        any: [/PRINTFORM 煞有其事地、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '452',
        any: [/PRINTFORM 不住向阴茎献媚的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '455',
        any: [/PRINTFORM 面对阴茎羞红了脸的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '460',
        any: [/PRINTFORM 已然无法反抗的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '463',
        any: [/IF TALENT:ARG:11/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '465',
        any: [/PRINTFORM 带着反抗的目光看着它们，其中一只兽人对她怒喝了一声，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '470',
        any: [
          /PRINTFORM 迫于兽人的威胁，她衡量了一下得失之后，老实地接受了屈辱的命运/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '475',
        any: [/PRINTFORM 提心吊胆地/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '478',
        any: [/PRINTFORM 嘿嘿媚笑着/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '481',
        any: [/PRINTFORM 不敢直视肉棒而闭上了眼睛/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '488',
        any: [/PRINTFORM %SAVESTR:ARG%把/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '488-496',
        any: [/PRINTFORM %SAVESTR:ARG%把/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '489-495',
        any: [/PRINTDATA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '498',
        any: [/PRINT 含了下去，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '499-505',
        any: [/PRINTW 『呃……这家伙，简直就是经验丰富的妓女嘛～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '503',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '504',
        any: [/PRINTFORMW 兽人抵受不住她那灵活的舌头，射在%SAVESTR:ARG%/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '507',
        any: [/ELSEIF TALENT:ARG:21/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '509',
        any: [/PRINTFORM 像工作一样地奉仕着，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '512',
        any: [/PRINTFORM 不禁发出了粗俗的声音，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '515',
        any: [/PRINTFORM 很快地抓住了奉仕的诀窍，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '518',
        any: [/PRINTFORM 忍受着腥臭味，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '521',
        any: [/PRINTFORM 拼命地用舌头奉仕着，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '524',
        any: [/PRINTL 奉仕持续了下去……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '526',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '527',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '529-530',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '530',
        any: [/;初吻/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '532-614',
        any: [/CFLAG:16 = 995/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '540-542',
        any: [/DATAFORM 『兄弟们，把所有的穴都塞满哦！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '545',
        any: [/PRINTFORMW %SAVESTR:ARG%被\{MON_NUM\}只兽人用积存/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '546',
        any: [
          /PRINTW 她用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '546-552',
        any: [
          /PRINTW 她用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '547',
        any: [/PRINTFORMW %SAVESTR:ARG%的脸和性器都用精液化上了妆。兽人/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '549',
        any: [/PRINT 兽人的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '552-556',
        any: [/DATAFORM 阴茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '556-568',
        any: [/PRINTFORM 插进了%SAVESTR:ARG%的喉咙深处，射精的同时喷溅出/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '559',
        any: [/PRINTFORM 插进了%SAVESTR:ARG%的喉咙深处，射精的同时喷溅出/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '562',
        any: [/PRINT 眼镜上飞撒着……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '564',
        any: [/PRINT 可爱的眼睛上飞撒着……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '566',
        any: [/PRINT 漂亮的鼻子里喷了出来……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '568',
        any: [/PRINT 光鲜亮丽的头发上飞撒着……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '569-574',
        any: [/PRINT 脸上飞撒着……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '570',
        any: [/PRINT 脸上飞撒着……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '572',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '576-583',
        any: [/PRINTFORMW 在那刚强的脸上，精液无情地飞撒着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '582',
        any: [/PRINTFORMW 在凌辱开始不久后，渐渐地听到了妩媚的娇喘声。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '583',
        any: [/PRINTFORMW 『喔！这家伙有感觉了哦！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '584',
        any: [/PRINTFORMW %SAVESTR:ARG%被快感冲击着，忍不住主动扭着腰。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '585',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '586',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '589',
        any: [
          /PRINTW 她用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '592-608',
        any: [/PRINTW/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '594',
        any: [/PRINTW/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '595',
        any: [/PRINTFORM 兽人们把润滑液涂在了%SAVESTR:ARG%的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '598',
        any: [/PRINT 漂亮的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '600',
        any: [/PRINT 漂亮的屁股的缝隙中的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '602',
        any: [/PRINT 大的屁股的缝隙中的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '604',
        any: [/PRINT 无毛额/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '606',
        any: [/PRINT 肌肉明显的两腿间的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '608',
        any: [/PRINT 从阴阜到肛门都被茂密的阴毛所覆盖的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '610',
        any: [/PRINT 长着茂盛的阴毛的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '613',
        any: [/PRINTL 性器和肛门上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '614',
        any: [/PRINTFORM 在%SAVESTR:ARG%的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '618',
        any: [/PRINT 魁梧的身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '621',
        any: [/PRINT 娇小的身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '624',
        any: [/PRINT 松松垮垮的身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '627',
        any: [/PRINT 紧致的身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '630',
        any: [/PRINT 窈窕的身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '632',
        any: [/PRINT 纤细的身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '634',
        any: [/PRINT 肉感的身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '636',
        any: [/PRINT 身体上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '639',
        any: [/PRINTL 像要挤爆她似的激烈地持续侵犯着……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '641',
        any: [
          /PRINTW 她用空洞的眼神望向地下城那阴暗的天花板，眼里完全失去了焦点。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '645',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '646',
        any: [/PRINTFORML 私处经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '647',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '648',
        any: [/PRINTFORML 口交经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '650-651',
        any: [/EXP:ARG:0 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '651',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '653-734',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '663-665',
        any: [
          /DATAFORM 『你不要做人了。从今往后就是家畜了。像猪一样叫几声来听听。』/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '668',
        any: [/PRINTFORM %SAVESTR:ARG%全裸地四肢着地趴在地下、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '672',
        any: [/PRINT 浑身颤抖着、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '675',
        any: [/PRINT 怒目圆睁着、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '678',
        any: [/PRINT 拼命服从着、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '681',
        any: [/PRINT 拼命献媚着、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '684',
        any: [/PRINT 羞红了脸、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '685-691',
        any: [/PRINTW 屈辱地模仿猪叫……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '687',
        any: [/PRINTW 屈辱地模仿猪叫……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '689',
        any: [/PRINTFORMW \{MON_NUM\}只兽人看到这个情形都笑了。完全没有了光辉/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '693',
        any: [/PRINTFORMW %SAVESTR:ARG%的脸犹如发烧一般，不停地重复着上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '693-699',
        any: [/PRINTFORMW %SAVESTR:ARG%的脸犹如发烧一般，不停地重复着上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '694',
        any: [/PRINTFORMW 好像因为被视奸，而有了感觉。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '701',
        any: [/PRINTFORMW %SAVESTR:ARG%好像因为被骂而有了感觉。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '702',
        any: [/PRINTFORMW 『明明就是母猪，还说自己是冒险者！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '703',
        any: [/PRINTFORMW %SAVESTR:ARG%连眼神都湿润了～/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '705',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '708',
        any: [/PRINTFORM 『猪/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '714',
        any: [/;情けない/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '717',
        any: [/PRINTFORM 还自称冒险者……简直傻了/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '721-726',
        any: [/CALL GOBI_KOUJO, 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '728',
        any: [/PRINTFORMW 　噗噗，噗嘻！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '732',
        any: [/PRINTFORMW %SAVESTR:ARG%抛弃了自尊心，拼命地求饶着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '733-770',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '740-746',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '742',
        any: [/PRINTW 『来试试，看能放多粗的东西进去？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '743',
        any: [/PRINTFORMW %SAVESTR:ARG%感受到了自己身上的危机，拼命地哀/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '744',
        any: [
          /PRINTFORMW 不过，她的身体依旧被兽人们牢牢抓住。M字开脚地把不设防的性/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '745',
        any: [
          /PRINTFORMW 其中一只兽人，拿起她的心爱的武器用柄的那端捅入她的私处。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '746',
        any: [/PRINTFORMW %SAVESTR:ARG%的喊叫声，回响在\{MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '748-754',
        any: [/PRINTFORMW 「好痛……不要啊……呜哇哇哇哇哇哇！」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '750',
        any: [/PRINTFORMW 「好痛……不要啊……呜哇哇哇哇哇哇！」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '751',
        any: [/PRINTFORMW %SAVESTR:ARG%受不了痛楚，高声哭喊着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '758',
        any: [/PRINTFORMW %SAVESTR:ARG%在痛楚中感到了愉悦。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '759',
        any: [/PRINTFORMW 难道自己是个潜在的性变态？这么想着，%SAVESTR:AR/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '760',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '761',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '765-796',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '771-777',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '773',
        any: [/PRINTW 『抬起屁股！然后说：请用！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '774',
        any: [/PRINTFORMW %SAVESTR:ARG%用屈辱的姿势抬起了屁股，把手扶在/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '775',
        any: [/PRINTFORMW 她完全被淹没在\{MON_NUM\}只兽人之中，兽人们大笑着，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '776',
        any: [/PRINTFORMW %SAVESTR:ARG%的呜咽，被兽人们的欢呼声掩埋在地/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '779-782',
        any: [/PRINTFORMW 随着凌辱的持续，%SAVESTR:ARG%的私处里渐渐滴出/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '780',
        any: [/PRINTFORMW 随着凌辱的持续，%SAVESTR:ARG%的私处里渐渐滴出/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '781',
        any: [
          /PRINTFORMW 『别这么快就去了啊！老子都不知道操哭多少人类女性了。』/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '782',
        any: [/PRINTFORMW %SAVESTR:ARG%呼出了炽热的气息，双腿直抖着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '788',
        any: [/PRINTFORMW 『喂！把腰抬起来！还没完呢！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '789',
        any: [/PRINTFORMW %SAVESTR:ARG%用冰冷的目光瞪了兽人们一眼。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '790',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '792',
        any: [/PRINTFORML 私处经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '793',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '803-894',
        any: [/@SLIME_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '803',
        any: [/@SLIME_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '806-812',
        any: [/PRINTW 黏液缠住了冒险者的腿，令他无法移动。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '809',
        any: [/PRINTW 黏液缠住了冒险者的腿，令他无法移动。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '810',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '815-820',
        any: [/DATAFORM 奇妙的黏液蠢动着……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '815-819',
        any: [/DATAFORM 奇妙的黏液蠢动着……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '822',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '824-839',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，将试图入/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '826',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，将试图入/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '827',
        any: [/PRINTFORMW 黏液迷茫了一会儿，但马上又发现了另一个突破口。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '828',
        any: [/PRINTFORMW %SAVESTR:ARG%的嘴巴和肛门，被灌入了黏液。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '834',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '836',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '837',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '840',
        any: [/PRINTW 黏液杀到了冒险者的嘴巴里。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '841',
        any: [/PRINTFORMW %SAVESTR:ARG%感觉呼吸困难，正挣扎着，突然呼吸/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '842-848',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '847',
        any: [/PRINTW 黏液杀到了冒险者的肛门里。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '848',
        any: [/PRINTFORMW %SAVESTR:ARG%被肛门里大量逆流的黏液弄的苦不堪/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '850-871',
        any: [/PRINTFORMW %SAVESTR:ARG%反弓起腰来、似乎沉浸于粘液的杠虐/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '851',
        any: [/PRINTFORMW %SAVESTR:ARG%反弓起腰来、似乎沉浸于粘液的杠虐/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '854',
        any: [/PRINTFORMW %SAVESTR:ARG%已然被粘液攻陷了……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '857',
        any: [/PRINTFORMW %SAVESTR:ARG%开始习惯被粘液涌入的感觉……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '859',
        any: [/PRINTW 冒险者在肛虐的痛苦中癫狂地惨叫着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '862',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '868',
        any: [/PRINTW 被全裸地四脚着地压在地上，黏液逆流到肛门里了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '869',
        any: [/PRINTFORMW %SAVESTR:ARG%腹部运劲，将黏液喷出肛门，但依然/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '870',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '873-878',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '875',
        any: [
          /PRINTW 黏液疯狂地凌辱着，大量的黏液灌入了直肠里让冒险者的肚子都膨胀了几分/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '876',
        any: [/PRINTFORMW %SAVESTR:ARG%坚强地试图站起来。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '877',
        any: [
          /PRINTFORMW 但是大量的黏液一下子又从肛门里汹涌地喷出来了，膝盖一软又跪/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '881-891',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '885',
        any: [/PRINTW 冒险者被包在黏液里，只露出头部发出呜呜的呻吟。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '886',
        any: [/PRINTFORMW 看来没人相救的话，%SAVESTR:ARG%要被消化在黏液/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '887',
        any: [/PRINTFORMW 但黏液持续的爱抚着身体，可能也会让%SHE\(ARG\)%溶化/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '888',
        any: [/PRINTFORMW 黏液的麻痹成分，渐渐把%SAVESTR:ARG%遭受凌辱的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '892-897',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '895-989',
        any: [/@INSECT_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '895',
        any: [/@INSECT_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '897',
        any: [/;---------------------------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '899',
        any: [/;男人の場合/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '899-903',
        any: [/PRINTW 节肢动物在冒险者的脖子上打入了麻痹毒素。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '900',
        any: [/IF TALENT:ARG:122/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '901',
        any: [/PRINTW 节肢动物在冒险者的脖子上打入了麻痹毒素。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '902',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '905-926',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '908-912',
        any: [/DATAFORM 节肢动物发出了喜悦的声音、冒险者缓缓地拥向了甲壳…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '917-921',
        any: [/DATAFORM 节肢动物发出了喜悦的声音、冒险者脱力了似的靠了上去…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '926-930',
        any: [/DATAFORM 节肢动物的甲壳像在欢迎似的攒动着…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '934-938',
        any: [/DATAFORM 节肢动物用甲壳摩擦着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '946',
        any: [/PRINTW 『叽吱叽吱叽吱……』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '947',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，节肢动物/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '948-965',
        any: [/PRINTFORMW 它怒了，将输卵管直接插入肛门里。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '948',
        any: [/PRINTFORMW 它怒了，将输卵管直接插入肛门里。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '949',
        any: [/PRINTFORMW %SAVESTR:ARG%因剧痛发出了凄厉的惨叫……/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB', ref: '959', any: [/^$/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '961',
        any: [/PRINTL 『叽吱叽吱叽吱……』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '962',
        any: [/PRINTFORML %SAVESTR:ARG%被节肢动物抓住，直接被输卵管插入/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '963',
        any: [/PRINTL 她不断地惨叫着，但节肢动物依旧毫不留情。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '964-975',
        any: [/PRINTL 私处经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '964',
        any: [/PRINTL 私处经验\+1/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB', ref: '969', any: [/^$/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '971',
        any: [/PRINTW 『叽吱叽吱叽吱……』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '972',
        any: [/PRINTFORMW %SAVESTR:ARG%的嘴巴被输卵管插入了，被播下了卵/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '977-984',
        any: [/PRINTW 『叽吱叽吱叽吱……』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '979',
        any: [/PRINTW 『叽吱叽吱叽吱……』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '980',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被输卵管插入了，被播下了卵/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '981',
        any: [/PRINTW 不喝下打虫药剂的话，魔界的虫子就会从肛门里孵化了吧。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '982',
        any: [/PRINTFORMW \{MON_NUM\}只节肢动物轮流扑在%SAVESTR:AR/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '985-992',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '990-1046',
        any: [/@IVY_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '990',
        any: [/@IVY_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '991',
        any: [/#DIM MON_NUM/],
      },
      { src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB', ref: '993', any: [/^$/] },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '994',
        any: [/;男人の場合/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '994-998',
        any: [/PRINTW 植物用藤蔓抢走了冒险者的武器。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '996',
        any: [/PRINTW 植物用藤蔓抢走了冒险者的武器。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '997',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1001-1006',
        any: [/DATAFORM 藤蔓把冒险者缠住了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1001-1005',
        any: [/DATAFORM 藤蔓把冒险者缠住了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1008',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1010-1021',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，将试图入/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1012',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，将试图入/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1013',
        any: [/PRINTFORMW 但是，本来就对纯洁这东西没概念的植物，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1014',
        any: [/PRINTFORMW 把目标转移到了%SAVESTR:ARG%的肛门……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1020',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1022',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1023',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1025-1030',
        any: [/PRINTW 藤蔓勒住了冒险者的脖子。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1026',
        any: [/PRINTW 藤蔓勒住了冒险者的脖子。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1027',
        any: [/PRINTFORMW %SAVESTR:ARG%呼吸困难，痛苦挣扎着，被开放的时/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1032-1042',
        any: [/PRINTW 藤蔓在冒险者的肛门里扎根了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1033',
        any: [/PRINTW 藤蔓在冒险者的肛门里扎根了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1034',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被蹂躏着，发出了喊破喉咙的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1035',
        any: [/PRINTW 藤蔓吸收到了足够的养分，一下子从直肠里连根拔走。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1041',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1043',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1044',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1047-1147',
        any: [/@SYOKUSYU_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1047',
        any: [/@SYOKUSYU_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1051-1055',
        any: [/PRINTW 冒险者的身体被触手缠住了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1053',
        any: [/PRINTW 冒险者的身体被触手缠住了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1054',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1057-1095',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1061-1065',
        any: [/DATAFORM 冒险者充满爱意地抚摸着蠕动的触手………/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1071-1076',
        any: [/DATAFORM 冒险者被形似男性生殖器的触手顶着、脸涨得通红/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1080-1084',
        any: [/DATAFORM 奇怪的触手，蠢动着……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1088',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1090-1103',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量保护着，触手一摸/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1092',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量保护着，触手一摸/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1093',
        any: [/PRINTFORMW 触手放弃了，向次要目标进发。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1094',
        any: [/PRINTFORMW %SAVESTR:ARG%的菊花，被强行撬开了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1100',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1102',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1103',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1105-1108',
        any: [/PRINTW 触手伸进了冒险者的嘴巴里。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1106',
        any: [/PRINTW 触手伸进了冒险者的嘴巴里。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1107',
        any: [/PRINTFORMW %SAVESTR:ARG%的喉咙被大量的体液灌入，呛到了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1110-1117',
        any: [/PRINTW 触手伸进了冒险者的肛门里。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1111',
        any: [/PRINTW 触手伸进了冒险者的肛门里。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1112',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被大量的体液灌入，直肠吸收/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1113',
        any: [/PRINTW 不一会儿，全身肌肉都松弛了，大量的浑浊体液从肛门流出。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1117',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1118-1124',
        any: [/PRINTW 仰面倒下的冒险者，正被触手侵犯着私处。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1119',
        any: [/PRINTW 仰面倒下的冒险者，正被触手侵犯着私处。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1120',
        any: [/PRINTFORMW %SAVESTR:ARG%不断悲鸣着，但被大量的体液灌入私/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1124',
        any: [/EXP:ARG:0 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1125-1134',
        any: [/PRINTW 触手把冒险者绑了起来，吊在半空。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1126',
        any: [/PRINTW 触手把冒险者绑了起来，吊在半空。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1127',
        any: [/PRINTFORMW %SAVESTR:ARG%的嘴巴也好，私处也好，肛门也好，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1128',
        any: [
          /PRINTFORMW ……不久，地上滴落的液体里，开始出现了触手体液之外的东西。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1133',
        any: [/EXP:ARG:0 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1134',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1135-1144',
        any: [/PRINTW 冒险者被触手吸着乳头，不断的挤奶。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1136',
        any: [/PRINTW 冒险者被触手吸着乳头，不断的挤奶。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1137',
        any: [/PRINTFORMW %SAVESTR:ARG%带着难以置信的表情，感受着触手的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1138',
        any: [/PRINTFORMW 不久之后%SHE\(ARG\)%感到乳房发胀，触手顺势开始了榨/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1139',
        any: [/PRINTFORMW 不久之后，%SAVESTR:ARG%母乳开始无法抑制地从乳/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1140',
        any: [/PRINTFORML 喷奶经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1141',
        any: [/EXP:ARG:54 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1143',
        any: [/PRINTFORMW 触手经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1144',
        any: [/EXP:ARG:55 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1145',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1148-1236',
        any: [/@FAILY_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1148',
        any: [/@FAILY_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1152-1156',
        any: [/PRINTW 『下次再来玩啊～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1154',
        any: [/PRINTW 『下次再来玩啊～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1155',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1158-1186',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1161-1165',
        any: [/DATAFORM 『小姐姐、还要再来呀』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1171-1176',
        any: [/DATAFORM 『小姐姐怎么了吗？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1180-1184',
        any: [/DATAFORM 『小姐姐，来做更Ｈ的事吧』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1188',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1190-1206',
        any: [/PRINTFORMW 『所谓的冒险者真是牢不可破啊！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1192',
        any: [/PRINTFORMW 『所谓的冒险者真是牢不可破啊！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1193',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，一摸上去/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1194',
        any: [/PRINTFORMW 妖精拿出了一根和自己身高相等的假阳具。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1195',
        any: [/PRINTFORMW 『小姐姐来享受这边的穴吧！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1196',
        any: [/PRINTFORMW %SAVESTR:ARG%的惨叫回响在洞窟里……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1202',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1204',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1205',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1207-1217',
        any: [/PRINTL 『小姐姐，要做我的肉便器吗？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1208',
        any: [/PRINTL 『小姐姐，要做我的肉便器吗？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1209',
        any: [/PRINTFORML %SAVESTR:ARG%的阴蒂，被一只妖精不停舔舐着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1210',
        any: [/PRINTFORML %SAVESTR:ARG%忍受着M字开脚的这份屈辱……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1211',
        any: [/PRINTL 阴核点数\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1212',
        any: [/JUEL:ARG:0 \+= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1214',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1215',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1218',
        any: [/PRINTW 『小姐姐的里面，是什么模样呢？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1219-1225',
        any: [/PRINTFORMW %SAVESTR:ARG%的私处被妖精钻入了。妖精对她的反/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1219',
        any: [/PRINTFORMW %SAVESTR:ARG%的私处被妖精钻入了。妖精对她的反/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1221',
        any: [/PRINTFORML 私处点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1224',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1225',
        any: [/PRINTW 『舔舔看！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1226-1232',
        any: [/PRINTFORMW %SAVESTR:ARG%的阴蒂和两乳头都被妖精们舔舐着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1226',
        any: [/PRINTFORMW %SAVESTR:ARG%的阴蒂和两乳头都被妖精们舔舐着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1227',
        any: [/PRINTW 身体在妖精们的欺负下越发苦闷了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1228',
        any: [/PRINTFORML 阴核点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1235',
        any: [/^$/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1236',
        any: [/;---------------------------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1237-1407',
        any: [/@GIANT_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1237',
        any: [/@GIANT_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1241-1245',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1243',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1244',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1247-1275',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1250-1254',
        any: [/DATAFORM 『瓦全的　变成了　灰机杯了呀』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1260-1265',
        any: [/DATAFORM 『哈哈　熟络起来了欸』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1269-1273',
        any: [/DATAFORM 『看起来值得凌辱一番。』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1273',
        any: [/DATAFORM 『真是太小啦！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1277',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1279-1293',
        any: [/PRINTFORMW 『你这家伙，尽然被封印了』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1282',
        any: [/PRINTFORMW 『你这家伙，尽然被封印了』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1283',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，巨人无法/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1284',
        any: [/PRINTFORMW 『尾指的话，应该能进去』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1285',
        any: [/PRINTFORMW %SAVESTR:ARG%狭窄的肛门，被巨人粗壮的尾指捅入/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1290',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1292',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1293',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1295-1310',
        any: [/PRINTL 『喝下去哦』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1296',
        any: [/PRINTL 『喝下去哦』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1297',
        any: [/PRINTFORML %SAVESTR:ARG%侍奉着一只巨人，不过怎么张嘴都吞/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1298',
        any: [/PRINTFORML 绝顶了的巨人，把精液从头到脚浇了%SHE\(ARG\)%一身。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1299',
        any: [/PRINTL 口交经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1301',
        any: [/EXP:ARG:22 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1302',
        any: [/EXP:ARG:20 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1304-1305',
        any: [/SIF CFLAG:16 == -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1305',
        any: [/CFLAG:16 = 995/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1307',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1308',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1310-1343',
        any: [/PRINTFORMW 『简直就像洋娃娃一样』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1311',
        any: [/PRINTFORMW 『简直就像洋娃娃一样』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1312',
        any: [/PRINTFORMW %SAVESTR:ARG%的腰被巨人抓着，用巨大的阴茎贯穿/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1313',
        any: [/PRINTFORMW 『喂！还要继续的啊！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1315-1323',
        any: [/PRINTFORMW %SAVESTR:ARG%因为平时的训练，勉强保留着意识。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1317',
        any: [/PRINTFORMW %SAVESTR:ARG%因为平时的训练，勉强保留着意识。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1318',
        any: [/PRINTFORMW 『不错的声音哦！来吧！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1319',
        any: [/PRINTFORMW %SAVESTR:ARG%痛苦得基本叫不出声了，拼命地忍受/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1323-1326',
        any: [/PRINTFORMW 经历过最初的失禁以及失神之后，%SHE\(ARG\)%已经不知/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1325',
        any: [/PRINTFORMW 经历过最初的失禁以及失神之后，%SHE\(ARG\)%已经不知/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1330',
        any: [/PRINTFORML 阴道扩张经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1331',
        any: [/PRINTFORML 异常经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1332',
        any: [/EXP:ARG:0 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1333',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1334',
        any: [/EXP:ARG:50 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1335',
        any: [/EXP:ARG:53 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1336-1360',
        any: [/PRINTW 『快点啊！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1337',
        any: [/PRINTW 『快点啊！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1338',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地舔舐着巨人的阴茎。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1339',
        any: [/PRINTFORMW %SHE\(ARG\)%拼命地哀求着，请饶了%SHE\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1340',
        any: [/PRINTFORMW 必须快点搞定这\{MON_NUM\}只巨人，不然不知道他们什么/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1342-1349',
        any: [/PRINTW 『哦！小东西，你很擅长用舌头嘛！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1344',
        any: [/PRINTW 『哦！小东西，你很擅长用舌头嘛！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1345',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地用舌头侍奉着，展现出天赋般/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1346',
        any: [/PRINTFORMW 巨人被%SHE\(ARG\)%灵活的舌头弄射了，精液像喷泉一样/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1347',
        any: [/MON_NUM \*= 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1352',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1353',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1355-1356',
        any: [/SIF CFLAG:16 == -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1356',
        any: [/CFLAG:16 = 995/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1357-1385',
        any: [/PRINTW 『哦！小东西，叫得不错嘛！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1358',
        any: [/PRINTW 『哦！小东西，叫得不错嘛！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1359',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被巨人强行用阴茎贯穿，撕裂/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1360',
        any: [/PRINTFORMW 『又一个坏掉了吗？用点回复药或许可以再来几下。』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1361',
        any: [
          /PRINTFORMW 插坏了的肛门，用了回复药之后被继续玩弄着，直到满足了所有\{/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1363-1373',
        any: [/PRINTFORMW %SAVESTR:ARG%竭尽全力地企图爬走，但是被轻易地/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1365',
        any: [/PRINTFORMW %SAVESTR:ARG%竭尽全力地企图爬走，但是被轻易地/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1366',
        any: [/PRINTFORMW 『喂！这里有个想逃跑的！抓住%SHE\(ARG\)%！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1367',
        any: [/PRINTFORMW %SAVESTR:ARG%被巨人抓着四肢，那不设防的肛门，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1375',
        any: [/PRINTFORML 肛门扩张经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1380',
        any: [/EXP:ARG:53 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1381',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1382',
        any: [/PRINTW 『我想到好主意了』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1383',
        any: [
          /PRINTFORMW 巨人们不知为何开始集体打飞机，集中射在巨大的水盆里。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1384-1403',
        any: [/PRINTFORMW %SAVESTR:ARG%对未知状况非常恐惧。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1384',
        any: [/PRINTFORMW %SAVESTR:ARG%对未知状况非常恐惧。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1385',
        any: [/PRINTFORMW 巨人端着一大盆精液，对%SHE\(ARG\)%说，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1386',
        any: [/PRINTFORMW 『不想死的话，就全部喝光。』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1387',
        any: [/PRINTFORMW %SAVESTR:ARG%脸上血色褪尽。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1391',
        any: [/PRINTFORMW %SAVESTR:ARG%用冷淡的眼神瞪着巨人，表示不从。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1392-1401',
        any: [/PRINTFORMW 『看来还不明白啊！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1392',
        any: [/PRINTFORMW 『看来还不明白啊！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1393',
        any: [/PRINTFORMW 巨人用巨大的手掌按着%SAVESTR:ARG%的头，直接把/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1394',
        any: [/PRINTFORMW 「咕噜，咕噜，咕咕噜」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1395',
        any: [/PRINTFORMW 巨人把%SHE\(ARG\)%的头抓起来，那张满脸精液的脸上，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1401',
        any: [/PRINTFORML 精液经验\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1405',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1407',
        any: [/;---------------------------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1408-1665',
        any: [/@MAN_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1408',
        any: [/@MAN_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1412-1416',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1414',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1415',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1418-1446',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1421-1425',
        any: [/DATAFORM 『已经、离不开我们了吗』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1431-1436',
        any: [/DATAFORM 『哦、又来啦』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1440-1444',
        any: [/DATAFORM 『真是好女人啊！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1448',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1450-1462',
        any: [/PRINTFORMW 『笨女人，前面严防死守，后面却全是破绽。』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1452',
        any: [/PRINTFORMW 『笨女人，前面严防死守，后面却全是破绽。』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1453',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量保护着，不过没能/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1454',
        any: [/PRINTFORMW 『来吧！让菊花绽放！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1455',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被插入了，不断地被灌入了精/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1458',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1459',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1461',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1462',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1464-1474',
        any: [/PRINTL 『如果作为肉便器被卖掉了话，我每晚都来抱你～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1465',
        any: [/PRINTL 『如果作为肉便器被卖掉了话，我每晚都来抱你～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1466',
        any: [/PRINTFORML %SAVESTR:ARG%被魔族男人从后侵犯着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1467',
        any: [
          /PRINTL 她四肢着地趴在地上，脸贴着地板，随着身后的抽插不停地哭泣。/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1470',
        any: [/EXP:ARG:0 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1471',
        any: [/EXP:ARG:20 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1473',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1474',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1476-1507',
        any: [/PRINTFORMW 『完全没有胸嘛！屁股露出来，抬高点！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1478-1481',
        any: [/PRINTFORMW 『完全没有胸嘛！屁股露出来，抬高点！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1479',
        any: [/PRINTFORMW 『完全没有胸嘛！屁股露出来，抬高点！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1480',
        any: [/PRINTFORMW %SAVESTR:ARG%露出了屈辱的神色，向魔族男人翘起/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1483',
        any: [/PRINTW 『用胸部来…乳交你不知道？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1485',
        any: [/PRINTFORMW %SAVESTR:ARG%全裸地侍奉着兽人们的阴茎。只要喝/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1487-1494',
        any: [/PRINTFORMW 被%SAVESTR:ARG%傲人的丰满胸部夹着，魔族男人们/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1489',
        any: [/PRINTFORMW 被%SAVESTR:ARG%傲人的丰满胸部夹着，魔族男人们/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1490',
        any: [/PRINTFORMW 『喔！真是一双好乳房啊……阴茎专用的乳房！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1491',
        any: [/PRINTFORMW 胸部的触感让%SAVESTR:ARG%红晕满脸，低下了头。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1495-1498',
        any: [/PRINTFORMW 『接下来用嘴！鸡鸡都被你弄脏了，弄干净！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1497',
        any: [/PRINTFORMW 『接下来用嘴！鸡鸡都被你弄脏了，弄干净！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1498',
        any: [/PRINTFORMW %SAVESTR:ARG%依照吩咐，用嘴巴侍奉着阴茎……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1502',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1503',
        any: [/EXP:ARG:22 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1505-1506',
        any: [/SIF CFLAG:16 == -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1506',
        any: [/SIF CFLAG:16 == -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1507',
        any: [/CFLAG:16 = 995/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1508-1584',
        any: [/PRINTFORMW %SAVESTR:ARG%被强行宣布为肉便器，全身都被写满/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1511',
        any: [/PRINTFORMW %SAVESTR:ARG%被强行宣布为肉便器，全身都被写满/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1514',
        any: [/PRINTFORM %SAVESTR:ARG%的身上，被写着/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1517',
        any: [/PRINT 【处女开通纪念】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1519',
        any: [/PRINT 【最喜欢阴茎】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1524',
        any: [/PRINT 【性冷淡便器】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1529',
        any: [/PRINT 【千金小姐便器出道】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1534',
        any: [/PRINT 【又粘又湿】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1539',
        any: [/PRINT 【愉悦的脸】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1544',
        any: [/PRINT 【乳牛】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1549',
        any: [/PRINT 【有鸡鸡的奴隶】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1553',
        any: [/PRINT 【操我】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1555',
        any: [/PRINT 【肛门免费】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1555-1564',
        any: [/PRINT 【肛门免费】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1557',
        any: [/PRINT 【母猪】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1560',
        any: [/PRINTFORM 之类的话。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1562',
        any: [
          /PRINTFORMW 络绎不绝的魔族男人，将嘴巴、私处、肛门等等地方都侵犯了，精/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1563',
        any: [/PRINTFORMW 当被最后一人抱着的时候，%SAVESTR:ARG%已经失去/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1564',
        any: [/PRINTFORMW 地下城里，充斥着\{MON_NUM\}人份的精液和爱液的异样臭/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1569',
        any: [/PRINTFORMW %SAVESTR:ARG%的蓝色肌肤，被沾满了精液……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1571',
        any: [/;褐色肌肤/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1572',
        any: [/PRINTFORMW %SAVESTR:ARG%健康的褐色肌肤，与白浊的精液形成/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1573',
        any: [/ELSEIF TALENT:ARG:255/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1574',
        any: [/;白皙/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1575',
        any: [/PRINTFORMW %SAVESTR:ARG%美丽的白皙肌肤被精液玷污了……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1576-1577',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1578-1600',
        any: [/PRINTFORML 私处经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1586-1591',
        any: [/SIF CFLAG:16 == -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1590',
        any: [/PRINTW 『明明是冒险者，却忍不住了吗？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1591',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被灌入了灌肠液，忍受着强烈/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1592',
        any: [
          /PRINTFORMW 『快点自慰！在漏出来之前自慰去了的话就带你上厕所！』/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1593',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地自慰着，但是在这异常的状况/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1594',
        any: [/PRINTFORMW 肛门里的污物，终于无法忍耐地飞散而出。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1595',
        any: [/PRINTFORMW 魔族男人们看到这样，毫不留情地说着侮蔑的话，%SAVEST/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1599',
        any: [/PRINTFORMW %SAVESTR:ARG%因自己拉出的东西的味道而皱起眉头/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1600',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1601-1623',
        any: [/JUEL:ARG:9 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1606',
        any: [/PRINTL 自慰经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1607',
        any: [/PRINTL 调教自慰经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1608-1612',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1611',
        any: [/EXP:ARG:11 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1613',
        any: [/PRINTW 『那个冒险者大人，在舔我的肛门哦！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1614',
        any: [/PRINTFORMW %SAVESTR:ARG%以舔肛门为代价，获得了魔族男人对/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1614-1618',
        any: [/PRINTFORMW %SAVESTR:ARG%以舔肛门为代价，获得了魔族男人对/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1615',
        any: [/PRINTFORMW 『你的尊严，真不值钱呢！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1616',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地侍奉着，听到这话，心里想死/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1617',
        any: [/PRINTFORMW 侍奉结束之后，%SAVESTR:ARG%还被迫要说出淫秽的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1621',
        any: [/PRINTFORMW 自尊心低下的%SAVESTR:ARG%，拼命地说着自己是舔/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1622',
        any: [/Y \+= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1624-1653',
        any: [/PRINTFORMW %SAVESTR:ARG%因为舔肛而恶心地吐了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1627',
        any: [/PRINTFORMW %SAVESTR:ARG%因为舔肛而恶心地吐了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1628',
        any: [/Y \+= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1630-1635',
        any: [/PRINTFORML 苦痛点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1636',
        any: [/PRINTW 『这个为了保命就来者不拒的妓女！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1637',
        any: [/PRINTFORMW %SAVESTR:ARG%屁股翘起，用屈辱的姿势承受着不知/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1637-1642',
        any: [/PRINTFORMW %SAVESTR:ARG%屁股翘起，用屈辱的姿势承受着不知/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1638',
        any: [
          /PRINTFORMW 『说！说我是个相对于做冒险者，更喜欢做妓女的淫乱贱婊！』/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1639',
        any: [/PRINTFORMW %SAVESTR:ARG%在激烈的抽插中，不断地重复着屈辱/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1643',
        any: [/PRINTFORMW %SAVESTR:ARG%拼命地重复着淫乱的话语乞求饶命，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1650',
        any: [/PRINTFORMW 说着过激的言语，%SAVESTR:ARG%的心里产生了情欲/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1651',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1652',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1656',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1657',
        any: [/PRINTFORML 精液经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1658',
        any: [/EXP:ARG:0 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1666-2046',
        any: [/@GIRL_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1666',
        any: [/@GIRL_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1670-1672',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1673-1779',
        any: [/PRINTW 『嘻嘻，真是好孩子呢』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1676-1684',
        any: [/PRINTW 『嘻嘻，真是好孩子呢』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1676',
        any: [/PRINTW 『嘻嘻，真是好孩子呢』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1678',
        any: [/PRINTW 『让姐姐来教你一些好事！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1680',
        any: [/PRINTW 『哎呀？勃起了么？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1683',
        any: [/PRINTW 『可悲的人呢，勃起了么？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1690',
        any: [/PRINTFORMW 『独占你了！难道这是第一次？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1691-1727',
        any: [/PRINTFORMW %SAVESTR:ARG%被魔界的女人口交着，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1691',
        any: [/PRINTFORMW %SAVESTR:ARG%被魔界的女人口交着，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1692',
        any: [/PRINTFORM 紫色的长舌头，在%SAVESTR:ARG%的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1694',
        any: [/PRINT 巨根/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1696',
        any: [/PRINT 短小包茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1698',
        any: [/PRINT 包茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1701',
        any: [/PRINT 马阴茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1704',
        any: [/PRINT 阴茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1706',
        any: [/PRINTFORMW 上舔舐着，吸取着精气。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1708',
        any: [/PRINTW 『好大，下巴都要脱落了♪』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1710',
        any: [/PRINTW 『冒险者大人的这里，像小孩子一样♪』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1712',
        any: [/PRINTW 『让我帮你把包皮里的污垢弄干净吧』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1715',
        any: [/PRINTW 『呵呵，被谁改造的？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1718',
        any: [/PRINTW 『加油哦！不要一下子就射了哦♪』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1722',
        any: [/PRINTFORML 绝顶经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1723',
        any: [/PRINTFORML 射精经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1725',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1726',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1728-1762',
        any: [/EXP:ARG:3 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1731',
        any: [
          /PRINTFORMW 『大家一起来帮他含，一下就射的话，就要好好处罚你喔！』/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1735',
        any: [/PRINT 巨根/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1739',
        any: [/PRINT 包茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1742',
        any: [/PRINT 马阴茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1745',
        any: [/PRINT 阴茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1751',
        any: [/PRINTW 『冒险者大人的这里，小孩子一样♪』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1762',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1763',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1764-1790',
        any: [/PRINTFORML 绝顶经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1773',
        any: [
          /PRINTFORMW 『让魔界的女人来教你什么才是女人的滋味……试过一次你就不会/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1774',
        any: [/PRINTFORMW %SAVESTR:ARG%被魔界的女性跨坐在身上，吸取着精/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1778',
        any: [/PRINTW 『哎呀，好大♪』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1781',
        any: [/PRINTW 『小的都不知道你进来了没有……♪』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1784',
        any: [/PRINTW 『好，好厉害……好大，好棒』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1785',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1786',
        any: [/;普通・包茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1787',
        any: [/PRINTW 『加油哦！不要一下子就射了哦♪』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1788-1814',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 15\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1790',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 15\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1791',
        any: [/PRINTFORML 屈服点数\+\{MON_NUM \* 15\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1792',
        any: [/PRINTFORML 性交经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1803',
        any: [/PRINTFORMW 『胸部，味道好吗？舔个没完呢～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1804',
        any: [/PRINTFORMW %SAVESTR:ARG%被魔界的女性一边喂奶，一边被撸着/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1805',
        any: [/PRINTFORM 紫色的手，温柔地在%SAVESTR:ARG%的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1807',
        any: [/PRINT 巨根/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1809',
        any: [/PRINT 短小包茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1811',
        any: [/PRINT 包茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1814',
        any: [/PRINT 马阴茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1817',
        any: [/PRINT 阴茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1819',
        any: [/PRINTFORMW 上爱抚着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1821',
        any: [/PRINTW 『好大啊……来享受快乐吧♪』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1822',
        any: [/ELSEIF TALENT:ARG:318 == 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1823',
        any: [/PRINTW 『带皮的短小鸡鸡♪变得黏糊糊的～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1825',
        any: [/PRINTW 『帮你剥皮除垢哦～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1826',
        any: [/ELSEIF TALENT:ARG:318 == 4/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1827',
        any: [/;自然発生はしない/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1830-1859',
        any: [/PRINTW 『加油哦！不要一下子就射了哦♪』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1834',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 5\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1852-1856',
        any: [/DATAFORM 『完全沉迷其中了呀』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1861-1866',
        any: [/DATAFORM 『哎呀、又来了呀』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1862',
        any: [/DATAFORM 『故意输的？　啊哈哈』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1864-1890',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1870-1877',
        any: [/DATAFORM 『是异性恋也无所谓哦～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1872',
        any: [/DATAFORM 『在你坏掉之前可不会停哦』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1874',
        any: [/DATAFORM 『这就让你的身体变得再也不需要男人吧』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1883-1885',
        any: [/IF TALENT:ARG:273/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1887',
        any: [/PRINTFORMW 『真是较真。这样的孩子反而容易觉醒后面的快感呢～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1887-1891',
        any: [/PRINTFORMW 『真是较真。这样的孩子反而容易觉醒后面的快感呢～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1889',
        any: [/PRINT 『这边的穴/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1894',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1895',
        any: [/PRINTW 个中滋味 好好感・受・吧』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1896',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1898',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量保护着，不过没能/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1899-1915',
        any: [/PRINTFORMW 『放松一些。以后还会经常被这么玩的啦～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1900',
        any: [/PRINTFORMW 『放松一些。以后还会经常被这么玩的啦～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1900-1905',
        any: [/PRINTFORMW 『放松一些。以后还会经常被这么玩的啦～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1902',
        any: [/PRINTW 『舒服的话就好好发出声音来才好哦？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1904',
        any: [/PRINTFORMW %SAVESTR:ARG%肛门里的皱褶，被魔族女性仔细地舔/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1910',
        any: [/PRINTFORMW %SAVESTR:ARG%感到心中有什么在蠢动着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1910-1914',
        any: [/PRINTFORMW %SAVESTR:ARG%感到心中有什么在蠢动着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1915',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM \* 5\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1917',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1919',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1920',
        any: [/^$/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1922-1931',
        any: [/PRINTL 『弄得好的话就好好奖励你』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1923',
        any: [/PRINTL 『弄得好的话就好好奖励你』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1925',
        any: [/PRINTL 『那样子弄，完全不舒服嘛』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1926-1930',
        any: [/PRINTL 『再好好努力哦』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1927',
        any: [/PRINTL 『再好好努力哦』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1929',
        any: [/PRINTFORML %SAVESTR:ARG%被强迫着舔舐魔族女人的阴部。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1930',
        any: [/PRINTL 她像狗一样的趴在地上，拼命地侍奉着自己的女主人。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1933',
        any: [/;百合气质・双性恋/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1934-1949',
        any: [/PRINTFORMW %SAVESTR:ARG%感到心中有什么在蠢动着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1939',
        any: [/PRINTL 百合经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1941-1945',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1946',
        any: [/PRINTW 『你的新职业就是舔舐奴隶了哦！原冒险者大人♪』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1947',
        any: [/PRINTFORMW %SAVESTR:ARG%全裸着像狗一样地侍奉着魔族女性，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1950',
        any: [/;百合气质・双性恋/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1951',
        any: [/PRINTFORMW %SAVESTR:ARG%感到心中有什么在蠢动着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1952',
        any: [/PRINTFORML 欲情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1953-1969',
        any: [/JUEL:ARG:5 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1956',
        any: [/PRINTFORML 百合经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1959',
        any: [/PRINTW 『哎呀，这么粗的也没问题吗？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1960',
        any: [/PRINTFORMW %SAVESTR:ARG%成为了魔族女人们的玩具，私处和肛/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1961',
        any: [/PRINTFORMW 空闲的嘴巴也被强行要求舔舐，爱液喷到了脸上。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1961-1965',
        any: [/PRINTFORMW 空闲的嘴巴也被强行要求舔舐，爱液喷到了脸上。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1962',
        any: [/PRINTFORMW 不知不觉间，大家都兴奋了，就在外头，以%SAVESTR:A/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1963',
        any: [/PRINTFORMW %SAVESTR:ARG%和\{MON_NUM\}个魔族女孩肉/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1970',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1973-1990',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1979',
        any: [/PRINTW 『想尿尿了呢～』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1980',
        any: [/PRINTFORMW %SAVESTR:ARG%有讨厌的预感。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1980-1984',
        any: [/PRINTFORMW %SAVESTR:ARG%有讨厌的预感。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1981',
        any: [
          /PRINTFORMW 『对了，要把我的尿喝光哦！不然不会放过你的。要是洒出来了，/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1982',
        any: [/PRINTFORMW %SAVESTR:ARG%的嘴巴被魔族女性压在阴部处，对着/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1983',
        any: [/PRINTFORMW 尿液无情地从嘴里不断灌入……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1984',
        any: [/PRINTFORMW 魔族女人们，看着一边哭泣一边喝尿的%SAVESTR:ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1995',
        any: [/PRINTFORML 百合经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1996',
        any: [/EXP:ARG:40 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1997',
        any: [/JUEL:ARG:8 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '1998-2011',
        any: [/JUEL:ARG:6 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2000',
        any: [/PRINTW 『快点，在大家面前自慰哦！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2001',
        any: [/PRINTFORMW %SAVESTR:ARG%在众目睽睽之下被迫自慰着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2002',
        any: [
          /PRINTFORMW 『这样的自慰可是女人的专利哦。从今往后就当百合奴隶吧，原冒/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2003',
        any: [/PRINTFORMW %SAVESTR:ARG%的周围，魔族女孩们正以奇妙的方式/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2004',
        any: [/PRINTFORMW 在%SHE\(ARG\)%感觉自己性癖都在扭曲的时候，魔族女孩/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2004-2008',
        any: [/PRINTFORMW 在%SHE\(ARG\)%感觉自己性癖都在扭曲的时候，魔族女孩/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2011',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2013',
        any: [/PRINTFORML 耻情点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2015',
        any: [/PRINTL 自慰经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2016',
        any: [/PRINTL 调教自慰经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2017',
        any: [/PRINTL 绝顶经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2026',
        any: [/PRINTW 『也想强奸一次女人呢～♪』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2027',
        any: [/PRINTFORMW %SAVESTR:ARG%的屁股被抬高，以屈辱的姿态，迎接/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2028',
        any: [/PRINTFORMW 『哈哈～好姐妹啊～被女人侵犯，兴奋起来了吗？』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2029',
        any: [/PRINTFORMW %SAVESTR:ARG%被女人侵犯着，在这异常的性爱中，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2033',
        any: [/PRINTFORMW %SAVESTR:ARG%为心中萌发的感情而感到兴奋……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2047-2153',
        any: [/@BEAST_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2047',
        any: [/@BEAST_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2051-2055',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2053',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2054',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2057-2085',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2060-2064',
        any: [/DATAFORM 冒险者从魔兽的发臭的气息中感受到了爱意/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2070-2075',
        any: [/DATAFORM 冒险者渐渐习惯了魔兽的发臭的气息……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2079-2083',
        any: [/DATAFORM 『咕噜咕噜噜』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2087',
        any: [/MON_NUM = E:\(B \+ 99\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2089-2105',
        any: [/PRINTFORMW 『噢！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2091',
        any: [/PRINTFORMW 『噢！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2092',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量守卫着，魔兽转而/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2093',
        any: [/PRINTFORMW 「啊！呜！不要啊……啊啊啊！」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2094',
        any: [/PRINTFORMW %SAVESTR:ARG%的肛门被野兽的阴茎蹂躏了……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2096-2100',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和野兽做爱/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2098',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和野兽做爱/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2105',
        any: [/PRINTFORMW 兽奸经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2106',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2107',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2109',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2110',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2112-2126',
        any: [/PRINTW 野兽压在冒险者的身上。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2114',
        any: [/PRINTW 野兽压在冒险者的身上。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2115',
        any: [/PRINTFORMW %SAVESTR:ARG%的私处被野兽野蛮地侵犯了，高声尖/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2116',
        any: [/PRINTFORMW 不一会儿，野兽在%SHE\(ARG\)%体内射出了精液……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2117-2121',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和野兽做爱/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2125',
        any: [/PRINTW 私处经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2126',
        any: [/EXP:ARG:0 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2127',
        any: [/PRINTFORMW 兽奸经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2128',
        any: [/EXP:ARG:56 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2129',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2131-2149',
        any: [/PRINTW 野兽们，开始轮番兽奸冒险者。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2133',
        any: [/PRINTW 野兽们，开始轮番兽奸冒险者。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2134',
        any: [/PRINTFORMW %SAVESTR:ARG%无法面对自己被野兽轮奸的事实，保/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2135-2139',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和野兽做爱/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2144',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2148',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2149',
        any: [/PRINTFORMW 兽奸经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2154-2236',
        any: [/@BRAIN_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2154',
        any: [/@BRAIN_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2158-2162',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2160',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2161',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2163-2191',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2166-2170',
        any: [
          /DATAFORM 冒险者几经食脑魔脑改造后、不仅不抵抗了、还满是媚态地纠缠在一起/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2176-2180',
        any: [/DATAFORM 冒险者在食脑魔的脑改造后、逐渐感到习惯了……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2184-2188',
        any: [/DATAFORM 冒险者对食脑魔早有耳闻，吓得屁滚尿流了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2193',
        any: [/^$/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2195-2206',
        any: [/PRINTFORMW 食脑魔咬住冒险者的头，开始支配%SHE\(ARG\)%的精神。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2196',
        any: [/PRINTFORMW 食脑魔咬住冒险者的头，开始支配%SHE\(ARG\)%的精神。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2197',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量保护着，不过食脑/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2198',
        any: [/PRINTFORMW 「啊…啊…啊…啊…啊……」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2199',
        any: [/PRINTFORMW %SAVESTR:ARG%眼珠上翻，伸出舌头，脱粪了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2200',
        any: [/PRINTFORML 肛门经验\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2202',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2204',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2205',
        any: [/^$/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2207-2217',
        any: [/PRINTL 「啊…啊…啊……呜，喔！……啊……」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2208',
        any: [/PRINTL 「啊…啊…啊……呜，喔！……啊……」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2209',
        any: [/PRINTFORML %SAVESTR:ARG%的头盖骨被食脑魔用坚硬的触手贯通/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2210',
        any: [/PRINTFORML %SHE\(ARG\)%的四肢狂乱地挥动，失禁，死掉了……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2211',
        any: [/BASE:ARG:0 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2213',
        any: [/EXP:ARG:50 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2215',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2216',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2218-2226',
        any: [/PRINTL 「啊…啊…啊……呜，喔！……啊……」/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2220',
        any: [/PRINTFORML %SAVESTR:ARG%的头盖骨被食脑魔用坚硬的触手贯通/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2222',
        any: [/BASE:ARG:0 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2224',
        any: [/EXP:ARG:50 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2226',
        any: [/PRINTFORMW 食脑魔的触手缠绕着冒险者，%SHE\(ARG\)%死命地挣扎，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2227-2234',
        any: [/PRINTFORMW 食脑魔的触手，直接突入到%SAVESTR:ARG%的脑子里/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2227',
        any: [/PRINTFORMW 食脑魔的触手，直接突入到%SAVESTR:ARG%的脑子里/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2228',
        any: [/PRINTFORMW %SAVESTR:ARG%被过度的快感弄失禁了，成了废人。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2229',
        any: [/PRINTFORMW 幸好，躯干还是完好的。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2233',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2235',
        any: [/^$/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2236',
        any: [/;---------------------------------------/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2237-2343',
        any: [/@HORSE_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2237',
        any: [/@HORSE_RYOU\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2241-2245',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2243',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2244',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2247-2275',
        any: [/IF CFLAG:ARG:131 > 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2250-2254',
        any: [
          /DATAFORM 冒险者不仅不再抵抗与马的交尾、甚至带着期待的眼神伸手触摸着马的/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2260-2264',
        any: [/DATAFORM 冒险者放弃了抵抗、轻轻戳了戳勃起的马阴茎……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2268-2272',
        any: [/DATAFORM 『唔哦哦！』/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2277',
        any: [/^$/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2279-2297',
        any: [
          /PRINTFORMW 养马人给马的阴茎施加了缩小的魔法，让它变小至适应肛门的大小/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2280',
        any: [
          /PRINTFORMW 养马人给马的阴茎施加了缩小的魔法，让它变小至适应肛门的大小/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2281',
        any: [/PRINTFORMW %SAVESTR:ARG%的纯洁被神圣力量保护着，不过没能/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2282',
        any: [
          /PRINTFORMW 『你很有素质嘛～看在这个份上，就用魔法让你好受些。』/,
        ],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2283',
        any: [/PRINTFORMW %SAVESTR:ARG%不得不用肛门承受着兽奸……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2286-2290',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和马做爱…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2287',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和马做爱…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2295',
        any: [/EXP:ARG:1 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2296',
        any: [/EXP:ARG:20 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2297',
        any: [/EXP:ARG:56 \+= MON_NUM/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2299',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2300',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2302-2317',
        any: [/PRINTW 马压在冒险者的身上。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2303',
        any: [/PRINTW 马压在冒险者的身上。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2304',
        any: [/PRINTFORMW %SAVESTR:ARG%的私处被马野蛮地侵犯了，高声尖叫/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2305',
        any: [/PRINTFORMW 不一会儿，马在%SHE\(ARG\)%体内射出了精液……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2307-2311',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和马做爱…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2314',
        any: [/PRINTW 私处经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2316',
        any: [/PRINTFORMW 兽奸经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2317',
        any: [/EXP:ARG:56 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2319-2339',
        any: [/PRINTW 好几匹马，开始轮番兽奸冒险者。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2321',
        any: [/PRINTW 好几匹马，开始轮番兽奸冒险者。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2322',
        any: [/PRINTFORMW %SAVESTR:ARG%无法面对自己被马轮奸的事实，保持/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2323-2327',
        any: [/PRINTFORMW 身为狼人的%SAVESTR:ARG%貌似不太反感和马做爱…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2332',
        any: [/PRINTFORML 恐怖点数\+\{MON_NUM \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2336',
        any: [/JUEL:ARG:10 \+= MON_NUM \* 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2337',
        any: [/PRINTFORMW 兽奸经验\+\{MON_NUM\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2344-2770',
        any: [/@PC_RYOU, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2344',
        any: [/@PC_RYOU, ARG:0, ARG:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2350',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2351',
        any: [/DRAWLINE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2352',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2353',
        any: [/IF 立绘/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2354-2357',
        any: [/CALL CHA_IMG2\(ARG:1\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2355',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2357',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2359-2365',
        any: [/PRINTL \[1\] - 不要凌辱/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2360-2366',
        any: [/\$INPUT_LOOP/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2364',
        any: [/ELSEIF RESULT >= 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2366',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2368',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2370',
        any: [/;武器チェック/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2372-2381',
        any: [/W:0 = 40/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2372',
        any: [/;素手の場合剑を装備/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2373-2377',
        any: [/W:0 = 40/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2374',
        any: [/W:0 = 40/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2375',
        any: [/CFLAG:\(ARG:0\):550 = W:0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2378',
        any: [/Y = 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2379',
        any: [/;武器分岐/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2380',
        any: [/IF W:1 == 49/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2382-2446',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%用触手把%SAVESTR/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2382',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%用触手把%SAVESTR/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2385-2420',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的纯洁被神圣力量保护着，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2386',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的纯洁被神圣力量保护着，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2387',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%操纵着油腻腻的触手，开始/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2390-2394',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%感到心中有什么在蠢动着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2396',
        any: [/PRINTFORML 肛门经验\+10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2397',
        any: [/PRINTFORML 苦痛点数\+80/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2398',
        any: [/PRINTFORML 恐怖点数\+80/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2400',
        any: [/PRINTFORML 百合经验\+5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2401',
        any: [/PRINTFORML 触手经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2402',
        any: [/EXP:\(ARG:1\):1 \+= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2407',
        any: [/EXP:\(ARG:1\):40 \+= 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2408',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2409',
        any: [/EXP:\(ARG:1\):55 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2410',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2411',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2413-2444',
        any: [/PRINTFORMW 无法动弹的%SAVESTR:\(ARG:1\)%被吊在半空中。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2414',
        any: [/PRINTFORMW 无法动弹的%SAVESTR:\(ARG:1\)%被吊在半空中。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2415',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%用凶恶的触手，捅入了%S/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2417-2421',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%感到心中有什么在蠢动着。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2429',
        any: [/PRINTFORML 私处经验\+10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2431',
        any: [/SIF !\(TALENT:\(ARG:1\):122\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2434',
        any: [/EXP:\(ARG:0\):40 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2435',
        any: [/EXP:\(ARG:1\):40 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2439',
        any: [/EXP:\(ARG:1\):55 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2442',
        any: [/PRINTL 【处女丧失】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2444-2446',
        any: [/CFLAG:\(ARG:1\):15 = NO:\(ARG:0\) \+ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2445',
        any: [/CSTR:\(ARG:1\):3 = %SAVESTR:\(ARG:0\)%/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2446',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2448',
        any: [/WAIT/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2449',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2452-2457',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%看着%SAVESTR:\(/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2454',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%看着%SAVESTR:\(/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2456',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%像对食物一样，用舌头拨弄/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2458',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%对%SAVESTR:\(A/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2460',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%让%SAVESTR:\(A/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2462',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%让%SAVESTR:\(A/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2463',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2464',
        any: [/CALL MONSTER_DATA/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2466-2481',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的纯洁被神圣力量保护着，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2471',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的纯洁被神圣力量保护着，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2471-2475',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的纯洁被神圣力量保护着，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2472',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%拿出假阳具，开始侵犯%S/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2482',
        any: [/PRINTFORML 苦痛点数\+50/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2483',
        any: [/PRINTFORML 恐怖点数\+50/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2487',
        any: [/JUEL:\(ARG:1\):9 \+= 50/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2488',
        any: [/JUEL:\(ARG:1\):10 \+= 50/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2490',
        any: [/EXP:\(ARG:0\):40 \+= 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2491',
        any: [/EXP:\(ARG:1\):40 \+= 5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2494-2682',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2497-2526',
        any: [/REPEAT 3/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2499',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%强迫%SAVESTR:\(/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2500',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%全裸地像狗一样趴跪舔舐着/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2501',
        any: [/PRINTFORMW 对舌头的动作不满意，%SAVESTR:\(ARG:0\)%直接/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2502-2504',
        any: [/IF TALENT:\(ARG:1\):11/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2505',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%用反抗的目光瞪着%SAV/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2505-2507',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%用反抗的目光瞪着%SAV/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2508',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%谦卑地用狗一样的神态舔舐/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2511',
        any: [/PRINTFORML 百合经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2512',
        any: [/EXP:\(ARG:0\):40 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2514-2544',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%拿来小臂般粗的巨型假阳具/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2516',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%拿来小臂般粗的巨型假阳具/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2517',
        any: [/PRINTFORM %SAVESTR:\(ARG:1\)%的/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2519',
        any: [/PRINTFORM	后穴/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2521',
        any: [/PRINTFORM	前后两穴都/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2523',
        any: [/PRINTFORMW	被巨型假阳具插入了，%SAVESTR:\(ARG:0\)%用手/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2524',
        any: [/PRINTFORMW 被污物及爱液弄脏了的巨型假阳具，%SAVESTR:\(ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2525-2527',
        any: [/IF TALENT:\(ARG:1\):12/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2528',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%咬牙切齿忍受着屈辱。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2528-2530',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%咬牙切齿忍受着屈辱。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2531',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%眼中含泪，不断重复着谢罪/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2537',
        any: [/PRINTFORML 百合经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2538',
        any: [/EXP:\(ARG:0\):40 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2541',
        any: [/SIF !\(TALENT:\(ARG:1\):122\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2542',
        any: [/EXP:\(ARG:1\):0 \+= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2545',
        any: [/TALENT:\(ARG:1\):0 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2547',
        any: [/CFLAG:\(ARG:1\):15 = 101/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2548-2600',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%叫来了打杂的兽人们，站成/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2550',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%叫来了打杂的兽人们，站成/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2551',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%被下了用嘴满足全员的命令/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2552',
        any: [/PRINTFORMW 然后，%SAVESTR:\(ARG:1\)%全裸地四肢着地侍奉/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2554',
        any: [/PRINTFORMW 之后，被从后侵犯了，自己的阴茎也老实地勃起。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2556',
        any: [/PRINTFORMW 之后，被从后侵犯了。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2558',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%承受着来自下体的刺激继续/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2559',
        any: [/PRINTFORMW 『哈哈，%SAVESTR:\(ARG:0\)%大人，下次还有这/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2559-2561',
        any: [/PRINTFORMW 『哈哈，%SAVESTR:\(ARG:0\)%大人，下次还有这/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2562-2564',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%老实地遵循着命令，舔舐着/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2563',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%老实地遵循着命令，舔舐着/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2566',
        any: [/PRINTFORMW 嗅觉灵敏的%SAVESTR:\(ARG:1\)%有意无意地回避/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2569',
        any: [/PRINTFORML 耻情点数\+100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2570',
        any: [/PRINTFORML 屈服点数\+100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2573',
        any: [/PRINTFORML 口交经验\+10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2574',
        any: [/PRINTFORML 精液经验\+10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2575',
        any: [/SIF !\(TALENT:\(ARG:0\):122 \|\| TALENT:\(ARG:/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2578',
        any: [/EXP:\(ARG:1\):0 \+= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2579',
        any: [/IF !\(TALENT:\(ARG:0\):122 \|\| TALENT:\(ARG:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2580',
        any: [/EXP:\(ARG:0\):40 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2581',
        any: [/EXP:\(ARG:1\):40 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2584-2585',
        any: [/EXP:\(ARG:1\):22 \+= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2585',
        any: [/JUEL:\(ARG:1\):8 \+= 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2588',
        any: [/SIF CFLAG:16 == -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2590-2592',
        any: [/TALENT:\(ARG:1\):0 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2591',
        any: [/TALENT:\(ARG:1\):0 = 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2592',
        any: [/PRINTL 【处女丧失】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2594-2622',
        any: [/CFLAG:\(ARG:1\):15 = NO:\(ARG:0\) \+ 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2599',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%叫来了手下。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2601',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的肛门，被阴茎用背面座位/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2602-2604',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的肛门，被阴茎用背面座位/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2603',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的肛门，被阴茎用背面座位/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2605',
        any: [/PRINTFORMW 在这种情况下，被下达了当众自慰的命令。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2605-2607',
        any: [/PRINTFORMW 在这种情况下，被下达了当众自慰的命令。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2609',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%面红耳赤，回避了大家的炽/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2612',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%没怎么抵抗就开始自慰了，/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2615',
        any: [/PRINTFORML 耻情点数\+200/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2616',
        any: [/PRINTFORML 屈服点数\+200/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2617',
        any: [/PRINTL 自慰经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2618',
        any: [/PRINTL 调教自慰经验\+1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2619',
        any: [/SIF !\(TALENT:\(ARG:0\):122 \|\| TALENT:\(ARG:/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2622',
        any: [/IF !\(TALENT:\(ARG:0\):122 \|\| TALENT:\(ARG:1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2623',
        any: [/EXP:\(ARG:0\):40 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2624-2651',
        any: [/EXP:\(ARG:1\):40 \+= 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2631-2633',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%抓住%SAVESTR:\(/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2632',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%抓住%SAVESTR:\(/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2634',
        any: [/PRINTFORMW 将%SHE\(ARG:1\)%的脸强行压到自己的阴茎上。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2634-2642',
        any: [/PRINTFORMW 将%SHE\(ARG:1\)%的脸强行压到自己的阴茎上。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2636',
        any: [/PRINTFORMW 将%SHE\(ARG:1\)%的脸强行压到自己的阴部上。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2641',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%用反抗的目光瞪着%SAV/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2644',
        any: [/PRINTFORML %SAVESTR:\(ARG:1\)%谦卑地用狗一样的神态舔舐/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2646',
        any: [/PRINT 阴茎/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2648',
        any: [/PRINT 私处/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2650',
        any: [/PRINTFORMW 。/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2653',
        any: [/PRINTFORML 耻情点数\+150/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2654',
        any: [/PRINTFORML 屈服点数\+150/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2659',
        any: [/PRINTFORML 口交经验\+10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2660',
        any: [/PRINTFORML 精液经验\+10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2661-2700',
        any: [/EXP:\(ARG:1\):20 \+= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2663-2681',
        any: [/JUEL:\(ARG:1\):8 \+= 150/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2672',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%用绳子将%SAVESTR/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2674',
        any: [/PRINTFORM 向伏在地上的%SAVESTR:\(ARG:1\)%的背上/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2676',
        any: [/PRINTFORMW 用鞭子不停地抽打着、/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2677',
        any: [/PRINTFORMW 在%SAVESTR:\(ARG:1\)%的背上留下了数道血痕/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2679',
        any: [/PRINTFORMW 将点燃的蜡烛倾倒了上去/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2680',
        any: [/PRINTFORMW 过热的刺痛让%SAVESTR:\(ARG:1\)%的身体不住地/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2682',
        any: [/PRINTFORML 耻情点数\+200/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2683',
        any: [/PRINTFORML 屈服点数\+200/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2684',
        any: [/PRINTFORML 紧缚经验\+5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2684-2699',
        any: [/PRINTFORML 紧缚经验\+5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2696',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的阴道与肛门被%SAVE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2697',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2698',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的肛门被%SAVESTR/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2700',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%在%SAVESTR:\(A/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2701',
        any: [/SIF !\(TALENT:\(ARG:1\):122\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2702',
        any: [/PRINTFORML 私处经验\+10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2704',
        any: [/SIF !\(TALENT:\(ARG:0\):122 \|\| TALENT:\(ARG:/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2705',
        any: [/PRINTFORML 百合经验\+10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2706',
        any: [/PRINTL 紧缚经验\+5/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2708-2712',
        any: [/EXP:\(ARG:0\):40 \+= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2713-2746',
        any: [/EXP:\(ARG:1\):1 \+= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2722',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%心中萌生了兴奋的情绪……/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2727',
        any: [/PRINTFORMW %SAVESTR:\(ARG:0\)%召集了梦魔以及魔族们，开/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2728',
        any: [/PRINTFORMW 大家都在尽情交欢着，不过有一人却四脚趴地/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2729',
        any: [/PRINTFORMW 做着%SAVESTR:\(ARG:0\)%的人肉座椅，%SAV/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2731',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的后面，私处和肛门也正被/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2732',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2733',
        any: [/PRINTFORMW %SAVESTR:\(ARG:1\)%的嘴巴和肛门也正被狠狠侵/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2735',
        any: [/PRINTFORMW 在%SHE\(ARG:1\)%面前则是一个接着一个不停地有人来/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2736',
        any: [/PRINTFORMW 坐在这样的椅子上，%SAVESTR:\(ARG:0\)%满意地/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2737',
        any: [/SIF !\(TALENT:\(ARG:1\):122\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2739',
        any: [/PRINTFORML 肛门经验\+10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2742-2748',
        any: [/EXP:\(ARG:0\):40 \+= 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2744-2748',
        any: [/SIF !\(TALENT:\(ARG:1\):122\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2750',
        any: [/PRINTL 【处女丧失】/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2753',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2755',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2766',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2771-2840',
        any: [/@VICTORY_RYOUZYOKU, ARG = -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2771',
        any: [/@VICTORY_RYOUZYOKU, ARG = -1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2775',
        any: [/;人間タイプ限定・低確率/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2780-2781',
        any: [/SIF CFLAG:ARG:151 > -50/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2783-2784',
        any: [/SIF RAND:12 == 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2786',
        any: [/^$/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2787',
        any: [/^$/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2789-2793',
        any: [/C = B \+ 7/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2791',
        any: [/IF E:C > 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2792',
        any: [/LOCAL:1 = E:B/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2793',
        any: [/PRINTFORMW 冒险者被魔界的瘴气侵袭着，玩弄起%MONSTERNAME\(/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2796-2822',
        any: [/CALL SLIME_RYOU_YUSYA,ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2798-2821',
        any: [/CALL SLIME_RYOU_YUSYA,ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2800',
        any: [/;カタコト/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2804',
        any: [/CALL SLIME_RYOU_YUSYA,ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2808',
        any: [/;ELSEIF E:C == 4/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2812',
        any: [/;触手/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2816',
        any: [/;	CALL FAILY_RYOU_YUSYA,ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2820',
        any: [/ELSEIF E:C == 8/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2826',
        any: [/;ELSEIF E:C == 10/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2836',
        any: [/PRINTL/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2841-2915',
        any: [/@ORC_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2841',
        any: [/@ORC_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2841-2843',
        any: [/@ORC_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2843',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2845',
        any: [/@SLIME_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2845-2860',
        any: [/@SLIME_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2849',
        any: [/^$/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2851-2857',
        any: [/PRINTFORMW %SAVESTR:ARG%无法抑制自己的欲望，沉醉在被黏液/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2851',
        any: [/PRINTFORMW %SAVESTR:ARG%无法抑制自己的欲望，沉醉在被黏液/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2853',
        any: [/PRINTFORML 欲情点数\+\{PLAY \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2856-2858',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2859',
        any: [/^$/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2862',
        any: [/@INSECT_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2862-2864',
        any: [/@INSECT_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2864',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2866',
        any: [/@IVY_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2866-2868',
        any: [/@IVY_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2868',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2870',
        any: [/@SYOKUSYU_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2870-2872',
        any: [/@SYOKUSYU_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2872',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2874',
        any: [/@FAILY_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2874-2876',
        any: [/@FAILY_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2876',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2878',
        any: [/@GIANT_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2878-2880',
        any: [/@GIANT_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2880',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2882',
        any: [/@MAN_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2882-2884',
        any: [/@MAN_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2884',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2886',
        any: [/@GIRL_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2886-2901',
        any: [/@GIRL_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2890',
        any: [/^$/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2892-2898',
        any: [/PRINTFORMW %SAVESTR:ARG%无法抑制自己的欲望，沉醉在被女魔/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2892',
        any: [/PRINTFORMW %SAVESTR:ARG%无法抑制自己的欲望，沉醉在被女魔/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2894',
        any: [/PRINTFORML 欲情点数\+\{PLAY \* 10\}/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2897-2899',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2900',
        any: [/^$/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2903',
        any: [/@BEAST_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2903-2905',
        any: [/@BEAST_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2905',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2907',
        any: [/@BRAIN_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2907-2909',
        any: [/@BRAIN_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2909',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2911',
        any: [/@HORSE_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2911-2913',
        any: [/@HORSE_RYOU_YUSYA\(ARG\)/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2913',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2916-3016',
        any: [/@DUNGEON_RYOUZYOKU_ESCAPE,ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2916',
        any: [/@DUNGEON_RYOUZYOKU_ESCAPE,ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2920-2931',
        any: [/SIDEA = CFLAG:ARG:531/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2921-2924',
        any: [/SIDEA = CFLAG:ARG:531/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2925-2931',
        any: [/SIDEA = CFLAG:\(CFLAG:ARG:533\):531/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2930',
        any: [/SIDEB = CFLAG:ARG:533/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2933',
        any: [/SIF FEAR < 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2934-2935',
        any: [/FEAR\+\+/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2937',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2937-2938',
        any: [/RETURN 0/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2940',
        any: [/CALL CHECK_STATUS, ARG, 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2942-2947',
        any: [/PRINTFORMW %SAVESTR:SIDEA%与%SAVESTR:SIDE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2943',
        any: [/PRINTFORMW %SAVESTR:SIDEA%与%SAVESTR:SIDE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2945',
        any: [/PRINTFORMW %SAVESTR:SIDEA%发现了奄奄一息的%SAVES/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2947',
        any: [/PRINTFORMW %SAVESTR:SIDEB%发现了奄奄一息的%SAVES/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2949-3012',
        any: [/PRINTFORML %SAVESTR:SIDEA%与%SAVESTR:SIDE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2950-2953',
        any: [/PRINTFORML %SAVESTR:SIDEA%与%SAVESTR:SIDE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2951',
        any: [/PRINTFORML %SAVESTR:SIDEA%与%SAVESTR:SIDE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2952',
        any: [/PRINTFORMW 只能眼睁睁地看着%SAVESTR:ARG%被带往了地下城深/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2954-2970',
        any: [/PRINTFORML 但%SAVESTR:ARG%似乎并没有脱身念头…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2954',
        any: [/PRINTFORML 但%SAVESTR:ARG%似乎并没有脱身念头…/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2956',
        any: [/PRINTFORML %SAVESTR:SIDEA%与%SAVESTR:SIDE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2959',
        any: [/PRINTFORML %SAVESTR:SIDEA%看着%SAVESTR:ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2960',
        any: [/PRINTFORML 露出了若有所思的神情、似乎已经出神了/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2961',
        any: [/PRINTFORMW %SAVESTR:SIDEB%只得带着%SAVESTR:S/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2963',
        any: [/PRINTFORML %SAVESTR:SIDEB%看着%SAVESTR:ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2965',
        any: [/PRINTFORMW %SAVESTR:SIDEA%只得带着%SAVESTR:S/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2970',
        any: [/PRINTFORML %SAVESTR:SIDEA%与%SAVESTR:SIDE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2971-2995',
        any: [/PRINTFORMW 终于寻到机会将%SAVESTR:ARG%救下并逃出了地下城/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2972',
        any: [/PRINTFORMW 终于寻到机会将%SAVESTR:ARG%救下并逃出了地下城/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2975-2980',
        any: [/BASE:ARG:1 \+= 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2977',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2978',
        any: [/PRINTFORMW 但%SAVESTR:ARG%很快就被魔族们带往了地下城深处/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2979',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2980',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2983',
        any: [/PRINTFORML %SAVESTR:SIDEA%看着%SAVESTR:ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2986',
        any: [/PRINTFORML 终于寻到机会将%SAVESTR:ARG%救下并逃出了地下城/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2991',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2992',
        any: [/PRINTFORML 但%SAVESTR:ARG%很快就被魔族们带往了地下城深处/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2993',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2994',
        any: [/ELSEIF CFLAG:SIDEB:131 > 3 && CFLAG:SIDE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2995',
        any: [/PRINTFORML %SAVESTR:SIDEB%看着%SAVESTR:ARG/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2996-3010',
        any: [/PRINTFORML 露出了若有所思的神情、似乎已经出神了/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '2999',
        any: [/CFLAG:\(CFLAG:ARG:533\):507 = 1/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '3000',
        any: [/BASE:ARG:0 \+= 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '3001',
        any: [/BASE:ARG:1 \+= 100/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '3002',
        any: [/CFLAG:ARG:1 = 2/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '3003',
        any: [/ELSE/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '3004',
        any: [/PRINTFORMW 但%SAVESTR:ARG%很快就被魔族们带往了地下城深处/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '3005',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '3006',
        any: [/ENDIF/],
      },
      {
        src: 'target/ERB/迷宮/DUNGEON_RYOUZYOKU.ERB',
        ref: '3014',
        any: [/CFLAG:ARG:1 = 2/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
