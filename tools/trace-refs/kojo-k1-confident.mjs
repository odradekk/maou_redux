// 源: tools/trace-check.mjs  @FILES/@LOG_REFS/@SAMPLE_LOG_REFS
// issue #290 按 js 文件拆出：kojo-k1-confident.mjs

export const FILES = [
  {
    js: 'ere/kojo/kojo-k1-confident.js',
    refs: [
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '84',
        any: [/@EVENTTRAIN/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '84-85',
        any: [/@EVENTTRAIN/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '84-88',
        any: [/FLAG:7 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '86',
        any: [/FLAG:101 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '88',
        any: [/FLAG:7 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '90',
        any: [/@EVENTEND/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '90-91',
        any: [/@EVENTEND/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '90-92',
        any: [/FLAG:101 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '92',
        any: [/FLAG:101 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '98',
        any: [/@EVENTTRAIN/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '99-100',
        any: [/SIF FLAG:7 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '101-102',
        any: [/SIF TALENT:161 != 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '107',
        any: [/IF CFLAG:201 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '107-108',
        any: [/IF CFLAG:201 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '110',
        any: [/IF TALENT:TARGET:314 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '111',
        any: [/「这、这种事情你居然对%SELF_CALL\(TARGET\)%做的出来…！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '112',
        any: [/%SAVESTR:TARGET%靠着最后的勇气硬挺的瞪着你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '113',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '115',
        any: [/ELSEIF TALENT:TARGET:314 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '116',
        any: [/「满月的时候我们走着瞧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '117',
        any: [/%SAVESTR:TARGET%用野兽一样的眼睛瞪着你/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '118',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '120',
        any: [/ELSEIF TALENT:TARGET:314 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '121',
        any: [/「高贵的血族%SELF_CALL\(TARGET\)%是不会臣服于你的调教之下的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '122',
        any: [/「你这是在玩火自焚」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '123',
        any: [/身为一个血族、%SAVESTR:TARGET%用他的尊严做的保证………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '124',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '126',
        any: [/ELSEIF TALENT:TARGET:314 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '127',
        any: [/「呼\.\.\.\.\.\.这就是传说中的调教室么…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '128',
        any: [
          /「那么尊敬的魔王大人你难道对%SELF_CALL\(TARGET\)%没什么想法么？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '129',
        any: [/无头骑士%SAVESTR:TARGET%用最后的倔强硬挺着胸膛………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '130',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '132',
        any: [/ELSEIF TALENT:TARGET:314 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '133',
        any: [/「真是有趣、身体无法自由移动了么？…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '134',
        any: [/「难道还想着让%SELF_CALL\(TARGET\)%屈服吗？魔王大人？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '135',
        any: [/这是一名龙族%SAVESTR:TARGET%根深蒂固的骄傲………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '136',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '138',
        any: [/ELSEIF TALENT:TARGET:314 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '139',
        any: [
          /「就算是你的肮脏的手碰到我%SELF_CALL\(TARGET\)%也是一种亵渎！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '140',
        any: [/「你一定会受到惩罚的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '141',
        any: [
          /虽然已经猜到了自己之后的命运、但是%SAVESTR:TARGET%的态度还是十分强硬………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '142',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '144',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '145',
        any: [/「你这个可恶的恶魔、下地狱去吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '146',
        any: [/%SAVESTR:TARGET%用恶狠狠的眼神凝视着你…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '147',
        any: [/这是当然的了、因为她已经是黑暗的居民-魔族了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '148',
        any: [/但是不管这个女人有多么憎恨魔族/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '149',
        any: [/她也开始感到这种必须臣服于魔族之王的意志的本能………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '150',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '152',
        any: [/CFLAG:370 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '154',
        any: [/ELSEIF TALENT:TARGET:314 == 10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '155',
        any: [/「别开玩笑了！ 这种事情…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '156',
        any: [/「至少每天也要给我5份食物吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '157',
        any: [/%SAVESTR:TARGET%应该是误解了吧、她向你提出改善待遇的要求…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '158',
        any: [/这种态度如何？这种慢慢崩溃的希望…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '159',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '161',
        any: [/ELSEIF TALENT:TARGET:314 == 11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '162',
        any: [/「想要被我心爱的斧子干掉吗？…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '163',
        any: [/%SAVESTR:TARGET%虽然比你的个子矮、她还是用威慑性目光看着你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '164',
        any: [/然而这种态度并不会持续太久………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '165',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '166-167',
        any: [/;それ以外（今のところ人間）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '168',
        any: [/「别开玩笑了！ 这种事情…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '169',
        any: [/%SAVESTR:TARGET%用坚强的目光注视着你/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '170',
        any: [/然而这种态度并不会持续太久………………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '171',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '171-172',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '171-173',
        any: [/CFLAG:201 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '177',
        any: [
          /ELSEIF CFLAG:201 < 5 && CFLAG:370 == 0 && TALENT:TARGET:314 == 9 && TALENT:TARGE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '178',
        any: [
          /「身体\.\.\.身体变成这样的话\.\.\.\.\.已经\.\.\.\.回不去家了\.\.\.\.\.\.」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '179',
        any: [
          /经过反复的改造、%SAVESTR:TARGET%的身体已经完全变成魔族了。她流下了眼泪、双肩止不住的颤抖着/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '180',
        any: [/即使她心里悲恸万分以泪洗面、但是身为一个魔族/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '181',
        any: [/她也开始感到这种必须臣服于魔族之王的意志的本能………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '183',
        any: [/CFLAG:370 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '183-184',
        any: [/CFLAG:370 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '188',
        any: [/ELSEIF CFLAG:201 >= 1 && CFLAG:650 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '189',
        any: [/IF TALENT:85 \|\| TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '189-190',
        any: [/IF TALENT:85 \|\| TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '191',
        any: [/在看到那个水晶球之后%SAVESTR:TARGET%的脸色大变。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '192',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '193',
        any: [
          /「这种事情不是真的…%SELF_CALL\(TARGET\)%的意志不是真的…%SELF_CALL\(TARGET\)%的意志不可能是真的!」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '194',
        any: [
          /「是、是的\.\.\.那个卑鄙的狂王用药物\.\.\.\.所以\.\.\.\.\.所以求你了\.\.\.\.\.原谅我\.\.\.\.\.」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '194-195',
        any: [
          /「是、是的\.\.\.那个卑鄙的狂王用药物\.\.\.\.所以\.\.\.\.\.所以求你了\.\.\.\.\.原谅我\.\.\.\.\.」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '196',
        any: [
          /%SAVESTR:TARGET%混乱的体态是因为使用了药物之类的东西还是因为%SAVESTR:TARGET%的身体贪图快感%NAME:MASTER%马上就看得出/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '198',
        any: [/CFLAG:650 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '198-199',
        any: [/CFLAG:650 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '200-201',
        any: [/「啊啊\.\.\.又输了呢…勇者的自信心什么的已经找不回来了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '201',
        any: [/「啊啊\.\.\.又输了呢…勇者的自信心什么的已经找不回来了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '202',
        any: [
          /「肯定又是你…侵犯侵犯竭尽全力的侵犯吧？………那样的被狂王大人………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '203',
        any: [/%SAVESTR:TARGET%轻蔑的笑了起来并且张开双手不再抵抗………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '205',
        any: [/CFLAG:650 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '205-206',
        any: [/CFLAG:650 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '205-207',
        any: [/CFLAG:650 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '212',
        any: [
          /ELSEIF CFLAG:201 < 2 && MARK:2 == 1 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '212-213',
        any: [
          /ELSEIF CFLAG:201 < 2 && MARK:2 == 1 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '214',
        any: [/「啊\.\.那样的\.\.\.」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '215',
        any: [/%SAVESTR:TARGET%在你的面前双臂抱着身体、仿佛要保护自己………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '216',
        any: [/「这\.\.\.这没什么好吓人的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '217',
        any: [/CFLAG:201 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '217-218',
        any: [/CFLAG:201 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '221',
        any: [
          /ELSEIF CFLAG:201 < 3 && MARK:2 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '221-222',
        any: [
          /ELSEIF CFLAG:201 < 3 && MARK:2 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '223',
        any: [/「不一样\.\.\.但是…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '224',
        any: [/%SAVESTR:TARGET%在你的面前不安的摇了摇头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '225',
        any: [/CFLAG:201 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '225-226',
        any: [/CFLAG:201 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '229',
        any: [
          /ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '229-230',
        any: [
          /ELSEIF CFLAG:201 < 4 && MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '231',
        any: [/「已经没有办法回去了呢…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '232',
        any: [/%SAVESTR:TARGET%用着一种期待的眼神看着你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '233',
        any: [/「啊、魔王大人\.\.\.\.今天真是温柔呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '234',
        any: [/CFLAG:201 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '234-235',
        any: [/CFLAG:201 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '238',
        any: [
          /ELSEIF CFLAG:201 < 5 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1 && TALENT/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '238-239',
        any: [
          /ELSEIF CFLAG:201 < 5 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 1 && TALENT/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '240',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '241',
        any: [/「是的\.\.\.主人…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '241-242',
        any: [/「是的\.\.\.主人…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '243',
        any: [/%SAVESTR:TARGET%眼睛里带着浓浓的春意、迫切的看着你………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '244',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '245',
        any: [
          /「今天的主人好棒…有好多～好棒的侍奉要我来做呢\.\.\.%UNICODE\(0x2661\) \*1%」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '246',
        any: [
          /「%SELF_CALL\(TARGET\)%果然和主人一起最让人心情舒畅了…花心的话可是不行的哦」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '246-247',
        any: [
          /「%SELF_CALL\(TARGET\)%果然和主人一起最让人心情舒畅了…花心的话可是不行的哦」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '248',
        any: [/%SAVESTR:TARGET%为了增加和阴茎的摩擦、她紧紧抱住了你的身体。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '249',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '250',
        any: [
          /「啊…要让我说感觉的话…%SELF_CALL\(TARGET\)%因为主人最能让我快乐了%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '250-251',
        any: [
          /「啊…要让我说感觉的话…%SELF_CALL\(TARGET\)%因为主人最能让我快乐了%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '252',
        any: [/用甜美的声音献媚、%SAVESTR:TARGET%的脑中满是令人愉悦的事情………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '253',
        any: [/CFLAG:201 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '253-254',
        any: [/CFLAG:201 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '257',
        any: [
          /ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 6 && TALENT:TARGET:85 == 0 && TALEN/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '257-258',
        any: [
          /ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 6 && TALENT:TARGET:85 == 0 && TALEN/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '260',
        any: [/IF CFLAG:370 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '261',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '262',
        any: [/「是的\.\.\.主人…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '262-263',
        any: [/「是的\.\.\.主人…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '264',
        any: [/%SAVESTR:TARGET%是以前完全无法想象的发情的目光………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '265',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '266',
        any: [
          /「已经…完全忍不下去了…子宫已经习惯了这种美妙的感觉了啊…好想要、好想要主人的精液啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '268',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '269',
        any: [
          /「处女\.\.\.处女膜已经早就交给主人了呢…%UNICODE\(0x2661\) \*1% 这是主人专用的阴道、请用吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '269-270',
        any: [
          /「处女\.\.\.处女膜已经早就交给主人了呢…%UNICODE\(0x2661\) \*1% 这是主人专用的阴道、请用吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '272',
        any: [/%SAVESTR:TARGET%用双手张开了沾满爱液的阴唇给%NAME:MASTER%看。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '273',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '274',
        any: [
          /「啊啊\.\.这具身体要为主人提供服务了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '275',
        any: [
          /「全力在侍奉啊…%UNICODE\(0x2661\) \*1% 满满的\.\.\.好开心…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '275-276',
        any: [
          /「全力在侍奉啊…%UNICODE\(0x2661\) \*1% 满满的\.\.\.好开心…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '277',
        any: [
          /脸上带着能融化一切的笑容%SAVESTR:TARGET%紧紧地抱住了%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '278',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '279',
        any: [/「这种色情的身体习惯…非常幸福呢…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '279-280',
        any: [/「这种色情的身体习惯…非常幸福呢…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '281',
        any: [/%SAVESTR:TARGET%反复调教的结果体现出来了、她完全被情欲支配了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '282',
        any: [/调教前的魔族改造向好的方向发展了呢………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '282-283',
        any: [/调教前的魔族改造向好的方向发展了呢………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '284',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '284-285',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '287',
        any: [/ELSEIF CFLAG:370 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '288',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '289',
        any: [/「是的\.\.主人尽管…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '289-290',
        any: [/「是的\.\.主人尽管…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '291',
        any: [
          /但是她的样子很奇怪%SAVESTR:TARGET%用着发情的目光看着%NAME:MASTER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '292',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '293',
        any: [
          /「想要主人的精液…%UNICODE\(0x2661\) \*1% 好想要的说…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '293-294',
        any: [
          /「想要主人的精液…%UNICODE\(0x2661\) \*1% 好想要的说…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '296',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '297',
        any: [
          /「阴道想要精液…%UNICODE\(0x2661\) \*1% 这是主人专用的阴道请插进来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '297-298',
        any: [
          /「阴道想要精液…%UNICODE\(0x2661\) \*1% 这是主人专用的阴道请插进来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '300',
        any: [/%SAVESTR:TARGET%用双手张开了沾满爱液的阴唇给%NAME:MASTER%看。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '301',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '302',
        any: [
          /「终于\.\.\.终于明白了的说…%SELF_CALL\(TARGET\)%的身体…似乎想侍奉您呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '303',
        any: [
          /「那样的主人永远不会腻呢…满满的…真是满满的侍奉啊…希望可以把我灌满的色色的东西啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '303-304',
        any: [
          /「那样的主人永远不会腻呢…满满的…真是满满的侍奉啊…希望可以把我灌满的色色的东西啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '305',
        any: [
          /脸上带着能融化一切的笑容%SAVESTR:TARGET%张开双臂紧紧搂住%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '306',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '307',
        any: [/「能够变成魔族…真的是太好了呢…%UNICODE\(0x2661\) \*1%」」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '307-308',
        any: [/「能够变成魔族…真的是太好了呢…%UNICODE\(0x2661\) \*1%」」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '309',
        any: [/%SAVESTR:TARGET%反复调教的结果体现出来了、她完全被情欲支配了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '310',
        any: [/魔化改造向好的方向发展了呢………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '311',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '311-312',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '313-314',
        any: [/;陥落後に魔族/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '315',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '316',
        any: [
          /「主人%UNICODE\(0x2661\) \*1% 真的谢谢你呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '316-317',
        any: [
          /「主人%UNICODE\(0x2661\) \*1% 真的谢谢你呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '318',
        any: [
          /一进入房间、%SAVESTR:TARGET%就欢呼着跳上了后背…看来她一直在门口等着你的到来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '319',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '320',
        any: [
          /「因为成为魔族…就能一直\.\.\.一直…对主人进行满满的侍奉了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '321',
        any: [
          /「呵呵\.\.\.%UNICODE\(0x2661\) \*1% 谢谢主人%UNICODE\(0x2661\) \*1%…谢谢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '322',
        any: [
          /「魔族的胸部\.\.魔族的阴道\.\.\.魔族的肛门…全都是用来侍奉主人的东西呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '323',
        any: [
          /「快点\.\.\.快点…抱着我啊…已经…已经忍不住了…一起来做爱做的事情吧！%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '323-324',
        any: [
          /「快点\.\.\.快点…抱着我啊…已经…已经忍不住了…一起来做爱做的事情吧！%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '325',
        any: [
          /%SAVESTR:TARGET%对于自己的兴奋的感情已经完全控制不住了、两只魔眼更是绽放着光芒………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '326',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '326-327',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '326-328',
        any: [/CFLAG:201 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '331',
        any: [
          /ELSEIF CFLAG:201 < 7 && TALENT:TARGET:85 == 1 && TALENT:TARGET:314 != 9/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '331-332',
        any: [
          /ELSEIF CFLAG:201 < 7 && TALENT:TARGET:85 == 1 && TALENT:TARGET:314 != 9/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '333',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '334',
        any: [/「啊…是您啊…主人…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '334-335',
        any: [/「啊…是您啊…主人…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '336',
        any: [/%SAVESTR:TARGET%和原来的样子有点不太一样………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '337',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '338',
        any: [
          /「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%请听我说…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '338-339',
        any: [
          /「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%请听我说…！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '340',
        any: [/%SAVESTR:TARGET%仿佛像对待恋人一样随意的抱住了你………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '341',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '342',
        any: [/「那个…%SELF_CALL\(TARGET\)%…主人的话…真的好喜欢…我爱你！………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '343',
        any: [/「对%SELF_CALL\(TARGET\)%的爱慕、并不是什么假话…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '343-344',
        any: [/「对%SELF_CALL\(TARGET\)%的爱慕、并不是什么假话…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '345',
        any: [
          /%SAVESTR:TARGET%为了更好地抱住你、她撒娇一样的把脸颊紧贴着你………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '346',
        any: [/CFLAG:201 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '346-347',
        any: [/CFLAG:201 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '350',
        any: [
          /ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 8 && TALENT:TARGET:85 == 1 && TALEN/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '350-351',
        any: [
          /ELSEIF TALENT:TARGET:314 == 9 && CFLAG:201 < 8 && TALENT:TARGET:85 == 1 && TALEN/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '353',
        any: [/IF CFLAG:370 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '354',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '355',
        any: [/「这样…居然会有这样的感觉…那么…讨厌这样吗………真的讨厌这样吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '355-356',
        any: [/「这样…居然会有这样的感觉…那么…讨厌这样吗………真的讨厌这样吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '357',
        any: [/%SAVESTR:TARGET%和平时的样子有些不同。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '358',
        any: [/注意到了%NAME:MASTER%的到来、好像坚定了什么决心、开口了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '359',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '360',
        any: [
          /「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…那、那个…主人…对你的话…好、好像喜欢上了呢………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '360-361',
        any: [
          /「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…那、那个…主人…对你的话…好、好像喜欢上了呢………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '362',
        any: [/%SAVESTR:TARGET%说出的那句话连她自己都感觉吃惊………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '363',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '364',
        any: [/「啊…啊…啊啊啊、真的真的很喜欢…很爱你！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '365',
        any: [/「能一直呆在你脚下…就算只是一只宠物…那也好啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '365-366',
        any: [/「能一直呆在你脚下…就算只是一只宠物…那也好啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '367',
        any: [/%SAVESTR:TARGET%满溢的感情已经按捺不住了、泪水夺眶而出。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '368',
        any: [
          /因为多次的调教和魔族的本能、%SAVESTR:TARGET%深爱着%NAME:MASTER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '369',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '369-370',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '371-372',
        any: [/;調教後に魔族/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '373',
        any: [/ELSEIF CFLAG:370 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '374',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '375',
        any: [/「没有办法回到故乡也好…好不容易放弃了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '375-376',
        any: [/「没有办法回到故乡也好…好不容易放弃了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '377',
        any: [/%SAVESTR:TARGET%的样子和以前不太一样。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '378',
        any: [/注意到了%NAME:MASTER%的到来、好像坚定了什么决心、开口了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '379',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '380',
        any: [
          /「终于明白了%SELF_CALL\(TARGET\)%的归宿是哪里…那就是…这里啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '380-381',
        any: [
          /「终于明白了%SELF_CALL\(TARGET\)%的归宿是哪里…那就是…这里啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '382',
        any: [
          /%SAVESTR:TARGET%走近%NAME:MASTER%、充满爱意的把手放在了胸膛上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '383',
        any: [/手不断地颤抖着、可以看出来她下了多大的决心。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '384',
        any: [
          /要是真的话真想立刻抱抱这个女孩啊、她忍住了抱上来的冲动、自说自话道………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '385',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '386',
        any: [
          /「现在的主人…是%SELF_CALL\(TARGET\)%活下去的动力…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '387',
        any: [/「最喜欢的主人…满足的侍奉、所以离不开了呢…对吧…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '387-388',
        any: [/「最喜欢的主人…满足的侍奉、所以离不开了呢…对吧…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '389',
        any: [
          /因为多次的调教和魔族的本能、%SAVESTR:TARGET%深爱着%NAME:MASTER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '390',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '390-391',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '392-393',
        any: [/;陥落後に魔族/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '393-394',
        any: [/;陥落後に魔族/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '395',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '396',
        any: [
          /「啊啊啊…%SELF_CALL\(TARGET\)%…真的变成魔族了…已经回不了头了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '396-397',
        any: [
          /「啊啊啊…%SELF_CALL\(TARGET\)%…真的变成魔族了…已经回不了头了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '398',
        any: [/%SAVESTR:TARGET%高兴的连眼泪都流了出来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '399',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '400',
        any: [/「不过这样一来…%SELF_CALL\(TARGET\)%我永远离不开了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '400-401',
        any: [/「不过这样一来…%SELF_CALL\(TARGET\)%我永远离不开了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '402',
        any: [/%SAVESTR:TARGET%只是羞涩的笑了一下、就抱住了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '403',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '404',
        any: [/「哼哼、一定要更努力呢…亲爱的…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '404-405',
        any: [/「哼哼、一定要更努力呢…亲爱的…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '406',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '406-407',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '406-408',
        any: [/CFLAG:201 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '409-411',
        any: [/;崩壊/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '412',
        any: [/ELSEIF TALENT:TARGET:9 == 1 && CFLAG:201 < 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '412-413',
        any: [/ELSEIF TALENT:TARGET:9 == 1 && CFLAG:201 < 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '414',
        any: [/%SAVESTR:TARGET%露出了一种奇怪的表情自言自语着该如何是好。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '415',
        any: [/看到%NAME:MASTER%来了、整张脸都僵住了、小便无法抑制的往外流。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '416',
        any: [/%SAVESTR:TARGET%崩溃的精神应该是无法复原了吧………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '417',
        any: [/CFLAG:201 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '417-418',
        any: [/CFLAG:201 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '421',
        any: [/ELSEIF ASSI < 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '422',
        any: [/CALL K1_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '431',
        any: [/ELSEIF NO:ASSI == 17/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '432-433',
        any: [/;ELSEIF ASSI > 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '434',
        any: [/IF talent:ASSI:165/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '436',
        any: [/IF CFLAG:202 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '438',
        any: [/IF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '439',
        any: [/『…主人、这个人坏掉了\.\.\.』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '441',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && CFLAG:201 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '442',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '443',
        any: [/「诶…今天是主人和另外一个人一起来调教吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '443-444',
        any: [/「诶…今天是主人和另外一个人一起来调教吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '445',
        any: [
          /%SAVESTR:TARGET%对着第一次见到的少女舔着嘴唇。作为助手%NAME:MASTER%简单介绍了一下%SAVESTR:ASSI%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '446',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '447',
        any: [/「哈哈…就是那个孩子来调教%SELF_CALL\(TARGET\)%吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '447-448',
        any: [/「哈哈…就是那个孩子来调教%SELF_CALL\(TARGET\)%吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '449',
        any: [/她笑出了声来、%SAVESTR:ASSI%有一点生气、皱起了眉头。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '450',
        any: [
          /『虽然腿脚都被固定住无法站立、但是还是让我告诉你谁在上面吧、原勇者姐姐。%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '452',
        any: [
          /兴奋不已的%SAVESTR:ASSI%开始摩擦双腿。这样就可以了吧%NAME:MASTER%按住了她的头………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '454',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && CFLAG:201 >= 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '455',
        any: [
          /%SAVESTR:TARGET%看到%NAME:MASTER%带来的少女不由得大声呵斥起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '456',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '457',
        any: [/「啊…啊…这个孩子…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '457-458',
        any: [/「啊…啊…这个孩子…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '459',
        any: [
          /%SAVESTR:TARGET%斜睨着、仿佛稍微许可了。看着这种态度%SAVESTR:ASSI%不满的上前一步。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '460',
        any: [
          /『说什么呢我的姐姐、我们还都是主人的奴隶啊…这有什么值得自豪的么…？』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '461',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '462',
        any: [/「嘛、虽说是奴隶…可是你这样的孩子…那一位…那个………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '462-463',
        any: [/「嘛、虽说是奴隶…可是你这样的孩子…那一位…那个………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '464',
        any: [/好像想起了自己”奴隶”的立场、%SAVESTR:TARGET%不再说什么了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '465',
        any: [/『啊…这样啊…姐姐你嫉妒了呢…』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '467',
        any: [/IF TALENT:ASSI:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '468',
        any: [
          /『姐姐应该也深爱着主人吧…那样的话、就和我一起侍奉主人吧%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '469',
        any: [/%SAVESTR:ASSI%说着、舔着嘴唇压倒了%SAVESTR:TARGET%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '470',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '471',
        any: [/「啊、这样的…不要…住手啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '471-472',
        any: [/「啊、这样的…不要…住手啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '473',
        any: [
          /『我可爱的姐姐啊…好啊、我会好好的调教你、但是在主人面前我们还是公平竞争吧。%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '474-475',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '476',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '477',
        any: [
          /「那样的…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%并不是…那样的…嫉妒什么的………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '477-478',
        any: [
          /「那样的…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%并不是…那样的…嫉妒什么的………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '479',
        any: [
          /『我可爱的姐姐啊…好啊、我会好好的调教你、但是在主人面前我们还是公平竞争吧。%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '480',
        any: [
          /%SAVESTR:ASSI%这么说着然后用舌头舔着嘴唇推到了%SAVESTR:TARGET%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '480-481',
        any: [
          /%SAVESTR:ASSI%这么说着然后用舌头舔着嘴唇推到了%SAVESTR:TARGET%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '482-483',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '484',
        any: [/今天的%NAME:MASTER%拉着助手%SAVESTR:ASSI%一起来了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '485',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '486',
        any: [
          /「啊…这个孩子难道说来自附近的村庄………她姐姐哭着求我”请帮我找一下、我求你了”！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '486-487',
        any: [
          /「啊…这个孩子难道说来自附近的村庄………她姐姐哭着求我”请帮我找一下、我求你了”！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '488',
        any: [/『这样啊…我姐姐的事早忘记了呢…』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '489',
        any: [/%SAVESTR:ASSI%稍微抬起头不胜感慨的自言自语道。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '490',
        any: [
          /『但是我…已经不想回去了啊。而且今天我是作为主人的助手来调教”原”勇者大人的呢。』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '491',
        any: [/%SAVESTR:ASSI%掐着%SAVESTR:TARGET%的乳房尽情扭起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '492',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '493',
        any: [/「呃…呃…呃…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '493-494',
        any: [/「呃…呃…呃…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '495',
        any: [/一边看着%SAVESTR:TARGET%痛苦的悲鸣%SAVESTR:ASSI%翘起了嘴角。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '496',
        any: [/看着今天有趣的调教%NAME:MASTER%露出了笑容………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '496-497',
        any: [/看着今天有趣的调教%NAME:MASTER%露出了笑容………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '498',
        any: [/CFLAG:202 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '498-499',
        any: [/CFLAG:202 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '501',
        any: [/ELSEIF CFLAG:202 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '503',
        any: [/IF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '504',
        any: [/『主人、这个坏了的玩具无法复原的话真的好吗？』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '506',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '507',
        any: [/今天的%NAME:MASTER%拉着助手%SAVESTR:ASSI%一起来了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '508',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '509',
        any: [/「啊啊啊…还…带着这个孩子过来了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '509-510',
        any: [/「啊啊啊…还…带着这个孩子过来了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '511',
        any: [/%SAVESTR:TARGET%想着闭上了眼睛。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '512',
        any: [
          /『不要移开双眼啊…我可是很喜欢我可爱的姐姐的说%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '513',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '514',
        any: [/「啊啊啊…！是不行的哦…停、快停下………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '514-515',
        any: [/「啊啊啊…！是不行的哦…停、快停下………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '516',
        any: [/%SAVESTR:TARGET%在%NAME:MASTER%的眼前被少女捉弄………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '518',
        any: [/IF ABL:17 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '519',
        any: [/『你看姐姐、亲爱的主人似乎特别想让我们展示讨厌的地方呢？』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '520',
        any: [/%SAVESTR:ASSI%在%SAVESTR:TARGET%的耳边低声说道。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '521',
        any: [
          /%SAVESTR:TARGET%一边红着脸坐在地上双腿像M字一样打开一边挺着腰诱惑%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '522',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '523',
        any: [
          /「啊啊啊…看啊…主人啊…%SELF_CALL\(TARGET\)%的小穴…只是被主人看到就变得黏糊糊的了啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '523-524',
        any: [
          /「啊啊啊…看啊…主人啊…%SELF_CALL\(TARGET\)%的小穴…只是被主人看到就变得黏糊糊的了啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '525',
        any: [/『哈哈、姐姐很可爱哟…棒极了%UNICODE\(0x2661\) \*1%』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '527',
        any: [/ELSEIF ABL:17 >= 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '528',
        any: [
          /『你看姐姐、好像展示给主人讨厌的地方了呢%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '529',
        any: [
          /%SAVESTR:ASSI%从后面抱住%SAVESTR:TARGET%、把她的胸从下面抬了起来展示给%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '530',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '531',
        any: [
          /「啊啊啊…啊啊啊啊啊啊啊啊…被看到喽…被主人看到喽………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '531-532',
        any: [
          /「啊啊啊…啊啊啊啊啊啊啊啊…被看到喽…被主人看到喽………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '533',
        any: [/『哈、姐姐很可爱哟…%UNICODE\(0x2661\) \*1%』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '533-534',
        any: [/『哈、姐姐很可爱哟…%UNICODE\(0x2661\) \*1%』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '535',
        any: [
          /『你看姐姐、好像展示给主人讨厌的地方了呢%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '536',
        any: [
          /%SAVESTR:ASSI%从后面抱住把双腿拉开了、采取了展现给%NAME:MASTER%的姿势。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '537',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '538',
        any: [/「啊啊啊…不行啦…快停下吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '538-539',
        any: [/「啊啊啊…不行啦…快停下吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '540',
        any: [/『嗯、还需要更多的调教么？』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '540-541',
        any: [/『嗯、还需要更多的调教么？』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '543',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '544',
        any: [/今天的%NAME:MASTER%拉着助手%SAVESTR:ASSI%一起来了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '545',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '546',
        any: [/「哈…今天也来了呢%SAVESTR:ASSI%酱%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '546-547',
        any: [/「哈…今天也来了呢%SAVESTR:ASSI%酱%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '548',
        any: [/%SAVESTR:TARGET%一边咬着嘴唇一边淫乱的弯起了嘴角。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '550',
        any: [
          /『嗯、今天也要”玩”哟…要做到爽够了为止呦%UNICODE\(0x2661\) \*1%』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '551',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '552',
        any: [
          /「啊啊…来啊…来啊…%SAVESTR:ASSI%尽管来吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '552-553',
        any: [
          /「啊啊…来啊…来啊…%SAVESTR:ASSI%尽管来吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '554',
        any: [
          /看到少女的%SAVESTR:TARGET%热情的张开双手求欢、%NAME:MASTER%对从现在开始的表演兴奋不已………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '555-556',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '557',
        any: [/今天的%NAME:MASTER%拉着助手%SAVESTR:ASSI%一起来了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '558',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '559',
        any: [/「还把那孩子带过来什么的…啊、真是不知羞耻！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '559-560',
        any: [/「还把那孩子带过来什么的…啊、真是不知羞耻！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '561',
        any: [
          /少女的面前、不想破坏强硬姿态的%SAVESTR:TARGET%看着%NAME:MASTER%微微地笑了笑。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '562',
        any: [/『哎～…很期待和我见面吗？』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '563',
        any: [
          /%SAVESTR:ASSI%露出了好色的笑容把脸贴近了%SAVESTR:TARGET%的面前。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '564',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '565',
        any: [/「那、那种事怎么可能………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '565-566',
        any: [/「那、那种事怎么可能………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '568',
        any: [/IF ABL:33 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '569',
        any: [/%SAVESTR:TARGET%一边说着一边双眼湿润露出眼馋的样子。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '570',
        any: [
          /『啊哈哈…这种表情的勇者大人啊%UNICODE\(0x2661\) \*1% 好哟我会让你好好满足的！』/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '571',
        any: [/少女被%SAVESTR:TARGET%推到同时露出高兴的叹息………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '573',
        any: [/ELSEIF ABL:22 >= 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '574',
        any: [
          /%SAVESTR:TARGET%一边说着一边扭扭捏捏的情不自禁把视线放到了两脚上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '575',
        any: [/『勇者大人真不老实啊…』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '576',
        any: [/少女被动地被%SAVESTR:TARGET%推到露出了羞耻的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '576-577',
        any: [/少女被动地被%SAVESTR:TARGET%推到露出了羞耻的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '578',
        any: [/%SAVESTR:TARGET%开始拼命想移开看向%SAVESTR:ASSI%的视线。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '579',
        any: [/『算了吧、马上就好了啊%UNICODE\(0x2661\) \*1%』/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '580',
        any: [/少女被%SAVESTR:TARGET%推到后咬紧嘴唇忍耐着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '580-581',
        any: [/少女被%SAVESTR:TARGET%推到后咬紧嘴唇忍耐着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '580-582',
        any: [/少女被%SAVESTR:TARGET%推到后咬紧嘴唇忍耐着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '583-585',
        any: [/;口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '584-585',
        any: [/;口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '585-586',
        any: [/;口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '587',
        any: [/CALL K1_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '587-588',
        any: [/CALL K1_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '639-640',
        any: [/;口上のある助手が居ない場合は、通常の二回目以降の口上へ飛ぶ/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '641',
        any: [/CALL K1_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '641-642',
        any: [/CALL K1_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '648',
        any: [/@K1_KOJO2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '650',
        any: [/IF TALENT:TARGET:9 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '650-651',
        any: [/IF TALENT:TARGET:9 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '652',
        any: [/「咿…咿咿…不要…咿啊咿…咿！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '653',
        any: [/不能指望精神崩溃的%SAVESTR:TARGET%做出什么正常的反应吧………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '653-654',
        any: [/不能指望精神崩溃的%SAVESTR:TARGET%做出什么正常的反应吧………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '657',
        any: [/ELSEIF MARK:3 == 3 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '657-658',
        any: [/ELSEIF MARK:3 == 3 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '659',
        any: [/「绝对…会杀了你」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '660',
        any: [/%SAVESTR:TARGET%的眼睛里充满了杀意………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '660-661',
        any: [/%SAVESTR:TARGET%的眼睛里充满了杀意………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '664',
        any: [
          /ELSEIF MARK:2 == 0 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 =/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '664-665',
        any: [
          /ELSEIF MARK:2 == 0 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 =/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '666',
        any: [/IF TALENT:11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '668',
        any: [/「…差劲！　别再过来了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '669',
        any: [/%SAVESTR:TARGET%毅然决然地瞪着你………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '670',
        any: [/ELSEIF TALENT:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '672',
        any: [/「啧…又来了啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '673',
        any: [/%SAVESTR:TARGET%露着碰见麻烦事的表情和你对峙着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '673-674',
        any: [/%SAVESTR:TARGET%露着碰见麻烦事的表情和你对峙着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '675',
        any: [/「哼、没用的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '676',
        any: [/%SAVESTR:TARGET%一副毅然的姿态和你对峙着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '676-677',
        any: [/%SAVESTR:TARGET%一副毅然的姿态和你对峙着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '676-678',
        any: [/%SAVESTR:TARGET%一副毅然的姿态和你对峙着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '681',
        any: [
          /ELSEIF MARK:2 == 1 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 =/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '681-682',
        any: [
          /ELSEIF MARK:2 == 1 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 =/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '683',
        any: [/IF TALENT:11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '685',
        any: [/「…别开玩笑了！　想做这种事到什么时候…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '686',
        any: [/和话语不同的是%SAVESTR:TARGET%的视线从你身上移开了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '687',
        any: [/ELSEIF TALENT:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '689',
        any: [/「差不多点啊…也该、知难而退了吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '690',
        any: [/%SAVESTR:TARGET%错乱的气息让身体略显僵硬/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '691',
        any: [/而后双脚颤抖着、脚步也变得不稳了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '691-692',
        any: [/而后双脚颤抖着、脚步也变得不稳了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '693',
        any: [/「老是这样啊…差不多了就好了啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '694',
        any: [/%SAVESTR:TARGET%看着你的眼睛如此嘟囔着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '694-695',
        any: [/%SAVESTR:TARGET%看着你的眼睛如此嘟囔着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '694-696',
        any: [/%SAVESTR:TARGET%看着你的眼睛如此嘟囔着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '699',
        any: [
          /ELSEIF MARK:2 == 2 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 =/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '699-700',
        any: [
          /ELSEIF MARK:2 == 2 && FLAG:7 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 =/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '701',
        any: [/「…我明白了。这样做就好了吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '702',
        any: [/%SAVESTR:TARGET%放弃了似的把身体全暴露在你眼前………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '702-703',
        any: [/%SAVESTR:TARGET%放弃了似的把身体全暴露在你眼前………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '706',
        any: [
          /ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && FLAG:7 == 2 && TALENT:TARGET:76 =/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '706-707',
        any: [
          /ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && FLAG:7 == 2 && TALENT:TARGET:76 =/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '708',
        any: [/「我知道了…主人…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '710',
        any: [
          /「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%的…不检点的淫乱肛门…喜欢…你、你侵犯………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '711',
        any: [/SELECTCASE TALENT:TARGET:300/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '712',
        any: [/CASE 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '713',
        any: [/%SAVESTR:TARGET%红着脸轻轻的拉着自己的金色的发梢………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '714',
        any: [/CASE 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '715',
        any: [/%SAVESTR:TARGET%红着脸轻轻的拉着自己的栗色的发梢………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '716',
        any: [/CASE 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '717',
        any: [/%SAVESTR:TARGET%红着脸轻轻的拉着自己的黒色的发梢………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '718',
        any: [/CASE 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '719',
        any: [/%SAVESTR:TARGET%红着脸轻轻的拉着自己的赤色的发梢………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '720',
        any: [/CASE 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '721',
        any: [/%SAVESTR:TARGET%红着脸轻轻的拉着自己的銀色的发梢………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '722',
        any: [/CASE 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '723',
        any: [/%SAVESTR:TARGET%红着脸轻轻的拉着自己的青色的发梢………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '724',
        any: [/CASE 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '725',
        any: [/%SAVESTR:TARGET%红着脸轻轻的拉着自己的緑色的发梢………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '726',
        any: [/ENDSELECT/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '726-727',
        any: [/ENDSELECT/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '730',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '730-731',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '733',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '735',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '736',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '737',
        any: [
          /「哈%UNICODE\(0x2661\) \*1% 主人啊…你来了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '737-738',
        any: [
          /「哈%UNICODE\(0x2661\) \*1% 主人啊…你来了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '739',
        any: [/%SAVESTR:TARGET%的眼神闪烁着兴奋的光辉………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '740',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '741',
        any: [
          /「侍奉%UNICODE\(0x2661\) \*1%侍奉%UNICODE\(0x2661\) \*1%…好好的侍奉主人的身体%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '743',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '744',
        any: [
          /「喂%UNICODE\(0x2661\) \*1%…快点…享受%SELF_CALL\(TARGET\)%淫乱的魔族肛门满满的侍奉吧%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '744-745',
        any: [
          /「喂%UNICODE\(0x2661\) \*1%…快点…享受%SELF_CALL\(TARGET\)%淫乱的魔族肛门满满的侍奉吧%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '746-747',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '747',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '748',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '749',
        any: [/「喂喂、主人…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '749-750',
        any: [/「喂喂、主人…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '751',
        any: [/%SAVESTR:TARGET%满意的用翅膀呼呼的漂浮在房间里等着你………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '752',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '753',
        any: [
          /「就这样在空中做爱可以么？ 非常的舒服吧………哎、因为很累不喜欢？ 哎呦…真是可惜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '753-754',
        any: [
          /「就这样在空中做爱可以么？ 非常的舒服吧………哎、因为很累不喜欢？ 哎呦…真是可惜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '755-756',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '756',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '757',
        any: [
          /「啊、主人啊%UNICODE\(0x2661\) \*1% 让我好好的侍奉你吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '757-758',
        any: [
          /「啊、主人啊%UNICODE\(0x2661\) \*1% 让我好好的侍奉你吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '759',
        any: [/%SAVESTR:TARGET%像狗一样伸长舌头舔着你的脸旋转………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '760',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '761',
        any: [
          /「呼…这种味道啊…主人也发情了啊%UNICODE\(0x2661\) \*1% 侍奉有意义了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '761-762',
        any: [
          /「呼…这种味道啊…主人也发情了啊%UNICODE\(0x2661\) \*1% 侍奉有意义了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '763-764',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '764-765',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '767',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '768',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '769',
        any: [/「主人啊…让我更多的侍奉你吧…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '769-770',
        any: [/「主人啊…让我更多的侍奉你吧…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '771',
        any: [/%SAVESTR:TARGET%抱着你用娇滴滴的声音轻轻说道………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '772',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '773',
        any: [/「嘴巴…乳房…任何地方都可以侍奉主人哦%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '775',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '776',
        any: [
          /「啊哈啊%UNICODE\(0x2661\) \*1%…特别是%SELF_CALL\(TARGET\)%淫乱的肛门…很舒服的说%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '776-777',
        any: [
          /「啊哈啊%UNICODE\(0x2661\) \*1%…特别是%SELF_CALL\(TARGET\)%淫乱的肛门…很舒服的说%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '778-779',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '779',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '780',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '781',
        any: [/「啊啊啊…太好了…今天主人来了呢…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '781-782',
        any: [/「啊啊啊…太好了…今天主人来了呢…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '783',
        any: [/%SAVESTR:TARGET%在确认你来了的一瞬间就跑了过来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '784',
        any: [/好像发情那样…可以看见躺在床上自慰弄出来的污渍一样的东西………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '785',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '786',
        any: [
          /「哈%UNICODE\(0x2661\) \*1%…请摸%SELF_CALL\(TARGET\)%的这里哦…随时都准备着被你玩弄呢…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '786-787',
        any: [
          /「哈%UNICODE\(0x2661\) \*1%…请摸%SELF_CALL\(TARGET\)%的这里哦…随时都准备着被你玩弄呢…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '788-789',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '789',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '790',
        any: [
          /「咿嗼…真的主人%SELF_CALL\(TARGET\)%没有你性欲就消不下去呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '790-791',
        any: [
          /「咿嗼…真的主人%SELF_CALL\(TARGET\)%没有你性欲就消不下去呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '792',
        any: [/%SAVESTR:TARGET%高兴的说、一副随你玩弄的样子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '793',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '794',
        any: [/「很多的侍奉呢%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '794-795',
        any: [/「很多的侍奉呢%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '794-796',
        any: [/「很多的侍奉呢%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '794-797',
        any: [/「很多的侍奉呢%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '798-800',
        any: [/;愛/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '801',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '801-802',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '804',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '806',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '807',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '808',
        any: [/「啊…小穴…一直在等着你哟…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '808-809',
        any: [/「啊…小穴…一直在等着你哟…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '810',
        any: [/%SAVESTR:TARGET%很害羞的不停地扭着腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '811',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '812',
        any: [/「今年H的很多啦、啊？啊？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '812-813',
        any: [/「今年H的很多啦、啊？啊？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '814',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '815',
        any: [/%SAVESTR:TARGET%向着你夸张的飞扑过来了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '816',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '817',
        any: [/「我已经不行了…等不急了啦…身体变得热的不得了了啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '819',
        any: [
          /「啊啊啊…哎呀…只是嗅到你肛门的味道…随意玩弄我吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '820',
        any: [/「哈…哈…嗯、已经不行了…忍不住了………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '820-821',
        any: [/「哈…哈…嗯、已经不行了…忍不住了………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '822-823',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '823',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '824',
        any: [/「嗯…今天有好好的老实等待呢………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '824-825',
        any: [/「嗯…今天有好好的老实等待呢………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '826',
        any: [/%SAVESTR:TARGET%红着脸不停的相互摩擦着大腿根部………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '827',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '828',
        any: [/「所以…给我更多的奖赏吧…啊？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '828-829',
        any: [/「所以…给我更多的奖赏吧…啊？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '830-831',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '831-832',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '834',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '835',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '836',
        any: [/「还不是太迟。好像自慰啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '836-837',
        any: [/「还不是太迟。好像自慰啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '838',
        any: [/%SAVESTR:TARGET%半开玩笑的语气扑哧一笑把身体交给了你………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '839',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '840',
        any: [/「更多…舒服的事吧…啊？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '840-841',
        any: [/「更多…舒服的事吧…啊？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '842',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '843',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '844',
        any: [/「今天也要疼爱我啊、主人」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '844-845',
        any: [/「今天也要疼爱我啊、主人」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '846',
        any: [/%SAVESTR:TARGET%用恋人般的动作对你问道………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '847',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '848',
        any: [/「哈…已经变大了啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '848-849',
        any: [/「哈…已经变大了啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '850-851',
        any: [/%SAVESTR:TARGET%抱住你然后撒娇道………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '851',
        any: [/%SAVESTR:TARGET%抱住你然后撒娇道………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '852',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '853',
        any: [/「更多、蜡啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '855',
        any: [
          /「%SELF_CALL\(TARGET\)%的…菊、肛门啊…啊、肛门…痛的不行啊………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '856',
        any: [/「%SELF_CALL\(TARGET\)%已经忍不住了………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '856-857',
        any: [/「%SELF_CALL\(TARGET\)%已经忍不住了………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '856-858',
        any: [/「%SELF_CALL\(TARGET\)%已经忍不住了………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '856-859',
        any: [/「%SELF_CALL\(TARGET\)%已经忍不住了………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '856-860',
        any: [/「%SELF_CALL\(TARGET\)%已经忍不住了………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '856-861',
        any: [/「%SELF_CALL\(TARGET\)%已经忍不住了………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '862-866',
        any: [/;EVENTEND関係（X1をキャラ番号に置換） CFLAG 211～220を使用/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '863-866',
        any: [/;EVENTEND関係（X1をキャラ番号に置換） CFLAG 211～220を使用/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '869',
        any: [/@EVENTEND/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '870-871',
        any: [/SIF FLAG:7 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '872-873',
        any: [/SIF TALENT:161 != 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '876-877',
        any: [/SIF BASE:0 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '883',
        any: [/IF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '883-884',
        any: [/IF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '885',
        any: [/「嘻嘻…嘻嘻！…啊、啊…咕咭咿………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '886',
        any: [
          /%SAVESTR:TARGET%的全身被污物沾满了、%NAME:MASTER%吩咐女仆打扫了房间和她的身体………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '886-887',
        any: [
          /%SAVESTR:TARGET%的全身被污物沾满了、%NAME:MASTER%吩咐女仆打扫了房间和她的身体………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '890',
        any: [
          /ELSEIF MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '890-891',
        any: [
          /ELSEIF MARK:3 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '892',
        any: [/「无聊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '892-893',
        any: [/「无聊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '896',
        any: [
          /ELSEIF MARK:2 <= 1 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '896-897',
        any: [
          /ELSEIF MARK:2 <= 1 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '898',
        any: [/「…停下了？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '898-899',
        any: [/「…停下了？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '902',
        any: [
          /ELSEIF MARK:2 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '902-903',
        any: [
          /ELSEIF MARK:2 == 2 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '904',
        any: [/「…相当不错嘛。但是堕落什么的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '904-905',
        any: [/「…相当不错嘛。但是堕落什么的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '908',
        any: [
          /ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '908-909',
        any: [
          /ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 0 && TALENT:TARGET:76 == 0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '910',
        any: [/「哈哈…太好了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '910-911',
        any: [/「哈哈…太好了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '913',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '913-914',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && BASE:0 >= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '916',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '917',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '918',
        any: [/「啊、真是的…身体好热啊…忍不住的快感………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '918-919',
        any: [/「啊、真是的…身体好热啊…忍不住的快感………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '920-921',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '922',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '923',
        any: [
          /「你的侍奉不够的哟～ 来更多各种各样的吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '923-924',
        any: [
          /「你的侍奉不够的哟～ 来更多各种各样的吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '923-925',
        any: [
          /「你的侍奉不够的哟～ 来更多各种各样的吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '926-927',
        any: [/;淫乱\(体力500未満\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '928',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '928-929',
        any: [/ELSEIF TALENT:TARGET:76 == 1 && BASE:0 <= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '931',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '932',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '933',
        any: [/「啊啊啊…太好了………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '933-934',
        any: [/「啊啊啊…太好了………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '935-936',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '937',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '938',
        any: [/「哈…哈…你满足了呢…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '938-939',
        any: [/「哈…哈…你满足了呢…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '938-940',
        any: [/「哈…哈…你满足了呢…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '941-943',
        any: [/;愛\(体力500以上\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '944',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '944-945',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && BASE:0 >= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '947',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '948',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '949',
        any: [/「啊啊啊…我还想要更多啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '949-950',
        any: [/「啊啊啊…我还想要更多啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '951-952',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '953',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '954',
        any: [/「更加激烈地也可以啊？　唔呼呼」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '954-955',
        any: [/「更加激烈地也可以啊？　唔呼呼」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '954-956',
        any: [/「更加激烈地也可以啊？　唔呼呼」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '957-958',
        any: [/;愛\(体力500未満\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '959',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '959-960',
        any: [/ELSEIF TALENT:TARGET:85 == 1 && BASE:0 <= 500/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '962',
        any: [/IF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '963',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '964',
        any: [
          /「哈…啊…已经…脑海之中…乱七八糟的…啊…啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '964-965',
        any: [
          /「哈…啊…已经…脑海之中…乱七八糟的…啊…啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '966-967',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '968',
        any: [/SETCOLOR 255,204,255/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '969',
        any: [/「还…完全没关系…可以继续呢………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '969-970',
        any: [/「还…完全没关系…可以继续呢………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '969-971',
        any: [/「还…完全没关系…可以继续呢………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '969-972',
        any: [/「还…完全没关系…可以继续呢………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '969-973',
        any: [/「还…完全没关系…可以继续呢………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '974-977',
        any: [/;@KOJO_MESSAGE_COM関係（X1をキャラ番号に置換）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '980',
        any: [/@KOJO_MESSAGE_COM_1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '982',
        any: [/IF TEQUIP:55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '982-1005',
        any: [/;触手調教中は口上をスキップする/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '983',
        any: [/CALL COLOSSEUM_KOJO_1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '983-984',
        any: [/CALL COLOSSEUM_KOJO_1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '985-986',
        any: [
          /;助手が調教した時に口上をスキップする（好みに応じて使う、行頭の;を消すとスキップするようになる）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '990-991',
        any: [/SIF TEQUIP:45 && SELECTCOM != 45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '993-994',
        any: [/SIF TFLAG:899/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '996-997',
        any: [/SIF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '999',
        any: [/IF TEQUIP:89/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1000',
        any: [/CALL DOG_KOJO_1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1000-1001',
        any: [/CALL DOG_KOJO_1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1002-1003',
        any: [/;触手調教中は口上をスキップする/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1004-1005',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1013',
        any: [/IF SELECTCOM == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1015',
        any: [/IF CFLAG:301 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1017',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1018',
        any: [/%SAVESTR:TARGET%转过脸就这样看着%SAVESTR:ASSI%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1020',
        any: [/ELSEIF MARK:2 >= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1021',
        any: [/「真的！…但、只要忍住就好了…啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1022-1023',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1024',
        any: [/「放过我吧！别再来了…唔哇」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1024-1025',
        any: [/「放过我吧！别再来了…唔哇」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1026',
        any: [/CFLAG:301 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1026-1027',
        any: [/CFLAG:301 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1028-1029',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1031',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1032',
        any: [/%SAVESTR:TARGET%在%SAVESTR:ASSI%的爱抚下喘着粗气………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1034',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1035',
        any: [
          /「啊哈…想要更多的爱抚…啊啊…留下更多的痕迹吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1036',
        any: [/%SAVESTR:TARGET%快乐地扭动着身体………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1037',
        any: [/CFLAG:301 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1039',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1040',
        any: [/「啊…即使更加激烈…没关系的…真的♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1041',
        any: [/「主人啊…更…还想要更多…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1042',
        any: [/CFLAG:301 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1044',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1045',
        any: [/「哈…爱抚…更多的爱抚呦…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1046',
        any: [/「被别人这么玩弄真是太好了呐…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1047',
        any: [/CFLAG:301 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1049',
        any: [/ELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1050',
        any: [/「啊啊…明明这么恶心…明明这么恶心…咕」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1051',
        any: [/「嘁、嘁啊…没有感觉啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1052',
        any: [/CFLAG:301 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1054',
        any: [/ELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1055',
        any: [/「哈…放过我吧…这样一点儿也…咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1056',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1056-1057',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1056-1058',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1056-1059',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1060-1063',
        any: [/;クンニ CFLAG:302/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1065',
        any: [/IF SELECTCOM == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1067',
        any: [/IF CFLAG:302 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1069',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1070',
        any: [/%SAVESTR:TARGET%发出闷声闷气的悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1072',
        any: [/ELSEIF TALENT:TARGET:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1073',
        any: [/「这样好肮脏！不、不行！臭死了！你这个变态！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1074',
        any: [/「还、还在那里…谁…咿」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1075-1076',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1077',
        any: [/「呀！把、把嘴放在那种地方什么的…一定是变态吧！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1077-1078',
        any: [/「呀！把、把嘴放在那种地方什么的…一定是变态吧！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1079',
        any: [/CFLAG:302 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1079-1080',
        any: [/CFLAG:302 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1081-1082',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1084',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1085',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%那样的对待………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1087',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1088',
        any: [
          /「啊啊啊%UNICODE\(0x2661\) \*1% 真是的…长长的舌头…伸到最里面…好棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1089',
        any: [/%SAVESTR:TARGET%自己分开双腿接受舔舐………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1090',
        any: [/CFLAG:302 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1092',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1093',
        any: [
          /「啊啊…是的…更多的…请你玩弄…主人的…好爽…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1094',
        any: [/「咿！主人啊！主人啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1095',
        any: [/%SAVESTR:TARGET%兴高采烈的享受着你的爱抚………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1096',
        any: [/CFLAG:302 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1098',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1099',
        any: [/「啊啊啊！更…多的爱抚我吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1100',
        any: [/「用长长的舌头…伸到最深处…咿」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1101',
        any: [/CFLAG:302 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1103',
        any: [/ELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1104',
        any: [/「切…感觉好难受…快点…走开啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1105',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1105-1106',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1105-1107',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1105-1108',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1109-1112',
        any: [/;アナル愛撫 CFLAG:303/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1114',
        any: [/IF SELECTCOM == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1116',
        any: [/IF CFLAG:303 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1117',
        any: [/「啊啊啊！那、那里是…停、停下…天啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1118',
        any: [/CFLAG:TARGET:303 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1118-1119',
        any: [/CFLAG:TARGET:303 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1120-1121',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1122',
        any: [/P = PALAM:3 \+ UP:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1124',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1124-1125',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1127',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && P >= PALAMLV:2 && \(CFLA/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1128',
        any: [
          /「啊啊啊%UNICODE\(0x2661\) \*1% 肛门…去了啊%UNICODE\(0x2661\) \*1%好棒哦%UNICODE\(0x2661\) \*1%啊啊啊啊啊啊/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1129',
        any: [
          /「手指插进去了…好棒啊啊…肛门不行了啊…要疯了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1130',
        any: [/%SAVESTR:TARGET%输给了肛门的快感发出了可耻的娇声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1131',
        any: [/CFLAG:303 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1133',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 7 \|\| FLAG:7 == 2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1134',
        any: [
          /「啊！真是的！%UNICODE\(0x2661\) \*1% 嗯啊啊…手指…插到最深处了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1135',
        any: [
          /「玩弄肛门吧…玩弄%SELF_CALL\(TARGET\)%淫乱的肛门吧 %UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1136',
        any: [/%SAVESTR:TARGET%被肛门的快感刺激发出了娇滴滴的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1137',
        any: [/CFLAG:303 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1139',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1140',
        any: [
          /「啊啊哼…还没…还没瑞润滑…我要去了…啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1141',
        any: [/%SAVESTR:TARGET%发出了欲求不满的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1142',
        any: [/CFLAG:303 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1144',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 5 \|\| FLAG:7 == 2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1145',
        any: [/「呀啊！？哈…肛门…更加粗暴的玩弄吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1146',
        any: [/「%SELF_CALL\(TARGET\)%哈…是肛门被玩弄就会高潮的变态啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1147',
        any: [/「还要更多…请更加粗暴的玩弄那里吧…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1148',
        any: [/CFLAG:303 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1150',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && P >= PALAMLV:2 && \(CFLAG:303 <= 4 \|\| FLAG:7 == 2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1151',
        any: [
          /「哈呜…肛门…手指查进里面了…好…好奇怪的感觉…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1152',
        any: [/「更多…咕叽咕叽…玩…玩弄那吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1153',
        any: [/CFLAG:303 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1155',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && P < PALAMLV:2 && \(CFLAG:303 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1156',
        any: [/「咕…咕叽…这样…插进…屁股…变的奇怪起来了…咕呜」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1157',
        any: [/「主人…还要更多…温柔点…咕叽%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1158',
        any: [/CFLAG:303 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1160',
        any: [
          /ELSEIF P >= PALAMLV:2 && ABL:3 >= 3 && \(CFLAG:303 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1161',
        any: [/「咿！屁股…明明不舒服…手指进去了…呀！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1162',
        any: [/「啊！切、这是不对的…没什么感觉…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1163',
        any: [/CFLAG:303 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1165',
        any: [/ELSEIF CFLAG:303 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1166',
        any: [/「好难受啊…快拔出来…求你了!…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1167',
        any: [/CFLAG:303 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1167-1168',
        any: [/CFLAG:303 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1167-1169',
        any: [/CFLAG:303 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1167-1170',
        any: [/CFLAG:303 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1171-1174',
        any: [/;自慰 CFLAG304/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1176',
        any: [/IF SELECTCOM == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1178',
        any: [/IF CFLAG:304 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1179',
        any: [
          /「怎么这样…%SELF_CALL\(TARGET\)%这种事…这种事情不可以啊…呜啊、看、看吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1180',
        any: [/CFLAG:TARGET:304 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1180-1181',
        any: [/CFLAG:TARGET:304 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1182-1183',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1185',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1186',
        any: [
          /%SAVESTR:TARGET%害羞地红着脸同时在%SAVESTR:ASSI%和%NAME:MASTER%的面前自慰着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1188',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 8 \|\| FLAG:/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1189',
        any: [
          /「啊啊啊…%SELF_CALL\(TARGET\)%污秽的身体是被主人调教成这样了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1190',
        any: [
          /「只有这里…只有这里…我还是处女就这样下去不行啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1191',
        any: [/「哎呀…%SELF_CALL\(TARGET\)%的处女…被糟蹋了…啊啊啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1192',
        any: [/CFLAG:304 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1194',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1196',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1197',
        any: [
          /「呼呜…啊啊啊…%SELF_CALL\(TARGET\)%的样子被看到了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1198',
        any: [
          /「这些全部都是…为了让主人高兴才去学习的哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1199',
        any: [
          /「乳房也是…肛门也是…小穴…也是…咿…啊啊啊…不行了…自慰真的好棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1200',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1201',
        any: [
          /「啊真是的…即使不被命令…自慰的话一整天继续都可以哟%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1202',
        any: [/「是啊…一直这样自慰我喜欢好棒啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1203',
        any: [/「呼呜…摩擦摩擦…摩擦小穴呜啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1203-1204',
        any: [/「呼呜…摩擦摩擦…摩擦小穴呜啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1205',
        any: [
          /「啊呀啊真是的%UNICODE\(0x2661\) \*1% 小穴的自慰停不下来啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1206',
        any: [
          /「我已经…停不下来了马上高潮了…主人看吧看吧…看着我自慰到高潮吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1207',
        any: [/%SAVESTR:TARGET%一边弓着背还一继续边手淫………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1207-1208',
        any: [/%SAVESTR:TARGET%一边弓着背还一继续边手淫………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1209',
        any: [/CFLAG:304 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1211',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1213',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1214',
        any: [
          /「我一直在自慰呢…太舒服了…你看啊…请你看看我现在的样子吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1215',
        any: [/%SAVESTR:TARGET%单膝立起两腿大张。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1216',
        any: [
          /「求主人快来玩弄我吧…好棒啊…啊%UNICODE\(0x2661\) \*1%…快来狠狠的虐待我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1216-1217',
        any: [
          /「求主人快来玩弄我吧…好棒啊…啊%UNICODE\(0x2661\) \*1%…快来狠狠的虐待我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1218',
        any: [
          /「就是这样啊…手指停不下来了…呦啊%UNICODE\(0x2661\) \*1% 淫水全流出来了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1219',
        any: [/%SAVESTR:TARGET%用双手安慰着自己………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1219-1220',
        any: [/%SAVESTR:TARGET%用双手安慰着自己………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1221',
        any: [/CFLAG:304 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1223',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:304 <= 5 \|\| FLAG:/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1224',
        any: [
          /「啊啊啊…主人…主人…还要更多…仔细的看…%SELF_CALL\(TARGET\)%的小穴自慰%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1225',
        any: [
          /「%SELF_CALL\(TARGET\)%如此美丽的处女膜…随时能奉献给主人呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1226',
        any: [/CFLAG:304 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1228',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:31 >= 3 && \(CFLAG:304 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1230',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1231',
        any: [/「主人…请看…%SELF_CALL\(TARGET\)%的小穴…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1232',
        any: [/「啊啊啊…主人看见了…手指停不下来了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1233',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1234',
        any: [/「被命令小穴自慰呢…好舒服啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1235',
        any: [/「啊啊啊啊…小穴变的奇怪了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1235-1236',
        any: [/「啊啊啊啊…小穴变的奇怪了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1237',
        any: [/「啊爱啊…手指停不下来了…舒服的不行啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1238',
        any: [
          /「%SELF_CALL\(TARGET\)%…已经不行了啊…啊啊啊…看吧小穴自慰更多的看吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1238-1239',
        any: [
          /「%SELF_CALL\(TARGET\)%…已经不行了啊…啊啊啊…看吧小穴自慰更多的看吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1240',
        any: [/CFLAG:304 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1242',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:31 < 3 && \(CFLAG:304 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1244',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1245',
        any: [
          /「主人啊…好好看哦、%SELF_CALL\(TARGET\)%的小穴自慰%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1245-1246',
        any: [
          /「主人啊…好好看哦、%SELF_CALL\(TARGET\)%的小穴自慰%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1247',
        any: [
          /「自己的手指这么舒服的什么啊…主人啊…请看着我舒服的地方吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1247-1248',
        any: [
          /「自己的手指这么舒服的什么啊…主人啊…请看着我舒服的地方吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1249',
        any: [/CFLAG:304 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1251',
        any: [
          /ELSEIF MARK:2 == 3 &&ABL:31 >= 1 && \(CFLAG:304 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1253',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1254',
        any: [/「被命令…这样做…我感觉很舒服…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1254-1255',
        any: [/「被命令…这样做…我感觉很舒服…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1256',
        any: [/「啊啊…更多的看吧…更多的…快感啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1256-1257',
        any: [/「啊啊…更多的看吧…更多的…快感啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1258',
        any: [/CFLAG:304 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1260',
        any: [/ELSEIF CFLAG:304 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1262',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1263',
        any: [/「咕…啊…啊…好屈辱啊…不会做这种事的…不要…咕呜♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1263-1264',
        any: [/「咕…啊…啊…好屈辱啊…不会做这种事的…不要…咕呜♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1265',
        any: [/「哈…哈…更多手指…不会动的…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1265-1266',
        any: [/「哈…哈…更多手指…不会动的…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1267',
        any: [/CFLAG:304 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1267-1268',
        any: [/CFLAG:304 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1267-1269',
        any: [/CFLAG:304 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1267-1270',
        any: [/CFLAG:304 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1271-1274',
        any: [/;胸愛撫 CFLAG:306/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1276',
        any: [/IF SELECTCOM == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1278',
        any: [/IF CFLAG:306 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1280',
        any: [
          /IF TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1282',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1283',
        any: [/%SAVESTR:TARGET%在被%SAVESTR:ASSI%吸着乳汁的时候发出了悲鸣。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1284',
        any: [/「啊啊啊啊不要啊！不、不行啦…这样的…啊啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1286',
        any: [/ELSEIF TALENT:TARGET:85 == 1 \|\| TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1287',
        any: [
          /「啊、真是的%UNICODE\(0x2661\) \*1% 这…好棒啊…！ 更多的吸吧！主人啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1288-1289',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1290',
        any: [/「啊啊啊…这样的我…这样的乳汁…呀啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1290-1291',
        any: [/「啊啊啊…这样的我…这样的乳汁…呀啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1292-1293',
        any: [/;助手/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1294',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1295',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%不停地玩弄着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1297',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1298',
        any: [/「呜啊…没、没关系…更加粗暴也可以哦…主人…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1299-1300',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1301',
        any: [/「哈…啊、好难受啊…快点把手拿开啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1301-1302',
        any: [/「哈…啊、好难受啊…快点把手拿开啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1303-1304',
        any: [/CFLAG:TARGET:306 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1304',
        any: [/CFLAG:TARGET:306 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1304-1305',
        any: [/CFLAG:TARGET:306 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1306-1307',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1309',
        any: [
          /IF TALENT:TARGET:130 == 1 && PALAM:5 > PALAMLV:3 && TEQUIP:16 == 0 && TEQUIP:15 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1311',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1312',
        any: [/%SAVESTR:TARGET%在被%SAVESTR:ASSI%吸着乳汁的时候发出了悲鸣。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1313',
        any: [/「啊啊啊呀啊！不、不行啦…这样的…啊啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1314',
        any: [/%SAVESTR:ASSI%一副陶醉的样子把口中的乳汁全喝了下去………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1316',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1317',
        any: [
          /「啊哈哈…像射精一样全部喷进主人嘴里了哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1319',
        any: [
          /「呼呼啊哈…%SELF_CALL\(TARGET\)%的大咪咪…更用力的挤吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1320',
        any: [
          /「这样用嘴含着乳头…乳汁…喝吧…喝吧…主人啊%UNICODE\(0x2661\) \*1%」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1321',
        any: [/CFLAG:306 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1323',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1324',
        any: [
          /「啊啊啊%UNICODE\(0x2661\) \*1% 这真是…太棒了…！ 更多的吸吮吧！主人啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1326',
        any: [
          /「啊啊啊…%SELF_CALL\(TARGET\)%的大咪咪被挤着…更多的喝乳汁吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1327',
        any: [
          /「这样的我…听见被吸得声音就勃起了…啊啊啊…%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…十分感激啊%UNICOD/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1328',
        any: [/CFLAG:306 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1330',
        any: [/ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1331',
        any: [/「啊啊啊…乳汁被吸出来…好舒服啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1332',
        any: [/CFLAG:306 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1334',
        any: [/ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1335',
        any: [/「啊啊啊…这样的我…乳汁如此…呀啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1336',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1336-1337',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1338-1339',
        any: [/;助手/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1340',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1341',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%揉着乳房、发出了羞耻的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1343',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1344',
        any: [/「啊哈…胸部被摸的好舒服啊…嗯哼…啊啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1346',
        any: [
          /「啊哈啊%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%这么大的乳房…就是为了被玩才存在的啊%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1347',
        any: [
          /「是的…更多…它的大小%UNICODE\(0x2661\) \*1%…被玩弄乳房什么的最喜欢了啊～%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1348',
        any: [/CFLAG:306 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1350',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1351',
        any: [
          /「噢…%SELF_CALL\(TARGET\)%骄傲的乳房…还想被您更多的爱抚…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1353',
        any: [
          /「是、是啊…大咪咪…是为了能被主人玩弄才长这么大的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1354',
        any: [
          /「啊啊啊…好喜欢被主人摸乳房啊…%SELF_CALL\(TARGET\)%非常有感觉哦…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1355',
        any: [/CFLAG:306 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1357',
        any: [/ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1358',
        any: [/「哈啊…乳房…感觉…这么棒…明明只是被玩弄而已…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1359',
        any: [/CFLAG:306 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1361',
        any: [/ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1362',
        any: [/「呀…呀…不要再玩弄弄了…呜啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1363',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1363-1364',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1363-1365',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1363-1366',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1363-1367',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1368-1371',
        any: [/;キスする CFLAG:307/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1373',
        any: [/IF SELECTCOM == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1375',
        any: [/IF CFLAG:307 == 0 && TFLAG:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1377',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1378',
        any: [
          /%SAVESTR:TARGET%因为被%SAVESTR:PLAYER%夺走了初吻而流下了眼泪………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1380',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1381',
        any: [/「啾…啾…呼…啊啊啊…接吻是这么舒服呢…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1382',
        any: [/「啊啊啊…早就想和主人这样的接吻了呢…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1383',
        any: [
          /「………哈…说起来接吻这东西还是第一次哦…还要更多的品味哦%UNICODE\(0x2661\) \*1% 嗯…嗯嗯…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1385',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ASSIPLAY == 0 && TEQUIP:89 == 0 && TEQUIP:90 == /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1386',
        any: [
          /「嘛啾…啾…啾噗…咕啊…没想到魔王大人…主人会是第一次的对象呢…好想一直这样下去%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1387',
        any: [
          /「哈…再来一次吧…哈啊…嗯…啾…啾…嗯嗯…哈哦………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1388',
        any: [/%SAVESTR:TARGET%深深的叹了口气………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1389-1390',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1391',
        any: [/「嗯…嗯嗯…这样的…讨厌…哎呀…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1392',
        any: [/坚强的%SAVESTR:TARGET%也因为太耻辱而流下了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1392-1393',
        any: [/坚强的%SAVESTR:TARGET%也因为太耻辱而流下了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1394',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1394-1395',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1397',
        any: [/ELSEIF CFLAG:307 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1399',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1400',
        any: [/被%NAME:MASTER%看着接吻%SAVESTR:TARGET%很害羞的转过了脸………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1402',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1403',
        any: [/「啾…啾…呼…啊啊啊…亲吻这么舒服呢啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1404',
        any: [/「粘糊糊的都要溶化…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1406',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1407',
        any: [
          /「嘛…啾…啾…啊哈…和主人接吻了啊…真是太幸福了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1408',
        any: [/「更多…还要更多…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1409-1410',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1411',
        any: [/「嗯咕…嗯…不行了…这里是…饶了我吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1411-1412',
        any: [/「嗯咕…嗯…不行了…这里是…饶了我吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1413',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1413-1414',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1415-1416',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1418',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1419',
        any: [
          /等%SAVESTR:TARGET%意识到自己陶醉的样子被%NAME:MASTER%看到了的时候正在和%SAVESTR:PLAYER%接吻。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1421',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1422',
        any: [/「嗯…呼…啾…啾…嗯哦…嗯呼%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1423',
        any: [
          /%SAVESTR:TARGET%热情的把嘴唇重合了过来。粘糊糊的舌头侵入了嘴里。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1424',
        any: [
          /「嘛啾…啾啊%UNICODE\(0x2661\) \*1%………啊啊啊啊…不、不行了…腰要断了…还想要更多的吻………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1425',
        any: [/CFLAG:307 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1427',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1428',
        any: [/「嘛啾…啾…唔呼呼…更多…更多的吻…主人啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1429',
        any: [
          /「%SELF_CALL\(TARGET\)%…对接吻上瘾了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1430',
        any: [/CFLAG:307 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1432',
        any: [/ELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1433',
        any: [/「是的…更多的吻我也不介意………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1434',
        any: [/CFLAG:307 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1436',
        any: [/ELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1437',
        any: [/「哈呜…啊、啊哈…嗯！？嗯…噗…呜啊啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1438',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1438-1439',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1438-1440',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1438-1441',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1442-1445',
        any: [/;秘貝開帳 CFLAG:308/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1447',
        any: [/IF SELECTCOM == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1449',
        any: [/IF CFLAG:308 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1451',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1452',
        any: [/%SAVESTR:TARGET%小穴的最里面被两人仔仔细细的看了个遍………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1454',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1455',
        any: [/「啊哈…主人的小鸡鸡…我就裂开了啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1457',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1458',
        any: [/「主人啊…啊啊、最里面都被看到了…被看到了啦…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1459-1460',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1461',
        any: [/「嗯嗯…到里面去了…看什么啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1461-1462',
        any: [/「嗯嗯…到里面去了…看什么啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1463',
        any: [/CFLAG:TARGET:308 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1463-1464',
        any: [/CFLAG:TARGET:308 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1465-1466',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1468',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1469',
        any: [/%SAVESTR:TARGET%小穴的最里面被两人仔仔细细的看了个遍………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1471',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:308 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1472',
        any: [/「啊啊啊…感觉来了喽%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1473',
        any: [
          /「这里的最里面…好想要小鸡鸡啊…吇咕吇咕的插进最里面…小鸡鸡插的满满的我还想要更舒服的啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1475',
        any: [/「虽然还是处女小穴…也肯定很舒服啊…%UNICODE\(0x2661\) \*1%」」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1477',
        any: [/%SAVESTR:TARGET%很不爽的张开了自己的小穴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1478',
        any: [/CFLAG:306 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1480',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:308 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1481',
        any: [
          /「主人啊…请多看一些…%SELF_CALL\(TARGET\)%的小穴…每天都有好好地保养哟？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1482',
        any: [/「你看…特别是这个小豆豆这里哦…经常打理着哦…是非常敏感的说♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1483',
        any: [/CFLAG:306 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1485',
        any: [/ELSEIF ABL:17 >= 3 && \(CFLAG:308 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1486',
        any: [/「啊哈…更多…到最里面…看进去啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1487',
        any: [/「到小穴的最里面为止…被看到了…啊啊、被视线侵犯喽♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1488',
        any: [/CFLAG:306 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1490',
        any: [/ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1491',
        any: [/「啊啊啊…想看这里什么的…变态…变态啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1492',
        any: [/「这样…只是张开了…感觉什么的…完全没有…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1493',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1493-1494',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1493-1495',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1493-1496',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1497-1500',
        any: [/;指挿入れ CFLAG:309/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1502',
        any: [/IF SELECTCOM == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1504',
        any: [/IF CFLAG:TARGET:309 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1506',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1506-1507',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1509',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1510',
        any: [
          /「咕哼呜啊啊…%UNICODE\(0x2661\) \*1% 最里面…请不要客气啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1511',
        any: [/「啊啊啊…更多的蹂躏我吧…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1513',
        any: [/ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1514',
        any: [/「主人的手指…这样进来了啊…哈…更多…更多的插入啊哦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1515-1516',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1517',
        any: [/「啊呜…好、好痛…求你温柔点啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1517-1518',
        any: [/「啊呜…好、好痛…求你温柔点啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1519',
        any: [/CFLAG:TARGET:309 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1519-1520',
        any: [/CFLAG:TARGET:309 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1521-1522',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1524',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1524-1525',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1527',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:309 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1528',
        any: [/「啊哼…手指插到最里面了…呜咻啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1529',
        any: [/「啊啊啊…请更多的玩弄我淫乱的小穴吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1530',
        any: [/CFLAG:309 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1532',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:309 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1533',
        any: [/「啊…手指…这样进去了…哈…好开心的说♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1534',
        any: [/「更多%SELF_CALL\(TARGET\)%的小穴…请用你的手指随便玩弄吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1535',
        any: [/CFLAG:309 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1537',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:309 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1538',
        any: [/「啊咕…手指…深深地进去了…啊啊啊…变的奇怪起来了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1539',
        any: [/%SAVESTR:TARGET%配合着手指的动作淫猥的舞动起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1540',
        any: [/CFLAG:309 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1542',
        any: [/ELSEIF CFLAG:309 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1543',
        any: [/「呜呼…呜…手指…如果这么激烈的话…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1544',
        any: [/CFLAG:309 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1544-1545',
        any: [/CFLAG:309 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1544-1546',
        any: [/CFLAG:309 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1544-1547',
        any: [/CFLAG:309 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1548-1551',
        any: [/;アナル舐め CFLAG:310/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1553',
        any: [/IF SELECTCOM == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1555',
        any: [/IF CFLAG:310 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1557',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1557-1558',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1560',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1561',
        any: [
          /「啊哈啊%UNICODE\(0x2661\) \*1% 嗯…嗯哈啊…更多的舔吧%UNICODE\(0x2661\) \*1% 淫乱的肛门还想被更多的舔啊%UNICODE\(0/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1563',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1564',
        any: [/「主人…被舔了那里…好羞耻…啊啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1565-1566',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1567',
        any: [/「呜啊…那种地方…不、不要舔啊…再舔的话不行了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1567-1568',
        any: [/「呜啊…那种地方…不、不要舔啊…再舔的话不行了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1569',
        any: [/CFLAG:TARGET:310 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1569-1570',
        any: [/CFLAG:TARGET:310 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1571-1572',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1574',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1574-1575',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1577',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:310 <= 6 \|\| FLAG/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1578',
        any: [/「呀呼嗯嗯%UNICODE\(0x2661\) \*1% 啊呀啊…啊啊啊啊…咕嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1579',
        any: [/「啊啊啊…肛门被舔了…咿啊啊啊…腰要融化了呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1580',
        any: [/「舔啊…更多…被舔的奇怪起来了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1581',
        any: [/%SAVESTR:TARGET%被舔着肛门发出了娇滴滴的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1582',
        any: [/CFLAG:310 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1584',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1585',
        any: [
          /「嘛啊…啊啊啊…哈…咕嗯嗯%UNICODE\(0x2661\) \*1% 舌头进到最里面了啊…嘛啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1586',
        any: [
          /「更加舒服了…%UNICODE\(0x2661\) \*1% 还要更多色情的事…%SELF_CALL\(TARGET\)%的淫乱肛门还想要更多	！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1587',
        any: [/CFLAG:310 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1589',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1590',
        any: [/「哈…更多的舔%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1591',
        any: [/「到肛门的最里面为止…喜欢上了啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1592',
        any: [/「好棒哦…就这样吃掉也没关系啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1593',
        any: [/CFLAG:310 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1595',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:310 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1596',
        any: [/「咿嗯…这样…被舔肛门…这么舒服呐…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1597',
        any: [/「呀哈啊…咿呀啊…～舌头伸进最里面了啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1598',
        any: [/CFLAG:310 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1600',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:310 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1601',
        any: [/「啊啊…肛门被舐了…这样的感觉…好奇怪哦…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1602',
        any: [/CFLAG:310 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1604',
        any: [/ELSEIF CFLAG:310 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1605',
        any: [/「啊啊啊…明明只有不舒服…明明只是被舐…这种…哇…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1606',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1606-1607',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1606-1608',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1606-1609',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1610-1613',
        any: [/;振動の宝石 CFLAG:311/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1615',
        any: [/IF SELECTCOM == 10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1617',
        any: [/IF CFLAG:TARGET:311 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1619',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1619-1620',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1622',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1623',
        any: [/「呃哈…这么舒服的道具还有什么吗…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1625',
        any: [/ELSEIF MARK:2 == 3 && TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1626',
        any: [
          /「那、那个是什么啊…魔族的魔法道具么…？呀还在不停的振动呢…啊啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1627-1628',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1629',
        any: [
          /「哇…那、那样的魔族道具但是%SELF_CALL\(TARGET\)%又能怎么样呢…呀嗯」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1629-1630',
        any: [
          /「哇…那、那样的魔族道具但是%SELF_CALL\(TARGET\)%又能怎么样呢…呀嗯」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1631',
        any: [/CFLAG:TARGET:311 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1631-1632',
        any: [/CFLAG:TARGET:311 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1633-1634',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1636',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1636-1637',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1639',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:311 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1640',
        any: [
          /「咿啊…啊啊啊…啊啊啊…嗯…请更多的疼爱我吧…黏糊糊的淫水都流出来了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1641',
        any: [/%SAVESTR:TARGET%被阴蒂的强烈刺激弄的发出了大声的娇吟………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1642',
        any: [/CFLAG:311 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1644',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && MARK:2 == 3 && \(CFLAG:311 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1645',
        any: [
          /「啊嗯…嗯啊…啊嗯…主人…%SELF_CALL\(TARGET\)%不要紧…还要更多…咕嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1646',
        any: [/%SAVESTR:TARGET%受到阴蒂的振动快乐的提高了声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1647',
        any: [/CFLAG:311 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1649',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:311 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1650',
        any: [/「咿啊啊…如果被这样…%SELF_CALL\(TARGET\)%…咿嗯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1651',
        any: [/CFLAG:311 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1653',
        any: [/ELSEIF CFLAG:311 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1654',
        any: [/「不、不行了…这样好讨厌…不要再振动了…咿」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1655',
        any: [/CFLAG:311 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1655-1656',
        any: [/CFLAG:311 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1655-1657',
        any: [/CFLAG:311 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1655-1658',
        any: [/CFLAG:311 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1659-1662',
        any: [/;蠕虫 CFLAG:312　CFLAG:372/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1665',
        any: [/IF SELECTCOM == 11 && TEQUIP:11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1667',
        any: [/IF CFLAG:TARGET:312 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1669',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1671',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1672',
        any: [/%SAVESTR:TARGET%发出了难受的的叹息………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1674',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1675',
        any: [/「啊啊啊啊…主、主人啊…请好好的看呐…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1676',
        any: [
          /「%SELF_CALL\(TARGET\)%的小穴就要变成主人的专用小穴了…啊…啊啊啊…嗯咿%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1677',
        any: [/%SAVESTR:TARGET%感受到破处的痛苦弯下了身子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1679',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1680',
        any: [
          /「主人好坏啊…这样就要…%SELF_CALL\(TARGET\)%最重要的处女…哈啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1681',
        any: [/%SAVESTR:TARGET%忍受着破处的痛苦…………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1682-1683',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1684',
        any: [/「就这样剥夺了%SELF_CALL\(TARGET\)%的处女………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1684-1685',
        any: [/「就这样剥夺了%SELF_CALL\(TARGET\)%的处女………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1686-1687',
        any: [/;非処女/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1689',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1690',
        any: [/%SAVESTR:TARGET%对异物感皱起了眉头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1692',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1693',
        any: [
          /「啊啊啊%UNICODE\(0x2661\) \*1% 蠕虫到最里面了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1694',
        any: [/「呃哈…啊啊啊…在里面乱动…呀啊嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1696',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1697',
        any: [
          /「啊…好厉害…进到最里面了…主人啊…%SELF_CALL\(TARGET\)%变的奇怪了呜…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1698-1699',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1700',
        any: [/「啊啊啊…不行了、不要那么粗暴啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1700-1701',
        any: [/「啊啊啊…不行了、不要那么粗暴啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1702-1703',
        any: [/CFLAG:312 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1703',
        any: [/CFLAG:312 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1703-1704',
        any: [/CFLAG:312 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1705-1706',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1708',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1709',
        any: [
          /%SAVESTR:PLAYER%露出了嗜虐的笑容同时一直把蠕虫插到%SAVESTR:TARGET%小穴的最里面为止………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1711',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:312 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1712',
        any: [
          /「呀嗯%UNICODE\(0x2661\) \*1%…啊啊啊…到最里面了我要去了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1713',
        any: [/%SAVESTR:TARGET%因为小穴最里面被蠕虫蹂躏而愉悦的颤动着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1714',
        any: [/CFLAG:312 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1716',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:312 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1717',
        any: [
          /「呼啊啊…明明不是主人的小鸡鸡…感觉到了…虽然不好意思但是可以来吧…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1718',
        any: [/%SAVESTR:TARGET%很有快感诱惑的扭着腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1719',
        any: [/CFLAG:312 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1721',
        any: [/ELSEIF ABL:2 >= 3 && \(CFLAG:312 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1722',
        any: [/「啊啊啊啊…腰…自己动了…感觉来了啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1723',
        any: [/CFLAG:312 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1725',
        any: [/ELSEIF CFLAG:312 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1726',
        any: [/「呼、太粗了…太粗了…不行啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1727',
        any: [/CFLAG:312 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1727-1728',
        any: [/CFLAG:312 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1727-1729',
        any: [/CFLAG:312 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1730-1731',
        any: [/;脱着時/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1732',
        any: [/ELSEIF SELECTCOM == 11 && TEQUIP:11 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1734',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:372 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1735',
        any: [/「呀啊…啊啊…明明想要放进去更多的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1736',
        any: [/CFLAG:372 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1738',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:372 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1739',
        any: [/「啊啊啊…好象掉了啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1740',
        any: [/CFLAG:372 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1742',
        any: [/ELSEIF CFLAG:372 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1743',
        any: [/「哈啊…哈…哈…哈…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1744',
        any: [/CFLAG:372 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1744-1745',
        any: [/CFLAG:372 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1744-1746',
        any: [/CFLAG:372 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1744-1747',
        any: [/CFLAG:372 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1752',
        any: [/IF SELECTCOM == 12/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1754',
        any: [/IF CFLAG:313 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1756',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1756-1757',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1759',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1760',
        any: [
          /「咿…振动…咿呀嗯…嗯嗯呼%UNICODE\(0x2661\) \*1%…啊啊啊…不行…不行了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1762',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1763',
        any: [/「哈…这是很棒的魔族道具呢♪…啊嗯…这次是振动…呀嗯嗯！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1764-1765',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1766',
        any: [/「这、这是什么…即使被这样…啊哈啊啊！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1766-1767',
        any: [/「这、这是什么…即使被这样…啊哈啊啊！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1768',
        any: [/CFLAG:313 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1768-1769',
        any: [/CFLAG:313 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1770-1771',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1773',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1773-1774',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1776',
        any: [/ELSEIF TALENT:76 == 1 && \(CFLAG:313 <= 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1777',
        any: [
          /「咿呼呜…振动…太强烈了%UNICODE\(0x2661\) \*1%…咿呀啊啊啊呜哇咿啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1778',
        any: [/CFLAG:313 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1780',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:313 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1781',
        any: [/「啊嗯…啊啊哈…咿啊啊啊！…好啊…更用力的按上来吧…主人啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1782',
        any: [/CFLAG:313 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1784',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:313 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1785',
        any: [/「哈呜…嗯…嗯啊啊…魔王大人啊…魔王大人啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1786',
        any: [/CFLAG:313 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1788',
        any: [/ELSEIF CFLAG:313 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1789',
        any: [/「呀…哇…这样的事…完全无所谓…啊啊啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1790',
        any: [/CFLAG:313 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1790-1791',
        any: [/CFLAG:313 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1790-1792',
        any: [/CFLAG:313 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1790-1793',
        any: [/CFLAG:313 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1794-1797',
        any: [/;アナルワーム CFLAG:314　CFLAG:374/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1800',
        any: [/IF SELECTCOM == 13 && TEQUIP:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1802',
        any: [/IF CFLAG:TARGET:314 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1804',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1804-1805',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1807',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1808',
        any: [/「呜哇啊…不行了不行了…肛门变的奇怪了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1810',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1811',
        any: [/「咿…肛门…全部…进来了…啊啊啊…好难受…不过可以忍受…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1812-1813',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1814',
        any: [/「讨厌啊好恶心呀	…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1814-1815',
        any: [/「讨厌啊好恶心呀	…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1816',
        any: [/CFLAG:TARGET:314 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1816-1817',
        any: [/CFLAG:TARGET:314 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1818-1819',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1821',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1821-1822',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1824',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:314 <= 8 \|\| FLAG/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1825',
        any: [
          /「哦哦…肛门好舒服好舒服啊…%UNICODE\(0x2661\) \*1% 啊哈…%SELF_CALL\(TARGET\)%的肛门小穴%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1826',
        any: [
          /「好、好棒啊…%SELF_CALL\(TARGET\)%的淫乱肛门被蠕虫弄的有感觉了…%SELF_CALL\(TARGET\)%是变态的肛交狂啊%UNICODE\(0x2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1827',
        any: [
          /%SAVESTR:TARGET%感到肛门强烈的快感、一边流着口水一边提高了愉悦的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1828',
        any: [/CFLAG:314 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1830',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1831',
        any: [
          /「啊哈啊%UNICODE\(0x2661\) \*1% 不行了…又要疯了…啊啊啊%UNICODE\(0x2661\) \*1% 不能再侍奉主人了%UNICODE\(0x266/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1832',
        any: [
          /「已、已经松弛了…松弛呃啊…肛门要坏了呀%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1833',
        any: [
          /%SAVESTR:TARGET%在肛门蠕虫每次动作的时候都会发出“咿”“啊”之类的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1834',
        any: [/CFLAG:314 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1836',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:314 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1837',
        any: [
          /「嗯呀啊…啊啊啊…肛门很怪异快感…咿噶…呃…呼啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1838',
        any: [/%SAVESTR:TARGET%对肛门蠕虫的动作非常敏感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1839',
        any: [/CFLAG:314 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1841',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:314 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1842',
        any: [
          /「呀嗯嗯！？哈…蠕虫来吧…更多的在肛门里啾啾的弄吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1843',
        any: [
          /「%SELF_CALL\(TARGET\)%是那种被触手玩弄肛门都有感觉的超级变态………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1844',
        any: [/「主人啊…♪%SELF_CALL\(TARGET\)%的好色肛门…看到了么？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1845',
        any: [/CFLAG:314 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1847',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:314 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1848',
        any: [
          /「啊嗯…嗯啊咿…哈肛门…有感觉了…主人啊…肛门…怪怪的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1849',
        any: [/%SAVESTR:TARGET%每次肛门蠕虫活动都会发出声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1850',
        any: [/CFLAG:314 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1852',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:314 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1853',
        any: [/「主人啊…肛门…变的怪怪的…救救我…啊啊嗯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1854',
        any: [/%SAVESTR:TARGET%对肛门蠕虫的动作非常敏感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1855',
        any: [/CFLAG:314 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1857',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:314 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1858',
        any: [/「啊…哈啊…啊嗯…不、不对…肛门有感觉什么的…啊啊啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1859',
        any: [/CFLAG:314 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1861',
        any: [/ELSEIF  CFLAG:314 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1862',
        any: [/「啊啊…肛门啊…慢慢的…变的奇怪了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1863',
        any: [/CFLAG:314 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1863-1864',
        any: [/CFLAG:314 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1863-1865',
        any: [/CFLAG:314 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1866-1867',
        any: [/;脱着時/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1868',
        any: [/ELSEIF SELECTCOM == 13 && TEQUIP:13 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1870',
        any: [
          /IF TALENT:TARGET:77 == 1 && TALENT:TARGET:76 == 1 && \(CFLAG:374 < 6 \|\| FLAG:7 ==/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1871',
        any: [/「哎呀啊嗯…更多…更多的钻进肛门吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1872',
        any: [/CFLAG:374 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1874',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:374 < 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1875',
        any: [/「咿啊咿…肛门扩张了啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1876',
        any: [/CFLAG:374 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1878',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:374 < 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1879',
        any: [/「啊…肛门还要更多…还不许拔出啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1880',
        any: [/CFLAG:374 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1882',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:374 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1883',
        any: [/「哈…哈…肛门…就这么张开着………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1884',
        any: [/CFLAG:374 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1886',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:374 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1887',
        any: [/「啊啊嗯♪…咿…咿…哈啊…肛门…怪怪的感觉…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1888',
        any: [/CFLAG:374 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1890',
        any: [/ELSEIF CFLAG:374 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1891',
        any: [/「咕…哈…哈…哈…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1892',
        any: [/CFLAG:374 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1892-1893',
        any: [/CFLAG:374 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1892-1894',
        any: [/CFLAG:374 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1892-1895',
        any: [/CFLAG:374 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1901',
        any: [/IF SELECTCOM == 14 && TEQUIP:14/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1903',
        any: [/IF CFLAG:315 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1905',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1905-1906',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1908',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1909',
        any: [
          /「啊啊啊啊…用玩具更多的玩弄我吧…呼…夹子好强力啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1911',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1912',
        any: [
          /「主人…%SELF_CALL\(TARGET\)%…不要紧…不用客气的玩弄我吧…嗯啊啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1913-1914',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1915',
        any: [/「呀…不行了…这样夹在那里…啊啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1915-1916',
        any: [/「呀…不行了…这样夹在那里…啊啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1917',
        any: [/CFLAG:315 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1917-1918',
        any: [/CFLAG:315 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1919-1920',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1922',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1922-1923',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1925',
        any: [/ELSEIF TALENT:76 == 1 && \(CFLAG:315 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1926',
        any: [
          /「啊哈…夹子好强力啊…没办法侍奉了啊…还想要更激烈的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1927',
        any: [/CFLAG:315 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1929',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:315 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1930',
        any: [/「啊…嗯…好厉害…已经麻了…变的奇怪了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1931',
        any: [/CFLAG:315 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1933',
        any: [/ELSEIF CFLAG:315 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1934',
        any: [/「啊呜…哇…快点…取下啊…求你了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1935',
        any: [/CFLAG:315 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1935-1936',
        any: [/CFLAG:315 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1935-1937',
        any: [/CFLAG:315 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1938-1939',
        any: [/;脱着時/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1940',
        any: [/ELSEIF SELECTCOM == 14 && TEQUIP:14 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1942',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:375 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1943',
        any: [/「啊啊啊…真的太舒服了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1944',
        any: [/CFLAG:375 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1946',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:375 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1947',
        any: [/「哈…真是太舒服了我还要更多♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1948',
        any: [/CFLAG:375 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1950',
        any: [/ELSEIF CFLAG:375 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1951',
        any: [/「哈…哈…讨厌…还麻着呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1952',
        any: [/CFLAG:375 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1952-1953',
        any: [/CFLAG:375 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1952-1954',
        any: [/CFLAG:375 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1952-1955',
        any: [/CFLAG:375 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1961',
        any: [/IF SELECTCOM == 15 && TEQUIP:15/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1963',
        any: [/IF CFLAG:316 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1965',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1965-1966',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1968',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1969',
        any: [/「嘛啊啊啊…乳头…啊啊啊…好舒服啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1971',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1972',
        any: [/「主人啊…这样…颤动…乳头啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1973-1974',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1975',
        any: [
          /「那、那样的东西给%SELF_CALL\(TARGET\)%装上…呀！？麻、麻掉了！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1975-1976',
        any: [
          /「那、那样的东西给%SELF_CALL\(TARGET\)%装上…呀！？麻、麻掉了！？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1977',
        any: [/CFLAG:316 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1977-1978',
        any: [/CFLAG:316 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1979-1980',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1982',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1982-1983',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1985',
        any: [/ELSEIF TALENT:76 == 1 && \(CFLAG:316 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1986',
        any: [/「啊哈…乳头已经麻了…那里变的舒服了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1987',
        any: [/CFLAG:316 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1989',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:316 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1990',
        any: [/「呼…乳头已经麻了…好舒服♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1991',
        any: [/CFLAG:316 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1993',
        any: [/ELSEIF CFLAG:316 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1994',
        any: [/「啊啊啊…乳头麻了啊…不行了…求你拿下来吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1995',
        any: [/CFLAG:316 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1995-1996',
        any: [/CFLAG:316 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1995-1997',
        any: [/CFLAG:316 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '1998-1999',
        any: [/;脱着時/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2000',
        any: [/ELSEIF SELECTCOM == 15 && TEQUIP:15 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2002',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:376 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2003',
        any: [/「哈啊…乳房似乎有感觉了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2004',
        any: [/CFLAG:376 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2006',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:376 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2007',
        any: [/「啊…乳头已经变成这样了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2008',
        any: [/CFLAG:376 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2010',
        any: [/ELSEIF CFLAG:376 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2011',
        any: [/「啊啊…乳头…麻了…都肿起来了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2012',
        any: [/CFLAG:376 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2012-2013',
        any: [/CFLAG:376 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2012-2014',
        any: [/CFLAG:376 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2012-2015',
        any: [/CFLAG:376 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2021',
        any: [/IF SELECTCOM == 16 && TEQUIP:16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2023',
        any: [/IF CFLAG:317 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2025',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2026',
        any: [/「啊啊嗯…乳汁出来了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2028',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2029',
        any: [
          /「咿啊啊啊…嗯…不行了…这乳汁是宝宝的东西…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2030-2031',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2032',
        any: [/「嗯…这、这要怎么收集……？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2032-2033',
        any: [/「嗯…这、这要怎么收集……？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2034',
        any: [/CFLAG:317 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2036-2037',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2039',
        any: [/IF TALENT:76 == 1 && \(CFLAG:317 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2040',
        any: [/「哎嘿嘿…乳房不要挤啊…这样有感觉了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2041',
        any: [/CFLAG:317 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2043',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:317 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2044',
        any: [
          /「啊啊嗯…乳房不要挤啊…啊啊啊…啊…哈啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2045',
        any: [/CFLAG:317 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2047',
        any: [/ELSEIF CFLAG:317 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2048',
        any: [/「啊啊啊…哎呀…这、这样的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2049',
        any: [/CFLAG:317 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2049-2050',
        any: [/CFLAG:317 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2049-2051',
        any: [/CFLAG:317 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2052-2053',
        any: [/;脱着時/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2054',
        any: [/ELSEIF SELECTCOM == 16 && TEQUIP:16 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2056',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:377 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2057',
        any: [/「哈…哈…要取多少乳汁？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2058',
        any: [/CFLAG:377 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2060',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:377 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2061',
        any: [/「嗯咿嗯…哇…那样就完成榨乳了啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2062',
        any: [/CFLAG:377 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2064',
        any: [/ELSEIF CFLAG:377 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2065',
        any: [/「嗯啊啊啊…已、已经…乳房不行了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2066',
        any: [/CFLAG:377 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2066-2067',
        any: [/CFLAG:377 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2066-2068',
        any: [/CFLAG:377 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2066-2069',
        any: [/CFLAG:377 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2120',
        any: [/IF SELECTCOM == 19 && TEQUIP:19/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2122',
        any: [/IF CFLAG:TARGET:320 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2124',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2124-2125',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2127',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2128',
        any: [
          /「啊嗯…那些珠子…全部都放进来了…啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2130',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2131',
        any: [/「啊啊啊…真是好厉害的淫具啊…好哟…请按你喜欢的做吧…主人啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2132-2133',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2134',
        any: [
          /「呀、什么！？这是什么啊！？难道…%SELF_CALL\(TARGET\)%的屁股里…讨厌啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2134-2135',
        any: [
          /「呀、什么！？这是什么啊！？难道…%SELF_CALL\(TARGET\)%的屁股里…讨厌啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2136',
        any: [/CFLAG:TARGET:320 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2136-2137',
        any: [/CFLAG:TARGET:320 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2138-2139',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2141',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2141-2142',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2144',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:320 <= 7 \|\| FLAG/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2145',
        any: [
          /「呜哇咿…啊啊嗯…再放进去点…更多的放进%SELF_CALL\(TARGET\)%的淫乱肛门里吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2146',
        any: [
          /「啊啊啊…淫乱的肛门…什么都没有会坐立不安的啦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2147',
        any: [
          /「呼…已经全部放进去了♪…肛门串珠在%SELF_CALL\(TARGET\)%肚子里侵犯直到不行了为止%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2148',
        any: [/CFLAG:320 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2150',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2151',
        any: [
          /「啊啊啊…嗯…肚子里装满了…珠子…嗯咿在里面嘎吱嘎吱的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2152',
        any: [
          /「啊啊啊%UNICODE\(0x2661\) \*1% 不行了…不行了啊呜…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2153',
        any: [/CFLAG:320 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2155',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:320 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2156',
        any: [
          /「啊啊啊…屁股…里面满满的全是珠子…好棒好棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2157',
        any: [/「呼…没办法继续侍奉了啦…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2158',
        any: [/CFLAG:320 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2160',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:320 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2161',
        any: [
          /「啊啊啊1颗珠子2颗珠子3颗珠子…哈…嗯…全部放进%SELF_CALL\(TARGET\)%的淫乱肛门了啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2162',
        any: [
          /「已经被做了这种事…%SELF_CALL\(TARGET\)%的淫乱肛门一点事都没有的啊？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2163',
        any: [/「主人啊…更多…请更多的欺负%SELF_CALL\(TARGET\)%的肛门吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2164',
        any: [/CFLAG:320 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2166',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:320 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2167',
        any: [
          /「啊嗯…啊啊啊…好厉害…全部都放进来了啊…%SELF_CALL\(TARGET\)%的屁股好厉害哟…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2168',
        any: [/「主人啊…%SELF_CALL\(TARGET\)%的屁股变的更加厉害了啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2169',
        any: [/CFLAG:320 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2171',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:320 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2172',
        any: [/「全部放进屁股小穴里了…啊啊、肚子很奇怪的感觉、主人………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2173',
        any: [/CFLAG:320 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2175',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:320 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2176',
        any: [/「嗯咿…屁股…屁股变的奇怪了！明明被做这样的事…舒服……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2177',
        any: [/CFLAG:320 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2179',
        any: [/ELSEIF  CFLAG:320 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2180',
        any: [/「啊啊啊…好难受啊…求你了…快拔出来吧…啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2181',
        any: [/CFLAG:320 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2181-2182',
        any: [/CFLAG:320 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2181-2183',
        any: [/CFLAG:320 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2184-2185',
        any: [/;脱着時/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2186',
        any: [/ELSEIF SELECTCOM == 19 && TEQUIP:19 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2188',
        any: [
          /IF TALENT:TARGET:77 == 1 && TALENT:TARGET:76 == 1 && \(CFLAG:379 < 6 \|\| FLAG:7 ==/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2189',
        any: [
          /「呀呼嗯嗯…不行了不行了…脑子里一片空白………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2190',
        any: [/%SAVESTR:TARGET%的肛门似乎很想要的样子不停的收缩………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2191',
        any: [/CFLAG:379 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2193',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:379 < 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2194',
        any: [
          /「咿噶…哈啊啊…肛门会啊…不行了给我吧………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2195',
        any: [/CFLAG:379 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2197',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:379 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2198',
        any: [
          /「呀嗯嗯嗯♪啊啊…对不起…%SELF_CALL\(TARGET\)%已经…不被玩弄肛门…就活不下去了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2199',
        any: [/%SAVESTR:TARGET%的肛门似乎很想要的样子不停的收缩………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2200',
        any: [/CFLAG:379 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2202',
        any: [
          /elseIF TALENT:TARGET:85 == 1 && \(CFLAG:379 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2203',
        any: [/「哈呜嗯…突然拔出什么的好过分啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2204',
        any: [/CFLAG:379 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2206',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:379 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2207',
        any: [/「啊啊啊…啊嗯…还没…明明没问题的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2208',
        any: [/CFLAG:379 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2210',
        any: [/ELSEIF CFLAG:379 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2211',
        any: [/「哈…哈…啊啊…屁股小穴…变的奇怪了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2212',
        any: [/CFLAG:379 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2212-2213',
        any: [/CFLAG:379 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2212-2214',
        any: [/CFLAG:379 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2212-2215',
        any: [/CFLAG:379 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2220',
        any: [/IF SELECTCOM == 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2222',
        any: [/IF CFLAG:TARGET:321 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2224',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2226',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2228',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2229',
        any: [/%NAME:MASTER%命令%SAVESTR:TARGET%就这样大张开腿………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2230',
        any: [
          /「啊啊啊…主人啊…好想看一看%SELF_CALL\(TARGET\)%破处的场景啊…不错啊…不过、认真看吧♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2232',
        any: [/%SAVESTR:ASSI%毫不客气地揉着%SAVESTR:TARGET%的大咪咪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2234',
        any: [/「呼啊啊啊…啊…不要…好像真的好痛哟%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2235',
        any: [
          /%SAVESTR:ASSI%露出嗜虐的笑容没有顾虑的挺着腰、把小鸡鸡一口气插进了最里面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2236',
        any: [
          /「咿…咿啊啊啊…啊啊嗯！哇…嗯嗯…啊啊啊啊…被看到喽…主人看到喽%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2238',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2239',
        any: [
          /「啊哈%UNICODE\(0x2661\) \*1%…啊啊啊啊…哦、插到最里面了…咿…嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2240',
        any: [
          /「啊啊啊…好高兴…这已经变成魔族的小穴…奉献给主人使用的了啊………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2241',
        any: [/%SAVESTR:TARGET%充满爱意地和你握住了双手………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2242',
        any: [
          /「嗯啊啊啊…啊哈%UNICODE\(0x2661\) \*1%…小穴能侍奉主人的小鸡鸡好高兴啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2243',
        any: [
          /「啊啊啊…更多更多…%SELF_CALL\(TARGET\)%好舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2244-2245',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2246',
        any: [
          /「啊嗯%UNICODE\(0x2661\) \*1%…已经…明明想早点失去贞洁的…等不及了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2247',
        any: [/「咕…只、只不过有一点痛…啊…啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2248',
        any: [/%SAVESTR:TARGET%忍耐着那点痛苦、让四肢抱着你………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2249',
        any: [
          /「啊啊啊…小穴终于能开始这样侍奉主人了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2249-2250',
        any: [
          /「啊啊啊…小穴终于能开始这样侍奉主人了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2252',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2254',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2255',
        any: [/%NAME:MASTER%命令%SAVESTR:TARGET%就这样大张开腿………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2256',
        any: [
          /「如果是主人的命令…忍住…我会忍住的…不、不过…不、不要看…啊啊啊」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2258',
        any: [/%SAVESTR:ASSI%毫不客气地揉着%SAVESTR:TARGET%的大咪咪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2260',
        any: [/「咕嗯！啊…啊哈啊！不要那样揉啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2261',
        any: [
          /%SAVESTR:ASSI%就那样被%SAVESTR:TARGET%的说法勾起了嗜虐之心、小鸡鸡强行插进了最里面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2262',
        any: [/「咕啊啊啊！咿呼咿嗯…去了去了…不、不要看…不要看哎咿啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2264',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2265',
        any: [
          /「啊啊啊…呜噗、让%SELF_CALL\(TARGET\)%成为魔族真是万分感激啊…像这样…啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2266',
        any: [/%SAVESTR:TARGET%感觉到被小鸡鸡插入而发出了声音、紧紧抱住了你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2267',
        any: [
          /「太棒了…像、像恋人那样…真诚的对待什么的…啊啊啊…好开心%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2268',
        any: [/%SAVESTR:TARGET%充满爱意的对你撒着娇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2269',
        any: [
          /「不、不要紧…咿、啊啊啊…请…请按你喜欢的那样动吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2270-2271',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2272',
        any: [
          /「哈呜…主人…把%SELF_CALL\(TARGET\)%重要的贞操交给你…真的非常开心…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2273',
        any: [/「完、完全不会痛…可以按主人你的喜欢行动…啊嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2274',
        any: [/「完、完全不需要忍耐、咿嗯…啊…咕、那、我没有哭哦…啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2275',
        any: [
          /随着%NAME:MASTER%轻轻往上顶%SAVESTR:TARGET%的泪水从眼角洒落下来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2275-2276',
        any: [
          /随着%NAME:MASTER%轻轻往上顶%SAVESTR:TARGET%的泪水从眼角洒落下来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2277-2278',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2280',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2281',
        any: [
          /%NAME:MASTER%命令%SAVESTR:ASSI%就这样压住%SAVESTR:TARGET%、把小鸡鸡插进了秘裂中………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2282',
        any: [
          /「呀…住手…你也是勇者的一员为什么要听那种家伙的命令啊…咿啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2283',
        any: [
          /%SAVESTR:ASSI%听了%SAVESTR:TARGET%的话用鼻子发出了耻笑、毫不留情的蹂躏了贞操………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2284',
        any: [
          /即便%SAVESTR:TARGET%如此的坚强、也在抽送疼痛与屈辱的刺激下禁不住号啕大哭。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2285',
        any: [/「啊啊啊啊啊！哎呀哎呀！这种东西…咿咿…啊啊啊啊咿！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2285-2286',
        any: [/「啊啊啊啊啊！哎呀哎呀！这种东西…咿咿…啊啊啊啊咿！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2287',
        any: [/「哇…嗯…这、这一点也不疼…已、已经结束了吧………咿？还、还在动？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2288',
        any: [
          /即便%SAVESTR:TARGET%如此的坚强、也在抽送疼痛与屈辱的刺激下禁不住号啕大哭。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2289',
        any: [/「啊啊啊啊啊！哎呀哎呀！这种东西…咿咿…啊啊啊啊咿！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2291',
        any: [/IF TALENT:TARGET:317 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2292',
        any: [/「啊…啊啊啊…如果要是他的拥抱这样的话就好了…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2293',
        any: [/%SAVESTR:TARGET%一边回忆故乡的恋人一边被侵犯………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2293-2294',
        any: [/%SAVESTR:TARGET%一边回忆故乡的恋人一边被侵犯………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2293-2295',
        any: [/%SAVESTR:TARGET%一边回忆故乡的恋人一边被侵犯………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2296-2297',
        any: [/;非処女/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2297-2298',
        any: [/;非処女/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2300',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2302',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2303',
        any: [/「啊…呀呀啊啊嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2304',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2305',
        any: [/%SAVESTR:ASSI%毫不客气的揉着%SAVESTR:TARGET%的大咪咪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2306',
        any: [/「呼啊啊啊…啊…不要…啊嗯…好痛哟%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2306-2307',
        any: [/「呼啊啊啊…啊…不要…啊嗯…好痛哟%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2308',
        any: [
          /直到%SAVESTR:TARGET%的小穴最里面都被蹂躏着、%SAVESTR:ASSI%在%SAVESTR:TARGET%的耳边低声说道……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2309',
        any: [
          /「是…是的…%SELF_CALL\(TARGET\)%…在主人面前…被侵犯…有感觉了…啊啊啊呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2310',
        any: [
          /%SAVESTR:TARGET%一边露出又哭又笑的表情一边被%SAVESTR:ASSI%侵犯着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2312',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2313',
        any: [/%SAVESTR:ASSI%命令%SAVESTR:TARGET%就这样大张开腿………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2314',
        any: [/「如果是主人的命令…忍住…我会忍住的…所以…不、不要看…啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2315',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2316',
        any: [/%SAVESTR:ASSI%毫不客气的揉着%SAVESTR:TARGET%的大咪咪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2317',
        any: [/「咕嗯！不、不痛了…啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2317-2318',
        any: [/「咕嗯！不、不痛了…啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2319',
        any: [/%SAVESTR:ASSI%抿嘴一笑故意用腰使劲一捅………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2320',
        any: [
          /「咕啊啊啊%UNICODE\(0x2661\) \*1% 咿咿嗯%UNICODE\(0x2661\) \*1%…去了去了…不、不要看…不要看咿啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2321',
        any: [/「不行了啊…在主人面前…不行了啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2322-2323',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2324',
        any: [/「咕…咕…呜…咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2325',
        any: [/%SAVESTR:TARGET%咬着牙、忍受着%SAVESTR:ASSI%的凌辱。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2326',
        any: [/%SAVESTR:ASSI%露出嗜虐的微笑戏弄惩罚着%SAVESTR:TARGET%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2326-2327',
        any: [/%SAVESTR:ASSI%露出嗜虐的微笑戏弄惩罚着%SAVESTR:TARGET%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2329',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2330',
        any: [
          /「啊啊啊…请让我用力的抱住吧%UNICODE\(0x2661\) \*1% 一边用力的玩弄我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2331',
        any: [/%SAVESTR:TARGET%双手缠绕着%NAME:MASTER%的身体………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2333',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2334',
        any: [/「啊嗯…哈…主人能像这样…我就非常安心了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2335',
        any: [/%SAVESTR:TARGET%充满爱意的对你撒着娇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2336-2337',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2338',
        any: [/「哈…快点…住手啊…即使被做这种事…%SELF_CALL\(TARGET\)%也…咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2338-2339',
        any: [/「哈…快点…住手啊…即使被做这种事…%SELF_CALL\(TARGET\)%也…咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2340-2341',
        any: [/CFLAG:321 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2341',
        any: [/CFLAG:321 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2341-2342',
        any: [/CFLAG:321 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2343-2344',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2346',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2348',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2349',
        any: [
          /「咿咿嗯%UNICODE\(0x2661\) \*1%…啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2350',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2351',
        any: [/%SAVESTR:ASSI%毫不客气的揉着%SAVESTR:TARGET%的大咪咪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2352',
        any: [/「呼啊啊啊…啊…不要…请更加温柔一点………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2352-2353',
        any: [/「呼啊啊啊…啊…不要…请更加温柔一点………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2354',
        any: [
          /直到%SAVESTR:TARGET%的小穴最里面都被蹂躏着、%SAVESTR:ASSI%在%SAVESTR:TARGET%的耳边低声说道………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2355',
        any: [
          /「是…是的…%SELF_CALL\(TARGET\)%…在主人面前…被侵犯…有感觉了…啊啊啊呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2356',
        any: [
          /%SAVESTR:TARGET%一边露出又哭又笑的表情一边被%SAVESTR:ASSI%侵犯着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2358',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2359',
        any: [/「啊啊啊…这样…被插到最里面了…咕嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2360',
        any: [
          /IF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TALENT:TARGET:119 == 1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2361',
        any: [/%SAVESTR:ASSI%毫不客气的揉着%SAVESTR:TARGET%的大咪咪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2362',
        any: [/「咕嗯！不、不痛了…啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2362-2363',
        any: [/「咕嗯！不、不痛了…啊…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2364',
        any: [/%SAVESTR:ASSI%抿嘴一笑故意用腰使劲一捅………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2365',
        any: [
          /「咕啊啊啊%UNICODE\(0x2661\) \*1% 咿咿嗯%UNICODE\(0x2661\) \*1%…啊啊…主人啊…不、不要看…不要看咿啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2366',
        any: [/「不行了啊…在主人面前…不行了啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2367-2368',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2369',
        any: [/「咕…咕…呜…咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2370',
        any: [/%SAVESTR:TARGET%咬着牙、忍受着%SAVESTR:ASSI%的凌辱。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2371',
        any: [/%SAVESTR:ASSI%露出嗜虐的微笑戏弄惩罚着%SAVESTR:TARGET%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2371-2372',
        any: [/%SAVESTR:ASSI%露出嗜虐的微笑戏弄惩罚着%SAVESTR:TARGET%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2374',
        any: [
          /elseIF TALENT:TARGET:76 == 1 && \(CFLAG:321 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2375',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2376',
        any: [
          /「啊啊啊…是、是的…喜欢小穴被侵犯的瞬间%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2377',
        any: [
          /「那样牢牢的抱住…不会让你离开…直到厌倦为止…侵犯我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2378',
        any: [/%SAVESTR:TARGET%快乐的好想脑袋都要融化了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2379',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2380',
        any: [
          /「啊…啊啊啊…嗯…啊啊啊…更多…张开双腿哈呀…到最里面…请侵犯到最里面吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2381',
        any: [
          /%SAVESTR:TARGET%就像那句话的那样两条大腿张开到极限、接受了小鸡鸡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2382',
        any: [
          /「嗯咿%UNICODE\(0x2661\) \*1%…不停的侵犯侵犯把小穴都玩坏吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2382-2383',
        any: [
          /「嗯咿%UNICODE\(0x2661\) \*1%…不停的侵犯侵犯把小穴都玩坏吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2384',
        any: [
          /「啊嗯%UNICODE\(0x2661\) \*1%…啊啊啊…啊哈%UNICODE\(0x2661\) \*1% 啊啊啊…小穴侍奉很棒吧%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2385',
        any: [
          /「啊啊啊…明明要认真侍奉的…%SELF_CALL\(TARGET\)%总是很舒服的…啊啊啊啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2386',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:PLAYER%给予的快乐开始提高甜蜜的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2386-2387',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:PLAYER%给予的快乐开始提高甜蜜的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2388',
        any: [/CFLAG:321 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2390',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:321 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2391',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2392',
        any: [
          /「嗯嗯…啊哈…%UNICODE\(0x2661\) \*1% 到最里面喽%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2393',
        any: [/%SAVESTR:TARGET%被插到小穴最里面提高了甜蜜的声音。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2394',
        any: [
          /「啊啊啊…%SELF_CALL\(TARGET\)%的小穴有更多的感觉…有感觉了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2395',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2396',
        any: [/「啊啊啊…更多…小穴…侵犯吧…侵犯吧…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2397',
        any: [/%SAVESTR:TARGET%的两腿夹住了%SAVESTR:PLAYER%的腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2398',
        any: [
          /「嗯嗯…啊啊啊%UNICODE\(0x2661\) \*1% 咿嗯啊啊啊…好…好棒…深深的插进去%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2398-2399',
        any: [
          /「嗯嗯…啊啊啊%UNICODE\(0x2661\) \*1% 咿嗯啊啊啊…好…好棒…深深的插进去%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2400',
        any: [/「啊嗯…嗯…主人啊…%SELF_CALL\(TARGET\)%的小穴…怎么样啊？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2401',
        any: [
          /「啊嗯…啊…哈呜嗯嗯…%UNICODE\(0x2661\) \*1%…可以更喜欢呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2402',
        any: [/%SAVESTR:TARGET%在%SAVESTR:PLAYER%的耳边发出甜蜜的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2402-2403',
        any: [/%SAVESTR:TARGET%在%SAVESTR:PLAYER%的耳边发出甜蜜的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2404',
        any: [/CFLAG:321 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2406',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:321 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2407',
        any: [/「咕…呼…啊啊…不行了…小穴好舒服…呜…忍不住了啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2408',
        any: [
          /%SAVESTR:TARGET%每次被%SAVESTR:PLAYER%插到小穴最里面都会开始发出甜蜜的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2409',
        any: [/CFLAG:321 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2411',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:321 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2412',
        any: [
          /「哇…这样的…%SELF_CALL\(TARGET\)%…忍耐一下的话…很快就结束了…嗯…啊…啊啊嗯♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2413',
        any: [/%SAVESTR:TARGET%开始发出一点点甜蜜的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2414',
        any: [/CFLAG:321 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2416',
        any: [/ELSEIF CFLAG:321 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2417',
        any: [/「哇…呜…嗯…呜呼…嗯…咕嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2418',
        any: [/%SAVESTR:TARGET%好像没有快感一样的拼命忍耐着不发出声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2419',
        any: [/CFLAG:321 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2419-2420',
        any: [/CFLAG:321 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2419-2421',
        any: [/CFLAG:321 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2419-2422',
        any: [/CFLAG:321 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2423-2426',
        any: [/;後背位 CFLAG:322/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2428',
        any: [/IF SELECTCOM == 21/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2430',
        any: [/IF CFLAG:TARGET:322 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2432',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2434',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2436',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2437',
        any: [
          /%SAVESTR:TARGET%被命令就这样四肢扒地、像%SAVESTR:ASSI%自己的屁股一样高高的抬起献给了你。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2438',
        any: [
          /「啊啊啊…同时被主人看见了%UNICODE\(0x2661\) \*1%…母兽一样的姿势%UNICODE\(0x2661\) \*1%…贞操要失去了%UNICODE\(0x2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2439',
        any: [
          /「啊…快点…%SAVESTR:ASSI%的小鸡鸡%UNICODE\(0x2661\) \*1% 已经无法忍受了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2440',
        any: [
          /%SAVESTR:TARGET%一边对这种说法苦笑、一边被%SAVESTR:ASSI%不知污秽的蹂躏着秘裂………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2442',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2443',
        any: [
          /「啊啊啊…第一次献给主人了…以这样母兽一样的姿势%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2444',
        any: [
          /「对于卑贱淫乱的魔族%SELF_CALL\(TARGET\)%来说、是最相称的样子%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2445',
        any: [
          /%SAVESTR:TARGET%就这样高兴的四肢爬着、一边喘着粗气一边高高的翘着屁股。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2446',
        any: [
          /「嗯…啊啊啊…请、请吧%UNICODE\(0x2661\) \*1% 充分的蹂躏%SELF_CALL\(TARGET\)%的整个小穴吧%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2447',
        any: [
          /%SAVESTR:TARGET%抱住你的腰这样乞求、把小鸡鸡插进小穴彻底的蹂躏贞操………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2448',
        any: [
          /「呼啊啊啊…啊啊啊…小鸡鸡%UNICODE\(0x2661\) \*1%…到最里面%UNICODE\(0x2661\) \*1%…啊啊啊…真的好厉害哦%UNICODE\(0x/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2449-2450',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2451',
        any: [
          /「啊啊嗯%UNICODE\(0x2661\) \*1%…唔呼呼…从后面什么的…像母兽一样的被玷污了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2452',
        any: [/「看起来…非常…羞耻…但是好舒服啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2453',
        any: [/%SAVESTR:TARGET%忍耐着破瓜的痛苦说着俏皮话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2454',
        any: [
          /「嗯…哇…根、根本不痛、来吧…%SELF_CALL\(TARGET\)%处女的小穴里…请充分的让它受精吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2454-2455',
        any: [
          /「嗯…哇…根、根本不痛、来吧…%SELF_CALL\(TARGET\)%处女的小穴里…请充分的让它受精吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2457',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2459',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2460',
        any: [
          /%SAVESTR:TARGET%被命令就这样四肢扒地、像%SAVESTR:ASSI%自己的屁股一样高高的抬起献给了你。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2461',
        any: [
          /「咕…咕呜………」%SAVESTR:TARGET%靠只剩一点点的自尊心咬着嘴唇竭力不发出声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2462',
        any: [
          /%SAVESTR:ASSI%就这样毫不客气耻笑一样的蹂躏%SAVESTR:TARGET%的贞操………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2463',
        any: [/「咕…啊啊咿啊啊啊啊咿啊啊啊！！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2464',
        any: [
          /看到%SAVESTR:TARGET%在屈辱和破瓜的痛苦中无法忍受的哭叫、%NAME:MASTER%露出了愉悦的笑容………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2466',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2467',
        any: [
          /「啊啊嗯…%SELF_CALL\(TARGET\)%的屁股…那么有魅力？…啊嗯%UNICODE\(0x2661\) \*1%…啊啊啊…那么温柔的抚摸…嗯%UNICODE\(/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2468',
        any: [/%SAVESTR:TARGET%的屁股被温柔的舐着、少女发出了苦闷的呻吟。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2469',
        any: [
          /「啊啊啊…总觉得变成魔族后的肌肤…很敏感…嗯…咿啊%UNICODE\(0x2661\) \*1% 啊哈啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2470',
        any: [
          /「求、求你了…快点…侵犯…夺走%SELF_CALL\(TARGET\)%的贞操…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2471',
        any: [
          /%SAVESTR:TARGET%忍耐不住了苦闷的提高了声音。抱住你的腰%SAVESTR:TARGET%乞求你把小鸡鸡插进小穴蹂躏贞操………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2472',
        any: [/「咕啊…啊…咿…啊啊啊…到最里面来喽…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2473-2474',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2475',
        any: [
          /「哈…%SELF_CALL\(TARGET\)%…像母兽一样被主人的手侵犯了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2476',
        any: [/「也好呢…主人的话…被做什么都可以呢…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2477',
        any: [/「全部…全部接受了…啊…啊嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2478',
        any: [/%SAVESTR:TARGET%把贞操献给了你…………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2478-2479',
        any: [/%SAVESTR:TARGET%把贞操献给了你…………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2480-2481',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2483',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2484',
        any: [
          /%NAME:MASTER%命令%SAVESTR:ASSI%就这样从后面进入了%SAVESTR:TARGET%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2485',
        any: [/「咿…讨厌啊…停下啊！ 你为什么要做这种事你不也是勇者吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2486',
        any: [
          /%SAVESTR:ASSI%对%SAVESTR:TARGET%指责的呼喊用鼻子嘲笑、毫不留情的蹂躏了贞操………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2487',
        any: [
          /「啊啊啊啊啊！哎呀哎呀！这样母兽一样的姿势………咿…啊啊啊啊咿！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2488',
        any: [/%SAVESTR:TARGET%咬紧牙关忍耐着破瓜的疼痛………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2488-2489',
        any: [/%SAVESTR:TARGET%咬紧牙关忍耐着破瓜的疼痛………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2490',
        any: [/「这样…母兽一样的姿势…讨厌…%SELF_CALL\(TARGET\)%明明是勇者！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2491',
        any: [/%SAVESTR:TARGET%咬紧牙关忍耐着破瓜的疼痛………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2493',
        any: [/IF TALENT:TARGET:317 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2494',
        any: [/「啊…啊啊啊…这样的事要是把身体提前给那家伙就好了…嗯呜呜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2495',
        any: [/%SAVESTR:TARGET%回想起故乡的恋人不禁流下了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2495-2496',
        any: [/%SAVESTR:TARGET%回想起故乡的恋人不禁流下了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2495-2497',
        any: [/%SAVESTR:TARGET%回想起故乡的恋人不禁流下了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2498-2499',
        any: [/;非処女/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2499-2500',
        any: [/;非処女/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2502',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2504',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2505',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%从背后贯穿、发出了娇声。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2506',
        any: [/「母狗的小穴…请更多的侵犯吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2507',
        any: [/「想要主人H的地方有很多呢%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2508',
        any: [
          /%SAVESTR:ASSI%一边露出愕然的表情一边从后面侵犯%SAVESTR:TARGET%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2510',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2511',
        any: [/「讨厌…明明是…主人以外的人…竟然被…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2512',
        any: [/%SAVESTR:ASSI%抓住%SAVESTR:TARGET%的腰、从后面顶着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2513',
        any: [/「哟…饶了我…请绕了我吧…主人啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2514-2515',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2516',
        any: [/「哎呀…不要啊！这样的姿势什么的…咿呜嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2517',
        any: [/%SAVESTR:ASSI%紧紧抓住%SAVESTR:TARGET%的腰毫不留情的蹂躏着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2517-2518',
        any: [/%SAVESTR:ASSI%紧紧抓住%SAVESTR:TARGET%的腰毫不留情的蹂躏着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2520',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2521',
        any: [
          /「啊啊嗯…哇呜哇呜%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%是喜欢H的好色母狗…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2522',
        any: [/「请充分的为我受精吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2524',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2525',
        any: [/「就这样被从后面…有感觉了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2526',
        any: [
          /「真的…比起平时…%UNICODE\(0x2661\) \*1% 有感觉呢…%SELF_CALL\(TARGET\)%果然是H的孩子啦…%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2527-2528',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2529',
        any: [/「啊啊啊…这样…母兽一样…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2530',
        any: [/%SAVESTR:TARGET%被从后面侵犯的同时懊悔的低下了头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2530-2531',
        any: [/%SAVESTR:TARGET%被从后面侵犯的同时懊悔的低下了头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2532-2533',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2533',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2533-2534',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2535-2536',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2538',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2540',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2541',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%从背后贯穿、发出了娇声。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2542',
        any: [
          /「啊啊啊…更多的侵犯母狗的小穴吧%UNICODE\(0x2661\) \*1% 在主人的面前更多的玩弄我吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2543',
        any: [
          /%SAVESTR:TARGET%发出淫乱的声音让一旁看着的%NAME:MASTER%大笑起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2544',
        any: [
          /「最里面来了来了%UNICODE\(0x2661\) \*1% 咿啊啊啊%UNICODE\(0x2661\) \*1% 啊啊咿啊啊啊%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2546',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2547',
        any: [/「讨厌…明明是…主人以外的人…竟然被…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2548',
        any: [/%SAVESTR:ASSI%抓住%SAVESTR:TARGET%的腰、从后面顶着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2549',
        any: [
          /「咿嗯啊啊啊啊呜%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%的小穴…主人的东西什么的%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2550',
        any: [/「有感觉了…不行…不行啦%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2551',
        any: [
          /被%SAVESTR:ASSI%细细的调戏着、%SAVESTR:TARGET%的口中已经发出了甜蜜的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2552-2553',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2554',
        any: [/「哎呀…不要啊！这样的姿势什么的…咿啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2555',
        any: [/%SAVESTR:ASSI%紧紧抓住%SAVESTR:TARGET%的腰毫不留情的蹂躏着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2556',
        any: [
          /看见自己被%NAME:MASTER%注意到了、%SAVESTR:TARGET%发出了哀求似的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2557',
        any: [/「求你了…不要看…啊啊啊…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2557-2558',
        any: [/「求你了…不要看…啊啊啊…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2560',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2561',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2562',
        any: [
          /「呀嗯嗯%UNICODE\(0x2661\) \*1% 母狗%SAVESTR:TARGET%的淫乱小穴还要更多的被侵犯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2563',
        any: [
          /「啊哈%UNICODE\(0x2661\) \*1%%SELF_CALL\(TARGET\)%是母狗…以这样的姿势被侵犯是最舒服的事的说%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2564',
        any: [/%SAVESTR:TARGET%一边发出像狗一样的“哈哈”的喘息一边被侵犯………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2565',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2566',
        any: [
          /「嗯呀啊嗯…小穴被蹂躏了…四肢爬着…啊啊啊插到最里面了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2567',
        any: [
          /「嗯嗯%UNICODE\(0x2661\) \*1% 被插到小穴最里面了…明明应该是痛苦的…那最棒的…好棒哇%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2568',
        any: [/%SAVESTR:TARGET%双手紧握着承受着快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2568-2569',
        any: [/%SAVESTR:TARGET%双手紧握着承受着快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2570',
        any: [
          /「啊啊啊啊啊%UNICODE\(0x2661\) \*1% 大量受精了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2571',
        any: [
          /「%SELF_CALL\(TARGET\)%…%SELF_CALL\(TARGET, 1\)%…就在这里要怀孕生小孩子哈呀啊…要怀孕了啦%UNICODE\(0x2661\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2572',
        any: [
          /「呜啊哇%UNICODE\(0x2661\) \*1% 因为%SELF_CALL\(TARGET\)%是母狗啊…10几20个…会生这么多啦%UNICODE\(0x2661\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2572-2573',
        any: [
          /「呜啊哇%UNICODE\(0x2661\) \*1% 因为%SELF_CALL\(TARGET\)%是母狗啊…10几20个…会生这么多啦%UNICODE\(0x2661\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2574',
        any: [/CFLAG:322 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2576',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:322 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2577',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2578',
        any: [/「啊嗯…哈呜…更多…请给我更多………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2579',
        any: [/「更多…%SELF_CALL\(TARGET\)%变成母兽了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2580',
        any: [/%SAVESTR:TARGET%每次被插都会提高娇声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2581',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2582',
        any: [
          /「啊啊啊啊…好美妙…被主人从后面玩弄是最高的说%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2583',
        any: [
          /「%SELF_CALL\(TARGET\)%啊…是主人的”东西”…我能感觉到…啊啊啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2584',
        any: [/%SAVESTR:TARGET%一副陶醉的表情接纳着小鸡鸡………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2584-2585',
        any: [/%SAVESTR:TARGET%一副陶醉的表情接纳着小鸡鸡………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2586',
        any: [
          /「啊啊…主人啊…更多…玩坏我吧…%SELF_CALL\(TARGET\)%被玩坏了啦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2587',
        any: [
          /「呀哈%UNICODE\(0x2661\) \*1% 屁股都舒服的通红了…继续侵犯我啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2588',
        any: [/%SAVESTR:TARGET%流出了喜悦的泪水………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2588-2589',
        any: [/%SAVESTR:TARGET%流出了喜悦的泪水………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2590',
        any: [/CFLAG:322 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2592',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:322 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2593',
        any: [/「咕…呜、咿、哈啊啊…小穴…太舒服了…什么都无法思考了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2594',
        any: [/「被从后面…好舒服啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2595',
        any: [/CFLAG:322 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2597',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:322 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2598',
        any: [/「不、不行了…已经不行了…被从后面…嗯…啊…哈啊嗯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2599',
        any: [/CFLAG:322 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2601',
        any: [/ELSEIF CFLAG:322 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2602',
        any: [/「咕…嗯…嗯…咕…啊啊啊…嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2603',
        any: [/%SAVESTR:TARGET%被从后面侵犯的同时懊悔的低下了头………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2604',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2604-2605',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2604-2606',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2604-2607',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2608-2611',
        any: [/;対面座位 CFLAG:323/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2613',
        any: [/IF SELECTCOM == 22/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2614',
        any: [/IF CFLAG:TARGET:323 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2616',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2618',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2619',
        any: [/「哈…这个姿势好棒啊…可以由自己来破处呢…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2621',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2622',
        any: [/「这样姿势什么的…主人啊…好好的…请看吧…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2623',
        any: [/%SAVESTR:TARGET%高兴的流下了眼泪、接受了你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2624-2625',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2626',
        any: [/「哇…嗯嗯…过分…自己放进去什么的…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2626-2627',
        any: [/「哇…嗯嗯…过分…自己放进去什么的…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2628-2629',
        any: [/;非処女/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2631',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2633',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2634',
        any: [
          /%SAVESTR:TARGET%一边和%SAVESTR:ASSI%相互接吻一边用小穴的最里面接受着小鸡鸡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2635',
        any: [
          /「啊哈…嘛啊…咿呜嗯…更多…更多的侵犯我吧%UNICODE\(0x2661\) \*1%…主人看啊我的那里满满的了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2636',
        any: [/%SAVESTR:TARGET%妖艳的把视线转了过来、提高了喘息的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2638',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2639',
        any: [/%SAVESTR:TARGET%一边和%SAVESTR:ASSI%接吻一边被侵犯着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2640',
        any: [
          /「啊…嗯…呀哎呀…主人这样的地方…明明不想被看到的…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2641',
        any: [/意识到被看见了的%SAVESTR:TARGET%提高了妖艳的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2642-2643',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2644',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:ASSI%那样侵犯、发出了模糊不清的的悲鸣………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2645',
        any: [/「哦咿…啊咿…住手…嗯…呜嗯…咿！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2645-2646',
        any: [/「哦咿…啊咿…住手…嗯…呜嗯…咿！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2648',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2649',
        any: [/「主人啊…更加用力点啊…好好的做啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2651',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2652',
        any: [/「啊…嗯…咿…总觉得…有点不好意思…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2653',
        any: [/「就像是…看、看起来像是情侣之间…啊嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2654-2655',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2656',
        any: [/「啊啊啊…这样的…呀啊！从下往上顶不行啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2656-2657',
        any: [/「啊啊啊…这样的…呀啊！从下往上顶不行啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2658-2659',
        any: [/CFLAG:323 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2659',
        any: [/CFLAG:323 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2659-2660',
        any: [/CFLAG:323 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2661-2662',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2664',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2666',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2667',
        any: [
          /%SAVESTR:TARGET%一边和%SAVESTR:ASSI%相互接吻一边用小穴的最里面接受着小鸡鸡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2668',
        any: [
          /「啊哈…嘛啊…咿呜嗯…更多…更多的侵犯我吧%UNICODE\(0x2661\) \*1%…主人看啊我的那里满满的了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2669',
        any: [/%SAVESTR:TARGET%妖艳的把视线转了过来、提高了喘息的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2671',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2672',
        any: [/%SAVESTR:TARGET%一边和%SAVESTR:ASSI%接吻一边被侵犯着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2673',
        any: [
          /「啊…嗯…呀哎呀…主人这样的地方…明明不想被看到的…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2674',
        any: [/意识到被看见了的%SAVESTR:TARGET%提高了妖艳的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2675-2676',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2677',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:ASSI%那样侵犯、发出了模糊不清的的悲鸣…………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2678',
        any: [/「哦咿…啊咿…住手…嗯…呜嗯…咿！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2678-2679',
        any: [/「哦咿…啊咿…住手…嗯…呜嗯…咿！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2681',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:323 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2682',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2683',
        any: [
          /「啊…啊哈…有、有点难为情、噶、脸…请不要这么看…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2684',
        any: [
          /「啊啊啊…什、什么意思…那样…不、不要看…呀嗯…顶的话…啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2685',
        any: [/%SAVESTR:TARGET%的脸上满是沉浸在快乐中的表情………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2686',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2687',
        any: [
          /「哈哈%UNICODE\(0x2661\) \*1% 嗯…小鸡鸡到最里面了…进来了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2688',
        any: [
          /「嗯…啊啊啊%UNICODE\(0x2661\) \*1%…充分的侍奉了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2689',
        any: [/「啊啊啊…好舒服啊…请满满的射进来吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2689-2690',
        any: [/「啊啊啊…好舒服啊…请满满的射进来吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2691',
        any: [
          /「哈…啊…啊啊啊嗯%UNICODE\(0x2661\) \*1% 吇咕吇咕的声音呜嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2692',
        any: [
          /「啊啊啊…好羞耻%UNICODE\(0x2661\) \*1%明明那么羞耻%UNICODE\(0x2661\) \*1%…腰还是停不下来%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2693',
        any: [
          /「满满的射进来…射精吧…%SELF_CALL\(TARGET\)%的腰停下吧%UNICODE\(0x2661\) \*1%」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2693-2694',
        any: [
          /「满满的射进来…射精吧…%SELF_CALL\(TARGET\)%的腰停下吧%UNICODE\(0x2661\) \*1%」」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2695',
        any: [/CFLAG:323 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2697',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:323 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2698',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2699',
        any: [/「啊嗯…啊哈呜…更多…请更用力吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2700',
        any: [/「绝对…绝对不会分开…啊啊啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2701',
        any: [/%SAVESTR:TARGET%用双手紧紧抱住了你………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2702',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2703',
        any: [/「这么做的话…简直就像恋人一样看见了吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2704',
        any: [/「如果是这样的话…好高兴啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2705',
        any: [/%SAVESTR:TARGET%感受到%NAME:MASTER%的嘴唇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2705-2706',
        any: [/%SAVESTR:TARGET%感受到%NAME:MASTER%的嘴唇………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2707',
        any: [/「主人啊…更多…%SELF_CALL\(TARGET\)%好舒服啊…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2708',
        any: [/「嗯…好厉害…直到最里面都连着…哈啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2709',
        any: [/%SAVESTR:TARGET%为了贪图快乐得意洋洋的扭着腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2709-2710',
        any: [/%SAVESTR:TARGET%为了贪图快乐得意洋洋的扭着腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2711',
        any: [/CFLAG:323 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2713',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:323 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2714',
        any: [/「啊嗯…啊啊啊啊…不行了…离不开魔王大人了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2715',
        any: [/「腰…离不开的…小穴不行了啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2716',
        any: [/CFLAG:323 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2718',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:323 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2719',
        any: [/「明明被这样…离不开魔王大人…呃…啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2720',
        any: [/CFLAG:323 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2722',
        any: [/ELSEIF CFLAG:323 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2723',
        any: [/「哈…啊…啊啊啊…快点…想离开…明明…腰啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2724',
        any: [/CFLAG:323 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2724-2725',
        any: [/CFLAG:323 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2724-2726',
        any: [/CFLAG:323 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2724-2727',
        any: [/CFLAG:323 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2728-2731',
        any: [/;背面座位 CFLAG:324/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2733',
        any: [/IF SELECTCOM == 23/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2734',
        any: [/IF CFLAG:TARGET:324 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2736',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2738',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2739',
        any: [/「主人啊…我这样坐着扭腰…好棒啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2741',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2742',
        any: [/「主人啊…好好的…请抱紧我…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2743',
        any: [/%SAVESTR:TARGET%流下了高兴的眼泪、接纳了你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2744-2745',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2746',
        any: [/「咿！从下面…不行哦！啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2747',
        any: [/%SAVESTR:TARGET%由于破处的痛苦流下了眼泪…………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2747-2748',
        any: [/%SAVESTR:TARGET%由于破处的痛苦流下了眼泪…………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2749-2750',
        any: [/;非処女/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2752',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2754',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2755',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%从后面高高的顶起而发出了声音。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2756',
        any: [
          /「啊啊啊…更多…还要更多…%UNICODE\(0x2661\) \*1% 乳房也被紧紧的抓住…啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2757',
        any: [
          /「主人啊…%SAVESTR:ASSI%小姐会填满很多地方…看啊…请看啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2758',
        any: [
          /%SAVESTR:TARGET%发出淫乱的声音、同时为了炫耀欢乐那样摇晃起了腰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2760',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2761',
        any: [
          /「啊…不行了…不要看…不要看啊主人…啊啊啊%UNICODE\(0x2661\) \*1% 不、不要再欺负我了…%SAVESTR:ASSI%………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2762',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%从后面这样抱着继续侵犯。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2763',
        any: [
          /『给我好好的把腿张开吧』%SAVESTR:ASSI%从后面轻轻的说出了命令而%SAVESTR:TARGET%服从了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2764',
        any: [/「啊啊…哎呀…被侵犯…有感觉了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2765-2766',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2767',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%从后面顶到发出了痛苦的声音。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2768',
        any: [/「讨厌…讨厌啊咿…停下吧…求你了…啊…啊啊啊…啊呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2768-2769',
        any: [/「讨厌…讨厌啊咿…停下吧…求你了…啊…啊啊啊…啊呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2771',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2772',
        any: [
          /「啊啊啊…啊哈…来玩弄%SELF_CALL\(TARGET\)%的乳房吧…小穴会紧紧的夹住的…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2773',
        any: [/%SAVESTR:TARGET%乳房被摸的时候发出了喘息的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2775',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2776',
        any: [/「被主人从后面抱住了…一点都不觉得害怕…啊啊啊…呼♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2777',
        any: [/%SAVESTR:TARGET%对你撒娇般的洋洋得意地扭起腰…………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2778-2779',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2780',
        any: [/「总觉得…怪怪的感觉…嗯…这个样子…插得好深啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2780-2781',
        any: [/「总觉得…怪怪的感觉…嗯…这个样子…插得好深啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2782-2783',
        any: [/CFLAG:324 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2783',
        any: [/CFLAG:324 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2783-2784',
        any: [/CFLAG:324 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2785-2786',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2788',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2790',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2791',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%从后面高高的顶起而发出了声音。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2792',
        any: [
          /「啊啊啊…更多…还要更多…%UNICODE\(0x2661\) \*1% 乳房也被紧紧的抓住…啊啊啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2793',
        any: [
          /「主人啊…%SAVESTR:ASSI%小姐会填满很多地方…看啊…请看啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2794',
        any: [
          /%SAVESTR:TARGET%发出淫乱的声音、同时为了炫耀欢乐那样摇晃起了腰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2796',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2797',
        any: [
          /「啊…不行了…不要看…不要看啊主人…啊啊啊%UNICODE\(0x2661\) \*1% 不、不要再欺负我了…%SAVESTR:ASSI%………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2798',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%从后面这样抱着继续侵犯。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2799',
        any: [
          /『给我好好的把腿张开吧』%SAVESTR:ASSI%从后面轻轻的说出了命令而%SAVESTR:TARGET%服从了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2800',
        any: [/「啊啊…哎呀…被侵犯…有感觉了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2801-2802',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2803',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:ASSI%从后面插进来、发出了好像很痛苦的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2804',
        any: [/「讨厌…讨厌啊咿…停下吧…求你了…啊…啊啊啊…啊呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2804-2805',
        any: [/「讨厌…讨厌啊咿…停下吧…求你了…啊…啊啊啊…啊呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2807',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:324 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2808',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2809',
        any: [/「啊啊啊…从后面顶的好棒啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2810',
        any: [
          /「嗯…啊啊啊啊%UNICODE\(0x2661\) \*1% 好舒服啊…腿打开了呜嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2811',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2812',
        any: [
          /「呜嗯…啊啊啊%UNICODE\(0x2661\) \*1% 身体也…被摸了…被摸了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2813',
        any: [
          /「咿咿嗯…咿啊啊啊啊啊嗯%UNICODE\(0x2661\) \*1% 啊啊啊嗯给我啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2813-2814',
        any: [
          /「咿咿嗯…咿啊啊啊啊啊嗯%UNICODE\(0x2661\) \*1% 啊啊啊嗯给我啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2815',
        any: [
          /「主人啊…更多…扭动腰啊…舒服了很多啊…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2815-2816',
        any: [
          /「主人啊…更多…扭动腰啊…舒服了很多啊…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2817',
        any: [/CFLAG:324 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2819',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:324 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2820',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2821',
        any: [/「哈…啊啊啊…主人啊…请更多抚摸吧…更多…从小穴开始好了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2822',
        any: [
          /「嗯嗯…那、那里很好的说…更多…请随意的玩弄………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2823',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2824',
        any: [/「就这样被从后面…像主人的玩具一样………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2825',
        any: [/「非常非常的美妙…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2825-2826',
        any: [/「非常非常的美妙…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2827',
        any: [
          /「主人啊…更多…还想要更多…求你了…再给我点%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2828',
        any: [/%SAVESTR:TARGET%得意洋洋的淫秽的扭着腰…继续发出甜美的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2828-2829',
        any: [/%SAVESTR:TARGET%得意洋洋的淫秽的扭着腰…继续发出甜美的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2830',
        any: [/CFLAG:324 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2832',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:324 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2833',
        any: [/「啊啊啊…呜啊咿…不、不行了…被插到最里面了…腰…停不下来了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2834',
        any: [/CFLAG:324 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2836',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:324 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2837',
        any: [/「哈呜…被、被插到最里面了…哈…逃不了了啊…啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2838',
        any: [/CFLAG:324 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2840',
        any: [/ELSEIF CFLAG:324 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2841',
        any: [/「咕…呼…咿、啊啊啊…讨厌啊…求你了…再原谅我一次………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2842',
        any: [/CFLAG:324 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2842-2843',
        any: [/CFLAG:324 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2842-2844',
        any: [/CFLAG:324 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2842-2845',
        any: [/CFLAG:324 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2846-2849',
        any: [/;正常位アナル CFLAG:327/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2851',
        any: [/IF SELECTCOM == 26/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2853',
        any: [/IF CFLAG:TARGET:327 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2855',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2857',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2858',
        any: [/「啊啊啊…在主人面前…肛门被侵犯了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2859',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:ASSI%侵犯着肛门、同时身体向后弯曲并发出娇吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2860',
        any: [/「哈…啊…咕啾咕啾还要…更多…更多%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2862',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2863',
        any: [
          /「那里…不一样…啊啊啊…全部进来了…啊啊啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2864',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:ASSI%侵犯着肛门、同时身体向后弯曲并发出娇吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2865',
        any: [/「有感觉了…明明那里不行的…啊…啊啊啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2866',
        any: [/「这种地方不要看啊…主人啊…啊啊嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2867-2868',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2869',
        any: [/「不要再做了…那里是…咿咿咿！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2870',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%侵犯着肛门同时发出悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2870-2871',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%侵犯着肛门同时发出悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2873',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2874',
        any: [/「啊啊啊…小鸡鸡在屁股小穴里顶什么的%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2875',
        any: [/「皱褶收紧了好想继续啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2877',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2878',
        any: [/「主人啊…屁股小穴…好、好怕…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2879',
        any: [/「但、但是…感受到主人的小鸡鸡了…呀呜嗯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2880-2881',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2882',
        any: [/「啊、啊、不行了饶了我吧、那里是…不要…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2882-2883',
        any: [/「啊、啊、不行了饶了我吧、那里是…不要…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2884',
        any: [/CFLAG:TARGET:327 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2884-2885',
        any: [/CFLAG:TARGET:327 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2886-2887',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2889',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2891',
        any: [/IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2892',
        any: [/「咿…啊啊啊咿…感谢主人侵犯我的肛门啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2893',
        any: [
          /「变态淫乱的肛交狂…%SAVESTR:TARGET%的屁股小穴请主人侵犯的满满的吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2894',
        any: [/「融化了呜嗯…脑袋里…全部融化了哦%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2895',
        any: [
          /%SAVESTR:TARGET%沉溺于肛门被插得快乐、已经听不到%NAME:MASTER%和%SAVESTR:ASSI%的声音了吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2897',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2898',
        any: [/「啊啊啊…在主人面前…被侵犯肛门%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2899',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:ASSI%侵犯着肛门、喉咙里传来阵阵娇吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2900',
        any: [/「咕啾咕啾还要…更多…更多%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2902',
        any: [/ELSEIF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2903',
        any: [
          /「咿%UNICODE\(0x2661\) \*1% 啊啊啊…肛门被侵犯了…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2904',
        any: [
          /「脑袋里…一片空白了啊…啊嗯…求%SAVESTR:ASSI%大人给我！更多的侵犯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2905',
        any: [/%SAVESTR:TARGET%抱住%SAVESTR:ASSI%哀求起来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2907',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2908',
        any: [
          /「那里…不一样…啊啊啊…全部进来了…啊啊啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2909',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:ASSI%侵犯着肛门、喉咙里传来阵阵娇吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2910',
        any: [/「有感觉了…明明不行的…啊…啊啊啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2911',
        any: [/「这种地方不要看啊…主人啊…啊啊嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2912-2913',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2914',
        any: [/「不行了…不行了…那里是…不行了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2915',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%侵犯着肛门同时发出悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2915-2916',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%侵犯着肛门同时发出悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2918',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:327 <= 8 \|\| FLAG/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2919',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2920',
        any: [
          /「哇…咿啊…啊啊啊啊啊啊…%UNICODE\(0x2661\) \*1% 咿…肛门好棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2921',
        any: [
          /「啊啊啊…已经…肛门好舒服啊…只是欺负肛门而已啊…嗯呀啊啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2922',
        any: [/%SAVESTR:TARGET%被肛门的强烈快感弄的脑海中都融化了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2923',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2924',
        any: [
          /「啊哈啊%UNICODE\(0x2661\) \*1% 肛门被弄的吇咕吇咕的…咿咿%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2925',
        any: [
          /「脑袋里一片空白…除了快感什么也无法思考了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2926',
        any: [/「啊哦…哦…哈啊…咿…咿…啊啊啊啊咿～～！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2926-2927',
        any: [/「啊哦…哦…哈啊…咿…咿…啊啊啊啊咿～～！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2928',
        any: [
          /「讨厌啊…肛门被这么激烈的操弄…%SELF_CALL\(TARGET\)%、%SELF_CALL\(TARGET\)%要丢了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2929',
        any: [
          /「所、所以…温、温柔…咿！啊啊啊啊讨厌啦…明明说了的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2930',
        any: [
          /「啊啊啊…不行了不行了不行了不行了…脑袋都融化了…已经…有肛门就够了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2930-2931',
        any: [
          /「啊啊啊…不行了不行了不行了不行了…脑袋都融化了…已经…有肛门就够了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2932',
        any: [/CFLAG:327 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2934',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2935',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2936',
        any: [
          /「呀哈…肛门被侵犯好棒啊…更多%SELF_CALL\(TARGET\)%的淫乱肛门还要更多%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2937',
        any: [/「呼…啊啊啊…嘎吱嘎吱的张开了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2937-2938',
        any: [/「呼…啊啊啊…嘎吱嘎吱的张开了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2939',
        any: [
          /「咿啊啊啊…啊哈嗯…%UNICODE\(0x2661\) \*1% 肛门被插得融化了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2940',
        any: [/「感觉从腰部以下都全部融化了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2940-2941',
        any: [/「感觉从腰部以下都全部融化了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2942',
        any: [/CFLAG:327 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2944',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:327 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2945',
        any: [
          /「呀哈…肛门被侵犯的好棒啊…更多%SELF_CALL\(TARGET\)%的淫乱肛门还要更多%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2946',
        any: [/CFLAG:327 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2948',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:327 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2949',
        any: [/「啊啊啊嗯…肛门被弄的吇咕吇咕的♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2950',
        any: [/「哈…%SELF_CALL\(TARGET, 1\)%…最喜欢被主人插肛门了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2951',
        any: [/「肛门被主人的小鸡鸡侵犯…脑袋要发狂了嗯、粘糊糊的融化了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2952',
        any: [/CFLAG:327 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2954',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:327 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2955',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2956',
        any: [/「嗯咿嗯…屁股小穴啊…褶皱呜哇…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2957',
        any: [/「褶皱里…好舒服…不行了啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2957-2958',
        any: [/「褶皱里…好舒服…不行了啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2959',
        any: [
          /「如果是主人的话…被侵犯屁股小穴也没关系呀…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2960',
        any: [/「啊嗯…嗯…哈呜…啊啊…已经不行了…屁股小穴…融化了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2960-2961',
        any: [/「啊嗯…嗯…哈呜…啊啊…已经不行了…屁股小穴…融化了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2962',
        any: [/CFLAG:327 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2964',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:327 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2965',
        any: [/「呜啊…啊…咿…屁股小穴…好舒服………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2966',
        any: [/CFLAG:327 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2968',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:327 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2969',
        any: [/「哈嗯…啊啊啊…屁股小穴…被侵犯了…这样的感觉…好奇怪啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2970',
        any: [/CFLAG:327 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2972',
        any: [/ELSEIF  CFLAG:327 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2973',
        any: [/「哇…嗯…啊…咿…哎呀…哎呀…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2974',
        any: [/CFLAG:327 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2974-2975',
        any: [/CFLAG:327 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2974-2976',
        any: [/CFLAG:327 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2974-2977',
        any: [/CFLAG:327 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2978-2981',
        any: [/;後背位アナル CFLAG:328/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2983',
        any: [/IF SELECTCOM == 27/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2985',
        any: [/IF CFLAG:TARGET:328 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2987',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2989',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2990',
        any: [
          /「啊啊啊…肛门被侵犯了%UNICODE\(0x2661\) \*1% 在主人的面前被侵犯了…啊啊啊%UNICODE\(0x2661\) \*1% 感觉到你的小鸡鸡了%UNI/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2991',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:ASSI%从后面贯穿了肛门、经常能听到%SAVESTR:TARGET%发出的娇吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2992',
        any: [
          /「%SAVESTR:TARGET%是肛门有快感的淫乱母狗…请好好的看吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2993',
        any: [
          /%SAVESTR:ASSI%一边对%SAVESTR:TARGET%混乱凌乱的样子苦笑一边继续侵犯她的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2995',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2996',
        any: [/「求求你…不要在欺负我了…啊啊啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2997',
        any: [
          /%SAVESTR:ASSI%抱着正在哭泣的%SAVESTR:TARGET%的腰兴奋不已的继续侵犯肛门不断的抽插。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2998',
        any: [
          /「呀啊啊啊…啊啊啊…讨、讨厌啊…主人啊…不要看…不要看啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '2999',
        any: [/%SAVESTR:TARGET%被肛门陵辱的快感弄的慢慢开始发出喘息的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3000-3001',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3002',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%从背后摁住就这样侵犯着肛门………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3003',
        any: [/「呀哎呀啊！停下吧…求你了…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3003-3004',
        any: [/「呀哎呀啊！停下吧…求你了…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3006',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3007',
        any: [/「啊啊啊…肛门被撑大了…咿啊啊啊…好棒哦%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3008',
        any: [/「肛门被侵犯的好棒哦%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3010',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3011',
        any: [/「可以啊…请把%SELF_CALL\(TARGET\)%当成母兽一样侵犯吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3012',
        any: [
          /「啊嗯…屁股小穴什么的…呀嗯…真的…快要变成母兽了………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3013-3014',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3015',
        any: [/「这样的姿势什么的…真是的你究竟要…咕嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3015-3016',
        any: [/「这样的姿势什么的…真是的你究竟要…咕嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3017',
        any: [/CFLAG:TARGET:328 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3017-3018',
        any: [/CFLAG:TARGET:328 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3019-3020',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3022',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3024',
        any: [/IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3025',
        any: [
          /「咕嗯咿咿咕嗯%UNICODE\(0x2661\) \*1%淫乱变态的肛门被侵犯了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3026',
        any: [
          /「主人～%UNICODE\(0x2661\) \*1%…像母狗一样被侵犯肛门…已经要不行了…请好好的看吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3027',
        any: [
          /%SAVESTR:ASSI%有点愕然的表情看着%SAVESTR:TARGET%一副融化在肛门被艹的快乐中的表情继续从后面侵犯着。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3028',
        any: [
          /「啊啊嗯%UNICODE\(0x2661\) \*1%…咿嗯咿咿啊啊%UNICODE\(0x2661\) \*1%…咿啊啊啊啊%UNICODE\(0x2661\) \*1%…咿呜/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3030',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3031',
        any: [
          /「啊啊啊…肛门被侵犯了%UNICODE\(0x2661\) \*1% 在主人面前被侵犯了…啊啊啊%UNICODE\(0x2661\) \*1% 感受到你的了%UNICODE/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3032',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:ASSI%从后面贯穿了肛门、经常能听到%SAVESTR:TARGET%发出的娇吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3033',
        any: [
          /「肛门有感觉了啊…%SAVESTR:TARGET%是淫乱的母狗…请更多的看吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3034',
        any: [
          /%SAVESTR:ASSI%一边对%SAVESTR:TARGET%混乱凌乱的样子苦笑一边继续侵犯她的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3036',
        any: [/ELSEIF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3037',
        any: [
          /「啊…啊哈…更多的虐待我吧%UNICODE\(0x2661\) \*1% 侵犯%SELF_CALL\(TARGET\)%的好色肛门%UNICODE\(0x2661\) \*1%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3038',
        any: [
          /「啊啊啊…%SELF_CALL\(TARGET\)%是…肛交狂的变态母狗…%UNICODE\(0x2661\) \*1% 请更多的侵犯吧%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3039',
        any: [
          /%SAVESTR:ASSI%饶有兴致的抓住%SAVESTR:TARGET%的腰不停的侵犯着肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3041',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3042',
        any: [/「求你了…不要再折磨我了…啊啊啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3043',
        any: [
          /%SAVESTR:ASSI%抱着正在哭泣的%SAVESTR:TARGET%的腰兴奋不已的继续侵犯肛门不断的抽插。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3044',
        any: [
          /「呀啊啊啊…啊啊啊…讨、讨厌啊…主人啊…不要看…不要看啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3045',
        any: [/%SAVESTR:TARGET%在肛门被侵犯的快感开始慢慢的发出喘息的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3046-3047',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3048',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%从背后摁住就这样侵犯着肛门……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3049',
        any: [/「呀哎呀啊！停下吧…求你了…啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3049-3050',
        any: [/「呀哎呀啊！停下吧…求你了…啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3052',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:328 <= 8 \|\| FLAG/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3053',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3054',
        any: [
          /「呜啊啊啊啊啊！…啊啊啊…呜、呜哦…肛门被艹好棒哦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3055',
        any: [
          /%SAVESTR:TARGET%一副肛门被小鸡鸡一插就融化了的样子、从嘴里流下了口水。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3056',
        any: [
          /「%SELF_CALL_FIRST\(TARGET\)%…%SELF_CALL\(TARGET\)%的事怎样都好…肛门性交…就满足了%UNICODE\(0x2661\) \*/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3057',
        any: [/「好棒啊…肛门被小鸡鸡插进来好棒啊%UNICODE\(0x2661\) \*3%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3058',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3059',
        any: [/「嘛啊啊啊…啊…嗯…最棒了…好棒哦…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3060',
        any: [
          /「肛门张开了%UNICODE\(0x2661\) \*1% 呀啊啊啊%UNICODE\(0x2661\) \*1% 啊啊啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3061',
        any: [
          /「肛门性交好棒啊…%SELF_CALL\(TARGET, 1\)%…只要能肛门性交就什么都愿意做哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3062',
        any: [
          /%SAVESTR:TARGET%一边叫着下流的话一边从肛门到头顶都沉迷于快感之中………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3062-3063',
        any: [
          /%SAVESTR:TARGET%一边叫着下流的话一边从肛门到头顶都沉迷于快感之中………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3064',
        any: [
          /「啊啊…哦%UNICODE\(0x2661\) \*1%…哦%UNICODE\(0x2661\) \*1% 小鸡鸡全部插进来了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3065',
        any: [
          /「被小鸡鸡吇咕吇咕的是至高无上的享受%UNICODE\(0x2661\) \*1% 已经不需要什么小穴了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3066',
        any: [
          /「就这样…一直…只被艹肛门就是我想要的生活了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3067',
        any: [/%SAVESTR:TARGET%完全败给了肛门的快感、再也无法恢复了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3067-3068',
        any: [/%SAVESTR:TARGET%完全败给了肛门的快感、再也无法恢复了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3069',
        any: [/CFLAG:328 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3071',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3072',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3073',
        any: [
          /「啊啊啊…炽热的小鸡鸡%UNICODE\(0x2661\) \*1% 啊啊啊…肛门性交好棒哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3074',
        any: [/「啊嗯啊啊啊啊…咿…更多的肛门性交啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3074-3075',
        any: [/「啊嗯啊啊啊啊…咿…更多的肛门性交啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3076',
        any: [
          /「啊啊啊…啊…肛门张开了…咿%UNICODE\(0x2661\) \*1% 嗯咿咿哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3077',
        any: [/「啊哈啊啊咿…肛门要融化了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3077-3078',
        any: [/「啊哈啊啊咿…肛门要融化了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3079',
        any: [/CFLAG:328 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3081',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:328 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3082',
        any: [
          /「啊啊啊…啊…肛门张开了…咿%UNICODE\(0x2661\) \*1% 嗯咿咿哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3083',
        any: [/CFLAG:328 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3085',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:328 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3086',
        any: [/「啊啊啊…更多…肛门还要更多的抽插！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3087',
        any: [/「主人的小鸡鸡…有感觉了…感觉好棒呜呜」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3088',
        any: [/「哈…主人啊…%SELF_CALL\(TARGET\)%的好色肛门…更多的侵犯吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3089',
        any: [/CFLAG:328 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3091',
        any: [
          /elseIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3092',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3093',
        any: [
          /「啊嗯…咿…哈呜…屁股小穴被侵犯了…好棒哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3094',
        any: [/「主人已经…%SELF_CALL\(TARGET\)%的屁股小穴、好舒服啊？…啊嗯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3094-3095',
        any: [/「主人已经…%SELF_CALL\(TARGET\)%的屁股小穴、好舒服啊？…啊嗯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3096',
        any: [/「啊啊啊…屁股好棒哦…主人…被侵犯的好棒哦…哈♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3097',
        any: [/「更多…像母兽一样屁股有感觉了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3097-3098',
        any: [/「更多…像母兽一样屁股有感觉了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3099',
        any: [/CFLAG:328 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3101',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:328 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3102',
        any: [
          /「啊啊啊啊…屁股小穴…喜欢上了啊…但是…主人这是不好的…啊哈%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3103',
        any: [/CFLAG:328 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3105',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:328 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3106',
        any: [/「哇…咿…啊啊…屁股小穴…被打开了…好舒服…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3107',
        any: [/CFLAG:328 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3109',
        any: [/ELSEIF  CFLAG:328 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3110',
        any: [/「嗯咿…咿…这样的…这样的…讨厌啊…啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3111',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3111-3112',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3111-3113',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3111-3114',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3115-3118',
        any: [/;対面座位アナル CFLAG:329/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3120',
        any: [/IF SELECTCOM == 28/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3122',
        any: [/IF CFLAG:TARGET:329 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3124',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3126',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3127',
        any: [
          /「啊啊啊…到最里面了…放进去了%UNICODE\(0x2661\) \*1% 啊嗯…二个人的样子都展现主人面前了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3128',
        any: [
          /%SAVESTR:TARGET%一边和%SAVESTR:ASSI%舌头缠绕淫乱的深吻一边扭着腰贪图肛门的快感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3129',
        any: [/「啊啊啊…哈…屁股小穴…最棒的%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3131',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3132',
        any: [/%SAVESTR:TARGET%一边被%SAVESTR:ASSI%侵犯着肛门一边接吻。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3133',
        any: [
          /「哇…啊啊啊…进到肛门的尽头了…啊啊…张开了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3134',
        any: [/感受到肛门扩张的快感%SAVESTR:TARGET%发出了喘息声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3135-3136',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3137',
        any: [/「呀讨厌…这样的话肛门全被看光了…咿！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3138',
        any: [/%SAVESTR:TARGET%默不作声的让%SAVESTR:ASSI%顶起了腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3139',
        any: [/%SAVESTR:TARGET%向外翻的肛门被%NAME:MASTER%一目了然………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3139-3140',
        any: [/%SAVESTR:TARGET%向外翻的肛门被%NAME:MASTER%一目了然………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3142',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3143',
        any: [
          /「哎呀啊%UNICODE\(0x2661\) \*1% 深点…深点呦…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3144',
        any: [/「小鸡鸡更多的欺负我吧…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3146',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3147',
        any: [
          /「主人就这样也…很喜欢呢…%SELF_CALL\(TARGET\)%现在、喜欢上了…啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3148',
        any: [/「到最里面…连接着…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3149-3150',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3151',
        any: [/「啊啊啊…那里一目了然了啊…屁股被侵犯什么的…啊啊啊…看啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3151-3152',
        any: [/「啊啊啊…那里一目了然了啊…屁股被侵犯什么的…啊啊啊…看啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3153',
        any: [/CFLAG:TARGET:329 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3153-3154',
        any: [/CFLAG:TARGET:329 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3155-3156',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3158',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3160',
        any: [/IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3161',
        any: [
          /「啊啊啊啊%UNICODE\(0x2661\) \*1%…已、已经不行了…没有我的允许%UNICODE\(0x2661\) \*1%…直到肛门高潮为止…不会放你走的%UNI/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3162',
        any: [/%SAVESTR:TARGET%抱住%SAVESTR:ASSI%、贪图快乐一样激烈的扭着腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3163',
        any: [/肛门的结合部发出下流的声音、粘糊的肠液和小鸡鸡粘在一起………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3164',
        any: [
          /「啊啊啊…好棒%UNICODE\(0x2661\) \*1% 好棒啊%UNICODE\(0x2661\) \*1%…满满的…满满的玩弄我吧%UNICODE\(0x2661\) /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3166',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3167',
        any: [
          /「啊啊啊…到最里面了…放进去了%UNICODE\(0x2661\) \*1% 啊嗯…二个人的样子都展现主人面前了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3168',
        any: [
          /%SAVESTR:TARGET%一边和%SAVESTR:ASSI%舌头缠绕淫乱的深吻一边扭着腰贪图肛门的快感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3169',
        any: [/「啊啊啊…哈…屁股小穴…最棒的%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3171',
        any: [/ELSEIF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3172',
        any: [
          /「更多…更多的侵犯…%UNICODE\(0x2661\) \*1% 肛门都张开了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3173',
        any: [
          /「肛门太舒服了…啊啊啊…已经不行了…%UNICODE\(0x2661\) \*1% 啊啊啊…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3174',
        any: [
          /%SAVESTR:TARGET%抱住%SAVESTR:ASSI%、贪图快乐一样激烈的扭着腰………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3176',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3177',
        any: [/%SAVESTR:TARGET%一边被%SAVESTR:ASSI%侵犯着肛门一边接吻。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3178',
        any: [
          /「哇…啊啊啊…进到肛门的尽头了…啊啊…张开了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3179',
        any: [/感受到肛门扩张的快感%SAVESTR:TARGET%发出了喘息声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3180-3181',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3182',
        any: [/「呀讨厌…这样的话肛门全被看光了…咿！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3183',
        any: [/%SAVESTR:TARGET%默不作声的让%SAVESTR:ASSI%顶起了腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3184',
        any: [/%SAVESTR:TARGET%向外翻的肛门被%NAME:MASTER%一目了然………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3184-3185',
        any: [/%SAVESTR:TARGET%向外翻的肛门被%NAME:MASTER%一目了然………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3187',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:329 <= 8 \|\| FLAG/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3188',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3189',
        any: [/%SAVESTR:TARGET%的肛门把%NAME:MASTER%的小鸡鸡整根都吸了进去。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3190',
        any: [/「不、不要动了…都扩张开了…好棒啊…啊嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3191',
        any: [
          /肛门颤抖着、忍耐着什么似的晃动着屁股%SAVESTR:TARGET%看上去与其说是淫乱不如说是可爱。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3192',
        any: [/「啊哈！动、动吧、好棒…不行了…呃哈因为是肛交狂哈呀咿啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3193',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3194',
        any: [
          /「啊啊嗯%UNICODE\(0x2661\) \*1% 更多的顶吧！肛门乱七八糟的要坏了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3195',
        any: [
          /%SAVESTR:TARGET%自己扭着腰、粘膜紧紧的夹着小鸡鸡发出淫靡的声音	。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3196',
        any: [/「已经…真的…泥泞…更多更多的要疯了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3196-3197',
        any: [/「已经…真的…泥泞…更多更多的要疯了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3198',
        any: [
          /「呜啊啊啊…已经不行了不行了啊…腰无法停止直到高潮吧哈呀啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3199',
        any: [
          /%SAVESTR:TARGET%发出像是走投无路的声音、双臂紧紧抱住%NAME:MASTER%。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3200',
        any: [
          /「呀哈…啊啊啊！已经回不去了！%SELF_CALL\(TARGET\)%的肛门已经变成性交专用的洞了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3200-3201',
        any: [
          /「呀哈…啊啊啊！已经回不去了！%SELF_CALL\(TARGET\)%的肛门已经变成性交专用的洞了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3202',
        any: [/CFLAG:329 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3204',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3205',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3206',
        any: [
          /「啊哈…啊啊啊%UNICODE\(0x2661\) \*1% 好棒啊好棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3207',
        any: [/%SAVESTR:TARGET%贪图快乐的自己扭着腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3208',
        any: [/「更多…小鸡鸡不停的侵犯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3208-3209',
        any: [/「更多…小鸡鸡不停的侵犯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3210',
        any: [/「嗯嗯…肛门扩张的好棒啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3211',
        any: [/「脑袋里一团浆糊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3211-3212',
        any: [/「脑袋里一团浆糊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3213',
        any: [/CFLAG:329 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3215',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:329 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3216',
        any: [
          /「啊啊啊…整根都进来了…%UNICODE\(0x2661\) \*1% 肛门好奇怪的快感………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3217',
        any: [/CFLAG:329 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3219',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:329 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3220',
        any: [/「主人啊…肛门…太舒服了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3221',
        any: [/「主人的小鸡鸡插到最里面了…美妙的感觉♪更多更多的侵犯我吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3222',
        any: [/%SAVESTR:TARGET%一边流着口水一边扭腰、继续贪图着肛门的快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3223',
        any: [/CFLAG:329 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3225',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:329 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3226',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3227',
        any: [/「啊…嗯…哈…小鸡鸡侵犯…屁股小穴…好厉害的啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3228',
        any: [/「更多…更多啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3228-3229',
        any: [/「更多…更多啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3230',
        any: [/「%SELF_CALL\(TARGET\)%啊…屁股小穴要高潮了…看啊…好好的看吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3230-3231',
        any: [/「%SELF_CALL\(TARGET\)%啊…屁股小穴要高潮了…看啊…好好的看吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3232',
        any: [/CFLAG:329 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3234',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:329 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3235',
        any: [/「啊啊啊…这样的…完全没关系…主人给我更多的舒服啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3236',
        any: [/CFLAG:329 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3238',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:329 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3239',
        any: [/「啊…啊啊啊！…明明不行的…好舒服…这样的…啊啊嗯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3240',
        any: [/CFLAG:329 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3242',
        any: [/ELSEIF  CFLAG:329 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3243',
        any: [/「咕…咿…咕…快点…结束吧…呜啊啊嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3244',
        any: [/CFLAG:329 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3244-3245',
        any: [/CFLAG:329 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3244-3246',
        any: [/CFLAG:329 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3244-3247',
        any: [/CFLAG:329 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3248-3251',
        any: [/;背面座位アナル CFLAG:330/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3253',
        any: [/IF SELECTCOM == 29/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3255',
        any: [/IF CFLAG:TARGET:330 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3257',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3259',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3260',
        any: [
          /%SAVESTR:TARGET%像要炫耀给%NAME:MASTER%看一样大张着双腿、被%SAVESTR:ASSI%侵犯着肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3261',
        any: [
          /「啊%UNICODE\(0x2661\) \*1%…啊%UNICODE\(0x2661\) \*1%…啊哈嗯%UNICODE\(0x2661\) \*1%…满满的…看啊…肛门被侵/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3262',
        any: [
          /%SAVESTR:TARGET%每次被%SAVESTR:ASSI%顶到肛门的时候都会发出娇声、窥伺一样地凝视着%NAME:MASTER%的反应………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3264',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3265',
        any: [
          /「哎呀…好、好羞耻…这样的姿势…被侵犯屁股…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3266',
        any: [
          /%SAVESTR:TARGET%一边害羞、一边张开双腿间的秘处炫耀着被侵犯的肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3267',
        any: [/「不、不行了…有感觉了不行啊…啊…啊啊嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3268-3269',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3270',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:ASSI%从后面顶到肛门发出了痛苦的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3271',
        any: [/「哦啊…嘎咿…已经…停下吧…咿」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3271-3272',
        any: [/「哦啊…嘎咿…已经…停下吧…咿」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3274',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3275',
        any: [/「啊哈啊啊啊…肛门被扩张了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3276',
        any: [/「扩张的好棒啊…还要更多啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3278',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3279',
        any: [/「马上就…但是从后面…屁股小穴什么的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3280',
        any: [/「更多…好好的疼爱我吧…明明想要…啊嗯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3281-3282',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3283',
        any: [/「呜…这、这样的姿势…啊呀…那里不能扩张！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3283-3284',
        any: [/「呜…这、这样的姿势…啊呀…那里不能扩张！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3285',
        any: [/CFLAG:TARGET:330 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3285-3286',
        any: [/CFLAG:TARGET:330 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3287-3288',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3290',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3292',
        any: [/IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3293',
        any: [/「啊啊啊…融化了啦…屁股小穴都变湿了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3294',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:ASSI%就这样继续侵犯同时发出下流的悲鸣。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3295',
        any: [
          /「更多吇咕吇咕的…想要给主人展示下调教完毕的屁股小穴%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3297',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3298',
        any: [
          /%SAVESTR:TARGET%像要炫耀给%NAME:MASTER%看一样大张着双腿、被%SAVESTR:ASSI%侵犯着肛门。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3299',
        any: [
          /「啊%UNICODE\(0x2661\) \*1%…啊%UNICODE\(0x2661\) \*1%…啊哈嗯%UNICODE\(0x2661\) \*1%…满满的…看啊…肛门被侵/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3300',
        any: [
          /%SAVESTR:TARGET%每次被%SAVESTR:ASSI%顶到肛门的时候都会发出娇声、窥伺一样地凝视着%NAME:MASTER%的反应………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3302',
        any: [/ELSEIF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3303',
        any: [
          /「啊啊啊…主人大人啊…仔细的看看吧…%SELF_CALL\(TARGET\)%的”屁股小穴”看啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3304',
        any: [
          /%SAVESTR:TARGET%一副融化在快感中的表情一边张开双腿、展示着已经变成性器的肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3305',
        any: [
          /「屁股小穴呢…小鸡鸡进来吧…已经不行了那样的东西…啊…啊啊啊啊哈%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3307',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3308',
        any: [
          /「哎呀…好、好羞耻…这样的姿势…被侵犯着屁股…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3309',
        any: [
          /%SAVESTR:TARGET%一边害羞、一边张开双腿间的秘处把被%SAVESTR:ASSI%侵犯着肛门炫耀给%NAME:MASTER%看。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3310',
        any: [/「不、不行了…有感觉不行啊…啊…啊啊嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3311-3312',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3313',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:ASSI%从后面顶到肛门发出了痛苦的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3314',
        any: [/「哦啊…嘎咿…已经…停下吧…咿」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3314-3315',
        any: [/「哦啊…嘎咿…已经…停下吧…咿」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3317',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:330 <= 8 \|\| FLAG/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3318',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3319',
        any: [
          /「咿咕嗯…咿啊啊哈啊…吇咕吇咕的舒服的腰以下都要融化了一样%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3320',
        any: [
          /「啊啊嗯…好好的夹紧、夹紧哈呀…充分的侵犯吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3321',
        any: [
          /%SAVESTR:TARGET%已经完全没有了勇者的尊严、沉溺在肛门的快乐之中………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3322',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3323',
        any: [
          /%SAVESTR:TARGET%用肛门把%NAME:MASTER%的小鸡鸡整根都吸了进去同时吐出了动情的气息。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3324',
        any: [
          /「哈啊啊啊啊…如果肛门能被主人艹要我什么都可以啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3325',
        any: [
          /在肛门的刺激让%SAVESTR:TARGET%的双眼都透露出快乐的颜色。理性完全都消失了似的。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3326',
        any: [
          /「真的什么都会做…哪怕是变成野兽和怪物的玩具%UNICODE\(0x2661\) \*1%…所以啊…会拼命的听话的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3326-3327',
        any: [
          /「真的什么都会做…哪怕是变成野兽和怪物的玩具%UNICODE\(0x2661\) \*1%…所以啊…会拼命的听话的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3328',
        any: [
          /「还想要更多…%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%的这里啊…没有主人温暖的小鸡鸡不行呢%UNICODE\(0x2661/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3329',
        any: [
          /「呀哈%UNICODE\(0x2661\) \*1% 就这样用肛门套弄主人小鸡鸡%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3330',
        any: [/%SAVESTR:TARGET%一边滴答滴答的流着口水一边夹紧了肛门………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3330-3331',
        any: [/%SAVESTR:TARGET%一边滴答滴答的流着口水一边夹紧了肛门………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3332',
        any: [/CFLAG:330 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3334',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3335',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3336',
        any: [/「嗯呀啊啊啊…肛门被侵犯好幸福啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3337',
        any: [/%SAVESTR:TARGET%一副融化了一样的表情、品尝着肛门的快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3337-3338',
        any: [/%SAVESTR:TARGET%一副融化了一样的表情、品尝着肛门的快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3339',
        any: [
          /「哦呵呵%UNICODE\(0x2661\) \*1% 现在只要小鸡鸡插到最里面就可以了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3340',
        any: [
          /「%SELF_CALL\(TARGET\)%的肛门是”屁股小穴”了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3340-3341',
        any: [
          /「%SELF_CALL\(TARGET\)%的肛门是”屁股小穴”了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3342',
        any: [/CFLAG:330 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3344',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:330 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3345',
        any: [
          /「嗯呵%UNICODE\(0x2661\) \*1% 肛门张开了为了主人的小鸡鸡张开了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3346',
        any: [/CFLAG:330 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3348',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:330 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3349',
        any: [/「主人啊…啊…更多…更多的顶进来吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3350',
        any: [
          /「哈…我知道了啊…这个”屁股小穴”什么的啊…%SELF_CALL\(TARGET\)%的肛门好厉害…变成了屁股小穴♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3351',
        any: [
          /%SAVESTR:TARGET%一边流着口水、一边被%NAME:MASTER%继续侵犯着肛门………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3352',
        any: [/CFLAG:330 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3354',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:330 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3355',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3356',
        any: [/「啊…哈呜…嗯…更多…更多的顶…顶啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3357',
        any: [/%SAVESTR:TARGET%高兴的被侵犯着肛门………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3357-3358',
        any: [/%SAVESTR:TARGET%高兴的被侵犯着肛门………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3359',
        any: [/「啊…啊啊啊…屁股小穴…好喜欢啊…更多…要死了♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3360',
        any: [/%SAVESTR:TARGET%按着屁股想要更多的感受肛门的快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3360-3361',
        any: [/%SAVESTR:TARGET%按着屁股想要更多的感受肛门的快感………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3362',
        any: [/CFLAG:330 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3364',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:330 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3365',
        any: [/「呼呜…屁股…啊啊啊…张卡了…啊啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3366',
        any: [/CFLAG:330 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3368',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:330 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3369',
        any: [/「呜啊…啊…咕…屁股…有感觉了…这样的…不对的…不对的…啊啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3370',
        any: [/CFLAG:330 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3372',
        any: [/ELSEIF  CFLAG:330 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3373',
        any: [/「咕…嗯嗯…呀咿…再也…不要再往上顶了…咕嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3374',
        any: [/CFLAG:330 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3374-3375',
        any: [/CFLAG:330 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3374-3376',
        any: [/CFLAG:330 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3374-3377',
        any: [/CFLAG:330 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3378-3381',
        any: [/;手淫 CFLAG:331/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3383',
        any: [/IF SELECTCOM == 30/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3385',
        any: [/IF CFLAG:TARGET:331 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3387',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3387-3388',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3390',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3391',
        any: [
          /「唔呼呼…小鸡鸡好热…好棒啊%UNICODE\(0x2661\) \*1% 明明只是摸了一下感觉就要来了…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3392',
        any: [/「没、没关系、会认真侍奉的啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3394',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3395',
        any: [
          /「%SELF_CALL\(TARGET\)%的手…变的非常舒服了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3396',
        any: [/%SAVESTR:TARGET%恶作剧那样的笑着用手握住了小鸡鸡………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3398',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3399',
        any: [/「呜呼…这样的…温柔的套弄就好了啊…好厉害…热热的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3400',
        any: [/%SAVESTR:TARGET%陶醉着用手指捏住了小鸡鸡………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3401-3402',
        any: [/;それ以外（奉仕精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3403',
        any: [/「哇…这样的事…我才不要做呢…呀…好热…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3403-3404',
        any: [/「哇…这样的事…我才不要做呢…呀…好热…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3405',
        any: [/CFLAG:TARGET:331 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3405-3406',
        any: [/CFLAG:TARGET:331 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3407-3408',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3410',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3410-3411',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3413',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 6 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3414',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3415',
        any: [/%SAVESTR:TARGET%微笑着开始套弄%SAVESTR:PLAYER%的龟头。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3416',
        any: [/「哈…听说这样的套弄会很舒服呢哇%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3417',
        any: [/「唔呼呼…还有很多…变的舒服了呐%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3417-3418',
        any: [/「唔呼呼…还有很多…变的舒服了呐%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3419',
        any: [/「小鸡鸡硬了…握住有用了啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3420',
        any: [
          /「唔呼呼…要给你更多的摩擦…啊啊嗯逃避是不行的哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3421',
        any: [/%SAVESTR:TARGET%一边舔着嘴唇一边开始套弄小鸡鸡………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3421-3422',
        any: [/%SAVESTR:TARGET%一边舔着嘴唇一边开始套弄小鸡鸡………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3423',
        any: [/CFLAG:331 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3425',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:331 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3426',
        any: [
          /「啊…好热…好热啊…好像不情愿一样开始颤抖了…啊啊啊…好舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3427',
        any: [/CFLAG:331 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3429',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3430',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3431',
        any: [
          /「啊咿…主人啊…你的小鸡鸡%SELF_CALL\(TARGET\)%套弄的怎么样啊？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3432',
        any: [/「唔呼呼…主人的弱点、%SELF_CALL\(TARGET\)%全部了解了呐♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3432-3433',
        any: [/「唔呼呼…主人的弱点、%SELF_CALL\(TARGET\)%全部了解了呐♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3434',
        any: [/「主人的小鸡鸡…好热啊…硬起来了…好可爱的说…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3435',
        any: [/「更多咕啾咕啾的给你哦…很舒服吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3435-3436',
        any: [/「更多咕啾咕啾的给你哦…很舒服吧♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3437',
        any: [/CFLAG:331 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3439',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 3 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3440',
        any: [
          /「哈…小鸡鸡…热热的好可爱…%SELF_CALL\(TARGET\)%的手会让你更舒服的…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3441',
        any: [/CFLAG:331 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3443',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 2 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3444',
        any: [/「哈…不要…摩擦主人的小鸡鸡…变得快乐起来了…嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3445',
        any: [/CFLAG:331 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3447',
        any: [/ELSEIF CFLAG:331 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3448',
        any: [/「咕…才不会做这种事…不可能的…呀啊！不、不会碰的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3449',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3449-3450',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3449-3451',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3449-3452',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3453-3456',
        any: [/;フェラチオ CFLAG:332/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3458',
        any: [/IF SELECTCOM == 31/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3460',
        any: [/IF CFLAG:TARGET:332 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3462',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3463',
        any: [
          /%SAVESTR:ASSI%的小鸡鸡在%SAVESTR:TARGET%一副愉快的笑容中被含了进去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3464',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3465',
        any: [
          /「啊哈…侍奉你的小鸡鸡哦%UNICODE\(0x2661\) \*1% 咿…嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3466',
        any: [/%SAVESTR:TARGET%露出一脸淫猥的笑容放荡的用嘴巴含住了熊吉吉………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3467',
        any: [/「咕嗯嗯…呜啾…啾噗…啾啪…嗯哦%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3469',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3470',
        any: [/「是、是的…请让我侍奉你的小鸡鸡吧…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3471',
        any: [/%SAVESTR:TARGET%毫不犹豫的含住了小鸡鸡………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3472',
        any: [/「呜嗯…啾啪…啾…啾…啊哈…嗯哦…哈呜…嗯咕呜嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3474',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3475',
        any: [/「吸吮…请让我…咿…嗯…呼…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3476',
        any: [/%SAVESTR:TARGET%不熟练的、热心的用嘴侍奉起小鸡鸡………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3477-3478',
        any: [/;それ以外（奉仕精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3479',
        any: [/「咕…这样的…不要…明明不想做…呜咕…嗯…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3479-3480',
        any: [/「咕…这样的…不要…明明不想做…呜咕…嗯…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3481',
        any: [/CFLAG:TARGET:332 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3481-3482',
        any: [/CFLAG:TARGET:332 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3483-3484',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3486',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3487',
        any: [
          /%SAVESTR:ASSI%的小鸡鸡在%SAVESTR:TARGET%一副愉快的笑容中被含了进去。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3488',
        any: [
          /但是%NAME:MASTER%看不到%SAVESTR:TARGET%是怎样的表情、只有舌头侍奉的声音不断响起………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3490',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3491',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3492',
        any: [/「啊啊嗯…哈呜…啾啾…嗯哦…咕嗯嗯嗯嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3493',
        any: [
          /%SAVESTR:TARGET%在接到命令的一瞬间就扑向了小鸡鸡、开始进行口腔奉仕。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3494',
        any: [
          /「嗯嗯…呜啾…啾啊…嗯哦…啾啾…呼…全部射进来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3495',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3496',
        any: [
          /%SAVESTR:TARGET%张大嘴爱怜的反复吻着小鸡鸡的尖端然后把小鸡鸡整根吞了进去………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3497',
        any: [
          /「嘛啾…啾…谢谢主人让我能一直给主人的小鸡鸡舒服%UNICODE\(0x2661\) \*1% 啾啾…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3498',
        any: [
          /「啊…哈呜嗯…嗯…啾啪啾呜嗯%UNICODE\(0x2661\) \*1% 啊啊啊…我能忍住的…全射出来吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3498-3499',
        any: [
          /「啊…哈呜嗯…嗯…啾啪啾呜嗯%UNICODE\(0x2661\) \*1% 啊啊啊…我能忍住的…全射出来吧…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3500',
        any: [
          /「嗯哦…啾…嗯哦…啾%UNICODE\(0x2661\) \*1% 啊啊啊…小鸡鸡有点脏了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3501',
        any: [
          /「会让小鸡鸡重新变的漂漂亮亮的…所以啊…请让我来主导小鸡鸡吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3502',
        any: [
          /%SAVESTR:TARGET%用舌头从根部一直舔到龟头、就像是要把污秽全舔下来似得………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3502-3503',
        any: [
          /%SAVESTR:TARGET%用舌头从根部一直舔到龟头、就像是要把污秽全舔下来似得………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3504',
        any: [/CFLAG:332 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3506',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:332 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3507',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3508',
        any: [/「小鸡鸡…会很温柔的侍奉的…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3509',
        any: [
          /「啊…是的…舒服的话…就这样在我的嘴里射出来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3510',
        any: [/%SAVESTR:TARGET%陶醉的继续进行口腔侍奉………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3511',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3512',
        any: [/「哈啊…吸吮的完全停不下来…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3513',
        any: [/%SAVESTR:TARGET%一边流着眼泪一边热心的继续口腔侍奉。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3514',
        any: [/「呜嗯…嗯噗…啾…嗯哦…咕…呼%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3514-3515',
        any: [/「呜嗯…嗯噗…啾…嗯哦…咕…呼%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3516',
        any: [/「咕…噗…啾…嗯哦…咕啊…小鸡鸡…让我更多的含吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3517',
        any: [/「哈…小鸡鸡真美味…更多的让我舔舔吧…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3518',
        any: [
          /%SAVESTR:TARGET%连滴落的口水也来不及擦的继续热心的进行口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3518-3519',
        any: [
          /%SAVESTR:TARGET%连滴落的口水也来不及擦的继续热心的进行口腔侍奉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3520',
        any: [/CFLAG:332 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3522',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:332 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3523',
        any: [/「嗯…哈…啊…能吸吮主人的小鸡鸡…这样的…好开心…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3524',
        any: [/「啊啊…总觉得…真的…喜欢上小鸡鸡了…啾啪…吇咕…呼呜♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3525',
        any: [/CFLAG:332 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3527',
        any: [/ELSEIF CFLAG:332 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3528',
        any: [/「哈…哈…嗯…嗯…更多…不含不行…？嗯…呜嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3529',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3529-3530',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3529-3531',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3529-3532',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3533-3536',
        any: [/;パイズリ CFLAG:333/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3538',
        any: [/IF SELECTCOM == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3540',
        any: [/IF CFLAG:TARGET:333 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3542',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3542-3543',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3545',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3546',
        any: [
          /「乳房这样…夹住………啊啊啊、变的好可爱的说%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3548',
        any: [/「啊哈…所以大乳房…好舒服啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3549',
        any: [/「嗯呼…舒服吗？小鸡鸡舒服吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3551',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3552',
        any: [/「啊哈…侍奉你的小鸡鸡…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3554',
        any: [/「嗯…%SELF_CALL\(TARGET\)%的乳房…这么大一定很舒服吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3555',
        any: [/「哈…乳房都被烫伤了呢…被火热的小鸡鸡…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3557',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3558',
        any: [/「%SELF_CALL\(TARGET\)%引以为傲的乳房、摩擦你的小鸡鸡…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3559',
        any: [/「嗯…啊哈…啊…总觉得…变的奇怪了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3560-3561',
        any: [/;それ以外（奉仕精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3562',
        any: [/「呜哇…咿…啊…小鸡鸡…好热…乳房啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3562-3563',
        any: [/「呜哇…咿…啊…小鸡鸡…好热…乳房啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3564',
        any: [/CFLAG:TARGET:333 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3564-3565',
        any: [/CFLAG:TARGET:333 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3566-3567',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3569',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3569-3570',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3572',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 6 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3573',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3574',
        any: [/「啊啊啊…热热的小鸡鸡…乳房被侵犯了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3575',
        any: [/%SAVESTR:TARGET%的两个乳房温柔的夹住小鸡鸡、继续爱抚………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3577',
        any: [
          /「啊哈…更多的侵犯吧…%SELF_CALL\(TARGET\)%的大乳房就是为了被侵犯而存在的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3578',
        any: [
          /「啊啊啊…好高兴…小鸡鸡在%SELF_CALL\(TARGET\)%的乳房里闹腾%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3578-3579',
        any: [
          /「啊啊啊…好高兴…小鸡鸡在%SELF_CALL\(TARGET\)%的乳房里闹腾%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3580',
        any: [/「呀呼…乳房好舒服啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3581',
        any: [
          /%SAVESTR:TARGET%的眼神慢慢的融化了、温柔的抬起两个乳房开始摩擦小鸡鸡………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3583',
        any: [/「%SELF_CALL\(TARGET\)%的大乳房…是为了侍奉小鸡鸡而存在的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3584',
        any: [/「啊啊啊…侍奉好舒服啊…脑袋里都融化了…%UNICODE\(0x2661\) \*3%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3584-3585',
        any: [/「啊啊啊…侍奉好舒服啊…脑袋里都融化了…%UNICODE\(0x2661\) \*3%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3586',
        any: [/CFLAG:333 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3588',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3589',
        any: [/「啊啊啊…乳房侍奉好棒啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3591',
        any: [/「啊哈…乳房把小鸡鸡整个夹住了…怎么样啊…舒服吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3592',
        any: [
          /「嗯啊啊啊啊…乳房上全是小鸡鸡的味道…好幸福…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3593',
        any: [/CFLAG:333 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3595',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:333 <= 3 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3596',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3597',
        any: [
          /「哈…这样就让小鸡鸡开始颤抖了…%SELF_CALL\(TARGET\)%的乳房感觉很满足啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3599',
        any: [/「小鸡鸡被乳房夹的看不见了…啊哈%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3600',
        any: [/「唔呼呼、这么舒服啊…会让你更多更多的舒服的♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3600-3601',
        any: [/「唔呼呼、这么舒服啊…会让你更多更多的舒服的♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3602',
        any: [/「%SELF_CALL\(TARGET\)%的乳房…这样为你的小鸡鸡侍奉………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3604',
        any: [
          /「这样的大乳房…一直都认为是碍事啊…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3605',
        any: [
          /「是的…非常幸福…你的小鸡鸡大人…%SELF_CALL\(TARGET\)%的乳房会侍奉的更舒服的♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3605-3606',
        any: [
          /「是的…非常幸福…你的小鸡鸡大人…%SELF_CALL\(TARGET\)%的乳房会侍奉的更舒服的♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3607',
        any: [/CFLAG:333 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3609',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:333 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3610',
        any: [/「啊嗯…%SELF_CALL\(TARGET\)%的乳房里…小鸡鸡在闹腾♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3611',
        any: [/「这样闹腾的话…不行了…呀…啊、啊啊嗯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3612',
        any: [/CFLAG:333 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3614',
        any: [/ELSEIF  CFLAG:333 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3615',
        any: [/「呜啊…啊啊啊…你、你这个变态………咕」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3616',
        any: [/CFLAG:333 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3616-3617',
        any: [/CFLAG:333 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3616-3618',
        any: [/CFLAG:333 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3616-3619',
        any: [/CFLAG:333 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3620-3623',
        any: [/;素股 CFLAG:334/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3625',
        any: [/IF SELECTCOM == 33/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3627',
        any: [/IF CFLAG:TARGET:334 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3629',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3629-3630',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3632',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3633',
        any: [
          /「啊啊啊…小鸡鸡好热啊%UNICODE\(0x2661\) \*1%…嗯已经…小穴好想要啊………！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3635',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3636',
        any: [/「呜噗…啊啊啊…总觉得这…不可思议的感觉…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3637',
        any: [/「啊啊啊…小鸡鸡…被这样也会舒服啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3638-3639',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3640',
        any: [/「没、没关系这样的…马上就舒服了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3640-3641',
        any: [/「没、没关系这样的…马上就舒服了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3642',
        any: [/CFLAG:TARGET:334 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3642-3643',
        any: [/CFLAG:TARGET:334 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3644-3645',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3647',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3647-3648',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3650',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 5 \|\| FLAG:/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3651',
        any: [
          /「好坏啊好坏啊…%SELF_CALL\(TARGET\)%明明想早点用小穴来侍奉的！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3652',
        any: [
          /「啊啊啊…主人啊…比起这样在小穴门口摩擦…插进小穴里面一定会更舒服吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3653',
        any: [
          /「咕嗯%UNICODE\(0x2661\) \*1%…啊啊、会认真的侍奉…快点…快点…破了我的处女膜吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3654',
        any: [/CFLAG:334 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3656',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:334 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3657',
        any: [
          /「啊啊啊啊啊…会认真的让你舒服…所以啊…请赏赐给我吧…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3658',
        any: [/「哈呜…好想要继续啊…啊啊啊啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3659',
        any: [/CFLAG:334 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3661',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && TALENT:TARGET:0 == 1 && \(CFLAG:334 <= 3 \|\| FLAG:/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3662',
        any: [
          /「呜啊…啊啊啊啊啊…主人啊…都到了这里、明明知道…小鸡鸡…还不插进来吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3663',
        any: [/「啊啊啊…所这样下去…可能会误插进来的…咿嗯♪…说不定…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3664',
        any: [/CFLAG:334 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3666',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:334 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3667',
        any: [/「啊啊啊…小鸡鸡…感觉好烫啊…咿嗯…啊啊…还没插进来…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3668',
        any: [/「主人啊…求你了…大人…好热…好像要！啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3669',
        any: [/CFLAG:334 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3671',
        any: [/ELSEIF CFLAG:334 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3672',
        any: [/「咕…嗯…啊啊啊…小鸡鸡好烫…好烫啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3673',
        any: [/CFLAG:334 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3673-3674',
        any: [/CFLAG:334 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3673-3675',
        any: [/CFLAG:334 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3673-3676',
        any: [/CFLAG:334 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3677-3680',
        any: [/;騎乗位 CFLAG:335/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3682',
        any: [/IF SELECTCOM == 34/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3683',
        any: [/IF CFLAG:TARGET:335 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3685',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3687',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3689',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3690',
        any: [
          /%NAME:MASTER%命令%SAVESTR:TARGET%就这样跨坐在%SAVESTR:ASSI%上面。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3691',
        any: [
          /「唔呼呼、请多多指教%SAVESTR:ASSI%小姐%UNICODE\(0x2661\) \*1% 请细细品尝%SELF_CALL\(TARGET\)%的处女吧♪」%SA/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3692',
        any: [
          /%SAVESTR:ASSI%对这样的态度苦笑着、%SAVESTR:TARGET%的腰慢慢的向着小鸡鸡坐了下来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3693',
        any: [/「啊…啊啊啊…插进来了…哇…呼啊…啊啊啊啊啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3695',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3696',
        any: [
          /「啊啊嗯%UNICODE\(0x2661\) \*1%…”献上处女”什么的…现在的最高命令啊………♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3697',
        any: [/%SAVESTR:TARGET%慢慢的抓住小鸡鸡引向自己的小穴。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3698',
        any: [
          /「啊…请仔细的看吧…%SELF_CALL\(TARGET\)%的魔族小穴啊…马上要变成主人的东西了………呜嗯！！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3699',
        any: [/一边忍受着破处的痛苦%SAVESTR:TARGET%一边把小鸡鸡整根吞了进去。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3700',
        any: [/「啊哈…啊啊咿…好厉害…还想要更多的………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3701',
        any: [
          /「这样下去啊…继续侍奉小鸡鸡…啊啊啊…充分的标志着新品的小穴%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3702-3703',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3704',
        any: [
          /「啊啊啊…好羞耻啊…%SELF_CALL\(TARGET\)%的处女膜到此为止被破坏了…请看啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3705',
        any: [/%SAVESTR:TARGET%露出淫猥的笑容把小鸡鸡导向了自己的小穴。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3706',
        any: [/「唔呼呼…从这里开始…这是我的第一次%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3707',
        any: [/「啊啊啊…充分的品味…咕…呼…啊啊啊咿啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3708',
        any: [/%SAVESTR:TARGET%破处那难以忍受的痛苦大叫起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3709',
        any: [
          /「哇…哈哈…来、来吧…就这样开始小穴侍奉吧…好满足…好舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3709-3710',
        any: [
          /「哇…哈哈…来、来吧…就这样开始小穴侍奉吧…好满足…好舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3712',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3714',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3715',
        any: [
          /%NAME:MASTER%命令%SAVESTR:TARGET%就这样跨坐在%SAVESTR:ASSI%的腰上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3716',
        any: [/「啊…啊啊啊…但是…果、果然………呀嗯嗯！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3717',
        any: [
          /%NAME:MASTER%抓住%SAVESTR:TARGET%的腰立起来让%SAVESTR:ASSI%的小鸡鸡强行插入。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3718',
        any: [/「嗯…啊…啊啊啊…%SELF_CALL\(TARGET\)%的…第一次…嗯……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3720',
        any: [/ELSEIF TALENT:TARGET:314 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3721',
        any: [/「身体变成这样后…不知道登了多久………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3722',
        any: [/「啊啊啊…太好了…自己献出贞操什么的%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3723',
        any: [/%SAVESTR:TARGET%高兴的笑着、把小鸡鸡引向了小穴。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3724',
        any: [
          /「哇…嗯嗯…啊…哈啊嗯！ 啊啊啊…啊啊啊…厉害…小鸡鸡好烫啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3725',
        any: [/「主人的小鸡鸡好烫啊…啊哈啊…感受到了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3726',
        any: [/配合着%SAVESTR:TARGET%兴奋的心情、展开了翅膀………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3727-3728',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3729',
        any: [
          /「唔呼呼…这样的日子终于来了…%SELF_CALL\(TARGET\)%、太感激了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3730',
        any: [/「啊啊啊…没关系…主人…请开始动吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3731',
        any: [/%SAVESTR:TARGET%提心吊胆的用手把小鸡鸡引向了小穴。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3732',
        any: [/「咕…哇…咿、啊啊！主人的…到最里面了…全部…插进来了哈呀咿…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3733',
        any: [/%SAVESTR:TARGET%的小穴里被%NAME:MASTER%的小鸡鸡弄的快要哭了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3734',
        any: [
          /「哎嘿嘿…这样%SELF_CALL\(TARGET\)%就送给主人了、以后%SELF_CALL\(TARGET\)%的生命就只剩下主人了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3735',
        any: [
          /%SAVESTR:TARGET%害羞的笑着、忍受着破处的痛苦慢慢的开始扭腰了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3735-3736',
        any: [
          /%SAVESTR:TARGET%害羞的笑着、忍受着破处的痛苦慢慢的开始扭腰了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3737-3738',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3740',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3741',
        any: [
          /如%NAME:MASTER%命令的那样%SAVESTR:TARGET%跨坐在了%SAVESTR:ASSI%的腰上。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3742',
        any: [/「求、求你了…饶了我…饶了我…这样的…不行、总觉得不行啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3743',
        any: [
          /%SAVESTR:ASSI%嘲笑着抓住了%SAVESTR:TARGET%的腰、强行把小鸡鸡插进了小穴的最里面。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3744',
        any: [/「啊啊啊！啊！这样讨厌啊！啊啊啊！…痛…好痛啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3744-3745',
        any: [/「啊啊啊！啊！这样讨厌啊！啊啊啊！…痛…好痛啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3746',
        any: [/「不、不要这样…这样的…呜…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3747',
        any: [
          /%SAVESTR:PLAYER%抓住%SAVESTR:TARGET%的腰强行把小鸡鸡插进了最里面。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3748',
        any: [/「啊啊啊！啊！这样讨厌啊！啊啊啊！…痛…好痛啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3750',
        any: [/IF TALENT:TARGET:317 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3751',
        any: [/「哈哈…这样…如果是坐在那家伙上面的话就好了…呜呜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3752',
        any: [/%SAVESTR:TARGET%想起了故乡的恋人不禁流下了眼泪……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3752-3753',
        any: [/%SAVESTR:TARGET%想起了故乡的恋人不禁流下了眼泪……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3752-3754',
        any: [/%SAVESTR:TARGET%想起了故乡的恋人不禁流下了眼泪……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3755-3756',
        any: [/;非処女/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3756-3757',
        any: [/;非処女/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3759',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3761',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3762',
        any: [
          /「啊啊嗯%UNICODE\(0x2661\) \*1%…哈…全部插进来了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3763',
        any: [/%SAVESTR:TARGET%扑哧一声笑了、一副舒服的样子慢慢的扭起腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3764',
        any: [
          /「满满、满满的享受吧…为了不让主人看的无聊…%UNICODE\(0x2661\) \*1% 啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3765',
        any: [/%SAVESTR:TARGET%高兴的在%SAVESTR:ASSI%的腰上扭动………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3767',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3768',
        any: [/「主人的…命令…咿…哇…呜嗯………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3769',
        any: [
          /%SAVESTR:TARGET%横跨在%SAVESTR:ASSI%上面一边犹豫不决的用小穴最里面接受了小鸡鸡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3770',
        any: [
          /「哈…哈…啊啊…啊啊啊…有感觉了…明明不行的…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3771',
        any: [/%SAVESTR:TARGET%困惑着在秘处的快乐下发出了声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3772-3773',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3774',
        any: [/%NAME:MASTER%命令%SAVESTR:TARGET%跨坐在%SAVESTR:ASSI%的腰上。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3775',
        any: [/「这样的…讨厌…但是…哇…嗯…咿呜嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3776',
        any: [
          /%SAVESTR:TARGET%羞耻的红着脸让%SAVESTR:ASSI%的小鸡鸡插进了小穴的最里面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3776-3777',
        any: [
          /%SAVESTR:TARGET%羞耻的红着脸让%SAVESTR:ASSI%的小鸡鸡插进了小穴的最里面………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3779',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3780',
        any: [
          /「哈…这样跨坐着…真是卑猥但是又很美妙啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3781',
        any: [/「充分的侍奉小鸡鸡、好舒服哦♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3783',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3784',
        any: [
          /「啊啊…跨坐在主人主人…啊啊啊…不、不行了…那样的地方不要看…求你了…」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3785',
        any: [/「嗯…啊啊啊…深点…主人的…感觉…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3786-3787',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3788',
        any: [/「咕…啊啊啊…插进最里面了…好痛苦啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3788-3789',
        any: [/「咕…啊啊啊…插进最里面了…好痛苦啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3790-3791',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3791',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3791-3792',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3793-3794',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3796',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3798',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3799',
        any: [
          /「啊啊嗯%UNICODE\(0x2661\) \*1%…哈…全部插进来了啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3800',
        any: [/%SAVESTR:TARGET%扑哧一声笑了、一副舒服的样子慢慢的扭起腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3801',
        any: [
          /「满满、满满的享受吧…为了不让主人看的无聊…%UNICODE\(0x2661\) \*1% 啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3802',
        any: [/%SAVESTR:TARGET%高兴的在%SAVESTR:ASSI%的腰上扭动………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3804',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3805',
        any: [/「主人的…命令…咿…哇…呜嗯………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3806',
        any: [
          /%SAVESTR:TARGET%横跨在%SAVESTR:ASSI%上面一边犹豫不决的用小穴最里面接受了小鸡鸡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3807',
        any: [
          /「哈…哈…啊啊…啊啊啊…有感觉了…明明不行的…啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3808',
        any: [/%SAVESTR:TARGET%困惑着在秘处的快乐下发出了声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3809-3810',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3811',
        any: [/「这样的…讨厌…但是…哇…嗯…咿呜嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3812',
        any: [
          /%SAVESTR:TARGET%羞耻的红着脸在%SAVESTR:ASSI%的腰上上下的扭动………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3812-3813',
        any: [
          /%SAVESTR:TARGET%羞耻的红着脸在%SAVESTR:ASSI%的腰上上下的扭动………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3815',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3816',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3817',
        any: [/%SAVESTR:TARGET%深深的叹息、淫荡的脸向着%SAVESTR:PLAYER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3818',
        any: [/「这样连着的话…侍奉着有种幸福的感觉啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3819',
        any: [
          /「所以啊…全部…全部交给%SELF_CALL\(TARGET\)%吧%UNICODE\(0x2661\) \*1% 啊啊啊啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3820',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3821',
        any: [
          /「呀嗯…好舒服…好棒%UNICODE\(0x2661\) \*1% 这样主人的小鸡鸡也可以舒服了吧………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3822',
        any: [/%SAVESTR:TARGET%扑哧一笑在腰上淫乱的扭动。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3823',
        any: [
          /「更多更多…小穴好舒服…脑袋里满满的全是小鸡鸡%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3824',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3825',
        any: [
          /「呀啊嗯…不要动了…如果再顶的话咿啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3826',
        any: [
          /「哦呼…哦…子宮口咕叽咕叽的不行了%UNICODE\(0x2661\) \*1% 子宮感觉太强啦…啊呀啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3827',
        any: [
          /%SAVESTR:TARGET%配合着%SAVESTR:PLAYER%小鸡鸡的撞击发出淫靡的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3827-3828',
        any: [
          /%SAVESTR:TARGET%配合着%SAVESTR:PLAYER%小鸡鸡的撞击发出淫靡的呻吟………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3829',
        any: [
          /「啊啊啊啊…啊…呼%UNICODE\(0x2661\) \*1% 吇咕吇咕好棒哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3830',
        any: [/%SAVESTR:TARGET%前后扭着腰、充分品味着小鸡鸡带来的快乐。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3831',
        any: [/「不想离开这里了%UNICODE\(0x2661\) \*1% 啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3831-3832',
        any: [/「不想离开这里了%UNICODE\(0x2661\) \*1% 啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3833',
        any: [/CFLAG:335 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3835',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:335 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3836',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3837',
        any: [/「啊啊啊…主人啊…好喜欢啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3838',
        any: [/「主人的小鸡鸡…好舒服啊呀…啊啊嗯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3839',
        any: [/%SAVESTR:TARGET%撒娇似得前后扭动着腰……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3840',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3841',
        any: [/「啊…啊啊啊啊…怎么样啊…这样扭腰？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3842',
        any: [/「主人有感觉了…学到了呢…呀嗯嗯♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3843',
        any: [/%SAVESTR:TARGET%淫猥的扭着腰、发出了可爱的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3844',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3845',
        any: [/「呀嗯！主人不要动…啊嗯啊啊啊～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3846',
        any: [/「不行不行了！%SELF_CALL\(TARGET\)%的方法好舒服！呀嗯嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3847',
        any: [/%SAVESTR:TARGET%配合着小鸡鸡的撞击发出淫靡的呻吟………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3847-3848',
        any: [/%SAVESTR:TARGET%配合着小鸡鸡的撞击发出淫靡的呻吟………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3849',
        any: [/「呼啊嗯…像这样主人的小鸡鸡…插到里面…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3850',
        any: [/「非常幸福的感觉…呀嗯、不行了…还要更大的动作啊…啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3850-3851',
        any: [/「非常幸福的感觉…呀嗯、不行了…还要更大的动作啊…啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3852',
        any: [/CFLAG:335 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3854',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:335 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3855',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3856',
        any: [/「咕…啊啊啊…自己放进去…高兴着什么啊…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3857',
        any: [/「哈呜…不行了…腰擅自动作不行啊…啊啊啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3858',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3859',
        any: [/「啊啊啊啊…啊…小穴…好舒服…小穴太舒服了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3860',
        any: [/「随便…腰…动吧…小穴不行了呜呜呜♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3861',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3862',
        any: [/「咕啊…哈…不要…再插进来了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3863',
        any: [/%SAVESTR:PLAYER%指出了是%SAVESTR:TARGET%自己动的………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3864',
        any: [
          /「哎…咿、不要…嘘…不一样的…%SELF_CALL\(TARGET\)%是不会动的…啊啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3864-3865',
        any: [
          /「哎…咿、不要…嘘…不一样的…%SELF_CALL\(TARGET\)%是不会动的…啊啊～！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3866',
        any: [/「被命令…明明只是动动而已…好舒服呐…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3866-3867',
        any: [/「被命令…明明只是动动而已…好舒服呐…啊啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3868',
        any: [/CFLAG:335 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3870',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3871',
        any: [/「这样…做…动了就行了吧…呼啊啊！啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3872',
        any: [/CFLAG:335 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3874',
        any: [/ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3875',
        any: [/「啊啊啊…好…好难受啊…嗯…嗯…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3876',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3876-3877',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3876-3878',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3876-3879',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3880-3883',
        any: [/;泡踊り CFLAG:336/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3885',
        any: [/IF SELECTCOM == 35/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3887',
        any: [/IF CFLAG:TARGET:336 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3889',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3889-3890',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3892',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3893',
        any: [/「啊…哈…哈…不、不要动…嗯…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3894',
        any: [/「好好的…开始洗吧…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3895-3896',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3897',
        any: [/「知、知道啦…%SELF_CALL\(TARGET\)%的全身…都会认真清洗的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3898',
        any: [/「呜、呜哇…好厉害啊都湿了…这样的事还是第一次…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3898-3899',
        any: [/「呜、呜哇…好厉害啊都湿了…这样的事还是第一次…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3900',
        any: [/CFLAG:TARGET:336 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3900-3901',
        any: [/CFLAG:TARGET:336 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3902-3903',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3905',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3905-3906',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3908',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 4 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3909',
        any: [
          /「啊啊嗯…充分的清洗干净…唔呼呼…”脏脏的”地方…请起来%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3910',
        any: [
          /「啊啊啊…你看你看…不能逃避哦…嗯啊啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3911',
        any: [/CFLAG:336 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3913',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:336 <= 3 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3914',
        any: [/「哈…主人啊…还有痒的地方吗～？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3915',
        any: [/「唔呼呼…总觉得我这里也变的怪怪的了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3916',
        any: [/CFLAG:336 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3918',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:336 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3919',
        any: [/「怎、怎么办？稍微好点了吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3920',
        any: [/CFLAG:336 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3922',
        any: [/ELSEIF  CFLAG:336 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3923',
        any: [/「呜哇…总觉得…泡沫热气腾腾的很厉害、呛到了啦…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3924',
        any: [/CFLAG:336 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3924-3925',
        any: [/CFLAG:336 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3924-3926',
        any: [/CFLAG:336 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3924-3927',
        any: [/CFLAG:336 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3928-3931',
        any: [/;騎乗位アナル CFLAG:337/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3933',
        any: [/IF SELECTCOM == 36/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3935',
        any: [/IF CFLAG:TARGET:337 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3937',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3939',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3940',
        any: [/「啊啊啊…肛门被小鸡鸡刺穿了啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3941',
        any: [/%SAVESTR:TARGET%跨坐在%SAVESTR:ASSI%上面、笨拙的扭着腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3942',
        any: [
          /「%SELF_CALL\(TARGET\)%的淫乱肛门更多的玩弄吧%UNICODE\(0x2661\) \*1%…嘎吱嘎吱的抽插吧…%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3943',
        any: [/%SAVESTR:TARGET%一副淫靡的表情贪图着肛门的快乐………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3945',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3946',
        any: [
          /「感受到了…明明是不行的…咿…啊啊啊啊%UNICODE\(0x2661\) \*1% 不要看那里啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3947',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:ASSI%侵犯着肛门、撞到的时候发出甜美的声音。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3948',
        any: [
          /「是、是的…肛门…感受到了啊%UNICODE\(0x2661\) \*1% …啊啊啊…好羞耻………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3949',
        any: [
          /被%NAME:MASTER%看到的缘故被%SAVESTR:TARGET%羞耻心刺激的更加敏感了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3950-3951',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3952',
        any: [/「这、这样的…讨厌…讨厌的…咿…讨厌啊…不要看啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3953',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%顶到肛门的时候发出了悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3953-3954',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%顶到肛门的时候发出了悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3956',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3957',
        any: [/「嘎哈…嗯啊嗯…小鸡鸡…全部吸进去了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3958',
        any: [/「呜呼…所以啊不要动了…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3960',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3961',
        any: [/「啊嗯…都、都进来了…啊嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3962',
        any: [/「不行了…第一次%SELF_CALL\(TARGET\)%交给我吧…啊♪啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3963-3964',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3965',
        any: [/「这…这样…进到最里面了…咕…撑开了………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3965-3966',
        any: [/「这…这样…进到最里面了…咕…撑开了………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3967',
        any: [/CFLAG:TARGET:337 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3967-3968',
        any: [/CFLAG:TARGET:337 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3969-3970',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3972',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3974',
        any: [/IF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3975',
        any: [
          /「啊啊%UNICODE\(0x2661\) \*1%…啊哈%UNICODE\(0x2661\) \*1%…屁股小穴被小鸡鸡刺穿了%UNICODE\(0x2661\) \*1% 已/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3976',
        any: [
          /「主人啊…请看啊…%SELF_CALL\(TARGET\)%的屁股小穴变成了婴儿般的淫穴了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3977',
        any: [
          /%SAVESTR:TARGET%发出了格外高的声音、在%SAVESTR:ASSI%的腰上淫乱的舞蹈。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3978',
        any: [
          /「咿%UNICODE\(0x2661\) \*1%咿%UNICODE\(0x2661\) \*1%咿啊啊%UNICODE\(0x2661\) \*1%…已…已经…有屁股小穴就够了/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3980',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3981',
        any: [/「啊啊啊…肛门被小鸡鸡刺穿了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3982',
        any: [/%SAVESTR:TARGET%跨坐在%SAVESTR:ASSI%上、把小鸡鸡整根吞下了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3983',
        any: [
          /「%SELF_CALL\(TARGET\)%的淫乱肛门更多的玩弄吧%UNICODE\(0x2661\) \*1%…嘎吱嘎吱的抽插吧…%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3984',
        any: [/%SAVESTR:TARGET%一副淫靡的表情贪图着肛门的快乐………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3986',
        any: [/ELSEIF TALENT:TARGET:77 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3987',
        any: [
          /「啊啊啊…%UNICODE\(0x2661\) \*1% 肛门插到最里面了…咿嗯%UNICODE\(0x2661\) \*1% 啊啊啊%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3988',
        any: [
          /%SAVESTR:TARGET%感动至极的样子全身颤抖、开始在%SAVESTR:ASSI%上面扭腰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3989',
        any: [
          /「咿啊啊啊…屁股小穴…屁股小穴好棒啊…被小鸡鸡侵犯了…好棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3990',
        any: [
          /%SAVESTR:TARGET%发出那样的娇声被%SAVESTR:ASSI%用腰顶的提高了声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3992',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3993',
        any: [
          /「感受到了…明明是不行的…咿…啊啊啊啊%UNICODE\(0x2661\) \*1% 不要看那里啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3994',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:ASSI%侵犯着肛门、每次被顶都会发出甜美的呻吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3995',
        any: [
          /「是、是的…肛门…感受到了%UNICODE\(0x2661\) \*1% …啊啊啊…好羞耻………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3996',
        any: [
          /被%NAME:MASTER%看到的缘故被%SAVESTR:TARGET%羞耻心刺激的更加敏感了………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3997-3998',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '3999',
        any: [/「这、这样的…讨厌…讨厌啊…咿…讨厌啊…不要看啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4000',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%顶到肛门的时候发出了悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4000-4001',
        any: [/%SAVESTR:TARGET%被%SAVESTR:ASSI%顶到肛门的时候发出了悲鸣………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4003',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && TALENT:TARGET:77 == 1 && \(CFLAG:337 <= 7 \|\| FLAG/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4004',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4005',
        any: [
          /「啊啊嗯…小鸡鸡全部吞进去了啊…咿、呀嗯嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4006',
        any: [
          /「唔呼呼…这样咕叽咕叽的…小鸡鸡在直腸隔着子宫咕叽咕叽的…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4007',
        any: [
          /「啊啊啊…这样的话啊…已经…湿了…脑袋里全都融化了%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4008',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4009',
        any: [
          /「啊哈…咿…啊啊啊%UNICODE\(0x2661\) \*1% 咿…咿啊啊啊呀啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4010',
        any: [/%SAVESTR:TARGET%卑猥的扭着腰舞动起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4011',
        any: [/「啊嗯♪…不、不要动了…%SELF_CALL\(TARGET\)%…全部…全部都…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4012',
        any: [
          /「好舒服啊%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%的”屁股小穴”全部要去了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4012-4013',
        any: [
          /「好舒服啊%UNICODE\(0x2661\) \*1% %SELF_CALL\(TARGET\)%的”屁股小穴”全部要去了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4014',
        any: [
          /「咕啾嗯%UNICODE\(0x2661\) \*1% 肛门献出来了%UNICODE\(0x2661\) \*1% 献给小鸡鸡了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4015',
        any: [/%SAVESTR:TARGET%一边发出粗重的呼吸一边淫猥的上下扭着腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4016',
        any: [
          /「哦哦…”屁股小穴”好棒啊%UNICODE\(0x2661\) \*1% 婴儿一样的屁股小穴…好好的品味吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4016-4017',
        any: [
          /「哦哦…”屁股小穴”好棒啊%UNICODE\(0x2661\) \*1% 婴儿一样的屁股小穴…好好的品味吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4018',
        any: [/CFLAG:337 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4020',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4021',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4022',
        any: [
          /「咿嗯啊啊啊啊…腰停不下来…不愿停下了啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4023',
        any: [/「不行了不行了…明明要认真侍奉的%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4024',
        any: [/%SAVESTR:TARGET%有点不知所措的陶醉在那样的快乐里………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4024-4025',
        any: [/%SAVESTR:TARGET%有点不知所措的陶醉在那样的快乐里………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4026',
        any: [/「啊啊嗯…太舒服了…腰动不了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4027',
        any: [/「呀啊嗯…顶到了…呀嗯…侍奉不了了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4028',
        any: [
          /「已经…我真的很淘气啊…啊咿啊啊啊…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4028-4029',
        any: [
          /「已经…我真的很淘气啊…啊咿啊啊啊…啊啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4030',
        any: [/CFLAG:337 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4032',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:337 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4033',
        any: [
          /「啊啊啊…嗯啊嗯%UNICODE\(0x2661\) \*1% 要开始认真的肛门侍奉了…真的不要动了啦」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4034',
        any: [/CFLAG:337 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4036',
        any: [
          /ELSEIF TALENT:TARGET:77 == 1 && \(CFLAG:337 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4037',
        any: [/「呼啊…肛门…好舒服！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4038',
        any: [/「嗯！主人不要动了…全部全部%SELF_CALL\(TARGET\)%会！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4039',
        any: [/%SAVESTR:TARGET%流着口水、母兽一样的扭着腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4040',
        any: [/「咿嗯咿嗯…”屁股小穴”好舒服！啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4041',
        any: [/CFLAG:337 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4043',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:337 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4044',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4045',
        any: [/「好厉害…主人的小鸡鸡…插到最里面了…屁股小穴…撑开了♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4046',
        any: [/%SAVESTR:TARGET%很舒服的样子扭着腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4046-4047',
        any: [/%SAVESTR:TARGET%很舒服的样子扭着腰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4048',
        any: [/「好好的…自己动起来了啊…啊嗯…屁股小穴…舒服啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4049',
        any: [/%SAVESTR:TARGET%一副陶醉的表情沉浸在快感里………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4049-4050',
        any: [/%SAVESTR:TARGET%一副陶醉的表情沉浸在快感里………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4051',
        any: [/CFLAG:337 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4053',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:337 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4054',
        any: [/「呼啊啊…屁股…撑开了…啊嗯…嗯…主人啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4055',
        any: [/CFLAG:337 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4057',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:337 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4058',
        any: [/「呼啊啊啊…啊…撑的太开了……厉害……好舒服…啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4059',
        any: [/CFLAG:337 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4061',
        any: [/ELSEIF  CFLAG:337 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4062',
        any: [/「好、好痛苦…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4063',
        any: [/CFLAG:337 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4063-4064',
        any: [/CFLAG:337 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4063-4065',
        any: [/CFLAG:337 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4063-4066',
        any: [/CFLAG:337 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4067-4070',
        any: [/;アナル奉仕 CFLAG:338/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4072',
        any: [/IF SELECTCOM == 37/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4074',
        any: [/IF CFLAG:TARGET:338 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4076',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4077',
        any: [/「呜嗯…真、真是可惜……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4079',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4080',
        any: [/「哈咿…嗯…嗯…哈…%SELF_CALL\(TARGET\)%舔屁股小穴什么的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4081',
        any: [/「啊啊…但是…舔的停不下来…嗯…啾…啾」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4082-4083',
        any: [/;それ以外（奉仕精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4084',
        any: [/「啊啊啊…%SELF_CALL\(TARGET\)%在这种地方舔什么的…嗯…呼…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4084-4085',
        any: [/「啊啊啊…%SELF_CALL\(TARGET\)%在这种地方舔什么的…嗯…呼…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4086',
        any: [/CFLAG:TARGET:338 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4086-4087',
        any: [/CFLAG:TARGET:338 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4088-4089',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4091',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4092',
        any: [/「啊咕…嗯…啊…饶、饶了我………嗯嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4094',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4095',
        any: [
          /「啊哈%UNICODE\(0x2661\) \*1% 很美味啊…主人的肛门好美味啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4096',
        any: [
          /「嗯呼…直到舔完每一根的褶皱为止…好漂亮的条纹啊%UNICODE\(0x2661\) \*1% 啊啊啊…肛门唏咕唏咕的…舒服吗？」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4097',
        any: [/「好高兴啊…啊啊啊…啾啪啾啪更多的条纹%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4098',
        any: [/CFLAG:338 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4100',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 3 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4101',
        any: [/「嗯…嘛啾…咕噜…哈啊…更多的舔啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4102',
        any: [/「啊啊嗯…更舒服的…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4103',
        any: [/%SAVESTR:TARGET%把舌头伸进了肛门的最里面………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4104',
        any: [/CFLAG:338 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4106',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:338 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4107',
        any: [/「嗯…嘛啾…咕噜…噶啊…真是讨厌啊…侍奉停不下来啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4108',
        any: [/CFLAG:338 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4110',
        any: [/ELSEIF CFLAG:338 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4111',
        any: [/「呜呼…嗯…嘛啾…呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4112',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4112-4113',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4112-4114',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4112-4115',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4116-4119',
        any: [/;スパンキング CFLAG:341/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4121',
        any: [/IF SELECTCOM == 40/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4123',
        any: [/IF CFLAG:TARGET:341 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4124',
        any: [/「呀呜！？　不要打了啦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4125',
        any: [/CFLAG:TARGET:341 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4125-4126',
        any: [/CFLAG:TARGET:341 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4127-4128',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4130',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4130-4131',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4133',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:341 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4134',
        any: [/「哈嗯！ 被打着…直到小穴都发热了呢…啊啊啊啊咿啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4135',
        any: [/%SAVESTR:TARGET%每次屁股被打都会发出呻吟………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4136',
        any: [/CFLAG:TARGET:341 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4138',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:341 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4139',
        any: [/「啊嗯…呀嗯…啊啊…主人啊…更多打我的屁股吧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4140',
        any: [/「更多的…惩罚我吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4141',
        any: [/%SAVESTR:TARGET%左右扭动着红肿的屁股诱惑着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4142',
        any: [/CFLAG:TARGET:341 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4142-4143',
        any: [/CFLAG:TARGET:341 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4145',
        any: [
          /ELSEIF MARK:0 == 3 && MARK:2 == 3 && \(CFLAG:341 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4146',
        any: [/「咕嗯…啊嗯…呀嗯！这样的…这样的…呀嗯嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4147',
        any: [/CFLAG:TARGET:341 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4147-4148',
        any: [/CFLAG:TARGET:341 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4150',
        any: [/ELSEIF CFLAG:341 <= 1 && FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4151',
        any: [/「啊啊哎呀！不要再打了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4152',
        any: [/CFLAG:TARGET:341 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4152-4153',
        any: [/CFLAG:TARGET:341 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4152-4154',
        any: [/CFLAG:TARGET:341 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4152-4155',
        any: [/CFLAG:TARGET:341 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4156-4159',
        any: [/;鞭 CFLAG:342/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4161',
        any: [/IF SELECTCOM == 41/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4163',
        any: [/IF CFLAG:TARGET:342 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4165',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4166',
        any: [/「啊啊啊…不、不要…啊咿咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4168',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4169',
        any: [/「啊…哈…因为我太变态了所以请主人惩罚吧…啊嗯…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4170',
        any: [
          /「唔呼呼…但是…变态的我大概一辈子都治不好了啊…呀啊嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4172',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4173',
        any: [/「啊呀！主人啊！那样的不要打了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4174-4175',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4176',
        any: [/「那、那样的东西%SELF_CALL\(TARGET\)%好可怕但是…咕」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4176-4177',
        any: [/「那、那样的东西%SELF_CALL\(TARGET\)%好可怕但是…咕」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4178',
        any: [/CFLAG:TARGET:342 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4178-4179',
        any: [/CFLAG:TARGET:342 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4180-4181',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4183',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4184',
        any: [/「%SELF_CALL\(TARGET\)%被像这样打了…咿咕！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4186',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:342 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4187',
        any: [
          /「啊啊啊%UNICODE\(0x2661\) \*1%…嗯嗯…啊哈啊…明明被打的很痛…小穴还是啾啾的有感觉了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4188',
        any: [/「更多的鞭打我吧…欺负…也完全没关系啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4189',
        any: [/%SAVESTR:TARGET%一边被鞭子抽秘裂一边滴落着爱液………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4190',
        any: [/CFLAG:TARGET:342 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4192',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:342 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4193',
        any: [
          /「呀哈…啊…呼啊啊嗯%UNICODE\(0x2661\) \*1% 明明很痛…但还是想要继续………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4194',
        any: [/「啊啊啊…嗯…咿咿…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4195',
        any: [/每次被打%SAVESTR:TARGET%都会发出痛苦的叫声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4196',
        any: [/CFLAG:TARGET:342 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4198',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:342 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4199',
        any: [/「呀嗯嗯…嗯…啊啊啊…好痛…好痛啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4200',
        any: [/CFLAG:TARGET:342 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4202',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:342 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4203',
        any: [/「哇…嗯…啊啊啊！主人啊…更多…还要更多…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4204',
        any: [/「好痛…但是…好棒啊…主人啊…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4205',
        any: [/CFLAG:TARGET:342 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4207',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:342 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4208',
        any: [/「咕嗯…明明很痛…总觉得…非常…的奇怪…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4209',
        any: [/CFLAG:TARGET:342 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4211',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:342 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4212',
        any: [/「啊…主人啊…因为反抗不了…不要再用鞭子打了啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4213',
        any: [/CFLAG:TARGET:342 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4215',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:342 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4216',
        any: [/「哈嗯…啊…明明讨厌被打的…总觉得…怪怪的…哟…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4217',
        any: [/CFLAG:TARGET:342 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4219',
        any: [/ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4220',
        any: [/「哇…嗯…咕嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4221',
        any: [/CFLAG:TARGET:342 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4221-4222',
        any: [/CFLAG:TARGET:342 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4221-4223',
        any: [/CFLAG:TARGET:342 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4221-4224',
        any: [/CFLAG:TARGET:342 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4225-4228',
        any: [/;針 CFLAG:343/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4230',
        any: [/IF SELECTCOM == 42/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4232',
        any: [/IF CFLAG:TARGET:343 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4234',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4234-4235',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4237',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4238',
        any: [/「啊…啊啊啊…不、不行了…那样的刺的话…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4240',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4241',
        any: [/「那、那个…那是…开玩笑的吧…啊啊啊呀啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4242-4243',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4244',
        any: [/「咿咕…咿…不行啊！更进一步的刺不行啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4244-4245',
        any: [/「咿咕…咿…不行啊！更进一步的刺不行啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4246',
        any: [/CFLAG:TARGET:343 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4246-4247',
        any: [/CFLAG:TARGET:343 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4248-4249',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4251',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4251-4252',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4254',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:343 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4255',
        any: [
          /「啊哈啊…更多…刺吧…针垫那样的…呜哦…哦哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4256',
        any: [/%SAVESTR:TARGET%每次被针刺都会发出喜悦的声音………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4257',
        any: [/CFLAG:TARGET:343 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4259',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:343 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4260',
        any: [
          /「啊…啊啊啊…針…好热…嗯…明明很痛…一点点热起来了…啊啊啊…怪、怪怪的………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4261',
        any: [/%SAVESTR:TARGET%对于这意外的感觉有点不知所措………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4262',
        any: [/CFLAG:TARGET:343 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4264',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:343 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4265',
        any: [/「呼嗯…用、用力………啊啊啊…不、不行了…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4266',
        any: [/CFLAG:TARGET:343 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4268',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:343 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4269',
        any: [/「啊…啊啊…啊啊啊啊…好厉害…刺吧…咕呼…啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4270',
        any: [/「还没…不要紧…请再给我…啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4271',
        any: [/CFLAG:TARGET:343 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4273',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:343 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4274',
        any: [/「啊啊啊…慢点的话…慢点的话就不要紧…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4275',
        any: [/「呼嗯…咕叽咕叽的不行了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4276',
        any: [/CFLAG:TARGET:343 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4278',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:343 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4279',
        any: [/「因为反抗不了…我绝对不会反抗的…好痛啊停下吧！…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4280',
        any: [/CFLAG:TARGET:343 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4282',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:343 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4283',
        any: [/「哈咕…啊…啊啊啊…刺到了…明明应该很痛的…嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4284',
        any: [/CFLAG:TARGET:343 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4286',
        any: [/ELSEIF CFLAG:343 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4287',
        any: [/「好痛…好痛…好痛啊…已经…停下啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4288',
        any: [/CFLAG:TARGET:343 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4288-4289',
        any: [/CFLAG:TARGET:343 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4288-4290',
        any: [/CFLAG:TARGET:343 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4288-4291',
        any: [/CFLAG:TARGET:343 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4292-4295',
        any: [/;アイマスク CFLAG:344　CFLAG:380/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4298',
        any: [/IF SELECTCOM == 43 && TEQUIP:43/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4300',
        any: [/IF CFLAG:TARGET:344 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4302',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4302-4303',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4305',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4306',
        any: [/「哈…看不见的时候会被做很多色色的事吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4308',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4309',
        any: [/「主人啊…我有点害怕啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4310-4311',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4312',
        any: [/「这、这样的…我一点都不害怕…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4312-4313',
        any: [/「这、这样的…我一点都不害怕…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4314',
        any: [/CFLAG:TARGET:344 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4314-4315',
        any: [/CFLAG:TARGET:344 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4316-4317',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4319',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4319-4320',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4322',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4323',
        any: [/「哈…看不见的时候会被做很多色色的事吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4324',
        any: [/CFLAG:TARGET:344 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4326',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4327',
        any: [/「哈…看不见的时候会被做很多色色的事吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4328',
        any: [/CFLAG:TARGET:344 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4330',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:344 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4331',
        any: [/「哈…看不见的时候会被做很多色色的事吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4332',
        any: [/CFLAG:TARGET:344 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4334',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4335',
        any: [/「主人啊…我有点害怕啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4336',
        any: [/CFLAG:TARGET:344 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4338',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4339',
        any: [/「主人啊…我有点害怕啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4340',
        any: [/CFLAG:TARGET:344 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4342',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:344 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4343',
        any: [/「主人啊…我有点害怕啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4344',
        any: [/CFLAG:TARGET:344 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4346',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:344 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4347',
        any: [/「哈呜…好激动啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4348',
        any: [/CFLAG:TARGET:344 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4350',
        any: [/ELSEIF CFLAG:344 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4351',
        any: [/「这、这样的…我一点都不害怕…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4352',
        any: [/CFLAG:TARGET:344 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4352-4353',
        any: [/CFLAG:TARGET:344 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4352-4354',
        any: [/CFLAG:TARGET:344 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4355-4356',
        any: [/;終了時/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4357',
        any: [/ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4359',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4359-4360',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4362',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:380 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4363',
        any: [/「啊哈…%UNICODE\(0x2661\) \*1% 想更好地展现我的表情呢………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4364',
        any: [/CFLAG:380 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4366',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:380 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4367',
        any: [/「啊嗯…主人的脸终于看到了………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4368',
        any: [/CFLAG:380 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4370',
        any: [/ELSEIF CFLAG:380 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4371',
        any: [/「我、我一点也没有害怕………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4372',
        any: [/CFLAG:380 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4372-4373',
        any: [/CFLAG:380 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4372-4374',
        any: [/CFLAG:380 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4372-4375',
        any: [/CFLAG:380 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4381',
        any: [/IF SELECTCOM == 44 && TEQUIP:44/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4383',
        any: [/IF CFLAG:TARGET:345 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4385',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4385-4386',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4388',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4389',
        any: [/「啊啊嗯…绑成更加色情的样子吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4391',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4392',
        any: [/「嗯…比想象中的更加…紧的束缚啊…唔呼呼」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4393-4394',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4395',
        any: [/「这样的束缚…%SELF_CALL\(TARGET\)%不在乎…总觉得………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4395-4396',
        any: [/「这样的束缚…%SELF_CALL\(TARGET\)%不在乎…总觉得………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4397',
        any: [/CFLAG:TARGET:345 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4397-4398',
        any: [/CFLAG:TARGET:345 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4399-4400',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4402',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4402-4403',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4405',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:345 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4406',
        any: [/「啊啊啊…咕叽咕叽的被绑住了好棒啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4407',
        any: [
          /「哈…啊啊啊…这样下去会被做各种过分的事了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4408',
        any: [/%SAVESTR:TARGET%的身体被紧紧的绑上、发出了兴奋般的喘息声………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4409',
        any: [/CFLAG:TARGET:345 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4411',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:345 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4412',
        any: [
          /「啊啊啊…被绑住了…好舒服啊…嗯%UNICODE\(0x2661\) \*1% 啊啊啊…湿了呢…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4413',
        any: [/%SAVESTR:TARGET%的身体被紧紧绑上从其口中发出了灼热喘息………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4414',
        any: [/CFLAG:TARGET:345 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4416',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:345 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4417',
        any: [/「啊啊啊…绳子勒到肉里了…嗯…好奇怪的感觉………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4418',
        any: [/CFLAG:TARGET:345 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4420',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:345 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4421',
        any: [/「啊啊啊…绳子勒到肉里了…快要疯了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4422',
        any: [/CFLAG:TARGET:345 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4424',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:345 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4425',
        any: [/「绳子…啊嗯…磨擦…摩擦着…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4426',
        any: [/CFLAG:TARGET:345 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4428',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:345 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4429',
        any: [/「即使没有被绑起来…%SELF_CALL\(TARGET\)%也是主人的玩具…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4430',
        any: [/CFLAG:TARGET:345 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4432',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:345 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4433',
        any: [/「只是被绑住了…就心跳不止………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4434',
        any: [/CFLAG:TARGET:345 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4436',
        any: [/ELSEIF CFLAG:345 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4437',
        any: [/「咕…好、好紧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4438',
        any: [/CFLAG:TARGET:345 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4438-4439',
        any: [/CFLAG:TARGET:345 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4438-4440',
        any: [/CFLAG:TARGET:345 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4441-4442',
        any: [/;終了時/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4443',
        any: [/ELSEIF SELECTCOM == 44 && TEQUIP:44 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4445',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4445-4446',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4448',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:385 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4449',
        any: [/「嗯哈啊…还…非常的………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4450',
        any: [/CFLAG:385 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4452',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:385 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4453',
        any: [/「啊嗯…能被更多的束缚真是太棒了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4454',
        any: [/CFLAG:385 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4456',
        any: [/ELSEIF CFLAG:385 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4457',
        any: [/「哈…哈…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4458',
        any: [/CFLAG:385 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4458-4459',
        any: [/CFLAG:385 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4458-4460',
        any: [/CFLAG:385 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4458-4461',
        any: [/CFLAG:385 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4467',
        any: [/IF SELECTCOM == 45 && TEQUIP:45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4469',
        any: [/IF CFLAG:TARGET:346 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4471',
        any: [/IF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4472',
        any: [/「嗯…呜咕…啊哈…呜嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4474',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4475',
        any: [/「呜嗯…啊哈…呼…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4476-4477',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4478',
        any: [/「呜呜…呜…呼…呼」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4478-4479',
        any: [/「呜呜…呜…呼…呼」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4480',
        any: [/CFLAG:TARGET:346 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4480-4481',
        any: [/CFLAG:TARGET:346 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4482-4483',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4485',
        any: [
          /IF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:346 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4486',
        any: [/「嗯…呜咕…啊哈…呜嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4487',
        any: [/CFLAG:TARGET:346 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4489',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:346 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4490',
        any: [/「嗯…呜咕…啊哈…呜嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4491',
        any: [/CFLAG:TARGET:346 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4493',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:346 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4494',
        any: [/「嗯…呜咕…啊哈…呜嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4495',
        any: [/CFLAG:TARGET:346 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4497',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:346 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4498',
        any: [/「呜嗯…啊哈…呼呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4499',
        any: [/CFLAG:TARGET:346 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4501',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:346 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4502',
        any: [/「呜嗯…啊哈…呼呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4503',
        any: [/CFLAG:TARGET:346 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4505',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:346 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4506',
        any: [/「呜嗯…啊哈…呼呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4507',
        any: [/CFLAG:TARGET:346 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4509',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:346 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4510',
        any: [/「呜嗯…啊哈…呼呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4511',
        any: [/CFLAG:TARGET:346 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4513',
        any: [/ELSEIF CFLAG:346 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4514',
        any: [/「呜嗯…啊哈…呼呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4515',
        any: [/CFLAG:TARGET:346 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4515-4516',
        any: [/CFLAG:TARGET:346 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4515-4517',
        any: [/CFLAG:TARGET:346 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4518-4519',
        any: [/;終了時/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4520',
        any: [/ELSEIF SELECTCOM == 45 && TEQUIP:45 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4522',
        any: [/IF TALENT:TARGET:76 == 1 && \(CFLAG:386 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4523',
        any: [/「噗哈…哈…哈…哈…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4524',
        any: [/CFLAG:386 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4526',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:386 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4527',
        any: [/「噗哈…哈…哈…哈…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4528',
        any: [/CFLAG:386 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4530',
        any: [/ELSEIF CFLAG:386 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4531',
        any: [/「噗哈…哈…哈…哈…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4532',
        any: [/CFLAG:386 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4532-4533',
        any: [/CFLAG:386 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4532-4534',
        any: [/CFLAG:386 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4532-4535',
        any: [/CFLAG:386 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4541',
        any: [/IF SELECTCOM == 46 && TEQUIP:46/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4543',
        any: [/IF CFLAG:TARGET:347 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4545',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4545-4546',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4548',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4549',
        any: [/「啊啊啊…肚子里好热…好热啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4551',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4552',
        any: [/「肚子…肚子好奇怪的快感…已经…饶了我吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4553-4554',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4555',
        any: [/「啊啊啊…咕噜…好难受…真的好难受！救救我…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4555-4556',
        any: [/「啊啊啊…咕噜…好难受…真的好难受！救救我…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4557',
        any: [/CFLAG:TARGET:347 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4557-4558',
        any: [/CFLAG:TARGET:347 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4559-4560',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4562',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4562-4563',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4565',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 6 \|\| /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4566',
        any: [
          /「啊哈%UNICODE\(0x2661\) \*1%…还要更多的灌肠液灌进来…肚子热热的好棒啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4567',
        any: [
          /「啊啊啊…会一直忍耐到极限的…全部一起拉出来的感觉好舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4568',
        any: [
          /%SAVESTR:TARGET%翘起屁股想要被%SAVESTR:PLAYER%注入更多的灌肠液………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4569',
        any: [/CFLAG:347 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4571',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:347 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4572',
        any: [/「啊啊啊…求、求你了…真的…肚子好难受…浣肠液好热啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4573',
        any: [/%SAVESTR:TARGET%痛苦的呻吟着、不停的流着眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4574',
        any: [/CFLAG:347 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4576',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 4 \|\| /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4577',
        any: [/「呼啊…主人啊…更多…更多的灌肠让肚子鼓起来♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4578',
        any: [/「哎嘿嘿…简直就像怀孕了一样…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4579',
        any: [/CFLAG:347 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4581',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:347 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4582',
        any: [/「咿嗯…我会忍耐的…在得到主人的命令前一直忍着…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4583',
        any: [/CFLAG:347 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4585',
        any: [
          /ELSEIF ABL:3 >= 3 && ABL:21 >= 3 && \(CFLAG:347 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4586',
        any: [/「嗯…啊啊…好难受…屁股好热…好热…好奇怪的快感…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4587',
        any: [/CFLAG:347 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4589',
        any: [/ELSEIF  CFLAG:347 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4590',
        any: [/「饶了我…请饶了我吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4591',
        any: [/CFLAG:347 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4591-4592',
        any: [/CFLAG:347 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4591-4593',
        any: [/CFLAG:347 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4591-4594',
        any: [/CFLAG:347 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4595-4598',
        any: [/;何もしない CFLAG:356/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4601',
        any: [/IF SELECTCOM == 55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4603',
        any: [/IF CFLAG:356 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4605',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4606',
        any: [/%SAVESTR:TARGET%在那里发出了询问………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4608',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4609',
        any: [/「那、那个、主人…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4610',
        any: [/%SAVESTR:TARGET%一副殷切的表情………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4612',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4613',
        any: [/「哈哈…休息一下吗…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4614',
        any: [/%SAVESTR:TARGET%心里空荡荡的………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4615-4616',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4617',
        any: [/「什、什么啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4618',
        any: [/%SAVESTR:TARGET%在那里发出了询问………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4618-4619',
        any: [/%SAVESTR:TARGET%在那里发出了询问………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4620-4621',
        any: [/;ワーム/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4623',
        any: [/蠕虫在%SAVESTR:TARGET%的秘裂蠕动着、毫不留情的在小穴内搅动着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4626',
        any: [/蠕虫在%SAVESTR:TARGET%的肛门蠕动着、毫不留情的蹂躏着肛门。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4629',
        any: [/%SAVESTR:TARGET%的肛门里被放进了肛门拉珠、肛门正在被拖曳着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4632',
        any: [/%SAVESTR:TARGET%的阴蒂被电动阴蒂夹夹着持续的进行刺激。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4635',
        any: [/%SAVESTR:TARGET%的乳头被振动的乳头夹夹着持续的进行刺激。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4638',
        any: [/%SAVESTR:TARGET%的乳房被装上了榨乳器不断的榨着乳。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4641',
        any: [/%SAVESTR:TARGET%的小鸡鸡被装上了飞机杯即使快要射精也不取下来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4644',
        any: [/%SAVESTR:TARGET%被戴上了眼罩。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4647',
        any: [/%SAVESTR:TARGET%的身体被用绳子绑住约束了起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4650',
        any: [
          /%SAVESTR:TARGET%的肚子因为灌肠发出咕噜咕噜的声音、肛门塞被取下来后马上就喷了出来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4653',
        any: [
          /%SAVESTR:TARGET%的肛门被插入了电极、每当微弱的电流流动括约肌就会一阵痉挛。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4656',
        any: [/然后、这样的%SAVESTR:TARGET%的样子从头到尾都被录了下来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4657',
        any: [/CFLAG:356 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4657-4658',
        any: [/CFLAG:356 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4659-4660',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4662',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4663',
        any: [/%SAVESTR:TARGET%偷看着这边………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4665',
        any: [
          /ELSEIF TALENT:76 == 1 && PALAM:5 >= PALAMLV:3 && \(CFLAG:356 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4666',
        any: [/「快、快点…想、想要…想要做很多色色的事情！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4667',
        any: [/无法忍耐的%SAVESTR:TARGET%开始依偎了过来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4668',
        any: [/CFLAG:356 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4670',
        any: [/ELSEIF TALENT:76 == 1 && \(CFLAG:356 <= 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4671',
        any: [/「已、已经…总觉得%SELF_CALL\(TARGET\)%明明没有必要休息………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4672',
        any: [/%SAVESTR:TARGET%心里空荡荡的………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4673',
        any: [/CFLAG:356 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4675',
        any: [
          /ELSEIF TALENT:85 == 1 && PALAM:5 >= PALAMLV:3 && \(CFLAG:356 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4676',
        any: [/「主人…那、那个…差不多了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4677',
        any: [/%SAVESTR:TARGET%坐立不安的不停摩擦着双腿………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4678',
        any: [/CFLAG:356 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4680',
        any: [/ELSEIF TALENT:85 == 1 && \(CFLAG:356 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4681',
        any: [/「那、那个、主人…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4682',
        any: [/%SAVESTR:TARGET%一副殷切的表情………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4683',
        any: [/CFLAG:356 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4685',
        any: [/ELSEIF CFLAG:356 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4686',
        any: [/「为、为什么不看这里………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4687',
        any: [/%SAVESTR:TARGET%在那里发出了询问………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4688',
        any: [/CFLAG:356 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4688-4689',
        any: [/CFLAG:356 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4690-4691',
        any: [/;ワーム/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4693',
        any: [/蠕虫在%SAVESTR:TARGET%的秘裂蠕动着、毫不留情的在小穴内搅动着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4696',
        any: [/蠕虫在%SAVESTR:TARGET%的肛门蠕动着、毫不留情的蹂躏着肛门。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4699',
        any: [/%SAVESTR:TARGET%的肛门里被放进了肛门拉珠、肛门正在被拖曳着。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4702',
        any: [/%SAVESTR:TARGET%的阴蒂被电动阴蒂夹夹着持续的进行刺激。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4705',
        any: [/%SAVESTR:TARGET%的乳头被振动的乳头夹夹着持续的进行刺激。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4708',
        any: [/%SAVESTR:TARGET%的乳房被装上了榨乳器不断的榨着乳。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4711',
        any: [/%SAVESTR:TARGET%的小鸡鸡被装上了飞机杯即使快要射精也不取下来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4714',
        any: [/%SAVESTR:TARGET%被戴上了眼罩。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4717',
        any: [/%SAVESTR:TARGET%的身体被用绳子绑住约束了起来。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4720',
        any: [
          /%SAVESTR:TARGET%的肚子因为灌肠发出咕噜咕噜的声音、肛门塞被取下来后马上就喷了出来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4723',
        any: [
          /%SAVESTR:TARGET%的肛门被插入了电极、每当微弱的电流流动括约肌就会一阵痉挛。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4726',
        any: [/然后、这样的%SAVESTR:TARGET%的样子从头到尾都被录了下来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4726-4727',
        any: [/然后、这样的%SAVESTR:TARGET%的样子从头到尾都被录了下来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4726-4728',
        any: [/然后、这样的%SAVESTR:TARGET%的样子从头到尾都被录了下来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4726-4729',
        any: [/然后、这样的%SAVESTR:TARGET%的样子从头到尾都被录了下来………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4736',
        any: [/IF SELECTCOM == 56/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4738',
        any: [/IF CFLAG:357 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4739',
        any: [/IF TEQUIP:53 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4742',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4742-4743',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4744-4745',
        any: [/%NAME:MASTER%催促%SAVESTR:TARGET%进行一下自我介绍。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4745',
        any: [/%NAME:MASTER%催促%SAVESTR:TARGET%进行一下自我介绍。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4746',
        any: [/IF RAND:3 == 0 && \(TALENT:89 \|\| ABL:17 >= 5\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4747',
        any: [/于是%SAVESTR:TARGET%将自己的本名、至今为止的性体验/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4749',
        any: [/以及自慰时意淫的内容/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4750',
        any: [/津津有味的说了起来……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4751',
        any: [
          /只是想想这个水晶球在故乡公开放映的样子、%SAVESTR:TARGET%的股间就开始湿了……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4752',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4753',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4754',
        any: [/%SAVESTR:TARGET%向着水晶球一边做爱一边开始下流的自我介绍。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4755',
        any: [
          /「哈…%SELF_CALL\(TARGET\)%原来是勇者%SAVESTR:TARGET% %UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4756',
        any: [
          /「但是狂妄自大的%SELF_CALL\(TARGET\)%总是逞强、在输给怪物后被抓住了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4757',
        any: [/「之后…被魔王大人进行调教………堕落了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4758',
        any: [/%SAVESTR:TARGET%像蛇一样蠕动着身体同时张开了双腿………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4759',
        any: [
          /「怎么样啊…%SELF_CALL\(TARGET\)%的身体…没有哪个部分是魔王大人没见过的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4760',
        any: [
          /「现在…最喜欢被魔王大人那样折磨…强暴…我感觉很…有快感…所以请看吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4761',
        any: [
          /「%SELF_CALL\(TARGET\)%有多舒服、能稍微了解一点我就很开心了啊%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4762',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4763',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4764',
        any: [
          /%SAVESTR:TARGET%羞耻的蠕动着身体、兴奋着连录像开始了都没有注意到………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4765',
        any: [
          /「啊嗯…%SELF_CALL\(TARGET\)%的告白被大家都知道了什么的好羞耻啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4766',
        any: [
          /「魔王大人被人那样的讨厌…不过其实还是非常的温柔………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4767',
        any: [
          /「%SELF_CALL\(TARGET\)%在进行各种各样的侍奉的时候…啊啊啊哎呀…只是回忆下而已就已经湿了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4768',
        any: [/「哎、全部都录下来了？…呀不要不要快点停下啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4769',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4770',
        any: [/ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4771',
        any: [/%SAVESTR:TARGET%开始对着水晶球说出下流的话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4772',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4773',
        any: [/ELSEIF ABL:10 >= 3 \|\| ABL:11 >= 4 \|\| ABL:17 >= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4774',
        any: [/%SAVESTR:TARGET%开始对着水晶球自我介绍。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4775',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4775-4776',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4777',
        any: [
          /什么也不想说的%SAVESTR:TARGET%在得知水晶球要被送回故乡后吓得脸都绿了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4778',
        any: [/「要…要把录像送回故乡………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4779',
        any: [/「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4779-4780',
        any: [/「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4779-4781',
        any: [/「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4782-4783',
        any: [/;助手/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4784',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4784-4785',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4786-4787',
        any: [/一边与%SAVESTR:PLAYER%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4787',
        any: [/一边与%SAVESTR:PLAYER%/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4788',
        any: [
          /IF PALAM:5 >= PALAMLV:4 && \(TALENT:85 \|\| ABL:10 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4789',
        any: [/说着情话、%SAVESTR:TARGET%一边扭动着腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4790',
        any: [
          /ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4791',
        any: [/喊着下流的话、%SAVESTR:TARGET%一边扭动着腰。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4792',
        any: [
          /ELSEIF \(PALAM:4 >= PALAMLV:4 \|\| ABL:10 >= 5 \|\| TALENT:85 \|\| TALENT:76\) && PALAM:/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4793',
        any: [/聊天、%SAVESTR:TARGET%一边发出着/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4794',
        any: [
          /IF TEQUIP:11 \|\| TEQUIP:13 \|\| TEQUIP:14 \|\| TEQUIP:15 \|\| TEQUIP:16 \|\| TEQUIP:17/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4795',
        any: [/PRINT 快乐的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4796',
        any: [/ELSEIF TEQUIP:44 \|\| TEQUIP:49/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4797',
        any: [/PRINT 痛苦的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4797-4798',
        any: [/PRINT 痛苦的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4799',
        any: [/声音、一边拼命地回应着%SAVESTR:PLAYER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4801',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4802',
        any: [
          /在与%SAVESTR:PLAYER%对话着的同时、%SAVESTR:TARGET%献媚般的依偎了过来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4803',
        any: [/「啊嗯…没有色情的情调了吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4804',
        any: [/ELSEIF PALAM:4 >= PALAMLV:4 \|\| TALENT:85 \|\| ABL:10 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4805',
        any: [/%SAVESTR:TARGET%在很融洽的气氛中与%SAVESTR:PLAYER%说着话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4806',
        any: [/「这样平静的说话…还是被抓后的第一次呢…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4807',
        any: [/ELSEIF PALAM:4 >= PALAMLV:2 \|\|  ABL:10 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4808',
        any: [/%SAVESTR:TARGET%唯唯诺诺的回应着%SAVESTR:PLAYER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4809',
        any: [/「是、是的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4809-4810',
        any: [/「是、是的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4811',
        any: [/%SAVESTR:TARGET%只是认真的听着%SAVESTR:PLAYER%说话…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4811-4812',
        any: [/%SAVESTR:TARGET%只是认真的听着%SAVESTR:PLAYER%说话…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4811-4813',
        any: [/%SAVESTR:TARGET%只是认真的听着%SAVESTR:PLAYER%说话…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4814-4815',
        any: [/CFLAG:357 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4815',
        any: [/CFLAG:357 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4815-4816',
        any: [/CFLAG:357 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4817-4818',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4819',
        any: [/IF TEQUIP:53 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4822',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4822-4823',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4824-4825',
        any: [/%NAME:MASTER%催促%SAVESTR:TARGET%进行一下自我介绍。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4825',
        any: [/%NAME:MASTER%催促%SAVESTR:TARGET%进行一下自我介绍。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4826',
        any: [
          /IF PALAM:5 >= PALAMLV:4 && \(TALENT:85 \|\| ABL:10 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4827',
        any: [/%SAVESTR:TARGET%一边扭动着腰一边对着水晶球说着情话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4828',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4829',
        any: [
          /ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4830',
        any: [/%SAVESTR:TARGET%一边扭着腰一边对着水晶球不停喊着下流的话/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4831',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4832',
        any: [/ELSEIF RAND:3 == 0 && \(TALENT:89 \|\| ABL:17 >= 5\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4833',
        any: [/于是%SAVESTR:TARGET%将自己的本名、至今为止的性体验/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4835',
        any: [/以及自慰时意淫的内容/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4836',
        any: [/津津有味的说了起来……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4837',
        any: [
          /只是想想这个水晶球在故乡公开放映的样子、%SAVESTR:TARGET%的股间就开始湿了……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4838',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4839',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4840',
        any: [/%SAVESTR:TARGET%向着水晶球一边做一边开始下流的自我介绍。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4841',
        any: [
          /「哈…%SELF_CALL\(TARGET\)%原来是勇者%SAVESTR:TARGET% %UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4842',
        any: [
          /「但是狂妄自大的%SELF_CALL\(TARGET\)%总是逞强、在输给怪物后被抓住了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4843',
        any: [/「之后…被魔王大人进行调教………堕落了%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4844',
        any: [/%SAVESTR:TARGET%像蛇一样蠕动着身体同时张开了双腿……………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4845',
        any: [
          /「怎么样啊…%SELF_CALL\(TARGET\)%的身体…没有哪个部分是魔王大人没见过的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4846',
        any: [
          /「现在…最喜欢被魔王大人那样折磨…强暴…我感觉很…有快感…所以请看吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4847',
        any: [
          /「%SELF_CALL\(TARGET\)%有多舒服、能稍微了解一点我就很开心了啊%UNICODE\(0x2661\) \*3%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4848',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4849',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4850',
        any: [
          /%SAVESTR:TARGET%羞耻的蠕动着身体、兴奋着连录像开始了都没有注意到………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4851',
        any: [
          /「啊嗯…%SELF_CALL\(TARGET\)%的告白被大家都知道了什么的好羞耻啊……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4852',
        any: [
          /「魔王大人被人那样的讨厌…不过其实还是非常的温柔………%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4853',
        any: [
          /「%SELF_CALL\(TARGET\)%在进行各种各样的侍奉的时候…啊啊啊哎呀…只是回忆下而已就已经湿了呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4854',
        any: [/「哎、全部都录下来了？…呀不要不要快点停下啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4855',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4856',
        any: [/ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4857',
        any: [/%SAVESTR:TARGET%对着水晶球说着下流的话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4858',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4859',
        any: [/ELSEIF ABL:10 >= 3 \|\| ABL:11 >= 4 \|\| ABL:17 >= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4860',
        any: [/%SAVESTR:TARGET%对着水晶球进行着自我介绍。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4861',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4861-4862',
        any: [/TFLAG:32 \|= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4863',
        any: [
          /%SAVESTR:TARGET%在旁边什么话也不想说了但是当得知水晶球要被送回故乡后吓得脸都绿了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4864',
        any: [/「要…要把录像送回故乡………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4865',
        any: [/「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4865-4866',
        any: [/「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4865-4867',
        any: [/「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4868-4869',
        any: [/;助手/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4870',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4870-4871',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4872-4873',
        any: [/%SAVESTR:PLAYER%让/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4873',
        any: [/%SAVESTR:PLAYER%让/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4874',
        any: [
          /IF PALAM:5 >= PALAMLV:4 && \(TALENT:85 \|\| ABL:10 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4875',
        any: [/%SAVESTR:TARGET%一边扭动着腰一边与%SAVESTR:PLAYER%说着情话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4876',
        any: [
          /ELSEIF PALAM:5 >= PALAMLV:4 && \(TALENT:76 \|\| ABL:11 >= 5\) && TFLAG:60/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4877',
        any: [
          /%SAVESTR:TARGET%一边扭动着腰一边与%SAVESTR:PLAYER%喊着下流的话。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4878',
        any: [
          /ELSEIF \(PALAM:4 >= PALAMLV:4 \|\| ABL:10 >= 5 \|\| TALENT:85 \|\| TALENT:76\) && PALAM:/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4879',
        any: [/%SAVESTR:TARGET%一边发出着/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4880',
        any: [
          /IF TEQUIP:11 \|\| TEQUIP:13 \|\| TEQUIP:14 \|\| TEQUIP:15 \|\| TEQUIP:16 \|\| TEQUIP:17/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4881',
        any: [/PRINT 快乐的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4882',
        any: [/ELSEIF TEQUIP:44 \|\| TEQUIP:49/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4883',
        any: [/PRINT 痛苦的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4883-4884',
        any: [/PRINT 痛苦的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4885',
        any: [/声音、一边拼命地回应着%SAVESTR:PLAYER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4887',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4888',
        any: [
          /在与%SAVESTR:PLAYER%对话着的同时、%SAVESTR:TARGET%献媚般的依偎了过来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4889',
        any: [/「啊啊啊…明明只是普通的话、总觉得气氛变的怪怪的了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4890',
        any: [/ELSEIF PALAM:4 >= PALAMLV:4 \|\| TALENT:85 \|\| ABL:10 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4891',
        any: [/%SAVESTR:TARGET%在很融洽的气氛中与%SAVESTR:PLAYER%说着话。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4892',
        any: [/「呼呼…这样平静的气氛还能说什么…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4893',
        any: [/ELSEIF PALAM:4 >= PALAMLV:2 \|\|  ABL:10 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4894',
        any: [/%SAVESTR:TARGET%唯唯诺诺的回应着%SAVESTR:PLAYER%。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4895',
        any: [/「是、是的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4895-4896',
        any: [/「是、是的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4897',
        any: [/%SAVESTR:TARGET%只是认真的听着%SAVESTR:PLAYER%说话…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4897-4898',
        any: [/%SAVESTR:TARGET%只是认真的听着%SAVESTR:PLAYER%说话…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4897-4899',
        any: [/%SAVESTR:TARGET%只是认真的听着%SAVESTR:PLAYER%说话…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4897-4900',
        any: [/%SAVESTR:TARGET%只是认真的听着%SAVESTR:PLAYER%说话…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4897-4901',
        any: [/%SAVESTR:TARGET%只是认真的听着%SAVESTR:PLAYER%说话…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4897-4902',
        any: [/%SAVESTR:TARGET%只是认真的听着%SAVESTR:PLAYER%说话…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4903-4907',
        any: [
          /;パイズリフェラ CFLAG:360　			SIF TALENT:TARGET:110 == 1 \|\| TALENT:TARGET:114 == 1 \|\| TA/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4909',
        any: [/IF SELECTCOM == 123/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4911',
        any: [/IF CFLAG:TARGET:360 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4913',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4914',
        any: [/「哈呜…嗯…啊哈…呜…咿…这样…嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4915',
        any: [
          /%SAVESTR:TARGET%用两个乳房夹住%SAVESTR:PLAYER%的小鸡鸡不断的刺激………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4917',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4918',
        any: [
          /%SAVESTR:TARGET%用两个乳房夹住%SAVESTR:PLAYER%的小鸡鸡、精心的吸吮着从乳沟里露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4920',
        any: [
          /「啊嗯…因为是大乳房所以说很舒服？ 唔呼呼%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4921',
        any: [
          /「啊呜…啾…啾…呼…很高兴能充分的侍奉小鸡鸡呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4923',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4924',
        any: [
          /%SAVESTR:TARGET%用两个乳房夹住%SAVESTR:PLAYER%的小鸡鸡、温柔的吻着从乳沟里露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4926',
        any: [
          /「啊啊乳房更加舒服了哦%UNICODE\(0x2661\) \*1% 满满的侍奉啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4927',
        any: [
          /「啊啊嗯…好可爱的小鸡鸡…嘛啾啾…哈啊…会让你更舒服的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4929',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4930',
        any: [
          /%SAVESTR:TARGET%用两个乳房夹住%SAVESTR:PLAYER%的小鸡鸡、伸出舌头舔着从乳沟里露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4932',
        any: [
          /「已经…小鸡鸡这么精神了啊…开始钻出%SELF_CALL\(TARGET\)%的乳房了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4933',
        any: [/「呜哦…嗯哦…咕噜…啾啾…咕噜…嗯…咿、哈…哈………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4934-4935',
        any: [/;それ以外（奉仕精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4936',
        any: [
          /%SAVESTR:TARGET%用两个乳房夹住%SAVESTR:PLAYER%的小鸡鸡、吻了从乳沟里露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4938',
        any: [/「啊啊啊…%SELF_CALL\(TARGET\)%的…乳房…被侵犯了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4939',
        any: [/「嘛啊…啾…啾…咕噜…嗯…啾啾………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4939-4940',
        any: [/「嘛啊…啾…啾…咕噜…嗯…啾啾………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4941',
        any: [/CFLAG:TARGET:360 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4941-4942',
        any: [/CFLAG:TARGET:360 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4943-4944',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4946',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4947',
        any: [/「哈呜…嗯…啊哈…呜…咿…这样…嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4948',
        any: [
          /%SAVESTR:TARGET%用两个乳房夹住%SAVESTR:PLAYER%的小鸡鸡不断的刺激………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4950',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:360 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4951',
        any: [
          /%SAVESTR:TARGET%用两个乳房夹住%SAVESTR:PLAYER%的小鸡鸡、精心的吸吮着从乳沟里露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4953',
        any: [
          /「啊嗯…因为是大乳房所以说很舒服？ 唔呼呼%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4954',
        any: [
          /「啊呜…啾…啾…呼…很高兴能充分的侍奉小鸡鸡呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4955',
        any: [/CFLAG:360 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4957',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:360 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4958',
        any: [
          /%SAVESTR:TARGET%用两个乳房夹住%SAVESTR:PLAYER%的小鸡鸡、温柔的吻着从乳沟里露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4960',
        any: [
          /「啊啊乳房更加舒服了哦%UNICODE\(0x2661\) \*1% 满满的侍奉啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4961',
        any: [
          /「啊啊嗯…好可爱的小鸡鸡…嘛啾啾…哈啊…会让你更舒服的%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4962',
        any: [/CFLAG:360 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4964',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:360 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4965',
        any: [
          /%SAVESTR:TARGET%用两个乳房夹住%SAVESTR:PLAYER%的小鸡鸡、伸出舌头舔着从乳沟里露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4967',
        any: [
          /「已经…小鸡鸡这么精神了啊…开始钻出%SELF_CALL\(TARGET\)%的乳房了………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4968',
        any: [/「呜哦…嗯哦…咕噜…啾啾…咕噜…嗯…咿、哈…哈………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4969',
        any: [/CFLAG:360 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4971',
        any: [/ELSEIF CFLAG:360 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4972',
        any: [
          /%SAVESTR:TARGET%用两个乳房夹住%SAVESTR:PLAYER%的小鸡鸡、吻了从乳沟里露出来的龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4974',
        any: [/「啊啊啊…%SELF_CALL\(TARGET\)%的…乳房…被侵犯了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4975',
        any: [/「嘛啊…啾…啾…咕噜…嗯…啾啾………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4976',
        any: [/CFLAG:360 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4976-4977',
        any: [/CFLAG:360 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4976-4978',
        any: [/CFLAG:360 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4976-4979',
        any: [/CFLAG:360 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4980-4982',
        any: [/;フェラ自慰 CFLAG:361/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4984',
        any: [/IF SELECTCOM == 125/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4986',
        any: [/IF CFLAG:TARGET:361 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4988',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4989',
        any: [
          /%SAVESTR:TARGET%一边紧紧的揪住%SAVESTR:PLAYER%的小鸡鸡一边开始了自慰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4990',
        any: [
          /「啊呜…嗯…嗯哈…一边侍奉着小鸡鸡…一边自慰最棒了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4992',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4993',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:PLAYER%命令乖乖的伸出手指到秘裂处、一边自慰一边开始侍奉小鸡鸡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4994',
        any: [
          /「啊啊啊…虽然不情愿…不过…也不错…很舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4996',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4997',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:PLAYER%命令就这样一边口交一边开始自慰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4998',
        any: [/「啊啊啊…呼…啾…啾啪…嗯哦…嗯嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '4999-5000',
        any: [/;それ以外（奉仕精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5001',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:PLAYER%多次命令、有些犹豫的嘴里含着小鸡鸡开始了自慰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5002',
        any: [/「啊啊啊…这、这么不知羞耻的事情…啊…呜嗯…嗯…啊哈…呜嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5002-5003',
        any: [/「啊啊啊…这、这么不知羞耻的事情…啊…呜嗯…嗯…啊哈…呜嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5004',
        any: [/CFLAG:TARGET:361 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5004-5005',
        any: [/CFLAG:TARGET:361 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5006-5007',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5009',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:361 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5010',
        any: [
          /%SAVESTR:TARGET%一边紧紧的揪住%SAVESTR:PLAYER%的小鸡鸡一边开始了自慰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5011',
        any: [
          /「啊呜…嗯…嗯哈…一边侍奉着小鸡鸡…一边自慰最棒了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5012',
        any: [/%SAVESTR:TARGET%一边把小鸡鸡吞进了喉咙的最里面一边继续自慰………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5013',
        any: [/CFLAG:361 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5015',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:361 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5016',
        any: [
          /%SAVESTR:TARGET%在%SAVESTR:PLAYER%的命令下碳刷的向秘裂伸出手指、开始一边自慰一边奉仕小鸡鸡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5017',
        any: [
          /「啊啊啊…虽然不情愿…不过…也不错…很舒服啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5018',
        any: [/%SAVESTR:TARGET%的眼神慢慢融化同时不断的口腔侍奉………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5019',
        any: [/CFLAG:361 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5021',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:361 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5022',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:PLAYER%命令就这样一边口交一边开始自慰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5023',
        any: [/「啊啊啊…呼…啾…啾啪…嗯哦…嗯嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5024',
        any: [/CFLAG:361 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5026',
        any: [/ELSEIF CFLAG:361 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5027',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:PLAYER%多次命令、有些犹豫的嘴里含着小鸡鸡开始了自慰。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5028',
        any: [/「啊啊啊…这、这么不知羞耻的事情…啊…呜嗯…嗯…啊哈…呜嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5029',
        any: [/CFLAG:361 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5029-5030',
        any: [/CFLAG:361 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5029-5031',
        any: [/CFLAG:361 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5029-5032',
        any: [/CFLAG:361 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5033-5036',
        any: [/;手コキフェラ CFLAG:362/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5038',
        any: [/IF SELECTCOM == 126/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5040',
        any: [/IF CFLAG:TARGET:362 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5042',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5043',
        any: [/「哈…像这样给你揉也很舒服啊…这里的顶端稍微舔下又怎么样呢？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5044',
        any: [
          /%SAVESTR:TARGET%淫乱的笑着用指头抓住了%SAVESTR:PLAYER%的小鸡鸡、激烈的套弄起来同时用嘴含住了龟头………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5046',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5047',
        any: [
          /%SAVESTR:TARGET%用融化了的瞳孔仰望着%SAVESTR:PLAYER%的小鸡鸡用双手套弄起来同时用嘴含住了龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5048',
        any: [/「啊啊啊…请充分的享受吧…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5050',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5051',
        any: [
          /%SAVESTR:TARGET%用嘴吸吮着%SAVESTR:PLAYER%的龟头、双手开始套弄起小鸡鸡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5052',
        any: [
          /「嘛啾啾…咕啦…哈啊啊………这里被摩擦…最喜欢了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5053-5054',
        any: [/;それ以外（奉仕精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5055',
        any: [
          /%SAVESTR:TARGET%用嘴吸吮着%SAVESTR:PLAYER%的龟头、双手开始套弄起小鸡鸡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5056',
        any: [/「哈…啊啊啊…嗯…小鸡鸡开始颤抖了…啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5056-5057',
        any: [/「哈…啊啊啊…嗯…小鸡鸡开始颤抖了…啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5058',
        any: [/CFLAG:TARGET:362 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5058-5059',
        any: [/CFLAG:TARGET:362 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5060-5061',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5063',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:362 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5064',
        any: [/「哈…像这样给你揉也很舒服啊…这里的顶端稍微舔下又怎么样呢？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5065',
        any: [
          /%SAVESTR:TARGET%淫乱的笑着用指头抓住了%SAVESTR:PLAYER%的小鸡鸡、激烈的套弄起来同时用嘴含住了龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5066',
        any: [
          /「啊哈呼呜…顶到稍微有点抽搐了…真的非常可爱%UNICODE\(0x2661\) \*1% 啊～…哈呜咕噜…啾呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5067',
        any: [/CFLAG:362 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5069',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:362 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5070',
        any: [
          /%SAVESTR:TARGET%用融化了的瞳孔仰望着%SAVESTR:PLAYER%的小鸡鸡用双手套弄起来同时用嘴含住了龟头。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5071',
        any: [/「啊啊啊…请充分的享受吧…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5072',
        any: [
          /「手和嘴巴…色色的发热了…脑袋了一片浆糊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5073',
        any: [/CFLAG:362 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5075',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:362 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5076',
        any: [
          /%SAVESTR:TARGET%用嘴吸吮着%SAVESTR:PLAYER%的龟头、双手开始套弄起小鸡鸡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5077',
        any: [
          /「嘛啾啾…咕啦…哈啊啊………这里被摩擦…最喜欢了啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5078',
        any: [/CFLAG:362 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5080',
        any: [/ELSEIF CFLAG:362 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5081',
        any: [
          /%SAVESTR:TARGET%用嘴吸吮着%SAVESTR:PLAYER%的龟头、双手开始套弄起小鸡鸡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5082',
        any: [/「哈哈…啊呜…啾啾…咕噜…呼%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5083',
        any: [/CFLAG:362 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5083-5084',
        any: [/CFLAG:362 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5083-5085',
        any: [/CFLAG:362 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5083-5086',
        any: [/CFLAG:362 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5083-5087',
        any: [/CFLAG:362 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5093',
        any: [/IF SELECTCOM == 127/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5095',
        any: [/IF CFLAG:TARGET:363 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5097',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5098',
        any: [
          /%SAVESTR:TARGET%高兴的吸住了%SAVESTR:PLAYER%的小鸡鸡、一边发出下流的声音一边开始用力的吸了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5099',
        any: [
          /「嗯呜…嗯啾噜啾噜………啾吧啾噜啾啾啾呜呜呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5101',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5102',
        any: [
          /%SAVESTR:TARGET%眯着眼睛吸住了%SAVESTR:PLAYER%的小鸡鸡、一边发出声音一边开始用力的吸了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5103',
        any: [
          /「呜咕…嗯啾噜…啾啪…啾噜嗯嗯啾呜嗯啾呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5105',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5106',
        any: [
          /%SAVESTR:TARGET%用嘴唇夹住了%SAVESTR:PLAYER%的小鸡鸡一边发出声音一边开始用力的吸了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5107',
        any: [/「啾噜…啾啾…呼呼…啾呜嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5108-5109',
        any: [/;それ以外（奉仕精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5110',
        any: [
          /%SAVESTR:TARGET%流着眼泪吸住了%SAVESTR:PLAYER%的小鸡鸡、一边发出声音一边开始用力的吸了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5111',
        any: [/「呜咕…嗯咕…啾噜」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5111-5112',
        any: [/「呜咕…嗯咕…啾噜」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5113',
        any: [/CFLAG:TARGET:363 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5113-5114',
        any: [/CFLAG:TARGET:363 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5115-5116',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5118',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5119',
        any: [
          /%SAVESTR:TARGET%高兴的吸住了%SAVESTR:PLAYER%的小鸡鸡、一边发出下流的声音一边开始用力的吸了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5120',
        any: [
          /「嗯呜…嗯啾噜啾噜………啾吧啾噜啾啾啾呜呜呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5121',
        any: [
          /「…噗哈…啊啊嗯…这样满满的射进来是%SELF_CALL\(TARGET\)%的一切啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5122',
        any: [/CFLAG:363 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5124',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:363 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5125',
        any: [
          /%SAVESTR:TARGET%眯着眼睛吸住了%SAVESTR:PLAYER%的小鸡鸡、一边发出声音一边开始用力的吸了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5126',
        any: [
          /「呜咕…嗯啾噜…啾啪…啾噜嗯嗯啾呜嗯啾呜呜%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5127',
        any: [
          /「嗯哈…前列腺液…还有精液…大家%SELF_CALL\(TARGET\)%吃饱了%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5128',
        any: [/CFLAG:363 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5130',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:363 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5131',
        any: [
          /%SAVESTR:TARGET%用嘴唇夹住了%SAVESTR:PLAYER%的小鸡鸡一边发出声音一边开始用力的吸了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5132',
        any: [/「啾噜…啾啾…呼呼…啾呜嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5133',
        any: [/CFLAG:363 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5135',
        any: [/ELSEIF CFLAG:363 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5136',
        any: [
          /%SAVESTR:TARGET%流着眼泪吸住了%SAVESTR:PLAYER%的小鸡鸡、一边发出声音一边开始用力的吸了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5137',
        any: [/「呜咕…嗯咕…啾噜」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5138',
        any: [/CFLAG:363 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5138-5139',
        any: [/CFLAG:363 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5138-5140',
        any: [/CFLAG:363 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5138-5141',
        any: [/CFLAG:363 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5142-5145',
        any: [/;シックスナイン CFLAG:364/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5147',
        any: [/IF SELECTCOM == 69/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5149',
        any: [/IF CFLAG:TARGET:364 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5151',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5152',
        any: [
          /%SAVESTR:TARGET%的秘裂每次有快感都会逃开、双唇强烈的夹紧小鸡鸡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5153',
        any: [
          /「呼…不要再戏弄我了…这样没办法再侍奉了啦…啊嗯啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5155',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5156',
        any: [/%SAVESTR:TARGET%一边忍受着秘裂传来的快感一边吸吮着小鸡鸡。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5157',
        any: [
          /「啊哈…嗯嗯呼…啊啊啊…讨厌啦%UNICODE\(0x2661\) \*1%真是讨厌啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5159',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5160',
        any: [
          /%SAVESTR:TARGET%和%SAVESTR:PLAYER%用嘴贪婪的吻着彼此的股间。%SAVESTR:TARGET%在秘裂的快感下发出娇吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5161',
        any: [/「呀哈…不、不行了…再被戏弄的话…啊啊啊啊啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5162-5163',
        any: [/;それ以外（奉仕精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5164',
        any: [
          /%SAVESTR:TARGET%和%SAVESTR:PLAYER%用嘴贪婪的吻着彼此的股间。%SAVESTR:TARGET%一边忍受着秘裂传来的快感一边扭着屁股/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5165',
        any: [/「咕呼…啊啊咿…停、停下吧………咿啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5165-5166',
        any: [/「咕呼…啊啊咿…停、停下吧………咿啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5167',
        any: [/CFLAG:TARGET:364 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5167-5168',
        any: [/CFLAG:TARGET:364 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5169-5170',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5172',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:364 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5173',
        any: [
          /%SAVESTR:TARGET%的秘裂每次有快感都会逃开、双唇强烈的夹紧小鸡鸡。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5174',
        any: [
          /「呼～…不要再戏弄我了…这样没办法再侍奉了啦…啊嗯啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5175',
        any: [
          /「已经…回报你了呦…啊嗯…哈呜…啾啾%UNICODE\(0x2661\) \*1% 咕噜…啾呜呜」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5176',
        any: [/CFLAG:364 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5178',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:364 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5179',
        any: [/%SAVESTR:TARGET%一边忍受着秘裂传来的快感一边吸吮着小鸡鸡。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5180',
        any: [
          /「啊哈…嗯嗯呼…啊啊啊…讨厌啦%UNICODE\(0x2661\) \*1%真是讨厌啦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5181',
        any: [/「啊啊啊…必须吮吸小鸡鸡么…啊哈嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5182',
        any: [/CFLAG:364 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5184',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:364 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5185',
        any: [
          /%SAVESTR:TARGET%和%SAVESTR:PLAYER%用嘴贪婪的吻着彼此的股间。%SAVESTR:TARGET%在秘裂的快感下发出娇吟。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5186',
        any: [/「呀哈…不、不行了…再被戏弄的话…啊啊啊啊啊嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5187',
        any: [/CFLAG:364 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5189',
        any: [/ELSEIF CFLAG:364 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5190',
        any: [
          /%SAVESTR:TARGET%和%SAVESTR:PLAYER%用嘴贪婪的吻着彼此的股间。%SAVESTR:TARGET%一边忍受着秘裂传来的快感一边扭着屁股/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5191',
        any: [/「咕呼…啊啊咿…停、停下吧………咿啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5192',
        any: [/CFLAG:364 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5192-5193',
        any: [/CFLAG:364 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5192-5194',
        any: [/CFLAG:364 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5192-5195',
        any: [/CFLAG:364 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5196-5199',
        any: [/;ディープスロート CFLAG:365/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5201',
        any: [/IF SELECTCOM == 124/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5203',
        any: [/IF CFLAG:TARGET:365 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5205',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5206',
        any: [
          /%SAVESTR:TARGET%把%SAVESTR:PLAYER%的小鸡鸡吸进了喉咙的最里面、用双唇夹紧了根部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5207',
        any: [/「嗯呜…啊哈…嗯啾噜…啾咕嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5209',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5210',
        any: [
          /%SAVESTR:TARGET%把%SAVESTR:PLAYER%的小鸡鸡吸进了喉咙的最里面、舌头开始紧贴着动了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5211',
        any: [
          /「呜咕…嗯啾噜%UNICODE\(0x2661\) \*1% 嗯哦…咕啾…咕啾…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5213',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5214',
        any: [
          /%SAVESTR:TARGET%把%SAVESTR:PLAYER%的小鸡鸡勉强吸进了喉咙的最里面、一边快要窒息了一边开始了口腔侍奉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5215',
        any: [/「呜咕…嗯咕…啊哈嗯…嗯嗯嗯呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5216-5217',
        any: [/;それ以外（奉仕精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5218',
        any: [
          /%SAVESTR:TARGET%把%SAVESTR:PLAYER%的小鸡鸡勉强吸进了喉咙的最里面、一边快要窒息了一边开始了口腔侍奉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5219',
        any: [/「啊哈…呜嗯…呜啾…嗯呜！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5219-5220',
        any: [/「啊哈…呜嗯…呜啾…嗯呜！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5221',
        any: [/CFLAG:TARGET:365 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5221-5222',
        any: [/CFLAG:TARGET:365 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5223-5224',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5226',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:363 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5227',
        any: [
          /%SAVESTR:TARGET%把%SAVESTR:PLAYER%的小鸡鸡吸进了喉咙的最里面、用双唇夹紧了根部。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5228',
        any: [/「嗯呜…啊哈…嗯啾噜…啾咕嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5229',
        any: [
          /（%SELF_CALL\(TARGET\)%的喉咙啊…是小鸡鸡的容器啊…%UNICODE\(0x2661\) \*1%）/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5230',
        any: [/CFLAG:365 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5232',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:363 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5233',
        any: [
          /%SAVESTR:TARGET%把%SAVESTR:PLAYER%的小鸡鸡吸进了喉咙的最里面、舌头开始紧贴着动了起来。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5234',
        any: [
          /「呜咕…嗯啾噜%UNICODE\(0x2661\) \*1% 嗯哦…咕啾…咕啾…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5235',
        any: [/（就这样…在喉咙的深处射精吧…%UNICODE\(0x2661\) \*1%）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5236',
        any: [/CFLAG:365 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5238',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:363 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5239',
        any: [
          /%SAVESTR:TARGET%把%SAVESTR:PLAYER%的小鸡鸡勉强吸进了喉咙的最里面、一边快要窒息了一边开始了口腔侍奉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5240',
        any: [/「呜咕…嗯咕…啊哈嗯…嗯嗯嗯呼呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5241',
        any: [/CFLAG:365 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5243',
        any: [/ELSEIF CFLAG:363 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5244',
        any: [
          /%SAVESTR:TARGET%把%SAVESTR:PLAYER%的小鸡鸡勉强吸进了喉咙的最里面、一边快要窒息了一边开始了口腔侍奉。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5245',
        any: [/「呜咕！？嗯…噗…呜嗯…嗯嗯…嗯嗯嗯～～～～！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5246',
        any: [/CFLAG:365 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5246-5247',
        any: [/CFLAG:365 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5246-5248',
        any: [/CFLAG:365 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5246-5249',
        any: [/CFLAG:365 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5250-5253',
        any: [/;イラマチオ CFLAG:381/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5255',
        any: [/IF SELECTCOM == 80/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5257',
        any: [/IF CFLAG:TARGET:381 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5259',
        any: [/IF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5260',
        any: [/「呼～…嗯…呜嗯♪…嗯呜…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5261',
        any: [
          /%SAVESTR:TARGET%用喉咙的最里面接受了%SAVESTR:PLAYER%的小鸡鸡………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5262-5263',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5264',
        any: [/「咕…嗯…嗯咕…嗯…呼嗯嗯！呜嗯…嗯～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5265',
        any: [
          /%SAVESTR:TARGET%忍耐着每次被%SAVESTR:PLAYER%插进喉咙的最里面都像快要窒息了一样的感觉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5265-5266',
        any: [
          /%SAVESTR:TARGET%忍耐着每次被%SAVESTR:PLAYER%插进喉咙的最里面都像快要窒息了一样的感觉………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5267',
        any: [/CFLAG:TARGET:381 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5267-5268',
        any: [/CFLAG:TARGET:381 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5269-5270',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5272',
        any: [
          /IF TALENT:TARGET:76 == 1 && \(CFLAG:381 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5273',
        any: [/「嗯哦…呜咕…啊哈嗯…嗯…噗…嗯咕呜嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5274',
        any: [
          /%SAVESTR:TARGET%被激烈的侵犯%SAVESTR:PLAYER%喉咙的最里面的同时也感到了快感。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5275',
        any: [
          /「啊…%SELF_CALL\(TARGET\)%的喉咙已经…是为了取悦小鸡鸡而存在的了%UNICODE\(0x2661\) \*1%…嗯哦…哦…嗯呼嗯嗯%UNICODE\(/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5277',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:381 <= 3 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5278',
        any: [/「啊哈…嗯♪…嗯咕…嗯嗯呼♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5279',
        any: [
          /%SAVESTR:TARGET%被%SAVESTR:PLAYER%的小鸡鸡侵犯着喉咙的最里面的时候发出了喜悦的声音………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5280',
        any: [/CFLAG:381 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5282',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:381 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5283',
        any: [/「啊哈嗯…嗯…嗯…咿咕♪…啊哈啊哈嗯～♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5284',
        any: [
          /%SAVESTR:TARGET%一边被%SAVESTR:PLAYER%侵犯着喉咙的最里面一边熟练的牙齿离开小鸡鸡用舌头那样缠绕着舔了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5285',
        any: [/CFLAG:381 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5287',
        any: [/ELSEIF CFLAG:381 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5288',
        any: [/「嗯…嗯呜咿…嗯咕…嗯…咕呼…咕…呜呜呜～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5289',
        any: [
          /%SAVESTR:TARGET%用喉咙的最里面接受了%SAVESTR:PLAYER%的小鸡鸡………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5290',
        any: [/CFLAG:381 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5290-5291',
        any: [/CFLAG:381 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5290-5292',
        any: [/CFLAG:381 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5290-5293',
        any: [/CFLAG:381 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5294-5297',
        any: [/;ピアシング　CFLAG:348/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5301',
        any: [/IF SELECTCOM == 87/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5304',
        any: [/IF CFLAG:TARGET:348 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5306',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5306-5307',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5309',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5311',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5312',
        any: [/%SAVESTR:TARGET%感受到肌肤被第一次穿环的痛苦不禁皱起了脸。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5314',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5315',
        any: [
          /「咿…啊啊啊…乳头能戴上这么漂亮的环真是好棒啊…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5316',
        any: [
          /相比起穿孔的疼痛%SAVESTR:TARGET%更为这种地方能被穿上两个环而高兴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5318',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5319',
        any: [/「啊哈…肚脐戴上这个显得好时尚啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5320',
        any: [/相比起穿孔的疼痛%SAVESTR:TARGET%更为被穿上环而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5322',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5323',
        any: [
          /「啊…这样的地方要是被穿上环…就能一直永远的感受到主人了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5324',
        any: [/相比起被穿孔的疼痛%SAVESTR:TARGET%更为阴唇能穿上环而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5326',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5327',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5328',
        any: [
          /「哈啊…被穿环好兴奋感觉小鸡鸡都比平时变大了似的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5329',
        any: [/相比起被穿孔的疼痛%SAVESTR:TARGET%更为小鸡鸡能穿上环而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5329-5330',
        any: [/相比起被穿孔的疼痛%SAVESTR:TARGET%更为小鸡鸡能穿上环而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5331',
        any: [
          /「这样的地方能得到环什么的…感觉太强烈了呜…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5332',
        any: [/相比起被穿孔的疼痛%SAVESTR:TARGET%更为阴蒂能穿上环而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5332-5333',
        any: [/相比起被穿孔的疼痛%SAVESTR:TARGET%更为阴蒂能穿上环而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5335',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5336',
        any: [/「啊哎…就这样给你满满的口交啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5337',
        any: [/相比起被穿孔的疼痛%SAVESTR:TARGET%更为舌尖能穿上环而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5339',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5340',
        any: [/「嗯…唔呼呼…就这样想要满满的接吻哟…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5341',
        any: [/%SAVESTR:TARGET%舔着嘴唇上的环确认了一下情况………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5343',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5344',
        any: [/「啊哈…%SELF_CALL\(TARGET\)%好像变成了家畜一样…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5345',
        any: [/%SAVESTR:TARGET%一再抚摩着鼻环………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5345-5346',
        any: [/%SAVESTR:TARGET%一再抚摩着鼻环………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5347-5348',
        any: [/;取り外し/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5349',
        any: [/%SAVESTR:TARGET%揉着环被拆下后留下的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5349-5350',
        any: [/%SAVESTR:TARGET%揉着环被拆下后留下的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5352',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5354',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5355',
        any: [/%SAVESTR:TARGET%感受到肌肤被第一次穿环的痛苦发出了细小的悲鸣。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5357',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5358',
        any: [/「虽、虽然很痛…如果这样能让主人高兴…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5359',
        any: [/%SAVESTR:TARGET%两个乳头环紧紧的嵌了进去………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5361',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5362',
        any: [/「唔呼呼、总觉得好漂亮…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5363',
        any: [/%SAVESTR:TARGET%从四周抚摩着肚脐环………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5365',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5366',
        any: [/「哈哈…好厉害…这样的地方要是被穿上环…已经…已经…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5367',
        any: [/%SAVESTR:TARGET%对阴唇被穿环表现的相当兴奋………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5369',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5370',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5371',
        any: [/「啊呜…小鸡鸡一直勃起着了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5372',
        any: [
          /%SAVESTR:TARGET%一边粗暴的呼着气一边因为小鸡鸡戴上了环而高高的立了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5372-5373',
        any: [
          /%SAVESTR:TARGET%一边粗暴的呼着气一边因为小鸡鸡戴上了环而高高的立了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5374',
        any: [/「啊…这样的地方被穿上环很有爱的感觉啊………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5375',
        any: [/%SAVESTR:TARGET%兴奋的红着脸………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5375-5376',
        any: [/%SAVESTR:TARGET%兴奋的红着脸………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5378',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5379',
        any: [/「哈哈…就这样想满满的吻…呦…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5380',
        any: [/%SAVESTR:TARGET%伸出穿了环的舌头诱惑着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5382',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5383',
        any: [/「啊哈…固固的固定下来了…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5384',
        any: [/%SAVESTR:TARGET%舔着嘴唇上的环确认了一下情况………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5386',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5387',
        any: [/「总、总觉得像家畜一样……哎呀………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5388',
        any: [
          /%SAVESTR:TARGET%不想让你看见鼻子上的环那样情不自禁的转过了脸………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5388-5389',
        any: [
          /%SAVESTR:TARGET%不想让你看见鼻子上的环那样情不自禁的转过了脸………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5390-5391',
        any: [/;取り外し/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5392',
        any: [/%SAVESTR:TARGET%寂寞的揉着环被拆下后留下的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5392-5393',
        any: [/%SAVESTR:TARGET%寂寞的揉着环被拆下后留下的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5394-5395',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5397',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5398',
        any: [/%SAVESTR:TARGET%感受到肌肤被第一次穿环的痛苦发出了悲鸣。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5400',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5401',
        any: [/「讨厌啊…乳头好痛呦…对于穿环什么的哟………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5402',
        any: [/感受到乳头被穿环的痛苦%SAVESTR:TARGET%流下了屈辱的眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5404',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5405',
        any: [/「哈…啊啊…这样的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5406',
        any: [/感受到肚脐被穿环的痛苦%SAVESTR:TARGET%不停的流着眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5408',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5409',
        any: [/「不要…已经…不能去见其他人了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5410',
        any: [/感受到阴唇被穿环的痛苦%SAVESTR:TARGET%流下了屈辱的眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5412',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5413',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5414',
        any: [/「嗯嗯…小鸡鸡会…好热…好痛呦………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5415',
        any: [/感受到小鸡鸡被穿环的痛苦%SAVESTR:TARGET%流下了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5415-5416',
        any: [/感受到小鸡鸡被穿环的痛苦%SAVESTR:TARGET%流下了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5417',
        any: [/「已、已经饶了我吧…不管什么都可以…取想这个环吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5418',
        any: [/感受到阴蒂被穿环的痛苦%SAVESTR:TARGET%不停的流着眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5418-5419',
        any: [/感受到阴蒂被穿环的痛苦%SAVESTR:TARGET%不停的流着眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5421',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5422',
        any: [/「哈…哈…这样…在那里………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5423',
        any: [/感受到舌头被穿环的痛苦%SAVESTR:TARGET%好像很难说话………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5425',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5426',
        any: [/「呜…在那里………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5427',
        any: [/感受到嘴唇被穿环的痛苦%SAVESTR:TARGET%流下了屈辱的眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5429',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5430',
        any: [/「%SELF_CALL\(TARGET\)%这个样子不是家畜是什么啊…呜呜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5431',
        any: [
          /%SAVESTR:TARGET%不想让你看见鼻子上的环那样情不自禁的转过了脸哭了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5431-5432',
        any: [
          /%SAVESTR:TARGET%不想让你看见鼻子上的环那样情不自禁的转过了脸哭了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5433-5434',
        any: [/;取り外し/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5435',
        any: [/%SAVESTR:TARGET%揉着环被拆下后留下的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5435-5436',
        any: [/%SAVESTR:TARGET%揉着环被拆下后留下的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5437-5438',
        any: [/CFLAG:TARGET:348 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5438',
        any: [/CFLAG:TARGET:348 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5438-5439',
        any: [/CFLAG:TARGET:348 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5440-5441',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5443',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5443-5444',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5446',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:348 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5448',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5450',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5451',
        any: [/「咿…啊啊啊…能被在乳头上穿环什么的…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5452',
        any: [
          /相比起穿孔的疼痛%SAVESTR:TARGET%更为这种地方能被穿上两个环而高兴………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5454',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5455',
        any: [/「啊哈…肚脐戴上这个显得好时尚啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5456',
        any: [/相比起穿孔的疼痛%SAVESTR:TARGET%更为被穿上环而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5458',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5459',
        any: [
          /「啊…这样的地方要是被穿上环…就能一直永远的感受到主人了…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5460',
        any: [/相比起被穿孔的疼痛%SAVESTR:TARGET%更为阴唇能穿上环而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5462',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5463',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5464',
        any: [
          /「哈啊…被穿环好兴奋感觉小鸡鸡都比平时变大了似的…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5465',
        any: [/相比起被穿孔的疼痛%SAVESTR:TARGET%更为小鸡鸡能穿上环而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5465-5466',
        any: [/相比起被穿孔的疼痛%SAVESTR:TARGET%更为小鸡鸡能穿上环而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5467',
        any: [
          /「这样的地方能得到环什么的…感觉太强烈了呜…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5468',
        any: [/相比起被穿孔的疼痛%SAVESTR:TARGET%更为阴蒂能穿上环而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5468-5469',
        any: [/相比起被穿孔的疼痛%SAVESTR:TARGET%更为阴蒂能穿上环而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5471',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5472',
        any: [/「啊哎…就这样给你满满的口交啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5473',
        any: [/相比起被穿孔的疼痛%SAVESTR:TARGET%更为舌尖能穿上环而高兴………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5475',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5476',
        any: [/「嗯…唔呼呼…就这样想要满满的接吻哟…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5477',
        any: [/%SAVESTR:TARGET%舔着嘴唇上的环确认了一下情况………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5479',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5480',
        any: [/「啊哈…%SELF_CALL\(TARGET\)%好像变成了家畜一样…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5481',
        any: [/%SAVESTR:TARGET%一再抚摩着鼻环………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5481-5482',
        any: [/%SAVESTR:TARGET%一再抚摩着鼻环………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5483-5484',
        any: [/;取り外し/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5485',
        any: [/%SAVESTR:TARGET%揉着环被拆下后留下的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5485-5486',
        any: [/%SAVESTR:TARGET%揉着环被拆下后留下的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5487',
        any: [/CFLAG:348 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5489',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:348 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5491',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5493',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5494',
        any: [/「虽、虽然很痛…如果这样能让主人高兴…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5495',
        any: [/%SAVESTR:TARGET%两个乳头环紧紧的嵌了进去………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5497',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5498',
        any: [/「唔呼呼、总觉得好漂亮…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5499',
        any: [/%SAVESTR:TARGET%从四周抚摩着肚脐环………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5501',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5502',
        any: [/「哈哈…好厉害…这样的地方要是被穿上环…已经…已经…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5503',
        any: [/%SAVESTR:TARGET%对阴唇被穿环表现的相当兴奋………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5505',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5506',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5507',
        any: [/「啊呜…小鸡鸡一直勃起着了啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5508',
        any: [
          /%SAVESTR:TARGET%一边粗暴的呼着气一边因为小鸡鸡戴上了环而高高的立了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5508-5509',
        any: [
          /%SAVESTR:TARGET%一边粗暴的呼着气一边因为小鸡鸡戴上了环而高高的立了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5510',
        any: [/「啊…这样的地方被穿上环很有爱的感觉啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5511',
        any: [/%SAVESTR:TARGET%兴奋的红着脸………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5511-5512',
        any: [/%SAVESTR:TARGET%兴奋的红着脸………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5514',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5515',
        any: [/「哈哈…就这样想满满的吻…呦…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5516',
        any: [/%SAVESTR:TARGET%伸出穿了环的舌头诱惑着%SAVESTR:PLAYER%………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5518',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5519',
        any: [/「啊哈…固固的固定下来了…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5520',
        any: [/%SAVESTR:TARGET%舔着嘴唇上的环确认了一下情况………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5522',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5523',
        any: [/「总、总觉得像家畜一样……哎呀………♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5524',
        any: [
          /%SAVESTR:TARGET%不想让你看见鼻子上的环那样情不自禁的转过了脸………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5524-5525',
        any: [
          /%SAVESTR:TARGET%不想让你看见鼻子上的环那样情不自禁的转过了脸………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5526-5527',
        any: [/;取り外し/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5528',
        any: [/%SAVESTR:TARGET%寂寞的揉着环被拆下后留下的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5528-5529',
        any: [/%SAVESTR:TARGET%寂寞的揉着环被拆下后留下的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5530',
        any: [/CFLAG:348 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5532',
        any: [/ELSEIF CFLAG:348 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5534',
        any: [/IF CFLAG:7 & P/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5536',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5537',
        any: [/「讨厌啊…乳头好痛呦…对于穿环什么的哟………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5538',
        any: [/感受到乳头被穿环的痛苦%SAVESTR:TARGET%流下了屈辱的眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5540',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5541',
        any: [/「哈…啊啊…这样的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5542',
        any: [/感受到肚脐被穿环的痛苦%SAVESTR:TARGET%不停的流着眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5544',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5545',
        any: [/「不要…已经…不能去见其他人了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5546',
        any: [/感受到阴唇被穿环的痛苦%SAVESTR:TARGET%流下了屈辱的眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5548',
        any: [/ELSEIF P == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5549',
        any: [/IF TALENT:121 \|\| TALENT:122/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5550',
        any: [/「嗯嗯…小鸡鸡会…好热…好痛呦………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5551',
        any: [/感受到小鸡鸡被穿环的痛苦%SAVESTR:TARGET%流下了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5551-5552',
        any: [/感受到小鸡鸡被穿环的痛苦%SAVESTR:TARGET%流下了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5553',
        any: [/「已、已经饶了我吧…什么都可以…取想这个环吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5554',
        any: [/感受到阴蒂被穿环的痛苦%SAVESTR:TARGET%不停的流着眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5554-5555',
        any: [/感受到阴蒂被穿环的痛苦%SAVESTR:TARGET%不停的流着眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5557',
        any: [/ELSEIF P == 16/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5558',
        any: [/「哈…哈…这样…在那里………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5559',
        any: [/感受到舌头被穿环的痛苦%SAVESTR:TARGET%好像很难说话………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5561',
        any: [/ELSEIF P == 32/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5562',
        any: [/「呜…在那里………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5563',
        any: [/感受到嘴唇被穿环的痛苦%SAVESTR:TARGET%流下了屈辱的眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5565',
        any: [/ELSEIF P == 64/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5566',
        any: [/「%SELF_CALL\(TARGET\)%这个样子不是家畜是什么啊…呜呜………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5567',
        any: [
          /%SAVESTR:TARGET%不想让你看见鼻子上的环那样情不自禁的转过了脸哭了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5567-5568',
        any: [
          /%SAVESTR:TARGET%不想让你看见鼻子上的环那样情不自禁的转过了脸哭了起来………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5569-5570',
        any: [/;取り外し/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5571',
        any: [/%SAVESTR:TARGET%揉着环被拆下后留下的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5571-5572',
        any: [/%SAVESTR:TARGET%揉着环被拆下后留下的痕迹………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5573',
        any: [/CFLAG:348 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5573-5574',
        any: [/CFLAG:348 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5573-5575',
        any: [/CFLAG:348 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5573-5576',
        any: [/CFLAG:348 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5577-5580',
        any: [/;@DOG_KOJO関係（X1をキャラ番号に置換）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5583',
        any: [/@DOG_KOJO_1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5588',
        any: [/IF SELECTCOM == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5590',
        any: [/IF CFLAG:301 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5592',
        any: [/IF MARK:2 >= 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5593',
        any: [/「这样、狗的舌头……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5594-5595',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5596',
        any: [/「讨厌啊！　不要靠过来！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5596-5597',
        any: [/「讨厌啊！　不要靠过来！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5598',
        any: [/CFLAG:301 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5598-5599',
        any: [/CFLAG:301 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5600-5601',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5603',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:301 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5604',
        any: [/「啊哈、好舒服哦%UNICODE\(0x2661\) \*1%　更多的舔吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5605',
        any: [/CFLAG:301 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5607',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:301 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5608',
        any: [/「不可思议的感觉……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5609',
        any: [/CFLAG:301 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5611',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:301 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5612',
        any: [/「不可思议的感觉……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5613',
        any: [/CFLAG:301 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5615',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:301 <= 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5616',
        any: [/「呜呜……皮肤、变敏感了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5617',
        any: [/CFLAG:301 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5619',
        any: [/ELSEIF MARK:2 == 2 && \(CFLAG:301 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5620',
        any: [/「哎、哎呀！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5621',
        any: [/CFLAG:301 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5623',
        any: [/ELSEIF MARK:2 <= 1 && \(CFLAG:301 <= 1 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5624',
        any: [/「天啊……救命啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5625',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5625-5626',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5625-5627',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5625-5628',
        any: [/CFLAG:301 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5629-5632',
        any: [/;兽奸クンニ CFLAG:302/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5634',
        any: [/IF SELECTCOM == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5636',
        any: [/IF CFLAG:302 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5638',
        any: [/IF TALENT:TARGET:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5638-5639',
        any: [/IF TALENT:TARGET:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5640-5641',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5640-5642',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5643-5644',
        any: [/CFLAG:302 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5644',
        any: [/CFLAG:302 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5644-5645',
        any: [/CFLAG:302 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5646-5647',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5649',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:302 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5649-5650',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:302 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5651',
        any: [/CFLAG:302 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5653',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5653-5654',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:302 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5655',
        any: [/CFLAG:302 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5657',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5657-5658',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:302 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5659',
        any: [/CFLAG:302 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5661',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5661-5662',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:302 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5663',
        any: [/CFLAG:302 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5665',
        any: [/ELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5665-5666',
        any: [/ELSEIF CFLAG:302 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5667',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5667-5668',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5667-5669',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5667-5670',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5667-5671',
        any: [/CFLAG:302 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5677',
        any: [/IF SELECTCOM == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5679',
        any: [/IF CFLAG:306 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5681',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5681-5682',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5683-5684',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5683-5685',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5686-5687',
        any: [/CFLAG:TARGET:306 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5687',
        any: [/CFLAG:TARGET:306 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5687-5688',
        any: [/CFLAG:TARGET:306 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5689-5690',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5692',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:306 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5692-5693',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:306 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5694',
        any: [/CFLAG:306 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5696',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5696-5697',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:306 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5698',
        any: [/CFLAG:306 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5700',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5700-5701',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:306 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5702',
        any: [/CFLAG:306 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5704',
        any: [/ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5704-5705',
        any: [/ELSEIF ABL:1 >= 3 && \(CFLAG:306 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5706',
        any: [/CFLAG:306 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5708',
        any: [/ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5708-5709',
        any: [/ELSEIF CFLAG:306 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5710',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5710-5711',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5710-5712',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5710-5713',
        any: [/CFLAG:306 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5714-5717',
        any: [/;兽奸キス CFLAG:307/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5719',
        any: [/IF SELECTCOM == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5721',
        any: [/IF CFLAG:307 == 0 && TFLAG:13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5723',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5723-5724',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5726',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5726-5727',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5729',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5729-5730',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5731-5732',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5731-5733',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5734-5735',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5735',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5735-5736',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5738',
        any: [/ELSEIF CFLAG:307 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5740',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5740-5741',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5743',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5743-5744',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5746',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5746-5747',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5748-5749',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5748-5750',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5751-5752',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5752',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5752-5753',
        any: [/CFLAG:307 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5754-5755',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5757',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:307 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5757-5758',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:307 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5759',
        any: [/CFLAG:307 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5761',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5761-5762',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:307 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5763',
        any: [/CFLAG:307 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5765',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5765-5766',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:307 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5767',
        any: [/CFLAG:307 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5769',
        any: [/ELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5769-5770',
        any: [/ELSEIF ABL:10 >=2 && \(CFLAG:307 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5771',
        any: [/CFLAG:307 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5773',
        any: [/ELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5773-5774',
        any: [/ELSEIF CFLAG:307 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5775',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5775-5776',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5775-5777',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5775-5778',
        any: [/CFLAG:307 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5779-5782',
        any: [/;兽奸アナル舐め CFLAG:310/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5784',
        any: [/IF SELECTCOM == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5786',
        any: [/IF CFLAG:310 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5788',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5788-5789',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5791',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5791-5792',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5794',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5794-5795',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5796-5797',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5796-5798',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5799-5800',
        any: [/CFLAG:TARGET:310 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5800',
        any: [/CFLAG:TARGET:310 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5800-5801',
        any: [/CFLAG:TARGET:310 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5802-5803',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5805',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:310 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5805-5806',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:310 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5807',
        any: [/CFLAG:310 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5809',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5809-5810',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:310 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5811',
        any: [/CFLAG:310 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5813',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:310 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5813-5814',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:310 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5815',
        any: [/CFLAG:310 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5817',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:310 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5817-5818',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:310 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5819',
        any: [/CFLAG:310 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5821',
        any: [/ELSEIF CFLAG:310 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5821-5822',
        any: [/ELSEIF CFLAG:310 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5823',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5823-5824',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5823-5825',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5823-5826',
        any: [/CFLAG:310 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5827-5830',
        any: [/;兽奸後背位 CFLAG:322/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5832',
        any: [/IF SELECTCOM == 21/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5834',
        any: [/IF CFLAG:TARGET:322 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5836',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5838',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5839',
        any: [
          /「好吧……来了！　狗狗那样的姿势、成为一只真正的母狗！　%SELF_CALL\(TARGET\)%的、的处女就献给动物了！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5841',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5842',
        any: [/「%SELF_CALL\(TARGET\)%、简直就像是变态一样吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5844',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5845',
        any: [/「这种变态一样的行为……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5847-5848',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5849',
        any: [/「咿、讨厌啊！　饶了我……停下吧！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5849-5850',
        any: [/「咿、讨厌啊！　饶了我……停下吧！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5851-5852',
        any: [/;非処女/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5854',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5855',
        any: [/「哈、交尾！　母狗那样的姿势、真的交尾了！　哈、汪！　汪汪！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5857',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5858',
        any: [/「狗的小鸡鸡、和普通的完全不同……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5860',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5861',
        any: [/「狗的小鸡鸡……怪怪的感觉」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5862-5863',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5864',
        any: [/「讨厌、讨厌啊……停下吧！　饶了我吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5864-5865',
        any: [/「讨厌、讨厌啊……停下吧！　饶了我吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5866-5867',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5867',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5867-5868',
        any: [/CFLAG:322 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5869-5870',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5872',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:322 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5873',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5874',
        any: [/「哈、交尾！　母狗那样的姿势、真的交尾了！　哈、汪！　汪汪！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5875',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5876',
        any: [/「变成动物了！　变态的%SELF_CALL\(TARGET\)%是、是一只母狗！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5876-5877',
        any: [/「变成动物了！　变态的%SELF_CALL\(TARGET\)%是、是一只母狗！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5878',
        any: [/「我爱……动物的小鸡鸡、变态的……母狗、好喜欢动物的小鸡鸡啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5878-5879',
        any: [/「我爱……动物的小鸡鸡、变态的……母狗、好喜欢动物的小鸡鸡啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5880',
        any: [/CFLAG:322 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5882',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:322 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5883',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5884',
        any: [/「狗的小鸡鸡、插穿了……不要紧吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5885',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5886',
        any: [/「狗的小鸡鸡、插穿了……不要紧吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5886-5887',
        any: [/「狗的小鸡鸡、插穿了……不要紧吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5888',
        any: [/「狗的小鸡鸡、插穿了……不要紧吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5888-5889',
        any: [/「狗的小鸡鸡、插穿了……不要紧吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5890',
        any: [/CFLAG:322 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5892',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:322 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5893',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5894',
        any: [/「狗的小鸡鸡……总觉得绝望了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5895',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5896',
        any: [/「狗的小鸡鸡……总觉得绝望了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5896-5897',
        any: [/「狗的小鸡鸡……总觉得绝望了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5898',
        any: [/「狗的小鸡鸡……总觉得绝望了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5898-5899',
        any: [/「狗的小鸡鸡……总觉得绝望了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5900',
        any: [/CFLAG:322 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5902',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:322 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5903',
        any: [/「呜呜……有感觉了……明明是野兽……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5904',
        any: [/CFLAG:322 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5906',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:322 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5907',
        any: [/「呜呜……指甲抓到好痛啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5908',
        any: [/CFLAG:322 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5910',
        any: [/ELSEIF CFLAG:322 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5911',
        any: [/「咿、不要、哎呀！　讨厌！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5913',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5913-5914',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5913-5915',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5913-5916',
        any: [/CFLAG:322 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5917-5920',
        any: [/;獣姦後背位アナル CFLAG:328/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5922',
        any: [/IF SELECTCOM == 27/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5924',
        any: [/IF CFLAG:TARGET:328 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5926',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5927',
        any: [/「用菊花做吗……好的、已经准备好了哦……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5929',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5930',
        any: [/「明白了……用菊花就可以了对吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5932',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5933',
        any: [/「明白了……用菊花就可以了对吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5934-5935',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5936',
        any: [/「什么、这样子……哪里搞错了吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5936-5937',
        any: [/「什么、这样子……哪里搞错了吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5938',
        any: [/CFLAG:TARGET:328 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5938-5939',
        any: [/CFLAG:TARGET:328 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5940-5941',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5943',
        any: [
          /IF TALENT:TARGET:136 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5944',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5945',
        any: [/「嗯…呃……要变成畜生肉棒的形状了……菊花要变成狗专用的了……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5945-5946',
        any: [/「嗯…呃……要变成畜生肉棒的形状了……菊花要变成狗专用的了……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5947',
        any: [/「嗯…哦哦……菊花被畜生肉棒弄得要去了……啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5947-5948',
        any: [/「嗯…哦哦……菊花被畜生肉棒弄得要去了……啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5949',
        any: [/CFLAG:328 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5951',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5952',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5953',
        any: [/「竟然因为狗……有感觉了……要去……了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5953-5954',
        any: [/「竟然因为狗……有感觉了……要去……了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5955',
        any: [/「不要啊……不要继续了、不想变成变态……啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5955-5956',
        any: [/「不要啊……不要继续了、不想变成变态……啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5957',
        any: [/CFLAG:328 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5959',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:3 >= 3 && \(CFLAG:328 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5960',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5961',
        any: [/「菊花感觉好奇怪……到底怎么了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5961-5962',
        any: [/「菊花感觉好奇怪……到底怎么了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5963',
        any: [/「竟然因为狗……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5963-5964',
        any: [/「竟然因为狗……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5965',
        any: [/CFLAG:328 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5967',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:328 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5968',
        any: [/「不要……要被狗……把菊花玩坏了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5969',
        any: [/CFLAG:328 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5971',
        any: [/ELSEIF ABL:3 >= 3 && \(CFLAG:328 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5972',
        any: [
          /「嗯…啊啊啊……不要……不要继续对%SELF_CALL\(TARGET, 1\)%做这种变态的事了……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5973',
        any: [/CFLAG:328 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5975',
        any: [/ELSEIF  CFLAG:328 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5976',
        any: [/「好痛……好苦……呜……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5977',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5977-5978',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5977-5979',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5977-5980',
        any: [/CFLAG:328 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5981-5984',
        any: [/;兽奸手淫 CFLAG:331/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5986',
        any: [/IF SELECTCOM == 30/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5988',
        any: [/IF CFLAG:TARGET:331 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5990',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5991',
        any: [/「呜哇……竟然一跳一跳的呢……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5993',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5994',
        any: [/「呜哇……竟然一跳一跳的呢……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5996',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5997',
        any: [/「呜呜……只要做就好了吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '5998-5999',
        any: [/;それ以外（奉仕精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6000',
        any: [/「呜呜……脏兮兮的……好臭……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6000-6001',
        any: [/「呜呜……脏兮兮的……好臭……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6002',
        any: [/CFLAG:TARGET:331 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6002-6003',
        any: [/CFLAG:TARGET:331 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6004-6005',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6007',
        any: [
          /IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 6 \|\| FLAG:7 == /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6008',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6009',
        any: [/「啊啊……这个野兽的雄臭……在脑子里回荡呢」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6009-6010',
        any: [/「啊啊……这个野兽的雄臭……在脑子里回荡呢」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6011',
        any: [/「舒服吗？　更加激烈一点了哟♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6011-6012',
        any: [/「舒服吗？　更加激烈一点了哟♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6013',
        any: [/CFLAG:331 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6015',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 5 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6016',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6017',
        any: [/「奇怪的感觉……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6017-6018',
        any: [/「奇怪的感觉……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6019',
        any: [/「奇怪的感觉……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6019-6020',
        any: [/「奇怪的感觉……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6021',
        any: [/CFLAG:331 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6023',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:331 <= 4 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6024',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6025',
        any: [/「奇怪的感觉……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6025-6026',
        any: [/「奇怪的感觉……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6027',
        any: [/「奇怪的感觉……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6027-6028',
        any: [/「奇怪的感觉……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6029',
        any: [/CFLAG:331 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6031',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 3 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6032',
        any: [/「奇怪的感觉……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6033',
        any: [/CFLAG:331 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6035',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 3 && \(CFLAG:331 <= 2 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6036',
        any: [/「我做……我做就好了吧……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6037',
        any: [/CFLAG:331 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6039',
        any: [/ELSEIF CFLAG:331 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6040',
        any: [/「呜恶……脏死了……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6041',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6041-6042',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6041-6043',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6041-6044',
        any: [/CFLAG:331 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6045-6048',
        any: [/;兽奸フェラチオ CFLAG:332/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6050',
        any: [/IF SELECTCOM == 31/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6052',
        any: [/IF CFLAG:TARGET:332 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6054',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6055',
        any: [/「拿、拿出勇气来……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6057',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6058',
        any: [/「拿、拿出勇气来……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6060',
        any: [/ELSEIF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6061',
        any: [/「不行……做不到啦……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6062-6063',
        any: [/;それ以外（奉仕精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6064',
        any: [/「不要……不要啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6064-6065',
        any: [/「不要……不要啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6066',
        any: [/CFLAG:TARGET:332 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6066-6067',
        any: [/CFLAG:TARGET:332 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6068-6069',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6071',
        any: [
          /IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 6 \|\| FLAG:7 == /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6072',
        any: [/「犬大人的狗肉棒、好好吃……♪　野兽的味道、好浓烈♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6073',
        any: [/CFLAG:332 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6075',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 5 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6076',
        any: [/「呜呼……咻唔……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6077',
        any: [/CFLAG:332 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6079',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:332 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6080',
        any: [/「呜呼……咻唔…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6081',
        any: [/CFLAG:332 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6083',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:332 <= 3 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6084',
        any: [/「呜呼……咻唔……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6085',
        any: [/CFLAG:332 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6087',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:332 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6088',
        any: [/「做不到……做不到的啦……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6089',
        any: [/CFLAG:332 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6091',
        any: [/ELSEIF CFLAG:332 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6092',
        any: [/「呜恶……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6093',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6093-6094',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6093-6095',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6093-6096',
        any: [/CFLAG:332 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6097-6100',
        any: [/;兽奸騎乗位 CFLAG:335/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6102',
        any: [/IF SELECTCOM == 34/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6104',
        any: [/IF CFLAG:TARGET:335 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6106',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6108',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6108-6109',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6111',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6111-6112',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6114',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6114-6115',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6116-6117',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6116-6118',
        any: [/;それ以外（愛無し）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6119-6120',
        any: [/;非処女/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6120-6121',
        any: [/;非処女/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6123',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6123-6124',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6126',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6126-6127',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6129',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6129-6130',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6131-6132',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6131-6133',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6134-6136',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6135-6136',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6136',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6136-6137',
        any: [/CFLAG:TARGET:335 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6138-6139',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6141',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:335 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6142',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6142-6143',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6144',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6144-6145',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6144-6146',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6147-6149',
        any: [/CFLAG:335 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6148-6149',
        any: [/CFLAG:335 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6149',
        any: [/CFLAG:335 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6151',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:335 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6152',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6152-6153',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6154',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6154-6155',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6156',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6156-6157',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6156-6158',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6159-6161',
        any: [/CFLAG:335 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6160-6161',
        any: [/CFLAG:335 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6161',
        any: [/CFLAG:335 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6163',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:335 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6164',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6164-6165',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6166',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6166-6167',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6168',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6168-6169',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6168-6170',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6171-6173',
        any: [/CFLAG:335 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6172-6173',
        any: [/CFLAG:335 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6173',
        any: [/CFLAG:335 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6175',
        any: [
          /ELSEIF MARK:2 == 3 && ABL:2 >= 3 && \(CFLAG:335 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6176',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6176-6177',
        any: [/IF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6178',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6178-6179',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6180',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6180-6181',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6180-6182',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6183-6185',
        any: [/CFLAG:335 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6184-6185',
        any: [/CFLAG:335 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6185',
        any: [/CFLAG:335 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6187',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6187-6188',
        any: [/ELSEIF MARK:2 == 3 && \(CFLAG:335 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6189-6190',
        any: [/CFLAG:335 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6190',
        any: [/CFLAG:335 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6192',
        any: [/ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6192-6193',
        any: [/ELSEIF CFLAG:335 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6194',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6194-6195',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6194-6196',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6194-6197',
        any: [/CFLAG:335 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6198-6201',
        any: [/;獣姦アナル奉仕 CFLAG:338/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6203',
        any: [/IF SELECTCOM == 37/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6205',
        any: [/IF CFLAG:TARGET:338 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6207',
        any: [/IF ABL:TARGET:16 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6208',
        any: [/「明白了啦……唔……真、要这样吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6209-6210',
        any: [/;それ以外（奉仕精神Lv3未満）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6211',
        any: [/「不、不是吧？　真、要这样吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6211-6212',
        any: [/「不、不是吧？　真、要这样吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6213',
        any: [/CFLAG:TARGET:338 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6213-6214',
        any: [/CFLAG:TARGET:338 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6215-6216',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6218',
        any: [
          /IF TALENT:TARGET:136 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 5 \|\| FLAG:7 == /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6219',
        any: [/「来让我亲一口……骗你的。啾♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6220',
        any: [/CFLAG:338 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6222',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 4 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6223',
        any: [/「明白了……会好好服侍的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6224',
        any: [/CFLAG:338 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6226',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:TARGET:16 >= 5 && \(CFLAG:338 <= 3 \|\| FLAG:7 /,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6227',
        any: [/「明白了……会好好服侍的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6228',
        any: [/CFLAG:338 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6230',
        any: [
          /ELSEIF ABL:TARGET:16 >= 3 && \(CFLAG:338 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6231',
        any: [/「这也是服侍的一种……吗」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6232',
        any: [/CFLAG:338 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6234',
        any: [/ELSEIF CFLAG:338 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6235',
        any: [/「骗人的吧……不、不要啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6236',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6236-6237',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6236-6238',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6236-6239',
        any: [/CFLAG:338 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6240-6243',
        any: [/;兽奸アイマスク CFLAG:344　CFLAG:444/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6246',
        any: [/IF SELECTCOM == 43 && TEQUIP:43/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6248',
        any: [/IF CFLAG:TARGET:344 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6250',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6250-6251',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6253',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6253-6254',
        any: [/ELSEIF TALENT:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6256',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6256-6257',
        any: [/ELSEIF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6258-6259',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6258-6260',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6261-6262',
        any: [/CFLAG:TARGET:344 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6262',
        any: [/CFLAG:TARGET:344 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6262-6263',
        any: [/CFLAG:TARGET:344 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6264-6265',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6267',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:344 <= 9 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6267-6268',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:344 <= 9 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6269',
        any: [/CFLAG:TARGET:344 = 10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6271',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6271-6272',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 8 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6273',
        any: [/CFLAG:TARGET:344 = 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6275',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6275-6276',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 7 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6277',
        any: [/CFLAG:TARGET:344 = 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6279',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:344 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6279-6280',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:344 <= 6 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6281',
        any: [/CFLAG:TARGET:344 = 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6283',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6283-6284',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 5 && \(CFLAG:344 <= 5 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6285',
        any: [/CFLAG:TARGET:344 = 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6287',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6287-6288',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && ABL:21 >= 3 && \(CFLAG:344 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6289',
        any: [/CFLAG:TARGET:344 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6291',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:344 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6291-6292',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:344 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6293',
        any: [/CFLAG:TARGET:344 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6295',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:344 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6295-6296',
        any: [/ELSEIF ABL:21 >= 3 && \(CFLAG:344 <= 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6297',
        any: [/CFLAG:TARGET:344 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6299',
        any: [/ELSEIF CFLAG:344 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6299-6300',
        any: [/ELSEIF CFLAG:344 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6301',
        any: [/CFLAG:TARGET:344 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6301-6302',
        any: [/CFLAG:TARGET:344 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6301-6303',
        any: [/CFLAG:TARGET:344 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6304-6305',
        any: [/;終了時/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6306',
        any: [/ELSEIF SELECTCOM == 43 && TEQUIP:43 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6308',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:338 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6308-6309',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:338 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6310',
        any: [/CFLAG:444 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6312',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:338 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6312-6313',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:338 < 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6314',
        any: [/CFLAG:444 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6316',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:338 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6316-6317',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:338 < 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6318',
        any: [/CFLAG:444 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6320',
        any: [/ELSEIF CFLAG:444 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6320-6321',
        any: [/ELSEIF CFLAG:444 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6322',
        any: [/CFLAG:444 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6322-6323',
        any: [/CFLAG:444 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6322-6324',
        any: [/CFLAG:444 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6322-6325',
        any: [/CFLAG:444 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6331',
        any: [/IF SELECTCOM == 56/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6333',
        any: [/IF CFLAG:357 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6334',
        any: [/IF TEQUIP:53/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6337',
        any: [/%NAME:MASTER%催促着%SAVESTR:TARGET%开始自我介绍、/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6338',
        any: [/IF TALENT:TARGET:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6339',
        any: [
          /%SAVESTR:TARGET%对着水晶球用像卑猥的哈巴狗那样的姿势开始自我介绍。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6340',
        any: [
          /「初次见面请多关照！　%SAVESTR:TARGET%呢。放弃了继续作为%GET_LOOK_INFO\(TARGET, "种族"\)%的一员！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6341',
        any: [/「现在是优秀的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6342',
        any: [/IF CFLAG:TARGET:601 == 900/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6344',
        any: [/PRINT 狗的妻子/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6344-6345',
        any: [/PRINT 狗的妻子/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6346',
        any: [/PRINT 母狗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6346-6347',
        any: [/PRINT 母狗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6348',
        any: [/！快乐的作为家畜生活着%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6349',
        any: [
          /「这样变态的交尾姿势还真是对不起呢。但是%SELF_CALL\(TARGET\)%很幸福哟」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6350',
        any: [
          /「请看吧%SELF_CALL\(TARGET\)%真的交尾喽、小鸡鸡叽咕叽咕的做吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6351',
        any: [/「在最后/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6352',
        any: [/IF TALENT:成为勇者前的生活 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6354',
        any: [/PRINT 同班同学的大家/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6355',
        any: [/ELSEIF TALENT:成为勇者前的生活 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6357',
        any: [/PRINT 修道院的大家/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6358',
        any: [
          /ELSEIF TALENT:成为勇者前的生活 == 15 \|\| TALENT:成为勇者前的生活 == 18/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6360',
        any: [/在%SELF_CALL\(TARGET\)%的店里消费过的客人/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6361',
        any: [/ELSEIF TALENT:成为勇者前的生活 == 19/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6363',
        any: [/PRINT 部下的大家/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6364',
        any: [/ELSEIF TALENT:成为勇者前的生活 == 21/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6366',
        any: [/PRINT 最重要的你/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6366-6367',
        any: [/PRINT 最重要的你/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6369',
        any: [/PRINT 爸爸、妈妈/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6369-6370',
        any: [/PRINT 爸爸、妈妈/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6371',
        any: [/、我成为了这样的变态母狗……对不起啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6373',
        any: [/ELSEIF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6374',
        any: [/%SAVESTR:TARGET%说出了自己的本名和至今为止关于性的体验/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6376',
        any: [/、更说出了在自慰的时候意淫的内容、/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6377',
        any: [/高兴地开始津津有味的说了起来……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6378',
        any: [/只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6380',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6381',
        any: [/%SAVESTR:TARGET%说出了自己的本名和至今为止关于性的体验/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6383',
        any: [/、更说出了在自慰的时候意淫的内容、/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6384',
        any: [/开始高兴地讲着……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6385',
        any: [/只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6386-6387',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6388',
        any: [
          /%SAVESTR:TARGET%在旁边什么话也不想说了但是当得知水晶球要被送回故乡后吓得脸都绿了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6389',
        any: [/「要…要把录像送回故乡………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6390',
        any: [/「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6390-6391',
        any: [/「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6392-6393',
        any: [/CFLAG:357 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6393',
        any: [/CFLAG:357 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6393-6394',
        any: [/CFLAG:357 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6395-6396',
        any: [/;二回目以降/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6397',
        any: [/IF TEQUIP:53/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6400',
        any: [
          /IF TALENT:TARGET:136 == 1 && \(CFLAG:357 <= 4 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6401',
        any: [
          /%SAVESTR:TARGET%对着水晶球用像卑猥的哈巴狗那样的姿势开始自我介绍。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6402',
        any: [
          /「大家好！　%SAVESTR:TARGET%呢。放弃了继续作为%GET_LOOK_INFO\(TARGET, "种族"\)%的一员！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6403',
        any: [/「现在是优秀的/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6404',
        any: [/IF CFLAG:TARGET:601 == 900/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6406',
        any: [/PRINT 狗的妻子/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6406-6407',
        any: [/PRINT 狗的妻子/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6408',
        any: [/PRINT 母狗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6408-6409',
        any: [/PRINT 母狗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6410',
        any: [/、快乐的作为家畜生活着%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6411',
        any: [
          /「这样变态的交尾姿势还真是对不起呢。但是%SELF_CALL\(TARGET\)%很幸福哟」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6412',
        any: [
          /「请看吧%SELF_CALL\(TARGET\)%真的交尾喽、小鸡鸡叽咕叽咕的做吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6413',
        any: [/「在最后/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6414',
        any: [/IF TALENT:成为勇者前的生活 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6416',
        any: [/PRINT 同班同学的大家/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6417',
        any: [/ELSEIF TALENT:成为勇者前的生活 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6419',
        any: [/PRINT 修道院的大家/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6420',
        any: [
          /ELSEIF TALENT:成为勇者前的生活 == 15 \|\| TALENT:成为勇者前的生活 == 18/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6422',
        any: [/在%SELF_CALL\(TARGET\)%的店里消费过的客人/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6423',
        any: [/ELSEIF TALENT:成为勇者前的生活 == 19/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6425',
        any: [/PRINT 部下的大家/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6426',
        any: [/ELSEIF TALENT:成为勇者前的生活 == 21/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6428',
        any: [/PRINT 最重要的你/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6428-6429',
        any: [/PRINT 最重要的你/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6431',
        any: [/PRINT 爸爸、妈妈/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6431-6432',
        any: [/PRINT 爸爸、妈妈/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6433',
        any: [/、我成为了这样的变态母狗……对不起啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6434',
        any: [/CFLAG:357 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6436',
        any: [
          /ELSEIF TALENT:TARGET:76 == 1 && \(CFLAG:357 <= 3 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6437',
        any: [/%SAVESTR:TARGET%说出了自己的本名和至今为止关于性的体验/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6439',
        any: [/、更说出了在自慰的时候意淫的内容、/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6440',
        any: [/高兴地开始津津有味的说了起来……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6441',
        any: [/只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6442',
        any: [/CFLAG:357 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6444',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(CFLAG:357 <= 2 \|\| FLAG:7 == 2\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6445',
        any: [/%SAVESTR:TARGET%说出了自己的本名和至今为止关于性的体验/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6447',
        any: [/、更说出了在自慰的时候意淫的内容、/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6448',
        any: [/高兴地开始津津有味的说了起来……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6449',
        any: [/只是想想这个水晶球在故乡公开放映的样子股间就开始湿了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6450',
        any: [/CFLAG:357 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6452',
        any: [/ELSEIF CFLAG:357 <= 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6453',
        any: [
          /%SAVESTR:TARGET%在旁边什么话也不想说了但是当得知水晶球要被送回故乡后吓得脸都绿了。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6454',
        any: [/「要…要把录像送回故乡………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6455',
        any: [/「这样讨厌啦…只、只有这个饶了我吧…啊啊啊…那样的事！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6456',
        any: [/CFLAG:357 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6456-6457',
        any: [/CFLAG:357 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6456-6458',
        any: [/CFLAG:357 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6456-6459',
        any: [/CFLAG:357 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6456-6460',
        any: [/CFLAG:357 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6456-6461',
        any: [/CFLAG:357 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6464-6467',
        any: [/;@KOJO_MESSAGE_PALAMCNG関係（X1をキャラ番号に置換）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6471',
        any: [/@KOJO_MESSAGE_PALAMCNG_1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6476-6477',
        any: [/SIF TEQUIP:45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6479-6480',
        any: [/SIF TFLAG:899/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6482-6483',
        any: [/SIF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6485-6486',
        any: [/SIF TEQUIP:89/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6488-6489',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6491-6492',
        any: [/SIF TEQUIP:55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6501',
        any: [/P = PALAM:3 \+ UP:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6502',
        any: [/IF P > PALAMLV:2 && CFLAG:TARGET:221 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6504',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6506',
        any: [/IF SELECTCOM == 50/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6507',
        any: [/「呜哇…好厉害…这样的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6508',
        any: [/―――第一次润滑超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6509-6510',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6511',
        any: [/「啊…不、不要…%SELF_CALL\(TARGET\)%、好像非常兴奋啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6512',
        any: [/―――第一次润滑超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6512-6513',
        any: [/―――第一次润滑超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6514-6515',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6517',
        any: [/IF SELECTCOM == 50/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6518',
        any: [/「呜哇…太滑了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6519',
        any: [/―――第一次润滑超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6520-6521',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6522',
        any: [/「咿嗯…咿、不、不一样的…这、这是…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6523',
        any: [/―――第一次润滑超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6523-6524',
        any: [/―――第一次润滑超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6525-6526',
        any: [/CFLAG:TARGET:221 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6526',
        any: [/CFLAG:TARGET:221 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6526-6527',
        any: [/CFLAG:TARGET:221 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6532',
        any: [/P = PALAM:5 \+ UP:5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6533',
        any: [/IF P > PALAMLV:2 && CFLAG:222 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6535',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6537',
        any: [/IF SELECTCOM == 51/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6538',
        any: [/「咿…身体…咿…好熱…这样的…啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6539',
        any: [/―――第一次欲情超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6540-6541',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6542',
        any: [/「哈…哈…%SELF_CALL\(TARGET\)%、%SELF_CALL\(TARGET\)%…哦嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6543',
        any: [/―――第一次欲情超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6543-6544',
        any: [/―――第一次欲情超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6545-6546',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6548',
        any: [/IF SELECTCOM == 51/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6549',
        any: [/「这、这样…总觉得…身体…好怪异…咿…不一样的…不一样的啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6550',
        any: [/―――第一次欲情超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6551-6552',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6553',
        any: [/「哈…啊啊…啊啊…想要…好想要…啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6554',
        any: [/―――第一次欲情超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6554-6555',
        any: [/―――第一次欲情超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6556-6557',
        any: [/CFLAG:222 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6557',
        any: [/CFLAG:222 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6557-6558',
        any: [/CFLAG:222 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6563',
        any: [/P = PALAM:8 \+ UP:8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6564',
        any: [/IF P > PALAMLV:2 && CFLAG:223 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6566',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6567',
        any: [/「不行了…不要看…求你不要看啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6568',
        any: [/―――第一次恥情超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6569-6570',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6571',
        any: [/「啊啊啊…羞死了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6572',
        any: [/―――第一次恥情超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6572-6573',
        any: [/―――第一次恥情超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6574',
        any: [/CFLAG:223 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6574-6575',
        any: [/CFLAG:223 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6580',
        any: [/P = PALAM:10 \+ UP:10/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6581',
        any: [/IF P > PALAMLV:2 && CFLAG:224 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6583',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6584',
        any: [/「求你了…停下吧…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6585',
        any: [/―――第一次恐怖超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6586-6587',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6588',
        any: [/「咿…咿嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6589',
        any: [/―――第一次恐怖超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6589-6590',
        any: [/―――第一次恐怖超过了LV 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6591',
        any: [/CFLAG:224 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6591-6592',
        any: [/CFLAG:224 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6597',
        any: [/IF NOWEX:0 > 0 && CFLAG:225 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6599',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6600',
        any: [/「咿呀啊啊！…那里再这么玩弄不行哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6601',
        any: [/显然% SAVESTR : TARGET %是第一次被刺激阴蒂绝顶吧。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6602-6603',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6604',
        any: [/「咕…咿咿！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6605',
        any: [/显然% SAVESTR : TARGET %是第一次被刺激阴蒂绝顶吧。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6605-6606',
        any: [/显然% SAVESTR : TARGET %是第一次被刺激阴蒂绝顶吧。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6607',
        any: [/CFLAG:225 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6607-6608',
        any: [/CFLAG:225 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6613',
        any: [/IF NOWEX:1 > 0 && CFLAG:226 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6615',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6616',
        any: [/「啊啊啊…小穴来了…啊啊啊…来了来了啊…你在做什么啦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6617',
        any: [/「呜咿…啊啊啊啊啊啊啊啊啊哈啊啊啊啊啊啊咿～～！！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6618',
        any: [/%SAVESTR:TARGET%第一次用阴道高潮了、脸上露出幸福的潮红………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6620',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6621',
        any: [/「不行了不行了！不要再这么欺负小穴了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6622',
        any: [/「啊呀！呀…啊啊啊…呀呀！那样呜呜呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6623',
        any: [
          /%SAVESTR:TARGET%的阴道第一次绝顶…紧闭着眼睛要忍耐什么一样浑身发抖………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6624-6625',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6626',
        any: [/「小穴…要坏掉了…坏掉了呜…已经、饶了我…咿～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6627',
        any: [
          /%SAVESTR:TARGET%的阴道第一次绝顶…把高潮的身体交给了%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6627-6628',
        any: [
          /%SAVESTR:TARGET%的阴道第一次绝顶…把高潮的身体交给了%SAVESTR:PLAYER%………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6629',
        any: [/CFLAG:TARGET:226 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6629-6630',
        any: [/CFLAG:TARGET:226 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6635',
        any: [/IF NOWEX:2 > 0 && CFLAG:227 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6637',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6638',
        any: [/「哦哦…肛门好热啊…融化了呜嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6639',
        any: [/「啊呀啊啊啊…肛门要变成屁股小穴了呜嗯！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6640',
        any: [
          /%SAVESTR:TARGET%第一次用肛门绝顶了、这种快乐再也无法忘记了吧………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6642',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6643',
        any: [/「啊啊啊啊…屁股小穴…不要再欺负了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6644',
        any: [/「咿嗯！肛门融化了呜呜呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6645',
        any: [/%SAVESTR:TARGET%第一次用肛门绝顶了、羞耻的颤抖着身体………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6646-6647',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6648',
        any: [/「求你了…不行了…再被欺负的话…啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6649',
        any: [/「屁股小穴…变成笨蛋了呜呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6650',
        any: [
          /%SAVESTR:TARGET%第一次用肛门绝顶了、暴露出了从嘴里流着口水的可耻的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6650-6651',
        any: [
          /%SAVESTR:TARGET%第一次用肛门绝顶了、暴露出了从嘴里流着口水的可耻的样子………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6652',
        any: [/CFLAG:227 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6652-6653',
        any: [/CFLAG:227 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6658',
        any: [/IF NOWEX:3 > 0 && CFLAG:228 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6660',
        any: [/IF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6661',
        any: [/「啊…啊啊啊咕嗯嗯…乳房…乳房好棒…更多…还要更多♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6662',
        any: [/「啊啊啊啊♪…好爽哦…融化了…融化了呜…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6663',
        any: [/%SAVESTR:TARGET%在乳房的刺激下第一次绝顶了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6664-6665',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6666',
        any: [/「咿这样不行了不行了！乳房被玩弄了…啊不行了哇！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6667',
        any: [/%SAVESTR:TARGET%在乳房的刺激下第一次绝顶了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6667-6668',
        any: [/%SAVESTR:TARGET%在乳房的刺激下第一次绝顶了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6669',
        any: [/CFLAG:TARGET:228 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6669-6670',
        any: [/CFLAG:TARGET:228 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6675',
        any: [/A = UP:11 \+ UP:12/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6676',
        any: [/IF TFLAG:3 == 1 && CFLAG:229 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6678',
        any: [/IF TFLAG:20 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6680',
        any: [/IF TALENT:TARGET:76 == 1 && \(A < 500 \|\| TFLAG:150 == 1\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6681',
        any: [/「啊哈…贞洁奉献给主人了啊…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6682',
        any: [/「从今往后啊…这里更多的…给我调教吧%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6684',
        any: [
          /ELSEIF TALENT:TARGET:85 == 1 && \(A < 500 \|\| TFLAG:150 == 1\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6685',
        any: [/「唔呼呼…原勇者的处女的味道怎么样呢…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6686',
        any: [/「这样%SELF_CALL\(TARGET\)%就是…主人的东西了…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6687-6688',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6689',
        any: [/「哈…哈…咕…好痛…咿…停、停止吧…哎………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6690',
        any: [/坚强的%SAVESTR:TARGET%也被破瓜疼的洒了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6690-6691',
        any: [/坚强的%SAVESTR:TARGET%也被破瓜疼的洒了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6692-6693',
        any: [/;主人以外による処女喪失/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6695',
        any: [/IF TALENT:TARGET:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6696',
        any: [/「啊…终于失去了贞洁了啊…唔呼呼…不过那样的事无论如何都好………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6697',
        any: [
          /「%SELF_CALL\(TARGET\)%的淫乱小穴…想要更多的調教…想要变的更加堕落…%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6699',
        any: [/ELSEIF TALENT:TARGET:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6700',
        any: [/「啊啊…这个贞洁…我认为就是为了能被主人的小鸡鸡夺走………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6701',
        any: [/%SAVESTR:TARGET%很可惜似的嘟哝着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6702-6703',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6704',
        any: [/「啊…啊啊啊…痛……好痛啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6705',
        any: [/坚强的%SAVESTR:TARGET%也被破瓜疼的洒了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6705-6706',
        any: [/坚强的%SAVESTR:TARGET%也被破瓜疼的洒了眼泪………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6707-6708',
        any: [/CFLAG:TARGET:229 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6708',
        any: [/CFLAG:TARGET:229 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6708-6709',
        any: [/CFLAG:TARGET:229 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6716',
        any: [/@KOJO_MESSAGE_MARKCNG_1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6718-6719',
        any: [/SIF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6721-6722',
        any: [/SIF TEQUIP:45/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6724-6725',
        any: [/SIF TFLAG:899/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6727-6728',
        any: [/SIF TEQUIP:89/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6730-6731',
        any: [/SIF TEQUIP:90/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6733-6734',
        any: [/SIF TALENT:TARGET:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6739',
        any: [/IF TFLAG:22 == 3 && CFLAG:297 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6741',
        any: [/IF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6742',
        any: [/「啊…咕…这、这样的…完全没关系…总觉得…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6742-6743',
        any: [/「啊…咕…这、这样的…完全没关系…总觉得…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6744',
        any: [/「啊啊啊…再…痛…啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6744-6745',
        any: [/「啊啊啊…再…痛…啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6746',
        any: [/CFLAG:297 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6746-6747',
        any: [/CFLAG:297 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6752',
        any: [/IF TFLAG:23 == 3 && CFLAG:298 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6754',
        any: [/IF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6755',
        any: [/「嗯…呼…主人啊…舒服…的动不了了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6755-6756',
        any: [/「嗯…呼…主人啊…舒服…的动不了了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6757',
        any: [/「咿…咿…咿…太舒服了…不要碰啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6757-6758',
        any: [/「咿…咿…咿…太舒服了…不要碰啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6759',
        any: [/CFLAG:298 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6759-6760',
        any: [/CFLAG:298 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6765',
        any: [/IF TFLAG:24 == 3 && CFLAG:299 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6767',
        any: [/IF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6768',
        any: [/「主人…效忠…我发誓…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6768-6769',
        any: [/「主人…效忠…我发誓…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6770',
        any: [/「已、已经…不能违抗…不能违抗了哈呀………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6770-6771',
        any: [/「已、已经…不能违抗…不能违抗了哈呀………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6772',
        any: [/CFLAG:299 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6772-6773',
        any: [/CFLAG:299 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6778',
        any: [/IF TFLAG:21 == 3 && CFLAG:300 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6780',
        any: [/IF TALENT:85 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6781',
        any: [/「咕…嗯嗯…为什么要…做这种事情…………不能原谅」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6781-6782',
        any: [/「咕…嗯嗯…为什么要…做这种事情…………不能原谅」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6783',
        any: [/「哇…呼…一、一定会杀了你………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6783-6784',
        any: [/「哇…呼…一、一定会杀了你………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6785',
        any: [/CFLAG:300 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6785-6786',
        any: [/CFLAG:300 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6792',
        any: [/@SELF_KOJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6796',
        any: [/IF TFLAG:13 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6798',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6799',
        any: [/%SAVESTR:TARGET%像坏了的玩具似的疯狂的自慰着………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6801',
        any: [/ELSEIF Q == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6802',
        any: [/「啊哈…那孩子的手指…太棒了…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6803',
        any: [
          /%SAVESTR:TARGET%就像在追寻着%SAVESTR:ASSI%的痕迹一样用手指抚摸着秘处………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6805',
        any: [/ELSEIF Q == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6806',
        any: [/「嗯…呜嗯…好像要狗狗的………%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6807',
        any: [/%SAVESTR:TARGET%用自己的手指自慰似乎完全不够………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6808-6809',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6811',
        any: [/IF TALENT:76 && \(CFLAG:261 < 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6812',
        any: [
          /「啊啊啊…身体好热…呜呜…不是的…%SELF_CALL\(TARGET\)%…手淫最喜欢了…啊啊啊啊%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6813',
        any: [/「哇…嗯嗯…啊啊啊…手指…不够么…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6814',
        any: [/CFLAG:261 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6816',
        any: [/ELSEIF TALENT:85 && \(CFLAG:261 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6817',
        any: [/「嗯…哈…哈…主人啊…还想要更多更多…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6818',
        any: [/「啊…嗯…不够…不够哟………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6819',
        any: [/CFLAG:261 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6821',
        any: [/ELSEIF ABL:31 >= 3 && \(CFLAG:261 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6822',
        any: [/「啊啊啊啊…不行了…手停不下来…咕啾咕啾这么舒服哎！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6823',
        any: [/CFLAG:261 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6825',
        any: [/ELSEIF CFLAG:261 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6826',
        any: [/「啊…身体好痛…无法忍受啊…这全部都………是魔王的错啊…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6827',
        any: [/CFLAG:261 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6827-6828',
        any: [/CFLAG:261 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6827-6829',
        any: [/CFLAG:261 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6827-6830',
        any: [/CFLAG:261 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6835',
        any: [/IF TFLAG:13 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6837',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6838',
        any: [/%SAVESTR:ASSI%和坏掉了的%SAVESTR:TARGET%颓废享受着女同游戏………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6840',
        any: [/ELSEIF TALENT:76 && \(CFLAG:262 < 5 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6841',
        any: [/「哈…女孩们互相慰藉吧…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6842',
        any: [/「会一直疼爱你的直到你混乱了的%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6843',
        any: [/CFLAG:262 = 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6845',
        any: [/ELSEIF TALENT:85 && \(CFLAG:262 < 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6846',
        any: [/「呼呼…真是对不起今天由我来代替主人…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6847',
        any: [/「啊啊啊…不过和你的话…也不错…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6848',
        any: [/CFLAG:262 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6850',
        any: [/ELSEIF ABL:33 >= 3 && \(CFLAG:262 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6851',
        any: [/「啊啊啊…女孩子之间这样也不错啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6852',
        any: [/「更多更多！一起融化吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6853',
        any: [/CFLAG:262 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6855',
        any: [/ELSEIF ABL:22 >= 3 && \(CFLAG:262 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6856',
        any: [/「唔呼呼…女孩之间这么舒服…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6857',
        any: [/CFLAG:262 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6859',
        any: [/ELSEIF CFLAG:262 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6860',
        any: [/「啊…嗯…哎呀…女孩之间什么的…咿！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6861',
        any: [/CFLAG:262 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6861-6862',
        any: [/CFLAG:262 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6861-6863',
        any: [/CFLAG:262 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6868',
        any: [/IF TFLAG:13 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6870',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6871',
        any: [/「呼…早上好咕…早上喝牛奶…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6872',
        any: [/%SAVESTR:TARGET%一副痴呆的表情舔着小鸡鸡寻找着精液………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6874',
        any: [/ELSEIF TALENT:76 == 1 && \(CFLAG:263 < 4 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6875',
        any: [
          /「呜咕…嗯噗…呜啾啾噜%UNICODE\(0x2661\) \*1% 啾啪…咕噜…呜咕嗯嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6876',
        any: [/%SAVESTR:TARGET%专心致志的吞吐着小鸡鸡…你醒来了也没有察觉………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6877',
        any: [
          /「嗯嗯…咕啊咿…啊啊、从早上开始就这么精神%UNICODE\(0x2661\) \*1%…嗯嗯%UNICODE\(0x2661\) \*1% 啾啾%UNICODE\(0x26/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6878',
        any: [/「啊啊啊…已经…就这样强行侵犯………啊啊啊啊…主人…早、早上好………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6879',
        any: [/CFLAG:263 = 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6881',
        any: [/ELSEIF TALENT:85 && \(CFLAG:263 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6882',
        any: [/「嘛啾啾…咕噜…嗯哦…啊…主人早上好♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6883',
        any: [
          /「%SELF_CALL\(TARGET\)%的口腔侍奉怎么样…？嘛啾…啾…啾啾…嗯哦………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6884',
        any: [
          /「如果感觉很舒服…就不用客气的在%SELF_CALL\(TARGET\)%嘴里射出来吧…♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6885',
        any: [/CFLAG:263 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6887',
        any: [/ELSEIF ABL:16 >= 5 && \(CFLAG:263 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6888',
        any: [/「啊哈…请原谅我早上…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6889',
        any: [/「想要侍奉小鸡鸡…早上就开始了♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6890',
        any: [/「哈啊…从早上开始就要精精神神的…陆续吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6891',
        any: [/CFLAG:263 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6893',
        any: [/ELSEIF CFLAG:263 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6894',
        any: [/「小鸡鸡…小鸡鸡啊…嗯…嗯…很美味呦～」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6895',
        any: [/CFLAG:263 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6895-6896',
        any: [/CFLAG:263 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6895-6897',
        any: [/CFLAG:263 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6902',
        any: [/IF TFLAG:13 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6904',
        any: [/IF TALENT:9 == 1 && \(CFLAG:264 < 3 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6905',
        any: [/坏掉了的%SAVESTR:TARGET%无法忘记性交的快乐………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6906',
        any: [/CFLAG:264 = 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6908',
        any: [/ELSEIF ABL:2 >= 4 && \(CFLAG:264 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6909',
        any: [/「这么…小穴变得更喜欢了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6910',
        any: [/「嗯…啊啊啊…更加…请让我更加爱上这种事！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6912',
        any: [
          /「满满的射进来吧…让淫乱的小穴满满的直到溢出来吧%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6914',
        any: [/「啊啊啊…如果这么温柔…嗯…呜嗯%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6915',
        any: [/CFLAG:264 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6917',
        any: [/ELSEIF CFLAG:264 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6918',
        any: [/「啊咿…这么兴奋了啊…好羞耻………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6919',
        any: [/CFLAG:264 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6919-6920',
        any: [/CFLAG:264 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6919-6921',
        any: [/CFLAG:264 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6926',
        any: [/IF TFLAG:13 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6928',
        any: [/IF TALENT:9 == 1 && \(CFLAG:265 < 2 \|\| FLAG:7 == 2\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6929',
        any: [/「咿…啊啊…咿呜…可、可以吗………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6930',
        any: [
          /坏掉了的%SAVESTR:TARGET%抱着自己的主人乞求进入%NAME:MASTER%的房间………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6931',
        any: [/CFLAG:265 = 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6932',
        any: [/ELSEIF CFLAG:265 < 1 \|\| FLAG:7 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6933',
        any: [/「唔呼呼…来幽会喽…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6934',
        any: [/「不会这样把%SELF_CALL\(TARGET\)%赶走的…对吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6935',
        any: [/CFLAG:265 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6935-6936',
        any: [/CFLAG:265 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6935-6937',
        any: [/CFLAG:265 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6942',
        any: [/IF TFLAG:13 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6944',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6945',
        any: [/「咿…咿…嗯、拜拜了大人…咿～…啊啊～………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6946',
        any: [/坏了的%SAVESTR:TARGET%对自己被出售的事勉勉强强能理解………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6948',
        any: [/ELSEIF TALENT:85 && MARK:3 < 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6949',
        any: [/「哎、呜、骗人的吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6950',
        any: [/%SAVESTR:TARGET%一副目瞪口呆的表情凝视着你。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6951',
        any: [
          /「%SELF_CALL_FIRST\(TARGET\)%、%SELF_CALL\(TARGET\)%…”你”为了、这么…我很努力的…明明………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6952',
        any: [/你用手示意怪物们抓住了%SAVESTR:TARGET%的双手。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6953',
        any: [
          /「呐…停下吧…停下来啊…%SELF_CALL\(TARGET\)%、”你”为了什么、我什么都能做到！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6954',
        any: [
          /%SAVESTR:TARGET%哭了起来。但是、怪物们沉默着熟练的轻轻扭着%SAVESTR:TARGET%的双臂。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6955',
        any: [/「求你了…不想离开…不想分开哟…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6956',
        any: [/PRINTFORML/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6957',
        any: [/你在沉默的在奴隶买卖合同书上签了字。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6959',
        any: [/ELSEIF MARK:3 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6960',
        any: [
          /「%SELF_CALL\(TARGET\)%的力量被封住了…你总有一天会后悔的…魔王！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6962',
        any: [
          /ELSEIF TALENT:TARGET:136 == 1 && CFLAG:601 == 900 &&  \(TALENT:MASTER:122 == 0 &&/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6963',
        any: [/「我好像成了电灯泡了是吗？　是这样么？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6964',
        any: [/「不过…呵呵…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6965',
        any: [
          /「\\@\(TALENT:TARGET:76 == 1\) \? 主人大人 # 你\\@的身体怎么可能满足得了他（它）呢」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6966',
        any: [/「没错吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6969',
        any: [
          /「什么嘛\\@\(TALENT:TARGET:76 == 1\) \? 主人大人 # 你\\@、连老公的孩子都没怀上啊、怎么能和我争呢」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6971',
        any: [/IF \(CFLAG:602 < CFLAG:MASTER:602\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6972',
        any: [
          /「…快老实承认了吧！！　老实说『是在下输了』吧 魔王\\@\(TALENT:TARGET:76 == 1\) \? 大人 # \\@！！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6973',
        any: [/「明明…是我更被他宠爱着…对吧…没错吧？　是这样吧！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6975',
        any: [/「更何况、我…我爱他的程度远胜过他爱我、的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6976',
        any: [/「…求…求求你…不要…把我卖掉…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6977',
        any: [/「求你了…我不想…我不想这么走了啊…呜」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6978',
        any: [/PRINTFORML/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6979',
        any: [/你一言不发地在奴隶买卖契约书上签了字。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6981',
        any: [/ELSEIF \(CFLAG:602 > CFLAG:MASTER:602\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6982',
        any: [
          /明明马上就要被卖掉了、%SAVESTR:TARGET%却还对自己的胜利沾沾自喜。/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6984',
        any: [/「小心咯、%SAVESTR:ASSI%。下一个说不定就是你咯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6985',
        any: [/就这样一只牝犬被卖掉了。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6986-6987',
        any: [/;結婚愛情が同値/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6988',
        any: [/「以这种难分难解的形式决了胜负真是太可惜了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6989',
        any: [
          /「明明不可能会输给把他称作野狗的\\@\(TALENT:TARGET:76 == 1\) \? 主人大人 # 女\\@才对的」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6990',
        any: [/「诶…真是太可惜了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6990-6991',
        any: [/「诶…真是太可惜了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6993',
        any: [/ELSEIF TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6994',
        any: [/「哈…这次对方会是什么样的主人呢…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6995',
        any: [/「啊啊啊身体好疼哇………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6996-6997',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6998',
        any: [/「总有一天、会用你的脸来祭拜…呼呼、敬请期待那个时候吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '6998-6999',
        any: [/「总有一天、会用你的脸来祭拜…呼呼、敬请期待那个时候吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7000-7001',
        any: [/SIF TALENT:122 != 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7002',
        any: [/CALL SELL_MATURO_K0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7002-7003',
        any: [/CALL SELL_MATURO_K0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7009',
        any: [/IF TFLAG:13 == 11/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7011',
        any: [/IF CFLAG:271 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7013',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7014',
        any: [
          /「啊…哈…%SELF_CALL\(TARGET\)%的孩子啊…什么样的孩子呢…一定是像王子一样…非常英俊哇…哈啊哈哈」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7016',
        any: [/ELSEIF CFLAG:102 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7017',
        any: [/IF CFLAG:601 == 110 && TALENT:314 == 1 && CFLAG:602 > 40/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7019',
        any: [
          /「妊娠……？　啊哈%UNICODE\(0x2661\) \*1%　%SELF_CALL\(TARGET\)%、这是败给了兽人肉棒了呢%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7020',
        any: [
          /「%SELF_CALL\(TARGET\)%、好开心%UNICODE\(0x2661\) \*1%　强壮兽人的浓厚精液让精灵的草食系子宮完全屈服了呢%UNICODE\(0x/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7021',
        any: [/ELSEIF CFLAG:602 > 40/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7022',
        any: [
          /「%SELF_CALL\(TARGET\)%、好开心%UNICODE\(0x2661\) \*1%　子宮投降了%UNICODE\(0x2661\) \*1%　完全屈服于强壮的老/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7022-7023',
        any: [
          /「%SELF_CALL\(TARGET\)%、好开心%UNICODE\(0x2661\) \*1%　子宮投降了%UNICODE\(0x2661\) \*1%　完全屈服于强壮的老/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7024',
        any: [/「怎么会……有了怪物的孩子……？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7024-7025',
        any: [/「怎么会……有了怪物的孩子……？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7027',
        any: [/ELSEIF TALENT:85 && CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7028',
        any: [/「难道…魔族的孩子什么的…唔呼呼…不过心情也不差…真是不可思议…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7030',
        any: [/ELSEIF CFLAG:102 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7030-7031',
        any: [/ELSEIF CFLAG:102 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7033',
        any: [/ELSEIF CFLAG:102 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7033-7034',
        any: [/ELSEIF CFLAG:102 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7036',
        any: [
          /ELSEIF TALENT:TARGET:136 == 1  && CFLAG:102 == 5 && CFLAG:601 == 90/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7037',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7038',
        any: [/「这可是我和老公的孩子、一定会生下皮毛可爱的孩子来的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7038-7039',
        any: [/「这可是我和老公的孩子、一定会生下皮毛可爱的孩子来的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7040',
        any: [/「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7041',
        any: [/IF RAND:9 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7042',
        any: [/波奇？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7043',
        any: [/ELSEIF RAND:8 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7044',
        any: [/哈娜？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7045',
        any: [/ELSEIF RAND:7 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7046',
        any: [/小白？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7047',
        any: [/ELSEIF RAND:6 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7048',
        any: [/贝鲁卡？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7049',
        any: [/ELSEIF RAND:5 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7050',
        any: [/普朗卡？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7051',
        any: [/ELSEIF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7052',
        any: [/戴比尔？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7053',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7054',
        any: [/小狼？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7055',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7056',
        any: [/博斯？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7056-7057',
        any: [/博斯？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7058',
        any: [/米凯？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7058-7059',
        any: [/米凯？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7060-7061',
        any: [/;父親が野良犬/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7062',
        any: [/ELSEIF CFLAG:102 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7063',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7064',
        any: [/「有了个可爱的宝宝…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7064-7065',
        any: [/「有了个可爱的宝宝…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7066',
        any: [/「骗、骗人的吧…为什么怀孕的是那个狗的孩子…！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7066-7067',
        any: [/「骗、骗人的吧…为什么怀孕的是那个狗的孩子…！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7069',
        any: [/ELSEIF CFLAG:102 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7070',
        any: [/「呜呼呜…难、难道…这是狂王大人的孩子…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7071-7072',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7073',
        any: [/「咕呜…咕呜…吔…难、难道、这是…骗人…吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7073-7074',
        any: [/「咕呜…咕呜…吔…难、难道、这是…骗人…吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7075',
        any: [/CFLAG:271 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7076-7077',
        any: [/;2回目/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7079',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7080',
        any: [
          /「啊…哈…%SELF_CALL\(TARGET\)%的孩子啊…什么样的孩子呢…一定是像王子一样…非常英俊哇…哈啊哈哈」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7082',
        any: [/ELSEIF CFLAG:102 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7083',
        any: [/IF CFLAG:601 == 110 && TALENT:314 == 1 && CFLAG:602 > 40/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7085',
        any: [
          /「妊娠……？　啊哈%UNICODE\(0x2661\) \*1%　%SELF_CALL\(TARGET\)%、这是败给了兽人肉棒了呢%UNICODE\(0x2661\) \*1/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7086',
        any: [
          /「%SELF_CALL\(TARGET\)%、好开心%UNICODE\(0x2661\) \*1%　强壮兽人的浓厚精液让精灵的草食系子宮完全屈服了呢%UNICODE\(0x/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7087',
        any: [/ELSEIF CFLAG:602 > 40/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7088',
        any: [
          /「%SELF_CALL\(TARGET\)%、好开心%UNICODE\(0x2661\) \*1%　子宮投降了%UNICODE\(0x2661\) \*1%　完全屈服于强壮的老/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7088-7089',
        any: [
          /「%SELF_CALL\(TARGET\)%、好开心%UNICODE\(0x2661\) \*1%　子宮投降了%UNICODE\(0x2661\) \*1%　完全屈服于强壮的老/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7090',
        any: [/「怎么会……有了怪物的孩子……？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7090-7091',
        any: [/「怎么会……有了怪物的孩子……？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7093',
        any: [/ELSEIF TALENT:85 && CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7094',
        any: [/「难道…魔族的孩子什么的…唔呼呼…不过心情也不差…真是不可思议…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7096',
        any: [/ELSEIF CFLAG:102 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7096-7097',
        any: [/ELSEIF CFLAG:102 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7099',
        any: [/ELSEIF CFLAG:102 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7099-7100',
        any: [/ELSEIF CFLAG:102 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7102',
        any: [
          /ELSEIF TALENT:TARGET:136 == 1  && CFLAG:102 == 5 && CFLAG:601 == 90/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7103',
        any: [/IF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7104',
        any: [/「这可是我和老公的孩子、一定会生下皮毛可爱的孩子来的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7104-7105',
        any: [/「这可是我和老公的孩子、一定会生下皮毛可爱的孩子来的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7106',
        any: [/「竟然会…和狗生下孩子什么的…唔噗噗…名字叫什么好呢…/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7107',
        any: [/IF RAND:9 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7108',
        any: [/波奇？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7109',
        any: [/ELSEIF RAND:8 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7110',
        any: [/哈娜？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7111',
        any: [/ELSEIF RAND:7 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7112',
        any: [/小白？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7113',
        any: [/ELSEIF RAND:6 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7114',
        any: [/贝鲁卡？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7115',
        any: [/ELSEIF RAND:5 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7116',
        any: [/普朗卡？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7117',
        any: [/ELSEIF RAND:4 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7118',
        any: [/戴比尔？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7119',
        any: [/ELSEIF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7120',
        any: [/小狼？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7121',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7122',
        any: [/博斯？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7122-7123',
        any: [/博斯？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7124',
        any: [/米凯？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7124-7125',
        any: [/米凯？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7126-7127',
        any: [/;父親が野良犬/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7128',
        any: [/ELSEIF CFLAG:102 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7129',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7130',
        any: [/「有了个可爱的宝宝…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7130-7131',
        any: [/「有了个可爱的宝宝…♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7132',
        any: [/「骗、骗人的吧…为什么怀孕的是那个狗的孩子…！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7132-7133',
        any: [/「骗、骗人的吧…为什么怀孕的是那个狗的孩子…！？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7135',
        any: [/ELSEIF CFLAG:102 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7136',
        any: [/「呜呼呜…难、难道…这是狂王大人的孩子…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7137-7138',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7139',
        any: [/「咕呜…咕呜…吔…又、又怀孕了………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7139-7140',
        any: [/「咕呜…咕呜…吔…又、又怀孕了………？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7141',
        any: [/CFLAG:271 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7141-7142',
        any: [/CFLAG:271 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7141-7143',
        any: [/CFLAG:271 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7149',
        any: [/IF TFLAG:13 == 12/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7150',
        any: [/IF CFLAG:272 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7152',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7153',
        any: [/「啊哇哈哈…你的角在生长～？非常可爱～？呜噗唔呼呼呼呼………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7155',
        any: [/ELSEIF CFLAG:102 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7156',
        any: [/IF CFLAG:601 == 110 && TALENT:314 == 1 && CFLAG:602 > 40/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7158',
        any: [
          /「生、生下来了啊%UNICODE\(0x2661\) \*1%　从被兽人肉棒攻破的精灵子宫里%UNICODE\(0x2661\) \*1%　生出来啦%UNICODE\(0x2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7159',
        any: [/ELSEIF CFLAG:602 > 40/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7161',
        any: [/「生、生下来了……可爱的孩子……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7161-7162',
        any: [/「生、生下来了……可爱的孩子……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7163',
        any: [/「生、生下来了……怪物的孩子……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7163-7164',
        any: [/「生、生下来了……怪物的孩子……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7166',
        any: [/ELSEIF TALENT:85 && CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7167',
        any: [
          /「这个孩子出来了的话…真的是…不能离开你了啊…唔呼呼、最喜欢你了」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7169',
        any: [/ELSEIF CFLAG:102 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7169-7170',
        any: [/ELSEIF CFLAG:102 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7172',
        any: [/ELSEIF CFLAG:102 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7172-7173',
        any: [/ELSEIF CFLAG:102 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7175',
        any: [/ELSEIF CFLAG:102 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7176',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7177',
        any: [/「健康的狗的孩子生下来了吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7177-7178',
        any: [/「健康的狗的孩子生下来了吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7179',
        any: [/「骗人吧…为什么是狗的孩子…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7179-7180',
        any: [/「骗人吧…为什么是狗的孩子…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7182',
        any: [/ELSEIF CFLAG:102 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7183',
        any: [/「哈哈…生下狂王大人的孩子什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7184-7185',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7186',
        any: [/「哈…哈…哈…这样的孩子出生了什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7186-7187',
        any: [/「哈…哈…哈…这样的孩子出生了什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7188',
        any: [/CFLAG:272 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7188-7189',
        any: [/CFLAG:272 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7191',
        any: [/IF TALENT:9 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7192',
        any: [/「啊哇哈哈…你的角在生长～？非常可爱～？呜噗唔呼呼呼呼………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7194',
        any: [/ELSEIF CFLAG:102 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7195',
        any: [/IF CFLAG:601 == 110 && TALENT:314 == 1 && CFLAG:602 > 40/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7197',
        any: [
          /「生、生下来了啊%UNICODE\(0x2661\) \*1%　从被兽人肉棒攻破的精灵子宫里%UNICODE\(0x2661\) \*1%　生出来啦%UNICODE\(0x2/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7198',
        any: [/ELSEIF CFLAG:602 > 40/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7200',
        any: [/「生、生下来了……可爱的孩子……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7200-7201',
        any: [/「生、生下来了……可爱的孩子……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7202',
        any: [/「生、生下来了……怪物的孩子……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7202-7203',
        any: [/「生、生下来了……怪物的孩子……！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7205',
        any: [/ELSEIF TALENT:85 && CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7206',
        any: [
          /「这个孩子出来了的话…真的是…不能离开你了啊…唔呼呼、最喜欢你了」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7208',
        any: [/ELSEIF CFLAG:102 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7208-7209',
        any: [/ELSEIF CFLAG:102 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7211',
        any: [/ELSEIF CFLAG:102 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7211-7212',
        any: [/ELSEIF CFLAG:102 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7214',
        any: [/ELSEIF CFLAG:102 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7215',
        any: [/IF TALENT:136 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7216',
        any: [/「健康的狗的孩子生下来了吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7216-7217',
        any: [/「健康的狗的孩子生下来了吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7218',
        any: [/「骗人吧…为什么是狗的孩子…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7218-7219',
        any: [/「骗人吧…为什么是狗的孩子…啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7221',
        any: [/ELSEIF CFLAG:102 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7222',
        any: [/「哈哈…生下狂王大人的孩子什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7223-7224',
        any: [/;その他/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7225',
        any: [/「哈…哈…哈…这样的孩子出生了什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7225-7226',
        any: [/「哈…哈…哈…这样的孩子出生了什么的………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7227',
        any: [/CFLAG:272 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7227-7228',
        any: [/CFLAG:272 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7227-7229',
        any: [/CFLAG:272 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7234',
        any: [/IF TFLAG:13 == 13/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7236',
        any: [/IF TALENT:85 \|\| TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7238',
        any: [/IF TALENT:153/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7239',
        any: [/「另外、你真的在担心我吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7240',
        any: [/%SAVESTR:TARGET%抚摸着迎来了产期的大肚子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7242',
        any: [/ELSEIF TALENT:154/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7243',
        any: [/「呼呼、这个孩子的话真的是好麻烦啊♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7244',
        any: [/%SAVESTR:TARGET%哄着孩子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7244-7245',
        any: [/%SAVESTR:TARGET%哄着孩子………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7246-7247',
        any: [/CFLAG:273 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7247',
        any: [/CFLAG:273 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7247-7248',
        any: [/CFLAG:273 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7253',
        any: [/IF TFLAG:13 == 14/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7255',
        any: [/IF TALENT:85 \|\| TALENT:76/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7256',
        any: [/「啊啊、%SELF_CALL\(TARGET\)%可爱的孩子要走了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7256-7257',
        any: [/「啊啊、%SELF_CALL\(TARGET\)%可爱的孩子要走了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7258',
        any: [/CFLAG:274 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7258-7259',
        any: [/CFLAG:274 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7265',
        any: [/IF TFLAG:13 == 999/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7267',
        any: [/IF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7267-7268',
        any: [/IF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7269-7270',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7269-7271',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7269-7272',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7273-7276',
        any: [/;寿命による消滅/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7278',
        any: [/IF TFLAG:13 == 998/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7280',
        any: [/IF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7280-7281',
        any: [/IF TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7282-7283',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7282-7284',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7282-7285',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7286-7289',
        any: [/;フラグ初期化/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7291',
        any: [/TFLAG:13 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7291-7293',
        any: [/TFLAG:13 = 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7320',
        any: [/@DUNGEON_RYOUZYOKU_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7325',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7327',
        any: [/「别、别开玩笑了！　%SELF_CALL\(TARGET\)%的第一次不会给你的…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7329',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7330-7331',
        any: [/;無関心・感情乏しいなら何か言って終了/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7332-7333',
        any: [/ELSEIF TALENT:17 ==1 \|\| TALENT:31 == 1 \|\| TALENT:36 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7333',
        any: [/ELSEIF TALENT:17 ==1 \|\| TALENT:31 == 1 \|\| TALENT:36 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7335',
        any: [/「什么都可以！　即、即使再脏也会做…所以、只有小穴和生命…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7338',
        any: [
          /「屁股！　呐呐、屁股怎样？　前面是不行的不过屁股的话怎么使用也可以哦！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7341',
        any: [/「喜欢用嘴的吗？　什么都会舔、所以、只要活着…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7342',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| T/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7345',
        any: [
          /「絶対！　绝对不能原谅！　你要是敢侵犯我一次试试、我就咬舌自尽！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7346',
        any: [/ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7348',
        any: [/「真讨厌…已经…呀啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7348-7349',
        any: [/「真讨厌…已经…呀啊！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7351',
        any: [/「你们…差劲的人渣！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7351-7352',
        any: [/「你们…差劲的人渣！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7353-7354',
        any: [/;非処女/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7355',
        any: [/「快点侵犯吧！　只是我"真的"会对抗到底！！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7357',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7359',
        any: [/（………反正…马上要结束了…）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7359-7360',
        any: [/（………反正…马上要结束了…）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7361',
        any: [/ELSEIF TALENT:17 ==1 \|\| TALENT:31 == 1 \|\| TALENT:36 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7363',
        any: [/「小穴只要你喜欢就随你使用……求你了…只要活着…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7366',
        any: [/「即使使用屁股…也可以…嫌脏的话、灌、灌肠也可以…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7369',
        any: [/「要用嘴把鸡鸡弄干净…？　不用洗也可以…所以、只要活着…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7370',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| T/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7373',
        any: [
          /「%SELF_CALL\(TARGET\)%绝对不会认输！　即使身体被侵犯了、心灵也不会被侵犯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7374',
        any: [/ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7376',
        any: [/「反正是奴隶吧…？　那个、是%SELF_CALL\(TARGET\)%的工作吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7376-7377',
        any: [/「反正是奴隶吧…？　那个、是%SELF_CALL\(TARGET\)%的工作吧…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7379',
        any: [/「被侵犯了呢、什么感觉也没有」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7379-7380',
        any: [/「被侵犯了呢、什么感觉也没有」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7379-7381',
        any: [/「被侵犯了呢、什么感觉也没有」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7383-7386',
        any: [/@DUNGEON_RYOUZYOKU_AFTER_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7386',
        any: [/@DUNGEON_RYOUZYOKU_AFTER_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7391',
        any: [/IF TALENT:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7393',
        any: [/「哈哈…太好了…安全…安全了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7395',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7397',
        any: [/（………已经、想睡觉了…）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7397-7398',
        any: [/（………已经、想睡觉了…）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7397-7399',
        any: [/（………已经、想睡觉了…）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7403',
        any: [/「大便…不要停…哎咕」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7407',
        any: [/「嘴里…全是小鸡鸡的气味…嗯」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7411',
        any: [/「从现在开始…要喝这个代替水…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7411-7412',
        any: [/「从现在开始…要喝这个代替水…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7414',
        any: [/「没、没什么大不了…没有了吗…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7416',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7418',
        any: [/（………杀死感情…就不用痛苦了）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7418-7419',
        any: [/（………杀死感情…就不用痛苦了）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7418-7420',
        any: [/（………杀死感情…就不用痛苦了）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7424',
        any: [/「小穴…变的嘎巴嘎巴的了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7428',
        any: [/「难道…永远坏了要让我那样的一直失禁…？　讨厌…帮我治好啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7432',
        any: [/「下巴…脱落了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7436',
        any: [/「喝这样的东西什么的…会疯的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7436-7437',
        any: [/「喝这样的东西什么的…会疯的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7440',
        any: [/@BENKI_KOUJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7459',
        any: [/IF FLAG:62 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7462',
        any: [/IF FLAG:63 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7463',
        any: [
          /「对污秽的你们进行『施予』可是%SELF_CALL\(A\)%的『工作』啊、用不着这样感恩戴德的……」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7465',
        any: [/ELSEIF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7466',
        any: [/「按顺序站好了！　会帮你们一个个脱下来的……喏♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7468',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7469',
        any: [/「按顺序排好队啦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7471',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7472',
        any: [/「会好好服侍的、请排好队……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7473-7474',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7475',
        any: [/「噫、好脏……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7475-7476',
        any: [/「噫、好脏……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7477',
        any: [/ELSEIF FLAG:62 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7480',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7480-7481',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7483',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7483-7484',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7486',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7486-7487',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7488-7489',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7488-7490',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7491-7492',
        any: [/ELSEIF FLAG:62 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7492',
        any: [/ELSEIF FLAG:62 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7495',
        any: [/IF FLAG:63 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7496',
        any: [/「兽奸便器什么的、真是过分的催眠……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7497',
        any: [/「嘛、变得不想再抵抗了。被这么变态的对待、人生也是完蛋了呢♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7499',
        any: [/ELSEIF TALENT:A:牝犬/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7500',
        any: [/「被狗上了啊……哇哦……爽爆了♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7502',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7503',
        any: [/「这就前来服侍……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7504-7505',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7506',
        any: [/「噫——、不要！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7506-7507',
        any: [/「噫——、不要！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7508',
        any: [/ELSEIF  FLAG:62 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7511',
        any: [/IF FLAG:63 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7512',
        any: [
          /「好嘞。使劲的侵犯吧。这就是%SELF_CALL\(A\)%的『工作』来着啊、真是没办法啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7514',
        any: [/ELSEIF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7515',
        any: [/「两边的穴好像要连到一起了啊……♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7516-7517',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7518',
        any: [/「去了、呜噗……噗呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7518-7519',
        any: [/「去了、呜噗……噗呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7520',
        any: [/ELSEIF  FLAG:62 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7523',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7523-7524',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7526',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7526-7527',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7529',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7529-7530',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7531-7532',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7531-7533',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7534-7535',
        any: [/ELSEIF  FLAG:62 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7535',
        any: [/ELSEIF  FLAG:62 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7538',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7538-7539',
        any: [/IF TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7541',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7541-7542',
        any: [/ELSEIF TALENT:A:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7544',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7544-7545',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7546-7547',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7546-7548',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7549-7550',
        any: [/ELSEIF FLAG:62 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7550',
        any: [/ELSEIF FLAG:62 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7553',
        any: [/IF FLAG:63 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7554',
        any: [
          /「啊哈、%SELF_CALL\(TARGET\)%是兽奸便器的%SAVESTR:TARGET%的说%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7555',
        any: [
          /「被魔王大人进行了超强的催眠、正在像这样进行着变态交尾挑战呢%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7556',
        any: [
          /「看着悲惨的催眠肉便器的末路好好地撸起来哟%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7558',
        any: [/ELSEIF TALENT:A:牝犬/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7559',
        any: [
          /「兽奸便器的%SAVESTR:TARGET%哦%UNICODE\(0x2661\) \*1%　稀有的真实交尾画面可别错过了哦%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7561',
        any: [/ELSEIF ABL:A:16 >= 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7562',
        any: [/「这就前来服侍……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7563-7564',
        any: [/;それ以外/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7565',
        any: [/「噫咦——、不要！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7565-7566',
        any: [/「噫咦——、不要！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7565-7567',
        any: [/「噫咦——、不要！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7569-7572',
        any: [/@DUNGEON_VICTORY_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7572',
        any: [/@DUNGEON_VICTORY_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7577',
        any: [/「%SELF_CALL\(TARGET\)%赢不了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7579',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7582',
        any: [/「……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7584-7585',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| T/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7585',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| T/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7588',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7589',
        any: [/「当然！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7590',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7591',
        any: [/「卑鄙！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7591-7592',
        any: [/「卑鄙！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7593',
        any: [/「这种东西！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7593-7594',
        any: [/「这种东西！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7596',
        any: [/ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7599',
        any: [/「真是好险…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7599-7601',
        any: [/「真是好险…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7602-7604',
        any: [/;その他何か適当に性格によって/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7605',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7606',
        any: [/「%SELF_CALL\(TARGET\)%可是天才啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7607',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7608',
        any: [/「呼呜……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7608-7609',
        any: [/「呼呜……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7610',
        any: [/「%SELF_CALL\(TARGET\)%也是的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7610-7611',
        any: [/「%SELF_CALL\(TARGET\)%也是的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7613-7615',
        any: [
          /IF \(BASE:A:0 \* 100 \/ MAXBASE:A:0 < 50\) \|\| \(BASE:A:1 \* 100 \/ MAXBASE:A:1 < 50\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7615',
        any: [
          /IF \(BASE:A:0 \* 100 \/ MAXBASE:A:0 < 50\) \|\| \(BASE:A:1 \* 100 \/ MAXBASE:A:1 < 50\)/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7617',
        any: [/（稍微有点…不妙…呢）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7617-7618',
        any: [/（稍微有点…不妙…呢）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7620',
        any: [/「绝对不会输！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7620-7621',
        any: [/「绝对不会输！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7620-7623',
        any: [/「绝对不会输！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7626',
        any: [/@DUNGEON_ATTACK_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7631',
        any: [/IF CFLAG:1 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7633',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7636',
        any: [/「……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7638-7639',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| T/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7639',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| T/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7642',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7643',
        any: [/「怪物！　死吧！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7644',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7645',
        any: [/「%SELF_CALL\(TARGET\)%还以为能战胜！？　呀！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7645-7646',
        any: [/「%SELF_CALL\(TARGET\)%还以为能战胜！？　呀！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7647',
        any: [/「来吧、打垮你们哟！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7647-7648',
        any: [/「来吧、打垮你们哟！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7650',
        any: [/ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7653',
        any: [/「呜、什么啊这帮家伙！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7653-7655',
        any: [/「呜、什么啊这帮家伙！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7656-7658',
        any: [/;その他何か適当に性格によって/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7659',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7660',
        any: [/「明明是怪物！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7661',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7662',
        any: [/「魔王的爪牙没什么了不起的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7662-7663',
        any: [/「魔王的爪牙没什么了不起的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7664',
        any: [/「你做了什么！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7664-7665',
        any: [/「你做了什么！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7667-7669',
        any: [/;その他・迎撃中/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7668-7669',
        any: [/;その他・迎撃中/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7670',
        any: [/IF TALENT:21 == 1 \|\| TALENT:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7673',
        any: [/「……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7675-7676',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| T/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7676',
        any: [
          /ELSEIF TALENT:11 == 1 \|\| TALENT:12 == 1 \|\| TALENT:15 == 1 \|\| TALENT:30 == 1 \|\| T/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7679',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7680',
        any: [/「哼、什么都不懂的啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7681',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7682',
        any: [/「笨蛋、根本就没有意识到魔王大人的美妙」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7682-7683',
        any: [/「笨蛋、根本就没有意识到魔王大人的美妙」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7684',
        any: [/「你马上就知道了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7684-7685',
        any: [/「你马上就知道了」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7687',
        any: [/ELSEIF TALENT:10 == 1 \|\| TALENT:26 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7690',
        any: [/「魔王军……不会输的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7690-7692',
        any: [/「魔王军……不会输的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7693-7695',
        any: [/;その他何か適当に性格によって/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7696',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7697',
        any: [/「这是魔王大人赐给我的力量…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7698',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7699',
        any: [/「想赢？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7699-7700',
        any: [/「想赢？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7701',
        any: [/「%SELF_CALL\(TARGET\)%获得了新生！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7701-7702',
        any: [/「%SELF_CALL\(TARGET\)%获得了新生！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7701-7704',
        any: [/「%SELF_CALL\(TARGET\)%获得了新生！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7701-7705',
        any: [/「%SELF_CALL\(TARGET\)%获得了新生！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7709-7713',
        any: [/;@COLOSSEUM_KOJO関係（X1をキャラ番号に置換）/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7716',
        any: [/@COLOSSEUM_KOJO_1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7720',
        any: [/IF SELECTCOM == 55/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7722',
        any: [/IF BASE:1 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7723',
        any: [/%SAVESTR:TARGET%好像没有力气站起来了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7723-7724',
        any: [/%SAVESTR:TARGET%好像没有力气站起来了……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7725',
        any: [/%SAVESTR:TARGET%看到死斗场的热浪和将要面对的对手吓得直哆嗦……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7725-7726',
        any: [/%SAVESTR:TARGET%看到死斗场的热浪和将要面对的对手吓得直哆嗦……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7725-7727',
        any: [/%SAVESTR:TARGET%看到死斗场的热浪和将要面对的对手吓得直哆嗦……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7728-7730',
        any: [/;会話する CFLAG:/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7732',
        any: [/IF SELECTCOM == 56/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7734',
        any: [/IF BASE:1 <= 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7736',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7737',
        any: [/「哇…你、你做了什么………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7738',
        any: [/%SAVESTR:TARGET%丢掉武器膝盖跪倒了地上……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7738-7739',
        any: [/%SAVESTR:TARGET%丢掉武器膝盖跪倒了地上……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7740',
        any: [/「哈…哈…这样的事…%SELF_CALL\(TARGET\)%……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7741',
        any: [/%SAVESTR:TARGET%丢掉武器膝盖跪倒了地上……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7741-7742',
        any: [/%SAVESTR:TARGET%丢掉武器膝盖跪倒了地上……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7743-7744',
        any: [/;助手が調教中の場合/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7745',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7746',
        any: [/「如、如果对手是你的话…这样的……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7747',
        any: [
          /%SAVESTR:TARGET%看到了在%NAME:MASTER%命令下武装起来的%SAVESTR:ASSI%不由的咬牙切齿起来……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7747-7748',
        any: [
          /%SAVESTR:TARGET%看到了在%NAME:MASTER%命令下武装起来的%SAVESTR:ASSI%不由的咬牙切齿起来……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7749',
        any: [/「嗯嗯…那种家伙…如果是平时的%SELF_CALL\(TARGET\)%…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7750',
        any: [/被封住了力量的%SAVESTR:TARGET%发现了参战的状况而感到焦虑……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7750-7751',
        any: [/被封住了力量的%SAVESTR:TARGET%发现了参战的状况而感到焦虑……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7750-7752',
        any: [/被封住了力量的%SAVESTR:TARGET%发现了参战的状况而感到焦虑……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7750-7753',
        any: [/被封住了力量的%SAVESTR:TARGET%发现了参战的状况而感到焦虑……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7754-7757',
        any: [/;フェラチオ CFLAG:/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7759',
        any: [/IF SELECTCOM == 31/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7761',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7762',
        any: [/「啊呜…呜嗯…嗯咕…嗯…呼啊……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7763',
        any: [/%SAVESTR:ASSI%因为/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7765',
        any: [/PRINT 真正的小鸡鸡/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7767',
        any: [/PRINT 假阳具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7768',
        any: [/被%SAVESTR:TARGET%含了进去而露出了心旷神怡的表情……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7768-7769',
        any: [/被%SAVESTR:TARGET%含了进去而露出了心旷神怡的表情……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7770',
        any: [/「咕…这样的…明明不想舔…呜咕…嗯…嗯咕…………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7771',
        any: [/%SAVESTR:TARGET%吸吮舔舐着散发着恶心的气味小鸡鸡……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7771-7772',
        any: [/%SAVESTR:TARGET%吸吮舔舐着散发着恶心的气味小鸡鸡……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7771-7773',
        any: [/%SAVESTR:TARGET%吸吮舔舐着散发着恶心的气味小鸡鸡……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7774-7776',
        any: [/;胸愛撫 CFLAG:/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7778',
        any: [/IF SELECTCOM == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7780',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7781',
        any: [/「%SAVESTR:ASSI%…你、你不也是勇者这种事…啊呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7782',
        any: [/%SAVESTR:TARGET%为了让%SAVESTR:ASSI%离开自己的乳房……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7782-7783',
        any: [/%SAVESTR:TARGET%为了让%SAVESTR:ASSI%离开自己的乳房……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7784',
        any: [/「啊啊啊…说、说了很痛啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7785',
        any: [/%SAVESTR:TARGET%因为乳房被用力揉而发出了痛苦的声音……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7785-7786',
        any: [/%SAVESTR:TARGET%因为乳房被用力揉而发出了痛苦的声音……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7785-7787',
        any: [/%SAVESTR:TARGET%因为乳房被用力揉而发出了痛苦的声音……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7788-7790',
        any: [/;後背位 CFLAG:/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7792',
        any: [/IF SELECTCOM == 21/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7794',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7795',
        any: [/「啊啊啊…啊！这、这样的…不行了不行了～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7796',
        any: [/%SAVESTR:ASSI%一边听着悲鸣一边用/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7798',
        any: [/PRINT 真正的小鸡鸡/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7800',
        any: [/PRINT 假阳具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7801',
        any: [/毫不留情的继续蹂躏%SAVESTR:TARGET%的阴道……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7803',
        any: [/ELSEIF TFLAG:400 == 206/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7804',
        any: [/「嘎…嘎哈…咕嘿…呜哎哎……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7805',
        any: [
          /可怜的%SAVESTR:TARGET%就像被毁掉的癞蛤蟆那样一边发出声音一边被那样钓了起来……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7805-7806',
        any: [
          /可怜的%SAVESTR:TARGET%就像被毁掉的癞蛤蟆那样一边发出声音一边被那样钓了起来……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7807',
        any: [/「啊呜！…喜、喜欢上了…%SELF_CALL\(TARGET\)%这么…啊呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7808',
        any: [/%SAVESTR:TARGET%就这样被怪物侵犯了下去……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7808-7809',
        any: [/%SAVESTR:TARGET%就这样被怪物侵犯了下去……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7808-7810',
        any: [/%SAVESTR:TARGET%就这样被怪物侵犯了下去……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7808-7811',
        any: [/%SAVESTR:TARGET%就这样被怪物侵犯了下去……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7816',
        any: [/IF SELECTCOM == 27/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7818',
        any: [/IF ASSI > 0 && ASSIPLAY/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7819',
        any: [/「啊啊啊…啊！屁、屁股坏掉了呜啊…不行了不行了～！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7820',
        any: [/%SAVESTR:ASSI%一边听着悲鸣一边用/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7822',
        any: [/PRINT 真正的小鸡鸡/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7824',
        any: [/PRINT 假阳具/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7825',
        any: [/毫不留情的继续蹂躏%SAVESTR:TARGET%的肛门……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7827',
        any: [/ELSEIF TFLAG:400 == 206/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7828',
        any: [/「嘎…嘎哈…咕嘿…呜哎哎……」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7829',
        any: [
          /可怜的%SAVESTR:TARGET%就像被毁掉的癞蛤蟆那样一边发出声音一边被那样钓了起来……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7829-7830',
        any: [
          /可怜的%SAVESTR:TARGET%就像被毁掉的癞蛤蟆那样一边发出声音一边被那样钓了起来……/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7831',
        any: [
          /「啊呜！…%SELF_CALL\(TARGET\)%这么…啊咕！屁、屁股要坏掉了…啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7832',
        any: [/%SAVESTR:TARGET%就这样被怪物侵犯了下去……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7832-7833',
        any: [/%SAVESTR:TARGET%就这样被怪物侵犯了下去……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7832-7834',
        any: [/%SAVESTR:TARGET%就这样被怪物侵犯了下去……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7832-7835',
        any: [/%SAVESTR:TARGET%就这样被怪物侵犯了下去……/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7840',
        any: [/IF SELECTCOM == 51/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7841',
        any: [/「啊啊啊…媚薬啊…啊啊啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7841-7842',
        any: [/「啊啊啊…媚薬啊…啊啊啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7841-7843',
        any: [/「啊啊啊…媚薬啊…啊啊啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7846-7849',
        any: [/@NTR_KOUJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7849',
        any: [/@NTR_KOUJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7853',
        any: [/CFLAG:650 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7855',
        any: [/IF P == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7857',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7858',
        any: [
          /「啊…咿…不要…拔出来…拔出来啊…%SELF_CALL\(TARGET\)%是魔王大人…啊啊啊…讨厌…不要动啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7858-7859',
        any: [
          /「啊…咿…不要…拔出来…拔出来啊…%SELF_CALL\(TARGET\)%是魔王大人…啊啊啊…讨厌…不要动啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7860',
        any: [/「啊啊啊…为什么…这样…啊嗯！不行了…这样弄不行了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7860-7861',
        any: [/「啊啊啊…为什么…这样…啊嗯！不行了…这样弄不行了啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7862',
        any: [/CFLAG:651 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7864',
        any: [/ELSEIF P == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7865',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7866',
        any: [
          /「啊啊啊！深一点！深一点哦！ 啊…那、那里不行了…%SELF_CALL\(TARGET\)%的…肛门…咿咿嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7866-7867',
        any: [
          /「啊啊啊！深一点！深一点哦！ 啊…那、那里不行了…%SELF_CALL\(TARGET\)%的…肛门…咿咿嗯%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7868',
        any: [
          /「啊啊啊…你这个变态…%SELF_CALL\(TARGET\)%的…肛门…你这笨蛋…啊…啊啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7868-7869',
        any: [
          /「啊啊啊…你这个变态…%SELF_CALL\(TARGET\)%的…肛门…你这笨蛋…啊…啊啊嗯！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7870',
        any: [/CFLAG:652 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7872',
        any: [/ELSEIF P == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7873',
        any: [/IF TALENT:136/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7874',
        any: [/「啊嗯…狗狗的小鸡鸡好舒服啊…咿咿…天啊%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7875',
        any: [
          /%SAVESTR:TARGET%一边被四周的观众嘲笑、一边沉浸在被狗侵犯的快感里………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7876',
        any: [/ELSEIF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7877',
        any: [/「啊啊啊…停下吧…%SELF_CALL\(TARGET\)%是谁…啊哼！…咿…讨厌啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7878',
        any: [
          /%SAVESTR:TARGET%是四周的观众的背叛者！魔女！一边被骂一边被狗持续侵犯着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7878-7879',
        any: [
          /%SAVESTR:TARGET%是四周的观众的背叛者！魔女！一边被骂一边被狗持续侵犯着………/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7880',
        any: [/「咿嗯…这种事…与魔王同样的事么…停止…停下吧…啊…咿啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7880-7881',
        any: [/「咿嗯…这种事…与魔王同样的事么…停止…停下吧…啊…咿啊啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7882',
        any: [/CFLAG:653 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7884',
        any: [/ELSEIF P == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7885',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7886',
        any: [
          /「哈…哈…啊啊啊！美妙啊…狂王大人啊…请更多的侵犯…%SELF_CALL\(TARGET\)%的小穴%UNICODE\(0x2661\) \*1% 快乐的要坏了%UNIC/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7886-7887',
        any: [
          /「哈…哈…啊啊啊！美妙啊…狂王大人啊…请更多的侵犯…%SELF_CALL\(TARGET\)%的小穴%UNICODE\(0x2661\) \*1% 快乐的要坏了%UNIC/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7888',
        any: [/「咿咿…咿嗯…狂王大人的怀抱…好幸福…的说…啊…啊咕♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7888-7889',
        any: [/「咿咿…咿嗯…狂王大人的怀抱…好幸福…的说…啊…啊咕♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7890',
        any: [/CFLAG:654 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7892',
        any: [/ELSEIF P == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7893',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7894',
        any: [
          /「啊嗯…大家都已经…%SELF_CALL\(TARGET\)%的小穴和屁股小穴…更多的随便用就好啦%UNICODE\(0x2661\) \*1% 咿嗯…两穴都被插进来了%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7894-7895',
        any: [
          /「啊嗯…大家都已经…%SELF_CALL\(TARGET\)%的小穴和屁股小穴…更多的随便用就好啦%UNICODE\(0x2661\) \*1% 咿嗯…两穴都被插进来了%/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7896',
        any: [
          /「啊啊啊…这样…被轮奸什么的…咿嗯…不行了不行了…不要同时插两种穴啊！啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7896-7897',
        any: [
          /「啊啊啊…这样…被轮奸什么的…咿嗯…不行了不行了…不要同时插两种穴啊！啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7898',
        any: [/CFLAG:655 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7900',
        any: [/ELSEIF P == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7901',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7902',
        any: [
          /「你看…快点换下一个上吧………先付钱…嗯啊嗯…那样的…即、即使…啊啊啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7902-7903',
        any: [
          /「你看…快点换下一个上吧………先付钱…嗯啊嗯…那样的…即、即使…啊啊啊♪」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7904',
        any: [
          /「啊啊啊…%SELF_CALL\(TARGET\)%因为…明明是勇者…这样的感觉…明明不可以…咿啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7904-7905',
        any: [
          /「啊啊啊…%SELF_CALL\(TARGET\)%因为…明明是勇者…这样的感觉…明明不可以…咿啊啊啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7906',
        any: [/CFLAG:656 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7908',
        any: [/ELSEIF P == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7909',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7910',
        any: [/「魔王大人…对不起…%SELF_CALL\(TARGET\)%…被狂王大人…玩坏了…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7911',
        any: [/「就这样…侍奉狂王大人…是比什么都喜悦的东西…啊…啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7911-7912',
        any: [/「就这样…侍奉狂王大人…是比什么都喜悦的东西…啊…啊啊啊」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7913',
        any: [/「狂王大人的…好美味…啊哎…呜咕…咕嘟…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7914',
        any: [/%SAVESTR:TARGET%由于嘴巴被注入了东西咽下后会心地笑了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7914-7915',
        any: [/%SAVESTR:TARGET%由于嘴巴被注入了东西咽下后会心地笑了………/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7916',
        any: [/CFLAG:657 = 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7918',
        any: [/ELSEIF P == 20/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7919',
        any: [/IF TALENT:76 \|\| TALENT:85/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7920',
        any: [/IF CFLAG:102 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7921',
        any: [/「停下吧！魔王大人…不要拿走%SELF_CALL\(TARGET\)%的宝宝！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7921-7922',
        any: [/「停下吧！魔王大人…不要拿走%SELF_CALL\(TARGET\)%的宝宝！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7923',
        any: [/「啊啊啊…%SELF_CALL\(TARGET\)%宝宝…讨厌、讨厌啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7923-7924',
        any: [/「啊啊啊…%SELF_CALL\(TARGET\)%宝宝…讨厌、讨厌啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7925-7926',
        any: [/「嗯嗯…咕…真是过分…啊啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7926',
        any: [/「嗯嗯…咕…真是过分…啊啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7926-7927',
        any: [/「嗯嗯…咕…真是过分…啊啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7926-7928',
        any: [/「嗯嗯…咕…真是过分…啊啊啊………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7930-7933',
        any: [/@EXUCUTION_KOUJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7933',
        any: [/@EXUCUTION_KOUJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7936',
        any: [/IF TFLAG:16 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7937',
        any: [/「真是太好了…只要活着…就好了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7939',
        any: [/ELSEIF TFLAG:16 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7940',
        any: [
          /「%SELF_CALL\(TARGET\)%%SELF_CALL\(TARGET\)%的意识在逐渐消失………啊…啊啊啊………」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7942',
        any: [/ELSEIF TFLAG:16 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7943',
        any: [/「好恨啊………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7945',
        any: [/ELSEIF TFLAG:16 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7945-7946',
        any: [/ELSEIF TFLAG:16 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7945-7947',
        any: [/ELSEIF TFLAG:16 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7950',
        any: [/@MUSEUM_KOUJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7953',
        any: [/IF TFLAG:500 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7954',
        any: [/「这种死法讨厌啊啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7956',
        any: [/ELSEIF TFLAG:500 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7957',
        any: [/「我不要变成这种玩具啊！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7959',
        any: [/ELSEIF TFLAG:500 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7959-7960',
        any: [/ELSEIF TFLAG:500 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7962',
        any: [/ELSEIF TFLAG:500 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7963',
        any: [/\(咕…如果力量没被封印的话、这、这种打扮…！\)/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7964',
        any: [/「这、这种感觉就行了吧？…早点弄完就最好了―」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7966',
        any: [/ELSEIF TFLAG:500 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7967',
        any: [/「身…身体它、变得不是人类了…不…不要！谁、誰来……救…救…」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7969',
        any: [/ELSEIF TFLAG:500 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7969-7970',
        any: [/ELSEIF TFLAG:500 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7972',
        any: [/ELSEIF TFLAG:500 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7972-7973',
        any: [/ELSEIF TFLAG:500 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7975',
        any: [/ELSEIF TFLAG:500 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7975-7976',
        any: [/ELSEIF TFLAG:500 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7978',
        any: [/ELSEIF TFLAG:500 == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7978-7979',
        any: [/ELSEIF TFLAG:500 == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7981',
        any: [/ELSEIF TFLAG:500 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7981-7982',
        any: [/ELSEIF TFLAG:500 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7981-7983',
        any: [/ELSEIF TFLAG:500 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7986',
        any: [/@BANISHMENT_KOUJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7990',
        any: [/IF TFLAG:510 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7991',
        any: [/「骗、骗人吧…%SELF_CALL\(TARGET\)%的力量该不会被封印了吧………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7993',
        any: [/ELSEIF TFLAG:510 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7993-7994',
        any: [/ELSEIF TFLAG:510 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7996',
        any: [/ELSEIF TFLAG:510 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7996-7997',
        any: [/ELSEIF TFLAG:510 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7999',
        any: [/ELSEIF TFLAG:510 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '7999-8000',
        any: [/ELSEIF TFLAG:510 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8002',
        any: [/ELSEIF TFLAG:510 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8002-8003',
        any: [/ELSEIF TFLAG:510 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8002-8004',
        any: [/ELSEIF TFLAG:510 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8007',
        any: [/@PUBLIC_EXUCUTION_KOUJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8011',
        any: [/IF TFLAG:520 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8012',
        any: [/「讨厌啊…咿…呀咿咿！再也不会被弄坏了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8014',
        any: [/ELSEIF TFLAG:520 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8015',
        any: [/「畜生…畜生畜生………！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8017',
        any: [/ELSEIF TFLAG:520 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8017-8018',
        any: [/ELSEIF TFLAG:520 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8017-8019',
        any: [/ELSEIF TFLAG:520 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8022',
        any: [/@GROTESQUE_KOUJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8026',
        any: [/IF TFLAG:530 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8026-8027',
        any: [/IF TFLAG:530 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8029',
        any: [/ELSEIF TFLAG:530 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8029-8030',
        any: [/ELSEIF TFLAG:530 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8032',
        any: [/ELSEIF TFLAG:530 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8032-8033',
        any: [/ELSEIF TFLAG:530 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8035',
        any: [/ELSEIF TFLAG:530 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8035-8036',
        any: [/ELSEIF TFLAG:530 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8038',
        any: [/ELSEIF TFLAG:530 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8038-8039',
        any: [/ELSEIF TFLAG:530 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8041',
        any: [/ELSEIF TFLAG:530 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8041-8042',
        any: [/ELSEIF TFLAG:530 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8044',
        any: [/ELSEIF TFLAG:530 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8044-8045',
        any: [/ELSEIF TFLAG:530 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8044-8046',
        any: [/ELSEIF TFLAG:530 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8049',
        any: [/@ENTERENEMY_KOUJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8052',
        any: [/IF TALENT:A:21 == 1 \|\| TALENT:A:22 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8054',
        any: [/「……%SELF_CALL\(A\)%会打倒魔王的」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8055',
        any: [
          /ELSEIF TALENT:A:11 == 1 \|\| TALENT:A:12 == 1 \|\| TALENT:A:15 == 1 \|\| TALENT:A:30 =/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8057',
        any: [/「魔王什么的轻轻的一击就够了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8058',
        any: [/ELSEIF TALENT:A:10 == 1 \|\| TALENT:A:26 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8060',
        any: [/「%SELF_CALL\(A\)%魔王能打倒吗…不对、绝对会打倒！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8060-8061',
        any: [/「%SELF_CALL\(A\)%魔王能打倒吗…不对、绝对会打倒！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8063',
        any: [/「虽然不怎么了解魔王的实力、不过觉悟吧！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8063-8064',
        any: [/「虽然不怎么了解魔王的实力、不过觉悟吧！！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8067',
        any: [/@GOHOUBI_REQUEST_KOUJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8070',
        any: [/IF CFLAG:A:504 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8072',
        any: [/「请多关照报酬是钱哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8073',
        any: [
          /ELSEIF CFLAG:A:504 == 1 \|\| CFLAG:A:504 == 2 \|\| CFLAG:A:504 == 3/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8075',
        any: [/「胜利之后、想要和/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8076',
        any: [/IF CFLAG:A:504 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8077',
        any: [/PRINT 狗/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8078',
        any: [/ELSEIF CFLAG:A:504 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8079',
        any: [/PRINT 猪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8080',
        any: [/ELSEIF CFLAG:A:504 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8081',
        any: [/PRINT 马/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8081-8082',
        any: [/PRINT 马/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8083',
        any: [/交尾」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8084',
        any: [/ELSEIF CFLAG:A:504 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8086',
        any: [/「哇、回来的吻…等待着呢」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8087',
        any: [/ELSEIF CFLAG:A:504 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8089',
        any: [/「呐、打倒勇者的话…希望可以做爱」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8090',
        any: [/ELSEIF CFLAG:A:504 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8092',
        any: [/「回来的话、白色的…能喝一次」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8093',
        any: [/ELSEIF CFLAG:A:504 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8095',
        any: [/「如果打倒的话作为胜利的纪念、开性爱派对吧」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8096',
        any: [/ELSEIF CFLAG:A:504 == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8098',
        any: [/「魔王大人…赢了的话…给我喝尿…？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8099',
        any: [/ELSEIF CFLAG:A:504 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8101',
        any: [/「打倒勇者的话、想要用小穴吸吮包茎处男的短小肉棒」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8101-8102',
        any: [/「打倒勇者的话、想要用小穴吸吮包茎处男的短小肉棒」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8105',
        any: [/@GOHOUBI_AFTER_KOUJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8111',
        any: [/IF TFLAG:18 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8112',
        any: [/「难得努力了一下…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8114',
        any: [/ELSEIF TFLAG:18 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8115',
        any: [/「呼呼、想要增加更多的这个勋章」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8116',
        any: [/ELSEIF TFLAG:18 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8118',
        any: [/IF CFLAG:A:504 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8119',
        any: [/「谢谢、可以去买买买了呢！～嘻嘻」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8121',
        any: [/ELSEIF CFLAG:A:504 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8123',
        any: [/IF TALENT:A:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8124',
        any: [/「啊啊啊！和狗用肛门交尾！好棒～好棒哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8124-8125',
        any: [/「啊啊啊！和狗用肛门交尾！好棒～好棒哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8126',
        any: [/「啊啊啊！和狗交尾！好棒～好棒哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8126-8127',
        any: [/「啊啊啊！和狗交尾！好棒～好棒哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8129',
        any: [/ELSEIF CFLAG:A:504 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8131',
        any: [/IF TALENT:A:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8132',
        any: [/「啊啊啊！和猪用肛门交尾！好棒～好棒哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8132-8133',
        any: [/「啊啊啊！和猪用肛门交尾！好棒～好棒哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8134',
        any: [/「啊啊啊！和猪交尾！好棒～好棒哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8134-8135',
        any: [/「啊啊啊！和猪交尾！好棒～好棒哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8137',
        any: [/ELSEIF CFLAG:A:504 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8139',
        any: [/IF TALENT:A:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8140',
        any: [/「啊啊啊！和马用肛门交尾！好棒～好棒哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8140-8141',
        any: [/「啊啊啊！和马用肛门交尾！好棒～好棒哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8142',
        any: [/「啊啊啊！和马交尾！好棒～好棒哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8142-8143',
        any: [/「啊啊啊！和马交尾！好棒～好棒哦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8145',
        any: [/ELSEIF CFLAG:A:504 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8146',
        any: [/「恩、呜嗯…啾…接吻…好美妙…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8148',
        any: [/ELSEIF CFLAG:A:504 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8150',
        any: [/IF ABL:A:2 > ABL:A:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8151',
        any: [/「性交作为奖励！最棒～最棒了呦%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8152-8153',
        any: [/;アナルとペニス/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8154',
        any: [/「肛门好棒！好棒啊…啊啊啊还要更多%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8154-8155',
        any: [/「肛门好棒！好棒啊…啊啊啊还要更多%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8157',
        any: [/ELSEIF CFLAG:A:504 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8158',
        any: [/「好吃…魔王大人的美味精液好棒啊…想要更多…可以吗？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8160',
        any: [/ELSEIF CFLAG:A:504 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8162',
        any: [/IF TALENT:A:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8163',
        any: [/「啊啊啊…果然还是性爱派对好…再来…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8163-8164',
        any: [/「啊啊啊…果然还是性爱派对好…再来…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8165',
        any: [/「啊啊啊…果然还是性爱派对好…再来…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8165-8166',
        any: [/「啊啊啊…果然还是性爱派对好…再来…%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8168',
        any: [/ELSEIF CFLAG:A:504 == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8169',
        any: [/「小便…好美味、魔王大人♪」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8171',
        any: [/ELSEIF CFLAG:A:504 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8173',
        any: [/IF ABL:A:2 > ABL:A:3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8174',
        any: [/「你看、这样你也想成为合格的男子汉？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8175-8176',
        any: [/;アナル/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8177',
        any: [/「很抱歉是肛交、不过这里也不错吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8177-8178',
        any: [/「很抱歉是肛交、不过这里也不错吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8177-8179',
        any: [/「很抱歉是肛交、不过这里也不错吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8177-8180',
        any: [/「很抱歉是肛交、不过这里也不错吧？」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8181-8183',
        any: [/@OSIOKI_KOUJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8183',
        any: [/@OSIOKI_KOUJO_K1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8189',
        any: [/IF TFLAG:18 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8190',
        any: [/「得、得救了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8192',
        any: [/ELSEIF TFLAG:18 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8194',
        any: [/IF ABL:A:21 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8195',
        any: [/「啊啊啊！电气惩罚最高呦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8195-8196',
        any: [/「啊啊啊！电气惩罚最高呦！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8197',
        any: [/「不! 不!！再次原谅我吧！咿啊呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8197-8198',
        any: [/「不! 不!！再次原谅我吧！咿啊呜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8200',
        any: [/ELSEIF TFLAG:18 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8202',
        any: [/IF ABL:A:17 >= 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8203',
        any: [
          /「你看、魔王大人的东西%SELF_CALL\(A\)%大庭广众的自慰、就是这样礼貌的好好观看吧」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8203-8204',
        any: [
          /「你看、魔王大人的东西%SELF_CALL\(A\)%大庭广众的自慰、就是这样礼貌的好好观看吧」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8205',
        any: [
          /「啊啊啊…%SELF_CALL\(A\)%为什么有这样的感觉…看、看到了！看到了啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8205-8206',
        any: [
          /「啊啊啊…%SELF_CALL\(A\)%为什么有这样的感觉…看、看到了！看到了啊！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8208',
        any: [/ELSEIF TFLAG:18 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8210',
        any: [/IF ABL:A:17 >= 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8211',
        any: [/「这样一边大便一边手淫%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8211-8212',
        any: [/「这样一边大便一边手淫%UNICODE\(0x2661\) \*1%」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8213',
        any: [/「嗯嗯…为什么会这样…讨厌、讨厌啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8213-8214',
        any: [/「嗯嗯…为什么会这样…讨厌、讨厌啊…！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8216',
        any: [/ELSEIF TFLAG:18 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8218',
        any: [/IF ABL:A:21 >= 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8219',
        any: [/「啊啊啊嗯！更多！还要更多！最喜欢主人的鞭打了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8219-8220',
        any: [/「啊啊啊嗯！更多！还要更多！最喜欢主人的鞭打了！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8221',
        any: [/「对不起啊！下次一定会成功的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8221-8222',
        any: [/「对不起啊！下次一定会成功的！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8224',
        any: [/ELSEIF TFLAG:18 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8226',
        any: [/IF TALENT:A:88 == 1 \|\| TALENT:A:76 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8227',
        any: [
          /「认真瞄准%SELF_CALL\(A\)%的脸…呜咕噗…嗯哈…小便真美味%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8227-8228',
        any: [
          /「认真瞄准%SELF_CALL\(A\)%的脸…呜咕噗…嗯哈…小便真美味%UNICODE\(0x2661\) \*1%」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8229',
        any: [/「不要再来了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8229-8230',
        any: [/「不要再来了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8232',
        any: [/ELSEIF TFLAG:18 == 6/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8233',
        any: [/PRINTW 「………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8235',
        any: [/ELSEIF TFLAG:18 == 7/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8236',
        any: [/PRINTW 「肚子饿了………」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8238',
        any: [/ELSEIF TFLAG:18 == 8/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8239',
        any: [
          /「已经受不了！再不和主人性交真的要疯了！求你了求你了啊！强奸了%SELF_CALL\(A\)%吧！」/,
        ],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8241',
        any: [/ELSEIF TFLAG:18 == 9/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8242',
        any: [/「咕噜咕噜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8242-8243',
        any: [/「咕噜咕噜！」/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8246',
        any: [/@GOBI_KOUJO_K1, ARG:0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8249',
        any: [/IF ARG:0 == 1/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8251',
        any: [/哎哟♪/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8252',
        any: [/ELSEIF ARG:0 == 2/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8254',
        any: [/哎呦！/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8255',
        any: [/ELSEIF ARG:0 == 3/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8257',
        any: [/哎……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8258',
        any: [/ELSEIF ARG:0 == 4/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8260',
        any: [/哎哟……什么、不好！？/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8261',
        any: [/ELSEIF ARG:0 == 5/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8263',
        any: [/这样的事……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8263-8264',
        any: [/这样的事……。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8267',
        any: [/IF RAND:3 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8268',
        any: [/哈。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8269',
        any: [/ELSEIF RAND:2 == 0/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8270',
        any: [/哎呦。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8270-8271',
        any: [/哎呦。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8272',
        any: [/的哇。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8272-8273',
        any: [/的哇。/],
      },
      {
        src: 'target/ERB/口上/EVENT_K1_自信家.ERB',
        ref: '8272-8274',
        any: [/的哇。/],
      },
    ],
  },
];

export const LOG_REFS = [];

export const SAMPLE_LOG_REFS = {};
