// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：train-message.mjs
//
// #402（N18）起 A/B 两个函数的公共段与全部指令号分支落真身，正文里逐
// 处 `:N` 引用随之铺开（公共段按源侧顺序、每支一行）——本表由「引用所
// 在行的中文片段 ↔ 源切片」机械核对生成：片段命中的那份源文件即目标，
// 锚取命中片段里在源文件全文唯一的最长者；取不到片段时按既有约定回落
// 到「区间内首个非注释行的整行字面」。

export const FILES = [
  {
    js: 'ere/system/train/train-message.js',
    refs: [
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '12-3049',
        any: [/@TRAIN_MESSAGE_A/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '19-26',
        any: [/SIF \(FLAG:6 & 1\)/],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '3041-3046',
        any: [/IF TFLAG:31 == 2/],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '15-1351',
        any: [/@TRAIN_MESSAGE_A/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '22-26',
        any: [/SIF \(FLAG:6 & 1\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '31-741',
        any: [/IF TFLAG:9 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '746-1351',
        any: [/IF SELECTCOM == 0 && TEQUIP:44 == 0 && TFLAG:899 <= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '44-49',
        any: [/PRINTL 蓝色肌肤弄脏了…/],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '70-76',
        any: [/PRINTFORM 轻舔着%SAVESTR:TARGET%的唇、/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '99-105',
        any: [/PRINT 那黏答答的口部/],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '31-110',
        any: [/IF TFLAG:9 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '44-50',
        any: [/白皙肌肤弄脏了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '33-54',
        any: [/PRINTFORM %SAVESTR:TARGET%射精出的/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '39',
        any: [/%的阴茎用精液一吐为快了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '43',
        any: [/ 精液、把/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '45',
        any: [/蓝色肌肤弄脏了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '47',
        any: [/褐色肌肤弄脏了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '49',
        any: [/皙肌肤弄脏了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '52',
        any: [/射出的精液、把两人的身体都弄脏了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '58-65',
        any: [/同时射精、对彼此的阴茎用精/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '87-94',
        any: [/同时射精、对彼此的阴茎用大/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '90',
        any: [/两人同时射精、对彼此的阴茎用大量的精液一吐为快/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '61',
        any: [/两人同时射精、对彼此的阴茎用精液一吐为快了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '93',
        any: [/射出大量的精液、把/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '64',
        any: [/的阴茎弄脏了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '67-80',
        any: [/PRINTFORM 射出的精液、把%SAVESTR:TARGET%的/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '96-109',
        any: [/PRINTL 肌肤被射出的大量精液沾满了…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '98-106',
        any: [/肌肤被射出的大量精液沾满了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '69-77',
        any: [/M 射出的精液、把/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '108',
        any: [/两人的身体被射出的大量精液沾满了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '79',
        any: [/射出的精液、把两人的身体都弄脏了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '151-161',
        any: [/IF TFLAG:16 > 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '504',
        any: [/精液溢出的直肠、细微地颤抖着、把%SAVESTR:T/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '153',
        any: [/的私处里、被狗灌入了那又臭又热的精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '155',
        any: [/的直肠里、被狗灌入了那又臭又热的精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '157',
        any: [/的嘴里、被狗灌入了那又臭又热的精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '159',
        any: [/的手上、沾满了狗那又臭又热的精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '165-172',
        any: [/IF TFLAG:7 > 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '167',
        any: [/的体内深处射出了精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '169',
        any: [/的体内深处射满了精液、溢出来了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '171',
        any: [/用羡慕的眼光凝视着/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '177-324',
        any: [/IF TFLAG:0 == 1/],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '191-197',
        any: [/PRINT 被口器轻轻啃咬舔舐着/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '271-277',
        any: [/LOCALS:1 = 牡奴/],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '262',
        any: [/带着恍惚的表情、把口中的精液喝光了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '181',
        any: [/带着恍惚的表情、把注入口中的精液喝光了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '264',
        any: [/的嘴里溢出来了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '183',
        any: [/喉咙发出模糊不清的声音、把注入口中的精液喝光了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '266',
        any: [/满满的精液、把/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '185',
        any: [/精液注入到%SAVESTR:TARGET%的嘴/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '270-278',
        any: [/胸部和脸之间、全被射满了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '190-198',
        any: [/圆润挺拔的诱惑豪乳之间、积存着精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '200-208',
        any: [/胸口到脸之间、精液四处飞散着/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '281',
        any: [/大量的精液倾泻在/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '212',
        any: [/用嘴接住精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '284',
        any: [/因阴部的刺激全身颤抖着、然后把精液喝下去了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '215',
        any: [/身体颤抖着、承受来自阴部的刺激、同时把精液咽下/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '218-226',
        any: [
          /PRINTFORML %SAVESTR:TARGET%带着恍惚的表情、把强行灌入喉咙的精液喝光了…/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '287-295',
        any: [/PRINTFORML 紧紧抓住%SAVESTR:TARGET%的头、在她喉咙深处放开精关…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '288',
        any: [/的头、在她喉咙深处放开精关/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '219',
        any: [/的头、在她喉咙深处射出/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '225',
        any: [/的头、在她喉咙深处射出/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '290',
        any: [/带着恍惚的表情、把直接灌入喉咙的精液喝光了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '221',
        any: [/带着恍惚的表情、把强行灌入喉咙的精液喝光了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '292',
        any: [/被呛到、一边忍住不把喉咙里的精液咳出来、一边把它喝光了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '223',
        any: [/喝掉了直接叩开喉咙强行灌进来的精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '294',
        any: [/喉咙深处射出的精液、从口中溢出来了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '299',
        any: [/的阴茎、一边享受胸部的按摩、一边在%SAVESTR:TARGET%的嘴里倾泻了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '230',
        any: [/的阴茎、一边享受胸部的按摩、一边在%SAVESTR:TARGET%的嘴里倾泻精/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '301',
        any: [/的阴茎、一边被胸部紧紧夹住、一边在%SAVESTR:TARGET%的嘴里倾泻了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '232',
        any: [/的阴茎、一边被胸部紧紧夹住、一边在%SAVESTR:TARGET%的嘴里倾泻精/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '303',
        any: [/从嘴里溢出来的精液、把阴茎和胸部都染成白色了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '307',
        any: [/的嘴里溢出了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '237',
        any: [/喉咙发出模糊不清的声音、把注入口中的精液喝光了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '309',
        any: [/满满的精液、把/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '239',
        any: [/的口中了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '312',
        any: [
          /的嘴边搞得一塌糊涂。揉着阴囊、撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '242',
        any: [/%揉着阴囊、撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '314',
        any: [
          /的嘴边搞得一塌糊涂。撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '244',
        any: [/%撸着棒身、嘴唇轻轻地含着龟头、在马眼处吸吮着精液。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '318',
        any: [/淫秽地吸啜着阴茎、在她嘴里、大量的精液喷涌而出/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '248',
        any: [/淫秽地吸啜着阴茎、在她口中开射出/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '320',
        any: [/%吸啜着阴茎、在她嘴里、大量的精液喷涌而出/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '250',
        any: [/吸啜着阴茎、在她口中开放了精关/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '323',
        any: [/精液从嘴里溢出、/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '253',
        any: [/带着恍惚的表情、把阴茎上的精液吸吮干净了。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '328-342',
        any: [/ELSEIF TFLAG:1 == 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '330',
        any: [/带着惊讶的神情、/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '339',
        any: [/带着惊讶的神情、/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '332',
        any: [/PRINT 带着恍惚的表情、\s*\n\s*PRINTFORML 精液射到%SAVESTR:TARGET%的身上了…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '341',
        any: [/PRINT 带着恍惚的表情、\s*\n\s*PRINTFORML %SAVESTR:TARGET%的脸上、手上、沾满了大量的精液…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '342',
        any: [/的脸上、手上、沾满了大量的精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '333',
        any: [/的身上了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '346-358',
        any: [/ELSEIF TFLAG:18 == 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '170',
        any: [/SIF ABL:11 > 3 \|\| ABL:32 > 2 && TFLAG:899 <= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '347',
        any: [/ELSEIF TFLAG:18 == 1\s*\n\s*PRINTFORM %SAVESTR:TARGET%/],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '355',
        any: [
          /PRINTFORMW 最下层居民那不知多少天没洗的手、抓起了%SAVESTR:TARGET%的胸部、像榨乳一样使劲地揉着……/,
        ],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '349',
        any: [/M 带着轻蔑的眼神、/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '357',
        any: [/T 带着轻蔑的眼神、/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '358',
        any: [/看着你将大量热乎乎的精液射到她的脚上了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '350',
        any: [/看着你将热乎乎的精液射到她的脚上了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '362-373',
        any: [/ELSEIF SELECTCOM == 55 && TFLAG:899 <= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '377',
        any: [/IF TFLAG:29 > 0 && TFLAG:899 <= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '364',
        any: [/急促的呼吸着/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '366',
        any: [/、用炽热地目光看向你/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '368',
        any: [/、身体不断地颤抖着/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '370',
        any: [/、紧蹙摩擦的双腿已经捂不住流淌出的粘液了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '371',
        any: [/PRINTL ……/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '177-373',
        any: [/IF TFLAG:0 == 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '456-606',
        any: [/IF CFLAG:113 == 1 && TFLAG:2 == 1 && SELECTCOM == 90/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '592-605',
        any: [/IF TFLAG:899 <= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '501',
        any: [
          /ELSEIF SELECTCOM == 27 \|\| SELECTCOM == 27 \|\| SELECTCOM == 28 \|\| SELECTCOM == 29 \|\| SELECTCOM == 36/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '458',
        any: [/的乳房里激烈的颤抖着、在乳头肉穴的深处释放了精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '524',
        any: [
          /的肉棒在乳房里射入了大量的精液、从乳头仅存的缝隙间、精液和母乳一齐喷了出来/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '460-495',
        any: [/PRINTL 精液滴出来了…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '526-565',
        any: [/PRINTL 大量的精液滴出来了…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '532',
        any: [/大量的精液渗出来了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '463-466',
        any: [/PRINTL 精液渗出来了…\s*\n\s*;背后位、背面座位/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '538',
        any: [/大量的精液滴出来了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '469-472',
        any: [/PRINTL 精液滴出来了…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '541',
        any: [/从肛门里漏出大量的精液沿着股沟向下流/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '475',
        any: [/从肛门里漏出来的精液沿着股沟向下流/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '543',
        any: [/射出的精液、把两人的身体都弄得粘稠不堪/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '477',
        any: [/ELSEIF SELECTCOM == 25\s*\n\s*PRINTFORML %SAVESTR:PLAYER%射出的精液、把两人的身体都弄脏了…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '546-549',
        any: [/大量的精液渗出来了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '480-483',
        any: [/ELSEIF SELECTCOM == 34\s*\n\s*PRINT 阴茎拔出后、阴部处/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '552-555',
        any: [/渗出了处女的落红、混合着/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '486',
        any: [/ELSEIF SELECTCOM == 24\s*\n\s*PRINTFORML %SAVESTR:PLAYER%射出的精液、把两人的身体都弄脏了…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '556',
        any: [/射出的精液、把两人的身体都弄得粘稠不堪/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '559',
        any: [/%的子宫、注入了大量热乎乎的精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '489',
        any: [/的子宫、注入了热乎乎的精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '562',
        any: [/PRINTFORML 对准%SAVESTR:TARGET%私处内那最敏感的那一点、%SAVESTR:PLAYER%射出了大量的精液…\s*\n\s*ENDIF/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '492',
        any: [/PRINTFORML 对准%SAVESTR:TARGET%私处内那最敏感的那一点、%SAVESTR:PLAYER%射出了精液…\s*\n\s*ENDIF/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '494-495',
        any: [/TFLAG:31 = 0/],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '564-565',
        any: [/PRINTFORML 能感受到被穿了环的触感……/],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '496-517',
        any: [
          /PRINTFORML 精液溢出的直肠、细微地颤抖着、把插入的阴茎紧紧夹住了…/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '566-587',
        any: [
          /PRINTFORML 直肠将溢出的大量精液一饮而尽、妖媚而淫荡地蠕动着、把插入的阴茎紧紧夹住了…/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '569',
        any: [
          /直肠将溢出的大量精液一饮而尽、妖媚而淫荡地蠕动着、把插入的阴茎紧紧夹住了/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '499',
        any: [/精液溢出的直肠、细微地颤抖着、把插入的阴茎紧紧夹住了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '572',
        any: [/直肠将溢出的大量精液一饮而尽、妖媚而淫荡地蠕动着、把%SAVESTR:P/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '502',
        any: [/精液溢出的直肠、细微地颤抖着、把%SAVESTR:P/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '574',
        any: [/直肠将溢出的大量精液一饮而尽、妖媚而淫荡地蠕动着、把%SAVESTR:T/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '577',
        any: [/快乐到生疼的子宫、注入了大量热乎乎的精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '507',
        any: [/的子宫、注入了热乎乎的精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '580',
        any: [/PRINTFORML 对准%SAVESTR:TARGET%私处内那最敏感的那一点、%SAVESTR:PLAYER%射出了大量的精液…\s*\n\s*;逆レイプ/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '510',
        any: [/PRINTFORML 对准%SAVESTR:TARGET%私处内那最敏感的那一点、%SAVESTR:PLAYER%射出了精液…\s*\n\s*;逆レイプ/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '583',
        any: [
          /的子宫贪婪地吸啜着灌满膣内的大量精液、私处妖媚而淫荡地蠕动着、把/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '513',
        any: [/R%被精液灌满的私处、轻轻蠕动着、把/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '585',
        any: [
          /的子宫贪婪地吸啜着灌满膣内的大量精液、私处妖媚而淫荡地蠕动着、把/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '515',
        any: [/T%被精液灌满的私处、轻轻蠕动着、把/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '594',
        any: [
          /IF TFLAG:29 >= 9 && TFLAG:19 && \(TEQUIP:11 \|\| TFLAG:60\) && \(CFLAG:40 & 16\) == 0 && \(CFLAG:40 & 1\) == 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '596',
        any: [
          /ELSEIF TFLAG:29 >= 5 && TFLAG:19 && \(TEQUIP:11 \|\| TFLAG:60\) && \(CFLAG:40 & 16\) == 0 && \(CFLAG:40 & 1\) == 0/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '595',
        any: [/的私处滴出了粘稠的液体、阴户一开一合不停持续着/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '597',
        any: [/的私处滴出了粘稠的液体、剧烈地不停喘息着/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '599',
        any: [/断断续续地不停高潮、身体不断抽搐、反复扭动着/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '601',
        any: [/断断续续地不停高潮、四肢无力、筋疲力尽了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '603',
        any: [/气息慌乱、沉浸在绝顶高潮的余韵之中/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '611-677',
        any: [
          /IF TFLAG:899 >= 2 && TFLAG:29 >= 3 && \(TEQUIP:22 \|\| TALENT:57\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '613',
        any: [/失去意识、尿到周围都是了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '616',
        any: [/失去意识、尿液从阴部漏出来了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '618-676',
        any: [
          /ELSEIF CFLAG:42 == 69 && \(CFLAG:40 & 64\) && \(\(TFLAG:29 >= 5 && TEQUIP:22\) \|\| \(TFLAG:29 >= 3 && TEQUIP:22 && TALENT:57\)\)/,
        ],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '619',
        any: [/^	PRINTFORML %SAVESTR:TARGET%的尿布里升起了热气、$/m],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '620',
        any: [/闻到了清晰的尿臭味、/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '621',
        any: [/看来是太过兴奋、尿到尿布里去了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '624',
        any: [/的尿布里升起了热气、飘来了尿的味道/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '627-629',
        any: [/、但是、有尿臭味从里面飘散出来。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '630-632',
        any: [/M 看来是太过兴奋、尿到/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '635-637',
        any: [/、突然动作停止了。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '638',
        any: [/看来、里面是尿湿了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '641-643',
        any: [/弄湿也不在乎了、情不自禁地尿了起来/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '646-647',
        any: [/的股间冒起了热气、有黄色水迹在扩散/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '650',
        any: [/不堪快感的冲击、在内裤里大大方方地尿了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '653',
        any: [/的内裤冒起了热气、有黄色水迹在扩散/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '654-676',
        any: [/ELSEIF TFLAG:29 >= 7 && TEQUIP:22 && TALENT:57/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '655',
        any: [/的身体、抽搐痉挛了起来、/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '656',
        any: [/看来尿尿能让她有快感/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '658',
        any: [/中的%SAVESTR:TARGET%喷泉一样喷尿出来了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '660',
        any: [/挛中的%SAVESTR:TARGET%尿出一道细细的弧线/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '662',
        any: [/尽的%SAVESTR:TARGET%喷泉一样喷尿出来了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '664',
        any: [/尽的%SAVESTR:TARGET%尿出一道细细的弧线/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '666',
        any: [/尽的%SAVESTR:TARGET%不断滴尿、形成了个小水坑/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '668',
        any: [/抖中的%SAVESTR:TARGET%尿出一道细细的弧线/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '670',
        any: [/震颤抖中的/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '672',
        any: [/的%SAVESTR:TARGET%从阴部漏出尿来了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '674',
        any: [/ %SAVESTR:TARGET%不断滴尿、形成了个小水坑/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '676',
        any: [/ %SAVESTR:TARGET%从阴部漏出尿来了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '695-714',
        any: [/PRINT 父亲/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '682-741',
        any: [/SIF TFLAG:15 == 1 && TFLAG:3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '695-715',
        any: [/PRINT 父亲/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '739',
        any: [/SIF TFLAG:8 == 3/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '683',
        any: [/的阴部上、处女落红和污液沿着丑陋的触手滴下来了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '689',
        any: [/的阴部上、滴出了处女才有的落红/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '694-716',
        any: [/夺取了她的处女。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '722',
        any: [/把处女奉献给野狗了。/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '727-741',
        any: [/IF TFLAG:8 > 0 && TFLAG:899 == 0/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '730',
        any: [/的阴茎、清洁着上面的污垢/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '728',
        any: [/PRINT 之后、/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '733',
        any: [/PRINTFORM %SAVESTR:ASSI%和/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '734',
        any: [/PRINTFORM %SAVESTR:TARGET%把/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '736',
        any: [/剩下的精液都舔干净、/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '737',
        any: [/阴茎里的污垢也漂亮地清洁了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '740',
        any: [/两人好像还不满足、意犹未尽地吸啜着彼此口中的积存精液/],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '12',
        any: [/@TRAIN_MESSAGE_B/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '19-21',
        any: [/SIF \(FLAG:6 & 1\)/],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '23',
        any: [/SIF \(FLAG:6 & 1\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '15',
        any: [/@TRAIN_MESSAGE_A/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '22-24',
        any: [/SIF \(FLAG:6 & 1\)/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '26',
        any: [/CUSTOMDRAWLINE ‥/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '746',
        any: [/IF SELECTCOM == 0 && TEQUIP:44 == 0 && TFLAG:899 <= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '110-146',
        any: [/SIF TFLAG:15 == 1 && TEQUIP:55 != 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '113-125',
        any: [/SIF TFLAG:15 == 1 && TEQUIP:55 != 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '127-141',
        any: [/PRINTFORML %SAVESTR:TARGET%的嘴里、被灌入了怪物黏黏糊糊的精液…/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '143-145',
        any: [/ELSEIF TFLAG:15 == 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '113-116',
        any: [/身上的触手、吐出了体液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '121-124',
        any: [/全身上的触手、一起吐出了大量的体液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '135-141',
        any: [/嘴里、被怪物大量的粘稠精液灌满了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '127-133',
        any: [/嘴里、被灌入了怪物黏黏糊糊的精液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '143-144',
        any: [/身上的触手、吐出了体液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '145-146',
        any: [/全身上的触手、一起吐出了大量的体液/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '377-424',
        any: [/IF TFLAG:29 > 0 && TFLAG:899 <= 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '427-450',
        any: [/IF SELECTCOM == 24 && TFLAG:10 == 1/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '428-431',
        any: [/渗出了处女的落红、混合着/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '440-443',
        any: [/渗出了处女的落红、混合着/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '446',
        any: [/阴茎从肛门里拔出后、大量漏出来的精液沿着股沟向下流/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '434',
        any: [/阴茎从肛门里拔出后、漏出来的精液沿着股沟向下流/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '449',
        any: [/然后、满溢的精液、灌到了/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '437',
        any: [/然后、精液流到了/],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '1953-1980',
        any: [/ELSEIF SELECTCOM == 54/],
      },
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_B.ERB',
        ref: '2608-2622',
        any: [/ELSEIF SELECTCOM == 109/],
      },
      // —— target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB ——
      {
        src: 'target/ERB/EVENT/EVENT_TRAIN_MESSAGE_A.ERB',
        ref: '1208-1276',
        any: [
          /ELSEIF SELECTCOM == 40 \|\| SELECTCOM == 41 \|\| SELECTCOM == 42 && TFLAG:899 <= 1/,
        ],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
